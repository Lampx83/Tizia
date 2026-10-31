import test from 'node:test';
import assert from 'node:assert/strict';

import { LIMITS } from '../server/ai-board/store.js';
import { plannedRoot } from './support/ai-board-planned-root.js';
import { readRootAllowance, scaledRootLimit, hitRootGroup } from '../server/ai-board/services/root-allowance.js';

const bare = (db, ticket) => db.prepare('INSERT INTO ai_root_allowances(root_ticket_id, created_at) VALUES (?, ?)').run(ticket.id, Date.now());
const reserve = (db, ticket, key, kind, bucket, { provider = null, tokens = 1000 } = {}) => db.prepare(
  `INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
   VALUES (?, ?, ?, ?, 'h', ?, ?)`).run(ticket.id, key, kind, provider, tokens, Date.now())
  .then(() => bucket && db.prepare('INSERT INTO ai_work_reservation_phases(root_ticket_id, attempt_key, phase) VALUES (?, ?, ?)').run(ticket.id, key, bucket));
const setSteps = async (db, ticket, n) => {
  const row = await db.prepare('SELECT plan_json FROM ai_plans WHERE root_ticket_id=?').get(ticket.id);
  const plan = JSON.parse(row.plan_json);
  plan.steps = Array.from({ length: n }, (_, i) => ({ ...plan.steps[0], order: i + 1 }));
  await db.prepare('UPDATE ai_plans SET plan_json=? WHERE root_ticket_id=?').run(JSON.stringify(plan), ticket.id);
};

test('execute limits follow base + per_step * steps and the max cap', () => {
  const { model_calls: calls, semantic_repairs: repairs } = LIMITS.root_work_scaling;
  const expectCalls = n => Math.min(LIMITS.root_work.model_calls + calls.per_step * Math.min(n, LIMITS.max_subtasks_per_run), calls.max);
  assert.deepEqual([0, 1, 4, 10, 99].map(n => scaledRootLimit('model_calls', n)), [0, 1, 4, 10, 99].map(expectCalls));
  assert.equal(scaledRootLimit('model_calls', 0), LIMITS.root_work.model_calls);
  assert.ok(scaledRootLimit('model_calls', 4) >= 100 && scaledRootLimit('model_calls', 10) >= 190);
  assert.ok(scaledRootLimit('model_calls', 99) <= calls.max);
  assert.ok(scaledRootLimit('semantic_repairs', 99) <= repairs.max);
  assert.equal(scaledRootLimit('semantic_repairs', 0), LIMITS.root_work.semantic_repairs);
});

test('the approved plan step count sets the live execute limit; the plan bucket stays at base', async () => {
  const { db, ticket } = await plannedRoot();
  await bare(db, ticket);
  for (const n of [1, 4, 10]) {
    await setSteps(db, ticket, n);
    const a = await readRootAllowance(db.d, ticket.id);
    assert.equal(a.steps, n);
    assert.equal(a.limits.model_calls, scaledRootLimit('model_calls', n));
    assert.equal(a.limits.semantic_repairs, scaledRootLimit('semantic_repairs', n));
    assert.equal(a.plan.limits.model_calls, LIMITS.root_work.model_calls);
  }
});

test('four plan attempts leave the full execute budget', async () => {
  const { db, ticket } = await plannedRoot();
  await bare(db, ticket);
  for (let i = 0; i < 37; i++) await reserve(db, ticket, `attempt-m-${i}-xx`, 'model', 'plan', { provider: 'vllm' });
  for (let i = 0; i < 3; i++) await reserve(db, ticket, `attempt-s-${i}-xx`, 'semantic_repair', 'plan', { tokens: 0 });
  const execute = await readRootAllowance(db.d, ticket.id);
  assert.equal(execute.used.model_calls, 0);
  assert.equal(execute.used.semantic_repairs, 0);
  assert.equal(hitRootGroup(execute), null);
  assert.equal(execute.plan.used.model_calls, 37);
  const plan = await readRootAllowance(db.d, ticket.id, 'plan');
  assert.equal(plan.used.model_calls, 37);
  assert.equal(hitRootGroup(plan)?.group, 'semantic_repairs');
  for (let i = 0; i < execute.limits.model_calls; i++) await reserve(db, ticket, `attempt-e-${i}-xx`, 'model', 'execute', { provider: 'vllm' });
  assert.equal(hitRootGroup(await readRootAllowance(db.d, ticket.id))?.group, 'model_calls');
});

test('raising the contract reaches an existing root without DB writes, and never lowers below stored', async () => {
  const { db, ticket } = await plannedRoot();
  await db.prepare('INSERT INTO ai_root_allowances(root_ticket_id, limits_json, created_at) VALUES (?, ?, ?)')
    .run(ticket.id, JSON.stringify({ ...LIMITS.root_work }), Date.now());
  const before = await db.prepare('SELECT limits_json FROM ai_root_allowances WHERE root_ticket_id=?').get(ticket.id);
  const baseCalls = LIMITS.root_work.model_calls, perStep = LIMITS.root_work_scaling.model_calls.per_step;
  try {
    assert.equal((await readRootAllowance(db.d, ticket.id)).limits.model_calls, baseCalls + perStep);
    LIMITS.root_work_scaling.model_calls.per_step = perStep + 5;
    assert.equal((await readRootAllowance(db.d, ticket.id)).limits.model_calls, baseCalls + perStep + 5);
    LIMITS.root_work_scaling.model_calls.per_step = 0;
    LIMITS.root_work.model_calls = 1;
    assert.equal((await readRootAllowance(db.d, ticket.id)).limits.model_calls, baseCalls, 'stored limit is a floor');
  } finally { LIMITS.root_work.model_calls = baseCalls; LIMITS.root_work_scaling.model_calls.per_step = perStep; }
  assert.deepEqual(await db.prepare('SELECT limits_json FROM ai_root_allowances WHERE root_ticket_id=?').get(ticket.id), before);
});

test('tokens stay capped only for api; vllm tokens never hit the cap', async () => {
  const { db, ticket } = await plannedRoot();
  await bare(db, ticket);
  await reserve(db, ticket, 'attempt-vllm-0001', 'model', 'execute', { provider: 'vllm', tokens: LIMITS.root_work.tokens + 1 });
  const free = await readRootAllowance(db.d, ticket.id);
  assert.equal(free.used.metered_tokens, 0);
  assert.equal(free.groups.find(g => g.reason === 'root_tokens').hit, false);
  await reserve(db, ticket, 'attempt-api-0001', 'model', 'execute', { provider: 'api', tokens: LIMITS.root_work.tokens + 1 });
  assert.equal(hitRootGroup(await readRootAllowance(db.d, ticket.id)).group, 'tokens');
});
