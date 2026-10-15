// ============================================================
// Trường THPT — Achievement catalog (GDPT 2018)
// Module IDs khớp highschool/modules.js: H10TOAN, H11TOAN, H12TOAN,
// H10NV, H10TA, H10LY, H10HOA, H10SINH, H10SU, H10DIA, H10GDCD, H10TIN, H10CN…
// ============================================================
/** @type {import('../../engine/types.js').Achievement[]} */
export const ACHIEVEMENTS = [
  // ── Khởi đầu ──
  { id: 'first', icon: '🏫', title: 'Học sinh THPT',
    desc: 'Hoàn thành hoạt động đầu tiên', trigger: { quizzesPassed: 1 } },
  { id: 'bookworm', icon: '📚', title: 'Mọt sách THPT',
    desc: '10 bài quiz hoàn thành — thói quen học chắc nền tảng THPT', trigger: { quizzesPassed: 10 } },
  { id: 'streak-3', icon: '🌱', title: 'Bắt đầu đều đặn',
    desc: 'Vào học 3 ngày liên tiếp — thói quen tốt bắt đầu từ đây', trigger: { streak: 3 } },
  { id: 'streak-5', icon: '🔥', title: 'Ôn luyện đều đặn',
    desc: 'Vào học 5 ngày liên tiếp', trigger: { streak: 5 } },
  { id: 'streak-7', icon: '📅', title: 'Một tuần học đều',
    desc: 'Vào học 7 ngày liên tiếp — một tuần đúng nghĩa, thói quen bền vững', trigger: { streak: 7 } },
  { id: 'streak-14', icon: '⚡', title: 'Hai tuần bứt phá',
    desc: 'Vào học 14 ngày liên tiếp', trigger: { streak: 14 } },

  // ── Toán ──
  { id: 'toan10', icon: '🔟', title: 'Vững nền Toán 10',
    desc: 'Đạt 3 sao Toán lớp 10', trigger: { moduleStars: { 'H10TOAN': 3 } } },
  { id: 'toan11', icon: '📈', title: 'Đạo hàm master',
    desc: 'Đạt 3 sao Toán lớp 11', trigger: { moduleStars: { 'H11TOAN': 3 } } },
  { id: 'toan12', icon: '🎓', title: 'Sẵn sàng thi tốt nghiệp',
    desc: 'Đạt 3 sao Toán lớp 12', trigger: { moduleStars: { 'H12TOAN': 3 } } },

  // ── Ngữ văn ──
  { id: 'nv10', icon: '📜', title: 'Văn học dân tộc',
    desc: 'Đạt 3 sao Ngữ văn lớp 10', trigger: { moduleStars: { 'H10NV': 3 } } },
  { id: 'nv11', icon: '📖', title: 'Nhà văn trẻ tài năng',
    desc: 'Đạt 3 sao Ngữ văn lớp 11', trigger: { moduleStars: { 'H11NV': 3 } } },
  { id: 'nv12', icon: '✒️', title: 'Sẵn sàng thi Văn',
    desc: 'Đạt 3 sao Ngữ văn lớp 12', trigger: { moduleStars: { 'H12NV': 3 } } },

  // ── Tiếng Anh ──
  { id: 'ta10', icon: '🌍', title: 'English Rising Star',
    desc: 'Đạt 3 sao Tiếng Anh lớp 10', trigger: { moduleStars: { 'H10TA': 3 } } },
  { id: 'ta11', icon: '🌐', title: 'Advanced English lớp 11',
    desc: 'Đạt 3 sao Tiếng Anh lớp 11', trigger: { moduleStars: { 'H11TA': 3 } } },
  { id: 'ta12', icon: '🗣️', title: 'Ready for University English',
    desc: 'Đạt 3 sao Tiếng Anh lớp 12', trigger: { moduleStars: { 'H12TA': 3 } } },

  // ── Ban KHTN ──
  { id: 'ly10', icon: '⚛️', title: 'Vật lí gia trẻ',
    desc: 'Đạt 3 sao Vật lí lớp 10', trigger: { moduleStars: { 'H10LY': 3 } } },
  { id: 'ly11', icon: '🔊', title: 'Sóng & dao động lớp 11',
    desc: 'Đạt 3 sao Vật lí lớp 11', trigger: { moduleStars: { 'H11LY': 3 } } },
  { id: 'ly12', icon: '☢️', title: 'Sẵn sàng thi Vật lí',
    desc: 'Đạt 3 sao Vật lí lớp 12', trigger: { moduleStars: { 'H12LY': 3 } } },
  { id: 'hoa10', icon: '🧪', title: 'Hoá học yêu thích',
    desc: 'Đạt 3 sao Hoá học lớp 10', trigger: { moduleStars: { 'H10HOA': 3 } } },
  { id: 'hoa11', icon: '⚗️', title: 'Hoá hữu cơ lớp 11',
    desc: 'Đạt 3 sao Hoá học lớp 11', trigger: { moduleStars: { 'H11HOA': 3 } } },
  { id: 'hoa12', icon: '🏭', title: 'Sẵn sàng thi Hoá học',
    desc: 'Đạt 3 sao Hoá học lớp 12', trigger: { moduleStars: { 'H12HOA': 3 } } },
  { id: 'sinh10', icon: '🧬', title: 'Nhà sinh học nhỏ',
    desc: 'Đạt 3 sao Sinh học lớp 10', trigger: { moduleStars: { 'H10SINH': 3 } } },
  { id: 'sinh11', icon: '🌱', title: 'Cơ thể sống lớp 11',
    desc: 'Đạt 3 sao Sinh học lớp 11', trigger: { moduleStars: { 'H11SINH': 3 } } },
  { id: 'sinh12', icon: '🦠', title: 'Sẵn sàng thi Sinh học',
    desc: 'Đạt 3 sao Sinh học lớp 12', trigger: { moduleStars: { 'H12SINH': 3 } } },
  { id: 'khtn-triple', icon: '🔬', title: 'Tam giác KHTN',
    desc: 'Đạt sao Lí + Hoá + Sinh lớp 10',
    trigger: { moduleStars: { 'H10LY': 1, 'H10HOA': 1, 'H10SINH': 1 } } },

  // ── Ban KHXH ──
  { id: 'su10', icon: '🏛️', title: 'Yêu lịch sử dân tộc',
    desc: 'Đạt 3 sao Lịch sử lớp 10', trigger: { moduleStars: { 'H10SU': 3 } } },
  { id: 'su11', icon: '🗿', title: 'Lịch sử hiện đại lớp 11',
    desc: 'Đạt 3 sao Lịch sử lớp 11', trigger: { moduleStars: { 'H11SU': 3 } } },
  { id: 'su12', icon: '🏵️', title: 'Sẵn sàng thi Lịch sử',
    desc: 'Đạt 3 sao Lịch sử lớp 12', trigger: { moduleStars: { 'H12SU': 3 } } },
  { id: 'dia10', icon: '🗺️', title: 'Nhà địa lý học',
    desc: 'Đạt 3 sao Địa lý lớp 10', trigger: { moduleStars: { 'H10DIA': 3 } } },
  { id: 'dia11', icon: '🌏', title: 'Địa lý thế giới lớp 11',
    desc: 'Đạt 3 sao Địa lý lớp 11', trigger: { moduleStars: { 'H11DIA': 3 } } },
  { id: 'dia12', icon: '🇻🇳', title: 'Sẵn sàng thi Địa lý',
    desc: 'Đạt 3 sao Địa lý lớp 12', trigger: { moduleStars: { 'H12DIA': 3 } } },

  // ── Tin học ──
  { id: 'tin10', icon: '💻', title: 'Digital THPT',
    desc: 'Đạt 3 sao Tin học lớp 10', trigger: { moduleStars: { 'H10TIN': 3 } } },
  { id: 'tin11', icon: '🗄️', title: 'Cơ sở dữ liệu lớp 11',
    desc: 'Đạt 3 sao Tin học lớp 11', trigger: { moduleStars: { 'H11TIN': 3 } } },
  { id: 'tin12', icon: '🤖', title: 'AI & Lập trình lớp 12',
    desc: 'Đạt 3 sao Tin học lớp 12', trigger: { moduleStars: { 'H12TIN': 3 } } },

  // ── GDCD / GD Kinh tế & Pháp luật ──
  { id: 'gdcd10', icon: '📜', title: 'Công dân kinh tế lớp 10',
    desc: 'Đạt 3 sao GD Kinh tế & Pháp luật lớp 10', trigger: { moduleStars: { 'H10GDCD': 3 } } },
  { id: 'gdcd11', icon: '⚖️', title: 'Pháp luật thực tiễn lớp 11',
    desc: 'Đạt 3 sao GD Kinh tế & Pháp luật lớp 11', trigger: { moduleStars: { 'H11GDCD': 3 } } },
  { id: 'gdcd12', icon: '🏛️', title: 'Sẵn sàng thi GDCD',
    desc: 'Đạt 3 sao GD Kinh tế & Pháp luật lớp 12', trigger: { moduleStars: { 'H12GDCD': 3 } } },

  // ── Công nghệ ──
  { id: 'cn10', icon: '🔧', title: 'Cơ khí & Kỹ thuật lớp 10',
    desc: 'Đạt 3 sao Công nghệ lớp 10', trigger: { moduleStars: { 'H10CN': 3 } } },
  { id: 'cn11', icon: '⚙️', title: 'Công nghệ chuyên sâu lớp 11',
    desc: 'Đạt 3 sao Công nghệ lớp 11', trigger: { moduleStars: { 'H11CN': 3 } } },
  { id: 'cn12', icon: '🏗️', title: 'Kỹ sư tương lai lớp 12',
    desc: 'Đạt 3 sao Công nghệ lớp 12', trigger: { moduleStars: { 'H12CN': 3 } } },

  // ── GD Quốc phòng - An ninh ──
  { id: 'gdqp10', icon: '🎖️', title: 'Truyền thống Quân đội lớp 10',
    desc: 'Đạt 3 sao GDQP-AN lớp 10', trigger: { moduleStars: { 'H10GDQP': 3 } } },
  { id: 'gdqp11', icon: '🛡️', title: 'An ninh quốc gia lớp 11',
    desc: 'Đạt 3 sao GDQP-AN lớp 11', trigger: { moduleStars: { 'H11GDQP': 3 } } },
  { id: 'gdqp12', icon: '🇻🇳', title: 'Chiến sĩ Quốc phòng',
    desc: 'Đạt 3 sao GDQP-AN lớp 12', trigger: { moduleStars: { 'H12GDQP': 3 } } },

  // ── HĐ Trải nghiệm – Hướng nghiệp ──
  { id: 'hdtn10', icon: '🌱', title: 'Trải nghiệm THPT lớp 10',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 10', trigger: { moduleStars: { 'H10HDTN': 3 } } },
  { id: 'hdtn11', icon: '🌟', title: 'Hướng nghiệp lớp 11',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 11', trigger: { moduleStars: { 'H11HDTN': 3 } } },
  { id: 'hdtn12', icon: '🎯', title: 'Sẵn sàng vào Đại học',
    desc: 'Đạt 3 sao HĐ Trải nghiệm lớp 12', trigger: { moduleStars: { 'H12HDTN': 3 } } },

  // ── Sao tích luỹ ──
  { id: 'star-20', icon: '✨', title: 'Sưu tầm 20 sao',
    desc: 'Tích luỹ 20 sao', trigger: { totalStars: 20 } },
  { id: 'star-30', icon: '⭐', title: 'Ngôi sao 30',
    desc: 'Tích luỹ 30 sao — đang trên đà chinh phục chương trình THPT', trigger: { totalStars: 30 } },
  { id: 'star-50', icon: '💫', title: 'Ngôi sao THPT',
    desc: 'Tích luỹ 50 sao', trigger: { totalStars: 50 } },

  // ── Tốt nghiệp lớp ──
  { id: 'year1-hs-complete', icon: '🥇', title: 'Vượt qua lớp 10!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 10', trigger: { yearComplete: 1 } },
  { id: 'year2-hs-complete', icon: '🥈', title: 'Lên lớp 12!',
    desc: 'Hoàn thành toàn bộ chương trình lớp 11', trigger: { yearComplete: 2 } },
  { id: 'highschool-grad', icon: '🎓', title: 'Tốt nghiệp THPT',
    desc: 'Hoàn thành toàn bộ chương trình lớp 12', trigger: { yearComplete: 3 } },

  // ── Chinh phục toàn bộ Toán THPT ──
  { id: 'all-hs-math', icon: '🏆', title: 'Thủ khoa Toán THPT',
    desc: 'Đạt sao Toán cả 3 lớp 10–12',
    trigger: { moduleStars: { 'H10TOAN': 1, 'H11TOAN': 1, 'H12TOAN': 1 } } },

  // ── Streak dài hạn ──
  { id: 'streak-30', icon: '🔥', title: 'Kiên trì 30 ngày',
    desc: 'Vào học 30 ngày liên tiếp — nghị lực đáng nể!', trigger: { streak: 30 } },

  // ── Sao tích luỹ cao ──
  { id: 'star-100', icon: '🌠', title: 'Ngôi sao 100',
    desc: 'Tích luỹ 100 sao — chinh phục toàn bộ chương trình THPT', trigger: { totalStars: 100 } },
  { id: 'star-120', icon: '🏆', title: 'Thủ khoa 120 sao',
    desc: 'Tích luỹ 120 sao — đỉnh cao 3 năm THPT, xứng danh học sinh xuất sắc toàn diện', trigger: { totalStars: 120 } },

  // ── Combo Ban KHXH lớp 10 ──
  { id: 'khxh-double', icon: '🗺️', title: 'Đôi KHXH lớp 10',
    desc: 'Đạt sao Lịch sử + Địa lý lớp 10 — nền tảng ban Khoa học Xã hội',
    trigger: { moduleStars: { 'H10SU': 1, 'H10DIA': 1 } } },

  // ── Combo Ban KHTN lớp 11 & 12 ──
  { id: 'khtn-triple-11', icon: '⚗️', title: 'Tam giác KHTN lớp 11',
    desc: 'Đạt sao Vật lý + Hoá học + Sinh học lớp 11',
    trigger: { moduleStars: { 'H11LY': 1, 'H11HOA': 1, 'H11SINH': 1 } } },
  { id: 'khtn-triple-12', icon: '🔭', title: 'Tam giác KHTN lớp 12',
    desc: 'Đạt sao Vật lý + Hoá học + Sinh học lớp 12 — sẵn sàng thi tốt nghiệp',
    trigger: { moduleStars: { 'H12LY': 1, 'H12HOA': 1, 'H12SINH': 1 } } },

  // ── Lộ trình ban hoàn chỉnh ──
  { id: 'science-path', icon: '🔬', title: 'Lộ trình KHTN hoàn chỉnh',
    desc: 'Đạt sao Lý + Hoá + Sinh cả 3 lớp 10–12 — xứng danh chiến binh KHTN',
    trigger: { moduleStars: {
      'H10LY': 1, 'H10HOA': 1, 'H10SINH': 1,
      'H11LY': 1, 'H11HOA': 1, 'H11SINH': 1,
      'H12LY': 1, 'H12HOA': 1, 'H12SINH': 1,
    } } },
  { id: 'social-path', icon: '🏛️', title: 'Lộ trình KHXH hoàn chỉnh',
    desc: 'Đạt sao Lịch sử + Địa lý cả 3 lớp 10–12 — xứng danh chiến binh KHXH',
    trigger: { moduleStars: {
      'H10SU': 1, 'H10DIA': 1,
      'H11SU': 1, 'H11DIA': 1,
      'H12SU': 1, 'H12DIA': 1,
    } } },
];
