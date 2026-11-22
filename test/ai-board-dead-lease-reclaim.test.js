import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';

async function fixture(phase, leaseDelta, extra = '') {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const db = appDb.d, store = createAsyncAiBoardStore(db);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'dead-lease-0001', title: 'Dead lease', detail: 'dead lease reclaim' });
  const id = request.root_ticket_id, now = Date.now();
  await db.run(`UPDATE ai_tickets SET status='running', phase=?, lease_mode='active', lease_owner='worker-2', lease_token='old-token', lease_expires_at=? ${extra} WHERE id=?`, [phase, now + leaseDelta, id]);
  const owner = () => db.get('SELECT lease_owner, lease_token, status, phase FROM ai_tickets WHERE id=?', [id]);
  return { db, store, id, owner, close: () => appDb.dispose() };
}
const claim = (f, workerId, opts = {}) => f.store.claimNext({ workerId, mode: 'active', intent: 'plan', ...opts });

for (const phase of ['planning', 'shadow_precheck', 'executing']) {
  test(`expired lease on ${phase} is reclaimed by a live worker`, async () => {
    const f = await fixture(phase, -60000);
    try {
      const got = await claim(f, 'worker-1');
      assert.equal(got?.id, f.id);
      assert.equal((await f.owner()).lease_owner, 'worker-1');
      assert.notEqual((await f.owner()).lease_token, 'old-token');
    } finally { await f.close(); }
  });
}

test('expired lease is reclaimable by the dead owner id restarting too', async () => {
  const f = await fixture('planning', -60000);
  try {
    assert.equal((await claim(f, 'worker-2'))?.id, f.id);
  } finally { await f.close(); }
});

test('valid lease is never double-claimed', async () => {
  const f = await fixture('planning', 60000);
  try {
    assert.equal(await claim(f, 'worker-1'), null);
    assert.equal((await f.owner()).lease_owner, 'worker-2');
  } finally { await f.close(); }
});
