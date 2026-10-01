// Per-model-call trace ingest (worker), admin trace read, admin reject closing the root.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import Database from 'better-sqlite3';

import { applyAiBoardMigrations, createAiBoardStore, runProgress } from '../server/ai-board/store.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';

const KEY = 'fixture-worker-key-32-characters-long';
const USERS = {
  1: { id: 1, username: 'lan', display_name: 'Lan', role: 'student', enrolled_domain: 'pharmacy' },
  9: { id: 9, username: 'admin', display_name: 'Admin', role: 'admin', enrolled_domain: null },
};

function fixture() {
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
    INSERT INTO users VALUES (1, 'lan', 'Lan', 'student', 'pharmacy'), (9, 'admin', 'Admin', 'admin', NULL);
  `);
  applyAiBoardMigrations(db);
  return { db, store: createAiBoardStore(db) };
}

function newRequest(store, key) {
  return store.createRequestWithRoot({
    ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
    idempotencyKey: key, title: 'Thêm bộ thẻ thuốc', detail: 'Nội dung fixture',
  });
}

/** Claim the next root for `workerId` and open a plan run on it. */
function leasedRun(store, workerId, runKey = `${workerId}-run-001`) {
  const ticket = store.claimNext({ workerId, version: 'test', mode: 'shadow', intent: 'plan' });
  const lease = { worker_id: workerId, lease_token: ticket.lease_token };
  const run = store.createRun(ticket.id, { workerId, leaseToken: ticket.lease_token, trigger: 'plan', idempotencyKey: runKey });
  return { ticket, lease, run };
}

async function serve(store) {
  const app = express();
  app.use(express.json({ limit: '2mb' }));
  app.use((req, _res, next) => {
    req.user = USERS[req.headers['x-test-user']] || null;
    next();
  });
  attachAiBoardRequestRoutes(app, {
    store,
    requireAuth: (req, res, next) => req.user ? next() : res.status(401).json({ error: 'unauthorized' }),
    requireEnrolled: (_req, _res, next) => next(),
    requireAdmin: (req, res, next) => req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }),
    requireStrictCsrf: (req, res, next) => req.headers['x-csrf-token'] === 'ok'
      ? next() : res.status(403).json({ error: 'csrf_failed' }),
  });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY }, leaseMs: 120_000 });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  return {
    postTraces: (ticketId, body) => fetch(`${base}/api/ai-board/worker/tickets/${ticketId}/traces`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-ai-worker-key': KEY }, body: JSON.stringify(body),
    }),
    getTrace: (requestId, user) => fetch(`${base}/api/admin/ai-board/requests/${requestId}/trace`, {
      headers: { 'x-test-user': String(user) },
    }),
    setStatus: (requestId, status, confirm = `#${requestId}`) => fetch(`${base}/api/requests/${requestId}/status`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-test-user': '9', 'x-csrf-token': 'ok' },
      body: JSON.stringify({ status, note: 'Không phù hợp', confirm }),
    }),
    postEvent: (ticketId, body) => fetch(`${base}/api/ai-board/worker/tickets/${ticketId}/events`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-ai-worker-key': KEY }, body: JSON.stringify(body),
    }),
    close: () => new Promise((resolve, reject) => server.close((e) => e ? reject(e) : resolve())),
  };
}

function call(callId, over = {}) {
  return {
    call_id: callId, gate: 3, child: 1, attempt: 0, iteration: 2, provider: 'ollama', model: 'qwen2.5-coder:14b',
    prompt_name: 'implement.md', prompt_hash: 'a'.repeat(64), prompt_var: 'sửa <b>trang</b>', prompt_len: 100,
    output: 'diff…', output_len: 5, truncated: { prompt: false, output: false },
    metrics: { wall_ms: 1000, tokens_in: 10, tokens_out: 5, tok_s: 50, done_reason: 'stop', gpu_ms: 900,
      load_ms: 100, prompt_eval_ms: 10, eval_ms: 800, queue_ms: 0, cache_hit: true },
    budget_units: 1, result: 'ok', error: null, at: 1_790_000_000_000,
    ...over,
  };
}

const modelRows = (db) => db.prepare(`SELECT * FROM ai_gate_traces WHERE status='model_call' ORDER BY id`).all();

test('trace ingest stores one sanitized row per call and is idempotent by call_id', async () => {
  const { db, store } = fixture();
  newRequest(store, 'trace-request-001');
  const { ticket, lease, run } = leasedRun(store, 'trace-worker');
  const api = await serve(store);
  try {
    const first = await api.postTraces(ticket.id, { ...lease, run_id: run.id, calls: [
      call('run1:g3:c1:a0:i0:s0'),
      call('run1:g3:c1:a0:i1:s0', {
        prompt_var: 'p'.repeat(9000), output: 'o'.repeat(8192), error: 'e'.repeat(500), secret: 'dropped',
        metrics: { wall_ms: '21000', tokens_in: 'abc', gpu_ms: null, extra: 1 }, provider: 'evil', result: 'weird',
        at: undefined,
      }),
    ] });
    assert.equal(first.status, 200);
    assert.deepEqual(await first.json(), { stored: 2, duplicates: 0 });

    const [plain, capped] = modelRows(db);
    assert.equal(plain.run_id, run.id);
    assert.equal(plain.gate, 3);
    assert.equal(plain.internal_reason, 'run1:g3:c1:a0:i0:s0');
    assert.equal(plain.public_reason, null);
    assert.equal(plain.created_at, 1_790_000_000_000);
    assert.equal(JSON.parse(plain.evidence_json).prompt_var, 'sửa <b>trang</b>');

    const e = JSON.parse(capped.evidence_json);
    assert.equal(e.prompt_var.length, 8192);
    assert.equal(e.output.length, 8192);
    assert.deepEqual(e.truncated, { prompt: true, output: false });
    assert.equal(e.error.length, 300);
    assert.equal(e.secret, undefined);
    assert.equal(e.metrics.wall_ms, 21000);
    assert.equal(e.metrics.tokens_in, null);
    assert.equal(e.metrics.gpu_ms, null);
    assert.equal(e.metrics.extra, undefined);
    assert.equal(e.provider, null);
    assert.equal(e.result, null);
    assert.notEqual(capped.created_at, 1_790_000_000_000, 'missing `at` falls back to now');

    const again = await api.postTraces(ticket.id, { ...lease, run_id: run.id, calls: [
      call('run1:g3:c1:a0:i0:s0'), call('run1:g3:c1:a0:i1:s0'), call('run1:g3:c1:a0:i2:s0'), call('run1:g3:c1:a0:i2:s0'),
    ] });
    assert.deepEqual(await again.json(), { stored: 1, duplicates: 3 });
    assert.equal(modelRows(db).length, 3);
  } finally {
    await api.close();
    db.close();
  }
});

test('trace ingest rejects bad call_id, oversize batches, stale leases and foreign runs', async () => {
  const { db, store } = fixture();
  newRequest(store, 'trace-request-001');
  newRequest(store, 'trace-request-002');
  const { ticket, lease, run } = leasedRun(store, 'trace-worker');
  const other = leasedRun(store, 'other-worker');
  const api = await serve(store);
  try {
    const body = (calls, over = {}) => ({ ...lease, run_id: run.id, calls, ...over });
    for (const bad of [{ call_id: undefined }, { call_id: 'x'.repeat(121) }, { call_id: 42 }]) {
      const res = await api.postTraces(ticket.id, body([call('ok-first'), call('ignored', bad)]));
      assert.equal(res.status, 400);
      assert.equal((await res.json()).error, 'invalid_trace');
    }
    assert.equal(modelRows(db).length, 0, 'a rejected batch stores nothing');
    assert.equal((await api.postTraces(ticket.id, body([call('x'.repeat(120))]))).status, 200);

    const tooMany = await api.postTraces(ticket.id, body(Array.from({ length: 51 }, (_, i) => call(`big-${i}`))));
    assert.equal(tooMany.status, 400);
    assert.equal((await tooMany.json()).error, 'invalid_trace');
    const fifty = await api.postTraces(ticket.id, body(Array.from({ length: 50 }, (_, i) => call(`big-${i}`))));
    assert.deepEqual(await fifty.json(), { stored: 50, duplicates: 0 });

    const stale = await api.postTraces(ticket.id, body([call('stale-1')], { lease_token: 'nope' }));
    assert.equal(stale.status, 409);
    assert.equal((await stale.json()).error, 'stale_lease');

    const foreign = await api.postTraces(ticket.id, body([call('foreign-1')], { run_id: other.run.id }));
    assert.equal(foreign.status, 400);
    assert.equal((await foreign.json()).error, 'invalid_worker_operation');
    assert.equal(modelRows(db).length, 51);
  } finally {
    await api.close();
    db.close();
  }
});

test('admin trace view is admin-only and sums GPU seconds, tokens, loads and retries', async () => {
  const { db, store } = fixture();
  const { request_id: requestId } = newRequest(store, 'trace-request-001');
  const { ticket, lease, run } = leasedRun(store, 'trace-worker');
  const run2 = store.createRun(ticket.id, {
    workerId: lease.worker_id, leaseToken: lease.lease_token, trigger: 'plan', idempotencyKey: 'trace-worker-run-002',
  });
  db.prepare(`INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title, status, phase, plan_revision, created_at, updated_at)
    VALUES (?, ?, 1, 'implementation', 'Bước 1', 'queued', 'ticketized', 1, 1, 1)`).run(ticket.id, requestId);
  db.prepare(`INSERT INTO ai_gate_traces(run_id, gate, status, created_at) VALUES (?, 2.5, 'passed', 1)`).run(run.id);
  const api = await serve(store);
  try {
    await api.postTraces(ticket.id, { ...lease, run_id: run.id, calls: [
      call('c1', { metrics: { gpu_ms: 19800, wall_ms: 21000, tokens_in: 3900, tokens_out: 640, load_ms: 120 } }),
      call('c2', { result: 'retry', metrics: { gpu_ms: 5049, wall_ms: 6000, tokens_in: 100, tokens_out: 60, load_ms: 2500 } }),
    ] });
    await api.postTraces(ticket.id, { ...lease, run_id: run2.id, calls: [
      call('c3', { model: 'llama3', result: 'error', metrics: { wall_ms: 1000, tokens_in: 10, tokens_out: 5 } }),
    ] });

    assert.equal((await api.getTrace(requestId, 1)).status, 403);
    assert.equal((await api.getTrace(requestId, 'none')).status, 401);
    assert.equal((await api.getTrace(9999, 9)).status, 404);

    const res = await api.getTrace(requestId, 9);
    assert.equal(res.status, 200);
    const trace = await res.json();
    assert.equal(trace.root.id, ticket.id);
    assert.equal(trace.root.budget_limit, 200);
    assert.deepEqual(trace.children.map((c) => [c.title, c.order]), [['Bước 1', 1]]);
    assert.deepEqual(trace.runs.map((r) => r.id), [run.id, run2.id]);
    assert.deepEqual(trace.runs[0].gates.map((g) => [g.gate, g.status]), [[2.5, 'passed']]);
    assert.deepEqual(trace.runs[0].calls.map((c) => c.evidence.call_id), ['c1', 'c2']);
    assert.equal(trace.runs[0].totals.gpu_s, 24.8);
    assert.equal(trace.runs[1].totals.calls, 1);

    const { by_model: byModel, ...totals } = trace.totals;
    assert.deepEqual(totals, {
      calls: 3, tokens_in: 4010, tokens_out: 705, model_loads: 1, retries: 1, gpu_s: 24.8, wall_s: 28,
      budget_used: 0, budget_limit: 200, budget_unit: 'gpu_s',
    });
    assert.deepEqual(Object.keys(byModel).sort(), ['llama3', 'qwen2.5-coder:14b']);
    assert.equal(byModel['qwen2.5-coder:14b'].calls, 2);
    assert.equal(byModel.llama3.gpu_s, 0);
  } finally {
    await api.close();
    db.close();
  }
});

test('api-only calls report the budget in k_tokens', () => {
  const { db, store } = fixture();
  const { request_id: requestId } = newRequest(store, 'trace-request-001');
  const { ticket, lease, run } = leasedRun(store, 'trace-worker');
  store.recordModelCalls(ticket.id, {
    workerId: lease.worker_id, leaseToken: lease.lease_token, runId: run.id,
    calls: [call('api-1', { provider: 'api', metrics: { tokens_in: 1000, tokens_out: 200 } })],
  });
  assert.equal(store.getRequestTrace(requestId).totals.budget_unit, 'k_tokens');
  db.close();
});

test('admin reject cancels the root, open children, lease, worker and alerts, idempotently', async () => {
  const { db, store } = fixture();
  const api = await serve(store);
  try {
    for (const [i, status, phase] of [[1, 'waiting', 'plan_blocked'], [2, 'planned', 'ticketized'], [3, 'waiting_admin', 'critical_violation']]) {
      const { request_id: requestId, root_ticket_id: rootId } = newRequest(store, `reject-request-00${i}`);
      const { lease } = leasedRun(store, `reject-worker-${i}`);
      // Worker still holds its lease while the root sits in the target state.
      db.prepare('UPDATE ai_tickets SET status=?, phase=? WHERE id=?').run(status, phase, rootId);
      const child = (childStatus, seq) => Number(db.prepare(`INSERT INTO ai_tickets(parent_id, source_request_id, sequence, kind, title,
        status, phase, plan_revision, created_at, updated_at) VALUES (?, ?, ?, 'implementation', 'c', ?, 'ticketized', 1, 1, 1)`)
        .run(rootId, requestId, seq, childStatus).lastInsertRowid);
      const openChild = child('queued', 1);
      const doneChild = child('done', 2);
      db.prepare(`INSERT INTO ai_alerts(ticket_id, severity, category, status, created_at, updated_at)
        VALUES (?, 'critical', 'boundary_violation', 'open', 1, 1)`).run(rootId);

      const unconfirmed = await api.setStatus(requestId, 'rejected', String(requestId + 1));
      assert.equal(unconfirmed.status, 400);
      assert.equal((await unconfirmed.json()).error, 'confirmation_required');
      assert.equal(db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(rootId).status, status, 'unconfirmed reject changes nothing');
      const res = await api.setStatus(requestId, 'rejected');
      assert.equal(res.status, 200);
      assert.equal((await api.setStatus(requestId, 'rejected')).status, 200, 'second reject is a no-op success');
      assert.equal(store.rejectRequest(requestId, null, 9), true);

      const root = db.prepare('SELECT * FROM ai_tickets WHERE id=?').get(rootId);
      assert.deepEqual([root.status, root.phase, root.internal_reason], ['cancelled', 'admin_rejected', 'admin_rejected']);
      assert.equal(root.lease_token, null);
      assert.equal(root.lease_owner, null);
      const childStatus = (id) => db.prepare('SELECT status, internal_reason FROM ai_tickets WHERE id=?').get(id);
      assert.deepEqual({ ...childStatus(openChild) }, { status: 'cancelled', internal_reason: 'admin_rejected' });
      assert.equal(childStatus(doneChild).status, 'done');
      assert.equal(db.prepare(`SELECT COUNT(*) n FROM ai_alerts WHERE ticket_id=? AND status='open'`).get(rootId).n, 0);
      assert.equal(db.prepare(`SELECT status FROM ai_alerts WHERE ticket_id=?`).get(rootId).status, 'resolved');
      const worker = db.prepare('SELECT status, current_ticket_id FROM ai_workers WHERE worker_id=?').get(lease.worker_id);
      assert.deepEqual({ ...worker }, { status: 'idle', current_ticket_id: null });
      assert.equal(db.prepare(`SELECT COUNT(*) n FROM ai_events WHERE ticket_id=? AND event_type='request_rejected'`).get(rootId).n, 1);
      assert.equal(db.prepare('SELECT status FROM requests WHERE id=?').get(requestId).status, 'rejected');
      assert.equal(store.listAdminQueue().find((t) => t.id === rootId).open_alerts, 0);
      assert.throws(() => store.heartbeat(rootId, lease.worker_id, lease.lease_token), { code: 'stale_lease' });
    }
  } finally {
    await api.close();
    db.close();
  }
});

test('admin note keeps requests.status in step with the root, rejection closes it', () => {
  const { db, store } = fixture();
  const { request_id: requestId } = newRequest(store, 'note-request-001');
  const row = () => ({ ...db.prepare('SELECT status, admin_note FROM requests WHERE id=?').get(requestId) });
  assert.equal(store.noteRequest(requestId, 'Đã xong rồi', 9), true);
  assert.deepEqual(row(), { status: 'pending', admin_note: 'Đã xong rồi' }, 'a "done" note cannot outrun the root');
  assert.equal(store.rejectRequest(requestId, 'Không phù hợp', 9), true);
  assert.equal(row().status, 'rejected');
  assert.equal(store.noteRequest(999, 'x', 9), false, 'unknown request');
  db.close();
});

test('admin done leaves the root untouched', () => {
  const { db, store } = fixture();
  const { request_id: requestId, root_ticket_id: rootId } = newRequest(store, 'done-request-001');
  assert.equal(store.noteRequest(requestId, null, 9), true);
  assert.equal(db.prepare('SELECT status FROM ai_tickets WHERE id=?').get(rootId).status, 'queued');
  db.close();
});

test('gate_started progress is validated and the trace computes per-run gate states', async () => {
  const { db, store } = fixture();
  const api = await serve(store);
  try {
    const { request_id: requestId } = newRequest(store, 'progress-request-001');
    const { ticket, lease, run } = leasedRun(store, 'progress-worker');
    assert.equal(ticket.trigger, 'plan');
    const event = (gate, attempt, extra = {}) => api.postEvent(ticket.id, {
      ...lease, run_id: run.id, event_type: 'gate_started', gate, attempt,
      idempotency_key: `progress-evt-${gate}-${attempt}`, ...extra,
    });
    for (const [gate, attempt] of [[7, 0], [3, -1], [3, 1.5], ['x', 0]]) {
      const res = await event(gate, attempt);
      assert.equal(res.status, 400, `gate ${gate} attempt ${attempt}`);
      assert.equal((await res.json()).error, 'invalid_progress');
    }
    // The server's validated gate/attempt wins over what the worker put in internal_detail.
    assert.equal((await event(1, 0, { internal_detail: '{"gate":9}' })).status, 200);
    // Old workers send the gate only inside internal_detail.
    assert.equal((await event(undefined, undefined, { internal_detail: JSON.stringify({ gate: 2, attempt: 0 }),
      idempotency_key: 'progress-evt-legacy' })).status, 200);
    const stored = db.prepare(`SELECT internal_detail FROM ai_events WHERE event_type='gate_started' ORDER BY id`).all();
    assert.deepEqual(stored.map((e) => JSON.parse(e.internal_detail)), [{ gate: 1, attempt: 0 }, { gate: 2, attempt: 0 }]);

    db.prepare(`INSERT INTO ai_gate_traces(run_id, gate, status, created_at) VALUES (?, 1, 'passed', 1)`).run(run.id);
    const trace = store.getRequestTrace(requestId);
    assert.equal(trace.root.phase_label, 'đang lập kế hoạch');
    assert.equal(trace.root.can_rollback, false);
    assert.equal(trace.gate_names['2.5'], 'Soát plan');
    const { progress } = trace.runs[0];
    assert.deepEqual(progress.gates.map((g) => [g.gate, g.state]), [[1, 'ok'], [2, 'run'], [2.5, 'wait']]);
    assert.equal(progress.gates[1].name, 'Phạm vi');
    assert.equal(progress.current, 2);
    assert.equal(typeof progress.since, 'number');
  } finally {
    await api.close();
    db.close();
  }
});

test('run progress: active plan runs show exec gates, finished runs skip the rest', () => {
  const run = { id: 1, trigger: 'plan', worker_mode: 'active', calls: [],
    gates: [{ gate: 1, status: 'passed' }, { gate: 2, status: 'passed' }, { gate: 2.5, status: 'passed' }, { gate: 3, status: 'blocked' }] };
  const done = runProgress(run, [], false);
  assert.deepEqual(done.gates.map((g) => g.state), ['ok', 'ok', 'ok', 'bad', 'skip', 'skip', 'skip']);
  assert.equal(done.current, null);
  const events = [4, 3].map((gate, i) => ({ event_type: 'gate_started', run_id: 1, internal_detail: JSON.stringify({ gate }), created_at: 10 + i }));
  const live = runProgress({ ...run, gates: run.gates.slice(0, 3) }, events, true);
  assert.deepEqual(live.gates.map((g) => g.state), ['ok', 'ok', 'ok', 'ok', 'run', 'wait', 'wait']);
  assert.deepEqual([live.current, live.since], [4, 10]);
  assert.deepEqual(runProgress({ ...run, trigger: 'rollback' }, [], true).gates, []);
});
