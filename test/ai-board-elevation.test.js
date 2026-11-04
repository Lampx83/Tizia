// Elevation: the AI board worker/plan asks to touch protected/core levels, an admin decides per request or in a batch.
// Runs on a throwaway PostgreSQL (TEST_PG_URL); the fixture applies the board migrations, including the elevation columns.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/api/routes.js';
import { createHsmStore } from '../server/ai-board/hsm/store.js';
import { CONTRACT_HASH } from '../server/ai-board/hsm/contract.js';
import { CAPABILITY_CATALOG } from '../server/ai-board/security/policy.js';
import { claimAndRun, corePlan, protectedPlan, submit } from './support/ai-board-scenarios.js';

const USERS = [
  [1, 'lan', 'Lan', 'student', 'pharmacy'],
  [2, 'minh', 'Minh', 'student', 'pharmacy'],
  [9, 'admin', 'Admin', 'admin', null],
];

async function fixture() {
  const db = await openBoard({ users: USERS });
  return { db, store: createAsyncAiBoardStore(db.d) };
}

const newRequest = async (store, key, ownerUserId = 1) => await store.createRequestWithRoot({
  ownerUserId, ownerDomain: 'pharmacy', ownerDisplayName: ownerUserId === 9 ? 'Admin' : 'Lan',
  idempotencyKey: `elev-${key}-001`, title: 'Sửa trang giới thiệu', detail: 'Nội dung fixture',
});

const rootOf = async (db, rootTicketId) => await db.d.get(`SELECT status, phase, plan_hash, elevation, elevation_scope,
  elevated_by, elevated_at, elevation_reason FROM ai_tickets WHERE id=?`, [rootTicketId]);

const eventsOf = async (db, rootTicketId) => await db.d.all(`SELECT event_type, actor_type, actor_id, internal_detail
  FROM ai_events WHERE ticket_id=? ORDER BY id`, [rootTicketId]);

const PORTAL = 'public/gioi-thieu.html';
const CONTENT = 'server/contexts/content/x.js';

test('a worker request records state=requested, the scope and an audit event', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'request');
    const out = await store.requestElevation(id, {
      paths: [CONTENT, PORTAL], levels: ['protected', 'surface'], reason: 'Cần sửa dịch vụ nội dung dùng chung.',
      actorId: 'w1',
    });
    assert.equal(out.state, 'requested');
    assert.equal(out.elevation.max_level, 'protected');
    // Sorted by path, one level per path: the strictest a file touches wins.
    assert.deepEqual(out.elevation.scope, [{ path: PORTAL, level: 'surface' }, { path: CONTENT, level: 'protected' }]);

    const root = await rootOf(db, rootId);
    assert.equal(root.elevation, 'requested');
    assert.equal(root.elevated_by, null);
    assert.deepEqual(JSON.parse(root.elevation_scope), out.elevation.scope);
    assert.equal(root.elevation_reason, 'Cần sửa dịch vụ nội dung dùng chung.');

    const events = await eventsOf(db, rootId);
    assert.deepEqual(events.map((e) => e.event_type), ['request_created', 'elevation_requested']);
    assert.deepEqual([events[1].actor_type, events[1].actor_id], ['worker', 'w1']);
    assert.deepEqual(JSON.parse(events[1].internal_detail).scope, out.elevation.scope);

    // A file the catalog does not declare is treated as core, never as a lower level.
    const undeclared = await store.requestElevation(id, { paths: ['server/unknown/thing.js'], levels: 'protected', reason: 'x' });
    assert.equal(undeclared.elevation.scope[0].level, 'protected');

    // The gate payload (levels.payload) can be recorded as-is: `required` entries carry their own level.
    const fromGate = await store.requestElevation(id, {
      required: [{ path: 'server/db.js', level: 'core', why: 'vùng core: file subtask 1' }], reason: 'elevation_required: 1 target',
    });
    assert.deepEqual(fromGate.elevation.scope, [{ path: 'server/db.js', level: 'core' }]);
  } finally { db.close(); }
});

test('approve requeues the ticket for a fresh plan and writes who/when/what', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'approve');
    const claimed = await claimAndRun(store, 'w1');
    await submit(store, claimed, protectedPlan(), 'plan-elev-approve');
    assert.equal((await rootOf(db, rootId)).status, 'waiting_authorization', 'a protected plan waits for the admin');

    await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa dịch vụ nội dung.' });
    const out = await store.decideElevation(id, { decision: 'approve', reason: 'Đồng ý cho AI Board sửa nội dung.', adminUserId: 9 });
    assert.equal(out.state, 'approved');
    assert.equal(out.approved, true);

    const root = await rootOf(db, rootId);
    assert.deepEqual([root.status, root.phase, root.plan_hash], ['queued', 'needs_replan', null], 'approved elevation replans');
    assert.deepEqual([root.elevation, root.elevated_by], ['approved', 9]);
    assert.equal(root.elevation_reason, 'Đồng ý cho AI Board sửa nội dung.');
    assert.ok(Number(root.elevated_at) > 0);

    const approved = (await eventsOf(db, rootId)).filter((e) => e.event_type === 'elevation_approved');
    assert.equal(approved.length, 1);
    assert.deepEqual([approved[0].actor_type, approved[0].actor_id], ['admin', '9']);
    const detail = JSON.parse(approved[0].internal_detail);
    assert.equal(detail.decision, 'approve');
    assert.equal(detail.reason, 'Đồng ý cho AI Board sửa nội dung.');
    assert.deepEqual(detail.scope, [{ path: CONTENT, level: 'protected' }]);

    // The grant is path-scoped, while ai_authorizations is plan-scoped (and the replan drops the plan): audit goes to ai_events.
    assert.equal((await db.d.get('SELECT COUNT(*) AS n FROM ai_authorizations')).n, 0);
    const admin = await db.d.get('SELECT last_action FROM ai_ticket_admins WHERE ticket_id=?', [rootId]);
    assert.equal(admin.last_action, 'elevation_approve');
  } finally { db.close(); }
});

test('an approved elevation survives its own replan but a later replan asks again', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'oneshot');
    await store.requestElevation(id, { paths: ['server/contexts/learning/progress.js'], levels: 'core', reason: 'Sửa phần lõi.' });
    await store.decideElevation(id, { decision: 'approve', reason: 'Đồng ý.', adminUserId: 9 });
    assert.equal((await store.elevationOf(id)).state, 'approved');

    // The grant rides on this replan: a core plan is accepted while an unelevated one would be human-owned.
    const claimed = await claimAndRun(store, 'w1');
    const planned = await submit(store, claimed, corePlan(), 'plan-elev-oneshot');
    assert.equal(planned.status, 'planned');

    await store.invalidatePlanForRequest(id, 'người gửi bổ sung thông tin');
    const root = await rootOf(db, rootId);
    assert.equal(root.phase, 'needs_replan');
    assert.equal(root.elevation, 'none', 'replan must ask for elevation again');
    assert.equal(root.elevation_scope, null);
    assert.equal((await store.elevationOf(id)).state, 'none');
  } finally { db.close(); }
});

test('the leased snapshot exposes the grant so the harness gate can read it', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'snapshot');
    await store.requestElevation(id, { paths: [CONTENT], levels: 'protected', reason: 'Sửa dịch vụ nội dung.' });
    const claimed = await claimAndRun(store, 'w1');
    const snapshot = await store.getLeasedSnapshot(rootId, claimed.lease.workerId, claimed.lease.leaseToken);
    assert.equal(snapshot.elevation.state, 'requested');
    assert.deepEqual(snapshot.elevation.scope, [{ path: CONTENT, level: 'protected' }]);
    assert.deepEqual(snapshot.elevation.levels, ['protected']);
    assert.equal(snapshot.elevation.self_scope, false);
    // The harness gate reads the grant from the request context (`levels.approved_scope`).
    assert.deepEqual(snapshot.request.elevation, snapshot.elevation);
  } finally { db.close(); }
});

test('reject records the decision and does not queue the ticket', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'reject');
    const claimed = await claimAndRun(store, 'w1');
    await submit(store, claimed, protectedPlan(), 'plan-elev-reject');
    const before = await rootOf(db, rootId);
    await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa dịch vụ nội dung.' });

    const out = await store.decideElevation(id, { decision: 'reject', reason: 'Chưa cần đổi dịch vụ nội dung.', adminUserId: 9 });
    assert.equal(out.state, 'rejected');
    assert.equal(out.rejected, true);

    const after = await rootOf(db, rootId);
    assert.deepEqual([after.status, after.phase, after.plan_hash], [before.status, before.phase, before.plan_hash]);
    assert.deepEqual([after.elevation, after.elevated_by], ['rejected', 9]);
    const rejected = (await eventsOf(db, rootId)).filter((e) => e.event_type === 'elevation_rejected');
    assert.equal(rejected.length, 1);
    assert.equal(JSON.parse(rejected[0].internal_detail).decision, 'reject');
  } finally { db.close(); }
});

test('batch approval covers only the listed ids and audits every ticket', async () => {
  const { db, store } = await fixture();
  try {
    const one = await newRequest(store, 'batch-1');
    const two = await newRequest(store, 'batch-2');
    const three = await newRequest(store, 'batch-3');
    for (const { request_id: id } of [one, two, three]) {
      await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa dịch vụ nội dung.' });
    }
    const out = await store.decideElevationAll([one.request_id, three.request_id], {
      decision: 'approve', reason: 'Duyệt cả lô.', adminUserId: 9,
    });
    assert.deepEqual([out.approved, out.rejected], [2, 0]);
    assert.equal((await rootOf(db, one.root_ticket_id)).elevation, 'approved');
    assert.equal((await rootOf(db, three.root_ticket_id)).elevation, 'approved');
    assert.equal((await rootOf(db, two.root_ticket_id)).elevation, 'requested', 'an unlisted request is untouched');
    for (const { root_ticket_id: rootId } of [one, three]) {
      assert.deepEqual((await eventsOf(db, rootId)).map((e) => e.event_type),
        ['request_created', 'elevation_requested', 'elevation_approved']);
    }
    assert.deepEqual((await eventsOf(db, two.root_ticket_id)).map((e) => e.event_type), ['request_created', 'elevation_requested']);

    // Nothing is pending any more: the same ids are skipped, not re-audited.
    const again = await store.decideElevationAll([one.request_id, three.request_id], {
      decision: 'approve', reason: 'Duyệt lại.', adminUserId: 9,
    });
    assert.deepEqual([again.approved, again.skipped], [0, 2]);
  } finally { db.close(); }
});

test('a request created by an admin is approved at once, except when it touches the AI board itself', async () => {
  const { db, store } = await fixture();
  try {
    const own = await newRequest(store, 'admin-own', 9);
    const auto = await store.requestElevation(own.request_id, { paths: ['server/db.js'], levels: 'core', reason: 'Sửa phần lõi.' });
    assert.equal(auto.state, 'approved');
    assert.equal(auto.elevation.max_level, 'core');
    const root = await rootOf(db, own.root_ticket_id);
    assert.deepEqual([root.elevation, root.elevated_by], ['approved', 9]);
    assert.equal((await eventsOf(db, own.root_ticket_id)).map((e) => e.event_type).at(-1), 'elevation_approved');

    for (const path of ['ai-board/harness/path_policy.py', 'server/ai-board/api/routes.js']) {
      const self = await newRequest(store, `admin-self-${path.includes('server') ? 'server' : 'harness'}`, 9);
      const blocked = await store.requestElevation(self.request_id, { paths: [path], levels: 'core', reason: 'Tự sửa.' });
      assert.equal(blocked.state, 'requested', `${path} is never granted automatically`);
      await assert.rejects(store.decideElevation(self.request_id, { decision: 'approve', reason: 'Vẫn duyệt.', adminUserId: 9 }),
        { status: 409, code: 'elevation_self_scope_blocked' });
    }
    // A student request is never auto-approved, whatever the level.
    const student = await newRequest(store, 'student-core');
    const pending = await store.requestElevation(student.request_id, { paths: ['server/db.js'], levels: 'core', reason: 'Sửa phần lõi.' });
    assert.equal(pending.state, 'requested');
  } finally { db.close(); }
});

test('unknown requests are 404 and a decision needs a known decision and a reason', async () => {
  const { db, store } = await fixture();
  try {
    await assert.rejects(store.requestElevation(4242, { paths: [CONTENT], levels: 'protected', reason: 'x' }),
      { status: 404, code: 'request_not_found' });
    assert.equal(await store.elevationOf(4242), null);
    await assert.rejects(store.decideElevation(4242, { decision: 'approve', reason: 'x', adminUserId: 9 }),
      { status: 404, code: 'request_not_found' });
    await assert.rejects(store.decideElevationAll([4242], { decision: 'approve', reason: 'x', adminUserId: 9 }),
      { status: 404, code: 'request_not_found' });

    const { request_id: id } = await newRequest(store, 'validation');
    await store.requestElevation(id, { paths: [CONTENT], levels: 'protected', reason: 'Sửa dịch vụ nội dung.' });
    await assert.rejects(store.decideElevation(id, { decision: 'maybe', reason: 'x', adminUserId: 9 }),
      { status: 422, code: 'invalid_decision' });
    await assert.rejects(store.decideElevation(id, { decision: 'approve', reason: '   ', adminUserId: 9 }),
      { status: 422, code: 'elevation_reason_required' });
    await assert.rejects(store.requestElevation(id, { paths: [CONTENT], levels: 'protected' }),
      { status: 422, code: 'elevation_reason_required' });
    await assert.rejects(store.requestElevation(id, { paths: ['../escape.js'], levels: 'core', reason: 'x' }),
      { status: 422, code: 'invalid_path' });
    await assert.rejects(store.requestElevation(id, { paths: [], reason: 'x' }), { status: 422, code: 'elevation_scope_required' });
  } finally { db.close(); }
});

// Gate 3 (hsm.authorizeAction) reads ai_authorizations: an approved elevation covering the plan is the grant.
const gate3 = (store, rootId, c) => createHsmStore(store).authorizeAction(rootId, {
  run_id: c.run.id, worker_id: c.lease.workerId, lease_token: c.lease.leaseToken,
  action: 'run_in_sandbox', contract_hash: CONTRACT_HASH,
});

test('an approved elevation authorizes its validated protected plan at gate 3 without a manual authorize call', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'gate3-elev');
    await store.requestElevation(id, { paths: [CONTENT], levels: 'protected', reason: 'Sửa dịch vụ nội dung.' });
    await store.decideElevation(id, { decision: 'approve', reason: 'Đồng ý.', adminUserId: 9 });

    const claimed = await claimAndRun(store, 'w1');
    const planned = await submit(store, claimed, protectedPlan(), 'plan-elev-gate3');
    assert.equal(planned.status, 'planned', 'the elevated protected plan is ready to execute');
    const root = await db.d.get('SELECT plan_hash, plan_revision FROM ai_tickets WHERE id=?', [rootId]);
    assert.equal(root.plan_hash, planned.plan_hash);
    const grants = await db.d.all('SELECT plan_hash, plan_revision, admin_user_id FROM ai_authorizations WHERE root_ticket_id=?',
      [rootId]);
    assert.deepEqual(grants, [{ plan_hash: root.plan_hash, plan_revision: root.plan_revision, admin_user_id: 9 }]);

    const action = await gate3(store, rootId, claimed);
    assert.equal(action.authorized, true);
    assert.deepEqual([action.plan_hash, action.plan_revision], [root.plan_hash, root.plan_revision]);
  } finally { db.close(); }
});

test('an unelevated protected plan still waits for the admin authorization', async () => {
  const { db, store } = await fixture();
  try {
    const { root_ticket_id: rootId } = await newRequest(store, 'gate3-plain');
    const claimed = await claimAndRun(store, 'w1');
    const planned = await submit(store, claimed, protectedPlan(), 'plan-plain-gate3');
    assert.equal(planned.status, 'waiting_authorization');
    assert.equal((await db.d.get('SELECT COUNT(*) AS n FROM ai_authorizations WHERE root_ticket_id=?', [rootId])).n, 0);

    // The official admin route is still the only way those plans get authorized.
    await assert.rejects(gate3(store, rootId, claimed), { status: 409, code: 'action_not_authorized' });
    await store.releaseLease(rootId, { ...claimed.lease, outcome: 'planned', idempotencyKey: 'release-plain-gate3' });
    await store.authorizePlan(rootId, planned.plan_hash, 9);
    const root = await db.d.get('SELECT plan_hash, plan_revision FROM ai_tickets WHERE id=?', [rootId]);
    assert.deepEqual(await db.d.get('SELECT plan_hash, plan_revision FROM ai_authorizations WHERE root_ticket_id=?', [rootId]),
      { plan_hash: root.plan_hash, plan_revision: root.plan_revision });

    const resumed = await claimAndRun(store, 'w1');
    await store.resumeAuthorizedPlan(rootId, { ...resumed.lease, runId: resumed.run.id });
    assert.equal((await gate3(store, rootId, resumed)).authorized, true);
  } finally { db.close(); }
});

test('a grant for one plan hash/revision does not authorize another plan', async () => {
  const { db, store } = await fixture();
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'gate3-other');
    await store.requestElevation(id, { paths: [CONTENT], levels: 'protected', reason: 'Sửa dịch vụ nội dung.' });
    await store.decideElevation(id, { decision: 'approve', reason: 'Đồng ý.', adminUserId: 9 });
    const claimed = await claimAndRun(store, 'w1');
    const planned = await submit(store, claimed, protectedPlan(), 'plan-elev-other');
    assert.equal(planned.status, 'planned');

    // Same ticket, another revision and hash, validated elsewhere: the grant must not travel with the ticket.
    const root = await db.d.get('SELECT plan_hash, plan_revision FROM ai_tickets WHERE id=?', [rootId]);
    const otherHash = 'c'.repeat(64), otherRevision = root.plan_revision + 1, now = Date.now();
    await db.d.run(`INSERT INTO ai_plans(root_ticket_id, revision, plan_hash, plan_json, status, tier,
      capability_policy_hash, created_at) VALUES (?, ?, ?, '{}', 'valid', 'protected', ?, ?)`,
    [rootId, otherRevision, otherHash, CAPABILITY_CATALOG.hash, now]);
    await db.d.run('UPDATE ai_tickets SET plan_hash=?, plan_revision=? WHERE id=?', [otherHash, otherRevision, rootId]);
    await db.d.run('UPDATE ai_runs SET plan_hash=?, plan_revision=? WHERE id=?', [otherHash, otherRevision, claimed.run.id]);
    await assert.rejects(gate3(store, rootId, claimed), { status: 409, code: 'action_not_authorized' });

    // Back on the validated plan the same lease is authorized again.
    await db.d.run('UPDATE ai_tickets SET plan_hash=?, plan_revision=? WHERE id=?', [root.plan_hash, root.plan_revision, rootId]);
    await db.d.run('UPDATE ai_runs SET plan_hash=?, plan_revision=? WHERE id=?', [root.plan_hash, root.plan_revision, claimed.run.id]);
    assert.equal((await gate3(store, rootId, claimed)).authorized, true);
  } finally { db.close(); }
});

const WORKER_KEY = 'fixture-elevation-worker-key-32-char';

async function serve(store, user = { id: 9, role: 'admin' }) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = user; next(); });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => (req.user ? next() : res.status(401).json({ error: 'unauthorized' })),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => (req.user.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' })),
    requireStrictCsrf: (req, res, next) => (req.headers['x-csrf-token'] === 'ok' ? next() : res.status(403).json({ error: 'csrf_failed' })),
    classifyRequest: async () => null,
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: WORKER_KEY } });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    post: (path, body, headers = { 'x-csrf-token': 'ok' }) => fetch(`${base}${path}`, {
      method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
    }),
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

test('the admin endpoints decide one elevation or a batch and answer 404 for an unknown request', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store);
  const student = await serve(store, { id: 1, role: 'student' });
  try {
    const one = await newRequest(store, 'http-1');
    const two = await newRequest(store, 'http-2');
    for (const { request_id: id } of [one, two]) {
      await store.requestElevation(id, { paths: [CONTENT], levels: ['protected'], reason: 'Sửa dịch vụ nội dung.' });
    }

    assert.equal((await srv.post(`/api/admin/ai-board/requests/${one.request_id}/elevate`, { decision: 'approve' }, {})).status, 403,
      'the admin endpoints require the CSRF token');
    assert.equal((await student.post(`/api/admin/ai-board/requests/${one.request_id}/elevate`,
      { decision: 'approve', reason: 'Sinh viên duyệt.' })).status, 403, 'only an admin decides');
    assert.equal((await srv.post(`/api/admin/ai-board/requests/${one.request_id}/elevate`, { decision: 'approve' })).status, 422);
    assert.equal((await srv.post(`/api/admin/ai-board/requests/${one.request_id}/elevate`, { decision: 'approve', reason: '' })).status, 422);
    assert.equal((await srv.post('/api/admin/ai-board/requests/4242/elevate', { decision: 'approve', reason: 'x' })).status, 404);

    const single = await (await srv.post(`/api/admin/ai-board/requests/${one.request_id}/elevate`,
      { decision: 'approve', reason: 'Đồng ý cho AI Board sửa nội dung.' })).json();
    assert.deepEqual({ ok: single.ok, approved: single.approved, rejected: single.rejected, state: single.state },
      { ok: true, approved: 1, rejected: 0, state: 'approved' });

    const batch = await (await srv.post('/api/admin/ai-board/requests/0/elevate-batch',
      { ids: [two.request_id, 4242], decision: 'approve', reason: 'Duyệt cả lô.' })).json();
    assert.equal(batch.error, 'request_not_found', 'an unknown id in the batch writes nothing');
    assert.equal((await store.elevationOf(two.request_id)).state, 'requested');

    const okBatch = await (await srv.post('/api/admin/ai-board/requests/0/elevate-batch',
      { ids: [two.request_id], decision: 'approve', reason: 'Duyệt cả lô.' })).json();
    assert.deepEqual({ ok: okBatch.ok, approved: okBatch.approved, rejected: okBatch.rejected }, { ok: true, approved: 1, rejected: 0 });
    assert.equal((await store.elevationOf(two.request_id)).state, 'approved');
  } finally { await srv.close(); await student.close(); db.close(); }
});

test('the worker route accepts the gate payload (required paths + why) under the worker key', async () => {
  const { db, store } = await fixture();
  const srv = await serve(store);
  try {
    const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'worker-http');
    assert.equal((await srv.post(`/api/ai-board/worker/tickets/${rootId}/elevation`,
      { required: [{ path: CONTENT, level: 'protected', why: 'x' }], reason: 'elevation_required: 1 target' })).status, 401);
    const accepted = await (await srv.post(`/api/ai-board/worker/tickets/${rootId}/elevation`,
      { worker_id: 'w1', required: [{ path: CONTENT, level: 'protected', why: 'x' }], reason: 'elevation_required: 1 target' },
      { 'x-ai-worker-key': WORKER_KEY })).json();
    assert.equal(accepted.state, 'requested');
    assert.deepEqual(accepted.elevation.scope, [{ path: CONTENT, level: 'protected' }]);
    assert.equal((await rootOf(db, rootId)).elevation, 'requested');
    assert.equal((await srv.post('/api/ai-board/worker/tickets/4242/elevation',
      { required: [{ path: CONTENT, level: 'protected' }], reason: 'x' }, { 'x-ai-worker-key': WORKER_KEY })).status, 404);
    const actor = (await eventsOf(db, rootId)).find((e) => e.event_type === 'elevation_requested');
    assert.equal(actor.actor_id, 'w1');
    assert.equal((await store.elevationOf(id)).state, 'requested');
  } finally { await srv.close(); db.close(); }
});
