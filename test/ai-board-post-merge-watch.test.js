// Sau khi 1 thay đổi self merge, so tỉ lệ ready_for_pr và tỉ lệ merge trên production
// 7 ngày sau với 7 ngày trước (chỉ khi đủ ≥10 lượt mỗi bên); tụt quá ngưỡng → tự tạo đúng 1 yêu cầu self
// revert (không tự merge). Dữ liệu lượt production được chèn thẳng (giống insertLabelled) vì
// chỉ cần kiểm soát created_at/outcome/số PR, không cần chạy hết pipeline cho hàng chục lượt.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { checkPostMergeWatch, pendingPostMergeWatch } from '../server/ai-board/post-merge-watch.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SKILL = 'ai-board/harness/skills/edit-html-text/SKILL.md';
const SHA = (c) => c.repeat(40);
const DAY = 24 * 3600_000;
const PMW = LIMITS.self_improve.post_merge_watch; // {days, min_runs, max_drop_pts}

const EVAL = { accepted: true, base_sha: SHA('a'), variant_sha: SHA('b'), tasks: 6, wins: 3, losses: 1, ties: 2,
  gpu_s: 100, gpu_s_limit: 2400, gold: false, dropped: [], strata: { base: {}, variant: {} },
  config: { base: {}, variant: {} }, pairs: [] };
const selfGates = () => [{ gate: 3, blocked: false }, { gate: 4, blocked: false, issues: [] },
  { gate: 5, blocked: false, smoke_passed: false, http_observed: false, runner: 'eval', eval: EVAL },
  { gate: 5.5, blocked: false, risk_level: 'high', risk_signals: [{ name: 'catalog_tier', tier: 'high', detail: SKILL }] }];
const selfCandidate = { branch: 'ai-board/2026-09-28-ticket-9-abc123', base_sha: SHA('a'), head_sha: SHA('b'),
  commits: [{ sha: SHA('b'), title: 't', files: [SKILL] }] };
const VERDICT = { outcome: 'needs_review', gate_reached: 5.5, reason: 'risk triage requires human review',
  budget_used: 10, failure_class: null, repairs: [], candidate: selfCandidate, gates: selfGates() };

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
  const worker = (url, body = {}) => call('POST', url, { body: { worker_id: 'w1', ...body }, headers: { 'x-ai-worker-key': KEY } });
  const nights = async () => (await call('GET', '/api/admin/ai-board/self-improve', { user: 9 })).body;
  const pending = () => worker('/api/ai-board/worker/self-improve/post-merge-watch/pending');
  const check = (prNumber) => worker('/api/ai-board/worker/self-improve/post-merge-watch/check', { pr_number: prNumber });

  let n = 0;
  /** Tạo + admin duyệt plan + thực hiện 1 yêu cầu self trọn vẹn, trả lease đang giữ + verdict. */
  function selfRun(targetFile = SKILL) {
    n += 1;
    const created = store.createSelfRequest({ title: `Sửa skill ${n}`, detail: 'Chẩn đoán.', targetFile,
      idempotencyKey: `pmw-self-${n}` });
    const id = created.root_ticket_id;
    const ticket = store.claimNext({ workerId: 'w1', version: 't', mode: 'active', intent: 'plan' });
    assert.equal(ticket.id, id);
    const planLease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const planRun = store.createRun(id, { ...planLease, trigger: 'plan', idempotencyKey: `pmw-plan-run-${n}` });
    const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: [targetFile], acceptance: ['đổi'],
      tests: ['pytest'], capability: 'self.config', risk: 'low', non_goals: [] };
    const waiting = store.submitPlan(id, { ...planLease, runId: planRun.id, budgetUsed: 1, idempotencyKey: `pmw-plan-${n}`,
      plan: { domain: 'ai-board', goal: 'Sửa.', allowed_scope: [targetFile], acceptance: step.acceptance,
        tests: step.tests, capabilities: ['self.config'], risk: 'low', non_goals: [], steps: [step] } });
    store.releaseLease(id, { ...planLease, outcome: 'planned', idempotencyKey: `pmw-release-${n}` });
    store.authorizePlan(id, waiting.plan_hash, 9);
    const exec = store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: exec.lease_token };
    const run = store.createRun(id, { ...lease, trigger: 'execute', idempotencyKey: `pmw-exec-run-${n}` });
    store.resumeAuthorizedPlan(id, { ...lease, runId: run.id });
    store.submitPrePrVerdict(id, { ...lease, runId: run.id, verdict: VERDICT, idempotencyKey: `pmw-verdict-${n}` });
    return { id, run, lease };
  }
  /** Mở PR cho 1 self run vừa qua verdict rồi báo merged qua HTTP worker, closed_at tuỳ chọn. */
  async function mergeSelfPr({ id, run, lease }, prNumber, { closedAt = Date.now(), files = [SKILL] } = {}) {
    store.recordPullRequest(id, { ...lease, runId: run.id, idempotencyKey: `pmw-pr-${prNumber}`,
      pullRequest: { number: prNumber, url: `https://github.com/Lampx83/Tizia/pull/${prNumber}`, base: 'dev',
        branch: selfCandidate.branch, base_sha: selfCandidate.base_sha, head_sha: selfCandidate.head_sha } });
    store.releaseLease(id, { ...lease, outcome: 'planned', idempotencyKey: `pmw-post-release-${prNumber}` });
    const res = await worker('/api/ai-board/worker/pull-requests/state',
      { number: prNumber, state: 'merged', closed_at: closedAt, files });
    assert.equal(res.status, 200);
  }
  let prodId = 100;
  /** 1 lượt production (yêu cầu type='other' đã có verdict) chèn thẳng — chỉ cần created_at/outcome/PR kiểm soát được. */
  function insertProdRun({ createdAt, outcome = 'ready_for_pr', prNumber = null }) {
    prodId += 1;
    const id = prodId;
    db.prepare(`INSERT INTO requests(id, domain, type, title, detail, student, created_at, updated_at)
      VALUES (?, 'pharmacy', 'other', 'x', 'x', 'x', ?, ?)`).run(id, createdAt, createdAt);
    db.prepare(`INSERT INTO ai_tickets(id, source_request_id, kind, title, status, phase, created_at, updated_at)
      VALUES (?, ?, 'root', 'x', 'done', 'pre_pr_ready', ?, ?)`).run(id, id, createdAt, createdAt);
    const evidence = prNumber ? JSON.stringify({ pull_request: { number: prNumber } }) : null;
    db.prepare(`INSERT INTO ai_runs(id, ticket_id, attempt, trigger, outcome, idempotency_key, evidence_json, created_at, updated_at)
      VALUES (?, ?, 1, 'execute', ?, ?, ?, ?, ?)`).run(id, id, outcome, `prod-run-${id}`, evidence, createdAt, createdAt);
  }
  function insertMergedPr(number, closedAt) {
    db.prepare(`INSERT INTO ai_pull_requests(number, state, closed_at, files, reported_at) VALUES (?, 'merged', ?, '[]', ?)`)
      .run(number, closedAt, closedAt);
  }
  let prNumSeq = 80000;
  /** n lượt production quanh mốc anchor: readyFrac tỉ lệ ready_for_pr, mergeFrac tỉ lệ có PR merged (số nguyên). */
  function seedWindow(anchor, spanMs, count, readyFrac, mergeFrac) {
    const readyCount = Math.round(count * readyFrac);
    const mergeCount = Math.round(count * mergeFrac);
    for (let i = 0; i < count; i += 1) {
      const createdAt = anchor + Math.floor((i * spanMs) / count);
      const outcome = i < readyCount ? 'ready_for_pr' : 'blocked';
      let prNumber = null;
      if (i < mergeCount) {
        prNumSeq += 1;
        prNumber = prNumSeq;
        insertMergedPr(prNumber, createdAt);
      }
      insertProdRun({ createdAt, outcome, prNumber });
    }
  }
  return { db, store, call, worker, nights, pending, check, selfRun, mergeSelfPr, insertProdRun, insertMergedPr,
    seedWindow, close: () => server.close() };
}

test('a merged self PR is not pending until the "after" window (days) has fully elapsed', async () => {
  const f = await fixture();
  try {
    const self = f.selfRun();
    const closedAt = Date.now() - (PMW.days - 1) * DAY; // còn 1 ngày nữa mới đủ cửa sổ sau
    await f.mergeSelfPr(self, 60, { closedAt });
    assert.deepEqual((await f.pending()).body.pending, []);
  } finally { f.close(); }
});

test('a merged non-self PR never becomes a pending post-merge watch', async () => {
  const f = await fixture();
  try {
    const other = f.selfRun(); // dùng hạ tầng self để mở PR nhanh, rồi đổi request về type khác
    const requestId = f.db.prepare('SELECT source_request_id FROM ai_tickets WHERE id=?').get(other.id).source_request_id;
    f.db.prepare("UPDATE requests SET type='other' WHERE id=?").run(requestId);
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.mergeSelfPr(other, 61, { closedAt });
    assert.deepEqual((await f.pending()).body.pending, []);
  } finally { f.close(); }
});

test('fewer than min_runs production runs on either side: waiting, no conclusion, still pending next time', async () => {
  const f = await fixture();
  try {
    const self = f.selfRun();
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.mergeSelfPr(self, 70, { closedAt });
    f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs - 2, 0.9, 0.9); // trước: thiếu
    f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.9, 0.9); // sau: đủ

    const before1 = (await f.pending()).body.pending;
    assert.deepEqual(before1, [{ pr_number: 70, sha: selfCandidate.head_sha, closed_at: closedAt }]);
    const result = (await f.check(70)).body.watch;
    assert.equal(result.status, 'waiting');
    assert.equal(result.before_runs, PMW.min_runs - 2);
    assert.equal(result.after_runs, PMW.min_runs);
    assert.equal(result.revert_request_id, null);

    // vẫn còn trong danh sách chờ lần sau (không kết luận, đợi thêm) — khác 'ok'/'dropped' đã chốt.
    assert.deepEqual((await f.pending()).body.pending, [{ pr_number: 70, sha: selfCandidate.head_sha, closed_at: closedAt }]);
    assert.equal(f.db.prepare("SELECT COUNT(*) n FROM requests WHERE type='self' AND idempotency_key LIKE 'self-revert:%'")
      .get().n, 0);
  } finally { f.close(); }
});

test('enough data, no meaningful drop: concluded ok, no revert, drops out of pending', async () => {
  const f = await fixture();
  try {
    const self = f.selfRun();
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.mergeSelfPr(self, 71, { closedAt });
    f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs, 0.8, 0.8);
    f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.8, 0.8); // giống hệt trước: tụt 0 điểm

    const result = (await f.check(71)).body.watch;
    assert.equal(result.status, 'ok');
    assert.equal(result.drop_ready_pts, 0);
    assert.equal(result.drop_merge_pts, 0);
    assert.equal(result.revert_request_id, null);
    assert.deepEqual((await f.pending()).body.pending, []); // đã kết luận: không kiểm lại

    const admin = await f.nights();
    const watched = admin.post_merge_watch.find((w) => w.pr_number === 71);
    assert.equal(watched.status, 'ok');
  } finally { f.close(); }
});

test('a drop past the threshold creates exactly one self revert request, tier protected via the usual pipeline', async () => {
  const f = await fixture();
  try {
    const self = f.selfRun('ai-board/harness/prompts/brainstorm.md');
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.mergeSelfPr(self, 72, { closedAt, files: ['ai-board/harness/prompts/brainstorm.md'] });
    f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs, 0.9, 0.9); // trước: 90%
    f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.2, 0.2); // sau: 20% — tụt 70 điểm > ngưỡng

    const result = (await f.check(72)).body.watch;
    assert.equal(result.status, 'dropped');
    assert.ok(result.drop_ready_pts > PMW.max_drop_pts);
    assert.ok(result.revert_request_id);

    const revertRow = f.db.prepare('SELECT type, domain, owner_user_id FROM requests WHERE id=?').get(result.revert_request_id);
    assert.equal(revertRow.type, 'self');
    const tag = f.db.prepare(`SELECT tag FROM ai_ticket_tags tag JOIN ai_tickets t ON t.id = tag.ticket_id
      WHERE t.source_request_id = ? AND tag.tag LIKE 'self_target:%'`).get(result.revert_request_id);
    assert.equal(tag.tag, 'self_target:ai-board/harness/prompts/brainstorm.md'); // nhắm đúng file PR gốc đã sửa

    assert.deepEqual((await f.pending()).body.pending, []); // đã kết luận: không kiểm lại

    // Báo lại (worker gọi lại check cùng PR) không tạo yêu cầu revert thứ hai — idempotency_key theo pr_number.
    const again = checkPostMergeWatch(f.db, 72, f.store.createSelfRequest);
    assert.equal(again.revert_request_id, result.revert_request_id);
    assert.equal(f.db.prepare("SELECT COUNT(*) n FROM requests WHERE idempotency_key='self-revert:pr-72'").get().n, 1);

    const admin = await f.nights();
    const watched = admin.post_merge_watch.find((w) => w.pr_number === 72);
    assert.equal(watched.status, 'dropped');
    assert.equal(watched.revert_request_id, result.revert_request_id);
  } finally { f.close(); }
});

test('the post-merge-watch worker routes require the worker key; check on an unknown PR 404s', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.call('POST', '/api/ai-board/worker/self-improve/post-merge-watch/pending', { body: {} })).status, 401);
    assert.equal((await f.call('POST', '/api/ai-board/worker/self-improve/post-merge-watch/check', { body: {} })).status, 401);
    const unknown = await f.check(999);
    assert.equal(unknown.status, 404);
  } finally { f.close(); }
});

test('thresholds, days and min_runs come from limits.self_improve.post_merge_watch, not hardcoded', () => {
  assert.equal(typeof PMW.days, 'number');
  assert.equal(typeof PMW.min_runs, 'number');
  assert.equal(typeof PMW.max_drop_pts, 'number');
});
