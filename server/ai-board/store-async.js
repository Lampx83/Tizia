// Async AI board store on the db contract (db/index.js): SQLite and PostgreSQL behind one code path.
// PORTED (vertical slice): createRequestWithRoot -> claimNext -> heartbeat -> createRun -> submitPlan (+ plan block)
// -> submitPrePrVerdict. Everything else still lives in the sync store.js; see the ticket-10 report for the remainder.
// Logic is a line-for-line port of store.js (same checks, errors, events); only the SQL access is async/portable.
// Not ported here and refused loudly instead of diverging: feature folders on request creation.
import { randomBytes } from 'node:crypto';
import { PlanGuardrailError, validatePlan } from './policy.js';
import {
  ACTIVE_ONLY, ANY_QUEUE, CLAIM_INTENTS, CLARIFYING_NOTE, CONTRACT, DAY_MS, IDEMPOTENCY_KEY as KEY, LEASE_MS, LIMITS,
  PHASES, PLAN_QUEUE, REQUEST_TYPES, RUN_TRIGGERS, WORKER_MODES, RequestValidationError, WorkerContractError,
  cleanAttachments, parseJson, scaledLimit, triggerFor, validatePrePrVerdict,
} from './store.js';

const SELF_TAG = 'self_target:';

export function createAsyncAiBoardStore(d, hooks = {}) {
  const ownerGpuS = (owner) => `(SELECT COALESCE(SUM(${d.jsonNum('g.evidence_json', 'budget_units')}), 0)
    FROM ai_gate_traces g JOIN ai_runs gr ON gr.id = g.run_id JOIN ai_tickets gt ON gt.id = gr.ticket_id
    JOIN requests grq ON grq.id = gt.source_request_id
    WHERE g.status = 'model_call' AND g.created_at > ? AND grq.owner_user_id = ${owner})`;
  const FAIR_ORDER = `r.type = 'self' ASC, t.priority DESC,
    COALESCE((SELECT MAX(se.created_at) FROM ai_events se JOIN ai_tickets st ON st.id = se.ticket_id
      JOIN requests sq ON sq.id = st.source_request_id
      WHERE se.transition = 'queued->running' AND sq.owner_user_id = r.owner_user_id), 0) ASC,
    t.created_at ASC, t.id ASC`;

  const insertEvent = (t, ticketId, type, actorType, actorId, transition, publicMessage, internalDetail, idem, now) => t.run(`
    INSERT INTO ai_events (ticket_id, event_type, actor_type, actor_id, transition,
      public_message, internal_detail, idempotency_key, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [ticketId, type, actorType, actorId, transition, publicMessage, internalDetail, idem, now]);
  const insertTag = (t, ticketId, tag) => t.run('INSERT INTO ai_ticket_tags(ticket_id, tag) VALUES (?, ?) ON CONFLICT DO NOTHING', [ticketId, tag]);
  const insertGateTrace = (t, runId, gate, status, publicReason, internalReason, evidence, now) => t.run(`
    INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [runId, gate, status, publicReason, internalReason, evidence, now]);

  async function createRequestTransaction(input) {
    return d.tx(async (t) => {
      const retry = await t.get(`
        SELECT r.id AS request_id, t.id AS root_ticket_id
        FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
        WHERE r.owner_user_id = ? AND r.idempotency_key = ?
      `, [input.ownerUserId, input.idempotencyKey]);
      if (retry) return { ...retry, created: false };
      if (input.folderId || input.type === 'feature') {
        throw new WorkerContractError('feature folders are not ported to the async store yet', 501, 'not_ported');
      }
      const now = input.now ?? Date.now();
      const requestId = await t.insert(`
        INSERT INTO requests (
          domain, type, title, detail, student, status, votes, created_at, updated_at,
          attachments, owner_user_id, owner_domain, idempotency_key, owner_state, folder_id
        ) VALUES (?, ?, ?, ?, ?, 'pending', 1, ?, ?, ?, ?, ?, ?, 'verified', NULL)
      `, [
        input.ownerDomain,
        input.selfTarget ? 'self' : REQUEST_TYPES.has(input.type) ? input.type : 'other',
        String(input.title).trim().slice(0, 200),
        input.detail ? String(input.detail).slice(0, 10000) : null,
        String(input.ownerDisplayName || input.ownerUserId).slice(0, 60),
        now, now, cleanAttachments(input.attachments), input.ownerUserId, input.ownerDomain, input.idempotencyKey,
      ]);
      await hooks.afterRequestInserted?.({ requestId, input, t });
      const rootTicketId = await t.insert(`
        INSERT INTO ai_tickets (
          source_request_id, sequence, kind, title, description, status, phase,
          priority, public_note, internal_reason, created_at, updated_at
        ) VALUES (?, 0, 'root', ?, ?, 'queued', ?, 0, ?, NULL, ?, ?)
      `, [
        requestId, input.title, input.detail || null, input.clarifying ? 'clarifying' : 'intake',
        input.clarifying ? CLARIFYING_NOTE : 'Yêu cầu đã được ghi nhận và đang chờ xử lý.', now, now,
      ]);
      await insertTag(t, rootTicketId, 'request');
      await insertTag(t, rootTicketId, `domain:${input.ownerDomain}`);
      await insertEvent(t, rootTicketId, 'request_created', 'requester', String(input.ownerUserId),
        'created->queued', 'Yêu cầu đã được ghi nhận.', null, `request-created:${input.idempotencyKey}`, now);
      if (input.selfTarget) await insertTag(t, rootTicketId, `${SELF_TAG}${input.selfTarget}`);
      return { request_id: requestId, root_ticket_id: rootTicketId, folder_id: null, created: true };
    });
  }

  function createRequestWithRoot(input) {
    if (!Number.isInteger(Number(input.ownerUserId)) || Number(input.ownerUserId) <= 0) throw new RequestValidationError('ownerUserId is required');
    const domain = String(input.ownerDomain || '').trim();
    if (!domain) throw new RequestValidationError('ownerDomain is required');
    const title = String(input.title || '').trim();
    if (title.length < 4) throw new RequestValidationError('title is too short');
    const idempotencyKey = String(input.idempotencyKey || '').trim();
    if (!KEY.test(idempotencyKey)) throw new RequestValidationError('invalid idempotency key');
    return createRequestTransaction({
      ...input, ownerUserId: Number(input.ownerUserId), ownerDomain: domain.slice(0, 40), title, idempotencyKey,
    });
  }

  async function assertLease(t, ticketId, workerId, leaseToken, now = Date.now(), lock = false) {
    const ticket = await t.get(`SELECT * FROM ai_tickets WHERE id = ? AND kind = 'root'${lock ? t.lockRow : ''}`, [Number(ticketId)]);
    if (!ticket) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (!workerId || ticket.lease_owner !== workerId || !leaseToken || ticket.lease_token !== leaseToken) {
      throw new WorkerContractError('lease does not belong to worker', 409, 'stale_lease');
    }
    if (!ticket.lease_expires_at || ticket.lease_expires_at <= now) {
      throw new WorkerContractError('lease expired', 409, 'stale_lease');
    }
    return ticket;
  }

  async function claimTransaction({ workerId, version, mode, intent, now, leaseMs, yieldNew }) {
    if (!WORKER_MODES.has(mode)) throw new WorkerContractError('invalid worker mode');
    if (!CLAIM_INTENTS.has(intent)) throw new WorkerContractError('invalid claim intent');
    return d.tx(async (t) => {
      await t.run(`
        INSERT INTO ai_workers(worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at)
        VALUES (?, ?, ?, ?, NULL, ?, ?)
        ON CONFLICT(worker_id) DO UPDATE SET
          version=excluded.version, mode=excluded.mode, status=excluded.status,
          last_seen_at=excluded.last_seen_at, updated_at=excluded.updated_at
      `, [workerId, version, mode, mode === 'off' ? 'stopped' : 'idle', now, now]);
      if (mode === 'off') return null;

      const current = await t.get(`
        SELECT id, lease_token, lease_expires_at, status, phase
        FROM ai_tickets
        WHERE kind='root' AND lease_owner=? AND lease_expires_at>?
        ORDER BY updated_at DESC LIMIT 1
      `, [workerId, now]);
      if (current) return { ...current, trigger: triggerFor(current.phase, intent) };
      if (yieldNew) return null;

      // Same predicate as store.js claimTransaction; CAST pins parameter types for PostgreSQL.
      const candidate = await t.get(`
        SELECT t.id, t.phase
        FROM ai_tickets t JOIN requests r ON r.id=t.source_request_id
        WHERE t.kind='root' AND r.owner_state='verified'
          AND ((t.status='queued' AND (t.lease_expires_at IS NULL OR t.lease_expires_at<=?) AND (
                t.phase IN (${ANY_QUEUE})
                OR (CAST(? AS TEXT) = 'plan' AND t.phase IN (${PLAN_QUEUE}))
              ))
            OR (t.status='running' AND t.lease_expires_at<=?)
            OR (CAST(? AS TEXT) = 'plan' AND t.lease_token IS NOT NULL AND t.lease_expires_at<=?))
          AND (CAST(? AS TEXT) = 'active' OR t.phase NOT IN (${ACTIVE_ONLY}))
          AND (t.status <> 'queued' OR NOT EXISTS (
            SELECT 1 FROM ai_runs ar JOIN ai_workers aw ON aw.worker_id = ar.worker_id
            WHERE ar.id = (SELECT MAX(id) FROM ai_runs WHERE ticket_id = t.id AND trigger <> 'shadow_precheck')
              AND ar.worker_id <> ? AND aw.last_seen_at > ?))
          AND (t.status <> 'queued' OR r.type = 'self' OR ${ownerGpuS('r.owner_user_id')} < ?)
          ORDER BY ${FAIR_ORDER} LIMIT 1${t.lockQueue('t')}
      `, [now, intent, now, intent, now, mode, workerId, now - leaseMs, now - DAY_MS, LIMITS.gpu_s_per_user_day.loose]);
      if (!candidate) return null;
      const token = randomBytes(24).toString('hex');
      const expires = now + leaseMs;
      const phase = PHASES[candidate.phase]?.lease || (intent === 'plan' ? 'planning' : 'shadow_precheck');
      await t.run(`
        UPDATE ai_tickets SET status='running', phase=?, lease_owner=?,
          lease_token=?, lease_expires_at=?, lease_mode=?, updated_at=? WHERE id=?
      `, [phase, workerId, token, expires, mode, now, candidate.id]);
      await t.run(`
        UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=?
        WHERE worker_id=?
      `, [candidate.id, now, now, workerId]);
      await insertEvent(t, candidate.id, 'heartbeat', 'worker', workerId, 'queued->running',
        null, 'worker claimed root ticket', `claim:${workerId}:${candidate.id}:${token}`, now);
      return { id: candidate.id, lease_token: token, lease_expires_at: expires, status: 'running', phase,
        trigger: triggerFor(phase, intent) };
    });
  }

  function claimNext({ workerId, version = 'unknown', mode = 'off', intent = 'precheck', now = Date.now(), leaseMs = LEASE_MS,
    yieldNew = false }) {
    workerId = String(workerId || '').trim();
    if (!/^[A-Za-z0-9._:-]{2,80}$/.test(workerId)) throw new WorkerContractError('invalid worker id');
    return claimTransaction({ workerId, version: String(version).slice(0, 80), mode, intent, now, leaseMs, yieldNew });
  }

  async function heartbeat(ticketId, workerId, leaseToken, { now = Date.now(), leaseMs = LEASE_MS } = {}) {
    return d.tx(async (t) => {
      await assertLease(t, ticketId, workerId, leaseToken, now, true);
      const expires = now + leaseMs;
      await t.run('UPDATE ai_tickets SET lease_expires_at=?, updated_at=? WHERE id=?', [expires, now, Number(ticketId)]);
      await t.run(`UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=? WHERE worker_id=?`,
        [Number(ticketId), now, now, workerId]);
      return { lease_expires_at: expires };
    });
  }

  function createRun(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const now = input.now ?? Date.now();
    return d.tx(async (t) => {
      await assertLease(t, ticketId, input.workerId, input.leaseToken, now, true);
      if (!RUN_TRIGGERS.has(input.trigger)) throw new WorkerContractError('invalid run trigger');
      const existing = await t.get('SELECT * FROM ai_runs WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), idempotencyKey]);
      if (existing) return existing;
      const attempt = (await t.get('SELECT COUNT(*) AS n FROM ai_runs WHERE ticket_id=?', [Number(ticketId)])).n + 1;
      const id = await t.insert(`
        INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, worker_id, idempotency_key, created_at, updated_at)
        VALUES (?, ?, ?, NULL, ?, ?, ?, ?)
      `, [Number(ticketId), attempt, input.trigger, input.workerId, idempotencyKey, now, now]);
      return t.get('SELECT * FROM ai_runs WHERE id=?', [id]);
    });
  }

  const planChildren = (t, rootTicketId, revision) => t.all(`
    SELECT id, parent_id, source_request_id, sequence, kind, title, description,
           status, phase, tier, plan_revision
    FROM ai_tickets WHERE parent_id=? AND plan_revision=? ORDER BY sequence
  `, [Number(rootTicketId), Number(revision)]);

  function recordPlanBlock(ticketId, input, error) {
    return d.tx(async (t) => {
      const now = input.now ?? Date.now();
      const eventKey = `plan-block:${input.idempotencyKey}`;
      const existing = await t.get('SELECT * FROM ai_events WHERE ticket_id=? AND idempotency_key=?', [Number(ticketId), eventKey]);
      if (existing) return existing;
      await assertLease(t, ticketId, input.workerId, input.leaseToken, now, true);
      await t.run(`
        UPDATE ai_tickets SET status='waiting', phase='plan_blocked', public_note=?,
          internal_reason=?, updated_at=? WHERE id=?
      `, [error.publicMessage, error.internalReason, now, Number(ticketId)]);
      if (input.runId) {
        const run = await t.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
        if (run) await insertGateTrace(t, run.id, 2.5, 'blocked', error.publicMessage, error.internalReason, null, now);
      }
      await insertEvent(t, Number(ticketId), 'plan_blocked', 'worker', input.workerId, 'running->waiting',
        error.publicMessage, error.internalReason, eventKey, now);
      return true;
    });
  }

  async function submitPlanTransaction(ticketId, input, checked) {
    return d.tx(async (t) => {
      const now = input.now;
      const root = await assertLease(t, ticketId, input.workerId, input.leaseToken, now, true);
      const request = await t.get('SELECT domain FROM requests WHERE id=?', [root.source_request_id]);
      if (request.domain !== checked.plan.domain) throw new PlanGuardrailError('domain_mismatch', 'request domain changed during plan submission');
      const run = await t.get('SELECT id, evidence_json FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
      if (!run) throw new WorkerContractError('run does not belong to ticket');
      // Sổ ngân sách của lượt: phần lập plan ghi lên run (JSON merge done here, not in SQL, to stay portable).
      await t.run('UPDATE ai_runs SET evidence_json=? WHERE id=?',
        [JSON.stringify({ ...(parseJson(run.evidence_json) ?? {}), plan_budget: input.budgetUsed }), run.id]);

      const existing = await t.get(`SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status='valid'`,
        [Number(ticketId), checked.planHash]);
      if (existing) {
        const sameSubmission = await t.get('SELECT 1 AS ok FROM ai_events WHERE ticket_id=? AND idempotency_key=?',
          [Number(ticketId), `plan-valid:${input.idempotencyKey}`]);
        const authorized = !!await t.get(`SELECT 1 AS ok FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?`,
          [Number(ticketId), existing.plan_hash, existing.revision]);
        const plannedStatus = existing.tier === 'surface' ? 'planned'
          : existing.tier === 'protected' && authorized ? 'planned'
            : existing.tier === 'protected' ? 'waiting_authorization' : 'human_owned';
        if (!sameSubmission) {
          const rounds = root.auto_rounds;
          const budget = root.cumulative_budget + input.budgetUsed;
          if (rounds > 2 || input.budgetUsed > root.budget_limit) {
            const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
            await t.run(`
              UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
                public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
                auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
            `, [reason, rounds, budget, now, Number(ticketId)]);
            await insertEvent(t, Number(ticketId), 'plan_validated', 'worker', input.workerId, 'running->waiting_admin',
              'Yêu cầu đang chờ quản trị viên xem xét.', reason, `plan-valid:${input.idempotencyKey}`, now);
            return {
              plan_hash: existing.plan_hash, tier: existing.tier, status: 'waiting_admin',
              reason, children: await planChildren(t, ticketId, existing.revision), duplicate: true,
            };
          }
          await t.run(`
            UPDATE ai_tickets SET status=?, phase='ticketized', auto_rounds=?,
              cumulative_budget=?, updated_at=? WHERE id=?
          `, [plannedStatus, rounds, budget, now, Number(ticketId)]);
          await insertEvent(t, Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${plannedStatus}`,
            root.public_note, 'resumed existing validated plan', `plan-valid:${input.idempotencyKey}`, now);
        }
        const duplicateStatus = ['planned', 'waiting_authorization', 'human_owned', 'waiting_admin'].includes(root.status)
          ? root.status : plannedStatus;
        await t.run('UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?',
          [existing.plan_hash, existing.revision, now, run.id]);
        const traced = new Set((await t.all(
          `SELECT gate FROM ai_gate_traces WHERE run_id=? AND status='passed' AND gate IN (1, 2, 2.5)`, [run.id],
        )).map((row) => Number(row.gate)));
        for (const gate of [1, 2, 2.5]) {
          if (!traced.has(gate)) await insertGateTrace(t, run.id, gate, 'passed', null, null, null, now);
        }
        return {
          plan_hash: existing.plan_hash, capability_policy_hash: existing.capability_policy_hash, tier: existing.tier,
          status: duplicateStatus, children: await planChildren(t, ticketId, existing.revision), duplicate: true,
        };
      }

      const rounds = root.auto_rounds + 1;
      const budget = root.cumulative_budget + input.budgetUsed;
      if (rounds > 2 || input.budgetUsed > root.budget_limit) {
        const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
        await t.run(`
          UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
            public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
            auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
        `, [reason, rounds, budget, now, Number(ticketId)]);
        return { plan_hash: checked.planHash, tier: checked.tier, status: 'waiting_admin', reason, children: [] };
      }

      const folder = await t.get(`SELECT f.approved_at FROM requests q JOIN ai_feature_folders f ON f.id = q.folder_id
        WHERE q.id = ?`, [root.source_request_id]);
      const folderGate = !!folder && !folder.approved_at && checked.tier === 'surface';
      if (folderGate) checked = { ...checked, tier: 'protected' };
      const revision = root.plan_revision + 1;
      const authorized = !!await t.get(`SELECT 1 AS ok FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?`,
        [Number(ticketId), checked.planHash, revision]);
      let rootStatus = 'planned';
      let childStatus = 'queued';
      let publicNote = 'Kế hoạch đã được kiểm tra và chia thành các việc theo thứ tự.';
      let internalReason = null;
      if (checked.tier === 'protected' && !authorized) {
        rootStatus = childStatus = 'waiting_authorization';
        publicNote = 'Kế hoạch đang chờ quản trị viên cho phép trước khi triển khai.';
        internalReason = folderGate ? 'folder_not_approved' : 'protected capability requires explicit admin authorization';
      } else if (checked.tier === 'core') {
        rootStatus = childStatus = 'human_owned';
        publicNote = 'Yêu cầu chạm phần lõi và đã được chuyển cho con người xử lý.';
        internalReason = 'core capability cannot be auto-implemented';
      }
      await t.run(`
        INSERT INTO ai_plans(root_ticket_id, revision, plan_hash, plan_json, status, tier,
          capability_policy_hash, public_reason, internal_reason, created_at)
        VALUES (?, ?, ?, ?, 'valid', ?, ?, ?, ?, ?)
      `, [Number(ticketId), revision, checked.planHash, checked.planJson, checked.tier, checked.policyHash,
        publicNote, internalReason, now]);
      const runLimit = Math.max(root.budget_limit, scaledLimit('units', checked.plan.steps.length));
      await t.run(`
        UPDATE ai_tickets SET status=?, phase='ticketized', public_note=?, internal_reason=?,
          tier=?, plan_hash=?, plan_revision=?, auto_rounds=?, cumulative_budget=?, budget_limit=?, updated_at=?
        WHERE id=?
      `, [rootStatus, publicNote, internalReason, checked.tier, checked.planHash, revision, rounds, budget, runLimit, now,
        Number(ticketId)]);
      await t.run('UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?',
        [checked.planHash, revision, now, run.id]);

      for (const step of checked.plan.steps) {
        const childId = await t.insert(`
          INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
            status, phase, priority, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
          VALUES (?, ?, ?, 'implementation', ?, ?, ?, 'ticketized', ?, ?, ?, ?, ?, ?, ?)
        `, [
          Number(ticketId), root.source_request_id, step.order, step.title,
          JSON.stringify({
            description: step.description, allowed_scope: step.allowed_scope,
            acceptance: step.acceptance, tests: step.tests, risk: step.risk, non_goals: step.non_goals,
          }),
          childStatus, checked.plan.steps.length - step.order, publicNote, internalReason,
          checked.tier, revision, now, now,
        ]);
        await insertTag(t, childId, 'implementation');
        await insertTag(t, childId, `capability:${step.capability}`);
      }
      for (const gate of [1, 2, 2.5]) await insertGateTrace(t, run.id, gate, 'passed', null, null, null, now);
      await insertEvent(t, Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${rootStatus}`,
        publicNote, internalReason, `plan-valid:${input.idempotencyKey}`, now);
      return {
        plan_hash: checked.planHash, capability_policy_hash: checked.policyHash, tier: checked.tier,
        status: rootStatus, children: await planChildren(t, ticketId, revision), duplicate: false,
      };
    });
  }

  async function submitPlan(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const budgetUsed = Number(input.budgetUsed ?? 0);
    if (!Number.isFinite(budgetUsed) || budgetUsed < 0) throw new WorkerContractError('invalid budget');
    const now = input.now ?? Date.now();
    const root = await assertLease(d, ticketId, input.workerId, input.leaseToken, now);
    const request = await d.get('SELECT domain, type FROM requests WHERE id=?', [root.source_request_id]);
    let selfTarget = null;
    if (request.type === 'self') {
      const tag = await d.get('SELECT tag FROM ai_ticket_tags WHERE ticket_id=? AND tag LIKE ?', [root.id, `${SELF_TAG}%`]);
      selfTarget = tag ? tag.tag.slice(SELF_TAG.length) : ''; // thiếu tag → '' khớp không file nào
    }
    let checked;
    try {
      checked = validatePlan(input.plan, request.domain, selfTarget);
    } catch (error) {
      if (!(error instanceof PlanGuardrailError)) throw error;
      await recordPlanBlock(ticketId, { ...input, idempotencyKey, now }, error);
      throw error;
    }
    return submitPlanTransaction(Number(ticketId), { ...input, idempotencyKey, budgetUsed, now }, checked);
  }

  async function submitPrePrVerdictTransaction(ticketId, input, verdict) {
    return d.tx(async (t) => {
      const root = await assertLease(t, ticketId, input.workerId, input.leaseToken, input.now, true);
      if (root.lease_mode !== 'active') {
        throw new WorkerContractError('pre-PR verdict requires active worker mode', 409, 'active_worker_required');
      }
      const run = await t.get('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?', [Number(input.runId), Number(ticketId)]);
      if (!run) throw new WorkerContractError('run does not belong to ticket');
      const plan = root.plan_hash && await t.get(`
        SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'
      `, [root.id, root.plan_hash, root.plan_revision]);
      if (!plan || root.status !== 'planned') {
        throw new WorkerContractError('pre-PR verdict requires the current accepted plan', 409, 'plan_required');
      }
      if (run.plan_hash !== plan.plan_hash || Number(run.plan_revision) !== Number(plan.revision)) {
        throw new WorkerContractError('run belongs to a different plan revision', 409, 'plan_run_mismatch');
      }
      if (plan.tier === 'core') throw new WorkerContractError('core plan remains human-owned', 409, 'core_human_owned');
      if (plan.tier === 'protected' && !await t.get(
        'SELECT 1 AS ok FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?',
        [root.id, plan.plan_hash, plan.revision])) {
        throw new WorkerContractError('protected plan requires authorization', 409, 'authorization_required');
      }
      const precheckGates = new Set((await t.all(`
        SELECT g.gate FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
        WHERE r.ticket_id=? AND r.plan_hash=? AND r.plan_revision=? AND g.status='passed' AND g.gate IN (1, 2, 2.5)
      `, [root.id, plan.plan_hash, plan.revision])).map((row) => Number(row.gate)));
      if (![1, 2, 2.5].every((gate) => precheckGates.has(gate))) {
        throw new WorkerContractError('pre-PR verdict requires plan guardrail traces', 409, 'plan_trace_required');
      }
      const existing = await t.get('SELECT id, event_type FROM ai_events WHERE ticket_id=? AND idempotency_key=?',
        [Number(ticketId), input.idempotencyKey]);
      if (existing) {
        if (existing.event_type !== 'pre_pr_verdict' || !run.outcome) {
          throw new WorkerContractError('idempotency key already used', 409, 'idempotency_conflict');
        }
        if (run.outcome !== verdict.outcome || Number(run.gate) !== verdict.gate_reached) {
          throw new WorkerContractError('run already has a different verdict', 409, 'idempotency_conflict');
        }
        return JSON.parse(run.evidence_json).verdict;
      }
      if (run.outcome) throw new WorkerContractError('run already has a verdict', 409, 'idempotency_conflict');
      const cumulativeBudget = root.cumulative_budget + verdict.budget_used;
      const runEvidence = parseJson(run.evidence_json) ?? {};
      if (verdict.budget_used + (Number(runEvidence.plan_budget) || 0) > root.budget_limit) {
        throw new WorkerContractError('run budget exhausted', 409, 'run_budget_exhausted');
      }
      await t.run(`UPDATE ai_runs SET outcome=?, gate=?, cumulative_budget=?, evidence_json=?, failure_reason=?, updated_at=? WHERE id=?`,
        [verdict.outcome, verdict.gate_reached, cumulativeBudget, JSON.stringify({ ...runEvidence, verdict }),
          verdict.reason, input.now, run.id]);
      if (verdict.candidate) {
        await t.run(`UPDATE ai_feature_folders SET branch=?, head_sha=?, last_activity_at=?, updated_at=?
          WHERE id=(SELECT folder_id FROM requests WHERE id=?)`,
        [verdict.candidate.branch, verdict.candidate.head_sha, input.now, input.now, root.source_request_id]);
      }
      for (const gate of verdict.gates) {
        await insertGateTrace(t, run.id, gate.gate, gate.blocked ? 'blocked' : 'passed', gate.reason, null,
          JSON.stringify(gate), input.now);
      }
      let status = root.status;
      let phase = verdict.outcome === 'ready_for_pr' ? 'pre_pr_ready'
        : verdict.outcome === 'needs_review' ? 'pre_pr_review' : 'pre_pr_blocked';
      let note = verdict.outcome === 'ready_for_pr' ? 'Thay đổi đã qua kiểm tra trước PR.'
        : verdict.outcome === 'needs_review' ? 'Thay đổi cần con người xem xét trước PR.'
          : 'Thay đổi chưa qua kiểm tra trước PR.';
      let leaseExpiresAt = null;
      if (verdict.failure_class === 'critical') {
        status = 'waiting_admin';
        phase = 'critical_violation';
        note = 'Thay đổi vi phạm ranh giới an toàn; đã dừng và chờ quản trị viên.';
        await t.run(`
          INSERT INTO ai_alerts(ticket_id, severity, category, status, public_message, internal_detail, created_at, updated_at)
          VALUES (?, 'critical', 'boundary_violation', 'open', ?, ?, ?, ?)
        `, [root.id, note, verdict.reason, input.now, input.now]);
      } else if (verdict.failure_class === 'budget') {
        status = 'waiting_admin';
        phase = 'budget_exhausted';
        note = 'Yêu cầu đang chờ quản trị viên xem xét.';
      } else if (verdict.failure_class === 'plan') {
        status = 'waiting_admin';
        phase = 'plan_unfit';
        note = 'Yêu cầu đang chờ quản trị viên xem xét.';
      } else if (verdict.failure_class === 'transient') {
        // Plan vẫn hợp lệ, chỉ hạ tầng hỏng: xem chú thích gốc ở store.js submitPrePrVerdictTransaction.
        const retryState = await t.get('SELECT enabled FROM ai_transient_retry_state WHERE id=1');
        const retryEnabled = retryState ? !!retryState.enabled : CONTRACT.limits.transient_retry.enabled;
        if (retryEnabled) {
          status = 'queued';
          phase = 'authorized';
          leaseExpiresAt = input.now + CONTRACT.limits.transient_retry.retry_after_ms;
          note = `Lỗi hạ tầng thoáng qua; tự chạy lại sau ${Math.round(CONTRACT.limits.transient_retry.retry_after_ms / 60000)} phút.`;
        } else {
          status = 'waiting_admin';
          phase = 'transient_blocked';
          note = 'Lỗi hạ tầng thoáng qua; chờ admin bấm "Chạy lại ngay" lúc GPU rảnh.';
        }
      }
      const repairSequence = (await t.get(
        'SELECT COALESCE(MAX(sequence), 0) + 1 AS nxt FROM ai_tickets WHERE parent_id=? AND plan_revision=?',
        [root.id, plan.revision])).nxt;
      for (const [index, repair] of verdict.repairs.entries()) {
        const childId = await t.insert(`
          INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
            status, phase, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
          VALUES (?, ?, ?, 'review_fix', ?, ?, ?, 'pre_pr_repair', ?, ?, ?, ?, ?, ?)
        `, [root.id, root.source_request_id, repairSequence + index, `Sửa lỗi cổng ${repair.gate}`,
          JSON.stringify(repair), verdict.outcome === 'blocked' ? 'failed' : 'done',
          'Đã tự sửa một lần sau khi kiểm tra trước PR chưa đạt.', repair.reason, plan.tier, plan.revision,
          input.now, input.now]);
        await insertTag(t, childId, 'repair');
      }
      if (leaseExpiresAt != null) {
        await t.run(`UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?, cumulative_budget=?,
            lease_owner=NULL, lease_token=NULL, lease_expires_at=?, updated_at=? WHERE id=?`,
        [status, phase, note, verdict.reason, cumulativeBudget, leaseExpiresAt, input.now, root.id]);
      } else {
        await t.run('UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?, cumulative_budget=?, updated_at=? WHERE id=?',
          [status, phase, note, verdict.reason, cumulativeBudget, input.now, root.id]);
      }
      await t.run(`
        INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
          public_message, internal_detail, idempotency_key, created_at)
        VALUES (?, ?, 'pre_pr_verdict', 'worker', ?, ?, ?, ?, ?, ?)
      `, [root.id, run.id, input.workerId, `running->${phase}`, note, verdict.reason, input.idempotencyKey, input.now]);
      return verdict;
    });
  }

  async function submitPrePrVerdict(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const selfRequest = (await d.get(`SELECT r.type FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.id=?`, [Number(ticketId)]))?.type === 'self';
    const verdict = validatePrePrVerdict(input.verdict, selfRequest);
    return submitPrePrVerdictTransaction(Number(ticketId), { ...input, idempotencyKey, now: input.now ?? Date.now() }, verdict);
  }

  return { createRequestWithRoot, claimNext, heartbeat, createRun, submitPlan, submitPrePrVerdict };
}
