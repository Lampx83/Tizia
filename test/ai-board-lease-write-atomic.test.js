import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { createToolCheckpointService } from '../server/ai-board/services/tool-checkpoint.js';
import { createGateProofService } from '../server/ai-board/services/gate-proofs.js';

const WINDOW_MS = 200;
const PROPOSAL = '1234567890123';
const PINS = { candidate: 'abcdef0123456789', plan: 'p', base: 'b', harness: 'h', prompt: 'r', tool: 't', model: 'm', oracle: 'o' };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fixture() {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const db = appDb.d, store = createAsyncAiBoardStore(db);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'lease-race', title: 'Lease race', detail: 'lease write atomic' });
  const id = request.root_ticket_id;
  await db.run("UPDATE ai_tickets SET status='running', phase='executing', lease_mode='active', lease_owner='worker-a', lease_token='lease-a', lease_expires_at=? WHERE id=?", [Date.now() + 3600000, id]);
  return { appDb, db, pool: db.pool, store, id, close: () => appDb.dispose() };
}

const pinsBody = { proposal_id: PROPOSAL, child: 0, run_scope: null, pins: { model: 'm' } };
const lease = { worker_id: 'worker-a', lease_token: 'lease-a' };

/**
 * Takeover fired right after the lease check, on a pool connection outside the ambient transaction.
 * Returns true if the takeover was already committed before the write ran.
 */
async function takeoverInWindow(f, run) {
  const realCheck = f.store.assertLease;
  let takeover, visibleBeforeWrite = false;
  f.store.assertLease = async (...args) => {
    const root = await realCheck(...args);
    takeover = f.pool.query("UPDATE ai_tickets SET lease_owner='worker-b', lease_token='lease-b' WHERE id=$1", [f.id]);
    await sleep(WINDOW_MS);
    visibleBeforeWrite = (await f.pool.query('SELECT lease_owner FROM ai_tickets WHERE id=$1', [f.id])).rows[0].lease_owner === 'worker-b';
    return root;
  };
  try { await run(); } finally { f.store.assertLease = realCheck; }
  await takeover;
  return visibleBeforeWrite;
}

test('checkpoint write is not interleaved with a lease takeover between check and write', async () => {
  const f = await fixture();
  try {
    const svc = createToolCheckpointService(f.store);
    const visible = await takeoverInWindow(f, () => svc.apply(f.id, 'pins', { ...pinsBody, ...lease, run_scope: `ticket-${f.id}:r1` }));
    assert.equal(visible, false, 'takeover committed between lease check and checkpoint write');
  } finally { await f.close(); }
});

test('gate proof write is not interleaved with a lease takeover between check and write', async () => {
  const f = await fixture();
  try {
    const svc = createGateProofService(f.store);
    const visible = await takeoverInWindow(f, () => svc.apply(f.id, 'record', { ...lease, gate: 4, pins: PINS, run_id: null, result: { gate: 4, blocked: false } }));
    assert.equal(visible, false, 'takeover committed between lease check and proof write');
  } finally { await f.close(); }
});

test('checkpoint and gate proof refuse a lease already taken over', async () => {
  const f = await fixture();
  try {
    await f.db.run("UPDATE ai_tickets SET lease_owner='worker-b', lease_token='lease-b' WHERE id=?", [f.id]);
    const cp = createToolCheckpointService(f.store), gp = createGateProofService(f.store);
    await assert.rejects(cp.apply(f.id, 'pins', { ...pinsBody, ...lease, run_scope: `ticket-${f.id}:r1` }), { code: 'stale_lease' });
    await assert.rejects(gp.apply(f.id, 'record', { ...lease, gate: 4, pins: PINS, run_id: null, result: { gate: 4, blocked: false } }), { code: 'stale_lease' });
    assert.equal((await f.db.get('SELECT COUNT(*) n FROM tool_run WHERE proposal_id=?', [PROPOSAL])).n, 0);
    assert.equal((await f.db.get('SELECT COUNT(*) n FROM ai_gate_proofs WHERE ticket_id=?', [f.id])).n, 0);
  } finally { await f.close(); }
});
