import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { tokenCounter } from '../server/ai-board/services/token-count.js';
import { adminSkillBlock, lintSkill, stageBudgets } from '../server/ai-board/services/skills.js';
import { LIMITS } from '../server/ai-board/repositories/store-contract.js';

const ENV = 'AI_BOARD_QWEN_TOKENIZER';
const SKILL = '---\nname: frontend-guide\ndescription: Hướng dẫn giao diện\ntask_type: frontend\nsource: admin\nversion: 1\nmax_tokens: 1500\n---\n1. Giữ nhãn nút rõ ràng.\n';

function withEnv(value, fn) {
  const before = process.env[ENV];
  if (value === undefined) delete process.env[ENV]; else process.env[ENV] = value;
  try { return fn(); } finally { if (before === undefined) delete process.env[ENV]; else process.env[ENV] = before; }
}

test('không có env: đếm UTF-8 bytes', () => withEnv(undefined, () => {
  const counter = tokenCounter();
  assert.equal(counter.method, 'utf8_upper_bound');
  assert.equal(counter.count('Xin chào'), 9);
}));

test('env trỏ tới file không tồn tại: fallback UTF-8 bytes, không ném lỗi', () => withEnv('C:/does/not/exist/tokenizer.json', () => {
  assert.equal(tokenCounter().method, 'utf8_upper_bound');
  assert.equal(lintSkill(SKILL, { name: 'frontend-guide' }).token_method, 'utf8_upper_bound');
}));

test('file tokenizer hỏng: fallback UTF-8 bytes', () => withEnv(fileURLToPath(import.meta.url), () => {
  assert.equal(tokenCounter().method, 'utf8_upper_bound');
}));

test('tokenizer Qwen thật: known-answer và lint dùng cùng bộ đếm', { skip: !process.env[ENV] && 'Qwen tokenizer.json không có offline' }, () => {
  const counter = tokenCounter();
  assert.equal(counter.method, 'qwen_tokenizer');
  assert.equal(counter.count('skill'), 1);
  assert.equal(counter.count('Xin chào'), 3);
  const lint = lintSkill(SKILL, { name: 'frontend-guide' });
  assert.equal(lint.ok, true);
  assert.equal(lint.token_method, 'qwen_tokenizer');
  assert.equal(lint.token_count, counter.count(adminSkillBlock({ name: 'frontend-guide', version: 1, body: lint.body })));
});
