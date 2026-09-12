/**
 * ws-safety.js — 3 hành vi lặp ở 7 điểm attach WS. Fake ws = EventEmitter +
 * readyState; logger spy bằng cách gán đè log.warn/log.info (object không freeze).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { guardedSend, onMessageJSON, logSocketLifecycle } from '../server/ws-safety.js';
import { log } from '../server/observability.js';

function fakeWs(readyState = 1) {
  const ws = new EventEmitter();
  ws.readyState = readyState;
  ws.sent = [];
  ws.send = (data) => { ws.sent.push(data); };
  return ws;
}

test('guardedSend: readyState !== 1 → không gọi send, trả false', () => {
  for (const state of [0, 2, 3]) {
    const ws = fakeWs(state);
    assert.equal(guardedSend(ws, { type: 'x' }), false);
    assert.deepEqual(ws.sent, []);
  }
  assert.equal(guardedSend(null, { type: 'x' }), false);
  assert.equal(guardedSend(undefined, { type: 'x' }), false);
});

test('guardedSend: object → JSON.stringify; string đã serialize → gửi nguyên', () => {
  const ws = fakeWs(1);
  assert.equal(guardedSend(ws, { type: 'hi', n: 1 }), true);
  guardedSend(ws, '{"pre":true}');
  assert.deepEqual(ws.sent, ['{"type":"hi","n":1}', '{"pre":true}']);
});

test('guardedSend: send ném lỗi → nuốt, trả false, không throw ra ngoài', () => {
  const ws = fakeWs(1);
  ws.send = () => { throw new Error('EPIPE'); };
  assert.equal(guardedSend(ws, { type: 'x' }), false);
});

test('onMessageJSON: gọi handler với object đã parse; JSON hỏng / không phải object → bỏ qua', () => {
  const ws = fakeWs(1);
  const got = [];
  onMessageJSON(ws, (msg) => got.push(msg));
  ws.emit('message', Buffer.from('{"type":"join","name":"A"}'));
  ws.emit('message', '{not json');
  ws.emit('message', 'null');
  ws.emit('message', '42');
  ws.emit('message', '"str"');
  ws.emit('message', '{"type":"ok"}');
  assert.deepEqual(got, [{ type: 'join', name: 'A' }, { type: 'ok' }]);
});

test('logSocketLifecycle: error → log.warn đúng 1 lần, close → log.info đúng 1 lần, kèm label + meta', () => {
  const origWarn = log.warn, origInfo = log.info;
  const warns = [], infos = [];
  log.warn = (msg, ctx) => warns.push([msg, ctx]);
  log.info = (msg, ctx) => infos.push([msg, ctx]);
  try {
    const ws = fakeWs(1);
    let room = null;
    logSocketLifecycle(ws, 'race', () => ({ playerId: 7, room }));
    room = 'r1';
    const err = new Error('boom');
    ws.emit('error', err);
    ws.emit('close');
    assert.equal(warns.length, 1);
    assert.equal(infos.length, 1);
    assert.equal(warns[0][0], '[ws:race] connection error');
    assert.deepEqual(warns[0][1], { err, playerId: 7, room: 'r1' });
    assert.equal(infos[0][0], '[ws:race] connection closed');
    assert.deepEqual(infos[0][1], { playerId: 7, room: 'r1' });

    // meta dạng object tĩnh cũng được
    const ws2 = fakeWs(1);
    logSocketLifecycle(ws2, 'lab', { playerId: 1 });
    ws2.emit('close');
    assert.deepEqual(infos[1][1], { playerId: 1 });
  } finally {
    log.warn = origWarn; log.info = origInfo;
  }
});
