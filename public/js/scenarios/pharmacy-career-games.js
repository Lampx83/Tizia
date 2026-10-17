// ============================================================
// Pharmacy — Career Paths & Games (CP09, CP10, GC07, GC09, GC10)
// 5 quiz modules · 50 câu hỏi
// ============================================================
// Refs: Luật GDĐH 2018, QĐ 4056/QĐ-BYT (CKII Dược), Thông tư
// 02/2022/TT-BGDĐT (NCS), Nafosted 2024, ASHP PPMI 2030,
// FIP Congress 2024, WHO Good Pharmacy Practice 2011, PCNE OSCE
// Guidelines, FDA 510(k)/PMA pathways, ATC Classification (WHO),
// PCNE Classification v9.1, ISMP Medication Error Types.
// ============================================================

// ─────────────────────────────────────────────────────────────
// CP09 — Khởi nghiệp dược — Startup
// ─────────────────────────────────────────────────────────────
export const CP09_QUIZ = {
  id: 'CP09-quiz-01',
  title: 'CP09 · Khởi nghiệp Dược — Startup healthtech, vốn & pháp lý',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['entrepreneurship', 'healthtech', 'business-model', 'regulatory'],
  questions: [
    {
      stem: 'Một dược sĩ muốn lập startup ứng dụng kê đơn trực tuyến tại Việt Nam. Theo Thông tư 49/2017/TT-BYT, điều kiện pháp lý BẮT BUỘC nhất?',
      choices: [
        'Chỉ cần đăng ký doanh nghiệp (ERC)',
        'Phải có giấy phép hoạt động khám bệnh, chữa bệnh từ xa (telemedicine) theo quy định của BYT + bác sĩ kê đơn có chứng chỉ hành nghề hợp lệ',
        'Chỉ cần thuê bác sĩ nước ngoài',
        'Không cần giấy phép nếu dùng AI tự động kê đơn',
      ],
      answer: 1,
      explanation: 'Kê đơn trực tuyến tại VN thuộc phạm vi khám bệnh, chữa bệnh từ xa. Cần giấy phép hoạt động từ Sở Y tế + bác sĩ có chứng chỉ hành nghề. Ứng dụng AI không thay thế trách nhiệm pháp lý của bác sĩ.',
    },
    {
      stem: 'Startup dược muốn ra mắt thiết bị đo đường huyết cá nhân tại Mỹ. Pathway FDA phù hợp nhất cho Class II medical device (moderate risk)?',
      choices: [
        'Premarket Approval (PMA) — thử nghiệm lâm sàng đầy đủ',
        '510(k) clearance — chứng minh "substantially equivalent" với predicate device đã được phép lưu hành',
        'De Novo pathway — chỉ khi không có predicate',
        'Đăng ký trực tiếp với CMS không cần FDA',
      ],
      answer: 1,
      explanation: '510(k) là con đường phổ biến nhất cho Class II (moderate risk). Phải chứng minh SE với predicate device về intended use + technological characteristics. PMA dành cho Class III (high risk, ví dụ: pacemaker). De Novo dùng khi không có predicate device phù hợp.',
    },
    {
      stem: 'Trong mô hình kinh doanh healthtech, chỉ số TAM/SAM/SOM được dùng để?',
      choices: [
        'Tính chi phí R&D',
        'Đánh giá quy mô thị trường: Total Addressable Market → Serviceable AM → Serviceable Obtainable Market — trình bày cho nhà đầu tư',
        'Đo hiệu quả điều trị',
        'Tính toán cỡ mẫu thử nghiệm lâm sàng',
      ],
      answer: 1,
      explanation: 'TAM: tổng thị trường nếu chiếm 100%; SAM: phần TAM có thể phục vụ bằng mô hình hiện tại; SOM: phần thực tế có thể chiếm trong 3-5 năm. Nhà đầu tư dùng SOM để đánh giá tính khả thi và kế hoạch tăng trưởng.',
    },
    {
      stem: 'Một pharmacy startup đang ở giai đoạn "Seed". Nguồn vốn phù hợp nhất thường là?',
      choices: [
        'IPO (Initial Public Offering)',
        'Angel investors, accelerators (Y Combinator, Vingroup Ventures), và gọi vốn nhỏ (<$1 triệu) từ gia đình/bạn bè/FFF — trước khi chứng minh product-market fit',
        'Series C VC với định giá $100 triệu+',
        'Vay ngân hàng thương mại không thế chấp',
      ],
      answer: 1,
      explanation: 'Seed round: tiền angel/accelerator/FFF để validate idea, xây MVP, tìm PMF. Sau đó: Series A (scale), Series B (expansion), Series C (pre-IPO). VN có Shark Tank, Vingroup Ventures, Do Ventures, 500 Startups Vietnam.',
    },
    {
      stem: 'MVP (Minimum Viable Product) trong pharmacy startup nên được thiết kế để?',
      choices: [
        'Có đầy đủ tính năng hoàn hảo trước khi ra mắt',
        'Ra mắt nhanh nhất với tính năng cốt lõi tối thiểu để thu thập phản hồi người dùng thực và kiểm chứng giả thuyết kinh doanh',
        'Copy toàn bộ sản phẩm của đối thủ',
        'Dùng cho 10.000 người dùng ngay lần đầu',
      ],
      answer: 1,
      explanation: 'Lean Startup (Eric Ries): Build → Measure → Learn. MVP tối giản giúp validate assumptions với chi phí thấp nhất. Ví dụ: Landing page + email list trước khi code app. Pharmacy MVP: kết nối bác sĩ-bệnh nhân qua Zalo/form trước khi làm app đầy đủ.',
    },
    {
      stem: 'Một dược sĩ startup gặp khái niệm "Unit Economics". Chỉ số quan trọng nhất để biết business model có bền vững?',
      choices: [
        'Tổng số downloads ứng dụng',
        'LTV/CAC ratio (Lifetime Value / Customer Acquisition Cost) — lý tưởng LTV ≥ 3×CAC; nếu < 1 thì mất tiền mỗi khách hàng',
        'Số bài đăng trên mạng xã hội',
        'Số nhân viên công ty',
      ],
      answer: 1,
      explanation: 'LTV = doanh thu trung bình mỗi khách hàng trong suốt vòng đời. CAC = chi phí để có 1 khách hàng mới. Rule of thumb: LTV/CAC ≥ 3 và CAC payback ≤ 12 tháng. Đây là chỉ số VC nhìn đầu tiên.',
    },
    {
      stem: 'Startup dược muốn tích hợp AI chẩn đoán. Rủi ro pháp lý lớn nhất tại Việt Nam hiện nay?',
      choices: [
        'Chi phí điện toán đám mây quá cao',
        'Chưa có hành lang pháp lý rõ ràng cho AI y tế — nguy cơ trách nhiệm pháp lý nếu AI gây sai sót lâm sàng; FDA (Mỹ) phân loại SaMD (Software as Medical Device) nhưng VN chưa có quy định tương đương',
        'Thiếu kỹ sư AI',
        'Người dùng không chấp nhận AI',
      ],
      answer: 1,
      explanation: 'FDA SaMD Action Plan 2021: AI/ML-based SaMD cần thực hiện PCCP (Predetermined Change Control Plan). VN: Thông tư 39/2016/TT-BYT quản lý trang thiết bị y tế nhưng chưa đề cập SaMD. Startup phải chủ động tư vấn pháp lý và mua bảo hiểm trách nhiệm nghề nghiệp.',
    },
    {
      stem: 'Trong thuật ngữ VC/startup, "Burn Rate" là gì và tại sao quan trọng với startup dược?',
      choices: [
        'Tỉ lệ sản phẩm bị trả lại',
        'Tốc độ công ty tiêu hao tiền mặt mỗi tháng khi chưa có doanh thu (hoặc doanh thu < chi phí). Runway = Tiền mặt / Burn Rate — startup cần tối thiểu 12-18 tháng runway',
        'Nhiệt độ phòng sạch GMP',
        'Lãi suất vay ngân hàng',
      ],
      answer: 1,
      explanation: 'Burn rate quyết định "runway" — bao lâu nữa công ty hết tiền nếu không gọi thêm vốn. Startup dược thường burn rate cao do chi phí R&D, clinical trial. Quan trọng: phải cân bằng giữa tăng trưởng và efficiency.',
    },
    {
      stem: 'Hệ sinh thái khởi nghiệp dược/healthtech tại Việt Nam có đặc điểm nào đặc trưng so với Mỹ/Singapore?',
      choices: [
        'Hoàn toàn giống nhau',
        'Thị trường VN: dân số trẻ (60% dưới 35 tuổi), OOP healthcare spending cao (~60% chi phí y tế tự trả), chấp nhận công nghệ nhanh — nhưng hành lang pháp lý y tế chậm, vốn đầu tư HealthTech còn hạn chế so với FinTech',
        'VN không có startup dược nào',
        'VN có quy định pháp lý y tế cởi mở nhất thế giới',
      ],
      answer: 1,
      explanation: 'VN HealthTech cơ hội: OOP cao → nhu cầu giải pháp tiết kiệm chi phí. Thách thức: thiếu interoperability dữ liệu y tế, nhân lực kỹ thuật số y tế ít, quy định chậm thích nghi. Startup thành công: Long Châu (FPT), Pharmacity đã scale; HealthTech: EvenCare, Je m\'appelle, UMC Telehealth.',
    },
    {
      stem: 'Pitch deck của startup dược trình bày với VC thường gồm bao nhiêu slide và yếu tố nào QUAN TRỌNG NHẤT?',
      choices: [
        '50 slide với toàn bộ dữ liệu lâm sàng',
        '10-15 slide: Problem → Solution → Market Size → Business Model → Traction → Team → Financials → Ask. Yếu tố quan trọng nhất: TEAM (VC đầu tư vào con người) và TRACTION (chứng minh thị trường thực sự muốn sản phẩm)',
        'Chỉ cần 1 slide tóm tắt',
        '30 slide với nhiều biểu đồ khoa học nhất',
      ],
      answer: 1,
      explanation: 'Guy Kawasaki 10/20/30 rule: 10 slides, 20 phút, font 30pt. Sequoia Capital checklist: Purpose, Problem, Solution, Why now, Market, Product, Team, Business model, Financials. VC nói: "We invest in people first, idea second" — team với domain expertise dược là lợi thế cạnh tranh lớn.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// CP10 — Tiếp tục đào tạo — CKII, Tiến sĩ
// ─────────────────────────────────────────────────────────────
export const CP10_QUIZ = {
  id: 'CP10-quiz-01',
  title: 'CP10 · Tiếp tục đào tạo — CKII Dược, NCS Tiến sĩ & học thuật',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['postgraduate', 'research', 'academic-career', 'continuing-education'],
  questions: [
    {
      stem: 'Chương trình Chuyên khoa II (CKII) Dược tại Việt Nam có thời gian đào tạo và yêu cầu đầu vào chính là gì?',
      choices: [
        '1 năm, chỉ cần bằng Dược sĩ',
        '2 năm học tập trung, yêu cầu: bằng Dược sĩ đại học (hoặc CKI) + kinh nghiệm công tác ≥ 3 năm + thi tuyển đầu vào (theo QĐ 4056/QĐ-BYT)',
        '3 năm, không cần kinh nghiệm',
        '6 tháng, hình thức online hoàn toàn',
      ],
      answer: 1,
      explanation: 'CKII Dược (tương đương thạc sĩ lâm sàng): 2 năm tại các cơ sở được BYT công nhận (ĐH Dược HN, ĐH Y Dược TP.HCM, v.v.). Yêu cầu kinh nghiệm ≥ 3 năm giúp đảm bảo học viên có nền tảng lâm sàng thực tế.',
    },
    {
      stem: 'Điều kiện để được nhận vào Nghiên cứu sinh (NCS) Tiến sĩ Dược tại Việt Nam theo Thông tư 02/2022/TT-BGDĐT?',
      choices: [
        'Chỉ cần bằng đại học',
        'Bằng thạc sĩ (hoặc CKII/bằng tốt nghiệp ĐH loại giỏi + kinh nghiệm NC) + 2 bài báo khoa học liên quan hoặc đề cương NC được hội đồng thông qua + trình độ ngoại ngữ (B2 CEFR hoặc tương đương)',
        'Bằng Tiến sĩ từ nước ngoài',
        'Không cần điều kiện gì',
      ],
      answer: 1,
      explanation: 'TT 02/2022/TT-BGDĐT quy định: ứng viên NCS phải có bằng ThS hoặc tốt nghiệp ĐH xuất sắc/giỏi đúng ngành; ngoại ngữ B2/IELTS 5.5+; có 2 bài báo KH hoặc đề cương nghiên cứu khả thi. Thời gian NCS: 3-4 năm.',
    },
    {
      stem: 'Một dược sĩ đang viết luận án Tiến sĩ tại VN cần hoàn thành yêu cầu công bố quốc tế. Tiêu chí tối thiểu phổ biến nhất hiện nay?',
      choices: [
        'Không cần công bố quốc tế',
        'Tối thiểu 2 bài báo trên tạp chí quốc tế có phản biện (ISI/Scopus), trong đó ít nhất 1 bài NCS là tác giả đầu hoặc corresponding author — liên quan trực tiếp đến đề tài luận án',
        'Chỉ cần 1 bài báo trong nước',
        '10 bài báo Scopus Q1',
      ],
      answer: 1,
      explanation: 'Theo TT 02/2022 và quy chế của từng cơ sở đào tạo: thường yêu cầu ≥ 2 bài ISI/Scopus. Xu hướng hiện nay: nhiều trường nâng chuẩn lên Q1/Q2 hoặc Q3/Q4 Scopus. Kiểm tra cụ thể quy chế của từng trường trước khi đăng ký.',
    },
    {
      stem: 'Học bổng NAFOSTED (Quỹ Phát triển KH&CN Quốc gia) phù hợp cho Dược sĩ NCS ở giai đoạn nào?',
      choices: [
        'Chỉ cho sinh viên đại học',
        'Dành cho nhà khoa học từ 30-45 tuổi có thành tích NC tốt — hỗ trợ đề tài nghiên cứu cơ bản (Foundation) và ứng dụng; NCS có thể tham gia với tư cách thành viên đề tài hoặc chủ nhiệm sau khi có tiến sĩ',
        'Chỉ cho nhà khoa học nước ngoài',
        'Chỉ cho ngành vật lý và toán',
      ],
      answer: 1,
      explanation: 'NAFOSTED tài trợ nghiên cứu cơ bản (Foundation for Science and Technology Development). Các đề tài dược được tài trợ: nghiên cứu dược lý, bào chế nano, thực vật dược. NCS thường tham gia nhóm của thầy hướng dẫn — giúp có kinh phí NC và công bố quốc tế.',
    },
    {
      stem: 'Sự khác biệt giữa "PhD by thesis" và "PhD by publication" (còn gọi là thesis by publication)?',
      choices: [
        'Hoàn toàn giống nhau',
        'PhD by thesis: luận án gồm các chương truyền thống (Introduction, Methods, Results, Discussion). PhD by publication: luận án là tập hợp các bài báo đã được phản biện, kèm chương giới thiệu và kết luận tổng hợp — phổ biến ở châu Âu, đang áp dụng tại một số trường VN',
        'PhD by publication không cần thầy hướng dẫn',
        'PhD by publication chỉ dành cho ngành kỹ thuật',
      ],
      answer: 1,
      explanation: 'Thesis by publication (Scandinavian model): NCS nộp 3-5 bài báo đã đăng + kappa (chương tổng hợp). Ưu điểm: bài báo được phản biện độc lập trước khi nộp luận án. Nhược điểm: phụ thuộc thời gian review của tạp chí. VN đang chuyển dần sang mô hình này.',
    },
    {
      stem: 'Hội đồng bảo vệ luận án Tiến sĩ cấp Nhà nước tại Việt Nam gồm bao nhiêu thành viên và điều kiện của phản biện?',
      choices: [
        '3 thành viên, không cần tiến sĩ',
        '7 thành viên: Chủ tịch + 2 phản biện + 4 thành viên khác — tất cả phải có học vị TS trở lên, ít nhất 2 người là GS/PGS; 2 phản biện phải có chuyên môn phù hợp và ít nhất 1 từ ngoài cơ sở đào tạo',
        '5 thành viên, không cần phản biện độc lập',
        '10 thành viên, toàn bộ từ nước ngoài',
      ],
      answer: 1,
      explanation: 'TT 02/2022: Hội đồng cấp trường 5-7 thành viên; Hội đồng bảo vệ luận án NCS 7 thành viên, trong đó Chủ tịch + 2 phản biện. Phản biện phải đọc luận án và có nhận xét bằng văn bản. Nếu 1/3 hội đồng bỏ phiếu không đạt, phải bảo vệ lại.',
    },
    {
      stem: 'Postdoctoral fellowship (Postdoc) sau Tiến sĩ có mục tiêu chính là gì trong sự nghiệp học thuật?',
      choices: [
        'Là bước để ra làm tư nhân',
        'Giai đoạn 1-3 năm để xây dựng independent research track record: thêm publications (đặc biệt first-author/corresponding author), apply grants độc lập, xây dựng mạng lưới hợp tác quốc tế — điều kiện cần để ứng tuyển vị trí faculty/giảng viên tại trường đại học danh tiếng',
        'Chỉ để dạy học',
        'Bắt buộc trước khi làm Tiến sĩ',
      ],
      answer: 1,
      explanation: 'Academic career ladder: PhD → Postdoc (1-3 năm) → Assistant Professor → Associate Professor → Full Professor. Postdoc quan trọng ở VN vì giúp NCS có kinh nghiệm nghiên cứu quốc tế, learn new methodologies, build collaborations. Nhiều học bổng: VLIR-UOS (Bỉ), JSPS (Nhật), Humboldt (Đức).',
    },
    {
      stem: 'Một giảng viên Dược muốn nâng lương/thăng tiến lên Phó Giáo sư (PGS). Yêu cầu chính theo quy định VN hiện nay?',
      choices: [
        'Chỉ cần 5 năm kinh nghiệm giảng dạy',
        'Học vị Tiến sĩ + thời gian giảng dạy ≥ 3 năm sau tiến sĩ + hướng dẫn NCS/NCKH thành công + số công bố quốc tế đạt tiêu chuẩn (điểm công trình) + điểm ngoại ngữ — xét theo quy chế HĐGSNN (Hội đồng Giáo sư Nhà nước)',
        'Không cần công bố quốc tế',
        'Chỉ cần bằng thạc sĩ và 10 năm kinh nghiệm',
      ],
      answer: 1,
      explanation: 'HĐGSNN xét công nhận GS/PGS theo tiêu chí điểm công trình (publications, sách, đề tài, hướng dẫn). Dược thuộc nhóm Y-Dược: điểm bài báo ISI Q1=2đ, Q2=1.5đ, Q3/Q4=1đ, Scopus=0.75đ. Tổng điểm tối thiểu để phong PGS: thay đổi theo chu kỳ xét — thường 7-12 điểm (2024).',
    },
    {
      stem: 'Kỹ năng nào QUAN TRỌNG NHẤT mà nhà dược học thuật cần phát triển ngoài chuyên môn?',
      choices: [
        'Kỹ năng nấu ăn',
        'Grant writing (viết đề xuất nghiên cứu): khả năng trình bày ý tưởng NC thuyết phục để xin tài trợ là yếu tố sống còn — không có grant → không có kinh phí NC → không có bài báo → không có thăng tiến',
        'Kỹ năng marketing bán hàng',
        'Kỹ năng lái xe',
      ],
      answer: 1,
      explanation: 'Grant writing là "make or break" trong học thuật. Tỉ lệ thành công NIH R01 (Mỹ): ~15-20%. Kỹ năng quan trọng: xác định gap, aims rõ ràng, significance/innovation, approach chi tiết, budget hợp lý. VN: NAFOSTED, Vingroup Science Technology Fund, Bộ KHCN, hợp tác quốc tế.',
    },
    {
      stem: 'Học bổng quốc tế nào PHỔ BIẾN NHẤT cho dược sĩ VN muốn học Tiến sĩ/Postdoc ở nước ngoài?',
      choices: [
        'Không có học bổng nào cho dược sĩ VN',
        'VEF/Fulbright (Mỹ), Monbukagakusho MEXT (Nhật), DAAD (Đức), Hội đồng Anh/Chevening (Anh), VLIR-UOS (Bỉ), ADB Scholarship — nhiều học bổng yêu cầu acceptance letter từ trường + research proposal',
        'Chỉ có học bổng từ Trung Quốc',
        'Học bổng từ doanh nghiệp dược không tồn tại',
      ],
      answer: 1,
      explanation: 'Các nguồn phổ biến: Fulbright (cạnh tranh cao, cho MS/PhD/Scholar), MEXT Japan (PhD 5 năm full scholarship), DAAD Germany, Chevening UK. Yêu cầu chung: IELTS/TOEFL, thư giới thiệu, research proposal, acceptance letter. Tip: liên hệ PI/supervisor trước khi apply.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// GC07 — OSCE Championship
// ─────────────────────────────────────────────────────────────
export const GC07_QUIZ = {
  id: 'GC07-quiz-01',
  title: 'GC07 · OSCE Championship — Thi OSCE đỉnh cao, rubrics & bệnh nhân chuẩn',
  kind: 'quiz', subject: 'game', difficulty: 4,
  skillsTrained: ['osce', 'clinical-skills', 'assessment', 'communication'],
  questions: [
    {
      stem: 'OSCE (Objective Structured Clinical Examination) khác gì so với thi viết kiến thức thông thường?',
      choices: [
        'OSCE chỉ thi lý thuyết',
        'OSCE đánh giá kỹ năng lâm sàng thực tế qua nhiều trạm (stations) xoay vòng có chấm điểm theo checklist chuẩn hoá — tích hợp kiến thức, kỹ năng và thái độ; không thể "học tủ" như thi viết',
        'OSCE chỉ dành cho bác sĩ',
        'OSCE không có rubric chấm điểm',
      ],
      answer: 1,
      explanation: 'OSCE do Harden & Gleeson đề xuất 1975. Mỗi station: 5-10 phút, 1 task cụ thể (tư vấn, tính liều, xem xét đơn thuốc). Checklist chuẩn hoá → giảm bias examiner. FIP và ACPE khuyến nghị OSCE là "gold standard" đánh giá năng lực Dược sĩ.',
    },
    {
      stem: 'Tại OSCE trạm "Medication Counselling", bạn gặp bệnh nhân chuẩn (standardised patient — SP) than phiền tác dụng phụ của metformin. Bước TIÊN PHONG nhất?',
      choices: [
        'Đề nghị ngưng metformin ngay',
        'Khai thác thêm: "Bác bị triệu chứng gì và từ bao giờ?" — xác định tác dụng phụ GI thường gặp (buồn nôn/tiêu chảy khởi trị), hướng dẫn uống trong bữa ăn + titrate liều chậm, và phân biệt khỏi biến cố hiếm (lactic acidosis)',
        'Ghi chép rồi chuyển bác sĩ ngay',
        'Giải thích metformin không có tác dụng phụ',
      ],
      answer: 1,
      explanation: 'OSCE counselling: I-C-E (Ideas, Concerns, Expectations) + ASK → TELL → ASK. Metformin GI SEs thường gặp nhất (~20-30%): buồn nôn, tiêu chảy, đau bụng — giảm khi dùng trong bữa ăn + titration chậm. Lactic acidosis: hiếm (<0.001%), chủ yếu khi CKD nặng eGFR<30.',
    },
    {
      stem: 'Trong OSCE, "blueprinting" có nghĩa là gì và tại sao quan trọng?',
      choices: [
        'Màu nước sử dụng trong OSCE',
        'Bản đồ ma trận liên kết learning outcomes → stations: đảm bảo OSCE bao phủ đủ competency domains theo curriculum — tránh đánh giá lệch hoặc bỏ sót năng lực quan trọng',
        'Kỹ thuật in tài liệu hướng dẫn',
        'Phân chia phòng thi',
      ],
      answer: 1,
      explanation: 'OSCE Blueprint: matrix rows = competency domains (drug knowledge, counselling, calculation, patient assessment); columns = stations. Mỗi ô chỉ ra station nào bao phủ competency nào. Đây là bước thiết yếu trong QA của OSCE để đảm bảo content validity.',
    },
    {
      stem: 'Trạm OSCE tính liều thuốc nhi (Paediatric Dose Calculation): bé 20 kg cần amoxicillin 50 mg/kg/ngày, chia 3 lần. Liều mỗi lần là?',
      choices: [
        '100 mg',
        '333 mg (≈ 334 mg mỗi lần, tổng 1000 mg/ngày: 50×20=1000 mg/ngày ÷ 3 = 333 mg)',
        '500 mg',
        '666 mg',
      ],
      answer: 1,
      explanation: 'Tổng liều/ngày = 50 mg/kg × 20 kg = 1000 mg/ngày. Chia 3 lần → mỗi lần = 1000/3 ≈ 333 mg. Dạng bào chế thực tế: dùng gói 250 mg → 1 gói + ½ gói hoặc hỗn dịch 250 mg/5 mL → 6.7 mL. OSCE sẽ hỏi thêm về cách pha và hướng dẫn bảo quản.',
    },
    {
      stem: 'Kỹ năng "closed-loop communication" quan trọng trong OSCE trạm nào?',
      choices: [
        'Tất cả các trạm không liên quan',
        'Trạm xác minh đơn thuốc và nhận y lệnh miệng (verbal orders): dược sĩ lặp lại y lệnh để nurse/bác sĩ xác nhận — giảm medication error. Ví dụ: "Tôi xác nhận lại: Paracetamol 500 mg, 1 viên, mỗi 6 giờ, uống khi đau — đúng không ạ?"',
        'Chỉ dùng trong cấp cứu',
        'Chỉ khi giao ca',
      ],
      answer: 1,
      explanation: 'Closed-loop communication (CLC) = SBAR + read-back: sender nói → receiver lặp lại → sender xác nhận. WHO SBAR (Situation-Background-Assessment-Recommendation) chuẩn hoá giao tiếp trong y tế. Mỹ: The Joint Commission bắt buộc read-back cho verbal orders để ngăn wrong medication.',
    },
    {
      stem: 'SP (Standardised Patient) trong OSCE được huấn luyện để làm gì?',
      choices: [
        'Thực sự bị bệnh để thực hành thật',
        'Đóng vai bệnh nhân theo kịch bản chuẩn hoá: trình bày triệu chứng, phản ứng cảm xúc và thể chất nhất quán — đảm bảo mọi học viên gặp CÙNG tình huống, tăng tính công bằng và reliability của OSCE',
        'Chấm điểm thay giảng viên',
        'Giải thích đáp án sau thi',
      ],
      answer: 1,
      explanation: 'SP (Simulated/Standardised Patient): người lành được đào tạo 4-8 giờ để đóng vai nhất quán. SP assessment (SPAL): SP cũng điền checklist đánh giá kỹ năng giao tiếp và thái độ của học viên. SP đặc biệt quan trọng cho training các tình huống nhạy cảm (sức khoẻ tâm thần, tránh thai).',
    },
    {
      stem: 'Sau OSCE, feedback hiệu quả nhất cho học viên sử dụng mô hình nào?',
      choices: [
        'Chỉ nói điểm số cuối cùng',
        'Pendleton\'s Rules hoặc SCOPME model: học viên tự đánh giá → điểm mạnh → điểm cần cải thiện → kế hoạch hành động. Feedback cụ thể (specific), hành động được (actionable) và kịp thời (timely)',
        'Phê bình toàn bộ sai sót trước mặt bạn bè',
        'Không cần feedback vì OSCE chỉ là thi',
      ],
      answer: 1,
      explanation: 'Pendleton 1984: (1) Learner discusses what went well; (2) Facilitator adds what went well; (3) Learner discusses areas for improvement; (4) Facilitator adds areas for improvement; (5) Action plan. Điều kiện feedback tốt: riêng tư, đúng lúc (sau station ≤ 24h), dựa trên hành vi quan sát được.',
    },
    {
      stem: 'Điểm cắt (pass mark) của OSCE thi quốc gia Dược thường được thiết lập bằng phương pháp nào?',
      choices: [
        'Cố định 50% hoặc 60% cho mọi trường',
        'Modified Angoff method hoặc Borderline Group method — expert panel ước tính điểm "minimum competence" cho từng checklist item, không phải cắt cứng bất kể độ khó của đề thi',
        'Điểm trung bình của tất cả học viên',
        'Điểm giám khảo chấm cảm tính',
      ],
      answer: 1,
      explanation: 'Standard setting methods: Angoff — judges rate probability that borderline candidate answers each item correctly; Borderline group — giám khảo xác định "borderline candidates" sau OSCE, lấy điểm trung bình họ làm pass mark. Absolute standard (không so với nhóm) phù hợp OSCE có mục tiêu competency-based.',
    },
    {
      stem: 'PCNE (Pharmaceutical Care Network Europe) OSCE guidelines khuyến nghị mỗi station nên có thời gian bao lâu?',
      choices: [
        '1 phút',
        '5-10 phút/station cho lâm sàng thực hành (tư vấn, review đơn thuốc); 15-20 phút/station cho long case. Transition time giữa các station: 1-2 phút để đọc scenario tiếp theo',
        '30 phút/station',
        '60 phút cho toàn bộ OSCE',
      ],
      answer: 1,
      explanation: 'Độ dài station phụ thuộc task: counselling 8-10 phút, drug calculation 5-7 phút, patient assessment 10-15 phút, prescription review 10 phút. Tổng OSCE 10 stations × 8 phút = ~80-100 phút. Quá ngắn → không đủ thời gian; quá dài → mệt mỏi ảnh hưởng độ tin cậy.',
    },
    {
      stem: 'Tại trạm OSCE "Prescription Review", bạn phát hiện warfarin 10 mg/ngày cho bệnh nhân 80 tuổi, INR 3.8. Hành động ưu tiên?',
      choices: [
        'Cấp phát thuốc bình thường',
        'Gắn cờ đơn: warfarin 10 mg ở BN cao tuổi với INR 3.8 (trên ngưỡng điều trị 2.0-3.0) → nguy cơ xuất huyết cao; liên hệ bác sĩ đề nghị giảm liều + kiểm tra yếu tố tương tác (thực phẩm vitamin K, thuốc mới); hướng dẫn BN nhận biết dấu hiệu xuất huyết',
        'Tăng liều warfarin vì INR còn thấp',
        'Ngưng warfarin vô thời hạn',
      ],
      answer: 1,
      explanation: 'INR target AF/DVT: 2.0-3.0; cơ học van tim: 2.5-3.5. INR 3.8 > target → over-anticoagulation. BN cao tuổi (≥80 tuổi): nhạy cảm với warfarin hơn, CYP2C9 chậm hơn, clearance giảm. Action: không cấp phát ngay; call prescriber; xem xét giảm liều 10-15%; theo dõi INR 48-72h. OSCE checklist sẽ kiểm tra clinical reasoning và communication.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// GC09 — Pharmacy Quiz Bowl (đội)
// ─────────────────────────────────────────────────────────────
export const GC09_QUIZ = {
  id: 'GC09-quiz-01',
  title: 'GC09 · Pharmacy Quiz Bowl — Thi đấu nhanh: pharmacology, tên thuốc & medication safety',
  kind: 'quiz', subject: 'game', difficulty: 3,
  skillsTrained: ['pharmacology', 'drug-names', 'medication-safety', 'quick-recall'],
  questions: [
    {
      stem: 'Tên INN (International Nonproprietary Name) của thuốc tim mạch bán nhãn thương mại "Lipitor" là gì?',
      choices: ['Simvastatin', 'Atorvastatin', 'Rosuvastatin', 'Pravastatin'],
      answer: 1,
      explanation: 'Lipitor = Atorvastatin (Pfizer). Statin INN vs brand: Simvastatin=Zocor, Rosuvastatin=Crestor, Pravastatin=Pravachol. ATC code: C10AA05 (Atorvastatin). Cơ chế: ức chế HMG-CoA reductase → giảm cholesterol nội sinh → LDL giảm 40-60%.',
    },
    {
      stem: '"5 Rights of Medication Administration" bao gồm?',
      choices: [
        'Right drug, Right dose, Right patient, Right route, Right time',
        'Right drug, Right price, Right patient, Right route, Right time',
        'Right drug, Right dose, Right hospital, Right route, Right time',
        'Right drug, Right dose, Right patient, Right colour, Right time',
      ],
      answer: 0,
      explanation: '5 Rights (ISMP): Right Patient, Right Drug, Right Dose, Right Route, Right Time. Một số tổ chức thêm: Right Documentation (6th right), Right Reason, Right Response — tạo thành "9 Rights". Patient identifier: tên + ngày sinh (2 identifiers) theo TJC.',
    },
    {
      stem: 'Tương tác thuốc kinh điển nào là ví dụ về induction CYP3A4 gây giảm nồng độ thuốc đồng sử dụng?',
      choices: [
        'Warfarin + Aspirin → tăng xuất huyết',
        'Rifampicin + oral contraceptives → giảm nồng độ thuốc tránh thai → mất tác dụng ngừa thai',
        'Metoprolol + diltiazem → nhịp chậm',
        'Simvastatin + grapefruit → tăng nồng độ simvastatin',
      ],
      answer: 1,
      explanation: 'Rifampicin: CYP3A4 inducer mạnh nhất. Giảm nồng độ: COC (tránh thai thất bại), warfarin (giảm INR → thuyên tắc), ciclosporin (thải ghép), HIV PIs (thất bại ART), midazolam, digoxin (P-gp induction). Cũng: carbamazepine, phenytoin, St. John\'s Wort (nhẹ hơn).',
    },
    {
      stem: 'ATC (Anatomical Therapeutic Chemical) code C09AA01 tương ứng với thuốc nào?',
      choices: ['Amlodipine', 'Captopril', 'Metoprolol', 'Furosemide'],
      answer: 1,
      explanation: 'ATC hierarchy: C=Cardiovascular → C09=RAAS agents → C09A=ACE inhibitors → C09AA=ACE inhibitors plain → C09AA01=Captopril. Enalapril: C09AA02, Lisinopril: C09AA03. ATC do WHO-CC giữ. Quan trọng cho pharmacoepidemiology, pharmacovigilance, formulary management.',
    },
    {
      stem: 'ISMP "Look-Alike Sound-Alike" (LASA) drugs list: cặp LASA nguy hiểm nhất trong Trống Trống nào dưới đây?',
      choices: [
        'Paracetamol 500 mg vs Paracetamol 650 mg',
        'Hydroxyzine vs Hydralazine — hydroxyzine (kháng histamine) vs hydralazine (hạ HA); nhầm lẫn có thể gây tụt HA nghiêm trọng',
        'Vitamin C 500 mg vs Vitamin C 1000 mg',
        'Magnesium oxide vs Magnesium hydroxide',
      ],
      answer: 1,
      explanation: 'ISMP LASA: Hydroxyzine/Hydralazine, Celebrex/Celexa/Cerebyx, Zyprexa/Zyrtec/Zantac, Novolog/Novolin, Seroquel/Serquel. Biện pháp phòng ngừa: Tall Man lettering (HYDROXYzine vs hydrALAZINE), lưu riêng trong kho, kiểm tra kép trước cấp phát.',
    },
    {
      stem: 'Thuốc nào là chống chỉ định TUYỆT ĐỐI với sildenafil (Viagra) và tại sao?',
      choices: [
        'Aspirin — vì làm loãng máu',
        'Nitrates (nitroglycerin, isosorbide) — đều tăng cGMP, gây giãn mạch cộng hưởng → tụt HA nghiêm trọng, tử vong',
        'Metformin — vì hạ đường huyết',
        'Lisinopril — vì hạ HA nhẹ',
      ],
      answer: 1,
      explanation: 'Sildenafil (PDE5-I) + Nitrates = TUYỆT ĐỐI CCĐ. Cơ chế: sildenafil ức chế PDE5 → tích luỹ cGMP. Nitrates kích hoạt guanylyl cyclase → tăng cGMP. Tổng hợp: giãn mạch ngoại biên nghiêm trọng, tụt HA thế đứng, có thể gây thiếu máu cơ tim, tử vong. Washout nitrate trước khi dùng sildenafil: 24-48h tuỳ loại.',
    },
    {
      stem: 'Thuốc nào là THUỐC CAO CẢNH BÁO (High-Alert Medication) theo ISMP, cần quy trình kiểm tra kép?',
      choices: [
        'Paracetamol và vitamin C',
        'Insulin, heparin/LMWH, concentrated electrolytes (KCl 15%, NaCl 3%), warfarin, chemotherapy agents, neuromuscular blockers, opioids',
        'Antacids và antihistamines',
        'Multivitamins và probiotics',
      ],
      answer: 1,
      explanation: 'ISMP High-Alert Medications: gây hại nghiêm trọng hoặc tử vong khi sai sót. Bộ nhớ "PINCH": Potassium (concentrated), Insulin, Narcotics, Chemotherapy, Heparin. Biện pháp: kiểm tra kép (independent double-check), màu nhãn cảnh báo, giới hạn access trong kho, không đặt cùng thuốc thông thường.',
    },
    {
      stem: 'Trong thi Pharmacy Quiz Bowl đội, câu hỏi về cơ chế tác dụng: Beta-blocker ức chế thụ thể β1 ở tim gây ra tác dụng gì?',
      choices: [
        'Tăng nhịp tim và tăng co bóp tim',
        'Giảm nhịp tim (chronotropy âm), giảm co bóp tim (inotropy âm), giảm dẫn truyền AV (dromotropy âm) → giảm cung lượng tim và hạ HA',
        'Co mạch toàn thân',
        'Tăng tiết aldosterone',
      ],
      answer: 1,
      explanation: 'β1-blockade: giảm HR, giảm contractility, giảm AV conduction. Ứng dụng: suy tim (titrate chậm), sau NMCT, HTN, rung nhĩ kiểm soát tần số, cường giáp (propranolol non-selective). β2-blockade (non-selective): co phế quản → CCĐ hen. Metoprolol, bisoprolol: β1-selective.',
    },
    {
      stem: 'FDA Pregnancy Labeling Rule (PLLR) 2015 thay thế hệ thống phân loại A/B/C/D/X bằng?',
      choices: [
        'Hệ thống 1-5 tương tự',
        'Ba nhóm thông tin chi tiết: Pregnancy (gồm Labor and Delivery) + Lactation + Females and Males of Reproductive Potential — mô tả risks, benefits, data cụ thể thay vì nhãn chữ cái',
        'Chỉ còn 2 nhóm: an toàn và không an toàn',
        'Không thay đổi gì, vẫn dùng A/B/C/D/X',
      ],
      answer: 1,
      explanation: 'PLLR (Pregnancy and Lactation Labeling Rule) 2015: thay A/B/C/D/X bằng 3 sections với narrative data thực tế từ nghiên cứu và registry. Ưu điểm: thông tin đầy đủ hơn, nhà lâm sàng tự đánh giá risk-benefit. Vẫn còn tài liệu cũ dùng A-X — thận trọng khi tra cứu.',
    },
    {
      stem: 'Thuốc nào là "antidote" của acetaminophen (paracetamol) quá liều và cơ chế?',
      choices: [
        'Atropine — ức chế muscarinic',
        'N-acetylcysteine (NAC) — cung cấp glutathione (GSH) tiền chất để khử độc NAPQI (N-acetyl-p-benzoquinone imine), chất gây hoại tử tế bào gan',
        'Naloxone — đối kháng opioid',
        'Flumazenil — đối kháng benzodiazepin',
      ],
      answer: 1,
      explanation: 'Paracetamol quá liều (>150 mg/kg hoặc >7.5g người lớn): CYP2E1/CYP3A4 tạo NAPQI. NAPQI gắn với protein tế bào gan → hoại tử. NAC cho trong 8 giờ đầu: hiệu quả >95%. IV NAC protocol: 150 mg/kg/15ph → 50 mg/kg/4h → 100 mg/kg/16h. Rumack-Matthew nomogram quyết định có cần NAC không.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// GC10 — Hội nghị Dược ảo — Hằng năm
// ─────────────────────────────────────────────────────────────
export const GC10_QUIZ = {
  id: 'GC10-quiz-01',
  title: 'GC10 · Hội nghị Dược ảo — Kỹ năng trình bày khoa học, CPD & mạng lưới học thuật',
  kind: 'quiz', subject: 'game', difficulty: 2,
  skillsTrained: ['conference', 'presentation', 'cpd', 'networking', 'scientific-writing'],
  questions: [
    {
      stem: 'Hội nghị Dược lâm sàng lớn nhất thế giới tổ chức hàng năm tại Mỹ là gì?',
      choices: [
        'APhA Annual Meeting',
        'ASHP Midyear Clinical Meeting (MCM) — tổ chức tháng 12, thu hút >25.000 dược sĩ và sinh viên dược toàn cầu; cơ hội phỏng vấn residency (personnel placement service)',
        'FIP Congress',
        'ACCP Annual Meeting',
      ],
      answer: 1,
      explanation: 'ASHP MCM: hội nghị lớn nhất của dược sĩ bệnh viện và lâm sàng (ASHP = American Society of Health-System Pharmacists). FIP Congress: tổ chức bởi International Pharmaceutical Federation, thay đổi địa điểm hàng năm — event toàn cầu về pharmacy education và practice. APhA: pharmacy education tổng quát hơn.',
    },
    {
      stem: 'Abstract nộp cho hội nghị khoa học thường gồm các mục nào theo cấu trúc IMRAD rút gọn?',
      choices: [
        'Chỉ cần tên tác giả và tiêu đề',
        'Background/Objective → Methods → Results → Conclusions — giới hạn 150-300 từ; không chứa abbreviations lạ, không trích dẫn tài liệu, không dùng I/We trong structured abstract',
        'Chỉ cần tóm tắt 50 từ',
        'Background, 5 trang phương pháp, phụ lục kết quả',
      ],
      answer: 1,
      explanation: 'Structured abstract IMRAD: Introduction (why), Methods (how), Results (what found), Discussion/Conclusion (what it means). Unstructured abstract: 1 đoạn. Hội nghị dược thường yêu cầu 250 words; hội nghị y khoa lớn (ERS, AHA): 350-400 words. Submission deadline thường 6 tháng trước hội nghị.',
    },
    {
      stem: 'Poster presentation khác oral presentation thế nào trong hội nghị khoa học?',
      choices: [
        'Poster ít uy tín hơn oral, không cần chuẩn bị kỹ',
        'Poster (A0/90×120 cm): trình bày trực quan tại booth, gặp gỡ trực tiếp, thảo luận chuyên sâu với những người quan tâm. Oral: 10-15 phút trình bày trước khán phòng lớn, câu hỏi từ hội đồng. Cả hai đều có giá trị — poster tốt để networking, oral tốt cho visibility',
        'Poster và oral không có gì khác nhau',
        'Oral presentation không có Q&A session',
      ],
      answer: 1,
      explanation: 'Poster tips: title rõ ràng, key findings nổi bật, ít chữ nhiều hình, màu sắc nhất quán. Oral tips: 1 slide/phút, clear take-home message, rehearse Q&A. e-Poster (digital) ngày càng phổ biến sau COVID. Hội nghị dược: Best Poster Award thường được xét riêng.',
    },
    {
      stem: 'CPD (Continuing Professional Development) trong dược khác gì so với CME (Continuing Medical Education)?',
      choices: [
        'CME và CPD hoàn toàn giống nhau',
        'CME/CPE (Continuing Pharmacy Education): chương trình học có credit hour do tổ chức công nhận (ACPE ở Mỹ, FIP khuyến nghị). CPD rộng hơn: chu trình liên tục phản tỉnh (reflect) → lập kế hoạch học (plan) → học (learn) → áp dụng (apply) — không giới hạn ở credit hour',
        'CPD chỉ dành cho y tá',
        'CME nhiều giờ hơn CPD',
      ],
      answer: 1,
      explanation: 'FIP CPD Framework: tự chủ hơn CME. Pharmacist portfolio (hồ sơ chuyên môn): ghi nhận tất cả learning activities. Mỹ: 30 CPE credits/2 năm để renew license (NABP). VN: chưa có hệ thống CPD bắt buộc chuẩn hoá như quốc tế — đang xây dựng theo TT 22/2013 về cập nhật kiến thức.',
    },
    {
      stem: 'Khi trình bày kết quả nghiên cứu tại hội nghị, "conflict of interest" (COI) cần được khai báo như thế nào?',
      choices: [
        'Không cần khai báo nếu nhận tài trợ từ công ty dược',
        'Khai báo tất cả mối quan hệ tài chính/phi tài chính với sponsors trong 12-24 tháng qua (trước hoặc sau slide đầu) — ICMJE, FIP và tất cả hội nghị lớn đều bắt buộc: tài trợ nghiên cứu, honorarium, cổ phần, tư vấn, speaker fee',
        'Chỉ khai báo nếu bị hỏi',
        'COI chỉ liên quan đến bài báo, không phải hội nghị',
      ],
      answer: 1,
      explanation: 'ICMJE: khai báo COI trong 36 tháng qua. Slide "Disclosures": đặt ở slide 2 sau title. Nếu không có COI: "The presenter has no conflicts of interest to disclose." Ẩn COI là vi phạm đạo đức nghiên cứu và có thể dẫn đến thu hồi publication.',
    },
    {
      stem: 'Journal Club (JC) là gì và tại sao là hoạt động CPD quan trọng?',
      choices: [
        'Câu lạc bộ đọc tiểu thuyết',
        'Buổi sinh hoạt định kỳ nhóm chuyên môn cùng đọc-phân tích phê phán 1 bài báo khoa học: đánh giá design, bias, statistical methods, clinical applicability — giúp dược sĩ duy trì kỹ năng EBM và cập nhật evidence mới nhất',
        'Câu lạc bộ chơi game',
        'Buổi training kỹ năng mềm',
      ],
      answer: 1,
      explanation: 'JC format hiệu quả: 1 presenter (30-45 phút) + Q&A. Checklist đọc paper: PICO, study design, randomization, blinding, primary outcome, sample size/power, statistical tests, results (95% CI + p-value), limitations, clinical significance vs statistical significance. Công cụ: CASP checklists (www.casp-uk.net).',
    },
    {
      stem: 'Trong buổi Q&A sau oral presentation tại hội nghị, câu hỏi "khó" nhất thường thuộc loại nào và cách xử lý?',
      choices: [
        'Câu hỏi về tên tác giả — trả lời ngay',
        'Câu hỏi về limitations/confounders hoặc generalizability của kết quả — xử lý: thừa nhận limitation thật thà, giải thích tại sao vẫn có giá trị, đề xuất hướng nghiên cứu tiếp theo; không phòng thủ hay tránh né',
        'Câu hỏi về thời gian nghiên cứu — quá dễ',
        'Câu hỏi về kinh phí — không liên quan',
      ],
      answer: 1,
      explanation: 'Q&A strategy: PAUSE trước khi trả lời (2-3 giây), lặp lại câu hỏi để cả khán phòng nghe, answer honestly. Nếu không biết: "That\'s an excellent question — I don\'t have that data, but I plan to explore it in follow-up work." Không giả vờ biết khi không biết — mất uy tín hơn.',
    },
    {
      stem: 'Networking hiệu quả tại hội nghị dược quốc tế: chiến lược nào ĐÚNG?',
      choices: [
        'Chỉ ngồi trong phòng của mình và đọc bài báo',
        'Chuẩn bị "elevator pitch" 30 giây về nghiên cứu của mình, chủ động tiếp cận ở poster session và coffee break, kết nối LinkedIn ngay sau buổi gặp, follow-up email cảm ơn trong 48h',
        'Chỉ gặp người quen từ trường mình',
        'Trao đổi danh thiếp với tất cả nhưng không follow-up',
      ],
      answer: 1,
      explanation: 'Networking = xây dựng relationships, không chỉ collect contacts. Hiệu quả nhất: nhắm vào session liên quan đến research của mình, đặt câu hỏi meaningful, offer collaboration. "What are you working on?" mở đầu tốt hơn "Here\'s my business card." LinkedIn > danh thiếp giấy vì dễ lưu và follow-up.',
    },
    {
      stem: 'Symposium, Workshop và Plenary tại hội nghị khoa học khác nhau thế nào?',
      choices: [
        'Hoàn toàn giống nhau, chỉ khác tên',
        'Plenary: toàn thể tham dự viên, 1 diễn giả nổi bật, không song song. Symposium: nhiều diễn giả cùng chủ đề, 60-90 phút. Workshop: hands-on/interactive, nhóm nhỏ (<50), học kỹ năng cụ thể. Satellite symposium: do sponsor tài trợ, cần khai báo COI',
        'Chỉ có plenary là có giá trị',
        'Workshop chỉ dành cho sinh viên',
      ],
      answer: 1,
      explanation: 'FIP Congress format: Opening/Closing Plenary (inspirational keynotes), Symposia (3-4 diễn giả/chủ đề), Workshops (clinical skills, leadership), e-Posters, Satellite Symposia (industry-sponsored). Short communications: 10-15 phút/oral, thường từ abstract top-ranked. ASHP MCM còn có: Residency Showcase.',
    },
    {
      stem: 'Hội nghị Dược tại Việt Nam nào được tổ chức hàng năm bởi Hội Dược học Việt Nam?',
      choices: [
        'Hội nghị Tim mạch học Việt Nam',
        'Hội nghị Khoa học Dược toàn quốc (NPDH/VIPA) — diễn đàn lớn nhất của cộng đồng dược học VN, trình bày NC dược lâm sàng, bào chế, dược liệu, dược lý thực nghiệm và chính sách thuốc',
        'Hội nghị Y học Việt Nam (VNMA)',
        'Hội nghị Nhi khoa VN',
      ],
      answer: 1,
      explanation: 'Hội nghị KH Dược toàn quốc (Vietnam Journal of Pharmaceutical Sciences phối hợp): bao gồm tất cả lĩnh vực dược. Hội nghị chuyên ngành: Hội Dược lâm sàng VN, Hội Dược liệu VN. Sinh viên có thể tham dự, trình bày poster NCKH — cơ hội thực hành publication và networking từ sớm.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Bundle export
// ─────────────────────────────────────────────────────────────
export const PHARMACY_CAREER_GAMES_SCENARIOS = {
  [CP09_QUIZ.id]: CP09_QUIZ,
  [CP10_QUIZ.id]: CP10_QUIZ,
  [GC07_QUIZ.id]: GC07_QUIZ,
  [GC09_QUIZ.id]: GC09_QUIZ,
  [GC10_QUIZ.id]: GC10_QUIZ,
};
