// ============================================================
// Trường THPT — Module list (GDPT 2018)
// ============================================================
// yearLevel = thứ tự lớp trong cấp (1→Lớp 10 … 3→Lớp 12), khớp DOMAIN.yearLabels.
// Lớp 10: định hướng phân ban · Lớp 11: chuyên sâu · Lớp 12: ôn thi tốt nghiệp.
//
// ID prefix KHỚP scenarios `public/js/scenarios/lop10/<môn>.js` (H10TOAN/H10NV/
// H10TA/H10LY/H10HOA…) để getScenariosForModule prefix-match đúng. Trước đây
// dùng prefix `H-T10` không khớp `H10TOAN-w01-quiz` → mọi module rỗng / stub.
//
// knowledgeQuiz trỏ tuần 1: `${id}-w01-quiz`.
// ============================================================

const M = (id, title, yl, subject, stars, prereq, description) => ({
  category: 'curriculum', id, title, yearLevel: yl, subject,
  scenarioIds: [`${id}-w01-quiz`], knowledgeQuiz: `${id}-w01-quiz`,
  minStarsToUnlock: stars, ...(prereq ? { prerequisites: [prereq] } : {}), description,
});

/** @type {import('../../engine/types.js').CourseModule[]} */
export const MODULES = [
  // ───────── Toán ─────────
  M('H10TOAN', 'Toán 10', 1, 'toan', 0, null,
    'Mệnh đề – tập hợp · bất phương trình & hệ bậc nhất 2 ẩn · hàm số bậc 2 · hệ thức lượng trong tam giác · vectơ · thống kê & xác suất.'),
  M('H11TOAN', 'Toán 11', 2, 'toan', 3, 'H10TOAN',
    'Hàm số lượng giác · dãy số – cấp số · giới hạn · đạo hàm · quan hệ song song & vuông góc trong không gian · xác suất có điều kiện.'),
  M('H12TOAN', 'Toán 12', 3, 'toan', 6, 'H11TOAN',
    'Khảo sát & vẽ đồ thị · luỹ thừa – mũ – logarit · nguyên hàm – tích phân · số phức · phương pháp toạ độ trong không gian · ÔN THI TỐT NGHIỆP THPT.'),

  // ───────── Ngữ văn ─────────
  M('H10NV', 'Ngữ văn 10', 1, 'ngu-van', 0, null,
    'Thần thoại & sử thi · thơ Đường luật · chèo/tuồng · văn nghị luận · từ Hán Việt, biện pháp tu từ. Truyện Kiều, Nguyễn Trãi.'),
  M('H11NV', 'Ngữ văn 11', 2, 'ngu-van', 3, 'H10NV',
    'Truyện ngắn hiện đại (Hai đứa trẻ, Chí Phèo, Chữ người tử tù) · thơ mới (Vội vàng, Tràng giang, Đây thôn Vĩ Dạ) · tuỳ bút – tản văn · nghị luận XH/VH.'),
  M('H12NV', 'Ngữ văn 12', 3, 'ngu-van', 6, 'H11NV',
    'Tây Tiến, Việt Bắc, Đất Nước, Sóng · Vợ chồng A Phủ, Vợ nhặt, Rừng xà nu, Chiếc thuyền ngoài xa · nghị luận luyện đề · ÔN THI TỐT NGHIỆP THPT.'),

  // ───────── Tiếng Anh ─────────
  M('H10TA', 'Tiếng Anh 10', 1, 'tieng-anh', 0, null,
    'Global Success: Family Life, Humans & Environment, Music, Community, Inventions, Gender Equality, ASEAN. Tenses, passive, conditional 1-3, modals.'),
  M('H11TA', 'Tiếng Anh 11', 2, 'tieng-anh', 3, 'H10TA',
    'Generation Gap, Caring for Those in Need, ASEAN, Global Warming, Cities of the Future. Inversion, cleft sentences, reduced relative clauses.'),
  M('H12TA', 'Tiếng Anh 12', 3, 'tieng-anh', 6, 'H11TA',
    'Life Stories, Urbanisation, AI, Career, Lifelong Learning. Reported speech full, conditionals mixed, phrasal verbs. ÔN THI TỐT NGHIỆP THPT.'),

  // ───────── Vật lý (ban KHTN) ─────────
  M('H10LY', 'Vật lí 10', 1, 'vat-li', 0, null,
    'Động học (vận tốc, gia tốc, rơi tự do, ném ngang/xiên) · 3 định luật Newton · công – năng lượng · va chạm · chất khí · nội năng.'),
  M('H11LY', 'Vật lí 11', 2, 'vat-li', 3, 'H10LY',
    'Dao động cơ điều hoà · sóng cơ/âm/điện từ · điện trường – điện thế · dòng điện không đổi · cảm ứng điện từ.'),
  M('H12LY', 'Vật lí 12', 3, 'vat-li', 6, 'H11LY',
    'Dao động & giao thoa · dòng điện xoay chiều (RLC, máy biến áp) · sóng ánh sáng · lượng tử · hạt nhân nguyên tử · ÔN THI TỐT NGHIỆP.'),

  // ───────── Hoá học (ban KHTN) ─────────
  M('H10HOA', 'Hoá học 10', 1, 'hoa-hoc', 0, null,
    'Cấu tạo nguyên tử (orbital s/p/d/f) · bảng tuần hoàn · liên kết (ion, cộng hoá trị, hydro) · oxi hoá – khử · năng lượng & tốc độ phản ứng · halogen.'),
  M('H11HOA', 'Hoá học 11', 2, 'hoa-hoc', 3, 'H10HOA',
    'Cân bằng hoá học · pH – chỉ thị · nitơ – photpho · cacbon – silic · đại cương hoá hữu cơ · hidrocarbon · ancol – phenol – andehit – axit.'),
  M('H12HOA', 'Hoá học 12', 3, 'hoa-hoc', 6, 'H11HOA',
    'Ester – lipid · carbohydrate · amine – amino acid – protein · polymer · đại cương kim loại · ÔN THI TỐT NGHIỆP THPT.'),

  // ───────── Sinh học (ban KHTN) ─────────
  M('H10SINH', 'Sinh học 10', 1, 'sinh-hoc', 0, null,
    'Thành phần hoá học của tế bào · cấu trúc tế bào · trao đổi chất qua màng · phân bào (nguyên phân – giảm phân) · công nghệ vi sinh vật.'),
  M('H11SINH', 'Sinh học 11', 2, 'sinh-hoc', 3, 'H10SINH',
    'Trao đổi chất ở sinh vật · cảm ứng · sinh trưởng – phát triển · sinh sản TV/ĐV.'),
  M('H12SINH', 'Sinh học 12', 3, 'sinh-hoc', 6, 'H11SINH',
    'ADN – gen – NST · quy luật di truyền · tiến hoá · sinh thái học · ÔN THI THPT.'),

  // ───────── Lịch sử (ban KHXH) ─────────
  M('H10SU', 'Lịch sử 10', 1, 'lich-su', 0, null,
    'Sử học là gì · văn minh thế giới cổ-trung đại (Hy Lạp, La Mã, Trung Quốc, Ấn Độ) · ĐNA trước CN · VN cổ đại (Văn Lang-Âu Lạc) → Tây Sơn.'),
  M('H11SU', 'Lịch sử 11', 2, 'lich-su', 3, 'H10SU',
    'Cách mạng tư sản & CNTB · CNXH từ 1917 · giành độc lập của ĐNA · cải cách & bảo vệ Tổ quốc.'),
  M('H12SU', 'Lịch sử 12', 3, 'lich-su', 6, 'H11SU',
    'Trật tự thế giới sau 1945 · ASEAN · CMVN 1930-1975 · Đổi mới · hội nhập quốc tế · ÔN THI THPT.'),

  // ───────── Địa lí (ban KHXH) ─────────
  M('H10DIA', 'Địa lí 10', 1, 'dia-li', 0, null,
    'Trái Đất trong vũ trụ · các vành đai khí hậu · dân cư – xã hội · nông nghiệp – công nghiệp – dịch vụ · môi trường – tài nguyên.'),
  M('H11DIA', 'Địa lí 11', 2, 'dia-li', 3, 'H10DIA',
    'Toàn cầu hoá & khu vực hoá · địa lí các quốc gia tiêu biểu (Hoa Kỳ, TQ, Nhật Bản, EU, ASEAN).'),
  M('H12DIA', 'Địa lí 12', 3, 'dia-li', 6, 'H11DIA',
    'Địa lí tự nhiên & dân cư VN · các ngành & vùng kinh tế · biển đảo · ÔN THI TỐT NGHIỆP THPT.'),

  // ───────── GD Kinh tế & Pháp luật (ban KHXH) ─────────
  M('H10GDCD', 'GD Kinh tế & Pháp luật 10', 1, 'gdcd', 0, null,
    'Nền kinh tế & các chủ thể · thị trường – giá cả · ngân sách – thuế · hệ thống chính trị & pháp luật nước CHXHCN Việt Nam.'),
  M('H11GDCD', 'GD Kinh tế & Pháp luật 11', 2, 'gdcd', 3, 'H10GDCD',
    'Cạnh tranh – cung cầu · lạm phát – thất nghiệp · đạo đức kinh doanh · quyền bình đẳng.'),
  M('H12GDCD', 'GD Kinh tế & Pháp luật 12', 3, 'gdcd', 6, 'H11GDCD',
    'Tăng trưởng & phát triển · hội nhập kinh tế · pháp luật lao động, kinh doanh & quyền con người.'),

  // ───────── Tin học ─────────
  M('H10TIN', 'Tin học 10', 1, 'tin-hoc', 0, null,
    'Máy tính & xã hội tri thức · biểu diễn thông tin · mạng & Internet an toàn · lập trình Python (ICT/KHMT) · thuật toán cơ bản.'),
  M('H11TIN', 'Tin học 11', 2, 'tin-hoc', 3, 'H10TIN',
    'CSDL & hệ quản trị · kỹ thuật lập trình · thiết kế web (ICT) hoặc CTDL & thuật toán (KHMT).'),
  M('H12TIN', 'Tin học 12', 3, 'tin-hoc', 6, 'H11TIN',
    'AI & khoa học dữ liệu nhập môn · dự án phần mềm · an toàn – đạo đức số · định hướng nghề CNTT.'),

  // ───────── Công nghệ (định hướng) ─────────
  M('H10CN', 'Công nghệ 10', 1, 'cong-nghe', 0, null,
    'Định hướng Trồng trọt hoặc Cơ khí · thiết kế kỹ thuật cơ bản · vẽ kỹ thuật.'),
  M('H11CN', 'Công nghệ 11', 2, 'cong-nghe', 3, 'H10CN',
    'Trồng trọt (chế biến, bảo quản nông sản) hoặc Cơ khí chế tạo (vẽ kỹ thuật nâng cao, gia công).'),
  M('H12CN', 'Công nghệ 12', 3, 'cong-nghe', 6, 'H11CN',
    'Lâm nghiệp – Thuỷ sản hoặc Điện – Điện tử (mạch, cảm biến) · dự án ứng dụng.'),

  // ───────── GD Quốc phòng - An ninh (bắt buộc theo GDPT 2018 — TT 32/2018) ─────────
  M('H10GDQP', 'GD Quốc phòng - An ninh 10', 1, 'gdqp', 0, null,
    'Lịch sử QĐND VN · truyền thống các quân chủng-binh chủng · kỹ thuật chiến thuật cơ bản (đội ngũ, bắn AK) · an ninh quốc gia.'),
  M('H11GDQP', 'GD Quốc phòng - An ninh 11', 2, 'gdqp', 3, 'H10GDQP',
    'Bảo vệ chủ quyền lãnh thổ – biên giới quốc gia · phòng chống tội phạm sử dụng công nghệ cao · điều lệnh đội ngũ.'),
  M('H12GDQP', 'GD Quốc phòng - An ninh 12', 3, 'gdqp', 6, 'H11GDQP',
    'Truyền thống bảo vệ Tổ quốc · an ninh phi truyền thống (mạng, môi trường) · kỹ thuật chiến đấu bộ binh.'),

  // ───────── GD Địa phương (bắt buộc theo GDPT 2018) ─────────
  M('H10GDDP', 'GD Địa phương 10', 1, 'gd-dia-phuong', 0, null,
    'Lịch sử–văn hoá–địa lí địa phương lớp 10: danh lam · di sản · danh nhân · lễ hội · phát triển kinh tế–xã hội của địa phương.'),
  M('H11GDDP', 'GD Địa phương 11', 2, 'gd-dia-phuong', 3, 'H10GDDP',
    'Lịch sử–văn hoá–địa lí địa phương lớp 11: tiếp nối nghiên cứu và thực hành về di sản và phát triển bền vững của địa phương.'),
  M('H12GDDP', 'GD Địa phương 12', 3, 'gd-dia-phuong', 6, 'H11GDDP',
    'Lịch sử–văn hoá–địa lí địa phương lớp 12: tổng hợp, dự án và định hướng đóng góp cho sự phát triển địa phương.'),

  // ───────── HĐ Trải nghiệm – Hướng nghiệp (bắt buộc) ─────────
  M('H10HDTN', 'HĐ Trải nghiệm 10', 1, 'htn', 0, null,
    'Khám phá bản thân · định hướng nghề · trải nghiệm xã hội · trách nhiệm công dân.'),
  M('H11HDTN', 'HĐ Trải nghiệm 11', 2, 'htn', 3, 'H10HDTN',
    'Phát triển bản thân · trải nghiệm nghề · định hướng chọn ngành ĐH.'),
  M('H12HDTN', 'HĐ Trải nghiệm 12', 3, 'htn', 6, 'H11HDTN',
    'Định hướng tương lai · chuẩn bị thi tốt nghiệp & vào ĐH · trải nghiệm cộng đồng.'),
];
