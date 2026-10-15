// ============================================================
// Lớp 12 · TIN HỌC (KNTT — định hướng Tin học ứng dụng ICT) — 35 tuần
// Lý thuyết tuần. Key trùng id quiz: "H12TIN-wNN-quiz".
// HK1 (1–18): AI, Mạng, Đạo đức số, HTML/CSS, Hướng nghiệp
// HK2 (19–35): Kết nối thiết bị + Dự án xây website hoàn chỉnh
// ============================================================

export const H12TIN_LESSONS = {
  'H12TIN-w01-quiz': {
    topic: 'Làm quen với Trí tuệ nhân tạo',
    intro: 'Chào các em! Trí tuệ nhân tạo (AI) đang hiện diện khắp nơi: trợ lý ảo, gợi ý video, dịch ngôn ngữ, ChatGPT… Tuần này chúng ta tìm hiểu AI là gì và các khái niệm nền tảng.',
    objectives: [
      'Hiểu khái niệm Trí tuệ nhân tạo (AI) và mục tiêu của nó.',
      'Phân biệt được Học máy (Machine Learning) và Học sâu (Deep Learning).',
      'Phân biệt AI hẹp (Narrow AI) và AI tổng quát (AGI).',
    ],
    theory: [
      { h: 'Trí tuệ nhân tạo (AI) là gì?' },
      { p: 'AI (Artificial Intelligence) là lĩnh vực của khoa học máy tính nhằm tạo ra máy móc, phần mềm có khả năng thực hiện những việc vốn cần đến trí tuệ con người: nhận dạng, suy luận, ra quyết định, hiểu ngôn ngữ.' },
      { h: 'Học máy và Học sâu' },
      { ul: [
        'Học máy (Machine Learning) là nhánh của AI: máy "học" quy luật từ dữ liệu thay vì được lập trình từng bước một cách tường minh.',
        'Học sâu (Deep Learning) là tập con của Học máy, dựa trên mạng nơ-ron nhân tạo nhiều lớp — rất mạnh với ảnh, âm thanh, ngôn ngữ.',
        'Quan hệ bao hàm: AI ⊃ Machine Learning ⊃ Deep Learning.',
      ] },
      { h: 'AI hẹp và AI tổng quát' },
      { p: 'AI hẹp (Narrow AI / ANI) chỉ giỏi một nhiệm vụ cụ thể (lọc thư rác, nhận diện khuôn mặt). Hầu hết AI hiện nay là AI hẹp.' },
      { p: 'AI tổng quát (AGI) là AI có khả năng linh hoạt như con người trong mọi lĩnh vực — đây vẫn là mục tiêu nghiên cứu, chưa đạt được.' },
      { note: 'Đừng nhầm: một chatbot trả lời được nhiều câu hỏi vẫn là AI hẹp, vì nó chỉ làm tốt việc xử lí ngôn ngữ, không phải "biết mọi thứ như người".' },
    ],
    examples: [
      { q: 'Sắp xếp 3 khái niệm AI, Deep Learning, Machine Learning theo quan hệ bao hàm.', a: 'AI là rộng nhất, chứa Machine Learning; Machine Learning chứa Deep Learning. Viết: AI ⊃ ML ⊃ DL.' },
      { q: 'Trợ lý ảo trên điện thoại thuộc loại AI nào? Vì sao?', a: 'AI hẹp (Narrow AI), vì nó chỉ chuyên xử lí giọng nói và một số tác vụ định sẵn, không tự làm được mọi việc như con người.' },
    ],
  },

  'H12TIN-w02-quiz': {
    topic: 'AI trong khoa học và đời sống',
    intro: 'Các em ơi, AI không chỉ là công nghệ "thời thượng" — nó đã giúp ích trong y tế, giáo dục, giao thông. Nhưng AI cũng có rủi ro. Tuần này ta học cách dùng AI có trách nhiệm và viết prompt tốt.',
    objectives: [
      'Nêu được ứng dụng của AI trong y tế, giáo dục, đời sống.',
      'Nhận biết hạn chế, rủi ro và đạo đức khi dùng AI.',
      'Biết cấu trúc một prompt tốt để làm việc với AI.',
    ],
    theory: [
      { h: 'AI giúp ích ở đâu?' },
      { ul: [
        'Y tế: hỗ trợ đọc ảnh X-quang/CT, phát hiện bệnh sớm, gợi ý phác đồ (AI hỗ trợ chứ không thay bác sĩ).',
        'Giáo dục: cá nhân hoá lộ trình học, chấm bài tự động, gia sư ảo, dịch ngôn ngữ.',
        'Đời sống: gợi ý nội dung, bản đồ chỉ đường, nhận dạng giọng nói, xe tự lái.',
      ] },
      { h: 'Rủi ro và đạo đức' },
      { ul: [
        'AI phụ thuộc dữ liệu — dữ liệu lệch sẽ cho kết quả thiên kiến (bias).',
        'AI có thể "bịa" thông tin sai mà nghe rất thuyết phục.',
        'Vấn đề quyền riêng tư, bản quyền, nguy cơ mất việc làm.',
      ] },
      { h: 'Viết prompt tốt' },
      { p: 'Prompt là câu lệnh/yêu cầu ta gửi cho AI. Một prompt tốt nên có: Vai trò + Ngữ cảnh + Yêu cầu cụ thể + Định dạng đầu ra.' },
      { note: 'Khi dùng AI để học: hãy kiểm chứng thông tin, không sao chép nguyên văn, dùng AI để hiểu bài chứ không làm hộ bài.' },
    ],
    examples: [
      { q: 'Viết một prompt tốt để nhờ AI tóm tắt một bài báo khoa học cho học sinh THPT.', a: '"Bạn là giáo viên Tin học. Hãy tóm tắt bài báo sau thành 5 ý chính, ngôn ngữ dễ hiểu cho học sinh lớp 12, trình bày dạng gạch đầu dòng." — có đủ Vai trò + Ngữ cảnh + Yêu cầu + Định dạng.' },
      { q: 'Vì sao không nên tin tuyệt đối câu trả lời của AI?', a: 'Vì AI học từ dữ liệu có thể sai/lệch và đôi khi "bịa" thông tin. Cần đối chiếu với nguồn tin cậy trước khi sử dụng.' },
    ],
  },

  'H12TIN-w03-quiz': {
    topic: 'Thiết bị mạng máy tính',
    intro: 'Chào các em! Để các máy "nói chuyện" được với nhau, ta cần thiết bị mạng: switch, router, access point… Tuần này ta tìm hiểu chức năng từng thiết bị.',
    objectives: [
      'Nhận biết chức năng của switch, router, hub, access point, modem.',
      'Biết switch và router làm việc ở tầng nào.',
      'Biết loại cáp mạng phổ biến cho mạng LAN.',
    ],
    theory: [
      { h: 'Các thiết bị chính' },
      { ul: [
        'Switch (bộ chuyển mạch): nối các máy trong mạng LAN, làm việc ở tầng 2, chuyển frame theo địa chỉ MAC, chỉ gửi tới đúng cổng đích.',
        'Router (bộ định tuyến): nối các mạng khác nhau, làm việc ở tầng 3, định tuyến gói tin theo địa chỉ IP.',
        'Hub: thiết bị cũ, phát quảng bá tín hiệu ra mọi cổng — kém hiệu quả, đã bị switch thay thế.',
        'Access Point (AP): phát Wi-Fi cho thiết bị không dây kết nối vào mạng.',
        'Modem: chuyển đổi tín hiệu số ↔ tương tự để kết nối với nhà cung cấp dịch vụ Internet.',
      ] },
      { h: 'Cáp mạng' },
      { p: 'Mạng LAN phổ biến dùng cáp xoắn đôi UTP (CAT5e, CAT6) với đầu cắm RJ45. Cáp quang dùng cho đường truyền tốc độ cao, khoảng cách lớn.' },
      { h: 'Mô hình OSI và tầng làm việc' },
      { ul: [
        'Tầng 1 (vật lí): cáp, tín hiệu — hub làm việc ở đây.',
        'Tầng 2 (liên kết dữ liệu): địa chỉ MAC, frame — switch.',
        'Tầng 3 (mạng): địa chỉ IP, gói tin — router.',
      ] },
      { note: 'Mẹo phân biệt: Switch — "thông minh trong nhà" (LAN, tầng 2). Router — "người dẫn đường ra ngoài" (giữa các mạng, tầng 3).' },
    ],
    examples: [
      { q: 'Một phòng máy 30 máy cần nối chung mạng LAN nội bộ thì dùng thiết bị nào là chính?', a: 'Switch — vì nó nối nhiều máy trong cùng LAN và gửi dữ liệu đúng cổng đích, hiệu quả hơn hub.' },
      { q: 'Thiết bị nào giúp mạng LAN của nhà trường kết nối ra Internet?', a: 'Router (kết hợp modem). Router định tuyến gói tin giữa mạng nội bộ và mạng nhà cung cấp dịch vụ.' },
    ],
  },

  'H12TIN-w04-quiz': {
    topic: 'Giao thức mạng và Internet',
    intro: 'Các em ơi, Internet hoạt động được nhờ các "luật chơi" chung gọi là giao thức. Tuần này ta tìm hiểu bộ giao thức TCP/IP, sự khác nhau TCP–UDP và HTTP–HTTPS.',
    objectives: [
      'Hiểu mô hình TCP/IP và vai trò của IP, TCP, UDP.',
      'Phân biệt TCP (tin cậy) và UDP (nhanh, không bảo đảm).',
      'Hiểu HTTP, HTTPS và vai trò của mã hoá.',
    ],
    theory: [
      { h: 'Bộ giao thức TCP/IP' },
      { p: 'Internet dùng mô hình TCP/IP gồm 4 tầng: Ứng dụng, Vận chuyển, Mạng (Internet), Liên kết. Giao thức IP đánh địa chỉ và định tuyến gói tin.' },
      { h: 'TCP và UDP (tầng vận chuyển)' },
      { ul: [
        'TCP: truyền tin cậy, có thiết lập kết nối (bắt tay), bảo đảm đúng thứ tự, kiểm soát lỗi. Dùng cho web, email, tải tệp.',
        'UDP: không thiết lập kết nối, không bảo đảm tin cậy nhưng nhanh. Dùng cho streaming, gọi video, game online.',
      ] },
      { h: 'HTTP và HTTPS (tầng ứng dụng)' },
      { p: 'HTTP (HyperText Transfer Protocol) là giao thức truyền siêu văn bản — nền tảng của World Wide Web. HTTPS bổ sung mã hoá bằng SSL/TLS nên an toàn hơn: dữ liệu giữa trình duyệt và máy chủ không bị đọc trộm.' },
      { note: 'Biểu tượng ổ khoá trên thanh địa chỉ trình duyệt cho biết trang đang dùng HTTPS.' },
    ],
    examples: [
      { q: 'Xem phim trực tuyến (streaming) nên dùng TCP hay UDP? Vì sao?', a: 'UDP — vì cần truyền nhanh, mất vài gói nhỏ không quan trọng bằng độ trễ thấp. TCP sẽ chậm do phải xác nhận và truyền lại.' },
      { q: 'Vì sao trang ngân hàng bắt buộc dùng HTTPS?', a: 'HTTPS mã hoá dữ liệu bằng SSL/TLS, bảo vệ mật khẩu và thông tin tài khoản khỏi bị nghe lén trên đường truyền.' },
    ],
  },

  'H12TIN-w05-quiz': {
    topic: 'Thực hành — Chia sẻ tài nguyên trong mạng LAN',
    intro: 'Chào các em! Tuần này ta thực hành chia sẻ thư mục, máy in trong mạng LAN — kĩ năng rất hữu ích ở phòng máy và văn phòng.',
    objectives: [
      'Biết cách bật chia sẻ và đặt quyền cho thư mục trong Windows.',
      'Truy cập tài nguyên máy khác qua địa chỉ IP riêng.',
      'Hiểu chia sẻ máy in mạng và thiết bị NAS.',
    ],
    theory: [
      { h: 'Chia sẻ thư mục' },
      { ul: [
        'Bật Network Discovery và File and Printer Sharing trong Windows.',
        'Nhấn chuột phải thư mục → Properties → Sharing → đặt quyền chia sẻ.',
        'Quyền chia sẻ thường gồm: Read (chỉ đọc), Read/Write (đọc-ghi), Full Control (toàn quyền).',
      ] },
      { h: 'Truy cập máy khác' },
      { p: 'Máy trong LAN có địa chỉ IP riêng dạng 192.168.x.x. Để mở thư mục chia sẻ, gõ đường dẫn UNC trong File Explorer theo dạng \\\\ip-may\\ten-share (ví dụ \\\\192.168.1.10\\Tailieu).' },
      { h: 'Máy in và lưu trữ dùng chung' },
      { ul: [
        'Máy in mạng (Network Printer): nhiều máy in chung qua mạng, không cần mỗi máy một máy in riêng.',
        'NAS (Network Attached Storage): thiết bị lưu trữ kết nối mạng, chia sẻ dữ liệu cho nhiều người dùng.',
      ] },
      { note: 'Chỉ cấp quyền Read khi người khác chỉ cần đọc; cấp Read/Write khi cần cùng chỉnh sửa — tránh cấp Full Control bừa bãi.' },
    ],
    examples: [
      { q: 'Bạn cần lấy tệp từ máy có IP 192.168.1.25, thư mục chia sẻ tên "BaiTap". Gõ gì vào File Explorer?', a: 'Gõ \\\\192.168.1.25\\BaiTap rồi Enter. Đây là đường dẫn UNC để truy cập tài nguyên chia sẻ.' },
      { q: 'Cả lớp cần in chung một máy in. Giải pháp hợp lí?', a: 'Cài máy in đó làm Network Printer hoặc chia sẻ từ máy chủ, để mọi máy in qua mạng — không cần mỗi máy một máy in riêng.' },
    ],
  },

  'H12TIN-w06-quiz': {
    topic: 'Giao tiếp ứng xử trong môi trường số',
    intro: 'Các em ơi, không gian mạng cũng cần văn hoá ứng xử và tuân thủ pháp luật. Tuần này ta học quy tắc ứng xử, an ninh mạng, bản quyền và cách tự bảo vệ.',
    objectives: [
      'Nắm quy tắc ứng xử và pháp luật trên không gian mạng.',
      'Nhận biết hành vi vi phạm: bắt nạt mạng, vi phạm bản quyền.',
      'Biết cách bảo vệ bản thân khi hoạt động trực tuyến.',
    ],
    theory: [
      { h: 'Quy tắc ứng xử trên mạng' },
      { p: 'Bộ Quy tắc ứng xử trên mạng xã hội (theo QĐ 874/QĐ-BTTTT) đề cao: tôn trọng, tuân thủ pháp luật, lành mạnh, an toàn và trách nhiệm.' },
      { h: 'Hành vi vi phạm pháp luật' },
      { ul: [
        'Tuyên truyền chống Nhà nước, xuyên tạc, kích động, lừa đảo — vi phạm Luật An ninh mạng.',
        'Bắt nạt qua mạng (cyberbullying): đe doạ, sỉ nhục, quấy rối — có thể bị xử lí hành chính hoặc hình sự.',
        'Vi phạm quyền tác giả: sao chép, phát tán tác phẩm (ảnh, video, phần mềm) không xin phép.',
      ] },
      { h: 'Tự bảo vệ trên mạng' },
      { ul: [
        'Đặt mật khẩu mạnh, bật xác thực hai bước (2FA).',
        'Không bấm link lạ, không chia sẻ thông tin nhạy cảm.',
        'Khi dùng ảnh trên mạng: kiểm tra giấy phép (CC, public domain) và ghi nguồn.',
      ] },
      { note: 'Đăng một câu đùa cũng có thể tổn thương người khác. Trước khi gửi, hãy hỏi: "Mình có nói điều này trực tiếp với họ không?"' },
    ],
    examples: [
      { q: 'Bạn muốn dùng một bức ảnh tìm thấy trên mạng cho bài thuyết trình. Cần làm gì?', a: 'Kiểm tra giấy phép của ảnh (ưu tiên Creative Commons hoặc public domain) và ghi rõ nguồn. Không xoá watermark, không bán lại.' },
      { q: 'Một bạn bị lập nhóm chat nói xấu, đe doạ. Đây là hành vi gì và hậu quả?', a: 'Đó là bắt nạt qua mạng (cyberbullying) — vi phạm pháp luật, có thể bị xử lí hành chính hoặc hình sự tuỳ mức độ.' },
    ],
  },

  'H12TIN-w07-quiz': {
    topic: 'HTML — Cấu trúc cơ bản của trang web',
    intro: 'Chào các em! Bắt đầu hành trình làm web. HTML là "bộ xương" của trang web. Tuần này ta học cấu trúc một trang HTML chuẩn.',
    objectives: [
      'Viết được khung HTML5 cơ bản với DOCTYPE, html, head, body.',
      'Hiểu vai trò của title, meta charset.',
      'Sử dụng thẻ tiêu đề, đoạn văn và ngắt dòng.',
    ],
    theory: [
      { h: 'Khung HTML5 cơ bản' },
      { p: 'Một trang HTML chuẩn gồm khai báo DOCTYPE, thẻ gốc html, phần đầu head và phần thân body:' },
      { p: '<!DOCTYPE html>\\n<html lang="vi">\\n<head>\\n  <meta charset="UTF-8">\\n  <title>Trang của em</title>\\n</head>\\n<body>\\n  <h1>Xin chào</h1>\\n</body>\\n</html>' },
      { h: 'Các thẻ quan trọng' },
      { ul: [
        '<head>: chứa thông tin về trang (không hiển thị trực tiếp): title, meta, link CSS.',
        '<title>: tiêu đề hiển thị trên tab trình duyệt, đặt trong <head>.',
        '<meta charset="UTF-8">: khai báo bảng mã ký tự để hiển thị tiếng Việt đúng.',
        '<body>: chứa nội dung hiển thị của trang.',
      ] },
      { h: 'Thẻ nội dung cơ bản' },
      { ul: [
        '<h1> đến <h6>: tiêu đề từ lớn (h1) đến nhỏ (h6).',
        '<p>: tạo đoạn văn (paragraph).',
        '<br>: ngắt dòng (line break).',
      ] },
      { note: 'Thiếu <meta charset="UTF-8"> là lỗi rất hay gặp khiến tiếng Việt bị "loạn mã".' },
    ],
    examples: [
      { q: 'Viết một trang HTML hiển thị tiêu đề "Lớp 12A" và một đoạn văn giới thiệu.', a: '<!DOCTYPE html>\\n<html lang="vi">\\n<head><meta charset="UTF-8"><title>Lớp 12A</title></head>\\n<body>\\n  <h1>Lớp 12A</h1>\\n  <p>Đây là trang giới thiệu lớp em.</p>\\n</body>\\n</html>' },
      { q: 'Vì sao <title> phải đặt trong <head> chứ không phải <body>?', a: 'Vì <head> chứa thông tin mô tả trang. <title> không hiển thị trong nội dung mà hiện trên tab trình duyệt, nên thuộc về <head>.' },
    ],
  },

  'H12TIN-w08-quiz': {
    topic: 'HTML — Định dạng văn bản',
    intro: 'Các em ơi, tuần này ta học cách làm chữ in đậm, in nghiêng, gạch chân và viết chỉ số trên/dưới bằng HTML.',
    objectives: [
      'Sử dụng các thẻ in đậm, nghiêng, gạch chân, gạch ngang.',
      'Phân biệt thẻ ngữ nghĩa (strong, em) và thẻ trình bày (b, i).',
      'Viết chỉ số trên (sup) và chỉ số dưới (sub).',
    ],
    theory: [
      { h: 'Các thẻ định dạng văn bản' },
      { ul: [
        '<b> và <strong>: in đậm. <strong> mang ý nghĩa "quan trọng" (ngữ nghĩa).',
        '<i> và <em>: in nghiêng. <em> mang ý nghĩa "nhấn mạnh".',
        '<u>: gạch chân (underline).',
        '<s>: gạch ngang (strikethrough), thường dùng cho nội dung đã bỏ.',
      ] },
      { h: 'Chỉ số trên và dưới' },
      { ul: [
        '<sup>: chỉ số trên (superscript), ví dụ x<sup>2</sup> hiển thị x².',
        '<sub>: chỉ số dưới (subscript), ví dụ H<sub>2</sub>O hiển thị H₂O.',
      ] },
      { h: 'Thẻ ngữ nghĩa và thẻ trình bày' },
      { p: 'Thẻ trình bày (<b>, <i>, <u>) chỉ thay đổi hình thức. Thẻ ngữ nghĩa (<strong>, <em>) vừa thay đổi hình thức vừa truyền tải ý nghĩa cho trình duyệt và trình đọc màn hình.' },
      { note: 'Nên ưu tiên <strong>/<em> hơn <b>/<i> vì chúng có ý nghĩa, tốt cho trình đọc màn hình và SEO.' },
    ],
    examples: [
      { q: 'Viết HTML hiển thị công thức nước H₂O và biểu thức x².', a: 'H<sub>2</sub>O và x<sup>2</sup>. Dùng <sub> cho chỉ số dưới, <sup> cho chỉ số trên.' },
      { q: 'Đánh dấu từ "Quan trọng" in đậm có ý nghĩa nhấn mạnh thì dùng thẻ nào?', a: 'Dùng <strong>Quan trọng</strong>. <strong> in đậm và mang ngữ nghĩa "quan trọng", tốt hơn <b> thuần trình bày.' },
    ],
  },

  'H12TIN-w09-quiz': {
    topic: 'HTML — Danh sách',
    intro: 'Chào các em! Tuần này ta học cách tạo danh sách: danh sách có thứ tự, không thứ tự và danh sách định nghĩa.',
    objectives: [
      'Tạo danh sách có thứ tự (ol) và không thứ tự (ul).',
      'Dùng đúng thẻ mục danh sách (li).',
      'Hiểu danh sách định nghĩa và danh sách lồng nhau.',
    ],
    theory: [
      { h: 'Hai loại danh sách chính' },
      { ul: [
        '<ul>: danh sách không thứ tự (unordered), mỗi mục có dấu chấm tròn.',
        '<ol>: danh sách có thứ tự (ordered), đánh số 1, 2, 3…',
        'Mỗi mục dùng thẻ <li> (list item).',
      ] },
      { h: 'Ví dụ' },
      { p: '<ul>\\n  <li>Toán</li>\\n  <li>Văn</li>\\n  <li>Tin</li>\\n</ul>' },
      { h: 'Danh sách định nghĩa và lồng nhau' },
      { ul: [
        'Danh sách định nghĩa: <dl> chứa cặp <dt> (thuật ngữ) và <dd> (định nghĩa).',
        'Danh sách có thể lồng nhiều cấp: đặt một <ul>/<ol> bên trong một <li>.',
        'Đổi kiểu đánh số (a, b, c…) nên dùng CSS: list-style-type: lower-alpha;',
      ] },
      { note: 'Quy tắc: nếu thứ tự quan trọng (các bước làm) dùng <ol>; nếu không quan trọng dùng <ul>.' },
    ],
    examples: [
      { q: 'Viết danh sách các bước pha trà có thứ tự.', a: '<ol>\\n  <li>Đun sôi nước</li>\\n  <li>Cho trà vào ấm</li>\\n  <li>Rót nước, đợi 3 phút</li>\\n</ol>. Dùng <ol> vì thứ tự các bước quan trọng.' },
      { q: 'Làm sao tạo danh sách con (lồng) bên trong một mục?', a: 'Đặt thẻ <ul> hoặc <ol> mới bên trong một <li>: <li>Môn tự nhiên<ul><li>Toán</li><li>Lí</li></ul></li>.' },
    ],
  },

  'H12TIN-w10-quiz': {
    topic: 'HTML — Bảng',
    intro: 'Các em ơi, tuần này ta học cách tạo bảng dữ liệu: hàng, cột, ô tiêu đề và gộp ô.',
    objectives: [
      'Tạo bảng với table, tr, td, th.',
      'Phân biệt ô dữ liệu (td) và ô tiêu đề (th).',
      'Gộp ô bằng colspan và rowspan.',
    ],
    theory: [
      { h: 'Các thẻ tạo bảng' },
      { ul: [
        '<table>: thẻ bao toàn bảng.',
        '<tr>: một hàng (table row).',
        '<td>: ô dữ liệu (table data).',
        '<th>: ô tiêu đề (table header) — in đậm và căn giữa mặc định.',
      ] },
      { h: 'Ví dụ bảng' },
      { p: '<table border="1">\\n  <tr><th>Môn</th><th>Điểm</th></tr>\\n  <tr><td>Toán</td><td>9</td></tr>\\n  <tr><td>Tin</td><td>10</td></tr>\\n</table>' },
      { h: 'Gộp ô' },
      { ul: [
        'colspan="2": ô kéo dài qua 2 cột.',
        'rowspan="2": ô kéo dài qua 2 hàng.',
      ] },
      { note: 'Chỉ dùng bảng để trình bày dữ liệu dạng bảng, KHÔNG dùng bảng để dàn trang (việc đó dành cho CSS Flex/Grid).' },
    ],
    examples: [
      { q: 'Tạo bảng 2 cột "Tên" và "Tuổi" với 1 hàng dữ liệu.', a: '<table border="1">\\n  <tr><th>Tên</th><th>Tuổi</th></tr>\\n  <tr><td>Lan</td><td>17</td></tr>\\n</table>' },
      { q: 'Muốn một ô tiêu đề trải rộng hết cả hai cột thì dùng gì?', a: 'Dùng colspan="2": <th colspan="2">Bảng điểm</th>. Ô đó sẽ chiếm chỗ của 2 cột.' },
    ],
  },

  'H12TIN-w11-quiz': {
    topic: 'HTML — Liên kết và đa phương tiện',
    intro: 'Chào các em! Tuần này ta học cách tạo liên kết, chèn ảnh, video, âm thanh — biến trang web tĩnh thành sống động.',
    objectives: [
      'Tạo liên kết bằng thẻ a, mở tab mới với target.',
      'Chèn ảnh với img và thuộc tính alt.',
      'Chèn video và âm thanh.',
    ],
    theory: [
      { h: 'Liên kết (anchor)' },
      { ul: [
        '<a href="url">văn bản</a>: tạo liên kết tới địa chỉ url.',
        'target="_blank": mở liên kết trong tab mới.',
      ] },
      { h: 'Chèn ảnh' },
      { ul: [
        '<img src="anh.jpg" alt="mô tả">: chèn ảnh (thẻ tự đóng, không có thẻ kết).',
        'Thuộc tính alt: văn bản thay thế khi ảnh không tải được, đồng thời hỗ trợ người khiếm thị (accessibility).',
      ] },
      { h: 'Video và âm thanh' },
      { ul: [
        '<video src="phim.mp4" controls></video>: chèn video có thanh điều khiển.',
        '<audio src="nhac.mp3" controls></audio>: chèn âm thanh.',
      ] },
      { note: 'Luôn viết thuộc tính alt cho ảnh — vừa tốt cho người dùng khiếm thị, vừa giúp SEO.' },
    ],
    examples: [
      { q: 'Tạo liên kết tới trang Bộ GD&ĐT, mở trong tab mới.', a: '<a href="https://moet.gov.vn" target="_blank">Bộ GD&ĐT</a>. Thuộc tính target="_blank" mở liên kết ở tab mới.' },
      { q: 'Chèn ảnh logo trường có mô tả thay thế.', a: '<img src="logo.png" alt="Logo Trường THPT XYZ">. Thuộc tính alt mô tả ảnh, hiển thị khi ảnh lỗi và hỗ trợ trình đọc màn hình.' },
    ],
  },

  'H12TIN-w12-quiz': {
    topic: 'HTML — Biểu mẫu (form)',
    intro: 'Các em ơi, biểu mẫu (form) giúp người dùng nhập dữ liệu: đăng ký, đăng nhập, góp ý. Tuần này ta học các thành phần của form.',
    objectives: [
      'Tạo form với thuộc tính action, method.',
      'Dùng các loại input: text, password, checkbox, radio.',
      'Tạo ô nhập nhiều dòng và nút gửi.',
    ],
    theory: [
      { h: 'Thẻ form' },
      { p: '<form action="xu-li.php" method="post"> … </form>. action là nơi gửi dữ liệu, method là cách gửi (get hoặc post).' },
      { h: 'Các ô nhập liệu' },
      { ul: [
        '<input type="text">: nhập văn bản một dòng.',
        '<textarea></textarea>: nhập văn bản nhiều dòng.',
        '<input type="password">: nhập mật khẩu (ẩn ký tự).',
        '<input type="checkbox">: hộp chọn, cho phép chọn nhiều giá trị.',
        '<input type="radio">: nút chọn, chỉ chọn một trong nhóm.',
      ] },
      { h: 'Nút gửi' },
      { p: '<button type="submit">Gửi</button> hoặc <input type="submit" value="Gửi">.' },
      { note: 'Mỗi input nên có thẻ <label> đi kèm để rõ nghĩa và dễ truy cập: <label>Họ tên <input type="text"></label>.' },
    ],
    examples: [
      { q: 'Tạo form đăng nhập gồm tên đăng nhập, mật khẩu và nút Đăng nhập.', a: '<form>\\n  <input type="text" placeholder="Tên đăng nhập">\\n  <input type="password" placeholder="Mật khẩu">\\n  <button type="submit">Đăng nhập</button>\\n</form>' },
      { q: 'Cho người dùng chọn nhiều sở thích cùng lúc thì dùng loại input nào?', a: 'Dùng <input type="checkbox">, vì checkbox cho phép chọn đồng thời nhiều giá trị (khác radio chỉ chọn một).' },
    ],
  },

  'H12TIN-w13-quiz': {
    topic: 'CSS — Cơ bản',
    intro: 'Chào các em! HTML là bộ xương, CSS là "lớp áo" làm trang web đẹp. Tuần này ta học cú pháp CSS và các bộ chọn cơ bản.',
    objectives: [
      'Hiểu vai trò của CSS và cú pháp selector { property: value; }.',
      'Biết 3 cách gắn CSS: inline, internal, external.',
      'Sử dụng bộ chọn theo thẻ, class, id.',
    ],
    theory: [
      { h: 'CSS là gì?' },
      { p: 'CSS (Cascading Style Sheets) dùng để định dạng, trình bày trang HTML: màu sắc, font, bố cục… Cú pháp: selector { property: value; }.' },
      { h: 'Ba cách gắn CSS' },
      { ul: [
        'Inline: viết trong thuộc tính style của thẻ, ví dụ <p style="color:red">.',
        'Internal: viết trong thẻ <style> ở phần <head>.',
        'External: viết file .css riêng, liên kết bằng <link rel="stylesheet" href="style.css">.',
      ] },
      { h: 'Các bộ chọn cơ bản' },
      { ul: [
        'Theo thẻ: p { color: blue; } áp dụng cho mọi thẻ <p>.',
        'Theo class: .ten-class { } — dùng dấu chấm, gắn vào thẻ qua class="ten-class".',
        'Theo id: #ten-id { } — dùng dấu thăng, gắn qua id="ten-id" (id là duy nhất trong trang).',
      ] },
      { note: 'External CSS được khuyên dùng vì tách biệt nội dung và trình bày, dễ bảo trì cho cả website.' },
    ],
    examples: [
      { q: 'Viết CSS làm mọi đoạn văn <p> có màu chữ xanh dương.', a: 'p { color: blue; } — đây là bộ chọn theo thẻ, áp dụng cho tất cả <p>.' },
      { q: 'Có một nút quan trọng class="noi-bat", làm nền vàng.', a: '.noi-bat { background-color: yellow; }. Bộ chọn class dùng dấu chấm trước tên class.' },
    ],
  },

  'H12TIN-w14-quiz': {
    topic: 'CSS — Định dạng văn bản, màu, nền',
    intro: 'Các em ơi, tuần này ta học các thuộc tính CSS thông dụng nhất: đổi màu chữ, màu nền, cỡ chữ, font và căn lề.',
    objectives: [
      'Dùng color, background-color để đổi màu.',
      'Dùng font-size, font-family cho chữ.',
      'Căn chỉnh và in đậm bằng CSS.',
    ],
    theory: [
      { h: 'Màu chữ và màu nền' },
      { ul: [
        'color: đổi màu chữ, ví dụ color: red;',
        'background-color: đổi màu nền, ví dụ background-color: #f0f0f0;',
        'Màu có thể viết theo tên (red), mã hex (#ff0000) hoặc rgb(255,0,0).',
      ] },
      { h: 'Font chữ' },
      { ul: [
        'font-size: cỡ chữ, ví dụ font-size: 18px;',
        'font-family: họ font, ví dụ font-family: Arial, sans-serif;',
        'font-weight: bold; để in đậm.',
      ] },
      { h: 'Căn chỉnh' },
      { p: 'text-align: center; căn giữa văn bản (cũng có left, right, justify).' },
      { note: 'Khi đặt font-family, nên liệt kê nhiều font dự phòng kết thúc bằng một họ chung (serif/sans-serif) để chắc chắn hiển thị được.' },
    ],
    examples: [
      { q: 'Viết CSS làm tiêu đề h1 màu trắng, nền xanh, căn giữa.', a: 'h1 {\\n  color: white;\\n  background-color: blue;\\n  text-align: center;\\n}' },
      { q: 'Đặt cỡ chữ 20px và in đậm cho đoạn văn class="intro".', a: '.intro {\\n  font-size: 20px;\\n  font-weight: bold;\\n}' },
    ],
  },

  'H12TIN-w15-quiz': {
    topic: 'CSS — Khung, viền và độ ưu tiên bộ chọn',
    intro: 'Chào các em! Tuần này ta học mô hình hộp (box model) — cách CSS bố trí khoảng cách quanh phần tử, và quy tắc độ ưu tiên giữa các bộ chọn.',
    objectives: [
      'Hiểu box model: content, padding, border, margin.',
      'Phân biệt padding (trong) và margin (ngoài).',
      'Hiểu độ ưu tiên (specificity) của bộ chọn.',
    ],
    theory: [
      { h: 'Mô hình hộp (box model)' },
      { p: 'Mỗi phần tử HTML là một hộp gồm 4 lớp từ trong ra ngoài: Content (nội dung) → Padding (đệm trong) → Border (viền) → Margin (lề ngoài).' },
      { ul: [
        'padding: khoảng cách giữa nội dung và viền (bên trong).',
        'margin: khoảng cách bên ngoài viền, đẩy các phần tử ra xa nhau.',
        'border: 1px solid black; đặt viền dày 1px, nét liền, màu đen.',
      ] },
      { h: 'Độ ưu tiên bộ chọn (specificity)' },
      { ul: [
        'Thứ tự từ cao xuống thấp: !important > inline style > id (#) > class (.) > thẻ.',
        'Khi hai quy tắc cùng độ ưu tiên, quy tắc viết sau sẽ thắng (cascade — "last one wins").',
      ] },
      { note: 'Hạn chế dùng !important — nó phá vỡ trật tự ưu tiên và khiến CSS khó bảo trì.' },
    ],
    examples: [
      { q: 'Tạo một thẻ có viền 2px đen, đệm trong 10px, lề ngoài 20px.', a: '.hop {\\n  border: 2px solid black;\\n  padding: 10px;\\n  margin: 20px;\\n}' },
      { q: 'Có cả "p { color:red }" và "#tieu-de { color:blue }" cho cùng phần tử <p id="tieu-de">. Màu nào thắng?', a: 'Màu xanh (blue), vì bộ chọn id (#tieu-de) có độ ưu tiên cao hơn bộ chọn theo thẻ (p).' },
    ],
  },

  'H12TIN-w16-quiz': {
    topic: 'Hướng nghiệp ngành CNTT',
    intro: 'Các em ơi, ngành CNTT rất rộng và đang "khát" nhân lực. Tuần này ta tìm hiểu các nhóm nghề và cách chuẩn bị để theo đuổi.',
    objectives: [
      'Kể tên các nhóm ngành CNTT phổ biến.',
      'Hiểu công việc của lập trình viên, quản trị mạng, chuyên gia dữ liệu, kĩ sư AI.',
      'Biết cách chuẩn bị để theo ngành CNTT.',
    ],
    theory: [
      { h: 'Các nhóm ngành CNTT' },
      { ul: [
        'Khoa học máy tính, Công nghệ phần mềm.',
        'Hệ thống thông tin, Mạng và An toàn thông tin.',
        'Khoa học dữ liệu, Trí tuệ nhân tạo.',
      ] },
      { h: 'Một số nghề tiêu biểu' },
      { ul: [
        'Lập trình viên (Developer): phân tích yêu cầu, viết mã, kiểm thử, bảo trì phần mềm.',
        'Quản trị mạng (Network Admin): thiết kế, vận hành, bảo trì hệ thống mạng và an ninh mạng.',
        'Chuyên gia dữ liệu (Data Scientist): dùng Toán, thống kê, Python/R, học máy để phân tích dữ liệu.',
        'Kĩ sư AI (AI Engineer): xây dựng, huấn luyện mô hình ML/DL và đưa vào sản phẩm.',
      ] },
      { h: 'Chuẩn bị từ bây giờ' },
      { p: 'Chú trọng Toán, Lí, Tiếng Anh, Tin học; tham gia câu lạc bộ; làm dự án nhỏ; học thêm qua các khoá trực tuyến.' },
      { note: 'CNTT cần học cả đời (lifelong learning) vì công nghệ thay đổi nhanh — quan trọng nhất là khả năng tự học.' },
    ],
    examples: [
      { q: 'Bạn thích phân tích số liệu và thống kê thì hợp nghề CNTT nào? Cần kĩ năng gì?', a: 'Hợp nghề Chuyên gia dữ liệu (Data Scientist). Cần Toán-thống kê, lập trình Python/R, học máy và tư duy phân tích.' },
      { q: 'Học sinh lớp 12 nên làm gì để chuẩn bị theo ngành CNTT?', a: 'Học chắc Toán-Lí-Anh-Tin, tham gia CLB lập trình, làm dự án nhỏ (như website cá nhân) và học thêm khoá trực tuyến.' },
    ],
  },

  'H12TIN-w17-quiz': {
    topic: 'Ôn tập học kỳ I',
    intro: 'Chào các em! Tuần này ta hệ thống lại kiến thức HK1: AI, mạng máy tính, đạo đức số, HTML và CSS.',
    objectives: [
      'Hệ thống khái niệm AI hẹp/AGI, giao thức mạng.',
      'Ôn các thẻ HTML và bộ chọn CSS.',
      'Củng cố box model và độ ưu tiên CSS.',
    ],
    theory: [
      { h: 'Mảng AI và mạng' },
      { ul: [
        'AI hẹp chuyên một việc; AGI tổng quát như con người, chưa đạt được.',
        'TCP: tin cậy, có thứ tự, kiểm soát lỗi. UDP: nhanh, không bảo đảm.',
        'HTTPS = HTTP + mã hoá SSL/TLS.',
      ] },
      { h: 'Mảng HTML' },
      { ul: [
        'Cấu trúc: DOCTYPE, html, head (title, meta), body.',
        'Thẻ thường gặp: <p>, <a href>, <img alt>, <ul>/<ol>/<li>, <table>/<tr>/<td>/<th>.',
      ] },
      { h: 'Mảng CSS' },
      { ul: [
        'Bộ chọn: thẻ (p), class (.ten), id (#ten).',
        'Box model: Content - Padding - Border - Margin.',
        'Độ ưu tiên: !important > inline > id > class > thẻ.',
      ] },
      { note: 'Ôn tập hiệu quả: tự tay viết lại một trang HTML nhỏ có CSS thay vì chỉ đọc lí thuyết.' },
    ],
    examples: [
      { q: 'Phân biệt nhanh AI hẹp và AGI.', a: 'AI hẹp (ANI) chỉ giỏi một nhiệm vụ cụ thể, là loại AI hiện nay. AGI có khả năng tổng quát như con người trong mọi việc — vẫn là mục tiêu chưa đạt.' },
      { q: 'Liệt kê 4 lớp của box model theo thứ tự từ trong ra ngoài.', a: 'Content → Padding → Border → Margin.' },
    ],
  },

  'H12TIN-w18-quiz': {
    topic: 'Thi học kỳ I',
    intro: 'Các em ơi, đây là tuần kiểm tra cuối HK1. Hãy bình tĩnh vận dụng kiến thức AI, mạng, đạo đức số, HTML, CSS đã học.',
    objectives: [
      'Vận dụng tổng hợp kiến thức HK1.',
      'Viết và đọc hiểu mã HTML/CSS cơ bản.',
      'Trả lời câu hỏi về mạng và đạo đức số.',
    ],
    theory: [
      { h: 'Những điểm cần nhớ' },
      { ul: [
        'Prompt tốt = Vai trò + Ngữ cảnh + Yêu cầu + Định dạng đầu ra.',
        'Router làm việc ở tầng 3 (định tuyến IP); Switch ở tầng 2.',
        'HTTPS mã hoá dữ liệu bằng SSL/TLS.',
      ] },
      { h: 'HTML/CSS thường ra đề' },
      { ul: [
        'Tạo bảng dùng <table>, <tr>, <th>, <td> — KHÔNG dùng <div>.',
        'Đặt màu nền: body { background-color: yellow; }.',
        'Bộ chọn class dùng dấu chấm; id dùng dấu thăng.',
      ] },
      { h: 'Đạo đức số' },
      { p: 'Bắt nạt qua mạng vi phạm Luật An ninh mạng, có thể bị xử lí hành chính hoặc hình sự.' },
      { note: 'Đọc kĩ đề: câu hỏi "KHÔNG dùng thẻ nào" hay "câu nào SAI" rất dễ trả lời ngược nếu vội.' },
    ],
    examples: [
      { q: 'Viết CSS đặt màu nền vàng cho toàn trang.', a: 'body { background-color: yellow; }. Bộ chọn thẻ body áp dụng cho toàn bộ thân trang.' },
      { q: 'Để dựng bảng 3 cột tiêu đề + 2 hàng dữ liệu, cần và không cần thẻ nào?', a: 'Cần <table>, <tr>, <th>, <td>. KHÔNG dùng <div> vì <div> không phải thẻ bảng.' },
    ],
  },

  'H12TIN-w19-quiz': {
    topic: 'Thực hành — Kết nối thiết bị số',
    intro: 'Chào các em! Mở đầu HK2, ta thực hành kết nối các thiết bị số: điện thoại, máy in, TV và xử lí sự cố thường gặp.',
    objectives: [
      'Biết các cách kết nối điện thoại với máy tính.',
      'Biết in ấn và trình chiếu không dây.',
      'Xử lí một số sự cố kết nối cơ bản.',
    ],
    theory: [
      { h: 'Kết nối điện thoại — máy tính' },
      { ul: [
        'Cáp USB: truyền file nhanh, ổn định.',
        'Bluetooth: ghép đôi (pairing) bằng mã PIN, tiện cho file nhỏ.',
        'Wi-Fi / đám mây: Google Photos, OneDrive đồng bộ tự động.',
      ] },
      { h: 'In ấn và trình chiếu' },
      { ul: [
        'In từ điện thoại: Wi-Fi Direct, AirPrint (Apple), in qua mạng.',
        'Trình chiếu lên TV: cáp HDMI, hoặc không dây qua Chromecast / Miracast / AirPlay.',
      ] },
      { h: 'Khắc phục sự cố' },
      { p: 'Khi không nhận thiết bị USB: kiểm tra cáp, thử cổng khác, kiểm tra driver. Khi Bluetooth không kết nối: bật Bluetooth hai máy, ghép đôi lại.' },
      { note: 'Trước buổi thuyết trình, hãy thử kết nối máy tính với máy chiếu/TV trước — tránh sự cố phút chót.' },
    ],
    examples: [
      { q: 'Cần chuyển nhanh 200 ảnh từ điện thoại sang máy tính. Cách nào hợp lí?', a: 'Dùng cáp USB (nhanh, ổn định) hoặc dịch vụ đồng bộ đám mây như Google Photos/OneDrive. Tránh gửi qua mail từng ảnh.' },
      { q: 'Máy tính không nhận USB cắm vào. Bạn kiểm tra những gì?', a: 'Kiểm tra cáp còn tốt không, thử cổng USB khác, kiểm tra/ cài lại driver. Không nên format máy hay đập máy.' },
    ],
  },

  'H12TIN-w20-quiz': {
    topic: 'Dự án website — Lập kế hoạch và cấu trúc',
    intro: 'Các em ơi, bắt đầu dự án lớn: xây một website hoàn chỉnh. Trước khi viết code, ta phải lập kế hoạch — đây là bước quyết định.',
    objectives: [
      'Biết các bước lập kế hoạch website.',
      'Hiểu sitemap, wireframe.',
      'Phân biệt tên miền (domain) và hosting.',
    ],
    theory: [
      { h: 'Bước đầu: lập kế hoạch' },
      { p: 'Trước khi viết mã, cần xác định: mục tiêu website, đối tượng người dùng, nội dung chính và sơ đồ trang (sitemap).' },
      { h: 'Sitemap và wireframe' },
      { ul: [
        'Sitemap: sơ đồ cấu trúc website — danh sách các trang và liên kết giữa chúng.',
        'Wireframe: bản phác thảo bố cục giao diện, chưa có chi tiết thẩm mỹ (màu, ảnh).',
      ] },
      { h: 'Tên miền và hosting' },
      { ul: [
        'Tên miền (domain): địa chỉ web dễ nhớ (vd truong-xyz.vn), ánh xạ tới IP của máy chủ.',
        'Hosting: dịch vụ lưu trữ tệp web và phục vụ chúng qua Internet.',
        'Website tối thiểu thường có: Trang chủ, Giới thiệu, Liên hệ.',
      ] },
      { note: 'Hãy phác sitemap và wireframe trên giấy trước. Sửa trên giấy nhanh hơn sửa trên code rất nhiều.' },
    ],
    examples: [
      { q: 'Phân biệt tên miền và hosting bằng một ví dụ đời thường.', a: 'Tên miền giống địa chỉ nhà (để người ta tìm đến); hosting giống mảnh đất và ngôi nhà (nơi lưu trữ thực sự). Cả hai đều cần để website hoạt động.' },
      { q: 'Sitemap của một website giới thiệu lớp gồm những gì?', a: 'Ví dụ: Trang chủ → (Giới thiệu lớp, Thành viên, Hoạt động, Liên hệ). Sitemap liệt kê các trang và liên kết giữa chúng.' },
    ],
  },

  'H12TIN-w21-quiz': {
    topic: 'Dự án — Soạn nội dung HTML cho trang chủ',
    intro: 'Chào các em! Tuần này ta viết trang chủ index.html và làm quen với các thẻ ngữ nghĩa HTML5: header, nav, main.',
    objectives: [
      'Biết vì sao trang chủ thường tên index.html.',
      'Đặt title, favicon cho trang.',
      'Dùng thẻ ngữ nghĩa header, nav, main.',
    ],
    theory: [
      { h: 'Trang chủ index.html' },
      { p: 'Tệp trang chủ thường đặt tên index.html vì đa số máy chủ tự động phục vụ tệp này khi truy cập thư mục gốc.' },
      { h: 'Tiêu đề và favicon' },
      { ul: [
        '<title>: tiêu đề hiển thị trên tab trình duyệt.',
        '<link rel="icon" href="favicon.ico">: đặt biểu tượng nhỏ (favicon) cho tab.',
      ] },
      { h: 'Thẻ ngữ nghĩa HTML5' },
      { ul: [
        '<header>: phần đầu trang (logo, tiêu đề).',
        '<nav>: phần điều hướng (menu).',
        '<main>: phần nội dung chính của trang.',
      ] },
      { note: 'Thẻ ngữ nghĩa giúp trình duyệt, công cụ tìm kiếm và trình đọc màn hình hiểu cấu trúc trang — tốt hơn dùng <div> chung chung.' },
    ],
    examples: [
      { q: 'Vì sao nên đặt trang chủ tên index.html?', a: 'Vì hầu hết máy chủ web mặc định phục vụ tệp index.html khi người dùng truy cập thư mục gốc, nên không phải gõ tên tệp.' },
      { q: 'Viết khung trang chủ dùng thẻ ngữ nghĩa.', a: '<body>\\n  <header><h1>Lớp 12A</h1></header>\\n  <nav>…menu…</nav>\\n  <main>…nội dung…</main>\\n</body>' },
    ],
  },

  'H12TIN-w22-quiz': {
    topic: 'Dự án — Phần đầu trang (header) và menu',
    intro: 'Các em ơi, tuần này ta dựng phần đầu trang: logo và menu điều hướng ngang, có hiệu ứng hover và responsive.',
    objectives: [
      'Dựng menu bằng nav, ul, li, a.',
      'Dùng Flexbox để menu nằm ngang.',
      'Tạo hiệu ứng hover và menu responsive.',
    ],
    theory: [
      { h: 'Cấu trúc menu' },
      { p: 'Menu thường là một danh sách liên kết: thẻ <nav> chứa <ul>, mỗi mục là <li><a href="...">.' },
      { h: 'Dàn menu ngang bằng Flexbox' },
      { p: 'nav ul { display: flex; gap: 20px; list-style: none; }. display: flex; xếp các mục theo hàng ngang, gap tạo khoảng cách giữa chúng.' },
      { h: 'Hiệu ứng và logo' },
      { ul: [
        'a:hover { color: orange; } — đổi màu khi rê chuột (pseudo-class :hover).',
        'Logo: đặt <img> trong <header>, bọc bởi <a href="index.html"> để bấm vào quay về trang chủ.',
      ] },
      { h: 'Menu responsive' },
      { p: 'Trên màn hình nhỏ, dùng menu "hamburger" (biểu tượng 3 gạch) kết hợp media query CSS để ẩn/hiện.' },
      { note: 'Đặt list-style: none; để bỏ dấu chấm tròn của danh sách khi làm menu.' },
    ],
    examples: [
      { q: 'Viết CSS làm menu nằm ngang, cách nhau 24px, bỏ dấu chấm.', a: 'nav ul {\\n  display: flex;\\n  gap: 24px;\\n  list-style: none;\\n}' },
      { q: 'Cho liên kết menu đổi sang màu cam khi rê chuột.', a: 'nav a:hover { color: orange; }. Pseudo-class :hover áp dụng khi con trỏ ở trên liên kết.' },
    ],
  },

  'H12TIN-w23-quiz': {
    topic: 'Dự án — Thân trang và chân trang',
    intro: 'Chào các em! Tuần này ta hoàn thiện phần thân (nội dung chính) và chân trang (footer), đồng thời học bố cục nhiều cột bằng Flex/Grid.',
    objectives: [
      'Dùng thẻ ngữ nghĩa article, section, aside, footer.',
      'Biết nội dung thường có trong footer.',
      'Bố cục nhiều cột bằng Flexbox và Grid.',
    ],
    theory: [
      { h: 'Thẻ ngữ nghĩa cho thân trang' },
      { ul: [
        '<article>: nội dung độc lập, có thể tách ra dùng riêng (một bài viết).',
        '<section>: một nhóm nội dung theo chủ đề.',
        '<aside>: thanh bên, nội dung phụ.',
        '<footer>: chân trang.',
      ] },
      { h: 'Chân trang (footer)' },
      { p: 'Footer thường chứa: bản quyền, thông tin liên hệ, liên kết phụ, biểu tượng mạng xã hội.' },
      { h: 'Bố cục nhiều cột' },
      { ul: [
        'Flexbox: bố cục 1 chiều (một hàng hoặc một cột).',
        'CSS Grid: bố cục 2 chiều (cả hàng và cột) — phù hợp dàn trang phức tạp.',
      ] },
      { note: 'Quy tắc chọn: chia theo một chiều dùng Flex; lưới hai chiều dùng Grid.' },
    ],
    examples: [
      { q: 'Viết footer chứa dòng bản quyền.', a: '<footer>\\n  <p>© 2026 Lớp 12A. Mọi quyền được bảo lưu.</p>\\n</footer>' },
      { q: 'Cần dàn một lưới ảnh 3 cột x nhiều hàng, nên dùng Flex hay Grid?', a: 'Dùng CSS Grid, vì đây là bố cục 2 chiều (hàng và cột). Ví dụ: display: grid; grid-template-columns: repeat(3, 1fr);.' },
    ],
  },

  'H12TIN-w24-quiz': {
    topic: 'Dự án — Liên kết và đa phương tiện',
    intro: 'Các em ơi, tuần này ta thêm liên kết nội bộ giữa các trang, nhúng video, ảnh nền và tối ưu ảnh cho website.',
    objectives: [
      'Tạo liên kết nội bộ và liên kết neo (#).',
      'Nhúng video YouTube và đặt ảnh nền.',
      'Làm ảnh responsive và tối ưu tải.',
    ],
    theory: [
      { h: 'Liên kết nội bộ' },
      { ul: [
        '<a href="about.html">: liên kết tới trang khác cùng website (đường dẫn tương đối).',
        '<a href="#lien-he">: liên kết neo tới phần có id="lien-he" trong cùng trang.',
        'html { scroll-behavior: smooth; } để cuộn mượt khi nhấn liên kết neo.',
      ] },
      { h: 'Nhúng đa phương tiện' },
      { ul: [
        'Video YouTube: <iframe src="https://www.youtube.com/embed/ID"></iframe>.',
        'Ảnh nền: background-image: url("anh.jpg"); trong CSS.',
      ] },
      { h: 'Tối ưu ảnh' },
      { ul: [
        'Ảnh responsive: img { width: 100%; height: auto; } để co dãn theo khung.',
        'Nén ảnh, dùng định dạng WebP, dùng srcset để chọn ảnh phù hợp thiết bị.',
      ] },
      { note: 'Ảnh quá nặng là nguyên nhân hàng đầu khiến web tải chậm trên điện thoại — luôn nén ảnh trước khi đưa lên.' },
    ],
    examples: [
      { q: 'Tạo liên kết từ menu tới phần "Liên hệ" trong cùng trang.', a: 'Đặt id cho phần đó: <section id="lien-he">, rồi liên kết: <a href="#lien-he">Liên hệ</a>. Thêm html { scroll-behavior: smooth; } để cuộn mượt.' },
      { q: 'Làm ảnh tự co theo bề ngang khung chứa.', a: 'img { width: 100%; height: auto; }. width 100% co theo khung, height auto giữ đúng tỉ lệ.' },
    ],
  },

  'H12TIN-w25-quiz': {
    topic: 'Dự án — Biểu mẫu liên hệ',
    intro: 'Chào các em! Tuần này ta thêm biểu mẫu liên hệ vào website, dùng các tính năng kiểm tra dữ liệu của HTML5.',
    objectives: [
      'Dựng form liên hệ với các trường cần thiết.',
      'Dùng validation HTML5: type="email", required, maxlength.',
      'Hiểu form gửi dữ liệu đi đâu (action, GET/POST).',
    ],
    theory: [
      { h: 'Form liên hệ tối thiểu' },
      { p: 'Cần ít nhất: họ tên, email, nội dung và nút gửi.' },
      { h: 'Kiểm tra dữ liệu (validation) HTML5' },
      { ul: [
        '<input type="email">: trình duyệt tự kiểm tra định dạng email.',
        'required: bắt buộc nhập trường này.',
        'maxlength="100": giới hạn độ dài tối đa.',
        'placeholder="...": gợi ý nội dung khi ô còn trống.',
      ] },
      { h: 'Gửi dữ liệu' },
      { p: 'Khi nhấn Gửi, dữ liệu được gửi tới địa chỉ trong thuộc tính action theo phương thức GET (hiện trên URL) hoặc POST (kín đáo, dùng cho dữ liệu nhạy cảm).' },
      { note: 'Validation HTML5 chỉ là lớp đầu tiên (phía người dùng); máy chủ vẫn phải kiểm tra lại vì dữ liệu phía trình duyệt có thể bị giả mạo.' },
    ],
    examples: [
      { q: 'Viết form liên hệ có họ tên (bắt buộc) và email (kiểm tra định dạng).', a: '<form method="post" action="lienhe.php">\\n  <input type="text" placeholder="Họ tên" required>\\n  <input type="email" placeholder="Email" required>\\n  <textarea placeholder="Nội dung"></textarea>\\n  <button type="submit">Gửi</button>\\n</form>' },
      { q: 'Khác nhau cơ bản giữa GET và POST khi gửi form?', a: 'GET gắn dữ liệu vào URL (thấy được, dùng cho tìm kiếm). POST gửi kín trong thân yêu cầu, phù hợp dữ liệu nhạy cảm như mật khẩu.' },
    ],
  },

  'H12TIN-w26-quiz': {
    topic: 'Dự án — Định dạng nâng cao bằng CSS',
    intro: 'Các em ơi, tuần này ta "trang điểm" cho website: bo góc, đổ bóng, gradient, hiệu ứng chuyển động và responsive bằng media query.',
    objectives: [
      'Dùng border-radius, box-shadow, gradient.',
      'Tạo hiệu ứng transition khi hover.',
      'Dùng đơn vị tương đối và media query.',
    ],
    theory: [
      { h: 'Hiệu ứng trang trí' },
      { ul: [
        'border-radius: 8px; bo tròn góc.',
        'box-shadow: 0 2px 8px rgba(0,0,0,0.2); đổ bóng cho hộp.',
        'background: linear-gradient(45deg, red, blue); nền chuyển màu.',
      ] },
      { h: 'Hoạt ảnh mượt' },
      { p: 'transition: all .3s ease; làm thay đổi (vd khi hover) diễn ra mượt trong 0.3 giây thay vì đột ngột.' },
      { h: 'Responsive' },
      { ul: [
        'Đơn vị tương đối: rem, em, % thay cho px cố định.',
        'Media query: @media (max-width: 768px) { … } áp dụng style riêng cho màn hình nhỏ.',
      ] },
      { note: 'Thiết kế "mobile-first": viết style cho điện thoại trước, rồi dùng media query mở rộng cho màn hình lớn.' },
    ],
    examples: [
      { q: 'Tạo một nút bo góc, có bóng và đổi mượt khi hover.', a: '.btn {\\n  border-radius: 8px;\\n  box-shadow: 0 2px 6px rgba(0,0,0,.2);\\n  transition: all .3s ease;\\n}\\n.btn:hover { transform: scale(1.05); }' },
      { q: 'Trên màn hình nhỏ hơn 768px, làm chữ nhỏ lại.', a: '@media (max-width: 768px) {\\n  body { font-size: 14px; }\\n}' },
    ],
  },

  'H12TIN-w27-quiz': {
    topic: 'Dự án — Tổ chức tệp tin và đường dẫn',
    intro: 'Chào các em! Khi website lớn dần, ta cần tổ chức thư mục gọn gàng và hiểu đường dẫn tương đối/tuyệt đối để liên kết không bị "gãy".',
    objectives: [
      'Tổ chức thư mục dự án web hợp lí.',
      'Phân biệt đường dẫn tương đối và tuyệt đối.',
      'Đặt tên file/folder theo chuẩn web.',
    ],
    theory: [
      { h: 'Cấu trúc thư mục khuyến nghị' },
      { p: 'index.html ở thư mục gốc, kèm các thư mục con: css/ (tệp style), js/ (JavaScript), images/ (ảnh), pages/ (các trang con).' },
      { h: 'Đường dẫn' },
      { ul: [
        'Tương đối: tính từ vị trí tệp hiện tại. Từ pages/about.html tới css/style.css viết ../css/style.css (../ lùi một cấp).',
        'Tuyệt đối: bắt đầu từ gốc website (/css/style.css) hoặc URL đầy đủ (https://...).',
        'KHÔNG dùng đường dẫn ổ đĩa cục bộ (C:\\...) — khi đưa lên host sẽ không chạy.',
      ] },
      { h: 'Đặt tên web-safe' },
      { p: 'Tên file/folder nên: không dấu, không dấu cách, chữ thường, dùng gạch nối (vd trang-chu.html).' },
      { note: 'Một tệp CSS dùng chung (css/style.css) liên kết vào mọi trang theo nguyên tắc DRY — sửa một nơi, áp dụng khắp website.' },
    ],
    examples: [
      { q: 'Từ pages/lien-he.html liên kết tới css/style.css ở gốc, viết đường dẫn nào?', a: 'href="../css/style.css". Dấu ../ lùi ra khỏi thư mục pages/ về gốc, rồi vào css/.' },
      { q: 'Vì sao không nên đặt tên file là "Bài Tập.HTML"?', a: 'Vì có dấu cách, có viết hoa và có dấu — dễ gây lỗi đường dẫn trên máy chủ. Nên đặt bai-tap.html (chữ thường, gạch nối, không dấu).' },
    ],
  },

  'H12TIN-w28-quiz': {
    topic: 'Dự án — Tích hợp JavaScript cơ bản',
    intro: 'Các em ơi, JavaScript làm website "biết tương tác": phản hồi khi bấm nút, thay đổi nội dung động. Tuần này ta học JS căn bản.',
    objectives: [
      'Hiểu vai trò của JavaScript và cách gắn vào trang.',
      'Truy cập phần tử DOM và xử lí sự kiện.',
      'Lưu dữ liệu với localStorage.',
    ],
    theory: [
      { h: 'JavaScript là gì?' },
      { p: 'JavaScript thêm hành vi (behavior) cho trang: xử lí sự kiện, thay đổi DOM (cấu trúc trang), gọi dữ liệu. Gắn file ngoài bằng <script src="script.js"></script>.' },
      { h: 'Làm việc với DOM' },
      { ul: [
        'document.getElementById("ten"): lấy phần tử theo id.',
        'alert("Xin chào"): hiển thị hộp thoại.',
        'console.log(...): in ra Console để gỡ lỗi.',
      ] },
      { h: 'Xử lí sự kiện và lưu trữ' },
      { ul: [
        'button.onclick = function() { … }; gắn hành động khi bấm nút.',
        'localStorage: lưu dữ liệu trong trình duyệt, giữ lại giữa các lần tải trang.',
        'sessionStorage: tương tự nhưng mất khi đóng tab.',
      ] },
      { note: 'Đặt thẻ <script> ngay trước </body>, hoặc dùng defer, để đảm bảo HTML đã tải xong trước khi JS chạy.' },
    ],
    examples: [
      { q: 'Khi bấm nút có id="nut", hiện hộp thoại "Cảm ơn".', a: 'var nut = document.getElementById("nut");\\nnut.onclick = function() {\\n  alert("Cảm ơn");\\n};' },
      { q: 'Lưu tên người dùng để lần sau vào vẫn nhớ, dùng gì?', a: 'Dùng localStorage: localStorage.setItem("ten", "Lan"); lấy lại bằng localStorage.getItem("ten"). Dữ liệu giữ lại giữa các lần tải trang.' },
    ],
  },

  'H12TIN-w29-quiz': {
    topic: 'Dự án — Kiểm thử và sửa lỗi',
    intro: 'Chào các em! Trước khi xuất bản, website cần được kiểm thử trên nhiều thiết bị, sửa lỗi, và tối ưu tốc độ, accessibility, SEO.',
    objectives: [
      'Kiểm thử giao diện đa thiết bị bằng DevTools.',
      'Tìm và sửa lỗi JavaScript qua Console.',
      'Hiểu accessibility, tối ưu tốc độ và SEO cơ bản.',
    ],
    theory: [
      { h: 'Kiểm thử' },
      { ul: [
        'DevTools (phím F12): chế độ responsive để xem trang trên nhiều kích thước màn hình.',
        'Console trong DevTools: hiển thị lỗi JavaScript để gỡ.',
        'HTML validator của W3C: kiểm tra cú pháp HTML đúng chuẩn.',
      ] },
      { h: 'Accessibility (khả năng tiếp cận)' },
      { p: 'Có alt cho ảnh, độ tương phản màu đủ, label cho input, dùng thẻ ngữ nghĩa — giúp người khuyết tật dùng được website.' },
      { h: 'Tốc độ và SEO' },
      { ul: [
        'Tăng tốc: nén ảnh, gộp file CSS/JS, bật cache. Tránh tải nhiều ảnh độ phân giải cao không cần thiết.',
        'SEO cơ bản: <title> rõ, <meta description>, heading h1-h6 hợp lí, URL ngắn gọn.',
      ] },
      { note: 'Kiểm thử trên thiết bị thật (điện thoại) vẫn cần thiết, vì giả lập DevTools không phản ánh hết hiệu năng và cảm ứng.' },
    ],
    examples: [
      { q: 'Trang chạy lỗi mà không rõ vì sao. Bạn mở công cụ nào trước?', a: 'Mở DevTools bằng F12, vào tab Console để xem thông báo lỗi JavaScript (kèm số dòng), từ đó tìm và sửa.' },
      { q: 'Nêu 3 việc cơ bản để tối ưu tốc độ tải trang.', a: 'Nén ảnh (dùng WebP), gộp/giảm số file CSS-JS, bật cache trình duyệt. Tránh tải ảnh độ phân giải cao không cần thiết.' },
    ],
  },

  'H12TIN-w30-quiz': {
    topic: 'Dự án — Xuất bản website',
    intro: 'Các em ơi, tuần này ta đưa website lên Internet để mọi người truy cập được, dùng dịch vụ miễn phí như GitHub Pages.',
    objectives: [
      'Hiểu cần gì để website lên Internet.',
      'Dùng GitHub Pages và lệnh Git cơ bản.',
      'Biết đăng ký tên miền .vn và lấy HTTPS miễn phí.',
    ],
    theory: [
      { h: 'Để website lên Internet' },
      { p: 'Cần tên miền + hosting. Với website tĩnh, có thể dùng dịch vụ miễn phí: GitHub Pages, Netlify, Vercel.' },
      { h: 'GitHub Pages và Git' },
      { ul: [
        'GitHub Pages: dịch vụ hosting website tĩnh miễn phí từ GitHub.',
        'Đẩy code lên GitHub bằng Git: git add → git commit → git push.',
        'Cập nhật: sửa code → commit → push, GitHub Pages tự build lại.',
      ] },
      { h: 'Tên miền và HTTPS' },
      { ul: [
        'Tên miền .vn đăng ký qua nhà đăng ký được Trung tâm Internet Việt Nam (VNNIC) uỷ quyền.',
        'Chứng chỉ HTTPS miễn phí: Let\'s Encrypt.',
      ] },
      { note: 'GitHub Pages chỉ phục vụ website tĩnh (HTML/CSS/JS). Nếu cần xử lí phía máy chủ (PHP, cơ sở dữ liệu) thì phải dùng hosting khác.' },
    ],
    examples: [
      { q: 'Nêu các bước Git cơ bản để đẩy code dự án lên GitHub.', a: 'git add . (đưa thay đổi vào vùng chờ) → git commit -m "thông điệp" (ghi lại) → git push (đẩy lên GitHub).' },
      { q: 'Bạn muốn website có ổ khoá HTTPS mà không tốn tiền. Dùng gì?', a: 'Dùng chứng chỉ miễn phí của Let\'s Encrypt (nhiều dịch vụ như GitHub Pages, Netlify đã tự cấp HTTPS sẵn).' },
    ],
  },

  'H12TIN-w31-quiz': {
    topic: 'Dự án — Trải nghiệm người dùng (UX) và an toàn',
    intro: 'Chào các em! Một website tốt không chỉ đẹp mà còn dễ dùng và an toàn. Tuần này ta học UX, quyền riêng tư và phòng chống tấn công web.',
    objectives: [
      'Hiểu khái niệm UX và thiết kế hướng người dùng.',
      'Tôn trọng quyền riêng tư người dùng.',
      'Nhận biết và phòng chống tấn công XSS.',
    ],
    theory: [
      { h: 'Trải nghiệm người dùng (UX)' },
      { ul: [
        'UX (User Experience): cảm xúc và mức độ hài lòng của người dùng khi tương tác với sản phẩm.',
        'Thiết kế hướng người dùng (user-centered): đặt người dùng làm trung tâm, không phải lập trình viên hay doanh nghiệp.',
      ] },
      { h: 'Quyền riêng tư' },
      { p: 'Cần thông báo cookie, không thu thập dữ liệu trái phép, mã hoá dữ liệu nhạy cảm — "privacy by design".' },
      { h: 'An toàn web' },
      { ul: [
        'XSS (Cross-Site Scripting): kẻ tấn công chèn mã JavaScript độc vào trang để chạy trên trình duyệt người khác.',
        'Chống XSS: lọc và escape dữ liệu người dùng trước khi hiển thị (không tin mọi input).',
        'Form đăng nhập: dùng HTTPS, lưu mật khẩu dạng băm (hash bằng bcrypt), không lưu mật khẩu thô.',
      ] },
      { note: 'Nguyên tắc vàng bảo mật: "Không bao giờ tin tưởng dữ liệu từ người dùng" — luôn kiểm tra và làm sạch.' },
    ],
    examples: [
      { q: 'XSS là gì và cách phòng tránh cơ bản?', a: 'XSS là việc chèn mã JavaScript độc vào trang để chạy trên trình duyệt người dùng khác. Phòng tránh: lọc/escape mọi dữ liệu người dùng nhập trước khi hiển thị.' },
      { q: 'Lưu mật khẩu người dùng thế nào cho an toàn?', a: 'Không lưu mật khẩu thô. Băm (hash) bằng thuật toán như bcrypt và lưu giá trị băm; truyền qua HTTPS để chống nghe lén.' },
    ],
  },

  'H12TIN-w32-quiz': {
    topic: 'Dự án — Tích hợp với dịch vụ ngoài',
    intro: 'Các em ơi, website có thể "mạnh hơn" khi tích hợp dịch vụ bên ngoài: bản đồ, mạng xã hội, phân tích traffic, gọi API. Tuần này ta tìm hiểu.',
    objectives: [
      'Nhúng bản đồ, nút mạng xã hội.',
      'Hiểu API và định dạng dữ liệu web (JSON).',
      'Gọi API bằng JavaScript fetch().',
    ],
    theory: [
      { h: 'Nhúng dịch vụ ngoài' },
      { ul: [
        'Bản đồ: Google Maps Embed bằng <iframe>.',
        'Nút like/share: Facebook Social Plugins (iframe hoặc SDK).',
        'Phân tích lượt truy cập: Google Analytics, Cloudflare Analytics, Plausible.',
      ] },
      { h: 'API là gì?' },
      { p: 'API (Application Programming Interface) là giao diện để các phần mềm trao đổi dữ liệu với nhau. Dữ liệu web thường ở định dạng JSON (phổ biến nhất) hoặc XML.' },
      { h: 'Gọi API trong JavaScript' },
      { p: 'Dùng fetch():\\nfetch("https://api.example.com/data")\\n  .then(res => res.json())\\n  .then(data => console.log(data));' },
      { note: 'JSON (JavaScript Object Notation) gọn nhẹ, dễ đọc, là định dạng trao đổi dữ liệu phổ biến nhất của API web hiện nay.' },
    ],
    examples: [
      { q: 'API là gì? Cho ví dụ.', a: 'API là cách để các phần mềm trao đổi dữ liệu. Ví dụ: website thời tiết gọi API của nhà cung cấp dữ liệu để lấy nhiệt độ rồi hiển thị cho người dùng.' },
      { q: 'Viết đoạn JavaScript gọi API và in dữ liệu ra console.', a: 'fetch("https://api.example.com/info")\\n  .then(res => res.json())\\n  .then(data => console.log(data));' },
    ],
  },

  'H12TIN-w33-quiz': {
    topic: 'Dự án — Trình bày và bảo vệ',
    intro: 'Chào các em! Sản phẩm đã xong, giờ là lúc trình bày và bảo vệ dự án. Tuần này ta học cách thuyết trình, viết tài liệu và làm việc nhóm.',
    objectives: [
      'Biết cách trình bày, demo và bảo vệ dự án website.',
      'Viết tài liệu README cho dự án.',
      'Hiểu tiêu chí đánh giá và quy trình cải tiến.',
    ],
    theory: [
      { h: 'Trình bày và bảo vệ' },
      { p: 'Khi bảo vệ: demo website trực tiếp, giải thích cấu trúc, nội dung, công nghệ dùng, khó khăn gặp phải và cách giải quyết.' },
      { h: 'Tài liệu dự án' },
      { p: 'README (README.md) nên mô tả: mục tiêu, hướng dẫn cài đặt và sử dụng, công nghệ sử dụng, thành viên nhóm.' },
      { h: 'Đánh giá và cải tiến' },
      { ul: [
        'Tiêu chí: nội dung đầy đủ, đúng yêu cầu, dễ dùng, đẹp, tải nhanh, an toàn.',
        'Làm việc nhóm: phân vai (Front-end / Back-end / Design / Content), dùng Git để cộng tác.',
        'Cải tiến lặp: ghi nhận phản hồi người dùng → phân loại → sửa qua nhiều vòng.',
      ] },
      { note: 'Khi sản phẩm có lỗi sau khi xuất bản: vá nhanh, thông báo người dùng, rút kinh nghiệm (post-mortem) — không giấu giếm hay đổ lỗi.' },
    ],
    examples: [
      { q: 'Một bài bảo vệ dự án website tốt nên trình bày những gì?', a: 'Demo website chạy thật, giải thích cấu trúc trang, nội dung, công nghệ dùng (HTML/CSS/JS), khó khăn gặp phải và cách đã giải quyết.' },
      { q: 'Nhóm 4 người làm dự án nên phối hợp ra sao?', a: 'Phân vai (Front-end, Back-end, Design, Content) và dùng Git để cùng làm việc trên cùng mã nguồn, tránh ghi đè lẫn nhau.' },
    ],
  },

  'H12TIN-w34-quiz': {
    topic: 'Ôn tập cả năm',
    intro: 'Các em ơi, tuần này ta hệ thống lại toàn bộ kiến thức cả năm: AI, mạng, HTML, CSS, JavaScript và quy trình làm website.',
    objectives: [
      'Ôn các thẻ HTML và thuộc tính CSS cốt lõi.',
      'Nhớ lệnh JavaScript cơ bản.',
      'Hệ thống kiến thức mạng và AI.',
    ],
    theory: [
      { h: 'HTML cốt lõi' },
      { ul: [
        '<a href>: liên kết. <img alt>: ảnh. <table>/<tr>/<td>/<th>: bảng.',
        'Thẻ ngữ nghĩa: header, nav, main, section, article, aside, footer.',
      ] },
      { h: 'CSS cốt lõi' },
      { ul: [
        'font-size: cỡ chữ; color: màu chữ; bộ chọn class dùng dấu chấm.',
        'Box model: Content-Padding-Border-Margin. Flex 1D, Grid 2D.',
      ] },
      { h: 'JavaScript và mạng' },
      { ul: [
        'console.log() in ra console; getElementById lấy phần tử; fetch() gọi API.',
        'HTTP nằm ở tầng Ứng dụng của mô hình TCP/IP.',
        'AI hẹp chuyên một việc; AGI tổng quát — chưa đạt được.',
      ] },
      { note: 'Cách ôn tốt nhất: chọn một website nhỏ đã làm, đọc lại từng dòng HTML/CSS/JS và tự giải thích nó làm gì.' },
    ],
    examples: [
      { q: 'In ra console giá trị "Hello" bằng JavaScript.', a: 'console.log("Hello"); — console.log dùng để in ra Console của trình duyệt, phục vụ gỡ lỗi.' },
      { q: 'HTTP nằm ở tầng nào trong mô hình TCP/IP?', a: 'Tầng Ứng dụng (Application). Đây là tầng trên cùng, nơi các giao thức như HTTP, HTTPS, DNS hoạt động.' },
    ],
  },

  'H12TIN-w35-quiz': {
    topic: 'Thi học kỳ II — Bảo vệ dự án',
    intro: 'Chào các em! Đây là tuần cuối: kiểm tra HK2 kết hợp bảo vệ dự án website. Cùng tổng kết những điểm then chốt nhé.',
    objectives: [
      'Vận dụng tổng hợp kiến thức làm web.',
      'Bảo vệ và đánh giá được một website hoàn chỉnh.',
      'Nắm tiêu chí của một website tốt.',
    ],
    theory: [
      { h: 'Những điểm then chốt' },
      { ul: [
        'index.html là tệp khởi đầu mặc định của website.',
        'Để website chạy trên Internet: tên miền + hosting (+ HTTPS).',
        'Thẻ ngữ nghĩa cho điều hướng là <nav>.',
      ] },
      { h: 'Bố cục và an toàn' },
      { ul: [
        'Flexbox: bố cục 1 chiều; Grid: bố cục 2 chiều.',
        'Chống XSS bằng escape/sanitize input và output.',
      ] },
      { h: 'Tiêu chí website tốt' },
      { p: 'Một website tốt cần: nội dung đầy đủ, dễ dùng, đẹp, tải nhanh, an toàn và có khả năng tiếp cận (accessibility).' },
      { note: 'Khi bảo vệ, tự tin demo và sẵn sàng nhận góp ý — biết điểm yếu của sản phẩm và hướng cải tiến là một điểm cộng lớn.' },
    ],
    examples: [
      { q: 'Liệt kê những thành phần cần để một website hoạt động trên Internet.', a: 'Tên miền (domain) + hosting để lưu trữ và phục vụ tệp, kèm HTTPS để an toàn. Thiếu hosting thì website không thể truy cập công khai.' },
      { q: 'Một website được đánh giá là "tốt" dựa trên những tiêu chí nào?', a: 'Nội dung đầy đủ và đúng yêu cầu, dễ sử dụng, giao diện đẹp, tải nhanh, an toàn (HTTPS, chống XSS) và có khả năng tiếp cận.' },
    ],
  },

  'H12TIN-w36-quiz': {
    topic: 'Kết thúc Tin Học THPT — Thế giới số và bạn',
    intro: 'Tuần cuối năm học Tin Học — hãy nhìn lại hành trình từ AI đến web: bạn đã học cách máy tính "nghĩ", cách mạng lưới kết nối, cách xây dựng trang web. Nhưng quan trọng hơn — bạn đã hiểu mình là ai trong thế giới số và trách nhiệm đi kèm với điều đó.',
    objectives: [
      'Hệ thống hoá kiến thức Tin Học 3 năm THPT: từ cơ bản đến ứng dụng thực tế.',
      'Nhận ra vai trò của Tin Học và công nghệ số trong sự phát triển cá nhân và xã hội.',
      'Xây dựng tư duy công dân số có trách nhiệm và định hướng nghề nghiệp liên quan đến CNTT.',
    ],
    theory: [
      { h: 'Bản đồ Tin Học 3 năm THPT' },
      { ul: [
        'Lớp 10: Nhập môn CNTT, mạng máy tính, An toàn thông tin, hướng nghiệp CNTT, lập trình cơ bản (Python/Scratch).',
        'Lớp 11: Cơ sở dữ liệu, SQL cơ bản, thiết kế dữ liệu, ứng dụng văn phòng nâng cao, đạo đức số.',
        'Lớp 12 (ICT): AI cơ bản, mạng xã hội và bảo vệ dữ liệu cá nhân, HTML/CSS cơ bản, dự án web hoàn chỉnh, hướng nghiệp CNTT.',
      ] },
      { h: 'Kỹ năng số em đã có sau THPT' },
      { ul: [
        'Tư duy thuật toán: Phân tích vấn đề → chia nhỏ → giải từng bước — áp dụng được trong mọi lĩnh vực.',
        'Bảo mật cơ bản: Biết dùng mật khẩu mạnh, nhận diện phishing, không chia sẻ thông tin cá nhân tuỳ tiện.',
        'Tạo nội dung số: Thiết kế web HTML/CSS, trình bày dữ liệu, làm báo cáo có hình ảnh chuyên nghiệp.',
        'Đọc hiểu AI: Biết AI hoạt động dựa trên dữ liệu và thuật toán, không có "ma thuật" — hiểu giúp dùng AI đúng cách.',
      ] },
      { h: 'CNTT — ngành nghề của thế kỉ 21' },
      { ul: [
        'Kỹ sư phần mềm, Developer: Xây dựng ứng dụng — nhu cầu tuyển dụng cao nhất toàn cầu đến 2030.',
        'Khoa học dữ liệu / AI: Phân tích dữ liệu lớn, xây dựng mô hình ML — lương cao nhất trong CNTT.',
        'An ninh mạng / Cybersecurity: Bảo vệ hệ thống khỏi tấn công — thiếu hụt nhân lực trầm trọng toàn cầu.',
        'UX/UI Design: Thiết kế giao diện người dùng — giao điểm giữa công nghệ và nghệ thuật.',
        'Quản lý dự án CNTT, Phân tích nghiệp vụ: Không cần code giỏi nhưng cần hiểu cả hai thế giới công nghệ và kinh doanh.',
      ] },
      { h: 'Công dân số có trách nhiệm' },
      { p: 'Trong thế giới số, mọi hành động đều để lại dấu vết. Chia sẻ thông tin sai có thể gây hại cho người khác; bình luận tiêu cực có thể phá hoại tinh thần ai đó; dùng AI để tạo nội dung giả mạo là vi phạm đạo đức và pháp luật. Hiểu công nghệ là bước đầu — sử dụng nó một cách có đạo đức mới là điều quan trọng hơn.' },
      { note: 'Tin Học không chỉ là học lập trình hay sửa máy tính — đó là học cách tư duy có hệ thống, giải quyết vấn đề sáng tạo và sống có trách nhiệm trong thế giới kết nối. Những kỹ năng đó không bao giờ lỗi thời.' },
    ],
    examples: [
      { q: 'Trí tuệ nhân tạo (AI) hiện tại làm được gì và chưa làm được gì? Tại sao AI không thể thay thế hoàn toàn con người?', a: 'AI hiện tại (2026) làm được: nhận dạng hình ảnh/giọng nói, dịch ngôn ngữ, tạo văn bản/hình ảnh, chơi cờ vua/Go tốt hơn con người, phát hiện ung thư từ ảnh X-quang. Chưa làm được: suy luận nhân quả thực sự (hiểu "tại sao"), sáng tạo có ý thức và cảm xúc thật, thích ứng linh hoạt với tình huống chưa từng gặp, giao tiếp với hiểu biết về bối cảnh văn hoá sâu. AI không thể thay thế hoàn toàn vì: thiếu ý thức và đạo đức tự phát, cần dữ liệu lớn để học (con người có thể học từ 1 ví dụ), không chịu trách nhiệm pháp lý và đạo đức.' },
      { q: 'Một trang web bạn muốn tạo — đề xuất cấu trúc HTML/CSS cơ bản cho trang chủ của nó.', a: 'Cấu trúc HTML cơ bản: <header> chứa logo + navigation bar (<nav>); <main> chia thành các <section> (hero/banner, features, testimonials, CTA); <footer> chứa links và copyright. CSS: Dùng Flexbox hoặc Grid để layout; CSS custom properties (--color-primary) cho màu sắc nhất quán; media query @media (max-width: 768px) cho responsive mobile. Nội dung phụ thuộc mục đích: portfolio cá nhân, cửa hàng online hay blog đều có cấu trúc riêng phù hợp.' },
      { q: 'Em muốn học CNTT sâu hơn sau tốt nghiệp. Nên bắt đầu từ đâu ngoài chương trình đại học?', a: 'Lộ trình tự học song song đại học: (1) Chọn ngôn ngữ đầu tiên: Python (dễ nhất, dùng nhiều nhất trong AI/Data) hoặc JavaScript (web + mobile). (2) Học qua dự án thực tế: xây blog cá nhân, tạo chatbot đơn giản, phân tích dữ liệu CSV. (3) Nền tảng học: CS50 Harvard (miễn phí, nền tảng vững nhất), freeCodeCamp (web), Kaggle (data). (4) GitHub: đưa tất cả dự án lên GitHub — đó là portfolio thực sự với nhà tuyển dụng. (5) Tham gia cộng đồng: hackathon, câu lạc bộ lập trình, Discord tech community.' },
    ],
  },
};
