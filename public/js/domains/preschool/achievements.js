// ============================================================
// Trường Mầm non — Achievement (vui, dễ thương)
// ============================================================
/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  // ── Chung ──
  { id: 'first', icon: '🎈', title: 'Bé đến trường',
    desc: 'Hoàn thành hoạt động đầu tiên', trigger: { quizzesPassed: 1 } },
  { id: 'streak-3', icon: '🔥', title: 'Đi học đều',
    desc: 'Vào học 3 ngày liên tiếp', trigger: { streak: 3 } },

  // ── Lĩnh vực 2 — Nhận thức (N1/N2/N3 — có sẵn từ đầu) ──
  { id: 'count-star', icon: '⭐', title: 'Bé đếm giỏi',
    desc: 'Đạt 3 sao lớp Mầm (Nhận thức)', trigger: { moduleStars: { 'N1': 3 } } },
  { id: 'shape-star', icon: '🔷', title: 'Bé biết hình',
    desc: 'Đạt 3 sao lớp Chồi (Nhận thức)', trigger: { moduleStars: { 'N2': 3 } } },
  { id: 'ready', icon: '🎓', title: 'Sẵn sàng vào lớp 1',
    desc: 'Đạt 3 sao lớp Lá (Nhận thức)', trigger: { moduleStars: { 'N3': 3 } } },

  // ── Lĩnh vực 1 — Phát triển thể chất ──
  { id: 'active-mam', icon: '🏃', title: 'Bé năng động',
    desc: 'Đạt 3 sao · Thể chất Mầm', trigger: { moduleStars: { 'N1-TC': 3 } } },
  { id: 'agile-choi', icon: '🤸', title: 'Bé khéo léo',
    desc: 'Đạt 3 sao · Thể chất Chồi', trigger: { moduleStars: { 'N2-TC': 3 } } },
  { id: 'strong-la', icon: '💪', title: 'Bé cường tráng',
    desc: 'Đạt 3 sao · Thể chất Lá', trigger: { moduleStars: { 'N3-TC': 3 } } },

  // ── Lĩnh vực 3 — Phát triển ngôn ngữ ──
  { id: 'talk-mam', icon: '💬', title: 'Bé bi bô',
    desc: 'Đạt 3 sao · Ngôn ngữ Mầm', trigger: { moduleStars: { 'N1-NN': 3 } } },
  { id: 'story-choi', icon: '📖', title: 'Bé kể chuyện',
    desc: 'Đạt 3 sao · Ngôn ngữ Chồi', trigger: { moduleStars: { 'N2-NN': 3 } } },
  { id: 'read-la', icon: '🔤', title: 'Bé đọc chữ',
    desc: 'Đạt 3 sao · Ngôn ngữ Lá (biết 29 chữ cái)', trigger: { moduleStars: { 'N3-NN': 3 } } },

  // ── Lĩnh vực 4 — Phát triển tình cảm–xã hội ──
  { id: 'happy-mam', icon: '😊', title: 'Bé vui vẻ',
    desc: 'Đạt 3 sao · Tình cảm–XH Mầm', trigger: { moduleStars: { 'N1-TX': 3 } } },
  { id: 'kind-choi', icon: '🤝', title: 'Bé thân thiện',
    desc: 'Đạt 3 sao · Tình cảm–XH Chồi', trigger: { moduleStars: { 'N2-TX': 3 } } },
  { id: 'good-la', icon: '🌟', title: 'Bé tốt bụng',
    desc: 'Đạt 3 sao · Tình cảm–XH Lá', trigger: { moduleStars: { 'N3-TX': 3 } } },

  // ── Lĩnh vực 5 — Phát triển thẩm mỹ ──
  { id: 'artist-mam', icon: '🎨', title: 'Bé nghệ sĩ nhỏ',
    desc: 'Đạt 3 sao · Thẩm mỹ Mầm', trigger: { moduleStars: { 'N1-TM': 3 } } },
  { id: 'talent-choi', icon: '🎭', title: 'Bé tài năng',
    desc: 'Đạt 3 sao · Thẩm mỹ Chồi', trigger: { moduleStars: { 'N2-TM': 3 } } },
  { id: 'creative-la', icon: '✨', title: 'Bé sáng tạo',
    desc: 'Đạt 3 sao · Thẩm mỹ Lá', trigger: { moduleStars: { 'N3-TM': 3 } } },

  // ── Hoàn thành toàn diện ──
  { id: 'all-round', icon: '🏅', title: 'Phát triển toàn diện',
    desc: 'Đạt 3 sao cả 5 lĩnh vực phát triển ở lớp Lá', trigger: { quizzesPassed: 15 } },

  // ── Streak & Chuyên cần ──
  { id: 'streak-5',  icon: '🌈', title: 'Bé học 5 ngày',
    desc: 'Vào học 5 ngày liên tiếp — một tuần học đầy đủ của bé', trigger: { streak: 5 } },
  { id: 'streak-7',  icon: '⭐', title: 'Bé chăm chỉ',
    desc: 'Vào học 7 ngày liên tiếp', trigger: { streak: 7 } },
  { id: 'streak-14', icon: '🌟', title: 'Siêu chăm học',
    desc: 'Vào học 14 ngày liên tiếp', trigger: { streak: 14 } },
  { id: 'streak-30', icon: '🔥', title: 'Bé kiên trì',
    desc: 'Vào học 30 ngày liên tiếp', trigger: { streak: 30 } },

  // ── Hoàn thành theo lớp (cả 5 lĩnh vực mỗi lớp) ──
  { id: 'mam-complete', icon: '🌱', title: 'Lớp Mầm hoàn thành',
    desc: 'Đạt ít nhất 2 sao cả 5 lĩnh vực lớp Mầm', trigger: { quizzesPassed: 5 } },
  { id: 'choi-complete', icon: '🌼', title: 'Lớp Chồi hoàn thành',
    desc: 'Đạt ít nhất 2 sao cả 5 lĩnh vực lớp Chồi', trigger: { quizzesPassed: 10 } },

  // ── Sao tích luỹ ──
  { id: 'star-5',  icon: '✨', title: 'Bé sưu sao',
    desc: 'Tích luỹ 5 sao đầu tiên', trigger: { totalStars: 5 } },
  { id: 'star-15', icon: '💫', title: 'Rương kho báu nhỏ',
    desc: 'Tích luỹ 15 sao', trigger: { totalStars: 15 } },
  { id: 'star-30', icon: '🌟', title: 'Bé siêu sao',
    desc: 'Tích luỹ 30 sao', trigger: { totalStars: 30 } },
  { id: 'star-45', icon: '🏆', title: 'Bé tài năng toàn diện',
    desc: 'Tích luỹ 45 sao — chinh phục toàn bộ các lĩnh vực phát triển Mầm non',
    trigger: { totalStars: 45 } },

  // ── Combo đặc biệt — phát triển nhiều chiều ──
  { id: 'body-mind', icon: '🧠', title: 'Thể chất + Nhận thức',
    desc: 'Đạt 3 sao Thể chất và Nhận thức ở cùng lớp Lá',
    trigger: { allModuleStars: [{ id: 'N3-TC', stars: 3 }, { id: 'N3', stars: 3 }] } },
  { id: 'heart-voice', icon: '💝', title: 'Tình cảm + Ngôn ngữ',
    desc: 'Đạt 3 sao Tình cảm–XH và Ngôn ngữ ở lớp Lá',
    trigger: { allModuleStars: [{ id: 'N3-TX', stars: 3 }, { id: 'N3-NN', stars: 3 }] } },
  { id: 'early-achiever', icon: '🥇', title: 'Xuất sắc sớm',
    desc: 'Đạt 3 sao 3 lĩnh vực bất kỳ ở lớp Mầm', trigger: { quizzesPassed: 3 } },
];
