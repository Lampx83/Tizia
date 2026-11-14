// Language guard: unaccented Vietnamese bounced for rewrite, English and accented/mixed pass. No express needed.
import test from 'node:test';
import assert from 'node:assert/strict';
import { checkLanguage, DIACRITICS_MESSAGE } from '../server/ai-board/language-guard.js';
import { checkAnswer } from '../server/contexts/ai-board-intake/clarify.js';

const UNACCENTED = [
  'Tat bo loc ky tu dac biet o o nhap lieu de em dan ma HTML truc tiep.',
  'Toi muon doi mau nut gui bai',
  'Doi mau nut bam sang mau xanh',
  'doi mau nut', // 3 từ, đủ bằng chứng (doi, mau + nut nửa điểm) → chặn
  'Minh la quan tri vien he thong, mo bang dieu khien de em xem danh sach tai khoan.',
  'Em la giao vien bo mon, cho em quyen chinh diem cua lop 10A tren trang nay.',
  'con cho nay lam trang loi qua',
];
const PASSES = [
  'Please change the button colour to blue',
  'Add a footer to the page', 'Can you make the long text bigger on the mat', 'Ban and Long can not open it', 'Minh and Long went to Hanoi',
  "I don't want to see the page title any more", 'Me and my friend can add an icon to the page',
  'Sửa nút Quay lại trên trang IT cho to hơn',
  'Thêm nút Get started vào hero section',
  'Đổi màu button sang xanh, thêm hover effect cho card',
  'Thêm dòng "doi mau nut gui bai khong duoc" vào cuối trang', // trích dẫn bị bỏ qua
  'doi mau', 'them footer', // quá ngắn: mở
  '😀 123',
];

test('unaccented Vietnamese gets needs_diacritics with a bilingual message', () => {
  for (const text of UNACCENTED) {
    const out = checkLanguage('Yêu cầu sửa trang', text);
    assert.equal(out.block, true, text);
    assert.equal(out.code, 'needs_diacritics', text);
    assert.equal(out.message, DIACRITICS_MESSAGE);
  }
  assert.match(DIACRITICS_MESSAGE, /có dấu/i);
  assert.match(DIACRITICS_MESSAGE, /with diacritics/);
});

test('English, accented, mixed and ambiguous text pass', () => {
  for (const text of PASSES) assert.equal(checkLanguage('Yêu cầu', text).block, false, text);
});

test('other languages keep the unsupported_language code', () => {
  assert.equal(checkLanguage('', '把按钮颜色改成蓝色').code, 'unsupported_language');
});

test('clarify answer: unaccented refused with the diacritics message, accented accepted', () => {
  assert.equal(checkAnswer('Toi muon doi mau nut gui bai'), DIACRITICS_MESSAGE);
  assert.equal(checkAnswer('Tôi muốn đổi màu nút gửi bài'), null);
});
