// =====================================================================
// GPP 2D — API mô-đun thực hành nghiệp vụ nhà thuốc GPP.
// Đề tài NCKH cấp cơ sở "Ứng dụng mô phỏng và AI trong dạy học kiến thức và
// kỹ năng thực hành dược tại cơ sở bán lẻ thuốc" — ThS Phạm Thị Hương Lý,
// Trường CĐ Y tế Hà Nội.
//
// ĐỘC LẬP với Nhà thuốc 3D (server/pharmacy.js): route riêng /api/gpp/*, bảng
// riêng gpp_* (xem schema.sql). Không import chéo, không dùng chung session.
// Xoá module = xoá file này + gỡ 1 dòng attachGpp trong index.js.
//
// Danh tính SV lấy theo mã SV (student_code) do người học nhập ở màn enroll,
// KHÔNG nhận điểm/định danh nhạy cảm từ body của route chấm điểm. player_name
// từ session (nếu đăng nhập Tizia) chỉ lưu để đối soát, không bắt buộc.
// =====================================================================
import { db } from './db.js';
import { llmGenerate } from './ai.js';
import { requireAdmin } from './contexts/admin/index.js';

const now = () => Date.now();
const sid = () => `g_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
const jn = (v) => { try { return v == null ? null : JSON.stringify(v); } catch { return null; } };

// ---- prepared statements ----
const upsertParticipant = db.prepare(`
  INSERT INTO gpp_participant (student_code, full_name, class_name, year_level, study_group, user_ref, created_at, updated_at)
  VALUES (@student_code, @full_name, @class_name, @year_level, @study_group, @user_ref, @t, @t)
  ON CONFLICT (student_code) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, gpp_participant.full_name),
    class_name = COALESCE(EXCLUDED.class_name, gpp_participant.class_name),
    year_level = COALESCE(EXCLUDED.year_level, gpp_participant.year_level),
    study_group = COALESCE(EXCLUDED.study_group, gpp_participant.study_group),
    user_ref = COALESCE(EXCLUDED.user_ref, gpp_participant.user_ref),
    updated_at = @t
  RETURNING id
`);
const getParticipant = db.prepare(`SELECT * FROM gpp_participant WHERE student_code = ?`);
const insSession = db.prepare(`
  INSERT INTO gpp_session (id, participant_id, started_at, meta)
  VALUES (@id, @participant_id, @t, @meta) RETURNING id
`);
const insEvent = db.prepare(`
  INSERT INTO gpp_event (session_id, participant_id, level, step_key, action, correct, attempts, time_ms, detail, created_at)
  VALUES (@session_id, @participant_id, @level, @step_key, @action, @correct, @attempts, @time_ms, @detail, @t)
`);
const insLevelResult = db.prepare(`
  INSERT INTO gpp_level_result (session_id, participant_id, level, passed, score, steps_total, steps_passed, duration_ms, attempts_total, detail, created_at)
  VALUES (@session_id, @participant_id, @level, @passed, @score, @steps_total, @steps_passed, @duration_ms, @attempts_total, @detail, @t)
  RETURNING id
`);
const insTest = db.prepare(`
  INSERT INTO gpp_test_result (participant_id, session_id, phase, form_variant, year_level, n_questions, n_correct, score10, answers, created_at)
  VALUES (@participant_id, @session_id, @phase, @form_variant, @year_level, @n_questions, @n_correct, @score10, @answers, @t)
  RETURNING id
`);
const insSurvey = db.prepare(`
  INSERT INTO gpp_survey (participant_id, session_id, kind, items, summary, created_at)
  VALUES (@participant_id, @session_id, @kind, @items, @summary, @t) RETURNING id
`);
const levelResultsForPid = db.prepare(`
  SELECT level, MAX(passed) passed, MAX(score) score
  FROM gpp_level_result WHERE participant_id = ? GROUP BY level ORDER BY level
`);
const testsForPid = db.prepare(`SELECT phase, score10, created_at FROM gpp_test_result WHERE participant_id = ? ORDER BY created_at`);

// player_name từ session (an toàn: chỉ đọc, không tin body).
function userRef(req) {
  return req.user?.player_name || req.user?.username || req.user?.name || null;
}

async function resolveParticipant(req, body) {
  // Ưu tiên participantId đã có; nếu không, tra theo studentCode.
  if (body.participantId) return Number(body.participantId);
  const code = (body.studentCode || '').trim();
  if (!code) return null;
  const row = await getParticipant.get(code);
  return row ? Number(row.id) : null;
}

export function attachGpp(r) {
  // Mở màn Pharma Crush bằng mật khẩu (req #144, ThS Hương Lý). Mục đích SƯ PHẠM:
  // giảng viên nhảy thẳng tới màn cần dạy/demo mà không phải chơi lại từ đầu, còn
  // sinh viên vẫn đi tuần tự. Kiểm ở MÁY CHỦ để mật khẩu không nằm trong mã nguồn
  // trình duyệt (xem source là thấy thì hết tác dụng rào cản).
  // Đổi mật khẩu: đặt biến môi trường GPP_LEVEL_PASSWORD rồi khởi động lại.
  r.post('/api/gpp/unlock-level', async (req, res) => {
    const expected = process.env.GPP_LEVEL_PASSWORD || '123456';
    const given = String(req.body?.password || '');
    const level = Number(req.body?.level) || 0;
    if (given !== expected) return res.status(401).json({ error: 'Mật khẩu không đúng.' });
    res.json({ ok: true, level });
  });

  // Đăng ký / cập nhật người học (màn enroll). Trả participantId để client giữ.
  r.post('/api/gpp/enroll', async (req, res) => {
    try {
      const b = req.body || {};
      const code = (b.studentCode || '').trim();
      if (!code) return res.status(400).json({ ok: false, error: 'missing_student_code' });
      const yl = [2, 3].includes(Number(b.yearLevel)) ? Number(b.yearLevel) : null;
      const grp = ['exp', 'ctrl'].includes(b.studyGroup) ? b.studyGroup : null;
      const info = await upsertParticipant.run({
        student_code: code,
        full_name: (b.fullName || '').trim() || null,
        class_name: (b.className || '').trim() || null,
        year_level: yl,
        study_group: grp,
        user_ref: userRef(req),
        t: now(),
      });
      const participantId = info.lastInsertRowid;
      const s = sid();
      await insSession.run({ id: s, participant_id: participantId, t: now(), meta: jn({ ua: req.headers['user-agent'] || null }) });
      res.json({ ok: true, participantId, sessionId: s });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Ghi 1 sự kiện nhật ký hệ thống (fire-and-forget từ client).
  r.post('/api/gpp/event', async (req, res) => {
    try {
      const b = req.body || {};
      const pid = await resolveParticipant(req, b);
      await insEvent.run({
        session_id: b.sessionId || null,
        participant_id: pid,
        level: b.level ?? null,
        step_key: b.stepKey || null,
        action: b.action || null,
        correct: b.correct == null ? null : (b.correct ? 1 : 0),
        attempts: b.attempts ?? null,
        time_ms: b.timeMs ?? null,
        detail: jn(b.detail),
        t: now(),
      });
      res.json({ ok: true });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Chốt kết quả 1 cấp.
  r.post('/api/gpp/level-complete', async (req, res) => {
    try {
      const b = req.body || {};
      const pid = await resolveParticipant(req, b);
      const stepsTotal = Number(b.stepsTotal) || 0;
      const stepsPassed = Number(b.stepsPassed) || 0;
      const score = stepsTotal ? Math.round((stepsPassed / stepsTotal) * 1000) / 10 : Number(b.score) || 0;
      const passed = score >= 70 ? 1 : 0; // ngưỡng mở khoá (mastery)
      const info = await insLevelResult.run({
        session_id: b.sessionId || null,
        participant_id: pid,
        level: Number(b.level),
        passed,
        score,
        steps_total: stepsTotal,
        steps_passed: stepsPassed,
        duration_ms: b.durationMs ?? null,
        attempts_total: b.attemptsTotal ?? null,
        detail: jn(b.detail),
        t: now(),
      });
      res.json({ ok: true, id: info.lastInsertRowid, score, passed: !!passed });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Lưu bài đo trước/sau.
  r.post('/api/gpp/test', async (req, res) => {
    try {
      const b = req.body || {};
      const pid = await resolveParticipant(req, b);
      const n = Number(b.nQuestions) || (Array.isArray(b.answers) ? b.answers.length : 0);
      const nc = Number(b.nCorrect) || 0;
      const score10 = n ? Math.round((nc / n) * 100) / 10 : 0;
      const info = await insTest.run({
        participant_id: pid,
        session_id: b.sessionId || null,
        phase: b.phase === 'post' ? 'post' : 'pre',
        form_variant: ['A', 'B'].includes(b.formVariant) ? b.formVariant : null,
        year_level: [2, 3].includes(Number(b.yearLevel)) ? Number(b.yearLevel) : null,
        n_questions: n,
        n_correct: nc,
        score10,
        answers: jn(b.answers),
        t: now(),
      });
      res.json({ ok: true, id: info.lastInsertRowid, score10 });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Lưu thang đo cuối buổi (ARCS / tải nhận thức / SUS).
  r.post('/api/gpp/survey', async (req, res) => {
    try {
      const b = req.body || {};
      const pid = await resolveParticipant(req, b);
      const kind = ['arcs', 'clt', 'sus'].includes(b.kind) ? b.kind : null;
      if (!kind) return res.status(400).json({ ok: false, error: 'bad_kind' });
      const info = await insSurvey.run({
        participant_id: pid, session_id: b.sessionId || null,
        kind, items: jn(b.items), summary: jn(b.summary), t: now(),
      });
      res.json({ ok: true, id: info.lastInsertRowid });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Tiến trình của 1 người học (mở khoá cấp nào, điểm pre/post).
  r.get('/api/gpp/progress', async (req, res) => {
    try {
      const code = (req.query.studentCode || '').trim();
      if (!code) return res.status(400).json({ ok: false, error: 'missing_student_code' });
      const p = await getParticipant.get(code);
      if (!p) return res.json({ ok: true, participant: null, levels: [], tests: [] });
      const levels = await levelResultsForPid.all(p.id);
      const tests = await testsForPid.all(p.id);
      res.json({ ok: true, participant: { id: p.id, studentCode: p.student_code, className: p.class_name, yearLevel: p.year_level, studyGroup: p.study_group }, levels, tests });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // AI sinh 1 tình huống luyện tập bổ sung cho 1 cấp. LƯU Ý SƯ PHẠM: nội dung
  // AISinh mang tính LUYỆN TẬP ĐA DẠNG, gắn cờ needsReview để giảng viên duyệt
  // trước khi dùng vào lượng giá — không tự động tính vào điểm chính thức.
  r.post('/api/gpp/ai-scenario', async (req, res) => {
    try {
      const b = req.body || {};
      const level = Number(b.level);
      const briefs = {
        1: 'nhận biết và phân loại thuốc (đọc nhãn, nhóm tác dụng dược lý, ETC/OTC, mức quản lý)',
        2: 'kiểm nhập và kiểm soát chất lượng đầu vào (đối chiếu hoá đơn, cảm quan, xử lý hàng không đạt)',
        3: 'bảo quản và sắp xếp hàng hoá (điều kiện bảo quản, FEFO, nhóm dược lý)',
        4: 'kiểm kê và xử lý thuốc thu hồi (kiểm kê định kỳ, cách ly, ghi sổ, trả nhà cung ứng)',
      };
      const brief = briefs[level] || briefs[1];
      const system = 'Bạn là giảng viên Dược lâm sàng, soạn tình huống luyện tập tại cơ sở bán lẻ thuốc đạt chuẩn GPP ở Việt Nam. Chỉ dùng thuốc và quy định có thật, đúng chuyên môn. Trả về JSON.';
      const prompt = `Soạn 1 tình huống ngắn (2-4 câu) cho sinh viên Cao đẳng Dược luyện kỹ năng: ${brief}. Kèm 1 câu hỏi trắc nghiệm 4 phương án (chỉ 1 đúng) và giải thích ngắn. JSON dạng: {"situation":"...","question":"...","options":["A","B","C","D"],"answer":0,"explain":"..."}`;
      let out;
      try {
        const raw = await llmGenerate({ prompt, system, temperature: 0.5, json: true, maxTokens: 700 });
        out = typeof raw === 'string' ? JSON.parse(raw) : raw;
      } catch (e) {
        return res.json({ ok: false, error: 'ai_unavailable', detail: e.message });
      }
      if (!out || !Array.isArray(out.options) || out.options.length < 2) {
        return res.json({ ok: false, error: 'bad_ai_output' });
      }
      res.json({ ok: true, level, scenario: out, source: 'ai', needsReview: true });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // Export CSV cho nghiên cứu — CHỈ admin (dữ liệu chứa mã SV + điểm, không để lộ).
  r.get('/api/gpp/export.csv', requireAdmin, async (req, res) => {
    try {
      const rows = await db.prepare(`
        SELECT p.student_code, p.class_name, p.year_level, p.study_group,
               lr.level, lr.score, lr.passed, lr.duration_ms, lr.created_at
        FROM gpp_level_result lr JOIN gpp_participant p ON p.id = lr.participant_id
        ORDER BY p.student_code, lr.level, lr.created_at
      `).all();
      const head = 'student_code,class_name,year_level,study_group,level,score,passed,duration_ms,created_at';
      const body = rows.map(r => [r.student_code, r.class_name, r.year_level, r.study_group, r.level, r.score, r.passed, r.duration_ms, r.created_at]
        .map(v => v == null ? '' : String(v).replace(/[",\n]/g, ' ')).join(',')).join('\n');
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.send(head + '\n' + body);
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });
}
