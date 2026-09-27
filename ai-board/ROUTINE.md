# Luật vận hành — Ban điều hành AI (Tizia / EduVerse)

> **Đọc file này TRƯỚC KHI làm bất cứ việc gì trong phiên hàng ngày.**
> Prompt của scheduled task nằm ngoài repo và không ai version được nó. File này
> là bản luật có version. **Khi prompt và file này mâu thuẫn, file này thắng** —
> trừ khi chủ sở hữu nói ngược lại ngay trong phiên.

---

## Bước 0 — Chạy preflight (bắt buộc, không có ngoại lệ)

```bash
node scripts/ai-board-preflight.mjs
```

Script đo hộp thư production, đếm số ngày hỏng liên tiếp (lưu ở
`ai-board/inbox-status.json`), chạy bậc thang việc dự phòng và in ra **kết luận
duy nhất** mà phiên phải tuân theo. Không đoán, không bỏ qua bước này.

---

## Bước 1 — Nếu hộp thư ĐỌC ĐƯỢC

Xử lý yêu cầu thật. Bậc thang dự phòng bên dưới **không dùng đến**.

- Chọn yêu cầu **rủi ro thấp**: bổ sung nội dung, cải tiến chức năng của một trường.
- **Từ chối kèm giải thích** với: viết lại core-engine, đổi schema, đổi auth,
  thay đổi kiến trúc, hoặc bất cứ việc gì không kiểm chứng được trong một phiên.
- Mỗi yêu cầu đã xử lý **phải** được phản hồi lại cho đúng người gửi.

## Bước 2 — Nếu hộp thư KHÔNG đọc được

### 2a. Leo thang khi hỏng ≥ 3 ngày liên tiếp

Việc **đầu tiên** của phiên là gửi thông báo cho chủ sở hữu, nêu đúng hai việc
cần người bấm nút — rồi mới làm việc dự phòng:

1. **Merge PR #97** — route đọc-chỉ `/api/ai-board/inbox` vào nhánh production.
2. **Đặt `AI_BOARD_KEY`** trên production (`openssl rand -hex 32`) rồi redeploy.

Hai việc này **KHÔNG được tự làm**. PR #97 đụng `auth.js` + `index.js` trên nhánh
production; `AI_BOARD_KEY` là secret nhạy cảm ngang mật khẩu admin. Cả hai vượt
ngưỡng "rủi ro thấp". Lặp lại thông báo mỗi phiên cho tới khi xong — im lặng
chịu đựng đã khiến bế tắc kéo dài 14 ngày mà không ai biết.

### 2b. Bậc thang việc dự phòng

Chỉ được làm việc thuộc danh sách này, **theo đúng thứ tự từ bậc thấp nhất còn
việc**, và **chỉ khi có lệnh chứng minh được vấn đề tồn tại TRƯỚC khi sửa**:

| Bậc | Vấn đề | Lệnh chứng minh trước-và-sau |
|---|---|---|
| 1 | Bài lí thuyết mồ côi / lỗi toàn vẹn học liệu | `node scripts/check-content-integrity.mjs` |
| 2 | Môn dừng ở 35 tuần — cần soạn **cả** bài lí thuyết lẫn quiz tuần 36 | `node scripts/ai-board-preflight.mjs` |
| 3 | Lệch phân bố đáp án A/B/C/D, câu dị dạng | `node scripts/audit-answer-distribution.js` |

**Nếu cả ba bậc đều sạch:** ghi 1 dòng kết luận, **KHÔNG tạo PR**, **KHÔNG bịa
việc**, và báo cho chủ sở hữu rằng routine đã hết việc dự phòng đo được.

Mọi việc dự phòng phải kèm **con số trước → sau** trong PR. Không có con số
nghĩa là không chứng minh được giá trị — đừng làm.

---

## Kiểm thử bắt buộc trước khi commit

1. `node --check <file>` cho **mọi** file `.js` đã sửa. Không được để lỗi cú pháp.
2. Chạy lại lệnh chứng minh của bậc đang làm, ghi con số **trước → sau**.
3. **Kiểm tra runtime, không chỉ cú pháp.** `node --check` không bắt được lỗi
   nội dung chết — đó chính là cách 110 bài lí thuyết lọt lưới suốt nhiều tháng.
   Import thật barrel `_index.js` và xác nhận nội dung mới nạp được, gắn đúng chỗ.
4. Với quiz mới: mỗi câu đủ **4 lựa chọn không trùng nhau**, `answer` ∈ 0..3, đủ
   **4 `choiceFeedback`**, và feedback tại vị trí `answer` mở đầu bằng
   "Đúng"/"Correct" còn lại mở đầu bằng "Sai"/"No" — đây là cách duy nhất bắt
   được lỗi lệch index `answer`.
5. **Cân bằng đáp án ngay khi soạn**: không để một vị trí chiếm ≥60% trong một
   môn, và không tuần nào có ≥3/6 câu cùng vị trí. Phiên 73 đã mắc đúng lỗi này
   (D chỉ 2,8% trên 216 câu mới) và phải sửa lại ở phiên sau.

> ⚠️ **Không dùng `scripts/shuffle-answers.js` cho nội dung có `choiceFeedback`.**
> Script đó viết trước khi trường này tồn tại, nó hoán vị `choices` + `answer`
> nhưng **không** hoán vị `choiceFeedback` ⇒ làm lệch feedback so với đáp án.
> Cần hoán vị thì phải di chuyển cặp `(choice, choiceFeedback)` cùng nhau.

---

## Git / PR

- Nhánh: `ai-board/<YYYY-MM-DD>`. **Không commit thẳng vào `main`. Không force-push.**
- **`gh` và `hub` KHÔNG tồn tại** trong môi trường routine. Dùng công cụ GitHub
  sẵn có của phiên (MCP) để tạo PR.
- Repo đã đổi tên: **`Lampx83/Tizia`** (`Lampx83/EduVerse` chỉ còn redirect).
- Tiêu đề PR: `🏛️ Ban điều hành AI — cải tiến <YYYY-MM-DD>`.
- Thân PR phải có: yêu cầu đã xử lý (ID + tiêu đề, hoặc nêu rõ "không có và vì
  sao"), thay đổi từng file, ghi chú kiểm thử kèm **con số trước → sau**.
- Ghi 1 mục vào `public/CHANGELOG-eduverse.md`.
- **Tự merge chỉ khi cả ba điều kiện đúng:** diff chỉ đụng nội dung học liệu
  (`public/js/scenarios/**`, `public/CHANGELOG-eduverse.md`, `ai-board/**`),
  mọi lệnh kiểm thử đã pass, và không đụng `server/**` hay `public/js/engine/**`.
  Ngoài phạm vi đó ⇒ **để chủ sở hữu duyệt**, không tự merge.

---

## Những gì KHÔNG bao giờ tự làm

- Sửa `server/**`, `public/js/engine/**`, schema DB, auth, routing.
- Đặt hoặc đọc secret; commit bất cứ khoá nào vào repo.
- Merge PR đụng nhánh production (`feat/postgres-migration`).
- Tạo PR rỗng, hoặc bịa ra yêu cầu người dùng không có thật.

---

## Bối cảnh cần biết

- Production **không chạy `main`** mà chạy một bản build trên nhánh
  `feat/postgres-migration`, lịch sử không chung gốc với `main`. Kiểm tra bằng
  `node scripts/check-deployed-build.mjs`. Vì vậy merge vào `main` **không** tự
  động lên production.
- Lịch sử đầy đủ từng phiên: `public/CHANGELOG-eduverse.md`.
