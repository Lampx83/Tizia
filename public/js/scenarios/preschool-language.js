// ============================================================
// Trường Mầm non — Phát triển ngôn ngữ (Lĩnh vực 3 · N-NN)
// ============================================================
// 3 lứa tuổi: Mầm (3 tuổi) · Chồi (4 tuổi) · Lá (5 tuổi).
// Nội dung: từ vựng đồ vật/con vật, âm-chữ, kể chuyện tranh, thơ.
// ============================================================

const q = (id, title, yearLevel, questions) => ({
  id, title, kind: 'quiz', yearLevel, subject: 'ngon-ngu', difficulty: 1, questions,
});

// ── N1-NN · Mầm (3 tuổi) ──
export const N1_NN_QUIZ = q('N1-NN-quiz', 'Mầm · Ngôn ngữ — Từ vựng & Giao tiếp', 1, [
  {
    stem: 'Con vật nào kêu "Meo meo"? 🐱',
    choices: ['Con chó', 'Con mèo', 'Con gà'],
    answer: 1,
    explanation: 'Con mèo kêu "Meo meo". Con chó kêu "Gâu gâu". Con gà kêu "Cục tác".',
  },
  {
    stem: 'Đồ vật nào dùng để ăn cơm? 🍽️',
    choices: ['Cái chăn', 'Cái bát và cái thìa', 'Cái gối'],
    answer: 1,
    explanation: 'Bát để đựng cơm, thìa để xúc ăn. Chăn và gối dùng để ngủ.',
  },
  {
    stem: 'Khi gặp người lớn, bé nên nói gì? 👋',
    choices: ['Im lặng, không nói gì', 'Chào hỏi lễ phép: "Con chào ạ!"', 'Quay mặt đi chỗ khác'],
    answer: 1,
    explanation: 'Bé ngoan biết chào hỏi lễ phép khi gặp người lớn — đây là cách giao tiếp lịch sự và thể hiện sự tôn trọng.',
  },
  {
    stem: 'Khi muốn lấy đồ chơi của bạn, bé nên nói gì?',
    choices: ['Giật ngay không cần xin', 'Xin phép: "Cho mình mượn với nhé?"', 'Khóc to lên'],
    answer: 1,
    explanation: 'Biết dùng lời nói lịch sự khi muốn mượn đồ — đây là kỹ năng ngôn ngữ xã hội quan trọng của trẻ Mầm.',
  },
  {
    stem: 'Trong gia đình bé, ai là "Bà"?',
    choices: ['Mẹ của bé', 'Mẹ của bố hoặc mẹ của mẹ', 'Chị của bé'],
    answer: 1,
    explanation: 'Bà là mẹ của bố hoặc mẹ của mẹ. Biết tên gọi các thành viên gia đình là từ vựng cơ bản đầu tiên trẻ học.',
  },
]);

// ── N2-NN · Chồi (4 tuổi) ──
export const N2_NN_QUIZ = q('N2-NN-quiz', 'Chồi · Ngôn ngữ — Chữ cái & Kể chuyện', 2, [
  {
    stem: 'Tiếng Việt có tất cả bao nhiêu chữ cái? 🔤',
    choices: ['20 chữ cái', '29 chữ cái', '26 chữ cái'],
    answer: 1,
    explanation: 'Tiếng Việt có 29 chữ cái (a, ă, â, b, c, d, đ, e, ê, g, h, i, k, l, m, n, o, ô, ơ, p, q, r, s, t, u, ư, v, x, y). Nhiều hơn tiếng Anh (26 chữ).',
  },
  {
    stem: 'Nhìn vào tranh một bé đang ăn cơm cùng gia đình, bé kể lại được gì?',
    choices: ['Không cần kể gì cả', 'Ai đang làm gì trong tranh, diễn ra ở đâu', 'Chỉ nói "Bức tranh đẹp"'],
    answer: 1,
    explanation: 'Kể chuyện theo tranh là kỹ năng quan trọng: bé quan sát và dùng từ ngữ để mô tả nhân vật, hành động và bối cảnh trong tranh.',
  },
  {
    stem: 'Câu hỏi thường bắt đầu bằng những từ nào?',
    choices: ['Và, nhưng, nếu', 'Ai, cái gì, ở đâu, khi nào, tại sao', 'To, nhỏ, nhanh, chậm'],
    answer: 1,
    explanation: 'Từ để hỏi gồm: Ai (người), Cái gì (vật), Ở đâu (nơi chốn), Khi nào (thời gian), Tại sao (lý do) — bé biết đặt câu hỏi là biết tư duy ngôn ngữ.',
  },
  {
    stem: 'Chữ cái nào đứng đầu tiên trong bảng chữ cái tiếng Việt?',
    choices: ['Chữ B', 'Chữ A', 'Chữ Ô'],
    answer: 1,
    explanation: 'Chữ A đứng đầu tiên trong bảng chữ cái tiếng Việt — đây là chữ cái đầu tiên trẻ em học.',
  },
  {
    stem: 'Khi nghe câu chuyện, bé cần làm gì để hiểu tốt?',
    choices: ['Vừa nghe vừa làm chuyện khác', 'Lắng nghe chú ý và nhìn vào người kể', 'Nói chuyện với bạn bên cạnh'],
    answer: 1,
    explanation: 'Lắng nghe chú ý (chú ý nghe + mắt nhìn người kể) là kỹ năng nghe hiểu quan trọng — nền tảng của việc học ngôn ngữ.',
  },
]);

// ── N3-NN · Lá (5 tuổi) ──
export const N3_NN_QUIZ = q('N3-NN-quiz', 'Lá · Ngôn ngữ — Đọc chữ & Thơ ngắn', 3, [
  {
    stem: 'Chữ "Đ" và chữ "D" khác nhau ở điểm gì?',
    choices: ['Hoàn toàn giống nhau', 'Chữ Đ có thêm nét gạch ngang ở thân chữ', 'Chữ D to hơn chữ Đ'],
    answer: 1,
    explanation: 'Chữ Đ có thêm một nét gạch ngang ở thân chữ D — đây là điểm đặc trưng riêng của tiếng Việt so với tiếng Anh.',
  },
  {
    stem: 'Bài thơ "Hoa Kết Trái" của Phạm Hổ có câu: "Bé ơi bé hỡi / Bé ngủ với ai?". Đây là loại thơ gì?',
    choices: ['Thơ dành cho người lớn', 'Thơ thiếu nhi (thơ cho trẻ em)', 'Bài hát người lớn'],
    answer: 1,
    explanation: 'Thơ thiếu nhi có vần điệu vui, ngôn ngữ đơn giản, gần gũi với cuộc sống trẻ em — rất dễ thuộc và đọc to.',
  },
  {
    stem: 'Khi viết chữ, bé cần bắt đầu từ đâu trên trang giấy?',
    choices: ['Từ dưới lên trên, phía tay phải', 'Từ trên xuống dưới, phía tay trái', 'Ở giữa trang'],
    answer: 1,
    explanation: 'Tiếng Việt viết từ trái sang phải, từ trên xuống dưới — giống cách đọc. Bé bắt đầu viết từ góc trên bên tay trái của trang.',
  },
  {
    stem: 'Trong câu "Con mèo đang ngủ", từ nào chỉ con vật?',
    choices: ['Đang', 'Con mèo', 'Ngủ'],
    answer: 1,
    explanation: '"Con mèo" là từ chỉ con vật (danh từ). "Đang" là từ chỉ thời gian. "Ngủ" là từ chỉ hành động (động từ).',
  },
  {
    stem: 'Bé học đọc từng chữ, sau đó ghép thành từ, rồi đọc cả câu. Đây là kỹ năng gì?',
    choices: ['Kỹ năng tô màu', 'Kỹ năng đọc (giải mã văn bản)', 'Kỹ năng nhảy múa'],
    answer: 1,
    explanation: 'Đọc là kỹ năng nhận biết chữ cái → ghép vần → đọc từ → đọc câu — nền tảng quan trọng nhất của việc học tiếng Việt ở lớp 1.',
  },
]);

export const PRESCHOOL_LANGUAGE_SCENARIOS = {
  [N1_NN_QUIZ.id]: N1_NN_QUIZ,
  [N2_NN_QUIZ.id]: N2_NN_QUIZ,
  [N3_NN_QUIZ.id]: N3_NN_QUIZ,
};
