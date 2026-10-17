// ============================================================
// Trường Mầm non — Phát triển thể chất (Lĩnh vực 1 · N-TC)
// ============================================================
// 3 lứa tuổi: Mầm (3 tuổi) · Chồi (4 tuổi) · Lá (5 tuổi).
// Nội dung: vận động thô/tinh, vệ sinh cơ thể, dinh dưỡng, an toàn.
// Mỗi quiz 5 câu — phù hợp thời lượng hoạt động thể chất ngắn.
// ============================================================

const q = (id, title, yearLevel, questions) => ({
  id, title, kind: 'quiz', yearLevel, subject: 'the-chat', difficulty: 1, questions,
});

// ── N1-TC · Mầm (3 tuổi) ──
export const N1_TC_QUIZ = q('N1-TC-quiz', 'Mầm · Thể chất — Vận động & Vệ sinh', 1, [
  {
    stem: 'Để tay sạch trước khi ăn, bé cần làm gì?',
    choices: ['Lau tay vào quần áo', 'Rửa tay bằng xà phòng và nước sạch', 'Thổi vào tay'],
    answer: 1,
    explanation: 'Rửa tay bằng xà phòng và nước sạch giúp loại bỏ vi khuẩn, bảo vệ bé khỏi bị ốm.',
  },
  {
    stem: 'Chạy, bật nhảy, bò và leo là những hoạt động vận động gì?',
    choices: ['Vận động tinh (tay nhỏ)', 'Vận động thô (toàn thân)', 'Không phải vận động'],
    answer: 1,
    explanation: 'Vận động thô sử dụng các cơ lớn của cơ thể như chân, tay, lưng — giúp bé phát triển sức mạnh và sự phối hợp cơ bản.',
  },
  {
    stem: 'Khi sàn nhà bị ướt, bé nên làm gì để không bị ngã?',
    choices: ['Chạy thật nhanh qua', 'Đi chậm và cẩn thận', 'Nhảy qua chỗ ướt'],
    answer: 1,
    explanation: 'Sàn ướt rất trơn. Bé cần đi chậm, cẩn thận để giữ thăng bằng và tránh bị ngã.',
  },
  {
    stem: 'Mỗi buổi sáng thức dậy, điều đầu tiên bé nên làm là gì?',
    choices: ['Bật tivi xem ngay', 'Rửa mặt và đánh răng', 'Ăn kẹo ngọt'],
    answer: 1,
    explanation: 'Rửa mặt và đánh răng buổi sáng giúp giữ vệ sinh cơ thể sạch sẽ và bắt đầu ngày mới tươi tắn.',
  },
  {
    stem: 'Khi bé cảm thấy mệt và rất khát sau khi chơi, bé cần làm gì?',
    choices: ['Tiếp tục chạy nhảy', 'Nghỉ ngơi và uống nước', 'Khóc và không làm gì'],
    answer: 1,
    explanation: 'Cơ thể cần nghỉ ngơi khi mệt và uống nước khi khát — đây là cách bé tự chăm sóc sức khỏe cơ bản.',
  },
]);

// ── N2-TC · Chồi (4 tuổi) ──
export const N2_TC_QUIZ = q('N2-TC-quiz', 'Chồi · Thể chất — Khéo léo & Dinh dưỡng', 2, [
  {
    stem: 'Đi thăng bằng trên một đường thẳng hẹp giúp bé rèn luyện điều gì?',
    choices: ['Sức mạnh tay', 'Khả năng thăng bằng và phối hợp cơ thể', 'Giọng nói to hơn'],
    answer: 1,
    explanation: 'Đi thăng bằng rèn luyện khả năng cân bằng cơ thể và sự phối hợp giữa mắt, chân — kỹ năng vận động quan trọng ở lứa tuổi Chồi.',
  },
  {
    stem: 'Bắt bóng bằng hai tay giúp rèn luyện kỹ năng gì?',
    choices: ['Phối hợp tay-mắt', 'Khả năng ngôn ngữ', 'Tư duy toán học'],
    answer: 0,
    explanation: 'Bắt bóng đòi hỏi mắt theo dõi bóng và tay phản ứng kịp thời — đây là kỹ năng phối hợp tay-mắt rất quan trọng cho sự phát triển thể chất.',
  },
  {
    stem: 'Ăn đủ rau, thịt, cá và cơm mỗi ngày giúp bé như thế nào?',
    choices: ['Bé sẽ ngủ ít hơn', 'Bé lớn khỏe và có năng lượng vui chơi', 'Bé hay bị ốm hơn'],
    answer: 1,
    explanation: 'Ăn đủ 4 nhóm thực phẩm giúp cơ thể phát triển tốt, có sức đề kháng tốt và đủ năng lượng để học và chơi.',
  },
  {
    stem: 'Thực phẩm nào TỐT cho sức khỏe của bé?',
    choices: ['Kẹo ngọt và nước ngọt nhiều đường', 'Rau xanh và trái cây tươi', 'Đồ chiên nhiều dầu mỡ'],
    answer: 1,
    explanation: 'Rau xanh và trái cây tươi cung cấp vitamin, khoáng chất và chất xơ — rất tốt cho sức khỏe. Nên hạn chế đường và đồ chiên.',
  },
  {
    stem: 'Khi bé bị ngã và xước da tay nhỏ, bé nên làm gì?',
    choices: ['Cứ để vậy, tự khỏi', 'Báo người lớn để rửa sạch và băng vết thương', 'Tự lấy kéo cắt phần bị xước'],
    answer: 1,
    explanation: 'Khi bị xước da, cần báo người lớn để rửa vết thương bằng nước sạch và băng lại — tránh vi khuẩn gây nhiễm trùng.',
  },
]);

// ── N3-TC · Lá (5 tuổi) ──
export const N3_TC_QUIZ = q('N3-TC-quiz', 'Lá · Thể chất — An toàn giao thông & Sẵn sàng vào lớp 1', 3, [
  {
    stem: 'Khi đi bộ trên đường phố, bé và người lớn nên đi ở đâu?',
    choices: ['Giữa lòng đường cùng xe cộ', 'Trên vỉa hè, sát lề phía trong', 'Bất cứ chỗ nào tiện'],
    answer: 1,
    explanation: 'Người đi bộ phải đi trên vỉa hè, sát lề phía trong để an toàn và không cản trở xe cộ.',
  },
  {
    stem: 'Đèn giao thông màu ĐỎ có nghĩa là gì?',
    choices: ['Đi nhanh lên', 'Dừng lại và đợi', 'Đi chậm qua'],
    answer: 1,
    explanation: 'Đèn đỏ = DỪNG LẠI và đợi. Đèn xanh = được đi. Đèn vàng = chuẩn bị dừng. Đây là quy tắc an toàn giao thông quan trọng nhất.',
  },
  {
    stem: 'Cầm bút đúng cách (3 ngón: ngón cái, ngón trỏ và ngón giữa) giúp bé điều gì?',
    choices: ['Viết nhanh nhưng tay rất mau mỏi', 'Viết đẹp, đều nét và không bị đau tay', 'Không giúp gì cả'],
    answer: 1,
    explanation: 'Cầm bút đúng cách giúp lực viết đều, nét chữ đẹp và không gây mỏi hay đau tay — rất quan trọng để chuẩn bị vào lớp 1.',
  },
  {
    stem: 'Nhảy dây giúp rèn luyện điều gì?',
    choices: ['Chỉ rèn sức mạnh đôi tay', 'Rèn luyện toàn thân: chân, phối hợp tay-chân và hô hấp', 'Chỉ rèn luyện đôi mắt'],
    answer: 1,
    explanation: 'Nhảy dây là bài tập toàn thân: chân bật, tay quay dây, mắt-chân phối hợp và tim phổi được luyện tập — rất có ích cho sức khỏe.',
  },
  {
    stem: 'Trước khi ăn và sau khi đi vệ sinh, bé nhất định phải làm gì?',
    choices: ['Hát một bài vui', 'Rửa tay kỹ bằng xà phòng', 'Chạy vòng quanh phòng 3 vòng'],
    answer: 1,
    explanation: 'Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh là thói quen sức khỏe quan trọng nhất — ngăn chặn vi khuẩn gây bệnh đường tiêu hóa.',
  },
]);

export const PRESCHOOL_PHYSICAL_SCENARIOS = {
  [N1_TC_QUIZ.id]: N1_TC_QUIZ,
  [N2_TC_QUIZ.id]: N2_TC_QUIZ,
  [N3_TC_QUIZ.id]: N3_TC_QUIZ,
};
