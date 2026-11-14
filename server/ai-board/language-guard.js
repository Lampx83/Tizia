// Chỉ nhận yêu cầu tiếng Việt hoặc tiếng Anh — tất định, không LLM, không thư viện nhận diện ngôn ngữ.
// Chặn ngôn ngữ khác và tiếng Việt gõ không dấu (LLM guard bỏ sót câu tấn công không dấu → bắt viết lại có dấu).
// Mơ hồ thì mở: sai chặn tiếng Anh là lỗi đắt nhất.
// ponytail: câu ngắn bằng ngôn ngữ chữ Latinh ít dấu đặc trưng (vd. Indonesia 2 từ) vẫn lọt; thêm từ khoá vào OTHER nếu cần.
export const LANGUAGE_MESSAGE = 'AI Board hiện chỉ hỗ trợ tiếng Việt và tiếng Anh. Bạn viết lại yêu cầu bằng một trong hai ngôn ngữ này nhé. '
  + '/ AI Board currently supports Vietnamese and English only. Please rewrite your request in one of them.';

// Nội dung trích dẫn, mã và URL là chữ cần hiển thị trên trang, không phải ngôn ngữ của yêu cầu.
const QUOTED = /"[^"]*"|“[^”]*”|«[^»]*»|`[^`]*`|https?:\/\/\S+/gu;
// Dấu hợp lệ của tiếng Việt: huyền, sắc, mũ, ngã, trăng, hỏi, móc, nặng — chỉ gắn trên nguyên âm (đ không có dấu rời).
const VI_MARKS = new Set([0x300, 0x301, 0x302, 0x303, 0x306, 0x309, 0x31b, 0x323]);
const FOREIGN_BASE = /[ßæœøłðþıŋ]/u;
// Từ chức năng thường gặp của Pháp, Tây Ban Nha, Đức, Indonesia, Bồ Đào Nha, Ý. Đã bỏ từ trùng tiếng Anh
// (pour, mit, die, fur, los) và từ trùng âm tiết tiếng Việt bỏ dấu (la, de, con, que, che, non, nao, dan).
const OTHER = new Set(`est les des une avec dans sur pas vous nous mais cette qui du je veux changer couleur bouton tres comme
  el del una por para como muy pero esta estoy tiene quiero cambiar boton pagina
  der und ist nicht ein eine ich auf das auch wie wir aber oder bitte mochte andern farbe
  yang untuk dengan tidak saya atau dari pada akan bisa tolong ubah tambahkan halaman tombol warna
  uma mais muito voce quero mudar botao
  gli sono della questo voglio cambiare`.split(/\s+/));

const foreignLatin = (letter) => {
  const lower = letter.toLowerCase();
  if (FOREIGN_BASE.test(lower)) return true;
  const [base, ...marks] = lower.normalize('NFD');
  if (!marks.length) return false;
  if (marks.some((mark) => !VI_MARKS.has(mark.codePointAt(0)))) return true; // ü ö ä ç å š ą …
  return !'aeiouy'.includes(base); // ñ ć ń ś ź: dấu hợp lệ nhưng gắn trên phụ âm
};

export const DIACRITICS_MESSAGE = 'Bạn vui lòng viết lại yêu cầu bằng tiếng Việt CÓ DẤU nhé — AI Board chưa đọc chính xác tiếng Việt không dấu. '
  + '/ Please rewrite your request in Vietnamese with diacritics (accents); unaccented Vietnamese cannot be processed reliably. English is fine as is.';

// Âm tiết tiếng Việt không dấu hầu như không trùng chữ Anh (mạnh = 1 điểm).
const VI_STRONG = new Set(`toi minh khong duoc nay cua nhu muon mau trang nguoi nhung voi roi giup vao nhe nha nhieu tren duoi
  chung cac mot hai sua xoa gui xem thay khoan quyen lop bai diem giao vien cau hinh thong kiem duyet loi qua dang cai nao neu
  thanh khac moi truoc sau hien van doi hay tra quy tac toan noi dung bat ke quan ly dung khau gio lenh thuc hoi dong luu xac
  nhan em xanh thi viec cong chinh nang va lam thang vo hieu loc ky dac biet nhap lieu truc tiep luon khoi xin vang tieu
  trinh duong ngay gui thu tin nhat gia tri chuoi tham so cap dich vu ghi giao dich
  doan cuoi phan luan quay chut khung goc phai dat dinh cau tuong dien thoai chieu rong khoang cach giua lien huong xa`.split(/\s+/));
// Âm tiết trùng chữ Anh hoặc quá ngắn: nửa điểm.
const VI_WEAK = new Set(`cho de la ma do mo tat bo tai ra co sang nut bam chu to hon ca ve vi di da se rat lai den con me an
  ban can don ten long mat chi tu dan bat hoa sao them binh muc tien ben tim cham het mang chan mac tang`.split(/\s+/));
const EN_WORDS = new Set(`the a an and or but is are was were be been to of in on at for with from by this that these those it its
  i you he she we they my your our their me us what which who how why when where not no do does did have has had will would
  can could should please change make add remove update set button page color colour text want need like just so if then than
  also only into onto over under more most some any all each every other new old up down out off about after before again
  here there very too really using use used get got let lets thanks thank hello hi`.split(/\s+/));
const CONTRACTION = /\p{L}+['’]\p{L}+/gu;

// Điểm bằng chứng tiếng Việt không dấu trên từng ô nhập: cần đủ điểm VÀ đủ tỉ lệ, ít chữ Anh.
function looksUnaccentedVietnamese(raw) {
  const text = raw.toLowerCase();
  const contractions = (text.match(CONTRACTION) ?? []).length;
  let en = contractions;
  const tokens = text.replace(CONTRACTION, ' ').match(/\p{L}+/gu) ?? [];
  let strong = 0;
  let weak = 0;
  for (const token of tokens) {
    if (token !== token.normalize('NFD').replace(/\p{M}/gu, '') || /đ/u.test(token)) continue; // token có dấu: không phải bằng chứng không dấu
    if (EN_WORDS.has(token)) en += 1;
    else if (VI_STRONG.has(token)) strong += 1;
    else if (VI_WEAK.has(token)) weak += 1;
  }
  const score = strong + weak / 2;
  return strong >= 2 && score >= 2.5 && score / (tokens.length + contractions) >= 0.4 && en * 2 <= score;
}

const blocked = { block: true, code: 'unsupported_language', message: LANGUAGE_MESSAGE };
const needsDiacritics = { block: true, code: 'needs_diacritics', message: DIACRITICS_MESSAGE };
const allowed = { block: false, code: null, message: null };

/** {block, code, message}: chặn chữ không phải Việt/Anh (unsupported_language) và Việt không dấu (needs_diacritics). Không ghi gì, không phải tín hiệu tấn công. */
export function checkLanguage(...texts) {
  const fields = texts.map((t) => String(t ?? '').normalize('NFC').replace(QUOTED, ' '));
  const text = fields.join('\n');
  const letters = text.match(/\p{L}/gu) ?? [];
  const latin = letters.filter((c) => /\p{Script=Latin}/u.test(c));
  const otherScript = letters.length - latin.length; // Hán, Hàn, Nhật, Cyrillic, Ả Rập, Thái …
  if (otherScript >= 2 && otherScript / letters.length >= 0.3) return blocked;
  const foreign = latin.filter(foreignLatin).length;
  if ((foreign >= 2 && foreign / latin.length >= 0.02) || /[¿¡]/u.test(text)) return blocked;
  const words = text.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/gu, 'd').toLowerCase().match(/\p{L}+/gu) ?? [];
  const hits = words.filter((word) => OTHER.has(word)).length;
  if (hits >= 3 && hits / words.length >= 0.2) return blocked;
  return fields.some(looksUnaccentedVietnamese) ? needsDiacritics : allowed;
}
