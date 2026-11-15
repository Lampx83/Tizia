import { createHash } from 'node:crypto';
import { WorkerContractError } from './store-contract.js';

const HASH = /^[0-9a-f]{64}$/;
const NAME = /^[a-z_]{1,40}$/;
const MAX_PRIMITIVES = 16;
const fail = (code, status = 409) => { throw new WorkerContractError(code, status, code); };
const sorted = (value) => Array.isArray(value) ? value.map(sorted)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, sorted(value[key])])) : value;

/** Same bytes as runtime canonical_hash in verification/check_registry.py: sorted keys, compact separators, raw UTF-8. */
export const canonicalHash = (registry) => createHash('sha256').update(JSON.stringify(sorted(registry)), 'utf8').digest('hex');

function check(registry) {
  const primitives = registry?.primitives;
  if (!registry || typeof registry !== 'object' || !Number.isSafeInteger(registry.version) || Object.keys(registry).length !== 2
    || !primitives || typeof primitives !== 'object' || Array.isArray(primitives)) fail('check_registry_invalid', 400);
  const names = Object.keys(primitives);
  if (!names.length || names.length > MAX_PRIMITIVES) fail('check_registry_invalid', 400);
  for (const name of names) {
    const params = primitives[name];
    if (!NAME.test(name) || !Array.isArray(params) || !params.every((param) => typeof param === 'string' && param.length > 0)) {
      fail('check_registry_invalid', 400);
    }
  }
}

export { check as checkRegistry };

export function createCheckRegistryStore(db) {
  const summary = (row) => ({
    registry_hash: row.registry_hash, version: row.version, status: row.status, reported_by: row.reported_by,
    decided_by: row.decided_by, decided_at: row.decided_at, created_at: row.created_at,
    primitives: Object.keys(JSON.parse(row.registry_json).primitives).sort(),
  });
  return {
    /** Worker với lease báo registry của nó; nội dung chưa thấy thành pending, không bao giờ approved tự động. */
    async report(registry, reporter, now = Date.now()) {
      check(registry);
      const hash = canonicalHash(registry);
      return db.tx(async (t) => {
        let row = await t.get('SELECT * FROM ai_check_registries WHERE registry_hash=?' + t.lockRow, [hash]);
        if (!row) {
          await t.run(`INSERT INTO ai_check_registries(registry_hash,version,registry_json,status,reported_by,created_at,updated_at)
            VALUES (?,?,?,'pending',?,?,?)`, [hash, registry.version, JSON.stringify(registry), String(reporter).slice(0, 80), now, now]);
          await t.run('INSERT INTO ai_check_registry_audit(registry_hash,action,actor,created_at) VALUES (?,?,?,?)',
            [hash, 'reported', `worker:${String(reporter).slice(0, 80)}`, now]);
          row = await t.get('SELECT * FROM ai_check_registries WHERE registry_hash=?', [hash]);
        }
        return { registry_hash: hash, status: row.status };
      });
    },
    /** Trong transaction của caller: chỉ registry đã duyệt mới được chạy check. */
    async assertApproved(t, hash) {
      if (typeof hash !== 'string' || !HASH.test(hash)) fail('check_registry_required', 409);
      const row = await t.get('SELECT status FROM ai_check_registries WHERE registry_hash=?', [hash]);
      if (!row) fail('check_registry_unknown');
      if (row.status !== 'approved') fail('check_registry_not_approved');
    },
    async list() {
      return (await db.all('SELECT * FROM ai_check_registries ORDER BY created_at DESC, registry_hash')).map(summary);
    },
    async decide(hash, action, adminId, now = Date.now()) {
      if (!HASH.test(String(hash)) || !['approve', 'revoke'].includes(action)) fail('check_registry_invalid', 400);
      return db.tx(async (t) => {
        const row = await t.get('SELECT * FROM ai_check_registries WHERE registry_hash=?' + t.lockRow, [hash]);
        if (!row) fail('check_registry_unknown', 404);
        const next = action === 'approve' ? 'approved' : 'revoked';
        if (row.status === next) return summary(row);
        if (action === 'approve' && row.status === 'revoked') fail('check_registry_revoked');
        if (action === 'revoke' && row.status === 'pending') fail('check_registry_not_approved');
        await t.run('UPDATE ai_check_registries SET status=?, decided_by=?, decided_at=?, updated_at=? WHERE registry_hash=?',
          [next, Number(adminId), now, now, hash]);
        await t.run('INSERT INTO ai_check_registry_audit(registry_hash,action,actor,created_at) VALUES (?,?,?,?)',
          [hash, next === 'approved' ? 'approved' : 'revoked', `admin:${Number(adminId)}`, now]);
        return summary(await t.get('SELECT * FROM ai_check_registries WHERE registry_hash=?', [hash]));
      });
    },
  };
}
