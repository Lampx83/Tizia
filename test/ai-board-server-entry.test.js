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
