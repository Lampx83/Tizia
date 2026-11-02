---
name: default-merge
description: Resolve an in-progress git merge or rebase conflict
task_type: merge
source: default
version: 2
max_tokens: 1200
---
1. Xem trạng thái merge/rebase: file xung đột, lịch sử commit hai nhánh.
2. Tìm ý định gốc của mỗi thay đổi trong commit message, PR hoặc ticket liên quan trước khi sửa.
3. Giải từng đoạn xung đột, giữ ý định của cả hai bên khi có thể. Nếu mâu thuẫn, chọn theo mục tiêu của merge và ghi đánh đổi. Không bịa hành vi mới.
4. Kiểm tất định trước khi commit, không gọi model: `python ai-board/harness/services/conflict_markers.py <file>` không in dòng nào (hết <<<<<<<, =======, >>>>>>>); chạy lại kiểm tra tự động (typecheck, test, format) và sửa phần merge làm hỏng.
5. Hoàn tất: stage toàn bộ, commit; với rebase thì tiếp tục đến hết mọi commit.
6. Không dùng --abort, không push, không đổi nhánh đích. Nêu rõ phần không tự kiểm được (ví dụ quyền ghi nhánh gốc).
