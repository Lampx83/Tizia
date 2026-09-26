// Ticket 08: deterministic clarity rules decide clarification without any model; the logprob classifier
// only acts in mode 'active' (clarity ships in 'shadow' until ticket 01 calibrates it).
import test from 'node:test';
import assert from 'node:assert/strict';

import { answersClear, checkClarity } from '../server/ai-board/clarity-rules.js';
import { CLASSIFIER, classifyRequest } from '../server/ai-board/classifier.js';

test('vague requests trigger clarification without a model', () => {
  for (const [title, detail] of [
    ['Sửa cái trang', 'làm cho đẹp hơn'],
    ['Góp ý', '[Trang: Tiểu học] /school.html?domain=primary\nsửa lại'], // page line does not count as words
    ['Chỗ này bị sai', 'cái đó không đúng như trên'],
    ['Cải thiện trải nghiệm', 'tối ưu và nâng cấp cho mượt'],
  ]) {
    const out = checkClarity(title, detail);
    assert.equal(out.needed, true, `${title} / ${detail}`);
    assert.equal(out.mode, 'ask');
    assert.ok(out.reasons.length > 0);
  }
});

test('too broad requests go to split mode', () => {
  assert.deepEqual(checkClarity('Làm lại toàn bộ trang web', 'cho hiện đại').mode, 'split');
  const listed = checkClarity('Nhiều việc', '- thêm bài hình học\n- đổi màu nút Gửi\n- xóa ảnh cũ ở trang chủ');
  assert.equal(listed.mode, 'split');
  assert.equal(checkClarity('Thêm bài hình học, đổi màu nút Gửi và xóa ảnh cũ', 'ở trang chủ lớp 5').mode, 'split');
});

test('clear requests pass untouched', () => {
  for (const [title, detail] of [
    ['Đổi màu nút Gửi trang pricing sang xanh #2563eb', ''],
    ['Thêm bài tập phân số lớp 4', '[Trang: Tiểu học] /school.html\n10 câu trắc nghiệm, có đáp án giải thích'],
    ['Nút Bắt đầu nhỏ quá trên điện thoại', 'làm nút to hơn, cao khoảng 48px'],
  ]) {
    assert.deepEqual(checkClarity(title, detail), { needed: false, mode: null, reasons: [] }, title);
  }
});

test('grilling stops by rule once the answers name a concrete thing', () => {
  assert.equal(answersClear(['trả lời 1', 'không biết nữa']), false);
  assert.equal(answersClear(['Trang chủ Tiểu học, nút Bắt đầu nhỏ quá']), true);
  assert.equal(answersClear(['làm lại toàn bộ các nút']), false); // still too broad
});

test('clarity ships in shadow, danger active; shadow results never act', async () => {
  assert.equal(CLASSIFIER.tasks.clarity.mode, 'shadow');
  assert.equal(CLASSIFIER.tasks.danger.mode, 'active');
  const body = (letter) => ({ logprobs: [{ token: letter, logprob: 0, top_logprobs: [{ token: letter, logprob: 0 }] }] });
  const fetchImpl = async (_url, init) => ({
    ok: true, json: async () => body(JSON.parse(init.body).prompt.includes('thuộc nhóm nào') ? 'D' : 'B'),
  });
  const env = { OLLAMA_URL: 'http://o', AI_BOARD_CLASSIFIER_MODEL: 'm' };
  const out = await classifyRequest('x', 'y', { env, fetchImpl });
  assert.equal(out.clarity.shadow, true);   // model said vague, but it is only logged
  assert.equal(out.clarity.probs.vague, 1);
  assert.equal(out.danger.shadow, false);
  assert.deepEqual(out.danger.labels, ['sexual']);
  const off = await classifyRequest('x', 'y', { env, fetchImpl, modes: { clarity: 'off', danger: 'shadow' } });
  assert.equal(off.clarity, null);
  assert.equal(off.danger.shadow, true);
});
