import { createHash } from 'node:crypto';
import { LIMITS, WorkerContractError } from '../repositories/store-contract.js';

const bad = (message, code = 'invalid_allowance', status = 400) => new WorkerContractError(message, status, code);
const denial = (reason, message, code = 'root_allowance_exhausted') => Object.assign(bad(message, code, 409), { reason });
const keyPattern = /^[A-Za-z0-9._:-]{8,128}$/;
const kinds = { model: 'model_calls', tool: 'tool_calls', semantic_repair: 'semantic_repairs', quality_switch: 'quality_switches' };
const leaseHash = value => createHash('sha256').update(value).digest('hex');
const fields = ['tokens_in', 'tokens_out', 'wall_ms', 'gpu_ms'];
const integer = value => Number.isSafeInteger(value) && value >= 0;

/** Lý do đầu tiên chặn một reservation, null nếu được cấp. Thứ tự kiểm tra giữ nguyên quyết định cấp/từ chối. */
export function rootDenial(state, kind, tokens, provider = 'api') {
  const { used, limits } = state;
  if (used.model_calls >= limits.model_calls) return 'root_model_calls';
  if (used.tool_calls >= limits.tool_calls) return 'root_tool_calls';
  const metered = provider === 'api';
  if (metered && used.metered_tokens >= limits.tokens) return 'root_tokens';
  const cap = kinds[kind];
  if (used[cap] + 1 > limits[cap]) return `root_${cap}`;
  if (metered && used.metered_tokens + tokens > limits.tokens) return 'root_tokens_reserve';
  return null;
}

/** Từng giới hạn root với số đã dùng và cờ chạm trần; chỉ đọc, không ghi ledger. */
export function rootAllowanceGroups({ used, limits }) {
  return [
    ['root_model_calls', used.model_calls, limits.model_calls],
    ['root_tool_calls', used.tool_calls, limits.tool_calls],
    ['root_tokens', used.metered_tokens ?? used.tokens, limits.tokens],
    ['root_semantic_repairs', used.semantic_repairs, limits.semantic_repairs],
    ['root_quality_switches', used.quality_switches, limits.quality_switches],
  ].map(([reason, value, limit]) => ({ reason, used: value, limit, hit: value >= limit }));
}

export const ROOT_GROUP_LABEL = { model_calls: 'số lần gọi model', tool_calls: 'số lần gọi công cụ', tokens: 'token',
  semantic_repairs: 'số lần tự sửa theo ngữ nghĩa', quality_switches: 'số lần đổi sang model chất lượng' };

/** Nhóm root đầu tiên chạm trần: {group, used, limit} hoặc null. */
export function hitRootGroup(allowance) {
  const hit = allowance?.groups.find(g => g.hit);
  return hit ? { group: hit.reason.replace(/^root_/, ''), used: hit.used, limit: hit.limit } : null;
}

const EXECUTE_PHASES = ['executing', 'reverifying', 'rolling_back'];
/** Lượt lập plan và lượt thực hiện có ngân sách riêng cho model_calls/semantic_repairs. */
export const bucketOf = root => (EXECUTE_PHASES.includes(root.phase) ? 'execute' : 'plan');
const bucketed = ['model_calls', 'semantic_repairs'];

/** Trần execute = base + per_step * số bước plan hiện hành, kẹp max; chưa có plan thì base. */
export function scaledRootLimit(cap, steps) {
  const { per_step: step, max } = LIMITS.root_work_scaling[cap];
  const count = Math.min(Math.max(Number(steps) || 0, 0), LIMITS.max_subtasks_per_run);
  return Math.min(LIMITS.root_work[cap] + step * count, max);
}

async function planSteps(db, root) {
  const ticket = await db.get('SELECT plan_hash FROM ai_tickets WHERE id=?', [root]);
  if (!ticket?.plan_hash) return 0;
  const plan = await db.get('SELECT plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=? ORDER BY revision DESC LIMIT 1', [root, ticket.plan_hash]);
  try { return JSON.parse(plan?.plan_json ?? 'null')?.steps?.length ?? 0; } catch { return 0; }
}

export async function readRootAllowance(db, root, bucket = 'execute') {
  const row = await db.get('SELECT * FROM ai_root_allowances WHERE root_ticket_id=?', [root]);
  if (!row) return null;
  const stored = row.limits_json ? JSON.parse(row.limits_json) : {};
  const steps = await planSteps(db, root);
  const floorAtStored = limits => Object.fromEntries(Object.entries(limits).map(([k, v]) => [k, Math.max(v, stored[k] ?? 0)]));
  const planLimits = floorAtStored(LIMITS.root_work);
  const executeLimits = floorAtStored({ ...LIMITS.root_work, ...Object.fromEntries(bucketed.map(cap => [cap, scaledRootLimit(cap, steps)])) });
  const limits = bucket === 'plan' ? planLimits : executeLimits;
  const zero = () => ({ model_calls: 0, tool_calls: 0, tokens: 0, metered_tokens: 0, semantic_repairs: 0, quality_switches: 0 });
  const used = zero(), planUsed = zero();
  const byProvider = Object.create(null);
  const reservations = await db.all(`SELECT r.*, p.phase AS bucket FROM ai_work_reservations r
    LEFT JOIN ai_work_reservation_phases p ON p.root_ticket_id=r.root_ticket_id AND p.attempt_key=r.attempt_key
    WHERE r.root_ticket_id=? ORDER BY r.created_at, r.attempt_key`, [root]);
  for (const r of reservations) {
    const cap = kinds[r.kind];
    const spent = r.tokens_used ?? r.tokens_reserved;
    const isPlan = r.bucket === 'plan';
    const add = (target, counted) => {
      if (counted) target[cap]++;
      target.tokens += spent;
      if (r.provider === 'api') target.metered_tokens += spent; // vllm/ollama are free: only paid api tokens are capped
    };
    add(used, !bucketed.includes(cap) || isPlan === (bucket === 'plan'));
    if (isPlan) add(planUsed, true);
    if (r.kind !== 'model') continue;
    const p = byProvider[r.provider] ??= { model_calls: 0, tokens_in: null, tokens_out: null, wall_ms: null, gpu_ms: null,
      missing: { tokens_in: 0, tokens_out: 0, wall_ms: 0, gpu_ms: 0 } };
    p.model_calls++;
    const metrics = r.metrics_json ? JSON.parse(r.metrics_json) : {};
    for (const field of fields) {
      if (metrics[field] == null) p.missing[field]++;
      else p[field] = (p[field] ?? 0) + metrics[field];
    }
  }
  const unknown = reservations.filter(r => r.kind === 'model' && r.tokens_used == null).length;
  return { limits, used, steps, bucket, plan: { limits: planLimits, used: planUsed }, blocked_reason: row.blocked_reason, by_provider: byProvider,
    unknown_model_attempts: unknown, unknown_holds: unknown, groups: rootAllowanceGroups({ limits, used }) };
}

/** Root-owned work is reserved before I/O; unknown attempts keep their full token reservation. */
export function createRootAllowanceService(store) {
  const db = store.db;
  const state = (root, bucket) => readRootAllowance(db, root, bucket);

  async function apply(ticketId, op, body = {}) {
    if (!['read', 'reserve', 'settle'].includes(op)) throw bad('unknown allowance operation', 'unknown_operation', 404);
    return db.tx(async () => {
      // Same admission lock/order as claim; release before any provider I/O.
      if (op === 'reserve' && body.kind === 'model') await db.get('SELECT pg_advisory_xact_lock(hashtext(current_schema()),7000103)');
      const root = await store.assertLease(ticketId, String(body.worker_id || ''), String(body.lease_token || ''));
      await db.run(`INSERT INTO ai_root_allowances(root_ticket_id, limits_json, blocked_reason, created_at)
        SELECT ?, ?, CASE WHEN EXISTS(SELECT 1 FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id
          WHERE r.ticket_id=? AND g.status='model_call') THEN 'legacy_allowance_unknown' ELSE NULL END, ? ON CONFLICT DO NOTHING`,
        [root.id, null, root.id, Date.now()]);
      const bucket = bucketOf(root);
      const current = await state(root.id, bucket);
      if (op === 'read') return current;
      if (typeof body.idempotency_key !== 'string' || !keyPattern.test(body.idempotency_key)) throw bad('invalid attempt key');
      const params = [root.id, body.idempotency_key];
      const prior = await db.get('SELECT * FROM ai_work_reservations WHERE root_ticket_id=? AND attempt_key=?', params);
      if (op === 'reserve') {
        if (prior) throw denial('attempt_already_reserved', 'attempt already reserved; do not repeat remote work', 'attempt_already_reserved');
        if (current.blocked_reason) throw bad('root allowance needs review', current.blocked_reason, 409);
        if (typeof body.kind !== 'string' || !Object.hasOwn(kinds, body.kind)) throw bad('invalid reservation kind');
        const model = body.kind === 'model';
        const tokens = model ? body.token_bound : 0;
        if (!integer(tokens) || (model && !tokens)) throw bad('positive model token bound required');
        if (model && !['vllm', 'ollama', 'api'].includes(body.provider)) throw bad('invalid provider');
        if (model) await store.assertModelResourceAdmission(root);
        const reason = rootDenial(current, body.kind, tokens, model ? body.provider : 'api');
        if (reason) throw denial(reason, 'root work allowance exhausted');
        await db.run(`INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`, [...params, body.kind, model ? body.provider : null, leaseHash(body.lease_token), tokens, Date.now()]);
        await db.run('INSERT INTO ai_work_reservation_phases(root_ticket_id, attempt_key, phase) VALUES (?, ?, ?)', [...params, bucket]);
      } else {
        if (!prior || prior.kind !== 'model') throw bad('no model reservation', 'reservation_missing', 409);
        if (prior.lease_hash !== leaseHash(body.lease_token)) throw bad('reservation belongs to an older lease', 'stale_reservation', 409);
        const metrics = Object.fromEntries(fields.map(field => [field, body.metrics?.[field] ?? null]));
        for (const field of fields) {
          if (metrics[field] != null && !integer(metrics[field])) throw bad('metrics must be nonnegative safe integers or null');
        }
        const encoded = JSON.stringify(metrics);
        if (prior.settled_at != null) {
          if (encoded !== prior.metrics_json) throw bad('settlement cannot change', 'settlement_conflict', 409);
          return current;
        }
        const tokens = metrics.tokens_in == null || metrics.tokens_out == null ? null : metrics.tokens_in + metrics.tokens_out;
        if (tokens != null && !integer(tokens)) throw bad('invalid token total');
        await db.run(`UPDATE ai_work_reservations SET tokens_used=?, metrics_json=?, settled_at=? WHERE root_ticket_id=? AND attempt_key=?`,
          [tokens, encoded, Date.now(), ...params]);
        if (prior.provider === 'api' && tokens > prior.tokens_reserved) {
          await db.run("UPDATE ai_root_allowances SET blocked_reason='model_token_bound_violation' WHERE root_ticket_id=?", [root.id]);
        }
      }
      return state(root.id, bucket);
    });
  }
  return { apply, read: state };
}
