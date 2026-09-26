// Feature-folders ticket 10: an approved folder gets a release flag (owner_only | school | off) that decides who
// sees its tile on the school page and who can open /<slug>.html; admins always see, and change it with CSRF.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore } from '../server/ai-board/store.js';
import { setReleaseStatus } from '../server/ai-board/releases.js';
import { attachAiBoardReleases } from '../server/contexts/ai-board-releases/index.js';
import { csrf, requireStrictCsrf } from '../server/contexts/security/index.js';

const USERS = {
  1: { id: 1, role: 'student', enrolled_domain: 'it' }, // owner
  2: { id: 2, role: 'student', enrolled_domain: 'it' },
  3: { id: 3, role: 'student', enrolled_domain: 'pharmacy' },
  9: { id: 9, role: 'admin', enrolled_domain: null },
};

async function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'x',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'an', 'An', 'student', 'it'), (2, 'binh', 'Bình', 'student', 'it'),
      (3, 'lan', 'Lan', 'student', 'pharmacy'), (9, 'ad', 'Ad', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  const { folder_id: folderId } = store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'An', idempotencyKey: 'release-request-001',
    title: 'Trò đoán từ khoá', detail: 'x', type: 'feature',
  });
  store.approveFolder(folderId, 9);
  const slug = db.prepare('SELECT slug FROM ai_feature_folders WHERE id=?').get(folderId).slug;

  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = USERS[req.headers['x-user']] || null; next(); });
  app.use(csrf);
  const requireAdmin = (req, res, next) => (req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }));
  attachAiBoardReleases(app, { db, requireAuth: (_q, _s, next) => next(), requireAdmin, requireStrictCsrf });
  app.use((_req, res) => res.send('PAGE OK')); // như express.static phía sau
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (user, method, path, body, headers = {}) => {
    const res = await fetch(base + path, {
      method, headers: { 'content-type': 'application/json', 'x-user': String(user), ...headers },
      body: body && JSON.stringify(body),
    });
    const text = await res.text();
    return { status: res.status, text, json: text.startsWith('{') ? JSON.parse(text) : null, cookie: res.headers.get('set-cookie') };
  };
  const list = async (user, q = '') => (await call(user, 'GET', `/api/ai-board/releases${q}`)).json.releases;
  const page = (user, path = `/${slug}.html`) => call(user, 'GET', path);
  const close = () => new Promise((resolve) => server.close(resolve));
  return { db, store, folderId, slug, call, list, page, close };
}

test('approval registers owner_only once: owner and admin see it, a classmate does not', async () => {
  const f = await fixture();
  try {
    assert.deepEqual(await f.list(1), [{ slug: f.slug, title: 'Trò đoán từ khoá', url: `/${f.slug}.html`, status: 'owner_only' }]);
    assert.deepEqual(await f.list(2), []);
    assert.equal((await f.list(9, '?domain=')).length, 1);

    const hidden = await f.page(2);
    assert.equal(hidden.status, 403);
    assert.match(hidden.text, /chưa phát hành/);
    assert.equal((await f.page(2, `/${f.slug}`)).status, 403, 'extensionless url gated too');
    assert.equal((await f.page(1)).text, 'PAGE OK');
    assert.equal((await f.page(2, '/other.html')).text, 'PAGE OK', 'unregistered pages untouched');

    setReleaseStatus(f.db, f.slug, 'school', 9);
    f.store.approveFolder(f.folderId, 9); // duyệt lại: không reset status
    assert.equal((await f.list(1))[0].status, 'school');
  } finally { await f.close(); }
});

test('school release: everyone enrolled in that school sees it, other schools do not', async () => {
  const f = await fixture();
  try {
    setReleaseStatus(f.db, f.slug, 'school', 9);
    assert.equal((await f.list(2)).length, 1);
    assert.deepEqual(await f.list(3, '?domain=it'), []);
    assert.equal((await f.page(2)).text, 'PAGE OK');
    assert.equal((await f.page(3)).status, 403);
  } finally { await f.close(); }
});

test('off hides it even from the owner; the admin still sees and opens it', async () => {
  const f = await fixture();
  try {
    setReleaseStatus(f.db, f.slug, 'off', 9);
    assert.deepEqual(await f.list(1), []);
    assert.equal((await f.page(1)).status, 403);
    assert.equal((await f.list(9, '?domain=it'))[0].status, 'off');
    assert.equal((await f.page(9)).text, 'PAGE OK');
  } finally { await f.close(); }
});

test('status route needs admin and a valid CSRF token', async () => {
  const f = await fixture();
  try {
    const token = /tizia_csrf=([^;]+)/.exec((await f.call(9, 'GET', '/api/ai-board/releases')).cookie)[1];
    const withCsrf = { cookie: `tizia_csrf=${token}`, 'x-csrf-token': token };
    const route = `/api/admin/ai-board/releases/${f.slug}`;
    assert.equal((await f.call(1, 'POST', route, { status: 'school' }, withCsrf)).status, 403);
    assert.equal((await f.call(9, 'POST', route, { status: 'school' })).json.error, 'csrf_failed');
    assert.equal((await f.call(9, 'POST', route, { status: 'public' }, withCsrf)).status, 400);
    assert.equal((await f.call(9, 'POST', '/api/admin/ai-board/releases/nope', { status: 'off' }, withCsrf)).status, 404);
    assert.equal((await f.call(9, 'POST', route, { status: 'school' }, withCsrf)).status, 200);
    assert.equal((await f.list(2)).length, 1);
  } finally { await f.close(); }
});
