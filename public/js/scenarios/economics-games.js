// ============================================================
// Trường Kinh tế — Game Scenarios (EG01–EG03)
// ============================================================
// Quiz nhanh dạng game: Bull vs Bear (TTCK), Pitch Battle (Startup),
// Tycoon (Quản lý công ty). Mỗi game 10 câu, có explanation.
// ============================================================

// ─── EG01 · Bull vs Bear — Stock Race ─────────────────────
export const EG01_QUIZ = {
  id: 'EG01-bull-bear-quiz',
  title: 'EG01 · Bull vs Bear — Stock Race',
  kind: 'quiz',
  subject: 'game', difficulty: 1,
  skillsTrained: ['stock-market', 'trading', 'financial-analysis'],
  questions: [
    {
      stem: '"Bull market" và "Bear market" khác nhau thế nào?',
      choices: [
        'Bull: lãi suất cao, Bear: lãi suất thấp',
        'Bull: thị trường tăng trưởng (xu hướng lên ≥ 20%), Bear: thị trường suy giảm (xu hướng xuống ≥ 20%)',
        'Bull: cổ phiếu bluechip, Bear: cổ phiếu penny',
        'Bull: thị trường Mỹ, Bear: thị trường Châu Á',
      ],
      answer: 1,
      explanation: 'Bull market = xu hướng tăng giá dài hạn (thường ≥ 20% từ đáy). Bear market = xu hướng giảm giá dài hạn (≥ 20% từ đỉnh). Các nhà đầu tư "bò" (bull) lạc quan — đẩy giá lên; "gấu" (bear) bi quan — bán tháo. Ở Việt Nam, giai đoạn 2020-2021 là bull market điển hình (VN-Index từ 650 → 1500 điểm).',
    },
    {
      stem: 'Chỉ số P/E (Price-to-Earnings Ratio) thể hiện điều gì?',
      choices: [
        'Tỷ lệ % cổ tức trên giá cổ phiếu',
        'Số năm nhà đầu tư chờ thu hồi vốn qua EPS — giá/lợi nhuận mỗi cổ phần',
        'Tổng doanh thu chia cho số cổ phiếu lưu hành',
        'Tỷ lệ nợ trên vốn chủ sở hữu',
      ],
      answer: 1,
      explanation: 'P/E = Giá cổ phiếu / EPS (Earnings Per Share). P/E = 20 nghĩa là nhà đầu tư trả 20 đồng cho mỗi 1 đồng lợi nhuận, tức chờ ~20 năm thu hồi vốn (nếu EPS không đổi). P/E cao → kỳ vọng tăng trưởng cao hoặc định giá đắt. P/E thấp → định giá rẻ hoặc tăng trưởng thấp/rủi ro cao. So sánh P/E trong cùng ngành để có ý nghĩa.',
    },
    {
      stem: 'Market Capitalization (vốn hóa thị trường) của một công ty được tính bằng?',
      choices: [
        'Doanh thu × P/E ratio',
        'Giá cổ phiếu × Số cổ phiếu đang lưu hành',
        'Tổng tài sản − Tổng nợ',
        'EBITDA × 10',
      ],
      answer: 1,
      explanation: 'Market Cap = Giá cổ phiếu hiện tại × Tổng số cổ phiếu lưu hành (shares outstanding). Đây là giá trị thị trường tổng thể của doanh nghiệp. Phân loại: Large-cap (> 10 tỷ USD), Mid-cap (2–10 tỷ), Small-cap (< 2 tỷ). Market cap ≠ giá trị sổ sách và có thể thay đổi hàng giây theo biến động giá cổ phiếu.',
    },
    {
      stem: 'Lệnh "Stop-Loss" trong giao dịch chứng khoán có chức năng gì?',
      choices: [
        'Tự động mua thêm khi giá xuống để bình quân hóa giá mua',
        'Tự động bán khi giá chạm mức thua lỗ tối đa — hạn chế thiệt hại',
        'Khóa lệnh mua trong 24 giờ để tránh mua bán cảm tính',
        'Giới hạn số lệnh giao dịch trong ngày',
      ],
      answer: 1,
      explanation: 'Stop-Loss là lệnh tự động bán khi giá cổ phiếu giảm đến mức đã đặt trước, giúp nhà đầu tư giới hạn khoản lỗ tối đa. Ví dụ: mua cổ phiếu A ở 50.000 VND, đặt stop-loss ở 45.000 VND → tự động bán nếu giá xuống 45.000, chấp nhận lỗ tối đa 10%. Ngược lại, Take-Profit tự động chốt lời khi giá tăng đến mức mục tiêu.',
    },
    {
      stem: 'EPS (Earnings Per Share) được tính như thế nào?',
      choices: [
        'Doanh thu thuần / Số cổ phiếu lưu hành',
        'Lợi nhuận ròng / Số cổ phiếu lưu hành bình quân',
        'EBIT / Số cổ phiếu phát hành',
        'Dòng tiền tự do / Tổng vốn hóa',
      ],
      answer: 1,
      explanation: 'EPS = Lợi nhuận sau thuế (Net Income) / Số cổ phiếu lưu hành bình quân trong kỳ. EPS là chỉ tiêu đo lường khả năng sinh lời trên mỗi cổ phiếu. Diluted EPS còn tính thêm cổ phiếu tiềm năng (trái phiếu chuyển đổi, quyền chọn). EPS tăng dần qua các năm là tín hiệu tích cực. Tuy nhiên EPS có thể bị điều chỉnh (earnings manipulation) — cần xem xét cùng dòng tiền.',
    },
    {
      stem: 'Phương pháp "Dollar-Cost Averaging (DCA)" là gì?',
      choices: [
        'Đầu tư toàn bộ vốn một lần khi thị trường ở đáy',
        'Mua đều đặn một lượng cố định theo định kỳ bất kể giá lên hay xuống — phân tán rủi ro thời điểm',
        'Mua cổ phiếu giá thấp, bán khi tăng 10% — lặp lại nhiều lần',
        'Đa dạng hóa danh mục theo công thức 60% cổ phiếu, 40% trái phiếu',
      ],
      answer: 1,
      explanation: 'DCA = mua một lượng tiền cố định (ví dụ 5 triệu/tháng) bất kể giá hiện tại. Khi giá thấp → mua được nhiều đơn vị hơn; khi giá cao → mua ít hơn. Kết quả: giá trung bình mua vào thường thấp hơn giá trung bình đơn giản. DCA loại bỏ áp lực "timing the market" — phù hợp nhà đầu tư dài hạn với thu nhập đều đặn.',
    },
    {
      stem: 'Chỉ số ROE (Return on Equity) phản ánh điều gì?',
      choices: [
        'Tỷ suất lợi nhuận trên tổng tài sản',
        'Khả năng sinh lời trên vốn chủ sở hữu — lợi nhuận ròng / vốn CSH',
        'Tỷ lệ trả cổ tức cho cổ đông',
        'Mức độ đòn bẩy tài chính so với ngành',
      ],
      answer: 1,
      explanation: 'ROE = Lợi nhuận ròng / Vốn chủ sở hữu bình quân. ROE = 20% nghĩa là cứ 100 đồng vốn CSH tạo ra 20 đồng lợi nhuận. ROE cao và bền vững qua nhiều năm là dấu hiệu doanh nghiệp tốt (Warren Buffett thường tìm ROE > 15% kéo dài). Chú ý: ROE có thể bị thổi phồng bởi đòn bẩy cao (vay nợ nhiều giảm mẫu số). Công thức DuPont phân tách ROE = Margin × Asset Turnover × Leverage.',
    },
    {
      stem: 'Trong phân tích kỹ thuật, "Resistance Level" (ngưỡng kháng cự) là gì?',
      choices: [
        'Mức giá mà tại đó lực mua mạnh hơn lực bán — giá khó giảm xuống dưới',
        'Mức giá mà tại đó lực bán áp đảo lực mua — giá khó tăng vượt qua',
        'Mức P/E trung bình ngành — giá không nên vượt quá',
        'Đường trung bình động 200 ngày của giá cổ phiếu',
      ],
      answer: 1,
      explanation: 'Resistance (kháng cự) là vùng giá mà nhiều người bán sẵn sàng chốt lời hoặc short → áp lực bán vượt áp lực mua → giá "bị đẩy xuống" khi chạm mức này. Ngược lại, Support (hỗ trợ) là vùng giá mà nhiều người mua vào → giá "bật lên". Breakout (vượt kháng cự với volume lớn) thường báo hiệu xu hướng mới. Resistance cũ khi bị phá thành Support mới (role reversal).',
    },
    {
      stem: 'Tại sao đa dạng hóa danh mục (portfolio diversification) làm giảm rủi ro?',
      choices: [
        'Vì khi một cổ phiếu tăng mạnh sẽ kéo cả danh mục tăng',
        'Vì rủi ro đặc thù (unsystematic risk) của từng tài sản bù trừ nhau — tổng rủi ro danh mục thấp hơn',
        'Vì cổ phiếu nhiều ngành không bao giờ cùng giảm',
        'Vì phí giao dịch thấp hơn khi mua nhiều loại cùng lúc',
      ],
      answer: 1,
      explanation: 'Rủi ro gồm 2 loại: Systematic risk (rủi ro thị trường — chiến tranh, khủng hoảng — không thể loại bỏ) và Unsystematic risk (rủi ro riêng lẻ của công ty/ngành — có thể giảm bằng đa dạng hóa). Khi cổ phiếu A giảm do lý do riêng (ban lãnh đạo sai phạm) nhưng cổ phiếu B tăng → bù trừ. Nghiên cứu Markowitz (MPT) cho thấy ~15–20 cổ phiếu không tương quan cao đủ để loại bỏ phần lớn unsystematic risk.',
    },
    {
      stem: 'IPO (Initial Public Offering) là sự kiện gì?',
      choices: [
        'Công ty mua lại cổ phiếu của chính mình từ thị trường',
        'Lần đầu tiên công ty bán cổ phiếu ra công chúng và niêm yết trên sàn chứng khoán',
        'Quỹ đầu tư phát hành chứng chỉ quỹ mới',
        'Ngân hàng trung ương bơm tiền qua thị trường chứng khoán',
      ],
      answer: 1,
      explanation: 'IPO = lần đầu công ty chuyển từ tư nhân sang công ty đại chúng bằng cách bán cổ phần cho nhà đầu tư rộng rãi và niêm yết trên sàn. Mục tiêu: huy động vốn, tăng tính thanh khoản, nâng cao uy tín. Quy trình: thuê underwriter (ngân hàng đầu tư), định giá (book building), roadshow, phát hành. Ở VN cần Ủy ban Chứng khoán Nhà nước (UBCKNN) phê duyệt. Sau IPO, giá có thể tăng vọt ("IPO pop") hoặc giảm nếu định giá quá cao.',
    },
  ],
};

// ─── EG02 · Pitch Battle — Demo Day ────────────────────────
export const EG02_QUIZ = {
  id: 'EG02-pitch-battle-quiz',
  title: 'EG02 · Pitch Battle — Demo Day',
  kind: 'quiz',
  subject: 'game', difficulty: 2,
  skillsTrained: ['entrepreneurship', 'fundraising', 'startup'],
  questions: [
    {
      stem: '"Elevator pitch" (pitch thang máy) có tiêu chí quan trọng nhất là gì?',
      choices: [
        'Dài ít nhất 10 phút để giải thích đầy đủ vấn đề',
        'Trình bày rõ vấn đề, giải pháp và lợi thế cạnh tranh trong 30–90 giây',
        'Bắt đầu bằng số liệu tài chính và kế hoạch exit',
        'Đặt câu hỏi ngược lại nhà đầu tư để tạo sự tương tác',
      ],
      answer: 1,
      explanation: 'Elevator pitch phải ngắn gọn như đi thang máy (30–90 giây) và trả lời: (1) Vấn đề là gì? (2) Giải pháp của bạn? (3) Tại sao bạn? (team + lợi thế). Công thức phổ biến: "Chúng tôi giúp [đối tượng khách hàng] giải quyết [vấn đề] bằng [giải pháp] khác với [đối thủ] ở [lợi thế độc đáo]." Không cần số liệu chi tiết — mục tiêu là tạo sự tò mò để có cuộc gặp dài hơn.',
    },
    {
      stem: 'Trong một term sheet VC (Venture Capital), "pre-money valuation" là gì?',
      choices: [
        'Định giá công ty SAU khi nhận vốn đầu tư mới',
        'Định giá công ty TRƯỚC khi nhận vốn đầu tư — cơ sở tính tỷ lệ sở hữu của VC',
        'Số tiền đã chi tiêu trước khi gọi vốn Series A',
        'Tổng doanh thu dự kiến trong năm đầu sau đầu tư',
      ],
      answer: 1,
      explanation: 'Pre-money valuation là giá trị công ty trước khi nhận tiền. Tỷ lệ sở hữu VC = Số tiền đầu tư / (Pre-money + Số tiền đầu tư). Ví dụ: pre-money = 10 tỷ, VC đầu tư 2 tỷ → post-money = 12 tỷ, VC sở hữu 2/12 ≈ 16.7%. Pre-money cao → founder bị pha loãng ít hơn. Trong thực tế, định giá phụ thuộc vào traction, team, thị trường và điều kiện đàm phán.',
    },
    {
      stem: 'Khái niệm "Traction" trong pitch startup thường chỉ điều gì?',
      choices: [
        'Tốc độ tăng trưởng kỹ thuật của sản phẩm (số tính năng mới/tháng)',
        'Bằng chứng thực tế về sự chấp nhận của thị trường — người dùng, doanh thu, tăng trưởng',
        'Số lượng nhà đầu tư angel đã quan tâm đến startup',
        'Chi phí thu hút khách hàng (CAC) so với ngành',
      ],
      answer: 1,
      explanation: 'Traction = kéo (như bánh xe bám đường) — bằng chứng startup đang "bám" được thị trường: số người dùng hoạt động, doanh thu tháng (MRR), tốc độ tăng trưởng (month-over-month), retention rate, NPS. Câu hỏi VC hay hỏi: "Show me your traction." Startup pre-revenue cần chứng minh bằng waitlist, LOI (Letter of Intent), pilot partnership. Traction là tín hiệu mạnh nhất thay thế cho assumptions.',
    },
    {
      stem: 'Giai đoạn "Seed Round" (vòng hạt giống) khác "Series A" ở điểm nào?',
      choices: [
        'Seed chỉ từ bạn bè/gia đình; Series A chỉ từ VC quốc tế',
        'Seed: vốn sớm để validate ý tưởng/MVP (thường < 2M USD); Series A: mở rộng với traction đã chứng minh (thường 5–15M USD)',
        'Seed do Nhà nước hỗ trợ; Series A từ thị trường tư nhân',
        'Seed cho B2C; Series A chỉ cho B2B SaaS',
      ],
      answer: 1,
      explanation: 'Seed: giai đoạn sơ khai — dùng để build MVP, tìm product-market fit, thực hiện pilot. Nhà đầu tư: angel, accelerator (Y Combinator, Shark Tank VN). Đổi lại: 10–20% equity. Series A: khi đã có traction rõ ràng, cần vốn để scale (marketing, tuyển dụng, mở rộng thị trường). Nhà đầu tư: VC fund. Quy trình: pitch deck → due diligence → term sheet → close. Sau đó là Series B (scale nhanh), C (chuẩn bị IPO hoặc M&A).',
    },
    {
      stem: '"Burn rate" và "Runway" của startup có nghĩa là gì?',
      choices: [
        'Burn rate: tốc độ tăng trưởng; Runway: thị trường mục tiêu',
        'Burn rate: số tiền mất mỗi tháng; Runway: số tháng tiền còn lại đủ vận hành',
        'Burn rate: tỷ lệ churn khách hàng; Runway: kế hoạch marketing',
        'Burn rate: chi phí server; Runway: tốc độ phát triển tính năng',
      ],
      answer: 1,
      explanation: 'Burn Rate = số tiền startup tiêu mỗi tháng (chi phí vượt doanh thu). Runway = Tiền trong bank / Burn Rate = số tháng startup có thể tồn tại. Ví dụ: có 6 tỷ VND, burn 500 triệu/tháng → runway 12 tháng. Quy tắc: nên gọi vốn khi còn 6 tháng runway, không đợi đến lúc "cạn tiền" vì process gọi vốn thường mất 3–6 tháng. Giảm burn rate bằng cách cắt chi phí không sinh lợi (đặc biệt marketing và thuê văn phòng).',
    },
    {
      stem: 'Chiến lược "Freemium" trong kinh doanh SaaS hoạt động như thế nào?',
      choices: [
        'Dùng thử miễn phí 14 ngày, sau đó tính phí bắt buộc',
        'Cung cấp sản phẩm cơ bản miễn phí mãi mãi; thu phí tính năng nâng cao/premium',
        'Miễn phí cho khách hàng đầu tiên, có phí từ khách hàng thứ 100',
        'Freemium = Free + Premium: miễn phí cho người dùng cá nhân, có phí cho doanh nghiệp',
      ],
      answer: 1,
      explanation: 'Freemium: free tier (miễn phí mãi, không giới hạn thời gian) kèm premium tier (trả phí có thêm tính năng). Mục tiêu: acquire khách hàng với chi phí thấp, sau đó convert một % sang trả phí. Conversion rate điển hình: 2–5%. Ví dụ thành công: Slack (miễn phí 10k tin nhắn), Spotify (miễn phí có quảng cáo), Dropbox (2GB miễn phí). Thách thức: free users tốn chi phí infra mà không sinh doanh thu — cần cân bằng giá trị free vs. premium.',
    },
    {
      stem: 'Chỉ số "LTV/CAC ratio" trong startup SaaS thể hiện điều gì và mức nào là tốt?',
      choices: [
        'Tỷ lệ khách hàng trả phí / tổng khách hàng; tốt khi > 50%',
        'Giá trị vòng đời khách hàng / Chi phí thu hút khách hàng; tốt khi LTV/CAC ≥ 3',
        'Doanh thu cuối năm / Chi phí marketing năm đó; tốt khi > 5',
        'Số khách hàng mới / Số khách hàng rời bỏ; tốt khi > 1',
      ],
      answer: 1,
      explanation: 'LTV (Lifetime Value) = tổng doanh thu từ 1 khách hàng trong suốt vòng đời (= ARPU × 1/Churn Rate). CAC (Customer Acquisition Cost) = tổng chi phí marketing & sales / số khách hàng mới. LTV/CAC ≥ 3: doanh nghiệp khỏe mạnh — mỗi đồng thu hút khách thu về ít nhất 3 đồng. < 1: đốt tiền không hiệu quả. Payback period (thời gian hoàn vốn CAC) nên < 12 tháng. VC thường đánh giá đây là một trong những chỉ số quan trọng nhất.',
    },
    {
      stem: 'Trong pitch, "Unfair Advantage" (lợi thế bất đối xứng) là gì?',
      choices: [
        'Sở hữu nhiều bằng sáng chế hơn đối thủ',
        'Thứ đối thủ KHÔNG THỂ dễ dàng sao chép hoặc mua — dữ liệu độc quyền, network effect, IP, đội ngũ sáng lập đặc biệt',
        'Có vốn đầu tư lớn hơn đối thủ cùng giai đoạn',
        'Đi vào thị trường trước đối thủ ít nhất 2 năm',
      ],
      answer: 1,
      explanation: 'Unfair advantage là điều độc đáo mà bạn có và đối thủ không thể copy nhanh: (1) Insider information/data độc quyền — ví dụ dữ liệu lâm sàng 5 năm; (2) Dream team — người sáng lập có background duy nhất cho bài toán này; (3) Network effects — mạng lưới người dùng càng nhiều càng giá trị (Zalo, Grab); (4) Regulatory license độc quyền; (5) Personal authority/community. VC lo nhất câu "Nếu có $10M, Google/Facebook có copy được không?" — Unfair Advantage là câu trả lời.',
    },
    {
      stem: 'Accelerator và Incubator khác nhau thế nào?',
      choices: [
        'Accelerator cho CNTT; Incubator cho biotech và deeptech',
        'Accelerator: chương trình ngắn (3–6 tháng) tăng tốc startup đã có MVP; Incubator: hỗ trợ dài hạn từ giai đoạn ý tưởng',
        'Accelerator lấy % equity; Incubator hoàn toàn miễn phí',
        'Accelerator của VC tư nhân; Incubator luôn thuộc trường đại học',
      ],
      answer: 1,
      explanation: 'Accelerator (Y Combinator, Techstars): (1) Có cohort định kỳ, apply cạnh tranh; (2) Chương trình ngắn 3–6 tháng; (3) Nhận vốn nhỏ đổi 5–10% equity; (4) Kết thúc bằng Demo Day pitch cho hàng trăm VC. Phù hợp startup đã có MVP/traction nhỏ. Incubator (trường ĐH, KCN): (1) Thời gian dài 1–5 năm; (2) Hỗ trợ văn phòng, mentor, kết nối; (3) Ít cạnh tranh đầu vào hơn; (4) Không nhất thiết lấy equity. Phù hợp giai đoạn ideation/research. Ở VN: BSSC, Toong, ThinkZone là ví dụ.',
    },
    {
      stem: '"Pivot" trong startup có nghĩa là gì và khi nào nên pivot?',
      choices: [
        'Mở rộng sang thị trường quốc tế khi thị trường nội địa bão hòa',
        'Thay đổi chiến lược kinh doanh cốt lõi dựa trên học hỏi từ thị trường — khi giả thuyết ban đầu bị bác bỏ',
        'Thay đổi toàn bộ đội ngũ sáng lập để có hướng đi mới',
        'Chuyển từ B2C sang B2B khi không đủ vốn marketing',
      ],
      answer: 1,
      explanation: 'Pivot = xoay trục chiến lược cơ bản trong khi giữ nguyên những gì đang hoạt động. Theo Lean Startup (Eric Ries), pivot có nhiều dạng: (1) Customer segment pivot — cùng sản phẩm, khách hàng khác; (2) Value capture pivot — thay đổi mô hình doanh thu; (3) Technology pivot — cùng vấn đề, công nghệ khác. Nên pivot khi: traction gần bằng 0 sau nhiều iterations, team mất niềm tin vào hướng đi, data chỉ ra giả thuyết sai. Instagram ban đầu là Burbn (game check-in), pivot thành app ảnh → thành công.',
    },
  ],
};

// ─── EG03 · Tycoon — Quản lý công ty ───────────────────────
export const EG03_QUIZ = {
  id: 'EG03-tycoon-quiz',
  title: 'EG03 · Tycoon — Quản lý công ty',
  kind: 'quiz',
  subject: 'game', difficulty: 2,
  skillsTrained: ['management', 'operations', 'strategy'],
  questions: [
    {
      stem: 'Trong mô hình 5 lực cạnh tranh của Porter, "Bargaining Power of Suppliers" (sức mạnh nhà cung cấp) cao khi:',
      choices: [
        'Ngành có nhiều nhà cung cấp thay thế nhau dễ dàng',
        'Nhà cung cấp ít, có sản phẩm độc quyền hoặc chi phí chuyển đổi cao',
        'Sản phẩm của nhà cung cấp chiếm tỷ trọng nhỏ trong giá thành',
        'Ngành đang tăng trưởng nhanh giúp doanh nghiệp có nhiều lựa chọn',
      ],
      answer: 1,
      explanation: 'Sức mạnh nhà cung cấp cao khi: (1) Số nhà cung cấp ít (ít lựa chọn thay thế); (2) Sản phẩm độc quyền/không thể thay thế; (3) Chi phí chuyển đổi nhà cung cấp cao; (4) Nhà cung cấp có thể tích hợp dọc xuống (tự bán trực tiếp). Ví dụ: Intel cung cấp chip cho hầu hết laptop PC — sức mạnh cao. Hàng hóa (commodity) như sắt thép có nhiều nhà cung cấp → sức mạnh thấp. Chiến lược ứng phó: hợp đồng dài hạn, tìm nhà cung cấp thay thế, tích hợp dọc lên.',
    },
    {
      stem: 'Chỉ số "Operating Cash Flow" (dòng tiền hoạt động) quan trọng hơn "Net Income" như thế nào?',
      choices: [
        'OCF phản ánh lợi nhuận sau khi trừ thuế nên chính xác hơn',
        'OCF cho thấy tiền thực sự tạo ra từ hoạt động kinh doanh — khó bị điều chỉnh bởi accrual accounting',
        'Net Income tính thêm khấu hao nên thấp hơn OCF, ít dùng để phân tích',
        'OCF bao gồm cả hoạt động đầu tư nên toàn diện hơn',
      ],
      answer: 1,
      explanation: 'Net Income dễ bị "làm đẹp" qua kế toán dồn tích (accrual): ghi nhận doanh thu chưa thu tiền, hoãn chi phí, thay đổi chính sách khấu hao. OCF (dòng tiền từ hoạt động) phản ánh tiền mặt thực thu trong kỳ — khó giả mạo hơn vì tiền vào/ra ngân hàng. Doanh nghiệp có Net Income dương nhưng OCF âm → cảnh báo: bán hàng nhưng không thu được tiền (nợ tăng cao). "Cash is king" — OCF bền vững mới là dấu hiệu sức khỏe thực.',
    },
    {
      stem: 'Trong quản trị nhân sự, "Employee Net Promoter Score (eNPS)" đo lường điều gì?',
      choices: [
        'Tỷ lệ nhân viên giới thiệu khách hàng mới cho công ty',
        'Mức độ nhân viên sẵn lòng giới thiệu nơi làm việc cho người thân/bạn bè',
        'Năng suất làm việc trung bình so với KPI',
        'Tỷ lệ nhân viên hoàn thành đúng hạn OKR mỗi quý',
      ],
      answer: 1,
      explanation: 'eNPS hỏi nhân viên: "Trên thang 0–10, bạn có sẵn lòng giới thiệu công ty này làm nơi làm việc cho bạn bè/người thân không?" Promoters (9–10), Passives (7–8), Detractors (0–6). eNPS = % Promoters − % Detractors. eNPS > 50 = xuất sắc; 20–50 = tốt; < 0 = vấn đề. Khảo sát đơn giản, thực hiện nhanh. eNPS thấp thường tương quan với turnover cao và năng suất thấp. Cần theo dõi trend theo quý hơn là giá trị tuyệt đối một lần.',
    },
    {
      stem: 'Chiến lược "Cost Leadership" (chi phí thấp) theo Porter đòi hỏi gì?',
      choices: [
        'Tập trung vào 1 phân khúc khách hàng hẹp với nhu cầu đặc biệt',
        'Trở thành nhà sản xuất có chi phí thấp nhất ngành — nhờ quy mô, công nghệ, quy trình hiệu quả',
        'Liên tục cải tiến sản phẩm để khách hàng sẵn sàng trả giá cao hơn',
        'Hợp tác với đối thủ để cùng giảm chi phí logistics',
      ],
      answer: 1,
      explanation: 'Cost Leadership (1 trong 3 chiến lược cạnh tranh tổng quát của Porter): (1) Economies of scale — sản xuất nhiều → chi phí/đơn vị giảm; (2) Hiệu quả quy trình (lean production); (3) Công nghệ độc quyền giảm chi phí; (4) Tiếp cận nguồn nguyên liệu giá rẻ. Mục tiêu: lợi nhuận cao hơn cùng mức giá, hoặc đặt giá thấp hơn vẫn có lãi. Rủi ro: đối thủ mới có công nghệ giảm chi phí hơn; tập trung quá vào cost có thể bỏ qua differentiation. Ví dụ: Walmart, Ryanair, Vinamilk trong nước.',
    },
    {
      stem: 'KPI (Key Performance Indicator) và OKR (Objectives and Key Results) khác nhau thế nào?',
      choices: [
        'KPI dùng cho cấp quản lý, OKR dùng cho nhân viên thực thi',
        'KPI: đo lường hiệu suất hoạt động (thường là "health metrics"); OKR: mục tiêu đột phá kèm kết quả đo lường rõ ràng, thường ambitious hơn',
        'KPI đặt hàng năm, OKR đặt hàng tháng',
        'KPI là tiêu chuẩn ngành, OKR là chỉ tiêu nội bộ tùy chỉnh',
      ],
      answer: 1,
      explanation: 'KPI: chỉ số theo dõi sức khỏe hoạt động liên tục (tỷ lệ churn, NPS, doanh thu tháng). Thường có target ổn định và ít thay đổi. OKR: O = Objective (định tính, inspiring); KR = Key Results (định lượng, đo được). OKR ambitious — đạt 70% đã coi là thành công. OKR theo quý, align từ CEO → team → cá nhân. Google, Intel, Spotify dùng OKR để focus và align toàn tổ chức. Kết hợp tốt: OKR định hướng đột phá, KPI giữ nền tảng ổn định.',
    },
    {
      stem: 'Trong quản lý dự án, "Critical Path Method (CPM)" dùng để làm gì?',
      choices: [
        'Đánh giá rủi ro quan trọng nhất cần xử lý trước',
        'Xác định chuỗi nhiệm vụ dài nhất quyết định thời gian hoàn thành tối thiểu của dự án',
        'Phân bổ ngân sách theo độ ưu tiên của từng hạng mục',
        'Quản lý xung đột giữa các team thông qua ma trận trách nhiệm (RACI)',
      ],
      answer: 1,
      explanation: 'CPM xác định "đường găng" (critical path) — chuỗi các nhiệm vụ phụ thuộc nhau dài nhất; tổng thời gian đường này = thời gian hoàn thành dự án tối thiểu. Nhiệm vụ trên critical path: nếu trễ 1 ngày → dự án trễ 1 ngày (float = 0). Nhiệm vụ ngoài critical path có float (thời gian dự phòng). Quản lý dự án cần tập trung nguồn lực vào critical path. Kết hợp với PERT (Program Evaluation Review Technique) khi thời gian nhiệm vụ không chắc chắn.',
    },
    {
      stem: 'Phương pháp "Just-In-Time (JIT)" trong sản xuất mang lại lợi ích gì?',
      choices: [
        'Sản xuất hàng loạt trước để đáp ứng nhu cầu đột biến',
        'Nhận nguyên liệu và sản xuất đúng lúc cần — giảm tồn kho, giảm lãng phí',
        'Giao hàng trước hạn ít nhất 24 giờ để xây dựng uy tín',
        'Đặt mua nguyên liệu theo lô lớn để hưởng chiết khấu',
      ],
      answer: 1,
      explanation: 'JIT (Toyota Production System): nguyên liệu đến đúng lúc cần, số lượng vừa đủ → tồn kho gần bằng 0, giảm chi phí lưu kho, phát hiện lỗi sớm (không có buffer che giấu vấn đề). Lợi ích: giảm vốn lưu động, tăng chất lượng, linh hoạt. Rủi ro: dễ bị đứt gãy chuỗi cung ứng (như COVID-19 2020 → thiếu chip toàn cầu). JIT đòi hỏi nhà cung cấp đáng tin cậy và logistics chính xác cao. Kết hợp với kanban (thẻ báo hiệu sản xuất).',
    },
    {
      stem: '"Balanced Scorecard" (BSC) của Kaplan & Norton đánh giá doanh nghiệp từ mấy góc độ?',
      choices: [
        '3 góc: Tài chính, Khách hàng, Nội bộ',
        '4 góc: Tài chính, Khách hàng, Quy trình nội bộ, Học hỏi & Phát triển',
        '5 góc: Tài chính, Khách hàng, Nhân viên, Quy trình, Đổi mới',
        '2 góc: Tài chính (ngắn hạn) và Chiến lược (dài hạn)',
      ],
      answer: 1,
      explanation: 'BSC gồm 4 viễn cảnh liên kết nhân-quả: (1) Financial — "Cổ đông muốn gì?" (doanh thu, lợi nhuận, ROI); (2) Customer — "Khách hàng đánh giá thế nào?" (NPS, thị phần, retention); (3) Internal Process — "Quy trình nào tạo ra giá trị?" (cycle time, quality, innovation); (4) Learning & Growth — "Tổ chức học hỏi & phát triển?" (năng lực nhân viên, văn hóa, hệ thống IT). BSC chuyển chiến lược thành mục tiêu đo được, tránh chỉ nhìn vào tài chính ngắn hạn.',
    },
    {
      stem: '"SWOT Analysis" (phân tích SWOT) bao gồm những yếu tố nào?',
      choices: [
        'Sales, Workforce, Operations, Technology',
        'Strengths, Weaknesses, Opportunities, Threats — nội tại (S,W) và ngoại cảnh (O,T)',
        'Strategy, Working capital, Objectives, Tactics',
        'Supply chain, Workflow, Output, Timeline',
      ],
      answer: 1,
      explanation: 'SWOT: S (Strengths) = điểm mạnh nội tại; W (Weaknesses) = điểm yếu nội tại; O (Opportunities) = cơ hội từ môi trường; T (Threats) = thách thức từ môi trường. Sau khi lập SWOT, tạo ma trận SO-ST-WO-WT: SO = dùng điểm mạnh khai thác cơ hội; ST = dùng điểm mạnh đối phó thách thức; WO = khắc phục điểm yếu để nắm cơ hội; WT = giảm thiểu điểm yếu và tránh thách thức. SWOT đơn giản nhưng cần honest tự đánh giá — tránh "doping" điểm mạnh.',
    },
    {
      stem: 'Trong quản trị rủi ro, nguyên tắc "Pareto 80/20" áp dụng thế nào?',
      choices: [
        '80% ngân sách cần dành cho 20% dự án ưu tiên cao nhất',
        '20% nguyên nhân (rủi ro, khách hàng, sản phẩm) thường tạo ra 80% kết quả (thiệt hại, doanh thu, lợi nhuận)',
        '80% thời gian quản lý nên dành cho nhân viên có hiệu suất thấp',
        '20% khách hàng trả 80% giá trị cổ phiếu của công ty',
      ],
      answer: 1,
      explanation: 'Nguyên tắc Pareto (hay quy tắc 80/20): ~20% nguyên nhân tạo ra ~80% kết quả. Ứng dụng: (1) Rủi ro: 20% rủi ro gây 80% thiệt hại → tập trung xử lý 20% đó; (2) Khách hàng: 20% khách hàng đóng góp 80% doanh thu → VIP program; (3) Bug: 20% lỗi gây 80% sự cố → ưu tiên fix; (4) Sản phẩm: 20% tính năng được dùng 80% thời gian → không nên bloat. Trong quản trị thời gian: 20% hoạt động tạo 80% kết quả → loại bỏ/tự động hóa 80% còn lại.',
    },
  ],
};

// ─── Aggregator ─────────────────────────────────────────────
export const ECONOMICS_GAMES_SCENARIOS = {
  [EG01_QUIZ.id]: EG01_QUIZ,
  [EG02_QUIZ.id]: EG02_QUIZ,
  [EG03_QUIZ.id]: EG03_QUIZ,
};
