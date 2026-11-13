import test from 'node:test';
import assert from 'node:assert/strict';
import { essenceMissing } from '../server/ai-board/security/essence.js';

const JOB4_SOURCE = '---\nname: copy-default-review\ndescription: Independent review of a candidate\ntask_type: review\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Compare the request, changed files and test evidence.\n2. Identify concrete correctness, authority or data-loss defects.\n3. Verify success claims against evidence.\n4. Keep findings tied to a file and observable behavior.\n5. Return the requested review shape and retain unresolved failures.\n6. Check authorization, untrusted input and sensitive data access.\n';
const JOB4_REWRITE = '---\nname: copy-default-review\ndescription: Independent review of a candidate\ntask_type: review\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Compare request, files, and tests.\n2. Find correctness or data issues.\n3. Check success claims.\n4. Link findings to files.\n5. Return review shape.\n6. Check access rules.';

test('negative: job 4 rewrite loses authority, untrusted input, sensitive data and unresolved failures', () => {
  const missing = essenceMissing(JOB4_SOURCE, JOB4_REWRITE);
  for (const term of ['authority', 'untrusted', 'sensitive', 'unresolved', 'observable', 'evidence']) assert.ok(missing.includes(term), term);
  assert.ok(missing.length >= 6);
});

test('a rewrite that keeps every source content word has nothing missing', () => {
  const same = JOB4_SOURCE.replace('1. Compare the request', '1. Compare the request, keeping every item');
  assert.deepEqual(essenceMissing(JOB4_SOURCE, same), []);
});

test('front matter words do not count as essence', () => {
  assert.deepEqual(essenceMissing('---\nname: x\n---\n1. Keep labels clear.', '---\nname: copy-default-x\n---\n1. Keep labels clear.'), []);
});

test('step ratio: faithful rewrite keeps every step', async () => {
  const { essenceStepRatio } = await import('../server/ai-board/security/essence.js');
  assert.deepEqual(essenceStepRatio(JOB4_SOURCE, JOB4_SOURCE), { total: 6, kept: 6, ratio: 1, lost: [] });
});

test('step ratio: compressed rewrite loses steps and reports them', async () => {
  const { essenceStepRatio } = await import('../server/ai-board/security/essence.js');
  const r = essenceStepRatio(JOB4_SOURCE, JOB4_REWRITE);
  assert.equal(r.total, 6);
  assert.ok(r.kept < 6 && r.ratio < 1);
  assert.ok(r.lost.some((s) => s.includes('authorization')));
});

test('step ratio: source without steps is ratio 1', async () => {
  const { essenceStepRatio } = await import('../server/ai-board/security/essence.js');
  assert.equal(essenceStepRatio('plain prose only', 'x').ratio, 1);
});

test('audit script exits 1 below --min and prints ratio', async () => {
  const { spawnSync } = await import('node:child_process');
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = mkdtempSync(join(tmpdir(), 'essence-'));
  writeFileSync(join(dir, 's.md'), JOB4_SOURCE);
  writeFileSync(join(dir, 'd.md'), JOB4_REWRITE);
  const run = (...extra) => spawnSync(process.execPath, ['scripts/skill-essence-audit.mjs', join(dir, 's.md'), join(dir, 'd.md'), ...extra], { encoding: 'utf8' });
  const ok = run();
  assert.equal(ok.status, 0);
  assert.match(ok.stdout, /steps kept \d+\/6/);
  assert.equal(run('--min', '1').status, 1);
});
