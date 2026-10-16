// Explicit integration runner, not a mocked DB test. Set DATABASE_URL to a disposable PostgreSQL database.
import assert from 'node:assert/strict';
import express from 'express';
import { randomBytes } from 'node:crypto';
import { db } from '../server/db.js';
import { requireAuth } from '../server/contexts/identity/auth.js';
import { csrf, requireStrictCsrf } from '../server/contexts/security/index.js';
import { attachScopedCrudRoutes } from '../server/ai-board/api/scoped-crud.js';

const d = db.d;
const checks = [];
const mark = (name) => checks.push(name);
const now = Date.now();
const suffix = randomBytes(6).toString('hex');
const actors = {};
for (const [name, role] of [['admin', 'admin'], ['creator', 'student'], ['other', 'student']]) {
  const id = await d.insert('INSERT INTO users(username,display_name,password_hash,role,created_at) VALUES(?,?,?,?,?)',
    [`t23_${name}_${suffix}`, name, 'synthetic-unusable-hash', role, now]);
  const token = randomBytes(32).toString('hex');
  await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, id, now, now + 3600000]);
  actors[name] = { id, token };
}
async function folder(owner, approved = true) {
  return d.insert(`INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at)
    VALUES(?,?,?,?,?,?,?,?,?)`, [`t23_${randomBytes(8).toString('hex')}`, 'Synthetic scoped feature', owner, 'it', 'active', approved ? now : null, now, now, now]);
}
const f1 = await folder(actors.creator.id), f2 = await folder(actors.other.id), draft = await folder(actors.creator.id, false);
const app = express();
app.use(express.json({ limit: '32kb' })); app.use(csrf);
app.get('/csrf', (req, res) => res.json({ token: req.csrfToken }));
attachScopedCrudRoutes(app, { db: d, requireAuth, requireStrictCsrf, sessionToken: (req) => req.user.token });
app.use((error, req, res, next) => { console.error(error); res.status(500).json({ error: 'unexpected_error' }); });
const server = app.listen(0, '127.0.0.1');
await new Promise((resolve) => server.once('listening', resolve));
const base = `http://127.0.0.1:${server.address().port}/api/ai-board/features`;
const csrfToken = (await (await fetch(`http://127.0.0.1:${server.address().port}/csrf`)).json()).token;
async function call(actor, path, body, expected = 200, useCsrf = true) {
  const res = await fetch(base + path, { method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `${actor ? `tizia_sid=${actor.token}; ` : ''}tizia_csrf=${csrfToken}`,
      ...(useCsrf ? { 'X-CSRF-Token': csrfToken } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  const json = await res.json(); assert.equal(res.status, expected, JSON.stringify(json)); return json;
}
const G = (p) => `${p}/grants`;
try {
  const r1 = (await call(actors.admin, `/${f1}/resources`, { name: 'notes', fields: ['text'] })).id;
  const p1 = `/${f1}/resources/${r1}`;
  const co = actors.other.id, cr = actors.creator.id;

  const widen = await call(actors.creator, G(p1), { user_id: co, owner_user_id: cr, permission: 'read' });
  assert.equal(widen.status, 'applied'); mark('Owner shares own scope within own right directly');
  await call(actors.creator, G(p1), { user_id: co, owner_user_id: actors.admin.id, permission: 'read' }, 403); mark('Owner cannot grant on another owners scope');
  await call(actors.admin, G(p1), { user_id: cr, owner_user_id: cr, permission: 'read' });
  const pending = await call(actors.creator, G(p1), { user_id: co, owner_user_id: cr, permission: 'write' });
  assert.equal(pending.status, 'review_required');
  const own = await call(actors.admin, `${p1}/records`, { owner_user_id: cr, data: { text: 'mine' } });
  await call(actors.other, `${p1}/records/${own.id}/update`, { revision: 1, data: { text: 'x' } }, 403); mark('Widening beyond the owners own right waits for review and grants nothing yet');
  await call(actors.creator, `${G(p1)}/${pending.review_id}/review`, { decision: 'approve' }, 403); mark('Owner cannot approve own review');
  await call(actors.admin, `${G(p1)}/${pending.review_id}/review`, { decision: 'approve' });
  await call(actors.admin, G(p1), { user_id: cr, owner_user_id: cr, permission: 'write' });
  await call(actors.other, `${p1}/records/${own.id}/update`, { revision: 1, data: { text: 'by grantee' } }); mark('Admin approval applies the grant');
  await call(actors.admin, `${G(p1)}/${pending.review_id}/review`, { decision: 'reject' }, 409); mark('A decided review cannot be decided twice');
  const list = await call(actors.creator, G(p1));
  assert.equal(list.grants.some((g) => g.user_id === co && g.permission === 'write'), true);
  assert.equal(list.reviews[0].status, 'approved'); mark('Owner lists own grants and review outcomes');

  // revoke queues behind an in-flight write holding the feature-row lock; both stay atomic
  let release; const held = new Promise((r) => { release = r; });
  const locked = d.tx(async (t) => { await t.get(`SELECT id FROM ai_feature_folders WHERE id=?${t.lockRow}`, [f1]); await held; });
  await new Promise((r) => setTimeout(r, 200));
  const inFlight = call(actors.other, `${p1}/records/${own.id}/update`, { revision: 2, data: { text: 'in flight' } }, 200);
  await new Promise((r) => setTimeout(r, 100));
  const revoke = call(actors.creator, G(p1), { user_id: co, owner_user_id: cr, permission: 'none' });
  await new Promise((r) => setTimeout(r, 200)); release(); await locked;
  const [w, rv] = await Promise.all([inFlight, revoke]);
  assert.equal(rv.status, 'applied'); assert.equal(w.revision, 3);
  await call(actors.other, `${p1}/records/${own.id}/update`, { revision: 3, data: { text: 'after revoke' } }, 403);
  const row = await d.get('SELECT revision, payload_json FROM ai_feature_records WHERE id=?', [own.id]);
  assert.equal(row.revision, 3); assert.equal(JSON.parse(row.payload_json).text, 'in flight');
  const audits = await d.all('SELECT operation FROM ai_resource_audit WHERE resource_id=? ORDER BY id', [r1]);
  const ops = audits.map((a) => a.operation);
  assert.ok(ops.indexOf('updated') >= 0 && ops.lastIndexOf('grant_revoked') > ops.lastIndexOf('updated'));
  mark('Write queued before a revoke commits whole and is audited; the next write is denied');

  const results = await Promise.all([...Array.from({ length: 12 }, (_, i) => fetch(base + `${p1}/records`, { method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `tizia_sid=${actors.other.token}; tizia_csrf=${csrfToken}`, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ owner_user_id: cr, data: { text: `race${i}` } }) }).then((r) => r.status))]);
  assert.ok(results.every((s) => s === 403)); mark('Revoked grantee cannot create on the scope');
  console.log(JSON.stringify({ passed: checks.length, checks, realHttp: true, realPostgres: true, modelCalls: 0 }, null, 2));
} finally {
  await new Promise((resolve) => server.close(resolve)); await db.close();
}
