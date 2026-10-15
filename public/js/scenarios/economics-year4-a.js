// economics-year4-a.js — E4.1 Quản trị chiến lược + E4.2 Khởi nghiệp
// ─── E4.1 · Quản trị chiến lược ─────────────────────────────
export const E41_QUIZ = {
  id: 'E4.1-strategy-quiz',
  title: 'E4.1 · Quản trị chiến lược — Phân tích & Ra quyết định chiến lược',
  kind: 'quiz',
  yearLevel: 4, subject: 'quan-tri-chien-luoc', difficulty: 4,
  skillsTrained: ['chien-luoc-canh-tranh', 'phan-tich-moi-truong', 'ma-tran-chien-luoc', 'quan-tri-chien-luoc'],
  questions: [
    {
      stem: 'Mô hình 5 lực lượng cạnh tranh của Michael Porter bao gồm NGOẠI TRỪ:',
      choices: [
        'Nguy cơ từ đối thủ cạnh tranh tiềm năng (mới gia nhập)',
        'Quyền thương lượng của nhà cung cấp',
        'Năng lực lãnh đạo nội bộ của doanh nghiệp',
        'Nguy cơ từ sản phẩm/dịch vụ thay thế',
      ],
      answer: 2,
      explanation: 'Mô hình 5 lực Porter (1979) gồm: (1) Cạnh tranh trong ngành, (2) Đe dọa từ người mới gia nhập, (3) Quyền thương lượng của nhà cung cấp, (4) Quyền thương lượng của khách hàng, (5) Đe dọa từ sản phẩm thay thế. Năng lực lãnh đạo nội bộ là yếu tố bên trong, không phải lực lượng cạnh tranh bên ngoài theo mô hình này. Mô hình 5 lực giúp đánh giá sức hấp dẫn của ngành và xác định vị thế cạnh tranh.',
    },
    {
      stem: 'Phân tích SWOT kết hợp chiến lược "SO" (Strengths-Opportunities) hướng đến:',
      choices: [
        'Dùng điểm mạnh để khai thác cơ hội bên ngoài',
        'Giảm thiểu điểm yếu bằng cách né tránh thách thức',
        'Dùng điểm mạnh để đối phó với thách thức',
        'Khắc phục điểm yếu để khai thác cơ hội',
      ],
      answer: 0,
      explanation: 'Ma trận SWOT tạo ra 4 chiến lược tổ hợp: SO (Strengths × Opportunities) — tận dụng điểm mạnh để khai thác cơ hội (chiến lược tấn công); WO (Weaknesses × Opportunities) — khắc phục điểm yếu để nắm cơ hội; ST (Strengths × Threats) — dùng điểm mạnh né tránh/đối phó rủi ro; WT (Weaknesses × Threats) — phòng thủ, giảm thiểu tổn thất. Chiến lược SO thường là chiến lược tăng trưởng tích cực nhất.',
    },
    {
      stem: 'Theo Porter, "Chi phí thấp toàn ngành" (Cost Leadership) là chiến lược cạnh tranh tổng quát mà doanh nghiệp:',
      choices: [
        'Cắt giảm tất cả chi phí kể cả chất lượng sản phẩm',
        'Là nhà sản xuất có chi phí thấp nhất trong ngành, bán với giá thấp hoặc thu lợi nhuận cao hơn',
        'Chỉ phục vụ một phân khúc khách hàng với chi phí thấp',
        'Liên minh với đối thủ để cùng giảm chi phí',
      ],
      answer: 1,
      explanation: 'Cost Leadership (Chiến lược dẫn đầu chi phí) của Porter: doanh nghiệp đạt cấu trúc chi phí thấp nhất toàn ngành nhờ quy mô kinh tế, công nghệ, quy trình hiệu quả. Điều này cho phép hoặc bán giá thấp nhất (chiếm thị phần) hoặc bán giá thị trường nhưng biên lợi nhuận cao hơn đối thủ. Đây khác với Focus Cost (tập trung chi phí) chỉ nhắm một phân khúc hẹp.',
    },
    {
      stem: 'Trong ma trận BCG, ô "Cash Cow" (Bò sữa) đặc trưng bởi:',
      choices: [
        'Thị phần thấp, tăng trưởng thị trường cao',
        'Thị phần cao, tăng trưởng thị trường cao',
        'Thị phần cao, tăng trưởng thị trường thấp',
        'Thị phần thấp, tăng trưởng thị trường thấp',
      ],
      answer: 2,
      explanation: 'Ma trận BCG (Boston Consulting Group) phân loại danh mục sản phẩm/SBU theo 2 chiều: thị phần tương đối và tốc độ tăng trưởng thị trường. Cash Cow: thị phần CAO, tăng trưởng THẤP — sinh ra dòng tiền lớn, ít cần đầu tư. Star: thị phần cao, tăng trưởng cao — tiềm năng nhưng cần nhiều vốn. Question Mark: thị phần thấp, tăng trưởng cao — cần quyết định đầu tư hay rút. Dog: thị phần thấp, tăng trưởng thấp — thường nên thoái vốn.',
    },
    {
      stem: 'Chiến lược "Đại dương xanh" (Blue Ocean Strategy) khác với cạnh tranh thông thường ở chỗ:',
      choices: [
        'Tập trung cạnh tranh khốc liệt để giành thị phần trong ngành hiện tại',
        'Tạo ra không gian thị trường mới, chưa có đối thủ, kết hợp đổi mới giá trị',
        'Giảm giá tối đa để loại bỏ tất cả đối thủ',
        'Hợp nhất với đối thủ cạnh tranh lớn nhất',
      ],
      answer: 1,
      explanation: 'Blue Ocean Strategy (Kim & Mauborgne, 2004): thay vì cạnh tranh trong "đại dương đỏ" (red ocean — ngành hiện tại đã bão hòa, đối thủ cạnh tranh khốc liệt làm "nước đỏ máu"), doanh nghiệp tạo ra "đại dương xanh" — không gian thị trường mới hoàn toàn bằng cách tái định nghĩa biên giới ngành. Công cụ chính: Errc Grid (Eliminate-Reduce-Raise-Create) và Value Innovation (đổi mới giá trị — giảm chi phí đồng thời tăng giá trị cho khách hàng).',
    },
    {
      stem: 'Chiến lược tích hợp dọc ngược (Backward Vertical Integration) là khi doanh nghiệp:',
      choices: [
        'Mua lại hoặc kiểm soát nhà phân phối/bán lẻ ở phía sau chuỗi giá trị',
        'Mua lại hoặc kiểm soát nhà cung cấp nguyên liệu đầu vào ở phía trước chuỗi giá trị',
        'Mở rộng sang ngành hoàn toàn khác không liên quan',
        'Nhượng quyền thương hiệu cho đối tác',
      ],
      answer: 1,
      explanation: 'Tích hợp dọc có 2 hướng: Forward Integration (tích hợp xuôi/về phía trước) — kiểm soát phân phối, bán lẻ, khách hàng; Backward Integration (tích hợp ngược/về phía sau) — kiểm soát nhà cung cấp, nguồn nguyên liệu. Ví dụ: hãng bia tự trồng malt đại mạch = backward integration. Lợi ích: giảm phụ thuộc nhà cung cấp, kiểm soát chất lượng đầu vào, giảm chi phí. Rủi ro: cần đầu tư lớn, giảm linh hoạt.',
    },
    {
      stem: 'Phân tích chuỗi giá trị (Value Chain Analysis) của Porter nhằm mục đích:',
      choices: [
        'Xác định giá trị cổ phiếu của doanh nghiệp',
        'Phân tích từng hoạt động nội bộ để tìm nguồn tạo ra lợi thế cạnh tranh',
        'Đánh giá giá trị thị trường của toàn ngành',
        'Tính toán giá trị hiện tại ròng của các dự án đầu tư',
      ],
      answer: 1,
      explanation: 'Value Chain (Chuỗi giá trị) phân tích các hoạt động nội bộ thành Hoạt động chính (Primary: vận hành đầu vào, sản xuất, logistics đầu ra, marketing & bán hàng, dịch vụ sau bán) và Hoạt động hỗ trợ (Support: cơ sở hạ tầng, quản lý nhân sự, phát triển công nghệ, mua hàng). Mỗi hoạt động tạo ra "giá trị gia tăng" hoặc "chi phí". Phân tích này giúp tìm nguồn lợi thế cạnh tranh bền vững (điểm mạnh khó sao chép).',
    },
    {
      stem: 'Balanced Scorecard (BSC) của Kaplan & Norton đo lường hiệu quả chiến lược qua 4 góc nhìn. Góc nhìn NÀO không thuộc BSC?',
      choices: [
        'Tài chính (Financial)',
        'Khách hàng (Customer)',
        'Cạnh tranh ngành (Competitive)',
        'Học hỏi & phát triển nội bộ (Learning & Growth)',
      ],
      answer: 2,
      explanation: 'Balanced Scorecard (1992) đo lường chiến lược qua 4 góc nhìn cân bằng: (1) Financial — lợi nhuận, ROI, dòng tiền; (2) Customer — sự hài lòng, thị phần, giữ chân khách hàng; (3) Internal Business Processes — quy trình nội bộ, chất lượng, thời gian chu kỳ; (4) Learning & Growth — năng lực nhân sự, CNTT, văn hóa tổ chức. BSC giúp chuyển hóa chiến lược thành mục tiêu đo lường cụ thể, kết nối ngắn hạn và dài hạn.',
    },
    {
      stem: 'Trong chiến lược M&A (Merger & Acquisition), "synergy" (sức cộng hưởng) có nghĩa là:',
      choices: [
        'Chi phí thực hiện thương vụ mua lại',
        'Giá trị kết hợp của hai công ty lớn hơn tổng giá trị từng công ty riêng lẻ (2+2=5)',
        'Mức độ kiểm soát của cổ đông lớn sau sáp nhập',
        'Thời gian cần thiết để hoàn tất thủ tục pháp lý',
      ],
      answer: 1,
      explanation: 'Synergy là lý do kinh tế chính của M&A: giá trị tạo ra từ hai công ty hợp nhất > tổng giá trị từng công ty độc lập. Synergy có 2 loại: (1) Operating synergy — tiết kiệm chi phí từ quy mô, chia sẻ nguồn lực, loại bỏ trùng lắp; tăng doanh thu từ cross-selling, thị trường mới; (2) Financial synergy — tiếp cận vốn rẻ hơn, lá chắn thuế từ lãi vay. Thách thức: thực tế nhiều M&A thất bại vì overestimate synergy và underestimate integration costs.',
    },
    {
      stem: 'Chiến lược "Thâm nhập thị trường" (Market Penetration) trong ma trận Ansoff là:',
      choices: [
        'Bán sản phẩm mới cho thị trường hiện tại',
        'Bán sản phẩm hiện tại cho thị trường mới',
        'Tăng doanh số sản phẩm hiện tại tại thị trường hiện tại',
        'Phát triển đồng thời sản phẩm mới và thị trường mới',
      ],
      answer: 2,
      explanation: 'Ma trận Ansoff (1957) phân loại chiến lược tăng trưởng theo 2 chiều sản phẩm/thị trường: (1) Market Penetration (thâm nhập thị trường) — sản phẩm hiện có × thị trường hiện có: tăng thị phần bằng cách tăng tần suất mua, khuyến mãi, giảm giá; (2) Market Development (phát triển thị trường) — sản phẩm hiện có × thị trường mới; (3) Product Development — sản phẩm mới × thị trường hiện có; (4) Diversification — sản phẩm mới × thị trường mới (rủi ro cao nhất).',
    },
  ],
};

// ─── E4.2 · Khởi nghiệp – Lean canvas ───────────────────────
export const E42_QUIZ = {
  id: 'E4.2-entrepreneurship-quiz',
  title: 'E4.2 · Khởi nghiệp – Lean Canvas & Startup Methodology',
  kind: 'quiz',
  yearLevel: 4, subject: 'khoi-nghiep', difficulty: 4,
  skillsTrained: ['lean-startup', 'business-model', 'product-market-fit', 'khoi-nghiep'],
  questions: [
    {
      stem: 'Lean Canvas (Ash Maurya) cải tiến Business Model Canvas (Osterwalder) bằng cách thay thế ô "Key Partners" bằng:',
      choices: [
        'Revenue Streams (Dòng doanh thu)',
        'Problem (Vấn đề cần giải quyết)',
        'Customer Segments (Phân khúc khách hàng)',
        'Key Resources (Nguồn lực chính)',
      ],
      answer: 1,
      explanation: 'Lean Canvas (2010) được thiết kế riêng cho startup early-stage, thay 4 ô của BMC thành: Problem (vấn đề khách hàng gặp phải — cốt lõi của startup), Solution (giải pháp đề xuất), Key Metrics (chỉ số đo lường chính), Unfair Advantage (lợi thế không thể sao chép). Ash Maurya lập luận rằng startup chưa có đủ key partners nên Problem quan trọng hơn. Canvas gồm 9 ô: Problem, Solution, Key Metrics, Unique Value Proposition, Unfair Advantage, Channels, Customer Segments, Cost Structure, Revenue Streams.',
    },
    {
      stem: 'Theo phương pháp Lean Startup của Eric Ries, vòng lặp cốt lõi là:',
      choices: [
        'Plan → Execute → Review',
        'Build → Measure → Learn',
        'Ideate → Prototype → Test → Launch',
        'Research → Design → Develop → Deploy',
      ],
      answer: 1,
      explanation: 'Build-Measure-Learn (BML) là vòng lặp cốt lõi của Lean Startup (Eric Ries, 2011): Build — xây dựng MVP (Minimum Viable Product) nhanh nhất có thể để kiểm định giả định; Measure — đo lường phản hồi thực từ khách hàng bằng actionable metrics; Learn — rút ra bài học và quyết định pivot (thay đổi hướng) hay persevere (tiếp tục). Mục tiêu: giảm thiểu thời gian và nguồn lực lãng phí bằng cách học từ thị trường sớm nhất có thể.',
    },
    {
      stem: '"Product-Market Fit" (PMF) được đạt khi:',
      choices: [
        'Sản phẩm hoàn thiện 100% tất cả tính năng theo kế hoạch',
        'Sản phẩm đáp ứng đúng nhu cầu của thị trường mục tiêu và khách hàng chủ động quay lại',
        'Công ty đạt 1 triệu người dùng đăng ký',
        'Sản phẩm được đội ngũ nội bộ chấp thuận',
      ],
      answer: 1,
      explanation: 'Product-Market Fit (Marc Andreessen) là khoảnh khắc startup tìm được sản phẩm phù hợp đúng nhu cầu thị trường: khách hàng thực sự muốn sản phẩm (pull), chứ không phải công ty phải đẩy (push). Dấu hiệu PMF: retention rate cao, NPS ≥ 50, khách hàng giới thiệu tự nguyện (viral), khó đáp ứng đủ cầu. Sean Ellis Test: "Nếu sản phẩm biến mất, bạn cảm thấy thất vọng như thế nào?" → ≥40% trả lời "Rất thất vọng" = đạt PMF. PMF là điều kiện tiên quyết trước khi scale.',
    },
    {
      stem: 'Chiến lược "Pivot" trong Lean Startup có nghĩa là:',
      choices: [
        'Đóng cửa công ty và khởi nghiệp lại từ đầu',
        'Thay đổi có cấu trúc về giả định chiến lược dựa trên dữ liệu học được',
        'Mở rộng sang thị trường quốc tế',
        'Tăng vốn đầu tư để tăng tốc tăng trưởng',
      ],
      answer: 1,
      explanation: 'Pivot không phải bỏ cuộc mà là thay đổi có mục đích một hoặc nhiều yếu tố của mô hình kinh doanh dựa trên bằng chứng từ thực tế. Eric Ries định nghĩa nhiều loại pivot: Customer Segment Pivot (đổi phân khúc khách hàng), Problem Pivot (đổi vấn đề giải quyết), Revenue Model Pivot, Technology Pivot, Channel Pivot... Ví dụ nổi tiếng: Instagram bắt đầu là Burbn (app check-in), pivot sang chia sẻ ảnh. Slack ban đầu là game Glitch, pivot sang công cụ giao tiếp nội bộ.',
    },
    {
      stem: 'Vốn đầu tư mạo hiểm (Venture Capital — VC) khác với vay ngân hàng ở điểm quan trọng nhất:',
      choices: [
        'VC tính lãi suất cao hơn ngân hàng',
        'VC đổi vốn lấy cổ phần và không đòi hoàn trả cố định; chấp nhận rủi ro cao để đổi lấy lợi nhuận cao',
        'VC chỉ đầu tư vào công ty đã có lợi nhuận',
        'VC yêu cầu tài sản thế chấp như ngân hàng',
      ],
      answer: 1,
      explanation: 'Venture Capital là hình thức tài chính equity (vốn cổ phần): VC đầu tư tiền lấy cổ phần (equity) của startup, không đòi trả nợ. VC chấp nhận xác suất thất bại cao (thường 90% danh mục) nhưng kỳ vọng 1-2 "unicorn" (định giá >$1B) bù đắp tất cả. Ngân hàng cần tài sản thế chấp và dòng tiền ổn định để trả nợ — không phù hợp với startup early-stage chưa có doanh thu. Các vòng gọi vốn: Pre-seed → Seed → Series A/B/C → IPO.',
    },
    {
      stem: '"Unfair Advantage" trong Lean Canvas là:',
      choices: [
        'Ưu đãi thuế từ chính phủ cho startup công nghệ',
        'Điều gì đó không thể dễ dàng mua hoặc sao chép bởi đối thủ',
        'Chi phí thấp hơn đối thủ nhờ sản xuất quy mô lớn',
        'Số lượng nhà đầu tư chiến lược hỗ trợ startup',
      ],
      answer: 1,
      explanation: 'Unfair Advantage (Jason Cohen) là nguồn lực hoặc lợi thế thực sự bảo vệ startup trước sự sao chép: insider information (kiến thức độc quyền), dream team (đội ngũ đặc biệt khó tái tạo), personal authority (chuyên gia đầu ngành), community (cộng đồng trung thành), existing customers (mạng lưới khách hàng), SEO (domain authority), network effects (giá trị tăng theo số người dùng). Không phải: "chúng tôi có passion" hay "chúng tôi chăm chỉ hơn" — những thứ này dễ sao chép.',
    },
    {
      stem: 'Mô hình doanh thu "Freemium" hoạt động theo nguyên lý:',
      choices: [
        'Sản phẩm hoàn toàn miễn phí, doanh thu từ quảng cáo',
        'Dịch vụ cơ bản miễn phí, tính phí các tính năng cao cấp',
        'Dùng thử miễn phí 30 ngày, sau đó bắt buộc trả phí',
        'Miễn phí cho sinh viên, tính phí doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Freemium (Free + Premium) = cung cấp giá trị cốt lõi MIỄN PHÍ để thu hút người dùng số lượng lớn, sau đó chuyển đổi một tỷ lệ nhỏ lên gói trả phí với tính năng nâng cao. Ví dụ: Spotify (nghe nhạc miễn phí có quảng cáo vs. Premium không quảng cáo + download), Slack (free tier giới hạn tin nhắn vs. paid), Dropbox (2GB free vs. paid storage). Tỷ lệ chuyển đổi freemium thường 2-5%. Bẫy: nếu gói free quá tốt, không ai trả tiền; nếu gói free quá tệ, không ai dùng.',
    },
    {
      stem: 'Chỉ số "Burn Rate" trong startup thể hiện:',
      choices: [
        'Tỷ lệ tăng trưởng doanh thu hàng tháng',
        'Tốc độ công ty tiêu tốn tiền mặt (net cash burn) mỗi tháng khi chưa có lợi nhuận',
        'Số lượng nhân viên rời công ty mỗi tháng',
        'Chi phí thu hút 1 khách hàng mới',
      ],
      answer: 1,
      explanation: 'Burn Rate (tốc độ "đốt tiền") = số tiền công ty tiêu mỗi tháng. Gross burn rate = tổng chi phí; Net burn rate = chi phí - doanh thu (thực tế hơn). Runway = Cash / Net Burn Rate = số tháng còn lại trước khi hết tiền. Ví dụ: có $1M vốn, burn rate $100K/tháng → runway 10 tháng. Cần gọi vốn mới trước khi hết runway 3-6 tháng. Burn rate quá cao → cạn vốn; quá thấp → tăng trưởng chậm. Chỉ số này quan trọng với nhà đầu tư để đánh giá mức độ an toàn tài chính của startup.',
    },
    {
      stem: 'Customer Discovery (Khám phá khách hàng) theo Steve Blank yêu cầu founders phải:',
      choices: [
        'Thuê công ty tư vấn thực hiện nghiên cứu thị trường',
        'Ra ngoài nói chuyện trực tiếp với khách hàng tiềm năng để kiểm định giả định',
        'Phân tích dữ liệu thứ cấp từ báo cáo thị trường',
        'Tung sản phẩm ra thị trường và chờ phản hồi',
      ],
      answer: 1,
      explanation: 'Steve Blank (The Startup Owner\'s Manual): "Get out of the building" — founders phải trực tiếp phỏng vấn khách hàng tiềm năng, không ngồi trong văn phòng phỏng đoán. Customer Discovery gồm 4 bước: (1) State hypotheses — đặt ra giả định về vấn đề và giải pháp; (2) Test the problem — phỏng vấn để xác nhận vấn đề có thực không; (3) Test the solution — trình bày MVP, kiểm định giải pháp; (4) Verify — xác nhận đủ khách hàng sẵn sàng trả tiền. Sai lầm thường gặp: hỏi "bạn có thích sản phẩm này không?" thay vì hỏi về hành vi thực tế trong quá khứ.',
    },
    {
      stem: 'Net Promoter Score (NPS) đo lường điều gì và cách tính ra sao?',
      choices: [
        'Doanh thu thuần trên mỗi khách hàng; NPS = Doanh thu / Số khách hàng',
        'Mức độ khách hàng sẵn sàng giới thiệu sản phẩm; NPS = %Promoters (9-10) − %Detractors (0-6)',
        'Tỷ lệ khách hàng hài lòng; NPS = số đánh giá 5 sao / tổng đánh giá',
        'Chi phí giữ chân 1 khách hàng; NPS = Chi phí retention / số khách hàng',
      ],
      answer: 1,
      explanation: 'NPS (Fred Reichheld, 2003): hỏi "Trên thang 0-10, bạn sẵn sàng giới thiệu chúng tôi cho bạn bè/đồng nghiệp ở mức nào?" → Promoters (9-10): trung thành, chủ động giới thiệu; Passives (7-8): hài lòng nhưng thụ động; Detractors (0-6): không hài lòng, có thể nói xấu. NPS = %Promoters − %Detractors (range: -100 đến +100). NPS > 50 = xuất sắc, > 70 = đẳng cấp thế giới. Hạn chế: NPS chỉ đo ý định, không đo hành vi thực; cần kết hợp với chỉ số retention và revenue.',
    },
  ],
};
