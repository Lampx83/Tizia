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
import { SCENARIOS, SCENARIO_CARDS } from '../public/js/pharmacy/scenarios.js';
import {
  OTC_RUBRIC, OTC_RUBRIC_VERSION, OTC_GROUPS, OTC_MAX_PER_CRITERION, OTC_MAX_TOTAL,
  OTC_SAFETY_FLAGS, OTC_PRINCIPLES,
} from '../public/js/pharmacy/otc-rubric.js';
import { OTC02_LEVEL_OVERRIDES } from '../public/js/pharmacy/otc02-rubric.js';
import { currentTeacher } from './pharmacy-teacher.js';   // req #143: nhận diện lượt GV chạy thử
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
     chat_session_id, user_ref, session_kind, created_at, updated_at)
  VALUES (@session_id, @student_code, @student_name, @class_name, @scenario_code, @scenario_name,
     @scenario_version, @rubric_version, @ai_model_version, @t, 'in_progress',
     @chat_session_id, @user_ref, @session_kind, @t, @t)
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
// req #143 — HỒ SƠ SINH VIÊN: mã SV là định danh duy nhất. Thực hành nhiều lượt
// chỉ một hồ sơ; họ tên/lớp cập nhật theo lần khai gần nhất (sửa được lỗi gõ).
// Lượt khách và lượt chạy thử của giảng viên KHÔNG tạo hồ sơ sinh viên.
const upsertStudent = db.prepare(`
  INSERT INTO pharmacy_student (student_code, student_name, class_name, first_seen_at, last_seen_at, session_count)
  VALUES (@code, @name, @cls, @t, @t, 1)
  ON CONFLICT (student_code) DO UPDATE
    SET student_name = EXCLUDED.student_name,
        class_name   = EXCLUDED.class_name,
        last_seen_at = EXCLUDED.last_seen_at,
        session_count = pharmacy_student.session_count + 1`);

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
    score = EXCLUDED.score, max_score = EXCLUDED.max_score, evidence_source = EXCLUDED.evidence_source,
    evidence = EXCLUDED.evidence, comment = EXCLUDED.comment,
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
  const name = payload.drugName || payload.name || payload.objectName || payload.drugId;
  const qty = payload.qty ?? payload.quantity;
  let s = base;
  if (name) s += ` — ${name}`;
  // Chi tiết chuyên môn cho các thao tác kiểm tra: giảng viên đọc nhật ký là
  // biết ngay sinh viên đã đối chiếu đúng thông tin gì (mục 7 đặc tả).
  const detail = [
    payload.strength && `hàm lượng ${payload.strength}`,
    payload.form && `dạng ${payload.form}`,
    payload.expiry && `hạn dùng ${payload.expiry}`,
  ].filter(Boolean);
  if (detail.length && /^(check_|inspect_)/.test(type)) s += ` · ${detail.join(', ')}`;
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


// =====================================================================
// RUBRIC OTC_AI_v1.0 (req #173) — bán thuốc KHÔNG KÊ ĐƠN, thang 1–5.
// Khác bộ A1–E5 cũ: AI chấm CẢ 21 tiêu chí theo mô tả từng mức của giảng viên,
// mỗi điểm kèm bằng chứng (mã lượt L#/thao tác A#), có N/A, N/O và cờ an toàn.
// N/A và N/O lưu với max_score = 0 → tự loại khỏi mẫu số khi tính điểm.
// =====================================================================
const OTC_TAG = 'Không kê đơn';
function isOtcScenario(moduleId) {
  return (SCENARIO_CARDS || []).some((c) => c.id === moduleId && c.tag === OTC_TAG);
}

// Thao tác 3D liên quan tới từng tiêu chí thao tác (C2/C3/C6): chưa có sự kiện nào
// thì AI không được cho điểm cao chỉ vì sinh viên NÓI đã làm.
const OTC_ACTION_TYPES = {
  C2: ['pick_box', 'pick_unit', 'open_box_unit', 'inspect_drug', 'check_drug_info', 'check_expiry'],
  C3: ['pos_checkout', 'print_receipt'],
  C6: ['retail_split', 'pack_retail', 'pack_retail_tray', 'label_dose', 'pack_label'],
};

// req #230 mục 4 — 2 tiêu chí bị chấm quá tay, ghi rõ luật để AI bám đúng thay vì tự suy diễn.
const OTC_CRITERION_NOTES = {
  C5: 'LƯU Ý CHẤM: nếu chỉ tư vấn tác dụng không mong muốn (ADR) mà KHÔNG đề cập tương tác thuốc/thức ăn, lối sống–sinh hoạt hay bảo quản thì tối đa 2 điểm dù ADR nói đúng.',
  D2: 'LƯU Ý CHẤM: nếu trong TOÀN BỘ hội thoại không có bất kỳ câu nào của dược sĩ thể hiện đồng cảm/động viên với khách hàng thì cho 0 điểm, không được cho điểm cao hơn vì lý do khác.',
};

function buildOtcPrompt(sc, messages, actions, crits) {
  const transcript = messages
    .map((m, i) => `L${i + 1} ${m.speaker === 'student' ? 'Dược sĩ (SV)' : 'Khách hàng'}: ${m.content}`)
    .join('\n');
  const actionLog = actions.length
    ? actions.map((a) => `A${Number(a.action_order) + 1} ${a.description_vi || a.action_type} [${a.action_result}]`).join('\n')
    : '(không có thao tác nào được ghi nhận)';
  const dossier = String(sc?.npcPersona || sc?.setting || '').slice(0, 3500);
  // req #229 — OTC-02 (bán Alaxan) có đáp án chấm RIÊNG cho 11/21 tiêu chí (ghi đè mô tả 5 mức
  // bằng ví dụ đúng chuyên môn của thuốc này); tiêu chí không có đáp án riêng vẫn dùng mô tả chung.
  const overrides = sc?.code === 'OTC-02' ? OTC02_LEVEL_OVERRIDES : null;
  const critText = crits.map((c) => {
    const ov = overrides?.[c.code];
    const note = OTC_CRITERION_NOTES[c.code] ? `\n${OTC_CRITERION_NOTES[c.code]}` : '';
    return `### ${c.code}. ${c.name}
Trọng tâm: ${c.focus}
Nguồn dữ liệu: ${c.evidence || (c.source === 'combined' ? 'Hội thoại + nhật ký thao tác' : 'Hội thoại')}
${ov ? '(Đáp án riêng cho tình huống này)' : ''}
${(ov || c.levels).map((t, i) => `Mức ${i + 1}: ${t}`).join('\n')}${note}`;
  }).join('\n\n');
  return `Bạn chấm kỹ năng giao tiếp bán thuốc KHÔNG KÊ ĐƠN của sinh viên dược (rubric OTC_AI_v1.0).

=== HỒ SƠ TÌNH HUỐNG (nội dung chuyên môn của khách hàng — dùng để đối chiếu dữ kiện, thuốc phù hợp) ===
${dossier || '(không có)'}

=== HỘI THOẠI (mỗi dòng có mã lượt L#, ghi rõ ai nói) ===
${transcript || '(không có lời thoại)'}

=== NHẬT KÝ THAO TÁC 3D (mã A#) ===
${actionLog}

=== NGUYÊN TẮC CHẤM BẮT BUỘC ===
${OTC_PRINCIPLES.map((t) => '- ' + t).join('\n')}
- req #230: NGƯỜI ĐƯỢC CHẤM là DƯỢC SĨ (SV), không phải khách hàng. "evidence" PHẢI trích lời hoặc thao tác CỦA DƯỢC SĨ (mã L# ứng với dòng "Dược sĩ (SV)"), KHÔNG được trích lời của khách hàng làm minh chứng — trừ khi minh chứng đó chỉ dùng để nêu bối cảnh (khách hàng hỏi/giục gì) đi kèm với chính câu trả lời của dược sĩ ngay sau đó. Ví dụ SAI: evidence="L4: 'Tôi không sốt.'" (đây là lời khách hàng). Ví dụ ĐÚNG: evidence="L5: 'Anh có sốt không ạ?'" (lời dược sĩ hỏi).
- "improvement": khi score < 5, PHẢI kèm một CÂU VÍ DỤ CỤ THỂ trong ngoặc kép mà sinh viên có thể nói lại đúng tình huống này (không viết giải pháp chung chung như "cần hỏi kỹ hơn"). Ví dụ: A2 → "nên đặt câu hỏi đề cập cả nhu cầu mua thuốc và tư vấn, ví dụ: \"Anh cần mua thuốc gì hay cần em tư vấn về vấn đề gì ạ?\""

=== TIÊU CHÍ CẦN CHẤM (mô tả từng mức 1–5) ===
${critText}

Với TỪNG tiêu chí, chọn "status":
- "scored": có áp dụng và đủ bằng chứng → "score" là số nguyên 1–5 theo đúng mô tả mức.
- "N/A": không áp dụng (vd đúng ra là không bán thuốc) → "score": null.
- "N/O": có áp dụng nhưng thiếu dữ liệu để quan sát → "score": null.
"evidence": trích ngắn kèm mã lượt/thao tác của DƯỢC SĨ, vd "L3: 'Bé mấy tháng tuổi ạ?'; A5 Lấy thuốc". "comment": nhận xét ngắn tiếng Việt. "improvement": góp ý sửa lỗi CỤ THỂ kèm câu ví dụ (xem quy tắc ở trên).

CHỈ trả về JSON hợp lệ, đúng dạng:
{"scores":[{"code":"A1","status":"scored","score":4,"evidence":"...","comment":"...","improvement":"..."}]}`;
}

async function scoreOtcBatch(sc, messages, actions, crits, out) {
  const raw = await ollamaGenerate({
    prompt: buildOtcPrompt(sc, messages, actions, crits),
    system: 'Bạn là giảng viên dược chấm kỹ năng giao tiếp bán thuốc. Bám sát mô tả từng mức của rubric, chỉ dựa vào bằng chứng có trong bản ghi. Chỉ trả về JSON hợp lệ.',
    temperature: 0.2,
    maxTokens: 1600,
    json: true,
  });
  const m = String(raw || '').match(/\{[\s\S]*\}/);
  if (!m) throw new Error('AI không trả về JSON');
  const parsed = JSON.parse(m[0]);
  for (const it of parsed.scores || []) {
    const code = String(it?.code || '').toUpperCase();
    if (!code) continue;
    const st = String(it.status || 'scored').toUpperCase();
    const sc5 = Math.round(Number(it.score));
    let status = st === 'N/A' ? 'N/A' : st === 'N/O' ? 'N/O' : 'scored';
    if (status === 'scored' && !(sc5 >= 1 && sc5 <= OTC_MAX_PER_CRITERION)) status = 'N/O';
    out.set(code, {
      status, score: status === 'scored' ? sc5 : null,
      evidence: clean(it.evidence, 500), comment: clean(it.comment, 500), improvement: clean(it.improvement, 500),
    });
  }
}

// Cờ lỗi an toàn — gọi riêng để không lẫn vào chấm điểm từng tiêu chí.
async function detectOtcSafetyFlags(sc, messages, actions) {
  const transcript = messages.map((m, i) => `L${i + 1} ${m.speaker === 'student' ? 'Dược sĩ (SV)' : 'Khách hàng'}: ${m.content}`).join('\n');
  const actionLog = actions.map((a) => `A${Number(a.action_order) + 1} ${a.description_vi || a.action_type} [${a.action_result}]`).join('\n') || '(không có)';
  const raw = await ollamaGenerate({
    prompt: `Hồ sơ tình huống:\n${String(sc?.npcPersona || sc?.setting || '').slice(0, 3500)}\n\nHội thoại:\n${transcript || '(không có)'}\n\nNhật ký thao tác:\n${actionLog}\n\nKiểm tra sinh viên có mắc LỖI AN TOÀN nào sau đây không (chỉ gắn cờ khi có bằng chứng rõ ràng trong bản ghi):\n${OTC_SAFETY_FLAGS.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nCHỈ trả về JSON: {"flags":[{"n":1,"evidence":"L4: ... / A7 ..."}]} — "flags" rỗng nếu không có lỗi.`,
    system: 'Bạn là giảng viên dược kiểm tra an toàn thuốc. Chỉ trả về JSON hợp lệ.',
    temperature: 0.1, maxTokens: 500, json: true,
  });
  const m = String(raw || '').match(/\{[\s\S]*\}/);
  if (!m) return [];
  const parsed = JSON.parse(m[0]);
  const seen = new Set();
  const flags = [];
  for (const f of parsed.flags || []) {
    const n = Math.round(Number(f?.n));
    if (!(n >= 1 && n <= OTC_SAFETY_FLAGS.length) || seen.has(n)) continue;
    seen.add(n);
    flags.push({ n, text: OTC_SAFETY_FLAGS[n - 1], evidence: clean(f.evidence, 400) });
  }
  return flags;
}

// req #230 mục 1 — kiểm tra "evidence" có trích đúng lời/thao tác của DƯỢC SĨ hay không (không
// chỉ trích lời khách hàng). Đối chiếu mã L# trong evidence với vai (speaker) của đúng lượt đó;
// không chặn điểm (LLM có thể đúng nhưng quên format L#) nhưng gắn cảnh báo để giảng viên soát.
function otcEvidenceCitesStudent(messages, evidence) {
  const nums = [...String(evidence || '').matchAll(/L(\d+)/g)].map((m) => Number(m[1]));
  if (!nums.length) return true;   // không trích mã lượt nào — không đủ căn cứ để bắt lỗi, bỏ qua
  return nums.some((n) => messages[n - 1]?.speaker === 'student');
}

async function scoreOtc(sessionRow, messages, actions) {
  const sc = SCENARIOS[Object.keys(SCENARIOS).find((k) => (SCENARIOS[k].code || k) === sessionRow.scenario_code)] || null;
  const aiCrits = OTC_RUBRIC.filter((c) => c.source !== 'audio');
  const out = new Map();
  let failed = 0;
  for (let i = 0; i < aiCrits.length; i += 3) {
    const b = aiCrits.slice(i, i + 3);
    try { await scoreOtcBatch(sc, messages, actions, b, out); }
    catch (err) {
      failed++;
      console.error(`[pharmacy-practice] OTC lô ${b.map((c) => c.code).join(',')} lỗi:`, err.message);
    }
  }
  const aiOk = out.size > 0;
  const rows = [];
  for (const c of OTC_RUBRIC) {
    let r0;
    if (c.source === 'audio') {
      r0 = { status: 'N/O', score: null, evidence: 'Chưa có ghi âm giọng nói.',
        comment: 'Tiêu chí này chỉ chấm khi có âm thanh; phần mềm hiện chưa thu âm nên cần giảng viên xem thủ công.', improvement: '' };
    } else {
      const got = out.get(c.code);
      r0 = got || {
        status: 'N/O', score: null,
        evidence: aiOk ? 'AI không trả điểm cho tiêu chí này.' : 'Chưa chấm được do lỗi hệ thống chấm điểm.',
        comment: 'Cần chấm lại hoặc xem thủ công.', improvement: '',
      };
      // req #230 mục 2 — C2/C3/C6: không có thao tác nào trong nhật ký thì cho 0 điểm (không suy
      // đoán từ lời nói); có thao tác nhưng ghi nhận KHÔNG HỢP LỆ (vd lấy sai thuốc, thu sai tiền,
      // ghi thiếu/sai HDSD) thì tối đa 2 điểm dù AI đọc hội thoại thấy sinh viên "nói" là đã làm đúng.
      const types = OTC_ACTION_TYPES[c.code];
      if (types && r0.status === 'scored') {
        const hits = actions.filter((a) => types.includes(a.action_type));
        const invalidHits = hits.filter((a) => a.action_result === 'invalid');
        if (!hits.length) {
          r0 = { ...r0, score: 0, evidence: 'Không tìm thấy thao tác tương ứng trong nhật ký 3D.',
            comment: 'Chưa thực hiện thao tác này trong môi trường mô phỏng — cho 0 điểm dù hội thoại có nhắc tới.' };
        } else if (invalidHits.length && r0.score > 2) {
          r0 = { ...r0, score: 2, comment: (r0.comment ? r0.comment + ' ' : '')
            + `Nhật ký 3D ghi nhận ${invalidHits.length} thao tác KHÔNG hợp lệ (${invalidHits.map((a) => a.description_vi || a.action_type).slice(0, 2).join('; ')}) nên tối đa 2 điểm.` };
        }
      }
      if (r0.status === 'scored' && !r0.evidence) r0 = { ...r0, evidence: '(AI chưa nêu trích dẫn cụ thể — giảng viên nên đối chiếu hội thoại)' };
      // req #230 mục 1 — evidence chỉ trích lời khách hàng (không có lượt của dược sĩ) → gắn cảnh báo.
      if (r0.status === 'scored' && c.source !== 'audio' && !otcEvidenceCitesStudent(messages, r0.evidence)) {
        r0 = { ...r0, comment: '⚠️ Minh chứng AI trích dẫn có thể là lời khách hàng, chưa phải lời dược sĩ — giảng viên nên đối chiếu lại hội thoại. ' + (r0.comment || '') };
      }
    }
    rows.push({ crit: c, ...r0 });
  }
  let flags = [];
  try { flags = await detectOtcSafetyFlags(sc, messages, actions); }
  catch (err) { console.error('[pharmacy-practice] OTC cờ an toàn lỗi:', err.message); }
  return { rows, flags, aiOk, failed };
}

export function attachPharmacyPractice(r) {
  const J = express.json({ limit: '256kb' });

  // POST /api/pharmacy/practice/session — mục 2 + 3: nhận định danh SV tự khai,
  // tạo phiên thực hành UUID gắn với tình huống đã chọn.
  // Mã dành cho tài khoản khách — khớp GUEST_CODE ở public/js/pharmacy/practice-client.js
  const GUEST_CODE = 'KHACH';

  r.post('/api/pharmacy/practice/session', J, async (req, res) => {
    try {
      const b = req.body || {};
      let student_code = clean(b.studentCode, 40).toUpperCase();     // mục 2: in hoa + bỏ khoảng trắng thừa
      let student_name = clean(b.studentName, 120);
      let class_name = clean(b.className, 60);
      const moduleId = clean(b.moduleId, 40);
      // TÀI KHOẢN KHÁCH: vào thử không cần thông tin sinh viên. Danh tính do máy chủ
      // áp cứng (không lấy theo client gửi) để không ai mạo danh sinh viên thật, và
      // để giảng viên lọc bài của khách ra khỏi danh sách lớp bằng mã KHACH.
      if (b.guest === true) {
        student_code = GUEST_CODE; student_name = 'Khách'; class_name = 'Khách';
      } else if (!student_code || !student_name || !class_name) {
        // mục 2: không cho tiếp tục nếu thiếu một trong ba thông tin.
        return res.status(400).json({ error: 'Vui lòng nhập đủ mã sinh viên, họ tên và lớp.' });
      } else if (student_code === GUEST_CODE) {
        // Chặn người dùng tự gõ "khach" vào ô mã SV để giả làm khách.
        return res.status(400).json({ error: 'Mã sinh viên này không dùng được. Bạn chọn "Vào bằng tài khoản khách" ở dưới nhé.' });
      }
      const sc = SCENARIOS[moduleId];
      if (!sc) return res.status(400).json({ error: 'Tình huống không hợp lệ.' });

      // req #143 — PHÂN LOẠI LƯỢT. Lượt GV chạy thử phải tách hẳn khỏi dữ liệu sinh
      // viên (không vào lịch sử, điểm trung bình, thống kê). Tư cách giảng viên đọc
      // từ COOKIE đã đăng nhập, KHÔNG lấy theo cờ client gửi lên — client tự khai
      // "tôi là giảng viên" thì không có tác dụng.
      const teacher = await currentTeacher(req);
      let session_kind = 'STUDENT';
      if (teacher) {
        session_kind = 'TEACHER_TEST';
        student_code = 'GV_TEST';
        student_name = `Chạy thử — ${teacher.display_name || teacher.username}`;
        class_name = 'Giảng viên chạy thử';
      } else if (b.guest === true) {
        session_kind = 'GUEST';
      }

      const session_id = randomUUID();
      await insSession.run({
        session_id,
        student_code, student_name, class_name,
        scenario_code: sc.code || moduleId,
        scenario_name: sc.title || null,
        scenario_version: sc.version || 'v1',
        rubric_version: isOtcScenario(moduleId) ? OTC_RUBRIC_VERSION : RUBRIC_VERSION,
        ai_model_version: null,
        chat_session_id: clean(b.chatSessionId, 80) || null,
        user_ref: userRef(req),
        session_kind,
        t: now(),
      });
      // Hồ sơ sinh viên chỉ lập cho lượt SINH VIÊN thật — khách và GV chạy thử không
      // được tạo hồ sơ, để danh sách lớp của cô sạch.
      if (session_kind === 'STUDENT') {
        try { await upsertStudent.run({ code: student_code, name: student_name, cls: class_name, t: now() }); }
        catch (e) { console.error('[pharmacy-practice] upsert hồ sơ SV lỗi:', e.message); }
      }
      res.json({ sessionId: session_id, scenarioCode: sc.code || moduleId, scenarioName: sc.title || null, sessionKind: session_kind });
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
  // 🪤 20/08: chấm cả 25 tiêu chí mất 60–120s (3 lô AI) — DÀI HƠN timeout của
  // reverse proxy nên trình duyệt nhận 500 dù máy chủ vẫn chấm xong bình thường.
  // Vì vậy route này trả lời NGAY (status 'scoring') rồi chấm ở nền; trang kết
  // quả tự hỏi lại đến khi xong. Cũng khớp mục 14 đặc tả: phải hiển thị được
  // trạng thái "đang chấm" / "chấm thành công" / "chấm điểm lỗi".
  r.post('/api/pharmacy/practice/finish', J, async (req, res) => {
    const { sessionId } = req.body || {};
    const row0 = await getSessionRow.get(String(sessionId || ''));
    if (!row0) return res.status(404).json({ error: 'Không tìm thấy phiên thực hành.' });
    if (row0.status === 'scoring') return res.json({ ok: true, sessionId: row0.session_id, status: 'scoring' });

    const completedAt = row0.completed_at || now();
    await finishSession.run({
      session_id: row0.session_id,
      completed_at: completedAt,
      duration_ms: completedAt - Number(row0.started_at),
      status: 'scoring', total_score: row0.total_score ?? null, ai_model_version: null, t: now(),
    });
    res.json({ ok: true, sessionId: row0.session_id, status: 'scoring' });
    scoreSession(row0.session_id).catch((e) => console.error('[pharmacy-practice] chấm nền lỗi:', e.message));
  });

  // Chấm ở nền — tách hẳn khỏi vòng đời request để không bị proxy cắt giữa chừng.
  async function scoreSession(sessionId) {
    let row;
    try {
      row = await getSessionRow.get(sessionId);
      if (!row) return;

      const messages = await listMessages.all(row.session_id);
      const actions = await listActions.all(row.session_id);
      const completed_at = row.completed_at || now();
      const duration_ms = completed_at - Number(row.started_at);

      if (row.rubric_version === OTC_RUBRIC_VERSION) {
        const o = await scoreOtc(row, messages, actions);
        const t = now();
        for (const r0 of o.rows) {
          const scored = r0.status === 'scored';
          await upsertScore.run({
            session_id: row.session_id, criterion_code: r0.crit.code, criterion_name: r0.crit.name,
            criterion_group: r0.crit.group, score: scored ? r0.score : 0,
            max_score: scored ? OTC_MAX_PER_CRITERION : 0,
            evidence_source: scored ? r0.crit.source : r0.status,
            evidence: r0.evidence || null, comment: r0.comment || null,
            improvement_feedback: r0.improvement || null, t,
          });
        }
        // Cờ an toàn: nhóm 'F', max_score 0 → không tính vào điểm, chỉ để hiển thị.
        for (const f of o.flags) {
          await upsertScore.run({
            session_id: row.session_id, criterion_code: 'FLAG' + f.n, criterion_name: f.text,
            criterion_group: 'F', score: 0, max_score: 0, evidence_source: 'safety_flag',
            evidence: f.evidence || null, comment: null, improvement_feedback: null, t,
          });
        }
        const rows = await listScores.all(row.session_id);
        const sum = summarize(rows);
        await finishSession.run({
          session_id: row.session_id, completed_at, duration_ms,
          status: o.aiOk ? 'completed' : 'scoring_failed',
          total_score: sum.percent,
          ai_model_version: process.env.OLLAMA_MODEL || null, t,
        });
        return;
      }

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

    } catch (err) {
      console.error('[pharmacy-practice] chấm điểm lỗi:', err.message);
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
    }
  }

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
        summary: summarize(scores, row.rubric_version === OTC_RUBRIC_VERSION ? OTC_GROUPS : RUBRIC_GROUPS),
        groups: row.rubric_version === OTC_RUBRIC_VERSION ? OTC_GROUPS : RUBRIC_GROUPS,
        maxTotal: row.rubric_version === OTC_RUBRIC_VERSION ? OTC_MAX_TOTAL : MAX_TOTAL,
        scale: row.rubric_version === OTC_RUBRIC_VERSION ? 5 : 4,
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
