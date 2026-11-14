const fs = require('fs');
const ROOT = require('path').join(__dirname, '..');
const sql = fs.readFileSync(ROOT + '/server/schema.sql', 'utf8');

// ---- parse tables ----
const tables = {};
const re = /CREATE TABLE IF NOT EXISTS\s+"?(\w+)"?\s*\(([\s\S]*?)\n\);/g;
let m;
while ((m = re.exec(sql))) {
  const name = m[1];
  if (tables[name]) continue;
  const cols = [];
  const pkComposite = [];
  for (let raw of m[2].split('\n')) {
    let line = raw.replace(/--.*$/, '').trim().replace(/,$/, '');
    if (!line) continue;
    let mm;
    if ((mm = line.match(/^PRIMARY KEY\s*\(([^)]*)\)/i))) { mm[1].split(',').forEach(c => pkComposite.push(c.trim())); continue; }
    if (/^UNIQUE\s*\(/i.test(line)) continue;
    const parts = line.split(/\s+/);
    const cname = parts[0];
    let type = parts[1].toLowerCase();
    if (type === 'double') type = 'double';
    type = type.replace(/[(),]/g, '');
    cols.push({ name: cname, type, pk: /PRIMARY KEY/i.test(line), uk: /\bUNIQUE\b/i.test(line) });
  }
  cols.forEach(c => { if (pkComposite.includes(c.name)) c.pk = true; });
  tables[name] = cols;
}

// ---- relationships: [parent, child, childCol, label, real] ----
const R = (p, c, col, label, real) => ({ p, c, col, label, real });
const rels = [
  // --- FK thật (có ràng buộc trong DB) ---
  R('users', 'sessions', 'user_id', 'có phiên', 1),
  R('users', 'oauth_identities', 'user_id', 'liên kết OAuth', 1),
  R('users', 'school_admins', 'user_id', 'là admin trường', 1),
  R('users', 'school_admins', 'granted_by', 'cấp quyền', 1),
  R('users', 'user_domain_grants', 'user_id', 'được cấp', 1),
  R('users', 'user_domain_grants', 'granted_by', 'cấp bởi', 1),
  R('users', 'family_links', 'parent_user_id', 'phụ huynh', 1),
  R('users', 'family_links', 'child_user_id', 'con', 1),
  R('users', 'user_wallets', 'user_id', 'ví theo domain', 1),
  R('users', 'user_state', 'user_id', 'trạng thái KV', 1),
  R('users', 'user_pet', 'user_id', 'nuôi pet', 1),
  R('users', 'user_inventory', 'user_id', 'sở hữu', 1),
  R('shop_items', 'user_inventory', 'item_id', 'được mua', 1),
  R('users', 'daily_login', 'user_id', 'điểm danh', 1),
  R('users', 'engagement_state', 'user_id', 'streak / tim', 1),
  R('users', 'engagement_daily_quests', 'user_id', 'nhiệm vụ ngày', 1),
  R('users', 'bp_progress', 'user_id', 'tiến độ BP', 1),
  R('bp_seasons', 'bp_progress', 'season_id', 'mùa', 1),
  R('league_seasons', 'league_groups', 'season_id', 'chia nhóm', 1),
  R('league_seasons', 'league_memberships', 'season_id', 'mùa', 1),
  R('league_groups', 'league_memberships', 'group_id', 'nhóm', 1),
  R('users', 'league_memberships', 'user_id', 'thi đấu', 1),
  R('users', 'league_user_tier', 'user_id', 'hạng hiện tại', 1),
  R('users', 'team_quests', 'creator_id', 'tạo', 1),
  R('team_quests', 'team_quest_contribs', 'team_quest_id', 'đóng góp', 1),
  R('users', 'team_quest_contribs', 'user_id', 'đóng góp', 1),
  R('users', 'ugc_quests', 'creator_id', 'tạo', 1),
  R('ugc_quests', 'ugc_plays', 'quest_id', 'lượt chơi', 1),
  R('users', 'ugc_plays', 'user_id', 'chơi', 1),
  R('ugc_quests', 'ugc_likes', 'quest_id', 'được thích', 1),
  R('users', 'ugc_likes', 'user_id', 'thích', 1),
  R('ugc_quests', 'ugc_flags', 'quest_id', 'bị báo cáo', 1),
  R('users', 'ugc_flags', 'user_id', 'báo cáo', 1),
  R('users', 'srs_decks', 'creator_id', 'tạo bộ thẻ', 1),
  R('srs_decks', 'srs_card_content', 'deck_id', 'chứa thẻ', 1),
  R('users', 'srs_cards', 'user_id', 'ôn thẻ', 1),
  R('users', 'question_attempts', 'user_id', 'làm câu hỏi', 1),
  R('users', 'user_theta', 'user_id', 'năng lực θ', 1),
  R('users', 'scenario_runs', 'user_id', 'chạy kịch bản', 1),
  R('users', 'portal_apps', 'owner_id', 'cài app', 1),
  R('users', 'notif_subscriptions', 'user_id', 'đăng ký push', 1),
  R('competencies', 'skills', 'competency_id', 'gồm', 1),
  R('skills', 'skill_prereq', 'skill_id', 'cần tiên quyết', 1),
  R('skills', 'skill_prereq', 'prereq_skill_id', 'là tiên quyết của', 1),
  R('users', 'user_skills', 'user_id', 'đạt kỹ năng', 1),
  R('skills', 'user_skills', 'skill_id', 'được cấp', 1),
  R('pharmacy_teacher', 'pharmacy_teacher_session', 'username', 'phiên GV', 1),
  // --- quan hệ logic (không có ràng buộc FK trong DB) ---
  R('users', 'subscriptions', 'user_id', 'gói dịch vụ', 0),
  R('users', 'codelab_submissions', 'user_id', 'nộp bài code', 0),
  R('users', 'live_rooms', 'host_id', 'chủ phòng', 0),
  R('users', 'analytics_events', 'user_id', 'sự kiện', 0),
  R('users', 'ai_token_usage', 'user_id', 'dùng token', 0),
  R('users', 'ai_prompt_log', 'user_id', 'prompt', 0),
  R('users', 'admin_db_audit', 'user_id', 'admin chạy SQL', 0),
  R('users', 'portal_agents', 'owner_id', 'cài agent', 0),
  R('users', 'exposures', 'user_id', 'A/B', 0),
  R('experiments', 'exposures', 'exp_key', 'thí nghiệm', 0),
  R('users', 'achievements', 'player_name', 'huy hiệu (display_name)', 0),
  R('users', 'attempts', 'player_name', 'lượt làm bài (display_name)', 0),
  R('users', 'requests', 'student', 'gửi yêu cầu (display_name)', 0),
  R('users', 'notifications', 'user_display_name', 'nhận thông báo', 0),
  R('users', 'adaptive_state', 'learner', 'BKT theo kỹ năng', 0),
  R('users', 'learning_events', 'learner', 'sự kiện học', 0),
  R('classes', 'attempts', 'class_code', 'lớp', 0),
  R('classes', 'team_quests', 'class_code', 'lớp', 0),
  R('team_quests', 'team_quest_claims', 'team_quest_id', 'nhận thưởng', 0),
  R('users', 'team_quest_claims', 'user_id', 'nhận thưởng', 0),
  R('srs_card_content', 'srs_cards', 'card_key', 'nội dung thẻ', 0),
  R('lessons', 'lesson_comments', 'slug', 'bình luận', 0),
  R('lessons', 'lesson_likes', 'slug', 'lượt thích', 0),
  R('requests', 'request_messages', 'request_id', 'hội thoại', 0),
  R('requests', 'ai_decisions', 'request_id', 'quyết định AI', 0),
  R('requests', 'notifications', 'request_id', 'sinh thông báo', 0),
  R('pharmacy_student', 'pharmacy_practice_session', 'student_code', 'thực hành', 0),
  R('pharmacy_practice_session', 'pharmacy_practice_message', 'session_id', 'hội thoại', 0),
  R('pharmacy_practice_session', 'pharmacy_practice_action', 'session_id', 'thao tác 3D', 0),
  R('pharmacy_practice_session', 'pharmacy_practice_score', 'session_id', 'điểm A1..E5', 0),
  R('gpp_participant', 'gpp_session', 'participant_id', 'phiên', 0),
  R('gpp_participant', 'gpp_event', 'participant_id', 'sự kiện', 0),
  R('gpp_participant', 'gpp_level_result', 'participant_id', 'kết quả cấp', 0),
  R('gpp_participant', 'gpp_test_result', 'participant_id', 'trắc nghiệm', 0),
  R('gpp_participant', 'gpp_survey', 'participant_id', 'khảo sát', 0),
  R('gpp_session', 'gpp_event', 'session_id', 'nhật ký', 0),
  R('gpp_session', 'gpp_level_result', 'session_id', 'kết quả', 0),
  R('gpp_session', 'gpp_test_result', 'session_id', 'bài test', 0),
  R('gpp_session', 'gpp_survey', 'session_id', 'khảo sát', 0),
];
const fkCols = {};
rels.forEach(r => { (fkCols[r.c] = fkCols[r.c] || new Set()).add(r.col); });

// ---- domains ----
const DOMAINS = [
  { id: 'identity', title: '1 · Danh tính & phân quyền', desc: 'Tài khoản, phiên đăng nhập, OAuth, quyền theo cấp học (domain), quan hệ phụ huynh–con, gói dịch vụ, lớp.',
    tables: ['users', 'sessions', 'oauth_identities', 'school_admins', 'user_domain_grants', 'family_links', 'subscriptions', 'classes'] },
  { id: 'economy_a', title: '2a · Game hoá — ví, pet, cửa hàng, nhiệm vụ ngày', desc: 'Ví XP/coin theo domain, pet, cửa hàng + kho đồ, streak/tim, nhiệm vụ ngày, huy hiệu.',
    tables: ['users', 'user_wallets', 'user_state', 'user_pet', 'shop_items', 'user_inventory', 'daily_login', 'engagement_state', 'engagement_daily_quests', 'user_activity', 'achievements'] },
  { id: 'economy_b', title: '2b · Game hoá — thi đấu (Battle Pass, League, nhiệm vụ nhóm)', desc: 'Battle Pass theo mùa, League hằng tuần (hạng/nhóm), nhiệm vụ nhóm theo lớp.',
    tables: ['users', 'bp_seasons', 'bp_progress', 'league_seasons', 'league_groups', 'league_memberships', 'league_user_tier', 'team_quests', 'team_quest_contribs', 'team_quest_claims', 'classes'] },
  { id: 'skills', title: '3 · Năng lực & kỹ năng (GDPT 2018)', desc: '15 năng lực → 207 kỹ năng, đồ thị tiên quyết, kỹ năng người học đạt được.',
    tables: ['users', 'competencies', 'skills', 'skill_prereq', 'user_skills'] },
  { id: 'learning_a', title: '4a · Nội dung học & thẻ ghi nhớ (SRS)', desc: 'Giáo trình/quiz nằm trong DB (curriculum_content, content_datasets), bài giảng cộng đồng, nội dung AI sinh, bộ thẻ SRS.',
    tables: ['users', 'curriculum_content', 'content_datasets', 'campus_layouts', 'ai_lesson_content', 'lessons', 'lesson_comments', 'lesson_likes', 'srs_decks', 'srs_card_content', 'srs_cards'] },
  { id: 'learning_b', title: '4b · Quest do người dùng tạo (UGC) & phòng live', desc: 'Quest UGC kèm lượt chơi/thích/báo cáo; phòng thi đấu live theo mã PIN.',
    tables: ['users', 'ugc_quests', 'ugc_plays', 'ugc_likes', 'ugc_flags', 'live_rooms'] },
  { id: 'learning_c', title: '4c · Lượt làm bài & học thích ứng (IRT/BKT), Codelab', desc: 'Lượt làm bài, câu hỏi qua ScoreUp, độ khó IRT, năng lực θ, BKT theo kỹ năng, sự kiện học, kịch bản, bài nộp Codelab.',
    tables: ['users', 'classes', 'attempts', 'question_attempts', 'question_irt', 'user_theta', 'adaptive_state', 'learning_events', 'scenario_runs', 'codelab_submissions'] },
  { id: 'platform_a', title: '5a · Nền tảng — Portal App/Agent, yêu cầu SV, thông báo', desc: 'App & Agent cài lên Tizia, hộp thư yêu cầu của SV + hội thoại + quyết định của Ban điều hành AI, thông báo và đăng ký push.',
    tables: ['users', 'portal_apps', 'portal_agents', 'requests', 'request_messages', 'ai_decisions', 'notifications', 'notif_config', 'notif_subscriptions'] },
  { id: 'platform_b', title: '5b · Nền tảng — vận hành (flag, A/B, analytics, AI quota, webhook)', desc: 'Feature flag, thí nghiệm A/B, analytics, log prompt + token AI, outbox/webhook ra ngoài, audit SQL của admin.',
    tables: ['users', 'feature_flags', 'experiments', 'exposures', 'event_registry', 'analytics_events', 'ai_prompt_log', 'ai_token_usage', 'outbox_events', 'webhook_endpoints', 'scoreup_webhook_events_seen', 'admin_db_audit'] },
  { id: 'pharmacy', title: '6 · Nhà thuốc 3D (PharmaComm)', desc: 'Phiên thực hành, hội thoại, thao tác 3D, điểm A1..E5; hồ sơ SV và tài khoản giảng viên. Độc lập với users.',
    tables: ['pharmacy_student', 'pharmacy_practice_session', 'pharmacy_practice_message', 'pharmacy_practice_action', 'pharmacy_practice_score', 'pharmacy_teacher', 'pharmacy_teacher_session', 'pharmacy_teacher_log'] },
  { id: 'gpp', title: '7 · Module GPP 2D (nghiên cứu)', desc: 'Thực hành nghiệp vụ nhà thuốc GPP: người tham gia, phiên, nhật ký, kết quả cấp, pre/post test, khảo sát ARCS/CLT/SUS. Độc lập với users.',
    tables: ['gpp_participant', 'gpp_session', 'gpp_event', 'gpp_level_result', 'gpp_test_result', 'gpp_survey'] },
];

const FULL_OWNER = new Set(); // table -> domain id where it prints full columns
DOMAINS.forEach(d => d.tables.forEach(t => { if (!FULL_OWNER.has(t) ) FULL_OWNER.add(t); }));
const firstDomain = {};
DOMAINS.forEach(d => d.tables.forEach(t => { if (!firstDomain[t]) firstDomain[t] = d.id; }));

function entity(t, full) {
  const cols = tables[t];
  if (!cols) throw new Error('missing table ' + t);
  let body = '';
  if (full) {
    for (const c of cols) {
      const keys = [];
      if (c.pk) keys.push('PK');
      if (fkCols[t] && fkCols[t].has(c.name)) keys.push('FK');
      if (c.uk && !c.pk) keys.push('UK');
      body += `    ${c.type} ${c.name}${keys.length ? ' ' + keys.join(',') : ''}\n`;
    }
  } else {
    const pk = cols.find(c => c.pk) || cols[0];
    body += `    ${pk.type} ${pk.name} PK\n`;
  }
  return `  ${t} {\n${body}  }\n`;
}

function erd(d) {
  const set = new Set(d.tables);
  let out = 'erDiagram\n';
  for (const t of d.tables) out += entity(t, firstDomain[t] === d.id);
  for (const r of rels) {
    if (set.has(r.p) && set.has(r.c)) {
      out += `  ${r.p} ${r.real ? '||--o{' : '||..o{'} ${r.c} : "${r.label}"\n`;
    }
  }
  return out;
}

// ---- overview (flowchart) ----
function overview() {
  let o = 'flowchart LR\n';
  const sty = ['identity', 'economy', 'skills', 'learning', 'platform', 'pharmacy', 'gpp'];
  const own = {};
  DOMAINS.forEach(d => d.tables.forEach(t => { if (!own[t]) own[t] = d.id; }));
  for (const d of DOMAINS) {
    o += `  subgraph g_${d.id}["${d.title}"]\n    direction TB\n`;
    for (const t of d.tables) if (own[t] === d.id) o += `    ${t}[${t}]\n`;
    o += '  end\n';
  }
  for (const r of rels) o += `  ${r.p} ${r.real ? '-->' : '-.->'} ${r.c}\n`;
  o += '  classDef hub fill:#fde68a,stroke:#b45309,stroke-width:2px,color:#000\n  class users hub\n';
  return o;
}

// ---- compact overview: domain-level ----
const domainOverview = `flowchart TB
  U(("👤 users<br/>(trung tâm)"))
  ID["1 · Danh tính & phân quyền<br/>sessions · oauth · school_admins · domain_grants · family_links · subscriptions · classes"]
  EC["2 · Game hoá & kinh tế<br/>wallets · pet · shop · inventory · daily quests · battle pass · league · team quest"]
  SK["3 · Năng lực & kỹ năng<br/>competencies → skills → user_skills"]
  LE["4 · Nội dung & học thích ứng<br/>curriculum · lessons · SRS · UGC · attempts · IRT/BKT · codelab"]
  PL["5 · Nền tảng & vận hành<br/>portal apps/agents · requests · notifications · flags/A-B · analytics · AI usage · outbox"]
  PH["6 · Nhà thuốc 3D<br/>pharmacy_* (độc lập, định danh bằng mã SV)"]
  GP["7 · GPP 2D<br/>gpp_* (độc lập, định danh bằng mã SV)"]
  U --- ID
  U --- EC
  U --- SK
  U --- LE
  U --- PL
  PH ~~~ GP
  classDef hub fill:#fde68a,stroke:#b45309,stroke-width:2px,color:#000
  classDef iso fill:#e5e7eb,stroke:#6b7280,stroke-dasharray:4 3,color:#000
  class U hub
  class PH,GP iso
`;

// ---- write markdown ----
const all = Object.keys(tables);
const covered = new Set(DOMAINS.flatMap(d => d.tables));
const missing = all.filter(t => !covered.has(t));
if (missing.length) console.error('KHÔNG NHÓM:', missing);

let md = `# Sơ đồ cơ sở dữ liệu Tizia

> Sinh tự động từ [\`server/schema.sql\`](../server/schema.sql) (PostgreSQL, ${all.length} bảng).
> Cập nhật: 2026-10-09. Sinh lại khi schema đổi bằng script trong repo (hoặc nhờ Claude chạy lại).

## Cách đọc

- Đường **liền** \`||--o{\`: khoá ngoại **có ràng buộc thật** trong DB (\`FOREIGN KEY\`).
- Đường **đứt** \`||..o{\`: quan hệ **logic** — code tự nối, DB không ép ràng buộc (vd. \`attempts.player_name\` khớp \`users.display_name\`, \`gpp_*\` nối bằng mã SV).
- \`PK\` khoá chính · \`FK\` khoá ngoại/khoá nối · \`UK\` unique.
- Thời gian lưu dạng \`bigint\` (epoch ms/s); cờ boolean lưu \`bigint 0/1\`; nhiều cột \`text\` chứa JSON (\`*_json\`, \`payload\`, \`body\`, \`props\`…).
- Bảng \`users\` xuất hiện ở nhiều sơ đồ nhưng chỉ in đầy đủ cột ở nhóm 1; các nhóm khác chỉ hiện \`id\` để gọn.

## Tổng quan theo nhóm

\`\`\`mermaid
${domainOverview}\`\`\`

`;
for (const d of DOMAINS) {
  md += `## ${d.title}\n\n${d.desc}\n\n\`\`\`mermaid\n${erd(d)}\`\`\`\n\n`;
}
md += `## Bảng độc lập (không quan hệ với bảng khác)

${all.filter(t => !rels.some(r => r.p === t || r.c === t)).map(t => '- `' + t + '`').join('\n')}

## Ghi chú thiết kế

- **Không multi-tenant**: "trường" là \`domain\` (mầm non, tiểu học, THCS, THPT, đại học…), lưu dạng text ở \`user_wallets.domain\`, \`user_skills.domain\`, \`curriculum_content.domain\`, \`portal_apps.domain\`… chứ không có bảng \`schools\`.
- **Hai kiểu định danh**: phần lõi dùng \`users.id\` (FK thật); các bảng cũ/độc lập dùng chuỗi — \`player_name\`/\`learner\`/\`student\` (= \`users.display_name\`), hoặc \`student_code\` ở \`pharmacy_*\` và \`gpp_*\`.
- **Nội dung nằm ở DB**: \`curriculum_content\` (mỗi dòng = môn × tuần, \`body\` chứa cả câu hỏi + bài giảng) và \`content_datasets\` (collection/item_key) — không hardcode trong code.
- **Module có thể gỡ độc lập**: \`pharmacy_*\` và \`gpp_*\` không FK tới \`users\`; xoá module = drop các bảng cùng prefix.
`;
fs.writeFileSync(ROOT + '/docs/schema-erd.md', md);
console.log('OK', all.length, 'tables; missing:', missing.length, '; mermaid blocks:', (md.match(/```mermaid/g) || []).length);
