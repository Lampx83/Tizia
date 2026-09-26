// ============================================================
// AI Board intake — phía người gửi yêu cầu (ticket 05, 06)
// ============================================================
// Onboarding 3 câu (vai trò, lĩnh vực am hiểu, mức kỹ thuật): trả lời 1 lần
// trước yêu cầu đầu tiên, admin miễn. Lưu bảng ai_board_profile (migration
// 005); worker nhận qua snapshot để chọn giọng văn khi làm rõ yêu cầu.
// ============================================================

// Cùng từ vựng users.role: pupil = học sinh, student = sinh viên.
export const ROLES = ['pupil', 'student', 'teacher', 'parent', 'other'];
export const TECH_LEVELS = ['none', 'some', 'fluent'];
const DOMAIN_ID = /^[a-z0-9-]{2,40}$/;
const MAX_DOMAINS = 20;

export function createProfileStore(db) {
  const read = db.prepare('SELECT role, domain_expertise, tech_level, answered_at FROM ai_board_profile WHERE user_id=?');
  const write = db.prepare(`
    INSERT INTO ai_board_profile(user_id, role, domain_expertise, tech_level, answered_at) VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET role=excluded.role, domain_expertise=excluded.domain_expertise,
      tech_level=excluded.tech_level, answered_at=excluded.answered_at
  `);

  function get(userId) {
    const row = read.get(Number(userId));
    return row ? { ...row, domain_expertise: JSON.parse(row.domain_expertise) } : null;
  }

  /** Profile đã chuẩn hoá; throw TypeError khi câu trả lời ngoài tập chip. */
  function save(userId, answers = {}) {
    const domains = Array.isArray(answers.domain_expertise) ? [...new Set(answers.domain_expertise.map(String))] : [];
    if (!ROLES.includes(answers.role) || !TECH_LEVELS.includes(answers.tech_level)
      || !domains.length || domains.length > MAX_DOMAINS || !domains.every((d) => DOMAIN_ID.test(d))) {
      throw new TypeError('invalid onboarding answers');
    }
    write.run(Number(userId), answers.role, JSON.stringify(domains), answers.tech_level, Date.now());
    return get(userId);
  }

  const needed = (user) => !!user && user.role !== 'admin' && !get(user.id);
  return { get, save, needed };
}

export function attachAiBoardIntake(router, { db, requireAuth, requireStrictCsrf }) {
  const profiles = createProfileStore(db);

  router.get('/api/ai-board/profile', requireAuth, (req, res) => {
    res.json({ needed: profiles.needed(req.user), profile: profiles.get(req.user.id) });
  });

  router.post('/api/ai-board/profile', requireAuth, requireStrictCsrf, (req, res) => {
    try {
      res.json({ ok: true, profile: profiles.save(req.user.id, req.body) });
    } catch (error) {
      if (error instanceof TypeError) return res.status(400).json({ error: 'invalid_profile' });
      throw error;
    }
  });
  return profiles;
}
