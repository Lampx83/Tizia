// A fixed JSON-record contract. No caller-controlled SQL, table names, credentials or trace text.
export class ScopedCrudError extends Error {
  constructor(code, status = 403) { super(code); this.code = code; this.status = status; }
}
const fail = (code, status) => { throw new ScopedCrudError(code, status); };
const integer = (value) => {
  if (!((typeof value === 'number') || (typeof value === 'string' && /^[1-9][0-9]*$/.test(value)))) fail('invalid_id', 400);
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 1) fail('invalid_id', 400);
  return n;
};
const PAYLOAD_RETENTION_MS = 30 * 86400000;
const AUDIT_RETENTION_MS = 90 * 86400000;
const object = (value) => value && typeof value === 'object' && !Array.isArray(value);
function envelope(value, allowed) {
  if (!object(value) || Object.entries(value).some(([key]) => !allowed.includes(key))) fail('invalid_input', 400);
}
const secret = /password|secret|token|credential|authorization|api.?key|dsn|database.?url/i;
function fields(value) {
  if (!Array.isArray(value) || !value.length || value.length > 32
    || value.some((s) => typeof s !== 'string' || !/^[a-z][a-z0-9_]{0,63}$/.test(s) || secret.test(s))
    || new Set(value).size !== value.length) fail('invalid_fields', 400);
  return value;
}
function payload(value, allowed) {
  if (!object(value) || Object.entries(value).some(([key, v]) => !allowed.includes(key)
    || !(v === null || typeof v === 'string' || typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v))))) {
    fail('invalid_payload', 400);
  }
  const json = JSON.stringify(value);
  if (Buffer.byteLength(json) > 16384) fail('payload_too_large', 413);
  return json;
}
const view = (r) => ({ id: r.id, resource_id: r.resource_id, owner_user_id: r.owner_user_id,
  created_by: r.created_by, revision: r.revision, deleted: !!r.deleted, data: JSON.parse(r.payload_json) });

export function createScopedCrud(db) {
  if (db?.dialect !== 'postgres') throw new Error('Scoped CRUD requires PostgreSQL');
  async function actor(t, identity) {
    // HTTP authenticates first; re-read the session and role inside each operation, not a cached role.
    const row = await t.get(`SELECT u.id, u.role FROM users u JOIN sessions s ON s.user_id=u.id
      WHERE u.id=? AND s.token=? AND s.expires_at>? FOR SHARE OF u, s`, [integer(identity.id), String(identity.sessionToken || ''), Date.now()]);
    if (!row) fail('authentication_required', 401);
    return row;
  }
  async function resource(t, a, featureId, resourceId) {
    // ponytail: feature-row lock serializes grants/CRUD; narrow to resource locks if contention is measured.
    const folder = await t.get(`SELECT * FROM ai_feature_folders WHERE id=?${t.lockRow}`, [integer(featureId)]);
    if (!folder || !folder.approved_at || folder.state === 'archived') fail('feature_unavailable', 404);
    const r = await t.get(`SELECT * FROM ai_feature_resources WHERE id=? AND feature_id=?${t.lockRow}`,
      [integer(resourceId), folder.id]);
    if (!r) fail('resource_not_found', 404);
    return r;
  }
  async function permitted(t, a, r, owner, write = false) {
    if (a.role === 'admin') return;
    const grant = await t.get(`SELECT permission FROM ai_resource_grants
      WHERE resource_id=? AND user_id=? AND owner_user_id=?`, [r.id, a.id, owner]);
    if (!grant || (write && grant.permission !== 'write')) fail('scope_denied');
  }
  async function record(t, a, r, id, write = false) {
    const row = await t.get(`SELECT * FROM ai_feature_records WHERE id=? AND resource_id=?${t.lockRow}`, [integer(id), r.id]);
    if (!row) fail('record_not_found', 404);
    await permitted(t, a, r, row.owner_user_id, write);
    // Deleted payload is never readable past retention, including between platform sweeps.
    if (row.deleted && row.updated_at <= Date.now() - PAYLOAD_RETENTION_MS) row.payload_json = '{}';
    return row;
  }
  async function audit(t, r, a, operation, detail) {
    await t.insert(`INSERT INTO ai_resource_audit(resource_id, actor_user_id, operation, detail_json, created_at)
      VALUES (?, ?, ?, ?, ?)`, [r.id, a.id, operation, JSON.stringify(detail), Date.now()]);
  }
  async function snapshot(t, a, row, operation) {
    await t.run(`INSERT INTO ai_record_revisions(record_id, revision, actor_user_id, owner_user_id,
      operation, payload_json, deleted, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [row.id, row.revision, a.id, row.owner_user_id, operation, row.payload_json, row.deleted, Date.now()]);
    await audit(t, { id: row.resource_id }, a, operation, { record_id: row.id, revision: row.revision, owner_user_id: row.owner_user_id });
  }
  async function operation(identity, f, r, fn) {
    return db.tx(async (t) => { const a = await actor(t, identity); return fn(t, a, await resource(t, a, f, r)); });
  }
  return {
    async prune() {
      // Platform clock only: callers cannot extend retention or supply a cutoff.
      const now = Date.now();
      await db.tx(async (t) => {
        await t.run("UPDATE ai_record_revisions SET payload_json='{}' WHERE created_at<=? AND payload_json<>'{}'", [now - PAYLOAD_RETENTION_MS]);
        await t.run('DELETE FROM ai_record_revisions WHERE created_at<=?', [now - AUDIT_RETENTION_MS]);
        await t.run("UPDATE ai_feature_records SET payload_json='{}' WHERE deleted=1 AND updated_at<=? AND payload_json<>'{}'", [now - PAYLOAD_RETENTION_MS]);
        await t.run('DELETE FROM ai_resource_audit WHERE created_at<=?', [now - AUDIT_RETENTION_MS]);
      });
    },
    async provision(identity, featureId, input) {
      envelope(input, ['name', 'fields']);
      return db.tx(async (t) => {
        const a = await actor(t, identity);
        if (a.role !== 'admin') fail('admin_required');
        const f = await t.get(`SELECT * FROM ai_feature_folders WHERE id=?${t.lockRow}`, [integer(featureId)]);
        if (!f || !f.approved_at || f.state === 'archived') fail('feature_unavailable', 404);
        const name = String(input.name || '');
        if (!/^[a-z][a-z0-9_]{0,63}$/.test(name)) fail('invalid_resource_name', 400);
        const schema = fields(input.fields);
        const id = await t.insert(`INSERT INTO ai_feature_resources(feature_id, name, fields_json, created_by, created_at)
          VALUES (?, ?, ?, ?, ?)`, [f.id, name, JSON.stringify(schema), a.id, Date.now()]);
        await t.run(`INSERT INTO ai_resource_grants(resource_id, user_id, owner_user_id, permission) VALUES (?, ?, ?, 'write')`,
          [id, f.owner_user_id, f.owner_user_id]);
        await audit(t, { id }, a, 'resource_provisioned', { creator_user_id: f.owner_user_id, fields: schema });
        return { id, name, fields: schema, creator_user_id: f.owner_user_id };
      });
    },
    async schema(identity, f, r) {
      return operation(identity, f, r, async (t, a, res) => {
        await permitted(t, a, res, a.id);
        return { fields: JSON.parse(res.fields_json), rollback_code_policy: 'preserve_schema_and_data' };
      });
    },
    async expandSchema(identity, f, r, input) {
      envelope(input, ['expected_fields', 'add_fields']);
      return operation(identity, f, r, async (t, a, res) => {
        if (a.role !== 'admin') fail('admin_required');
        const current = JSON.parse(res.fields_json);
        const expected = fields(input.expected_fields), additions = fields(input.add_fields);
        if (JSON.stringify(expected) !== JSON.stringify(current)) fail('schema_conflict', 409);
        const next = fields([...current, ...additions]);
        await t.run('UPDATE ai_feature_resources SET fields_json=? WHERE id=?', [JSON.stringify(next), res.id]);
        await audit(t, res, a, 'schema_expanded', { previous_fields: current, added_fields: additions, fields: next });
        return { fields: next, rollback_code_policy: 'preserve_schema_and_data' };
      });
    },
    async grant(identity, f, r, input) {
      envelope(input, ['user_id', 'owner_user_id', 'permission']);
      return operation(identity, f, r, async (t, a, res) => {
        if (a.role !== 'admin') fail('admin_required');
        const user = integer(input.user_id), owner = integer(input.owner_user_id);
        if (!['read', 'write', 'none'].includes(input.permission)) fail('invalid_permission', 400);
        await t.run('DELETE FROM ai_resource_grants WHERE resource_id=? AND user_id=? AND owner_user_id=?', [res.id, user, owner]);
        if (input.permission !== 'none') await t.run(`INSERT INTO ai_resource_grants(resource_id, user_id, owner_user_id, permission)
          VALUES (?, ?, ?, ?)`, [res.id, user, owner, input.permission]);
        await audit(t, res, a, 'grant_changed', { user_id: user, owner_user_id: owner, permission: input.permission });
        return { ok: true };
      });
    },
    async create(identity, f, r, input) {
      envelope(input, ['owner_user_id', 'data']);
      return operation(identity, f, r, async (t, a, res) => {
        const owner = input.owner_user_id === undefined ? a.id : integer(input.owner_user_id);
        await permitted(t, a, res, owner, true);
        const json = payload(input.data, JSON.parse(res.fields_json));
        const id = await t.insert(`INSERT INTO ai_feature_records(resource_id, owner_user_id, created_by, payload_json, updated_at)
          VALUES (?, ?, ?, ?, ?)`, [res.id, owner, a.id, json, Date.now()]);
        const row = await record(t, a, res, id, true);
        await snapshot(t, a, row, 'created');
        return view(row);
      });
    },
    async read(identity, f, r, id) {
      return operation(identity, f, r, async (t, a, res) => view(await record(t, a, res, id)));
    },
    async list(identity, f, r, ownerId) {
      return operation(identity, f, r, async (t, a, res) => {
        const owner = ownerId === undefined ? a.id : integer(ownerId);
        await permitted(t, a, res, owner);
        return (await t.all(`SELECT * FROM ai_feature_records WHERE resource_id=? AND owner_user_id=? AND deleted=0 ORDER BY id LIMIT 100`,
          [res.id, owner])).map(view);
      });
    },
    async mutate(identity, f, r, id, input, kind) {
      envelope(input, kind === 'updated' ? ['revision', 'data'] : kind === 'owner_changed' ? ['revision', 'owner_user_id'] : ['revision']);
      return operation(identity, f, r, async (t, a, res) => {
        const row = await record(t, a, res, id, true);
        if (integer(input.revision) !== row.revision) fail('revision_conflict', 409);
        let json = row.payload_json, deleted = row.deleted, owner = row.owner_user_id;
        if (kind === 'updated') {
          if (row.deleted) fail('record_deleted', 409);
          const allowed = JSON.parse(res.fields_json);
          // PATCH preserves fields unknown to an older feature client after code rollback.
          const patch = JSON.parse(payload(input.data, allowed));
          json = payload({ ...JSON.parse(row.payload_json), ...patch }, allowed);
        }
        else if (kind === 'deleted') deleted = 1;
        else if (kind === 'owner_changed') {
          if (a.role !== 'admin') fail('admin_required');
          owner = integer(input.owner_user_id);
          if (!await t.get('SELECT id FROM users WHERE id=?', [owner])) fail('owner_not_found', 404);
        } else fail('invalid_operation', 400);
        await t.run(`UPDATE ai_feature_records SET payload_json=?, deleted=?, owner_user_id=?, revision=revision+1, updated_at=? WHERE id=?`,
          [json, deleted, owner, Date.now(), row.id]);
        const next = { ...row, payload_json: json, deleted, owner_user_id: owner, revision: row.revision + 1 };
        await snapshot(t, a, next, kind);
        if (kind === 'owner_changed') await audit(t, res, a, 'identity_mutation',
          { record_id: row.id, revision: next.revision, old_owner_user_id: row.owner_user_id, new_owner_user_id: owner });
        return view(next);
      });
    },
    async rollback(identity, f, r, id, input) {
      envelope(input, ['revision', 'target_revision']);
      return operation(identity, f, r, async (t, a, res) => {
        const row = await record(t, a, res, id, true);
        if (integer(input.revision) !== row.revision) fail('revision_conflict', 409);
        const targetRevision = integer(input.target_revision);
        // Undo exactly the latest mutation; jumping back could erase another writer's intervening work.
        if (targetRevision !== row.revision - 1) fail('invalid_target_revision', 400);
        const cutoff = Date.now() - PAYLOAD_RETENTION_MS;
        const latest = await t.get('SELECT actor_user_id FROM ai_record_revisions WHERE record_id=? AND revision=? AND created_at>?', [row.id, row.revision, cutoff]);
        if (!latest) fail('rollback_expired', 410);
        if (latest.actor_user_id !== a.id) fail('mutation_not_owned');
        const target = await t.get('SELECT * FROM ai_record_revisions WHERE record_id=? AND revision=? AND owner_user_id=? AND created_at>?', [row.id, targetRevision, row.owner_user_id, cutoff]);
        if (!target) fail('rollback_target_unavailable', 410);
        const json = payload(JSON.parse(target.payload_json), JSON.parse(res.fields_json));
        await t.run('UPDATE ai_feature_records SET payload_json=?, deleted=?, revision=revision+1, updated_at=? WHERE id=?', [json, target.deleted, Date.now(), row.id]);
        const next = { ...row, payload_json: json, deleted: target.deleted, revision: row.revision + 1 };
        await snapshot(t, a, next, 'compensated');
        await audit(t, res, a, 'rollback_compensation', { record_id: row.id, revision: next.revision, replaced_revision: row.revision, target_revision: targetRevision });
        return view(next);
      });
    },
    async history(identity, f, r, id) {
      return operation(identity, f, r, async (t, a, res) => {
        const row = await record(t, a, res, id);
        const revisions = await t.all(`SELECT * FROM ai_record_revisions WHERE record_id=? AND owner_user_id=? AND created_at>? ORDER BY revision DESC LIMIT 100`,
          [row.id, row.owner_user_id, Date.now() - AUDIT_RETENTION_MS]);
        return revisions.map((s) => ({ revision: s.revision, actor_user_id: s.actor_user_id, owner_user_id: s.owner_user_id,
          operation: s.operation, data: s.created_at > Date.now() - PAYLOAD_RETENTION_MS ? JSON.parse(s.payload_json) : null, payload_expired: s.created_at <= Date.now() - PAYLOAD_RETENTION_MS, deleted: !!s.deleted, created_at: s.created_at }));
      });
    },
    async technicalTrace(identity, f, r) {
      return operation(identity, f, r, async (t, a, res) => {
        if (a.role !== 'admin') fail('admin_required');
        // Only platform-generated metadata, never arbitrary model traces, request headers or credentials.
        return t.all('SELECT id, actor_user_id, operation, detail_json, created_at FROM ai_resource_audit WHERE resource_id=? AND created_at>? ORDER BY id DESC LIMIT 100', [res.id, Date.now() - AUDIT_RETENTION_MS]);
      });
    },
  };
}

