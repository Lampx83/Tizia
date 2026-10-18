import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';
import { createToolManifestStore, canonicalHash } from '../server/ai-board/repositories/tool-manifests.js';

const HASH = 'a'.repeat(64);
const verdict = (manifest) => ({
  outcome: 'blocked', gate_reached: 3, reason: 'x', failure_class: 'ordinary', repairs: [], candidate: null, budget_used: 1,
  gates: [{ gate: 3, blocked: true, reason: 'x', ...(manifest === undefined ? {} : { tool_manifest: manifest }) }],
});

test('gate 3 verdict keeps a well-formed tool manifest hash and drops anything else', () => {
  assert.equal(validatePrePrVerdict(verdict(HASH)).gates[0].tool_manifest, HASH);
  for (const bad of ['short', 'A'.repeat(64), `${HASH}0`, 123, null, { a: 1 }]) {
    assert.equal('tool_manifest' in validatePrePrVerdict(verdict(bad)).gates[0], false, String(bad));
  }
  assert.equal('tool_manifest' in validatePrePrVerdict(verdict(undefined)).gates[0], false);
});

test('current named-check manifest registers as pending and binds policy/runtime changes', async () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('../ai-board/harness/runtime/tool_manifest.json', import.meta.url)));
  let saved;
  const transaction = {
    async get() { return saved; },
    async run(sql, args) {
      if (sql.startsWith('INSERT INTO ai_tool_manifests(')) saved = { manifest_hash: args[0], status: 'pending' };
    },
  };
  const store = createToolManifestStore({ tx: (call) => call(transaction) });
  const registered = await store.report(manifest, 'fake-worker');
  assert.equal(registered.status, 'pending');
  assert.equal(registered.manifest_hash, canonicalHash(manifest));
  await assert.rejects(store.assertApproved(transaction, registered.manifest_hash), { code: 'tool_manifest_not_approved' });
  assert.notEqual(canonicalHash({ ...manifest, check_runtime_sha256: 'b'.repeat(64) }), registered.manifest_hash);
  await assert.rejects(store.report({ ...manifest, check_runtime_sha256: 'bad' }, 'fake-worker'), { code: 'tool_manifest_invalid' });
  await assert.rejects(store.report({ ...manifest, command_policy: { allow: [] } }, 'fake-worker'), { code: 'tool_manifest_invalid' });
});
