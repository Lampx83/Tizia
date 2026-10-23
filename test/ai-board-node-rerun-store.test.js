// Node re-run on the real store: trace says when allowed, live lease refused, failed attempt and ledger kept.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard, failure } from './support/ai-board-parity.js';
import { blocked, claimAndRun, newRequest, planOf, submit, verdict } from './support/ai-board-scenarios.js';

test('node rerun on a blocked execute stage: refused while leased, allowed after release, failure stays', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const out = {};
    const e = await newRequest(store, { tag: 'node' });
    const ce = await claimAndRun(store, 'w-node');
    await submit(store, ce, planOf(), 'plan-node');
    await verdict(store, ce, blocked(4, 'ordinary'), 'verdict-node');
    out.leasedTrace = (await store.getRequestTrace(e.request_id)).root;
    out.leased = await failure(() => store.rerunGate(e.request_id, 4, 9));
    await store.releaseLease(ce.id, { ...ce.lease, outcome: 'planned', idempotencyKey: 'rel-node' });
    out.freeTrace = (await store.getRequestTrace(e.request_id)).root;
    out.rerun = await store.rerunGate(e.request_id, 4, 9);
    out.events = await d.all(`SELECT event_type FROM ai_events WHERE ticket_id = ?`, [ce.id]);
    return out;
  });
  assert.equal(out.leasedTrace.rerun_allowed, false);
  assert.match(out.leasedTrace.rerun_reason, /running this request now/);
  assert.equal(out.leased.error, 'not_rerunnable');
  assert.equal(out.freeTrace.rerun_allowed, true);
  assert.equal(out.freeTrace.rerun_stage, 'execute');
  assert.equal(out.rerun.from_gate, 3);
  assert.ok(out.events.some(e => e.event_type === 'gate_rerun'));
});
