// Split stack: web keeps its own schema (no AI board tables) and reads board data through aiboard-server.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHmac, randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import express from 'express';
import pg from 'pg';
import { verifyInternalHeaders } from '../server/ai-board/internal-auth.js';

const PG_URL = process.env.TEST_PG_URL || '';
if (!PG_URL) throw new Error('TEST_PG_URL is required: the test suite runs on a throwaway PostgreSQL');

const SECRET = 'test-board-secret';
const calls = [];
let signed = false;

// Board stand-in: the replies the web endpoint is allowed to rely on.
const board = http.createServer((req, res) => {
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; });
  req.on('end', () => {
    signed = verifyInternalHeaders(req.headers, SECRET).ok;
    calls.push({ method: req.method, url: req.url, body: raw ? JSON.parse(raw) : null });
    const send = (status, data) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(data)); };
    if (req.method === 'GET' && req.url === '/api/admin/ai-board/requests/7/thread') {
      return send(200, { request: { id: 7, domain: 'pharmacy', title: 'Thêm bộ thẻ thuốc', student: 'Lan', status: 'pending' }, messages: [] });
    }
    if (req.method === 'POST' && req.url === '/api/requests/7/status') return send(200, { ok: true });
    if (req.method === 'POST' && req.url === '/api/requests/7/messages') return send(200, { ok: true, message_id: 1 });
    if (req.method === 'GET' && req.url === '/api/admin/ai-board/requests/8/thread') return send(404, { error: 'not_found' });
    send(404, { error: 'no_route' });
  });
});
await new Promise((resolve) => board.listen(0, '127.0.0.1', resolve));

// Fresh schema without the board migrations, split mode on before db.js reads env.
const schema = `t_${randomBytes(5).toString('hex')}`;
const schemaOwner = new pg.Client({ connectionString: PG_URL });
await schemaOwner.connect();
await schemaOwner.query(`CREATE SCHEMA ${schema}`);
const url = new URL(PG_URL);
url.searchParams.set('options', `-c search_path=${schema}`);
process.env.DATABASE_URL = url.toString();
process.env.AI_BOARD_SERVER_URL = `http://127.0.0.1:${board.address().port}`;
process.env.AI_BOARD_INTERNAL_SECRET = SECRET;
const dir = mkdtempSync(path.join(tmpdir(), 'tizia-board-split-'));
process.env.DATA_DIR = dir;
delete process.env.CSRF_SECRET;

const { db } = await import('../server/db.js');
await import('../server/contexts/ai-agent/decisions.js');
const { attachAdmin } = await import('../server/contexts/admin/index.js');
const { attachAiBoardReleases } = await import('../server/contexts/ai-board-releases/index.js');
const { boardIsSplit, BOARD_SPLIT } = await import('../server/board-split.js');

const raw = 'b'.repeat(40);
const CSRF = `${raw}.${createHmac('sha256', 'dev-csrf-secret-change-me').update(raw).digest('hex').slice(0, 16)}`;

async function serve() {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 9, username: 'admin', display_name: 'Admin', role: 'admin' }; req.csrfToken = CSRF; next(); });
  const router = express.Router();
  await attachAdmin(router);
  app.use(router);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    get: (p) => fetch(`${base}${p}`),
    post: (p, body) => fetch(`${base}${p}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-csrf-token': CSRF }, body: JSON.stringify(body) }),
    del: (p) => fetch(`${base}${p}`, { method: 'DELETE', headers: { 'x-csrf-token': CSRF } }),
    close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }),
  };
}

test('split detection needs both proxy values', () => {
  assert.equal(BOARD_SPLIT, true);
  assert.equal(boardIsSplit({ AI_BOARD_SERVER_URL: 'http://board:8081', AI_BOARD_INTERNAL_SECRET: 's' }), true);
  assert.equal(boardIsSplit({ AI_BOARD_SERVER_URL: 'http://board:8081' }), false);
  assert.equal(boardIsSplit({ AI_BOARD_INTERNAL_SECRET: 's' }), false);
  assert.equal(boardIsSplit({}), false);
});

test('web boot creates no AI board tables in split mode', async () => {
  const names = ['ai_feature_releases', 'ai_tickets', 'ai_gate_traces', 'graph_checkpoint', 'tool_run', 'skill_proposals', 'gate_trace'];
  const rows = await db.d.all(`SELECT table_name AS name FROM information_schema.tables
    WHERE table_schema = current_schema() AND table_name = ANY(?)`, [names]);
  assert.deepEqual(rows.map((r) => r.name), []);
  assert.ok(await db.tableExists('users'));
});

test('admin board aggregates read as empty, not an error', async () => {
  const api = await serve();
  try {
    const count = await (await api.get('/api/admin/requests/count')).json();
    assert.deepEqual(count, { requests: 0, requests_pending: 0 });
    const list = await (await api.get('/api/admin/requests')).json();
    assert.deepEqual(list, { requests: [], total: 0 });
    const ov = await (await api.get('/api/admin/overview2')).json();
    assert.equal(ov.requests, 0);
    assert.equal(ov.delta.requests_24h, 0);
  } finally { await api.close(); }
});

test('admin reply writes through the board API and keeps the web bell', async () => {
  calls.length = 0; signed = false;
  const api = await serve();
  try {
    const res = await api.post('/api/admin/requests/7/reply', { status: 'done', message: 'Đã xong nhé.' });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'done');
    assert.equal(body.notified, true);
    assert.equal(signed, true);
    assert.deepEqual(calls.map((c) => `${c.method} ${c.url}`), [
      'GET /api/admin/ai-board/requests/7/thread',
      'POST /api/requests/7/status',
      'POST /api/requests/7/messages',
    ]);
    assert.equal(calls[1].body.status, 'done');
    assert.equal(calls[1].body.confirm, '7');
    assert.equal(calls[2].body.body, 'Đã xong nhé.');
    const decision = await db.prepare('SELECT status_applied, decided_by FROM ai_decisions WHERE request_id=?').get(7);
    assert.equal(decision.status_applied, 'done');
    assert.equal(decision.decided_by, 'human');
    assert.equal(await (await db.prepare("SELECT COUNT(*) n FROM notifications WHERE request_id=?").get(7)).n, 1);
  } finally { await api.close(); }
});

test('admin reply for a request the board does not know is 404', async () => {
  const api = await serve();
  try {
    const res = await api.post('/api/admin/requests/8/reply', { status: 'done', message: 'Đã xong nhé.' });
    assert.equal(res.status, 404);
    assert.equal((await res.json()).error, 'request_not_found');
  } finally { await api.close(); }
});

test('deleting a board request is refused instead of querying a missing table', async () => {
  const api = await serve();
  try {
    const res = await api.del('/api/admin/requests/7');
    assert.equal(res.status, 409);
    assert.equal((await res.json()).error, 'request_managed_by_board');
  } finally { await api.close(); }
});

test('the release page gate never queries a board table in split mode', async () => {
  const app = express();
  app.use((req, _res, next) => { req.user = { id: 9, role: 'student' }; next(); });
  const router = express.Router();
  attachAiBoardReleases(router, { db: db.d, requireAuth: (_q, _s, n) => n(), requireAdmin: (_q, _s, n) => n(), requireStrictCsrf: (_q, _s, n) => n() });
  router.get('/school', (_req, res) => res.type('html').send('<h1>school</h1>'));
  app.use(router);
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/school`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /school/);
  } finally { await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }); }
});

test.after(async () => {
  await db.close();
  await new Promise((resolve) => { board.close(resolve); board.closeAllConnections?.(); });
  await schemaOwner.query(`DROP SCHEMA ${schema} CASCADE`);
  await schemaOwner.end();
  rmSync(dir, { recursive: true, force: true });
  // Importing the admin module starts non-unref'd timers.
  setTimeout(() => process.exit(0), 200).unref();
});
