// ============================================================
// Trường Mầm non — Phát triển thẩm mỹ (Lĩnh vực 5 · N-TM)
// ============================================================
// 3 lứa tuổi: Mầm (3 tuổi) · Chồi (4 tuổi) · Lá (5 tuổi).
// Nội dung: âm nhạc, hội họa, hát-múa, gấp giấy, nghệ thuật dân gian VN.
// ============================================================

const q = (id, title, yearLevel, questions) => ({
  id, title, kind: 'quiz', yearLevel, subject: 'tham-my', difficulty: 1, questions,
});

// ── N1-TM · Mầm (3 tuổi) ──
export const N1_TM_QUIZ = q('N1-TM-quiz', 'Mầm · Thẩm mỹ — Âm nhạc & Màu sắc', 1, [
  {
    stem: 'Màu nào tạo ra khi trộn màu đỏ với màu vàng? 🎨',
    choices: ['Màu xanh lá', 'Màu cam', 'Màu tím'],
    answer: 1,
    explanation: 'Đỏ + Vàng = Cam 🟠. Đây là màu thứ cấp. Thử trộn màu nước để xem kết quả thú vị!',
  },
  {
    stem: 'Khi nghe nhạc vui và nhanh, bé thường muốn làm gì? 🎵',
    choices: ['Buồn ngủ và ngáp', 'Lắc lư người hoặc nhảy theo nhịp', 'Ngồi im không nhúc nhích'],
    answer: 1,
    explanation: 'Âm nhạc có nhịp điệu vui kích thích cơ thể vận động — đây là phản ứng cảm thụ âm nhạc tự nhiên của trẻ.',
  },
  {
    stem: 'Cọ tô màu dùng để làm gì? 🖌️',
    choices: ['Chải tóc', 'Tô màu và vẽ tranh', 'Đánh răng'],
    answer: 1,
    explanation: 'Cọ vẽ dùng để tô màu và vẽ tranh trên giấy. Cầm cọ nhẹ nhàng và tô màu đều tay giúp tranh đẹp hơn.',
  },
  {
    stem: 'Bé đất nặn thành hình tròn. Bé đang làm gì?',
    choices: ['Chơi bóng', 'Sáng tạo nghệ thuật tạo hình bằng tay', 'Học toán'],
    answer: 1,
    explanation: 'Nặn đất là hoạt động tạo hình — phát triển cả đôi tay khéo léo lẫn trí tưởng tượng sáng tạo của bé.',
  },
  {
    stem: 'Tiếng trống THÙNG THÙNG và tiếng kèn TÍ TẾ có gì khác nhau?',
    choices: ['Không khác gì nhau', 'Trống có âm thanh trầm/to, kèn có âm thanh cao/thanh', 'Trống kêu nhanh hơn kèn'],
    answer: 1,
    explanation: 'Trống tạo ra âm trầm và mạnh, kèn tạo ra âm cao và thanh — phân biệt âm sắc nhạc cụ là kỹ năng cảm thụ âm nhạc cơ bản.',
  },
]);

// ── N2-TM · Chồi (4 tuổi) ──
export const N2_TM_QUIZ = q('N2-TM-quiz', 'Chồi · Thẩm mỹ — Vẽ, Gấp giấy & Cảm thụ', 2, [
  {
    stem: 'Khi vẽ tranh "Gia đình em", bé vẽ ai vào trong tranh?',
    choices: ['Chỉ bé, không vẽ ai khác', 'Bố, mẹ, bé và những người thân trong nhà', 'Xe ô tô và ngôi nhà'],
    answer: 1,
    explanation: 'Vẽ tranh chủ đề là bé biết thể hiện nội dung qua hình vẽ. Gia đình là chủ đề thân thuộc — giúp bé kết nối tình cảm qua nghệ thuật.',
  },
  {
    stem: 'Gấp giấy origami hình máy bay cần dùng bao nhiêu tờ giấy vuông?',
    choices: ['3 tờ', '1 tờ', '5 tờ'],
    answer: 1,
    explanation: 'Một chiếc máy bay giấy chỉ cần 1 tờ giấy vuông — thực hành gấp giúp bé rèn luyện đôi tay khéo léo và tư duy không gian.',
  },
  {
    stem: 'Nhạc nền trong bài "Múa với bạn" nhanh hay chậm để phù hợp múa vui?',
    choices: ['Rất chậm và buồn bã', 'Vừa phải và vui tươi, đúng nhịp', 'Không cần nhạc, múa im lặng'],
    answer: 1,
    explanation: 'Âm nhạc múa vui phải có nhịp điệu vừa phải và vui tươi — giúp người múa giữ nhịp đồng đều và truyền cảm xúc vui vẻ.',
  },
  {
    stem: 'Bé dán hình lá cây và hoa lên giấy tạo thành bức tranh mùa xuân. Đây là loại hình nghệ thuật gì?',
    choices: ['Nghệ thuật chụp ảnh', 'Nghệ thuật ghép-dán (collage)', 'Nghệ thuật điêu khắc'],
    answer: 1,
    explanation: 'Cắt và dán các mảnh vật liệu để tạo thành tranh gọi là collage — kỹ thuật nghệ thuật thú vị giúp tái chế vật liệu và phát triển sáng tạo.',
  },
  {
    stem: 'Để vẽ đường thẳng đẹp, bé cần làm gì?',
    choices: ['Vẽ thật nhanh không cần chú ý', 'Giữ tay ổn định và di bút đều từ điểm này sang điểm kia', 'Vẽ rồi xóa rồi vẽ lại nhiều lần'],
    answer: 1,
    explanation: 'Vẽ đường thẳng đẹp cần tay ổn định và di chuyển đều — đây là kỹ năng vận động tinh quan trọng để chuẩn bị viết chữ.',
  },
]);

// ── N3-TM · Lá (5 tuổi) ──
export const N3_TM_QUIZ = q('N3-TM-quiz', 'Lá · Thẩm mỹ — Nghệ thuật dân gian VN & Biểu diễn', 3, [
  {
    stem: 'Tranh Đông Hồ là loại tranh truyền thống nổi tiếng của vùng nào ở Việt Nam?',
    choices: ['Miền Nam (làng Bình Dương)', 'Miền Bắc (làng Đông Hồ, Bắc Ninh)', 'Miền Trung (Huế)'],
    answer: 1,
    explanation: 'Tranh Đông Hồ xuất xứ từ làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh — là di sản văn hóa phi vật thể quý giá của Việt Nam.',
  },
  {
    stem: 'Khi biểu diễn một bài hát trước lớp, điều quan trọng nhất là gì?',
    choices: ['Hát thật to để ai cũng nghe, dù sai giai điệu', 'Hát đúng giai điệu, rõ lời và thể hiện cảm xúc bài hát', 'Chỉ cần đứng im, không cần hát to'],
    answer: 1,
    explanation: 'Biểu diễn tốt cần: đúng giai điệu, rõ lời và truyền được cảm xúc của bài hát đến người nghe — không chỉ là hát to.',
  },
  {
    stem: 'Múa rối nước là loại hình nghệ thuật đặc trưng của Việt Nam. Con rối biểu diễn ở đâu?',
    choices: ['Trên sân khấu gỗ trên cạn', 'Trên mặt nước trong bể nước nông', 'Trên màn hình tivi'],
    answer: 1,
    explanation: 'Múa rối nước đặc trưng Việt Nam: các con rối gỗ được điều khiển biểu diễn trên mặt nước — nghệ thuật độc đáo không nơi nào trên thế giới giống.',
  },
  {
    stem: 'Khi vẽ tranh theo ý thích (vẽ tự do), điều nào đúng nhất?',
    choices: ['Phải vẽ đúng y như tranh mẫu', 'Bé được tự do thể hiện ý tưởng, cảm xúc riêng của mình', 'Chỉ được dùng 2 màu đen và trắng'],
    answer: 1,
    explanation: 'Vẽ tự do là không gian sáng tạo không giới hạn — bé được thể hiện thế giới theo cách riêng của mình. Không có đúng hay sai trong sáng tạo.',
  },
  {
    stem: 'Điệu dân ca Quan họ Bắc Ninh và nhạc Cải lương miền Nam đều là gì?',
    choices: ['Âm nhạc nước ngoài nhập khẩu vào Việt Nam', 'Di sản văn hóa phi vật thể của Việt Nam', 'Nhạc phim hoạt hình thiếu nhi'],
    answer: 1,
    explanation: 'Quan họ Bắc Ninh và Đờn ca tài tử Nam Bộ (nguồn gốc Cải lương) đều được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại — bé tự hào về âm nhạc Việt.',
  },
]);

export const PRESCHOOL_ARTS_SCENARIOS = {
  [N1_TM_QUIZ.id]: N1_TM_QUIZ,
  [N2_TM_QUIZ.id]: N2_TM_QUIZ,
  [N3_TM_QUIZ.id]: N3_TM_QUIZ,
};
