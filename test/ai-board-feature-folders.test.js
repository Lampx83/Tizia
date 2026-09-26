// Feature-folders ticket 04: a "new feature" request opens a folder; follow-ups go into it; the admin approves
// the folder once, after which its surface plans run without waiting.
import test from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, LIMITS } from '../server/ai-board/store.js';
import { nextStep, FEATURE_QUESTIONS } from '../server/contexts/ai-board-intake/clarify.js';

function fixture() {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'x',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'an', 'An', 'student', 'it'), (2, 'binh', 'Bình', 'student', 'it'), (9, 'ad', 'Ad', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  let n = 0;
  const submit = (owner, extra = {}) => store.createRequestWithRoot({
    ownerUserId: owner, ownerDomain: 'it', ownerDisplayName: `u${owner}`,
    idempotencyKey: `folder-request-${String(++n).padStart(3, '0')}`, title: `Trò đoán từ khoá lập trình ${n}`,
    detail: 'fixture', ...extra,
  });
  // Plan 1 bước mặt bằng (public.ui) cho root vừa tạo, như worker gửi lên.
  const plan = (rootId) => {
    const ticket = store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
    assert.equal(ticket.id, rootId);
    const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
    const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: `folder-run-${rootId}` });
    const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
      acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
    const out = store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: `folder-plan-${rootId}`,
      plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
        capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
    store.releaseLease(ticket.id, { ...lease, outcome: 'planned', idempotencyKey: `folder-release-${rootId}` });
    return out;
  };
  const rootState = (id) => ({ ...db.prepare('SELECT status, internal_reason FROM ai_tickets WHERE id=?').get(id) });
  return { db, store, submit, plan, rootState };
}

test('a new-feature request opens a folder; follow-ups attach to it; strangers cannot', () => {
  const { store, submit } = fixture();
  const first = submit(1, { type: 'feature' });
  assert.ok(first.folder_id);
  const follow = submit(1, { folderId: first.folder_id, title: 'Thêm bảng xếp hạng' });
  assert.equal(follow.folder_id, first.folder_id);
  assert.throws(() => submit(2, { folderId: first.folder_id }), /Không tìm thấy chức năng/);
  const { mine, school } = store.listFolders(1, 'it');
  assert.equal(mine.length, 1);
  assert.equal(mine[0].requests, 2);
  assert.equal(store.listFolders(2, 'it').school[0].id, first.folder_id);
  assert.equal(school.length, 0);
  assert.ok(!('owner_user_id' in store.listFolders(2, 'it').school[0]), 'owner id not exposed to others');
});

test('open folders are capped per person', () => {
  const { submit } = fixture();
  for (let i = 0; i < LIMITS.open_folders_per_user.value; i += 1) submit(1, { type: 'feature' });
  assert.throws(() => submit(1, { type: 'feature' }), /chức năng chưa xong/);
});

test('a folder plan waits for the admin once; after approval later plans run on their own', () => {
  const { store, submit, plan, rootState } = fixture();
  const first = submit(1, { type: 'feature' });
  assert.equal(plan(first.root_ticket_id).status, 'waiting_authorization');
  assert.deepEqual(rootState(first.root_ticket_id), { status: 'waiting_authorization', internal_reason: 'folder_not_approved' });

  assert.equal(store.approveFolder(first.folder_id, 9).authorized, 1);
  assert.equal(rootState(first.root_ticket_id).status, 'queued');
  const [row] = store.listAdminFolders();
  assert.equal(row.approved, true);
  assert.equal(row.state, 'active');

  const next = submit(1, { folderId: first.folder_id, title: 'Thêm bảng xếp hạng' });
  store.db.prepare("UPDATE ai_tickets SET status='done' WHERE id=?").run(first.root_ticket_id); // out of the way
  assert.equal(plan(next.root_ticket_id).status, 'planned');

  store.revokeFolder(first.folder_id);
  const third = submit(1, { folderId: first.folder_id, title: 'Thêm âm thanh' });
  store.db.prepare("UPDATE ai_tickets SET status='done' WHERE id=?").run(next.root_ticket_id);
  assert.equal(plan(third.root_ticket_id).status, 'waiting_authorization');
});

test('a person can vote a classmate\'s folder once, not their own', () => {
  const { store, submit } = fixture();
  const { folder_id: id } = submit(1, { type: 'feature' });
  assert.equal(store.voteFolder(id, 2).votes, 1);
  assert.equal(store.voteFolder(id, 2).votes, 1);
  assert.throws(() => store.voteFolder(id, 1), (e) => e.code === 'own_folder');
});

test('feature grilling asks exactly the three topics, with no early stop', () => {
  assert.deepEqual(nextStep({ asked: 1, rulesClear: true, mode: 'feature' }), { kind: 'question', mode: 'feature' });
  assert.deepEqual(nextStep({ asked: FEATURE_QUESTIONS, mode: 'feature' }), { kind: 'summary', complete: true });
  assert.deepEqual(nextStep({ asked: 1, rulesClear: true }), { kind: 'summary', complete: true }); // loose request unchanged
});

test('each feature turn names exactly its own topic', async () => {
  const { questionPrompt } = await import('../server/contexts/ai-board-intake/clarify.js');
  const request = { title: 'Trò đoán từ', detail: 'x' };
  const p1 = questionPrompt({ request, turns: [], techLevel: 'some', mode: 'feature', turn: 1 });
  const p3 = questionPrompt({ request, turns: [], techLevel: 'some', mode: 'feature', turn: 3 });
  assert.match(p1, /CHỈ hỏi về: chức năng này để làm gì/);
  assert.match(p3, /CHỈ hỏi về: chức năng này giống chức năng nào/);
});

// Feature-folders ticket 05: one branch + one draft PR per folder cycle.
test('a folder cycle keeps its branch head and PR; done then released starts a new cycle', () => {
  const { db, store, submit } = fixture();
  const first = submit(1, { type: 'feature' });
  store.approveFolder(first.folder_id, 9);
  const ticket = store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'cycle-run-001' });
  assert.equal(store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token).folder.branch, null);
  const step = { order: 1, title: 'Trang mới', description: 'x', allowed_scope: ['public/tro-doan-tu.html'],
    acceptance: ['a'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  store.submitPlan(ticket.id, { ...lease, runId: run.id, budgetUsed: 10, idempotencyKey: 'cycle-plan-001',
    plan: { domain: 'it', goal: 'g', allowed_scope: step.allowed_scope, acceptance: step.acceptance, tests: step.tests,
      capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] } });
  const branch = 'ai-board/2026-09-26-feature-tro-doan-tu';
  const candidate = { branch, base_sha: 'a'.repeat(40), head_sha: 'b'.repeat(40),
    commits: [{ sha: 'b'.repeat(40), title: 'ai-board(ticket-1): 1/1 Trang mới', files: ['public/tro-doan-tu.html', 'test/t.test.js'] }] };
  const gates = [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [] },
    { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false },
    { gate: 5.5, blocked: false, reason: null, risk_level: 'low', risk_signals: [] }];
  store.submitPrePrVerdict(ticket.id, { ...lease, runId: run.id, idempotencyKey: 'cycle-verdict-001', verdict: {
    outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 20, failure_class: null, repairs: [], candidate, gates } });
  store.recordPullRequest(ticket.id, { ...lease, runId: run.id, idempotencyKey: 'cycle-pr-001', pullRequest: {
    number: 7, url: 'https://github.com/Lampx83/Tizia/pull/7', branch, base: 'dev', base_sha: candidate.base_sha,
    head_sha: candidate.head_sha } });
  const snap = store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token).folder;
  assert.deepEqual({ branch: snap.branch, head: snap.head_sha, pr: snap.pr_number }, { branch, head: 'b'.repeat(40), pr: 7 });
  assert.equal(store.listFolders(1, 'it').mine[0].has_change, true);
  assert.ok(!JSON.stringify(store.listFolders(2, 'it')).includes(branch), 'branch is admin-only');
  assert.equal(store.listAdminFolders()[0].trace_ref.pr_number, 7);

  assert.throws(() => store.markFolderDone(first.folder_id, 2), (e) => e.code === 'folder_not_found');
  assert.equal(store.markFolderDone(first.folder_id, 1).state, 'awaiting_merge');
  assert.equal(store.markFolderReleased(first.folder_id).state, 'released');
  const after = db.prepare('SELECT branch, pr_number, cycle, state FROM ai_feature_folders WHERE id=?').get(first.folder_id);
  assert.deepEqual({ ...after }, { branch: null, pr_number: null, cycle: 2, state: 'released' });
  assert.throws(() => store.markFolderReleased(first.folder_id), (e) => e.code === 'nothing_to_release');
});
