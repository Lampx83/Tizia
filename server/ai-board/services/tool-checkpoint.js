// Checkpoint tool-step của loop cổng 3 qua API worker: mọi thao tác cần lease hiện hành (worker cũ bị chặn khi lease đổi),
// worker không cần DATABASE_URL. Bảng tool_run/tool_step cùng hình dạng với ai-board/harness/repositories/tool_steps.py.
import { createHash } from 'node:crypto';
import { WorkerContractError } from '../repositories/store-contract.js';

const STATUSES = new Set(['intent', 'done', 'unknown', 'applied', 'void', 'compensate']);
const RESOLUTIONS = { applied: 'applied', not_applied: 'void', compensate: 'compensate' };
const IDENTITY = /^[0-9a-f]{32}$/;
const MAX_JSON = 200_000;
const MAX_OBSERVATION = 100_000;
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
const marks = (list) => list.map(() => '?').join(',');

export function createToolCheckpointService(store) {
  const db = store.db;
  const scopeOf = (ticketId) => `ticket-${Number(ticketId)}:`;

  async function ownedRun(ticketId, { proposalId, child }) {
    const run = await db.get('SELECT * FROM tool_run WHERE proposal_id=? AND child=?', [proposalId, child]);
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
      const rows = run ? await db.all(`SELECT step, identity, tool, args_json, status, kind, observation, observation_digest
        FROM tool_step WHERE proposal_id=? AND child=? ORDER BY step`, [k.proposalId, k.child]) : [];
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
      await db.run(`INSERT INTO tool_run(proposal_id, child, pins_json, updated_at, run_scope) VALUES (?, ?, ?, ?, ?)
        ON CONFLICT DO NOTHING`, [k.proposalId, k.child, json(body.pins, 'pins'), Date.now(), scope]);
      return { ok: true };
    },
    async ledger(ticketId, body) {
      const k = key(body);
      await needRun(ticketId, k);
      await db.run('UPDATE tool_run SET ledger_json=?, updated_at=? WHERE proposal_id=? AND child=?',
        [json(body.snapshot, 'ledger'), Date.now(), k.proposalId, k.child]);
      return { ok: true };
    },
    async intent(ticketId, body) {
      const k = key(body);
      await needRun(ticketId, k);
      try {
        await db.run(`INSERT INTO tool_step(proposal_id, child, step, identity, tool, args_json, status, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, 'intent', ?)`, [k.proposalId, k.child, Number(body.step), identityOf(body),
          String(body.tool).slice(0, 60), json(body.args, 'args'), Date.now()]);
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
      await db.run(`INSERT INTO tool_step(proposal_id, child, step, identity, tool, args_json, status, kind, observation, observation_digest, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 'done', ?, ?, ?, ?)
        ON CONFLICT (proposal_id, child, step) DO UPDATE SET status='done', kind=EXCLUDED.kind, observation=EXCLUDED.observation,
          observation_digest=EXCLUDED.observation_digest, updated_at=EXCLUDED.updated_at`,
        [k.proposalId, k.child, Number(body.step), identityOf(body), String(body.tool).slice(0, 60), json(body.args, 'args'),
          String(body.kind || '').slice(0, 40), observation, digest(observation), Date.now()]);
      return { ok: true };
    },
    async mark(ticketId, body) {
      const k = key(body);
      if (!STATUSES.has(body.status)) throw bad('invalid status');
      await needRun(ticketId, k);
      await db.run('UPDATE tool_step SET status=?, updated_at=? WHERE proposal_id=? AND child=? AND step=?',
        [body.status, Date.now(), k.proposalId, k.child, Number(body.step)]);
      return { ok: true };
    },
    async drop(ticketId, body) {
      const k = key(body);
      if (await ownedRun(ticketId, k)) await db.run('DELETE FROM tool_step WHERE proposal_id=? AND child=? AND step=?', [k.proposalId, k.child, Number(body.step)]);
      return { ok: true };
    },
    async reconcile(ticketId, body) {
      const k = key(body), status = RESOLUTIONS[body.resolution];
      if (!status) throw bad('invalid resolution');
      await needRun(ticketId, k);
      const allowed = status === 'compensate' ? ['unknown'] : ['unknown', 'compensate'], now = Date.now();
      const hit = await db.run(`UPDATE tool_step SET status=?, resolved_by=?, resolution_reason=?, resolution_evidence=?, resolved_at=?, updated_at=?
        WHERE proposal_id=? AND child=? AND step=? AND status IN (${marks(allowed)})`,
        [status, String(body.by || '').slice(0, 80), body.reason == null ? null : String(body.reason).slice(0, 2000),
          json(body.evidence || {}, 'evidence'), now, now, k.proposalId, k.child, Number(body.step), ...allowed]);
      if (!hit?.changes) throw bad(`step is not ${allowed.join('/')}`, 'step_not_open', 409);
      return { ok: true };
    },
    async purge(ticketId, body) {
      const ids = Array.isArray(body.proposal_ids) ? body.proposal_ids.map(String).filter((id) => /^\d{1,19}$/.test(id)) : [];
      for (const id of ids) {
        const like = `${scopeOf(ticketId)}%`;
        const owned = await db.get('SELECT 1 AS n FROM tool_run WHERE proposal_id=? AND run_scope LIKE ? LIMIT 1', [id, like]);
        const open = await db.get(`SELECT 1 AS n FROM tool_step s JOIN tool_run r ON r.proposal_id=s.proposal_id AND r.child=s.child
          WHERE s.proposal_id=? AND r.run_scope LIKE ? AND s.status IN ('intent','unknown','compensate') LIMIT 1`, [id, like]);
        if (!owned || open) continue; // bước chưa chốt không bao giờ bị dọn
        await db.run('DELETE FROM tool_step WHERE proposal_id=?', [id]);
        await db.run('DELETE FROM tool_run WHERE proposal_id=?', [id]);
      }
      return { ok: true };
    },
  };

  /** Thao tác checkpoint của ticket; lease sai/cũ → stale_lease trước khi đụng dữ liệu. */
  async function apply(ticketId, op, body = {}) {
    if (!Object.hasOwn(ops, op)) throw bad('unknown checkpoint operation', 'unknown_operation', 404);
    await store.assertLease(ticketId, body.worker_id, body.lease_token);
    return await ops[op](ticketId, body);
  }
  return { apply };
}
