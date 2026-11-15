// Split stack: a board decision write that fails after the web applied the status is retried durably, exactly once on the board.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createBoardSchema } from './support/ai-board-db.js';
import { createDecisionOutbox } from '../server/contexts/admin/board-decision-outbox.js';

const db = await createBoardSchema({ migrate: false });
const actor = { id: 9, role: 'admin', username: 'admin' };
const payload = { action: 'approve', status: 'done', reason: '[admin] admin → done', public_note: 'ok' };
let clock = 1_000_000;
const quiet = { warn() {}, error() {} };

// Board stand-in: dedups on (request_id, idempotency_key) like human-decisions.js.
function fakeBoard() {
  const rows = new Map();
  const board = { up: false, calls: 0, rows,
    async send(_actor, requestId, body) {
      board.calls++;
      if (!board.up) throw new Error('ECONNREFUSED');
      rows.set(`${requestId}:${body.idempotency_key}`, body);
      return { status: 200 };
    } };
  return board;
}
const outbox = (board, extra = {}) => createDecisionOutbox({ db, send: board.send, now: () => clock, baseDelayMs: 1000, maxAttempts: 4, log: quiet, ...extra });

test('failing board then recovery ends with exactly one decision', async () => {
  const board = fakeBoard();
  const box = outbox(board);
  await box.enqueue({ key: 'reply-a-0001', requestId: 7, actor, payload, error: 'ECONNREFUSED' });
  await box.enqueue({ key: 'reply-a-0001', requestId: 7, actor, payload, error: 'duplicate enqueue' });
  assert.deepEqual(await box.drain(), { sent: 0, retried: 0, dead: 0 }, 'not due yet: backoff respected');
  clock += 1000;
  assert.deepEqual(await box.drain(), { sent: 0, retried: 1, dead: 0 });
  assert.equal(board.rows.size, 0);
  clock += 2000;
  board.up = true;
  assert.deepEqual(await box.drain(), { sent: 1, retried: 0, dead: 0 });
  clock += 10_000_000;
  assert.deepEqual(await box.drain(), { sent: 0, retried: 0, dead: 0 });
  assert.equal(board.rows.size, 1);
  assert.equal(board.rows.get('7:reply-a-0001').idempotency_key, 'reply-a-0001');
  const row = await db.d.get(`SELECT status FROM board_decision_outbox WHERE idempotency_key=?`, ['reply-a-0001']);
  assert.equal(row.status, 'done');
});

test('non-200 board answer counts as failure; gives up after maxAttempts with an alert', async () => {
  const errors = [];
  const board = { async send() { return { status: 409 }; } };
  const box = outbox(board, { log: { warn() {}, error: (m) => errors.push(m) } });
  await box.enqueue({ key: 'reply-b-0001', requestId: 8, actor, payload });
  const seen = [];
  for (let i = 0; i < 6; i++) { clock += 10_000; seen.push(await box.drain()); }
  assert.equal(seen.reduce((n, o) => n + o.dead, 0), 1);
  assert.equal(seen.reduce((n, o) => n + o.retried, 0), 2);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /GAVE UP request=8 key=reply-b-0001/);
  assert.equal((await db.d.get(`SELECT status, attempts FROM board_decision_outbox WHERE idempotency_key=?`, ['reply-b-0001'])).status, 'dead');
});

test.after(async () => { await db.dispose(); });
