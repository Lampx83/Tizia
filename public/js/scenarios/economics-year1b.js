// ============================================================
// Trường Kinh tế — Scenarios Năm 1 (E1.3 + E1.4 + E1.5)
// ============================================================
// Soạn theo chương trình cử nhân Kinh tế VN (NEU, FTU, UEH).
// Mỗi câu có explanation để học sinh hiểu rõ sau khi trả lời.
// ============================================================

// ─── E1.3 · Nguyên lý kế toán ────────────────────────────────
export const E13_QUIZ = {
  id: 'E1.3-accounting-quiz',
  title: 'E1.3 · Nguyên lý kế toán — Phương trình & báo cáo tài chính',
  kind: 'quiz',
  yearLevel: 1, subject: 'ke-toan', difficulty: 1,
  skillsTrained: ['phuong-trinh-ke-toan', 'bao-cao-tai-chinh', 'nguyen-tac-ke-toan', 'tai-khoan'],
  questions: [
    {
      stem: 'Phương trình kế toán cơ bản (Accounting Equation) là:',
      choices: [
        'Tài sản = Doanh thu − Chi phí',
        'Tài sản = Nợ phải trả + Vốn chủ sở hữu',
        'Tài sản = Nợ phải trả − Vốn chủ sở hữu',
        'Doanh thu = Chi phí + Lợi nhuận',
      ],
      answer: 1,
      explanation: 'Phương trình kế toán cơ bản: Tài sản (Assets) = Nợ phải trả (Liabilities) + Vốn chủ sở hữu (Equity). Đây là nền tảng của mọi hệ thống kế toán — phương trình luôn phải cân bằng sau mỗi giao dịch. Ví dụ: mua hàng bằng tiền mặt → Tài sản (hàng) tăng, Tài sản (tiền) giảm → vẫn cân bằng.',
    },
    {
      stem: 'Trong nguyên tắc ghi chép kép (Double-entry bookkeeping), mỗi giao dịch phải được ghi vào:',
      choices: [
        'Một tài khoản duy nhất',
        'Ít nhất hai tài khoản sao cho tổng Nợ = tổng Có',
        'Ba tài khoản trở lên',
        'Một tài khoản Nợ và nhiều tài khoản Có',
      ],
      answer: 1,
      explanation: 'Ghi chép kép: mỗi giao dịch ảnh hưởng ít nhất 2 tài khoản — tổng số tiền ghi Nợ (Debit) = tổng số tiền ghi Có (Credit). Quy tắc này đảm bảo phương trình kế toán luôn cân bằng và giúp phát hiện sai sót. Ví dụ: vay ngân hàng 100 triệu → Nợ TK Tiền mặt 100tr / Có TK Vay ngắn hạn 100tr.',
    },
    {
      stem: 'Tài sản nào sau đây được phân loại là TÀI SẢN NGẮN HẠN?',
      choices: [
        'Nhà xưởng và máy móc thiết bị',
        'Thương hiệu và bằng sáng chế',
        'Tiền mặt và hàng tồn kho (dưới 1 năm)',
        'Đầu tư tài chính dài hạn',
      ],
      answer: 2,
      explanation: 'Tài sản ngắn hạn (Current Assets): tài sản chuyển đổi thành tiền mặt trong vòng 1 năm hoặc 1 chu kỳ kinh doanh. Gồm: tiền mặt, tiền gửi ngắn hạn, phải thu ngắn hạn, hàng tồn kho, chi phí trả trước ngắn hạn. Nhà xưởng/máy móc là tài sản dài hạn; thương hiệu/bằng sáng chế là tài sản vô hình.',
    },
    {
      stem: 'Khấu hao tài sản cố định (Depreciation) được định nghĩa là:',
      choices: [
        'Giá trị thị trường của tài sản giảm theo thời gian',
        'Chi phí sửa chữa và bảo trì tài sản hàng năm',
        'Phân bổ có hệ thống chi phí của tài sản vào chi phí qua các kỳ sử dụng',
        'Tiền trả hàng năm để mua bảo hiểm tài sản',
      ],
      answer: 2,
      explanation: 'Khấu hao = phân bổ có hệ thống giá trị tài sản cố định vào chi phí theo thời gian hữu ích (không phải sự giảm giá trị thị trường). Phương pháp phổ biến: khấu hao đường thẳng (= Nguyên giá / Thời gian hữu ích). Mục đích: tuân thủ nguyên tắc phù hợp — phân bổ chi phí tài sản vào kỳ mà tài sản tạo ra doanh thu.',
    },
    {
      stem: 'Bảng cân đối kế toán (Balance Sheet) phản ánh điều gì?',
      choices: [
        'Doanh thu và chi phí trong một kỳ kế toán',
        'Tình trạng tài chính của doanh nghiệp tại một thời điểm cụ thể',
        'Dòng tiền vào và ra trong một kỳ',
        'Lợi nhuận thuần của doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Bảng cân đối kế toán (Balance Sheet / Statement of Financial Position): ảnh chụp tài chính TẠI MỘT THỜI ĐIỂM — liệt kê Tài sản, Nợ phải trả và Vốn chủ sở hữu. Khác với Báo cáo kết quả kinh doanh (phản ánh hoạt động trong kỳ) và Báo cáo lưu chuyển tiền tệ (dòng tiền trong kỳ).',
    },
    {
      stem: 'Nguyên tắc nhận doanh thu (Revenue Recognition Principle) quy định doanh thu được ghi nhận khi:',
      choices: [
        'Khách hàng đặt cọc tiền mua hàng',
        'Doanh nghiệp nhận được tiền thanh toán đầy đủ',
        'Đã thực hiện xong nghĩa vụ giao hàng/cung cấp dịch vụ cho khách hàng',
        'Ban giám đốc ký duyệt hợp đồng',
      ],
      answer: 2,
      explanation: 'Theo cơ sở tích lũy (Accrual basis) và chuẩn mực IFRS 15/VAS 14: doanh thu ghi nhận khi đã hoàn thành nghĩa vụ thực hiện (performance obligation) — tức đã giao hàng/cung cấp dịch vụ — bất kể đã thu tiền chưa. Ví dụ: giao hàng tháng 12/N, nhận tiền tháng 1/N+1 → doanh thu ghi nhận năm N.',
    },
    {
      stem: 'Nguyên tắc phù hợp (Matching Principle) trong kế toán quy định:',
      choices: [
        'Doanh thu và chi phí phải bằng nhau mỗi kỳ',
        'Chi phí phải ghi nhận trong cùng kỳ với doanh thu mà chúng tạo ra',
        'Doanh nghiệp phải dùng cùng phương pháp kế toán mỗi năm',
        'Giá trị tài sản phải khớp với giá thị trường',
      ],
      answer: 1,
      explanation: 'Nguyên tắc phù hợp (Matching Principle): chi phí được ghi nhận trong cùng kỳ với doanh thu mà chúng đóng góp tạo ra — dù thời điểm thanh toán tiền có thể khác. Ví dụ: hoa hồng bán hàng tháng 12 (liên quan đến doanh thu tháng 12) phải ghi nhận vào chi phí tháng 12 dù trả tiền tháng 1. Nguyên tắc này là lý do tồn tại của khái niệm "chi phí trả trước" và "chi phí phải trả".',
    },
    {
      stem: 'Lợi nhuận gộp (Gross Profit) được tính theo công thức:',
      choices: [
        'Doanh thu thuần − Tổng chi phí hoạt động',
        'Doanh thu thuần − Giá vốn hàng bán (COGS)',
        'Doanh thu thuần − Chi phí bán hàng & QLDN',
        'Doanh thu thuần − Thuế thu nhập doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Lợi nhuận gộp = Doanh thu thuần − Giá vốn hàng bán (Cost of Goods Sold - COGS). Đây là tầng lợi nhuận đầu tiên trong báo cáo KQKD, phản ánh hiệu quả sản xuất/mua hàng. Tiếp theo: Lợi nhuận hoạt động = Lợi nhuận gộp − Chi phí BH & QLDN. Lợi nhuận trước thuế = LN hoạt động + Thu nhập khác − Chi phí khác.',
    },
    {
      stem: 'Báo cáo lưu chuyển tiền tệ (Cash Flow Statement) phân loại dòng tiền thành mấy nhóm hoạt động?',
      choices: [
        '2 nhóm: kinh doanh và đầu tư',
        '3 nhóm: kinh doanh, đầu tư và tài chính',
        '4 nhóm: kinh doanh, đầu tư, tài chính và cổ tức',
        '3 nhóm: kinh doanh, vay vốn và trả nợ',
      ],
      answer: 1,
      explanation: 'Báo cáo lưu chuyển tiền tệ (Cash Flow Statement) gồm 3 nhóm: (1) Hoạt động kinh doanh (Operating) — tiền từ bán hàng, trả nhà cung cấp, trả lương; (2) Hoạt động đầu tư (Investing) — mua/bán tài sản cố định, đầu tư vào công ty khác; (3) Hoạt động tài chính (Financing) — vay/trả nợ, phát hành cổ phiếu, trả cổ tức.',
    },
    {
      stem: 'Kế toán theo cơ sở tích lũy (Accrual Basis) khác với cơ sở tiền mặt (Cash Basis) ở điểm cốt lõi nào?',
      choices: [
        'Accrual chỉ dùng cho doanh nghiệp lớn; Cash dùng cho hộ kinh doanh',
        'Accrual ghi nhận doanh thu/chi phí khi phát sinh; Cash ghi khi tiền thực thu/thực chi',
        'Accrual không cần ghi chép kép; Cash bắt buộc ghi chép kép',
        'Accrual không tính khấu hao; Cash tính khấu hao đầy đủ',
      ],
      answer: 1,
      explanation: 'Cơ sở tích lũy (Accrual): ghi nhận doanh thu khi đã phát sinh quyền nhận tiền, ghi nhận chi phí khi đã phát sinh nghĩa vụ trả tiền — bất kể tiền chưa vào/ra. Cơ sở tiền mặt (Cash): chỉ ghi khi tiền thực sự thu/chi. Hầu hết doanh nghiệp VN áp dụng accrual theo VAS/IFRS. Accrual cho bức tranh tài chính chính xác hơn về hoạt động kinh tế thực.',
    },
  ],
};

// ─── E1.4 · Pháp luật kinh tế ────────────────────────────────
export const E14_QUIZ = {
  id: 'E1.4-bizlaw-quiz',
  title: 'E1.4 · Pháp luật kinh tế — Doanh nghiệp, hợp đồng & cạnh tranh',
  kind: 'quiz',
  yearLevel: 1, subject: 'phap-luat-kt', difficulty: 1,
  skillsTrained: ['luat-doanh-nghiep', 'hop-dong-kinh-te', 'luat-canh-tranh', 'phap-nhan'],
  questions: [
    {
      stem: 'Theo Bộ luật Dân sự Việt Nam, điều kiện nào sau đây là điều kiện bắt buộc để một tổ chức được công nhận là PHÁP NHÂN?',
      choices: [
        'Phải có ít nhất 100 triệu đồng vốn điều lệ',
        'Được thành lập hợp pháp, có cơ cấu tổ chức chặt chẽ, có tài sản độc lập và nhân danh mình tham gia quan hệ pháp luật',
        'Phải do cơ quan nhà nước thành lập',
        'Phải có ít nhất 2 thành viên sáng lập',
      ],
      answer: 1,
      explanation: 'Điều 74 BLDS 2015 — pháp nhân cần 4 điều kiện: (1) Được thành lập hợp pháp; (2) Có cơ cấu tổ chức theo quy định; (3) Có tài sản độc lập với thành viên, tự chịu trách nhiệm bằng tài sản đó; (4) Nhân danh mình tham gia quan hệ pháp luật. Không quy định mức vốn tối thiểu cho pháp nhân; mức vốn tối thiểu do từng luật chuyên ngành quy định.',
    },
    {
      stem: 'Đặc điểm cơ bản nhất phân biệt Công ty TNHH với Doanh nghiệp tư nhân là:',
      choices: [
        'Công ty TNHH có thể phát hành cổ phiếu ra công chúng',
        'Thành viên Công ty TNHH chỉ chịu trách nhiệm trong phạm vi vốn góp (trách nhiệm hữu hạn)',
        'Doanh nghiệp tư nhân không được vay ngân hàng',
        'Công ty TNHH không phải nộp thuế thu nhập doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Trách nhiệm hữu hạn vs vô hạn là phân biệt then chốt: Công ty TNHH — thành viên chỉ chịu trách nhiệm về nợ của công ty trong phạm vi phần vốn đã góp (tài sản cá nhân không bị động đến). Doanh nghiệp tư nhân — chủ sở hữu chịu trách nhiệm vô hạn bằng toàn bộ tài sản của mình. Điều này ảnh hưởng lớn đến rủi ro kinh doanh.',
    },
    {
      stem: 'Loại hình doanh nghiệp nào được phép phát hành cổ phiếu ra CÔNG CHÚNG để huy động vốn?',
      choices: [
        'Công ty TNHH một thành viên',
        'Công ty TNHH hai thành viên trở lên',
        'Công ty cổ phần',
        'Doanh nghiệp tư nhân',
      ],
      answer: 2,
      explanation: 'Theo Luật Doanh nghiệp 2020: Công ty cổ phần (CTCP) là loại hình duy nhất được phép phát hành cổ phiếu, trái phiếu chuyển đổi và chứng khoán ra công chúng. Vốn điều lệ chia thành cổ phần; cổ đông chỉ chịu trách nhiệm trong phạm vi số cổ phần đã mua. Đây là cơ sở để thành lập công ty đại chúng và niêm yết trên sàn chứng khoán.',
    },
    {
      stem: 'Hành vi nào sau đây bị NGHIÊM CẤM theo Luật Cạnh tranh Việt Nam?',
      choices: [
        'Khuyến mãi giảm giá 30% trong dịp lễ',
        'Hai doanh nghiệp ký hợp đồng cung ứng nguyên liệu',
        'Thoả thuận ấn định giá bán giữa các đối thủ cạnh tranh trực tiếp',
        'Doanh nghiệp lớn mở rộng thị phần nhờ chất lượng sản phẩm tốt hơn',
      ],
      answer: 2,
      explanation: 'Luật Cạnh tranh 2018 nghiêm cấm các thoả thuận hạn chế cạnh tranh, đặc biệt thoả thuận ấn định giá (price-fixing) giữa các đối thủ cạnh tranh trực tiếp — đây là "hard-core" violation bị xử lý nặng nhất. Các hành vi cấm khác: phân chia thị trường, thông đồng đấu thầu, hạn chế sản lượng. Doanh nghiệp vi phạm có thể bị phạt đến 10% tổng doanh thu năm trước.',
    },
    {
      stem: 'Theo Luật Doanh nghiệp 2020, để hợp đồng dân sự có hiệu lực pháp lý, điều kiện NÀO là không bắt buộc trong mọi trường hợp?',
      choices: [
        'Chủ thể giao kết có năng lực pháp luật và năng lực hành vi',
        'Nội dung hợp đồng không vi phạm pháp luật và đạo đức xã hội',
        'Hợp đồng phải được công chứng tại văn phòng công chứng',
        'Sự tự nguyện của các bên',
      ],
      answer: 2,
      explanation: 'Điều 117 BLDS 2015 — điều kiện hiệu lực của giao dịch dân sự: (1) Chủ thể có năng lực; (2) Tự nguyện; (3) Nội dung mục đích không vi phạm pháp luật và đạo đức. Công chứng chỉ bắt buộc với một số hợp đồng đặc thù (mua bán bất động sản, uỷ quyền...), KHÔNG phải điều kiện hiệu lực chung cho mọi hợp đồng.',
    },
    {
      stem: 'Doanh nghiệp bị coi là mất khả năng thanh toán và có thể bị mở thủ tục phá sản khi:',
      choices: [
        'Lợi nhuận âm trong 2 năm liên tiếp',
        'Không thực hiện được nghĩa vụ thanh toán trong thời hạn 3 tháng kể từ ngày đến hạn',
        'Vốn chủ sở hữu âm',
        'Bị khiếu kiện bởi hơn 10 chủ nợ',
      ],
      answer: 1,
      explanation: 'Điều 4 Luật Phá sản 2014: doanh nghiệp mất khả năng thanh toán là doanh nghiệp KHÔNG thực hiện được nghĩa vụ thanh toán khoản nợ trong thời hạn 3 tháng kể từ ngày đến hạn. Đây là điều kiện cần để chủ nợ hoặc chính doanh nghiệp nộp đơn yêu cầu mở thủ tục phá sản. Lợi nhuận âm hay vốn âm chưa đủ để xét phá sản.',
    },
    {
      stem: 'Thời hạn bảo hộ quyền tác giả đối với tác phẩm văn học nghệ thuật do CÁ NHÂN sáng tác tại Việt Nam là:',
      choices: [
        '50 năm kể từ khi tác phẩm được công bố',
        'Suốt cuộc đời tác giả và 50 năm sau khi tác giả qua đời',
        'Suốt cuộc đời tác giả và 75 năm sau khi tác giả qua đời',
        '20 năm kể từ ngày đăng ký bản quyền',
      ],
      answer: 1,
      explanation: 'Luật Sở hữu trí tuệ VN 2005 (sửa đổi 2022), Điều 27: quyền tài sản tác giả cá nhân = suốt đời tác giả + 50 năm sau khi mất. Tác phẩm điện ảnh, nhiếp ảnh, mỹ thuật ứng dụng = 75 năm từ công bố (hoặc định hình). Sau thời hạn bảo hộ, tác phẩm thuộc "phạm vi công cộng" (public domain) — ai cũng có thể sử dụng không cần xin phép.',
    },
    {
      stem: 'Theo Bộ luật Lao động 2019, thời giờ làm việc bình thường KHÔNG được vượt quá:',
      choices: [
        '6 giờ/ngày hoặc 36 giờ/tuần',
        '8 giờ/ngày hoặc 48 giờ/tuần',
        '10 giờ/ngày hoặc 60 giờ/tuần',
        '8 giờ/ngày hoặc 40 giờ/tuần',
      ],
      answer: 1,
      explanation: 'Điều 105 BLLĐ 2019: thời giờ làm việc bình thường không quá 8 giờ/ngày và 48 giờ/tuần. Người sử dụng lao động có thể quy định làm 40 giờ/tuần hoặc ít hơn nhưng không được vượt 48 giờ/tuần. Làm thêm giờ phải có sự đồng ý của NLĐ và không vượt 40 giờ/tháng (200 giờ/năm, một số ngành được 300 giờ).',
    },
    {
      stem: 'Điều khoản "miễn trừ trách nhiệm do sự kiện bất khả kháng" trong hợp đồng kinh tế có nghĩa là:',
      choices: [
        'Một bên có thể đơn phương huỷ hợp đồng bất cứ lúc nào',
        'Bên vi phạm được miễn trách nhiệm nếu vi phạm do sự kiện khách quan không thể dự báo và không thể khắc phục',
        'Hợp đồng tự động vô hiệu khi xảy ra thiên tai',
        'Bên bị thiệt hại không được đòi bồi thường trong mọi trường hợp',
      ],
      answer: 1,
      explanation: 'Bất khả kháng (Force Majeure) — Điều 351 BLDS 2015: bên vi phạm được miễn trách nhiệm bồi thường nếu vi phạm do sự kiện bất khả kháng (thiên tai, chiến tranh, dịch bệnh...) với điều kiện: (1) Không thể lường trước khi ký hợp đồng; (2) Không thể khắc phục mặc dù đã áp dụng mọi biện pháp cần thiết. Phải thông báo ngay cho bên kia khi xảy ra sự kiện.',
    },
    {
      stem: 'Hộ kinh doanh khác với Doanh nghiệp tư nhân ở điểm quan trọng nhất là:',
      choices: [
        'Hộ kinh doanh không phải nộp thuế',
        'Doanh nghiệp tư nhân không cần đăng ký kinh doanh',
        'Hộ kinh doanh không có tư cách pháp nhân và chỉ được đăng ký kinh doanh tại một địa điểm duy nhất',
        'Hộ kinh doanh có thể thuê không giới hạn lao động',
      ],
      answer: 2,
      explanation: 'Hộ kinh doanh: (1) KHÔNG có tư cách pháp nhân; (2) Chỉ được đăng ký và hoạt động tại một địa điểm; (3) Chủ hộ chịu trách nhiệm vô hạn bằng tài sản; (4) Quy mô nhỏ (không được thuê trên 10 lao động thường xuyên, nếu vượt phải chuyển thành doanh nghiệp). Doanh nghiệp tư nhân cũng không có tư cách pháp nhân nhưng có tư cách pháp lý doanh nghiệp đầy đủ hơn.',
    },
  ],
};

// ─── E1.5 · Tin học cho kinh tế ──────────────────────────────
export const E15_QUIZ = {
  id: 'E1.5-it-econ-quiz',
  title: 'E1.5 · Tin học cho kinh tế — Excel, SQL & công nghệ tài chính',
  kind: 'quiz',
  yearLevel: 1, subject: 'tin-hoc-kt', difficulty: 1,
  skillsTrained: ['excel', 'sql', 'co-so-du-lieu', 'phan-tich-du-lieu', 'fintech'],
  questions: [
    {
      stem: 'Hàm VLOOKUP trong Excel dùng để:',
      choices: [
        'Tính tổng các ô trong một vùng dữ liệu',
        'Tìm kiếm một giá trị trong cột đầu tiên của bảng và trả về giá trị ở cùng hàng thuộc cột chỉ định',
        'Tạo biểu đồ tự động từ dữ liệu',
        'Lọc và sắp xếp dữ liệu theo điều kiện',
      ],
      answer: 1,
      explanation: 'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]): tìm lookup_value ở cột 1 của table_array, trả về giá trị ở cột col_index_num trong cùng hàng. Ví dụ: =VLOOKUP(A2, $D$2:$F$100, 3, FALSE) — tìm mã khách hàng ở cột D, trả về doanh thu (cột F). FALSE = khớp chính xác (exact match). Đây là hàm tra cứu phổ biến nhất trong phân tích kinh tế.',
    },
    {
      stem: 'PivotTable trong Excel chủ yếu dùng để:',
      choices: [
        'Vẽ biểu đồ 3D',
        'Tóm tắt, phân tích và trình bày dữ liệu lớn một cách linh hoạt theo nhiều chiều',
        'Kết nối với cơ sở dữ liệu SQL Server',
        'Kiểm tra lỗi công thức tự động',
      ],
      answer: 1,
      explanation: 'PivotTable (Bảng tổng hợp động): công cụ mạnh để xoay, nhóm, lọc và tổng hợp dữ liệu lớn mà không cần viết công thức phức tạp. Ví dụ: từ bảng 10.000 dòng giao dịch, PivotTable cho phép xem doanh thu theo tháng × sản phẩm × vùng chỉ bằng kéo thả. Thiết yếu cho nhà phân tích kinh doanh khi làm báo cáo tài chính và phân tích xu hướng.',
    },
    {
      stem: 'Câu lệnh SQL nào dùng để truy vấn TẤT CẢ dữ liệu từ bảng có tên "KhachHang"?',
      choices: [
        'GET ALL FROM KhachHang',
        'FETCH * FROM KhachHang',
        'SELECT * FROM KhachHang',
        'READ KhachHang.*',
      ],
      answer: 2,
      explanation: 'SQL (Structured Query Language): SELECT * FROM KhachHang — "*" nghĩa là tất cả cột, FROM chỉ tên bảng. Câu SQL cơ bản nhất. Mở rộng: SELECT * FROM KhachHang WHERE DiaChi = \'HCM\' ORDER BY TenKhachHang. Trong kinh tế: SQL dùng để truy vấn dữ liệu khách hàng, giao dịch, kho hàng từ hệ thống ERP, CRM, và data warehouse.',
    },
    {
      stem: 'Khoá chính (Primary Key) trong cơ sở dữ liệu quan hệ có chức năng:',
      choices: [
        'Mã hoá dữ liệu nhạy cảm trong cột',
        'Kết nối hai bảng với nhau',
        'Định danh duy nhất mỗi bản ghi (hàng) trong bảng — không được trùng, không được NULL',
        'Quy định thứ tự sắp xếp mặc định',
      ],
      answer: 2,
      explanation: 'Primary Key (PK): thuộc tính hoặc tập thuộc tính định danh DUY NHẤT mỗi bản ghi — không được null, không được trùng lặp. Ví dụ: bảng KhachHang có PK là MaKH; bảng HoaDon có PK là SoHD. Foreign Key (FK) thì tham chiếu đến PK của bảng khác để tạo quan hệ. Thiết kế PK đúng là nền tảng của cơ sở dữ liệu chuẩn hoá.',
    },
    {
      stem: 'Hàm Excel nào tính TRUNG BÌNH CỘNG của một dải ô (range)?',
      choices: ['SUM()', 'AVERAGE()', 'MEDIAN()', 'COUNT()'],
      answer: 1,
      explanation: 'AVERAGE(number1, [number2], ...): tính trung bình cộng. Ví dụ: =AVERAGE(B2:B100) tính trung bình 99 dòng doanh thu. Phân biệt: SUM() = tổng; COUNT() = đếm ô có số; COUNTA() = đếm ô không rỗng; MEDIAN() = trung vị (giá trị giữa sau khi sắp xếp); MODE() = giá trị xuất hiện nhiều nhất. Trong phân tích kinh tế, trung bình thường dùng kèm độ lệch chuẩn STDEV() để đánh giá rủi ro.',
    },
    {
      stem: 'ERP (Enterprise Resource Planning) trong doanh nghiệp là gì?',
      choices: [
        'Phần mềm diệt virus bảo vệ hệ thống máy tính',
        'Hệ thống phần mềm tích hợp quản lý toàn bộ các quy trình kinh doanh từ tài chính, kế toán đến chuỗi cung ứng và nhân sự',
        'Công cụ tạo báo cáo PowerPoint tự động',
        'Hệ thống đặt lịch họp trực tuyến',
      ],
      answer: 1,
      explanation: 'ERP (Enterprise Resource Planning): nền tảng phần mềm tích hợp chia sẻ dữ liệu thống nhất giữa các phòng ban — tài chính-kế toán, mua hàng, sản xuất, bán hàng, kho, nhân sự. Lợi ích: loại bỏ nhập liệu thủ công nhiều lần, dữ liệu real-time, báo cáo quản trị nhanh. Nhà cung cấp ERP phổ biến: SAP, Oracle, Microsoft Dynamics. Doanh nghiệp VN thường dùng SAP hoặc phần mềm nội địa (MISA, FAST).',
    },
    {
      stem: 'Khi cần thể hiện CƠ CẤU PHẦN TRĂM (tỷ trọng) của các thành phần trong một tổng thể, loại biểu đồ phù hợp nhất là:',
      choices: [
        'Biểu đồ đường (Line chart)',
        'Biểu đồ cột (Bar/Column chart)',
        'Biểu đồ tán xạ (Scatter plot)',
        'Biểu đồ tròn (Pie chart)',
      ],
      answer: 3,
      explanation: 'Pie chart (biểu đồ tròn/hình bánh): tốt nhất khi muốn thể hiện tỷ trọng phần trăm (các phần gộp lại = 100%). Ví dụ: cơ cấu chi phí, thị phần. Nguyên tắc chọn biểu đồ: Line chart → xu hướng theo thời gian; Bar/Column → so sánh giá trị; Scatter → quan hệ giữa 2 biến liên tục; Pie → cơ cấu phần trăm (dùng ít hơn 6 phần để dễ đọc).',
    },
    {
      stem: 'Mã hoá dữ liệu (Encryption) trong kinh tế số và FinTech nhằm mục đích chính là:',
      choices: [
        'Nén dữ liệu để tiết kiệm dung lượng lưu trữ',
        'Tăng tốc độ truy xuất cơ sở dữ liệu',
        'Bảo vệ dữ liệu khỏi truy cập trái phép bằng cách chuyển sang dạng không thể đọc nếu không có khoá giải mã',
        'Sao lưu dữ liệu tự động lên đám mây',
      ],
      answer: 2,
      explanation: 'Mã hoá (Encryption): chuyển đổi dữ liệu gốc (plaintext) thành dữ liệu mã hoá (ciphertext) bằng thuật toán và khoá (key). Chỉ người có khoá giải mã mới đọc được dữ liệu. Ứng dụng trong kinh tế: mã hoá thẻ tín dụng (PCI-DSS), giao dịch ngân hàng (SSL/TLS), dữ liệu khách hàng (GDPR). Mã hoá là nền tảng của mọi hệ thống thanh toán điện tử và FinTech.',
    },
    {
      stem: 'Ba đặc điểm "3V" cổ điển của Big Data là:',
      choices: [
        'Visibility (thấy được), Velocity (tốc độ), Value (giá trị)',
        'Volume (dung lượng lớn), Velocity (tốc độ cao), Variety (đa dạng định dạng)',
        'Volume (dung lượng), Verification (xác minh), Value (giá trị)',
        'Versatility (linh hoạt), Velocity (tốc độ), Veracity (chính xác)',
      ],
      answer: 1,
      explanation: '3V của Big Data (Doug Laney, 2001): (1) Volume — khối lượng dữ liệu khổng lồ (terabytes đến petabytes); (2) Velocity — tốc độ tạo ra và xử lý dữ liệu rất nhanh (real-time streaming); (3) Variety — đa dạng định dạng (structured: SQL; semi-structured: JSON/XML; unstructured: text, ảnh, video). Ngoài ra còn có 4V (thêm Veracity – độ tin cậy) và 5V (thêm Value). Trong kinh tế: phân tích hành vi khách hàng, dự báo cầu.',
    },
    {
      stem: 'FinTech (Financial Technology) đề cập đến:',
      choices: [
        'Phần cứng máy tính chuyên dụng cho ngân hàng',
        'Ứng dụng công nghệ số để cải thiện, tự động hoá và đổi mới các dịch vụ tài chính',
        'Phần mềm kế toán truyền thống như SAP và MISA',
        'Hệ thống ATM và POS của ngân hàng truyền thống',
      ],
      answer: 1,
      explanation: 'FinTech = Financial Technology: áp dụng công nghệ (AI, blockchain, mobile, cloud, big data) để cách mạng hoá dịch vụ tài chính. Ví dụ: (1) Thanh toán di động — MoMo, ZaloPay, VNPay; (2) Cho vay P2P (peer-to-peer lending); (3) Robo-advisor — tư vấn đầu tư tự động; (4) InsurTech — bảo hiểm số; (5) RegTech — tự động tuân thủ quy định; (6) Blockchain và tiền mã hoá. FinTech đang phá vỡ mô hình ngân hàng truyền thống toàn cầu.',
    },
  ],
};

// Aggregate export
export const ECONOMICS_YEAR1B_SCENARIOS = {
  [E13_QUIZ.id]: E13_QUIZ,
  [E14_QUIZ.id]: E14_QUIZ,
  [E15_QUIZ.id]: E15_QUIZ,
};
