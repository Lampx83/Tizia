// Split stack: admin overview counts decisions from the board; a failed board decision write is retried exactly once.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createHmac, randomBytes } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import express from 'express';
import pg from 'pg';

const PG_URL = process.env.TEST_PG_URL || '';
if (!PG_URL) throw new Error('TEST_PG_URL is required: the test suite runs on a throwaway PostgreSQL');

const decisions = new Map();
const board = { failDecisions: false, decisionPosts: 0 };
const server = http.createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const body = raw ? JSON.parse(raw) : null;
    const send = (status, data) => { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(data)); };
    if (req.method === 'GET' && req.url === '/api/admin/ai-board/requests/7/thread') {
      return send(200, { request: { id: 7, domain: 'pharmacy', title: 'Thêm bộ thẻ thuốc', student: 'Lan', status: 'pending' }, messages: [] });
    }
    if (req.method === 'POST' && req.url === '/api/requests/7/status') return send(200, { ok: true });
    if (req.method === 'POST' && req.url === '/api/requests/7/messages') return send(200, { ok: true });
    if (req.method === 'POST' && req.url === '/api/admin/ai-board/requests/7/decisions') {
      board.decisionPosts++;
      if (board.failDecisions) return send(503, { error: 'down' });
      const key = String(body.idempotency_key || '');
      const duplicate = decisions.has(key);
      if (!duplicate) decisions.set(key, body);
      return send(200, { ok: true, id: decisions.size, duplicate });
    }
    if (req.method === 'GET' && req.url.startsWith('/api/admin/ai-board/decisions')) return send(200, { decisions: [], total: decisions.size });
    send(404, { error: 'no_route' });
  });
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

const schema = `t_${randomBytes(5).toString('hex')}`;
const owner = new pg.Client({ connectionString: PG_URL });
await owner.connect();
await owner.query(`CREATE SCHEMA ${schema}`);
const url = new URL(PG_URL);
url.searchParams.set('options', `-c search_path=${schema}`);
process.env.DATABASE_URL = url.toString();
process.env.AI_BOARD_SERVER_URL = `http://127.0.0.1:${server.address().port}`;
process.env.AI_BOARD_INTERNAL_SECRET = 'test-board-secret';
const dir = mkdtempSync(path.join(tmpdir(), 'tizia-split-followups-'));
process.env.DATA_DIR = dir;
delete process.env.CSRF_SECRET;

const { db } = await import('../server/db.js');
const { attachAdmin } = await import('../server/contexts/admin/index.js');

const raw = 'c'.repeat(40);
const CSRF = `${raw}.${createHmac('sha256', 'dev-csrf-secret-change-me').update(raw).digest('hex').slice(0, 16)}`;
const app = express();
app.use(express.json());
app.use((req, _res, next) => { req.user = { id: 9, username: 'admin', display_name: 'Admin', role: 'admin' }; req.csrfToken = CSRF; next(); });
const router = express.Router();
await attachAdmin(router);
app.use(router);
const web = http.createServer(app);
await new Promise((resolve) => web.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${web.address().port}`;
const reply = (headers = {}) => fetch(`${base}/api/admin/requests/7/reply`, {
  method: 'POST', headers: { 'content-type': 'application/json', 'x-csrf-token': CSRF, ...headers },
  body: JSON.stringify({ status: 'done', message: 'Đã xong nhé.' }),
});

test('overview and overview2 read the decision count from the board', async () => {
  decisions.set('seed-1', {}); decisions.set('seed-2', {});
  for (const p of ['overview', 'overview2']) assert.equal((await (await fetch(`${base}/api/admin/${p}`)).json()).ai_decisions, 2, p);
  decisions.clear();
});

test('board decision write fails then recovers: one decision, retried on the next request', async () => {
  board.failDecisions = true; board.decisionPosts = 0;
  assert.equal((await reply({ 'idempotency-key': 'retry-key-0001' })).status, 200);
  assert.equal(decisions.size, 0);
  const queued = await db.d.get(`SELECT status, attempts FROM board_decision_outbox WHERE idempotency_key=?`, ['retry-key-0001']);
  assert.equal(queued.status, 'pending');

  board.failDecisions = false;
  await db.d.run(`UPDATE board_decision_outbox SET next_attempt_at = 0`);
  assert.equal((await reply({ 'idempotency-key': 'retry-key-0002' })).status, 200);
  for (let i = 0; i < 50 && (await db.d.get(`SELECT status FROM board_decision_outbox WHERE idempotency_key=?`, ['retry-key-0001'])).status !== 'done'; i++) {
    await new Promise((r) => setTimeout(r, 50));
  }
  assert.deepEqual([...decisions.keys()].sort(), ['retry-key-0001', 'retry-key-0002']);
  assert.equal((await db.d.get(`SELECT status FROM board_decision_outbox WHERE idempotency_key=?`, ['retry-key-0001'])).status, 'done');
});

test('reply without idempotency-key still gets a stable generated key', async () => {
  board.failDecisions = true;
  await reply();
  board.failDecisions = false;
  const row = await db.d.get(`SELECT idempotency_key FROM board_decision_outbox WHERE idempotency_key LIKE 'reply-7-%'`);
  assert.ok(row);
});

test.after(async () => {
  await new Promise((resolve) => { web.close(resolve); web.closeAllConnections(); });
  await new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); });
  await db.close();
  await owner.query(`DROP SCHEMA ${schema} CASCADE`);
  await owner.end();
  rmSync(dir, { recursive: true, force: true });
  setTimeout(() => process.exit(0), 200).unref();
});
