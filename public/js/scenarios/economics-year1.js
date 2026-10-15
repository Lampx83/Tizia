// ============================================================
// Trường Kinh tế — Scenarios Năm 1 (E1.1 + E1.2)
// ============================================================
// Soạn theo chương trình cử nhân Kinh tế VN (NEU, FTU, UEH).
// Mỗi câu có explanation để học sinh hiểu rõ sau khi trả lời.
// ============================================================

// ─── E1.1 · Kinh tế Vi mô 1 ─────────────────────────────────
export const E11_QUIZ = {
  id: 'E1.1-micro-quiz',
  title: 'E1.1 · Kinh tế Vi mô 1 — Cung, cầu & thị trường',
  kind: 'quiz',
  yearLevel: 1, subject: 'kinh-te-vi-mo-1', difficulty: 1,
  skillsTrained: ['cung-cau', 'can-bang-thi-truong', 'co-gian-gia', 'thang-du-tieu-dung'],
  questions: [
    {
      stem: 'Quy luật cầu phát biểu rằng, khi giá hàng hoá tăng (các yếu tố khác không đổi), lượng cầu sẽ:',
      choices: ['Tăng', 'Giảm', 'Không thay đổi', 'Tăng rồi giảm'],
      answer: 1,
      explanation: 'Quy luật cầu (Law of Demand): giá và lượng cầu có quan hệ nghịch chiều — giá tăng → lượng cầu giảm, giá giảm → lượng cầu tăng. Đây là lý do đường cầu dốc xuống từ trái sang phải.',
    },
    {
      stem: 'Yếu tố NÀO sau đây làm dịch chuyển đường cầu sang PHẢI (tăng cầu)?',
      choices: ['Giá hàng hoá tăng', 'Thu nhập người tiêu dùng tăng (hàng bình thường)', 'Giá hàng hoá thay thế giảm', 'Số lượng người mua giảm'],
      answer: 1,
      explanation: 'Đường cầu dịch chuyển khi các yếu tố NGOÀI GIÁ thay đổi: thu nhập, sở thích, giá hàng liên quan, kỳ vọng, số người mua. Khi thu nhập tăng, người tiêu dùng mua nhiều hơn ở mọi mức giá → đường cầu dịch phải. Giá hàng hoá tăng chỉ làm di chuyển DỌC trên đường cầu, không dịch chuyển đường cầu.',
    },
    {
      stem: 'Cân bằng thị trường (market equilibrium) xảy ra khi:',
      choices: ['Giá bằng 0', 'Lượng cầu bằng lượng cung', 'Lượng cung lớn hơn lượng cầu', 'Chính phủ can thiệp vào giá'],
      answer: 1,
      explanation: 'Cân bằng thị trường: điểm P* và Q* tại đó Qd = Qs (lượng cầu = lượng cung). Tại đây không có thiếu hụt (shortage) hay dư thừa (surplus). Cơ chế giá tự động dẫn thị trường về cân bằng.',
    },
    {
      stem: 'Thặng dư tiêu dùng (Consumer Surplus) là:',
      choices: ['Tổng chi tiêu của người tiêu dùng', 'Phần chênh lệch giữa giá sẵn sàng trả và giá thị trường thực tế', 'Lợi nhuận của nhà sản xuất', 'Phần thuế mà người tiêu dùng phải nộp'],
      answer: 1,
      explanation: 'Thặng dư tiêu dùng = Giá sẵn sàng trả (WTP) − Giá thực tế thanh toán. Đây là "lợi ích ròng" mà người mua nhận được. Trên đồ thị, CS là tam giác phía TRÊN đường giá thực và DƯỚI đường cầu.',
    },
    {
      stem: 'Độ co giãn của cầu theo giá (PED) bằng −2 có nghĩa là:',
      choices: ['Khi giá tăng 1%, lượng cầu tăng 2%', 'Khi giá tăng 1%, lượng cầu giảm 2%', 'Khi giá tăng 2%, lượng cầu giảm 1%', 'Cầu hoàn toàn không co giãn'],
      answer: 1,
      explanation: 'PED = %ΔQd / %ΔP. PED = −2 ⇒ giá tăng 1% → lượng cầu giảm 2%. Khi |PED| > 1: cầu co giãn nhiều (elastic). Với hàng xa xỉ và hàng có nhiều thay thế, PED thường lớn hơn 1 về giá trị tuyệt đối.',
    },
    {
      stem: 'Ngoại tác âm (negative externality) như ô nhiễm môi trường gây ra:',
      choices: ['Sản lượng thị trường thấp hơn mức tối ưu xã hội', 'Sản lượng thị trường cao hơn mức tối ưu xã hội', 'Thị trường tự cân bằng hiệu quả', 'Giá thị trường bằng chi phí xã hội biên'],
      answer: 1,
      explanation: 'Ngoại tác âm: chi phí tư nhân (MPC) thấp hơn chi phí xã hội biên (MSC). Doanh nghiệp không tính chi phí ô nhiễm → sản xuất NHIỀU hơn mức tối ưu xã hội (Q_market > Q_optimal). Giải pháp: thuế Pigou, quy định giới hạn phát thải, giấy phép khí thải có thể chuyển nhượng.',
    },
    {
      stem: 'Hàng hóa công cộng (public goods) có đặc điểm:',
      choices: ['Cạnh tranh trong tiêu dùng và có thể loại trừ', 'Không cạnh tranh và không thể loại trừ', 'Cạnh tranh nhưng không thể loại trừ', 'Không cạnh tranh nhưng có thể loại trừ'],
      answer: 1,
      explanation: 'Hàng hóa công cộng thuần tuý: (1) Không cạnh tranh (non-rival) — việc A dùng không làm giảm của B; (2) Không loại trừ (non-excludable) — không thể ngăn ai dùng. Ví dụ: quốc phòng, đèn hải đăng. Dẫn đến "người đi nhờ" (free-rider), thị trường tư cung cấp thiếu → nhà nước phải can thiệp.',
    },
    {
      stem: 'Chi phí cơ hội (opportunity cost) của việc đi học đại học bao gồm:',
      choices: ['Chỉ học phí', 'Chỉ tiền lương bị bỏ qua khi không đi làm', 'Học phí + sinh hoạt phí + thu nhập bị bỏ qua', 'Không có chi phí vì học là đầu tư'],
      answer: 2,
      explanation: 'Chi phí cơ hội = giá trị của lựa chọn tốt nhất bị từ bỏ. Đi học đại học: (1) Chi phí hiện (học phí, sách, ký túc); (2) Chi phí ẩn (implicit cost) = thu nhập bị từ bỏ khi không đi làm. Khái niệm cốt lõi: "Không có bữa ăn nào miễn phí" (TANSTAAFL).',
    },
    {
      stem: 'Khi chính phủ đặt mức giá trần (price ceiling) thấp hơn giá cân bằng, kết quả là:',
      choices: ['Dư thừa (surplus) hàng hoá', 'Thiếu hụt (shortage) hàng hoá', 'Thị trường vẫn cân bằng', 'Cung tăng lên bù đắp cầu'],
      answer: 1,
      explanation: 'Giá trần thấp hơn P*: Qd > P*, Qs < P* → lượng cầu lớn hơn lượng cung → THIẾU HỤT. Ví dụ: kiểm soát giá thuê nhà ở TP.HCM. Giá sàn (price floor) cao hơn P* thì ngược lại: dư thừa (vd: lương tối thiểu tạo thất nghiệp).',
    },
    {
      stem: 'Theo mô hình cung-cầu, khi thu nhập người tiêu dùng tăng đồng thời chi phí sản xuất giảm, điều nào CHẮC CHẮN xảy ra với giá cân bằng?',
      choices: ['Giá tăng', 'Giá giảm', 'Lượng cân bằng tăng', 'Lượng cân bằng giảm'],
      answer: 2,
      explanation: 'Thu nhập tăng → đường Cầu dịch PHẢI (D↑). Chi phí SX giảm → đường Cung dịch PHẢI (S↑). Hai dịch chuyển cùng làm tăng lượng (Q*↑). Còn giá P*: D↑ đẩy P lên, S↑ đẩy P xuống — không rõ ai thắng → giá KHÔNG CHẮC CHẮN. Lượng cân bằng tăng là điều chắc chắn.',
    },
  ],
};

// ─── E1.2 · Toán cho kinh tế ────────────────────────────────
export const E12_QUIZ = {
  id: 'E1.2-math-econ-quiz',
  title: 'E1.2 · Toán cho kinh tế — Ma trận, đạo hàm & tối ưu',
  kind: 'quiz',
  yearLevel: 1, subject: 'toan-kinh-te', difficulty: 2,
  skillsTrained: ['ma-tran', 'dao-ham', 'toi-uu-hoa', 'tich-phan', 'ham-kinh-te'],
  questions: [
    {
      stem: 'Cho ma trận A = [[1,2],[3,4]]. Định thức det(A) = ?',
      choices: ['−2', '2', '10', '−10'],
      answer: 0,
      explanation: 'det([[a,b],[c,d]]) = ad − bc = 1×4 − 2×3 = 4 − 6 = −2. Định thức quan trọng trong kinh tế lượng (kiểm tra rank ma trận, điều kiện tối ưu bậc hai).',
    },
    {
      stem: 'Hàm cầu Q = 100 − 2P. Doanh thu biên (MR) khi Q = 20 là:',
      choices: ['60', '40', '30', '20'],
      answer: 2,
      explanation: 'Từ Q = 100 − 2P → P = 50 − Q/2. Tổng doanh thu TR = P·Q = 50Q − Q²/2. Doanh thu biên MR = dTR/dQ = 50 − Q. Khi Q = 20: MR = 50 − 20 = 30. Lưu ý: MR < P (=40) phản ánh quy luật doanh nghiệp độc quyền phải giảm giá để bán thêm → MR luôn thấp hơn đường cầu.',
    },
    {
      stem: 'Hàm sản xuất Q = 5K^0,5 · L^0,5. Sản phẩm biên của lao động (MP_L) là:',
      choices: ['2,5K^0,5 · L^(−0,5)', '5K^0,5 · L^0,5', '2,5K^(−0,5) · L^0,5', '5K · L'],
      answer: 0,
      explanation: 'MP_L = ∂Q/∂L = 5K^0,5 · 0,5·L^(0,5−1) = 2,5K^0,5 · L^(−0,5). Đây là đạo hàm riêng theo L. MP_L giảm dần theo L (quy luật năng suất biên giảm dần), phản ánh khi thêm lao động trong khi giữ nguyên vốn K.',
    },
    {
      stem: 'Điều kiện tối đa hoá lợi nhuận là:',
      choices: ['Doanh thu cận biên (MR) bằng không', 'Chi phí cận biên (MC) bằng không', 'MR = MC', 'TR = TC'],
      answer: 2,
      explanation: 'Lợi nhuận π = TR − TC. Cực đại khi dπ/dQ = 0 ⇒ MR − MC = 0 ⇒ MR = MC. Điều kiện đủ: d²π/dQ² < 0 ⇔ dMR/dQ < dMC/dQ (đường MC cắt MR từ dưới lên). Đây là quy tắc vàng của kinh tế vi mô.',
    },
    {
      stem: 'Tích phân ∫(3x² + 2x) dx = ?',
      choices: ['x³ + x² + C', '6x + 2 + C', '3x³ + 2x² + C', 'x³ + x² − C'],
      answer: 0,
      explanation: '∫3x²dx = x³, ∫2xdx = x². Tổng hợp: x³ + x² + C (C là hằng số tích phân). Tích phân dùng trong kinh tế để tính thặng dư tiêu dùng/sản xuất (diện tích dưới đường cầu/cung), tổng chi phí từ chi phí biên.',
    },
    {
      stem: 'Cho hàm chi phí TC(Q) = Q³ − 6Q² + 15Q + 10. Chi phí biên MC(Q) = ?',
      choices: ['3Q² − 12Q + 15', 'Q² − 6Q + 15', '3Q² − 12Q + 10', '3Q² − 6Q + 15'],
      answer: 0,
      explanation: 'MC = dTC/dQ = 3Q² − 12Q + 15. Đạo hàm của Q³ là 3Q², của 6Q² là 12Q, của 15Q là 15, hằng số 10 mất đi. Chi phí biên cho biết chi phí tăng thêm khi sản xuất thêm 1 đơn vị — then chốt trong quyết định sản lượng.',
    },
    {
      stem: 'Hệ phương trình: 2x + 3y = 7 và x − y = 1. Nghiệm (x, y) = ?',
      choices: ['(2, 1)', '(3, 1)', '(1, 2)', '(2, 3)'],
      answer: 0,
      explanation: 'Từ phương trình 2: x = y + 1. Thay vào phương trình 1: 2(y+1) + 3y = 7 ⇒ 5y + 2 = 7 ⇒ y = 1 ⇒ x = 2. Kiểm tra: 2·2 + 3·1 = 7 ✓ và 2 − 1 = 1 ✓. Trong kinh tế, hệ PT tuyến tính xuất hiện khi cân bằng đa thị trường (mô hình Walrasian).',
    },
    {
      stem: 'Đạo hàm của hàm hợp h(x) = (2x + 1)⁴ là:',
      choices: ['4(2x+1)³', '8(2x+1)³', '4(2x+1)³ · 2', '(2x+1)⁴ · 2'],
      answer: 1,
      explanation: 'Quy tắc chuỗi (Chain Rule): h\'(x) = 4(2x+1)³ · (2x+1)\' = 4(2x+1)³ · 2 = 8(2x+1)³. Quy tắc chuỗi thiết yếu khi làm việc với hàm tổng hợp trong kinh tế (ví dụ: tổng chi phí theo đầu vào, hàm lợi ích tổng hợp).',
    },
    {
      stem: 'Hàm lợi nhuận π(Q) = −2Q² + 40Q − 100. Sản lượng tối đa lợi nhuận là:',
      choices: ['Q = 5', 'Q = 10', 'Q = 15', 'Q = 20'],
      answer: 1,
      explanation: 'Tối đa lợi nhuận: dπ/dQ = −4Q + 40 = 0 ⇒ Q = 10. Kiểm tra cực đại: d²π/dQ² = −4 < 0 → đúng là cực đại. Lợi nhuận tối đa: π(10) = −2·100 + 400 − 100 = 100. Đây là bài toán tối ưu một biến cơ bản nhất trong kinh tế vi mô.',
    },
    {
      stem: 'Ma trận A (2×3) nhân với ma trận B. Để phép nhân A·B hợp lệ, B phải có kích thước:',
      choices: ['2×3', '3×2', '2×2', '3×3'],
      answer: 1,
      explanation: 'Quy tắc nhân ma trận: A(m×n) · B(n×p) = C(m×p). A là 2×3 (n=3) nên B phải có n=3 hàng, tức B là 3×p. Trong các đáp án, B là 3×2 hợp lệ, cho kết quả C(2×2). Phép nhân ma trận quan trọng trong kinh tế lượng (hệ phương trình hồi quy, mô hình IO Leontief).',
    },
  ],
};

// Aggregate export
export const ECONOMICS_YEAR1_SCENARIOS = {
  [E11_QUIZ.id]: E11_QUIZ,
  [E12_QUIZ.id]: E12_QUIZ,
};
