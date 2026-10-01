// Luật cứng độ rõ: quyết định có cần làm rõ yêu cầu mà không cần model.
// Danh sách từ ở clarity-rules.json; bộ phân loại logprobs chỉ bổ sung khi ở mode 'active'.
import fs from 'node:fs';

const RULES = JSON.parse(fs.readFileSync(new URL('./clarity-rules.json', import.meta.url), 'utf8'));
const fold = (text) => text.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
const escape = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
// "#" và "px" là ký hiệu (48px, #2563eb): dính liền số phía trước; "#" dính mã màu phía sau.
const SYMBOLS = new Set(['#', 'px']);
const pattern = (term) => new RegExp(
  `${SYMBOLS.has(term) ? '' : '(?<![\\p{L}\\p{N}])'}${escape(term)}${term === '#' ? '' : '(?![\\p{L}])'}`, 'u');

/** Chữ thường; gõ không dấu thì từ khoá cũng bỏ dấu (có dấu thì giữ, tránh "chủ" ≈ "chữ"). */
function matcher(text) {
  const lower = text.normalize('NFC').toLowerCase();
  const ascii = !/[^\x00-\x7f]/.test(lower);
  return (term) => pattern(ascii ? fold(term.toLowerCase()) : term.toLowerCase()).test(lower);
}

/** Bỏ dòng "[Trang: …] /url" do FAB tự thêm: không phải lời người dùng. */
const userText = (title, detail) => `${title ?? ''}\n${String(detail ?? '').split('\n')
  .filter((line) => !/^\s*\[Trang:/.test(line)).join('\n')}`;

function broadReasons(text, has) {
  // Negated exclusions end at a contrast/new instruction; positive tasks still count.
  const tasks = text.replace(/(?:không|khong|do not|don't)\s+(?:sửa|sua|tạo|tao|thêm|them|xóa|xoá|xoa|đổi|doi|cập nhật|cap nhat|merge|edit|create|delete)[^.!?;,\n]*?(?=[.!?;,\n]| +(?:nhưng|nhung|but|hãy|hay)\b|$)/giu, ' ');
  const taskHas = matcher(tasks);
  const reasons = RULES.broad_keywords.filter(taskHas).map((k) => `rộng: "${k}"`);
  const bullets = (tasks.match(/^\s*(?:[-*•+]|\d+[.)])\s+/gm) || []).length;
  if (bullets >= RULES.max_tasks) reasons.push(`rộng: ${bullets} gạch đầu dòng`);
  const verbs = new Set(RULES.task_verbs.filter(taskHas).map((v) => v.replace('xoá', 'xóa')));
  if (verbs.size >= RULES.max_tasks) reasons.push(`rộng: ${verbs.size} việc (${[...verbs].join(', ')})`);
  return reasons;
}

/** {needed, mode: 'split'|'ask'|null, reasons} cho yêu cầu mới. */
export function checkClarity(title, detail) {
  const text = userText(title, detail);
  const has = matcher(text);
  const broad = broadReasons(text, has);
  const vague = [];
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  if (words < RULES.min_words) vague.push(`ngắn: ${words} từ`);
  const concrete = RULES.concrete_objects.some(has);
  vague.push(...RULES.vague_phrases.filter(has).filter(() => !concrete).map((p) => `chung chung: "${p}"`));
  vague.push(...RULES.vague_pointers.filter(has).map((p) => `trỏ không rõ: "${p}"`));
  if (broad.length) return { needed: true, mode: 'split', reasons: [...broad, ...vague] };
  if (vague.length) return { needed: true, mode: 'ask', reasons: vague };
  return { needed: false, mode: null, reasons: [] };
}

/** Final clarify decision from hard rules + model signal: {needed, mode, source, rules}.
    Feature requests always ask the 3 'feature' questions; a shadow-mode model verdict is ignored by the caller;
    `enabled` = client understands clarifying. Split (from rules or model) wins over ask. */
export function resolveClarify({ title, detail, classified = null, isFeature = false, enabled = true }) {
  const rules = isFeature ? { needed: true, mode: 'feature', reasons: ['chức năng mới'] } : checkClarity(title, detail);
  const model = classified?.clarity?.shadow || isFeature ? null : classified?.clarity;
  const source = [rules.needed && 'rules', model?.needed && 'model'].filter(Boolean);
  if (!enabled || !source.length) return { needed: false, mode: null, source, rules };
  const mode = isFeature ? 'feature' : [rules.mode, model?.mode].includes('split') ? 'split' : 'ask';
  return { needed: true, mode, source, rules };
}

/** Replay of an idempotent submit: report what the first submit stored, not a fresh classification. */
export function clarifyFromPhase(phase) {
  return { needed: phase === 'clarifying', mode: phase === 'clarifying' ? 'ask' : null };
}

/** Grilling dừng theo luật: câu trả lời đã nêu đối tượng cụ thể và không còn quá rộng. */
export function answersClear(answers) {
  const text = answers.join('\n');
  const has = matcher(text);
  return RULES.concrete_objects.some(has) && broadReasons(text, has).length === 0;
}

export function repeatedQuestion(question, previous) {
  const normalize = (text) => fold(String(text).toLowerCase())
    .replace(/tren man hinh|o trang|tren trang|man hinh/g, 'trang')
    .replace(/\b(ban|muon|giup|cho|ban dieu hanh|minh|xin|vui long)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim();
  const words = new Set(normalize(question).split(' ').filter(Boolean));
  const point = (text) => {
    const plain = fold(String(text).toLowerCase());
    if (/mau thuan|khac voi cau tra loi|contradict/.test(plain)) return null;
    if (/trang nao|man hinh nao|vi tri nao|o dau|cho nao/.test(plain)) return 'surface';
    if (/ket qua|hien thi.*(gi|nao)|mong.*thay|sau khi/.test(plain)) return 'outcome';
    if (/tung buoc|bam.*(gi|nao)|su dung.*(nao|ra sao)/.test(plain)) return 'actions';
    return null;
  };
  const requestedPoint = point(question);
  return previous.some((old) => {
    if (requestedPoint && requestedPoint === point(old)) return true;
    const other = new Set(normalize(old).split(' ').filter(Boolean));
    const common = [...words].filter((word) => other.has(word)).length;
    return common >= 2 && common / new Set([...words, ...other]).size >= 0.75;
  });
}
