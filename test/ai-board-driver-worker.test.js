// Contract for GET /api/admin/ai-board/driver/worker: admin-only, public fields, redaction, fixed SQL, caps.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import express from 'express';
import { publicWorker, safeText, attachAiBoardDriverApi } from '../server/contexts/ai-board-driver/index.js';

const SECRET_PATTERN = /(key|token|secret|password|bearer|authorization)/i;

function fakeApp(row) {
  const calls = [];
  const db = { get: async (sql, params) => { calls.push({ sql, params }); return row; } };
  const requireAuth = (req, res, next) => (req.get('x-test-user') ? next() : res.status(401).json({ error: 'unauthorized' }));
  const requireAdmin = (req, res, next) => (req.get('x-test-role') === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }));
  const app = express();
  attachAiBoardDriverApi(app, { db, requireAuth, requireAdmin });
  return { app, calls };
}

async function serve(app, path, headers = {}) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((ready) => server.once('listening', ready));
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}${path}`, { headers });
    return { status: res.status, text: await res.text() };
  } finally {
    await new Promise((done) => server.close(done));
  }
}

const ROW = { worker_id: 'w1', version: 'v1', mode: 'active', status: 'waiting_gpu', current_ticket_id: null,
  last_seen_at: 123, gpu_busy_model: 'model', gpu_retry_at: 999, gpu_error: 'token leaked' };

test('anonymous caller gets 401 and no row is read', async () => {
  const { app, calls } = fakeApp(ROW);
  const r = await serve(app, '/api/admin/ai-board/driver/worker');
  assert.equal(r.status, 401);
  assert.equal(calls.length, 0);
});

test('non-admin caller gets 403 and no row is read', async () => {
  const { app, calls } = fakeApp(ROW);
  const r = await serve(app, '/api/admin/ai-board/driver/worker', { 'x-test-user': '7', 'x-test-role': 'student' });
  assert.equal(r.status, 403);
  assert.equal(calls.length, 0);
});

test('admin gets 200 with redacted, public-only fields', async () => {
  const { app } = fakeApp(ROW);
  const r = await serve(app, '/api/admin/ai-board/driver/worker', { 'x-test-user': '1', 'x-test-role': 'admin' });
  assert.equal(r.status, 200);
  const body = JSON.parse(r.text);
  assert.equal(body.gpu_error, '[redacted]');
  assert.equal(body.flags, null);
  assert.equal(SECRET_PATTERN.test(r.text.replace(/"flags":null/, '')), false);
});

test('unknown driver path is 404 for admin', async () => {
  const { app } = fakeApp(ROW);
  const r = await serve(app, '/api/admin/ai-board/driver/nope', { 'x-test-user': '1', 'x-test-role': 'admin' });
  assert.equal(r.status, 404);
});

test('query is fixed and parameter-free, LIMIT 1', async () => {
  const { app, calls } = fakeApp(null);
  const r = await serve(app, '/api/admin/ai-board/driver/worker', { 'x-test-user': '1', 'x-test-role': 'admin' });
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].params, undefined);
  assert.match(calls[0].sql, /LIMIT 1/);
  assert.equal(/\$\{|\+\s*['"]/.test(calls[0].sql), false);
});

test('safeText redacts key/token-like values and caps length', () => {
  assert.equal(safeText('api_key=abc'), '[redacted]');
  assert.equal(safeText('Bearer xyz'), '[redacted]');
  assert.equal(safeText('x'.repeat(500)).length, 300);
  assert.equal(safeText(null), null);
});

test('publicWorker drops unknown fields and null row is null', () => {
  const out = publicWorker({ ...ROW, extra: 'nope' });
  assert.equal('extra' in out, false);
  assert.equal(out.last_seen_at, 123);
  assert.equal(publicWorker(null), null);
});

test('aiboard-server mounts the driver API behind requireAuth and requireAdmin', () => {
  const src = readFileSync(new URL('../server/aiboard-server.js', import.meta.url), 'utf8');
  assert.match(src, /attachAiBoardDriverApi\(app, \{ db: handle\.d, requireAuth, requireAdmin \}\)/);
});
