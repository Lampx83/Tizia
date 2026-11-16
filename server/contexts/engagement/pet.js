// ============================================================
// Pet đồng hành — Trục A engagement (Prodigy-style companion)
// ============================================================
// Mỗi user có 1 pet (chọn lúc onboarding), tích XP qua hoạt động học.
// 3 stage: baby → teen → adult; evolve khi đủ XP. Pet feed bằng coin để +XP.
//
// XP nguồn: claim quest, IRT theta tăng, đạt skill, codelab accepted… (hook
// caller). Pet xuất hiện trên home + campus (trang sau gọi /api/pet/me render).
// ============================================================

import { db, getUserWallet, upsertUserWallet, getUserState, putUserState } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

// Catalog 13 pet — PERSONALITY-based (không gắn môn để tránh học lệch).
// Mỗi pet là bạn đồng hành theo tính cách, hợp mọi cấp (mầm non → SV ĐH).
// Khớp với onboarding-60s.js (PETS array). LEGACY_MAP để migrate id cũ.
const PET_CATALOG = {
  // 6 pet cơ bản (khớp onboarding)
  'cao-lem':       { name: 'Cáo Lém',       personality: 'Nhanh trí · Ứng biến',     stages: ['🦊','🦊✨','🦊👑'], color: '#f97316' },
  'rua-ben':       { name: 'Rùa Bền',       personality: 'Kiên trì · Học đều',       stages: ['🐢','🐢💪','🐢👑'], color: '#10b981' },
  'cu-to-mo':      { name: 'Cú Tò Mò',      personality: 'Ham hỏi · Khám phá',       stages: ['🦉','🦉✨','🦉👑'], color: '#a78bfa' },
  'rong-dung':     { name: 'Rồng Dũng',     personality: 'Dám thử · Thử thách',      stages: ['🐲','🐉','🐉👑'],   color: '#3b82f6' },
  'meo-sang':      { name: 'Mèo Sáng',      personality: 'Sáng tạo · Tinh tế',       stages: ['🐱','🐱✨','🐱👑'], color: '#ec4899' },
  'ca-heo':        { name: 'Cá Heo',        personality: 'Đồng đội · Vui vẻ',        stages: ['🐬','🐬✨','🐬👑'], color: '#06b6d4' },
  // 7 pet mở rộng (đa dạng tính cách + cho SV ĐH)
  'gau-truc':      { name: 'Gấu Trúc',      personality: 'Bình tĩnh · Tập trung',    stages: ['🐼','🐼✨','🐼👑'], color: '#475569' },
  'ong-cham':      { name: 'Ong Chăm',      personality: 'Chăm chỉ · Có tổ chức',    stages: ['🐝','🐝✨','🐝👑'], color: '#fbbf24' },
  'chim-cc':       { name: 'Cánh Cụt Lạc',  personality: 'Lạc quan · Lan toả',       stages: ['🐧','🐧✨','🐧👑'], color: '#0ea5e9' },
  'ho-con':        { name: 'Hổ Con',        personality: 'Mạnh mẽ · Tự tin',         stages: ['🐯','🐯✨','🐯👑'], color: '#dc2626' },
  'soc-nho':       { name: 'Sóc Nhỏ',       personality: 'Nhanh nhẹn · Tích luỹ',    stages: ['🐿️','🐿️✨','🐿️👑'], color: '#92400e' },
  'robot-tri':     { name: 'Robot Trí',     personality: 'Logic · Phân tích (SV)',   stages: ['🤖','🤖✨','🤖👑'], color: '#64748b' },
  'kylan-tre':     { name: 'Kỳ Lân Trẻ',    personality: 'Mơ mộng · Cảm hứng',       stages: ['🦄','🦄✨','🦄👑'], color: '#d946ef' },
};

// Map legacy pet_id (đã lưu trong DB user_pet) → pet_id mới.
// Chạy lazy migration trong ensurePet() để mượt cho user cũ.
const LEGACY_PET_MAP = {
  'rong-toan':  'rong-dung',   // dragon → dragon
  'phuong-van': 'meo-sang',    // creative/elegant
  'cu-anh':     'cu-to-mo',    // owl → owl
  'hoa-ly':     'cao-lem',     // sciency-wit fox
  'meo-su':     'meo-sang',    // cat → cat
  'rua-ngam':   'rua-ben',     // turtle → turtle
};

const XP_PER_STAGE = [0, 200, 800];       // baby 0-199, teen 200-799, adult ≥800
const FEED_COST = 10;                      // coin / lần feed
const FEED_XP   = 25;                      // XP / lần feed
const FEED_COOLDOWN_MS = 4 * 60 * 60 * 1000;  // 4h giữa các lần feed (tránh spam coin)

const _getPetStmt = db.prepare(`SELECT * FROM user_pet WHERE user_id = ?`);
const _upsertPetStmt = db.prepare(`
  INSERT INTO user_pet (user_id, pet_id, nickname, stage, xp, last_fed_at, created_at, updated_at)
  VALUES (@user_id, @pet_id, @nickname, @stage, @xp, @last_fed_at, @created_at, @updated_at)
  ON CONFLICT(user_id) DO UPDATE SET
    pet_id      = excluded.pet_id,
    nickname    = excluded.nickname,
    stage       = excluded.stage,
    xp          = excluded.xp,
    last_fed_at = excluded.last_fed_at,
    updated_at  = excluded.updated_at
`);

function computeStage(xp) {
  if (xp >= XP_PER_STAGE[2]) return 2;
  if (xp >= XP_PER_STAGE[1]) return 1;
  return 0;
}

function normalizePetId(id) {
  if (!id) return null;
  if (PET_CATALOG[id]) return id;
  if (LEGACY_PET_MAP[id]) return LEGACY_PET_MAP[id];
  return null;
}

async function ensurePet(userId) {
  let row = await _getPetStmt.get(userId);
  if (row) {
    // Lazy migrate: nếu pet_id cũ (rong-toan…), tự đổi sang pet mới.
    const fixed = normalizePetId(row.pet_id);
    if (fixed && fixed !== row.pet_id) {
      await _upsertPetStmt.run({ ...row, pet_id: fixed, updated_at: Date.now() });
      row = await _getPetStmt.get(userId);
    } else if (!fixed) {
      // pet_id orphan (không tồn tại trong catalog mới lẫn legacy) → reset về default
      await _upsertPetStmt.run({ ...row, pet_id: 'cu-to-mo', updated_at: Date.now() });
      row = await _getPetStmt.get(userId);
    }
    return row;
  }
  // Auto-create từ pet đã chọn trong onboarding (lưu ở user_state)
  let petId = 'cu-to-mo';
  try {
    const state = await getUserState(userId);
    const fromOnb = state?.['engagement.pet']?.value?.id || state?.['engagement.pet']?.id;
    const normalized = normalizePetId(fromOnb);
    if (normalized) petId = normalized;
  } catch {}
  const now = Date.now();
  await _upsertPetStmt.run({
    user_id: userId, pet_id: petId, nickname: null,
    stage: 0, xp: 0, last_fed_at: 0, created_at: now, updated_at: now,
  });
  return await _getPetStmt.get(userId);
}

/**
 * Cộng XP cho pet (gọi từ claim quest, codelab accepted, …). Idempotent.
 * Trả new state nếu evolve.
 */
export async function addPetXp(userId, xp) {
  if (!userId || !Number.isFinite(xp) || xp <= 0) return null;
  const row = await ensurePet(userId);
  const newXp = row.xp + Math.floor(xp);
  const newStage = computeStage(newXp);
  const evolved = newStage > row.stage;
  await _upsertPetStmt.run({
    ...row, xp: newXp, stage: newStage, updated_at: Date.now(),
  });
  return { xp: newXp, stage: newStage, evolved };
}

function petPayload(row) {
  const cat = PET_CATALOG[row.pet_id] || PET_CATALOG['cu-to-mo'];
  const stage = row.stage;
  const stageXpStart = XP_PER_STAGE[stage];
  const stageXpEnd   = XP_PER_STAGE[stage + 1] || (stageXpStart + 800);
  const progress = stage >= 2
    ? 100
    : Math.round(((row.xp - stageXpStart) / (stageXpEnd - stageXpStart)) * 100);
  const now = Date.now();
  const feedReadyAt = row.last_fed_at + FEED_COOLDOWN_MS;
  return {
    pet_id: row.pet_id,
    name: row.nickname || cat.name,
    base_name: cat.name,
    personality: cat.personality,
    color: cat.color,
    stage,
    stage_label: ['Em bé', 'Tuổi teen', 'Trưởng thành'][stage] || 'Trưởng thành',
    sprite: cat.stages[stage] || cat.stages[0],
    xp: row.xp,
    stage_xp_start: stageXpStart,
    stage_xp_end: stageXpEnd,
    progress_pct: progress,
    can_feed: now >= feedReadyAt,
    feed_ready_at: feedReadyAt,
    feed_cost: FEED_COST,
    feed_xp: FEED_XP,
  };
}

export function attachPet(router) {
  router.get('/api/pet/me', requireAuth, async (req, res) => {
    try {
      const row = await ensurePet(req.user.id);
      res.json({ ok: true, pet: petPayload(row), catalog: Object.entries(PET_CATALOG).map(([id, c]) => ({ id, ...c })) });
    } catch (e) {
      console.error('[pet] me error', e);
      res.status(500).json({ ok: false, error: 'internal' });
    }
  });

  // Đổi pet (chấp nhận legacy id để mượt cho client cũ)
  router.post('/api/pet/switch', requireAuth, async (req, res) => {
    const raw = String(req.body?.pet_id || '');
    const petId = normalizePetId(raw);
    if (!petId) return res.status(400).json({ ok: false, error: 'unknown_pet' });
    const row = await ensurePet(req.user.id);
    await _upsertPetStmt.run({ ...row, pet_id: petId, updated_at: Date.now() });
    res.json({ ok: true, pet: petPayload(await _getPetStmt.get(req.user.id)) });
  });

  // Đặt nickname
  router.post('/api/pet/nickname', requireAuth, async (req, res) => {
    const name = String(req.body?.nickname || '').trim().slice(0, 24);
    const row = await ensurePet(req.user.id);
    await _upsertPetStmt.run({ ...row, nickname: name || null, updated_at: Date.now() });
    res.json({ ok: true, pet: petPayload(await _getPetStmt.get(req.user.id)) });
  });

  // Feed pet — tốn coin, được XP, cooldown 4h
  router.post('/api/pet/feed', requireAuth, async (req, res) => {
    const row = await ensurePet(req.user.id);
    const now = Date.now();
    if (now < row.last_fed_at + FEED_COOLDOWN_MS) {
      return res.status(400).json({
        ok: false, error: 'cooldown',
        ready_at: row.last_fed_at + FEED_COOLDOWN_MS,
        message: 'Pet chưa đói — hãy quay lại sau.',
      });
    }
    const wallet = await getUserWallet(req.user.id) || { coins: 0 };
    if ((wallet.coins || 0) < FEED_COST) {
      return res.status(400).json({ ok: false, error: 'no_coins', need: FEED_COST, have: wallet.coins || 0 });
    }
    await upsertUserWallet(req.user.id, {
      coins: (wallet.coins || 0) - FEED_COST,
    }, { monotonic: false });
    const newXp = row.xp + FEED_XP;
    const newStage = computeStage(newXp);
    await _upsertPetStmt.run({
      ...row, xp: newXp, stage: newStage, last_fed_at: now, updated_at: now,
    });
    res.json({
      ok: true,
      gained: { xp: FEED_XP, coins: -FEED_COST },
      evolved: newStage > row.stage,
      pet: petPayload(await _getPetStmt.get(req.user.id)),
    });
  });
}

export { PET_CATALOG };
