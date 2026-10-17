// ============================================================
// Economy — Battle Pass · Skin Shop · Daily Login (Trục A monetize)
// ============================================================
// Battle Pass: 60-day season, 30 tier. Mỗi tier có free reward + premium reward.
// Tier unlock theo total XP trong season (1 tier mỗi 500 XP). Premium unlock
// bằng "BP Premium pass" — bán bằng coin (5000) hoặc subscription.
//
// Skin Shop: catalog skin/avatar đổi bằng coin. Skin hiện trên pet hoặc HUD.
//
// Daily Login Bonus: chuỗi 7 ngày, ngày 7 = jackpot. Reset nếu bỏ lỡ ngày.
// ============================================================

import { db, getUserWallet, upsertUserWallet, getUserState, putUserState } from '../../db.js';
import { requireAuth, isStreakEnabledForDomain } from '../identity/auth.js';

// ─── Battle Pass ─────────────────────────────────────────────
const SEASON_DAYS = 60;
const XP_PER_TIER = 500;
const TIERS = 30;
const PREMIUM_COST_COIN = 5000;

// Seed default season + shop items nếu trống
async function maybeSeedSeason() {
  const cnt = (await db.prepare(`SELECT COUNT(*) AS n FROM bp_seasons WHERE is_active = 1`).get()).n;
  if (cnt > 0) return;
  const now = Date.now();
  await db.prepare(`INSERT INTO bp_seasons (code, name, theme, started_at, ends_at, is_active)
              VALUES (?, ?, ?, ?, ?, 1)`)
    .run('S1-2026', 'Mùa 1: Tinh Vân Tri Thức', 'cosmic', now, now + SEASON_DAYS * 86400_000);
  console.log('[economy] seeded BP Season 1');
}

async function maybeSeedShop() {
  const cnt = (await db.prepare(`SELECT COUNT(*) AS n FROM shop_items`).get()).n;
  if (cnt > 0) return;
  const items = [
    { id:'frame-vang',    type:'avatar-frame', name:'Khung Vàng',     desc:'Khung avatar vàng kim sang trọng',          price:300, icon:'🟡', rarity:'common' },
    { id:'frame-bac',     type:'avatar-frame', name:'Khung Bạc',      desc:'Khung avatar bạc tinh tế',                   price:200, icon:'⚪', rarity:'common' },
    { id:'frame-kc',      type:'avatar-frame', name:'Khung Kim cương',desc:'Chỉ dành cho tier Kim cương',                price:2000, icon:'💎', rarity:'legendary' },
    { id:'skin-rong-bang',type:'pet-skin',     name:'Rồng Băng',      desc:'Skin pet Rồng — phiên bản băng tuyết',        price:800, icon:'🐲❄', rarity:'epic' },
    { id:'skin-cu-vang',  type:'pet-skin',     name:'Cú Hoàng Kim',   desc:'Cú Anh phiên bản hoàng kim',                  price:600, icon:'🦉👑', rarity:'rare' },
    { id:'skin-meo-than', type:'pet-skin',     name:'Mèo Thần Bí',    desc:'Mèo Sử phiên bản huyền bí',                   price:700, icon:'🐱✨', rarity:'rare' },
    { id:'emoji-pack-1',  type:'emoji-pack',   name:'Emoji động vật', desc:'30 emoji thú cưng dùng trong chat',          price:150, icon:'🐶🐰', rarity:'common' },
    { id:'emoji-pack-2',  type:'emoji-pack',   name:'Emoji thực phẩm',desc:'30 emoji món ăn dùng trong chat',            price:150, icon:'🍕🍔', rarity:'common' },
    { id:'title-hoc-tho', type:'title',        name:'Danh hiệu "Học thủ"', desc:'Hiển thị dưới tên trong league',          price:400, icon:'🎓', rarity:'rare' },
    { id:'title-thu-linh',type:'title',        name:'Danh hiệu "Thủ lĩnh"', desc:'Dành cho GV đầu tàu',                    price:500, icon:'👑', rarity:'rare' },
    { id:'frame-mua-1',   type:'avatar-frame', name:'Khung mùa S1',   desc:'Limited mùa 1 — Tinh Vân Tri Thức',           price:1000, icon:'🌌', rarity:'epic' },
    { id:'skin-phuong-lua',type:'pet-skin',    name:'Phượng Lửa',     desc:'Phượng Văn phiên bản lửa',                     price:900, icon:'🦅🔥', rarity:'epic' },
  ];
  const ins = db.prepare(`INSERT INTO shop_items (id, type, name, description, price_coin, icon, rarity)
                          VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const tx = db.transaction(async () => {
    for (const it of items) await ins.run(it.id, it.type, it.name, it.desc, it.price, it.icon, it.rarity);
  });
  await tx();
  console.log(`[economy] seeded ${items.length} shop items`);
}

// Seed init (gọi từ index.js sau khi schema sẵn sàng)
export async function initEconomy() {
  await maybeSeedSeason();
  await maybeSeedShop();
}

// ─── Helpers ────────────────────────────────────────────────
async function getCurrentSeason() {
  return await db.prepare(`SELECT * FROM bp_seasons WHERE is_active = 1 ORDER BY id DESC LIMIT 1`).get();
}

async function ensureBpProgress(userId, seasonId) {
  let row = await db.prepare(`SELECT * FROM bp_progress WHERE user_id = ? AND season_id = ?`).get(userId, seasonId);
  if (!row) {
    await db.prepare(`INSERT INTO bp_progress (user_id, season_id, updated_at) VALUES (?, ?, ?)`)
      .run(userId, seasonId, Date.now());
    row = await db.prepare(`SELECT * FROM bp_progress WHERE user_id = ? AND season_id = ?`).get(userId, seasonId);
  }
  return row;
}

// Tier rewards spec (hardcoded for MVP — production: bảng riêng)
function tierRewards(tier) {
  const t = tier + 1;
  return {
    free: {
      coin: 20 * t,
      xp:    10 * t,
      item: (t % 5 === 0) ? 'frame-mua-1' : null,
    },
    premium: {
      coin: 50 * t,
      xp:    25 * t,
      item: (t === 5) ? 'emoji-pack-1' : (t === 10) ? 'skin-cu-vang' : (t === 20) ? 'skin-rong-bang' : (t === 30) ? 'frame-kc' : null,
    },
  };
}

/**
 * Cộng XP season cho user (hook khi grant XP từ engagement claim, codelab, …)
 */
export async function addBpXp(userId, xp) {
  if (!userId || !Number.isFinite(xp) || xp <= 0) return null;
  const season = await getCurrentSeason();
  if (!season) return null;
  const row = await ensureBpProgress(userId, season.id);
  const newXp = row.season_xp + Math.floor(xp);
  await db.prepare(`UPDATE bp_progress SET season_xp = ?, updated_at = ? WHERE user_id = ? AND season_id = ?`)
    .run(newXp, Date.now(), userId, season.id);
  return { season_xp: newXp, tier: Math.floor(newXp / XP_PER_TIER) };
}

// ─── Daily Login ────────────────────────────────────────────
function vnToday() {
  return new Date(Date.now() + 7 * 3600_000).toISOString().slice(0, 10);
}
function vnPrevDay(d) {
  const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() - 1);
  return t.toISOString().slice(0, 10);
}

const DAILY_REWARDS = [
  { day: 1, coin: 20,  xp: 10,  bonus: null },
  { day: 2, coin: 30,  xp: 15,  bonus: null },
  { day: 3, coin: 50,  xp: 25,  bonus: null },
  { day: 4, coin: 75,  xp: 35,  bonus: null },
  { day: 5, coin: 100, xp: 50,  bonus: 'emoji-pack-1' },
  { day: 6, coin: 150, xp: 75,  bonus: null },
  { day: 7, coin: 300, xp: 150, bonus: 'frame-vang', label: 'Jackpot tuần!' },
];

async function getDailyState(userId) {
  let row = await db.prepare(`SELECT * FROM daily_login WHERE user_id = ?`).get(userId);
  if (!row) {
    await db.prepare(`INSERT INTO daily_login (user_id, streak, last_date, total_claims) VALUES (?, 0, '', 0)`).run(userId);
    row = await db.prepare(`SELECT * FROM daily_login WHERE user_id = ?`).get(userId);
  }
  const today = vnToday();
  const canClaim = row.last_date !== today;
  let nextStreak = row.streak;
  if (canClaim) {
    if (row.last_date === vnPrevDay(today)) {
      nextStreak = (row.streak % 7) + 1;
    } else {
      nextStreak = 1;
    }
  }
  return {
    streak: row.streak,
    last_date: row.last_date,
    total_claims: row.total_claims,
    today,
    can_claim: canClaim,
    next_streak: canClaim ? nextStreak : row.streak,
    next_reward: canClaim ? DAILY_REWARDS[nextStreak - 1] : null,
    rewards: DAILY_REWARDS,
  };
}

async function claimDaily(userId) {
  const state = await getDailyState(userId);
  if (!state.can_claim) return { ok: false, error: 'already_claimed_today' };
  const reward = state.next_reward;
  const w = await getUserWallet(userId) || { coins: 0, xp: 0 };
  await upsertUserWallet(userId, {
    coins: (w.coins || 0) + reward.coin,
    xp:    (w.xp    || 0) + reward.xp,
  }, { monotonic: false });
  // Bonus item
  if (reward.bonus) {
    await db.prepare(`INSERT OR IGNORE INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
      .run(userId, reward.bonus, Date.now());
  }
  await db.prepare(`UPDATE daily_login SET streak = ?, last_date = ?, total_claims = total_claims + 1 WHERE user_id = ?`)
    .run(state.next_streak, state.today, userId);
  return { ok: true, reward, new_streak: state.next_streak };
}

// ─── Shop ───────────────────────────────────────────────────
async function listShop() {
  return await db.prepare(`SELECT * FROM shop_items WHERE available = 1 ORDER BY type, price_coin`).all();
}

async function userInventory(userId) {
  return await db.prepare(`
    SELECT i.*, s.name, s.type, s.icon, s.description, s.rarity
      FROM user_inventory i
      JOIN shop_items s ON s.id = i.item_id
     WHERE i.user_id = ?
     ORDER BY i.equipped DESC, i.acquired_at DESC
  `).all(userId);
}

async function buyItem(userId, itemId) {
  const item = await db.prepare(`SELECT * FROM shop_items WHERE id = ? AND available = 1`).get(itemId);
  if (!item) return { ok: false, error: 'not_found' };
  const owned = await db.prepare(`SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?`).get(userId, itemId);
  if (owned) return { ok: false, error: 'already_owned' };
  const w = await getUserWallet(userId) || { coins: 0 };
  if ((w.coins || 0) < item.price_coin) {
    return { ok: false, error: 'no_coins', need: item.price_coin, have: w.coins || 0 };
  }
  await upsertUserWallet(userId, { coins: (w.coins || 0) - item.price_coin }, { monotonic: false });
  await db.prepare(`INSERT INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
    .run(userId, itemId, Date.now());
  return { ok: true, item };
}

async function equipItem(userId, itemId) {
  const item = await db.prepare(`SELECT * FROM shop_items WHERE id = ?`).get(itemId);
  if (!item) return { ok: false, error: 'not_found' };
  const owned = await db.prepare(`SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?`).get(userId, itemId);
  if (!owned) return { ok: false, error: 'not_owned' };
  // Unequip same-type items, equip this
  const tx = db.transaction(async () => {
    await db.prepare(`UPDATE user_inventory SET equipped = 0 WHERE user_id = ?
                 AND item_id IN (SELECT id FROM shop_items WHERE type = ?)`).run(userId, item.type);
    await db.prepare(`UPDATE user_inventory SET equipped = 1 WHERE user_id = ? AND item_id = ?`).run(userId, itemId);
  });
  await tx();
  return { ok: true };
}

// ─── Routes ──────────────────────────────────────────────────
export function attachEconomy(router) {
  // BP overview
  router.get('/api/bp/me', requireAuth, async (req, res) => {
    const season = await getCurrentSeason();
    if (!season) return res.json({ ok: false, error: 'no_active_season' });
    const row = await ensureBpProgress(req.user.id, season.id);
    const tier = Math.min(TIERS, Math.floor(row.season_xp / XP_PER_TIER));
    const claimedFree    = JSON.parse(row.claimed_free    || '[]');
    const claimedPremium = JSON.parse(row.claimed_premium || '[]');
    const tierData = [];
    for (let t = 0; t < TIERS; t++) {
      const r = tierRewards(t);
      tierData.push({
        tier: t + 1, unlocked: t < tier,
        free: { ...r.free, claimed: claimedFree.includes(t) },
        premium: { ...r.premium, claimed: claimedPremium.includes(t) },
      });
    }
    res.json({
      ok: true,
      season: { code: season.code, name: season.name, theme: season.theme,
                ends_at: season.ends_at, days_left: Math.max(0, Math.ceil((season.ends_at - Date.now())/86400000)) },
      progress: {
        season_xp: row.season_xp, tier, max_tier: TIERS,
        xp_to_next: tier < TIERS ? (XP_PER_TIER - (row.season_xp % XP_PER_TIER)) : 0,
        has_premium: !!row.has_premium,
      },
      tiers: tierData,
    });
  });

  router.post('/api/bp/claim', requireAuth, async (req, res) => {
    const tier = Number(req.body?.tier);
    const track = String(req.body?.track || 'free');
    if (!Number.isInteger(tier) || tier < 1 || tier > TIERS) {
      return res.status(400).json({ error: 'bad_tier' });
    }
    const season = await getCurrentSeason();
    if (!season) return res.status(400).json({ error: 'no_season' });
    const row = await ensureBpProgress(req.user.id, season.id);
    const currentTier = Math.floor(row.season_xp / XP_PER_TIER);
    if (tier > currentTier) return res.status(400).json({ error: 'tier_not_unlocked' });
    if (track === 'premium' && !row.has_premium) return res.status(402).json({ error: 'premium_required' });
    const key = track === 'premium' ? 'claimed_premium' : 'claimed_free';
    const claimed = JSON.parse(row[key] || '[]');
    if (claimed.includes(tier - 1)) return res.status(400).json({ error: 'already_claimed' });
    const r = tierRewards(tier - 1)[track];
    // Apply reward
    const w = await getUserWallet(req.user.id) || { coins:0, xp:0 };
    await upsertUserWallet(req.user.id, {
      coins: (w.coins || 0) + (r.coin || 0),
      xp:    (w.xp    || 0) + (r.xp   || 0),
    }, { monotonic: false });
    if (r.item) {
      await db.prepare(`INSERT OR IGNORE INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
        .run(req.user.id, r.item, Date.now());
    }
    claimed.push(tier - 1);
    await db.prepare(`UPDATE bp_progress SET ${key} = ?, updated_at = ? WHERE user_id = ? AND season_id = ?`)
      .run(JSON.stringify(claimed), Date.now(), req.user.id, season.id);
    res.json({ ok: true, reward: r });
  });

  router.post('/api/bp/buy-premium', requireAuth, async (req, res) => {
    const season = await getCurrentSeason();
    if (!season) return res.status(400).json({ error: 'no_season' });
    const row = await ensureBpProgress(req.user.id, season.id);
    if (row.has_premium) return res.status(400).json({ error: 'already_premium' });
    const w = await getUserWallet(req.user.id) || { coins: 0 };
    if ((w.coins || 0) < PREMIUM_COST_COIN) {
      return res.status(400).json({ error: 'no_coins', need: PREMIUM_COST_COIN, have: w.coins || 0 });
    }
    await upsertUserWallet(req.user.id, { coins: (w.coins || 0) - PREMIUM_COST_COIN }, { monotonic: false });
    await db.prepare(`UPDATE bp_progress SET has_premium = 1, updated_at = ? WHERE user_id = ? AND season_id = ?`)
      .run(Date.now(), req.user.id, season.id);
    res.json({ ok: true });
  });

  // Shop
  router.get('/api/shop/items', async (_req, res) => {
    res.json({ items: await listShop() });
  });
  router.get('/api/shop/me', requireAuth, async (req, res) => {
    res.json({ inventory: await userInventory(req.user.id) });
  });
  router.post('/api/shop/buy', requireAuth, async (req, res) => {
    const result = await buyItem(req.user.id, String(req.body?.item_id || ''));
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });
  router.post('/api/shop/equip', requireAuth, async (req, res) => {
    const result = await equipItem(req.user.id, String(req.body?.item_id || ''));
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });

  // Daily Login
  router.get('/api/daily/me', requireAuth, async (req, res) => {
    // Thưởng đăng nhập streak CHỈ cho phổ thông. Trường ĐH/nghề → tắt (FE không
    // popup, và claim cũng chặn ở dưới).
    const st = await getDailyState(req.user.id);
    if (!isStreakEnabledForDomain(req.user.enrolled_domain)) { st.reward_off = true; st.can_claim = false; }
    res.json({ ok: true, ...st });
  });
  router.post('/api/daily/claim', requireAuth, async (req, res) => {
    if (!isStreakEnabledForDomain(req.user.enrolled_domain))
      return res.status(403).json({ ok: false, error: 'streak_reward_off' });
    const result = await claimDaily(req.user.id);
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });
}
