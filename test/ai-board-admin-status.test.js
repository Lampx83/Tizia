// Admin status change / requester cancel stay consistent with the root ticket, with or without one.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  return { db, store: createAsyncAiBoardStore(db.d) };
}

const newRequest = async (store, key) => store.createRequestWithRoot({
  ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
  idempotencyKey: key, title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
});

// Legacy request: made before the board existed, so it has no root ticket.
const legacyRequest = async (db) => Number((await db.prepare(`INSERT INTO requests (domain, title, created_at, updated_at, owner_user_id)
  VALUES ('pharmacy', 'Yêu cầu cũ', 1, 1, 1)`).run()).lastInsertRowid);

const reqRow = async (db, id) => ({ ...await db.prepare('SELECT status, admin_note FROM requests WHERE id=?').get(id) });
const rootRow = async (db, id) => ({ ...await db.prepare(`SELECT status, phase, public_note, lease_token FROM ai_tickets WHERE id=?`).get(id) });

test('a status-only admin change keeps the root progress note', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'note-keep-001');
  await db.prepare("UPDATE ai_tickets SET public_note='Đang lập kế hoạch' WHERE id=?").run(rootId);
  assert.equal(await store.noteRequest(id, null, 9), true);
  assert.equal((await rootRow(db, rootId)).public_note, 'Đang lập kế hoạch');
  assert.equal((await reqRow(db, id)).admin_note, 'Đang lập kế hoạch');
  db.close();
});

test('admin reject keeps the admin reason and still revokes the lease', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'reject-note-001');
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'shadow', intent: 'plan' });
  assert.equal(ticket.id, rootId);
  assert.equal(await store.rejectRequest(id, 'Không phù hợp với trường', 9), true);
  assert.deepEqual(await reqRow(db, id), { status: 'rejected', admin_note: 'Không phù hợp với trường' });
  const root = await rootRow(db, rootId);
  assert.deepEqual([root.status, root.phase, root.lease_token], ['cancelled', 'admin_rejected', null]);
  await assert.rejects(async () => store.heartbeat(rootId, 'w1', ticket.lease_token), { code: 'stale_lease' });
  // No reason given: generic text, as before.
  const second = await newRequest(store, 'reject-note-002');
  await store.rejectRequest(second.request_id, null, 9);
  assert.equal((await reqRow(db, second.request_id)).admin_note, 'Quản trị viên đã từ chối yêu cầu.');
  db.close();
});

test('an admin status change never reopens a cancelled or rejected root', async () => {
  const { db, store } = await fixture();
  const cancelled = await newRequest(store, 'terminal-001');
  await store.cancelRequest(cancelled.request_id, { ownerUserId: 1 });
  const rejected = await newRequest(store, 'terminal-002');
  await store.rejectRequest(rejected.request_id, 'no', 9);
  for (const [{ request_id: id, root_ticket_id: rootId }, want] of [[cancelled, 'cancelled'], [rejected, 'rejected']]) {
    for (const reject of [false, true]) {
      assert.equal(await store[reject ? 'rejectRequest' : 'noteRequest'](id, 'sau đó', 9), true);
      assert.equal((await reqRow(db, id)).status, want);
      assert.equal((await rootRow(db, rootId)).status, 'cancelled');
    }
    assert.equal(await store.claimNext({ workerId: 'w1', mode: 'shadow', intent: 'plan' }), null);
  }
  db.close();
});

test('a request without a root ticket: admin status change reports not found and changes nothing', async () => {
  const { db, store } = await fixture();
  const id = await legacyRequest(db);
  assert.equal(await store.noteRequest(id, 'x', 9), false);
  assert.equal(await store.rejectRequest(id, 'x', 9), false);
  assert.deepEqual(await reqRow(db, id), { status: 'pending', admin_note: null });
  db.close();
});

test('cancelling a request without a root ticket closes the request row, nothing else', async () => {
  const { db, store } = await fixture();
  const id = await legacyRequest(db);
  const other = await legacyRequest(db);
  assert.deepEqual(await store.cancelRequest(id, { ownerUserId: 1, now: 5_000 }), { ok: true, request_id: id, status: 'cancelled' });
  assert.equal((await reqRow(db, id)).status, 'cancelled');
  assert.equal((await db.prepare('SELECT updated_at FROM requests WHERE id=?').get(id)).updated_at, 5_000);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets').get()).n, 0);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_events').get()).n, 0);
  assert.equal((await reqRow(db, other)).status, 'pending', 'other requests untouched');
  assert.equal((await store.cancelRequest(id, { ownerUserId: 1 })).duplicate, true);
  await assert.rejects(async () => store.cancelRequest(other, { ownerUserId: 2 }), { status: 404 });
  await db.prepare("UPDATE requests SET status='done' WHERE id=?").run(other);
  await assert.rejects(async () => store.cancelRequest(other, { ownerUserId: 1 }), { code: 'request_closed' });
  db.close();
});


test('hasRoot tells a legacy request (no root ticket) from a board request, so only legacy ones may be reopened by a reply', async () => {
  const { db, store } = await fixture();
  const { request_id: id } = await newRequest(store, 'has-root-001');
  assert.equal(await store.hasRoot(id), true);
  assert.equal(await store.hasRoot(await legacyRequest(db)), false);
  assert.equal(await store.hasRoot(9999), false);
  db.close();
});
