// ============================================================
// AI usage quota & token log
// ============================================================
// Tizia dùng Ollama on-prem (qwen2.5:14b) → miễn phí token, nhưng
// vẫn cần infrastructure này để:
//   1. Tracking: capacity Ollama (GPU/CPU) đang dùng tới đâu
//   2. Rate limit per-user theo plan, chặn spam
//   3. Audit trail: mọi AI call gắn user_id + endpoint
//   4. Sẵn schema cho cloud LLM tương lai (Anthropic/OpenAI cost = $/token)
// ============================================================

import { db, getBestParentPlanForChild } from './db.js';
import { effectivePlan, effectivePlanWithFamily, dailyAiQuota } from './contexts/billing/user-plans.js';
import { checkContentSafety, extractPromptText } from './contexts/safety/profanity-vi.js';

// ─────────────── Schema ───────────────
await db.exec(`
  CREATE TABLE IF NOT EXISTS ai_token_usage (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id           INTEGER,                -- NULL nếu chưa login (caller phải gate)
    provider          TEXT    NOT NULL,       -- 'ollama' | 'anthropic' | 'openai' | 'quota-gate'
    model             TEXT    NOT NULL,       -- 'qwen2.5:14b-instruct-ctx16k' | '-' nếu blocked
    endpoint          TEXT    NOT NULL,       -- 'grade-soap' | 'patient-turn' | ...
    prompt_tokens     INTEGER NOT NULL DEFAULT 0,
    completion_tokens INTEGER NOT NULL DEFAULT 0,
    cost_usd_micros   INTEGER NOT NULL DEFAULT 0,
    duration_ms       INTEGER,
    status            TEXT    NOT NULL,       -- 'ok' | 'error' | 'blocked'
    created_at        INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ai_usage_user_time   ON ai_token_usage(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ai_usage_status      ON ai_token_usage(status, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ai_usage_time        ON ai_token_usage(created_at DESC);

  -- Trục 2: log chi tiết prompt text của HS để GV/PH xem được. SV/GV cũng log
  -- nhưng chỉ khi blocked (tiết kiệm storage). prompt_text giới hạn 500 ký tự
  -- để tránh dump bài luận dài. block_reason/block_category lấy từ checkContentSafety.
  CREATE TABLE IF NOT EXISTS ai_prompt_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER,
    role            TEXT,                       -- 'pupil' | 'student' | 'teacher' | 'guest'
    endpoint        TEXT    NOT NULL,
    prompt_text     TEXT,                       -- max 500 char, đã trim
    blocked         INTEGER NOT NULL DEFAULT 0, -- 0 | 1
    block_reason    TEXT,
    block_category  TEXT,                       -- profanity | self_harm | violence_threat | pii
    created_at      INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ai_log_user_time   ON ai_prompt_log(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ai_log_blocked     ON ai_prompt_log(blocked, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_ai_log_time        ON ai_prompt_log(created_at DESC);
`);

// ─────────────── Default quotas (env override) ───────────────
const QUOTA = {
  perUserPerHour:      Number(process.env.AI_QUOTA_USER_PER_HOUR)      || 200,        // requests
  perUserTokensHour:   Number(process.env.AI_QUOTA_USER_TOKENS_HOUR)   || 100_000,
  perGlobalPerHour:    Number(process.env.AI_QUOTA_GLOBAL_PER_HOUR)    || 100_000,
  perGlobalTokensHour: Number(process.env.AI_QUOTA_GLOBAL_TOKENS_HOUR) || 50_000_000,
};

// Cost table (USD micros per token = $/M tokens × 1) — chỉ cho cloud provider.
// Ollama on-prem = 0. Số dưới đây cập nhật theo bảng giá Anthropic/OpenAI 2026-01.
const COST_TABLE = {
  'ollama:default':                  { prompt: 0,    completion: 0    },
  'anthropic:claude-haiku-4-5':      { prompt: 0.8,  completion: 4    },
  'anthropic:claude-sonnet-4-6':     { prompt: 3,    completion: 15   },
  'anthropic:claude-opus-4-7':       { prompt: 15,   completion: 75   },
  'openai:gpt-4o-mini':              { prompt: 0.15, completion: 0.6  },
  'openai:gpt-4o':                   { prompt: 2.5,  completion: 10   },
};

function calcCostMicros(provider, model, pt, ct) {
  const key = `${provider}:${model}`;
  const tbl = COST_TABLE[key] || COST_TABLE[`${provider}:default`] || { prompt: 0, completion: 0 };
  return Math.round(pt * tbl.prompt + ct * tbl.completion);
}

// ─────────────── Logging ───────────────
const insertUsageStmt = db.prepare(`
  INSERT INTO ai_token_usage (
    user_id, provider, model, endpoint,
    prompt_tokens, completion_tokens, cost_usd_micros, duration_ms, status, created_at
  ) VALUES (
    @user_id, @provider, @model, @endpoint,
    @prompt_tokens, @completion_tokens, @cost_usd_micros, @duration_ms, @status, @created_at
  )
`);

export async function logAiUsage({
  user_id, provider, model, endpoint,
  prompt_tokens = 0, completion_tokens = 0,
  duration_ms = null, status = 'ok',
}) {
  await insertUsageStmt.run({
    user_id:   user_id ? Number(user_id) : null,
    provider:  String(provider || ''),
    model:     String(model || ''),
    endpoint:  String(endpoint || ''),
    prompt_tokens:     Math.max(0, Math.floor(prompt_tokens)),
    completion_tokens: Math.max(0, Math.floor(completion_tokens)),
    cost_usd_micros:   calcCostMicros(provider, model, prompt_tokens, completion_tokens),
    duration_ms:       duration_ms == null ? null : Math.max(0, Math.floor(duration_ms)),
    status,
    created_at: Date.now(),
  });
}

// ─────────────── Quota check ───────────────
const HOUR_MS = 3600 * 1000;
const DAY_MS = 24 * HOUR_MS;
const userUsageStmt = db.prepare(`
  SELECT COUNT(*) AS req, COALESCE(SUM(prompt_tokens + completion_tokens), 0) AS tokens
  FROM ai_token_usage
  WHERE user_id = ? AND created_at > ? AND status != 'blocked'
`);
const globalUsageStmt = db.prepare(`
  SELECT COUNT(*) AS req, COALESCE(SUM(prompt_tokens + completion_tokens), 0) AS tokens
  FROM ai_token_usage
  WHERE created_at > ? AND status != 'blocked'
`);

// Trục 2: cap quota theo role để bảo vệ HS (không thể spam Ollama vô tận, dù plan cao).
// pupil: cap cứng 15 req/ngày bất kể plan (kỷ luật học → không lạm dụng AI làm hộ).
// student: theo plan nguyên.
// teacher: ×2 plan (GV cần đọc/chấm/duyệt nhiều).
const PUPIL_DAY_CAP = 15;
const TEACHER_MULTIPLIER = 2;
export function dailyAiQuotaForUser(user) {
  const base = dailyAiQuota(user?.plan || 'free');
  const role = user?.role || 'guest';
  if (role === 'pupil') return Math.min(base, PUPIL_DAY_CAP);
  if (role === 'teacher') return base * TEACHER_MULTIPLIER;
  return base;
}

// Per-user quota theo PLAN (window 24h, đếm ai_calls_day). Global vẫn dùng
// hour window để chống burst nghẽn Ollama. Guest (rank 0) → chặn cứng.
// Trục 2: cap theo role thêm bên trên plan — xem dailyAiQuotaForUser.
export async function checkAiQuota({ user_id, user_plan, user_role }) {
  const now = Date.now();
  const userU   = user_id ? await userUsageStmt.get(Number(user_id), now - DAY_MS) : { req: 0, tokens: 0 };
  const globalU =           await globalUsageStmt.get(now - HOUR_MS);

  if (user_id) {
    const dayCap = dailyAiQuotaForUser({ plan: user_plan, role: user_role });
    if (dayCap <= 0) {
      return { allowed: false, reason: 'plan_no_ai', retry_after: 60, upgrade_url: '/pricing.html' };
    }
    if (userU.req >= dayCap) {
      return { allowed: false, reason: `user_day_cap (${dayCap}/ngày, gói ${user_plan})`, retry_after: 3600, upgrade_url: '/pricing.html' };
    }
    if (userU.tokens >= QUOTA.perUserTokensHour * 4) {  // 4× hour cap ≈ day token cap (sanity)
      return { allowed: false, reason: 'user_token_day_cap', retry_after: 3600 };
    }
  }
  if (globalU.req >= QUOTA.perGlobalPerHour) {
    return { allowed: false, reason: `global_req_cap (${QUOTA.perGlobalPerHour}/giờ)`, retry_after: 3600 };
  }
  if (globalU.tokens >= QUOTA.perGlobalTokensHour) {
    return { allowed: false, reason: `global_token_cap (${QUOTA.perGlobalTokensHour}/giờ)`, retry_after: 3600 };
  }
  return { allowed: true };
}

// ─────────────── Express middleware ───────────────
// Dùng trước handler AI: chặn 429 nếu vượt quota, log lý do.
// Yêu cầu attachUser middleware đã chạy trước → req.user có id + plan.
export function aiQuotaGate(endpoint) {
  return async (req, res, next) => {
    const user_id   = req.user?.id || null;
    const user_role = req.user?.role || 'guest';
    // Trục 4: nếu HS → check PH có gói cao hơn không, dùng plan tốt hơn.
    let userPlanEff = req.user ? effectivePlan(req.user) : null;
    if (req.user && user_role === 'pupil') {
      const parent = await getBestParentPlanForChild(req.user.id);
      if (parent) {
        userPlanEff = effectivePlanWithFamily(req.user,
          { plan: parent.parent_plan, plan_expires_at: parent.parent_plan_expires_at });
      }
    }
    const user_plan = userPlanEff?.id || 'guest';

    // Trục 2: pupil safety — check content TRƯỚC quota để (a) chặn nội dung độc dù
    // chưa hết quota, (b) ghi log riêng vào ai_prompt_log để GV/PH xem được.
    // SV/GV: chỉ log khi blocked → đỡ bloat DB.
    const promptText = extractPromptText(req.body);
    if (user_role === 'pupil' && promptText) {
      const verdict = checkContentSafety(promptText);
      await logPromptForUser({
        user_id, role: user_role, endpoint,
        prompt_text: promptText,
        blocked: !verdict.safe, block_reason: verdict.reason, block_category: verdict.category,
      });
      if (!verdict.safe) {
        // Cũng ghi vào ai_token_usage để rate-limit dashboard thấy
        await logAiUsage({ user_id, provider: 'safety-gate', model: '-', endpoint, status: 'blocked' });
        return res.status(400).json({
          error: 'content_unsafe',
          reason: verdict.reason,
          category: verdict.category,
          message: verdict.category === 'self_harm'
            ? 'Mình thấy bạn không ổn. Hãy gọi 1800 599920 (miễn phí, 24/7) hoặc nói với người lớn ngay nhé.'
            : 'Câu hỏi này có nội dung không phù hợp với lớp học. Thầy/cô đã nhận được thông báo.',
        });
      }
    }

    const verdict = await checkAiQuota({ user_id, user_plan, user_role });
    if (!verdict.allowed) {
      await logAiUsage({
        user_id,
        provider: 'quota-gate', model: '-', endpoint,
        status: 'blocked',
      });
      res.set('Retry-After', String(verdict.retry_after || 60));
      return res.status(429).json({
        error: 'AI quota exceeded',
        reason: verdict.reason,
        retry_after_seconds: verdict.retry_after,
        upgrade_url: verdict.upgrade_url || null,
        current_plan: user_plan,
      });
    }
    // Stash context cho recordAiCall sau khi handler xong.
    req._aiContext = { user_id, endpoint, started_at: Date.now(), role: user_role };
    next();
  };
}

// Gọi sau khi handler hoàn tất để log token thật. Nếu Ollama không trả token count,
// có thể truyền 0 — vẫn ghi request count để rate limit hoạt động.
export async function recordAiCall(req, { provider = 'ollama', model = '-', prompt_tokens = 0, completion_tokens = 0, status = 'ok' } = {}) {
  const ctx = req._aiContext;
  if (!ctx) return;  // không qua aiQuotaGate → silent skip
  await logAiUsage({
    user_id: ctx.user_id,
    provider, model, endpoint: ctx.endpoint,
    prompt_tokens, completion_tokens,
    duration_ms: Date.now() - ctx.started_at,
    status,
  });
}

// ─────────────── Stats cho dashboard ───────────────
const globalUsageRangeStmt = db.prepare(`
  SELECT
    COUNT(*)                                          AS requests,
    COALESCE(SUM(prompt_tokens + completion_tokens), 0) AS tokens,
    COALESCE(SUM(cost_usd_micros), 0)                 AS cost_micros,
    SUM(CASE WHEN status = 'blocked' THEN 1 ELSE 0 END) AS blocked,
    SUM(CASE WHEN status = 'error'   THEN 1 ELSE 0 END) AS errors
  FROM ai_token_usage
  WHERE created_at > ?
`);

export async function getGlobalUsage(sinceMs = 24 * HOUR_MS) {
  return await globalUsageRangeStmt.get(Date.now() - sinceMs);
}
export function getQuotaConfig() {
  return { ...QUOTA, pupilDayCap: PUPIL_DAY_CAP, teacherMultiplier: TEACHER_MULTIPLIER };
}

// ─────────────── Prompt log (Trục 2) ───────────────
const insertPromptLogStmt = db.prepare(`
  INSERT INTO ai_prompt_log (user_id, role, endpoint, prompt_text,
                             blocked, block_reason, block_category, created_at)
  VALUES (@user_id, @role, @endpoint, @prompt_text,
          @blocked, @block_reason, @block_category, @created_at)
`);

export async function logPromptForUser({ user_id, role, endpoint, prompt_text,
                                   blocked = false, block_reason = null, block_category = null }) {
  await insertPromptLogStmt.run({
    user_id: user_id ? Number(user_id) : null,
    role: role ? String(role).slice(0, 20) : null,
    endpoint: String(endpoint || ''),
    prompt_text: String(prompt_text || '').slice(0, 500),
    blocked: blocked ? 1 : 0,
    block_reason: block_reason ? String(block_reason).slice(0, 200) : null,
    block_category: block_category ? String(block_category).slice(0, 30) : null,
    created_at: Date.now(),
  });
}

// Liệt kê prompt log toàn hệ thống — dùng cho dashboard admin.
// Mặc định 50 dòng mới nhất; có thể filter blocked=1 để xem riêng case bị chặn.
const listPromptsStmt = db.prepare(`
  SELECT l.id, l.user_id, l.role, l.endpoint, l.prompt_text,
         l.blocked, l.block_reason, l.block_category, l.created_at,
         u.username, u.display_name, u.grade
  FROM ai_prompt_log l LEFT JOIN users u ON u.id = l.user_id
  WHERE (@blocked_only = 0 OR l.blocked = 1)
  ORDER BY l.created_at DESC LIMIT @limit
`);
export async function listAiPrompts({ blockedOnly = false, limit = 50 } = {}) {
  return await listPromptsStmt.all({
    blocked_only: blockedOnly ? 1 : 0,
    limit: Math.min(Math.max(Number(limit) || 50, 1), 500),
  });
}

const listPromptsByUserStmt = db.prepare(`
  SELECT id, endpoint, prompt_text, blocked, block_reason, block_category, created_at
  FROM ai_prompt_log WHERE user_id = ? ORDER BY created_at DESC LIMIT ?
`);
export async function listAiPromptsForUser(user_id, limit = 50) {
  return await listPromptsByUserStmt.all(Number(user_id), Math.min(Math.max(Number(limit) || 50, 1), 500));
}
