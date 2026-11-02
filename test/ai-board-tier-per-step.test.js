import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { validatePlan } from '../server/ai-board/policy.js';
import { runnableOrders } from '../server/ai-board/security/step-gate.js';
import { continuePartialRequest } from '../server/ai-board/services/partial-resume.js';

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

const sha = (c) => c.repeat(40);

function readyVerdict(files) {
  return {
    outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 12, failure_class: null, repairs: [],
    candidate: { branch: 'ai-board/2026-11-02-tier-step', base_sha: sha('a'), head_sha: sha('b'),
      commits: [{ sha: sha('b'), title: 'Thêm tòa nhà', files }] },
    gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [] },
      { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker',
        functional: { probe_id: 'queue-worker-availability-v1', passed: true,
          coverage: { requester_api: true, mounted_ui: true, recovery: true } } },
      { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] }],
  };
}

test('mixed plan: surface steps run, admin authorizes the protected step, the next run resumes and completes', async () => {
  const { db, store, ticket, run } = await fixture();
  const protectedFile = 'server/contexts/content/campus/tower.js';
  const p = buildingPlan([step(4, protectedFile, 'content.write', { layer: 'wiring', depends_on: [3] })]);
  const planned = await store.submitPlan(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
    plan: p, budgetUsed: 40, idempotencyKey: 'tier-step-submit4' });
  assert.equal(planned.status, 'planned');
  assert.equal(planned.aggregate_tier, 'protected');
  assert.deepEqual(planned.children.map((child) => [child.tier, child.status]),
    [['surface', 'queued'], ['surface', 'queued'], ['surface', 'queued'], ['protected', 'waiting_authorization']]);
  assert.deepEqual(planned.runnable_orders, [1, 2, 3]);

  // An active worker starts the approved plan, finishes the surface steps and stops on the protected one.
  await store.releaseLease(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token,
    outcome: 'planned', idempotencyKey: 'tier-step-release-0' });
  const first = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'active', intent: 'plan' });
  assert.equal(first.trigger, 'execute');
  const firstRun = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: first.lease_token,
    trigger: 'execute', idempotencyKey: 'tier-step-exec-1' });
  const heldPlan = await store.resumeAuthorizedPlan(ticket.id, { workerId: 'planner', leaseToken: first.lease_token, runId: firstRun.id });
  assert.deepEqual(heldPlan.runnable_orders, [1, 2, 3]);
  await store.submitPrePrVerdict(ticket.id, {
    workerId: 'planner', leaseToken: first.lease_token, runId: firstRun.id, idempotencyKey: 'tier-step-partial',
    verdict: { outcome: 'blocked', gate_reached: 3, budget_used: 12, failure_class: 'partial', repairs: [], candidate: null,
      reason: 'đã xong 3 bước an toàn; bước cần quyền content.write chờ quản trị viên cho phép',
      gates: [{ gate: 3, blocked: true, reason: 'bước protected chờ quản trị viên cho phép' }] },
  });
  assert.deepEqual({ ...(await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id)) },
    { status: 'waiting_admin', phase: 'partial' });

  await store.releaseLease(ticket.id, { workerId: 'planner', leaseToken: first.lease_token,
    outcome: 'planned', idempotencyKey: 'tier-step-release' });
  await store.authorizePlan(ticket.id, planned.plan_hash, 9);
  assert.deepEqual((await db.prepare('SELECT status FROM ai_tickets WHERE parent_id=? ORDER BY sequence').all(ticket.id))
    .map((child) => child.status), ['queued', 'queued', 'queued', 'queued']);
  // Approval wakes the protected step only; the partial request still needs the requester's "continue".
  assert.deepEqual({ ...(await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id)) },
    { status: 'waiting_admin', phase: 'partial' });
  await continuePartialRequest(db.d, (await db.prepare('SELECT source_request_id FROM ai_tickets WHERE id=?').get(ticket.id)).source_request_id, null);
  assert.deepEqual({ ...(await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id)) },
    { status: 'queued', phase: 'authorized' });

  const again = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'active', intent: 'plan' });
  assert.equal(again.trigger, 'execute');
  const execRun = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: again.lease_token,
    trigger: 'execute', idempotencyKey: 'tier-step-exec' });
  const resumed = await store.resumeAuthorizedPlan(ticket.id, { workerId: 'planner', leaseToken: again.lease_token, runId: execRun.id });
  assert.equal(resumed.tier, 'surface');  // split plan: the run tier follows the steps that may run
  assert.equal(resumed.plan_hash, planned.plan_hash);
  assert.deepEqual(resumed.children.map((child) => child.tier), ['surface', 'surface', 'surface', 'protected']);
  assert.deepEqual(resumed.runnable_orders, [1, 2, 3, 4]);

  const verdict = await store.submitPrePrVerdict(ticket.id, { workerId: 'planner', leaseToken: again.lease_token,
    runId: execRun.id, idempotencyKey: 'tier-step-ready',
    verdict: readyVerdict(['public/tower.html', protectedFile]) });
  assert.equal(verdict.outcome, 'ready_for_pr');
  assert.deepEqual({ ...(await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id)) },
    { status: 'planned', phase: 'pre_pr_ready' });
  db.close();
});
