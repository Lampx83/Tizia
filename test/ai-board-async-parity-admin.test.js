// Async store == sync store: admin actions, cancel, rollback, budget, replan, PR recording, model-call traces.
import test from 'node:test';
import { assertParity, failure } from './support/ai-board-parity.js';
import {
  blocked, candidate, claimAndRun, newRequest, passing, planOf, protectedPlan, submit, verdict,
} from './support/ai-board-scenarios.js';

const PR = (n = 7, over = {}) => ({
  number: n, url: `https://github.com/acme/tizia/pull/${n}`, branch: candidate().branch, base: 'dev',
  head_sha: candidate().head_sha, base_sha: candidate().base_sha, ...over,
});

test('parity: admin note/reject, requester cancel, legacy request cancel, invalidate plan', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    const a = await newRequest(store, { tag: 'a' });
    out.note = await store.noteRequest(a.request_id, 'đã xem', 9);
    out.reject = await store.rejectRequest(a.request_id, 'không phù hợp', 9);
    out.rejectAgain = await store.rejectRequest(a.request_id, 'không phù hợp', 9);
    out.missing = await store.rejectRequest(4242, 'x', 9);
    const b = await newRequest(store, { tag: 'b' });
    out.foreign = await failure(() => store.cancelRequest(b.request_id, { ownerUserId: 2 }));
    out.cancel = await store.cancelRequest(b.request_id, { ownerUserId: 1 });
    out.cancelAgain = await store.cancelRequest(b.request_id, { ownerUserId: 1 });
    out.closed = await failure(() => store.cancelRequest(a.request_id, { ownerUserId: 1 }));
    // legacy request with no root ticket
    const now = Date.now();
    const legacy = await d.insert(`INSERT INTO requests(domain, title, created_at, updated_at, owner_user_id) VALUES ('pharmacy', 'cũ', ?, ?, 1)`, [now, now]);
    out.legacyHasRoot = await store.hasRoot(legacy);
    out.legacy = await store.cancelRequest(legacy, { ownerUserId: 1 });
    // invalidate: only a request with a plan, and only once
    await newRequest(store, { tag: 'c' });
    const c = await claimAndRun(store, 'w1');
    out.invalidateNoPlan = await store.invalidatePlanForRequest(3, 'x');
    await submit(store, c, planOf(), 'plan-adm-c');
    out.invalidate = await store.invalidatePlanForRequest(3, 'người gửi bổ sung thông tin');
    out.invalidateAgain = await store.invalidatePlanForRequest(3, 'x');
    out.trace = await store.getRequestTrace(3);
    return out;
  });
});

test('parity: rollback (discard / revert / failure), PR recording and model-call traces', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    for (const [tag, outcome] of [['d', 'discarded'], ['r', 'revert_ready'], ['f', 'failed']]) {
      const req = await newRequest(store, { tag });
      const w = `w-${tag}`;
      const c = await claimAndRun(store, w);
      await submit(store, c, planOf(), `plan-adm-${tag}`);
      await verdict(store, c, passing({ repairs: [] }), `verdict-adm-${tag}`);
      out[`pr_${tag}`] = await store.recordPullRequest(c.id, { ...c.lease, runId: c.run.id, pullRequest: PR(10 + req.request_id), idempotencyKey: `pr-adm-${tag}` });
      out[`prAgain_${tag}`] = (await store.recordPullRequest(c.id, { ...c.lease, runId: c.run.id, pullRequest: PR(10 + req.request_id), idempotencyKey: `pr-adm-${tag}-2` })).number;
      out[`prOther_${tag}`] = await failure(() => store.recordPullRequest(c.id, { ...c.lease, runId: c.run.id, pullRequest: PR(99), idempotencyKey: `pr-adm-${tag}-3` }));
      out[`prBad_${tag}`] = await failure(() => store.recordPullRequest(c.id, { ...c.lease, runId: c.run.id, pullRequest: PR(7, { base: 'main' }), idempotencyKey: `pr-adm-${tag}-4` }));
      out[`calls_${tag}`] = await store.recordModelCalls(c.id, { ...c.lease, runId: c.run.id, calls: [
        { call_id: `call-${tag}-1`, gate: 1, provider: 'ollama', model: 'qwen', metrics: { gpu_ms: 1500, wall_ms: 2000, tokens_in: 10, tokens_out: 5 }, budget_units: 3, result: 'ok', notes: [{ kind: 'knows', name: 'x', summary: 'y' }] },
        { call_id: `call-${tag}-2`, gate: 2, provider: 'api', model: 'claude', budget_units: 1.5, result: 'retry' }] });
      out[`callsDup_${tag}`] = await store.recordModelCalls(c.id, { ...c.lease, runId: c.run.id, calls: [{ call_id: `call-${tag}-1`, gate: 1 }] });
      out[`callsBad_${tag}`] = await failure(() => store.recordModelCalls(c.id, { ...c.lease, runId: c.run.id, calls: [{ gate: 1 }] }));
      out[`busy_${tag}`] = await failure(() => store.requestRollback(req.request_id, { adminUserId: 9, confirm: String(req.request_id) }));
      await store.releaseLease(c.id, { ...c.lease, outcome: 'planned', idempotencyKey: `rel-adm-${tag}` });
      out[`confirm_${tag}`] = await failure(() => store.requestRollback(req.request_id, { adminUserId: 9, confirm: '77' }));
      out[`rb_${tag}`] = await store.requestRollback(req.request_id, { adminUserId: 9, confirm: `#${req.request_id}` });
      out[`rbDup_${tag}`] = await store.requestRollback(req.request_id, { adminUserId: 9, confirm: String(req.request_id) });
      const claim = await store.claimNext({ workerId: w, mode: 'active', intent: 'plan' });
      out[`claim_${tag}`] = [claim.phase, claim.trigger];
      const lease = { workerId: w, leaseToken: claim.lease_token };
      out[`snap_${tag}`] = (await store.getLeasedSnapshot(claim.id, w, claim.lease_token)).rollback_candidate.branch;
      const run = await store.createRun(claim.id, { ...lease, trigger: 'rollback', idempotencyKey: `run-adm-${tag}-rb` });
      const body = outcome === 'revert_ready' ? { revert: { ...candidate(5), branch: 'ai-board/2026-09-25-revert-1' } } : { detail: 'không hoàn tác được' };
      out[`submit_${tag}`] = await store.submitRollback(claim.id, { ...lease, runId: run.id, outcome, ...body });
      out[`trace_${tag}`] = await store.getRequestTrace(req.request_id);
      out[`list_${tag}`] = await store.listRequestsForOwner(1, 'pharmacy');
    }
    out.noChange = await (async () => {
      const req = await newRequest(store, { tag: 'n' });
      return failure(() => store.requestRollback(req.request_id, { adminUserId: 9, confirm: String(req.request_id) }));
    })();
    return out;
  });
});

test('parity: budget exhaustion, extension and ceiling, gate reruns, folder-free queue after replan', async () => {
  await assertParity(async (store, d) => {
    const out = {};
    // plan submitted over the per-run budget -> waiting_admin/budget_exhausted -> extend -> replan queued
    const a = await newRequest(store, { tag: 'a' });
    const ca = await claimAndRun(store, 'w1');
    out.exhausted = await store.submitPlan(ca.id, { ...ca.lease, runId: ca.run.id, plan: planOf(), budgetUsed: 9000, idempotencyKey: 'plan-bud-a' });
    out.badAmount = await failure(() => store.extendBudget(ca.id, { amount: 0, reason: 'a perfectly good reason', adminUserId: 9 }));
    out.badReason = await failure(() => store.extendBudget(ca.id, { amount: 10, reason: 'short', adminUserId: 9 }));
    out.extend1 = await store.extendBudget(ca.id, { amount: 100, reason: 'raise the cap once', adminUserId: 9 });
    out.notExhausted = await failure(() => store.extendBudget(ca.id, { amount: 100, reason: 'raise the cap twice', adminUserId: 9 }));
    out.afterExtend = await d.get('SELECT status, phase, budget_limit, auto_rounds FROM ai_tickets WHERE id = ?', [ca.id]);
    // re-claim and exhaust again until the extension ceiling turns it into human work
    for (let i = 0; i < 3; i += 1) {
      const c = await claimAndRun(store, `w-bud-${i}`);
      if (!c) { out[`noclaim_${i}`] = true; break; }
      await store.submitPlan(c.id, { ...c.lease, runId: c.run.id, plan: planOf(), budgetUsed: 9000, idempotencyKey: `plan-bud-${i}` });
      out[`ext_${i}`] = await failure(() => store.extendBudget(c.id, { amount: 100, reason: 'raise the cap again', adminUserId: 9 }));
    }
    out.rootEnd = await d.get('SELECT status, phase, internal_reason, budget_limit FROM ai_tickets WHERE id = ?', [ca.id]);
    // gate rerun: planning stage after a guardrail block
    const b = await newRequest(store, { tag: 'b' });
    const cb = await claimAndRun(store, 'w-b');
    await failure(() => submit(store, cb, planOf({ domain: 'it' }), 'plan-bud-b'));
    await store.releaseLease(cb.id, { ...cb.lease, outcome: 'waiting', internalDetail: JSON.stringify({ gate: 2.5, reason: 'bad plan' }), idempotencyKey: 'rel-bud-b' });
    out.stagePlan = (await store.getRequestTrace(b.request_id)).root.rerun_stage;
    out.badGate = await failure(() => store.rerunGate(b.request_id, 99, 9));
    out.rerunPlan = await store.rerunGate(b.request_id, 2.5, 9);
    out.rerunWrongStage = await failure(() => store.rerunGate(b.request_id, 3, 9));
    // gate rerun: execute stage after an ordinary blocked verdict
    const e = await newRequest(store, { tag: 'e' });
    const ce = await claimAndRun(store, 'w-e');
    await submit(store, ce, planOf(), 'plan-bud-e');
    await verdict(store, ce, blocked(4, 'ordinary'), 'verdict-bud-e');
    out.busyRerun = await failure(() => store.rerunGate(e.request_id, 4, 9));
    await store.releaseLease(ce.id, { ...ce.lease, outcome: 'planned', idempotencyKey: 'rel-bud-e' });
    out.rerunExec = await store.rerunGate(e.request_id, 4, 9);
    // protected plan authorised through the worker resume path
    await newRequest(store, { tag: 'p' });
    const cp = await claimAndRun(store, 'w-p');
    const planned = await submit(store, cp, protectedPlan(), 'plan-bud-p');
    await store.authorizePlan(cp.id, planned.plan_hash, 9);
    await d.run('UPDATE ai_tickets SET lease_expires_at = 1 WHERE id = ?', [cp.id]); // lease lapses while the plan waits
    const again = await claimAndRun(store, 'w-p');
    out.resume = await store.resumeAuthorizedPlan(again.id, { ...again.lease, runId: again.run.id });
    out.resumeAgain = (await store.resumeAuthorizedPlan(again.id, { ...again.lease, runId: again.run.id })).duplicate;
    out.finalQueue = await store.listAdminQueue();
    return out;
  });
});
