// ============================================================
// Integrations catalog — 1 nguồn dữ liệu duy nhất cho cả apps.html (launcher)
// và khối "Ứng dụng" trên trang chủ (render theo trường đang xem).
//
// Thêm app mới: append vào INTEGRATIONS.
// Bật/tắt app cho 1 trường: sửa DOMAIN_APPS.
// ============================================================

/**
 * @typedef {Object} IntegrationApp
 * @property {string} id                 short id ("scoreup")
 * @property {string} icon               emoji
 * @property {string} name               tên hiển thị
 * @property {string} tag                phụ đề ngắn
 * @property {string} color              accent CSS color
 * @property {string} desc               mô tả 1-2 câu
 * @property {string} [url]              URL công khai đã deploy → iframe trực tiếp (ưu tiên)
 * @property {string} path               đường dẫn proxy cùng origin (fallback, relative)
 */

/** @type {IntegrationApp[]} */
export const INTEGRATIONS = [
  { id: 'scoreup',  icon: '📝', name: 'ScoreUp',    tag: 'Thi & luyện trắc nghiệm',
    color: '#f59e0b', path: 'scoreup/', url: 'https://fit.neu.edu.vn/scoreup/',
    desc: 'Ngân hàng câu hỏi, đề thi, chấm điểm và gợi ý học tập cá nhân hoá.' },
  { id: 'codelab',  icon: '💻', name: 'Codelab',    tag: 'Online Judge: chấm code thật',
    color: '#38bdf8', path: 'codelab/',
    desc: 'Luyện & thi lập trình, chạy code thật trong sandbox, chấm tự động bằng test case.' },
  { id: 'smartdoc', icon: '📚', name: 'Smartdoc',   tag: 'Giáo trình & bài giảng tương tác',
    color: '#22c55e', path: 'smartdoc/',
    desc: 'Biến tài liệu Word/Google Docs thành bài giảng web tương tác và phòng học trực tiếp.' },
  { id: 'feedback', icon: '🎯', name: 'FeedBackMe', tag: 'LMS · phản hồi · exam',
    color: '#a78bfa', path: 'feedback/',
    desc: 'LMS đầy đủ: khoá học, exam có giám thị, phản hồi bằng AI theo lỗi sai và kỹ năng.' },
];

/**
 * App id list (tham chiếu INTEGRATIONS) cho từng trường, đúng thứ tự muốn hiển thị.
 * Mảng rỗng = trường không có app tích hợp → khối ẩn hoàn toàn.
 */
export const DOMAIN_APPS = {
  pharmacy:   ['scoreup', 'smartdoc', 'feedback'],
  economics:  ['scoreup', 'smartdoc', 'feedback'],
  it:         ['codelab', 'scoreup', 'smartdoc', 'feedback'],
  highschool: ['scoreup', 'codelab', 'smartdoc'],
  secondary:  ['scoreup', 'codelab'],
  primary:    ['scoreup'],
  preschool:  [],
};

/** Lấy danh sách app phù hợp cho 1 trường, đúng thứ tự khai báo. */
export function getAppsForDomain(domainId) {
  const ids = DOMAIN_APPS[domainId] || [];
  const byId = Object.fromEntries(INTEGRATIONS.map((a) => [a.id, a]));
  return ids.map((id) => byId[id]).filter(Boolean);
}
