// Chống chuỗi gõ loạn không có nội dung (vd "dfafdsfa") trước khi lưu tin nhắn/đưa cho Claude.
const MESSAGE = 'Nội dung này chưa rõ ý. Bạn viết lại giúp Ban một câu cụ thể nhé (trang nào, muốn đổi gì).';

/** null = chấp nhận; chuỗi = thông báo lịch sự để trả 422. */
export function checkGibberish(text) {
  const raw = String(text ?? '').trim();
  if (raw.length < 8 || /\s/.test(raw)) return null;
  const lower = raw.toLowerCase();
  if (/(.)\1{3,}/u.test(lower)) return MESSAGE;
  const letters = lower.replace(/[^a-z]/g, '');
  if (letters.length < 8) return null;
  const rows = [/[qwertyuiop]/, /[asdfghjkl]/, /[zxcvbnm]/];
  for (const row of rows) {
    const hits = [...letters].filter((ch) => row.test(ch)).length;
    if (hits / letters.length >= 0.85) return MESSAGE;
  }
  return null;
}
