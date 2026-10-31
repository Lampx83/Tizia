import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS, WorkerContractError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { retryTransientTicket } from '../server/ai-board/transient-retry-async.js';
import { extendRootAllowance } from '../server/ai-board/services/root-allowance.js';

const KIND = { model_calls: 'model', semantic_repairs: 'semantic_repair', quality_switches: 'quality_switch', tokens: 'model' };

async function plannedRoot() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'ra-request-001', title: 'Sửa trang giới thiệu', detail: 'fixture' });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'ra-run-001' });
  const step = { order: 1, title: 'Sửa trang', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'ra-plan-001',
    plan: { domain: 'pharmacy', goal: 'Sửa trang.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  const submit = (failure_class, key = 'ra-verdict-001') => store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: key,
    now: Date.now(), verdict: { outcome: 'blocked', gate_reached: 3, reason: 'content_guard: root_allowance_exhausted', budget_used: 3,
      failure_class, repairs: [], candidate: null, gates: [{ gate: 3, blocked: true, reason: 'x', issues: [] }] } });
  return { db, store, ticket, submit };
}

/** Cạn nhóm `group` ở mức limit 1: dùng 1 phần. */
async function exhaust(db, ticket, group, provider = 'api') {
  const limits = { ...LIMITS.root_work, [group]: 1 };
  await db.prepare('INSERT INTO ai_root_allowances(root_ticket_id, limits_json, created_at) VALUES (?, ?, ?)')
    .run(ticket.id, JSON.stringify(limits), Date.now());
  await db.prepare(`INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
    VALUES (?, 'attempt-0001', ?, ?, 'h', ?, ?)`).run(ticket.id, KIND[group], KIND[group] === 'model' ? provider : null,
    group === 'tokens' ? 1 : 0, Date.now());
}

for (const group of ['model_calls', 'tokens', 'semantic_repairs', 'quality_switches']) {
  test(`${group} exhausted → root_allowance_exhausted, not transient, no retry-transient`, async () => {
    const { db, submit, ticket } = await plannedRoot();
    await exhaust(db, ticket, group);
    await submit('budget');
    const root = await db.prepare('SELECT status, phase, public_note, internal_reason FROM ai_tickets WHERE id=?').get(ticket.id);
    assert.equal(root.status, 'waiting_admin');
    assert.equal(root.phase, 'root_allowance_exhausted');
    assert.equal(root.internal_reason, `root_allowance_exhausted:${group}:1/1`);
    assert.doesNotMatch(root.public_note, /hạ tầng|GPU/);
    await assert.rejects(() => retryTransientTicket(db.d, ticket.id), (e) => e.code === 'not_transient_blocked');
  });
}

test('a budget verdict without an exhausted root group stays budget_exhausted', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit('budget');
  assert.equal((await db.prepare('SELECT phase FROM ai_tickets WHERE id=?').get(ticket.id)).phase, 'budget_exhausted');
});

test('extension: ceiling, floor, ledger, event, requeue', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await exhaust(db, ticket, 'model_calls');
  await submit('budget');
  const ext = (to, reason = 'Cho chạy thêm vòng cuối.') => extendRootAllowance(db.d, ticket.id,
    { group: 'model_calls', to, reason, adminUserId: 9 });
  await assert.rejects(ext(0), (e) => e.code === 'below_used');
  await assert.rejects(ext(1), (e) => e.code === 'not_an_extension');
  await assert.rejects(ext(LIMITS.root_work_extension.max.model_calls + 1), (e) => e.code === 'above_ceiling');
  await assert.rejects(ext(5, 'ngắn'), (e) => e.code === 'reason_required');
  await assert.rejects(extendRootAllowance(db.d, ticket.id, { group: 'bogus', to: 5, reason: 'đủ dài rồi nhé', adminUserId: 9 }), (e) => e.code === 'invalid_group');
  const done = await ext(5);
  assert.deepEqual({ ...done }, { ok: true, status: 'queued', phase: 'authorized', group: 'model_calls', from: 1, to: 5 });
  const ledger = await db.prepare('SELECT group_name, from_limit, to_limit, admin_user_id, created_at FROM ai_root_allowance_extensions').all();
  assert.equal(ledger.length, 1);
  assert.deepEqual({ ...ledger[0], created_at: typeof ledger[0].created_at }, { group_name: 'model_calls', from_limit: 1, to_limit: 5, admin_user_id: 9, created_at: 'number' });
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM ai_events WHERE ticket_id=? AND event_type='root_allowance_extended'").get(ticket.id)).n, 1);
  assert.equal(JSON.parse((await db.prepare('SELECT limits_json FROM ai_root_allowances WHERE root_ticket_id=?').get(ticket.id)).limits_json).model_calls, 5);
  const root = await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'queued', phase: 'authorized' });
  await assert.rejects(ext(6), (e) => e.code === 'not_root_allowance_exhausted');
});

test('extension route: admin only, strict CSRF', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await exhaust(db, ticket, 'semantic_repairs');
  await submit('budget');
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    if (req.headers['x-test-user'] === '9') req.user = { id: 9, role: 'admin' };
    if (req.headers['x-test-user'] === '1') req.user = { id: 1, role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  attachAiBoardRequestRoutes(app, { store,
    requireAuth: (req, res, next) => req.user ? next() : res.status(401).end(),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }),
    requireStrictCsrf: (req, res, next) => req.headers['x-csrf-token'] === 'ok' ? next() : res.status(403).json({ error: 'csrf_failed' }) });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/admin/ai-board/tickets/${ticket.id}/extend-root-allowance`;
  const send = (headers, body) => fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  try {
    const body = { group: 'semantic_repairs', to: 4, reason: 'Cho thêm lượt tự sửa.' };
    assert.equal((await send({ 'x-test-user': '1', 'x-csrf-token': 'ok' }, body)).status, 403);
    assert.equal((await send({ 'x-test-user': '9' }, body)).status, 403);
    const tooHigh = await send({ 'x-test-user': '9', 'x-csrf-token': 'ok' }, { ...body, to: 99 });
    assert.equal(tooHigh.status, 409);
    assert.equal((await tooHigh.json()).error, 'above_ceiling');
    const ok = await send({ 'x-test-user': '9', 'x-csrf-token': 'ok' }, body);
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).to, 4);
  } finally { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)); }
});
