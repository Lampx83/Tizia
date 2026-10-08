// Chỉ nhận yêu cầu tiếng Việt hoặc tiếng Anh — tất định, không LLM, không thư viện nhận diện ngôn ngữ.
// Chỉ chặn khi chắc chắn là ngôn ngữ khác (sai thì mở): tiếng Việt gõ không dấu và tiếng Anh luôn qua.
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

const blocked = { block: true, message: LANGUAGE_MESSAGE };
const allowed = { block: false, message: null };

/** {block, message}: chặn chữ không phải tiếng Việt/Anh. Không ghi gì, không phải tín hiệu tấn công. */
export function checkLanguage(...texts) {
  const text = texts.map((t) => String(t ?? '')).join('\n').normalize('NFC').replace(QUOTED, ' ');
  const letters = text.match(/\p{L}/gu) ?? [];
  const latin = letters.filter((c) => /\p{Script=Latin}/u.test(c));
  const otherScript = letters.length - latin.length; // Hán, Hàn, Nhật, Cyrillic, Ả Rập, Thái …
  if (otherScript >= 2 && otherScript / letters.length >= 0.3) return blocked;
  const foreign = latin.filter(foreignLatin).length;
  if ((foreign >= 2 && foreign / latin.length >= 0.02) || /[¿¡]/u.test(text)) return blocked;
  const words = text.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/gu, 'd').toLowerCase().match(/\p{L}+/gu) ?? [];
  const hits = words.filter((word) => OTHER.has(word)).length;
  return hits >= 3 && hits / words.length >= 0.2 ? blocked : allowed;
}
