// Cờ cấu hình bán gói trả phí (AN TOÀN DỮ LIỆU / PHÁP LÝ 17/10/2026).
//
// TẮT mặc định: Tizia chưa có pháp nhân để bán hàng, xuất hoá đơn → ẩn trang
// /pricing (chỉ hiện thông báo), bỏ link "Bảng giá" ở footer và sitemap. Code bảng
// giá giữ nguyên để bật lại.
//
// Bật lại (khi đã có pháp nhân, điều khoản, chính sách): build tizia-next với
//   --build-arg NEXT_PUBLIC_PRICING_ENABLED=1
// (biến NEXT_PUBLIC_* được bake lúc build) VÀ đặt cho Express PRICING_ENABLED=1
// + PAYMENT_ENABLED=1. Xem báo cáo tizia-va-lo-hong-2026-10-17.md.
export const PRICING_ENABLED = process.env.NEXT_PUBLIC_PRICING_ENABLED === '1';
