// ============================================================
// Trường Lái xe — Barrel stub (Phase 1 preview)
// ============================================================
// 3 module preview cho bằng lái B1/B2. Phase 2 sẽ thêm C/D/E + sa hình 3D.

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  {
    id: 'driving-theory', code: 'D01',
    title: '600 câu lý thuyết B1/B2', subjectId: 'theory',
    summary: 'Bộ 600 câu lý thuyết theo Bộ GTVT — luyện tập + thi thử 25 câu/22 phút. Đánh dấu CÂU LIỆT phải đúng.',
    estimatedMinutes: 60, level: 'beginner',
    experiences: [{ kind: 'page', url: '/luat-giao-thong-600.html', label: '📖 Luyện 600 câu' }],
  },
  {
    id: 'driving-signs', code: 'D02',
    title: 'Biển báo Giao thông', subjectId: 'signs',
    summary: 'Học 4 nhóm biển QCVN 41:2019 (cấm/nguy hiểm/hiệu lệnh/chỉ dẫn). SVG vẽ tay + chế độ đố vui.',
    estimatedMinutes: 30, level: 'beginner',
    experiences: [{ kind: 'page', url: '/bien-bao-giao-thong.html', label: '🚸 Học biển báo' }],
  },
  {
    id: 'driving-quiz', code: 'D03',
    title: 'AI Quiz tình huống', subjectId: 'situation',
    summary: 'AI sinh quiz tình huống lái xe theo cấp B1/B2/C/D. Có giải thích lý do, đa dạng tình huống.',
    estimatedMinutes: 25, level: 'intermediate',
    experiences: [{ kind: 'page', url: '/ai-quiz-gen.html?topic=driving', label: '🧠 Quiz tình huống' }],
  },
];

export const SUBJECTS = [
  { id: 'theory',    name: 'Lý thuyết',  icon: '📖' },
  { id: 'signs',     name: 'Biển báo',   icon: '🚸' },
  { id: 'situation', name: 'Tình huống', icon: '🎮' },
  { id: 'sahinh',    name: 'Sa hình',    icon: '🚗' },
];
export const getSubject = (id) => SUBJECTS.find(s => s.id === id) || null;
export const ACHIEVEMENTS = [
  { id: 'first-lesson',   icon: '🚦', title: 'Bước đầu học lái',
    desc: 'Hoàn thành quiz đầu tiên tại Trường Lái xe',
    trigger: { quizzesPassed: 1 } },

  { id: 'theory-master',  icon: '📖', title: 'Thông thuộc lý thuyết',
    desc: 'Hoàn thành module 600 câu lý thuyết B1/B2 (D01) đạt 3 sao',
    trigger: { moduleStars: { 'driving-theory': 3 } } },

  { id: 'sign-reader',    icon: '🚸', title: 'Đọc vanh biển báo',
    desc: 'Hoàn thành module Biển báo Giao thông (D02) đạt 3 sao',
    trigger: { moduleStars: { 'driving-signs': 3 } } },

  { id: 'road-thinker',   icon: '🧠', title: 'Tư duy tình huống',
    desc: 'Hoàn thành module AI Quiz tình huống (D03) đạt 3 sao',
    trigger: { moduleStars: { 'driving-quiz': 3 } } },

  { id: 'license-ready',  icon: '🏅', title: 'Sẵn sàng thi sát hạch',
    desc: 'Hoàn thành cả 3 module lý thuyết, biển báo và tình huống',
    trigger: { moduleStars: { 'driving-theory': 2, 'driving-signs': 2, 'driving-quiz': 2 } } },

  { id: 'star-3',          icon: '⭐', title: 'Khởi hành',
    desc: 'Tích lũy 3 sao đầu tiên tại Trường Lái xe — đã bắt đầu hành trình học lái',
    trigger: { totalStars: 3 } },

  { id: 'star-6',          icon: '🌟', title: 'Ôn luyện nghiêm túc',
    desc: 'Tích lũy 6 sao — đã thành thạo ít nhất 2 trong 3 module lý thuyết lái xe',
    trigger: { totalStars: 6 } },

  { id: 'star-9',          icon: '🏆', title: 'Sẵn sàng thi sát hạch',
    desc: 'Tích lũy 9 sao — hoàn thành xuất sắc toàn bộ chương trình lý thuyết lái xe',
    trigger: { totalStars: 9 } },

  { id: 'streak-3',       icon: '🚦', title: 'Học lái 3 ngày liên tiếp',
    desc: 'Ôn lý thuyết hoặc biển báo liên tục 3 ngày — thói quen tốt cho kỳ thi',
    trigger: { streak: 3 } },

  { id: 'streak-5',       icon: '📋', title: 'Nửa tuần ôn lý thuyết',
    desc: 'Học tại Trường Lái xe 5 ngày liên tiếp — đủ để nắm vững phần biển báo cơ bản',
    trigger: { streak: 5 } },

  { id: 'streak-7',       icon: '📅', title: 'Học đều cả tuần',
    desc: 'Học tại Trường Lái xe 7 ngày liên tiếp — đủ để nhớ vững phần lý thuyết',
    trigger: { streak: 7 } },

  { id: 'streak-14',      icon: '⚡', title: '2 tuần ôn luyện',
    desc: 'Duy trì học 14 ngày liên tiếp — đủ nền tảng tốt để đi thi sát hạch',
    trigger: { streak: 14 } },

  { id: 'streak-30',      icon: '🏆', title: 'Ôn thi đúng nghĩa',
    desc: 'Học liên tục 30 ngày tại Trường Lái xe — sẵn sàng cho mọi phần thi',
    trigger: { streak: 30 } },
];
export const getExperiencesFor = (mid) => MODULES.find(m => m.id === mid)?.experiences || [];
export const listModulesWithExperiences = () => MODULES.filter(m => m.experiences?.length);

/** @type {import('../../engine/types.js').DomainConfig} */
export const DOMAIN = {
  id: 'driving',
  name: 'Trường Lái xe',
  shortName: 'Lái xe',
  icon: '🚗',
  yearsTotal: 1,
  yearLabels: ['Cấp tốc 3 tháng → thi sát hạch'],
  tagline: 'B1/B2/C/D — 600 câu lý thuyết, biển báo, sa hình 4 bài, mô phỏng cabin lái',
};
