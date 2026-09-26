// Feature-folders ticket 02: fair queue across requesters, per-user caps, and per-run caps that scale with the plan.
import test from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS, scaledLimit } from '../server/ai-board/store.js';

function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'x',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'an', 'An', 'student', 'it'), (2, 'binh', 'Bình', 'student', 'it');
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  let n = 0;
  const submit = (owner) => store.createRequestWithRoot({
    ownerUserId: owner, ownerDomain: 'it', ownerDisplayName: `u${owner}`,
    idempotencyKey: `fair-request-${String(++n).padStart(3, '0')}`, title: `Yêu cầu số ${n}`, detail: 'fixture',
  });
  const ownerOf = (ticketId) => db.prepare(`
    SELECT r.owner_user_id AS o FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id WHERE t.id=?`).get(ticketId).o;
  return { db, store, submit, ownerOf };
}

test('a requester with many requests does not block the next person', () => {
  const { store, submit, ownerOf } = fixture();
  for (let i = 0; i < 5; i += 1) submit(1);
  submit(2);
  const order = [1, 2, 3].map((i) => ownerOf(store.claimNext({ workerId: `w${i}`, mode: 'shadow' }).id));
  assert.deepEqual(order, [1, 2, 1]); // B is served second although it sent last
});

test('the requester sees a queue position that follows the claim order', () => {
  const { store, submit } = fixture();
  submit(1); submit(1); submit(2);
  const pos = (owner) => store.listRequestsForOwner(owner, 'it').map((r) => r.queue?.position).sort();
  assert.deepEqual(pos(1), [1, 3]);
  assert.deepEqual(pos(2), [2]);
  assert.ok(store.listRequestsForOwner(2, 'it')[0].queue.eta_s >= 60);
});

test('over the daily GPU cap a new run waits; the cap counts the requester, not the ticket', () => {
  const { db, store, submit } = fixture();
  submit(1);
  const first = store.claimNext({ workerId: 'w1', mode: 'shadow' });
  const run = store.createRun(first.id, { workerId: 'w1', leaseToken: first.lease_token, trigger: 'shadow_precheck',
    idempotencyKey: 'fair-run-001' });
  db.prepare(`INSERT INTO ai_gate_traces(run_id, gate, status, internal_reason, evidence_json, created_at)
    VALUES (?, 1, 'model_call', 'c1', ?, ?)`).run(run.id, JSON.stringify({ budget_units: LIMITS.gpu_s_per_user_day.loose }), Date.now());
  submit(1);
  assert.equal(store.claimNext({ workerId: 'w2', mode: 'shadow' }), null);
  assert.equal(store.listRequestsForOwner(1, 'it').find((r) => r.queue)?.queue.deferred, true);
  submit(2);
  assert.ok(store.claimNext({ workerId: 'w3', mode: 'shadow' })); // someone else is not held back
});

test('pending requests are capped per requester; a replay of the same key is not a new one', () => {
  const { store, submit } = fixture();
  const cap = LIMITS.pending_roots_per_user.value;
  for (let i = 0; i < cap; i += 1) submit(1);
  assert.equal(store.countPendingRoots(1), cap);
  assert.equal(store.countPendingRoots(1, 'fair-request-001'), 0);
  assert.equal(store.countPendingRoots(2), 0);
});

test('per-run caps grow with the plan size and stop at the configured max', () => {
  const { base, per_subtask: step, max } = LIMITS.per_run.units;
  assert.equal(scaledLimit('units', 3), base + 3 * step);
  assert.equal(scaledLimit('units', 999), Math.min(base + LIMITS.max_subtasks_per_run * step, max));
  assert.ok(scaledLimit('units', LIMITS.max_subtasks_per_run) <= max);
  assert.ok(LIMITS.gpu_s_per_worker_hour.value > max, 'one worker hour must fit the biggest run');
});

// Feature-folders ticket 03: a student's clarification chat gets the GPU before background work.
test('while a chat streams, a worker keeps its current ticket but takes no new one', async () => {
  const { beginChat, activeChats } = await import('../server/ai-board/chat-activity.js');
  const { store, submit } = fixture();
  submit(1); submit(2);
  const held = store.claimNext({ workerId: 'w1', mode: 'shadow' });
  const end = beginChat();
  assert.equal(activeChats(), 1);
  assert.equal(store.claimNext({ workerId: 'w2', mode: 'shadow', yieldNew: activeChats() > 0 }), null);
  assert.equal(store.claimNext({ workerId: 'w1', mode: 'shadow', yieldNew: true }).id, held.id); // own lease still returned
  end(); end(); // idempotent
  assert.equal(activeChats(), 0);
  assert.ok(store.claimNext({ workerId: 'w2', mode: 'shadow', yieldNew: activeChats() > 0 }));
});

test('clarification chat defaults to the small classifier model unless its route is set', async () => {
  const { chatModel } = await import('../server/contexts/ai-board-intake/index.js');
  assert.equal(chatModel('ai_board_grill', { AI_BOARD_CLASSIFIER_MODEL: 'small', OLLAMA_MODEL: 'big' }), 'small');
  assert.equal(chatModel('ai_board_grill', { AI_BOARD_CLASSIFIER_MODEL: 'small', TIZIA_MODEL_AI_BOARD_GRILL: 'x' }), 'x');
  assert.equal(chatModel('ai_board_spec', { OLLAMA_MODEL: 'big' }), 'big');
});
