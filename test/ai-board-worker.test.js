import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore } from '../server/ai-board/store.js';
import { attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';

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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy');
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'worker-request-001', title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
  });
  return { db, store };
}

async function serve(store) {
  const app = express();
  app.use(express.json());
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, leaseMs: 120_000 });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    base: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((resolve, reject) => server.close((e) => e ? reject(e) : resolve())),
  };
}

function post(base, path, body, { key = KEY } = {}) {
  return fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-ai-worker-key': key },
    body: JSON.stringify(body),
  });
}

test('off mode claims nothing; shadow claim is idempotent and exposes only leased snapshot', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const off = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'off' });
    assert.equal(off.status, 200);
    assert.equal((await off.json()).ticket, null);

    const unauthorized = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' }, { key: 'wrong' });
    assert.equal(unauthorized.status, 403);

    const first = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' });
    const a = await first.json();
    assert.equal(first.status, 200);
    assert.equal(a.ticket.id, 1);
    assert.ok(a.ticket.lease_token);

    const duplicate = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' });
    const b = await duplicate.json();
    assert.equal(b.ticket.id, a.ticket.id);
    assert.equal(b.ticket.lease_token, a.ticket.lease_token);

    const snapshot = await post(base, `/api/ai-board/worker/tickets/${a.ticket.id}/snapshot`, {
      worker_id: 'w1', lease_token: a.ticket.lease_token,
    });
    assert.equal(snapshot.status, 200);
    const snap = await snapshot.json();
    assert.equal(snap.request.owner_user_id, 1);
    assert.equal(snap.request.title, 'Thêm bộ thẻ thuốc');
    assert.equal(snap.request.idempotency_key, undefined);
  } finally {
    await close();
    db.close();
  }
});

test('heartbeat, typed run/event and release enforce lease and idempotency', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const claim = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w2', version: 'test', mode: 'shadow' });
    const { ticket } = await claim.json();
    const lease = { worker_id: 'w2', lease_token: ticket.lease_token };

    assert.equal((await post(base, `/api/ai-board/worker/tickets/${ticket.id}/heartbeat`, lease)).status, 200);

    const runBody = { ...lease, trigger: 'shadow_precheck', idempotency_key: 'run-0001' };
    const runA = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, runBody)).json();
    const runB = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, runBody)).json();
    assert.equal(runA.run.id, runB.run.id);

    const badEvent = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, {
      ...lease, run_id: runA.run.id, event_type: 'arbitrary_sql', idempotency_key: 'event-bad1',
    });
    assert.equal(badEvent.status, 400);

    const eventBody = {
      ...lease, run_id: runA.run.id, event_type: 'shadow_precheck_passed',
      public_message: 'Đã kiểm tra yêu cầu.', internal_detail: 'owner/domain/shape ok',
      idempotency_key: 'event-0001',
    };
    const eventA = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, eventBody)).json();
    const eventB = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, eventBody)).json();
    assert.equal(eventA.event.id, eventB.event.id);

    const release = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.equal(release.status, 200);
    const releaseRetry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.equal(releaseRetry.status, 200);
    assert.equal((await releaseRetry.json()).ticket.duplicate, true);
    const row = db.prepare('SELECT status, phase, lease_owner FROM ai_tickets WHERE id = ?').get(ticket.id);
    assert.deepEqual(row, { status: 'queued', phase: 'shadow_checked', lease_owner: null });

    const reclaimer = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'new-worker', version: 'test', mode: 'shadow', intent: 'plan',
    });
    assert.equal((await reclaimer.json()).ticket.id, ticket.id);
    const oldRetry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.deepEqual(await oldRetry.json(), {
      ok: true, ticket: { status: 'queued', phase: 'shadow_checked', duplicate: true },
    });

    const stale = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/heartbeat`, lease);
    assert.equal(stale.status, 409);
    assert.equal((await fetch(`${base}/api/ai-board/worker/sql`)).status, 404);
  } finally {
    await close();
    db.close();
  }
});

test('expired lease fails closed and another worker can reclaim it', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const first = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'old', version: 'test', mode: 'shadow' })).json();
    db.prepare('UPDATE ai_tickets SET lease_expires_at = ? WHERE id = ?').run(Date.now() - 1, first.ticket.id);
    const expired = await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/heartbeat`, {
      worker_id: 'old', lease_token: first.ticket.lease_token,
    });
    assert.equal(expired.status, 409);

    const second = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'new', version: 'test', mode: 'shadow' })).json();
    assert.equal(second.ticket.id, first.ticket.id);
    assert.notEqual(second.ticket.lease_token, first.ticket.lease_token);
  } finally {
    await close();
    db.close();
  }
});

test('shadow-checked roots stop reclaiming the queue and later roots can run', async () => {
  const { db, store } = fixture();
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'worker-request-002', title: 'Thêm mục học mới',
  });
  const { base, close } = await serve(store);
  try {
    const first = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    const firstLease = { worker_id: 'w1', lease_token: first.ticket.lease_token };
    await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/release`, {
      ...firstLease, outcome: 'shadow_ok', idempotency_key: 'release-shadow-001',
    });

    const next = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    assert.equal(next.ticket.id, 2);

    const planned = await (await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'planner', version: 'd0', mode: 'shadow', intent: 'plan',
    })).json();
    assert.equal(planned.ticket.id, 1);

    await post(base, `/api/ai-board/worker/tickets/${next.ticket.id}/release`, {
      worker_id: 'w1', lease_token: next.ticket.lease_token,
      outcome: 'shadow_ok', idempotency_key: 'release-shadow-002',
    });
    const idle = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    assert.equal(idle.ticket, null);
    assert.equal(db.prepare(`SELECT COUNT(*) n FROM ai_tickets WHERE status='queued' AND phase='shadow_checked'`).get().n, 1);
  } finally {
    await close();
    db.close();
  }
});

test('server rejects an unimplemented active worker mode', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const response = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'w1', version: 'test', mode: 'active',
    });
    assert.equal(response.status, 400);
  } finally {
    await close();
    db.close();
  }
});
