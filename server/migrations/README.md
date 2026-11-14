# Migration có phiên bản

Tizia có **hai** cách đổi cấu trúc DB, dùng đúng chỗ:

| Việc | Viết ở đâu |
|---|---|
| Thêm bảng, thêm cột, thêm index, thêm khoá ngoại | `server/schema.sql` — chạy lại MỖI lần khởi động nên mọi lệnh phải lặp được (`IF NOT EXISTS`, `pg_temp.ensure_fk`) |
| Đổi tên/xoá cột, đổi kiểu, chuyển hoặc sửa dữ liệu hàng loạt, việc chỉ được chạy **một lần** | file mới trong thư mục này |

## Quy ước

- Tên file: `NNNN-mo-ta-ngan.sql` (4 chữ số, chữ thường, gạch nối). Ví dụ `0001-gop-cot-ten-lop.sql`.
- Lúc khởi động, sau `schema.sql`, app chạy các file **chưa có** trong bảng `schema_migrations`,
  theo thứ tự tên. Mỗi file chạy trong **một transaction**. Lỗi thì rollback file đó và app **không
  khởi động**: xem log `[migrate]`, sửa rồi deploy lại.
- **Đã lên prod thì không sửa file nữa.** Muốn chỉnh, thêm một file mới. Sửa file cũ chỉ sinh cảnh báo
  "nội dung file đã đổi" và không chạy lại.
- Đừng viết `BEGIN`/`COMMIT` trong file. Lệnh không chạy được trong transaction
  (`CREATE INDEX CONCURRENTLY`, `VACUUM`) thì không đặt ở đây.
- App kết nối bằng role `tizia_app` (không superuser), nên migration không được cần quyền superuser.
- Thử trước trên bản sao DB (khôi phục bản sao lưu vào container Postgres tạm) rồi mới deploy.
