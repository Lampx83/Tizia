import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { checkManifest, canonicalHash } from '../server/ai-board/repositories/tool-manifests.js';

const harness = JSON.parse(readFileSync(new URL('../ai-board/harness/runtime/tool_manifest.json', import.meta.url), 'utf8'));
const clone = () => structuredClone(harness);

test('server tool schema matches the harness registry', () => {
  const run = spawnSync(process.execPath, ['scripts/ai-board-discover-tools.mjs', '--check'], { encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
});

test('unknown tool field and unknown tool name stay rejected', () => {
  const extra = clone(); extra.tools[0].surprise = 1;
  assert.throws(() => checkManifest(extra), { code: 'tool_manifest_invalid' });
  const alien = clone(); alien.tools[0].name = 'rm_rf';
  assert.throws(() => checkManifest(alien), { code: 'tool_manifest_invalid' });
});

test('adding or editing a tool example changes the hash, so it needs fresh approval', () => {
  const edited = clone(); edited.tools[0].example = { changed: true };
  assert.doesNotThrow(() => checkManifest(edited));
  assert.notEqual(canonicalHash(edited), canonicalHash(harness));
});
