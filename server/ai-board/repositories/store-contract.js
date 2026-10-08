// Shared pieces of the AI board store: worker contract, limits, error types, validators, pure helpers. The store itself
// (PostgreSQL) is store-async.js.
import fs from 'node:fs';

export { PlanGuardrailError } from '../security/policy.js';

// Worker <-> server contract, shared with ai-board/worker.py.
export const CONTRACT = JSON.parse(fs.readFileSync(new URL('../contract.json', import.meta.url), 'utf8'));
const KEY = new RegExp(CONTRACT.idempotency_key_pattern);
const REQUEST_TYPES = new Set(['game', 'theory', 'lab', 'skill', 'other', 'feature']);
// Yêu cầu board tự sửa: chỉ createSelfRequest tạo, chủ là người dùng hệ thống này.
const SELF_USER = 'ai-board';
const SELF_TAG = 'self_target:';
const WORKER_MODES = new Set(['off', 'shadow', 'active']);
const CLAIM_INTENTS = new Set(['precheck', 'plan']);
const RUN_TRIGGERS = new Set(CONTRACT.run_triggers);
const EVENT_TYPES = new Set([
  'shadow_precheck_passed', 'shadow_precheck_failed', 'plan_validated',
  'plan_blocked', 'request_clarification', 'heartbeat', 'lease_released', 'gate_started',
]);
// Vòng đời root — nguồn duy nhất cho claim, nhãn admin và hoàn tác.
// queue: intent nhận được khi status='queued' ('any' | 'plan'); active: chỉ worker 'active' được nhận (kể cả cứu
// lease hết hạn); lease: phase lease chạy dưới (thiếu = 'planning'/'shadow_precheck' theo intent); trigger: loại run
// của lease ở phase này; rollback: đang/đã hoàn tác (không yêu cầu hoàn tác lần nữa); terminal: đóng hẳn.
const PHASES = {
  intake: { label: 'mới nhận', queue: 'any' },
  clarifying: { label: 'đang làm rõ với người gửi' }, // không queue: worker chỉ thấy sau khi người gửi xác nhận
  needs_replan: { label: 'chờ lập lại kế hoạch', queue: 'any' },
  shadow_checked: { label: 'đã kiểm tra, chờ lập kế hoạch', queue: 'plan' },
  authorized: { label: 'đã được cho phép, chờ worker', queue: 'plan', active: true, lease: 'executing' },
  rollback: { label: 'chờ worker hoàn tác', queue: 'plan', active: true, lease: 'rolling_back', rollback: true },
  shadow_precheck: { label: 'kiểm tra ban đầu', trigger: 'shadow_precheck' },
  planning: { label: 'đang lập kế hoạch', trigger: 'plan' },
  executing: { label: 'đang thực hiện kế hoạch đã duyệt', active: true, lease: 'executing', trigger: 'execute' },
  rolling_back: { label: 'đang hoàn tác', active: true, lease: 'rolling_back', trigger: 'rollback', rollback: true },
  precheck_blocked: { label: 'chờ quản trị viên xem xét' },
  clarification_limit: { label: 'cần quản trị viên làm rõ' },
  precheck_failed: { label: 'kiểm tra ban đầu chưa đạt' },
  plan_blocked: { label: 'kế hoạch bị chặn' },
  ticketized: { label: 'đã chia việc' },
  pre_pr_ready: { label: 'đã qua kiểm tra, sẵn sàng PR' },
  pre_pr_review: { label: 'cần người xem trước PR' },
  pre_pr_blocked: { label: 'chưa qua kiểm tra trước PR' },
  // Lỗi hạ tầng thoáng qua (transient) sau khi backoff gọi model đã hết: không tự về hàng đợi qua lease hết hạn
  // như các phase khác (status chuyển waiting_admin nên tránh nhánh status='running' của claimTransaction) —
  // admin bấm "Chạy lại ngay" (retryTransientTicket), hoặc công tắc limits.transient_retry.enabled tự làm việc đó sau retry_after_ms.
  transient_blocked: { label: 'lỗi hạ tầng, chờ chạy lại' },
  pr_open: { label: 'đã mở PR vào dev, chờ người duyệt' },
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
// Harness-owned behavioural oracles the server trusts, and the coverage flags each must report true.
// Keep in sync with ai-board/harness/functional.py ORACLES.
const ORACLE_COVERAGE = {
  'queue-worker-availability-v1': ['requester_api', 'mounted_ui', 'recovery'],
  'text-visible-v1': ['rendered_text'],
  'copy-response-v1': ['clipboard'],
  'search-activity-v1': ['filtering'],
};
const FAILURE_CLASSES = new Set(CONTRACT.failure_classes);
const MAX_REPAIRS = CONTRACT.max_repairs;
const MAX_BUDGET_EXTENSION = 200;
// ponytail: fixed D0 ceilings from the hardening spec; make them admin config only if real tickets hit them.
export const LIMITS = CONTRACT.limits;
const MAX_BUDGET_LIMIT = LIMITS.per_run.units.max; // hard ceiling across all extensions of one root

const DAY_MS = 24 * 3600_000;
// GPU-s người gửi r đã dùng từ mốc `?` (tổng budget_units các lần gọi model của mọi root của họ).
// ponytail: subquery tương quan mỗi dòng ứng viên; đủ cho ~100 yêu cầu/ngày, lên quy mô lớn thì cộng dồn vào bảng.
const ownerGpuS = (owner) => `(SELECT COALESCE(SUM(json_extract(g.evidence_json, '$.budget_units')), 0)
  FROM ai_gate_traces g JOIN ai_runs gr ON gr.id = g.run_id JOIN ai_tickets gt ON gt.id = gr.ticket_id
  JOIN requests grq ON grq.id = gt.source_request_id
  WHERE g.status = 'model_call' AND g.created_at > ? AND grq.owner_user_id = ${owner})`;
const OWNER_GPU_S = ownerGpuS('r.owner_user_id');
// Hàng đợi công bằng: việc tự sửa của board (self) sau mọi yêu cầu thật; priority; cùng mức thì người được phục vụ
// lâu nhất rồi (hoặc chưa bao giờ) trước; rồi FIFO.
const FAIR_ORDER = `r.type = 'self' ASC, t.priority DESC,
  COALESCE((SELECT MAX(se.created_at) FROM ai_events se JOIN ai_tickets st ON st.id = se.ticket_id
    JOIN requests sq ON sq.id = st.source_request_id
    WHERE se.transition = 'queued->running' AND sq.owner_user_id = r.owner_user_id), 0) ASC,
  t.created_at ASC, t.id ASC`;

/** Trần mỗi lượt theo số subtask n (contract.json limits.per_run): base + per_subtask·n, kẹp ở max. */
export function scaledLimit(kind, n) {
  const { base, per_subtask: step, max } = LIMITS.per_run[kind];
  const count = Math.min(Math.max(Number(n) || 0, 0), LIMITS.max_subtasks_per_run);
  return Math.min(base + step * count, max);
}
const MAX_BUDGET_EXTENSIONS = 2;
const SHA = /^[0-9a-f]{40}$/;
export const LEASE_MS = 120_000; // worker lease; also the admin view's stale threshold
const AI_BRANCH = new RegExp(CONTRACT.branch_pattern);
const PR_BASE = 'dev'; // AI Board PRs only ever target dev; merge, approve and main stay human
const CLARIFYING_NOTE = 'Ban điều hành cần trao đổi thêm để làm rõ yêu cầu.';
// Tác giả request_messages của lượt làm rõ: câu hỏi và bản tóm tắt tách nhau để đếm và để xác nhận.
export const CLARIFY_AUTHOR = 'Ban điều hành AI · làm rõ';
export const SPEC_AUTHOR = 'Ban điều hành AI · tóm tắt';
const PR_URL = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/pull\/(\d+)$/;

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

const count = (v) => (Number.isInteger(v) && v >= 0 ? v : 0);
/** {tên: giá trị} có trần: điểm nhóm (số) hoặc mã cấu hình (chuỗi ≤ 64). */
const smallMap = (m, keep) => Object.fromEntries(Object.entries(m && typeof m === 'object' ? m : {}).slice(0, 60)
  .filter(([, v]) => keep(v)).map(([k, v]) => [String(k).slice(0, 80), typeof v === 'string' ? v.slice(0, 64) : v]));
const isScore = (v) => typeof v === 'number' && Number.isFinite(v);
const isHash = (v) => typeof v === 'string';

/** Kết quả cổng eval của yêu cầu self — whitelist + trần; accepted phải khớp thắng > thua. */
function cleanEval(e) {
  if (!e || typeof e !== 'object') return null;
  const out = {
    base_sha: SHA.test(String(e.base_sha)) ? e.base_sha : null, variant_sha: SHA.test(String(e.variant_sha)) ? e.variant_sha : null,
    tasks: count(e.tasks), wins: count(e.wins), losses: count(e.losses), ties: count(e.ties),
    gpu_s: Number.isFinite(Number(e.gpu_s)) ? Number(e.gpu_s) : 0, gpu_s_limit: count(e.gpu_s_limit), gold: e.gold === true,
    dropped: Array.isArray(e.dropped) ? e.dropped.slice(0, 20).map((d) => String(d).slice(0, 200)) : [],
    strata: { base: smallMap(e.strata?.base, isScore), variant: smallMap(e.strata?.variant, isScore) },
    config: { base: smallMap(e.config?.base, isHash), variant: smallMap(e.config?.variant, isHash) },
    pairs: Array.isArray(e.pairs) ? e.pairs.slice(0, 200).map((p) => ({
      id: Number.isInteger(p?.id) ? p.id : String(p?.id ?? '').slice(0, 60), base: p?.base === true, variant: p?.variant === true,
    })) : [],
  };
  return { accepted: e.accepted === true && out.wins > out.losses && !out.dropped.length, ...out };
}

/** selfRequest: yêu cầu board tự sửa — cổng 5 là eval 2 sha (runner 'eval') thay Docker smoke + HTTP. */
function validatePrePrVerdict(value, selfRequest = false) {
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
      if (item.evidence?.text) clean.text = String(item.evidence.text).slice(-16000);
      clean.retried = item.retried === true;
      clean.runner = ['docker', 'fake', ...(selfRequest ? ['eval'] : [])].includes(item.runner) ? item.runner : null;
      if (item.functional) clean.functional = {
        probe_id: String(item.functional.probe_id || '').slice(0, 80), passed: item.functional.passed === true,
        reason: String(item.functional.reason || '').slice(0, 500),
        coverage: Object.fromEntries(Object.entries(item.functional.coverage || {}).slice(0, 8)
          .map(([key, flag]) => [String(key).slice(0, 40), flag === true])),
        observations: Object.fromEntries(Object.entries(item.functional.observations || {}).slice(0, 10)
          .map(([key, text]) => [String(key).slice(0, 80), String(text).slice(0, 1500)])),
      };
      if (selfRequest && item.eval) clean.eval = cleanEval(item.eval);
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
  const observed = selfRequest ? gate5?.runner === 'eval' && gate5.eval?.accepted === true
    : gate5?.smoke_passed === true && gate5?.http_observed === true
      && gate5.functional?.passed === true
      && Object.hasOwn(ORACLE_COVERAGE, gate5.functional.probe_id)
      && ORACLE_COVERAGE[gate5.functional.probe_id].every((flag) => gate5.functional.coverage[flag] === true);
  const passed = last.gate === 5.5 && !gates.some((gate) => gate.blocked) && observed;
  const passing = ['ready_for_pr', 'needs_review'].includes(value.outcome);
  if (passing && !passed) {
    throw new WorkerContractError(selfRequest ? 'passing self verdict requires a won eval through gate 5.5'
      : 'passing verdict requires successful smoke through gate 5.5');
  }
  if (passing && !selfRequest && gate5.runner !== 'docker') {
    throw new WorkerContractError('passing verdict requires gate 5 on real docker');
  }
  if (value.outcome === 'ready_for_pr' && !['low', 'medium'].includes(gate55?.risk_level))
    throw new WorkerContractError('ready verdict requires low or medium risk');
  if (value.outcome === 'needs_review' && !['high', 'critical'].includes(gate55?.risk_level))
    throw new WorkerContractError('review verdict requires high or critical risk');
  if (value.outcome === 'blocked' && !last.blocked) throw new WorkerContractError('blocked verdict requires a blocked gate');
  const budgetUsed = Number(value.budget_used ?? 0);
  if (!Number.isInteger(budgetUsed) || budgetUsed < 0) throw new WorkerContractError('invalid verdict budget');
  // Workers that omit failure_class: their blocks are treated as ordinary.
  const failureClass = value.outcome === 'blocked' ? (value.failure_class ?? 'ordinary') : (value.failure_class ?? null);
  if (value.outcome === 'blocked' ? !FAILURE_CLASSES.has(failureClass) || (failureClass === 'eval' && !selfRequest)
    : failureClass !== null) {
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
    candidate, gates,
    // Tuỳ chọn: sha gốc + skill cổng 1 của lượt, để task eval từ lần hỏng chạy lại được.
    ...(SHA.test(String(value.base_sha)) ? { base_sha: value.base_sha } : {}),
    ...(/^[a-z0-9-]{1,80}$/.test(String(value.skill)) ? { skill: value.skill } : {}) };
}

const MAX_TRACE_BATCH = 50;
const CALL_RESULTS = new Set(['ok', 'retry', 'error', 'http_error', 'timeout']);
const CALL_METRICS = ['wall_ms', 'tokens_in', 'tokens_out', 'tok_s', 'gpu_ms', 'load_ms', 'prompt_eval_ms', 'eval_ms', 'queue_ms'];
const num = (v) => (v == null || v === '' || !Number.isFinite(Number(v)) ? null : Number(v));
const str = (v, max) => (v == null ? null : String(v).slice(0, max));

const NOTE_KINDS = new Set(['knows', 'tool']);
/** What the model knew / which harness tool ran, what it changed, how that was judged: whitelist + cap. */
function cleanExplanation(c) {
  const notes = (Array.isArray(c.notes) ? c.notes : []).filter((n) => n && NOTE_KINDS.has(n.kind)).slice(0, 30)
    .map((n) => ({ kind: n.kind, name: str(n.name, 80), summary: str(n.summary, 500), data: str(n.data, 1500) }));
  const e = c.edits && typeof c.edits === 'object' ? c.edits : null;
  const edits = e ? { parsed: str(e.parsed, 4000), diff: str(e.diff, 4000), applied: e.applied === true } : null;
  const evaluation = (Array.isArray(c.evaluation) ? c.evaluation : []).filter((x) => x && typeof x === 'object').slice(0, 12)
    .map((x) => ({ check: str(x.check, 60), ok: x.ok === true, detail: str(x.detail, 800) }));
  return { notes, edits, evaluation };
}

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
    provider: ['ollama', 'vllm', 'api'].includes(c.provider) ? c.provider : null,
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
    ...cleanExplanation(c),
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

export const ADMIN_REQUEST_STATUSES = new Set(['pending', 'reviewing', 'done', 'rejected']);

export {
  validatePrePrVerdict, cleanAttachments, PHASES, triggerFor, ANY_QUEUE, PLAN_QUEUE, ACTIVE_ONLY, REQUEST_TYPES,
  WORKER_MODES, CLAIM_INTENTS, RUN_TRIGGERS, CLARIFYING_NOTE, DAY_MS, KEY as IDEMPOTENCY_KEY, parseJson,
  AI_BRANCH, EVENT_TYPES, MAX_BUDGET_EXTENSION, MAX_BUDGET_EXTENSIONS, MAX_BUDGET_LIMIT, MAX_TRACE_BATCH, PR_BASE, PR_URL,
  ROLLBACK_OUTCOMES, SELF_TAG, SELF_USER, SHA, cleanModelCall, parseAttachments, progressDetail, summarizeCalls, validateCandidate,
};
