# Nghiên cứu nâng cấp — Ban điều hành AI

> Đo ngày 2026-11-05 trên `origin/main` @ `a1d7704` và `origin/feat/postgres-migration` @ `ff4c50a`.
> Mọi con số dưới đây đều có lệnh tái hiện đi kèm.

## Tóm tắt

Ban điều hành AI đã chạy hơn 80 phiên, nhưng **chưa từng đọc được một yêu cầu thật nào**
của người học kể từ 2026-09-13 (ghi nhận chính thức), và theo CHANGELOG thì từ tháng 7.
Nguyên nhân không nằm ở chất lượng từng phiên mà ở thiết kế: hộp thư phụ thuộc vào một việc
chỉ con người làm được, kênh báo cho con người không ai đọc, và phiên AI làm việc trên một
nhánh mà production không chạy.

Ba việc mang lại nhiều giá trị nhất, theo thứ tự:

1. **Bật hộp thư (chủ sở hữu, ~15 phút)** — nhưng phải sửa thêm `docker-compose.yml` trên
   server, nếu không key đặt trong `.env` sẽ không vào được container (xem §1.2).
2. **Đóng vòng phản hồi** — thêm đường *ghi* có giới hạn để AI trả lời và đóng yêu cầu;
   hiện key chỉ đọc nên luật "mỗi yêu cầu phải được phản hồi" không thể thực hiện.
3. **Gộp về một nhánh chính** — `main` nay đã là tổ tiên của `feat/postgres-migration`,
   có thể fast-forward `main` lên nhánh production và từ đó chỉ còn một cây code.

---

## 1. Hiện trạng đo được

### 1.1 Hộp thư vẫn chết

```
node scripts/ai-board-preflight.mjs
```

- Cả 6 endpoint trả `401`; `/api/ai-board/inbox` trả `401 {"needLogin":true}` — tức là
  **gate chung** chặn, bản đang chạy chưa có route.
- Ngày hỏng liên tiếp thứ 19 theo `ai-board/inbox-status.json` (preflight không chạy
  từ 2026-10-02 đến 2026-10-29, nên con số thật cao hơn).
- Ba bậc việc dự phòng **đều sạch** từ phiên 79 — routine không còn gì đo được để làm.

### 1.2 Vì sao "đặt key + redeploy" chưa đủ

```
node scripts/check-deployed-build.mjs
git show origin/feat/postgres-migration:docker-compose.yml
```

| Điều kiện để route sống | Trạng thái |
|---|---|
| Code route `inbox-api.js` có trên nhánh production | ✅ có ở tip `ff4c50a` |
| `/api/ai-board/` có trong `PUBLIC_PATH_PREFIXES` | ✅ có ở tip |
| Bản đang chạy chứa code đó | ❌ bản đang chạy nằm trong nhóm `d98a086..41c3a73`; `41c3a73` không có `inbox-api.js` |
| `AI_BOARD_KEY` đi được vào container | ❌ **chưa** — xem dưới |

`docker-compose.yml` trong repo khai báo `environment:` tường minh cho service `tizia`
(chỉ `NODE_ENV`, `PORT`, `HOST`, `DATA_DIR`, `BASE_PATH`, `DATABASE_URL`) và **không có
`env_file:`**. Docker Compose chỉ dùng `.env` để *nội suy* `${...}` trong file compose,
không tự bơm mọi biến vào container. Vậy thêm `AI_BOARD_KEY=...` vào `.env` mà không
sửa compose thì `process.env.AI_BOARD_KEY` vẫn rỗng, route không mount, path trả `404`.

`scripts/deploy-prod.sh` cố ý **không đụng** `docker-compose.yml` trên server, nên file
compose trên server có thể khác bản trong repo — cần mở trực tiếp để kiểm.

Ngoài ra phiên routine (chạy trên cloud) cũng phải có key: thêm `AI_BOARD_KEY` vào
**secret của môi trường cloud** chạy scheduled task, không phải chỉ trên server.

### 1.3 Kiến thức trong repo đã lỗi thời

`ROUTINE.md`, `check-deployed-build.mjs` và nhiều mục CHANGELOG khẳng định `main` và
`feat/postgres-migration` "không chung gốc lịch sử". Điều đó **không còn đúng**:

```
git merge-base --is-ancestor origin/main origin/feat/postgres-migration && echo yes   # → yes
git rev-list --count origin/main                          # 98
git rev-list --count origin/feat/postgres-migration       # 602
```

Commit `ec18dd4` đã merge `main` vào nhánh production. Hệ quả: `main` có thể
**fast-forward** thẳng lên `feat/postgres-migration` mà không cần giải xung đột.
(Bản *đang chạy* thì vẫn cũ hơn thời điểm merge đó, nên kết luận "không chung gốc" của
script chỉ đúng với bản deploy, không đúng với hai nhánh.)

Nhánh production đã khác hẳn `main`: Postgres (`server/pg.js`, `schema.sql`), frontend
Next.js (`web-next/`), mô-đun GPP. Routine đang soạn học liệu trên một cây code cũ
hơn 500 commit.

### 1.4 Luật "làm thẳng trên main" không thực hiện được trong môi trường cloud

Phiên 78 đổi luật: không nhánh, không PR. Nhưng hai phiên sau đó vẫn mở PR, vì phiên cloud
chỉ được push lên nhánh được giao:

| PR | Nhánh | Nội dung | Trạng thái |
|---|---|---|---|
| #111 | `claude/brave-keller-u5jlz4` | preflight chẩn đoán deploy từ số đo thật | mở từ 2026-10-01 |
| #112 | `claude/brave-keller-iwlmi6` | preflight đo việc phiên trước đã lên main chưa | mở từ 2026-10-03 |

Đúng vấn đề luật mới định giải quyết: việc treo, không ai merge. Remote hiện có 133 nhánh.
Sau 2026-10-03 không còn commit nào của routine — có vẻ scheduled task đã dừng.

### 1.5 Người học vẫn đang gửi yêu cầu — nhưng đi đường khác

Commit của chủ sở hữu trên nhánh production nhắc `#224`, `#231`, `#233`–`#237` (GPP, Dược).
Repo không có GitHub issue nào và số PR mới tới #112, nên **nhiều khả năng** đó là ID yêu
cầu trong bảng `requests` — tức là có hàng trăm yêu cầu, và chủ sở hữu đang tự xử lý bằng tay.
Ban điều hành AI đứng ngoài toàn bộ luồng việc thật.

### 1.6 Lỗ hổng trong luồng yêu cầu (nhánh production)

| Route | Vấn đề | Hệ quả |
|---|---|---|
| `GET /api/requests/:id/thread` | Không kiểm chủ sở hữu | Người đã đăng nhập đọc được mọi yêu cầu (tên HS, nội dung, link đính kèm) bằng cách dò ID — trái với chính sách "mỗi tài khoản chỉ thấy yêu cầu của mình" ở `GET /api/requests` |
| `POST /api/requests/:id/vote` | Không giới hạn số lần | Bơm phiếu tuỳ ý; hộp thư sắp theo `votes DESC` nên thao túng được thứ tự ưu tiên |
| `GET /api/requests/:id/decisions` | Không kiểm quyền | Lộ `reason` nội bộ của admin |

`POST /api/requests/:id/status` đã được gate admin trên nhánh production nhưng **vẫn mở**
trên `main` (`server/index.js`) — thêm một lý do để gộp nhánh.

---

## 2. Đề xuất nâng cấp

### Giai đoạn 0 — Bật hộp thư (chủ sở hữu tự làm)

Trên server production:

1. Sinh key: `openssl rand -hex 32`.
2. Thêm vào `/home/codelab/tizia-dev/.env`: `AI_BOARD_KEY=<key>`.
3. Sửa `/home/codelab/tizia-dev/docker-compose.yml`, service `tizia`, mục `environment:`:
   `AI_BOARD_KEY: ${AI_BOARD_KEY:-}`.
4. Từ máy dev trên nhánh `feat/postgres-migration`: `bash scripts/deploy-prod.sh`.
5. Kiểm: `curl -i https://tizia.vn/api/ai-board/inbox` phải trả
   `401 "Thiếu header x-ai-board-key"` (không phải `needLogin`, không phải `404`);
   log container phải có dòng `[ai-board] ✅ /api/ai-board/inbox đã bật`.
6. Thêm cùng key vào secret của môi trường cloud chạy routine.

Nên sửa luôn `docker-compose.yml` trong repo (bước 3) để lần dựng server mới không mất.

### Giai đoạn 1 — Sửa routine (rủi ro thấp, trong phạm vi tự quyết)

| # | Việc | Lý do |
|---|---|---|
| 1.1 | Cập nhật `ROUTINE.md`, thông điệp preflight và `check-deployed-build.mjs`: bỏ khẳng định "không chung gốc", nêu đủ 3 bước của Giai đoạn 0 kể cả compose | Thông điệp leo thang hiện thiếu đúng bước khiến nó thất bại |
| 1.2 | Leo thang qua **một GitHub issue cố định** ("🚨 Hộp thư Ban điều hành AI chết N ngày"), mỗi phiên cập nhật số ngày thay vì chỉ in ra log | 19+ ngày leo thang chỉ nằm trong đầu ra phiên, không ai đọc. Issue có thông báo email, đóng được khi xong |
| 1.3 | Xử lý PR #111, #112: merge phần còn giá trị, đóng phần trùng | Đang treo đúng kiểu luật mới muốn xoá |
| 1.4 | Sửa luật Git cho đúng môi trường: phiên cloud mở PR rồi **tự merge** sau khi cổng kiểm thử xanh (qua GitHub MCP), hoặc chủ sở hữu cấp quyền push `main` | Luật hiện tại đòi việc môi trường không cho làm |
| 1.5 | Khi hộp thư chết **và** ba bậc sạch: chuyển routine sang chạy hàng tuần, chỉ đo và cập nhật issue | Hơn 10 phiên gần nhất không tạo ra giá trị đo được |

### Giai đoạn 2 — Đóng vòng phản hồi (đụng `server/**`, cần chủ sở hữu duyệt)

**2.1 Đường ghi có giới hạn cho AI.** Thêm `POST /api/ai-board/requests/:id/reply` với
key riêng `AI_BOARD_WRITE_KEY` (tách khỏi key đọc), chỉ cho phép:

- thêm một tin `role='ai'` vào thread;
- đổi `status` trong `reviewing | done | rejected`;
- ghi `ai_decisions` (`decided_by='ai'`) và gửi notification cho HS.

Không cho sửa/xoá dữ liệu khác. Dùng lại khung bảo mật của `inbox-api.js` (timingSafeEqual,
tắt mặc định, key ≥ 24 ký tự). Có đường này thì luật "phản hồi đúng người gửi" mới thực hiện được.

**2.2 Vá §1.6.** `thread` và `decisions`: chỉ chủ yêu cầu hoặc admin. `vote`: bảng
`request_votes(request_id, user_id)` với khoá UNIQUE — cần DDL trên `tizia-postgres`
trước khi deploy.

**2.3 Gộp nhánh.** Fast-forward `main` → `feat/postgres-migration`, đặt `main` làm nhánh
production, sửa `PROD_BRANCH` trong `deploy-prod.sh`. Từ đó routine, người và production
cùng một cây.

### Giai đoạn 3 — Vận hành có số đo

- Chỉ số mỗi phiên ghi vào `inbox-status.json`: số yêu cầu tồn, tuổi yêu cầu lâu nhất,
  thời gian tới phản hồi đầu tiên, tỉ lệ đóng trong 7 ngày.
- Phân loại tự động khi đọc hộp thư: *học liệu* (AI tự làm) / *tính năng* (đề xuất PR cho
  người duyệt) / *lỗi production* (leo thang ngay).
- Chống trùng: gom các yêu cầu cùng nội dung trước khi xử lý.

---

## 3. Việc cần chủ sở hữu quyết

1. Làm Giai đoạn 0 (gồm sửa compose trên server) — **chặn mọi việc khác**.
2. Cho phép routine tự merge PR của chính nó sau khi kiểm thử xanh, hay cấp quyền push `main`?
3. Đồng ý fast-forward `main` lên `feat/postgres-migration` không?
4. Duyệt phạm vi `server/**` cho Giai đoạn 2 (đường ghi + vá bảo mật)?
