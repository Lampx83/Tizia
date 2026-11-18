import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createHash } from 'node:crypto';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardWorkerRoutes, attachAiBoardRequestRoutes } from '../server/ai-board/routes.js';
import { CAPABILITY_CATALOG } from '../server/ai-board/security/policy.js';
import { labelFingerprint } from '../server/ai-board/repositories/prompt-labels.js';

const KEY = 'hsm-disposable-fixture-worker-key-32';
const FLAG = 'AI_BOARD_PROMPT_LABELS';
const flag = (on) => { if (on) process.env[FLAG] = '1'; else delete process.env[FLAG]; };
const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
const V1 = 'prompt one\n', V2 = 'prompt two\n';
const H1 = sha(V1), H2 = sha(V2);

async function fixture() {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy']] });
  const db = appDb.d, store = createAsyncAiBoardStore(db);
  const request = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan', idempotencyKey: 'labels-fixture', title: 'Fixture', detail: 'Fixture labels' });
  const id = request.root_ticket_id, now = Date.now();
  await db.run("UPDATE ai_tickets SET status='running',phase='executing',lease_mode='active',lease_owner='worker-a',lease_token='lease-a',lease_expires_at=?,plan_hash='plan-a',plan_revision=1 WHERE id=?", [now + 3600000, id]);
  const run = await db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,plan_hash,plan_revision,created_at,updated_at) VALUES (?,1,'execute','worker-a','labels-run',NULL,'plan-a',1,?,?)", [id, now, now]);
  await db.insert("INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,plan_json,status,tier,capability_policy_hash,created_at) VALUES (?,1,'plan-a','{}','valid','surface',?,?)", [id, CAPABILITY_CATALOG.hash, now]);
  const app = express(); app.use(express.json()); attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY } });
  const auth = (req, res, next) => { if (req.headers['x-test-admin'] !== 'yes') return res.status(403).json({ error: 'forbidden' }); req.user = { id: 1 }; next(); };
  attachAiBoardRequestRoutes(app, { store, requireAuth: auth, requireAdmin: auth, requireEnrolled: auth, requireStrictCsrf: auth });
  const server = app.listen(0, '127.0.0.1'); await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const send = async (url, init) => { const res = await fetch(base + url, init); return { status: res.status, body: await res.json() }; };
  const post = (suffix, body) => send(`/api/ai-board/worker/tickets/${id}/${suffix}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-ai-worker-key': KEY }, body: JSON.stringify({ worker_id: 'worker-a', lease_token: 'lease-a', ...body }) });
  const admin = (url, body) => send(`/api/admin/ai-board/prompt-labels${url}`, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', 'x-test-admin': 'yes' }, body: body ? JSON.stringify(body) : undefined });
  return { db, id, run, post, admin, close: async () => { flag(false); await new Promise((resolve) => server.close(resolve)); await appDb.dispose(); } };
}

test('flag off: every prompt-label route is 404', async () => {
  flag(false);
  const f = await fixture();
  try {
    assert.equal((await f.admin('')).status, 404);
    assert.equal((await f.post('prompt-labels', { versions: { 'p.md': { hash: H1, content: V1 } } })).status, 404);
  } finally { await f.close(); }
});

test('labels: set against the diff the admin saw, rollback, receipts, stale diff refused', async () => {
  flag(true);
  const f = await fixture();
  try {
    const reg = await f.post('prompt-labels', { versions: { 'p.md': { hash: H1, content: V1 } } });
    assert.deepEqual(reg.body, { labels: {} });
    await f.post('prompt-labels', { versions: { 'p.md': { hash: H2, content: V2 } } });
    assert.equal((await f.post('prompt-labels', { versions: { 'p.md': { hash: H1, content: 'tampered' } } })).status, 400);
    const split = (over = {}) => ({ false_block: 0.01, wrong_pass: 0, baseline_wrong_pass: 0, ...over });
    const evalBody = (version_hash, baseline_hash, over = {}) => ({ name: 'p.md', version_hash, baseline_hash, tune: split(), confirm: split(), ...over });
    assert.equal((await f.admin('/p.md/' + H1)).body.content, V1);
    assert.equal((await f.admin('/eval-receipts', evalBody(H1, 'f'.repeat(64), { tune: undefined }))).status, 400, 'both splits required');
    assert.equal((await f.admin('/eval-receipts', evalBody('e'.repeat(64), H1))).status, 404, 'unregistered version');
    assert.equal((await f.admin('/p.md/production/set', { from: null, to: H1 })).body.message, 'no_eval_receipt');
    assert.equal((await f.admin('/eval-receipts', evalBody(H1, 'f'.repeat(64)))).body.passed, true);
    assert.equal((await f.admin('/eval-receipts', evalBody(H2, H1, { confirm: split({ false_block: 0.06 }) }))).body.passed, false);
    assert.equal((await f.admin('/p.md/production/set', { to: H1 })).status, 400, 'diff base required');
    assert.equal((await f.admin('/p.md/production/set', { from: null, to: 'f'.repeat(64) })).status, 404, 'unknown version');
    assert.equal((await f.admin('/p.md/production/rollback', {})).body.error, 'prompt_label_no_previous');
    assert.equal((await f.admin('/p.md/production/set', { from: null, to: H1 })).body.changed, true);
    assert.equal((await f.admin('/p.md/production/set', { from: H1, to: H2 })).body.error, 'prompt_promotion_refused', 'failing receipt keeps the label');
    assert.equal((await f.admin('')).body.labels['p.md'].production, H1);
    assert.equal((await f.admin('')).body.refusals.length >= 2, true);
    assert.equal((await f.admin('/eval-receipts', evalBody(H2, H1, { tune: split({ wrong_pass: 1 }) }))).body.passed, false, 'wrong-pass above baseline');
    assert.equal((await f.admin('/eval-receipts', evalBody(H2, H1))).body.passed, true);
    assert.equal((await f.admin('/p.md/production/set', { from: null, to: H2 })).body.error, 'prompt_label_stale');
    assert.equal((await f.admin('/p.md/production/set', { from: H1, to: H2, reason: 'better' })).status, 200);
    assert.equal((await f.admin('')).body.labels['p.md'].production, H2);
    const back = await f.admin('/p.md/production/rollback', {});
    assert.deepEqual([back.body.from, back.body.to], [H2, H1]);
    const listed = (await f.admin('')).body;
    assert.equal(listed.labels['p.md'].production, H1);
    assert.deepEqual(listed.receipts.map((r) => r.kind).reverse(), ['set', 'set', 'rollback']);
    assert.equal(listed.versions.length, 2);
  } finally { await f.close(); }
});

test('a worker holding another label table is blocked like a manifest mismatch', async () => {
  flag(true);
  const f = await fixture();
  try {
    await f.db.run('UPDATE ai_plans SET capability_policy_hash=? WHERE root_ticket_id=?', [CAPABILITY_CATALOG.hash, f.id]);
    const contract = (await f.post('snapshot', {})).body.hsm_contract.hash;
    const act = (fingerprint) => f.post('hsm/authority', { run_id: f.run, contract_hash: contract, action: 'model', prompt_labels: fingerprint });
    await f.post('prompt-labels', { versions: { 'p.md': { hash: H1, content: V1 } } });
    assert.equal((await act(undefined)).status, 200, 'no fingerprint named: unaffected');
    assert.equal((await act('zz')).body.error, 'prompt_labels_required');
    assert.equal((await act(labelFingerprint({}))).status, 200);
    await f.admin('/p.md/staging/set', { from: null, to: H1 });
    assert.equal((await act(labelFingerprint({}))).body.error, 'prompt_labels_mismatch');
    assert.equal((await act(labelFingerprint({ 'p.md': { staging: H1 } }))).status, 200);
  } finally { await f.close(); }
});
