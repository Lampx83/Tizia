import { db, pool, als, initSchema } from './pg.js';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export { db, pool, als };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve(__dirname, '..', 'data');

fs.mkdirSync(DATA_DIR, { recursive: true });

// dbPath giờ chỉ là NHÃN hiển thị cho admin UI (db-admin.js import) — không mở
// file nào nữa vì runtime đã chuyển sang Postgres qua ./pg.js.
export const dbPath = path.join(DATA_DIR, 'tizia.db');

console.log('[db] Postgres adapter ready');

// Khởi tạo DB: chạy schema (server/schema.sql qua initSchema) + seed idempotent.
// Gọi 1 lần lúc boot (await). Schema & migration DDL giờ do server/schema.sql lo,
// KHÔNG còn inline trong file này.
export async function initDb() {
  await initSchema();

  // Seed 15 competencies GDPT 2018 — idempotent qua INSERT OR IGNORE theo code.
  // Nguồn: Thông tư 32/2018/TT-BGDĐT (Chương trình GDPT tổng thể).
  const _seedCompetencies = db.transaction(async () => {
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
    for (const r of rows) await ins.run({ ...r, created_at: now });
  });
  try { await _seedCompetencies(); } catch (e) { console.warn('[db] seed competencies failed', e.message); }

  // Auto-migrate skills catalog: nếu competencies đã seed nhưng bảng skills rỗng
  // (DB cũ vừa upgrade, hoặc volume mới) → tự chạy script catalog migration để
  // 164 skill rows nạp ngay lần boot đầu, không cần docker exec thủ công.
  // Idempotent qua INSERT OR IGNORE trong script. Skip nếu skills > 0 hoặc
  // scripts/ không tồn tại trong image (dev local trước khi build Docker).
  try {
    const _skillCount = (await db.prepare(`SELECT COUNT(*) AS n FROM skills`).get()).n;
    if (_skillCount === 0) {
      const _scriptPath = path.resolve(__dirname, '..', 'scripts', 'migrate-skills-catalog.js');
      if (fs.existsSync(_scriptPath)) {
        console.log('[db] skills empty — auto-running catalog migration…');
        // Dynamic import async — không block init. Lỗi → log, server vẫn boot.
        import(_scriptPath).then(async () => {
          const n = (await db.prepare(`SELECT COUNT(*) AS n FROM skills`).get()).n;
          console.log(`[db] skills catalog auto-seeded: ${n} rows`);
        }).catch(e => console.warn('[db] auto-migrate skills failed:', e.message));
      } else {
        console.log('[db] skills empty + no migration script (dev mode?). Run: node scripts/migrate-skills-catalog.js');
      }
    }
  } catch (e) { console.warn('[db] skills auto-migrate check failed', e.message); }
}

const insertAttemptStmt = db.prepare(`
  INSERT INTO attempts (version, player_name, score, correct, total, duration_ms, details, created_at, class_code, level_n)
  VALUES (@version, @player_name, @score, @correct, @total, @duration_ms, @details, @created_at, @class_code, @level_n)
  RETURNING id
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

export async function insertAttempt(row) {
  const info = await insertAttemptStmt.run(row);
  return { id: info.lastInsertRowid, createdAt: row.created_at };
}

export async function getLeaderboard(version, limit = 10) {
  return await leaderboardStmt.all({ version, limit });
}

export async function getStats(version) {
  return (await statsStmt.get({ version })) || { total_attempts: 0, avg_score: 0, best_score: 0, perfect_count: 0 };
}

export async function getRecent(limit = 20) {
  return await recentStmt.all({ limit });
}

// --- Class management ---
const createClassStmt = db.prepare(`
  INSERT INTO classes (code, name, teacher_name, created_at)
  VALUES (@code, @name, @teacher_name, @created_at)
  RETURNING id
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

export async function createClass({ code, name, teacher_name }) {
  const info = await createClassStmt.run({ code, name, teacher_name, created_at: Date.now() });
  return { id: info.lastInsertRowid, code };
}
export async function getClassByCode(code) { return (await getClassByCodeStmt.get(code)) || null; }
export async function listClasses() { return await listClassesStmt.all(); }
export async function getClassMembers(code) { return await classMembersStmt.all(code); }
export async function getClassAttempts(code, limit = 100) { return await classAttemptsStmt.all(code, { limit }); }
export async function getPlayerAttempts(player, limit = 50) { return await playerAttemptsStmt.all({ player, limit }); }

export async function getAllAttempts() {
  return await allAttemptsStmt.all();
}

export async function getHistogram(version) {
  return await histogramStmt.all({ version });
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
export async function getAchievements(player) {
  return await achievementsForStmt.all({ player });
}
export async function getAllRecentAchievements() {
  return await allAchievementsStmt.all();
}
export async function unlockAchievement(player, badge) {
  const info = await unlockAchievementStmt.run({ player, badge, t: Date.now() });
  return info.changes > 0;
}

// Confusion matrix: parses attempt.details.breakdown / details.medicines
// → returns { categories: [...], matrix: { actualCat: { placedCat: count } } }
// --- Requests ("Ban điều hành AI" inbox) ---
const VALID_REQ_TYPES = new Set(['game', 'theory', 'lab', 'skill', 'other']);
// 'awaiting_user' = ta chờ HS gửi thêm (ảnh/file/mô tả). setRequestStatus TỪ CHỐI IM
// LẶNG status lạ (return false, không throw) → quên set này thì mọi nơi gọi vẫn báo
// thành công mà DB không đổi. Thêm status mới phải sửa CẢ: set này, getRequestStats,
// 2 whitelist ở admin/index.js, reopenRequestStmt, 3 map STATUS phía client.
const VALID_REQ_STATUS = new Set(['pending', 'reviewing', 'awaiting_user', 'done', 'rejected']);

const insertRequestStmt = db.prepare(`
  INSERT INTO requests (domain, type, title, detail, student, status, votes, created_at, updated_at, attachments)
  VALUES (@domain, @type, @title, @detail, @student, 'pending', 1, @t, @t, @attachments)
  RETURNING id
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

export async function createRequest({ domain, type, title, detail, student, attachments = null }) {
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
  const info = await insertRequestStmt.run({
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
export async function listRequests(domain, limit = 50) {
  const rows = await listRequestsStmt.all({ domain: String(domain || ''), limit });
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
export async function voteRequest(id) {
  const info = await voteRequestStmt.run({ id: Number(id), t: Date.now() });
  return info.changes > 0;
}
export async function setRequestStatus(id, status, note) {
  if (!VALID_REQ_STATUS.has(status)) return false;
  const info = await setRequestStatusStmt.run({ id: Number(id), status, note: note ? String(note).slice(0, 500) : null, t: Date.now() });
  return info.changes > 0;
}
export async function getRequestStats(domain) {
  const rows = await requestStatsStmt.all({ domain: String(domain || '') });
  const out = { pending: 0, reviewing: 0, awaiting_user: 0, done: 0, rejected: 0 };
  for (const r of rows) out[r.status] = r.n;
  return out;
}

// --- Notifications (kênh phản hồi cá nhân cho HS) ---
const VALID_NOTIF_KINDS = new Set(['reply', 'system']);

const insertNotificationStmt = db.prepare(`
  INSERT INTO notifications (user_display_name, request_id, kind, title, body, url, created_at)
  VALUES (@user_display_name, @request_id, @kind, @title, @body, @url, @created_at)
  RETURNING id
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
export async function createNotification({ user_display_name, request_id = null, kind = 'reply', title, body = null, url = null }) {
  const u = String(user_display_name || '').trim();
  if (!u || u === 'Ẩn danh') return null;
  if (!VALID_NOTIF_KINDS.has(kind)) kind = 'reply';
  const info = await insertNotificationStmt.run({
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
export async function listNotifications(user_display_name, limit = 30) {
  const u = String(user_display_name || '').trim();
  if (!u) return [];
  return await listNotificationsStmt.all({ user: u, limit });
}
export async function countUnreadNotifications(user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return 0;
  return (await countUnreadStmt.get({ user: u }))?.n || 0;
}
export async function markNotificationRead(id, user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return false;
  return (await markReadStmt.run({ id: Number(id), user: u, t: Date.now() })).changes > 0;
}
export async function markAllNotificationsRead(user_display_name) {
  const u = String(user_display_name || '').trim();
  if (!u) return 0;
  return (await markAllReadStmt.run({ user: u, t: Date.now() })).changes;
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
  RETURNING id
`);
const listReqMsgStmt = db.prepare(`
  SELECT id, request_id, role, author_name, body, attachments, created_at
  FROM request_messages WHERE request_id = ? ORDER BY created_at ASC, id ASC
`);
const touchRequestStmt = db.prepare(`UPDATE requests SET updated_at = @t WHERE id = @id`);
// Mở lại yêu cầu đã đóng (done/rejected) → 'reviewing' khi HS gửi thêm tin nhắn.
// 'awaiting_user' cũng phải nằm đây: đó là trạng thái ta CHỜ HS gửi thêm, nên HS
// nhắn lại = bóng về sân ta. Thiếu vế này thì gửi ảnh xong vẫn thấy "Chờ bạn bổ
// sung" → kẹt ngược, đúng lỗi mà nhãn này sinh ra để chữa.
const reopenRequestStmt = db.prepare(`
  UPDATE requests SET status = 'reviewing', updated_at = @t
  WHERE id = @id AND status IN ('done', 'rejected', 'awaiting_user')
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

export async function getRequestById(id) {
  const row = await getRequestByIdStmt.get(Number(id));
  if (!row) return null;
  row.attachments = safeParseAtts(row.attachments);
  return row;
}

export async function addRequestMessage({ request_id, role, author_name = null, body, attachments = null }) {
  if (!VALID_MSG_ROLES.has(role)) role = 'system';
  const t = Date.now();
  const info = await insertReqMsgStmt.run({
    request_id: Number(request_id),
    role,
    author_name: author_name ? String(author_name).slice(0, 60) : null,
    body: String(body || '').slice(0, 10000),
    attachments: normAttachments(attachments),
    created_at: t,
  });
  // Đụng updated_at để yêu cầu nổi lên trong dashboard khi có lượt trao đổi mới.
  await touchRequestStmt.run({ id: Number(request_id), t });
  return { id: info.lastInsertRowid, created_at: t };
}

export async function listRequestMessages(request_id) {
  const rows = await listReqMsgStmt.all(Number(request_id));
  for (const r of rows) r.attachments = safeParseAtts(r.attachments);
  return rows;
}

export async function reopenRequestIfClosed(id) {
  return (await reopenRequestStmt.run({ id: Number(id), t: Date.now() })).changes > 0;
}

// --- Hộp thư Ban điều hành AI (đọc-chỉ, xuyên mọi trường) ---
// Trả các yêu cầu ĐANG CHỜ XỬ LÝ ('pending'/'reviewing') của toàn hệ thống kèm
// thread trao đổi. Yêu cầu đã đóng ('done'/'rejected') bị bỏ qua — Ban điều hành
// chỉ cần việc còn tồn. 'awaiting_user' CŨNG bỏ qua: bóng đang ở sân HS, khi HS
// nhắn lại reopenRequestIfClosed() tự đẩy về 'reviewing' nên yêu cầu quay lại
// hộp thư đúng lúc cần.
//
// Đây là nguồn dữ liệu cho route đọc-chỉ /api/ai-board/inbox (xem
// contexts/ai-agent/inbox-api.js). Hình dạng bản ghi trả về phải GIỮ NGUYÊN
// (id/db_id/from/subject/body/thread…) vì scripts/fetch-inbox.mjs và phiên hàng
// ngày đọc đúng các field đó.
const boardInboxStmt = db.prepare(`
  SELECT id, domain, type, title, detail, student, status, votes, admin_note,
         created_at, updated_at, attachments
  FROM requests
  WHERE status IN ('pending', 'reviewing')
  ORDER BY votes DESC, created_at DESC
  LIMIT @limit
`);

export async function listBoardInbox(limit = 200) {
  const cap = Math.min(Math.max(Number(limit) || 200, 1), 500);
  const rows = await boardInboxStmt.all({ limit: cap });
  // Lấy thread tuần tự thay vì Promise.all: hộp thư chỉ vài chục dòng và route
  // này chạy vài lần mỗi ngày, không đáng đánh đổi rủi ro chiếm hết pool.
  const out = [];
  for (const r of rows) {
    const msgs = await listRequestMessages(r.id);
    out.push({
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
      thread: msgs.map(m => ({
        role: m.role,
        author: m.author_name || null,
        body: m.body,
        at: new Date(m.created_at).toISOString(),
      })),
      created_at: new Date(r.created_at).toISOString(),
      updated_at: new Date(r.updated_at).toISOString(),
    });
  }
  return out;
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
export async function saveAiQuestions({ week_id, subject, topic, student, questions = [] }) {
  if (!week_id || !Array.isArray(questions) || !questions.length) return { saved: 0 };
  const t = Date.now();
  let saved = 0;
  const tx = db.transaction(async () => {
    for (const q of questions) {
      const stem = String(q.stem || '').trim();
      if (!stem) continue;
      if (await existsAiStemStmt.get({ week_id, kind: 'question', stem })) continue;  // dedupe
      await insertAiContentStmt.run({
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
  await tx();
  return { saved };
}

/** Lưu 1 cặp hỏi-đáp với "cô giáo AI". */
export async function saveAiQa({ week_id, subject, topic, student, question, answer }) {
  if (!week_id || !question || !answer) return { saved: 0 };
  const stem = String(question).trim().slice(0, 500);
  if (await existsAiStemStmt.get({ week_id, kind: 'qa', stem })) return { saved: 0 };  // dedupe câu hỏi y hệt
  await insertAiContentStmt.run({
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
export async function getAiQuestions(week_id, limit = 50) {
  return (await getAiQuestionsStmt.all({ week_id: String(week_id), limit }))
    .map(r => { try { const p = JSON.parse(r.payload); return { stem: r.stem, ...p }; } catch { return null; } })
    .filter(Boolean);
}
/** Lấy hỏi-đáp đã tích luỹ của 1 tuần. */
export async function getAiQa(week_id, limit = 50) {
  return (await getAiQaStmt.all({ week_id: String(week_id), limit }))
    .map(r => { try { const p = JSON.parse(r.payload); return { question: r.stem, answer: p.answer, created_at: r.created_at }; } catch { return null; } })
    .filter(Boolean);
}
/** Đếm số học liệu AI đã tích luỹ theo tuần → { question, qa }. */
export async function getAiContentCounts(week_id) {
  const rows = await countAiContentStmt.all({ week_id: String(week_id) });
  const out = { question: 0, qa: 0 };
  for (const r of rows) out[r.kind] = r.n;
  return out;
}

export async function getConfusion(version) {
  const rows = await db.prepare(`SELECT details FROM attempts WHERE version = ? AND details IS NOT NULL`).all(version);
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
  RETURNING id
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
export async function createUser({ username, display_name, password_hash, role, age,
                             grade = null, major = null, cohort = null, school_name = null }) {
  const info = await insertUserStmt.run({
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
export async function getUserByUsername(username) {
  return (await getUserByUsernameStmt.get(String(username || '').trim())) || null;
}
export async function getUserById(id) {
  return (await getUserByIdStmt.get(Number(id))) || null;
}
export async function touchLogin(id) {
  await touchLoginStmt.run({ id: Number(id), t: Date.now() });
}
export async function updateDisplayName(id, name) {
  await updateDisplayNameStmt.run({ id: Number(id), name: String(name).slice(0, 60) });
}
// Set gói cước. expires_at=null = vĩnh viễn (chỉ áp dụng cho 'free'); với plus/pro
// caller phải truyền timestamp ms. cycle='month'|'year'|null.
export async function setUserPlan(id, { plan, expires_at = null, cycle = null }) {
  await setUserPlanStmt.run({
    id: Number(id),
    plan: String(plan || 'free'),
    expires: expires_at ? Number(expires_at) : null,
    cycle: cycle ? String(cycle) : null,
  });
}
export async function createSession({ token, user_id, ttlMs }) {
  const now = Date.now();
  await insertSessionStmt.run({ token, user_id, created_at: now, expires_at: now + ttlMs });
  return { token, expires_at: now + ttlMs };
}
export async function getSession(token) {
  if (!token) return null;
  return (await getSessionStmt.get(String(token), { now: Date.now() })) || null;
}
export async function deleteSession(token) {
  await deleteSessionStmt.run(String(token || ''));
}
export async function purgeExpiredSessions() {
  await purgeExpiredSessionsStmt.run(Date.now());
}
// Quét rác phiên hết hạn mỗi giờ (nhẹ nhàng — bảng nhỏ).
setInterval(() => { purgeExpiredSessions().catch(() => {}); }, 60 * 60 * 1000).unref?.();

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

export async function findUserByOAuth(provider, subject) {
  return (await findOAuthStmt.get(String(provider), String(subject))) || null;
}
export async function linkOAuth({ user_id, provider, subject, email }) {
  await insertOAuthStmt.run({
    user_id, provider, subject,
    email: email ? String(email).slice(0, 120) : null,
    created_at: Date.now(),
  });
}
export async function updateUserProfile(id, { display_name, email, avatar_url } = {}) {
  await updateUserProfileStmt.run({
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
export async function updateUserEditable(id, { display_name, age, email,
                                          grade = null, major = null, cohort = null, school_name = null }) {
  await updateEditableStmt.run({
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
export async function isUsernameTaken(username) {
  return ((await countUsernameStmt.get(String(username)))?.n || 0) > 0;
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

export async function linkChildToParent({ parent_user_id, child_user_id }) {
  const info = await insertFamilyStmt.run({
    parent_user_id: Number(parent_user_id),
    child_user_id: Number(child_user_id),
    created_at: Date.now(),
  });
  return { linked: info.changes > 0 };
}
export async function unlinkChildFromParent({ parent_user_id, child_user_id }) {
  const info = await deleteFamilyStmt.run({ parent: Number(parent_user_id), child: Number(child_user_id) });
  return { unlinked: info.changes > 0 };
}
export async function listChildrenOfParent(parent_user_id) {
  return await listChildrenStmt.all(Number(parent_user_id));
}
/** Trả về parent có plan cao nhất (để con kế thừa). null nếu không có/không link. */
export async function getBestParentPlanForChild(child_user_id) {
  return (await getParentPlanStmt.get(Number(child_user_id))) || null;
}

// ── User wallets (per-domain) ──
// Ví XP/coin/streak/daily-quest per-user PER-TRƯỜNG. Mỗi tài khoản tại 1 thời điểm
// chỉ tham gia 1 trường (users.enrolled_domain). Tiến trình theo (user_id, domain):
// đổi trường = tạo bucket mới, level/coin/xp/streak ở bucket cũ vẫn lưu (ẩn) để
// nếu quay lại trường cũ thì khôi phục liền — anh Lâm chốt giữ ẩn, không xoá.
//
// domain '' (rỗng) = legacy bucket: ví của user CHƯA chọn trường (tài khoản cũ
// trước khi triển khai per-school) hoặc admin (admin không bound vào trường).

const getUserWalletStmt = db.prepare(`SELECT * FROM user_wallets WHERE user_id = ? AND domain = ?`);
// Khi caller không truyền domain → fallback: enrolled_domain của user (đọc users
// table). User chưa enroll → '' (legacy bucket). Admin (enrolled_domain NULL) cũng
// rơi vào '' — phù hợp vì admin không bound vào trường nào.
const _getEnrolledDomainStmt = db.prepare(`SELECT enrolled_domain FROM users WHERE id = ?`);
async function _resolveDomain(user_id, domain) {
  if (typeof domain === 'string') return domain;
  const row = await _getEnrolledDomainStmt.get(Number(user_id));
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
export async function getUserWallet(user_id, domain) {
  const d = await _resolveDomain(user_id, domain);
  const row = await getUserWalletStmt.get(Number(user_id), d);
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
export async function upsertUserWallet(user_id, w = {}, { monotonic = true, domain } = {}) {
  const d = await _resolveDomain(user_id, domain);
  const cur = (await getUserWallet(user_id, d)) || {};
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

  await upsertUserWalletStmt.run({
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
  return await getUserWallet(user_id, d);
}

// ─── Enrollment helpers (mỗi tài khoản 1 trường tại 1 thời điểm) ───
// Đọc enrolled_domain của user. Trả null nếu chưa chọn (FE bắt mở modal).
export async function getEnrolledDomain(user_id) {
  const row = await _getEnrolledDomainStmt.get(Number(user_id));
  return row?.enrolled_domain || null;
}
const _setEnrolledDomainStmt = db.prepare(`UPDATE users SET enrolled_domain = ? WHERE id = ?`);
// Set/đổi trường. domain=null cho phép admin reset. KHÔNG đụng tới user_wallets /
// user_skills bucket cũ — chúng vẫn lưu (ẩn vì query luôn lọc theo domain hiện
// tại). User quay lại trường cũ → bucket cũ tự hiện lại đúng tiến trình.
export async function setEnrolledDomain(user_id, domain) {
  const d = (domain == null || domain === '') ? null : String(domain).slice(0, 40);
  await _setEnrolledDomainStmt.run(d, Number(user_id));
  return d;
}

export async function getScenarioRunsForUser(user_id) {
  const rows = await db.prepare(
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

export async function recordScenarioRunDb(user_id, family_id, stars = 0, score = 0) {
  const fid = String(family_id || '').slice(0, 64);
  if (!fid) return null;
  const s = Math.max(0, Math.min(3, Math.floor(Number(stars) || 0)));
  const sc = Math.max(0, Math.min(1000, Math.floor(Number(score) || 0)));
  await db.prepare(`
    INSERT INTO scenario_runs (user_id, family_id, runs, best_stars, best_score, last_ts)
    VALUES (?, ?, 1, ?, ?, ?)
    ON CONFLICT(user_id, family_id) DO UPDATE SET
      runs       = scenario_runs.runs + 1,
      best_stars = GREATEST(scenario_runs.best_stars, excluded.best_stars),
      best_score = GREATEST(scenario_runs.best_score, excluded.best_score),
      last_ts    = excluded.last_ts
  `).run(Number(user_id), fid, s, sc, Date.now());
  const row = await db.prepare(
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

const insertQAStmt = db.prepare(`
  INSERT INTO question_attempts
    (user_id, scoreup_question_id, question_external_id,
     subject_id, chapter_id, answers_json, correct, score, duration_ms, created_at)
  VALUES (@user_id, @scoreup_question_id, @question_external_id,
          @subject_id, @chapter_id, @answers_json, @correct, @score, @duration_ms, @t)
  RETURNING id
`);

/** Lưu 1 attempt câu hỏi (gọi từ route /api/quiz/attempt). */
export async function recordQuestionAttempt({
  user_id, scoreup_question_id = null, question_external_id = null,
  subject_id = null, chapter_id = null, answers = null,
  correct = false, score = 0, duration_ms = null,
}) {
  const info = await insertQAStmt.run({
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
export async function getRecentQuestionAttempts(user_id, limit = 50) {
  return await db.prepare(`
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
export async function markScoreUpEventSeen(eventId, eventType, occurredAt) {
  if (!eventId) return false;
  const info = await insertSeenStmt.run(
    String(eventId), eventType ? String(eventType) : null,
    Number(occurredAt) || null, Date.now(),
  );
  return info.changes === 0; // 0 = đã tồn tại (duplicate)
}
/** Xoá event > 7 ngày — gọi từ cron nhẹ (không bắt buộc, table không quá nặng). */
export async function pruneScoreUpEventsSeen(olderThanMs = 7 * 24 * 3600 * 1000) {
  const cutoff = Date.now() - olderThanMs;
  return (await db.prepare(`DELETE FROM scoreup_webhook_events_seen WHERE processed_at < ?`).run(cutoff)).changes;
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
export async function recordCodelabSubmission({
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
  const info = await insertCodelabSubStmt.run({
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
export async function hasAcceptedCodelabProblem(userId, problemSlug, excludeSubmissionId = null) {
  if (!userId || !problemSlug) return false;
  const row = await db.prepare(`
    SELECT 1 FROM codelab_submissions
    WHERE user_id = ? AND problem_slug = ? AND status = 'accepted'
      ${excludeSubmissionId ? 'AND submission_id != ?' : ''}
    LIMIT 1
  `).get(...(excludeSubmissionId ? [userId, problemSlug, excludeSubmissionId] : [userId, problemSlug]));
  return Boolean(row);
}

/** Bao nhiêu bài Codelab đã accepted của user (dùng cho badge / dashboard). */
export async function countCodelabAcceptedProblems(userId) {
  if (!userId) return 0;
  const row = await db.prepare(`
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
export async function getSrsStateByPrefix(user_id, prefix) {
  const safe = String(prefix).replace(/[\\%_]/g, (c) => '\\' + c) + '%';
  return await getSrsByPrefixStmt.all(Number(user_id), safe);
}

/** Ghi 1 lần review. Tự upsert + cập nhật SM-2 từ state cũ. */
export async function recordSrsReview({ user_id, card_key, correct }) {
  const prev = (await getSrsCardStmt.get(Number(user_id), String(card_key))) || null;
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
  await upsertSrsStmt.run(row);
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
export async function getUserState(user_id) {
  const rows = await _getUserStateAllStmt.all(Number(user_id));
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
export async function putUserState(user_id, entries) {
  if (!entries || typeof entries !== 'object') return 0;
  const now = Date.now();
  let written = 0;
  const tx = db.transaction(async (items) => {
    for (const [k, v] of items) {
      const key = String(k || '').slice(0, 128);
      if (!key) continue;
      if (v == null || v === '') {
        await _deleteUserStateStmt.run(Number(user_id), key);
      } else {
        const value = String(v);
        if (value.length > MAX_VALUE_BYTES) {
          throw new UserStateValueTooLargeError(key, value.length);
        }
        await _upsertUserStateStmt.run(Number(user_id), key, value, now);
      }
      written += 1;
    }
  });
  await tx(Object.entries(entries));
  return written;
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL APPS — Developer cài app theo chuẩn AI Portal (manifest.json + zip)
// vào sandbox cá nhân (per-user alias). Admin có thể promote thành public.
// ─────────────────────────────────────────────────────────────────────────────

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
const _getPortalAppPublicByAliasStmt = db.prepare(
  `SELECT * FROM portal_apps WHERE alias = ? AND is_public = 1 ORDER BY updated_at DESC LIMIT 1`
);
const _deletePortalAppStmt = db.prepare(
  `DELETE FROM portal_apps WHERE id = ?`
);
const _setPortalAppPublicStmt = db.prepare(
  `UPDATE portal_apps SET is_public = ?, updated_at = ? WHERE id = ?`
);

export async function upsertPortalApp({
  ownerId, alias, name, description, icon, version, manifestJson, sizeBytes,
}) {
  const now = Date.now();
  await _insertPortalAppStmt.run(
    Number(ownerId), String(alias), String(name),
    description ? String(description) : null,
    icon ? String(icon) : null,
    version ? String(version) : null,
    typeof manifestJson === 'string' ? manifestJson : JSON.stringify(manifestJson),
    Number(sizeBytes) | 0, now, now
  );
  // Trả về row vừa upsert (id ổn định kể cả lúc UPDATE)
  return await _getPortalAppByOwnerAliasStmt.get(Number(ownerId), String(alias));
}
export async function listPortalAppsByOwner(ownerId) {
  return await _listPortalAppsByOwnerStmt.all(Number(ownerId));
}
export async function listPortalAppsPublic() {
  return await _listPortalAppsPublicStmt.all();
}
export async function getPortalAppById(id) {
  return (await _getPortalAppByIdStmt.get(Number(id))) || null;
}
export async function getPortalAppByOwnerAlias(ownerId, alias) {
  return (await _getPortalAppByOwnerAliasStmt.get(Number(ownerId), String(alias))) || null;
}
// Resolve alias cho proxy /api/apps/<alias>/*: ưu tiên bản user tự cài, sau đó tới
// bản public (admin đã publish). Trả row có manifest_json để đọc apiProxyTarget.
export async function findInstalledPortalAppByAlias(userId, alias) {
  const own = userId != null
    ? await _getPortalAppByOwnerAliasStmt.get(Number(userId), String(alias))
    : null;
  if (own) return own;
  return (await _getPortalAppPublicByAliasStmt.get(String(alias))) || null;
}
export async function deletePortalApp(id) {
  return (await _deletePortalAppStmt.run(Number(id))).changes;
}
export async function setPortalAppPublic(id, isPublic) {
  return (await _setPortalAppPublicStmt.run(isPublic ? 1 : 0, Date.now(), Number(id))).changes;
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL AGENTS — "Agent" kiểu AI Portal (assistant): base_url expose GET /metadata
// + POST /ask (SSE). Đăng ký per-owner; admin publish → public. Tizia chat-proxy tới.
// ─────────────────────────────────────────────────────────────────────────────
const _insertPortalAgentStmt = db.prepare(`
  INSERT INTO portal_agents (owner_id, alias, name, icon, base_url, description,
                             config_json, is_active, installed_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
  ON CONFLICT(owner_id, alias) DO UPDATE SET
    name        = excluded.name,
    icon        = excluded.icon,
    base_url    = excluded.base_url,
    description = excluded.description,
    config_json = excluded.config_json,
    updated_at  = excluded.updated_at
`);
const _listPortalAgentsByOwnerStmt = db.prepare(
  `SELECT id, owner_id, alias, name, icon, base_url, description, config_json,
          is_public, is_active, installed_at, updated_at
   FROM portal_agents WHERE owner_id = ? ORDER BY updated_at DESC`
);
const _listPortalAgentsPublicStmt = db.prepare(
  `SELECT pa.id, pa.owner_id, pa.alias, pa.name, pa.icon, pa.base_url, pa.description,
          pa.config_json, pa.is_public, pa.is_active, pa.installed_at, pa.updated_at,
          u.username AS owner_username, u.display_name AS owner_display_name
   FROM portal_agents pa
   LEFT JOIN users u ON u.id = pa.owner_id
   WHERE pa.is_public = 1 ORDER BY pa.updated_at DESC`
);
const _getPortalAgentByIdStmt = db.prepare(`SELECT * FROM portal_agents WHERE id = ?`);
const _getPortalAgentByOwnerAliasStmt = db.prepare(
  `SELECT * FROM portal_agents WHERE owner_id = ? AND alias = ?`
);
const _getPortalAgentPublicByAliasStmt = db.prepare(
  `SELECT * FROM portal_agents WHERE alias = ? AND is_public = 1 ORDER BY updated_at DESC LIMIT 1`
);
const _deletePortalAgentStmt = db.prepare(`DELETE FROM portal_agents WHERE id = ?`);
const _setPortalAgentPublicStmt = db.prepare(
  `UPDATE portal_agents SET is_public = ?, updated_at = ? WHERE id = ?`
);

export async function upsertPortalAgent({ ownerId, alias, name, icon, baseUrl, description, configJson }) {
  const now = Date.now();
  await _insertPortalAgentStmt.run(
    Number(ownerId), String(alias), String(name),
    icon ? String(icon) : null, String(baseUrl),
    description ? String(description) : null,
    configJson ? (typeof configJson === 'string' ? configJson : JSON.stringify(configJson)) : null,
    now, now
  );
  return await _getPortalAgentByOwnerAliasStmt.get(Number(ownerId), String(alias));
}
export async function listPortalAgentsByOwner(ownerId) {
  return await _listPortalAgentsByOwnerStmt.all(Number(ownerId));
}
export async function listPortalAgentsPublic() {
  return await _listPortalAgentsPublicStmt.all();
}
export async function getPortalAgentById(id) {
  return (await _getPortalAgentByIdStmt.get(Number(id))) || null;
}
// Resolve alias cho chat-proxy /api/agents/<alias>/ask: ưu tiên bản user tự cài, rồi public.
export async function findInstalledAgentByAlias(userId, alias) {
  const own = userId != null
    ? await _getPortalAgentByOwnerAliasStmt.get(Number(userId), String(alias))
    : null;
  if (own) return own;
  return (await _getPortalAgentPublicByAliasStmt.get(String(alias))) || null;
}
export async function deletePortalAgent(id) {
  return (await _deletePortalAgentStmt.run(Number(id))).changes;
}
export async function setPortalAgentPublic(id, isPublic) {
  return (await _setPortalAgentPublicStmt.run(isPublic ? 1 : 0, Date.now(), Number(id))).changes;
}

// ─────────────────────────────────────────────────────────────────────────────
// USER DOMAIN GRANTS — Admin mở quyền vào 1 trường (kể cả trường locked) cho
// 1 user cụ thể. Override status check + plan check. Hết hạn (expires_at < now)
// → grant tự degrade (FE/BE đều check). expires_at NULL = không hết hạn.
// ─────────────────────────────────────────────────────────────────────────────

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

export async function grantUserDomain({ userId, domainId, grantedBy, expiresAt = null, note = null }) {
  return (await _grantDomainStmt.run(
    Number(userId), String(domainId), Date.now(),
    grantedBy ? Number(grantedBy) : null,
    expiresAt ? Number(expiresAt) : null,
    note ? String(note).slice(0, 200) : null
  )).changes;
}
export async function revokeUserDomain(userId, domainId) {
  return (await _revokeDomainStmt.run(Number(userId), String(domainId))).changes;
}
export async function hasUserDomainGrant(userId, domainId) {
  return !!(await _hasGrantStmt.get(Number(userId), String(domainId), Date.now()));
}
export async function listUserDomainGrants(userId) {
  return (await _listGrantsByUserStmt.all(Number(userId), Date.now())).map(r => r.domain_id);
}
export async function listUserDomainGrantsFull(userId) {
  return await _listGrantsByUserStmt.all(Number(userId), Date.now());
}
export async function listAllDomainGrants() {
  return await _listAllGrantsStmt.all();
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

export async function setSchoolAdmin({ userId, domainId, grantedBy, note = null }) {
  return (await _setSchoolAdminStmt.run(
    Number(userId), String(domainId), Date.now(),
    grantedBy ? Number(grantedBy) : null,
    note ? String(note).slice(0, 200) : null
  )).changes;
}
export async function revokeSchoolAdmin(userId, domainId) {
  return (await _revokeSchoolAdminStmt.run(Number(userId), String(domainId))).changes;
}
export async function listManagedDomains(userId) {
  return (await _listSchoolAdminDomainsByUserStmt.all(Number(userId))).map(r => r.domain_id);
}
export async function isSchoolAdmin(userId, domainId) {
  return !!(await _isSchoolAdminStmt.get(Number(userId), String(domainId)));
}
export async function listAllSchoolAdmins() {
  return await _listAllSchoolAdminsStmt.all();
}
export async function listSchoolAdminsByDomain(domainId) {
  return await _listSchoolAdminsByDomainStmt.all(String(domainId));
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
  RETURNING id
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

export async function upsertBuiltinApp(systemOwnerId, app) {
  const { alias, name, description, icon, version, target_url, category, domain } = app;
  const manifest = JSON.stringify({ ...app, type: 'embedded', hasFrontendOnly: false, isBuiltin: true });
  const now = Date.now();
  const existing = await _findBuiltinByAliasStmt.get(String(alias));
  if (existing) {
    await _updateBuiltinStmt.run(
      String(name), description || null, icon || null, version || '1.0.0',
      manifest, String(target_url), category || null, domain || null, now, existing.id
    );
    return { id: existing.id, action: 'updated' };
  }
  const info = await _insertBuiltinStmt.run(
    Number(systemOwnerId), String(alias), String(name),
    description || null, icon || null, version || '1.0.0', manifest,
    now, now, String(target_url), category || null, domain || null
  );
  return { id: info.lastInsertRowid, action: 'inserted' };
}
export async function listBuiltinApps() { return await _listBuiltinStmt.all(); }

// Lấy user id cho "system owner" của các builtin app. Ưu tiên admin đầu tiên có sẵn.
// Nếu chưa có admin nào → trả null (seeder sẽ defer đến khi admin login đầu tiên).
const _getSystemOwnerStmt = db.prepare(
  `SELECT id FROM users WHERE role = 'admin' ORDER BY id ASC LIMIT 1`
);
export async function getSystemOwnerId() {
  return (await _getSystemOwnerStmt.get())?.id || null;
}
