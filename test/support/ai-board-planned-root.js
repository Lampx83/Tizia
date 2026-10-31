import { createAsyncAiBoardStore } from '../../server/ai-board/store-async.js';
import { openBoard } from './ai-board-db.js';

/** Root đã có plan 1 bước, đang giữ lease; submit(failure_class) gửi verdict chặn ở cổng 3. */
export async function plannedRoot() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [9, 'admin', 'Admin', 'admin', null]] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'ra-request-001', title: 'Sửa trang giới thiệu', detail: 'fixture' });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'ra-run-001' });
  const step = { order: 1, title: 'Sửa trang', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'ra-plan-001',
    plan: { domain: 'pharmacy', goal: 'Sửa trang.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  const submit = (failure_class, key = 'ra-verdict-001') => store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: key,
    now: Date.now(), verdict: { outcome: 'blocked', gate_reached: 3, reason: 'content_guard: root_allowance_exhausted', budget_used: 3,
      failure_class, repairs: [], candidate: null, gates: [{ gate: 3, blocked: true, reason: 'x', issues: [] }] } });
  return { db, store, ticket, submit };
}
