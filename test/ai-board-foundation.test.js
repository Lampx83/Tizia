import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { RequestValidationError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';

async function fixtureDb() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan thật', 'student', 'pharmacy'],
    [2, 'minh', 'Minh', 'student', 'it'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  return db;
}

async function serve(store) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    const id = Number(req.headers['x-test-user']);
    req.user = id === 1
      ? { id: 1, username: 'lan', display_name: 'Lan thật', role: 'student', enrolled_domain: 'pharmacy' }
      : id === 2
        ? { id: 2, username: 'minh', display_name: 'Minh', role: 'student', enrolled_domain: 'it' }
        : id === 9
          ? { id: 9, username: 'admin', display_name: 'Admin', role: 'admin', enrolled_domain: null }
          : null;
    next();
  });
  const requireAuth = (req, res, next) => req.user ? next() : res.status(401).json({ error: 'unauthorized' });
  const requireEnrolled = (req, res, next) => req.user?.role === 'admin' || req.user?.enrolled_domain
    ? next()
    : res.status(403).json({ error: 'enrollment_required' });
  const requireAdmin = (req, res, next) => req.user?.role === 'admin'
    ? next()
    : res.status(403).json({ error: 'forbidden' });
  const requireStrictCsrf = (req, res, next) => req.headers['x-csrf-token'] === 'ok'
    ? next()
    : res.status(403).json({ error: 'csrf_failed' });
  // Fake stores only stub what a test needs; the pending-cap check is not under test here.
  attachAiBoardRequestRoutes(app, { store: { countPendingRoots: () => 0, ...store }, requireAuth, requireEnrolled,
    requireAdmin, requireStrictCsrf });
  app.use((error, _req, res, _next) => res.status(500).json({ error: 'internal_error', message: error.message }));
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return {
    base: `http://127.0.0.1:${port}`,
    close: () => new Promise((resolve, reject) => server.close((e) => e ? reject(e) : resolve())),
  };
}

test('authenticated request uses enrolled identity and retry returns the same root', async () => {
  const db = await fixtureDb();
  const store = createAsyncAiBoardStore(db.d);
  const { base, close } = await serve(store);
  try {
    const send = () => fetch(`${base}/api/requests`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-test-user': '1',
        'idempotency-key': 'request-001',
      },
      body: JSON.stringify({ domain: 'pharmacy', title: 'Thêm bộ thẻ thuốc', student: 'Kẻ giả mạo' }),
    });
    const first = await send();
    assert.equal(first.status, 200);
    const a = await first.json();
    const second = await send();
    const b = await second.json();
    assert.equal(b.request_id, a.request_id);
    assert.equal(b.root_ticket_id, a.root_ticket_id);
    assert.equal(b.created, false);

    const row = await db.prepare('SELECT owner_user_id, owner_domain, student, owner_state FROM requests').get();
    assert.deepEqual(row, { owner_user_id: 1, owner_domain: 'pharmacy', student: 'Lan thật', owner_state: 'verified' });
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE kind = ?').get('root')).n, 1);
  } finally {
    await close();
    db.close();
  }
});

test('invalid request input keeps the public 400 response', async () => {
  const { base, close } = await serve({ createRequestWithRoot() { throw new RequestValidationError('title is too short'); } });
  try {
    const response = await fetch(`${base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-test-user': '1', 'idempotency-key': 'invalid-title-001' },
      body: JSON.stringify({ title: 'abc' }),
    });
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'invalid_request', message: 'title is too short' });
  } finally {
    await close();
  }
});

test('unexpected request store failure reaches Express error handling', async () => {
  const { base, close } = await serve({ createRequestWithRoot() { throw new Error('storage unavailable'); } });
  try {
    const response = await fetch(`${base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-test-user': '1', 'idempotency-key': 'request-failure-001' },
      body: JSON.stringify({ title: 'Valid request' }),
    });
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error: 'internal_error', message: 'storage unavailable' });
  } finally {
    await close();
  }
});

test('request and root ticket roll back together', async () => {
  const db = await fixtureDb();
  const store = createAsyncAiBoardStore(db.d, { afterRequestInserted: () => { throw new Error('fixture failure'); } });
  await assert.rejects(async () => store.createRequestWithRoot({
    ownerUserId: 1,
    ownerDomain: 'pharmacy',
    ownerDisplayName: 'Lan thật',
    idempotencyKey: 'rollback-001',
    title: 'Yêu cầu rollback',
  }), /fixture failure/);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM requests').get()).n, 0);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets').get()).n, 0);
  db.close();
});

test('request list is owner-scoped and status mutation needs admin plus strict CSRF', async () => {
  const db = await fixtureDb();
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan thật',
    idempotencyKey: 'owner-001', title: 'Yêu cầu của Lan',
  });
  const { base, close } = await serve(store);
  try {
    const other = await fetch(`${base}/api/requests?domain=pharmacy`, { headers: { 'x-test-user': '2' } });
    assert.deepEqual((await other.json()).items, []);

    const noAdmin = await fetch(`${base}/api/requests/1/status`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-test-user': '1', 'x-csrf-token': 'ok' },
      body: JSON.stringify({ status: 'reviewing' }),
    });
    assert.equal(noAdmin.status, 403);

    const noCsrf = await fetch(`${base}/api/requests/1/status`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-test-user': '9' },
      body: JSON.stringify({ status: 'reviewing' }),
    });
    assert.equal(noCsrf.status, 403);

    const ok = await fetch(`${base}/api/requests/1/status`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-test-user': '9', 'x-csrf-token': 'ok' },
      body: JSON.stringify({ status: 'reviewing', note: 'Bắt đầu xem' }),
    });
    assert.equal(ok.status, 200);
    assert.deepEqual({ ...await db.prepare('SELECT status, admin_note FROM requests WHERE id = 1').get() },
      { status: 'pending', admin_note: 'Bắt đầu xem' }, 'admin "reviewing" is a note; status follows the root ticket');

    await store.claimNext({ workerId: 'visible-worker', version: 'd0', mode: 'shadow' });
    const queue = await fetch(`${base}/api/admin/ai-board/queue`, { headers: { 'x-test-user': '9' } });
    assert.equal(queue.status, 200);
    const queueData = await queue.json();
    assert.equal(queueData.workers[0].worker_id, 'visible-worker');
    assert.equal(queueData.workers[0].status, 'running');
  } finally {
    await close();
    db.close();
  }
});
