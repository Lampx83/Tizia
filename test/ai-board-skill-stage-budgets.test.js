import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createSkillService, stageBudgets } from '../server/ai-board/services/skills.js';
import { LIMITS } from '../server/ai-board/repositories/store-contract.js';

const ENV = 'AI_BOARD_QWEN_TOKENIZER';

test('mỗi node có ngân sách; node không khai báo lấy giá trị toàn cục', () => {
  const budgets = stageBudgets();
  assert.deepEqual(Object.keys(budgets), ['plan', 'execute', 'verdict']);
  for (const [node, budget] of Object.entries(budgets)) {
    const own = LIMITS.skills.stages?.[node] ?? {};
    assert.equal(budget.max_per_prompt, own.max_per_prompt ?? LIMITS.skills.max_per_prompt, node);
    assert.equal(budget.max_tokens_per_prompt, own.max_tokens_per_prompt ?? LIMITS.skills.max_tokens_per_prompt, node);
  }
});

test('countTokens: mặc định đếm bằng Qwen, fallback UTF-8 khi tokenizer hỏng, và từ chối đầu vào sai', async () => {
  const before = process.env[ENV];
  delete process.env[ENV];
  try {
    const skills = createSkillService({});
    assert.deepEqual(await skills.countTokens('Xin chào'), { token_count: 3, token_method: 'qwen_tokenizer' });
    process.env[ENV] = fileURLToPath(import.meta.url); // not a tokenizer JSON
    assert.deepEqual(await skills.countTokens('Xin chào'), { token_count: 9, token_method: 'utf8_upper_bound' });
    await assert.rejects(skills.countTokens(42), (e) => e.code === 'invalid_skill' && e.status === 400);
    await assert.rejects(skills.countTokens('a'.repeat(200001)), (e) => e.status === 400);
  } finally {
    if (before !== undefined) process.env[ENV] = before;
    else delete process.env[ENV];
  }
});
