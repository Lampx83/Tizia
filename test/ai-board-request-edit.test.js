// Người gửi dừng rồi sửa yêu cầu và gửi lại: chỉ khi không ai chạy (không lease sống), chỉ chủ yêu cầu,
// và "Tiếp tục" (resume) không dành cho người gửi.
import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import http from 'node:http';

import { createAsyncAiBoardStore } from '../server/ai-board/repositories/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/api/routes.js';
import { editRequestAndReplan } from '../server/ai-board/services/requester-edit.js';
import { WorkerContractError } from '../server/ai-board/repositories/store-contract.js';
import { openBoard } from './support/ai-board-db.js';

async function stoppedRequest({ phase = 'precheck_blocked', live = false } = {}) {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [2, 'minh', 'Minh', 'student', 'pharmacy'],
    [9, 'boss', 'Boss', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  const created = await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'edit-request-001', title: 'Thêm bộ thẻ', detail: 'bản cũ',
  });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  await db.d.run(`UPDATE ai_tickets SET status=?, phase=?, lease_owner=?, lease_expires_at=?,
    public_note='dừng' WHERE id=?`, [live ? 'running' : 'waiting_admin', phase, live ? 'w1' : null,
    live ? Date.now() + 60_000 : null, ticket.id]);
  await db.d.run("UPDATE requests SET clarified_spec='spec cũ' WHERE id=?", [created.request_id]);
  return { db, store, created, ticket };
}

test('the owner edits a stopped request: text replaced, spec dropped, root back to needs_replan', async () => {
  const { db, created, ticket } = await stoppedRequest();

  const out = await editRequestAndReplan(db.d, created.request_id, {
    ownerUserId: 1, title: 'Thêm hai trang ôn tập', detail: 'bản mới: hai trang độc lập', authorName: 'Lan',
  });

  assert.equal(out.status, 'queued');
  assert.equal(out.phase, 'needs_replan');
  const request = await db.d.get('SELECT title, detail, clarified_spec FROM requests WHERE id=?', [created.request_id]);
  assert.deepEqual({ ...request }, { title: 'Thêm hai trang ôn tập', detail: 'bản mới: hai trang độc lập', clarified_spec: null });
  const root = await db.d.get('SELECT status, phase, lease_owner FROM ai_tickets WHERE id=?', [ticket.id]);
  assert.deepEqual({ ...root }, { status: 'queued', phase: 'needs_replan', lease_owner: null });
  const message = await db.d.get('SELECT role, body FROM request_messages WHERE request_id=? ORDER BY id DESC LIMIT 1',
    [created.request_id]);
  assert.deepEqual({ ...message }, { role: 'student', body: 'bản mới: hai trang độc lập' });
});

test('only the owner edits, and only while nothing is running', async () => {
  const { db, created } = await stoppedRequest();
  await assert.rejects(
    () => editRequestAndReplan(db.d, created.request_id, { ownerUserId: 2, title: 'Đổi tiêu đề', detail: 'x' }),
    (error) => error instanceof WorkerContractError && error.code === 'not_owner');

  const live = await stoppedRequest({ phase: 'executing', live: true });
  await assert.rejects(
    () => editRequestAndReplan(live.db.d, live.created.request_id, { ownerUserId: 1, title: 'Đổi tiêu đề', detail: 'x' }),
    (error) => error instanceof WorkerContractError && error.code === 'not_stopped');
});

test('route: the owner posts an edit and the request is queued for a new plan', async () => {
  const { db, store, created } = await stoppedRequest();
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 1, role: 'student', display_name: 'Lan' }; next(); });
  const pass = (_req, _res, next) => next();
  attachAiBoardRequestRoutes(app, {
    store, requireAuth: pass, requireEnrolled: pass, requireAdmin: pass, requireStrictCsrf: pass,
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const res = await fetch(`${base}/api/requests/${created.request_id}/edit`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'Thêm hai trang ôn tập', detail: 'hai trang độc lập, dữ liệu tĩnh' }),
    });
    assert.equal(res.status, 200, await res.clone().text());
    const body = await res.json();
    assert.equal(body.status, 'queued');
    assert.equal(body.phase, 'needs_replan');
    const progress = await fetch(`${base}/api/requests/${created.request_id}/progress`);
    assert.equal((await progress.json()).can_edit, false);  // đã quay lại hàng đợi
  } finally {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  }
});
