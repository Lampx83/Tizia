// Hàng đợi yêu cầu mạng: verdict network_request, quyết định cuối cùng, admin API (repo giả trong bộ nhớ, không cần PG).
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';

import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';
import { cleanNetworkReport } from '../server/ai-board/repositories/network-requests.js';
import { decide, decisionsForRoot, listForRequest, pendingCounts, recordPending } from '../server/ai-board/services/network-requests.js';
import { attachAiBoardNetwork } from '../server/contexts/ai-board-network/index.js';
import { LOOP_TOOLS } from '../server/ai-board/repositories/tool-manifests.js';

function memoryRepo({ status = 'waiting_admin', phase = 'network_request' } = {}) {
  const rows = [];
  const root = { id: 5, root_id: 50, status, phase };
  return {
    rows, root,
    tx: (fn) => fn(),
    insertPending: async ({ rootId, requestId, call_id, kind, payload, reason, now }) => {
      if (rows.some((r) => r.root_ticket_id === rootId && r.call_id === call_id)) return { changes: 0 };
      rows.push({ id: rows.length + 1, root_ticket_id: rootId, request_id: requestId, call_id, kind, payload_json: payload, reason, status: 'pending', decision_reason: null, decided_at: null, created_at: now });
      return { changes: 1 };
    },
    rootForRequest: async (id) => (id === root.id ? root : null),
    list: async (requestId, status) => rows.filter((r) => r.request_id === requestId && (!status || r.status === status)),
    get: async (id) => rows.find((r) => r.id === id) ?? null,
    decide: async ({ id, status, reason, now }) => {
      const row = rows.find((r) => r.id === id && r.status === 'pending');
      if (!row) return { changes: 0 };
      Object.assign(row, { status, decision_reason: reason, decided_at: now });
      return { changes: 1 };
    },
    pendingCount: async (rootId) => ({ n: rows.filter((r) => r.root_ticket_id === rootId && r.status === 'pending').length }),
    pendingByRequest: async () => [{ request_id: 5, n: rows.filter((r) => r.status === 'pending').length }].filter((r) => r.n),
    decisions: async (rootId) => rows.filter((r) => r.root_ticket_id === rootId && r.status !== 'pending'),
    requeueRoot: async () => {
      if (root.status !== 'waiting_admin' || root.phase !== 'network_request') return { changes: 0 };
      Object.assign(root, { status: 'queued', phase: 'authorized' });
      return { changes: 1 };
    },
    insertEvent: async () => ({ changes: 1 }),
  };
}

const REPORT = {
  pending: [
    { kind: 'package', call_id: 'pkg:lodash', name: 'lodash', version_range: 'latest', reason: 'missing module' },
    { kind: 'fetch_url', call_id: 'tc:run1:g3:c0:a0:s2', url: 'https://docs.example.com/a', reason: 'read docs' },
  ],
  auto_denied: 0,
};

const verdict = (extra = {}) => ({
  outcome: 'blocked', gate_reached: 4, reason: 'x', failure_class: 'network_request', repairs: [], candidate: null, budget_used: 1,
  gates: [{ gate: 3, blocked: false, reason: 'ok' }, { gate: 4, blocked: true, reason: 'x' }], ...extra,
});

test('the loop manifest allows the two network tools', () => {
  assert.ok(LOOP_TOOLS.has('request_package') && LOOP_TOOLS.has('fetch_url'));
});

test('verdict with failure_class network_request is accepted at any gate and keeps a cleaned report', () => {
  const out = validatePrePrVerdict(verdict({ network_requests: { ...REPORT, extra: 1 } }));
  assert.equal(out.failure_class, 'network_request');
  assert.deepEqual(out.network_requests.pending.map((p) => p.call_id), ['pkg:lodash', 'tc:run1:g3:c0:a0:s2']);
  assert.equal('extra' in out.network_requests, false);
});

test('report cleaning drops malformed entries and empty reports', () => {
  assert.equal(cleanNetworkReport({ pending: [{ kind: 'shell', call_id: 'x' }, { kind: 'package', call_id: 'bad id!' }] }), null);
  assert.deepEqual(cleanNetworkReport({ pending: [], auto_denied: 3 }), { pending: [], auto_denied: 3 });
  assert.equal(cleanNetworkReport('x'), null);
  const [card] = cleanNetworkReport({ pending: [{ kind: 'package', call_id: 'pkg:a', name: 'a', version_range: '^1', reason: 'r',
    metadata: { version: '1.2.0', license: 'MIT', age_days: 400, weekly_downloads: 9, install_scripts: [], transitive_count: 2, junk: 1 } }] }).pending;
  assert.deepEqual(card.metadata, { version: '1.2.0', license: 'MIT', age_days: 400, weekly_downloads: 9, install_scripts: [], transitive_count: 2 });
});

test('recording the same verdict twice does not duplicate pending rows', async () => {
  const repo = memoryRepo();
  await recordPending(repo, 50, 5, REPORT, 1);
  await recordPending(repo, 50, 5, REPORT, 2);
  assert.equal(repo.rows.length, 2);
  assert.deepEqual((await listForRequest(repo, 5, 'pending')).map((r) => r.kind), ['package', 'fetch_url']);
  assert.deepEqual(await pendingCounts(repo), { 5: 2 });
});

test('approve then reject: the root resumes only after the last pending item is decided', async () => {
  const repo = memoryRepo();
  await recordPending(repo, 50, 5, REPORT, 1);
  const first = await decide(repo, 1, { decision: 'approved', adminId: 9, now: 10 });
  assert.deepEqual([first.pending_left, first.resumed, repo.root.status], [1, false, 'waiting_admin']);
  const last = await decide(repo, 2, { decision: 'rejected', reason: 'unknown host', adminId: 9, now: 11 });
  assert.deepEqual([last.pending_left, last.resumed, repo.root.status, repo.root.phase], [0, true, 'queued', 'authorized']);
  assert.deepEqual(await decisionsForRoot(repo, 50), {
    'pkg:lodash': { decision: 'approved' },
    'tc:run1:g3:c0:a0:s2': { decision: 'rejected', reason: 'unknown host' },
  });
});

test('a decided item cannot be decided again', async () => {
  const repo = memoryRepo();
  await recordPending(repo, 50, 5, REPORT, 1);
  await decide(repo, 1, { decision: 'approved', adminId: 9 });
  await assert.rejects(decide(repo, 1, { decision: 'rejected', adminId: 9 }), { status: 409, code: 'already_decided' });
  await assert.rejects(decide(repo, 99, { decision: 'approved', adminId: 9 }), { status: 404 });
  await assert.rejects(decide(repo, 2, { decision: 'maybe', adminId: 9 }), { status: 400 });
});

async function serve(repo, { admin = true, csrf = true } = {}) {
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 9, role: admin ? 'admin' : 'student' }; next(); });
  const requireAuth = (_req, _res, next) => next();
  const requireAdmin = (req, res, next) => (req.user.role === 'admin' ? next() : res.status(403).json({ error: 'forbidden' }));
  const requireStrictCsrf = (req, res, next) => (csrf && req.get('x-csrf-token') === 'ok' ? next() : res.status(403).json({ error: 'csrf' }));
  attachAiBoardNetwork(app, { db: null, requireAuth, requireAdmin, requireStrictCsrf, repo });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, path, body, headers = { 'x-csrf-token': 'ok' }) => {
    const res = await fetch(base + path, { method, headers: { 'content-type': 'application/json', ...headers }, body: body ? JSON.stringify(body) : undefined });
    return { status: res.status, body: await res.json() };
  };
  return { call, close: () => new Promise((resolve) => server.close(resolve)) };
}

test('admin API lists pending items, approves, rejects, 409 on re-decide, and reports the pending count', async () => {
  const repo = memoryRepo();
  await recordPending(repo, 50, 5, REPORT, 1);
  const api = await serve(repo);
  try {
    assert.equal((await api.call('GET', '/api/admin/ai-board/requests/5/network-requests?status=pending')).body.items.length, 2);
    assert.deepEqual((await api.call('GET', '/api/admin/ai-board/network-requests/pending-count')).body, { counts: { 5: 2 }, total: 2 });
    assert.equal((await api.call('POST', '/api/admin/ai-board/network-requests/1/approve')).status, 200);
    const rejected = await api.call('POST', '/api/admin/ai-board/network-requests/2/reject', { reason: 'no' });
    assert.deepEqual([rejected.status, rejected.body.resumed], [200, true]);
    assert.equal((await api.call('POST', '/api/admin/ai-board/network-requests/1/reject')).status, 409);
    assert.equal((await api.call('GET', '/api/admin/ai-board/requests/777/network-requests')).status, 404);
    assert.equal(repo.rows[1].decision_reason, 'no');
  } finally { await api.close(); }
});

test('admin API refuses non-admins and requests without a CSRF token', async () => {
  const repo = memoryRepo();
  await recordPending(repo, 50, 5, REPORT, 1);
  const student = await serve(repo, { admin: false });
  const admin = await serve(repo);
  try {
    assert.equal((await student.call('POST', '/api/admin/ai-board/network-requests/1/approve')).status, 403);
    assert.equal((await student.call('GET', '/api/admin/ai-board/network-requests/pending-count')).status, 403);
    assert.equal((await admin.call('POST', '/api/admin/ai-board/network-requests/1/approve', null, {})).status, 403);
    assert.equal(repo.rows[0].status, 'pending');
  } finally { await student.close(); await admin.close(); }
});
