// ============================================================
// Trường Mầm non — Module list (Mầm/Chồi/Lá) theo TT 51/2020
// ============================================================
// 5 LĨNH VỰC PHÁT TRIỂN × 3 độ tuổi = 15 module track.
// Lĩnh vực 2 (Nhận thức / N1-N3) GIỮ NGUYÊN — đã có scenarios đầy đủ.
// Lĩnh vực 1,3,4,5 (TC/NN/TX/TM) — quiz content bổ sung phiên 11 (2026-07-08).
// ============================================================

// Module lĩnh vực (thể chất / ngôn ngữ / TC-XH / thẩm mỹ). Content thật ở
// scenarios/preschool-fields.js với id `${id}-quiz` + `${id}-wNN`. LƯU Ý id
// KHÔNG có gạch giữa cấp và lĩnh vực (N1TC chứ không N1-TC): nếu để 'N1-TC'
// thì prefix `N1-` của module Nhận thức sẽ hút nhầm mọi scenario lĩnh vực
// (getScenariosForModule/getContentForModule đều match theo `id LIKE 'N1-%'`).
const _field = (id, title, yl, subject, prereq, description, weeks) => ({
  category: 'curriculum', id, title, yearLevel: yl, subject,
  scenarioIds: [
    `${id}-quiz`,
    ...Array.from({ length: weeks }, (_, i) => `${id}-w${String(i + 1).padStart(2, '0')}`),
  ],
  knowledgeQuiz: `${id}-quiz`,
  minStarsToUnlock: 0, ...(prereq ? { prerequisites: [prereq] } : {}),
  description, status: 'available',
});

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
  _field('N1TC', 'Mầm · Phát triển thể chất', 1, 'the-chat', null,
    'Vận động thô (chạy, bật, bò, leo) · vận động tinh (cầm thìa, xâu hạt) · ăn ngủ vệ sinh đúng giờ · phòng chống tai nạn cơ bản.', 4),
  _field('N2TC', 'Chồi · Phát triển thể chất', 2, 'the-chat', 'N1TC',
    'Đi thăng bằng · ném trúng đích · phối hợp tay-mắt · tự phục vụ bản thân · nhận biết nhóm thực phẩm tốt.', 4),
  _field('N3TC', 'Lá · Phát triển thể chất', 3, 'the-chat', 'N2TC',
    'Vận động phối hợp · nhảy lò cò/nhảy dây · cầm bút đúng cách (chuẩn bị viết) · an toàn giao thông cơ bản.', 4),

  // ───────── Lĩnh vực 3 — Phát triển ngôn ngữ ─────────
  _field('N1NN', 'Mầm · Phát triển ngôn ngữ', 1, 'ngon-ngu', null,
    'Nghe – nói (chào hỏi, gọi tên đồ vật) · nghe kể chuyện theo tranh · tiếng kêu con vật · giao tiếp lễ phép.', 3),
  _field('N2NN', 'Chồi · Phát triển ngôn ngữ', 2, 'ngon-ngu', 'N1NN',
    'Kể chuyện theo tranh · đặt câu hỏi · làm quen âm chữ cái đầu từ.', 3),
  _field('N3NN', 'Lá · Phát triển ngôn ngữ', 3, 'ngon-ngu', 'N2NN',
    'Làm quen 29 chữ cái Tiếng Việt · ghép vần đơn giản · đọc thuộc thơ · kể lại chuyện theo nhân vật.', 4),

  // ───────── Lĩnh vực 4 — Phát triển TC-XH ─────────
  _field('N1TX', 'Mầm · Phát triển tình cảm – xã hội', 1, 'tinh-cam-xh', null,
    'Nhận biết cảm xúc cơ bản · chào hỏi người lớn · chơi cùng bạn · cảm ơn – xin lỗi.', 3),
  _field('N2TX', 'Chồi · Phát triển tình cảm – xã hội', 2, 'tinh-cam-xh', 'N1TX',
    'Chia sẻ đồ chơi · hợp tác nhóm nhỏ · thể hiện tình cảm với gia đình · tự kiềm chế khi giận.', 3),
  _field('N3TX', 'Lá · Phát triển tình cảm – xã hội', 3, 'tinh-cam-xh', 'N2TX',
    'Làm việc theo nhóm · giải quyết xung đột đơn giản · biết tự hào về văn hoá VN · sẵn sàng đi lớp 1.', 3),

  // ───────── Lĩnh vực 5 — Phát triển thẩm mỹ ─────────
  _field('N1TM', 'Mầm · Phát triển thẩm mỹ', 1, 'tham-my', null,
    'Hát theo nhạc · nhảy theo nhịp đơn giản · tô màu · làm quen tạo hình (xé/dán, nặn).', 3),
  _field('N2TM', 'Chồi · Phát triển thẩm mỹ', 2, 'tham-my', 'N1TM',
    'Vẽ tự do theo chủ đề · pha màu cơ bản · nhận biết nhạc cụ · phân biệt nhanh-chậm.', 3),
  _field('N3TM', 'Lá · Phát triển thẩm mỹ', 3, 'tham-my', 'N2TM',
    'Vẽ – cắt – xé – dán theo ý tưởng riêng · biểu diễn văn nghệ tự tin · cảm nhận dân ca Việt Nam.', 3),
];
