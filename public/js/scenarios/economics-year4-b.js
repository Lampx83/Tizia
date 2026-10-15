// economics-year4-b.js — E4.3 Kiểm toán + E4.4 Thuế Việt Nam
// ─── E4.3 · Kiểm toán ────────────────────────────────────
export const E43_QUIZ = {
  id: 'E4.3-auditing-quiz',
  title: 'E4.3 · Kiểm toán — Nguyên lý & Thực hành Kiểm toán Độc lập',
  kind: 'quiz',
  yearLevel: 4, subject: 'kiem-toan', difficulty: 4,
  skillsTrained: ['kiem-toan-doc-lap', 'chung-cu-kiem-toan', 'danh-gia-rui-ro', 'bao-cao-kiem-toan'],
  questions: [
    {
      stem: 'Mục tiêu chính của kiểm toán báo cáo tài chính là:',
      choices: [
        'Phát hiện và ngăn chặn mọi gian lận trong doanh nghiệp',
        'Đưa ra ý kiến về việc BCTC có trình bày trung thực và hợp lý theo chuẩn mực kế toán áp dụng',
        'Đảm bảo doanh nghiệp hoạt động có hiệu quả',
        'Tư vấn ban lãnh đạo về chiến lược kinh doanh',
      ],
      answer: 1,
      explanation: 'Mục tiêu kiểm toán BCTC (ISA 200): KTV đưa ra ý kiến kiểm toán về việc BCTC có được lập và trình bày trung thực, hợp lý (true and fair view) phù hợp với chuẩn mực kế toán áp dụng (VAS, IFRS). Kiểm toán không đảm bảo phát hiện mọi gian lận (inherent limitations) và không đánh giá hiệu quả kinh doanh. KTV cung cấp đảm bảo hợp lý (reasonable assurance), không phải đảm bảo tuyệt đối — vì hạn chế từ lấy mẫu, xét đoán nghề nghiệp và đặc thù của kiểm tra.',
    },
    {
      stem: 'Rủi ro kiểm toán (Audit Risk) theo mô hình AR = IR × CR × DR, trong đó DR là:',
      choices: [
        'Detection Risk — rủi ro KTV không phát hiện được sai sót trọng yếu',
        'Default Risk — rủi ro doanh nghiệp mất khả năng thanh toán',
        'Disclosure Risk — rủi ro thông tin không được công bố đầy đủ',
        'Documentation Risk — rủi ro chứng từ kế toán bị mất hoặc hủy',
      ],
      answer: 0,
      explanation: 'Mô hình rủi ro kiểm toán: AR = IR × CR × DR. IR (Inherent Risk — rủi ro tiềm tàng): rủi ro sai sót trọng yếu trước khi xét kiểm soát nội bộ — phụ thuộc đặc điểm ngành, giao dịch phức tạp. CR (Control Risk — rủi ro kiểm soát): rủi ro hệ thống KSNB không ngăn/phát hiện sai sót — đánh giá qua tìm hiểu và kiểm tra KSNB. DR (Detection Risk): rủi ro thủ tục kiểm toán của KTV không phát hiện sai sót còn lại — KTV kiểm soát trực tiếp bằng cách điều chỉnh phạm vi và bản chất thủ tục. KTV cần giữ AR ở mức thấp chấp nhận được.',
    },
    {
      stem: 'Nguyên tắc "Trọng yếu" (Materiality) trong kiểm toán có nghĩa là:',
      choices: [
        'KTV phải kiểm tra 100% tất cả giao dịch',
        'Thông tin được coi là trọng yếu nếu bỏ sót hoặc sai lệch có thể ảnh hưởng đến quyết định kinh tế của người dùng BCTC',
        'Chỉ kiểm toán các khoản mục trên 1 tỷ đồng',
        'KTV ưu tiên kiểm toán tài sản cố định vì giá trị lớn',
      ],
      answer: 1,
      explanation: 'Materiality (ISA 320): một thông tin là trọng yếu nếu việc bỏ sót hoặc trình bày sai có thể làm thay đổi hoặc ảnh hưởng đến quyết định kinh tế của người dùng BCTC. KTV xác định mức trọng yếu tổng thể (overall materiality — thường 0,5-1% doanh thu hoặc 5-10% lợi nhuận trước thuế) và mức trọng yếu thực hiện (performance materiality ≈ 50-75% overall) để thiết kế thủ tục. Sai lệch dưới ngưỡng trọng yếu: không ảnh hưởng ý kiến KTV; trên ngưỡng: KTV yêu cầu điều chỉnh hoặc nêu trong ý kiến.',
    },
    {
      stem: 'Ý kiến kiểm toán "Chấp nhận toàn phần" (Unqualified/Unmodified Opinion) được phát hành khi:',
      choices: [
        'BCTC không có bất kỳ sai sót nào (zero error)',
        'BCTC được lập và trình bày trung thực, hợp lý theo chuẩn mực kế toán, không có sai lệch trọng yếu',
        'Doanh nghiệp chấp nhận mọi điều chỉnh KTV yêu cầu',
        'KTV đã kiểm tra 100% giao dịch của doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Ý kiến kiểm toán (ISA 700-705): Unmodified (Chấp nhận toàn phần) — BCTC trình bày trung thực, hợp lý, phù hợp chuẩn mực; là ý kiến "sạch". Các loại ý kiến sửa đổi (Modified): Qualified (Ngoại trừ) — sai sót trọng yếu nhưng không lan rộng, hoặc không lấy đủ bằng chứng về một khoản mục cụ thể; Adverse (Trái chiều) — sai sót trọng yếu và lan rộng; Disclaimer (Từ chối đưa ra ý kiến) — không thu thập đủ bằng chứng thích hợp và ảnh hưởng lan rộng. Ngoài ra còn có "Đoạn nhấn mạnh" (Emphasis of Matter) không làm thay đổi loại ý kiến.',
    },
    {
      stem: 'Kiểm soát nội bộ (Internal Control) theo COSO 2013 gồm 5 thành phần, NGOẠI TRỪ:',
      choices: [
        'Môi trường kiểm soát (Control Environment)',
        'Đánh giá rủi ro (Risk Assessment)',
        'Kiểm toán nội bộ (Internal Audit)',
        'Hoạt động kiểm soát (Control Activities)',
      ],
      answer: 2,
      explanation: 'COSO 2013 framework — 5 thành phần KSNB: (1) Control Environment (Môi trường kiểm soát) — nền tảng văn hóa, đạo đức, cam kết ban lãnh đạo; (2) Risk Assessment (Đánh giá rủi ro) — nhận diện và phân tích rủi ro; (3) Control Activities (Hoạt động kiểm soát) — chính sách, thủ tục ngăn ngừa rủi ro; (4) Information & Communication (Thông tin & Truyền thông); (5) Monitoring Activities (Giám sát). Kiểm toán nội bộ (Internal Audit) là bộ phận THỰC HIỆN đánh giá KSNB, không phải là thành phần của COSO.',
    },
    {
      stem: 'Thủ tục phân tích (Analytical Procedures) trong kiểm toán bao gồm:',
      choices: [
        'Kiểm tra chi tiết từng chứng từ gốc và sổ kế toán',
        'So sánh thông tin tài chính với kỳ vọng xây dựng từ dữ liệu lịch sử, ngành, nội bộ',
        'Phỏng vấn trực tiếp ban lãnh đạo về các giao dịch lớn',
        'Quan sát kiểm kê hàng tồn kho tại kho hàng',
      ],
      answer: 1,
      explanation: 'Thủ tục phân tích (ISA 520): phân tích các mối quan hệ giữa thông tin tài chính và phi tài chính để xây dựng kỳ vọng và nhận diện biến động bất thường. Ví dụ: so sánh tỷ suất gộp năm nay với năm trước, với trung bình ngành; phân tích xu hướng doanh thu theo quý; kiểm tra mối quan hệ chi phí điện với sản lượng sản xuất. Dùng trong: lập kế hoạch kiểm toán (nhận diện rủi ro), thực hiện kiểm toán (bằng chứng thực chất), soát xét cuối kỳ (đánh giá tổng thể). Phân tích nằm trong "Substantive Procedures" cùng với "Tests of Details".',
    },
    {
      stem: 'Nguyên tắc độc lập (Independence) của KTV yêu cầu:',
      choices: [
        'KTV làm việc tại văn phòng riêng, không đến cơ sở khách hàng',
        'KTV không có lợi ích tài chính hoặc quan hệ làm ảnh hưởng đến tính khách quan của ý kiến kiểm toán',
        'Công ty kiểm toán không được cung cấp bất kỳ dịch vụ nào ngoài kiểm toán',
        'KTV phải thay đổi khách hàng mỗi 2 năm',
      ],
      answer: 1,
      explanation: 'Độc lập KTV (ISA 200, IESBA Code): Independence in Mind (độc lập về tư duy) — thực sự khách quan, không bị ảnh hưởng bởi áp lực; Independence in Appearance (độc lập về hình thức) — không có quan hệ hoặc lợi ích khiến bên thứ ba có lý do tin rằng tính khách quan bị xâm phạm. Các mối đe dọa: Self-interest (sở hữu cổ phần khách hàng), Self-review (kiểm toán công việc mình làm), Advocacy (bảo vệ lợi ích khách hàng), Familiarity (quen biết quá mức), Intimidation (bị đe dọa). Biện pháp bảo vệ: luân chuyển KTV chính (7 năm), cấm sở hữu cổ phần.',
    },
    {
      stem: 'Bằng chứng kiểm toán (Audit Evidence) được đánh giá dựa trên 2 tiêu chí chính:',
      choices: [
        'Số lượng và chi phí thu thập',
        'Sự đầy đủ (Sufficiency) và tính thích hợp (Appropriateness)',
        'Tính bảo mật và khả năng truy cập',
        'Thời gian thu thập và nguồn gốc chứng từ',
      ],
      answer: 1,
      explanation: 'ISA 500 — Bằng chứng kiểm toán cần đáp ứng 2 tiêu chí: Sufficiency (Đầy đủ) — số lượng bằng chứng đủ để hỗ trợ kết luận (liên quan đến rủi ro: rủi ro cao → cần nhiều bằng chứng hơn); Appropriateness (Thích hợp) — đo lường bằng Relevance (liên quan đến cơ sở dẫn liệu cần kiểm tra) × Reliability (độ tin cậy). Độ tin cậy theo thứ tự giảm dần: bằng chứng bên ngoài > bên trong có kiểm soát tốt > bên trong có kiểm soát yếu; trực tiếp của KTV > từ khách hàng cung cấp; tài liệu > lời nói. Hai tiêu chí này bù trừ cho nhau trong giới hạn nhất định.',
    },
    {
      stem: 'Xác nhận bên ngoài (External Confirmation) thường được dùng để kiểm tra:',
      choices: [
        'Giá trị thị trường của bất động sản đầu tư',
        'Số dư công nợ phải thu, tiền gửi ngân hàng, khoản vay từ bên thứ ba',
        'Chính sách kế toán được áp dụng nhất quán',
        'Tính hiệu quả của hệ thống kiểm soát nội bộ',
      ],
      answer: 1,
      explanation: 'External Confirmation (ISA 505): KTV yêu cầu bên thứ ba (ngân hàng, khách hàng, nhà cung cấp) xác nhận trực tiếp thông tin cho KTV — không qua doanh nghiệp được kiểm toán. Đây là bằng chứng đáng tin cậy vì đến từ nguồn độc lập. Positive confirmation: yêu cầu phản hồi dù đồng ý hay không → dùng cho số dư lớn, rủi ro cao. Negative confirmation: chỉ phản hồi nếu không đồng ý → dùng khi rủi ro thấp, nhiều số dư nhỏ. Đặc biệt hữu ích kiểm tra: số dư tiền ngân hàng, công nợ phải thu, khoản vay, chứng khoán đang lưu ký bên thứ ba.',
    },
    {
      stem: 'Kiểm toán nội bộ (Internal Audit) khác với kiểm toán độc lập (External Audit) ở điểm chính:',
      choices: [
        'Kiểm toán nội bộ chỉ thực hiện kiểm tra tài chính, không xét quản lý',
        'Kiểm toán nội bộ là nhân viên/bộ phận của tổ chức, phục vụ nội bộ; kiểm toán độc lập là bên ngoài, phục vụ cổ đông và công chúng',
        'Kiểm toán nội bộ có thẩm quyền pháp lý cao hơn kiểm toán độc lập',
        'Kiểm toán nội bộ thực hiện theo VAS, kiểm toán độc lập theo IFRS',
      ],
      answer: 1,
      explanation: 'Internal Audit (Kiểm toán nội bộ): thuộc doanh nghiệp, báo cáo cho Ủy ban Kiểm toán/Ban Giám đốc, phạm vi rộng (tài chính, hoạt động, tuân thủ, quản trị rủi ro), không bắt buộc với tất cả loại hình, cải thiện hoạt động nội bộ. External Audit (Kiểm toán độc lập): công ty kiểm toán bên ngoài, báo cáo cho cổ đông, phạm vi chủ yếu là BCTC, bắt buộc với công ty đại chúng/niêm yết, cung cấp đảm bảo hợp lý về BCTC. Hai loại kiểm toán hỗ trợ lẫn nhau: KTV độc lập đánh giá và có thể sử dụng kết quả làm việc của bộ phận KTNB.',
    },
  ],
};

// ─── E4.4 · Thuế Việt Nam ───────────────────────────────
export const E44_QUIZ = {
  id: 'E4.4-tax-quiz',
  title: 'E4.4 · Thuế Việt Nam — Hệ thống thuế & Nghĩa vụ thuế doanh nghiệp',
  kind: 'quiz',
  yearLevel: 4, subject: 'thue', difficulty: 4,
  skillsTrained: ['thue-tndn', 'thue-gtgt', 'thue-tncn', 'ke-khai-thue'],
  questions: [
    {
      stem: 'Thuế suất Thuế Thu nhập doanh nghiệp (TNDN) phổ thông hiện hành tại Việt Nam là:',
      choices: [
        '20%',
        '25%',
        '17%',
        '10%',
      ],
      answer: 0,
      explanation: 'Theo Luật Thuế TNDN hiện hành (sửa đổi 2013, Thông tư 78/2014 và các văn bản hướng dẫn), thuế suất TNDN phổ thông là 20%. Ưu đãi: Doanh nghiệp nhỏ và vừa đáp ứng điều kiện được giảm 30% (tức 14%); doanh nghiệp trong lĩnh vực ưu đãi (CNTT, giáo dục, y tế ở vùng khó khăn) được áp dụng 10% hoặc 15%; khai thác dầu khí 32-50%. Thu nhập từ chuyển nhượng bất động sản: tính riêng 20%.',
    },
    {
      stem: 'Phương pháp tính Thuế Giá trị gia tăng (GTGT) "khấu trừ" áp dụng cho:',
      choices: [
        'Doanh nghiệp có doanh thu dưới 1 tỷ đồng/năm',
        'Doanh nghiệp đăng ký nộp thuế theo phương pháp khấu trừ và có đủ điều kiện về hóa đơn, chứng từ',
        'Tất cả hộ kinh doanh cá thể',
        'Chỉ doanh nghiệp FDI (có vốn đầu tư nước ngoài)',
      ],
      answer: 1,
      explanation: 'Thuế GTGT có 2 phương pháp: (1) Khấu trừ: Thuế GTGT phải nộp = Thuế GTGT đầu ra − Thuế GTGT đầu vào được khấu trừ. Áp dụng cho DN đăng ký tự nguyện hoặc bắt buộc (doanh thu ≥ 1 tỷ/năm, DN mới thành lập đủ điều kiện). Yêu cầu: dùng hóa đơn GTGT, có kế toán đầy đủ. (2) Trực tiếp: Thuế = Tỷ lệ % × Doanh thu. Áp dụng: DN doanh thu < 1 tỷ/năm, hộ kinh doanh, hoạt động mua bán vàng bạc đá quý. Thuế suất GTGT: 0% (xuất khẩu), 5% (hàng thiết yếu), 10% (phổ thông).',
    },
    {
      stem: 'Chi phí được trừ khi tính Thuế TNDN cần đáp ứng điều kiện NGOẠI TRỪ:',
      choices: [
        'Thực tế phát sinh liên quan đến hoạt động sản xuất kinh doanh',
        'Có đủ hóa đơn, chứng từ theo quy định',
        'Thanh toán không dùng tiền mặt (đối với hóa đơn từ 20 triệu đồng trở lên)',
        'Do Hội đồng quản trị phê duyệt bằng nghị quyết',
      ],
      answer: 3,
      explanation: 'Điều kiện chi phí được trừ (Điều 4, TT 96/2015): (1) Thực tế phát sinh liên quan đến SXKD; (2) Có đủ hóa đơn, chứng từ hợp pháp; (3) Hóa đơn từ 20 triệu đồng trở lên (gồm thuế GTGT) phải thanh toán không dùng tiền mặt (chuyển khoản, thẻ). Không yêu cầu phê duyệt của HĐQT — đây là quy trình quản trị nội bộ chứ không phải điều kiện pháp luật thuế. Các khoản chi không được trừ: phạt vi phạm pháp luật, chi không liên quan SXKD, chi vượt mức quy định (phụ cấp, quảng cáo tối đa 15% tổng chi phí).',
    },
    {
      stem: 'Thuế Thu nhập cá nhân (TNCN) của cư dân Việt Nam được áp dụng theo biểu thuế:',
      choices: [
        'Thuế suất đồng nhất 20% trên tổng thu nhập',
        'Biểu thuế lũy tiến từng phần: 5% - 10% - 15% - 20% - 25% - 30% - 35%',
        'Thuế suất cố định 10% khấu trừ tại nguồn',
        'Miễn thuế nếu thu nhập dưới 100 triệu đồng/năm',
      ],
      answer: 1,
      explanation: 'Thuế TNCN từ tiền lương, tiền công của cư dân Việt Nam áp dụng biểu thuế lũy tiến 7 bậc (Biểu thuế số 1, Luật Thuế TNCN 2007, sửa đổi 2012): 5% (0-5tr/tháng), 10% (5-10tr), 15% (10-18tr), 20% (18-32tr), 25% (32-52tr), 30% (52-80tr), 35% (>80tr). Giảm trừ gia cảnh: bản thân 11 triệu/tháng (132tr/năm), người phụ thuộc 4,4 triệu/tháng/người. Thu nhập chịu thuế = Thu nhập chịu thuế − Giảm trừ − BHXH/BHYT/BHTN bắt buộc.',
    },
    {
      stem: 'Hóa đơn điện tử (HĐĐT) theo quy định hiện hành tại Việt Nam:',
      choices: [
        'Chỉ áp dụng cho doanh nghiệp có doanh thu trên 100 tỷ đồng',
        'Bắt buộc áp dụng cho hầu hết doanh nghiệp kể từ 01/07/2022 theo Nghị định 123/2020 và Thông tư 78/2021',
        'Không có giá trị pháp lý như hóa đơn giấy',
        'Chỉ áp dụng khi bán hàng cho doanh nghiệp, không áp dụng bán lẻ cá nhân',
      ],
      answer: 1,
      explanation: 'Theo Nghị định 123/2020/NĐ-CP và Thông tư 78/2021/TT-BTC: HĐĐT bắt buộc triển khai đại trà từ 01/07/2022 với tất cả DN, tổ chức, hộ/cá nhân kinh doanh nộp thuế theo phương pháp khấu trừ và một số đối tượng khác. HĐĐT có giá trị pháp lý tương đương hóa đơn giấy khi đáp ứng điều kiện quy định (chữ ký điện tử, mã của CQT hoặc không có mã CQT). Lợi ích: giảm chi phí in ấn, lưu trữ, chống gian lận, dễ tra cứu trực tuyến.',
    },
    {
      stem: 'Chuyển giá (Transfer Pricing) trong bối cảnh thuế quốc tế là vấn đề gì?',
      choices: [
        'Doanh nghiệp chuyển lợi nhuận sang chi nhánh nước ngoài qua giá giao dịch nội bộ không theo giá thị trường',
        'Chi phí vận chuyển hàng hóa giữa các kho trong nước',
        'Tỷ giá hối đoái sử dụng khi quy đổi doanh thu ngoại tệ',
        'Giá nhượng quyền thương hiệu giữa các công ty cùng ngành',
      ],
      answer: 0,
      explanation: 'Transfer Pricing (chuyển giá): tập đoàn đa quốc gia thực hiện giao dịch nội bộ giữa các thực thể tại các quốc gia khác nhau với giá khác với giá thị trường (arm\'s length price), nhằm chuyển lợi nhuận từ nước thuế suất cao sang nước thuế suất thấp. Ví dụ: công ty con VN bán hàng cho công ty mẹ ở Ireland với giá thấp → lãi thấp ở VN → nộp ít thuế TNDN VN. Nguyên tắc Arm\'s Length (OECD): giá giao dịch nội bộ phải bằng giá giao dịch giữa bên độc lập trong điều kiện tương tự. Thông tư 45/2021/TT-BTC quy định quản lý giao dịch liên kết tại VN.',
    },
    {
      stem: 'Thuế Nhà thầu nước ngoài (Foreign Contractor Withholding Tax — FCWT) áp dụng khi:',
      choices: [
        'Doanh nghiệp Việt Nam xuất khẩu hàng hóa ra nước ngoài',
        'Tổ chức, cá nhân nước ngoài cung cấp hàng hóa/dịch vụ tại Việt Nam mà không thành lập pháp nhân VN',
        'Nhà đầu tư nước ngoài mua cổ phần công ty Việt Nam',
        'Người Việt Nam định cư ở nước ngoài chuyển tiền về nước',
      ],
      answer: 1,
      explanation: 'Thuế Nhà thầu nước ngoài (TT 103/2014/TT-BTC): khi tổ chức/cá nhân nước ngoài kinh doanh, có thu nhập phát sinh tại VN mà không thành lập pháp nhân độc lập tại VN (không có PE rõ ràng). Bên VN (bên đặt thầu) có nghĩa vụ khấu trừ và nộp thay. Gồm 2 sắc thuế: GTGT + TNDN (tính trên doanh thu). Tỷ lệ phụ thuộc loại dịch vụ: dịch vụ 5% GTGT + 5% TNDN; thương mại hàng hóa 1% GTGT + 1% TNDN; phần mềm, tư vấn 5% GTGT + 10% TNDN. Miễn GTGT nếu dịch vụ sử dụng ngoài VN hoặc phục vụ xuất khẩu.',
    },
    {
      stem: 'Thuế Tiêu thụ đặc biệt (TTĐB) tại Việt Nam đánh vào:',
      choices: [
        'Tất cả hàng hóa tiêu dùng trong nước',
        'Hàng hóa và dịch vụ xa xỉ hoặc không khuyến khích tiêu dùng như rượu, bia, thuốc lá, xe ô tô',
        'Chỉ hàng hóa nhập khẩu từ nước ngoài',
        'Dịch vụ ngân hàng và bảo hiểm',
      ],
      answer: 1,
      explanation: 'Thuế TTĐB (Excise Tax/Special Consumption Tax) theo Luật Thuế TTĐB 2008 (sửa đổi 2014): đánh vào hàng hóa và dịch vụ đặc biệt nhằm (1) điều tiết tiêu dùng không khuyến khích (thuốc lá 75-100%, rượu 25-65%, bia 65%), (2) tăng thu ngân sách từ hàng xa xỉ (xe ô tô 35-150% tùy dung tích, máy bay, du thuyền), (3) bảo vệ sức khỏe công cộng và môi trường. Dịch vụ chịu TTĐB: kinh doanh casino, trò chơi điện tử có thưởng, đặt cược, vũ trường, karaoke, golf. Thuế TTĐB tính trên giá chưa có thuế TTĐB (không gồm VAT).',
    },
    {
      stem: 'Nghĩa vụ kê khai, nộp thuế GTGT theo phương pháp khấu trừ thông thường là:',
      choices: [
        'Hàng năm, chậm nhất ngày 31/3 năm sau',
        'Hàng tháng (chậm nhất ngày 20 tháng sau) hoặc hàng quý (chậm nhất ngày 30 tháng đầu quý sau) tùy quy mô',
        'Hàng quý bất kể quy mô doanh nghiệp',
        'Ngay sau mỗi giao dịch phát sinh',
      ],
      answer: 1,
      explanation: 'Kê khai thuế GTGT (Luật Quản lý thuế 2019, TT 80/2021): Kê khai tháng — DN có doanh thu năm trước từ 50 tỷ đồng trở lên: nộp tờ khai và tiền thuế chậm nhất ngày 20 của tháng tiếp theo. Kê khai quý — DN có doanh thu năm trước dưới 50 tỷ hoặc mới thành lập: nộp tờ khai chậm nhất ngày 30 (hoặc 31) đầu quý kế tiếp. DN mới thành lập mặc định kê khai theo quý trong 12 tháng đầu. Nộp chậm bị phạt 0,03%/ngày trên số tiền nộp chậm (tối đa 30% hoặc phạt cố định tùy vi phạm).',
    },
    {
      stem: 'Khái niệm "Lá chắn thuế" (Tax Shield) trong tài chính doanh nghiệp là:',
      choices: [
        'Kỹ thuật tránh thuế bất hợp pháp',
        'Lợi ích giảm thuế từ việc khấu trừ chi phí lãi vay hoặc khấu hao vào thu nhập chịu thuế',
        'Tài khoản dự phòng rủi ro thuế của doanh nghiệp',
        'Cơ chế miễn thuế cho doanh nghiệp xuất khẩu',
      ],
      answer: 1,
      explanation: 'Tax Shield (Lá chắn thuế) = khoản tiết kiệm thuế nhờ các chi phí được khấu trừ. Quan trọng nhất: Interest Tax Shield — lãi vay được trừ trước khi tính thuế TNDN → công ty vay nợ có lợi ích thuế so với công ty chỉ dùng vốn chủ. Tax Shield từ lãi vay = Lãi vay × Thuế suất TNDN. Ví dụ: vay 10 tỷ lãi suất 8%/năm, thuế suất 20% → lãi vay 800tr → tiết kiệm thuế 160tr/năm. Đây là một lý do lý thuyết M&M giải thích tại sao doanh nghiệp dùng nợ (Trade-off Theory: cân bằng lợi ích thuế và chi phí kiệt quẹ tài chính).',
    },
  ],
};
