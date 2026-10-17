// Candidate rollout over real HTTP routes + PostgreSQL: envelope serve, approval bound to base/head/audience, stale head, preview grants never count, reject/withdraw.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachRolloutRoutes, decide } from '../server/ai-board/api/rollout.js';
import { openBoard } from './support/ai-board-db.js';

const USERS = { 1: { id: 1, role: 'pupil' }, 3: { id: 3, role: 'admin' } };
const HEAD = 'a'.repeat(40), BASE = 'b'.repeat(40), NEXT = 'd'.repeat(40);
const GATES = [{ gate: 3, blocked: false }, { gate: 4, blocked: false }, { gate: 5, blocked: false, smoke_passed: true, http_observed: true }, { gate: 5.5, blocked: false }];
const verdict = (over = {}) => ({ outcome: 'ready_for_pr', gates: GATES, candidate: { branch: 'ai-board/x', base_sha: BASE, head_sha: HEAD, commits: [{ sha: HEAD, files: ['public/404.html', 'test/404.test.js'] }] }, ...over });

async function setup() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary'], [3, 'ad', 'Ad', 'admin', 'primary']] });
  const store = createAsyncAiBoardStore(db.d);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { ...USERS[req.get('x-user') || 3], display_name: 'U', username: 'u' }; next(); });
  const pass = (_req, _res, next) => next();
  attachRolloutRoutes(app, { store, requireAuth: pass, requireStrictCsrf: pass,
    requireAdmin: (req, res, next) => (req.user.role === 'admin' ? next() : res.status(403).json({ error: 'admin_required' })) });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (user, method, path, body) => {
    const r = await fetch(base + path, { method, headers: { 'content-type': 'application/json', 'x-user': String(user) }, body: body ? JSON.stringify(body) : undefined });
    return { status: r.status, body: await r.json() };
  };
  let n = 0;
  const addRun = (ticketId, attempt, v) => db.d.run(`INSERT INTO ai_runs(ticket_id, attempt, trigger, outcome, idempotency_key, evidence_json, created_at, updated_at) VALUES (?, ?, 'execute', ?, ?, ?, 1, 1)`,
    [ticketId, attempt, v.outcome, `run-${ticketId}-${attempt}`, JSON.stringify({ verdict: v })]);
  const feature = async (v, tier = 'surface') => {
    const r = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'primary', ownerDisplayName: 'Lan', idempotencyKey: `rollout-${++n}-aaaaa`, type: 'feature',
      title: `Thẻ ghi nhớ ${n}`, detail: 'fixture', attachments: [] });
    await store.approveFolder(r.folder_id, 3);
    await db.d.run('UPDATE ai_tickets SET tier=? WHERE id=?', [tier, r.root_ticket_id]);
    await addRun(r.root_ticket_id, 1, v);
    return r;
  };
  const status = async (folderId) => (await db.d.get('SELECT status FROM ai_feature_releases WHERE folder_id=?', [folderId])).status;
  const url = (id, action) => `/api/admin/ai-board/tickets/${id}/rollout${action ? `/${action}` : ''}`;
  return { db, store, call, feature, status, addRun, url, close: () => new Promise((resolve) => server.close(resolve)) };
}

test('decide: envelope only when every hard check holds; sensitive scope, audience growth and disagreement need review; missing proof blocks', () => {
  const base = { verdict: verdict(), tier: 'surface', audience: 'owner_only', disagreement: false };
  assert.equal(decide(base).mode, 'envelope');
  assert.deepEqual(decide({ ...base, audience: 'school' }).reasons, ['audience_expands']);
  assert.equal(decide({ ...base, disagreement: true }).mode, 'review');
  assert.equal(decide({ ...base, tier: 'feature' }).mode, 'review');
  assert.equal(decide({ ...base, verdict: verdict({ outcome: 'needs_review' }) }).mode, 'review');
  const sensitive = verdict();
  sensitive.candidate.commits[0].files = ['server/index.js'];
  assert.match(decide({ ...base, verdict: sensitive }).reasons[0], /^sensitive_scope:/);
  assert.equal(decide({ ...base, verdict: verdict({ gates: [GATES[0], { gate: 4, blocked: true }] }) }).mode, 'blocked');
  assert.equal(decide({ ...base, verdict: verdict({ gates: GATES.filter((g) => g.gate !== 5) }) }).mode, 'blocked');
  assert.equal(decide({ ...base, verdict: { outcome: 'ready_for_pr', gates: GATES } }).mode, 'blocked');
});

test('envelope candidate is served to its owner without review; school audience needs an approval bound to the exact head', async () => {
  const t = await setup();
  try {
    const f = await t.feature(verdict());
    const id = f.root_ticket_id;
    assert.equal((await t.call(1, 'GET', t.url(id))).status, 403);
    const view = await t.call(3, 'GET', t.url(id));
    assert.equal(view.body.envelope.mode, 'envelope');
    assert.equal(view.body.candidate.head_sha, HEAD);

    const served = await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: HEAD });
    assert.equal(served.status, 200);
    assert.equal(await t.status(f.folder_id), 'owner_only');
    assert.equal(served.body.approvals.at(-1).basis, 'envelope');

    const school = await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'school', head_sha: HEAD });
    assert.equal(school.status, 403);
    assert.deepEqual(school.body.reasons, ['audience_expands']);
    assert.equal(await t.status(f.folder_id), 'owner_only');

    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'school', head_sha: NEXT })).status, 409);
    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'school', head_sha: HEAD, note: 'cho cả trường' })).status, 200);
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'school', head_sha: HEAD })).status, 200);
    assert.equal(await t.status(f.folder_id), 'school');

    const withdrawn = await t.call(3, 'POST', t.url(id, 'withdraw'), {});
    assert.equal(withdrawn.status, 200);
    assert.equal(await t.status(f.folder_id), 'owner_only');
    assert.deepEqual(withdrawn.body.approvals.map((a) => a.decision), ['served', 'approved', 'served', 'withdrawn']);
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'school', head_sha: HEAD })).status, 403);
  } finally { await t.close(); }
});

test('a new candidate head voids the old approval; a preview never serves; reject turns the release off; unproven candidates cannot be approved', async () => {
  const t = await setup();
  try {
    const f = await t.feature(verdict({ outcome: 'needs_review' }));
    const id = f.root_ticket_id;
    const noReview = await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: HEAD });
    assert.equal(noReview.status, 403);
    assert.deepEqual(noReview.body.reasons, ['verdict_needs_review']);
    assert.equal(await t.status(f.folder_id), 'owner_only');

    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'owner_only', head_sha: HEAD })).status, 200);
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: HEAD })).status, 200);

    await t.addRun(id, 2, verdict({ candidate: { ...verdict().candidate, head_sha: NEXT } }));
    const after = await t.call(3, 'GET', t.url(id));
    assert.equal(after.body.candidate.head_sha, NEXT);
    assert.deepEqual(after.body.approvals, []);
    assert.equal(after.body.stale_decisions, 2);
    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'owner_only', head_sha: HEAD })).status, 409);

    assert.equal((await t.call(3, 'POST', t.url(id, 'reject'), { head_sha: NEXT, note: 'không đạt' })).status, 200);
    assert.equal(await t.status(f.folder_id), 'off');
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: NEXT })).status, 403);

    const bad = await t.feature(verdict({ gates: [{ gate: 4, blocked: true }] }));
    const blocked = await t.call(3, 'POST', t.url(bad.root_ticket_id, 'approve'), { audience: 'owner_only' });
    assert.equal(blocked.status, 409);
    assert.equal(blocked.body.error, 'not_approvable');
  } finally { await t.close(); }
});

test('decide: each hard check failing alone blocks; an empty file list is not a candidate', () => {
  const base = { tier: 'surface', audience: 'owner_only', disagreement: false };
  const without = (gate, patch) => GATES.map((g) => (g.gate === gate ? { ...g, ...patch } : g));
  for (const [name, gates] of [
    ['gate 3 blocked', without(3, { blocked: true })],
    ['gate 5.5 blocked', without(5.5, { blocked: true })],
    ['gate 4 absent', GATES.filter((g) => g.gate !== 4)],
    ['smoke not passed', without(5, { smoke_passed: false })],
    ['http not observed', without(5, { http_observed: false })],
    ['smoke missing', without(5, { smoke_passed: undefined })],
    ['http missing', without(5, { http_observed: undefined })],
  ]) assert.equal(decide({ ...base, verdict: verdict({ gates }) }).mode, 'blocked', name);
  const empty = verdict();
  empty.candidate.commits = [{ sha: HEAD, files: [] }];
  assert.deepEqual(decide({ ...base, verdict: empty }), { mode: 'blocked', reasons: ['no_candidate'], files: [] });
});

test('an approval holds only for the same run, base, head and audience', async () => {
  const t = await setup();
  try {
    const f = await t.feature(verdict({ outcome: 'needs_review' }));
    const id = f.root_ticket_id;
    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'owner_only', head_sha: HEAD })).status, 200);
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'school', head_sha: HEAD })).status, 403);
    const same = (over) => verdict({ outcome: 'needs_review', candidate: { ...verdict().candidate, ...over } });
    for (const [attempt, over] of [[2, {}], [3, { base_sha: 'e'.repeat(40) }], [4, { head_sha: NEXT }]]) {
      await t.addRun(id, attempt, same(over));
      const view = await t.call(3, 'GET', t.url(id));
      assert.deepEqual(view.body.approvals, [], `attempt ${attempt}`);
      const serve = await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: view.body.candidate.head_sha });
      assert.equal(serve.status, 403, `attempt ${attempt}`);
    }
  } finally { await t.close(); }
});

test('a recorded validator disagreement forces review; a blocked candidate cannot be served; a ticket without a release cannot be served', async () => {
  const t = await setup();
  try {
    const f = await t.feature(verdict());
    const id = f.root_ticket_id;
    const run = await t.db.d.get('SELECT id FROM ai_runs WHERE ticket_id=?', [id]);
    await t.db.d.run(`INSERT INTO ai_gate_traces(run_id, gate, status, public_reason, internal_reason, created_at) VALUES (?, 2.5, 'blocked', 'x', 'validator_disagreement: lần 1 a | lần 2 ok', 1)`, [run.id]);
    const view = await t.call(3, 'GET', t.url(id));
    assert.equal(view.body.envelope.mode, 'review');
    assert.ok(view.body.envelope.reasons.includes('validator_disagreement'));
    assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: HEAD })).status, 403);

    const bad = await t.feature(verdict({ gates: [{ gate: 4, blocked: true }] }));
    const served = await t.call(3, 'POST', t.url(bad.root_ticket_id, 'serve'), { audience: 'owner_only', head_sha: HEAD });
    assert.equal(served.status, 409);
    assert.equal(served.body.error, 'not_servable');

    const lone = await t.db.d.get('SELECT 1 AS n');
    assert.ok(lone);
    const plain = await t.store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'primary', ownerDisplayName: 'Lan', idempotencyKey: 'rollout-norel-aaaa', type: 'other',
      title: 'Sửa nút', detail: 'fixture', attachments: [] });
    await t.addRun(plain.root_ticket_id, 1, verdict());
    const none = await t.call(3, 'POST', t.url(plain.root_ticket_id, 'serve'), { audience: 'owner_only', head_sha: HEAD });
    assert.equal(none.status, 409);
    assert.equal(none.body.error, 'no_release');
  } finally { await t.close(); }
});

test('an approval is void when the same run later records another base or head', async () => {
  const t = await setup();
  try {
    const f = await t.feature(verdict({ outcome: 'needs_review' }));
    const id = f.root_ticket_id;
    assert.equal((await t.call(3, 'POST', t.url(id, 'approve'), { audience: 'owner_only', head_sha: HEAD })).status, 200);
    for (const over of [{ base_sha: 'e'.repeat(40) }, { head_sha: NEXT }]) {
      await t.db.d.run('UPDATE ai_runs SET evidence_json=? WHERE ticket_id=?', [JSON.stringify({ verdict: verdict({ outcome: 'needs_review', candidate: { ...verdict().candidate, ...over } }) }), id]);
      const view = await t.call(3, 'GET', t.url(id));
      assert.deepEqual(view.body.approvals, [], JSON.stringify(over));
      assert.equal((await t.call(3, 'POST', t.url(id, 'serve'), { audience: 'owner_only', head_sha: view.body.candidate.head_sha })).status, 403);
      await t.db.d.run('UPDATE ai_runs SET evidence_json=? WHERE ticket_id=?', [JSON.stringify({ verdict: verdict({ outcome: 'needs_review' }) }), id]);
    }
    assert.equal((await t.call(3, 'GET', t.url(id))).body.approvals.length, 1);
  } finally { await t.close(); }
});
