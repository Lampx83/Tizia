// ============================================================
// UGC Quest Builder + Marketplace — Trục C (Roblox/Minecraft Edu)
// ============================================================
// GV/HS tự tạo quest "mini quiz set" — 5-15 câu trắc nghiệm tự viết. Người
// chơi xong trả 70% coin về creator (kinh tế ảo). Moderation: auto-publish
// nhưng có flag-report; soft moderation queue cho admin review.
// ============================================================

import { db } from '../../db.js';
import { requireAuth } from '../identity/auth.js';
import { getUserWallet, upsertUserWallet } from '../../db.js';
import { addLeagueWeekXp } from '../engagement/league.js';
import { trackEngagementProgress } from '../engagement/index.js';

const REWARD_COIN = 15;
const REWARD_XP = 25;
const CREATOR_SHARE_PCT = 70;     // 70% reward về creator
const MAX_QUESTIONS = 15;
const MIN_QUESTIONS = 3;

function validateQuestions(qs) {
  if (!Array.isArray(qs)) return { ok: false, error: 'questions phải là array' };
  if (qs.length < MIN_QUESTIONS || qs.length > MAX_QUESTIONS) {
    return { ok: false, error: `Số câu hỏi phải từ ${MIN_QUESTIONS}-${MAX_QUESTIONS}` };
  }
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    if (!q || typeof q.text !== 'string' || !q.text.trim()) {
      return { ok: false, error: `Câu ${i+1}: thiếu nội dung` };
    }
    if (q.text.length > 500) return { ok: false, error: `Câu ${i+1}: quá dài (>500 ký tự)` };
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      return { ok: false, error: `Câu ${i+1}: 2-6 đáp án` };
    }
    if (!q.options.every(o => typeof o === 'string' && o.length > 0 && o.length <= 200)) {
      return { ok: false, error: `Câu ${i+1}: option không hợp lệ` };
    }
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
      return { ok: false, error: `Câu ${i+1}: correct phải là index hợp lệ` };
    }
  }
  return { ok: true };
}

const _listStmt = db.prepare(`
  SELECT q.*, u.display_name AS creator_name, u.role AS creator_role
    FROM ugc_quests q
    JOIN users u ON u.id = q.creator_id
   WHERE q.status = 'published'
     AND (? = '' OR q.subject_tag = ?)
     AND (? = '' OR q.grade_tag = ?)
   ORDER BY q.plays DESC, q.likes DESC, q.id DESC
   LIMIT ?
`);

const _getStmt = db.prepare(`
  SELECT q.*, u.display_name AS creator_name, u.role AS creator_role
    FROM ugc_quests q
    JOIN users u ON u.id = q.creator_id
   WHERE q.id = ?
`);

const _insertStmt = db.prepare(`
  INSERT INTO ugc_quests
    (creator_id, title, description, subject_tag, grade_tag,
     questions, created_at, updated_at)
  VALUES (@creator_id, @title, @description, @subject_tag, @grade_tag,
          @questions, @created_at, @updated_at)
  RETURNING id
`);

const _updateStmt = db.prepare(`
  UPDATE ugc_quests
     SET title = @title, description = @description,
         subject_tag = @subject_tag, grade_tag = @grade_tag,
         questions = @questions, updated_at = @updated_at
   WHERE id = @id AND creator_id = @creator_id
`);

const _bumpPlayStmt = db.prepare(`UPDATE ugc_quests SET plays = plays + 1 WHERE id = ?`);
const _bumpLikeStmt = db.prepare(`UPDATE ugc_quests SET likes = likes + 1 WHERE id = ?`);
const _decLikeStmt  = db.prepare(`UPDATE ugc_quests SET likes = MAX(0, likes - 1) WHERE id = ?`);
const _bumpFlagStmt = db.prepare(`UPDATE ugc_quests SET flags = flags + 1 WHERE id = ?`);
const _hideStmt     = db.prepare(`UPDATE ugc_quests SET status = 'hidden' WHERE id = ?`);

function publicQuest(row, includeAnswers = false) {
  if (!row) return null;
  let qs = [];
  try { qs = JSON.parse(row.questions); } catch {}
  if (!includeAnswers) {
    qs = qs.map(q => ({ text: q.text, options: q.options }));
  }
  return {
    id: row.id, title: row.title, description: row.description || '',
    subject_tag: row.subject_tag, grade_tag: row.grade_tag,
    plays: row.plays, likes: row.likes,
    creator: { id: row.creator_id, name: row.creator_name, role: row.creator_role },
    questions: qs,
    created_at: row.created_at,
  };
}

export function attachUgc(router) {
  // List marketplace
  router.get('/api/ugc/quests', async (req, res) => {
    const subject = String(req.query.subject || '');
    const grade = String(req.query.grade || '');
    const limit = Math.min(60, Math.max(1, Number(req.query.limit) || 30));
    const rows = await _listStmt.all(subject, subject, grade, grade, limit);
    res.json({ items: rows.map(r => publicQuest(r)) });
  });

  // Detail (không trả correct cho non-creator)
  router.get('/api/ugc/quests/:id', async (req, res) => {
    const id = Number(req.params.id);
    const row = await _getStmt.get(id);
    if (!row || row.status !== 'published') return res.status(404).json({ error: 'not_found' });
    const isCreator = req.user && req.user.id === row.creator_id;
    res.json({ quest: publicQuest(row, isCreator) });
  });

  // Create
  router.post('/api/ugc/quests', requireAuth, async (req, res) => {
    const b = req.body || {};
    const title = String(b.title || '').trim().slice(0, 100);
    const description = String(b.description || '').slice(0, 500);
    const subject_tag = String(b.subject_tag || '').slice(0, 30);
    const grade_tag = String(b.grade_tag || '').slice(0, 10);
    if (!title) return res.status(400).json({ error: 'title required' });
    const v = validateQuestions(b.questions);
    if (!v.ok) return res.status(400).json({ error: v.error });
    const now = Date.now();
    const info = await _insertStmt.run({
      creator_id: req.user.id,
      title, description, subject_tag, grade_tag,
      questions: JSON.stringify(b.questions),
      created_at: now, updated_at: now,
    });
    res.json({ ok: true, id: info.lastInsertRowid });
  });

  // Update (creator only)
  router.put('/api/ugc/quests/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const row = await _getStmt.get(id);
    if (!row) return res.status(404).json({ error: 'not_found' });
    if (row.creator_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'forbidden' });
    }
    const b = req.body || {};
    const v = validateQuestions(b.questions);
    if (!v.ok) return res.status(400).json({ error: v.error });
    await _updateStmt.run({
      id, creator_id: row.creator_id,
      title: String(b.title || row.title).slice(0, 100),
      description: String(b.description || '').slice(0, 500),
      subject_tag: String(b.subject_tag || '').slice(0, 30),
      grade_tag: String(b.grade_tag || '').slice(0, 10),
      questions: JSON.stringify(b.questions),
      updated_at: Date.now(),
    });
    res.json({ ok: true });
  });

  // List của creator hiện tại (gồm cả hidden để creator quản lý)
  router.get('/api/ugc/mine', requireAuth, async (req, res) => {
    const rows = await db.prepare(`
      SELECT q.*, u.display_name AS creator_name, u.role AS creator_role
        FROM ugc_quests q JOIN users u ON u.id = q.creator_id
       WHERE q.creator_id = ?
       ORDER BY q.updated_at DESC
    `).all(req.user.id);
    res.json({ items: rows.map(r => publicQuest(r, true)) });
  });

  // Submit play results: body { answers: [int...] } — server chấm + cộng reward
  router.post('/api/ugc/quests/:id/play', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const row = await _getStmt.get(id);
    if (!row || row.status !== 'published') return res.status(404).json({ error: 'not_found' });
    let qs = [];
    try { qs = JSON.parse(row.questions); } catch {}
    const answers = Array.isArray(req.body?.answers) ? req.body.answers : [];
    if (answers.length !== qs.length) {
      return res.status(400).json({ error: 'answers length mismatch' });
    }
    let correct = 0;
    const per = qs.map((q, i) => {
      const ok = answers[i] === q.correct;
      if (ok) correct++;
      return { correct: ok, your_answer: answers[i], right_answer: q.correct };
    });
    const scorePct = Math.round((correct / qs.length) * 100);

    // Persist play
    await db.prepare(`INSERT INTO ugc_plays (user_id, quest_id, score, played_at) VALUES (?, ?, ?, ?)`)
      .run(req.user.id, id, scorePct, Date.now());
    await _bumpPlayStmt.run(id);

    // Reward player: scale với score (50% → 0; 100% → full)
    const factor = Math.max(0, (scorePct - 50) / 50);
    const playerCoin = Math.round(REWARD_COIN * factor);
    const playerXp   = Math.round(REWARD_XP   * factor);
    if (playerCoin > 0 || playerXp > 0) {
      const w = await getUserWallet(req.user.id) || { coins: 0, xp: 0 };
      await upsertUserWallet(req.user.id, {
        coins: (w.coins || 0) + playerCoin,
        xp:    (w.xp    || 0) + playerXp,
      }, { monotonic: false });
      try { await addLeagueWeekXp(req.user.id, playerXp); } catch {}
      try { await trackEngagementProgress(req.user.id, 'quiz', correct); } catch {}
    }

    // Reward creator: 70% của playerCoin (kinh tế ảo) — không lấy của player.
    if (row.creator_id !== req.user.id && playerCoin > 0) {
      const creatorCoin = Math.round(playerCoin * CREATOR_SHARE_PCT / 100);
      if (creatorCoin > 0) {
        const cw = await getUserWallet(row.creator_id) || { coins: 0 };
        await upsertUserWallet(row.creator_id, {
          coins: (cw.coins || 0) + creatorCoin,
        }, { monotonic: false });
      }
    }

    res.json({
      ok: true, score: scorePct, correct, total: qs.length,
      per_question: per, reward: { coin: playerCoin, xp: playerXp },
    });
  });

  // Like / unlike (toggle)
  router.post('/api/ugc/quests/:id/like', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const existing = await db.prepare(`SELECT 1 FROM ugc_likes WHERE user_id = ? AND quest_id = ?`)
      .get(req.user.id, id);
    if (existing) {
      await db.prepare(`DELETE FROM ugc_likes WHERE user_id = ? AND quest_id = ?`).run(req.user.id, id);
      await _decLikeStmt.run(id);
      return res.json({ ok: true, liked: false });
    }
    await db.prepare(`INSERT INTO ugc_likes (user_id, quest_id) VALUES (?, ?)`).run(req.user.id, id);
    await _bumpLikeStmt.run(id);
    res.json({ ok: true, liked: true });
  });

  // Flag — báo cáo nội dung sai/độc hại. Tự hide khi flags ≥ 3.
  router.post('/api/ugc/quests/:id/flag', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const reason = String(req.body?.reason || 'other').slice(0, 60);
    await db.prepare(`INSERT OR IGNORE INTO ugc_flags (user_id, quest_id, reason, flagged_at)
                VALUES (?, ?, ?, ?)`).run(req.user.id, id, reason, Date.now());
    await _bumpFlagStmt.run(id);
    const row = await _getStmt.get(id);
    if (row && row.flags >= 3) await _hideStmt.run(id);
    res.json({ ok: true, auto_hidden: row && row.flags >= 3 });
  });

  // Creator stats — earn coin, plays tổng
  router.get('/api/ugc/me/stats', requireAuth, async (req, res) => {
    const row = await db.prepare(`
      SELECT COUNT(*) AS quests, SUM(plays) AS total_plays, SUM(likes) AS total_likes
        FROM ugc_quests
       WHERE creator_id = ? AND status != 'removed'
    `).get(req.user.id);
    res.json({
      quests: row?.quests || 0,
      total_plays: row?.total_plays || 0,
      total_likes: row?.total_likes || 0,
    });
  });
}
