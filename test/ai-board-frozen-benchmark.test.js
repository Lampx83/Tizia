// Self-improve ticket 08: bộ đánh giá đóng băng (chụp lúc bật lần đầu + 2 tuần sau) không bao giờ lọt vào phần
// học/kiểm tra; sau mỗi lần merge 1 thay đổi self, đo lại đúng 1 lần và lưu điểm theo nhóm + sha + mã cấu hình.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);
const DAY = 24 * 3600_000;
const SI = LIMITS.self_improve;
const PASSING = {
  outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 10, failure_class: null, repairs: [],
  candidate: { branch: 'ai-board/2026-09-26-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
    commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 x', files: ['public/admin.html'] }] },
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [] },
    { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false },
    { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] }],
};

async function fixture() {
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
    INSERT INTO users VALUES (1, 'lan.nguyen', 'Lan Nguyễn', 'student', 'pharmacy'), (9, 'boss', 'Boss', 'admin', NULL);
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
  const admin = (method, url, body) => call(method, url, { user: 9, body });
  const worker = (url, body = {}) => call('POST', url, { body: { worker_id: 'w1', ...body }, headers: { 'x-ai-worker-key': KEY } });
  const toggle = (enabled) => admin('POST', '/api/admin/ai-board/self-improve/switch', { enabled });
  const nights = async () => (await call('GET', '/api/admin/ai-board/self-improve', { user: 9 })).body;

  let n = 0;
  /** Yêu cầu mới + 1 lượt đạt qua HTTP, tuỳ chọn mở PR (và đổi loại yêu cầu thành 'self' sau đó). */
  async function passingRun(verdict = PASSING, { title = 'Sửa trang admin', pr = null, self = false } = {}) {
    n += 1;
    store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan Nguyễn',
      idempotencyKey: `fb-request-${n}`, title, detail: 'Chi tiết yêu cầu' });
    const ticket = store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `fb-run-${n}` });
    const files = verdict.candidate?.commits?.[0]?.files ?? ['public/admin.html'];
    const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: files,
      acceptance: ['đổi'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
    store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 1, idempotencyKey: `fb-plan-${n}`,
      plan: { domain: 'pharmacy', goal: 'Sửa trang.', allowed_scope: files, acceptance: step.acceptance,
        tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
    const body = { worker_id: 'w1', lease_token: ticket.lease_token, run_id: run.id };
    const sent = await worker(`/api/ai-board/worker/tickets/${ticket.id}/verdict`, { ...body, verdict, idempotency_key: `fb-verdict-${n}` });
    assert.equal(sent.status, 200);
    let prNumber = null;
    if (pr) {
      const { branch, base_sha: baseSha, head_sha: headSha } = verdict.candidate;
      store.recordPullRequest(ticket.id, { ...lease, runId: run.id, idempotencyKey: `fb-pullreq-${n}`, pullRequest: {
        number: pr, url: `https://github.com/Lampx83/Tizia/pull/${pr}`, base: 'dev', branch, base_sha: baseSha, head_sha: headSha } });
      prNumber = pr;
    }
    store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: `fb-release-${n}` });
    if (self) db.prepare("UPDATE requests SET type='self' WHERE id=?").run(store.db.prepare('SELECT source_request_id FROM ai_tickets WHERE id=?').get(ticket.id).source_request_id);
    return { requestId: n, ticketId: ticket.id, runId: run.id, prNumber };
  }
  const reportPr = (number, state, files = ['ai-board/harness/skills/edit-html-text/SKILL.md']) => worker(
    '/api/ai-board/worker/pull-requests/state', { number, state, closed_at: Date.now(), files });
  const pending = () => worker('/api/ai-board/worker/self-improve/frozen-benchmark/pending');
  const report = (body) => worker('/api/ai-board/worker/self-improve/frozen-benchmark/report', body);
  return { db, store, call, admin, worker, toggle, nights, passingRun, reportPr, pending, report, close: () => server.close() };
}

/** Chèn 1 task đã gắn nhãn trực tiếp (kiểm soát labelled_at cho test cửa sổ đóng băng). */
function insertLabelled(db, id, labelledAt) {
  db.prepare(`INSERT INTO ai_eval_tasks(id, source, trigger, request_id, run_id, request_text, expected_files,
    status, created_at, labelled_at) VALUES (?, 'miss', 'verdict_blocked', 1, ?, 'x', '["package.json"]', 'labelled', ?, ?)`)
    .run(id, id, labelledAt - DAY, labelledAt);
}

test('enabling the switch freezes tasks labelled up to now, plus the 2-week window after — hard-excluded from the split', async () => {
  const f = await fixture();
  try {
    insertLabelled(f.db, 1, Date.now() - DAY); // đã gắn nhãn từ trước khi bật
    await f.toggle(true);
    insertLabelled(f.db, 2, Date.now() + (SI.frozen_window_days - 1) * DAY); // gắn nhãn trong 2 tuần sau khi bật: cũng đóng băng
    insertLabelled(f.db, 3, Date.now() + (SI.frozen_window_days + 1) * DAY); // sau cửa sổ: không đóng băng
    // Đủ 20 task có nhãn để split chạy — chèn sau cửa sổ 2 tuần, không thì chính chúng cũng bị đóng băng.
    for (let i = 4; i <= 22; i += 1) insertLabelled(f.db, i, Date.now() + (SI.frozen_window_days + 2) * DAY);

    const split = (await f.worker('/api/ai-board/worker/eval-tasks')).body;
    const ids = [...split.learning, ...split.test].map((t) => t.id);
    assert.equal(ids.includes(1), false, 'task đã gắn nhãn trước khi bật: đóng băng, loại khỏi split');
    assert.equal(ids.includes(2), false, 'gắn nhãn trong cửa sổ 2 tuần: đóng băng, loại khỏi split');
    assert.equal(ids.includes(3), true, 'gắn nhãn sau cửa sổ 2 tuần: không đóng băng, vẫn vào split');
    assert.equal(split.labelled, 20, '2 task đóng băng (1, 2) không tính vào tổng số task học/kiểm tra');

    const admin = await f.admin('GET', '/api/admin/ai-board/eval-tasks?status=labelled');
    const byId = Object.fromEntries(admin.body.tasks.map((t) => [t.id, t]));
    assert.equal(!!byId[1].frozen, true);
    assert.equal(!!byId[2].frozen, true);
    assert.equal(!!byId[3].frozen, false);
    assert.equal(!!byId[4].frozen, false);
  } finally { f.close(); }
});

test('re-enabling after a disable keeps the original freeze snapshot (frozen_at only set once)', async () => {
  const f = await fixture();
  try {
    await f.toggle(true);
    const firstFrozenAt = f.db.prepare('SELECT frozen_at FROM ai_self_improve_state WHERE id=1').get().frozen_at;
    await f.toggle(false);
    await f.toggle(true);
    const secondFrozenAt = f.db.prepare('SELECT frozen_at FROM ai_self_improve_state WHERE id=1').get().frozen_at;
    assert.equal(secondFrozenAt, firstFrozenAt);
  } finally { f.close(); }
});

test('a merged self PR is measured exactly once; re-reporting the same PR does not duplicate', async () => {
  const f = await fixture();
  try {
    const { prNumber } = await f.passingRun(PASSING, { pr: 50, self: true });
    assert.deepEqual((await f.pending()).body.pending, []); // PR chưa merge: chưa có gì cần đo
    await f.reportPr(prNumber, 'merged');
    const pendingBefore = (await f.pending()).body;
    assert.deepEqual(pendingBefore.pending, [{ pr_number: prNumber, sha: SHA_B }]);
    assert.deepEqual(pendingBefore.tasks, []); // chưa có task đóng băng nào

    const strata = { 'type=ui': 82.5, gold_gate3: 100, frozen_tasks: 90 };
    const scored = await f.report({ pr_number: prNumber, sha: SHA_B, config: { 'prompts.lock.json': 'abc1234567' },
      strata, gpu_s: 340 });
    assert.equal(scored.status, 200);
    assert.equal(scored.body.score.pr_number, prNumber);
    assert.equal(scored.body.score.sha, SHA_B);
    assert.deepEqual(scored.body.score.strata, strata);
    assert.deepEqual(scored.body.score.config_hash, { 'prompts.lock.json': 'abc1234567' });

    assert.deepEqual((await f.pending()).body.pending, [], 'đã đo rồi: không còn trong danh sách chờ');
    // Báo lại (worker lỡ gọi lại) → không lỗi, không tạo dòng thứ hai, giữ điểm lần đầu.
    const again = await f.report({ pr_number: prNumber, sha: SHA_B, config: {}, strata: { 'type=ui': 1 }, gpu_s: 1 });
    assert.equal(again.status, 200);
    assert.equal(f.db.prepare('SELECT COUNT(*) n FROM ai_frozen_benchmark_scores WHERE pr_number=?').get(prNumber).n, 1);
    assert.deepEqual(f.db.prepare('SELECT strata FROM ai_frozen_benchmark_scores WHERE pr_number=?').get(prNumber).strata,
      JSON.stringify(strata), 'giữ điểm lần đo đầu, không ghi đè');

    const nights = await f.nights();
    assert.equal(nights.frozen.length, 1);
    assert.equal(nights.frozen[0].pr_number, prNumber);
    assert.equal(nights.frozen[0].pr_url, `https://github.com/Lampx83/Tizia/pull/${prNumber}`);
    assert.deepEqual(nights.frozen[0].strata, strata);
  } finally { f.close(); }
});

test('a merged non-self PR is never a pending frozen measurement', async () => {
  const f = await fixture();
  try {
    const { prNumber } = await f.passingRun(PASSING, { pr: 51, self: false });
    await f.reportPr(prNumber, 'merged');
    assert.deepEqual((await f.pending()).body.pending, []);
  } finally { f.close(); }
});

test('the frozen-benchmark worker routes need the worker key, and report validates its input', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.call('POST', '/api/ai-board/worker/self-improve/frozen-benchmark/pending', { body: {} })).status, 401);
    assert.equal((await f.call('POST', '/api/ai-board/worker/self-improve/frozen-benchmark/report', { body: {} })).status, 401);
    assert.equal((await f.report({ pr_number: 0, sha: SHA_B, strata: {} })).status, 400);
    assert.equal((await f.report({ pr_number: 1, sha: 'not-a-sha', strata: {} })).status, 400);
  } finally { f.close(); }
});
