// Node re-run (LF/78): the server allows only the node saved in the journal checkpoint and resumes from it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard, failure } from './support/ai-board-parity.js';
import { blocked, claimAndRun, newRequest, planOf, submit, verdict } from './support/ai-board-scenarios.js';

const journal = (d, ticketId, runId, node, outcome) => d.insert(`INSERT INTO ai_attempt_journal
    (ticket_id, run_id, node, outcome, state_delta, ledger, created_at)
    VALUES (?, ?, ?, ?, ?, '{}', ?)`,
[ticketId, runId, node, outcome, JSON.stringify({ resumable: true }), 1000 + node.length + outcome.length]);

test('a gate 5 failure reruns from the gate 4 checkpoint and keeps the earlier failure', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const o = {};
    const e = await newRequest(store, { tag: 'n' });
    const c = await claimAndRun(store, 'w-n');
    await submit(store, c, planOf(), 'plan-node-n');
    await verdict(store, c, blocked(5, 'ordinary'), 'verdict-node-n');
    await journal(d, e.root_ticket_id, c.run.id, 'gate_3', 'passed');
    await journal(d, e.root_ticket_id, c.run.id, 'gate_4', 'passed');
    await d.run('UPDATE ai_tickets SET lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL WHERE id=?', [e.root_ticket_id]);
    const root = (await store.getRequestTrace(e.request_id)).root;
    o.root = root;
    o.before = await d.get('SELECT cumulative_budget, budget_limit FROM ai_tickets WHERE id=?', [e.root_ticket_id]);
    o.wrongNode = await failure(() => store.rerunGate(e.request_id, 3, 9, 'gate_3'));
    o.rerun = await store.rerunGate(e.request_id, 5, 9, 'gate_5');
    o.after = await d.get('SELECT cumulative_budget, budget_limit, resume_node, phase FROM ai_tickets WHERE id=?', [e.root_ticket_id]);
    o.event = await d.get("SELECT internal_detail FROM ai_events WHERE ticket_id=? AND event_type='gate_rerun'", [e.root_ticket_id]);
    const claim = await store.claimNext({ workerId: 'w-n', version: 'test', mode: 'active', intent: 'plan' });
    o.next = await store.createRun(claim.id, { workerId: 'w-n', leaseToken: claim.lease_token, trigger: claim.trigger,
      idempotencyKey: 'run-node-n' });
    o.cleared = await d.get('SELECT resume_node FROM ai_tickets WHERE id=?', [e.root_ticket_id]);
    o.failed = await d.get('SELECT COUNT(*) n FROM ai_runs WHERE ticket_id=? AND outcome IS NOT NULL', [e.root_ticket_id]);
    o.total = await d.get('SELECT COUNT(*) n FROM ai_runs WHERE ticket_id=?', [e.root_ticket_id]);
    return o;
  });

  assert.equal(out.root.rerun_stage, 'execute');
  assert.equal(out.root.rerun_node, 'gate_5');
  assert.equal(out.wrongNode.error, 'not_resumable');
  assert.match(out.wrongNode.message, /gate_5/);
  assert.equal(out.rerun.ok, true);
  assert.equal(out.rerun.resumed_from, 'gate_5');
  assert.equal(out.rerun.from_gate, 5);
  assert.equal(out.after.resume_node, 'gate_5');
  assert.deepEqual(out.after.cumulative_budget, out.before.cumulative_budget, 'the ledger is not reset or double counted');
  assert.match(out.event.internal_detail, /gate_5 from checkpoint run/);
  assert.equal(out.total.n, 2, 'the rerun opens a new attempt');
  assert.equal(out.failed.n, 1, 'the earlier failed attempt stays visible');
  assert.equal(out.next.trigger, 'execute');
  assert.equal(out.cleared.resume_node, null, 'the node directive is used once');
});

test('no checkpoint, an exhausted budget, a live lease and a plan change all refuse the node rerun', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const o = {};
    const e = await newRequest(store, { tag: 'x' });
    const c = await claimAndRun(store, 'w-x');
    await submit(store, c, planOf(), 'plan-node-x');
    await verdict(store, c, blocked(5, 'ordinary'), 'verdict-node-x');
    await d.run('UPDATE ai_tickets SET lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL WHERE id=?', [e.root_ticket_id]);
    o.noCheckpoint = (await store.getRequestTrace(e.request_id)).root;
    o.refused = await failure(() => store.rerunGate(e.request_id, 5, 9, 'gate_5'));

    await journal(d, e.root_ticket_id, c.run.id, 'gate_4', 'blocked');
    await d.run("UPDATE ai_tickets SET cumulative_budget = budget_limit WHERE id=?", [e.root_ticket_id]);
    o.exhausted = await failure(() => store.rerunGate(e.request_id, 5, 9));
    await d.run('UPDATE ai_tickets SET lease_owner = ?, lease_expires_at = ? WHERE id=?',
      ['w-x', Date.now() + 60_000, e.root_ticket_id]);
    o.busy = await failure(() => store.rerunGate(e.request_id, 5, 9));
    return o;
  });

  assert.equal(out.noCheckpoint.rerun_node, null);
  assert.equal(out.refused.error, 'not_resumable');
  assert.match(out.refused.message, /checkpoint/);
  assert.equal(out.exhausted.error, 'budget_exhausted');
  assert.equal(out.busy.error, 'not_rerunnable');
});
