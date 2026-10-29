import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { CAPABILITY_CATALOG } from '../server/ai-board/security/policy.js';
import { VENV_PYTHON } from './support/harness-python.js';

const KEY = 'multi-worker-disposable-fixture-key-32';
const PLAN = { domain: 'pharmacy', goal: 'Syntax fixture', capabilities: ['public.ui'], allowed_scope: ['public/pharmacy/demo.js'],
  steps: [{ order: 1, title: 'Syntax fixture', capability: 'public.ui', allowed_scope: ['public/pharmacy/demo.js'], tests: ['node --check'], acceptance: ['valid syntax'], risk: 'low' }] };

async function board() {
  const appDb = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'pharmacy'], [2, 'minh', 'Minh', 'student', 'pharmacy']] });
  const db = appDb.d, store = createAsyncAiBoardStore(db);
  const app = express(); app.use(express.json());
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY } });
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const addRoot = async (ownerUserId, tag, folderId = null) => {
    const request = await store.createRequestWithRoot({ ownerUserId, ownerDomain: 'pharmacy', ownerDisplayName: tag,
      idempotencyKey: `mw-request-${tag}-0001`, title: `Root ${tag}`, detail: `Root ${tag}`, folderId });
    const id = request.root_ticket_id;
    await db.run("UPDATE ai_tickets SET status='queued',phase='authorized',plan_hash='plan-a',plan_revision=1,lease_owner=NULL,lease_token=NULL,lease_expires_at=NULL WHERE id=?", [id]);
    await db.insert("INSERT INTO ai_plans(root_ticket_id,revision,plan_hash,plan_json,status,tier,capability_policy_hash,created_at) VALUES (?,1,'plan-a',?,'valid','surface',?,?)",
      [id, JSON.stringify(PLAN), CAPABILITY_CATALOG.hash, Date.now()]);
    const now = Date.now();
    const planRun = await db.insert("INSERT INTO ai_runs(ticket_id,attempt,trigger,worker_id,idempotency_key,outcome,plan_hash,plan_revision,created_at,updated_at) VALUES (?,1,'plan','seed-planner','mw-plan-run',NULL,'plan-a',1,?,?)", [id, now, now]);
    for (const gate of [1, 2, 2.5]) await db.insert("INSERT INTO ai_gate_traces(run_id,gate,status,created_at) VALUES (?,?,'passed',?)", [planRun, gate, now]);
    return id;
  };
  const addFolder = () => {
    const now = Date.now();
    return db.insert("INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at) VALUES ('mw-folder','Folder',1,'pharmacy','active',?,?,?,?)", [now, now, now, now]);
  };
  const ticket = id => db.get('SELECT status, phase, lease_owner, lease_expires_at FROM ai_tickets WHERE id=?', [id]);
  const claims = async id => Number((await db.get("SELECT COUNT(*) AS n FROM ai_events WHERE ticket_id=? AND transition='queued->running'", [id])).n);
  const probe = (worker, env = {}) => promisify(execFile)(process.env.TEST_PYTHON || VENV_PYTHON,
    [path.resolve('test/support/multi-worker-probe.py'), base, KEY, worker],
    { cwd: process.cwd(), timeout: 90000, maxBuffer: 1000000, env: { ...process.env, ...env } })
    .then(child => JSON.parse(child.stdout.trim().split('\n').at(-1)));
  const close = async () => { await new Promise(resolve => server.close(resolve)); await appDb.dispose(); };
  return { db, addRoot, addFolder, ticket, claims, probe, close };
}

test('two real HttpWorkers claim two roots of different owners at once and both finish', async () => {
  const b = await board();
  try {
    const a = await b.addRoot(1, 'a'), c = await b.addRoot(2, 'c');
    const outs = await Promise.all([b.probe('mw-worker-1'), b.probe('mw-worker-2')]);
    assert.equal(outs.reduce((sum, out) => sum + out.gate4_calls, 0), 2);
    assert.ok(outs.every(out => out.result.status !== 'idle'), JSON.stringify(outs));
    assert.equal(await b.claims(a), 1);
    assert.equal(await b.claims(c), 1);
  } finally { await b.close(); }
});

test('a busy runner at gate 3 requeues the root with no retry spent, and another worker takes the next root', async () => {
  const b = await board();
  try {
    const a = await b.addRoot(1, 'a'), c = await b.addRoot(2, 'c');
    const busy = await b.probe('mw-worker-1', { PROBE_BUSY_GATE: '3' });
    assert.equal(busy.result.status, 'busy');
    const requeued = await b.ticket(busy.result.ticket_id);
    assert.equal(requeued.status, 'queued');
    assert.equal(requeued.lease_owner, null);
    assert.ok(Number(requeued.lease_expires_at) > Date.now());
    const next = await b.probe('mw-worker-2');
    assert.equal(next.gate4_calls, 1);
    assert.equal(await b.claims(c), 1);
    assert.equal(await b.claims(a), 1);
  } finally { await b.close(); }
});

test('two roots in one folder run one at a time: the second waits behind the first', async () => {
  const b = await board();
  try {
    const folder = await b.addFolder();
    const first = await b.addRoot(1, 'f1', folder), second = await b.addRoot(1, 'f2', folder);
    const outs = await Promise.all([b.probe('mw-worker-1', { PROBE_CLAIM_ONLY: '1' }), b.probe('mw-worker-2', { PROBE_CLAIM_ONLY: '1' })]);
    assert.deepEqual(outs.map(out => out.ticket).filter(Boolean), [first]);
    assert.equal(await b.claims(first), 1);
    assert.equal(await b.claims(second), 0);
    assert.equal((await b.ticket(second)).status, 'queued');
  } finally { await b.close(); }
});
