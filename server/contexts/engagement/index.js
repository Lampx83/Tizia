// ============================================================
// Engagement context — Streak · Hearts · Daily Quests · League
// ============================================================
// Mục tiêu: vòng "kéo HS quay lại mỗi ngày" theo Duolingo/Prodigy.
// Self-contained schema (không động vào user_wallets per-domain) để engagement
// xuyên trường: 1 tài khoản = 1 streak/hearts toàn cục, không tuột khi đổi
// trường. Tích hợp ngược với wallet qua reward (coin/XP) khi claim quest.
// ============================================================

import { db, upsertUserWallet, getUserWallet } from '../../db.js';
import { requireAuth, isStreakEnabledForDomain } from '../identity/auth.js';
import { attachLeague, addLeagueWeekXp, initLeague } from './league.js';
import { attachParentDashboard } from './parent.js';
import { attachPet, addPetXp } from './pet.js';
// Battle Pass XP — added per engagement claim (cộng song song league XP)
function bpHook(uid, xp) {
  try { import('../economy/index.js').then(m => m.addBpXp(uid, xp)); } catch {}
}

// ── Hằng số cấu hình ─────────────────────────────────────────
const HEART_MAX = 5;
const HEART_REFILL_MS = 30 * 60 * 1000;          // 1 heart / 30 phút
const TZ_OFFSET_MIN = 7 * 60;                    // Asia/Ho_Chi_Minh (UTC+7)
const QUEST_COIN = { lesson: 30, quiz: 25, minigame: 20, code: 40 };
const QUEST_XP   = { lesson: 50, quiz: 40, minigame: 30, code: 80 };

const QUEST_POOL = [
  { kind: 'lesson',   target: 1,  label: 'Học xong 1 bài lý thuyết hôm nay' },
  { kind: 'lesson',   target: 2,  label: 'Học xong 2 bài lý thuyết' },
  { kind: 'quiz',     target: 5,  label: 'Trả lời đúng 5 câu trắc nghiệm' },
  { kind: 'quiz',     target: 10, label: 'Trả lời đúng 10 câu trắc nghiệm' },
  { kind: 'minigame', target: 1,  label: 'Chơi 1 mini-game' },
  { kind: 'minigame', target: 3,  label: 'Hoàn thành 3 lượt mini-game' },
  { kind: 'code',     target: 1,  label: 'Nộp 1 bài lập trình' },
];

// ── Helpers ─────────────────────────────────────────────────
function vnToday() {
  const now = new Date(Date.now() + TZ_OFFSET_MIN * 60_000);
  return now.toISOString().slice(0, 10);
}
function vnDateOffset(date, deltaDays) {
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}
// Deterministic seeded PRNG (mulberry32) — quest list cố định per (user, date)
function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashSeed(userId, date) {
  // FNV-1a 32-bit qua chuỗi "userId|date"
  let h = 2166136261 >>> 0;
  const s = `${userId}|${date}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

// ── Statements ──────────────────────────────────────────────
const getStateStmt = db.prepare(`SELECT * FROM engagement_state WHERE user_id = ?`);
const upsertStateStmt = db.prepare(`
  INSERT INTO engagement_state
    (user_id, streak, longest_streak, last_active_date, hearts, hearts_refill_at, updated_at)
  VALUES (@user_id, @streak, @longest_streak, @last_active_date, @hearts, @hearts_refill_at, @updated_at)
  ON CONFLICT(user_id) DO UPDATE SET
    streak           = excluded.streak,
    longest_streak   = excluded.longest_streak,
    last_active_date = excluded.last_active_date,
    hearts           = excluded.hearts,
    hearts_refill_at = excluded.hearts_refill_at,
    updated_at       = excluded.updated_at
`);
const listQuestsStmt = db.prepare(
  `SELECT * FROM engagement_daily_quests WHERE user_id = ? AND quest_date = ? ORDER BY slot ASC`
);
const upsertQuestStmt = db.prepare(`
  INSERT INTO engagement_daily_quests
    (user_id, quest_date, slot, kind, target, progress, claimed, reward_coin, reward_xp, label)
  VALUES (@user_id, @quest_date, @slot, @kind, @target, @progress, @claimed, @reward_coin, @reward_xp, @label)
  ON CONFLICT(user_id, quest_date, slot) DO UPDATE SET
    progress    = excluded.progress,
    claimed     = excluded.claimed
`);
const bumpQuestProgressStmt = db.prepare(`
  UPDATE engagement_daily_quests
     SET progress = MIN(target, progress + ?)
   WHERE user_id = ? AND quest_date = ? AND kind = ? AND claimed = 0
`);

// ── Core API ────────────────────────────────────────────────
async function ensureState(userId) {
  let row = await getStateStmt.get(userId);
  if (!row) {
    row = {
      user_id: userId,
      streak: 0,
      longest_streak: 0,
      last_active_date: '',
      hearts: HEART_MAX,
      hearts_refill_at: 0,
      updated_at: Date.now(),
    };
    await upsertStateStmt.run(row);
  }
  return row;
}

function refillHearts(row) {
  const now = Date.now();
  if (row.hearts >= HEART_MAX) {
    row.hearts_refill_at = 0;
    return row;
  }
  if (!row.hearts_refill_at) {
    row.hearts_refill_at = now + HEART_REFILL_MS;
    return row;
  }
  if (now >= row.hearts_refill_at) {
    const elapsed = now - row.hearts_refill_at;
    const gained = 1 + Math.floor(elapsed / HEART_REFILL_MS);
    row.hearts = Math.min(HEART_MAX, row.hearts + gained);
    row.hearts_refill_at = row.hearts >= HEART_MAX
      ? 0
      : now + HEART_REFILL_MS - (elapsed % HEART_REFILL_MS);
  }
  return row;
}

/**
 * Tính lại streak khi user vào app trong ngày.
 *   - Cùng ngày → no-op
 *   - Ngày liền kề → streak++
 *   - Cách ≥ 2 ngày → reset = 1
 * Idempotent: gọi nhiều lần cùng ngày không tăng.
 */
function bumpStreak(row) {
  const today = vnToday();
  if (row.last_active_date === today) return row;
  const yesterday = vnDateOffset(today, -1);
  row.streak = (row.last_active_date === yesterday) ? (row.streak + 1) : 1;
  row.longest_streak = Math.max(row.longest_streak, row.streak);
  row.last_active_date = today;
  return row;
}

async function genDailyQuests(userId, date) {
  const existing = await listQuestsStmt.all(userId, date);
  if (existing.length > 0) return existing;
  const rng = mulberry32(hashSeed(userId, date));
  // Lấy 3 quest distinct theo kind nếu được; fallback: cứ 3 cái khác slot.
  const shuffled = [...QUEST_POOL].sort(() => rng() - 0.5);
  const picked = [];
  const seenKinds = new Set();
  for (const q of shuffled) {
    if (seenKinds.has(q.kind)) continue;
    picked.push(q);
    seenKinds.add(q.kind);
    if (picked.length >= 3) break;
  }
  while (picked.length < 3) picked.push(shuffled[picked.length]);
  for (const [slot, q] of picked.entries()) {
    await upsertQuestStmt.run({
      user_id: userId, quest_date: date, slot,
      kind: q.kind, target: q.target, progress: 0, claimed: 0,
      reward_coin: QUEST_COIN[q.kind] || 20,
      reward_xp:   QUEST_XP[q.kind]   || 30,
      label: q.label,
    });
  }
  return await listQuestsStmt.all(userId, date);
}

// Lightweight snapshot CHỈ ĐỌC cho parent dashboard — không tự bump streak
// (tránh "parent xem → con coi như đã active hôm nay").
export async function getEngagementReadOnly(userId) {
  if (!userId) return null;
  let row = await getStateStmt.get(userId);
  if (!row) return null;
  // Refill hearts side-effect-free: tính ra giá trị hiển thị nhưng không persist.
  let hearts = row.hearts;
  if (hearts < HEART_MAX && row.hearts_refill_at && Date.now() >= row.hearts_refill_at) {
    const elapsed = Date.now() - row.hearts_refill_at;
    hearts = Math.min(HEART_MAX, hearts + 1 + Math.floor(elapsed / HEART_REFILL_MS));
  }
  const today = vnToday();
  const quests = await listQuestsStmt.all(userId, today);
  return {
    streak: row.streak,
    longestStreak: row.longest_streak,
    lastActiveDate: row.last_active_date,
    hearts, heartsMax: HEART_MAX,
    today,
    quests: quests.map(q => ({
      slot: q.slot, kind: q.kind, target: q.target, progress: q.progress,
      claimed: !!q.claimed, label: q.label,
    })),
    questsDone: quests.filter(q => q.claimed).length,
    questsTotal: quests.length || 3,
  };
}

// Trả ảnh chụp state đầy đủ cho FE (state + quests hôm nay). `enrolledDomain` để
// tính cờ streak_hidden — HUD ẩn streak nếu user học trường ngoài phổ thông.
async function snapshot(userId, enrolledDomain = '') {
  let row = await ensureState(userId);
  row = bumpStreak(row);
  row = refillHearts(row);
  row.updated_at = Date.now();
  await upsertStateStmt.run(row);
  const today = vnToday();
  const quests = await genDailyQuests(userId, today);
  return {
    // true → streak không áp cho trường của user (ĐH/nghề) → FE ẩn 🔥 + không thưởng.
    streak_hidden: !isStreakEnabledForDomain(enrolledDomain),
    streak: row.streak,
    longestStreak: row.longest_streak,
    lastActiveDate: row.last_active_date,
    hearts: row.hearts,
    heartsMax: HEART_MAX,
    heartsRefillAt: row.hearts_refill_at || null,
    heartsRefillMs: HEART_REFILL_MS,
    today,
    quests: quests.map(q => ({
      slot: q.slot, kind: q.kind, target: q.target, progress: q.progress,
      claimed: !!q.claimed, rewardCoin: q.reward_coin, rewardXp: q.reward_xp, label: q.label,
    })),
  };
}

// Tăng progress quest theo kind. Gọi từ chỗ khác (quiz attempt, lesson complete…).
// Không throw, không yêu cầu auth — caller chịu trách nhiệm userId hợp lệ.
export async function trackEngagementProgress(userId, kind, amount = 1) {
  if (!userId || !kind) return;
  const today = vnToday();
  await genDailyQuests(userId, today);
  await bumpQuestProgressStmt.run(amount | 0 || 1, userId, today, kind);
}

// Spend 1 heart. Trả false nếu hết.
async function spendHeart(userId) {
  let row = await ensureState(userId);
  row = refillHearts(row);
  if (row.hearts <= 0) {
    await upsertStateStmt.run({ ...row, updated_at: Date.now() });
    return { ok: false, hearts: 0, heartsRefillAt: row.hearts_refill_at };
  }
  row.hearts -= 1;
  if (!row.hearts_refill_at) row.hearts_refill_at = Date.now() + HEART_REFILL_MS;
  row.updated_at = Date.now();
  await upsertStateStmt.run(row);
  return { ok: true, hearts: row.hearts, heartsRefillAt: row.hearts_refill_at };
}

// Claim 1 quest đã đạt target → cộng coin/XP vào wallet (per-domain).
async function claimQuest(userId, slot, domain) {
  const today = vnToday();
  const all = await listQuestsStmt.all(userId, today);
  const q = all.find(x => x.slot === slot);
  if (!q) return { ok: false, reason: 'not_found' };
  if (q.claimed) return { ok: false, reason: 'already_claimed' };
  if (q.progress < q.target) return { ok: false, reason: 'not_completed', progress: q.progress, target: q.target };
  await upsertQuestStmt.run({ ...q, claimed: 1 });
  // Cộng reward vào wallet hiện hành (theo enrolled_domain nếu không truyền).
  const cur = await getUserWallet(userId, domain) || { coins: 0, xp: 0 };
  await upsertUserWallet(userId, {
    coins: (cur.coins || 0) + q.reward_coin,
    xp:    (cur.xp    || 0) + q.reward_xp,
  }, { monotonic: false, domain });
  // League: XP claim quest cũng đẩy vào bảng tuần.
  try { await addLeagueWeekXp(userId, q.reward_xp); } catch {}
  // Pet đồng hành: nuôi pet bằng XP nhiệm vụ (Prodigy-style).
  let petEvolution = null;
  try { petEvolution = await addPetXp(userId, Math.floor(q.reward_xp / 2)); } catch {}
  // Battle Pass season XP — engagement claim cũng cộng vào BP.
  bpHook(userId, q.reward_xp);
  return { ok: true, rewardCoin: q.reward_coin, rewardXp: q.reward_xp, petEvolution };
}

// Seed/cron init — gọi từ index.js sau khi schema sẵn sàng.
// Gồm league cron-lite (rotate season). Engagement state không cần seed.
export async function initEngagement() {
  await initLeague();
}

// ── Route binding ───────────────────────────────────────────
export function attachEngagement(app) {
  // Snapshot — gọi mỗi khi vào app/page chính. Idempotent.
  app.get('/api/engagement/state', requireAuth, async (req, res) => {
    try {
      const data = await snapshot(req.user.id, req.user.enrolled_domain);
      res.json({ ok: true, ...data });
    } catch (e) {
      console.error('[engagement] state error', e);
      res.status(500).json({ ok: false, error: 'internal' });
    }
  });

  // Alias rõ ràng cho FE để "đánh dấu hoạt động hôm nay" — cùng logic snapshot.
  app.post('/api/engagement/ping', requireAuth, async (req, res) => {
    try {
      const data = await snapshot(req.user.id, req.user.enrolled_domain);
      res.json({ ok: true, ...data });
    } catch (e) {
      console.error('[engagement] ping error', e);
      res.status(500).json({ ok: false, error: 'internal' });
    }
  });

  // Spend 1 heart. FE gọi khi HS sai quiz nặng (tuỳ chính sách từng feature).
  app.post('/api/engagement/spend-heart', requireAuth, async (req, res) => {
    const result = await spendHeart(req.user.id);
    res.json(result);
  });

  // Tăng progress quest (FE chỉ gọi cho mini-game/lesson đã có endpoint riêng,
  // còn quiz/code tự gọi từ server). Body: { kind: 'lesson'|'minigame', amount?: number }
  app.post('/api/engagement/track', requireAuth, async (req, res) => {
    const kind = String(req.body?.kind || '').toLowerCase();
    if (!['lesson', 'minigame', 'quiz', 'code'].includes(kind)) {
      return res.status(400).json({ ok: false, error: 'bad_kind' });
    }
    const amount = Math.max(1, Math.min(20, Number(req.body?.amount) | 0 || 1));
    await trackEngagementProgress(req.user.id, kind, amount);
    res.json({ ok: true });
  });

  // League routes (/api/league/me, /history, /tiers)
  attachLeague(app, requireAuth);
  // Parent Portal (/api/parent/dashboard)
  attachParentDashboard(app, requireAuth);
  // Pet đồng hành (/api/pet/me|switch|nickname|feed)
  attachPet(app);

  // Claim quest. Body: { slot: 0|1|2 }
  app.post('/api/engagement/claim', requireAuth, async (req, res) => {
    const slot = Number(req.body?.slot);
    if (![0, 1, 2].includes(slot)) return res.status(400).json({ ok: false, error: 'bad_slot' });
    const result = await claimQuest(req.user.id, slot, req.user.enrolled_domain || '');
    if (!result.ok) return res.status(400).json(result);
    // Sau khi claim, trả luôn snapshot để FE đỡ phải fetch lại.
    res.json({ ok: true, ...result, state: await snapshot(req.user.id, req.user.enrolled_domain) });
  });
}
