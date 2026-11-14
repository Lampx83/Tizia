import test from 'node:test';
import assert from 'node:assert/strict';
import { essenceMissing } from '../server/ai-board/security/essence.js';

const JOB4_SOURCE = '---\nname: copy-default-review\ndescription: Independent review of a candidate. Use when the skill applies.\nmetadata:\n  task_type: "review"\n  source: "admin"\n  version: "1"\n  max_tokens: "1500"\n---\n1. Compare the request, changed files and test evidence.\n2. Identify concrete correctness, authority or data-loss defects.\n3. Verify success claims against evidence.\n4. Keep findings tied to a file and observable behavior.\n5. Return the requested review shape and retain unresolved failures.\n6. Check authorization, untrusted input and sensitive data access.\n';
const JOB4_REWRITE = '---\nname: copy-default-review\ndescription: Independent review of a candidate. Use when the skill applies.\nmetadata:\n  task_type: "review"\n  source: "admin"\n  version: "1"\n  max_tokens: "1500"\n---\n1. Compare request, files, and tests.\n2. Find correctness or data issues.\n3. Check success claims.\n4. Link findings to files.\n5. Return review shape.\n6. Check access rules.';

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

test('step ratio: short imperative step dropped lowers ratio, kept verbatim counts', async () => {
  const { essenceStepRatio } = await import('../server/ai-board/security/essence.js');
  const src = '1. Run npm test.\n2. Compare request, files and tests.';
  const dropped = essenceStepRatio(src, '2. Compare request, files and tests.');
  assert.deepEqual([dropped.total, dropped.kept, dropped.lost], [2, 1, ['Run npm test.']]);
  assert.equal(essenceStepRatio(src, 'first: run NPM test now\n2. Compare request, files and tests.').kept, 2);
});

test('step ratio: guardrail bullets and nested lines are not steps; procedure bullets are', async () => {
  const { essenceStepRatio } = await import('../server/ai-board/security/essence.js');
  const src = '## Guardrails\n- Never leak secrets.\n## Steps\n- Compare evidence carefully.\n  - nested detail here\n1. Verify claims against evidence.\n   1. nested numbered item';
  const r = essenceStepRatio(src, 'nothing');
  assert.equal(r.total, 2);
  assert.deepEqual(r.lost, ['Compare evidence carefully.', 'Verify claims against evidence.']);
  assert.equal(essenceStepRatio('## Examples\n- one example here\n', 'x').ratio, 1);
});

test('audit script exits 2 on NaN --min and missing args', async () => {
  const { spawnSync } = await import('node:child_process');
  const run = (...a) => spawnSync(process.execPath, ['scripts/skill-essence-audit.mjs', ...a], { encoding: 'utf8' });
  assert.equal(run('a.md', 'b.md', '--min', 'abc').status, 2);
  assert.equal(run().status, 2);
  assert.equal(run('only-source.md').status, 2);
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
