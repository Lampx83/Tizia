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
import { requireAuth } from '../identity/auth.js';

// ─── Battle Pass ─────────────────────────────────────────────
const SEASON_DAYS = 60;
const XP_PER_TIER = 500;
const TIERS = 30;
const PREMIUM_COST_COIN = 5000;

db.exec(`
  CREATE TABLE IF NOT EXISTS bp_seasons (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    code            TEXT NOT NULL UNIQUE,         -- 'S1-2026', 'S2-2026'
    name            TEXT NOT NULL,
    theme           TEXT,
    started_at      INTEGER NOT NULL,
    ends_at         INTEGER NOT NULL,
    is_active       INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS bp_progress (
    user_id         INTEGER NOT NULL,
    season_id       INTEGER NOT NULL,
    season_xp       INTEGER NOT NULL DEFAULT 0,
    has_premium     INTEGER NOT NULL DEFAULT 0,
    claimed_free    TEXT NOT NULL DEFAULT '[]',   -- JSON array tier indexes
    claimed_premium TEXT NOT NULL DEFAULT '[]',
    updated_at      INTEGER NOT NULL,
    PRIMARY KEY (user_id, season_id),
    FOREIGN KEY (user_id)   REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (season_id) REFERENCES bp_seasons(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS shop_items (
    id              TEXT PRIMARY KEY,             -- 'skin-rong-vang', ...
    type            TEXT NOT NULL,                -- pet-skin | avatar-frame | emoji-pack | title
    name            TEXT NOT NULL,
    description     TEXT,
    price_coin      INTEGER NOT NULL,
    icon            TEXT,                          -- emoji preview
    payload         TEXT,                          -- JSON metadata
    rarity          TEXT NOT NULL DEFAULT 'common', -- common | rare | epic | legendary
    available       INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS user_inventory (
    user_id         INTEGER NOT NULL,
    item_id         TEXT NOT NULL,
    acquired_at     INTEGER NOT NULL,
    equipped        INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, item_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES shop_items(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS daily_login (
    user_id         INTEGER PRIMARY KEY,
    streak          INTEGER NOT NULL DEFAULT 0,    -- 0..6 (vòng 7 ngày)
    last_date       TEXT NOT NULL DEFAULT '',
    total_claims    INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// Seed default season + shop items nếu trống
function maybeSeedSeason() {
  const cnt = db.prepare(`SELECT COUNT(*) AS n FROM bp_seasons WHERE is_active = 1`).get().n;
  if (cnt > 0) return;
  const now = Date.now();
  db.prepare(`INSERT INTO bp_seasons (code, name, theme, started_at, ends_at, is_active)
              VALUES (?, ?, ?, ?, ?, 1)`)
    .run('S1-2026', 'Mùa 1: Tinh Vân Tri Thức', 'cosmic', now, now + SEASON_DAYS * 86400_000);
  console.log('[economy] seeded BP Season 1');
}
maybeSeedSeason();

function maybeSeedShop() {
  const cnt = db.prepare(`SELECT COUNT(*) AS n FROM shop_items`).get().n;
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
  const tx = db.transaction(() => {
    for (const it of items) ins.run(it.id, it.type, it.name, it.desc, it.price, it.icon, it.rarity);
  });
  tx();
  console.log(`[economy] seeded ${items.length} shop items`);
}
maybeSeedShop();

// ─── Helpers ────────────────────────────────────────────────
function getCurrentSeason() {
  return db.prepare(`SELECT * FROM bp_seasons WHERE is_active = 1 ORDER BY id DESC LIMIT 1`).get();
}

function ensureBpProgress(userId, seasonId) {
  let row = db.prepare(`SELECT * FROM bp_progress WHERE user_id = ? AND season_id = ?`).get(userId, seasonId);
  if (!row) {
    db.prepare(`INSERT INTO bp_progress (user_id, season_id, updated_at) VALUES (?, ?, ?)`)
      .run(userId, seasonId, Date.now());
    row = db.prepare(`SELECT * FROM bp_progress WHERE user_id = ? AND season_id = ?`).get(userId, seasonId);
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
export function addBpXp(userId, xp) {
  if (!userId || !Number.isFinite(xp) || xp <= 0) return null;
  const season = getCurrentSeason();
  if (!season) return null;
  const row = ensureBpProgress(userId, season.id);
  const newXp = row.season_xp + Math.floor(xp);
  db.prepare(`UPDATE bp_progress SET season_xp = ?, updated_at = ? WHERE user_id = ? AND season_id = ?`)
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

function getDailyState(userId) {
  let row = db.prepare(`SELECT * FROM daily_login WHERE user_id = ?`).get(userId);
  if (!row) {
    db.prepare(`INSERT INTO daily_login (user_id, streak, last_date, total_claims) VALUES (?, 0, '', 0)`).run(userId);
    row = db.prepare(`SELECT * FROM daily_login WHERE user_id = ?`).get(userId);
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

function claimDaily(userId) {
  const state = getDailyState(userId);
  if (!state.can_claim) return { ok: false, error: 'already_claimed_today' };
  const reward = state.next_reward;
  const w = getUserWallet(userId) || { coins: 0, xp: 0 };
  upsertUserWallet(userId, {
    coins: (w.coins || 0) + reward.coin,
    xp:    (w.xp    || 0) + reward.xp,
  }, { monotonic: false });
  // Bonus item
  if (reward.bonus) {
    db.prepare(`INSERT OR IGNORE INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
      .run(userId, reward.bonus, Date.now());
  }
  db.prepare(`UPDATE daily_login SET streak = ?, last_date = ?, total_claims = total_claims + 1 WHERE user_id = ?`)
    .run(state.next_streak, state.today, userId);
  return { ok: true, reward, new_streak: state.next_streak };
}

// ─── Shop ───────────────────────────────────────────────────
function listShop() {
  return db.prepare(`SELECT * FROM shop_items WHERE available = 1 ORDER BY type, price_coin`).all();
}

function userInventory(userId) {
  return db.prepare(`
    SELECT i.*, s.name, s.type, s.icon, s.description, s.rarity
      FROM user_inventory i
      JOIN shop_items s ON s.id = i.item_id
     WHERE i.user_id = ?
     ORDER BY i.equipped DESC, i.acquired_at DESC
  `).all(userId);
}

function buyItem(userId, itemId) {
  const item = db.prepare(`SELECT * FROM shop_items WHERE id = ? AND available = 1`).get(itemId);
  if (!item) return { ok: false, error: 'not_found' };
  const owned = db.prepare(`SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?`).get(userId, itemId);
  if (owned) return { ok: false, error: 'already_owned' };
  const w = getUserWallet(userId) || { coins: 0 };
  if ((w.coins || 0) < item.price_coin) {
    return { ok: false, error: 'no_coins', need: item.price_coin, have: w.coins || 0 };
  }
  upsertUserWallet(userId, { coins: (w.coins || 0) - item.price_coin }, { monotonic: false });
  db.prepare(`INSERT INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
    .run(userId, itemId, Date.now());
  return { ok: true, item };
}

function equipItem(userId, itemId) {
  const item = db.prepare(`SELECT * FROM shop_items WHERE id = ?`).get(itemId);
  if (!item) return { ok: false, error: 'not_found' };
  const owned = db.prepare(`SELECT 1 FROM user_inventory WHERE user_id = ? AND item_id = ?`).get(userId, itemId);
  if (!owned) return { ok: false, error: 'not_owned' };
  // Unequip same-type items, equip this
  const tx = db.transaction(() => {
    db.prepare(`UPDATE user_inventory SET equipped = 0 WHERE user_id = ?
                 AND item_id IN (SELECT id FROM shop_items WHERE type = ?)`).run(userId, item.type);
    db.prepare(`UPDATE user_inventory SET equipped = 1 WHERE user_id = ? AND item_id = ?`).run(userId, itemId);
  });
  tx();
  return { ok: true };
}

// ─── Routes ──────────────────────────────────────────────────
export function attachEconomy(router) {
  // BP overview
  router.get('/api/bp/me', requireAuth, (req, res) => {
    const season = getCurrentSeason();
    if (!season) return res.json({ ok: false, error: 'no_active_season' });
    const row = ensureBpProgress(req.user.id, season.id);
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

  router.post('/api/bp/claim', requireAuth, (req, res) => {
    const tier = Number(req.body?.tier);
    const track = String(req.body?.track || 'free');
    if (!Number.isInteger(tier) || tier < 1 || tier > TIERS) {
      return res.status(400).json({ error: 'bad_tier' });
    }
    const season = getCurrentSeason();
    if (!season) return res.status(400).json({ error: 'no_season' });
    const row = ensureBpProgress(req.user.id, season.id);
    const currentTier = Math.floor(row.season_xp / XP_PER_TIER);
    if (tier > currentTier) return res.status(400).json({ error: 'tier_not_unlocked' });
    if (track === 'premium' && !row.has_premium) return res.status(402).json({ error: 'premium_required' });
    const key = track === 'premium' ? 'claimed_premium' : 'claimed_free';
    const claimed = JSON.parse(row[key] || '[]');
    if (claimed.includes(tier - 1)) return res.status(400).json({ error: 'already_claimed' });
    const r = tierRewards(tier - 1)[track];
    // Apply reward
    const w = getUserWallet(req.user.id) || { coins:0, xp:0 };
    upsertUserWallet(req.user.id, {
      coins: (w.coins || 0) + (r.coin || 0),
      xp:    (w.xp    || 0) + (r.xp   || 0),
    }, { monotonic: false });
    if (r.item) {
      db.prepare(`INSERT OR IGNORE INTO user_inventory (user_id, item_id, acquired_at) VALUES (?, ?, ?)`)
        .run(req.user.id, r.item, Date.now());
    }
    claimed.push(tier - 1);
    db.prepare(`UPDATE bp_progress SET ${key} = ?, updated_at = ? WHERE user_id = ? AND season_id = ?`)
      .run(JSON.stringify(claimed), Date.now(), req.user.id, season.id);
    res.json({ ok: true, reward: r });
  });

  router.post('/api/bp/buy-premium', requireAuth, (req, res) => {
    const season = getCurrentSeason();
    if (!season) return res.status(400).json({ error: 'no_season' });
    const row = ensureBpProgress(req.user.id, season.id);
    if (row.has_premium) return res.status(400).json({ error: 'already_premium' });
    const w = getUserWallet(req.user.id) || { coins: 0 };
    if ((w.coins || 0) < PREMIUM_COST_COIN) {
      return res.status(400).json({ error: 'no_coins', need: PREMIUM_COST_COIN, have: w.coins || 0 });
    }
    upsertUserWallet(req.user.id, { coins: (w.coins || 0) - PREMIUM_COST_COIN }, { monotonic: false });
    db.prepare(`UPDATE bp_progress SET has_premium = 1, updated_at = ? WHERE user_id = ? AND season_id = ?`)
      .run(Date.now(), req.user.id, season.id);
    res.json({ ok: true });
  });

  // Shop
  router.get('/api/shop/items', (_req, res) => {
    res.json({ items: listShop() });
  });
  router.get('/api/shop/me', requireAuth, (req, res) => {
    res.json({ inventory: userInventory(req.user.id) });
  });
  router.post('/api/shop/buy', requireAuth, (req, res) => {
    const result = buyItem(req.user.id, String(req.body?.item_id || ''));
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });
  router.post('/api/shop/equip', requireAuth, (req, res) => {
    const result = equipItem(req.user.id, String(req.body?.item_id || ''));
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });

  // Daily Login
  router.get('/api/daily/me', requireAuth, (req, res) => {
    res.json({ ok: true, ...getDailyState(req.user.id) });
  });
  router.post('/api/daily/claim', requireAuth, (req, res) => {
    const result = claimDaily(req.user.id);
    if (!result.ok) return res.status(400).json(result);
    res.json(result);
  });
}

export const plugin = {
  name: 'economy',
  mount(router) {
    attachEconomy(router);
  },
};
