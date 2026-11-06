// Admin /clarify goes through the store lifecycle op; route test needs no SQL fixtures (no PostgreSQL).
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import express from 'express';
import { attachAiBoardRequestRoutes } from '../server/ai-board/api/routes.js';

const ROUTES_SRC = fs.readFileSync(new URL('../server/ai-board/api/routes.js', import.meta.url), 'utf8');

async function serve(answerClarification) {
  const calls = [];
  const store = {
    answerClarification: async (id, answer) => { calls.push([id, answer]); return answerClarification(id); },
  };
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 9, role: 'admin' }; next(); });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, { store, requireAuth: pass, requireEnrolled: pass, requireAdmin: pass,
    requireStrictCsrf: pass, classifyRequest: async () => null });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    calls,
    post: (path, body) => fetch(`${base}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

test('admin clarify delegates to the store op and relays its result', async () => {
  const srv = await serve(() => ({ ok: true, status: 'queued', phase: 'needs_replan' }));
  try {
    const response = await srv.post('/api/admin/ai-board/requests/22/clarify', { answer: '  Dùng bảng FAQ  ' });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, status: 'queued', phase: 'needs_replan' });
    assert.deepEqual(srv.calls, [['22', 'Dùng bảng FAQ']]);
  } finally {
    await srv.close();
  }
});

test('admin clarify returns 404 when the store op finds no root', async () => {
  const srv = await serve(() => null);
  try {
    const response = await srv.post('/api/admin/ai-board/requests/404/clarify', { answer: 'câu trả lời' });
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error, 'request_not_found');
  } finally {
    await srv.close();
  }
});

test('admin clarify rejects a short answer before touching the store', async () => {
  const srv = await serve(() => { throw new Error('store must not run'); });
  try {
    const response = await srv.post('/api/admin/ai-board/requests/22/clarify', { answer: 'ok' });
    assert.equal(response.status, 422);
    assert.equal(srv.calls.length, 0);
  } finally {
    await srv.close();
  }
});

test('admin clarify handler holds no SQL: the transition lives in the store', () => {
  const start = ROUTES_SRC.indexOf("'/api/admin/ai-board/requests/:id/clarify'");
  const end = ROUTES_SRC.indexOf('const traceModel', start);
  assert.ok(start > 0 && end > start, 'clarify handler not found');
  const handler = ROUTES_SRC.slice(start, end);
  assert.doesNotMatch(handler, /\b(SELECT|INSERT|UPDATE|DELETE)\b|store\.db|queryGet|needs_replan/);
});
