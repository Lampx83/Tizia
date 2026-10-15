// ============================================================
// Trường Kinh tế — Practice Scenarios (EP01–EP04)
// ============================================================
// 4 module thực hành tích hợp: mô phỏng doanh nghiệp, chứng
// khoán, khởi nghiệp và FinTech. Mỗi module 10 câu với giải
// thích chi tiết, độ khó cao (yêu cầu ≥ 18 sao để mở khoá).
// ============================================================

// ─── EP01 · Mô phỏng doanh nghiệp — Vận hành ──────────────
export const EP01_QUIZ = {
  id: 'EP01-biz-ops-quiz',
  title: 'EP01 · Mô phỏng doanh nghiệp — Vận hành',
  kind: 'quiz',
  subject: 'doanh-nghiep-ao', difficulty: 2,
  skillsTrained: ['operations-management', 'kpi', 'supply-chain', 'lean'],
  questions: [
    {
      stem: 'Chỉ số OEE (Overall Equipment Effectiveness) trong sản xuất đo lường điều gì?',
      choices: [
        'Chi phí vận hành tổng thể của nhà máy',
        'Mức độ hiệu quả của máy móc: kết hợp Availability × Performance × Quality',
        'Tỷ lệ hàng tồn kho trên doanh thu',
        'Tổng sản lượng xuất xưởng trong 1 ca làm việc',
      ],
      answer: 1,
      explanation: 'OEE = Availability × Performance × Quality. Availability: tỷ lệ thời gian máy hoạt động thực tế / lý thuyết. Performance: tốc độ thực tế / tốc độ thiết kế. Quality: tỷ lệ sản phẩm đạt chuẩn. OEE = 100% là lý tưởng (không có thời gian chết, chạy tối đa tốc độ, 0 lỗi). OEE ≥ 85% được xem là đẳng cấp thế giới (world-class). Chỉ số này xuất phát từ phương pháp TPM (Total Productive Maintenance) của Toyota.',
    },
    {
      stem: 'Trong quản lý chuỗi cung ứng, "Just-in-Time (JIT)" có ưu điểm chính là gì?',
      choices: [
        'Luôn có hàng tồn kho dự phòng lớn để tránh thiếu hụt',
        'Giảm chi phí tồn kho bằng cách chỉ sản xuất/nhận hàng đúng lúc cần',
        'Đặt hàng số lượng lớn để hưởng chiết khấu từ nhà cung cấp',
        'Tự động hóa hoàn toàn quy trình đặt hàng',
      ],
      answer: 1,
      explanation: 'JIT (Just-in-Time) là triết lý sản xuất của Toyota: nguyên liệu và sản phẩm đến đúng nơi, đúng lúc, đúng số lượng — không nhiều hơn. Ưu điểm: giảm chi phí lưu kho (warehousing), giảm vốn bị "đóng băng" trong tồn kho, phát hiện lỗi sớm hơn. Nhược điểm: dễ bị gián đoạn chuỗi cung ứng (như COVID-19 năm 2020 đã minh chứng khi nhiều nhà máy ô tô thiếu chip bán dẫn).',
    },
    {
      stem: 'Phân tích SWOT giúp doanh nghiệp xác định:',
      choices: [
        'Số liệu tài chính theo 4 quý trong năm',
        'Điểm mạnh, Điểm yếu (nội bộ) và Cơ hội, Thách thức (bên ngoài)',
        'Chiến lược giá theo 4 phân khúc thị trường',
        'Quy trình sản xuất theo 4 giai đoạn (nguyên liệu → thành phẩm)',
      ],
      answer: 1,
      explanation: "SWOT = Strengths (Điểm mạnh) + Weaknesses (Điểm yếu) + Opportunities (Cơ hội) + Threats (Thách thức). S và W là yếu tố NỘI BỘ (doanh nghiệp kiểm soát được), O và T là yếu tố BÊN NGOÀI (thị trường, đối thủ, xu hướng). SWOT là công cụ lập kế hoạch chiến lược kinh điển nhưng cần kết hợp với PESTEL, Porter's Five Forces để có bức tranh toàn diện.",
    },
    {
      stem: 'KPI (Key Performance Indicator) khác với KGI (Key Goal Indicator) như thế nào?',
      choices: [
        'KPI đo quá trình (process), KGI đo kết quả cuối cùng (outcome)',
        'KPI dành cho cấp quản lý, KGI dành cho nhân viên',
        'KPI là chỉ số tài chính, KGI là chỉ số phi tài chính',
        'KPI và KGI là hai cách gọi khác nhau của cùng một khái niệm',
      ],
      answer: 0,
      explanation: 'KPI đo lường HIỆU SUẤT QUÁ TRÌNH đang diễn ra (tỷ lệ chuyển đổi lead, thời gian xử lý đơn hàng, tỷ lệ lỗi sản xuất). KGI đo kết quả mục tiêu sau cùng (doanh thu quý, thị phần, lợi nhuận ròng). Ví dụ: KGI = "tăng doanh thu 20% trong năm"; KPI = "số cuộc gọi tư vấn mỗi ngày", "tỷ lệ chốt đơn". Theo dõi KPI giúp điều chỉnh sớm để đạt KGI.',
    },
    {
      stem: 'Phương pháp "Lean Manufacturing" tập trung vào việc:',
      choices: [
        'Tăng tối đa số lượng nhân công để tăng sản lượng',
        'Loại bỏ 8 loại lãng phí (Muda): thừa sản xuất, chờ đợi, vận chuyển, gia công thừa, tồn kho, di chuyển, lỗi, tiềm năng người chưa khai thác',
        'Đầu tư máy móc tự động hóa cao nhất có thể',
        'Phân quyền triệt để cho nhân viên tuyến đầu',
      ],
      answer: 1,
      explanation: 'Lean (xuất phát từ Toyota Production System) có 8 loại lãng phí: (1) Overproduction — sản xuất thừa, (2) Waiting — chờ đợi, (3) Transportation — vận chuyển không cần thiết, (4) Over-processing — gia công thừa mức cần, (5) Inventory — tồn kho quá mức, (6) Motion — di chuyển không tạo giá trị, (7) Defects — sản phẩm lỗi, (8) Unused talent — tiềm năng nhân viên chưa khai thác. Mục tiêu Lean: tối đa hoá giá trị khách hàng với nguồn lực tối thiểu.',
    },
    {
      stem: 'Mô hình "Business Model Canvas" (BMC) gồm bao nhiêu khối (block)?',
      choices: ['6', '7', '9', '12'],
      answer: 2,
      explanation: 'BMC gồm 9 khối: (1) Customer Segments — phân khúc khách hàng, (2) Value Propositions — giá trị cung cấp, (3) Channels — kênh tiếp cận, (4) Customer Relationships — quan hệ khách hàng, (5) Revenue Streams — dòng doanh thu, (6) Key Resources — nguồn lực chính, (7) Key Activities — hoạt động chính, (8) Key Partners — đối tác chính, (9) Cost Structure — cơ cấu chi phí. BMC do Alexander Osterwalder phát triển, được dùng rộng rãi để hình dung và thiết kế mô hình kinh doanh.',
    },
    {
      stem: 'Trong quản lý dự án, phương pháp Agile/Scrum có Sprint điển hình kéo dài:',
      choices: [
        '1 ngày',
        '1–4 tuần',
        '3–6 tháng',
        '1 năm',
      ],
      answer: 1,
      explanation: 'Sprint trong Scrum thường kéo dài 1–4 tuần (phổ biến nhất là 2 tuần). Mỗi Sprint là một chu kỳ nhỏ khép kín: Sprint Planning (lên kế hoạch) → Daily Standup (họp đứng 15 phút mỗi ngày) → Sprint Review (demo kết quả) → Sprint Retrospective (cải tiến quy trình). Mục tiêu: giao sản phẩm khả dụng sau mỗi Sprint, nhận phản hồi sớm, giảm rủi ro.',
    },
    {
      stem: 'Chỉ số "Customer Acquisition Cost (CAC)" và "Lifetime Value (LTV)" quan trọng vì:',
      choices: [
        'CAC/LTV > 1 là dấu hiệu doanh nghiệp tăng trưởng tốt',
        'Nếu LTV > 3 × CAC thường cho thấy mô hình kinh doanh bền vững',
        'CAC là chỉ số nội bộ, LTV là chỉ số ngoài thị trường',
        'Chỉ áp dụng cho doanh nghiệp SaaS, không phù hợp với sản xuất',
      ],
      answer: 1,
      explanation: 'CAC = tổng chi phí marketing & sales / số khách hàng mới. LTV (Customer Lifetime Value) = doanh thu trung bình từ 1 khách hàng trong toàn bộ vòng đời. Nguyên tắc vàng: LTV ≥ 3 × CAC → mô hình kinh doanh bền vững. Nếu LTV < CAC → đang thua lỗ trên mỗi khách hàng, cần xem xét lại chiến lược. Thời gian thu hồi CAC (CAC Payback Period) lý tưởng < 12 tháng với SaaS.',
    },
    {
      stem: 'Trong logistics, "Last-Mile Delivery" là:',
      choices: [
        'Chặng vận chuyển cuối cùng từ kho đến tay người tiêu dùng',
        'Kiểm tra chất lượng cuối cùng trước khi xuất hàng',
        'Tuyến đường dài nhất trong chuỗi cung ứng toàn cầu',
        'Hệ thống phần mềm quản lý giao nhận',
      ],
      answer: 0,
      explanation: '"Last mile" (dặm cuối) là chặng cuối của chuỗi cung ứng: từ trung tâm phân phối / kho địa phương đến địa chỉ khách hàng. Đây là chặng TỐN KÉM NHẤT (chiếm 28–53% tổng chi phí logistics) và khó tối ưu nhất vì địa chỉ phân tán, giao hàng thất bại, yêu cầu đặc biệt. Giải pháp: drone delivery, click & collect, locker thông minh, crowd-sourced delivery (Grab, Be, Lalamove).',
    },
    {
      stem: 'Balanced Scorecard (BSC) của Kaplan & Norton đánh giá doanh nghiệp qua mấy góc độ (perspective)?',
      choices: ['2', '3', '4', '6'],
      answer: 2,
      explanation: 'BSC đánh giá qua 4 góc độ: (1) Financial — tài chính: ROI, lợi nhuận, tăng trưởng doanh thu; (2) Customer — khách hàng: sự hài lòng, thị phần, giữ chân khách; (3) Internal Business Processes — quy trình nội bộ: hiệu quả vận hành, chất lượng, đổi mới; (4) Learning & Growth — học hỏi & phát triển: năng lực nhân viên, văn hoá tổ chức, hệ thống thông tin. BSC giúp cân bằng giữa mục tiêu ngắn hạn (tài chính) và dài hạn (con người, quy trình).',
    },
  ],
};

// ─── EP02 · Mô phỏng TTCK — Stock Sim ────────────────────
export const EP02_QUIZ = {
  id: 'EP02-stock-sim-quiz',
  title: 'EP02 · Mô phỏng TTCK — Stock Sim',
  kind: 'quiz',
  subject: 'stock-sim', difficulty: 3,
  skillsTrained: ['stock-market', 'portfolio', 'technical-analysis', 'risk-management'],
  questions: [
    {
      stem: 'Lý thuyết Danh mục hiện đại (Modern Portfolio Theory) của Harry Markowitz nhấn mạnh điều gì?',
      choices: [
        'Chỉ nên đầu tư vào cổ phiếu tăng trưởng cao nhất',
        'Đa dạng hóa danh mục có thể giảm rủi ro mà không giảm lợi nhuận kỳ vọng',
        'Thời điểm vào thị trường (market timing) quan trọng hơn phân bổ tài sản',
        'Chỉ số Beta > 2 là dấu hiệu cổ phiếu tốt',
      ],
      answer: 1,
      explanation: 'MPT (1952) chứng minh toán học rằng đa dạng hóa (diversification) có thể giảm rủi ro PHI HỆ THỐNG (idiosyncratic risk) mà không ảnh hưởng đến lợi nhuận kỳ vọng. Efficient Frontier — đường biên hiệu quả — là tập hợp danh mục tối ưu: lợi nhuận cao nhất tại mỗi mức rủi ro. Nguyên tắc: các tài sản ĐỌ TƯƠNG QUAN THẤP hoặc ÂM giảm rủi ro danh mục tốt hơn (ví dụ: cổ phiếu + trái phiếu thường có tương quan âm trong suy thoái).',
    },
    {
      stem: 'Chỉ báo kỹ thuật RSI (Relative Strength Index) khi vượt ngưỡng 70 thường có ý nghĩa gì?',
      choices: [
        'Cổ phiếu đang bị bán quá mức (oversold) — dấu hiệu mua vào',
        'Cổ phiếu đang bị mua quá mức (overbought) — dấu hiệu bán ra hoặc thận trọng',
        'Cổ phiếu đang giao dịch tại vùng giá hợp lý',
        'Khối lượng giao dịch tăng mạnh bất thường',
      ],
      answer: 1,
      explanation: 'RSI (0–100) đo mức độ thay đổi giá gần đây: RSI > 70 = overbought (mua quá mức, có thể đảo chiều giảm); RSI < 30 = oversold (bán quá mức, có thể đảo chiều tăng). RSI ≈ 50 = trung tính. Lưu ý: RSI là chỉ báo động lượng, không phải tín hiệu mua/bán tuyệt đối — trong xu hướng tăng mạnh (strong uptrend), RSI có thể duy trì > 70 kéo dài. Nên kết hợp với MACD, Bollinger Bands để xác nhận.',
    },
    {
      stem: 'Chiến lược đầu tư "Dollar-Cost Averaging (DCA)" có lợi ích chính là:',
      choices: [
        'Luôn mua được ở mức giá thấp nhất trong năm',
        'Giảm tác động của biến động giá bằng cách đầu tư định kỳ cố định, bất kể giá thị trường',
        'Tối đa hóa lợi nhuận trong thị trường tăng giá',
        'Chỉ phù hợp với trái phiếu, không phù hợp với cổ phiếu',
      ],
      answer: 1,
      explanation: 'DCA = đầu tư một khoản tiền CỐ ĐỊNH theo định kỳ (hàng tháng / quý) bất kể giá thị trường. Khi giá thấp → mua được nhiều đơn vị hơn; khi giá cao → mua ít hơn → giá bình quân thấp hơn đỉnh. Lợi ích: loại bỏ áp lực "timing the market", phù hợp với nhà đầu tư dài hạn. Hạn chế: trong thị trường tăng liên tục, đầu tư toàn bộ một lần (lump sum) có thể sinh lời hơn DCA.',
    },
    {
      stem: 'Hợp đồng quyền chọn (Options Contract) loại "Put Option" cho phép người mua:',
      choices: [
        'Mua cổ phiếu ở giá cố định trong tương lai',
        'Bán cổ phiếu ở giá cố định (strike price) trong tương lai — bảo vệ khi giá giảm',
        'Vay tiền từ sàn để đầu tư đòn bẩy',
        'Yêu cầu công ty mua lại cổ phiếu bất cứ lúc nào',
      ],
      answer: 1,
      explanation: 'Options có 2 loại cơ bản: Call Option (quyền MUA ở strike price) và Put Option (quyền BÁN ở strike price). Người mua Put Option trả phí (premium) để có quyền bán cổ phiếu ở giá đã định — dù giá thị trường xuống bao nhiêu. Ví dụ: mua Put Option VNM, strike 80.000 VND, phí 2.000 VND → nếu VNM giảm còn 60.000, bạn vẫn bán được 80.000, lãi 20.000 − 2.000 = 18.000 VND/cp. Dùng để HEDGE (bảo hiểm) danh mục hoặc đầu cơ giá xuống.',
    },
    {
      stem: 'Trong phân tích cơ bản (Fundamental Analysis), chỉ số nào thể hiện tỷ suất sinh lời trên vốn chủ sở hữu?',
      choices: ['P/E', 'EPS', 'ROE', 'D/E'],
      answer: 2,
      explanation: 'ROE (Return on Equity) = Lợi nhuận ròng / Vốn chủ sở hữu × 100%. Đo lường hiệu quả sử dụng vốn cổ đông. ROE ≥ 15% thường được coi là tốt; Warren Buffett tìm doanh nghiệp có ROE ổn định > 20% trong nhiều năm. Mô hình DuPont phân tích ROE = Net Profit Margin × Asset Turnover × Equity Multiplier, giúp xác định ROE cao nhờ hiệu quả hoạt động hay đòn bẩy tài chính. Lưu ý: ROE cao do đòn bẩy lớn (vay nợ nhiều) tiềm ẩn rủi ro cao hơn.',
    },
    {
      stem: 'Mô hình định giá tài sản vốn CAPM tính lợi nhuận kỳ vọng dựa trên:',
      choices: [
        'Lợi nhuận trong quá khứ + Tỷ lệ lạm phát',
        'Lãi suất phi rủi ro + Beta × Phần bù rủi ro thị trường',
        'P/E ratio + Tốc độ tăng trưởng EPS',
        'Tổng lợi tức cổ tức + Tỷ lệ tái đầu tư',
      ],
      answer: 1,
      explanation: 'CAPM: E(Ri) = Rf + βi × (E(Rm) − Rf). Trong đó: Rf = lãi suất phi rủi ro (thường là trái phiếu chính phủ); βi = Beta của cổ phiếu i (độ nhạy cảm với thị trường); E(Rm) − Rf = phần bù rủi ro thị trường. Beta = 1: cổ phiếu biến động theo thị trường; Beta > 1: biến động mạnh hơn (rủi ro cao, tiềm năng lợi nhuận cao); Beta < 1: biến động ít hơn (ổn định hơn, như cổ phiếu tiện ích). CAPM giả định thị trường hiệu quả và nhà đầu tư lý trí.',
    },
    {
      stem: 'Chiến lược "Short Selling" (bán khống) hoạt động như thế nào?',
      choices: [
        'Mua cổ phiếu giá thấp và chờ giá tăng để bán',
        'Vay cổ phiếu, bán ngay, sau đó mua lại khi giá giảm để trả và giữ chênh lệch',
        'Bán cổ phiếu trước ngày chốt danh sách cổ đông để hưởng cổ tức',
        'Bán 50% danh mục để giảm rủi ro trong giai đoạn thị trường bất ổn',
      ],
      answer: 1,
      explanation: 'Short Selling: (1) Vay cổ phiếu từ broker, (2) Bán ngay ở giá hiện tại, (3) Chờ giá giảm, (4) Mua lại để trả cổ phiếu → lãi = chênh lệch giá. Rủi ro LỚN: lỗ lý thuyết không giới hạn (giá cổ phiếu có thể tăng vô hạn). Phí vay cổ phiếu + margin call nếu giá tăng. Short squeeze: khi nhiều người short đồng loạt phải mua lại → giá tăng bùng nổ (ví dụ GameStop 2021). Tại Việt Nam, bán khống chưa được phép trực tiếp nhưng có thể thực hiện qua chứng quyền (CW).',
    },
    {
      stem: 'Chỉ số VIX (Volatility Index) thường được gọi là:',
      choices: [
        'Thước đo thanh khoản thị trường',
        '"Chỉ số sợ hãi" — đo biến động ngụ ý 30 ngày tới của S&P 500',
        'Tỷ lệ cổ phiếu tăng/giảm trong ngày',
        'Chỉ số độ tập trung của thị trường (top 10 cổ phiếu lớn nhất)',
      ],
      answer: 1,
      explanation: 'VIX do CBOE tính toán từ giá quyền chọn S&P 500, phản ánh kỳ vọng biến động 30 ngày tới: VIX < 20 = thị trường bình tĩnh, VIX 20–30 = lo lắng trung bình, VIX > 30 = sợ hãi/khủng hoảng. VIX đỉnh lịch sử: 80+ (tháng 10/2008 — Lehman Brothers), 82.69 (tháng 3/2020 — COVID-19). Đặc điểm: VIX có tương quan ÂM với S&P 500 — khi thị trường giảm mạnh, VIX tăng vọt. Nhà đầu tư dùng VIX futures hoặc ETF như VXX để hedge.',
    },
    {
      stem: 'Lý thuyết thị trường hiệu quả (EMH) dạng mạnh (Strong Form) cho rằng:',
      choices: [
        'Giá chứng khoán phản ánh tất cả thông tin công khai và riêng tư — không thể liên tục đánh bại thị trường',
        'Giá chứng khoán chỉ phản ánh thông tin lịch sử giá',
        'Chỉ những nhà đầu tư tổ chức mới có thể đánh bại thị trường',
        'Phân tích kỹ thuật có thể tạo lợi nhuận vượt trội',
      ],
      answer: 0,
      explanation: 'EMH có 3 dạng: (1) Weak form: giá phản ánh thông tin GIÁ LỊCH SỬ → phân tích kỹ thuật không hiệu quả; (2) Semi-strong form: giá phản ánh tất cả THÔNG TIN CÔNG KHAI → phân tích cơ bản không tạo lợi thế; (3) Strong form: giá phản ánh tất cả thông tin KỂ CẢ NỘI BỘ → insider trading cũng không lợi thế. Bằng chứng thực tế: hầu hết quỹ chủ động không đánh bại chỉ số (S&P 500) dài hạn, ủng hộ Semi-strong EMH; tuy nhiên các "anomalies" (momentum, value premium) cho thấy thị trường không hoàn toàn hiệu quả.',
    },
    {
      stem: 'Khi phân tích "Earnings Per Share (EPS)" của doanh nghiệp, EPS pha loãng (diluted EPS) khác với EPS cơ bản (basic EPS) ở chỗ:',
      choices: [
        'Diluted EPS loại trừ cổ tức ưu đãi khỏi lợi nhuận',
        'Diluted EPS tính thêm cổ phiếu tiềm năng từ quyền chọn, trái phiếu chuyển đổi — thường thấp hơn basic EPS',
        'Diluted EPS chỉ tính trong quý có phát hành thêm cổ phiếu mới',
        'Diluted EPS và basic EPS luôn bằng nhau nếu doanh nghiệp không chia cổ tức',
      ],
      answer: 1,
      explanation: 'Basic EPS = Lợi nhuận ròng / Số CP bình quân lưu hành. Diluted EPS = Lợi nhuận ròng / (Số CP lưu hành + Số CP tiềm năng từ stock options, warrants, convertible bonds). Diluted EPS luôn ≤ Basic EPS vì mẫu số lớn hơn. SEC (Mỹ) yêu cầu công bố cả hai. Nhà đầu tư thận trọng nên dùng DILUTED EPS vì nó phản ánh kịch bản "pha loãng tối đa" nếu tất cả quyền chọn được thực hiện.',
    },
  ],
};

// ─── EP03 · Vườn ươm khởi nghiệp ─────────────────────────
export const EP03_QUIZ = {
  id: 'EP03-startup-quiz',
  title: 'EP03 · Vườn ươm khởi nghiệp — Startup Incubator',
  kind: 'quiz',
  subject: 'startup-incubator', difficulty: 2,
  skillsTrained: ['startup-methodology', 'lean-canvas', 'fundraising', 'product-market-fit'],
  questions: [
    {
      stem: '"Product-Market Fit (PMF)" là khi nào?',
      choices: [
        'Khi sản phẩm đã có hơn 10.000 người dùng',
        'Khi phân khúc khách hàng mục tiêu thực sự muốn sản phẩm — sản phẩm giải quyết đúng pain point với quy mô thị trường đủ lớn',
        'Khi doanh nghiệp đạt điểm hoà vốn (break-even)',
        'Khi sản phẩm được báo chí đưa tin rộng rãi',
      ],
      answer: 1,
      explanation: 'PMF (Marc Andreessen, 2007) = trạng thái sản phẩm "fit" với nhu cầu thị trường: khách hàng tự tìm đến, NPS cao (Net Promoter Score ≥ 40), churn rate thấp, word-of-mouth tự nhiên. Sean Ellis Test: nếu ≥ 40% người dùng trả lời "rất thất vọng" khi không còn dùng sản phẩm → đạt PMF. Dấu hiệu: support tickets tăng (nhiều người dùng hơn), máy chủ crash, waiting list tự hình thành. Paul Graham: "PMF khi sản phẩm \'pulls\' người dùng thay vì phải \'push\' marketing."',
    },
    {
      stem: 'Lean Canvas khác với Business Model Canvas (BMC) chủ yếu ở chỗ:',
      choices: [
        'Lean Canvas chỉ dùng cho doanh nghiệp sản xuất, BMC cho dịch vụ',
        'Lean Canvas thay thế 4 khối của BMC (Key Partners, Customer Relationships, Channels, Key Activities) bằng các khối phù hợp hơn với startup (Problem, Solution, Key Metrics, Unfair Advantage)',
        'Lean Canvas dùng cho giai đoạn Series A trở lên, BMC cho giai đoạn seed',
        'Lean Canvas và BMC giống nhau hoàn toàn về nội dung',
      ],
      answer: 1,
      explanation: 'Lean Canvas (Ash Maurya, dựa trên BMC) tối ưu cho startup: thay Customer Relationships → Problem (vấn đề khách hàng gặp phải); Channels → Solution (giải pháp của bạn); Key Activities → Key Metrics (chỉ số đo lường); Key Partners → Unfair Advantage (lợi thế độc đáo khó sao chép). Lý do: startup giai đoạn sớm cần tập trung vào BÁC BỎ giả thuyết, không phải quản lý đối tác. Lean Canvas có thể điền trong 20 phút và cập nhật liên tục khi học được từ thị trường.',
    },
    {
      stem: 'Vòng gọi vốn "Series A" thường dành cho startup:',
      choices: [
        'Đang ở giai đoạn ý tưởng, chưa có sản phẩm',
        'Đã có MVP, đã kiểm chứng PMF và tăng trưởng người dùng, cần vốn để scale',
        'Chuẩn bị IPO (niêm yết trên sàn chứng khoán)',
        'Mới thành lập, cần tiền để xây đội nhóm ban đầu',
      ],
      answer: 1,
      explanation: 'Roadmap gọi vốn điển hình: Pre-seed (< $500K): ý tưởng + nhóm sáng lập → Seed ($500K–$2M): MVP + early traction → Series A ($2M–$15M): PMF đã chứng minh, model kinh doanh rõ ràng, cần scale marketing & sales → Series B ($15M–$50M): tăng tốc tăng trưởng, mở rộng thị trường → Series C+: chuẩn bị M&A hoặc IPO. Nhà đầu tư Series A muốn thấy: growth metrics (MoM ≥ 10–20%), unit economics dương hoặc có lộ trình, đội ngũ strong.',
    },
    {
      stem: '"Minimum Viable Product (MVP)" theo phương pháp Lean Startup nghĩa là:',
      choices: [
        'Sản phẩm hoàn chỉnh nhất có thể với team hiện tại',
        'Phiên bản đơn giản nhất của sản phẩm có thể kiểm chứng giả thuyết quan trọng nhất với chi phí tối thiểu',
        'Sản phẩm phải có đủ 80% tính năng so với đối thủ cạnh tranh',
        'Prototype dùng để demo cho nhà đầu tư (không dành cho khách hàng thực)',
      ],
      answer: 1,
      explanation: 'MVP (Eric Ries, "The Lean Startup") không phải sản phẩm tệ nhất có thể — mà là thực nghiệm ÍT TỐN KÉM NHẤT để kiểm chứng giả thuyết quan trọng nhất. Vòng lặp: Build → Measure → Learn → Build. Ví dụ MVP: Dropbox dùng video demo (2007) trước khi code; Airbnb chủ nhà đầu tiên là chính founder; Zappos chụp ảnh giày từ cửa hàng offline trước khi xây kho. Nguyên tắc: ship sớm, học nhanh, pivot kịp thời. "If you\'re not embarrassed by the first version of your product, you shipped too late." — Reid Hoffman.',
    },
    {
      stem: 'Term Sheet trong gọi vốn venture capital thường không bao gồm điều khoản nào sau đây?',
      choices: [
        'Liquidation preference (ưu tiên thanh lý)',
        'Anti-dilution protection (bảo vệ pha loãng)',
        'Kết quả kinh doanh dự báo 5 năm tới (guaranteed projections)',
        'Board composition (cơ cấu HĐQT)',
      ],
      answer: 2,
      explanation: 'Term Sheet là tài liệu KHÔNG RÀNG BUỘC pháp lý (non-binding) tóm tắt các điều khoản chính: Valuation (định giá), Investment amount, Liquidation preference (VD: 1× hoặc 2× participating), Anti-dilution (weighted average hoặc ratchet), Pro-rata rights (quyền đầu tư thêm vòng sau), Board seats, Drag-along / tag-along rights, ESOP pool. Dự báo tài chính là ước tính của startup, KHÔNG ai đảm bảo — VCs biết điều này và đánh giá team + thị trường, không phải số dự báo 5 năm. Đây không phải là điều khoản trong term sheet.',
    },
    {
      stem: 'Mô hình kinh doanh "Freemium" hoạt động dựa trên nguyên tắc:',
      choices: [
        'Cung cấp sản phẩm miễn phí hoàn toàn cho tất cả người dùng, thu phí từ quảng cáo',
        'Cung cấp tier cơ bản miễn phí (acquisition), thu phí cho tính năng nâng cao (monetization)',
        'Miễn phí trong 30 ngày đầu, sau đó bắt buộc trả phí',
        'Miễn phí với người dùng cá nhân, tính phí doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Freemium (free + premium): cung cấp giá trị cốt lõi MIỄN PHÍ để thu hút người dùng → chuyển đổi % nhỏ sang gói có phí. Tỷ lệ chuyển đổi ngành điển hình: Spotify ~26%, Dropbox ~4%, LinkedIn ~22%. Thách thức: phải đủ giá trị để người dùng quay lại, nhưng đủ "friction" để upgrade lên premium. Ví dụ VN: Zalo có gói ZaloPay premium, VNPT có dịch vụ cloud miễn phí giới hạn. PLG (Product-Led Growth) là xu hướng: chính sản phẩm Freemium làm kênh acquisition thay vì sales.',
    },
    {
      stem: '"Cap Table" (Capitalization Table) của startup thể hiện:',
      choices: [
        'Bảng kế hoạch tăng trưởng doanh thu theo quý',
        'Danh sách tất cả chủ sở hữu vốn (cổ đông, nhà đầu tư, ESOP pool) và tỷ lệ sở hữu của họ',
        'Bảng hạn mức chi tiêu của từng phòng ban',
        'Danh sách các nhà đầu tư đã từ chối startup',
      ],
      answer: 1,
      explanation: 'Cap Table = bảng theo dõi AI SỠHỮU bao nhiêu % công ty theo thời gian, qua các vòng gọi vốn. Gồm: Founders, Employees (ESOP/Stock Options), Angels, VCs, Convertible Notes holders. Mỗi vòng gọi vốn mới làm DILUTE (pha loãng) tỷ lệ của mọi người. Ví dụ: Founder sở hữu 100% → sau seed -30% → còn 70% → sau Series A -20% → còn 56%. Cap Table phức tạp hơn khi có convertible notes, SAFEs, liquidation preferences khác nhau. Công cụ quản lý phổ biến: Carta, Pulley, Captable.io.',
    },
    {
      stem: 'Steve Blank định nghĩa "Customer Development" gồm mấy bước?',
      choices: ['2', '3', '4', '6'],
      answer: 2,
      explanation: '"Customer Development" (Steve Blank, 2005) — gồm 4 bước: (1) Customer Discovery: xác nhận vấn đề khách hàng thực sự gặp phải (thoát khỏi văn phòng!); (2) Customer Validation: kiểm chứng mô hình kinh doanh với khách hàng trả tiền đầu tiên; (3) Customer Creation: tạo cầu và kéo khách hàng vào phễu (sau khi biết "vòng lặp" hoạt động); (4) Company Building: chuyển từ "startup learning mode" → "execution company". Bước 1-2 là "Search" (tìm kiếm mô hình), bước 3-4 là "Execution" (thực thi). Lean Startup của Eric Ries xây dựng trên nền tảng này.',
    },
    {
      stem: 'Chỉ số "Burn Rate" và "Runway" của startup có nghĩa gì?',
      choices: [
        'Tốc độ tăng trưởng doanh thu và thời gian đạt break-even',
        'Burn Rate = tiền chi ra mỗi tháng (net burn); Runway = số tháng còn dùng được với lượng tiền hiện có',
        'Tỷ lệ nhân viên nghỉ việc và thời gian để tuyển dụng thay thế',
        'Chi phí marketing và thời gian hoàn vốn một chiến dịch quảng cáo',
      ],
      answer: 1,
      explanation: 'Gross Burn = tổng chi phí mỗi tháng. Net Burn = Gross Burn − Revenue (tiền thực sự mất). Runway = Tiền trong tài khoản / Net Burn Rate (tính bằng tháng). Ví dụ: có $500K, net burn $50K/tháng → runway = 10 tháng. Best practice: luôn biết runway và bắt đầu fundraise khi còn 6+ tháng runway (fundraising thường mất 3–6 tháng). Paul Graham: "Default alive" = startup sẽ có lãi trước khi hết tiền nếu giữ nguyên tốc độ tăng trưởng. "Default dead" = cần thêm vốn để tồn tại.',
    },
    {
      stem: 'Chiến lược "Go-to-Market (GTM)" của startup cần xác định:',
      choices: [
        'Chỉ cần xác định giá bán sản phẩm',
        'Phân khúc khách hàng mục tiêu, kênh phân phối, thông điệp giá trị, chiến lược bán hàng và mô hình doanh thu phù hợp',
        'Kế hoạch marketing trên mạng xã hội trong 6 tháng đầu',
        'Số lượng nhân viên sales cần tuyển dụng',
      ],
      answer: 1,
      explanation: 'GTM Strategy là kế hoạch tổng thể đưa sản phẩm ra thị trường: (1) ICP (Ideal Customer Profile) — hồ sơ khách hàng lý tưởng; (2) Value Proposition — tại sao khách chọn bạn thay vì đối thủ; (3) Pricing Model — freemium, subscription, usage-based, enterprise; (4) Sales Motion — self-serve, inside sales, field sales, channel partners; (5) Marketing Channels — SEO, content, paid, events, community. GTM khác Product-Market Fit: PMF là sản phẩm đúng thị trường; GTM là cách TIẾP CẬN thị trường đó hiệu quả.',
    },
  ],
};

// ─── EP04 · FinTech Lab — Mobile Banking ──────────────────
export const EP04_QUIZ = {
  id: 'EP04-fintech-quiz',
  title: 'EP04 · FinTech Lab — Mobile Banking',
  kind: 'quiz',
  subject: 'fintech-lab', difficulty: 2,
  skillsTrained: ['digital-banking', 'open-banking', 'payment-systems', 'digital-finance'],
  questions: [
    {
      stem: 'Open Banking (Ngân hàng Mở) cho phép:',
      choices: [
        'Ngân hàng chia sẻ dữ liệu khách hàng với bên thứ ba thông qua API có sự đồng ý của khách hàng',
        'Bất kỳ ai đều có thể mở tài khoản ngân hàng mà không cần giấy tờ',
        'Ngân hàng mở chi nhánh 24/7 không cần nhân viên',
        'Khách hàng có thể rút tiền mặt từ bất kỳ ATM nào miễn phí',
      ],
      answer: 0,
      explanation: 'Open Banking = ngân hàng chia sẻ dữ liệu tài chính của khách hàng với bên thứ ba (Fintech, công ty công nghệ) thông qua API chuẩn hoá, với điều kiện khách hàng đồng ý (PSD2 tại EU). Mở ra hệ sinh thái: (1) Account Aggregation — tổng hợp tài khoản nhiều ngân hàng; (2) Personal Finance Management; (3) Instant Payment; (4) Embedded Finance. Tại Việt Nam, NHNN có Thông tư 09/2020 về Open API. Ví dụ: MoMo, ZaloPay kết nối hàng chục ngân hàng qua Open Banking API.',
    },
    {
      stem: 'Hệ thống thanh toán "NAPAS" ở Việt Nam có chức năng chính là:',
      choices: [
        'Phát hành thẻ tín dụng cho người tiêu dùng',
        'Hạ tầng thanh toán liên ngân hàng: chuyển tiền nhanh, thanh toán thẻ nội địa, ACH',
        'Cung cấp dịch vụ cho vay ngang hàng (P2P Lending)',
        'Quản lý ngoại hối và tỷ giá hối đoái',
      ],
      answer: 1,
      explanation: 'NAPAS (National Payment Corporation of Vietnam) = Công ty cổ phần Thanh toán Quốc gia Việt Nam, được NHNN thành lập 2014. Vai trò: (1) Xử lý liên ngân hàng (interbank): chuyển tiền 24/7 qua IBFT; (2) Thẻ NAPAS: hệ thống kết nối 19.000+ ATM và 300.000+ POS; (3) Bù trừ & quyết toán: ACH (Automated Clearing House) cho giao dịch bán lẻ; (4) QR Code NAPAS: tiêu chuẩn QR thống nhất cho các ngân hàng và ví điện tử. NAPAS xử lý hàng triệu giao dịch/ngày.',
    },
    {
      stem: '"Buy Now, Pay Later (BNPL)" là mô hình:',
      choices: [
        'Mua trả góp truyền thống qua thẻ tín dụng ngân hàng',
        'Thanh toán ngay, nhận hàng sau khi hàng có hàng',
        'Chia nhỏ thanh toán (thường 3–4 lần, 0% lãi cho người mua) — fintech thu phí từ merchant',
        'Vay tiền mặt nhanh qua ứng dụng điện thoại',
      ],
      answer: 2,
      explanation: 'BNPL (Klarna, Afterpay, Affirm, Kredivo, FE Credit VN): người mua chia đơn hàng thành 3–6 lần trả, thường không lãi (0% APR nếu trả đúng hạn). Nguồn thu: merchant discount rate (MDR) 2–6% từ merchant, phí phạt trễ hạn từ người mua. Tăng trưởng: GMV BNPL toàn cầu dự kiến $576B vào 2026. Rủi ro: risk tín dụng cao với phân khúc người dùng có lịch sử tín dụng hạn chế; regulation tại nhiều nước tăng cường kiểm soát (CFPB Mỹ, FCA UK). Tại VN: Kredivo, Movi (Finhay), Fundiin, VNPAY BNPL.',
    },
    {
      stem: 'KYC (Know Your Customer) trong tài chính là quy trình:',
      choices: [
        'Khảo sát mức độ hài lòng của khách hàng sau khi mở tài khoản',
        'Xác minh danh tính và đánh giá rủi ro khách hàng để tuân thủ AML/CFT',
        'Phân tích hành vi chi tiêu để cá nhân hóa sản phẩm',
        'Tư vấn tài chính cá nhân hóa dựa trên mục tiêu khách hàng',
      ],
      answer: 1,
      explanation: 'KYC là yêu cầu PHÁP LÝ: xác minh danh tính khách hàng (CCCD/Passport), xác minh địa chỉ, đánh giá rủi ro (risk-based approach). AML = Anti-Money Laundering; CFT = Counter-Financing of Terrorism. eKYC (electronic KYC): định danh từ xa qua OCR (nhận diện CCCD), liveness detection (nhận diện khuôn mặt sống). Tại VN: Thông tư 16/2020 cho phép eKYC qua video call; NHNN và NAPAS thúc đẩy eKYC để phổ cập tài chính. Phạt vi phạm KYC: hàng triệu USD (HSBC bị phạt $1.9B năm 2012).',
    },
    {
      stem: 'Ví điện tử (E-wallet) khác với Ngân hàng số (Neobank) như thế nào?',
      choices: [
        'Ví điện tử không cần internet, Neobank cần kết nối 24/7',
        'Ví điện tử là lớp middleware (trung gian thanh toán), không giữ tiền; Neobank là ngân hàng thực sự (có license) nhận tiền gửi và cho vay',
        'Ví điện tử dành cho cá nhân, Neobank chỉ phục vụ doanh nghiệp',
        'Ví điện tử được chính phủ bảo đảm, Neobank không được bảo hiểm tiền gửi',
      ],
      answer: 1,
      explanation: 'E-wallet (MoMo, ZaloPay, VNPay): lưu trữ giá trị điện tử (float), kết nối ngân hàng qua NAPAS. Không phải ngân hàng → không nhận tiền gửi chính thức, không cho vay (trừ hợp tác với ngân hàng). License: Tổ chức Cung ứng Dịch vụ Trung gian Thanh toán (NHNN). Neobank (Cake by VPBank, Timo, TNEX): ngân hàng THỰC SỰ không có chi nhánh vật lý, 100% digital. Có license ngân hàng → nhận tiền gửi (bảo hiểm tiền gửi), cho vay, phát hành thẻ tín dụng. Global: Revolut, N26, Nubank, Monzo.',
    },
    {
      stem: 'Blockchain trong tài chính được ứng dụng nhiều nhất cho:',
      choices: [
        'Lưu trữ mật khẩu ngân hàng của khách hàng',
        'Thanh toán xuyên biên giới (cross-border), smart contracts, tokenization tài sản và DeFi',
        'Thay thế toàn bộ hệ thống core banking truyền thống',
        'Chấm điểm tín dụng khách hàng',
      ],
      answer: 1,
      explanation: 'Ứng dụng blockchain trong FinTech: (1) Cross-border payment: RippleNet (XRP) giảm chi phí và thời gian chuyển tiền quốc tế từ 3–5 ngày còn vài giây; (2) Smart Contracts (Ethereum): tự động thực thi hợp đồng tài chính (trái phiếu, swap, thanh lý collateral); (3) Tokenization: biến tài sản thực (bất động sản, nghệ thuật, cổ phiếu) thành token số; (4) DeFi (Decentralized Finance): lending, staking, yield farming không qua ngân hàng; (5) CBDC: tiền kỹ thuật số ngân hàng trung ương (Việt Nam đang thí điểm nghiên cứu). Hạn chế: scalability, regulation, energy consumption (PoW).',
    },
    {
      stem: 'API (Application Programming Interface) trong FinTech cho phép:',
      choices: [
        'Tăng tốc độ xử lý giao dịch trong nội bộ ngân hàng',
        'Kết nối hệ thống khác nhau để chia sẻ dữ liệu và chức năng theo chuẩn hoá — nền tảng của Open Banking và Embedded Finance',
        'Mã hoá dữ liệu thẻ tín dụng để tránh gian lận',
        'Tự động điều chỉnh lãi suất theo thị trường',
      ],
      answer: 1,
      explanation: 'FinTech API là "cầu nối" cho phép ứng dụng bên thứ ba giao tiếp với hệ thống ngân hàng an toàn. RESTful API + OAuth 2.0 + JSON là chuẩn phổ biến nhất. Use cases: Stripe API (thanh toán trong 7 dòng code), Plaid API (kết nối tài khoản ngân hàng cho app), VNPay API (thanh toán QR cho merchant). Embedded Finance: tích hợp dịch vụ tài chính vào app phi tài chính (ví dụ: Grab Pay, mua bảo hiểm trong app Shopee). API monetization: ngân hàng thu phí API hoặc revenue share từ FinTech partner.',
    },
    {
      stem: 'RegTech (Regulatory Technology) trong ngành tài chính giải quyết bài toán gì?',
      choices: [
        'Phát triển sản phẩm tài chính mới nhanh hơn',
        'Tự động hóa tuân thủ pháp lý (compliance): AML, KYC, báo cáo giám sát — giảm chi phí và rủi ro',
        'Cung cấp hạ tầng đám mây cho ngân hàng',
        'Phân tích dữ liệu thị trường chứng khoán',
      ],
      answer: 1,
      explanation: 'RegTech dùng AI/ML/Big Data để tuân thủ pháp lý tự động: (1) AML Screening: quét giao dịch nghi ngờ rửa tiền theo thời gian thực (thay vì manual review); (2) eKYC: xác minh danh tính tự động qua OCR + facial recognition; (3) Transaction Monitoring: phát hiện bất thường; (4) Regulatory Reporting: tự động tổng hợp báo cáo theo yêu cầu NHNN/Bộ Tài chính. Chi phí compliance toàn cầu: ngân hàng lớn chi $3–5 tỷ USD/năm. RegTech giảm chi phí 30–50%. Công ty RegTech VN: TrustID (eKYC), Trusting Social (credit scoring AI).',
    },
    {
      stem: 'Mô hình kinh doanh "Insurance-as-a-Service (IaaS)" hay "Embedded Insurance" cho phép:',
      choices: [
        'Công ty bảo hiểm cung cấp dịch vụ đám mây cho ngân hàng',
        'Tích hợp bảo hiểm vào luồng mua hàng/dịch vụ của bên thứ ba thông qua API — khách hàng mua bảo hiểm ngay tại điểm giao dịch',
        'Ngân hàng bán bảo hiểm qua teller (bancassurance truyền thống)',
        'Chính phủ cung cấp bảo hiểm miễn phí cho người có thu nhập thấp',
      ],
      answer: 1,
      explanation: 'Embedded Insurance = bảo hiểm được tích hợp liền mạch vào journey mua hàng: (1) Mua vé máy bay trên Traveloka → tự động đề xuất bảo hiểm chuyến đi; (2) Mua điện thoại trên Shopee → bảo hiểm vỡ màn hình; (3) Gọi xe Grab → bảo hiểm tai nạn cho chuyến đi; (4) Vay mua nhà → bảo hiểm tài sản. Công nghệ: bảo hiểm chia theo mét vuông, theo km, theo chuyến bay (usage-based). Tại VN: Manulife Việt Nam × MoMo; FPT Play × Bảo Minh; ViettelPay × PTI. Conversion rate cao hơn 3–5× so với kênh truyền thống vì đúng lúc, đúng nhu cầu.',
    },
    {
      stem: 'Chỉ số "Net Promoter Score (NPS)" trong FinTech được dùng để:',
      choices: [
        'Đo lường tốc độ xử lý giao dịch của hệ thống',
        'Đo lường mức độ sẵn sàng giới thiệu sản phẩm/dịch vụ của khách hàng — proxy tốt cho customer loyalty và growth',
        'Tính toán lợi nhuận thuần từ phí dịch vụ tài chính',
        'So sánh hiệu quả của các kênh marketing',
      ],
      answer: 1,
      explanation: 'NPS = % Promoters (điểm 9–10) − % Detractors (điểm 0–6). Câu hỏi: "Bạn có sẵn sàng giới thiệu [dịch vụ] cho bạn bè/đồng nghiệp không? (0–10)". NPS > 50 = xuất sắc; NPS > 70 = đẳng cấp thế giới. Benchmark FinTech: Revolut NPS ≈ 70+; N26 ≈ 50+; ngân hàng truyền thống trung bình ≈ 20–30. NPS tương quan với tăng trưởng vì word-of-mouth: mỗi điểm NPS tăng 1 → doanh thu tăng tương ứng. Hạn chế: NPS bị ảnh hưởng bởi thời điểm hỏi (sau trải nghiệm tốt/xấu).',
    },
  ],
};

export const ECONOMICS_PRACTICE_SCENARIOS = {
  [EP01_QUIZ.id]: EP01_QUIZ,
  [EP02_QUIZ.id]: EP02_QUIZ,
  [EP03_QUIZ.id]: EP03_QUIZ,
  [EP04_QUIZ.id]: EP04_QUIZ,
};
