// ============================================================
// AITutor — Claude API integration cho chấm SOAP + AI Patient
// ============================================================
// Frontend gọi qua endpoint backend: api/ai/grade-soap, api/ai/patient-turn
// Backend (server/ai.js — sẽ tạo sau) sẽ:
//   1. Build prompt template với prompt-caching (cache phần system prompt
//      + rubric vì chúng dùng đi dùng lại nhiều lần → giảm token cost ~80%)
//   2. Gọi Anthropic SDK với model claude-sonnet-4-6 (cost/quality tốt)
//   3. Parse JSON response, validate, trả về frontend.
//
// Ước tính chi phí:
//   - Chấm 1 SOAP: ~3000 token input + 1000 token output
//     ≈ $0.015 / lần (Sonnet 4.6, có cache)
//   - 1 SV năm 4 làm 30 SOAP/kỳ → $0.45/SV/kỳ
//   - 100 SV/lớp → $45/kỳ → rất rẻ so với giá trị giáo dục
// ============================================================

/**
 * Chấm SOAP note bằng AI tutor.
 * @param {Object} req
 * @param {string} req.caseId  - ID ca lâm sàng trong CaseDB
 * @param {string} req.soapText - Văn bản SOAP của SV
 * @param {'subjective'|'objective'|'assessment'|'plan'|'all'} req.rubric
 * @returns {Promise<{scores: Object, html: string, raw: any}>}
 */
export async function gradeSoap({ caseId, soapText, rubric = 'all' }) {
  try {
    const res = await fetch('api/ai/grade-soap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId, soapText, rubric }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[ai-tutor] gradeSoap failed:', e);
    // Fallback: local heuristic — chỉ check độ dài tối thiểu
    const wordCount = soapText.trim().split(/\s+/).length;
    const baseScore = Math.min(1, wordCount / 100);
    return {
      scores: {
        subjective: baseScore * 0.8,
        objective: baseScore * 0.8,
        assessment: baseScore * 0.6,
        plan: baseScore * 0.6,
      },
      html: '<i>⚠️ AI offline: chấm tạm bằng heuristic độ dài.</i>',
      raw: { fallback: true, wordCount },
    };
  }
}

/**
 * Một lượt đối thoại với "bệnh nhân AI".
 * @param {Object} req
 * @param {string} req.caseId
 * @param {string} req.persona - Mô tả nhân cách BN cho Claude system prompt
 * @param {Array<{role:'user'|'assistant', content:string}>} req.history
 * @param {string} req.studentMessage
 * @returns {Promise<{reply: string, hidden: {emotion?:string, vitals?:any}}>}
 */
export async function patientTurn({ caseId, persona, history, studentMessage }) {
  try {
    const res = await fetch('api/ai/patient-turn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId, persona, history, studentMessage }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[ai-tutor] patientTurn failed', e);
    return {
      reply: '⚠️ Hệ thống AI tạm thời không khả dụng. Vui lòng thử lại.',
      hidden: {},
    };
  }
}

/**
 * Đánh giá toàn bộ phiên role-play khi SV kết thúc.
 * @param {Object} req
 * @param {string} req.caseId
 * @param {Array<{role:'user'|'assistant',content:string}>} req.transcript
 * @param {string[]} req.rubricCriteria - Tiêu chí cần chấm (lấy từ scenario.evaluationRubric)
 * @returns {Promise<{criteria: Array<{name:string,score:number,comment:string}>, transcript:string}>}
 */
export async function evaluateRoleplay({ caseId, transcript, rubricCriteria }) {
  try {
    const res = await fetch('api/ai/evaluate-roleplay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId, transcript, rubricCriteria }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn('[ai-tutor] evaluateRoleplay failed', e);
    return {
      criteria: rubricCriteria.map(c => ({ name: c, score: 0.5, comment: 'AI offline' })),
      transcript: transcript.map(t => `${t.role}: ${t.content}`).join('\n'),
    };
  }
}

// ============================================================
// SPEC backend cần implement (server/ai.js)
// ============================================================
// POST /api/ai/grade-soap
// body: { caseId, soapText, rubric }
// → loads case + rubric từ CaseDB → build prompt:
//
//   system: "Bạn là giảng viên Dược lâm sàng VN. Chấm SOAP của
//            SV theo rubric chuẩn của ca lâm sàng dưới đây.
//            Trả JSON: { scores: {S, O, A, P}, html: 'feedback markdown' }"
//   user:   "<case JSON>\n\n<student SOAP>\n\nChấm và feedback."
//
// Cache: system prompt + case JSON → cache key = `soap-${caseId}`
//   (Anthropic prompt caching: TTL 5 phút, giảm ~80% input cost cho
//    SV thứ 2 trở đi trong cùng cửa sổ)
//
// Model: claude-sonnet-4-6  (cân bằng quality/cost cho task này)
//
// POST /api/ai/patient-turn
// body: { caseId, persona, history, studentMessage }
// → system prompt: ca + persona BN; assistant role = BN
// → trả về 1 lượt nói + (hidden) trạng thái cảm xúc / vitals
//
// POST /api/ai/evaluate-roleplay
// body: { caseId, transcript, rubricCriteria }
// → chấm toàn bộ phiên theo rubricCriteria, trả về điểm + comment
//
// ============================================================
