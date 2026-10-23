// Folder decision records: written when a root ends, shown as L4 of the folder brief (newest first, budgeted).
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS } from '../server/ai-board/store.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'an', 'An', 'student', 'it'],
    [9, 'ad', 'Ad', 'admin', null],
  ] });
  const d = db.d;
  const store = createAsyncAiBoardStore(d);
  let n = 0;
  const submit = async (owner, extra = {}) => store.createRequestWithRoot({
    ownerUserId: owner, ownerDomain: 'it', ownerDisplayName: `u${owner}`,
    idempotencyKey: `decision-request-${String(++n).padStart(3, '0')}`, title: `Trò đoán từ khoá ${n}`,
    detail: 'fixture', ...extra,
  });
  const requestOf = async (rootId) => (await d.all('SELECT source_request_id FROM ai_tickets WHERE id=?', [rootId]))[0].source_request_id;
  return { d, store, submit, requestOf };
}

test('cancelled folder root writes a decision record; loose request writes none', async () => {
  const { d, store, submit, requestOf } = await fixture();
  const folder = await submit(1, { type: 'feature' });
  const loose = await submit(1, { title: 'Sửa lỗi chính tả' });
  assert.equal(loose.folder_id ?? null, null);
  await store.cancelRequest(await requestOf(loose.root_ticket_id), { ownerUserId: 1 });
  assert.equal((await d.all('SELECT id FROM ai_folder_decisions')).length, 0);

  await store.cancelRequest(await requestOf(folder.root_ticket_id), { ownerUserId: 1 });
  const [row] = await d.all('SELECT root_ticket_id, folder_id, title, outcome, stop_reason, subtasks_json FROM ai_folder_decisions');
  assert.equal(row.root_ticket_id, folder.root_ticket_id);
  assert.equal(row.folder_id, folder.folder_id);
  assert.equal(row.outcome, 'cancelled');
  assert.equal(row.stop_reason, 'requester_cancelled');
  assert.deepEqual(JSON.parse(row.subtasks_json), []);
});

test('folder brief L4 lists newest decisions first, within budget, with a +N note for the rest', async () => {
  const { d, store, submit, requestOf } = await fixture();
  const first = await submit(1, { type: 'feature' });
  const titles = [];
  for (let i = 1; i <= 6; i += 1) {
    const follow = await submit(1, { folderId: first.folder_id, title: `Chức năng phụ số ${i}` });
    titles.push(`Chức năng phụ số ${i}`);
    await store.cancelRequest(await requestOf(follow.root_ticket_id), { ownerUserId: 1 });
  }
  const brief = await store.folderBrief(first.folder_id);
  const decisions = brief.decisions;
  assert.ok(decisions.length <= LIMITS.context.decisions_chars, 'decisions within chars budget');
  assert.match(decisions, /^Quyết định \(mới nhất trước\):/);
  assert.ok(decisions.includes(`(+${6 - LIMITS.context.decisions_max} quyết định cũ hơn)`));
  const shown = titles.toReversed().filter((t) => decisions.includes(`- ${t} →`));
  assert.equal(shown.length, LIMITS.context.decisions_max);
  assert.ok(!decisions.includes('- Chức năng phụ số 1 →'), 'oldest dropped first');
  const order = shown.map((t) => decisions.indexOf(`- ${t} →`));
  assert.deepEqual(order, [...order].sort((a, b) => a - b), 'newest first');
  assert.equal(shown[0], 'Chức năng phụ số 6');
  assert.equal((await d.all('SELECT id FROM ai_folder_decisions')).length, 6);
  assert.ok(!brief.text.includes('Quyết định'), 'L1 text untouched by L4');
});

test('folder without records has an empty decisions section', async () => {
  const { store, submit } = await fixture();
  const first = await submit(1, { type: 'feature' });
  assert.equal((await store.folderBrief(first.folder_id)).decisions, '');
});

test('blocked pre-PR verdict writes a decision record with the stop reason and planned subtasks', async () => {
  const { d, store, submit } = await fixture();
  const folder = await submit(1, { type: 'feature' });
  await store.approveFolder(folder.folder_id, 9);
  const ticket = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'decision-run-001' });
  const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
    acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: 'decision-plan-001',
    plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
      capabilities: ['public.ui'], risk: 'low', non_goals: ['Không đổi đăng nhập'], steps: [step] } });
  const gates = [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'touched auth', issues: [] }];
  await store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: 'decision-verdict-001', verdict: {
    outcome: 'blocked', gate_reached: 4, reason: 'touched auth', budget_used: 80, failure_class: 'ordinary',
    repairs: [], candidate: null, gates } });
  const [row] = await d.all('SELECT outcome, stop_reason, spec, cut_json, subtasks_json, verdict_json FROM ai_folder_decisions');
  assert.equal(row.outcome, 'blocked');
  assert.equal(row.stop_reason, 'touched auth');
  assert.deepEqual(JSON.parse(row.cut_json), ['Không đổi đăng nhập']);
  assert.deepEqual(JSON.parse(row.subtasks_json), [{ order: 1, title: 'Trang mới', files: ['public/tro-doan-tu.html'], anchor: null }]);
  assert.equal(JSON.parse(row.verdict_json).failure_class, 'ordinary');
  assert.match((await store.folderBrief(folder.folder_id)).decisions, /- Trò đoán từ khoá \d+ → blocked \(touched auth\)/);
});

async function blockedFolderRoot(ctx, tag, failureClass) {
  const { store, submit } = ctx;
  const folder = await submit(1, { type: 'feature' });
  await store.approveFolder(folder.folder_id, 9);
  const ticket = await store.claimNext({ workerId: `w-${tag}`, mode: 'active', intent: 'plan' });
  const lease = { workerId: `w-${tag}`, leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `decision-run-${tag}` });
  const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
    acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: `decision-plan-${tag}`,
    plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
      capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  await store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: `decision-verdict-${tag}`, verdict: {
    outcome: 'blocked', gate_reached: 4, reason: 'stopped', budget_used: 80, failure_class: failureClass, repairs: [], candidate: null,
    gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'stopped', issues: [] }] } });
}

test('a resumable waiting_admin block writes no decision record', async () => {
  const ctx = await fixture();
  await blockedFolderRoot(ctx, 'plan', 'plan');
  assert.equal((await ctx.d.all('SELECT id FROM ai_folder_decisions')).length, 0);
});

test('budget ceiling writes a blocked decision record', async () => {
  const ctx = await fixture();
  await blockedFolderRoot(ctx, 'budget', 'budget');
  const [root] = await ctx.d.all("SELECT id FROM ai_tickets WHERE kind='root' AND phase='budget_exhausted'");
  let result;
  for (let i = 0; i < 20 && result?.status !== 'human_owned'; i += 1) {
    result = await ctx.store.extendBudget(root.id, { amount: 100000, reason: 'ceiling check long reason', adminUserId: 9 }).catch((e) => e);
    if (result?.status !== 'human_owned') break;
  }
  assert.equal(result.status, 'human_owned');
  const [row] = await ctx.d.all('SELECT outcome, stop_reason FROM ai_folder_decisions');
  assert.equal(row.outcome, 'blocked');
  assert.equal(row.stop_reason, result.reason);
});
