# Tizia · web-next (pilot)

Frontend Next.js 16 (App Router) + React 19 + Tailwind — **cùng stack với AI Portal**.
Đây là **bản pilot** chạy SONG SONG hệ vanilla+Turbo hiện tại, không thay thế nó.

## Kiến trúc
- **Frontend**: Next.js, chạy cổng **3200**.
- **Backend**: KHÔNG đổi — vẫn là Express + Postgres của Tizia (`server/`), cổng 8042 (dev `pharmacysim-local`).
- **Nối API**: `next.config.mjs` rewrites `/api/*` → Express Tizia. Cookie phiên tự forward → auth dùng chung, KHÔNG cần NextAuth.
- **Server Component** fetch qua `lib/tizia.ts` (tự forward cookie) → render sẵn ở server (SEO).
- **basePath**: đặt env `BASE_PATH=/next` để chạy dưới subpath sau reverse-proxy (coexist tizia.vn/next/*).

## Chạy dev
```bash
# 1) Backend Tizia chạy trước (cổng 8042) — vd qua preview pharmacysim-local
# 2) Cài + chạy Next:
cd web-next
npm install
npm run dev          # http://localhost:3200
```

## Trang pilot
- `/` — đọc phiên ở server (`/api/auth/me`) → chứng minh SSR + auth chung.
- `/leaderboard` — Server Component (SSR) → HTML có sẵn nội dung (SEO).
- `/dashboard` — Client Component (state React) → đổi chế độ, lọc tại chỗ, không reload.

## Bước tiếp
- Lấy design-system (shadcn/ui) đầy đủ từ AI Portal.
- Migrate thêm trang; mỗi module `server/platform/` mang frontend Next của nó.
- Trang nặng 3D/VR/game giữ standalone (three.js/A-Frame), không nhét vào React.
