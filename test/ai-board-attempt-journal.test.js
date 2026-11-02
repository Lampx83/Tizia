// Attempt journal (LF/147): a leased worker writes one entry per node, the admin trace reads them.
import test from 'node:test';
import assert from 'node:assert/strict';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';

async function fixture() {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const store = createAsyncAiBoardStore(appDb.d);
  return { appDb, store, db: appDb.d };
}

test('journal entries are idempotent per node and visible in the request trace', async () => {
  const { store, db, appDb } = await fixture();
  try {
    const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'journal-request-0001', title: 'Journal', detail: 'Journal', folderId: null });
    const ticketId = request.root_ticket_id;
    await db.run("UPDATE ai_tickets SET status='queued', phase='authorized', plan_hash='plan-a', plan_revision=1 WHERE id=?", [ticketId]);
    const lease = await store.claimNext({ workerId: 'journal-worker', version: 'test', mode: 'active', intent: 'plan', leaseMs: 60000 });
    const run = await store.createRun(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token,
      trigger: 'execute', idempotencyKey: 'journal-run-0001' });
    const entry = { workerId: 'journal-worker', leaseToken: lease.lease_token, runId: run.id, node: 'gate_3',
      outcome: 'passed', state: { produced: ['public/x.html'], repairs: 0 }, ledger: { model_calls: 1 } };
    await store.recordAttemptJournal(ticketId, entry);
    await store.recordAttemptJournal(ticketId, { ...entry, outcome: 'failed' });
    const trace = await store.getRequestTrace(request.request_id);
    const rows = trace.journal.filter((row) => row.run_id === run.id && row.node === 'gate_3');
    assert.equal(rows.length, 1);
    assert.equal(rows[0].outcome, 'failed');
    assert.deepEqual(rows[0].state.produced, ['public/x.html']);
    assert.deepEqual(rows[0].ledger, { model_calls: 1 });
  } finally {
    await appDb.dispose();
  }
});

test('a journal write with a stale lease is refused', async () => {
  const { store, db, appDb } = await fixture();
  try {
    const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'journal-request-0002', title: 'Journal', detail: 'Journal', folderId: null });
    const ticketId = request.root_ticket_id;
    await db.run("UPDATE ai_tickets SET status='queued', phase='authorized', plan_hash='plan-a', plan_revision=1 WHERE id=?", [ticketId]);
    const lease = await store.claimNext({ workerId: 'journal-worker', version: 'test', mode: 'active', intent: 'plan', leaseMs: 60000 });
    const run = await store.createRun(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token,
      trigger: 'execute', idempotencyKey: 'journal-run-0002' });
    await assert.rejects(() => store.recordAttemptJournal(ticketId, { workerId: 'other', leaseToken: 'nope',
      runId: run.id, node: 'gate_3', outcome: 'passed', state: {}, ledger: {} }), /lease/);
  } finally {
    await appDb.dispose();
  }
});

test('the leased snapshot carries the journal of a crashed run and drops it once the run has a verdict', async () => {
  const { store, db, appDb } = await fixture();
  try {
    const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'journal-request-0003', title: 'Journal', detail: 'Journal', folderId: null });
    const ticketId = request.root_ticket_id;
    await db.run("UPDATE ai_tickets SET status='queued', phase='authorized', plan_hash='plan-a', plan_revision=1 WHERE id=?", [ticketId]);
    const lease = await store.claimNext({ workerId: 'journal-worker', version: 'test', mode: 'active', intent: 'plan', leaseMs: 60000 });
    const run = await store.createRun(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token,
      trigger: 'execute', idempotencyKey: 'journal-run-0003' });
    const state = { produced: { 'public/x.html': { code: '<h1>x</h1>' } }, base_sha: 'abc',
      pins: { plan_hash: 'plan-a', graph: 'g' }, resumable: true };
    await store.recordAttemptJournal(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token, runId: run.id,
      node: 'gate_3', outcome: 'passed', state, ledger: { model_calls: 2 } });

    const snapshot = await store.getLeasedSnapshot(ticketId, 'journal-worker', lease.lease_token);
    const found = snapshot.resume_journal.find((item) => String(item.run_id) === String(run.id));
    assert.ok(found, 'a run without a verdict resumes');
    assert.equal(found.entries.length, 1);
    assert.deepEqual(found.entries[0].state.produced, state.produced);
    assert.deepEqual(found.entries[0].ledger, { model_calls: 2 });

    await db.run("UPDATE ai_runs SET outcome='blocked' WHERE id=?", [run.id]);
    const after = await store.getLeasedSnapshot(ticketId, 'journal-worker', lease.lease_token);
    assert.equal(after.resume_journal.length, 0, 'a finished run is not a resume source');
  } finally {
    await appDb.dispose();
  }
});

test('a journal state over the size cap is refused instead of bloating the trace', async () => {
  const { store, db, appDb } = await fixture();
  try {
    const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
      idempotencyKey: 'journal-request-0004', title: 'Journal', detail: 'Journal', folderId: null });
    const ticketId = request.root_ticket_id;
    await db.run("UPDATE ai_tickets SET status='queued', phase='authorized', plan_hash='plan-a', plan_revision=1 WHERE id=?", [ticketId]);
    const lease = await store.claimNext({ workerId: 'journal-worker', version: 'test', mode: 'active', intent: 'plan', leaseMs: 60000 });
    const run = await store.createRun(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token,
      trigger: 'execute', idempotencyKey: 'journal-run-0004' });
    await assert.rejects(() => store.recordAttemptJournal(ticketId, { workerId: 'journal-worker', leaseToken: lease.lease_token,
      runId: run.id, node: 'gate_3', outcome: 'passed', state: { code: 'x'.repeat(200_001) }, ledger: {} }), /too large/);
  } finally {
    await appDb.dispose();
  }
});
