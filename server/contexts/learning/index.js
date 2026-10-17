// ============================================================
// Learning context — Knowledge Graph + Adaptive Next-Question (Trục B)
// ============================================================
// Mục tiêu: HS có "đường đi học sâu" rõ ràng. Không phải làm random từng câu
// mà theo prerequisite tree → mastery → đề xuất kế tiếp.
//
// 2 cơ chế:
// 1. Knowledge graph (skill_prereq): skill nào trước skill nào.
//    - Auto-seed dựa trên grade_min: skill grade N có prereq là TẤT CẢ skill
//      grade < N CÙNG subject_prefix (heuristic — đủ tốt cho MVP, sau này
//      thay bằng manual mapping per skill).
// 2. Adaptive next-question (IRT-lite): chọn câu hỏi kế tiếp theo θ học sinh
//    × b câu (độ khó).
//    - θ start = 0 (trung bình); update sau mỗi attempt: θ ± 0.2 (đúng/sai).
//    - Chọn câu có b gần θ nhất trong subject HS đang học, bỏ qua câu đã làm.
// ============================================================

import { db } from '../../db.js';
import { requireAuth } from '../identity/auth.js';
import * as scoreup from '../../integrations/scoreup.js';

// Auto-seed prerequisites khi DB còn trống. Heuristic: trong cùng (competency,
// domain), skill ở vị trí i có prereq là skill ở vị trí i-1 (theo id order =
// thứ tự seed). Cộng thêm: skill grade N (nếu có) prereq là skill grade N-1
// cùng competency. Catalog hiện tại đơn giản (mỗi domain ~ 1 grade group),
// nên primary prereq sẽ là intra-competency chain.
async function maybeSeedPrereq() {
  const cnt = (await db.prepare(`SELECT COUNT(*) AS n FROM skill_prereq`).get()).n;
  if (cnt > 0) return;
  console.log('[learning] seeding skill_prereq …');
  const all = await db.prepare(
    `SELECT id, code, domain, grade_min, competency_id
       FROM skills ORDER BY competency_id, domain, COALESCE(grade_min, 0), id`
  ).all();
  const byKey = new Map();
  for (const s of all) {
    const key = `${s.competency_id}|${s.domain}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(s);
  }
  const insert = db.prepare(
    `INSERT OR IGNORE INTO skill_prereq (skill_id, prereq_skill_id, weight) VALUES (?, ?, ?)`
  );
  const tx = db.transaction(async () => {
    let total = 0;
    for (const list of byKey.values()) {
      for (let i = 1; i < list.length; i++) {
        // Soft chain: skill[i] phụ thuộc skill[i-1] với weight 0.7
        await insert.run(list[i].id, list[i-1].id, 0.7);
        total++;
        // Long-range: skill[i] cũng nhẹ phụ thuộc skill[0] (gốc của competency)
        if (i >= 2) { await insert.run(list[i].id, list[0].id, 0.3); total++; }
      }
    }
    console.log(`[learning] seeded ${total} prereq edges`);
  });
  await tx();
}

export async function initLearning() {
  await maybeSeedPrereq();
}

// ── Helpers ────────────────────────────────────────────
const _getThetaStmt = db.prepare(
  `SELECT theta, n_attempts FROM user_theta WHERE user_id = ? AND subject_id = ?`
);
const _upsertThetaStmt = db.prepare(`
  INSERT INTO user_theta (user_id, subject_id, theta, n_attempts, updated_at)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(user_id, subject_id) DO UPDATE SET
    theta = excluded.theta,
    n_attempts = excluded.n_attempts,
    updated_at = excluded.updated_at
`);
const _getQuestionIrtStmt = db.prepare(`SELECT * FROM question_irt WHERE question_id = ?`);
const _upsertQuestionIrtStmt = db.prepare(`
  INSERT INTO question_irt (question_id, subject_id, b, a, n_attempts, n_correct, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(question_id) DO UPDATE SET
    subject_id = excluded.subject_id,
    b = excluded.b,
    n_attempts = excluded.n_attempts,
    n_correct = excluded.n_correct,
    updated_at = excluded.updated_at
`);

/**
 * Update IRT θ của user + b của câu hỏi sau khi user trả lời.
 * Update rules đơn giản:
 *   - θ_new = θ + α * (correct - p_correct), α = 0.2
 *   - b_new = b + β * (p_correct - correct), β = 0.05 (câu sai nhiều → b cao hơn)
 * Với p_correct = 1 / (1 + exp(-(θ - b))) — IRT logistic 1PL.
 */
export async function updateIrt({ user_id, question_id, subject_id = '', correct }) {
  if (!user_id || !question_id) return;
  const cur = await _getThetaStmt.get(user_id, subject_id || '');
  const theta = cur?.theta ?? 0;
  const qIrt = await _getQuestionIrtStmt.get(question_id);
  const b = qIrt?.b ?? 0;
  const p = 1 / (1 + Math.exp(-(theta - b)));
  const newTheta = Math.max(-3, Math.min(3, theta + 0.2 * ((correct ? 1 : 0) - p)));
  const newB     = Math.max(-3, Math.min(3, b     + 0.05 * (p - (correct ? 1 : 0))));
  const now = Date.now();
  await _upsertThetaStmt.run(user_id, subject_id || '', newTheta, (cur?.n_attempts || 0) + 1, now);
  await _upsertQuestionIrtStmt.run(
    question_id, subject_id || '', newB, qIrt?.a ?? 1,
    (qIrt?.n_attempts || 0) + 1, (qIrt?.n_correct || 0) + (correct ? 1 : 0), now,
  );
}

// ── Recommendation: skill kế tiếp ───────────────────────
/**
 * Đề xuất top-K skill HS NÊN HỌC kế tiếp: skill chưa earned mà prereq đã
 * earned ≥ 50% (soft prereq) + ưu tiên grade_min thấp.
 *
 * Filter theo profile user (grade + enrolled_domain) — quan trọng để không
 * lộ skill Dược (domain='pharmacy') sang HS K-12, hoặc skill THPT cho HS lớp 6.
 * Nếu user chưa set grade/enrolled_domain → bỏ filter tương ứng (admin/new
 * user thấy đầy đủ).
 */
async function getNextRecommendedSkills(userId, limit = 5) {
  const u = (await db.prepare(`SELECT grade, enrolled_domain FROM users WHERE id = ?`).get(userId)) || {};
  const grade  = u.grade ?? null;
  const domain = u.enrolled_domain ?? null;
  const rows = await db.prepare(`
    SELECT s.id, s.code, s.name, s.domain, s.grade_min, s.grade_max,
           c.code AS competency_code, c.name AS competency_name,
           (SELECT COUNT(*) FROM skill_prereq p WHERE p.skill_id = s.id) AS prereq_count,
           (SELECT COUNT(*) FROM skill_prereq p
              JOIN user_skills us ON us.skill_id = p.prereq_skill_id
             WHERE p.skill_id = s.id AND us.user_id = ?) AS prereq_done
      FROM skills s
      JOIN competencies c ON c.id = s.competency_id
     WHERE NOT EXISTS (SELECT 1 FROM user_skills us WHERE us.skill_id = s.id AND us.user_id = ?)
       AND (? IS NULL OR s.domain IS NULL OR s.domain = ?)
       AND (? IS NULL OR s.grade_min IS NULL OR s.grade_min <= ?)
       AND (? IS NULL OR s.grade_max IS NULL OR s.grade_max >= ?)
     ORDER BY
       CASE WHEN s.domain = ? THEN 0 ELSE 1 END,
       s.grade_min ASC, s.id ASC
  `).all(userId, userId, domain, domain, grade, grade, grade, grade, domain);
  const ready = rows.filter(r => r.prereq_count === 0 || r.prereq_done / r.prereq_count >= 0.5);
  return ready.slice(0, limit).map(r => ({
    code: r.code, name: r.name, domain: r.domain,
    grade_min: r.grade_min, grade_max: r.grade_max,
    competency: { code: r.competency_code, name: r.competency_name },
    prereq_progress: r.prereq_count > 0 ? Math.round((r.prereq_done / r.prereq_count) * 100) : 100,
  }));
}

// ── Adaptive next-question ─────────────────────────────
/**
 * Trả ra 1 câu hỏi tiếp theo phù hợp với θ user trong subject_id.
 * Chiến lược: lấy 1 batch random từ ScoreUp, chọn câu có |b - θ| nhỏ nhất.
 * Question chưa có IRT data → coi b = 0, sẽ được prioritized khi θ ~ 0.
 */
async function nextAdaptiveQuestion({ userId, subjectId, excludeIds = [] }) {
  if (!scoreup.isConfigured()) {
    return { error: 'scoreup_not_configured' };
  }
  const thetaRow = await _getThetaStmt.get(userId, subjectId || '');
  const theta = thetaRow?.theta ?? 0;
  // Fetch 1 batch ngẫu nhiên 10 câu trong subject. Lọc câu đã làm.
  let pool;
  try {
    const data = await scoreup.getRandomQuestions({ subject_id: subjectId, limit: 10 });
    pool = data?.data || data?.items || [];
  } catch (e) {
    return { error: 'scoreup_error', detail: e.message };
  }
  if (!Array.isArray(pool) || pool.length === 0) {
    return { error: 'no_questions' };
  }
  const excluded = new Set(excludeIds.map(String));
  const candidates = pool.filter(q => !excluded.has(String(q.id)));
  if (candidates.length === 0) return { error: 'all_excluded' };
  // Score mỗi câu = -|b - theta|. b lấy từ question_irt nếu có.
  const idList = candidates.map(q => q.id);
  const irtRows = idList.length > 0 ? await db.prepare(
    `SELECT question_id, b, n_attempts FROM question_irt WHERE question_id IN (${idList.map(() => '?').join(',')})`
  ).all(...idList.map(String)) : [];
  const irtMap = new Map(irtRows.map(r => [r.question_id, r]));
  let best = candidates[0], bestScore = -Infinity;
  for (const q of candidates) {
    const irt = irtMap.get(String(q.id));
    const b = irt?.b ?? 0;
    // Bonus: câu chưa từng có attempt → +0.1 (khuyến khích explore)
    const score = -Math.abs(b - theta) + (irt ? 0 : 0.1);
    if (score > bestScore) { bestScore = score; best = q; }
  }
  return {
    question: best,
    theta,
    expected_difficulty: irtMap.get(String(best.id))?.b ?? 0,
    n_attempts_total: thetaRow?.n_attempts || 0,
  };
}

// ── Routes ─────────────────────────────────────────────
export function attachLearning(router) {
  // Recommend skills tiếp theo
  router.get('/api/skills/next-recommended', requireAuth, async (req, res) => {
    try {
      const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));
      const items = await getNextRecommendedSkills(req.user.id, limit);
      res.json({ ok: true, items });
    } catch (e) {
      console.error('[learning] next-recommended error', e);
      res.status(500).json({ ok: false, error: 'internal' });
    }
  });

  // Lấy θ user (per subject)
  router.get('/api/learning/theta', requireAuth, async (req, res) => {
    const subjectId = String(req.query.subject_id || '');
    const row = await _getThetaStmt.get(req.user.id, subjectId);
    res.json({
      theta: row?.theta ?? 0,
      n_attempts: row?.n_attempts ?? 0,
      level: thetaLabel(row?.theta ?? 0),
    });
  });

  // Adaptive next-question
  router.post('/api/quiz/adaptive-next', requireAuth, async (req, res) => {
    const subjectId = String(req.body?.subject_id || '');
    const excludeIds = Array.isArray(req.body?.exclude_ids) ? req.body.exclude_ids : [];
    const result = await nextAdaptiveQuestion({
      userId: req.user.id, subjectId, excludeIds,
    });
    if (result.error) return res.status(400).json(result);
    res.json({ ok: true, ...result });
  });

  // Prereq graph cho 1 skill code (debug + FE render tree)
  router.get('/api/skills/prereq/:code', async (req, res) => {
    const code = String(req.params.code || '');
    const skill = await db.prepare(`SELECT id, code, name FROM skills WHERE code = ?`).get(code);
    if (!skill) return res.status(404).json({ error: 'not_found' });
    const prereqs = await db.prepare(`
      SELECT s.code, s.name, p.weight
        FROM skill_prereq p
        JOIN skills s ON s.id = p.prereq_skill_id
       WHERE p.skill_id = ?
       ORDER BY p.weight DESC
    `).all(skill.id);
    const unlocks = await db.prepare(`
      SELECT s.code, s.name, p.weight
        FROM skill_prereq p
        JOIN skills s ON s.id = p.skill_id
       WHERE p.prereq_skill_id = ?
       ORDER BY p.weight DESC
    `).all(skill.id);
    res.json({ skill, prereqs, unlocks });
  });
}

function thetaLabel(theta) {
  if (theta >= 1.5)  return 'Xuất sắc';
  if (theta >= 0.5)  return 'Khá';
  if (theta >= -0.5) return 'Trung bình';
  if (theta >= -1.5) return 'Đang học';
  return 'Cần ôn lại';
}

export { getNextRecommendedSkills };
