import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';

function surfacePlan() {
  return {
    domain: 'pharmacy', goal: 'Tạo trang demo học tập tĩnh.',
    allowed_scope: ['public/pharmacy/demo.html'], acceptance: ['Trang có tiêu đề.'],
    tests: ['node --test'], capabilities: ['public.ui'], risk: 'low', non_goals: ['Không sửa auth.'],
    steps: [{ order: 1, title: 'Tạo trang demo', description: 'Thêm HTML tĩnh.',
      allowed_scope: ['public/pharmacy/demo.html'], acceptance: ['Trang có tiêu đề.'],
      tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['Không sửa auth.'] }],
  };
}

function fixture({ seedRequest = true } = {}) {
  const db = new Database(':memory:');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, display_name TEXT, role TEXT, enrolled_domain TEXT);
    CREATE TABLE requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, domain TEXT NOT NULL, type TEXT NOT NULL DEFAULT 'other',
      title TEXT NOT NULL, detail TEXT, student TEXT NOT NULL DEFAULT 'Ẩn danh',
      status TEXT NOT NULL DEFAULT 'pending', votes INTEGER NOT NULL DEFAULT 1,
      admin_note TEXT, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, attachments TEXT
    );
    CREATE TABLE request_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER NOT NULL, role TEXT NOT NULL,
      author_name TEXT, body TEXT NOT NULL, attachments TEXT, created_at INTEGER NOT NULL
    );
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy');
  `);
  applyAiBoardMigrations(db);
  const store = createAiBoardStore(db);
  if (seedRequest) store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'worker-request-001', title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
  });
  return { db, store };
}

async function serve(store, env = { AI_BOARD_WORKER_KEY: KEY }) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    if (req.headers['x-test-user'] === '1') {
      req.user = { id: 1, username: 'lan', display_name: 'Lan', role: 'student', enrolled_domain: 'pharmacy' };
    }
    next();
  });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => req.user ? next() : res.status(401).json({ error: 'unauthorized' }),
    requireEnrolled: (req, res, next) => req.user?.enrolled_domain
      ? next()
      : res.status(403).json({ error: 'enrollment_required' }),
    requireAdmin: (_req, res) => res.status(403).json({ error: 'forbidden' }),
    requireStrictCsrf: (_req, res) => res.status(403).json({ error: 'csrf_failed' }),
  });
  attachAiBoardWorkerRoutes(app, { store, env, leaseMs: 120_000 });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    base: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((resolve, reject) => server.close((e) => e ? reject(e) : resolve())),
  };
}

test('D0 HTTP flow creates a root request, validates a plan, and creates child tickets', async () => {
  const { db, store } = fixture({ seedRequest: false });
  const { base, close } = await serve(store, { AI_BOARD_WORKER_KEY: KEY });
  try {
    const created = await fetch(`${base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-test-user': '1', 'idempotency-key': 'd0-http-request-001' },
      body: JSON.stringify({ title: 'Thêm trang học tập', detail: 'Trang demo tĩnh.' }),
    });
    assert.equal(created.status, 200);
    const request = await created.json();
    assert.equal(request.created, true);
    assert.ok(request.request_id);
    assert.ok(request.root_ticket_id);

    const claim = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'd0-http-worker', version: 'd0', mode: 'shadow', intent: 'plan',
    });
    const { ticket } = await claim.json();
    assert.equal(claim.status, 200);
    assert.equal(ticket.id, request.root_ticket_id);

    const lease = { worker_id: 'd0-http-worker', lease_token: ticket.lease_token };
    const snapshot = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/snapshot`, lease);
    assert.equal((await snapshot.json()).request.title, 'Thêm trang học tập');

    const runResponse = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, {
      ...lease, trigger: 'plan', idempotency_key: 'd0-http-run-001',
    });
    const { run } = await runResponse.json();
    const plan = surfacePlan();
    const planBody = { ...lease, run_id: run.id, plan, budget_used: 1, idempotency_key: 'd0-http-plan-001' };
    const planned = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/plan`, planBody);
    const result = await planned.json();
    assert.equal(planned.status, 200);
    assert.equal(result.status, 'planned');
    assert.equal(result.children.length, 1);
    assert.equal(result.children[0].status, 'queued');

    const retry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/plan`, planBody);
    assert.equal((await retry.json()).children[0].id, result.children[0].id);

    const rejectedRequestResponse = await fetch(`${base}/api/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-test-user': '1', 'idempotency-key': 'd0-http-request-002' },
      body: JSON.stringify({ title: 'Yêu cầu cần chặn', detail: 'Plan sai domain.' }),
    });
    const rejectedRequest = await rejectedRequestResponse.json();
    const rejectedClaim = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'd0-http-rejector', version: 'd0', mode: 'shadow', intent: 'plan',
    });
    const { ticket: rejectedTicket } = await rejectedClaim.json();
    assert.equal(rejectedTicket.id, rejectedRequest.root_ticket_id);
    const rejectedLease = { worker_id: 'd0-http-rejector', lease_token: rejectedTicket.lease_token };
    const rejectedRunResponse = await post(base, `/api/ai-board/worker/tickets/${rejectedTicket.id}/runs`, {
      ...rejectedLease, trigger: 'plan', idempotency_key: 'd0-http-run-002',
    });
    const { run: rejectedRun } = await rejectedRunResponse.json();
    const rejected = await post(base, `/api/ai-board/worker/tickets/${rejectedTicket.id}/plan`, {
      ...rejectedLease, run_id: rejectedRun.id, plan: { ...plan, domain: 'it' },
      budget_used: 1, idempotency_key: 'd0-http-plan-002',
    });
    assert.equal(rejected.status, 422);
    assert.equal((await rejected.json()).error, 'domain_mismatch');
    assert.equal(db.prepare('SELECT COUNT(*) n FROM ai_tickets WHERE parent_id=?').get(rejectedTicket.id).n, 0);
  } finally {
    await close();
    db.close();
  }
});

test('pre-PR verdict is persisted and observable through the request HTTP API', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const { ticket } = await (await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'verdict-worker', version: 'test', mode: 'active', intent: 'plan',
    })).json();
    const lease = { worker_id: 'verdict-worker', lease_token: ticket.lease_token };
    const { run } = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, {
      ...lease, trigger: 'plan', idempotency_key: 'verdict-run-001',
    })).json();
    const passingVerdict = {
      outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 40,
      gates: [
        { gate: 3, blocked: false, reason: null },
        { gate: 4, blocked: false, reason: null, issues: [] },
        { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true },
        { gate: 5.5, blocked: false, reason: null, risk_level: 'low', risk_signals: [] },
      ],
    };
    const bypass = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...lease, run_id: run.id, verdict: passingVerdict, idempotency_key: 'pre-pr-bypass-001',
    });
    assert.equal(bypass.status, 409);
    const plan = surfacePlan();
    await post(base, `/api/ai-board/worker/tickets/${ticket.id}/plan`, {
      ...lease, run_id: run.id, plan, budget_used: 1, idempotency_key: 'verdict-plan-001',
    });
    const bound = db.prepare('SELECT plan_hash, plan_revision FROM ai_runs WHERE id=?').get(run.id);
    assert.equal(bound.plan_hash, db.prepare('SELECT plan_hash FROM ai_tickets WHERE id=?').get(ticket.id).plan_hash);
    assert.equal(bound.plan_revision, 1);
    db.prepare('UPDATE ai_runs SET plan_revision=? WHERE id=?').run(2, run.id);
    const mismatchedRun = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...lease, run_id: run.id, verdict: passingVerdict, idempotency_key: 'pre-pr-wrong-plan-001',
    });
    assert.equal(mismatchedRun.status, 409);
    assert.equal((await mismatchedRun.json()).error, 'plan_run_mismatch');
    db.prepare('UPDATE ai_runs SET plan_revision=? WHERE id=?').run(1, run.id);
    db.prepare(`UPDATE ai_workers SET mode='shadow' WHERE worker_id='verdict-worker'`).run();
    const shadowVerdict = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...lease, run_id: run.id, verdict: passingVerdict, idempotency_key: 'pre-pr-shadow-001',
    });
    assert.equal(shadowVerdict.status, 409);
    assert.equal((await shadowVerdict.json()).error, 'active_worker_required');
    db.prepare(`UPDATE ai_workers SET mode='active' WHERE worker_id='verdict-worker'`).run();
    const body = {
      ...lease, run_id: run.id, idempotency_key: 'pre-pr-verdict-001',
      verdict: passingVerdict,
    };
    const shortcut = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...body, idempotency_key: 'pre-pr-shortcut-001',
      verdict: { outcome: 'ready_for_pr', gate_reached: 5.5, reason: null,
        gates: [{ gate: 5.5, blocked: false, reason: null, risk_level: 'low', risk_signals: [] }] },
    });
    assert.equal(shortcut.status, 400);
    const noSmoke = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...body, idempotency_key: 'pre-pr-no-smoke-001',
      verdict: { ...body.verdict, gates: body.verdict.gates.map((gate) =>
        gate.gate === 5 ? { ...gate, smoke_passed: false } : gate) },
    });
    assert.equal(noSmoke.status, 400);
    const noHttpObservation = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...body, idempotency_key: 'pre-pr-no-http-001',
      verdict: { ...body.verdict, gates: body.verdict.gates.map((gate) =>
        gate.gate === 5 ? { ...gate, http_observed: false } : gate) },
    });
    assert.equal(noHttpObservation.status, 400);
    const criticalReady = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, {
      ...body, idempotency_key: 'pre-pr-critical-ready-001',
      verdict: { ...body.verdict, gates: body.verdict.gates.map((gate) =>
        gate.gate === 5.5 ? { ...gate, risk_level: 'critical' } : gate) },
    });
    assert.equal(criticalReady.status, 400);
    const submitted = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, body);
    assert.equal(submitted.status, 200);
    assert.equal((await submitted.json()).verdict.outcome, 'ready_for_pr');
    const retry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/verdict`, body);
    assert.equal((await retry.json()).verdict.outcome, 'ready_for_pr');

    const visible = await fetch(`${base}/api/requests?domain=pharmacy`, { headers: { 'x-test-user': '1' } });
    const listed = await visible.json();
    assert.equal(listed.items[0].pre_pr_verdict, 'ready_for_pr');
    assert.equal(listed.items[0].pre_pr_gate, 5.5);
    assert.deepEqual(db.prepare('SELECT outcome, gate FROM ai_runs WHERE id=?').get(run.id),
      { outcome: 'ready_for_pr', gate: 5.5 });
    assert.equal(db.prepare('SELECT cumulative_budget FROM ai_tickets WHERE id=?').get(ticket.id).cumulative_budget, 41);
    assert.deepEqual(db.prepare('SELECT gate, status FROM ai_gate_traces WHERE run_id=? ORDER BY gate').all(run.id), [
      { gate: 1, status: 'passed' }, { gate: 2, status: 'passed' }, { gate: 2.5, status: 'passed' },
      { gate: 3, status: 'passed' }, { gate: 4, status: 'passed' },
      { gate: 5, status: 'passed' }, { gate: 5.5, status: 'passed' },
    ]);
  } finally {
    await close();
    db.close();
  }
});

test('AI_BOARD_KEY cannot authenticate or mount the worker API', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store, { AI_BOARD_KEY: KEY });
  try {
    const response = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'key-alias-worker', version: 'test', mode: 'shadow',
    });
    assert.equal(response.status, 404);
  } finally {
    await close();
    db.close();
  }
});

function post(base, path, body, { key = KEY } = {}) {
  return fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-ai-worker-key': key },
    body: JSON.stringify(body),
  });
}

test('off mode claims nothing; shadow claim is idempotent and exposes only leased snapshot', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const off = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'off' });
    assert.equal(off.status, 200);
    assert.equal((await off.json()).ticket, null);

    const unauthorized = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' }, { key: 'wrong' });
    assert.equal(unauthorized.status, 403);

    const first = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' });
    const a = await first.json();
    assert.equal(first.status, 200);
    assert.equal(a.ticket.id, 1);
    assert.ok(a.ticket.lease_token);

    const duplicate = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' });
    const b = await duplicate.json();
    assert.equal(b.ticket.id, a.ticket.id);
    assert.equal(b.ticket.lease_token, a.ticket.lease_token);

    const snapshot = await post(base, `/api/ai-board/worker/tickets/${a.ticket.id}/snapshot`, {
      worker_id: 'w1', lease_token: a.ticket.lease_token,
    });
    assert.equal(snapshot.status, 200);
    const snap = await snapshot.json();
    assert.equal(snap.request.owner_user_id, 1);
    assert.equal(snap.request.title, 'Thêm bộ thẻ thuốc');
    assert.equal(snap.request.idempotency_key, undefined);
  } finally {
    await close();
    db.close();
  }
});

test('heartbeat, typed run/event and release enforce lease and idempotency', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const claim = await post(base, '/api/ai-board/worker/claim', { worker_id: 'w2', version: 'test', mode: 'shadow' });
    const { ticket } = await claim.json();
    const lease = { worker_id: 'w2', lease_token: ticket.lease_token };

    assert.equal((await post(base, `/api/ai-board/worker/tickets/${ticket.id}/heartbeat`, lease)).status, 200);

    const runBody = { ...lease, trigger: 'shadow_precheck', idempotency_key: 'run-0001' };
    const runA = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, runBody)).json();
    const runB = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/runs`, runBody)).json();
    assert.equal(runA.run.id, runB.run.id);

    const badEvent = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, {
      ...lease, run_id: runA.run.id, event_type: 'arbitrary_sql', idempotency_key: 'event-bad1',
    });
    assert.equal(badEvent.status, 400);

    const eventBody = {
      ...lease, run_id: runA.run.id, event_type: 'shadow_precheck_passed',
      public_message: 'Đã kiểm tra yêu cầu.', internal_detail: 'owner/domain/shape ok',
      idempotency_key: 'event-0001',
    };
    const eventA = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, eventBody)).json();
    const eventB = await (await post(base, `/api/ai-board/worker/tickets/${ticket.id}/events`, eventBody)).json();
    assert.equal(eventA.event.id, eventB.event.id);

    const release = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.equal(release.status, 200);
    const releaseRetry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.equal(releaseRetry.status, 200);
    assert.equal((await releaseRetry.json()).ticket.duplicate, true);
    const row = db.prepare('SELECT status, phase, lease_owner FROM ai_tickets WHERE id = ?').get(ticket.id);
    assert.deepEqual(row, { status: 'queued', phase: 'shadow_checked', lease_owner: null });

    const reclaimer = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'new-worker', version: 'test', mode: 'shadow', intent: 'plan',
    });
    assert.equal((await reclaimer.json()).ticket.id, ticket.id);
    const oldRetry = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/release`, {
      ...lease, outcome: 'shadow_ok', idempotency_key: 'release-0001',
    });
    assert.deepEqual(await oldRetry.json(), {
      ok: true, ticket: { status: 'queued', phase: 'shadow_checked', duplicate: true },
    });

    const stale = await post(base, `/api/ai-board/worker/tickets/${ticket.id}/heartbeat`, lease);
    assert.equal(stale.status, 409);
    assert.equal((await fetch(`${base}/api/ai-board/worker/sql`)).status, 404);
  } finally {
    await close();
    db.close();
  }
});

test('expired lease fails closed and another worker can reclaim it', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const first = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'old', version: 'test', mode: 'shadow' })).json();
    db.prepare('UPDATE ai_tickets SET lease_expires_at = ? WHERE id = ?').run(Date.now() - 1, first.ticket.id);
    const expired = await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/heartbeat`, {
      worker_id: 'old', lease_token: first.ticket.lease_token,
    });
    assert.equal(expired.status, 409);

    const second = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'new', version: 'test', mode: 'shadow' })).json();
    assert.equal(second.ticket.id, first.ticket.id);
    assert.notEqual(second.ticket.lease_token, first.ticket.lease_token);
  } finally {
    await close();
    db.close();
  }
});

test('expired lease after plan submission can resume the pre-PR pipeline', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const first = await (await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'crashed', version: 'test', mode: 'shadow', intent: 'plan',
    })).json();
    const lease = { worker_id: 'crashed', lease_token: first.ticket.lease_token };
    const { run } = await (await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/runs`, {
      ...lease, trigger: 'plan', idempotency_key: 'crashed-run-001',
    })).json();
    await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/plan`, {
      ...lease, run_id: run.id, plan: surfacePlan(), budget_used: 1,
      idempotency_key: 'crashed-plan-001',
    });
    db.prepare('UPDATE ai_tickets SET lease_expires_at=? WHERE id=?').run(Date.now() - 1, first.ticket.id);

    const resumed = await (await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'resumer', version: 'test', mode: 'shadow', intent: 'plan',
    })).json();
    const resumedLease = { worker_id: 'resumer', lease_token: resumed.ticket.lease_token };
    const { run: resumedRun } = await (await post(base, `/api/ai-board/worker/tickets/${resumed.ticket.id}/runs`, {
      ...resumedLease, trigger: 'plan', idempotency_key: 'resumed-run-001',
    })).json();
    const duplicate = await (await post(base, `/api/ai-board/worker/tickets/${resumed.ticket.id}/plan`, {
      ...resumedLease, run_id: resumedRun.id, plan: surfacePlan(), budget_used: 40,
      idempotency_key: 'resumed-plan-001',
    })).json();

    assert.equal(resumed.ticket.id, first.ticket.id);
    assert.equal(duplicate.status, 'planned');
    assert.equal(duplicate.duplicate, true);
    assert.equal(db.prepare('SELECT cumulative_budget FROM ai_tickets WHERE id=?').get(first.ticket.id).cumulative_budget, 41);
    const released = await post(base, `/api/ai-board/worker/tickets/${resumed.ticket.id}/release`, {
      ...resumedLease, outcome: 'planned', idempotency_key: 'resumed-release-001',
    });
    assert.equal(released.status, 200);
    assert.equal(db.prepare('SELECT lease_owner FROM ai_tickets WHERE id=?').get(first.ticket.id).lease_owner, null);
  } finally {
    await close();
    db.close();
  }
});

test('shadow-checked roots stop reclaiming the queue and later roots can run', async () => {
  const { db, store } = fixture();
  store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: 'worker-request-002', title: 'Thêm mục học mới',
  });
  const { base, close } = await serve(store);
  try {
    const first = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    const firstLease = { worker_id: 'w1', lease_token: first.ticket.lease_token };
    await post(base, `/api/ai-board/worker/tickets/${first.ticket.id}/release`, {
      ...firstLease, outcome: 'shadow_ok', idempotency_key: 'release-shadow-001',
    });

    const next = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    assert.equal(next.ticket.id, 2);

    const planned = await (await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'planner', version: 'd0', mode: 'shadow', intent: 'plan',
    })).json();
    assert.equal(planned.ticket.id, 1);

    await post(base, `/api/ai-board/worker/tickets/${next.ticket.id}/release`, {
      worker_id: 'w1', lease_token: next.ticket.lease_token,
      outcome: 'shadow_ok', idempotency_key: 'release-shadow-002',
    });
    const idle = await (await post(base, '/api/ai-board/worker/claim', { worker_id: 'w1', version: 'test', mode: 'shadow' })).json();
    assert.equal(idle.ticket, null);
    assert.equal(db.prepare(`SELECT COUNT(*) n FROM ai_tickets WHERE status='queued' AND phase='shadow_checked'`).get().n, 1);
  } finally {
    await close();
    db.close();
  }
});

test('server rejects an unknown worker mode', async () => {
  const { db, store } = fixture();
  const { base, close } = await serve(store);
  try {
    const response = await post(base, '/api/ai-board/worker/claim', {
      worker_id: 'w1', version: 'test', mode: 'unexpected',
    });
    assert.equal(response.status, 400);
  } finally {
    await close();
    db.close();
  }
});
