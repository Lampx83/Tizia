// Clarification turns, question limit, confirm and handoff on the async board store.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runBoard, failure } from './support/ai-board-parity.js';
import { claimAndRun, newRequest } from './support/ai-board-scenarios.js';
import { LIMITS } from '../server/ai-board/store.js';

test('clarification turns, limits, confirm (complete and incomplete), handoff', async () => {
  const { result: out } = await runBoard(async (store) => {
    const r = {};
    const a = await newRequest(store, { tag: 'a', clarifying: true, title: 'Làm trang đẹp hơn' });
    const id = a.request_id;
    r.notClarifyingOwner = await failure(async () => (await store.getClarification(id, 2)));
    await store.addClarifyTurn(id, { kind: 'question', text: 'Bạn muốn sửa trang nào?' });
    await store.addClarifyTurn(id, { kind: 'answer', text: 'Trang chủ tiểu học', author: 'Lan' });
    r.repeated = await failure(() => store.addClarifyTurn(id, { kind: 'question', text: 'Bạn muốn sửa trang nào?' }));
    await store.addClarifyTurn(id, { kind: 'question', text: 'Nút nào cần to hơn?' });
    const extras = ['Màu nền ra sao?', 'Khoảng cách bao nhiêu?', 'Chữ tiêu đề cỡ nào?', 'Thứ tự mục thế nào?',
      'Biểu tượng chọn hình gì?', 'Âm thanh mức nào?', 'Tốc độ bao lâu?', 'Bố cục sắp xếp sao?'];
    for (let i = 2; i < LIMITS.clarify.questions; i += 1) {
      await store.addClarifyTurn(id, { kind: 'question', text: extras[i - 2] });
    }
    r.third = await failure(() => store.addClarifyTurn(id, { kind: 'question', text: 'Thêm một câu nữa?' }));
    r.noSummary = await failure(() => store.confirmClarification(id, 1, { spec: 'x'.repeat(20), complete: true }));
    await store.addClarifyTurn(id, { kind: 'summary', text: 'Tóm tắt: to nút Bắt đầu' });
    r.clarification = await store.getClarification(id, 1);
    r.pending = await store.listPendingClarifications(1);
    r.shortSpec = await failure(() => store.confirmClarification(id, 1, { spec: 'ngắn', complete: true }));
    r.confirm = await store.confirmClarification(id, 1, { spec: 'Nguyên văn: nút Bắt đầu cao 48px', complete: false });
    r.confirmAgain = await failure(() => store.confirmClarification(id, 1, { spec: 'Nguyên văn: nút Bắt đầu cao 48px', complete: true }));
    const claim = await claimAndRun(store, 'w1');
    r.snapshot = await store.getLeasedSnapshot(claim.id, 'w1', claim.claim.lease_token);
    const b = await newRequest(store, { tag: 'b', clarifying: true, title: 'Làm gì đó khác' });
    r.handoff = await store.handoffClarification(b.request_id, 1, 'clarification_limit_reached');
    r.handoffAgain = await failure(() => store.handoffClarification(b.request_id, 1, 'x'));
    r.workflow = await store.requestWorkflow(b.request_id);
    return r;
  });

  assert.deepEqual(out.notClarifyingOwner, { error: 'request_not_found', message: 'request not found' });
  assert.equal(out.repeated.error, 'clarification_limit', 'repeated question is refused by the same check as the limit');
  assert.equal(out.third.error, 'clarification_limit');
  assert.equal(out.noSummary.error, 'no_summary');
  const kinds = out.clarification.turns.map((t) => t.kind);
  assert.equal(kinds.filter((kind) => kind === 'question').length, LIMITS.clarify.questions);
  assert.equal(kinds.at(-1), 'summary');
  assert.equal(out.clarification.asked, LIMITS.clarify.questions);
  assert.equal(out.pending.length, 0, 'summary means no question is waiting for the requester');
  assert.equal(out.shortSpec.error, 'RequestValidationError');
  assert.deepEqual(out.confirm, { ok: true, status: 'queued', complete: false });
  assert.equal(out.confirmAgain.error, 'not_clarifying');
  assert.equal(out.snapshot.request.clarified_spec, 'Nguyên văn: nút Bắt đầu cao 48px');
  assert.equal(out.snapshot.clarification_incomplete, true);
  assert.equal(out.snapshot.request.status, 'reviewing');
  assert.equal(out.handoff.status, 'waiting_admin');
  assert.equal(out.handoffAgain.error, 'not_clarifying');
  assert.equal(out.workflow.workflow_status, 'waiting_admin');
  assert.equal(out.workflow.phase, 'clarification_limit');
});

test('worker gate 2.5 question: validation, idempotent duplicate, answer then confirm, repeat escalates, explicit escalation', async () => {
  const { result: out } = await runBoard(async (store) => {
    const r = {};
    const a = await newRequest(store, { tag: 'a', title: 'Thêm bộ lọc cho danh sách' });
    const c = await claimAndRun(store, 'w1');
    const ask = (question, key, extra = {}) => store.requestWorkerClarification(c.id, {
      ...c.lease, runId: c.run.id, question, maxQuestions: 3, idempotencyKey: key, ...extra,
    });
    r.bad = await failure(() => ask('', 'ask-clar-0'));
    r.badMax = await failure(() => store.requestWorkerClarification(c.id, { ...c.lease, runId: c.run.id, question: 'q', maxQuestions: 99, idempotencyKey: 'ask-clar-x' }));
    r.first = await ask('Bạn muốn bộ lọc hiển thị ở trang nào?', 'ask-clar-1');
    r.dup = await ask('Bạn muốn bộ lọc hiển thị ở trang nào?', 'ask-clar-1');
    r.otherWorkerDup = await failure(() => store.requestWorkerClarification(c.id, { workerId: 'w9', leaseToken: 'x', runId: c.run.id + 5, question: 'q', maxQuestions: 3, idempotencyKey: 'ask-clar-1' }));
    await store.addClarifyTurn(a.request_id, { kind: 'answer', text: 'Trang chủ', author: 'Lan' });
    await store.addClarifyTurn(a.request_id, { kind: 'summary', text: 'Tóm tắt: bộ lọc ở trang chủ' });
    r.confirm = await store.confirmClarification(a.request_id, 1, { spec: 'Bộ lọc nằm ở trang chủ tiểu học', complete: true });
    const c2 = await claimAndRun(store, 'w1');
    r.same = c2.id === c.id;
    r.repeat = await store.requestWorkerClarification(c2.id, { ...c2.lease, runId: c2.run.id, question: 'Bạn muốn bộ lọc hiển thị ở trang nào?', maxQuestions: 3, idempotencyKey: 'ask-clar-2' });
    const b = await newRequest(store, { tag: 'b', title: 'Yêu cầu mơ hồ khác' });
    const cb = await claimAndRun(store, 'w2');
    r.escalate = await store.requestWorkerClarification(cb.id, { ...cb.lease, runId: cb.run.id, question: '', escalateReason: 'too vague', maxQuestions: 3, idempotencyKey: 'ask-clar-3' });
    r.listB = await store.listRequestsForOwner(1, 'pharmacy');
    r.bTrace = (await store.getRequestTrace(b.request_id)).events.map((e) => e.event_type);
    return r;
  });
  assert.equal(out.bad.error, 'invalid_worker_operation');
  assert.equal(out.badMax.error, 'invalid_worker_operation');
  assert.equal(out.first.status, 'clarifying');
  assert.deepEqual(out.dup, { status: 'duplicate', duplicate: true });
  assert.equal(out.otherWorkerDup.error, 'idempotency_conflict');
  assert.deepEqual(out.confirm, { ok: true, status: 'queued', complete: true });
  assert.equal(out.same, true, 'confirmed request re-enters the same root');
  assert.equal(out.repeat.status, 'waiting_admin', 'repeated question escalates instead of asking again');
  assert.equal(out.escalate.status, 'waiting_admin');
  assert.equal(out.escalate.requestId, 2);
  assert.deepEqual(out.listB.map((row) => row.id), [2, 1]);
  assert.equal(out.listB[1].workflow_status, 'waiting_admin');
  assert.equal(out.bTrace.at(-1), 'plan_blocked');
});
