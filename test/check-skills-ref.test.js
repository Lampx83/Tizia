import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'check-skills-ref.mjs');

test('skills-ref missing: prints skip and exits 0', () => {
  const out = spawnSync(process.execPath, [SCRIPT], { encoding: 'utf8', env: { ...process.env, PATH: '' } });
  assert.equal(out.status, 0, out.stderr);
  assert.match(out.stdout, /skip/i);
});
