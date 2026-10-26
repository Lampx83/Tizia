// LF/99 execution_mode: radio 'now'|'queue' trong cá»­a sá»• Ä‘á» nghá»‹.
// 'queue' = KHÃ”NG táº¡o root ticket (khÃ´ng quota GPU worker), request hiá»‡n trong inbox Claude Code.
// NULL = luá»“ng cÅ©; 'now' Ä‘i grilling â†’ hÃ ng Ä‘á»£i worker nhÆ° hiá»‡n táº¡i.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { createRequestsPort } from '../server/ai-board/repositories/requests.js';
import { openBoard } from './support/ai-board-db.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';

async function fixture() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const store = createAsyncAiBoardStore(db.d);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    req.user = { id: 1, username: 'lan', display_name: 'Lan', role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store, db: db.d,
    requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  server.on('close', () => server.closeAllConnections?.());
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (key, body) => fetch(`${base}/api/requests`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'idempotency-key': key },
    body: JSON.stringify(body),
  });
  const get = (path, headers = {}) => fetch(`${base}${path}`, { headers });
  return { db, store, port: createRequestsPort(db.d), post, get, close: () => new Promise((resolve) => server.close(resolve)) };
}

const BODY = { title: 'ThÃªm dark mode cho trang chá»§', detail: 'Ná»n tá»‘i cho buá»•i tá»‘i.' };

test('khÃ´ng cÃ³ execution_mode (luá»“ng cÅ©): cá»™t NULL, root ticket táº¡o bÃ¬nh thÆ°á»ng', async () => {
  const fx = await fixture();
  try {
    const r = await fx.post('em-case-001', BODY);
    assert.equal(r.status, 200);
    assert.equal((await r.json()).root_ticket_id > 0, true);
    const row = await fx.db.d.get('SELECT execution_mode, status FROM requests WHERE id=1');
    assert.equal(row.execution_mode, null);
    assert.equal(row.status, 'pending');
    assert.equal((await fx.db.d.get('SELECT COUNT(*) AS n FROM ai_tickets WHERE kind=\'root\'')).n, 1);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('execution_mode "now": lÆ°u giÃ¡ trá»‹ vÃ  váº«n Ä‘i hÃ ng Ä‘á»£i worker nhÆ° hiá»‡n táº¡i', async () => {
  const fx = await fixture();
  try {
    const r = await fx.post('em-case-001', { ...BODY, execution_mode: 'now' });
    assert.equal(r.status, 200);
    assert.equal((await fx.db.d.get('SELECT execution_mode FROM requests WHERE id=1')).execution_mode, 'now');
    const root = await fx.db.d.get('SELECT id, status, phase FROM ai_tickets WHERE kind=\'root\'');
    assert.equal(root.status, 'queued');
    const ticket = await fx.store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
    assert.ok(ticket && ticket.phase === 'planning');
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('execution_mode "queue": root_ticket_id null, khÃ´ng root ticket, cÃ³ trong inbox vá»›i tráº¡ng thÃ¡i riÃªng', async () => {
  const fx = await fixture();
  try {
    const r = await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' });
    assert.equal(r.status, 200);
    const out = await r.json();
    assert.equal(out.root_ticket_id, null);
    assert.equal((await fx.db.d.get('SELECT COUNT(*) AS n FROM ai_tickets')).n, 0);
    assert.equal((await fx.db.d.get('SELECT execution_mode FROM requests WHERE id=1')).execution_mode, 'queue');

    // Inbox Ä‘á»c-chá»‰ (dá»¯ liá»‡u cá»§a GET /api/ai-board/inbox): kÃ¨m execution_mode Ä‘á»ƒ AI panel phÃ¢n biá»‡t.
    const items = await fx.port.listBoardInbox();
    assert.equal(items.length, 1);
    assert.equal(items[0].execution_mode, 'queue');
    assert.equal(items[0].status, 'pending');
    // KhÃ´ng tiÃªu quota GPU worker: claim khÃ´ng láº¥y Ä‘Æ°á»£c gÃ¬.
    assert.equal(await fx.store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' }), null);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('danh sÃ¡ch ngÆ°á»i gá»­i hiá»ƒn thá»‹ execution_mode; root null nÃªn khÃ´ng cÃ³ "Thá»­ cÃ¡ch khÃ¡c"', async () => {
  const fx = await fixture();
  try {
    await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' });
    const r = await fx.get('/api/requests?domain=pharmacy');
    assert.equal(r.status, 200);
    const item = (await r.json()).items[0];
    assert.equal(item.execution_mode, 'queue');
    assert.equal(item.root_ticket_id, null);
    assert.equal(item.retry, null);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('admin list tháº¥y execution_mode (port adminListRequests)', async () => {
  const fx = await fixture();
  try {
    await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' });
    assert.equal((await fx.port.adminListRequests(50))[0].execution_mode, 'queue');
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('execution_mode khÃ´ng há»£p lá»‡ â†’ 400, khÃ´ng táº¡o gÃ¬ (radio bá»‹ client hack)', async () => {
  const fx = await fixture();
  try {
    const r = await fx.post('em-case-001', { ...BODY, execution_mode: 'asan' });
    assert.equal(r.status, 400);
    assert.equal((await fx.db.d.get('SELECT COUNT(*) AS n FROM requests')).n, 0);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('cap chá»: request queue chÆ°a xÃ³a cÅ©ng tÃ­nh vÃ o pending_roots_per_user', async () => {
  const fx = await fixture();
  try {
    await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' });
    await fx.post('em-case-002', BODY); // root luá»“ng cÅ©
    assert.equal(await fx.store.countPendingRoots(1), 2);
    // HoÃ n tiá»n idempotency retry: cÃ¹ng key khÃ´ng cá»™ng thÃªm.
    assert.equal(await fx.store.countPendingRoots(1, 'em-case-002'), 0);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('há»§y request queue hoáº¡t Ä‘á»™ng nhÆ° luá»“ng cÅ© (khÃ´ng root, ghi status trá»±c tiáº¿p)', async () => {
  const fx = await fixture();
  try {
    await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' });
    const cancelled = await fx.store.cancelRequest(1, { ownerUserId: 1 });
    assert.equal(cancelled.ok, true);
    const row = await fx.db.d.get('SELECT status, execution_mode FROM requests WHERE id=1');
    assert.equal(row.status, 'cancelled');
    // Inbox khÃ´ng tráº£ request Ä‘Ã£ há»§y.
    assert.equal((await fx.port.listBoardInbox()).length, 0);
  } finally { await fx.close(); await fx.db.dispose(); }
});

test('gá»­i láº¡i cÃ¹ng Idempotency-Key vá»›i queue: tráº£ láº¡i Ä‘Ãºng request cÅ©, khÃ´ng nhÃ¢n Ä‘Ã´i', async () => {
  const fx = await fixture();
  try {
    const first = await (await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' })).json();
    const again = await (await fx.post('em-case-001', { ...BODY, execution_mode: 'queue' })).json();
    assert.equal(again.created, false);
    assert.equal(again.request_id, first.request_id);
    assert.equal(again.root_ticket_id, null);
    assert.deepEqual(again.clarify, { needed: false });
    assert.equal((await fx.db.d.get('SELECT COUNT(*) AS n FROM requests')).n, 1);
  } finally { await fx.close(); await fx.db.dispose(); }
});
