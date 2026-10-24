# Migration vanilla → Next (theo dõi)

Next (`:3200`) là **cửa trước** của cả Tizia. Trang đã migrate = route Next native;
còn lại tự **fallback** sang vanilla Express (`:8042`). Mục tiêu: fallback → 0 rồi xoá vanilla.

## Cách thêm 1 trang (recipe)
1. Tạo `app/<ten>/page.tsx` (Server Component nếu render nội dung SEO; `'use client'` nếu là form/tương tác).
2. Fetch dữ liệu: server dùng `lib/tizia.ts` (forward cookie); client `fetch('/api/...', {credentials:'same-origin'})`.
3. URL `.html` cũ: thêm tên vào mảng `MIGRATED` trong `next.config.mjs` → `/ten.html` rewrite sang `/ten`.
4. Verify: render đúng, tương tác/nối API OK, redirect/logic giữ nguyên; `curl :3200/ten` có `_next/static`.

## Trạng thái
| Trang | Route Next | Thay cho | Trạng thái |
|---|---|---|---|
| Đăng nhập | `/login` (+`/login.html`) | `login.html` | ✅ native — form + SSO + guest + redirect |
| Đăng ký | `/register` (+`/register.html`) | `register.html` | ✅ native — role + redirect complete-profile |
| Khai hồ sơ | `/complete-profile` (+`.html`) | `complete-profile.html` | ✅ native — form theo role (HS lớp / SV ngành+khoá / GV) |
| Khám phá | `/kham-pha` (+`.html`) | `kham-pha.html` | ✅ native (SSR) — bản đồ tính năng theo tier, mở/khoá |
| Bảng xếp hạng (demo) | `/leaderboard` | — | ✅ native (SSR) |
| Dashboard (demo) | `/dashboard` | — | ✅ native (tương tác) |
| **Tất cả trang khác (~102)** | — | — | ⏳ fallback vanilla |

**→ Cả luồng AUTH/ONBOARDING (login → register → complete-profile) đã native Next, verify end-to-end.**

## Lộ trình
- **Đợt 1** (đang làm): auth ✅ → tiếp: trang duyệt/nội dung/form (home, pricing, cv, profile, school list, subject…).
- **Đợt 2**: tương tác vừa (quiz, srs, luyện đề, nâng lực, shop).
- **Đợt 3**: nặng 3D/VR/game/lab — cân nhắc GIỮ fallback/nhúng thay vì viết lại.
- Khi fallback = 0 (hoặc chỉ còn trang cố ý giữ) → xoá vanilla HTML-serving, Express thành API thuần.

## Chạy dev
- Postgres: `docker compose up -d tizia-postgres` (cần Docker: `open -a Docker`).
- Vanilla API+fallback: server Express `:8042` (preview `pharmacysim-local`).
- Next (cửa trước): `cd web-next && npm run dev` → **dùng `:3200` làm app**.
