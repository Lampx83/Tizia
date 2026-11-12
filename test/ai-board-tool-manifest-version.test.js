import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkManifest } from '../server/ai-board/repositories/tool-manifests.js';

const harness = JSON.parse(readFileSync(new URL('../ai-board/harness/runtime/tool_manifest.json', import.meta.url), 'utf8'));

test('server accepts the manifest version the harness ships', () => {
  assert.doesNotThrow(() => checkManifest(harness));
});

test('server still rejects a version it does not know', () => {
  assert.throws(() => checkManifest({ ...harness, version: harness.version + 1 }), { code: 'tool_manifest_invalid' });
});
