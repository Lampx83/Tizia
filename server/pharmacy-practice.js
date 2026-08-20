// =====================================================================
// PHARMACOMM — Lưu phiên thực hành + chấm điểm A1–E5.
// Yêu cầu #142 (ThS Nguyệt Phương, 19/08) — bản đặc tả 16 mục.
//
// TÁCH RIÊNG khỏi server/pharmacy.js (đang lo phần hội thoại AI, lưu in-memory):
// file này chỉ lo LƯU BỀN VỮNG vào Postgres + chấm điểm. Không import chéo,
// không đụng vào logic bệnh nhân AI. Xoá module = xoá file này + 1 dòng
// attachPharmacyPractice trong index.js + 4 bảng pharmacy_practice_*.
//
// Danh tính người học: TỰ KHAI (mã SV + họ tên + lớp), KHÔNG mật khẩu — đúng
// đặc tả mục 2 ("màn hình nhập thông tin định danh, không phải hệ thống xác
// thực tài khoản"). player_name từ session Tizia chỉ lưu để đối soát.
//
// Dữ liệu APPEND-ONLY: không có route sửa/xoá lời thoại hay thao tác (đặc tả
// mục 5 & 12: "Không cho sinh viên sửa hoặc xóa nội dung đã lưu").
// =====================================================================
import express from 'express';
import { randomUUID } from 'node:crypto';
import { db } from './db.js';
import { ollamaGenerate } from './ai.js';
import { SCENARIOS } from '../public/js/pharmacy/scenarios.js';
import {
  RUBRIC, RUBRIC_VERSION, RUBRIC_GROUPS, MAX_PER_CRITERION, MAX_TOTAL, summarize,
} from '../public/js/pharmacy/practice-rubric.js';

const now = () => Date.now();
const jn = (v) => { try { return v == null ? null : JSON.stringify(v); } catch { return null; } };
const jp = (s) => { try { return s ? JSON.parse(s) : null; } catch { return null; } };
const clean = (v, max = 120) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

// ---- prepared statements -------------------------------------------
const insSession = db.prepare(`
  INSERT INTO pharmacy_practice_session
    (session_id, student_code, student_name, class_name, scenario_code, scenario_name,
     scenario_version, rubric_version, ai_model_version, started_at, status,
     chat_session_id, user_ref, created_at, updated_at)
  VALUES (@session_id, @student_code, @student_name, @class_name, @scenario_code, @scenario_name,
     @scenario_version, @rubric_version, @ai_model_version, @t, 'in_progress',
     @chat_session_id, @user_ref, @t, @t)
  RETURNING session_id
`);
const getSessionRow = db.prepare(`SELECT * FROM pharmacy_practice_session WHERE session_id = ?`);
const finishSession = db.prepare(`
  UPDATE pharmacy_practice_session
     SET completed_at = @completed_at, duration_ms = @duration_ms, status = @status,
         total_score = @total_score, ai_model_version = COALESCE(@ai_model_version, ai_model_version),
         updated_at = @t
   WHERE session_id = @session_id
`);
// ON CONFLICT DO NOTHING = chống gửi trùng (mục 14) mà không báo lỗi cho client.
const insMessage = db.prepare(`
  INSERT INTO pharmacy_practice_message (session_id, speaker, content, message_order, created_at)
  VALUES (@session_id, @speaker, @content, @message_order, @t)
  ON CONFLICT (session_id, message_order) DO NOTHING
`);
const listMessages = db.prepare(`
  SELECT message_id, speaker, content, message_order, created_at
    FROM pharmacy_practice_message WHERE session_id = ? ORDER BY message_order
`);
const insAction = db.prepare(`
  INSERT INTO pharmacy_practice_action
    (session_id, action_type, object_id, object_name, quantity, action_result,
     action_details, description_vi, action_order, created_at)
  VALUES (@session_id, @action_type, @object_id, @object_name, @quantity, @action_result,
     @action_details, @description_vi, @action_order, @t)
  ON CONFLICT (session_id, action_order) DO NOTHING
`);
const listActions = db.prepare(`
  SELECT action_id, action_type, object_id, object_name, quantity, action_result,
         action_details, description_vi, action_order, created_at
    FROM pharmacy_practice_action WHERE session_id = ? ORDER BY action_order
`);
const upsertScore = db.prepare(`
  INSERT INTO pharmacy_practice_score
    (session_id, criterion_code, criterion_name, criterion_group, score, max_score,
     evidence_source, evidence, comment, improvement_feedback, scored_at)
  VALUES (@session_id, @criterion_code, @criterion_name, @criterion_group, @score, @max_score,
     @evidence_source, @evidence, @comment, @improvement_feedback, @t)
  ON CONFLICT (session_id, criterion_code) DO UPDATE SET
    score = EXCLUDED.score, evidence = EXCLUDED.evidence, comment = EXCLUDED.comment,
    improvement_feedback = EXCLUDED.improvement_feedback, scored_at = EXCLUDED.scored_at
`);
const listScores = db.prepare(`
  SELECT criterion_code, criterion_name, criterion_group, score, max_score,
         evidence_source, evidence, comment, improvement_feedback, scored_at
    FROM pharmacy_practice_score WHERE session_id = ? ORDER BY criterion_code
`);
const recentForStudent = db.prepare(`
  SELECT session_id, scenario_code, scenario_name, started_at, completed_at,
         duration_ms, status, total_score
    FROM pharmacy_practice_session
   WHERE student_code = ? ORDER BY started_at DESC LIMIT 20
`);

// player_name từ session Tizia (chỉ đọc, không tin body).
function userRef(req) {
  return req.user?.player_name || req.user?.username || req.user?.name || null;
}

// ---- mô tả thao tác bằng tiếng Việt (mục 7) -------------------------
// Nhãn hiển thị ở trang kết quả — đặc tả yêu cầu "Mô tả thao tác bằng tiếng Việt".
const ACTION_LABELS = {
  session_start:      'Bắt đầu tình huống',
  session_end:        'Kết thúc tình huống',
  enter_area:         'Di chuyển đến khu vực',
  open_cabinet:       'Mở tủ/kệ thuốc',
  pick_box:           'Lấy hộp thuốc khỏi tủ',
  pick_unit:          'Lấy thuốc lẻ (vỉ/gói/ống)',
  unpick_box:         'Trả hộp thuốc về tủ',
  unpick_unit:        'Trả thuốc lẻ về tủ',
  inspect_drug:       'Xem thông tin thuốc',
  check_drug_info:    'Kiểm tra tên thuốc / hàm lượng / dạng bào chế',
  check_expiry:       'Kiểm tra hạn dùng',
  retail_split:       'Ra lẻ thuốc',
  open_box_unit:      'Mở hộp lấy đơn vị lẻ',
  close_box_unit:     'Đóng hộp thuốc',
  pack_retail:        'Đóng gói thuốc ra lẻ',
  pack_retail_tray:   'Đóng gói thuốc vào khay',
  remove_retail_pack: 'Bỏ gói thuốc đã đóng',
  pack_label:         'Dán nhãn lên gói thuốc',
  label_dose:         'Ghi nhãn hướng dẫn sử dụng',
  barcode_scan:       'Quét mã vạch',
  print_receipt:      'In hoá đơn',
  pos_checkout:       'Thanh toán tại quầy',
  hand_over:          'Trao thuốc cho người bệnh',
  view_prescription:  'Xem đơn thuốc',
  open_reference_book:'Tra cứu tài liệu',
  call_doctor:        'Gọi điện cho bác sĩ kê đơn',
  chat_doctor:        'Trao đổi với bác sĩ kê đơn',
  senior_pharmacist:  'Hỏi ý kiến dược sĩ phụ trách',
};

function describeAction(type, payload = {}) {
  const base = ACTION_LABELS[type] || type;
  const name = payload.drugName || payload.name || payload.drugId || payload.objectName;
  const qty = payload.qty ?? payload.quantity;
  let s = base;
  if (name) s += ` — ${name}`;
  if (qty != null && qty !== '') s += ` (số lượng ${qty})`;
  return s.slice(0, 300);
}

// ---- chấm phần THAO TÁC 3D: tất định, KHÔNG hỏi AI ------------------
// Đặc tả mục 10: "Không chấm sinh viên đã thực hiện một thao tác 3D chỉ dựa vào
// lời nói." → các tiêu chí source='action_3d' chỉ nhìn nhật ký thao tác.
function scoreActionCriterion(crit, actions) {
  const wanted = crit.requires || [];
  const hits = actions.filter((a) => wanted.includes(a.action_type));
  const okHits = hits.filter((a) => a.action_result === 'success' || a.action_result === 'corrected');
  if (!okHits.length) {
    return {
      score: 0,
      evidence: 'Không tìm thấy thao tác tương ứng trong nhật ký 3D.',
      comment: 'Chưa thực hiện thao tác này trong môi trường mô phỏng.',
      improvement: `Hãy thực hiện thao tác: ${crit.name.toLowerCase()}.`,
    };
  }
  const invalid = hits.filter((a) => a.action_result === 'invalid').length;
  // 4 điểm nếu làm đúng không lỗi; trừ dần theo số thao tác không hợp lệ.
  let score = MAX_PER_CRITERION - Math.min(2, invalid);
  const ev = okHits.slice(0, 4)
    .map((a) => `#${a.action_order} ${a.description_vi || a.action_type}`)
    .join('; ');
  return {
    score,
    evidence: ev,
    comment: invalid
      ? `Đã thực hiện nhưng có ${invalid} thao tác không hợp lệ trước đó.`
      : 'Đã thực hiện đầy đủ trong môi trường 3D.',
    improvement: invalid ? 'Thao tác cẩn thận hơn để tránh thao tác không hợp lệ.' : '',
  };
}

// ---- chấm phần HỘI THOẠI + KẾT HỢP: hỏi AI --------------------------
function buildScoringPrompt(sessionRow, messages, actions, crits) {
  const transcript = messages
    .map((m) => `${m.speaker === 'student' ? 'Dược sĩ (SV)' : 'Người bệnh'}: ${m.content}`)
    .join('\n');
  const actionLog = actions.length
    ? actions.map((a) => `#${a.action_order} ${a.description_vi || a.action_type} [${a.action_result}]`).join('\n')
    : '(không có thao tác nào được ghi nhận)';
  const list = crits.map((c) => `${c.code}. ${c.name}`).join('\n');
  return `Đây là bản ghi một lượt thực hành bán thuốc tại nhà thuốc GPP của sinh viên dược.

=== HỘI THOẠI ===
${transcript || '(không có lời thoại)'}

=== NHẬT KÝ THAO TÁC TRONG MÔ PHỎNG 3D ===
${actionLog}

=== TIÊU CHÍ CẦN CHẤM ===
${list}

Hãy chấm TỪNG tiêu chí trên thang 0–4 (0 = không thực hiện, 1 = rất sơ sài,
2 = đạt một phần, 3 = đạt, 4 = tốt).

QUY TẮC BẮT BUỘC:
- Chỉ căn cứ vào bản ghi ở trên, KHÔNG suy diễn thêm.
- Với tiêu chí liên quan đến hành động trong mô phỏng: chỉ được tính là đã làm
  khi có sự kiện tương ứng trong NHẬT KÝ THAO TÁC. Sinh viên chỉ NÓI là đã làm
  mà nhật ký không có thì KHÔNG được tính điểm.
- "evidence" phải TRÍCH nguyên văn ngắn từ hội thoại hoặc số hiệu thao tác.
- Viết nhận xét và góp ý bằng tiếng Việt, ngắn gọn, hướng dẫn cụ thể.

CHỈ trả về JSON hợp lệ, không giải thích thêm, theo đúng dạng:
{"scores":[{"code":"A1","score":3,"evidence":"...","comment":"...","improvement":"..."}]}`;
}

async function scoreBatch(sessionRow, messages, actions, crits, out) {
  const raw = await ollamaGenerate({
    prompt: buildScoringPrompt(sessionRow, messages, actions, crits),
    system: 'Bạn là giảng viên dược chấm thực hành bán thuốc. Chỉ trả về JSON hợp lệ theo đúng cấu trúc được yêu cầu.',
    temperature: 0.2,
    maxTokens: 900,
    json: true,   // Ollama format=json → bớt hẳn trường hợp model chèn lời dẫn quanh JSON
  });
  const m = String(raw || '').match(/\{[\s\S]*\}/);
  if (!m) throw new Error('AI không trả về JSON');
  const parsed = JSON.parse(m[0]);
  for (const it of parsed.scores || []) {
    if (!it || !it.code) continue;
    out.set(String(it.code).toUpperCase(), {
      score: Math.max(0, Math.min(MAX_PER_CRITERION, Number(it.score) || 0)),
      evidence: clean(it.evidence, 500),
      comment: clean(it.comment, 500),
      improvement: clean(it.improvement, 500),
    });
  }
}

// Chấm THEO LÔ NHỎ (≤5 tiêu chí/lượt), TUẦN TỰ. Lý do: model 14B chấm cả 15
// tiêu chí trong một lượt vượt quá timeout 60s của Ollama (đo trên prod 20/08 →
// hỏng toàn bộ phần hội thoại). Chia lô còn giúp lỗi một lô không kéo đổ cả bài
// chấm — các lô khác vẫn có điểm. Trả về [map, sốLôLỗi].
async function scoreWithAi(sessionRow, messages, actions, crits) {
  const batches = [];
  for (let i = 0; i < crits.length; i += 5) batches.push(crits.slice(i, i + 5));
  const out = new Map();
  let failed = 0;
  for (const b of batches) {
    try {
      await scoreBatch(sessionRow, messages, actions, b, out);
    } catch (err) {
      failed++;
      console.error(`[pharmacy-practice] lô chấm ${b.map((c) => c.code).join(',')} lỗi:`, err.message);
    }
  }
  return { map: out, failedBatches: failed };
}

export function attachPharmacyPractice(r) {
  const J = express.json({ limit: '256kb' });

  // POST /api/pharmacy/practice/session — mục 2 + 3: nhận định danh SV tự khai,
  // tạo phiên thực hành UUID gắn với tình huống đã chọn.
  r.post('/api/pharmacy/practice/session', J, async (req, res) => {
    try {
      const b = req.body || {};
      const student_code = clean(b.studentCode, 40).toUpperCase();   // mục 2: in hoa + bỏ khoảng trắng thừa
      const student_name = clean(b.studentName, 120);
      const class_name = clean(b.className, 60);
      const moduleId = clean(b.moduleId, 40);
      // mục 2: không cho tiếp tục nếu thiếu một trong ba thông tin.
      if (!student_code || !student_name || !class_name) {
        return res.status(400).json({ error: 'Vui lòng nhập đủ mã sinh viên, họ tên và lớp.' });
      }
      const sc = SCENARIOS[moduleId];
      if (!sc) return res.status(400).json({ error: 'Tình huống không hợp lệ.' });

      const session_id = randomUUID();
      await insSession.run({
        session_id,
        student_code, student_name, class_name,
        scenario_code: sc.code || moduleId,
        scenario_name: sc.title || null,
        scenario_version: sc.version || 'v1',
        rubric_version: RUBRIC_VERSION,
        ai_model_version: null,
        chat_session_id: clean(b.chatSessionId, 80) || null,
        user_ref: userRef(req),
        t: now(),
      });
      res.json({ sessionId: session_id, scenarioCode: sc.code || moduleId, scenarioName: sc.title || null });
    } catch (err) {
      console.error('[pharmacy-practice] create session failed:', err.message);
      res.status(500).json({ error: 'Không tạo được phiên thực hành.' });
    }
  });

  // POST /api/pharmacy/practice/message — mục 5: lưu NGAY sau mỗi lượt trao đổi.
  // Gửi trùng (cùng message_order) bị bỏ qua im lặng nhờ ON CONFLICT DO NOTHING.
  r.post('/api/pharmacy/practice/message', J, async (req, res) => {
    try {
      const { sessionId, speaker, content, order } = req.body || {};
      const row = await getSessionRow.get(String(sessionId || ''));
      if (!row) return res.status(404).json({ error: 'Không tìm thấy phiên thực hành.' });
      if (row.status !== 'in_progress') return res.status(409).json({ error: 'Phiên đã kết thúc.' });
      const sp = speaker === 'patient' ? 'patient' : 'student';
      const text = String(content || '').trim();
      const ord = Number(order);
      if (!text || !Number.isInteger(ord) || ord < 0) return res.status(400).json({ error: 'Dữ liệu lời thoại không hợp lệ.' });
      await insMessage.run({ session_id: row.session_id, speaker: sp, content: text.slice(0, 4000), message_order: ord, t: now() });
      res.json({ ok: true });
    } catch (err) {
      console.error('[pharmacy-practice] save message failed:', err.message);
      res.status(500).json({ error: 'Không lưu được lời thoại.' });
    }
  });

  // POST /api/pharmacy/practice/action — mục 6 + 7: lưu thao tác 3D có ý nghĩa.
  r.post('/api/pharmacy/practice/action', J, async (req, res) => {
    try {
      const { sessionId, type, payload, order, result } = req.body || {};
      const row = await getSessionRow.get(String(sessionId || ''));
      if (!row) return res.status(404).json({ error: 'Không tìm thấy phiên thực hành.' });
      if (row.status !== 'in_progress') return res.status(409).json({ error: 'Phiên đã kết thúc.' });
      const t = clean(type, 60);
      const ord = Number(order);
      if (!t || !Number.isInteger(ord) || ord < 0) return res.status(400).json({ error: 'Dữ liệu thao tác không hợp lệ.' });
      const p = (payload && typeof payload === 'object') ? payload : {};
      const okResults = ['success', 'invalid', 'cancelled', 'corrected'];
      await insAction.run({
        session_id: row.session_id,
        action_type: t,
        object_id: clean(p.drugId || p.objectId || p.bookId || p.id, 80) || null,
        object_name: clean(p.drugName || p.name || p.objectName, 200) || null,
        quantity: Number.isFinite(Number(p.qty ?? p.quantity)) ? Number(p.qty ?? p.quantity) : null,
        action_result: okResults.includes(result) ? result : 'success',
        action_details: jn(p),
        description_vi: describeAction(t, p),
        action_order: ord,
        t: now(),
      });
      res.json({ ok: true });
    } catch (err) {
      console.error('[pharmacy-practice] save action failed:', err.message);
      res.status(500).json({ error: 'Không lưu được thao tác.' });
    }
  });

  // POST /api/pharmacy/practice/finish — mục 9 + 10: khoá phiên, chấm điểm bằng
  // CẢ hội thoại lẫn nhật ký thao tác, lưu kết quả vào đúng phiên.
  // Chấm lại khi lỗi KHÔNG tạo phiên mới (đặc tả mục 9 & 14).
  r.post('/api/pharmacy/practice/finish', J, async (req, res) => {
    let row;
    try {
      const { sessionId } = req.body || {};
      row = await getSessionRow.get(String(sessionId || ''));
      if (!row) return res.status(404).json({ error: 'Không tìm thấy phiên thực hành.' });

      const messages = await listMessages.all(row.session_id);
      const actions = await listActions.all(row.session_id);
      const completed_at = row.completed_at || now();
      const duration_ms = completed_at - Number(row.started_at);

      // 1) Tiêu chí thao tác 3D → chấm tất định trước (không phụ thuộc AI).
      const results = [];
      const actionCrits = RUBRIC.filter((c) => c.source === 'action_3d');
      for (const c of actionCrits) {
        const r0 = scoreActionCriterion(c, actions);
        results.push({ crit: c, ...r0 });
      }

      // 2) Tiêu chí hội thoại + kết hợp → AI chấm.
      const aiCrits = RUBRIC.filter((c) => c.source !== 'action_3d');
      let aiMap = new Map();
      let aiOk = true;
      try {
        const r1 = await scoreWithAi(row, messages, actions, aiCrits);
        aiMap = r1.map;
        // Chỉ coi là lỗi chấm khi KHÔNG chấm được tiêu chí nào — mất một lô nhỏ
        // thì phần còn lại vẫn dùng được, không bắt sinh viên chấm lại cả bài.
        aiOk = aiMap.size > 0;
      } catch (err) {
        aiOk = false;
        console.error('[pharmacy-practice] AI scoring failed:', err.message);
      }
      for (const c of aiCrits) {
        const got = aiMap.get(c.code);
        results.push({
          crit: c,
          score: got ? got.score : 0,
          evidence: got ? got.evidence : (aiOk ? 'Không tìm thấy minh chứng trong hội thoại.' : 'Chưa chấm được do lỗi hệ thống chấm điểm.'),
          comment: got ? got.comment : (aiOk ? 'Chưa thể hiện trong lượt thực hành này.' : 'Hệ thống sẽ chấm lại tiêu chí này.'),
          improvement: got ? got.improvement : '',
        });
      }

      // 3) Lưu từng tiêu chí (UPSERT → chấm lại không nhân bản dòng).
      const t = now();
      for (const r0 of results) {
        await upsertScore.run({
          session_id: row.session_id,
          criterion_code: r0.crit.code,
          criterion_name: r0.crit.name,
          criterion_group: r0.crit.group,
          score: r0.score,
          max_score: MAX_PER_CRITERION,
          evidence_source: r0.crit.source,
          evidence: r0.evidence || null,
          comment: r0.comment || null,
          improvement_feedback: r0.improvement || null,
          t,
        });
      }

      const rows = await listScores.all(row.session_id);
      const sum = summarize(rows);
      await finishSession.run({
        session_id: row.session_id,
        completed_at,
        duration_ms,
        status: aiOk ? 'completed' : 'scoring_failed',
        total_score: sum.score,
        ai_model_version: process.env.OLLAMA_MODEL || null,
        t,
      });

      res.json({ ok: true, sessionId: row.session_id, scoringFailed: !aiOk });
    } catch (err) {
      console.error('[pharmacy-practice] finish failed:', err.message);
      // Giữ nguyên hội thoại + thao tác để chấm lại (mục 14).
      if (row) {
        try {
          await finishSession.run({
            session_id: row.session_id,
            completed_at: row.completed_at || now(),
            duration_ms: (row.completed_at || now()) - Number(row.started_at),
            status: 'scoring_failed', total_score: null, ai_model_version: null, t: now(),
          });
        } catch {}
      }
      res.status(500).json({ error: 'Chấm điểm lỗi. Dữ liệu đã được giữ lại để chấm lại.' });
    }
  });

  // GET /api/pharmacy/practice/result/:id — mục 12: trang kết quả 3 thẻ.
  r.get('/api/pharmacy/practice/result/:id', async (req, res) => {
    try {
      const row = await getSessionRow.get(String(req.params.id || ''));
      if (!row) return res.status(404).json({ error: 'Không tìm thấy phiên thực hành.' });
      const [messages, actions, scores] = await Promise.all([
        listMessages.all(row.session_id),
        listActions.all(row.session_id),
        listScores.all(row.session_id),
      ]);
      res.json({
        session: {
          sessionId: row.session_id,
          studentCode: row.student_code, studentName: row.student_name, className: row.class_name,
          scenarioCode: row.scenario_code, scenarioName: row.scenario_name,
          scenarioVersion: row.scenario_version, rubricVersion: row.rubric_version,
          aiModelVersion: row.ai_model_version,
          startedAt: Number(row.started_at), completedAt: row.completed_at ? Number(row.completed_at) : null,
          durationMs: row.duration_ms ? Number(row.duration_ms) : null,
          status: row.status, totalScore: row.total_score,
        },
        messages,
        actions: actions.map((a) => ({ ...a, action_details: jp(a.action_details) })),
        scores,
        summary: summarize(scores),
        groups: RUBRIC_GROUPS,
        maxTotal: MAX_TOTAL,
      });
    } catch (err) {
      console.error('[pharmacy-practice] result failed:', err.message);
      res.status(500).json({ error: 'Không đọc được kết quả.' });
    }
  });

  // GET /api/pharmacy/practice/history?code=SV001 — SV xem lại các lượt của mình.
  r.get('/api/pharmacy/practice/history', async (req, res) => {
    try {
      const code = clean(req.query.code, 40).toUpperCase();
      if (!code) return res.status(400).json({ error: 'Thiếu mã sinh viên.' });
      res.json({ items: await recentForStudent.all(code) });
    } catch (err) {
      console.error('[pharmacy-practice] history failed:', err.message);
      res.status(500).json({ error: 'Không đọc được lịch sử.' });
    }
  });
}
