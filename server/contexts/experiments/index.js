// ============================================================
// A/B Experiments + Feature Flags — server-side
// ============================================================
// Mô hình đơn giản, không phụ thuộc Posthog/Optimizely:
// - features: bật/tắt theo flag (admin chỉnh)
// - experiments: chia variant ổn định theo hash(user_id, exp_key)
// - exposures: log mỗi lần user thấy variant (tỉ lệ exposure, lift)
// ============================================================

import { db } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

// Seed events catalog
async function seedEvents() {
  const cnt = (await db.prepare(`SELECT COUNT(*) AS n FROM event_registry`).get()).n;
  if (cnt > 0) return;
  const events = [
    { name:'engagement.streak_keep', desc:'User vào app giữ streak hôm nay' },
    { name:'engagement.quest_claim', desc:'User claim 1 daily quest' },
    { name:'engagement.heart_spend', desc:'User mất 1 heart' },
    { name:'league.tier_promote',    desc:'User lên tier khi cuối tuần' },
    { name:'league.tier_relegate',   desc:'User xuống tier khi cuối tuần' },
    { name:'pet.evolve',             desc:'Pet tiến hoá lên stage cao hơn' },
    { name:'pet.feed',               desc:'User cho pet ăn' },
    { name:'combat.win',             desc:'User hạ boss trong combat-by-quiz' },
    { name:'combat.lose',            desc:'User thua boss' },
    { name:'code.level_complete',    desc:'User hoàn thành 1 level code-trong-game' },
    { name:'ugc.quest_create',       desc:'User tạo UGC quest' },
    { name:'ugc.quest_play',         desc:'User chơi 1 UGC quest' },
    { name:'shop.item_buy',          desc:'User mua skin/avatar item' },
    { name:'bp.tier_claim',          desc:'User nhận reward 1 BP tier' },
    { name:'bp.premium_buy',         desc:'User mở BP Premium' },
    { name:'daily.bonus_claim',      desc:'User nhận daily login bonus' },
    { name:'ai.tutor_message',       desc:'User gửi tin cho AI tutor' },
    { name:'ai.socratic_toggle',     desc:'User bật/tắt Socratic mode' },
    { name:'onboarding.complete',    desc:'User hoàn thành onboarding 60s' },
    { name:'onboarding.skip',        desc:'User skip onboarding' },
    { name:'multiplayer.room_join',  desc:'User join campus room' },
    { name:'multiplayer.chat_send',  desc:'User gửi chat trong campus' },
    { name:'parent.report_view',     desc:'Parent xem báo cáo tuần con' },
    { name:'school.create',          desc:'Admin tạo 1 trường mới' },
    { name:'teacher.team_quest_create', desc:'GV mở team quest tuần' },
    { name:'teacher.team_quest_complete',desc:'Cả lớp đạt target team quest' },
  ];
  const ins = db.prepare(`INSERT INTO event_registry (name, description, added_at) VALUES (?, ?, ?)`);
  const tx = db.transaction(async () => {
    const now = Date.now();
    for (const e of events) await ins.run(e.name, e.desc, now);
  });
  await tx();
  console.log(`[experiments] seeded ${events.length} event registry entries`);
}

// Seed default experiments
async function seedExperiments() {
  const cnt = (await db.prepare(`SELECT COUNT(*) AS n FROM experiments`).get()).n;
  if (cnt > 0) return;
  const exps = [
    {
      key: 'socratic-default-mode',
      variants: JSON.stringify([{ name:'direct', weight:50 }, { name:'socratic', weight:50 }]),
      desc: 'A/B: mặc định mode AI tutor — Direct vs Socratic. Đo retention 7 ngày.',
    },
    {
      key: 'pet-evolve-celebration',
      variants: JSON.stringify([{ name:'subtle', weight:50 }, { name:'fullscreen', weight:50 }]),
      desc: 'A/B: ăn mừng pet evolve nhỏ hay full-screen confetti.',
    },
    {
      key: 'daily-login-position',
      variants: JSON.stringify([{ name:'center', weight:50 }, { name:'bottom', weight:50 }]),
      desc: 'A/B: vị trí daily login popup.',
    },
  ];
  const ins = db.prepare(`INSERT INTO experiments (key, variants, description, started_at) VALUES (?, ?, ?, ?)`);
  const tx = db.transaction(async () => {
    const now = Date.now();
    for (const e of exps) await ins.run(e.key, e.variants, e.desc, now);
  });
  await tx();
  console.log(`[experiments] seeded ${exps.length} default experiments`);
}

// Seed lúc import → chuyển thành init async (wiring ở index.js).
export async function initExperiments() {
  await seedEvents();
  await seedExperiments();
}

// FNV-1a hash để chọn variant ổn định per (user, exp_key)
function hash(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function assignVariant(userId, expKey, variants) {
  const h = hash(`${userId}:${expKey}`);
  const r = (h % 10000) / 100;   // 0-100 float
  let acc = 0;
  for (const v of variants) {
    acc += v.weight;
    if (r < acc) return v.name;
  }
  return variants[variants.length - 1]?.name || 'control';
}

const _getFlagStmt = db.prepare(`SELECT * FROM feature_flags WHERE key = ?`);
const _getExpStmt = db.prepare(`SELECT * FROM experiments WHERE key = ? AND status = 'running'`);
const _getExposureStmt = db.prepare(`SELECT * FROM exposures WHERE user_id = ? AND exp_key = ?`);
const _upsertExposureStmt = db.prepare(`
  INSERT INTO exposures (user_id, exp_key, variant, first_seen_at, seen_count)
  VALUES (?, ?, ?, ?, 1)
  ON CONFLICT(user_id, exp_key) DO UPDATE SET seen_count = seen_count + 1
`);

export async function checkFlag(userId, key) {
  const f = await _getFlagStmt.get(key);
  if (!f || !f.enabled) return false;
  if (f.rollout_pct >= 100) return true;
  const h = hash(`flag:${userId}:${key}`);
  const r = (h % 10000) / 100;
  return r < f.rollout_pct;
}

export async function getVariant(userId, expKey) {
  const exp = await _getExpStmt.get(expKey);
  if (!exp) return null;
  // Đã có exposure? Trả về variant cũ (sticky)
  const existing = await _getExposureStmt.get(userId, expKey);
  if (existing) {
    await _upsertExposureStmt.run(userId, expKey, existing.variant, existing.first_seen_at);
    return existing.variant;
  }
  // Mới — assign + log
  let variants = [];
  try { variants = JSON.parse(exp.variants); } catch {}
  const variant = assignVariant(userId, expKey, variants);
  await _upsertExposureStmt.run(userId, expKey, variant, Date.now());
  return variant;
}

export function attachExperiments(router) {
  // List features + experiments (client side để FE biết gọi getVariant)
  router.get('/api/experiments/me', requireAuth, async (req, res) => {
    const flags = await db.prepare(`SELECT key FROM feature_flags`).all();
    const exps = await db.prepare(`SELECT key FROM experiments WHERE status = 'running'`).all();
    const flagMap = {};
    for (const f of flags) flagMap[f.key] = await checkFlag(req.user.id, f.key);
    const expMap = {};
    for (const e of exps) expMap[e.key] = await getVariant(req.user.id, e.key);
    res.json({ flags: flagMap, experiments: expMap });
  });

  // Admin: list + edit flags
  router.get('/api/admin/flags', requireAuth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'admin_only' });
    res.json({ flags: await db.prepare(`SELECT * FROM feature_flags ORDER BY key`).all() });
  });
  router.post('/api/admin/flags/:key', requireAuth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'admin_only' });
    const key = String(req.params.key).slice(0, 60);
    const enabled = req.body?.enabled ? 1 : 0;
    const rollout = Math.max(0, Math.min(100, Number(req.body?.rollout_pct) ?? 100));
    const desc = String(req.body?.description || '').slice(0, 200);
    await db.prepare(`
      INSERT INTO feature_flags (key, enabled, rollout_pct, description, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        enabled = excluded.enabled,
        rollout_pct = excluded.rollout_pct,
        description = excluded.description,
        updated_at = excluded.updated_at
    `).run(key, enabled, rollout, desc, Date.now());
    res.json({ ok: true });
  });

  // Admin: list experiments + exposure stats
  router.get('/api/admin/experiments', requireAuth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'admin_only' });
    const rows = await db.prepare(`SELECT * FROM experiments`).all();
    const exps = [];
    for (const e of rows) {
      const split = await db.prepare(`
        SELECT variant, COUNT(*) AS n FROM exposures WHERE exp_key = ? GROUP BY variant
      `).all(e.key);
      exps.push({ ...e, exposure_split: split });
    }
    res.json({ experiments: exps });
  });

  // Event registry (admin xem catalog)
  router.get('/api/admin/events/registry', requireAuth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'admin_only' });
    res.json({ events: await db.prepare(`SELECT * FROM event_registry WHERE deprecated = 0 ORDER BY name`).all() });
  });
}
