// Async store == sync store: requester clarification (turns, limits, confirm, handoff) and the worker gate 2.5 question.
import test from 'node:test';
import { assertParity, failure } from './support/ai-board-parity.js';
import { claimAndRun, newRequest } from './support/ai-board-scenarios.js';

test('parity: clarification turns, limits, confirm (complete and incomplete), handoff', async () => {
  await assertParity(async (store) => {
    const out = {};
    const a = await newRequest(store, { tag: 'a', clarifying: true, title: 'Làm trang đẹp hơn' });
    const id = a.request_id;
    out.notClarifyingOwner = await failure(() => store.getClarification(id, 2));
    await store.addClarifyTurn(id, { kind: 'question', text: 'Bạn muốn sửa trang nào?' });
    await store.addClarifyTurn(id, { kind: 'answer', text: 'Trang chủ tiểu học', author: 'Lan' });
    out.repeated = await failure(() => store.addClarifyTurn(id, { kind: 'question', text: 'Bạn muốn sửa trang nào?' }));
    await store.addClarifyTurn(id, { kind: 'question', text: 'Nút nào cần to hơn?' });
    out.third = await failure(() => store.addClarifyTurn(id, { kind: 'question', text: 'Màu nền ra sao?' }));
    out.noSummary = await failure(() => store.confirmClarification(id, 1, { spec: 'x'.repeat(20), complete: true }));
    await store.addClarifyTurn(id, { kind: 'summary', text: 'Tóm tắt: to nút Bắt đầu' });
    out.clarification = await store.getClarification(id, 1);
    out.turns = await store.countClarifyTurns(1, 0);
    out.pending = await store.listPendingClarifications(1);
    out.shortSpec = await failure(() => store.confirmClarification(id, 1, { spec: 'ngắn', complete: true }));
    out.confirm = await store.confirmClarification(id, 1, { spec: 'Nguyên văn: nút Bắt đầu cao 48px', complete: false });
    out.confirmAgain = await failure(() => store.confirmClarification(id, 1, { spec: 'Nguyên văn: nút Bắt đầu cao 48px', complete: true }));
    const claim = await claimAndRun(store, 'w1');
    out.snapshot = await store.getLeasedSnapshot(claim.id, 'w1', claim.claim.lease_token);
    out.snapshot.ticket = undefined;
    out.snapshot.request = { ...out.snapshot.request, created_at: undefined, updated_at: undefined };
    // handoff after the limit
    const b = await newRequest(store, { tag: 'b', clarifying: true, title: 'Làm gì đó khác' });
    out.handoff = await store.handoffClarification(b.request_id, 1, 'clarification_limit_reached');
    out.handoffAgain = await failure(() => store.handoffClarification(b.request_id, 1, 'x'));
    out.workflow = await store.requestWorkflow(b.request_id);
    return out;
  });
});

test('parity: worker gate 2.5 question, duplicate, requester answer, repeated question escalates', async () => {
  await assertParity(async (store) => {
    const out = {};
    const a = await newRequest(store, { tag: 'a', title: 'Thêm bộ lọc cho danh sách' });
    const c = await claimAndRun(store, 'w1');
    const ask = (question, key, extra = {}) => store.requestWorkerClarification(c.id, {
      ...c.lease, runId: c.run.id, question, maxQuestions: 3, idempotencyKey: key, ...extra,
    });
    out.bad = await failure(() => ask('', 'ask-clar-0'));
    out.badMax = await failure(() => store.requestWorkerClarification(c.id, { ...c.lease, runId: c.run.id, question: 'q', maxQuestions: 99, idempotencyKey: 'ask-clar-x' }));
    out.first = await ask('Bạn muốn bộ lọc hiển thị ở trang nào?', 'ask-clar-1');
    out.dup = await ask('Bạn muốn bộ lọc hiển thị ở trang nào?', 'ask-clar-1');
    out.otherWorkerDup = await failure(() => store.requestWorkerClarification(c.id, { workerId: 'w9', leaseToken: 'x', runId: c.run.id + 5, question: 'q', maxQuestions: 3, idempotencyKey: 'ask-clar-1' }));
    await store.addClarifyTurn(a.request_id, { kind: 'answer', text: 'Trang chủ', author: 'Lan' });
    await store.addClarifyTurn(a.request_id, { kind: 'summary', text: 'Tóm tắt: bộ lọc ở trang chủ' });
    out.confirm = await store.confirmClarification(a.request_id, 1, { spec: 'Bộ lọc nằm ở trang chủ tiểu học', complete: true });
    const c2 = await claimAndRun(store, 'w1');
    out.same = c2.id === c.id;
    out.repeat = await store.requestWorkerClarification(c2.id, { ...c2.lease, runId: c2.run.id, question: 'Bạn muốn bộ lọc hiển thị ở trang nào?', maxQuestions: 3, idempotencyKey: 'ask-clar-2' });
    out.trace = await store.getRequestTrace(a.request_id);
    // explicit escalation from the worker
    const b = await newRequest(store, { tag: 'b', title: 'Yêu cầu mơ hồ khác' });
    const cb = await claimAndRun(store, 'w2');
    out.escalate = await store.requestWorkerClarification(cb.id, { ...cb.lease, runId: cb.run.id, question: '', escalateReason: 'too vague', maxQuestions: 3, idempotencyKey: 'ask-clar-3' });
    out.listB = await store.listRequestsForOwner(1, 'pharmacy');
    out.bTrace = (await store.getRequestTrace(b.request_id)).events.map((e) => e.event_type);
    return out;
  });
});
