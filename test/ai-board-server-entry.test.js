// LF/109 slice 2: board-only entry serves AI board routes on its own PostgreSQL, authenticated by HMAC headers.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

import { createAiBoardServer } from '../server/aiboard-server.js';
import { signInternalHeaders } from '../server/ai-board/internal-auth.js';
import { openBoard } from './support/ai-board-db.js';

const SECRET = 'aiboard-entry-secret-32chars-000000';

async function serve() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary']] });
  const { app } = await createAiBoardServer({ dbHandle: db, env: { AI_BOARD_INTERNAL_SECRET: SECRET },
    classifyRequest: async () => null, logger: { warn() {} } });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { db, base, close: () => new Promise((resolve) => server.close(resolve)) };
}

const signed = (extra = {}) => signInternalHeaders({ id: 1, role: 'pupil', displayName: 'Lan', domain: 'primary' }, SECRET);

test('board entry exposes health without auth and refuses unsigned board calls', async () => {
  const app = await serve();
  try {
    assert.deepEqual(await (await fetch(`${app.base}/health`)).json(), { ok: true, service: 'aiboard-server' });
    const refused = await fetch(`${app.base}/api/requests?domain=primary`);
    assert.equal(refused.status, 401);
    assert.deepEqual(await refused.json(), { error: 'unauthorized' });
  } finally { await app.close(); app.db.close(); }
});

test('a signed web identity creates and lists a request on the board database only', async () => {
  const app = await serve();
  try {
    const created = await fetch(`${app.base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'idempotency-key': 'lf109-entry-001', ...signed() },
      body: JSON.stringify({ title: 'Sửa trang chủ', detail: 'nút to hơn' }),
    });
    assert.equal(created.status, 200, await created.clone().text());
    const list = await fetch(`${app.base}/api/requests?domain=primary`, { headers: signed() });
    assert.equal(list.status, 200);
    const items = (await list.json()).items;
    assert.equal(items.length, 1);
    assert.equal(items[0].title, 'Sửa trang chủ');
  } finally { await app.close(); app.db.close(); }
});

test('admin shots list is served by the board only to a signed admin', async () => {
  const app = await serve();
  try {
    const shot = { url: '/uploads/requests/2026-10-29/1-abcdef012301.png', name: 'shot', mime: 'image/png', kind: 'screenshot' };
    await app.db.d.run('INSERT INTO requests(id, domain, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [1, 'primary', 'Có ảnh', 1000, 1000]);
    await app.db.d.run('INSERT INTO request_messages(request_id, role, author_name, body, attachments, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [1, 'ai', 'Ban', 'shot', JSON.stringify([shot]), 1000]);
    const admin = signInternalHeaders({ id: 1, role: 'admin', displayName: 'Admin', domain: 'primary' }, SECRET);
    const ok = await fetch(`${app.base}/api/admin/ai-board/shots?page=1`, { headers: admin });
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).groups[0].title, 'Có ảnh');
    assert.equal((await fetch(`${app.base}/api/admin/ai-board/shots`, { headers: signed() })).status, 403);
    assert.equal((await fetch(`${app.base}/api/admin/ai-board/shots`)).status, 401);
  } finally { await app.close(); app.db.close(); }
});

test('the board mirrors the signed user and serves the requester thread and votes', async () => {
  const app = await serve();
  try {
    const headers = signInternalHeaders({ id: 7, role: 'pupil', displayName: 'Minh', domain: 'primary' }, SECRET);
    const created = await fetch(`${app.base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'idempotency-key': 'lf122-entry-001', ...headers },
      body: JSON.stringify({ title: 'Thêm thẻ ghi nhớ', detail: 'Bộ thẻ thuật ngữ' }),
    });
    assert.equal(created.status, 200, await created.clone().text());
    const { request_id: requestId } = await created.json();
    // users(id) mirror: the request owner only exists on the board because the signed identity was mirrored
    assert.deepEqual({ ...await app.db.d.get('SELECT id, display_name, role FROM users WHERE id=7') },
      { id: 7, display_name: 'Minh', role: 'pupil' });
    // the signed name is what the requester list shows, not the numeric id
    assert.equal((await app.db.d.get('SELECT student FROM requests WHERE id=?', [requestId])).student, 'Minh');
    const thread = await fetch(`${app.base}/api/requests/${requestId}/thread`, { headers });
    assert.equal(thread.status, 200);
    const opened = await thread.json();
    assert.equal(opened.messages.length, 1);
    assert.equal(opened.request.id, requestId);
    const posted = await fetch(`${app.base}/api/requests/${requestId}/messages`, {
      method: 'POST', headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify({ body: 'Bổ sung: ưu tiên nhóm kháng sinh.' }),
    });
    assert.equal(posted.status, 200, await posted.clone().text());
    assert.equal((await (await fetch(`${app.base}/api/requests/${requestId}/thread`, { headers })).json()).messages.length, 2);
    const vote = await fetch(`${app.base}/api/requests/${requestId}/vote`, { method: 'POST' });
    assert.equal(vote.status, 200);
    assert.equal((await vote.json()).ok, true);
  } finally { await app.close(); app.db.close(); }
});

test('board entry bootstraps an empty PostgreSQL itself: base tables then additive migrations', async () => {
  // fresh: schema rỗng, giống Postgres riêng của stack board khi container khởi động lần đầu
  const db = await openBoard({ migrate: false });
  const app = await createAiBoardServer({ dbHandle: db, env: { AI_BOARD_INTERNAL_SECRET: SECRET },
    classifyRequest: async () => null, logger: { warn() {} } });
  try {
    const tables = await db.d.all("SELECT table_name AS name FROM information_schema.tables WHERE table_schema=current_schema() AND table_type='BASE TABLE'");
    const names = tables.map((t) => t.name);
    for (const expected of ['users', 'requests', 'request_messages', 'ai_tickets', 'schema_migrations']) {
      assert.ok(names.includes(expected), `${expected} missing after bootstrap`);
    }
  } finally { await app.close(); db.close(); }
});

test('skill upload on the board entry accepts a signed admin and refuses a signed non-admin', async () => {
  const app = await serve();
  try {
    const body = JSON.stringify({ name: 'signed-route-draft', task_types: ['test'],
      original_text: '---\nname: signed-route-draft\ndescription: Kiểm thử\ntask_type: test\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Chạy kiểm thử.\n' });
    const send = (user) => fetch(`${app.base}/api/admin/ai-board/skills`, {
      method: 'POST', headers: { 'content-type': 'application/json', ...signInternalHeaders(user, SECRET) }, body });
    const refused = await send({ id: 1, role: 'pupil', displayName: 'Lan', domain: 'primary' });
    assert.ok([401, 403].includes(refused.status), `pupil got ${refused.status}`);
    const ok = await send({ id: 1, role: 'admin', displayName: 'Admin', domain: 'primary' });
    assert.equal(ok.status, 200, await ok.clone().text());
    assert.equal((await ok.json()).skill.name, 'signed-route-draft');
  } finally { await app.close(); app.db.close(); }
});

test('skill proposals list works on the board database (its tables exist after bootstrap)', async () => {
  const app = await serve();
  try {
    const admin = signInternalHeaders({ id: 1, role: 'admin', displayName: 'Admin', domain: 'primary' }, SECRET);
    const res = await fetch(`${app.base}/api/admin/ai-board/skills/proposals`, { headers: admin });
    assert.equal(res.status, 200, await res.clone().text());
  } finally { await app.close(); app.db.close(); }
});

test('skill rewrite claim on the board entry rejects a missing or wrong worker key', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary']] });
  const { app: expressApp } = await createAiBoardServer({ dbHandle: db, classifyRequest: async () => null, logger: { warn() {} },
    env: { AI_BOARD_INTERNAL_SECRET: SECRET, AI_BOARD_WORKER_KEY: 'worker-key-for-tests-0000000000' } });
  const server = http.createServer(expressApp);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const app = { base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve) => server.close(resolve)) };
  try {
    const missing = await fetch(`${app.base}/api/ai-board/worker/skill-rewrite/claim`, { method: 'POST',
      headers: { 'content-type': 'application/json' }, body: JSON.stringify({ worker_id: 'w1' }) });
    assert.equal(missing.status, 401);
    const wrong = await fetch(`${app.base}/api/ai-board/worker/skill-rewrite/claim`, { method: 'POST',
      headers: { 'content-type': 'application/json', 'x-ai-worker-key': 'x'.repeat(40) }, body: JSON.stringify({ worker_id: 'w1' }) });
    assert.equal(wrong.status, 403);
  } finally {
    await app.close();
  }
});
