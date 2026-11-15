// Split stacks: a request created on the web reaches the worker and the admin trace through one board database.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import express from 'express';

import { createAiBoardServer } from '../server/aiboard-server.js';
import { attachAiBoardProxy } from '../server/ai-board/web-proxy.js';
import { openBoard } from './support/ai-board-db.js';

const SECRET = 'split-requester-secret-32chars-0000';
const WORKER_KEY = 'split-requester-worker-key-0000000000';
const PNG = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32, 1)]);
const users = {
  1: { id: 1, username: 'lan', display_name: 'Lan', role: 'pupil', enrolled_domain: 'pharmacy' },
  2: { id: 2, username: 'new', display_name: 'New', role: 'pupil', enrolled_domain: null },
  9: { id: 9, username: 'admin', display_name: 'Admin', role: 'admin', enrolled_domain: 'pharmacy' },
};

async function listen(app) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }) };
}

async function stacks() {
  const uploads = mkdtempSync(path.join(tmpdir(), 'tizia-split-uploads-'));
  const db = await openBoard();
  const { app: boardApp } = await createAiBoardServer({ dbHandle: db,
    env: { AI_BOARD_INTERNAL_SECRET: SECRET, AI_BOARD_WORKER_KEY: WORKER_KEY, AI_BOARD_UPLOADS_DIR: uploads },
    classifyRequest: async () => null, logger: { warn() {} } });
  const board = await listen(boardApp);
  const web = express();
  web.use((req, _res, next) => {
    const id = req.headers['x-test-user'];
    if (users[id]) req.user = users[id];
    next();
  });
  attachAiBoardProxy(web, { target: board.base, secret: SECRET });
  const site = await listen(web);
  return { db, site, board, uploads, close: async () => { await site.close(); await board.close(); db.close(); rmSync(uploads, { recursive: true, force: true }); } };
}

const json = (base, method, route, { user, body, headers = {} } = {}) => fetch(`${base}${route}`, {
  method,
  headers: { 'content-type': 'application/json', ...(user ? { 'x-test-user': String(user) } : {}), ...headers },
  body: body === undefined ? undefined : JSON.stringify(body),
});

test('a request created on the web is claimed by the worker and shown in the admin trace', async () => {
  const env = await stacks();
  try {
    const created = await json(env.site.base, 'POST', '/api/requests', { user: 1, headers: { 'idempotency-key': 'split-e2e-001' },
      body: { title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung từ form web' } });
    assert.equal(created.status, 200, await created.clone().text());
    const { request_id: requestId, root_ticket_id: rootTicketId } = await created.json();
    assert.ok(requestId && rootTicketId);

    const claim = await fetch(`${env.board.base}/api/ai-board/worker/claim`, { method: 'POST',
      headers: { 'content-type': 'application/json', 'x-ai-worker-key': WORKER_KEY },
      body: JSON.stringify({ worker_id: 'split-e2e-worker', version: 'split', mode: 'shadow', intent: 'plan' }) });
    assert.equal(claim.status, 200, await claim.clone().text());
    assert.equal((await claim.json()).ticket.id, rootTicketId);

    const trace = await json(env.site.base, 'GET', `/api/admin/ai-board/requests/${requestId}/thread`, { user: 9 });
    assert.equal(trace.status, 200);
    assert.equal((await trace.json()).request.id, requestId);

    const traced = await json(env.site.base, 'GET', `/api/admin/ai-board/requests/${requestId}/trace`, { user: 9 });
    assert.equal(traced.status, 200);

    const progress = await json(env.site.base, 'GET', `/api/requests/${requestId}/progress`, { user: 1 });
    assert.equal(progress.status, 200);
  } finally { await env.close(); }
});

test('thread and vote routes proxied from the web hit the same board request row', async () => {
  const env = await stacks();
  try {
    const created = await json(env.site.base, 'POST', '/api/requests', { user: 1, headers: { 'idempotency-key': 'split-thread-001' },
      body: { title: 'Thêm trang ôn tập', detail: 'Nội dung từ form web' } });
    assert.equal(created.status, 200, await created.clone().text());
    const { request_id: requestId } = await created.json();

    const thread = await json(env.site.base, 'GET', `/api/requests/${requestId}/thread`, { user: 1 });
    assert.equal(thread.status, 200);
    assert.equal((await thread.json()).request.id, requestId);

    const voted = await json(env.site.base, 'POST', `/api/requests/${requestId}/vote`, { user: 1 });
    assert.equal(voted.status, 200);
    assert.equal((await voted.json()).ok, true);

    const guest = await json(env.site.base, 'GET', `/api/requests/${requestId}/thread`);
    assert.equal(guest.status, 401);
  } finally { await env.close(); }
});

test('a guest cannot create a request through the split web', async () => {
  const env = await stacks();
  try {
    const guest = await json(env.site.base, 'POST', '/api/requests', { body: { title: 'x', detail: 'y' } });
    assert.equal(guest.status, 401);
    assert.equal((await env.db.d.get('SELECT COUNT(*) AS n FROM requests')).n, 0);
  } finally { await env.close(); }
});

test('an attachment uploaded through the web lands on the board volume and is served back without a session', async () => {
  const env = await stacks();
  try {
    const saved = await fetch(`${env.site.base}/api/requests/attachments`, { method: 'POST', body: PNG,
      headers: { 'content-type': 'image/png', 'x-filename': 'shot.png', 'x-kind': 'screenshot', 'x-test-user': '1' } });
    assert.equal(saved.status, 200, await saved.clone().text());
    const { url } = await saved.json();
    assert.ok(existsSync(path.join(env.uploads, url.replace('/uploads/requests/', ''))), 'file must be on the board volume');

    const file = await fetch(`${env.site.base}${url}`);
    assert.equal(file.status, 200);
    assert.equal(file.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(Buffer.from(await file.arrayBuffer()).equals(PNG), true);

    const guest = await fetch(`${env.site.base}/api/requests/attachments`, { method: 'POST', body: PNG, headers: { 'content-type': 'image/png' } });
    assert.equal(guest.status, 401);

    const unenrolled = await fetch(`${env.site.base}/api/requests/attachments`, { method: 'POST', body: PNG,
      headers: { 'content-type': 'image/png', 'x-test-user': '2' } });
    assert.equal(unenrolled.status, 403);
    assert.equal((await unenrolled.json()).error, 'enrollment_required');
  } finally { await env.close(); }
});

test('human decisions are written on the board, idempotent, and read back as one trail', async () => {
  const env = await stacks();
  try {
    const created = await json(env.site.base, 'POST', '/api/requests', { user: 1, headers: { 'idempotency-key': 'split-dec-001' },
      body: { title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung từ form web' } });
    const { request_id: id } = await created.json();
    const decide = (user, headers = {}) => json(env.site.base, 'POST', `/api/admin/ai-board/requests/${id}/decisions`, { user, headers,
      body: { action: 'approve', status: 'done', reason: '[admin] admin → done', public_note: 'Đã xong' } });

    const first = await decide(9, { 'idempotency-key': 'reply-1' });
    assert.equal(first.status, 200);
    const firstId = (await first.json()).id;
    const again = await decide(9, { 'idempotency-key': 'reply-1' });
    assert.deepEqual(await again.json(), { ok: true, id: firstId, duplicate: true });
    assert.equal(Number((await env.db.d.get('SELECT COUNT(*) AS n FROM ai_decisions WHERE request_id=?', [id])).n), 1);
    const row = await env.db.d.get('SELECT decided_by, actor_user_id FROM ai_decisions WHERE request_id=?', [id]);
    assert.deepEqual({ ...row, actor_user_id: Number(row.actor_user_id) }, { decided_by: 'human', actor_user_id: 9 });
    assert.ok(await env.db.d.get('SELECT 1 AS ok FROM users WHERE id=9'), 'admin mirrored for the audit FK');

    const adminTrail = await (await json(env.site.base, 'GET', `/api/admin/ai-board/requests/${id}/decisions`, { user: 9 })).json();
    assert.equal(adminTrail.decisions.length, 1);
    const recent = await (await json(env.site.base, 'GET', '/api/ai-decisions', { user: 9 })).json();
    assert.equal(Number(recent.decisions[0].request_id), id);
    const owner = await json(env.site.base, 'GET', `/api/requests/${id}/decisions`, { user: 1 });
    assert.equal(owner.status, 200);
    assert.equal((await owner.json()).decisions[0].decided_by, 'human');
    assert.equal((await json(env.site.base, 'GET', `/api/requests/${id}/decisions`, { user: 2 })).status, 403);
  } finally { await env.close(); }
});

test('guests, non-admins and unsigned callers cannot write or read decisions on the board', async () => {
  const env = await stacks();
  try {
    const route = '/api/admin/ai-board/requests/1/decisions';
    const body = { action: 'approve', status: 'done' };
    assert.equal((await json(env.site.base, 'POST', route, { body })).status, 401);
    assert.equal((await json(env.site.base, 'POST', route, { user: 1, body })).status, 403);
    assert.equal((await json(env.site.base, 'GET', '/api/ai-decisions')).status, 401);
    assert.equal((await json(env.board.base, 'POST', route, { body, headers: { 'x-ai-user-id': '9', 'x-ai-user-role': 'admin' } })).status, 401);
    assert.equal((await json(env.board.base, 'GET', '/api/ai-decisions')).status, 401);
    assert.equal(Number((await env.db.d.get('SELECT COUNT(*) AS n FROM ai_decisions')).n), 0);
  } finally { await env.close(); }
});

test('decision for an unknown request or invalid action is rejected', async () => {
  const env = await stacks();
  try {
    const route = (id) => `/api/admin/ai-board/requests/${id}/decisions`;
    assert.equal((await json(env.site.base, 'POST', route(999), { user: 9, body: { action: 'approve' } })).status, 404);
    assert.equal((await json(env.site.base, 'POST', route(999), { user: 9, body: { action: 'nuke' } })).status, 400);
  } finally { await env.close(); }
});
