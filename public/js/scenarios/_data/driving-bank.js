// Nguồn seed collection 'driving-600'.
// 2026-07-03: thay bằng BỘ 600 CÂU CHÍNH THỨC do SV Thì Dũng cung cấp (req #44/#45),
// đã lọc bỏ câu cần hình ảnh (biển báo/sa hình) → 344 câu trả lời được bằng chữ,
// giữ đủ 58 câu điểm liệt (c:true). Các file chương cũ 01–05 giữ lại tham khảo,
// KHÔNG còn dùng cho seed.
import { ITEMS as OFFICIAL } from './driving/official-600.js';
// id ổn định để seed/prune đúng (q<index>).
export const ITEMS = OFFICIAL.map((it, i) => ({ id: 'q' + String(i + 1).padStart(3, '0'), ...it }));
