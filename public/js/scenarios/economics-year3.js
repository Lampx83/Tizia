// ============================================================
// Trường Kinh tế — Scenarios Năm 3 (E3.1–E3.7)
// ============================================================
// Soạn theo chương trình cử nhân Kinh tế VN (NEU, FTU, UEH).
// Mỗi câu có explanation để sinh viên hiểu rõ sau khi trả lời.
// 7 module × 10 câu = 70 câu hỏi.
// ============================================================

// ─── E3.1 · Kinh tế lượng ────────────────────────────────────
export const E31_QUIZ = {
  id: 'E3.1-econometrics-quiz',
  title: 'E3.1 · Kinh tế lượng — Hồi quy & Kiểm định thống kê',
  kind: 'quiz',
  yearLevel: 3, subject: 'kinh-te-luong', difficulty: 3,
  skillsTrained: ['ols', 'kiem-dinh-thong-ke', 'du-lieu-bang', 'phan-tich-hoi-quy'],
  questions: [
    {
      stem: 'Giả định QUAN TRỌNG NHẤT của ước lượng OLS (Ordinary Least Squares) để hệ số ước lượng không chệch (unbiased) là:',
      choices: [
        'Phân phối chuẩn của sai số',
        'Kỳ vọng của sai số bằng 0 — E(ε|X) = 0',
        'Phương sai sai số không đổi (homoskedasticity)',
        'Không có tự tương quan (no autocorrelation)',
      ],
      answer: 1,
      explanation: 'Điều kiện E(ε|X) = 0 (exogeneity) là điều kiện đủ để OLS cho ước lượng không chệch. Nếu biến giải thích X tương quan với sai số ε (endogeneity) thì ước lượng OLS sẽ bị chệch (biased) và không nhất quán (inconsistent). Phân phối chuẩn và homoskedasticity ảnh hưởng đến kiểm định t/F và hiệu quả (efficiency) chứ không phải tính không chệch.',
    },
    {
      stem: 'Trong hồi quy đơn giản Y = β₀ + β₁X + ε, hệ số β₁ = 2,5 có nghĩa là:',
      choices: [
        'Khi X tăng 1 đơn vị, Y tăng trung bình 2,5 đơn vị, ceteris paribus',
        'Khi X tăng 2,5 đơn vị, Y tăng 1 đơn vị',
        'X và Y có hệ số tương quan Pearson r = 2,5',
        'Mô hình giải thích được 2,5% biến động của Y',
      ],
      answer: 0,
      explanation: 'β₁ là hệ số góc (slope coefficient): khi X tăng 1 đơn vị thì Y thay đổi β₁ đơn vị, giữ nguyên các yếu tố khác (ceteris paribus). Đây là diễn giải tiêu chuẩn của hệ số hồi quy trong mô hình tuyến tính. Lưu ý: hệ số tương quan Pearson r nằm trong [-1, 1]; R² (hệ số xác định) mới đo phần giải thích của mô hình.',
    },
    {
      stem: 'Đa cộng tuyến (Multicollinearity) trong hồi quy bội xảy ra khi:',
      choices: [
        'Sai số hồi quy có phân phối không chuẩn',
        'Các biến độc lập có tương quan cao với nhau',
        'Phương sai sai số thay đổi theo X',
        'Sai số có tương quan theo thời gian',
      ],
      answer: 1,
      explanation: 'Đa cộng tuyến xảy ra khi 2+ biến độc lập tương quan mạnh với nhau (VIF > 10 thường được coi là ngưỡng nghiêm trọng). Hậu quả: ước lượng β vẫn không chệch nhưng sai số chuẩn tăng lớn → t-statistic nhỏ → khó bác bỏ H₀ dù mô hình chung có ý nghĩa (F lớn, R² cao). Giải pháp: loại bỏ biến dư thừa, thu thêm dữ liệu, hoặc dùng ridge regression.',
    },
    {
      stem: 'Kiểm định Breusch-Pagan (BP test) dùng để phát hiện:',
      choices: [
        'Đa cộng tuyến giữa các biến độc lập',
        'Phương sai sai số thay đổi (Heteroskedasticity)',
        'Tự tương quan bậc 1 của sai số (AR(1))',
        'Dạng hàm sai (Functional form misspecification)',
      ],
      answer: 1,
      explanation: 'Breusch-Pagan test và White test đều phát hiện heteroskedasticity (phương sai sai số không đồng nhất — Var(εᵢ) ≠ const). Khi có heteroskedasticity, OLS vẫn không chệch nhưng không còn hiệu quả nhất (BLUE fails); sai số chuẩn thông thường bị chệch → kiểm định t/F sai. Giải pháp: dùng Robust Standard Errors (HC) hoặc GLS/WLS.',
    },
    {
      stem: 'Thống kê Durbin-Watson (DW) gần bằng 2 cho thấy:',
      choices: [
        'Mô hình có R² cao',
        'Không có tự tương quan bậc 1 trong phần dư (no first-order autocorrelation)',
        'Có đa cộng tuyến nghiêm trọng',
        'Phương sai sai số thay đổi mạnh',
      ],
      answer: 1,
      explanation: 'DW = 2(1 − ρ) trong đó ρ là hệ số tự tương quan bậc 1. DW ≈ 2 → ρ ≈ 0 → không có autocorrelation. DW ≈ 0 → tự tương quan dương mạnh; DW ≈ 4 → tự tương quan âm mạnh. Tự tương quan thường gặp trong chuỗi thời gian: khi εₜ và εₜ₋₁ tương quan, OLS không còn hiệu quả và sai số chuẩn bị sai lệch.',
    },
    {
      stem: 'Trong hồi quy bội, kiểm định F tổng thể (overall F-test) kiểm định:',
      choices: [
        'Từng hệ số hồi quy có ý nghĩa thống kê không',
        'Đồng thời tất cả hệ số độc lập (trừ hằng số) đều bằng 0: H₀: β₁ = β₂ = … = βₖ = 0',
        'Mô hình có phương sai không đổi không',
        'Phần dư có phân phối chuẩn không',
      ],
      answer: 1,
      explanation: 'F-test tổng thể: H₀: β₁ = β₂ = … = βₖ = 0 (mô hình không có ý nghĩa); H₁: ít nhất 1 βⱼ ≠ 0. F = (ESS/k) / (RSS/(n−k−1)). Nếu F > F_critical → bác bỏ H₀, mô hình có ý nghĩa tổng thể. Kiểm định t riêng lẻ kiểm tra từng hệ số. Có thể xảy ra: F significant nhưng một số t không (do đa cộng tuyến).',
    },
    {
      stem: 'Hệ số xác định R² = 0,75 có nghĩa là:',
      choices: [
        'Mô hình hồi quy dự báo đúng 75% trường hợp',
        '75% biến động của biến phụ thuộc Y được giải thích bởi các biến độc lập trong mô hình',
        'Hệ số tương quan giữa Y và Ŷ bằng 0,75',
        'Sai số ước lượng trung bình là 25%',
      ],
      answer: 1,
      explanation: 'R² = ESS/TSS = 1 − RSS/TSS. R² = 0,75 nghĩa là 75% tổng biến động (variance) của Y xung quanh trung bình được giải thích bởi mô hình; 25% còn lại do sai số/yếu tố chưa đưa vào. R² không cho biết mô hình đúng hay nhân quả; R² cao không đảm bảo mô hình tốt (ví dụ: R² giả tạo trong hồi quy biến không dừng I(1)). Dùng Adjusted R² khi so sánh mô hình có số biến khác nhau.',
    },
    {
      stem: 'Biến nội sinh (endogenous variable) trong mô hình hồi quy xảy ra khi:',
      choices: [
        'Biến độc lập X tương quan với sai số ε → ước lượng OLS bị chệch và không nhất quán',
        'Biến phụ thuộc Y có phân phối không chuẩn',
        'Mô hình có quá nhiều biến (over-fitted)',
        'Có missing values trong dữ liệu',
      ],
      answer: 0,
      explanation: 'Endogeneity: Cov(X, ε) ≠ 0 vi phạm giả định cơ bản của OLS. Nguyên nhân phổ biến: nhân quả ngược (reverse causality — Y ảnh hưởng lại X), biến bỏ sót (omitted variable), sai số đo lường (measurement error). Giải pháp: dùng Biến Công cụ (Instrumental Variables — IV / 2SLS): tìm biến Z tương quan với X nhưng không tương quan trực tiếp với ε.',
    },
    {
      stem: 'Trong phân tích dữ liệu bảng (Panel Data), Kiểm định Hausman được dùng để:',
      choices: [
        'Phát hiện heteroskedasticity trong dữ liệu bảng',
        'Lựa chọn giữa mô hình Fixed Effects (FE) và Random Effects (RE)',
        'Kiểm định tính dừng (stationarity) của chuỗi thời gian',
        'Xác định số lag tối ưu trong mô hình AR',
      ],
      answer: 1,
      explanation: 'Hausman test: H₀: FE và RE cho ước lượng giống nhau (RE nhất quán). Nếu bác bỏ H₀ → tác động cá nhân (αᵢ) tương quan với Xᵢₜ → phải dùng FE; nếu không bác bỏ → RE hiệu quả hơn (dùng thêm thông tin về variation giữa các cá thể). FE kiểm soát heterogeneity không quan sát được bằng cách sử dụng variation within (theo thời gian), RE xem αᵢ là ngẫu nhiên, không tương quan với X.',
    },
    {
      stem: 'Hồi quy giả tạo (Spurious Regression) thường xảy ra khi:',
      choices: [
        'Mô hình có quá ít quan sát',
        'Hồi quy hai chuỗi thời gian không dừng (non-stationary, I(1)) không đồng tích hợp',
        'Dữ liệu có phân phối không chuẩn',
        'Mô hình bị thiếu biến (underspecified)',
      ],
      answer: 1,
      explanation: 'Spurious regression: nếu Y và X đều là I(1) (random walk) và KHÔNG đồng tích hợp (cointegrated), hồi quy OLS sẽ cho R² cao và t lớn dù thực tế không có mối quan hệ kinh tế thực sự. Nghiệm định nghiệm đơn vị (ADF test) trước, rồi kiểm định đồng tích hợp (Engle-Granger / Johansen). Nếu đồng tích hợp → hồi quy không giả tạo và có thể dùng EC model (Error Correction Model).',
    },
  ],
};

// ─── E3.2 · Tài chính doanh nghiệp ──────────────────────────
export const E32_QUIZ = {
  id: 'E3.2-corporate-finance-quiz',
  title: 'E3.2 · Tài chính doanh nghiệp — NPV, WACC & Cấu trúc vốn',
  kind: 'quiz',
  yearLevel: 3, subject: 'tai-chinh-doanh-nghiep', difficulty: 3,
  skillsTrained: ['npv-irr', 'wacc', 'capital-structure', 'capm', 'free-cash-flow'],
  questions: [
    {
      stem: 'Dự án A có NPV = 200 triệu đồng và IRR = 15%. Chi phí vốn (WACC) = 12%. Quyết định đầu tư đúng là:',
      choices: [
        'Từ chối vì IRR chỉ 15%, không đủ hấp dẫn',
        'Chấp nhận vì NPV > 0 và IRR > WACC',
        'Từ chối vì chưa biết Payback Period',
        'Chấp nhận chỉ khi NPV > 500 triệu',
      ],
      answer: 1,
      explanation: 'Nguyên tắc đầu tư: Chấp nhận dự án khi NPV > 0 (tạo giá trị cho cổ đông) VÀ IRR > WACC (suất sinh lời vượt chi phí vốn). Cả hai tiêu chí đều thỏa → đầu tư là hợp lý. Lưu ý: NPV được ưu tiên hơn IRR vì IRR có thể có nhiều nghiệm (multiple IRRs) với dự án phi thông thường (non-conventional cash flows), và IRR giả định tái đầu tư ở chính mức IRR đó (không thực tế).',
    },
    {
      stem: 'WACC (Weighted Average Cost of Capital) của một doanh nghiệp được tính như sau:',
      choices: [
        'WACC = Kd × D + Ke × E',
        'WACC = Kd × (D/V) × (1−t) + Ke × (E/V), trong đó V = D + E',
        'WACC = (Kd + Ke) / 2',
        'WACC = Ke × (E/D)',
      ],
      answer: 1,
      explanation: 'WACC = Kd(1−t) × D/V + Ke × E/V, trong đó: Kd = chi phí nợ trước thuế, t = thuế suất thuế TNDN (lãi vay được khấu trừ thuế → tấm chắn thuế), Ke = chi phí vốn chủ sở hữu (thường tính bằng CAPM), D = giá trị nợ, E = giá trị vốn CSH, V = D + E. WACC là suất chiết khấu dùng trong NPV cho dự án có rủi ro tương tự toàn doanh nghiệp.',
    },
    {
      stem: 'Theo lý thuyết Modigliani-Miller (MM) trong thế giới không có thuế và không có chi phí kiệt tài chính, cấu trúc vốn (tỷ lệ nợ/vốn):',
      choices: [
        'Ảnh hưởng lớn đến giá trị doanh nghiệp — nhiều nợ = giá trị cao hơn',
        'Không ảnh hưởng đến giá trị doanh nghiệp (capital structure irrelevance)',
        'Ảnh hưởng lớn — nhiều nợ = giá trị thấp hơn do rủi ro vỡ nợ',
        'Tỷ lệ nợ 50/50 luôn là tối ưu',
      ],
      answer: 1,
      explanation: 'MM Proposition I (no taxes): Vᴸ = Vᵤ — giá trị doanh nghiệp có vay nợ = doanh nghiệp không vay nợ. Giá trị phụ thuộc tài sản thực (khả năng sinh lợi), không phải cách tài trợ. Với thuế (MM Prop I + taxes): Vᴸ = Vᵤ + tD (tấm chắn thuế tạo giá trị). Trade-off theory kết hợp thêm chi phí kiệt tài chính (financial distress) để tìm cấu trúc tối ưu. Trong thực tế DN có điểm tối ưu giữa lợi ích tấm chắn thuế và chi phí distress.',
    },
    {
      stem: 'Beta (β) trong mô hình CAPM đo lường:',
      choices: [
        'Suất sinh lời kỳ vọng tuyệt đối của tài sản',
        'Rủi ro hệ thống (systematic risk) của tài sản so với thị trường — độ nhạy cảm với biến động thị trường',
        'Rủi ro phi hệ thống (unsystematic/idiosyncratic risk)',
        'Tỷ suất cổ tức (dividend yield) của cổ phiếu',
      ],
      answer: 1,
      explanation: 'CAPM: E(Rᵢ) = Rf + βᵢ × [E(Rₘ) − Rf]. Beta = Cov(Rᵢ, Rₘ) / Var(Rₘ). β > 1: tài sản biến động mạnh hơn thị trường (aggressive); β = 1: biến động cùng thị trường; β < 1: biến động nhẹ hơn (defensive); β < 0: biến động ngược thị trường (rare). Rủi ro phi hệ thống (công ty cụ thể) có thể đa dạng hoá (diversify) — CAPM không bù rủi ro này.',
    },
    {
      stem: 'Free Cash Flow to Firm (FCFF) được tính bằng:',
      choices: [
        'EBITDA − Thuế − ΔWorking Capital − CapEx',
        'Net Income + Khấu hao',
        'EBIT × (1−t) + Khấu hao − ΔWorking Capital − CapEx',
        'Operating Cash Flow − Dividends',
      ],
      answer: 2,
      explanation: 'FCFF = EBIT×(1−t) + D&A − ΔNWC − CapEx, trong đó: EBIT×(1−t) = NOPAT (Net Operating Profit After Tax), D&A = khấu hao (non-cash add-back), ΔNWC = thay đổi vốn lưu động thuần, CapEx = đầu tư tài sản cố định. FCFF là dòng tiền tự do dành cho cả chủ nợ và cổ đông (sau thuế, trước thanh toán vốn). Dùng chiết khấu bằng WACC trong DCF valuation.',
    },
    {
      stem: 'Đòn bẩy tài chính (Financial Leverage) tác động đến doanh nghiệp như thế nào?',
      choices: [
        'Làm tăng đều ROE bất kể điều kiện kinh doanh',
        'Khuếch đại cả lợi nhuận lẫn thua lỗ cho cổ đông — tốt khi ROA > lãi suất vay, xấu khi ngược lại',
        'Giảm rủi ro kinh doanh bằng cách phân tán vốn',
        'Không ảnh hưởng đến EPS',
      ],
      answer: 1,
      explanation: 'Financial leverage (sử dụng nợ vay) khuếch đại biến động EPS và ROE: khi ROA > Kd (lãi vay), đòn bẩy tài chính làm tăng ROE (leverage effect tích cực); khi ROA < Kd, đòn bẩy làm giảm ROE mạnh hơn (thua lỗ khuếch đại). DFL (Degree of Financial Leverage) = EBIT / (EBIT − Interest). Đây là khác biệt với đòn bẩy hoạt động (Operating Leverage — liên quan chi phí cố định vs biến đổi).',
    },
    {
      stem: 'Chu kỳ chuyển đổi tiền mặt (Cash Conversion Cycle — CCC) ngắn cho thấy:',
      choices: [
        'Doanh nghiệp mất nhiều thời gian để thu hồi tiền từ hoạt động',
        'Doanh nghiệp quản lý vốn lưu động hiệu quả — tiền ít bị "kẹt" trong hàng tồn kho và khoản phải thu',
        'Doanh nghiệp có nhiều nợ phải trả',
        'Doanh nghiệp không cần vay vốn lưu động',
      ],
      answer: 1,
      explanation: 'CCC = DIO + DSO − DPO, trong đó: DIO = Days Inventory Outstanding (số ngày tồn kho), DSO = Days Sales Outstanding (số ngày thu tiền), DPO = Days Payable Outstanding (số ngày trả tiền nhà cung cấp). CCC ngắn → tiền ít bị "kẹt" → cần ít vốn lưu động → hiệu quả hơn. Amazon có CCC âm (DPO rất dài) — nhận tiền mặt từ khách hàng trước khi phải trả tiền nhà cung cấp.',
    },
    {
      stem: 'Phương pháp thẩm định đầu tư nào SAI khi so sánh các dự án có vòng đời khác nhau?',
      choices: [
        'NPV với Equivalent Annual Cost (EAC)',
        'So sánh NPV trực tiếp mà không điều chỉnh vòng đời',
        'Least Common Multiple (LCM) periods',
        'NPV tại cùng một thời điểm cuối vòng đời dài hơn',
      ],
      answer: 1,
      explanation: 'So sánh NPV trực tiếp của dự án 3 năm với dự án 6 năm là sai vì không tính đến cơ hội tái đầu tư sau khi dự án 3 năm kết thúc. Cách đúng: (1) EAC (Equivalent Annual Cost/Annuity): đổi NPV về giá trị hàng năm đều, so sánh EAC; (2) Phương pháp LCM: so sánh qua chu kỳ bội số chung nhỏ nhất. EAC thường đơn giản hơn và phổ biến trong thực tế.',
    },
    {
      stem: 'Lý thuyết "Pecking Order" trong cơ cấu vốn (Myers & Majluf) cho rằng doanh nghiệp ưu tiên nguồn tài trợ theo thứ tự:',
      choices: [
        'Phát hành cổ phiếu → Nợ dài hạn → Lợi nhuận giữ lại',
        'Lợi nhuận giữ lại → Nợ → Phát hành cổ phiếu mới',
        'Nợ ngắn hạn → Nợ dài hạn → Vốn CSH',
        'Phát hành trái phiếu → Lợi nhuận giữ lại → Cổ phiếu',
      ],
      answer: 1,
      explanation: 'Pecking Order Theory: DN có thông tin nội bộ tốt hơn nhà đầu tư bên ngoài (information asymmetry). Phát hành cổ phiếu mới bị thị trường hiểu là "cổ phiếu đang overvalued" → giá cổ phiếu giảm khi thông báo phát hành mới. Do đó DN ưu tiên: (1) Lợi nhuận giữ lại (không tốn chi phí thông tin); (2) Nợ (chi phí thông tin thấp); (3) Cổ phiếu mới (chỉ khi không còn lựa chọn khác).',
    },
    {
      stem: 'Hệ số hoàn vốn (Payback Period) có nhược điểm chính là:',
      choices: [
        'Phức tạp trong tính toán, cần phần mềm chuyên dụng',
        'Bỏ qua giá trị thời gian của tiền và không tính dòng tiền sau điểm hoàn vốn',
        'Không phù hợp với dự án ngắn hạn',
        'Yêu cầu ước tính chi phí vốn (WACC) chính xác',
      ],
      answer: 1,
      explanation: 'Payback Period: số năm để thu hồi vốn đầu tư ban đầu. Nhược điểm lớn: (1) Không tính đến TVM — đồng tiền 1 năm sau không bằng đồng tiền hôm nay; (2) Bỏ hoàn toàn dòng tiền sau điểm hoàn vốn — dự án tốt dài hạn bị đánh giá thấp. Discounted Payback Period khắc phục điểm (1) nhưng vẫn bỏ dòng tiền sau. NPV là tiêu chí đúng nhất về lý thuyết tài chính.',
    },
  ],
};

// ─── E3.3 · Kế toán quản trị ─────────────────────────────────
export const E33_QUIZ = {
  id: 'E3.3-management-accounting-quiz',
  title: 'E3.3 · Kế toán quản trị — Chi phí, CVP & Kiểm soát',
  kind: 'quiz',
  yearLevel: 3, subject: 'ke-toan-quan-tri', difficulty: 3,
  skillsTrained: ['cost-analysis', 'cvp', 'standard-costing', 'abc', 'balanced-scorecard'],
  questions: [
    {
      stem: 'Chi phí nào sau đây là chi phí BIẾN ĐỔI (variable cost) điển hình?',
      choices: [
        'Tiền thuê nhà xưởng mỗi tháng',
        'Lương nhân viên quản lý (cố định)',
        'Nguyên vật liệu trực tiếp dùng cho sản xuất',
        'Khấu hao máy móc theo đường thẳng',
      ],
      answer: 2,
      explanation: 'Chi phí biến đổi (variable cost) thay đổi tỷ lệ với mức độ hoạt động/sản lượng: nguyên vật liệu trực tiếp, chi phí nhân công trực tiếp (piece-rate), hoa hồng bán hàng. Chi phí cố định (fixed cost) không thay đổi trong phạm vi hoạt động liên quan: tiền thuê, lương cố định, khấu hao đường thẳng. Chi phí hỗn hợp (mixed/semi-variable): điện (có phần cố định + phần biến đổi theo sản lượng).',
    },
    {
      stem: 'Số dư đảm phí (Contribution Margin — CM) được tính bằng:',
      choices: [
        'Doanh thu − Tổng chi phí',
        'Doanh thu − Chi phí biến đổi',
        'Doanh thu − Chi phí sản xuất',
        'Lợi nhuận gộp − Chi phí bán hàng',
      ],
      answer: 1,
      explanation: 'Contribution Margin = Doanh thu − Chi phí biến đổi. CM cho biết phần doanh thu còn lại sau khi bù chi phí biến đổi, đóng góp vào việc "phủ" chi phí cố định và tạo lợi nhuận. Ví dụ: Giá bán 100.000đ/sản phẩm, biến phí 60.000đ → CM = 40.000đ; Tỷ lệ CM = 40%. CM quan trọng trong phân tích CVP và quyết định sản xuất ngắn hạn.',
    },
    {
      stem: 'Điểm hoà vốn (Break-Even Point — BEP) theo sản lượng bằng:',
      choices: [
        'Chi phí cố định / Giá bán đơn vị',
        'Chi phí cố định / Số dư đảm phí đơn vị (CM per unit)',
        'Tổng chi phí / Giá bán đơn vị',
        'Doanh thu / Chi phí biến đổi',
      ],
      answer: 1,
      explanation: 'BEP (units) = Fixed Cost / CM per unit. Tại BEP: Tổng CM = Total Fixed Cost → Lợi nhuận = 0. BEP (doanh thu) = Fixed Cost / CM Ratio. Ví dụ: Fixed Cost = 200 triệu, CM/unit = 40.000đ → BEP = 200,000,000 / 40,000 = 5,000 sản phẩm. Ý nghĩa quản trị: cần bán ít nhất 5.000 đơn vị trước khi bắt đầu có lãi. Margin of Safety = Actual Sales − BEP Sales.',
    },
    {
      stem: 'Phân tích CVP (Cost-Volume-Profit) giả định:',
      choices: [
        'Chi phí biến đổi thay đổi phi tuyến tính theo sản lượng',
        'Giá bán, chi phí biến đổi đơn vị, và chi phí cố định đều không đổi trong phạm vi hoạt động liên quan',
        'Doanh nghiệp sản xuất nhiều loại sản phẩm có CM khác nhau',
        'Chi phí cố định bằng 0 để đơn giản hóa tính toán',
      ],
      answer: 1,
      explanation: 'CVP assumptions: (1) Giá bán không đổi (linear revenue); (2) Chi phí phân loại rõ fixed/variable, biến đổi theo tuyến tính; (3) Tồn kho không đổi (sản xuất = bán); (4) Chi phí cố định không thay đổi trong relevant range; (5) Hỗn hợp sản phẩm (sales mix) không đổi nếu đa sản phẩm. Trong thực tế CVP có giá trị ở phân tích kịch bản ngắn hạn; dài hạn fixed cost có thể thay đổi.',
    },
    {
      stem: 'Trong hệ thống chi phí tiêu chuẩn (Standard Costing), biến động giá nguyên vật liệu (Material Price Variance) có dấu âm (Unfavourable) khi:',
      choices: [
        'Sử dụng ít NVL hơn định mức',
        'Giá mua thực tế cao hơn giá tiêu chuẩn',
        'Sản lượng thực tế thấp hơn kế hoạch',
        'Chi phí cố định thực tế thấp hơn kế hoạch',
      ],
      answer: 1,
      explanation: 'Material Price Variance = (Standard Price − Actual Price) × Actual Quantity mua. Unfavourable (U) = Actual Price > Standard Price → doanh nghiệp trả tiền nhiều hơn dự toán. Material Usage Variance = (Standard Quantity for actual output − Actual Quantity) × Standard Price: liên quan hiệu quả sử dụng, không phải giá. Phân tích variance giúp xác định trách nhiệm: Price Variance → bộ phận mua hàng; Usage Variance → bộ phận sản xuất.',
    },
    {
      stem: 'Activity-Based Costing (ABC) khác với kế toán chi phí truyền thống (Traditional Costing) ở chỗ:',
      choices: [
        'ABC không phân bổ chi phí gián tiếp (overhead), chỉ tính chi phí trực tiếp',
        'ABC phân bổ chi phí gián tiếp qua nhiều "activity cost drivers" phù hợp với nguyên nhân phát sinh chi phí',
        'ABC chỉ áp dụng cho doanh nghiệp dịch vụ',
        'ABC đơn giản hơn vì chỉ dùng 1 tiêu thức phân bổ (số giờ lao động)',
      ],
      answer: 1,
      explanation: 'Traditional Costing dùng 1–2 tiêu thức phân bổ chung (giờ lao động, giờ máy) → bóp méo chi phí sản phẩm (over-cost sản phẩm đơn giản/khối lượng lớn, under-cost phức tạp/đặc thù). ABC: xác định activities → tính chi phí từng activity → phân bổ theo cost driver phù hợp (số đơn hàng, số lần thiết lập máy, số lần kiểm tra). ABC cho thấy chi phí thực sự của từng sản phẩm/khách hàng → quyết định đúng hơn về định giá và mix sản phẩm.',
    },
    {
      stem: 'Balanced Scorecard (BSC) của Kaplan & Norton gồm 4 viễn cảnh (perspectives) là:',
      choices: [
        'Tài chính — Khách hàng — Quy trình nội bộ — Học hỏi & Phát triển',
        'Chi phí — Doanh thu — Lợi nhuận — Tăng trưởng',
        'Sản phẩm — Thị trường — Nhân sự — Công nghệ',
        'Ngắn hạn — Trung hạn — Dài hạn — Chiến lược',
      ],
      answer: 0,
      explanation: 'Balanced Scorecard: (1) Tài chính (Financial): ROE, EVA, doanh thu; (2) Khách hàng (Customer): mức độ hài lòng, thị phần, tỷ lệ giữ chân; (3) Quy trình nội bộ (Internal Process): chất lượng sản phẩm, thời gian chu kỳ, đổi mới; (4) Học hỏi & Phát triển (Learning & Growth): năng lực nhân sự, hệ thống thông tin, văn hóa tổ chức. BSC cân bằng mục tiêu tài chính ngắn hạn với yếu tố phi tài chính tạo giá trị dài hạn.',
    },
    {
      stem: 'Định giá chuyển nhượng nội bộ (Transfer Pricing) theo phương pháp "Chi phí cộng lợi nhuận" (Cost-Plus) có nhược điểm:',
      choices: [
        'Quá phức tạp để tính toán trong thực tế',
        'Không khuyến khích trung tâm chi phí (selling division) kiểm soát chi phí vì chi phí được chuyển toàn bộ sang bên mua',
        'Chỉ phù hợp với giao dịch quốc tế xuyên biên giới',
        'Không được cơ quan thuế chấp nhận',
      ],
      answer: 1,
      explanation: 'Transfer Pricing theo cost-plus: giá = chi phí thực tế + markup%. Nhược điểm: selling division không có động lực kiểm soát chi phí vì mọi chi phí đều "pass through" sang buying division. Nếu selling division kém hiệu quả, buying division phải chịu chi phí cao. Phương pháp thị trường (market price) khắc phục tốt hơn nhưng đòi hỏi có giá thị trường tham chiếu. Trong MNCs (công ty đa quốc gia), transfer pricing cũng là công cụ tối ưu thuế — cơ quan thuế quốc tế yêu cầu áp dụng "Arm\'s Length Principle" (OECD).',
    },
    {
      stem: 'Quyết định "Tự sản xuất hay Mua ngoài" (Make or Buy Decision) dựa trên:',
      choices: [
        'So sánh tổng chi phí kế toán (bao gồm cả chi phí chìm)',
        'So sánh chi phí liên quan (relevant costs): chi phí biến đổi tự làm vs giá mua + chi phí cơ hội',
        'Doanh thu từ hoạt động sản xuất hiện tại',
        'Quy định pháp lý về tỷ lệ nội địa hoá',
      ],
      answer: 1,
      explanation: 'Make or Buy chỉ xem xét relevant costs (chi phí thay đổi khi quyết định thay đổi). Nếu mua ngoài: tiết kiệm biến phí sản xuất nhưng phải trả giá mua; có thể có chi phí cơ hội (dùng năng lực sản xuất cho sản phẩm khác sinh lời cao hơn). Chi phí chìm (sunk costs) như khấu hao máy đã mua, lương cố định không thoát được → KHÔNG tính. Ví dụ: biến phí tự làm = 80.000đ/sp; giá mua = 90.000đ/sp nhưng tự làm giải phóng năng lực kiếm thêm 15.000đ/sp từ hợp đồng khác → net benefit từ mua ngoài = 90.000 − 80.000 − 15.000 < 0 → nên tự làm.',
    },
    {
      stem: 'Ngân sách linh hoạt (Flexible Budget) khác với ngân sách tĩnh (Static Budget) ở chỗ:',
      choices: [
        'Flexible Budget được cập nhật hàng tuần trong khi Static Budget chỉ lập 1 lần đầu năm',
        'Flexible Budget điều chỉnh chi phí biến đổi theo sản lượng thực tế, cho phép phân tích variance chính xác hơn',
        'Flexible Budget chỉ gồm chi phí biến đổi, không bao gồm chi phí cố định',
        'Flexible Budget được lập dựa trên dự báo thị trường, không phải nội bộ',
      ],
      answer: 1,
      explanation: 'Static Budget: lập cho MỘT mức sản lượng dự kiến. So sánh static budget vs actual không có nghĩa nếu sản lượng thực tế khác kế hoạch (chi phí biến đổi tự nhiên cao/thấp hơn). Flexible Budget: điều chỉnh chi phí biến đổi theo sản lượng THỰC TẾ → variance chỉ phản ánh hiệu quả thực sự (giá, hiệu suất), không phải do sản lượng thay đổi. Activity variance = chênh lệch do sản lượng; Spending variance = chênh lệch do giá/hiệu suất.',
    },
  ],
};

// ─── E3.4 · Phân tích tài chính ──────────────────────────────
export const E34_QUIZ = {
  id: 'E3.4-financial-analysis-quiz',
  title: 'E3.4 · Phân tích tài chính — Chỉ số tài chính & Định giá',
  kind: 'quiz',
  yearLevel: 3, subject: 'phan-tich-tai-chinh', difficulty: 3,
  skillsTrained: ['financial-ratios', 'dupont', 'valuation', 'dcf', 'altman-zscore'],
  questions: [
    {
      stem: 'Hệ số thanh khoản hiện thời (Current Ratio) = 2,5 có nghĩa là:',
      choices: [
        'Doanh nghiệp có 2,5 lần tài sản cố định so với nợ ngắn hạn',
        'Tài sản ngắn hạn gấp 2,5 lần nợ ngắn hạn — dư sức thanh toán nghĩa vụ ngắn hạn',
        'Doanh nghiệp có tỷ suất lợi nhuận 2,5%',
        'Doanh nghiệp có thể trả nợ trong 2,5 tháng',
      ],
      answer: 1,
      explanation: 'Current Ratio = Tài sản ngắn hạn / Nợ ngắn hạn. CR = 2,5 → với mỗi 1 đồng nợ ngắn hạn, DN có 2,5 đồng tài sản ngắn hạn để thanh toán. CR > 1 tốt; CR quá cao (>4) có thể cho thấy quản lý vốn lưu động kém (hàng tồn kho nhiều, khoản phải thu lớn). Quick Ratio = (TS ngắn hạn − Hàng tồn kho) / Nợ ngắn hạn — nghiêm ngặt hơn vì loại hàng tồn kho (khó thanh khoản nhanh). Cash Ratio = Tiền / Nợ ngắn hạn — chặt nhất.',
    },
    {
      stem: 'Phân tích DuPont mở rộng cho thấy ROE = ?',
      choices: [
        'ROE = Net Profit Margin × Asset Turnover',
        'ROE = Net Profit Margin × Asset Turnover × Equity Multiplier (Financial Leverage)',
        'ROE = EBIT / Total Assets',
        'ROE = Dividends / Market Price',
      ],
      answer: 1,
      explanation: 'DuPont (3 nhân tố): ROE = (Net Income/Sales) × (Sales/Total Assets) × (Total Assets/Equity) = Net Profit Margin × Asset Turnover × Equity Multiplier. Phân rã giúp nhận biết nguyên nhân ROE cao/thấp: (1) Biên lợi nhuận (khả năng sinh lời hoạt động); (2) Vòng quay tài sản (hiệu quả sử dụng tài sản); (3) Đòn bẩy tài chính (mức vay nợ). DuPont 5 nhân tố (Dupont extended) tách thêm thuế và lãi vay.',
    },
    {
      stem: 'Hệ số P/E (Price-to-Earnings) = 20 nghĩa là:',
      choices: [
        'Cổ phiếu trả cổ tức 20% mỗi năm',
        'Nhà đầu tư sẵn sàng trả 20 đồng cho mỗi 1 đồng lợi nhuận — phản ánh kỳ vọng tăng trưởng',
        'Doanh nghiệp cần 20 năm để hoàn vốn (tính theo lợi nhuận)',
        'Cổ phiếu được định giá cao gấp 20 lần thị trường',
      ],
      answer: 1,
      explanation: 'P/E = Giá cổ phiếu / EPS (Lợi nhuận trên mỗi cổ phiếu). P/E = 20 nghĩa là nhà đầu tư trả 20 đồng/1 đồng lợi nhuận hiện tại, hoặc "hoàn vốn trong 20 năm nếu lợi nhuận không đổi". P/E cao → thị trường kỳ vọng tăng trưởng cao (growth stocks như tech); P/E thấp → tăng trưởng thấp hoặc rủi ro cao (value stocks). So sánh P/E phải với ngành cùng ngành và lịch sử; P/E âm (khi lỗ) không có ý nghĩa.',
    },
    {
      stem: 'Hệ số vòng quay tổng tài sản (Total Asset Turnover) thấp thường cho thấy:',
      choices: [
        'Doanh nghiệp sử dụng nhiều nợ',
        'Doanh nghiệp sử dụng tài sản kém hiệu quả — tạo ra ít doanh thu từ 1 đồng tài sản',
        'Biên lợi nhuận ròng cao',
        'Doanh nghiệp trong ngành dịch vụ nhẹ tài sản',
      ],
      answer: 1,
      explanation: 'Total Asset Turnover = Doanh thu / Tổng tài sản. Hệ số thấp → 1 đồng tài sản tạo ít doanh thu → tài sản được sử dụng kém hiệu quả (idle capacity, over-investment). So sánh theo ngành: bán lẻ (Walmart) có TAT rất cao (hàng quay vòng nhanh, tài sản nhẹ); sản xuất nặng/điện lực có TAT thấp (tài sản cố định lớn). TAT là phần tử thứ 2 trong DuPont: ROE = Margin × TAT × Leverage.',
    },
    {
      stem: 'Phương pháp DCF (Discounted Cash Flow) định giá doanh nghiệp bằng cách:',
      choices: [
        'Nhân EPS với hệ số P/E của ngành tương đương',
        'Chiết khấu tất cả dòng tiền tự do (FCFF) tương lai về hiện tại bằng WACC, cộng giá trị đầu cuối (Terminal Value)',
        'So sánh EV/EBITDA với các công ty tương tự (comparable companies)',
        'Tính giá trị thanh lý (liquidation value) của tài sản',
      ],
      answer: 1,
      explanation: 'DCF Valuation: Enterprise Value = Σ[FCFFₜ/(1+WACC)ᵗ] + Terminal Value/(1+WACC)ⁿ. Terminal Value = FCFFₙ₊₁ / (WACC − g) (Gordon Growth Model, g = tốc độ tăng trưởng vĩnh viễn). Equity Value = EV − Net Debt. Nhược điểm DCF: rất nhạy với giả định WACC và g (thay đổi nhỏ → giá trị biến đổi lớn). So sánh: Comps (P/E, EV/EBITDA) và Precedent Transactions là các phương pháp thay thế trong M&A.',
    },
    {
      stem: 'Chỉ số Altman Z-Score dùng để:',
      choices: [
        'Đo mức độ biến động (volatility) của giá cổ phiếu',
        'Dự báo khả năng phá sản của doanh nghiệp dựa trên 5 chỉ số tài chính',
        'Xếp hạng tín dụng (credit rating) như Moody\'s và S&P',
        'Đánh giá hiệu quả quản lý hàng tồn kho',
      ],
      answer: 1,
      explanation: 'Altman Z-Score (1968): Z = 1,2X₁ + 1,4X₂ + 3,3X₃ + 0,6X₄ + 1,0X₅, trong đó X₁=Working Capital/Total Assets, X₂=Retained Earnings/TA, X₃=EBIT/TA, X₄=Market Cap/Book Liabilities, X₅=Sales/TA. Z > 2,99: an toàn; 1,81 < Z < 2,99: vùng xám; Z < 1,81: nguy cơ phá sản cao. Mô hình này dự báo đúng ~70-80% trường hợp phá sản 2 năm trước khi xảy ra.',
    },
    {
      stem: 'Tỷ lệ D/E (Debt-to-Equity) = 1,5 có nghĩa là:',
      choices: [
        'Nợ vay chiếm 60% tổng nguồn vốn (gearing = 60%)',
        'Cứ 1 đồng vốn chủ sở hữu thì có 1,5 đồng nợ — đòn bẩy tài chính ở mức trung bình cao',
        'Doanh nghiệp lỗ 1,5 lần vốn chủ sở hữu',
        'Tỷ lệ lãi suất vay là 1,5%',
      ],
      answer: 1,
      explanation: 'D/E = Tổng nợ / Vốn CSH. D/E = 1,5 → nợ = 1,5 lần VCSH; hay Nợ/Tổng vốn = 1,5/2,5 = 60%. D/E cao → đòn bẩy tài chính cao → rủi ro cao (fixed interest obligation) nhưng khuếch đại ROE khi hoạt động tốt. Ngành khác nhau có D/E chuẩn mực khác: ngân hàng D/E ~10 (leverage cao do tính chất hoạt động), tech D/E thường <1. Không có con số D/E "tốt" phổ quát.',
    },
    {
      stem: 'Hệ số khả năng thanh toán lãi vay (Interest Coverage Ratio — ICR) = 3 cho thấy:',
      choices: [
        'Doanh nghiệp nợ 3 kỳ lãi vay chưa trả',
        'EBIT gấp 3 lần chi phí lãi vay — doanh nghiệp dư sức trả lãi vay hiện tại',
        'Tỷ lệ lãi vay trên doanh thu là 3%',
        'Doanh nghiệp cần 3 năm để trả hết nợ gốc',
      ],
      answer: 1,
      explanation: 'ICR = EBIT / Chi phí lãi vay. ICR = 3 → EBIT gấp 3 lần lãi vay → còn đệm an toàn. ICR < 1,5 → nguy hiểm (EBIT gần bằng lãi vay, chút suy giảm lợi nhuận là không trả được). Đây là chỉ số quan trọng với chủ nợ/trái chủ. Nhiều trái phiếu doanh nghiệp có covenant: ICR phải duy trì > X lần. DSCR (Debt Service Coverage Ratio) tính thêm cả trả nợ gốc: DSCR = (Net Operating Income) / (Debt Service = Principal + Interest).',
    },
    {
      stem: 'EPS (Earnings Per Share) bị pha loãng (Diluted EPS) thấp hơn Basic EPS khi:',
      choices: [
        'Doanh nghiệp chi trả cổ tức cao',
        'Doanh nghiệp có chứng khoán chuyển đổi (convertible bonds/warrants/stock options) có thể làm tăng số cổ phiếu lưu hành',
        'Lợi nhuận ròng giảm so với kỳ trước',
        'Doanh nghiệp mua lại cổ phiếu quỹ (buyback)',
      ],
      answer: 1,
      explanation: 'Basic EPS = Net Income / Weighted Average Shares Outstanding. Diluted EPS tính thêm tác động "as-if-converted" của các chứng khoán pha loãng: trái phiếu chuyển đổi (convertible notes), quyền mua cổ phiếu (stock options/warrants), RSU. Nếu chuyển đổi, số cổ phiếu tăng → EPS giảm (dilution). Ví dụ: Startup tech có nhiều stock options → Diluted EPS thấp hơn Basic EPS đáng kể. Nhà đầu tư thường dùng Diluted EPS để thận trọng hơn.',
    },
    {
      stem: 'Dòng tiền hoạt động (Operating Cash Flow — OCF) khác với lợi nhuận ròng (Net Income) ở chỗ:',
      choices: [
        'OCF bao gồm cả chi đầu tư tài sản cố định (CapEx)',
        'OCF cộng lại các chi phí không tiền mặt (khấu hao, phân bổ) và điều chỉnh thay đổi vốn lưu động',
        'OCF không tính thuế thu nhập doanh nghiệp',
        'OCF chỉ ghi nhận doanh thu đã thu tiền mặt',
      ],
      answer: 1,
      explanation: 'OCF (indirect method) = Net Income + D&A (non-cash) ± ΔNWC (changes in working capital: receivables, inventory, payables). Net Income bao gồm doanh thu chưa thu tiền (accrual) và chi phí không tiền mặt (khấu hao). Doanh nghiệp có thể có Net Income cao nhưng OCF âm (tăng trưởng nhanh → kẹt vốn trong receivables/inventory). "Earnings can be managed, cash flows are harder to fake" — nhà phân tích thường ưa OCF hơn Net Income để đánh giá sức khoẻ tài chính thực sự.',
    },
  ],
};

// ─── E3.5 · Marketing số + E-commerce ────────────────────────
export const E35_QUIZ = {
  id: 'E3.5-digital-marketing-quiz',
  title: 'E3.5 · Marketing số & E-commerce — Kênh, Chỉ số & Chiến lược',
  kind: 'quiz',
  yearLevel: 3, subject: 'thuong-mai-dt', difficulty: 3,
  skillsTrained: ['seo-sem', 'digital-channels', 'ecommerce-models', 'cac-ltv', 'analytics'],
  questions: [
    {
      stem: 'Sự khác biệt cơ bản giữa SEO (Search Engine Optimization) và SEM (Search Engine Marketing) là:',
      choices: [
        'SEO chỉ dùng cho website còn SEM dùng cho app di động',
        'SEO tối ưu thứ hạng tìm kiếm tự nhiên (miễn phí, dài hạn); SEM trả tiền cho quảng cáo tìm kiếm (Google Ads PPC — kết quả tức thì)',
        'SEO nhanh hơn SEM; SEM cần nhiều tháng để có kết quả',
        'SEM chỉ hoạt động trên Google; SEO hoạt động trên mọi công cụ tìm kiếm',
      ],
      answer: 1,
      explanation: 'SEO (Organic): tối ưu on-page (content, keywords, technical), off-page (backlinks), UX → cải thiện thứ hạng tự nhiên; kết quả dần dần (3-6 tháng) nhưng bền vững và không tốn tiền click. SEM/PPC (Paid): trả tiền mỗi click (Pay-Per-Click) cho Google Ads / Bing Ads; hiển thị ngay lập tức khi bắt đầu campaign; dừng trả tiền → mất ngay. Chiến lược tối ưu: kết hợp cả hai — SEM cho traffic tức thì, SEO xây dựng nền tảng dài hạn.',
    },
    {
      stem: 'CTR (Click-Through Rate) trong quảng cáo digital được tính bằng:',
      choices: [
        '(Số chuyển đổi / Số click) × 100%',
        '(Số click / Số lần hiển thị — Impressions) × 100%',
        '(Doanh thu / Chi phí quảng cáo) × 100%',
        '(Số người dùng quay lại / Tổng người dùng) × 100%',
      ],
      answer: 1,
      explanation: 'CTR = Clicks / Impressions × 100%. CTR trung bình Google Ads display ~0,1%; Search Ads ~2-5%; Email marketing ~2-3%. CTR cao → quảng cáo/tiêu đề hấp dẫn với đúng đối tượng. Cần phân biệt: CTR đo "thu hút bấm vào"; Conversion Rate (CVR) đo "bấm vào rồi có hành động mong muốn không (mua hàng, đăng ký)". Cả hai phối hợp: kéo traffic (CTR) + convert traffic (CVR).',
    },
    {
      stem: 'Customer Acquisition Cost (CAC) = 500.000đ và Customer Lifetime Value (LTV) = 1.500.000đ. Nhận xét về hoạt động marketing:',
      choices: [
        'Hoạt động marketing không hiệu quả vì CAC cao hơn 10% LTV',
        'LTV/CAC = 3 — khá tốt; doanh nghiệp thu được 3 đồng giá trị cho mỗi đồng chi phí thu khách',
        'Cần ngay lập tức tăng ngân sách quảng cáo lên 10 lần',
        'Không đánh giá được vì thiếu thông tin churn rate',
      ],
      answer: 1,
      explanation: 'LTV/CAC ratio là chỉ số sức khoẻ kinh doanh: LTV/CAC ≥ 3 thường được coi là tốt (thu về 3x chi phí bỏ ra). LTV/CAC = 1 → hòa vốn về dài hạn (không tính chi phí vận hành). LTV/CAC < 1 → lỗ mỗi khách hàng → mô hình không bền vững. LTV/CAC > 5 → có thể đang under-investing (tăng ngân sách marketing hợp lý). LTV = ARPU × Gross Margin % / Churn Rate (tháng). Churn Rate ảnh hưởng mạnh đến LTV: giảm churn 5% → LTV tăng đáng kể.',
    },
    {
      stem: 'Mô hình kinh doanh C2C (Consumer-to-Consumer) e-commerce điển hình là:',
      choices: [
        'Shopee Mall (thương hiệu bán trực tiếp cho người tiêu dùng)',
        'Lazada Business (doanh nghiệp mua hàng từ doanh nghiệp)',
        'Facebook Marketplace, eBay — nền tảng kết nối người tiêu dùng mua bán với nhau',
        'Amazon FBA (Fulfillment by Amazon — kho Amazon giao hàng)',
      ],
      answer: 2,
      explanation: 'Mô hình e-commerce: B2C (Business-to-Consumer): Shopee, Lazada bán hàng cho khách cá nhân; B2B (Business-to-Business): Alibaba.com, Amazon Business; C2C (Consumer-to-Consumer): eBay, Craigslist, Facebook Marketplace, Cho Tốt — cá nhân bán cho nhau qua nền tảng; D2C (Direct-to-Consumer): thương hiệu bán thẳng không qua trung gian (Nike.com, Glossier). Nền tảng C2C kiếm tiền từ phí đăng tin, phí giao dịch, quảng cáo premium.',
    },
    {
      stem: 'A/B Testing trong Digital Marketing được dùng để:',
      choices: [
        'So sánh doanh thu tháng A với tháng B trong năm',
        'So sánh hiệu quả của 2 biến thể (landing page, tiêu đề email, CTA button) để chọn phiên bản tốt hơn dựa trên dữ liệu thực',
        'Phân tích đối thủ cạnh tranh A và B',
        'Thử nghiệm 2 kênh quảng cáo khác nhau (Google vs Facebook)',
      ],
      answer: 1,
      explanation: 'A/B Test (Split Test): chia ngẫu nhiên user/traffic thành 2 nhóm, mỗi nhóm thấy biến thể khác nhau → đo conversion rate của từng nhóm → giữ biến thể chiến thắng. Điều kiện hợp lệ: đủ sample size (p-value < 0,05), chạy đủ lâu để loại seasonal effect, chỉ thay đổi 1 biến mỗi lần. Ứng dụng: headline, CTA color, pricing page, email subject line, product image. Multivariate Testing = A/B với nhiều biến hơn (cần traffic lớn).',
    },
    {
      stem: 'Tỷ lệ thoát (Bounce Rate) trong Google Analytics cao (>80%) thường cho thấy:',
      choices: [
        'Website có nhiều trang → người dùng ghé thăm nhiều trang',
        'Nội dung trang đích không phù hợp với kỳ vọng của người dùng hoặc UX kém',
        'Quảng cáo chạy hiệu quả thu hút đúng đối tượng',
        'Website được index tốt trên Google',
      ],
      answer: 1,
      explanation: 'Bounce Rate = % phiên người dùng rời trang sau khi chỉ xem 1 trang duy nhất (không tương tác thêm). Bounce Rate cao → người vào trang không tìm thấy điều mong muốn → rời đi ngay. Nguyên nhân: mismatched content (quảng cáo hứa X, trang nội dung nói Y), tốc độ tải chậm, thiết kế xấu. Ngoại lệ: trang blog có Bounce Rate cao vẫn bình thường (người đọc bài rồi đi, không cần duyệt thêm). GA4 thay "Bounce Rate" bằng "Engagement Rate" (>10s hoặc có scroll/click = "engaged").',
    },
    {
      stem: 'Chiến lược Mobile-First trong phát triển web và marketing có nghĩa là:',
      choices: [
        'Chỉ phát triển ứng dụng di động, không cần website desktop',
        'Thiết kế và tối ưu trải nghiệm cho mobile trước, rồi mở rộng sang desktop — vì phần lớn traffic đến từ thiết bị di động',
        'Chạy quảng cáo chỉ trên nền tảng di động (Facebook/Instagram App)',
        'Mobile-First là yêu cầu kỹ thuật của Google từ 2010',
      ],
      answer: 1,
      explanation: 'Mobile-First Index (Google 2018): Google chủ yếu crawl và index phiên bản mobile của website → responsive design là bắt buộc cho SEO. Mobile-First Design: thiết kế trên màn hình nhỏ trước (constraints buộc tư duy tinh gọn), rồi mở rộng (Progressive Enhancement). Thực tế: 70%+ web traffic toàn cầu từ mobile (Việt Nam cao hơn). Nếu mobile UX kém → bounce rate cao → Google giảm rank → vòng xoáy tiêu cực. AMP (Accelerated Mobile Pages) và Core Web Vitals là các tiêu chí Google đo UX mobile.',
    },
    {
      stem: 'Funnel marketing TOFU–MOFU–BOFU đại diện cho:',
      choices: [
        'Top Of Funnel (nhận thức) → Middle Of Funnel (cân nhắc) → Bottom Of Funnel (quyết định mua)',
        'Tỷ lệ chuyển đổi ở 3 tháng đầu, giữa và cuối năm',
        'Ba phân khúc khách hàng: mới, trung thành và VIP',
        'Ba loại nội dung: video, bài viết và infographic',
      ],
      answer: 0,
      explanation: 'Marketing Funnel: TOFU (Top of Funnel): nhận thức thương hiệu — blog SEO, social media, video YouTube, podcast → Content định hướng thông tin/giải trí. MOFU (Middle): cân nhắc — so sánh sản phẩm, case studies, webinars, email nurturing → nuôi dưỡng lead. BOFU (Bottom): quyết định — demo, pricing page, testimonials, limited offer, retargeting ads → chuyển đổi thành khách hàng. Chiến lược tốt cần content cho cả 3 giai đoạn vì hành trình mua khác nhau theo khách hàng.',
    },
    {
      stem: 'Email Marketing có tỷ lệ ROI (Return on Investment) cao nhất trong các kênh digital vì:',
      choices: [
        'Email miễn phí hoàn toàn, không tốn chi phí nào',
        'Email đến tệp khách hàng đã opt-in (đồng ý nhận), chi phí thấp, có thể cá nhân hóa và tự động hóa cao',
        'Email được đọc bởi 100% người nhận',
        'Email không bị cạnh tranh vì ít doanh nghiệp sử dụng',
      ],
      answer: 1,
      explanation: 'Email ROI trung bình ~$36 cho mỗi $1 chi ra (DMA data). Lý do: (1) Owned channel — không phụ thuộc thuật toán mạng xã hội; (2) Opt-in list — gửi đến người có quan tâm, không spam; (3) Cá nhân hóa: dynamic content theo hành vi; (4) Automation: welcome series, abandoned cart, re-engagement; (5) Chi phí thấp: Mailchimp, SendGrid tính theo số lượng email. Hạn chế: deliverability (vào spam), unsubscribe rate, cần list sạch và nội dung chất lượng.',
    },
    {
      stem: 'Mô hình kinh doanh "Marketplace" (Shopee, Lazada, Tiki) kiếm tiền chủ yếu từ:',
      choices: [
        'Bán sản phẩm tự sản xuất với biên lợi nhuận cao',
        'Commission (% doanh thu từ người bán), phí quảng cáo nội sàn, phí dịch vụ logistics và dịch vụ tài chính',
        'Phí đăng ký thuê bao tháng của người mua',
        'Bán dữ liệu người dùng cho bên thứ ba',
      ],
      answer: 1,
      explanation: 'Platform/Marketplace revenue model (multi-sided platform): (1) Take Rate / Commission: 2-20% trên mỗi giao dịch của người bán; (2) Listing Fees / Advertising: Shopee Ads, Flash Sale slot — người bán trả để hiển thị nổi bật; (3) Fulfillment & Logistics: phí giao hàng, kho SPX Express; (4) Financial Services: ShopeePay, Shopee PayLater, bảo hiểm. Lợi thế: network effect — càng nhiều người mua → càng nhiều người bán → sàn hấp dẫn hơn → flywheel effect.',
    },
  ],
};

// ─── E3.6 · Quản trị chuỗi cung ứng ─────────────────────────
export const E36_QUIZ = {
  id: 'E3.6-supply-chain-quiz',
  title: 'E3.6 · Quản trị chuỗi cung ứng — JIT, EOQ & Logistics',
  kind: 'quiz',
  yearLevel: 3, subject: 'chuoi-cung-ung', difficulty: 3,
  skillsTrained: ['jit', 'eoq', 'logistics', 'lean-agile-scm', 'scor'],
  questions: [
    {
      stem: 'Chuỗi cung ứng (Supply Chain) bao gồm:',
      choices: [
        'Chỉ nhà sản xuất và nhà bán lẻ cuối cùng',
        'Toàn bộ mạng lưới: nhà cung cấp nguyên liệu → sản xuất → phân phối → bán lẻ → khách hàng cuối cùng, cùng dòng thông tin và tài chính đi kèm',
        'Hệ thống quản lý kho hàng và vận chuyển nội bộ',
        'Các đối tác logistics (3PL) và hải quan',
      ],
      answer: 1,
      explanation: 'Supply Chain là mạng lưới tổ chức, con người, hoạt động, thông tin và nguồn lực để chuyển sản phẩm/dịch vụ từ nhà cung cấp đến khách hàng cuối cùng. Ba dòng chảy: (1) Dòng vật chất (hàng hoá, nguyên liệu từ upstream → downstream); (2) Dòng thông tin (đơn hàng, dự báo, tracking — đi cả hai chiều); (3) Dòng tài chính (thanh toán, tín dụng — từ downstream → upstream). SCM hiệu quả = giảm chi phí tổng thể + tăng độ tin cậy giao hàng + tăng khả năng đáp ứng (responsiveness).',
    },
    {
      stem: 'Phương pháp Just-In-Time (JIT) trong sản xuất đặt mục tiêu:',
      choices: [
        'Sản xuất và nhận nguyên vật liệu đúng lúc cần — giảm tồn kho về gần bằng 0',
        'Sản xuất nhanh nhất có thể để đáp ứng mọi đơn hàng khẩn',
        'Dự trữ hàng tồn kho lớn để không bao giờ thiếu hàng',
        'Tối ưu hóa tốc độ vận chuyển hàng hóa đường biển',
      ],
      answer: 0,
      explanation: 'JIT (Toyota Production System): sản xuất đúng số lượng, đúng thời điểm, đúng nơi — không dư thừa. Lợi ích: giảm chi phí tồn kho (holding cost), giảm lãng phí (Muda: overproduction, waiting, transport, overprocessing, inventory, motion, defects). Điều kiện: nhà cung cấp tin cậy (giao hàng đúng hẹn), sản xuất linh hoạt (quick changeover — SMED), chất lượng cao (không thể kiểm tra hàng lỗi vì không có buffer). Rủi ro: supply chain disruption (COVID-19 2020 bộc lộ điểm yếu JIT toàn cầu).',
    },
    {
      stem: 'Công thức EOQ (Economic Order Quantity) để xác định lượng đặt hàng tối ưu là:',
      choices: [
        'EOQ = Annual Demand / 2 × Holding Cost',
        'EOQ = √(2 × D × S / H), trong đó D = cầu hàng năm, S = chi phí đặt hàng, H = chi phí lưu giữ đơn vị',
        'EOQ = (Lead Time × Daily Demand) + Safety Stock',
        'EOQ = Total Cost / Order Quantity',
      ],
      answer: 1,
      explanation: 'EOQ = √(2DS/H). Tại EOQ: Ordering Cost = Holding Cost (tổng chi phí tồn kho thấp nhất). D = nhu cầu hàng năm (units), S = chi phí mỗi lần đặt hàng (setup/ordering cost), H = chi phí lưu giữ 1 đơn vị/năm (holding/carrying cost = % giá × giá). Giả định EOQ: nhu cầu đều và chắc chắn, lead time cố định, không chiết khấu lượng. Mở rộng: Reorder Point (ROP) = Lead Time × Daily Demand + Safety Stock.',
    },
    {
      stem: 'Hiệu ứng Bullwhip (Bullwhip Effect) trong chuỗi cung ứng là hiện tượng:',
      choices: [
        'Hàng hoá bị hư hỏng khi vận chuyển đường dài',
        'Dao động nhỏ trong nhu cầu người tiêu dùng được khuếch đại lên khi truyền ngược lên phía nhà cung cấp',
        'Giá cả biến động lớn trong thị trường hàng hoá toàn cầu',
        'Lỗi vận chuyển tích lũy gây ra hàng bị giao sai địa chỉ',
      ],
      answer: 1,
      explanation: 'Bullwhip Effect (Lee et al. 1997): biến động nhu cầu nhỏ ở khách hàng cuối → bán lẻ tăng/giảm đặt hàng bù buffer → bán buôn khuếch đại thêm → nhà sản xuất dao động mạnh hơn → nhà cung cấp NVL dao động cực lớn. Giống roi ngựa: dao động nhỏ ở tay → cuối roi dao động lớn. Nguyên nhân: forecast error, batch ordering, rationing game (tích trữ khi sợ hết hàng), price fluctuation. Giải pháp: chia sẻ thông tin real-time (POS data), VMI, CPFR (Collaborative Planning, Forecasting, Replenishment).',
    },
    {
      stem: 'Mô hình SCOR (Supply Chain Operations Reference) bao gồm 5 quy trình chính:',
      choices: [
        'Mua — Sản xuất — Giao hàng — Kho — Vận chuyển',
        'Plan (Lập kế hoạch) — Source (Mua hàng) — Make (Sản xuất) — Deliver (Giao hàng) — Return (Trả hàng)',
        'Forecast — Order — Produce — Ship — Invoice',
        'Design — Procure — Manufacture — Warehouse — Sell',
      ],
      answer: 1,
      explanation: 'SCOR (Supply Chain Council): framework chuẩn hóa quy trình SCM gồm Plan (S&OP, demand planning), Source (procurement, supplier management), Make (production scheduling, manufacturing), Deliver (order management, warehousing, transportation), Return (reverse logistics, warranty). Phiên bản mới thêm Enable (cross-process management). SCOR cung cấp metrics chuẩn (OTIF, Cash-to-Cash cycle, inventory turns) và best practices để benchmark và cải tiến SCM.',
    },
    {
      stem: 'Chuỗi cung ứng LEAN phù hợp nhất khi:',
      choices: [
        'Nhu cầu thị trường biến động cao, vòng đời sản phẩm ngắn',
        'Nhu cầu ổn định và dự báo được, sản phẩm tiêu chuẩn hoá, biên lợi nhuận thấp cần tối ưu chi phí',
        'Doanh nghiệp cần đáp ứng đơn hàng tùy chỉnh gấp',
        'Thị trường ngách với nhu cầu đặc biệt và sẵn sàng trả giá cao',
      ],
      answer: 1,
      explanation: 'Lean Supply Chain: loại bỏ lãng phí, tối ưu chi phí, hàng tồn kho thấp. Phù hợp: sản phẩm functional (nhu cầu ổn định như hàng tiêu dùng thiết yếu, linh kiện tiêu chuẩn). Agile Supply Chain: linh hoạt, đáp ứng nhanh với biến động; phù hợp: sản phẩm innovative (fashion, tech — nhu cầu khó đoán, vòng đời ngắn, biên lợi nhuận cao). Leagile = kết hợp: Lean ở phần upstream (nguyên liệu) + Agile ở downstream gần khách hàng (decoupling point / postponement).',
    },
    {
      stem: 'Vendor Managed Inventory (VMI) là mô hình trong đó:',
      choices: [
        'Nhà bán lẻ tự quản lý và đặt hàng khi hàng xuống dưới mức reorder point',
        'Nhà cung cấp chịu trách nhiệm quản lý mức tồn kho tại địa điểm của khách hàng, dựa trên dữ liệu POS được chia sẻ',
        'Kho hàng được thuê ngoài cho bên thứ ba (3PL)',
        'Nhà sản xuất giao hàng thẳng đến tay người tiêu dùng (drop-shipping)',
      ],
      answer: 1,
      explanation: 'VMI: nhà cung cấp (vendor) nhận dữ liệu bán hàng real-time từ khách hàng → tự quyết định khi nào và bao nhiêu để replenish → giảm Bullwhip Effect và giảm gánh nặng quản lý tồn kho cho khách. Ví dụ điển hình: P&G và Walmart (tiên phong VMI từ thập niên 1990). Lợi ích: giảm stockout, giảm holding cost tổng thể, tăng trust và lock-in. Điều kiện: chia sẻ POS data minh bạch, hệ thống IT kết nối (EDI/API).',
    },
    {
      stem: 'Total Cost of Ownership (TCO) trong mua sắm (procurement) khác với chỉ xét giá mua (purchase price) vì:',
      choices: [
        'TCO chỉ tính chi phí vận chuyển và thuế nhập khẩu thêm vào giá mua',
        'TCO tính toàn bộ chi phí vòng đời: mua + vận hành + bảo trì + đào tạo + thải bỏ — cho phép so sánh nhà cung cấp toàn diện',
        'TCO chỉ áp dụng cho thiết bị công nghiệp, không phải hàng tiêu dùng',
        'TCO = Purchase Price × số năm sử dụng',
      ],
      answer: 1,
      explanation: 'TCO = Purchase Price + Installation + Training + Operating Costs + Maintenance + Downtime Cost + Disposal Cost. Nhà cung cấp giá thấp nhất có thể có TCO cao hơn nếu chất lượng kém (nhiều lỗi, tốn sửa chữa) hoặc dịch vụ kém (training, support). Ví dụ: máy photocopy giá rẻ nhưng tốn mực, hay hỏng → TCO cao hơn máy đắt hơn ban đầu. TCO giúp procurement team tránh "false economy" — mua rẻ nhưng đắt về lâu dài.',
    },
    {
      stem: 'Reverse Logistics (Logistics ngược) đề cập đến:',
      choices: [
        'Vận chuyển hàng nhanh ngược chiều giao thông để giao hàng khẩn cấp',
        'Quy trình xử lý hàng trả lại (return), tái chế, tái sử dụng, tái sản xuất (remanufacturing) từ điểm tiêu thụ về phía nhà sản xuất/nhà cung cấp',
        'Vận chuyển hàng từ nhà máy về kho trung tâm trước khi phân phối',
        'Hệ thống vận chuyển hàng lạnh (cold chain) để đảm bảo chất lượng',
      ],
      answer: 1,
      explanation: 'Reverse Logistics: dòng chảy ngược từ khách hàng về nhà sản xuất/nhà phân phối. Gồm: returns management (hàng lỗi, hết hạn bảo hành, đổi trả), recycling/reclamation (thu hồi vật liệu tái sử dụng), remanufacturing (tái sản xuất từ linh kiện thu hồi), disposal (thải bỏ an toàn). Ví dụ: Amazon returns, chương trình thu pin cũ điện thoại Samsung, thu hồi hộp carton. Reverse logistics ngày càng quan trọng vì: e-commerce return rate 20-30%, ESG/sustainability regulations, circular economy.',
    },
    {
      stem: 'Lead Time trong chuỗi cung ứng là:',
      choices: [
        'Thời gian lãnh đạo (CEO) ra quyết định chiến lược mua hàng',
        'Tổng thời gian từ khi đặt hàng đến khi nhận được hàng — bao gồm xử lý đơn, sản xuất (nếu có), vận chuyển, thông quan',
        'Thời gian một sản phẩm nằm trong kho trước khi bán',
        'Thời gian phản hồi khách hàng sau khi nhận được hàng',
      ],
      answer: 1,
      explanation: 'Lead Time = thời gian từ trigger (đặt hàng/nhận đơn) đến delivery. Các thành phần: administrative lead time (xử lý đơn), manufacturing lead time (nếu make-to-order), transit time, customs clearance time. Rút ngắn lead time → giảm Safety Stock (SS = Z × σ_LT × D_avg) → giảm tồn kho → tăng cash flow. Ví dụ: Zara "fast fashion" thiết kế → sản xuất → kệ hàng trong 2-3 tuần (vs 6 tháng ngành truyền thống) → lợi thế cạnh tranh.',
    },
  ],
};

// ─── E3.7 · Kinh doanh quốc tế ──────────────────────────────
export const E37_QUIZ = {
  id: 'E3.7-international-business-quiz',
  title: 'E3.7 · Kinh doanh quốc tế — FDI, Thương mại & Văn hoá',
  kind: 'quiz',
  yearLevel: 3, subject: 'kinh-doanh-quoc-te', difficulty: 3,
  skillsTrained: ['fdi-modes', 'trade-theory', 'wto', 'culture-management', 'incoterms'],
  questions: [
    {
      stem: 'Lý thuyết lợi thế so sánh (Comparative Advantage — David Ricardo) cho rằng:',
      choices: [
        'Chỉ các quốc gia có nguồn tài nguyên dồi dào mới nên tham gia thương mại quốc tế',
        'Mỗi quốc gia nên chuyên môn hoá sản xuất hàng hoá mà họ có CHI PHÍ CƠ HỘI thấp nhất, dù không có lợi thế tuyệt đối',
        'Quốc gia chỉ xuất khẩu những sản phẩm họ sản xuất hiệu quả nhất về tuyệt đối',
        'Thương mại tự do làm giảm phúc lợi ở các quốc gia đang phát triển',
      ],
      answer: 1,
      explanation: 'Comparative Advantage (Ricardo, 1817): dù Portugal giỏi hơn England cả vải và rượu vang (lợi thế tuyệt đối — Absolute Advantage), nhưng Portugal xuất khẩu rượu vang (chi phí cơ hội thấp hơn) và nhập vải từ England → cả hai cùng có lợi. Ví dụ Việt Nam: dù Mỹ sản xuất phần mềm lẫn dệt may hiệu quả hơn, Việt Nam vẫn có lợi thế so sánh trong dệt may → xuất khẩu dệt may, nhập phần mềm. Đây là nền tảng lý thuyết của thương mại tự do.',
    },
    {
      stem: 'Hình thức FDI (Foreign Direct Investment) nào cho phép kiểm soát tối đa nhưng rủi ro cao nhất?',
      choices: [
        'Liên doanh (Joint Venture) 50/50 với đối tác địa phương',
        'Nhượng quyền (Franchising) — thu phí không cần đầu tư nhiều',
        'Greenfield Investment — xây dựng cơ sở hoàn toàn mới từ đầu tại nước sở tại',
        'Xuất khẩu trực tiếp qua đại lý phân phối địa phương',
      ],
      answer: 2,
      explanation: 'Greenfield FDI: xây mới nhà máy/văn phòng từ đầu → kiểm soát 100% (culture, technology, processes), không "thừa hưởng" vấn đề của tài sản sẵn có. Nhưng: chi phí lớn, thời gian dài, rủi ro cao (chưa biết thị trường địa phương). Acquisition (M&A): mua lại DN sẵn có — nhanh hơn, có ngay brand/distribution, nhưng rủi ro tích hợp (cultural clash, due diligence). JV: chia sẻ kiểm soát với đối tác địa phương — giảm rủi ro nhưng mất kiểm soát. Lý thuyết OLI (Dunning): Ownership, Location, Internalization advantages.',
    },
    {
      stem: 'Kim cương Porter (Porter\'s Diamond) giải thích lợi thế cạnh tranh quốc gia qua 4 yếu tố:',
      choices: [
        'Giá trị — Rổ tiền tệ — Lực lượng lao động — Chính sách thuế',
        'Điều kiện nhân tố sản xuất — Điều kiện cầu — Ngành hỗ trợ liên quan — Chiến lược & Cấu trúc doanh nghiệp',
        'Vốn — Lao động — Công nghệ — Đất đai',
        'Quy mô dân số — Diện tích — Tài nguyên thiên nhiên — Vị trí địa lý',
      ],
      answer: 1,
      explanation: 'Porter\'s Diamond (1990): (1) Factor Conditions: lao động kỹ năng, hạ tầng, công nghệ, vốn; (2) Demand Conditions: nhu cầu nội địa tinh tế, yêu cầu cao → áp lực DN đổi mới; (3) Related & Supporting Industries: cluster công nghiệp hỗ trợ lẫn nhau (Silicon Valley — tech; Ý — thời trang); (4) Firm Strategy, Structure, Rivalry: cạnh tranh nội địa mạnh → DN nâng cao năng lực. Hai yếu tố ngoài mô hình: Chính phủ (thuận lợi hoặc cản trở) và Cơ hội ngẫu nhiên.',
    },
    {
      stem: 'Thuế quan (Tariff) khác với Hàng rào phi thuế quan (Non-tariff Barriers — NTBs) như thế nào?',
      choices: [
        'Thuế quan do WTO quản lý; NTBs do từng quốc gia tự quyết định',
        'Thuế quan là thuế đánh vào hàng nhập khẩu (giá tường minh); NTBs là biện pháp gián tiếp hạn chế thương mại (hạn ngạch, tiêu chuẩn kỹ thuật, kiểm dịch, quy tắc xuất xứ)',
        'Thuế quan chỉ áp dụng cho hàng hoá hữu hình; NTBs cho dịch vụ',
        'NTBs luôn bất hợp pháp theo WTO; thuế quan luôn hợp pháp',
      ],
      answer: 1,
      explanation: 'Tariffs: thuế nhập khẩu ad valorem (% giá) hoặc specific ($/unit) → tăng giá hàng nhập, bảo hộ DN nội địa, thu ngân sách nhà nước. WTO đàm phán giảm thuế quan qua nhiều vòng (GATT). Non-Tariff Barriers (NTBs): tinh vi hơn, khó đàm phán hơn — bao gồm: hạn ngạch (quota), giấy phép nhập khẩu, tiêu chuẩn kỹ thuật (TBT), quy định vệ sinh kiểm dịch (SPS), quy tắc xuất xứ (Rules of Origin), trợ cấp xuất khẩu. Xu hướng: thuế quan giảm nhưng NTBs tăng.',
    },
    {
      stem: 'Khi đồng tiền của một quốc gia mất giá (depreciation), tác động đến thương mại quốc tế thường là:',
      choices: [
        'Xuất khẩu giảm vì hàng hoá trong nước trở nên đắt hơn với người nước ngoài',
        'Xuất khẩu tăng (hàng rẻ hơn cho người nước ngoài) và nhập khẩu giảm (hàng ngoại đắt hơn với người trong nước) — cải thiện cán cân thương mại',
        'Không ảnh hưởng đến thương mại vì giá cả điều chỉnh theo tỷ giá',
        'Cả xuất khẩu và nhập khẩu đều tăng do tăng hoạt động kinh tế',
      ],
      answer: 1,
      explanation: 'Depreciation của đồng nội tệ → hàng xuất khẩu rẻ hơn tính bằng ngoại tệ → cạnh tranh hơn → tăng khối lượng xuất khẩu. Đồng thời, hàng nhập khẩu đắt hơn tính bằng nội tệ → giảm khối lượng nhập khẩu. Hiệu ứng J-Curve: ngắn hạn CA có thể xấu đi trước (các hợp đồng cũ đã ký, giá không điều chỉnh ngay), rồi cải thiện sau 6-18 tháng khi khối lượng thương mại phản ứng. Điều kiện Marshall-Lerner: tổng độ co giãn của cầu xuất khẩu và nhập khẩu > 1 thì depreciation mới cải thiện CA.',
    },
    {
      stem: 'Nguyên tắc Tối huệ quốc (Most-Favoured-Nation — MFN) của WTO có nghĩa là:',
      choices: [
        'Quốc gia giàu nhất được ưu đãi thương mại cao nhất',
        'Mọi thành viên WTO phải được đối xử bình đẳng như thành viên được ưu đãi nhất — ưu đãi dành cho một thành viên phải mở rộng cho tất cả thành viên còn lại',
        'Mỗi quốc gia có thể chọn một "đối tác tối huệ quốc" duy nhất',
        'Quốc gia đang phát triển được miễn thuế hoàn toàn',
      ],
      answer: 1,
      explanation: 'MFN (WTO Article I): Non-discrimination principle — nếu bạn dành cho quốc gia A mức thuế quan 5%, thì mọi thành viên WTO khác cũng phải được 5% (hoặc thấp hơn). Ngăn chặn phân biệt đối xử giữa các đối tác thương mại. Ngoại lệ: FTA (Hiệp định thương mại tự do như CPTPP, EVFTA) — cho phép ưu đãi sâu hơn giữa các thành viên FTA. Nguyên tắc đối xử quốc gia (National Treatment) — WTO Article III: hàng nhập khẩu đã qua hải quan phải được đối xử như hàng nội địa về thuế và quy định.',
    },
    {
      stem: 'Chỉ số khoảng cách quyền lực (Power Distance Index — PDI) cao theo Hofstede cho thấy văn hoá có:',
      choices: [
        'Sự bình đẳng cao, nhân viên tự do bày tỏ ý kiến với cấp trên',
        'Phân cấp quyền lực rõ ràng, thứ bậc được tôn trọng, cấp dưới hiếm khi phản đối cấp trên',
        'Chủ nghĩa cá nhân cao, mỗi người tự quyết định',
        'Rủi ro được chấp nhận cao trong kinh doanh',
      ],
      answer: 1,
      explanation: 'Hofstede\'s Cultural Dimensions (6 chiều): (1) Power Distance (PDI): khoảng cách quyền lực — PDI cao (Malaysia, Philippines, VN) vs thấp (Đan Mạch, Áo — bình đẳng). (2) Individualism vs Collectivism (IDV): Mỹ cao nhất. (3) Masculinity vs Femininity (MAS). (4) Uncertainty Avoidance (UAI): né tránh rủi ro. (5) Long-term Orientation (LTO): Đông Á thường cao. (6) Indulgence vs Restraint. Quan trọng trong quản trị đa văn hoá: style lãnh đạo, đàm phán, xung đột — cần điều chỉnh theo văn hoá địa phương.',
    },
    {
      stem: 'Điều kiện thương mại Incoterms "CIF — Cost, Insurance and Freight" có nghĩa là:',
      choices: [
        'Người mua chịu mọi chi phí và rủi ro từ kho của người bán',
        'Người bán chịu chi phí cước vận tải và phí bảo hiểm đến cảng đến; rủi ro chuyển giao cho người mua khi hàng qua lan can tàu tại cảng đi',
        'Người bán giao hàng tận kho người mua, chịu mọi chi phí',
        'Chi phí vận tải chia đôi giữa người mua và người bán',
      ],
      answer: 1,
      explanation: 'Incoterms 2020 (ICC): CIF = Cost + Insurance + Freight (đến cảng đến). Người bán: đặt tàu, trả cước, mua bảo hiểm tối thiểu (Institute Cargo Clauses C); rủi ro chuyển qua khi hàng lên tàu tại cảng gốc. Người mua: thông quan nhập, phí cảng đến. So sánh: EXW (Ex Works) = người mua chịu tất; DDP (Delivered Duty Paid) = người bán chịu tất kể cả thuế nhập. FOB (Free On Board): người bán đến lan can tàu; CIF thêm bảo hiểm + cước biển. Incoterms chỉ quy định rủi ro và chi phí, KHÔNG phải quyền sở hữu.',
    },
    {
      stem: 'Transfer Pricing (Giá chuyển nhượng nội bộ) trong Công ty đa quốc gia (MNC) bị cơ quan thuế giám sát chặt vì:',
      choices: [
        'Giá chuyển nhượng ảnh hưởng đến năng suất lao động toàn cầu',
        'MNC có thể thao túng giá chuyển nhượng giữa các công ty con để chuyển lợi nhuận sang quốc gia có thuế suất thấp (tax shifting / profit shifting)',
        'Giá chuyển nhượng quốc tế làm biến động tỷ giá hối đoái',
        'Giao dịch nội bộ MNC có thể vi phạm luật cạnh tranh (antitrust)',
      ],
      answer: 1,
      explanation: 'Transfer Pricing để tối ưu thuế (Tax Optimization): MNC giao dịch nội bộ giữa công ty mẹ (nước thuế cao) và công ty con (nước thuế thấp — tax haven như Ireland 12,5%, Singapore 17%) với giá không phản ánh thực tế thị trường → chuyển lợi nhuận sang nơi thuế thấp. OECD đặt ra nguyên tắc Arm\'s Length (giá thị trường công bằng) và BEPS (Base Erosion and Profit Shifting) Action Plan để chống. Ví dụ nổi tiếng: Apple Ireland, Amazon Luxembourg.',
    },
    {
      stem: 'Hợp đồng gia công quốc tế (Contract Manufacturing) khác với FDI vì:',
      choices: [
        'Contract Manufacturing là hình thức FDI gián tiếp',
        'Contract Manufacturing thuê nhà máy nước ngoài sản xuất theo yêu cầu kỹ thuật của mình mà không cần đầu tư vốn/tài sản tại đó — rủi ro thấp hơn nhưng kiểm soát ít hơn',
        'Contract Manufacturing chỉ áp dụng trong nội địa',
        'Contract Manufacturing yêu cầu thành lập pháp nhân tại nước đối tác',
      ],
      answer: 1,
      explanation: 'Contract Manufacturing (hình thức entry mode không vốn): thuê nhà máy địa phương sản xuất → tránh rủi ro chính trị, không cần vốn đầu tư lớn, linh hoạt khi demand thay đổi. Ví dụ: Apple thuê Foxconn (Taiwan/China) sản xuất iPhone; Nike thuê nhà máy Việt Nam. Nhược điểm: mất kiểm soát chất lượng, rủi ro IP (bí mật công nghệ bị sao chép), phụ thuộc nhà thầu. So sánh entry modes: Export (rủi ro thấp, kiểm soát thấp) → Licensing/Franchising → Contract Manufacturing → JV → Wholly-Owned Subsidiary (rủi ro cao, kiểm soát cao).',
    },
  ],
};

// ─── Aggregator ───────────────────────────────────────────────
export const ECONOMICS_YEAR3_SCENARIOS = {
  [E31_QUIZ.id]: E31_QUIZ,
  [E32_QUIZ.id]: E32_QUIZ,
  [E33_QUIZ.id]: E33_QUIZ,
  [E34_QUIZ.id]: E34_QUIZ,
  [E35_QUIZ.id]: E35_QUIZ,
  [E36_QUIZ.id]: E36_QUIZ,
  [E37_QUIZ.id]: E37_QUIZ,
};
