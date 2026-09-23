# 🌌 Tizia — Vũ trụ giáo dục

**Nền tảng mô phỏng đào tạo đa ngành** — sinh viên các trường có thể vào học, làm thực hành, chơi
gamification, trải nghiệm 2D/3D/VR/XR/Metaverse trong cùng một hệ thống.

> Tizia không gắn với một ngành cụ thể. Mỗi "trường" là một **domain** plug-in. Hiện đã có
> 3 trường: Dược, Kinh tế, CNTT. Thêm trường mới chỉ cần tạo 1 folder `domains/<id>/`.

| Trường | Trạng thái | Quy mô | Đặc thù |
|---|---|---|---|
| 💊 **Trường Dược** | ✅ Sẵn sàng | 5 năm · 102 module · 85+ scenarios | Hoá hữu cơ → OSCE 10 trạm. Kèm 7+ phiên bản 3D/VR Three.js + WebXR (sắp xếp ATC, bào chế GMP, sắc ký TLC, ER, GMP factory tour…). |
| 💼 **Trường Kinh tế** | 🧪 Preview | 4 năm · 33 module | Cử nhân Kinh tế. Skeleton chương trình + mô phỏng doanh nghiệp · stock sim · pitch battle. Quiz nội dung đang biên soạn. |
| 💻 **Trường CNTT** | 🧪 Preview | 4 năm · 35 module | Cử nhân CNTT/SE. Skeleton từ Python → ML → Cloud · CTF Lab · Hackathon. Quiz nội dung đang biên soạn. |

Chuyển trường: click vào card trên trang chủ, hoặc thêm URL param `?domain=pharmacy|economics|it`.

---

## 🚀 Quick start

```bash
git clone https://github.com/Lampx83/Tizia.git
cd Tizia
npm install
npm run dev               # http://localhost:8041
```

Docker:
```bash
docker compose up --build -d
# → http://localhost:8041
```

Dữ liệu SQLite lưu trong named volume `tizia-data` (mount `/data`).

---

## 🧱 Kiến trúc

```
public/js/
├── engine/              # ENGINE — domain-agnostic
│   ├── types.js         # JSDoc: Drug, Herb, ClinicalCase, Scenario, CourseModule,
│   │                    #        ExperienceMode, DomainConfig, Wallet, Achievement
│   ├── learning-path.js # bridge: re-export MODULES + computeUnlock + CATEGORIES
│   ├── domain.js        # DOMAIN_REGISTRY + DOMAIN_META + getActiveDomainId()
│   ├── path-renderer.js # subway-map + side rail + wallet pill + toast
│   ├── wallet.js        # stars + coin + streak + achievement engine (localStorage)
│   ├── quiz-stub.js     # auto-stub quiz cho module thiếu nội dung
│   ├── storage.js       # localStorage helper + auto-migration cũ→mới
│   ├── scenario-engine.js, assessment.js, ai-tutor.js
│   └── drug-db.js, herb-db.js, case-db.js   # pharmacy-specific data (sẽ chuyển vào domains/pharmacy/)
│
├── domains/             # DOMAINS — mỗi trường = 1 folder
│   ├── pharmacy/
│   │   ├── index.js     # barrel: DOMAIN, MODULES, SUBJECTS, ACHIEVEMENTS
│   │   ├── modules.js   # augment raw MODULES với experiences[]
│   │   ├── subjects.js  # 50+ môn của Dược
│   │   ├── achievements.js
│   │   └── experiences.js   # HTML page → ExperienceMode mapping
│   ├── economics/  (cùng shape)
│   └── it/         (cùng shape)
│
├── scenarios/           # Engine JSON scenarios (quiz / drag-match / calculator / …)
└── topic-modes.js       # Card gộp các phiên bản 2D/3D/VR/Meta cho 1 chủ đề
```

### Thêm trường mới
1. `mkdir public/js/domains/<id>` và copy shape từ `domains/economics/` (skeleton ngắn nhất).
2. Khai báo `DOMAIN` (id, name, icon, yearsTotal, yearLabels, tagline).
3. Push 1 dòng vào `DOMAIN_REGISTRY` + `DOMAIN_META` trong [public/js/engine/domain.js](public/js/engine/domain.js).
4. School selector tự nhận; path tự render; quiz stub tự sinh khi thiếu.

---

## 🗺️ Trang chủ — Lộ trình học tập

Mỗi trường được hiển thị dưới dạng **subway-map** theo năm:
- Mỗi năm = 1 chapter dọc; module = node trong CSS grid
- Prereq giữa các module = SVG line màu theo subject (lookup `domains/<id>/subjects.js`)
- Mỗi node có **mode badges**: 📚 Quiz (auto) + 🥽 3D · 🕹️ VR/XR · 📱 2D · 🌐 Metaverse · 📦 Native APK · 🎨 AR (placeholder) nếu module có `experiences[]`
- Locked → dim + 🔒 + tooltip "Cần pass: X" hoặc "Cần X⭐ tổng"

### Gamification (tất cả trường dùng chung)
- ⭐ **Stars** — 0–3 sao mỗi module (lưu `tizia:progress`)
- 🪙 **Pharma-coin** — `stars × 10 + streak × 2` mỗi lượt complete (lưu `tizia:wallet:v1`)
- 🔥 **Streak** — số ngày liên tiếp truy cập
- 🏆 **Achievements** — catalog đặc thù từng trường (12-20 huy hiệu/trường) → toast khi unlock

---

## 🎓 Trường Dược — chi tiết

Trường có nội dung đầy đủ nhất hiện tại:

| Mục | URL | Mô tả |
|---|---|---|
| **2D Arcade Sắp xếp ATC** | `/2d-arcade.html` | Canvas 2D · MediaPipe hoặc chuột · 10 cấp độ · combo + SFX |
| **3D Realistic Sắp xếp** | `/3d-shelf.html` | Three.js + WebXR Hand Tracking native (Quest/Vision Pro) |
| **3D Phòng bào chế GMP** | `/compounding-lab.html` | PBR + glass refraction + cân điện tử + multiplayer (`/ws-lab`) |
| **3D Sắc ký TLC** | `/sac-ky-3d.html` | 6 bước TLC · UV inspection · đo Rf |
| **A-Frame VR Sắc ký** | `/sac-ky-vr-web.html` | Declarative WebXR cho Meta Quest browser |
| **3D Cấp cứu phản vệ** | `/PS01-er.html` | ER monitor động · ADRENALIN 0.5mg IM · BYT 51/2017 |
| **3D Tour nhà máy GMP** | `/PS15-gmp-factory.html` | Tour 4 phòng ISO 5/7/8/9 · 12 challenges |
| **OSCE Championship** | `/GC07-osce-championship.html` | 10 trạm × 5-10' · timer · chứng chỉ in được |
| **🌐 Metaverse** | `/metaverse.html` | WebSocket multiplayer (`/ws`) · Quest + Vision Pro |
| **🧠 Quiz nhanh** | `/quiz.html` | 10 MCQ · 15s/câu · streak bonus |
| **📊 Dashboard giảng viên** | `/dashboard.html` | Stats + histogram + ma trận nhầm · export CSV |

Bộ data: 81 thuốc, 30 dược liệu, 10 ca lâm sàng, 85+ scenarios theo Dược điển VN V + giáo trình
ĐH Dược HN. **AI tutor Ollama** (qwen2.5:14b) nội bộ chấm SOAP + role-play AI patient.

---

## 📦 Deploy qua Portainer (Stack from Git)

1. Portainer → **Stacks** → **+ Add stack** → name: `tizia`
2. Build method: **Repository**
3. Điền:
   - **Repository URL**: `https://github.com/Lampx83/Tizia.git`
   - **Repository reference**: `refs/heads/main`
   - **Compose path**: `docker-compose.yml`
4. Bật **Automatic updates** (tuỳ chọn) → poll 5–15 phút để auto-redeploy
5. **Deploy the stack**

Mở `http://<host>:8041`.

### ⏪ Rollback — refactor mount-order qua registry.js (ticket 04/06)

Ticket 04+06 đổi cách `server/index.js` mount context: từ ~30 lệnh `attachX()`
rải rác sang 3 lệnh `registry.mountAppPlugins/mountRouterPlugins/mountWsPlugins`
gọi 1 lần với mảng plugin — đụng tới **thứ tự mount của toàn bộ app** (route
HTTP lẫn 3 endpoint WebSocket `/ws`, `/ws-presence`, `/ws-live`). Runbook này
CHỈ cho refactor cụ thể đó — không phải cơ chế rollback tổng quát.

**Dấu hiệu cần rollback:** route trả 404/lỗi trước đó không có, WS không connect
được, hoặc 2 route trùng path đổi handler thắng (biết trước 1 trường hợp:
`POST /api/srs/review` — `contexts/srs/index.js` phải thắng, xem comment tại
lệnh `mountRouterPlugins` trong `server/index.js`).

**Cách revert (Portainer deploy `refs/heads/main` qua "Stack from Git"):**
```bash
# 1. Tìm merge commit đưa refactor vào main
git log --oneline main -- server/index.js server/contexts/registry.js | head -20

# 2. Revert (giữ lịch sử, không rewrite) — dùng -m 1 nếu là merge commit
git revert -m 1 <merge-commit-sha>
git push origin main
```
Portainer poll `main` mỗi 5–15 phút (nếu bật Automatic updates) → tự redeploy
image build từ commit vừa revert. Cần gấp: Portainer → Stacks → `tizia` →
**Pull and redeploy** để redeploy ngay, không chờ poll.

Revert **không cần** thao tác DB — `db.js` không đổi migration nào ở ticket
04/06 (chỉ đổi cách mount route/WS, không đổi schema), nên container cũ chạy
lại với volume hiện tại là an toàn.

### Lưu ý production
- **HTTPS BẮT BUỘC nếu cần webcam**: MediaPipe `getUserMedia` **chỉ chạy trên HTTPS hoặc localhost**.
  3 cách bật HTTPS:
  - **Cloudflare Tunnel** (đơn giản nhất, public HTTPS miễn phí): xem [cloudflared-config.example.yml](cloudflared-config.example.yml)
  - **Caddy + Let's Encrypt**: `DOMAIN=edu.example.com ACME_EMAIL=… docker compose -f docker-compose.yml -f docker-compose.tls.yml up -d`
  - **Caddy + mkcert** (LAN nội bộ): trust root CA trên từng máy
- **Backup volume**:
  ```bash
  docker run --rm -v tizia_tizia-data:/data -v $PWD:/backup alpine \
    tar czf /backup/tizia-backup.tar.gz /data
  ```
- **Đổi port host**: sửa `8041:8041` → `<host_port>:8041` trong compose, KHÔNG đổi `PORT` env.
- **Chỉ mục đồ thị codebase cho AI board (codegraph)**: `npm run codegraph:update` chạy
  `graphify update .` (AST thuần, CPU-only, 0 LLM token — cần cài `graphify` CLI trên host,
  không cài trong container) để cập nhật `graphify-out/` cho harness AI board tra cứu trước
  khi đọc file thật. Đặt tên script riêng `codegraph:update` (không phải `graphify:update`)
  để tách biệt rõ với việc dùng CLI `graphify` cá nhân qua Claude Code (`/graphify`, cấu
  hình global của người viết code) — cùng 1 binary `graphify`, nhưng 2 người gọi khác nhau:
  harness AI board tự động gọi `codegraph:update` sau mỗi merge; Claude Code interactive
  vẫn gọi thẳng `graphify` như bình thường, không qua script này. Không có CI/cron sẵn
  trong repo — lên lịch bằng cron/Task Scheduler của host sau mỗi merge vào `main`, hoặc
  chạy nightly. Đây chỉ để THU HẸP phạm vi tìm kiếm — luôn đọc lại file thật trước khi kết
  luận, không coi kết quả graph là câu trả lời cuối.

---

## 🔌 API

| Method | Path | Mô tả |
|---|---|---|
| `GET`  | `/api/health` | Health check (`{service: 'tizia', …}`) |
| `POST` | `/api/attempts` | `{version, playerName?, score, correct, total, durationMs?, details?}` |
| `GET`  | `/api/leaderboard?version=&limit=10` | Top điểm theo version |
| `GET`  | `/api/stats?version=` | Tổng lượt, TB, perfect, best |
| `GET`  | `/api/histogram?version=` | Phổ điểm bucket 10đ |
| `GET`  | `/api/confusion?version=` | Ma trận nhóm thực → nhóm SV đặt |
| `GET`  | `/api/recent?limit=20` | Lượt chơi gần nhất |
| `GET`  | `/api/export.csv` | Tải toàn bộ attempts (UTF-8 BOM, tên file `tizia-attempts-YYYY-MM-DD.csv`) |
| `GET`  | `/api/badges` | Danh sách tất cả huy hiệu |
| `GET`  | `/api/achievements?player=` | Huy hiệu đã mở khoá của 1 SV |
| `POST` | `/api/ai/grade-soap`, `/patient-turn`, `/evaluate-roleplay` | AI tutor (Ollama) |
| `GET`  | `/api/ai-board/inbox` | Hộp thư Ban điều hành AI — yêu cầu pending/reviewing toàn hệ thống. **Đọc-chỉ**, auth bằng header `x-ai-board-key`, chỉ tồn tại khi đặt `AI_BOARD_KEY` (xem dưới) |
| `POST` | `/api/ai-board/worker/*` | Worker D0 claim/snapshot/heartbeat/run/event/plan/release qua lease, auth bằng `x-ai-worker-key`; không có route SQL/admin/merge |
| `GET`  | `/api/admin/ai-board/queue` | Hàng đợi root ticket tối thiểu cho admin |
| `WS`   | `/ws` | Multiplayer cho Metaverse |
| `WS`   | `/ws-lab` | Multiplayer cho Phòng bào chế |
| `WS`   | `/ws-race` | Race 1v1 (sắp có) |

### Biến môi trường

| Tên | Mặc định | Mô tả |
|---|---|---|
| `PORT` | `8041` | Cổng HTTP |
| `HOST` | `0.0.0.0` | Bind address |
| `DATA_DIR` | `./data` (host) / `/data` (Docker) | Thư mục SQLite |
| `BASE_PATH` | `` | Path prefix (vd `/ps` cho `tizia.vn/ps`) |
| `OLLAMA_URL` | dev tunnel | Endpoint Ollama |
| `OLLAMA_SECKEY` | `pharmasim` | Header `x-ollama-seckey` (shared secret nội bộ) |
| `OLLAMA_MODEL` | `qwen2.5:14b-instruct-ctx16k` | Tên model |
| `AI_BOARD_KEY` | *(trống)* | Bật `/api/ai-board/inbox`. ≥24 ký tự (`openssl rand -hex 32`); trống = route 404 |
| `AI_BOARD_WORKER_KEY` | *(trống)* | Bật worker API D0. Dùng key riêng ≥24 ký tự; trống = route 404 |

### 🏛️ Hộp thư cho Ban điều hành AI

Routine "Ban điều hành AI" chạy ngoài server (môi trường agent/CI) nên không có
cookie session và cũng không có volume production. Hai đường đọc hộp thư:

| Script | Đọc từ | Chạy được ở đâu |
|---|---|---|
| `server/scripts/sync-inbox.mjs` | file SQLite trực tiếp | **chỉ trên máy production** |
| `scripts/fetch-inbox.mjs` | HTTP `/api/ai-board/inbox` | bất kỳ đâu (không cần `npm install`) |

Cả hai ghi ra `ai-board/inbox.json` với cùng một định dạng.

```bash
# trên server: sinh key rồi thêm vào .env và khởi động lại
openssl rand -hex 32

# từ môi trường agent:
AI_BOARD_KEY=<key> node scripts/fetch-inbox.mjs
```

Route là **đọc-chỉ** — không đổi được trạng thái yêu cầu qua key này. Phản hồi HS
vẫn đi qua admin (`POST /api/admin/requests/:id/reply`, cần cookie + `role=admin`)
hoặc `node scripts/admin-reply.js` chạy trên máy có DB.

### Worker D0 qua HTTP

Worker host không mount/mở SQLite. `off` là mặc định và không claim việc;
`shadow` chỉ precheck/lập plan/tạo child tickets, không tạo branch, code hay PR.

```bash
# Chỉ precheck một root ticket
AI_BOARD_WORKER_MODE=shadow python ai-board/worker.py --once

# Chạy Gate 1 → 2 → 2.5, submit plan qua guardrails server và ticketize
AI_BOARD_WORKER_MODE=shadow python ai-board/worker.py --once --plan
```

Server giữ lease khoảng hai phút; mọi snapshot/run/event/plan/release đều bị ràng
buộc vào worker + lease hiện tại. Plan sai domain/schema/scope/capability bị
fail-closed; `protected` chờ admin, `core` chuyển thẳng sang human-owned.

### 🌿 Quy ước tên branch — 3 tác giả, 3 namespace

Repo này có 3 "tác giả" tạo branch, mỗi loại một namespace — nhìn tên branch là
biết ngay ai/cái gì tạo ra nó, không cần mở PR để đoán:

| Namespace | Ai/cái gì tạo | Ví dụ |
|---|---|---|
| `feat/<slug>`, `fix/<slug>` | Dev dùng Claude Code (phiên tương tác, người yêu cầu Claude build) | `feat/live-quiz-timer` |
| `ai-board/<yyyy-mm-dd>-<skill-id>` | Harness "Ban điều hành AI" tự động (autonomous, không người giám sát trực tiếp) | `ai-board/2026-09-17-gate3-implement` |
| `claude/…` | Phiên Claude Code **của Lampx** cho phần việc riêng của họ | *(không dùng khi làm việc trong repo thay họ)* |

**Vì sao `ai-board/<yyyy-mm-dd>-<skill-id>` (nối bằng `-`, không phải thêm `/`
sau ngày):** tại thời điểm viết, remote đã có **60+ branch** dạng
`ai-board/yyyy-mm-dd` (từ 2026-06-25). Git ref là cây thư mục thật — một tên
vừa làm branch lá (`ai-board/2026-09-17`) vừa làm thư mục cha
(`ai-board/2026-09-17/gate3-implement`) là xung đột, tạo branch thứ hai sẽ lỗi
`cannot lock ref`. Nối `-skill-id` sau ngày né được xung đột đó, và đã có tiền
lệ `ai-board/2026-08-19-fix` dùng đúng format này.

**Vì sao tách namespace:** agent (dù người hay AI board) **không bao giờ push
thẳng lên `main`** — luôn qua branch + PR. `ai-board/` là việc harness tự chạy
ngoài giờ, không ai review trước khi mở PR; `feat/`/`fix/` là việc dev chủ động
yêu cầu ngay trong phiên. Trộn hai loại vào cùng namespace thì mất luôn tín
hiệu "cái PR này có người ngồi cạnh khi nó chạy hay không" — quan trọng khi
review vì mức độ tin cậy khác nhau.

**PR summary** (mọi PR, người hay AI board) nên nêu: thay đổi gì, ảnh hưởng
mấy domain/context, gate nào đã qua (áp dụng cho AI board — brainstorm/scope-
check/implement/…), và bằng chứng đã chạy thật (log test, URL curl, screenshot)
— không chỉ mô tả ý định.

---

## 🌐 Deploy dưới sub-path (vd `https://tizia.vn/ps`)

### A. Cloudflare Tunnel + Subdomain
Trỏ `ps.tizia.vn` → server. Xem [cloudflared-config.example.yml](cloudflared-config.example.yml).

### B. Path-based `tizia.vn/ps` (cần `BASE_PATH=/ps`)
```yaml
# ~/.cloudflared/config.yml
ingress:
  - hostname: tizia.vn
    path: ^/ps(/.*)?$
    service: http://localhost:8041
  - service: http_status:404
```
+ chạy app với `BASE_PATH=/ps docker compose up -d`.

Hoặc dùng [Caddyfile](Caddyfile) Pattern 2 (auto Let's Encrypt) — có thể `handle_path /ps/*` để strip prefix.

---

## 📊 Truy vấn dữ liệu trực tiếp

```bash
docker exec -it tizia sh
sqlite3 /data/pharmacy.db \
  "SELECT version, player_name, score, correct||'/'||total AS r FROM attempts ORDER BY score DESC LIMIT 10;"

# Hoặc tải CSV
curl -O http://localhost:8041/api/export.csv
```

---

## 🧬 Migration từ PharmacySIM cũ

Project trước có tên **PharmacySIM**. Sau khi tách engine đa-domain, đổi tên thành **Tizia**:
- `localStorage` tự migrate `pharmacysim:*` → `tizia:*` ngay lần đầu user mở app sau khi upgrade
- Docker container: rename `pharmacysim` → `tizia`; volume cũ `pharmacysim-data` cần restore vào `tizia-data` thủ công nếu deploy đè:
  ```bash
  docker volume create tizia_tizia-data
  docker run --rm \
    -v pharmacysim_pharmacysim-data:/from \
    -v tizia_tizia-data:/to \
    alpine sh -c 'cp -a /from/. /to/'
  ```
- `OLLAMA_SECKEY` giữ nguyên `'pharmasim'` (shared secret với Ollama server nội bộ — không liên quan brand)

---

## 📅 Roadmap

- [x] Multi-domain architecture (Dược + Kinh tế + CNTT)
- [x] Subway-map learning path
- [x] Gamification (stars + coin + streak + achievements)
- [x] VR Hand Tracking native (Quest, Vision Pro)
- [x] Multiplayer realtime (Metaverse + Compounding lab)
- [x] AI tutor Ollama (SOAP grading + AI patient role-play)
- [ ] Viết quiz thật cho ~140 module skeleton (đang dùng auto-stub)
- [ ] Trường Y (medicine)
- [ ] Trường Sư phạm, Trường Kiến trúc, …
- [ ] AR mode (WebXR `immersive-ar` cho điện thoại)
- [ ] Coin economy (mua hint, đổi avatar)
- [ ] Daily quest engine
- [ ] Auth + class/group management cross-domain

---

## 📄 License & Credits

- Engine code: MIT
- Pharmacy data: theo Dược điển VN V + giáo trình Mai Tất Tố, Lê Quan Nghiệm, Đỗ Tất Lợi, Hoàng Thị Kim Huyền
- 3D scenes: Three.js (MIT) · A-Frame (MIT) · MediaPipe (Apache 2.0)
- AI tutor: Ollama + qwen2.5:14b (Apache 2.0)
