// Base change: a kept candidate is re-verified against the new base. Server side over PostgreSQL: request, claim, base observation, rebase hand-off, conflict, cap, and rollout blocking.
import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachRolloutRoutes } from '../server/ai-board/api/rollout.js';
import { openBoard } from './support/ai-board-db.js';
import { claimAndRun, newRequest, passing, planOf, submit, verdict } from './support/ai-board-scenarios.js';

const OLD = 'a'.repeat(40), TIP = 'c'.repeat(40), TIP2 = 'd'.repeat(40);

async function setup() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'pupil', 'primary'], [3, 'ad', 'Ad', 'admin', 'primary']] });
  const store = createAsyncAiBoardStore(db.d);
  const app = express();
  app.use(express.json());
  app.use((req, _res, next) => { req.user = { id: 3, role: 'admin', display_name: 'Ad', username: 'ad' }; next(); });
  const pass = (_req, _res, next) => next();
  attachRolloutRoutes(app, { store, requireAuth: pass, requireStrictCsrf: pass, requireAdmin: pass });
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const call = async (method, path, body) => {
    const r = await fetch(base + path, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    return { status: r.status, body: await r.json() };
  };
  const root = async (tag) => {
    const made = await newRequest(store, { tag, type: 'feature', title: `Thẻ ghi nhớ ${tag}` });
    await store.approveFolder(made.folder_id, 3);
    const w = await claimAndRun(store, `w-${tag}`);
    await submit(store, w, planOf(), `plan-rv-${tag}`);
    await verdict(store, w, passing(), `verdict-rv-${tag}`);
    await db.d.run('UPDATE ai_tickets SET lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL WHERE id=?', [w.id]);
    return { ...made, id: w.id };
  };
  const reverifyRun = async (workerId) => claimAndRun(store, workerId, 'reverify');
  const row = (id) => db.d.get('SELECT status, phase, lease_token FROM ai_tickets WHERE id=?', [id]);
  return { db, store, call, root, reverifyRun, row, close: () => new Promise((resolve) => server.close(resolve)) };
}

test('a reverify request queues the ticket; a worker that finds the base unchanged returns it to the phase it came from', async () => {
  const t = await setup();
  try {
    const r = await t.root('same');
    const before = await t.row(r.id);
    assert.equal(before.phase, 'pre_pr_ready');
    const queued = await t.store.requestReverify(r.id, { adminUserId: 3 });
    assert.deepEqual([queued.status, queued.phase, queued.attempt], ['queued', 'reverify', 1]);
    assert.equal((await t.store.requestReverify(r.id, { adminUserId: 3 })).duplicate, true);
    const w = await t.reverifyRun('w-same');
    assert.equal(w.claim.trigger, 'reverify');
    assert.equal((await t.row(r.id)).phase, 'reverifying');
    const snapshot = await t.store.getLeasedSnapshot(r.id, w.lease.workerId, w.lease.leaseToken);
    assert.equal(snapshot.reverify_candidate.base_sha, OLD);
    const out = await t.store.startReverify(r.id, { ...w.lease, runId: w.run.id, tip: OLD });
    assert.equal(out.outcome, 'current');
    const after = await t.row(r.id);
    assert.deepEqual([after.status, after.phase, after.lease_token], [before.status, 'pre_pr_ready', null]);
    assert.equal((await t.store.latestBase()).sha, OLD);
  } finally { await t.close(); }
});

test('a changed base blocks the rollout until a reverify verdict pins the new base', async () => {
  const t = await setup();
  try {
    const r = await t.root('moved');
    const view = async () => (await t.call('GET', `/api/admin/ai-board/tickets/${r.id}/rollout`)).body;
    assert.equal((await view()).envelope.mode, 'envelope');
    await t.store.recordBaseObservation({ ref: 'dev', sha: TIP });
    const blocked = await view();
    assert.deepEqual([blocked.envelope.mode, blocked.envelope.reasons, blocked.base.changed], ['blocked', ['base_changed'], true]);
    assert.equal((await t.call('POST', `/api/admin/ai-board/tickets/${r.id}/rollout/serve`, { audience: 'owner_only' })).status, 409);
    assert.equal((await t.call('POST', `/api/admin/ai-board/tickets/${r.id}/rollout/approve`, { audience: 'owner_only' })).status, 409);

    await t.store.requestReverify(r.id, { adminUserId: 3 });
    const w = await t.reverifyRun('w-moved');
    const out = await t.store.startReverify(r.id, { ...w.lease, runId: w.run.id, tip: TIP });
    assert.equal(out.outcome, 'rebase');
    assert.equal(out.candidate.base_sha, OLD);
    assert.equal(out.plan.steps.length, 1);
    assert.equal((await t.row(r.id)).status, 'planned');
    const head = 'e'.repeat(40);
    const rebased = passing({ candidate: { ...passing().candidate, base_sha: TIP, head_sha: head, commits: [{ ...passing().candidate.commits[0], sha: head }] } });
    await verdict(t.store, w, rebased, 'verdict-rv-moved2');
    const fresh = await view();
    assert.equal(fresh.envelope.mode, 'envelope');
    assert.deepEqual([fresh.candidate.base_sha, fresh.candidate.head_sha, fresh.base.changed], [TIP, head, false]);
    const cumulative = (await t.db.d.get('SELECT cumulative_budget FROM ai_tickets WHERE id=?', [r.id])).cumulative_budget;
    assert.equal(cumulative, 200, 'the recheck adds to the ledger it started from, never resets it');

    await t.store.recordBaseObservation({ ref: 'dev', sha: TIP2 });
    assert.equal((await view()).envelope.mode, 'blocked');
  } finally { await t.close(); }
});

test('a conflict stops the ticket for the admin and keeps the old evidence; the number of rechecks is capped', async () => {
  const t = await setup();
  try {
    const r = await t.root('conflict');
    await t.store.requestReverify(r.id, { adminUserId: 3 });
    const w = await t.reverifyRun('w-conflict');
    await t.store.startReverify(r.id, { ...w.lease, runId: w.run.id, tip: TIP });
    const out = await t.store.submitReverifyConflict(r.id, { ...w.lease, runId: w.run.id, tip: TIP, files: ['public/gioi-thieu.html'], detail: 'cherry-pick conflict' });
    assert.deepEqual([out.status, out.phase], ['waiting_admin', 'reverify_conflict']);
    const root = await t.row(r.id);
    assert.deepEqual([root.status, root.phase, root.lease_token], ['waiting_admin', 'reverify_conflict', null]);
    assert.equal((await t.db.d.get('SELECT outcome FROM ai_runs WHERE id=?', [w.run.id])).outcome, 'reverify_conflict');
    assert.equal((await t.store.getRequestTrace(r.request_id)).root.phase_label, 'ghép base mới bị xung đột, chờ quản trị viên');

    for (let i = 2; i <= 3; i += 1) {
      await t.db.d.run(`UPDATE ai_tickets SET status='planned', phase='pre_pr_ready', lease_token=NULL, lease_owner=NULL, lease_expires_at=NULL WHERE id=?`, [r.id]);
      assert.equal((await t.store.requestReverify(r.id, { adminUserId: 3 })).attempt, i);
    }
    await t.db.d.run(`UPDATE ai_tickets SET status='planned', phase='pre_pr_ready' WHERE id=?`, [r.id]);
    await assert.rejects(() => t.store.requestReverify(r.id, { adminUserId: 3 }), (error) => error.code === 'reverify_limit');
  } finally { await t.close(); }
});

test('reverify needs a kept candidate, an idle ticket and an owned lease; base observations reject junk', async () => {
  const t = await setup();
  try {
    const bare = await newRequest(t.store, { tag: 'bare' });
    await assert.rejects(() => t.store.requestReverify(bare.root_ticket_id, { adminUserId: 3 }), (e) => e.code === 'no_candidate');
    const r = await t.root('busy');
    await t.db.d.run(`UPDATE ai_tickets SET lease_owner='w', lease_token='tok', lease_expires_at=? WHERE id=?`, [Date.now() + 60_000, r.id]);
    await assert.rejects(() => t.store.requestReverify(r.id, { adminUserId: 3 }), (e) => e.code === 'ticket_busy');
    await t.db.d.run('UPDATE ai_tickets SET lease_owner=NULL, lease_token=NULL, lease_expires_at=NULL WHERE id=?', [r.id]);
    await t.store.requestReverify(r.id, { adminUserId: 3 });
    const w = await t.reverifyRun('w-busy');
    await assert.rejects(() => t.store.startReverify(r.id, { ...w.lease, leaseToken: 'x'.repeat(48), runId: w.run.id, tip: TIP }), (e) => e.code === 'stale_lease');
    await assert.rejects(() => t.store.startReverify(r.id, { ...w.lease, runId: w.run.id, tip: 'not-a-sha' }), (e) => e.code === 'invalid_base');
    await assert.rejects(() => t.store.recordBaseObservation({ ref: 'dev', sha: 'zz' }), (e) => e.code === 'invalid_base');
    await assert.rejects(() => t.store.recordBaseObservation({ ref: '../x y', sha: TIP }), (e) => e.code === 'invalid_base');
    assert.equal((await t.store.recordBaseObservation({ ref: 'dev', sha: TIP })).changed, true);
    assert.equal((await t.store.recordBaseObservation({ ref: 'dev', sha: TIP })).changed, false);
  } finally { await t.close(); }
});
