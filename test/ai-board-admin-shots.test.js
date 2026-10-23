// Trang ảnh nháp (admin): chỉ admin, gom theo yêu cầu từ attachments JSON, phân trang, link qua proxy.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardShots, listShotGroups, parseShots, PAGE_SIZE } from '../server/contexts/ai-board-shots/index.js';

const shot = (n, extra = {}) => ({ url: `/uploads/requests/2026-10-24/${n}-abcdef0123${String(n).padStart(2, '0')}.png`, name: `shot ${n}`, mime: 'image/png', kind: 'screenshot', ...extra });

async function fixture() {
  const db = await openBoard({ users: [[1, 'admin', 'Admin', 'admin', 'it'], [2, 'lan', 'Lan', 'pupil', 'it']] });
  const req = db.d;
  const addRequest = (id, title) => req.run('INSERT INTO requests(id, domain, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [id, 'it', title, 1000 + id, 1000 + id]);
  const addMessage = (requestId, createdAt, attachments) => req.run(
    'INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [requestId, 'ai', 'Ban', 'shot', attachments === undefined ? null : JSON.stringify(attachments), createdAt]);
  return { db: req, addRequest, addMessage };
}

async function serve(db, user) {
  const app = express();
  app.use((req, _res, next) => { req.user = user; next(); });
  const requireAuth = (req, res, next) => (req.user ? next() : res.status(401).json({ error: 'unauthorized' }));
  const requireAdmin = (req, res, next) => (req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }));
  attachAiBoardShots(app, { db, requireAuth, requireAdmin });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { get: (path) => fetch(base + path), close: () => new Promise((resolve) => server.close(resolve)) };
}

test('parseShots: chỉ giữ screenshot có URL proxy hợp lệ, JSON hỏng → rỗng', () => {
  const raw = JSON.stringify([
    shot(1),
    { url: '/uploads/requests/2026-10-24/x.png', name: 'bad', kind: 'screenshot' },
    { url: 'http://seaweedfs:8333/bucket/2026-10-24/1-abcdef012301.png', name: 'raw s3', kind: 'screenshot' },
    { url: '/uploads/requests/2026-10-24/1-abcdef012301.png', name: 'file', mime: 'application/pdf' },
  ]);
  assert.deepEqual(parseShots(raw), [{ url: shot(1).url, name: 'shot 1' }]);
  assert.deepEqual(parseShots('{not json'), []);
  assert.deepEqual(parseShots(null), []);
});

test('listShotGroups: gom theo yêu cầu, mới nhất trước, bỏ yêu cầu không có ảnh', async () => {
  const { db, addRequest, addMessage } = await fixture();
  await addRequest(1, 'Yêu cầu cũ');
  await addRequest(2, 'Yêu cầu mới');
  await addRequest(3, 'Chỉ có chữ');
  await addMessage(1, 100, [shot(1)]);
  await addMessage(2, 200, [shot(2), shot(3)]);
  await addMessage(2, 300, [shot(4)]);
  await addMessage(3, 400, [{ url: '/x.png', kind: 'file' }]);
  await addMessage(3, 500, null);
  const page = await listShotGroups(db);
  assert.equal(page.total, 2);
  assert.equal(page.pages, 1);
  assert.deepEqual(page.groups.map((g) => g.title), ['Yêu cầu mới', 'Yêu cầu cũ']);
  assert.deepEqual(page.groups[0].shots.map((s) => s.name), ['shot 4', 'shot 2', 'shot 3']);
  assert.equal(page.groups[0].shots[0].created_at, 300);
});

test('listShotGroups: phân trang theo yêu cầu, trang vượt quá bị kẹp về trang cuối', async () => {
  const { db, addRequest, addMessage } = await fixture();
  const n = PAGE_SIZE + 2;
  for (let i = 1; i <= n; i++) {
    await addRequest(i, `Yêu cầu ${i}`);
    await addMessage(i, 1000 + i, [shot(i % 90 + 1)]);
  }
  const first = await listShotGroups(db, 1);
  const second = await listShotGroups(db, 2);
  assert.equal(first.pages, 2);
  assert.equal(first.total, n);
  assert.equal(first.groups.length, PAGE_SIZE);
  assert.equal(second.groups.length, 2);
  assert.equal(second.groups[0].request_id, 2);
  assert.equal(new Set([...first.groups, ...second.groups].map((g) => g.request_id)).size, n);
  assert.equal((await listShotGroups(db, 99)).page, 2);
  assert.equal((await listShotGroups(db, -3)).page, 1);
});

test('listShotGroups: DB trống → không lỗi, trang 1/1', async () => {
  const { db } = await fixture();
  assert.deepEqual(await listShotGroups(db), { page: 1, pages: 1, total: 0, groups: [] });
});

test('route: admin xem được, owner (pupil) bị 403, chưa đăng nhập bị 401', async () => {
  const { db, addRequest, addMessage } = await fixture();
  await addRequest(1, 'Yêu cầu');
  await addMessage(1, 100, [shot(1)]);
  const admin = await serve(db, { id: 1, role: 'admin' });
  const owner = await serve(db, { id: 2, role: 'pupil' });
  const anon = await serve(db, null);
  try {
    const ok = await admin.get('/api/admin/ai-board/shots');
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).groups[0].title, 'Yêu cầu');
    assert.equal((await owner.get('/api/admin/ai-board/shots')).status, 403);
    assert.equal((await anon.get('/api/admin/ai-board/shots')).status, 401);
  } finally {
    await Promise.all([admin.close(), owner.close(), anon.close()]);
  }
});

test('route: link ảnh luôn là đường dẫn proxy, không lộ URL SeaweedFS', async () => {
  const { db, addRequest, addMessage } = await fixture();
  await addRequest(1, 'Yêu cầu');
  await addMessage(1, 100, [shot(1), { url: 'http://tizia-seaweedfs:8333/b/2026-10-24/1-abcdef012301.png', kind: 'screenshot', name: 'raw' }]);
  const srv = await serve(db, { id: 1, role: 'admin' });
  try {
    const body = JSON.stringify(await (await srv.get('/api/admin/ai-board/shots?page=1')).json());
    assert.match(body, /"url":"\/uploads\/requests\//);
    assert.doesNotMatch(body, /seaweedfs|8333|9333|8888/);
  } finally {
    await srv.close();
  }
});
