// Ticket 05: blocked-verdict consequences (repair child, critical alert, budget
// exhaustion + reasoned admin extension) and the kept candidate branch.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, WorkerContractError } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';

const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);

function plannedRoot() {
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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy'), (9, 'admin', 'Admin', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'outcome-request-001', title: 'Sửa trang giá', detail: 'fixture',
  });
  const ticket = store.claimNext({ workerId: 'w1', version: 'test', mode: 'active', intent: 'plan' });
  const lease = { workerId: 'w1', leaseToken: ticket.lease_token };
  const run = store.createRun(ticket.id, { ...lease, trigger: 'plan', idempotencyKey: 'outcome-run-001' });
  const step = {
    order: 1, title: 'Sửa trang giá', description: 'Đổi 1 dòng.', allowed_scope: ['public/pricing.html'],
    acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'],
  };
  store.submitPlan(ticket.id, {
    ...lease, runId: run.id, budgetUsed: 40, idempotencyKey: 'outcome-plan-001',
    plan: {
      domain: 'pharmacy', goal: 'Sửa trang giá.', allowed_scope: step.allowed_scope, acceptance: step.acceptance,
      tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step],
    },
  });
  const submit = (verdict, key = 'outcome-verdict-001') => store.submitPrePrVerdict(ticket.id, {
    ...lease, runId: run.id, verdict, idempotencyKey: key,
  });
  return { db, store, ticket, submit };
}

const gates = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false },
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
  commits: [{ sha: SHA_B, title: 'ai-board(ticket-1): 1/1 Sửa trang giá', files: ['public/pricing.html', 'test/p.test.js'] }],
};

function passing(extra = {}) {
  return {
    outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 80, failure_class: null,
    repairs: [], candidate, gates: [gates[3], gates[4], gates[5], gates[55]], ...extra,
  };
}

test('a repaired verdict records one review_fix child after the ordered children', () => {
  const { db, submit, ticket } = plannedRoot();
  submit(passing({ repairs: [{ gate: 5, reason: 'generated tests failed' }] }));
  const children = db.prepare(`
    SELECT kind, sequence, status, internal_reason FROM ai_tickets WHERE parent_id=? ORDER BY sequence
  `).all(ticket.id);
  assert.deepEqual(children.map((c) => [c.kind, c.sequence]), [['implementation', 1], ['review_fix', 2]]);
  assert.equal(children[1].status, 'done');
  assert.equal(children[1].internal_reason, 'generated tests failed');
  const tag = db.prepare(`SELECT tag FROM ai_ticket_tags t JOIN ai_tickets a ON a.id=t.ticket_id WHERE a.kind='review_fix'`).get();
  assert.equal(tag.tag, 'repair');
  const stored = JSON.parse(db.prepare('SELECT evidence_json FROM ai_runs').get().evidence_json).verdict;
  assert.equal(stored.candidate.branch, 'ai-board/2026-09-24-ticket-1');
});

test('a passing verdict needs gate 5 to have run on real docker', () => {
  for (const runner of ['fake', undefined]) {
    const { submit } = plannedRoot();
    const fake = { ...gates[5], runner };
    assert.throws(() => submit(passing({ gates: [gates[3], gates[4], fake, gates[55]] })), /docker/);
    assert.throws(() => submit(passing({ outcome: 'needs_review', gates: [gates[3], gates[4], fake,
      { ...gates[55], risk_level: 'high' }] })), /docker/);
  }
  const { submit } = plannedRoot();
  assert.doesNotThrow(() => submit(passing()));
});

test('more than one repair per verdict is rejected', () => {
  const { submit } = plannedRoot();
  const twice = [{ gate: 5, reason: 'a' }, { gate: 4, reason: 'b' }];
  assert.throws(() => submit(blocked(5, 'x', 'ordinary', { repairs: twice })), /repairs/);
});

test('critical boundary violation stops the root and opens a critical alert', () => {
  const { db, store, submit, ticket } = plannedRoot();
  submit(blocked(4, "import cấm: '../../db.js'", 'critical'));
  const root = db.prepare('SELECT status, phase FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'critical_violation' });
  const alert = db.prepare('SELECT ticket_id, severity, category, status, internal_detail FROM ai_alerts').get();
  assert.deepEqual({ ...alert }, {
    ticket_id: ticket.id, severity: 'critical', category: 'boundary_violation', status: 'open',
    internal_detail: "import cấm: '../../db.js'",
  });
  assert.equal(store.listAdminQueue()[0].open_alerts, 1);
  assert.equal(db.prepare(`SELECT COUNT(*) n FROM ai_tickets WHERE kind='review_fix'`).get().n, 0);
});

test('ordinary and transient blocks keep the root planned with no alert', () => {
  for (const failureClass of ['ordinary', 'transient']) {
    const { db, submit, ticket } = plannedRoot();
    submit(blocked(5, 'generated tests failed', failureClass));
    assert.equal(db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(ticket.id).status, 'planned');
    assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_alerts').get().n, 0);
  }
});

test('budget exhaustion waits for a reasoned admin extension', () => {
  const { db, store, submit, ticket } = plannedRoot();
  submit(blocked(3, 'budget exhausted', 'budget'));
  let root = db.prepare('SELECT status, phase, budget_limit, auto_rounds FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', phase: 'budget_exhausted', budget_limit: 200, auto_rounds: 1 });

  for (const bad of [{ amount: 80, reason: '' }, { amount: 0, reason: 'đủ lý do dài hơn mười ký tự' },
    { amount: 500, reason: 'đủ lý do dài hơn mười ký tự' }]) {
    assert.throws(() => store.extendBudget(ticket.id, { ...bad, adminUserId: 9 }), WorkerContractError);
  }
  store.extendBudget(ticket.id, { amount: 80, reason: 'Fixture cần thêm một vòng sửa lỗi.', adminUserId: 9 });
  root = db.prepare('SELECT status, phase, budget_limit, auto_rounds FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'queued', phase: 'needs_replan', budget_limit: 280, auto_rounds: 0 });
  const event = db.prepare(`SELECT actor_type, actor_id, internal_detail FROM ai_events WHERE event_type='budget_extended'`).get();
  assert.equal(event.actor_type, 'admin');
  assert.equal(event.actor_id, '9');
  assert.deepEqual(JSON.parse(event.internal_detail), { amount: 80, reason: 'Fixture cần thêm một vòng sửa lỗi.' });
  // Only a budget-exhausted root can be extended.
  assert.throws(() => store.extendBudget(ticket.id, { amount: 10, reason: 'lần hai không hợp lệ', adminUserId: 9 }),
    (error) => error.code === 'not_budget_exhausted');
});

test('verdict budget is checked against the extended limit, not a fixed 200', () => {
  const { db, submit, ticket } = plannedRoot();
  assert.throws(() => submit(passing({ budget_used: 200 })), (error) => error.code === 'cumulative_budget_exhausted');
  db.prepare('UPDATE ai_tickets SET budget_limit=280 WHERE id=?').run(ticket.id);
  assert.equal(submit(passing({ budget_used: 200 }), 'outcome-verdict-002').outcome, 'ready_for_pr');
});

test('candidate metadata is validated and only allowed on a passing verdict', () => {
  const { submit } = plannedRoot();
  assert.throws(() => submit(passing({ candidate: { ...candidate, branch: 'feat/human-branch' } })), /candidate/);
  assert.throws(() => submit(passing({ candidate: { ...candidate, head_sha: SHA_A } })), /candidate/);
  assert.throws(() => submit(blocked(5, 'x', 'ordinary', { candidate })), /candidate/);
  assert.throws(() => submit(passing({ failure_class: 'ordinary' })), /failure/);
  assert.throws(() => submit(blocked(5, 'x', 'bogus')), /failure/);
});

test('admin budget extension route requires admin and strict CSRF', async () => {
  const { db, store, submit, ticket } = plannedRoot();
  submit(blocked(3, 'budget exhausted', 'budget'));
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
    assert.equal((await ok.json()).budget_limit, 240);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    db.close();
  }
});

test('a passing verdict must name its candidate and budget must be whole units', () => {
  const { submit } = plannedRoot();
  assert.throws(() => submit(passing({ candidate: null })), /candidate/);
  assert.throws(() => submit(passing({ budget_used: 40.5 })), /budget/);
});

test('releasing after a critical stop keeps the violation reason on the root', () => {
  const { db, store, submit, ticket } = plannedRoot();
  submit(blocked(4, "import cấm: '../../db.js'", 'critical'));
  store.releaseLease(ticket.id, {
    workerId: 'w1', leaseToken: ticket.lease_token, outcome: 'planned', idempotencyKey: 'outcome-release-001',
  });
  const root = db.prepare('SELECT status, internal_reason, lease_owner FROM ai_tickets WHERE id=?').get(ticket.id);
  assert.deepEqual({ ...root }, { status: 'waiting_admin', internal_reason: "import cấm: '../../db.js'", lease_owner: null });
});

test('gate 4 records which mandatory checks ran', () => {
  const { submit } = plannedRoot();
  const checks = ['secret', 'pii', 'injection', 'content', 'test_removal', 'protected_path', 'python_syntax'];
  const verdict = submit(passing({ gates: [gates[3], { ...gates[4], checks }, gates[5], gates[55]] }));
  assert.deepEqual(verdict.gates[1].checks, checks);
});
