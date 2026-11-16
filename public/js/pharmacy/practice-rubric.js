// =====================================================================
// Bộ tiêu chí chấm điểm A1–E5 cho phiên thực hành nhà thuốc 3D.
// Yêu cầu #142 (ThS Nguyệt Phương, 19/08) — mục 10 & 11 bản đặc tả.
//
// 5 nhóm × 5 tiêu chí = 25 tiêu chí, mỗi tiêu chí 0–4 điểm → tổng 100.
// Dùng CHUNG: server (server/pharmacy-practice.js) chấm & lưu, client hiển thị.
//
// `source` quyết định CÁCH chấm — đây là điểm mấu chốt của đặc tả:
//   'action_3d'    → chấm TẤT ĐỊNH bằng nhật ký thao tác, KHÔNG hỏi AI.
//   'conversation' → AI chấm dựa trên lời thoại.
//   'combined'     → AI chấm nhưng được cấp cả nhật ký thao tác làm bằng chứng.
// Lý do: đặc tả cấm tính điểm thao tác chỉ vì sinh viên NÓI đã làm ("em đã
// kiểm tra hạn dùng" mà nhật ký không có sự kiện tương ứng thì không được tính).
// =====================================================================

export const RUBRIC_VERSION = 'pharmacomm-rubric-A1E5-v1';
export const MAX_PER_CRITERION = 4;

export const RUBRIC_GROUPS = {
  A: 'Giao tiếp và thiết lập cuộc gặp',
  B: 'Khai thác thông tin',
  C: 'Thao tác chuyên môn trong môi trường 3D',
  D: 'Tư vấn sử dụng thuốc',
  E: 'Hoàn tất và tác phong',
};

// requires: các loại thao tác 3D thoả mãn tiêu chí (dùng cho source 'action_3d').
export const RUBRIC = [
  // ── A. Giao tiếp và thiết lập cuộc gặp ──────────────────────────────
  { code: 'A1', group: 'A', source: 'conversation', name: 'Chào hỏi, giới thiệu bản thân, thiết lập cuộc gặp' },
  { code: 'A2', group: 'A', source: 'conversation', name: 'Xác định đúng nhu cầu của người bệnh' },
  { code: 'A3', group: 'A', source: 'conversation', name: 'Giải thích lý do cần hỏi thêm thông tin' },
  { code: 'A4', group: 'A', source: 'conversation', name: 'Thể hiện sự đồng cảm với tình trạng người bệnh' },
  { code: 'A5', group: 'A', source: 'conversation', name: 'Ngôn ngữ, giọng điệu phù hợp và dễ hiểu' },

  // ── B. Khai thác thông tin ──────────────────────────────────────────
  { code: 'B1', group: 'B', source: 'conversation', name: 'Hỏi người trực tiếp dùng thuốc là ai' },
  { code: 'B2', group: 'B', source: 'conversation', name: 'Khai thác triệu chứng và thời gian mắc' },
  { code: 'B3', group: 'B', source: 'conversation', name: 'Khai thác thuốc đang dùng' },
  { code: 'B4', group: 'B', source: 'conversation', name: 'Khai thác bệnh mắc kèm (dạ dày, gan, thận…)' },
  { code: 'B5', group: 'B', source: 'conversation', name: 'Khai thác tiền sử dị ứng và thói quen rượu bia' },

  // ── C. Thao tác chuyên môn 3D (chấm tất định theo nhật ký) ──────────
  { code: 'C1', group: 'C', source: 'action_3d', name: 'Lựa chọn đúng thuốc phù hợp tình huống',
    requires: ['pick_box', 'pick_unit'] },
  { code: 'C2', group: 'C', source: 'action_3d', name: 'Lấy thuốc ra khỏi tủ và đúng số lượng',
    requires: ['pick_box', 'pick_unit'] },
  { code: 'C3', group: 'C', source: 'action_3d', name: 'Kiểm tra tên thuốc, hàm lượng, dạng bào chế',
    requires: ['inspect_drug', 'check_drug_info'] },
  { code: 'C4', group: 'C', source: 'action_3d', name: 'Kiểm tra hạn dùng trước khi giao',
    requires: ['check_expiry'] },
  { code: 'C5', group: 'C', source: 'action_3d', name: 'Ra lẻ và đóng gói thuốc',
    requires: ['retail_split', 'pack_retail', 'pack_retail_tray', 'open_box_unit'] },

  // ── D. Tư vấn sử dụng thuốc ─────────────────────────────────────────
  { code: 'D1', group: 'D', source: 'conversation', name: 'Hướng dẫn liều dùng, số lần, thời điểm uống' },
  { code: 'D2', group: 'D', source: 'conversation', name: 'Cảnh báo tác dụng không mong muốn và lưu ý khi dùng' },
  { code: 'D3', group: 'D', source: 'action_3d',    name: 'Ghi nhãn hướng dẫn sử dụng lên bao bì',
    requires: ['label_dose', 'pack_label'] },
  { code: 'D4', group: 'D', source: 'conversation', name: 'Kiểm tra sự hiểu của người bệnh (yêu cầu nhắc lại)' },
  { code: 'D5', group: 'D', source: 'combined',     name: 'Lời nói khớp với thao tác đã thực hiện' },

  // ── E. Hoàn tất và tác phong ────────────────────────────────────────
  { code: 'E1', group: 'E', source: 'action_3d',    name: 'Thanh toán, xuất hoá đơn',
    requires: ['pos_checkout', 'print_receipt'] },
  { code: 'E2', group: 'E', source: 'action_3d',    name: 'Trao thuốc cho người bệnh',
    requires: ['hand_over', 'pos_checkout'] },
  { code: 'E3', group: 'E', source: 'conversation', name: 'Dặn dò theo dõi, đi khám khi không đỡ, cho liên hệ' },
  { code: 'E4', group: 'E', source: 'combined',     name: 'Trình tự thực hành hợp lý, đủ các bước bán thuốc' },
  { code: 'E5', group: 'E', source: 'combined',     name: 'Tác phong chuyên nghiệp; xử lý thao tác sai (nếu có)' },
];

export const MAX_TOTAL = RUBRIC.length * MAX_PER_CRITERION;   // 100

export const byCode = (code) => RUBRIC.find((c) => c.code === code) || null;

// Gộp điểm theo nhóm A–E + điểm chung, quy về thang 100.
export function summarize(rows, names = RUBRIC_GROUPS) {
  const groups = {};
  for (const g of Object.keys(names)) groups[g] = { group: g, name: names[g], score: 0, max: 0 };
  let score = 0, max = 0;
  for (const r of rows) {
    const g = groups[r.criterion_group];
    if (!g) continue;
    g.score += Number(r.score) || 0;
    g.max += Number(r.max_score ?? MAX_PER_CRITERION);
    score += Number(r.score) || 0;
    max += Number(r.max_score ?? MAX_PER_CRITERION);
  }
  const pct = max > 0 ? Math.round((score / max) * 1000) / 10 : 0;
  return { groups: Object.values(groups), score, max, percent: pct };
}
