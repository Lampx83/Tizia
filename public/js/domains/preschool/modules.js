// ============================================================
// Trường Mầm non — Module list (Mầm/Chồi/Lá) theo TT 51/2020
// ============================================================
// 5 LĨNH VỰC PHÁT TRIỂN × 3 độ tuổi = 15 module track.
// Lĩnh vực 2 (Nhận thức / N1-N3) GIỮ NGUYÊN — đã có scenarios đầy đủ.
// Lĩnh vực 1,3,4,5 (TC/NN/TX/TM) — có quiz content.
// ============================================================

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  // ───────── Lĩnh vực 2 — Phát triển nhận thức (đã có content đầy đủ) ─────────
  // N1/N2/N3 gom tổng "36 tuần + Làm quen Toán" theo môn `lam-quen-toan`.
  { category: 'curriculum', id: 'N1', title: 'Mầm (3 tuổi) · 36 tuần + Làm quen Toán', yearLevel: 1, subject: 'lam-quen-toan',
    scenarioIds: ['N1-quiz', 'N1-match', 'N1-w01'], knowledgeQuiz: 'N1-quiz', minStarsToUnlock: 0,
    description: '36 tuần chủ đề (trường mầm non, bản thân, gia đình, nghề, động vật, Tết, thực vật, giao thông, nước, quê hương) + Đếm 1–5, nhận biết màu.' },
  { category: 'curriculum', id: 'N2', title: 'Chồi (4 tuổi) · 36 tuần + Hình khối', yearLevel: 2, subject: 'lam-quen-toan',
    scenarioIds: ['N2-quiz', 'N2-match', 'N2-w01'], knowledgeQuiz: 'N2-quiz', minStarsToUnlock: 0, prerequisites: ['N1'],
    description: '36 tuần chủ đề (nâng cấp Mầm) + Đếm tới 10, hình tròn/vuông/tam giác, từ vựng phong phú.' },
  { category: 'curriculum', id: 'N3', title: 'Lá (5 tuổi) · 36 tuần + Sẵn sàng vào lớp 1', yearLevel: 3, subject: 'lam-quen-toan',
    scenarioIds: ['N3-quiz', 'N3-match', 'N3-w01'], knowledgeQuiz: 'N3-quiz', minStarsToUnlock: 0, prerequisites: ['N2'],
    description: '36 tuần chủ đề + So sánh nhiều/ít, đếm tới 20, cộng-trừ trong 5, hình khối 3D đơn giản.' },

  // ───────── Lĩnh vực 1 — Phát triển thể chất ─────────
  { category: 'curriculum', id: 'N1-TC', title: 'Mầm · Phát triển thể chất', yearLevel: 1, subject: 'the-chat',
    scenarioIds: ['N1-TC-quiz'], knowledgeQuiz: 'N1-TC-quiz', minStarsToUnlock: 0,
    description: 'Vận động thô (chạy, bật, bò, leo) · vận động tinh (xé/dán, xếp khối) · ăn ngủ vệ sinh đúng giờ · phòng chống tai nạn cơ bản.' },
  { category: 'curriculum', id: 'N2-TC', title: 'Chồi · Phát triển thể chất', yearLevel: 2, subject: 'the-chat',
    scenarioIds: ['N2-TC-quiz'], knowledgeQuiz: 'N2-TC-quiz', minStarsToUnlock: 0, prerequisites: ['N1-TC'],
    description: 'Đi thăng bằng · ném trúng đích · phối hợp tay-mắt · tự phục vụ bản thân · nhận biết nhóm thực phẩm tốt.' },
  { category: 'curriculum', id: 'N3-TC', title: 'Lá · Phát triển thể chất', yearLevel: 3, subject: 'the-chat',
    scenarioIds: ['N3-TC-quiz'], knowledgeQuiz: 'N3-TC-quiz', minStarsToUnlock: 0, prerequisites: ['N2-TC'],
    description: 'Đi/chạy có đổi hướng · nhảy dây · cầm bút đúng cách (chuẩn bị viết) · an toàn giao thông cơ bản.' },

  // ───────── Lĩnh vực 3 — Phát triển ngôn ngữ ─────────
  { category: 'curriculum', id: 'N1-NN', title: 'Mầm · Phát triển ngôn ngữ', yearLevel: 1, subject: 'ngon-ngu',
    scenarioIds: ['N1-NN-quiz'], knowledgeQuiz: 'N1-NN-quiz', minStarsToUnlock: 0,
    description: 'Nghe – nói (đọc thơ, kể chuyện theo tranh) · từ vựng đồ vật và con vật quen thuộc · giao tiếp trong gia đình.' },
  { category: 'curriculum', id: 'N2-NN', title: 'Chồi · Phát triển ngôn ngữ', yearLevel: 2, subject: 'ngon-ngu',
    scenarioIds: ['N2-NN-quiz'], knowledgeQuiz: 'N2-NN-quiz', minStarsToUnlock: 0, prerequisites: ['N1-NN'],
    description: 'Kể chuyện sáng tạo · đặt câu hỏi · đoán nội dung qua tranh · làm quen âm chữ cái tiếng Việt.' },
  { category: 'curriculum', id: 'N3-NN', title: 'Lá · Phát triển ngôn ngữ', yearLevel: 3, subject: 'ngon-ngu',
    scenarioIds: ['N3-NN-quiz'], knowledgeQuiz: 'N3-NN-quiz', minStarsToUnlock: 0, prerequisites: ['N2-NN'],
    description: 'Làm quen 29 chữ cái Tiếng Việt · viết chữ rỗng · đọc thuộc thơ ngắn · kể lại chuyện theo nhân vật.' },

  // ───────── Lĩnh vực 4 — Phát triển tình cảm–xã hội ─────────
  { category: 'curriculum', id: 'N1-TX', title: 'Mầm · Phát triển tình cảm – xã hội', yearLevel: 1, subject: 'tinh-cam-xh',
    scenarioIds: ['N1-TX-quiz'], knowledgeQuiz: 'N1-TX-quiz', minStarsToUnlock: 0,
    description: 'Nhận biết cảm xúc cơ bản · chào hỏi người lớn lễ phép · chơi cùng bạn · biết nói cảm ơn và xin lỗi.' },
  { category: 'curriculum', id: 'N2-TX', title: 'Chồi · Phát triển tình cảm – xã hội', yearLevel: 2, subject: 'tinh-cam-xh',
    scenarioIds: ['N2-TX-quiz'], knowledgeQuiz: 'N2-TX-quiz', minStarsToUnlock: 0, prerequisites: ['N1-TX'],
    description: 'Chia sẻ đồ chơi · hợp tác nhóm nhỏ · thể hiện tình cảm với gia đình · tự kiềm chế cảm xúc khi tức giận.' },
  { category: 'curriculum', id: 'N3-TX', title: 'Lá · Phát triển tình cảm – xã hội', yearLevel: 3, subject: 'tinh-cam-xh',
    scenarioIds: ['N3-TX-quiz'], knowledgeQuiz: 'N3-TX-quiz', minStarsToUnlock: 0, prerequisites: ['N2-TX'],
    description: 'Làm việc theo nhóm · giải quyết xung đột đơn giản bằng lời nói · biết tự hào về văn hoá VN · sẵn sàng đi lớp 1.' },

  // ───────── Lĩnh vực 5 — Phát triển thẩm mỹ ─────────
  { category: 'curriculum', id: 'N1-TM', title: 'Mầm · Phát triển thẩm mỹ', yearLevel: 1, subject: 'tham-my',
    scenarioIds: ['N1-TM-quiz'], knowledgeQuiz: 'N1-TM-quiz', minStarsToUnlock: 0,
    description: 'Hát theo nhạc · nhảy theo nhịp đơn giản · tô màu lớn · nặn đất nặn · nhận biết âm sắc nhạc cụ.' },
  { category: 'curriculum', id: 'N2-TM', title: 'Chồi · Phát triển thẩm mỹ', yearLevel: 2, subject: 'tham-my',
    scenarioIds: ['N2-TM-quiz'], knowledgeQuiz: 'N2-TM-quiz', minStarsToUnlock: 0, prerequisites: ['N1-TM'],
    description: 'Vẽ tự do theo chủ đề · gấp giấy origami đơn giản · hát solo và đồng thanh · phân biệt nhanh-chậm-vui-buồn trong âm nhạc.' },
  { category: 'curriculum', id: 'N3-TM', title: 'Lá · Phát triển thẩm mỹ', yearLevel: 3, subject: 'tham-my',
    scenarioIds: ['N3-TM-quiz'], knowledgeQuiz: 'N3-TM-quiz', minStarsToUnlock: 0, prerequisites: ['N2-TM'],
    description: 'Vẽ – cắt – xé – dán theo ý tưởng riêng · biểu diễn văn nghệ · cảm nhận âm nhạc và tranh dân gian VN (Đông Hồ, Quan họ).' },
];
