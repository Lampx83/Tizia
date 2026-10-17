// ============================================================
// Trường Ngoại ngữ — Barrel stub (Phase 1 preview)
// ============================================================
// 4 module preview, chưa có curriculum đầy đủ. Mỗi module trỏ 1 portal-app
// chuyên ngành đã build sẵn (xem builtin-catalog.js).
// Phase 2: thêm SUBJECTS + ACHIEVEMENTS + EXPERIENCES per language (EN/JP/KR/CN).

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  {
    id: 'lang-vocab', code: 'L01',
    title: 'Từ vựng đa cấp độ', subjectId: 'vocabulary',
    summary: 'Luyện 2000 từ tiếng Anh thông dụng theo chủ đề. Spaced repetition + phát âm AI.',
    estimatedMinutes: 30, level: 'beginner',
    experiences: [{ kind: 'page', url: '/tu-vung-tieng-anh.html', label: '📚 Mở app từ vựng' }],
  },
  {
    id: 'lang-pronunciation', code: 'L02',
    title: 'Luyện phát âm với AI', subjectId: 'speaking',
    summary: 'AI chấm phát âm bằng Web Speech Recognition. So sánh giọng chuẩn theo từng từ.',
    estimatedMinutes: 20, level: 'beginner',
    experiences: [{ kind: 'page', url: '/luyen-phat-am.html', label: '🎤 Luyện phát âm' }],
  },
  {
    id: 'lang-flashcards', code: 'L03',
    title: 'Flashcards tự tạo', subjectId: 'vocabulary',
    summary: 'Bộ thẻ học từ vựng — tự nhập danh sách EN/JP/KR/CN, lưu cá nhân.',
    estimatedMinutes: 15, level: 'all',
    experiences: [{ kind: 'page', url: '/portal-apps/u/4/flashcards/', label: '🃏 Mở flashcards' }],
  },
  {
    id: 'lang-tutor', code: 'L04',
    title: 'AI Tutor Ngoại ngữ', subjectId: 'all',
    summary: 'Gia sư AI giải bài, dịch câu, gợi ý câu thay thế cho EN/JP/KR/CN/FR.',
    estimatedMinutes: 30, level: 'all',
    experiences: [{ kind: 'page', url: '/hoc-thong-minh.html?subject=language', label: '🎓 Học với AI' }],
  },
];

export const SUBJECTS = [
  { id: 'vocabulary', name: 'Từ vựng', icon: '📚' },
  { id: 'speaking',   name: 'Nói',     icon: '🎤' },
  { id: 'listening',  name: 'Nghe',    icon: '🎧' },
  { id: 'all',        name: 'Tổng quát', icon: '🌐' },
];
export const getSubject = (id) => SUBJECTS.find(s => s.id === id) || null;
export const ACHIEVEMENTS = [
  { id: 'first-word',      icon: '🔤', title: 'Từ đầu tiên',
    desc: 'Hoàn thành bài học đầu tiên tại Trường Ngoại ngữ',
    trigger: { quizzesPassed: 1 } },

  { id: 'vocab-builder',   icon: '📚', title: 'Xây dựng vốn từ',
    desc: 'Hoàn thành module Từ vựng đa cấp độ (L01) đạt 3 sao',
    trigger: { moduleStars: { 'lang-vocab': 3 } } },

  { id: 'pronunciation-ace', icon: '🎤', title: 'Phát âm chuẩn',
    desc: 'Hoàn thành module Luyện phát âm với AI (L02) đạt 3 sao',
    trigger: { moduleStars: { 'lang-pronunciation': 3 } } },

  { id: 'flashcard-pro',   icon: '🃏', title: 'Flashcard Master',
    desc: 'Hoàn thành module Flashcards tự tạo (L03) đạt 3 sao',
    trigger: { moduleStars: { 'lang-flashcards': 3 } } },

  { id: 'ai-learner',      icon: '🤖', title: 'Học cùng AI',
    desc: 'Hoàn thành module AI Tutor Ngoại ngữ (L04) đạt 3 sao',
    trigger: { moduleStars: { 'lang-tutor': 3 } } },

  { id: 'multilingual',    icon: '🌐', title: 'Đa ngôn ngữ',
    desc: 'Hoàn thành cả 4 module Ngoại ngữ (L01–L04) — thành thạo ngoại ngữ toàn diện',
    trigger: { moduleStars: { 'lang-vocab': 2, 'lang-pronunciation': 2, 'lang-flashcards': 2, 'lang-tutor': 2 } } },

  { id: 'star-4',          icon: '⭐', title: 'Bước đầu ngoại ngữ',
    desc: 'Tích lũy 4 sao đầu tiên tại Trường Ngoại ngữ — đã bắt đầu hành trình học ngôn ngữ',
    trigger: { totalStars: 4 } },

  { id: 'star-8',          icon: '🌟', title: 'Nửa chặng ngoại ngữ',
    desc: 'Tích lũy 8 sao — đã thành thạo nửa chương trình, vốn từ và phát âm đang tiến bộ rõ rệt',
    trigger: { totalStars: 8 } },

  { id: 'star-12',         icon: '🏆', title: 'Thông thạo ngoại ngữ',
    desc: 'Tích lũy 12 sao — hoàn thành xuất sắc toàn bộ 4 module Ngoại ngữ, sẵn sàng giao tiếp thực tế',
    trigger: { totalStars: 12 } },

  { id: 'streak-3',       icon: '🔤', title: 'Học ngoại ngữ 3 ngày liên tiếp',
    desc: 'Luyện tập 3 ngày liên tiếp — hình thành thói quen học ngoại ngữ hàng ngày',
    trigger: { streak: 3 } },

  { id: 'streak-5',       icon: '🗣️', title: 'Nửa tuần ngoại ngữ',
    desc: 'Học ngoại ngữ 5 ngày liên tiếp — thói quen học hàng ngày đang hình thành rõ rệt',
    trigger: { streak: 5 } },

  { id: 'streak-7',       icon: '📅', title: 'Một tuần luyện tập',
    desc: 'Học ngoại ngữ đều đặn 7 ngày — đủ để cảm nhận sự tiến bộ rõ rệt',
    trigger: { streak: 7 } },

  { id: 'streak-14',      icon: '⚡', title: '2 tuần kiên trì',
    desc: 'Duy trì học 14 ngày liên tiếp — vốn từ và phát âm cải thiện đáng kể',
    trigger: { streak: 14 } },

  { id: 'streak-30',      icon: '🏆', title: 'Một tháng chinh phục ngoại ngữ',
    desc: 'Học liên tục 30 ngày tại Trường Ngoại ngữ — tư duy ngôn ngữ thực sự hình thành',
    trigger: { streak: 30 } },
];
export const getExperiencesFor = (mid) => MODULES.find(m => m.id === mid)?.experiences || [];
export const listModulesWithExperiences = () => MODULES.filter(m => m.experiences?.length);

/** @type {import('../../engine/types.js').DomainConfig} */
export const DOMAIN = {
  id: 'language',
  name: 'Trường Ngoại ngữ',
  shortName: 'Ngoại ngữ',
  icon: '🗣️',
  yearsTotal: 1,
  yearLabels: ['Cơ bản → Nâng cao (linh hoạt)'],
  tagline: 'Anh · Trung · Nhật · Hàn · Pháp — học theo nhịp riêng, AI chấm phát âm + sinh quiz từ vựng',
};
