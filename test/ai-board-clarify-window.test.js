import test from 'node:test';
import assert from 'node:assert/strict';
import { conversationText } from '../server/contexts/ai-board-intake/clarify.js';

const request = { title: 'Thêm trang Sổ tay Git', detail: 'mô tả gốc' };
const turns = (n) => Array.from({ length: n }, (_, i) => [
  { kind: 'question', text: `câu hỏi ${i} ${'q'.repeat(200)}` },
  { kind: 'answer', text: `đáp ${i} ${'a'.repeat(200)}` },
]).flat();

test('short conversation keeps every turn in order', () => {
  const text = conversationText(request, turns(2));
  assert.match(text, /Tiêu đề: Thêm trang Sổ tay Git/);
  assert.ok(text.indexOf('câu hỏi 0') < text.indexOf('đáp 1'));
  assert.doesNotMatch(text, /trả lời trước đó/);
});

test('old turns shrink to answers; title and description survive the cap', () => {
  const text = conversationText(request, turns(20));
  assert.ok(text.length <= 6000);
  assert.match(text, /Tiêu đề: Thêm trang Sổ tay Git/);
  assert.match(text, /Mô tả: mô tả gốc/);
  assert.match(text, /trả lời trước đó:\n- đáp 0 /);
  assert.doesNotMatch(text, /câu hỏi 0 /);
  assert.match(text, /Người dùng đáp: đáp 19 /);
});
