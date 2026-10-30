/** Từ khóa nội dung (≥5 chữ) của thân skill gốc mà bản viết lại phải giữ nguyên; trả về danh sách thiếu. */
const STOP = new Set(['about', 'after', 'again', 'their', 'there', 'these', 'those', 'where', 'which', 'while', 'should',
  'would', 'could', 'being', 'other', 'every', 'before', 'through', 'between', 'into', 'with', 'from', 'that', 'this',
  'then', 'than', 'when', 'what', 'have', 'been', 'will', 'only', 'also', 'each', 'some', 'must', 'does', 'make']);

function body(text) {
  const parts = String(text || '').split('---\n', 3);
  return parts.length === 3 ? parts[2] : String(text || '');
}

export function essenceTerms(sourceText) {
  return [...new Set((body(sourceText).toLowerCase().match(/\p{L}{5,}/gu) || []).filter((w) => !STOP.has(w)))];
}

export function essenceMissing(sourceText, rewrittenText) {
  const low = body(rewrittenText).toLowerCase();
  return essenceTerms(sourceText).filter((term) => !low.includes(term)).sort();
}
