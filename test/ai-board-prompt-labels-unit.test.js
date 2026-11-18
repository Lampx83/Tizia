import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { labelFingerprint, createPromptLabelStore } from '../server/ai-board/repositories/prompt-labels.js';

const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');

test('label fingerprint matches runtime.prompt_labels.fingerprint byte for byte', () => {
  const table = { 'b.md': { production: 'b'.repeat(64) }, 'a.md': { staging: 'a'.repeat(64), production: 'c'.repeat(64) } };
  assert.equal(labelFingerprint(table), '1909d32f8cd0359407f033ba6bb4010f0d70a9db9f17401c7a4e496991b809b1');
  assert.equal(labelFingerprint({}), sha('{}'));
});

test('register refuses versions whose content does not hash to the claimed value, before any write', async () => {
  const store = createPromptLabelStore({ tx: () => assert.fail('no write expected') });
  const bad = (versions) => assert.rejects(store.register(versions, 'w'), { code: 'prompt_versions_invalid' });
  await bad({});
  await bad({ 'a.md': { hash: sha('x'), content: 'y' } });
  await bad({ '../a.md': { hash: sha('x'), content: 'x' } });
  await bad({ 'a.md': { hash: 'nothex', content: 'x' } });
});

test('set refuses an unseen diff base and bad targets before any write', async () => {
  const store = createPromptLabelStore({ tx: () => assert.fail('no write expected') });
  const h = 'a'.repeat(64);
  await assert.rejects(store.setLabel('a.md', 'production', h, 1, {}), { code: 'prompt_label_invalid' });
  await assert.rejects(store.setLabel('a.md', 'beta', h, 1, { from: null }), { code: 'prompt_label_invalid' });
  await assert.rejects(store.setLabel('a.md', 'production', 'zz', 1, { from: null }), { code: 'prompt_label_invalid' });
});
