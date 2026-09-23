import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { PlanGuardrailError, validatePlan } from './policy.js';

export { PlanGuardrailError } from './policy.js';

const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');
const REQUEST_TYPES = new Set(['game', 'theory', 'lab', 'skill', 'other']);
const REQUEST_STATUSES = new Set(['pending', 'reviewing', 'done', 'rejected']);
const WORKER_MODES = new Set(['off', 'shadow']);
const CLAIM_INTENTS = new Set(['precheck', 'plan']);
const RUN_TRIGGERS = new Set(['shadow_precheck', 'plan']);
const EVENT_TYPES = new Set([
  'shadow_precheck_passed', 'shadow_precheck_failed', 'plan_validated',
  'plan_blocked', 'heartbeat', 'lease_released',
]);

export class WorkerContractError extends Error {
  constructor(message, status = 400, code = 'invalid_worker_operation') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export class RequestValidationError extends Error {}

export function applyAiBoardMigrations(db, migrationsDir = MIGRATIONS_DIR) {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    scope TEXT NOT NULL,
    version TEXT NOT NULL,
    applied_at INTEGER NOT NULL,
    PRIMARY KEY(scope, version)
  )`);
  const applied = db.prepare('SELECT 1 FROM schema_migrations WHERE scope = ? AND version = ?');
  const record = db.prepare('INSERT INTO schema_migrations(scope, version, applied_at) VALUES (?, ?, ?)');
  const run = db.transaction((version, sql) => {
    db.exec(sql);
    record.run('ai-board', version, Date.now());
  });
  for (const version of fs.readdirSync(migrationsDir).filter((name) => /^\d+.*\.sql$/.test(name)).sort()) {
    if (!applied.get('ai-board', version)) {
      run(version, fs.readFileSync(path.join(migrationsDir, version), 'utf8'));
    }
  }
}

function cleanAttachments(value) {
  if (!Array.isArray(value)) return null;
  const items = value.slice(0, 10).map((item) => ({
    url: String(item?.url || '').slice(0, 500),
    name: String(item?.name || '').slice(0, 200),
    mime: String(item?.mime || '').slice(0, 100),
    size: Number(item?.size) || 0,
    kind: item?.kind === 'screenshot' ? 'screenshot' : 'file',
  })).filter((item) => item.url);
  return items.length ? JSON.stringify(items) : null;
}

function parseAttachments(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createAiBoardStore(db, hooks = {}) {
  const findRetry = db.prepare(`
    SELECT r.id AS request_id, t.id AS root_ticket_id
    FROM requests r JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.owner_user_id = ? AND r.idempotency_key = ?
  `);
  const insertRequest = db.prepare(`
    INSERT INTO requests (
      domain, type, title, detail, student, status, votes, created_at, updated_at,
      attachments, owner_user_id, owner_domain, idempotency_key, owner_state
    ) VALUES (
      @domain, @type, @title, @detail, @student, 'pending', 1, @now, @now,
      @attachments, @owner_user_id, @owner_domain, @idempotency_key, 'verified'
    )
  `);
  const insertRoot = db.prepare(`
    INSERT INTO ai_tickets (
      source_request_id, sequence, kind, title, description, status, phase,
      priority, public_note, internal_reason, created_at, updated_at
    ) VALUES (
      @request_id, 0, 'root', @title, @description, 'queued', 'intake',
      0, 'Yêu cầu đã được ghi nhận và đang chờ xử lý.', NULL, @now, @now
    )
  `);
  const insertTag = db.prepare('INSERT OR IGNORE INTO ai_ticket_tags(ticket_id, tag) VALUES (?, ?)');
  const insertEvent = db.prepare(`
    INSERT INTO ai_events (
      ticket_id, event_type, actor_type, actor_id, transition,
      public_message, internal_detail, idempotency_key, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const createRequestTransaction = db.transaction((input) => {
    const retry = findRetry.get(input.ownerUserId, input.idempotencyKey);
    if (retry) return { ...retry, created: false };
    const now = input.now ?? Date.now();
    const info = insertRequest.run({
      domain: input.ownerDomain,
      type: REQUEST_TYPES.has(input.type) ? input.type : 'other',
      title: String(input.title).trim().slice(0, 200),
      detail: input.detail ? String(input.detail).slice(0, 10000) : null,
      student: String(input.ownerDisplayName || input.ownerUserId).slice(0, 60),
      attachments: cleanAttachments(input.attachments),
      owner_user_id: input.ownerUserId,
      owner_domain: input.ownerDomain,
      idempotency_key: input.idempotencyKey,
      now,
    });
    const requestId = Number(info.lastInsertRowid);
    hooks.afterRequestInserted?.({ requestId, input });
    const root = insertRoot.run({ request_id: requestId, title: input.title, description: input.detail || null, now });
    const rootTicketId = Number(root.lastInsertRowid);
    insertTag.run(rootTicketId, 'request');
    insertTag.run(rootTicketId, `domain:${input.ownerDomain}`);
    insertEvent.run(
      rootTicketId, 'request_created', 'requester', String(input.ownerUserId),
      'created->queued', 'Yêu cầu đã được ghi nhận.', null,
      `request-created:${input.idempotencyKey}`, now,
    );
    return { request_id: requestId, root_ticket_id: rootTicketId, created: true };
  });

  function createRequestWithRoot(input) {
    if (!Number.isInteger(Number(input.ownerUserId)) || Number(input.ownerUserId) <= 0) throw new RequestValidationError('ownerUserId is required');
    const domain = String(input.ownerDomain || '').trim();
    if (!domain) throw new RequestValidationError('ownerDomain is required');
    const title = String(input.title || '').trim();
    if (title.length < 4) throw new RequestValidationError('title is too short');
    const idempotencyKey = String(input.idempotencyKey || '').trim();
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new RequestValidationError('invalid idempotency key');
    return createRequestTransaction({
      ...input,
      ownerUserId: Number(input.ownerUserId),
      ownerDomain: domain.slice(0, 40),
      title,
      idempotencyKey,
    });
  }

  function listRequestsForOwner(ownerUserId, domain, limit = 50) {
    const rows = db.prepare(`
      SELECT r.id, r.domain, r.type, r.title, r.detail, r.student, r.status, r.votes,
             r.admin_note, r.created_at, r.updated_at, r.attachments,
             t.id AS root_ticket_id, t.status AS workflow_status, t.phase,
             t.public_note
      FROM requests r
      LEFT JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
      WHERE r.owner_user_id = ? AND r.domain = ?
      ORDER BY r.updated_at DESC LIMIT ?
    `).all(Number(ownerUserId), String(domain || ''), Math.min(Math.max(Number(limit) || 50, 1), 200));
    return rows.map((row) => ({ ...row, attachments: parseAttachments(row.attachments) }));
  }

  const setStatusTransaction = db.transaction((requestId, status, note, actorId) => {
    const root = db.prepare('SELECT id FROM ai_tickets WHERE source_request_id = ? AND parent_id IS NULL').get(requestId);
    const result = db.prepare('UPDATE requests SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?')
      .run(status, note || null, Date.now(), requestId);
    if (!result.changes || !root) return false;
    insertEvent.run(
      root.id, 'request_status_changed', 'admin', String(actorId), null,
      note || null, `request status -> ${status}`, `status:${requestId}:${Date.now()}`, Date.now(),
    );
    return true;
  });

  function setRequestStatus(requestId, status, note, actorId) {
    if (!REQUEST_STATUSES.has(status)) return false;
    return setStatusTransaction(Number(requestId), status, note ? String(note).slice(0, 500) : null, actorId);
  }

  function listAdminQueue(limit = 100) {
    return db.prepare(`
      SELECT t.id, t.source_request_id, t.title, t.status, t.phase, t.priority,
             t.public_note, t.internal_reason, t.lease_owner, t.lease_expires_at,
             r.domain, r.owner_user_id, r.owner_state, r.created_at
      FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.parent_id IS NULL
      ORDER BY t.priority DESC, t.created_at ASC LIMIT ?
    `).all(Math.min(Math.max(Number(limit) || 100, 1), 500));
  }

  function listWorkers() {
    return db.prepare(`
      SELECT worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at
      FROM ai_workers ORDER BY last_seen_at DESC, worker_id
    `).all();
  }

  function assertLease(ticketId, workerId, leaseToken, now = Date.now()) {
    const ticket = db.prepare(`
      SELECT * FROM ai_tickets WHERE id = ? AND kind = 'root'
    `).get(Number(ticketId));
    if (!ticket) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (!workerId || ticket.lease_owner !== workerId || !leaseToken || ticket.lease_token !== leaseToken) {
      throw new WorkerContractError('lease does not belong to worker', 409, 'stale_lease');
    }
    if (!ticket.lease_expires_at || ticket.lease_expires_at <= now) {
      throw new WorkerContractError('lease expired', 409, 'stale_lease');
    }
    return ticket;
  }

  const claimTransaction = db.transaction(({ workerId, version, mode, intent, now, leaseMs }) => {
    if (!WORKER_MODES.has(mode)) throw new WorkerContractError('invalid worker mode');
    if (!CLAIM_INTENTS.has(intent)) throw new WorkerContractError('invalid claim intent');
    db.prepare(`
      INSERT INTO ai_workers(worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at)
      VALUES (?, ?, ?, ?, NULL, ?, ?)
      ON CONFLICT(worker_id) DO UPDATE SET
        version=excluded.version, mode=excluded.mode, status=excluded.status,
        last_seen_at=excluded.last_seen_at, updated_at=excluded.updated_at
    `).run(workerId, version, mode, mode === 'off' ? 'stopped' : 'idle', now, now);
    if (mode === 'off') return null;

    const current = db.prepare(`
      SELECT id, lease_token, lease_expires_at, status, phase
      FROM ai_tickets
      WHERE kind='root' AND lease_owner=? AND lease_expires_at>?
      ORDER BY updated_at DESC LIMIT 1
    `).get(workerId, now);
    if (current) return current;

    const candidate = db.prepare(`
      SELECT t.id
      FROM ai_tickets t JOIN requests r ON r.id=t.source_request_id
      WHERE t.kind='root' AND r.owner_state='verified'
        AND ((t.status='queued' AND (
              t.phase IN ('intake', 'needs_replan')
              OR (? = 'plan' AND t.phase = 'shadow_checked')
            ))
          OR (t.status='running' AND t.lease_expires_at<=?))
        ORDER BY t.priority DESC, t.created_at ASC LIMIT 1
    `).get(intent, now);
    if (!candidate) return null;
    const token = randomBytes(24).toString('hex');
    const expires = now + leaseMs;
    const phase = intent === 'plan' ? 'planning' : 'shadow_precheck';
    db.prepare(`
      UPDATE ai_tickets SET status='running', phase=?, lease_owner=?,
        lease_token=?, lease_expires_at=?, updated_at=? WHERE id=?
    `).run(phase, workerId, token, expires, now, candidate.id);
    db.prepare(`
      UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=?
      WHERE worker_id=?
    `).run(candidate.id, now, now, workerId);
    insertEvent.run(
      candidate.id, 'heartbeat', 'worker', workerId, 'queued->running',
      null, 'worker claimed root ticket', `claim:${workerId}:${candidate.id}:${token}`, now,
    );
    return { id: candidate.id, lease_token: token, lease_expires_at: expires, status: 'running', phase };
  });

  function claimNext({ workerId, version = 'unknown', mode = 'off', intent = 'precheck', now = Date.now(), leaseMs = 120_000 }) {
    workerId = String(workerId || '').trim();
    if (!/^[A-Za-z0-9._:-]{2,80}$/.test(workerId)) throw new WorkerContractError('invalid worker id');
    return claimTransaction({ workerId, version: String(version).slice(0, 80), mode, intent, now, leaseMs });
  }

  function getLeasedSnapshot(ticketId, workerId, leaseToken, now = Date.now()) {
    const ticket = assertLease(ticketId, workerId, leaseToken, now);
    const request = db.prepare(`
      SELECT id, domain, type, title, detail, student, status, owner_user_id,
             owner_domain, owner_state, created_at, updated_at, attachments
      FROM requests WHERE id=?
    `).get(ticket.source_request_id);
    const thread = db.prepare(`
      SELECT id, role, author_name, body, attachments, created_at
      FROM request_messages WHERE request_id=? ORDER BY created_at, id
    `).all(ticket.source_request_id).map((row) => ({ ...row, attachments: parseAttachments(row.attachments) }));
    return { ticket: { ...ticket, lease_token: undefined }, request: { ...request, attachments: parseAttachments(request.attachments) }, thread };
  }

  function heartbeat(ticketId, workerId, leaseToken, { now = Date.now(), leaseMs = 120_000 } = {}) {
    assertLease(ticketId, workerId, leaseToken, now);
    const expires = now + leaseMs;
    db.prepare('UPDATE ai_tickets SET lease_expires_at=?, updated_at=? WHERE id=?').run(expires, now, Number(ticketId));
    db.prepare(`UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=? WHERE worker_id=?`)
      .run(Number(ticketId), now, now, workerId);
    return { lease_expires_at: expires };
  }

  const createRunTransaction = db.transaction((ticketId, input) => {
    assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (!RUN_TRIGGERS.has(input.trigger)) throw new WorkerContractError('invalid run trigger');
    const existing = db.prepare('SELECT * FROM ai_runs WHERE ticket_id=? AND idempotency_key=?')
      .get(Number(ticketId), input.idempotencyKey);
    if (existing) return existing;
    const attempt = db.prepare('SELECT COUNT(*) n FROM ai_runs WHERE ticket_id=?').get(Number(ticketId)).n + 1;
    const info = db.prepare(`
      INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, worker_id, idempotency_key, created_at, updated_at)
      VALUES (?, ?, ?, NULL, ?, ?, ?, ?)
    `).run(Number(ticketId), attempt, input.trigger, input.workerId, input.idempotencyKey, input.now, input.now);
    return db.prepare('SELECT * FROM ai_runs WHERE id=?').get(Number(info.lastInsertRowid));
  });

  function createRun(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return createRunTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  const recordWorkerEventTransaction = db.transaction((ticketId, input) => {
    assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (!EVENT_TYPES.has(input.eventType)) throw new WorkerContractError('invalid event type');
    const existing = db.prepare('SELECT * FROM ai_events WHERE ticket_id=? AND idempotency_key=?')
      .get(Number(ticketId), input.idempotencyKey);
    if (existing) return existing;
    if (input.runId) {
      const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
      if (!run) throw new WorkerContractError('run does not belong to ticket');
    }
    const info = db.prepare(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, ?, 'worker', ?, NULL, ?, ?, ?, ?)
    `).run(
      Number(ticketId), input.runId ? Number(input.runId) : null, input.eventType, input.workerId,
      input.publicMessage || null, input.internalDetail || null, input.idempotencyKey, input.now,
    );
    return db.prepare('SELECT * FROM ai_events WHERE id=?').get(Number(info.lastInsertRowid));
  });

  function recordWorkerEvent(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return recordWorkerEventTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  const releaseTransaction = db.transaction((ticketId, input) => {
    const priorRelease = db.prepare(`
      SELECT worker_id, status, phase FROM ai_release_receipts
      WHERE ticket_id=? AND idempotency_key=?
    `).get(Number(ticketId), input.idempotencyKey);
    if (priorRelease) {
      if (priorRelease.worker_id !== input.workerId) throw new WorkerContractError('release key belongs to another worker', 409, 'idempotency_conflict');
      return { status: priorRelease.status, phase: priorRelease.phase, duplicate: true };
    }
    const current = assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const states = {
      shadow_ok: ['queued', 'shadow_checked', 'Đã qua kiểm tra ban đầu; đang chờ lập kế hoạch.'],
      waiting: ['waiting', 'precheck_blocked', 'Yêu cầu đang chờ thêm thông tin.'],
      failed: ['waiting', 'precheck_failed', 'Kiểm tra ban đầu chưa đạt.'],
    };
    const plannedStatuses = new Set(['planned', 'waiting_authorization', 'human_owned', 'waiting_admin']);
    const next = input.outcome === 'planned' && plannedStatuses.has(current.status)
      ? [current.status, current.phase, current.public_note]
      : states[input.outcome];
    if (!next) throw new WorkerContractError('invalid release outcome');
    db.prepare(`
      UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=? WHERE id=?
    `).run(next[0], next[1], next[2], input.internalDetail || null, input.now, Number(ticketId));
    db.prepare(`UPDATE ai_workers SET status='idle', current_ticket_id=NULL, last_seen_at=?, updated_at=? WHERE worker_id=?`)
      .run(input.now, input.now, input.workerId);
    db.prepare(`INSERT INTO ai_release_receipts(ticket_id, idempotency_key, worker_id, status, phase, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .run(Number(ticketId), input.idempotencyKey, input.workerId, next[0], next[1], input.now);
    insertEvent.run(
      Number(ticketId), 'lease_released', 'worker', input.workerId, `running->${next[0]}`,
      next[2], input.internalDetail || null, input.idempotencyKey, input.now,
    );
    return { status: next[0], phase: next[1] };
  });

  function releaseLease(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return releaseTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  function planChildren(rootTicketId, revision) {
    return db.prepare(`
      SELECT id, parent_id, source_request_id, sequence, kind, title, description,
             status, phase, tier, plan_revision
      FROM ai_tickets WHERE parent_id=? AND plan_revision=? ORDER BY sequence
    `).all(Number(rootTicketId), Number(revision));
  }

  const recordPlanBlockTransaction = db.transaction((ticketId, input, error) => {
    const now = input.now ?? Date.now();
    const eventKey = `plan-block:${input.idempotencyKey}`;
    const existing = db.prepare('SELECT * FROM ai_events WHERE ticket_id=? AND idempotency_key=?')
      .get(Number(ticketId), eventKey);
    if (existing) return existing;
    assertLease(ticketId, input.workerId, input.leaseToken, now);
    db.prepare(`
      UPDATE ai_tickets SET status='waiting', phase='plan_blocked', public_note=?,
        internal_reason=?, updated_at=? WHERE id=?
    `).run(error.publicMessage, error.internalReason, now, Number(ticketId));
    if (input.runId) {
      const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
      if (run) db.prepare(`
        INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
        VALUES (?, 2.5, 'blocked', ?, ?, ?)
      `).run(run.id, error.publicMessage, error.internalReason, now);
    }
    insertEvent.run(
      Number(ticketId), 'plan_blocked', 'worker', input.workerId, 'running->waiting',
      error.publicMessage, error.internalReason, eventKey, now,
    );
    return true;
  });

  function recordPlanBlock(ticketId, input, error) {
    return recordPlanBlockTransaction(ticketId, input, error);
  }

  const submitPlanTransaction = db.transaction((ticketId, input, checked) => {
    const now = input.now;
    const root = assertLease(ticketId, input.workerId, input.leaseToken, now);
    const request = db.prepare('SELECT domain FROM requests WHERE id=?').get(root.source_request_id);
    if (request.domain !== checked.plan.domain) throw new PlanGuardrailError('domain_mismatch', 'request domain changed during plan submission');
    const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
    if (!run) throw new WorkerContractError('run does not belong to ticket');

    const existing = db.prepare(`
      SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status='valid'
    `)
      .get(Number(ticketId), checked.planHash);
    if (existing) {
      return {
        plan_hash: existing.plan_hash,
        tier: existing.tier,
        status: root.status,
        children: planChildren(ticketId, existing.revision),
        duplicate: true,
      };
    }

    const rounds = root.auto_rounds + 1;
    const budget = root.cumulative_budget + input.budgetUsed;
    if (rounds > 2 || budget > 200) {
      const reason = rounds > 2 ? 'automatic_round_limit' : 'cumulative_budget_exhausted';
      db.prepare(`
        UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
          public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
          auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
      `).run(reason, rounds, budget, now, Number(ticketId));
      return { plan_hash: checked.planHash, tier: checked.tier, status: 'waiting_admin', reason, children: [] };
    }

    const revision = root.plan_revision + 1;
    const authorized = !!db.prepare(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `).get(Number(ticketId), checked.planHash, revision);
    let rootStatus = 'planned';
    let childStatus = 'queued';
    let publicNote = 'Kế hoạch đã được kiểm tra và chia thành các việc theo thứ tự.';
    let internalReason = null;
    if (checked.tier === 'protected' && !authorized) {
      rootStatus = childStatus = 'waiting_authorization';
      publicNote = 'Kế hoạch đang chờ quản trị viên cho phép trước khi triển khai.';
      internalReason = 'protected capability requires explicit admin authorization';
    } else if (checked.tier === 'core') {
      rootStatus = childStatus = 'human_owned';
      publicNote = 'Yêu cầu chạm phần lõi và đã được chuyển cho con người xử lý.';
      internalReason = 'core capability cannot be auto-implemented';
    }
    db.prepare(`
      INSERT INTO ai_plans(root_ticket_id, revision, plan_hash, plan_json, status, tier,
        capability_policy_hash, public_reason, internal_reason, created_at)
      VALUES (?, ?, ?, ?, 'valid', ?, ?, ?, ?, ?)
    `).run(Number(ticketId), revision, checked.planHash, checked.planJson, checked.tier,
      checked.policyHash, publicNote, internalReason, now);
    db.prepare(`
      UPDATE ai_tickets SET status=?, phase='ticketized', public_note=?, internal_reason=?,
        tier=?, plan_hash=?, plan_revision=?, auto_rounds=?, cumulative_budget=?, updated_at=?
      WHERE id=?
    `).run(rootStatus, publicNote, internalReason, checked.tier, checked.planHash, revision, rounds, budget, now, Number(ticketId));

    const insertChild = db.prepare(`
      INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
        status, phase, priority, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
      VALUES (?, ?, ?, 'implementation', ?, ?, ?, 'ticketized', ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const step of checked.plan.steps) {
      const info = insertChild.run(
        Number(ticketId), root.source_request_id, step.order, step.title,
        JSON.stringify({
          description: step.description, allowed_scope: step.allowed_scope,
          acceptance: step.acceptance, tests: step.tests, risk: step.risk, non_goals: step.non_goals,
        }),
        childStatus, checked.plan.steps.length - step.order, publicNote, internalReason,
        checked.tier, revision, now, now,
      );
      const childId = Number(info.lastInsertRowid);
      insertTag.run(childId, 'implementation');
      insertTag.run(childId, `capability:${step.capability}`);
    }
    const trace = db.prepare(`
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
      VALUES (?, ?, 'passed', NULL, NULL, ?)
    `);
    for (const gate of [1, 2, 2.5]) trace.run(run.id, gate, now);
    insertEvent.run(
      Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${rootStatus}`,
      publicNote, internalReason, `plan-valid:${input.idempotencyKey}`, now,
    );
    return {
      plan_hash: checked.planHash,
      capability_policy_hash: checked.policyHash,
      tier: checked.tier,
      status: rootStatus,
      children: planChildren(ticketId, revision),
      duplicate: false,
    };
  });

  function submitPlan(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const budgetUsed = Number(input.budgetUsed ?? 0);
    if (!Number.isFinite(budgetUsed) || budgetUsed < 0) throw new WorkerContractError('invalid budget');
    const now = input.now ?? Date.now();
    const root = assertLease(ticketId, input.workerId, input.leaseToken, now);
    const request = db.prepare('SELECT domain FROM requests WHERE id=?').get(root.source_request_id);
    let checked;
    try {
      checked = validatePlan(input.plan, request.domain);
    } catch (error) {
      if (!(error instanceof PlanGuardrailError)) throw error;
      recordPlanBlock(ticketId, { ...input, idempotencyKey, now }, error);
      throw error;
    }
    return submitPlanTransaction(Number(ticketId), { ...input, idempotencyKey, budgetUsed, now }, checked);
  }

  const authorizePlanTransaction = db.transaction((rootTicketId, planHash, adminUserId, now) => {
    const plan = db.prepare('SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status=?')
      .get(Number(rootTicketId), String(planHash), 'valid');
    if (!plan) throw new WorkerContractError('plan not found', 404, 'plan_not_found');
    if (plan.tier === 'core') throw new WorkerContractError('core work remains human-owned', 409, 'core_human_owned');
    db.prepare(`INSERT OR IGNORE INTO ai_authorizations(root_ticket_id, plan_hash, plan_revision, admin_user_id, created_at) VALUES (?, ?, ?, ?, ?)`)
      .run(Number(rootTicketId), String(planHash), Number(plan.revision), Number(adminUserId), now);
    if (plan.tier === 'protected') {
      db.prepare(`UPDATE ai_tickets SET status='planned', public_note='Kế hoạch đã được cho phép.', internal_reason=NULL, updated_at=? WHERE id=?`)
        .run(now, Number(rootTicketId));
      db.prepare(`UPDATE ai_tickets SET status='queued', public_note='Kế hoạch đã được cho phép.', internal_reason=NULL, updated_at=? WHERE parent_id=? AND plan_revision=?`)
        .run(now, Number(rootTicketId), plan.revision);
    }
    return { ok: true };
  });

  function authorizePlan(rootTicketId, planHash, adminUserId) {
    return authorizePlanTransaction(rootTicketId, planHash, adminUserId, Date.now());
  }

  const invalidatePlanTransaction = db.transaction((requestId, reason, now) => {
    const root = db.prepare(`SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL`).get(Number(requestId));
    if (!root || !root.plan_hash) return false;
    db.prepare(`UPDATE ai_plans SET status='invalidated', invalidated_at=? WHERE root_ticket_id=? AND plan_hash=? AND status='valid'`)
      .run(now, root.id, root.plan_hash);
    db.prepare(`UPDATE ai_tickets SET status='invalidated', phase='clarification_received', updated_at=? WHERE parent_id=? AND plan_revision=?`)
      .run(now, root.id, root.plan_revision);
    db.prepare(`
      UPDATE ai_tickets SET status='queued', phase='needs_replan',
        public_note='Thông tin mới đã được ghi nhận; kế hoạch sẽ được làm lại.',
        internal_reason=?, plan_hash=NULL, lease_owner=NULL, lease_token=NULL,
        lease_expires_at=NULL, updated_at=? WHERE id=?
    `).run(String(reason || 'requester clarification').slice(0, 500), now, root.id);
    return true;
  });

  function invalidatePlanForRequest(requestId, reason) {
    return invalidatePlanTransaction(requestId, reason, Date.now());
  }

  return {
    db,
    createRequestWithRoot,
    listRequestsForOwner,
    setRequestStatus,
    listAdminQueue,
    listWorkers,
    claimNext,
    getLeasedSnapshot,
    heartbeat,
    createRun,
    recordWorkerEvent,
    releaseLease,
    submitPlan,
    authorizePlan,
    invalidatePlanForRequest,
  };
}
