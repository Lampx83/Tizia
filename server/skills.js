// ============================================================
// Skills context (Phase 2) — grant skills cho user khi đạt mốc, đọc cây năng lực.
//
// Catalog (competencies + skills) seed bởi server/db.js + scripts/migrate-skills-catalog.js.
// Mapping `space_id → [skill_codes]` đọc từ server/skills-mapping.json (sinh bởi script).
//
// Grant policy: score >= GRANT_THRESHOLD (mặc định 70). UNIQUE(user_id, skill_id) →
// 1 skill chỉ được tính lần đầu tiên đạt. Endpoint trả về `newly_granted` để FE
// hiện toast "Mở khoá kỹ năng: ...".
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAPPING_PATH = path.resolve(__dirname, 'skills-mapping.json');
const SCENARIO_MAP_PATH = path.resolve(__dirname, 'skills-scenario-map.json');

export const GRANT_THRESHOLD = Number(process.env.SKILLS_GRANT_THRESHOLD) || 70;
// Stars ≥ STAR_THRESHOLD đủ để grant nếu không có score (scenario stars 0-3).
const STAR_THRESHOLD = 2;
const VALID_SOURCE_TYPES = new Set(['attempt', 'scenario_run', 'lesson', 'mini_game', 'manual']);
const VALID_DOMAINS = new Set(['pharmacy', 'secondary', 'it', 'primary', 'preschool', 'highschool']);

// Load mapping at module init. Nếu file chưa tồn tại (chưa chạy migration) → log
// warning + dùng object rỗng → mọi grant call sẽ no-op cho tới khi mapping có.
let SPACE_SKILLS = {};
try {
  if (fs.existsSync(MAPPING_PATH)) {
    SPACE_SKILLS = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    const nKeys = Object.keys(SPACE_SKILLS).length;
    console.log(`[skills] loaded mapping: ${nKeys} space → skill_codes`);
  } else {
    console.warn(`[skills] mapping file missing — chạy: node scripts/migrate-skills-catalog.js`);
  }
} catch (e) {
  console.warn(`[skills] failed to load mapping: ${e.message}`);
}

// Load scenario→skill mapping. Cùng pattern với SPACE_SKILLS — empty object
// nếu file thiếu (no-op grants).
let SCENARIO_SKILLS = {};
try {
  if (fs.existsSync(SCENARIO_MAP_PATH)) {
    const raw = JSON.parse(fs.readFileSync(SCENARIO_MAP_PATH, 'utf8'));
    for (const k of Object.keys(raw)) if (!k.startsWith('_')) SCENARIO_SKILLS[k] = raw[k];
    console.log(`[skills] loaded scenario map: ${Object.keys(SCENARIO_SKILLS).length} familyId → skill_codes`);
  }
} catch (e) { console.warn(`[skills] scenario map load failed: ${e.message}`); }

// Reload mapping at runtime (admin hook nếu cần). Hiện chưa expose route, để
// dành Phase 4 khi có admin UI quản lý catalog.
export function reloadSkillsMapping() {
  try {
    SPACE_SKILLS = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    return Object.keys(SPACE_SKILLS).length;
  } catch (e) {
    console.warn(`[skills] reload failed: ${e.message}`);
    return 0;
  }
}

// ---- Prepared statements ----
const lookupSkillIdsByCodes = db.prepare(`
  SELECT id, code FROM skills WHERE code IN (SELECT jsonb_array_elements_text(?::jsonb))
`);

const insertUserSkill = db.prepare(`
  INSERT OR IGNORE INTO user_skills
    (user_id, skill_id, domain, earned_at, source_type, source_id, score)
  VALUES (@user_id, @skill_id, @domain, @earned_at, @source_type, @source_id, @score)
`);

// Cây skill HIỆN TẠI của user — chỉ trong bucket trường đang theo học. Khi đổi
// trường, bucket cũ vẫn còn nhưng filter loại ra → "sang trường mới làm lại từ
// đầu" theo yêu cầu của anh Lâm.
const getUserSkillsStmt = db.prepare(`
  SELECT
    s.id           AS skill_id,
    s.code         AS skill_code,
    s.name         AS skill_name,
    s.domain       AS skill_domain,
    s.grade_min,
    s.grade_max,
    c.id           AS competency_id,
    c.code         AS competency_code,
    c.name         AS competency_name,
    c.kind         AS competency_kind,
    c.sort_order   AS competency_sort,
    us.earned_at,
    us.source_type,
    us.source_id,
    us.score
  FROM user_skills us
  JOIN skills s       ON s.id = us.skill_id
  JOIN competencies c ON c.id = s.competency_id
  WHERE us.user_id = ? AND us.domain = ?
  ORDER BY c.sort_order, s.name
`);
// Lookup enrolled_domain cho fallback khi caller chưa thread domain.
const _userEnrolledDomainStmt = db.prepare(`SELECT enrolled_domain FROM users WHERE id = ?`);
async function _resolveSkillDomain(user_id, domain) {
  if (typeof domain === 'string') return domain;
  return (await _userEnrolledDomainStmt.get(Number(user_id)))?.enrolled_domain || '';
}

const listCompetenciesStmt = db.prepare(`
  SELECT id, code, kind, name, description, sort_order FROM competencies ORDER BY sort_order
`);

const countSkillsPerCompetencyStmt = db.prepare(`
  SELECT competency_id, COUNT(*) AS n FROM skills GROUP BY competency_id
`);

// ---- Public API ----

/**
 * Grant tất cả skill thuộc 1 space cho user. No-op nếu score < threshold.
 * Trả về { newly_granted: [{code,name,competency}], already_had: [...] }.
 */
export async function grantSkillsForSpace({ user_id, domain, space_id, score, source_type, source_id }) {
  if (!user_id) return { error: 'user_id required' };
  if (!VALID_DOMAINS.has(domain)) return { error: 'invalid domain' };
  if (!space_id) return { error: 'space_id required' };
  if (!Number.isFinite(score)) return { error: 'score must be number' };
  if (!VALID_SOURCE_TYPES.has(source_type)) return { error: 'invalid source_type' };

  if (score < GRANT_THRESHOLD) {
    return { granted_count: 0, skipped_reason: `score ${score} < threshold ${GRANT_THRESHOLD}` };
  }

  const key = `${domain}/${space_id}`;
  const codes = SPACE_SKILLS[key] || [];
  if (codes.length === 0) {
    return { granted_count: 0, skipped_reason: `no skills mapped for ${key}` };
  }

  const rows = await lookupSkillIdsByCodes.all(JSON.stringify(codes));
  if (rows.length === 0) {
    return { granted_count: 0, skipped_reason: `skill codes not found in DB (catalog out of sync?)` };
  }

  const now = Date.now();
  const newly = [];
  const already = [];
  // Skill được gắn cùng bucket = trường HS đang theo học. Vì grantSkillsForSpace
  // luôn nhận `domain` (trường của space) và Phase 2 sẽ chặn cross-domain ở
  // middleware → bucket grant chắc chắn khớp với enrolled_domain.
  const skillDomain = String(domain);
  const tx = db.transaction(async () => {
    for (const r of rows) {
      const info = await insertUserSkill.run({
        user_id,
        skill_id: r.id,
        domain: skillDomain,
        earned_at: now,
        source_type,
        source_id: source_id != null ? String(source_id).slice(0, 80) : null,
        score: Math.round(score),
      });
      if (info.changes > 0) newly.push(r.code);
      else already.push(r.code);
    }
  });
  await tx();

  // Enrich newly với name + competency cho FE hiện toast đẹp.
  const enriched = newly.length
    ? await db.prepare(`
        SELECT s.code, s.name, c.code AS comp_code, c.name AS comp_name
        FROM skills s JOIN competencies c ON c.id = s.competency_id
        WHERE s.code IN (SELECT jsonb_array_elements_text(?::jsonb))
      `).all(JSON.stringify(newly))
    : [];

  return {
    granted_count: newly.length,
    newly_granted: enriched,
    already_had_count: already.length,
  };
}

/**
 * Trả cây năng lực + tiến độ của 1 user.
 * Shape: [{ competency: {...}, total_skills, earned_skills: [...] }, ...]
 */
export async function getUserSkillTree(user_id, domain) {
  if (!user_id) return [];
  const d = await _resolveSkillDomain(user_id, domain);
  const allComps = await listCompetenciesStmt.all();
  const totals = Object.fromEntries(
    (await countSkillsPerCompetencyStmt.all()).map(r => [r.competency_id, r.n])
  );
  const earnedRows = await getUserSkillsStmt.all(user_id, d);

  // Group earned by competency_id
  const byComp = new Map();
  for (const r of earnedRows) {
    if (!byComp.has(r.competency_id)) byComp.set(r.competency_id, []);
    // mastery_pct: thang 0-100. Nếu source_type='scenario_run' với score được
    // grant → dùng score đó. Nếu earned mà score null (legacy grant) → 70 mặc
    // định (ngưỡng pass). Chưa earned → 0 (chỉ vào "earned_skills" nếu đã đạt
    // nên ở đây tối thiểu 70).
    const mastery = (r.score != null) ? Math.max(0, Math.min(100, r.score)) : 70;
    byComp.get(r.competency_id).push({
      code: r.skill_code,
      name: r.skill_name,
      domain: r.skill_domain,
      grade_min: r.grade_min,
      grade_max: r.grade_max,
      earned_at: r.earned_at,
      source_type: r.source_type,
      source_id: r.source_id,
      score: r.score,
      mastery_pct: mastery,
    });
  }

  return allComps.map(c => {
    const earned = byComp.get(c.id) || [];
    // Mastery competency = trung bình mastery_pct các skill đã đạt × (earned/total).
    // Cách này thưởng cho HS càng học sâu (mastery cao) VÀ càng học rộng (nhiều skill).
    const total = totals[c.id] || 0;
    const avgMastery = earned.length > 0
      ? earned.reduce((s, e) => s + e.mastery_pct, 0) / earned.length
      : 0;
    const coverage = total > 0 ? earned.length / total : 0;
    const compMastery = Math.round(avgMastery * coverage);
    return {
      competency: {
        code: c.code,
        kind: c.kind,
        name: c.name,
        description: c.description,
        sort_order: c.sort_order,
      },
      total_skills: total,
      earned_skills: earned,
      mastery_pct: compMastery,
      avg_mastery_pct: Math.round(avgMastery),
    };
  });
}

/**
 * Grant skills khi HS hoàn thành scenario. Gate: score ≥ threshold HOẶC stars ≥ 2.
 * Mapping familyId → skill_codes đọc từ skills-scenario-map.json. Idempotent qua
 * UNIQUE(user_id, skill_id). No-op nếu familyId chưa có mapping.
 */
export async function grantSkillsForScenario({ user_id, family_id, score, stars, domain }) {
  if (!user_id || !family_id) return { granted_count: 0, skipped_reason: 'missing args' };
  const codes = SCENARIO_SKILLS[family_id] || [];
  if (codes.length === 0) return { granted_count: 0, skipped_reason: `no mapping for ${family_id}` };

  const passByScore = Number.isFinite(score) && score >= GRANT_THRESHOLD;
  const passByStars = Number.isFinite(stars) && stars >= STAR_THRESHOLD;
  if (!passByScore && !passByStars) {
    return { granted_count: 0, skipped_reason: `score=${score} stars=${stars} dưới ngưỡng` };
  }

  const rows = await lookupSkillIdsByCodes.all(JSON.stringify(codes));
  if (rows.length === 0) return { granted_count: 0, skipped_reason: 'skill codes not found in DB' };

  // Bucket trường: caller có thể không truyền domain (scenario chung) → fallback
  // enrolled_domain của user. Middleware Phase 2 đã chặn cross-domain trước khi
  // tới đây nên bucket luôn khớp với trường HS đang theo học.
  const skillDomain = await _resolveSkillDomain(user_id, domain);
  const now = Date.now();
  const newly = [];
  const tx = db.transaction(async () => {
    for (const r of rows) {
      const info = await insertUserSkill.run({
        user_id,
        skill_id: r.id,
        domain: skillDomain,
        earned_at: now,
        source_type: 'scenario_run',
        source_id: String(family_id).slice(0, 80),
        score: passByScore ? Math.round(score) : null,
      });
      if (info.changes > 0) newly.push(r.code);
    }
  });
  await tx();
  return { granted_count: newly.length, newly_granted_codes: newly };
}

/**
 * Tổng đếm nhanh cho banner "Bạn đã đạt X/Y kỹ năng".
 */
export async function getUserSkillSummary(user_id, domain) {
  if (!user_id) return { earned: 0, total: 0 };
  const d = await _resolveSkillDomain(user_id, domain);
  const earned = (await db.prepare(`SELECT COUNT(*) AS n FROM user_skills WHERE user_id = ? AND domain = ?`).get(user_id, d)).n;
  const total = (await db.prepare(`SELECT COUNT(*) AS n FROM skills`).get()).n;
  return { earned, total };
}

/**
 * Trả về skill_codes của 1 space (cho FE highlight chip đã earned).
 */
export function getSpaceSkillCodes(domain, space_id) {
  return SPACE_SKILLS[`${domain}/${space_id}`] || [];
}

// ---- Express routes ----
export function attachSkills(router, { requireAuth, requireEnrolled }) {
  // GET /api/skills/me — cây năng lực của user đang login, lọc theo trường
  // user đang theo học (enrolled_domain). Skill earn ở trường cũ KHÔNG hiện.
  router.get('/api/skills/me', requireAuth, async (req, res) => {
    const d = req.user.enrolled_domain || '';
    const tree = await getUserSkillTree(req.user.id, d);
    const summary = await getUserSkillSummary(req.user.id, d);
    res.json({ summary, tree, enrolled_domain: d || null });
  });

  // GET /api/skills/space?domain=...&space_id=... — list skill_codes của 1 space
  // + flag earned cho FE render chip ✔.
  router.get('/api/skills/space', requireAuth, async (req, res) => {
    const domain = String(req.query.domain || '');
    const space_id = String(req.query.space_id || '');
    if (!VALID_DOMAINS.has(domain) || !space_id) {
      return res.status(400).json({ error: 'domain + space_id required' });
    }
    const codes = getSpaceSkillCodes(domain, space_id);
    if (codes.length === 0) return res.json({ skills: [] });
    const userDomain = req.user.enrolled_domain || '';
    const rows = await db.prepare(`
      SELECT s.code, s.name, c.code AS comp_code, c.name AS comp_name,
        EXISTS(SELECT 1 FROM user_skills us
               WHERE us.user_id = ? AND us.skill_id = s.id AND us.domain = ?) AS earned
      FROM skills s JOIN competencies c ON c.id = s.competency_id
      WHERE s.code IN (SELECT jsonb_array_elements_text(?::jsonb))
      ORDER BY c.sort_order, s.name
    `).all(req.user.id, userDomain, JSON.stringify(codes));
    res.json({ skills: rows.map(r => ({ ...r, earned: !!r.earned })) });
  });

  // POST /api/skills/grant — grant skills cho user khi đạt mốc 1 space.
  // Body: { domain, space_id, score, source_type, source_id? }.
  // score là 0..100. Server tự kiểm threshold + idempotent qua UNIQUE.
  router.post('/api/skills/grant', requireAuth, requireEnrolled, async (req, res) => {
    const b = req.body || {};
    const result = await grantSkillsForSpace({
      user_id: req.user.id,
      domain: String(b.domain || ''),
      space_id: String(b.space_id || ''),
      score: Number(b.score),
      source_type: String(b.source_type || 'manual'),
      source_id: b.source_id,
    });
    if (result.error) return res.status(400).json(result);
    res.json(result);
  });

  // GET /api/skills/catalog — toàn bộ catalog (public, không cần auth) để FE
  // render trang giới thiệu khung GDPT 2018.
  router.get('/api/skills/catalog', async (req, res) => {
    const comps = await listCompetenciesStmt.all();
    const skills = await db.prepare(`SELECT code, name, competency_id, domain, grade_min, grade_max FROM skills ORDER BY competency_id, name`).all();
    res.json({ competencies: comps, skills });
  });

  // GET /api/skills/child/:child_id — PH xem cây năng lực của 1 con.
  // Quyền: req.user phải là parent qua family_links. Trả 403 nếu không link.
  router.get('/api/skills/child/:child_id', requireAuth, async (req, res) => {
    const child_id = Number(req.params.child_id);
    if (!Number.isFinite(child_id)) return res.status(400).json({ error: 'invalid child_id' });
    const link = await db.prepare(`
      SELECT 1 FROM family_links WHERE parent_user_id = ? AND child_user_id = ? LIMIT 1
    `).get(req.user.id, child_id);
    if (!link && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'not_parent_of_child' });
    }
    const child = await db.prepare(`SELECT id, display_name, role, grade FROM users WHERE id = ?`).get(child_id);
    if (!child) return res.status(404).json({ error: 'child_not_found' });
    res.json({
      child: { id: child.id, display_name: child.display_name, role: child.role, grade: child.grade },
      summary: await getUserSkillSummary(child_id),
      tree: await getUserSkillTree(child_id),
    });
  });

  // GET /api/skills/class/:class_code — GV xem tổng hợp năng lực của lớp.
  // Quyền: chỉ teacher (role=teacher) đã tạo class đó hoặc admin. Trả về:
  //   { class, members: [{ display_name, summary: {earned,total} }], aggregate: tree }
  // aggregate roll-up theo display_name → user_id (link qua users.display_name).
  router.get('/api/skills/class/:class_code', requireAuth, async (req, res) => {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'teacher_only' });
    }
    const class_code = String(req.params.class_code || '').trim().slice(0, 16);
    if (!class_code) return res.status(400).json({ error: 'class_code required' });
    const cls = await db.prepare(`SELECT id, code, name, teacher_name, created_at FROM classes WHERE code = ?`).get(class_code);
    if (!cls) return res.status(404).json({ error: 'class_not_found' });

    // Đếm rough quyền: GV chỉ xem được class do mình tạo (teacher_name khớp
    // display_name). Admin xem tất cả. Không khớp → 403.
    if (req.user.role === 'teacher' && cls.teacher_name !== req.user.display_name) {
      return res.status(403).json({ error: 'not_class_teacher' });
    }

    // Tìm HS trong lớp: lấy distinct player_name từ attempts có class_code,
    // join với users để lấy user_id. Có player guest (không có user_id) → skip.
    const members = await db.prepare(`
      SELECT u.id AS user_id, u.display_name, u.grade,
        (SELECT COUNT(*) FROM user_skills WHERE user_id = u.id) AS earned
      FROM (SELECT DISTINCT player_name FROM attempts WHERE class_code = ?) p
      JOIN users u ON u.display_name = p.player_name
      ORDER BY earned DESC, u.display_name
    `).all(class_code);
    const total = (await db.prepare(`SELECT COUNT(*) AS n FROM skills`).get()).n;
    res.json({
      class: cls,
      total_skills: total,
      members: members.map(m => ({
        user_id: m.user_id,
        display_name: m.display_name,
        grade: m.grade,
        summary: { earned: m.earned, total },
      })),
    });
  });
}
