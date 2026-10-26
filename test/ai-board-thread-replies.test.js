// Fixed chat replies for request creation/verdict (LF/113): mode-specific acknowledgement, dedupe, route payload.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { acknowledgementNote } from '../server/contexts/ai-agent/ack-text.js';
import { verdictThreadMessage, appendVerdictMessage } from '../server/ai-board/services/verdict-chat.js';
import { checkGibberish } from '../server/ai-board/gibberish.js';
import { LIMITS } from '../server/ai-board/store.js';

test('keyboard-mash text is refused, real short messages pass', () => {
  for (const bad of ['dfafdsfa', 'asdfasdf', 'aaaaaaaa', 'sdfgsdfg']) assert.ok(checkGibberish(bad), bad);
  for (const ok of ['thanks', 'frontend', 'to hơn', 'giúp em sửa nút', 'dfa fds fa', 'ok']) assert.equal(checkGibberish(ok), null, ok);
});

test('acknowledgement text follows the execution mode: local processes now, cloud queues', () => {
  assert.match(acknowledgementNote('now'), /model nội bộ/);
  assert.match(acknowledgementNote('queue'), /cloud model/);
  assert.match(acknowledgementNote('queue'), /hàng đợi/);
  assert.match(acknowledgementNote(null), /model nội bộ/, 'default/legacy is local');
});

test('every finished request gets one friendly fixed message, unknown kinds stay silent', () => {
  for (const [kind, pattern] of [['draft', /bản xem trước/], ['retry', /Thử cách khác/],
    ['handoff', /quản trị viên/], ['admin', /quản trị viên/]]) {
    assert.match(verdictThreadMessage(kind, 'Sửa trang'), pattern, kind);
  }
  assert.equal(verdictThreadMessage('unknown', 'x'), null);
});

test('appendVerdictMessage skips a repeated result already at the end of the history', async () => {
  const added = [];
  const listMessages = async () => [{ role: 'ai', body: verdictThreadMessage('draft', 'Sửa trang') }];
  const addMessage = async (input) => { added.push(input); return input; };
  assert.equal(await appendVerdictMessage({ requestId: 1, kind: 'draft', title: 'Sửa trang', listMessages, addMessage }), null);
  assert.equal(added.length, 0);
  const fresh = await appendVerdictMessage({ requestId: 1, kind: 'retry', title: 'Sửa trang',
    listMessages: async () => [{ role: 'student', body: 'hi' }], addMessage });
  assert.match(fresh.body, /Thử cách khác/);
  assert.equal(added.length, 1);
});

async function fixtureDb() {
  return openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary']] });
}

async function serve(db, created) {
  const store = createAsyncAiBoardStore(db.d);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = { id: 1, username: 'lan', display_name: 'Lan', role: 'pupil', enrolled_domain: 'primary' };
    next();
  });
  const pass = (_req, _res, next) => next();
  const clarities = [{ needed: true, mode: 'ask' }, { needed: true, mode: 'ask' }];
  attachAiBoardRequestRoutes(app, {
    store, db: db.d, requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
    classifyRequest: async () => ({ model: 'c', clarity: clarities.shift() ?? { needed: true, mode: 'ask' }, danger: null }),
    onCreated: async (notice) => created.push(notice),
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body, headers = {}) => fetch(base + path, {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body || {}),
  });
  return { post, close: () => new Promise((resolve) => server.close(resolve)) };
}

test('global request rate limit stops bursts for every execution mode', async () => {
  const db = await fixtureDb();
  const created = [];
  const app = await serve(db, created);
  const cap = LIMITS.global_rate.requests_per_minute;
  LIMITS.global_rate.requests_per_minute = 1;
  try {
    const first = await app.post('/api/requests', { title: 'Sửa trang chủ', detail: 'nút to hơn', execution_mode: 'now' },
      { 'idempotency-key': 'thread-rate-001' });
    assert.equal(first.status, 200);
    const second = await app.post('/api/requests', { title: 'Sửa trang phụ', detail: 'chữ nhỏ hơn', execution_mode: 'queue' },
      { 'idempotency-key': 'thread-rate-002' });
    assert.equal(second.status, 429);
    assert.match((await second.json()).message, /một phút/);
  } finally {
    LIMITS.global_rate.requests_per_minute = cap;
    await app.close();
  }
});

test('request routes forward execution mode and clarify need to the acknowledgement hook', async () => {
  const db = await fixtureDb();
  const created = [];
  const app = await serve(db, created);
  try {
    await app.post('/api/requests', { title: 'Sửa trang chủ', detail: 'nút to hơn', execution_mode: 'queue' },
      { 'idempotency-key': 'thread-ack-queue-001' });
    assert.equal(created.length, 1);
    assert.equal(created[0].executionMode, 'queue');
    assert.equal(created[0].clarifyNeeded, false, 'cloud queue never grills');

    const vague = await app.post('/api/requests', { title: 'Sửa cái trang', detail: 'làm cho đẹp hơn' },
      { 'idempotency-key': 'thread-ack-clarify-001', 'x-ai-board-features': 'clarify' });
    assert.equal(vague.status, 200);
    assert.equal(created.length, 2);
    assert.equal(created[1].clarifyNeeded, true, 'grilling replaces the fixed acknowledgement');
    assert.equal(created[1].executionMode, null, 'legacy client sends no execution_mode');
  } finally {
    await app.close();
  }
});
