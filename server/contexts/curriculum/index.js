// ============================================================
// Curriculum context — content học (quiz + lý thuyết) lưu trong DB.
// ============================================================
// Trước đây toàn bộ scenario (đề quiz + bài lý thuyết tuần) hardcode trong
// public/js/scenarios/lop*/*.js và FE import trực tiếp. Context này đưa content
// vào bảng curriculum_content để:
//   - Sửa nóng 1 câu sai mà KHÔNG cần deploy lại code.
//   - GV/admin CRUD content qua API/UI.
//   - Query xuyên hệ thống (vd "mọi câu về hàm số bậc 2").
//
// Nguồn gốc (source):
//   - 'seed'  : sinh từ file JS gốc (seed-curriculum.mjs). Re-seed ghi đè được.
//   - 'admin' : GV/admin sửa qua UI. Re-seed KHÔNG ghi đè (giữ bản sửa tay).
//   - 'ai'    : sinh thêm bởi AI lúc chạy (tương lai).
//
// FE đọc qua /api/curriculum/* (Phase 3) nhưng vẫn fallback import JS nếu API
// lỗi/chưa seed → app không bao giờ vỡ.
// ============================================================

import { db } from '../../db.js';
import { requireAuth } from '../identity/auth.js';
import { requireAdmin } from '../admin/index.js';

// Suy ra (domain, grade) TUYỆT ĐỐI từ prefix id scenario.
//   H10/H11/H12 → highschool 10/11/12 · P1..P5 → primary 1..5
//   S6..S9 → secondary 6..9 · N1/N2/N3 → preschool (grade 0)
//   còn lại (L, PS, SC, LR, CP, GC, year…) → pharmacy/other, grade null.
export function deriveGradeDomain(id) {
  const s = String(id || '');
  let m;
  if ((m = s.match(/^H(10|11|12)/)))   return { domain: 'highschool', grade: +m[1] };
  if ((m = s.match(/^P([1-5])(?![0-9])/))) return { domain: 'primary', grade: +m[1] };
  if ((m = s.match(/^S([6-9])(?![0-9])/))) return { domain: 'secondary', grade: +m[1] };
  if (/^N[1-3](?![0-9])/.test(s))      return { domain: 'preschool', grade: 0 };
  return { domain: 'pharmacy', grade: null };   // Dược + practice/skill/library/career/game
}

// ── Upsert 1 scenario ──
// Re-seed (source='seed') KHÔNG đè bản đã sửa tay (source='admin'): ON CONFLICT
// chỉ update khi bản hiện tại không phải 'admin'. Bản 'admin'/'ai' upsert thẳng.
const upsertSeedStmt = db.prepare(`
  INSERT INTO curriculum_content (id, subject, year_level, semester, week, kind, title, body, domain, grade, source, active, updated_at)
  VALUES (@id, @subject, @year_level, @semester, @week, @kind, @title, @body, @domain, @grade, 'seed', 1, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    subject=@subject, year_level=@year_level, semester=@semester, week=@week,
    kind=@kind, title=@title, body=@body, domain=@domain, grade=@grade, updated_at=@updated_at
  WHERE curriculum_content.source <> 'admin'
`);
const upsertEditStmt = db.prepare(`
  INSERT INTO curriculum_content (id, subject, year_level, semester, week, kind, title, body, domain, grade, source, active, updated_at)
  VALUES (@id, @subject, @year_level, @semester, @week, @kind, @title, @body, @domain, @grade, @source, @active, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    subject=@subject, year_level=@year_level, semester=@semester, week=@week,
    kind=@kind, title=@title, body=@body, domain=@domain, grade=@grade, source=@source, active=@active, updated_at=@updated_at
`);

function rowFromScenario(sc, source = 'seed', active = 1) {
  const { domain, grade } = deriveGradeDomain(sc.id);
  return {
    id:         sc.id,
    subject:    sc.subject ?? null,
    year_level: Number.isFinite(sc.yearLevel) ? sc.yearLevel : null,
    semester:   Number.isFinite(sc.semester) ? sc.semester : null,
    week:       Number.isFinite(sc.week) ? sc.week : null,
    kind:       sc.kind ?? 'quiz',
    title:      sc.title ?? null,
    body:       JSON.stringify(sc),
    domain,
    grade,
    source,
    active,
    updated_at: Date.now(),
  };
}

/** Upsert 1 scenario. source='seed' giữ nguyên bản admin đã sửa. */
export async function upsertContent(scenario, source = 'seed') {
  if (!scenario?.id) return { ok: false, reason: 'no_id' };
  const row = rowFromScenario(scenario, source);
  if (source === 'seed') await upsertSeedStmt.run(row);
  else await upsertEditStmt.run(row);
  return { ok: true, id: scenario.id };
}

/** Seed nhiều scenario trong 1 transaction. Trả số bản ghi xử lý. */
export const seedMany = db.transaction(async (scenarios, source = 'seed') => {
  let n = 0;
  for (const sc of scenarios) {
    if ((await upsertContent(sc, source)).ok) n++;
  }
  return n;
});

// ── Đọc ──
const getByIdStmt = db.prepare(`SELECT body FROM curriculum_content WHERE id = ? AND active = 1`);
const getByModuleStmt = db.prepare(`
  SELECT body FROM curriculum_content
   WHERE active = 1 AND id LIKE ? ESCAPE '\\'
   ORDER BY id ASC
`);
const countStmt = db.prepare(`SELECT COUNT(*) AS c FROM curriculum_content WHERE active = 1`);

function likePrefix(moduleId) {
  // moduleId-… ; escape % _ \ trong moduleId để LIKE an toàn
  const esc = String(moduleId).replace(/[\\%_]/g, c => '\\' + c);
  return esc + '-%';
}

export async function getContentById(id) {
  const row = await getByIdStmt.get(id);
  return row ? JSON.parse(row.body) : null;
}

export async function getContentForModule(moduleId) {
  return (await getByModuleStmt.all(likePrefix(moduleId))).map(r => JSON.parse(r.body));
}

const getByGradeStmt = db.prepare(`
  SELECT body FROM curriculum_content
   WHERE active = 1 AND domain = ? AND grade = ?
   ORDER BY id ASC
`);
export async function getContentForGrade(domain, grade) {
  return (await getByGradeStmt.all(domain, grade)).map(r => JSON.parse(r.body));
}

export async function curriculumCount() {
  return (await countStmt.get()).c;
}

// ── Chỉ mục nhẹ cho trang nội dung công khai (SEO) ──
// Trang /on-tap chỉ cần tiêu đề + chương + số câu, KHÔNG cần cả `body`. Nếu bê
// nguyên /api/curriculum/grade/:domain/:grade thì mỗi lượt xem kéo ~6MB JSON —
// vừa chậm vừa vô nghĩa. Query này rút thẳng vài trường từ JSON trong Postgres.
const getIndexForGradeStmt = db.prepare(`
  SELECT id,
         subject,
         title,
         year_level,
         (body::json ->> 'chapter')                AS chapter,
         (body::json ->> 'boss')                   AS boss,
         -- Bài nào thiếu mảng questions thì trả 0 thay vì làm vỡ cả câu query.
         CASE WHEN json_typeof(body::json -> 'questions') = 'array'
              THEN json_array_length(body::json -> 'questions')
              ELSE 0 END                           AS question_count
    FROM curriculum_content
   WHERE active = 1 AND domain = ? AND grade = ? AND kind = 'quiz'
   ORDER BY subject ASC, id ASC
`);

/** Danh sách bài của một (cấp học, khối lớp) — chỉ metadata, không kèm câu hỏi. */
export async function getCurriculumIndex(domain, grade) {
  const rows = await getIndexForGradeStmt.all(domain, grade);
  return rows.map((r) => ({
    id: r.id,
    subject: r.subject,
    title: r.title,
    chapter: r.chapter || null,
    yearLevel: r.year_level ?? null,
    boss: r.boss === 'true',
    questionCount: Number(r.question_count) || 0,
  }));
}

// ── API ──
export async function attachCurriculum(router) {
  // Chỉ mục nhẹ — dùng cho trang ôn tập công khai (crawlable). Public như các
  // route GET khác của curriculum (xem PUBLIC_PATH_PREFIXES ở identity/auth.js).
  router.get('/api/curriculum/index/:domain/:grade', async (req, res) => {
    const grade = Number(req.params.grade);
    if (!Number.isFinite(grade)) return res.status(400).json({ error: 'bad_grade' });
    const items = await getCurriculumIndex(req.params.domain, grade);
    // Content ít đổi → cho phép CDN/proxy cache 1 giờ, đỡ tải cho DB.
    res.set('Cache-Control', 'public, max-age=3600');
    res.json({ ok: true, items, count: items.length });
  });

  // FE đọc danh sách scenario của 1 module (thay getScenariosForModule).
  router.get('/api/curriculum/module/:moduleId', async (req, res) => {
    const items = await getContentForModule(req.params.moduleId);
    res.json({ ok: true, items, source: 'db' });
  });

  // FE đọc toàn bộ content của 1 (domain, grade) — thay import('/js/scenarios/lopN').
  router.get('/api/curriculum/grade/:domain/:grade', async (req, res) => {
    const grade = Number(req.params.grade);
    if (!Number.isFinite(grade)) return res.status(400).json({ error: 'bad_grade' });
    const items = await getContentForGrade(req.params.domain, grade);
    res.json({ ok: true, items, source: 'db' });
  });

  // FE đọc 1 scenario theo id.
  router.get('/api/curriculum/:id', async (req, res) => {
    const sc = await getContentById(req.params.id);
    if (!sc) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true, item: sc });
  });

  // ── Admin CRUD ──
  // Sửa nóng 1 scenario (đề + lesson). Body = scenario JSON đầy đủ.
  router.put('/api/curriculum/:id', requireAdmin, async (req, res) => {
    const sc = req.body?.scenario || req.body;
    if (!sc || sc.id !== req.params.id) {
      return res.status(400).json({ error: 'id_mismatch', message: 'scenario.id phải khớp :id' });
    }
    await upsertContent(sc, 'admin');
    res.json({ ok: true, id: sc.id, source: 'admin' });
  });

  // Tạo mới (admin).
  router.post('/api/curriculum', requireAdmin, async (req, res) => {
    const sc = req.body?.scenario || req.body;
    if (!sc?.id) return res.status(400).json({ error: 'no_id' });
    await upsertContent(sc, 'admin');
    res.json({ ok: true, id: sc.id, source: 'admin' });
  });

  // Soft-delete (admin) — ẩn khỏi FE, không xoá hẳn để khôi phục được.
  router.delete('/api/curriculum/:id', requireAdmin, async (req, res) => {
    const info = await db.prepare(`UPDATE curriculum_content SET active = 0, updated_at = ? WHERE id = ?`)
      .run(Date.now(), req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'not_found' });
    res.json({ ok: true, id: req.params.id });
  });

  console.log(`[curriculum] routes mounted: /api/curriculum/* (đang có ${await curriculumCount()} content trong DB)`);
}
