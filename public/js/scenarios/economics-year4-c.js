// economics-year4-c.js — E4.5 Đạo đức kinh doanh + E4.6 Khoá luận
// ─── E4.5 · Đạo đức kinh doanh ───────────────────────────
export const E45_QUIZ = {
  id: 'E4.5-business-ethics-quiz',
  title: 'E4.5 · Đạo đức kinh doanh & Trách nhiệm xã hội doanh nghiệp (CSR)',
  kind: 'quiz',
  yearLevel: 4, subject: 'dao-duc-kd', difficulty: 4,
  skillsTrained: ['dao-duc-kinh-doanh', 'csr', 'quan-tri-tuan-thu', 'van-hoa-to-chuc'],
  questions: [
    {
      stem: 'Theo lý thuyết của Milton Friedman về trách nhiệm xã hội doanh nghiệp, nghĩa vụ duy nhất của doanh nghiệp là:',
      choices: [
        'Bảo vệ môi trường và cộng đồng địa phương',
        'Tối đa hóa lợi nhuận cho cổ đông trong khuôn khổ pháp luật và đạo đức kinh doanh',
        'Ưu tiên lợi ích người lao động trước tiên',
        'Cân bằng lợi ích của tất cả các bên liên quan',
      ],
      answer: 1,
      explanation: 'Milton Friedman (1970 — "The Social Responsibility of Business is to Increase its Profits"): Doanh nghiệp là pháp nhân, trách nhiệm chính là với cổ đông — những người bỏ vốn. Nếu ban quản lý chi tiền cổ đông cho mục đích xã hội, họ đã tự ý đánh thuế cổ đông mà không được ủy quyền — đây là không phù hợp trong nền kinh tế tự do. Tuy nhiên Friedman không nói "vô đạo đức" — ông nhấn mạnh phải trong khuôn khổ pháp luật và đạo đức. Quan điểm này đối lập với lý thuyết Stakeholder của Freeman.',
    },
    {
      stem: 'Lý thuyết Stakeholder (các bên liên quan) của R. Edward Freeman lập luận rằng:',
      choices: [
        'Chỉ cổ đông (shareholders) mới là bên liên quan thực sự',
        'Doanh nghiệp có nghĩa vụ với tất cả các bên bị ảnh hưởng bởi hoạt động: nhân viên, khách hàng, nhà cung cấp, cộng đồng, cổ đông',
        'Khách hàng quan trọng nhất, sau đó mới đến nhân viên và cổ đông',
        'Chính phủ là bên liên quan duy nhất cần quan tâm vì quyền lực pháp lý',
      ],
      answer: 1,
      explanation: 'Stakeholder Theory (Freeman, 1984): Stakeholder = bất kỳ nhóm/cá nhân nào bị ảnh hưởng hoặc có thể ảnh hưởng đến việc đạt mục tiêu của tổ chức. Gồm: Internal stakeholders (nhân viên, ban lãnh đạo, cổ đông) và External stakeholders (khách hàng, nhà cung cấp, cộng đồng, chính phủ, nhà đầu tư, NGO, môi trường). Doanh nghiệp thành công dài hạn cần tạo ra giá trị cho TẤT CẢ các bên, không chỉ tối đa hóa lợi nhuận ngắn hạn cho cổ đông. Khung phân tích: Power-Interest Matrix để ưu tiên quản lý từng nhóm stakeholder.',
    },
    {
      stem: 'Kim tự tháp CSR của Carroll (1991) sắp xếp trách nhiệm doanh nghiệp theo thứ tự từ nền đến đỉnh:',
      choices: [
        'Philanthropy → Ethical → Legal → Economic',
        'Economic → Legal → Ethical → Philanthropic',
        'Legal → Economic → Philanthropic → Ethical',
        'Ethical → Legal → Economic → Philanthropic',
      ],
      answer: 1,
      explanation: 'Carroll\'s CSR Pyramid (Archie Carroll, 1991) — 4 tầng từ nền đến đỉnh: (1) Economic (Kinh tế) — nền tảng: sinh lợi nhuận, tồn tại và phát triển; (2) Legal (Pháp lý) — tuân thủ luật pháp: đây là "bộ luật đạo đức" xã hội đã luật hóa; (3) Ethical (Đạo đức) — làm điều đúng dù luật không bắt buộc: công bằng, trung thực, tránh tổn hại; (4) Philanthropic (Từ thiện) — đỉnh: đóng góp tự nguyện cho cộng đồng, cải thiện chất lượng cuộc sống. Thứ tự này không có nghĩa mức cao ít quan trọng hơn — tất cả đều cần, nhưng kinh tế là điều kiện tiên quyết.',
    },
    {
      stem: 'Tham nhũng trong kinh doanh (Bribery and Corruption) gây hại chủ yếu vì:',
      choices: [
        'Làm tăng chi phí doanh nghiệp nhưng không ảnh hưởng đến xã hội',
        'Bóp méo thị trường, tạo bất bình đẳng, đặt doanh nghiệp uy tín vào thế bất lợi, và vi phạm pháp luật nghiêm trọng',
        'Chỉ gây hại cho doanh nghiệp nhà nước, không ảnh hưởng khu vực tư nhân',
        'Chỉ là vấn đề đạo đức cá nhân, không ảnh hưởng đến hiệu quả kinh tế',
      ],
      answer: 1,
      explanation: 'Tham nhũng/hối lộ gây ra nhiều tác hại: Kinh tế — bóp méo cạnh tranh lành mạnh (DN trả hối lộ thắng thầu dù không đủ năng lực), tăng chi phí kinh doanh tổng thể, phân bổ nguồn lực sai; Xã hội — xói mòn niềm tin công, tăng bất bình đẳng, giảm chất lượng dịch vụ công; Pháp lý — vi phạm Luật Phòng chống tham nhũng VN, FCPA (Mỹ), UK Bribery Act, UNCAC (Công ước LHQ); Uy tín — khi bị phát hiện, thiệt hại uy tín thường lớn hơn nhiều lợi ích ngắn hạn. ISO 37001 là tiêu chuẩn quản lý chống hối lộ.',
    },
    {
      stem: 'Văn hóa tổ chức (Organizational Culture) ảnh hưởng đến đạo đức kinh doanh theo cách:',
      choices: [
        'Văn hóa tổ chức hoàn toàn tách biệt với quyết định đạo đức của nhân viên',
        'Văn hóa "tông" từ lãnh đạo (tone at the top) tạo ra khuôn mẫu hành vi đạo đức; môi trường áp lực cao có thể dẫn đến vi phạm đạo đức',
        'Chỉ quy tắc đạo đức thành văn (code of ethics) mới có ảnh hưởng, văn hóa không đo lường được',
        'Văn hóa tổ chức chỉ quan trọng trong công ty đa quốc gia',
      ],
      answer: 1,
      explanation: '"Tone at the top" — cách lãnh đạo cấp cao hành xử, giao tiếp và ra quyết định tạo ra chuẩn mực văn hóa ngầm mà nhân viên học theo. Nghiên cứu về các vụ bê bối (Enron, Volkswagen, Wells Fargo) cho thấy: văn hóa chịu áp lực kết quả ngắn hạn quá cao, thiếu cơ chế báo cáo vi phạm an toàn (whistleblower protection), và lãnh đạo không mẫu mực → nhân viên hợp lý hóa vi phạm đạo đức. Ngược lại: văn hóa coi trọng tính chính trực, có kênh báo cáo ẩn danh, khen thưởng hành vi đúng → ít vi phạm hơn.',
    },
    {
      stem: 'Chỉ số ESG (Environmental, Social, Governance) đo lường:',
      choices: [
        'Doanh thu từ sản phẩm thân thiện môi trường',
        'Hiệu quả tài chính qua 3 năm liên tiếp',
        'Mức độ doanh nghiệp quản lý rủi ro và cơ hội liên quan đến môi trường, xã hội và quản trị công ty',
        'Số lượng chứng chỉ ISO môi trường doanh nghiệp đạt được',
      ],
      answer: 2,
      explanation: 'ESG (Environmental, Social, Governance): E — Carbon footprint, tiêu thụ năng lượng, quản lý chất thải, đa dạng sinh học; S — quan hệ lao động, an toàn nghề nghiệp, đa dạng & hòa nhập, quyền con người trong chuỗi cung ứng, quan hệ cộng đồng; G — cấu trúc HĐQT độc lập, minh bạch thù lao, chống tham nhũng, quyền cổ đông. Nhà đầu tư tổ chức (BlackRock, Vanguard) ngày càng tích hợp ESG vào phân tích đầu tư: DN có ESG kém → rủi ro pháp lý, uy tín cao hơn → chi phí vốn cao hơn. GRI, SASB, TCFD là các framework báo cáo ESG phổ biến.',
    },
    {
      stem: 'Xung đột lợi ích (Conflict of Interest) trong quản trị doanh nghiệp xảy ra khi:',
      choices: [
        'Hai doanh nghiệp cùng ngành cạnh tranh về thị phần',
        'Người ra quyết định có lợi ích cá nhân có thể ảnh hưởng đến tính khách quan của quyết định vì lợi ích tổ chức',
        'Các phòng ban trong doanh nghiệp có mục tiêu khác nhau',
        'Cổ đông lớn và cổ đông nhỏ có quan điểm chiến lược khác nhau',
      ],
      answer: 1,
      explanation: 'Conflict of Interest (xung đột lợi ích): cá nhân hoặc tổ chức có lợi ích riêng (tài chính, quan hệ cá nhân) khác với nghĩa vụ phục vụ lợi ích của tổ chức/khách hàng mà họ đại diện. Ví dụ: Kiểm toán viên sở hữu cổ phần công ty kiểm toán; Thành viên HĐQT phê duyệt hợp đồng với doanh nghiệp của người thân; Nhà phân tích tài chính có thù lao từ công ty mà họ đánh giá. Quản lý: công bố (disclosure) xung đột lợi ích, né tránh (recusal) khỏi quyết định liên quan, phân tách chức năng (separation of duties).',
    },
    {
      stem: 'Lý thuyết "Đại lý" (Agency Theory) trong quản trị công ty mô tả xung đột giữa:',
      choices: [
        'Công ty và chính phủ trong việc nộp thuế',
        'Cổ đông (Principal) và ban quản lý (Agent) khi lợi ích hai bên không đồng nhất',
        'Nhân viên và khách hàng trong giao dịch thương mại',
        'Doanh nghiệp và nhà cung cấp về điều khoản hợp đồng',
      ],
      answer: 1,
      explanation: 'Agency Theory (Jensen & Meckling, 1976): Cổ đông (Principal) thuê Ban quản lý (Agent) điều hành công ty thay mình. Vấn đề đại lý: Agent có thông tin hơn (information asymmetry) và có thể hành động vì lợi ích bản thân (empire building, perquisite consumption, short-termism) thay vì lợi ích Principal. Chi phí đại lý: monitoring costs (cổ đông giám sát mgmt), bonding costs (mgmt cam kết không làm hại cổ đông), residual loss. Giải pháp: Incentive alignment (cổ phần, quyền chọn cổ phiếu cho mgmt), Board oversight (HĐQT độc lập), Disclosure (minh bạch thông tin), Takeover threat (nguy cơ bị mua lại).',
    },
    {
      stem: 'Whistleblowing (tố giác vi phạm nội bộ) được khuyến khích trong quản trị đạo đức vì:',
      choices: [
        'Giúp nhân viên được tăng lương và thăng chức nhanh hơn',
        'Là cơ chế phát hiện vi phạm pháp luật và đạo đức sớm, bảo vệ tổ chức và công chúng khỏi thiệt hại lớn hơn',
        'Chứng tỏ sự thiếu trung thành với tổ chức của nhân viên',
        'Thay thế hoàn toàn nhu cầu kiểm toán và giám sát nội bộ',
      ],
      answer: 1,
      explanation: 'Whistleblowing: nhân viên/cộng tác viên tiết lộ vi phạm pháp luật, đạo đức hoặc chính sách tổ chức cho cơ quan có thẩm quyền (nội bộ hoặc bên ngoài). Vai trò: phát hiện sớm trước khi thiệt hại leo thang (Enron, WorldCom được phát hiện qua whistleblowers). Bảo vệ whistleblower: Luật Tố cáo VN 2018, Dodd-Frank Act (Mỹ — thưởng 10-30% tiền thu hồi). Thách thức: văn hóa "không chỉ điểm đồng nghiệp", sợ trả thù (retaliation), thiếu kênh tố cáo an toàn. Doanh nghiệp tốt cần: hotline ẩn danh, chính sách bảo vệ tố giác, điều tra độc lập.',
    },
    {
      stem: 'Nguyên tắc "Arm\'s Length" trong giao dịch kinh doanh có nghĩa là:',
      choices: [
        'Không được phép giao dịch với người thân trong gia đình',
        'Giao dịch được thực hiện như thể giữa các bên độc lập, không có quan hệ đặc biệt, không chịu ảnh hưởng bất thường',
        'Hai bên phải ký kết hợp đồng có công chứng',
        'Giá trị giao dịch không được vượt quá 1 năm doanh thu',
      ],
      answer: 1,
      explanation: 'Arm\'s Length Principle (Nguyên tắc ngang bằng thị trường): giao dịch xảy ra như thể giữa các bên hoàn toàn độc lập, không có quan hệ kiểm soát, tác động qua lại, hoặc áp lực bất thường — tương tự giao dịch trên thị trường cạnh tranh. Ứng dụng: (1) Transfer Pricing: giá giao dịch nội bộ tập đoàn phải bằng giá thị trường; (2) Giao dịch với bên liên quan (Related Party Transactions): HĐQT có quan hệ lợi ích không được bỏ phiếu; (3) Kế toán: công ty con không được mua tài sản từ công ty mẹ với giá cao bất thường. Đây là nguyên tắc nền tảng của cả thuế quốc tế lẫn quản trị công ty.',
    },
  ],
};

// ─── E4.6 · Khoá luận kinh tế (Capstone) ────────────────────
export const E46_QUIZ = {
  id: 'E4.6-capstone-quiz',
  title: 'E4.6 · Khoá luận Kinh tế — Phương pháp nghiên cứu & Tổng hợp kiến thức',
  kind: 'quiz',
  yearLevel: 4, subject: 'khoa-luan-kt', difficulty: 4,
  skillsTrained: ['phuong-phap-nghien-cuu', 'viet-khoa-luan', 'tong-hop-kien-thuc', 'trinh-bay-bao-cao'],
  questions: [
    {
      stem: 'Phương pháp nghiên cứu định lượng (Quantitative Research) đặc trưng bởi:',
      choices: [
        'Phỏng vấn sâu và quan sát tham dự để hiểu ngữ cảnh',
        'Thu thập dữ liệu số lượng lớn, kiểm định giả thuyết bằng thống kê, kết quả có thể tổng quát hóa',
        'Phân tích nội dung văn bản và diễn ngôn',
        'Nghiên cứu trường hợp điển hình (case study)',
      ],
      answer: 1,
      explanation: 'Phương pháp nghiên cứu có 2 hướng chính: Quantitative (Định lượng) — dùng dữ liệu số, khảo sát quy mô lớn, kiểm định thống kê (t-test, hồi quy, SEM), kết quả có thể generalize ra tổng thể, mạnh về "bao nhiêu/ở mức nào". Qualitative (Định tính) — phỏng vấn sâu, focus group, grounded theory, thematic analysis, mạnh về "tại sao/như thế nào". Mixed Methods — kết hợp cả hai. Với khoá luận kinh tế, quantitative thường dùng hồi quy (OLS, Logit, Probit), phân tích bảng (panel data), DID (Difference-in-Differences) để đánh giá chính sách.',
    },
    {
      stem: 'Trong nghiên cứu kinh tế, vấn đề "nội sinh" (Endogeneity) xảy ra khi:',
      choices: [
        'Biến độc lập trong mô hình quá nhiều (over-fitting)',
        'Biến độc lập X tương quan với sai số ε — có thể do bỏ sót biến, đồng thời (simultaneity), hoặc sai số đo lường',
        'Kết quả nghiên cứu không thể áp dụng cho nước khác',
        'Mẫu nghiên cứu quá nhỏ (n < 30)',
      ],
      answer: 1,
      explanation: 'Endogeneity (Nội sinh) là vi phạm nghiêm trọng nhất của OLS: Cov(X, ε) ≠ 0, làm OLS cho ước lượng chệch và không nhất quán. 3 nguồn gốc chính: (1) Omitted Variable Bias — bỏ sót biến quan trọng tương quan cả X lẫn Y (ví dụ: nghiên cứu tác động giáo dục lên thu nhập bỏ sót "năng lực bẩm sinh"); (2) Simultaneity — X ảnh hưởng Y và Y cũng ảnh hưởng X (giá và cầu); (3) Measurement Error — đo X không chính xác. Giải pháp: IV (Instrumental Variable) — tìm biến Z tương quan X nhưng không tương quan ε; DiD; RDD; Fixed Effects.',
    },
    {
      stem: 'Đạo văn (Plagiarism) trong nghiên cứu học thuật được định nghĩa là:',
      choices: [
        'Trích dẫn quá nhiều từ một tác giả duy nhất',
        'Sử dụng ý tưởng, văn bản, dữ liệu của người khác mà không trích dẫn nguồn gốc, coi như của mình',
        'Viết quá ngắn gọn so với yêu cầu của tạp chí',
        'Sử dụng phần mềm thống kê để phân tích dữ liệu thứ cấp',
      ],
      answer: 1,
      explanation: 'Plagiarism (Đạo văn) — vi phạm đạo đức nghiên cứu nghiêm trọng: sao chép văn bản, ý tưởng, dữ liệu của người khác mà không trích nguồn. Các loại: Verbatim (sao chép từng từ), Paraphrasing plagiarism (diễn đạt lại nhưng không trích nguồn), Mosaic (kết hợp nhiều nguồn không trích dẫn), Self-plagiarism (tái sử dụng công trình cũ của chính mình). Phần mềm phát hiện: Turnitin, iThenticate. Hậu quả: bị điểm 0/không tốt nghiệp, thu hồi bằng cấp, thụt lùi sự nghiệp học thuật. Chuẩn trích dẫn: APA 7, MLA, Chicago, Vancouver (y sinh).',
    },
    {
      stem: 'Trong phân tích hồi quy cho khoá luận, R² (hệ số xác định) cho biết:',
      choices: [
        'Tỷ lệ phần trăm biến động của Y được giải thích bởi các biến X trong mô hình',
        'Số lượng biến độc lập tối ưu trong mô hình',
        'Xác suất mô hình cho kết quả đúng',
        'Hệ số tương quan giữa biến độc lập và biến phụ thuộc',
      ],
      answer: 0,
      explanation: 'R² = SSR/SST = 1 − SSE/SST: đo lường tỷ lệ biến động tổng cộng của Y được giải thích bởi mô hình hồi quy. R² = 0,75 nghĩa là 75% biến động Y giải thích được. Lưu ý: thêm biến X bất kỳ (dù không có ý nghĩa) đều làm R² tăng → dùng Adjusted R² khi so sánh mô hình có số biến khác nhau: Adj.R² = 1 − (1−R²)(n−1)/(n−k−1). R² cao không đảm bảo mô hình tốt: có thể do overfitting hoặc spurious regression. Trong kinh tế vĩ mô chuỗi thời gian, R² thường rất cao dù không có quan hệ nhân quả thực sự (regression spurious với trend).',
    },
    {
      stem: 'Phương pháp "Difference-in-Differences" (DiD) dùng để:',
      choices: [
        'Tính chênh lệch doanh thu giữa hai năm liên tiếp',
        'Đánh giá tác động nhân quả của một chính sách bằng cách so sánh thay đổi của nhóm can thiệp với nhóm kiểm soát',
        'So sánh hiệu quả kinh doanh giữa hai doanh nghiệp cùng ngành',
        'Tính phương sai của hai mẫu độc lập',
      ],
      answer: 1,
      explanation: 'Difference-in-Differences (DiD): phương pháp kinh tế lượng quasi-experimental để ước lượng tác động nhân quả. Ý tưởng: so sánh "chênh lệch theo thời gian" của nhóm can thiệp (treatment group — chịu tác động chính sách) với nhóm kiểm soát (control group — không chịu tác động), trước và sau khi chính sách được thực hiện. ATT = (ȳ_T,post − ȳ_T,pre) − (ȳ_C,post − ȳ_C,pre). Giả định then chốt: Parallel Trends — nếu không có chính sách, nhóm treatment và control sẽ có xu hướng thay đổi song song. Kiểm tra: xem xu hướng trước can thiệp có song song không (pre-trend test).',
    },
    {
      stem: 'Cấu trúc của một khoá luận/luận văn kinh tế chuẩn thường gồm (theo thứ tự):',
      choices: [
        'Kết luận → Phương pháp → Kết quả → Giới thiệu',
        'Giới thiệu → Tổng quan tài liệu → Phương pháp → Kết quả → Thảo luận → Kết luận',
        'Phương pháp → Giới thiệu → Kết quả → Tổng quan tài liệu',
        'Kết quả → Phương pháp → Tổng quan tài liệu → Kết luận',
      ],
      answer: 1,
      explanation: 'Cấu trúc IMRaD (Introduction, Methods, Results, and Discussion) là chuẩn quốc tế cho bài báo khoa học và luận văn: (1) Introduction — bối cảnh, khoảng trống nghiên cứu, câu hỏi nghiên cứu, mục tiêu; (2) Literature Review/Theoretical Framework — tổng quan lý thuyết và nghiên cứu trước; (3) Methodology — dữ liệu, biến, mô hình, phương pháp ước lượng; (4) Results — kết quả thống kê, bảng hồi quy; (5) Discussion — giải thích kết quả, so sánh với nghiên cứu trước, hàm ý chính sách; (6) Conclusion — tóm tắt, đóng góp, hạn chế, hướng nghiên cứu tiếp theo. Phụ lục: bảng tóm tắt thống kê, kiểm định bổ sung.',
    },
    {
      stem: 'Hàm ý chính sách (Policy Implication) trong khoá luận kinh tế cần:',
      choices: [
        'Chỉ tóm tắt lại kết quả thực nghiệm đã trình bày',
        'Dựa trực tiếp trên bằng chứng từ nghiên cứu, cụ thể, khả thi và địa chỉ rõ ai có thể thực thi',
        'Đề xuất càng nhiều khuyến nghị chính sách càng tốt để thể hiện chiều sâu nghiên cứu',
        'Sao chép khuyến nghị từ nghiên cứu nước ngoài áp dụng trực tiếp vào Việt Nam',
      ],
      answer: 1,
      explanation: 'Hàm ý chính sách (Policy Implications) tốt phải: (1) Bắt nguồn từ kết quả thực nghiệm — không đề xuất điều nghiên cứu không chứng minh; (2) Cụ thể — không chỉ "cần tăng đầu tư vào X" mà "cơ quan Y nên thực hiện Z với quy mô W và timeline T"; (3) Khả thi — xem xét ràng buộc ngân sách, thể chế, chính trị; (4) Địa chỉ rõ — Chính phủ, NHNN, UBND tỉnh, hay doanh nghiệp?; (5) Nhận diện tradeoffs — mỗi chính sách có chi phí, hãy thừa nhận. Hạn chế thường thấy trong sinh viên: đề xuất chính sách quá rộng, không liên hệ với bằng chứng thực nghiệm, không thực tế.',
    },
    {
      stem: 'Bẫy "Tương quan không phải nhân quả" (Correlation ≠ Causation) trong nghiên cứu là:',
      choices: [
        'Hai biến không có mối quan hệ nào dù cả hai cùng tăng',
        'Hai biến X và Y cùng biến đổi (tương quan) nhưng không nhất thiết X gây ra Y — có thể do biến thứ ba Z gây ra cả hai',
        'Hệ số tương quan âm dù kết quả hồi quy dương',
        'Kết quả kiểm định thống kê mâu thuẫn với kiểm định kinh tế',
      ],
      answer: 1,
      explanation: 'Correlation vs Causation: ví dụ kiền điển — kem ốc quế bán chạy tương quan thuận với tỷ lệ chết đuối (cùng tăng vào mùa hè), nhưng kem không gây chết đuối — biến Z (mùa hè nóng) gây ra cả hai. Trong kinh tế: GDP tăng tương quan với tiêu thụ điện — nhưng điều gì là nguyên nhân? Các bậy: Spurious regression (chuỗi thời gian có trend chung), Omitted variable bias, Reverse causality (Y thực ra gây X). Để thiết lập nhân quả cần: RCT (thí nghiệm ngẫu nhiên), IV, DiD, RDD hoặc thiết kế nghiên cứu cẩn thận. Lưu ý khi đọc báo cáo: "nghiên cứu cho thấy A liên quan đến B" ≠ A gây ra B.',
    },
    {
      stem: 'Kỹ năng trình bày khoá luận trước Hội đồng chấm thi đòi hỏi:',
      choices: [
        'Đọc toàn bộ nội dung khoá luận trong thời gian trình bày',
        'Trình bày súc tích vấn đề nghiên cứu, phương pháp, kết quả chính và hàm ý; trả lời câu hỏi phản biện tự tin và thẳng thắn',
        'Chỉ trình bày phần kết luận vì Hội đồng đã đọc toàn văn trước',
        'Sử dụng càng nhiều bảng số liệu và công thức phức tạp càng chứng tỏ chiều sâu nghiên cứu',
      ],
      answer: 1,
      explanation: 'Trình bày khoá luận hiệu quả: Cấu trúc 10-15 phút (thường): 1-2 phút giới thiệu vấn đề và câu hỏi nghiên cứu; 2-3 phút tổng quan phương pháp và dữ liệu; 4-5 phút kết quả chính (2-3 bảng/hình quan trọng nhất); 2-3 phút hàm ý và hạn chế. Kỹ năng Q&A: lắng nghe toàn bộ câu hỏi trước khi trả lời, thừa nhận khi không biết thay vì bịa, nếu phản biện đúng thì thừa nhận cùng lý do, không ngắt lời Hội đồng. Sai lầm thường gặp: slide quá nhiều chữ, đọc từng dòng thay vì trình bày, bị mất bình tĩnh khi bị phản biện, không giới hạn trong thời gian.',
    },
    {
      stem: 'Trong bảo vệ khoá luận, câu hỏi phản biện "Tính đại diện của mẫu" đặt ra vấn đề:',
      choices: [
        'Liệu phần mềm thống kê được sử dụng có đáng tin cậy không',
        'Liệu mẫu nghiên cứu có phản ánh đặc điểm của tổng thể mục tiêu và kết quả có thể được tổng quát hóa không',
        'Liệu tác giả đã đọc đủ tài liệu tham khảo không',
        'Liệu số liệu có được cập nhật đến thời điểm gần nhất không',
      ],
      answer: 1,
      explanation: 'Tính đại diện mẫu (Sample Representativeness): để tổng quát hóa (generalize) kết quả từ mẫu ra tổng thể, mẫu phải đại diện — phản ánh đặc điểm cấu trúc của tổng thể (phân phối địa lý, nhân khẩu, ngành nghề). Các vấn đề: Selection bias (mẫu thiên lệch — ví dụ chỉ khảo sát sinh viên trường X); Sampling frame (khung mẫu không phủ đủ tổng thể); Response bias (người trả lời có đặc điểm khác người không trả lời — nonresponse bias). Kỹ thuật lấy mẫu xác suất (probability sampling) như random sampling, stratified sampling giúp đảm bảo đại diện. Khi mẫu không đại diện, kết luận chỉ áp dụng cho mẫu đó.',
    },
  ],
};

// ─── Tổng hợp export ─────────────────────────────────────────────────
