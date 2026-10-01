// Bảo vệ trẻ em (Trục 2): block prompt chứa từ thoá/người lớn/tự hại trong
// tiếng Việt + một số từ tiếng Anh phổ biến. Danh sách CỐ TÌNH ngắn để (a) dễ
// review, (b) tránh false-positive làm tắc bài học. Mục đích: chặn rõ ràng,
// không phải kiểm duyệt nội dung học thuật.
//
// Nguyên tắc:
//   - "match" = tìm thấy từ đầy đủ (word boundary loose, vì tiếng Việt không
//     có thuần whitespace-tokenize → dùng substring + một số heuristic).
//   - Trả về reason để admin xem log biết lý do block.
//   - KHÔNG cố che teen-slang biến tấu (đ.m, dm, dmm, …) — false positive cao
//     lại lọt sạch một số biến tấu mới. Thay bằng model classify
//     (vd Anthropic Haiku) chạy off-path nếu cần.

const PROFANITY_LIST = [
  // tiếng Việt — thoá/tục
  'địt', 'đụ', 'lồn', 'cặc', 'buồi', 'đéo', 'đm', 'đmm', 'vl', 'vcl',
  'cmm', 'cmnl', 'cc', 'fuck', 'shit', 'bitch', 'dick', 'pussy',
  // người lớn / tình dục
  'sex', 'porn', 'jav', 'xnxx', 'pornhub', 'hentai', 'làm tình',
  // bạo lực / tự hại — phải cẩn thận: "giết" trong văn bản học thường ổn
  // (vd "giết người trong truyện"), chỉ flag khi đi cặp với "tao/mày/nó"
  // → để pattern riêng dưới, không nằm danh sách đơn.
];

const SELF_HARM_PATTERNS = [
  /tự\s*tử/i, /tự\s*sát/i, /thắt\s*cổ/i, /cứa\s*tay/i, /muốn\s*chết/i,
  /suicide/i, /kill\s*myself/i,
];

const VIOLENCE_THREAT_PATTERNS = [
  /(giết|đâm|chém|đánh)\s+(mày|tao|nó|thằng|con)/i,
];

const PII_PATTERNS = [
  /\b\d{12}\b/,                // CCCD/CMND 12 số (CCCD mới)
  /\b\d{9}\b/,                 // CMND cũ 9 số
  /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, // số thẻ ngân hàng
];

function normalizeForMatch(s) {
  return String(s || '').toLowerCase();
}

/**
 * Trả về { safe: boolean, reason: string|null, category: string|null }.
 * category ∈ { 'profanity', 'self_harm', 'violence_threat', 'pii' }.
 */
export function checkContentSafety(text) {
  const s = normalizeForMatch(text);
  if (!s.trim()) return { safe: true, reason: null, category: null };

  for (const w of PROFANITY_LIST) {
    if (s.includes(w)) return { safe: false, reason: `chứa từ "${w}"`, category: 'profanity' };
  }
  for (const re of SELF_HARM_PATTERNS) {
    if (re.test(s)) return { safe: false, reason: 'có dấu hiệu tự hại — cần liên hệ người lớn ngay (hotline 1800 599920)', category: 'self_harm' };
  }
  for (const re of VIOLENCE_THREAT_PATTERNS) {
    if (re.test(s)) return { safe: false, reason: 'lời lẽ bạo lực/đe doạ', category: 'violence_threat' };
  }
  for (const re of PII_PATTERNS) {
    if (re.test(s)) return { safe: false, reason: 'có thể chứa CCCD/CMND/số thẻ — không chia sẻ', category: 'pii' };
  }
  return { safe: true, reason: null, category: null };
}

/** Cố trích prompt text từ req.body. Hỗ trợ các field tên phổ biến trong AI handlers. */
export function extractPromptText(body) {
  if (!body || typeof body !== 'object') return '';
  const candidates = [
    body.prompt, body.message, body.question, body.input, body.text, body.query,
    body.userMessage, body.user_message, body.content,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c;
  }
  // messages: [{ role, content }, ...] (chat history)
  if (Array.isArray(body.messages)) {
    const lastUser = [...body.messages].reverse().find(m => m?.role === 'user' && typeof m.content === 'string');
    if (lastUser) return lastUser.content;
  }
  return '';
}
