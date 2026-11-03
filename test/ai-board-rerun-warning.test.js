// Admin rerun warning: the last two blocked plan attempts stopping the same way under the same pins (LF/143).
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard } from './support/ai-board-parity.js';
import { newRequest } from './support/ai-board-scenarios.js';

const PINS = { base: 'a'.repeat(40), config: 'c'.repeat(64), graph: 'g'.repeat(64) };
const detail = (over = {}) => JSON.stringify({
  gate: 2.5, reason: 'plan_ungrounded', signals: [],
  objection_history: [{ gate: 2.5, reason_class: 'plan_ungrounded', paths: ['public/a.html'] }],
  pins: PINS, ...over,
});

async function blockedTwice(d, ticket, first, second) {
  const insert = (payload, index) => d.insert(`INSERT INTO ai_events
      (ticket_id, event_type, actor_type, internal_detail, idempotency_key, created_at)
      VALUES (?, 'plan_blocked', 'worker', ?, ?, ?)`, [ticket, payload, `plan-blocked-${ticket}-${index}`, 1000 + index]);
  await insert(first, 1);
  if (second !== null) await insert(second, 2);
  await d.run("UPDATE ai_tickets SET status='blocked', phase='plan_blocked' WHERE id=?", [ticket]);
}

test('two blocked attempts with the same signature and pins warn before the rerun', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const a = await newRequest(store, { tag: 'a' });
    await blockedTwice(d, a.root_ticket_id, detail(), detail());
    return (await store.getRequestTrace(a.request_id)).root;
  });

  assert.equal(out.rerun_allowed, true);
  assert.equal(out.rerun_stage, 'plan');
  assert.match(out.rerun_warning, /same reason "plan_ungrounded"/);
  assert.match(out.rerun_warning, /public\/a\.html/);
});

test('changed pins, a changed signature, one attempt or no pins recorded never warn', async () => {
  const { result: out } = await runBoard(async (store, d) => {
    const cases = {};
    const changedPins = await newRequest(store, { tag: 'p' });
    await blockedTwice(d, changedPins.root_ticket_id, detail(), detail({ pins: { ...PINS, base: 'b'.repeat(40) } }));
    cases.changedPins = (await store.getRequestTrace(changedPins.request_id)).root;

    const changedReason = await newRequest(store, { tag: 'r' });
    await blockedTwice(d, changedReason.root_ticket_id, detail(), detail({
      objection_history: [{ gate: 2.5, reason_class: 'plan_ungrounded', paths: ['public/b.html'] }],
    }));
    cases.changedReason = (await store.getRequestTrace(changedReason.request_id)).root;

    const single = await newRequest(store, { tag: 's' });
    await blockedTwice(d, single.root_ticket_id, detail(), null);
    cases.single = (await store.getRequestTrace(single.request_id)).root;

    const noPins = await newRequest(store, { tag: 'n' });
    const legacy = detail();
    await blockedTwice(d, noPins.root_ticket_id, legacy.replace(`,"pins":${JSON.stringify(PINS)}`, ''), legacy.replace(`,"pins":${JSON.stringify(PINS)}`, ''));
    cases.noPins = (await store.getRequestTrace(noPins.request_id)).root;
    return cases;
  });

  for (const [name, root] of Object.entries(out)) {
    assert.equal(root.rerun_allowed, true, name);
    assert.equal(root.rerun_warning, null, name);
  }
});
