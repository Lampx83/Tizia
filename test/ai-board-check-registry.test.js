import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { canonicalHash, createCheckRegistryStore } from '../server/ai-board/repositories/check-registries.js';

// Băm do runtime/Python tính (verification/check_registry.py): sai lệch là worker và server không cùng byte.
const PYTHON_HASH = '8c85b991af6f27697cf5be319674a3296693080abf3ef7da85c8b94de6b59811';
const registry = JSON.parse(fs.readFileSync(new URL('../ai-board/harness/verification/check_registry.json', import.meta.url), 'utf8'));

function fakeDb() {
  const rows = new Map();
  const transaction = {
    lockRow: '',
    async get(sql, args) {
      if (sql.startsWith('SELECT * FROM ai_check_registries WHERE registry_hash=?') || sql.startsWith('SELECT status FROM ai_check_registries')) {
        return rows.get(args[0]) ?? undefined;
      }
      return undefined;
    },
    async run(sql, args) {
      if (sql.startsWith('INSERT INTO ai_check_registries(')) rows.set(args[0], { registry_hash: args[0], version: args[1], registry_json: args[2], status: 'pending', reported_by: args[3], created_at: args[4], updated_at: args[5] });
      if (sql.startsWith('UPDATE ai_check_registries SET status=?')) Object.assign(rows.get(args[4]), { status: args[0], decided_by: args[1] });
    },
  };
  return { rows, db: { tx: (call) => call(transaction), all: async () => [...rows.values()] }, transaction };
}

test('registry hash matches the Python runtime byte for byte', () => {
  assert.equal(canonicalHash(registry), PYTHON_HASH);
  assert.notEqual(canonicalHash({ ...registry, version: registry.version + 1 }), PYTHON_HASH);
});

test('worker registry registers as pending and stays unusable until admin approval', async () => {
  const { db, rows, transaction } = fakeDb();
  const store = createCheckRegistryStore(db);
  const reported = await store.report(registry, 'fake-worker');
  assert.equal(reported.status, 'pending');
  assert.equal(reported.registry_hash, PYTHON_HASH);
  await assert.rejects(store.assertApproved(transaction, PYTHON_HASH), { code: 'check_registry_not_approved' });
  await store.decide(PYTHON_HASH, 'approve', 7);
  assert.equal(rows.get(PYTHON_HASH).status, 'approved');
  await store.assertApproved(transaction, PYTHON_HASH);
});

test('a mismatched or never-reported registry is unknown, a missing hash is invalid', async () => {
  const { db, transaction } = fakeDb();
  const store = createCheckRegistryStore(db);
  await assert.rejects(store.assertApproved(transaction, 'a'.repeat(64)), { code: 'check_registry_unknown' });
  await assert.rejects(store.assertApproved(transaction, undefined), { code: 'check_registry_required' });
});

test('malformed registry is refused before storage', async () => {
  const { db } = fakeDb();
  const store = createCheckRegistryStore(db);
  await assert.rejects(store.report({ ...registry, primitives: {} }, 'w'), { code: 'check_registry_invalid' });
  await assert.rejects(store.report({ ...registry, primitives: { 'Bad-Name': ['path'] } }, 'w'), { code: 'check_registry_invalid' });
  await assert.rejects(store.report({ ...registry, primitives: { text_present: 'path' } }, 'w'), { code: 'check_registry_invalid' });
  await assert.rejects(store.report({ ...registry, extra: 1 }, 'w'), { code: 'check_registry_invalid' });
});
