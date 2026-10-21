import test from 'node:test';
import assert from 'node:assert/strict';
import { replaceDashes } from '../scripts/emdash-batch.mjs';

const DASH = '\u2014';
test('replaces every em dash with context punctuation and keeps code shape', () => {
  assert.equal(replaceDashes(`const a = 'Năm 1914${DASH}1918';`), "const a = 'Năm 1914\u20131918';");
  assert.equal(replaceDashes(`'Hô hấp ${DASH} quá trình tạo năng lượng cho tế bào.'`), "'Hô hấp: quá trình tạo năng lượng cho tế bào.'");
  assert.equal(replaceDashes(`'Cây xanh ${DASH} nhờ ánh sáng ${DASH} tạo ra oxy.'`), "'Cây xanh, nhờ ánh sáng, tạo ra oxy.'");
  assert.equal(replaceDashes(`'Nêu ý chính của đoạn văn rồi viết lại đầy đủ ${DASH} nhớ giữ nguyên nghĩa.'`), "'Nêu ý chính của đoạn văn rồi viết lại đầy đủ, nhớ giữ nguyên nghĩa.'");
  assert.equal(replaceDashes(`'${DASH} Một ý trong danh sách'`), "'- Một ý trong danh sách'");
  assert.equal(replaceDashes(`'Điền "mèo" ${DASH} viết: con mèo.'`), `'Điền "mèo", viết: con mèo.'`);
  assert.equal(replaceDashes(`'Có nhiều loại: cao, thấp ${DASH} đều có 3 cạnh.'`), "'Có nhiều loại: cao, thấp; đều có 3 cạnh.'");
  assert.equal(replaceDashes(`// Lớp 1 ${DASH} Barrel: gộp môn`), '// Lớp 1, Barrel: gộp môn');
  for (const sample of [`a${DASH}b`, `${DASH}`, `x ${DASH} y ${DASH} z ${DASH} w`]) assert.equal(replaceDashes(sample).includes(DASH), false, sample);
});

test('text without em dashes is returned unchanged', () => {
  const text = "const q = 'Không có gạch dài';\n// ok\n";
  assert.equal(replaceDashes(text), text);
});
