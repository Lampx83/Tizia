import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { applyMigrations } from '../server/ai-board/db/index.js';
import { openBoard } from './support/ai-board-db.js';
import { VENV_PYTHON } from './support/harness-python.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { planOf } from './support/ai-board-scenarios.js';
import { LIMITS } from '../server/ai-board/repositories/store-contract.js';

const SAVED = JSON.stringify([LIMITS.root_work, LIMITS.root_work_scaling]);
// Limits live in contract.json: tests narrow them in-process, scaling off so the cap is exactly the value set.
const setContract = limits => { restoreContract(); Object.assign(LIMITS.root_work, limits); for (const c of Object.values(LIMITS.root_work_scaling)) if (typeof c === 'object') c.per_step = 0; };
const restoreContract = () => { const [work, scaling] = JSON.parse(SAVED); Object.assign(LIMITS.root_work, work); for (const k in scaling) if (typeof scaling[k] === 'object') Object.assign(LIMITS.root_work_scaling[k], scaling[k]); };
afterEach(restoreContract);
const KEY = 'fixture-root-allowance-worker-key';
async function fixture({ dropReserveAck = false, delayReserveAckMs = 0 } = {}) {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [2, 'minh', 'Minh', 'student', 'pharmacy']] });
  const store = createAsyncAiBoardStore(db.d);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'root-allowance-request', title: 'Sửa hướng dẫn', detail: 'Nội dung fixture' });
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
    if (dropReserveAck && req.path.endsWith('/allowance/reserve')) {
      dropReserveAck = false;
      res.json = () => { res.destroy(); return res; }; // Lose only the receipt, after the service commits.
    }
    if (delayReserveAckMs && req.path.endsWith('/allowance/reserve')) {
      const send = res.json.bind(res), delay = delayReserveAckMs;
      delayReserveAckMs = 0;
      res.json = body => { setTimeout(() => send(body), delay); return res; };
    }
    next();
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, leaseMs: 120000 });
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { db, store, request,
    get origin() { return `http://127.0.0.1:${server.address().port}`; },
    async post(ticketId, op, body, key = KEY) {
      const res = await fetch(`http://127.0.0.1:${server.address().port}/api/ai-board/worker/tickets/${ticketId}/allowance/${op}`, {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-ai-worker-key': key, connection: 'close' }, body: JSON.stringify(body),
      });
      return { status: res.status, body: res.headers.get('content-type')?.includes('application/json') ? await res.json() : await res.text() };
    },
    async close() { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); await db.close(); },
  };
}
const leaseOf = (ticket, worker) => ({ worker_id: worker, lease_token: ticket.lease_token });

test('first provider reservations recheck daily admission after two independent roots were claimed', async () => {
  const f = await fixture();
  try {
    await f.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'parallel-root-request', title: 'Second request', detail: 'fixture' });
    const a = await f.store.claimNext({ workerId: 'daily-a', mode: 'shadow' });
    const b = await f.store.claimNext({ workerId: 'daily-b', mode: 'shadow' });
    assert.notEqual(a.id, b.id);
    const reserve = (ticket, worker, key) => f.post(ticket.id, 'reserve', {
      ...leaseOf(ticket, worker), idempotency_key: key, kind: 'model', provider: 'vllm', token_bound: 1024 });
    const results = await Promise.all([reserve(a, 'daily-a', 'daily-attempt-a'), reserve(b, 'daily-b', 'daily-attempt-b')]);
    assert.deepEqual(results.map(r => r.status).sort(), [200, 409]);
    assert.equal(results.find(r => r.status === 409).body.error, 'daily_resource_budget');
    assert.equal(results.find(r => r.status === 409).body.reason, 'daily_gpu_loose');
    const winner = results[0].status === 200 ? [a, 'daily-a'] : [b, 'daily-b'];
    assert.equal((await reserve(...winner, 'daily-root-retry')).status, 200, 'an admitted root retains its allowance');
  } finally { await f.close(); }
});

test('a crashed model attempt stays charged across takeover and a new planning run', async () => {
  const f = await fixture();
  try {
    const a = await f.store.claimNext({ workerId: 'allowance-a', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const leaseA = leaseOf(a, 'allowance-a');
    await assert.rejects(promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(a.id), 'allowance-a', a.lease_token, '--crash-after-reserve'], { timeout: 15000 }),
    error => error.code === 73);
    const reserved = await f.post(a.id, 'read', leaseA);
    assert.deepEqual(reserved.body.used, { model_calls: 1, tool_calls: 0, tokens: 32768, metered_tokens: 0, semantic_repairs: 0, quality_switches: 0 });
    await f.db.d.run('UPDATE ai_tickets SET lease_expires_at=0 WHERE id=?', [a.id]); // Crash/lease expiry injection.
    const b = await f.store.claimNext({ workerId: 'allowance-b', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    assert.equal(b.id, a.id);
    const leaseB = leaseOf(b, 'allowance-b');
    const run = await f.store.createRun(b.id, { workerId: 'allowance-b', leaseToken: b.lease_token, trigger: 'plan', idempotencyKey: 'new-planning-run' });
    const restored = await f.post(b.id, 'read', leaseB);
    assert.equal(restored.body.used.tokens, 32768);
    assert.equal(restored.body.used.model_calls, 1);
    assert.equal((await f.post(a.id, 'settle', { ...leaseA, idempotency_key: 'attempt-before-crash', metrics: { tokens_in: 1, tokens_out: 1 } })).status, 409);
    assert.equal((await f.post(b.id, 'settle', { ...leaseB, idempotency_key: 'attempt-before-crash', metrics: { tokens_in: 1, tokens_out: 1 } })).status, 409);
    const retry = { ...leaseB, idempotency_key: 'new-provider-retry', kind: 'model', provider: 'ollama', token_bound: 8192 };
    assert.equal((await f.post(b.id, 'reserve', retry)).status, 200);
    assert.equal((await f.post(b.id, 'reserve', retry)).status, 409, 'lost acknowledgement cannot authorize replay');
    const settlement = { ...leaseB, idempotency_key: retry.idempotency_key, metrics: { tokens_in: 90, tokens_out: 10, wall_ms: 500, gpu_ms: null } };
    const settled = await f.post(b.id, 'settle', settlement);
    assert.equal(settled.status, 200);
    assert.equal(settled.body.used.tokens, 32868);
    assert.equal(settled.body.used.model_calls, 2);
    assert.deepEqual((await f.post(b.id, 'settle', settlement)).body, settled.body, 'settlement acknowledgement retry is idempotent');
    const planned = await f.store.submitPlan(b.id, { workerId: 'allowance-b', leaseToken: b.lease_token, runId: run.id,
      plan: planOf(), budgetUsed: 1, idempotencyKey: 'initial-accounted-plan' });
    assert.ok(planned.plan_hash);
    assert.equal(await f.store.invalidatePlanForRequest(f.request.request_id, 'New requirements'), true);
    assert.equal((await f.post(b.id, 'read', leaseB)).status, 409, 'replan fences the previous lease');
    const c = await f.store.claimNext({ workerId: 'allowance-b', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    assert.notEqual(c.lease_token, b.lease_token);
    const nextRun = await f.store.createRun(c.id, { workerId: 'allowance-b', leaseToken: c.lease_token, trigger: 'plan', idempotencyKey: 'replanned-run' });
    const revised = await f.store.submitPlan(c.id, { workerId: 'allowance-b', leaseToken: c.lease_token, runId: nextRun.id,
      plan: planOf({ goal: 'Sửa hướng dẫn mới.' }), budgetUsed: 1, idempotencyKey: 'revised-accounted-plan' });
    assert.notEqual(revised.plan_hash, planned.plan_hash);
    const afterReplan = (await f.post(c.id, 'read', leaseOf(c, 'allowance-b'))).body;
    assert.deepEqual(afterReplan.used, settled.body.used);
    assert.equal((await f.post(b.id, 'read', leaseB, 'wrong-worker-key')).status, 403);
  } finally { await f.close(); }
});

test('reservation kinds and attempt keys cannot be coerced from JSON arrays or numbers', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'typed-reservations', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'typed-reservations');
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'array-kind-attempt', kind: ['model'], token_bound: 1 })).status, 400);
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 12345678, kind: 'tool' })).status, 400);
    assert.equal((await f.post(ticket.id, 'read', lease)).body.used.model_calls, 0);
  } finally { await f.close(); }
});

test('Ollama token reservations cover its input context plus the explicit output bound', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'ollama-trial', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const result = await promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(ticket.id), 'ollama-trial', ticket.lease_token, '--ollama'], { timeout: 30000 });
    assert.deepEqual(JSON.parse(result.stdout), { model_requests: 3, planner_calls: 2, editing_calls: 1 });
    const current = (await f.post(ticket.id, 'read', leaseOf(ticket, 'ollama-trial'))).body;
    assert.equal(current.used.tokens, 8260); // Unknown 8192+32 input/output reservation, plus two known 18-token responses.
    assert.equal(current.by_provider.ollama.tokens_in, 22);
    assert.equal(current.by_provider.ollama.missing.tokens_in, 1);
  } finally { await f.close(); }
});

test('denied model admission is not recorded as a sent model call in the phase budget', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'no-model-admission', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'no-model-admission');
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'earlier-unknown-attempt',
      kind: 'model', provider: 'vllm', token_bound: 199500 })).status, 200);
    setContract({ model_calls: 1 }); // local tokens are free: denial comes from the model-call cap
    const result = await promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(ticket.id), 'no-model-admission', ticket.lease_token, '--expect-admission-denied'], { timeout: 30000 });
    assert.deepEqual(JSON.parse(result.stdout), { model_requests: 0, planner_calls: 0, error: 'budget exhausted before model call (request token bound): root_model_calls' });
    const current = (await f.post(ticket.id, 'read', lease)).body;
    assert.equal(current.used.model_calls, 1);
    assert.equal(current.used.tokens, 199500);
  } finally { await f.close(); }
});

test('rolling admission sees durable unknown work before traces and never double-counts its receipt', async () => {
  const f = await fixture();
  try {
    const a = await f.store.claimNext({ workerId: 'resource-a', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(a, 'resource-a');
    const reserve = { ...lease, idempotency_key: 'resource-reservation', kind: 'model', provider: 'vllm', token_bound: 8192 };
    assert.equal((await f.post(a.id, 'reserve', reserve)).status, 200);
    const next = await f.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'next-resource-request', title: 'Yêu cầu tiếp theo', detail: 'fixture' });
    assert.equal(await f.store.claimNext({ workerId: 'resource-b', mode: 'shadow', intent: 'plan' }), null);
    assert.equal((await f.store.listRequestsForOwner(1, 'pharmacy')).find(r => r.id === next.request_id).queue.deferred, true);
    const other = await f.store.createRequestWithRoot({ ownerUserId: 2, ownerDomain: 'pharmacy', ownerDisplayName: 'Minh',
      idempotencyKey: 'other-resource-request', title: 'Yêu cầu độc lập', detail: 'fixture' });
    assert.equal((await f.store.claimNext({ workerId: 'other-owner', mode: 'shadow', intent: 'plan' })).id, other.root_ticket_id);
    assert.equal((await f.post(a.id, 'settle', { ...lease, idempotency_key: reserve.idempotency_key,
      metrics: { wall_ms: 1499000, gpu_ms: null, tokens_in: 0, tokens_out: 0 } })).status, 200);
    const run = await f.store.createRun(a.id, { workerId: 'resource-a', leaseToken: a.lease_token, trigger: 'plan', idempotencyKey: 'resource-plan-run' });
    await f.store.recordModelCalls(a.id, { workerId: 'resource-a', leaseToken: a.lease_token, runId: run.id,
      calls: [{ call_id: 'resource-duplicate-observation', gate: 1, provider: 'vllm', budget_units: 9999, metrics: { wall_ms: 1499000 } }] });
    assert.equal((await f.store.claimNext({ workerId: 'resource-b', mode: 'shadow', intent: 'plan' })).id, next.root_ticket_id);
  } finally { await f.close(); }
});

test('admission cannot start a model request after its absolute deadline expires', async () => {
  const f = await fixture({ delayReserveAckMs: 1100 });
  try {
    const ticket = await f.store.claimNext({ workerId: 'admission-deadline', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const result = await promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(ticket.id), 'admission-deadline', ticket.lease_token, '--expect-deadline-after-reserve'], { timeout: 30000 });
    assert.equal(JSON.parse(result.stdout).model_requests, 0);
    const current = (await f.post(ticket.id, 'read', leaseOf(ticket, 'admission-deadline'))).body;
    assert.equal(current.used.model_calls, 1);
    assert.equal(current.used.tokens, 1024);
  } finally { await f.close(); }
});

test('real worker transport shares root spend across a failed HTTP attempt, planning and editing', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'whole-trial', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const result = await promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(ticket.id), 'whole-trial', ticket.lease_token], { timeout: 30000 });
    assert.deepEqual(JSON.parse(result.stdout), { model_requests: 3, planner_calls: 2, editing_calls: 1 });
    const current = (await f.post(ticket.id, 'read', leaseOf(ticket, 'whole-trial'))).body;
    assert.deepEqual(current.used, { model_calls: 3, tool_calls: 1, tokens: 1060, metered_tokens: 0, semantic_repairs: 3, quality_switches: 1 });
    assert.equal(current.by_provider.vllm.tokens_in, 22);
    assert.equal(current.by_provider.vllm.missing.tokens_in, 1);
  } finally { await f.close(); }
});

test('lost reservation acknowledgement stops the worker before model I/O without refunding capacity', async () => {
  const f = await fixture({ dropReserveAck: true });
  try {
    const ticket = await f.store.claimNext({ workerId: 'lost-ack', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const result = await promisify(execFile)(VENV_PYTHON,
      ['test/support/root-allowance-worker-probe.py', f.origin, String(ticket.id), 'lost-ack', ticket.lease_token, '--expect-reserve-ack-loss'], { timeout: 30000 });
    assert.deepEqual(JSON.parse(result.stdout), { model_requests: 0, error: 'root_allowance_unavailable' });
    const current = (await f.post(ticket.id, 'read', leaseOf(ticket, 'lost-ack'))).body;
    assert.equal(current.used.model_calls, 1);
    assert.equal(current.used.tokens, 1024);
    assert.equal(current.by_provider.vllm.missing.tokens_in, 1);
  } finally { await f.close(); }
});

test('migration does not silently grant a fresh allowance to pre-existing roots', async () => {
  const f = await fixture();
  try {
    await f.db.d.exec(`DROP TABLE ai_work_reservations; DROP TABLE ai_root_allowances;
      DELETE FROM schema_migrations WHERE scope='ai-board' AND version='034-root-allowance.sql';`);
    await applyMigrations(f.db.d);
    const ticket = await f.store.claimNext({ workerId: 'legacy-root', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'legacy-root');
    assert.equal((await f.post(ticket.id, 'read', lease)).body.blocked_reason, 'legacy_allowance_unknown');
    const reserved = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'legacy-must-not-refill', kind: 'model', provider: 'vllm', token_bound: 1 });
    assert.equal(reserved.status, 409);
    assert.equal(reserved.body.error, 'legacy_allowance_unknown');
  } finally { await f.close(); }
});

test('concurrent requests cannot both consume the last root model slot', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'last-slot', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'last-slot');
    for (let n = 0; n < LIMITS.root_work.model_calls - 1; n++) {
      const idempotency_key = `known-model-${n}`;
      assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key, kind: 'model', provider: 'vllm', token_bound: 1 })).status, 200);
      assert.equal((await f.post(ticket.id, 'settle', { ...lease, idempotency_key, metrics: { tokens_in: 0, tokens_out: 0 } })).status, 200);
    }
    const responses = await Promise.all(['last-slot-one', 'last-slot-two'].map(idempotency_key =>
      f.post(ticket.id, 'reserve', { ...lease, idempotency_key, kind: 'model', provider: 'api', token_bound: 1 })));
    assert.deepEqual(responses.map(r => r.status).sort(), [200, 409]);
    const current = (await f.post(ticket.id, 'read', lease)).body;
    assert.equal(current.used.model_calls, LIMITS.root_work.model_calls);
    assert.equal(current.used.tokens, 1);
    assert.equal(current.by_provider.api.gpu_ms, null);
    assert.equal(current.by_provider.api.missing.gpu_ms, 1);
  } finally { await f.close(); }
});

test('unknown token usage cannot refund a root reservation and invalid metrics cannot erase it', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'unknown-usage', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'unknown-usage');
    const idempotency_key = 'unknown-full-token-reservation';
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key, kind: 'model', provider: 'api', token_bound: 200000 })).status, 200);
    assert.equal((await f.post(ticket.id, 'settle', { ...lease, idempotency_key, metrics: { tokens_in: -1 } })).status, 400);
    const missing = await f.post(ticket.id, 'settle', { ...lease, idempotency_key, metrics: { wall_ms: 12 } });
    assert.equal(missing.body.used.tokens, 200000);
    assert.equal(missing.body.by_provider.api.tokens_in, null);
    const denied = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'retry-after-unknown', kind: 'model', provider: 'api', token_bound: 1 });
    assert.equal(denied.status, 409);
    assert.equal(denied.body.error, 'root_allowance_exhausted');
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'tool-after-exhaustion', kind: 'tool' })).status, 409);
  } finally { await f.close(); }
});

test('vllm and ollama reservations are not capped by root tokens, api reservations are', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'local-free', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'local-free');
    await f.post(ticket.id, 'read', lease);
    setContract({ tokens: 1000 });
    for (const [i, provider] of ['vllm', 'ollama', 'vllm'].entries()) {
      const ok = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: `local-free-${i}`, kind: 'model', provider, token_bound: 5000 });
      assert.equal(ok.status, 200, provider);
      assert.equal(ok.body.used.metered_tokens, 0);
    }
    assert.equal((await f.post(ticket.id, 'read', lease)).body.used.tokens, 15000);
    const paid = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'paid-api', kind: 'model', provider: 'api', token_bound: 5000 });
    assert.equal(paid.status, 409);
    assert.equal(paid.body.reason, 'root_tokens_reserve');
  } finally { await f.close(); }
});

test('each root budget denial names the one limit it hit and keeps the legacy error code', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'reason-codes', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'reason-codes');
    await f.post(ticket.id, 'read', lease);
    const setLimits = limits => setContract(limits);
    const cases = [
      ['root_model_calls', { model_calls: 0 }, { kind: 'model', provider: 'vllm', token_bound: 1 }],
      ['root_tool_calls', { tool_calls: 0 }, { kind: 'tool' }],
      ['root_tokens_reserve', { tokens: 1000 }, { kind: 'model', provider: 'api', token_bound: 1024 }],
      ['root_semantic_repairs', { semantic_repairs: 0 }, { kind: 'semantic_repair' }],
      ['root_quality_switches', { quality_switches: 0 }, { kind: 'quality_switch' }],
    ];
    for (const [i, [reason, limits, reservation]] of cases.entries()) {
      await setLimits(limits);
      const denied = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: `reason-case-${i}`, ...reservation });
      assert.equal(denied.status, 409, reason);
      assert.equal(denied.body.error, 'root_allowance_exhausted');
      assert.equal(denied.body.reason, reason);
    }
    await setLimits({ tokens: 1024 });
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'reason-fill-tokens', kind: 'model', provider: 'api', token_bound: 1024 })).status, 200);
    const capped = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'reason-capped-tokens', kind: 'model', provider: 'api', token_bound: 1 });
    assert.equal(capped.body.reason, 'root_tokens');
    const repeated = await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'reason-fill-tokens', kind: 'model', provider: 'api', token_bound: 1024 });
    assert.equal(repeated.body.error, 'attempt_already_reserved');
    assert.equal(repeated.body.reason, 'attempt_already_reserved');
  } finally { await f.close(); }
});

test('admin request trace shows which root limit is at its cap and the unknown holds, without changing the ledger', async () => {
  const f = await fixture();
  try {
    const ticket = await f.store.claimNext({ workerId: 'admin-reasons', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    const lease = leaseOf(ticket, 'admin-reasons');
    await f.post(ticket.id, 'read', lease);
    setContract({ model_calls: 1 });
    assert.equal((await f.post(ticket.id, 'reserve', { ...lease, idempotency_key: 'admin-trace-first', kind: 'model', provider: 'vllm', token_bound: 512 })).status, 200);
    const before = (await f.post(ticket.id, 'read', lease)).body;
    const trace = await f.store.getRequestTrace(f.request.request_id);
    const { allowance } = trace.root;
    const groups = Object.fromEntries(allowance.groups.map(g => [g.reason, g]));
    assert.equal(groups.root_model_calls.hit, true);
    assert.equal(groups.root_tool_calls.hit, false);
    assert.equal(allowance.unknown_holds, 1);
    assert.equal(allowance.daily_gpu.reason, 'daily_gpu_loose');
    assert.equal(allowance.daily_gpu.hit, true, 'unknown hold charges the owner daily GPU ledger');
    assert.deepEqual((await f.post(ticket.id, 'read', lease)).body.used, before.used);
  } finally { await f.close(); }
});
