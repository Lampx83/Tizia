// ============================================================
// Lesson Builder (GAP 3) — No-code editor + Marketplace (GAP 5)
// ============================================================
//
// Mô hình:
//   - GV tạo "lesson" gồm 1 chuỗi "block": text, image, video, quiz,
//     3d-model, ai-character, ai-tutor-prompt, link.
//   - Lưu JSON vào SQLite. Mỗi lesson có slug ngắn (6 chữ random) làm URL share.
//   - Public lessons → marketplace, vote/upvote, comment.
//   - Anonymous publish OK; có teacherName để credit.
//
// Schema:
//   lessons(id, slug, title, description, author, grade, subject, blocks_json,
//           published, views, likes, created_at, updated_at)
//   lesson_likes(slug, user_key, created_at)
//   lesson_comments(id, slug, author, text, created_at)
// ============================================================

import { db } from './db.js';

const SLUG_ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function genSlug(len = 6) {
  let s = '';
  for (let i = 0; i < len; i++) s += SLUG_ALPHA[Math.floor(Math.random() * SLUG_ALPHA.length)];
  return s;
}

function validateBlocks(blocks) {
  if (!Array.isArray(blocks)) return false;
  if (blocks.length > 200) return false;
  for (const b of blocks) {
    if (!b || typeof b !== 'object') return false;
    if (typeof b.type !== 'string' || b.type.length > 40) return false;
  }
  return true;
}

export function attachLessons(r) {
  // CREATE / UPDATE
  r.post('/api/lessons', async (req, res) => {
    const b = req.body || {};
    const title = String(b.title || '').trim().slice(0, 200);
    if (!title) return res.status(400).json({ error: 'title required' });
    if (!validateBlocks(b.blocks)) return res.status(400).json({ error: 'invalid blocks' });

    const now = Date.now();
    let slug = String(b.slug || '').trim();
    if (slug) {
      // UPDATE existing
      const exists = await db.prepare('SELECT id FROM lessons WHERE slug = ?').get(slug);
      if (!exists) return res.status(404).json({ error: 'lesson not found' });
      await db.prepare(`
        UPDATE lessons
        SET title=?, description=?, author=?, grade=?, subject=?,
            blocks_json=?, published=?, updated_at=?
        WHERE slug=?
      `).run(
        title,
        String(b.description || '').slice(0, 800),
        String(b.author || '').slice(0, 60),
        String(b.grade || '').slice(0, 10),
        String(b.subject || '').slice(0, 30),
        JSON.stringify(b.blocks),
        b.published ? 1 : 0,
        now,
        slug,
      );
      return res.json({ ok: true, slug, updated: true });
    }
    // CREATE new
    let attempts = 0;
    while (attempts < 10) {
      slug = genSlug(6);
      const exist = await db.prepare('SELECT id FROM lessons WHERE slug=?').get(slug);
      if (!exist) break;
      attempts++;
    }
    await db.prepare(`
      INSERT INTO lessons (slug, title, description, author, grade, subject, blocks_json, published, views, likes, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,0,0,?,?)
    `).run(
      slug, title,
      String(b.description || '').slice(0, 800),
      String(b.author || '').slice(0, 60),
      String(b.grade || '').slice(0, 10),
      String(b.subject || '').slice(0, 30),
      JSON.stringify(b.blocks),
      b.published ? 1 : 0,
      now, now,
    );
    res.json({ ok: true, slug, created: true });
  });

  // READ ONE
  r.get('/api/lessons/:slug', async (req, res) => {
    const slug = req.params.slug;
    const row = await db.prepare('SELECT * FROM lessons WHERE slug=?').get(slug);
    if (!row) return res.status(404).json({ error: 'not found' });
    // Bump view if not author looking
    await db.prepare('UPDATE lessons SET views = views + 1 WHERE slug=?').run(slug);
    res.json({
      slug: row.slug, title: row.title, description: row.description,
      author: row.author, grade: row.grade, subject: row.subject,
      blocks: safeParse(row.blocks_json),
      published: !!row.published,
      views: row.views + 1, likes: row.likes,
      createdAt: row.created_at, updatedAt: row.updated_at,
    });
  });

  // DELETE
  r.delete('/api/lessons/:slug', async (req, res) => {
    const slug = req.params.slug;
    await db.prepare('DELETE FROM lessons WHERE slug=?').run(slug);
    await db.prepare('DELETE FROM lesson_likes WHERE slug=?').run(slug);
    await db.prepare('DELETE FROM lesson_comments WHERE slug=?').run(slug);
    res.json({ ok: true });
  });

  // LIST published (marketplace)
  r.get('/api/lessons', async (req, res) => {
    const subject = String(req.query.subject || '').trim();
    const grade = String(req.query.grade || '').trim();
    const sort = String(req.query.sort || 'recent'); // recent | likes | views
    const q = String(req.query.q || '').trim();
    const limit = Math.min(Math.max(Number(req.query.limit) || 30, 1), 100);

    let sql = `SELECT slug, title, description, author, grade, subject, views, likes, created_at, updated_at FROM lessons WHERE published = 1`;
    const params = [];
    if (subject) { sql += ' AND subject = ?'; params.push(subject); }
    if (grade)   { sql += ' AND grade = ?'; params.push(grade); }
    if (q)       { sql += ' AND (title LIKE ? OR description LIKE ?)'; params.push('%' + q + '%', '%' + q + '%'); }
    sql += ' ORDER BY ' + (
      sort === 'likes' ? 'likes DESC, created_at DESC' :
      sort === 'views' ? 'views DESC, created_at DESC' :
      'created_at DESC'
    ) + ' LIMIT ?';
    params.push(limit);

    const rows = await db.prepare(sql).all(...params);
    res.json({ items: rows, total: rows.length });
  });

  // LIKE (toggle)
  r.post('/api/lessons/:slug/like', async (req, res) => {
    const slug = req.params.slug;
    const userKey = String(req.body?.userKey || req.ip || '').slice(0, 80);
    if (!userKey) return res.status(400).json({ error: 'userKey required' });
    const existing = await db.prepare('SELECT * FROM lesson_likes WHERE slug=? AND user_key=?').get(slug, userKey);
    if (existing) {
      await db.prepare('DELETE FROM lesson_likes WHERE slug=? AND user_key=?').run(slug, userKey);
      await db.prepare('UPDATE lessons SET likes = likes - 1 WHERE slug=? AND likes > 0').run(slug);
      return res.json({ ok: true, liked: false });
    }
    await db.prepare('INSERT INTO lesson_likes (slug, user_key, created_at) VALUES (?,?,?)').run(slug, userKey, Date.now());
    await db.prepare('UPDATE lessons SET likes = likes + 1 WHERE slug=?').run(slug);
    res.json({ ok: true, liked: true });
  });

  // COMMENTS
  r.get('/api/lessons/:slug/comments', async (req, res) => {
    const slug = req.params.slug;
    const rows = await db.prepare(`
      SELECT id, author, text, created_at FROM lesson_comments WHERE slug=?
      ORDER BY created_at DESC LIMIT 50
    `).all(slug);
    res.json({ items: rows });
  });
  r.post('/api/lessons/:slug/comments', async (req, res) => {
    const slug = req.params.slug;
    const text = String(req.body?.text || '').trim().slice(0, 500);
    const author = String(req.body?.author || 'Ẩn danh').trim().slice(0, 40);
    if (!text) return res.status(400).json({ error: 'text required' });
    const exists = await db.prepare('SELECT id FROM lessons WHERE slug=?').get(slug);
    if (!exists) return res.status(404).json({ error: 'lesson not found' });
    await db.prepare(`
      INSERT INTO lesson_comments (slug, author, text, created_at) VALUES (?,?,?,?)
    `).run(slug, author, text, Date.now());
    res.json({ ok: true });
  });
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return []; }
}
