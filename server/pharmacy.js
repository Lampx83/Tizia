// Pharmacy AI port — session store + chat / action / score routes.
// Logic ported 1-1 from github.com/Lampx83/Pharmacy-AI (src/lib/segue/*, src/lib/session/store.ts).
import express from 'express';
import { ollamaGenerate } from './ai.js';
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
  return 'Em cứ trình bày tiếp đi, tôi đang nghe.';
}

// Quy tắc nhập vai chung → ép Ollama đóng vai bệnh nhân/khách THẬT, tự nhiên
// (yêu cầu thầy: hỏi-đáp giống bệnh nhân thật). Ghép sau persona riêng từng scenario.
const ROLEPLAY_RULES = `

QUY TẮC NHẬP VAI (BẮT BUỘC):
- ⚠️ CHỈ dùng TIẾNG VIỆT có dấu. TUYỆT ĐỐI KHÔNG dùng chữ Hán/tiếng Trung (汉字), tiếng Anh hay ngôn ngữ khác. Nếu lỡ định viết chữ Hán, hãy thay bằng từ tiếng Việt tương đương.
- LUÔN giữ đúng vai, TUYỆT ĐỐI không thừa nhận mình là AI/trợ lý/mô hình.
- Nói như người Việt đời thường: câu NGẮN, tự nhiên, có cảm xúc thật (sốt ruột, lo lắng, nài nỉ, biết ơn…).
- CHỈ tiết lộ thông tin cá nhân (tiền sử, thai kỳ, dị ứng, thuốc đang dùng, nghề nghiệp) KHI dược sĩ hỏi đúng — không tự khai trước.
- Phản ứng hợp lý theo lời dược sĩ: nếu được giải thích thuyết phục + đồng cảm thì DẦN nghe theo; nếu chưa thì còn phân vân/nài nỉ thêm.
- Thỉnh thoảng hỏi ngược lại dược sĩ (giá tiền, cách dùng, bao lâu thì khỏi, có tác dụng phụ không).
- Trả lời 1–3 câu thoại tiếng Việt, KHÔNG markdown, KHÔNG gạch đầu dòng, KHÔNG kèm tiền tố "NPC:".`;

// Dọn output: bỏ tiền tố vai + nhãn ngoặc; CHẶN chữ Hán/CJK mà Qwen hay lẫn vào
// (giữ trải nghiệm thuần Việt). Nếu sau khi lọc còn quá ngắn → trả '' để dùng stub.
function cleanReply(s) {
  let r = String(s || '')
    .replace(/^\s*(NPC|Khách hàng|Bệnh nhân|Bác sĩ|Assistant|AI)\s*[:：]\s*/i, '')
    .replace(/^["“]|["”]$/g, '')
    .trim();
  // Bỏ ký tự CJK (Hán/Nhật/Hàn) + dấu câu Trung nếu lọt vào (dùng \u cho chắc).
  const CJK = /[　-〿぀-ヿ㐀-䶿一-鿿가-힯＀-￯]+/g;
  if (CJK.test(r)) r = r.replace(CJK, ' ').replace(/\s{2,}/g, ' ').replace(/\s+([,.!?;:])/g, '$1').trim();
  return r.length >= 4 ? r : '';
}

async function npcReply(scenario, history, userMessage) {
  const prompt = buildPrompt(scenario.npcPersona, history, userMessage);
  try {
    const reply = await ollamaGenerate({
      prompt,
      system: (scenario.npcPersona || '') + ROLEPLAY_RULES,
      temperature: 0.8,
      maxTokens: 200
    });
    return cleanReply(reply) || stubReply(scenario.id);
  } catch (err) {
    console.error('[pharmacy] ollama failed, using stub:', err.message);
    return stubReply(scenario.id);
  }
}

export function attachPharmacy(r) {
  // POST /api/pharmacy/session — create session
  r.post('/api/pharmacy/session', express.json(), (req, res) => {
    const moduleId = req.body?.moduleId || 'gpp';
    if (!SCENARIOS[moduleId]) return res.status(400).json({ error: 'invalid moduleId' });
    const s = createSession(moduleId);
    res.json({ session: s, scenario: SCENARIOS[moduleId] });
  });

  // POST /api/pharmacy/chat — user → NPC
  r.post('/api/pharmacy/chat', express.json({ limit: '256kb' }), async (req, res) => {
    const { sessionId, message } = req.body || {};
    const s = getSession(sessionId);
    if (!s) return res.status(404).json({ error: 'session not found' });
    const scenario = SCENARIOS[s.moduleId];

    const text = String(message || '').trim();
    if (!text) return res.status(400).json({ error: 'empty message' });
    s.messages.push({ role: 'user', content: text, ts: Date.now() });

    // Detect pregnancy disclosure for fatal-error context.
    if (/(có thai|mang thai)/i.test(s.messages.map(m => m.content).join(' '))) {
      s.context.pregnant = true;
    }

    const reply = await npcReply(scenario, s.messages, text);
    s.messages.push({ role: 'npc', content: reply, ts: Date.now() });
    saveSession(s);
    res.json({ session: s });
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

export const plugin = {
  name: 'pharmacy',
  mount(router) {
    attachPharmacy(router);
  },
};
