// AN TOÀN DỮ LIỆU (17/10/2026): /api/gpp/* và /api/pharmacy/* nay cần đăng nhập.
// Trang mô phỏng vẫn mở cho khách xem, nhưng khi API trả 401 thì chuyển sang
// trang đăng nhập (kèm đường quay lại) thay vì hỏng im lặng / lưu "offline".
export function goLoginIf401(r) {
  if (!r || r.status !== 401) return false;
  const back = location.pathname + location.search;
  location.href = '/login?return=' + encodeURIComponent(back);
  return true;
}
