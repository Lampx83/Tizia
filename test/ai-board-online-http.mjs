// Explicit integration runner (real Express, real session cookie + strict CSRF, real PostgreSQL, real localhost HTTP fixtures).
// Set DATABASE_URL to a disposable PostgreSQL database. Phase "serve" does the attack matrix and writes a state file,
// then re-spawns itself as phase "restart" in a NEW node process to prove authorization is re-read after a serving restart.
import assert from 'node:assert/strict';
import express from 'express';
import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { db } from '../server/db.js';
import { requireAuth } from '../server/contexts/identity/auth.js';
import { csrf, requireStrictCsrf } from '../server/contexts/security/index.js';
import { attachScopedCrudRoutes } from '../server/ai-board/api/scoped-crud.js';
import { registerRelease, setReleaseStatus } from '../server/ai-board/services/releases.js';
import { createBroker } from '../server/ai-board/online/broker.js';
import { createHttpAdapter } from '../server/ai-board/online/adapter.js';
import { createReleaseGate } from '../server/ai-board/online/release-gate.js';
import { attachOnlineRoutes } from '../server/ai-board/online/routes.js';

const d = db.d;
const phase = process.argv[2] || 'serve';
const STATE = process.argv[3] || path.join(tmpdir(), 'tizia-t24-state.json');
const checks = [];
const mark = (name) => checks.push(name);
const now = Date.now();
const CRED = 'Bearer FIXTURE-ONLINE-CRED';
const listen = (handler) => new Promise((resolve) => { const s = http.createServer(handler); s.listen(0, '127.0.0.1', () => resolve(s)); });
const urlOf = (s, p = '/') => `http://127.0.0.1:${s.address().port}${p}`;

// ---- fixtures: approved integration target + a redirect victim canary that must never be reached ----
const canary = [];
const canaryServer = await listen((req, res) => { canary.push({ url: req.url, auth: req.headers.authorization }); res.end('{}'); });
const target = [];
const targetServer = await listen((req, res) => {
  let body = '';
  req.on('data', (c) => { body += c; }).on('end', () => {
    target.push({ url: req.url, auth: req.headers.authorization, body: JSON.parse(body || '{}') });
    if (req.url === '/redirect') { res.writeHead(307, { location: urlOf(canaryServer, '/stolen') }).end(); return; }
    res.end(JSON.stringify({ status: 'queued', ref: 'r-1', internal_debug: 'MUST-NOT-LEAK' }));
  });
});
const audit = [];
const op = { resource_id: 0, fields: ['text'], response_fields: ['status', 'ref'] };
const manifest = {};
const adapters = {
  ok: createHttpAdapter({ url: urlOf(targetServer, '/send'), credential: CRED }),
  redirecting: createHttpAdapter({ url: urlOf(targetServer, '/redirect'), credential: CRED }),
};
let crud;
const app = express();
app.use(express.json({ limit: '32kb' })); app.use(csrf);
app.get('/csrf', (req, res) => res.json({ token: req.csrfToken }));
crud = attachScopedCrudRoutes(app, { db: d, requireAuth, requireStrictCsrf, sessionToken: (req) => req.user.token });
const broker = createBroker({ crud, manifest, adapters, audit: (e) => audit.push(e), releaseAllowed: createReleaseGate(d) });
let uiSchema = null;
// registration/backend routes are exercised by test/ai-board-online-chain.mjs; this runner covers the broker with a static manifest
attachOnlineRoutes(app, { requireAuth, requireAdmin: requireAuth, requireStrictCsrf, sessionToken: (req) => req.user.token, broker,
  registry: { ui: async () => uiSchema, register: async () => ({}) }, backend: { run: async () => ({}) }, releaseAllowed: createReleaseGate(d) });
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ error: 'unexpected_error' }); });
const server = app.listen(0, '127.0.0.1');
await new Promise((resolve) => server.once('listening', resolve));
const root = `http://127.0.0.1:${server.address().port}`;
const csrfToken = (await (await fetch(`${root}/csrf`)).json()).token;
async function call(actor, route, body, expected = 200, { useCsrf = true, method } = {}) {
  const res = await fetch(root + route, { method: method ?? (body === undefined ? 'GET' : 'POST'),
    headers: { 'Content-Type': 'application/json', Cookie: `${actor ? `tizia_sid=${actor.token}; ` : ''}tizia_csrf=${csrfToken}`,
      ...(useCsrf ? { 'X-CSRF-Token': csrfToken } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const json = await res.json(); assert.equal(res.status, expected, `${route} ${JSON.stringify(json)}`); return json;
}

try {
  let s;
  if (phase === 'serve') {
    const suffix = randomBytes(6).toString('hex');
    const actors = {};
    for (const [name, role] of [['admin', 'admin'], ['creator', 'student'], ['other', 'student']]) {
      const id = await d.insert('INSERT INTO users(username,display_name,password_hash,role,created_at) VALUES(?,?,?,?,?)',
        [`t24_${name}_${suffix}`, name, 'synthetic-unusable-hash', role, now]);
      const token = randomBytes(32).toString('hex');
      await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, id, now, now + 3600000]);
      actors[name] = { id, token };
    }
    const slug = `t24-${randomBytes(6).toString('hex')}`;
    const f = await d.insert(`INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at)
      VALUES(?,?,?,?,?,?,?,?,?)`, [slug, 'Synthetic online feature', actors.creator.id, 'it', 'active', now, now, now, now]);
    await registerRelease(d, { slug, id: f, owner_user_id: actors.creator.id }, actors.admin.id);
    await setReleaseStatus(d, slug, 'school', actors.admin.id); // visible to the whole domain, so denial below is the record grant, not the release
    await d.run('UPDATE users SET enrolled_domain=? WHERE id IN (?, ?)', ['it', actors.creator.id, actors.other.id]);
    const res = (await call(actors.admin, `/api/ai-board/features/${f}/resources`, { name: 'notes', fields: ['text', 'private_note'] })).id;
    const rec = (await call(actors.creator, `/api/ai-board/features/${f}/resources/${res}/records`, { data: { text: 'hello online', private_note: 'must not leave' } })).id;
    manifest[f] = { send_note: { ...op, adapter: 'ok', resource_id: res }, send_redirect: { ...op, adapter: 'redirecting', resource_id: res } };
    s = { actors, f, res, rec, slug };
    const inv = (actor, body, expected, o) => call(actor, `/api/ai-board/features/${f}/online/invoke`, body, expected, o);

    await inv(null, { operation: 'send_note', record_id: rec }, 401); mark('Unauthenticated invoke denied');
    await inv(actors.creator, { operation: 'send_note', record_id: rec }, 403, { useCsrf: false }); mark('Strict CSRF enforced on invoke');
    assert.equal(target.length, 0);
    const ok = await inv(actors.creator, { operation: 'send_note', record_id: rec }, 200);
    assert.deepEqual(ok, { result: { status: 'queued', ref: 'r-1' } });
    assert.equal(target.length, 1); assert.equal(target[0].auth, CRED);
    assert.deepEqual(target[0].body, { text: 'hello online' }); // only the approved field left the platform
    assert.ok(!JSON.stringify(ok).includes('MUST-NOT-LEAK') && !JSON.stringify(ok).includes('FIXTURE-ONLINE-CRED'));
    mark('Approved operation reaches fixed endpoint with host-held credential and approved fields only');

    const before = target.length;
    for (const [actor, body, status, code] of [
      [actors.creator, { operation: 'send_note', record_id: rec, url: urlOf(canaryServer) }, 400, 'invalid_input'],
      [actors.creator, { operation: 'send_note', record_id: rec, headers: { authorization: 'x' }, method: 'POST' }, 400, 'invalid_input'],
      [actors.creator, { operation: 'send_note', record_id: rec, actor_user_id: actors.admin.id }, 400, 'invalid_input'],
      [actors.creator, { operation: 'send_note', record_id: rec, resource_id: res }, 400, 'invalid_input'],
      [actors.creator, { operation: 'unlisted', record_id: rec }, 404, 'operation_not_approved'],
      [actors.other, { operation: 'send_note', record_id: rec }, 403, 'scope_denied'], // wrong owner
      [actors.other, { operation: 'send_note', record_id: 999999 }, 404, 'record_not_found'],
    ]) assert.equal((await inv(actor, body, status)).error, code);
    await call(actors.creator, `/api/ai-board/features/${f + 99999}/online/invoke`, { operation: 'send_note', record_id: rec }, 404);
    assert.equal(target.length, before); mark('Wrong feature/owner/record, forged actor, URL/header/method/extra keys denied before adapter');

    assert.equal((await inv(actors.creator, { operation: 'send_redirect', record_id: rec }, 502)).error, 'redirect_denied');
    assert.equal(canary.length, 0); mark('Approved endpoint redirecting to canary: credential and payload never forwarded');

    await call(actors.admin, `/api/ai-board/features/${f}/resources/${res}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'read' });
    await inv(actors.other, { operation: 'send_note', record_id: rec }, 200);
    await call(actors.admin, `/api/ai-board/features/${f}/resources/${res}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'none' });
    const n = target.length;
    await inv(actors.other, { operation: 'send_note', record_id: rec }, 403);
    assert.equal(target.length, n); mark('Grant revocation takes effect on next request');

    await setReleaseStatus(d, slug, 'off', actors.admin.id);
    assert.equal((await inv(actors.creator, { operation: 'send_note', record_id: rec }, 404)).error, 'feature_unavailable');
    assert.equal((await inv(actors.admin, { operation: 'send_note', record_id: rec }, 404)).error, 'feature_unavailable');
    await setReleaseStatus(d, slug, 'school', actors.admin.id);
    await inv(actors.creator, { operation: 'send_note', record_id: rec }, 200);
    assert.equal(target.at(-1).auth, CRED); mark('Release off blocks everyone, including admin; restoring re-enables');

    // UI schema route: validated at serve time, unapproved operations and hostile shapes rejected
    const goodUi = { version: 1, title: 'Ghi chu', blocks: [{ type: 'record_list', title: 'Danh sach', resource_id: res, fields: [{ name: 'text', label: 'Noi dung' }],
      row_actions: [{ label: 'Gui', operation: 'send_note' }] }] };
    uiSchema = goodUi;
    assert.equal((await call(actors.creator, `/api/ai-board/features/${f}/online/ui`)).blocks.length, 1);
    uiSchema = { ...goodUi, blocks: [{ type: 'text', text: '<script>alert(1)</script>' }] };
    assert.equal((await call(actors.creator, `/api/ai-board/features/${f}/online/ui`, undefined, 422)).error, 'invalid_ui_schema');
    uiSchema = { ...goodUi, blocks: [{ ...goodUi.blocks[0], row_actions: [{ label: 'Gui', operation: 'send_redirect_x' }] }] };
    await call(actors.creator, `/api/ai-board/features/${f}/online/ui`, undefined, 422);
    uiSchema = goodUi;
    await call(null, `/api/ai-board/features/${f}/online/ui`, undefined, 401); mark('UI schema served only when valid, authenticated and released');

    assert.ok(audit.length >= 12); const text = JSON.stringify(audit);
    assert.ok(!text.includes('hello online') && !text.includes('FIXTURE-ONLINE-CRED') && !text.includes(actors.creator.token));
    assert.ok(audit.some((e) => e.outcome === 'ok' && e.actor === actors.creator.id && e.operation === 'send_note')); mark('Safe audit: actor/operation/outcome only');
    assert.equal(canary.length, 0); mark('HTTP canary: zero arrivals');
    writeFileSync(STATE, JSON.stringify(s));
    const child = spawnSync(process.execPath, [process.argv[1], 'restart', STATE], { env: process.env, encoding: 'utf8', timeout: 120000 });
    process.stdout.write(child.stdout); process.stderr.write(child.stderr);
    assert.equal(child.status, 0, 'restart phase failed');
    mark('Restart phase (new process) passed');
  } else {
    s = JSON.parse(readFileSync(STATE, 'utf8'));
    const { actors, f, res, rec, slug } = s;
    manifest[f] = { send_note: { ...op, adapter: 'ok', resource_id: res } };
    const inv = (actor, body, expected) => call(actor, `/api/ai-board/features/${f}/online/invoke`, body, expected);
    const ok = await inv(actors.creator, { operation: 'send_note', record_id: rec }, 200);
    assert.equal(ok.result.status, 'queued'); assert.equal(target.at(-1).auth, CRED); mark('After restart: same session + persisted grants still authorize');
    await inv(actors.other, { operation: 'send_note', record_id: rec }, 403); mark('After restart: revoked grant still denied');
    await d.run('UPDATE users SET role=? WHERE id=?', ['student', actors.admin.id]);
    await setReleaseStatus(d, slug, 'off', actors.admin.id);
    const n = target.length;
    await inv(actors.creator, { operation: 'send_note', record_id: rec }, 404); assert.equal(target.length, n);
    await setReleaseStatus(d, slug, 'school', actors.admin.id);
    await d.run('DELETE FROM sessions WHERE token=?', [actors.creator.token]);
    await inv(actors.creator, { operation: 'send_note', record_id: rec }, 401); assert.equal(target.length, n);
    mark('After restart: release off and revoked session denied before adapter');
    assert.equal(canary.length, 0); mark('Restart-phase HTTP canary: zero arrivals');
  }
  console.log(JSON.stringify({ phase, passed: checks.length, checks, realHttp: true, realPostgres: true, canaryArrivals: canary.length, modelCalls: 0 }, null, 2));
} finally {
  canaryServer.close(); targetServer.close();
  await new Promise((resolve) => server.close(resolve)); await db.close();
  if (phase === 'restart') rmSync(STATE, { force: true });
}
