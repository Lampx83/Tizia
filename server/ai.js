// ============================================================
// AITutor backend — Ollama (qwen2.5:14b-instruct-ctx16k)
// ============================================================
// 3 endpoints:
//   POST /api/ai/grade-soap        — chấm SOAP note theo rubric
//   POST /api/ai/patient-turn      — 1 lượt đối thoại với AI patient
//   POST /api/ai/evaluate-roleplay — chấm toàn bộ phiên role-play
//
// Cấu hình env — KHÔNG có fallback cứng trong code (trước đây có, đã bỏ: một
// endpoint dev-tunnel + shared secret nằm thẳng trong source là rò rỉ, và mỗi
// nơi đọc biến này lại tự chép một bản default riêng, chưa kể phải sync tay
// với ai-board/harness/models.py). Nguồn sự thật DUY NHẤT là `.env` — thiếu
// biến nào thì `/api/ai/*` trả 503 rõ ràng thay vì âm thầm gọi ra một endpoint
// không ai biết trước là gì:
//   OLLAMA_URL     — base URL của Ollama; client nối thêm /api/generate hoặc /chat
//   OLLAMA_SECKEY  — Header x-ollama-seckey. Tuỳ endpoint có gateway hay không
//                    (không set thì không gắn header, xem đoạn header bên dưới).
//   TIZIA_MODEL_<ENDPOINT> / TIZIA_MODEL_DEFAULT — model route-specific hoặc mặc định
//   OLLAMA_MODEL   — fallback tương thích; GATE1_MODEL là fallback cuối cho dev
//   OLLAMA_TIMEOUT_MS — timeout 1 yêu cầu (mặc định 60s — không phải bí mật,
//                       giữ default này vì chỉ là tuning, không phải endpoint/key)
//
// Ưu điểm khi dùng Ollama nội bộ:
//   - Miễn phí token (chạy on-prem, không gọi cloud)
//   - Dữ liệu BN/SOAP KHÔNG ra ngoài → tốt cho privacy giáo dục y dược
//   - Tiếng Việt chuẩn (qwen2.5 multilingual mạnh)
// ============================================================

import { aiQuotaGate, recordAiCall } from './ai-quota.js';
import { saveAiQuestions, saveAiQa, getAiQuestions, getAiQa, getAiContentCounts } from './db.js';
import { sendGA4Event } from './contexts/analytics/ga4-mp.js';
import {
  addSecurityGuardrails,
  containsPromptDisclosure,
  isPromptExtractionRequest,
  PROMPT_DISCLOSURE_REFUSAL,
  wrapUntrustedInput,
} from './ai-prompt-guardrails.js';
import { currentAIModel, resolveAIModel, runWithAIModel } from './ai-model-router.js';

const OLLAMA_URL = (process.env.OLLAMA_URL || '').replace(/\/+$/, '');
const OLLAMA_SECKEY = process.env.OLLAMA_SECKEY || '';
const OLLAMA_MODEL = resolveAIModel('default');
const OLLAMA_TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS) || 60_000;

if (OLLAMA_URL) {
  console.log(`[ai] Ollama backend = ${OLLAMA_URL} (default model=${OLLAMA_MODEL || 'per-route'})`);
} else {
  console.warn('[ai] OLLAMA_URL chưa set trong .env — /api/ai/* sẽ trả 503 cho mọi call.');
}

/**
 * Attach AI routes to an Express Router.
 * @param {import('express').Router} r
 */
export function attachAi(r) {
  // Mỗi endpoint AI đi qua aiQuotaGate (chặn 429 nếu vượt) + recordAiCall (log usage).
  // Health endpoint KHÔNG gate vì là probe hạ tầng, không tiêu AI capacity.
  r.post('/api/ai/grade-soap',        ...wrapAi('grade-soap',        handleGradeSoap));
  r.post('/api/ai/patient-turn',      ...wrapAi('patient-turn',      handlePatientTurn));
  r.post('/api/ai/evaluate-roleplay', ...wrapAi('evaluate-roleplay', handleEvaluateRoleplay));
  r.post('/api/ai/tutor-chat',        ...wrapAi('tutor-chat',        handleTutorChat));
  r.post('/api/ai/sim-patient',       ...wrapAi('sim-patient',       handleSimPatient));
  r.post('/api/ai/sim-grade',         ...wrapAi('sim-grade',         handleSimGrade));
  r.post('/api/ai/history-chat',      ...wrapAi('history-chat',      handleHistoryChat));
  r.post('/api/ai/negotiate',         ...wrapAi('negotiate',         handleNegotiate));
  r.post('/api/ai/negotiate-grade',   ...wrapAi('negotiate-grade',   handleNegotiateGrade));
  r.post('/api/ai/pdf-explain',       ...wrapAi('pdf-explain',       handlePdfExplain));
  r.post('/api/ai/quiz-generate',     ...wrapAi('quiz-generate',     handleQuizGenerate));
  r.post('/api/ai/pdf-quiz',          ...wrapAi('pdf-quiz',          handlePdfQuiz));
  r.post('/api/ai/practice-more',     ...wrapAi('practice-more',     handlePracticeMore));
  r.post('/api/ai/grade-sentence',    ...wrapAi('grade-sentence',    handleGradeSentence));
  r.post('/api/ai/extract-vocab',     ...wrapAi('extract-vocab',     handleExtractVocab));
  r.post('/api/ai/lesson-coach',      ...wrapAi('lesson-coach',      handleLessonCoach));
  r.get( '/api/ai/lesson-bank',       wrap(handleLessonBank));   // đọc kho — không gọi AI, không quota
  r.get( '/api/ai/health',            wrap(handleHealth));
}

export const plugin = {
  name: 'ai-tutor',
  catalog: {
    kind: 'context', tier: 'core',
    provides: ['/api/ai/* (AITutor chat qua Ollama)'],
    description: 'Chatbot AITutor — gọi Ollama trực tiếp, không phải qua surface.',
  },
  mount(router) {
    attachAi(router);
  },
};

// wrap: cho health probe — không quota, không log usage.
function wrap(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req.body || {}, req);
      res.json(result);
    } catch (e) {
      console.error('[ai] handler error:', e?.message || e);
      res.status(500).json({ error: 'AI request failed', detail: String(e?.message || e) });
    }
  };
}

// wrapAi: gate quota trước handler (429 nếu vượt), log usage sau handler.
// Handler có thể attach `_usage: { prompt_tokens, completion_tokens }` vào result
// để log token thật; nếu không có, log 0 tokens (request count vẫn được track).
function wrapAi(endpoint, handler) {
  return [
    aiQuotaGate(endpoint),
    async (req, res) => {
      const model = resolveAIModel(endpoint);
      if (!OLLAMA_URL || !model) {
        return res.status(503).json({ error: 'AI backend chưa cấu hình (thiếu OLLAMA_URL hoặc model cho route)' });
      }
      const t0 = Date.now();
      try {
        const result = await runWithAIModel(model, () => handler(req.body || {}, req));
        const u = result?._usage || {};
        recordAiCall(req, {
          provider: 'ollama', model,
          prompt_tokens:     u.prompt_tokens     || 0,
          completion_tokens: u.completion_tokens || 0,
          status: 'ok',
        });
        // GA4: ai_chat — endpoint + model + thời gian xử lý. Tokens nếu handler báo.
        sendGA4Event(req, 'ai_chat', {
          endpoint, model,
          prompt_tokens: u.prompt_tokens || 0,
          completion_tokens: u.completion_tokens || 0,
          duration_ms: Date.now() - t0,
          status: 'ok',
        });
        if (result && '_usage' in result) delete result._usage;
        res.json(result);
      } catch (e) {
        recordAiCall(req, { provider: 'ollama', model, status: 'error' });
        sendGA4Event(req, 'ai_chat', {
          endpoint, model,
          duration_ms: Date.now() - t0, status: 'error',
        });
        console.error('[ai] handler error:', e?.message || e);
        res.status(500).json({ error: 'AI request failed', detail: String(e?.message || e) });
      }
    },
  ];
}

// ─────────────────────────────────────────────────────────────
// Low-level: gọi Ollama
// ─────────────────────────────────────────────────────────────

/**
 * Gọi /generate (single-turn, prompt thuần).
 * @param {Object} opt
 * @param {string} opt.prompt   - Prompt đầy đủ (đã ghép system + user)
 * @param {string} [opt.system] - System prompt (nếu model support)
 * @param {number} [opt.temperature] - Default 0.3 (để output ổn định)
 * @param {boolean} [opt.json]  - Yêu cầu output JSON (Ollama format=json)
 * @param {number}  [opt.maxTokens] - num_predict
 * @returns {Promise<string>}
 */
export async function ollamaGenerate({ prompt, system, temperature = 0.3, json = false, maxTokens = 1500 }) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), OLLAMA_TIMEOUT_MS);
  try {
    const protectedSystem = addSecurityGuardrails([{ role: 'system', content: system || '' }])[0].content;
    const body = {
      model: currentAIModel(OLLAMA_MODEL),
      prompt: wrapUntrustedInput(prompt),
      system: protectedSystem,
      stream: false,
      options: { temperature, num_predict: maxTokens },
    };
    if (json) body.format = 'json';

    const headers = { 'Content-Type': 'application/json' };
    if (OLLAMA_SECKEY) headers['x-ollama-seckey'] = OLLAMA_SECKEY;
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}: ${await res.text().catch(() => '')}`);
    const data = await res.json();
    const reply = String(data.response || '').trim();
    if (containsPromptDisclosure(reply, protectedSystem)) throw new Error('AI response blocked by prompt-disclosure guard');
    return reply;
  } finally {
    clearTimeout(tid);
  }
}

/**
 * Gọi /chat (multi-turn, có history). Ollama hỗ trợ messages giống OpenAI.
 * @param {Object} opt
 * @param {Array<{role:'system'|'user'|'assistant', content:string}>} opt.messages
 * @param {number} [opt.temperature]
 * @param {boolean} [opt.json]
 * @param {number}  [opt.maxTokens]
 */
async function ollamaChat({ messages, temperature = 0.7, json = false, maxTokens = 800 }) {
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), OLLAMA_TIMEOUT_MS);
  try {
    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
    if (isPromptExtractionRequest(latestUserMessage)) return PROMPT_DISCLOSURE_REFUSAL;
    const protectedMessages = addSecurityGuardrails(messages);
    const protectedSystem = protectedMessages[0].content;
    const body = {
      model: currentAIModel(OLLAMA_MODEL),
      messages: protectedMessages,
      stream: false,
      options: { temperature, num_predict: maxTokens },
    };
    if (json) body.format = 'json';

    const headers = { 'Content-Type': 'application/json' };
    if (OLLAMA_SECKEY) headers['x-ollama-seckey'] = OLLAMA_SECKEY;
    const res = await fetch(`${OLLAMA_URL}/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}: ${await res.text().catch(() => '')}`);
    const data = await res.json();
    const reply = String(data.message?.content || '').trim();
    return containsPromptDisclosure(reply, protectedSystem) ? PROMPT_DISCLOSURE_REFUSAL : reply;
  } finally {
    clearTimeout(tid);
  }
}

// ─────────────────────────────────────────────────────────────
// HEALTH
// ─────────────────────────────────────────────────────────────

async function handleHealth() {
  const model = resolveAIModel('health');
  if (!OLLAMA_URL || !model) return { ok: false, error: 'AI backend chưa cấu hình (thiếu OLLAMA_URL hoặc model)' };
  try {
    const reply = await runWithAIModel(model, () => ollamaGenerate({ prompt: 'Trả lời gọn: OK', maxTokens: 20 }));
    return { ok: true, url: OLLAMA_URL, model, sampleReply: reply };
  } catch (e) {
    return { ok: false, url: OLLAMA_URL, error: String(e?.message || e) };
  }
}

// ─────────────────────────────────────────────────────────────
// GRADE SOAP
// ─────────────────────────────────────────────────────────────

const SOAP_SYSTEM = `Bạn là giảng viên Dược lâm sàng Việt Nam giàu kinh nghiệm.
Nhiệm vụ: chấm SOAP note của sinh viên Dược năm 4–5 theo rubric chuẩn của ca lâm sàng được cung cấp.

QUY TẮC:
1. Chấm 4 phần S/O/A/P, mỗi phần điểm 0.0–1.0 (số thực 1 chữ số thập phân).
2. Đánh giá BÁM CHẶT rubric — không cho điểm rộng rãi.
3. Feedback ngắn, cụ thể, có tính xây dựng.
4. Phải nhận diện các DRP (Drug-Related Problems) đã liệt kê trong ca.
5. CHỈ trả JSON, không viết gì thêm bên ngoài JSON.

Format JSON BẮT BUỘC:
{
  "scores": { "subjective": 0.0, "objective": 0.0, "assessment": 0.0, "plan": 0.0 },
  "feedback": {
    "subjective": "...",
    "objective": "...",
    "assessment": "...",
    "plan": "..."
  },
  "missedDRPs": ["..."],
  "strengths": ["..."],
  "overallComment": "1–2 câu tổng kết"
}`;

async function handleGradeSoap({ caseId, soapText, rubric = 'all' }) {
  if (!caseId || !soapText) throw new Error('caseId and soapText are required');

  const { getCase } = await import('../public/js/engine/case-db.js');
  const clinicalCase = getCase(caseId);
  if (!clinicalCase) throw new Error(`Case not found: ${caseId}`);

  const caseBlock = JSON.stringify({
    title: clinicalCase.title,
    chiefComplaint: clinicalCase.chiefComplaint,
    history: clinicalCase.history,
    patient: clinicalCase.patient,
    prescriptions: clinicalCase.prescriptions,
    drps: clinicalCase.drps,
    rubric: clinicalCase.soapRubric,
  }, null, 2);

  const prompt = `<CA LÂM SÀNG>
${caseBlock}
</CA LÂM SÀNG>

<BÀI LÀM SOAP CỦA SINH VIÊN>
${soapText}
</BÀI LÀM SOAP CỦA SINH VIÊN>

Chấm theo rubric. CHỈ trả JSON.`;

  const raw = await ollamaGenerate({
    prompt,
    system: SOAP_SYSTEM,
    temperature: 0.2,
    json: true,
    maxTokens: 1500,
  });
  const parsed = safeParseJson(raw);

  return {
    scores: parsed.scores || { subjective: 0, objective: 0, assessment: 0, plan: 0 },
    feedback: parsed.feedback || {},
    missedDRPs: parsed.missedDRPs || [],
    strengths: parsed.strengths || [],
    overallComment: parsed.overallComment || '',
    html: renderSoapFeedbackHtml(parsed),
    raw: parsed,
  };
}

function renderSoapFeedbackHtml(p) {
  if (!p?.scores) return '<i>Phân tích lỗi.</i>';
  const s = p.scores;
  const fb = p.feedback || {};
  const pct = v => Math.round((v ?? 0) * 100);
  const row = (label, key) => `
    <div class="soap-row">
      <div class="soap-label"><b>${label}</b> — ${pct(s[key])}/100</div>
      <div class="soap-bar"><div style="width:${pct(s[key])}%"></div></div>
      <div class="soap-fb">${escapeHtml(fb[key] || '')}</div>
    </div>`;
  const missed = (p.missedDRPs || []).map(d => `<li>${escapeHtml(d)}</li>`).join('');
  const strengths = (p.strengths || []).map(d => `<li>${escapeHtml(d)}</li>`).join('');
  return `
    <div class="ai-feedback-grid">
      ${row('S — Subjective', 'subjective')}
      ${row('O — Objective', 'objective')}
      ${row('A — Assessment', 'assessment')}
      ${row('P — Plan', 'plan')}
      ${missed ? `<div class="soap-missed"><b>⚠️ DRPs còn bỏ sót:</b><ul>${missed}</ul></div>` : ''}
      ${strengths ? `<div class="soap-strengths"><b>✅ Điểm tốt:</b><ul>${strengths}</ul></div>` : ''}
      ${p.overallComment ? `<div class="soap-overall"><i>${escapeHtml(p.overallComment)}</i></div>` : ''}
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// PATIENT TURN  (multi-turn dialog)
// ─────────────────────────────────────────────────────────────

async function handlePatientTurn({ caseId, persona, history = [], studentMessage }) {
  if (!caseId || !studentMessage) throw new Error('caseId and studentMessage are required');

  const { getCase } = await import('../public/js/engine/case-db.js');
  const clinicalCase = getCase(caseId);
  if (!clinicalCase) throw new Error(`Case not found: ${caseId}`);

  const SYSTEM = `Bạn đang đóng vai BỆNH NHÂN trong tình huống lâm sàng dưới đây.
Sinh viên Dược năm 5 đang phỏng vấn bạn để khai thác thông tin và tư vấn dùng thuốc.

QUY TẮC:
1. Trả lời ĐÚNG vai bệnh nhân — KHÔNG xưng là AI.
2. Nói tự nhiên như người Việt bình dân (không dùng thuật ngữ y khoa nâng cao).
3. Tiết lộ thông tin DẦN, chỉ khi SV hỏi đúng (đừng khai hết một lúc).
4. Hỏi mơ hồ → trả lời mơ hồ. Hỏi cụ thể → trả lời cụ thể.
5. Có thể bộc lộ cảm xúc: lo, mệt, sốt ruột.
6. KHÔNG tự chẩn đoán y khoa hay đọc tên thuốc tiếng Anh đầy đủ.
7. Mỗi lượt: 1–3 câu, không quá dài.

NHÂN VẬT: ${persona || `${clinicalCase.patient.initials}, ${clinicalCase.patient.ageYears} tuổi, ${clinicalCase.patient.sex === 'M' ? 'nam' : 'nữ'}`}

THÔNG TIN BẠN BIẾT (chỉ tiết lộ khi SV hỏi đúng):
- Lý do đến khám: ${clinicalCase.chiefComplaint}
- Tiền sử: ${(clinicalCase.patient.comorbidities || []).join(', ') || '—'}
- Thuốc đang dùng: ${(clinicalCase.patient.currentMeds || []).join(', ') || '—'}
- Bệnh sử chi tiết: ${clinicalCase.history}`;

  const messages = [
    { role: 'system', content: SYSTEM },
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: studentMessage },
  ];

  const reply = await ollamaChat({ messages, temperature: 0.7, maxTokens: 250 });
  return { reply, hidden: {} };
}

// ─────────────────────────────────────────────────────────────
// EVALUATE ROLEPLAY
// ─────────────────────────────────────────────────────────────

const ROLEPLAY_SYSTEM = `Bạn là giảng viên Dược lâm sàng. Đánh giá cuộc phỏng vấn + tư vấn của sinh viên với bệnh nhân (do AI đóng).
Mỗi tiêu chí cho điểm 0.0–1.0, kèm 1 câu comment ngắn.
CHỈ TRẢ JSON, không viết gì khác:
{
  "criteria": [ { "name": "...", "score": 0.0, "comment": "..." } ],
  "overall": "1–2 câu tổng kết"
}`;

async function handleEvaluateRoleplay({ caseId, transcript = [], rubricCriteria = [] }) {
  if (!caseId) throw new Error('caseId is required');
  const { getCase } = await import('../public/js/engine/case-db.js');
  const clinicalCase = getCase(caseId);
  if (!clinicalCase) throw new Error(`Case not found: ${caseId}`);

  const transcriptText = transcript.map(t => `${t.role === 'user' ? 'SV' : 'BN'}: ${t.content}`).join('\n');
  const rubricText = rubricCriteria.map(c => `- ${c}`).join('\n');

  const prompt = `<CA>
${clinicalCase.title}
</CA>

<TIÊU CHÍ ĐÁNH GIÁ>
${rubricText}
</TIÊU CHÍ ĐÁNH GIÁ>

<TRANSCRIPT>
${transcriptText}
</TRANSCRIPT>

Đánh giá theo các tiêu chí. CHỈ trả JSON.`;

  const raw = await ollamaGenerate({
    prompt, system: ROLEPLAY_SYSTEM, temperature: 0.2, json: true, maxTokens: 1000,
  });
  const parsed = safeParseJson(raw);
  return {
    criteria: parsed.criteria || rubricCriteria.map(c => ({ name: c, score: 0.5, comment: '—' })),
    overall: parsed.overall || '',
    transcript: transcriptText,
  };
}

// ─────────────────────────────────────────────────────────────
// TUTOR CHAT (GAP 1) — AI tutor đa lĩnh vực, tiếng Việt, multi-turn
// ─────────────────────────────────────────────────────────────

const DOMAIN_SYSTEM = {
  it: `Bạn là gia sư CNTT giàu kinh nghiệm cho sinh viên Việt Nam.
Bạn thông thạo: SQL, lập trình, thuật toán, cấu trúc dữ liệu, web, mật mã CTF.
Khi giải thích: ví dụ trực quan, pseudo-code tiếng Việt trước rồi mới đến cú pháp.
Đề xuất học sinh thử ngay trên SQL Playground / Code Lab / Web Playground / Cipher CTF có sẵn trong Tizia.`,
  pharmacy: `Bạn là gia sư Dược lâm sàng Việt Nam.
Khi tư vấn dùng thuốc, luôn nêu: liều thường dùng, đường dùng, chống chỉ định, tương tác, tác dụng phụ chính.
Tham chiếu được tới các lab có sẵn trong Tizia: chuẩn độ, sắc ký TLC, antibiogram, IV infusion, dilution, dispense, calibration curve, PK curve, pediatric dose, GMP factory.
Tránh lời khuyên y khoa cá nhân — nhắc người dùng tham vấn bác sĩ/dược sĩ.`,
  medical: `Bạn là gia sư Y khoa cho sinh viên Việt Nam.
Khi giải thích ca bệnh, dùng cấu trúc SOAP (Subjective/Objective/Assessment/Plan).
Khi nói triệu chứng, luôn cảnh báo dấu hiệu nguy hiểm cần đi khám ngay.
Tham chiếu được tới các module có sẵn: OSCE championship, ER triage, BP measurement, pediatric dose, IV infusion.`,
  school: `Bạn là gia sư phổ thông Việt Nam, dạy theo Chương trình GDPT 2018.
Bám sát kiến thức trong sách Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo.
Dùng ví dụ học sinh Việt quen thuộc (ăn phở, đi học bằng xe đạp, đá cầu sân trường).
Khi học sinh sai, hỏi gợi mở để các em tự nhận ra, đừng cho đáp án ngay.`,
  general: `Bạn là gia sư AI thân thiện trong Tizia — vũ trụ giáo dục Việt Nam.
Giải thích đơn giản, có ví dụ, không dùng thuật ngữ tiếng Anh khi tiếng Việt có sẵn.
Khích lệ tích cực, giọng văn ấm áp như anh/chị lớn.`,
};

// Socratic mode — không cho đáp án trực tiếp, chỉ hỏi gợi mở để HS tự nghĩ ra.
// Lấy cảm hứng từ Khanmigo (Khan Academy AI tutor).
const SOCRATIC_PROMPT = `
CHẾ ĐỘ SOCRATIC (BẮT BUỘC TUÂN THỦ):
- TUYỆT ĐỐI KHÔNG đưa đáp án/lời giải trực tiếp, ngay cả khi HS yêu cầu nhiều lần.
- Phương pháp: phân tích câu hỏi HS, rồi đặt 1-2 câu hỏi gợi mở để HS tự nhận ra hướng đi.
- Nếu HS sai, hỏi ngược: "Em đã thử nghĩ về ... chưa?" hoặc "Theo em, ... thì sao?"
- Chỉ khi HS đã rất gần đáp án (đã viết được công thức/bước cuối) thì mới xác nhận "Đúng rồi! Em vừa làm được X" rồi tóm gọn.
- Nếu HS bảo "cho đáp án đi", lịch sự từ chối + nói "thầy/cô tin em làm được" + đặt câu hỏi mới chia nhỏ vấn đề.
- Khen ngợi nỗ lực ("ý này hay đó!"), không khen kết quả khi chưa đúng.
- Mỗi lần trả lời TỐI ĐA 3 câu — ngắn, tập trung vào 1 câu hỏi gợi mở.
- Với câu hỏi tính toán đơn giản (vd "22×6"), vẫn KHÔNG cho đáp án — hỏi "Em ước lượng kết quả khoảng bao nhiêu trước? 20×6 thì sao?"
`;

async function handleTutorChat({ domain = 'general', grade, context, history = [], message, styleNote, mode = 'direct' }) {
  if (!message || typeof message !== 'string') {
    throw new Error('message is required');
  }
  const sys = DOMAIN_SYSTEM[domain] || DOMAIN_SYSTEM.general;
  const contextLine = context ? `Học sinh đang ở trang/lab: ${context}.` : '';
  const gradeLine = grade ? `Trình độ: lớp ${grade}.` : '';
  const styleLine = styleNote ? `Lưu ý phong cách: ${styleNote}` : '';
  const isSocratic = String(mode).toLowerCase() === 'socratic';
  const socraticLine = isSocratic ? SOCRATIC_PROMPT : '';

  const fullSystem = [sys, contextLine, gradeLine, styleLine, socraticLine].filter(Boolean).join('\n\n')
    + '\n\nLUẬT NGÔN NGỮ (TUYỆT ĐỐI):'
    + '\n- Người dùng hỏi bằng ngôn ngữ nào, trả lời bằng đúng ngôn ngữ đó (mặc định TIẾNG VIỆT).'
    + '\n- TUYỆT ĐỐI KHÔNG trả lời bằng tiếng Trung (中文), tiếng Nhật, tiếng Hàn, hay bất kỳ ngôn ngữ nào khác trừ khi người dùng yêu cầu rõ ràng.'
    + '\n- KHÔNG tự ý dịch câu hỏi của người dùng sang ngôn ngữ khác. Nếu họ viết "22*6 bằng mấy" thì trả lời thẳng bằng tiếng Việt (ví dụ: "22 × 6 = 132"), không lặp lại câu hỏi bằng ngôn ngữ khác.'
    + (isSocratic ? '' : '\n- Với câu hỏi tính toán/số học, trả lời trực tiếp kết quả + giải thích ngắn, KHÔNG diễn giải dài dòng.')
    + '\n\nLUẬT TRÌNH BÀY: '
    + (isSocratic
        ? 'Tối đa 3 câu, vào thẳng câu hỏi gợi mở. KHÔNG đáp án.'
        : 'ngắn gọn (3–6 câu cho câu hỏi thông thường, dài hơn nếu cần giải thuật/code). KHÔNG mở đầu bằng "Tất nhiên rồi!" hay "Tôi sẽ giúp bạn". Vào thẳng nội dung.');

  // Multi-turn — đưa history vào, sau đó message hiện tại
  const messages = [
    { role: 'system', content: fullSystem },
    ...((Array.isArray(history) ? history : []).slice(-12).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 2000),
    }))),
    { role: 'user', content: message.slice(0, 2000) },
  ];

  let reply = '';
  try {
    reply = await ollamaChat({ messages, temperature: 0.55, maxTokens: 600 });
  } catch (e) {
    console.warn('[ai-tutor] ollama failed, fallback template:', e?.message || e);
    reply = templateTutorReply(domain, message);
  }
  return { reply: reply.trim(), domain, mode: isSocratic ? 'socratic' : 'direct', model: currentAIModel(OLLAMA_MODEL) };
}

function templateTutorReply(domain, message) {
  const label = ({ it: 'CNTT', pharmacy: 'Dược', medical: 'Y khoa', school: 'phổ thông' }[domain]) || 'giáo dục';
  return `Mình tạm thời chưa kết nối được tới mô hình AI. Câu hỏi "${String(message).slice(0, 120)}" thuộc lĩnh vực ${label} — bạn thử lại sau ít phút, hoặc xem trực tiếp các lab tương ứng trong Tizia để thực hành nhé.`;
}

// ─────────────────────────────────────────────────────────────
// SIM PATIENT (GAP 10) — đối thoại 1 lượt với BN VN, chấm SOAP
// ─────────────────────────────────────────────────────────────

async function handleSimPatient({ caseId, persona, chiefComplaint, history = [], hiddenInfo = {}, message }) {
  if (!message) throw new Error('message required');
  const hiddenStr = Object.entries(hiddenInfo || {})
    .map(([trigger, info]) => `- Khi SV hỏi về "${trigger}": "${info}"`)
    .join('\n');
  const sys = `Bạn đang đóng vai BỆNH NHÂN/NGƯỜI NHÀ trong tình huống lâm sàng Việt Nam.
Sinh viên Y/Dược đang khai thác thông tin và tư vấn.

QUY TẮC TUYỆT ĐỐI:
1. Trả lời ĐÚNG vai bệnh nhân — KHÔNG xưng là AI, KHÔNG nói "với tư cách AI".
2. Nói tự nhiên như người Việt, dùng "em/cô/chú/bác" phù hợp tuổi và bối cảnh.
3. KHÔNG dùng thuật ngữ y khoa nâng cao (đừng nói "creatinin", "HbA1c" trừ khi đã được BS thông báo).
4. Tiết lộ thông tin DẦN, chỉ khi SV hỏi đúng. Hỏi mơ hồ → trả lời mơ hồ.
5. Có cảm xúc: lo lắng, mệt, sốt ruột tuỳ ca.
6. Mỗi lượt: 1-3 câu, tối đa ~50 từ. Không liệt kê hết bệnh sử trong 1 câu.

NHÂN VẬT VÀ TÍNH CÁCH:
${persona || '(chưa rõ — nói giọng VN bình dân)'}

LÝ DO ĐẾN KHÁM: ${chiefComplaint}

THÔNG TIN ẨN (chỉ tiết lộ khi SV hỏi đúng chủ đề):
${hiddenStr || '(không có thông tin ẩn riêng)'}`;

  const messages = [
    { role: 'system', content: sys },
    ...((Array.isArray(history) ? history : []).slice(-12).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 1500),
    }))),
    { role: 'user', content: message.slice(0, 1500) },
  ];
  let reply = '';
  try {
    reply = await ollamaChat({ messages, temperature: 0.7, maxTokens: 200 });
  } catch (e) {
    reply = `(BN không thể trả lời — lỗi AI: ${e?.message || e})`;
  }
  return { reply: reply.trim() };
}

// ─────────────────────────────────────────────────────────────
// SIM GRADE — chấm transcript theo rubric + DRP + fatalIf
// ─────────────────────────────────────────────────────────────

async function handleSimGrade({ caseId, title, rubric = [], drps = [], bonusIf = [], fatalIf = [], transcript = [] }) {
  // Bước 1: scan transcript để bắt fatal + bonus (deterministic, không cần AI)
  const svText = transcript
    .filter(t => t.role === 'user')
    .map(t => String(t.content || ''))
    .join(' \n ');

  const fatalsTriggered = [];
  for (const f of (fatalIf || [])) {
    try {
      if (new RegExp(f.trigger, 'i').test(svText)) {
        fatalsTriggered.push(f.reason);
      }
    } catch {}
  }
  const bonusHits = [];
  for (const b of (bonusIf || [])) {
    try {
      if (new RegExp(b.trigger, 'i').test(svText)) {
        bonusHits.push(b.text);
      }
    } catch {}
  }

  // Bước 2: gọi AI để chấm rubric + miss DRP
  const rubricText = rubric.map((r, i) => `${i+1}. ${r}`).join('\n');
  const drpText = drps.map(d => `- [${d.type}] ${d.text}`).join('\n');
  const transcriptText = transcript
    .map(t => (t.role === 'user' ? 'SV: ' : 'BN: ') + String(t.content || ''))
    .join('\n');

  const sys = `Bạn là giảng viên Y/Dược lâm sàng VN giàu kinh nghiệm.
Chấm cuộc phỏng vấn của sinh viên với bệnh nhân (do AI đóng).
CHỈ TRẢ JSON, không viết gì khác:
{
  "rubricScores": [ {"criterion": "...", "score": 0.0, "comment": "..."} ],
  "missedDRPs": ["..."],
  "overall": "1-2 câu nhận xét tổng kết",
  "overallScore": 0.0
}
Score 0.0-1.0 cho mỗi criterion. overallScore = trung bình rubricScores nhân hệ số penalty nếu có fatal.`;

  const prompt = `<CA>${title}</CA>

<RUBRIC>
${rubricText}
</RUBRIC>

<DRP CẦN BẮT>
${drpText}
</DRP CẦN BẮT>

<TRANSCRIPT>
${transcriptText}
</TRANSCRIPT>

Chấm. CHỈ JSON.`;

  let parsed = {};
  try {
    const raw = await ollamaGenerate({
      prompt, system: sys, temperature: 0.2, json: true, maxTokens: 1200,
    });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[sim-grade] AI failed:', e?.message);
  }

  let overallScore = parsed.overallScore;
  if (overallScore == null && Array.isArray(parsed.rubricScores)) {
    const sum = parsed.rubricScores.reduce((s, r) => s + (Number(r.score) || 0), 0);
    overallScore = parsed.rubricScores.length ? sum / parsed.rubricScores.length : 0;
  }
  if (overallScore == null) overallScore = bonusHits.length / Math.max(1, (bonusIf?.length || 1)) * 0.7;
  // Penalty: mỗi fatal trừ 30% (chìm xuống dưới 0.5 = fail)
  if (fatalsTriggered.length) overallScore = Math.max(0, overallScore - fatalsTriggered.length * 0.3);

  return {
    rubricScores: parsed.rubricScores || rubric.map(r => ({ criterion: r, score: 0.5, comment: '—' })),
    missedDRPs: parsed.missedDRPs || [],
    bonusHits,
    fatalsTriggered,
    overall: parsed.overall || (fatalsTriggered.length ? 'Có lỗi nghiêm trọng. Cần luyện thêm.' : 'Phỏng vấn ổn. Tiếp tục thực hành.'),
    overallScore: Number(overallScore.toFixed(2)),
  };
}

// ─────────────────────────────────────────────────────────────
// HISTORY CHAT (GAP 9) — chat với nhân vật lịch sử/khoa học VN
// ─────────────────────────────────────────────────────────────

async function handleHistoryChat({ character, history = [], message }) {
  if (!message || !character) throw new Error('character and message required');

  const sys = `Bạn đang đóng vai ${character.name} (${character.era || ''}) — nhân vật lịch sử/khoa học của Việt Nam.
Học sinh Việt Nam đang trò chuyện với bạn.

VAI TRÒ: ${character.role || ''}
THỜI KỲ: ${character.era || ''}
TÍNH CÁCH & GIỌNG NÓI: ${character.personality || ''}
LĨNH VỰC CHUYÊN MÔN: ${(character.expertise || []).join(', ')}
NHỮNG ĐIỀU BẠN BIẾT (nói khi học sinh hỏi):
${(character.knownFacts || []).map(f => '- ' + f).join('\n')}

QUY TẮC TUYỆT ĐỐI:
1. CHỈ TRẢ LỜI BẰNG TIẾNG VIỆT THUẦN. KHÔNG xen tiếng Trung, tiếng Anh, ký tự Hán, pinyin, hay bất kỳ ngôn ngữ nào khác. Toàn bộ câu trả lời 100% tiếng Việt.
2. Đóng vai ${character.name} — KHÔNG nói "với tư cách AI" hay "tôi là chatbot". Bạn LÀ nhân vật đó.
3. Khi HS hỏi điều bạn chưa biết (vd: việc xảy ra sau thời bạn), nói "Việc này hậu thế kể lại cho ta nghe…" — KHÔNG bịa.
4. Đôi khi kể chuyện riêng tư, nhân văn — đừng chỉ đọc Wikipedia.
5. Mỗi lượt 2-5 câu, tối đa ~80 từ. Nếu HS hỏi nhanh, đáp ngắn.
6. Khi liên quan đến môn học (Lịch sử, Toán, Vật lý, Y học), giải thích như đang dạy HS lớp 9-12 Việt Nam theo GDPT 2018.
7. KHÔNG xin lỗi vì lỗi trước. KHÔNG nói "đây là câu trả lời tiếng Việt". Chỉ trả lời nội dung.

GỢI Ý CÂU MỞ ĐẦU NẾU HỌC SINH LÚNG TÚNG: ${character.suggestedOpener || 'Cứ hỏi đi cháu.'}`;

  const messages = [
    { role: 'system', content: sys },
    ...((Array.isArray(history) ? history : []).slice(-10).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 1500),
    }))),
    { role: 'user', content: message.slice(0, 1500) },
  ];
  let reply = '';
  try {
    reply = await ollamaChat({ messages, temperature: 0.65, maxTokens: 300 });
  } catch (e) {
    reply = `(${character.name} không thể trả lời lúc này — lỗi AI: ${e?.message || e})`;
  }
  return { reply: cleanVietnameseReply(reply, character.name) };
}

/** Strip non-Vietnamese characters that some LLMs leak (Chinese chars, pinyin, English filler). */
function cleanVietnameseReply(s, charName) {
  let out = String(s || '').trim();
  // Cắt bỏ block chữ Hán (CJK) liên tiếp
  out = out.replace(/[一-鿿㐀-䶿]+/g, ' ');
  // Cắt câu xin lỗi vì lỗi trước (LLM hay xin lỗi rồi sửa)
  out = out.replace(/(?:對不起|不好意思|抱歉|sorry|excuse me|i'?m sorry|let me try again|let me retry|please)[^.!?\n]*[.!?\n]?/gi, ' ');
  // Cắt câu "Đây là câu trả lời bằng tiếng Việt" / "Dưới đây là phản hồi"
  out = out.replace(/(?:đây là câu trả lời[^\n.!?]*|dưới đây là phản hồi[^\n.!?]*|sau đây là [^\n.!?]*)[.!?\n]?/gi, ' ');
  // Chuẩn hoá khoảng trắng
  out = out.replace(/[ \t]+/g, ' ').replace(/\n[ \n]+/g, '\n').trim();
  // Nếu sau khi clean quá rỗng → fallback
  if (out.length < 8) {
    return `Cháu ơi, ta tạm chưa rõ ý cháu. Cháu hỏi lại đi nhé?`;
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// NEGOTIATION (GAP 15) — game theory simulator
// ─────────────────────────────────────────────────────────────

async function handleNegotiate({ scenario, persona, role, stage, history = [], message }) {
  if (!message || !persona) throw new Error('persona and message required');

  const sys = `Bạn đang đóng vai NPC trong tình huống đàm phán giáo dục.

KỊCH BẢN: ${scenario || ''}
VAI TRÒ NPC CỦA BẠN: ${role || ''}
TÍNH CÁCH NPC: ${persona}
GIAI ĐOẠN ĐÀM PHÁN HIỆN TẠI: ${stage || 'opening'}

NGUYÊN TẮC ĐÀM PHÁN (game theory):
- Phản ứng theo lựa chọn của learner: hợp tác → mở lòng, đối đầu → phòng thủ.
- Cân nhắc trade-off riêng (ngân sách, thời gian, mục tiêu cá nhân).
- KHÔNG đồng ý quá dễ. KHÔNG từ chối thô bạo.
- Khi learner đưa ra điểm thuyết phục, có thể nhượng bộ một phần.
- Mỗi lượt 2-4 câu, có thể đặt câu hỏi ngược.
- Tiếng Việt tự nhiên, đúng văn hoá công sở/lâm sàng VN.

KHI LEARNER ĐI SAI HƯỚNG (vd: hứa hẹn quá đà, kê đơn không phù hợp), KHÔNG nhắc nhở rằng họ sai — cứ phản ứng theo nhân vật. Việc chấm điểm là của giảng viên ở vòng sau.`;

  const messages = [
    { role: 'system', content: sys },
    ...((Array.isArray(history) ? history : []).slice(-10).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 1500),
    }))),
    { role: 'user', content: message.slice(0, 1500) },
  ];
  let reply = '';
  try {
    reply = await ollamaChat({ messages, temperature: 0.7, maxTokens: 250 });
  } catch (e) {
    reply = `(NPC không thể trả lời — ${e?.message || e})`;
  }
  return { reply: reply.trim() };
}

async function handleNegotiateGrade({ scenario, title, rubric = [], bonusIf = [], fatalIf = [], transcript = [] }) {
  // Reuse pattern handleSimGrade
  const svText = transcript
    .filter(t => t.role === 'user')
    .map(t => String(t.content || ''))
    .join(' \n ');

  const fatalsTriggered = [];
  for (const f of (fatalIf || [])) {
    try {
      if (new RegExp(f.trigger, 'i').test(svText)) fatalsTriggered.push(f.reason);
    } catch {}
  }
  const bonusHits = [];
  for (const b of (bonusIf || [])) {
    try {
      if (new RegExp(b.trigger, 'i').test(svText)) bonusHits.push(b.text);
    } catch {}
  }

  const rubricText = rubric.map((r, i) => `${i+1}. ${r}`).join('\n');
  const transcriptText = transcript
    .map(t => (t.role === 'user' ? 'NGƯỜI HỌC: ' : 'NPC: ') + String(t.content || ''))
    .join('\n');

  const sys = `Bạn là giảng viên kỹ năng mềm VN, chấm cuộc đàm phán của người học với NPC.
CHỈ TRẢ JSON:
{
  "rubricScores": [{"criterion":"...","score":0.0,"comment":"..."}],
  "overall": "1-2 câu nhận xét",
  "overallScore": 0.0,
  "soft_skills": {"empathy":0.0,"clarity":0.0,"persuasion":0.0,"professionalism":0.0}
}`;
  const prompt = `<KỊCH BẢN>${title}</KỊCH BẢN>

<RUBRIC>
${rubricText}
</RUBRIC>

<TRANSCRIPT>
${transcriptText}
</TRANSCRIPT>

Chấm. CHỈ JSON.`;

  let parsed = {};
  try {
    const raw = await ollamaGenerate({ prompt, system: sys, temperature: 0.2, json: true, maxTokens: 1000 });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[neg-grade] AI failed:', e?.message);
  }
  let overallScore = parsed.overallScore;
  if (overallScore == null && Array.isArray(parsed.rubricScores)) {
    const sum = parsed.rubricScores.reduce((s, r) => s + (Number(r.score) || 0), 0);
    overallScore = parsed.rubricScores.length ? sum / parsed.rubricScores.length : 0.5;
  }
  if (overallScore == null) overallScore = 0.5;
  if (fatalsTriggered.length) overallScore = Math.max(0, overallScore - fatalsTriggered.length * 0.25);

  return {
    rubricScores: parsed.rubricScores || rubric.map(r => ({ criterion: r, score: 0.5, comment: '—' })),
    softSkills: parsed.soft_skills || parsed.softSkills || {},
    bonusHits,
    fatalsTriggered,
    overall: parsed.overall || (fatalsTriggered.length ? 'Có lỗi nghiêm trọng.' : 'Đàm phán ổn.'),
    overallScore: Number(overallScore.toFixed(2)),
  };
}

// ─────────────────────────────────────────────────────────────
// PDF EXPLAIN (GAP 2) — AI tutor giải thích nội dung 1 trang SGK
// ─────────────────────────────────────────────────────────────

const PDF_SUBJECT_HINTS = {
  toan: 'Toán — chú trọng giải thích từng bước, có ví dụ số cụ thể.',
  vat_ly: 'Vật lý — gắn với hiện tượng thực tế, công thức có ý nghĩa từng đại lượng.',
  hoa: 'Hoá học — gắn phương trình với điều kiện thực nghiệm, an toàn lab.',
  sinh: 'Sinh học — chú trọng cơ chế + ví dụ động thực vật Việt Nam.',
  ngu_van: 'Ngữ văn — phân tích biện pháp tu từ, bối cảnh tác giả, liên hệ giá trị nhân văn.',
  lich_su: 'Lịch sử — ngữ cảnh sự kiện, nguyên nhân-diễn biến-ý nghĩa, không học vẹt.',
  dia: 'Địa lí — số liệu cụ thể vùng VN, không bịa.',
  tin_hoc: 'Tin học — kèm ví dụ code chạy được, gắn với SQL Playground / Code Lab của Tizia.',
  tieng_anh: 'Tiếng Anh — giải thích NGỮ PHÁP bằng tiếng Việt, ví dụ bằng tiếng Anh.',
  gdcd: 'GDCD — bám điều luật cụ thể, ví dụ tình huống học sinh.',
  cong_nghe: 'Công nghệ — gắn với sản phẩm/ứng dụng thực tế.',
};

const PDF_BOOK_SERIES = {
  canh_dieu:        'Bộ sách Cánh Diều — bám sát tinh thần học qua trải nghiệm, hoạt động.',
  ket_noi:          'Bộ sách Kết Nối Tri Thức với cuộc sống — chú trọng liên hệ thực tiễn VN.',
  chan_troi:        'Bộ sách Chân Trời Sáng Tạo — nhấn mạnh sáng tạo, mở rộng.',
};

async function handlePdfExplain({ grade, subject, bookSeries, pageNumber, pageText, mode = 'explain', focusText }) {
  if (!pageText || typeof pageText !== 'string') {
    throw new Error('pageText required');
  }
  const txt = pageText.slice(0, 6000);

  const subjectHint = PDF_SUBJECT_HINTS[subject] || PDF_SUBJECT_HINTS['toan'];
  const bookHint = PDF_BOOK_SERIES[bookSeries] || '';
  const gradeStr = grade ? `lớp ${grade}` : 'phổ thông';

  // 4 mode: explain (giải thích chung) | summary (tóm tắt 5 ý) | example (cho ví dụ) | quiz (4 câu hỏi nhanh)
  const modePrompt = {
    explain: 'GIẢI THÍCH nội dung trang này như đang giảng cho học sinh ngồi trước mặt. 4-7 câu, có ví dụ.',
    summary: 'TÓM TẮT trang này thành 5 ý chính, mỗi ý 1 câu. Dùng dạng gạch đầu dòng.',
    example: 'Cho 2 VÍ DỤ áp dụng kiến thức trang này vào tình huống thực tế Việt Nam.',
    deeper: 'GIẢI THÍCH SÂU phần nội dung học sinh đang focus, có thể đi vào chứng minh/cơ chế.',
    vocab: 'Liệt kê 3-5 THUẬT NGỮ mới trong trang + định nghĩa ngắn gọn.',
  }[mode] || 'Giải thích nội dung trang này.';

  const focusLine = focusText ? `\nHỌC SINH ĐANG TẬP TRUNG VÀO ĐOẠN: "${focusText.slice(0, 400)}"` : '';

  const sys = `Bạn là gia sư AI cho học sinh Việt Nam, dạy theo Chương trình GDPT 2018.
TRÌNH ĐỘ: ${gradeStr}
MÔN: ${subjectHint}
${bookHint ? 'BỘ SÁCH: ' + bookHint : ''}

QUY TẮC:
1. CHỈ trả lời TIẾNG VIỆT thuần, không xen tiếng Anh/Trung trừ khi là thuật ngữ chuyên môn không có từ Việt.
2. Đừng nói "Tất nhiên rồi", "Tôi sẽ giải thích cho bạn" — vào thẳng nội dung.
3. Bám SÁT nội dung trang được cung cấp, KHÔNG bịa thêm sự kiện/công thức không có.
4. Nếu nội dung trang quá ngắn/thiếu ngữ cảnh, nói "Trang này hơi ngắn, em cho thầy xem thêm trang trước/sau nhé".
5. Tùy môn:
   - Toán/Lý/Hoá: dùng ký hiệu rõ ràng, tránh LaTeX phức tạp (HS đọc trên web).
   - Văn/Sử/Địa: kể chuyện, có liên hệ.
   - Tin học: kèm 1 đoạn code ngắn nếu phù hợp.`;

  const prompt = `<TRANG ${pageNumber || '?'}>
${txt}
</TRANG>
${focusLine}

NHIỆM VỤ: ${modePrompt}`;

  let reply = '';
  try {
    reply = await ollamaGenerate({
      prompt, system: sys, temperature: 0.4, maxTokens: 800,
    });
  } catch (e) {
    reply = `Xin lỗi em, AI tutor tạm thời không phản hồi (${e?.message || e}). Em thử lại sau ít phút nhé.`;
  }
  return { reply: reply.trim(), mode, pageNumber };
}

async function handlePdfQuiz({ grade, subject, pageNumber, pageText, numQuestions = 4 }) {
  if (!pageText || typeof pageText !== 'string') throw new Error('pageText required');
  const txt = pageText.slice(0, 6000);
  const n = Math.max(2, Math.min(8, Number(numQuestions) || 4));

  const sys = `Bạn là gia sư AI dạy theo GDPT 2018.
Soạn ${n} câu hỏi trắc nghiệm BÁM SÁT nội dung trang SGK được cung cấp.
CHỈ TRẢ JSON, KHÔNG viết gì khác:
{
  "questions": [
    {
      "stem": "câu hỏi",
      "options": ["A...", "B...", "C...", "D..."],
      "correct": 0,
      "explain": "giải thích đáp án"
    }
  ]
}`;
  const prompt = `<TRANG ${pageNumber || '?'} — Môn ${subject || 'chung'}, lớp ${grade || '?'}>
${txt}
</TRANG>

Soạn ${n} câu hỏi. CHỈ JSON.`;

  let parsed = {};
  try {
    const raw = await ollamaGenerate({
      prompt, system: sys, temperature: 0.3, json: true, maxTokens: 1200,
    });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[pdf-quiz] failed:', e?.message);
  }
  return {
    questions: Array.isArray(parsed.questions) ? parsed.questions.slice(0, n) : [],
    pageNumber,
  };
}

// ─────────────────────────────────────────────────────────────
// GRADE SENTENCE (req #32) — chấm 1 câu tiếng Anh SV đặt với từ vựng cho trước
// Dùng cho phần "Luyện Viết" trong Từ vựng Tiếng Anh chuyên ngành.
// ─────────────────────────────────────────────────────────────

const SENTENCE_SYSTEM = `Bạn là giáo viên tiếng Anh chuyên ngành cho sinh viên Việt Nam.
Nhiệm vụ: chấm MỘT câu tiếng Anh do sinh viên tự đặt, BẮT BUỘC phải dùng từ vựng cho trước.

QUY TẮC CHẤM:
1. usesWord = true nếu câu có dùng đúng từ cho trước (chấp nhận biến thể: số nhiều, thì, V-ing, V-ed).
2. Đánh giá NGỮ PHÁP, CHÍNH TẢ và việc từ có được dùng ĐÚNG NGHĨA/ngữ cảnh không.
3. correct = true CHỈ KHI usesWord=true VÀ ngữ pháp ổn VÀ dùng từ hợp nghĩa.
4. score 0–100: trừ điểm cho lỗi ngữ pháp, dùng sai nghĩa, hoặc không dùng từ.
5. feedback: nhận xét NGẮN bằng TIẾNG VIỆT (1–2 câu), khen điểm tốt + chỉ lỗi cụ thể.
6. corrected: câu đã sửa lại đúng (giữ nguyên nếu câu đã đúng).
7. CHỈ trả JSON, không viết gì thêm.

Format JSON BẮT BUỘC:
{
  "usesWord": true,
  "correct": true,
  "score": 0,
  "feedback": "...",
  "corrected": "...",
  "betterExample": "một câu ví dụ hay khác có dùng từ này"
}`;

async function handleGradeSentence({ word, meaning = '', pos = '', sentence }) {
  if (!word || !sentence) throw new Error('word and sentence are required');
  const w = String(word).trim().slice(0, 60);
  const sent = String(sentence).trim().slice(0, 400);

  // Heuristic dùng cho fallback + để đưa tín hiệu vào prompt.
  const usesWordLocal = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(sent);

  const prompt = `<TỪ VỰNG>
- Từ: ${w}${pos ? ' (' + pos + ')' : ''}
- Nghĩa: ${meaning || '(không cung cấp)'}
</TỪ VỰNG>

<CÂU CỦA SINH VIÊN>
${sent}
</CÂU CỦA SINH VIÊN>

Chấm câu trên theo rubric. CHỈ trả JSON.`;

  let parsed = null;
  try {
    const raw = await ollamaGenerate({
      prompt, system: SENTENCE_SYSTEM, temperature: 0.2, json: true, maxTokens: 400,
    });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[grade-sentence] AI failed, dùng heuristic:', e?.message || e);
  }

  // Fallback heuristic khi AI lỗi/timeout — vẫn cho phản hồi cơ bản, không chặn SV.
  if (!parsed || typeof parsed !== 'object' || parsed.score == null) {
    const words = sent.split(/\s+/).filter(Boolean);
    const startsUpper = /^[A-Z]/.test(sent);
    const endsPunct = /[.!?]$/.test(sent);
    const longEnough = words.length >= 4;
    const ok = usesWordLocal && longEnough;
    const tips = [];
    if (!usesWordLocal) tips.push(`câu chưa dùng từ «${w}»`);
    if (!longEnough) tips.push('câu hơi ngắn, hãy viết đủ ý');
    if (!startsUpper) tips.push('nên viết hoa chữ đầu câu');
    if (!endsPunct) tips.push('nên có dấu chấm câu cuối');
    return {
      usesWord: usesWordLocal,
      correct: ok,
      score: ok ? 70 : (usesWordLocal ? 50 : 20),
      feedback: (ok ? '✅ Câu của bạn dùng đúng từ vựng. ' : '')
        + (tips.length ? 'Gợi ý: ' + tips.join('; ') + '.' : 'Tiếp tục luyện thêm nhé!')
        + ' (AI chấm chi tiết tạm offline — đây là kiểm tra cơ bản.)',
      corrected: sent,
      betterExample: '',
      source: 'heuristic',
    };
  }

  return {
    usesWord: parsed.usesWord ?? usesWordLocal,
    correct: !!parsed.correct,
    score: Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0))),
    feedback: String(parsed.feedback || '').slice(0, 600),
    corrected: String(parsed.corrected || sent).slice(0, 400),
    betterExample: String(parsed.betterExample || '').slice(0, 300),
    source: 'ai',
  };
}

// ─────────────────────────────────────────────────────────────
// EXTRACT VOCAB (req #31) — bóc tách từ vựng chuyên ngành từ văn bản
// (SV tải file Word/.txt lên → client trích text → gửi vào đây).
// AI lọc ra các thuật ngữ tiếng Anh đáng học, dịch nghĩa + IPA + ví dụ,
// và XẾP mỗi từ vào MỘT chủ đề chuyên ngành CÓ SẴN do client gửi lên.
// ─────────────────────────────────────────────────────────────

async function handleExtractVocab({ text, topics, max = 30 }) {
  if (!text || typeof text !== 'string') throw new Error('text required');
  const txt = text.replace(/\s+/g, ' ').trim().slice(0, 8000);
  if (txt.length < 3) return { words: [] };
  const n = Math.max(5, Math.min(40, Number(max) || 30));

  // Danh sách chủ đề có sẵn (key + nhãn). Mặc định = 4 chuyên ngành gốc.
  const topicList = (Array.isArray(topics) && topics.length ? topics : [
    { key: 'cntt', label: 'Công nghệ thông tin' },
    { key: 'yte', label: 'Y tế' },
    { key: 'giaoduc', label: 'Giáo dục' },
    { key: 'business', label: 'Kinh doanh' },
  ]).filter(t => t && t.key).slice(0, 16);
  const keys = topicList.map(t => String(t.key));
  const topicLines = topicList.map(t => `- ${t.key}: ${t.label}`).join('\n');

  const sys = `Bạn là giáo viên tiếng Anh chuyên ngành cho sinh viên Việt Nam.
Nhiệm vụ: từ đoạn văn bản được cung cấp, TRÍCH ra các TỪ/CỤM TỪ tiếng Anh CHUYÊN NGÀNH đáng học (ưu tiên thuật ngữ, danh từ/động từ chuyên môn). BỎ QUA các từ quá thông dụng (the, and, is, people…), tên riêng, số.

Với MỖI từ trích được, trả về:
- en: từ/cụm tiếng Anh (viết thường, dạng nguyên gốc)
- vi: nghĩa tiếng Việt ngắn gọn, chính xác
- pos: loại từ (noun/verb/adj/adv)
- ipa: phiên âm IPA (nếu không chắc, để chuỗi rỗng)
- ex: MỘT câu ví dụ tiếng Anh ngắn dùng từ đó
- topic: XẾP từ vào ĐÚNG MỘT trong các key chủ đề dưới đây; nếu không hợp chủ đề nào thì để "khac".

CÁC CHỦ ĐỀ CÓ SẴN:
${topicLines}

QUY TẮC: tối đa ${n} từ, KHÔNG trùng lặp, KHÔNG bịa từ không có trong văn bản. CHỈ trả JSON, không viết gì khác.
Format BẮT BUỘC:
{ "words": [ { "en": "...", "vi": "...", "pos": "noun", "ipa": "...", "ex": "...", "topic": "cntt" } ] }`;

  const prompt = `<VĂN BẢN>
${txt}
</VĂN BẢN>

Trích tối đa ${n} từ vựng chuyên ngành. CHỈ JSON.`;

  let parsed = {};
  try {
    const raw = await ollamaGenerate({
      prompt, system: sys, temperature: 0.2, json: true, maxTokens: 2200,
    });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[extract-vocab] AI failed:', e?.message || e);
  }

  const allow = new Set([...keys, 'khac']);
  const seen = new Set();
  const words = (Array.isArray(parsed.words) ? parsed.words : [])
    .map(w => {
      const en = String(w?.en || '').trim().toLowerCase().slice(0, 60);
      const vi = String(w?.vi || '').trim().slice(0, 120);
      if (!en || !vi || !/[a-z]/.test(en)) return null;
      let topic = String(w?.topic || 'khac').trim();
      if (!allow.has(topic)) topic = 'khac';
      let pos = String(w?.pos || 'noun').trim().toLowerCase();
      if (!['noun', 'verb', 'adj', 'adv'].includes(pos)) pos = 'noun';
      return {
        en, vi, pos, topic,
        ipa: String(w?.ipa || '').trim().slice(0, 60),
        ex: String(w?.ex || '').trim().slice(0, 200),
      };
    })
    .filter(Boolean)
    .filter(w => { if (seen.has(w.en)) return false; seen.add(w.en); return true; })
    .slice(0, n);

  return { words, source: words.length ? 'ai' : 'empty' };
}

// ─────────────────────────────────────────────────────────────
// BAN ĐIỀU HÀNH AI — tiếp nhận & phản hồi yêu cầu của SV
// ─────────────────────────────────────────────────────────────

const REQ_TYPE_VN = {
  game:   'thêm trò chơi',
  theory: 'thêm học liệu lý thuyết',
  lab:    'cải thiện phòng thí nghiệm / thực hành',
  skill:  'thêm bài luyện kỹ năng',
  other:  'ý kiến đóng góp',
};

/** Câu trả lời mẫu khi Ollama không kết nối được — vẫn giữ trải nghiệm "AI điều hành". */
function templateNote({ type, title }) {
  const kind = REQ_TYPE_VN[type] || 'đề xuất';
  return `Ban điều hành AI đã tiếp nhận đề xuất "${title}" (${kind}). `
    + `Yêu cầu được đưa vào hàng đợi cải tiến — các đề xuất nhiều lượt ủng hộ sẽ được ưu tiên triển khai trong đợt cập nhật tới.`;
}

/**
 * AI "Hiệu trưởng" xem xét 1 yêu cầu, sinh phản hồi ngắn + trạng thái.
 * Best-effort: nếu Ollama lỗi/timeout → dùng câu trả lời mẫu.
 * @returns {Promise<{ note:string, status:string, source:'ai'|'template' }>}
 */
export async function aiReviewRequest({ domain, type, title, detail }) {
  const fallback = { note: templateNote({ type, title }), status: 'reviewing', source: 'template' };
  const system = `Bạn là HIỆU TRƯỞNG AI của một trường trong vũ trụ giáo dục Tizia — `
    + `nơi cơ sở giáo dục do AI điều hành, cung cấp học liệu và môi trường học tập, liên tục tự cải tiến theo góp ý của sinh viên. `
    + `Giọng văn: thân thiện, chuyên nghiệp, khích lệ. Tiếng Việt.`;
  const prompt = `Sinh viên gửi yêu cầu cải tiến tới trường "${domain}":
- Loại: ${REQ_TYPE_VN[type] || type}
- Tiêu đề: ${title}
- Chi tiết: ${detail || '(không có)'}

Hãy viết phản hồi NGẮN (1–2 câu, tối đa ~60 từ): xác nhận đã tiếp nhận, nêu hướng xử lý/dự kiến hợp lý. KHÔNG hứa hẹn quá mức, KHÔNG bịa thời hạn cụ thể. Chỉ trả về nội dung phản hồi, không mở đầu thừa.`;
  try {
    const note = await Promise.race([
      ollamaGenerate({ prompt, system, temperature: 0.5, maxTokens: 160 }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('triage timeout')), 12000)),
    ]);
    const clean = String(note || '').trim();
    if (!clean) return fallback;
    return { note: clean.slice(0, 500), status: 'reviewing', source: 'ai' };
  } catch (e) {
    console.warn('[board-ai] triage fallback:', e?.message || e);
    return fallback;
  }
}

// ─────────────────────────────────────────────────────────────
// PRACTICE MORE — "Học thêm" vô hạn cho 1 tuần học (Tiểu học)
// Sinh thêm câu hỏi trắc nghiệm bám chủ đề tuần, KHÁC các câu đã có.
// ─────────────────────────────────────────────────────────────

const GRADE_LEVEL_VN = {
  2: 'học sinh lớp 2 (7-8 tuổi) — câu chữ thật đơn giản, số nhỏ, ví dụ gần gũi (kẹo, bút, con vật, gia đình)',
};

async function handlePracticeMore({ grade = 2, subjectLabel = '', topic = '', sampleStems = [], numQuestions = 5, weekId = '' }, req) {
  if (!topic) throw new Error('topic required');
  const n = Math.max(3, Math.min(8, Number(numQuestions) || 5));
  const levelHint = GRADE_LEVEL_VN[grade] || `học sinh lớp ${grade}`;
  // Tránh trùng: gộp stem mẫu (quiz lõi) + stem AI đã tích luỹ trong kho của tuần này.
  const bankStems = weekId ? getAiQuestions(weekId, 40).map(q => q.stem) : [];
  const avoidList = [...(Array.isArray(sampleStems) ? sampleStems : []), ...bankStems];
  const avoid = avoidList.slice(0, 16).map(s => `- ${s}`).join('\n');

  const sys = `Bạn là giáo viên Tiểu học Việt Nam, dạy theo Chương trình GDPT 2018.
Soạn ${n} câu hỏi trắc nghiệm MỚI cho ${levelHint}.
Môn: ${subjectLabel}. Chủ đề tuần: "${topic}".

QUY TẮC:
1. Câu hỏi vừa sức lớp ${grade}, vui, gần gũi đời sống Việt Nam.
2. Mỗi câu đúng 4 lựa chọn, chỉ 1 đáp án đúng.
3. KHÔNG lặp lại các câu mẫu đã có (xem danh sách tránh).
4. Lời giải thích ngắn gọn, dễ hiểu, khích lệ.
5. ĐA DẠNG: ${n} câu phải KHÁC NHAU hoàn toàn — khác số liệu, khác tình huống,
   khác phép tính. TUYỆT ĐỐI không ra 2 câu cùng một phép tính/đáp án.
6. ĐỘ CHÍNH XÁC LÀ TỐI QUAN TRỌNG: TỰ TÍNH LẠI mỗi câu trước khi chọn đáp án.
   - "answer" là CHỈ SỐ (0,1,2,3) của lựa chọn ĐÚNG trong mảng "choices".
   - Kiểm tra: choices[answer] PHẢI là kết quả đúng. Phép tính trong "explanation"
     PHẢI khớp với choices[answer]. Nếu lệch, sửa lại answer cho khớp.
   - KHÔNG đánh số thứ tự (A. B. C.) vào trong choices — chỉ ghi nội dung đáp án.
7. CHỈ TRẢ JSON, không viết gì khác.

Format JSON BẮT BUỘC:
{
  "questions": [
    { "stem": "câu hỏi", "choices": ["12", "15", "18", "20"], "answer": 1, "explanation": "giải thích ngắn, khớp choices[answer]" }
  ]
}`;

  const prompt = `CHỦ ĐỀ: ${topic}
${avoid ? `\nCÁC CÂU ĐÃ CÓ (TRÁNH LẶP LẠI):\n${avoid}` : ''}

Soạn ${n} câu hỏi MỚI. CHỈ JSON.`;

  let parsed = {};
  try {
    // temp thấp (0.4) → ưu tiên độ chính xác đáp án hơn sáng tạo; đề tiểu học
    // cần answer key đúng tuyệt đối (model 14b dễ sai số học ở temp cao).
    const raw = await ollamaGenerate({ prompt, system: sys, temperature: 0.4, json: true, maxTokens: 1300 });
    parsed = safeParseJson(raw);
  } catch (e) {
    console.warn('[practice-more] AI failed:', e?.message);
    return { questions: [], error: String(e?.message || e) };
  }
  // Validate + làm sạch: bỏ tiền tố "A. "/"B) " model đôi khi tự chèn,
  // chỉ giữ câu đúng cấu trúc + answer hợp lệ.
  const stripPrefix = s => String(s).replace(/^\s*[A-Da-d][.)\]]\s+/, '').trim();
  // Tự sửa answer index: model 14b đôi khi tính ĐÚNG trong "explanation" nhưng
  // trỏ SAI index. Lấy con số kết quả cuối cùng trong lời giải; nếu khớp DUY NHẤT
  // một lựa chọn → chỉnh answer cho khớp (an toàn nhờ ràng buộc khớp tuyệt đối + duy nhất).
  const reconcile = (choices, answer, explanation) => {
    const nums = String(explanation).match(/-?\d+(?:[.,]\d+)?/g);
    if (!nums) return answer;
    const last = nums[nums.length - 1].replace(',', '.');
    const norm = c => String(c).replace(/\s/g, '').replace(',', '.');
    const hits = choices.map((c, i) => norm(c) === last ? i : -1).filter(i => i >= 0);
    return hits.length === 1 ? hits[0] : answer;  // chỉ sửa khi khớp duy nhất
  };
  const questions = (Array.isArray(parsed.questions) ? parsed.questions : [])
    .filter(q => q && typeof q.stem === 'string'
      && Array.isArray(q.choices) && q.choices.length === 4
      && Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3)
    .map(q => {
      const choices = q.choices.map(stripPrefix);
      return {
        stem: String(q.stem),
        choices,
        answer: reconcile(choices, q.answer, q.explanation || ''),
        explanation: String(q.explanation || ''),
      };
    })
    .slice(0, n);

  // Lưu vào kho để bài học giàu dần + tái sử dụng. Best-effort, không chặn response.
  let saved = 0;
  if (weekId && questions.length) {
    try {
      ({ saved } = saveAiQuestions({
        week_id: weekId, subject: subjectLabel, topic,
        student: req?.user?.display_name || null, questions,
      }));
    } catch (e) { console.warn('[practice-more] save failed:', e?.message); }
  }
  return { questions, topic, saved, model: currentAIModel(OLLAMA_MODEL) };
}

// ─────────────────────────────────────────────────────────────
// LESSON COACH — "Hỏi gia sư" cho 1 tuần học (giảng lại theo cách khác)
// ─────────────────────────────────────────────────────────────

async function handleLessonCoach({ grade = 2, subjectLabel = '', topic = '', theory = '', history = [], message, weekId = '' }, req) {
  if (!message) throw new Error('message required');
  const levelHint = GRADE_LEVEL_VN[grade] || `học sinh lớp ${grade}`;
  const sys = `Bạn là thầy/cô giáo Tiểu học Việt Nam thân thiện, đang kèm riêng cho ${levelHint}.
Môn: ${subjectLabel}. Bài tuần này: "${topic}".
${theory ? `\nNỘI DUNG BÀI HỌC TUẦN NÀY:\n${String(theory).slice(0, 2000)}` : ''}

QUY TẮC:
1. Trả lời TIẾNG VIỆT, câu ngắn, từ đơn giản, ấm áp như cô giáo nói với em nhỏ.
2. Khi em chưa hiểu, giảng lại bằng VÍ DỤ KHÁC, gần gũi (kẹo, bút, con vật, đồ chơi).
3. Khích lệ ("Giỏi lắm!", "Em thử lại nhé!"). KHÔNG chê bai.
4. Không dùng thuật ngữ khó. Mỗi lượt 2-5 câu.
5. Nếu em hỏi lạc đề, nhẹ nhàng kéo về bài tuần này.`;

  const messages = [
    { role: 'system', content: sys },
    ...((Array.isArray(history) ? history : []).slice(-10).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 1200),
    }))),
    { role: 'user', content: String(message).slice(0, 1200) },
  ];
  let reply = '';
  let ok = false;
  try {
    reply = await ollamaChat({ messages, temperature: 0.6, maxTokens: 400 });
    ok = !!reply.trim();
  } catch (e) {
    reply = `Cô tạm thời chưa kết nối được, em thử lại sau ít phút nhé! (${e?.message || e})`;
  }
  reply = reply.trim();

  // Lưu cặp hỏi-đáp vào kho (chỉ khi AI trả lời thành công) để bài học giàu dần.
  let saved = 0;
  if (ok && weekId) {
    try {
      ({ saved } = saveAiQa({
        week_id: weekId, subject: subjectLabel, topic,
        student: req?.user?.display_name || null,
        question: message, answer: reply,
      }));
    } catch (e) { console.warn('[lesson-coach] save failed:', e?.message); }
  }
  return { reply, saved, model: currentAIModel(OLLAMA_MODEL) };
}

// ─────────────────────────────────────────────────────────────
// LESSON BANK — đọc kho học liệu AI đã tích luỹ của 1 tuần (không gọi AI)
// ─────────────────────────────────────────────────────────────

async function handleLessonBank(_body, req) {
  const weekId = String(req?.query?.weekId || '').trim();
  if (!weekId) throw new Error('weekId required');
  const counts = getAiContentCounts(weekId);
  return {
    weekId,
    counts,
    questions: getAiQuestions(weekId, 50),  // để luyện lại không cần gọi Ollama
    qa: getAiQa(weekId, 30),                // hỏi-đáp đã có để ôn lại
  };
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function safeParseJson(text) {
  // Khi format=json, Ollama trả về JSON pure. Nhưng phòng trường hợp model
  // thêm ```json``` hay text trước/sau, vẫn parse được.
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = m ? m[1] : text;
  try { return JSON.parse(raw); }
  catch {
    const i = raw.indexOf('{');
    const j = raw.lastIndexOf('}');
    if (i >= 0 && j > i) {
      try { return JSON.parse(raw.slice(i, j + 1)); } catch {}
    }
    return {};
  }
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
}


// ─────────────────────────────────────────────────────────────
// QUIZ GENERATE — sinh UGC quest từ prompt (GV/HS tự tạo nhanh)
// ─────────────────────────────────────────────────────────────

async function handleQuizGenerate({ topic, grade, subject, count = 5, language = "vi", difficulty = "medium" }) {
  if (!topic) throw new Error("topic required");
  const N = Math.max(3, Math.min(15, Number(count) || 5));
  const difficultyLabel = ({ easy: "dễ", medium: "trung bình", hard: "khó" }[difficulty] || "trung bình");

  const system = `Bạn là chuyên gia soạn câu hỏi trắc nghiệm cho học sinh Việt Nam theo Chương trình GDPT 2018.
Mọi câu hỏi: ngắn gọn, bám SGK, ngôn ngữ HS hiểu được.
Đáp án: 4 lựa chọn (A, B, C, D), CHỈ 1 đúng. Đáp án sai phải HỢP LÝ — đừng vô lý.
KHÔNG được dùng ký tự đặc biệt hoặc markdown.
Trả về JSON pure (không markdown fence) theo schema:
{
  "title": "tiêu đề bộ quiz",
  "description": "mô tả 1 câu",
  "questions": [
    { "text": "Nội dung câu hỏi", "options": ["A","B","C","D"], "correct": 0 }
  ]
}
correct = index 0-3 của đáp án đúng.`;

  const userPrompt = `Hãy sinh CHÍNH XÁC ${N} câu hỏi trắc nghiệm về chủ đề: "${topic}".
${grade ? `Trình độ: Lớp ${grade}.` : ""}
${subject ? `Môn: ${subject}.` : ""}
Độ khó: ${difficultyLabel}.
Ngôn ngữ: ${language === "en" ? "Tiếng Anh" : language === "id" ? "Bahasa Indonesia" : "Tiếng Việt"}.
Trả về JSON đúng schema, không thêm text gì khác.`;

  let raw;
  try {
    raw = await ollamaGenerate({
      prompt: userPrompt, system, temperature: 0.4, json: true, maxTokens: 2500,
    });
  } catch (e) {
    return { error: "ai_failed", detail: String(e?.message || e) };
  }
  const parsed = safeParseJson(raw);
  const qs = Array.isArray(parsed.questions) ? parsed.questions : [];
  // Validate + truncate
  const cleaned = qs
    .filter(q => q && typeof q.text === "string" && Array.isArray(q.options))
    .map(q => ({
      text: String(q.text).slice(0, 500),
      options: q.options.slice(0, 6).map(o => String(o).slice(0, 200)),
      correct: Math.max(0, Math.min(q.options.length - 1, Number(q.correct) || 0)),
    }))
    .filter(q => q.options.length >= 2);
  if (cleaned.length < 3) {
    return { error: "too_few_questions", got: cleaned.length };
  }
  return {
    ok: true,
    quest: {
      title: String(parsed.title || `Quiz: ${topic}`).slice(0, 100),
      description: String(parsed.description || `${cleaned.length} câu về ${topic}`).slice(0, 500),
      questions: cleaned,
    },
    raw_count: qs.length,
  };
}

