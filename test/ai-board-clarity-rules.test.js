// Deterministic clarity rules decide clarification without any model; the logprob classifier
// only acts in mode 'active' (danger ships active, clarity stays 'shadow' until calibrated).
import test from 'node:test';
import assert from 'node:assert/strict';

import { answersClear, checkClarity, clarifyFromPhase, resolveClarify } from '../server/ai-board/clarity-rules.js';
import { CLASSIFIER, classifyRequest } from '../server/ai-board/classifier.js';

test('excluded actions do not turn a single ETA copy change into multiple tasks', () => {
  const result = checkClarity('Thêm giải thích thời gian chờ worker',
    'Ở tab Của bạn, thêm câu trên dòng hàng đợi. Không sửa quyền, không tạo trang mới, không cập nhật cấu hình.');
  assert.equal(result.needed, false);
  assert.equal(checkClarity('Thêm nút trên trang', 'Không sửa quyền, nhưng tạo trang và cập nhật ảnh.').mode, 'split');
});

test('negation with a filler word and an "or" list removes every negated verb', () => {
  assert.equal(checkClarity('Trang ghi chú nhanh', 'Mình muốn có một trang ghi chú nhanh: gõ một ghi chú ngắn, bấm Lưu thì '
    + 'ghi chú hiện trong danh sách bên dưới, và tải lại trang vẫn còn. Chỉ cần thêm và xem, chưa cần sửa hay xoá.').needed, false);
  assert.equal(checkClarity('Thêm nút Lưu', 'Thêm nút Lưu, không cần sửa hay xoá hay đổi gì khác.').needed, false);
  assert.equal(checkClarity('them nut luu', 'them nut luu cho trang, chua can sua hay xoa.').needed, false);
  assert.equal(checkClarity('Thêm nút', 'Không chỉ thêm nút mà còn sửa tiêu đề và xoá ảnh cũ.').mode, 'split');
});

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

test('danger ships active (escalate-only) and clarity shadows; a shadow result never acts', async () => {
  assert.equal(CLASSIFIER.tasks.clarity.mode, 'shadow');
  assert.equal(CLASSIFIER.tasks.danger.mode, 'active');
  assert.equal(CLASSIFIER.tasks.danger.scoring.reject_min, null);
  const body = (letter) => ({ logprobs: [{ token: letter, logprob: 0, top_logprobs: [{ token: letter, logprob: 0 }] }] });
  const fetchImpl = async (_url, init) => ({
    ok: true, json: async () => body(JSON.parse(init.body).prompt.includes('thuộc nhóm nào') ? 'D' : 'B'),
  });
  const env = { OLLAMA_URL: 'http://o', AI_BOARD_CLASSIFIER_MODEL: 'm' };
  const out = await classifyRequest('x', 'y', { env, fetchImpl });
  assert.equal(out.clarity.shadow, true);   // model said vague, but it is only logged
  assert.equal(out.clarity.probs.vague, 1);
  assert.equal(out.danger.shadow, false);    // danger acts, escalate-only
  assert.deepEqual(out.danger.labels, ['sexual']);
  const shadow = await classifyRequest('x', 'y', { env, fetchImpl, modes: { clarity: 'off', danger: 'shadow' } });
  assert.equal(shadow.clarity, null);
  assert.equal(shadow.danger.shadow, true);
});

test('resolveClarify merges rules, model, feature override and client support', () => {
  const clear = ['Sửa màu nút gửi trong hộp chat', 'Đổi màu nút gửi ở hộp chat FAB sang xanh lá, chỉ ở trang pharmacy.'];
  const vague = ['Sửa cái này', 'làm đẹp hơn'];
  const decide = (over) => { const { rules, ...out } = resolveClarify({ title: clear[0], detail: clear[1], ...over }); return out; };

  assert.deepEqual(decide({}), { needed: false, mode: null, source: [] });
  assert.deepEqual(decide({ title: vague[0], detail: vague[1] }), { needed: true, mode: 'ask', source: ['rules'] });
  assert.deepEqual(decide({ title: vague[0], detail: vague[1], enabled: false }), { needed: false, mode: null, source: ['rules'] },
    'old clients are never put in clarifying');
  assert.deepEqual(decide({ classified: { clarity: { needed: true, mode: 'ask' } } }), { needed: true, mode: 'ask', source: ['model'] });
  assert.deepEqual(decide({ classified: { clarity: { needed: true, mode: 'ask', shadow: true } } }), { needed: false, mode: null, source: [] },
    'shadow-mode model verdict is log-only');
  assert.equal(decide({ title: vague[0], detail: vague[1], classified: { clarity: { needed: true, mode: 'split' } } }).mode, 'split',
    'split from the model beats ask from the rules');
  assert.deepEqual(decide({ isFeature: true, classified: { clarity: { needed: true, mode: 'split' } } }),
    { needed: true, mode: 'feature', source: ['rules'] }, 'feature override ignores the model');
});

test('clarifyFromPhase reports the stored phase of an idempotent replay', () => {
  assert.deepEqual(clarifyFromPhase('clarifying'), { needed: true, mode: 'ask' });
  assert.deepEqual(clarifyFromPhase('queued'), { needed: false, mode: null });
});

test('model_first: an active model verdict decides alone and the rule hits stay an observation; rules decide without one', () => {
  const vague = { title: 'Sửa cái này', detail: 'làm đẹp hơn' };
  const broad = { title: 'Làm lại', detail: 'thêm nút, sửa chữ, xoá ảnh, tạo bảng, đổi màu' };
  const decide = (over) => resolveClarify({ ...vague, modelFirst: true, ...over });
  const clear = decide({ classified: { clarity: { needed: false, mode: null } } });
  assert.deepEqual([clear.needed, clear.source], [false, ['model']]);
  assert.ok(clear.rules.needed, 'rules still computed for the trace');
  assert.deepEqual(decide({ ...broad, classified: { clarity: { needed: true, mode: 'ask' } } }).mode, 'ask', 'model mode wins over rule split');
  assert.deepEqual(decide({ classified: { clarity: { needed: true, mode: 'split' } } }).mode, 'split');
  for (const classified of [null, { clarity: null }, { clarity: { needed: false, mode: null, shadow: true } }]) {
    assert.deepEqual([decide({ classified }).needed, decide({ classified }).source], [true, ['rules']], 'no active model: rules decide');
  }
  assert.equal(decide({ classified: { clarity: { needed: false } }, enabled: false }).needed, false);
  assert.equal(resolveClarify({ ...vague, classified: { clarity: { needed: false, mode: null } } }).needed, true, 'flag off: rules still win');
});
