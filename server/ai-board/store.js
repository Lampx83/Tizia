import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { CAPABILITY_CATALOG, PlanGuardrailError, validatePlan } from './policy.js';

export { PlanGuardrailError } from './policy.js';

const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');
// Worker <-> server contract, shared with ai-board/worker.py.
export const CONTRACT = JSON.parse(fs.readFileSync(new URL('./contract.json', import.meta.url), 'utf8'));
const KEY = new RegExp(CONTRACT.idempotency_key_pattern);
const REQUEST_TYPES = new Set(['game', 'theory', 'lab', 'skill', 'other']);
const REQUEST_STATUSES = new Set(['pending', 'reviewing', 'done', 'rejected']);
const WORKER_MODES = new Set(['off', 'shadow', 'active']);
const CLAIM_INTENTS = new Set(['precheck', 'plan']);
const RUN_TRIGGERS = new Set(CONTRACT.run_triggers);
const EVENT_TYPES = new Set([
  'shadow_precheck_passed', 'shadow_precheck_failed', 'plan_validated',
  'plan_blocked', 'heartbeat', 'lease_released', 'gate_started',
]);
// Vòng đời root — nguồn duy nhất cho claim, nhãn admin và hoàn tác.
// queue: intent nhận được khi status='queued' ('any' | 'plan'); active: chỉ worker 'active' được nhận (kể cả cứu
// lease hết hạn); lease: phase lease chạy dưới (thiếu = 'planning'/'shadow_precheck' theo intent); trigger: loại run
// của lease ở phase này; rollback: đang/đã hoàn tác (không yêu cầu hoàn tác lần nữa); terminal: đóng hẳn.
const PHASES = {
  intake: { label: 'mới nhận', queue: 'any' },
  needs_replan: { label: 'chờ lập lại kế hoạch', queue: 'any' },
  shadow_checked: { label: 'đã kiểm tra, chờ lập kế hoạch', queue: 'plan' },
  authorized: { label: 'đã được cho phép, chờ worker', queue: 'plan', active: true, lease: 'executing' },
  rollback: { label: 'chờ worker hoàn tác', queue: 'plan', active: true, lease: 'rolling_back', rollback: true },
  shadow_precheck: { label: 'kiểm tra ban đầu', trigger: 'shadow_precheck' },
  planning: { label: 'đang lập kế hoạch', trigger: 'plan' },
  executing: { label: 'đang thực hiện kế hoạch đã duyệt', active: true, lease: 'executing', trigger: 'execute' },
  rolling_back: { label: 'đang hoàn tác', active: true, lease: 'rolling_back', trigger: 'rollback', rollback: true },
  precheck_blocked: { label: 'chờ thêm thông tin' },
  precheck_failed: { label: 'kiểm tra ban đầu chưa đạt' },
  plan_blocked: { label: 'kế hoạch bị chặn' },
  ticketized: { label: 'đã chia việc' },
  pre_pr_ready: { label: 'đã qua kiểm tra, sẵn sàng PR' },
  pre_pr_review: { label: 'cần người xem trước PR' },
  pre_pr_blocked: { label: 'chưa qua kiểm tra trước PR' },
  critical_violation: { label: 'vi phạm an toàn' },
  budget_exhausted: { label: 'hết ngân sách' },
  plan_unfit: { label: 'kế hoạch không làm được' },
  budget_ceiling: { label: 'vượt trần ngân sách, chuyển cho người', terminal: true },
  requester_cancelled: { label: 'người gửi đã hủy', terminal: true },
  admin_rejected: { label: 'admin đã từ chối', terminal: true },
  rolled_back: { label: 'đã hoàn tác', rollback: true, terminal: true },
  revert_ready: { label: 'có nhánh hoàn tác, chờ người merge', rollback: true },
  rollback_failed: { label: 'hoàn tác chưa được' },
};
// Danh sách SQL IN(...) sinh từ bảng; khóa là hằng trong code nên nhúng thẳng an toàn.
const phaseList = (pick) => Object.keys(PHASES).filter((k) => pick(PHASES[k])).map((k) => `'${k}'`).join(', ');
const ANY_QUEUE = phaseList((p) => p.queue === 'any');
const PLAN_QUEUE = phaseList((p) => p.queue === 'plan');
const ACTIVE_ONLY = phaseList((p) => p.active);
const triggerFor = (phase, intent) => PHASES[phase]?.trigger ?? (intent === 'plan' ? 'plan' : 'shadow_precheck');

// Xác nhận lần 2 kiểm ở server: admin phải gõ đúng số yêu cầu (có hoặc không '#').
export function assertConfirmed(requestId, confirm) {
  if (String(confirm ?? '').trim().replace(/^#/, '') !== String(Number(requestId))) {
    throw new WorkerContractError('type the request number to confirm', 400, 'confirmation_required');
  }
}

const ROLLBACK_OUTCOMES = {
  discarded: ['cancelled', 'rolled_back', 'Thay đổi của yêu cầu này đã được hoàn tác theo quyết định của quản trị viên.'],
  revert_ready: ['waiting_admin', 'revert_ready', 'Đã tạo nhánh hoàn tác; chờ con người merge.'],
  failed: ['waiting_admin', 'rollback_failed', 'Hoàn tác chưa thực hiện được; chờ quản trị viên xem xét.'],
};
const PRE_PR_GATES = new Set(CONTRACT.gates.pre_pr);
const ALL_GATES = [...CONTRACT.gates.plan, ...CONTRACT.gates.pre_pr];
const PRE_PR_SEQUENCE = CONTRACT.gates.pre_pr;
const FAILURE_CLASSES = new Set(CONTRACT.failure_classes);
const MAX_REPAIRS = CONTRACT.max_repairs;
const MAX_BUDGET_EXTENSION = 200;
// ponytail: fixed D0 ceilings from the hardening spec; make them admin config only if real tickets hit them.
const MAX_BUDGET_LIMIT = 600; // hard ceiling across all extensions of one root
const MAX_BUDGET_EXTENSIONS = 2;
const SHA = /^[0-9a-f]{40}$/;
export const LEASE_MS = 120_000; // worker lease; also the admin view's stale threshold
const AI_BRANCH = new RegExp(CONTRACT.branch_pattern);

function validateCandidate(value) {
  const commits = Array.isArray(value?.commits) ? value.commits : [];
  const ok = value && typeof value === 'object' && AI_BRANCH.test(String(value.branch))
    && SHA.test(String(value.base_sha)) && SHA.test(String(value.head_sha))
    && commits.length >= 1 && commits.length <= 20
    && commits.every((c) => SHA.test(String(c?.sha)) && Array.isArray(c?.files) && c.files.length <= 20)
    && commits.at(-1).sha === value.head_sha;
  if (!ok) throw new WorkerContractError('invalid pre-PR candidate');
  return {
    branch: value.branch, base_sha: value.base_sha, head_sha: value.head_sha,
    commits: commits.map((c) => ({
      sha: c.sha, title: String(c.title || '').slice(0, 200), files: c.files.map((f) => String(f).slice(0, 300)),
    })),
  };
}

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

function validatePrePrVerdict(value) {
  if (!value || typeof value !== 'object' || !CONTRACT.verdict_outcomes.includes(value.outcome)) {
    throw new WorkerContractError('invalid pre-PR verdict');
  }
  if (!Array.isArray(value.gates) || value.gates.length < 1 || value.gates.length > 4) {
    throw new WorkerContractError('invalid pre-PR gates');
  }
  let previous = 0;
  const gates = value.gates.map((item) => {
    const gate = Number(item?.gate);
    if (!PRE_PR_GATES.has(gate) || gate <= previous || typeof item?.blocked !== 'boolean') {
      throw new WorkerContractError('invalid pre-PR gate result');
    }
    previous = gate;
    const clean = { gate, blocked: item.blocked, reason: item.reason ? String(item.reason).slice(0, 1000) : null };
    if (gate === 4) clean.issues = Array.isArray(item.issues) ? item.issues.slice(0, 20).map((x) => String(x).slice(0, 500)) : [];
    if (gate === 4) clean.checks = Array.isArray(item.checks) ? item.checks.slice(0, 20).map((x) => String(x).slice(0, 40)) : [];
    if (gate === 5) {
      clean.smoke_passed = item.smoke_passed === true;
      clean.http_observed = item.http_observed === true;
      clean.retried = item.retried === true;
      clean.runner = ['docker', 'fake'].includes(item.runner) ? item.runner : null;
    }
    if (gate === 5.5) {
      clean.risk_level = ['low', 'medium', 'high', 'critical'].includes(item.risk_level) ? item.risk_level : null;
      clean.risk_signals = Array.isArray(item.risk_signals) ? item.risk_signals.slice(0, 20).map((signal) => ({
        name: String(signal?.name || '').slice(0, 80),
        tier: String(signal?.tier || '').slice(0, 20),
        detail: String(signal?.detail || '').slice(0, 500),
      })) : [];
    }
    return clean;
  });
  const last = gates.at(-1);
  if (gates.some((gate, index) => gate.gate !== PRE_PR_SEQUENCE[index])) {
    throw new WorkerContractError('pre-PR gates must be sequential');
  }
  if (Number(value.gate_reached) !== last.gate) throw new WorkerContractError('pre-PR gate mismatch');
  const gate5 = gates.find((gate) => gate.gate === 5);
  const gate55 = gates.find((gate) => gate.gate === 5.5);
  const passed = last.gate === 5.5 && !gates.some((gate) => gate.blocked)
    && gate5?.smoke_passed === true && gate5?.http_observed === true;
  const passing = ['ready_for_pr', 'needs_review'].includes(value.outcome);
  if (passing && !passed) {
    throw new WorkerContractError('passing verdict requires successful smoke through gate 5.5');
  }
  if (passing && gate5.runner !== 'docker') {
    throw new WorkerContractError('passing verdict requires gate 5 on real docker');
  }
  if (value.outcome === 'ready_for_pr' && !['low', 'medium'].includes(gate55?.risk_level))
    throw new WorkerContractError('ready verdict requires low or medium risk');
  if (value.outcome === 'needs_review' && !['high', 'critical'].includes(gate55?.risk_level))
    throw new WorkerContractError('review verdict requires high or critical risk');
  if (value.outcome === 'blocked' && !last.blocked) throw new WorkerContractError('blocked verdict requires a blocked gate');
  const budgetUsed = Number(value.budget_used ?? 0);
  if (!Number.isInteger(budgetUsed) || budgetUsed < 0) throw new WorkerContractError('invalid verdict budget');
  // Workers predating ticket 05 omit failure_class; their blocks are treated as ordinary.
  const failureClass = value.outcome === 'blocked' ? (value.failure_class ?? 'ordinary') : (value.failure_class ?? null);
  if (value.outcome === 'blocked' ? !FAILURE_CLASSES.has(failureClass) : failureClass !== null) {
    throw new WorkerContractError('invalid pre-PR failure class');
  }
  const repairs = value.repairs ?? [];
  if (!Array.isArray(repairs) || repairs.length > MAX_REPAIRS
    || repairs.some((r) => !PRE_PR_GATES.has(Number(r?.gate)))) {
    throw new WorkerContractError('invalid pre-PR repairs');
  }
  const candidate = value.candidate == null ? null : validateCandidate(value.candidate);
  if (candidate && value.outcome === 'blocked') throw new WorkerContractError('blocked verdict cannot keep a candidate');
  if (!candidate && value.outcome !== 'blocked') throw new WorkerContractError('passing verdict requires its candidate branch');
  return { outcome: value.outcome, gate_reached: last.gate, reason: value.reason ? String(value.reason).slice(0, 1000) : last.reason,
    budget_used: budgetUsed, failure_class: failureClass,
    repairs: repairs.map((r) => ({ gate: Number(r.gate), reason: String(r.reason || '').slice(0, 1000) })),
    candidate, gates };
}

const MAX_TRACE_BATCH = 50;
const CALL_RESULTS = new Set(['ok', 'retry', 'error', 'http_error', 'timeout']);
const CALL_METRICS = ['wall_ms', 'tokens_in', 'tokens_out', 'tok_s', 'gpu_ms', 'load_ms', 'prompt_eval_ms', 'eval_ms', 'queue_ms'];
const num = (v) => (v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));
const str = (v, max) => (v == null ? null : String(v).slice(0, max));

/** Whitelist + cap one worker model-call record. Throw invalid_trace on bad call_id/gate. */
function cleanModelCall(c) {
  const callId = typeof c?.call_id === 'string' ? c.call_id : '';
  if (!callId || callId.length > 120) throw new WorkerContractError('invalid call_id', 400, 'invalid_trace');
  const gate = num(c.gate);
  if (gate === null) throw new WorkerContractError('invalid gate', 400, 'invalid_trace');
  const m = c.metrics && typeof c.metrics === 'object' ? c.metrics : {};
  const promptVar = str(c.prompt_var, Infinity);
  const output = str(c.output, Infinity);
  return {
    call_id: callId, gate, child: num(c.child), attempt: num(c.attempt), iteration: num(c.iteration),
    provider: ['ollama', 'api'].includes(c.provider) ? c.provider : null,
    model: str(c.model, 120), prompt_name: str(c.prompt_name, 120), prompt_hash: str(c.prompt_hash, 128),
    prompt_var: promptVar?.slice(0, 8192) ?? null, prompt_len: num(c.prompt_len),
    output: output?.slice(0, 8192) ?? null, output_len: num(c.output_len),
    truncated: {
      prompt: c.truncated?.prompt === true || (promptVar?.length ?? 0) > 8192,
      output: c.truncated?.output === true || (output?.length ?? 0) > 8192,
    },
    metrics: {
      ...Object.fromEntries(CALL_METRICS.map((k) => [k, num(m[k])])),
      done_reason: str(m.done_reason, 40),
      cache_hit: typeof m.cache_hit === 'boolean' ? m.cache_hit : null,
    },
    budget_units: num(c.budget_units),
    result: CALL_RESULTS.has(c.result) ? c.result : null,
    error: str(c.error, 300),
    at: num(c.at),
  };
}

function parseJson(value) {
  try { return value ? JSON.parse(value) : null; } catch { return null; }
}

/** Sum model-call evidences: GPU/wall seconds (0.1 rounding), tokens, loads (>500ms), retries. */
function summarizeCalls(calls) {
  let gpuMs = 0;
  let wallMs = 0;
  const s = { calls: calls.length, tokens_in: 0, tokens_out: 0, model_loads: 0, retries: 0 };
  for (const c of calls) {
    const m = c?.metrics || {};
    gpuMs += m.gpu_ms || 0;
    wallMs += m.wall_ms || 0;
    s.tokens_in += m.tokens_in || 0;
    s.tokens_out += m.tokens_out || 0;
    if ((m.load_ms || 0) > 500) s.model_loads += 1;
    if (c?.result === 'retry') s.retries += 1;
  }
  return { ...s, gpu_s: Math.round(gpuMs / 100) / 10, wall_s: Math.round(wallMs / 100) / 10 };
}

// gate_started: cổng + lượt sửa đã kiểm; worker cũ chỉ gửi trong internal_detail nên đọc dự phòng từ đó.
function progressDetail(input) {
  const sent = parseJson(input.internalDetail);
  const gate = Number(input.gate ?? sent?.gate);
  const attempt = Number(input.attempt ?? sent?.attempt ?? 0);
  if (!ALL_GATES.includes(gate) || !Number.isInteger(attempt) || attempt < 0) {
    throw new WorkerContractError('invalid gate progress', 400, 'invalid_progress');
  }
  return JSON.stringify({ gate, attempt });
}

/** Thanh tiến độ 1 run: trạng thái từng cổng (ok|bad|run|wait|skip), cổng đang chạy và lúc bắt đầu. */
export function runProgress(run, events, live) {
  const started = new Map();
  for (const e of events) {
    if (e.event_type !== 'gate_started' || e.run_id !== run.id) continue;
    const gate = Number(parseJson(e.internal_detail)?.gate);
    if (Number.isFinite(gate)) started.set(gate, e.created_at); // lượt sửa sau ghi đè lượt trước
  }
  for (const c of run.calls) {
    const gate = Number(c.evidence?.gate ?? c.gate);
    if (!started.has(gate)) started.set(gate, c.created_at);
  }
  const { plan, pre_pr: exec } = CONTRACT.gates;
  const reachedExec = [...started.keys(), ...run.gates.map((g) => Number(g.gate))].some((g) => g >= exec[0]);
  const gates = run.trigger === 'execute' ? exec
    : run.trigger === 'plan' ? (run.worker_mode === 'active' || reachedExec ? ALL_GATES : plan) : [];
  const traced = new Map(run.gates.map((g) => [Number(g.gate), g.status]));
  const pending = gates.filter((g) => !traced.has(g));
  const begun = pending.filter((g) => started.has(g));
  const current = live ? (begun.length ? Math.max(...begun) : pending[0]) ?? null : null;
  return {
    gates: gates.map((gate) => ({
      gate, name: CONTRACT.gates.names[gate],
      state: traced.get(gate) === 'passed' ? 'ok' : traced.get(gate) === 'blocked' ? 'bad'
        : !live ? 'skip' : gate === current ? 'run' : current != null && gate < current ? 'ok' : 'wait',
    })),
    current,
    since: started.get(current) ?? null,
  };
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

  // Đưa root sang trạng thái mới và nhả lease: worker đang giữ sẽ gặp stale_lease ở heartbeat/verdict kế tiếp rồi dừng.
  // reason bỏ trống = giữ internal_reason cũ; onlyOpen: root đã 'cancelled' thì không ghi đè; event ghi 1 lần theo idem.
  function closeRoot(root, { status, phase, note, reason, onlyOpen = false, event, now }) {
    db.prepare(`
      UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?,
        lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL, updated_at=?
      WHERE id=?${onlyOpen ? " AND status != 'cancelled'" : ''}
    `).run(status, phase, note, reason === undefined ? root.internal_reason : reason, now, root.id);
    db.prepare(`UPDATE ai_workers SET status='idle', current_ticket_id=NULL, updated_at=? WHERE current_ticket_id=?`)
      .run(now, root.id);
    if (!db.prepare('SELECT 1 FROM ai_events WHERE ticket_id=? AND idempotency_key=?').get(root.id, event.idem)) {
      insertEvent.run(root.id, event.type, event.actorType, String(event.actorId), `${root.status}->${status}`,
        note, event.detail ?? null, event.idem, now);
    }
  }

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
    if (!KEY.test(idempotencyKey)) throw new RequestValidationError('invalid idempotency key');
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
             t.public_note,
             (SELECT ar.outcome FROM ai_runs ar WHERE ar.ticket_id=t.id AND ar.outcome IS NOT NULL ORDER BY ar.id DESC LIMIT 1) AS pre_pr_verdict,
             (SELECT ar.gate FROM ai_runs ar WHERE ar.ticket_id=t.id AND ar.outcome IS NOT NULL ORDER BY ar.id DESC LIMIT 1) AS pre_pr_gate
      FROM requests r
      LEFT JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
      WHERE r.owner_user_id = ? AND r.domain = ?
      ORDER BY r.updated_at DESC LIMIT ?
    `).all(Number(ownerUserId), String(domain || ''), Math.min(Math.max(Number(limit) || 50, 1), 200));
    return rows.map((row) => ({ ...row, attachments: parseAttachments(row.attachments) }));
  }

  // Admin reject = cancel the whole root, like cancelRequestTransaction; every statement is a no-op on repeat.
  function closeRootForAdmin(root, actorId, now) {
    closeRoot(root, {
      status: 'cancelled', phase: 'admin_rejected', note: 'Quản trị viên đã từ chối yêu cầu.', reason: 'admin_rejected',
      onlyOpen: true, now,
      event: { type: 'request_rejected', actorType: 'admin', actorId, detail: 'admin_rejected', idem: `request-rejected:${root.id}` },
    });
    db.prepare(`
      UPDATE ai_tickets SET status='cancelled', internal_reason='admin_rejected', updated_at=?
      WHERE parent_id=? AND status NOT IN ('done', 'failed', 'invalidated', 'cancelled')
    `).run(now, root.id);
    db.prepare(`UPDATE ai_alerts SET status='resolved', updated_at=? WHERE ticket_id=? AND status='open'`).run(now, root.id);
  }

  const setStatusTransaction = db.transaction((requestId, status, note, actorId) => {
    const root = db.prepare('SELECT id, status FROM ai_tickets WHERE source_request_id = ? AND parent_id IS NULL').get(requestId);
    const now = Date.now();
    const result = db.prepare('UPDATE requests SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?')
      .run(status, note || null, now, requestId);
    if (!result.changes || !root) return false;
    // Random suffix: two status posts in the same millisecond must not collide on the unique key.
    insertEvent.run(
      root.id, 'request_status_changed', 'admin', String(actorId), null,
      note || null, `request status -> ${status}`, `status:${requestId}:${now}:${randomBytes(4).toString('hex')}`, now,
    );
    if (status === 'rejected') closeRootForAdmin(root, actorId, now);
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
             t.cumulative_budget, t.budget_limit,
             (SELECT COUNT(*) FROM ai_alerts a WHERE a.ticket_id=t.id AND a.status='open') AS open_alerts,
             r.domain, r.owner_user_id, r.owner_state, r.created_at
      FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
      WHERE t.parent_id IS NULL
      ORDER BY t.priority DESC, t.created_at ASC LIMIT ?
    `).all(Math.min(Math.max(Number(limit) || 100, 1), 500));
  }

  // Read-time only: a dead worker never writes its own exit, and nothing else may write ai_workers for it.
  function listWorkers({ now = Date.now(), leaseMs = LEASE_MS } = {}) {
    return db.prepare(`
      SELECT worker_id, version, mode, status, current_ticket_id, last_seen_at, updated_at
      FROM ai_workers ORDER BY last_seen_at DESC, worker_id
    `).all().map((w) => (w.status === 'running' && now - w.last_seen_at > leaseMs ? { ...w, status: 'stale' } : w));
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
    if (current) return { ...current, trigger: triggerFor(current.phase, intent) };

    const candidate = db.prepare(`
      SELECT t.id, t.phase
      FROM ai_tickets t JOIN requests r ON r.id=t.source_request_id
      WHERE t.kind='root' AND r.owner_state='verified'
        AND ((t.status='queued' AND (
              t.phase IN (${ANY_QUEUE})
              OR (? = 'plan' AND t.phase IN (${PLAN_QUEUE}))
            ))
          OR (t.status='running' AND t.lease_expires_at<=?)
          OR (? = 'plan' AND t.lease_token IS NOT NULL AND t.lease_expires_at<=?))
        -- Chạy plan đã duyệt và hoàn tác chỉ worker 'active' làm được, kể cả khi cứu lease hết hạn.
        AND (? = 'active' OR t.phase NOT IN (${ACTIVE_ONLY}))
        -- 1 request = 1 phiên worker từ đầu đến cuối: root quay lại hàng đợi chỉ về worker cũ, trừ khi
        -- worker đó đã quá 1 lease không liên lạc. Root mất lease giữa chừng thì worker nào cũng cứu được.
        AND (t.status <> 'queued' OR NOT EXISTS (
          SELECT 1 FROM ai_runs ar JOIN ai_workers aw ON aw.worker_id = ar.worker_id
          WHERE ar.id = (SELECT MAX(id) FROM ai_runs WHERE ticket_id = t.id AND trigger <> 'shadow_precheck')
            AND ar.worker_id <> ? AND aw.last_seen_at > ?))
        ORDER BY t.priority DESC, t.created_at ASC LIMIT 1
    `).get(intent, now, intent, now, mode, workerId, now - leaseMs);
    if (!candidate) return null;
    const token = randomBytes(24).toString('hex');
    const expires = now + leaseMs;
    // 'executing': plan đã duyệt, bỏ qua lập plan. 'rolling_back': hoàn tác thay đổi đã giữ lại.
    const phase = PHASES[candidate.phase]?.lease || (intent === 'plan' ? 'planning' : 'shadow_precheck');
    db.prepare(`
      UPDATE ai_tickets SET status='running', phase=?, lease_owner=?,
        lease_token=?, lease_expires_at=?, lease_mode=?, updated_at=? WHERE id=?
    `).run(phase, workerId, token, expires, mode, now, candidate.id);
    db.prepare(`
      UPDATE ai_workers SET status='running', current_ticket_id=?, last_seen_at=?, updated_at=?
      WHERE worker_id=?
    `).run(candidate.id, now, now, workerId);
    insertEvent.run(
      candidate.id, 'heartbeat', 'worker', workerId, 'queued->running',
      null, 'worker claimed root ticket', `claim:${workerId}:${candidate.id}:${token}`, now,
    );
    return { id: candidate.id, lease_token: token, lease_expires_at: expires, status: 'running', phase,
      trigger: triggerFor(phase, intent) };
  });

  function claimNext({ workerId, version = 'unknown', mode = 'off', intent = 'precheck', now = Date.now(), leaseMs = LEASE_MS }) {
    workerId = String(workerId || '').trim();
    if (!/^[A-Za-z0-9._:-]{2,80}$/.test(workerId)) throw new WorkerContractError('invalid worker id');
    return claimTransaction({ workerId, version: String(version).slice(0, 80), mode, intent, now, leaseMs });
  }

  // Nhánh candidate của verdict qua kiểm tra gần nhất (thứ admin có thể hoàn tác).
  function latestCandidate(rootId) {
    const row = db.prepare(`
      SELECT evidence_json FROM ai_runs WHERE ticket_id=? AND outcome IN ('ready_for_pr', 'needs_review')
      ORDER BY id DESC LIMIT 1
    `).get(rootId);
    return parseJson(row?.evidence_json)?.verdict?.candidate ?? null;
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
    return {
      ticket: { ...ticket, lease_token: undefined }, request: { ...request, attachments: parseAttachments(request.attachments) },
      thread, capability_policy: CAPABILITY_CATALOG,
      ...(ticket.phase === 'rolling_back' ? { rollback_candidate: latestCandidate(ticket.id) } : {}),
    };
  }

  function heartbeat(ticketId, workerId, leaseToken, { now = Date.now(), leaseMs = LEASE_MS } = {}) {
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
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    return createRunTransaction(ticketId, { ...input, idempotencyKey, now: input.now ?? Date.now() });
  }

  const recordWorkerEventTransaction = db.transaction((ticketId, input) => {
    assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (!EVENT_TYPES.has(input.eventType)) throw new WorkerContractError('invalid event type');
    const internalDetail = input.eventType === 'gate_started' ? progressDetail(input) : input.internalDetail;
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
      input.publicMessage || null, internalDetail || null, input.idempotencyKey, input.now,
    );
    return db.prepare('SELECT * FROM ai_events WHERE id=?').get(Number(info.lastInsertRowid));
  });

  function recordWorkerEvent(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
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
    `).run(next[0], next[1], next[2],
      // A planned release keeps the verdict's reason (e.g. the critical violation) unless the worker adds one.
      input.internalDetail || (input.outcome === 'planned' ? current.internal_reason : null), input.now, Number(ticketId));
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
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
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
    // Sổ ngân sách của lượt: phần lập plan ghi lên run, verdict cùng lượt cộng vào rồi so với trần.
    db.prepare(`UPDATE ai_runs SET evidence_json=json_set(COALESCE(evidence_json, '{}'), '$.plan_budget', ?) WHERE id=?`)
      .run(input.budgetUsed, run.id);

    const existing = db.prepare(`
      SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status='valid'
    `)
      .get(Number(ticketId), checked.planHash);
    if (existing) {
      const sameSubmission = db.prepare(`
        SELECT 1 FROM ai_events WHERE ticket_id=? AND idempotency_key=?
      `).get(Number(ticketId), `plan-valid:${input.idempotencyKey}`);
      const authorized = !!db.prepare(`
        SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
      `).get(Number(ticketId), existing.plan_hash, existing.revision);
      const plannedStatus = existing.tier === 'surface' ? 'planned'
        : existing.tier === 'protected' && authorized ? 'planned'
          : existing.tier === 'protected' ? 'waiting_authorization' : 'human_owned';
      if (!sameSubmission) {
        const rounds = root.auto_rounds + 1;
        const budget = root.cumulative_budget + input.budgetUsed;
        if (rounds > 2 || input.budgetUsed > root.budget_limit) { // budget_limit là trần MỖI lượt, không phải cả ticket
          const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
          db.prepare(`
            UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted',
              public_note='Yêu cầu đang chờ quản trị viên xem xét.', internal_reason=?,
              auto_rounds=?, cumulative_budget=?, updated_at=? WHERE id=?
          `).run(reason, rounds, budget, now, Number(ticketId));
          insertEvent.run(
            Number(ticketId), 'plan_validated', 'worker', input.workerId, 'running->waiting_admin',
            'Yêu cầu đang chờ quản trị viên xem xét.', reason,
            `plan-valid:${input.idempotencyKey}`, now,
          );
          return {
            plan_hash: existing.plan_hash, tier: existing.tier, status: 'waiting_admin',
            reason, children: planChildren(ticketId, existing.revision), duplicate: true,
          };
        }
        db.prepare(`
          UPDATE ai_tickets SET status=?, phase='ticketized', auto_rounds=?,
            cumulative_budget=?, updated_at=? WHERE id=?
        `).run(plannedStatus, rounds, budget, now, Number(ticketId));
        insertEvent.run(
          Number(ticketId), 'plan_validated', 'worker', input.workerId, `running->${plannedStatus}`,
          root.public_note, 'resumed existing validated plan',
          `plan-valid:${input.idempotencyKey}`, now,
        );
      }
      const duplicateStatus = ['planned', 'waiting_authorization', 'human_owned', 'waiting_admin'].includes(root.status)
        ? root.status : plannedStatus;
      db.prepare(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`)
        .run(existing.plan_hash, existing.revision, now, run.id);
      const traced = new Set(db.prepare(`
        SELECT gate FROM ai_gate_traces WHERE run_id=? AND status='passed' AND gate IN (1, 2, 2.5)
      `).all(run.id).map((row) => Number(row.gate)));
      const insertTrace = db.prepare(`
        INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at)
        VALUES (?, ?, 'passed', NULL, NULL, ?)
      `);
      for (const gate of [1, 2, 2.5]) {
        if (!traced.has(gate)) insertTrace.run(run.id, gate, now);
      }
      return {
        plan_hash: existing.plan_hash,
        capability_policy_hash: existing.capability_policy_hash,
        tier: existing.tier,
        status: duplicateStatus,
        children: planChildren(ticketId, existing.revision),
        duplicate: true,
      };
    }

    const rounds = root.auto_rounds + 1;
    const budget = root.cumulative_budget + input.budgetUsed;
    if (rounds > 2 || input.budgetUsed > root.budget_limit) { // budget_limit là trần MỖI lượt, không phải cả ticket
      const reason = rounds > 2 ? 'automatic_round_limit' : 'run_budget_exhausted';
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
    db.prepare(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`)
      .run(checked.planHash, revision, now, run.id);

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
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
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

  const submitPrePrVerdictTransaction = db.transaction((ticketId, input, verdict) => {
    const root = assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (root.lease_mode !== 'active') {
      throw new WorkerContractError('pre-PR verdict requires active worker mode', 409, 'active_worker_required');
    }
    const run = db.prepare('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const plan = root.plan_hash && db.prepare(`
      SELECT * FROM ai_plans
      WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'
    `).get(root.id, root.plan_hash, root.plan_revision);
    if (!plan || root.status !== 'planned') {
      throw new WorkerContractError('pre-PR verdict requires the current accepted plan', 409, 'plan_required');
    }
    if (run.plan_hash !== plan.plan_hash || Number(run.plan_revision) !== Number(plan.revision)) {
      throw new WorkerContractError('run belongs to a different plan revision', 409, 'plan_run_mismatch');
    }
    if (plan.tier === 'core') {
      throw new WorkerContractError('core plan remains human-owned', 409, 'core_human_owned');
    }
    if (plan.tier === 'protected' && !db.prepare(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `).get(root.id, plan.plan_hash, plan.revision)) {
      throw new WorkerContractError('protected plan requires authorization', 409, 'authorization_required');
    }
    // Any run of this plan revision: an authorized protected plan executes in a later run than it was planned in.
    const precheckGates = new Set(db.prepare(`
      SELECT g.gate FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? AND r.plan_hash=? AND r.plan_revision=? AND g.status='passed' AND g.gate IN (1, 2, 2.5)
    `).all(root.id, plan.plan_hash, plan.revision).map((row) => Number(row.gate)));
    if (![1, 2, 2.5].every((gate) => precheckGates.has(gate))) {
      throw new WorkerContractError('pre-PR verdict requires plan guardrail traces', 409, 'plan_trace_required');
    }
    const existing = db.prepare('SELECT id, event_type FROM ai_events WHERE ticket_id=? AND idempotency_key=?')
      .get(Number(ticketId), input.idempotencyKey);
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
    // Trần MỖI lượt = lập plan + thực hiện của cùng run; verdict.budget_used chỉ là phần thực hiện.
    if (verdict.budget_used + (Number(runEvidence.plan_budget) || 0) > root.budget_limit) {
      throw new WorkerContractError('run budget exhausted', 409, 'run_budget_exhausted');
    }
    const evidence = JSON.stringify({ ...runEvidence, verdict });
    db.prepare(`UPDATE ai_runs SET outcome=?, gate=?, cumulative_budget=?, evidence_json=?, failure_reason=?, updated_at=? WHERE id=?`)
      .run(verdict.outcome, verdict.gate_reached, cumulativeBudget, evidence, verdict.reason, input.now, run.id);
    const trace = db.prepare(`
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
      VALUES (?, ?, ?, ?, NULL, ?, ?)
    `);
    for (const gate of verdict.gates) {
      trace.run(run.id, gate.gate, gate.blocked ? 'blocked' : 'passed', gate.reason,
        JSON.stringify(gate), input.now);
    }
    let status = root.status;
    let phase = verdict.outcome === 'ready_for_pr' ? 'pre_pr_ready'
      : verdict.outcome === 'needs_review' ? 'pre_pr_review' : 'pre_pr_blocked';
    let note = verdict.outcome === 'ready_for_pr' ? 'Thay đổi đã qua kiểm tra trước PR.'
      : verdict.outcome === 'needs_review' ? 'Thay đổi cần con người xem xét trước PR.'
        : 'Thay đổi chưa qua kiểm tra trước PR.';
    if (verdict.failure_class === 'critical') {
      status = 'waiting_admin';
      phase = 'critical_violation';
      note = 'Thay đổi vi phạm ranh giới an toàn; đã dừng và chờ quản trị viên.';
      db.prepare(`
        INSERT INTO ai_alerts(ticket_id, severity, category, status, public_message, internal_detail, created_at, updated_at)
        VALUES (?, 'critical', 'boundary_violation', 'open', ?, ?, ?, ?)
      `).run(root.id, note, verdict.reason, input.now, input.now);
    } else if (verdict.failure_class === 'budget') {
      status = 'waiting_admin';
      phase = 'budget_exhausted';
      note = 'Yêu cầu đang chờ quản trị viên xem xét.';
    } else if (verdict.failure_class === 'plan') {
      // The accepted plan cannot be carried out as written: admin clarifies, rejects or hands it to a human.
      status = 'waiting_admin';
      phase = 'plan_unfit';
      note = 'Yêu cầu đang chờ quản trị viên xem xét.';
    }
    const repairSequence = db.prepare(`
      SELECT COALESCE(MAX(sequence), 0) + 1 AS next FROM ai_tickets WHERE parent_id=? AND plan_revision=?
    `).get(root.id, plan.revision).next;
    verdict.repairs.forEach((repair, index) => {
      const child = db.prepare(`
        INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, description,
          status, phase, public_note, internal_reason, tier, plan_revision, created_at, updated_at)
        VALUES (?, ?, ?, 'review_fix', ?, ?, ?, 'pre_pr_repair', ?, ?, ?, ?, ?, ?)
      `).run(root.id, root.source_request_id, repairSequence + index, `Sửa lỗi cổng ${repair.gate}`,
        JSON.stringify(repair), verdict.outcome === 'blocked' ? 'failed' : 'done',
        'Đã tự sửa một lần sau khi kiểm tra trước PR chưa đạt.', repair.reason, plan.tier, plan.revision,
        input.now, input.now);
      insertTag.run(Number(child.lastInsertRowid), 'repair');
    });
    db.prepare('UPDATE ai_tickets SET status=?, phase=?, public_note=?, internal_reason=?, cumulative_budget=?, updated_at=? WHERE id=?')
      .run(status, phase, note, verdict.reason, cumulativeBudget, input.now, root.id);
    db.prepare(`
      INSERT INTO ai_events(ticket_id, run_id, event_type, actor_type, actor_id, transition,
        public_message, internal_detail, idempotency_key, created_at)
      VALUES (?, ?, 'pre_pr_verdict', 'worker', ?, ?, ?, ?, ?, ?)
    `).run(root.id, run.id, input.workerId, `running->${phase}`, note, verdict.reason,
      input.idempotencyKey, input.now);
    return verdict;
  });

  function submitPrePrVerdict(ticketId, input) {
    const idempotencyKey = String(input.idempotencyKey || '');
    if (!KEY.test(idempotencyKey)) throw new WorkerContractError('invalid idempotency key');
    const verdict = validatePrePrVerdict(input.verdict);
    return submitPrePrVerdictTransaction(Number(ticketId), {
      ...input, idempotencyKey, now: input.now ?? Date.now(),
    }, verdict);
  }

  const extendBudgetTransaction = db.transaction((rootTicketId, amount, reason, adminUserId, now) => {
    const root = db.prepare(`SELECT * FROM ai_tickets WHERE id=? AND kind='root'`).get(Number(rootTicketId));
    if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (root.status !== 'waiting_admin' || root.phase !== 'budget_exhausted') {
      throw new WorkerContractError('ticket is not waiting on an exhausted budget', 409, 'not_budget_exhausted');
    }
    const limit = root.budget_limit + amount;
    const extensions = db.prepare(`SELECT COUNT(*) AS n FROM ai_events WHERE ticket_id=? AND event_type='budget_extended'`)
      .get(root.id).n;
    const ceiling = extensions >= MAX_BUDGET_EXTENSIONS ? 'extension_count_ceiling'
      : limit > MAX_BUDGET_LIMIT ? 'budget_limit_ceiling' : null;
    if (ceiling) {
      // Permanent: phase budget_ceiling is never requeued (see invalidatePlanTransaction); a retry needs a new request.
      db.prepare(`
        UPDATE ai_tickets SET status='human_owned', phase='budget_ceiling',
          public_note='Yêu cầu đã được chuyển cho con người xử lý.', internal_reason=?, updated_at=? WHERE id=?
      `).run(ceiling, now, root.id);
      insertEvent.run(
        root.id, 'budget_ceiling', 'admin', String(adminUserId), 'waiting_admin->human_owned',
        'Yêu cầu đã được chuyển cho con người xử lý.', JSON.stringify({ amount, reason, ceiling }),
        `budget-ceiling:${root.id}`, now,
      );
      return { ok: false, status: 'human_owned', budget_limit: root.budget_limit, reason: ceiling };
    }
    const liftedLimit = root.internal_reason === 'automatic_round_limit' ? 'automatic_round_limit' : 'run_budget_exhausted';
    // The admin grants one more automatic round with the extra budget; the limits stay enforced.
    db.prepare(`
      UPDATE ai_tickets SET status='queued', phase='needs_replan', budget_limit=?,
        auto_rounds=MAX(auto_rounds - 1, 0), public_note='Quản trị viên đã gia hạn ngân sách; yêu cầu sẽ được xử lý tiếp.',
        internal_reason=NULL, updated_at=? WHERE id=?
    `).run(limit, now, root.id);
    insertEvent.run(
      root.id, 'budget_extended', 'admin', String(adminUserId), 'waiting_admin->queued',
      'Quản trị viên đã gia hạn ngân sách.', JSON.stringify({ amount, reason, relaxed: liftedLimit }),
      `budget-extended:${root.id}:${extensions + 1}`, now,
    );
    return { ok: true, status: 'queued', budget_limit: limit };
  });

  function extendBudget(rootTicketId, { amount, reason, adminUserId }) {
    const value = Number(amount);
    if (!Number.isInteger(value) || value < 1 || value > MAX_BUDGET_EXTENSION) {
      throw new WorkerContractError(`amount must be an integer from 1 to ${MAX_BUDGET_EXTENSION}`);
    }
    const why = String(reason || '').trim();
    if (why.length < 10) throw new WorkerContractError('a reason of at least 10 characters is required');
    return extendBudgetTransaction(rootTicketId, value, why.slice(0, 500), Number(adminUserId), Date.now());
  }

  const cancelRequestTransaction = db.transaction((requestId, ownerUserId, now) => {
    const request = db.prepare('SELECT id, status, owner_user_id FROM requests WHERE id=?').get(Number(requestId));
    // Someone else's request looks the same as a missing one.
    if (!request || request.owner_user_id !== Number(ownerUserId)) {
      throw new WorkerContractError('request not found', 404, 'request_not_found');
    }
    if (request.status === 'cancelled') return { ok: true, request_id: request.id, status: 'cancelled', duplicate: true };
    if (['done', 'rejected'].includes(request.status)) {
      throw new WorkerContractError('request is already closed', 409, 'request_closed');
    }
    db.prepare(`UPDATE requests SET status='cancelled', updated_at=? WHERE id=?`).run(now, request.id);
    const root = db.prepare('SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL').get(request.id);
    if (root) {
      closeRoot(root, {
        status: 'cancelled', phase: 'requester_cancelled', note: 'Người gửi đã hủy yêu cầu.', now,
        event: { type: 'request_cancelled', actorType: 'requester', actorId: ownerUserId, idem: `request-cancelled:${root.id}` },
      });
      db.prepare(`
        UPDATE ai_tickets SET status='cancelled', updated_at=?
        WHERE parent_id=? AND status NOT IN ('done', 'failed', 'invalidated', 'cancelled')
      `).run(now, root.id);
    }
    return { ok: true, request_id: request.id, status: 'cancelled' };
  });

  function cancelRequest(requestId, { ownerUserId, now = Date.now() }) {
    return cancelRequestTransaction(requestId, ownerUserId, now);
  }

  const requestRollbackTransaction = db.transaction((requestId, adminUserId, now) => {
    const root = db.prepare('SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL').get(requestId);
    if (!root) throw new WorkerContractError('ticket not found', 404, 'ticket_not_found');
    if (PHASES[root.phase]?.rollback) return { ok: true, status: root.status, phase: root.phase, duplicate: true };
    // Status stays 'planned' while gates 3→5.5 run, so a live lease is what means "working".
    if (root.lease_token && root.lease_expires_at > now) {
      throw new WorkerContractError('AI Board is working on this request; cancel it to stop the work', 409, 'ticket_busy');
    }
    const candidate = latestCandidate(root.id);
    if (!candidate) throw new WorkerContractError('no kept change to roll back', 409, 'nothing_to_rollback');
    const attempt = db.prepare(`SELECT COUNT(*) n FROM ai_events WHERE ticket_id=? AND event_type='rollback_requested'`).get(root.id).n;
    closeRoot(root, {
      status: 'queued', phase: 'rollback', note: 'Quản trị viên yêu cầu hoàn tác thay đổi; đang chờ AI Board.', reason: null, now,
      event: { type: 'rollback_requested', actorType: 'admin', actorId: adminUserId, idem: `rollback-requested:${root.id}:${attempt + 1}`,
        detail: JSON.stringify({ branch: candidate.branch, head_sha: candidate.head_sha }) },
    });
    return { ok: true, status: 'queued', phase: 'rollback', branch: candidate.branch };
  });

  function requestRollback(requestId, { adminUserId, confirm, now = Date.now() }) {
    assertConfirmed(requestId, confirm);
    return requestRollbackTransaction(Number(requestId), adminUserId, now);
  }

  const submitRollbackTransaction = db.transaction((ticketId, input) => {
    const root = assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    if (root.phase !== 'rolling_back') throw new WorkerContractError('ticket is not rolling back', 409, 'not_rolling_back');
    const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), root.id);
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const next = ROLLBACK_OUTCOMES[input.outcome];
    if (!next) throw new WorkerContractError('invalid rollback outcome');
    const revert = input.outcome === 'revert_ready' ? validateCandidate(input.revert) : null;
    const detail = String(input.detail || '').slice(0, 1000) || null;
    const [status, phase, note] = next;
    db.prepare('UPDATE ai_runs SET evidence_json=?, failure_reason=?, updated_at=? WHERE id=?')
      .run(JSON.stringify({ rollback: { outcome: input.outcome, revert, detail } }),
        input.outcome === 'failed' ? detail : null, input.now, run.id);
    closeRoot(root, {
      status, phase, note, reason: detail, now: input.now,
      event: { type: 'rollback_done', actorType: 'worker', actorId: input.workerId, idem: `rollback-done:${run.id}`,
        detail: JSON.stringify({ outcome: input.outcome, branch: revert?.branch ?? null, detail }) },
    });
    return { status, phase, outcome: input.outcome, revert };
  });

  function submitRollback(ticketId, input) {
    return submitRollbackTransaction(Number(ticketId), { ...input, now: input.now ?? Date.now() });
  }

  // One ai_gate_traces row per model call: status='model_call', internal_reason=call_id (idempotency key per run).
  const recordModelCallsTransaction = db.transaction((ticketId, input) => {
    assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = db.prepare('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    if (!Array.isArray(input.calls) || input.calls.length > MAX_TRACE_BATCH) {
      throw new WorkerContractError(`calls must be an array of at most ${MAX_TRACE_BATCH}`, 400, 'invalid_trace');
    }
    const clean = input.calls.map(cleanModelCall);
    const seen = db.prepare(`SELECT 1 FROM ai_gate_traces WHERE run_id=? AND status='model_call' AND internal_reason=?`);
    const insert = db.prepare(`
      INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
      VALUES (?, ?, 'model_call', NULL, ?, ?, ?)
    `);
    let stored = 0;
    for (const call of clean) {
      if (seen.get(run.id, call.call_id)) continue;
      insert.run(run.id, call.gate, call.call_id, JSON.stringify(call), call.at ?? input.now);
      stored += 1;
    }
    return { stored, duplicates: clean.length - stored };
  });

  function recordModelCalls(ticketId, input) {
    return recordModelCallsTransaction(ticketId, { ...input, now: input.now ?? Date.now() });
  }

  function getRequestTrace(requestId) {
    const root = db.prepare(`
      SELECT id, status, phase, cumulative_budget, budget_limit, public_note, internal_reason, plan_hash,
             lease_owner, lease_expires_at
      FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL
    `).get(Number(requestId));
    if (!root) return null;
    root.live = !!root.lease_owner && root.lease_expires_at > Date.now(); // 1 worker đang giữ lease = đang xử lý
    root.phase_label = PHASES[root.phase]?.label ?? root.phase;
    const children = db.prepare(`
      SELECT id, title, status, sequence AS "order", plan_revision FROM ai_tickets
      WHERE parent_id=? ORDER BY plan_revision, sequence, id
    `).all(root.id);
    const traces = db.prepare(`
      SELECT g.id, g.run_id, g.gate, g.status, g.public_reason, g.internal_reason, g.evidence_json, g.created_at
      FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
      WHERE r.ticket_id=? ORDER BY g.created_at, g.id
    `).all(root.id);
    const events = db.prepare(`
      SELECT e.ticket_id, e.run_id, e.event_type, e.actor_type, e.actor_id, e.transition,
             e.public_message, e.internal_detail, e.created_at
      FROM ai_events e JOIN ai_tickets t ON t.id = e.ticket_id
      WHERE t.id=? OR t.parent_id=? ORDER BY e.created_at, e.id
    `).all(root.id, root.id);
    const allCalls = [];
    // ai_runs has no status column; the verdict outcome (null until one lands) is the run's status.
    const runRows = db.prepare(`
      SELECT r.id, r.attempt, r.trigger, r.outcome AS status, r.gate, r.created_at, r.updated_at, r.worker_id, r.evidence_json,
             w.mode AS worker_mode, w.version AS worker_version, w.last_seen_at AS worker_last_seen
      FROM ai_runs r LEFT JOIN ai_workers w ON w.worker_id = r.worker_id
      WHERE r.ticket_id=? ORDER BY r.created_at, r.id
    `).all(root.id);
    const runs = runRows.map(({ evidence_json: runEvidence, ...run }, i) => {
      const gates = [];
      const calls = [];
      for (const { run_id: runId, evidence_json: json, ...row } of traces) {
        if (runId !== run.id) continue;
        const item = { ...row, evidence: parseJson(json) };
        if (row.status === 'model_call') calls.push(item); else gates.push(item);
      }
      allCalls.push(...calls);
      // Ngân sách tính theo lượt: mỗi run có trần budget_limit riêng.
      const budgetUsed = calls.reduce((sum, c) => sum + (Number(c.evidence?.budget_units) || 0), 0);
      const rollback = parseJson(runEvidence)?.rollback ?? null;
      const live = root.live && i === runRows.length - 1 && !run.status && !rollback;
      return { ...run, rollback, gates, calls, totals: summarizeCalls(calls.map((c) => c.evidence)),
        budget_used: budgetUsed, budget_limit: root.budget_limit,
        progress: runProgress({ ...run, gates, calls }, events, live) };
    });
    const evidences = allCalls.map((c) => c.evidence);
    const byModel = {};
    for (const e of evidences) (byModel[e?.model || 'unknown'] ??= []).push(e);
    const onlyApi = evidences.length > 0 && evidences.every((e) => e?.provider === 'api');
    const current = root.plan_hash && db.prepare(`
      SELECT plan_hash, revision, tier, status, plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=?
      ORDER BY revision DESC LIMIT 1
    `).get(root.id, root.plan_hash);
    const plan = current ? {
      plan_hash: current.plan_hash, revision: current.revision, tier: current.tier, status: current.status,
      plan: parseJson(current.plan_json),
      authorized: !!db.prepare('SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?')
        .get(root.id, current.plan_hash, current.revision),
    } : null;
    const candidate = latestCandidate(root.id);
    root.can_rollback = !!candidate && !PHASES[root.phase]?.rollback;
    return {
      root, plan, children, runs, events, candidate, gate_names: CONTRACT.gates.names,
      totals: {
        ...summarizeCalls(evidences),
        by_model: Object.fromEntries(Object.entries(byModel).map(([model, list]) => [model, summarizeCalls(list)])),
        budget_used: root.cumulative_budget, // tổng tích lũy mọi lượt, chỉ để báo cáo
        budget_limit: root.budget_limit, // trần MỖI lượt
        budget_unit: onlyApi ? 'k_tokens' : 'gpu_s',
      },
    };
  }

  const authorizePlanTransaction = db.transaction((rootTicketId, planHash, adminUserId, now) => {
    const plan = db.prepare('SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND status=?')
      .get(Number(rootTicketId), String(planHash), 'valid');
    if (!plan) throw new WorkerContractError('plan not found', 404, 'plan_not_found');
    if (plan.tier === 'core') throw new WorkerContractError('core work remains human-owned', 409, 'core_human_owned');
    const root = db.prepare('SELECT phase FROM ai_tickets WHERE id=?').get(Number(rootTicketId));
    if (root?.phase === 'budget_ceiling') {
      throw new WorkerContractError('ticket passed the budget ceiling; a new request is required', 409, 'budget_ceiling');
    }
    db.prepare(`INSERT OR IGNORE INTO ai_authorizations(root_ticket_id, plan_hash, plan_revision, admin_user_id, created_at) VALUES (?, ?, ?, ?, ?)`)
      .run(Number(rootTicketId), String(planHash), Number(plan.revision), Number(adminUserId), now);
    if (plan.tier === 'protected') {
      db.prepare(`UPDATE ai_tickets SET status='queued', phase='authorized', public_note='Kế hoạch đã được cho phép; đang chờ thực hiện.', internal_reason=NULL, updated_at=? WHERE id=?`)
        .run(now, Number(rootTicketId));
      db.prepare(`UPDATE ai_tickets SET status='queued', public_note='Kế hoạch đã được cho phép.', internal_reason=NULL, updated_at=? WHERE parent_id=? AND plan_revision=?`)
        .run(now, Number(rootTicketId), plan.revision);
    }
    return { ok: true };
  });

  const resumeAuthorizedPlanTransaction = db.transaction((ticketId, input) => {
    const root = assertLease(ticketId, input.workerId, input.leaseToken, input.now);
    const run = db.prepare('SELECT * FROM ai_runs WHERE id=? AND ticket_id=?').get(Number(input.runId), Number(ticketId));
    if (!run) throw new WorkerContractError('run does not belong to ticket');
    const plan = root.plan_hash && db.prepare(`
      SELECT * FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? AND revision=? AND status='valid'
    `).get(root.id, root.plan_hash, root.plan_revision);
    const authorized = plan && (plan.tier === 'surface' || !!db.prepare(`
      SELECT 1 FROM ai_authorizations WHERE root_ticket_id=? AND plan_hash=? AND plan_revision=?
    `).get(root.id, plan.plan_hash, plan.revision));
    const resumed = root.status === 'planned' && run.plan_hash === plan?.plan_hash;
    if (!plan || !authorized || plan.tier === 'core' || (root.phase !== 'executing' && !resumed)) {
      throw new WorkerContractError('no authorized plan waiting for execution', 409, 'not_authorized_execution');
    }
    if (!resumed) {
      db.prepare(`UPDATE ai_tickets SET status='planned', phase='ticketized', updated_at=? WHERE id=?`).run(input.now, root.id);
      db.prepare(`UPDATE ai_runs SET plan_hash=?, plan_revision=?, updated_at=? WHERE id=?`)
        .run(plan.plan_hash, plan.revision, input.now, run.id);
      insertEvent.run(root.id, 'plan_resumed', 'worker', input.workerId, 'running->planned',
        'Đang thực hiện kế hoạch đã được cho phép.', `run ${run.id} executes plan revision ${plan.revision}`,
        `plan-resumed:${run.id}`, input.now);
    }
    return {
      status: 'planned', tier: plan.tier, plan_hash: plan.plan_hash,
      capability_policy_hash: plan.capability_policy_hash, plan: JSON.parse(plan.plan_json),
      children: planChildren(root.id, plan.revision), duplicate: resumed,
    };
  });

  function resumeAuthorizedPlan(ticketId, input) {
    return resumeAuthorizedPlanTransaction(Number(ticketId), { ...input, now: input.now ?? Date.now() });
  }

  function authorizePlan(rootTicketId, planHash, adminUserId) {
    return authorizePlanTransaction(rootTicketId, planHash, adminUserId, Date.now());
  }

  const invalidatePlanTransaction = db.transaction((requestId, reason, now) => {
    const root = db.prepare(`SELECT * FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL`).get(Number(requestId));
    if (!root || !root.plan_hash || PHASES[root.phase]?.terminal) return false;
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
    cancelRequest,
    requestRollback,
    submitRollback,
    recordModelCalls,
    getRequestTrace,
    claimNext,
    getLeasedSnapshot,
    heartbeat,
    createRun,
    recordWorkerEvent,
    releaseLease,
    submitPlan,
    submitPrePrVerdict,
    authorizePlan,
    resumeAuthorizedPlan,
    extendBudget,
    invalidatePlanForRequest,
  };
}
