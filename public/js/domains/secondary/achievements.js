// ============================================================
// Trường THCS — Achievement catalog
// ============================================================
/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  // ── Khởi đầu ──
  { id: 'first-quiz', icon: '🌟', title: 'Khởi đầu THCS',
    desc: 'Hoàn thành bài quiz đầu tiên', trigger: { quizzesPassed: 1 } },
  { id: 'bookworm', icon: '📚', title: 'Mọt sách THCS',
    desc: '10 bài quiz hoàn thành — đang trên đà chinh phục chương trình THCS', trigger: { quizzesPassed: 10 } },
  { id: 'streak-3', icon: '🔥', title: 'Bắt đầu đều đặn',
    desc: 'Vào học 3 ngày liên tiếp', trigger: { streak: 3 } },
  { id: 'streak-5', icon: '⚡', title: 'Cháy 5 ngày',
    desc: 'Vào học 5 ngày liên tiếp', trigger: { streak: 5 } },
  { id: 'streak-10', icon: '💥', title: 'Máy học liên tục',
    desc: 'Vào học 10 ngày liên tiếp', trigger: { streak: 10 } },
  { id: 'streak-14', icon: '🌟', title: 'Hai tuần không ngừng',
    desc: 'Vào học 14 ngày liên tiếp', trigger: { streak: 14 } },
  { id: 'streak-30', icon: '🏆', title: 'Kiên trì 30 ngày',
    desc: 'Vào học liên tục suốt 1 tháng — học sinh THCS xuất sắc!', trigger: { streak: 30 } },

  // ── Toán (hệ 36-tuần) ──
  { id: 'toan6-weekly', icon: '🔢', title: 'Thống trị Toán 6',
    desc: 'Đạt 3 sao Toán lớp 6 (36 tuần)', trigger: { moduleStars: { 'S6TOAN': 3 } } },
  { id: 'toan7-weekly', icon: '📊', title: 'Chinh phục Toán 7',
    desc: 'Đạt 3 sao Toán lớp 7', trigger: { moduleStars: { 'S7TOAN': 3 } } },
  { id: 'toan8-weekly', icon: '📐', title: 'Vua Pythagore',
    desc: 'Đạt 3 sao Toán lớp 8', trigger: { moduleStars: { 'S8TOAN': 3 } } },
  { id: 'toan9-weekly', icon: '🏅', title: 'Sẵn sàng thi lớp 10',
    desc: 'Đạt 3 sao Toán lớp 9', trigger: { moduleStars: { 'S9TOAN': 3 } } },

  // ── Ngữ văn (hệ 36-tuần) ──
  { id: 'nv6-weekly', icon: '📖', title: 'Yêu Văn học dân gian',
    desc: 'Đạt 3 sao Ngữ văn lớp 6 (36 tuần)', trigger: { moduleStars: { 'S6NV': 3 } } },
  { id: 'nv7-weekly', icon: '📝', title: 'Văn học dân tộc lớp 7',
    desc: 'Đạt 3 sao Ngữ văn lớp 7', trigger: { moduleStars: { 'S7NV': 3 } } },
  { id: 'nv8-weekly', icon: '📰', title: 'Nhà văn trẻ lớp 8',
    desc: 'Đạt 3 sao Ngữ văn lớp 8', trigger: { moduleStars: { 'S8NV': 3 } } },
  { id: 'nv9-weekly', icon: '✒️', title: 'Thi Văn vào lớp 10',
    desc: 'Đạt 3 sao Ngữ văn lớp 9', trigger: { moduleStars: { 'S9NV': 3 } } },

  // ── Tiếng Anh (hệ 36-tuần) ──
  { id: 'ta6-weekly', icon: '🌍', title: 'English Explorer THCS',
    desc: 'Đạt 3 sao Tiếng Anh lớp 6', trigger: { moduleStars: { 'S6TA': 3 } } },
  { id: 'ta7-weekly', icon: '🗺️', title: 'Global Citizen lớp 7',
    desc: 'Đạt 3 sao Tiếng Anh lớp 7', trigger: { moduleStars: { 'S7TA': 3 } } },
  { id: 'ta8-weekly', icon: '🌐', title: 'Confident Speaker lớp 8',
    desc: 'Đạt 3 sao Tiếng Anh lớp 8', trigger: { moduleStars: { 'S8TA': 3 } } },
  { id: 'ta9-weekly', icon: '🗣️', title: 'Ready for High School English',
    desc: 'Đạt 3 sao Tiếng Anh lớp 9', trigger: { moduleStars: { 'S9TA': 3 } } },

  // ── KHTN & Lịch sử – Địa lý ──
  { id: 'khtn6-weekly', icon: '🔬', title: 'Nhà khoa học THCS',
    desc: 'Đạt 3 sao KHTN lớp 6', trigger: { moduleStars: { 'S6KHTN': 3 } } },
  { id: 'khtn7-weekly', icon: '⚗️', title: 'Khám phá KHTN lớp 7',
    desc: 'Đạt 3 sao KHTN lớp 7', trigger: { moduleStars: { 'S7KHTN': 3 } } },
  { id: 'khtn8-weekly', icon: '🧲', title: 'Thí nghiệm KHTN lớp 8',
    desc: 'Đạt 3 sao KHTN lớp 8', trigger: { moduleStars: { 'S8KHTN': 3 } } },
  { id: 'khtn9-weekly', icon: '🌿', title: 'Sẵn sàng thi KHTN lớp 10',
    desc: 'Đạt 3 sao KHTN lớp 9', trigger: { moduleStars: { 'S9KHTN': 3 } } },
  { id: 'lsdia6-weekly', icon: '🏛️', title: 'Sử-Địa thế giới lớp 6',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 6', trigger: { moduleStars: { 'S6LSDL': 3 } } },
  { id: 'lsdia7-weekly', icon: '🧭', title: 'Khám phá Sử-Địa lớp 7',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 7', trigger: { moduleStars: { 'S7LSDL': 3 } } },
  { id: 'lsdia8-weekly', icon: '🌏', title: 'Thám hiểm Sử-Địa lớp 8',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 8', trigger: { moduleStars: { 'S8LSDL': 3 } } },
  { id: 'lsdia9-weekly', icon: '🗺️', title: 'Sử-Địa lớp 9',
    desc: 'Đạt 3 sao Lịch sử & Địa lý lớp 9', trigger: { moduleStars: { 'S9LSDL': 3 } } },

  // ── Tin học ──
  { id: 'tin6-weekly', icon: '💻', title: 'Digital Citizen',
    desc: 'Đạt 3 sao Tin học lớp 6', trigger: { moduleStars: { 'S6TH': 3 } } },
  { id: 'tin7-weekly', icon: '🖥️', title: 'Coder nhỏ lớp 7',
    desc: 'Đạt 3 sao Tin học lớp 7', trigger: { moduleStars: { 'S7TIN': 3 } } },
  { id: 'tin8-weekly', icon: '📱', title: 'Lập trình viên tương lai lớp 8',
    desc: 'Đạt 3 sao Tin học lớp 8', trigger: { moduleStars: { 'S8TIN': 3 } } },
  { id: 'tin9-weekly', icon: '⌨️', title: 'Coder THCS',
    desc: 'Đạt 3 sao Tin học lớp 9', trigger: { moduleStars: { 'S9TIN': 3 } } },

  // ── GDCD / Giáo dục công dân ──
  { id: 'gdcd6-weekly', icon: '⚖️', title: 'Công dân nhí lớp 6',
    desc: 'Đạt 3 sao GD Công dân lớp 6', trigger: { moduleStars: { 'S6GDCD': 3 } } },
  { id: 'gdcd7-weekly', icon: '🤝', title: 'Đạo đức & Pháp luật lớp 7',
    desc: 'Đạt 3 sao GD Công dân lớp 7', trigger: { moduleStars: { 'S7GDCD': 3 } } },
  { id: 'gdcd8-weekly', icon: '🏛️', title: 'Hiểu pháp luật lớp 8',
    desc: 'Đạt 3 sao GD Công dân lớp 8', trigger: { moduleStars: { 'S8GDCD': 3 } } },
  { id: 'gdcd9-weekly', icon: '🎓', title: 'Công dân THCS',
    desc: 'Đạt 3 sao GD Công dân lớp 9', trigger: { moduleStars: { 'S9GDCD': 3 } } },

  // ── Công nghệ ──
  { id: 'cn6-weekly', icon: '🏠', title: 'Công nghệ gia đình lớp 6',
    desc: 'Đạt 3 sao Công nghệ lớp 6', trigger: { moduleStars: { 'S6CN': 3 } } },
  { id: 'cn7-weekly', icon: '🌾', title: 'Nông-lâm-thủy sản lớp 7',
    desc: 'Đạt 3 sao Công nghệ lớp 7', trigger: { moduleStars: { 'S7CN': 3 } } },
  { id: 'cn8-weekly', icon: '🔌', title: 'Điện tử cơ bản lớp 8',
    desc: 'Đạt 3 sao Công nghệ lớp 8', trigger: { moduleStars: { 'S8CN': 3 } } },
  { id: 'cn9-weekly', icon: '⚙️', title: 'Kỹ thuật thực hành lớp 9',
    desc: 'Đạt 3 sao Công nghệ lớp 9', trigger: { moduleStars: { 'S9CN': 3 } } },

  // ── GD Thể chất ──
  { id: 'gdtc6-weekly', icon: '🏃', title: 'Vận động lớp 6',
    desc: 'Đạt 3 sao GD Thể chất lớp 6', trigger: { moduleStars: { 'S6GDTC': 3 } } },
  { id: 'gdtc7-weekly', icon: '⚽', title: 'Thể thao lớp 7',
    desc: 'Đạt 3 sao GD Thể chất lớp 7', trigger: { moduleStars: { 'S7GDTC': 3 } } },
  { id: 'gdtc8-weekly', icon: '🏸', title: 'Năng động lớp 8',
    desc: 'Đạt 3 sao GD Thể chất lớp 8', trigger: { moduleStars: { 'S8GDTC': 3 } } },
  { id: 'gdtc9-weekly', icon: '🏅', title: 'Thể chất THCS',
    desc: 'Đạt 3 sao GD Thể chất lớp 9', trigger: { moduleStars: { 'S9GDTC': 3 } } },

  // ── Nghệ thuật ──
  { id: 'nt6-weekly', icon: '🎨', title: 'Nghệ sĩ nhỏ lớp 6',
    desc: 'Đạt 3 sao Nghệ thuật lớp 6', trigger: { moduleStars: { 'S6NT': 3 } } },
  { id: 'nt7-weekly', icon: '🎵', title: 'Tâm hồn nghệ thuật lớp 7',
    desc: 'Đạt 3 sao Nghệ thuật lớp 7', trigger: { moduleStars: { 'S7NT': 3 } } },
  { id: 'nt8-weekly', icon: '🎭', title: 'Sáng tạo lớp 8',
    desc: 'Đạt 3 sao Nghệ thuật lớp 8', trigger: { moduleStars: { 'S8NT': 3 } } },
  { id: 'nt9-weekly', icon: '✨', title: 'Nghệ thuật THCS',
    desc: 'Đạt 3 sao Nghệ thuật lớp 9', trigger: { moduleStars: { 'S9NT': 3 } } },

  // ── HĐ Trải nghiệm – Hướng nghiệp ──
  { id: 'hdtn6-weekly', icon: '🌱', title: 'Trải nghiệm lớp 6',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 6', trigger: { moduleStars: { 'S6HDTN': 3 } } },
  { id: 'hdtn7-weekly', icon: '🌍', title: 'Khám phá hướng nghiệp lớp 7',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 7', trigger: { moduleStars: { 'S7HDTN': 3 } } },
  { id: 'hdtn8-weekly', icon: '🌟', title: 'Định hướng tương lai lớp 8',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 8', trigger: { moduleStars: { 'S8HDTN': 3 } } },
  { id: 'hdtn9-weekly', icon: '🎯', title: 'Hướng nghiệp THCS',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 9', trigger: { moduleStars: { 'S9HDTN': 3 } } },

  // ── GD Địa phương ──
  { id: 'gddp6-weekly', icon: '🏙️', title: 'Yêu quê hương lớp 6',
    desc: 'Đạt 3 sao GD Địa phương lớp 6', trigger: { moduleStars: { 'S6GDDP': 3 } } },
  { id: 'gddp7-weekly', icon: '🏘️', title: 'Văn hoá địa phương lớp 7',
    desc: 'Đạt 3 sao GD Địa phương lớp 7', trigger: { moduleStars: { 'S7GDDP': 3 } } },
  { id: 'gddp8-weekly', icon: '🗺️', title: 'Di sản địa phương lớp 8',
    desc: 'Đạt 3 sao GD Địa phương lớp 8', trigger: { moduleStars: { 'S8GDDP': 3 } } },
  { id: 'gddp9-weekly', icon: '🇻🇳', title: 'Tự hào địa phương lớp 9',
    desc: 'Đạt 3 sao GD Địa phương lớp 9', trigger: { moduleStars: { 'S9GDDP': 3 } } },

  // ── Sao tích luỹ ──
  { id: 'star-20', icon: '✨', title: 'Sưu tầm 20 sao',
    desc: 'Tích luỹ 20 sao', trigger: { totalStars: 20 } },
  { id: 'star-30', icon: '⭐', title: 'Ngôi sao 30',
    desc: 'Tích luỹ 30 sao — đang trên đà học tốt chương trình THCS', trigger: { totalStars: 30 } },
  { id: 'star-50',  icon: '💫', title: 'Ngôi sao THCS',
    desc: 'Tích luỹ 50 sao', trigger: { totalStars: 50 } },
  { id: 'star-100', icon: '🏆', title: 'Thủ lĩnh sao THCS',
    desc: 'Tích luỹ 100 sao', trigger: { totalStars: 100 } },
  { id: 'star-120', icon: '🌠', title: 'Học sinh THCS 120 sao',
    desc: 'Tích luỹ 120 sao — chinh phục phần lớn chương trình 4 năm THCS, nền tảng vững chắc vào THPT', trigger: { totalStars: 120 } },

  // ── Tốt nghiệp lớp ──
  { id: 'year1-sec-complete', icon: '🥇', title: 'Lên lớp 7 tự tin!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 6', trigger: { yearComplete: 1 } },
  { id: 'year2-sec-complete', icon: '🥈', title: 'Lên lớp 8 vững vàng!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 7', trigger: { yearComplete: 2 } },
  { id: 'year3-sec-complete', icon: '🏅', title: 'Lên lớp 9 xuất sắc!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 8', trigger: { yearComplete: 3 } },
  { id: 'year4-sec-grad', icon: '🎓', title: 'Tốt nghiệp THCS',
    desc: 'Hoàn thành toàn bộ chương trình lớp 9', trigger: { yearComplete: 4 } },

  // ── Toán THCS hoàn chỉnh (hệ 36-tuần) ──
  { id: 'all-secondary-math', icon: '🏆', title: 'Tốt nghiệp Toán THCS',
    desc: 'Đạt sao Toán cả 4 lớp (S6TOAN→S9TOAN)',
    trigger: { moduleStars: { 'S6TOAN': 1, 'S7TOAN': 1, 'S8TOAN': 1, 'S9TOAN': 1 } } },

  // ── Legacy (subject.html path system — giữ nguyên để tương thích) ──
  { id: 'sn-boss', icon: '➕', title: 'Vô địch Số nguyên',
    desc: 'Hạ Boss chương Số nguyên (Toán 6 — đường học chương)', trigger: { moduleStars: { 'S6-so-nguyen-4': 1 } } },
  { id: 'ps-boss', icon: '🍕', title: 'Bậc thầy Phân số',
    desc: 'Hạ Boss chương Phân số (Toán 6 — đường học chương)', trigger: { moduleStars: { 'S6-phan-so-5': 1 } } },
  { id: 'math-9', icon: '🏅', title: 'Toán 9 cổng',
    desc: 'Đạt 3 sao Toán lớp 9 (cổng vào)', trigger: { moduleStars: { 'S9': 3 } } },
  { id: 'van-6', icon: '📚', title: 'Ngữ văn 6 cổng',
    desc: 'Đạt 3 sao Ngữ văn lớp 6 (cổng vào)', trigger: { moduleStars: { 'SV6': 3 } } },
  { id: 'van-9', icon: '📜', title: 'Ngữ văn 9 cổng',
    desc: 'Đạt 3 sao Ngữ văn lớp 9 (cổng vào)', trigger: { moduleStars: { 'SV9': 3 } } },
];
