// requests-port: the shared requests/request_messages operations behave the same on SQLite and PostgreSQL.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequestsPort } from '../server/ai-board/requests-port.js';
import { backends } from './support/ai-board-db.js';
import { seedBase } from './support/ai-board-parity.js';

async function scenario(d) {
  const realNow = Date.now;
  let tick = 1_800_000_100_000;
  Date.now = () => (tick += 3); // deterministic clock: both backends see the same timestamps
  try { return await run(d); } finally { Date.now = realNow; }
}

async function run(d) {
  await seedBase(d);
  const port = createRequestsPort(d);
  const out = {};
  const T = 1_800_000_000_000;
  const add = (over = {}) => d.insert(`INSERT INTO requests(domain, type, title, detail, student, status, votes, created_at, updated_at, owner_user_id, owner_state)
    VALUES (?, 'game', ?, 'chi tiết', 'Lan', ?, 1, ?, ?, 1, 'verified')`, [over.domain || 'pharmacy', over.title || 'Yêu cầu', over.status || 'pending', over.t || T, over.t || T]);
  const a = await add({ title: 'Một', t: T + 1 });
  const b = await add({ title: 'Hai', status: 'done', t: T + 2 });
  await add({ title: 'Ba', domain: 'it', status: 'reviewing', t: T + 3 });
  out.vote = [await port.voteRequest(a), await port.voteRequest(999)];
  out.status = [await port.setRequestStatus(a, 'reviewing', 'đã xem'), await port.setRequestStatus(a, 'weird', 'x'), await port.setRequestStatus(999, 'done', null)];
  out.byId = [await port.getRequestById(a), await port.getRequestById(999)];
  const m1 = await port.addRequestMessage({ request_id: a, role: 'student', author_name: 'Lan', body: 'xin chào', attachments: [{ url: '/u/x.png', name: 'x', mime: 'image/png', size: 5, kind: 'screenshot' }, { url: '' }] });
  await port.addRequestMessage({ request_id: a, role: 'bogus-role', body: 'hệ thống' });
  out.msgIdIsNumber = typeof m1.id === 'number';
  out.messages = (await port.listRequestMessages(a)).map(({ id: _id, created_at: _c, ...m }) => m);
  out.reopen = [await port.reopenRequestIfClosed(b), await port.reopenRequestIfClosed(b), await port.reopenRequestIfClosed(a)];
  out.inbox = (await port.listBoardInbox(10)).map(({ created_at: _c, updated_at: _u, thread, ...r }) => ({ ...r, thread: thread.map((t) => t.body) }));
  out.adminList = (await port.adminListRequests(10)).map((r) => [r.id, r.status, r.requester_role]);
  out.reply = [(await port.getRequestForReply(a)).status, await port.getRequestForReply(999)];
  out.counts = await port.requestCounts();
  out.created = [await port.requestsCreatedBetween(T + 2), await port.requestsCreatedBetween(T + 1, T + 3)];
  out.recent = (await port.recentRequests(2)).map((r) => r.title);
  // a request with an AI board ticket keeps its history
  await d.run(`INSERT INTO ai_tickets(source_request_id, sequence, kind, title, status, phase, created_at, updated_at) VALUES (?, 0, 'root', 'x', 'queued', 'intake', ?, ?)`, [a, T, T]);
  out.delete = [await port.deleteRequestUnlessBoardHistory(a), await port.deleteRequestUnlessBoardHistory(b), await port.deleteRequestUnlessBoardHistory(b)];
  return out;
}

test('requests port: same results on every backend', async () => {
  const [sqlite] = backends;
  const ref = await sqlite.open();
  let expected;
  try { expected = JSON.parse(JSON.stringify(await scenario(ref))); } finally { await ref.dispose(); }
  assert.deepEqual(expected.vote, [true, false]);
  assert.deepEqual(expected.delete, ['has_board_history', 'deleted', 'not_found']);
  assert.equal(expected.messages[0].attachments.length, 1);
  for (const backend of backends.slice(1)) {
    const d = await backend.open();
    try {
      assert.deepEqual(JSON.parse(JSON.stringify(await scenario(d))), expected, backend.name);
    } finally { await d.dispose(); }
  }
});
