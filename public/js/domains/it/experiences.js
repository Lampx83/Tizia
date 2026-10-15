// ============================================================
// IT domain — Experience registry
// ============================================================
// Gắn các ứng dụng tích hợp (proxy cùng origin, xem server/app-proxy.js +
// public/apps.html) làm "phiên bản trải nghiệm" trên subway-map. URL trỏ vào
// launcher apps.html?app=<id> (relative → an toàn với BASE_PATH); launcher
// nhúng app qua iframe và có thanh quay lại Tizia.
// ============================================================

/** @typedef {import('../../engine/types.js').ExperienceMode} ExperienceMode */

/** Catalog dùng chung — một định nghĩa, gắn nhiều module. */
const PAGES = {
  codelab: {
    mode: '2d', icon: '💻', label: 'Codelab', tech: 'Online Judge · Judge0', url: 'apps.html?app=codelab',
    desc: 'Mở Codelab — chạy & chấm code thật trong sandbox, test case tự động.',
    specs: ['ok:Chấm code thật', 'Nhiều ngôn ngữ', 'Cuộc thi', 'bad:Cần Codelab chạy'],
  },
  scoreup: {
    mode: 'quiz', icon: '📝', label: 'ScoreUp', tech: 'Trắc nghiệm · Ngân hàng câu hỏi', url: 'apps.html?app=scoreup',
    desc: 'Mở ScoreUp — luyện & thi trắc nghiệm với câu hỏi thật, chấm điểm tức thì.',
    specs: ['ok:Câu hỏi thật', 'Đề thi', 'Gợi ý AI', 'bad:Cần ScoreUp chạy'],
  },
  smartdoc: {
    mode: 'meta', icon: '📚', label: 'Smartdoc', tech: 'Giáo trình tương tác', url: 'apps.html?app=smartdoc',
    desc: 'Mở Smartdoc — giáo trình & bài giảng web tương tác, phòng học trực tiếp.',
    specs: ['ok:Word → web', 'Sách điện tử', 'Phòng học', 'bad:Cần Smartdoc chạy'],
  },
  feedback: {
    mode: 'native', icon: '🎯', label: 'FeedBackMe', tech: 'LMS · Exam · AI feedback', url: 'apps.html?app=feedback',
    desc: 'Mở FeedBackMe — exam có giám thị + phản hồi AI theo lỗi sai và kỹ năng.',
    specs: ['ok:Exam giám thị', 'AI feedback', 'Gamification', 'bad:Cần FeedBackMe chạy'],
  },
};

/** @type {Record<string, ExperienceMode[]>} */
const MODULE_PAGES = {
  // ── Year 1 (đã có quiz) ──
  'I1.1': [PAGES.codelab, PAGES.scoreup],  // Python: thực hành code + luyện trắc nghiệm
  'I1.2': [PAGES.scoreup],                 // Toán rời rạc: luyện trắc nghiệm
  'I1.3': [PAGES.scoreup],                 // Kiến trúc máy tính: luyện trắc nghiệm
  'I1.4': [PAGES.codelab, PAGES.scoreup],  // Linux: thực hành lệnh + luyện trắc nghiệm
  'I1.5': [PAGES.scoreup],                 // Tiếng Anh CNTT: luyện trắc nghiệm
  // ── Year 2+ ──
  'I2.1': [PAGES.codelab, PAGES.scoreup],  // Cấu trúc dữ liệu & Giải thuật
  'I2.2': [PAGES.codelab],                 // Lập trình hướng đối tượng (Java) — thực hành code
  'I2.3': [PAGES.scoreup],                 // Cơ sở dữ liệu
  'I2.4': [PAGES.scoreup],                 // Mạng máy tính — luyện trắc nghiệm
  'I2.5': [PAGES.codelab],                 // Thiết kế Web (HTML/CSS/JS) — thực hành code
  'I3.1': [PAGES.smartdoc],                // Kỹ thuật phần mềm — giáo trình
  'I3.2': [PAGES.scoreup],                 // Phân tích & Thiết kế hệ thống — luyện trắc nghiệm
  'I3.3': [PAGES.scoreup],                 // Trí tuệ nhân tạo — luyện trắc nghiệm
  'I3.4': [PAGES.codelab],                 // Machine Learning — thực hành code Python/notebook
  'I3.5': [PAGES.codelab, PAGES.scoreup],  // Web Full-stack
  'I3.6': [PAGES.codelab],                 // Mobile dev — thực hành code
  'I3.7': [PAGES.codelab, PAGES.scoreup],  // DevOps & Cloud — thực hành CLI + trắc nghiệm
  'I3.8': [PAGES.scoreup],                 // An toàn thông tin
  'I4.1': [PAGES.scoreup],                 // Kiến trúc phần mềm + Patterns — luyện trắc nghiệm
  'I4.2': [PAGES.codelab],                 // Điện toán đám mây — thực hành script/CLI
  'I4.3': [PAGES.codelab],                 // Khoa học dữ liệu — thực hành code Python
  'I4.4': [PAGES.scoreup],                 // Blockchain & Web3 — luyện trắc nghiệm
  'I4.5': [PAGES.feedback],                // Khoá luận CNTT — exam + phản hồi
  // ── Games / Practice ──
  'IG01': [PAGES.codelab],   // Code Race — Giải thuật 5 phút
  'IG02': [PAGES.codelab],   // Bug Hunt — Debug speed
  'IG03': [PAGES.scoreup],   // SQL Detective
  'IG04': [PAGES.codelab],   // Kafka — System Design battle
};

export function getExperiencesFor(moduleId) {
  return MODULE_PAGES[moduleId] || [];
}

export function listModulesWithExperiences() {
  return Object.keys(MODULE_PAGES);
}
