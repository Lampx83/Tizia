/**
 * Round-trip thật qua `ws` client cho 5 endpoint room.js sở hữu (/ws, /ws-race,
 * /ws-sacky, /ws-lab, /ws-orchestrate) — room.js không kéo db.js nên chạy được
 * trong node:test. /ws-presence và /ws-live import db.js → chỉ test thủ công.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import WebSocket from 'ws';
import { attachRoom } from '../server/room.js';

let server, base;

test.before(async () => {
  server = http.createServer((req, res) => { res.statusCode = 404; res.end(); });
  attachRoom(server, '');
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  base = `ws://127.0.0.1:${server.address().port}`;
});
test.after(() => new Promise((r) => server.close(r)));

function connect(path) {
  const ws = new WebSocket(base + path);
  const inbox = [];
  const waiters = [];
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    const w = waiters.shift();
    if (w) w(msg); else inbox.push(msg);
  });
  ws.next = () => new Promise((resolve) => {
    if (inbox.length) return resolve(inbox.shift());
    waiters.push(resolve);
  });
  ws.sendJSON = (o) => ws.send(JSON.stringify(o));
  ws.closed = () => new Promise((r) => ws.once('close', r));
  return new Promise((resolve, reject) => {
    ws.once('open', () => resolve(ws));
    ws.once('error', reject);
  });
}

for (const path of ['/ws', '/ws-sacky', '/ws-lab']) {
  test(`${path}: join → welcome, rác JSON bị bỏ qua, peer thấy join/leave`, async () => {
    const a = await connect(path);
    a.sendJSON({ type: 'join', name: 'An' });
    const welcome = await a.next();
    assert.equal(welcome.type, 'welcome');
    assert.equal(typeof welcome.id, 'number');

    const b = await connect(path);
    b.send('{broken json');   // onMessageJSON phải nuốt, socket vẫn sống
    b.send('null');
    b.sendJSON({ type: 'join', name: 'Binh' });
    const wb = await b.next();
    assert.equal(wb.type, 'welcome');
    assert.ok(wb.snapshot.players.some((p) => p.name === 'An'));

    const joinSeenByA = await a.next();
    assert.equal(joinSeenByA.type, 'join');
    assert.equal(joinSeenByA.player.name, 'Binh');

    b.close();
    const leave = await a.next();
    assert.deepEqual(leave, { type: 'leave', id: wb.id });
    a.close();
    await a.closed();
  });
}

test('/ws-race: 2 người join → matched cả hai, progress broadcast tới đối thủ', async () => {
  const a = await connect('/ws-race');
  a.sendJSON({ type: 'join', name: 'A' });
  assert.equal((await a.next()).type, 'waiting');

  const b = await connect('/ws-race');
  b.sendJSON({ type: 'join', name: 'B' });
  const [ma, mb] = await Promise.all([a.next(), b.next()]);
  assert.equal(ma.type, 'matched'); assert.equal(mb.type, 'matched');
  assert.equal(ma.opponentName, 'B'); assert.equal(mb.opponentName, 'A');

  b.sendJSON({ type: 'progress', score: 10, correct: 1, total: 2 });
  const opp = await a.next();
  assert.equal(opp.type, 'opponent'); assert.equal(opp.score, 10);

  b.close();
  assert.equal((await a.next()).type, 'opponent-left');
  a.close(); await a.closed();
});

test('/ws-orchestrate: student join → teacher nhận student-join; đóng → student-leave', async () => {
  const t = await connect('/ws-orchestrate');
  t.sendJSON({ type: 'join', role: 'teacher', classCode: 'abc', name: 'Co' });
  const snap = await t.next();
  assert.equal(snap.type, 'welcome');
  assert.equal(snap.you.role, 'teacher');

  const s = await connect('/ws-orchestrate');
  s.sendJSON({ type: 'join', role: 'student', classCode: 'abc', name: 'Hs' });
  const seen = await t.next();
  assert.equal(seen.type, 'student-join');
  assert.equal(seen.student.name, 'Hs');

  s.close();
  const left = await t.next();
  assert.equal(left.type, 'student-leave');
  t.close(); await t.closed();
});

test('upgrade tới path lạ bị destroy', async () => {
  await assert.rejects(connect('/ws-nope'));
});
