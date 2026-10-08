// Công tắc admin, điều kiện chạy đêm, 1 dòng mỗi đêm, tự dừng, bỏ cụm, chuông khi thắng.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const SKILL = 'ai-board/harness/skills/edit-html-text/SKILL.md';
const SI = LIMITS.self_improve;
const DAY = 24 * 3600_000;

async function fixture({ labelled = SI.min_labelled_tasks } = {}) {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'it'],
    [9, 'boss', 'Boss', 'admin', null],
  ] });
  const insertTask = db.prepare(`INSERT INTO ai_eval_tasks(source, trigger, request_id, run_id, request_text,
    expected_files, status, created_at) VALUES ('miss', 'verdict_blocked', 1, ?, 'x', '["package.json"]', 'labelled', ?)`);
  for (let i = 1; i <= labelled; i += 1) await insertTask.run(i, Date.now() - i * 1000);
  const store = createAsyncAiBoardStore(db.d);
  const bells = [];
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
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, onSelfWin: (n) => bells.push(n) });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, url, { user, body, headers = {} } = {}) => {
    const res = await fetch(base + url, { method, body: body && JSON.stringify(body),
      headers: { 'content-type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}), ...headers } });
    return { status: res.status, body: await res.json().catch(() => null) };
  };
  const worker = (url, body = {}) => call('POST', url, { body, headers: { 'x-ai-worker-key': KEY } });
  const toggle = (enabled, user = 9) => call('POST', '/api/admin/ai-board/self-improve/switch', { user, body: { enabled } });
  const night = (date) => worker('/api/ai-board/worker/self-improve/night', { night: date });
  const report = (body) => worker('/api/ai-board/worker/self-improve/night/report', body);
  const nights = async () => (await call('GET', '/api/admin/ai-board/self-improve', { user: 9 })).body;
  let n = 0;
  const selfRequest = async () => (await worker('/api/ai-board/worker/self-requests', {
    title: 'Skill sửa chữ', detail: 'Chẩn đoán.', target_file: SKILL, idempotency_key: `self-night-${String(++n).padStart(3, '0')}`,
  })).body;
  return { db, store, bells, call, worker, toggle, night, report, nights, selfRequest, close: () => server.close() };
}

/** Đêm đã xong: chạy (start) rồi ghi các biến thể và kết thúc. */
async function pastNight(f, date, variants) {
  const started = await f.night(date);
  assert.equal(started.body.run, true, JSON.stringify(started.body));
  for (const variant of variants) await f.report({ night: date, variant });
  await f.report({ night: date, finished: 'done' });
}
const dropped = (key) => ({ cluster: { key }, status: 'dropped', reason: 'khuôn sai' });

test('the switch is off by default and only an admin can flip it', async () => {
  const f = await fixture();
  try {
    assert.equal((await f.nights()).enabled, false);
    assert.deepEqual((await f.night('2026-09-28')).body.run, false);
    assert.equal((await f.night('2026-09-28')).body.reason, 'disabled');
    assert.equal((await f.toggle(true, 1)).status, 403);
    assert.equal((await f.call('GET', '/api/admin/ai-board/self-improve', { user: 1 })).status, 403);
    assert.equal((await f.toggle(true)).status, 200);
    assert.equal((await f.nights()).enabled, true);
    assert.equal((await f.night('2026-09-28')).body.run, true);
  } finally { f.close(); }
});

test('a night does not run below the labelled-task minimum', async () => {
  const f = await fixture({ labelled: SI.min_labelled_tasks - 1 });
  try {
    await f.toggle(true);
    const out = (await f.night('2026-09-28')).body;
    assert.equal(out.run, false);
    assert.equal(out.reason, 'not_enough_labelled');
    assert.equal((await f.nights()).nights.length, 0);
  } finally { f.close(); }
});

test('a night does not run while a self-improve PR is still open', async () => {
  const f = await fixture();
  try {
    await f.toggle(true);
    const { root_ticket_id: id } = await f.selfRequest();
    const ticket = await f.store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = await f.store.createRun(id, { ...lease, trigger: 'plan', idempotencyKey: 'night-pr-run-01' });
    (await f.db.prepare('UPDATE ai_runs SET evidence_json=? WHERE id=?')
      .run(JSON.stringify({ pull_request: { number: 77, url: 'https://github.com/x/y/pull/77' } }), run.id));
    assert.equal((await f.night('2026-09-28')).body.reason, 'self_pr_open');
    await f.worker('/api/ai-board/worker/pull-requests/state', { number: 77, state: 'closed', closed_at: Date.now(), files: [] });
    assert.equal((await f.night('2026-09-28')).body.run, true);
  } finally { f.close(); }
});

test('one row per night: variants, propose GPU and the finish are recorded and shown to the admin', async () => {
  const f = await fixture();
  try {
    await f.toggle(true);
    await f.night('2026-09-28');
    await f.night('2026-09-28'); // gọi lại cùng đêm: vẫn 1 dòng
    const req = await f.selfRequest();
    await f.report({ night: '2026-09-28', pr_sync: { status: 'synced', merged: [3] } });
    await f.report({ night: '2026-09-28', gpu_s_propose: 140,
      variant: { cluster: { key: '3|ordinary|edit-html-text', misses: 4 }, diagnosis: { hypothesis: 'h', target_file: SKILL },
        request_id: req.request_id, root_ticket_id: req.root_ticket_id, status: 'waiting' } });
    await f.report({ night: '2026-09-28', finished: 'stopped', note: 'hết khung giờ' });
    const [row] = (await f.nights()).nights;
    assert.equal(row.night, '2026-09-28');
    assert.equal(row.status, 'stopped');
    assert.equal(row.gpu_s_propose, 140);
    assert.deepEqual(row.pr_sync, { status: 'synced', merged: [3] });
    assert.equal(row.variants.length, 1);
    assert.equal(row.variants[0].status, 'waiting');
    assert.equal(row.variants[0].cluster.key, '3|ordinary|edit-html-text');
    assert.equal((await f.night('2026-09-28')).body.reason, 'night_done');
  } finally { f.close(); }
});

test('five finished nights in a row without an accepted variant pause the loop until re-enabled', async () => {
  const f = await fixture();
  try {
    await f.toggle(true);
    for (let d = 1; d <= SI.pause_after_empty_nights; d += 1) await pastNight(f, `2026-09-0${d}`, []);
    const out = (await f.night('2026-09-10')).body;
    assert.equal(out.run, false);
    assert.equal(out.reason, 'paused');
    assert.equal((await f.nights()).paused, true);
    await f.toggle(false);
    await f.toggle(true);
    assert.equal((await f.night('2026-09-10')).body.run, true);
  } finally { f.close(); }
});

test('a cluster that failed three nights in a row is skipped for seven days', async () => {
  const f = await fixture();
  try {
    await f.toggle(true);
    const key = '4|ordinary|fix-js-behavior';
    for (let d = 1; d <= SI.cluster_skip.after_failed_nights; d += 1) await pastNight(f, `2026-09-0${d}`, [dropped(key)]);
    assert.deepEqual((await f.night('2026-09-05')).body.skip_clusters, [key]);
    const later = Date.now() + (SI.cluster_skip.days + 1) * DAY;
    (await f.db.prepare('UPDATE ai_self_improve_nights SET started_at = started_at - ?').run(later - Date.now()));
    assert.deepEqual((await f.night('2026-09-20')).body.skip_clusters, []);
  } finally { f.close(); }
});

// Verdict của biến thể (lượt self sau khi admin duyệt plan) → cập nhật dòng đêm; chuông admin chỉ khi thắng.
const SHA = (c) => c.repeat(40);
const EVAL = { accepted: true, base_sha: SHA('a'), variant_sha: SHA('b'), tasks: 6, wins: 3, losses: 1, ties: 2,
  gpu_s: 812, gpu_s_limit: 2400, gold: false, dropped: [], strata: { base: {}, variant: {} }, config: {}, pairs: [] };
const gates = (ev, gate5 = {}) => [{ gate: 3, blocked: false }, { gate: 4, blocked: false, issues: [] },
  { gate: 5, blocked: false, smoke_passed: false, http_observed: false, runner: 'eval', eval: ev, ...gate5 },
  { gate: 5.5, blocked: false, risk_level: 'high', risk_signals: [] }];
const candidate = { branch: 'ai-board/2026-09-28-ticket-1-abc123', base_sha: SHA('a'), head_sha: SHA('b'),
  commits: [{ sha: SHA('b'), title: 't', files: [SKILL] }] };

async function variantVerdict(f, verdict) {
  await f.toggle(true);
  await f.night('2026-09-28');
  const req = await f.selfRequest();
  await f.report({ night: '2026-09-28', variant: { cluster: { key: 'k' }, request_id: req.request_id,
    root_ticket_id: req.root_ticket_id, status: 'waiting' } });
  const id = req.root_ticket_id;
  const held = await f.store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const run = await f.store.createRun(id, { workerId: 'w1', leaseToken: held.lease_token, trigger: 'plan', idempotencyKey: 'night-v-run-1' });
  const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: [SKILL], acceptance: ['đổi'], tests: ['pytest'],
    capability: 'self.config', risk: 'low', non_goals: [] };
  const waiting = await f.store.submitPlan(id, { workerId: 'w1', leaseToken: held.lease_token, runId: run.id, budgetUsed: 1,
    idempotencyKey: 'night-v-plan-1', plan: { domain: 'ai-board', goal: 'Sửa.', allowed_scope: [SKILL], acceptance: ['đổi'],
      tests: ['pytest'], capabilities: ['self.config'], risk: 'low', non_goals: [], steps: [step] } });
  await f.store.releaseLease(id, { workerId: 'w1', leaseToken: held.lease_token, outcome: 'planned', idempotencyKey: 'night-v-rel-1' });
  await f.store.authorizePlan(id, waiting.plan_hash, 9);
  const exec = await f.store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const lease = { worker_id: 'w1', lease_token: exec.lease_token };
  const run2 = await f.store.createRun(id, { workerId: 'w1', leaseToken: exec.lease_token, trigger: 'execute', idempotencyKey: 'night-v-run-2' });
  await f.store.resumeAuthorizedPlan(id, { workerId: 'w1', leaseToken: exec.lease_token, runId: run2.id });
  const res = await f.worker(`/api/ai-board/worker/tickets/${id}/verdict`, { ...lease, run_id: run2.id, verdict,
    idempotency_key: 'night-v-verdict-1' });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  return (await f.nights()).nights[0];
}

test('a won variant updates its night row and rings the admin bell', async () => {
  const f = await fixture();
  try {
    const row = await variantVerdict(f, { outcome: 'needs_review', gate_reached: 5.5, reason: 'review', budget_used: 10,
      failure_class: null, repairs: [], candidate, gates: gates(EVAL) });
    assert.equal(row.variants[0].status, 'accepted');
    assert.deepEqual([row.variants[0].eval.wins, row.variants[0].eval.losses, row.variants[0].eval.ties], [3, 1, 2]);
    assert.equal(row.gpu_s_eval, 812);
    assert.equal(f.bells.length, 1);
    assert.equal(f.bells[0].night, '2026-09-28');
  } finally { f.close(); }
});

test('a lost variant is recorded with its dropped strata and rings no bell', async () => {
  const f = await fixture();
  try {
    const lost = { ...EVAL, accepted: false, wins: 1, losses: 3, dropped: ['type=logic'] };
    const row = await variantVerdict(f, { outcome: 'blocked', gate_reached: 5, reason: 'thua 3 task', budget_used: 10,
      failure_class: 'eval', repairs: [], candidate: null, gates: gates(lost, { blocked: true, reason: 'thua 3 task' }).slice(0, 3) });
    assert.equal(row.variants[0].status, 'rejected');
    assert.deepEqual(row.variants[0].eval.dropped, ['type=logic']);
    assert.equal(row.variants[0].reason, 'thua 3 task');
    assert.equal(f.bells.length, 0);
  } finally { f.close(); }
});
