// Requester progress is owner-scoped and public-only; admin trace shows runner failure and lost worker.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { requesterProgress } from '../server/ai-board/services/requester-progress.js';
import { renderRunnerTrace } from '../public/js/ai-board-trace.js';
import { openBoard } from './support/ai-board-db.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [2, 'minh', 'Minh', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  return { db, store: createAsyncAiBoardStore(db.d) };
}

const newRequest = async (store, key) => store.createRequestWithRoot({
  ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
  idempotencyKey: key, title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
});

const addRun = async (db, rootId, { leaseOwner = null, leaseExpires = null } = {}) => {
  await db.prepare(`INSERT INTO ai_runs (ticket_id, attempt, trigger, gate, worker_id, idempotency_key, evidence_json, created_at, updated_at)
    VALUES (?, 1, 'execute', 5, 'w1', 'run-1', ?, 1, 1)`).run(rootId, JSON.stringify({ secret: 'sandbox output' }));
  const runId = Number((await db.prepare('SELECT id FROM ai_runs WHERE ticket_id=?').get(rootId)).id);
  if (leaseOwner) await db.prepare('UPDATE ai_tickets SET lease_owner=?, lease_expires_at=? WHERE id=?').run(leaseOwner, leaseExpires, rootId);
  return runId;
};

test('requester progress hides admin-only fields and other users see 404', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'progress-001');
  await db.prepare("UPDATE ai_tickets SET public_note='Đang lập kế hoạch', internal_reason='model prompt text' WHERE id=?").run(rootId);
  await addRun(db, rootId);
  const progress = await requesterProgress(store, id, 1);
  // gpu_waiting only carries the retry time: no model name, no worker, no ticket fields.
  assert.deepEqual(Object.keys(progress).sort(),
    ['budget', 'can_continue', 'can_edit', 'eta_ms', 'gpu_waiting', 'live', 'note', 'request_id', 'status', 'step', 'stop_reason']);
  assert.equal(typeof progress.budget.used, 'number');
  assert.equal(progress.budget.limit > 0, true);
  assert.equal(progress.can_continue, false);
  assert.equal(progress.note, 'Đang lập kế hoạch');
  assert.equal(progress.stop_reason, null);
  const text = JSON.stringify(progress);
  for (const leaked of ['model prompt text', 'sandbox output', 'lease_owner', 'worker', 'gate']) {
    assert.equal(text.includes(leaked), false, `leaked ${leaked}`);
  }
  assert.equal(await requesterProgress(store, id, 2), null);
  db.close();
});

test('requester progress shows stop reason only for a stopped request', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'progress-002');
  await db.prepare("UPDATE ai_tickets SET phase='admin_rejected', public_note='Không phù hợp' WHERE id=?").run(rootId);
  const progress = await requesterProgress(store, id, 1);
  assert.equal(progress.stop_reason, 'Không phù hợp');
  assert.equal(progress.live, false);
  assert.equal(progress.eta_ms, null);
  db.close();
});

test('admin trace shows runner failure and lost worker without requeue', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'trace-001');
  const runId = await addRun(db, rootId, { leaseOwner: 'w9', leaseExpires: 1 });
  await db.prepare(`INSERT INTO ai_gate_traces (run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
    VALUES (?, 5, 'blocked', 'Sandbox không chạy được', 'docker exit 137', ?, 1)`).run(runId, JSON.stringify({ code: 'sandbox_oom' }));
  const trace = await store.getRequestTrace(id);
  assert.equal(trace.root.live, false);
  assert.deepEqual(trace.root.lost_worker, { worker_id: 'w9', lease_expired_at: 1 });
  assert.deepEqual(trace.runs[0].runner_failure, { gate: 5, code: 'sandbox_oom', reason: 'Sandbox không chạy được', internal_reason: 'docker exit 137' });
  assert.equal(trace.root.lease_owner, 'w9');
  db.close();
});

test('admin view renders the runner failure code and the sandbox artifacts it kept, requester never sees them', async () => {
  const { db, store } = await fixture();
  const { request_id: id, root_ticket_id: rootId } = await newRequest(store, 'trace-002');
  const runId = await addRun(db, rootId);
  const evidence = { code: 'sandbox_oom', screenshots: [{ path: '/tmp/ai-verify-shots-1/after.png' }], artifacts: ['result', 'shots'] };
  await db.prepare(`INSERT INTO ai_gate_traces (run_id, gate, status, public_reason, internal_reason, evidence_json, created_at)
    VALUES (?, 5, 'blocked', 'Sandbox không chạy được', 'docker exit 137', ?, 1)`).run(runId, JSON.stringify(evidence));
  const trace = await store.getRequestTrace(id);
  const html = renderRunnerTrace(trace);
  assert.match(html, /data-run="\d+"/);
  assert.match(html, /sandbox dừng với mã <code>sandbox_oom<\/code>/);
  assert.match(html, /docker exit 137/);
  for (const name of ['after.png', 'result', 'shots']) assert.match(html, new RegExp(`<code>${name}</code>`));
  // The requester progress payload stays public-only: no runner code, no artifact names.
  const progress = JSON.stringify(await requesterProgress(store, id, 1));
  for (const leaked of ['sandbox_oom', 'after.png', 'docker exit 137']) assert.equal(progress.includes(leaked), false, leaked);
  db.close();
});
