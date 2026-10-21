import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import express from 'express';
import { openBoard } from './support/ai-board-db.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { attachAiBoardRequestRoutes, attachAiBoardWorkerRoutes } from '../server/ai-board/routes.js';
import { applyMigrations } from '../server/ai-board/db/index.js';

const KEY = 'fixture-worker-key-32-characters-long';
const text = (name = 'frontend-example', body = '1. Keep labels clear.') => `---\nname: ${name}\ndescription: UI guidance\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n${body}\n`;
async function setup() {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it'], [9, 'admin', 'Admin', 'admin', null]] });
  await db.d.exec('CREATE TABLE sessions(token TEXT PRIMARY KEY,user_id BIGINT REFERENCES users(id),expires_at BIGINT NOT NULL)');
  await db.d.run('INSERT INTO sessions(token,user_id,expires_at) VALUES (?,?,?)', ['skill-admin-session',9,Date.now()+86400000]);
  const store = createAsyncAiBoardStore(db.d);
  const made = await store.createRequestWithRoot({ ownerUserId: 1, ownerDomain: 'it', ownerDisplayName: 'Lan',
    idempotencyKey: 'skill-request', title: 'Edit label', detail: 'Existing page label' });
  const ticket = await store.claimNext({ workerId: 'fixture-worker', version: 'test', mode: 'shadow' });
  const lease = { worker_id: 'fixture-worker', lease_token: ticket.lease_token };
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => { const id = Number(req.get('x-user')); req.user = id ? { id, token:'skill-admin-session', role: id === 9 ? 'admin' : 'student' } : null; next(); });
  const auth = (req, res, next) => req.user ? next() : res.sendStatus(401);
  const admin = (req, res, next) => req.user?.role === 'admin' ? next() : res.sendStatus(403);
  const csrf = (req, res, next) => req.get('x-csrf-fixture') === 'yes' ? next() : res.sendStatus(403);
  attachAiBoardRequestRoutes(app, { store, requireAuth: auth, requireAdmin: admin, requireEnrolled: auth, requireStrictCsrf: csrf });
  attachAiBoardWorkerRoutes(app, { store, env: { AI_BOARD_WORKER_KEY: KEY } });
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const api = async (path, body, over = {}) => {
    const r = await fetch(origin + path, { method: body == null ? 'GET' : 'POST',
      headers: { 'content-type': 'application/json', 'x-user': '9', 'x-csrf-fixture': 'yes', ...over },
      ...(body == null ? {} : { body: JSON.stringify(body) }) });
    return { status: r.status, body: await r.json().catch(() => ({})) };
  };
  const active = () => api(`/api/ai-board/worker/tickets/${ticket.id}/skills`, { ...lease, task_type: 'frontend', role: 'gate3_heavy' }, { 'x-ai-worker-key': KEY });
  return { db, store, ticket, lease, requestId:made.request_id, api, active, close: async () => { await new Promise(resolve => server.close(resolve)); db.close(); } };
}

test('admin upload remains draft until approval, active read uses a lease, and disable removes guidance', async () => {
  const t = await setup();
  try {
    const upload = await t.api('/api/admin/ai-board/skills', { name: 'frontend-example', task_types: ['frontend'], original_text: text() });
    assert.equal(upload.status, 200);
    assert.equal(upload.body.skill.status, 'draft');
    assert.equal((await t.active()).body.skills.length, 0);
    const version = upload.body.version;
    assert.equal((await t.api(`/api/admin/ai-board/skills/${upload.body.skill.id}/approve`, { version_id: version.id, confirmed: true })).status, 200);
    const active = await t.active();
    assert.equal(active.body.skills.length, 1);
    assert.equal(active.body.skills[0].source, 'admin');
    assert.equal(active.body.skills[0].hash.length, 64);
    assert.equal((await t.api(`/api/admin/ai-board/skills/${upload.body.skill.id}/disable`, { confirmed: true })).status, 200);
    assert.equal((await t.active()).body.skills.length, 0);
    assert.equal((await t.api('/api/admin/ai-board/skills', {}, { 'x-user': '1' })).status, 403);
    assert.equal((await t.api('/api/admin/ai-board/skills', {}, { 'x-csrf-fixture': '' })).status, 403);
  } finally { await t.close(); }
});

test('mutations reject a demoted admin or revoked session despite stale middleware identity', async () => {
  const t = await setup();
  try {
    const input = { name:'frontend-example', task_types:['frontend'], original_text:text() };
    const first = (await t.api('/api/admin/ai-board/skills', input)).body;
    const actions = [
      ['/api/admin/ai-board/skills', input],
      [`/api/admin/ai-board/skills/${first.skill.id}/approve`, { version_id:first.version.id, confirmed:true }],
      [`/api/admin/ai-board/skills/${first.skill.id}/disable`, { confirmed:true }],
    ];
    await t.db.d.run("UPDATE users SET role='student' WHERE id=9");
    for (const [url,body] of actions) assert.equal((await t.api(url,body)).status, 403);
    await t.db.d.run("UPDATE users SET role='admin' WHERE id=9");
    await t.db.d.run('DELETE FROM sessions WHERE user_id=9');
    for (const [url,body] of actions) assert.equal((await t.api(url,body)).status, 401);
    const stored = (await t.api(`/api/admin/ai-board/skills/${first.skill.id}`)).body;
    assert.equal(stored.versions.length, 1);
    assert.equal(stored.skill.status, 'draft');
    assert.equal(stored.skill.active_version_id, null);
  } finally { await t.close(); }
});

test('invalid draft cannot activate, new revisions preserve active guidance, and approvals stay version-bound', async () => {
  const t = await setup();
  try {
    const first = (await t.api('/api/admin/ai-board/skills', { name:'frontend-example', task_types:['frontend'], original_text:text() })).body;
    const approve = (id, version) => t.api(`/api/admin/ai-board/skills/${id}/approve`, { version_id:version, confirmed:true });
    assert.equal((await approve(first.skill.id, first.version.id)).status, 200);
    const draft = (await t.api('/api/admin/ai-board/skills', { name:'frontend-example', task_types:['frontend'], original_text:'Missing frontmatter' })).body;
    assert.equal(draft.version.lint.ok, false);
    assert.equal((await approve(first.skill.id, draft.version.id)).status, 422);
    assert.equal((await t.active()).body.skills[0].version_id, first.version.id);
    const other = (await t.api('/api/admin/ai-board/skills', { name:'another-guide', task_types:['frontend'], original_text:text('another-guide') })).body;
    assert.equal((await approve(other.skill.id, first.version.id)).status, 400);
    assert.equal((await t.api(`/api/ai-board/worker/tickets/${t.ticket.id}/skills`, { ...t.lease, lease_token:'stale', task_type:'frontend', role:'gate3_heavy' }, { 'x-ai-worker-key':KEY })).status, 409);
    const list = await t.api('/api/admin/ai-board/skills');
    assert.equal(list.body.skills.filter(s => s.source === 'default').length, 7);
    assert.equal(list.body.usage_window, 'latest_2000_spans');
  } finally { await t.close(); }
});

test('concurrent uploads allocate unique immutable versions and role selection prefers exact type', async () => {
  const t = await setup();
  try {
    const drafts = await Promise.all([1,2,3].map(n => t.api('/api/admin/ai-board/skills', {
      name:'frontend-example', task_types:['frontend'], original_text:text('frontend-example', `1. Keep label ${n} clear.`) })));
    assert.ok(drafts.every(r => r.status === 200));
    assert.deepEqual(drafts.map(r => r.body.version.version).sort(), [1,2,3]);
    const item = drafts.find(r => r.body.version.version === 3).body;
    assert.equal((await t.api(`/api/admin/ai-board/skills/${item.skill.id}/approve`, { version_id:item.version.id, confirmed:true })).status, 200);
    const shared = (await t.api('/api/admin/ai-board/skills', { name:'aaa-shared', task_types:['all'],
      original_text:text('aaa-shared').replace('task_type: frontend', 'task_type: all') })).body;
    assert.equal((await t.api(`/api/admin/ai-board/skills/${shared.skill.id}/approve`, { version_id:shared.version.id, confirmed:true })).status, 200);
    const review = await t.api(`/api/ai-board/worker/tickets/${t.ticket.id}/skills`, { ...t.lease, task_type:'frontend', role:'gate4_review' }, { 'x-ai-worker-key':KEY });
    assert.deepEqual(review.body.skills, []);
    assert.equal((await t.active()).body.skills[0].version, 3);
  } finally { await t.close(); }
});

test('usage derives from skill events and only finalized pre-PR verdicts enter pass rate', async () => {
  const t = await setup();
  try {
    const item = (await t.api('/api/admin/ai-board/skills', { name:'frontend-example', task_types:['frontend'], original_text:text() })).body;
    const run = await t.store.createRun(t.ticket.id, { workerId:t.lease.worker_id, leaseToken:t.lease.lease_token, trigger:'plan', idempotencyKey:'skill-usage' });
    const span = { trace_id:'a'.repeat(32), span_id:'1'.repeat(16), parent_span_id:null, name:'chat fixture', kind:'client',
      start_ms:Date.now()-10, end_ms:Date.now(), status:'ok', attributes:{ 'gen_ai.operation.name':'chat' },
      events:[{ name:'tizia.skill.used', time_ms:Date.now(), attributes:{ 'tizia.skill.name':'frontend-example', 'tizia.skill.version':1, 'tizia.skill.source':'admin' } }] };
    const recorded = await t.api(`/api/ai-board/worker/tickets/${t.ticket.id}/spans`, { ...t.lease, run_id:run.id, spans:[span] }, { 'x-ai-worker-key':KEY });
    assert.equal(recorded.status, 200);
    const find = async () => (await t.api('/api/admin/ai-board/skills')).body.skills.find(s => s.id === item.skill.id);
    let stats = (await find()).usage;
    assert.equal(stats.calls, 1);
    assert.equal(stats.judged, 0);
    assert.deepEqual(stats.steps.map(s => [s.request_id,s.run_id,s.version]), [[t.requestId,run.id,1]]);
    await t.db.d.run("UPDATE ai_runs SET outcome='ready_for_pr' WHERE id=?", [run.id]);
    stats = (await find()).usage;
    assert.equal(stats.passed, 1);
    assert.equal(stats.judged, 1);
    await t.db.d.run("UPDATE ai_runs SET outcome='needs_review' WHERE id=?", [run.id]);
    stats = (await find()).usage;
    assert.equal(stats.passed, 1);
    assert.equal(stats.judged, 1);
    await t.db.d.run("UPDATE ai_runs SET outcome='blocked' WHERE id=?", [run.id]);
    assert.equal((await find()).usage.passed, 0);
  } finally { await t.close(); }
});

test('migration35 upgrades a34schema without changing old data and is repeatable', async () => {
  const t = await setup();
  try {
    assert.match((await t.db.d.get('SELECT current_schema() AS s')).s, /^t_[0-9a-f]+$/);
    await t.db.d.exec('DROP TABLE ai_skill_versions; DROP TABLE ai_skills;');
    await t.db.d.run("DELETE FROM schema_migrations WHERE scope='ai-board' AND version='035-skill-registry.sql'");
    const before = await t.db.d.all('SELECT * FROM requests ORDER BY id');
    await applyMigrations(t.db.d);
    await applyMigrations(t.db.d);
    assert.deepEqual(await t.db.d.all('SELECT * FROM requests ORDER BY id'), before);
    assert.equal(Number((await t.db.d.get('SELECT COUNT(*) AS n FROM ai_skills')).n), 0);
  } finally { await t.close(); }
});
