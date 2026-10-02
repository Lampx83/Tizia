// Admin status change / requester cancel stay consistent with the root ticket, with or without one.
import test from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore } from '../server/ai-board/store.js';

function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'Ẩn danh',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy'), (9, 'admin', 'Admin', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  return { db, store: createAiBoardStore(db) };
}

const newRequest = (store, key) => store.createRequestWithRoot({
  ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
  idempotencyKey: key, title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
});

// Legacy request: made before the board existed, so it has no root ticket.
const legacyRequest = (db) => Number(db.prepare(`INSERT INTO requests (domain, title, created_at, updated_at, owner_user_id)
  VALUES ('pharmacy', 'Yêu cầu cũ', 1, 1, 1)`).run().lastInsertRowid);

const reqRow = (db, id) => ({ ...db.prepare('SELECT status, admin_note FROM requests WHERE id=?').get(id) });
const rootRow = (db, id) => ({ ...db.prepare(`SELECT status, phase, public_note, lease_token FROM ai_tickets WHERE id=?`).get(id) });

test('a status-only admin change keeps the root progress note', () => {
  const { db, store } = fixture();
  const { request_id: id, root_ticket_id: rootId } = newRequest(store, 'note-keep-001');
  db.prepare("UPDATE ai_tickets SET public_note='Đang lập kế hoạch' WHERE id=?").run(rootId);
  assert.equal(store.noteRequest(id, null, 9), true);
  assert.equal(rootRow(db, rootId).public_note, 'Đang lập kế hoạch');
  assert.equal(reqRow(db, id).admin_note, 'Đang lập kế hoạch');
  db.close();
});

test('admin reject keeps the admin reason and still revokes the lease', () => {
  const { db, store } = fixture();
  const { request_id: id, root_ticket_id: rootId } = newRequest(store, 'reject-note-001');
  const ticket = store.claimNext({ workerId: 'w1', version: 'test', mode: 'shadow', intent: 'plan' });
  assert.equal(ticket.id, rootId);
  assert.equal(store.rejectRequest(id, 'Không phù hợp với trường', 9), true);
  assert.deepEqual(reqRow(db, id), { status: 'rejected', admin_note: 'Không phù hợp với trường' });
  const root = rootRow(db, rootId);
  assert.deepEqual([root.status, root.phase, root.lease_token], ['cancelled', 'admin_rejected', null]);
  assert.throws(() => store.heartbeat(rootId, 'w1', ticket.lease_token), { code: 'stale_lease' });
  // No reason given: generic text, as before.
  const second = newRequest(store, 'reject-note-002');
  store.rejectRequest(second.request_id, null, 9);
  assert.equal(reqRow(db, second.request_id).admin_note, 'Quản trị viên đã từ chối yêu cầu.');
  db.close();
});

test('an admin status change never reopens a cancelled or rejected root', () => {
  const { db, store } = fixture();
  const cancelled = newRequest(store, 'terminal-001');
  store.cancelRequest(cancelled.request_id, { ownerUserId: 1 });
  const rejected = newRequest(store, 'terminal-002');
  store.rejectRequest(rejected.request_id, 'no', 9);
  for (const [{ request_id: id, root_ticket_id: rootId }, want] of [[cancelled, 'cancelled'], [rejected, 'rejected']]) {
    for (const reject of [false, true]) {
      assert.equal(store[reject ? 'rejectRequest' : 'noteRequest'](id, 'sau đó', 9), true);
      assert.equal(reqRow(db, id).status, want);
      assert.equal(rootRow(db, rootId).status, 'cancelled');
    }
    assert.equal(store.claimNext({ workerId: 'w1', mode: 'shadow', intent: 'plan' }), null);
  }
  db.close();
});

test('a request without a root ticket: admin status change reports not found and changes nothing', () => {
  const { db, store } = fixture();
  const id = legacyRequest(db);
  assert.equal(store.noteRequest(id, 'x', 9), false);
  assert.equal(store.rejectRequest(id, 'x', 9), false);
  assert.deepEqual(reqRow(db, id), { status: 'pending', admin_note: null });
  db.close();
});

test('cancelling a request without a root ticket closes the request row, nothing else', () => {
  const { db, store } = fixture();
  const id = legacyRequest(db);
  const other = legacyRequest(db);
  assert.deepEqual(store.cancelRequest(id, { ownerUserId: 1, now: 5_000 }), { ok: true, request_id: id, status: 'cancelled' });
  assert.equal(reqRow(db, id).status, 'cancelled');
  assert.equal(db.prepare('SELECT updated_at FROM requests WHERE id=?').get(id).updated_at, 5_000);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_tickets').get().n, 0);
  assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_events').get().n, 0);
  assert.equal(reqRow(db, other).status, 'pending', 'other requests untouched');
  assert.equal(store.cancelRequest(id, { ownerUserId: 1 }).duplicate, true);
  assert.throws(() => store.cancelRequest(other, { ownerUserId: 2 }), { status: 404 });
  db.prepare("UPDATE requests SET status='done' WHERE id=?").run(other);
  assert.throws(() => store.cancelRequest(other, { ownerUserId: 1 }), { code: 'request_closed' });
  db.close();
});

