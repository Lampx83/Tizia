// =====================================================================
// PHARMACOMM — Mô hình truy cập Sinh viên / Giảng viên.
// Yêu cầu #143 (ThS Nguyệt Phương, 22/08) — Phần 1.
//
// TÁCH RIÊNG khỏi pharmacy-practice.js (lo lưu phiên + chấm điểm) và khỏi
// server/contexts/identity/auth.js (đăng nhập Tizia toàn site). Giảng viên
// Pharmacomm có tài khoản RIÊNG, cookie riêng, không liên quan tài khoản Tizia
// — để cô dùng phần mềm mà không cần tài khoản trên hệ thống lớn.
//
// NGUYÊN TẮC BẢO MẬT (đặc tả mục 2 & 3):
//  - Không có route đăng ký giảng viên. Tài khoản tạo sẵn lúc triển khai.
//  - Không có route nào cho phép đổi role hay xoá tài khoản giảng viên.
//  - MỌI route quản lý đều qua requireTeacher → 403 nếu không phải TEACHER.
//    Chặn ở MÁY CHỦ, không chỉ ẩn nút trên giao diện.
//  - Mật khẩu băm scrypt (Node crypto — memory-hard, cùng hạng argon2/bcrypt;
//    dự án không có bcrypt/argon2 và auth.js sẵn có cũng dùng scrypt).
//  - Mật khẩu ban đầu KHÔNG ghi trong mã nguồn: lấy từ biến môi trường
//    PHARMACOMM_TEACHER_PASSWORD; thiếu biến thì sinh ngẫu nhiên và in ra log
//    server một lần duy nhất để quản trị viên chép lại.
// =====================================================================
import express from 'express';
import { scryptSync, randomBytes, timingSafeEqual, randomUUID } from 'node:crypto';
import { db } from './db.js';

const now = () => Date.now();
const clean = (v, max = 120) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const SCRYPT_KEYLEN = 64;
const COOKIE = 'pharmacomm_tsid';
const SESSION_MS = 12 * 60 * 60 * 1000;   // 12 giờ

// ---- băm mật khẩu ---------------------------------------------------
function hashPassword(pw) {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString('hex')}$${scryptSync(String(pw), salt, SCRYPT_KEYLEN).toString('hex')}`;
}
function verifyPassword(pw, stored) {
  try {
    const [algo, saltHex, hashHex] = String(stored || '').split('$');
    if (algo !== 'scrypt' || !saltHex || !hashHex) return false;
    const expected = Buffer.from(hashHex, 'hex');
    const actual = scryptSync(String(pw), Buffer.from(saltHex, 'hex'), expected.length);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch { return false; }
}

// ---- cookie ---------------------------------------------------------
function readCookie(req, name) {
  const raw = req.headers.cookie;
  if (!raw) return null;
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}
function setCookie(res, token, expiresAt) {
  res.setHeader('Set-Cookie',
    `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor((expiresAt - now()) / 1000)}`);
}
function clearCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

// ---- câu lệnh -------------------------------------------------------
const getTeacher = db.prepare('SELECT * FROM pharmacy_teacher WHERE username = ?');
const insTeacher = db.prepare(`
  INSERT INTO pharmacy_teacher (username, password_hash, display_name, role, must_change_pw, created_at, updated_at)
  VALUES (@username, @password_hash, @display_name, 'TEACHER', @must_change_pw, @t, @t)
  ON CONFLICT (username) DO NOTHING`);
const setPassword = db.prepare(
  'UPDATE pharmacy_teacher SET password_hash = @h, must_change_pw = FALSE, updated_at = @t WHERE username = @u');
const insSess = db.prepare(
  'INSERT INTO pharmacy_teacher_session (token, username, created_at, expires_at) VALUES (@token, @username, @t, @exp)');
const getSess = db.prepare(
  'SELECT s.*, t.display_name, t.role, t.must_change_pw FROM pharmacy_teacher_session s JOIN pharmacy_teacher t ON t.username = s.username WHERE s.token = ? AND s.expires_at > ?');
const delSess = db.prepare('DELETE FROM pharmacy_teacher_session WHERE token = ?');
const insLog = db.prepare(
  'INSERT INTO pharmacy_teacher_log (username, action, detail, ip, created_at) VALUES (@username, @action, @detail, @ip, @t)');

async function log(req, username, action, detail) {
  try {
    await insLog.run({
      username: username || null, action, detail: detail ? String(detail).slice(0, 500) : null,
      ip: (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString().split(',')[0].trim().slice(0, 60) || null,
      t: now(),
    });
  } catch { /* nhật ký hỏng không được làm chết yêu cầu chính */ }
}

// ---- tạo sẵn tài khoản giảng viên khi khởi động ---------------------
// KHÔNG ghi mật khẩu thật trong mã nguồn. Ưu tiên biến môi trường; thiếu thì
// sinh ngẫu nhiên và in một lần ra log để quản trị viên chép lại rồi đổi.
export async function ensureTeacherAccount() {
  const username = process.env.PHARMACOMM_TEACHER_USER || 'giangvien';
  try {
    const existing = await getTeacher.get(username);
    if (existing) return;
    const envPw = process.env.PHARMACOMM_TEACHER_PASSWORD;
    const pw = envPw || randomBytes(9).toString('base64url');
    await insTeacher.run({
      username, password_hash: hashPassword(pw),
      display_name: process.env.PHARMACOMM_TEACHER_NAME || 'Giảng viên',
      must_change_pw: true, t: now(),   // luôn bắt đổi mật khẩu ở lần đăng nhập đầu
    });
    console.log(`[pharmacomm-teacher] đã tạo tài khoản giảng viên "${username}"`);
    if (!envPw) console.log(`[pharmacomm-teacher] MẬT KHẨU BAN ĐẦU (chỉ hiện 1 lần, hãy đổi ngay): ${pw}`);
  } catch (err) {
    console.error('[pharmacomm-teacher] không tạo được tài khoản giảng viên:', err.message);
  }
}

// ---- gác quyền ------------------------------------------------------
// Chặn ở MÁY CHỦ. Sinh viên gõ thẳng đường dẫn quản lý → 403.
async function currentTeacher(req) {
  const token = readCookie(req, COOKIE);
  if (!token) return null;
  try {
    const s = await getSess.get(token, now());
    return s && s.role === 'TEACHER' ? s : null;
  } catch { return null; }
}
async function requireTeacher(req, res, next) {
  const t = await currentTeacher(req);
  if (!t) return res.status(403).json({ error: 'Không có quyền truy cập.' });
  req.teacher = t;
  next();
}
export { requireTeacher, currentTeacher };

// =====================================================================
// ROUTES
// =====================================================================
export function attachPharmacyTeacher(r) {
  const J = express.json({ limit: '64kb' });

  // ---- đăng nhập / đăng xuất / danh tính ----------------------------
  r.post('/api/pharmacy/teacher/login', J, async (req, res) => {
    const username = clean(req.body?.username, 60).toLowerCase();
    const password = String(req.body?.password || '');
    if (!username || !password) return res.status(400).json({ error: 'Nhập tên đăng nhập và mật khẩu.' });
    try {
      const t = await getTeacher.get(username);
      // Cùng một thông báo cho cả sai tên lẫn sai mật khẩu — không để lộ tài khoản nào có thật.
      if (!t || !verifyPassword(password, t.password_hash)) {
        await log(req, username, 'login_failed', 'sai tên đăng nhập hoặc mật khẩu');
        return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
      }
      const token = randomUUID() + randomBytes(16).toString('hex');
      const exp = now() + SESSION_MS;
      await insSess.run({ token, username, t: now(), exp });
      setCookie(res, token, exp);
      await log(req, username, 'login', 'đăng nhập thành công');
      res.json({ ok: true, username, displayName: t.display_name, mustChangePassword: !!t.must_change_pw });
    } catch (err) {
      console.error('[pharmacomm-teacher] login lỗi:', err.message);
      res.status(500).json({ error: 'Không đăng nhập được.' });
    }
  });

  r.post('/api/pharmacy/teacher/logout', async (req, res) => {
    const token = readCookie(req, COOKIE);
    if (token) { try { await delSess.run(token); } catch {} }
    clearCookie(res);
    res.json({ ok: true });
  });

  r.get('/api/pharmacy/teacher/me', async (req, res) => {
    const t = await currentTeacher(req);
    if (!t) return res.status(403).json({ error: 'Không có quyền truy cập.' });
    res.json({ username: t.username, displayName: t.display_name, role: t.role, mustChangePassword: !!t.must_change_pw });
  });

  // Đổi mật khẩu — chỉ chính giảng viên đang đăng nhập, phải nhập đúng mật khẩu cũ.
  r.post('/api/pharmacy/teacher/password', J, requireTeacher, async (req, res) => {
    const oldPw = String(req.body?.oldPassword || '');
    const newPw = String(req.body?.newPassword || '');
    if (newPw.length < 8) return res.status(400).json({ error: 'Mật khẩu mới cần ít nhất 8 ký tự.' });
    try {
      const t = await getTeacher.get(req.teacher.username);
      if (!t || !verifyPassword(oldPw, t.password_hash)) {
        await log(req, req.teacher.username, 'password_change_failed', 'mật khẩu cũ không đúng');
        return res.status(401).json({ error: 'Mật khẩu hiện tại không đúng.' });
      }
      await setPassword.run({ h: hashPassword(newPw), t: now(), u: t.username });
      await log(req, t.username, 'password_changed', 'đổi mật khẩu');
      res.json({ ok: true });
    } catch (err) {
      console.error('[pharmacomm-teacher] đổi mật khẩu lỗi:', err.message);
      res.status(500).json({ error: 'Không đổi được mật khẩu.' });
    }
  });

  // ---- khu quản lý: TẤT CẢ đều qua requireTeacher (403 nếu không phải GV) ----

  // Danh sách lớp + sĩ số. Chỉ đếm lượt STUDENT — lượt chạy thử của giảng viên
  // và lượt khách KHÔNG được lẫn vào thống kê sinh viên (đặc tả mục 2).
  r.get('/api/pharmacy/teacher/classes', requireTeacher, async (req, res) => {
    try {
      const rows = await db.prepare(`
        SELECT class_name,
               COUNT(DISTINCT student_code) AS so_sinh_vien,
               COUNT(*)                     AS so_luot,
               MAX(started_at)              AS gan_nhat
        FROM pharmacy_practice_session
        WHERE session_kind = 'STUDENT'
        GROUP BY class_name ORDER BY class_name`).all();
      await log(req, req.teacher.username, 'view_classes', `${rows.length} lớp`);
      res.json({ classes: rows });
    } catch (err) {
      console.error('[pharmacomm-teacher] classes lỗi:', err.message);
      res.status(500).json({ error: 'Không đọc được danh sách lớp.' });
    }
  });

  // Danh sách sinh viên — lọc theo lớp, tìm theo họ tên hoặc mã SV.
  r.get('/api/pharmacy/teacher/students', requireTeacher, async (req, res) => {
    const cls = clean(req.query.class, 60);
    const q = clean(req.query.q, 60).toLowerCase();
    try {
      const rows = await db.prepare(`
        SELECT student_code, MAX(student_name) AS student_name, MAX(class_name) AS class_name,
               COUNT(*) AS so_luot, MAX(started_at) AS gan_nhat,
               ROUND(AVG(total_score)) AS diem_tb
        FROM pharmacy_practice_session
        WHERE session_kind = 'STUDENT'
          AND (? = '' OR class_name = ?)
          AND (? = '' OR LOWER(student_code) LIKE ? OR LOWER(student_name) LIKE ?)
        GROUP BY student_code ORDER BY MAX(started_at) DESC LIMIT 500`)
        .all(cls, cls, q, `%${q}%`, `%${q}%`);
      await log(req, req.teacher.username, 'view_students', `lớp=${cls || 'tất cả'} tìm=${q || '-'} → ${rows.length}`);
      res.json({ students: rows });
    } catch (err) {
      console.error('[pharmacomm-teacher] students lỗi:', err.message);
      res.status(500).json({ error: 'Không đọc được danh sách sinh viên.' });
    }
  });

  // Lịch sử lượt thực hành — lọc theo lớp, sinh viên, tình huống, khoảng thời gian.
  r.get('/api/pharmacy/teacher/sessions', requireTeacher, async (req, res) => {
    const cls = clean(req.query.class, 60);
    const code = clean(req.query.student, 40).toUpperCase();
    const scen = clean(req.query.scenario, 40);
    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 0;
    // Mặc định chỉ xem lượt SINH VIÊN; cô muốn xem lượt chạy thử của mình thì kind=TEACHER_TEST.
    const kind = ['STUDENT', 'TEACHER_TEST', 'GUEST'].includes(req.query.kind) ? req.query.kind : 'STUDENT';
    try {
      const rows = await db.prepare(`
        SELECT session_id, student_code, student_name, class_name, scenario_code, scenario_name,
               started_at, completed_at, duration_ms, status, total_score, session_kind
        FROM pharmacy_practice_session
        WHERE session_kind = ?
          AND (? = '' OR class_name = ?)
          AND (? = '' OR student_code = ?)
          AND (? = '' OR scenario_code = ?)
          AND (? = 0  OR started_at >= ?)
          AND (? = 0  OR started_at <= ?)
        ORDER BY started_at DESC LIMIT 1000`)
        .all(kind, cls, cls, code, code, scen, scen, from, from, to, to);
      await log(req, req.teacher.username, 'view_sessions', `${kind} lớp=${cls || '-'} sv=${code || '-'} → ${rows.length}`);
      res.json({ sessions: rows });
    } catch (err) {
      console.error('[pharmacomm-teacher] sessions lỗi:', err.message);
      res.status(500).json({ error: 'Không đọc được lịch sử thực hành.' });
    }
  });

  // Xuất CSV theo đúng bộ lọc đang xem.
  r.get('/api/pharmacy/teacher/export.csv', requireTeacher, async (req, res) => {
    const cls = clean(req.query.class, 60);
    const kind = ['STUDENT', 'TEACHER_TEST', 'GUEST'].includes(req.query.kind) ? req.query.kind : 'STUDENT';
    try {
      const rows = await db.prepare(`
        SELECT s.student_code, s.student_name, s.class_name, s.scenario_code, s.scenario_name,
               s.started_at, s.completed_at, s.duration_ms, s.status, s.total_score,
               (SELECT COUNT(*) FROM pharmacy_practice_message m WHERE m.session_id = s.session_id) AS so_loi_thoai,
               (SELECT COUNT(*) FROM pharmacy_practice_action a WHERE a.session_id = s.session_id) AS so_thao_tac,
               s.session_id
        FROM pharmacy_practice_session s
        WHERE s.session_kind = ? AND (? = '' OR s.class_name = ?)
        ORDER BY s.started_at DESC LIMIT 5000`).all(kind, cls, cls);
      const vn = (ms) => ms ? new Date(Number(ms) + 7 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19) : '';
      const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const head = ['Mã SV', 'Họ tên', 'Lớp', 'Mã tình huống', 'Tên tình huống', 'Bắt đầu (GMT+7)',
        'Kết thúc (GMT+7)', 'Thời gian (giây)', 'Trạng thái', 'Điểm chung', 'Số lời thoại', 'Số thao tác', 'Mã phiên'];
      const body = rows.map((x) => [x.student_code, x.student_name, x.class_name, x.scenario_code, x.scenario_name,
        vn(x.started_at), vn(x.completed_at), x.duration_ms ? Math.round(x.duration_ms / 1000) : '',
        x.status, x.total_score, x.so_loi_thoai, x.so_thao_tac, x.session_id].map(esc).join(','));
      await log(req, req.teacher.username, 'export_csv', `${kind} lớp=${cls || 'tất cả'} → ${rows.length} dòng`);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="pharmacomm-${kind.toLowerCase()}-${Date.now()}.csv"`);
      res.send('﻿' + [head.map(esc).join(','), ...body].join('\r\n'));   // BOM để Excel đọc đúng tiếng Việt
    } catch (err) {
      console.error('[pharmacomm-teacher] export lỗi:', err.message);
      res.status(500).json({ error: 'Không xuất được dữ liệu.' });
    }
  });

  // Nhật ký truy cập (đặc tả mục 3).
  r.get('/api/pharmacy/teacher/logs', requireTeacher, async (req, res) => {
    try {
      const rows = await db.prepare(
        'SELECT username, action, detail, ip, created_at FROM pharmacy_teacher_log ORDER BY created_at DESC LIMIT 200').all();
      res.json({ logs: rows });
    } catch (err) {
      res.status(500).json({ error: 'Không đọc được nhật ký.' });
    }
  });
}
