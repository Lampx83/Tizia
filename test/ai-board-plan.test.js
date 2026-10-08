import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { PlanGuardrailError } from '../server/ai-board/store.js';
import {
  CAPABILITY_POLICY, CAPABILITY_POLICY_HASH, CAPABILITY_POLICY_VERSION, hashCapabilityPolicy, validatePlan,
} from '../server/ai-board/policy.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'plan-request-001', title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
  });
  const ticket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run = await store.createRun(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-001',
  });
  return { db, store, ticket, run };
}

function plan(overrides = {}) {
  return {
    domain: 'pharmacy',
    goal: 'Thêm trang thẻ ghi nhớ thuốc.',
    allowed_scope: ['public/pharmacy/flashcards.html'],
    acceptance: ['GET trang trả 200', 'hiển thị ba thẻ mẫu'],
    tests: ['node --test test/flashcards.test.js'],
    capabilities: ['public.ui'],
    risk: 'low',
    non_goals: ['không sửa auth', 'không sửa DB'],
    steps: [{
      order: 1,
      title: 'Tạo trang thẻ',
      description: 'Thêm trang HTML tĩnh.',
      allowed_scope: ['public/pharmacy/flashcards.html'],
      acceptance: ['hiển thị ba thẻ mẫu'],
      tests: ['node --test test/flashcards.test.js'],
      capability: 'public.ui',
      risk: 'low',
      non_goals: ['không sửa auth'],
    }],
    ...overrides,
  };
}

async function submit(store, ticket, run, value, extra = {}) {
  return await store.submitPlan(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token, runId: run.id,
    plan: value, budgetUsed: 40, idempotencyKey: extra.idempotencyKey || 'submit-plan-001',
    ...extra,
  });
}

test('validated surface plan creates ordered children once', async () => {
  const { db, store, ticket, run } = await fixture();
  const first = await submit(store, ticket, run, plan());
  assert.equal(first.tier, 'surface');
  assert.equal(first.status, 'planned');
  assert.equal(first.children.length, 1);
  assert.equal(first.capability_policy_hash, CAPABILITY_POLICY_HASH);
  assert.match(CAPABILITY_POLICY_HASH, /^[a-f0-9]{64}$/);
  for (const entry of Object.values(CAPABILITY_POLICY)) {
    assert.deepEqual(Object.keys(entry).sort(), [
      'allow', 'deny', 'dependencies', 'imports', 'mandatoryTests', 'owner', 'rationale', 'tier',
    ].sort());
  }
  assert.deepEqual(
    first.children.map((child) => [child.sequence, child.title, child.status, child.tier]),
    [[1, 'Tạo trang thẻ', 'queued', 'surface']],
  );
  const second = await submit(store, ticket, run, plan(), { idempotencyKey: 'submit-plan-002' });
  assert.equal(second.plan_hash, first.plan_hash);
  assert.equal(second.children[0].id, first.children[0].id);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=?').get(ticket.id)).n, 1);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_gate_traces WHERE run_id=?').get(run.id)).n, 3);
  db.close();
});

test('policy identity includes enforced fields only and versions the persisted plan hash', () => {
  const metadataOnlyChanges = Object.fromEntries(Object.entries(CAPABILITY_POLICY).map(([name, entry]) => [name, {
    ...entry,
    imports: ['metadata-only'],
    dependencies: ['metadata-only'],
    owner: 'metadata-only',
    rationale: 'metadata-only',
  }]));
  assert.equal(hashCapabilityPolicy(metadataOnlyChanges), CAPABILITY_POLICY_HASH);
  assert.notEqual(hashCapabilityPolicy({
    ...CAPABILITY_POLICY,
    'public.ui': { ...CAPABILITY_POLICY['public.ui'], allow: ['server/'] },
  }), CAPABILITY_POLICY_HASH);
  assert.equal(CAPABILITY_POLICY_VERSION, 'd0-v3');
  const checked = validatePlan(plan(), 'pharmacy');
  assert.equal(checked.planHash, createHash('sha256')
    .update(`d0-v3\n${CAPABILITY_POLICY_HASH}\n${checked.planJson}`).digest('hex'));
  assert.notEqual(checked.planHash, createHash('sha256')
    .update(`d0-v1\n${CAPABILITY_POLICY_HASH}\n${checked.planJson}`).digest('hex'));
});

test('malformed, cross-domain and unknown-capability plans fail closed with separate reasons', async () => {
  for (const [badPlan, code] of [
    [{ goal: 'thiếu schema' }, 'malformed_plan'],
    [plan({ domain: 'it' }), 'domain_mismatch'],
    [plan({ capabilities: ['root.shell'], steps: [{ ...plan().steps[0], capability: 'root.shell' }] }), 'unknown_capability'],
  ]) {
    const { db, store, ticket, run } = await fixture();
    await assert.rejects(
      async () => submit(store, ticket, run, badPlan),
      (error) => error instanceof PlanGuardrailError && error.code === code,
    );
    const root = await db.prepare('SELECT status, public_note, internal_reason FROM ai_tickets WHERE id=?').get(ticket.id);
    assert.equal(root.status, 'waiting');
    assert.ok(root.public_note);
    assert.ok(root.internal_reason);
    assert.notEqual(root.public_note, root.internal_reason);
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=?').get(ticket.id)).n, 0);
    await assert.rejects(
      async () => submit(store, ticket, run, badPlan),
      (error) => error instanceof PlanGuardrailError && error.code === code,
    );
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_gate_traces WHERE run_id=? AND status=?').get(run.id, 'blocked')).n, 1);
    db.close();
  }
});

test('protected plan waits for explicit admin authorization; core plan is human-owned', async () => {
  {
    const { db, store, ticket, run } = await fixture();
    const protectedPlan = plan({
      allowed_scope: ['server/contexts/content/index.js'],
      capabilities: ['content.write'],
      risk: 'medium',
      steps: [{ ...plan().steps[0], allowed_scope: ['server/contexts/content/index.js'], capability: 'content.write', risk: 'medium' }],
    });
    const waiting = await submit(store, ticket, run, protectedPlan);
    assert.equal(waiting.status, 'waiting_authorization');
    assert.equal(waiting.children[0].status, 'waiting_authorization');
    await store.releaseLease(ticket.id, { workerId: 'planner', leaseToken: ticket.lease_token, outcome: 'planned',
      idempotencyKey: 'plan-release-001' });
    await store.authorizePlan(ticket.id, waiting.plan_hash, 9);
    const root = await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
    const child = await db.prepare('SELECT status FROM ai_tickets WHERE parent_id=?').get(ticket.id);
    assert.deepEqual(root, { status: 'queued', phase: 'authorized' }); // back in the queue for execution
    assert.equal(child.status, 'queued');
    // A shadow (plan-only) worker must not take it; an active worker executes the authorized plan.
    assert.equal(await store.claimNext({ workerId: 'planner', mode: 'shadow', intent: 'plan' }), null);
    const exec = await store.claimNext({ workerId: 'planner', mode: 'active', intent: 'plan' });
    assert.equal(exec.phase, 'executing');
    const execRun = await store.createRun(ticket.id, { workerId: 'planner', leaseToken: exec.lease_token,
      trigger: 'execute', idempotencyKey: 'plan-run-exec-001' });
    const resumed = await store.resumeAuthorizedPlan(ticket.id, { workerId: 'planner', leaseToken: exec.lease_token, runId: execRun.id });
    assert.equal(resumed.status, 'planned');
    assert.equal(resumed.plan_hash, waiting.plan_hash);
    assert.equal(resumed.plan.steps[0].capability, 'content.write');
    assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id)).status, 'planned');
    assert.equal((await db.prepare('SELECT plan_hash FROM ai_runs WHERE id=?').get(execRun.id)).plan_hash, waiting.plan_hash);
    assert.equal((await store.resumeAuthorizedPlan(ticket.id, { workerId: 'planner', leaseToken: exec.lease_token, runId: execRun.id })).duplicate, true);
    // The execute run has no gate 1/2/2.5 traces of its own; the planning run's count for the same plan.
    const sha = (c) => c.repeat(40);
    const verdict = await store.submitPrePrVerdict(ticket.id, {
      workerId: 'planner', leaseToken: exec.lease_token, runId: execRun.id, idempotencyKey: 'plan-verdict-exec-001',
      verdict: {
        outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 10, failure_class: null, repairs: [],
        candidate: { branch: 'ai-board/2026-09-25-ticket-1-abc123', base_sha: sha('a'), head_sha: sha('b'),
          commits: [{ sha: sha('b'), title: 't', files: ['server/contexts/content/index.js'] }] },
        gates: [{ gate: 3, blocked: false }, { gate: 4, blocked: false, issues: [] },
          { gate: 5, blocked: false, smoke_passed: true, http_observed: true, functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } }, runner: 'docker' },
          { gate: 5.5, blocked: false, risk_level: 'medium', risk_signals: [] }],
      },
    });
    assert.equal(verdict.outcome, 'ready_for_pr');
    db.close();
  }
  {
    const { db, store, ticket, run } = await fixture();
    const corePlan = plan({
      allowed_scope: ['server/db.js'], capabilities: ['core.server'], risk: 'high',
      steps: [{ ...plan().steps[0], allowed_scope: ['server/db.js'], capability: 'core.server', risk: 'high' }],
    });
    const result = await submit(store, ticket, run, corePlan);
    assert.equal(result.status, 'human_owned');
    assert.equal(result.children[0].status, 'human_owned');
    db.close();
  }
});

test('resubmitting an identical valid plan after a worker restart does not consume an automatic round', async () => {
  const { db, store, ticket, run } = await fixture();
  const first = await submit(store, ticket, run, plan());
  for (const key of ['resume-001', 'resume-002', 'resume-003']) {
    const again = await submit(store, ticket, run, plan(), { idempotencyKey: key });
    assert.equal(again.status, 'planned');
    assert.equal(again.plan_hash, first.plan_hash);
  }
  const root = await db.prepare('SELECT status, phase, auto_rounds FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'planned', phase: 'ticketized', auto_rounds: 1 });
  db.close();
});

test('clarification invalidates the old plan and automatic planning stops after two rounds', async () => {
  const { db, store, ticket, run } = await fixture();
  const first = await submit(store, ticket, run, plan());
  assert.equal(await store.invalidatePlanForRequest(1, 'requester clarification'), true);
  assert.equal((await db.prepare('SELECT status FROM ai_plans WHERE plan_hash=?').get(first.plan_hash)).status, 'invalidated');
  assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE parent_id=?').get(ticket.id)).status, 'invalidated');

  const secondPlan = plan({ goal: 'Vòng hai', steps: [{ ...plan().steps[0], title: 'Vòng hai' }] });
  const ticket2 = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run2 = await store.createRun(ticket2.id, {
    workerId: 'planner', leaseToken: ticket2.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-002',
  });
  const second = await submit(store, ticket2, run2, secondPlan, { idempotencyKey: 'submit-plan-round2' });
  assert.equal(second.status, 'planned');
  await store.invalidatePlanForRequest(1, 'second clarification');

  const thirdPlan = plan({ goal: 'Vòng ba', steps: [{ ...plan().steps[0], title: 'Vòng ba' }] });
  const ticket3 = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const run3 = await store.createRun(ticket3.id, {
    workerId: 'planner', leaseToken: ticket3.lease_token,
    trigger: 'plan', idempotencyKey: 'plan-run-003',
  });
  const third = await submit(store, ticket3, run3, thirdPlan, { idempotencyKey: 'submit-plan-round3' });
  assert.equal(third.status, 'waiting_admin');
  assert.equal(third.reason, 'automatic_round_limit');
  assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id)).status, 'waiting_admin');
  db.close();
});
