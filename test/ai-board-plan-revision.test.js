import test from 'node:test';
import assert from 'node:assert/strict';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';

test('clarification permits a new revision even when the canonical plan hash is unchanged', async () => {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'revision-request-01', title: 'Thêm bộ thẻ thuốc',
  });
  const plan = {
    domain: 'pharmacy', goal: 'Thêm trang thẻ ghi nhớ thuốc.',
    allowed_scope: ['public/pharmacy/flashcards.html'], acceptance: ['GET trả 200'],
    tests: ['node --test'], capabilities: ['public.ui'], risk: 'low', non_goals: ['không sửa DB'],
    steps: [{
      order: 1, title: 'Tạo trang thẻ', description: 'Trang HTML tĩnh.',
      allowed_scope: ['public/pharmacy/flashcards.html'], acceptance: ['GET trả 200'],
      tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['không sửa DB'],
    }],
  };
  const submit = async (ticket, runId, key) => store.submitPlan(ticket.id, {
    workerId: 'planner', leaseToken: ticket.lease_token, runId,
    plan, budgetUsed: 40, idempotencyKey: key,
  });

  const firstTicket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const firstRun = await store.createRun(firstTicket.id, {
    workerId: 'planner', leaseToken: firstTicket.lease_token,
    trigger: 'plan', idempotencyKey: 'revision-run-001',
  });
  const first = await submit(firstTicket, firstRun.id, 'revision-plan-001');
  await store.invalidatePlanForRequest(1, 'requester clarification');

  const nextTicket = await store.claimNext({ workerId: 'planner', version: 'test', mode: 'shadow' });
  const nextRun = await store.createRun(nextTicket.id, {
    workerId: 'planner', leaseToken: nextTicket.lease_token,
    trigger: 'plan', idempotencyKey: 'revision-run-002',
  });
  const second = await submit(nextTicket, nextRun.id, 'revision-plan-002');

  assert.equal(second.plan_hash, first.plan_hash);
  assert.equal(second.duplicate, false);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_plans WHERE root_ticket_id=1').get()).n, 2);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=1 AND status != ?').get('invalidated')).n, 1);
  db.close();
});
