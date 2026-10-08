// A "new feature" request opens a folder; follow-ups go into it; the admin approves
// the folder once, after which its surface plans run without waiting.
import test from 'node:test';
import assert from 'node:assert/strict';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS } from '../server/ai-board/store.js';
import { nextStep, FEATURE_QUESTIONS } from '../server/contexts/ai-board-intake/clarify.js';

async function fixture() {
  const db = await openBoard({ users: [
    [1, 'an', 'An', 'student', 'it'],
    [2, 'binh', 'Bình', 'student', 'it'],
    [9, 'ad', 'Ad', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  let n = 0;
  const submit = async (owner, extra = {}) => store.createRequestWithRoot({
    ownerUserId: owner, ownerDomain: 'it', ownerDisplayName: `u${owner}`,
    idempotencyKey: `folder-request-${String(++n).padStart(3, '0')}`, title: `Trò đoán từ khoá lập trình ${n}`,
    detail: 'fixture', ...extra,
  });
  // Plan 1 bước mặt bằng (public.ui) cho root vừa tạo, như worker gửi lên.
  const plan = async (rootId) => {
    const ticket = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
    assert.equal(ticket.id, rootId);
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `folder-run-${rootId}` });
    const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
      acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
    const out = await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: `folder-plan-${rootId}`,
      plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
        capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
    await store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: `folder-release-${rootId}` });
    return out;
  };
  const rootState = async (id) => ({ ...await db.prepare('SELECT status, internal_reason FROM ai_tickets WHERE id=?').get(id) });
  return { db, store, submit, plan, rootState };
}

test('a new-feature request opens a folder; follow-ups attach to it; strangers cannot', async () => {
  const { store, submit } = await fixture();
  const first = await submit(1, { type: 'feature' });
  assert.ok(first.folder_id);
  const follow = await submit(1, { folderId: first.folder_id, title: 'Thêm bảng xếp hạng' });
  assert.equal(follow.folder_id, first.folder_id);
  await assert.rejects(async () => submit(2, { folderId: first.folder_id }), /Không tìm thấy chức năng/);
  const { mine, school } = await store.listFolders(1, 'it');
  assert.equal(mine.length, 1);
  assert.equal(mine[0].requests, 2);
  assert.equal((await store.listFolders(2, 'it')).school[0].id, first.folder_id);
  assert.equal(school.length, 0);
  assert.ok(!('owner_user_id' in (await store.listFolders(2, 'it')).school[0]), 'owner id not exposed to others');
});

test('open folders are capped per person', async () => {
  const { submit } = await fixture();
  for (let i = 0; i < LIMITS.open_folders_per_user.value; i += 1) await submit(1, { type: 'feature' });
  await assert.rejects(async () => submit(1, { type: 'feature' }), /chức năng chưa xong/);
});

test('a folder plan waits for the admin once; after approval later plans run on their own', async () => {
  const { store, submit, plan, rootState } = await fixture();
  const first = await submit(1, { type: 'feature' });
  assert.equal((await plan(first.root_ticket_id)).status, 'waiting_authorization');
  assert.deepEqual(await rootState(first.root_ticket_id), { status: 'waiting_authorization', internal_reason: 'folder_not_approved' });

  assert.equal((await store.approveFolder(first.folder_id, 9)).authorized, 1);
  assert.equal((await rootState(first.root_ticket_id)).status, 'queued');
  const [row] = await store.listAdminFolders();
  assert.equal(row.approved, true);
  assert.equal(row.state, 'active');

  const next = await submit(1, { folderId: first.folder_id, title: 'Thêm bảng xếp hạng' });
  await store.db.run("UPDATE ai_tickets SET status='done' WHERE id=?", [first.root_ticket_id]); // out of the way
  assert.equal((await plan(next.root_ticket_id)).status, 'planned');

  await store.revokeFolder(first.folder_id);
  const third = await submit(1, { folderId: first.folder_id, title: 'Thêm âm thanh' });
  await store.db.run("UPDATE ai_tickets SET status='done' WHERE id=?", [next.root_ticket_id]);
  assert.equal((await plan(third.root_ticket_id)).status, 'waiting_authorization');
});

test('a person can vote a classmate\'s folder once, not their own', async () => {
  const { store, submit } = await fixture();
  const { folder_id: id } = await submit(1, { type: 'feature' });
  assert.equal((await store.voteFolder(id, 2)).votes, 1);
  assert.equal((await store.voteFolder(id, 2)).votes, 1);
  await assert.rejects(async () => store.voteFolder(id, 1), (e) => e.code === 'own_folder');
});

test('feature grilling asks exactly two topics, with no early stop', () => {
  assert.deepEqual(nextStep({ asked: 1, rulesClear: true, mode: 'feature' }), { kind: 'question', mode: 'feature' });
  assert.deepEqual(nextStep({ asked: FEATURE_QUESTIONS, mode: 'feature' }), { kind: 'summary', complete: true });
  assert.deepEqual(nextStep({ asked: 1, rulesClear: true }), { kind: 'summary', complete: true }); // loose request unchanged
});

test('each feature turn names exactly its own topic', async () => {
  const { questionPrompt } = await import('../server/contexts/ai-board-intake/clarify.js');
  const request = { title: 'Trò đoán từ', detail: 'x' };
  const p1 = questionPrompt({ request, turns: [], techLevel: 'some', mode: 'feature', turn: 1 });
  const p2 = questionPrompt({ request, turns: [], techLevel: 'some', mode: 'feature', turn: 2 });
  assert.match(p1, /CHỈ hỏi về: chức năng này để làm gì/);
  assert.match(p2, /CHỈ hỏi về: người dùng làm gì theo từng bước/);
});

// One branch + one draft PR per folder cycle.
test('a folder cycle keeps its branch head and PR; done then released starts a new cycle', async () => {
  const { db, store, submit } = await fixture();
  const first = await submit(1, { type: 'feature' });
  await store.approveFolder(first.folder_id, 9);
  const ticket = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'cycle-run-001' });
  assert.equal((await store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token)).folder.branch, null);
  const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
    acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  await store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: 'cycle-plan-001',
    plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
      capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  const branch = 'ai-board/2026-09-26-feature-tro-doan-tu';
  const candidate = { branch, base_sha: 'a'.repeat(40), head_sha: 'b'.repeat(40),
    commits: [{ sha: 'b'.repeat(40), title: 'ai-board(ticket-1): 1/1 Trang mới', files: ['public/tro-doan-tu.html', 'test/t.test.js'] }] };
  const gates = [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [] },
    { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } }, runner: 'docker', retried: false },
    { gate: 5.5, blocked: false, reason: null, risk_level: 'low', risk_signals: [] }];
  await store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: 'cycle-verdict-001', verdict: {
    outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 20, failure_class: null, repairs: [], candidate, gates } });
  await store.recordPullRequest(ticket.id, { ...lease, runId: run.id, idempotencyKey: 'cycle-pr-001', pullRequest: {
    number: 7, url: 'https://github.com/Lampx83/Tizia/pull/7', branch, base: 'dev', base_sha: candidate.base_sha,
    head_sha: candidate.head_sha } });
  const snap = (await store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token)).folder;
  assert.deepEqual({ branch: snap.branch, head: snap.head_sha, pr: snap.pr_number }, { branch, head: 'b'.repeat(40), pr: 7 });
  assert.equal((await store.listFolders(1, 'it')).mine[0].has_change, true);
  assert.ok(!JSON.stringify(await store.listFolders(2, 'it')).includes(branch), 'branch is admin-only');
  assert.equal((await store.listAdminFolders())[0].trace_ref.pr_number, 7);

  await assert.rejects(async () => store.markFolderDone(first.folder_id, 2), (e) => e.code === 'folder_not_found');
  assert.equal((await store.markFolderDone(first.folder_id, 1)).state, 'awaiting_merge');
  assert.equal((await store.markFolderReleased(first.folder_id)).state, 'released');
  const after = await db.prepare('SELECT branch, pr_number, cycle, state FROM ai_feature_folders WHERE id=?').get(first.folder_id);
  assert.deepEqual({ ...after }, { branch: null, pr_number: null, cycle: 2, state: 'released' });
  await assert.rejects(async () => store.markFolderReleased(first.folder_id), (e) => e.code === 'nothing_to_release');
});

// The brief is derived from the DB at read time and capped.
test('folder brief: purpose, flow, done, requested, owned files and recent requests, within caps', async () => {
  const { db, store, submit } = await fixture();
  const first = await submit(1, { type: 'feature', title: 'Trò đoán từ khoá' });
  const second = await submit(1, { folderId: first.folder_id, title: 'Thêm bảng điểm cuối ván' });
  const msg = db.prepare('INSERT INTO request_messages(request_id, role, author_name, body, created_at) VALUES (?, ?, ?, ?, ?)');
  await msg.run(first.request_id, 'student', 'u1', 'mô tả gốc', 1);
  await msg.run(first.request_id, 'ai', 'Ban', 'Để làm gì?', 2);
  await msg.run(first.request_id, 'student', 'u1', 'ôn từ khoá lập trình cho lớp CNTT', 3);
  await msg.run(first.request_id, 'ai', 'Ban', 'Bấm gì?', 4);
  await msg.run(first.request_id, 'student', 'u1', 'bấm Bắt đầu, gõ từ, đúng thì cộng sao', 5);
  const candidate = { branch: 'ai-board/2026-09-26-feature-x', base_sha: 'a'.repeat(40), head_sha: 'b'.repeat(40),
    commits: [{ sha: 'b'.repeat(40), title: 't', files: ['public/tro-doan-tu.html', 'test/tro.test.js'] }] };
  await db.prepare(`INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, gate, idempotency_key, evidence_json, created_at, updated_at)
    VALUES (?, 1, 'plan', 'ready_for_pr', 5.5, 'brief-run-001', ?, 1, 1)`).run(first.root_ticket_id, JSON.stringify({ verdict: { candidate } }));

  const brief = await store.folderBrief(first.folder_id);
  assert.match(brief.text, /Mục đích: ôn từ khoá lập trình/);
  assert.match(brief.text, /Luồng người dùng: bấm Bắt đầu/);
  assert.match(brief.text, /Đang yêu cầu:\n- Thêm bảng điểm cuối ván/);
  assert.match(brief.text, /Đã làm \(mới nhất trước\):\n- Trò đoán từ khoá/);
  assert.deepEqual(brief.owned_files, ['public/tro-doan-tu.html']); // test files are not owned
  assert.match(brief.recent, /\[#2\] Thêm bảng điểm cuối ván/);
  assert.ok(brief.text.length <= LIMITS.context.brief_chars && brief.recent.length <= LIMITS.context.recent_chars);
  assert.equal(second.folder_id, first.folder_id);

  // Many done runs: newest kept, older counted, never over the cap.
  for (let i = 0; i < 60; i += 1) {
    const r = await submit(1, { folderId: first.folder_id, title: `Việc số ${i} với một tiêu đề khá dài để chiếm chỗ` });
    await db.prepare(`INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, gate, idempotency_key, evidence_json, created_at, updated_at)
      VALUES (?, 1, 'plan', 'ready_for_pr', 5.5, ?, ?, 1, 1)`).run(r.root_ticket_id, `brief-run-${100 + i}`, JSON.stringify({ verdict: { candidate } }));
  }
  const big = await store.folderBrief(first.folder_id);
  assert.ok(big.text.length <= LIMITS.context.brief_chars);
  assert.match(big.text, /Việc số 59/);
  assert.match(big.text, /việc cũ hơn đã làm/);
});

// Lifecycle.
test('an idle folder is archived after the configured days; the owner can reopen it into a new cycle', async () => {
  const { db, store, submit } = await fixture();
  const { folder_id: id } = await submit(1, { type: 'feature' });
  await db.prepare("UPDATE ai_feature_folders SET branch='ai-board/2026-09-26-feature-x', head_sha=?, approved_at=1 WHERE id=?")
    .run('b'.repeat(40), id);
  const day = 24 * 3600_000;
  const later = Date.now() + (LIMITS.folder_archive_days.value + 1) * day;
  assert.equal(await store.archiveStaleFolders(Date.now()), 0);
  assert.equal(await store.archiveStaleFolders(later), 1);
  const row = await db.prepare('SELECT state, branch, cycle FROM ai_feature_folders WHERE id=?').get(id);
  assert.deepEqual({ ...row }, { state: 'archived', branch: null, cycle: 2 });
  const event = JSON.parse((await db.prepare("SELECT internal_detail FROM ai_events WHERE event_type='folder_archived'").get()).internal_detail);
  assert.equal(event.unmerged_branch, 'ai-board/2026-09-26-feature-x'); // left for cleanup on GitHub
  assert.equal((await store.listFolders(1, 'it')).mine[0].state, 'archived'); // the owner still sees it
  assert.equal((await store.listFolders(2, 'it')).school.length, 0); // classmates do not
  await assert.rejects(async () => submit(1, { folderId: id }), /Không tìm thấy chức năng/);
  await assert.rejects(async () => store.reopenFolder(id, 2), (e) => e.code === 'folder_not_found');
  assert.equal((await store.reopenFolder(id, 1)).state, 'active');
  assert.ok((await submit(1, { folderId: id, title: 'Làm tiếp sau khi mở lại' })).folder_id);
});

test('archiving frees a slot; reopening respects the open-folder cap', async () => {
  const { store, submit } = await fixture();
  const ids = [];
  for (let i = 0; i < LIMITS.open_folders_per_user.value; i += 1) ids.push((await submit(1, { type: 'feature' })).folder_id);
  await assert.rejects(async () => submit(1, { type: 'feature' }), /chức năng chưa xong/);
  await store.archiveFolder(ids[0], 1);
  const fresh = (await submit(1, { type: 'feature' })).folder_id;
  assert.ok(fresh);
  await assert.rejects(async () => store.reopenFolder(ids[0], 1), (e) => e.code === 'folder_limit');
});
