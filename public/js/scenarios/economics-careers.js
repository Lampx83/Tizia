// ============================================================
// Trường Kinh tế — Career Path Scenarios (EC01–EC04)
// ============================================================
// 4 quiz hướng nghiệp cho sinh viên Kinh tế cuối khoá:
//   EC01 — Kế toán & Kiểm toán  (10 câu)
//   EC02 — Tài chính & Ngân hàng (10 câu)
//   EC03 — Marketing & Brand     (10 câu)
//   EC04 — Khởi nghiệp & Founder (10 câu)
// Tổng 40 câu, difficulty 3–4, focus thực tiễn nghề nghiệp VN.
// ============================================================

// ─────────────────────────────────────────────────────────────
// EC01 — Kế toán – Kiểm toán
// ─────────────────────────────────────────────────────────────
export const EC01_QUIZ = {
  id: 'EC01-career-quiz',
  title: 'EC01 · Career · Kế toán – Kiểm toán — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['accounting', 'auditing', 'career-planning'],
  questions: [
    {
      stem: 'Chứng chỉ ACCA (Association of Chartered Certified Accountants) có bao nhiêu kỳ thi tổng cộng?',
      choices: ['9 kỳ', '13 kỳ (Applied Knowledge 3 + Applied Skills 6 + Strategic Professional 4)', '5 kỳ', '20 kỳ'],
      answer: 1,
      explanation: 'ACCA gồm 13 bài thi: Applied Knowledge (AB, MA, FA) → Applied Skills (LW, PM, TX, FR, AA, FM) → Strategic Professional (SBL, SBR + 2 Optional). Có thể miễn trừ tối đa 9 bài nếu có bằng Đại học phù hợp. Tại Việt Nam, nhiều đại học (NEU, UEH, FTU) có chương trình tích hợp ACCA.'
    },
    {
      stem: '"Big 4" trong kiểm toán gồm những công ty nào?',
      choices: [
        'Deloitte, PwC, EY, KPMG',
        'Deloitte, PwC, EY, Grant Thornton',
        'KPMG, BDO, RSM, Mazars',
        'PwC, Deloitte, McKinsey, BCG'
      ],
      answer: 0,
      explanation: 'Big 4: Deloitte, PricewaterhouseCoopers (PwC), Ernst & Young (EY), KPMG. Tại Việt Nam, Big 4 chiếm phần lớn kiểm toán doanh nghiệp niêm yết và FDI. Ngoài Big 4, còn có Grant Thornton, BDO, Mazars, RSM (nhóm "Next Tier").'
    },
    {
      stem: 'Lộ trình thăng tiến phổ biến tại một công ty kiểm toán Big 4 là?',
      choices: [
        'Trainee → Senior → Manager → Partner (7–10 năm)',
        'Internship → Junior Associate → Associate → Senior Associate → Manager → Senior Manager → Director → Partner (10–15 năm)',
        'Nhân viên → Trưởng phòng → Giám đốc (3 năm)',
        'Trực tiếp vào vị trí Senior Manager sau khi tốt nghiệp'
      ],
      answer: 1,
      explanation: 'Big 4 có thang lương/chức danh rõ ràng: 0–2 năm (Associate), 2–4 năm (Senior Associate), 4–6 năm (Manager), 6–10 năm (Senior Manager), 10+ năm (Director/Partner). Nhiều người sau 3–5 năm Big 4 chuyển sang doanh nghiệp ("fly-away") với vị trí kế toán trưởng hoặc internal audit.'
    },
    {
      stem: 'Kiểm toán nội bộ (Internal Audit) khác kiểm toán độc lập (External Audit) ở điểm cốt lõi nào?',
      choices: [
        'Internal audit không cần chứng chỉ chuyên môn',
        'Internal audit báo cáo cho Ban kiểm soát/HĐQT, phục vụ quản trị nội bộ; External audit độc lập với doanh nghiệp, phát hành ý kiến kiểm toán cho cổ đông và bên ngoài',
        'Internal audit chỉ làm ở ngân hàng',
        'External audit làm trong văn phòng công ty khách hàng còn internal audit làm ở công ty kiểm toán'
      ],
      answer: 1,
      explanation: 'Internal auditor là nhân viên của doanh nghiệp, giúp cải thiện hệ thống kiểm soát nội bộ và quản lý rủi ro (IIA Standards). Chứng chỉ phù hợp: CIA (Certified Internal Auditor), CISA (IS audit). External auditor độc lập, phát hành báo cáo kiểm toán theo VAS/IFRS.'
    },
    {
      stem: 'Kế toán quản trị (Management Accounting) hướng đến đối tượng nào?',
      choices: [
        'Cơ quan thuế',
        'Nhà đầu tư bên ngoài',
        'Ban lãnh đạo nội bộ — phục vụ ra quyết định, lập kế hoạch, kiểm soát chi phí',
        'Ngân hàng cho vay'
      ],
      answer: 2,
      explanation: 'Kế toán quản trị (Management Accounting) cung cấp thông tin cho nội bộ: phân tích CVP, lập ngân sách, phân bổ chi phí ABC, Balanced Scorecard. Chứng chỉ phù hợp: CIMA/CGMA (Chartered Institute of Management Accountants). Trái với kế toán tài chính hướng đến báo cáo bên ngoài.'
    },
    {
      stem: 'Thuế thu nhập doanh nghiệp (TNDN) tiêu chuẩn tại Việt Nam hiện nay là bao nhiêu?',
      choices: ['10%', '15%', '20% (ưu đãi 10% cho doanh nghiệp công nghệ cao, KCN)', '25%'],
      answer: 2,
      explanation: 'Thuế TNDN phổ thông là 20% (Luật 14/2008, sửa đổi). Ưu đãi 10% cho 15 năm (hoặc cả vòng đời) với doanh nghiệp CNC, KKT, vùng sâu. 17% cho một số ngành. Chuyên gia tư vấn thuế (Tax Advisor) thuộc ngành hot với nhu cầu tư vấn chuyển giá (transfer pricing), thuế FDI.'
    },
    {
      stem: 'Chứng chỉ CPA Việt Nam do cơ quan nào cấp và yêu cầu gì?',
      choices: [
        'Hội Kế toán Viên Hành nghề Việt Nam (VACPA) — đủ 3 năm kinh nghiệm + thi 9 môn theo Bộ Tài chính',
        'ACCA London',
        'ICAEW Anh Quốc',
        'Bộ Kế hoạch & Đầu tư'
      ],
      answer: 0,
      explanation: 'CPA Việt Nam (Certified Public Accountant) do Bộ Tài chính/VACPA quản lý. Điều kiện: đại học chuyên ngành KT-TC + 3 năm kinh nghiệm thực tế + thi đủ 9 môn (theo Thông tư 91/2017). Hành nghề kiểm toán bắt buộc có CPA Việt Nam hoặc chứng chỉ tương đương được công nhận.'
    },
    {
      stem: 'Forensic Accounting (kế toán pháp y) chủ yếu được ứng dụng trong?',
      choices: [
        'Lập báo cáo tài chính thường niên',
        'Điều tra gian lận tài chính, kiện tụng, phá sản, rửa tiền — thường phối hợp với cơ quan pháp luật và tòa án',
        'Kế toán chi phí sản xuất',
        'Lập kế hoạch thuế'
      ],
      answer: 1,
      explanation: 'Forensic Accountants điều tra: gian lận BCTC (Enron, WorldCom), biển thủ tài sản, rửa tiền, định giá thiệt hại kinh tế trong tranh chấp thương mại. Chứng chỉ: CFE (Certified Fraud Examiner). Nhu cầu tăng cao khi VN đẩy mạnh chống tham nhũng.'
    },
    {
      stem: 'IFRS (International Financial Reporting Standards) và VAS (Vietnamese Accounting Standards) hiện nay có mối quan hệ như thế nào?',
      choices: [
        'Hoàn toàn giống nhau',
        'VAS được ban hành dựa trên IAS/IFRS cũ (trước 2005) và chưa cập nhật hết; Việt Nam đang lộ trình áp dụng IFRS bắt buộc cho công ty niêm yết từ 2025 (tự nguyện từ 2022)',
        'IFRS không áp dụng tại Việt Nam',
        'VAS khắt khe hơn IFRS về ghi nhận doanh thu'
      ],
      answer: 1,
      explanation: 'Theo Quyết định 345/2020/QĐ-BTC: từ 2022 cho phép DN áp dụng IFRS tự nguyện; từ 2025 bắt buộc với công ty niêm yết trên HNX/HoSE có vốn > 120 tỷ. Nhân lực IFRS sẽ thiếu hụt lớn — cơ hội cho sinh viên đầu tư học sớm.'
    },
    {
      stem: 'Mức lương khởi điểm của Fresh Graduate ngành Kế toán – Kiểm toán tại Hà Nội/TP.HCM (2024) thường là?',
      choices: [
        '4–6 triệu/tháng',
        '7–12 triệu/tháng (Big 4 cao hơn non-Big 4 ~20–30%)',
        '20–30 triệu/tháng',
        '2–3 triệu/tháng'
      ],
      answer: 1,
      explanation: 'Theo khảo sát Navigos/Talentnet: fresh KT-KT tại Big 4 khoảng 9–12 triệu, non-Big 4 và doanh nghiệp nội địa 6–9 triệu. Sau 3 năm Big 4 (Senior Associate) đạt 18–25 triệu. Manager 40–70 triệu. Lương tăng nhanh khi có ACCA/CPA.'
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// EC02 — Tài chính – Ngân hàng
// ─────────────────────────────────────────────────────────────
export const EC02_QUIZ = {
  id: 'EC02-career-quiz',
  title: 'EC02 · Career · Tài chính – Ngân hàng — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['finance', 'banking', 'investment', 'career-planning'],
  questions: [
    {
      stem: 'Chứng chỉ CFA (Chartered Financial Analyst) có bao nhiêu Level và ai cấp?',
      choices: [
        '2 Level, do FINRA (Mỹ) cấp',
        '3 Level (I, II, III), do CFA Institute (Mỹ) cấp — tỉ lệ pass toàn bộ 3 Level chỉ khoảng 10–15%',
        '5 Level, do IMF cấp',
        '1 Level, do Ngân hàng Nhà nước cấp'
      ],
      answer: 1,
      explanation: 'CFA Institute (Charlottesville, Virginia): 3 Level, thi 1 lần/năm (Level I cũng có thể thi 4 lần/năm từ 2021). Pass rate Level I ~40%, Level II ~45%, Level III ~52%, nhưng tổng tích lũy chỉ ~10–15% đăng ký ban đầu hoàn thành cả 3 Level. Yêu cầu 4000 giờ kinh nghiệm để nhận charter.'
    },
    {
      stem: 'Sự khác biệt chính giữa Investment Banking (IB) và Commercial Banking (CB)?',
      choices: [
        'IB nhận tiền gửi từ dân chúng, CB không nhận',
        'IB tư vấn M&A, phát hành cổ phiếu/trái phiếu, giao dịch thị trường vốn; CB cho vay tiêu dùng và doanh nghiệp, nhận tiền gửi',
        'Không có sự khác biệt, đây chỉ là 2 tên gọi khác nhau',
        'CB thuộc khu vực nhà nước còn IB thuộc tư nhân'
      ],
      answer: 1,
      explanation: 'IB (Vietcap, SSI, HSC, VCBS…) tư vấn IPO, M&A, phát hành trái phiếu doanh nghiệp, giao dịch phái sinh. CB (Vietcombank, BIDV, Techcombank…) cho vay, nhận tiền gửi, thanh toán. Sau Glass-Steagall Act (Mỹ) 1933 phân tách hai lĩnh vực — bãi bỏ 1999 (Gramm-Leach-Bliley).'
    },
    {
      stem: 'Phân tích tín dụng (Credit Analysis) trong ngân hàng thương mại tập trung vào điều gì?',
      choices: [
        'Đánh giá giá trị thị trường cổ phiếu',
        'Đánh giá khả năng trả nợ của người vay: 5C (Character, Capacity, Capital, Collateral, Conditions) và xếp hạng tín dụng nội bộ',
        'Phân tích xu hướng thị trường chứng khoán',
        'Thiết lập chiến lược marketing của ngân hàng'
      ],
      answer: 1,
      explanation: '5C: Character (uy tín người vay), Capacity (khả năng trả nợ — DSCR, Debt/EBITDA), Capital (vốn chủ sở hữu), Collateral (tài sản đảm bảo — LTV ratio), Conditions (ngành, vĩ mô). Ngân hàng còn dùng xếp hạng tín dụng nội bộ (IRB approach) theo Basel II/III.'
    },
    {
      stem: 'FRM (Financial Risk Manager) chứng chỉ do tổ chức nào cấp và phù hợp với vị trí nào?',
      choices: [
        'CFA Institute — phù hợp với equity analyst',
        'GARP (Global Association of Risk Professionals) — phù hợp với Risk Manager, Credit Risk Analyst, Market Risk Analyst tại ngân hàng và tổ chức tài chính',
        'ICAEW — phù hợp với kế toán',
        'ACCA — phù hợp với kiểm toán'
      ],
      answer: 1,
      explanation: 'FRM (GARP) gồm 2 phần: Part I (quantitative analysis, financial markets, risk models) + Part II (market risk, credit risk, operational risk, liquidity risk, investment management). Tại Việt Nam nhu cầu FRM tăng mạnh khi ngân hàng áp dụng Basel II/III và IFRS 9 (phân loại nợ và trích lập).'
    },
    {
      stem: 'Fintech (Financial Technology) đang ảnh hưởng đến ngành ngân hàng theo hướng nào?',
      choices: [
        'Không ảnh hưởng vì ngân hàng được nhà nước bảo vệ',
        'Tạo ra cạnh tranh và cơ hội mới: mobile banking, lending P2P, insurtech, wealthtech, open banking API — buộc ngân hàng truyền thống đổi mới số',
        'Chỉ ảnh hưởng đến ngân hàng nước ngoài',
        'Fintech chỉ là trend ngắn hạn, không có tương lai'
      ],
      answer: 1,
      explanation: 'Fintech disruption: MoMo/ZaloPay (payment), Tima/Finhay (P2P/investment), VNPAY (gateway). Open Banking (Nghị định 52/2024) bắt buộc ngân hàng mở API. Cơ hội việc làm mới: Product Manager FinTech, Data Analyst, API Developer, UX/Financial Product Designer.'
    },
    {
      stem: 'Bộ phận Treasury (Ngân quỹ) trong doanh nghiệp lớn chịu trách nhiệm gì?',
      choices: [
        'Lập báo cáo tài chính',
        'Quản lý thanh khoản, tiền mặt (cash management), phòng ngừa rủi ro tỷ giá/lãi suất bằng công cụ phái sinh, quản lý quan hệ ngân hàng',
        'Tuyển dụng và đào tạo nhân sự',
        'Phân tích thị trường marketing'
      ],
      answer: 1,
      explanation: 'Treasury (Ngân quỹ): cash pooling, FX hedging (forward/option), interest rate swap, debt management. Vị trí Treasury Analyst/Manager đòi hỏi hiểu biết về tài chính phái sinh (Bloomberg, Reuters). Thường thuộc CFO office trong các tập đoàn lớn (Vingroup, Masan, FPT, Samsung VN).'
    },
    {
      stem: 'Lãi suất SOFR (Secured Overnight Financing Rate) thay thế LIBOR từ?',
      choices: [
        'SOFR chưa thay thế LIBOR',
        'Ngày 30/6/2023 — USD LIBOR chính thức bị xóa bỏ, SOFR là lãi suất tham chiếu mới cho hợp đồng USD',
        'Ngày 1/1/2025',
        'SOFR chỉ áp dụng ở Châu Á'
      ],
      answer: 1,
      explanation: 'LIBOR scandal (2012) dẫn đến quyết định thay thế: SOFR (USD), SONIA (GBP), TONAR (JPY), €STR (EUR). USD LIBOR dừng 30/6/2023. Quan trọng với sinh viên Tài chính VN vì nhiều hợp đồng vay ngoại tệ của doanh nghiệp VN từng dùng LIBOR.'
    },
    {
      stem: 'Private Equity (PE) khác Venture Capital (VC) ở điểm gì?',
      choices: [
        'Không có sự khác biệt',
        'PE đầu tư vào công ty trưởng thành, thường mua buyout/controlling stake, dùng đòn bẩy (LBO); VC đầu tư vào startup giai đoạn sớm, minority stake, ưu tiên tăng trưởng cao',
        'VC đầu tư vào bất động sản còn PE đầu tư vào startup',
        'PE chỉ dành cho nhà đầu tư nước ngoài tại Việt Nam'
      ],
      answer: 1,
      explanation: 'PE firms (Warburg Pincus, KKR, Mekong Capital, VinaCapital) mua buyout công ty trưởng thành, tái cơ cấu, exit sau 5–7 năm. VC (IDG Ventures VN, Do Ventures, 500 Startups VN) đầu tư seed/Series A vào startup. Career path: PE/VC analyst thường qua IB hoặc consulting trước.'
    },
    {
      stem: 'Ngân hàng Nhà nước Việt Nam (NHNN) có vai trò gì trong hệ thống ngân hàng?',
      choices: [
        'Ngân hàng thương mại lớn nhất',
        'Ngân hàng trung ương: điều hành chính sách tiền tệ (lãi suất, tỷ giá, cung tiền M2), giám sát và cấp phép ngân hàng thương mại, quản lý dự trữ ngoại hối',
        'Chỉ cấp phép cho ngân hàng nước ngoài',
        'Không có thẩm quyền với ngân hàng tư nhân'
      ],
      answer: 1,
      explanation: 'NHNN là ngân hàng trung ương VN (Luật NHNN 2010): phát hành tiền, điều hành tỷ giá USD/VND, ấn định lãi suất điều hành (repo rate, OMO). Career tại NHNN (thanh tra, nghiên cứu kinh tế, ổn định tài chính) cạnh tranh, yêu cầu bằng giỏi và tiếng Anh tốt.'
    },
    {
      stem: 'Lương khởi điểm của Credit Analyst tại ngân hàng thương mại lớn (Vietcombank, Techcombank) TP.HCM là?',
      choices: [
        '3–4 triệu/tháng',
        '10–15 triệu/tháng (fresh graduate), tăng lên 20–30 triệu sau 3–4 năm khi lên Senior',
        '50–70 triệu/tháng (fresh graduate)',
        '6–8 triệu/tháng (fixed, không có biến đổi)'
      ],
      answer: 1,
      explanation: 'Navigos/VietnamWorks khảo sát: credit analyst mới ra trường 9–14 triệu tại ngân hàng lớn, cộng KPI/commission. Senior Credit Analyst (4–6 năm) 22–35 triệu. Relationship Manager (RM) quản lý khách hàng DN có thể có bonus/commission lớn. IB analyst tại CTCK lớn: 15–20 triệu + deal bonus.'
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// EC03 — Marketing & Brand Manager
// ─────────────────────────────────────────────────────────────
export const EC03_QUIZ = {
  id: 'EC03-career-quiz',
  title: 'EC03 · Career · Marketing & Brand Manager — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['marketing', 'brand-management', 'digital-marketing', 'career-planning'],
  questions: [
    {
      stem: 'Brand Manager tại công ty FMCG (Unilever, P&G, Nestlé) thường chịu trách nhiệm gì?',
      choices: [
        'Chỉ thiết kế logo và bao bì sản phẩm',
        'Quản lý toàn bộ vòng đời thương hiệu: định vị, phát triển sản phẩm mới (NPD), lập kế hoạch marketing (ATL/BTL), P&L của nhãn hàng, phối hợp với agency sáng tạo',
        'Chỉ chạy quảng cáo Facebook và Google',
        'Quản lý kho hàng và logistics'
      ],
      answer: 1,
      explanation: 'Brand Manager tại FMCG là "mini-CEO" của nhãn hàng: đặt mục tiêu brand equity, ngân sách marketing, phát triển sản phẩm mới, theo dõi market share (Nielsen/Kantar). Lộ trình: Brand Executive → Assistant Brand Manager → Brand Manager → Marketing Manager → Marketing Director → CMO. P&G, Unilever VN là "trường đào tạo" brand management nổi tiếng.'
    },
    {
      stem: 'Chỉ số CTR (Click-Through Rate) trong digital marketing được tính như thế nào?',
      choices: [
        'CTR = Tổng doanh thu / Tổng chi phí',
        'CTR = (Số click / Số hiển thị) × 100%; CTR trung bình Google Search Ads khoảng 3–5%, Display Ads < 1%',
        'CTR = Số người dùng mới / Tổng người dùng',
        'CTR = Tổng tiền bỏ ra cho quảng cáo / Tổng doanh thu'
      ],
      answer: 1,
      explanation: 'CTR đo hiệu quả thu hút click của quảng cáo. CTR cao = ad copy hấp dẫn và target đúng. Tối ưu CTR bằng A/B test tiêu đề, hình ảnh, CTA. Google Search CTR 5–10% là tốt; Display 0.1% đã đạt trung bình. Metric quan trọng song song: CPC (Cost Per Click), Conversion Rate, ROAS (Return On Ad Spend).'
    },
    {
      stem: 'Brand Positioning (định vị thương hiệu) theo framework nào được dùng phổ biến nhất?',
      choices: [
        'SWOT Analysis',
        'Positioning Statement: "For [target audience], [brand] is the [frame of reference] that delivers [key benefit] because [reason to believe]" — và Perceptual Map (bản đồ nhận thức)',
        'BCG Matrix',
        'Porter\'s Five Forces'
      ],
      answer: 1,
      explanation: 'Positioning Statement (Al Ries & Jack Trout "Positioning: The Battle for Your Mind"): xác định rõ target, category (frame of reference), differentiator (POD — Point of Difference) và RTB (Reason to Believe). Perceptual Map vẽ sơ đồ 2 trục (VD: giá vs chất lượng) để thấy vị trí brand so với đối thủ.'
    },
    {
      stem: 'Chỉ số NPS (Net Promoter Score) đo lường gì?',
      choices: [
        'Doanh thu tăng trưởng hàng tháng',
        'Mức độ khách hàng sẵn sàng giới thiệu thương hiệu cho người khác, thang điểm 0–10; NPS = %Promoters (9–10) − %Detractors (0–6)',
        'Số lượng sản phẩm bán ra mỗi tháng',
        'Chi phí cho mỗi khách hàng mới'
      ],
      answer: 1,
      explanation: 'NPS (Fred Reichheld, Bain & Company, 2003): Promoters (9–10) − Detractors (0–6) = NPS. Passive (7–8) không tính. NPS > 50 là xuất sắc; Apple ~73, Amazon ~62. Đo loyalty và dự đoán tăng trưởng tốt hơn satisfaction đơn thuần. Công cụ phổ biến: SurveyMonkey, Qualtrics, Hotjar.'
    },
    {
      stem: 'Sự khác biệt giữa làm việc tại Agency Marketing và In-house Marketing?',
      choices: [
        'Agency làm thương hiệu lớn hơn, In-house làm thương hiệu nhỏ hơn',
        'Agency: đa dạng client, tốc độ học nhanh, áp lực cao, lương trung bình; In-house: tập trung 1 brand, hiểu sâu business, có cơ hội P&L, lương thường cao hơn senior level',
        'Không có sự khác biệt vì đều làm marketing',
        'Agency chỉ làm social media còn In-house làm toàn bộ'
      ],
      answer: 1,
      explanation: 'Agency (Dentsu, Ogilvy, Leo Burnett VN, Masan Agency…): đa dạng project, network rộng, áp lực KPI/deadline cao. Thích hợp giai đoạn đầu sự nghiệp để build portfolio. In-house (Vinamilk, Masan, VinFast…): đi sâu vào một brand ecosystem, có thể thăng tiến lên Brand Director. Nhiều người đi agency 3–5 năm rồi chuyển in-house.'
    },
    {
      stem: 'ROAS (Return On Ad Spend) = 5 có nghĩa là?',
      choices: [
        'Chi phí quảng cáo gấp 5 lần doanh thu',
        'Mỗi 1 VNĐ đầu tư vào quảng cáo tạo ra 5 VNĐ doanh thu (ROAS = Doanh thu / Chi phí quảng cáo)',
        'Tỉ lệ click/impression là 5%',
        'Có 5 người xem quảng cáo'
      ],
      answer: 1,
      explanation: 'ROAS = Revenue / Ad Spend. ROAS 5 (hoặc 500%) nghĩa là: chi 1 triệu quảng cáo → thu 5 triệu doanh thu. Break-even ROAS phụ thuộc gross margin. Nếu gross margin 30%, cần ROAS > 3.3 để có lãi. Performance Marketing Manager tối ưu ROAS qua các kênh Google, Meta, TikTok Ads.'
    },
    {
      stem: 'Influencer Marketing phân loại Mega/Macro/Micro/Nano dựa trên?',
      choices: [
        'Loại nội dung (video, ảnh, text)',
        'Số lượng followers: Nano (<10K), Micro (10K–100K), Macro (100K–1M), Mega (>1M); Micro có engagement rate cao hơn, cost-effective cho thương hiệu nhỏ',
        'Tuổi của influencer',
        'Ngành hàng mà influencer review'
      ],
      answer: 1,
      explanation: 'Phân loại phổ biến: Nano (<10K — engagement ~8%), Micro (10K–100K — 3–6%), Macro (100K–1M — 1–3%), Mega (>1M — 0.5–1%). Micro-influencer thường cost-effective hơn (CPM thấp, audience niche). Tại VN: Mega là celeb/KOL nổi tiếng; Micro là review beauty/food/edu.'
    },
    {
      stem: 'Product Marketing Manager (PMM) tại công ty tech khác Brand Manager FMCG ở điểm gì?',
      choices: [
        'Không có sự khác biệt',
        'PMM tập trung go-to-market, positioning sản phẩm tech, sales enablement, competitive analysis, thường phối hợp chặt với Product Manager và Engineering; BM FMCG thiên về brand equity, consumer insight, ATL/BTL',
        'PMM chỉ viết content còn BM FMCG làm toàn bộ',
        'PMM chỉ ở công ty nước ngoài'
      ],
      answer: 1,
      explanation: 'PMM (Product Marketing Manager): cầu nối giữa Product và Sales/Marketing. Viết messaging, launch kit, battle card, case studies. Phổ biến tại SaaS, B2B tech (VNG, Tiki, Zalo, Shopee VN). BM FMCG thiên về consumer brand building — ATL (TV, OOH) + BTL (POSM, sampling, trade activation).'
    },
    {
      stem: 'Google Analytics 4 (GA4) khác Universal Analytics (UA) ở điểm cốt lõi nào?',
      choices: [
        'GA4 trả phí còn UA miễn phí',
        'GA4 dựa trên sự kiện (event-based), không phụ thuộc cookie, cross-platform (web + app); UA dựa trên session/pageview, cookie-dependent. UA đã tắt từ 1/7/2023',
        'Không có sự khác biệt đáng kể',
        'GA4 chỉ dùng cho mobile app'
      ],
      answer: 1,
      explanation: 'GA4 migration bắt buộc từ 1/7/2023. GA4: event-based model (mỗi tương tác là event), Machine Learning dự báo (predictive audiences), BigQuery export miễn phí, privacy-first (cookieless). Digital marketer cần thành thạo GA4 để đo attribution và tối ưu funnel.'
    },
    {
      stem: 'Lương của Marketing Executive mới ra trường tại TP.HCM trong ngành FMCG hoặc Digital Agency là?',
      choices: [
        '2–3 triệu/tháng',
        '8–14 triệu/tháng; tăng nhanh sau 2–3 năm kinh nghiệm và chứng chỉ Google/Meta/HubSpot',
        '30–50 triệu/tháng',
        '5 triệu (cố định, không tăng)'
      ],
      answer: 1,
      explanation: 'Marketing Executive fresh: 8–12 triệu (agency) hoặc 9–14 triệu (FMCG in-house). Senior Brand Executive (2–3 năm): 16–22 triệu. Brand Manager (5+ năm): 30–50 triệu. CMO top doanh nghiệp: 100–300 triệu. Chứng chỉ Google Ads, Meta Blueprint, HubSpot tăng giá trị. Tăng nhanh hơn nếu biết data analytics (SQL, GA4, Power BI).'
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// EC04 — Khởi nghiệp – Founder
// ─────────────────────────────────────────────────────────────
export const EC04_QUIZ = {
  id: 'EC04-career-quiz',
  title: 'EC04 · Career · Khởi nghiệp & Founder — Hệ sinh thái startup VN',
  kind: 'quiz', subject: 'career', difficulty: 4,
  skillsTrained: ['entrepreneurship', 'startup', 'fundraising', 'business-model', 'career-planning'],
  questions: [
    {
      stem: 'Các giai đoạn gọi vốn (funding stages) của một startup thường diễn ra theo thứ tự nào?',
      choices: [
        'Series B → Series A → Seed → Pre-seed',
        'Pre-seed → Seed → Series A → Series B → Series C → IPO/M&A',
        'IPO → Series A → Seed',
        'Series A → Pre-seed → IPO → Seed'
      ],
      answer: 1,
      explanation: 'Pre-seed (founder/FFF/accelerator, < $500K): validate idea. Seed ($500K–$2M): PMF, traction đầu. Series A ($2M–$15M): scale product. Series B ($15M–$50M): expand. Series C+ ($50M+): growth/M&A. IPO (public market) hoặc M&A là exit phổ biến. VN: Momo (Series E), Tiki (Series F), VNPay (strategic). '
    },
    {
      stem: 'Term Sheet (bản điều khoản) trong giao dịch đầu tư startup thường bao gồm yếu tố nào KHÔNG thể thương lượng với investor mới vào?',
      choices: [
        'Số tiền đầu tư',
        'Valuation (định giá) và tỉ lệ cổ phần',
        'Liquidation preference (quyền ưu tiên thanh lý) — thường 1x non-participating là tiêu chuẩn thị trường, > 1x hoặc participating là bất lợi cho founder',
        'Tên thành viên HĐQT'
      ],
      answer: 2,
      explanation: 'Liquidation preference quyết định investor nhận lại gì khi exit: 1x non-participating = investor nhận lại số vốn hoặc quy đổi thành cổ phần (chọn cái nào lớn hơn). Participating preferred = investor nhận lại vốn + share upside (double-dip) — bất lợi cho founder. Anti-dilution (broad-based weighted average) cũng là điều khoản quan trọng.'
    },
    {
      stem: 'Hệ sinh thái startup Việt Nam (2024) có những tổ chức hỗ trợ/đầu tư nào nổi bật?',
      choices: [
        'Chỉ có nhà đầu tư nước ngoài, VN không có quỹ nội địa',
        'Quỹ nội địa: Do Ventures, Nextrans, VinaCapital Ventures, VSV Capital; Accelerator: Techfest, HATCH! Fair, VIISA; Nước ngoài: Sequoia (Surge), 500 Global, Monk\'s Hill, Picus Capital',
        'Chỉ có Vingroup Ventures',
        'Chỉ có nhà nước hỗ trợ (Quỹ Đầu tư Khởi nghiệp ĐMST)'
      ],
      answer: 1,
      explanation: 'Hệ sinh thái VN ngày càng trưởng thành: Do Ventures (đầu tư Elsa, Dat Bike), VinaCapital Ventures (Tiki, VNPay), VSV Capital (Giaohangnhanh). Accelerator: Techfest (MOST), VIISA (FPT+ICT), Topica Founder Institute. Singapore/SEA funds: Monk\'s Hill, Picus, Insignia, Forge Ventures. KOTRA, JETRO hỗ trợ startups có yếu tố Hàn/Nhật.'
    },
    {
      stem: 'Lean Canvas (Ash Maurya) khác Business Model Canvas (Osterwalder) ở điểm gì?',
      choices: [
        'Hoàn toàn giống nhau, chỉ khác tên',
        'Lean Canvas thay 4 ô: Customer Segments → Customer Segments + Early Adopters, Value Propositions → Unique Value Proposition, Key Partners → Problem, Key Resources → Solution — phù hợp giai đoạn đầu khi chưa biết rõ market',
        'Business Model Canvas dành cho startup còn Lean Canvas cho doanh nghiệp lớn',
        'Lean Canvas không có ô Revenue Streams'
      ],
      answer: 1,
      explanation: 'Lean Canvas (Ash Maurya, "Running Lean") tối ưu cho startup sớm: 9 ô gồm Problem, Customer Segments, Unique Value Proposition, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage. Quan trọng nhất là Problem-Solution Fit → Product-Market Fit. BMC (Osterwalder) phù hợp hơn khi mô hình đã rõ ràng.'
    },
    {
      stem: 'Dilution (pha loãng) 20% nghĩa là gì với founder?',
      choices: [
        'Doanh thu giảm 20%',
        'Sau vòng gọi vốn, tỉ lệ sở hữu của founder giảm 20% tương đối (VD: từ 100% → 80%) do phát hành cổ phần mới cho investor',
        'Chi phí marketing tăng 20%',
        'Nhân sự tăng thêm 20%'
      ],
      answer: 1,
      explanation: 'Pre-money valuation $4M + raise $1M → post-money $5M → investor owns 20% ($1M/$5M) → founder diluted từ 100% xuống 80%. Sau nhiều vòng, founder thường còn 15–30% khi IPO nhưng giá trị tuyệt đối cao hơn. Option Pool shuffle: investor yêu cầu tạo option pool trước khi tính valuation — dilutes founder thêm. Cap table management quan trọng.'
    },
    {
      stem: 'Product-Market Fit (PMF) được đo bằng chỉ số nào thực tế nhất?',
      choices: [
        'Số lượt download app',
        'Sean Ellis Test: >40% người dùng nói họ "very disappointed" nếu không có sản phẩm; cùng với retention cohort, organic growth, NPS > 50, low churn',
        'Số nhân viên',
        'Số vòng gọi vốn đã hoàn thành'
      ],
      answer: 1,
      explanation: 'Sean Ellis (GrowthHackers) survey: "How would you feel if you could no longer use [product]?" — >40% "very disappointed" = PMF. Retention curve flatten (không về 0) = organic PMF. Churn < 5%/tháng (SaaS) = tốt. Marc Andreessen: "PMF is when customers are pulling the product from you." Thiếu PMF là nguyên nhân số 1 startup thất bại (42% — CB Insights).'
    },
    {
      stem: 'Mô hình kinh doanh SaaS (Software as a Service) có chỉ số quan trọng nhất là?',
      choices: [
        'Số lượng code commit mỗi ngày',
        'ARR (Annual Recurring Revenue), MRR (Monthly), Churn Rate, LTV (Lifetime Value), CAC (Customer Acquisition Cost) — và tỉ lệ LTV/CAC > 3 là benchmark tốt',
        'Số lượng nhân viên engineering',
        'Số lượng server đang chạy'
      ],
      answer: 1,
      explanation: 'SaaS metrics: MRR = tổng doanh thu đăng ký tháng. ARR = MRR × 12. Net Revenue Retention (NRR) > 100% = upsell bù churn. LTV = ARPU / Churn Rate. CAC payback period < 12 tháng là tốt. Rule of 40: (Growth Rate % + Profit Margin %) ≥ 40 = healthy SaaS. Tại VN: Base.vn, Misa, KiotViet là SaaS nội địa hàng đầu.'
    },
    {
      stem: 'Các loại hình pháp lý phổ biến khi thành lập startup tại Việt Nam là?',
      choices: [
        'Chỉ có Công ty Cổ phần',
        'Công ty TNHH (1–2 thành viên) thành lập nhanh và đơn giản; Công ty Cổ phần (CTCP) phù hợp khi cần nhiều cổ đông, phát hành ESOP, gọi vốn VC — cần lưu ý Luật DN 2020',
        'Chỉ có Doanh nghiệp tư nhân',
        'Phải thành lập công ty nước ngoài trước'
      ],
      answer: 1,
      explanation: 'Startup giai đoạn đầu thường chọn TNHH 2TV vì đơn giản. Khi gọi vốn VC cần chuyển sang CTCP để phát hành cổ phần ưu đãi (Preferred Shares), ESOP (Employee Stock Option Plan). Lưu ý: luật VN chưa có Preferred Shares chính thức → các VC nước ngoài thường dùng cấu trúc offshore (Singapore HoldCo + VN OpCo). Tư vấn pháp lý startup: InvestPush, Dragon Law, Zion Law.'
    },
    {
      stem: 'ESOP (Employee Stock Option Plan) trong startup là gì và ý nghĩa với nhân viên?',
      choices: [
        'Chương trình bảo hiểm sức khoẻ cho nhân viên',
        'Quyền chọn mua cổ phần của công ty theo giá đã định (exercise/strike price) sau thời gian vesting — thường 4 năm vesting + 1 năm cliff; khi công ty exit (IPO/M&A), nhân viên có thể bán lãi lớn',
        'Lương tháng 13 cho nhân viên',
        'Chỉ áp dụng cho C-level, không áp dụng cho nhân viên thường'
      ],
      answer: 1,
      explanation: 'ESOP là công cụ thu hút và giữ chân talent khi không có đủ tiền mặt. Vesting schedule phổ biến: 4 năm với 1 năm cliff (nếu nghỉ trước 1 năm không nhận gì; sau đó vesting tuyến tính hàng tháng). Options chỉ có giá trị khi exit hoặc có secondary market. Unicorn exit có thể tạo ra "ESOP millionaires" (VNG IPO, VNPay M&A).'
    },
    {
      stem: 'Y Combinator (YC) là gì và tại sao được startup Việt Nam quan tâm?',
      choices: [
        'Một công ty phần mềm tại Việt Nam',
        'Accelerator hàng đầu thế giới (Mountain View, CA): đầu tư $500K cho 7% equity, 3 tháng intensive program, Demo Day với 1000+ investor; alumni gồm Airbnb, Stripe, Dropbox, Coinbase; startup VN đã có Abivin, Giaohangnhanh, Base.vn',
        'Một loại ngôn ngữ lập trình',
        'Quỹ đầu tư của Chính phủ Việt Nam'
      ],
      answer: 1,
      explanation: 'YC (Paul Graham, 2005): batch 2 lần/năm, ~200 startup/batch, tổng portfolio > 3,500 companies, tổng valuation > $600B (2024). Standard deal: $500K SAFE for 7% (từ 2022). Nổi tiếng với "Make something people want" + "Do things that don\'t scale". Startup VN: nên check YC application form và các essay để cải thiện pitch. Ngoài YC còn có Techstars, 500 Global, Antler (có văn phòng TP.HCM).'
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Bundle export
// ─────────────────────────────────────────────────────────────
export const ECONOMICS_CAREERS_SCENARIOS = {
  [EC01_QUIZ.id]: EC01_QUIZ,
  [EC02_QUIZ.id]: EC02_QUIZ,
  [EC03_QUIZ.id]: EC03_QUIZ,
  [EC04_QUIZ.id]: EC04_QUIZ,
};
