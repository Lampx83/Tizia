// Mỗi lần hỏng ở production → 1 task eval ứng viên; admin gắn nhãn; worker lấy phần học/kiểm tra.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);
const G = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } }, runner: 'docker', retried: false },
  55: { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
};
const PASSING = {
  outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 10, failure_class: null, repairs: [],
  candidate: { branch: 'ai-board/2026-09-26-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
    commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 x', files: ['public/admin.html'] }] },
  gates: [G[3], G[4], G[5], G[55]],
};
const BLOCKED = {
  outcome: 'blocked', gate_reached: 4, reason: 'lint', budget_used: 10, failure_class: 'ordinary', repairs: [],
  candidate: null, gates: [G[3], { gate: 4, blocked: true, reason: 'lint', issues: [] }],
  base_sha: SHA_A, skill: 'edit-html-text',
};
const DAY = 24 * 3600_000;

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan.nguyen', 'Lan Nguyễn', 'student', 'pharmacy'],
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
  const admin = (method, url, body) => call(method, url, { user: 9, body });
  const worker = (url, body = {}) => call('POST', url, { body: { worker_id: 'w1', ...body }, headers: { 'x-ai-worker-key': KEY } });

  let n = 0;
  /** Yêu cầu mới + 1 lượt: claim → run → plan → verdict qua HTTP. */
  async function miss(verdict = BLOCKED, { title = 'Sửa trang admin', files = ['public/admin.html'], pr = null } = {}) {
    n += 1;
    await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan Nguyễn',
      idempotencyKey: `eval-request-${n}`, title, detail: 'Chi tiết yêu cầu' });
    const ticket = await store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `eval-run-${n}` });
    const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: files,
      acceptance: ['đổi'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
    await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 1, idempotencyKey: `eval-plan-${n}`,
      plan: { domain: 'pharmacy', goal: 'Sửa trang.', allowed_scope: files, acceptance: step.acceptance,
        tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
    const body = { worker_id: 'w1', lease_token: ticket.lease_token, run_id: run.id };
    const verdictUrl = `/api/ai-board/worker/tickets/${ticket.id}/verdict`;
    const sent = await worker(verdictUrl, { ...body, verdict, idempotency_key: `eval-verdict-${n}` });
    assert.equal(sent.status, 200);
    if (pr) {
      const { branch, base_sha: baseSha, head_sha: headSha } = verdict.candidate;
      await store.recordPullRequest(ticket.id, { ...lease, runId: run.id, idempotencyKey: `eval-pr-${n}`, pullRequest: {
        number: pr, url: `https://github.com/Lampx83/Tizia/pull/${pr}`, base: 'dev', branch, base_sha: baseSha, head_sha: headSha } });
    }
    await store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: `eval-release-${n}` });
    const resend = () => worker(verdictUrl, { ...body, verdict, idempotency_key: `eval-verdict-${n}` });
    return { requestId: n, ticketId: ticket.id, runId: run.id, resend };
  }
  const candidates = async () => (await admin('GET', '/api/admin/ai-board/eval-tasks')).body.tasks;
  return { db, store, call, admin, worker, miss, candidates, close: () => server.close() };
}

test('a blocked verdict becomes exactly one candidate task, without the requester identity', async () => {
  const f = await fixture();
  try {
    const { requestId, runId, resend } = await f.miss();
    await resend(); // worker gửi lại cùng verdict
    const tasks = await f.candidates();
    assert.equal(tasks.length, 1);
    const [task] = tasks;
    assert.equal(task.status, 'candidate');
    assert.equal(task.source, 'miss');
    assert.equal(task.trigger, 'verdict_blocked');
    assert.equal(task.request_id, requestId);
    assert.equal(task.run_id, runId);
    assert.match(task.request_text, /Sửa trang admin/);
    assert.equal(task.base_sha, SHA_A);
    assert.equal(task.gate, 4);
    assert.equal(task.failure_class, 'ordinary');
    assert.equal(task.skill, 'edit-html-text');
    assert.deepEqual(task.expected_files, ['public/admin.html']); // gợi ý từ plan
    const row = JSON.stringify((await f.db.prepare('SELECT * FROM ai_eval_tasks').all()));
    for (const who of ['Lan', 'lan.nguyen', 'owner', 'student']) assert.equal(row.includes(who), false, who);
  } finally { f.close(); }
});

test('an environment (transient) block is not a board miss', async () => {
  const f = await fixture();
  try {
    await f.miss({ ...BLOCKED, failure_class: 'transient' });
    assert.equal((await f.candidates()).length, 0);
  } finally { f.close(); }
});

test('"Thử cách khác" on a miss keeps one task per miss, and records a miss the verdict did not', async () => {
  const f = await fixture();
  try {
    const { requestId } = await f.miss();
    const other = await f.miss(BLOCKED, { title: 'Yêu cầu thứ hai' });
    (await f.db.prepare('DELETE FROM ai_eval_tasks WHERE run_id=?').run(other.runId)); // lần hỏng có từ trước bảng này
    const retry = await f.call('POST', `/api/requests/${requestId}/retry`, { user: 1 });
    assert.equal(retry.status, 200);
    assert.equal((await f.candidates()).length, 1, 'cùng lần hỏng với verdict: không thêm task');

    assert.equal((await f.call('POST', `/api/requests/${other.requestId}/retry`, { user: 1 })).status, 200);
    const tasks = await f.candidates();
    assert.equal(tasks.length, 2);
    assert.equal(tasks.find((t) => t.run_id === other.runId).trigger, 'retry');
  } finally { f.close(); }
});

test('admin undo turns the kept change into one candidate task, however often it is pressed', async () => {
  const f = await fixture();
  try {
    const { requestId, runId } = await f.miss(PASSING);
    assert.equal((await f.candidates()).length, 0, 'lượt đạt không phải lần hỏng');
    const undo = () => f.admin('POST', `/api/admin/ai-board/requests/${requestId}/rollback`, { confirm: String(requestId) });
    assert.equal((await undo()).status, 200);
    assert.equal((await undo()).status, 200);
    const tasks = await f.candidates();
    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].trigger, 'undo');
    assert.equal(tasks[0].run_id, runId);
    assert.equal(tasks[0].base_sha, SHA_A);
    assert.deepEqual(tasks[0].expected_files, ['public/admin.html']); // file của commit bị hoàn tác
  } finally { f.close(); }
});

test('eval task routes are admin only, the worker route needs the worker key', async () => {
  const f = await fixture();
  try {
    await f.miss();
    const [task] = await f.candidates();
    assert.equal((await f.call('GET', '/api/admin/ai-board/eval-tasks', { user: 1 })).status, 403);
    assert.equal((await f.call('POST', `/api/admin/ai-board/eval-tasks/${task.id}/label`,
      { user: 1, body: { expected_files: ['public/admin.html'] } })).status, 403);
    assert.equal((await f.call('DELETE', `/api/admin/ai-board/eval-tasks/${task.id}`, { user: 1 })).status, 403);
    assert.equal((await f.call('POST', '/api/ai-board/worker/eval-tasks', { body: {} })).status, 401);
  } finally { f.close(); }
});

test('admin labels a candidate in one call, and delete wipes it for good', async () => {
  const f = await fixture();
  try {
    const first = await f.miss();
    await f.miss(BLOCKED, { title: 'Yêu cầu bí mật' });
    const [a, b] = await f.candidates();
    const url = `/api/admin/ai-board/eval-tasks/${a.id}/label`;
    assert.equal((await f.admin('POST', url, { expected_files: [] })).status, 400);
    assert.equal((await f.admin('POST', url, { expected_files: ['../etc/passwd'] })).status, 400);
    const labelled = await f.admin('POST', url, { expected_files: ['public/admin.html'],
      must_contain: ['Tự cải thiện'], must_not_contain: ['TODO'] });
    assert.equal(labelled.status, 200);
    assert.equal(labelled.body.task.status, 'labelled');
    assert.deepEqual(labelled.body.task.must_contain, ['Tự cải thiện']);

    assert.equal((await f.admin('DELETE', `/api/admin/ai-board/eval-tasks/${b.id}`)).status, 200);
    assert.deepEqual(await f.candidates(), []);
    const labelledList = (await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=labelled')).body;
    assert.deepEqual(labelledList.tasks.map((t) => t.id), [a.id]);
    assert.deepEqual(labelledList.counts, { labelled: 1 }, 'task đã xoá không còn trong danh sách nào');
    assert.equal(JSON.stringify((await f.db.prepare('SELECT * FROM ai_eval_tasks').all())).includes('bí mật'), false);
    // Sự kiện lặp lại của lần hỏng đã xoá không hồi sinh task.
    assert.equal((await f.call('POST', `/api/requests/${first.requestId + 1}/retry`, { user: 1 })).status, 200);
    assert.equal((await f.candidates()).length, 0);
  } finally { f.close(); }
});

test('tasks older than the retire age, or whose files are all gone, retire when read', async () => {
  const f = await fixture();
  try {
    await f.miss();
    await f.miss(BLOCKED, { files: ['public/khong-ton-tai-1.html', 'public/khong-ton-tai-2.html'] });
    await f.miss(BLOCKED, { files: ['public/khong-ton-tai-1.html', 'public/admin.html'] });
    (await f.db.prepare('UPDATE ai_eval_tasks SET created_at=? WHERE id=1').run(Date.now() - 181 * DAY));
    const tasks = await f.candidates();
    assert.deepEqual(tasks.map((t) => t.id), [3], 'còn 1 file ở HEAD thì giữ');
    const all = await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=retired');
    assert.deepEqual(all.body.tasks.map((t) => t.id).sort(), [1, 2]);
  } finally { f.close(); }
});

test('the worker gets labelled tasks split by time: oldest 70% to learn from, newest 30% to test on', async () => {
  const f = await fixture();
  try {
    for (let i = 0; i < 10; i += 1) await f.miss();
    const tasks = await f.candidates();
    // Thời điểm xáo trộn: chia theo created_at, không theo id.
    for (const [i, t] of tasks.entries()) {
      await f.db.prepare('UPDATE ai_eval_tasks SET created_at=? WHERE id=?')
        .run(Date.now() - (i % 2 ? i : 20 - i) * DAY, t.id);
    }
    for (const t of tasks.slice(0, 9)) {
      await f.admin('POST', `/api/admin/ai-board/eval-tasks/${t.id}/label`, { expected_files: ['public/admin.html'] });
    }
    const res = await f.worker('/api/ai-board/worker/eval-tasks');
    assert.equal(res.status, 200);
    const { learning, test: held, ready, labelled, min_tasks: min } = res.body;
    assert.equal(labelled, 9);
    assert.equal(min, 20);
    assert.equal(ready, false, 'chưa đủ 20 task có nhãn');
    assert.equal(learning.length, 6);
    assert.equal(held.length, 3);
    const times = [...learning, ...held].map((t) => t.created_at);
    assert.deepEqual(times, [...times].sort((x, y) => x - y));
    assert.ok(learning.every((t) => t.status === 'labelled'));
    assert.equal(JSON.stringify(res.body).includes('Lan'), false);
  } finally { f.close(); }
});

// Worker hỏi GitHub trạng thái PR server còn coi là mở, báo merged / closed.
const openPrs = async (f) => (await f.worker('/api/ai-board/worker/pull-requests/open')).body.pull_requests;
const reportPr = (f, number, state, files = ['public/admin.html', 'public/js/admin-dashboard.js']) => f.worker(
  '/api/ai-board/worker/pull-requests/state', { number, state, closed_at: '2026-09-28T01:00:00Z', files });

test('a merged PR becomes one labelled win task with the PR files, and leaves the open list', async () => {
  const f = await fixture();
  try {
    const { requestId, runId } = await f.miss(PASSING, { pr: 42 });
    assert.deepEqual(await openPrs(f), [{ number: 42, url: 'https://github.com/Lampx83/Tizia/pull/42',
      branch: PASSING.candidate.branch }]);
    const res = await reportPr(f, 42, 'merged');
    assert.equal(res.status, 200);
    assert.equal(res.body.pull_request.state, 'merged');
    assert.equal(res.body.pull_request.closed_at, Date.parse('2026-09-28T01:00:00Z'));
    assert.equal((await reportPr(f, 42, 'merged')).status, 200, 'báo lại: không lỗi');
    assert.deepEqual(await openPrs(f), []);
    const { tasks } = (await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=labelled')).body;
    assert.equal(tasks.length, 1);
    const [task] = tasks;
    assert.equal(task.source, 'win');
    assert.equal(task.trigger, 'pr_merged');
    assert.equal(task.request_id, requestId);
    assert.equal(task.run_id, runId);
    assert.equal(task.base_sha, SHA_A);
    assert.deepEqual(task.expected_files, ['public/admin.html', 'public/js/admin-dashboard.js']);
    assert.ok(task.labelled_at);
  } finally { f.close(); }
});

test('a PR closed without merge becomes one candidate miss prefilled with the PR files', async () => {
  const f = await fixture();
  try {
    const { runId } = await f.miss(PASSING, { pr: 43 });
    assert.equal((await reportPr(f, 43, 'closed', ['public/admin.html'])).status, 200);
    assert.equal((await reportPr(f, 43, 'merged')).body.pull_request.state, 'closed', 'lần báo đầu thắng');
    const tasks = await f.candidates();
    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].source, 'miss');
    assert.equal(tasks[0].trigger, 'pr_closed');
    assert.equal(tasks[0].run_id, runId);
    assert.deepEqual(tasks[0].expected_files, ['public/admin.html']);
    assert.equal((await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=labelled')).body.tasks.length, 0);
  } finally { f.close(); }
});

test('a folder PR shared by two runs labels each run with only its own files', async () => {
  const f = await fixture();
  try {
    await f.miss(PASSING, { pr: 44 });
    const second = { ...PASSING, candidate: { ...PASSING.candidate,
      commits: [{ sha: SHA_B, title: 'ai-board(ticket-2): 1/1 y', files: ['public/js/admin-dashboard.js'] }] } };
    await f.miss(second, { pr: 44 });
    assert.equal((await openPrs(f)).length, 1);
    await reportPr(f, 44, 'merged');
    const { tasks } = (await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=labelled')).body;
    assert.deepEqual(tasks.map((t) => t.expected_files), [['public/admin.html'], ['public/js/admin-dashboard.js']]);
  } finally { f.close(); }
});

test('a self PR records its state but never becomes an eval task', async () => {
  const f = await fixture();
  try {
    const { requestId } = await f.miss(PASSING, { pr: 45 });
    (await f.db.prepare("UPDATE requests SET type='self' WHERE id=?").run(requestId)); // lối tắt: luồng self đủ (duyệt plan) ở test
    assert.deepEqual((await openPrs(f)).map((p) => p.number), [45]);
    const res = await reportPr(f, 45, 'merged', ['ai-board/harness/skills/edit-html-text/SKILL.md']);
    assert.equal(res.status, 200);
    assert.equal(res.body.pull_request.state, 'merged');
    assert.deepEqual(await openPrs(f), []);
    assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM ai_eval_tasks').get()).n, 0);
  } finally { f.close(); }
});

test('PR state routes need the worker key, a recorded PR and a valid state', async () => {
  const f = await fixture();
  try {
    await f.miss(PASSING, { pr: 46 });
    assert.equal((await f.call('POST', '/api/ai-board/worker/pull-requests/open', { body: {} })).status, 401);
    assert.equal((await f.call('POST', '/api/ai-board/worker/pull-requests/state', { body: {} })).status, 401);
    assert.equal((await reportPr(f, 999, 'merged')).status, 404);
    assert.equal((await reportPr(f, 46, 'open')).status, 400);
    assert.equal((await f.worker('/api/ai-board/worker/pull-requests/state', { number: 46, state: 'merged',
      closed_at: 'hôm qua', files: [] })).status, 400);
    assert.equal((await f.db.prepare('SELECT COUNT(*) n FROM ai_eval_tasks').get()).n, 0);
  } finally { f.close(); }
});
