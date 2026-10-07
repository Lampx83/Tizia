// Blocked-verdict consequences (repair child, critical alert, budget
// exhaustion + reasoned admin extension) and the kept candidate branch.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';
import { LIMITS, scaledLimit, WorkerContractError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';

const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);
// Per-run cap after a 1-step plan (contract.json limits.per_run.units) and the extension ceiling.
const RUN = scaledLimit('units', 1);
const CEIL = LIMITS.per_run.units.max;

async function plannedRoot() {
  const db = await openBoard({ users: [
    [1, 'lan', 'Lan', 'student', 'pharmacy'],
    [9, 'admin', 'Admin', 'admin', null],
  ] });
  const store = createAsyncAiBoardStore(db.d);
  await store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'outcome-request-001', title: 'Sửa trang giới thiệu', detail: 'fixture',
  });
  const ticket = await store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'outcome-run-001' });
  const step = {
    order: 1, title: 'Sửa trang giới thiệu', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'],
  };
  await store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'outcome-plan-001',
    plan: {
      domain: 'pharmacy', goal: 'Sửa trang giới thiệu.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step],
    },
  });
  const submit = async (verdict, key = 'outcome-verdict-001') => store.submitPrePrVerdict(ticket.id, {
    ...lease, runId: run.id, verdict, idempotencyKey: key,
  });
  return { db, store, ticket, submit };
}

const gates = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } }, runner: 'docker', retried: false },
  55: { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
};

function blocked(gate, reason, failureClass, extra = {}) {
  const seq = [gates[3], gates[4], gates[5]].filter((g) => g.gate < gate);
  return {
    outcome: 'blocked', gate_reached: gate, reason, budget_used: 80, failure_class: failureClass,
    repairs: [], candidate: null, gates: [...seq, { gate, blocked: true, reason, issues: [] }], ...extra,
  };
}

const candidate = {
  branch: 'ai-board/2026-09-24-ticket-1', base_sha: SHA_A, head_sha: SHA_B,
  commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 Sửa trang giới thiệu', files: ['public/gioi-thieu.html', 'test/p.test.js'] }],
};

function passing(extra = {}) {
  return {
    outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 80, failure_class: null,
    repairs: [], candidate, gates: [gates[3], gates[4], gates[5], gates[55]], ...extra,
  };
}

test('a repaired verdict records one review_fix child after the ordered children', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(passing({ repairs: [{ gate: 5, reason: 'generated tests failed' }] }));
  const children = await db.prepare(`
    SELECT kind, sequence, status, internal_reason FROM ai_tickets WHERE parent_id=? ORDER BY sequence
  `).all(ticket.id);
  assert.deepEqual(children.map((c) => [c.kind, c.sequence]), [['implementation', 1], ['review_fix', 2]]);
  assert.equal(children[1].status, 'done');
  assert.equal(children[1].internal_reason, 'generated tests failed');
  const tag = await db.prepare(`SELECT tag FROM ai_ticket_tags t JOIN ai_tickets a ON a.id=t.ticket_id WHERE a.kind='review_fix'`).get();
  assert.equal(tag.tag, 'repair');
  const stored = JSON.parse((await db.prepare('SELECT evidence_json FROM ai_runs').get()).evidence_json).verdict;
  assert.equal(stored.candidate.branch, 'ai-board/2026-09-24-ticket-1');
});

test('admin rollback needs the typed request number, waits for a free lease, and only an active worker runs it', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await submit(passing());
  await assert.rejects(async () => store.requestRollback(1, { adminUserId: 9, confirm: '1' }), (e) => e.code === 'ticket_busy');
  await store.releaseLease(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, outcome: 'planned',
    idempotencyKey: 'outcome-release-001' });
  await assert.rejects(async () => store.requestRollback(1, { adminUserId: 9, confirm: '2' }), (e) => e.code === 'confirmation_required');
  assert.equal((await store.requestRollback(1, { adminUserId: 9, confirm: '#1' })).branch, candidate.branch);
  assert.equal((await store.requestRollback(1, { adminUserId: 9, confirm: '1' })).duplicate, true);

  assert.equal(await store.claimNext({ workerId: 'w1', mode: 'shadow', intent: 'plan' }), null);
  const claim = await store.claimNext({ workerId: 'w1', mode: 'active', intent: 'plan' });
  assert.equal(claim.phase, 'rolling_back');
  assert.equal(claim.trigger, 'rollback');
  const lease = { workerId: 'w1', leaseToken: claim.lease_token };
  assert.equal((await store.getLeasedSnapshot(ticket.id, 'w1', claim.lease_token)).rollback_candidate.branch, candidate.branch);
  const run = await store.createRun(ticket.id, { ...lease, trigger: 'rollback', idempotencyKey: 'outcome-rollback-run' });
  await assert.rejects(async () => store.submitRollback(ticket.id, { ...lease, runId: run.id, outcome: 'revert_ready',
    revert: { branch: 'main' } }), /candidate/);
  assert.equal((await store.submitRollback(ticket.id, { ...lease, runId: run.id, outcome: 'discarded' })).phase, 'rolled_back');
  const root = await db.prepare('SELECT status, phase, lease_owner FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'cancelled', phase: 'rolled_back', lease_owner: null });
  assert.equal((await store.getRequestTrace(1)).runs.at(-1).rollback.outcome, 'discarded');
  const requester = (await store.listRequestsForOwner(1, 'pharmacy'))[0];
  assert.equal(requester.status, 'cancelled');
  assert.equal(requester.status_label, 'đã hoàn tác');
  assert.equal((await store.requestWorkflow(1)).phase, 'rolled_back');
  assert.equal((await db.prepare('SELECT status FROM requests WHERE id=1').get()).status, requester.status);
});

test('a passing verdict without an independent oracle is refused even with smoke and HTTP success', async () => {
  const { submit } = await plannedRoot();
  const verdict = passing();
  verdict.gates = verdict.gates.map((gate) => gate.gate === 5 ? { ...gate, functional: undefined } : gate);
  await assert.rejects(async () => submit(verdict), /successful smoke/);
});

test('rollback without a kept change is refused', async () => {
  const { store, submit, ticket } = await plannedRoot();
  await submit(blocked(4, 'lint', 'ordinary'));
  await store.releaseLease(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, outcome: 'planned',
    idempotencyKey: 'outcome-release-002' });
  await assert.rejects(async () => store.requestRollback(1, { adminUserId: 9, confirm: '1' }), (e) => e.code === 'nothing_to_rollback');
});

test('a passing verdict needs gate 5 to have run on real docker', async () => {
  for (const runner of ['fake', undefined]) {
    const { submit } = await plannedRoot();
    const fake = { ...gates[5], runner };
    await assert.rejects(async () => submit(passing({ gates: [gates[3], gates[4], fake, gates[55]] })), /docker/);
    await assert.rejects(async () => submit(passing({ outcome: 'needs_review', gates: [gates[3], gates[4], fake,
      { ...gates[55], risk_level: 'high' }] })), /docker/);
  }
  const { submit } = await plannedRoot();
  await assert.doesNotReject(async () => submit(passing()));
});

test('more than one repair per verdict is rejected', async () => {
  const { submit } = await plannedRoot();
  const twice = [{ gate: 5, reason: 'a' }, { gate: 4, reason: 'b' }];
  await assert.rejects(async () => submit(blocked(5, 'x', 'ordinary', { repairs: twice })), /repairs/);
});

test('critical boundary violation stops the root and opens a critical alert', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await submit(blocked(4, "import cấm: '../../db.js'", 'critical'));
  const root = await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'critical_violation' });
  const alert = await db.prepare('SELECT ticket_id, severity, category, status, internal_detail FROM ai_alerts').get();
  assert.deepEqual({ ...alert }, {
    ticket_id: ticket.id, severity: 'critical', category: 'boundary_violation', status: 'open',
    internal_detail: "import cấm: '../../db.js'",
  });
  assert.equal((await store.listAdminQueue())[0].open_alerts, 1);
  assert.equal((await db.prepare(`SELECT COUNT(*) n FROM ai_tickets WHERE kind='review_fix'`).get()).n, 0);
});

test('an ordinary block keeps the root planned with no alert', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(blocked(5, 'generated tests failed', 'ordinary'));
  assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id)).status, 'planned');
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_alerts').get()).n, 0);
});

// transient (self-improve: tự chạy lại) — mặc định tắt (không có dòng ai_transient_retry_state) → waiting_admin;
// hành vi bật xem test/ai-board-transient-retry.test.js.
test('a transient block with auto-retry off waits for the admin, with no alert', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(blocked(5, 'ollama 500', 'transient'));
  const root = await db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'transient_blocked' });
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_alerts').get()).n, 0);
});

test('a plan-class failure waits for the admin as plan_unfit, with no repair child or alert', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await submit(blocked(5, 'change touches no public file', 'plan'));
  const root = await db.prepare('SELECT status, phase, internal_reason FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'plan_unfit', internal_reason: 'change touches no public file' });
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM ai_alerts').get()).n, 0);
  assert.equal((await db.prepare(`SELECT COUNT(*) n FROM ai_tickets WHERE kind='review_fix'`).get()).n, 0);
});

test('budget exhaustion waits for a reasoned admin extension', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await submit(blocked(3, 'budget exhausted', 'budget'));
  let root = await db.prepare('SELECT status, phase, budget_limit, auto_rounds FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'budget_exhausted', budget_limit: RUN, auto_rounds: 1 });

  for (const bad of [{ amount: 80, reason: '' }, { amount: 0, reason: 'đủ lý do dài hơn mười ký tự' },
    { amount: 500, reason: 'đủ lý do dài hơn mười ký tự' }]) {
    await assert.rejects(async () => store.extendBudget(ticket.id, { ...bad, adminUserId: 9 }), WorkerContractError);
  }
  await store.extendBudget(ticket.id, { amount: 80, reason: 'Fixture cần thêm một vòng sửa lỗi.', adminUserId: 9 });
  root = await db.prepare('SELECT status, phase, budget_limit, auto_rounds FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'queued', phase: 'needs_replan', budget_limit: RUN + 80, auto_rounds: 0 });
  const event = await db.prepare(`SELECT actor_type, actor_id, internal_detail FROM ai_events WHERE event_type='budget_extended'`).get();
  assert.equal(event.actor_type, 'admin');
  assert.equal(event.actor_id, '9');
  assert.deepEqual(JSON.parse(event.internal_detail), {
    amount: 80, reason: 'Fixture cần thêm một vòng sửa lỗi.', relaxed: 'run_budget_exhausted',
  });
  // Only a budget-exhausted root can be extended.
  await assert.rejects(async () => store.extendBudget(ticket.id, { amount: 10, reason: 'lần hai không hợp lệ', adminUserId: 9 }),
    (error) => error.code === 'not_budget_exhausted');
});

const REASON = 'Cho phép thêm một vòng xử lý.';
const exhaust = async (db, id, why = 'run_budget_exhausted') => (await db.prepare(
  `UPDATE ai_tickets SET status='waiting_admin', phase='budget_exhausted', internal_reason=? WHERE id=?`).run(why, id));

test('an automatic-round extension records that the round limit was relaxed', async () => {
  const { db, store, ticket } = await plannedRoot();
  await exhaust(db, ticket.id, 'automatic_round_limit');
  await store.extendBudget(ticket.id, { amount: 40, reason: REASON, adminUserId: 9 });
  const detail = JSON.parse((await db.prepare(`SELECT internal_detail FROM ai_events WHERE event_type='budget_extended'`).get()).internal_detail);
  assert.equal(detail.relaxed, 'automatic_round_limit');
});

test('a third extension hands the root to a human permanently', async () => {
  const { db, store, ticket } = await plannedRoot();
  for (const limit of [RUN + 200, RUN + 400]) {
    await exhaust(db, ticket.id);
    assert.deepEqual(await store.extendBudget(ticket.id, { amount: 200, reason: REASON, adminUserId: 9 }),
      { ok: true, status: 'queued', budget_limit: limit });
  }
  await exhaust(db, ticket.id);
  const refused = await store.extendBudget(ticket.id, { amount: 1, reason: REASON, adminUserId: 9 });
  assert.deepEqual(refused, { ok: false, status: 'human_owned', budget_limit: RUN + 400, reason: 'extension_count_ceiling' });
  const root = await db.prepare('SELECT status, phase, budget_limit FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'human_owned', phase: 'budget_ceiling', budget_limit: RUN + 400 });
  // A requester clarification cannot reopen it; a later attempt needs a new request.
  assert.equal(await store.invalidatePlanForRequest(1, 'thêm chi tiết'), false);
  const { plan_hash: planHash } = await db.prepare('SELECT plan_hash FROM ai_plans WHERE root_ticket_id=?').get(ticket.id);
  await assert.rejects(async () => store.authorizePlan(ticket.id, planHash, 9), (error) => error.code === 'budget_ceiling');
  assert.equal((await db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id)).status, 'human_owned');
});

test('an extension past the unit ceiling hands the root to a human', async () => {
  const { db, store, ticket } = await plannedRoot();
  await db.prepare('UPDATE ai_tickets SET budget_limit=? WHERE id=?').run(CEIL - 100, ticket.id);
  await exhaust(db, ticket.id);
  const refused = await store.extendBudget(ticket.id, { amount: 150, reason: REASON, adminUserId: 9 });
  assert.deepEqual(refused, { ok: false, status: 'human_owned', budget_limit: CEIL - 100, reason: 'budget_limit_ceiling' });
  assert.equal((await db.prepare(`SELECT COUNT(*) n FROM ai_events WHERE event_type='budget_extended'`).get()).n, 0);
});

test('verdict budget is checked per run against the extended limit, not a fixed number', async () => {
  const { db, submit, ticket } = await plannedRoot();
  await assert.rejects(async () => submit(passing({ budget_used: RUN - 40 + 1 })), (error) => error.code === 'run_budget_exhausted');
  await db.prepare('UPDATE ai_tickets SET budget_limit=? WHERE id=?').run(RUN + 80, ticket.id);
  assert.equal((await submit(passing({ budget_used: RUN + 40 }), 'outcome-verdict-002')).outcome, 'ready_for_pr');
});

test('one run budget covers plan plus execution: the server adds the run\'s plan spend to the verdict', async () => {
  const { db, submit } = await plannedRoot(); // plan spent 40 in this run, limit RUN
  await assert.rejects(async () => submit(passing({ budget_used: RUN - 40 + 1 })), (error) => error.code === 'run_budget_exhausted' && error.status === 409);
  assert.equal((await submit(passing({ budget_used: RUN - 40 }), 'outcome-verdict-002')).outcome, 'ready_for_pr');
  const evidence = JSON.parse((await db.prepare('SELECT evidence_json FROM ai_runs').get()).evidence_json);
  assert.equal(evidence.plan_budget, 40);
  assert.equal(evidence.verdict.budget_used, RUN - 40, 'verdict budget stays execution-only');
});

test('candidate metadata is validated and only allowed on a passing verdict', async () => {
  const { submit } = await plannedRoot();
  await assert.rejects(async () => submit(passing({ candidate: { ...candidate, branch: 'feat/human-branch' } })), /candidate/);
  await assert.rejects(async () => submit(passing({ candidate: { ...candidate, head_sha: SHA_A } })), /candidate/);
  await assert.rejects(async () => submit(blocked(5, 'x', 'ordinary', { candidate })), /candidate/);
  await assert.rejects(async () => submit(passing({ failure_class: 'ordinary' })), /failure/);
  await assert.rejects(async () => submit(blocked(5, 'x', 'bogus')), /failure/);
});

test('admin budget extension route requires admin and strict CSRF', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await submit(blocked(3, 'budget exhausted', 'budget'));
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    if (req.headers['x-test-user'] === '9') req.user = { id: 9, role: 'admin' };
    if (req.headers['x-test-user'] === '1') req.user = { id: 1, role: 'student', enrolled_domain: 'pharmacy' };
    next();
  });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => req.user ? next() : res.status(401).end(),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }),
    requireStrictCsrf: (req, res, next) => req.headers['x-csrf-token'] === 'ok' ? next() : res.status(403).json({ error: 'csrf_failed' }),
  });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/admin/ai-board/tickets/${ticket.id}/extend-budget`;
  const send = (headers, body) => fetch(url, {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
  });
  try {
    const body = { amount: 40, reason: 'Cho phép thêm một vòng thử.' };
    assert.equal((await send({ 'x-test-user': '1', 'x-csrf-token': 'ok' }, body)).status, 403);
    assert.equal((await send({ 'x-test-user': '9' }, body)).status, 403);
    assert.equal((await send({ 'x-test-user': '9', 'x-csrf-token': 'ok' }, { amount: 40 })).status, 400);
    const ok = await send({ 'x-test-user': '9', 'x-csrf-token': 'ok' }, body);
    assert.equal(ok.status, 200);
    assert.equal((await ok.json()).budget_limit, RUN + 40);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  }
});

test('a passing verdict must name its candidate and budget must be whole units', async () => {
  const { submit } = await plannedRoot();
  await assert.rejects(async () => submit(passing({ candidate: null })), /candidate/);
  await assert.rejects(async () => submit(passing({ budget_used: 40.5 })), /budget/);
});

test('releasing after a critical stop keeps the violation reason on the root', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  await submit(blocked(4, "import cấm: '../../db.js'", 'critical'));
  await store.releaseLease(ticket.id, {
    workerId: 'w1', leaseToken: ticket.lease_token, outcome: 'planned', idempotencyKey: 'outcome-release-001',
  });
  const root = await db.prepare('SELECT status, internal_reason, lease_owner FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', internal_reason: "import cấm: '../../db.js'", lease_owner: null });
});

test('gate 4 records which mandatory checks ran', async () => {
  const { submit } = await plannedRoot();
  const checks = ['secret', 'pii', 'injection', 'content', 'test_removal', 'protected_path', 'python_syntax'];
  const verdict = await submit(passing({ gates: [gates[3], { ...gates[4], checks }, gates[5], gates[55]] }));
  assert.deepEqual(verdict.gates[1].checks, checks);
});

// (e2e/06): one PR into dev per root, recorded under the lease, safe state for the requester.
const PR = { number: 42, url: 'https://github.com/Lampx83/Tizia/pull/42', branch: candidate.branch,
  base: 'dev', base_sha: SHA_A, head_sha: SHA_B };

async function openPr(store, ticket, pullRequest = PR, key = 'outcome-pr-001') {
  const runId = (await store.db.get('SELECT id FROM ai_runs WHERE ticket_id=? ORDER BY id DESC', [ticket.id])).id;
  return await store.recordPullRequest(ticket.id, { workerId: 'w1', leaseToken: ticket.lease_token, runId,
    pullRequest, idempotencyKey: key });
}

test('a passing verdict records its PR once; the requester sees reviewing, the admin sees the link', async () => {
  const { db, store, submit, ticket } = await plannedRoot();
  const gate5Evidence = 'docker compose up: exit 0';
  await submit(passing({ gates: [gates[3], gates[4], { ...gates[5], evidence: { text: gate5Evidence } }, gates[55]] }));
  assert.equal((await openPr(store, ticket)).number, 42);
  assert.equal((await openPr(store, ticket)).number, 42); // same PR again is idempotent
  const root = await db.prepare('SELECT phase, public_note FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.equal(root.phase, 'pr_open');
  const [own] = await store.listRequestsForOwner(1, 'pharmacy');
  assert.equal(own.status, 'reviewing');
  assert.ok(!JSON.stringify(own).includes('github.com'));
  const trace = await store.getRequestTrace(1);
  assert.equal(trace.pull_request.url, PR.url);
  assert.equal(trace.runs.at(-1).gates.find((g) => g.gate === 5).evidence.text, gate5Evidence);
  assert.equal(trace.runs.at(-1).gates.find((g) => g.gate === 5.5).evidence.risk_level, 'medium');
  assert.equal((await store.getLeasedSnapshot(ticket.id, 'w1', ticket.lease_token)).pull_request.number, 42);
});

test('a second PR for the same root, a wrong base, or a stale head is refused', async () => {
  const { store, submit, ticket } = await plannedRoot();
  await submit(passing());
  await assert.rejects(async () => openPr(store, ticket, { ...PR, base: 'main' }, 'outcome-pr-002'), /dev/);
  await assert.rejects(async () => openPr(store, ticket, { ...PR, head_sha: 'c'.repeat(40) }, 'outcome-pr-003'), /candidate/);
  await assert.rejects(async () => openPr(store, ticket, { ...PR, url: 'https://evil.example/pull/42' }, 'outcome-pr-004'), /url/);
  await openPr(store, ticket);
  await assert.rejects(async () => openPr(store, ticket, { ...PR, number: 43, url: PR.url.replace('42', '43') }, 'outcome-pr-005'),
    (e) => e.code === 'pr_already_open');
});

test('a blocked verdict never gets a PR', async () => {
  const { store, submit, ticket } = await plannedRoot();
  await submit(blocked(4, 'lint', 'ordinary'));
  await assert.rejects(async () => openPr(store, ticket), /passing verdict/);
});

// Branch · commit · PR for tracing, admin APIs only.
test('the trace ref (branch, commit, PR) reaches admin views but never the requester', async () => {
  const { store, submit, ticket } = await plannedRoot();
  const [before] = await store.listAdminQueue();
  assert.equal(before.trace_ref, null); // nothing produced yet
  await submit(passing());
  let [row] = await store.listAdminQueue();
  assert.deepEqual(row.trace_ref, { branch: candidate.branch, head_sha: candidate.head_sha, pr_number: null, pr_url: null });
  await openPr(store, ticket);
  [row] = await store.listAdminQueue();
  assert.deepEqual(row.trace_ref, { branch: PR.branch, head_sha: PR.head_sha, pr_number: 42, pr_url: PR.url });
  const trace = await store.getRequestTrace(1);
  assert.deepEqual(trace.trace_ref, row.trace_ref);
  assert.equal(trace.runs.at(-1).commit.head_sha, candidate.head_sha); // commit of that run
  const own = JSON.stringify(await store.listRequestsForOwner(1, 'pharmacy'));
  for (const secret of [candidate.branch, candidate.head_sha, PR.url]) assert.ok(!own.includes(secret), secret);
});

const withProbe = (functional) => passing({ gates: [gates[3], gates[4], { ...gates[5], functional }, gates[55]] });

test('a passing verdict needs a known harness oracle with every coverage flag that oracle declares', async () => {
  const text = { probe_id: 'text-visible-v1', passed: true, coverage: { rendered_text: true } };
  assert.equal((await (await plannedRoot()).submit(withProbe(text))).outcome, 'ready_for_pr');
  for (const bad of [
    { ...text, probe_id: 'made-up-by-the-model-v1' },
    { ...text, coverage: { rendered_text: false } },
    { ...text, coverage: { requester_api: true, mounted_ui: true, recovery: true } },
    { ...text, passed: false },
  ]) await assert.rejects(async () => (await plannedRoot()).submit(withProbe(bad)), /passing verdict requires successful smoke/);
});

test('the copy and search oracles are trusted only with their own coverage flag', async () => {
  for (const [probe_id, flag] of [['copy-response-v1', 'clipboard'], ['search-activity-v1', 'filtering']]) {
    const ok = { probe_id, passed: true, coverage: { [flag]: true } };
    assert.equal((await (await plannedRoot()).submit(withProbe(ok))).outcome, 'ready_for_pr', probe_id);
    await assert.rejects(async () => (await plannedRoot()).submit(withProbe({ ...ok, coverage: { rendered_text: true } })), /passing verdict requires successful smoke/);
  }
});
