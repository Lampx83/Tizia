// =====================================================================
// Nhà thuốc thực hành (public/tu-thuoc-mo-phong.html) — ĐĂNG NHẬP THEO DANH SÁCH LỚP + NHẬT KÝ THAO TÁC.
// req #245/#247/#248 (ThS Phạm Thị Hương Lý, Khanh).
//
//  - Giảng viên tải lên danh sách (mã SV, họ tên, lớp). Khi ĐÃ có danh sách, chỉ SV có mã + lớp khớp
//    mới vào được trang; chưa tải danh sách thì trang để mở (ai cũng vào được) để không khoá cả lớp.
//  - Tài khoản thử "test" (mật khẩu cấu hình bằng TT_TEST_PASSWORDS, mặc định 123456 và 12345@ — hai
//    yêu cầu #245/#248 nêu hai mật khẩu khác nhau): vào thẳng nhưng VẪN bị ghi nhật ký (mã TEST).
//  - Giảng viên quản lý (role admin, hoặc tên đăng nhập trong TT_MANAGER_USERS, mặc định huongly) vào
//    thẳng bằng tài khoản Tizia của họ và dùng các route /api/tt/manage/*.
//  - Mọi thao tác ghi vào tt_activity, gắn với phiên (tt_session) do MÁY CHỦ cấp lúc đăng nhập;
//    định danh không nhận từ body của route ghi nhật ký.
//  - req #236: nhiệm vụ 1, 2 luôn mở; nhiệm vụ 3, 4, 5 chỉ mở khi giảng viên mở khoá cho lớp (tt_unlock).
//    Mỗi lượt làm xong 1 nhiệm vụ trang gửi 'mission_result' (số lỗi, số câu hỏi trợ lý AI, mức, có gợi ý
//    hay không) → bảng phân tích xếp bậc Làm được / Làm đúng / Làm thành thạo theo từng nhiệm vụ.
// Xoá module = xoá file này + 1 dòng attachTtAccess trong index.js + 4 bảng tt_* trong schema.sql.
// =====================================================================
import express from 'express';
import { randomUUID } from 'node:crypto';
import { db } from './db.js';
import { gradeMission, TIER_RULE } from './tt-grade.js';

const now = () => Date.now();
const safeJson = (s) => { try { return JSON.parse(s); } catch { return null; } };
const clean = (v, max = 120) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, ' ').trim();
const TEST_PASSWORDS = (process.env.TT_TEST_PASSWORDS || '123456,12345@').split(',').map((s) => s.trim()).filter(Boolean);
const MANAGERS = (process.env.TT_MANAGER_USERS || 'huongly').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const TEST_CODE = 'TEST', TEACHER_CODE = 'GV_QL';
const SESSION_MS = 12 * 60 * 60 * 1000;

const isManager = (req) => !!req.user && (req.user.role === 'admin' || MANAGERS.includes(String(req.user.username || '').toLowerCase()));
const requireManager = (req, res, next) => isManager(req) ? next() : res.status(403).json({ error: 'Cần quyền giảng viên quản lý.' });
const userRef = (req) => req.user?.player_name || req.user?.username || null;

const getSess = db.prepare(`SELECT * FROM tt_session WHERE id = ?`);
const insSess = db.prepare(`INSERT INTO tt_session (id, student_code, full_name, class_name, kind, user_ref, created_at, last_seen_at)
  VALUES (@id, @code, @name, @cls, @kind, @ref, @t, @t)`);
const touchSess = db.prepare(`UPDATE tt_session SET last_seen_at = ? WHERE id = ?`);
const insAct = db.prepare(`INSERT INTO tt_activity (session_id, student_code, kind, detail, created_at) VALUES (?, ?, ?, ?, ?)`);
const rosterCount = db.prepare(`SELECT COUNT(*) n FROM tt_roster`);
const rosterByCode = db.prepare(`SELECT * FROM tt_roster WHERE student_code = ?`);
const GATED = [3, 4, 5];   // nhiệm vụ cần giảng viên mở khoá

// Nhiệm vụ đang mở cho 1 phiên: tài khoản thử + giảng viên luôn mở hết; sinh viên theo lớp hoặc '*'.
async function openMissions(s) {
  if (!s || s.kind === 'test' || s.kind === 'teacher') return GATED.slice();
  const rows = await db.prepare(`SELECT class_name, mission FROM tt_unlock`).all();
  const cls = norm(s.class_name);
  return [...new Set(rows.filter((r) => r.class_name === '*' || norm(r.class_name) === cls).map((r) => Number(r.mission)))].sort();
}


// chặn dò mật khẩu / dò mã SV: 10 lần sai / 10 phút / IP
const fails = new Map();
const ipOf = (req) => String(req.headers['x-forwarded-for'] || req.ip || '').split(',')[0].trim();
function tooMany(ip) { const a = (fails.get(ip) || []).filter((t) => now() - t < 600000); fails.set(ip, a); return a.length >= 10; }
function noteFail(ip) { const a = fails.get(ip) || []; a.push(now()); fails.set(ip, a); }

// CSV đơn giản (có ngoặc kép), tự nhận dấu , ; hoặc tab
function parseCsv(text) {
  const t = String(text || '').replace(/^﻿/, '');
  const first = t.split(/\r?\n/)[0] || '';
  const sep = (first.match(/\t/g) || []).length ? '\t' : (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : ',';
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === sep) { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => String(x).trim()));
}
// Nhận cột theo tiêu đề (mã / họ tên / lớp); không có tiêu đề thì theo thứ tự mã, tên, lớp.
function rowsToRoster(rows) {
  if (!rows.length) return [];
  const h = rows[0].map(norm);
  const idx = (re) => h.findIndex((x) => re.test(x));
  let ic = idx(/\bma\b|ma sv|ma sinh vien|student|msv/), inm = idx(/ho ten|ho va ten|ten|name/), il = idx(/\blop\b|class/);
  let body = rows;
  if (ic >= 0 && il >= 0) body = rows.slice(1); else { ic = 0; inm = 1; il = 2; }
  return body.map((r) => ({ code: clean(r[ic], 40).toUpperCase().replace(/\s+/g, ''), name: clean(r[inm], 120), cls: clean(r[il], 60) }))
    .filter((x) => x.code && x.cls);
}

export function attachTtAccess(r) {
  const J = express.json({ limit: '2mb' });

  // Trạng thái cho màn đăng nhập: danh sách lớp (cho ô chọn) + có đang bật chế độ danh sách không.
  r.get('/api/tt/config', async (req, res) => {
    try {
      const n = Number((await rosterCount.get())?.n || 0);
      const classes = n ? (await db.prepare(`SELECT class_name c FROM tt_roster GROUP BY class_name ORDER BY class_name`).all()).map((x) => x.c) : [];
      res.json({ rosterOn: n > 0, classes, isManager: isManager(req) });
    } catch (e) { console.error('[tt] config:', e.message); res.status(500).json({ error: 'Lỗi máy chủ.' }); }
  });

  // Đăng nhập vào trang: sinh viên theo danh sách | tài khoản test | giảng viên quản lý.
  r.post('/api/tt/enroll', J, async (req, res) => {
    try {
      const b = req.body || {}; const ip = ipOf(req);
      if (tooMany(ip)) return res.status(429).json({ error: 'Nhập sai quá nhiều lần, vui lòng thử lại sau ít phút.' });
      let who;
      if (b.mode === 'teacher') {
        if (!isManager(req)) return res.status(403).json({ error: 'Tài khoản này không phải giảng viên quản lý.' });
        who = { code: TEACHER_CODE, name: clean(req.user.display_name || req.user.username, 120), cls: 'Giảng viên', kind: 'teacher' };
      } else if (b.mode === 'test') {
        const okUser = clean(b.username, 40).toLowerCase() === 'test';
        if (!okUser || !TEST_PASSWORDS.includes(String(b.password ?? ''))) { noteFail(ip); return res.status(401).json({ error: 'Sai tên đăng nhập hoặc mật khẩu.' }); }
        who = { code: TEST_CODE, name: 'Tài khoản thử', cls: 'Thử nghiệm', kind: 'test' };
      } else {
        const code = clean(b.studentCode, 40).toUpperCase().replace(/\s+/g, ''), name = clean(b.studentName, 120), cls = clean(b.className, 60);
        if (!code || !name || !cls) return res.status(400).json({ error: 'Vui lòng nhập đủ mã sinh viên, họ tên và chọn lớp.' });
        if ([TEST_CODE, TEACHER_CODE, 'KHACH'].includes(code)) { noteFail(ip); return res.status(400).json({ error: 'Mã sinh viên này không dùng được.' }); }
        if (Number((await rosterCount.get())?.n || 0) > 0) {
          const row = await rosterByCode.get(code);
          if (!row || norm(row.class_name) !== norm(cls)) {
            noteFail(ip);
            return res.status(403).json({ error: 'Mã sinh viên hoặc lớp không có trong danh sách của giảng viên. Kiểm tra lại, hoặc liên hệ giảng viên.' });
          }
        }
        who = { code, name, cls, kind: 'student' };
      }
      const id = randomUUID();
      await insSess.run({ id, code: who.code, name: who.name, cls: who.cls, kind: who.kind, ref: userRef(req), t: now() });
      await insAct.run(id, who.code, 'login', JSON.stringify({ kind: who.kind }), now());
      res.json({ sessionId: id, identity: { code: who.code, name: who.name, className: who.cls, kind: who.kind },
        open: await openMissions({ kind: who.kind, class_name: who.cls }) });
    } catch (e) { console.error('[tt] enroll:', e.message); res.status(500).json({ error: 'Không đăng nhập được, thử lại sau.' }); }
  });

  // Kiểm tra phiên còn hiệu lực (trang gọi khi mở lại).
  r.get('/api/tt/me', async (req, res) => {
    try {
      const s = await getSess.get(String(req.query.sessionId || ''));
      if (!s || now() - Number(s.created_at) > SESSION_MS) return res.status(401).json({ error: 'Phiên đã hết hạn.' });
      res.json({ identity: { code: s.student_code, name: s.full_name, className: s.class_name, kind: s.kind }, open: await openMissions(s) });
    } catch { res.status(500).json({ error: 'Lỗi máy chủ.' }); }
  });

  // Ghi nhật ký theo lô. Định danh lấy từ phiên máy chủ, không từ body.
  r.post('/api/tt/log', J, async (req, res) => {
    try {
      const b = req.body || {};
      const s = await getSess.get(String(b.sessionId || ''));
      if (!s) return res.status(401).json({ error: 'Phiên không hợp lệ.' });
      const evs = Array.isArray(b.events) ? b.events.slice(0, 60) : [];
      for (const e of evs) {
        const kind = clean(e?.kind, 40); if (!kind) continue;
        let detail = null; try { detail = e.detail == null ? null : JSON.stringify(e.detail).slice(0, 2000); } catch {}
        const t = Math.min(now(), Math.max(now() - 24 * 3600000, Number(e.t) || now()));
        await insAct.run(s.id, s.student_code, kind, detail, t);
      }
      await touchSess.run(now(), s.id);
      res.json({ ok: true, n: evs.length });
    } catch (e) { console.error('[tt] log:', e.message); res.status(500).json({ error: 'Lỗi máy chủ.' }); }
  });

  // ---------------- khu quản lý (giảng viên) ----------------
  // Tải danh sách lớp: { rows:[{code,name,cls}] } hoặc { csv:"…" }. mode: 'replace' (mặc định) | 'append'.
  r.post('/api/tt/manage/roster', requireManager, J, async (req, res) => {
    try {
      const b = req.body || {};
      const list = Array.isArray(b.rows)
        ? b.rows.map((x) => ({ code: clean(x.code, 40).toUpperCase().replace(/\s+/g, ''), name: clean(x.name, 120), cls: clean(x.cls, 60) })).filter((x) => x.code && x.cls)
        : rowsToRoster(parseCsv(b.csv));
      if (!list.length) return res.status(400).json({ error: 'Không đọc được dòng nào. File cần có 3 cột: mã sinh viên, họ tên, lớp.' });
      if (list.length > 5000) return res.status(400).json({ error: 'Tối đa 5000 sinh viên mỗi lần tải.' });
      if (b.mode !== 'append') await db.prepare(`DELETE FROM tt_roster`).run();
      const ins = db.prepare(`INSERT INTO tt_roster (student_code, full_name, class_name, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?)
        ON CONFLICT (student_code) DO UPDATE SET full_name = EXCLUDED.full_name, class_name = EXCLUDED.class_name, uploaded_by = EXCLUDED.uploaded_by`);
      for (const x of list) await ins.run(x.code, x.name, x.cls, userRef(req), now());
      const n = Number((await rosterCount.get())?.n || 0);
      res.json({ ok: true, imported: list.length, total: n });
    } catch (e) { console.error('[tt] roster:', e.message); res.status(500).json({ error: 'Không lưu được danh sách.' }); }
  });
  r.get('/api/tt/manage/roster', requireManager, async (_req, res) => {
    const rows = await db.prepare(`SELECT student_code code, full_name name, class_name cls FROM tt_roster ORDER BY class_name, student_code`).all();
    res.json({ rows });
  });
  r.delete('/api/tt/manage/roster', requireManager, async (_req, res) => {
    await db.prepare(`DELETE FROM tt_roster`).run();
    res.json({ ok: true });
  });

  // Bảng phân tích: mỗi người học 1 dòng. Thời gian hoạt động = tổng các khoảng cách giữa 2 thao tác liên tiếp < 5 phút.
  r.get('/api/tt/manage/summary', requireManager, async (_req, res) => {
    try {
      const acts = await db.prepare(`SELECT a.student_code code, a.kind, a.created_at t, a.session_id sid,
          CASE WHEN a.kind IN ('mission_done','mission_result') THEN a.detail END detail
        FROM tt_activity a ORDER BY a.student_code, a.created_at`).all();
      const sess = await db.prepare(`SELECT student_code code, full_name name, class_name cls, kind FROM tt_session ORDER BY created_at DESC`).all();
      const info = new Map(); for (const s of sess) if (!info.has(s.code)) info.set(s.code, s);
      const by = new Map();
      for (const a of acts) {
        let u = by.get(a.code);
        if (!u) { u = { code: a.code, sessions: new Set(), events: 0, activeMs: 0, first: Number(a.t), last: Number(a.t), missionsDone: 0, errors: 0, tutorQuestions: 0, posOpens: 0, done: {}, results: {} }; by.set(a.code, u); }
        const t = Number(a.t);
        if (u.events && t - u.last < 300000) u.activeMs += t - u.last;
        u.last = t; u.events++; u.sessions.add(a.sid);
        if (a.kind === 'mission_done') {
          u.missionsDone++;
          const m = Number(safeJson(a.detail)?.m) || 0; if (m) u.done[m] = (u.done[m] || 0) + 1;
        } else if (a.kind === 'mission_result') {
          const d = safeJson(a.detail) || {}; const m = Number(d.m) || 0;
          if (m) (u.results[m] = u.results[m] || []).push({ hintsOff: !!d.hintsOff, errors: Number(d.errors) || 0, asks: Number(d.asks) || 0, tier: Number(d.tier) || 0 });
        }
        else if (a.kind === 'error') u.errors++;
        else if (a.kind === 'tutor_ask') u.tutorQuestions++;
        else if (a.kind === 'pos_open') u.posOpens++;
      }
      const students = [...by.values()].map(({ done, results, ...u }) => ({ ...u, sessions: u.sessions.size, name: info.get(u.code)?.name || '', cls: info.get(u.code)?.cls || '', kind: info.get(u.code)?.kind || '',
          tiers: Object.fromEntries([1, 2, 3, 4, 5].map((m) => [m, gradeMission(results[m] || [], done[m] || 0)])) }))
        .sort((a, b) => String(a.cls).localeCompare(String(b.cls)) || String(a.code).localeCompare(String(b.code)));
      const rosterN = Number((await rosterCount.get())?.n || 0);
      res.json({ students, rosterN, tierRule: TIER_RULE });
    } catch (e) { console.error('[tt] summary:', e.message); res.status(500).json({ error: 'Lỗi máy chủ.' }); }
  });
  // Dòng thời gian của 1 người học
  r.get('/api/tt/manage/activity', requireManager, async (req, res) => {
    const code = clean(req.query.code, 40).toUpperCase();
    const rows = await db.prepare(`SELECT session_id sid, kind, detail, created_at t FROM tt_activity WHERE student_code = ? ORDER BY created_at DESC LIMIT 1000`).all(code);
    res.json({ rows });
  });
  // Mở / khoá nhiệm vụ 3–5 theo lớp. cls = '*' áp cho mọi lớp.
  r.get('/api/tt/manage/unlocks', requireManager, async (_req, res) => {
    try {
      const rows = await db.prepare(`SELECT class_name cls, mission FROM tt_unlock ORDER BY class_name, mission`).all();
      const classes = (await db.prepare(`SELECT class_name c FROM tt_roster GROUP BY class_name
        UNION SELECT class_name c FROM tt_session WHERE kind = 'student' AND class_name IS NOT NULL GROUP BY class_name ORDER BY c`).all()).map((x) => x.c);
      res.json({ missions: GATED, classes, rows });
    } catch (e) { console.error('[tt] unlocks:', e.message); res.status(500).json({ error: 'Lỗi máy chủ.' }); }
  });
  r.post('/api/tt/manage/unlock', requireManager, J, async (req, res) => {
    try {
      const b = req.body || {}; const cls = b.cls === '*' ? '*' : clean(b.cls, 60); const m = Number(b.mission);
      if (!cls || !GATED.includes(m)) return res.status(400).json({ error: 'Thiếu lớp hoặc nhiệm vụ không hợp lệ.' });
      if (b.on) await db.prepare(`INSERT INTO tt_unlock (class_name, mission, unlocked_by, created_at) VALUES (?, ?, ?, ?)
        ON CONFLICT (class_name, mission) DO NOTHING`).run(cls, m, userRef(req), now());
      else await db.prepare(`DELETE FROM tt_unlock WHERE class_name = ? AND mission = ?`).run(cls, m);
      res.json({ ok: true });
    } catch (e) { console.error('[tt] unlock:', e.message); res.status(500).json({ error: 'Không lưu được.' }); }
  });
  r.get('/api/tt/manage/export.csv', requireManager, async (_req, res) => {
    const rows = await db.prepare(`SELECT a.created_at t, a.student_code code, s.full_name name, s.class_name cls, a.kind, a.detail
      FROM tt_activity a LEFT JOIN tt_session s ON s.id = a.session_id ORDER BY a.created_at`).all();
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const out = ['Thời điểm,Mã SV,Họ tên,Lớp,Thao tác,Chi tiết', ...rows.map((x) => [new Date(Number(x.t)).toISOString(), x.code, x.name, x.cls, x.kind, x.detail].map(q).join(','))];
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="nhat-ky-thao-tac.csv"');
    res.send('﻿' + out.join('\n'));
  });
}
