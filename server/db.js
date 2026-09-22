import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve(__dirname, '..', 'data');

fs.mkdirSync(DATA_DIR, { recursive: true });

// Đổi tên 2026-05-31: pharmacy.db → tizia.db (rebrand). Nếu file mới chưa có
// nhưng pharmacy.db legacy còn → rename atomic để giữ data. Cả prod & local
// đều rename trước khi deploy code này.
const dbPath = path.join(DATA_DIR, 'tizia.db');
try {
  const legacy = path.join(DATA_DIR, 'pharmacy.db');
  if (!fs.existsSync(dbPath) && fs.existsSync(legacy)) {
    fs.renameSync(legacy, dbPath);
    // Đổi tên cả WAL/SHM file để SQLite không lock vào file cũ.
    for (const ext of ['-wal', '-shm']) {
      const oldF = legacy + ext, newF = dbPath + ext;
      if (fs.existsSync(oldF)) fs.renameSync(oldF, newF);
    }
    console.log(`[db] migrated ${legacy} → ${dbPath}`);
  }
} catch (e) { console.warn('[db] legacy rename failed', e.message); }
export const db = new Database(dbPath);
export { dbPath, DATA_DIR };
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Step 1: create tables (without indexes that reference v5 columns)
db.exec(`
  CREATE TABLE IF NOT EXISTS attempts (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    version      TEXT    NOT NULL,
    player_name  TEXT    NOT NULL DEFAULT 'Ẩn danh',
    score        INTEGER NOT NULL,
    correct      INTEGER NOT NULL,
    total        INTEGER NOT NULL,
    duration_ms  INTEGER,
    details      TEXT,
    created_at   INTEGER NOT NULL,
    class_code   TEXT,
    level_n      INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_attempts_version_score
    ON attempts(version, score DESC, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_attempts_recent
    ON attempts(created_at DESC);

  CREATE TABLE IF NOT EXISTS achievements (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name  TEXT    NOT NULL,
    badge_id     TEXT    NOT NULL,
    unlocked_at  INTEGER NOT NULL,
    UNIQUE(player_name, badge_id)
  );
  CREATE INDEX IF NOT EXISTS idx_ach_player ON achievements(player_name);

  CREATE TABLE IF NOT EXISTS classes (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    code          TEXT    NOT NULL UNIQUE,
    name          TEXT    NOT NULL,
    teacher_name  TEXT    NOT NULL DEFAULT 'GV',
    created_at    INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_classes_code ON classes(code);

  -- Yêu cầu của SV gửi tới "Ban điều hành AI" của từng trường
  CREATE TABLE IF NOT EXISTS requests (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    domain      TEXT    NOT NULL,                     -- pharmacy | it | ...
    type        TEXT    NOT NULL DEFAULT 'other',     -- game | theory | lab | skill | other
    title       TEXT    NOT NULL,
    detail      TEXT,
    student     TEXT    NOT NULL DEFAULT 'Ẩn danh',
    status      TEXT    NOT NULL DEFAULT 'pending',   -- pending | reviewing | done | rejected
    votes       INTEGER NOT NULL DEFAULT 1,
    admin_note  TEXT,
    created_at  INTEGER NOT NULL,
    updated_at  INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_requests_domain ON requests(domain, votes DESC, created_at DESC);

  -- Tài khoản người dùng (SV + GV). password_hash dạng scrypt$salt$hash.
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
    display_name  TEXT    NOT NULL,
    password_hash TEXT    NOT NULL,
    role          TEXT    NOT NULL DEFAULT 'student',
    created_at    INTEGER NOT NULL,
    last_login    INTEGER
  );
  CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

  -- Phiên đăng nhập. Token là chuỗi ngẫu nhiên 32 byte hex (server cấp).
  CREATE TABLE IF NOT EXISTS sessions (
    token       TEXT    PRIMARY KEY,
    user_id     INTEGER NOT NULL,
    created_at  INTEGER NOT NULL,
    expires_at  INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

  -- OAuth/SSO identities. Một user có thể có nhiều liên kết (Google + MS chẳng hạn).
  CREATE TABLE IF NOT EXISTS oauth_identities (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    provider    TEXT    NOT NULL,            -- google | microsoft | github | ...
    subject     TEXT    NOT NULL,            -- 'sub' ổn định do provider cấp
    email       TEXT,
    created_at  INTEGER NOT NULL,
    UNIQUE(provider, subject),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_oauth_user ON oauth_identities(user_id);
`);

// Step 4: upgrade `users` cho OAuth — email/avatar có thể đến sau khi đã có DB cũ.
try { db.exec(`ALTER TABLE users ADD COLUMN email TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN avatar_url TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN age INTEGER`); } catch {}
// Cho phép password_hash NULL cho user thuần SSO. SQLite không drop được NOT NULL,
// nhưng ta vẫn cài giá trị '' (empty) khi tạo user SSO — verifyPassword luôn trả false.

// Step 2: add v5 columns to attempts if upgrading from older DB
try { db.exec(`ALTER TABLE attempts ADD COLUMN class_code TEXT`); } catch {}
try { db.exec(`ALTER TABLE attempts ADD COLUMN level_n INTEGER`); } catch {}

// Step 3: create indexes that depend on the v5 columns (now guaranteed to exist)
try { db.exec(`CREATE INDEX IF NOT EXISTS idx_attempts_class ON attempts(class_code, created_at DESC)`); } catch {}

// Đính kèm: JSON array [{url, name, mime, size, kind}]. kind = 'screenshot' | 'file'
try { db.exec(`ALTER TABLE requests ADD COLUMN attachments TEXT`); } catch {}

// Hồ sơ học sinh / sinh viên (Trục 1 phân biệt HS vs SV). Các cột này NULL cho
// user cũ → trigger modal /complete-profile.html ở lần login kế. Không có FK ràng
// buộc — major/grade là enum mềm để FE tự đối chiếu DOMAIN_META; cohort là free
// text (K65/K2024…); school_name là tên trường HS/PH/THPT/ĐH user đang theo học.
try { db.exec(`ALTER TABLE users ADD COLUMN grade INTEGER`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN major TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN cohort TEXT`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN school_name TEXT`); } catch {}

// enrolled_domain = trường HS/SV đang theo học (1 trong DOMAIN_META). NULL = chưa
// chọn (FE bắt mở modal). Mỗi tài khoản tại 1 thời điểm chỉ THAM GIA 1 trường:
// ví/xp/coin/level/skill đều theo (user_id, domain). Đổi trường = tạo bucket mới,
// bucket cũ vẫn còn trong DB (ẩn) nên nếu quay lại trường cũ thì khôi phục.
// Admin: NULL (không gắn trường, có quyền tương tác mọi trường — bypass gate).
try { db.exec(`ALTER TABLE users ADD COLUMN enrolled_domain TEXT`); } catch {}
try { db.exec(`CREATE INDEX IF NOT EXISTS idx_users_enrolled_domain ON users(enrolled_domain)`); } catch {}

// Trục 4: family plan. family_links cho phép 1 PH link n con HS
// (parent_user_id phải là role='teacher' hoặc 'student' tuổi >=18 — kiểm ở app
// layer, không hard-enforce DB). Plan của parent được kế thừa xuống con khi
// con role='pupil'.
db.exec(`
  CREATE TABLE IF NOT EXISTS family_links (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_user_id  INTEGER NOT NULL,
    child_user_id   INTEGER NOT NULL,
    created_at      INTEGER NOT NULL,
    UNIQUE(parent_user_id, child_user_id),
    FOREIGN KEY (parent_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (child_user_id)  REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_family_parent ON family_links(parent_user_id);
  CREATE INDEX IF NOT EXISTS idx_family_child  ON family_links(child_user_id);

`);

// Step 6: gói cước (free/plus/pro). plan_expires_at NULL = vĩnh viễn (cho free) hoặc
// đến khi mua. billing_cycle = month|year (lưu để render đúng "hết hạn dd/mm/yyyy"
// và để gia hạn). Hết hạn → app degrade về free nhưng KHÔNG xoá cột → khôi phục
// lịch sử nếu user gia hạn lại. Default 'free' cho user cũ.
try { db.exec(`ALTER TABLE users ADD COLUMN plan TEXT NOT NULL DEFAULT 'free'`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN plan_expires_at INTEGER`); } catch {}
try { db.exec(`ALTER TABLE users ADD COLUMN billing_cycle TEXT`); } catch {}
try { db.exec(`CREATE INDEX IF NOT EXISTS idx_users_plan ON users(plan, plan_expires_at)`); } catch {}

// Kho học liệu do AI sinh thêm (nút "Học thêm" + "Hỏi cô giáo AI" ở Tiểu học).
// Mỗi lần Ollama sinh nội dung mới → lưu lại để bài học giàu dần, tái sử dụng
// (không phải gọi AI lại) và để GV duyệt. kind='question' (quiz) | 'qa' (hỏi-đáp).
db.exec(`
  CREATE TABLE IF NOT EXISTS ai_lesson_content (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    week_id     TEXT    NOT NULL,            -- scenario id, vd 'P2-w07-quiz'
    subject     TEXT,                        -- nhãn môn, vd 'Toán'
    topic       TEXT,                        -- chủ đề tuần
    kind        TEXT    NOT NULL,            -- 'question' | 'qa'
    stem        TEXT,                        -- câu hỏi (question) / câu hỏi của HS (qa)
    payload     TEXT    NOT NULL,            -- JSON: question={choices,answer,explanation}; qa={answer}
    student     TEXT,                        -- ai kích hoạt (display name)
    upvotes     INTEGER NOT NULL DEFAULT 0,
    flagged     INTEGER NOT NULL DEFAULT 0,  -- GV gắn cờ nội dung sai → ẩn khỏi kho
    created_at  INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_ai_content_week
    ON ai_lesson_content(week_id, kind, flagged, created_at DESC);
`);

// Thông báo cá nhân cho HS — kênh phản hồi từ Ban điều hành AI khi xử lý xong
// 1 yêu cầu (request). Key theo display_name vì requests.student lưu tên hiển
// thị (không có user_id ở thời điểm tạo, có cả guest). Read receipt: read_at.
db.exec(`
  CREATE TABLE IF NOT EXISTS notifications (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    user_display_name TEXT    NOT NULL,         -- người nhận, khớp users.display_name
    request_id        INTEGER,                   -- request gốc (NULL nếu không gắn)
    kind              TEXT    NOT NULL,          -- 'reply' | 'system' | ...
    title             TEXT    NOT NULL,
    body              TEXT,
    url               TEXT,                      -- link điều hướng khi click
    read_at           INTEGER,                   -- NULL = chưa đọc
    created_at        INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_notifications_user
    ON notifications(user_display_name, read_at, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_notifications_request
    ON notifications(request_id);
`);

// Phiên trao đổi (thread) của 1 yêu cầu: cho phép HS và Ban điều hành AI nhắn
// qua lại nhiều lượt tới khi yêu cầu hoàn thành — thay vì chỉ 1 phản hồi
// admin_note đơn lẻ. Tin mở đầu (head) = chính nội dung request, không lưu lặp
// ở đây; bảng này chỉ chứa các lượt trao đổi tiếp theo. role: 'student' (HS) |
// 'ai' (Ban điều hành) | 'admin' (người vận hành) | 'system'.
db.exec(`
  CREATE TABLE IF NOT EXISTS request_messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id  INTEGER NOT NULL,
    role        TEXT    NOT NULL,
    author_name TEXT,
    body        TEXT    NOT NULL,
    attachments TEXT,                            -- JSON [{url,name,mime,size,kind}]
    created_at  INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_request_messages
    ON request_messages(request_id, created_at);
`);

// Khung năng lực GDPT 2018: 5 phẩm chất + 10 năng lực (catalog tham chiếu của Bộ
// GD-ĐT). Mỗi `skill` (kỹ năng cụ thể HS đạt được tại 1 space/lesson/mini-game)
// thuộc 1 competency cha → cho phép roll-up báo cáo theo khung quốc gia.
// `user_skills` là bảng earned (theo user_id, per-domain bucket cấp học).
// kind: pham_chat (5) | nang_luc_chung (3) | nang_luc_chuyen_mon (7).
db.exec(`
  CREATE TABLE IF NOT EXISTS competencies (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    code        TEXT    NOT NULL UNIQUE,        -- vd 'PC_CHAM_CHI', 'NL_TIN_HOC'
    kind        TEXT    NOT NULL,               -- 'pham_chat' | 'nang_luc_chung' | 'nang_luc_chuyen_mon'
    name        TEXT    NOT NULL,
    description TEXT,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS skills (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    code           TEXT    NOT NULL UNIQUE,     -- slug ổn định, vd 'preschool_g0_dem_1_5'
    name           TEXT    NOT NULL,            -- text hiển thị (giữ nguyên bản gốc)
    competency_id  INTEGER NOT NULL,
    domain         TEXT,                        -- preschool | primary | secondary | highschool | pharmacy | it (NULL = chung)
    grade_min      INTEGER,                     -- 0=Mầm non, 1..12 (NULL = mọi cấp)
    grade_max      INTEGER,
    description    TEXT,
    created_at     INTEGER NOT NULL,
    FOREIGN KEY (competency_id) REFERENCES competencies(id) ON DELETE RESTRICT
  );
  CREATE INDEX IF NOT EXISTS idx_skills_competency ON skills(competency_id);
  CREATE INDEX IF NOT EXISTS idx_skills_domain     ON skills(domain, grade_min, grade_max);

  -- HS đạt skill khi: hoàn thành scenario, đạt quiz ≥70%, hoàn thành mini-game.
  -- UNIQUE(user_id, skill_id, domain) → 1 skill chỉ tính 1 lần TRONG MỖI TRƯỜNG (cấp học);
  -- HS đổi cấp học → bucket domain mới làm lại từ đầu (bucket domain cũ vẫn ở DB).
  -- source_type/source_id để truy ngược nguồn grant (audit + UI "đạt được khi nào").
  -- domain '' = legacy bucket (skill grant trước khi user chọn trường).
  CREATE TABLE IF NOT EXISTS user_skills (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    skill_id     INTEGER NOT NULL,
    domain       TEXT    NOT NULL DEFAULT '',
    earned_at    INTEGER NOT NULL,
    source_type  TEXT,                          -- 'attempt' | 'scenario_run' | 'lesson' | 'mini_game' | 'manual'
    source_id    TEXT,                          -- id của nguồn (string vì có thể là scenario code)
    score        INTEGER,                       -- 0..100, score của lần grant (NULL nếu không áp dụng)
    UNIQUE(user_id, skill_id, domain),
    FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_user_skills_user   ON user_skills(user_id, earned_at DESC);
  CREATE INDEX IF NOT EXISTS idx_user_skills_skill  ON user_skills(skill_id, earned_at DESC);
`);

// Migration: tách user_skills theo (user_id, skill_id, domain). Khi user đổi trường,
// skill cũ giữ ở bucket domain cũ (ẩn khỏi /nang-luc.html trường mới) — quay lại
// trường cũ sẽ tự hiện lại nhờ cùng (user_id, domain). Idempotent: chỉ migrate khi
// chưa có cột `domain`.
{
  const cols = db.prepare(`PRAGMA table_info('user_skills')`).all();
  if (cols.length > 0 && !cols.some(c => c.name === 'domain')) {
    db.exec('BEGIN');
    try {
      db.exec(`
        CREATE TABLE user_skills_new (
          id           INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id      INTEGER NOT NULL,
          skill_id     INTEGER NOT NULL,
          domain       TEXT    NOT NULL DEFAULT '',
          earned_at    INTEGER NOT NULL,
          source_type  TEXT,
          source_id    TEXT,
          score        INTEGER,
          UNIQUE(user_id, skill_id, domain),
          FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
          FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
        );
        INSERT INTO user_skills_new
          (id, user_id, skill_id, domain, earned_at, source_type, source_id, score)
        SELECT id, user_id, skill_id, '', earned_at, source_type, source_id, score
        FROM user_skills;
        DROP TABLE user_skills;
        ALTER TABLE user_skills_new RENAME TO user_skills;
        CREATE INDEX idx_user_skills_user   ON user_skills(user_id, earned_at DESC);
        CREATE INDEX idx_user_skills_skill  ON user_skills(skill_id, earned_at DESC);
        CREATE INDEX idx_user_skills_domain ON user_skills(user_id, domain, earned_at DESC);
      `);
      db.exec('COMMIT');
      console.log('[db] migrated user_skills → per-domain');
    } catch (e) { db.exec('ROLLBACK'); console.warn('[db] user_skills migration failed', e.message); throw e; }
  } else if (cols.length === 0) {
    // chưa migrate qua schema cũ — nhánh này không xảy ra vì CREATE TABLE phía trên
    // đã chạy. Để an toàn nếu file db mới hoàn toàn, tạo index domain riêng.
    try { db.exec(`CREATE INDEX IF NOT EXISTS idx_user_skills_domain ON user_skills(user_id, domain, earned_at DESC)`); } catch {}
  } else {
    // đã có cột domain → đảm bảo index tồn tại
    try { db.exec(`CREATE INDEX IF NOT EXISTS idx_user_skills_domain ON user_skills(user_id, domain, earned_at DESC)`); } catch {}
  }
}

// Seed 15 competencies GDPT 2018 — idempotent qua INSERT OR IGNORE theo code.
// Nguồn: Thông tư 32/2018/TT-BGDĐT (Chương trình GDPT tổng thể).
const _seedCompetencies = db.transaction(() => {
  const ins = db.prepare(`
    INSERT OR IGNORE INTO competencies (code, kind, name, description, sort_order, created_at)
    VALUES (@code, @kind, @name, @description, @sort_order, @created_at)
  `);
  const now = Date.now();
  const rows = [
    // 5 phẩm chất
    { code: 'PC_YEU_NUOC',    kind: 'pham_chat', name: 'Yêu nước',     description: 'Yêu Tổ quốc, yêu đồng bào, có ý thức gìn giữ và phát huy truyền thống dân tộc.', sort_order: 1 },
    { code: 'PC_NHAN_AI',     kind: 'pham_chat', name: 'Nhân ái',      description: 'Yêu thương con người, tôn trọng sự khác biệt, sẵn sàng giúp đỡ người khác.', sort_order: 2 },
    { code: 'PC_CHAM_CHI',    kind: 'pham_chat', name: 'Chăm chỉ',     description: 'Ham học, ham làm, kiên trì vượt khó trong học tập và lao động.', sort_order: 3 },
    { code: 'PC_TRUNG_THUC',  kind: 'pham_chat', name: 'Trung thực',   description: 'Thật thà, ngay thẳng, dám nhận lỗi và sửa lỗi.', sort_order: 4 },
    { code: 'PC_TRACH_NHIEM', kind: 'pham_chat', name: 'Trách nhiệm',  description: 'Có trách nhiệm với bản thân, gia đình, nhà trường, xã hội và môi trường.', sort_order: 5 },
    // 3 năng lực chung
    { code: 'NL_TU_CHU',      kind: 'nang_luc_chung', name: 'Tự chủ và tự học',                    description: 'Tự nhận thức, tự tin, tự lập kế hoạch và tự đánh giá việc học.', sort_order: 10 },
    { code: 'NL_GIAO_TIEP',   kind: 'nang_luc_chung', name: 'Giao tiếp và hợp tác',                description: 'Sử dụng ngôn ngữ hiệu quả, lắng nghe, làm việc nhóm.', sort_order: 11 },
    { code: 'NL_GQVD',        kind: 'nang_luc_chung', name: 'Giải quyết vấn đề và sáng tạo',        description: 'Phát hiện vấn đề, đề xuất giải pháp, tư duy phản biện và sáng tạo.', sort_order: 12 },
    // 7 năng lực chuyên môn
    { code: 'NL_NGON_NGU',    kind: 'nang_luc_chuyen_mon', name: 'Ngôn ngữ',          description: 'Đọc, viết, nói, nghe tiếng Việt và ngoại ngữ.', sort_order: 20 },
    { code: 'NL_TINH_TOAN',   kind: 'nang_luc_chuyen_mon', name: 'Tính toán',         description: 'Tư duy toán học, mô hình hoá, giải toán.', sort_order: 21 },
    { code: 'NL_KHOA_HOC',    kind: 'nang_luc_chuyen_mon', name: 'Khoa học',          description: 'Tìm hiểu tự nhiên, xã hội bằng phương pháp khoa học.', sort_order: 22 },
    { code: 'NL_CONG_NGHE',   kind: 'nang_luc_chuyen_mon', name: 'Công nghệ',         description: 'Hiểu, sử dụng, đánh giá công nghệ; thiết kế kỹ thuật.', sort_order: 23 },
    { code: 'NL_TIN_HOC',     kind: 'nang_luc_chuyen_mon', name: 'Tin học',           description: 'Ứng dụng CNTT, tư duy máy tính, an toàn số.', sort_order: 24 },
    { code: 'NL_THAM_MY',     kind: 'nang_luc_chuyen_mon', name: 'Thẩm mỹ',           description: 'Cảm thụ, sáng tạo nghệ thuật (Âm nhạc, Mỹ thuật).', sort_order: 25 },
    { code: 'NL_THE_CHAT',    kind: 'nang_luc_chuyen_mon', name: 'Thể chất',          description: 'Vận động, rèn luyện sức khoẻ, dinh dưỡng và an toàn.', sort_order: 26 },
  ];
  for (const r of rows) ins.run({ ...r, created_at: now });
});
try { _seedCompetencies(); } catch (e) { console.warn('[db] seed competencies failed', e.message); }

// Auto-migrate skills catalog: nếu competencies đã seed nhưng bảng skills rỗng
// (DB cũ vừa upgrade, hoặc volume mới) → tự chạy script catalog migration để
// 164 skill rows nạp ngay lần boot đầu, không cần docker exec thủ công.
// Idempotent qua INSERT OR IGNORE trong script. Skip nếu skills > 0 hoặc
// scripts/ không tồn tại trong image (dev local trước khi build Docker).
try {
  const _skillCount = db.prepare(`SELECT COUNT(*) AS n FROM skills`).get().n;
  if (_skillCount === 0) {
    const _scriptPath = path.resolve(__dirname, '..', 'scripts', 'migrate-skills-catalog.js');
    if (fs.existsSync(_scriptPath)) {
      console.log('[db] skills empty — auto-running catalog migration…');
      // Dynamic import async — không block init. Lỗi → log, server vẫn boot.
      import(_scriptPath).then(() => {
        const n = db.prepare(`SELECT COUNT(*) AS n FROM skills`).get().n;
        console.log(`[db] skills catalog auto-seeded: ${n} rows`);
      }).catch(e => console.warn('[db] auto-migrate skills failed:', e.message));
    } else {
      console.log('[db] skills empty + no migration script (dev mode?). Run: node scripts/migrate-skills-catalog.js');
    }
  }
} catch (e) { console.warn('[db] skills auto-migrate check failed', e.message); }

const insertAttemptStmt = db.prepare(`
  INSERT INTO attempts (version, player_name, score, correct, total, duration_ms, details, created_at, class_code, level_n)
  VALUES (@version, @player_name, @score, @correct, @total, @duration_ms, @details, @created_at, @class_code, @level_n)
`);

const leaderboardStmt = db.prepare(`
  SELECT id, player_name, score, correct, total, duration_ms, created_at
  FROM attempts
  WHERE version = @version
  ORDER BY score DESC, created_at DESC
  LIMIT @limit
`);

const statsStmt = db.prepare(`
  SELECT
    COUNT(*)              AS total_attempts,
    ROUND(AVG(score), 1)  AS avg_score,
    MAX(score)            AS best_score,
    SUM(CASE WHEN correct = total AND total > 0 THEN 1 ELSE 0 END) AS perfect_count
  FROM attempts
  WHERE version = @version
`);

const recentStmt = db.prepare(`
  SELECT id, version, player_name, score, correct, total, created_at
  FROM attempts
  ORDER BY created_at DESC
  LIMIT @limit
`);

const allAttemptsStmt = db.prepare(`
  SELECT id, version, player_name, score, correct, total, duration_ms, details, created_at
  FROM attempts
  ORDER BY created_at DESC
`);

const histogramStmt = db.prepare(`
  SELECT
    CAST((score / 10) AS INTEGER) * 10 AS bucket,
    COUNT(*) AS n
  FROM attempts
  WHERE version = @version
  GROUP BY bucket
  ORDER BY bucket
`);

export function insertAttempt(row) {
  const info = insertAttemptStmt.run(row);
  return { id: info.lastInsertRowid, createdAt: row.created_at };
}

export function getLeaderboard(version, limit = 10) {
  return leaderboardStmt.all({ version, limit });
}

export function getStats(version) {
  return statsStmt.get({ version }) || { total_attempts: 0, avg_score: 0, best_score: 0, perfect_count: 0 };
}

export function getRecent(limit = 20) {
  return recentStmt.all({ limit });
}

// --- Class management ---
const createClassStmt = db.prepare(`
  INSERT INTO classes (code, name, teacher_name, created_at)
  VALUES (@code, @name, @teacher_name, @created_at)
`);
const getClassByCodeStmt = db.prepare(`
  SELECT id, code, name, teacher_name, created_at FROM classes WHERE code = ?
`);
const listClassesStmt = db.prepare(`
  SELECT id, code, name, teacher_name, created_at,
    (SELECT COUNT(*) FROM attempts WHERE class_code = classes.code) AS attempt_count,
    (SELECT COUNT(DISTINCT player_name) FROM attempts WHERE class_code = classes.code) AS student_count
  FROM classes ORDER BY created_at DESC
`);
const classMembersStmt = db.prepare(`
  SELECT player_name,
    COUNT(*) AS attempts,
    MAX(score) AS best_score,
    ROUND(AVG(score), 1) AS avg_score,
    SUM(CASE WHEN correct = total AND total > 0 THEN 1 ELSE 0 END) AS perfect_count,
    MAX(created_at) AS last_seen
  FROM attempts WHERE class_code = ? GROUP BY player_name
  ORDER BY best_score DESC, attempts DESC
`);
const classAttemptsStmt = db.prepare(`
  SELECT id, version, player_name, score, correct, total, duration_ms, level_n, created_at
  FROM attempts WHERE class_code = ? ORDER BY created_at DESC LIMIT @limit
`);
const playerAttemptsStmt = db.prepare(`
  SELECT id, version, player_name, score, correct, total, duration_ms, level_n, details, created_at
  FROM attempts WHERE player_name = @player ORDER BY created_at DESC LIMIT @limit
`);

export function createClass({ code, name, teacher_name }) {
  const info = createClassStmt.run({ code, name, teacher_name, created_at: Date.now() });
  return { id: info.lastInsertRowid, code };
}
export function getClassByCode(code) { return getClassByCodeStmt.get(code) || null; }
export function listClasses() { return listClassesStmt.all(); }
export function getClassMembers(code) { return classMembersStmt.all(code); }
export function getClassAttempts(code, limit = 100) { return classAttemptsStmt.all(code, { limit }); }
export function getPlayerAttempts(player, limit = 50) { return playerAttemptsStmt.all({ player, limit }); }

export function getAllAttempts() {
  return allAttemptsStmt.all();
}

export function getHistogram(version) {
  return histogramStmt.all({ version });
}

const achievementsForStmt = db.prepare(`
  SELECT badge_id, unlocked_at FROM achievements
  WHERE player_name = @player ORDER BY unlocked_at DESC
`);
const allAchievementsStmt = db.prepare(`
  SELECT player_name, badge_id, unlocked_at FROM achievements
  ORDER BY unlocked_at DESC LIMIT 50
`);
const unlockAchievementStmt = db.prepare(`
  INSERT OR IGNORE INTO achievements (player_name, badge_id, unlocked_at)
  VALUES (@player, @badge, @t)
`);
export function getAchievements(player) {
  return achievementsForStmt.all({ player });
}
export function getAllRecentAchievements() {
  return allAchievementsStmt.all();
}
export function unlockAchievement(player, badge) {
  const info = unlockAchievementStmt.run({ player, badge, t: Date.now() });
  return info.changes > 0;
}

// Confusion matrix: parses attempt.details.breakdown / details.medicines
// → returns { categories: [...], matrix: { actualCat: { placedCat: count } } }
// --- Requests ("Ban điều hành AI" inbox) ---
const VALID_REQ_TYPES = new Set(['game', 'theory', 'lab', 'skill', 'other']);
const VALID_REQ_STATUS = new Set(['pending', 'reviewing', 'done', 'rejected']);

const insertRequestStmt = db.prepare(`
  INSERT INTO requests (domain, type, title, detail, student, status, votes, created_at, updated_at, attachments)
  VALUES (@domain, @type, @title, @detail, @student, 'pending', 1, @t, @t, @attachments)
`);
const listRequestsStmt = db.prepare(`
  SELECT id, domain, type, title, detail, student, status, votes, admin_note, created_at, updated_at, attachments
  FROM requests WHERE domain = @domain
  ORDER BY (status='done') ASC, votes DESC, created_at DESC
  LIMIT @limit
`);
const voteRequestStmt = db.prepare(`UPDATE requests SET votes = votes + 1, updated_at = @t WHERE id = @id`);
const setRequestStatusStmt = db.prepare(`UPDATE requests SET status = @status, admin_note = @note, updated_at = @t WHERE id = @id`);
const requestStatsStmt = db.prepare(`
  SELECT status, COUNT(*) AS n FROM requests WHERE domain = @domain GROUP BY status
`);

export function createRequest({ domain, type, title, detail, student, attachments = null }) {
  const t = Date.now();
  const safeType = VALID_REQ_TYPES.has(type) ? type : 'other';
  // Chuẩn hoá attachments: chấp nhận mảng object {url,name,mime,size,kind}; lưu JSON.
  // Cap số lượng (≤10) + chỉ giữ field cần thiết để tránh user nhồi rác.
  let attachJson = null;
  if (Array.isArray(attachments) && attachments.length) {
    const safe = attachments.slice(0, 10).map(a => ({
      url: String(a?.url || '').slice(0, 500),
      name: String(a?.name || '').slice(0, 200),
      mime: String(a?.mime || '').slice(0, 100),
      size: Number(a?.size) || 0,
      kind: a?.kind === 'screenshot' ? 'screenshot' : 'file',
    })).filter(a => a.url);
    if (safe.length) attachJson = JSON.stringify(safe);
  }
  const info = insertRequestStmt.run({
    domain: String(domain || '').slice(0, 40),
    type: safeType,
    title: String(title || '').slice(0, 200),
    // Nâng giới hạn detail từ 2000 → 10000 chars. Brief redesign chi tiết của
    // SV/HS (vd req #3 của Enderboy) có thể >2000 chars và đang bị server âm
    // thầm cắt cụt — gây mất thông tin. 10000 chars = ~2-3 trang A4, đủ cho
    // mọi brief sản phẩm hợp lý; storage cost không đáng kể (SQLite TEXT).
    detail: detail ? String(detail).slice(0, 10000) : null,
    student: String(student || 'Ẩn danh').slice(0, 60),
    attachments: attachJson,
    t,
  });
  return { id: info.lastInsertRowid, createdAt: t };
}
export function listRequests(domain, limit = 50) {
  const rows = listRequestsStmt.all({ domain: String(domain || ''), limit });
  // Parse JSON attachments cho FE; sai/cũ → trả mảng rỗng (tolerant).
  for (const r of rows) {
    if (r.attachments) {
      try { r.attachments = JSON.parse(r.attachments); }
      catch { r.attachments = []; }
    } else {
      r.attachments = [];
    }
  }
  return rows;
}
export function voteRequest(id) {
  const info = voteRequestStmt.run({ id: Number(id), t: Date.now() });
  return info.changes > 0;
}
export function setRequestStatus(id, status, note) {
  if (!VALID_REQ_STATUS.has(status)) return false;
  const info = setRequestStatusStmt.run({ id: Number(id), status, note: note ? String(note).slice(0, 500) : null, t: Date.now() });
  return info.changes > 0;
}
export function getRequestStats(domain) {
  const rows = requestStatsStmt.all({ domain: String(domain || '') });
  const out = { pending: 0, reviewing: 0, done: 0, rejected: 0 };
  for (const r of rows) out[r.status] = r.n;
  return out;
}

// --- Notifications (kênh phản hồi cá nhân cho HS) ---
const VALID_NOTIF_KINDS = new Set(['reply', 'system']);

const insertNotificationStmt = db.prepare(`
  INSERT INTO notifications (user_display_name, request_id, kind, title, body, url, created_at)
  VALUES (@user_display_name, @request_id, @kind, @title, @body, @url, @created_at)
`);
const listNotificationsStmt = db.prepare(`
  SELECT id, request_id, kind, title, body, url, read_at, created_at
  FROM notifications
  WHERE user_display_name = @user
  ORDER BY (read_at IS NOT NULL) ASC, created_at DESC
  LIMIT @limit
`);
const countUnreadStmt = db.prepare(`
  SELECT COUNT(*) AS n FROM notifications
  WHERE user_display_name = @user AND read_at IS NULL
`);
const markReadStmt = db.prepare(`
  UPDATE notifications SET read_at = @t
  WHERE id = @id AND user_display_name = @user AND read_at IS NULL
`);
const markAllReadStmt = db.prepare(`
  UPDATE notifications SET read_at = @t
  WHERE user_display_name = @user AND read_at IS NULL
`);

/** Bỏ qua nếu thiếu display_name hợp lệ (vd 'Ẩn danh' / rỗng) — tránh broadcast. */
export function createNotification({ user_display_name, request_id = null, kind = 'reply', title, body = null, url = null }) {
  const u = String(user_display_name || '').trim();
  if (!u || u === 'Ẩn danh') return null;
  if (!VALID_NOTIF_KINDS.has(kind)) kind = 'reply';
  const info = insertNotificationStmt.run({
    user_display_name: u.slice(0, 60),
    request_id: request_id ? Number(request_id) : null,
    kind,
    title: String(title || '').slice(0, 200),
    body: body ? String(body).slice(0, 1000) : null,
    url: url ? String(url).slice(0, 500) : null,
    created_at: Date.now(),
  });
  return { id: info.lastInsertRowid };
}
export function listNotifications(user_display_name, limit = 30) {
  const u = String(user_display_name || '').trim();
  if (!u) return [];
  return listNotificationsStmt.all({ user: u, limit });
}
export function countUnreadNotifications(user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return 0;
  return countUnreadStmt.get({ user: u })?.n || 0;
}
export function markNotificationRead(id, user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return false;
  return markReadStmt.run({ id: Number(id), user: u, t: Date.now() }).changes > 0;
}
export function markAllNotificationsRead(user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return 0;
  return markAllReadStmt.run({ user: u, t: Date.now() }).changes;
}

// --- Request thread (phiên trao đổi của 1 yêu cầu) ---
const VALID_MSG_ROLES = new Set(['student', 'ai', 'admin', 'system']);
const getRequestByIdStmt = db.prepare(`
  SELECT id, domain, type, title, detail, student, status, votes, admin_note, created_at, updated_at, attachments
  FROM requests WHERE id = ?
`);
const insertReqMsgStmt = db.prepare(`
  INSERT INTO request_messages (request_id, role, author_name, body, attachments, created_at)
  VALUES (@request_id, @role, @author_name, @body, @attachments, @created_at)
`);
const listReqMsgStmt = db.prepare(`
  SELECT id, request_id, role, author_name, body, attachments, created_at
  FROM request_messages WHERE request_id = ? ORDER BY created_at ASC, id ASC
`);
const touchRequestStmt = db.prepare(`UPDATE requests SET updated_at = @t WHERE id = @id`);
// Mở lại yêu cầu đã đóng (done/rejected) → 'reviewing' khi HS gửi thêm tin nhắn.
const reopenRequestStmt = db.prepare(`
  UPDATE requests SET status = 'reviewing', updated_at = @t
  WHERE id = @id AND status IN ('done', 'rejected')
`);

function safeParseAtts(s) {
  if (!s) return [];
  try { const a = JSON.parse(s); return Array.isArray(a) ? a : []; } catch { return []; }
}
// Chuẩn hoá + cap attachments (≤10, chỉ field cần) — dùng chung cho message.
function normAttachments(attachments) {
  if (!Array.isArray(attachments) || !attachments.length) return null;
  const safe = attachments.slice(0, 10).map(a => ({
    url: String(a?.url || '').slice(0, 500),
    name: String(a?.name || '').slice(0, 200),
    mime: String(a?.mime || '').slice(0, 100),
    size: Number(a?.size) || 0,
    kind: a?.kind === 'screenshot' ? 'screenshot' : 'file',
  })).filter(a => a.url);
  return safe.length ? JSON.stringify(safe) : null;
}

export function getRequestById(id) {
  const row = getRequestByIdStmt.get(Number(id));
  if (!row) return null;
  row.attachments = safeParseAtts(row.attachments);
  return row;
}

export function addRequestMessage({ request_id, role, author_name = null, body, attachments = null }) {
  if (!VALID_MSG_ROLES.has(role)) role = 'system';
  const t = Date.now();
  const info = insertReqMsgStmt.run({
    request_id: Number(request_id),
    role,
    author_name: author_name ? String(author_name).slice(0, 60) : null,
    body: String(body || '').slice(0, 10000),
    attachments: normAttachments(attachments),
    created_at: t,
  });
  // Đụng updated_at để yêu cầu nổi lên trong dashboard khi có lượt trao đổi mới.
  touchRequestStmt.run({ id: Number(request_id), t });
  return { id: info.lastInsertRowid, created_at: t };
}

export function listRequestMessages(request_id) {
  const rows = listReqMsgStmt.all(Number(request_id));
  for (const r of rows) r.attachments = safeParseAtts(r.attachments);
  return rows;
}

export function reopenRequestIfClosed(id) {
  return reopenRequestStmt.run({ id: Number(id), t: Date.now() }).changes > 0;
}

// --- Hộp thư Ban điều hành AI (đọc-chỉ, xuyên mọi trường) ---
// Trả các yêu cầu ĐANG CHỜ XỬ LÝ ('pending'/'reviewing') của toàn hệ thống kèm
// thread trao đổi. Yêu cầu đã đóng ('done'/'rejected') bị bỏ qua — Ban điều hành
// chỉ cần việc còn tồn.
//
// Đây là nguồn dữ liệu cho route đọc-chỉ /api/ai-board/inbox (xem
// contexts/ai-agent/inbox-api.js). Truy vấn CỐ TÌNH giống hệt
// server/scripts/sync-inbox.mjs — script đó đọc thẳng file SQLite trên volume
// production, route này đọc qua HTTP; hai đường phải cho cùng một kết quả để
// phiên hàng ngày dùng đường nào cũng được.
const boardInboxStmt = db.prepare(`
  SELECT id, domain, type, title, detail, student, status, votes, admin_note,
         created_at, updated_at, attachments
  FROM requests
  WHERE status IN ('pending', 'reviewing')
  ORDER BY votes DESC, created_at DESC
  LIMIT @limit
`);

export function listBoardInbox(limit = 200) {
  const cap = Math.min(Math.max(Number(limit) || 200, 1), 500);
  const rows = boardInboxStmt.all({ limit: cap });
  return rows.map(r => ({
    id: `req-${r.id}`,
    db_id: r.id,
    from: r.student,
    domain: r.domain,
    type: r.type,
    subject: r.title,
    body: r.detail || '',
    status: r.status,
    votes: r.votes,
    admin_note: r.admin_note || null,
    attachments: safeParseAtts(r.attachments),
    thread: listRequestMessages(r.id).map(m => ({
      role: m.role,
      author: m.author_name || null,
      body: m.body,
      at: new Date(m.created_at).toISOString(),
    })),
    created_at: new Date(r.created_at).toISOString(),
    updated_at: new Date(r.updated_at).toISOString(),
  }));
}

// --- Kho học liệu AI sinh thêm ---
const insertAiContentStmt = db.prepare(`
  INSERT INTO ai_lesson_content (week_id, subject, topic, kind, stem, payload, student, created_at)
  VALUES (@week_id, @subject, @topic, @kind, @stem, @payload, @student, @created_at)
`);
const existsAiStemStmt = db.prepare(`
  SELECT 1 FROM ai_lesson_content WHERE week_id = @week_id AND kind = @kind AND stem = @stem LIMIT 1
`);
const getAiQuestionsStmt = db.prepare(`
  SELECT stem, payload, created_at FROM ai_lesson_content
  WHERE week_id = @week_id AND kind = 'question' AND flagged = 0
  ORDER BY created_at DESC LIMIT @limit
`);
const getAiQaStmt = db.prepare(`
  SELECT stem, payload, created_at FROM ai_lesson_content
  WHERE week_id = @week_id AND kind = 'qa' AND flagged = 0
  ORDER BY created_at DESC LIMIT @limit
`);
const countAiContentStmt = db.prepare(`
  SELECT kind, COUNT(*) AS n FROM ai_lesson_content
  WHERE week_id = @week_id AND flagged = 0 GROUP BY kind
`);

/** Lưu 1 mảng câu hỏi AI vừa sinh. Bỏ qua câu trùng stem trong cùng tuần. */
export function saveAiQuestions({ week_id, subject, topic, student, questions = [] }) {
  if (!week_id || !Array.isArray(questions) || !questions.length) return { saved: 0 };
  const t = Date.now();
  let saved = 0;
  const tx = db.transaction(() => {
    for (const q of questions) {
      const stem = String(q.stem || '').trim();
      if (!stem) continue;
      if (existsAiStemStmt.get({ week_id, kind: 'question', stem })) continue;  // dedupe
      insertAiContentStmt.run({
        week_id,
        subject: subject ? String(subject).slice(0, 60) : null,
        topic: topic ? String(topic).slice(0, 160) : null,
        kind: 'question', stem: stem.slice(0, 500),
        payload: JSON.stringify({ choices: q.choices, answer: q.answer, explanation: q.explanation || '' }),
        student: student ? String(student).slice(0, 60) : null,
        created_at: t,
      });
      saved++;
    }
  });
  tx();
  return { saved };
}

/** Lưu 1 cặp hỏi-đáp với "cô giáo AI". */
export function saveAiQa({ week_id, subject, topic, student, question, answer }) {
  if (!week_id || !question || !answer) return { saved: 0 };
  const stem = String(question).trim().slice(0, 500);
  if (existsAiStemStmt.get({ week_id, kind: 'qa', stem })) return { saved: 0 };  // dedupe câu hỏi y hệt
  insertAiContentStmt.run({
    week_id,
    subject: subject ? String(subject).slice(0, 60) : null,
    topic: topic ? String(topic).slice(0, 160) : null,
    kind: 'qa', stem,
    payload: JSON.stringify({ answer: String(answer).slice(0, 2000) }),
    student: student ? String(student).slice(0, 60) : null,
    created_at: Date.now(),
  });
  return { saved: 1 };
}

/** Lấy câu hỏi AI đã tích luỹ của 1 tuần (để luyện lại không cần gọi Ollama). */
export function getAiQuestions(week_id, limit = 50) {
  return getAiQuestionsStmt.all({ week_id: String(week_id), limit })
    .map(r => { try { const p = JSON.parse(r.payload); return { stem: r.stem, ...p }; } catch { return null; } })
    .filter(Boolean);
}
/** Lấy hỏi-đáp đã tích luỹ của 1 tuần. */
export function getAiQa(week_id, limit = 50) {
  return getAiQaStmt.all({ week_id: String(week_id), limit })
    .map(r => { try { const p = JSON.parse(r.payload); return { question: r.stem, answer: p.answer, created_at: r.created_at }; } catch { return null; } })
    .filter(Boolean);
}
/** Đếm số học liệu AI đã tích luỹ theo tuần → { question, qa }. */
export function getAiContentCounts(week_id) {
  const rows = countAiContentStmt.all({ week_id: String(week_id) });
  const out = { question: 0, qa: 0 };
  for (const r of rows) out[r.kind] = r.n;
  return out;
}

export function getConfusion(version) {
  const rows = db.prepare(`SELECT details FROM attempts WHERE version = ? AND details IS NOT NULL`).all(version);
  const matrix = {};
  const categories = new Set();
  for (const r of rows) {
    let d;
    try { d = JSON.parse(r.details); } catch { continue; }
    const items = d.medicines || d.breakdown || [];
    for (const it of items) {
      const actual = it.category;
      const placed = it.placedIn;
      if (!actual) continue;
      categories.add(actual);
      if (placed) categories.add(placed);
      matrix[actual] ??= {};
      const key = placed || '__unplaced__';
      matrix[actual][key] = (matrix[actual][key] || 0) + 1;
    }
  }
  return { categories: [...categories].sort(), matrix };
}

// --- Users & sessions ---
const insertUserStmt = db.prepare(`
  INSERT INTO users (username, display_name, password_hash, role, age, created_at,
                     grade, major, cohort, school_name)
  VALUES (@username, @display_name, @password_hash, @role, @age, @created_at,
          @grade, @major, @cohort, @school_name)
`);
const getUserByUsernameStmt = db.prepare(`
  SELECT id, username, display_name, password_hash, role, age, email, avatar_url, created_at, last_login,
         grade, major, cohort, school_name
  FROM users WHERE username = ? COLLATE NOCASE
`);
const getUserByIdStmt = db.prepare(`
  SELECT id, username, display_name, role, age, email, avatar_url, created_at, last_login,
         plan, plan_expires_at, billing_cycle,
         grade, major, cohort, school_name, enrolled_domain
  FROM users WHERE id = ?
`);
const setUserPlanStmt = db.prepare(`
  UPDATE users SET plan = @plan, plan_expires_at = @expires, billing_cycle = @cycle WHERE id = @id
`);
const touchLoginStmt = db.prepare(`UPDATE users SET last_login = @t WHERE id = @id`);
const updateDisplayNameStmt = db.prepare(`UPDATE users SET display_name = @name WHERE id = @id`);

const insertSessionStmt = db.prepare(`
  INSERT INTO sessions (token, user_id, created_at, expires_at)
  VALUES (@token, @user_id, @created_at, @expires_at)
`);
const getSessionStmt = db.prepare(`
  SELECT s.token, s.user_id, s.expires_at,
         u.username, u.display_name, u.role,
         u.plan, u.plan_expires_at, u.enrolled_domain
  FROM sessions s JOIN users u ON u.id = s.user_id
  WHERE s.token = ? AND s.expires_at > @now
`);
const deleteSessionStmt = db.prepare(`DELETE FROM sessions WHERE token = ?`);
const purgeExpiredSessionsStmt = db.prepare(`DELETE FROM sessions WHERE expires_at <= ?`);

const ALLOWED_ROLES = new Set(['pupil', 'student', 'teacher']);
export function createUser({ username, display_name, password_hash, role, age,
                             grade = null, major = null, cohort = null, school_name = null }) {
  const info = insertUserStmt.run({
    username, display_name, password_hash,
    role: ALLOWED_ROLES.has(role) ? role : 'student',
    age: Number.isFinite(age) ? Math.floor(age) : null,
    created_at: Date.now(),
    grade: Number.isFinite(grade) ? Math.floor(grade) : null,
    major: major ? String(major).slice(0, 40) : null,
    cohort: cohort ? String(cohort).slice(0, 20) : null,
    school_name: school_name ? String(school_name).slice(0, 120) : null,
  });
  return { id: info.lastInsertRowid };
}
export function getUserByUsername(username) {
  return getUserByUsernameStmt.get(String(username || '').trim()) || null;
}
export function getUserById(id) {
  return getUserByIdStmt.get(Number(id)) || null;
}
export function touchLogin(id) {
  touchLoginStmt.run({ id: Number(id), t: Date.now() });
}
export function updateDisplayName(id, name) {
  updateDisplayNameStmt.run({ id: Number(id), name: String(name).slice(0, 60) });
}
// Set gói cước. expires_at=null = vĩnh viễn (chỉ áp dụng cho 'free'); với plus/pro
// caller phải truyền timestamp ms. cycle='month'|'year'|null.
export function setUserPlan(id, { plan, expires_at = null, cycle = null }) {
  setUserPlanStmt.run({
    id: Number(id),
    plan: String(plan || 'free'),
    expires: expires_at ? Number(expires_at) : null,
    cycle: cycle ? String(cycle) : null,
  });
}
export function createSession({ token, user_id, ttlMs }) {
  const now = Date.now();
  insertSessionStmt.run({ token, user_id, created_at: now, expires_at: now + ttlMs });
  return { token, expires_at: now + ttlMs };
}
export function getSession(token) {
  if (!token) return null;
  return getSessionStmt.get(String(token), { now: Date.now() }) || null;
}
export function deleteSession(token) {
  deleteSessionStmt.run(String(token || ''));
}
export function purgeExpiredSessions() {
  purgeExpiredSessionsStmt.run(Date.now());
}
// Quét rác phiên hết hạn mỗi giờ (nhẹ nhàng — bảng nhỏ).
setInterval(purgeExpiredSessions, 60 * 60 * 1000).unref?.();

// --- OAuth identities ---
const findOAuthStmt = db.prepare(`
  SELECT u.id, u.username, u.display_name, u.role, u.email, u.avatar_url,
         oi.id AS oauth_id, oi.provider, oi.subject
  FROM oauth_identities oi JOIN users u ON u.id = oi.user_id
  WHERE oi.provider = ? AND oi.subject = ?
`);
const insertOAuthStmt = db.prepare(`
  INSERT INTO oauth_identities (user_id, provider, subject, email, created_at)
  VALUES (@user_id, @provider, @subject, @email, @created_at)
`);
const updateUserProfileStmt = db.prepare(`
  UPDATE users SET
    display_name = COALESCE(@display_name, display_name),
    email        = COALESCE(@email, email),
    avatar_url   = COALESCE(@avatar_url, avatar_url)
  WHERE id = @id
`);
const countUsernameStmt = db.prepare(`SELECT COUNT(*) AS n FROM users WHERE username = ? COLLATE NOCASE`);

export function findUserByOAuth(provider, subject) {
  return findOAuthStmt.get(String(provider), String(subject)) || null;
}
export function linkOAuth({ user_id, provider, subject, email }) {
  insertOAuthStmt.run({
    user_id, provider, subject,
    email: email ? String(email).slice(0, 120) : null,
    created_at: Date.now(),
  });
}
export function updateUserProfile(id, { display_name, email, avatar_url } = {}) {
  updateUserProfileStmt.run({
    id, display_name: display_name || null,
    email: email || null, avatar_url: avatar_url || null,
  });
}
// Người dùng tự sửa hồ sơ (display_name + age + email + 4 trường HS/SV). Set trực
// tiếp (không COALESCE) vì form cung cấp đủ; email/major/cohort/school_name rỗng → null.
// grade rỗng/0 → null. Caller chịu trách nhiệm validate theo role (xem auth.js).
const updateEditableStmt = db.prepare(`
  UPDATE users SET
    display_name = @display_name, age = @age, email = @email,
    grade = @grade, major = @major, cohort = @cohort, school_name = @school_name
  WHERE id = @id
`);
export function updateUserEditable(id, { display_name, age, email,
                                          grade = null, major = null, cohort = null, school_name = null }) {
  updateEditableStmt.run({
    id: Number(id),
    display_name: String(display_name).slice(0, 60),
    age: Number.isFinite(age) ? Math.floor(age) : null,
    email: email ? String(email).slice(0, 120) : null,
    grade: Number.isFinite(grade) && grade > 0 ? Math.floor(grade) : null,
    major: major ? String(major).slice(0, 40) : null,
    cohort: cohort ? String(cohort).slice(0, 20) : null,
    school_name: school_name ? String(school_name).slice(0, 120) : null,
  });
}
export function isUsernameTaken(username) {
  return (countUsernameStmt.get(String(username))?.n || 0) > 0;
}

// ── Family links (Trục 4) ──
const insertFamilyStmt = db.prepare(`
  INSERT OR IGNORE INTO family_links (parent_user_id, child_user_id, created_at)
  VALUES (@parent_user_id, @child_user_id, @created_at)
`);
const deleteFamilyStmt = db.prepare(`
  DELETE FROM family_links WHERE parent_user_id = @parent AND child_user_id = @child
`);
const listChildrenStmt = db.prepare(`
  SELECT u.id, u.username, u.display_name, u.role, u.grade, u.school_name, u.plan, u.plan_expires_at
  FROM family_links f JOIN users u ON u.id = f.child_user_id
  WHERE f.parent_user_id = ? ORDER BY f.created_at ASC
`);
const getParentPlanStmt = db.prepare(`
  SELECT u.id AS parent_id, u.plan AS parent_plan, u.plan_expires_at AS parent_plan_expires_at
  FROM family_links f JOIN users u ON u.id = f.parent_user_id
  WHERE f.child_user_id = ?
  ORDER BY (CASE u.plan WHEN 'pro' THEN 3 WHEN 'plus' THEN 2 WHEN 'free' THEN 1 ELSE 0 END) DESC
  LIMIT 1
`);

export function linkChildToParent({ parent_user_id, child_user_id }) {
  const info = insertFamilyStmt.run({
    parent_user_id: Number(parent_user_id),
    child_user_id: Number(child_user_id),
    created_at: Date.now(),
  });
  return { linked: info.changes > 0 };
}
export function unlinkChildFromParent({ parent_user_id, child_user_id }) {
  const info = deleteFamilyStmt.run({ parent: Number(parent_user_id), child: Number(child_user_id) });
  return { unlinked: info.changes > 0 };
}
export function listChildrenOfParent(parent_user_id) {
  return listChildrenStmt.all(Number(parent_user_id));
}
/** Trả về parent có plan cao nhất (để con kế thừa). null nếu không có/không link. */
export function getBestParentPlanForChild(child_user_id) {
  return getParentPlanStmt.get(Number(child_user_id)) || null;
}

// ── User wallets (per-domain) ──
// Ví XP/coin/streak/daily-quest per-user PER-TRƯỜNG. Mỗi tài khoản tại 1 thời điểm
// chỉ tham gia 1 trường (users.enrolled_domain). Tiến trình theo (user_id, domain):
// đổi trường = tạo bucket mới, level/coin/xp/streak ở bucket cũ vẫn lưu (ẩn) để
// nếu quay lại trường cũ thì khôi phục liền — anh Lâm chốt giữ ẩn, không xoá.
//
// domain '' (rỗng) = legacy bucket: ví của user CHƯA chọn trường (tài khoản cũ
// trước khi triển khai per-school) hoặc admin (admin không bound vào trường).
db.exec(`
  CREATE TABLE IF NOT EXISTS user_wallets (
    user_id          INTEGER NOT NULL,
    domain           TEXT    NOT NULL DEFAULT '',
    coins            INTEGER NOT NULL DEFAULT 0,
    xp               INTEGER NOT NULL DEFAULT 0,
    streak           INTEGER NOT NULL DEFAULT 0,
    longest_streak   INTEGER NOT NULL DEFAULT 0,
    streak_shields   INTEGER NOT NULL DEFAULT 0,
    last_visit_day   TEXT    NOT NULL DEFAULT '',
    achievements     TEXT    NOT NULL DEFAULT '[]',
    vr_sessions      INTEGER NOT NULL DEFAULT 0,
    meta_sessions    INTEGER NOT NULL DEFAULT 0,
    quizzes_passed   INTEGER NOT NULL DEFAULT 0,
    modules_by_day   TEXT    NOT NULL DEFAULT '{}',
    daily            TEXT    NOT NULL DEFAULT '{}',
    quests_claimed   TEXT    NOT NULL DEFAULT '{}',
    updated_at       INTEGER NOT NULL,
    PRIMARY KEY (user_id, domain),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// Migration legacy → per-domain: nếu user_wallets cũ chỉ có PK user_id (chưa có
// cột domain) thì recreate với composite PK. Toàn bộ row cũ vào bucket '' để FE
// tự "khớp" sau lần đầu gọi /api/me/enroll (lúc đó BE merge bucket '' → bucket
// domain user chọn). Idempotent: chỉ migrate khi thiếu cột domain.
{
  const cols = db.prepare(`PRAGMA table_info('user_wallets')`).all();
  if (cols.length > 0 && !cols.some(c => c.name === 'domain')) {
    db.exec('BEGIN');
    try {
      db.exec(`
        CREATE TABLE user_wallets_new (
          user_id          INTEGER NOT NULL,
          domain           TEXT    NOT NULL DEFAULT '',
          coins            INTEGER NOT NULL DEFAULT 0,
          xp               INTEGER NOT NULL DEFAULT 0,
          streak           INTEGER NOT NULL DEFAULT 0,
          longest_streak   INTEGER NOT NULL DEFAULT 0,
          streak_shields   INTEGER NOT NULL DEFAULT 0,
          last_visit_day   TEXT    NOT NULL DEFAULT '',
          achievements     TEXT    NOT NULL DEFAULT '[]',
          vr_sessions      INTEGER NOT NULL DEFAULT 0,
          meta_sessions    INTEGER NOT NULL DEFAULT 0,
          quizzes_passed   INTEGER NOT NULL DEFAULT 0,
          modules_by_day   TEXT    NOT NULL DEFAULT '{}',
          daily            TEXT    NOT NULL DEFAULT '{}',
          quests_claimed   TEXT    NOT NULL DEFAULT '{}',
          updated_at       INTEGER NOT NULL,
          PRIMARY KEY (user_id, domain),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        INSERT INTO user_wallets_new
          (user_id, domain, coins, xp, streak, longest_streak, streak_shields,
           last_visit_day, achievements, vr_sessions, meta_sessions,
           quizzes_passed, modules_by_day, daily, quests_claimed, updated_at)
        SELECT
          user_id, '', coins, xp, streak, longest_streak, streak_shields,
          last_visit_day, achievements, vr_sessions, meta_sessions,
          quizzes_passed, modules_by_day, daily, quests_claimed, updated_at
        FROM user_wallets;
        DROP TABLE user_wallets;
        ALTER TABLE user_wallets_new RENAME TO user_wallets;
      `);
      db.exec('COMMIT');
      console.log('[db] migrated user_wallets → per-domain');
    } catch (e) { db.exec('ROLLBACK'); console.warn('[db] user_wallets migration failed', e.message); throw e; }
  }
}

const getUserWalletStmt = db.prepare(`SELECT * FROM user_wallets WHERE user_id = ? AND domain = ?`);
// Khi caller không truyền domain → fallback: enrolled_domain của user (đọc users
// table). User chưa enroll → '' (legacy bucket). Admin (enrolled_domain NULL) cũng
// rơi vào '' — phù hợp vì admin không bound vào trường nào.
const _getEnrolledDomainStmt = db.prepare(`SELECT enrolled_domain FROM users WHERE id = ?`);
function _resolveDomain(user_id, domain) {
  if (typeof domain === 'string') return domain;
  const row = _getEnrolledDomainStmt.get(Number(user_id));
  return row?.enrolled_domain || '';
}
const upsertUserWalletStmt = db.prepare(`
  INSERT INTO user_wallets (user_id, domain, coins, xp, streak, longest_streak, streak_shields,
                            last_visit_day, achievements, vr_sessions, meta_sessions,
                            quizzes_passed, modules_by_day, daily, quests_claimed, updated_at)
  VALUES (@user_id, @domain, @coins, @xp, @streak, @longest_streak, @streak_shields,
          @last_visit_day, @achievements, @vr_sessions, @meta_sessions,
          @quizzes_passed, @modules_by_day, @daily, @quests_claimed, @updated_at)
  ON CONFLICT(user_id, domain) DO UPDATE SET
    coins          = excluded.coins,
    xp             = excluded.xp,
    streak         = excluded.streak,
    longest_streak = excluded.longest_streak,
    streak_shields = excluded.streak_shields,
    last_visit_day = excluded.last_visit_day,
    achievements   = excluded.achievements,
    vr_sessions    = excluded.vr_sessions,
    meta_sessions  = excluded.meta_sessions,
    quizzes_passed = excluded.quizzes_passed,
    modules_by_day = excluded.modules_by_day,
    daily          = excluded.daily,
    quests_claimed = excluded.quests_claimed,
    updated_at     = excluded.updated_at
`);

/**
 * Đọc ví của 1 user TRONG 1 TRƯỜNG. Caller không truyền `domain` → tự tra
 * `users.enrolled_domain` (admin/chưa-enroll → bucket ''). Trả null nếu user chưa
 * có row ở bucket đó → FE fallback ví rỗng (đúng yêu cầu "sang trường mới = làm
 * lại"). Bucket cũ vẫn còn trong DB, không bị mất.
 */
export function getUserWallet(user_id, domain) {
  const d = _resolveDomain(user_id, domain);
  const row = getUserWalletStmt.get(Number(user_id), d);
  if (!row) return null;
  // Parse các trường JSON; lỗi parse → giá trị mặc định an toàn.
  const parse = (s, fallback) => { try { return JSON.parse(s); } catch { return fallback; } };
  return {
    coins:          row.coins | 0,
    xp:             row.xp | 0,
    streak:         row.streak | 0,
    longestStreak:  row.longest_streak | 0,
    streakShields:  row.streak_shields | 0,
    lastVisitDay:   row.last_visit_day || '',
    achievements:   parse(row.achievements, []),
    vrSessions:     row.vr_sessions | 0,
    metaSessions:   row.meta_sessions | 0,
    quizzesPassed:  row.quizzes_passed | 0,
    modulesByDay:   parse(row.modules_by_day, {}),
    daily:          parse(row.daily, {}),
    questsClaimed:  parse(row.quests_claimed, {}),
    // KHÔNG dùng `| 0` cho timestamp ms — vượt 2^31 sẽ bị truncate về 32-bit signed.
    updatedAt:      Number(row.updated_at) || 0,
  };
}

const _toInt = (v, max = 1e9) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
const _toStr = (v, max = 32) => String(v || '').slice(0, max);
const _toJson = (v, fallback) => {
  // Accept either object/array hoặc JSON string. Re-serialize để chuẩn hoá + giới hạn size.
  try {
    const obj = (typeof v === 'string') ? JSON.parse(v) : (v ?? fallback);
    const s = JSON.stringify(obj);
    return s.length > 64_000 ? JSON.stringify(fallback) : s;     // 64KB cap — đủ rộng cho modulesByDay
  } catch { return JSON.stringify(fallback); }
};

// Gộp modulesByDay: union các module id theo từng ngày. Bảo vệ chống 1 client
// cũ (chưa biết module mới) ghi đè làm mất danh sách bài đã hoàn thành trong ngày.
function _mergeModulesByDay(cur = {}, inc = {}) {
  const out = {};
  for (const day of new Set([...Object.keys(cur), ...Object.keys(inc)])) {
    out[day] = [...new Set([...(cur[day] || []), ...(inc[day] || [])])];
  }
  return out;
}

/**
 * Đồng bộ ví của user từ client. CỐT LÕI an toàn: các field game-state CHỈ TĂNG
 * (xp, coins, longest_streak, vr/meta sessions, quizzes_passed, achievements,
 * modules_by_day) được áp dụng MONOTONIC — không bao giờ cho giá trị mới NHỎ HƠN
 * giá trị server hiện có. Nhờ vậy mọi race ở client (tab cũ, thiết bị khác, fetch
 * lỗi rồi đẩy local thấp) đều vô hại: không thể hạ level của user.
 *
 * Field CÓ THỂ giảm hợp lệ (streak reset khi bỏ lỡ ngày, shield bị tiêu, daily
 * reset mỗi ngày) → last-write theo payload client.
 *
 * @param {object} opts
 * @param {boolean} [opts.monotonic=true] - false để ghi đè cứng (admin chỉnh tay).
 */
export function upsertUserWallet(user_id, w = {}, { monotonic = true, domain } = {}) {
  const d = _resolveDomain(user_id, domain);
  const cur = getUserWallet(user_id, d) || {};
  const pick = (k, def = 0) => (w[k] !== undefined ? w[k] : (cur[k] ?? def));
  // Monotonic ↑ : lấy max(server, client). Không monotonic → lấy client (last-write).
  const up = (k, max = 1e9) => {
    const incoming = _toInt(pick(k), max);
    return monotonic ? Math.max(incoming, _toInt(cur[k] ?? 0, max)) : incoming;
  };
  const incAch = Array.isArray(pick('achievements', [])) ? pick('achievements', []) : [];
  const achievements = monotonic
    ? [...new Set([...(cur.achievements || []), ...incAch])]   // union — badge không mất
    : incAch;
  const incMods = (typeof pick('modulesByDay', {}) === 'object') ? pick('modulesByDay', {}) : {};
  const modulesByDay = monotonic ? _mergeModulesByDay(cur.modulesByDay, incMods) : incMods;

  upsertUserWalletStmt.run({
    user_id:        Number(user_id),
    domain:         d,
    coins:          up('coins', 1e12),
    xp:             up('xp', 1e12),
    longest_streak: up('longestStreak', 10000),
    vr_sessions:    up('vrSessions', 1e9),
    meta_sessions:  up('metaSessions', 1e9),
    quizzes_passed: up('quizzesPassed', 1e9),
    // Có thể giảm hợp lệ → last-write từ client.
    streak:         _toInt(pick('streak'), 10000),
    streak_shields: _toInt(pick('streakShields'), 1000),
    last_visit_day: _toStr(pick('lastVisitDay', ''), 16),
    achievements:   _toJson(achievements, []),
    modules_by_day: _toJson(modulesByDay, {}),
    daily:          _toJson(pick('daily', {}), {}),
    quests_claimed: _toJson(pick('questsClaimed', {}), {}),
    updated_at:     Date.now(),
  });
  return getUserWallet(user_id, d);
}

// ─── Enrollment helpers (mỗi tài khoản 1 trường tại 1 thời điểm) ───
// Đọc enrolled_domain của user. Trả null nếu chưa chọn (FE bắt mở modal).
export function getEnrolledDomain(user_id) {
  const row = _getEnrolledDomainStmt.get(Number(user_id));
  return row?.enrolled_domain || null;
}
const _setEnrolledDomainStmt = db.prepare(`UPDATE users SET enrolled_domain = ? WHERE id = ?`);
// Set/đổi trường. domain=null cho phép admin reset. KHÔNG đụng tới user_wallets /
// user_skills bucket cũ — chúng vẫn lưu (ẩn vì query luôn lọc theo domain hiện
// tại). User quay lại trường cũ → bucket cũ tự hiện lại đúng tiến trình.
export function setEnrolledDomain(user_id, domain) {
  const d = (domain == null || domain === '') ? null : String(domain).slice(0, 40);
  _setEnrolledDomainStmt.run(d, Number(user_id));
  return d;
}

console.log(`[db] SQLite open at ${dbPath}`);

// --- Scenario runs (cross-device sync — added during phase rollback) ---
db.exec(`
  CREATE TABLE IF NOT EXISTS scenario_runs (
    user_id     INTEGER NOT NULL,
    family_id   TEXT    NOT NULL,
    runs        INTEGER NOT NULL DEFAULT 0,
    best_stars  INTEGER NOT NULL DEFAULT 0,
    best_score  INTEGER NOT NULL DEFAULT 0,
    last_ts     INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, family_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_scn_runs_user ON scenario_runs(user_id);
`);

export function getScenarioRunsForUser(user_id) {
  const rows = db.prepare(
    `SELECT family_id, runs, best_stars, best_score, last_ts
     FROM scenario_runs WHERE user_id = ?`
  ).all(Number(user_id));
  const out = {};
  for (const r of rows) {
    out[r.family_id] = {
      runs: r.runs | 0,
      bestStars: r.best_stars | 0,
      bestScore: r.best_score | 0,
      lastTs: Number(r.last_ts) || 0,
    };
  }
  return out;
}

export function recordScenarioRunDb(user_id, family_id, stars = 0, score = 0) {
  const fid = String(family_id || '').slice(0, 64);
  if (!fid) return null;
  const s = Math.max(0, Math.min(3, Math.floor(Number(stars) || 0)));
  const sc = Math.max(0, Math.min(1000, Math.floor(Number(score) || 0)));
  db.prepare(`
    INSERT INTO scenario_runs (user_id, family_id, runs, best_stars, best_score, last_ts)
    VALUES (?, ?, 1, ?, ?, ?)
    ON CONFLICT(user_id, family_id) DO UPDATE SET
      runs       = scenario_runs.runs + 1,
      best_stars = MAX(scenario_runs.best_stars, excluded.best_stars),
      best_score = MAX(scenario_runs.best_score, excluded.best_score),
      last_ts    = excluded.last_ts
  `).run(Number(user_id), fid, s, sc, Date.now());
  const row = db.prepare(
    `SELECT runs, best_stars, best_score, last_ts FROM scenario_runs
     WHERE user_id = ? AND family_id = ?`
  ).get(Number(user_id), fid);
  return row ? {
    runs: row.runs | 0,
    bestStars: row.best_stars | 0,
    bestScore: row.best_score | 0,
    lastTs: Number(row.last_ts) || 0,
  } : null;
}

// ============================================================
// ScoreUp integration tables
// ============================================================
//   question_attempts    — lưu mỗi lần HS làm 1 câu hỏi (ScoreUp không lưu giúp)
//   webhook_events_seen  — dedup theo event_id khi ScoreUp POST webhook (xem
//                          server/contexts/integration/scoreup-webhook.js)
// ============================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS question_attempts (
    id                     INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id                INTEGER NOT NULL,
    scoreup_question_id    TEXT,                       -- id câu hỏi bên ScoreUp
    question_external_id   TEXT,                       -- external_id tizia:* (nếu Tizia tự đẩy)
    subject_id             TEXT,
    chapter_id             TEXT,
    answers_json           TEXT,                       -- JSON đáp án HS chọn
    correct                INTEGER NOT NULL DEFAULT 0, -- 0/1
    score                  REAL    NOT NULL DEFAULT 0, -- 0..1 (mcq_multi tính %)
    duration_ms            INTEGER,
    created_at             INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_qa_user    ON question_attempts(user_id, created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_qa_subject ON question_attempts(subject_id, chapter_id);
  CREATE INDEX IF NOT EXISTS idx_qa_qid     ON question_attempts(scoreup_question_id);

  -- Dedup webhook ScoreUp theo event_id (UUID v4). Cleanup > 7 ngày bằng cron riêng.
  CREATE TABLE IF NOT EXISTS scoreup_webhook_events_seen (
    event_id     TEXT PRIMARY KEY,
    event_type   TEXT,
    occurred_at  INTEGER,
    processed_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_swes_processed ON scoreup_webhook_events_seen(processed_at);

  -- ── Codelab submissions tracking (xem contexts/integration/codelab-webhook.js) ──
  -- PK (submission_id, status) cho phép lưu nhiều bước trạng thái nếu Codelab fire
  -- nhiều event cùng 1 submission (queued → running → accepted). Hiện Codelab chỉ
  -- fire 'submission.completed' nên thường có 1 row/submission, nhưng schema mở.
  CREATE TABLE IF NOT EXISTS codelab_submissions (
    submission_id     TEXT    NOT NULL,
    status            TEXT    NOT NULL,
    problem_slug      TEXT,
    external_user_ref TEXT,        -- "tizia:user:<id>"
    user_id           INTEGER,     -- parse từ external_user_ref nếu match
    score             REAL,
    passed_cases      INTEGER,
    total_cases       INTEGER,
    language_id       INTEGER,
    completed_at      INTEGER,     -- ms epoch
    processed_at      INTEGER NOT NULL,
    PRIMARY KEY (submission_id, status)
  );
  CREATE INDEX IF NOT EXISTS idx_cls_user      ON codelab_submissions(user_id, completed_at);
  CREATE INDEX IF NOT EXISTS idx_cls_ext_ref   ON codelab_submissions(external_user_ref, completed_at);
  CREATE INDEX IF NOT EXISTS idx_cls_problem   ON codelab_submissions(problem_slug, status);
`);

const insertQAStmt = db.prepare(`
  INSERT INTO question_attempts
    (user_id, scoreup_question_id, question_external_id,
     subject_id, chapter_id, answers_json, correct, score, duration_ms, created_at)
  VALUES (@user_id, @scoreup_question_id, @question_external_id,
          @subject_id, @chapter_id, @answers_json, @correct, @score, @duration_ms, @t)
`);

/** Lưu 1 attempt câu hỏi (gọi từ route /api/quiz/attempt). */
export function recordQuestionAttempt({
  user_id, scoreup_question_id = null, question_external_id = null,
  subject_id = null, chapter_id = null, answers = null,
  correct = false, score = 0, duration_ms = null,
}) {
  const info = insertQAStmt.run({
    user_id: Number(user_id),
    scoreup_question_id: scoreup_question_id ? String(scoreup_question_id) : null,
    question_external_id: question_external_id ? String(question_external_id) : null,
    subject_id: subject_id ? String(subject_id) : null,
    chapter_id: chapter_id ? String(chapter_id) : null,
    answers_json: answers != null ? JSON.stringify(answers).slice(0, 4000) : null,
    correct: correct ? 1 : 0,
    score: Math.max(0, Math.min(1, Number(score) || 0)),
    duration_ms: Number.isFinite(duration_ms) ? Math.floor(duration_ms) : null,
    t: Date.now(),
  });
  return { id: info.lastInsertRowid };
}

/** Trả N attempt gần nhất của 1 user (cho dashboard học sinh / phụ huynh). */
export function getRecentQuestionAttempts(user_id, limit = 50) {
  return db.prepare(`
    SELECT id, scoreup_question_id, subject_id, chapter_id, correct, score, duration_ms, created_at
    FROM question_attempts WHERE user_id = ?
    ORDER BY created_at DESC LIMIT ?
  `).all(Number(user_id), Math.min(Math.max(Number(limit) || 50, 1), 500));
}

// ── ScoreUp webhook dedup helpers (xem scoreup-webhook.js) ──
const insertSeenStmt = db.prepare(`
  INSERT OR IGNORE INTO scoreup_webhook_events_seen (event_id, event_type, occurred_at, processed_at)
  VALUES (?, ?, ?, ?)
`);
/** Return true nếu event đã thấy rồi (dedup); false nếu mới insert. */
export function markScoreUpEventSeen(eventId, eventType, occurredAt) {
  if (!eventId) return false;
  const info = insertSeenStmt.run(
    String(eventId), eventType ? String(eventType) : null,
    Number(occurredAt) || null, Date.now(),
  );
  return info.changes === 0; // 0 = đã tồn tại (duplicate)
}
/** Xoá event > 7 ngày — gọi từ cron nhẹ (không bắt buộc, table không quá nặng). */
export function pruneScoreUpEventsSeen(olderThanMs = 7 * 24 * 3600 * 1000) {
  const cutoff = Date.now() - olderThanMs;
  return db.prepare(`DELETE FROM scoreup_webhook_events_seen WHERE processed_at < ?`).run(cutoff).changes;
}

// ── Codelab submissions dedup + tracking (xem contexts/integration/codelab-webhook.js) ──
const insertCodelabSubStmt = db.prepare(`
  INSERT OR IGNORE INTO codelab_submissions
    (submission_id, status, problem_slug, external_user_ref, user_id,
     score, passed_cases, total_cases, language_id, completed_at, processed_at)
  VALUES (@submission_id, @status, @problem_slug, @external_user_ref, @user_id,
          @score, @passed_cases, @total_cases, @language_id, @completed_at, @processed_at)
`);

/**
 * Record 1 webhook delivery. Trả {firstSeen: bool, userId: number|null}.
 * - firstSeen=false → cặp (submissionId, status) đã tồn tại → caller skip side-effects.
 * - userId parse từ external_user_ref ("tizia:user:42" → 42) — null nếu format khác.
 */
export function recordCodelabSubmission({
  submissionId, status, problemSlug = null, externalUserRef = null,
  score = null, passedCases = null, totalCases = null, languageId = null,
  completedAt = null,
}) {
  if (!submissionId || !status) return { firstSeen: false, userId: null };
  let userId = null;
  if (typeof externalUserRef === 'string') {
    const m = /^tizia:user:(\d+)$/.exec(externalUserRef);
    if (m) userId = Number(m[1]);
  }
  const info = insertCodelabSubStmt.run({
    submission_id: String(submissionId),
    status: String(status),
    problem_slug: problemSlug ? String(problemSlug) : null,
    external_user_ref: externalUserRef ? String(externalUserRef) : null,
    user_id: userId,
    score: score != null ? Number(score) : null,
    passed_cases: passedCases != null ? Math.floor(Number(passedCases)) : null,
    total_cases:  totalCases  != null ? Math.floor(Number(totalCases))  : null,
    language_id:  languageId  != null ? Math.floor(Number(languageId))  : null,
    completed_at: completedAt != null ? Math.floor(Number(completedAt)) : null,
    processed_at: Date.now(),
  });
  return { firstSeen: info.changes > 0, userId };
}

/** User đã ACCEPTED bài này lần nào trước đó chưa? Để cộng XP một-lần duy nhất. */
export function hasAcceptedCodelabProblem(userId, problemSlug, excludeSubmissionId = null) {
  if (!userId || !problemSlug) return false;
  const row = db.prepare(`
    SELECT 1 FROM codelab_submissions
    WHERE user_id = ? AND problem_slug = ? AND status = 'accepted'
      ${excludeSubmissionId ? 'AND submission_id != ?' : ''}
    LIMIT 1
  `).get(...(excludeSubmissionId ? [userId, problemSlug, excludeSubmissionId] : [userId, problemSlug]));
  return Boolean(row);
}

/** Bao nhiêu bài Codelab đã accepted của user (dùng cho badge / dashboard). */
export function countCodelabAcceptedProblems(userId) {
  if (!userId) return 0;
  const row = db.prepare(`
    SELECT COUNT(DISTINCT problem_slug) AS n
    FROM codelab_submissions WHERE user_id = ? AND status = 'accepted'
  `).get(userId);
  return row?.n || 0;
}

// ============================================================
// Spaced repetition (SM-2-lite) — cá nhân hoá "Củng cố kiến thức"
// ============================================================
// Mỗi card_key là 1 câu hỏi (vd 'space:mam:c01'). State per (user, card) lưu
// ease/interval/due_at để picker FE quyết câu nào tới hạn ôn. Tách khỏi
// question_attempts vì attempts là log append-only, còn srs_cards là state
// hiện tại (upsert mỗi lần review).
db.exec(`
  CREATE TABLE IF NOT EXISTS srs_cards (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL,
    card_key      TEXT    NOT NULL,
    ease          REAL    NOT NULL DEFAULT 2.5,
    interval_d    REAL    NOT NULL DEFAULT 0,
    reps          INTEGER NOT NULL DEFAULT 0,
    lapses        INTEGER NOT NULL DEFAULT 0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    due_at        INTEGER NOT NULL,
    last_correct  INTEGER NOT NULL DEFAULT 0,
    last_seen     INTEGER NOT NULL,
    UNIQUE(user_id, card_key),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_srs_user_due ON srs_cards(user_id, due_at);
  CREATE INDEX IF NOT EXISTS idx_srs_user_key ON srs_cards(user_id, card_key);
`);

const getSrsByPrefixStmt = db.prepare(`
  SELECT card_key, ease, interval_d, reps, lapses, total_reviews,
         due_at, last_correct, last_seen
  FROM srs_cards
  WHERE user_id = ? AND card_key LIKE ? ESCAPE '\\'
`);
const getSrsCardStmt = db.prepare(`
  SELECT ease, interval_d, reps, lapses, total_reviews, due_at, last_correct, last_seen
  FROM srs_cards WHERE user_id = ? AND card_key = ?
`);
const upsertSrsStmt = db.prepare(`
  INSERT INTO srs_cards
    (user_id, card_key, ease, interval_d, reps, lapses,
     total_reviews, due_at, last_correct, last_seen)
  VALUES (@user_id, @card_key, @ease, @interval_d, @reps, @lapses,
          @total_reviews, @due_at, @last_correct, @last_seen)
  ON CONFLICT(user_id, card_key) DO UPDATE SET
    ease=excluded.ease,
    interval_d=excluded.interval_d,
    reps=excluded.reps,
    lapses=excluded.lapses,
    total_reviews=excluded.total_reviews,
    due_at=excluded.due_at,
    last_correct=excluded.last_correct,
    last_seen=excluded.last_seen
`);

/** SM-2-lite step. correct=true/false là 2 outcome duy nhất (đủ cho mầm non). */
function sm2Step(prev, correct) {
  let ease = Number(prev?.ease) || 2.5;
  let interval_d = Number(prev?.interval_d) || 0;
  let reps = Number(prev?.reps) || 0;
  let lapses = Number(prev?.lapses) || 0;
  let total_reviews = Number(prev?.total_reviews) || 0;
  total_reviews += 1;
  if (!correct) {
    reps = 0;
    lapses += 1;
    interval_d = 0;                       // ôn lại trong session sau
    ease = Math.max(1.3, ease - 0.2);
  } else {
    reps += 1;
    if (reps === 1) interval_d = 1;
    else if (reps === 2) interval_d = 3;
    else interval_d = Math.max(1, Math.round(interval_d * ease));
    ease = Math.min(2.8, ease + 0.06);
  }
  return { ease, interval_d, reps, lapses, total_reviews };
}

/** Trả về SRS state cho mọi card_key bắt đầu bằng prefix (vd 'space:mam:'). */
export function getSrsStateByPrefix(user_id, prefix) {
  const safe = String(prefix).replace(/[\\%_]/g, (c) => '\\' + c) + '%';
  return getSrsByPrefixStmt.all(Number(user_id), safe);
}

/** Ghi 1 lần review. Tự upsert + cập nhật SM-2 từ state cũ. */
export function recordSrsReview({ user_id, card_key, correct }) {
  const prev = getSrsCardStmt.get(Number(user_id), String(card_key)) || null;
  const next = sm2Step(prev, !!correct);
  const now = Date.now();
  const row = {
    user_id: Number(user_id),
    card_key: String(card_key),
    ease: next.ease,
    interval_d: next.interval_d,
    reps: next.reps,
    lapses: next.lapses,
    total_reviews: next.total_reviews,
    due_at: now + Math.round(next.interval_d * 86400000),
    last_correct: correct ? 1 : 0,
    last_seen: now,
  };
  upsertSrsStmt.run(row);
  return {
    card_key: row.card_key,
    ease: row.ease,
    interval_d: row.interval_d,
    reps: row.reps,
    lapses: row.lapses,
    total_reviews: row.total_reviews,
    due_at: row.due_at,
    last_correct: row.last_correct,
    last_seen: row.last_seen,
  };
}

// ============================================================
// user_state — Generic KV store per-user, dùng cho mọi state mini-game/draft
// không có table riêng. Mục tiêu: đổi máy không mất data (vd math2.stars,
// code-lab drafts, tutor history, …) mà không cần thiết kế 1 bảng cho mỗi
// loại. Client sync qua `state-sync.js` (hydrate lúc load, push lúc tab ẩn).
//
// Key có whitelist phía client (tránh đẩy mọi key tạp lên DB) + có cap size.
// Value lưu nguyên text (client tự stringify) — server không parse.
// ============================================================
db.exec(`
  CREATE TABLE IF NOT EXISTS user_state (
    user_id    INTEGER NOT NULL,
    key        TEXT    NOT NULL,
    value      TEXT    NOT NULL DEFAULT '',
    updated_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, key),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_user_state_user ON user_state(user_id);
`);

const _getUserStateAllStmt = db.prepare(
  `SELECT key, value, updated_at FROM user_state WHERE user_id = ?`
);
const _upsertUserStateStmt = db.prepare(`
  INSERT INTO user_state (user_id, key, value, updated_at)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(user_id, key) DO UPDATE SET
    value      = excluded.value,
    updated_at = excluded.updated_at
`);
const _deleteUserStateStmt = db.prepare(
  `DELETE FROM user_state WHERE user_id = ? AND key = ?`
);

/** Lấy toàn bộ KV của 1 user. Trả { key: { value, updatedAt } }. */
export function getUserState(user_id) {
  const rows = _getUserStateAllStmt.all(Number(user_id));
  const out = {};
  for (const r of rows) {
    out[r.key] = { value: r.value, updatedAt: Number(r.updated_at) || 0 };
  }
  return out;
}

// Cap 32KB/value để chống abuse. THROW (không truncate) — truncate JSON
// giữa chừng tạo string không hợp lệ → hydrate sẽ ghi đè localStorage bằng
// JSON hỏng, làm consumer (vd tutor.history JSON.parse) crash. Route handler
// bắt error này, trả 413 cho client để client biết phải nén/chunk trước.
const MAX_VALUE_BYTES = 32_000;

export class UserStateValueTooLargeError extends Error {
  constructor(key, size) {
    super(`user_state value too large: key="${key}" size=${size} > ${MAX_VALUE_BYTES}`);
    this.code = 'value_too_large';
    this.key = key;
    this.size = size;
    this.maxBytes = MAX_VALUE_BYTES;
  }
}

/**
 * Upsert nhiều key cùng lúc. `entries` là object { key: value, ... }; value
 * dạng string (client đã JSON.stringify). value rỗng/null → xoá row.
 *
 * Trả số key đã ghi để client biết quota còn lại.
 * Throw UserStateValueTooLargeError nếu bất kỳ value nào > 32KB.
 */
export function putUserState(user_id, entries) {
  if (!entries || typeof entries !== 'object') return 0;
  const now = Date.now();
  let written = 0;
  const tx = db.transaction((items) => {
    for (const [k, v] of items) {
      const key = String(k || '').slice(0, 128);
      if (!key) continue;
      if (v == null || v === '') {
        _deleteUserStateStmt.run(Number(user_id), key);
      } else {
        const value = String(v);
        if (value.length > MAX_VALUE_BYTES) {
          throw new UserStateValueTooLargeError(key, value.length);
        }
        _upsertUserStateStmt.run(Number(user_id), key, value, now);
      }
      written += 1;
    }
  });
  tx(Object.entries(entries));
  return written;
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL APPS — Developer cài app theo chuẩn AI Portal (manifest.json + zip)
// vào sandbox cá nhân (per-user alias). Admin có thể promote thành public.
// ─────────────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS portal_apps (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    owner_id      INTEGER NOT NULL,
    alias         TEXT    NOT NULL,
    name          TEXT    NOT NULL,
    description   TEXT,
    icon          TEXT,
    version       TEXT,
    manifest_json TEXT    NOT NULL,
    is_public     INTEGER NOT NULL DEFAULT 0,
    size_bytes    INTEGER NOT NULL DEFAULT 0,
    installed_at  INTEGER NOT NULL,
    updated_at    INTEGER NOT NULL,
    UNIQUE(owner_id, alias),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_portal_apps_owner ON portal_apps(owner_id);
  CREATE INDEX IF NOT EXISTS idx_portal_apps_public ON portal_apps(is_public) WHERE is_public = 1;
`);
// Phase 1.5: mở rộng cho "builtin app" (đăng ký URL nội bộ thay vì zip user upload).
// Cách dùng: kind='builtin' → target_url chứa /xxx.html, không cần thư mục data/portal-apps.
// Phân nhóm cho campus map: category + domain để filter mặc định theo cấp/trường.
try { db.exec(`ALTER TABLE portal_apps ADD COLUMN kind TEXT NOT NULL DEFAULT 'embedded'`); } catch {}
try { db.exec(`ALTER TABLE portal_apps ADD COLUMN target_url TEXT`); } catch {}
try { db.exec(`ALTER TABLE portal_apps ADD COLUMN category TEXT`); } catch {}
try { db.exec(`ALTER TABLE portal_apps ADD COLUMN domain TEXT`); } catch {}
try { db.exec(`CREATE INDEX IF NOT EXISTS idx_portal_apps_kind_domain ON portal_apps(kind, domain)`); } catch {}

const _insertPortalAppStmt = db.prepare(`
  INSERT INTO portal_apps (owner_id, alias, name, description, icon, version,
                           manifest_json, size_bytes, installed_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(owner_id, alias) DO UPDATE SET
    name          = excluded.name,
    description   = excluded.description,
    icon          = excluded.icon,
    version       = excluded.version,
    manifest_json = excluded.manifest_json,
    size_bytes    = excluded.size_bytes,
    updated_at    = excluded.updated_at
`);
const _listPortalAppsByOwnerStmt = db.prepare(
  `SELECT id, owner_id, alias, name, description, icon, version, is_public,
          size_bytes, installed_at, updated_at, kind, target_url, category, domain
   FROM portal_apps
   WHERE owner_id = ? AND (kind IS NULL OR kind = 'embedded')
   ORDER BY updated_at DESC`
);
const _listPortalAppsPublicStmt = db.prepare(
  `SELECT pa.id, pa.owner_id, pa.alias, pa.name, pa.description, pa.icon, pa.version,
          pa.is_public, pa.size_bytes, pa.installed_at, pa.updated_at,
          pa.kind, pa.target_url, pa.category, pa.domain,
          u.username AS owner_username, u.display_name AS owner_display_name
   FROM portal_apps pa
   LEFT JOIN users u ON u.id = pa.owner_id
   WHERE pa.is_public = 1 AND (pa.kind IS NULL OR pa.kind = 'embedded')
   ORDER BY pa.updated_at DESC`
);
const _getPortalAppByIdStmt = db.prepare(
  `SELECT * FROM portal_apps WHERE id = ?`
);
const _getPortalAppByOwnerAliasStmt = db.prepare(
  `SELECT * FROM portal_apps WHERE owner_id = ? AND alias = ?`
);
const _deletePortalAppStmt = db.prepare(
  `DELETE FROM portal_apps WHERE id = ?`
);
const _setPortalAppPublicStmt = db.prepare(
  `UPDATE portal_apps SET is_public = ?, updated_at = ? WHERE id = ?`
);

export function upsertPortalApp({
  ownerId, alias, name, description, icon, version, manifestJson, sizeBytes,
}) {
  const now = Date.now();
  const info = _insertPortalAppStmt.run(
    Number(ownerId), String(alias), String(name),
    description ? String(description) : null,
    icon ? String(icon) : null,
    version ? String(version) : null,
    typeof manifestJson === 'string' ? manifestJson : JSON.stringify(manifestJson),
    Number(sizeBytes) | 0, now, now
  );
  // Trả về row vừa upsert (id ổn định kể cả lúc UPDATE)
  return _getPortalAppByOwnerAliasStmt.get(Number(ownerId), String(alias));
}
export function listPortalAppsByOwner(ownerId) {
  return _listPortalAppsByOwnerStmt.all(Number(ownerId));
}
export function listPortalAppsPublic() {
  return _listPortalAppsPublicStmt.all();
}
export function getPortalAppById(id) {
  return _getPortalAppByIdStmt.get(Number(id)) || null;
}
export function getPortalAppByOwnerAlias(ownerId, alias) {
  return _getPortalAppByOwnerAliasStmt.get(Number(ownerId), String(alias)) || null;
}
export function deletePortalApp(id) {
  return _deletePortalAppStmt.run(Number(id)).changes;
}
export function setPortalAppPublic(id, isPublic) {
  return _setPortalAppPublicStmt.run(isPublic ? 1 : 0, Date.now(), Number(id)).changes;
}

// ─────────────────────────────────────────────────────────────────────────────
// USER DOMAIN GRANTS — Admin mở quyền vào 1 trường (kể cả trường locked) cho
// 1 user cụ thể. Override status check + plan check. Hết hạn (expires_at < now)
// → grant tự degrade (FE/BE đều check). expires_at NULL = không hết hạn.
// ─────────────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS user_domain_grants (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    domain_id    TEXT    NOT NULL,
    granted_at   INTEGER NOT NULL,
    granted_by   INTEGER,
    expires_at   INTEGER,
    note         TEXT,
    UNIQUE(user_id, domain_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_user_domain_grants_user ON user_domain_grants(user_id);
`);

const _grantDomainStmt = db.prepare(`
  INSERT INTO user_domain_grants (user_id, domain_id, granted_at, granted_by, expires_at, note)
  VALUES (?, ?, ?, ?, ?, ?)
  ON CONFLICT(user_id, domain_id) DO UPDATE SET
    granted_at = excluded.granted_at,
    granted_by = excluded.granted_by,
    expires_at = excluded.expires_at,
    note       = excluded.note
`);
const _revokeDomainStmt = db.prepare(
  `DELETE FROM user_domain_grants WHERE user_id = ? AND domain_id = ?`
);
const _listGrantsByUserStmt = db.prepare(
  `SELECT domain_id, granted_at, granted_by, expires_at, note
   FROM user_domain_grants
   WHERE user_id = ? AND (expires_at IS NULL OR expires_at > ?)
   ORDER BY granted_at DESC`
);
const _hasGrantStmt = db.prepare(
  `SELECT 1 FROM user_domain_grants
   WHERE user_id = ? AND domain_id = ? AND (expires_at IS NULL OR expires_at > ?) LIMIT 1`
);
const _listAllGrantsStmt = db.prepare(
  `SELECT g.id, g.user_id, g.domain_id, g.granted_at, g.granted_by, g.expires_at, g.note,
          u.username, u.display_name, u.role,
          gb.username AS granted_by_username
   FROM user_domain_grants g
   LEFT JOIN users u  ON u.id  = g.user_id
   LEFT JOIN users gb ON gb.id = g.granted_by
   ORDER BY g.granted_at DESC LIMIT 500`
);

export function grantUserDomain({ userId, domainId, grantedBy, expiresAt = null, note = null }) {
  return _grantDomainStmt.run(
    Number(userId), String(domainId), Date.now(),
    grantedBy ? Number(grantedBy) : null,
    expiresAt ? Number(expiresAt) : null,
    note ? String(note).slice(0, 200) : null
  ).changes;
}
export function revokeUserDomain(userId, domainId) {
  return _revokeDomainStmt.run(Number(userId), String(domainId)).changes;
}
export function hasUserDomainGrant(userId, domainId) {
  return !!_hasGrantStmt.get(Number(userId), String(domainId), Date.now());
}
export function listUserDomainGrants(userId) {
  return _listGrantsByUserStmt.all(Number(userId), Date.now()).map(r => r.domain_id);
}
export function listUserDomainGrantsFull(userId) {
  return _listGrantsByUserStmt.all(Number(userId), Date.now());
}
export function listAllDomainGrants() {
  return _listAllGrantsStmt.all();
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHOOL ADMINS — phân quyền QUẢN LÝ (manage) 1 trường cụ thể cho user. Khác
// với user_domain_grants (chỉ ACCESS). School admin có thể: xem HS trường mình,
// cấu hình campus map, quản lý apps gắn vào toà nhà (sẽ build trong Phase 2 UI).
//
// Quyết định KHÔNG thêm role mới vào users.role (giữ enum cũ: pupil/student/
// teacher/admin) — thay vào đó bảng riêng để 1 user có thể quản lý NHIỀU trường,
// và phân quyền không vĩnh viễn (revoke dễ).
// ─────────────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS school_admins (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL,
    domain_id    TEXT    NOT NULL,
    granted_at   INTEGER NOT NULL,
    granted_by   INTEGER,
    note         TEXT,
    UNIQUE(user_id, domain_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(id) ON DELETE SET NULL
  );
  CREATE INDEX IF NOT EXISTS idx_school_admins_user   ON school_admins(user_id);
  CREATE INDEX IF NOT EXISTS idx_school_admins_domain ON school_admins(domain_id);
`);

const _setSchoolAdminStmt = db.prepare(`
  INSERT INTO school_admins (user_id, domain_id, granted_at, granted_by, note)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(user_id, domain_id) DO UPDATE SET
    granted_at = excluded.granted_at,
    granted_by = excluded.granted_by,
    note       = excluded.note
`);
const _revokeSchoolAdminStmt = db.prepare(
  `DELETE FROM school_admins WHERE user_id = ? AND domain_id = ?`
);
const _listSchoolAdminDomainsByUserStmt = db.prepare(
  `SELECT domain_id FROM school_admins WHERE user_id = ? ORDER BY granted_at DESC`
);
const _isSchoolAdminStmt = db.prepare(
  `SELECT 1 FROM school_admins WHERE user_id = ? AND domain_id = ? LIMIT 1`
);
const _listAllSchoolAdminsStmt = db.prepare(
  `SELECT sa.id, sa.user_id, sa.domain_id, sa.granted_at, sa.granted_by, sa.note,
          u.username, u.display_name, u.role,
          gb.username AS granted_by_username
   FROM school_admins sa
   LEFT JOIN users u  ON u.id  = sa.user_id
   LEFT JOIN users gb ON gb.id = sa.granted_by
   ORDER BY sa.granted_at DESC LIMIT 500`
);
const _listSchoolAdminsByDomainStmt = db.prepare(
  `SELECT sa.user_id, sa.granted_at, sa.note,
          u.username, u.display_name, u.role
   FROM school_admins sa
   LEFT JOIN users u ON u.id = sa.user_id
   WHERE sa.domain_id = ?
   ORDER BY sa.granted_at DESC`
);

export function setSchoolAdmin({ userId, domainId, grantedBy, note = null }) {
  return _setSchoolAdminStmt.run(
    Number(userId), String(domainId), Date.now(),
    grantedBy ? Number(grantedBy) : null,
    note ? String(note).slice(0, 200) : null
  ).changes;
}
export function revokeSchoolAdmin(userId, domainId) {
  return _revokeSchoolAdminStmt.run(Number(userId), String(domainId)).changes;
}
export function listManagedDomains(userId) {
  return _listSchoolAdminDomainsByUserStmt.all(Number(userId)).map(r => r.domain_id);
}
export function isSchoolAdmin(userId, domainId) {
  return !!_isSchoolAdminStmt.get(Number(userId), String(domainId));
}
export function listAllSchoolAdmins() {
  return _listAllSchoolAdminsStmt.all();
}
export function listSchoolAdminsByDomain(domainId) {
  return _listSchoolAdminsByDomainStmt.all(String(domainId));
}

// Builtin app seeding — upsert theo alias trong namespace builtin (owner_id = 0 sentinel
// — không tham chiếu user thật, FK pragma đã DEFERRED check; nếu pragma strict thì cần
// 1 user system. SQLite cho phép insert ngay cả khi orphan vì FK enforce theo từng row,
// row owner=0 sẽ fail FK — workaround: insert qua chế độ defer hoặc temporarily disable).
const _findBuiltinByAliasStmt = db.prepare(
  `SELECT id FROM portal_apps WHERE kind='builtin' AND alias = ?`
);
const _insertBuiltinStmt = db.prepare(`
  INSERT INTO portal_apps (
    owner_id, alias, name, description, icon, version, manifest_json,
    is_public, size_bytes, installed_at, updated_at,
    kind, target_url, category, domain
  ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, ?, ?, 'builtin', ?, ?, ?)
`);
const _updateBuiltinStmt = db.prepare(`
  UPDATE portal_apps SET
    name = ?, description = ?, icon = ?, version = ?, manifest_json = ?,
    target_url = ?, category = ?, domain = ?, updated_at = ?
  WHERE id = ?
`);
const _listBuiltinStmt = db.prepare(
  `SELECT id, alias, name, description, icon, version, is_public,
          target_url, category, domain, installed_at, updated_at
   FROM portal_apps WHERE kind='builtin' ORDER BY domain, category, name`
);

export function upsertBuiltinApp(systemOwnerId, app) {
  const { alias, name, description, icon, version, target_url, category, domain } = app;
  const manifest = JSON.stringify({ ...app, type: 'embedded', hasFrontendOnly: false, isBuiltin: true });
  const now = Date.now();
  const existing = _findBuiltinByAliasStmt.get(String(alias));
  if (existing) {
    _updateBuiltinStmt.run(
      String(name), description || null, icon || null, version || '1.0.0',
      manifest, String(target_url), category || null, domain || null, now, existing.id
    );
    return { id: existing.id, action: 'updated' };
  }
  const info = _insertBuiltinStmt.run(
    Number(systemOwnerId), String(alias), String(name),
    description || null, icon || null, version || '1.0.0', manifest,
    now, now, String(target_url), category || null, domain || null
  );
  return { id: info.lastInsertRowid, action: 'inserted' };
}
export function listBuiltinApps() { return _listBuiltinStmt.all(); }

// Lấy user id cho "system owner" của các builtin app. Ưu tiên admin đầu tiên có sẵn.
// Nếu chưa có admin nào → trả null (seeder sẽ defer đến khi admin login đầu tiên).
const _getSystemOwnerStmt = db.prepare(
  `SELECT id FROM users WHERE role = 'admin' ORDER BY id ASC LIMIT 1`
);
export function getSystemOwnerId() {
  return _getSystemOwnerStmt.get()?.id || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL PROPOSALS — lineage của mỗi skill AI board đề xuất, ghi lại mỗi lần đi
// qua 1 cổng của harness 7-cổng (xem .scratch/ai-board-plugin-registry/spec.md).
// Chỉ để đo/truy vết — không có code nào khác phụ thuộc bảng này để chạy.
// ─────────────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS skill_proposals (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    origin        TEXT    NOT NULL,   -- 'core-skill' | 'domain-synthesized'
    domain        TEXT,
    gate_reached  REAL    NOT NULL,   -- 1..7, có cổng 5.5 (risk-triage)
    outcome       TEXT,
    request_ids   TEXT,               -- JSON array
    template_key  TEXT,               -- đếm N=10 rollback-sạch liên tiếp (ticket 13)
    budget_json   TEXT,
    pr_url        TEXT,
    created_at    INTEGER NOT NULL,
    updated_at    INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_skill_proposals_template ON skill_proposals(template_key, created_at DESC);
`);

// ─────────────────────────────────────────────────────────────────────────────
// GATE TRACE — ticket 23. 1 dòng mỗi lần harness gọi Ollama THẬT ở bất kỳ cổng
// nào (1, 2.5, 3, validator) — prompt/response thật, cộng 4 field
// prompt_eval_count/eval_count/prompt_eval_duration/eval_duration Ollama trả
// về (bằng chứng cache-hit, xem spec.md "kỷ luật cache" rule 5). Join với
// skill_proposals qua skill_proposal_id. Chỉ để đo/truy vết — không có code
// nào khác phụ thuộc bảng này để chạy. Harness ghi qua sqlite3 thô, DDL này
// là nguồn sự thật (ai-board/harness/gate_trace.py chỉ mirror cho test).
// ─────────────────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS gate_trace (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    skill_proposal_id    INTEGER NOT NULL,
    gate                 REAL    NOT NULL,
    model                TEXT,
    prompt               TEXT,
    raw_response         TEXT,
    prompt_eval_count    INTEGER,
    eval_count           INTEGER,
    prompt_eval_duration INTEGER,
    eval_duration        INTEGER,
    created_at           INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_gate_trace_proposal
    ON gate_trace(skill_proposal_id, created_at);
`);
