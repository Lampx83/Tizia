// DB approval gate: a passing candidate with a DB change is held, an admin approves or rejects its exact run.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);
const MIGRATION = 'server/contexts/teacher/migrations/001-ghi-chu-nhanh.sql';
const SQL = 'CREATE TABLE IF NOT EXISTS ghi_chu_nhanh (id SERIAL PRIMARY KEY, noi_dung TEXT NOT NULL)';
const WORKER_KEY = 'k'.repeat(32);

const candidate = (files = ['public/gioi-thieu.html', MIGRATION]) => ({
  branch: 'ai-board/2026-11-21-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
  commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 Ghi chú', files }],
});
const gates = [
  { gate: 3, blocked: false, reason: null },
  { gate: 4, blocked: false, reason: null, issues: [] },
  { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false,
    functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } } },
  { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
];
const DB_CHANGE = {
  migrations: [{ path: MIGRATION, sql: SQL }], files: ['public/gioi-thieu.html', MIGRATION],
  sandbox: { status: 'passed', schema_diff: { added_tables: ['ghi_chu_nhanh'], removed_tables: [],
    added_columns: { ghi_chu_nhanh: ['id', 'noi_dung'] }, removed_columns: {} }, checks: [], tests: [], error: null },
};
const passing = (extra = {}) => ({ outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 80, failure_class: null,
  repairs: [], candidate: candidate(), gates, ...extra });
const PR = (n = 7) => ({ number: n, url: `https://github.com/acme/tizia/pull/${n}`, branch: candidate().branch, base: 'dev',
  head_sha: SHA_B, base_sha: SHA_A });

async function heldRoot(verdict = passing({ db_change: DB_CHANGE })) {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'db-approval-request-1', title: 'Ghi chú nhanh', detail: 'fixture' });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'db-approval-run-1' });
  const step = { order: 1, title: 'Ghi chú', description: 'fixture', allowed_scope: ['public/gioi-thieu.html'], acceptance: ['ok'],
    tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'db-approval-plan-1',
    plan: { domain: 'pharmacy', goal: 'Ghi chú.', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
      capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  const stored = await store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, verdict, idempotencyKey: 'db-approval-verdict-1' });
  return { db, store, ticket, lease, run, stored };
}

const root = (db, id) => db.prepare('SELECT status, phase, public_note, internal_reason, lease_token FROM ai_tickets WHERE id=?').get(id);
const release = (store, ticket, lease) => store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: 'db-approval-release-1' });

test('a passing verdict with a DB change is held, persisted, and cannot record a PR', async () => {
  const { db, store, ticket, lease, run, stored } = await heldRoot();
  assert.equal(stored.db_hold, true);
  assert.deepEqual(await root(db, ticket.id).then(({ status, phase }) => [status, phase]), ['waiting_admin', 'awaiting_db_approval']);
  await assert.rejects(store.recordPullRequest(ticket.id, { ...lease, runId: run.id, pullRequest: PR(), idempotencyKey: 'db-approval-pr-0' }),
    (e) => e.code === 'db_approval_required');
  await release(store, ticket, lease);
  assert.equal((await root(db, ticket.id)).phase, 'awaiting_db_approval', 'release keeps the hold');
  const restarted = createAsyncAiBoardStore(db.d);
  const [item] = await restarted.listDbApprovals({ requestId: 1 });
  assert.equal(item.id, run.id);
  assert.equal(item.status, 'pending');
  assert.equal(item.sql, `-- ${MIGRATION}\n${SQL}`);
  assert.deepEqual(item.files, DB_CHANGE.files);
  assert.equal(item.sandbox.status, 'passed');
  assert.match(item.sandbox.output, /ghi_chu_nhanh/);
  assert.equal(item.candidate.head_sha, SHA_B);
  assert.equal((await restarted.listDbApprovals()).length, 1, 'board-wide pending queue');
  db.close();
});

test('approve publishes only the approved head through the publish trigger', async () => {
  const { db, store, ticket, lease, run } = await heldRoot();
  await release(store, ticket, lease);
  await assert.rejects(store.decideDbApproval(1, run.id + 1, { decision: 'approved', adminUserId: 9 }), (e) => e.code === 'stale_db_approval');
  await assert.rejects(store.decideDbApproval(1, run.id, { decision: 'approved', headSha: 'c'.repeat(40), adminUserId: 9 }),
    (e) => e.code === 'stale_db_approval');
  assert.deepEqual(await store.decideDbApproval(1, run.id, { decision: 'approved', adminUserId: 9 }),
    { ok: true, status: 'queued', phase: 'db_approved', item_id: run.id });
  await assert.rejects(store.decideDbApproval(1, run.id, { decision: 'approved', adminUserId: 9 }), (e) => e.code === 'not_awaiting_db_approval');
  assert.equal(await store.claimNext({ workerId: 'w1', mode: 'shadow', intent: 'plan' }), null, 'publishing needs an active worker');
  const claim = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  assert.equal(claim.phase, 'publishing');
  assert.equal(claim.trigger, 'publish');
  const publishLease = { workerId: 'w1', leaseToken: claim.lease_token };
  const snapshot = await store.getLeasedSnapshot(ticket.id, 'w1', claim.lease_token);
  assert.equal(snapshot.db_publish.head_sha, SHA_B);
  assert.equal(snapshot.db_publish.run_id, run.id);
  const publishRun = await store.createRun(ticket.id, { ...publishLease, trigger: 'publish', idempotencyKey: 'db-approval-run-2' });
  await store.recordPullRequest(ticket.id, { ...publishLease, runId: run.id, pullRequest: PR(), idempotencyKey: 'db-approval-pr-1' });
  assert.deepEqual(await store.finishDbPublish(ticket.id, { ...publishLease, runId: publishRun.id, ok: true }),
    { status: 'planned', phase: 'pr_open', ok: true });
  const [item] = await store.listDbApprovals({ requestId: 1, status: 'all' });
  assert.equal(item.status, 'published');
  assert.equal(item.pull_request.number, 7);
  assert.equal(item.decision.decision, 'approved');
  db.close();
});

test('a failed publish waits for the admin and can be approved again', async () => {
  const { db, store, ticket, lease, run } = await heldRoot();
  await release(store, ticket, lease);
  await store.decideDbApproval(1, run.id, { decision: 'approved', adminUserId: 9 });
  const claim = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const publishLease = { workerId: 'w1', leaseToken: claim.lease_token };
  const publishRun = await store.createRun(ticket.id, { ...publishLease, trigger: 'publish', idempotencyKey: 'db-approval-run-3' });
  const done = await store.finishDbPublish(ticket.id, { ...publishLease, runId: publishRun.id, ok: false, detail: 'git push: rejected' });
  assert.deepEqual([done.status, done.phase], ['waiting_admin', 'db_publish_failed']);
  const [item] = await store.listDbApprovals({ requestId: 1, status: 'all' });
  assert.equal(item.status, 'publish_failed');
  assert.equal(item.publish_error, 'git push: rejected');
  assert.equal((await store.decideDbApproval(1, run.id, { decision: 'approved', adminUserId: 9 })).phase, 'db_approved');
  db.close();
});

test('reject stops the run with the reason for the requester and no PR', async () => {
  const { db, store, ticket, lease, run } = await heldRoot();
  await release(store, ticket, lease);
  await assert.rejects(store.decideDbApproval(1, run.id, { decision: 'rejected', reason: '  ', adminUserId: 9 }), (e) => e.code === 'reason_required');
  await assert.rejects(store.decideDbApproval(1, run.id, { decision: 'rejected', reason: 'x'.repeat(501), adminUserId: 9 }), (e) => e.code === 'reason_required');
  assert.equal((await store.decideDbApproval(1, run.id, { decision: 'rejected', reason: 'Bảng trùng với notes có sẵn', adminUserId: 9 })).phase, 'admin_rejected');
  const after = await root(db, ticket.id);
  assert.deepEqual([after.status, after.phase, after.internal_reason], ['cancelled', 'admin_rejected', 'db_rejected']);
  const request = await db.prepare('SELECT status, admin_note FROM requests WHERE id=1').get();
  assert.equal(request.status, 'rejected');
  assert.match(request.admin_note, /Bảng trùng với notes có sẵn/);
  const message = await db.prepare(`SELECT body FROM request_messages WHERE request_id=1 AND role='ai' ORDER BY id DESC`).get();
  assert.match(message.body, /từ chối thay đổi CSDL: Bảng trùng/);
  assert.equal(await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' }), null, 'nothing left to publish');
  const [item] = await store.listDbApprovals({ requestId: 1, status: 'all' });
  assert.equal(item.status, 'rejected');
  assert.equal(item.decision.reason, 'Bảng trùng với notes có sẵn');
  assert.deepEqual(await store.listDbApprovals({ requestId: 1 }), []);
  await assert.rejects(store.listDbApprovals({ requestId: 99 }), (e) => e.code === 'request_not_found');
  db.close();
});

test('flag off: a verdict without a DB marker is not held; flag on infers the hold from a .sql file', async () => {
  const before = process.env.AI_BOARD_REQUESTER_FULLSTACK_DB;
  try {
    delete process.env.AI_BOARD_REQUESTER_FULLSTACK_DB;
    const off = await heldRoot(passing());
    assert.equal(off.stored.db_hold, undefined);
    assert.equal((await root(off.db, off.ticket.id)).phase, 'pre_pr_ready');
    off.db.close();
    process.env.AI_BOARD_REQUESTER_FULLSTACK_DB = '1';
    const on = await heldRoot(passing());
    assert.equal(on.stored.db_hold, true);
    assert.deepEqual(on.stored.db_change.files, [MIGRATION]);
    assert.equal((await root(on.db, on.ticket.id)).phase, 'awaiting_db_approval');
    on.db.close();
    const plain = await heldRoot(passing({ candidate: candidate(['public/gioi-thieu.html']) }));
    assert.equal((await root(plain.db, plain.ticket.id)).phase, 'pre_pr_ready', 'FE-only candidate follows the normal flow');
    plain.db.close();
  } finally {
    if (before === undefined) delete process.env.AI_BOARD_REQUESTER_FULLSTACK_DB; else process.env.AI_BOARD_REQUESTER_FULLSTACK_DB = before;
  }
});

test('db approval routes: admin only, strict CSRF on POST, worker publish route needs the worker key', async () => {
  const { db, store, ticket, lease, run } = await heldRoot();
  await release(store, ticket, lease);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    if (req.headers['x-test-user'] === '9') req.user = { id: 9, role: 'admin' };
    if (req.headers['x-test-user'] === '1') req.user = { id: 1, role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => req.user ? next() : res.status(401).end(),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }),
    requireStrictCsrf: (req, res, next) => req.headers['x-csrf-token'] === 'ok' ? next() : res.status(403).json({ error: 'csrf_failed' }),
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: WORKER_KEY } });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = (method, path, headers = {}, body) => fetch(`${base}${path}`, { method,
    headers: { 'content-type': 'application/json', ...headers }, ...(body ? { body: JSON.stringify(body) } : {}) });
  const admin = { 'x-test-user': '9', 'x-csrf-token': 'ok' };
  try {
    assert.equal((await call('GET', '/api/admin/ai-board/requests/1/db-approvals', { 'x-test-user': '1' })).status, 403);
    assert.equal((await call('GET', '/api/admin/ai-board/requests/1/db-approvals')).status, 401);
    const listed = await call('GET', '/api/admin/ai-board/requests/1/db-approvals?status=pending', admin);
    assert.equal(listed.status, 200);
    assert.equal((await listed.json()).items[0].id, run.id);
    assert.equal((await call('GET', '/api/admin/ai-board/requests/77/db-approvals', admin)).status, 404);
    assert.equal((await call('GET', '/api/admin/ai-board/db-approvals', admin)).status, 200);
    const reject = `/api/admin/ai-board/requests/1/db-approvals/${run.id}/reject`;
    const approve = `/api/admin/ai-board/requests/1/db-approvals/${run.id}/approve`;
    assert.equal((await call('POST', approve, { 'x-test-user': '9' }, {})).status, 403, 'CSRF');
    assert.equal((await call('POST', approve, { 'x-test-user': '1', 'x-csrf-token': 'ok' }, {})).status, 403, 'student');
    assert.equal((await call('POST', reject, admin, {})).status, 400);
    assert.equal((await call('POST', `/api/admin/ai-board/requests/1/db-approvals/${run.id + 5}/approve`, admin, {})).status, 409);
    const ok = await call('POST', approve, admin, {});
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).phase, 'db_approved');
    assert.equal((await call('POST', `/api/ai-board/worker/tickets/${ticket.id}/db-publish`, {}, { ok: true })).status, 401);
    assert.equal((await call('POST', `/api/ai-board/worker/tickets/${ticket.id}/db-publish`, { 'x-ai-worker-key': WORKER_KEY },
      { worker_id: 'w1', lease_token: 'stale', run_id: run.id, ok: true })).status, 409);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  }
});
