// Fair queue across requesters, per-user caps, and per-run caps that scale with the plan.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS, scaledLimit } from '../server/ai-board/store.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'an', 'An', 'student', 'it'],
    [2, 'binh', 'Bình', 'student', 'it'],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  let n = 0;
  const submit = async (owner) => store.createRequestWithRoot({
    ownerUserId: owner, ownerDomain: 'it', ownerDisplayName: `u${owner}`,
    idempotencyKey: `fair-request-${String(++n).padStart(3, '0')}`, title: `Yêu cầu số ${n}`, detail: 'fixture',
  });
  const ownerOf = async (ticketId) => (await db.prepare(`
    SELECT r.owner_user_id AS o FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id WHERE t.id=?`).get(ticketId)).o;
  return { db, store, submit, ownerOf };
}

test('a requester with many requests does not block the next person', async () => {
  const { store, submit, ownerOf } = await fixture();
  for (let i = 0; i < 5; i += 1) await submit(1);
  await submit(2);
  const order = [];
  for (const i of [1, 2, 3]) order.push(await ownerOf((await store.claimNext({ workerId: `w${i}`, mode: 'shadow' })).id));
  assert.deepEqual(order, [1, 2, 1]); // B is served second although it sent last
});

test('the requester sees a queue position that follows the claim order', async () => {
  const { store, submit } = await fixture();
  await submit(1); await submit(1); await submit(2);
  const pos = async (owner) => (await store.listRequestsForOwner(owner, 'it')).map((r) => r.queue?.position).sort();
  assert.deepEqual(await pos(1), [1, 3]);
  assert.deepEqual(await pos(2), [2]);
  assert.equal((await store.listRequestsForOwner(2, 'it'))[0].queue.eta_s, null);
});

test('queue ETA is absent without an active fresh worker and returns while that worker is busy', async () => {
  const { db, store, submit } = await fixture();
  await submit(1); await submit(2);
  assert.equal((await store.listRequestsForOwner(2, 'it'))[0].queue.worker_ready, false);
  await store.claimNext({ workerId: 'eta-worker', mode: 'active', intent: 'plan' });
  assert.equal((await store.listRequestsForOwner(2, 'it'))[0].queue.worker_ready, true);
  assert.ok((await store.listRequestsForOwner(2, 'it'))[0].queue.eta_s >= 60);
  await db.prepare('UPDATE ai_workers SET last_seen_at=?').run(Date.now() - 121_000);
  assert.equal((await store.listRequestsForOwner(2, 'it'))[0].queue.eta_s, null);
});

test('Gate 1 blocked requests have consistent saved/requester/admin waiting state', async () => {
  const { db, store, submit } = await fixture();
  const created = await submit(1);
  const ticket = await store.claimNext({ workerId: 'blocked-worker', mode: 'active', intent: 'plan' });
  await store.releaseLease(ticket.id, { workerId: 'blocked-worker', leaseToken: ticket.lease_token,
    outcome: 'waiting', idempotencyKey: 'status-blocked-001' });
  const item = (await store.listRequestsForOwner(1, 'it'))[0];
  assert.equal(item.status, 'pending');
  assert.match(item.status_label, /quản trị viên/);
  assert.equal((await store.getRequestTrace(created.request_id)).root.phase, item.phase);
  assert.equal((await db.prepare('SELECT status FROM requests WHERE id=?').get(created.request_id)).status, item.status);
});

test('over the daily GPU cap a new run waits; the cap counts the requester, not the ticket', async () => {
  const { db, store, submit } = await fixture();
  await submit(1);
  const first = await store.claimNext({ workerId: 'w1', mode: 'shadow' });
  const run = await store.createRun(first.id, { workerId: 'w1', leaseToken: first.lease_token, trigger: 'shadow_precheck',
    idempotencyKey: 'fair-run-001' });
  await db.prepare(`INSERT INTO ai_gate_traces(run_id, gate, status, internal_reason, evidence_json, created_at)
    VALUES (?, 1, 'model_call', 'c1', ?, ?)`).run(run.id, JSON.stringify({ budget_units: LIMITS.gpu_s_per_user_day.loose }), Date.now());
  await submit(1);
  assert.equal(await store.claimNext({ workerId: 'w2', mode: 'shadow' }), null);
  assert.equal((await store.listRequestsForOwner(1, 'it')).find((r) => r.queue)?.queue.deferred, true);
  await submit(2);
  assert.ok(await store.claimNext({ workerId: 'w3', mode: 'shadow' })); // someone else is not held back
});

test('pending requests are capped per requester; a replay of the same key is not a new one', async () => {
  const { store, submit } = await fixture();
  const cap = LIMITS.pending_roots_per_user.value;
  for (let i = 0; i < cap; i += 1) await submit(1);
  assert.equal(await store.countPendingRoots(1), cap);
  assert.equal(await store.countPendingRoots(1, 'fair-request-001'), 0);
  assert.equal(await store.countPendingRoots(2), 0);
});

test('per-run caps grow with the plan size and stop at the configured max', () => {
  const { base, per_subtask: step, max } = LIMITS.per_run.units;
  assert.equal(scaledLimit('units', 3), base + 3 * step);
  assert.equal(scaledLimit('units', 999), Math.min(base + LIMITS.max_subtasks_per_run * step, max));
  assert.ok(scaledLimit('units', LIMITS.max_subtasks_per_run) <= max);
  assert.ok(LIMITS.gpu_s_per_worker_hour.value > max, 'one worker hour must fit the biggest run');
});

// A student's clarification chat gets the GPU before background work.
test('while a chat streams, a worker keeps its current ticket but takes no new one', async () => {
  const { beginChat, activeChats } = await import('../server/ai-board/chat-activity.js');
  const { store, submit } = await fixture();
  await submit(1); await submit(2);
  const held = await store.claimNext({ workerId: 'w1', mode: 'shadow' });
  const end = beginChat();
  assert.equal(activeChats(), 1);
  assert.equal(await store.claimNext({ workerId: 'w2', mode: 'shadow', yieldNew: activeChats() > 0 }), null);
  assert.equal((await store.claimNext({ workerId: 'w1', mode: 'shadow', yieldNew: true })).id, held.id); // own lease still returned
  end(); end(); // idempotent
  assert.equal(activeChats(), 0);
  assert.ok(await store.claimNext({ workerId: 'w2', mode: 'shadow', yieldNew: activeChats() > 0 }));
});

test('clarification chat defaults to the small classifier model unless its route is set', async () => {
  const { chatModel } = await import('../server/contexts/ai-board-intake/index.js');
  assert.equal(chatModel('ai_board_grill', { AI_BOARD_CLASSIFIER_MODEL: 'small', OLLAMA_MODEL: 'big' }), 'small');
  assert.equal(chatModel('ai_board_grill', { AI_BOARD_CLASSIFIER_MODEL: 'small', TIZIA_MODEL_AI_BOARD_GRILL: 'x' }), 'x');
  assert.equal(chatModel('ai_board_spec', { OLLAMA_MODEL: 'big' }), 'big');
});
