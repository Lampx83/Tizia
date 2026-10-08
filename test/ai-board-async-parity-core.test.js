// Async store == sync store: request intake, queue/claim/lease, runs/events, release, plan (all tiers), verdicts, reads.
import test from 'node:test';
import assert from 'node:assert/strict';
import { assertParity, failure } from './support/ai-board-parity.js';
import {
  blocked, claimAndRun, corePlan, newRequest, passing, planOf, protectedPlan, submit, verdict,
} from './support/ai-board-scenarios.js';

test('parity: intake, validation, idempotent retry, listing, pending count', async () => {
  const expected = await assertParity(async (store) => {
    const out = {};
    out.first = await newRequest(store, { tag: 'a', attachments: [{ url: '/x.png', name: 'x', mime: 'image/png', size: 3, kind: 'screenshot' }] });
    out.retry = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: out.first && 'req-1-a-aaa', title: 'Sửa trang giới thiệu' });
    out.clarifying = await newRequest(store, { tag: 'c', clarifying: true, title: 'Cần làm rõ thêm' });
    out.other = await newRequest(store, { tag: 'm', ownerUserId: 2, ownerDisplayName: 'Minh', title: 'Yêu cầu của Minh' });
    out.badTitle = await failure(() => store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: 'bad-title-1', title: 'x' }));
    out.badKey = await failure(() => store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', idempotencyKey: 'x', title: 'Tiêu đề hợp lệ' }));
    out.list = await store.listRequestsForOwner(1, 'pharmacy');
    out.pending = [await store.countPendingRoots(1), await store.countPendingRoots(1, 'req-1-a-aaa'), await store.countPendingRoots(2)];
    out.queue = await store.listAdminQueue();
    out.workflow = [await store.requestWorkflow(out.first.request_id), await store.requestWorkflow(9999)];
    return out;
  });
  assert.equal(expected.result.retry.created, false);
  assert.equal(expected.result.list.length, 2);
});

test('parity: claim fairness, off/yield modes, lease lifecycle, runs, events, release outcomes', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    await newRequest(store, { tag: 'f1' });
    await newRequest(store, { tag: 'f2' });
    await newRequest(store, { tag: 'm1', ownerUserId: 2, ownerDisplayName: 'Minh' });
    out.off = await store.claimNext({ workerId: 'w-off', mode: 'off' });
    out.badMode = await failure(() => store.claimNext({ workerId: 'w1', mode: 'weird' }));
    out.badWorker = await failure(() => store.claimNext({ workerId: '!', mode: 'active' }));
    out.shadow = await store.claimNext({ workerId: 'w-sh', version: 'v1', mode: 'shadow', intent: 'precheck' });
    const lease = { workerId: 'w-sh', leaseToken: out.shadow.lease_token };
    out.yield = await store.claimNext({ workerId: 'w-sh', mode: 'shadow', yieldNew: true });
    out.same = (await store.claimNext({ workerId: 'w-sh', mode: 'shadow' })).id === out.shadow.id;
    out.hb = Object.keys(await store.heartbeat(out.shadow.id, 'w-sh', out.shadow.lease_token));
    out.badHb = await failure(() => store.heartbeat(out.shadow.id, 'w-sh', 'nope'));
    const run = await store.createRun(out.shadow.id, { ...lease, trigger: 'shadow_precheck', idempotencyKey: 'run-core-1' });
    out.runDup = (await store.createRun(out.shadow.id, { ...lease, trigger: 'shadow_precheck', idempotencyKey: 'run-core-1' })).id === run.id;
    out.badTrigger = await failure(() => store.createRun(out.shadow.id, { ...lease, trigger: 'nope', idempotencyKey: 'run-core-2' }));
    out.ev = await store.recordWorkerEvent(out.shadow.id, { ...lease, runId: run.id, eventType: 'heartbeat', internalDetail: 'tick', idempotencyKey: 'ev-core-1' });
    out.evDup = (await store.recordWorkerEvent(out.shadow.id, { ...lease, runId: run.id, eventType: 'heartbeat', idempotencyKey: 'ev-core-1' })).id === out.ev.id;
    out.gate = await store.recordWorkerEvent(out.shadow.id, { ...lease, runId: run.id, eventType: 'gate_started', gate: 2, attempt: 1, idempotencyKey: 'ev-core-2' });
    out.badEv = await failure(() => store.recordWorkerEvent(out.shadow.id, { ...lease, eventType: 'bogus', idempotencyKey: 'ev-core-3' }));
    out.snapshot = (await store.getLeasedSnapshot(out.shadow.id, 'w-sh', out.shadow.lease_token)).ticket.phase;
    out.release = await store.releaseLease(out.shadow.id, { ...lease, outcome: 'shadow_ok', idempotencyKey: 'rel-core-1' });
    out.releaseDup = await store.releaseLease(out.shadow.id, { ...lease, outcome: 'shadow_ok', idempotencyKey: 'rel-core-1' });
    out.releaseWrong = await failure(() => store.releaseLease(out.shadow.id, { workerId: 'other', leaseToken: 'x', outcome: 'waiting', idempotencyKey: 'rel-core-1' }));
    // second worker: plan intent picks next by fairness (Minh served last, so Lan's second request is not first)
    out.plan1 = (await store.claimNext({ workerId: 'w-p', mode: 'active', intent: 'plan' })).id;
    const l2 = { workerId: 'w-p', leaseToken: (await d.get('SELECT lease_token FROM ai_tickets WHERE id = ?', [out.plan1])).lease_token };
    const run2 = await store.createRun(out.plan1, { ...l2, trigger: 'plan', idempotencyKey: 'run-core-3' });
    out.waiting = await store.releaseLease(out.plan1, { ...l2, outcome: 'waiting', internalDetail: JSON.stringify({ gate: 1, reason: 'unclear' }), idempotencyKey: 'rel-core-2' });
    out.trace = await store.getRequestTrace(1);
    out.workers = (await store.listWorkers({ now: Date.now() + 10 * 60_000 })).map((w) => [w.worker_id, w.status]);
    out.run2 = run2.attempt;
    return out;
  });
});

test('parity: plans (surface, protected + authorize + resume, core, guardrail block, budget) and verdict outcomes', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    // surface plan, duplicate submit, verdict with repair, replay and conflict
    await newRequest(store, { tag: 's' });
    const a = await claimAndRun(store, 'w1');
    out.surface = await submit(store, a, planOf(), 'plan-core-s1');
    out.surfaceAgain = await submit(store, a, planOf(), 'plan-core-s1');
    out.surfaceVerdict = (await verdict(store, a, passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }), 'verdict-core-s1')).outcome;
    out.verdictReplay = (await verdict(store, a, passing({ repairs: [{ gate: 5, reason: 'tests failed' }] }), 'verdict-core-s1')).outcome;
    out.verdictConflict = await failure(() => verdict(store, a, passing(), 'verdict-core-s2'));
    out.traceA = await store.getRequestTrace(1);
    // protected plan -> waiting_authorization -> authorize -> worker resumes it
    await newRequest(store, { tag: 'p' });
    const b = await claimAndRun(store, 'w2');
    out.protected = await submit(store, b, protectedPlan(), 'plan-core-p1');
    out.authBad = await failure(() => store.authorizePlan(b.id, 'f'.repeat(64), 9));
    out.noVerdictYet = await failure(() => verdict(store, b, passing(), 'verdict-core-p0'));
    out.auth = await store.authorizePlan(b.id, out.protected.plan_hash, 9);
    out.rootAfterAuth = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [b.id]);
    // core plan -> human owned
    await newRequest(store, { tag: 'k' });
    const c = await claimAndRun(store, 'w3');
    out.core = await submit(store, c, corePlan(), 'plan-core-k1');
    out.coreVerdict = await failure(() => verdict(store, c, passing(), 'verdict-core-k1'));
    // guardrail failure: domain mismatch is recorded as a blocked plan
    await newRequest(store, { tag: 'g' });
    const g = await claimAndRun(store, 'w4');
    out.blockedPlan = await failure(() => submit(store, g, planOf({ domain: 'it' }), 'plan-core-g1'));
    out.blockedPlanAgain = await failure(() => submit(store, g, planOf({ domain: 'it' }), 'plan-core-g1'));
    // critical verdict raises an alert; budget and plan failure classes; transient
    for (const [tag, v] of [['x1', blocked(4, 'critical')], ['x2', blocked(5, 'budget')], ['x3', blocked(5, 'plan')], ['x4', blocked(5, 'transient')]]) {
      await newRequest(store, { tag });
      const w = `w-${tag}`;
      const x = await claimAndRun(store, w);
      await submit(store, x, planOf(), `plan-core-${tag}`);
      out[`verdict_${tag}`] = (await verdict(store, x, v, `verdict-core-${tag}`)).failure_class;
      out[`root_${tag}`] = await d.get('SELECT status, phase, lease_expires_at FROM ai_tickets WHERE id = ?', [x.id]);
    }
    // transient retry enabled: ticket is requeued with a delayed lease
    await d.run('INSERT INTO ai_transient_retry_state(id, enabled, updated_at) VALUES (1, 1, ?)', [Date.now()]);
    await newRequest(store, { tag: 'x5' });
    const t = await claimAndRun(store, 'w-x5');
    await submit(store, t, planOf(), 'plan-core-x5');
    await verdict(store, t, blocked(5, 'transient'), 'verdict-core-x5');
    out.transientRoot = await d.get('SELECT status, phase FROM ai_tickets WHERE id = ?', [t.id]);
    // oversize budget in the plan submission
    await newRequest(store, { tag: 'bb' });
    const big = await claimAndRun(store, 'w-bb');
    out.bigBudget = await store.submitPlan(big.id, { ...big.lease, runId: big.run.id, plan: planOf(), budgetUsed: 99999, idempotencyKey: 'plan-core-bb' });
    out.trace = await store.getRequestTrace(2);
    out.queue = await store.listAdminQueue();
    return out;
  });
});
