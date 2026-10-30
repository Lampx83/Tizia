import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { validatePlan } from '../server/ai-board/policy.js';
import { ALLOWED_KEYS } from '../server/contexts/campus/layout-schema.js';

const step = (order, scope, capability, extra = {}) => ({
  order, title: `Bước ${order}`, description: 'Mô tả bước.', allowed_scope: scope,
  acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
  capability, risk: 'low', non_goals: [], ...extra,
});

const layout = { buildings: [{ id: 'lab-3d', x: 4, y: 7 }], props: [] };

function addBuildingPlan(payload = { kind: 'campus_layout', domain: 'it', layout }) {
  const steps = [
    step(1, ['public/campus-proto/b-iso-canvas.html'], 'content', { layer: 'frontend', depends_on: [] }),
    step(2, [], 'content', { layer: 'data', depends_on: [1], payload }),
    step(3, ['public/lab-3d.html'], 'content', { layer: 'frontend', depends_on: [2] }),
  ];
  return {
    domain: 'it', goal: 'Thêm tòa nhà vào campus IT.', allowed_scope: ['public/campus-proto/b-iso-canvas.html', 'public/lab-3d.html'],
    acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
    capabilities: ['content'], risk: 'low', non_goals: [], steps,
  };
}

test('layout whitelist is shared with the campus route', () => {
  assert.ok(ALLOWED_KEYS.has('buildings') && !ALLOWED_KEYS.has('__proto__'));
});

test('valid campus_layout payload makes a protected data step, others stay surface', () => {
  const checked = validatePlan(addBuildingPlan(), 'it');
  assert.deepEqual(checked.stepTiers, ['surface', 'protected', 'surface']);
  assert.deepEqual(checked.plan.steps[1].payload.layout, layout);
});

test('invalid payloads are rejected deterministically', () => {
  const bad = (payload) => assert.throws(() => validatePlan(addBuildingPlan(payload), 'it'), (e) => e.code === 'malformed_plan');
  bad({ kind: 'campus_layout', domain: 'it', layout: { buildings: [], evil: 1 } });
  bad({ kind: 'campus_layout', domain: 'nowhere', layout });
  bad({ kind: 'campus_layout', domain: 'it', layout: {} });
  bad({ kind: 'sql', domain: 'it', layout });
  bad('buildings');
  assert.throws(() => {
    const p = addBuildingPlan();
    p.steps[0].payload = { kind: 'campus_layout', domain: 'it', layout };
    validatePlan(p, 'it');
  }, (e) => e.code === 'malformed_plan');
});

test('data step with migration scope must be a new _ai-generated migration', () => {
  const p = addBuildingPlan();
  p.steps[1] = step(2, ['server/contexts/_ai-generated/lab/migrations/001-lab.sql'], 'generated.context', { layer: 'data', depends_on: [1] });
  p.capabilities = ['content', 'generated.context'];
  p.allowed_scope.push(p.steps[1].allowed_scope[0]);
  assert.equal(validatePlan(p, 'it').stepTiers[1], 'protected');
  p.steps[1].allowed_scope = ['public/x.sql'];
  p.allowed_scope.push('public/x.sql');
  assert.throws(() => validatePlan(p, 'it'), (e) => e.code === 'scope_violation');
});

test('data step waits for admin ack; dependent step is held until then', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  try {
    const store = createAsyncAiBoardStore(db.d);
    await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
      idempotencyKey: 'data-step-request', title: 'Thêm tòa nhà', detail: 'Fixture' });
    const ticket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
    const run = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token,
      trigger: 'plan', idempotencyKey: 'data-step-run' });
    const out = await store.submitPlan(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
      plan: addBuildingPlan(), budgetUsed: 40, idempotencyKey: 'data-step-submit' });
    assert.equal(out.status, 'planned');
    assert.deepEqual(out.children.map((c) => c.status), ['queued', 'waiting_data', 'queued']);
    assert.deepEqual(out.runnable_orders, [1]);
    const dataChild = out.children[1];
    assert.equal(JSON.parse((await db.prepare('SELECT description FROM ai_tickets WHERE id=?').get(dataChild.id)).description).payload.domain, 'it');

    await assert.rejects(store.acknowledgeDataStep(ticket.id, out.children[0].id, 9), (e) => e.code === 'data_step_not_found');
    await store.acknowledgeDataStep(ticket.id, dataChild.id, 9);
    await assert.rejects(store.acknowledgeDataStep(ticket.id, dataChild.id, 9), (e) => e.code === 'data_step_not_waiting');
    const rows = await db.prepare('SELECT sequence, status FROM ai_tickets WHERE parent_id=? ORDER BY sequence').all(ticket.id);
    assert.deepEqual(rows.map((r) => r.status), ['queued', 'done', 'queued']);
  } finally { db.close(); }
});
