import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { validate } from '../server/ai-board/security/json-schema.js';
import { validatePlan } from '../server/ai-board/security/policy.js';
import { CONTRACT } from '../server/ai-board/repositories/store-contract.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';

const VECTORS = JSON.parse(fs.readFileSync(new URL('./fixtures/data-schema-vectors.json', import.meta.url), 'utf8')).cases;
const FLAG = 'AI_BOARD_DATA_REGISTRY';
const withFlag = (on, fn) => async () => {
  const before = process.env[FLAG];
  if (on) process.env[FLAG] = '1'; else delete process.env[FLAG];
  try { await fn(); } finally { if (before === undefined) delete process.env[FLAG]; else process.env[FLAG] = before; }
};

const step = (order, scope, capability, extra = {}) => ({
  order, title: `Bước ${order}`, description: 'Mô tả bước.', allowed_scope: scope,
  acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
  capability, risk: 'low', non_goals: [], ...extra,
});
const plan = (steps, scope = ['public/a.html', 'public/b.html']) => ({
  domain: 'it', goal: 'Mục tiêu.', allowed_scope: scope, acceptance: ['node --test test/x.test.js'],
  tests: ['node --test test/x.test.js'], capabilities: ['content'], risk: 'low', non_goals: [], steps,
});
const SQL = "INSERT INTO shop_items (id, name) VALUES (1, 'Mũ') ON CONFLICT DO NOTHING";
const PASSED = { status: 'passed', profile: 'db_check' };
const seed = (extra = {}) => step(2, [], 'content', {
  layer: 'data', depends_on: [1], payload: { kind: 'sql_insert', sql: SQL }, db_check: PASSED, ...extra,
});
const file = (order, name, deps) => step(order, [`public/${name}.html`], 'content', { layer: 'frontend', depends_on: deps });
const bad = (p, code = 'malformed_plan') => assert.throws(() => validatePlan(p, 'it'), (e) => e.code === code);

for (const c of VECTORS) {
  test(`shared schema vector: ${c.name}`, () => assert.deepEqual(validate(c.value, c.schema), c.errors));
}

test('flag off: kinds beyond campus_layout are refused, campus_layout unchanged', withFlag(false, () => {
  bad(plan([file(1, 'a', []), seed()]));
  const layout = { buildings: [{ id: 'x' }] };
  const campus = step(2, [], 'content', { layer: 'data', depends_on: [1], payload: { kind: 'campus_layout', domain: 'it', layout } });
  const checked = validatePlan(plan([file(1, 'a', []), campus]), 'it');
  assert.deepEqual(checked.plan.steps[1].payload, { kind: 'campus_layout', domain: 'it', layout });
  assert.equal('data_kind' in checked.plan.steps[1], false);
}));

test('flag on: payload is checked by the registry schema and the step carries route and approver', withFlag(true, () => {
  const layout = { buildings: [{ id: 'x' }] };
  const mk = (payload) => plan([file(1, 'a', []), step(2, [], 'content', { layer: 'data', depends_on: [1], payload })]);
  const ok = validatePlan(mk({ kind: 'campus_layout', domain: 'it', layout }), 'it');
  assert.deepEqual(ok.plan.steps[1].data_kind,
    { kind: 'campus_layout', route: '/api/admin/campus-layout/:domain', method: 'POST', approver: 'admin', tier: 'protected' });
  assert.deepEqual(ok.stepTiers, ['surface', 'protected']);
  bad(mk({ kind: 'campus_layout', domain: 'nowhere', layout }));
  bad(mk({ kind: 'campus_layout', domain: 'it', layout: { evil: 1 } }));
  bad(mk({ kind: 'nope' }));
}));

test('flag on: sql_insert needs sandbox evidence and a matching pattern', withFlag(true, () => {
  const ok = validatePlan(plan([file(1, 'a', []), seed()]), 'it');
  assert.equal(ok.plan.steps[1].data_kind.route, '/api/admin/db/query');
  assert.deepEqual(ok.plan.steps[1].db_check, PASSED);
  const { db_check: _drop, ...noEvidence } = seed();
  bad(plan([file(1, 'a', []), noEvidence]));
  bad(plan([file(1, 'a', []), seed({ db_check: { status: 'failed' } })]));
  bad(plan([file(1, 'a', []), seed({ payload: { kind: 'sql_insert', sql: 'INSERT INTO shop_items (id) VALUES (1)' } })]));
  const campus = { kind: 'campus_layout', domain: 'it', layout: { props: [] } };
  bad(plan([file(1, 'a', []), step(2, [], 'content', { layer: 'data', depends_on: [1], payload: campus, db_check: PASSED })]));
}));

test('flag on: data step may sit between file steps; an earlier file step may wait for it', withFlag(true, () => {
  const between = plan([file(1, 'a', []), seed(), file(3, 'b', [2])]);
  assert.deepEqual(validatePlan(between, 'it').stepTiers, ['surface', 'protected', 'surface']);
  const forward = plan([file(1, 'a', [3]), seed({ depends_on: [] }), file(3, 'b', [2])]);
  assert.deepEqual(validatePlan(forward, 'it').plan.steps[0].depends_on, [3]);
  bad(plan([file(1, 'a', [2]), seed({ depends_on: [1] })]));
}));

test('data-only plan: allowed only with the flag', async () => {
  const only = () => plan([seed({ order: 1, depends_on: [] })], []);
  await withFlag(true, () => assert.deepEqual(validatePlan(only(), 'it').stepTiers, ['protected']))();
  await withFlag(false, () => bad(only()))();
});

test('a new kind needs only a registry entry; tier and approver come from it', withFlag(true, () => {
  const kinds = CONTRACT.data_kinds.kinds;
  kinds.glossary_term = {
    summary: 'Glossary.', route: '/api/admin/glossary', method: 'POST', context: 'glossary', tier: 'core', approver: 'admin',
    capability: 'content', verify: 'node --test test/g.test.js', max_bytes: 2000,
    schema: { type: 'object', required: ['kind', 'term'], properties: { kind: { const: 'glossary_term' }, term: { type: 'string', minLength: 2 } } },
  };
  try {
    const mk = (payload) => plan([file(1, 'a', []), step(2, [], 'content', { layer: 'data', depends_on: [1], payload })]);
    const out = validatePlan(mk({ kind: 'glossary_term', term: 'API', junk: 1 }), 'it');
    assert.deepEqual(out.plan.steps[1].payload, { kind: 'glossary_term', term: 'API' });
    assert.equal(out.stepTiers[1], 'core');
    assert.equal(out.tier, 'core');
    bad(mk({ kind: 'glossary_term', term: 'A' }));
    kinds.glossary_term.approver = 'robot';
    bad(mk({ kind: 'glossary_term', term: 'API' }));
    kinds.glossary_term.approver = 'admin';
    kinds.glossary_term.tier = 'free';
    bad(mk({ kind: 'glossary_term', term: 'API' }));
  } finally { delete kinds.glossary_term; }
}));

test('acknowledge refuses a step whose registry approver is not admin', withFlag(true, async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  try {
    const store = createAsyncAiBoardStore(db.d);
    await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
      idempotencyKey: 'data-registry-request', title: 'Nạp dữ liệu', detail: 'Fixture' });
    const ticket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
    const run = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, trigger: 'plan', idempotencyKey: 'data-registry-run' });
    const out = await store.submitPlan(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
      plan: plan([seed({ order: 1, depends_on: [] })], []), budgetUsed: 40, idempotencyKey: 'data-registry-submit' });
    assert.deepEqual(out.children.map((c) => c.status), ['waiting_data']);
    const child = out.children[0];
    const read = async () => JSON.parse((await db.prepare('SELECT description FROM ai_tickets WHERE id=?').get(child.id)).description);
    const write = (spec) => db.prepare('UPDATE ai_tickets SET description=? WHERE id=?').run(JSON.stringify(spec), child.id);
    const stored = await read();
    assert.equal(stored.data_kind.approver, 'admin');
    assert.deepEqual(stored.db_check, PASSED);
    await write({ ...stored, data_kind: { ...stored.data_kind, approver: 'owner' } });
    await assert.rejects(store.acknowledgeDataStep(ticket.id, child.id, 9), (e) => e.code === 'data_step_approver');
    await write(stored);
    await store.acknowledgeDataStep(ticket.id, child.id, 9);
    assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id)).status, 'done');
  } finally { db.close(); }
}));

const adminRequest = fs.readFileSync(new URL('../public/js/admin-request.js', import.meta.url), 'utf8');
const renderDataSteps = new Function('esc', 'code', 'childStatus', 'ui', `${adminRequest.slice(
  adminRequest.indexOf('function dataSteps('), adminRequest.indexOf('async function ackDataStep'))}; return dataSteps;`)(
  (v) => String(v), (v) => `<code>${v}</code>`, (v) => v, {});
const view = (spec) => renderDataSteps({ root: { id: 1, plan_revision: 1 },
  children: [{ id: 7, layer: 'data', plan_revision: 1, status: 'waiting_data', title: 'Bước', description: JSON.stringify(spec) }] });

test('admin UI shows route and approver for a non-campus kind, campus unchanged', () => {
  const html = view({ payload: { kind: 'sql_insert', sql: SQL }, db_check: PASSED,
    data_kind: { kind: 'sql_insert', route: '/api/admin/db/query', method: 'POST', approver: 'admin', tier: 'protected' } });
  assert.match(html, /<code>POST \/api\/admin\/db\/query<\/code>/);
  assert.match(html, /data-kind-rule>sql_insert · người duyệt: admin · cấp protected · đã chạy thử/);
  const layout = { props: [] };
  const campus = { kind: 'campus_layout', domain: 'it', layout };
  const flagOff = view({ payload: campus });
  assert.match(flagOff, /<code>POST \/api\/admin\/campus-layout\/it<\/code>/);
  assert.doesNotMatch(flagOff, /data-kind-rule/);
  assert.equal(view({ payload: campus, data_kind: { kind: 'campus_layout', approver: 'admin' } }), flagOff);
});
