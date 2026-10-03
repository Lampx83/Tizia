#!/usr/bin/env node
// ============================================================
// Skills catalog migration
// Parse public/space.html → trích `skills:[...]` của từng space (5 domain) →
// INSERT vào bảng `skills` (+ ghi file `server/skills-mapping.json` để
// skills.js wire grant-logic). Heuristic gán competency_id theo từ khóa.
//
// Idempotent: skill.code = `${domain}__${space_id}__${slug(name)}`, dùng
// INSERT OR IGNORE. Chạy lại = chỉ thêm row mới.
//
// Usage:
//   node scripts/migrate-skills-catalog.js          # chạy thật
//   node scripts/migrate-skills-catalog.js --dry    # chỉ in ra, không INSERT
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../server/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SPACE_HTML = path.resolve(__dirname, '..', 'public', 'space.html');
// Highschool space defs nằm tách ra public/js/spaces-highschool.js (window-attached
// để không phình space.html). Migrator nối nội dung 2 file rồi parse chung — cùng
// định dạng `const SPACES_X = {...};` nên parser không cần đổi.
const SPACES_HS  = path.resolve(__dirname, '..', 'public', 'js', 'spaces-highschool.js');
const MAPPING_OUT = path.resolve(__dirname, '..', 'server', 'skills-mapping.json');

const DRY = process.argv.includes('--dry');

// Domain → grade range. Mỗi domain dùng cấp học khác nhau:
//   preschool = mầm non (grade 0), primary = 1-5, secondary = 6-9,
//   highschool = 10-12, it/pharmacy = ĐH (NULL).
const DOMAIN_BLOCKS = [
  { var: 'SPACES_PHARMACY',   domain: 'pharmacy',   grade_min: null, grade_max: null },
  { var: 'SPACES_SECONDARY',  domain: 'secondary',  grade_min: 6,    grade_max: 9    },
  { var: 'SPACES_IT',         domain: 'it',         grade_min: null, grade_max: null },
  { var: 'SPACES_PRIMARY',    domain: 'primary',    grade_min: 1,    grade_max: 5    },
  { var: 'SPACES_PRESCHOOL',  domain: 'preschool',  grade_min: 0,    grade_max: 0    },
  { var: 'SPACES_HIGHSCHOOL', domain: 'highschool', grade_min: 10,   grade_max: 12   },
];

// ---- Heuristic: skill text → competency code ----
// Thứ tự QUAN TRỌNG: rule khớp đầu tiên thắng. Để rule cụ thể trước rule chung.
const COMPETENCY_RULES = [
  // Phẩm chất (mang tính giá trị/đạo đức)
  { code: 'PC_YEU_NUOC',    re: /yêu nước|truyền thống|lịch sử|tự hào|danh nhân|bác hồ|đội viên|gìn giữ/i },
  { code: 'PC_NHAN_AI',     re: /nhân ái|lễ phép|ứng xử|văn minh|cảm ơn|đoàn kết|giúp đỡ|tôn trọng/i },
  { code: 'PC_CHAM_CHI',    re: /chăm chỉ|kiên trì|ham học|luyện đề|duy trì động lực|tự luyện/i },
  { code: 'PC_TRUNG_THUC',  re: /trung thực|đạo đức|liêm chính|thật thà/i },
  { code: 'PC_TRACH_NHIEM', re: /trách nhiệm|nội quy|môi trường|bảo vệ|an toàn (số|phòng|thuốc|chơi|vận động)|qc\/qa|gmp|gpp|cảnh giác/i },
  // Năng lực chuyên môn (chuyên sâu)
  { code: 'NL_TIN_HOC',     re: /tin học|internet|máy tính|clean code|\bgit\b|debug|html|css|\bjs\b|javascript|framework|cloud|container|ci\/cd|\bml\b|machine learning|open ?source|mật mã|owasp|cntt|công nghệ thông tin|cấu trúc dữ liệu|thuật toán|big-?o|sql|csdl|cơ sở dữ liệu|osi|tcp|ip address|địa chỉ ip|responsive|a11y|mobile dev|mvp|cấu trúc dl/i },
  { code: 'NL_CONG_NGHE',   re: /công nghệ|stem|dự án|mô hình kinh doanh|kỹ thuật (đời sống|chuẩn độ|vô khuẩn)|hackathon|quy trình bào chế|8 dạng thuốc|đăng ký thuốc|đấu thầu|ctd|tlc|định lượng|phương pháp|kiểm nghiệm|dụng cụ/i },
  { code: 'NL_KHOA_HOC',    re: /khoa học|thí nghiệm|quan sát|hiện tượng|tự nhiên|hoá|sinh học|vật lý|dược lý|dược điển|pháp chế|drp|soap|\bpk\b|tdm|atc|kháng sinh|adr|dược liệu|hoạt chất|yhct|cấp cứu|dược lâm sàng/i },
  { code: 'NL_NGON_NGU',    re: /ngôn ngữ|đọc[\s–-]?hiểu|đọc – hiểu|đọc và hiểu|viết (đoạn|đoạn văn|học thuật|báo cáo)|từ vựng|tiếng anh|thuật ngữ|văn hoá đọc|mẫu câu|đoạn văn|phản xạ giao tiếp|mở rộng vốn từ|biết đọc|báo cáo khoa học|báo cáo (khoa học|nghiên cứu)/i },
  { code: 'NL_TINH_TOAN',   re: /đếm|cộng|trừ|nhân|chia|số (thập phân|nguyên)|phần trăm|phân số|hình học|thống kê|nghiên cứu|tư duy logic|biến đổi đại số|hình tròn|hình vuông|hình tam giác|so sánh nhiều\/ít|nhiều\/ít/i },
  { code: 'NL_THAM_MY',     re: /vẽ|nghệ thuật|màu|pha màu|đàn|nhạc|nốt nhạc|hát|cảm thụ|thẩm mỹ|sáng tạo nghệ thuật/i },
  { code: 'NL_THE_CHAT',    re: /vận động|thể thao|cpr|aed|sức khoẻ|ăn uống|vệ sinh|sơ cứu|tự chăm sóc|lối sống|cân bằng (học|học tập)|nề nếp|chơi (an toàn|đoàn kết)/i },
  // Năng lực chung (tổng quát)
  { code: 'NL_GIAO_TIEP',   re: /thuyết trình|làm việc nhóm|giao tiếp|segue|osce|tinh thần (đồng đội|hackathon)|sinh hoạt tập thể|tham gia xây dựng/i },
  { code: 'NL_GQVD',        re: /tư duy (lâm sàng|phòng thủ|giải thuật|thuật toán|làm dự án)|sáng tạo|giải quyết vấn đề|phân tích|phản biện|tương tác|xử trí|sàng lọc|cờ đỏ|phát hiện/i },
  { code: 'NL_TU_CHU',      re: /tự (học|chủ|quản lý)|mục tiêu|smart|kế hoạch|portfolio|định hướng nghề|làm quen|sẵn sàng|bắt đầu|hiểu (cơ cấu|chương trình|nội dung|chương trình đào tạo|mô hình|lịch sử ngành|nội quy)|nắm lý thuyết|tổng hợp kiến thức|biết|đọc tài liệu|tra cứu|ebm/i },
];

const DEFAULT_COMPETENCY = 'NL_TU_CHU'; // fallback nếu không khớp rule nào

function mapToCompetency(skillName) {
  for (const r of COMPETENCY_RULES) {
    if (r.re.test(skillName)) return r.code;
  }
  return DEFAULT_COMPETENCY;
}

// Slugify tiếng Việt: bỏ dấu, chuyển ký tự đặc biệt → underscore, lowercase.
function slugify(s) {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // bỏ dấu
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60);
}

// Parse một block `const SPACES_X = { ... };` để lấy cặp (space_id, skills[]).
// Cách parse: với mỗi domain block, tìm các pattern `<id>:{...skills:[...],...}`.
// Chiến lược: chia file theo `^\s\s<id>:\{emoji:` (mỗi space bắt đầu bằng 2-space
// indent + key + ':{emoji:'). Trong từng đoạn, tìm `skills:[...]` đầu tiên.
function parseDomainBlock(src, varName) {
  const startIdx = src.indexOf(`const ${varName} = {`);
  if (startIdx < 0) {
    console.warn(`[parse] không tìm thấy ${varName}`);
    return [];
  }
  // Tìm dấu `};` đóng object (tìm cấp 1 vì regex không đủ; ta scan thủ công).
  let depth = 0, i = startIdx + `const ${varName} = `.length, end = -1;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end < 0) {
    console.warn(`[parse] không tìm thấy } đóng cho ${varName}`);
    return [];
  }
  const block = src.slice(startIdx, end);

  // Mỗi space bắt đầu bằng "  <id>:{emoji:" (2 space indent).
  const SPACE_RE = /\n {2}([a-z][a-zA-Z0-9_-]*)\s*:\s*\{emoji:/g;
  const matches = [];
  let m;
  while ((m = SPACE_RE.exec(block)) !== null) {
    matches.push({ id: m[1], start: m.index });
  }
  // skills:[...] gần nhất sau mỗi vị trí
  const SKILLS_RE = /skills\s*:\s*\[([^\]]+)\]/;
  const out = [];
  for (let k = 0; k < matches.length; k++) {
    const s = matches[k].start;
    const e = k + 1 < matches.length ? matches[k + 1].start : block.length;
    const seg = block.slice(s, e);
    const sm = SKILLS_RE.exec(seg);
    if (!sm) {
      console.warn(`[parse] ${varName}.${matches[k].id} không có skills:[]`);
      continue;
    }
    // sm[1] = 'A','B','C' — tách bằng regex 'X' literal.
    const skills = [];
    const STR_RE = /'((?:[^'\\]|\\.)*)'/g;
    let sm2;
    while ((sm2 = STR_RE.exec(sm[1])) !== null) {
      skills.push(sm2[1].replace(/\\'/g, "'"));
    }
    out.push({ space_id: matches[k].id, skills });
  }
  return out;
}

// ---- main ----
const src = fs.readFileSync(SPACE_HTML, 'utf8');
// spaces-highschool.js dùng `window.SPACES_HIGHSCHOOL = {...}` thay vì
// `const SPACES_HIGHSCHOOL`. Normalise để parser cùng pattern.
let hsSrc = '';
try {
  hsSrc = fs.readFileSync(SPACES_HS, 'utf8')
    .replace(/window\.SPACES_HIGHSCHOOL\s*=\s*\{/, 'const SPACES_HIGHSCHOOL = {');
} catch (e) { console.warn(`[parse] không đọc được ${SPACES_HS}: ${e.message}`); }
const html = src + '\n' + hsSrc;

const compStmt = db.prepare(`SELECT code, id FROM competencies`);
const COMP_BY_CODE = Object.fromEntries((await compStmt.all()).map(r => [r.code, r.id]));
if (Object.keys(COMP_BY_CODE).length === 0) {
  console.error('[fatal] bảng competencies chưa được seed — chạy server lần đầu để init schema trước.');
  process.exit(1);
}

// Load overrides (manual map fix các trường hợp heuristic sai). File có thể
// không tồn tại ở repo cũ; skill nào không có override sẽ dùng heuristic.
const OVERRIDES_PATH = path.resolve(__dirname, '..', 'server', 'skills-overrides.json');
let OVERRIDES = {};
try {
  if (fs.existsSync(OVERRIDES_PATH)) {
    const raw = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
    // Bỏ key meta-doc (_doc, _format) chỉ giữ skill_code → comp_code thực.
    for (const k of Object.keys(raw)) {
      if (!k.startsWith('_')) OVERRIDES[k] = raw[k];
    }
    console.log(`[overrides] loaded ${Object.keys(OVERRIDES).length} skill override`);
  }
} catch (e) { console.warn(`[overrides] failed to load: ${e.message}`); }

const insertSkill = db.prepare(`
  INSERT INTO skills (code, name, competency_id, domain, grade_min, grade_max, description, created_at)
  VALUES (@code, @name, @competency_id, @domain, @grade_min, @grade_max, @description, @created_at) ON CONFLICT DO NOTHING
`);
// UPDATE để áp override lên row đã insert lần trước (idempotent — nếu
// competency_id đã đúng thì UPDATE no-op về mặt logic).
const updateCompetency = db.prepare(`UPDATE skills SET competency_id = ? WHERE code = ?`);

const mapping = {}; // { 'pharmacy/admin': ['code1','code2',...], ... }
const stats = { domains: 0, spaces: 0, skills: 0, byCompetency: {} };

const runTx = db.transaction(async (rows) => {
  for (const r of rows) await insertSkill.run(r);
});

const allRows = [];
for (const blk of DOMAIN_BLOCKS) {
  const spaces = parseDomainBlock(html, blk.var);
  if (spaces.length === 0) continue;
  stats.domains++;
  for (const sp of spaces) {
    stats.spaces++;
    const codes = [];
    for (const skillName of sp.skills) {
      const skillCode = `${blk.domain}__${sp.space_id}__${slugify(skillName)}`;
      // Override THẮNG heuristic. Nếu override trỏ tới comp không tồn tại → log + fallback.
      const overrideCode = OVERRIDES[skillCode];
      const heuristicCode = mapToCompetency(skillName);
      const compCode = overrideCode && COMP_BY_CODE[overrideCode] ? overrideCode : heuristicCode;
      const compId = COMP_BY_CODE[compCode];
      if (!compId) { console.warn(`[skip] không có competency ${compCode}`); continue; }
      codes.push(skillCode);
      stats.byCompetency[compCode] = (stats.byCompetency[compCode] || 0) + 1;
      stats.skills++;
      allRows.push({
        code: skillCode,
        name: skillName,
        competency_id: compId,
        domain: blk.domain,
        grade_min: blk.grade_min,
        grade_max: blk.grade_max,
        description: null,
        created_at: Date.now(),
      });
    }
    mapping[`${blk.domain}/${sp.space_id}`] = codes;
  }
}

if (!DRY) {
  await runTx(allRows);
  // Áp override LẦN HAI cho row đã tồn tại từ migration lần trước (UPDATE).
  // INSERT OR IGNORE phía trên không update row có code đã tồn tại.
  let updated = 0;
  const updateTx = db.transaction(async () => {
    for (const [code, compCode] of Object.entries(OVERRIDES)) {
      const compId = COMP_BY_CODE[compCode];
      if (!compId) continue;
      const r = await updateCompetency.run(compId, code);
      if (r.changes > 0) updated++;
    }
  });
  await updateTx();
  console.log(`[overrides] applied ${updated} UPDATE qua catalog cũ`);
  fs.writeFileSync(MAPPING_OUT, JSON.stringify(mapping, null, 2) + '\n');
  console.log(`[ok] đã ghi mapping → ${path.relative(process.cwd(), MAPPING_OUT)}`);
}

console.log('\n=== Tổng kết ===');
console.log(`Domains parsed : ${stats.domains}/${DOMAIN_BLOCKS.length}`);
console.log(`Spaces         : ${stats.spaces}`);
console.log(`Skills         : ${stats.skills}  ${DRY ? '(DRY-RUN)' : '(inserted via INSERT OR IGNORE)'}`);
console.log('Phân bố theo competency:');
for (const code of Object.keys(stats.byCompetency).sort()) {
  console.log(`  ${code.padEnd(18)} ${stats.byCompetency[code]}`);
}

// In ra vài mapping mẫu để spot-check
console.log('\nMapping mẫu (5 space đầu):');
const sampleKeys = Object.keys(mapping).slice(0, 5);
for (const k of sampleKeys) {
  console.log(`  ${k}`);
  for (const code of mapping[k]) console.log(`    └─ ${code}`);
}

// Kiểm tra "fallback rate" — bao nhiêu skill rớt vào DEFAULT (NL_TU_CHU)?
// Nếu >40% thì heuristic cần chỉnh tay thêm rule.
const total = stats.skills || 1;
const fallback = stats.byCompetency[DEFAULT_COMPETENCY] || 0;
const pct = ((fallback / total) * 100).toFixed(1);
console.log(`\nFallback (→ ${DEFAULT_COMPETENCY}): ${fallback}/${total} = ${pct}%`);
if (fallback / total > 0.4) {
  console.warn('⚠️ Fallback rate cao — xem lại COMPETENCY_RULES.');
}
