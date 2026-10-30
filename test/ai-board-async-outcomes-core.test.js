// Core board flow on the async store: intake, claim/lease lifecycle, runs and events, plans (surface, protected, core, guardrail), verdict outcomes.
import test from 'node:test';
import { CONTRACT } from '../server/ai-board/store.js';
import assert from 'node:assert/strict';
import { runBoard, failure } from './support/ai-board-parity.js';
import {
  blocked, claimAndRun, corePlan, newRequest, passing, planOf, protectedPlan, submit, verdict,
} from './support/ai-board-scenarios.js';

CONTRACT.repair_replan.enabled = false; // plan-class replan is covered in verdict-outcomes

test('intake, validation, idempotent retry, listing, pending count', async () => {
  const { result: out } = await runBoard(async (store) => {
    const r = {};
    r.first = await newRequest(store, { tag: 'a', attachments: [{ url: '/x.png', name: 'x', mime: 'image/png', size: 3, kind: 'screenshot' }] });
    r.retry = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: r.first && 'req-1-a-aaa', title: 'Sửa trang giới thiệu' });
    r.clarifying = await newRequest(store, { tag: 'c', clarifying: true, title: 'Cần làm rõ thêm' });
    r.other = await newRequest(store, { tag: 'm', ownerUserId: 2, ownerDisplayName: 'Minh', title: 'Yêu cầu của Minh' });
    r.badTitle = await failure(() => store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: 'bad-title-1', title: 'x' }));
    r.badKey = await failure(() => store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: 'x', title: 'Tiêu đề hợp lệ' }));
    r.list = await store.listRequestsForOwner(1, 'pharmacy');
    r.pending = [await store.countPendingRoots(1), await store.countPendingRoots(1, 'req-1-a-aaa'), await store.countPendingRoots(2)];
    r.queue = await store.listAdminQueue();
    r.workflow = [await store.requestWorkflow(r.first.request_id), await store.requestWorkflow(9999)];
    return r;
  });

  assert.equal(out.first.created, true);
  assert.equal(out.retry.created, false, 'same idempotency key returns the existing request');
  assert.equal(out.retry.request_id, out.first.request_id);
  assert.equal(out.badTitle.error, 'RequestValidationError');
  assert.equal(out.badKey.error, 'RequestValidationError');
  assert.deepEqual(out.list.map((row) => row.id), [2, 1], 'owner sees own requests, newest first');
  assert.deepEqual(out.pending, [2, 0, 1], 'retry key does not count as pending; other owner counted separately');
  assert.deepEqual(out.queue.map((row) => [row.source_request_id, row.phase]), [[1, 'intake'], [2, 'clarifying'], [3, 'intake']]);
  assert.equal(out.workflow[0].workflow_status, 'queued');
  assert.equal(out.workflow[1], null);
});

test('claim fairness, off/yield modes, lease lifecycle, runs, events, release outcomes', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const r = {};
    await newRequest(store, { tag: 'f1' });
    await newRequest(store, { tag: 'f2' });
    await newRequest(store, { tag: 'm1', ownerUserId: 2, ownerDisplayName: 'Minh' });
    r.off = await store.claimNext({ workerId: 'w-off', mode: 'off' });
    r.badMode = await failure(() => store.claimNext({ workerId: 'w1', mode: 'weird' }));
    r.badWorker = await failure(() => store.claimNext({ workerId: '!', mode: 'active' }));
    r.shadow = await store.claimNext({ workerId: 'w-sh', version: 'v1', mode: 'shadow', intent: 'precheck' });
    const lease = { workerId: 'w-sh', leaseToken: r.shadow.lease_token };
    r.yield = await store.claimNext({ workerId: 'w-sh', mode: 'shadow', yieldNew: true });
    r.same = (await store.claimNext({ workerId: 'w-sh', mode: 'shadow' })).id === r.shadow.id;
    r.hb = Object.keys(await store.heartbeat(r.shadow.id, 'w-sh', r.shadow.lease_token));
    r.badHb = await failure(() => store.heartbeat(r.shadow.id, 'w-sh', 'nope'));
    const run = await store.createRun(r.shadow.id, { ...lease, trigger: 'shadow_precheck', idempotencyKey: 'run-core-1' });
    r.runDup = (await store.createRun(r.shadow.id, { ...lease, trigger: 'shadow_precheck', idempotencyKey: 'run-core-1' })).id === run.id;
    r.badTrigger = await failure(() => store.createRun(r.shadow.id, { ...lease, trigger: 'nope', idempotencyKey: 'run-core-2' }));
    r.ev = await store.recordWorkerEvent(r.shadow.id, { ...lease, runId: run.id, eventType: 'heartbeat', internalDetail: 'tick', idempotencyKey: 'ev-core-1' });
    r.evDup = (await store.recordWorkerEvent(r.shadow.id, { ...lease, runId: run.id, eventType: 'heartbeat', idempotencyKey: 'ev-core-1' })).id === r.ev.id;
    r.gate = await store.recordWorkerEvent(r.shadow.id, { ...lease, runId: run.id, eventType: 'gate_started', gate: 2, attempt: 1, idempotencyKey: 'ev-core-2' });
    r.badEv = await failure(() => store.recordWorkerEvent(r.shadow.id, { ...lease, eventType: 'bogus', idempotencyKey: 'ev-core-3' }));
    r.snapshot = (await store.getLeasedSnapshot(r.shadow.id, 'w-sh', r.shadow.lease_token)).ticket.phase;
    r.release = await store.releaseLease(r.shadow.id, { ...lease, outcome: 'shadow_ok', idempotencyKey: 'rel-core-1' });
    r.releaseDup = await store.releaseLease(r.shadow.id, { ...lease, outcome: 'shadow_ok', idempotencyKey: 'rel-core-1' });
    r.releaseWrong = await failure(() => store.releaseLease(r.shadow.id, { workerId: 'other', leaseToken: 'x', outcome: 'waiting', idempotencyKey: 'rel-core-1' }));
    r.plan1 = (await store.claimNext({ workerId: 'w-p', mode: 'active', intent: 'plan' })).id;
    const l2 = { workerId: 'w-p', leaseToken: (await d.get('SELECT lease_token FROM ai_tickets WHERE id = ?', [r.plan1])).lease_token };
    const run2 = await store.createRun(r.plan1, { ...l2, trigger: 'plan', idempotencyKey: 'run-core-3' });
    r.waiting = await store.releaseLease(r.plan1, { ...l2, outcome: 'waiting', internalDetail: JSON.stringify({ gate: 1, reason: 'unclear' }), idempotencyKey: 'rel-core-2' });
    r.trace = await store.getRequestTrace(1);
    r.workers = (await store.listWorkers({ now: Date.now() + 10 * 60_000 })).map((w) => [w.worker_id, w.status]);
    r.run2 = run2.attempt;
    return r;
  });

  assert.equal(out.off, null, 'mode off claims nothing');
  assert.equal(out.badMode.error, 'invalid_worker_operation');
  assert.equal(out.badWorker.error, 'invalid_worker_operation');
  assert.deepEqual(
    { status: out.shadow.status, phase: out.shadow.phase, trigger: out.shadow.trigger },
    { status: 'running', phase: 'shadow_precheck', trigger: 'shadow_precheck' },
  );
  assert.equal(out.same, true, 'same worker re-claims its own lease');
  assert.equal(out.yield.id, out.shadow.id, 'yieldNew does not take a second root while one is held');
  assert.ok(out.hb.includes('lease_expires_at'));
  assert.equal(out.badHb.error, 'stale_lease');
  assert.equal(out.runDup, true);
  assert.equal(out.badTrigger.error, 'invalid_worker_operation');
  assert.equal(out.ev.event_type, 'heartbeat');
  assert.equal(out.evDup, true);
  assert.equal(out.gate.event_type, 'gate_started');
  assert.equal(out.badEv.error, 'invalid_worker_operation');
  assert.equal(out.snapshot, 'shadow_precheck');
  assert.deepEqual(out.release, { status: 'queued', phase: 'shadow_checked' });
  assert.deepEqual(out.releaseDup, { status: 'queued', phase: 'shadow_checked', duplicate: true });
  assert.equal(out.releaseWrong.error, 'idempotency_conflict');
  assert.equal(out.plan1, 3, 'fairness: Minh is served before Lan second request');
  assert.deepEqual(out.waiting, { status: 'waiting', phase: 'precheck_blocked' });
  assert.equal(out.run2, 1);
  assert.equal(out.trace.root.phase, 'shadow_checked');
  assert.deepEqual(out.workers, [['w-p', 'idle'], ['w-sh', 'idle'], ['w-off', 'stopped']]);
});

test('plans (surface, protected + authorize + resume, core, guardrail block, budget) and verdict outcomes', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const r = {};
    await newRequest(store, { tag: 's' });
    const a = await claimAndRun(store, 'w1');
    r.surface = await submit(store, a, planOf(), 'plan-core-s1');
    r.surfaceAgain = await submit(store, a, planOf(), 'plan-core-s1');
    r.surfaceVerdict = (await verdict(store, a, passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }), 'verdict-core-s1')).outcome;
    r.verdictReplay = (await verdict(store, a, passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }), 'verdict-core-s1')).outcome;
    r.verdictConflict = await failure(() => verdict(store, a, passing(), 'verdict-core-s2'));
    r.traceA = await store.getRequestTrace(1);
    await newRequest(store, { tag: 'p' });
    const b = await claimAndRun(store, 'w2');
    r.protected = await submit(store, b, protectedPlan(), 'plan-core-p1');
    r.authBad = await failure(() => store.authorizePlan(b.id, 'f'.repeat(64), 9));
    r.noVerdictYet = await failure(() => verdict(store, b, passing(), 'verdict-core-p0'));
    r.auth = await store.authorizePlan(b.id, r.protected.plan_hash, 9);
    r.rootAfterAuth = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [b.id]);
    await newRequest(store, { tag: 'k' });
    const c = await claimAndRun(store, 'w3');
    r.core = await submit(store, c, corePlan(), 'plan-core-k1');
    r.coreVerdict = await failure(() => verdict(store, c, passing(), 'verdict-core-k1'));
    await newRequest(store, { tag: 'g' });
    const g = await claimAndRun(store, 'w4');
    r.blockedPlan = await failure(() => submit(store, g, planOf({ domain: 'it' }), 'plan-core-g1'));
    r.blockedPlanAgain = await failure(() => submit(store, g, planOf({ domain: 'it' }), 'plan-core-g1'));
    for (const [tag, v] of [['x1', blocked(4, 'critical')], ['x2', blocked(5, 'budget')], ['x3', blocked(5, 'plan')], ['x4', blocked(5, 'transient')]]) {
      await newRequest(store, { tag });
      const x = await claimAndRun(store, `w-${tag}`);
      await submit(store, x, planOf(), `plan-core-${tag}`);
      r[`verdict_${tag}`] = (await verdict(store, x, v, `verdict-core-${tag}`)).failure_class;
      r[`root_${tag}`] = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [x.id]);
    }
    await d.run('INSERT INTO ai_transient_retry_state(id, enabled, updated_at) VALUES (1, 1, ?)', [Date.now()]);
    await newRequest(store, { tag: 'x5' });
    const t = await claimAndRun(store, 'w-x5');
    await submit(store, t, planOf(), 'plan-core-x5');
    await verdict(store, t, blocked(5, 'transient'), 'verdict-core-x5');
    r.transientRoot = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [t.id]);
    await newRequest(store, { tag: 'bb' });
    const big = await claimAndRun(store, 'w-bb');
    r.bigBudget = await store.submitPlan(big.id, { ...big.lease, runId: big.run.id, plan: planOf(), budgetUsed: 2400, idempotencyKey: 'plan-core-bb' });
    r.queue = await store.listAdminQueue();
    return r;
  });

  assert.equal(out.surface.status, 'planned');
  assert.equal(out.surface.children.length, 1, 'surface plan ticketizes one implementation child');
  assert.equal(out.surfaceAgain.duplicate, true, 'same plan key replays without a second child');
  assert.equal(out.surfaceVerdict, 'ready_for_pr');
  assert.equal(out.verdictReplay, 'ready_for_pr');
  assert.equal(out.verdictConflict.error, 'idempotency_conflict');
  assert.equal(out.traceA.root.phase, 'pre_pr_ready');
  assert.equal(out.protected.status, 'waiting_authorization');
  assert.equal(out.authBad.error, 'plan_not_found');
  assert.equal(out.noVerdictYet.error, 'plan_required');
  assert.deepEqual(out.auth, { ok: true });
  assert.deepEqual(out.rootAfterAuth, { status: 'queued', phase: 'authorized' });
  assert.equal(out.core.status, 'human_owned', 'core tier is handed to a human');
  assert.equal(out.coreVerdict.error, 'plan_required');
  assert.equal(out.blockedPlan.error, 'domain_mismatch');
  assert.equal(out.blockedPlanAgain.error, 'domain_mismatch');
  assert.deepEqual([out.verdict_x1, out.verdict_x2, out.verdict_x3, out.verdict_x4], ['critical', 'budget', 'plan', 'transient']);
  assert.equal(out.root_x1.phase, 'critical_violation');
  assert.equal(out.root_x2.phase, 'budget_exhausted');
  assert.equal(out.root_x3.phase, 'plan_unfit');
  assert.equal(out.root_x4.phase, 'transient_blocked');
  assert.deepEqual(out.transientRoot, { status: 'queued', phase: 'authorized' }, 'transient block with retry enabled requeues the root');
  assert.equal(out.bigBudget.status, 'waiting_admin', 'plan over budget goes to admin');
  assert.ok(out.queue.some((row) => row.phase === 'critical_violation'));
});
