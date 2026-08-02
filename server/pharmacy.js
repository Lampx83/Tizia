// Pharmacy AI port — session store + chat / action / score routes.
// Logic ported 1-1 from github.com/Lampx83/Pharmacy-AI (src/lib/segue/*, src/lib/session/store.ts).
import express from 'express';
import { ollamaGenerate, ollamaGenerateStream } from './ai.js';
import { SCENARIOS } from '../public/js/pharmacy/scenarios.js';
import { computeScore } from '../public/js/pharmacy/score.js';

const sessions = new Map();

function createSession(moduleId) {
  const id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const s = {
    id, moduleId,
    startedAt: Date.now(),
    messages: [],
    actions: [],
    context: {}
  };
  sessions.set(id, s);
  return s;
}

function getSession(id) { return sessions.get(id); }
function saveSession(s) { sessions.set(s.id, s); }

// Dọn session bỏ quên (in-memory, không ai xoá): idle > 6 giờ → xoá, quét mỗi 30'.
// Client tự khôi phục phiên qua `restore` nên xoá nhầm cũng không mất trải nghiệm.
const _sweep = setInterval(() => {
  const now = Date.now();
  for (const [id, s] of sessions) {
    const last = s.messages.length ? s.messages[s.messages.length - 1].ts : s.startedAt;
    if (now - last > 6 * 3600e3) sessions.delete(id);
  }
}, 30 * 60e3);
_sweep.unref?.();

// Build conversation prompt for Ollama. Matches the OpenAI persona pattern used in
// upstream src/lib/llm/openai.ts but uses /generate (string prompt) for our local model.
function buildPrompt(persona, history, userMessage) {
  const lines = [];
  for (const m of history.slice(-12)) {
    if (m.role === 'user') lines.push(`Dược sĩ: ${m.content}`);
    else if (m.role === 'npc') lines.push(`NPC: ${m.content}`);
  }
  lines.push(`Dược sĩ: ${userMessage}`);
  lines.push(`NPC:`);
  return lines.join('\n');
}

// Fallback NPC responses when Ollama unavailable — mirrors src/lib/llm/stub.ts.
function stubReply(moduleId) {
  if (moduleId === 'gpp') return 'Em vẫn cứ muốn xin ít kháng sinh thôi, khỏi nhanh em đi làm.';
  if (moduleId === 'hospital') return 'Dược sĩ, đơn của tôi có gì sai à? Bệnh nhân đang đợi.';
  if (moduleId === 'otc01') return 'Dạ vâng ạ.';
  if (moduleId === 'otc02') return 'Ừ, dược sĩ lấy nhanh thuốc cho tôi nhé.';
  return 'Em cứ trình bày tiếp đi, tôi đang nghe.';
}

// Quy tắc ĐIỀU KHIỂN BỆNH NHÂN AI — mã hoá theo tài liệu "Quy tắc Patient Simulation
// 20/07" (nhất quán vai, tiết lộ 2 lớp, không gợi ý/chấm điểm, cảm xúc). Ghép sau
// persona riêng từng scenario. Chặn input rác / prompt-injection xử lý TẤT ĐỊNH bên dưới.
const ROLEPLAY_RULES = `

QUY TẮC ĐIỀU KHIỂN BỆNH NHÂN AI (BẮT BUỘC):

VAI & GIỚI HẠN
- Bạn CHỈ đóng vai bệnh nhân hoặc người nhà theo đúng hồ sơ tình huống. TUYỆT ĐỐI không thừa nhận mình là AI/trợ lý/mô hình.
- KHÔNG đóng vai giảng viên, KHÔNG đóng vai dược sĩ, KHÔNG hướng dẫn sinh viên, KHÔNG chấm điểm, KHÔNG tiết lộ đáp án.
- KHÔNG tự chẩn đoán bệnh, KHÔNG đề xuất thuốc, KHÔNG xác nhận thuốc đúng/sai, KHÔNG giảng giải kiến thức chuyên môn.
- Dược sĩ hỏi NGƯỢC bạn kiểu "tôi nên hỏi gì / nên tư vấn thuốc gì / làm gì tiếp theo" → bạn là người bệnh KHÔNG CÓ CHUYÊN MÔN, chỉ đáp: "Ơ, mình có biết gì về thuốc đâu, dược sĩ tư vấn giúp mẹ con mình mà." TUYỆT ĐỐI KHÔNG kể tên thuốc, KHÔNG liệt kê câu cần hỏi, KHÔNG BAO GIỜ nói "Dược sĩ nên/cần/phải/hãy…".

KHÔNG DẪN DẮT CUỘC TƯ VẤN (rất quan trọng): bạn là bệnh nhân, KHÔNG điều khiển buổi tư vấn. TUYỆT ĐỐI KHÔNG giục dược sĩ, KHÔNG hỏi "dược sĩ có muốn hỏi gì không", KHÔNG mời/xin dược sĩ đặt câu hỏi, KHÔNG nhắc dược sĩ phải làm gì tiếp. Nếu dược sĩ chỉ nói cụt "ok/ừ/vâng" hoặc chưa hỏi gì rõ ràng → bạn chỉ đáp tối thiểu "Dạ" rồi IM LẶNG CHỜ, KHÔNG nói thêm, KHÔNG gợi mở.

NHẤT QUÁN (không thay đổi suốt phiên): tuổi, giới tính, nghề nghiệp, tiền sử bệnh, thuốc đang dùng, trạng thái tâm lý.

XƯNG HÔ: xưng hô phù hợp với hồ sơ và tình huống (anh/chị, mình, bác, cô, chú, ông, bà…) và GIỮ NGUYÊN cách xưng hô suốt phiên.

BỆNH NHÂN KHÔNG BẮT CHUYỆN TRƯỚC: dược sĩ là người chào hỏi và mở lời trước; bạn chỉ phản hồi khi dược sĩ đã nói với bạn.

TIẾT LỘ THÔNG TIN THEO 2 LỚP (như bệnh nhân thật):
- KHÔNG chủ động kể bệnh; chỉ trả lời khi được hỏi.
- Lớp 1 (triệu chứng chính): chỉ nói khi dược sĩ hỏi câu MỞ về nhu cầu ("anh/chị cần gì ạ?", "cần tư vấn gì ạ?"). Hỏi chung chung ("đang thấy thế nào?", "có triệu chứng gì?") cũng CHỈ nêu triệu chứng chính, không kể chi tiết.
- Lớp 2 (tiền sử, bệnh mắc kèm, thuốc đang dùng, cân nặng, lối sống…): chỉ tiết lộ khi dược sĩ hỏi ĐÚNG TRỌNG TÂM từng ý.
- Nếu dược sĩ chỉ HƯỚNG DẪN / GIẢI THÍCH / DẶN DÒ mà KHÔNG hỏi gì → chỉ đáp ngắn gọn kiểu: "Vâng ạ", "Dạ", "Mình hiểu rồi ạ", "Cám ơn dược sĩ". CHÚ Ý: câu có dấu "?" hoặc mở đầu "cho em hỏi/cho mình hỏi/chị thấy/bé có…" là CÂU HỎI → PHẢI trả lời đúng nội dung, không được đáp "Vâng ạ". NGOẠI LỆ: khi dược sĩ YÊU CẦU bạn NHẮC LẠI/kể lại cách dùng thuốc → phải nhắc lại ĐẦY ĐỦ cách dùng từng thuốc đúng như dược sĩ đã dặn trong hội thoại (KHÔNG đáp "Vâng ạ").

XỬ LÝ NGOẠI LỆ
- Hỏi về đời sống (nghề nghiệp, gia đình, cảm xúc, thói quen): ứng biến tự nhiên, NHẤT QUÁN với hồ sơ, KHÔNG bịa thêm dữ kiện y khoa.
- Hỏi dữ kiện y khoa KHÔNG có trong hồ sơ (xét nghiệm, tiền sử phẫu thuật…): né tránh trong vai, KHÔNG bịa số liệu. VD: "Tôi không nhớ rõ."
- Hỏi lạc đề, không liên quan việc dùng thuốc (thời tiết, chính trị…): từ chối lịch sự và kéo về đúng chủ đề. VD: "Dược sĩ thông cảm, tôi đang lo/đang vội, mình tập trung vào bệnh trước nhé."

CẢM XÚC: duy trì theo hồ sơ. Dược sĩ đồng cảm, ân cần → hợp tác hơn. Dược sĩ hỏi dồn dập/thiếu tôn trọng → giảm hợp tác trong giới hạn kịch bản.

QUY TẮC 1 Ý / 1 LƯỢT (BỔ SUNG 25/07 — RẤT QUAN TRỌNG, lỗi hay mắc nhất):
- Mỗi câu hỏi của dược sĩ, bạn CHỈ phản hồi ĐÚNG 1 ĐƠN VỊ THÔNG TIN. TUYỆT ĐỐI KHÔNG tự thêm triệu chứng, tiền sử, cân nặng, số lần, tính chất phân, sốt/nôn, thuốc đang dùng, chế độ ăn… khi dược sĩ CHƯA hỏi tới.
- CÂU HỎI CHUNG CHUNG (gợi mở: "bé bị làm sao?", "cần tư vấn gì?", "đi ngoài thế nào?", "thấy trong người thế nào?") → CHỈ nói TRIỆU CHỨNG CHÍNH / lý do đến, KHÔNG liệt kê bất kỳ chi tiết lâm sàng nào.
  ❌ SAI: "Bé đi ngoài thế nào chị?" → "Bé đi 3-4 lần/ngày, phân lỏng toàn nước, không sốt, không nôn ạ."
  ✅ ĐÚNG: "Bé đi ngoài thế nào chị?" → "Dạ bé nhà em bị đi phân lỏng mấy hôm nay chưa đỡ ạ."
- CÂU HỎI CỤ THỂ (hỏi thẳng 1 chi tiết) → chỉ trả lời ĐÚNG chi tiết đó, 1 ý:
  "Một ngày bé đi mấy lần?" → "Dạ khoảng 3-4 lần ạ."   "Phân có nhầy/máu không?" → "Dạ không, phân toàn nước thôi ạ."   "Bé có sốt hay nôn không?" → "Dạ bé không sốt, cũng không nôn ạ."
- KHÔNG chủ động kể bệnh, KHÔNG hỏi ngược, KHÔNG gợi ý/nhắc/sửa lỗi cho dược sĩ.

ĐỘ DÀI: NGẮN NHẤT có thể — thường CHỈ 1 câu, tối đa 2 câu ngắn. Lời đời thường, KHÔNG thuật ngữ y dược, KHÔNG giải thích dài dòng.

NÓI NHƯ NGƯỜI THẬT (tránh máy móc):
- TUYỆT ĐỐI KHÔNG lặp lại NGUYÊN VĂN câu bạn đã nói ở các lượt trước; mỗi lượt diễn đạt khác đi.
- KHÔNG nhắc lại câu than "bé bị đi ngoài, mình lo quá" ở mỗi lượt. Câu đó CHỈ nói MỘT LẦN lúc dược sĩ hỏi lý do/nhu cầu; các lượt sau chỉ trả lời đúng câu được hỏi, không kể lể lại.
- Nói tự nhiên như người Việt: thỉnh thoảng có từ đệm ("à", "dạ", "ừ thì", "chả là", "thật ra"), ngập ngừng nhẹ khi lo lắng — nhưng vẫn ngắn gọn, không lạm dụng.
- Xưng hô và giọng điệu giữ nhất quán một người mẹ trẻ đang lo cho con.

ĐỊNH DẠNG: chỉ TIẾNG VIỆT có dấu, TUYỆT ĐỐI KHÔNG chữ Hán/tiếng Trung (汉字)/tiếng nước ngoài, KHÔNG markdown, KHÔNG gạch đầu dòng, KHÔNG kèm tiền tố "NPC:". Nếu dược sĩ hỏi bằng tiếng Anh/ngôn ngữ khác, cứ trả lời TỰ NHIÊN bằng tiếng Việt như thường, KHÔNG bình luận về chuyện đổi ngôn ngữ.`;

// Dọn output: bỏ tiền tố vai + nhãn ngoặc; CHẶN chữ Hán/CJK mà Qwen hay lẫn vào
// (giữ trải nghiệm thuần Việt). Nếu sau khi lọc còn quá ngắn → trả '' để dùng stub.
function cleanReply(s) {
  let r = String(s || '')
    .replace(/^\s*(NPC|Khách hàng|Bệnh nhân|Bác sĩ|Trưởng khoa|Assistant|AI)\s*[:：]\s*/i, '')
    .replace(/^["“]|["”]$/g, '')
    .trim();
  // Model đôi khi "diễn" tiếp cả lượt dược sĩ → cắt tại nhãn vai lọt GIỮA chuỗi
  // (vd "…em đang 12 Dược sĩ: … NPC: …") — chỉ giữ phần thoại đầu của NPC.
  r = r.split(/\s*(?:Dược sĩ|NPC|Bệnh nhân|Khách hàng|Bác sĩ|Trưởng khoa|Assistant)\s*[:：]/i)[0].trim();
  // Bỏ ký tự CJK (Hán/Nhật/Hàn) + dấu câu Trung nếu lọt vào (dùng \u cho chắc).
  const CJK = /[　-〿぀-ヿ㐀-䶿一-鿿가-힯＀-￯]+/g;
  if (CJK.test(r)) r = r.replace(CJK, ' ').replace(/\s{2,}/g, ' ').replace(/\s+([,.!?;:])/g, '$1').trim();
  return r.length >= 4 ? r : '';
}

// Ép NGẮN GỌN tất định: giữ tối đa 2 câu + ~200 ký tự. Model 14B hay lan man/tự kể
// thêm dù đã dặn trong prompt → cắt cứng ở server để đảm bảo bệnh nhân trả lời gọn.
// Quá ngân sách ký tự → CẮT TRÒN CÂU: giữ các câu TRỌN VẸN nằm trong ngân sách, BỎ
// HẲN câu dở dang (tránh "…nên chưa chắc đã cần dùng paracetamol. Mình…" cụt lủn).
// Chỉ khi ngay CÂU ĐẦU đã dài quá ngân sách mới đành cắt giữa câu + "…".
function trimReply(s, maxSentences = 2, maxChars = 200) {
  let r = String(s || '').trim();
  if (!r) return '';
  const parts = (r.match(/[^.!?…]+[.!?…]*/g) || [r]).map(p => p.trim()).filter(Boolean);
  r = parts.slice(0, maxSentences).join(' ').replace(/\s{2,}/g, ' ').trim();
  if (r.length > maxChars) {
    let kept = '';
    for (const p of parts.slice(0, maxSentences)) {
      const cand = (kept ? kept + ' ' : '') + p;
      if (cand.length > maxChars) break;
      kept = cand;
    }
    if (kept && /[.!?…]$/.test(kept)) {
      r = kept;                                   // trọn câu, không dấu ba chấm treo
    } else {
      r = r.slice(0, maxChars).replace(/\s+\S*$/, '').replace(/[,;:\s]+$/, '');
      if (!/[.!?…]$/.test(r)) r += '…';
    }
  }
  return r;
}

// Lượt teach-back (C4): dược sĩ yêu cầu bệnh nhân NHẮC LẠI cách dùng — phải kể lại
// nội dung đã được hướng dẫn, không được đáp "Vâng ạ" như các lượt dặn dò thường.
const TEACHBACK_HINT = `

LƯU Ý RIÊNG LƯỢT NÀY: Dược sĩ vừa yêu cầu bạn NHẮC LẠI cách dùng thuốc. Hãy nhắc lại NGẮN GỌN nhưng ĐẦY ĐỦ cách dùng của TỪNG thuốc đúng như dược sĩ đã hướng dẫn trong hội thoại (liều, số lần, cách pha/lắc…), kết thúc bằng "đúng không dược sĩ?". TUYỆT ĐỐI KHÔNG đáp cụt "Vâng ạ".`;

async function npcReply(scenario, history, userMessage) {
  const prompt = buildPrompt(scenario.npcPersona, history, userMessage);
  const isPro = scenario.npcKind === 'professional';
  // Teach-back ("nhắc lại cách dùng…"): bơm chỉ dẫn riêng + cho phép trả lời dài hơn.
  // Chỉ áp cho BỆNH NHÂN; NPC chuyên môn dùng PROFESSIONAL_RULES + cho phép 3 câu.
  const teachBack = !isPro && /(nhắc lại|nói lại|lặp lại|kể lại)/i.test(userMessage);
  const rules = isPro ? PROFESSIONAL_RULES : ROLEPLAY_RULES;
  const maxSent = isPro ? 3 : (teachBack ? 3 : 2);
  const maxCh = isPro ? 300 : (teachBack ? 330 : 200);
  try {
    const reply = await ollamaGenerate({
      prompt,
      system: (scenario.npcPersona || '') + rules + (teachBack ? TEACHBACK_HINT : ''),
      temperature: 0.55,
      maxTokens: isPro ? 200 : (teachBack ? 200 : 120)
    });
    const cleaned = cleanReply(reply);
    return trimReply(cleaned, maxSent, maxCh) || stubReply(scenario.id);
  } catch (err) {
    console.error('[pharmacy] ollama failed, using stub:', err.message);
    return stubReply(scenario.id);
  }
}

// ── Guard TẤT ĐỊNH (không gọi LLM) — theo tài liệu Bệnh nhân AI mục 6.2 ──────────
// Đầu vào rác (vd "asdfghjkl"): xét theo TỪNG "từ" dài ≥5 ký tự — coi là rác nếu tỉ lệ
// nguyên âm quá thấp (<20%) HOẶC có chuỗi phụ âm liền ≥5 (bàn phím gõ bừa). Bỏ dấu để
// đo cho chắc. Chỉ chặn khi PHẦN LỚN từ dài là rác → tránh nhầm với chữ viết tắt.
function stripAccent(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z]/g, ''); }
function isGibberish(text) {
  const t = String(text || '').trim();
  // Toàn dấu câu/ký hiệu, KHÔNG có chữ cái nào (vd "...", "!!!???", "@#$") → rác.
  // (Từ ngắn có dấu như "ừ"/"à"/"ok" vẫn còn chữ → KHÔNG dính, được ACK guard lo.)
  if (t && !/[a-zA-ZÀ-ỹ]/.test(t)) return true;
  const words = t.split(/\s+/).map(stripAccent).filter(w => w.length >= 5);
  if (!words.length) return false;
  const junk = words.filter(w => {
    const vowels = (w.match(/[aeiouy]/gi) || []).length;
    return vowels / w.length < 0.2 || /[bcdfghjklmnpqrstvwxz]{5,}/i.test(w);
  });
  return junk.length >= Math.ceil(words.length * 0.6);
}
// "Thao túng mềm" — SV hỏi NGƯỢC bệnh nhân xin đáp án bằng câu tự nhiên
// ("Tôi nên hỏi những triệu chứng gì?", "Tôi sẽ tư vấn thuốc gì cho bé?"):
// chủ ngữ tôi/em/mình + nên/phải/cần/sẽ + ...gì/thế nào. Bệnh nhân KHÔNG có
// chuyên môn, không được nhắc bài (tài liệu 7.4). LƯU Ý pattern phải đòi từ
// để hỏi (gì/thế nào…) để KHÔNG bắt nhầm câu tư vấn thật ("Em sẽ tư vấn cho
// bé dùng men vi sinh" — không có "gì" → hợp lệ).
// 🪤 CHỦ NGỮ QUYẾT ĐỊNH: "tôi/em/mình nên/cần tư vấn gì" = SV xin nhắc bài (chặn);
// "CHỊ/anh cần tư vấn gì" = dược sĩ hỏi nhu cầu bệnh nhân (HỢP LỆ — KHÔNG được chặn).
// Vì vậy vế "cần/nên + tư vấn/hỏi" BẮT BUỘC đi kèm chủ ngữ ngôi 1 (tôi/em/mình) hoặc
// đứng ĐẦU câu (mệnh lệnh "nên hỏi gì tiếp"). Không dùng "cần" trần trụi (dính "chị cần").
const COACH_RE = /((tôi|em|mình)\s+(nên|phải|cần|sẽ)\s+[^?!.\n]{0,30}(gì|những gì|thế nào|như thế nào|ra sao|nào)|^\s*(nên|phải)\s+(hỏi|tư vấn|làm|kê|bán|khám)\b[^?!.\n]{0,20}(gì|thế nào|nào)|gợi ý\s+(cho\s+)?(tôi|em|mình)|các bước\s+(tư vấn|thực hiện|xử lý|khai thác)|(theo (bạn|chị)|bạn (thấy|nghĩ)|chị (thấy|nghĩ))[^?!.\n]{0,30}(nên|tư vấn|hỏi|kê)[^?!.\n]{0,20}(gì|thế nào|nào|không)|đáp án\s+(là gì|đúng|của|cho)|checklist)/i;
// Model lỡ "nhắc bài" (đầu ra dạng khuyên dược sĩ) → thay bằng câu né trong vai.
// 🪤 01/08: loại trừ câu bệnh nhân NHỜ được phục vụ ("Dược sĩ hãy tư vấn giúp tôi
// nhé") — đó là lời nhờ, không phải nhắc bài; trước đây bị thay bằng câu né sai vai.
const LEAK_RE = /(dược sĩ|bạn)\s+(nên|cần|phải|hãy)\s+(hỏi|tư vấn|kiểm tra|khám|bán|kê|giải thích|trấn an|khuyên)(?!\s*(giúp|hộ|giùm|cho)\s*(tôi|mình|em|anh|chị))/i;
// Rút thăm câu theo SỐ LƯỢT NPC → guard kích hoạt nhiều lần vẫn KHÁC nhau, đỡ máy móc.
const rot = (arr, s) => arr[(s.messages.filter(m => m.role === 'npc').length) % arr.length];
// Né khi bị hỏi ngược xin đáp án/nhắc bài (bệnh nhân KHÔNG có chuyên môn) — nhiều biến thể.
const DEFLECTS = [
  'Ơ, mình có biết gì về thuốc đâu, nhờ dược sĩ tư vấn giúp ạ.',
  'Mình chịu, không rành thuốc men gì đâu, mong dược sĩ tư vấn giúp.',
  'Cái đó dược sĩ rành hơn chứ mình biết sao được ạ.',
  'Dược sĩ hỏi khó mình rồi, mình có biết gì đâu, nhờ cả dược sĩ đấy ạ.',
];
// Rác / không nghe rõ — nhiều biến thể.
const NOISE_LINES = [
  'Dạ? Dược sĩ nói gì cơ ạ?',
  'Dạ, dược sĩ nói lại giúp với ạ, mình chưa nghe rõ.',
  'Ơ, mình chưa hiểu ý dược sĩ lắm ạ.',
];
// SV nói CỤT/xác nhận, KHÔNG chứa câu hỏi/hướng dẫn (ok, ừ, hi, "tôi không hỏi"…):
// bệnh nhân chỉ đáp tối thiểu rồi CHỜ, KHÔNG dẫn dắt. Khớp khi TOÀN BỘ câu là 1 từ
// xác nhận (neo ^…$) → không đụng câu có nội dung y khoa ("vitamin C", "sốt"…).
const ACK_RE = /^(ok|oke|okay|okie|ừ|ừm|uhm|uh|à|á|vâng|dạ|được|được rồi|rồi|hi+|hí|hello+|helu|hey|yeah|yep|thế à|vậy à|ừ nhỉ|tôi không hỏi|mình không hỏi|không hỏi|không hỏi gì|chưa hỏi|chưa|không|có)\s*[.!,\-)]*$/i;
const PASSIVE_LINES = ['Dạ.', 'Vâng ạ.', 'Dạ, mình nghe đây ạ.', 'Vâng, dược sĩ ạ.', 'Dạ vâng.'];
// Bệnh nhân TỰ DẪN DẮT/giục dược sĩ (đầu ra sai vai): mời/xin/giục dược sĩ đặt câu
// hỏi. KHÔNG bắt câu hợp lệ "Vâng, dược sĩ cứ hỏi đi ạ" (đáp khi ĐƯỢC xin phép hỏi).
const LEAD_RE = /(cho dược sĩ hỏi|dược sĩ (có|có muốn|đã)\s+hỏi[^?]{0,80}(không|chưa)|để (mình|em|con) được tư vấn|dược sĩ (hỏi|tư vấn) (giúp |cho )?(mình|em|con) (đi|thêm|nhé)\s*để)/i;
const PASSIVE_WORRIED = ['Dạ, mình lo quá ạ.', 'Dạ… mình đang sốt ruột lắm ạ.', 'Vâng, mình chờ dược sĩ ạ.'];

// ── LUẬT TIẾT LỘ NGHIÊM NGẶT (yêu cầu #117 · 28/07) ─────────────────────────────
// Persona đã ghi "chỉ nói khi được hỏi đúng" nhưng model 14B vẫn khai kèm cho "đủ ý".
// Lọc TẤT ĐỊNH: cắt khỏi câu trả lời những CÂU chạm `leak` khi lượt hỏi của dược sĩ
// KHÔNG khớp `cue`. Nhờ vậy sinh viên không hỏi thì không bao giờ có thông tin.
export function guardedLeakHit(scenario, out, userText) {
  const facts = Array.isArray(scenario?.guardedFacts) ? scenario.guardedFacts : [];
  return facts.some(f => f.leak.test(out) && !f.cue.test(userText));
}
export function stripGuardedFacts(scenario, reply, userText) {
  const facts = Array.isArray(scenario?.guardedFacts) ? scenario.guardedFacts : [];
  if (!facts.length || !reply) return reply;
  const kept = reply.split(/(?<=[.!?…])\s+/).filter(Boolean)
    .filter(sen => !facts.some(f => f.leak.test(sen) && !f.cue.test(userText)));
  return kept.join(' ').trim();
}

// ── MA TRẬN 2 NHÁNH cho bệnh nhân khó tính (#117 mục 2.3) ───────────────────────
// Anh T (OTC-02) chỉ dịu khi dược sĩ VỪA đồng cảm VỪA giải thích lý do khai thác
// thông tin. Hai vế có thể đến ở hai lượt khác nhau → cộng dồn cờ trong session.
// Chỉ áp cho tình huống CÓ khai báo impatientLines; OTC-01 không bị ảnh hưởng.
// #131 (02/08): tài liệu nhấn mạnh AI phải nhận diện MỌI cách diễn đạt cùng ý nghĩa,
// không chỉ đúng nguyên văn ví dụ. Đo thử bản cũ: 4/8 câu diễn đạt khác bị trượt (kể
// cả 2 ví dụ trong chính tài liệu). Viết lại theo DẤU HIỆU ngữ nghĩa:
//  · đồng cảm  = động từ thấu hiểu gắn với người bệnh, hoặc nhận xét về trạng thái
//    của họ ở thể KHẲNG ĐỊNH ("anh đang rất khó chịu", "có vẻ đau nhiều") — cố ý
//    KHÔNG bắt câu hỏi triệu chứng ("anh có đau không ạ?") để khỏi chuyển pha nhầm.
//  · giải thích = mệnh đề mục đích gắn với dùng thuốc an toàn/phù hợp/hiệu quả, hoặc
//    lý do gắn với hoạt chất và tiền sử bệnh.
const EMPATHY_RE = /((em|tôi|mình)\s*(cũng\s*|rất\s*)?(hiểu|biết|thấy|thông cảm|chia sẻ|đồng cảm)|thông cảm|đồng cảm|có vẻ\s*(rất\s*|khá\s*)?(đau|mệt|khó chịu|vội)|chắc\s*(là\s*)?(anh|chị)|(anh|chị)\s*(đang\s*)?(rất|khá|quá|hơi)\s*(đau|khó chịu|mệt|vội|bận|sốt ruột)|xin lỗi vì|làm phiền|mất thời gian|đừng lo|yên tâm)/i;
const REASON_RE  = /(để[^.?!]{0,40}(an toàn|phù hợp|hiệu quả|đúng thuốc|chọn\s*(đúng\s*)?thuốc|tư vấn|dùng thuốc|đảm bảo|chắc chắn)|(vì|bởi|do)[^.?!]{0,40}(ibuprofen|alaxan|thuốc|dạ dày|gan|thận|dị ứng|tác dụng|tương tác|thận trọng|nguy cơ)|\blý do\b|\bsở dĩ\b|thận trọng|nguy cơ|nên\s*(em|tôi)\s*(phải|cần|xin phép)\s*(hỏi|kiểm tra))/i;
export function updateMoodState(scenario, s, text) {
  if (!Array.isArray(scenario?.impatientLines)) return;
  if (EMPATHY_RE.test(text)) s.context.empathyShown = true;
  if (REASON_RE.test(text))  s.context.reasonGiven  = true;
}
// Giọng thúc giục ở PHA 1 — dùng để DỌN khỏi câu trả lời sau khi đã chuyển pha hợp
// tác (#123 §3 & §5: không được dùng lại, không được trộn hai pha trong một lượt).
// Đo trên prod 01/08: model còn lách bằng "hãy tư vấn nhanh giúp tôi" và "bây giờ
// lấy thuốc được chưa" — mở rộng để bắt MỌI kiểu giục, không chỉ các câu mẫu.
const NAG_OUT_RE = /(sao\s*(mà\s*)?hỏi\s*nhiều|hỏi\s*nhiều\s*(vậy|thế)|đang\s*(rất\s*)?vội|vội\s*lắm|đang\s*rất\s*đau|bao\s*giờ\s*(thì\s*)?lấy|lấy\s*(nhanh\s*)?thuốc[^.?!]{0,25}(đi|đây|chưa)|(tư\s*vấn|làm|lấy|hỏi)\s*nhanh|nhanh\s*(lên|giúp|hộ|giùm)|mau\s*lên|gấp\s*(lắm|quá)|còn\s*(phải\s*)?hỏi\s*gì|(đã\s*)?hỏi\s*xong\s*chưa|xong\s*chưa|muộn\s*giờ|còn\s*gì\s*nữa\s*không)/i;

// Gắn sắc thái vào câu trả lời.
//  - PHA 1 (chưa đủ đồng cảm + giải thích): chêm câu sốt ruột, rải luân phiên.
//  - PHA 2 (đã chuyển): DỌN SẠCH mọi giọng thúc giục model lỡ sinh ra, và mở đầu
//    bằng câu hợp tác luân phiên ở lượt dược sĩ vừa đồng cảm/giải thích.
export function applyMood(scenario, s, reply, userText) {
  const nags = scenario?.impatientLines;
  if (!Array.isArray(nags) || !nags.length || !reply) return reply;
  const acks = scenario.empathyAckLines || [];

  if (s.context.empathyShown && s.context.reasonGiven) {
    // Cắt từng câu mang giọng pha 1 — kể cả khi model tự nghĩ ra câu giục mới.
    let out = reply.split(/(?<=[.!?…])\s+/).filter(Boolean)
      .filter(sen => !NAG_OUT_RE.test(sen)).join(' ').trim();
    if (!out) out = rot(acks, s) || 'Vâng, tôi hiểu rồi.';
    if (EMPATHY_RE.test(userText) || REASON_RE.test(userText)) {
      const ack = rot(acks, s);
      // So khớp BỎ dấu câu cuối: model hay nói "…đã giải thích, tôi hiểu rồi" nên so
      // nguyên văn sẽ trượt và ghép thành hai lần cảm ơn liền nhau.
      const core = (ack || '').replace(/[.!?…]+$/, '');
      // Nếu câu trả lời ĐÃ tự mở đầu bằng lời đồng thuận ("Được…", "Vâng…", "Cảm ơn
      // dược sĩ…") thì thôi, không ghép nữa — kẻo thành hai lời cảm ơn liền nhau.
      const alreadyAck = /^\s*(vâng|được|dạ|ừ|cảm ơn|cám ơn|tôi hiểu)/i.test(out);
      if (core && !alreadyAck && !out.toLowerCase().includes(core.toLowerCase())) out = `${ack} ${out}`.trim();
    }
    return out;
  }
  // Pha 1: chỉ chêm khi model CHƯA tự nói giọng giục — tránh "…tôi đang rất vội.
  // Tôi đang vội lắm." (đo trên prod 02/08).
  if (NAG_OUT_RE.test(reply)) return reply;
  const nag = rot(nags, s);
  return (!nag || reply.includes(nag)) ? reply : `${reply} ${nag}`.trim();
}

// #122 — câu hỏi CHUNG đã có sẵn đáp án lớp 1 → trả TẤT ĐỊNH, không để LLM tự do.
// Nếu trong cùng câu dược sĩ có hỏi ĐÍCH DANH dữ kiện lớp 2 (vd "phân thế nào, có
// nhầy máu không?") thì KHÔNG chặn — để trả lời chi tiết như kịch bản cho phép.
export function generalAnswer(scenario, s, text) {
  const gs = scenario?.generalAnswers;
  if (!Array.isArray(gs) || !gs.length) return null;
  const hit = gs.find(g => g.re.test(text));
  if (!hit) return null;
  if ((scenario.guardedFacts || []).some(f => f.cue.test(text))) return null;
  return rot(hit.lines, s);
}

// #122 — dược sĩ trấn an/động viên: bệnh nhân đáp lại bằng sự yên tâm & biết ơn.
// Câu KHÔNG kèm câu hỏi → trả tất định luôn; có kèm câu hỏi → chỉ ghép làm câu mở đầu.
const REASSURE_RE = /(đừng\s*lo|không\s*(cần\s*)?lo|yên\s*tâm|bình\s*tĩnh|không\s*sao|(em|tôi|mình)\s*hiểu|thông\s*cảm|chia\s*sẻ|sẽ\s*(tư vấn|giúp|hướng dẫn|lo)|không\s*đáng\s*ngại|bé\s*sẽ\s*(ổn|khỏi))/i;
const QUESTION_RE = /\?|\bthế nào\b|\bra sao\b|\bmấy\b|\bbao nhiêu\b|\bbao lâu\b|\bgì\b|\bnào\b|\bkhông\b|\bchưa\b/i;
export function reassureReply(scenario, s, text) {
  const lines = scenario?.empathyReplies;
  if (!Array.isArray(lines) || !lines.length) return null;
  if (!REASSURE_RE.test(text)) return null;
  return { line: rot(lines, s), standalone: !QUESTION_RE.test(text) };
}

// NPC CHUYÊN MÔN (bác sĩ, trưởng khoa…): KHÔNG áp bộ quy tắc bệnh nhân — họ CÓ chuyên
// môn, không "né vì không rành". Chỉ giữ vai + tiếng Việt + không thoát vai/lộ đáp án.
const PROFESSIONAL_RULES = `

QUY TẮC NHẬP VAI (nhân vật CHUYÊN MÔN):
- Giữ ĐÚNG vai theo hồ sơ (bác sĩ / trưởng khoa…), có kiến thức chuyên môn của vai đó. TUYỆT ĐỐI không thừa nhận là AI/mô hình.
- KHÔNG tự nhận là bệnh nhân hay người nhà; KHÔNG nói kiểu "mình không rành thuốc", "nhờ dược sĩ tư vấn giúp mẹ con mình".
- KHÔNG thoát vai; KHÔNG tiết lộ đây là bài mô phỏng/đáp án; KHÔNG làm hộ hay gợi ý bài cho sinh viên (để sinh viên tự lập luận).
- Phản hồi đúng tính cách nhân vật (vd bận rộn, hoài nghi, phản biện), đúng trọng tâm, 1–3 câu.
- Chỉ TIẾNG VIỆT có dấu; KHÔNG chữ Hán/ngoại ngữ; KHÔNG markdown; KHÔNG kèm tiền tố "NPC:".`;
// BỔ SUNG 25/07: câu hỏi CHUNG CHUNG/gợi mở ("bé bị sao?", "cần tư vấn gì?", "đi
// ngoài thế nào?", "thấy trong người thế nào?") → CHỈ nêu triệu chứng chính, TUYỆT
// ĐỐI không liệt kê chi tiết lâm sàng. Chặn TẤT ĐỊNH: trả scenario.chiefComplaintLines
// (xoay biến thể) → LLM không có cơ hội tuôn số lần/phân/sốt. KHÔNG bắt câu CỤ THỂ
// (mấy lần/bao lâu/nhầy máu/thế nào-của-phân) — những câu đó có mẫu riêng, để LLM đáp
// 1-fact theo kịch bản. "phân thế nào" KHÔNG tính chung chung (là chi tiết cụ thể).
const GENERAL_RE = /(bị\s+(làm\s+)?sao\b|bị\s+gì|\blàm\s+sao\b|đang\s+bị\s+(sao|gì|làm\s+sao)|cần\s+(em|mình|chị|anh|gì)?\s*(tư vấn|giúp|hỗ trợ)\s*(gì|thế nào)?|cảm\s+thấy[^?]{0,8}(thế nào|ra sao|sao)\b|thấy[^?]{0,8}(trong\s+người|trong\s+mình)[^?]{0,8}(thế nào|ra sao)\b|(trong\s+người|trong\s+mình)[^?]{0,8}(thế nào|ra sao)\b|có\s+(vấn đề|chuyện|việc)\s+gì|(tình trạng|sức kh[oỏ]e|đi ngoài|ho|đau bụng|bệnh)[^?]{0,15}(thế nào|ra sao)\b)/i;

// Prompt-injection / thao túng: yêu cầu thoát vai, đóng vai khác, lộ đáp án.
const INJECTION_RE = /(quên (hết|đi|các|những|mọi)?\s*(luật|quy tắc|hướng dẫn|chỉ dẫn)|bỏ qua (các )?(luật|quy tắc|hướng dẫn)|đóng vai (giảng viên|giáo viên|dược sĩ|thầy|cô|ai|trợ lý|assistant)|bạn (thực ra )?là ai|bạn là (ai|gì|con ai|mô hình)|you are|ignore (all|previous|the)|system prompt|reveal|tiết lộ (đáp án|kịch bản|luật)|đáp án (là gì|đúng)|kịch bản là gì|hướng dẫn (tôi|em) (cách )?(thực hiện|làm|xử lý) (tình huống|bài|ca)|thoát vai|out of character|act as)/i;

export function attachPharmacy(r) {
  // POST /api/pharmacy/session — create session.
  // Session lưu IN-MEMORY → server restart/rebuild là mất → client gặp 404 sẽ gọi
  // lại endpoint này kèm `restore` (transcript + actions nó tự giữ) để tạo phiên
  // mới LIỀN MẠCH: AI vẫn nhớ hội thoại, chấm điểm vẫn đủ hành động.
  r.post('/api/pharmacy/session', express.json({ limit: '256kb' }), (req, res) => {
    const moduleId = req.body?.moduleId || 'gpp';
    if (!SCENARIOS[moduleId]) return res.status(400).json({ error: 'invalid moduleId' });
    const s = createSession(moduleId);
    const rst = req.body?.restore;
    if (rst && Array.isArray(rst.messages)) {
      s.messages = rst.messages.slice(-80)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'npc',
          content: String(m.content || '').slice(0, 2000),
          ts: Number(m.ts) || Date.now()
        }))
        .filter(m => m.content);
    }
    if (rst && Array.isArray(rst.actions)) {
      s.actions = rst.actions.slice(-200)
        .map(a => ({
          type: String(a.type || '').slice(0, 60),
          payload: (a.payload && typeof a.payload === 'object') ? a.payload : {},
          ts: Number(a.ts) || Date.now()
        }))
        .filter(a => a.type);
    }
    saveSession(s);
    res.json({ session: s, scenario: SCENARIOS[moduleId] });
  });

  // POST /api/pharmacy/chat — user → NPC
  r.post('/api/pharmacy/chat', express.json({ limit: '256kb' }), async (req, res) => {
    const { sessionId, message } = req.body || {};
    const s = getSession(sessionId);
    if (!s) return res.status(404).json({ error: 'session not found' });
    const scenario = SCENARIOS[s.moduleId];
    // Guard ĐẶC THÙ bệnh nhân (né "không rành thuốc", tiết lộ 2 lớp, chào, thụ động,
    // triệu chứng chính) CHỈ áp cho NPC bệnh nhân. NPC chuyên môn (bác sĩ/trưởng khoa)
    // bỏ qua các guard này để không bị "bắt" nói giọng bệnh nhân. Mặc định = bệnh nhân.
    const isPatient = scenario.npcKind !== 'professional';

    const text = String(message || '').trim();
    if (!text) return res.status(400).json({ error: 'empty message' });
    s.messages.push({ role: 'user', content: text, ts: Date.now() });
    updateMoodState(scenario, s, text);   // #117: cộng dồn cờ đồng cảm / giải thích

    // GUARD 1 — đầu vào rác: phản hồi tất định (xoay biến thể), không gọi LLM (6.2).
    if (isGibberish(text)) {
      const reply = rot(scenario.noiseLines || NOISE_LINES, s);
      s.messages.push({ role: 'npc', content: reply, ts: Date.now() });
      saveSession(s);
      return res.json({ session: s });
    }
    // GUARD 2 — prompt-injection/thao túng: bỏ qua, GHI NHẬN vi phạm, LẶP LẠI câu
    // thoại gần nhất của nhân vật (tài liệu 6.2 — chặn thoát vai/lộ đáp án).
    if (INJECTION_RE.test(text)) {
      s.context.violations = (s.context.violations || 0) + 1;
      const lastNpc = [...s.messages].reverse().find(m => m.role === 'npc');
      const reply = (lastNpc && lastNpc.content) || scenario.npcOpening || 'Dược sĩ cứ tư vấn giúp tôi về bệnh của tôi nhé.';
      s.messages.push({ role: 'npc', content: reply, ts: Date.now(), violation: true });
      saveSession(s);
      return res.json({ session: s });
    }
    // GUARD 2b — "thao túng mềm": hỏi ngược bệnh nhân xin đáp án/nhắc bài
    // ("Tôi nên hỏi gì?", "Tôi sẽ tư vấn thuốc gì?") → né trong vai + ghi vi phạm.
    if (isPatient && COACH_RE.test(text)) {
      s.context.violations = (s.context.violations || 0) + 1;
      s.messages.push({ role: 'npc', content: rot(scenario.deflects || DEFLECTS, s), ts: Date.now(), violation: true });
      saveSession(s);
      return res.json({ session: s });
    }

    // GUARD 3 — nguyên tắc 22/07 #1+#3: lượt ĐẦU dược sĩ mới CHÀO/giới thiệu (chưa
    // hỏi gì) → bệnh nhân CHỈ chào lại theo kịch bản, KHÔNG kể bệnh (tất định,
    // model 14B hay "nhiệt tình" khai luôn triệu chứng ngay khi được chào).
    const userTurns = s.messages.filter(m => m.role === 'user').length; // đã gồm câu vừa push
    if (isPatient && scenario.greetingReply && userTurns === 1 && /(chào|\b(hi|hello|helu|hey)\b)/i.test(text) && !/\?/.test(text) && text.length <= 120) {
      s.messages.push({ role: 'npc', content: scenario.greetingReply, ts: Date.now() });
      saveSession(s);
      return res.json({ session: s });
    }

    // GUARD 2c — SV nói CỤT/xác nhận (ok, ừ, hi, "tôi không hỏi"…): không có câu hỏi
    // → bệnh nhân đáp tối thiểu rồi CHỜ, KHÔNG dẫn dắt (đúng sư phạm: SV tự chủ động).
    if (isPatient && ACK_RE.test(text)) {
      const nNpc = s.messages.filter(m => m.role === 'npc').length;
      const passive = scenario.passiveLines || PASSIVE_LINES;
      s.messages.push({ role: 'npc', content: passive[nNpc % passive.length], ts: Date.now() });
      saveSession(s);
      return res.json({ session: s });
    }

    // GUARD 2c-bis (#122) — dược sĩ TRẤN AN/ĐỘNG VIÊN mà không hỏi gì → đáp lại
    // bằng sự yên tâm, biết ơn (tất định). Có kèm câu hỏi thì để xuống dưới ghép.
    const reassure = isPatient ? reassureReply(scenario, s, text) : null;
    if (reassure && reassure.standalone) {
      s.messages.push({ role: 'npc', content: reassure.line, ts: Date.now() });
      saveSession(s);
      return res.json({ session: s });
    }

    // GUARD 2d-bis (#122) — câu hỏi CHUNG có đáp án lớp 1 sẵn (phân thế nào / chế độ
    // ăn uống thế nào) → trả tất định, chi tiết lớp 2 không có đường lọt ra.
    {
      const ga = isPatient && generalAnswer(scenario, s, text);
      if (ga) {
        s.messages.push({ role: 'npc', content: reassure ? `${reassure.line} ${ga}` : ga, ts: Date.now() });
        saveSession(s);
        return res.json({ session: s });
      }
    }

    // GUARD 2d — BỔ SUNG 25/07: câu hỏi CHUNG CHUNG → chỉ nêu TRIỆU CHỨNG CHÍNH
    // (tất định), không để LLM liệt kê chi tiết lâm sàng.
    if (isPatient && GENERAL_RE.test(text) && Array.isArray(scenario.chiefComplaintLines) && scenario.chiefComplaintLines.length) {
      s.messages.push({ role: 'npc', content: rot(scenario.chiefComplaintLines, s), ts: Date.now() });
      saveSession(s);
      return res.json({ session: s });
    }

    // Detect pregnancy disclosure for fatal-error context.
    if (/(có thai|mang thai)/i.test(s.messages.map(m => m.content).join(' '))) {
      s.context.pregnant = true;
    }

    let reply = await npcReply(scenario, s.messages, text);
    // Lưới CUỐI: model lỡ "nhắc bài" (câu dạng "Dược sĩ nên…") → thay câu né + ghi vi phạm.
    if (isPatient && LEAK_RE.test(reply)) {
      s.context.violations = (s.context.violations || 0) + 1;
      reply = rot(scenario.deflects || DEFLECTS, s);
    }
    // Lưới CUỐI 2: bệnh nhân TỰ DẪN DẮT/giục dược sĩ → thay câu chờ trong vai.
    if (isPatient && LEAD_RE.test(reply)) {
      s.context.violations = (s.context.violations || 0) + 1;
      reply = rot(scenario.passiveWaitLines || PASSIVE_WORRIED, s);
    }
    // Lưới CUỐI 3 (#117): cắt dữ kiện tiết lộ khi CHƯA được hỏi đúng.
    if (isPatient) {
      const filtered = stripGuardedFacts(scenario, reply, text);
      reply = filtered || rot(scenario.passiveLines || PASSIVE_LINES, s);
    }
    reply = applyMood(scenario, s, reply, text);
    if (reassure && !reply.includes(reassure.line)) reply = `${reassure.line} ${reply}`.trim();
    s.messages.push({ role: 'npc', content: reply, ts: Date.now() });
    saveSession(s);
    res.json({ session: s });
  });

  // POST /api/pharmacy/chat-stream — như /chat nhưng STREAM SSE: token sinh đến đâu
  // đẩy về client đến đó (data: {delta}), kết thúc bằng data: {done:true, reply}
  // trong đó reply = bản đã clean+trim CHUẨN (client thay text bubble bằng bản này).
  // Guard tất định (rác/injection/chào lượt đầu) trả 1 phát rồi đóng. Server vẫn
  // CẮT SỚM ngay trong lúc stream khi đủ số câu/ký tự → abort upstream đỡ tốn GPU.
  r.post('/api/pharmacy/chat-stream', express.json({ limit: '256kb' }), async (req, res) => {
    const { sessionId, message } = req.body || {};
    const s = getSession(sessionId);
    if (!s) return res.status(404).json({ error: 'session not found' });
    const scenario = SCENARIOS[s.moduleId];
    const isPatient = scenario.npcKind !== 'professional';
    const text = String(message || '').trim();
    if (!text) return res.status(400).json({ error: 'empty message' });
    s.messages.push({ role: 'user', content: text, ts: Date.now() });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'   // tắt buffering ở nginx/NPM để token trôi ngay
    });
    const sse = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);
    const finish = (reply, extra = {}) => {
      s.messages.push({ role: 'npc', content: reply, ts: Date.now(), ...extra });
      saveSession(s);
      sse({ done: true, reply });
      res.end();
    };

    // Guard tất định — giống /chat.
    if (isGibberish(text)) return finish(rot(scenario.noiseLines || NOISE_LINES, s));
    if (INJECTION_RE.test(text)) {
      s.context.violations = (s.context.violations || 0) + 1;
      const lastNpc = [...s.messages].reverse().find(m => m.role === 'npc');
      return finish((lastNpc && lastNpc.content) || scenario.npcOpening || 'Dược sĩ cứ tư vấn giúp mẹ con mình về bệnh của bé nhé.', { violation: true });
    }
    // GUARD 2b — hỏi ngược xin đáp án/nhắc bài → né trong vai + ghi vi phạm.
    if (isPatient && COACH_RE.test(text)) {
      s.context.violations = (s.context.violations || 0) + 1;
      return finish(rot(scenario.deflects || DEFLECTS, s), { violation: true });
    }
    const userTurns = s.messages.filter(m => m.role === 'user').length;
    if (isPatient && scenario.greetingReply && userTurns === 1 && /(chào|\b(hi|hello|helu|hey)\b)/i.test(text) && !/\?/.test(text) && text.length <= 120) {
      return finish(scenario.greetingReply);
    }
    // GUARD 2c — SV nói cụt/xác nhận → đáp tối thiểu, không dẫn dắt.
    if (isPatient && ACK_RE.test(text)) {
      const nNpc = s.messages.filter(m => m.role === 'npc').length;
      const passive = scenario.passiveLines || PASSIVE_LINES;
      return finish(passive[nNpc % passive.length]);
    }
    // GUARD 2d — câu hỏi CHUNG CHUNG → chỉ triệu chứng chính (25/07).
    // #122 — trấn an/động viên không kèm câu hỏi → đáp yên tâm, biết ơn (tất định).
    const reassure = isPatient ? reassureReply(scenario, s, text) : null;
    if (reassure && reassure.standalone) return finish(reassure.line);
    // #122 — câu hỏi CHUNG có đáp án lớp 1 sẵn → trả tất định, không lộ lớp 2.
    {
      const ga = isPatient && generalAnswer(scenario, s, text);
      if (ga) return finish(reassure ? `${reassure.line} ${ga}` : ga);
    }
    if (isPatient && GENERAL_RE.test(text) && Array.isArray(scenario.chiefComplaintLines) && scenario.chiefComplaintLines.length) {
      return finish(rot(scenario.chiefComplaintLines, s));
    }
    if (/(có thai|mang thai)/i.test(s.messages.map(m => m.content).join(' '))) s.context.pregnant = true;

    const teachBack = /(nhắc lại|nói lại|lặp lại|kể lại)/i.test(text);
    const maxSent = teachBack ? 3 : 2;
    const maxCh = teachBack ? 330 : 200;
    // Client rời trang giữa chừng → ngắt upstream Ollama. 🪤 KHÔNG dùng req.on('close'):
    // Node 20 bắn 'close' NGAY khi request body đọc xong (stream request kết thúc) chứ
    // không phải khi client rời — từng làm MỌI reply stream bị cắt còn 1 token → stub.
    // res.destroyed chỉ true khi socket thật sự chết → mới là "client đã đi".
    try {
      let started = false, pending = '', emitted = '';
      const full = await ollamaGenerateStream({
        prompt: buildPrompt(scenario.npcPersona, s.messages, text),
        system: (scenario.npcPersona || '') + ROLEPLAY_RULES + (teachBack ? TEACHBACK_HINT : ''),
        temperature: 0.55,
        maxTokens: teachBack ? 200 : 120,
        onToken: (t) => {
          if (res.destroyed) return false;
          pending += t;
          if (!started) {
            // Giữ lại vài token đầu để lột tiền tố vai ("NPC:", "Bệnh nhân:", dấu ").
            if (pending.length < 14 && /^\s*["“]?(NPC|Khách hàng|Bệnh nhân|Bác sĩ|Assistant|AI)?\s*[:：]?\s*$/i.test(pending)) return;
            const out = pending.replace(/^\s*(NPC|Khách hàng|Bệnh nhân|Bác sĩ|Assistant|AI)\s*[:：]\s*/i, '').replace(/^["“]\s*/, '');
            pending = '';
            started = true;
            emitted += out;
            if (out) sse({ delta: out });
          } else {
            emitted += t;
            sse({ delta: t });
          }
          // Model bắt đầu "nhắc bài"/dẫn dắt → NGẮT luôn; final thay câu né.
          if (isPatient && (LEAK_RE.test(emitted) || LEAD_RE.test(emitted))) return false;
          // #117: chớm tuôn dữ kiện CHƯA được hỏi → ngắt luôn, bản final sẽ bị cắt sạch.
          if (isPatient && guardedLeakHit(scenario, emitted, text)) return false;
          // Cắt sớm khi đã đủ câu/ký tự (khớp trimReply) → trả false để abort Ollama.
          const sentences = (emitted.match(/[.!?…]/g) || []).length;
          if (sentences >= maxSent || emitted.length >= maxCh) return false;
        }
      });
      let finalReply = trimReply(cleanReply(full), maxSent, maxCh) || stubReply(scenario.id);
      // Lưới CUỐI: model lỡ nhắc bài / tự dẫn dắt → thay câu né + ghi vi phạm.
      if (isPatient && LEAK_RE.test(finalReply)) {
        s.context.violations = (s.context.violations || 0) + 1;
        finalReply = rot(scenario.deflects || DEFLECTS, s);
      } else if (isPatient && LEAD_RE.test(finalReply)) {
        s.context.violations = (s.context.violations || 0) + 1;
        finalReply = rot(scenario.passiveWaitLines || PASSIVE_WORRIED, s);
      }
      // Lưới CUỐI 3 (#117): cắt dữ kiện chưa được hỏi. Stream đã cắt sớm ở onToken
      // nên phần lỡ hiện trên màn hình rất ngắn; client thay bubble bằng bản này.
      if (isPatient) {
        const filtered = stripGuardedFacts(scenario, finalReply, text);
        finalReply = filtered || rot(scenario.passiveLines || PASSIVE_LINES, s);
      }
      let moody = applyMood(scenario, s, finalReply, text);
      if (reassure && !moody.includes(reassure.line)) moody = `${reassure.line} ${moody}`.trim();
      finish(moody);
    } catch (err) {
      console.error('[pharmacy] ollama stream failed, using stub:', err.message);
      finish(stubReply(scenario.id));
    }
  });

  // POST /api/pharmacy/action — record a 3D-scene action
  r.post('/api/pharmacy/action', express.json(), (req, res) => {
    const { sessionId, type, payload } = req.body || {};
    const s = getSession(sessionId);
    if (!s) return res.status(404).json({ error: 'session not found' });
    if (!type) return res.status(400).json({ error: 'missing type' });
    s.actions.push({ type, payload: payload || {}, ts: Date.now() });
    saveSession(s);
    res.json({ session: s });
  });

  // POST /api/pharmacy/score — finalize + compute SEGUE score
  r.post('/api/pharmacy/score', express.json(), (req, res) => {
    const { sessionId } = req.body || {};
    const s = getSession(sessionId);
    if (!s) return res.status(404).json({ error: 'session not found' });
    s.endedAt = Date.now();
    saveSession(s);
    const score = computeScore(s);
    res.json({ session: s, score });
  });

  // GET /api/pharmacy/session/:id — debug/recover
  r.get('/api/pharmacy/session/:id', (req, res) => {
    const s = getSession(req.params.id);
    if (!s) return res.status(404).json({ error: 'not found' });
    res.json({ session: s });
  });
}
