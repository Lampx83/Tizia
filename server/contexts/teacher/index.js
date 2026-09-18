// ============================================================
// Teacher Team Quest + Class Leaderboard (Classcraft-style)
// ============================================================
// GV mở "team quest tuần" cho lớp: cả lớp gom đủ XP để mở reward chung
// (mỗi HS đóng góp XP của mình, cộng dồn). Reward = coin/XP/badge cho mọi HS.
// Class leaderboard: top HS trong lớp theo weekly XP / streak / mastery.
// ============================================================

import { db, listClasses, getClassByCode } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS team_quests (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    class_code      TEXT NOT NULL,
    creator_id      INTEGER NOT NULL,
    title           TEXT NOT NULL,
    description     TEXT,
    target_xp       INTEGER NOT NULL,
    reward_coin     INTEGER NOT NULL DEFAULT 100,
    reward_xp       INTEGER NOT NULL DEFAULT 0,
    reward_item     TEXT,
    starts_at       INTEGER NOT NULL,
    ends_at         INTEGER NOT NULL,
    status          TEXT NOT NULL DEFAULT 'active', -- active | completed | expired
    completed_at    INTEGER,
    created_at      INTEGER NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_team_quests_class ON team_quests(class_code, status);

  CREATE TABLE IF NOT EXISTS team_quest_contribs (
    team_quest_id   INTEGER NOT NULL,
    user_id         INTEGER NOT NULL,
    xp_contributed  INTEGER NOT NULL DEFAULT 0,
    last_at         INTEGER NOT NULL,
    PRIMARY KEY (team_quest_id, user_id),
    FOREIGN KEY (team_quest_id) REFERENCES team_quests(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)       REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS team_quest_claims (
    team_quest_id   INTEGER NOT NULL,
    user_id         INTEGER NOT NULL,
    claimed_at      INTEGER NOT NULL,
    PRIMARY KEY (team_quest_id, user_id)
  );
`);

const _getActiveStmt = db.prepare(`
  SELECT * FROM team_quests WHERE class_code = ? AND status = 'active'
   ORDER BY created_at DESC
`);

function teacherOnly(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  if (!['teacher', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ error: 'teacher_only' });
  }
  next();
}

function inClass(userId, classCode) {
  const row = db.prepare(`SELECT class_code FROM users WHERE id = ?`).get(userId);
  // user.class_code không có sẵn — fallback: check qua attempts (chấp nhận
  // user nào từng làm attempt với class_code này). MVP: cho tất cả pupil
  // join nếu class_code hợp lệ.
  return !!getClassByCode(classCode);
}

export function attachTeacher(router) {
  // GV xem các lớp họ làm chủ nhiệm
  router.get('/api/teacher/classes', requireAuth, teacherOnly, (_req, res) => {
    const list = listClasses();
    res.json({ classes: list });
  });

  // Tạo team quest
  router.post('/api/teacher/team-quest', requireAuth, teacherOnly, (req, res) => {
    const b = req.body || {};
    const classCode = String(b.class_code || '').trim().toUpperCase();
    const title = String(b.title || '').trim().slice(0, 100);
    const description = String(b.description || '').slice(0, 300);
    const targetXp = Math.max(100, Math.min(50000, Number(b.target_xp) || 1000));
    const rewardCoin = Math.max(0, Math.min(2000, Number(b.reward_coin) || 100));
    const rewardXp   = Math.max(0, Math.min(2000, Number(b.reward_xp) || 0));
    const durationDays = Math.max(1, Math.min(30, Number(b.duration_days) || 7));
    if (!getClassByCode(classCode)) return res.status(404).json({ error: 'class_not_found' });
    if (!title) return res.status(400).json({ error: 'title_required' });
    const now = Date.now();
    const info = db.prepare(`
      INSERT INTO team_quests (class_code, creator_id, title, description,
                               target_xp, reward_coin, reward_xp,
                               starts_at, ends_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(classCode, req.user.id, title, description,
           targetXp, rewardCoin, rewardXp, now, now + durationDays * 86400_000, now);
    res.json({ ok: true, id: info.lastInsertRowid });
  });

  // Đóng góp XP cho team quest active (auto-call khi user gain XP). Nhưng để
  // đơn giản: lộ ra endpoint manual để client gọi.
  router.post('/api/teacher/team-quest/:id/contribute', requireAuth, (req, res) => {
    const id = Number(req.params.id);
    const xp = Math.max(1, Math.min(500, Number(req.body?.xp) || 1));
    const tq = db.prepare(`SELECT * FROM team_quests WHERE id = ?`).get(id);
    if (!tq) return res.status(404).json({ error: 'not_found' });
    if (tq.status !== 'active') return res.status(400).json({ error: 'not_active' });
    if (Date.now() > tq.ends_at) {
      db.prepare(`UPDATE team_quests SET status='expired' WHERE id=?`).run(id);
      return res.status(400).json({ error: 'expired' });
    }
    if (!inClass(req.user.id, tq.class_code)) {
      return res.status(403).json({ error: 'not_in_class' });
    }
    const now = Date.now();
    db.prepare(`
      INSERT INTO team_quest_contribs (team_quest_id, user_id, xp_contributed, last_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(team_quest_id, user_id) DO UPDATE SET
        xp_contributed = xp_contributed + excluded.xp_contributed,
        last_at = excluded.last_at
    `).run(id, req.user.id, xp, now);
    // Check completion
    const totalXp = db.prepare(`SELECT SUM(xp_contributed) AS s FROM team_quest_contribs WHERE team_quest_id = ?`).get(id).s || 0;
    if (totalXp >= tq.target_xp) {
      db.prepare(`UPDATE team_quests SET status='completed', completed_at=? WHERE id=? AND status='active'`)
        .run(now, id);
    }
    res.json({ ok: true, total_xp: totalXp, target_xp: tq.target_xp });
  });

  // Lấy team quest active + tiến độ cho 1 lớp
  router.get('/api/teacher/team-quest/active', requireAuth, (req, res) => {
    const classCode = String(req.query.class_code || '').toUpperCase();
    if (!classCode) return res.status(400).json({ error: 'class_code_required' });
    const items = _getActiveStmt.all(classCode).map(tq => {
      const totalXp = db.prepare(`SELECT SUM(xp_contributed) AS s FROM team_quest_contribs WHERE team_quest_id = ?`).get(tq.id).s || 0;
      const contribCount = db.prepare(`SELECT COUNT(*) AS n FROM team_quest_contribs WHERE team_quest_id = ?`).get(tq.id).n;
      const topContrib = db.prepare(`
        SELECT c.user_id, c.xp_contributed, u.display_name
          FROM team_quest_contribs c JOIN users u ON u.id = c.user_id
         WHERE c.team_quest_id = ? ORDER BY c.xp_contributed DESC LIMIT 5
      `).all(tq.id);
      return { ...tq, total_xp: totalXp, contrib_count: contribCount, top_contributors: topContrib };
    });
    res.json({ items });
  });

  // Class leaderboard — top HS theo XP tuần (lấy từ league_memberships)
  router.get('/api/teacher/class/:code/leaderboard', requireAuth, (req, res) => {
    const code = String(req.params.code).toUpperCase();
    const cls = getClassByCode(code);
    if (!cls) return res.status(404).json({ error: 'not_found' });
    // Lấy member của lớp qua attempts
    const memberRows = db.prepare(`
      SELECT DISTINCT u.id, u.display_name, u.role,
             COALESCE(lm.week_xp, 0) AS week_xp,
             COALESCE(es.streak, 0) AS streak,
             (SELECT COUNT(*) FROM user_skills WHERE user_id = u.id) AS skills_earned
        FROM users u
        LEFT JOIN attempts a ON a.player_id = u.id AND a.class_code = ?
        LEFT JOIN league_memberships lm ON lm.user_id = u.id
          AND lm.season_id = (SELECT id FROM league_seasons WHERE ended_at IS NULL ORDER BY id DESC LIMIT 1)
        LEFT JOIN engagement_state es ON es.user_id = u.id
       WHERE u.role = 'pupil'
       GROUP BY u.id
       ORDER BY week_xp DESC, skills_earned DESC
       LIMIT 50
    `).all(code);
    res.json({ class: cls, leaderboard: memberRows });
  });
}

export const plugin = {
  name: 'teacher',
  mount(router) {
    attachTeacher(router);
  },
};
