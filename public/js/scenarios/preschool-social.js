// ============================================================
// Trường Mầm non — Phát triển tình cảm–xã hội (Lĩnh vực 4 · N-TX)
// ============================================================
// 3 lứa tuổi: Mầm (3 tuổi) · Chồi (4 tuổi) · Lá (5 tuổi).
// Nội dung: cảm xúc cơ bản, chào hỏi, chia sẻ, hợp tác, văn hóa VN.
// ============================================================

const q = (id, title, yearLevel, questions) => ({
  id, title, kind: 'quiz', yearLevel, subject: 'tinh-cam-xh', difficulty: 1, questions,
});

// ── N1-TX · Mầm (3 tuổi) ──
export const N1_TX_QUIZ = q('N1-TX-quiz', 'Mầm · Tình cảm–XH — Cảm xúc & Lễ phép', 1, [
  {
    stem: 'Khi bé vui vẻ, bé thường làm gì? 😊',
    choices: ['Khóc và buồn', 'Cười và muốn chơi cùng bạn', 'Nằm im không muốn làm gì'],
    answer: 1,
    explanation: 'Cảm xúc vui vẻ giúp bé muốn giao tiếp và chơi cùng mọi người. Nhận biết cảm xúc của bản thân là bước đầu phát triển tình cảm.',
  },
  {
    stem: 'Khi bạn cho bé kẹo, bé nên nói gì? 🍭',
    choices: ['Lấy kẹo và bỏ đi ngay', 'Nói "Cảm ơn bạn!" và mỉm cười', 'Đòi thêm ngay lập tức'],
    answer: 1,
    explanation: 'Nói "Cảm ơn" khi nhận quà là phép lịch sự cơ bản — thể hiện bé biết trân trọng sự quan tâm của người khác.',
  },
  {
    stem: 'Khi bé lỡ làm vỡ đồ chơi của bạn, bé phải làm gì?',
    choices: ['Giả vờ không biết gì', 'Nói "Mình xin lỗi bạn nhé!"', 'Bỏ chạy đi chỗ khác'],
    answer: 1,
    explanation: 'Biết xin lỗi khi làm sai là phẩm chất quan trọng. "Xin lỗi" thể hiện bé có trách nhiệm và biết quan tâm đến cảm xúc của bạn.',
  },
  {
    stem: 'Khi gặp thầy cô giáo, bé nên làm gì?',
    choices: ['Quay mặt đi chỗ khác', 'Cúi chào và nói "Em chào thầy/cô ạ!"', 'Đứng im không nói gì'],
    answer: 1,
    explanation: 'Chào hỏi thầy cô lễ phép thể hiện sự kính trọng và phép lịch sự — là hành vi đúng mực của bé ở trường.',
  },
  {
    stem: 'Khi bé cảm thấy buồn vì nhớ mẹ, bé có thể làm gì?',
    choices: ['Nhịn không nói với ai', 'Nói với cô giáo hoặc bạn bè rằng bé đang buồn', 'Khóc một mình mãi không thôi'],
    answer: 1,
    explanation: 'Biết nói ra cảm xúc của mình giúp bé được an ủi và hỗ trợ. Chia sẻ cảm xúc là kỹ năng xã hội quan trọng.',
  },
]);

// ── N2-TX · Chồi (4 tuổi) ──
export const N2_TX_QUIZ = q('N2-TX-quiz', 'Chồi · Tình cảm–XH — Chia sẻ & Hợp tác', 2, [
  {
    stem: 'Khi bé có 2 cái kẹo và bạn không có, bé nên làm gì?',
    choices: ['Ăn hết cả 2 cái', 'Chia cho bạn 1 cái', 'Giấu kẹo đi để bạn không thấy'],
    answer: 1,
    explanation: 'Chia sẻ với bạn bè là hành động tốt đẹp — giúp gắn kết tình bạn và tạo không khí vui vẻ trong lớp.',
  },
  {
    stem: 'Khi chơi theo nhóm, điều quan trọng nhất là gì?',
    choices: ['Bé luôn phải thắng và được làm thủ lĩnh', 'Cùng nhau hợp tác, lắng nghe ý kiến của nhau', 'Không ai được nói, chỉ bé mới được nói'],
    answer: 1,
    explanation: 'Hợp tác nhóm đòi hỏi mỗi người biết lắng nghe, chia sẻ ý kiến và cùng làm việc — đây là kỹ năng xã hội quan trọng.',
  },
  {
    stem: 'Khi bé tức giận vì bạn lấy đồ chơi của mình, bé nên làm gì?',
    choices: ['Đánh hoặc cắn bạn ngay', 'Hít thở sâu, bình tĩnh và nói chuyện với bạn', 'Ném đồ chơi xuống đất'],
    answer: 1,
    explanation: 'Hít thở sâu giúp bình tĩnh khi tức giận. Sau đó dùng lời nói để giải quyết vấn đề — không dùng bạo lực.',
  },
  {
    stem: 'Bé yêu bố mẹ, muốn thể hiện tình cảm. Bé có thể làm gì?',
    choices: ['Không cần làm gì, bố mẹ tự biết', 'Ôm bố mẹ, nói "Con yêu bố/mẹ!" và giúp việc nhà nhỏ', 'Đòi bố mẹ mua đồ chơi'],
    answer: 1,
    explanation: 'Thể hiện tình yêu thương bằng lời nói, cử chỉ và hành động giúp đỡ — đây là cách bé xây dựng tình cảm gia đình ấm áp.',
  },
  {
    stem: 'Khi đang chờ đến lượt chơi xích đu, bé thấy chán và muốn chen. Bé nên làm gì?',
    choices: ['Chen vào trước vì bé cũng muốn chơi', 'Kiên nhẫn chờ đến lượt mình', 'Khóc để được chơi ngay'],
    answer: 1,
    explanation: 'Biết chờ đến lượt là kỹ năng tự kiểm soát bản thân — thể hiện bé tôn trọng người khác và biết chờ đợi kiên nhẫn.',
  },
]);

// ── N3-TX · Lá (5 tuổi) ──
export const N3_TX_QUIZ = q('N3-TX-quiz', 'Lá · Tình cảm–XH — Văn hóa VN & Sẵn sàng vào lớp 1', 3, [
  {
    stem: 'Tết Nguyên Đán là ngày lễ quan trọng của người Việt Nam. Tết thường diễn ra vào thời điểm nào?',
    choices: ['Tháng 1 Dương lịch (năm mới)', 'Cuối tháng 1 hoặc đầu tháng 2 Dương lịch (Âm lịch đầu năm)', 'Tháng 9 khai trường'],
    answer: 1,
    explanation: 'Tết Nguyên Đán theo lịch Âm rơi vào cuối tháng 1 hoặc đầu tháng 2 Dương lịch — là dịp đoàn tụ gia đình lớn nhất trong năm của người Việt.',
  },
  {
    stem: 'Khi có xung đột với bạn (tranh cãi, mâu thuẫn), cách giải quyết tốt nhất là gì?',
    choices: ['Mách thầy/cô ngay mà không cần thử tự giải quyết', 'Bình tĩnh nói chuyện để hiểu nhau, nếu cần thì nhờ người lớn', 'Không chơi với bạn đó nữa mãi mãi'],
    answer: 1,
    explanation: 'Bình tĩnh nói chuyện trực tiếp là cách giải quyết xung đột tốt nhất — thể hiện sự trưởng thành và kỹ năng giao tiếp của bé Lá.',
  },
  {
    stem: 'Quốc kỳ Việt Nam có màu gì và hình gì ở giữa?',
    choices: ['Nền xanh với ngôi sao vàng', 'Nền đỏ với ngôi sao vàng năm cánh', 'Nền vàng với hình rồng đỏ'],
    answer: 1,
    explanation: 'Cờ Tổ quốc Việt Nam: nền đỏ tượng trưng cho cách mạng, ngôi sao vàng năm cánh tượng trưng cho 5 tầng lớp nhân dân đoàn kết.',
  },
  {
    stem: 'Khi vào học lớp 1, điều quan trọng nhất bé cần biết làm là gì?',
    choices: ['Chỉ cần biết chơi vui là đủ', 'Ngồi ngay ngắn, lắng nghe thầy/cô và biết cách học bài', 'Không cần biết gì cả'],
    answer: 1,
    explanation: 'Vào lớp 1, bé cần kỹ năng học đường: ngồi đúng tư thế, tập trung nghe giảng, biết giơ tay phát biểu và hoàn thành bài tập.',
  },
  {
    stem: 'Bé cảm thấy tự hào khi làm được một việc tốt. Cảm xúc tự hào đến từ đâu?',
    choices: ['Từ việc bé giỏi hơn tất cả bạn bè', 'Từ việc bé cố gắng và hoàn thành được điều gì đó', 'Từ việc bé được người khác khen'],
    answer: 1,
    explanation: 'Tự hào lành mạnh đến từ sự cố gắng của bản thân — không phải từ việc thắng người khác hay chờ được khen. Đây là nền tảng của động lực học tập.',
  },
]);

export const PRESCHOOL_SOCIAL_SCENARIOS = {
  [N1_TX_QUIZ.id]: N1_TX_QUIZ,
  [N2_TX_QUIZ.id]: N2_TX_QUIZ,
  [N3_TX_QUIZ.id]: N3_TX_QUIZ,
};
