// The server ships the Qwen tokenizer used by vLLM; the Skills tab must count with it, not with UTF-8 bytes.
import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenCounter } from '../server/ai-board/services/token-count.js';

test('the shipped Qwen tokenizer is the default counter', () => {
  const saved = process.env.AI_BOARD_QWEN_TOKENIZER;
  delete process.env.AI_BOARD_QWEN_TOKENIZER;
  try {
    const counter = tokenCounter();
    assert.equal(counter.method, 'qwen_tokenizer');
    assert.equal(counter.count('hello'), 1);
    assert.equal(counter.count('Xin chào, đây là Sổ tay Git.'), 10);
  } finally {
    if (saved === undefined) delete process.env.AI_BOARD_QWEN_TOKENIZER;
    else process.env.AI_BOARD_QWEN_TOKENIZER = saved;
  }
});
