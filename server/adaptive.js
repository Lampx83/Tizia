// ============================================================
// Adaptive Quiz (GAP 11) — BKT-lite, hoàn toàn local.
// ============================================================
//
// Mục đích:
//   - Nhận sự kiện học tập (LearningEvent) từ FE: HS làm 1 câu quiz đúng/sai.
//   - Cập nhật xác suất "đã thông thạo" cho từng skill bằng Bayesian Knowledge
//     Tracing (BKT) — implement local trong process Tizia, KHÔNG cần backend.
//   - Khi đến lúc chọn câu tiếp theo, FE gọi /api/adaptive/next?learner=X&skill=Y
//     → trả về gợi ý: tiếp tục skill cũ, đổi sang skill yếu hơn, hoặc remediate.
//
// BKT parameters (mặc định, có thể tinh chỉnh sau):
//   pInit     = 0.20  → xác suất biết trước
//   pLearn    = 0.20  → xác suất học được sau 1 câu
//   pSlip     = 0.10  → xác suất biết nhưng làm sai
//   pGuess    = 0.20  → xác suất không biết nhưng đoán đúng
//   threshold = 0.85  → coi như đã thông thạo
//
// Persist: SQLite bảng `adaptive_state(learner, skill, p_known, attempts, last_at)`
//          và `learning_events(...)`.
// ============================================================

import { db } from './db.js';

const PARAMS = {
  pInit: 0.20,
  pLearn: 0.20,
  pSlip: 0.10,
  pGuess: 0.20,
  threshold: 0.85,
  remedialFailStreak: 2, // 2 fail liên tiếp → đề xuất nội dung cứu trợ
};

async function getState(learner, skill) {
  let row = await db.prepare(
    'SELECT * FROM adaptive_state WHERE learner = ? AND skill = ?'
  ).get(learner, skill);
  if (!row) {
    row = {
      learner, skill,
      p_known: PARAMS.pInit,
      attempts: 0,
      correct_streak: 0,
      fail_streak: 0,
      last_at: 0,
    };
  }
  return row;
}

async function upsertState(s) {
  await db.prepare(`
    INSERT INTO adaptive_state (learner, skill, p_known, attempts, correct_streak, fail_streak, last_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(learner, skill) DO UPDATE SET
      p_known = excluded.p_known,
      attempts = excluded.attempts,
      correct_streak = excluded.correct_streak,
      fail_streak = excluded.fail_streak,
      last_at = excluded.last_at
  `).run(s.learner, s.skill, s.p_known, s.attempts, s.correct_streak, s.fail_streak, s.last_at);
}

/**
 * BKT update step.
 * P(L_n+1 | obs) sau khi quan sát kết quả đúng/sai.
 */
function bktUpdate(pKnown, correct) {
  const { pSlip, pGuess, pLearn } = PARAMS;
  let pKnownGivenObs;
  if (correct) {
    pKnownGivenObs = (pKnown * (1 - pSlip)) / (pKnown * (1 - pSlip) + (1 - pKnown) * pGuess || 1e-9);
  } else {
    pKnownGivenObs = (pKnown * pSlip) / (pKnown * pSlip + (1 - pKnown) * (1 - pGuess) || 1e-9);
  }
  // Then a chance to learn this step
  const pNext = pKnownGivenObs + (1 - pKnownGivenObs) * pLearn;
  return Math.max(0, Math.min(1, pNext));
}

/**
 * Suggest câu tiếp theo dựa trên state hiện tại.
 * - Nếu mastered (p>=threshold): suggest skill khác / level cao hơn
 * - Nếu fail_streak >= remedialFailStreak: suggest remedial content
 * - Còn lại: tiếp tục practice skill cùng cấp
 */
async function suggestNext(state, availableSkills = []) {
  const { threshold, remedialFailStreak } = PARAMS;
  if (state.fail_streak >= remedialFailStreak) {
    return { mode: 'remedial', skill: state.skill, hint: 'Học sinh đang sai liên tiếp — đề xuất xem lại lý thuyết / video ngắn trước khi làm tiếp.' };
  }
  if (state.p_known >= threshold) {
    // Chọn skill khác có p_known thấp nhất từ list
    const others = (await Promise.all(
      availableSkills
        .filter(s => s !== state.skill)
        .map(async s => ({ s, st: await getState(state.learner, s) }))
    )).sort((a, b) => a.st.p_known - b.st.p_known);
    if (others.length) {
      return { mode: 'next_skill', skill: others[0].s, hint: 'Đã thông thạo skill hiện tại — chuyển sang skill yếu hơn.' };
    }
    return { mode: 'mastered_all', skill: state.skill, hint: 'Học sinh đã thông thạo toàn bộ skill có sẵn — đề xuất nâng cấp độ.' };
  }
  return { mode: 'continue', skill: state.skill, hint: 'Tiếp tục luyện skill này — chưa đạt ngưỡng thông thạo.' };
}

export function attachAdaptive(r) {
  /**
   * POST /api/adaptive/event
   * Body: { learner, skill, correct, questionId?, durationMs?, domain?, context? }
   * Returns: { ok, pKnown, mastered, suggestion }
   */
  r.post('/api/adaptive/event', async (req, res) => {
    const b = req.body || {};
    const learner = String(b.learner || '').trim().slice(0, 40);
    const skill = String(b.skill || '').trim().slice(0, 80);
    const correct = !!b.correct;
    if (!learner || !skill) {
      return res.status(400).json({ error: 'learner and skill required' });
    }
    const now = Date.now();
    const state = await getState(learner, skill);
    const pNext = bktUpdate(state.p_known, correct);

    const updated = {
      ...state,
      p_known: pNext,
      attempts: state.attempts + 1,
      correct_streak: correct ? state.correct_streak + 1 : 0,
      fail_streak: correct ? 0 : state.fail_streak + 1,
      last_at: now,
    };
    await upsertState(updated);

    // Lưu event
    await db.prepare(`
      INSERT INTO learning_events (learner, skill, question_id, correct, duration_ms, created_at, domain, context)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      learner, skill,
      b.questionId ? String(b.questionId).slice(0, 80) : null,
      correct ? 1 : 0,
      Number.isFinite(b.durationMs) ? Math.floor(b.durationMs) : null,
      now,
      b.domain ? String(b.domain).slice(0, 30) : null,
      b.context ? String(b.context).slice(0, 80) : null,
    );

    const suggestion = await suggestNext(updated, Array.isArray(b.availableSkills) ? b.availableSkills : []);
    res.json({
      ok: true,
      pKnown: Number(pNext.toFixed(4)),
      mastered: pNext >= PARAMS.threshold,
      failStreak: updated.fail_streak,
      correctStreak: updated.correct_streak,
      suggestion,
    });
  });

  /**
   * GET /api/adaptive/next?learner=X&skill=Y&skills=a,b,c
   * Trả về suggest cho câu tiếp theo (không update state).
   */
  r.get('/api/adaptive/next', async (req, res) => {
    const learner = String(req.query.learner || '').trim();
    const skill = String(req.query.skill || '').trim();
    if (!learner || !skill) return res.status(400).json({ error: 'learner and skill required' });
    const skills = String(req.query.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    const state = await getState(learner, skill);
    const suggestion = await suggestNext(state, skills.length ? skills : [skill]);
    res.json({
      learner, skill,
      pKnown: Number(state.p_known.toFixed(4)),
      mastered: state.p_known >= PARAMS.threshold,
      attempts: state.attempts,
      failStreak: state.fail_streak,
      correctStreak: state.correct_streak,
      suggestion,
    });
  });

  /**
   * GET /api/adaptive/learner/:name — tổng quan tiến độ học của 1 learner.
   * Dùng cho dashboard Wave 2.
   */
  r.get('/api/adaptive/learner/:name', async (req, res) => {
    const learner = String(req.params.name || '').trim();
    if (!learner) return res.status(400).json({ error: 'learner required' });
    const states = await db.prepare(`
      SELECT skill, p_known, attempts, correct_streak, fail_streak, last_at
      FROM adaptive_state WHERE learner = ? ORDER BY p_known ASC
    `).all(learner);
    const weakSkills = states.filter(s => s.p_known < PARAMS.threshold).slice(0, 5);
    const masteredCount = states.filter(s => s.p_known >= PARAMS.threshold).length;
    res.json({
      learner,
      totalSkills: states.length,
      masteredCount,
      states,
      weakSkills,
      threshold: PARAMS.threshold,
    });
  });

  /** Health check */
  r.get('/api/adaptive/health', (_req, res) => {
    res.json({
      ok: true,
      params: PARAMS,
    });
  });
}
