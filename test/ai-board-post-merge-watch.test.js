// Sau khi 1 thay đổi self merge, so tỉ lệ ready_for_pr và tỉ lệ merge trên production
// 7 ngày sau với 7 ngày trước (chỉ khi đủ ≥10 lượt mỗi bên); tụt quá ngưỡng → tự tạo đúng 1 yêu cầu self
// revert (không tự merge). Dữ liệu lượt production được chèn thẳng (giống insertLabelled) vì
// chỉ cần kiểm soát created_at/outcome/số PR, không cần chạy hết pipeline cho hàng chục lượt.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { checkPostMergeWatch, pendingPostMergeWatch } from '../server/ai-board/post-merge-watch-async.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SKILL = 'ai-board/harness/skills/edit-html-text/SKILL.md';
const SHA = (c) => c.repeat(40);
const DAY = 24 * 3600_000;
const PMW = LIMITS.self_improve.post_merge_watch; // {days, min_runs, max_drop_pts}

const selfCandidate = { branch: 'ai-board/2026-09-28-ticket-9-abc123', base_sha: SHA('a'), head_sha: SHA('b'),
  commits: [{ sha: SHA('b'), title: 't', files: [SKILL] }] };

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'it'],
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
  const worker = (url, body = {}) => call('POST', url, { body: { worker_id: 'w1', ...body }, headers: { 'x-ai-worker-key': KEY } });
  const nights = async () => (await call('GET', '/api/admin/ai-board/self-improve', { user: 9 })).body;
  const pending = () => worker('/api/ai-board/worker/self-improve/post-merge-watch/pending');
  const check = (prNumber) => worker('/api/ai-board/worker/self-improve/post-merge-watch/check', { pr_number: prNumber });

  let n = 0;
  let runId = 900000;
  /** Self PR đã có trong DB: root self (createRequestWithRoot, route self đã tắt) + run mang pull_request.number, rồi báo merged. */
  async function selfPr(prNumber, { target = SKILL, closedAt = Date.now() } = {}) {
    n += 1;
    const created = await store.createRequestWithRoot({ ownerUserId: 9, ownerDomain: 'ai-board', ownerDisplayName: 'ai-board',
      title: `Sửa skill ${n}`, detail: 'Chẩn đoán.', selfTarget: target, idempotencyKey: `pmw-self-${n}` });
    runId += 1;
    const now = Date.now();
    await db.prepare(`INSERT INTO ai_runs(id, ticket_id, attempt, trigger, outcome, idempotency_key, evidence_json, created_at, updated_at)
      VALUES (?, ?, 1, 'execute', 'needs_review', ?, ?, ?, ?)`).run(runId, created.root_ticket_id, `pmw-run-${runId}`,
      JSON.stringify({ pull_request: { number: prNumber }, verdict: { candidate: selfCandidate } }), now, now);
    const res = await worker('/api/ai-board/worker/pull-requests/state',
      { number: prNumber, state: 'merged', closed_at: closedAt, files: [target] });
    assert.equal(res.status, 200);
  }
  let prodId = 100;
  /** 1 lượt production (yêu cầu type='other' đã có verdict) chèn thẳng — chỉ cần created_at/outcome/PR kiểm soát được. */
  async function insertProdRun({ createdAt, outcome = 'ready_for_pr', prNumber = null }) {
    prodId += 1;
    const id = prodId;
    await db.prepare(`INSERT INTO requests(id, domain, type, title, detail, student, created_at, updated_at)
      VALUES (?, 'pharmacy', 'other', 'x', 'x', 'x', ?, ?)`).run(id, createdAt, createdAt);
    await db.prepare(`INSERT INTO ai_tickets(id, source_request_id, kind, title, status, phase, created_at, updated_at)
      VALUES (?, ?, 'root', 'x', 'done', 'pre_pr_ready', ?, ?)`).run(id, id, createdAt, createdAt);
    const evidence = prNumber ? JSON.stringify({ pull_request: { number: prNumber } }) : null;
    await db.prepare(`INSERT INTO ai_runs(id, ticket_id, attempt, trigger, outcome, idempotency_key, evidence_json, created_at, updated_at)
      VALUES (?, ?, 1, 'execute', ?, ?, ?, ?, ?)`).run(id, id, outcome, `prod-run-${id}`, evidence, createdAt, createdAt);
  }
  async function insertMergedPr(number, closedAt) {
    await db.prepare(`INSERT INTO ai_pull_requests(number, state, closed_at, files, reported_at) VALUES (?, 'merged', ?, '[]', ?)`)
      .run(number, closedAt, closedAt);
  }
  let prNumSeq = 80000;
  /** n lượt production quanh mốc anchor: readyFrac tỉ lệ ready_for_pr, mergeFrac tỉ lệ có PR merged (số nguyên). */
  async function seedWindow(anchor, spanMs, count, readyFrac, mergeFrac) {
    const readyCount = Math.round(count * readyFrac);
    const mergeCount = Math.round(count * mergeFrac);
    for (let i = 0; i < count; i += 1) {
      const createdAt = anchor + Math.floor((i * spanMs) / count);
      const outcome = i < readyCount ? 'ready_for_pr' : 'blocked';
      let prNumber = null;
      if (i < mergeCount) {
        prNumSeq += 1;
        prNumber = prNumSeq;
        await insertMergedPr(prNumber, createdAt);
      }
      await insertProdRun({ createdAt, outcome, prNumber });
    }
  }
  return { db, store, call, worker, nights, pending, check, selfPr, insertProdRun, insertMergedPr,
    seedWindow, close: () => server.close() };
}

test('a merged self PR is not pending until the "after" window (days) has fully elapsed', async () => {
  const f = await fixture();
  try {
    const closedAt = Date.now() - (PMW.days - 1) * DAY; // còn 1 ngày nữa mới đủ cửa sổ sau
    await f.selfPr(60, { closedAt });
    assert.deepEqual((await f.pending()).body.pending, []);
  } finally { f.close(); }
});

test('a merged non-self PR never becomes a pending post-merge watch', async () => {
  const f = await fixture();
  try {
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.insertProdRun({ createdAt: closedAt, outcome: 'ready_for_pr', prNumber: 61 });
    await f.insertMergedPr(61, closedAt);
    assert.deepEqual((await f.pending()).body.pending, []);
  } finally { f.close(); }
});

test('fewer than min_runs production runs on either side: waiting, no conclusion, still pending next time', async () => {
  const f = await fixture();
  try {
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.selfPr(70, { closedAt });
    await f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs - 2, 0.9, 0.9); // trước: thiếu
    await f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.9, 0.9); // sau: đủ

    const before1 = (await f.pending()).body.pending;
    assert.deepEqual(before1, [{ pr_number: 70, sha: selfCandidate.head_sha, closed_at: closedAt }]);
    const result = (await f.check(70)).body.watch;
    assert.equal(result.status, 'waiting');
    assert.equal(result.before_runs, PMW.min_runs - 2);
    assert.equal(result.after_runs, PMW.min_runs);
    assert.equal(result.revert_request_id, null);

    // vẫn còn trong danh sách chờ lần sau (không kết luận, đợi thêm) — khác 'ok'/'dropped' đã chốt.
    assert.deepEqual((await f.pending()).body.pending, [{ pr_number: 70, sha: selfCandidate.head_sha, closed_at: closedAt }]);
    assert.equal((await f.db.prepare("SELECT COUNT(*) n FROM requests WHERE type='self' AND idempotency_key LIKE 'self-revert:%'")
      .get()).n, 0);
  } finally { f.close(); }
});

test('enough data, no meaningful drop: concluded ok, no revert, drops out of pending', async () => {
  const f = await fixture();
  try {
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.selfPr(71, { closedAt });
    await f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs, 0.8, 0.8);
    await f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.8, 0.8); // giống hệt trước: tụt 0 điểm

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

test('a drop is recorded without a revert request: self requests are refused, so the watch cannot open one', async () => {
  const f = await fixture();
  try {
    const closedAt = Date.now() - (PMW.days + 1) * DAY;
    await f.selfPr(72, { target: 'ai-board/harness/prompts/brainstorm.md', closedAt });
    await f.seedWindow(closedAt - PMW.days * DAY, PMW.days * DAY, PMW.min_runs, 0.9, 0.9); // trước: 90%
    await f.seedWindow(closedAt, PMW.days * DAY, PMW.min_runs, 0.2, 0.2); // sau: 20% — tụt 70 điểm > ngưỡng

    const result = (await f.check(72)).body.watch;
    assert.equal(result.status, 'dropped');
    assert.ok(result.drop_ready_pts > PMW.max_drop_pts);
    assert.equal(result.revert_request_id, null);
    assert.deepEqual((await f.pending()).body.pending, []); // đã kết luận: không kiểm lại

    const refused = await f.worker('/api/ai-board/worker/self-requests', { title: 'Tự revert PR #72', detail: 'x',
      target_file: 'ai-board/harness/prompts/brainstorm.md', idempotency_key: 'self-revert:pr-72' });
    assert.equal(refused.status, 403);
    assert.equal(refused.body.error, 'self_request_disabled');
    assert.equal((await f.db.prepare("SELECT COUNT(*) n FROM requests WHERE idempotency_key LIKE 'self-revert:%'").get()).n, 0);

    const admin = await f.nights();
    const watched = admin.post_merge_watch.find((w) => w.pr_number === 72);
    assert.equal(watched.status, 'dropped');
    assert.equal(watched.revert_request_id, null);
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
