// Async store vertical slice (request -> ticket -> plan -> verdict) on every backend, checked against the sync
// SQLite store as reference: the same scenario must leave the same observable board state.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAiBoardStore, scaledLimit } from '../server/ai-board/store.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { backends } from './support/ai-board-db.js';

const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);

const step = {
  order: 1, title: 'Sửa trang giới thiệu', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
  acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'],
};
const plan = (domain = 'pharmacy') => ({
  domain, goal: 'Sửa trang giới thiệu.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
  tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step],
});
const gates = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false,
    functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } } },
  55: { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
};
const candidate = {
  branch: 'ai-board/2026-09-24-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
  commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 Sửa trang', files: ['public/gioi-thieu.html'] }],
};
const passing = (extra = {}) => ({
  outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 80, failure_class: null,
  repairs: [], candidate, gates: [gates[3], gates[4], gates[5], gates[55]], ...extra,
});
const criticalBlock = () => ({
  outcome: 'blocked', gate_reached: 4, reason: 'touched auth', budget_used: 80, failure_class: 'critical',
  repairs: [{ gate: 4, reason: 'one fix' }], candidate: null,
  gates: [gates[3], { gate: 4, blocked: true, reason: 'touched auth', issues: [] }],
});

async function seedUsers(d) {
  await d.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (1, 'lan', 'Lan', 'student', 'pharmacy')`);
  await d.run(`INSERT INTO users(id, username, display_name, role, enrolled_domain) VALUES (9, 'admin', 'Admin', 'admin', NULL)`);
}

/** Runs the scenario against `store` (sync or async), returns what the caller observed. */
async function scenario(store, name) {
  const seen = {};
  const created = await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: `req-${name}-001`, title: 'Sửa trang giới thiệu', detail: 'fixture',
  });
  seen.created = created.created;
  seen.retry = (await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: `req-${name}-001`, title: 'Sửa trang giới thiệu',
  })).created;
  const ticket = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  assert.equal(ticket.phase, 'planning');
  // w1 holds the lease; another worker gets nothing while only one request is queued.
  seen.other = await store.claimNext({ workerId: 'w2', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  seen.heartbeat = typeof (await store.heartbeat(ticket.id, 'w1', ticket.lease_token)).lease_expires_at;
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `run-${name}-001` });
  seen.runAgain = (await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `run-${name}-001` })).id === run.id;
  await assert.rejects(Promise.resolve().then(() => store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: `plan-${name}-bad`, plan: plan('it'),
  })), (e) => e.code === 'domain_mismatch');
  return { seen, ticket, lease, run, store };
}

async function snapshot(d) {
  const tickets = await d.all(`SELECT id, parent_id, kind, sequence, status, phase, tier, plan_revision, auto_rounds,
    cumulative_budget, budget_limit, public_note, internal_reason, lease_owner FROM ai_tickets ORDER BY id`);
  const events = (await d.all('SELECT ticket_id, event_type, transition, idempotency_key FROM ai_events ORDER BY id'))
    .map((e) => ({ ...e, idempotency_key: e.idempotency_key.replace(/^(claim:[^:]+:\d+):.*/, '$1') }));
  const runs = await d.all('SELECT ticket_id, attempt, trigger, outcome, gate, plan_revision, cumulative_budget FROM ai_runs ORDER BY id');
  const traces = await d.all('SELECT run_id, gate, status FROM ai_gate_traces ORDER BY id');
  const tags = await d.all('SELECT ticket_id, tag FROM ai_ticket_tags ORDER BY ticket_id, tag');
  const alerts = await d.all('SELECT ticket_id, severity, category, status FROM ai_alerts ORDER BY id');
  const plans = await d.all('SELECT root_ticket_id, revision, tier, status FROM ai_plans ORDER BY id');
  const requests = await d.all('SELECT id, status, type, owner_state, admin_note FROM requests ORDER BY id');
  return JSON.parse(JSON.stringify({ tickets, events, runs, traces, tags, alerts, plans, requests }));
}

async function happyAndCritical(store, d) {
  await seedUsers(d);
  const a = await scenario(store, 'a');
  const planned = await store.submitPlan(a.ticket.id, { ...a.lease, runId: a.run.id, budgetUsed: 40, idempotencyKey: 'plan-a-ok', plan: plan() });
  const again = await store.submitPlan(a.ticket.id, { ...a.lease, runId: a.run.id, budgetUsed: 40, idempotencyKey: 'plan-a-ok', plan: plan() });
  const verdict = await store.submitPrePrVerdict(a.ticket.id, {
    ...a.lease, runId: a.run.id, idempotencyKey: 'verdict-a-1', verdict: passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }),
  });
  const replay = await store.submitPrePrVerdict(a.ticket.id, {
    ...a.lease, runId: a.run.id, idempotencyKey: 'verdict-a-1', verdict: passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }),
  });
  await assert.rejects(Promise.resolve().then(() => store.submitPrePrVerdict(a.ticket.id, {
    ...a.lease, runId: a.run.id, idempotencyKey: 'verdict-a-2', verdict: passing(),
  })), (e) => e.code === 'idempotency_conflict');
  // second request: critical block raises an alert
  const b = await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: 'req-b-001', title: 'Sửa trang thứ hai',
  });
  const claim = await store.claimNext({ workerId: 'w3', mode: 'active', intent: 'plan' });
  assert.equal(claim.id, b.root_ticket_id);
  const lease = { workerId: 'w3', leaseToken: claim.lease_token };
  const run = await store.createRun(claim.id, { ...lease, trigger: 'plan', idempotencyKey: 'run-b-001' });
  await store.submitPlan(claim.id, { ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'plan-b-ok', plan: plan() });
  await store.submitPrePrVerdict(claim.id, { ...lease, runId: run.id, idempotencyKey: 'verdict-b-1', verdict: criticalBlock() });
  await assert.rejects(Promise.resolve().then(() => store.heartbeat(claim.id, 'w3', 'wrong-token')), (e) => e.code === 'stale_lease');
  return {
    seen: a.seen, planned: { ...planned, children: planned.children.map((c) => c.sequence) },
    duplicate: again.duplicate, verdictOutcome: verdict.outcome, replayOutcome: replay.outcome,
    run: scaledLimit('units', 1),
  };
}

test('PostgreSQL replay preserves request -> plan -> verdict results and state', async () => {
  const [postgres] = backends;
  const ref = await postgres.open();
  let expected;
  let expectedState;
  try {
    expected = await happyAndCritical(createAsyncAiBoardStore(ref), ref);
    expectedState = await snapshot(ref);
  } finally { await ref.dispose(); }
  assert.equal(expected.seen.created, true);
  assert.equal(expected.seen.retry, false);
  assert.equal(expected.seen.other, null);
  assert.equal(expected.planned.status, 'planned');
  assert.equal(expected.verdictOutcome, 'ready_for_pr');
  assert.ok(expectedState.alerts.length === 1 && expectedState.alerts[0].category === 'boundary_violation');
  assert.ok(expectedState.events.some((e) => e.event_type === 'plan_blocked'));

  for (const backend of backends) {
    const d = await backend.open();
    try {
      const store = createAsyncAiBoardStore(d);
      const got = await happyAndCritical(store, d);
      assert.deepEqual(got, expected, `${backend.name} observed results`);
      assert.deepEqual(await snapshot(d), expectedState, `${backend.name} final board state`);
    } finally { await d.dispose(); }
  }
});

for (const backend of backends) {
  test(`[${backend.name}] concurrent claims never hand one ticket to two workers`, async () => {
    const d = await backend.open();
    try {
      await seedUsers(d);
      const store = createAsyncAiBoardStore(d);
      for (const n of [1, 2]) {
        await store.createRequestWithRoot({
          ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: `req-par-00${n}`, title: `Yêu cầu song song ${n}`,
        });
      }
      const claims = await Promise.all(['wa', 'wb', 'wc'].map((w) => store.claimNext({ workerId: w, mode: 'shadow', intent: 'plan' })));
      const ids = claims.filter(Boolean).map((c) => c.id);
      assert.equal(ids.length, 2);
      assert.equal(new Set(ids).size, 2);
    } finally { await d.dispose(); }
  });
}
