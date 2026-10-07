// Ticket 24 plan D runner (explicit, not part of `node --test`): NO generated backend by default.
// Real serving process (server/index.js) + real session cookie/strict CSRF + disposable PostgreSQL + localhost HTTP fixtures. No microVM, no runner.
// Env: DATABASE_URL (disposable PostgreSQL). Spawns the server twice: flag unset (default), then AI_BOARD_ONLINE_BACKEND_SCRIPTS=true.
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { db } from '../server/db.js';

const d = db.d;
const PORT = 18043, TARGET = 18103;
const CRED = 'Bearer FIXTURE-DIRECT-CRED';
const root = `http://127.0.0.1:${PORT}`;
const checks = [];
const mark = (n) => checks.push(n);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const now = Date.now();

const target = [];
const targetServer = http.createServer((req, res) => {
  let body = ''; req.on('data', (c) => { body += c; }).on('end', () => {
    target.push({ url: req.url, auth: req.headers.authorization, body: JSON.parse(body || '{}') });
    res.end(JSON.stringify({ status: 'queued', ref: 'r-1', internal_debug: 'MUST-NOT-LEAK' }));
  });
}).listen(TARGET, '127.0.0.1');

let server;
async function start(flag) {
  const env = { ...process.env, PORT: String(PORT), HOST: '127.0.0.1', CSRF_ENFORCE: '1', T24_CRED: CRED, DATA_DIR: path.join(tmpdir(), 't24d-data'), // DATA_DIR: portal-apps path code is not Windows-safe without it
    AI_BOARD_ONLINE_ADAPTERS: JSON.stringify({ ok: { url: `http://127.0.0.1:${TARGET}/send`, credential_var: 'T24_CRED' } }) };
  delete env.AI_BOARD_ONLINE_BACKEND_SCRIPTS; delete env.ONLINE_RUNNER_URL; delete env.ONLINE_RUNNER_TOKEN_FILE;
  if (flag) env.AI_BOARD_ONLINE_BACKEND_SCRIPTS = 'true';
  server = spawn(process.execPath, ['server/index.js'], { stdio: ['ignore', 'pipe', 'pipe'], env });
  let log = ''; server.stdout.on('data', (c) => { log += c; }); server.stderr.on('data', (c) => { log += c; });
  let exited = false; server.once('exit', () => { exited = true; });
  for (let i = 0; i < 120 && !exited; i += 1) { try { await fetch(`${root}/api/health`); return; } catch { /* booting */ } await sleep(500); }
  throw new Error(`server did not start\n${log.slice(-1500)}`);
}
const stop = async () => { if (server.exitCode !== null) return; server.kill(); await new Promise((r) => server.once('exit', r)); };

let csrfCookie, csrfToken;
async function csrf(actor) {
  const res = await fetch(`${root}/api/csrf`, { headers: { Cookie: `tizia_sid=${actor.token}` } });
  assert.equal(res.status, 200); csrfToken = (await res.json()).token;
  csrfCookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).find((c) => c.startsWith('tizia_csrf='));
}
async function call(actor, route, body, expected = 200, { useCsrf = true } = {}) {
  const res = await fetch(root + route, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json',
    Cookie: [actor && `tizia_sid=${actor.token}`, csrfCookie || `tizia_csrf=${csrfToken}`].filter(Boolean).join('; '), ...(useCsrf ? { 'X-CSRF-Token': csrfToken } : {}) },
  body: body === undefined ? undefined : JSON.stringify(body) });
  const json = await res.json().catch(() => ({})); assert.equal(res.status, expected, `${route} ${JSON.stringify(json).slice(0, 300)}`); return json;
}

try {
  const suffix = randomBytes(5).toString('hex');
  const actors = {};
  for (const [name, role] of [['admin', 'admin'], ['creator', 'student'], ['other', 'student']]) {
    const id = await d.insert('INSERT INTO users(username,display_name,password_hash,role,created_at,enrolled_domain,major) VALUES(?,?,?,?,?,?,?)',
      [`t24d_${name}_${suffix}`, name, 'synthetic-unusable-hash', role, now, 'it', 'it']);
    const token = randomBytes(32).toString('hex');
    await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, id, now, now + 3600000]);
    actors[name] = { id, token };
  }
  await start(false); await csrf(actors.admin);
  const slug = `t24d-${randomBytes(4).toString('hex')}`;
  const f = await d.insert(`INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at)
    VALUES(?,?,?,?,?,?,?,?,?)`, [slug, 'Synthetic online feature', actors.creator.id, 'it', 'active', now, now, now, now]);
  await d.run(`INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at) VALUES (?, ?, ?, 'school', ?, ?)`,
    [slug, f, actors.creator.id, actors.admin.id, now]);
  const r = (await call(actors.admin, `/api/ai-board/features/${f}/resources`, { name: 'notes', fields: ['text', 'private_note'] })).id;
  const rec = (await call(actors.creator, `/api/ai-board/features/${f}/resources/${r}/records`, { data: { text: 'hello online', private_note: 'must not leave' } })).id;
  const ops = [{ operation: 'send_note', adapter: 'ok', resource_id: r, fields: ['text'], response_fields: ['status', 'ref'] }];
  const ui = { version: 1, title: 'Ghi chú', blocks: [{ type: 'record_list', title: 'Danh sách', resource_id: r, fields: [{ name: 'text', label: 'Nội dung' }],
    row_actions: [{ label: 'Gửi', operation: 'send_note' }] }] };
  const adminRoute = `/api/admin/ai-board/features/${f}/online`;
  const register = (body, expected = 200, o) => call(actors.admin, adminRoute, { operations: ops, ui, ...body }, expected, o);
  const inv = (actor, body, expected, o) => call(actor, `/api/ai-board/features/${f}/online/invoke`, body, expected, o);
  const backend = (actor, expected) => call(actor, `/api/ai-board/features/${f}/online/backend`, { record_id: rec }, expected);
  const grant = (permission) => call(actors.admin, `/api/ai-board/features/${f}/resources/${r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission });
  const unchanged = (n) => assert.equal(target.length, n, 'adapter must not be reached');

  // ---- default (flag unset): scripts rejected, no VM path ----
  assert.equal((await inv(actors.creator, { operation: 'send_note', record_id: rec }, 404)).error, 'operation_not_approved');
  await call(actors.creator, `/api/ai-board/features/${f}/online/ui`, undefined, 404); mark('Nothing registered: operation and UI denied by default');
  for (const script of ['echo hi', '', 'x'.repeat(50000)]) assert.equal((await register({ backend_script: script }, 403)).error, 'backend_scripts_disabled');
  await register({ backend_script: 'x'.repeat(100000) }, 413); // flag off: global 64kb parser stops it even earlier
  assert.equal(await d.get('SELECT 1 AS x FROM ai_online_operations WHERE feature_id=?', [f]), undefined);
  mark('Default off: any backend_script registration (short, empty, 50000 chars) rejected 403 and 100000 chars 413, nothing persisted');
  await call(actors.creator, adminRoute, { operations: ops, ui }, 403);
  await call(actors.admin, adminRoute, { operations: ops, ui }, 403, { useCsrf: false });
  assert.deepEqual(await register({}), { operations: 1, ui: true, backend: false }); mark('Declarative registration (operations + UI, no script) works; admin-only + strict CSRF');

  // UI row action -> operation -> platform executes directly (the renderer's own call: POST .../online/invoke)
  const served = await call(actors.creator, `/api/ai-board/features/${f}/online/ui`);
  const action = served.blocks[0].row_actions[0]; assert.equal(action.operation, 'send_note');
  const bad = await register({ ui: { ...ui, blocks: [{ ...ui.blocks[0], row_actions: [{ label: 'Gửi', operation: 'not_registered' }] }] } }, 422);
  assert.equal(bad.error, 'invalid_ui_schema');
  const ok = await inv(actors.creator, { operation: action.operation, record_id: rec }, 200);
  assert.deepEqual(ok, { result: { status: 'queued', ref: 'r-1' } });
  assert.equal(target.length, 1); assert.equal(target[0].auth, CRED); assert.deepEqual(target[0].body, { text: 'hello online' });
  assert.ok(!JSON.stringify(ok).includes('MUST-NOT-LEAK')); mark('UI action -> registered operation -> broker -> adapter, no VM: approved field only, host credential, filtered response; UI action naming an unregistered op rejected 422');

  // generated backend is not runnable even if a script row exists (e.g. stored while the flag was on)
  await d.run('UPDATE ai_online_ui SET backend_script=? WHERE feature_id=?', ['echo x', f]);
  assert.equal((await backend(actors.creator, 404)).error, 'backend_disabled'); unchanged(1);
  await backend(null, 401); mark('Stored script is not runnable while flag is off: /backend 404 backend_disabled, adapter untouched');
  await d.run('UPDATE ai_online_ui SET backend_script=NULL WHERE feature_id=?', [f]);

  // ---- deny cases: all before the adapter ----
  await inv(null, { operation: 'send_note', record_id: rec }, 401);
  await inv(actors.creator, { operation: 'send_note', record_id: rec }, 403, { useCsrf: false });
  for (const [actor, body, status, code] of [
    [actors.other, { operation: 'send_note', record_id: rec }, 403, 'scope_denied'], // wrong owner
    [actors.creator, { operation: 'send_note', record_id: rec, actor_user_id: actors.admin.id }, 400, 'invalid_input'], // forged actor
    [actors.creator, { operation: 'send_note', record_id: rec, url: 'http://127.0.0.1:1' }, 400, 'invalid_input'],
    [actors.creator, { operation: 'unlisted', record_id: rec }, 404, 'operation_not_approved'],
    [actors.other, { operation: 'send_note', record_id: 999999 }, 404, 'record_not_found'],
  ]) assert.equal((await inv(actor, body, status)).error, code);
  unchanged(1); mark('Unauthenticated, no CSRF, wrong owner, forged actor/URL key, unapproved operation, missing record: denied before adapter');
  await grant('read'); await inv(actors.other, { operation: 'send_note', record_id: rec }, 200); unchanged(2);
  await grant('none'); assert.equal((await inv(actors.other, { operation: 'send_note', record_id: rec }, 403)).error, 'scope_denied'); unchanged(2);
  mark('Granted user allowed; revoked grant denied on the very next request, adapter untouched');
  await d.run("UPDATE ai_feature_releases SET status='off' WHERE slug=?", [slug]);
  assert.equal((await inv(actors.creator, { operation: 'send_note', record_id: rec }, 404)).error, 'feature_unavailable');
  assert.equal((await inv(actors.admin, { operation: 'send_note', record_id: rec }, 404)).error, 'feature_unavailable');
  await call(actors.creator, `/api/ai-board/features/${f}/online/ui`, undefined, 404); unchanged(2);
  await d.run("UPDATE ai_feature_releases SET status='school' WHERE slug=?", [slug]);
  await inv(actors.creator, { operation: 'send_note', record_id: rec }, 200); unchanged(3);
  mark('Release off blocks everyone (admin too) and the UI route; re-enabled works; adapter untouched while off');

  // ---- audit rows ----
  const rows = await d.all('SELECT * FROM ai_online_audit WHERE feature_id=?', [f]);
  const outcomes = new Set(rows.map((x) => x.outcome));
  for (const o of ['ok', 'scope_denied', 'operation_not_approved', 'invalid_input', 'feature_unavailable', 'backend_disabled']) assert.ok(outcomes.has(o), `audit lacks ${o}`);
  assert.deepEqual(Object.keys(rows[0]).sort(), ['actor_user_id', 'adapter', 'created_at', 'feature_id', 'id', 'operation', 'outcome']);
  assert.ok(!JSON.stringify(rows).includes('hello online') && !JSON.stringify(rows).includes('FIXTURE') && !JSON.stringify(rows).includes(actors.creator.token));
  assert.ok(rows.some((x) => x.outcome === 'ok' && x.actor_user_id === actors.creator.id && x.operation === 'send_note' && x.adapter === 'ok'));
  mark(`Audit persisted: ${rows.length} rows, actor/operation/adapter/outcome only`);

  // ---- flag on (real restart): cap 100000, still no VM needed to register ----
  await stop(); await start(true); await csrf(actors.admin);
  assert.deepEqual(await register({ backend_script: 'x'.repeat(100000) }), { operations: 1, ui: true, backend: true });
  assert.equal((await register({ backend_script: 'x'.repeat(100001) }, 400)).error, 'invalid_backend_script');
  assert.equal((await register({ backend_script: 'a\0b' }, 400)).error, 'invalid_backend_script');
  assert.equal((await backend(actors.creator, 503)).error, 'backend_runner_unconfigured'); unchanged(3);
  mark('Flag AI_BOARD_ONLINE_BACKEND_SCRIPTS=true: 100000-char script accepted through the real server (256kb path parser), 100001 and NUL rejected; no runner configured -> 503 and adapter untouched');
  assert.equal((await inv(actors.creator, { operation: 'send_note', record_id: rec }, 200)).result.status, 'queued'); unchanged(4);
  mark('Direct operation path unchanged with the flag on');
  console.log(JSON.stringify({ passed: checks.length, checks, realServer: true, realPostgres: true, microVm: false, modelCalls: 0 }, null, 2));
} finally {
  try { await stop(); } catch { /* not started */ } targetServer.close(); await db.close();
}
