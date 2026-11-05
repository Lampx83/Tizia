import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';

const DAILY_HOLD_S = 8000;

test('cancel settles an open model reservation so the owner day budget releases its hold', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  try {
    const store = createAsyncAiBoardStore(db.d);
    const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'settle-request', title: 'Sửa hướng dẫn', detail: 'fixture' });
    const ticket = await store.claimNext({ workerId: 'settle-a', version: 'test', mode: 'shadow', intent: 'plan', leaseMs: 120000 });
    await db.d.run('INSERT INTO ai_root_allowances(root_ticket_id, limits_json, blocked_reason, created_at) VALUES (?, NULL, NULL, ?)', [ticket.id, Date.now()]);
    await db.d.run(`INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
      VALUES (?, 'settle-attempt', 'model', 'vllm', 'hash', 1024, ?)`, [ticket.id, Date.now()]);

    assert.equal((await store.dailyGpuStatus(request.request_id)).used, DAILY_HOLD_S, 'open local reservation holds the unknown-hold ceiling');

    await store.cancelRequest(request.request_id, { ownerUserId: 1 });

    const row = await db.d.get("SELECT settled_at, metrics_json, tokens_used FROM ai_work_reservations WHERE attempt_key='settle-attempt'");
    assert.notEqual(row.settled_at, null);
    assert.ok(row.metrics_json && JSON.parse(row.metrics_json).gpu_ms === 0);
    assert.equal((await store.dailyGpuStatus(request.request_id)).used, 0, 'owner day usage equals settled GPU, not the 8000 s hold');
  } finally { await db.close(); }
});
