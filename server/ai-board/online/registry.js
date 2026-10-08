import { validateUiSchema } from './schema.js';
import { BrokerError } from './adapter.js';

const NAME = /^[a-z][a-z0-9_]{0,63}$/;
export const MAX_BACKEND_SCRIPT = 100000;
const AUDIT_RETENTION_MS = 90 * 86400000;
const names = (value, max) => Array.isArray(value) && value.length > 0 && value.length <= max && new Set(value).size === value.length
  && value.every((v) => typeof v === 'string' && NAME.test(v));
const bad = (code = 'invalid_registration') => new BrokerError(code, 400);

/** DB-backed approved-operation manifest, UI schema + backend script, and persisted safe audit. Default: nothing registered = deny. */
export function createOnlineRegistry(db, { backendScripts = false } = {}) {
  const parse = (row) => row && { adapter: row.adapter, resource_id: row.resource_id,
    fields: JSON.parse(row.fields_json), response_fields: JSON.parse(row.response_fields_json) };
  return {
    operations: {
      get: async (featureId, operation) => parse(await db.get('SELECT * FROM ai_online_operations WHERE feature_id=? AND operation=?', [Number(featureId), operation])),
      names: async (featureId) => (await db.all('SELECT operation FROM ai_online_operations WHERE feature_id=? ORDER BY operation', [Number(featureId)])).map((r) => r.operation),
    },
    async ui(featureId) {
      const row = await db.get('SELECT schema_json FROM ai_online_ui WHERE feature_id=?', [Number(featureId)]);
      return row ? JSON.parse(row.schema_json) : null;
    },
    async backendScript(featureId) {
      return (await db.get('SELECT backend_script FROM ai_online_ui WHERE feature_id=?', [Number(featureId)]))?.backend_script ?? null;
    },
    /** Admin-only caller. Replaces the feature's whole registration atomically; validates against real resources and known adapters. */
    async register(featureId, adminId, input, { adapterNames }) {
      if (!input || typeof input !== 'object' || Object.keys(input).some((k) => !['operations', 'ui', 'backend_script'].includes(k))
        || !Array.isArray(input.operations) || input.operations.length > 32) throw bad();
      if (input.backend_script !== undefined) {
        if (!backendScripts) throw new BrokerError('backend_scripts_disabled', 403); // default plan: no generated backend
        if (typeof input.backend_script !== 'string' || !input.backend_script.length || input.backend_script.length > MAX_BACKEND_SCRIPT
          || input.backend_script.includes('\0')) throw bad('invalid_backend_script');
      }
      return db.tx(async (t) => {
        const folder = await t.get(`SELECT * FROM ai_feature_folders WHERE id=?${t.lockRow}`, [Number(featureId)]);
        if (!folder || !folder.approved_at || folder.state === 'archived') throw new BrokerError('feature_unavailable', 404);
        const resources = await t.all('SELECT id, fields_json FROM ai_feature_resources WHERE feature_id=?', [folder.id]);
        const byId = new Map(resources.map((r) => [r.id, JSON.parse(r.fields_json)]));
        const seen = new Set();
        const ops = input.operations.map((o) => {
          if (!o || typeof o !== 'object' || Object.keys(o).some((k) => !['operation', 'adapter', 'resource_id', 'fields', 'response_fields'].includes(k))) throw bad();
          if (typeof o.operation !== 'string' || !NAME.test(o.operation) || seen.has(o.operation)) throw bad();
          seen.add(o.operation);
          if (typeof o.adapter !== 'string' || !adapterNames.includes(o.adapter)) throw bad('unknown_adapter');
          const allowed = byId.get(o.resource_id);
          if (!allowed) throw bad('unknown_resource');
          if (!names(o.fields, 32) || o.fields.some((f) => !allowed.includes(f))) throw bad('invalid_fields');
          if (!names(o.response_fields, 16)) throw bad('invalid_response_fields');
          return o;
        });
        const ui = input.ui === undefined ? null : validateUiSchema(input.ui, { approvedOperations: ops.map((o) => o.operation) });
        if (ui) for (const b of ui.blocks) if (b.resource_id !== undefined && !byId.has(b.resource_id)) throw bad('unknown_resource');
        const now = Date.now();
        await t.run('DELETE FROM ai_online_operations WHERE feature_id=?', [folder.id]);
        for (const o of ops) {
          await t.run(`INSERT INTO ai_online_operations(feature_id, operation, adapter, resource_id, fields_json, response_fields_json, updated_by, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [folder.id, o.operation, o.adapter, o.resource_id, JSON.stringify(o.fields), JSON.stringify(o.response_fields), adminId, now]);
        }
        await t.run('DELETE FROM ai_online_ui WHERE feature_id=?', [folder.id]);
        if (ui || input.backend_script) {
          await t.run('INSERT INTO ai_online_ui(feature_id, schema_json, backend_script, updated_by, updated_at) VALUES (?, ?, ?, ?, ?)',
            [folder.id, JSON.stringify(ui ?? { version: 1, title: 'Chức năng', blocks: [] }), input.backend_script ?? null, adminId, now]);
        }
        return { operations: ops.length, ui: !!ui, backend: !!input.backend_script };
      });
    },
    /** Persisted safe trace. Never throws into the request path. */
    async audit(e) {
      try {
        await db.run('INSERT INTO ai_online_audit(feature_id, actor_user_id, operation, adapter, outcome, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [e.feature ?? null, e.actor ?? null, e.operation ?? null, e.adapter ?? null, String(e.outcome).slice(0, 64), e.at ?? Date.now()]);
      } catch (error) { console.error('[online-audit] write failed', error.code || error.message); }
    },
    async prune() { await db.run('DELETE FROM ai_online_audit WHERE created_at<=?', [Date.now() - AUDIT_RETENTION_MS]); },
  };
}
