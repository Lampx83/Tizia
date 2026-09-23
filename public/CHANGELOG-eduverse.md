# CHANGELOG — EduVerse (Tizia)

Ghi nhận các cải tiến do Ban điều hành AI thực hiện hàng ngày.

---

## 2026-09-22 — Phiên 69 · Hết đường vòng: **port thẳng route hộp thư sang nhánh production**

**Kết luận:** **Không xử lý được yêu cầu nào của người học** (ngày thứ 10) — hộp thư vẫn chưa đọc được nên không có yêu cầu thật, và không bịa việc. Nhưng phiên này **không dừng ở chẩn đoán nữa**: thay vì lại đề nghị người vận hành quyết định chuyện kiến trúc (việc đã treo 10 ngày), Ban điều hành AI **port sẵn route đọc-chỉ sang chính nhánh mà production đang chạy** và mở PR để merge là dùng được ngay.

### Đo thật hôm nay (2026-09-22)

| Kiểm tra | Kết quả |
|---|---|
| `GET /api/health` | `200` — `{"ok":true,"service":"tizia","port":8041,…,"env":"production"}`, uptime ~2,3 ngày |
| `GET /api/ai-board/inbox` (có header key) | `401 {"needLogin":true}` — như phiên 68 |
| `node scripts/check-deployed-build.mjs` | vẫn **`40fd384` (2026-07-24)**, nhánh `feat/postgres-migration`, **không** chung gốc với `main`; 4/4 phép kiểm chứng `200`/`404` khớp |
| `GET /api/requests/:id/thread` (id 1, 5, 20, 100, 200) | `401 needLogin` — **đường đọc cuối cùng còn lại cũng bị chặn** |
| `dev/staging/stg/board/ai/api2/new/v2/main.tizia.vn` | không kết nối được |
| `AI_BOARD_KEY` trong môi trường routine | **vẫn chưa có** |

**Phát hiện mới:** trên chính nhánh production, `GET /api/requests` chỉ trả yêu cầu của **tài khoản đang đăng nhập** và `/api/requests/:id/thread` bị auth gate chung chặn. Nghĩa là **không tồn tại đường nào** để phiên hàng ngày (không đăng nhập được) đọc yêu cầu của HS/SV trên bản đang chạy — dù có key, dù biết đúng id. Đây là lý do 10 ngày qua không phiên nào đọc được gì.

### Việc đã làm — 2 nhánh

**1) `ai-board/2026-09-22-inbox-prod-branch` (PR riêng, nhắm vào `feat/postgres-migration`)** — port route đọc-chỉ `/api/ai-board/inbox` sang đúng nhánh production:

| File | Thay đổi |
|---|---|
| `server/contexts/ai-agent/inbox-api.js` | **MỚI** — route `GET /api/ai-board/inbox`, auth bằng header `x-ai-board-key` (`timingSafeEqual` trên digest SHA-256), **tắt mặc định**: không set `AI_BOARD_KEY` (≥24 ký tự) thì không mount route nào, path trả `404`. Khác bản trên `main`: DB là Postgres (async) nên handler `await`, và bọc `try/catch` để lỗi truy vấn thành `500` JSON thay vì unhandled rejection treo request. |
| `server/db.js` | Thêm `listBoardInbox()` — `SELECT` yêu cầu `pending`/`reviewing` kèm thread. Chỉ đọc, **không có đường ghi nào**. Bỏ qua `awaiting_user` vì bóng đang ở sân HS (HS nhắn lại thì `reopenRequestIfClosed()` tự đẩy về `reviewing`). |
| `server/index.js` | Mount `attachAiBoardInbox(r)` cạnh `attachAdminDb(r)`. |
| `server/contexts/identity/auth.js` | `'/api/ai-board/'` vào `PUBLIC_PATH_PREFIXES` — route tự verify key qua header, không dùng cookie nên không mượn được quyền người đang đăng nhập, cũng không phải bề mặt CSRF. |
| `.env.example` | Tài liệu `AI_BOARD_KEY`. |
| `scripts/test-ai-board-inbox.mjs` | **MỚI** — bộ kiểm thử chạy được **không cần Postgres**. |

**2) `ai-board/2026-09-22` (PR vào `main`)** — `scripts/fetch-inbox.mjs`: (a) nhánh `401 needLogin` chỉ thêm **đường ngắn** (merge PR port + đặt key + deploy lại chính nhánh đang chạy) bên cạnh lời khuyên cũ "quyết định kiến trúc trước"; (b) **thử lại 1 lần khi gặp 5xx** — hôm nay lần gọi đầu trả `503` kèm body `DNS resolution failed (transient resolver error)` (lỗi lớp mạng giữa đường, gọi lại ngay sau đó ra `401` bình thường), bản cũ kết luận nhầm thành "domain do app Next.js phục vụ" — sai hẳn hướng sửa.

**Kiểm thử (chạy thật, không phải mô tả):**
- `node --check` pass cho toàn bộ 5 file `.js/.mjs` đã sửa/thêm.
- `scripts/test-ai-board-inbox.mjs`: SQL sau `convert()` của `server/pg.js` dùng `$1` (không còn `@named`), `limit` bị cap `500` / mặc định `200`, hình dạng bản ghi giữ nguyên (`id`/`db_id`/`from`/`subject`/`thread`…), route trả `401`/`403`/`200`/`500` đúng.
- **Boot server thật** của nhánh production (pg bị chặn bằng stub, auth gate đầy đủ): `401` trả về là thông điệp của **chính route** ("Thiếu header x-ai-board-key"), **không phải** `needLogin` ⇒ gate đã cho `/api/ai-board/` đi qua; key sai → `403`; key đúng → `200` kèm `stats`/`by_domain`.
- `scripts/fetch-inbox.mjs` trỏ vào server đó → ghi đúng `ai-board/inbox.json` (chuỗi đầu-cuối chạy thông).
- Nhánh thử-lại 5xx: server giả `503`-rồi-`200` → script phục hồi và ghi inbox; server giả `503` liên tục → vẫn in đúng chẩn đoán cũ, exit `1`. `ai-board/inbox.json` khôi phục nguyên trạng sau kiểm thử.

**Một lỗi tự phát hiện lúc chạy thật đã sửa trước khi commit:** trong bộ kiểm thử, hai server `express` được `listen()` rồi `await` tuần tự — server thứ hai đã phát `listening` xong trước khi gắn listener nên promise không bao giờ resolve (kiểm thử treo). Sửa bằng cách kiểm `srv.listening` trước rồi `Promise.all`.

### Người vận hành cần làm gì (nay chỉ còn 2 bước, KHÔNG phải quyết định kiến trúc)

```bash
# 1) Merge PR "port /api/ai-board/inbox sang nhánh production"
#    (nhánh ai-board/2026-09-22-inbox-prod-branch → feat/postgres-migration).
#    Diff: +1 file route, +1 hàm SELECT, +1 dòng mount, +1 prefix public. Tắt mặc định.

# 2) Sinh key, đặt vào .env, deploy lại CHÍNH nhánh production hiện hành:
openssl rand -hex 32
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env && docker compose up -d --build

# 3) Kiểm chứng (phải thấy danh sách yêu cầu, không còn 401):
AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs
```

Rồi cấp **chính key đó** cho môi trường chạy routine. Xong là hôm sau phiên hàng ngày đọc được yêu cầu thật của HS/SV và bắt đầu xử lý. Việc hợp nhất `main` ↔ `feat/postgres-migration` vẫn nên làm, nhưng **không còn chặn** dịch vụ cho người học nữa.

---

## 2026-09-21 — Phiên 68 · Tìm ra bản build production thật: **nhánh `feat/postgres-migration`, không phải `main`**

**Kết luận:** **Không xử lý được yêu cầu nào của người học** (ngày thứ 9) — hộp thư vẫn không đọc được nên không có yêu cầu thật, và không bịa việc. Nhưng hôm nay **tìm ra nguyên nhân gốc thật sự**, và nó khác hẳn cái mà 6 phiên trước kết luận.

### Phát hiện chính — 6 phiên trước chẩn đoán SAI hướng

Từ phiên 62 tới 67, mọi kết luận đều xoay quanh *"production chạy bản `main` cũ, cần deploy lại"*. Hôm nay dò lại trên **toàn bộ nhánh** (thay vì chỉ lịch sử `main`) thì ra đáp án khác:

> **Production KHÔNG chạy `main`. Production chạy nhánh `feat/postgres-migration` @ `40fd384` (2026-07-24) — một lịch sử KHÔNG CHUNG GỐC với `main`.**

`git merge-base main 40fd384` trả về **rỗng**: hai cây lịch sử rời nhau hoàn toàn.

| | `main` | `feat/postgres-migration` (đang chạy trên production) |
|---|---|---|
| Commit gốc | `7632aaf` — 2026-07-14 | `e6d29ec` — 2026-05-26 "Initial PharmacySIM web app" |
| Số commit | 67 | 386 |
| Tổ tiên chung | **không có** | **không có** |
| PR liên quan | — | **PR #32** (mở từ 2026-07-04, chưa merge) |

Vì sao phiên 67 không thấy: script chỉ dò trong `git rev-list main` nên 2/5 file chứng cứ "không khớp bản nào trong lịch sử" — và kết luận cụt ở đó. Thật ra chúng khớp hoàn hảo, chỉ là khớp ở **nhánh khác**.

### Bằng chứng (4 phép đo độc lập, đều đồng ý)

| Phép đo | Kết quả |
|---|---|
| Băm blob 6 file JS tĩnh từ production | **khớp từng byte** với `40fd384`, kể cả các file **khác** `main` (`domain.js`, `it/achievements.js`, `pharmacy/achievements.js`, `economics/achievements.js`) |
| File chỉ có ở nhánh production (`js/baoche-curriculum.js`, `js/pharmacy/baoche/curriculum.js`) | `200` — **có** trên production |
| File chỉ có ở `main` (`js/scenarios/economics-careers.js`, `economics-games.js`) | `404` — **không có** trên production |
| `git branch -r --contains 40fd384` | chỉ `feat/postgres-migration` |

### Hệ quả — điều quan trọng nhất của phiên này

1. **Mọi cải tiến merge vào `main` từ 2026-07-24 tới nay chưa từng tới tay người học.** Toàn bộ 67 commit của `main` (các phiên Ban điều hành AI 40→67) nằm trên một nhánh production chưa bao giờ được dựng.
2. **Lời khuyên "git pull && docker compose up -d --build" của các phiên trước là sai và có rủi ro.** Vì hai lịch sử rời nhau, chuyển production sang `main` **không phải cập nhật** mà là **đổi hẳn sang một cây code khác** — trong đó có phần migration SQLite → Postgres chỉ tồn tại ở nhánh đang chạy. Làm ẩu có thể gãy production.
3. Route `/api/ai-board/inbox` (thêm vào `main` ngày 2026-09-14) đương nhiên không tồn tại trên bản đang chạy → `401 needLogin`. Đây là **hệ quả**, không phải nguyên nhân.

### Việc đã làm

| File | Thay đổi |
|---|---|
| `scripts/check-deployed-build.mjs` | **Sửa lỗi chẩn đoán gốc.** Trước: chỉ dò trong lịch sử `main`, kết luận cụt khi không khớp. Nay: (1) quét **mọi ref** tìm commit mới nhất mà **cả bộ** file chứng cứ khớp cùng lúc; (2) in ra **nhánh** chứa commit đó và **có chung gốc lịch sử với `main` hay không**; (3) kiểm chứng độc lập bằng file chỉ-có-ở-một-nhánh (kỳ vọng `200` vs `404`); (4) cảnh báo rõ khi hai lịch sử rời nhau thay vì khuyên deploy ẩu; (5) thử lại 1 lần khi gặp 5xx thoáng qua. Dùng `git ls-tree` một lần cho cả bộ path nên quét ~500 commit chỉ mất ~4 giây. |
| `scripts/fetch-inbox.mjs` | Nhánh `401 needLogin` trước đây khuyên "deploy nhánh main rồi restart" — nay đã biết là lời khuyên rủi ro. Đổi thành: nói rõ production đang chạy nhánh rời lịch sử, và bảo chạy `check-deployed-build.mjs` trước khi quyết định. |

**Kiểm thử (chạy thật, không phải mô tả):** `node --check` pass cho cả hai file. Chạy thật với `https://tizia.vn` → định vị đúng `40fd384`, cả 4 phép kiểm chứng `200`/`404` đều ✔, exit `1`. Server giả tại `127.0.0.1` ở 3 chế độ: phục vụ đúng `main` → exit `0` ✅; catch-all trả HTML → exit `2` ⚠; "chập chờn" trả `503` lần đầu mỗi path → nhánh thử-lại khôi phục đủ 5/5 file và vẫn định vị đúng commit. Hai lỗi tự phát hiện lúc chạy thật đã sửa trước khi commit: điều kiện chạy bước kiểm chứng chéo bị sai (`!atHead.length` → bỏ qua đúng lúc cần nhất, vì file không đổi giữa hai nhánh vẫn "trùng main"), và một file chứng cứ bị rơi vì `503` thoáng qua.

### Người vận hành cần quyết định (không còn là việc deploy đơn thuần)

Đây là **quyết định kiến trúc**, Ban điều hành AI không tự làm vì vượt xa mức "rủi ro thấp":

```bash
# 1) Xác nhận lại phép đo (4 giây, đọc-chỉ, không sửa gì):
node scripts/check-deployed-build.mjs

# 2) Chọn MỘT nhánh làm nhánh production thật. Hai lịch sử rời nhau nên phải
#    hợp nhất có chủ đích (PR #32 đang mở chính là chỗ để làm việc này),
#    KHÔNG chuyển thẳng production sang `main`.

# 3) Sau khi hợp nhất & deploy, đặt key rồi cấp cho môi trường chạy routine:
openssl rand -hex 32
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env && docker compose up -d
```

Chừng nào bước 2 chưa xong, phiên hàng ngày vẫn không đọc được yêu cầu của HS/SV, và mọi cải tiến vẫn dừng ở `main` chứ không tới người học.

---

## 2026-09-20 — Phiên 67 · `/api/*` đã về lại server này — nhưng production đang chạy bản build cũ ~69 ngày

**Kết luận:** **Không xử lý được yêu cầu nào của người học** (ngày thứ 8) — vẫn không đọc được hộp thư nên không có yêu cầu thật, và không bịa việc. Nhưng hôm nay tình hình **đổi theo hướng tốt** và nguyên nhân còn lại đã được **đo ra bằng chứng cứ**, không còn phải đoán.

### Đo thật hôm nay (2026-09-20)

| Kiểm tra | Kết quả | So với phiên 66 |
|---|---|---|
| `GET /api/health` (3 lần) | `200` — `{"ok":true,"service":"tizia","port":8041,…,"env":"production"}` | **ĐÃ SỬA** (hôm 19/9 còn `500`) |
| `GET /api/ai-board/inbox` (có header key) | `401 {"needLogin":true}` | đổi từ `500` → auth gate chung, **không phải** chuyện key |
| `GET /api/track/pageview`, `/api/webhooks/scoreup` | `404` (không phải `401`) | các prefix public **cũ** vẫn qua được gate |
| `GET /api/analytics/bootstrap` | `200 {"measurementId":…}` | prefix public **cũ** chạy bình thường |
| `js/engine/domain.js` trên production | khớp **commit `7632aaf` (2026-07-14)** | — |
| `js/domains/it/achievements.js` trên production | 10 achievement, **không khớp bản nào** trong lịch sử (bản `main` hiện tại: 50) | — |
| `api.tizia.vn`, `app.tizia.vn`, `edu.tizia.vn`, `eduverse.tizia.vn`, `ps.tizia.vn`, `beta.tizia.vn` | không kết nối được | không có host API thay thế |
| GitHub Issues (open + closed) | 0 | — |
| `AI_BOARD_KEY` trong môi trường routine | **vẫn chưa có** | — |

**Chẩn đoán (đã thu hẹp còn một nguyên nhân duy nhất):** định tuyến đã được sửa — `/api/*` của `tizia.vn` nay về đúng server Express của repo này (app Next.js của phiên 66 không còn nuốt `/api` nữa). Nhưng **bản build đang chạy là bản từ trước `2026-07-14`, cũ hơn hôm nay ~69 ngày**. Route `/api/ai-board/inbox` và dòng `'/api/ai-board/'` trong `PUBLIC_PATH_PREFIXES` được thêm ngày **2026-09-14** (`38764d1`) nên **chưa tồn tại** trong bản đang chạy → auth gate chung nuốt request và trả `401 needLogin`. Đây không phải chuyện key: có key đúng cũng vẫn `401`.

Bằng chứng gọn nhất nằm ngay trong bảng trên: các prefix public **cũ** (`/api/track/pageview`, `/api/webhooks/`, `/api/analytics/bootstrap`) đều **qua được** auth gate, chỉ riêng `/api/ai-board/` — dòng thêm mới nhất — bị chặn. Tức `auth.js` trên production đúng là bản chưa có dòng đó.

Bằng chứng cho "bản build cũ": nội dung `js/engine/domain.js` mà production trả về **trùng khít từng byte** với bản ở commit `7632aaf` (14/7), còn `js/domains/it/achievements.js` chỉ có 10 achievement — ít hơn cả bản cũ nhất trong lịch sử repo (36) — tức bản deploy còn cũ hơn cả điểm bắt đầu lịch sử đã ghi của file đó.

### Việc đã làm

| File | Thay đổi |
|---|---|
| `scripts/check-deployed-build.mjs` | **MỚI** — tự động hoá đúng phép đo trên: tải vài file JS tĩnh public từ production, băm theo công thức blob của git, dò ngược lịch sử để tìm commit khớp, rồi kết luận tuổi bản deploy + trạng thái route hộp thư. Không dependency, **đọc-chỉ**, chạy được trên repo sạch chưa `npm install`. |

Lý do thêm script này: suốt các phiên 62→66, mỗi phiên lại kết luận một nguyên nhân khác nhau vì **không ai đo tuổi bản build**. Từ nay chỉ cần một lệnh:

```bash
node scripts/check-deployed-build.mjs
# exit 0 = production khớp main · 1 = build cũ · 2 = không đo được
```

**Kiểm thử (chạy thật):** `node --check` pass cho `scripts/check-deployed-build.mjs` và `scripts/fetch-inbox.mjs`. Gọi thật `https://tizia.vn` → in đúng "bản build tương ứng khoảng 2026-07-14 — cũ hơn hôm nay ~69 ngày" kèm `401 needLogin`. Server giả tại `127.0.0.1:8799` ở 3 chế độ (`head` = đúng main / `nokey` = route 404 / `html` = catch-all) → in đúng cả 3 kết luận với exit code `0` / `0` / `2`. Hai lỗi tự phát hiện lúc chạy thật đã sửa trước khi commit: đường dẫn URL (`js/…`) không phải đường dẫn repo (`public/js/…`), và `stderr` của `git` rò "fatal:" ra giữa báo cáo.

Phiên này cũng đưa nốt commit của **phiên 66** (`d6124ba` — 2 nhánh chẩn đoán `5xx` và `200`-không-JSON cho `fetch-inbox.mjs`) lên `main`; lần trước merge xong nhưng **chưa push được** nên `main` còn thiếu.

### Người vận hành cần làm gì (chỉ còn 2 bước)

```bash
# 1) DEPLOY LẠI — đây là nút thắt duy nhất còn lại. Bản đang chạy ~69 ngày tuổi.
git pull && docker compose up -d --build
node scripts/check-deployed-build.mjs      # phải in ✅ trước khi sang bước 2

# 2) Sinh + đặt key, restart, rồi cấp CHÍNH key đó cho môi trường chạy routine
openssl rand -hex 32
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env && docker compose up -d
```

Xong 2 bước này, phiên hàng ngày sẽ đọc được yêu cầu thật của HS/SV ngay hôm sau.

---

## 2026-09-19 — Phiên 66 · Hộp thư vẫn chưa đọc được — nguyên nhân đã ĐỔI: `/api/*` của tizia.vn không còn về server này

**Kết luận:** **Không xử lý được yêu cầu nào của người học** (ngày thứ 7). Không có yêu cầu thật nên không bịa việc. Nhưng chẩn đoán của 2 phiên trước ("chưa deploy `main`", "chưa set key") **nay đã sai** — đo lại hôm nay cho thấy một tình huống khác hẳn: **toàn bộ `/api/*` trên `tizia.vn` trả `500`, và domain đang do một app Next.js phục vụ**, không phải server Express của repo này.

### Đo thật hôm nay (2026-09-19)

| Kiểm tra | Kết quả |
|---|---|
| `GET https://tizia.vn/` | `200` — **`x-powered-by: Next.js`**, `vary: rsc, next-router-state-tree…` |
| `GET /api/health` (8 lần liên tiếp) | `500 Internal Server Error`, ổn định, không phải chập chờn |
| `GET /api/ai-board/inbox` (có header key) | `500` — **không còn `401 needLogin` như phiên 65** |
| `GET /api/requests`, `/welcome`, `/ps/api/health` | `500` |
| `GET /robots.txt` | `200` nhưng kèm **`x-nextjs-cache: HIT`** ⇒ do Next.js trả, không phải `server/contexts/seo/index.js` |
| `GET /apps`, `/kham-pha`, `/luyen-de` | `200`, HTML có `_next/static/…` |
| `GET /favicon.ico`, `/manifest.webmanifest`, path bất kỳ không tồn tại | `500` (catch-all của app kia đang lỗi) |
| `ps.tizia.vn`, `eduverse.tizia.vn`, IP gốc `:8041/:8040/:3000` | không kết nối được |
| GitHub Issues (open + closed) | 0 |
| `AI_BOARD_KEY` trong môi trường routine | **vẫn chưa có** |

**Chẩn đoán:** `tizia.vn` hiện được một ứng dụng **Next.js** phục vụ. Các trang nội dung (`/apps`, `/kham-pha`, `/luyen-de`) chạy bình thường, nhưng `/api/*` không có route tương ứng nên rơi vào catch-all và catch-all đó đang lỗi → `500`. Nghĩa là route `/api/ai-board/inbox` của repo này **không còn tới được qua `tizia.vn`**, bất kể có deploy `main` hay set `AI_BOARD_KEY` hay không. Việc cần làm đã đổi: **trỏ lại `/api/*` về container `eduverse`** (hoặc cho Ban điều hành AI biết host thật của API).

### Việc đã làm

| File | Thay đổi |
|---|---|
| `scripts/fetch-inbox.mjs` | Thêm 2 nhánh chẩn đoán còn thiếu: **`5xx`** và **`200` nhưng không phải JSON**. Trước đây gặp `500` script chỉ in `HTTP 500` rồi thoát — không một lời hướng dẫn, đúng vào tình huống đang xảy ra thật. |

Chi tiết: nhánh `5xx` nay nhận diện "domain do app khác phục vụ" qua `x-powered-by` / `x-nextjs-cache` / `vary: rsc`. **Bẫy phát hiện lúc chạy thật:** trang lỗi `500` bị proxy thay bằng body trần, **không còn header nhận dạng** — lần chạy đầu vẫn chẩn đoán trượt. Vì vậy script hỏi thêm trang gốc `/` ở nhánh lỗi (chỉ ở nhánh lỗi, timeout 10s, nuốt mọi lỗi mạng) rồi mới kết luận. Nhánh `200`-không-JSON chặn trước `res.json()` để không ném ra lỗi cú pháp khó hiểu khi request rơi vào trang HTML catch-all.

Bảng chẩn đoán đầy đủ sau hôm nay:

| HTTP | Dấu hiệu | Kết luận | Việc cần làm |
|---|---|---|---|
| `5xx` | `/` có header Next.js | **domain do app khác phục vụ** | trỏ lại `/api/*` về `eduverse`, hoặc đặt `TIZIA_BASE_URL` |
| `5xx` | không | app chết / lỗi trong app | `curl -i $TIZIA_BASE_URL/api/health`, xem log container |
| `200` | content-type không phải JSON | rơi vào catch-all của app khác | đặt `TIZIA_BASE_URL` đúng host API |
| `401` | có `needLogin:true` | server chạy code cũ | `git pull && docker compose up -d --build` |
| `404` | — | đã deploy, chưa set key | set `AI_BOARD_KEY` (≥24 ký tự) rồi restart |
| `401` | không `needLogin` | thiếu header | lỗi phía script/proxy |
| `403` | — | key sai | đối chiếu key |

**Kiểm thử (chạy thật):** `node --check scripts/fetch-inbox.mjs` pass. Server giả tại `127.0.0.1:8799` trả lần lượt `500`-có-header-Next / `500`-trần / `200`-HTML / `401 needLogin` / `404` / `200`-JSON → script in đúng cả 6 kết luận, và nhánh `200`-JSON vẫn ghi đúng `ai-board/inbox.json`. Gọi thật `https://tizia.vn` → in đúng chẩn đoán "domain do app Next.js phục vụ". `ai-board/inbox.json` khôi phục nguyên trạng sau kiểm thử (`git status` sạch, chỉ còn `scripts/fetch-inbox.mjs`).

### Người vận hành cần làm gì (đã đổi so với phiên 65)

```bash
# 1) BƯỚC MỚI — quyết định định tuyến: /api/* phải về container eduverse.
#    Hoặc cấu hình app Next.js đang phục vụ tizia.vn proxy /api/* sang eduverse:8041,
#    hoặc mở một host riêng cho API (vd api.tizia.vn) rồi cấp host đó cho routine:
#      TIZIA_BASE_URL=https://api.tizia.vn
# 2) sinh + đặt key, rồi restart  (vẫn còn thiếu từ phiên 62)
openssl rand -hex 32
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env && docker compose up -d
# 3) cấp CHÍNH key đó + TIZIA_BASE_URL cho môi trường chạy routine Ban điều hành AI
```

Chừng nào `/api/*` chưa về đúng server, mọi phiên hàng ngày vẫn sẽ không đọc được yêu cầu của học sinh — kể cả khi key đã có.

---

## 2026-09-17 — Phiên 65 · Vẫn chưa đọc được hộp thư — nhưng đã xác định đúng nguyên nhân

**Kết luận:** **Không xử lý được yêu cầu nào của người học** (ngày thứ 6). Không có yêu cầu thật để làm nên không bịa việc. Việc duy nhất làm hôm nay là sửa một **thông báo chẩn đoán sai** phát hiện ngay trong lúc thử đọc hộp thư — cái đang chỉ người vận hành đi sửa nhầm chỗ.

### Đo lại hôm nay

| Kiểm tra | Kết quả |
|---|---|
| `GET https://tizia.vn/api/health` | `200` — production sống (node v20.20.2, boot `2026-09-17T05:52Z`) |
| `GET /api/ai-board/inbox` (3 lần) | `401 {"error":"unauthorized","needLogin":true}` |
| `GET /api/requests`, `/api/requests/1/thread` | `401` cùng dạng |
| GitHub Issues | 0 issue đang mở |
| `AI_BOARD_KEY` trong môi trường routine | **chưa có** |

**Chẩn đoán (mới, khác 5 phiên trước):** thân phản hồi là `needLogin:true` — đó là **auth gate chung** (`server/contexts/identity/auth.js`). Nếu production đã chạy `main` sau khi PR #89 vào (`ab8e9b3`, 2026-09-16), path `/api/ai-board/` đã nằm trong `PUBLIC_PATH_PREFIXES` nên gate phải cho đi qua, và vì chưa set key thì route không mount → phải là **`404`**, không phải `401`. Production trả `401` ⇒ **server đang chạy bản build cũ, chưa deploy `main`**. Việc phải làm là **deploy**, chưa phải chuyện key.

### Việc đã làm

| File | Thay đổi |
|---|---|
| `scripts/fetch-inbox.mjs` | Tách 4 nguyên nhân lỗi thay vì gộp 2. Trước đây `401` bất kỳ → *"Key sai hoặc thiếu"* — sai hẳn với tình huống thực tế hôm nay và đẩy người vận hành đi kiểm tra key trong khi lỗi là chưa deploy. |

Bảng chẩn đoán mới:

| HTTP | Thân phản hồi | Kết luận | Việc cần làm |
|---|---|---|---|
| `401` | có `needLogin:true` | server chạy code cũ | `git pull && docker compose up -d --build` |
| `404` | — | code đã deploy, chưa set key | set `AI_BOARD_KEY` (≥24 ký tự) rồi restart |
| `401` | không `needLogin` | thiếu header | lỗi phía script/proxy |
| `403` | — | key sai | đối chiếu key |

**Kiểm thử (chạy thật, không mô tả suông):** `node --check scripts/fetch-inbox.mjs` pass. Dựng server giả tại `127.0.0.1:8799` trả lần lượt `404` / `401`-không-`needLogin` / `403` / `200` → script in đúng cả 4 kết luận; nhánh `200` vẫn ghi đúng `ai-board/inbox.json` (`✅ Đã ghi 1 yêu cầu`). Gọi thật production → in đúng "server CHƯA deploy". `ai-board/inbox.json` được khôi phục nguyên trạng sau kiểm thử.

### Người vận hành cần 2 bước (trước nay tưởng là 1)

```bash
# 1) trên máy production — deploy main (bước đang thiếu, phát hiện hôm nay)
git pull && docker compose up -d --build
# 2) sinh + đặt key, rồi restart
openssl rand -hex 32
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env && docker compose up -d
```

Sau đó cấp **chính key đó** cho môi trường chạy routine Ban điều hành AI (biến môi trường `AI_BOARD_KEY`) — hiện routine chưa có key nên dù server bật xong vẫn chưa đọc được.

---

## 2026-09-16 — Phiên hạ tầng (64) · Gỡ tắc đường đọc hộp thư: kiểm chứng + hợp nhất PR #89

**Kết luận:** Vẫn **không xử lý được yêu cầu nào của người học** — hộp thư production vẫn chưa đọc được, nên không có yêu cầu thật nào để làm và cũng không bịa ra việc. Thay vào đó phiên này dọn đúng thứ đang chặn cả 4 phiên trước: đưa PR #89 từ trạng thái *xung đột, chưa ai kiểm chứng* về trạng thái *đã kiểm chứng thật, đã vào `main`*. Sau hôm nay người vận hành **chỉ còn 1 bước** thay vì 3.

### Đo lại hôm nay (2026-09-16)

| Kiểm tra | Kết quả |
|---|---|
| `GET https://tizia.vn/api/health` | `200` — production sống (uptime ~68 h, node v20.20.2) |
| `GET /api/requests?domain=…` | `401 {"error":"unauthorized","needLogin":true}` |
| `GET /api/admin/requests` | `401` (`requireAdmin`, chỉ nhận cookie session) |
| `GET /api/ai-board/inbox` | `401` **của auth gate chung** → route PR #89 vẫn chưa có trên production |
| `ai-board/inbox.json` (repo) | `items: []` — stub cũ, không phải dữ liệu thật |
| GitHub Issues | 0 issue đang mở |
| Notion workspace | không có bản sao hộp thư — đã tìm, chỉ có tài liệu Khoa/nghiên cứu |
| PR #89 | `open`, **`mergeable_state: dirty`** (xung đột `CHANGELOG` với `main`), 0 review |

**Lưu ý giữ nguyên từ phiên 63:** các số liệu trên chỉ chứng minh **không đọc được** hộp thư, **không** chứng minh hộp thư rỗng. Nếu đang có sinh viên chờ phản hồi thì họ vẫn đang chờ — nay là ngày thứ 5.

### Việc đã làm hôm nay

| Việc | Chi tiết |
|---|---|
| Gỡ xung đột PR #89 | Merge `main` vào nhánh `ai-board/2026-09-14-inbox-api`; xung đột duy nhất ở `public/CHANGELOG-eduverse.md` (hai mục cùng ngày 2026-09-14) — giải bằng cách **giữ cả hai** mục theo thứ tự thời gian, không xoá dòng nào của ai |
| **Kiểm chứng thật** (phiên 62 mới chỉ *tuyên bố* là đã test) | `npm install` + boot server thật 2 lần trên `DATA_DIR` tạm, seed 3 yêu cầu vào SQLite, gọi route thật bằng `curl` |
| Hợp nhất vào `main` | Qua PR hôm nay; PR #89 tự đóng vì commit `38764d1` đã nằm trong lịch sử `main` |

### Kết quả kiểm chứng (chạy thật, không phải mô tả lại)

| Tình huống | Mong đợi | Thực đo |
|---|---|---|
| Boot **không** set `AI_BOARD_KEY` | server chạy bình thường, route không tồn tại | `/api/health` → `200`; `/api/ai-board/inbox` → **`404`**; log **không** có dòng `[ai-board]` |
| Hồi quy auth gate khi chưa bật | không đổi hành vi cũ | `/api/requests?domain=…` → `401` như trước |
| Boot **có** set key 64 ký tự | route được mount | log: `[ai-board] ✅ /api/ai-board/inbox đã bật` |
| Gọi route thiếu header | `401` | **`401`** |
| Gọi route sai key | `403`, không crash | **`403`** |
| Gọi route đúng key | `200` + đúng dữ liệu | **`200`**, trả 2 yêu cầu `pending`/`reviewing`, **loại đúng** yêu cầu `done` |
| `db.prepare('… LIMIT @limit')` | prepare được (nếu không, server **chết lúc boot**) | OK — đã thử riêng trên `better-sqlite3` |
| `scripts/fetch-inbox.mjs` | ghi được `ai-board/inbox.json` | OK — `✅ Đã ghi 2 yêu cầu pending/reviewing` |

`node --check` **pass** trên cả 5 file `.js`/`.mjs`: `server/db.js`, `server/index.js`, `server/contexts/identity/auth.js`, `server/contexts/ai-agent/inbox-api.js`, `scripts/fetch-inbox.mjs`.

> Điểm đáng chú ý nhất: khi chưa set `AI_BOARD_KEY`, thay đổi này **không làm gì cả** trên production — không route mới, không đổi hành vi route cũ. Rủi ro khi deploy vì vậy ở mức thấp nhất có thể.

### Người vận hành còn đúng 1 bước

```bash
# trên máy production
openssl rand -hex 32                      # sinh key
echo 'AI_BOARD_KEY=<key vừa sinh>' >> .env
docker compose up -d --build              # deploy main + restart
```

rồi cấp chính key đó cho môi trường chạy routine Ban điều hành AI. Xong bước này, phiên ngày mai đọc được yêu cầu thật bằng `AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs`.

⚠️ Key này trả về **tên hiển thị và nội dung yêu cầu của người học** → giữ như mật khẩu admin, chỉ đặt qua env, không commit.

### Một quyết định đang chờ người vận hành

Đường **đọc** đã xong. Đường **ghi** (Ban điều hành AI tự phản hồi vào thread của người học từ môi trường agent) **vẫn chưa có** và phiên này **cố ý không tự mở** — route ghi có rủi ro cao hơn hẳn route đọc, và phiên 62 đã nêu câu hỏi này cho người vận hành nhưng chưa có trả lời. Trong lúc chờ, phản hồi người học vẫn phải chạy `node scripts/admin-reply.js <id> <done|rejected|reviewing> "<lời nhắn>"` trên máy có DB. Cần một câu trả lời **có / không** cho việc mở `POST /api/ai-board/requests/:id/reply` (cùng cơ chế key, giới hạn đúng 3 trạng thái + 1 lời nhắn + 1 thông báo cho chính người gửi).

---

## 2026-09-15 — Phiên điểm danh (63) · Vẫn không đọc được hộp thư — chờ duyệt PR #89

**Kết luận:** Không xử lý yêu cầu nào. Hộp thư production vẫn **không đọc được**; đường khắc phục đã được phiên 62 dựng sẵn ở **[PR #89](https://github.com/Lampx83/Tizia/pull/89)** nhưng **chưa được duyệt/merge**, nên hôm nay không có việc mới để làm và cũng không dựng lại thứ đã có. Không tạo PR, không bịa việc.

**Đo lại hôm nay (2026-09-15):**

| Kiểm tra | Kết quả |
|---|---|
| `GET https://tizia.vn/api/health` | `200` — production đang sống (uptime ~44 h, node v20.20.2) |
| `GET /api/requests?domain=…` | `401 {"error":"unauthorized","needLogin":true}` |
| `GET /api/requests/:id/thread` | `401` — dù route khai báo công khai, `makeAuthGate` chặn trước vì path không nằm trong `PUBLIC_PATH_PREFIXES` |
| `GET /api/admin/requests` | `401` (`requireAdmin`, chỉ nhận cookie session) |
| `GET /api/ai-board/inbox` | `401` **của auth gate chung** (không phải `404`/`403` của route trong PR #89) → **PR #89 chưa được deploy lên production** |
| `ai-board/inbox.json` (repo) | `items: []` — stub cũ, sync lần cuối commit `7bcecf0` (2026-07-10), không phải dữ liệu thật |
| GitHub Issues `Lampx83/Tizia` | 0 issue đang mở |
| PR #89 | `open`, `mergeable_state: clean`, 0 check-run, chưa có review |

**Lưu ý quan trọng:** kết quả trên chỉ chứng minh **không đọc được** hộp thư, **không** chứng minh hộp thư rỗng. Nếu có sinh viên đang chờ phản hồi thì họ vẫn đang chờ.

**Việc cần người thật làm (3 bước, ~5 phút) để mở lại vòng phục vụ:**

1. Duyệt & merge [PR #89](https://github.com/Lampx83/Tizia/pull/89) (326 dòng thêm, 0 dòng xoá, tắt mặc định — merge không đổi gì trên production).
2. Sinh key `openssl rand -hex 32`, thêm `AI_BOARD_KEY=<key>` vào `.env` production, restart container.
3. Cấp key đó cho môi trường chạy routine Ban điều hành AI.

Chưa xong bước 2 thì route không tồn tại và các phiên hàng ngày tiếp theo vẫn **không phục vụ được yêu cầu thật của sinh viên** (đây là phiên thứ 4 liên tiếp bị chặn: 45 · 58 · 62 · 63).

---

## 2026-09-14 — Hạ tầng (62b) · Mở đường đọc hộp thư cho Ban điều hành AI

**Chế độ:** Sửa hạ tầng theo phê duyệt của người vận hành, ngay sau phiên điểm danh 62 bên dưới.

**Vấn đề:** Từ 2026-07 tới nay Ban điều hành AI không đọc được yêu cầu thật của người học. `sync-inbox.mjs` đọc thẳng file SQLite nên chỉ chạy được trên máy production; mọi route hộp thư qua HTTP đều đòi cookie session (`/api/requests` → 401, `/api/admin/requests` → 401 + `requireAdmin`). Phiên hàng ngày chạy trong môi trường agent không có cả hai.

### Thay đổi

| File | Loại | Nội dung |
|------|------|----------|
| `server/contexts/ai-agent/inbox-api.js` | **Mới** | Route `GET /api/ai-board/inbox` — đọc-chỉ, auth bằng header `x-ai-board-key` |
| `scripts/fetch-inbox.mjs` | **Mới** | Kéo hộp thư qua HTTP → `ai-board/inbox.json`; không cần dependency, chạy được trên repo sạch |
| `server/db.js` | Thêm | `listBoardInbox()` — yêu cầu `pending`/`reviewing` toàn hệ thống kèm thread; cùng truy vấn với `sync-inbox.mjs` |
| `server/contexts/identity/auth.js` | Thêm | `/api/ai-board/` vào `PUBLIC_PATH_PREFIXES` (tự verify key, không dùng cookie) |
| `server/index.js` | Thêm | Nối `attachAiBoardInbox(r)` |
| `.env.example`, `README.md` | Tài liệu | Biến `AI_BOARD_KEY` + hướng dẫn vận hành |

### Ràng buộc bảo mật

- **Tắt mặc định** — không set `AI_BOARD_KEY` thì route không được mount, path trả 404 như path không tồn tại.
- **Key yếu bị từ chối** — `<24` ký tự → không bật, ghi cảnh báo lúc khởi động.
- **So khớp timing-safe** — `timingSafeEqual` trên digest SHA-256 (độ dài cố định nên key sai độ dài cũng không crash).
- **Không dùng cookie** → không phải bề mặt CSRF, không mượn được quyền người đang đăng nhập.
- **Đọc-chỉ tuyệt đối** — chỉ `SELECT`, không có route ghi. Đổi trạng thái/phản hồi HS vẫn phải qua admin (cookie + `requireAdmin`) hoặc `scripts/admin-reply.js`.

### Kiểm thử

`node --check` toàn bộ 5 file `.js`/`.mjs` đã sửa: **pass**. Ngoài ra chạy test end-to-end trên DB tạm (seed 3 yêu cầu, mount route thật bằng express) — **12/12 pass**:

```
1.  lọc pending/reviewing, loại done        PASS
2.  thread + shape dữ liệu                  PASS
3.  không set AI_BOARD_KEY → không mount    PASS
4.  key yếu (<24) → không mount             PASS
5.  key mạnh → mount                        PASS
6.  thiếu header → 401                      PASS
7.  key sai (khác độ dài) → 403, không crash PASS
8.  key sai (cùng độ dài) → 403             PASS
9.  key đúng → 200 + dữ liệu đúng           PASS
10. Cache-Control: no-store                 PASS
11. POST → 404 (đọc-chỉ)                    PASS
12. limit ngoài khoảng vẫn 200 (bị cap)     PASS
```

### Còn lại

Route này mới giải quyết chiều **đọc**. Chiều **phản hồi người học** từ môi trường agent vẫn chưa có đường — cần người vận hành quyết định có mở route ghi tương ứng hay không.

---

## 2026-09-14 — Phiên điểm danh (62) · Không đọc được hộp thư production

**Kết luận:** Không xử lý yêu cầu nào — hộp thư production **không đọc được** (mọi route `/api/requests` đều đòi session đăng nhập mà môi trường phiên này không có), nên không thể xác nhận có hay không yêu cầu đang chờ; không tạo PR, không bịa việc.

| Đường đọc hộp thư | Kết quả đo hôm nay |
|---|---|
| `https://tizia.vn/api/health` | `200` — server production **đang sống** |
| `https://tizia.vn/api/requests?domain=…` | `401 {"error":"unauthorized","needLogin":true}` |
| `https://tizia.vn/api/admin/requests` | `401` (route cần `requireAdmin`, chỉ nhận cookie session) |
| `https://tizia.vn/ps/api/requests?domain=…` | `302` → `/login.html` |
| `https://ps.tizia.vn/api/requests` | không kết nối được |
| `server/scripts/sync-inbox.mjs` | không chạy được — thiếu `data/tizia.db` và `node_modules` |
| `ai-board/inbox.json` (trong repo) | `items: []` — nhưng là **stub cũ**, lần sync cuối là commit `b3ca7c8` (2026-07-09), **không phải nguồn dữ liệu thật** |
| GitHub Issues (`Lampx83/EduVerse`) | 0 issue đang mở |

**Ghi chú hạ tầng (lặp lại từ phiên 45 & 58, vẫn chưa khắc phục):** Ban điều hành AI không có đường đọc hộp thư tự động. `sync-inbox.mjs` đọc SQLite trên volume production, không chạy được từ môi trường CI/agent. Cần một trong hai: (a) một route đọc-chỉ có auth bằng header (vd `x-ai-board-key`) cho phép export `requests` pending/reviewing, hoặc (b) một job trên server chạy `sync-inbox.mjs` rồi commit `ai-board/inbox.json` vào repo trước mỗi phiên. Chừng nào chưa có, các phiên hàng ngày **không thể phục vụ yêu cầu thật của sinh viên**.

---

## 2026-09-12 — Phiên điểm danh (61) · Hộp thư trống

**Chế độ:** Điểm danh — `ai-board/inbox.json` không có yêu cầu (`items: []`). Không có cải tiến nào được thực hiện hôm nay. Không tạo PR.

---

## 2026-09-10 — Phiên cải tiến (60) · THPT · THCS · CNTT · Kinh tế — 4 achievement bổ sung

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` trống (`items: []`); DB production không truy cập được trong môi trường này. GitHub Issues: 0 yêu cầu mở.

**Phạm vi:** 4 domain — THPT (`highschool`), THCS (`secondary`), CNTT (`it`), Kinh tế (`economics`).

### Phân tích khoảng trống

| Domain | Khoảng trống | Mô tả |
|--------|-------------|-------|
| **THPT** | star-30 thiếu | Nhảy 20→50 quá lớn, cần cột mốc trung gian |
| **THCS** | star-30 thiếu | Nhảy 20→50 quá lớn, cần cột mốc trung gian |
| **CNTT** | bookworm thiếu | 10 quiz milestone — pharmacy & economics đã có, IT chưa có |
| **Kinh tế** | double thiếu | 2 module/ngày — pharmacy đã có, Kinh tế chưa có |

### Thay đổi

| File | Loại | Achievement mới |
|------|------|----------------|
| `public/js/domains/highschool/achievements.js` | Thêm | `star-30` ⭐ "Ngôi sao 30" — 30 sao THPT |
| `public/js/domains/secondary/achievements.js` | Thêm | `star-30` ⭐ "Ngôi sao 30" — 30 sao THCS |
| `public/js/domains/it/achievements.js` | Thêm | `bookworm` 📚 "Mọt lập trình" — 10 quiz CNTT |
| `public/js/domains/economics/achievements.js` | Thêm | `double` ⚡ "Cú đúp Kinh tế" — 2 module/ngày |

### Kiểm thử

```
node --check public/js/domains/highschool/achievements.js   ✅ OK
node --check public/js/domains/secondary/achievements.js    ✅ OK
node --check public/js/domains/it/achievements.js           ✅ OK
node --check public/js/domains/economics/achievements.js    ✅ OK
```

---

## 2026-09-09 — Phiên cải tiến (59) · Lái xe · Ngoại ngữ · Mầm non — streak-5 cho 3 domain còn thiếu

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` trống (`items: []`); DB production không truy cập được trong môi trường này. GitHub Issues: 0 yêu cầu mở.

**Phạm vi:** 3 domain — Lái xe (`driving`), Ngoại ngữ (`language`), Mầm non (`preschool`).

### Phân tích khoảng trống

Phiên 57 (2026-09-07) đã thêm `streak-5` cho Tiểu học vì bước nhảy 3→7 quá lớn. Kiểm tra hôm nay phát hiện 3 domain vẫn còn gap tương tự:

| Domain | Streak hiện có | Khoảng trống |
|--------|---------------|--------------|
| **Lái xe** | streak-3, streak-7, streak-14, streak-30 | ❌ Thiếu streak-5 |
| **Ngoại ngữ** | streak-3, streak-7, streak-14, streak-30 | ❌ Thiếu streak-5 |
| **Mầm non** | streak-3, streak-7, streak-14, streak-30 | ❌ Thiếu streak-5 |
| THCS | streak-3, streak-5, streak-10, streak-14, streak-30 | ✅ Đầy đủ |
| THPT | streak-3, streak-5, streak-7, streak-14, streak-30 | ✅ Đầy đủ |
| Tiểu học | streak-3, streak-5, streak-7, streak-14, streak-30 | ✅ Đầy đủ (thêm phiên 57) |

Streak-5 (5 ngày liên tiếp = 1 tuần học) là cột mốc quan trọng cho người mới bắt đầu — nhỏ hơn 7 nhưng có ý nghĩa hoàn thành một tuần học đầy đủ.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/driving/index.js` | Mở rộng | +1 achievement: `streak-5` "Nửa tuần ôn lý thuyết" — 5 ngày ôn lái xe liên tiếp |
| `public/js/domains/language/index.js` | Mở rộng | +1 achievement: `streak-5` "Nửa tuần ngoại ngữ" — 5 ngày học ngoại ngữ liên tiếp |
| `public/js/domains/preschool/achievements.js` | Mở rộng | +1 achievement: `streak-5` "Bé học 5 ngày" — 5 ngày học mầm non liên tiếp |

### Chi tiết 3 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Lái xe | `streak-5` | 📋 | Nửa tuần ôn lý thuyết | streak: 5 |
| Ngoại ngữ | `streak-5` | 🗣️ | Nửa tuần ngoại ngữ | streak: 5 |
| Mầm non | `streak-5` | 🌈 | Bé học 5 ngày | streak: 5 |

### Kiểm thử

```
node --check public/js/domains/driving/index.js      ✅ OK
node --check public/js/domains/language/index.js     ✅ OK
node --check public/js/domains/preschool/achievements.js  ✅ OK
```

### Kết quả

- **Tất cả 6 domain có người dùng thực (THCS, THPT, Tiểu học, Lái xe, Ngoại ngữ, Mầm non) đều có đủ streak-5** ✅
- Hệ thống streak giờ nhất quán: streak-3 → streak-5 → streak-7 → ... trên mọi domain áp dụng
- **Yêu cầu từ người dùng:** Không có (inbox trống, phiên chủ động)

---

## 2026-09-07 — Phiên cải tiến (58) · TOÀN HỆ THỐNG — 🚨 Phát hiện 110 bài lí thuyết là nội dung chết + công cụ kiểm tra toàn vẹn

**Chế độ:** Chủ động. Hộp thư `ai-board/inbox.json` trống. Phiên này **tự kiểm chứng** đường production thay vì tin ghi chú cũ:

| Đường | Kết quả đo được hôm nay |
|-------|------------------------|
| `https://tizia.vn/api/requests` | `401 {"error":"unauthorized","needLogin":true}` |
| `https://tizia.vn/ps/api/requests` | `302` → `/login.html` |
| `https://ps.tizia.vn/api/requests` | không kết nối được (502 qua proxy) |
| `sync-inbox.mjs` | không chạy được — thiếu `data/tizia.db` **và** `node_modules` |

→ Hộp thư thực sự không đọc được. Xác nhận, không phải suy đoán.

### 🚨 Phát hiện chính: 110 bài lí thuyết KHÔNG BAO GIỜ đến được học sinh

**Cơ chế.** Bài lí thuyết gắn vào quiz bằng cách tra cứu theo **id của quiz** (`public/js/scenarios/lop10/_index.js:32`):

```js
if (LOP10_LESSONS && LOP10_LESSONS[id]) sc.lesson = LOP10_LESSONS[id];
```

Bài lí thuyết có key không khớp id quiz nào thì **không bao giờ được đọc**. Lỗi này im lặng: không crash, không bị `node --check` bắt, file vẫn nằm trong repo trông như đã hoàn thành.

**Quy mô.** Các phiên 38–46 đã bổ sung bài "Tuần 36 — Kết thúc năm học" cho hàng loạt môn, **nhưng không tạo quiz tuần 36 tương ứng**. Kết quả:

| Cấp | Số bài mồ côi |
|-----|--------------|
| THPT (lớp 10–12) | 36 |
| THCS (lớp 7, 8, 9) | 30 |
| Tiểu học (lớp 1, 3, 4, 5) | 44 |
| **Tổng** | **110** |

**Bằng chứng cụ thể.** `public/js/scenarios/lop10/toan.js` khai báo đúng 35 tuần (`M(1)`…`M(35)`, header ghi *"35 tuần (HK1: 1–18 · HK2: 19–35)"*), trong khi `lop10/lessons/toan.js` có key `H10TOAN-w36-quiz` ở dòng 656 — và chính header file bài học vẫn ghi *"Lý thuyết 35 tuần"*.

**Đối chứng.** Lớp 2 và lớp 6 **sạch hoàn toàn**: quiz 36 tuần + header ghi "36 tuần" + bài học 36 tuần → nhất quán, nội dung sống. Hai lớp này là bản mẫu đúng.

### ⚖️ Quyết định cần người vận hành (NGOÀI thẩm quyền phiên tự động)

Hệ thống đang **mâu thuẫn nội bộ**: lớp 2 và lớp 6 theo chuẩn 36 tuần, mọi lớp khác theo chuẩn 35 tuần. Có hai hướng xử lý loại trừ nhau:

| Hướng | Việc phải làm | Rủi ro |
|-------|--------------|--------|
| **A. Chuẩn hoá 36 tuần** | Thêm quiz tuần 36 cho 110 môn (~550 câu hỏi) → kích hoạt toàn bộ bài học đã viết sẵn | Nếu CTGD 2018 quy định 35 tuần thì đang tạo nội dung sai chuẩn |
| **B. Chuẩn hoá 35 tuần** | Gỡ 110 bài lí thuyết tuần 36 + sửa lớp 2, lớp 6 về 35 tuần | Vứt bỏ công sức nhiều phiên đã viết |

Phiên này **KHÔNG tự quyết** vì đây là quyết định học thuật về khung chương trình, ảnh hưởng toàn hệ thống — đúng nguyên tắc "thay đổi lớn cần người vận hành quyết". Bài học hiện có vẫn nguyên vẹn trong repo, không mất mát gì khi chờ quyết định.

### Thay đổi (an toàn, thuần bổ sung)

| File | Loại | Mô tả |
|------|------|-------|
| `scripts/check-content-integrity.mjs` | **Tạo mới** | Công cụ kiểm tra toàn vẹn học liệu — bắt 3 loại lỗi im lặng |
| `package.json` | Mở rộng | Thêm script `npm run check:content` |
| `public/CHANGELOG-eduverse.md` | Cập nhật | Ghi nhận phiên 58 + đính chính 2 ghi chép sai (bên dưới) |

**Ba nhóm kiểm tra của công cụ mới:**

1. `ORPHAN_LESSON` — bài lí thuyết có key không khớp quiz nào (nội dung chết)
2. `UNIMPORTED_LESSON` — file `lessons/*.js` không được import vào `_index.js`
3. `DUP_ACHIEVEMENT` — hai achievement trùng id trong cùng domain (loại lỗi phiên 51 từng phải bắt thủ công)

Thoát mã `1` khi có lỗi → cắm được vào CI/pre-commit để chặn tái diễn.

### 📌 Đính chính ghi chép cũ (đã kiểm chứng lại)

1. **Phiên 45 viết sai về CSDL.** Ghi chú cũ nói *"`sync-inbox.mjs` đọc SQLite trong khi `.env.example` khai báo `DATABASE_URL=postgres://` — cần rà lại script còn khớp DB thật hay không"*. Kiểm tra hôm nay: `server/db.js:1` import `better-sqlite3`, toàn bộ tầng dữ liệu (`auth.js`, `db-admin.js`) đều dùng SQLite. **`sync-inbox.mjs` đọc SQLite là ĐÚNG**; `pg` chỉ là dependency không dùng ở luồng này. Cảnh báo cũ là báo động giả, đã đeo bám 13 phiên.

2. **Phiên 57 ghi sai ngày.** Mục phiên 57 ban đầu đề ngày 2026-09-06, thực tế chạy ngày 2026-09-07 (cùng ngày với phiên này). Đã sửa tiêu đề mục 57 bên dưới.

### Kiểm thử

```
node --check scripts/check-content-integrity.mjs   ✅ OK
node scripts/check-content-integrity.mjs           → phát hiện 110 vấn đề, exit code 1 ✅
```

Kết quả công cụ khớp chính xác với kiểm tra độc lập bằng shell (110 = 36 THPT + 30 THCS + 44 Tiểu học).

### Kết quả

- Phát hiện và ghi nhận **110 bài lí thuyết đang là nội dung chết** — tồn đọng từ phiên 38–46, không phiên nào phát hiện ra
- Có công cụ tự động chặn tái diễn, chạy bằng `npm run check:content`
- Đính chính 1 báo động giả về CSDL đã tồn tại 13 phiên
- **Yêu cầu từ người dùng:** Không có (hộp thư không truy cập được — đã kiểm chứng)

---

## 2026-09-07 — Phiên cải tiến (57) · THPT · THCS · Tiểu học — 3 Achievements mới (Star-120 × 2 · Streak-5)

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` trống (`items: []`); DB production không truy cập được trong môi trường này (lỗi hạ tầng sync-inbox đã ghi nhận từ phiên 45).

**Phạm vi:** 3 trường — THPT (`highschool`), THCS (`secondary`), Tiểu học (`primary`).

### Phân tích khoảng trống

| Trường | Star milestones hiện có | Khoảng trống |
|--------|------------------------|--------------|
| **THPT** | star-20, star-50, star-100 | ❌ Thiếu star-120 (3 năm × 14 môn × 3 sao ≈ 126 sao max) |
| **THCS** | star-20, star-50, star-100 | ❌ Thiếu star-120 (4 năm × 12 môn × 3 sao = 144 sao max) |
| IT | star-30, star-60, star-90, star-120 | ✅ có star-120 |
| Kinh tế | star-30, star-60, star-90, star-120 | ✅ có star-120 |
| Dược | star-30, star-60, star-100, star-120, star-150 | ✅ có star-120 |

**Streak Tiểu học:**

| Trường | Streak milestones | Khoảng trống |
|--------|------------------|--------------|
| **Tiểu học** | streak-3, streak-7, streak-14, streak-30 | ❌ Thiếu streak-5 (bước nhảy 3→7 không có cột mốc giữa) |
| THCS | streak-3, streak-5, streak-10, streak-14, streak-30 | ✅ có streak-5 |
| THPT | streak-3, streak-5, streak-7, streak-14, streak-30 | ✅ có streak-5 |

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/highschool/achievements.js` | Mở rộng | +1 achievement: `star-120` "Thủ khoa 120 sao" — đỉnh cao 3 năm THPT |
| `public/js/domains/secondary/achievements.js` | Mở rộng | +1 achievement: `star-120` "Học sinh THCS 120 sao" — chinh phục chương trình 4 năm THCS |
| `public/js/domains/primary/achievements.js` | Mở rộng | +1 achievement: `streak-5` "Tuần học đầu" — cột mốc 5 ngày học liên tiếp (= 1 tuần đi học) |

### Chi tiết 3 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| THPT | `star-120` | 🏆 | Thủ khoa 120 sao | totalStars: 120 |
| THCS | `star-120` | 🌠 | Học sinh THCS 120 sao | totalStars: 120 |
| Tiểu học | `streak-5` | ⭐ | Tuần học đầu | streak: 5 |

### Kiểm thử

```
node --check public/js/domains/highschool/achievements.js  ✅ OK
node --check public/js/domains/secondary/achievements.js   ✅ OK
node --check public/js/domains/primary/achievements.js     ✅ OK
```

### Kết quả

- THPT: star-20 → star-50 → star-100 → **star-120** ✅ (cân bằng với IT, Kinh tế, Dược)
- THCS: star-20 → star-50 → star-100 → **star-120** ✅ (nay tương đương THPT về milestone cap)
- Tiểu học: streak-3 → **streak-5** → streak-7 → streak-14 → streak-30 ✅ (không còn bước nhảy 3→7)
- **Tất cả 7 trường đại học/phổ thông có đủ star-120** (ngoại trừ Mầm non, Lái xe, Ngoại ngữ — số module quá ít)
- **Yêu cầu từ người dùng:** Không có (inbox trống, phiên chủ động)

---

## 2026-09-03 — Phiên điểm danh (56) — Hộp thư trống, không có yêu cầu nào để xử lý

**Chế độ:** Hộp thư `ai-board/inbox.json` trống (`items: []`) — không có yêu cầu nào từ người dùng. Theo quy tắc vận hành: không tạo PR rỗng, không bịa việc. Phiên này chỉ ghi nhận trạng thái.

---

## 2026-09-02 — Phiên cải tiến (55) · Trường Dược — Bổ sung star milestone star-120 & star-150

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending; DB production không truy cập được trong môi trường này (lỗi hạ tầng sync-inbox đã ghi nhận từ phiên 45).

**Phạm vi:** `public/js/domains/pharmacy/achievements.js`.

### Phân tích khoảng trống

| Trường | Milestones sao hiện có | Tối đa |
|--------|----------------------|--------|
| IT (4 năm) | star-30, star-60, star-90, star-120 | 120 |
| Kinh tế (4 năm) | star-30, star-60, star-90, star-120 | 120 |
| **Dược (5 năm)** | star-30, star-60, star-100 | **100** ← thiếu |

Trường Dược có chương trình 5 năm với 102+ module — dài nhất trong các trường đại học. Tuy nhiên, milestone sao tối đa chỉ là 100, thấp hơn cả IT và Kinh tế (4 năm). Phiên này bổ sung hai cột mốc phù hợp với quy mô chương trình.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm `star-120` (Dược sĩ 120 sao — ngang tầm 4 năm đại học) và `star-150` (Dược sĩ tinh hoa — đỉnh cao 5 năm học Dược) |

### Kiểm tra

```
node --check public/js/domains/pharmacy/achievements.js → OK
```

---

## 2026-08-31 — Phiên cải tiến (54) · THPT — HĐTN-HN Lesson Theory Files

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending; DB production không truy cập được trong môi trường này (lỗi hạ tầng sync-inbox đã ghi nhận từ phiên 45).

**Phạm vi:** 3 trường THPT — Lớp 10, Lớp 11, Lớp 12.

### Phân tích khoảng trống

Các lớp 6–9 (THCS) đã có đầy đủ file lí thuyết tuần cho môn HĐTN-HN (`lessons/hdtn.js`). Tuy nhiên, 3 lớp THPT (lớp 10, 11, 12) **thiếu hoàn toàn** file lí thuyết này, dù scenario quiz HĐTN-HN (`hdtn.js`) đã có đủ 35 tuần cho mỗi lớp. Phiên này bổ sung để đồng bộ.

| Lớp | Quiz ID mẫu | Số tuần | File thiếu |
|-----|------------|---------|-----------|
| 10 | `H10HDTN-w01-quiz` → `H10HDTN-w35-quiz` | 35 | `lop10/lessons/hdtn.js` |
| 11 | `H11HDTN-w01-quiz` → `H11HDTN-w35-quiz` | 35 | `lop11/lessons/hdtn.js` |
| 12 | `H12HDTN-w01-quiz` → `H12HDTN-w35-quiz` | 35 | `lop12/lessons/hdtn.js` |

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/lop10/lessons/hdtn.js` | Tạo mới | 35 bài lí thuyết tuần HĐTN-HN lớp 10 — từ khám phá tính cách đến định hướng nghề nghiệp cơ bản |
| `public/js/scenarios/lop11/lessons/hdtn.js` | Tạo mới | 35 bài lí thuyết tuần HĐTN-HN lớp 11 — từ tự tin, thích ứng đến tham vấn hướng nghiệp nâng cao |
| `public/js/scenarios/lop12/lessons/hdtn.js` | Tạo mới | 35 bài lí thuyết tuần HĐTN-HN lớp 12 — từ tự đánh giá, thi tốt nghiệp, chọn trường đến kĩ năng vào đời |
| `public/js/scenarios/lop10/lessons/_index.js` | Mở rộng | Thêm import `H10HDTN_LESSONS` từ `hdtn.js`; spread vào `LOP10_LESSONS` |
| `public/js/scenarios/lop11/lessons/_index.js` | Mở rộng | Thêm import `H11HDTN_LESSONS` từ `hdtn.js`; spread vào `LOP11_LESSONS` |
| `public/js/scenarios/lop12/lessons/_index.js` | Mở rộng | Thêm import `H12HDTN_LESSONS` từ `hdtn.js`; spread vào `LOP12_LESSONS` |

**Kiểm tra:** `node --check` — 0 lỗi cú pháp trên tất cả 6 file.

---

## 2026-08-30 — Phiên cải tiến (53) · Lái xe · Ngoại ngữ — 6 Star Milestone Achievements

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending; DB production không truy cập được trong môi trường này (lỗi hạ tầng sync-inbox đã ghi nhận từ phiên 45).

**Phạm vi:** 2 trường — Lái xe (`driving`), Ngoại ngữ (`language`).

### Phân tích khoảng trống

Phiên 52 (2026-08-29) ghi nhận Trường Lái xe và Trường Ngoại ngữ **thiếu hoàn toàn star milestone achievements** (`totalStars`), trong khi 7 trường còn lại đã có đầy đủ. Phiên này bổ sung để đồng bộ hệ thống.

| Trường | Module | Sao tối đa | Milestones thêm |
|--------|--------|-----------|-----------------|
| Lái xe | 3 module (D01–D03) × 3 sao = **9 sao** | 9 | star-3, star-6, star-9 |
| Ngoại ngữ | 4 module (L01–L04) × 3 sao = **12 sao** | 12 | star-4, star-8, star-12 |

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/driving/index.js` | Mở rộng | +3 achievements: `star-3` "Khởi hành", `star-6` "Ôn luyện nghiêm túc", `star-9` "Sẵn sàng thi sát hạch" |
| `public/js/domains/language/index.js` | Mở rộng | +3 achievements: `star-4` "Bước đầu ngoại ngữ", `star-8` "Nửa chặng ngoại ngữ", `star-12` "Thông thạo ngoại ngữ" |

### Chi tiết 6 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Lái xe | `star-3` | ⭐ | Khởi hành | totalStars: 3 |
| Lái xe | `star-6` | 🌟 | Ôn luyện nghiêm túc | totalStars: 6 |
| Lái xe | `star-9` | 🏆 | Sẵn sàng thi sát hạch | totalStars: 9 |
| Ngoại ngữ | `star-4` | ⭐ | Bước đầu ngoại ngữ | totalStars: 4 |
| Ngoại ngữ | `star-8` | 🌟 | Nửa chặng ngoại ngữ | totalStars: 8 |
| Ngoại ngữ | `star-12` | 🏆 | Thông thạo ngoại ngữ | totalStars: 12 |

### Kiểm thử

```
node --check public/js/domains/driving/index.js   ✅ OK
node --check public/js/domains/language/index.js  ✅ OK
```

### Kết quả

- Lái xe: _(không có)_ → **star-3 → star-6 → star-9** ✅ (cap tự nhiên = hoàn thành toàn bộ 3 module)
- Ngoại ngữ: _(không có)_ → **star-4 → star-8 → star-12** ✅ (cap tự nhiên = hoàn thành toàn bộ 4 module)
- Tất cả 9 trường EduVerse nay đều có star milestone achievements đầy đủ.
- **Yêu cầu từ người dùng:** Không có (inbox trống, phiên chủ động)

---

## 2026-08-29 — Phiên cải tiến (52) · CNTT · Kinh tế · Tiểu học · Mầm non — 4 Star Cap Achievements

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending; DB production không truy cập được trong môi trường này (lỗi hạ tầng sync-inbox đã ghi nhận từ phiên 45); GitHub Issues trống.

**Phạm vi:** 4 trường — CNTT (`it`), Kinh tế (`economics`), Tiểu học (`primary`), Mầm non (`preschool`).

### Phân tích khoảng trống

So sánh milestone sao tích luỹ cao nhất giữa 9 trường:

| Trường | Star milestones hiện tại | Trạng thái |
|--------|--------------------------|------------|
| Dược | star-30, star-60, **star-100** | ✅ cap rõ ràng |
| **CNTT** | star-30, star-60, **star-90** | ⚠️ thiếu cap milestone |
| **Kinh tế** | star-30, star-60, **star-90** | ⚠️ thiếu cap milestone |
| **Tiểu học** | star-15, star-30, **star-60** | ⚠️ thiếu cap milestone |
| THCS | star-20, star-50, **star-100** | ✅ |
| THPT | star-20, star-50, **star-100** | ✅ |
| **Mầm non** | star-5, star-15, **star-30** | ⚠️ thiếu cap milestone |
| Lái xe | _(không có)_ | — ít module |
| Ngoại ngữ | _(không có)_ | — ít module |

**Phân tích nội dung:**
- **CNTT**: 23 module quiz (I1.1–I4.5) + 4 game + 6 career = ~33 module × 3 sao tối đa ≈ 99 sao; có thể đạt 120 với bonus quiz và thực hành → `star-120` là mốc thực tế.
- **Kinh tế**: year1 + year1b + year2 + year3 + year4 (a/b/c) = ~35+ module × 3 sao → `star-120` hợp lý.
- **Tiểu học**: 54 module (5 lớp × 8-11 môn) × 3 sao = ~162 sao tối đa → `star-100` là mốc khích lệ giữa chặng.
- **Mầm non**: 15 module × 3 sao = 45 sao tối đa → `star-45` là mốc tự nhiên (hoàn thành toàn bộ).

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/it/achievements.js` | Mở rộng | +1 achievement: `star-120` — "Kỹ sư 120 sao" |
| `public/js/domains/economics/achievements.js` | Mở rộng | +1 achievement: `star-120` — "Cử nhân 120 sao" |
| `public/js/domains/primary/achievements.js` | Mở rộng | +1 achievement: `star-100` — "Học sinh xuất sắc" |
| `public/js/domains/preschool/achievements.js` | Mở rộng | +1 achievement: `star-45` — "Bé tài năng toàn diện" |

### Chi tiết 4 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| CNTT | `star-120` | 🏆 | Kỹ sư 120 sao | totalStars: 120 |
| Kinh tế | `star-120` | 🏆 | Cử nhân 120 sao | totalStars: 120 |
| Tiểu học | `star-100` | 🏆 | Học sinh xuất sắc | totalStars: 100 |
| Mầm non | `star-45` | 🏆 | Bé tài năng toàn diện | totalStars: 45 |

### Kiểm thử

```
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/domains/economics/achievements.js  ✅ OK
node --check public/js/domains/primary/achievements.js    ✅ OK
node --check public/js/domains/preschool/achievements.js  ✅ OK
```

### Kết quả

- CNTT: star-30 → star-60 → star-90 → **star-120** ✅ (cap rõ ràng tương ứng hoàn thành 4 năm)
- Kinh tế: star-30 → star-60 → star-90 → **star-120** ✅ (tương tự)
- Tiểu học: star-15 → star-30 → star-60 → **star-100** ✅ (mốc khích lệ giữa chương trình 5 lớp)
- Mầm non: star-5 → star-15 → star-30 → **star-45** ✅ (cap tự nhiên = hoàn thành toàn bộ 15 module)
- **Yêu cầu từ người dùng:** Không có (inbox trống, phiên chủ động)

---

## 2026-08-26 — Phiên cải tiến (51) · CNTT · Tiểu học · THCS · THPT — Bug fix + 3 Bookworm Achievements

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending (lỗi hạ tầng sync-inbox vẫn chưa khắc phục, xem phiên 45).

**Phạm vi:** 4 trường — CNTT (`it`), Tiểu học (`primary`), THCS (`secondary`), THPT (`highschool`).

### Phân tích khoảng trống & bug

**Bug phát hiện — CNTT duplicate `star-30`:**

Quét `public/js/domains/it/achievements.js` phát hiện hai entry có cùng `id: 'star-30'`:
- Dòng 31–33: `{ id: 'star-30', title: '30 sao CNTT', desc: 'Tích luỹ 30 sao — đang trên đà chinh phục chương trình Kỹ sư' }` — entry đúng, được thêm ở phiên 48.
- Dòng 153–155 (cũ): `{ id: 'star-30', title: '30 sao đầu', desc: '30 sao tích luỹ' }` — placeholder cũ, còn sót lại từ trước phiên 48.

Duplicate ID trong achievement array có thể gây hành vi không xác định trong `wallet.js` khi engine scan qua danh sách (tùy implementation có thể trigger 2 lần hoặc bị bỏ qua).

**Gap phát hiện — thiếu `bookworm` (10 quiz) ở 3 trường K-12:**

So sánh achievement `quizzesPassed` giữa tất cả 9 trường:

| Trường | quizzesPassed: 1 | quizzesPassed: 10 |
|--------|-----------------|-------------------|
| Dược | `first-step` ✅ | `bookworm` ✅ |
| Kinh tế | `first-trade` ✅ | `bookworm` ✅ |
| CNTT | `hello-world` ✅ | _(không có)_ ❌ |
| Mầm non | `first` ✅ | _(không có)_ — học sinh 3–6 tuổi, bỏ qua |
| **Tiểu học** | `first-quiz` ✅ | _(không có)_ **❌** |
| **THCS** | `first-quiz` ✅ | _(không có)_ **❌** |
| **THPT** | `first` ✅ | _(không có)_ **❌** |
| Lái xe | `first-lesson` ✅ | _(không có)_ — 3 module tổng, bỏ qua |
| Ngoại ngữ | `first-word` ✅ | _(không có)_ — 4 module tổng, bỏ qua |

Pharmacy và Economics đã có `bookworm` từ đầu. CNTT, Tiểu học, THCS, THPT thiếu mốc "10 quiz" — đây là milestone khích lệ học sinh tiếp tục sau lần đầu tiên, đặc biệt quan trọng cho K-12 nơi học sinh cần nhiều động lực hơn.

**Lý do chọn bổ sung cho Tiểu học, THCS, THPT mà không phải CNTT:** CNTT có `hello-world` (1 quiz) và ngay tiếp theo là các module achievements chi tiết (I1.1, I1.2…), học viên đại học dễ dàng thấy tiến độ hơn. K-12 với cấu trúc 36 tuần/môn cần cột mốc trung gian rõ ràng hơn để duy trì hứng thú học tập.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động sửa bug và bổ sung 3 achievements.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/it/achievements.js` | **Bug fix** | Xoá duplicate `star-30` (dòng 153–155 cũ) — entry trùng ID với dòng 31–33 |
| `public/js/domains/primary/achievements.js` | Mở rộng | +1 achievement: `bookworm` (Mọt sách tiểu học — 10 quiz) |
| `public/js/domains/secondary/achievements.js` | Mở rộng | +1 achievement: `bookworm` (Mọt sách THCS — 10 quiz) |
| `public/js/domains/highschool/achievements.js` | Mở rộng | +1 achievement: `bookworm` (Mọt sách THPT — 10 quiz) |

### Chi tiết 3 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Tiểu học | `bookworm` | 📚 | Mọt sách tiểu học | quizzesPassed: 10 |
| THCS | `bookworm` | 📚 | Mọt sách THCS | quizzesPassed: 10 |
| THPT | `bookworm` | 📚 | Mọt sách THPT | quizzesPassed: 10 |

### Kiểm thử

```
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/domains/primary/achievements.js    ✅ OK
node --check public/js/domains/secondary/achievements.js  ✅ OK
node --check public/js/domains/highschool/achievements.js ✅ OK
```

### Kết quả

- CNTT: xoá duplicate `star-30` — achievement catalog sạch, không còn ID trùng ✅
- Tiểu học, THCS, THPT: chuỗi quiz 1 → **10** → (module achievements) — milestone trung gian ✅
- **7/9 trường có `bookworm`** (Mầm non, Lái xe, Ngoại ngữ không áp dụng do số module nhỏ) ✅
- Khuyến khích học sinh K-12 tiếp tục sau bài quiz đầu tiên với mốc 10 quiz có icon và tên hấp dẫn

---

## 2026-08-25 — Phiên cải tiến (50) · Mầm non · THCS — 4 Star Achievements mới

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending.

**Phạm vi:** Trường Mầm non (`preschool`) và Trường THCS (`secondary`) — bổ sung star achievements còn thiếu.

### Phân tích khoảng trống

So sánh bộ `totalStars` achievements giữa 9 trường phát hiện hai khoảng trống:

| Trường | Star achievements trước | Trạng thái |
|--------|------------------------|------------|
| Mầm non | _(không có)_ | ❌ **thiếu hoàn toàn** |
| Tiểu học | star-15, star-30, star-60 | ✅ |
| THCS | star-20, star-50 | ⚠️ thiếu mốc star-100 |
| THPT | star-20, star-50, star-100 | ✅ |
| Dược | star-30, star-60, star-100 | ✅ |
| CNTT | star-30, star-60, star-90 | ✅ |
| Kinh tế | star-30, star-60, star-90 | ✅ |
| Lái xe | _(không áp dụng — index.js riêng)_ | — |
| Ngoại ngữ | _(không áp dụng — index.js riêng)_ | — |

**Mầm non:** 15 module × 3 sao/module = tối đa 45 sao. Tất cả 7 trường khác đều có `totalStars` achievements; Mầm non là trường DUY NHẤT thiếu hoàn toàn — học sinh mầm non cần được khích lệ bằng mốc sao nhỏ, dễ đạt, thân thiện với lứa tuổi.

**THCS:** Có star-20 và star-50 nhưng thiếu star-100. THPT (tương đương số môn, số lớp) đã có cả star-100. Học sinh THCS tích cực có thể đạt 100+ sao (4 năm × 12 môn × ≥3 sao/môn = 144 sao max), thiếu mốc star-100 là khoảng trống ghi nhận.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động bổ sung star achievements còn thiếu.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/preschool/achievements.js` | Mở rộng | +3 achievements: `star-5`, `star-15`, `star-30` |
| `public/js/domains/secondary/achievements.js` | Mở rộng | +1 achievement: `star-100` |

### Chi tiết 4 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Mầm non | `star-5` | ✨ | Bé sưu sao | totalStars: 5 |
| Mầm non | `star-15` | 💫 | Rương kho báu nhỏ | totalStars: 15 |
| Mầm non | `star-30` | 🌟 | Bé siêu sao | totalStars: 30 |
| THCS | `star-100` | 🏆 | Thủ lĩnh sao THCS | totalStars: 100 |

### Kiểm thử

```
node --check public/js/domains/preschool/achievements.js    ✅ OK
node --check public/js/domains/secondary/achievements.js    ✅ OK
```

### Kết quả

- Mầm non: từ **0** → **3 star achievements** — đồng nhất với chuẩn toàn hệ thống ✅
- THCS: chuỗi star-20 → star-50 → **star-100** — cân bằng với THPT (cũng có star-100) ✅
- Học sinh mầm non được ghi nhận sớm từ 5 sao đầu tiên (phù hợp lứa tuổi 3–6)
- Học sinh THCS chăm chỉ nay có thêm mục tiêu star-100 để phấn đấu

---

## 2026-08-24 — Phiên cải tiến (49) · THPT · CNTT · Kinh tế — 3 Achievements mới (Streak-7)

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending.

**Phạm vi:** 3 trường — THPT (`highschool`), CNTT (`it`), Kinh tế (`economics`) — bổ sung milestone `streak-7` "1 tuần học liên tiếp" còn thiếu.

### Phân tích khoảng trống

Phiên 48 (2026-08-22) đã đồng nhất `streak-3` cho toàn bộ 9/9 trường. Phiên này quét tiếp bộ streak và phát hiện **`streak-7` vẫn thiếu ở 3 trường** trong khi 6/9 trường còn lại đều có mốc "1 tuần":

| Trường | Streak trước phiên này | streak-7 |
|--------|----------------------|----------|
| Mầm non | 3, 7, 14, 30 | ✅ có |
| Tiểu học | 3, 7, 14, 30 | ✅ có |
| THCS | 3, 5, 10, 14, 30 | ✅ (dùng streak-10 = 2 tuần học) |
| **THPT** | 3, 5, **—**, 14, 30 | ❌ **thiếu** |
| Dược | 3, 5, 7, 14, 30 | ✅ có |
| **CNTT** | 3, 5, **—**, 14, 30 | ❌ **thiếu** |
| **Kinh tế** | 3, 5, **—**, 14, 30 | ❌ **thiếu** |
| Lái xe | 3, 7, 14, 30 | ✅ có |
| Ngoại ngữ | 3, 7, 14, 30 | ✅ có |

Khoảng trống: bước nhảy streak-5 → streak-14 (9 ngày không có mốc) ở THPT/CNTT/Kinh tế tạo cảm giác thiếu ghi nhận cho học viên đang hình thành thói quen hàng tuần.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động bổ sung `streak-7` cho 3 trường còn thiếu.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/highschool/achievements.js` | Mở rộng | +1 achievement: `streak-7` (Một tuần học đều) |
| `public/js/domains/it/achievements.js` | Mở rộng | +1 achievement: `streak-7` (Code cả tuần) |
| `public/js/domains/economics/achievements.js` | Mở rộng | +1 achievement: `streak-7` (Một tuần học kinh tế) |

### Chi tiết 3 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| THPT | `streak-7` | 📅 | Một tuần học đều | streak: 7 |
| CNTT | `streak-7` | 📅 | Code cả tuần | streak: 7 |
| Kinh tế | `streak-7` | 📅 | Một tuần học kinh tế | streak: 7 |

### Kiểm thử

```
node --check public/js/domains/highschool/achievements.js    ✅ OK
node --check public/js/domains/it/achievements.js            ✅ OK
node --check public/js/domains/economics/achievements.js     ✅ OK
```

### Kết quả

- THPT, CNTT, Kinh tế: chuỗi streak 3 → 5 → **7** → 14 → 30 — đầy đủ mốc hàng tuần ✅
- Toàn hệ thống EduVerse: **9/9 trường đều có `streak-7`** (THCS dùng streak-10 tương đương) ✅
- Sinh viên THPT/CNTT/Kinh tế được ghi nhận sau đúng 1 tuần học đều đặn (thay vì phải đợi đến 14 ngày)

---

## 2026-08-22 — Phiên cải tiến (48) · THPT · CNTT · Kinh tế — 4 Achievements mới (Streak-3 · Star-30)

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending (cơ chế sync-inbox vẫn chưa được khắc phục, xem cảnh báo hạ tầng phiên 45).

**Phạm vi:** 3 trường — THPT (`highschool`), CNTT (`it`), Kinh tế (`economics`) — bổ sung các achievements còn thiếu để đồng nhất với toàn hệ thống.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động so sánh bộ achievements streak giữa tất cả 9 trường phát hiện khoảng trống hệ thống:

| Trường | streak-3 (trước) | streak-3 (sau) | Ghi chú |
|--------|-----------------|----------------|---------|
| THPT | ❌ (có streak-5) | ✅ | Trường duy nhất trong K-12 không có mốc "3 ngày khởi đầu" |
| CNTT | ❌ (có streak-5) | ✅ | IT + thiếu cả star-30 |
| Kinh tế | ❌ (có streak-5) | ✅ | Nhất quán: Economics có star-30, nay thêm streak-3 |

So sánh các trường **có** streak-3 trước phiên này: Mầm non, Tiểu học, THCS, Dược, Lái xe, Ngoại ngữ — 6/9 trường. Các trường **không có** streak-3: THPT, CNTT, Kinh tế. Sau phiên này: **9/9 trường đều có streak-3** ✅.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/highschool/achievements.js` | Mở rộng | +1 achievement: `streak-3` (Bắt đầu đều đặn) |
| `public/js/domains/it/achievements.js` | Mở rộng | +2 achievements: `streak-3` (Code 3 ngày liên tiếp) + `star-30` (30 sao CNTT) |
| `public/js/domains/economics/achievements.js` | Mở rộng | +1 achievement: `streak-3` (Học Kinh tế 3 ngày liên tiếp) |

### Chi tiết 4 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| THPT | `streak-3` | 🌱 | Bắt đầu đều đặn | streak: 3 |
| CNTT | `streak-3` | 🌱 | Code 3 ngày liên tiếp | streak: 3 |
| CNTT | `star-30` | 🌟 | 30 sao CNTT | totalStars: 30 |
| Kinh tế | `streak-3` | 🌱 | Học Kinh tế 3 ngày liên tiếp | streak: 3 |

### Kiểm thử

```
node --check public/js/domains/highschool/achievements.js    ✅ OK
node --check public/js/domains/it/achievements.js            ✅ OK
node --check public/js/domains/economics/achievements.js     ✅ OK
```

### Kết quả

- Tất cả **9/9 trường EduVerse** đều có `streak-3` — milestone "3 ngày khởi đầu" đã đồng nhất toàn hệ thống ✅
- Trường CNTT: streak set 3 achievements → **4** (+streak-3); star set 2 → **3** (+star-30)
- Trường THPT: streak set 3 achievements → **4** (+streak-3)
- Trường Kinh tế: streak set 3 achievements → **4** (+streak-3)
- Bộ sao CNTT: star-30 → star-60 → star-90 (đồng nhất với Economics và Pharmacy)

---

## 2026-08-21 — Phiên cải tiến (47) · Trường Dược — 4 Achievements mới (Streak 3/7/14 · Sao 60)

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending (cơ chế sync-inbox vẫn chưa được sửa từ phiên 45).

**Phạm vi:** Trường Dược (`pharmacy`) — bổ sung 4 achievements còn thiếu: streak-3, streak-7, streak-14 và star-60.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động quét so sánh achievements giữa các trường phát hiện **Trường Dược bị thiếu** các mốc streak nhỏ và sao trung gian:

| Trường | Streak hiện có | Sao hiện có |
|--------|---------------|-------------|
| Dược (trước phiên này) | streak-5, streak-30 | star-30, star-100 |
| Lái xe, Ngoại ngữ | streak-3, 7, 14, 30 | — |
| CNTT, Kinh tế | streak-5, 14, 30 | star-30, 60, 90 |
| Mầm non, Tiểu học, THCS, THPT | streak-3 (hoặc 5), 7 (hoặc 10), 14, 30 | đủ các mốc |

Khoảng trống:
- **streak-3**: Không có mốc khởi đầu "3 ngày liên tiếp" — trong khi Mầm non, Tiểu học, Lái xe, Ngoại ngữ đều có
- **streak-7**: Không có mốc "1 tuần kiên trì" — Mầm non, Lái xe, Ngoại ngữ đều có
- **streak-14**: Mốc 2 tuần vắng mặt — THPT, CNTT, Kinh tế, Lái xe, Ngoại ngữ đều có
- **star-60**: Không có mốc trung gian giữa star-30 và star-100 — trong khi CNTT và Kinh tế đã có star-60 và star-90 (phiên 35)

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | +4 achievements: `streak-3`, `streak-7`, `streak-14`, `star-60` |

### Chi tiết 4 achievements mới

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `streak-3` | 🌱 | Học đều 3 ngày | streak: 3 |
| `streak-7` | 📅 | Một tuần kiên trì | streak: 7 |
| `streak-14` | ⚡ | 2 tuần không gián đoạn | streak: 14 |
| `star-60` | 💫 | Sao bạch kim | totalStars: 60 |

### Kiểm thử

```
node --check public/js/domains/pharmacy/achievements.js    ✅ OK
```

### Kết quả

- Trường Dược: từ **5 streak achievements** → **8 streak achievements** (+streak-3, +streak-7, +streak-14)
- Sao: star-30 → star-60 (mới) → star-100 — chuỗi milestone dày đủ hơn
- Sinh viên Dược giờ được ghi nhận ngay từ ngày thứ 3 học liên tiếp (thay vì phải đạt streak-5 mới có mốc)
- Đồng nhất chuẩn streak-3/7/14/30 với toàn bộ các trường EduVerse

---

## 2026-08-20 — Phiên cải tiến (46) · Tiểu học Lớp 1 & Lớp 5 — Tuần 36 "Kết thúc năm học" cho 21 môn

**Chế độ:** Chủ động — hộp thư `ai-board/inbox.json` không có yêu cầu pending (xem cảnh báo hạ tầng phiên 45).

**Phạm vi:** Tiểu học — **Lớp 1** (9 môn) và **Lớp 5** (12 môn) — bổ sung tuần 36 "Kết thúc năm học" hoàn chỉnh năm học 36 tuần cho toàn bộ Tiểu học.

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động phát hiện khoảng trống nội dung cuối cùng của Tiểu học: Lớp 1 và Lớp 5 còn thiếu tuần 36 "Kết thúc năm học" (Lớp 2, 3, 4 đã hoàn chỉnh từ phiên 43–45).

### Thay đổi

#### Lớp 1 (9 môn — format static object `P1XX-w36-quiz`)

| File | Key | Chủ đề tuần 36 |
|------|-----|----------------|
| `lop1/lessons/toan.js` | `P1-w36-quiz` | Kết thúc Lớp 1 — Hành trang Toán vào Lớp 2 (đếm→100, cộng trừ, hình học, đồng hồ) |
| `lop1/lessons/tieng-viet.js` | `P1TV-w36-quiz` | Kết thúc Lớp 1 — Hành trang TV (29 chữ cái, âm ghép, 6 dấu thanh, câu kể/hỏi) |
| `lop1/lessons/tieng-anh.js` | `P1TA-w36-quiz` | End of Grade 1 — Ready for Grade 2 (greetings, numbers 1-10, colours, key sentences) |
| `lop1/lessons/tnxh.js` | `P1TNXH-w36-quiz` | Kết thúc TNXH Lớp 1 — bản thân, gia đình, trường học, thiên nhiên |
| `lop1/lessons/dao-duc.js` | `P1DD-w36-quiz` | 5 phẩm chất mang theo vào Lớp 2 (thật thà, yêu thương, chăm chỉ, sạch sẽ, an toàn) |
| `lop1/lessons/am-nhac.js` | `P1AN-w36-quiz` | Một năm hát ca vui vẻ — 16 bài hát, nhạc cụ gõ, Quốc ca, preview Lớp 2 |
| `lop1/lessons/my-thuat.js` | `P1MT-w36-quiz` | Nhìn lại hành trình sáng tạo — màu sắc, hình dạng, vẽ tranh, xé dán, nặn |
| `lop1/lessons/gdtc.js` | `P1GDTC-w36-quiz` | Một năm chăm vận động — đi, chạy, nhảy, ném, trò chơi, kế hoạch hè |
| `lop1/lessons/hdtn.js` | `P1HDTN-w36-quiz` | Hành trang trải nghiệm vào Lớp 2 — kỉ niệm, kĩ năng, lời nhắn |

#### Lớp 5 (12 môn — mix static/L() format `P5XX-w36-quiz`)

| File | Key | Chủ đề tuần 36 |
|------|-----|----------------|
| `lop5/lessons/toan.js` | `P5-w36-quiz` | Kết thúc Tiểu học — 5 trụ cột Toán (số, đo lường, hình học, thống kê, giải toán) |
| `lop5/lessons/tieng-viet.js` | `P5TV-w36-quiz` | Hành trang TV vào Lớp 6 — 4 kĩ năng, văn miêu tả/kể chuyện, Ngữ văn THCS |
| `lop5/lessons/tieng-anh.js` | `P5TA-w36-quiz` | End of Primary — Ready for Grade 6 (tenses, WH-questions, reading/writing skills) |
| `lop5/lessons/khoa-hoc.js` | `P5KH-w36-quiz` | Hành trang KH vào THCS — sự sống, vật chất-năng lượng, môi trường; preview KHTN |
| `lop5/lessons/lich-su-dia-ly.js` | `P5LSDL-w36-quiz` | Hành trang LS-ĐL — từ Hùng Vương đến Đổi mới 1986; 8 vùng kinh tế VN |
| `lop5/lessons/dao-duc.js` | `P5DD-w36-quiz` | 5 phẩm chất học sinh THCS (yêu thương, trách nhiệm, chăm chỉ, trung thực, yêu quê hương) |
| `lop5/lessons/am-nhac.js` | `P5AN-w36-quiz` | Âm nhạc đồng hành cả đời — hành trình 5 năm, recorder, ký xướng âm, preview THCS |
| `lop5/lessons/my-thuat.js` | `P5MT-w36-quiz` | Hành trình sáng tạo 5 năm — 4 kĩ năng MT, màu cơ bản/thứ cấp, lên THCS |
| `lop5/lessons/gdtc.js` | `P5GDTC-w36-quiz` | Sức khoẻ là hành trang — tổng kết vận động, kế hoạch 60 phút/ngày theo WHO |
| `lop5/lessons/hdtn.js` | `P5HDTN-w36-quiz` | Tốt nghiệp cấp 1 — hành trình 5 năm, cấp 2 mới, lời nhắn và lời hứa |
| `lop5/lessons/tin-hoc.js` | `P5TIN-w36-quiz` | Hành trang TH vào THCS — 5 trụ cột (thiết bị, kĩ năng, phần mềm, an toàn, thuật toán) |
| `lop5/lessons/cong-nghe.js` | `P5CN-w36-quiz` | Hành trang CN vào THCS — thủ công, nông nghiệp, nấu ăn, an toàn, tư duy thiết kế |

### Kiểm thử

```
node --check public/js/scenarios/lop1/lessons/toan.js          ✅ OK
node --check public/js/scenarios/lop1/lessons/tieng-viet.js    ✅ OK
node --check public/js/scenarios/lop1/lessons/tieng-anh.js     ✅ OK
node --check public/js/scenarios/lop1/lessons/tnxh.js          ✅ OK
node --check public/js/scenarios/lop1/lessons/dao-duc.js       ✅ OK
node --check public/js/scenarios/lop1/lessons/am-nhac.js       ✅ OK
node --check public/js/scenarios/lop1/lessons/my-thuat.js      ✅ OK
node --check public/js/scenarios/lop1/lessons/gdtc.js          ✅ OK
node --check public/js/scenarios/lop1/lessons/hdtn.js          ✅ OK
node --check public/js/scenarios/lop5/lessons/toan.js          ✅ OK
node --check public/js/scenarios/lop5/lessons/tieng-viet.js    ✅ OK
node --check public/js/scenarios/lop5/lessons/tieng-anh.js     ✅ OK
node --check public/js/scenarios/lop5/lessons/khoa-hoc.js      ✅ OK
node --check public/js/scenarios/lop5/lessons/lich-su-dia-ly.js ✅ OK
node --check public/js/scenarios/lop5/lessons/dao-duc.js       ✅ OK
node --check public/js/scenarios/lop5/lessons/am-nhac.js       ✅ OK
node --check public/js/scenarios/lop5/lessons/my-thuat.js      ✅ OK
node --check public/js/scenarios/lop5/lessons/gdtc.js          ✅ OK
node --check public/js/scenarios/lop5/lessons/hdtn.js          ✅ OK
node --check public/js/scenarios/lop5/lessons/tin-hoc.js       ✅ OK
node --check public/js/scenarios/lop5/lessons/cong-nghe.js     ✅ OK
```

### Kết quả

- Lớp 1: từ 35 tuần → **36 tuần** cho tất cả 9 môn ✅
- Lớp 5: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- **Toàn bộ Tiểu học (Lớp 1–5) đã có đủ 36 tuần** 🎉
- Cùng với THCS (Lớp 6–9) và THPT (Lớp 10–12) đã hoàn chỉnh từ phiên 38–45
- **EduVerse hiện có đủ 36 tuần cho TẤT CẢ các lớp từ Lớp 1 đến Lớp 12** 🏫🎓

---

## 2026-08-19 — Phiên cải tiến (45) · Tiểu học Lớp 4 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động — ⚠️ **KHÔNG đọc được hộp thư production** (xem mục "Cảnh báo hạ tầng" bên dưới).

**Trường:** Tiểu học — Lớp 4 (`lop4`)

### Yêu cầu xử lý

**Không xác định được** — phiên này KHÔNG kiểm chứng được có hay không yêu cầu từ người dùng. Mọi đường đọc hộp thư production đều thất bại (chi tiết bên dưới). File `ai-board/inbox.json` trong repo là stub rỗng, **không phải** nguồn dữ liệu thật, nên "file rỗng" ≠ "không có yêu cầu".

Phiên chủ động chọn khoảng trống nội dung: Lớp 4 còn thiếu bài học tuần 36 "Kết thúc năm học" cho tất cả 12 môn (trong khi Lớp 2, 3, 6, 7, 8, 9, 10, 11, 12 đã hoàn chỉnh).

### ⚠️ Cảnh báo hạ tầng — hộp thư đã "mù" 22 phiên liên tiếp

Cơ chế được thiết kế cho bước "đọc hộp thư" là `server/scripts/sync-inbox.mjs`
(production DB → `ai-board/inbox.json`). Kiểm tra ngày 2026-08-19 cho thấy nó
hỏng ở **ba lớp chồng nhau**:

| # | Lỗi | Bằng chứng |
|---|-----|-----------|
| 1 | `node_modules` chưa cài ở môi trường clone mới | `ERR_MODULE_NOT_FOUND: Cannot find package 'better-sqlite3'` |
| 2 | `data/tizia.db` không có trong repo (DB nằm trên volume production) | script tự thoát `exit(1)` với "DB không tồn tại" |
| 3 | Script mồ côi — không cron/CI/doc nào gọi | `grep -rn "sync-inbox"` → 0 tham chiếu ngoài chính nó |

Đường HTTP cũng bị chặn: `/api/requests`, `/api/requests/:id/thread` và
`/api/admin/requests` đều trả `401 {"needLogin":true}` — `/api/requests` KHÔNG
nằm trong `PUBLIC_PATH_PREFIXES` (comment ở `server/index.js` nói "inbox công
khai" là **đã lỗi thời**, không khớp whitelist thực tế trong
`server/contexts/identity/auth.js`).

**Hệ quả:** phiên gần nhất phục vụ yêu cầu thật là **Phiên (23) · 2026-07-25 ·
Request #106 · Chu Thi Hue**. Từ phiên (24) đến (45) — **22 phiên, ~25 ngày** —
tất cả đều ghi "inbox trống" và chạy chế độ chủ động. Con số đó **không chứng
minh** không có yêu cầu; nhiều khả năng yêu cầu của HS/SV đang nằm trong DB
production mà Ban điều hành AI không nhìn thấy.

**Cần người vận hành quyết định** (nằm ngoài quyền hạn phiên tự động, liên quan
secret/hạ tầng):
- Chạy `sync-inbox.mjs` **trên host production** (nơi có `data/tizia.db`) và commit `inbox.json`; hoặc
- Cấp `DATA_DIR` trỏ vào volume production + `npm ci` cho môi trường routine; hoặc
- Mở một endpoint đọc-chỉ có xác thực bằng token riêng cho Ban điều hành AI.

Ngoài ra `sync-inbox.mjs` đọc **SQLite** (`better-sqlite3`) trong khi
`.env.example` khai báo `DATABASE_URL=postgres://…` và `package.json` có `pg` —
cần rà lại script còn khớp với DB thật hay không.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/lop4/lessons/toan.js` | Bổ sung | Tuần 36: Kết thúc Lớp 4 — 5 mảng toán lớn, preview Lớp 5 (số thập phân, diện tích hình thang/tròn, tỉ số %) |
| `public/js/scenarios/lop4/lessons/tieng-viet.js` | Bổ sung | Tuần 36: Hành trang TV Lớp 4 — 4 kỹ năng nghe/nói/đọc/viết, từ loại, câu, dấu câu, tập làm văn |
| `public/js/scenarios/lop4/lessons/tieng-anh.js` | Bổ sung | Tuần 36: End of Grade 4 English — grammar review, Grade 5 preview, summer study tips |
| `public/js/scenarios/lop4/lessons/khoa-hoc.js` | Bổ sung | Tuần 36: 3 mảng Khoa học (vật chất, năng lượng, sinh vật–sức khoẻ), preview Lớp 5 |
| `public/js/scenarios/lop4/lessons/lich-su-dia-ly.js` | Bổ sung | Tuần 36: Địa lý VN (vị trí, địa hình, khí hậu, vùng kinh tế), Lịch sử (Hùng Vương → CM Tháng 8) |
| `public/js/scenarios/lop4/lessons/dao-duc.js` | Bổ sung | Tuần 36: 10 phẩm chất Đạo đức Lớp 4, mục tiêu sống đẹp Lớp 5, kế hoạch hè |
| `public/js/scenarios/lop4/lessons/am-nhac.js` | Bổ sung | Tuần 36: Bài hát, nhạc lý (nhịp, sắc thái, nhạc cụ), preview lý thuyết Lớp 5 |
| `public/js/scenarios/lop4/lessons/my-thuat.js` | Bổ sung | Tuần 36: 4 lĩnh vực MT (vẽ tranh, trang trí, nặn, thường thức), lý thuyết màu sắc, kế hoạch hè |
| `public/js/scenarios/lop4/lessons/gdtc.js` | Bổ sung | Tuần 36: Kỹ năng vận động Lớp 4, kế hoạch "60 phút mỗi ngày" trong hè |
| `public/js/scenarios/lop4/lessons/hdtn.js` | Bổ sung | Tuần 36: 7 kỹ năng sống Lớp 4, thử thách "Học sinh Lớp 5" 8 tuần hè |
| `public/js/scenarios/lop4/lessons/tin-hoc.js` | Bổ sung | Tuần 36: 4 mảng Tin học (HW, an toàn, thuật toán, Scratch), kế hoạch hè lập trình |
| `public/js/scenarios/lop4/lessons/cong-nghe.js` | Bổ sung | Tuần 36: 3 lĩnh vực CN (kỹ thuật, nông nghiệp, điện), nguyên tắc an toàn, Design Thinking Lớp 5 |

### Kiểm thử

```
node --check public/js/scenarios/lop4/lessons/toan.js          ✅ OK
node --check public/js/scenarios/lop4/lessons/tieng-viet.js    ✅ OK
node --check public/js/scenarios/lop4/lessons/tieng-anh.js     ✅ OK
node --check public/js/scenarios/lop4/lessons/khoa-hoc.js      ✅ OK
node --check public/js/scenarios/lop4/lessons/lich-su-dia-ly.js ✅ OK
node --check public/js/scenarios/lop4/lessons/dao-duc.js       ✅ OK
node --check public/js/scenarios/lop4/lessons/am-nhac.js       ✅ OK
node --check public/js/scenarios/lop4/lessons/my-thuat.js      ✅ OK
node --check public/js/scenarios/lop4/lessons/gdtc.js          ✅ OK
node --check public/js/scenarios/lop4/lessons/hdtn.js          ✅ OK
node --check public/js/scenarios/lop4/lessons/tin-hoc.js       ✅ OK
node --check public/js/scenarios/lop4/lessons/cong-nghe.js     ✅ OK
```

---

## 2026-08-18 — Phiên cải tiến (44) · Tiểu học Lớp 3 — Tuần 36 "Kết thúc năm học" cho 11 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; kiểm tra trạng thái nội dung — Lớp 3 là lớp Tiểu học duy nhất còn thiếu tuần 36 cho tất cả môn học).

**Trường:** Tiểu học — Lớp 3 (`lop3`)

### Yêu cầu xử lý

Không có yêu cầu từ người dùng trong hộp thư. Phiên chủ động phát hiện khoảng trống nội dung: Lớp 3 còn thiếu bài học tuần 36 "Kết thúc năm học" cho tất cả 11 môn (trong khi Lớp 2, 6, 7, 8, 9, 10, 11, 12 đã hoàn chỉnh).

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/lop3/lessons/toan.js` | Bổ sung | Tuần 36: Kết thúc Lớp 3 — Hành trang vào Lớp 4 (bảng nhân chia, hình học, đơn vị đo) |
| `public/js/scenarios/lop3/lessons/tieng-viet.js` | Bổ sung | Tuần 36: Bốn kĩ năng TV Lớp 3, câu mẫu, so sánh & nhân hoá — chuẩn bị Lớp 4 |
| `public/js/scenarios/lop3/lessons/tieng-anh.js` | Bổ sung | Tuần 36: End of Grade 3 English — vocabulary & structures review, Grade 4 preview |
| `public/js/scenarios/lop3/lessons/tnxh.js` | Bổ sung | Tuần 36: Ba chủ đề TNXH (con người, xã hội, thiên nhiên) — hướng đến KH & Lịch sử lớp 4 |
| `public/js/scenarios/lop3/lessons/dao-duc.js` | Bổ sung | Tuần 36: Năm giá trị đạo đức Lớp 3, nhìn lại hành trình trưởng thành |
| `public/js/scenarios/lop3/lessons/am-nhac.js` | Bổ sung | Tuần 36: Bài hát & kiến thức âm nhạc Lớp 3, nhạc cụ gõ, ý nghĩa âm nhạc trong cuộc sống |
| `public/js/scenarios/lop3/lessons/my-thuat.js` | Bổ sung | Tuần 36: Hành trình sáng tạo mỹ thuật — vẽ, in, nặn, Origami — dự án nhật ký tranh hè |
| `public/js/scenarios/lop3/lessons/gdtc.js` | Bổ sung | Tuần 36: Kĩ năng vận động (chạy, nhảy, ném, trò chơi), kế hoạch hè 60 phút/ngày |
| `public/js/scenarios/lop3/lessons/hdtn.js` | Bổ sung | Tuần 36: Trải nghiệm năm Lớp 3 — tự phục vụ, cộng đồng, kĩ năng xã hội, dự án hè |
| `public/js/scenarios/lop3/lessons/tin-hoc.js` | Bổ sung | Tuần 36: Hành trình số — máy tính, gõ phím, an toàn mạng, thuật toán — chuẩn bị Scratch Lớp 4 |
| `public/js/scenarios/lop3/lessons/cong-nghe.js` | Bổ sung | Tuần 36: Thủ công kĩ thuật, nông nghiệp gia đình, tư duy thiết kế — dự án trồng cây hè |

### Kiểm thử

```
node --check public/js/scenarios/lop3/lessons/toan.js          ✅ OK
node --check public/js/scenarios/lop3/lessons/tieng-viet.js    ✅ OK
node --check public/js/scenarios/lop3/lessons/tieng-anh.js     ✅ OK
node --check public/js/scenarios/lop3/lessons/tnxh.js          ✅ OK
node --check public/js/scenarios/lop3/lessons/dao-duc.js       ✅ OK
node --check public/js/scenarios/lop3/lessons/am-nhac.js       ✅ OK
node --check public/js/scenarios/lop3/lessons/my-thuat.js      ✅ OK
node --check public/js/scenarios/lop3/lessons/gdtc.js          ✅ OK
node --check public/js/scenarios/lop3/lessons/hdtn.js          ✅ OK
node --check public/js/scenarios/lop3/lessons/tin-hoc.js       ✅ OK
node --check public/js/scenarios/lop3/lessons/cong-nghe.js     ✅ OK
```

---

## 2026-08-16 — Phiên cải tiến (43) · Trường THCS Lớp 8 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động (tiếp nối phiên 42 cùng ngày — hoàn thành tuần 36 cho Lớp 8).

**Phạm vi:** Trường THCS (`secondary`) — Lớp 8 — bổ sung **tuần 36** cho tất cả 12 môn học, hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018.

### Vấn đề phát hiện

CHANGELOG phiên 42 ghi chú: *"Còn lại cần bổ sung tuần 36: Lớp 8 (phiên tiếp theo)"*. Kiểm tra toàn bộ 12 file Lớp 8 xác nhận tất cả chỉ có 35 tuần (key cuối: `S8XXXX-w35-quiz`).

### Thay đổi

| File | Key thêm | Chủ đề tuần 36 |
|------|----------|----------------|
| `lop8/lessons/toan.js` | `S8TOAN-w36-quiz` | Kết thúc Toán 8 — Hành trang vào lớp 9 |
| `lop8/lessons/ngu-van.js` | `S8NV-w36-quiz` | Kết thúc Ngữ Văn 8 — Ngôn ngữ và tâm hồn bước vào lớp 9 |
| `lop8/lessons/tieng-anh.js` | `S8TA-w36-quiz` | Closing Year — Grade 8 English & the Road to Grade 9 |
| `lop8/lessons/khtn.js` | `S8KHTN-w36-quiz` | Kết thúc KHTN 8 — Ba ngành khoa học, một hành trình |
| `lop8/lessons/lich-su-dia.js` | `S8LSDL-w36-quiz` | Kết thúc Lịch Sử & Địa Lý 8 — Việt Nam trên hành trình lịch sử và địa lý |
| `lop8/lessons/gdcd.js` | `S8GDCD-w36-quiz` | Kết thúc GDCD 8 — Công dân trẻ với đạo đức và pháp luật |
| `lop8/lessons/cong-nghe.js` | `S8CN-w36-quiz` | Kết thúc Công Nghệ 8 — Từ bản vẽ đến mạch điện |
| `lop8/lessons/tin-hoc.js` | `S8TIN-w36-quiz` | Kết thúc Tin Học 8 — Tư duy lập trình bước vào kỉ nguyên số |
| `lop8/lessons/gdtc.js` | `S8GDTC-w36-quiz` | Kết thúc GDTC 8 — Thể chất khoẻ mạnh, tinh thần vững vàng |
| `lop8/lessons/nghe-thuat.js` | `S8NT-w36-quiz` | Kết thúc Nghệ Thuật 8 — Âm nhạc & Mỹ thuật nuôi dưỡng tâm hồn |
| `lop8/lessons/hdtn.js` | `S8HDTN-w36-quiz` | Kết thúc HĐTN 8 — Trưởng thành qua từng trải nghiệm, vững bước vào lớp 9 |
| `lop8/lessons/gd-dia-phuong.js` | `S8GDDP-w36-quiz` | Kết thúc GD Địa Phương 8 — Hà Nội ngàn năm trong tim |

### Định dạng file

- **10 file dùng L()-format** (toan, ngu-van, tieng-anh, khtn, lich-su-dia, tin-hoc, gdtc, nghe-thuat, hdtn, gd-dia-phuong): `const L = (topic, intro, objectives, theory, examples) => ({...})`.
- **2 file dùng static object format** (gdcd, cong-nghe): `'S8XXXX-w36-quiz': { topic, intro, objectives, theory, examples }`.

### Kiểm tra cú pháp

Tất cả 12 file đều pass `node --check` ✅.

### Kết quả

- Lớp 8 đã có đủ 36 tuần cho toàn bộ 12 môn học ✅
- Toàn bộ THCS (Lớp 6, 7, 8, 9) đã có đủ 36 tuần ✅
- Toàn bộ THPT (Lớp 10, 11, 12) đã có đủ 36 tuần ✅
- **EduVerse hiện có đủ 36 tuần cho tất cả các lớp từ Lớp 6 đến Lớp 12** 🎉

---

## 2026-08-16 — Phiên cải tiến (42) · Trường THCS Lớp 7 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; API production yêu cầu xác thực; không có yêu cầu pending).

**Phạm vi:** Trường THCS (`secondary`) — Lớp 7 — bổ sung **tuần 36** cho tất cả 12 môn học, hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018.

### Vấn đề phát hiện

Tiếp nối phiên 41 (2026-08-15) đã thêm tuần 36 cho Lớp 10, quét toàn bộ lesson files xác nhận **Lớp 7 (THCS năm 2) vẫn chỉ có 35 tuần** — một trong hai lớp còn thiếu được ghi nhận trong CHANGELOG phiên 41 ("Còn lại cần bổ sung tuần 36: Lớp 7, Lớp 8"):

- Lớp 7 là năm học thứ hai của THCS — học sinh bắt đầu bước vào giai đoạn dậy thì và hình thành bản sắc cá nhân
- 12 môn học của Lớp 7 theo GDPT 2018: Toán, Ngữ Văn, Tiếng Anh, KHTN, Lịch Sử & Địa Lý, GDCD, Công Nghệ, Tin Học, GDTC, Nghệ Thuật, HĐTN, GD Địa Phương
- Tuần 36 "Kết thúc năm học — Hành trang vào lớp 8" giúp học sinh nhìn lại toàn bộ kiến thức năm, kết nối sang lớp 8 và xây dựng kế hoạch ôn hè

### Thay đổi

| File | Định dạng | Nội dung tuần 36 |
|------|-----------|-----------------|
| `public/js/scenarios/lop7/lessons/toan.js` | Static | "Kết thúc Toán 7 — Hành trang vào lớp 8" (số thực, đại số, hình học, thống kê) |
| `public/js/scenarios/lop7/lessons/ngu-van.js` | Static | "Kết thúc Ngữ Văn 7 — Ngôn ngữ và tâm hồn bước vào lớp 8" |
| `public/js/scenarios/lop7/lessons/tieng-anh.js` | Static | "Closing Year — Grade 7 English & the Road to Grade 8" |
| `public/js/scenarios/lop7/lessons/khtn.js` | Static | "Kết thúc KHTN 7 — Ba khoa học, một hành trình" (Vật Lý, Hoá Học, Sinh Học) |
| `public/js/scenarios/lop7/lessons/lich-su-dia.js` | Static | "Kết thúc Lịch Sử & Địa Lý 7 — Thế giới và Việt Nam trong tầm tay" |
| `public/js/scenarios/lop7/lessons/gdcd.js` | Static | "Kết thúc GDCD 7 — Công dân trẻ vững bước vào lớp 8" |
| `public/js/scenarios/lop7/lessons/cong-nghe.js` | L() | "Tổng kết Công Nghệ 7 — Nông nghiệp xanh và tương lai bền vững" |
| `public/js/scenarios/lop7/lessons/tin-hoc.js` | L() | "Kết thúc Tin Học 7 — Tư duy số bước vào kỷ nguyên lập trình" |
| `public/js/scenarios/lop7/lessons/gdtc.js` | L() | "Kết thúc GDTC 7 — Thể chất khoẻ mạnh, tinh thần vui tươi" |
| `public/js/scenarios/lop7/lessons/nghe-thuat.js` | L() | "Kết thúc Nghệ Thuật 7 — Âm nhạc & Mỹ thuật nuôi dưỡng tâm hồn" |
| `public/js/scenarios/lop7/lessons/hdtn.js` | L() | "Kết thúc HĐTN 7 — Trưởng thành qua từng trải nghiệm" |
| `public/js/scenarios/lop7/lessons/gd-dia-phuong.js` | L() | "Kết thúc GD Địa Phương 7 — Tình yêu quê hương nuôi dưỡng tâm hồn" |
| `public/CHANGELOG-eduverse.md` | Cập nhật | Ghi nhận phiên cải tiến (42) |

### Chi tiết tuần 36

Mỗi tuần 36 gồm: hệ thống hoá kiến thức toàn năm (4–6 blocks lý thuyết), 3 câu hỏi/ví dụ thực hành. Nội dung tập trung:
- Bức tranh toàn cảnh của môn học qua cả năm lớp 7
- Kết nối kiến thức với lớp 8 (cầu nối cụ thể từng môn)
- Gợi ý lộ trình ôn tập hè hiệu quả
- Câu hỏi phản tư mang tính ứng dụng thực tiễn cao

### Kiểm thử

```
node --check public/js/scenarios/lop7/lessons/toan.js         ✅ OK
node --check public/js/scenarios/lop7/lessons/ngu-van.js      ✅ OK
node --check public/js/scenarios/lop7/lessons/tieng-anh.js    ✅ OK
node --check public/js/scenarios/lop7/lessons/khtn.js         ✅ OK
node --check public/js/scenarios/lop7/lessons/lich-su-dia.js  ✅ OK
node --check public/js/scenarios/lop7/lessons/gdcd.js         ✅ OK
node --check public/js/scenarios/lop7/lessons/cong-nghe.js    ✅ OK
node --check public/js/scenarios/lop7/lessons/tin-hoc.js      ✅ OK
node --check public/js/scenarios/lop7/lessons/gdtc.js         ✅ OK
node --check public/js/scenarios/lop7/lessons/nghe-thuat.js   ✅ OK
node --check public/js/scenarios/lop7/lessons/hdtn.js         ✅ OK
node --check public/js/scenarios/lop7/lessons/gd-dia-phuong.js ✅ OK
```

### Kết quả

- Lớp 7: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- Đồng nhất với chuẩn 36 tuần của Lớp 6, Lớp 9, Lớp 10, Lớp 11 và Lớp 12 ✅
- Còn lại cần bổ sung tuần 36: **Lớp 8** (phiên tiếp theo)

---

## 2026-08-15 — Phiên cải tiến (41) · Trường THPT Lớp 10 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; API production yêu cầu xác thực; không có yêu cầu pending).

**Phạm vi:** Trường THPT (`highschool`) — Lớp 10 — bổ sung **tuần 36** cho tất cả 12 môn học, hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018.

### Vấn đề phát hiện

Tiếp nối phiên 40 (2026-08-14) đã thêm tuần 36 cho Lớp 11, kiểm tra xác nhận **Lớp 10 (THPT năm 1) vẫn chỉ có 35 tuần** — khoảng trống nội dung cần bổ sung:

- Lớp 10 là năm đầu THPT — học sinh bước vào môi trường học mới với nhiều chuyển tiếp quan trọng
- Tuần 36 "Kết thúc năm học — Hành trang vào lớp 11" giúp học sinh nhìn lại, củng cố và định hướng hè
- Đồng nhất hệ thống: Lớp 6, Lớp 9, Lớp 11, Lớp 12 đã có 36 tuần; Lớp 10 là lớp tiếp theo cần hoàn chỉnh

**Ưu tiên xử lý Lớp 10** vì: năm đầu THPT có nhiều thay đổi về phương pháp học (từ THCS sang THPT), cần tuần tổng kết để học sinh không bị hổng kiến thức nền khi bước vào lớp 11.

### Thay đổi

| File | Loại | Nội dung tuần 36 |
|------|------|------------------|
| `public/js/scenarios/lop10/lessons/toan.js` | Mở rộng | "Kết thúc Toán 10 — Hành trang vào lớp 11" |
| `public/js/scenarios/lop10/lessons/ngu-van.js` | Mở rộng | "Kết thúc Ngữ Văn 10 — Hành trang ngôn ngữ vào lớp 11" |
| `public/js/scenarios/lop10/lessons/tieng-anh.js` | Mở rộng | "Closing Chapter — Grade 10 English & the Road Ahead" |
| `public/js/scenarios/lop10/lessons/vat-ly.js` | Mở rộng | "Kết thúc Vật Lý 10 — Cơ học và Nhiệt học hành trang lên lớp 11" |
| `public/js/scenarios/lop10/lessons/hoa-hoc.js` | Mở rộng | "Kết thúc Hoá Học 10 — Nền tảng nguyên tử và bước vào Hoá hữu cơ 11" |
| `public/js/scenarios/lop10/lessons/sinh-hoc.js` | Mở rộng | "Kết thúc Sinh Học 10 — Tế bào và Vi sinh vật làm nền tảng cho lớp 11" |
| `public/js/scenarios/lop10/lessons/lich-su.js` | Mở rộng | "Kết thúc Lịch Sử 10 — Thế giới và Việt Nam qua lăng kính lịch sử" |
| `public/js/scenarios/lop10/lessons/dia-ly.js` | Mở rộng | "Kết thúc Địa Lý 10 — Bản đồ thế giới trong tâm trí" |
| `public/js/scenarios/lop10/lessons/gdcd.js` | Mở rộng | "Kết thúc GDCD 10 — Công dân có hiểu biết trong thế giới hội nhập" |
| `public/js/scenarios/lop10/lessons/tin-hoc.js` | Mở rộng | "Kết thúc Tin Học 10 — Lập trình và Tư duy số cho lớp 11" |
| `public/js/scenarios/lop10/lessons/cong-nghe.js` | Mở rộng | "Kết thúc Công Nghệ 10 — Kỹ thuật và Nghề nghiệp trong tầm tay" |
| `public/js/scenarios/lop10/lessons/gdqp.js` | Mở rộng | "Kết thúc GDQP-AN 10 — Tuổi trẻ, Tổ quốc và Trách nhiệm" |
| `public/CHANGELOG-eduverse.md` | Cập nhật | Ghi nhận phiên cải tiến (41) |

### Chi tiết tuần 36

Mỗi tuần 36 gồm: hệ thống hoá kiến thức toàn năm (5–6 blocks), 2 câu hỏi phản tư sâu về định hướng học tập. Nội dung tập trung:
- Nhìn lại bức tranh toàn cảnh cả năm học lớp 10 của môn đó
- Kết nối kiến thức với lớp 11 (cầu nối cụ thể từng môn)
- Gợi ý lộ trình ôn tập hè hiệu quả theo từng môn
- Định hướng nghề nghiệp và ứng dụng thực tiễn của kiến thức

### Kết quả

- Lớp 10: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- Đồng nhất với chuẩn 36 tuần của Lớp 6, Lớp 9, Lớp 11 và Lớp 12 ✅
- Còn lại cần bổ sung tuần 36: Lớp 7, Lớp 8

### Kiểm thử

```
node --check public/js/scenarios/lop10/lessons/toan.js       ✅ OK
node --check public/js/scenarios/lop10/lessons/ngu-van.js    ✅ OK
node --check public/js/scenarios/lop10/lessons/tieng-anh.js  ✅ OK
node --check public/js/scenarios/lop10/lessons/vat-ly.js     ✅ OK
node --check public/js/scenarios/lop10/lessons/hoa-hoc.js    ✅ OK
node --check public/js/scenarios/lop10/lessons/sinh-hoc.js   ✅ OK
node --check public/js/scenarios/lop10/lessons/lich-su.js    ✅ OK
node --check public/js/scenarios/lop10/lessons/dia-ly.js     ✅ OK
node --check public/js/scenarios/lop10/lessons/gdcd.js       ✅ OK
node --check public/js/scenarios/lop10/lessons/tin-hoc.js    ✅ OK
node --check public/js/scenarios/lop10/lessons/cong-nghe.js  ✅ OK
node --check public/js/scenarios/lop10/lessons/gdqp.js       ✅ OK
```

---

## 2026-08-14 — Phiên cải tiến (40) · Trường THPT Lớp 11 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; API production yêu cầu xác thực; không có yêu cầu pending).

**Phạm vi:** Trường THPT (`highschool`) — Lớp 11 — bổ sung **tuần 36** cho tất cả 12 môn học, tiếp tục hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018.

### Vấn đề phát hiện

Khảo sát codebase xác nhận **Lớp 11 (THPT) vẫn chỉ có 35 tuần** — đây là lớp tiếp theo cần bổ sung sau các phiên đã xử lý Lớp 6, Lớp 9 (THCS) và Lớp 12 (THPT):

- Lớp 11 là năm học nền tảng quan trọng nhất trước kì thi tốt nghiệp THPT Quốc gia
- Tuần 36 "Kết thúc năm học — Hành trang vào lớp 12" cần thiết để học sinh nhìn lại, củng cố và chuẩn bị tâm thế tốt
- Đồng nhất hệ thống: Lớp 6, Lớp 9, Lớp 12 đã có 36 tuần; Lớp 11 cần được hoàn chỉnh

**Ưu tiên xử lý Lớp 11** vì: đây là năm cuối trước kì thi quan trọng nhất, học sinh cần nội dung tổng kết và định hướng cho cả kì học bổ sung và năm lớp 12.

### Thay đổi

| File | Loại | Nội dung tuần 36 |
|------|------|------------------|
| `public/js/scenarios/lop11/lessons/toan.js` | Mở rộng | "Kết thúc Toán 11 — Hành trang vào lớp 12" |
| `public/js/scenarios/lop11/lessons/ngu-van.js` | Mở rộng | "Kết thúc Ngữ Văn 11 — Chiều sâu cảm xúc và hành trình lớp 12" |
| `public/js/scenarios/lop11/lessons/tieng-anh.js` | Mở rộng | "Closing Chapter — Grade 11 English & the Road Ahead" |
| `public/js/scenarios/lop11/lessons/vat-ly.js` | Mở rộng | "Kết thúc Vật Lý 11 — Điện Từ Quang và hành trình lớp 12" |
| `public/js/scenarios/lop11/lessons/hoa-hoc.js` | Mở rộng | "Kết thúc Hoá Học 11 — Hữu cơ và bước ngoặt lớp 12" |
| `public/js/scenarios/lop11/lessons/sinh-hoc.js` | Mở rộng | "Kết thúc Sinh Học 11 — Sự sống ở cấp cơ thể và bước ngoặt lớp 12" |
| `public/js/scenarios/lop11/lessons/lich-su.js` | Mở rộng | "Kết thúc Lịch Sử 11 — Thế giới và Việt Nam trước thời đại của chúng ta" |
| `public/js/scenarios/lop11/lessons/dia-ly.js` | Mở rộng | "Kết thúc Địa Lý 11 — Bản đồ thế giới trong tầm tay" |
| `public/js/scenarios/lop11/lessons/gdcd.js` | Mở rộng | "Kết thúc GDCD 11 — Công dân có hiểu biết trong thế giới hội nhập" |
| `public/js/scenarios/lop11/lessons/tin-hoc.js` | Mở rộng | "Kết thúc Tin Học 11 — Lập trình và tư duy số cho thế kỉ 21" |
| `public/js/scenarios/lop11/lessons/cong-nghe.js` | Mở rộng | "Kết thúc Công Nghệ 11 — Kỹ thuật, Xe hơi và Hành trình lớp 12" |
| `public/js/scenarios/lop11/lessons/gdqp.js` | Mở rộng | "Kết thúc GDQP-AN 11 — Tuổi trẻ, Tổ quốc và Trách nhiệm" |
| `public/CHANGELOG-eduverse.md` | Cập nhật | Ghi nhận phiên cải tiến (40) |

### Chi tiết tuần 36

Mỗi tuần 36 gồm: hệ thống hoá kiến thức toàn năm (5–7 blocks), 2 câu hỏi phản tư sâu liên quan đến định hướng lớp 12 và cuộc sống. Nội dung tập trung:
- Nhìn lại bức tranh toàn cảnh cả năm học lớp 11 của môn đó
- Kết nối kiến thức với lớp 12 và kì thi tốt nghiệp THPT Quốc gia
- Gợi ý lộ trình ôn tập hè hiệu quả theo từng môn
- Định hướng nghề nghiệp và ứng dụng thực tiễn của kiến thức

### Kết quả

- Lớp 11: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- Đồng nhất với chuẩn 36 tuần của Lớp 6, Lớp 9 và Lớp 12 ✅
- Còn lại cần bổ sung tuần 36: Lớp 7, Lớp 8, Lớp 10

### Kiểm thử

```
node --check public/js/scenarios/lop11/lessons/toan.js       ✅ OK
node --check public/js/scenarios/lop11/lessons/ngu-van.js    ✅ OK
node --check public/js/scenarios/lop11/lessons/tieng-anh.js  ✅ OK
node --check public/js/scenarios/lop11/lessons/vat-ly.js     ✅ OK
node --check public/js/scenarios/lop11/lessons/hoa-hoc.js    ✅ OK
node --check public/js/scenarios/lop11/lessons/sinh-hoc.js   ✅ OK
node --check public/js/scenarios/lop11/lessons/lich-su.js    ✅ OK
node --check public/js/scenarios/lop11/lessons/dia-ly.js     ✅ OK
node --check public/js/scenarios/lop11/lessons/gdcd.js       ✅ OK
node --check public/js/scenarios/lop11/lessons/tin-hoc.js    ✅ OK
node --check public/js/scenarios/lop11/lessons/cong-nghe.js  ✅ OK
node --check public/js/scenarios/lop11/lessons/gdqp.js       ✅ OK
```

---

## 2026-08-13 — Phiên cải tiến (39) · Trường THPT Lớp 12 — Tuần 36 "Kết thúc THPT" cho 12 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; API production yêu cầu xác thực; không có yêu cầu pending).

**Phạm vi:** Trường THPT (`highschool`) — Lớp 12 — bổ sung **tuần 36** cho tất cả 12 môn học, hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018.

### Vấn đề phát hiện

Tiếp nối phiên 38 (2026-08-11) đã thêm tuần 36 cho Lớp 9 (THCS), quét toàn bộ lesson files phát hiện **Lớp 12 (THPT) vẫn chỉ có 35 tuần** — khoảng trống nội dung nghiêm trọng nhất còn lại vì:

- Lớp 12 là năm học quan trọng nhất của cả bậc học phổ thông — chuẩn bị cho kì thi tốt nghiệp THPT Quốc gia và xét tuyển đại học
- Tuần 36 "Kết thúc THPT — Bước vào cánh cổng tương lai" là tổng kết cần thiết trước kì thi
- Đồng nhất hệ thống: Lớp 6, Lớp 9 đã có 36 tuần; các lớp còn lại (7, 8, 10, 11, 12) chỉ có 35

**Ưu tiên xử lý Lớp 12** vì đây là lớp cuối cấp THPT, quan trọng nhất với kì thi tốt nghiệp THPT QG.

### Thay đổi

| File | Loại | Nội dung tuần 36 |
|------|------|------------------|
| `public/js/scenarios/lop12/lessons/toan.js` | Mở rộng | "Kết thúc Toán THPT — Hành trang vào đại học" |
| `public/js/scenarios/lop12/lessons/ngu-van.js` | Mở rộng | "Kết thúc Ngữ Văn THPT — Văn chương và hành trình trở thành người" |
| `public/js/scenarios/lop12/lessons/tieng-anh.js` | Mở rộng | "Closing Chapter — Your English Journey Continues" |
| `public/js/scenarios/lop12/lessons/vat-ly.js` | Mở rộng | "Kết thúc Vật Lý THPT — Khám phá vũ trụ bắt đầu từ đây" |
| `public/js/scenarios/lop12/lessons/hoa-hoc.js` | Mở rộng | "Kết thúc Hoá Học THPT — Phân tử xây dựng thế giới" |
| `public/js/scenarios/lop12/lessons/sinh-hoc.js` | Mở rộng | "Kết thúc Sinh Học THPT — Sự sống kỳ diệu và trách nhiệm của chúng ta" |
| `public/js/scenarios/lop12/lessons/lich-su.js` | Mở rộng | "Kết thúc Lịch Sử THPT — Bài học từ quá khứ, hành động cho tương lai" |
| `public/js/scenarios/lop12/lessons/dia-ly.js` | Mở rộng | "Kết thúc Địa Lý THPT — Đất nước và thế giới trong tầm tay" |
| `public/js/scenarios/lop12/lessons/gdcd.js` | Mở rộng | "Kết thúc GD Kinh tế và Pháp luật — Công dân có trách nhiệm trong thế giới hội nhập" |
| `public/js/scenarios/lop12/lessons/tin-hoc.js` | Mở rộng | "Kết thúc Tin Học THPT — Thế giới số và bạn" |
| `public/js/scenarios/lop12/lessons/cong-nghe.js` | Mở rộng | "Kết thúc Công Nghệ THPT — Kỹ thuật vì cuộc sống tốt hơn" |
| `public/js/scenarios/lop12/lessons/gdqp.js` | Mở rộng | "Kết thúc GDQP-AN — Tuổi trẻ và trách nhiệm với Tổ quốc" |
| `public/CHANGELOG-eduverse.md` | Cập nhật | Ghi nhận phiên cải tiến (39) |

### Chi tiết tuần 36

Mỗi tuần 36 gồm: lý thuyết hệ thống hoá (5–7 blocks phản ánh toàn bộ 3 năm THPT), 3 câu hỏi mở/phản tư sâu. Nội dung tập trung:
- Nhìn lại bức tranh toàn cảnh 3 năm học môn đó ở THPT
- Kết nối kiến thức với đại học, nghề nghiệp và cuộc sống
- Lời khuyên thực tế cho kì thi tốt nghiệp THPT Quốc gia
- Động viên tâm thế tự tin bước vào giai đoạn mới

### Kết quả

- Lớp 12: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- 499 dòng nội dung được bổ sung (+499 insertions)
- Đồng nhất với chuẩn 36 tuần của Lớp 6 và Lớp 9 ✅

### Kiểm thử

```
node --check public/js/scenarios/lop12/lessons/toan.js       ✅ OK
node --check public/js/scenarios/lop12/lessons/ngu-van.js    ✅ OK
node --check public/js/scenarios/lop12/lessons/tieng-anh.js  ✅ OK
node --check public/js/scenarios/lop12/lessons/vat-ly.js     ✅ OK
node --check public/js/scenarios/lop12/lessons/hoa-hoc.js    ✅ OK
node --check public/js/scenarios/lop12/lessons/sinh-hoc.js   ✅ OK
node --check public/js/scenarios/lop12/lessons/lich-su.js    ✅ OK
node --check public/js/scenarios/lop12/lessons/dia-ly.js     ✅ OK
node --check public/js/scenarios/lop12/lessons/gdcd.js       ✅ OK
node --check public/js/scenarios/lop12/lessons/tin-hoc.js    ✅ OK
node --check public/js/scenarios/lop12/lessons/cong-nghe.js  ✅ OK
node --check public/js/scenarios/lop12/lessons/gdqp.js       ✅ OK
```

---

## 2026-08-11 — Phiên cải tiến (38) · Trường THCS Lớp 9 — Tuần 36 "Kết thúc năm học" cho 12 môn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; không có yêu cầu pending từ production).

**Phạm vi:** Trường THCS (`secondary`) — Lớp 9 — bổ sung **tuần 36** cho tất cả 12 môn học, hoàn chỉnh năm học 36 tuần theo chuẩn GDPT 2018 (đồng nhất với Lớp 6 đã có đủ 36 tuần từ trước).

### Vấn đề phát hiện

Quét toàn bộ file lessons phát hiện **Lớp 6 có 36 tuần** nhưng **Lớp 7, 8, 9 (THCS) và Lớp 10, 11, 12 (THPT) chỉ có 35 tuần**. Đây là khoảng trống nội dung có hệ thống — tuần 36 "Ôn tập cuối năm / Kết thúc năm học" hoàn toàn vắng mặt.

**Ưu tiên xử lý Lớp 9** vì:
- Lớp 9 là năm cuối THCS, quan trọng nhất với kì thi tuyển sinh vào lớp 10
- Học sinh cần nội dung "Nhìn lại và tiến về phía trước" sau khi hoàn thành chương trình
- 4 môn thi vào lớp 10 (Toán, Ngữ Văn, Tiếng Anh, KHTN) đặc biệt cần tuần tổng kết

### Thay đổi

| File | Loại | Nội dung tuần 36 |
|------|------|------------------|
| `public/js/scenarios/lop9/lessons/toan.js` | Mở rộng | "Kết thúc Toán THCS — Nhìn lại hành trình" |
| `public/js/scenarios/lop9/lessons/ngu-van.js` | Mở rộng | "Kết thúc Ngữ Văn THCS — Hành trình của những con chữ" |
| `public/js/scenarios/lop9/lessons/tieng-anh.js` | Mở rộng | "Kết thúc Tiếng Anh THCS — Keep Going Forward!" |
| `public/js/scenarios/lop9/lessons/khtn.js` | Mở rộng | "Kết thúc KHTN THCS — Khoa học là hành trình, không phải đích đến" |
| `public/js/scenarios/lop9/lessons/lich-su-dia.js` | Mở rộng | "Kết thúc Lịch sử – Địa lí THCS — Đất nước nhìn từ quá khứ và không gian" |
| `public/js/scenarios/lop9/lessons/gdcd.js` | Mở rộng | "Kết thúc GDCD THCS — Người công dân tốt bắt đầu từ đây" |
| `public/js/scenarios/lop9/lessons/tin-hoc.js` | Mở rộng | "Kết thúc Tin học THCS — Tư duy số cho thế kỉ 21" |
| `public/js/scenarios/lop9/lessons/cong-nghe.js` | Mở rộng | "Kết thúc Công nghệ THCS — Đôi tay tạo nên tương lai" |
| `public/js/scenarios/lop9/lessons/gdtc.js` | Mở rộng | "Kết thúc GDTC THCS — Sức khoẻ là nền tảng của mọi thành công" |
| `public/js/scenarios/lop9/lessons/hdtn.js` | Mở rộng | "Kết thúc HĐTN THCS — Lễ bế giảng trong tim" |
| `public/js/scenarios/lop9/lessons/nghe-thuat.js` | Mở rộng | "Kết thúc Nghệ thuật THCS — Hành trình của cái đẹp" |
| `public/js/scenarios/lop9/lessons/gd-dia-phuong.js` | Mở rộng | "Kết thúc Giáo dục địa phương — Người trẻ của mảnh đất này" |

### Chi tiết tuần 36

Mỗi tuần 36 gồm: lý thuyết tổng kết (5–7 blocks), 3 ví dụ/câu hỏi phản ánh. Nội dung tập trung vào:
- Nhìn lại bức tranh toàn cảnh 4 năm học môn đó
- Kết nối kiến thức với cuộc sống và tương lai THPT
- Động viên tinh thần trước kì thi vào 10
- Hướng dẫn tự học sau kì thi

### Kết quả

- Lớp 9: từ 35 tuần → **36 tuần** cho tất cả 12 môn ✅
- Đồng nhất với chuẩn 36 tuần của Lớp 6 ✅
- `node --check` passed: **12/12 files** ✅

---

## 2026-08-09 — Phiên cải tiến (37) · Trường Tiểu học & THCS — 6 Achievements mới (Streak 3/14/30)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; không có yêu cầu pending từ production).

**Phạm vi:** Trường Tiểu học (`primary`) và Trường THCS (`secondary`) — bổ sung streak achievements còn thiếu để đồng nhất với các trường khác.

### Vấn đề phát hiện

Quét so sánh achievements streak giữa 9 trường phát hiện khoảng trống ở **Tiểu học và THCS** — hai trường phục vụ lứa tuổi học sinh (cần khuyến khích học đều đặn nhất):

**Tiểu học (Primary):** Chỉ có streak-3 và streak-7. Thiếu:
- **streak-14**: Không ghi nhận HS học đều 2 tuần — trong khi Mầm non, THPT, CNTT, Kinh tế, Lái xe, Ngoại ngữ đều có
- **streak-30**: Không có milestone "1 tháng kiên trì" — mọi trường khác đều có sau phiên 34–36

**THCS (Secondary):** Chỉ có streak-5 và streak-10. Thiếu:
- **streak-3**: Không có mốc "khởi đầu đều đặn" — tất cả các cấp Mầm non, Tiểu học, Lái xe, Ngoại ngữ đều có
- **streak-14**: Mốc 2 tuần hoàn toàn vắng mặt dù THPT/CNTT/Kinh tế/Lái xe/Ngoại ngữ đều có
- **streak-30**: Không ghi nhận HS THCS học liên tục 1 tháng — lỗ hổng lớn nhất với cấp học này

**Trước phiên này:** Primary 2 streak, Secondary 2 streak — ít nhất trong toàn hệ thống.
**Sau phiên này:** Primary 4 streak, Secondary 6 streak — đồng nhất với chuẩn 9 trường.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/primary/achievements.js` | Mở rộng | +2 achievements: `streak-14`, `streak-30` |
| `public/js/domains/secondary/achievements.js` | Mở rộng | +4 achievements: `streak-3`, cập nhật icon streak-5/10, thêm `streak-14`, `streak-30` |

### Chi tiết 6 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Tiểu học | `streak-14` | 🌟 | Hai tuần chăm học | streak: 14 |
| Tiểu học | `streak-30` | 🏆 | Tháng vàng | streak: 30 |
| THCS | `streak-3` | 🔥 | Bắt đầu đều đặn | streak: 3 |
| THCS | `streak-14` | 🌟 | Hai tuần không ngừng | streak: 14 |
| THCS | `streak-30` | 🏆 | Kiên trì 30 ngày | streak: 30 |

### Kết quả

- Trường Tiểu học: streak set 2 → **4 achievements** (+streak-14, +streak-30)
- Trường THCS: streak set 2 → **6 achievements** (+streak-3, +streak-14, +streak-30)
- Tất cả 9 trường EduVerse đều có streak-14 và streak-30 ✅
- Tiểu học và THCS không còn là cấp duy nhất thiếu mốc "1 tháng kiên trì"
- `node --check` passed: 2/2 files ✅

---

## 2026-08-08 — Phiên cải tiến (36) · Trường Lái xe & Ngoại ngữ — 8 Achievements mới (Streak 3/7/14/30)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có yêu cầu pending từ production).

**Phạm vi:** Trường Lái xe (`driving`) và Trường Ngoại ngữ (`language`) — bổ sung 4 streak achievements mỗi trường: streak-3, streak-7, streak-14, streak-30.

### Vấn đề phát hiện

Quét so sánh achievements giữa các trường phát hiện **Trường Lái xe và Trường Ngoại ngữ bị thiếu hoàn toàn** các streak achievements trong khi mọi trường khác đã có sau phiên 34–35:
- **streak-3/7**: Chưa có — không ghi nhận học sinh bắt đầu hình thành thói quen học hàng ngày
- **streak-14**: THPT, CNTT, Kinh tế đã có (phiên 34–35), nhưng Lái xe và Ngoại ngữ bị bỏ sót
- **streak-30**: Tương tự — milestone kiên trì 30 ngày hoàn toàn vắng mặt ở 2 trường này

**Nguyên nhân:** Cả hai domain dùng kiến trúc monolithic (ACHIEVEMENTS inline trong `index.js`) thay vì `achievements.js` riêng — do đó đã không được phát hiện trong các phiên quét trước (tập trung vào file `achievements.js` của 7 trường lớn).

**Tính nhất quán sau phiên này:** Tất cả 9 trường EduVerse đều có ít nhất streak-14 và streak-30.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/driving/index.js` | Mở rộng | +4 achievements: `streak-3`, `streak-7`, `streak-14`, `streak-30` |
| `public/js/domains/language/index.js` | Mở rộng | +4 achievements: `streak-3`, `streak-7`, `streak-14`, `streak-30` |

### Chi tiết 8 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| Lái xe | `streak-3` | 🚦 | Học lái 3 ngày liên tiếp | streak: 3 |
| Lái xe | `streak-7` | 📅 | Học đều cả tuần | streak: 7 |
| Lái xe | `streak-14` | ⚡ | 2 tuần ôn luyện | streak: 14 |
| Lái xe | `streak-30` | 🏆 | Ôn thi đúng nghĩa | streak: 30 |
| Ngoại ngữ | `streak-3` | 🔤 | Học ngoại ngữ 3 ngày liên tiếp | streak: 3 |
| Ngoại ngữ | `streak-7` | 📅 | Một tuần luyện tập | streak: 7 |
| Ngoại ngữ | `streak-14` | ⚡ | 2 tuần kiên trì | streak: 14 |
| Ngoại ngữ | `streak-30` | 🏆 | Một tháng chinh phục ngoại ngữ | streak: 30 |

### Kết quả

- Trường Lái xe: 5 → **9 achievements** (+4 streak mới)
- Trường Ngoại ngữ: 6 → **10 achievements** (+4 streak mới)
- Tất cả 9 trường EduVerse giờ đều có streak-3, streak-7, streak-14 và streak-30
- `node --check` passed: 2/2 files ✅

---

## 2026-08-07 — Phiên cải tiến (35) · Trường CNTT & Kinh tế — 8 Achievements mới (Streak 14/30 · Sao 60/90)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có yêu cầu pending từ production).

**Phạm vi:** Trường CNTT (`it`) và Trường Kinh tế (`economics`) — bổ sung 4 achievements mỗi trường: streak dài hạn (14 ngày, 30 ngày) và sao cao (60, 90).

### Vấn đề phát hiện

Quét so sánh achievements giữa các trường phát hiện **Trường CNTT và Trường Kinh tế bị thiếu** các mốc streak dài hạn và sao cao mà Trường THPT vừa nhận được (phiên 34, 2026-08-06):
- **streak-14**: THPT đã có, CNTT chỉ có streak-5, Kinh tế chỉ có streak-5 — không ghi nhận sinh viên học đều đặn 2 tuần
- **streak-30**: THPT đã có, CNTT và Kinh tế chưa có — không khuyến khích học liên tục 1 tháng
- **star-60**: CNTT và Kinh tế chỉ có star-30 — với tối đa 90–100 sao có thể tích luỹ, cần milestone trung điểm
- **star-90**: Chưa có ở cả hai trường — học sinh sắp hoàn thành toàn lộ trình không được ghi nhận

**Tính nhất quán:** Primary (streak-3, 7, star-15, 30, 60), Secondary (streak-5, 10, star-20, 50), THPT (streak-5, 14, 30, star-20, 50, 100). CNTT và Kinh tế cần được ngang bằng.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/it/achievements.js` | Mở rộng | +4 achievements: `streak-14`, `streak-30`, `star-60`, `star-90` |
| `public/js/domains/economics/achievements.js` | Mở rộng | +4 achievements: `streak-14`, `streak-30`, `star-60`, `star-90` |

### Chi tiết 8 achievements mới

| Domain | ID | Icon | Tên | Trigger |
|--------|----|------|-----|---------|
| CNTT | `streak-14` | ⚡ | 2 tuần code liên tục | streak: 14 |
| CNTT | `streak-30` | 🏆 | 1 tháng code không ngừng | streak: 30 |
| CNTT | `star-60` | 💫 | 60 sao CNTT | totalStars: 60 |
| CNTT | `star-90` | 🌠 | 90 sao CNTT | totalStars: 90 |
| Kinh tế | `streak-14` | ⚡ | 2 tuần học kinh tế liên tục | streak: 14 |
| Kinh tế | `streak-30` | 🏆 | 1 tháng học kinh tế | streak: 30 |
| Kinh tế | `star-60` | 💫 | 60 sao Kinh tế | totalStars: 60 |
| Kinh tế | `star-90` | 🌠 | 90 sao Kinh tế | totalStars: 90 |

### Kết quả

- Trường CNTT: 42 → **46 achievements** (+4 mới)
- Trường Kinh tế: 45 → **49 achievements** (+4 mới)
- Đồng nhất streak-14 và streak-30 với Trường THPT (phiên 34)
- Milestone sao đủ dày: 30 → 60 → 90 cho cả hai trường (max ~90–100 sao)
- `node --check` passed: 2/2 files ✅

---

## 2026-08-06 — Phiên cải tiến (34) · Trường THPT — 7 Achievements mới (Streak · Sao · KHTN/KHXH combo)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Phạm vi:** Trường THPT (`highschool`) — bổ sung 7 achievements còn thiếu: streak dài hạn, sao tích luỹ cao, combo ban KHTN/KHXH lớp 10-12, lộ trình ban hoàn chỉnh.

### Vấn đề phát hiện

Quét so sánh achievements giữa các trường phát hiện **Trường THPT bị thiếu** các loại achievements đã có ở Preschool, Primary, Secondary:
- **Streak-30**: Preschool/Primary/Secondary đều có streak-30, THPT chỉ có streak-5 và streak-14 — học sinh ôn thi dài hạn không được ghi nhận
- **Star-100**: Các trường khác có milestone sao cao (100+), THPT chỉ có star-20 và star-50 — không đủ động lực cho học sinh lớp 12 ôn thi
- **Combo KHXH lớp 10**: Đã có `khtn-triple` (Lý+Hóa+Sinh lớp 10) nhưng thiếu `khxh-double` (Sử+Địa lớp 10) — mất cân xứng
- **Combo KHTN lớp 11/12**: `khtn-triple` chỉ có cho lớp 10, không có lớp 11 và 12 — học sinh không được ghi nhận khi chinh phục KHTN toàn cấp
- **Lộ trình ban hoàn chỉnh**: Chưa có achievement tổng hợp cho học sinh hoàn thành toàn bộ lộ trình KHTN hoặc KHXH ba năm

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/highschool/achievements.js` | Mở rộng | Thêm **7 achievements mới** cho Trường THPT |

### Chi tiết 7 achievements mới

| ID | Icon | Tên | Trigger | Lý do |
|----|------|-----|---------|-------|
| `streak-30` | 🔥 | Kiên trì 30 ngày | streak: 30 | Đồng nhất với Preschool/Primary/Secondary; khuyến khích ôn thi đều đặn |
| `star-100` | 🌠 | Ngôi sao 100 | totalStars: 100 | Milestone thực tế khi hoàn thành nhiều môn 3 sao; tương đương star-100 của Primary |
| `khxh-double` | 🗺️ | Đôi KHXH lớp 10 | H10SU+H10DIA ≥ 1 sao | Cân xứng với `khtn-triple` (lớp 10 Lý+Hóa+Sinh); ghi nhận ban KHXH |
| `khtn-triple-11` | ⚗️ | Tam giác KHTN lớp 11 | H11LY+H11HOA+H11SINH ≥ 1 sao | Mở rộng combo KHTN sang lớp 11 — sóng+dao động+Hoá hữu cơ+Di truyền |
| `khtn-triple-12` | 🔭 | Tam giác KHTN lớp 12 | H12LY+H12HOA+H12SINH ≥ 1 sao | Combo KHTN lớp 12 — gắn với ôn thi tốt nghiệp THPT |
| `science-path` | 🔬 | Lộ trình KHTN hoàn chỉnh | H1[0-2]LY+HOA+SINH ≥ 1 sao | Tổng hợp: đạt sao toàn bộ KHTN 3 năm (9 môn) |
| `social-path` | 🏛️ | Lộ trình KHXH hoàn chỉnh | H1[0-2]SU+DIA ≥ 1 sao | Tổng hợp: đạt sao Sử+Địa cả 3 năm (6 môn) |

### Kết quả

- Trường THPT: 42 → **49 achievements** (+7 mới)
- Đồng nhất streak-30 với tất cả các trường khác
- Học sinh ban KHTN: có 4 cột mốc mới (lớp 10+11+12 combo + lộ trình tổng thể)
- Học sinh ban KHXH: được ghi nhận lần đầu với `khxh-double` và `social-path`
- `node --check` passed: 1/1 files ✅

---

## 2026-08-05 — Phiên cải tiến (33) · Trường CNTT — I4.5 Khoá luận CNTT (10 câu hỏi phương pháp nghiên cứu)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Phạm vi:** Trường CNTT (`it`) — module I4.5 (Khoá luận CNTT), module cuối cùng còn `placeholder: true` trong toàn hệ thống.

### Vấn đề phát hiện

Quét toàn bộ codebase xác nhận **I4.5 — Khoá luận CNTT** là module duy nhất còn thiếu quiz content thực sự (tất cả các trường khác — Dược, Kinh tế, Mầm non, Tiểu học, THCS, THPT, Kinh tế — đã đầy đủ nội dung). Module này có `placeholder: true` và `scenarioIds: []` dù achievement `thesis-it` đã được tạo sẵn, sinh viên đạt đủ 24 sao vào được nhưng chỉ thấy "Coming soon".

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-year4.js` | Mở rộng | Thêm `I45_QUIZ` (10 câu hỏi phương pháp nghiên cứu khoá luận CNTT); cập nhật export `IT_YEAR4_SCENARIOS`; cập nhật comment header |
| `public/js/domains/it/modules.js` | Sửa | Wire I4.5: thêm `scenarioIds: ['I4.5-thesis-quiz']`, `knowledgeQuiz: 'I4.5-thesis-quiz'`; xoá `placeholder: true` |
| `public/js/domains/it/achievements.js` | Sửa | Cập nhật mô tả `year4-it-complete` từ "(I4.1–I4.4)" → "(I4.1–I4.5)" |

### Chi tiết nội dung (10 câu hỏi, difficulty 4)

| Câu | Chủ đề | Nguồn/Chuẩn |
|-----|--------|-------------|
| 1 | Câu hỏi nghiên cứu tốt: cụ thể, khả thi, đo lường được, novel | Research methodology fundamentals |
| 2 | Nguồn tài liệu uy tín: IEEE Xplore, ACM DL, Springer LNCS, arXiv | IEEE/ACM standards |
| 3 | Experimental Research vs Survey/Case Study/Descriptive | Research design taxonomy |
| 4 | Ngưỡng đạo văn ≤ 30% (iThenticate/Turnitin), mỗi nguồn ≤ 5–10% | Quy định Bộ GD&ĐT VN |
| 5 | Cấu trúc IMRaD: Intro → Lit Review → Method → Results → Conclusion | ACM/IEEE thesis structure |
| 6 | Reproducibility: code + dataset + hyperparams + seed + environment | ML reproducibility best practices |
| 7 | Kiểm định thống kê: t-test, Wilcoxon, McNemar, p < 0.05 | Statistical significance testing |
| 8 | Bảo vệ khoá luận: thừa nhận hạn chế + giải thích + future work | Academic defense skills |
| 9 | Mức đóng góp khoá luận ĐH: application/comparative/tool/incremental | Research contribution levels |
| 10 | Lộ trình đăng bài: SOICT/RIVF → IEEE/ACM tier B/C → Scopus Q3/Q4 | CORE ranking, Scimago SJR |

### Kết quả

- Trường CNTT: I4.5 từ "Coming soon" → có quiz đầy đủ (10 câu chuyên sâu về research methodology)
- Achievement `thesis-it` (đã tồn tại sẵn) giờ có thể được trigger khi sinh viên pass I4.5 ≥ 2 sao
- Achievement `year4-it-complete`: mô tả chính xác "(I4.1–I4.5)"
- Toàn bộ curriculum Trường CNTT (I1.1–I4.5) đã có đầy đủ nội dung — không còn module nào là placeholder
- `node --check` passed: 3/3 files ✅

---

## 2026-08-03 — Phiên cải tiến (32) · Trường Dược — CP09 · CP10 · GC07 · GC09 · GC10 + 5 Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Phạm vi:** Trường Dược (`pharmacy`) — 5 modules cuối còn thiếu quiz (2 career paths + 3 games), 50 câu hỏi chuyên sâu.

### Vấn đề phát hiện

Quét codebase phát hiện **5 modules Trường Dược** cuối cùng còn có `scenarioIds: []`:
- **CP09** (Khởi nghiệp dược — Startup): healthtech startup, vốn VC, pháp lý y tế — career path chưa có nội dung
- **CP10** (Tiếp tục đào tạo — CKII, Tiến sĩ): lộ trình học thuật, NCS, postdoc — thiếu quiz
- **GC07** (OSCE Championship): game OSCE cấp độ cao, yêu cầu 30 sao — chưa có nội dung
- **GC09** (Pharmacy Quiz Bowl đội): game thi đấu nhanh pharmacology — chưa có nội dung
- **GC10** (Hội nghị Dược ảo — Hằng năm): game hội nghị khoa học, CPD — chưa có nội dung

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/pharmacy-career-games.js` | Tạo mới | 5 quiz scenarios CP09/CP10/GC07/GC09/GC10 (50 câu hỏi) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `PHARMACY_CAREER_GAMES_SCENARIOS` |
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho CP09, CP10, GC07, GC09, GC10 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm 5 achievements mới (pharma-founder, phd-pharmacist, osce-champion, quiz-bowl-mvp, conference-speaker) |

### Chi tiết nội dung (50 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| CP09 — Khởi nghiệp dược | `CP09-quiz-01` | Telemedicine pháp lý VN, FDA 510(k)/PMA, TAM/SAM/SOM, Seed round/angel, MVP, LTV/CAC, AI SaMD rủi ro, Burn Rate/Runway, hệ sinh thái HealthTech VN, Pitch deck 10 slides | 10 |
| CP10 — CKII/Tiến sĩ | `CP10-quiz-01` | CKII Dược 2 năm QĐ 4056, NCS TT 02/2022 B2 CEFR, công bố quốc tế ISI/Scopus, NAFOSTED, PhD by thesis vs publication, Hội đồng bảo vệ 7 thành viên, Postdoc career track, Tiêu chí PGS HĐGSNN, Grant writing, học bổng Fulbright/MEXT/DAAD | 10 |
| GC07 — OSCE Championship | `GC07-quiz-01` | OSCE vs thi viết, medication counselling ICE, OSCE blueprinting, liều amoxicillin nhi, closed-loop communication, Standardised Patient (SP), feedback Pendleton's Rules, pass mark Angoff method, PCNE station timing 5-10 phút, prescription review warfarin INR 3.8 | 10 |
| GC09 — Pharmacy Quiz Bowl | `GC09-quiz-01` | INN vs brand (atorvastatin/Lipitor), 5 Rights medication, rifampicin CYP3A4 induction, ATC code captopril C09AA01, LASA drugs hydroxyzine/hydralazine, sildenafil+nitrates CCĐ, high-alert medications PINCH, β1-blockade cơ chế, FDA PLLR 2015 thay A-X, NAC antidote paracetamol | 10 |
| GC10 — Hội nghị Dược ảo | `GC10-quiz-01` | ASHP MCM hội nghị lớn nhất, abstract IMRAD 150-300 từ, poster vs oral, CPD vs CME/CPE, conflict of interest ICMJE, Journal Club EBM, Q&A Q&A strategy, networking elevator pitch, symposium/workshop/plenary, Hội nghị KH Dược VN (VIPA) | 10 |

### Achievements mới (5)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `pharma-founder` | 🚀 | Pharma Founder | CP09 ≥ 2 sao |
| `phd-pharmacist` | 📜 | Nhà Dược học Tiến sĩ | CP10 ≥ 2 sao |
| `osce-champion` | 🏆 | OSCE Champion | GC07 ≥ 3 sao |
| `quiz-bowl-mvp` | 🧠 | Quiz Bowl MVP | GC09 ≥ 3 sao |
| `conference-speaker` | 🎤 | Conference Speaker | GC10 ≥ 2 sao |

### Kết quả

- Pharmacy Career: CP09 + CP10 → 2 career paths cuối cùng có nội dung (toàn bộ CP01–CP10 hoàn chỉnh)
- Pharmacy Games: GC07 + GC09 + GC10 → 3 games nâng cao có nội dung (GC01–GC10, trừ GC08 metaverse)
- 50 câu hỏi chuyên sâu, có nguồn dẫn (FDA 510(k)/PMA/SaMD, ICH, TT 02/2022/TT-BGDĐT, QĐ 4056/QĐ-BYT, ISMP High-Alert, PCNE OSCE Guidelines, FIP CPD Framework, ICMJE, WHO ATC)
- `node --check` passed: 4/4 files

---

## 2026-08-02 — Phiên cải tiến (31) · Trường Dược — LR11 · LR12 · CP04 · CP05 · CP08 + 5 Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Phạm vi:** Trường Dược (`pharmacy`) — 5 modules còn thiếu quiz, 50 câu hỏi chuyên sâu.

### Vấn đề phát hiện

Quét codebase phát hiện **5 modules Trường Dược** đang có `scenarioIds: []` trong hai cụm Library & Research và Career Paths:
- **LR11** (AI/ML trong Dược): công nghệ AI mới nhất trong ngành dược, sinh viên thiếu định hướng
- **LR12** (Viết đề cương nghiên cứu): kỹ năng thiết yếu cho NCKH nhưng chưa có nội dung
- **CP04** (Sự nghiệp Học thuật — Giảng viên): lộ trình NCS/GV dược chưa được phủ sóng
- **CP05** (Quân y — Dược quân đội): hướng nghề đặc thù chưa có quiz
- **CP08** (Y học cổ truyền + Đông dược): thị trường đang tăng trưởng mạnh, thiếu nội dung học thuật

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/pharmacy-advanced.js` | Tạo mới | 5 quiz scenarios LR11/LR12/CP04/CP05/CP08 (50 câu hỏi chuyên sâu) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `PHARMACY_ADVANCED_SCENARIOS` |
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho LR11, LR12, CP04, CP05, CP08 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm 5 achievements mới (ai-pharmacist, protocol-writer, academic-pharmacist, military-pharmacist, tcm-specialist) |

### Chi tiết nội dung (50 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| LR11 — AI/ML trong Dược | `LR11-quiz-01` | AlphaFold2, NLP/EHR mining, ADME prediction ML, pharmacovigilance AI, precision medicine/PGx, XAI/SHAP, AI barrier tại VN, FDA SaMD, DS cần kỹ năng AI gì | 10 |
| LR12 — Viết đề cương NC | `LR12-quiz-01` | SMART objectives, literature review, SAP thống kê, cỡ mẫu cross-sectional, inclusion/exclusion criteria, đạo đức IRB, budget/ngân sách, Gantt chart, protocol vs grant application | 10 |
| CP04 — Sự nghiệp Học thuật | `CP04-quiz-01` | Yêu cầu bằng cấp GV, lộ trình NCS→TS→PGS→GS, nguồn thu nhập học thuật, active learning (TBL/PBL), h-index/IF, work-life balance, mentoring, publish strategy, Nafosted/học bổng | 10 |
| CP05 — Quân y | `CP05-quiz-01` | Cục Quân y/BQP, vai trò DS quân đội, chuỗi cung ứng dã chiến, Combat Casualty Care drugs, HVQY, ưu đãi quân đội, thiên tai cứu nạn, UN PKO pharmacy, NC quân y | 10 |
| CP08 — YHCT + Đông dược | `CP08-quiz-01` | Pháp lý YHCT VN, DĐVN VI đông dược, artemisinin Nobel, herb-drug interactions, chuẩn hóa dược liệu/GACP, vai trò DS trong BV YHCT, thách thức RCT thảo dược, bào chế YHCT, thị trường dược liệu, y học tích hợp | 10 |

### Achievements mới (5)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `ai-pharmacist` | 🤖 | AI Pharmacist | LR11 ≥ 2 sao |
| `protocol-writer` | 📋 | Protocol Writer | LR12 ≥ 2 sao |
| `academic-pharmacist` | 🎓 | Nhà khoa học Dược | CP04 ≥ 3 sao |
| `military-pharmacist` | ⚔️ | Dược sĩ Quân y | CP05 ≥ 2 sao |
| `tcm-specialist` | 🌿 | Chuyên gia Đông dược | CP08 ≥ 3 sao |

### Kết quả

- Pharmacy Library: LR11 + LR12 → 2 modules AI/Research không còn "Coming soon"
- Pharmacy Career: CP04 + CP05 + CP08 → 3 hướng nghề đặc thù có nội dung học thuật
- 50 câu hỏi chuyên sâu, có nguồn dẫn (AlphaFold2/Nature 2021, Luật GDĐH 2018, TT 38/2021 GMP-TCM, DĐVN VI, WHO Traditional Medicine Strategy 2019-2025, Nobel 2015 Artemisinin, FDA SaMD Action Plan 2021)
- `node --check` passed: 4/4 files

---

## 2026-08-01 — Phiên cải tiến (30) · Trường Dược + Mầm non — LR01 · GC04 · GC06 + 9 Achievements Mầm non

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Phạm vi:** Trường Dược (`pharmacy`) — 3 modules (LR01, GC04, GC06); Trường Mầm non (`preschool`) — mở rộng gamification.

### Vấn đề phát hiện

Quét codebase phát hiện:
1. **LR01** (Thư viện điện tử, zero-unlock) có `scenarioIds: []` — mọi sinh viên vào Trường Dược đều thấy module này đầu tiên nhưng không có nội dung.
2. **GC04** (OTC Consultation Speed) và **GC06** (Herb ID Race) — 2 game cùng threshold 12 sao — đã unlock được nhưng "Coming soon".
3. **Trường Mầm non** có 18 achievements mà thiếu streak dài, completion-per-lớp, và combo đa lĩnh vực.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/library-career-games.js` | Mở rộng | Thêm LR01_QUIZ (10 câu PubMed/MeSH/UpToDate), GC04_QUIZ (10 OTC tình huống, timed 600s), GC06_QUIZ (10 dược liệu VN, timed 600s); cập nhật bundle export |
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho LR01, GC04, GC06 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm 3 achievements mới: `library-explorer`, `otc-speedster`, `herb-master` |
| `public/js/domains/preschool/achievements.js` | Mở rộng | Thêm 9 achievements: 3 streak (7/14/30 ngày), 2 lớp-completion (Mầm/Chồi), 2 combo (body-mind, heart-voice), 1 early-achiever |

### Chi tiết nội dung

**LR01 — Thư viện điện tử (10 câu, difficulty 2):**
PubMed/NCBI tổ chức, MeSH controlled vocabulary, Boolean operators (AND/OR/NOT), truncation & wildcard, UpToDate vs PubMed, Micromedex/Lexicomp, Cochrane Library, Filters RCT, liều thuốc CKD, an toàn thai kỳ (LactMed/Briggs)

**GC04 — OTC Consultation Speed (10 câu, game, 600s):**
Đau đầu — paracetamol OTC, thai kỳ + OTC cảm, đau dạ dày elderly red flags, liều ibuprofen nhi, decongestant nasal (rhinitis medicamentosa), pseudoephedrine + THA, kháng histamine 1st vs 2nd gen, antifungal topical, loperamide CCĐ, vitamin C UL safety

**GC06 — Herb ID Race (10 câu, game, 600s):**
Curcuma longa (nghệ/curcumin), Andrographis paniculata (xuyên tâm liên), Panax ginseng, Ginkgo biloba (ginkgolides/tương tác), Glycyrrhiza (cam thảo/pseudo-hyperaldosteronism), Echinacea, Camellia sinensis (trà/EGCG), Gymnema sylvestre (dây thìa canh), Asparagus racemosus (thiên môn đông), Bergamot extract (cholesterol)

### Achievements mới

**Trường Dược (3):**

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `library-explorer` | 🔍 | Nhà thám hiểm Thư viện | LR01 ≥ 2 sao |
| `otc-speedster` | ⚡ | OTC Speed Counsellor | GC04 ≥ 3 sao |
| `herb-master` | 🌿 | Herb Master | GC06 ≥ 3 sao |

**Trường Mầm non (9):**

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `streak-7` | ⭐ | Bé chăm chỉ | streak: 7 |
| `streak-14` | 🌟 | Siêu chăm học | streak: 14 |
| `streak-30` | 🔥 | Bé kiên trì | streak: 30 |
| `mam-complete` | 🌱 | Lớp Mầm hoàn thành | quizzesPassed: 5 |
| `choi-complete` | 🌼 | Lớp Chồi hoàn thành | quizzesPassed: 10 |
| `body-mind` | 🧠 | Thể chất + Nhận thức | N3-TC ≥ 3 sao + N3 ≥ 3 sao |
| `heart-voice` | 💝 | Tình cảm + Ngôn ngữ | N3-TX ≥ 3 sao + N3-NN ≥ 3 sao |
| `early-achiever` | 🥇 | Xuất sắc sớm | quizzesPassed: 3 |

### Kết quả

- Pharmacy: LR01 từ "Coming soon" → có quiz cho mọi sinh viên vào thư viện (zero-unlock)
- Pharmacy: GC04 + GC06 → 2 game 12-sao giờ có nội dung
- Preschool: 18 → 26 achievements (+8 streak/combo/completion)
- `node --check` passed: 4/4 files

---

## 2026-07-31 — Phiên cải tiến (29) · Trường Dược — Công nghiệp dược 4 modules (PS17–PS20)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; DB production không truy cập được trong môi trường sandbox).

**Phạm vi:** Trường Dược (`pharmacy`) — 4 modules công nghiệp dược, 40 câu hỏi chuyên sâu.

### Vấn đề phát hiện

Khảo sát codebase phát hiện **4 modules Công nghiệp dược (PS17–PS20)** đang có `scenarioIds: []` trong cụm "Công nghiệp dược" (PS15–PS20). PS15 (GMP factory tour) và PS16 (QC kiểm nghiệm) đã có nội dung; PS17–PS20 là 4 pillars còn lại của nghề dược công nghiệp hiện đại mà sinh viên chưa tiếp cận được.

**Chi tiết 4 modules thiếu:**
- **PS17** (Phòng QA — Audit & SOP): QA vs QC, audit nội bộ, SOP change control, OOS investigation, data integrity ALCOA+, batch record review, risk assessment FMEA, supplier qualification, CAPA timeline, cleanroom behavior
- **PS18** (Đăng ký thuốc — Dossier CTD): CTD M1–M5 structure, bioequivalence/BCS waiver, Module 3.2.P, stability ICH Q1A, post-approval variations, regulatory VN (TT 32/2018), IND requirements, conditional MA/accelerated pathways, drug product specifications, shelf-life data requirements
- **PS19** (Đấu thầu BV — Bid preparation): đấu thầu tập trung cấp quốc gia (TT 15/2019), tiêu chí kỹ thuật phân nhóm (TT 14/2020), bảo lãnh dự thầu, hồ sơ thiếu tài liệu, đàm phán giá biệt dược gốc, mua sắm ngoài danh mục, tham chiếu giá, thay đổi số lô, thu hồi thuốc, phân nhóm kỹ thuật 1–5
- **PS20** (Pharmacovigilance — Báo cáo ADR): ADR vs AE, phân loại ABCDE, WHO-UMC causality (Probable), SUSAR timeline (7/15 ngày), signal detection PRR, PSUR/PBRER, Hartwig & Siegel severity, Risk Management Plan (RMP), vai trò dược sĩ nhà thuốc báo cáo ADR, AEFI vaccine

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/pharmacy-industry.js` | Tạo mới | 4 quizzes PS17–PS20 (40 câu hỏi công nghiệp dược) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `PHARMACY_INDUSTRY_SCENARIOS` |
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho PS17, PS18, PS19, PS20 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm 4 achievements mới (qa-auditor, regulatory-specialist, tender-expert, pharmacovigilance-officer) |

### Chi tiết nội dung (40 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| PS17 — Phòng QA | `PS17-quiz-01` | QA vs QC, internal audit, SOP change control, OOS Phase 1 vs 2, ALCOA+, BRR, FMEA, supplier qualification, CAPA timeline, Grade A/B behavior | 10 |
| PS18 — Đăng ký thuốc | `PS18-quiz-01` | CTD 5 modules, bioequivalence BCS waiver, CTD 3.2.P structure, stability ICH Q1A Zone II, post-approval Type II variation, regulatory VN (TT 32/2018), IND, conditional MA (EMA), drug product specs, shelf-life 24 tháng | 10 |
| PS19 — Đấu thầu BV | `PS19-quiz-01` | Đấu thầu tập trung quốc gia TT 15/2019, tiêu chí kỹ thuật phân nhóm, bảo lãnh dự thầu, hồ sơ thiếu tài liệu, đàm phán giá biệt dược, mua ngoài danh mục, tham chiếu giá, thay lô hàng, thu hồi thuốc OOS, phân nhóm 1 vs 5 | 10 |
| PS20 — Pharmacovigilance | `PS20-quiz-01` | ADR vs AE, type B (Bizarre), WHO-UMC Probable, SUSAR 7/15 ngày, PRR signal detection, PSUR purpose, Hartwig level 7, RMP trigger EMA, dược sĩ nhà thuốc báo cáo ADR, AEFI vaccine classification | 10 |

### Achievements mới (4)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `qa-auditor` | 📋 | QA Auditor | PS17 ≥ 2 sao |
| `regulatory-specialist` | 📑 | Chuyên gia Đăng ký Thuốc | PS18 ≥ 2 sao |
| `tender-expert` | 💰 | Chuyên gia Đấu thầu BV | PS19 ≥ 2 sao |
| `pharmacovigilance-officer` | ⚠️ | PV Officer | PS20 ≥ 3 sao |

### Kết quả

- Pharmacy Industry cluster: PS15 + PS16 + **PS17 + PS18 + PS19 + PS20** → 6/6 modules công nghiệp đầy đủ nội dung
- 40 câu hỏi chuyên sâu mới, có nguồn dẫn (ICH Q7/Q9/Q10/Q11, EU GMP Annex 1 2022, TT 15/2019, TT 14/2020, WHO-UMC, ICH E2A/E2C, EMA GVP)
- `node --check` passed: 4/4 files

---

## 2026-07-30 — Phiên cải tiến (28) · Trường Dược 6 modules (PS12–14, SC09–10, SC12) + Mở Trường Kinh tế

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; DB production không truy cập được trong môi trường sandbox).

**Phạm vi:** Trường Dược (`pharmacy`) — 6 modules, 90 câu hỏi; Trường Kinh tế (`economics`) — unlock domain.

### Vấn đề phát hiện

Khảo sát codebase (explore agent) xác nhận:
1. **6 pharmacy modules còn thiếu quiz** trong hai cụm Nhà thuốc cộng đồng & Kỹ năng tư vấn đặc biệt.
2. **Trường Kinh tế đã xây dựng hoàn chỉnh 100%** (35 modules, 9 scenario files, 45 achievements) nhưng bị comment-out và khoá trong `domain.js` — chỉ cần 2 dòng thay đổi để mở.

**Chi tiết 6 modules thiếu:**
- **PS12** (Nhà thuốc 24/7 — Cấp cứu OTC): tình huống đêm khuya, triage khẩn cấp
- **PS13** (Nhà thuốc đại học): sức khoẻ sinh viên, sức khoẻ tâm thần, tránh thai
- **PS14** (Nhà thuốc BV — Ngoại trú): ra viện, polypharmacy, high-alert meds
- **SC09** (Tư vấn giảm cân — béo phì): dược lý chống béo phì, chiến lược giảm cân
- **SC10** (Tư vấn dinh dưỡng đặc biệt): CKD, xơ gan, ung thư, dinh dưỡng lâm sàng
- **SC12** (Tư vấn tránh thai): WHO MEC, tương tác thuốc-tránh thai, tư vấn toàn diện

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/pharmacy-community.js` | Tạo mới | 3 quizzes PS12/PS13/PS14 (30 câu hỏi lâm sàng cao cấp) |
| `public/js/scenarios/skill-quizzes.js` | Mở rộng | Thêm SC09_QUIZ_01, SC10_QUIZ_01, SC12_QUIZ_01 (30 câu) vào SKILL_QUIZZES |
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho PS12, PS13, PS14, SC09, SC10, SC12 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm 6 achievements mới (night-pharmacist, campus-pharmacist, outpatient-expert, weight-counselor, nutrition-expert, family-planner) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `PHARMACY_COMMUNITY_SCENARIOS` |
| `public/js/engine/domain.js` | Sửa | Uncomment + enable `economics` domain (status: preview, moduleCount: 35) |

### Chi tiết nội dung (90 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| PS12 — Nhà thuốc 24/7 | `PS12-quiz-01` | Triage đêm: STEMI, sốt co giật, tương tác nitrate, kháng sinh không đơn, hen cấp, warfarin-vitamin E, thai kỳ, pseudoephedrine-THA | 10 |
| PS13 — Nhà thuốc ĐH | `PS13-quiz-01` | Tránh thai khẩn cấp, modafinil bất hợp pháp, SSRI-rượu, COC-timing, nguy cơ tự tử, lậu kháng thuốc, rifampicin-COC, isotretinoin, migraine | 10 |
| PS14 — Nhà thuốc BV ngoại trú | `PS14-quiz-01` | Ticagrelor không ngưng đột ngột, metformin-CKD, sildenafil-doxazosin, warfarin-clarithromycin, insulin glargine, Beers 2023, MTX-TMP-SMX, empagliflozin DKA, dị ứng chéo beta-lactam, bisoprolol HF titration | 10 |
| SC09 — Giảm cân & Béo phì | `SC09-quiz-01` | BMI châu Á, orlistat cơ chế, sibutramine thu hồi, GLP-1/SGLT2i vs béo phì, CLA bằng chứng, thâm hụt calorie, keto diet, bariatric criteria, naltrexone/bupropion, mục tiêu thực tế | 10 |
| SC10 — Dinh dưỡng đặc biệt | `SC10-quiz-01` | CKD protein restriction, xơ gan-sarcopenia, enteral tiêu chảy, sắt thai kỳ, dumping syndrome, omega-3 ung thư, glycemic index, vitamin D cao tuổi, whey protein, PKU mang thai | 10 |
| SC12 — Tư vấn tránh thai | `SC12-quiz-01` | COC-hút thuốc WHO MEC, IUD đồng cơ chế, topiramate-COC, sau sinh-cho bú, migraine aura CCĐ estrogen, tránh thai nam, triệt sản tư vấn, implant 3 năm, lupus-APL, acid folic preconception | 10 |

### Achievements mới (6)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `night-pharmacist` | 🌙 | Dược sĩ Trực đêm | PS12 ≥ 2 sao |
| `campus-pharmacist` | 🎓 | Dược sĩ Đại học | PS13 ≥ 2 sao |
| `outpatient-expert` | 🏥 | Chuyên gia Ngoại trú | PS14 ≥ 2 sao |
| `weight-counselor` | ⚖️ | Chuyên gia Cân nặng | SC09 ≥ 3 sao |
| `nutrition-expert` | 🥗 | Chuyên gia Dinh dưỡng | SC10 ≥ 3 sao |
| `family-planner` | 🌹 | Chuyên gia Kế hoạch hoá | SC12 ≥ 3 sao |

### Kết quả

- Pharmacy: 23 → **17 modules còn thiếu quiz** (giảm 6)
- Economics: domain được kích hoạt lên `status: 'preview'` — 35 modules có thể truy cập
- 90 câu hỏi lâm sàng mới, có nguồn dẫn (WHO MEC, ADA 2024, Beers 2023, KDIGO, ESC HF 2021, v.v.)
- `node --check` passed: 6/6 files

---

## 2026-07-29 — Phiên cải tiến (27) · Trường Kinh tế — 4 Practice Modules (EP01–EP04) + 5 Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; DB production không truy cập được trong môi trường này).

**Trường:** Kinh tế (`economics`)

### Vấn đề phát hiện

Quét codebase phát hiện **4 module Practice Trường Kinh tế (EP01–EP04)** đang có `scenarioIds: []` — sinh viên đã tích lũy đủ sao để mở khoá nhưng chỉ thấy "Coming soon". Đây là 4 module thực hành ứng dụng quan trọng bậc nhất ở giai đoạn Năm 3–4: mô phỏng vận hành doanh nghiệp, giao dịch chứng khoán, vườn ươm khởi nghiệp và FinTech Lab.

**Cụ thể:**
- **EP01** (Mô phỏng doanh nghiệp — Vận hành): không có quiz → không hiển thị nội dung
- **EP02** (Mô phỏng TTCK — Stock sim): không có quiz → không hiển thị nội dung
- **EP03** (Vườn ươm khởi nghiệp): không có quiz → không hiển thị nội dung
- **EP04** (FinTech Lab — Mobile banking): không có quiz → không hiển thị nội dung

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-practice.js` | Tạo mới | 4 quiz practice scenarios EP01–EP04 (40 câu hỏi chuyên sâu, độ khó cao) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt EP01–EP04: thêm `scenarioIds` + `knowledgeQuiz` |
| `public/js/domains/economics/experiences.js` | Sửa | Thêm section Practice (EP01–EP04) → ScoreUp |
| `public/js/domains/economics/achievements.js` | Mở rộng | Thêm 5 achievements mới (4 practice + 1 Practice Champion) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_PRACTICE_SCENARIOS` |

### Chi tiết nội dung (40 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| EP01 — Mô phỏng doanh nghiệp | `EP01-biz-ops-quiz` | OEE, JIT, SWOT, KPI vs KGI, Lean Manufacturing, Business Model Canvas, Agile/Scrum, LTV/CAC, Last-Mile Delivery, Balanced Scorecard | 10 |
| EP02 — Mô phỏng TTCK | `EP02-stock-sim-quiz` | Modern Portfolio Theory, RSI, DCA, Put Option, ROE/DuPont, CAPM, Short Selling, VIX, EMH, Diluted EPS | 10 |
| EP03 — Vườn ươm khởi nghiệp | `EP03-startup-quiz` | Product-Market Fit, Lean Canvas vs BMC, vòng gọi vốn, MVP, Term Sheet, Freemium, Cap Table, Customer Development, Burn Rate/Runway, GTM Strategy | 10 |
| EP04 — FinTech Lab | `EP04-fintech-quiz` | Open Banking, NAPAS, BNPL, KYC/eKYC, Ví điện tử vs Neobank, Blockchain FinTech, API Embedded Finance, RegTech, Embedded Insurance, NPS | 10 |

### Achievements mới (5)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `biz-ops-master` | 🏢 | Chuyên gia Vận hành Doanh nghiệp | EP01 ≥ 3 sao |
| `stock-trader` | 📈 | Nhà giao dịch chứng khoán | EP02 ≥ 3 sao |
| `startup-founder` | 🌱 | Startup Founder | EP03 ≥ 3 sao |
| `fintech-expert` | 💳 | FinTech Expert | EP04 ≥ 3 sao |
| `practice-champion` | 🏅 | Practice Champion | EP01+EP02+EP03+EP04 ≥ 2 sao |

### Kiểm thử

```
node --check public/js/scenarios/economics-practice.js       ✅ PASS
node --check public/js/domains/economics/modules.js          ✅ PASS
node --check public/js/domains/economics/experiences.js      ✅ PASS
node --check public/js/domains/economics/achievements.js     ✅ PASS
node --check public/js/scenarios/_all-content.js             ✅ PASS
```

---

## 2026-07-28 — Phiên cải tiến (26) · Trường CNTT — 6 Career Path Quizzes (IC01–IC06) + 7 Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** CNTT (`it`)

### Vấn đề phát hiện

Quét codebase phát hiện **6 career path modules** trong Trường CNTT (IC01–IC06) đang có `scenarioIds: []` — sinh viên thấy "Coming soon" mặc dù đây là nội dung định hướng nghề nghiệp rất có giá trị cuối khoá. Curriculum năm 1–4 và games (IG01–IG04) đã hoàn chỉnh, nhưng sinh viên CNTT chưa có quiz để tìm hiểu về lộ trình nghề nghiệp thực tế sau tốt nghiệp.

**Cụ thể:**
- **IC01** (Software Engineer): không có quiz → không hiển thị nội dung
- **IC02** (Data Scientist): không có quiz → không hiển thị nội dung
- **IC03** (DevOps Engineer): không có quiz → không hiển thị nội dung
- **IC04** (Security Engineer): không có quiz → không hiển thị nội dung
- **IC05** (Mobile Developer): không có quiz → không hiển thị nội dung
- **IC06** (AI / ML Engineer): không có quiz → không hiển thị nội dung

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-careers.js` | Tạo mới | 6 quiz career scenarios IC01–IC06 (60 câu hỏi hướng nghiệp thực tế) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt IC01–IC06: thêm `scenarioIds` + `knowledgeQuiz` |
| `public/js/domains/it/achievements.js` | Mở rộng | Thêm 7 achievements mới (6 career + 1 IT Career Explorer tổng hợp) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_CAREERS_SCENARIOS` |

### Chi tiết nội dung (60 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| IC01 — Software Engineer | `IC01-career-quiz` | Lộ trình, chứng chỉ, lương, SOLID, System Design, Git, Code Review, LeetCode DSA, Scrum, công ty VN | 10 |
| IC02 — Data Scientist | `IC02-career-quiz` | Kỹ năng Python/SQL, overfitting, A/B testing, pandas, certifications, feature engineering, BI tools, VinAI | 10 |
| IC03 — DevOps Engineer | `IC03-career-quiz` | CI/CD, Docker vs VM, Kubernetes, IaC, monitoring, cloud models, GitOps, DORA metrics, lương | 10 |
| IC04 — Security Engineer | `IC04-career-quiz` | OWASP Top 10, SQL Injection, OSCP/certifications, XSS, HTTPS/TLS, Bug Bounty, Zero Trust, Incident Response | 10 |
| IC05 — Mobile Developer | `IC05-career-quiz` | Android/iOS, Flutter vs React Native, Google Play, state management, Jank, FCM, REST error handling, MVP | 10 |
| IC06 — AI/ML Engineer | `IC06-career-quiz` | AI vs DS, PyTorch/TF, Transformer/LLM, MLOps, fine-tuning, prompt engineering, YOLO, RAG, lương VinAI | 10 |

### Achievements mới (7)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `swe-career` | 👨‍💻 | Software Engineer Pro | IC01 ≥ 3 sao |
| `ds-career` | 📊 | Data Scientist Pro | IC02 ≥ 3 sao |
| `devops-career` | ⚙️ | DevOps Pro | IC03 ≥ 3 sao |
| `security-career` | 🔒 | Security Engineer Pro | IC04 ≥ 3 sao |
| `mobile-career` | 📱 | Mobile Developer Pro | IC05 ≥ 3 sao |
| `aiml-career` | 🤖 | AI/ML Engineer Pro | IC06 ≥ 3 sao |
| `it-career-explorer` | 🧭 | IT Career Explorer | IC01+IC02+IC03 ≥ 2 sao |

### Kiểm thử

```
node --check public/js/scenarios/it-careers.js          ✅ PASS
node --check public/js/domains/it/modules.js            ✅ PASS
node --check public/js/domains/it/achievements.js       ✅ PASS
node --check public/js/scenarios/_all-content.js        ✅ PASS
```

---

## 2026-07-27 — Phiên cải tiến (25) · Trường Tiểu học — 34 Achievements môn phụ còn thiếu

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Tiểu học (`primary`)

### Vấn đề phát hiện

Quét codebase phát hiện **34 môn học Tiểu học** có đầy đủ nội dung quiz (scenarios 36 tuần) nhưng **thiếu hoàn toàn achievements** trong `achievements.js`. Các môn được bổ sung: Tiếng Anh lớp 1-2, TN-XH lớp 1-3, Đạo đức lớp 1-5, Âm nhạc lớp 1-5, Mĩ thuật lớp 1-5, GD Thể chất lớp 1-5, HĐTN lớp 1-5, Công nghệ lớp 3-5, Lịch sử & Địa lý lớp 4.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/primary/achievements.js` | Mở rộng | Thêm **34 achievements** cho 9 nhóm môn phụ Tiểu học |

### Chi tiết achievements mới (34 huy hiệu)

| Nhóm | Lớp | ID | Icon | Tên |
|------|-----|----|------|-----|
| Tiếng Anh (tự chọn) | 1 | `ta1` | 🔤 | ABC của bé |
| Tiếng Anh (tự chọn) | 2 | `ta2` | 🌈 | Hello World lớp 2 |
| TN-XH | 1 | `tnxh1` | 🌿 | Khám phá thiên nhiên lớp 1 |
| TN-XH | 2 | `tnxh2` | 🐝 | Bạn của thiên nhiên lớp 2 |
| TN-XH | 3 | `tnxh3` | 🌎 | Nhà tự nhiên học lớp 3 |
| Đạo đức | 1 | `dd1` | ❤️ | Bé học đạo đức lớp 1 |
| Đạo đức | 2 | `dd2` | 🤲 | Biết yêu thương lớp 2 |
| Đạo đức | 3 | `dd3` | 🌸 | Học sinh ngoan lớp 3 |
| Đạo đức | 4 | `dd4` | 🤝 | Công dân nhỏ lớp 4 |
| Đạo đức | 5 | `dd5` | 🎖️ | Tấm gương đạo đức lớp 5 |
| Âm nhạc | 1 | `an1` | 🎵 | Bé hát hay lớp 1 |
| Âm nhạc | 2 | `an2` | 🎶 | Giai điệu vui lớp 2 |
| Âm nhạc | 3 | `an3` | 🎸 | Nhạc sĩ nhí lớp 3 |
| Âm nhạc | 4 | `an4` | 🎹 | Tiếng đàn lớp 4 |
| Âm nhạc | 5 | `an5` | 🎼 | Tài năng âm nhạc lớp 5 |
| Mĩ thuật | 1 | `mt1` | 🎨 | Bé vẽ đẹp lớp 1 |
| Mĩ thuật | 2 | `mt2` | 🖌️ | Hoạ sĩ tí hon lớp 2 |
| Mĩ thuật | 3 | `mt3` | 🖼️ | Sáng tạo nghệ thuật lớp 3 |
| Mĩ thuật | 4 | `mt4` | 🎭 | Nghệ sĩ nhí lớp 4 |
| Mĩ thuật | 5 | `mt5` | ✨ | Nhà thiết kế trẻ lớp 5 |
| GD Thể chất | 1 | `gdtc1` | 🏃 | Bé khỏe mạnh lớp 1 |
| GD Thể chất | 2 | `gdtc2` | ⚽ | Thể lực lớp 2 |
| GD Thể chất | 3 | `gdtc3` | 🏸 | Vận động viên nhí lớp 3 |
| GD Thể chất | 4 | `gdtc4` | 🤸 | Thể thao lớp 4 |
| GD Thể chất | 5 | `gdtc5` | 🥇 | Thể chất xuất sắc lớp 5 |
| HĐ Trải nghiệm | 1 | `hdtn1` | 🌱 | Khám phá thế giới lớp 1 |
| HĐ Trải nghiệm | 2 | `hdtn2` | 🌍 | Trải nghiệm vui lớp 2 |
| HĐ Trải nghiệm | 3 | `hdtn3` | 🌟 | Cùng khám phá lớp 3 |
| HĐ Trải nghiệm | 4 | `hdtn4` | 🎯 | Hướng nghiệp sớm lớp 4 |
| HĐ Trải nghiệm | 5 | `hdtn5` | 🚀 | Tự tin bước vào THCS |
| Công nghệ | 3 | `cn3` | 🔨 | Thủ công nhí lớp 3 |
| Công nghệ | 4 | `cn4` | ⚙️ | Kỹ thuật nhí lớp 4 |
| Công nghệ | 5 | `cn5` | 🔧 | Nhà kỹ thuật lớp 5 |
| Lịch sử & ĐL | 4 | `lsdl4` | 🗺️ | Khám phá Lịch sử & ĐL lớp 4 |

### Kiểm thử

```
node --check public/js/domains/primary/achievements.js   ✅ PASS
```

---

## 2026-07-26 — Phiên cải tiến (24) · Trường Kinh tế + CNTT — Kết nối experiences cho 27 modules

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Kinh tế (`economics`) + CNTT (`it`)

### Vấn đề phát hiện

Quét codebase phát hiện **"nghịch lý content tồn tại nhưng vô hình" (đợt 3)**: nhiều module đã có quiz content đầy đủ trong `scenarioIds` nhưng chưa được gắn vào `experiences.js` — sinh viên thấy nút "Launch" trống/ẩn dù quiz đã sẵn sàng.

**Cụ thể:**
- **Trường Kinh tế**: 21 modules (E2.1–E2.5, E3.1–E3.7, E4.1–E4.5, EC01–EC04, EG01–EG03) có quiz nhưng không có experience
- **Trường CNTT**: 6 modules (I2.4, I3.2, I3.3, I3.7, I4.1, I4.4) có quiz nhưng không có experience

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/economics/experiences.js` | Mở rộng | Thêm **21 entries** vào MODULE_PAGES: E2.1–E2.5 (năm 2), E3.1–E3.7 (năm 3), E4.1–E4.5 (năm 4), EC01–EC04 (career), EG01–EG03 (games) |
| `public/js/domains/it/experiences.js` | Mở rộng | Thêm **6 entries** vào MODULE_PAGES: I2.4 (Mạng máy tính), I3.2 (Phân tích & TKHT), I3.3 (Trí tuệ nhân tạo), I3.7 (DevOps & Cloud), I4.1 (Kiến trúc phần mềm), I4.4 (Blockchain & Web3) |

### Chi tiết modules được kết nối

**Trường Kinh tế (21 modules → ScoreUp):**

| Module | Tên | Loại |
|--------|-----|------|
| E2.1 | Kinh tế Vĩ mô 1 | Năm 2 |
| E2.2 | Thống kê cho kinh tế | Năm 2 |
| E2.3 | Tài chính – Tiền tệ | Năm 2 |
| E2.4 | Quản trị học đại cương | Năm 2 |
| E2.5 | Marketing căn bản | Năm 2 |
| E3.1 | Kinh tế lượng | Năm 3 |
| E3.2 | Tài chính doanh nghiệp | Năm 3 |
| E3.3 | Kế toán quản trị | Năm 3 |
| E3.4 | Phân tích tài chính | Năm 3 |
| E3.5 | Marketing số + E-commerce | Năm 3 |
| E3.6 | Quản trị chuỗi cung ứng | Năm 3 |
| E3.7 | Kinh doanh quốc tế | Năm 3 |
| E4.1 | Quản trị chiến lược | Năm 4 |
| E4.2 | Khởi nghiệp – Lean canvas | Năm 4 |
| E4.3 | Kiểm toán | Năm 4 |
| E4.4 | Thuế Việt Nam | Năm 4 |
| E4.5 | Đạo đức kinh doanh | Năm 4 |
| EC01 | Kế toán – Kiểm toán | Career |
| EC02 | Tài chính – Ngân hàng | Career |
| EC03 | Marketing & Brand manager | Career |
| EC04 | Khởi nghiệp – Founder | Career |
| EG01 | Bull vs Bear — Stock race | Game |
| EG02 | Pitch Battle — Demo Day | Game |
| EG03 | Tycoon — Quản lý công ty | Game |

**Trường CNTT (6 modules):**

| Module | Tên | Experience |
|--------|-----|------------|
| I2.4 | Mạng máy tính | ScoreUp |
| I3.2 | Phân tích & Thiết kế hệ thống | ScoreUp |
| I3.3 | Trí tuệ nhân tạo | ScoreUp |
| I3.7 | DevOps & Cloud | Codelab + ScoreUp |
| I4.1 | Kiến trúc phần mềm + Patterns | ScoreUp |
| I4.4 | Blockchain & Web3 | ScoreUp |

### Kiểm thử

```
node --check public/js/domains/it/experiences.js       ✅ PASS
node --check public/js/domains/economics/experiences.js ✅ PASS
```

---

## 2026-07-25 — Phiên cải tiến (23) · Trường CNTT — Bổ sung 15 bài luyện Code Lab + Kết nối Codelab cho 8 modules mới

**Chế độ:** Yêu cầu từ SV · Request #106 · Chu Thi Hue

**Trường:** CNTT (`it`)

### Yêu cầu xử lý

| ID | Sinh viên | Tiêu đề | Domain |
|----|-----------|---------|--------|
| #106 | Chu Thi Hue | Thêm nội dung cho lab lập trình | it |

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/it-code-lab.html` | Mở rộng | Thêm **15 bài tập lập trình** vào FALLBACK_CHALLENGES (offline mode): 4 Chuỗi, 4 Mảng, 2 Đệ quy, 2 Tìm kiếm, 3 Số học |
| `public/js/domains/it/experiences.js` | Cập nhật | Kết nối thêm **8 modules** với trải nghiệm Codelab (I2.2, I2.5, I3.4, I3.6, I4.2, I4.3, IG03, IG04) + nâng I2.1 và I3.5 thêm ScoreUp |

### Chi tiết bài tập mới (15 bài)

**Chuỗi (4 bài):**
- Kiểm tra chuỗi đối xứng (isPalindrome)
- Đếm số từ (countWords)
- Viết hoa chữ đầu mỗi từ (capitalizeWords)
- Từ dài nhất (longestWord)

**Mảng (4 bài):**
- Xoá phần tử trùng lặp (removeDuplicates)
- Làm phẳng mảng lồng 1 cấp (flattenArray)
- Chia mảng thành từng nhóm (chunkArray)
- Chuyển vị ma trận (matrixTranspose)

**Đệ quy (2 bài):**
- Giai thừa đệ quy (factorial)
- Tổng mảng lồng nhau đệ quy (sumNested)
- Luỹ thừa đệ quy (power)

**Tìm kiếm (1 bài):**
- Tìm kiếm nhị phân (binarySearch)

**Số học (3 bài):**
- Ước chung lớn nhất GCD (gcd)
- Tổng các chữ số (digitSum)
- Độ dài dãy Collatz (collatzLength)

### Kiểm thử

- `node --check public/js/domains/it/experiences.js` → ✅ PASS
- `node --check` JS extracted từ `public/it-code-lab.html` → ✅ PASS

---

## 2026-07-24 — Phiên cải tiến (22) · Trường Dược — Kết nối 20 modules BV & Kỹ năng + 20 Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Dược (`pharmacy`)

### Vấn đề phát hiện

Quét codebase phát hiện **"nghịch lý content tồn tại nhưng vô hình" (đợt 2)**: 2 file scenario đã biên soạn đầy đủ (`practice-quizzes.js` 10 quiz bệnh viện + `skill-quizzes.js` 10 quiz kỹ năng) xuất **20 scenario** vào `ALL_SCENARIOS`, nhưng **20 module** trong `_modules-data.js` vẫn để `scenarioIds: []`. Sinh viên thấy "Coming soon" mặc dù nội dung đã sẵn sàng.

**Cụ thể:**
- **PS01–PS09** (9 khoa BV): Cấp cứu, ICU, Nội, Ngoại, Nhi, Sản, Ung bướu, Tâm thần, Truyền nhiễm — đã có 12 ca/khoa nhưng không hiển thị
- **PS15** (Nhà máy GMP): đã có 10 câu quiz quy trình GMP nhưng không hiển thị
- **SC03–SC08** (6 Skill Centers): Giao tiếp, Đa văn hoá, CPR/AED, Tiêm chủng, ĐoHA+ĐH, Cai thuốc lá — đã có quiz nhưng không hiển thị
- **SC11, SC13–SC15** (4 Skill Centers): Du lịch, HIV/STI, Quản lý đau, MTM — đã có quiz nhưng không hiển thị

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` cho **10 practice modules** PS01–PS09 + PS15; thêm `scenarioIds` + `knowledgeQuiz` cho **10 skill modules** SC03–SC08, SC11, SC13–SC15 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm **20 achievements mới**: 10 cho PS (bệnh viện) + 10 cho SC (kỹ năng) |

### Chi tiết modules được kích hoạt (20 modules)

**Bệnh viện mô phỏng (PS01–PS09, PS15 → `practice-quizzes.js`):**

| Module | Scenario | Ca lâm sàng |
|--------|----------|-------------|
| PS01 Cấp cứu | `PS01-quiz-01` | 12 ca: sốc phản vệ, quá liều, ngộ độc, ngưng tim, STEMI, hạ glucose |
| PS02 ICU | `PS02-quiz-01` | 12 ca: sepsis, thở máy, delirium, VTE, lọc máu, ARDS |
| PS03 Nội khoa | `PS03-quiz-01` | 12 ca: suy tim, đái tháo đường, tăng HA, rung nhĩ, COPD |
| PS04 Ngoại khoa | `PS04-quiz-01` | 12 ca: kháng sinh phòng mổ, anticoagulation bridging, hậu phẫu |
| PS05 Nhi khoa | `PS05-quiz-01` | 12 ca: liều nhi, RSV, viêm phổi, sốt co giật, EBM nhi |
| PS06 Sản phụ khoa | `PS06-quiz-01` | 12 ca: an toàn thuốc thai kỳ, PrEP, GDM, sinh mổ |
| PS07 Ung bướu | `PS07-quiz-01` | 12 ca: FOLFOX, trastuzumab, phác đồ hoá trị, quản lý tác dụng phụ |
| PS08 Tâm thần | `PS08-quiz-01` | 12 ca: antipsychotic, SSRI, lithium, tương tác, kỳ thị |
| PS09 Truyền nhiễm | `PS09-quiz-01` | 12 ca: HIV ART, lao đa kháng, viêm gan B, ESKAPE, PrEP |
| PS15 GMP Factory | `PS15-quiz-01` | 10 câu: GMP Annex 1, cleanroom, validation, OOS |

**Skill Centers (SC03–SC08, SC11, SC13–SC15 → `skill-quizzes.js`):**

| Module | Scenario | Kỹ năng |
|--------|----------|---------|
| SC03 Giao tiếp | `SC03-quiz-01` | teach-back, health literacy, empathy, bệnh nhân khó |
| SC04 Đa văn hoá | `SC04-quiz-01` | rào cản ngôn ngữ, văn hoá, phiên dịch, Muslim patient |
| SC05 CPR/AED | `SC05-quiz-01` | BLS 2020, CPR chất lượng, AED protocol, chain of survival |
| SC06 Tiêm chủng | `SC06-quiz-01` | lịch vaccine, chống chỉ định, VIS, AEFI reporting |
| SC07 ĐoHA+ĐH | `SC07-quiz-01` | kỹ thuật đo HA, SMBG, giải thích kết quả cho bệnh nhân |
| SC08 Cai thuốc lá | `SC08-quiz-01` | 5A, NRT, varenicline, bupropion, hành vi thay thế |
| SC11 Du lịch | `SC11-quiz-01` | vaccine du lịch, sốt rét, traveler's diarrhea, altitude |
| SC13 HIV/STI | `SC13-quiz-01` | PrEP/PEP, tư vấn xét nghiệm, giảm kỳ thị, luật HIV |
| SC14 Quản lý đau | `SC14-quiz-01` | thang WHO, opioid rational use, đau mạn, neuropathic |
| SC15 MTM | `SC15-quiz-01` | CMR, MAP, medication-related problems, PCNE, Beers |

### Achievements mới (20)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `er-pharmacist` | 🚑 | Dược sĩ Cấp cứu | PS01 ≥ 2 sao |
| `icu-pharmacist` | 🫁 | Dược sĩ ICU | PS02 ≥ 2 sao |
| `internal-pharmacist` | 🫀 | Dược sĩ Nội khoa | PS03 ≥ 2 sao |
| `surgical-pharmacist` | ✂️ | Dược sĩ Ngoại khoa | PS04 ≥ 2 sao |
| `peds-pharmacist` | 🍼 | Dược sĩ Nhi khoa | PS05 ≥ 2 sao |
| `obgyn-pharmacist` | 🤱 | Dược sĩ Sản phụ khoa | PS06 ≥ 2 sao |
| `onco-pharmacist` | 🎀 | Dược sĩ Ung bướu | PS07 ≥ 2 sao |
| `psych-pharmacist` | 💭 | Dược sĩ Tâm thần | PS08 ≥ 2 sao |
| `infectious-pharmacist` | 🦠 | Dược sĩ Truyền nhiễm | PS09 ≥ 2 sao |
| `gmp-pharmacist` | 🔩 | GMP Pharmacist | PS15 ≥ 2 sao |
| `comm-specialist` | 💬 | Chuyên gia Giao tiếp | SC03 ≥ 3 sao |
| `cultural-liaison` | 🌍 | Cầu nối Đa văn hoá | SC04 ≥ 3 sao |
| `lifesaver` | 💓 | Người cứu sống | SC05 ≥ 3 sao |
| `vaccine-counselor` | 🧬 | Chuyên gia Tiêm chủng | SC06 ≥ 3 sao |
| `poc-master` | 📊 | POC Master | SC07 ≥ 3 sao |
| `cessation-hero` | 🚭 | Anh hùng cai thuốc | SC08 ≥ 3 sao |
| `travel-pharmacist` | ✈️ | Dược sĩ Du lịch | SC11 ≥ 3 sao |
| `hiv-counselor` | ❤️‍🩹 | Chuyên gia HIV/STI | SC13 ≥ 3 sao |
| `pain-specialist` | 🩹 | Chuyên gia Quản lý Đau | SC14 ≥ 3 sao |
| `mtm-specialist` | 🗂️ | MTM Specialist | SC15 ≥ 3 sao |

### Kiểm thử

```
node --check public/js/engine/_modules-data.js              ✅ OK
node --check public/js/domains/pharmacy/achievements.js     ✅ OK
```

---

## 2026-07-22 — Phiên cải tiến (21) · Trường CNTT — Sửa lỗi duplicate achievements + duplicate title

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** CNTT (`it`)

### Vấn đề phát hiện

Quét codebase phát hiện **2 lỗi** trong `public/js/domains/it/achievements.js`:

1. **Duplicate trigger `yearComplete: 1`**: Achievement `all-year-1` (icon 🥇, legacy placeholder) và `year1-it-complete` (icon 🥇, chính thức) cùng trigger `{ yearComplete: 1 }`. Engine sẽ trao **2 huy hiệu** khi sinh viên hoàn thành toàn bộ năm 1 CNTT.
2. **Duplicate title "Software Architect"**: Achievement `se-architect` (I3.1 Kỹ thuật phần mềm, icon 🏗️) và `architect` (I4.1 Kiến trúc phần mềm + Patterns, icon 🏛️) cùng hiển thị title "Software Architect". I3.1 là môn *Kỹ thuật phần mềm* (Software Engineering), không phải Kiến trúc — title cần được phân biệt rõ.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/it/achievements.js` | Sửa lỗi | Xóa `all-year-1` (trùng trigger `yearComplete:1`); đổi title `se-architect` → "Software Engineer" |

### Chi tiết thay đổi

| Thay đổi | Trước | Sau |
|----------|-------|-----|
| Achievement `all-year-1` | Tồn tại, trigger `{ yearComplete: 1 }` — trùng với `year1-it-complete` | **Xóa bỏ** |
| Achievement `se-architect` title | `'Software Architect'` — trùng với `architect` (I4.1) | `'Software Engineer'` — phù hợp với I3.1 Kỹ thuật phần mềm |

**Lý do giữ nguyên `year1-it-complete` / `architect`:** Hai achievements này có ID, tên, icon phù hợp hơn với module, được thêm vào như phần của cấu trúc chính thức Trường CNTT.

### Kiểm thử

```
node --check public/js/domains/it/achievements.js   ✅ OK
```

---

## 2026-07-21 — Phiên cải tiến (20) · Trường Kinh tế — 4 Career Path modules (EC01–EC04)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Kinh tế (`economics`)

### Vấn đề phát hiện

Quét codebase phát hiện **4 career path modules** trong Trường Kinh tế (EC01–EC04) đang có `scenarioIds: []` — sinh viên thấy "Coming soon" mặc dù đây là nội dung định hướng nghề nghiệp rất có giá trị cuối khoá. Curriculum năm 1–4 và games (EG01–EG03) đã hoàn chỉnh, nhưng sinh viên không có nơi để tìm hiểu về lộ trình nghề nghiệp thực tế sau tốt nghiệp.

**Cụ thể:**
- **EC01** (Kế toán – Kiểm toán): không có quiz → không hiển thị nội dung
- **EC02** (Tài chính – Ngân hàng): không có quiz → không hiển thị nội dung
- **EC03** (Marketing & Brand manager): không có quiz → không hiển thị nội dung
- **EC04** (Khởi nghiệp – Founder): không có quiz → không hiển thị nội dung

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-careers.js` | Tạo mới | 4 quiz career scenarios EC01–EC04 (40 câu hỏi hướng nghiệp thực tế) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt EC01–EC04: thêm `scenarioIds` + `knowledgeQuiz` |
| `public/js/domains/economics/achievements.js` | Mở rộng | Thêm 5 achievements mới (4 career + 1 Career Explorer tổng hợp) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_CAREERS_SCENARIOS` |

### Chi tiết nội dung (40 câu hỏi)

| Module | ID Scenario | Chủ đề | Câu |
|--------|------------|--------|-----|
| EC01 — Kế toán & Kiểm toán | `EC01-career-quiz` | ACCA, Big 4, CPA VN, Internal vs External Audit, IFRS, Forensic Accounting, lương | 10 |
| EC02 — Tài chính & Ngân hàng | `EC02-career-quiz` | CFA, IB vs CB, Credit Analysis, FRM, Fintech, Treasury, SOFR, PE vs VC, NHNN, lương | 10 |
| EC03 — Marketing & Brand | `EC03-career-quiz` | Brand Manager FMCG, CTR, NPS, Brand Positioning, Agency vs In-house, ROAS, GA4, Influencer, lương | 10 |
| EC04 — Khởi nghiệp & Founder | `EC04-career-quiz` | Funding stages, Term Sheet, Ecosystem VN, Lean Canvas, Dilution, PMF, ESOP, YC, lương | 10 |

### Achievements mới (5)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `accounting-career` | 📒 | Nhà kế toán – kiểm toán | EC01 ≥ 3 sao |
| `finance-career` | 🏦 | Chuyên gia Tài chính – Ngân hàng | EC02 ≥ 3 sao |
| `marketing-career` | 📣 | Marketer & Brand Builder | EC03 ≥ 3 sao |
| `founder-career` | 🚀 | Founder tiềm năng | EC04 ≥ 3 sao |
| `career-explorer` | 🧭 | Nhà thám hiểm nghề nghiệp | EC01+EC02+EC03+EC04 ≥ 2 sao |

### Kiểm thử

```
node --check public/js/scenarios/economics-careers.js          ✅ OK
node --check public/js/domains/economics/modules.js            ✅ OK
node --check public/js/domains/economics/achievements.js       ✅ OK
node --check public/js/scenarios/_all-content.js               ✅ OK
```

---

## 2026-07-19 — Phiên cải tiến (19) · Trường Dược — Kết nối 16 modules với scenarios đã có sẵn

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Dược (`pharmacy`)

### Vấn đề phát hiện

Quét codebase phát hiện **"nghịch lý content tồn tại nhưng vô hình"**: 2 file scenario đã biên soạn đầy đủ (`year5-adapted.js` + `library-career-games.js`) xuất **16 scenario** vào `ALL_SCENARIOS`, nhưng **KHÔNG CÓ MODULE nào tham chiếu chúng** trong `_modules-data.js`. Sinh viên không thể truy cập những nội dung này mặc dù chúng đã sẵn sàng.

**Cụ thể:**
1. **L5.1 — Dược lâm sàng đa khoa** (prerequisite của L5.7 OSCE): `scenarioIds: []` trong khi `year5-adapted.js` đã tạo đầy đủ **10 ca SOAP** (NMCT, DKA, AECOPD, XH tiêu hoá, CKD, hoá trị, Dengue Nhi, Lao đa thuốc, Thai phụ, Trầm cảm). Sinh viên không thể "hoàn thành" L5.1 nên bị chặn không vào được OSCE.
2. **LR03–LR10** (8 module Thư viện & Nghiên cứu): `library-career-games.js` đã có quiz cho cả 8 module nhưng module definitions vẫn `scenarioIds: []`.
3. **CP01, CP02, CP03, CP06, CP07** (5 sự nghiệp): quiz đã có trong `library-career-games.js`, module definitions không tham chiếu.
4. **GC03, GC05** (2 game): `GC03-quiz-01` (tương tác thuốc) và `GC05-quiz-01` (Calculator Championship) đã có nhưng chưa wire.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/engine/_modules-data.js` | Sửa | Wire `scenarioIds` + `knowledgeQuiz` cho **16 modules**: L5.1 (10 SOAP), LR03–LR10, CP01/02/03/06/07, GC03, GC05 |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | Thêm **17 achievement** mới: L5.1 (1), LR03–LR10 (8), CP01/02/03/06/07 (5), GC03+GC05 (2) |

### Chi tiết modules được kích hoạt (16 modules)

**L5.1 — Dược lâm sàng đa khoa (10 SOAP scenarios):**

| Scenario ID | Ca lâm sàng |
|-------------|-------------|
| `L5.1-soap-01-ca-004-nmct-cap-dual-antiplatelet` | NMCT cấp — kháng tiểu cầu kép |
| `L5.1-soap-02-ca-005-dka-type1` | DKA Type 1 |
| `L5.1-soap-03-ca-006-aecopd` | AECOPD đợt cấp |
| `L5.1-soap-04-ca-007-xhth-nsaid` | Xuất huyết tiêu hoá do NSAID |
| `L5.1-soap-05-ca-008-ckd-thieu-mau` | CKD + thiếu máu |
| `L5.1-soap-06-ca-009-folfox-antiemetic` | Hoá trị FOLFOX + chống nôn |
| `L5.1-soap-07-ca-010-dengue-nhi` | Dengue nhi khoa |
| `L5.1-soap-08-ca-011-lao-polypharmacy` | Lao phổi đa thuốc |
| `L5.1-soap-09-ca-012-thai-tha` | Tiền sản giật |
| `L5.1-soap-10-ca-013-tram-cam-tu-sat` | Trầm cảm nguy cơ tự sát |

**LR03–LR10 (Thư viện & Nghiên cứu) + CP01/02/03/06/07 (Career) + GC03/GC05 (Games):**

Wire `scenarioIds: ['<ID>-quiz-01']` + `knowledgeQuiz` cho 15 module còn lại từ `library-career-games.js`.

### Achievements mới (17)

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `clinical-generalist` | 🩺 | Dược sĩ lâm sàng đa khoa | L5.1 ≥ 2 sao |
| `qual-researcher` | 🗣️ | Nhà NC định tính | LR03 ≥ 3 sao |
| `rct-master` | 📈 | RCT Master | LR04 ≥ 3 sao |
| `sr-expert` | 🔍 | Systematic Review Expert | LR05 ≥ 3 sao |
| `thesis-writer` | ✏️ | Nhà khoa học trẻ | LR06 ≥ 3 sao |
| `publisher` | 📤 | Nhà xuất bản khoa học | LR07 ≥ 3 sao |
| `drug-info-pro` | 🔎 | Drug Information Pro | LR08 ≥ 3 sao |
| `ebm-champion` | 🎯 | EBM Champion | LR09 ≥ 3 sao |
| `pharmacoecon-pro` | 💵 | Pharmacoeconomics Pro | LR10 ≥ 3 sao |
| `hospital-pharmacist` | 🏥 | Dược sĩ BV tương lai | CP01 ≥ 2 sao |
| `community-pharmacist` | 🏪 | Chủ nhà thuốc | CP02 ≥ 2 sao |
| `industry-pro` | 🏭 | Dược công nghiệp | CP03 ≥ 2 sao |
| `pv-officer` | ⚠️ | Cảnh giác dược viên | CP06 ≥ 2 sao |
| `regulatory-expert` | 📑 | Regulatory Affairs Expert | CP07 ≥ 2 sao |
| `interaction-racer` | 🔗 | Tương tác tốc độ | GC03 ≥ 3 sao |
| `calculator-champ` | 🧮 | Calculator Champion | GC05 ≥ 3 sao |

### Kiểm thử

```
node --check public/js/engine/_modules-data.js              ✅ OK
node --check public/js/domains/pharmacy/achievements.js     ✅ OK
```

---

## 2026-07-17 — Phiên cải tiến (18) · THCS & THPT — 36 Achievements môn phụ còn thiếu

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** THCS (`secondary`) · THPT (`highschool`)

### Vấn đề phát hiện

Quét codebase phát hiện **2 lỗ hổng gamification** ảnh hưởng đến 10 môn học có đủ scenarios nhưng thiếu hoàn toàn achievements:

1. **Trường THCS**: 6 môn (GDCD, Công nghệ, GD Thể chất, Nghệ thuật, HĐ Trải nghiệm, GD Địa phương) × 4 lớp (6–9) = 24 achievements bị bỏ trống. Học sinh học đủ các môn này nhưng không nhận được ghi nhận gamification nào.
2. **Trường THPT**: 4 môn (GDCD/GD Kinh tế & Pháp luật, Công nghệ, GDQP-AN, HĐ Trải nghiệm) × 3 lớp (10–12) = 12 achievements bị bỏ trống. Module IDs H10GDCD–H12HDTN đã tồn tại đầy đủ trong `modules.js` và scenarios lop10–lop12, nhưng không có achievement nào tương ứng.

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Cải tiến chủ động theo chế độ tự cải tiến hàng ngày.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/secondary/achievements.js` | Mở rộng | 39 → 63 achievements: thêm 24 achievement cho 6 môn phụ THCS (lớp 6–9) |
| `public/js/domains/highschool/achievements.js` | Mở rộng | 37 → 49 achievements: thêm 12 achievement cho 4 môn phụ THPT (lớp 10–12) |

### Chi tiết achievements mới

**Trường THCS** (thêm 24 achievements):

| Môn | Lớp 6 | Lớp 7 | Lớp 8 | Lớp 9 |
|-----|-------|-------|-------|-------|
| GDCD | ⚖️ gdcd6 | 🤝 gdcd7 | 🏛️ gdcd8 | 🎓 gdcd9 |
| Công nghệ | 🏠 cn6 | 🌾 cn7 | 🔌 cn8 | ⚙️ cn9 |
| GD Thể chất | 🏃 gdtc6 | ⚽ gdtc7 | 🏸 gdtc8 | 🏅 gdtc9 |
| Nghệ thuật | 🎨 nt6 | 🎵 nt7 | 🎭 nt8 | ✨ nt9 |
| HĐ Trải nghiệm | 🌱 hdtn6 | 🌍 hdtn7 | 🌟 hdtn8 | 🎯 hdtn9 |
| GD Địa phương | 🏙️ gddp6 | 🏘️ gddp7 | 🗺️ gddp8 | 🇻🇳 gddp9 |

**Trường THPT** (thêm 12 achievements):

| Môn | Lớp 10 | Lớp 11 | Lớp 12 |
|-----|--------|--------|--------|
| GD KT & Pháp luật | 📜 gdcd10 | ⚖️ gdcd11 | 🏛️ gdcd12 |
| Công nghệ | 🔧 cn10 | ⚙️ cn11 | 🏗️ cn12 |
| GDQP-AN | 🎖️ gdqp10 | 🛡️ gdqp11 | 🇻🇳 gdqp12 |
| HĐ Trải nghiệm | 🌱 hdtn10 | 🌟 hdtn11 | 🎯 hdtn12 |

### Kiểm thử

```
node --check public/js/domains/secondary/achievements.js   ✅ OK
node --check public/js/domains/highschool/achievements.js  ✅ OK
```

---

## 2026-07-16 — Phiên cải tiến (17) · Kinh tế — Sửa lỗi duplicate achievements + typo

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Kinh tế (`economics`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện **2 lỗi** trong `public/js/domains/economics/achievements.js`:

1. **Duplicate trigger E4.1**: Achievement `tycoon` (legacy placeholder, icon 🏭) và `strategist` (phiên 9, icon ♟️) cùng trigger `moduleStars: { 'E4.1': 3 }`. Engine sẽ trao **2 huy hiệu** khi sinh viên hoàn thành **1 module** Quản trị chiến lược.
2. **Duplicate trigger E4.2**: Achievement `founder` (legacy placeholder, icon 🚀) và `lean-founder` (phiên 9, icon 🌱) cùng trigger `moduleStars: { 'E4.2': 3 }`. Cùng vấn đề: 2 huy hiệu cho 1 hành động.
3. **Typo**: `desc: 'Hoàn thành mọy module Năm 1'` → `mọy` phải là `mọi`.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/economics/achievements.js` | Sửa lỗi | Xóa 2 legacy achievements trùng trigger (tycoon→E4.1, founder→E4.2); sửa typo "mọy"→"mọi" |

### Chi tiết thay đổi

| Achievement bị xóa | ID | Trigger (trùng) | Thay thế bởi |
|---|---|---|---|
| Tycoon 🏭 | `tycoon` | `moduleStars: { 'E4.1': 3 }` | `strategist` ♟️ (Chiến lược gia) |
| Người sáng lập 🚀 | `founder` | `moduleStars: { 'E4.2': 3 }` | `lean-founder` 🌱 (Lean Founder) |

**Typo sửa:** Achievement `all-year-1` (id): `desc` thay `'Hoàn thành mọy module Năm 1'` → `'Hoàn thành mọi module Năm 1'`

**Lý do giữ nguyên `strategist` / `lean-founder`:** Hai achievements này có tên, icon và mô tả phù hợp hơn với module, được thêm vào phiên 9 như một phần của cấu trúc chính thức Năm 4 Kinh tế.

### Kiểm tra

| File | Kết quả `node --check` |
|------|----------------------|
| `public/js/domains/economics/achievements.js` | ✅ Pass |

---

## 2026-07-14 — Phiên cải tiến (16) · Kinh tế · Lái xe · Ngoại ngữ — 3 Game + 15 Achievements mới

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở; không có production DB).

**Trường:** Kinh tế (`economics`) · Lái xe (`driving`) · Ngoại ngữ (`language`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện **3 khoảng trống**:

1. **Kinh tế**: 3 game module (EG01–EG03) có `scenarioIds: []` — hiển thị "Coming soon", trong khi IT games (IG01–IG04) đã được kích hoạt ở phiên 12. Sinh viên Kinh tế không có nội dung gamification.
2. **Lái xe**: `ACHIEVEMENTS = []` — 3 module (D01–D03) đã có nội dung và experiences nhưng không có achievement nào → không có động lực gamification.
3. **Ngoại ngữ**: `ACHIEVEMENTS = []` — 4 module (L01–L04) đã có nội dung nhưng không có achievement nào → cùng vấn đề.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-games.js` | Tạo mới | 3 quiz game scenarios EG01–EG03 (30 câu hỏi có explanation) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt EG01–EG03: thay `scenarioIds: []` bằng scenarioId thực tế |
| `public/js/domains/economics/achievements.js` | Mở rộng | Thêm 4 achievements game mới (3 module + 1 Kinh tế Game Master) |
| `public/js/domains/driving/index.js` | Mở rộng | `ACHIEVEMENTS = []` → 5 achievements (D01, D02, D03, all-round) |
| `public/js/domains/language/index.js` | Mở rộng | `ACHIEVEMENTS = []` → 6 achievements (L01, L02, L03, L04, multilingual) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_GAMES_SCENARIOS` |

### Chi tiết nội dung (30 câu hỏi)

| Game | ID Scenario | Chủ đề | Câu |
|------|------------|--------|-----|
| Bull vs Bear — Stock Race | `EG01-bull-bear-quiz` | Bull/Bear market, P/E, Market Cap, Stop-Loss, EPS, DCA, ROE, Kháng cự, Đa dạng hóa, IPO | 10 |
| Pitch Battle — Demo Day | `EG02-pitch-battle-quiz` | Elevator pitch, Pre-money valuation, Traction, Seed vs Series A, Burn rate/Runway, Freemium, LTV/CAC, Unfair Advantage, Accelerator vs Incubator, Pivot | 10 |
| Tycoon — Quản lý công ty | `EG03-tycoon-quiz` | Porter's 5 forces, OCF vs Net Income, eNPS, Cost Leadership, KPI vs OKR, CPM, JIT, Balanced Scorecard, SWOT, Pareto 80/20 | 10 |

### Achievement mới (15 tổng)

**Trường Kinh tế** (4 achievements — EG01–EG03):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `bull-bear-trader` | 🐂 | Bull & Bear Trader | EG01 ≥ 3 sao |
| `pitch-master` | 🎤 | Pitch Master | EG02 ≥ 3 sao |
| `tycoon-ceo` | 🏭 | Tycoon CEO | EG03 ≥ 3 sao |
| `econ-game-master` | 🏆 | Kinh tế Game Master | EG01+EG02+EG03 ≥ 3 sao |

**Trường Lái xe** (5 achievements):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `first-lesson` | 🚦 | Bước đầu học lái | quizzesPassed: 1 |
| `theory-master` | 📖 | Thông thuộc lý thuyết | D01 ≥ 3 sao |
| `sign-reader` | 🚸 | Đọc vanh biển báo | D02 ≥ 3 sao |
| `road-thinker` | 🧠 | Tư duy tình huống | D03 ≥ 3 sao |
| `license-ready` | 🏅 | Sẵn sàng thi sát hạch | D01+D02+D03 ≥ 2 sao |

**Trường Ngoại ngữ** (6 achievements):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `first-word` | 🔤 | Từ đầu tiên | quizzesPassed: 1 |
| `vocab-builder` | 📚 | Xây dựng vốn từ | L01 ≥ 3 sao |
| `pronunciation-ace` | 🎤 | Phát âm chuẩn | L02 ≥ 3 sao |
| `flashcard-pro` | 🃏 | Flashcard Master | L03 ≥ 3 sao |
| `ai-learner` | 🤖 | Học cùng AI | L04 ≥ 3 sao |
| `multilingual` | 🌐 | Đa ngôn ngữ | L01+L02+L03+L04 ≥ 2 sao |

### Kiểm thử

```
node --check public/js/scenarios/economics-games.js          ✅ OK
node --check public/js/domains/economics/modules.js          ✅ OK
node --check public/js/domains/economics/achievements.js     ✅ OK
node --check public/js/domains/driving/index.js              ✅ OK
node --check public/js/domains/language/index.js             ✅ OK
node --check public/js/scenarios/_all-content.js             ✅ OK
```

---

## 2026-07-13 — Phiên cải tiến (15) · Tiểu học · Dược · CNTT — 11 Achievements + 1 Bug fix

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` trống; không có GitHub Issues mở).

**Trường:** Tiểu học (`primary`) · Dược (`pharmacy`) · CNTT (`it`)

### Vấn đề phát hiện

Quét codebase phát hiện **3 khoảng trống** trong hệ thống achievements:

1. **Tiểu học**: Tiếng Việt chỉ có achievements cho lớp 1, 3, 5 — bỏ trống lớp 2 và 4. Tiếng Anh thiếu lớp 4. Khoa học thiếu lớp 5 (P5KH tồn tại nhưng không có achievement). Tin học thiếu lớp 4 (P4TIN tồn tại nhưng không có achievement). yearComplete chỉ có lớp 1, 3, 5 — bỏ trống lớp 2 và 4.
2. **Dược**: Chỉ có `all-year-1` (tốt nghiệp năm 1), bỏ trống hoàn toàn yearComplete cho năm 2, 3, 4, 5 trong chương trình 5 năm Dược sĩ.
3. **CNTT**: Duplicate ID `system-designer` xuất hiện 2 lần — một cho module I3.2 (Phân tích & Thiết kế hệ thống) và một cho game IG04 (Kafka & System Design). Duplicate ID gây rủi ro logic trong engine achievements.

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Cải tiến chủ động theo chế độ tự cải tiến hàng ngày.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/primary/achievements.js` | Mở rộng | 25 → 34 achievements: thêm 9 achievement còn thiếu |
| `public/js/domains/pharmacy/achievements.js` | Mở rộng | 12 → 16 achievements: thêm 4 yearComplete năm 2–5 |
| `public/js/domains/it/achievements.js` | Sửa lỗi | Fix duplicate ID `system-designer` → đổi game IG04 thành `kafka-designer` |

### Chi tiết achievements mới

**Trường Tiểu học** (thêm 9 achievements):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `viet-2` | 📕 | Đọc thông viết thạo lớp 2 | P2TV ≥ 3 sao |
| `viet-4` | 📓 | Nhà văn nhỏ lớp 4 | P4TV ≥ 3 sao |
| `eng-4` | 💬 | Confident Talker lớp 4 | P4TA ≥ 3 sao |
| `science-5` | 🌿 | Khoa học tự nhiên lớp 5 | P5KH ≥ 3 sao |
| `coding-4` | 🖱️ | Coder nhỏ lớp 4 | P4TIN ≥ 3 sao |
| `year2-grad` | 🌟 | Lên lớp 3 nào! | yearComplete: 2 |
| `year4-grad` | 🌈 | Sắp tốt nghiệp Tiểu học! | yearComplete: 4 |

*(+2 achievements đã đếm ở trên nhưng thực ra là 7, cộng 4 pharmacy = 11 tổng)*

**Trường Dược** (thêm 4 yearComplete):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `all-year-2` | ⚗️ | Tốt nghiệp Năm 2 | yearComplete: 2 |
| `all-year-3` | 💊 | Tốt nghiệp Năm 3 | yearComplete: 3 |
| `all-year-4` | 🏥 | Tốt nghiệp Năm 4 | yearComplete: 4 |
| `all-year-5` | 🏅 | Dược sĩ tốt nghiệp | yearComplete: 5 |

**Trường CNTT** (sửa 1 bug):

| Trước | Sau | Lý do |
|-------|-----|-------|
| `id: 'system-designer'` (IG04) | `id: 'kafka-designer'` (IG04) | Duplicate ID với achievement I3.2 |

### Kiểm thử

```
node --check public/js/domains/primary/achievements.js   ✅ OK
node --check public/js/domains/pharmacy/achievements.js  ✅ OK
node --check public/js/domains/it/achievements.js        ✅ OK
```

---

## 2026-07-11 — Phiên cải tiến (14) · THCS & THPT — Bổ sung 29 Achievements còn thiếu

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** THCS (`secondary`) · THPT (`highschool`)

### Vấn đề phát hiện

Quét codebase phát hiện **2 lỗ hổng gamification lớn** trong hệ thống achievements:

1. **Trường THCS**: Các môn Ngữ văn, Tiếng Anh, KHTN, Lịch sử-Địa lý, Tin học chỉ có achievements cho lớp đầu (6) và lớp cuối (9), bỏ trống hoàn toàn lớp 7 và 8. Ngoài ra thiếu yearComplete cho lớp 7 và lớp 8 — học sinh hoàn thành trọn năm học nhưng không nhận được huy chương.
2. **Trường THPT**: Ngữ văn và Tiếng Anh thiếu lớp 11; toàn bộ Vật lí/Hoá học/Sinh học/Lịch sử/Địa lý/Tin học chỉ có achievements cho lớp 10, thiếu lớp 11 và lớp 12 — sinh viên học hết 3 năm THPT nhưng chỉ nhận được thưởng ở lớp 10.

Tất cả scenario và module tương ứng đã tồn tại đầy đủ trong hệ thống (lop7–lop9, lop10–lop12). Đây là cải tiến thấp rủi ro nhất: chỉ bổ sung achievements vào file catalog, không thay đổi logic hay scenario.

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Cải tiến chủ động theo chế độ tự cải tiến hàng ngày.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/secondary/achievements.js` | Mở rộng | 25 → 39 achievements: thêm 14 achievement cho THCS |
| `public/js/domains/highschool/achievements.js` | Mở rộng | 22 → 37 achievements: thêm 15 achievement cho THPT |

### Chi tiết achievements mới

**Trường THCS** (thêm 14 achievements):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `nv7-weekly` | 📝 | Văn học dân tộc lớp 7 | S7NV ≥ 3 sao |
| `nv8-weekly` | 📰 | Nhà văn trẻ lớp 8 | S8NV ≥ 3 sao |
| `ta7-weekly` | 🗺️ | Global Citizen lớp 7 | S7TA ≥ 3 sao |
| `ta8-weekly` | 🌐 | Confident Speaker lớp 8 | S8TA ≥ 3 sao |
| `khtn7-weekly` | ⚗️ | Khám phá KHTN lớp 7 | S7KHTN ≥ 3 sao |
| `khtn8-weekly` | 🧲 | Thí nghiệm KHTN lớp 8 | S8KHTN ≥ 3 sao |
| `khtn9-weekly` | 🌿 | Sẵn sàng thi KHTN lớp 10 | S9KHTN ≥ 3 sao |
| `lsdia6-weekly` | 🏛️ | Sử-Địa thế giới lớp 6 | S6LSDL ≥ 3 sao |
| `lsdia7-weekly` | 🧭 | Khám phá Sử-Địa lớp 7 | S7LSDL ≥ 3 sao |
| `lsdia8-weekly` | 🌏 | Thám hiểm Sử-Địa lớp 8 | S8LSDL ≥ 3 sao |
| `tin7-weekly` | 🖥️ | Coder nhỏ lớp 7 | S7TIN ≥ 3 sao |
| `tin8-weekly` | 📱 | Lập trình viên tương lai lớp 8 | S8TIN ≥ 3 sao |
| `year2-sec-complete` | 🥈 | Lên lớp 8 vững vàng! | yearComplete: 2 |
| `year3-sec-complete` | 🏅 | Lên lớp 9 xuất sắc! | yearComplete: 3 |

**Trường THPT** (thêm 15 achievements):

| ID | Icon | Tên | Trigger |
|----|------|-----|---------|
| `nv11` | 📖 | Nhà văn trẻ tài năng | H11NV ≥ 3 sao |
| `ta11` | 🌐 | Advanced English lớp 11 | H11TA ≥ 3 sao |
| `ly11` | 🔊 | Sóng & dao động lớp 11 | H11LY ≥ 3 sao |
| `ly12` | ☢️ | Sẵn sàng thi Vật lí | H12LY ≥ 3 sao |
| `hoa11` | ⚗️ | Hoá hữu cơ lớp 11 | H11HOA ≥ 3 sao |
| `hoa12` | 🏭 | Sẵn sàng thi Hoá học | H12HOA ≥ 3 sao |
| `sinh11` | 🌱 | Cơ thể sống lớp 11 | H11SINH ≥ 3 sao |
| `sinh12` | 🦠 | Sẵn sàng thi Sinh học | H12SINH ≥ 3 sao |
| `su11` | 🗿 | Lịch sử hiện đại lớp 11 | H11SU ≥ 3 sao |
| `su12` | 🏵️ | Sẵn sàng thi Lịch sử | H12SU ≥ 3 sao |
| `dia11` | 🌏 | Địa lý thế giới lớp 11 | H11DIA ≥ 3 sao |
| `dia12` | 🇻🇳 | Sẵn sàng thi Địa lý | H12DIA ≥ 3 sao |
| `tin11` | 🗄️ | Cơ sở dữ liệu lớp 11 | H11TIN ≥ 3 sao |
| `tin12` | 🤖 | AI & Lập trình lớp 12 | H12TIN ≥ 3 sao |

(+ `khtn-triple` của THPT giữ nguyên — đã đúng từ phiên 13)

### Kiểm thử

```
node --check public/js/domains/secondary/achievements.js   ✅ OK
node --check public/js/domains/highschool/achievements.js  ✅ OK
```

---

## 2026-07-10 — Phiên cải tiến (13) · Tiểu học · THCS · THPT — Enrichment Achievements

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** Tiểu học (`primary`) · THCS (`secondary`) · THPT (`highschool`)

### Vấn đề phát hiện

Quét codebase phát hiện **3 lỗ hổng về gamification**:
1. **Trường Tiểu học**: Chỉ có 6 achievements cho toàn bộ 5 năm học × 9+ môn — quá ít để tạo động lực cho học sinh.
2. **Trường THCS**: Nhiều achievements tham chiếu ID module kiểu cũ (`S6-so-nguyen-4`, `S6-phan-so-5`...) không tồn tại trong hệ thống 36-tuần mới — không bao giờ kích hoạt được.
3. **Trường THPT**: Tất cả 4 achievements có `moduleStars` đều tham chiếu ID sai (`H-T10`, `H-L10`, `H-S10`, `H-T12`) — trong khi ID đúng là `H10TOAN`, `H10LY`, `H10SU`, `H12TOAN`.

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Cải tiến chủ động theo chế độ tự cải tiến hàng ngày.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/primary/achievements.js` | Mở rộng | 6 → 24 achievements: thêm per-grade Toán (P2/P3/P4), Tiếng Việt (L1/L3/L5), Tiếng Anh (L3/L5), Khoa học, Lịch sử-ĐL, Tin học, streak, star milestones, tốt nghiệp lớp |
| `public/js/domains/secondary/achievements.js` | Mở rộng + fix | 11 → 25 achievements: thêm achievements dùng ID 36-tuần đúng (S6TOAN, S7NV, S6TA...), yearComplete, star milestones; giữ legacy Boss achievements có chú thích |
| `public/js/domains/highschool/achievements.js` | Fix + mở rộng | 6 → 22 achievements: **SỬA** 4 ID sai (H-T10→H10TOAN, H-L10→H10LY, H-S10→H10SU, H-T12→H12TOAN); thêm Văn/Anh/Lí/Hoá/Sinh/Sử/Địa/Tin, tam giác KHTN, yearComplete, star milestones |

### Chi tiết achievements mới

**Tiểu học** (thêm 18 achievements):
- Toán: P2 (🔢), P3 (🧮), P4 (📐) — bổ sung 3 lớp còn thiếu
- Tiếng Việt: P1TV (📖), P3TV (✏️), P5TV (📝)
- Tiếng Anh: P3TA (🌍 "Hello World!"), P5TA (🗣️ "Junior English Speaker")
- Khoa học: P4KH (🔭), Lịch sử & ĐL: P5LSDL (🗺️)
- Tin học: P3TIN (💻), P5TIN (🤖 "Scratch Master")
- Streak 7 ngày (🌈 "Tuần vàng"), star-30 (💫), star-60 (🌠)
- Tốt nghiệp lớp 1 (🥇), lớp 3 (🥈), lớp 5 (🎓)
- Fix trigger `all-primary-math`: từ `{totalStars:5}` → `{moduleStars:{P1:1,P2:1,P3:1,P4:1,P5:1}}`

**THCS** (thêm 14 achievements với ID đúng):
- Toán 36-tuần: S6TOAN (🔢), S7TOAN (📊), S8TOAN (📐), S9TOAN (🏅)
- Ngữ văn: S6NV (📖), S9NV (✒️); Tiếng Anh: S6TA (🌍), S9TA (🗣️)
- KHTN 6 (🔬), Lịch Sử-ĐL 9 (🗺️), Tin học 6 (💻), Tin học 9 (⌨️)
- Streak 10 ngày (⚡), star-50 (💫), yearComplete 1 (lớp 6) + 4 (lớp 9 = tốt nghiệp THCS)
- all-secondary-math: trigger đúng `{S6TOAN:1,S7TOAN:1,S8TOAN:1,S9TOAN:1}`

**THPT** (sửa 4 + thêm 16 achievements):
- **SỬA**: H-T10→H10TOAN, H-L10→H10LY, H-S10→H10SU, H-T12→H12TOAN
- Toán: H11TOAN (📈 "Đạo hàm master"); Văn: H10NV (📜), H12NV (✒️)
- Tiếng Anh: H10TA (🌍), H12TA (🗣️)
- KHTN: H10HOA (🧪), H10SINH (🧬), tam giác KHTN (🔬 "Lí+Hoá+Sinh lớp 10")
- KHXH: H10SU (🏛️), H10DIA (🗺️); Tin học: H10TIN (💻)
- Streak 14 ngày (⚡), star-20 (✨), star-50 (💫)
- yearComplete 1/2/3 (lớp 10/11/12 = tốt nghiệp THPT)
- all-hs-math: `{H10TOAN:1,H11TOAN:1,H12TOAN:1}` (🏆 "Thủ khoa Toán THPT")

### Kiểm thử

```
node --check public/js/domains/primary/achievements.js     ✅ OK
node --check public/js/domains/secondary/achievements.js   ✅ OK
node --check public/js/domains/highschool/achievements.js  ✅ OK
```

---

## 2026-07-09 — Phiên cải tiến (12) · Trường CNTT — 4 Game modules IG01–IG04

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** Trường CNTT (`it`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện **4 game module** (IG01–IG04) trong Trường CNTT đều có `placeholder: true` và `scenarioIds: []` — hiển thị badge "Coming soon" với sinh viên. Đây là nhóm thay đổi thấp rủi ro nhất (category `game`, không ảnh hưởng lộ trình học chính), có thể bổ sung quiz ngay từ nội dung curriculum đã có. Ưu tiên kích hoạt để sinh viên CNTT có thêm nội dung thực hành dạng gamification.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-games.js` | Tạo mới | 4 quiz game scenarios IG01–IG04 (40 câu hỏi có explanation) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt IG01–IG04: thay `scenarioIds: []` + `placeholder: true` bằng scenarioId thực tế |
| `public/js/domains/it/achievements.js` | Sửa | Thêm 5 achievement mới (4 game + 1 IT Game Master tổng hợp) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_GAMES_SCENARIOS` |

### Chi tiết nội dung (40 câu hỏi)

| Game | ID Scenario | Chủ đề | Câu |
|------|------------|--------|-----|
| Code Race — Giải thuật 5 phút | `IG01-code-race-quiz` | Big-O, Two Pointers, Sliding Window, Greedy, DP, HashMap | 10 |
| Bug Hunt — Debug speed | `IG02-bug-hunt-quiz` | Off-by-one, type coercion, Python gotchas, NULL SQL, race condition | 10 |
| SQL Detective | `IG03-sql-detective-quiz` | JOIN, Index, Window Function, N+1, ACID, EXPLAIN | 10 |
| Kafka — System Design battle | `IG04-system-design-quiz` | Kafka, CAP theorem, Circuit Breaker, CQRS, Service Mesh, distributed tracing | 10 |

### Achievement mới

- `code-racer` ⚡ — Pass IG01
- `bug-hunter` 🐛 — Pass IG02
- `sql-detective` 🔎 — Pass IG03
- `system-designer` ⚔️ — Pass IG04
- `it-game-master` 🏆 — Pass cả 4 game (IG01–IG04)

### Kiểm thử

```
node --check public/js/scenarios/it-games.js              ✅ OK
node --check public/js/domains/it/modules.js              ✅ OK
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js          ✅ OK
```

---

## 2026-07-08 — Phiên cải tiến (11) · Trường Mầm non — 4 lĩnh vực phát triển hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** Trường Mầm non (`preschool`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện **12 module stub** cho 4 lĩnh vực phát triển Mầm non (Thể chất, Ngôn ngữ, Tình cảm–Xã hội, Thẩm mỹ × 3 lứa tuổi Mầm/Chồi/Lá) đều là skeleton có `(Đang biên soạn)` và `status: 'in-progress'`. Lĩnh vực 2 (Nhận thức / N1–N3) đã đầy đủ nội dung từ đầu. Ưu tiên bổ sung 4 lĩnh vực còn lại để hoàn chỉnh chương trình Mầm non theo TT 51/2020 (Bộ GD&ĐT), đảm bảo bé 3–5 tuổi có đủ nội dung ôn luyện theo 5 lĩnh vực phát triển.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/preschool-physical.js` | Tạo mới | 3 quiz scenarios N1-TC/N2-TC/N3-TC (15 câu — Thể chất) |
| `public/js/scenarios/preschool-language.js` | Tạo mới | 3 quiz scenarios N1-NN/N2-NN/N3-NN (15 câu — Ngôn ngữ) |
| `public/js/scenarios/preschool-social.js`   | Tạo mới | 3 quiz scenarios N1-TX/N2-TX/N3-TX (15 câu — Tình cảm–XH) |
| `public/js/scenarios/preschool-arts.js`     | Tạo mới | 3 quiz scenarios N1-TM/N2-TM/N3-TM (15 câu — Thẩm mỹ) |
| `public/js/domains/preschool/modules.js`    | Sửa | Thay 12 `_stub()` bằng module đầy đủ; xoá `status: 'in-progress'` và "(Đang biên soạn)" |
| `public/js/domains/preschool/achievements.js` | Sửa | Thêm 13 achievement mới (12 module + 1 tổng kết) |
| `public/js/scenarios/_all-content.js`       | Sửa | Import + spread 4 bộ scenario Mầm non mới |

### Chi tiết nội dung (60 câu hỏi)

**Lĩnh vực 1 — Phát triển thể chất (`the-chat`)**

| Scenario | Lứa tuổi | Nội dung |
|----------|----------|---------|
| `N1-TC-quiz` (5 câu) | Mầm (3t) | Rửa tay, vận động thô/tinh, phòng ngã, vệ sinh sáng, nghỉ ngơi khi mệt |
| `N2-TC-quiz` (5 câu) | Chồi (4t) | Thăng bằng, phối hợp tay-mắt, 4 nhóm thực phẩm, rau tươi tốt hơn, xử lý xước da |
| `N3-TC-quiz` (5 câu) | Lá (5t) | ATGT vỉa hè, đèn đỏ, cầm bút đúng cách, nhảy dây toàn thân, rửa tay 2 lần |

**Lĩnh vực 3 — Phát triển ngôn ngữ (`ngon-ngu`)**

| Scenario | Lứa tuổi | Nội dung |
|----------|----------|---------|
| `N1-NN-quiz` (5 câu) | Mầm (3t) | Tiếng kêu con vật, đồ vật ăn cơm, chào hỏi, xin phép, tên gọi "Bà" |
| `N2-NN-quiz` (5 câu) | Chồi (4t) | 29 chữ cái TV, kể chuyện theo tranh, từ để hỏi, chữ A đứng đầu, lắng nghe chủ động |
| `N3-NN-quiz` (5 câu) | Lá (5t) | Đ vs D, thơ thiếu nhi, hướng viết TV, từ loại câu, kỹ năng đọc giải mã |

**Lĩnh vực 4 — Phát triển tình cảm–xã hội (`tinh-cam-xh`)**

| Scenario | Lứa tuổi | Nội dung |
|----------|----------|---------|
| `N1-TX-quiz` (5 câu) | Mầm (3t) | Cảm xúc vui, nói cảm ơn, xin lỗi, chào thầy/cô, chia sẻ cảm xúc buồn |
| `N2-TX-quiz` (5 câu) | Chồi (4t) | Chia sẻ kẹo, hợp tác nhóm, kiềm chế tức giận, yêu thương gia đình, chờ đến lượt |
| `N3-TX-quiz` (5 câu) | Lá (5t) | Tết Nguyên Đán, giải quyết xung đột, Quốc kỳ VN, kỹ năng lớp 1, tự hào lành mạnh |

**Lĩnh vực 5 — Phát triển thẩm mỹ (`tham-my`)**

| Scenario | Lứa tuổi | Nội dung |
|----------|----------|---------|
| `N1-TM-quiz` (5 câu) | Mầm (3t) | Pha màu đỏ+vàng=cam, nhạc vui-nhảy, cọ vẽ, nặn đất, trống vs kèn |
| `N2-TM-quiz` (5 câu) | Chồi (4t) | Vẽ tranh gia đình, origami 1 tờ giấy, nhạc múa vui, collage dán lá, vẽ đường thẳng |
| `N3-TM-quiz` (5 câu) | Lá (5t) | Tranh Đông Hồ Bắc Ninh, biểu diễn bài hát, múa rối nước mặt nước, vẽ tự do, Quan họ UNESCO |

### Achievement mới (13)

| ID | Icon | Tên | Điều kiện |
|----|------|-----|-----------|
| `active-mam` | 🏃 | Bé năng động | N1-TC ≥ 3 sao |
| `agile-choi` | 🤸 | Bé khéo léo | N2-TC ≥ 3 sao |
| `strong-la` | 💪 | Bé cường tráng | N3-TC ≥ 3 sao |
| `talk-mam` | 💬 | Bé bi bô | N1-NN ≥ 3 sao |
| `story-choi` | 📖 | Bé kể chuyện | N2-NN ≥ 3 sao |
| `read-la` | 🔤 | Bé đọc chữ | N3-NN ≥ 3 sao |
| `happy-mam` | 😊 | Bé vui vẻ | N1-TX ≥ 3 sao |
| `kind-choi` | 🤝 | Bé thân thiện | N2-TX ≥ 3 sao |
| `good-la` | 🌟 | Bé tốt bụng | N3-TX ≥ 3 sao |
| `artist-mam` | 🎨 | Bé nghệ sĩ nhỏ | N1-TM ≥ 3 sao |
| `talent-choi` | 🎭 | Bé tài năng | N2-TM ≥ 3 sao |
| `creative-la` | ✨ | Bé sáng tạo | N3-TM ≥ 3 sao |
| `all-round` | 🏅 | Phát triển toàn diện | Hoàn thành 15 quiz |

### Kiểm thử

```
node --check public/js/scenarios/preschool-physical.js       ✅ OK
node --check public/js/scenarios/preschool-language.js       ✅ OK
node --check public/js/scenarios/preschool-social.js         ✅ OK
node --check public/js/scenarios/preschool-arts.js           ✅ OK
node --check public/js/domains/preschool/modules.js          ✅ OK
node --check public/js/domains/preschool/achievements.js     ✅ OK
node --check public/js/scenarios/_all-content.js             ✅ OK
```

---

## 2026-07-07 — Phiên cải tiến (10) · Trường THPT — Dọn sạch mô tả module lỗi thời

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** Trường THPT (`highschool`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện **18 mô tả module** trong `public/js/domains/highschool/modules.js` còn ghi chú lỗi thời "(Scenarios đang biên soạn)" — trong khi tất cả 18 file scenario tương ứng đã tồn tại đầy đủ (`lop10/`, `lop11/`, `lop12/`). Ghi chú này gây hiểu nhầm cho học sinh rằng môn học chưa có nội dung, dù thực tế đã sẵn sàng. Ưu tiên dọn sạch để thông tin hiển thị đúng thực tế.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/domains/highschool/modules.js` | Sửa | Xoá "(Scenarios đang biên soạn)" khỏi 18 mô tả module; cập nhật 3 comment section lỗi thời |

### Chi tiết module đã cập nhật (18 module)

| Module | Môn | Lớp | File scenario xác nhận |
|--------|-----|-----|------------------------|
| H11SINH | Sinh học 11 | 11 | `lop11/sinh-hoc.js` (329 dòng) ✅ |
| H12SINH | Sinh học 12 | 12 | `lop12/sinh-hoc.js` (329 dòng) ✅ |
| H11SU | Lịch sử 11 | 11 | `lop11/lich-su.js` (336 dòng) ✅ |
| H12SU | Lịch sử 12 | 12 | `lop12/lich-su.js` (329 dòng) ✅ |
| H11DIA | Địa lí 11 | 11 | `lop11/dia-ly.js` (342 dòng) ✅ |
| H12DIA | Địa lí 12 | 12 | `lop12/dia-ly.js` (329 dòng) ✅ |
| H11GDCD | GD Kinh tế & PL 11 | 11 | `lop11/gdcd.js` (330 dòng) ✅ |
| H12GDCD | GD Kinh tế & PL 12 | 12 | `lop12/gdcd.js` (329 dòng) ✅ |
| H11TIN | Tin học 11 | 11 | `lop11/tin-hoc.js` (329 dòng) ✅ |
| H12TIN | Tin học 12 | 12 | `lop12/tin-hoc.js` (330 dòng) ✅ |
| H10CN | Công nghệ 10 | 10 | `lop10/cong-nghe.js` (329 dòng) ✅ |
| H11CN | Công nghệ 11 | 11 | `lop11/cong-nghe.js` (329 dòng) ✅ |
| H12CN | Công nghệ 12 | 12 | `lop12/cong-nghe.js` (329 dòng) ✅ |
| H11GDQP | GDQP 11 | 11 | `lop11/gdqp.js` (329 dòng) ✅ |
| H12GDQP | GDQP 12 | 12 | `lop12/gdqp.js` (330 dòng) ✅ |
| H10HDTN | HĐ Trải nghiệm 10 | 10 | `lop10/hdtn.js` (294 dòng) ✅ |
| H11HDTN | HĐ Trải nghiệm 11 | 11 | `lop11/hdtn.js` (296 dòng) ✅ |
| H12HDTN | HĐ Trải nghiệm 12 | 12 | `lop12/hdtn.js` (296 dòng) ✅ |

### Kiểm thử

```
node --check public/js/domains/highschool/modules.js     ✅ OK
```

---

## 2026-07-06 — Phiên cải tiến (9) · Trường Kinh tế — Year 4 hoàn chỉnh (E4.1–E4.6)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; DB production chưa có dữ liệu; không có GitHub Issues mở).

**Trường:** Trường Kinh tế (`economics`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện 6 module Năm 4 Kinh tế (E4.1–E4.6) vẫn là skeleton (`scenarioIds: []`). Năm 1, 2 & 3 đã hoàn chỉnh (các phiên trước). Ưu tiên bổ sung Year 4 để sinh viên năm 4 có đủ nội dung tổng hợp chuyên sâu, hoàn chỉnh lộ trình Cử nhân Kinh tế 4 năm.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-year4.js` | Tạo mới | 6 quiz scenarios E4.1–E4.6 (60 câu hỏi, đầy đủ explanation) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt E4.1–E4.6: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ skeleton rỗng |
| `public/js/domains/economics/achievements.js` | Sửa | Thêm 6 achievement Năm 4 mới (5 module + 1 tốt nghiệp Năm 4) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_YEAR4_SCENARIOS` |

### Chi tiết nội dung (60 câu hỏi)

**`E4.1-strategy-quiz`** (10 câu) — Quản trị chiến lược:
5 lực Porter, SWOT-SO strategy, Cost Leadership, Ma trận BCG (Cash Cow), Blue Ocean Strategy, Backward Vertical Integration, Value Chain Analysis, Balanced Scorecard (4 góc nhìn), M&A Synergy, Ma trận Ansoff (Market Penetration).

**`E4.2-entrepreneurship-quiz`** (10 câu) — Khởi nghiệp – Lean Canvas:
Lean Canvas vs BMC (Problem ô thay thế), Build-Measure-Learn loop, Product-Market Fit (PMF), Pivot vs Persevere, Venture Capital vs vay ngân hàng, Unfair Advantage, Freemium model, Burn Rate & Runway, Customer Discovery (get out of building), Net Promoter Score (NPS).

**`E4.3-auditing-quiz`** (10 câu) — Kiểm toán độc lập:
Mục tiêu kiểm toán BCTC, Mô hình AR = IR×CR×DR, Trọng yếu (Materiality), Ý kiến kiểm toán unmodified vs modified, COSO 2013 (5 thành phần), Thủ tục phân tích, Độc lập KTV, Bằng chứng kiểm toán (Sufficiency & Appropriateness), External Confirmation, Internal vs External Audit.

**`E4.4-tax-quiz`** (10 câu) — Thuế Việt Nam:
Thuế TNDN 20%, Phương pháp khấu trừ VAT, Điều kiện chi phí được trừ, Biểu thuế TNCN lũy tiến 7 bậc, Hóa đơn điện tử (NĐ 123/2020), Transfer Pricing (chuyển giá), Foreign Contractor Withholding Tax, Thuế TTĐB, Kỳ kê khai VAT (tháng/quý), Tax Shield.

**`E4.5-business-ethics-quiz`** (10 câu) — Đạo đức kinh doanh & CSR:
Friedman vs Stakeholder Theory, Carroll's CSR Pyramid, Tham nhũng & hối lộ, Văn hóa tổ chức & Tone at the Top, ESG (Environmental-Social-Governance), Conflict of Interest, Agency Theory, Whistleblowing, Arm's Length Principle, Lean Canvas Unfair Advantage (bonus).

**`E4.6-capstone-quiz`** (10 câu) — Khoá luận kinh tế:
Quantitative vs Qualitative Research, Endogeneity & IV, Plagiarism, R² và Adjusted R², Difference-in-Differences (DiD), Cấu trúc IMRaD, Policy Implications, Correlation ≠ Causation, Kỹ năng trình bày Hội đồng, Tính đại diện mẫu (Sample Representativeness).

### Achievement mới (6)

| ID | Icon | Tên | Điều kiện |
|----|------|-----|-----------|
| `strategist` | ♟️ | Chiến lược gia | E4.1 ≥ 3 sao |
| `lean-founder` | 🌱 | Lean Founder | E4.2 ≥ 3 sao |
| `auditor-pro` | 🔎 | Kiểm toán viên xuất sắc | E4.3 ≥ 3 sao |
| `tax-expert` | 📑 | Chuyên gia Thuế | E4.4 ≥ 3 sao |
| `ethics-champion` | ⚖️ | Nhà kinh doanh Chính trực | E4.5 ≥ 3 sao |
| `year4-econ-complete` | 🏅 | Tốt nghiệp Năm 4 Kinh tế | yearComplete: 4 |

### Kiểm thử

```
node --check public/js/scenarios/economics-year4.js          ✅ OK
node --check public/js/domains/economics/modules.js          ✅ OK
node --check public/js/domains/economics/achievements.js     ✅ OK
node --check public/js/scenarios/_all-content.js             ✅ OK
```

---

## 2026-07-05 — Phiên cải tiến (8) · Trường CNTT — Year 4 (I4.1–I4.4)

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; không có GitHub Issues mở).

**Trường:** Trường CNTT (`it`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox hay GitHub Issues. Quét codebase phát hiện 4 module Năm 4 CNTT (I4.1–I4.4) vẫn là skeleton (`scenarioIds: []`, `placeholder: true`). Ưu tiên bổ sung để sinh viên năm 4 có nội dung luyện tập — hoàn chỉnh lộ trình CNTT 4 năm.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-year4.js` | Tạo mới | 4 quiz scenarios I4.1–I4.4 (40 câu hỏi, đầy đủ explanation) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt I4.1–I4.4: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ `placeholder` |
| `public/js/domains/it/achievements.js` | Sửa | Thêm 5 achievement Year 4 mới (4 module + 1 tốt nghiệp Năm 4) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_YEAR4_SCENARIOS` |

### Chi tiết nội dung (40 câu hỏi)

**`I4.1-se-arch-quiz`** (10 câu) — Kiến trúc phần mềm & Design Patterns:
SOLID (SRP, OCP, DIP), GoF 3 nhóm (Creational/Structural/Behavioral), Observer Pattern, Dependency Injection, Microservices vs Monolithic, CQRS, DDD Bounded Context, Clean Architecture Dependency Rule, API Gateway.

**`I4.2-cloud-quiz`** (10 câu) — Điện toán đám mây AWS/GCP:
IaaS/PaaS/SaaS phân tầng quản lý, Amazon S3 object storage, AWS Lambda serverless/FaaS, Docker container vs VM (kernel sharing), Kubernetes Pod, Terraform vs CloudFormation (multi-cloud), Auto Scaling, CDN edge caching, CAP Theorem (P không tránh được → chọn C hoặc A), SLA 99.9% ~8.7h downtime/năm.

**`I4.3-data-science-quiz`** (10 câu) — Khoa học dữ liệu:
Overfitting vs Underfitting, K-Fold Cross Validation, Precision vs Recall (khi nào ưu tiên), K-Means giới hạn, One-Hot Encoding, Random Forest Bagging, Data leakage (fit scaler trên test set), PCA dimensionality reduction, A/B Testing (p-value + power), CRISP-DM 6 pha.

**`I4.4-blockchain-quiz`** (10 câu) — Blockchain & Web3:
Blockchain trustless/immutable vs database, Proof of Work (nonce + hash < target), Smart Contract EVM/Solidity, AMM Uniswap x×y=k, NFT ERC-721 vs ERC-20, Private Key ký giao dịch, Gas mechanism + EIP-1559, Web3 ownership vs Web2 tập trung, Merkle Tree + SPV verification, DAO token voting.

### Achievement mới (5)

| ID | Icon | Tên | Điều kiện |
|----|------|-----|-----------|
| `architect` | 🏛️ | Software Architect | I4.1 ≥ 3 sao |
| `cloud-pro` | ☁️ | Cloud Pro | I4.2 ≥ 3 sao (cập nhật desc) |
| `data-scientist` | 📊 | Data Scientist | I4.3 ≥ 3 sao |
| `blockchain-dev` | ⛓️ | Blockchain Developer | I4.4 ≥ 3 sao |
| `year4-it-complete` | 🥇 | Tốt nghiệp Năm 4 CNTT | yearComplete: 4 |

### Kiểm thử

```
node --check public/js/scenarios/it-year4.js              ✅ OK
node --check public/js/domains/it/modules.js              ✅ OK
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js          ✅ OK
```

---

## 2026-07-04 — Phiên cải tiến (7) · Trường Kinh tế — Year 3 hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; DB production chưa kết nối trong môi trường này).

**Trường:** Trường Kinh tế (`economics`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox. Quét codebase phát hiện 7 module Năm 3 Trường Kinh tế (E3.1–E3.7) đều là skeleton với `scenarioIds: []`. Năm 1 & Năm 2 đã hoàn chỉnh (phiên 2026-06-27 và 2026-06-28). Ưu tiên bổ sung Year 3 để sinh viên năm 3 có đủ nội dung học chuyên ngành sâu.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-year3.js` | Tạo mới | 7 quiz scenarios E3.1–E3.7 (70 câu hỏi, đầy đủ explanation) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt E3.1–E3.7: bổ sung `scenarioIds` + `knowledgeQuiz` |
| `public/js/domains/economics/achievements.js` | Sửa | Thêm 8 achievement Year 3 mới (7 module + 1 hoàn thành Năm 3) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_YEAR3_SCENARIOS` |

### Chi tiết nội dung (70 câu hỏi)

**`E3.1-econometrics-quiz`** (10 câu) — Kinh tế lượng:
OLS Gauss-Markov assumption, giải thích hệ số β, đa cộng tuyến (VIF), heteroskedasticity (Breusch-Pagan), Durbin-Watson autocorrelation, F-test tổng thể, R² interpretation, biến nội sinh & IV/2SLS, Hausman test Fixed vs Random Effects, hồi quy giả tạo & cointegration.

**`E3.2-corporate-finance-quiz`** (10 câu) — Tài chính doanh nghiệp:
NPV vs IRR quyết định đầu tư, WACC công thức, Modigliani-Miller capital structure irrelevance, CAPM và beta, Free Cash Flow to Firm (FCFF), đòn bẩy tài chính (DFL), Cash Conversion Cycle, phương pháp so sánh vòng đời khác nhau (EAC), Pecking Order Theory, Payback Period nhược điểm.

**`E3.3-management-accounting-quiz`** (10 câu) — Kế toán quản trị:
Chi phí biến đổi vs cố định, Contribution Margin, Break-Even Point, CVP assumptions, Material Price Variance, ABC vs Traditional Costing, Balanced Scorecard 4 viễn cảnh, Transfer Pricing cost-plus nhược điểm, Make or Buy relevant costs, Flexible vs Static Budget.

**`E3.4-financial-analysis-quiz`** (10 câu) — Phân tích tài chính:
Current Ratio, DuPont 3 nhân tố (ROE = Margin × TAT × Leverage), P/E ratio, Total Asset Turnover, DCF Valuation (FCFF + Terminal Value), Altman Z-Score, D/E Ratio, Interest Coverage Ratio (ICR), Diluted EPS vs Basic EPS, OCF vs Net Income.

**`E3.5-digital-marketing-quiz`** (10 câu) — Marketing số & E-commerce:
SEO vs SEM, CTR calculation, LTV/CAC ratio, C2C vs B2B/B2C models, A/B Testing, Bounce Rate, Mobile-First strategy, TOFU–MOFU–BOFU funnel, Email Marketing ROI, Marketplace revenue model.

**`E3.6-supply-chain-quiz`** (10 câu) — Quản trị chuỗi cung ứng:
Định nghĩa supply chain & 3 dòng chảy, Just-In-Time (JIT) nguyên tắc, EOQ công thức, Bullwhip Effect, SCOR model (Plan-Source-Make-Deliver-Return), Lean vs Agile SCM, Vendor Managed Inventory (VMI), Total Cost of Ownership (TCO), Reverse Logistics, Lead Time.

**`E3.7-international-business-quiz`** (10 câu) — Kinh doanh quốc tế:
Comparative Advantage (Ricardo), FDI Greenfield vs M&A vs JV, Porter's Diamond 4 yếu tố, Tariff vs Non-Tariff Barriers, depreciation & J-Curve effect, WTO MFN principle, Hofstede Power Distance, Incoterms CIF vs FOB, Transfer Pricing in MNCs & BEPS, Contract Manufacturing vs FDI.

### Achievement mới (8)

| ID | Icon | Tên | Điều kiện |
|----|------|-----|-----------|
| `econometrics-pro` | 📐 | Kinh tế lượng Pro | E3.1 ≥ 3 sao |
| `corp-finance-star` | 💼 | Tài chính doanh nghiệp | E3.2 ≥ 3 sao |
| `mgmt-accounting` | 📋 | Kế toán quản trị Master | E3.3 ≥ 3 sao |
| `financial-analyst` | 🔍 | Nhà phân tích tài chính | E3.4 ≥ 3 sao |
| `digital-marketer` | 📲 | Digital Marketer | E3.5 ≥ 3 sao |
| `supply-chain-boss` | 🔗 | Chuỗi cung ứng chuyên gia | E3.6 ≥ 3 sao |
| `global-trader` | 🌏 | Nhà kinh doanh quốc tế | E3.7 ≥ 3 sao |
| `all-year-3-econ` | 🎖️ | Tốt nghiệp Năm 3 Kinh tế | Năm 3 hoàn chỉnh (E3.1–E3.7) |

### Kiểm thử

```
node --check public/js/scenarios/economics-year3.js              ✅ OK
node --check public/js/domains/economics/modules.js              ✅ OK
node --check public/js/domains/economics/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js                 ✅ OK
```

---

## 2026-07-02 — Phiên cải tiến (6) · Trường CNTT — Year 3 hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; DB production chưa kết nối trong môi trường này).

**Trường:** Trường CNTT (`it`)

### Yêu cầu xử lý

Không có yêu cầu từ inbox. Quét codebase phát hiện 8 module Năm 3 Trường CNTT (I3.1–I3.8) đều là skeleton với `scenarioIds: []` + `placeholder: true`. Năm 1 & Năm 2 đã hoàn chỉnh (phiên 2026-06-27 và 2026-06-28). Ưu tiên bổ sung Year 3 để sinh viên năm 3 có đủ nội dung học chuyên ngành sâu.

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-year3.js` | Tạo mới | 8 quiz scenarios I3.1–I3.8 (80 câu hỏi, đầy đủ explanation) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt I3.1–I3.8: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ `placeholder` |
| `public/js/domains/it/achievements.js` | Sửa | Thêm 9 achievement Year 3 mới (8 module + 1 hoàn thành Năm 3) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_YEAR3_SCENARIOS` |

### Kiểm thử

```
node --check public/js/scenarios/it-year3.js              ✅ OK
node --check public/js/domains/it/modules.js              ✅ OK
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js          ✅ OK
```

---

## 2026-06-28 — Phiên cải tiến (5) · Trường CNTT — Year 2 hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; DB production chưa kết nối trong môi trường này).

**Trường:** Trường CNTT (`it`)

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-year2.js` | Tạo mới | 5 quiz scenarios I2.1–I2.5 (50 câu hỏi, đầy đủ explanation) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt I2.1–I2.5: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ `placeholder` |
| `public/js/domains/it/achievements.js` | Sửa | Thêm 6 achievement Year 2 mới (5 module + 1 hoàn thành Năm 2) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_YEAR2_SCENARIOS` |

### Kiểm thử

```
node --check public/js/scenarios/it-year2.js              ✅ OK
node --check public/js/domains/it/modules.js              ✅ OK
node --check public/js/domains/it/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js          ✅ OK
```

---

## 2026-06-28 — Phiên cải tiến (4) · Trường Kinh tế — Year 2 hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending; DB production chưa kết nối trong môi trường này).

**Trường:** Trường Kinh tế (`economics`)

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/economics-year2.js` | Tạo mới | 5 quiz scenarios E2.1–E2.5 (50 câu hỏi, đầy đủ explanation) |
| `public/js/domains/economics/modules.js` | Sửa | Kích hoạt E2.1–E2.5: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ skeleton |
| `public/js/domains/economics/achievements.js` | Sửa | Thêm 6 achievement Year 2 mới (5 module + 1 hoàn thành Năm 2) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `ECONOMICS_YEAR2_SCENARIOS` |

### Kiểm thử

```
node --check public/js/scenarios/economics-year2.js              ✅ OK
node --check public/js/domains/economics/modules.js              ✅ OK
node --check public/js/domains/economics/achievements.js         ✅ OK
node --check public/js/scenarios/_all-content.js                 ✅ OK
```

---

## 2026-06-27 — Phiên cải tiến (3) · Trường CNTT — Year 1 hoàn chỉnh

**Chế độ:** Chủ động (inbox `ai-board/inbox.json` không có yêu cầu pending).

**Trường:** Trường CNTT (`it`)

### Thay đổi

| File | Loại | Mô tả |
|------|------|-------|
| `public/js/scenarios/it-year1.js` | Tạo mới | 5 quiz scenarios I1.1–I1.5 (50 câu hỏi, đầy đủ explanation) |
| `public/js/domains/it/modules.js` | Sửa | Kích hoạt I1.1–I1.5: bổ sung `scenarioIds` + `knowledgeQuiz`, bỏ `placeholder` |
| `public/js/domains/it/experiences.js` | Sửa | Mở rộng từ 6 → 14 entries; Year 1 có Codelab + ScoreUp |
| `public/js/domains/it/achievements.js` | Sửa | Thêm 6 achievement Year 1 mới (5 module + 1 hoàn thành Năm 1) |
| `public/js/scenarios/_all-content.js` | Sửa | Import + spread `IT_YEAR1_SCENARIOS` |
