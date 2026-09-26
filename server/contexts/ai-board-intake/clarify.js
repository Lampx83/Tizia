// Làm rõ yêu cầu mơ hồ (ticket 06): model hỏi tối đa 5 câu, stream từng token, rồi tóm tắt thành spec.
// Model chỉ được hỏi: không công cụ, lời người dùng nằm trong khối dữ liệu, đầu ra qua guard trước khi lưu.
import fs from 'node:fs';
import { checkIntake } from '../../ai-board/intake-guard.js';
import { checkContentSafety } from '../safety/profanity-vi.js';
import { containsPromptDisclosure } from '../../ai-prompt-guardrails.js';
import { CLASSIFIER } from '../../ai-board/classifier.js';

export const MAX_QUESTIONS = 5;
export const DAILY_TURNS = 20;
const PROMPTS = new URL('../../../ai-board/harness/prompts/', import.meta.url);
const GRILL = fs.readFileSync(new URL('grill.md', PROMPTS), 'utf8');
const SPEC = fs.readFileSync(new URL('clarify_spec.md', PROMPTS), 'utf8');

const TECH_STYLE = {
  none: 'Người dùng không rành kỹ thuật: hỏi bằng ví dụ trên màn hình (trang nào, nút nào, bấm vào thì thấy gì), tránh thuật ngữ.',
  some: 'Người dùng biết chút ít về phần mềm: dùng từ đơn giản, có thể nhắc tên trang hoặc thành phần giao diện.',
  fluent: 'Người dùng thành thạo phần mềm: có thể hỏi bằng thuật ngữ (route, API, component, dữ liệu, trạng thái).',
};
const MODE_STYLE = {
  ask: 'Yêu cầu còn mơ hồ: hỏi điều quan trọng nhất còn thiếu.',
  split: 'Yêu cầu quá rộng: đề nghị tách thành các yêu cầu nhỏ, hỏi người dùng muốn làm phần nào trước.',
  // Chức năng mới (feature-folders ticket 04): chủ đề của lượt được ghép tất định ở questionPrompt.
  feature: 'Đây là ý tưởng chức năng mới.',
};
// Mỗi lượt đúng 1 chủ đề (model nhỏ không tự theo thứ tự nếu chỉ liệt kê cả 3).
const FEATURE_TOPICS = [
  'chức năng này để làm gì và cho ai dùng',
  'người dùng làm gì theo từng bước trên màn hình (bấm gì, thấy gì)',
  'chức năng này giống chức năng nào đã có trên Tizia, để Ban làm theo',
];
export const FEATURE_QUESTIONS = FEATURE_TOPICS.length;
const FALLBACK_QUESTION = {
  ask: 'Bạn mô tả giúp Ban: bạn đang ở trang nào, muốn thay đổi điều gì, và sau khi đổi thì mong thấy gì?',
  split: 'Yêu cầu này gồm nhiều phần. Bạn muốn Ban làm phần nào trước tiên?',
  feature: 'Bạn kể giúp Ban: chức năng này để làm gì, và bạn sẽ bấm những gì theo từng bước?',
};
// Model tự nhận đã/vừa làm gì đó: nó không có công cụ nào nên câu đó luôn sai. Chỉ chủ ngữ ngôi thứ nhất,
// có ranh giới chữ, không bắt "sẽ" (câu hỏi "bạn muốn chúng tôi sẽ thêm ở đâu?" là hợp lệ).
const CLAIMS_WORK = /(?<![\p{L}])(tôi|mình|chúng tôi|ban điều hành|ban)\s+(đã|vừa)\s+(được\s+)?(sửa|làm|thêm|cập nhật|thay đổi|triển khai|hoàn thành|thực hiện|xử lý|tạo|xoá|xóa)(?![\p{L}])|(?<![\p{L}])đã\s+(sửa|làm|xử lý)\s+xong/iu;
// Email hoặc số di động Việt Nam (0/+84 + đầu 3,5,7,8,9 + 8 số), không phải mọi dãy số dài.
const CONTACT = /[\w.+-]+@[\w-]+\.[a-z]{2,}|(?<![\d.])(?:\+?84|0)[35789](?:[\s.-]?\d){8}(?!\d)/iu;
const fence = (text) => String(text ?? '').replace(/<{3,}|>{3,}/g, '');

/** Hội thoại cho prompt: tiêu đề, mô tả, rồi các lượt hỏi/đáp. Toàn bộ là dữ liệu của người dùng. */
export function conversationText(request, turns) {
  const lines = [`Tiêu đề: ${fence(request.title)}`, `Mô tả: ${fence(request.detail) || '(trống)'}`];
  for (const turn of turns) {
    if (turn.kind === 'question') lines.push(`Ban hỏi: ${fence(turn.text)}`);
    else if (turn.kind === 'answer') lines.push(`Người dùng đáp: ${fence(turn.text)}`);
  }
  return lines.join('\n').slice(-6000);
}

export function questionPrompt({ request, turns, techLevel, mode, turn }) {
  const style = mode === 'feature'
    ? `${MODE_STYLE.feature} Lượt này CHỈ hỏi về: ${FEATURE_TOPICS[Math.min(turn, FEATURE_QUESTIONS) - 1]}. Không hỏi chủ đề khác.`
    : MODE_STYLE[mode] || MODE_STYLE.ask;
  return GRILL.replace('{tech_style}', TECH_STYLE[techLevel] || TECH_STYLE.some)
    .replace('{mode_style}', style)
    .replace('{turn}', String(turn)).replace('{max_turns}', String(MAX_QUESTIONS))
    .replace('{conversation}', () => conversationText(request, turns));
}

export function specPrompt({ request, turns, mode }) {
  return SPEC.replace('{mode_style}', MODE_STYLE[mode] || MODE_STYLE.ask)
    .replace('{conversation}', () => conversationText(request, turns));
}

/** Spec dựng tay khi model lỗi/vi phạm: nguyên văn lời người dùng, không bịa. */
function plainSpec(request, turns) {
  const answers = turns.filter((t) => t.kind === 'answer').map((t) => `- ${t.text}`);
  return [`Trang / chức năng: chưa rõ`, `Thay đổi mong muốn: ${request.title}`,
    request.detail ? `Mô tả gốc: ${request.detail}` : '', answers.length ? `Người dùng bổ sung:\n${answers.join('\n')}` : '',
    'Kết quả mong đợi (cách kiểm): chưa rõ', 'Ngoài phạm vi: chưa rõ'].filter(Boolean).join('\n').slice(0, 4000);
}

/** Spec gửi worker = bản đã xác nhận + nguyên văn lời người dùng: tóm tắt của model có thể gọi sai tên phần tử. */
export function withUserWords(spec, request, turns) {
  const words = [`- Tiêu đề: ${request.title}`, request.detail ? `- Mô tả: ${request.detail}` : '',
    ...turns.filter((t) => t.kind === 'answer').map((t) => `- Đáp: ${t.text}`)].filter(Boolean);
  return `${String(spec).trim()}\n\nNguyên văn người dùng:\n${words.join('\n')}`.slice(0, 4000);
}

/** Lý do chặn đầu ra model, null nếu sạch. */
function violation(text) {
  if (!text.trim()) return 'empty';
  if (CLAIMS_WORK.test(text)) return 'claims_work';
  if (CONTACT.test(text) || checkContentSafety(text).safe === false) return 'unsafe';
  if (checkIntake('', text).block) return 'hard_rule';
  if (containsPromptDisclosure(text, GRILL) || containsPromptDisclosure(text, SPEC)) return 'prompt_disclosure';
  return null;
}

/** {text, replaced, reason}: câu hỏi/spec an toàn để hiện và lưu. */
export function guardModelText(raw, kind, mode, fallback = null) {
  let text = String(raw ?? '').replace(/<think>[\s\S]*?<\/think>/g, '');
  // Model hay chép lại dòng chỉ dẫn hướng hỏi của prompt vào cuối spec: cắt đi, không phải lời người dùng.
  if (kind === 'summary') text = text.replace(/^\s*(?:Hướng|Bối cảnh cho bạn)\b.*$/gmu, '');
  text = text.trim().slice(0, kind === 'question' ? 500 : 4000);
  const reason = violation(text);
  if (!reason) return { text, replaced: false, reason: null };
  return { text: fallback ?? FALLBACK_QUESTION[mode] ?? FALLBACK_QUESTION.ask, replaced: true, reason };
}

/** Kiểm câu trả lời của người dùng như luật cứng lúc gửi yêu cầu. null = hợp lệ, else thông báo lịch sự. */
export function checkAnswer(answer) {
  const text = String(answer ?? '').trim();
  if (!text) return 'Bạn nhập câu trả lời giúp Ban nhé.';
  if (text.length > 2000) return 'Câu trả lời dài quá, bạn rút gọn dưới 2000 ký tự giúp Ban.';
  const intake = checkIntake('', text);
  if (intake.block) return intake.message;
  if (checkContentSafety(text).safe === false) return 'Câu trả lời có nội dung không phù hợp hoặc thông tin cá nhân — bạn sửa lại giúp Ban.';
  return null;
}

/**
 * Stream one model reply through `generate`, forwarding tokens to `send` until the text breaks a rule
 * (then stop reading). Return the guarded final text.
 */
export async function streamGuarded({ generate, model, prompt, kind, mode, send, fallback }) {
  let text = '';
  let broken = false;
  try {
    await generate({
      model, prompt, kind,
      onToken: (token) => {
        text += token;
        const visible = text.replace(/<think>[\s\S]*?(<\/think>|$)/g, '');
        if (CLAIMS_WORK.test(visible) || CONTACT.test(visible)) { broken = true; return false; }
        const inThink = /<think>(?![\s\S]*<\/think>)/.test(text);
        if (!inThink && !/<\/?think>/.test(token)) send({ t: 'delta', text: token });
        return true;
      },
    });
  } catch (error) {
    console.warn('[ai-board] clarify model failed:', error.message);
    text = '';
  }
  return guardModelText(broken ? '' : text, kind, mode, fallback);
}

/** Real streaming call to Ollama /api/generate (NDJSON). onToken returning false aborts the upstream request. */
export function ollamaStreamer({ env = process.env, fetchImpl = fetch, timeoutMs = 60_000 } = {}) {
  return async ({ model, prompt, kind, onToken }) => {
    const url = String(env.OLLAMA_URL || '').replace(/\/+$/, '');
    if (!url || !model) throw new Error('OLLAMA_URL or model not set');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const headers = { 'Content-Type': 'application/json' };
    if (env.OLLAMA_SECKEY) headers['x-ollama-seckey'] = env.OLLAMA_SECKEY;
    try {
      const res = await fetchImpl(`${url}/api/generate`, {
        method: 'POST', headers, signal: controller.signal,
        body: JSON.stringify({ model, prompt, stream: true, think: false, keep_alive: CLASSIFIER.keep_alive,
          options: { temperature: 0.3, num_predict: kind === 'summary' ? 600 : 160, num_ctx: 4096 } }),
      });
      if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);
      const decoder = new TextDecoder();
      let buffer = '';
      let text = '';
      for await (const chunk of res.body) {
        buffer += decoder.decode(chunk, { stream: true });
        let newline;
        while ((newline = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (!line) continue;
          const data = JSON.parse(line);
          if (data.response) {
            text += data.response;
            if (onToken(data.response) === false) { controller.abort(); return text; }
          }
          if (data.done) return text;
        }
      }
      return text;
    } finally {
      clearTimeout(timer);
    }
  };
}

/** Next step after the requester's latest turn: another question, or the summary (complete = clear enough). */
export function nextStep({ asked, clarity, rulesClear = false, mode = null }) {
  // Chức năng mới: đủ 3 chủ đề rồi mới tóm tắt, không dừng sớm theo luật/model của yêu cầu lẻ.
  if (mode === 'feature') return asked >= FEATURE_QUESTIONS ? { kind: 'summary', complete: true } : { kind: 'question', mode };
  if (rulesClear || (clarity && !clarity.needed)) return { kind: 'summary', complete: true };
  if (asked >= MAX_QUESTIONS) return { kind: 'summary', complete: false };
  return { kind: 'question', mode: clarity?.mode || 'ask' };
}

export { plainSpec };
