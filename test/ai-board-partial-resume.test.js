// Yêu cầu dừng giữa plan nhưng đã xong một phần (LF/107): verdict blocked + failure_class='partial'
// → waiting_admin/partial (giữ checkpoint), người gửi thấy "Hoàn thành một phần" và bấm "Tiếp tục" để
// chạy nốt từ checkpoint — không mở plan mới, không tính là lượt hỏng.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { WorkerContractError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { requesterProgress } from '../server/ai-board/services/requester-progress.js';
import { continuePartialRequest } from '../server/ai-board/services/partial-resume.js';
import { afterVerdict, failedRunStreak } from '../server/ai-board/services/drafts.js';
import { createDraftRepository } from '../server/ai-board/repositories/drafts.js';

const FILES = ['public/the.html', 'public/the-2.html', 'public/the-3.html'];

function planBody() {
  return {
    domain: 'pharmacy', goal: 'Thêm bộ thẻ ghi nhớ.', allowed_scope: FILES,
    acceptance: ['node --test test/p1.test.js'], tests: ['node --test'], capabilities: ['public.ui'],
    risk: 'low', non_goals: ['x'],
    steps: FILES.map((file, index) => ({
      order: index + 1, title: `Trang ${index + 1}`, description: 'Một phần của chức năng.',
      allowed_scope: [file], acceptance: [`node --test test/p${index + 1}.test.js`], tests: ['node --test'],
      capability: 'public.ui', risk: 'low', non_goals: ['x'], depends_on: index ? [index] : [],
    })),
  };
}

async function plannedRoot() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [2, 'minh', 'Minh', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  const request = await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'pr-request-001', title: 'Thêm bộ thẻ ghi nhớ', detail: 'fixture',
  });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'pr-run-001' });
  await store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'pr-plan-001', plan: planBody(),
  });
  const submit = async (verdict, now, key = 'pr-verdict-001') => store.submitPrePrVerdict(ticket.id, {
    ...lease, runId: run.id, verdict, idempotencyKey: key, now,
  });
  return { db, store, ticket, request, submit };
}

function partialVerdict(extra = {}) {
  return {
    outcome: 'blocked', gate_reached: 3, budget_used: 12,
    reason: 'hoàn thành một phần 2/3 subtask; còn 1; budget cạn trước subtask 3', failure_class: 'partial',
    repairs: [], candidate: null,
    gates: [{ gate: 3, blocked: true, reason: 'hoàn thành một phần 2/3 subtask; còn 1' }], ...extra,
  };
}

test('a partial gate 3 waits for the requester in phase partial, not as a failure', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(partialVerdict(), Date.now());

  const root = await db.prepare('SELECT status, phase, public_note FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.equal(root.status, 'waiting_admin');
  assert.equal(root.phase, 'partial');
  assert.match(root.public_note, /Tiếp tục/);
  const run = await db.prepare('SELECT outcome FROM ai_runs WHERE ticket_id=? ORDER BY id DESC LIMIT 1').get(ticket.id);
  assert.equal(run.outcome, 'blocked');
  // Không phải lượt hỏng: không sinh ticket sửa lỗi, không mở plan mới.
  const repairs = await db.prepare("SELECT COUNT(*) AS n FROM ai_tickets WHERE parent_id=? AND kind='review_fix'").get(ticket.id);
  assert.equal(Number(repairs.n), 0);
  // Và không tính vào chuỗi lượt hỏng (2 lượt hỏng mới chuyển admin) hay hàng task eval.
  assert.equal(Number(await failedRunStreak(createDraftRepository(db.d), ticket.id)), 0);
  assert.equal(await db.prepare('SELECT COUNT(*) AS n FROM ai_eval_tasks').get().then((r) => Number(r.n)), 0);
});

test('the bell for a partial verdict invites the requester to continue instead of handing off', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(partialVerdict(), Date.now());
  const notice = await afterVerdict(createDraftRepository(db.d), ticket.id, { outcome: 'blocked', failure_class: 'partial' });
  assert.equal(notice.kind, 'partial');
});

test('the requester sees "edit", an admin sees "continue", and continue requeues the same plan', async () => {
  const { db, store, submit, ticket, request } = await plannedRoot();
  await submit(partialVerdict(), Date.now());

  const ownerView = await requesterProgress(store, request.request_id, 1);
  assert.equal(ownerView.can_continue, false);  // người gửi không được resume
  assert.equal(ownerView.can_edit, true);
  assert.equal(ownerView.step, 'hoàn thành một phần, chờ tiếp tục');
  assert.equal((await requesterProgress(store, request.request_id, 1, true)).can_continue, true);  // admin

  const result = await continuePartialRequest(db.d, request.request_id, null);  // admin
  assert.equal(result.ok, true);
  assert.equal(result.id, request.request_id);
  assert.equal(result.root_ticket_id, ticket.id);
  assert.equal(result.status, 'queued');
  assert.equal(result.phase, 'authorized');
  assert.equal((await requesterProgress(store, request.request_id, 1, true)).can_continue, false);

  const claimed = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  assert.equal(claimed.id, ticket.id);
  assert.equal(claimed.trigger, 'execute');  // chạy lại cổng 3 với plan đã duyệt → checkpoint tự resume
});

test('only the owner (or an admin) can continue, and only while the request is partial', async () => {
  const { db, submit, request } = await plannedRoot();
  await assert.rejects(() => continuePartialRequest(db.d, request.request_id, 1),
    (error) => error instanceof WorkerContractError && error.code === 'not_partial');

  await submit(partialVerdict(), Date.now());
  await assert.rejects(() => continuePartialRequest(db.d, request.request_id, 2),
    (error) => error instanceof WorkerContractError && error.code === 'not_owner');
  assert.equal((await continuePartialRequest(db.d, request.request_id, null)).phase, 'authorized');  // admin
});

test('a partial failure class is only valid on a blocked gate 3', async () => {
  const { submit } = await plannedRoot();
  const gates = [
    { gate: 3, blocked: false, reason: null },
    { gate: 4, blocked: false, reason: null, issues: [] },
    { gate: 5, blocked: true, reason: 'smoke failed', smoke_passed: false, http_observed: false },
  ];
  await assert.rejects(() => submit(partialVerdict({ gate_reached: 5, gates }), Date.now()),
    (error) => error instanceof WorkerContractError && /partial/.test(error.message));
});

async function httpFixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [2, 'minh', 'Minh', 'student', 'pharmacy'],
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

test('route: only an admin continues a partial request; the owner is refused and told to edit instead', async () => {
  const f = await httpFixture();
  try {
    const created = await f.store.createRequestWithRoot({
      ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'pr-http-001', title: 'Thêm bộ thẻ', detail: 'fixture',
    });
    const ticket = await f.store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = await f.store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'pr-http-run' });
    await f.store.submitPlan(ticket.id, {
      ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'pr-http-plan', plan: planBody(),
    });
    const url = `/api/requests/${created.request_id}/continue`;
    assert.equal((await f.call('POST', url, { user: 2, body: {} })).status, 403);  // không phải admin
    await f.store.submitPrePrVerdict(ticket.id, {
      ...lease, runId: run.id, verdict: partialVerdict(), idempotencyKey: 'pr-http-verdict', now: Date.now(),
    });

    // Người gửi không được resume: chỉ thấy nút sửa yêu cầu; gọi continue bị 403.
    const owner = await f.call('GET', `/api/requests/${created.request_id}/progress`, { user: 1 });
    assert.equal(owner.body.can_continue, false);
    assert.equal(owner.body.can_edit, true);
    assert.equal((await f.call('POST', url, { user: 1, body: {} })).status, 403);

    const done = await f.call('POST', url, { user: 9, body: {} });  // admin (id 9)
    assert.equal(done.status, 200);
    assert.equal(done.body.status, 'queued');
    assert.equal(done.body.phase, 'authorized');
    assert.equal((await f.call('GET', `/api/requests/${created.request_id}/progress`, { user: 1 })).body.can_continue, false);
  } finally { f.close(); }
});
