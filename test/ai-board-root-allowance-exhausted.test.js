import test from 'node:test';
import assert from 'node:assert/strict';

import { plannedRoot } from './support/ai-board-planned-root.js';
import { LIMITS } from '../server/ai-board/store.js';
import { retryTransientTicket } from '../server/ai-board/transient-retry-async.js';
import { scaledRootLimit as scaledFor } from '../server/ai-board/services/root-allowance.js';

const KIND = { model_calls: 'model', semantic_repairs: 'semantic_repair', quality_switches: 'quality_switch', tokens: 'model' };

/** Cạn nhóm `group` ở trần execute của plan 1 bước; trả về trần. */
async function exhaust(db, ticket, group) {
  const scaled = ['model_calls', 'semantic_repairs'].includes(group);
  const limit = scaled ? scaledFor(group, 1) : LIMITS.root_work[group];
  await db.prepare('INSERT INTO ai_root_allowances(root_ticket_id, created_at) VALUES (?, ?)').run(ticket.id, Date.now());
  const rows = group === 'tokens' ? 1 : limit;
  for (let i = 0; i < rows; i++) {
    await db.prepare(`INSERT INTO ai_work_reservations(root_ticket_id, attempt_key, kind, provider, lease_hash, tokens_reserved, created_at)
      VALUES (?, ?, ?, ?, 'h', ?, ?)`).run(ticket.id, `attempt-${i}-xxxx`, KIND[group], KIND[group] === 'model' ? 'api' : null,
      group === 'tokens' ? limit : 0, Date.now());
  }
  return limit;
}

for (const group of ['model_calls', 'tokens', 'semantic_repairs', 'quality_switches']) {
  test(`${group} exhausted → root_allowance_exhausted, not transient, no retry-transient`, async () => {
    const { db, submit, ticket } = await plannedRoot();
    const limit = await exhaust(db, ticket, group);
    await submit('budget');
    const root = await db.prepare('SELECT status, phase, public_note, internal_reason FROM ai_tickets WHERE id=?').get(ticket.id);
    assert.equal(root.status, 'waiting_admin');
    assert.equal(root.phase, 'root_allowance_exhausted');
    assert.equal(root.internal_reason, `root_allowance_exhausted:${group}:${limit}/${limit}`);
    assert.doesNotMatch(root.public_note, /hạ tầng|GPU/);
    await assert.rejects(() => retryTransientTicket(db.d, ticket.id), (e) => e.code === 'not_transient_blocked');
  });
}

test('a budget verdict without an exhausted root group stays budget_exhausted', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit('budget');
  assert.equal((await db.prepare('SELECT phase FROM ai_tickets WHERE id=?').get(ticket.id)).phase, 'budget_exhausted');
});

test('root_allowance_exhausted is rerunnable after a redeploy, not via retry-transient', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await exhaust(db, ticket, 'quality_switches');
  await submit('budget');
  await db.prepare('UPDATE ai_tickets SET lease_owner=NULL, lease_token=NULL WHERE id=?').run(ticket.id);
  const trace = await store.getRequestTrace((await db.prepare('SELECT source_request_id FROM ai_tickets WHERE id=?').get(ticket.id)).source_request_id);
  assert.deepEqual({ ...trace.root.allowance.hit }, { group: 'quality_switches', used: 1, limit: 1 });
  assert.equal(trace.root.rerun_stage, 'execute');
});
