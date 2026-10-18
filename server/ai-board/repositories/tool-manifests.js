import { createHash } from 'node:crypto';
import { WorkerContractError } from './store-contract.js';

const HASH = /^[0-9a-f]{64}$/;
const EFFECTS = ['read', 'draft_write', 'control'];
const FIELDS = ['name', 'description', 'parameters', 'effect', 'max_arg_bytes', 'max_output_chars', 'max_seconds'];
export const LOOP_TOOLS = new Set(['tree', 'outline', 'grep', 'read_file', 'edit_file', 'write_test', 'run_check', 'finish']);
const fail = (code, status = 409) => { throw new WorkerContractError(code, status, code); };
const sorted = (value) => Array.isArray(value) ? value.map(sorted)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, sorted(value[key])])) : value;

/** Same bytes as runtime.tool_manifest.canonical_hash: sorted keys, compact separators, raw UTF-8. */
export const canonicalHash = (manifest) => createHash('sha256').update(JSON.stringify(sorted(manifest)), 'utf8').digest('hex');

function check(manifest) {
  if (![1, 2, 3].includes(manifest?.version)) fail('tool_manifest_invalid', 400);
  if (manifest.version >= 2) {
    const fields = manifest.version === 3 ? ['version', 'tools', 'command_policy', 'check_runtime_sha256']
      : ['version', 'tools', 'command_policy'];
    const policy = manifest.command_policy;
    const strings = (value) => Array.isArray(value) && value.every((item) => typeof item === 'string' && item.length > 0);
    if (Reflect.ownKeys(manifest).sort().join() !== fields.sort().join()
      || !policy || Reflect.ownKeys(policy).sort().join() !== ['allow', 'deny_args', 'deny_sql', 'deny_write'].sort().join()
      || !Array.isArray(policy.allow) || !policy.allow.length || !policy.allow.every((prefix) => strings(prefix) && prefix.length)
      || !['deny_args', 'deny_sql', 'deny_write'].every((name) => strings(policy[name]))) fail('tool_manifest_invalid', 400);
    if (manifest.version === 3 && !HASH.test(String(manifest.check_runtime_sha256))) fail('tool_manifest_invalid', 400);
    check({ version: 1, tools: manifest.tools });
    return;
  }
  const ok = manifest && typeof manifest === 'object' && Number.isSafeInteger(manifest.version) && Array.isArray(manifest.tools)
    && manifest.tools.length > 0 && manifest.tools.length <= 32 && Object.keys(manifest).length === 2;
  if (!ok) fail('tool_manifest_invalid', 400);
  const seen = new Set();
  for (const tool of manifest.tools) {
    const caps = ['max_arg_bytes', 'max_output_chars', 'max_seconds'].map((key) => tool?.[key]);
    if (caps.some((value) => !Number.isFinite(value))) fail('tool_manifest_invalid', 400);
    if (!tool || typeof tool !== 'object' || Object.keys(tool).sort().join() !== [...FIELDS].sort().join()
      || !LOOP_TOOLS.has(tool.name) || seen.has(tool.name) || !EFFECTS.includes(tool.effect)
      || tool.parameters?.type !== 'object' || caps.some((n) => typeof n !== 'number' || !(n > 0))) fail('tool_manifest_invalid', 400);
    seen.add(tool.name);
  }
}

export function createToolManifestStore(db) {
  const summary = (row) => {
    const manifest = JSON.parse(row.manifest_json);
    return {
      manifest_hash: row.manifest_hash, version: row.version, status: row.status, reported_by: row.reported_by,
      decided_by: row.decided_by, decided_at: row.decided_at, created_at: row.created_at,
      tools: manifest.tools.map((t) => ({ name: t.name, effect: t.effect, max_arg_bytes: t.max_arg_bytes,
        max_output_chars: t.max_output_chars, max_seconds: t.max_seconds })),
    };
  };
  return {
    /** Worker with a live lease reports its manifest; unseen content becomes pending, never approved. */
    async report(manifest, reporter, now = Date.now()) {
      check(manifest);
      const hash = canonicalHash(manifest);
      return db.tx(async (t) => {
        let row = await t.get('SELECT * FROM ai_tool_manifests WHERE manifest_hash=?' + t.lockRow, [hash]);
        if (!row) {
          await t.run(`INSERT INTO ai_tool_manifests(manifest_hash,version,manifest_json,status,reported_by,created_at,updated_at)
            VALUES (?,?,?,'pending',?,?,?)`, [hash, manifest.version, JSON.stringify(manifest), String(reporter).slice(0, 80), now, now]);
          await t.run('INSERT INTO ai_tool_manifest_audit(manifest_hash,action,actor,created_at) VALUES (?,?,?,?)',
            [hash, 'reported', `worker:${String(reporter).slice(0, 80)}`, now]);
          row = await t.get('SELECT * FROM ai_tool_manifests WHERE manifest_hash=?', [hash]);
        }
        return { manifest_hash: hash, status: row.status };
      });
    },
    /** Inside the caller's transaction: only an approved hash may run loop tools. */
    async assertApproved(t, hash) {
      if (typeof hash !== 'string' || !HASH.test(hash)) fail('tool_manifest_required', 409);
      const row = await t.get('SELECT status FROM ai_tool_manifests WHERE manifest_hash=?', [hash]);
      if (!row) fail('tool_manifest_unknown');
      if (row.status !== 'approved') fail('tool_manifest_not_approved');
    },
    async list() {
      return (await db.all('SELECT * FROM ai_tool_manifests ORDER BY created_at DESC, manifest_hash')).map(summary);
    },
    async decide(hash, action, adminId, now = Date.now()) {
      if (!HASH.test(String(hash)) || !['approve', 'revoke'].includes(action)) fail('tool_manifest_invalid', 400);
      return db.tx(async (t) => {
        const row = await t.get('SELECT * FROM ai_tool_manifests WHERE manifest_hash=?' + t.lockRow, [hash]);
        if (!row) fail('tool_manifest_unknown', 404);
        const next = action === 'approve' ? 'approved' : 'revoked';
        if (row.status === next) return summary(row);
        if (action === 'approve' && row.status === 'revoked') fail('tool_manifest_revoked');
        if (action === 'revoke' && row.status === 'pending') fail('tool_manifest_not_approved');
        await t.run('UPDATE ai_tool_manifests SET status=?, decided_by=?, decided_at=?, updated_at=? WHERE manifest_hash=?',
          [next, Number(adminId), now, now, hash]);
        await t.run('INSERT INTO ai_tool_manifest_audit(manifest_hash,action,actor,created_at) VALUES (?,?,?,?)',
          [hash, next === 'approved' ? 'approved' : 'revoked', `admin:${Number(adminId)}`, now]);
        return summary(await t.get('SELECT * FROM ai_tool_manifests WHERE manifest_hash=?', [hash]));
      });
    },
  };
}
