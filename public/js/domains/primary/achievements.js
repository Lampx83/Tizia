// ============================================================
// Trường Tiểu học — Achievement catalog (thân thiện trẻ em)
// ============================================================
/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  // ── Khởi đầu ──
  { id: 'first-quiz', icon: '🌟', title: 'Ngôi sao nhỏ',
    desc: 'Hoàn thành bài quiz đầu tiên', trigger: { quizzesPassed: 1 } },
  { id: 'bookworm', icon: '📚', title: 'Mọt sách tiểu học',
    desc: '10 bài quiz hoàn thành — em đang chăm học rất giỏi!', trigger: { quizzesPassed: 10 } },
  { id: 'streak-3', icon: '🔥', title: 'Chăm học 3 ngày',
    desc: 'Vào học 3 ngày liên tiếp', trigger: { streak: 3 } },
  { id: 'streak-5', icon: '⭐', title: 'Tuần học đầu',
    desc: 'Vào học 5 ngày liên tiếp — đúng một tuần đi học! Em thật chăm chỉ', trigger: { streak: 5 } },
  { id: 'streak-7', icon: '🌈', title: 'Tuần vàng',
    desc: 'Vào học 7 ngày liên tiếp', trigger: { streak: 7 } },
  { id: 'streak-14', icon: '🌟', title: 'Hai tuần chăm học',
    desc: 'Vào học 14 ngày liên tiếp', trigger: { streak: 14 } },
  { id: 'streak-30', icon: '🏆', title: 'Tháng vàng',
    desc: 'Vào học liên tục suốt 1 tháng', trigger: { streak: 30 } },

  // ── Toán — mỗi lớp ──
  { id: 'math-1', icon: '➗', title: 'Bé giỏi Toán lớp 1',
    desc: 'Đạt 3 sao Toán lớp 1', trigger: { moduleStars: { 'P1': 3 } } },
  { id: 'math-2', icon: '🔢', title: 'Toán thủ lớp 2',
    desc: 'Đạt 3 sao Toán lớp 2', trigger: { moduleStars: { 'P2': 3 } } },
  { id: 'math-3', icon: '🧮', title: 'Nhà tính nhẩm lớp 3',
    desc: 'Đạt 3 sao Toán lớp 3', trigger: { moduleStars: { 'P3': 3 } } },
  { id: 'math-4', icon: '📐', title: 'Bạn của phân số',
    desc: 'Đạt 3 sao Toán lớp 4', trigger: { moduleStars: { 'P4': 3 } } },
  { id: 'math-5', icon: '🏅', title: 'Nhà toán học nhí',
    desc: 'Đạt 3 sao Toán lớp 5', trigger: { moduleStars: { 'P5': 3 } } },

  // ── Tiếng Việt ──
  { id: 'viet-1', icon: '📖', title: 'Biết đọc biết viết',
    desc: 'Đạt 3 sao Tiếng Việt lớp 1', trigger: { moduleStars: { 'P1TV': 3 } } },
  { id: 'viet-2', icon: '📕', title: 'Đọc thông viết thạo lớp 2',
    desc: 'Đạt 3 sao Tiếng Việt lớp 2', trigger: { moduleStars: { 'P2TV': 3 } } },
  { id: 'viet-3', icon: '✏️', title: 'Viết văn hay lớp 3',
    desc: 'Đạt 3 sao Tiếng Việt lớp 3', trigger: { moduleStars: { 'P3TV': 3 } } },
  { id: 'viet-4', icon: '📓', title: 'Nhà văn nhỏ lớp 4',
    desc: 'Đạt 3 sao Tiếng Việt lớp 4', trigger: { moduleStars: { 'P4TV': 3 } } },
  { id: 'viet-5', icon: '📝', title: 'Nhà văn nhỏ tuổi',
    desc: 'Đạt 3 sao Tiếng Việt lớp 5', trigger: { moduleStars: { 'P5TV': 3 } } },

  // ── Tiếng Anh ──
  { id: 'eng-3', icon: '🌍', title: 'Hello World!',
    desc: 'Đạt 3 sao Tiếng Anh lớp 3', trigger: { moduleStars: { 'P3TA': 3 } } },
  { id: 'eng-4', icon: '💬', title: 'Confident Talker lớp 4',
    desc: 'Đạt 3 sao Tiếng Anh lớp 4', trigger: { moduleStars: { 'P4TA': 3 } } },
  { id: 'eng-5', icon: '🗣️', title: 'Junior English Speaker',
    desc: 'Đạt 3 sao Tiếng Anh lớp 5', trigger: { moduleStars: { 'P5TA': 3 } } },

  // ── Khoa học & Xã hội ──
  { id: 'science-4', icon: '🔭', title: 'Nhà khoa học nhỏ',
    desc: 'Đạt 3 sao Khoa học lớp 4', trigger: { moduleStars: { 'P4KH': 3 } } },
  { id: 'science-5', icon: '🌿', title: 'Khoa học tự nhiên lớp 5',
    desc: 'Đạt 3 sao Khoa học lớp 5', trigger: { moduleStars: { 'P5KH': 3 } } },
  { id: 'history-5', icon: '🗺️', title: 'Yêu lịch sử Việt Nam',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 5', trigger: { moduleStars: { 'P5LSDL': 3 } } },

  // ── Tin học ──
  { id: 'coding-3', icon: '💻', title: 'Lập trình viên nhí',
    desc: 'Đạt 3 sao Tin học lớp 3', trigger: { moduleStars: { 'P3TIN': 3 } } },
  { id: 'coding-4', icon: '🖱️', title: 'Coder nhỏ lớp 4',
    desc: 'Đạt 3 sao Tin học lớp 4', trigger: { moduleStars: { 'P4TIN': 3 } } },
  { id: 'coding-5', icon: '🤖', title: 'Scratch Master',
    desc: 'Đạt 3 sao Tin học lớp 5', trigger: { moduleStars: { 'P5TIN': 3 } } },

  // ── Sao tích luỹ ──
  { id: 'star-15', icon: '✨', title: 'Sưu tầm 15 sao',
    desc: 'Tích luỹ 15 sao', trigger: { totalStars: 15 } },
  { id: 'star-30', icon: '💫', title: 'Kho báu 30 sao',
    desc: 'Tích luỹ 30 sao', trigger: { totalStars: 30 } },
  { id: 'star-60', icon: '🌠', title: 'Bầu trời sao',
    desc: 'Tích luỹ 60 sao', trigger: { totalStars: 60 } },
  { id: 'star-100', icon: '🏆', title: 'Học sinh xuất sắc',
    desc: 'Tích luỹ 100 sao — học sinh Tiểu học xuất sắc, sẵn sàng bước vào THCS',
    trigger: { totalStars: 100 } },

  // ── Tốt nghiệp lớp ──
  { id: 'year1-grad', icon: '🥇', title: 'Lên lớp 2 rồi!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 1', trigger: { yearComplete: 1 } },
  { id: 'year2-grad', icon: '🌟', title: 'Lên lớp 3 nào!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 2', trigger: { yearComplete: 2 } },
  { id: 'year3-grad', icon: '🥈', title: 'Lên lớp 4 vui quá!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 3', trigger: { yearComplete: 3 } },
  { id: 'year4-grad', icon: '🌈', title: 'Sắp tốt nghiệp Tiểu học!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 4', trigger: { yearComplete: 4 } },
  { id: 'primary-grad', icon: '🎓', title: 'Tốt nghiệp Tiểu học',
    desc: 'Hoàn thành toàn bộ chương trình lớp 5', trigger: { yearComplete: 5 } },

  // ── Toán Tiểu học hoàn chỉnh ──
  { id: 'all-primary-math', icon: '🏆', title: 'Hoàn thành Toán Tiểu học',
    desc: 'Đạt sao ở cả 5 lớp Toán (P1→P5)',
    trigger: { moduleStars: { 'P1': 1, 'P2': 1, 'P3': 1, 'P4': 1, 'P5': 1 } } },

  // ── Tiếng Anh lớp 1–2 (tự chọn) ──
  { id: 'ta1', icon: '🔤', title: 'ABC của bé',
    desc: 'Đạt 3 sao Tiếng Anh lớp 1', trigger: { moduleStars: { 'P1TA': 3 } } },
  { id: 'ta2', icon: '🌈', title: 'Hello World lớp 2',
    desc: 'Đạt 3 sao Tiếng Anh lớp 2', trigger: { moduleStars: { 'P2TA': 3 } } },

  // ── TN-XH (grades 1–3) ──
  { id: 'tnxh1', icon: '🌿', title: 'Khám phá thiên nhiên lớp 1',
    desc: 'Đạt 3 sao TN-XH lớp 1', trigger: { moduleStars: { 'P1TNXH': 3 } } },
  { id: 'tnxh2', icon: '🐝', title: 'Bạn của thiên nhiên lớp 2',
    desc: 'Đạt 3 sao TN-XH lớp 2', trigger: { moduleStars: { 'P2TNXH': 3 } } },
  { id: 'tnxh3', icon: '🌎', title: 'Nhà tự nhiên học lớp 3',
    desc: 'Đạt 3 sao TN-XH lớp 3', trigger: { moduleStars: { 'P3TNXH': 3 } } },

  // ── Đạo đức (grades 1–5) ──
  { id: 'dd1', icon: '❤️', title: 'Bé học đạo đức lớp 1',
    desc: 'Đạt 3 sao Đạo đức lớp 1', trigger: { moduleStars: { 'P1DD': 3 } } },
  { id: 'dd2', icon: '🤲', title: 'Biết yêu thương lớp 2',
    desc: 'Đạt 3 sao Đạo đức lớp 2', trigger: { moduleStars: { 'P2DD': 3 } } },
  { id: 'dd3', icon: '🌸', title: 'Học sinh ngoan lớp 3',
    desc: 'Đạt 3 sao Đạo đức lớp 3', trigger: { moduleStars: { 'P3DD': 3 } } },
  { id: 'dd4', icon: '🤝', title: 'Công dân nhỏ lớp 4',
    desc: 'Đạt 3 sao Đạo đức lớp 4', trigger: { moduleStars: { 'P4DD': 3 } } },
  { id: 'dd5', icon: '🎖️', title: 'Tấm gương đạo đức lớp 5',
    desc: 'Đạt 3 sao Đạo đức lớp 5', trigger: { moduleStars: { 'P5DD': 3 } } },

  // ── Âm nhạc (grades 1–5) ──
  { id: 'an1', icon: '🎵', title: 'Bé hát hay lớp 1',
    desc: 'Đạt 3 sao Âm nhạc lớp 1', trigger: { moduleStars: { 'P1AN': 3 } } },
  { id: 'an2', icon: '🎶', title: 'Giai điệu vui lớp 2',
    desc: 'Đạt 3 sao Âm nhạc lớp 2', trigger: { moduleStars: { 'P2AN': 3 } } },
  { id: 'an3', icon: '🎸', title: 'Nhạc sĩ nhí lớp 3',
    desc: 'Đạt 3 sao Âm nhạc lớp 3', trigger: { moduleStars: { 'P3AN': 3 } } },
  { id: 'an4', icon: '🎹', title: 'Tiếng đàn lớp 4',
    desc: 'Đạt 3 sao Âm nhạc lớp 4', trigger: { moduleStars: { 'P4AN': 3 } } },
  { id: 'an5', icon: '🎼', title: 'Tài năng âm nhạc lớp 5',
    desc: 'Đạt 3 sao Âm nhạc lớp 5', trigger: { moduleStars: { 'P5AN': 3 } } },

  // ── Mĩ thuật (grades 1–5) ──
  { id: 'mt1', icon: '🎨', title: 'Bé vẽ đẹp lớp 1',
    desc: 'Đạt 3 sao Mĩ thuật lớp 1', trigger: { moduleStars: { 'P1MT': 3 } } },
  { id: 'mt2', icon: '🖌️', title: 'Hoạ sĩ tí hon lớp 2',
    desc: 'Đạt 3 sao Mĩ thuật lớp 2', trigger: { moduleStars: { 'P2MT': 3 } } },
  { id: 'mt3', icon: '🖼️', title: 'Sáng tạo nghệ thuật lớp 3',
    desc: 'Đạt 3 sao Mĩ thuật lớp 3', trigger: { moduleStars: { 'P3MT': 3 } } },
  { id: 'mt4', icon: '🎭', title: 'Nghệ sĩ nhí lớp 4',
    desc: 'Đạt 3 sao Mĩ thuật lớp 4', trigger: { moduleStars: { 'P4MT': 3 } } },
  { id: 'mt5', icon: '✨', title: 'Nhà thiết kế trẻ lớp 5',
    desc: 'Đạt 3 sao Mĩ thuật lớp 5', trigger: { moduleStars: { 'P5MT': 3 } } },

  // ── GD Thể chất (grades 1–5) ──
  { id: 'gdtc1', icon: '🏃', title: 'Bé khỏe mạnh lớp 1',
    desc: 'Đạt 3 sao GDTC lớp 1', trigger: { moduleStars: { 'P1GDTC': 3 } } },
  { id: 'gdtc2', icon: '⚽', title: 'Thể lực lớp 2',
    desc: 'Đạt 3 sao GDTC lớp 2', trigger: { moduleStars: { 'P2GDTC': 3 } } },
  { id: 'gdtc3', icon: '🏸', title: 'Vận động viên nhí lớp 3',
    desc: 'Đạt 3 sao GDTC lớp 3', trigger: { moduleStars: { 'P3GDTC': 3 } } },
  { id: 'gdtc4', icon: '🤸', title: 'Thể thao lớp 4',
    desc: 'Đạt 3 sao GDTC lớp 4', trigger: { moduleStars: { 'P4GDTC': 3 } } },
  { id: 'gdtc5', icon: '🥇', title: 'Thể chất xuất sắc lớp 5',
    desc: 'Đạt 3 sao GDTC lớp 5', trigger: { moduleStars: { 'P5GDTC': 3 } } },

  // ── HĐ Trải nghiệm (grades 1–5) ──
  { id: 'hdtn1', icon: '🌱', title: 'Khám phá thế giới lớp 1',
    desc: 'Đạt 3 sao HĐTN lớp 1', trigger: { moduleStars: { 'P1HDTN': 3 } } },
  { id: 'hdtn2', icon: '🌍', title: 'Trải nghiệm vui lớp 2',
    desc: 'Đạt 3 sao HĐTN lớp 2', trigger: { moduleStars: { 'P2HDTN': 3 } } },
  { id: 'hdtn3', icon: '🌟', title: 'Cùng khám phá lớp 3',
    desc: 'Đạt 3 sao HĐTN lớp 3', trigger: { moduleStars: { 'P3HDTN': 3 } } },
  { id: 'hdtn4', icon: '🎯', title: 'Hướng nghiệp sớm lớp 4',
    desc: 'Đạt 3 sao HĐTN lớp 4', trigger: { moduleStars: { 'P4HDTN': 3 } } },
  { id: 'hdtn5', icon: '🚀', title: 'Tự tin bước vào THCS',
    desc: 'Đạt 3 sao HĐTN lớp 5', trigger: { moduleStars: { 'P5HDTN': 3 } } },

  // ── Công nghệ (grades 3–5) ──
  { id: 'cn3', icon: '🔨', title: 'Thủ công nhí lớp 3',
    desc: 'Đạt 3 sao Công nghệ lớp 3', trigger: { moduleStars: { 'P3CN': 3 } } },
  { id: 'cn4', icon: '⚙️', title: 'Kỹ thuật nhí lớp 4',
    desc: 'Đạt 3 sao Công nghệ lớp 4', trigger: { moduleStars: { 'P4CN': 3 } } },
  { id: 'cn5', icon: '🔧', title: 'Nhà kỹ thuật lớp 5',
    desc: 'Đạt 3 sao Công nghệ lớp 5', trigger: { moduleStars: { 'P5CN': 3 } } },

  // ── Lịch sử & Địa lý lớp 4 ──
  { id: 'lsdl4', icon: '🗺️', title: 'Khám phá Lịch sử & ĐL lớp 4',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 4', trigger: { moduleStars: { 'P4LSDL': 3 } } },
];
