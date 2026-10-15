import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';

test('first admin to act claims the request; a later admin only becomes the last actor', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [2, 'ann', 'Ann', 'admin'], [3, 'bob', 'Bob', 'admin']] });
  const store = createAsyncAiBoardStore(db.d);
  const { request_id: requestId } = await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'admins-request-001', title: 'Tiêu đề', detail: 'Nội dung',
  });
  assert.equal((await store.getRequestTrace(requestId)).root.managed, null);
  await store.noteRequest(requestId, 'xem rồi', 2);
  await store.recordAdminAction({ requestId }, 3, 'rerun_gate');
  const { root } = await store.getRequestTrace(requestId);
  assert.deepEqual([root.managed.managed_by_name, root.managed.last_admin_name, root.managed.last_action], ['ann', 'bob', 'rerun_gate']);
  assert.equal((await store.listAdminQueue()).find(t => t.id === root.id).managed_by_name, 'ann');
});
