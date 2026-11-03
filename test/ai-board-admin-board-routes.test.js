// Admin suggestion list and detail read the board DB: list, thread, decisions, answer clarification.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { attachAiBoardRequestRoutes } from '../server/ai-board/api/routes.js';

async function serve(overrides = {}) {
  const runs = [];
  const store = {
    db: { run: async (...args) => { runs.push(args); } },
    listAdminRequests: async () => [{ id: 22, title: 'Thêm bảng FAQ', status: 'pending', ticket_phase: 'needs_replan' }],
    queryGet: async (sql) => (String(sql).includes('FROM requests')
      ? { id: 22, domain: 'it', type: 'ui', title: 'Thêm bảng FAQ', status: 'pending', student: 'localtest', detail: 'x', created_at: 1, updated_at: 2 }
      : { id: 80 }),
    queryAll: async () => [{ id: 1, role: 'student', author_name: 'localtest', body: 'nội dung', attachments: '[]', created_at: 3 }],
    ...overrides,
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
    runs,
    get: (path) => fetch(`${base}${path}`),
    post: (path, body) => fetch(`${base}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

test('the suggestion list comes from the board store', async () => {
  const srv = await serve();
  try {
    const response = await srv.get('/api/admin/ai-board/requests?limit=10');
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.requests[0].id, 22);
  } finally { await srv.close(); }
});

test('thread and decisions read the board request and never 404 for an existing one', async () => {
  const srv = await serve();
  try {
    const thread = await (await srv.get('/api/admin/ai-board/requests/22/thread')).json();
    assert.equal(thread.request.id, 22);
    assert.equal(thread.messages[0].role, 'student');
    assert.equal(thread.messages.length, 2);
    const decisions = await (await srv.get('/api/admin/ai-board/requests/22/decisions')).json();
    assert.deepEqual(decisions.decisions, []);
    const missing = await serve({ queryGet: async () => null });
    try {
      assert.equal((await missing.get('/api/admin/ai-board/requests/404/thread')).status, 404);
    } finally { await missing.close(); }
  } finally { await srv.close(); }
});

test('an admin answer is stored and the root is queued for a new plan', async () => {
  const srv = await serve();
  try {
    assert.equal((await srv.post('/api/admin/ai-board/requests/22/clarify', { answer: 'ok' })).status, 422);
    const good = await srv.post('/api/admin/ai-board/requests/22/clarify', { answer: 'Chỉ cần migration và API.' });
    assert.equal(good.status, 200);
    assert.deepEqual(await good.json(), { ok: true, status: 'queued', phase: 'needs_replan' });
    assert.equal(srv.runs.length, 3);
    assert.match(String(srv.runs[1][0]), /UPDATE ai_tickets SET status='queued'/);
  } finally { await srv.close(); }
});

test('a missing board request is refused, not queued', async () => {
  const srv = await serve({ queryGet: async () => null });
  try {
    assert.equal((await srv.post('/api/admin/ai-board/requests/404/clarify', { answer: 'đủ dài' })).status, 404);
    assert.equal(srv.runs.length, 0);
  } finally { await srv.close(); }
});
