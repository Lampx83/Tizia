// Risk assessment for a pending elevation request: one model call per plan_hash + scope, cached in
// ai_elevation_risks, deterministic floor on top. Advice only — this module never decides an elevation.
import { createHash } from 'node:crypto';
import fs from 'node:fs';

import { environment } from '../settings.js';
import { loadCatalog, resolveCandidates } from '../providers/model-routing.js';
import { vllmBody, vllmChatUrl, vllmHeaders, vllmText } from '../../ai-llm.js';

const LEVELS = ['low', 'medium', 'high'];
const RECOMMENDATIONS = ['approve', 'review', 'reject'];
const LEVEL_WEIGHT = { unknown: 0, low: 1, medium: 2, high: 3 };
const MAX_REASONS = 8;
const MAX_QUESTIONS = 5;
const MAX_CONTEXT_CHARS = 4000;
const DEFAULT_TIMEOUT_MS = 25_000;

let cachedSkillBody = null;

/** Rubric text from the harness skill; a missing file must not take the endpoint down. */
function skillBody() {
  if (cachedSkillBody !== null) return cachedSkillBody;
  try {
    const raw = fs.readFileSync(new URL('../../../ai-board/harness/skills/default-security-audit/SKILL.md', import.meta.url), 'utf8');
    const body = raw.replace(/\r\n/g, '\n').split('---\n').slice(2).join('---\n').trim();
    cachedSkillBody = body || fallbackRubric();
  } catch {
    cachedSkillBody = fallbackRubric();
  }
  return cachedSkillBody;
}

function fallbackRubric() {
  return [
    'Bạn soát một yêu cầu nâng mức của AI Board. Không cấp quyền; chỉ đánh giá.',
    'Kiểm: path có được yêu cầu nêu tên không, mức xin có cao hơn việc cần làm không,',
    'plan có bước lạ không, có chạm auth/DB/migration/bí mật/thanh toán không.',
    'Trả JSON đúng schema, không thêm chữ ngoài JSON.',
  ].join(' ');
}

const clip = (value, cap) => String(value ?? '').slice(0, cap);

/** Scope rows → cache key; cùng path+mức thì dùng lại kết quả model. */
export function elevationScopeKey(scope = []) {
  const rows = (Array.isArray(scope) ? scope : []).map((item) => [clip(item?.path, 300), clip(item?.level, 20)])
    .sort((a, b) => a[0].localeCompare(b[0]));
  return createHash('sha256').update(JSON.stringify(rows)).digest('hex').slice(0, 32);
}

export const elevationRiskKey = (context) => ({
  plan_hash: context?.plan?.plan_hash || 'no-plan',
  scope_hash: elevationScopeKey(context?.elevation?.scope),
});

/** Chuẩn hoá câu trả lời model; null khi không đúng schema (coi như không có đánh giá). */
export function parseElevationRisk(text) {
  let body = String(text ?? '').trim();
  if (!body) return null;
  const fenced = body.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) body = fenced[1].trim();
  const start = body.indexOf('{');
  const end = body.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  let data;
  try { data = JSON.parse(body.slice(start, end + 1)); } catch { return null; }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const level = LEVELS.includes(data.level) ? data.level : null;
  const recommendation = RECOMMENDATIONS.includes(data.recommendation) ? data.recommendation : 'review';
  const reasons = (Array.isArray(data.reasons) ? data.reasons : []).filter((item) => typeof item === 'string' && item.trim())
    .map((item) => clip(item.trim(), 300)).slice(0, MAX_REASONS);
  const questions = (Array.isArray(data.questions) ? data.questions : []).filter((item) => typeof item === 'string' && item.trim())
    .map((item) => clip(item.trim(), 300)).slice(0, MAX_QUESTIONS);
  if (!level || !reasons.length) return null;
  return { level, reasons, recommendation, questions };
}

/** Model nói thấp hơn mức sàn do cờ tất định thì nâng lên; cờ self-scope luôn là chặn. */
export function applyRiskFloor(risk, flags = {}) {
  const raised = [];
  let level = risk.level;
  let recommendation = risk.recommendation;
  if (flags.self_scope) {
    return { ...risk, level: 'high', recommendation: 'reject', raised: ['self_scope'] };
  }
  // Chưa có đánh giá (unknown) thì không tự bịa mức; chỉ hạ gợi ý duyệt xuống review.
  if (level === 'unknown') {
    return { ...risk, recommendation: recommendation === 'approve' ? 'review' : recommendation, raised };
  }
  const atLeast = (wanted) => { if (LEVEL_WEIGHT[wanted] > LEVEL_WEIGHT[level]) { level = wanted; raised.push('scope'); } };
  if (flags.outside_request || flags.scope_changed_since_request) atLeast('medium');
  if (flags.level_above_plan) atLeast('medium');
  if (flags.plan_missing && recommendation === 'approve') { recommendation = 'review'; raised.push('plan_missing'); }
  if ((flags.outside_request || flags.scope_changed_since_request || flags.level_above_plan) && recommendation === 'approve') {
    recommendation = 'review';
  }
  return { ...risk, level, recommendation, raised };
}

function compactContext(context) {
  const payload = {
    request: { title: context?.request?.title ?? '', excerpt: clip(context?.request?.excerpt, 700) },
    elevation: {
      scope: (context?.elevation?.scope ?? []).map((row) => ({
        path: row.path, level: row.level, named_in_request: row.named_in_request,
        in_plan: row.in_plan, plan_tier: row.plan_tier, outside_request: row.outside_request,
      })),
      reason: clip(context?.elevation?.reason, 500),
    },
    plan: {
      available: context?.plan?.available === true,
      goal: clip(context?.plan?.goal, 300),
      steps: (context?.plan?.steps ?? []).map((step) => ({ order: step.order, title: clip(step.title, 160),
        paths: step.paths, capability: step.capability, tier: step.tier })),
    },
    flags: context?.flags ?? {},
  };
  const json = JSON.stringify(payload);
  return json.length > MAX_CONTEXT_CHARS ? `${json.slice(0, MAX_CONTEXT_CHARS)}…` : json;
}

/** Prompt cố định: rubric skill + ngữ cảnh đã cắt; model chỉ trả JSON, không được tự cấp quyền. */
export function buildRiskPrompt(context) {
  return [
    'Review the elevation request below. Assess risk only; the final decision belongs to the administrator.',
    'Trả JSON đúng dạng: {"level":"low|medium|high","reasons":["..."],"recommendation":"approve|review|reject","questions":["..."]}',
    'Do not invent paths that are not in scope; give short, specific reasons.',
    '',
    skillBody(),
    '',
    'CONTEXT:',
    compactContext(context),
  ].join('\n');
}

const unavailable = (reason, extra = {}) => ({
  level: 'unknown', reasons: [reason], recommendation: 'review', questions: [],
  source: 'unknown', model: null, cached: false, ...extra,
});

async function cachedRisk(db, key) {
  if (!db) return null;
  try {
    const row = await db.get('SELECT level, payload_json, model, created_at FROM ai_elevation_risks WHERE plan_hash=? AND scope_hash=?',
      [key.plan_hash, key.scope_hash]);
    if (!row) return null;
    const payload = JSON.parse(row.payload_json);
    if (!LEVELS.includes(payload.level) || !Array.isArray(payload.reasons)) return null;
    return { ...payload, level: payload.level, model: row.model ?? payload.model ?? null,
      source: 'cached', cached: true, assessed_at: Number(row.created_at) || null };
  } catch { return null; }
}

async function storeRisk(db, key, risk, model, now) {
  if (!db) return;
  try {
    await db.run(`INSERT INTO ai_elevation_risks(plan_hash, scope_hash, level, payload_json, model, created_at)
      VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (plan_hash, scope_hash) DO NOTHING`,
    [key.plan_hash, key.scope_hash, risk.level, JSON.stringify(risk), model ?? null, now]);
  } catch { /* cache write is best effort: the assessment still renders */ }
}

/**
 * Một lần gọi model cho plan_hash + scope. Không có model/URL hoặc lỗi → level 'unknown' (không cache),
 * vì admin vẫn phải thấy là chưa đánh giá được thay vì một mức thấp giả.
 */
export async function assessElevationRisk({ db = null, context, env = environment(), fetchImpl = fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS, now = Date.now() } = {}) {
  const key = elevationRiskKey(context);
  const cached = await cachedRisk(db, key);
  if (cached) return applyRiskFloor(cached, context?.flags);
  let candidate = null;
  try { candidate = resolveCandidates('elevation_risk', { catalog: loadCatalog(), env })[0] ?? null; }
  catch { candidate = null; }
  if (!candidate?.connection?.url) return applyRiskFloor(unavailable('Chưa cấu hình model đánh giá rủi ro.'), context?.flags);
  let response;
  try {
    response = await fetchImpl(vllmChatUrl(candidate.connection.url), {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(timeoutMs),
      headers: vllmHeaders(candidate.connection.secret),
      body: JSON.stringify(vllmBody({ model: candidate.model, messages: [
        { role: 'system', content: 'You are the security reviewer for the administrator. Return JSON only.' },
        { role: 'user', content: buildRiskPrompt(context) },
      ], temperature: 0, maxTokens: 600, json: true })),
    });
  } catch (error) {
    return applyRiskFloor(unavailable(`Không gọi được model đánh giá rủi ro (${clip(error?.name || error?.message, 80)}).`), context?.flags);
  }
  if (!response.ok) {
    return applyRiskFloor(unavailable(`Model đánh giá rủi ro trả lỗi HTTP ${response.status}.`), context?.flags);
  }
  let text;
  try { text = vllmText(await response.json()); } catch { text = ''; }
  const parsed = parseElevationRisk(text);
  if (!parsed) {
    return applyRiskFloor(unavailable('Model trả lời không đúng định dạng đánh giá; cần người xem.'), context?.flags);
  }
  const risk = { ...parsed, source: 'model', model: candidate.model, cached: false, assessed_at: now };
  await storeRisk(db, key, { ...risk, cached: false }, candidate.model, now);
  return applyRiskFloor(risk, context?.flags);
}
