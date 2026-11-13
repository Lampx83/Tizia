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

const STEP_LINE = /^\s*(?:\d+[a-z]?[.)]|[-*•])\s+(.+)$/;
const STEP_KEPT_MIN = 0.6;

/** Tỷ lệ bước (dòng đánh số/gạch đầu dòng) của skill gốc còn trong bản mặc định; bước giữ nếu ≥60% từ khóa của nó có mặt. Offline. */
export function essenceStepRatio(sourceText, defaultText) {
  const low = body(defaultText).toLowerCase();
  const steps = body(sourceText).split('\n').map((line) => STEP_LINE.exec(line)?.[1].trim()).filter(Boolean);
  const lost = [];
  for (const step of steps) {
    const terms = essenceTerms(step);
    if (terms.length && terms.filter((t) => low.includes(t)).length / terms.length < STEP_KEPT_MIN) lost.push(step);
  }
  const kept = steps.length - lost.length;
  return { total: steps.length, kept, ratio: steps.length ? kept / steps.length : 1, lost };
}
