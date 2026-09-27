// Self-improve ticket 04: yêu cầu loại `self` (board sửa chính nó) — chỉ hệ thống tạo, vùng sửa hẹp, luôn chờ admin.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS, PlanGuardrailError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SKILL = 'ai-board/harness/skills/edit-html-text/SKILL.md';

async function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      display_name TEXT NOT NULL, password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'student',
      created_at INTEGER NOT NULL, enrolled_domain TEXT);
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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'x', 'student', 0, 'it'), (9, 'boss', 'Boss', 'x', 'admin', 0, NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    const id = Number(req.headers['x-test-user']);
    if (id) req.user = db.prepare('SELECT * FROM users WHERE id=?').get(id);
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
  /** Claim root + run để nộp plan như worker. */
  const lease = (id) => {
    const ticket = store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    assert.equal(ticket.id, id);
    const run = store.createRun(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, trigger: 'plan',
      idempotencyKey: `self-run-${ticket.id}` });
    return { ticket, run };
  };
  const plan = (file, capability, domain = 'ai-board') => {
    const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: [file], acceptance: ['đổi'],
      tests: ['pytest'], capability, risk: 'low', non_goals: [] };
    return { domain, goal: 'Sửa.', allowed_scope: [file], acceptance: step.acceptance, tests: step.tests,
      capabilities: [capability], risk: 'low', non_goals: [], steps: [step] };
  };
  const submit = ({ ticket, run }, body) => store.submitPlan(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token,
    runId: run.id, budgetUsed: 1, idempotencyKey: `self-plan-${ticket.id}-${run.id}`, plan: body });
  return { db, store, call, selfRequest, lease, plan, submit, close: () => server.close() };
}

test('students cannot create a self request from the FAB', async () => {
  const f = await fixture();
  try {
    const res = await f.call('POST', '/api/requests', { user: 1,
      headers: { 'Idempotency-Key': 'fab-self-001' }, body: { type: 'self', title: 'Sửa skill của board', detail: 'x' } });
    assert.equal(res.status, 400);
    assert.equal(f.db.prepare('SELECT COUNT(*) n FROM requests').get().n, 0);
  } finally { f.close(); }
});

test('the worker creates a self request owned by the ai-board system user, once per key', async () => {
  const f = await fixture();
  try {
    const noKey = await f.call('POST', '/api/ai-board/worker/self-requests', { body: { target_file: SKILL } });
    assert.equal(noKey.status, 401);
    const first = await f.selfRequest({ idempotency_key: 'self-request-once' });
    assert.equal(first.status, 200);
    assert.equal(first.body.created, true);
    const again = await f.selfRequest({ idempotency_key: 'self-request-once' });
    assert.equal(again.body.request_id, first.body.request_id);
    assert.equal(again.body.created, false);
    await f.selfRequest();
    const owners = f.db.prepare(`SELECT u.username, u.role, r.type, r.domain FROM requests r
      JOIN users u ON u.id = r.owner_user_id`).all();
    assert.deepEqual(owners, [
      { username: 'ai-board', role: 'system', type: 'self', domain: 'ai-board' },
      { username: 'ai-board', role: 'system', type: 'self', domain: 'ai-board' },
    ]);
    assert.equal(f.db.prepare("SELECT COUNT(*) n FROM users WHERE username='ai-board'").get().n, 1);
  } finally { f.close(); }
});

test('a self request whose target is outside the self-edit area is rejected', async () => {
  const f = await fixture();
  try {
    for (const target of ['ai-board/harness/gates/guard.py', 'ai-board/harness/prompts/AIBOARD.md',
      'ai-board/harness/skills/skills.lock.json', 'ai-board/harness/prompts/prompts.lock.json',
      'ai-board/harness/skills/edit-html-text/tools.py', 'server/ai-board/guard-lexicon.json',
      'server/ai-board/policy.js', 'server/ai-board/contract.json', 'public/index.html',
      'ai-board/harness/skills/../gates/guard.py', '']) {
      const res = await f.selfRequest({ target_file: target });
      assert.equal(res.status, 422, target);
      assert.equal(res.body.error, 'self_target_outside_area', target);
    }
    for (const target of [SKILL, 'ai-board/harness/prompts/brainstorm.md', 'ai-board/harness/retrieval_weights.json']) {
      assert.equal((await f.selfRequest({ target_file: target })).status, 200, target);
    }
    assert.equal(f.db.prepare('SELECT COUNT(*) n FROM requests').get().n, 3);
  } finally { f.close(); }
});

test('a self plan is protected: it waits for the admin to approve its exact plan_hash', async () => {
  const f = await fixture();
  try {
    const { root_ticket_id: id } = (await f.selfRequest()).body;
    const held = f.lease(id);
    const waiting = f.submit(held, f.plan(SKILL, 'self.config'));
    assert.equal(waiting.tier, 'protected');
    assert.equal(waiting.status, 'waiting_authorization');
    f.store.releaseLease(id, { workerId: 'w1', leaseToken: held.ticket.lease_token, outcome: 'planned',
      idempotencyKey: 'self-release-001' });
    const wrong = await f.call('POST', `/api/admin/ai-board/tickets/${id}/authorize-plan`, { user: 9,
      body: { plan_hash: 'f'.repeat(64) } });
    assert.notEqual(wrong.status, 200);
    const ok = await f.call('POST', `/api/admin/ai-board/tickets/${id}/authorize-plan`, { user: 9,
      body: { plan_hash: waiting.plan_hash } });
    assert.equal(ok.status, 200);
    assert.equal(f.db.prepare('SELECT phase FROM ai_tickets WHERE id=?').get(id).phase, 'authorized');
  } finally { f.close(); }
});

test('a self plan may only touch its declared target, with self.config; other requests never get self.config', async () => {
  const f = await fixture();
  try {
    const { root_ticket_id: id } = (await f.selfRequest()).body;
    const held = f.lease(id);
    const rejects = (body, code) => assert.throws(() => f.submit(held, body),
      (error) => error instanceof PlanGuardrailError && error.code === code, code);
    rejects(f.plan('ai-board/harness/prompts/brainstorm.md', 'self.config'), 'scope_violation'); // not the target
    rejects(f.plan('ai-board/harness/skills/skills.lock.json', 'self.config'), 'scope_violation');
    rejects(f.plan('public/index.html', 'public.ui'), 'unknown_capability');
  } finally { f.close(); }
  const g = await fixture();
  try {
    g.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
      idempotencyKey: 'student-request-001', title: 'Sửa skill giúp mình', detail: 'x' });
    const held = g.lease(1);
    assert.throws(() => g.submit(held, g.plan(SKILL, 'self.config', 'it')),
      (error) => error instanceof PlanGuardrailError && error.code === 'unknown_capability');
  } finally { g.close(); }
});

test('self requests wait behind every student request, also in the position the student sees', async () => {
  const f = await fixture();
  try {
    const self = (await f.selfRequest()).body;
    f.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
      idempotencyKey: 'student-request-002', title: 'Đổi màu nút', detail: 'x' });
    assert.equal(f.store.listRequestsForOwner(1, 'it')[0].queue.position, 1);
    const first = f.store.claimNext({ workerId: 'w1', mode: 'shadow' });
    assert.notEqual(first.id, self.root_ticket_id); // student first even though the self request is older
    assert.equal(f.store.claimNext({ workerId: 'w2', mode: 'shadow' }).id, self.root_ticket_id);
  } finally { f.close(); }
});

test('the board spending a day of GPU does not hold back its next self request', async () => {
  const f = await fixture();
  try {
    const spent = (await f.selfRequest()).body;
    const ticket = f.store.claimNext({ workerId: 'w1', mode: 'shadow' });
    assert.equal(ticket.id, spent.root_ticket_id);
    const run = f.store.createRun(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, trigger: 'shadow_precheck',
      idempotencyKey: 'self-gpu-run-001' });
    f.db.prepare(`INSERT INTO ai_gate_traces(run_id, gate, status, internal_reason, evidence_json, created_at)
      VALUES (?, 1, 'model_call', 'c1', ?, ?)`).run(run.id, JSON.stringify({ budget_units: LIMITS.gpu_s_per_user_day.loose }), Date.now());
    const next = (await f.selfRequest()).body;
    assert.equal(f.store.claimNext({ workerId: 'w2', mode: 'shadow' })?.id, next.root_ticket_id);
  } finally { f.close(); }
});

test('a blocked self run is not recorded as a production miss', async () => {
  const f = await fixture();
  try {
    const { root_ticket_id: id } = (await f.selfRequest()).body;
    const held = f.lease(id);
    f.submit(held, f.plan(SKILL, 'self.config'));
    const { recordMiss } = await import('../server/ai-board/eval-tasks.js');
    recordMiss(f.db, held.run.id, 'verdict_blocked');
    assert.equal(f.db.prepare('SELECT COUNT(*) n FROM ai_eval_tasks').get().n, 0);
  } finally { f.close(); }
});
