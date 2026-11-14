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

const STEP_LINE = /^(?:(\d+[a-z]?[.)])|[-*•])\s+(.+)$/;
const HEADING = /^#{1,6}\s+(.*)$/;
const PROCEDURE_HEADING = /procedure|steps?|workflow|process/i;
const STEP_KEPT_MIN = 0.6;

const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

// WHY: bullet chỉ là bước dưới heading nêu procedure/steps; ngoài đó là guardrail/ví dụ. Dòng thụt lề là lồng, không phải bước cấp 1.
function stepsOf(text) {
  const steps = [];
  let inProcedure = false;
  for (const line of body(text).split('\n')) {
    const heading = HEADING.exec(line);
    if (heading) { inProcedure = PROCEDURE_HEADING.test(heading[1]); continue; }
    const m = STEP_LINE.exec(line);
    if (m && (m[1] || inProcedure)) steps.push(m[2].trim());
  }
  return steps;
}

/** Tỷ lệ bước (dòng đánh số; gạch đầu dòng trong mục procedure) của skill gốc còn trong bản mặc định; giữ nếu ≥60% từ khóa có mặt, bước không có từ khóa thì cần nguyên văn. Offline. */
export function essenceStepRatio(sourceText, defaultText) {
  const low = body(defaultText).toLowerCase();
  const lowNorm = norm(low);
  const steps = stepsOf(sourceText);
  const lost = [];
  for (const step of steps) {
    const terms = essenceTerms(step);
    const kept = terms.length
      ? terms.filter((t) => low.includes(t)).length / terms.length >= STEP_KEPT_MIN
      : lowNorm.includes(norm(step));
    if (!kept) lost.push(step);
  }
  const kept = steps.length - lost.length;
  return { total: steps.length, kept, ratio: steps.length ? kept / steps.length : 1, lost };
}
