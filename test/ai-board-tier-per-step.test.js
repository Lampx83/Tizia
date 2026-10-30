import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { validatePlan } from '../server/ai-board/policy.js';
import { runnableOrders } from '../server/ai-board/security/step-gate.js';

const step = (order, scope, capability, extra = {}) => ({
  order, title: `Bước ${order}`, description: 'Mô tả bước.', allowed_scope: [scope],
  acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
  capability, risk: 'low', non_goals: [], ...extra,
});

function buildingPlan(extraSteps = [], overrides = {}) {
  const steps = [
    step(1, 'server/contexts/_ai-generated/tower/migrations/001-tower.sql', 'generated.context', { layer: 'db', depends_on: [] }),
    step(2, 'server/contexts/_ai-generated/tower/index.js', 'generated.context', { layer: 'backend', depends_on: [1] }),
    step(3, 'public/tower.html', 'content', { layer: 'frontend', depends_on: [2] }),
    ...extraSteps,
  ];
  return {
    domain: 'it', goal: 'Thêm tòa nhà 3D đăng nhập admin vào campus IT.',
    allowed_scope: steps.flatMap((s) => s.allowed_scope),
    acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
    capabilities: [...new Set(steps.map((s) => s.capability))], risk: 'low', non_goals: [], steps, ...overrides,
  };
}

test('3D building FE+BE+DB under _ai-generated is all surface', () => {
  const checked = validatePlan(buildingPlan(), 'it');
  assert.equal(checked.tier, 'surface');
  assert.deepEqual(checked.stepTiers, ['surface', 'surface', 'surface']);
});

test('model risk=high with only surface steps stays surface, label advisory', () => {
  const checked = validatePlan(buildingPlan([], { risk: 'high' }), 'it');
  assert.equal(checked.tier, 'surface');
  assert.equal(checked.riskAdvisory, 'high');
  const stepHigh = buildingPlan();
  stepHigh.steps[2].risk = 'high';
  assert.equal(validatePlan(stepHigh, 'it').tier, 'surface');
});

test('words like đăng nhập/admin in text do not raise tier', () => {
  const p = buildingPlan();
  p.steps[2].description = 'Trang đăng nhập admin giả lập cho tòa nhà.';
  assert.equal(validatePlan(p, 'it').tier, 'surface');
});

test('one core server file step makes only that step core', () => {
  const p = buildingPlan([step(4, 'server/contexts/learning/progress.js', 'core.server', { layer: 'wiring', depends_on: [3] })]);
  const checked = validatePlan(p, 'it');
  assert.deepEqual(checked.stepTiers, ['surface', 'surface', 'surface', 'core']);
  assert.equal(checked.tier, 'core');
});

test('hard boundaries unchanged: scope outside capability and money paths still rejected', () => {
  const p = buildingPlan();
  p.steps[2] = step(3, 'server/contexts/learning/progress.js', 'content', { layer: 'wiring', depends_on: [2] });
  p.allowed_scope = p.steps.flatMap((s) => s.allowed_scope);
  assert.throws(() => validatePlan(p, 'it'), (e) => e.code === 'scope_violation');
});

test('runnableOrders holds dependents of blocked steps until the blocker is done', () => {
  const rows = (statuses) => statuses.map((status, i) => ({ sequence: i + 1, status, depends_on: JSON.stringify(i ? [i] : []) }));
  assert.deepEqual(runnableOrders(rows(['queued', 'human_owned', 'queued'])), [1]);
  assert.deepEqual(runnableOrders(rows(['queued', 'waiting_data', 'queued'])), [1]);
  assert.deepEqual(runnableOrders(rows(['done', 'done', 'queued'])), [3]);
});

async function fixture() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
    idempotencyKey: 'tier-step-request', title: 'Thêm tòa nhà', detail: 'Fixture' });
  const ticket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token,
    trigger: 'plan', idempotencyKey: 'tier-step-run' });
  return { db, store, ticket, run };
}

test('mixed plan: root planned, surface children queued, core child human_owned, dependents held', async () => {
  const { db, store, ticket, run } = await fixture();
  const p = buildingPlan([step(4, 'server/contexts/learning/progress.js', 'core.server', { layer: 'wiring', depends_on: [3] }),
    step(5, 'public/tower-extra.html', 'content', { layer: 'frontend', depends_on: [4] })]);
  const out = await store.submitPlan(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
    plan: p, budgetUsed: 40, idempotencyKey: 'tier-step-submit' });
  assert.equal(out.status, 'planned');
  assert.equal(out.tier, 'surface');
  assert.equal(out.aggregate_tier, 'core');
  assert.deepEqual(out.children.map((c) => [c.tier, c.status]),
    [['surface', 'queued'], ['surface', 'queued'], ['surface', 'queued'], ['core', 'human_owned'], ['surface', 'queued']]);
  assert.deepEqual(out.runnable_orders, [1, 2, 3]);
  db.close();
});

test('plan of only blocked steps keeps the old whole-plan gate', async () => {
  const { db, store, ticket, run } = await fixture();
  const p = buildingPlan();
  p.steps = [step(1, 'server/contexts/learning/progress.js', 'core.server', { layer: 'wiring', depends_on: [] })];
  p.allowed_scope = ['server/contexts/learning/progress.js']; p.capabilities = ['core.server'];
  const out = await store.submitPlan(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
    plan: p, budgetUsed: 40, idempotencyKey: 'tier-step-submit2' });
  assert.equal(out.status, 'human_owned');
  assert.deepEqual(out.runnable_orders, []);
  db.close();
});

test('no child rows means nothing is held', () => {
  assert.equal(runnableOrders([]), null);
});
