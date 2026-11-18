import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parseEvalResult, judgeEval } from '../server/ai-board/prompt-promotion.js';
import { createPromptLabelStore } from '../server/ai-board/repositories/prompt-labels.js';
import { findUnreceipted } from '../scripts/check-prompt-receipts.mjs';

const H = (c) => c.repeat(64);
const split = (over = {}) => ({ false_block: 0.02, wrong_pass: 1, baseline_wrong_pass: 1, ...over });
const result = (over = {}) => ({ name: 'p.md', version_hash: H('a'), baseline_hash: H('b'), tune: split(), confirm: split(), ...over });

test('judge: passes only when both splits keep false-block under 5% and wrong-pass not above baseline', () => {
  assert.deepEqual(judgeEval(parseEvalResult(result())), { passed: true, reasons: [] });
  const fb = judgeEval(parseEvalResult(result({ confirm: split({ false_block: 0.05 }) })));
  assert.equal(fb.passed, false);
  assert.match(fb.reasons[0], /^confirm_false_block/);
  const wp = judgeEval(parseEvalResult(result({ tune: split({ wrong_pass: 2 }) })));
  assert.match(wp.reasons[0], /^tune_wrong_pass/);
  assert.equal(judgeEval(parseEvalResult(result({ tune: split({ wrong_pass: 0 }) }))).passed, true);
});

test('parse refuses malformed result files', () => {
  for (const bad of [null, result({ name: '' }), result({ version_hash: 'x' }), result({ tune: undefined }),
    result({ confirm: split({ false_block: 2 }) }), result({ tune: split({ wrong_pass: 1.5 }) }), result({ tune: split({ baseline_wrong_pass: undefined }) })]) {
    assert.throws(() => parseEvalResult(bad), { code: 'eval_receipt_invalid' });
  }
});

test('production set without a receipt is refused before any write; staging is not gated', async () => {
  const writes = [];
  const db = {
    get: async () => ({ ok: 1 }),
    run: async (sql) => { writes.push(sql); },
    tx: async () => ({ staged: true }),
  };
  const store = createPromptLabelStore(db);
  const noReceipt = { ...db, get: async (sql) => (/eval_receipts/.test(sql) ? undefined : { ok: 1 }) };
  await assert.rejects(createPromptLabelStore(noReceipt).setLabel('p.md', 'production', H('a'), 1, { from: H('b') }),
    { code: 'prompt_promotion_refused', message: 'no_eval_receipt' });
  assert.match(writes.at(-1), /ai_prompt_label_refusals/);
  assert.deepEqual(await store.setLabel('p.md', 'staging', H('a'), 1, { from: null }), { staged: true });
});

test('failing receipt is refused with its reasons; passing receipt lets the change through', async () => {
  let row = { passed: 0, reasons: 'tune_false_block_0.2_not_below_0.05' };
  const db = { get: async (sql) => (/eval_receipts/.test(sql) ? row : { ok: 1 }), run: async () => {}, tx: async () => ({ changed: true }) };
  const store = createPromptLabelStore(db);
  await assert.rejects(store.setLabel('p.md', 'production', H('a'), 1, { from: H('b') }), { code: 'prompt_promotion_refused', message: row.reasons });
  row = { passed: 1, reasons: '' };
  assert.deepEqual(await store.setLabel('p.md', 'production', H('a'), 1, { from: H('b') }), { changed: true });
});

test('receipt check: changed hash needs a passing receipt for the on-disk hash', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'receipts-'));
  const sha = (t) => createHash('sha256').update(t).digest('hex');
  mkdirSync(path.join(root, 'prompts')); mkdirSync(path.join(root, 'skills', 's1'), { recursive: true });
  writeFileSync(path.join(root, 'prompts', 'a.md'), 'new text\r\n');
  writeFileSync(path.join(root, 'prompts', 'prompts.lock.json'), JSON.stringify({ 'a.md': sha('old text\n') }));
  writeFileSync(path.join(root, 'skills', 's1', 'SKILL.md'), 'skill\n');
  writeFileSync(path.join(root, 'skills', 'skills.lock.json'), JSON.stringify({ s1: sha('skill\n') }));
  const want = sha('new text\n');
  assert.deepEqual(findUnreceipted([], root), [{ name: 'a.md', hash: want }]);
  assert.equal(findUnreceipted([{ name: 'a.md', prompt_hash: want, passed: false }], root).length, 1);
  assert.equal(findUnreceipted({ eval_receipts: [{ name: 'a.md', prompt_hash: want, passed: true }] }, root).length, 0);
});

test('repository prompts and skills match their locks with no receipts', () => {
  assert.deepEqual(findUnreceipted([]), []);
});
