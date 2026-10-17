// ─────────────────────────────────────────────────────────────────────────
// Phạm vi áp dụng nền SÁNG.
//
// Tizia vốn thiết kế dark-only: đa số trang (game/lab/3D/nhập vai + trang nội
// dung chưa chuyển token) hardcode chữ trắng → nếu ép nền sáng sẽ "trắng trên
// trắng" không đọc được. Nên quy ước:
//   • Trang NẰM trong allowlist dưới đây  → tôn trọng lựa chọn theme của người
//     dùng (sáng / tối / theo hệ thống). Các trang này đã (hoặc sẽ) được chuyển
//     màu sang token để đẹp ở cả 2 nền.
//   • MỌI trang khác → LUÔN hiển thị nền tối (dark-native), đảm bảo luôn đọc
//     được dù người dùng có chọn nền sáng.
//
// Thêm trang vào allowlist CHỈ sau khi đã chuyển màu chữ/nền của trang đó sang
// token (hsl(var(--foreground)) …) và verify đọc tốt ở nền sáng.
//
// ⚠️ Inline script chống-FOUC trong app/layout.tsx lặp lại danh sách này ở dạng
// regex chuỗi (chạy trước khi React hydrate) — sửa ở đây thì sửa cả ở đó.
// ─────────────────────────────────────────────────────────────────────────

export const LIGHT_THEME_ROUTES: RegExp[] = [
  /^\/(index\.html)?$/, // trang chủ
  /^\/kham-pha(\/|$)/,
  /^\/on-tap(\/|$)/, // thư viện ôn tập — trang đọc, dùng token màu nên an toàn ở nền sáng
  /^\/pricing(\/|$)/,
  /^\/league(\/|$)/,
  /^\/leaderboard(\/|$)/,
  /^\/login(\/|$)/,
  /^\/register(\/|$)/,
  /^\/complete-profile(\/|$)/,
  /^\/dashboard(\/|$)/,
  /^\/nang-luc(\/|$)/,
  /^\/marketplace(\/|$)/,
  /^\/school(\/|$)/, // trang chọn/khuôn viên trường (chrome dùng token; campus nhiều màu)
  /^\/space(\/|$)/, // trang lớp/không gian hoạt động (CSS scoped đã token-hoá 2026-07-20)
];

// Trang này có tôn trọng lựa chọn theme của người dùng không? (false = ép nền tối)
export function pathHonorsTheme(pathname: string): boolean {
  const p = (pathname || '/').replace(/\/+$/, '') || '/';
  return LIGHT_THEME_ROUTES.some((re) => re.test(p));
}
