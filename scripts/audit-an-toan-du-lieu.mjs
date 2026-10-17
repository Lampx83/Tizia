#!/usr/bin/env node
// ============================================================
// audit-an-toan-du-lieu.mjs — thống kê CHỈ ĐỌC cho báo cáo an toàn dữ liệu 17/10/2026
// ============================================================
// Đếm, KHÔNG sửa gì: liên kết phụ huynh đáng ngờ (#1), dữ liệu GPP/PharmaComm/lớp
// chưa có chủ (#2), tài khoản trẻ em (#3), giao dịch thanh toán đã có (#4).
//
// AN TOÀN:
//   - Mọi truy vấn chạy trong transaction READ ONLY (Postgres từ chối mọi lệnh ghi).
//   - KHÔNG in username, tên, email, mã SV: chỉ số lượng và ID số nội bộ.
//   - Chạy được cả TRƯỚC và SAU khi deploy bản vá (tự kiểm cột mới có chưa).
//
// CÁCH DÙNG (thầy tự chạy; script không đọc .env):
//   AUDIT_DATABASE_URL='postgres://…' node scripts/audit-an-toan-du-lieu.mjs
//   AUDIT_DATABASE_URL='postgres://…' node scripts/audit-an-toan-du-lieu.mjs --json > ket-qua.json
// ============================================================
import pg from 'pg';

const url = process.env.AUDIT_DATABASE_URL;
if (!url) {
  console.error('Thiếu AUDIT_DATABASE_URL (chuỗi kết nối Postgres, nên dùng tài khoản chỉ đọc).');
  process.exit(2);
}
const asJson = process.argv.includes('--json');
pg.types.setTypeParser(20, (v) => (v === null ? null : Number(v)));

const client = new pg.Client({ connectionString: url });
await client.connect();
const out = { generated_at: new Date().toISOString() };
try {
  await client.query('BEGIN TRANSACTION READ ONLY');
  const q = async (sql, params) => (await client.query(sql, params)).rows;
  const hasTable = async (t) => (await q(`SELECT to_regclass($1) AS r`, [t]))[0].r != null;
  const hasCol = async (t, c) => (await q(
    `SELECT 1 FROM information_schema.columns WHERE table_name = $1 AND column_name = $2`, [t, c])).length > 0;
  const DAY = 86400e3;
  const now = Date.now();

  // ── #3 Tài khoản trẻ em ────────────────────────────────────────
  out.tre_em = {
    theo_tuoi: await q(`
      SELECT CASE WHEN age IS NULL THEN 'khong_khai'
                  WHEN age < 7 THEN 'duoi_7' WHEN age < 12 THEN '7_11'
                  WHEN age < 16 THEN '12_15' WHEN age < 18 THEN '16_17' ELSE 'tu_18' END AS nhom,
             COUNT(*) AS so_tk
        FROM users GROUP BY 1 ORDER BY 1`),
    duoi_16_theo_vai_tro: await q(`SELECT role, COUNT(*) AS so_tk FROM users WHERE age < 16 GROUP BY role ORDER BY role`),
    hoc_sinh_theo_lop: await q(`SELECT COALESCE(grade::text, 'chua_khai') AS lop, COUNT(*) AS so_tk FROM users WHERE role = 'pupil' GROUP BY 1 ORDER BY 1`),
    duoi_16_co_email: (await q(`SELECT COUNT(*) AS n FROM users WHERE age < 16 AND email IS NOT NULL AND email <> ''`))[0].n,
    duoi_16_dang_nhap_30_ngay: (await q(`SELECT COUNT(*) AS n FROM users WHERE age < 16 AND last_login > $1`, [now - 30 * DAY]))[0].n,
    duoi_16_dang_nhap_90_ngay: (await q(`SELECT COUNT(*) AS n FROM users WHERE age < 16 AND last_login > $1`, [now - 90 * DAY]))[0].n,
    hoc_sinh_lop_1_9_hoac_duoi_16: (await q(`SELECT COUNT(*) AS n FROM users WHERE age < 16 OR (role = 'pupil' AND grade BETWEEN 1 AND 9)`))[0].n,
    theo_truong_dang_hoc: await q(`
      SELECT COALESCE(enrolled_domain, 'chua_chon') AS truong, COUNT(*) AS so_tk
        FROM users WHERE age < 16 GROUP BY 1 ORDER BY 2 DESC`),
  };

  // ── #1 Liên kết phụ huynh/GV ↔ học sinh ─────────────────────────
  const hasStatus = await hasCol('family_links', 'status');
  out.lien_ket = {
    tong: (await q(`SELECT COUNT(*) AS n FROM family_links`))[0].n,
    da_co_cot_status: hasStatus,
    theo_status: hasStatus ? await q(`SELECT status, COUNT(*) AS n FROM family_links GROUP BY status ORDER BY status`) : null,
  };
  // Dấu hiệu đáng ngờ (mỗi liên kết có thể nhiều dấu hiệu). Mọi liên kết tạo trước
  // bản vá đều CHƯA được học sinh xác nhận; các dấu hiệu dưới đây để ưu tiên rà.
  const links = await q(`
    WITH pc AS (SELECT parent_user_id, COUNT(*) AS so_con FROM family_links GROUP BY parent_user_id),
         cp AS (SELECT child_user_id, COUNT(*) AS so_ph FROM family_links GROUP BY child_user_id)
    SELECT f.id, f.created_at, f.parent_user_id, f.child_user_id,
           p.role AS parent_role, p.age AS parent_age, p.created_at AS parent_created_at,
           c.role AS child_role, c.age AS child_age, c.grade AS child_grade,
           (p.school_name IS NOT NULL AND c.school_name IS NOT NULL AND lower(p.school_name) <> lower(c.school_name)) AS khac_truong,
           pc.so_con, cp.so_ph
      FROM family_links f
      JOIN users p ON p.id = f.parent_user_id
      JOIN users c ON c.id = f.child_user_id
      JOIN pc ON pc.parent_user_id = f.parent_user_id
      JOIN cp ON cp.child_user_id = f.child_user_id
     ORDER BY f.created_at`);
  const flagged = [];
  for (const l of links) {
    const f = [];
    if (l.so_con >= 3) f.push(`ph_lien_ket_${l.so_con}_hs`);
    if (l.so_ph >= 2) f.push(`hs_co_${l.so_ph}_ph`);
    if (l.parent_role === 'student') f.push('ph_la_tk_sinh_vien');
    if (l.parent_age != null && l.parent_age < 18) f.push('ph_duoi_18_tuoi');
    if (l.created_at - l.parent_created_at < DAY) f.push('tk_ph_tao_trong_24h');
    if (l.khac_truong) f.push('khac_ten_truong');
    if (l.child_age != null && l.child_age < 7) f.push('hs_duoi_7_tuoi');
    if (f.length) flagged.push({
      link_id: l.id, ngay_tao: new Date(Number(l.created_at)).toISOString().slice(0, 10),
      parent_id: l.parent_user_id, parent_role: l.parent_role,
      child_id: l.child_user_id, child_grade: l.child_grade, dau_hieu: f,
    });
  }
  out.lien_ket.dang_ngo = { so_luong: flagged.length, danh_sach: flagged };

  // ── #2 Dữ liệu GPP / PharmaComm / lớp học ───────────────────────
  const gppOwner = await hasCol('gpp_participant', 'owner_user_id');
  out.duoc = {
    gpp_ma_sv: (await q(`SELECT COUNT(*) AS n FROM gpp_participant`))[0].n,
    gpp_ma_sv_chua_co_chu: gppOwner ? (await q(`SELECT COUNT(*) AS n FROM gpp_participant WHERE owner_user_id IS NULL`))[0].n : 'chua_deploy',
    gpp_ket_qua_cap: (await q(`SELECT COUNT(*) AS n FROM gpp_level_result`))[0].n,
    gpp_bai_test: (await q(`SELECT COUNT(*) AS n FROM gpp_test_result`))[0].n,
    pharmacomm_ho_so_sv: (await q(`SELECT COUNT(*) AS n FROM pharmacy_student`))[0].n,
    pharmacomm_phien_theo_loai: await q(`SELECT session_kind, COUNT(*) AS n FROM pharmacy_practice_session GROUP BY 1 ORDER BY 1`),
    lop_hoc: (await q(`SELECT COUNT(*) AS n FROM classes`))[0].n,
    lop_hoc_chua_co_nguoi_tao: (await hasCol('classes', 'creator_user_id'))
      ? (await q(`SELECT COUNT(*) AS n FROM classes WHERE creator_user_id IS NULL`))[0].n : 'chua_deploy',
    tk_tu_khai_giao_vien: (await q(`SELECT COUNT(*) AS n FROM users WHERE role = 'teacher'`))[0].n,
    ten_hien_thi_trung: (await q(`
      SELECT COUNT(*) AS n FROM (SELECT lower(display_name) FROM users GROUP BY 1 HAVING COUNT(*) > 1) t`))[0].n,
  };

  // ── #4 Thanh toán ───────────────────────────────────────────────
  out.thanh_toan = {
    goi_dang_ky_theo_trang_thai: await q(`SELECT plan, status, COUNT(*) AS n FROM subscriptions GROUP BY 1, 2 ORDER BY 1, 2`),
    tk_co_goi_tra_phi: (await q(`SELECT COUNT(*) AS n FROM users WHERE plan IS NOT NULL AND plan NOT IN ('free', 'guest')`))[0].n,
  };
  for (const t of ['invoices', 'payments', 'refunds', 'ledger_entries', 'webhook_inbox']) {
    if (!(await hasTable(t))) { out.thanh_toan[t] = 'khong_co_bang'; continue; }
    out.thanh_toan[t] = (await q(`SELECT COUNT(*) AS n FROM ${t}`))[0].n;
  }
  if (await hasTable('invoices')) {
    out.thanh_toan.hoa_don_theo_trang_thai = await q(`SELECT status, COUNT(*) AS n, COALESCE(SUM(amount), 0) AS tong_tien FROM invoices GROUP BY status ORDER BY status`);
  }
} finally {
  await client.query('ROLLBACK').catch(() => {});
  await client.end();
}

if (asJson) console.log(JSON.stringify(out, null, 2));
else {
  console.log('=== Thống kê an toàn dữ liệu Tizia (chỉ đọc) —', out.generated_at, '===');
  console.log(JSON.stringify(out, null, 2));
}
