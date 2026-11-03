// Server settings: one module reads process.env (the Node analogue of harness settings.py); the scan keeps it so.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifierConfigured, environment, getSettings } from '../server/ai-board/settings.js';

const ROOT = fileURLToPath(new URL('../server/ai-board/', import.meta.url));

function jsFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : jsFiles(full);
    return entry.name.endsWith('.js') ? [full] : [];
  });
}

test('only settings.js reads process.env', () => {
  const readers = jsFiles(ROOT)
    .filter((file) => path.basename(file) !== 'settings.js')
    .filter((file) => /process\s*\.\s*env|process\s*\[\s*['"]env['"]\s*\]/.test(fs.readFileSync(file, 'utf8')))
    .map((file) => path.relative(ROOT, file));
  assert.deepEqual(readers, []);
});

test('environment() returns the process environment', () => {
  assert.equal(environment(), process.env);
});

test('flags accept the same spellings as the harness and the classifier needs url + model', () => {
  for (const value of ['1', 'true', 'ON', 'yes']) assert.equal(getSettings({ AI_BOARD_MULTIMODAL: value }).multimodal, true);
  for (const value of ['0', 'false', 'no', '']) assert.equal(getSettings({ AI_BOARD_MULTIMODAL: value }).multimodal, false);
  assert.equal(classifierConfigured({ VLLM_URL: 'http://x/vllm', AI_BOARD_CLASSIFIER_MODEL: 'q' }), true);
  assert.equal(classifierConfigured({ VLLM_URL: 'http://x/vllm' }), false);
  assert.equal(classifierConfigured({ AI_BOARD_CLASSIFIER_MODEL: 'q' }), false);
});

test('settings trims text and keeps the sandbox defaults off', () => {
  const settings = getSettings({ AI_BOARD_CLASSIFIER_MODEL: '  qwen  ', AI_BOARD_MODEL_ROUTING: 'true' });
  assert.equal(settings.classifierModel, 'qwen');
  assert.equal(settings.modelRouting, true);
  assert.equal(settings.shots.createBucket, false);
  assert.equal(getSettings({ AI_BOARD_SHOTS_S3_CREATE_BUCKET: '1' }).shots.createBucket, true);
});
