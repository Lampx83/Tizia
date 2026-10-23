import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { createToolCheckpointService } from '../server/ai-board/services/tool-checkpoint.js';

const PIN = 'plan-7:base-abc';
const lease = { worker_id: 'worker-a', lease_token: 'lease-a' };

async function fixture() {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const db = appDb.d, store = createAsyncAiBoardStore(db);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'graph-cp', title: 'Graph cp', detail: 'graph checkpoint' });
  const id = request.root_ticket_id;
  await db.run("UPDATE ai_tickets SET status='running', phase='executing', lease_mode='active', lease_owner='worker-a', lease_token='lease-a', lease_expires_at=? WHERE id=?", [Date.now() + 3600000, id]);
  return { appDb, db, store, id, svc: createToolCheckpointService(store), close: () => appDb.dispose() };
}

const thread = (id, suffix = 'graph') => `ticket-${id}:${suffix}`;
const put = (f, body) => f.svc.apply(f.id, 'graph_put', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', ...body });

test('graph checkpoint round-trips put, writes, get and list newest first', async () => {
  const f = await fixture();
  try {
    await put(f, { checkpoint_id: '0001', parent_id: null, checkpoint: 'c1', metadata: 'm1' });
    await put(f, { checkpoint_id: '0002', parent_id: '0001', checkpoint: 'c2', metadata: 'm2' });
    await f.svc.apply(f.id, 'graph_writes', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', checkpoint_id: '0002',
      task_id: 't1', writes: [{ idx: 0, channel: 'path', value: 'v0' }, { idx: 1, channel: 'outcome', value: 'v1' }] });
    const latest = await f.svc.apply(f.id, 'graph_get', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '' });
    assert.equal(latest.checkpoint.checkpoint_id, '0002');
    assert.equal(latest.checkpoint.checkpoint, 'c2');
    assert.deepEqual(latest.writes.map((w) => w.channel), ['path', 'outcome']);
    const older = await f.svc.apply(f.id, 'graph_get', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', checkpoint_id: '0001' });
    assert.equal(older.checkpoint.checkpoint, 'c1');
    const listed = await f.svc.apply(f.id, 'graph_list', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', limit: 10 });
    assert.deepEqual(listed.checkpoints.map((c) => c.checkpoint_id), ['0002', '0001']);
    const before = await f.svc.apply(f.id, 'graph_list', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', before: '0002', limit: 10 });
    assert.deepEqual(before.checkpoints.map((c) => c.checkpoint_id), ['0001']);
  } finally { await f.close(); }
});

test('graph resume refuses a changed plan or base pin', async () => {
  const f = await fixture();
  try {
    await put(f, { checkpoint_id: '0001', checkpoint: 'c1', metadata: 'm1' });
    await assert.rejects(f.svc.apply(f.id, 'graph_get', { ...lease, pin: 'plan-8:base-abc', thread_id: thread(f.id), checkpoint_ns: '' }),
      (error) => error.code === 'graph_drift');
    await assert.rejects(put(f, { pin: 'plan-8:base-abc', checkpoint_id: '0002', checkpoint: 'c2', metadata: 'm2' }),
      (error) => error.code === 'graph_drift');
  } finally { await f.close(); }
});

test('graph checkpoint refuses a stale lease before writing', async () => {
  const f = await fixture();
  try {
    await f.db.run("UPDATE ai_tickets SET lease_token='lease-b', lease_owner='worker-b' WHERE id=?", [f.id]);
    await assert.rejects(put(f, { checkpoint_id: '0001', checkpoint: 'c1', metadata: 'm1' }), (error) => error.code === 'stale_lease');
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM graph_checkpoint')).n, 0);
  } finally { await f.close(); }
});

test('graph thread must sit under the ticket scope', async () => {
  const f = await fixture();
  try {
    await assert.rejects(put(f, { thread_id: 'ticket-999:graph', checkpoint_id: '0001', checkpoint: 'c1', metadata: 'm1' }),
      (error) => error.code === 'scope_mismatch');
  } finally { await f.close(); }
});

test('graph purge drops the thread and its pending writes only', async () => {
  const f = await fixture();
  try {
    await put(f, { checkpoint_id: '0001', checkpoint: 'c1', metadata: 'm1' });
    await put(f, { thread_id: thread(f.id, 'other'), checkpoint_id: '0001', checkpoint: 'c1', metadata: 'm1' });
    await f.svc.apply(f.id, 'graph_writes', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '', checkpoint_id: '0001', task_id: 't', writes: [{ idx: 0, channel: 'x', value: 'v' }] });
    await f.svc.apply(f.id, 'graph_purge', { ...lease, pin: PIN, thread_id: thread(f.id), checkpoint_ns: '' });
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM graph_checkpoint WHERE thread_id=?', [thread(f.id)])).n, 0);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM graph_write')).n, 0);
    assert.equal((await f.db.get('SELECT COUNT(*) AS n FROM graph_checkpoint WHERE thread_id=?', [thread(f.id, 'other')])).n, 1);
  } finally { await f.close(); }
});
