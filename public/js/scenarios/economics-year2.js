// ============================================================
// Trường Kinh tế — Scenarios Năm 2 (E2.1–E2.5)
// ============================================================
// Soạn theo chương trình cử nhân Kinh tế VN (NEU, FTU, UEH).
// Mỗi câu có explanation để học sinh hiểu rõ sau khi trả lời.
// ============================================================

// ─── E2.1 · Kinh tế Vĩ mô 1 ─────────────────────────────────
export const E21_QUIZ = {
  id: 'E2.1-macro-quiz',
  title: 'E2.1 · Kinh tế Vĩ mô 1 — GDP, AD-AS & Chính sách',
  kind: 'quiz',
  yearLevel: 2, subject: 'kinh-te-vi-mo-3', difficulty: 2,
  skillsTrained: ['gdp', 'tong-cau-tong-cung', 'chinh-sach-tai-khoa', 'chinh-sach-tien-te', 'lam-phat'],
  questions: [
    {
      stem: 'Công thức tính GDP theo phương pháp chi tiêu (expenditure approach) là:',
      choices: ['GDP = C + I + G + NX', 'GDP = C + I + G − NX', 'GDP = C + S + T', 'GDP = W + R + i + π'],
      answer: 0,
      explanation: 'GDP = C (tiêu dùng hộ gia đình) + I (đầu tư tư nhân) + G (chi tiêu chính phủ) + NX (xuất khẩu ròng = X − M). NX dương khi xuất siêu, âm khi nhập siêu. Đây là cách đo phổ biến nhất trong phân tích kinh tế vĩ mô.',
    },
    {
      stem: 'Yếu tố NÀO sau đây làm đường tổng cầu (AD) dịch chuyển sang PHẢI?',
      choices: ['Giá cả chung tăng', 'Chính phủ tăng chi tiêu công', 'Ngân hàng trung ương tăng lãi suất', 'Người tiêu dùng kỳ vọng thu nhập giảm'],
      answer: 1,
      explanation: 'Đường AD dịch phải khi chi tiêu tổng hợp tăng tại mọi mức giá: (1) Chính phủ tăng G; (2) Thuế giảm → C tăng; (3) Lãi suất giảm → I tăng; (4) Kỳ vọng lạc quan; (5) Tỷ giá giảm → xuất khẩu tăng. Giá cả tăng chỉ làm di chuyển DỌC trên đường AD, không dịch chuyển đường AD.',
    },
    {
      stem: 'Số nhân (multiplier) tài khoá trong mô hình đơn giản bằng:',
      choices: ['1 / (1 − MPC)', '1 / MPC', 'MPC / (1 − MPC)', '1 / MPS + 1'],
      answer: 0,
      explanation: 'Số nhân = 1/(1−MPC) = 1/MPS, trong đó MPC là xu hướng tiêu dùng biên (Marginal Propensity to Consume) và MPS = 1−MPC là xu hướng tiết kiệm biên. Nếu MPC = 0,8 → Số nhân = 1/0,2 = 5: cứ 1 đơn vị tăng G thì GDP tăng 5 đơn vị nhờ vòng chi tiêu lan tỏa.',
    },
    {
      stem: 'Lạm phát do cầu kéo (demand-pull inflation) xảy ra khi:',
      choices: ['Chi phí sản xuất tăng (nguyên liệu, lương)', 'Tổng cầu tăng quá nhanh vượt năng lực sản xuất', 'Nhà nước in tiền thanh toán nợ công', 'Kỳ vọng lạm phát tăng trong dân chúng'],
      answer: 1,
      explanation: 'Lạm phát cầu kéo (demand-pull): AD tăng mạnh (kinh tế quá nóng) → áp lực giá tăng. Lạm phát chi phí đẩy (cost-push): AS giảm do nguyên liệu đắt, lương tăng → đình lạm (stagflation). Lạm phát tiền tệ: cung tiền tăng quá mức (MV=PQ). Phân biệt loại lạm phát quan trọng để chọn chính sách đúng.',
    },
    {
      stem: 'Đường Phillips ngắn hạn (Short-run Phillips Curve) mô tả mối quan hệ:',
      choices: ['Thuận chiều giữa lạm phát và thất nghiệp', 'Nghịch chiều giữa lạm phát và thất nghiệp', 'Không có mối liên hệ giữa lạm phát và thất nghiệp', 'Thuận chiều giữa GDP và thất nghiệp'],
      answer: 1,
      explanation: 'Đường Phillips ngắn hạn: khi thất nghiệp thấp → nền kinh tế nóng → lạm phát cao, và ngược lại — quan hệ NGHỊCH CHIỀU. Nhưng dài hạn: đường Phillips thẳng đứng tại tỷ lệ thất nghiệp tự nhiên (NAIRU) — không có đánh đổi dài hạn giữa lạm phát và thất nghiệp. Stagflation thập niên 1970 làm lung lay lý thuyết Phillips ngắn hạn.',
    },
    {
      stem: 'Chính sách tài khoá MỞ RỘNG (expansionary fiscal policy) bao gồm:',
      choices: ['Tăng thuế + giảm chi tiêu chính phủ', 'Giảm thuế + tăng chi tiêu chính phủ', 'Tăng lãi suất cơ bản', 'Mua trái phiếu chính phủ trên thị trường mở'],
      answer: 1,
      explanation: 'Chính sách tài khoá (Bộ Tài chính): Mở rộng = giảm thuế + tăng chi G → AD tăng, chống suy thoái. Thu hẹp = tăng thuế + giảm chi → AD giảm, chống lạm phát. Chính sách tiền tệ (NHTW): mua trái phiếu, giảm lãi suất là công cụ tiền tệ mở rộng — khác với tài khoá.',
    },
    {
      stem: 'Công cụ chính của chính sách tiền tệ (monetary policy) là:',
      choices: ['Điều chỉnh thuế suất thu nhập cá nhân', 'Tăng hoặc giảm chi tiêu ngân sách nhà nước', 'Thay đổi lãi suất cơ bản và nghiệp vụ thị trường mở (OMO)', 'Kiểm soát giá cả hàng hoá thiết yếu'],
      answer: 2,
      explanation: 'Ngân hàng Trung ương (Việt Nam: NHNN) dùng: (1) Lãi suất cơ bản/tái cấp vốn; (2) OMO — mua/bán trái phiếu chính phủ trên thị trường mở; (3) Tỷ lệ dự trữ bắt buộc (reserve requirement); (4) Tín dụng thường trực. Thuế và chi tiêu ngân sách là công cụ tài khoá, do Bộ Tài chính quản lý.',
    },
    {
      stem: 'Thất nghiệp cơ cấu (structural unemployment) là:',
      choices: ['Thất nghiệp do kinh tế suy thoái, cầu lao động giảm', 'Thất nghiệp ngắn hạn khi người lao động chuyển việc', 'Thất nghiệp do kỹ năng người lao động không phù hợp nhu cầu thị trường', 'Thất nghiệp theo mùa vụ'],
      answer: 2,
      explanation: 'Ba loại thất nghiệp: (1) Chu kỳ (cyclical): do suy thoái, AD giảm → giải quyết bằng chính sách kích cầu; (2) Ma sát (frictional): chuyển việc tự nguyện, ngắn hạn; (3) Cơ cấu (structural): do công nghệ thay đổi, kỹ năng lỗi thời — cần đào tạo lại dài hạn. Thất nghiệp tự nhiên = ma sát + cơ cấu.',
    },
    {
      stem: 'Theo lý thuyết tăng trưởng tân cổ điển Solow, về dài hạn yếu tố NÀO tạo ra tăng trưởng GDP trên đầu người bền vững?',
      choices: ['Tăng tỷ lệ tiết kiệm và đầu tư', 'Tăng dân số nhanh hơn', 'Tiến bộ công nghệ (technological progress)', 'Tăng chi tiêu chính phủ liên tục'],
      answer: 2,
      explanation: 'Mô hình Solow: tiết kiệm và đầu tư cao hơn chỉ tạo tăng trưởng NGẮN HẠN đến trạng thái dừng (steady state) mới — không tăng trưởng dài hạn. Chỉ có TIẾN BỘ CÔNG NGHỆ (A) mới tạo tăng trưởng GDP/đầu người dài hạn bền vững. Điều này giải thích tại sao đầu tư R&D và giáo dục quan trọng.',
    },
    {
      stem: 'Tài khoản vãng lai (current account) trong cán cân thanh toán quốc tế bao gồm:',
      choices: ['Đầu tư trực tiếp nước ngoài (FDI) và đầu tư gián tiếp', 'Xuất nhập khẩu hàng hoá, dịch vụ, thu nhập và chuyển khoản vãng lai', 'Vay và trả nợ nước ngoài của chính phủ', 'Thay đổi dự trữ ngoại hối quốc gia'],
      answer: 1,
      explanation: 'Cán cân thanh toán = Tài khoản vãng lai (CA) + Tài khoản vốn (KA) + Tài khoản tài chính (FA). CA bao gồm: xuất-nhập khẩu HH (trade balance), dịch vụ (du lịch, vận tải), thu nhập sơ cấp (lương, lợi tức), thu nhập thứ cấp (kiều hối). Thặng dư CA (CA>0): nước cho thế giới vay ròng.',
    },
  ],
};

// ─── E2.2 · Thống kê cho kinh tế ─────────────────────────────
export const E22_QUIZ = {
  id: 'E2.2-statistics-quiz',
  title: 'E2.2 · Thống kê cho kinh tế — Mô tả, suy diễn & Hồi quy',
  kind: 'quiz',
  yearLevel: 2, subject: 'thong-ke', difficulty: 2,
  skillsTrained: ['thong-ke-mo-ta', 'kiem-dinh-gia-thuyet', 'hoi-quy-tuyen-tinh', 'phan-phoi-chuan'],
  questions: [
    {
      stem: 'Với tập số liệu thu nhập có phân phối lệch phải (right-skewed) do một số cá nhân siêu giàu, chỉ số nào MÔ TẢ TỐT HƠN thu nhập trung bình của đại đa số?',
      choices: ['Số trung bình (mean)', 'Số trung vị (median)', 'Số yếu vị (mode)', 'Phương sai (variance)'],
      answer: 1,
      explanation: 'Phân phối lệch phải: một số giá trị rất cao kéo Mean tăng vọt, không đại diện cho đa số. Median (giá trị giữa) không bị ảnh hưởng bởi cực trị → phản ánh đúng hơn. Đây là lý do khi báo cáo thu nhập hộ gia đình, các cơ quan thống kê thường dùng median income thay vì mean income.',
    },
    {
      stem: 'Độ lệch chuẩn (standard deviation) đo lường:',
      choices: ['Giá trị trung bình của tập dữ liệu', 'Mức độ phân tán của dữ liệu quanh giá trị trung bình', 'Tương quan giữa hai biến', 'Giá trị lớn nhất trừ giá trị nhỏ nhất'],
      answer: 1,
      explanation: 'Độ lệch chuẩn (σ hoặc s) = căn bậc hai của phương sai. Đo độ phân tán: σ nhỏ → dữ liệu tập trung gần mean; σ lớn → dữ liệu trải rộng. Đơn vị giống đơn vị gốc (khác phương sai là đơn vị bình phương) → dễ diễn giải hơn. Phạm vi (range) chỉ dùng 2 điểm cực trị, dễ bị lệch.',
    },
    {
      stem: 'Trong phân phối chuẩn (normal distribution), khoảng [μ − 2σ, μ + 2σ] chứa xấp xỉ bao nhiêu % dữ liệu?',
      choices: ['68%', '95%', '99,7%', '50%'],
      answer: 1,
      explanation: 'Quy tắc 68-95-99,7 (empirical rule): μ±1σ chứa ~68%; μ±2σ chứa ~95%; μ±3σ chứa ~99,7%. Ứng dụng: điểm thi thường phân phối chuẩn → 95% sinh viên nằm trong 2 độ lệch chuẩn so với điểm trung bình. Kiểm tra giả thuyết thường dùng ngưỡng 1,96σ (≈2σ) cho mức ý nghĩa 5%.',
    },
    {
      stem: 'Trong kiểm định giả thuyết, giả thuyết H₀ (null hypothesis) thường phát biểu:',
      choices: ['Điều nhà nghiên cứu muốn chứng minh', 'Không có hiệu ứng / không có sự khác biệt (status quo)', 'Điều chắc chắn đúng', 'Kết quả sẽ xảy ra với xác suất 95%'],
      answer: 1,
      explanation: 'H₀ (null): giả thuyết "không có gì" — không có hiệu ứng, không có khác biệt (ví dụ: β=0, μ₁=μ₂). H₁ (alternative): điều nhà nghiên cứu muốn chứng minh. Kiểm định cố gắng BÁC BỎ H₀. Nếu p-value < α (0,05) → bác bỏ H₀. Nếu không → "không đủ bằng chứng để bác bỏ H₀" (không có nghĩa H₀ đúng).',
    },
    {
      stem: 'Sai lầm Loại I (Type I error) trong kiểm định giả thuyết là:',
      choices: ['Không bác bỏ H₀ khi H₀ sai', 'Bác bỏ H₀ khi H₀ thực sự đúng', 'Chọn cỡ mẫu quá nhỏ', 'Tính sai p-value'],
      answer: 1,
      explanation: 'Hai loại sai lầm: Type I (α) = "false positive" — bác bỏ H₀ khi H₀ đúng (kết luận có hiệu ứng khi thực ra không có). Type II (β) = "false negative" — không bác bỏ H₀ khi H₀ sai (bỏ sót hiệu ứng thực). Trong y học: Type I = kết luận thuốc hiệu quả khi thực ra không; Type II = bỏ qua thuốc hiệu quả. Giảm α thường tăng β.',
    },
    {
      stem: 'Hệ số tương quan Pearson (r) nhận giá trị trong khoảng:',
      choices: ['0 đến 1', '−1 đến 1', '−∞ đến +∞', '0 đến +∞'],
      answer: 1,
      explanation: 'r ∈ [−1, +1]: r = +1: tương quan dương hoàn hảo; r = −1: tương quan âm hoàn hảo; r = 0: không có tương quan tuyến tính. Lưu ý: r đo tương quan TUY ẾN TÍNH — r=0 không có nghĩa là không có quan hệ (có thể có quan hệ phi tuyến). "Correlation ≠ Causation": tương quan không suy ra nhân quả.',
    },
    {
      stem: 'Trong hồi quy tuyến tính đơn Y = α + βX + ε, hệ số β (slope) có ý nghĩa:',
      choices: ['Giá trị trung bình của Y khi X = 0', 'Khi X tăng 1 đơn vị, Y thay đổi trung bình β đơn vị', 'Phần sai số của mô hình', 'Tương quan giữa X và Y'],
      answer: 1,
      explanation: 'β (hệ số góc/slope): khi X tăng 1 đơn vị → Y thay đổi trung bình β đơn vị (dương = cùng chiều, âm = ngược chiều). α (intercept): giá trị Y khi X=0 (không phải lúc nào cũng có ý nghĩa thực tế). ε: sai số ngẫu nhiên. Ví dụ: β=0,5 trong hồi quy lương theo kinh nghiệm → thêm 1 năm KN, lương tăng trung bình 0,5 triệu.',
    },
    {
      stem: 'Khoảng tin cậy 95% (95% confidence interval) cho tham số μ có nghĩa:',
      choices: ['Xác suất 95% để μ nằm trong khoảng này', 'Nếu lặp lại mẫu nhiều lần, 95% số khoảng sẽ chứa μ thực', 'Khoảng này chứa 95% dữ liệu mẫu', 'Có 5% sai số trong ước lượng'],
      answer: 1,
      explanation: 'Diễn giải đúng (frequentist): μ là hằng số cố định (không ngẫu nhiên), còn khoảng CI mới ngẫu nhiên. Nếu lặp 100 lần lấy mẫu → ~95 khoảng CI sẽ chứa μ thực. Không thể nói "95% xác suất μ nằm trong khoảng cụ thể này" sau khi đã tính. Khoảng rộng hơn → ước lượng kém chính xác hơn.',
    },
    {
      stem: 'Định lý giới hạn trung tâm (Central Limit Theorem) phát biểu rằng:',
      choices: ['Phân phối tổng thể phải là phân phối chuẩn', 'Phân phối của trung bình mẫu tiến tới phân phối chuẩn khi cỡ mẫu đủ lớn', 'Trung bình mẫu bằng trung bình tổng thể', 'Cỡ mẫu nhỏ vẫn cho kết quả chính xác'],
      answer: 1,
      explanation: 'CLT: khi n đủ lớn (n≥30), trung bình mẫu X̄ ~ N(μ, σ²/n) bất kể phân phối tổng thể là gì (có thể lệch, bimodal, v.v.). Đây là nền tảng của thống kê suy diễn: cho phép dùng phân phối chuẩn/t để kiểm định và xây dựng CI. Cực kỳ quan trọng vì thực tế hiếm khi biết phân phối tổng thể.',
    },
    {
      stem: 'Hệ số xác định R² trong hồi quy tuyến tính đo lường:',
      choices: ['Hệ số tương quan giữa X và Y', 'Tỷ lệ phần trăm biến thiên của Y được giải thích bởi mô hình', 'Xác suất mô hình đúng', 'Sai số dự báo trung bình'],
      answer: 1,
      explanation: 'R² ∈ [0,1]: R²=0,75 nghĩa là 75% biến thiên của Y được giải thích bởi X (hoặc các biến độc lập). R²=0: mô hình không giải thích gì; R²=1: mô hình hoàn hảo. Lưu ý: Adjusted R² điều chỉnh cho số biến; thêm biến vô nghĩa vào mô hình vẫn làm R² tăng → dùng Adjusted R² để so sánh mô hình.',
    },
  ],
};

// ─── E2.3 · Tài chính – Tiền tệ ──────────────────────────────
export const E23_QUIZ = {
  id: 'E2.3-money-quiz',
  title: 'E2.3 · Tài chính – Tiền tệ — Tiền, Ngân hàng & Thị trường tài chính',
  kind: 'quiz',
  yearLevel: 2, subject: 'tai-chinh-tien-te', difficulty: 2,
  skillsTrained: ['cung-tien', 'ngan-hang-trung-uong', 'lai-suat', 'ty-gia', 'gia-tri-thoi-gian'],
  questions: [
    {
      stem: 'Ba chức năng CƠ BẢN của tiền tệ là:',
      choices: [
        'Phương tiện thanh toán, tiết kiệm, đầu tư',
        'Phương tiện trao đổi, đơn vị tính toán, phương tiện cất trữ giá trị',
        'Tạo tín dụng, điều tiết lạm phát, dự trữ ngoại hối',
        'Chi trả nợ, đo lường GDP, tích luỹ vốn',
      ],
      answer: 1,
      explanation: 'Ba chức năng của tiền: (1) Medium of exchange — tránh trao đổi hàng-hàng (barter) kém hiệu quả; (2) Unit of account — thước đo giá trị chuẩn; (3) Store of value — giữ sức mua qua thời gian (không hoàn hảo khi có lạm phát). Tính thanh khoản (liquidity) là đặc trưng quan trọng của tiền.',
    },
    {
      stem: 'Theo định nghĩa của NHNN Việt Nam, M2 (cung tiền mở rộng) bao gồm:',
      choices: [
        'Chỉ tiền mặt lưu thông ngoài ngân hàng',
        'M1 + tiền gửi có kỳ hạn tại ngân hàng thương mại',
        'Chỉ tiền gửi không kỳ hạn',
        'Tiền mặt + trái phiếu chính phủ',
      ],
      answer: 1,
      explanation: 'M1 = tiền mặt + tiền gửi không kỳ hạn (demand deposits) — thanh khoản cao nhất. M2 = M1 + tiền gửi có kỳ hạn (time deposits), tiền gửi tiết kiệm — kém thanh khoản hơn nhưng quy mô lớn hơn nhiều. Các nước dùng M2 để theo dõi cung tiền vì phản ánh đầy đủ hơn. NHNN VN mục tiêu tăng trưởng M2 hàng năm.',
    },
    {
      stem: 'Số nhân tiền tệ (money multiplier) được tính bởi:',
      choices: ['1 / Tỷ lệ dự trữ bắt buộc (r)', 'Tỷ lệ dự trữ bắt buộc × Tiền cơ sở', '1 − Tỷ lệ dự trữ bắt buộc', 'Cung tiền / GDP'],
      answer: 0,
      explanation: 'Money multiplier = 1/r. Ví dụ: r = 10% → multiplier = 10 → mỗi 1 triệu tiền cơ sở (base money) tạo ra tổng 10 triệu trong hệ thống ngân hàng qua nhiều vòng cho vay. NHNN tăng r → multiplier giảm → M2 giảm (thắt chặt). Thực tế: multiplier nhỏ hơn lý thuyết do ngân hàng giữ dự trữ vượt và dân rút tiền mặt.',
    },
    {
      stem: 'Khi Ngân hàng Nhà nước Việt Nam TĂNG lãi suất tái cấp vốn, tác động trực tiếp là:',
      choices: [
        'Ngân hàng thương mại vay NHNN rẻ hơn → cho vay nhiều hơn',
        'Ngân hàng thương mại vay NHNN đắt hơn → nâng lãi suất cho vay → cung tín dụng giảm',
        'Chính phủ có thêm nguồn thu ngân sách',
        'Tỷ giá VND/USD giảm (VND mạnh lên)',
      ],
      answer: 1,
      explanation: 'Lãi suất tái cấp vốn (refinancing rate) = giá vốn của NHTM khi vay NHNN. Tăng lãi suất này → NHTM vay đắt hơn → nâng lãi suất cho vay → tín dụng giảm → M2 giảm → lạm phát hạ (nhưng tăng trưởng chậm lại). Đây là chính sách tiền tệ THẮT CHẶT. Hiệu ứng VND: lãi suất tăng → dòng vốn vào → cầu VND tăng → VND có thể mạnh lên.',
    },
    {
      stem: 'Giá trái phiếu (bond price) và lãi suất thị trường (market interest rate) có mối quan hệ:',
      choices: ['Thuận chiều — lãi suất tăng, giá trái phiếu tăng', 'Nghịch chiều — lãi suất tăng, giá trái phiếu giảm', 'Không có mối liên hệ', 'Phụ thuộc vào thời hạn của trái phiếu'],
      answer: 1,
      explanation: 'Giá TP và lãi suất NGHỊCH CHIỀU. Lý do: trái phiếu trả coupon cố định. Nếu lãi suất thị trường tăng → TP mới hấp dẫn hơn → TP cũ kém hấp dẫn → giá TP cũ giảm để bù đắp. Công thức: P = C/(1+r) + C/(1+r)² + … + (C+F)/(1+r)ⁿ → r tăng → P giảm. Đây là rủi ro lãi suất (interest rate risk) của trái phiếu.',
    },
    {
      stem: 'Nếu lãi suất danh nghĩa là 8%/năm và lạm phát kỳ vọng là 3%, theo phương trình Fisher, lãi suất thực xấp xỉ bằng:',
      choices: ['11%', '5%', '24%', '2,7%'],
      answer: 1,
      explanation: 'Phương trình Fisher (xấp xỉ): r_real ≈ r_nominal − π = 8% − 3% = 5%. Chính xác hơn: (1+r_nominal) = (1+r_real)(1+π) → r_real = (1,08/1,03)−1 ≈ 4,85% ≈ 5%. Lãi suất thực quan trọng hơn để ra quyết định đầu tư — phản ánh sức mua thực tế của lợi tức nhận được.',
    },
    {
      stem: 'Hiện giá (Present Value) của 110 triệu đồng nhận sau 1 năm với lãi suất chiết khấu 10%/năm là:',
      choices: ['121 triệu', '100 triệu', '99 triệu', '110 triệu'],
      answer: 1,
      explanation: 'PV = FV / (1+r)^n = 110 / (1+0,1)^1 = 110/1,1 = 100 triệu. Nguyên tắc giá trị thời gian của tiền: 100 triệu hôm nay = 110 triệu sau 1 năm (với r=10%). Ứng dụng: thẩm định dự án đầu tư (NPV), định giá trái phiếu/cổ phiếu, so sánh các dòng tiền ở các thời điểm khác nhau.',
    },
    {
      stem: 'Khi VND MẤT GIÁ so với USD (tỷ giá USD/VND tăng), tác động nào sau đây là ĐÚNG?',
      choices: [
        'Hàng xuất khẩu VN đắt hơn đối với người nước ngoài',
        'Hàng nhập khẩu vào VN rẻ hơn',
        'Hàng xuất khẩu VN rẻ hơn → cạnh tranh hơn trên thị trường quốc tế',
        'Nợ ngoại tệ của VN giảm theo VND',
      ],
      answer: 2,
      explanation: 'VND mất giá (depreciation): 1 USD đổi được nhiều VND hơn. Hàng XK VN: giá USD giảm → cạnh tranh hơn → xuất khẩu tăng. Hàng NK: giá VND tăng → nhập khẩu đắt hơn → nhập khẩu giảm → cán cân thương mại cải thiện. Nhưng: nợ ngoại tệ tính theo VND TĂNG (bất lợi cho doanh nghiệp vay USD).',
    },
    {
      stem: 'Phương trình số lượng tiền tệ (Quantity Theory of Money) MV = PQ, trong đó nếu V và Q không đổi, cung tiền M tăng 10% thì:',
      choices: ['P tăng 10%', 'Q tăng 10%', 'V tăng 10%', 'P không thay đổi'],
      answer: 0,
      explanation: 'MV = PQ: M = cung tiền, V = tốc độ lưu thông, P = mức giá, Q = sản lượng thực. Nếu V và Q cố định → M tăng 10% → P tăng 10% (lạm phát 10%). Lý thuyết định lượng tiền tệ (classical/monetarist): in tiền gây lạm phát tương ứng. Thực tế: V không hoàn toàn cố định, Q có thể phản ứng ngắn hạn → quan hệ M-P không chặt trong ngắn hạn.',
    },
    {
      stem: 'Ngân hàng thương mại TẠO RA tiền (money creation) chủ yếu thông qua:',
      choices: ['In thêm tiền mặt', 'Nhận tiền gửi và cho vay phần lớn, chỉ giữ lại dự trữ bắt buộc', 'Mua vàng và ngoại tệ', 'Phát hành trái phiếu ngân hàng'],
      answer: 1,
      explanation: 'Cơ chế "fractional reserve banking": ngân hàng nhận 100 triệu tiền gửi, giữ 10% dự trữ (10tr), cho vay 90tr. Người vay chi tiêu → 90tr lại vào ngân hàng → ngân hàng giữ 9tr, cho vay 81tr… Tổng tiền tạo ra = 100/(0,1) = 1.000 triệu. Ngân hàng trung ương kiểm soát quá trình này qua tỷ lệ dự trữ bắt buộc và lãi suất.',
    },
  ],
};

// ─── E2.4 · Quản trị học đại cương ───────────────────────────
export const E24_QUIZ = {
  id: 'E2.4-management-quiz',
  title: 'E2.4 · Quản trị học đại cương — Lập kế hoạch, Tổ chức & Lãnh đạo',
  kind: 'quiz',
  yearLevel: 2, subject: 'quan-tri', difficulty: 2,
  skillsTrained: ['chuc-nang-quan-tri', 'to-chuc-doanh-nghiep', 'lanh-dao', 'dong-luc-nhan-vien'],
  questions: [
    {
      stem: 'Bốn chức năng cơ bản của quản trị (POLC framework) là:',
      choices: [
        'Profit, Operations, Logistics, Control',
        'Planning, Organizing, Leading, Controlling',
        'Planning, Outsourcing, Learning, Costing',
        'Producing, Ordering, Launching, Checking',
      ],
      answer: 1,
      explanation: 'POLC: (1) Planning — xác định mục tiêu và cách đạt; (2) Organizing — phân công nguồn lực, cơ cấu tổ chức; (3) Leading — truyền cảm hứng, động viên, lãnh đạo nhân viên; (4) Controlling — giám sát, so sánh với kế hoạch, điều chỉnh. Đây là framework cốt lõi từ Henri Fayol (1916) và vẫn được dạy toàn thế giới.',
    },
    {
      stem: 'Phân tích SWOT giúp doanh nghiệp xác định:',
      choices: [
        'Sales, Workforce, Operations, Technology',
        'Điểm mạnh, Điểm yếu (nội bộ) và Cơ hội, Thách thức (bên ngoài)',
        'Strategies, Weaknesses, Opportunities, Trends',
        'Chỉ các yếu tố bên ngoài ảnh hưởng đến kinh doanh',
      ],
      answer: 1,
      explanation: 'SWOT = Strengths (Điểm mạnh — nội bộ), Weaknesses (Điểm yếu — nội bộ), Opportunities (Cơ hội — môi trường), Threats (Thách thức — môi trường). Công cụ lập kế hoạch chiến lược: phát huy S+O, khắc phục W, phòng thủ T. Kết hợp với PESTLE (macro), Porter\'s Five Forces (ngành) để phân tích toàn diện.',
    },
    {
      stem: 'Theo tháp nhu cầu Maslow, nhu cầu ở cấp cao NHẤT là:',
      choices: ['Nhu cầu an toàn (Safety needs)', 'Nhu cầu xã hội (Social/Love needs)', 'Nhu cầu tự khẳng định bản thân (Self-actualization)', 'Nhu cầu được tôn trọng (Esteem needs)'],
      answer: 2,
      explanation: 'Tháp Maslow (từ thấp → cao): (1) Sinh lý (ăn, uống, ngủ); (2) An toàn; (3) Xã hội (yêu thương, thuộc về); (4) Tôn trọng (thành tích, danh tiếng); (5) Tự hiện thực hoá (self-actualization — phát triển tối đa tiềm năng). Lý thuyết cho rằng cần đáp ứng nhu cầu thấp trước khi theo đuổi nhu cầu cao hơn. Ứng dụng HR: nhân viên no ấm rồi mới cần thách thức và ý nghĩa công việc.',
    },
    {
      stem: 'Frederick Taylor được biết đến với lý thuyết:',
      choices: [
        'Quản trị hành chính (Administrative Management)',
        'Quản trị khoa học (Scientific Management) — tối ưu hoá quy trình lao động',
        'Lý thuyết X và Y về động lực nhân viên',
        'Quan hệ con người (Human Relations Movement)',
      ],
      answer: 1,
      explanation: 'Frederick Taylor (1911, "Principles of Scientific Management"): áp dụng phương pháp khoa học để tối ưu năng suất lao động — quan sát, đo lường, chuẩn hoá từng thao tác. Tiêu biểu: nghiên cứu thời gian và chuyển động (time-and-motion study), trả lương theo hiệu suất (piece rate). Henri Fayol: 14 nguyên tắc quản trị hành chính. McGregor: Thuyết X-Y. Elton Mayo: Hawthorne experiments, quan hệ con người.',
    },
    {
      stem: 'Cơ cấu tổ chức MA TRẬN (matrix structure) kết hợp:',
      choices: [
        'Chỉ theo chức năng (marketing, tài chính, sản xuất…)',
        'Chỉ theo sản phẩm/dự án/địa lý',
        'Theo chức năng VÀ theo dự án/sản phẩm đồng thời — nhân viên báo cáo 2 sếp',
        'Không có cấu trúc rõ ràng, hoàn toàn linh hoạt',
      ],
      answer: 2,
      explanation: 'Ma trận = kết hợp cơ cấu chức năng (functional) và dự án/sản phẩm (divisional). Ưu điểm: linh hoạt, chia sẻ nguồn lực, phối hợp đa chức năng tốt. Nhược điểm: mơ hồ quyền hạn (2 sếp), xung đột ưu tiên, phức tạp. Phù hợp: công ty dự án (tư vấn, xây dựng, phần mềm). Boeing và NASA nổi tiếng với ma trận.',
    },
    {
      stem: 'Nguyên tắc "Span of Control" (tầm kiểm soát) đề cập đến:',
      choices: [
        'Phạm vi địa lý mà quản lý có thể kiểm soát',
        'Số cấp bậc trong hệ thống phân cấp',
        'Số lượng nhân viên trực tiếp mà một nhà quản lý có thể giám sát hiệu quả',
        'Quyền kiểm soát ngân sách của một phòng ban',
      ],
      answer: 2,
      explanation: 'Span of control (tầm kiểm soát): số nhân viên báo cáo trực tiếp cho 1 quản lý. Span rộng (wide) = nhiều nhân viên/quản lý → tổ chức phẳng, tiết kiệm quản lý, đòi hỏi nhân viên tự chủ cao. Span hẹp (narrow) = ít nhân viên → nhiều tầng, kiểm soát chặt hơn. Xu hướng hiện đại: span rộng hơn nhờ công nghệ và nhân viên có kỹ năng cao.',
    },
    {
      stem: 'Phong cách lãnh đạo DÂN CHỦ (democratic/participative leadership) đặc trưng bởi:',
      choices: [
        'Quản lý ra tất cả quyết định, không tham khảo nhân viên',
        'Nhân viên tự quyết định hoàn toàn, lãnh đạo không can thiệp',
        'Lãnh đạo tham khảo ý kiến nhân viên, ra quyết định tập thể',
        'Lãnh đạo dùng phần thưởng và hình phạt để kiểm soát',
      ],
      answer: 2,
      explanation: 'Ba phong cách cơ bản (Lewin): (1) Độc đoán (Autocratic) — lãnh đạo quyết định một mình, nhanh nhưng ít sáng tạo; (2) Dân chủ (Democratic/Participative) — tham khảo nhóm, tạo gắn kết, phù hợp khi nhân viên có năng lực; (3) Tự do (Laissez-faire) — nhân viên tự quyết, hiệu quả với chuyên gia sáng tạo nhưng rủi ro thiếu định hướng. Không có phong cách tốt nhất tuyệt đối — phụ thuộc tình huống.',
    },
    {
      stem: 'Quản trị theo mục tiêu (MBO — Management by Objectives) nhấn mạnh:',
      choices: [
        'Lãnh đạo đơn phương đặt mục tiêu cho nhân viên',
        'Mục tiêu được xác định chung giữa quản lý và nhân viên, có KPI rõ ràng và đánh giá định kỳ',
        'Tập trung vào quy trình, không quan tâm kết quả',
        'Chỉ đo lường mục tiêu tài chính',
      ],
      answer: 1,
      explanation: 'MBO (Peter Drucker, 1954): quy trình gồm (1) Xác định mục tiêu chung (manager + nhân viên); (2) Mục tiêu phải SMART (Specific, Measurable, Achievable, Relevant, Time-bound); (3) Định kỳ đánh giá tiến độ; (4) Phản hồi và điều chỉnh. Ưu điểm: tăng cam kết, rõ ràng kỳ vọng. Nhược: tốn thời gian thiết lập, có thể thiếu sáng tạo nếu chỉ chạy theo số.',
    },
    {
      stem: 'Lý thuyết Hai Nhân tố của Herzberg (Hygiene vs Motivator) cho rằng:',
      choices: [
        'Tiền lương cao là yếu tố tạo động lực mạnh nhất',
        'Yếu tố vệ sinh (lương, điều kiện LV) tránh bất mãn, nhưng chỉ yếu tố động lực (thành tích, trách nhiệm) mới tạo ra sự hài lòng thực sự',
        'Mọi người đều có cùng cấu trúc nhu cầu',
        'Cải thiện môi trường làm việc vật lý là ưu tiên số 1',
      ],
      answer: 1,
      explanation: 'Herzberg (1959): (1) Hygiene factors (lương, chính sách CT, điều kiện LV, quan hệ cấp trên) — thiếu → bất mãn; đủ → không bất mãn nhưng KHÔNG tạo động lực. (2) Motivators (thành tích, công nhận, trách nhiệm, phát triển) — khi có → hài lòng và có động lực cao. Bài học: tăng lương giải quyết bất mãn nhưng không giữ người dài hạn; cần trao thêm trách nhiệm và cơ hội phát triển.',
    },
    {
      stem: 'Kiểm soát quản trị (managerial control) gồm mấy bước cơ bản?',
      choices: ['2 bước: đo lường và điều chỉnh', '3 bước: đặt tiêu chuẩn → đo lường thực tế → so sánh và điều chỉnh', '4 bước: lập kế hoạch, phân công, giám sát, khen thưởng', '5 bước theo chu trình PDCA'],
      answer: 1,
      explanation: 'Quy trình kiểm soát 3 bước: (1) Đặt tiêu chuẩn/KPI (từ kế hoạch); (2) Đo lường hiệu quả thực tế; (3) So sánh với tiêu chuẩn → nếu lệch → tìm nguyên nhân → điều chỉnh hành động HOẶC điều chỉnh tiêu chuẩn. Kiểm soát có thể trước (feedforward), trong (concurrent), sau (feedback). PDCA (Plan-Do-Check-Act) là chu trình cải tiến liên tục của Deming.',
    },
  ],
};

// ─── E2.5 · Marketing căn bản ─────────────────────────────────
export const E25_QUIZ = {
  id: 'E2.5-marketing-quiz',
  title: 'E2.5 · Marketing căn bản — STP, 4P & Hành vi người tiêu dùng',
  kind: 'quiz',
  yearLevel: 2, subject: 'marketing', difficulty: 2,
  skillsTrained: ['marketing-mix', 'phan-khuc-thi-truong', 'hanh-vi-nguoi-tieu-dung', 'chien-luoc-gia'],
  questions: [
    {
      stem: 'Hỗn hợp Marketing (Marketing Mix) truyền thống gồm 4P là:',
      choices: [
        'People, Process, Physical evidence, Performance',
        'Product, Price, Place, Promotion',
        'Planning, Pricing, Positioning, Promotion',
        'Product, Profit, Place, People',
      ],
      answer: 1,
      explanation: '4P (McCarthy, 1960): Product (sản phẩm — tính năng, chất lượng, thương hiệu), Price (giá — chiến lược định giá), Place (phân phối — kênh bán hàng, địa điểm), Promotion (xúc tiến — quảng cáo, PR, khuyến mãi). Dịch vụ mở rộng thêm 3P: People, Process, Physical evidence (7P). Hiện nay nhiều mô hình 4C hướng khách hàng: Customer, Cost, Convenience, Communication.',
    },
    {
      stem: 'Quy trình STP trong marketing diễn ra theo thứ tự:',
      choices: [
        'Targeting → Segmentation → Positioning',
        'Segmentation → Targeting → Positioning',
        'Positioning → Segmentation → Targeting',
        'Segmentation → Positioning → Targeting',
      ],
      answer: 1,
      explanation: 'STP: (1) Segmentation (phân khúc) — chia thị trường thành nhóm đồng nhất theo tiêu chí địa lý, nhân khẩu, tâm lý, hành vi; (2) Targeting (lựa chọn phân khúc mục tiêu) — đánh giá quy mô, tăng trưởng, khả năng cạnh tranh; (3) Positioning (định vị) — xây dựng hình ảnh thương hiệu trong tâm trí khách hàng mục tiêu. STP là nền tảng của mọi chiến lược marketing hiệu quả.',
    },
    {
      stem: 'Phân khúc thị trường theo nhân khẩu học (demographic segmentation) dùng tiêu chí:',
      choices: [
        'Lối sống, giá trị, quan điểm sống',
        'Tần suất mua hàng, lòng trung thành',
        'Tuổi, giới tính, thu nhập, nghề nghiệp, học vấn',
        'Quốc gia, vùng, khí hậu',
      ],
      answer: 2,
      explanation: 'Các loại phân khúc: (1) Địa lý (Geographic): khu vực, quốc gia, thành thị/nông thôn; (2) Nhân khẩu học (Demographic): tuổi, giới, thu nhập, nghề nghiệp — dễ đo lường nhất; (3) Tâm lý học (Psychographic): lối sống, nhân cách, giá trị; (4) Hành vi (Behavioral): dịp mua, lợi ích tìm kiếm, mức độ trung thành. Thực tế kết hợp nhiều tiêu chí để có phân khúc chính xác hơn.',
    },
    {
      stem: 'Trong chu kỳ sống sản phẩm (Product Life Cycle), giai đoạn nào có DOANH THU CAO NHẤT và cạnh tranh gay gắt nhất?',
      choices: ['Giới thiệu (Introduction)', 'Tăng trưởng (Growth)', 'Bão hoà (Maturity)', 'Suy thoái (Decline)'],
      answer: 2,
      explanation: 'PLC 4 giai đoạn: (1) Giới thiệu — doanh thu thấp, chi phí marketing cao, ít đối thủ; (2) Tăng trưởng — doanh thu tăng nhanh, đối thủ gia nhập; (3) Bão hoà (Maturity) — DOANH THU CAO NHẤT nhưng tăng chậm, cạnh tranh dữ dội về giá, cần khác biệt hoá; (4) Suy thoái — doanh thu giảm, thu hẹp hoặc rút lui. iPhone hiện đang ở giai đoạn bão hoà.',
    },
    {
      stem: 'Chiến lược định giá "skimming" (hớt váng) phù hợp với tình huống nào?',
      choices: [
        'Sản phẩm mới cho thị trường đại chúng, cần thâm nhập nhanh',
        'Sản phẩm mới, độc đáo, nhắm vào phân khúc khách hàng sẵn sàng trả giá cao',
        'Sản phẩm đang ở giai đoạn suy thoái',
        'Sản phẩm bình dân cạnh tranh giá',
      ],
      answer: 1,
      explanation: 'Price skimming: đặt giá CAO ban đầu → thu lợi nhuận từ early adopters (chấp nhận giá cao) → hạ dần khi cạnh tranh tăng. Phù hợp: sản phẩm đổi mới, thương hiệu mạnh, ít thay thế (iPhone, PS5 khi mới ra). Penetration pricing: ngược lại — giá thấp ban đầu để chiếm thị phần nhanh (Grab, Netflix khi vào thị trường mới). Competitive pricing: bám sát giá đối thủ.',
    },
    {
      stem: 'Kênh phân phối TRỰC TIẾP (direct channel) là:',
      choices: [
        'Nhà SX → Đại lý → Bán lẻ → Người tiêu dùng',
        'Nhà SX → Người tiêu dùng (không qua trung gian)',
        'Nhà SX → Nhà bán buôn → Bán lẻ → NTD',
        'Nhà SX → Nhà phân phối → Đại lý → NTD',
      ],
      answer: 1,
      explanation: 'Kênh trực tiếp (zero-level): Nhà SX → NTD. Ví dụ: cửa hàng Apple Store, bán hàng online trực tiếp, telesales. Kiểm soát hoàn toàn thương hiệu và trải nghiệm, biên lợi nhuận cao hơn. Kênh gián tiếp: có 1+ trung gian (bán buôn, bán lẻ, đại lý) → tiếp cận rộng hơn nhưng mất kiểm soát một phần. Xu hướng DTC (Direct-to-Consumer) đang phát triển mạnh.',
    },
    {
      stem: 'Quá trình quyết định mua hàng của người tiêu dùng (Consumer Decision Process) gồm bao nhiêu giai đoạn?',
      choices: ['3 giai đoạn', '4 giai đoạn', '5 giai đoạn', '7 giai đoạn'],
      answer: 2,
      explanation: '5 giai đoạn: (1) Nhận biết nhu cầu; (2) Tìm kiếm thông tin; (3) Đánh giá phương án; (4) Quyết định mua; (5) Hành vi sau mua (hài lòng/không hài lòng → tái mua/đổi trả). Marketing cần hiểu và can thiệp ở từng giai đoạn: quảng cáo kích thích nhận biết, SEO hỗ trợ tìm kiếm, review/comparison hỗ trợ đánh giá, ưu đãi thúc đẩy quyết định, dịch vụ sau bán đảm bảo hài lòng.',
    },
    {
      stem: 'Ma trận BCG (Boston Consulting Group) phân loại SBU (đơn vị kinh doanh) thành 4 ô. "Cash Cow" (Bò sữa) đặc trưng bởi:',
      choices: [
        'Thị phần thấp, tăng trưởng thị trường cao — cần đầu tư lớn',
        'Thị phần cao, tăng trưởng thị trường cao — ngôi sao triển vọng',
        'Thị phần cao, tăng trưởng thị trường thấp — sinh ra nhiều tiền mặt',
        'Thị phần thấp, tăng trưởng thị trường thấp — cân nhắc rút lui',
      ],
      answer: 2,
      explanation: 'BCG Matrix: (1) Stars: thị phần cao + tăng trưởng cao → đầu tư để duy trì; (2) Cash Cows: thị phần cao + tăng trưởng THẤP → sinh tiền ổn định, đầu tư ít → "vắt sữa" tài trợ cho Stars và Question Marks; (3) Question Marks: thị phần thấp + tăng trưởng cao → cần quyết định đầu tư hay rút; (4) Dogs: thị phần thấp + tăng trưởng thấp → cân nhắc thanh lý.',
    },
    {
      stem: 'Định vị thương hiệu (brand positioning) đề cập đến:',
      choices: [
        'Vị trí địa lý của cửa hàng chính',
        'Hình ảnh và liên tưởng mà thương hiệu chiếm giữ trong tâm trí khách hàng mục tiêu',
        'Thứ hạng doanh thu của thương hiệu trong ngành',
        'Logo và màu sắc nhận diện thương hiệu',
      ],
      answer: 1,
      explanation: 'Định vị (Ries & Trout, "Positioning: The Battle for Your Mind"): không phải về sản phẩm vật lý mà về NHẬN THỨC trong tâm trí khách hàng. Ví dụ: Volvo → an toàn; Apple → sáng tạo, đẳng cấp; Vinamilk → sữa thuần Việt. Tuyên ngôn định vị (positioning statement): "Đối với [phân khúc], [thương hiệu] là [khái niệm] vì [lý do tin cậy]." Logo/màu sắc là nhận diện thương hiệu (brand identity), không phải định vị.',
    },
    {
      stem: 'Content Marketing khác với quảng cáo truyền thống (traditional advertising) ở chỗ:',
      choices: [
        'Content marketing tốn kém hơn nhiều',
        'Content marketing cung cấp nội dung có giá trị để thu hút khách hàng tự tìm đến (pull), thay vì đẩy thông điệp đến họ (push)',
        'Content marketing chỉ dùng cho doanh nghiệp lớn',
        'Quảng cáo truyền thống hiệu quả hơn trên digital',
      ],
      answer: 1,
      explanation: 'Inbound marketing (content marketing, SEO, social media): tạo nội dung hữu ích → khách hàng TỰ TÌM ĐẾN khi có nhu cầu → quan hệ lâu dài, chi phí/lead thấp hơn. Outbound (quảng cáo TVC, banner, cold call): ĐẨY thông điệp đến người có thể chưa quan tâm → reach rộng nhưng chi phí cao và khách hàng ngày càng né. Xu hướng: kết hợp cả hai, digital-first.',
    },
  ],
};

// ─── EXPORT tổng hợp ──────────────────────────────────────────
export const ECONOMICS_YEAR2_SCENARIOS = {
  [E21_QUIZ.id]: E21_QUIZ,
  [E22_QUIZ.id]: E22_QUIZ,
  [E23_QUIZ.id]: E23_QUIZ,
  [E24_QUIZ.id]: E24_QUIZ,
  [E25_QUIZ.id]: E25_QUIZ,
};
