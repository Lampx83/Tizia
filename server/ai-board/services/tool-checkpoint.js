// Checkpoint tool-step của loop cổng 3 qua API worker: mọi thao tác cần lease hiện hành (worker cũ bị chặn khi lease đổi),
// worker không cần DATABASE_URL. Bảng tool_run/tool_step cùng hình dạng với ai-board/harness/repositories/tool_steps.py.
import { createHash } from 'node:crypto';
import { WorkerContractError } from '../repositories/store-contract.js';
import { createToolCheckpointRepository } from '../repositories/tool-checkpoint.js';

const STATUSES = new Set(['intent', 'done', 'unknown', 'applied', 'void', 'compensate']);
const RESOLUTIONS = { applied: 'applied', not_applied: 'void', compensate: 'compensate' };
const IDENTITY = /^[0-9a-f]{32}$/;
const MAX_JSON = 200_000;
const MAX_OBSERVATION = 100_000;
const MAX_GRAPH_BLOB = 8_000_000;
const MAX_GRAPH_WRITES = 200;
const bad = (message, code = 'invalid_checkpoint', status = 400) => new WorkerContractError(message, status, code);
const digest = (text) => createHash('sha256').update(String(text ?? ''), 'utf8').digest('hex');

function key(body) {
  // proposal_id is a 60-bit hash: JSON numbers lose precision, so it travels and binds as a digit string.
  const proposalId = String(body.proposal_id ?? ''), child = Number(body.child ?? 0);
  if (!/^\d{1,19}$/.test(proposalId) || !Number.isInteger(child) || child < 0) throw bad('invalid checkpoint key');
  return { proposalId, child };
}
const json = (value, name) => {
  const text = JSON.stringify(value ?? null);
  if (text.length > MAX_JSON) throw bad(`${name} too large`);
  return text;
};
const parse = (text) => { try { return JSON.parse(text); } catch { return null; } };

export function createToolCheckpointService(store, repo = createToolCheckpointRepository(store.db)) {
  const scopeOf = (ticketId) => `ticket-${Number(ticketId)}:`;

  // Graph thread = one LangGraph run; plan_hash pins it: a changed plan or base cannot resume the old checkpoints.
  const graphThread = (ticketId, body) => {
    const thread = String(body.thread_id ?? '');
    if (!thread.startsWith(scopeOf(ticketId))) throw bad('thread_id must start with the ticket scope', 'scope_mismatch', 409);
    return thread;
  };
  const graphPin = (body) => {
    const pin = String(body.pin ?? '');
    if (!pin) throw bad('graph pin required', 'invalid_pin');
    return pin.slice(0, 200);
  };
  const graphId = (value) => {
    const id = String(value ?? '');
    if (!id || id.length > 200) throw bad('invalid graph id', 'invalid_checkpoint');
    return id;
  };
  const graphBlob = (value, name) => {
    const text = String(value ?? '');
    if (text.length > MAX_GRAPH_BLOB) throw bad(`${name} too large`);
    return text;
  };
  const graphRow = (row) => ({ checkpoint_id: row.checkpoint_id, parent_id: row.parent_id, type: row.type, checkpoint: row.checkpoint, metadata: row.metadata });
  async function pinGraph(thread, pin) {
    const row = await repo.graphPlanHash(thread);
    if (row && row.plan_hash !== pin) throw bad('graph plan changed since the checkpoint', 'graph_drift', 409);
  }

  async function ownedRun(ticketId, { proposalId, child }) {
    const run = await repo.run(proposalId, child);
    if (run && !String(run.run_scope || '').startsWith(scopeOf(ticketId))) throw bad('checkpoint belongs to another ticket', 'scope_mismatch', 409);
    return run;
  }
  async function needRun(ticketId, k) {
    if (!await ownedRun(ticketId, k)) throw bad('no checkpoint to update', 'checkpoint_missing', 409);
  }
  const identityOf = (body) => {
    if (!IDENTITY.test(String(body.identity))) throw bad('invalid step identity', 'invalid_identity');
    return body.identity;
  };

  const ops = {
    async load(ticketId, body) {
      const k = key(body), run = await ownedRun(ticketId, k);
      const rows = run ? await repo.steps(k.proposalId, k.child) : [];
      return {
        pins: run ? parse(run.pins_json) : null, ledger: run?.ledger_json ? parse(run.ledger_json) : null,
        steps: rows.map(({ args_json, observation_digest, ...row }) => ({
          ...row, args: parse(args_json),
          digest_ok: row.observation == null || observation_digest == null || observation_digest === digest(row.observation) })),
      };
    },
    async pins(ticketId, body) {
      const k = key(body), scope = String(body.run_scope || '');
      if (!scope.startsWith(scopeOf(ticketId))) throw bad('run_scope must start with the ticket scope', 'scope_mismatch', 409);
      await repo.insertRun({ proposalId: k.proposalId, child: k.child, pins: json(body.pins, 'pins'), now: Date.now(), scope });
      return { ok: true };
    },
    async ledger(ticketId, body) {
      const k = key(body);
      await needRun(ticketId, k);
      await repo.setLedger({ proposalId: k.proposalId, child: k.child, ledger: json(body.snapshot, 'ledger'), now: Date.now() });
      return { ok: true };
    },
    async intent(ticketId, body) {
      const k = key(body);
      await needRun(ticketId, k);
      try {
        await repo.insertIntent({ proposalId: k.proposalId, child: k.child, step: Number(body.step), identity: identityOf(body),
          tool: String(body.tool).slice(0, 60), args: json(body.args, 'args'), now: Date.now() });
      } catch (error) {
        if (/duplicate key|unique/i.test(String(error?.message))) throw bad('step already has an intent', 'step_conflict', 409);
        throw error;
      }
      return { ok: true };
    },
    async done(ticketId, body) {
      const k = key(body);
      await needRun(ticketId, k);
      const observation = String(body.observation ?? '');
      if (observation.length > MAX_OBSERVATION) throw bad('observation too large');
      await repo.upsertDone({ proposalId: k.proposalId, child: k.child, step: Number(body.step), identity: identityOf(body),
        tool: String(body.tool).slice(0, 60), args: json(body.args, 'args'), kind: String(body.kind || '').slice(0, 40),
        observation, digest: digest(observation), now: Date.now() });
      return { ok: true };
    },
    async mark(ticketId, body) {
      const k = key(body);
      if (!STATUSES.has(body.status)) throw bad('invalid status');
      await needRun(ticketId, k);
      await repo.setStepStatus({ proposalId: k.proposalId, child: k.child, step: Number(body.step), status: body.status, now: Date.now() });
      return { ok: true };
    },
    async reset(ticketId, body) {
      // A stale dependency: forget the recorded steps and re-pin, but keep the ledger so accounting never goes back.
      const k = key(body);
      await needRun(ticketId, k);
      await repo.deleteSteps(k.proposalId, k.child);
      await repo.resetPins({ proposalId: k.proposalId, child: k.child, pins: json(body.pins, 'pins'), now: Date.now() });
      return { ok: true };
    },
    async drop(ticketId, body) {
      const k = key(body);
      if (await ownedRun(ticketId, k)) await repo.deleteStep(k.proposalId, k.child, Number(body.step));
      return { ok: true };
    },
    async reconcile(ticketId, body) {
      const k = key(body), status = RESOLUTIONS[body.resolution];
      if (!status) throw bad('invalid resolution');
      await needRun(ticketId, k);
      const allowed = status === 'compensate' ? ['unknown'] : ['unknown', 'compensate'], now = Date.now();
      const hit = await repo.reconcileStep({ proposalId: k.proposalId, child: k.child, step: Number(body.step), status,
        by: String(body.by || '').slice(0, 80), reason: body.reason == null ? null : String(body.reason).slice(0, 2000),
        evidence: json(body.evidence || {}, 'evidence'), now, allowed });
      if (!hit?.changes) throw bad(`step is not ${allowed.join('/')}`, 'step_not_open', 409);
      return { ok: true };
    },
    async purge(ticketId, body) {
      const ids = Array.isArray(body.proposal_ids) ? body.proposal_ids.map(String).filter((id) => /^\d{1,19}$/.test(id)) : [];
      // Scopes an earlier worker created for this same run (another process, another attempt) are not in this worker's key set.
      if (typeof body.run_scope === 'string' && body.run_scope.startsWith(scopeOf(ticketId))) {
        for (const row of await repo.runScopeIds(body.run_scope)) ids.push(row.id);
      }
      for (const id of ids) {
        const like = `${scopeOf(ticketId)}%`;
        const owned = await repo.ownedByScope(id, like);
        const open = await repo.openStepInScope(id, like);
        if (!owned || open) continue; // bước chưa chốt không bao giờ bị dọn
        await repo.deleteAllSteps(id);
        await repo.deleteAllRuns(id);
      }
      return { ok: true };
    },
    async graph_put(ticketId, body) {
      const thread = graphThread(ticketId, body), pin = graphPin(body), ns = String(body.checkpoint_ns ?? '');
      await pinGraph(thread, pin);
      await repo.upsertGraph({ thread, ns, id: graphId(body.checkpoint_id), parentId: body.parent_id == null ? null : String(body.parent_id),
        type: String(body.type || '').slice(0, 40), checkpoint: graphBlob(body.checkpoint, 'checkpoint'),
        metadata: graphBlob(body.metadata, 'metadata'), pin, now: Date.now() });
      return { ok: true };
    },
    async graph_get(ticketId, body) {
      const thread = graphThread(ticketId, body), ns = String(body.checkpoint_ns ?? '');
      await pinGraph(thread, graphPin(body));
      const row = body.checkpoint_id
        ? await repo.graphAt(thread, ns, graphId(body.checkpoint_id))
        : await repo.graphLatest(thread, ns);
      if (!row) return { checkpoint: null, writes: [] };
      const writes = await repo.graphWrites(thread, ns, row.checkpoint_id);
      return { checkpoint: graphRow(row), writes };
    },
    async graph_list(ticketId, body) {
      const thread = graphThread(ticketId, body), ns = String(body.checkpoint_ns ?? '');
      await pinGraph(thread, graphPin(body));
      const limit = Math.min(Math.max(Number(body.limit) || 10, 1), 100);
      const rows = body.before
        ? await repo.graphBefore(thread, ns, graphId(body.before), limit)
        : await repo.graphRecent(thread, ns, limit);
      return { checkpoints: rows.map(graphRow) };
    },
    async graph_purge(ticketId, body) {
      const thread = graphThread(ticketId, body), ns = String(body.checkpoint_ns ?? '');
      await repo.purgeGraphWrites(thread, ns);
      await repo.purgeGraphCheckpoints(thread, ns);
      return { ok: true };
    },
    async graph_writes(ticketId, body) {
      const thread = graphThread(ticketId, body), pin = graphPin(body), ns = String(body.checkpoint_ns ?? '');
      await pinGraph(thread, pin);
      const writes = Array.isArray(body.writes) ? body.writes : [];
      if (writes.length > MAX_GRAPH_WRITES) throw bad('too many pending writes');
      const id = graphId(body.checkpoint_id), task = graphId(body.task_id);
      for (const write of writes) {
        await repo.upsertGraphWrite({ thread, ns, id, task, idx: Number(write.idx), channel: String(write.channel || '').slice(0, 80),
          type: write.type == null ? null : String(write.type).slice(0, 40), value: graphBlob(write.value, 'write') });
      }
      return { ok: true };
    },
  };

  /** Thao tác checkpoint của ticket; lease sai/cũ → stale_lease trước khi đụng dữ liệu. */
  async function apply(ticketId, op, body = {}) {
    if (!Object.hasOwn(ops, op)) throw bad('unknown checkpoint operation', 'unknown_operation', 404);
    return repo.tx(async () => {
      await store.assertLease(ticketId, body.worker_id, body.lease_token);
      return ops[op](ticketId, body);
    });
  }
  return { apply };
}
