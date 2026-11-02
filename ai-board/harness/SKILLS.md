# Skill triển khai được (LF/75)

Mỗi skill là một thư mục `skills/<name>/SKILL.md` với frontmatter `name, description, task_type, source, version, max_tokens`.
Harness và image dùng cùng thư mục này; `skills.lock.json` giữ sha256 của từng file.

## Cập nhật một skill

1. Sửa `skills/<name>/SKILL.md`; tăng `version` khi nội dung đổi.
2. Chạy `node scripts/check-skills.mjs`. Nếu báo hash lệch, cập nhật mục của skill đó trong
   `skills/skills.lock.json` bằng hash công cụ in ra (không sửa nội dung skill khác trong cùng commit).
3. Chạy `python -m pytest ai-board/harness/tests/test_skill_lock.py ai-board/harness/tests/test_default_skills.py`.
4. Commit cả `SKILL.md` và `skills.lock.json`. Build image chạy `check-skills` nên lệch khóa sẽ fail build.

Biến thể thử nghiệm đặt ở `skills/proposed/` và khai báo trong `ai-board/harness/services/context.py`
(`VARIANT_FILES`), không thêm vào `skills.lock.json` (xem `UNLOCKED` trong `scripts/check-skills.mjs`).

Trong luồng self-request, harness tự gọi `services/candidate.relock` sau khi diff qua guard và commit hash mới;
model không được tự viết file khóa.
