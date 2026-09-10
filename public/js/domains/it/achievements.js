// ============================================================
// IT domain — Achievement catalog
// ============================================================

/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  { id: 'hello-world', icon: '👋', title: 'Hello World',
    desc: 'Hoàn thành quiz đầu tiên',
    trigger: { quizzesPassed: 1 } },

  { id: 'bookworm',    icon: '📚', title: 'Mọt lập trình',
    desc: 'Hoàn thành 10 quiz — thói quen học CNTT đang hình thành',
    trigger: { quizzesPassed: 10 } },

  { id: 'streak-3',    icon: '🌱', title: 'Code 3 ngày liên tiếp',
    desc: 'Streak 3 ngày — thói quen lập trình hàng ngày bắt đầu từ đây',
    trigger: { streak: 3 } },

  { id: 'streak-5',    icon: '🔥', title: 'Cháy 5 ngày',
    desc: 'Streak 5 ngày liên tiếp',
    trigger: { streak: 5 } },

  { id: 'streak-7',    icon: '📅', title: 'Code cả tuần',
    desc: 'Streak 7 ngày liên tiếp — một tuần commit mỗi ngày, lập trình viên thực thụ',
    trigger: { streak: 7 } },

  { id: 'streak-14',   icon: '⚡', title: '2 tuần code liên tục',
    desc: 'Streak 14 ngày liên tiếp — commit như một lập trình viên thực sự',
    trigger: { streak: 14 } },

  { id: 'streak-30',   icon: '🏆', title: '1 tháng code không ngừng',
    desc: 'Streak 30 ngày — kỷ luật bền vững, nền tảng của mọi kỹ sư giỏi',
    trigger: { streak: 30 } },

  { id: 'star-30',     icon: '🌟', title: '30 sao CNTT',
    desc: 'Tích luỹ 30 sao — đang trên đà chinh phục chương trình Kỹ sư',
    trigger: { totalStars: 30 } },

  { id: 'star-60',     icon: '💫', title: '60 sao CNTT',
    desc: 'Tích luỹ 60 sao — đã qua nửa hành trình Kỹ sư phần mềm',
    trigger: { totalStars: 60 } },

  { id: 'star-90',     icon: '🌠', title: '90 sao CNTT',
    desc: 'Tích luỹ 90 sao — gần hoàn thành toàn bộ chương trình CNTT',
    trigger: { totalStars: 90 } },

  { id: 'star-120',    icon: '🏆', title: 'Kỹ sư 120 sao',
    desc: 'Tích luỹ 120 sao — chinh phục toàn bộ 4 năm chương trình Kỹ sư CNTT',
    trigger: { totalStars: 120 } },

  // ── Year 1 Achievements (mới) ──
  { id: 'python-starter', icon: '🐍', title: 'Pythonista',
    desc: 'Pass Nhập môn lập trình Python (I1.1) với 3 sao',
    trigger: { moduleStars: { 'I1.1': 3 } } },

  { id: 'logic-master', icon: '🔢', title: 'Logic Master',
    desc: 'Pass Toán rời rạc (I1.2) với 3 sao',
    trigger: { moduleStars: { 'I1.2': 3 } } },

  { id: 'arch-wizard', icon: '⚙️', title: 'Kiến trúc sư máy tính',
    desc: 'Pass Kiến trúc máy tính (I1.3) với 3 sao',
    trigger: { moduleStars: { 'I1.3': 3 } } },

  { id: 'linux-geek', icon: '🐧', title: 'Linux Geek',
    desc: 'Pass Hệ điều hành Linux (I1.4) với 3 sao',
    trigger: { moduleStars: { 'I1.4': 3 } } },

  { id: 'it-english-pro', icon: '🌏', title: 'Đọc doc như gió',
    desc: 'Pass Tiếng Anh CNTT (I1.5) với 3 sao',
    trigger: { moduleStars: { 'I1.5': 3 } } },

  { id: 'year1-it-complete', icon: '🥇', title: 'Hoàn thành Năm 1 CNTT',
    desc: 'Pass toàn bộ 5 module Năm 1 (I1.1–I1.5)',
    trigger: { yearComplete: 1 } },

  { id: 'algorithmist', icon: '🌳', title: 'Algorithmist',
    desc: 'Pass Cấu trúc dữ liệu & Giải thuật (I2.1) với 3 sao',
    trigger: { moduleStars: { 'I2.1': 3 } } },

  { id: 'java-ninja',  icon: '☕', title: 'Java Ninja',
    desc: 'Pass Lập trình hướng đối tượng Java (I2.2) với 3 sao',
    trigger: { moduleStars: { 'I2.2': 3 } } },

  { id: 'sql-hero',    icon: '🗄️', title: 'SQL Hero',
    desc: 'Pass Cơ sở dữ liệu SQL (I2.3) với 3 sao',
    trigger: { moduleStars: { 'I2.3': 3 } } },

  { id: 'network-engineer', icon: '🌐', title: 'Network Engineer',
    desc: 'Pass Mạng máy tính (I2.4) với 3 sao',
    trigger: { moduleStars: { 'I2.4': 3 } } },

  { id: 'web-crafter', icon: '🎨', title: 'Web Crafter',
    desc: 'Pass Thiết kế Web HTML/CSS/JS (I2.5) với 3 sao',
    trigger: { moduleStars: { 'I2.5': 3 } } },

  { id: 'year2-it-complete', icon: '🥈', title: 'Tốt nghiệp Năm 2 CNTT',
    desc: 'Pass toàn bộ 5 module Năm 2 (I2.1–I2.5)',
    trigger: { yearComplete: 2 } },

  // ── Year 3 Achievements ──
  { id: 'se-architect', icon: '🏗️', title: 'Software Engineer',
    desc: 'Pass Kỹ thuật phần mềm (I3.1) với 3 sao',
    trigger: { moduleStars: { 'I3.1': 3 } } },

  { id: 'system-designer', icon: '📐', title: 'System Designer',
    desc: 'Pass Phân tích & Thiết kế hệ thống (I3.2) với 3 sao',
    trigger: { moduleStars: { 'I3.2': 3 } } },

  { id: 'ai-scientist', icon: '🧠', title: 'AI Scientist',
    desc: 'Pass Trí tuệ nhân tạo (I3.3) với 3 sao',
    trigger: { moduleStars: { 'I3.3': 3 } } },

  { id: 'ai-master',   icon: '🤖', title: 'AI Master',
    desc: 'Pass Machine Learning (I3.4) với 3 sao',
    trigger: { moduleStars: { 'I3.4': 3 } } },

  { id: 'fullstack',   icon: '🌐', title: 'Full-stack Dev',
    desc: 'Pass Web Full-stack (I3.5) với 3 sao',
    trigger: { moduleStars: { 'I3.5': 3 } } },

  { id: 'mobile-dev',  icon: '📱', title: 'Mobile Developer',
    desc: 'Pass Mobile dev Android/iOS (I3.6) với 3 sao',
    trigger: { moduleStars: { 'I3.6': 3 } } },

  { id: 'devops-pro',  icon: '⚙️', title: 'DevOps Pro',
    desc: 'Pass DevOps & Cloud (I3.7) với 3 sao',
    trigger: { moduleStars: { 'I3.7': 3 } } },

  { id: 'hacker',      icon: '🚩', title: 'Hacker',
    desc: 'Pass An toàn thông tin (I3.8) với 3 sao',
    trigger: { moduleStars: { 'I3.8': 3 } } },

  { id: 'year3-it-complete', icon: '🥉', title: 'Tốt nghiệp Năm 3 CNTT',
    desc: 'Pass toàn bộ 8 module Năm 3 (I3.1–I3.8)',
    trigger: { yearComplete: 3 } },

  { id: 'architect',    icon: '🏛️', title: 'Software Architect',
    desc: 'Pass Kiến trúc phần mềm & Design Patterns (I4.1) với 3 sao',
    trigger: { moduleStars: { 'I4.1': 3 } } },

  { id: 'cloud-pro',   icon: '☁️', title: 'Cloud Pro',
    desc: 'Pass Điện toán đám mây (I4.2) với 3 sao',
    trigger: { moduleStars: { 'I4.2': 3 } } },

  { id: 'data-scientist', icon: '📊', title: 'Data Scientist',
    desc: 'Pass Khoa học dữ liệu (I4.3) với 3 sao',
    trigger: { moduleStars: { 'I4.3': 3 } } },

  { id: 'blockchain-dev', icon: '⛓️', title: 'Blockchain Developer',
    desc: 'Pass Blockchain & Web3 (I4.4) với 3 sao',
    trigger: { moduleStars: { 'I4.4': 3 } } },

  { id: 'year4-it-complete', icon: '🥇', title: 'Tốt nghiệp Năm 4 CNTT',
    desc: 'Pass toàn bộ module Năm 4 (I4.1–I4.5)',
    trigger: { yearComplete: 4 } },

  { id: 'thesis-it',   icon: '🎓', title: 'Khoá luận xuất sắc',
    desc: 'Pass khoá luận I4.5',
    trigger: { moduleStars: { 'I4.5': 2 } } },

  // ── Game Achievements ──
  { id: 'code-racer',   icon: '⚡', title: 'Code Racer',
    desc: 'Pass Code Race — Giải thuật 5 phút (IG01)',
    trigger: { moduleStars: { 'IG01': 2 } } },

  { id: 'bug-hunter',   icon: '🐛', title: 'Bug Hunter',
    desc: 'Pass Bug Hunt Debug speed (IG02)',
    trigger: { moduleStars: { 'IG02': 2 } } },

  { id: 'sql-detective', icon: '🔎', title: 'SQL Detective',
    desc: 'Pass SQL Detective (IG03)',
    trigger: { moduleStars: { 'IG03': 2 } } },

  { id: 'kafka-designer', icon: '⚔️', title: 'Kafka & System Design',
    desc: 'Pass Kafka & System Design battle (IG04)',
    trigger: { moduleStars: { 'IG04': 2 } } },

  { id: 'it-game-master', icon: '🏆', title: 'IT Game Master',
    desc: 'Pass tất cả 4 game CNTT (IG01–IG04)',
    trigger: { allModuleStars: { ids: ['IG01', 'IG02', 'IG03', 'IG04'], minStars: 2 } } },

  // ── Career Achievements (IC01–IC06) ──
  { id: 'swe-career',      icon: '👨‍💻', title: 'Software Engineer Pro',
    desc: 'Hoàn thành quiz lộ trình Software Engineer (IC01) với 3 sao',
    trigger: { moduleStars: { 'IC01': 3 } } },

  { id: 'ds-career',       icon: '📊', title: 'Data Scientist Pro',
    desc: 'Hoàn thành quiz lộ trình Data Scientist (IC02) với 3 sao',
    trigger: { moduleStars: { 'IC02': 3 } } },

  { id: 'devops-career',   icon: '⚙️', title: 'DevOps Pro',
    desc: 'Hoàn thành quiz lộ trình DevOps Engineer (IC03) với 3 sao',
    trigger: { moduleStars: { 'IC03': 3 } } },

  { id: 'security-career', icon: '🔒', title: 'Security Engineer Pro',
    desc: 'Hoàn thành quiz lộ trình Security Engineer (IC04) với 3 sao',
    trigger: { moduleStars: { 'IC04': 3 } } },

  { id: 'mobile-career',   icon: '📱', title: 'Mobile Developer Pro',
    desc: 'Hoàn thành quiz lộ trình Mobile Developer (IC05) với 3 sao',
    trigger: { moduleStars: { 'IC05': 3 } } },

  { id: 'aiml-career',     icon: '🤖', title: 'AI/ML Engineer Pro',
    desc: 'Hoàn thành quiz lộ trình AI/ML Engineer (IC06) với 3 sao',
    trigger: { moduleStars: { 'IC06': 3 } } },

  { id: 'it-career-explorer', icon: '🧭', title: 'IT Career Explorer',
    desc: 'Khám phá ≥ 3 lộ trình nghề nghiệp CNTT (IC01–IC06, mỗi cái ≥ 2 sao)',
    trigger: { moduleStars: { 'IC01': 2, 'IC02': 2, 'IC03': 2 } } },
];
