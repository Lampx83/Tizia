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
    [`t19_${name}_${suffix}`, name, 'synthetic-unusable-hash', role, now]);
  const token = randomBytes(32).toString('hex');
  await d.run('INSERT INTO sessions(token,user_id,created_at,expires_at) VALUES(?,?,?,?)', [token, id, now, now + 3600000]);
  actors[name] = { id, token };
}
async function folder(owner, approved = true) {
  return d.insert(`INSERT INTO ai_feature_folders(slug,title,owner_user_id,domain,state,approved_at,created_at,updated_at,last_activity_at)
    VALUES(?,?,?,?,?,?,?,?,?)`, [`t19_${randomBytes(8).toString('hex')}`, 'Synthetic scoped feature', owner, 'it', 'active', approved ? now : null, now, now, now]);
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
try {
  await call(null, `/${f1}/resources`, { name: 'notes', fields: ['text'] }, 401); mark('Unauthenticated provision denied');
  await call(actors.creator, `/${f1}/resources`, { name: 'notes', fields: ['text'] }, 403); mark('Creator cannot self-provision scopes');
  await call(actors.admin, `/${f1}/resources`, { name: 'notes', fields: ['text'] }, 403, false); mark('Real strict CSRF enforced');
  await call(actors.admin, `/${draft}/resources`, { name: 'notes', fields: ['text'] }, 404); mark('Unapproved feature denied');
  await call(actors.admin, `/${f1}/resources`, { name: 'sensitive', fields: ['password'] }, 400); mark('Sensitive schema names rejected');
  const r1 = (await call(actors.admin, `/${f1}/resources`, { name: 'notes', fields: ['text'] })).id;
  const r2 = (await call(actors.admin, `/${f2}/resources`, { name: 'notes', fields: ['text'] })).id;
  const p1 = `/${f1}/resources/${r1}`, p2 = `/${f2}/resources/${r2}`;
  const own = await call(actors.creator, `${p1}/records`, { data: { text: 'creator private' } });
  assert.equal(own.owner_user_id, actors.creator.id); assert.equal(own.created_by, actors.creator.id); mark('Creator own scoped record created');
  await call(actors.creator, `${p1}/records`, { owner_user_id: actors.other.id, data: { text: 'attempt' } }, 403); mark('Creator cannot create on another owner');
  await call(actors.creator, `${p2}/records`, { data: { text: 'attempt' } }, 403); mark('Cross-feature create denied');
  await call(actors.creator, `/${f2}/resources/${r1}/records/${own.id}`, undefined, 404); mark('Feature/resource mismatch denied');
  await call(actors.creator, `${p1}/records`, { data: { text: 'ok', raw_sql: 'DROP TABLE users' } }, 400); mark('Unknown payload/SQL field rejected');
  await call(actors.creator, `${p1}/records`, { data: { text: 'ok' }, sql: 'DROP TABLE users', actor_user_id: actors.admin.id }, 400);
  await call(actors.creator, `${p1}/records/${own.id}/update`, { revision: 1, owner_user_id: actors.other.id, data: { text: 'attempt' } }, 400);
  mark('Raw SQL and identity overrides rejected at envelope boundary');
  const other = await call(actors.admin, `${p1}/records`, { owner_user_id: actors.other.id, data: { text: 'other private' } });
  await call(actors.creator, `${p1}/records/${other.id}`, undefined, 403);
  await call(actors.creator, `${p1}/records/${other.id}/history`, undefined, 403);
  await call(actors.creator, `${p1}/records/${other.id}/update`, { revision: 1, data: { text: 'attack' } }, 403);
  await call(actors.creator, `${p1}/records/${other.id}/delete`, { revision: 1 }, 403);
  await call(actors.creator, `${p1}/records?owner_user_id=${actors.other.id}`, undefined, 403); mark('Cross-owner read/list/history/write denied');
  await call(actors.admin, `${p1}/grants`, { user_id: actors.other.id, owner_user_id: actors.other.id, permission: 'write' });
  assert.equal((await call(actors.other, `${p1}/records/${other.id}`)).data.text, 'other private'); mark('Explicit owner grant permits access');
  await call(actors.admin, `${p1}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'read' });
  assert.equal((await call(actors.other, `${p1}/records/${own.id}`)).data.text, 'creator private');
  await call(actors.other, `${p1}/records/${own.id}/update`, { revision: 1, data: { text: 'read-only attack' } }, 403);
  await call(actors.other, `${p1}/records/${own.id}/delete`, { revision: 1 }, 403);
  await call(actors.other, `/${f2}/resources/${r1}/records/${own.id}/history`, undefined, 404);
  mark('Read grant permits reading but not mutation or cross-feature history');
  await call(actors.creator, `${p1}/records/${own.id}/update`, { revision: true, data: { text: 'invalid revision' } }, 400);
  mark('Boolean identity/revision coercion rejected');
  const update = await call(actors.creator, `${p1}/records/${own.id}/update`, { revision: 1, data: { text: 'changed' } });
  assert.equal(update.revision, 2);
  await call(actors.creator, `${p1}/records/${own.id}/update`, { revision: 1, data: { text: 'stale' } }, 409); mark('Optimistic revision conflict enforced');
  const history = await call(actors.creator, `${p1}/records/${own.id}/history`);
  assert.equal(history.length, 2); assert.equal(history[0].actor_user_id, actors.creator.id);
  assert.equal(history[1].data.text, 'creator private'); mark('Actor/revision snapshots persisted');
  const racing = await call(actors.creator, `${p1}/records`, { data: { text: 'race initial' } });
  const raceUrl = base + `${p1}/records/${racing.id}/update`;
  const races = await Promise.all(['race a', 'race b'].map((text) => fetch(raceUrl, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Cookie: `tizia_sid=${actors.creator.token}; tizia_csrf=${csrfToken}`, 'X-CSRF-Token': csrfToken },
    body: JSON.stringify({ revision: 1, data: { text } }),
  })));
  assert.deepEqual(races.map((res) => res.status).sort(), [200, 409]);
  const racingHistory = await call(actors.creator, `${p1}/records/${racing.id}/history`);
  assert.equal(racingHistory.length, 2); assert.equal(racingHistory[0].revision, 2);
  mark('Concurrent stale updates commit one mutation and one conflict');
  const compatibility = await call(actors.creator, `${p1}/records`, { data: { text: 'v1 value' } });
  await call(actors.creator, `${p1}/records/${compatibility.id}/update`, { revision: 1, data: { subtitle: 'not expanded' } }, 400);
  await call(actors.creator, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['subtitle'] }, 403);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['subtitle'] }, 403, false);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['password'] }, 400);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['subtitle'], drop_fields: ['text'] }, 400);
  const expanded = await call(actors.admin, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['subtitle'] });
  assert.deepEqual(expanded.fields, ['text', 'subtitle']);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: ['text'], add_fields: ['note'] }, 409);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: expanded.fields, add_fields: ['subtitle'] }, 400);
  await call(actors.admin, `${p1}/schema/expand`, { expected_fields: expanded.fields, add_fields: Array.from({length:31},(_,i)=>`field_${i}`) }, 400);
  mark('Admin bounded additive schema expansion validates namespace/CSRF/expected fields and rejects contraction/secrets/overflow');
  const v2 = await call(actors.creator, `${p1}/records/${compatibility.id}/update`, { revision: 1, data: { text: 'v2 text', subtitle: 'new accepted write' } });
  const v1 = await call(actors.creator, `${p1}/records/${compatibility.id}/update`, { revision: v2.revision, data: { text: 'v1 after code rollback' } });
  assert.equal(v1.data.subtitle, 'new accepted write');
  await call(actors.creator, `${p1}/records/${compatibility.id}/update`, { revision: v2.revision, data: { text: 'stale old code' } }, 409);
  assert.equal((await call(actors.creator, `${p1}/records/${compatibility.id}`)).data.subtitle, 'new accepted write');
  const cleared = await call(actors.creator, `${p1}/records/${compatibility.id}/update`, { revision: v1.revision, data: { text: null } });
  assert.equal(cleared.data.text, null);assert.equal(cleared.data.subtitle, 'new accepted write');
  const bounded = await call(actors.creator, `${p1}/records`, { data: { text: 'x'.repeat(9000), subtitle: 'y'.repeat(7000) } });
  await call(actors.creator, `${p1}/records/${bounded.id}/update`, { revision: 1, data: { text: 'z'.repeat(12000) } }, 413);
  assert.equal((await call(actors.creator, `${p1}/records/${bounded.id}`)).revision, 1);
  mark('Old feature code PATCH preserves new fields and writes; explicit null and aggregate size checks remain atomic');
  const schemaAudit = await call(actors.admin, `${p1}/technical-trace`);
  assert.equal(schemaAudit.find(x=>x.operation==='schema_expanded').actor_user_id, actors.admin.id);
  assert.ok(!JSON.stringify(schemaAudit).includes('new accepted write'));
  mark('Schema expansion audit identifies admin without payload disclosure');
  const undoRecord = await call(actors.creator, `${p1}/records`, { data: { text: 'undo base' } });
  await call(actors.creator, `${p1}/records/${undoRecord.id}/update`, { revision: 1, data: { text: 'edit one' } });
  await call(actors.creator, `${p1}/records/${undoRecord.id}/update`, { revision: 2, data: { text: 'valid later write' } });
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 2, target_revision: 1 }, 409);
  assert.equal((await call(actors.creator, `${p1}/records/${undoRecord.id}`)).data.text, 'valid later write');
  const compensated = await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 3, target_revision: 2 });
  assert.equal(compensated.revision, 4); assert.equal(compensated.data.text, 'edit one');
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 4, target_revision: 1 }, 403, false);
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 4, target_revision: true }, 400);
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 4, target_revision: 1, cutoff: Date.now() }, 400);
  mark('Compensation keeps monotonic revision and stale undo preserves later write; strict CSRF/input boundaries');
  await call(actors.creator, `${p1}/records/${undoRecord.id}/delete`, { revision: 4 });
  assert.equal((await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 5, target_revision: 4 })).deleted, false);
  mark('Delete compensation restores record without rewinding revision');
  await call(actors.admin, `${p1}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'write' });
  const interleaved = await call(actors.creator, `${p1}/records`, { data: { text: 'A creates' } });
  await call(actors.other, `${p1}/records/${interleaved.id}/update`, { revision: 1, data: { text: 'B valid write' } });
  await call(actors.creator, `${p1}/records/${interleaved.id}/update`, { revision: 2, data: { text: 'A later write' } });
  await call(actors.creator, `${p1}/records/${interleaved.id}/rollback`, { revision: 3, target_revision: 1 }, 400);
  assert.equal((await call(actors.creator, `${p1}/records/${interleaved.id}`)).data.text, 'A later write');
  assert.equal((await call(actors.creator, `${p1}/records/${interleaved.id}/rollback`, { revision: 3, target_revision: 2 })).data.text, 'B valid write');
  mark('Single-mutation compensation preserves intervening writer B and rejects historical jump');
  await call(actors.admin, `${p1}/grants`, { user_id: actors.other.id, owner_user_id: actors.creator.id, permission: 'read' });

  await d.run('UPDATE ai_record_revisions SET created_at=? WHERE record_id=? AND revision=5', [Date.now()-31*86400000, undoRecord.id]);
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 6, target_revision: 5 }, 410);
  const expiredHistory = await call(actors.creator, `${p1}/records/${undoRecord.id}/history`);
  assert.equal(expiredHistory.find(x=>x.revision===5).data, null);
  assert.equal(expiredHistory.find(x=>x.revision===5).payload_expired, true);
  mark('Logical expiry hides payload before physical sweep and rollback cannot recover it');
  await call(actors.admin, `${p1}/records/${undoRecord.id}/owner`, { revision: 6, owner_user_id: actors.other.id });
  await call(actors.admin, `${p1}/records/${undoRecord.id}/rollback`, { revision: 7, target_revision: 6 }, 410);
  await call(actors.creator, `${p1}/records/${undoRecord.id}/rollback`, { revision: 7, target_revision: 6 }, 403);
  mark('Compensation cannot cross historical ownership even for admin');
  await call(actors.creator, `${p1}/technical-trace`, undefined, 403); mark('Technical trace admin only');
  await call(actors.creator, `${p1}/records/${own.id}/owner`, { revision: 2, owner_user_id: actors.other.id }, 403); mark('Identity mutation requires admin');
  const transfer = await call(actors.admin, `${p1}/records/${own.id}/owner`, { revision: 2, owner_user_id: actors.other.id });
  assert.equal(transfer.created_by, actors.creator.id); assert.equal(transfer.revision, 3);
  await call(actors.creator, `${p1}/records/${own.id}/history`, undefined, 403); mark('Ownership transfer preserves creator and removes prior access');
  const newHistory = await call(actors.other, `${p1}/records/${own.id}/history`);
  assert.equal(newHistory.length, 1); mark('Prior owner historical payload not disclosed');
  const trace = await call(actors.admin, `${p1}/technical-trace`);
  const identity = trace.find((r) => r.operation === 'identity_mutation');
  assert.equal(identity.actor_user_id, actors.admin.id);
  assert.equal(JSON.parse(identity.detail_json).old_owner_user_id, actors.creator.id);
  assert.ok(!JSON.stringify(trace).includes('creator private')); assert.ok(!JSON.stringify(trace).includes(actors.admin.token)); mark('Identity audit metadata only, no payload/session secret');
  const deleted = await call(actors.other, `${p1}/records/${other.id}/delete`, { revision: 1 });
  assert.equal(deleted.deleted, true); assert.equal(deleted.revision, 2);
  assert.ok(!(await call(actors.other, `${p1}/records`)).some((r) => r.id === other.id)); mark('Delete retains revision but hides active-list entry');
  await call(actors.admin, `${p1}/grants`, { user_id: actors.other.id, owner_user_id: actors.other.id, permission: 'none' });
  await call(actors.other, `${p1}/records/${own.id}`, undefined, 403);
  await call(actors.other, `${p1}/records/${own.id}/history`, undefined, 403); mark('Revocation immediately blocks read and evidence');
  await d.run("UPDATE ai_feature_folders SET state='archived' WHERE id=?", [f1]);
  await call(actors.creator, `${p1}/records/${racing.id}`, undefined, 404);
  await call(actors.creator, `${p1}/records/${racing.id}/update`, { revision: 2, data: { text: 'archived attack' } }, 404);
  await d.run("UPDATE ai_feature_folders SET state='active' WHERE id=?", [f1]);
  mark('Archived feature blocks reads and writes despite retained grant');
  await d.run("UPDATE users SET role='student' WHERE id=?", [actors.admin.id]);
  await call(actors.admin, `${p1}/technical-trace`, undefined, 403); mark('Current role rechecked rather than old role');
  await d.run('DELETE FROM sessions WHERE token=?', [actors.creator.token]);
  await call(actors.creator, `${p1}/records`, undefined, 401); mark('Revoked serving session denied');
  console.log(JSON.stringify({ passed: checks.length, checks, realHttp: true, realPostgres: true, modelCalls: 0 }, null, 2));
} finally {
  await new Promise((resolve) => server.close(resolve)); await db.close();
}
