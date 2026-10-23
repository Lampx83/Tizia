// Yêu cầu loại `self` đã tắt: worker và FAB đều bị từ chối, file skill/prompt chỉ đổi bằng commit người hoặc upload admin.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { PlanGuardrailError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SKILL = 'ai-board/harness/skills/edit-html-text/SKILL.md';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'it'],
    [9, 'boss', 'Boss', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  const app = express();
  app.use(express.json());
  app.use(async (req, _res, next) => {
    const id = Number(req.headers['x-test-user']);
    if (id) req.user = await db.prepare('SELECT * FROM users WHERE id=?').get(id);
    next();
  });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store, requireAuth: (req, res, next) => (req.user ? next() : res.status(401).end()), requireEnrolled: pass,
    requireAdmin: (req, res, next) => (req.user?.role === 'admin' ? next() : res.status(403).end()), requireStrictCsrf: pass,
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY } });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, url, { user, body, headers = {} } = {}) => {
    const res = await fetch(base + url, { method, body: body && JSON.stringify(body),
      headers: { 'content-type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}), ...headers } });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  let n = 0;
  const selfRequest = (body = {}) => call('POST', '/api/ai-board/worker/self-requests', {
    headers: { 'x-ai-worker-key': KEY },
    body: { title: 'Skill sửa chữ bắt thêm từ "đổi tên"', detail: 'Chẩn đoán: skill bỏ sót yêu cầu đổi tên.',
      target_file: SKILL, idempotency_key: `self-request-${String(++n).padStart(3, '0')}`, ...body },
  });
  return { db, store, call, selfRequest, close: () => server.close() };
}

test('students cannot create a self request from the FAB', async () => {
  const f = await fixture();
  try {
    const res = await f.call('POST', '/api/requests', { user: 1,
      headers: { 'Idempotency-Key': 'fab-self-001' }, body: { type: 'self', title: 'Sửa skill của board', detail: 'x' } });
    assert.equal(res.status, 400);
    assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM requests').get()).n, 0);
  } finally { f.close(); }
});

test('the worker self endpoint refuses every target with self_request_disabled and creates nothing', async () => {
  const f = await fixture();
  try {
    const noKey = await f.call('POST', '/api/ai-board/worker/self-requests', { body: { target_file: SKILL } });
    assert.equal(noKey.status, 401);
    for (const target of [SKILL, 'ai-board/harness/prompts/brainstorm.md', 'ai-board/harness/retrieval_weights.json',
      'ai-board/harness/gates/guard.py', 'public/index.html', '']) {
      const res = await f.selfRequest({ target_file: target });
      assert.equal(res.status, 403, target);
      assert.equal(res.body.error, 'self_request_disabled', target);
    }
    assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM requests').get()).n, 0);
    assert.equal((await f.db.prepare("SELECT COUNT(*) n FROM users WHERE username='ai-board'").get()).n, 0);
  } finally { f.close(); }
});

test('the store refuses createSelfRequest directly', async () => {
  const f = await fixture();
  try {
    await assert.rejects(f.store.createSelfRequest({ title: 'x', detail: 'x', targetFile: SKILL, idempotencyKey: 'self-store-001' }),
      (error) => error.status === 403 && error.code === 'self_request_disabled');
    assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM requests').get()).n, 0);
  } finally { f.close(); }
});

test('a student plan cannot claim self.config, the capability only self requests had', async () => {
  const f = await fixture();
  try {
    await f.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
      idempotencyKey: 'student-request-001', title: 'Sửa skill giúp mình', detail: 'x' });
    const ticket = await f.store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    const run = await f.store.createRun(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, trigger: 'plan',
      idempotencyKey: `self-run-${ticket.id}` });
    const file = 'public/js/features/quiz-x/main.js';
    const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: [file], acceptance: ['đổi'], tests: ['pytest'],
      capability: 'self.config', risk: 'low', non_goals: [] };
    const plan = { domain: 'it', goal: 'Sửa.', allowed_scope: [file], acceptance: step.acceptance, tests: step.tests,
      capabilities: ['self.config'], risk: 'low', non_goals: [], steps: [step] };
    await assert.rejects(f.store.submitPlan(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, runId: run.id,
      budgetUsed: 1, idempotencyKey: `self-plan-${ticket.id}-${run.id}`, plan }),
    (error) => error instanceof PlanGuardrailError && error.code === 'unknown_capability');
  } finally { f.close(); }
});
