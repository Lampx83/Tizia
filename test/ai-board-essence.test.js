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
