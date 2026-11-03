// Elevation approval context: what the worker asks to touch, what the request text actually names, and the
// deterministic flags an admin needs before granting protected/core access. Pure (no DB, no model) so tests
// can exercise the flags without a fixture.
import { CAPABILITY_POLICY } from './security/policy.js';

// Vùng AI Board tự sửa: không ai được cấp, kể cả quản trị viên (cùng regex với cổng self-scope).
export const AI_BOARD_SCOPE = /^(?:server\/)?ai-board(?:\/|$)/i;
export const LEVEL_RANK = { surface: 0, protected: 1, core: 2 };
const MAX_STEPS = 20;
const MAX_STEP_PATHS = 8;
const MAX_TITLE = 160;
const MAX_GOAL = 300;
const EXCERPT = 600;

export const isSelfScope = (path) => AI_BOARD_SCOPE.test(String(path ?? ''));
export const levelRank = (level) => LEVEL_RANK[String(level ?? '').toLowerCase()] ?? LEVEL_RANK.core;
const clip = (value, cap) => String(value ?? '').slice(0, cap);

/** Bản trích nội dung người gửi; bỏ dòng "[Trang: …]" mà nút Góp ý chèn làm ngữ cảnh. */
export function requestExcerpt(detail, cap = EXCERPT) {
  const plain = String(detail ?? '').replace(/^\[Trang:[^\n]*\n?/, '').trim();
  return plain.length > cap ? `${plain.slice(0, cap - 1)}…` : plain;
}

/** Một path được nêu trong yêu cầu: đúng path, tên file, hoặc tên không phần mở rộng. */
export function namedInText(text, path, { minLength = 4 } = {}) {
  const haystack = String(text ?? '').toLowerCase().replaceAll('\\', '/');
  const normalized = String(path ?? '').toLowerCase().replaceAll('\\', '/').replace(/^\.\//, '');
  if (!haystack || !normalized) return false;
  const base = normalized.split('/').pop() ?? '';
  const stem = base.replace(/\.[a-z0-9]+$/i, '');
  return [normalized, base, stem].some((needle) => needle.length >= minLength && haystack.includes(needle));
}

const stepPaths = (step) => {
  const scope = Array.isArray(step?.allowed_scope) ? step.allowed_scope : [];
  const summarized = Array.isArray(step?.paths) ? step.paths : [];
  const extra = typeof step?.file === 'string' ? [step.file] : [];
  return [...new Set([...scope, ...summarized, ...extra].map((item) => String(item ?? '').replaceAll('\\', '/').replace(/^\.\//, ''))
    .filter(Boolean))].slice(0, MAX_STEP_PATHS);
};

/** Plan (worker gửi kèm hoặc plan_json đã lưu) → {goal, steps:[{order,title,paths,capability}]}; null nếu rỗng. */
export function normalizePlanSummary(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const steps = (Array.isArray(raw.steps) ? raw.steps : []).slice(0, MAX_STEPS).map((step, index) => ({
    order: Number.isInteger(Number(step?.order)) ? Number(step.order) : index + 1,
    title: clip(step?.title, MAX_TITLE),
    paths: stepPaths(step),
    capability: typeof step?.capability === 'string' ? clip(step.capability, 64) : null,
  })).filter((step) => step.title || step.paths.length);
  const goal = clip(raw.goal, MAX_GOAL);
  if (!steps.length && !goal) return null;
  if (!steps.length) return null; // bước là thứ admin duyệt; goal một mình không đủ
  return { goal, steps };
}

/** Mức của capability trong plan; capability lạ → null (không tự suy mức). */
export const capabilityTier = (capability, policy = CAPABILITY_POLICY) => {
  const tier = policy?.[String(capability ?? '')]?.tier;
  return Object.hasOwn(LEVEL_RANK, tier) ? tier : null;
};

const stepTier = (step, fallbackTier, policy) => capabilityTier(step.capability, policy) ?? fallbackTier ?? null;

const coversPath = (stepPath, path) => stepPath === path || (stepPath.endsWith('/') && path.startsWith(stepPath));

/** Scope hiện tại + plan → [{path, level, named_in_request, in_plan, plan_tier, plan_step, level_above_plan, outside_request}]. */
export function scopeRows({ scope, requestText, plan, planTier = null, policy = CAPABILITY_POLICY }) {
  return (Array.isArray(scope) ? scope : []).map((item) => {
    const path = String(item?.path ?? '');
    const level = String(item?.level ?? 'core').toLowerCase();
    const named = namedInText(requestText, path);
    let match = null;
    let tier = null;
    for (const step of plan?.steps ?? []) {
      if (!step.paths.some((stepPath) => coversPath(stepPath, path))) continue;
      const candidate = stepTier(step, planTier, policy);
      if (tier === null || levelRank(candidate) > levelRank(tier)) { tier = candidate; match = step; }
    }
    return {
      path,
      level,
      named_in_request: named,
      in_plan: !!match,
      plan_tier: tier,
      plan_step: match ? { order: match.order, title: match.title, capability: match.capability } : null,
      level_above_plan: !!tier && levelRank(level) > levelRank(tier),
      outside_request: !named && !match,
    };
  });
}

const scopeKey = (scope) => JSON.stringify((Array.isArray(scope) ? scope : [])
  .map((item) => [String(item?.path ?? ''), String(item?.level ?? '')]).sort());

/**
 * Dựng context duyệt elevation. `asked` = sự kiện elevation_requested gần nhất (snapshot lúc worker xin):
 * {created_at, actor_type, actor_id, detail:{scope, reason, plan_hash, plan_revision, plan}}.
 * `plan` = {source, plan_hash, revision, tier, goal, steps} đã chuẩn hoá (normalizePlanSummary).
 */
export function buildElevationContext({ request, root, asked, scope, plan = null, policy = CAPABILITY_POLICY }) {
  const requestText = [request?.title, request?.detail, request?.clarified_spec].filter(Boolean).join('\n');
  const rows = scopeRows({ scope, requestText, plan, planTier: plan?.tier ?? null, policy });
  const askedScope = Array.isArray(asked?.detail?.scope) ? asked.detail.scope : [];
  const askedHash = asked?.detail?.plan_hash ?? null;
  const currentHash = root?.plan_hash ?? null;
  const scopeChanged = askedScope.length > 0
    && (scopeKey(askedScope) !== scopeKey(scope) || (!!askedHash && !!currentHash && askedHash !== currentHash));
  return {
    request: {
      id: Number(request?.id) || null,
      title: clip(request?.title, MAX_TITLE),
      excerpt: requestExcerpt(request?.detail),
      created_at: request?.created_at ?? null,
      owner_role: request?.owner_role ?? null,
    },
    elevation: {
      state: root?.elevation ?? 'none',
      max_level: rows.reduce((top, row) => (levelRank(row.level) > levelRank(top) ? row.level : top), 'surface'),
      reason: asked?.detail?.reason ?? root?.elevation_reason ?? null,
      requested_at: asked?.created_at ?? null,
      requested_by: { type: asked?.actor_type ?? null, id: asked?.actor_id ?? null },
      scope: rows,
    },
    plan: {
      available: !!plan?.steps?.length,
      source: plan?.source ?? 'none',
      plan_hash: plan?.plan_hash ?? askedHash ?? null,
      revision: plan?.revision ?? asked?.detail?.plan_revision ?? null,
      tier: plan?.tier ?? null,
      goal: plan?.goal ?? '',
      steps: (plan?.steps ?? []).map((step) => ({
        order: step.order, title: step.title, paths: step.paths, capability: step.capability,
        tier: stepTier(step, plan?.tier ?? null, policy),
      })),
    },
    flags: {
      outside_request: rows.some((row) => row.outside_request),
      scope_changed_since_request: scopeChanged,
      self_scope: rows.some((row) => isSelfScope(row.path)),
      plan_missing: !plan?.steps?.length,
      level_above_plan: rows.some((row) => row.level_above_plan),
    },
    evidence: {
      plan_hash_request: askedHash,
      plan_hash_current: currentHash,
      revision_request: asked?.detail?.plan_revision ?? null,
      revision_current: root?.plan_revision || null,
      plan_source: plan?.source ?? 'none',
      requested_at: asked?.created_at ?? null,
      requested_by: { type: asked?.actor_type ?? null, id: asked?.actor_id ?? null },
      request_url: request?.id ? `/admin-request.html?id=${Number(request.id)}` : null,
    },
  };
}
