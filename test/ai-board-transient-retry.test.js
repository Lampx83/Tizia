// Tự chạy lại yêu cầu bị chặn do lỗi hạ tầng thoáng qua (transient), mọi loại yêu cầu — không riêng self-improve.
// Mặc định tắt: waiting_admin/transient_blocked, admin bấm "Chạy lại ngay" (retryTransientTicket). Bật: về
// queued/authorized với lease_expires_at dời tới retry_after_ms — claimTransaction (nhánh PLAN_QUEUE, lease_expires_at
// làm "không nhận trước giờ này") tự nhận lại đúng như 1 plan protected vừa được admin cho phép.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS, WorkerContractError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { listTransientBlocked, retryTransientTicket, setTransientRetryEnabled, transientRetryState } from '../server/ai-board/transient-retry.js';

const TR = LIMITS.transient_retry;

function plannedRoot() {
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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy'), (9, 'admin', 'Admin', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'tr-request-001', title: 'Sửa trang giới thiệu', detail: 'fixture',
  });
  const ticket = store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'tr-run-001' });
  const step = {
    order: 1, title: 'Sửa trang giới thiệu', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'],
  };
  store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'tr-plan-001',
    plan: {
      domain: 'pharmacy', goal: 'Sửa trang giới thiệu.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step],
    },
  });
  const submit = (verdict, now, key = 'tr-verdict-001') => store.submitPrePrVerdict(ticket.id, {
    ...lease, runId: run.id, verdict, idempotencyKey: key, now,
  });
  return { db, store, ticket, submit };
}

function transientVerdict(extra = {}) {
  return {
    outcome: 'blocked', gate_reached: 3, reason: 'HTTP Error 500: Internal Server Error', budget_used: 3,
    failure_class: 'transient', repairs: [], candidate: null,
    gates: [{ gate: 3, blocked: true, reason: 'HTTP Error 500: Internal Server Error', issues: [] }], ...extra,
  };
}

test('retry disabled (default): a transient block waits for the admin, listed for retry', () => {
  const { db, submit, ticket } = plannedRoot();
  const now = Date.now();
  submit(transientVerdict(), now);
  const root = db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'transient_blocked' });
  const blocked = listTransientBlocked(db);
  assert.equal(blocked.length, 1);
  assert.equal(blocked[0].id, ticket.id);
});

test('admin "Chạy lại ngay" requeues the ticket for the very next claim', () => {
  const { db, store, submit, ticket } = plannedRoot();
  submit(transientVerdict(), Date.now());
  const result = retryTransientTicket(db, ticket.id);
  assert.deepEqual(result, { ok: true, id: ticket.id, status: 'queued', phase: 'authorized' });
  // 1 request = 1 phiên worker (fair-queue): trả về đúng worker cũ trừ khi lease của nó đã quá hạn.
  const claimed = store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  assert.equal(claimed.id, ticket.id);
  assert.equal(claimed.trigger, 'execute');
});

test('retrying a ticket that is not transient_blocked is rejected', () => {
  const { db, ticket } = plannedRoot();
  assert.throws(() => retryTransientTicket(db, ticket.id), (error) =>
    error instanceof WorkerContractError && error.code === 'not_transient_blocked');
});

test('retry enabled: the ticket is not claimable before retry_after_ms, and is after', () => {
  const { db, store, submit, ticket } = plannedRoot();
  const now = Date.now();
  setTransientRetryEnabled(db, true, 9, now - 1000);
  submit(transientVerdict(), now);
  const root = db.prepare('SELECT status, phase, lease_expires_at FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.equal(root.status, 'queued');
  assert.equal(root.phase, 'authorized');
  assert.equal(root.lease_expires_at, now + TR.retry_after_ms);
  const tooSoon = store.claimNext({
    workerId: 'w2', version: 'test', mode: 'active', intent: 'plan', now: now + TR.retry_after_ms - 1000,
  });
  assert.equal(tooSoon, null);
  const dueNow = store.claimNext({
    workerId: 'w2', version: 'test', mode: 'active', intent: 'plan', now: now + TR.retry_after_ms + 1000,
  });
  assert.equal(dueNow?.id, ticket.id);
});

test('a normal queued ticket (lease_expires_at never set) is unaffected by the not-before check', () => {
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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy');
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'tr-plain-001', title: 'Yêu cầu bình thường', detail: 'fixture',
  });
  const claimed = store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'precheck' });
  assert.ok(claimed);
});

async function httpFixture() {
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
    INSERT INTO users VALUES (9, 'boss', 'Boss', 'admin', NULL), (1, 'lan', 'Lan', 'student', 'pharmacy');
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
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, url, { user, body } = {}) => {
    const res = await fetch(base + url, { method, body: body && JSON.stringify(body),
      headers: { 'content-type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}) } });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  return { db, store, call, close: () => server.close() };
}

test('admin route: default off, only an admin can flip the switch', async () => {
  const f = await httpFixture();
  try {
    const state = await f.call('GET', '/api/admin/ai-board/transient-retry', { user: 9 });
    assert.deepEqual(state.body, { ...transientRetryState(f.db), blocked: [] });
    assert.equal((await f.call('POST', '/api/admin/ai-board/transient-retry/switch', { user: 1, body: { enabled: true } })).status, 403);
    const on = await f.call('POST', '/api/admin/ai-board/transient-retry/switch', { user: 9, body: { enabled: true } });
    assert.equal(on.status, 200);
    assert.equal(on.body.enabled, true);
  } finally { f.close(); }
});
