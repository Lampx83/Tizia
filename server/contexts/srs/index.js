// ============================================================
// SRS Flashcards extension — review queue + bulk card creation
// ============================================================
// Sử dụng schema srs_cards (server/db.js đã có). Bổ sung:
// - Bảng srs_card_content: nội dung mặt trước/sau của card (deck của user
//   hoặc deck share).
// - API: lấy queue card đến hạn ôn, ghi review, tạo deck.
// ============================================================

import { db, recordSrsReview } from '../../db.js';
import { requireAuth } from '../identity/auth.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS srs_card_content (
    card_key      TEXT PRIMARY KEY,           -- 'deck:<deck_id>:c<idx>' hoặc 'vocab:<word>'
    deck_id       INTEGER,                     -- null nếu standalone
    front         TEXT NOT NULL,
    back          TEXT NOT NULL,
    hint          TEXT,
    media_url     TEXT,
    created_at    INTEGER NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES srs_decks(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS srs_decks (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id    INTEGER NOT NULL,
    name          TEXT NOT NULL,
    description   TEXT,
    subject_tag   TEXT,
    grade_tag     TEXT,
    is_public     INTEGER NOT NULL DEFAULT 1,
    created_at    INTEGER NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const _getDueStmt = db.prepare(`
  SELECT c.card_key, c.ease, c.interval_d, c.reps, c.lapses, c.due_at, c.last_correct,
         co.front, co.back, co.hint, co.deck_id
    FROM srs_cards c
    LEFT JOIN srs_card_content co ON co.card_key = c.card_key
   WHERE c.user_id = ? AND c.due_at <= ? AND co.card_key IS NOT NULL
   ORDER BY c.due_at ASC
   LIMIT ?
`);

const _getNewFromDeckStmt = db.prepare(`
  SELECT co.card_key, co.front, co.back, co.hint, co.deck_id, 0 AS ease, 0 AS interval_d
    FROM srs_card_content co
   WHERE co.deck_id = ?
     AND co.card_key NOT IN (SELECT card_key FROM srs_cards WHERE user_id = ?)
   LIMIT ?
`);

const _decksListStmt = db.prepare(`
  SELECT d.*, u.display_name AS creator_name,
         (SELECT COUNT(*) FROM srs_card_content WHERE deck_id = d.id) AS card_count
    FROM srs_decks d JOIN users u ON u.id = d.creator_id
   WHERE d.is_public = 1
   ORDER BY card_count DESC, d.created_at DESC
   LIMIT 30
`);

const _myDecksStmt = db.prepare(`
  SELECT d.*, (SELECT COUNT(*) FROM srs_card_content WHERE deck_id = d.id) AS card_count
    FROM srs_decks d
   WHERE d.creator_id = ?
   ORDER BY d.created_at DESC
`);

export function attachSrs(router) {
  // Review queue: card đến hạn (or new cards from a deck nếu chỉ định)
  router.get('/api/srs/queue', requireAuth, (req, res) => {
    const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 20));
    const deckId = req.query.deck_id ? Number(req.query.deck_id) : null;
    const now = Date.now();
    const due = _getDueStmt.all(req.user.id, now, limit);
    let cards = due;
    if (cards.length < limit && deckId) {
      const fresh = _getNewFromDeckStmt.all(deckId, req.user.id, limit - cards.length);
      cards = [...cards, ...fresh.map(c => ({ ...c, isNew: true }))];
    }
    res.json({ ok: true, queue: cards, due_count: due.length });
  });

  // Record review: body { card_key, correct, quality? }
  // quality 0-3 map: 0=again, 1=hard, 2=good, 3=easy → quality≥1 = correct
  router.post('/api/srs/review', requireAuth, (req, res) => {
    const cardKey = String(req.body?.card_key || '').slice(0, 120);
    const quality = Math.max(0, Math.min(3, Number(req.body?.quality) ?? 2));
    if (!cardKey) return res.status(400).json({ error: 'card_key required' });
    const result = recordSrsReview({
      user_id: req.user.id,
      card_key: cardKey, correct: quality >= 1,
    });
    res.json({ ok: true, ...result, quality });
  });

  // List decks (public marketplace)
  router.get('/api/srs/decks', (_req, res) => {
    res.json({ items: _decksListStmt.all() });
  });

  router.get('/api/srs/decks/mine', requireAuth, (req, res) => {
    res.json({ items: _myDecksStmt.all(req.user.id) });
  });

  // Create deck
  router.post('/api/srs/decks', requireAuth, (req, res) => {
    const b = req.body || {};
    const name = String(b.name || '').trim().slice(0, 100);
    const description = String(b.description || '').slice(0, 500);
    const subject_tag = String(b.subject_tag || '').slice(0, 30);
    const grade_tag = String(b.grade_tag || '').slice(0, 10);
    if (!name) return res.status(400).json({ error: 'name_required' });
    const cards = Array.isArray(b.cards) ? b.cards : [];
    if (cards.length < 1) return res.status(400).json({ error: 'min_1_card' });

    const tx = db.transaction(() => {
      const info = db.prepare(`
        INSERT INTO srs_decks (creator_id, name, description, subject_tag, grade_tag, is_public, created_at)
        VALUES (?, ?, ?, ?, ?, 1, ?)
      `).run(req.user.id, name, description, subject_tag, grade_tag, Date.now());
      const deckId = info.lastInsertRowid;
      const insCard = db.prepare(`
        INSERT INTO srs_card_content (card_key, deck_id, front, back, hint, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const now = Date.now();
      cards.slice(0, 200).forEach((c, i) => {
        const key = `deck:${deckId}:c${i}`;
        insCard.run(key, deckId, String(c.front || '').slice(0, 500),
                    String(c.back || '').slice(0, 500),
                    String(c.hint || '').slice(0, 200), now);
      });
      return deckId;
    });
    const deckId = tx();
    res.json({ ok: true, deck_id: deckId });
  });

  // Stats: tổng card đang due + reps tổng
  router.get('/api/srs/stats', requireAuth, (req, res) => {
    const stats = db.prepare(`
      SELECT COUNT(*) AS total,
             SUM(CASE WHEN due_at <= ? THEN 1 ELSE 0 END) AS due_now,
             SUM(total_reviews) AS reviews,
             AVG(ease) AS avg_ease
        FROM srs_cards WHERE user_id = ?
    `).get(Date.now(), req.user.id);
    res.json({ ok: true, ...stats });
  });
}

export const plugin = {
  name: 'srs',
  mount(router) {
    attachSrs(router);
  },
};
