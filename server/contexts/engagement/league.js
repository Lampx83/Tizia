// ============================================================
// League tuần — Trục A (theo Duolingo league)
// ============================================================
// Mục tiêu: HS ganh đua hàng tuần để giữ retention. Một "season" = 7 ngày
// (Mon 00:00 → Sun 23:59 VN). HS được xếp vào nhóm 30 người cùng tier; cuối
// tuần top 5 lên tier, bottom 5 xuống tier. Tier:
//   bronze → silver → gold → sapphire → ruby → diamond (6 tier)
// XP tuần = XP cộng dồn trong season hiện tại (reset mỗi tuần).
//
// Self-contained schema (league_seasons + league_memberships + league_groups).
// ============================================================

import { db } from '../../db.js';

const TIERS = ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'diamond'];
const TIER_META = {
  bronze:   { label: 'Đồng',     icon: '🥉', color: '#a07b3e' },
  silver:   { label: 'Bạc',      icon: '🥈', color: '#c0c0c0' },
  gold:     { label: 'Vàng',     icon: '🥇', color: '#fbbf24' },
  sapphire: { label: 'Lam ngọc', icon: '💎', color: '#3b82f6' },
  ruby:     { label: 'Hồng ngọc',icon: '🔴', color: '#ef4444' },
  diamond:  { label: 'Kim cương',icon: '💠', color: '#06b6d4' },
};
const GROUP_SIZE = 30;
const TZ_OFFSET_MIN = 7 * 60;

// ── Time helpers ─────────────────────────────────────────────
function vnNow() { return new Date(Date.now() + TZ_OFFSET_MIN * 60_000); }
function startOfWeekMonVN(date = vnNow()) {
  const d = new Date(date.getTime());
  const day = d.getUTCDay() || 7;          // CN=0 → 7, Mon=1
  d.setUTCDate(d.getUTCDate() - day + 1);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function nextTier(t) { const i = TIERS.indexOf(t); return TIERS[Math.min(TIERS.length - 1, i + 1)]; }
function prevTier(t) { const i = TIERS.indexOf(t); return TIERS[Math.max(0, i - 1)]; }

// ── Statements ─────────────────────────────────────────────
const getCurrentSeasonStmt = db.prepare(
  `SELECT * FROM league_seasons WHERE ended_at IS NULL ORDER BY id DESC LIMIT 1`
);
const insertSeasonStmt = db.prepare(
  `INSERT INTO league_seasons (week_start, started_at, created_at) VALUES (?, ?, ?) RETURNING id`
);
const endSeasonStmt = db.prepare(
  `UPDATE league_seasons SET ended_at = ? WHERE id = ?`
);

const findOpenGroupStmt = db.prepare(`
  SELECT * FROM league_groups
   WHERE season_id = ? AND tier = ? AND member_count < ?
   ORDER BY seq ASC LIMIT 1
`);
const maxGroupSeqStmt = db.prepare(
  `SELECT MAX(seq) AS s FROM league_groups WHERE season_id = ? AND tier = ?`
);
const insertGroupStmt = db.prepare(
  `INSERT INTO league_groups (season_id, tier, seq, member_count) VALUES (?, ?, ?, 0) RETURNING id`
);
const incGroupCountStmt = db.prepare(
  `UPDATE league_groups SET member_count = member_count + 1 WHERE id = ?`
);

const getMembershipStmt = db.prepare(
  `SELECT * FROM league_memberships WHERE season_id = ? AND user_id = ?`
);
const insertMembershipStmt = db.prepare(`
  INSERT INTO league_memberships (season_id, user_id, group_id, tier, week_xp)
  VALUES (?, ?, ?, ?, 0)
`);
const addWeekXpStmt = db.prepare(
  `UPDATE league_memberships SET week_xp = week_xp + ? WHERE season_id = ? AND user_id = ?`
);

const groupBoardStmt = db.prepare(`
  SELECT m.user_id, m.week_xp, m.tier,
         u.display_name, u.role, u.enrolled_domain
    FROM league_memberships m
    JOIN users u ON u.id = m.user_id
   WHERE m.group_id = ?
   ORDER BY m.week_xp DESC, m.user_id ASC
`);

const getUserTierStmt = db.prepare(`SELECT tier FROM league_user_tier WHERE user_id = ?`);
const upsertUserTierStmt = db.prepare(`
  INSERT INTO league_user_tier (user_id, tier, updated_at) VALUES (?, ?, ?)
  ON CONFLICT(user_id) DO UPDATE SET tier = excluded.tier, updated_at = excluded.updated_at
`);

// ── Core ────────────────────────────────────────────────────
async function ensureCurrentSeason() {
  const cur = await getCurrentSeasonStmt.get();
  const thisMon = startOfWeekMonVN();
  if (cur && cur.week_start === thisMon) return cur;
  // Có season cũ đang mở mà week_start != tuần này → đã quá hạn, đóng + reset.
  if (cur) {
    await rotateSeason(cur.id);              // chốt xếp hạng + promote/relegate
  }
  const now = Date.now();
  const info = await insertSeasonStmt.run(thisMon, now, now);
  return { id: info.lastInsertRowid, week_start: thisMon, started_at: now, ended_at: null };
}

async function getOrCreateGroup(seasonId, tier) {
  const open = await findOpenGroupStmt.get(seasonId, tier, GROUP_SIZE);
  if (open) return open;
  const maxSeq = ((await maxGroupSeqStmt.get(seasonId, tier))?.s) || 0;
  const info = await insertGroupStmt.run(seasonId, tier, maxSeq + 1);
  return { id: info.lastInsertRowid, season_id: seasonId, tier, seq: maxSeq + 1, member_count: 0 };
}

async function ensureMembership(userId) {
  const season = await ensureCurrentSeason();
  let m = await getMembershipStmt.get(season.id, userId);
  if (m) return { season, membership: m };
  const tier = ((await getUserTierStmt.get(userId))?.tier) || 'bronze';
  const group = await getOrCreateGroup(season.id, tier);
  await insertMembershipStmt.run(season.id, userId, group.id, tier);
  await incGroupCountStmt.run(group.id);
  await upsertUserTierStmt.run(userId, tier, Date.now());
  m = await getMembershipStmt.get(season.id, userId);
  return { season, membership: m };
}

/**
 * Cộng XP tuần cho user (gọi từ chỗ grant XP: claim quest, codelab accepted,
 * quiz correct... cộng lại đây). Idempotent theo nguồn — caller chịu dedup.
 */
export async function addLeagueWeekXp(userId, xp) {
  if (!userId || !Number.isFinite(xp) || xp <= 0) return;
  const { season } = await ensureMembership(userId);
  await addWeekXpStmt.run(Math.floor(xp), season.id, userId);
}

/**
 * Lấy bảng xếp hạng group hiện tại của user.
 */
export async function getLeagueBoardForUser(userId) {
  const { season, membership } = await ensureMembership(userId);
  const board = await groupBoardStmt.all(membership.group_id);
  // Thêm rank
  let rank = 0;
  const enriched = board.map((row, i) => {
    rank = i + 1;
    return {
      rank,
      user_id: row.user_id,
      display_name: row.display_name,
      week_xp: row.week_xp,
      is_me: row.user_id === userId,
      role: row.role,
    };
  });
  return {
    season: { id: season.id, week_start: season.week_start },
    tier: membership.tier,
    tier_meta: TIER_META[membership.tier],
    group_seq: board.length > 0 ? (board[0] && board[0].group_id) : null,
    week_xp: membership.week_xp,
    my_rank: enriched.find(r => r.is_me)?.rank || null,
    board: enriched,
    promotion_zone: 5,                      // top 5 → lên tier
    relegation_zone: GROUP_SIZE - 5,        // bottom 5 → xuống tier (nếu group đủ 30)
  };
}

/**
 * Khoá 1 season: tính rank, promote/relegate, set ended_at. Idempotent — gọi
 * 2 lần cùng 1 season chỉ xử lý lần đầu.
 */
export async function rotateSeason(seasonId) {
  const season = await db.prepare(`SELECT * FROM league_seasons WHERE id = ?`).get(seasonId);
  if (!season || season.ended_at) return { ok: false, reason: 'already_ended_or_missing' };
  const groups = await db.prepare(`SELECT * FROM league_groups WHERE season_id = ?`).all(seasonId);
  let promoted = 0, relegated = 0;
  const tx = db.transaction(async () => {
    for (const g of groups) {
      const members = await db.prepare(
        `SELECT user_id, tier, week_xp FROM league_memberships
          WHERE group_id = ? ORDER BY week_xp DESC, user_id ASC`
      ).all(g.id);
      for (const [idx, m] of members.entries()) {
        const rank = idx + 1;
        let newTier = m.tier;
        let isPromoted = 0, isRelegated = 0;
        if (rank <= 5) { newTier = nextTier(m.tier); if (newTier !== m.tier) isPromoted = 1; }
        else if (members.length >= 20 && rank > members.length - 5) {
          // Chỉ relegate khi group đủ đông (≥20) — tránh phạt oan group nhỏ.
          newTier = prevTier(m.tier); if (newTier !== m.tier) isRelegated = 1;
        }
        await db.prepare(`
          UPDATE league_memberships
             SET final_rank = ?, promoted = ?, relegated = ?
           WHERE season_id = ? AND user_id = ?
        `).run(rank, isPromoted, isRelegated, seasonId, m.user_id);
        await upsertUserTierStmt.run(m.user_id, newTier, Date.now());
        if (isPromoted) promoted++;
        if (isRelegated) relegated++;
      }
    }
    await endSeasonStmt.run(Date.now(), seasonId);
  });
  await tx();
  return { ok: true, promoted, relegated };
}

export function attachLeague(router, requireAuth) {
  router.get('/api/league/me', requireAuth, async (req, res) => {
    try {
      const data = await getLeagueBoardForUser(req.user.id);
      res.json({ ok: true, ...data });
    } catch (e) {
      console.error('[league] me error', e);
      res.status(500).json({ ok: false, error: 'internal' });
    }
  });

  // Lấy lịch sử các season trước của user (hiển thị badge promoted/relegated)
  router.get('/api/league/history', requireAuth, async (req, res) => {
    const rows = await db.prepare(`
      SELECT m.season_id, m.tier, m.week_xp, m.final_rank, m.promoted, m.relegated,
             s.week_start, s.ended_at
        FROM league_memberships m
        JOIN league_seasons s ON s.id = m.season_id
       WHERE m.user_id = ? AND s.ended_at IS NOT NULL
       ORDER BY s.ended_at DESC LIMIT 12
    `).all(req.user.id);
    res.json({ ok: true, items: rows, tiers: TIER_META });
  });

  // Catalog tier — public, FE render hệ thống tier
  router.get('/api/league/tiers', (_req, res) => {
    res.json({ tiers: TIERS, meta: TIER_META });
  });
}

// Cron-lite: mỗi lần init tự kiểm tra & rotate nếu cần. Cộng thêm
// setInterval mỗi 30 phút để rotate ngay sau khi sang tuần mới (00:00 thứ 2 VN)
// — không cần OS cron. Idempotent.
async function maybeRotate() {
  try {
    const cur = await getCurrentSeasonStmt.get();
    const thisMon = startOfWeekMonVN();
    if (cur && cur.week_start !== thisMon) await rotateSeason(cur.id);
    await ensureCurrentSeason();
  } catch (e) {
    console.warn('[league] rotate check failed', e.message);
  }
}

// Seed/cron init — gọi từ index.js sau khi schema sẵn sàng.
export async function initLeague() {
  await maybeRotate();
  setInterval(() => { maybeRotate(); }, 30 * 60 * 1000);
}

export { TIERS, TIER_META };
