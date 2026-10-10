// Đối chiếu bước ghi chưa rõ của tool-loop: chỉ người có quyền hiện tại chốt, có lý do + evidence + audit, resume qua hàng đợi cũ.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { listUnknownWrites, reconcileWrite } from '../server/ai-board/services/write-reconcile.js';

// Cùng hình dạng với DDL của ai-board/harness/repositories/tool_steps.py (worker Python sở hữu bảng).
const TOOL_DDL = `
CREATE TABLE tool_run (proposal_id BIGINT NOT NULL, child INTEGER NOT NULL, pins_json TEXT NOT NULL, ledger_json TEXT,
  updated_at BIGINT NOT NULL, run_scope TEXT, PRIMARY KEY (proposal_id, child));
CREATE TABLE tool_step (proposal_id BIGINT NOT NULL, child INTEGER NOT NULL, step INTEGER NOT NULL, identity TEXT NOT NULL,
  tool TEXT NOT NULL, args_json TEXT NOT NULL, status TEXT NOT NULL, kind TEXT, observation TEXT, resolved_by TEXT,
  updated_at BIGINT NOT NULL, resolution_reason TEXT, resolution_evidence TEXT, resolved_at BIGINT,
  PRIMARY KEY (proposal_id, child, step));`;
const ID_A = 'a'.repeat(32);
const ID_B = 'b'.repeat(32);
const EVIDENCE = { receipt: 'rcpt-1', checked: 'đã đối chiếu bản ghi' };

async function fixture({ tables = true } = {}) {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'uw-request-001',
    title: 'Sửa trang giới thiệu', detail: 'fixture',
  });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'uw-run-001' });
  const step = {
    order: 1, title: 'Sửa trang giới thiệu', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'],
  };
  const planned = await store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'uw-plan-001',
    plan: { domain: 'pharmacy', goal: 'Sửa.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] },
  });
  await store.submitPrePrVerdict(ticket.id, {
    ...lease, runId: run.id, idempotencyKey: 'uw-verdict-001', now: Date.now(),
    verdict: { outcome: 'blocked', gate_reached: 3, reason: 'kết quả bước 0 chưa rõ', budget_used: 3, failure_class: 'critical',
      repairs: [], candidate: null, gates: [{ gate: 3, blocked: true, reason: 'kết quả bước 0 chưa rõ', issues: [] }] },
  });
  if (tables) await db.d.exec(TOOL_DDL);
  const seed = async (identity, { status = 'unknown', scope = `ticket-${ticket.id}:abc`, key = 1, step: n = 0 } = {}) => {
    await db.d.run('INSERT INTO tool_run(proposal_id, child, pins_json, updated_at, run_scope) VALUES (?, 1, ?, ?, ?) ON CONFLICT DO NOTHING',
      [key, '{}', Date.now(), scope]);
    await db.d.run(`INSERT INTO tool_step(proposal_id, child, step, identity, tool, args_json, status, updated_at)
      VALUES (?, 1, ?, ?, 'edit_file', ?, ?, ?)`, [key, n, identity, JSON.stringify({ file: 'public/x.html' }), status, Date.now()]);
  };
  return { db, store, ticket, seed, planHash: planned.plan_hash };
}

const admin = { id: 9 };
const stepRow = (db, identity) => db.d.get('SELECT * FROM tool_step WHERE identity=?', [identity]);
const rejects = (promise, status, code) => assert.rejects(promise, (e) => e.status === status && e.code === code);

test('lists open unknown writes of the ticket only', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  await seed(ID_B, { scope: 'ticket-99999:zzz', key: 2 });
  const listed = await listUnknownWrites(db.d, ticket.id);
  assert.deepEqual(listed.open.map((w) => w.identity), [ID_A]);
  assert.deepEqual(listed.resolved, []);
});

test('no harness tables yet: empty lists, reconcile is 404', async () => {
  const { db, ticket } = await fixture({ tables: false });
  assert.deepEqual(await listUnknownWrites(db.d, ticket.id), { open: [], resolved: [] });
  await rejects(reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'r', evidence: EVIDENCE, user: admin }),
    404, 'unknown_write_not_found');
});

test('tables from an older worker (no run_scope / resolved_at): empty lists, reconcile is 404, no 500', async () => {
  const { db, ticket } = await fixture({ tables: false });
  await db.d.exec(`CREATE TABLE tool_run (proposal_id BIGINT NOT NULL, child INTEGER NOT NULL, pins_json TEXT NOT NULL, ledger_json TEXT, updated_at BIGINT NOT NULL);
    CREATE TABLE tool_step (proposal_id BIGINT NOT NULL, child INTEGER NOT NULL, step INTEGER NOT NULL, identity TEXT NOT NULL, tool TEXT NOT NULL,
      args_json TEXT NOT NULL, status TEXT NOT NULL, kind TEXT, observation TEXT, resolved_by TEXT, updated_at BIGINT NOT NULL);`);
  assert.deepEqual(await listUnknownWrites(db.d, ticket.id), { open: [], resolved: [] });
  await rejects(reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'r', evidence: EVIDENCE, user: admin }),
    404, 'unknown_write_not_found');
});

test('admin decision updates the step and leaves actor, reason, evidence in the step row and ai_events', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  const out = await reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'bản ghi đã có', evidence: EVIDENCE, user: admin });
  assert.deepEqual(out, { ok: true, identity: ID_A, decision: 'applied', status: 'applied', remaining_open: 0, resumed: false });
  const row = await stepRow(db, ID_A);
  assert.deepEqual([row.status, row.resolved_by, row.resolution_reason], ['applied', 'admin:9', 'bản ghi đã có']);
  assert.deepEqual(JSON.parse(row.resolution_evidence), EVIDENCE);
  const event = await db.d.get(`SELECT * FROM ai_events WHERE event_type='unknown_write_reconciled'`);
  assert.deepEqual([event.ticket_id, event.actor_type, event.actor_id], [ticket.id, 'admin', '9']);
  assert.deepEqual(JSON.parse(event.internal_detail), { identity: ID_A, tool: 'edit_file', step: 0, from: 'unknown', decision: 'applied', status: 'applied', reason: 'bản ghi đã có', evidence: EVIDENCE });
  assert.equal((await listUnknownWrites(db.d, ticket.id)).resolved[0].resolved_by, 'admin:9');
  await rejects(reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_A, decision: 'not_applied', reason: 'r', evidence: EVIDENCE, user: admin }),
    409, 'not_reconcilable');
});

test('decision needs a known value, a reason and evidence', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  const base = { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'r', evidence: EVIDENCE, user: admin };
  await rejects(reconcileWrite(db.d, { ...base, decision: 'guess' }), 400, 'invalid_decision');
  await rejects(reconcileWrite(db.d, { ...base, reason: '  ' }), 400, 'reason_required');
  await rejects(reconcileWrite(db.d, { ...base, evidence: {} }), 400, 'evidence_required');
  await rejects(reconcileWrite(db.d, { ...base, evidence: undefined }), 400, 'evidence_required');
  await rejects(reconcileWrite(db.d, { ...base, identity: 'nope' }), 400, 'invalid_identity');
  assert.equal((await stepRow(db, ID_A)).status, 'unknown');
});

test('a step of another ticket is not found', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_B, { scope: 'ticket-99999:zzz', key: 2 });
  await rejects(reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_B, decision: 'applied', reason: 'r', evidence: EVIDENCE, user: admin }),
    404, 'unknown_write_not_found');
});

test('actor without current authority is rejected even if the session still says admin', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  const args = { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'r', evidence: EVIDENCE };
  await rejects(reconcileWrite(db.d, { ...args, user: { id: 1, role: 'admin' } }), 403, 'not_authorized'); // học sinh, session cũ ghi admin
  await rejects(reconcileWrite(db.d, { ...args, user: { id: 404 } }), 403, 'not_authorized');
  await rejects(reconcileWrite(db.d, { ...args, user: null }), 403, 'not_authorized');
  assert.equal((await stepRow(db, ID_A)).status, 'unknown');
  assert.equal((await db.d.get(`SELECT COUNT(*) AS n FROM ai_events WHERE event_type='unknown_write_reconciled'`)).n, 0);
});

test('revoke committing first wins: the waiting reconcile re-reads the role and is rejected', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  const client = await db.d.pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`UPDATE users SET role='student' WHERE id=9`);
    let settled = false;
    const pending = reconcileWrite(db.d, { ticketId: ticket.id, identity: ID_A, decision: 'applied', reason: 'r', evidence: EVIDENCE, user: admin })
      .finally(() => { settled = true; });
    pending.catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 300));
    assert.equal(settled, false);
    await client.query('COMMIT');
    await rejects(pending, 403, 'not_authorized');
  } finally { client.release(); }
  assert.equal((await stepRow(db, ID_A)).status, 'unknown');
});

test('compensate keeps the ticket blocked until closed; resume requeues the same ticket', async () => {
  const { db, store, ticket, seed, planHash } = await fixture();
  await seed(ID_A);
  const args = { ticketId: ticket.id, identity: ID_A, reason: 'hoàn tác tay', evidence: EVIDENCE, user: admin, resume: true };
  const first = await reconcileWrite(db.d, { ...args, decision: 'compensate' });
  assert.deepEqual([first.status, first.remaining_open, first.resumed], ['compensate', 1, false]);
  await rejects(reconcileWrite(db.d, { ...args, decision: 'compensate' }), 409, 'not_reconcilable');
  assert.deepEqual((await listUnknownWrites(db.d, ticket.id)).open.map((w) => w.status), ['compensate']);
  const root = () => db.d.get('SELECT status, phase FROM ai_tickets WHERE id=?', [ticket.id]);
  assert.deepEqual({ ...await root() }, { status: 'waiting_admin', phase: 'critical_violation' });

  const closed = await reconcileWrite(db.d, { ...args, decision: 'not_applied', reason: 'đã bù trừ xong' });
  assert.deepEqual([closed.status, closed.remaining_open, closed.resumed], ['void', 0, true]);
  assert.deepEqual({ ...await root() }, { status: 'queued', phase: 'authorized' });
  assert.equal((await stepRow(db, ID_A)).status, 'void');

  const claimed = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  assert.equal(claimed?.id, ticket.id);
  assert.equal(claimed.trigger, 'execute');
  const lease = { workerId: 'w1', leaseToken: claimed.lease_token };
  const nextRun = await store.createRun(ticket.id, { ...lease, trigger: 'execute', idempotencyKey: 'uw-run-002' });
  const resumed = await store.resumeAuthorizedPlan(ticket.id, { ...lease, runId: nextRun.id });
  assert.deepEqual([resumed.status, resumed.plan_hash], ['planned', planHash]); // worker nhận lại đúng plan_hash để vào đúng checkpoint
});

test('resume stays off unless asked and while another step is still open', async () => {
  const { db, ticket, seed } = await fixture();
  await seed(ID_A);
  await seed(ID_B, { step: 1 });
  const args = { ticketId: ticket.id, reason: 'r', evidence: EVIDENCE, user: admin, resume: true };
  assert.equal((await reconcileWrite(db.d, { ...args, identity: ID_A, decision: 'applied' })).resumed, false); // còn ID_B
  assert.equal((await reconcileWrite(db.d, { ...args, identity: ID_B, decision: 'applied', resume: false })).resumed, false);
  assert.equal((await db.d.get('SELECT status FROM ai_tickets WHERE id=?', [ticket.id])).status, 'waiting_admin');
});

async function httpFixture() {
  const f = await fixture();
  await f.seed(ID_A);
  const app = express();
  app.use(express.json());
  const sessions = { 1: { id: 1, role: 'student' }, 9: { id: 9, role: 'admin' }, 2: { id: 1, role: 'admin' } }; // 2 = session admin cũ của tài khoản đã bị hạ quyền
  app.use((req, _res, next) => { req.user = sessions[req.headers['x-test-user']] || null; next(); });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store: f.store, requireAuth: (req, res, next) => (req.user ? next() : res.status(401).end()), requireEnrolled: pass,
    requireAdmin: (req, res, next) => (req.user?.role === 'admin' ? next() : res.status(403).end()), requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const call = async (method, url, { user, body } = {}) => {
    const res = await fetch(`http://127.0.0.1:${server.address().port}${url}`, { method, body: body && JSON.stringify(body),
      headers: { 'content-type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}) } });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  return { ...f, call, close: () => server.close() };
}

test('HTTP: admin lists and reconciles; student and stale-admin sessions are refused', async () => {
  const f = await httpFixture();
  try {
    const url = `/api/admin/ai-board/tickets/${f.ticket.id}/unknown-writes`;
    assert.equal((await f.call('GET', url)).status, 401);
    assert.equal((await f.call('GET', url, { user: 1 })).status, 403);
    assert.equal((await f.call('GET', url, { user: 9 })).body.open.length, 1);
    const body = { decision: 'applied', reason: 'đã thấy bản ghi', evidence: EVIDENCE };
    assert.equal((await f.call('POST', `${url}/${ID_A}/reconcile`, { user: 1, body })).status, 403);
    const stale = await f.call('POST', `${url}/${ID_A}/reconcile`, { user: 2, body });
    assert.deepEqual([stale.status, stale.body.error], [403, 'not_authorized']);
    assert.equal((await f.call('POST', `${url}/${ID_A}/reconcile`, { user: 9, body: { ...body, reason: '' } })).status, 400);
    const ok = await f.call('POST', `${url}/${ID_A}/reconcile`, { user: 9, body });
    assert.deepEqual([ok.status, ok.body.status], [200, 'applied']);
    assert.equal((await f.call('POST', `${url}/${ID_A}/reconcile`, { user: 9, body })).status, 409);
  } finally { f.close(); }
});
