-- Xoá khoá ngoại trùng do schema.sql cũ thêm mỗi lần boot. Giữ lại khoá cũ nhất của mỗi nhóm (cùng bảng, cột, bảng đích).
-- Chỉ chạy SAU khi đã deploy schema.sql có ensure_fk, nếu không lần boot sau lại sinh thêm.
-- Mỗi DROP tự commit riêng để không giữ khoá trên bảng users quá lâu.
SELECT format('ALTER TABLE %s DROP CONSTRAINT %I;', conrelid::regclass, conname)
  FROM (
    SELECT conrelid, conname,
           row_number() OVER (PARTITION BY conrelid, conkey, confrelid, confkey ORDER BY oid) AS rn
      FROM pg_constraint WHERE contype = 'f'
  ) x
 WHERE rn > 1 \gexec
