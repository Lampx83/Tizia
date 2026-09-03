// S7TIN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S7TIN_EXAMS = {
 "S7TIN-exam-gk1": {
  "id": "S7TIN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Tin học 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Tin học 7",
  "questions": [
   {
    "stem": "Mạng máy tính là gì?",
    "choices": [
     "Tập hợp các máy tính và thiết bị được kết nối với nhau để chia sẻ dữ liệu và tài nguyên",
     "Một chiếc máy tính có cấu hình mạnh nhất trong trường học",
     "Phần mềm dùng để soạn thảo văn bản",
     "Thiết bị dùng để in tài liệu"
    ],
    "answer": 0,
    "explanation": "Mạng máy tính là tập hợp các máy tính và thiết bị kết nối với nhau nhằm trao đổi dữ liệu và dùng chung tài nguyên (máy in, ổ đĩa, dữ liệu...).",
    "choiceFeedback": [
     "Đúng — đây chính là định nghĩa mạng máy tính.",
     "Sai — đó chỉ là một máy tính đơn lẻ, không phải mạng.",
     "Sai — đó là một loại phần mềm ứng dụng, không phải mạng.",
     "Sai — đó là một thiết bị ngoại vi, không phải mạng máy tính."
    ]
   },
   {
    "stem": "Thành phần nào sau đây KHÔNG phải là thiết bị kết nối trong mạng máy tính?",
    "choices": [
     "Bộ định tuyến (Router)",
     "Dây cáp mạng",
     "Bộ chuyển mạch (Switch)",
     "Bàn phím"
    ],
    "answer": 3,
    "explanation": "Router, cáp mạng, switch là thiết bị kết nối mạng; bàn phím là thiết bị nhập dữ liệu, không liên quan đến kết nối mạng.",
    "choiceFeedback": [
     "Sai — router là thiết bị định tuyến dữ liệu trong mạng.",
     "Sai — cáp mạng dùng để truyền tín hiệu giữa các thiết bị.",
     "Sai — switch dùng để kết nối nhiều máy trong mạng LAN.",
     "Đúng — bàn phím là thiết bị nhập liệu, không phải thiết bị mạng."
    ]
   },
   {
    "stem": "Lợi ích nào sau đây là của việc kết nối mạng máy tính?",
    "choices": [
     "Dùng chung máy in và dữ liệu giữa nhiều máy tính",
     "Tăng tốc độ xử lý của CPU",
     "Tự động sửa lỗi chính tả văn bản",
     "Giảm dung lượng ổ cứng"
    ],
    "answer": 0,
    "explanation": "Một lợi ích quan trọng của mạng máy tính là cho phép nhiều máy tính dùng chung tài nguyên như máy in, dữ liệu, kết nối Internet.",
    "choiceFeedback": [
     "Đúng — chia sẻ tài nguyên là lợi ích cơ bản của mạng máy tính.",
     "Sai — tốc độ CPU không liên quan đến việc kết nối mạng.",
     "Sai — đó là chức năng của phần mềm soạn thảo, không phải mạng.",
     "Sai — mạng không làm giảm dung lượng ổ cứng."
    ]
   },
   {
    "stem": "Mạng LAN là loại mạng có đặc điểm nào sau đây?",
    "choices": [
     "Kết nối các máy tính trong phạm vi nhỏ như một phòng học, một tòa nhà",
     "Kết nối các máy tính trên toàn thế giới",
     "Chỉ dùng cho điện thoại di động",
     "Không cần thiết bị kết nối"
    ],
    "answer": 0,
    "explanation": "LAN (Local Area Network) là mạng cục bộ, kết nối các máy tính trong phạm vi địa lý nhỏ như phòng học, tòa nhà, trường học.",
    "choiceFeedback": [
     "Đúng — đây là đặc điểm của mạng LAN.",
     "Sai — đó là đặc điểm của mạng diện rộng (WAN) hoặc Internet.",
     "Sai — LAN không giới hạn chỉ cho điện thoại di động.",
     "Sai — mạng LAN vẫn cần cáp mạng, switch, wifi để kết nối."
    ]
   },
   {
    "stem": "Mạng nào có quy mô lớn nhất, kết nối các mạng máy tính trên toàn cầu?",
    "choices": [
     "Internet",
     "Mạng LAN của trường học",
     "Mạng nội bộ của một công ty nhỏ",
     "Mạng wifi gia đình"
    ],
    "answer": 0,
    "explanation": "Internet là mạng WAN có quy mô toàn cầu, kết nối hàng triệu mạng máy tính khác nhau trên thế giới.",
    "choiceFeedback": [
     "Đúng — Internet là mạng có quy mô toàn cầu, lớn nhất.",
     "Sai — mạng LAN trường học chỉ có quy mô nhỏ, cục bộ.",
     "Sai — mạng nội bộ công ty cũng chỉ ở quy mô nhỏ, không phải toàn cầu.",
     "Sai — mạng wifi gia đình là mạng LAN quy mô rất nhỏ."
    ]
   },
   {
    "stem": "Để các máy tính trên Internet có thể trao đổi dữ liệu với nhau, chúng cần tuân theo điều gì?",
    "choices": [
     "Cùng một bộ quy tắc truyền thông (giao thức) chung",
     "Cùng một hãng sản xuất máy tính",
     "Cùng một loại hệ điều hành",
     "Cùng một loại bàn phím"
    ],
    "answer": 0,
    "explanation": "Các máy tính trên Internet trao đổi dữ liệu dựa trên bộ giao thức chung TCP/IP, bất kể hãng sản xuất hay hệ điều hành.",
    "choiceFeedback": [
     "Đúng — giao thức TCP/IP là quy tắc chung để các máy tính trao đổi dữ liệu trên Internet.",
     "Sai — các máy tính khác hãng vẫn kết nối Internet được.",
     "Sai — hệ điều hành khác nhau vẫn có thể kết nối Internet.",
     "Sai — bàn phím không liên quan đến việc kết nối Internet."
    ]
   },
   {
    "stem": "Mỗi thiết bị kết nối Internet được định danh bằng",
    "choices": [
     "Địa chỉ IP",
     "Số điện thoại bàn",
     "Mã vạch sản phẩm",
     "Số CMND của người dùng"
    ],
    "answer": 0,
    "explanation": "Địa chỉ IP (Internet Protocol) là dãy số dùng để định danh duy nhất mỗi thiết bị khi tham gia mạng Internet.",
    "choiceFeedback": [
     "Đúng — địa chỉ IP dùng để định danh thiết bị trên Internet.",
     "Sai — số điện thoại bàn không dùng để định danh thiết bị mạng.",
     "Sai — mã vạch dùng cho sản phẩm hàng hoá, không liên quan Internet.",
     "Sai — Internet không định danh thiết bị theo CMND của người dùng."
    ]
   },
   {
    "stem": "Đơn vị/tổ chức cung cấp cho người dùng khả năng kết nối vào Internet được gọi là",
    "choices": [
     "Nhà cung cấp dịch vụ Internet (ISP)",
     "Máy tìm kiếm",
     "Trình duyệt web",
     "Hệ điều hành"
    ],
    "answer": 0,
    "explanation": "ISP (Internet Service Provider) là nhà cung cấp dịch vụ kết nối Internet cho người dùng, ví dụ VNPT, Viettel, FPT.",
    "choiceFeedback": [
     "Đúng — ISP là đơn vị cung cấp dịch vụ kết nối Internet.",
     "Sai — máy tìm kiếm dùng để tìm thông tin, không cung cấp kết nối mạng.",
     "Sai — trình duyệt web là phần mềm truy cập web, không cung cấp kết nối mạng.",
     "Sai — hệ điều hành quản lý máy tính, không cung cấp dịch vụ Internet."
    ]
   },
   {
    "stem": "Dịch vụ nào sau đây KHÔNG phải là một dịch vụ trên Internet?",
    "choices": [
     "In tài liệu trực tiếp bằng máy in kim",
     "Thư điện tử (Email)",
     "World Wide Web (WWW)",
     "Lưu trữ đám mây (Cloud storage)"
    ],
    "answer": 0,
    "explanation": "In tài liệu bằng máy in là thao tác phần cứng cục bộ, không phải dịch vụ trên Internet; email, WWW, lưu trữ đám mây là các dịch vụ Internet phổ biến.",
    "choiceFeedback": [
     "Đúng — in tài liệu là thao tác với máy in, không phải dịch vụ Internet.",
     "Sai — Email là dịch vụ thư điện tử trên Internet.",
     "Sai — WWW là dịch vụ web trên Internet.",
     "Sai — lưu trữ đám mây là dịch vụ phổ biến trên Internet."
    ]
   },
   {
    "stem": "Để truy cập các trang web trên Internet, em cần sử dụng phần mềm nào?",
    "choices": [
     "Trình duyệt web",
     "Phần mềm nén tệp",
     "Phần mềm bảng tính",
     "Phần mềm diệt vi rút"
    ],
    "answer": 0,
    "explanation": "Trình duyệt web (Chrome, Firefox, Edge...) là phần mềm giúp người dùng truy cập và xem nội dung các trang web (WWW).",
    "choiceFeedback": [
     "Đúng — trình duyệt web dùng để truy cập các trang web.",
     "Sai — phần mềm nén tệp dùng để nén/giải nén, không dùng để truy cập web.",
     "Sai — phần mềm bảng tính dùng để tính toán, không dùng để duyệt web.",
     "Sai — phần mềm diệt vi rút dùng để bảo vệ máy tính, không dùng để duyệt web."
    ]
   },
   {
    "stem": "An muốn gửi một báo cáo dạng tệp Word cho bạn ở xa và nhận phản hồi ngay trong ngày. Dịch vụ Internet nào phù hợp nhất?",
    "choices": [
     "Thư điện tử (Email)",
     "In tài liệu",
     "Ghi đĩa CD",
     "Đến tận nhà đưa trực tiếp"
    ],
    "answer": 0,
    "explanation": "Thư điện tử cho phép gửi tệp đính kèm nhanh chóng và nhận phản hồi trong thời gian ngắn qua Internet.",
    "choiceFeedback": [
     "Đúng — email là cách nhanh và tiện lợi nhất để gửi tệp qua Internet.",
     "Sai — in tài liệu không giúp gửi tệp cho bạn ở xa.",
     "Sai — ghi đĩa CD không tiện lợi và không phải dịch vụ Internet.",
     "Sai — cách này mất nhiều thời gian và không dùng Internet."
    ]
   },
   {
    "stem": "Công cụ nào giúp em tìm kiếm thông tin nhanh chóng trên Internet bằng cách nhập từ khoá?",
    "choices": [
     "Máy tìm kiếm (search engine)",
     "Phần mềm bảng tính",
     "Máy in",
     "Ổ đĩa flash"
    ],
    "answer": 0,
    "explanation": "Máy tìm kiếm như Google, Bing giúp người dùng tìm thông tin bằng cách nhập từ khoá liên quan.",
    "choiceFeedback": [
     "Đúng — máy tìm kiếm dùng để tra cứu thông tin qua từ khoá.",
     "Sai — phần mềm bảng tính dùng để tính toán, không tìm kiếm thông tin web.",
     "Sai — máy in dùng để in ấn, không liên quan tìm kiếm.",
     "Sai — ổ đĩa flash dùng lưu trữ dữ liệu, không tìm kiếm thông tin."
    ]
   },
   {
    "stem": "Khi muốn tìm chính xác cụm từ 'an toàn thông tin' (không tách rời các từ), em nên nhập vào ô tìm kiếm như thế nào?",
    "choices": [
     "\"an toàn thông tin\" (đặt trong dấu ngoặc kép)",
     "an toàn thông tin (không có ký hiệu gì)",
     "an OR toàn OR thông tin",
     "AN TOAN THONG TIN viết không dấu"
    ],
    "answer": 0,
    "explanation": "Đặt cụm từ trong dấu ngoặc kép giúp máy tìm kiếm tìm chính xác cụm từ đó, không tách rời từng từ.",
    "choiceFeedback": [
     "Đúng — dấu ngoặc kép giúp tìm chính xác cả cụm từ.",
     "Sai — cách này khiến máy tìm kiếm có thể tách rời và tìm từng từ riêng lẻ.",
     "Sai — dùng OR sẽ tìm kết quả chứa bất kỳ từ nào, không chính xác cụm từ.",
     "Sai — bỏ dấu tiếng Việt có thể làm sai lệch kết quả tìm kiếm."
    ]
   },
   {
    "stem": "Thông tin cá nhân nào sau đây KHÔNG nên chia sẻ công khai trên mạng xã hội?",
    "choices": [
     "Số điện thoại và địa chỉ nhà riêng",
     "Sở thích về môn học yêu thích",
     "Tên trường đang học (nếu trường cho phép công khai)",
     "Ảnh đại diện phù hợp lứa tuổi"
    ],
    "answer": 0,
    "explanation": "Số điện thoại và địa chỉ nhà là thông tin nhạy cảm, nếu công khai có thể bị kẻ xấu lợi dụng, gây nguy hiểm cho bản thân.",
    "choiceFeedback": [
     "Đúng — đây là thông tin nhạy cảm cần được bảo mật.",
     "Sai — sở thích môn học là thông tin ít nhạy cảm, có thể chia sẻ.",
     "Sai — đây không phải thông tin nhạy cảm cần giấu kín tuyệt đối.",
     "Sai — ảnh đại diện phù hợp thường không gây nguy hiểm."
    ]
   },
   {
    "stem": "Việc đặt mật khẩu như thế nào được coi là an toàn?",
    "choices": [
     "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt, đủ dài",
     "Dùng ngày sinh của bản thân để dễ nhớ",
     "Dùng chung một mật khẩu cho mọi tài khoản",
     "Dùng dãy số đơn giản như 123456"
    ],
    "answer": 0,
    "explanation": "Mật khẩu an toàn cần đủ dài, kết hợp nhiều loại ký tự (chữ hoa, chữ thường, số, ký tự đặc biệt) để khó bị đoán hoặc dò tìm.",
    "choiceFeedback": [
     "Đúng — mật khẩu mạnh cần kết hợp nhiều loại ký tự và đủ dài.",
     "Sai — ngày sinh dễ bị người khác đoán ra.",
     "Sai — dùng chung mật khẩu khiến mọi tài khoản gặp rủi ro nếu một tài khoản bị lộ.",
     "Sai — dãy số đơn giản rất dễ bị dò ra."
    ]
   },
   {
    "stem": "Một người lạ trên mạng xin số điện thoại và địa chỉ nhà của em để 'gửi quà tặng miễn phí'. Em nên làm gì?",
    "choices": [
     "Từ chối cung cấp và báo cho người lớn tin cậy biết",
     "Cung cấp ngay vì được nhận quà miễn phí",
     "Gửi thêm cả mật khẩu tài khoản mạng xã hội để nhận quà nhanh hơn",
     "Hẹn gặp riêng người đó để nhận quà"
    ],
    "answer": 0,
    "explanation": "Đây là dấu hiệu lừa đảo phổ biến; cần từ chối chia sẻ thông tin cá nhân và báo ngay cho cha mẹ, thầy cô để được hỗ trợ.",
    "choiceFeedback": [
     "Đúng — đây là cách xử lý an toàn khi gặp tình huống nghi ngờ lừa đảo.",
     "Sai — đây có thể là chiêu trò lừa đảo để chiếm đoạt thông tin cá nhân.",
     "Sai — không bao giờ được chia sẻ mật khẩu tài khoản cho bất kỳ ai.",
     "Sai — hẹn gặp người lạ trên mạng tiềm ẩn nguy hiểm cho bản thân."
    ]
   },
   {
    "stem": "Trong hệ điều hành, nơi lưu trữ và tổ chức các tệp theo dạng phân cấp được gọi là",
    "choices": [
     "Cây thư mục",
     "Bộ nhớ RAM",
     "Bộ vi xử lý (CPU)",
     "Card màn hình"
    ],
    "answer": 0,
    "explanation": "Cây thư mục (thư mục gốc và các thư mục con) là cách tổ chức, quản lý tệp theo cấu trúc phân cấp trên máy tính.",
    "choiceFeedback": [
     "Đúng — cây thư mục là cấu trúc tổ chức tệp theo phân cấp.",
     "Sai — RAM là bộ nhớ tạm thời khi máy hoạt động, không phải nơi tổ chức tệp lâu dài.",
     "Sai — CPU là bộ xử lý trung tâm, không liên quan tổ chức tệp.",
     "Sai — card màn hình xử lý hiển thị hình ảnh, không tổ chức tệp."
    ]
   },
   {
    "stem": "Đường dẫn (path) của một tệp cho biết điều gì?",
    "choices": [
     "Vị trí của tệp đó trong cây thư mục",
     "Dung lượng của tệp",
     "Ngày tạo tệp",
     "Định dạng màu sắc của tệp"
    ],
    "answer": 0,
    "explanation": "Đường dẫn chỉ ra vị trí chính xác của tệp trong hệ thống thư mục, ví dụ C:\\Documents\\BaiTap\\vanban.docx.",
    "choiceFeedback": [
     "Đúng — đường dẫn cho biết vị trí lưu trữ của tệp.",
     "Sai — dung lượng tệp được xem trong thuộc tính tệp, không phải đường dẫn.",
     "Sai — ngày tạo là một thuộc tính khác của tệp, không phải đường dẫn.",
     "Sai — đường dẫn không thể hiện màu sắc của tệp."
    ]
   },
   {
    "stem": "Bạn Lan muốn gửi một tệp ảnh dung lượng 5MB cho bạn học khác đang ở nhà. Cách nào sau đây là phù hợp và nhanh chóng nhất?",
    "choices": [
     "Gửi qua email hoặc ứng dụng nhắn tin có đính kèm tệp",
     "In ảnh ra giấy rồi mang đến tận nhà",
     "Đọc mô tả ảnh cho bạn nghe qua điện thoại",
     "Vẽ lại bức ảnh đó rồi gửi qua bưu điện"
    ],
    "answer": 0,
    "explanation": "Gửi tệp qua email hoặc ứng dụng nhắn tin có tính năng đính kèm tệp là cách nhanh, tiện lợi để trao đổi tệp qua mạng.",
    "choiceFeedback": [
     "Đúng — đây là cách trao đổi tệp qua mạng nhanh và tiện lợi nhất.",
     "Sai — in và mang đến tận nhà mất nhiều thời gian, không hiệu quả.",
     "Sai — mô tả bằng lời không thể truyền tải chính xác nội dung ảnh.",
     "Sai — cách này tốn thời gian, mất chất lượng và không cần thiết."
    ]
   },
   {
    "stem": "Khi tìm kiếm một tệp cụ thể trên máy tính có hàng nghìn tệp, cách hiệu quả nhất là",
    "choices": [
     "Dùng công cụ tìm kiếm tệp của hệ điều hành, nhập đúng hoặc gần đúng tên tệp",
     "Mở lần lượt từng thư mục để xem thủ công",
     "Xoá bớt các thư mục khác cho dễ tìm",
     "Đổi tên toàn bộ các tệp về cùng một tên"
    ],
    "answer": 0,
    "explanation": "Sử dụng công cụ tìm kiếm tệp tích hợp sẵn trong hệ điều hành (nhập tên hoặc từ khoá liên quan) giúp tìm tệp nhanh và chính xác hơn nhiều so với duyệt thủ công.",
    "choiceFeedback": [
     "Đúng — đây là cách tìm tệp nhanh và hiệu quả nhất.",
     "Sai — cách này rất mất thời gian khi có nhiều tệp và thư mục.",
     "Sai — xoá dữ liệu chỉ để dễ tìm là hành động rủi ro, có thể mất dữ liệu quan trọng.",
     "Sai — đổi tên toàn bộ tệp về cùng tên sẽ gây nhầm lẫn và mất khả năng phân biệt."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S7TIN-exam-ck1": {
  "id": "S7TIN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Tin học 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Tin học 7",
  "questions": [
   {
    "stem": "Yếu tố nào sau đây thể hiện đúng vai trò của mạng máy tính?",
    "choices": [
     "Giúp nhiều máy tính trao đổi dữ liệu và dùng chung tài nguyên",
     "Giúp máy tính chạy nhanh hơn gấp đôi",
     "Thay thế hoàn toàn bàn phím và chuột",
     "Tự động diệt vi rút cho máy tính"
    ],
    "answer": 0,
    "explanation": "Vai trò cơ bản của mạng máy tính là kết nối các máy tính để trao đổi dữ liệu và chia sẻ tài nguyên chung.",
    "choiceFeedback": [
     "Đúng — đây là vai trò chính của mạng máy tính.",
     "Sai — mạng không làm tăng tốc độ xử lý của máy tính.",
     "Sai — mạng không liên quan đến thiết bị nhập như bàn phím, chuột.",
     "Sai — diệt vi rút là chức năng của phần mềm bảo mật, không phải của mạng."
    ]
   },
   {
    "stem": "Mạng diện rộng (WAN) khác với mạng LAN chủ yếu ở điểm nào?",
    "choices": [
     "WAN có phạm vi kết nối rộng hơn nhiều, có thể qua nhiều tỉnh, quốc gia",
     "WAN chỉ dùng được cho điện thoại thông minh",
     "WAN không cần thiết bị kết nối mạng",
     "WAN có tốc độ luôn nhanh hơn LAN"
    ],
    "answer": 0,
    "explanation": "WAN (Wide Area Network) kết nối các thiết bị trên phạm vi địa lý rộng lớn, khác với LAN chỉ trong phạm vi nhỏ như một tòa nhà.",
    "choiceFeedback": [
     "Đúng — sự khác biệt chính là phạm vi kết nối rộng hơn.",
     "Sai — WAN dùng cho mọi loại thiết bị, không riêng điện thoại.",
     "Sai — WAN vẫn cần các thiết bị kết nối như router, đường truyền.",
     "Sai — tốc độ không phải là yếu tố phân biệt LAN và WAN, và LAN thường có tốc độ nội bộ nhanh hơn."
    ]
   },
   {
    "stem": "Giao thức TCP/IP có vai trò gì trên Internet?",
    "choices": [
     "Quy định cách các máy tính đóng gói và truyền dữ liệu với nhau",
     "Quy định màu sắc hiển thị của trang web",
     "Quy định phông chữ dùng trong văn bản",
     "Quy định giá cước sử dụng Internet"
    ],
    "answer": 0,
    "explanation": "TCP/IP là bộ giao thức chuẩn quy định cách dữ liệu được đóng gói, gửi và nhận giữa các thiết bị trên Internet.",
    "choiceFeedback": [
     "Đúng — đây chính là vai trò của giao thức TCP/IP.",
     "Sai — màu sắc trang web do CSS/HTML quy định, không phải giao thức mạng.",
     "Sai — phông chữ văn bản do phần mềm soạn thảo quy định.",
     "Sai — giá cước Internet do nhà cung cấp dịch vụ quyết định, không phải giao thức."
    ]
   },
   {
    "stem": "Dịch vụ nào cho phép nhiều người cùng nhìn thấy và chỉnh sửa một tài liệu trực tuyến theo thời gian thực?",
    "choices": [
     "Ứng dụng soạn thảo văn bản trực tuyến (lưu trên đám mây)",
     "Máy in mạng",
     "Phần mềm nén tệp",
     "Ổ đĩa CD"
    ],
    "answer": 0,
    "explanation": "Các ứng dụng văn phòng trực tuyến lưu trữ trên đám mây cho phép nhiều người cùng xem và chỉnh sửa tài liệu đồng thời qua Internet.",
    "choiceFeedback": [
     "Đúng — đây là dịch vụ cộng tác trực tuyến qua Internet.",
     "Sai — máy in mạng chỉ dùng để in ấn, không phải chỉnh sửa tài liệu.",
     "Sai — phần mềm nén tệp dùng để nén dữ liệu, không hỗ trợ chỉnh sửa cùng lúc.",
     "Sai — đĩa CD là thiết bị lưu trữ vật lý, không hỗ trợ chỉnh sửa trực tuyến."
    ]
   },
   {
    "stem": "Khi tìm kiếm thông tin trên Internet, em nên làm gì để đánh giá độ tin cậy của kết quả?",
    "choices": [
     "Kiểm tra nguồn thông tin, tác giả và đối chiếu nhiều nguồn khác nhau",
     "Tin ngay kết quả đầu tiên xuất hiện",
     "Chỉ đọc tiêu đề mà không xem nội dung",
     "Chia sẻ ngay lập tức mà không kiểm tra"
    ],
    "answer": 0,
    "explanation": "Để đánh giá độ tin cậy, cần xem xét nguồn phát hành, tác giả, và so sánh đối chiếu với các nguồn thông tin khác.",
    "choiceFeedback": [
     "Đúng — đây là cách đánh giá độ tin cậy thông tin đúng đắn.",
     "Sai — kết quả đầu tiên không hẳn là chính xác hoặc đáng tin cậy nhất.",
     "Sai — chỉ đọc tiêu đề dễ hiểu sai hoặc thiếu thông tin quan trọng.",
     "Sai — chia sẻ thông tin chưa kiểm chứng có thể lan truyền tin giả."
    ]
   },
   {
    "stem": "Vì sao không nên sử dụng cùng một mật khẩu cho nhiều tài khoản khác nhau?",
    "choices": [
     "Vì nếu một tài khoản bị lộ mật khẩu, các tài khoản khác cũng sẽ gặp nguy hiểm",
     "Vì sẽ làm máy tính chạy chậm hơn",
     "Vì mỗi trang web yêu cầu độ dài mật khẩu khác nhau",
     "Vì mật khẩu giống nhau sẽ tự động bị xoá"
    ],
    "answer": 0,
    "explanation": "Nếu dùng chung mật khẩu, khi một tài khoản bị lộ, kẻ xấu có thể dùng mật khẩu đó để xâm nhập các tài khoản khác của em.",
    "choiceFeedback": [
     "Đúng — đây là lý do quan trọng nhất về bảo mật.",
     "Sai — việc dùng mật khẩu không ảnh hưởng đến tốc độ máy tính.",
     "Sai — đây không phải lý do chính, dù có thể một số trang có yêu cầu khác nhau.",
     "Sai — mật khẩu không tự động bị xoá vì lý do trùng lặp."
    ]
   },
   {
    "stem": "Việc đặt tên tệp và thư mục rõ ràng, có ý nghĩa mang lại lợi ích gì?",
    "choices": [
     "Giúp dễ dàng tìm kiếm và quản lý dữ liệu sau này",
     "Giúp tệp có dung lượng nhỏ hơn",
     "Giúp máy tính chạy nhanh hơn",
     "Giúp tệp tự động được sao lưu"
    ],
    "answer": 0,
    "explanation": "Đặt tên tệp/thư mục rõ ràng, có ý nghĩa giúp người dùng dễ nhận biết, tìm kiếm và quản lý dữ liệu một cách khoa học.",
    "choiceFeedback": [
     "Đúng — đây là lợi ích chính của việc đặt tên khoa học.",
     "Sai — tên tệp không ảnh hưởng đến dung lượng tệp.",
     "Sai — tên tệp không liên quan đến tốc độ xử lý của máy tính.",
     "Sai — đặt tên không tự động kích hoạt tính năng sao lưu."
    ]
   },
   {
    "stem": "Khi trao đổi tệp qua mạng LAN nội bộ (không qua Internet), hai máy tính cần điều kiện gì?",
    "choices": [
     "Cùng kết nối vào một mạng và được cấp quyền chia sẻ tệp/thư mục",
     "Phải dùng chung một bàn phím",
     "Phải có cùng một địa chỉ email",
     "Phải cùng cài đặt hệ điều hành giống hệt nhau"
    ],
    "answer": 0,
    "explanation": "Để chia sẻ tệp qua mạng LAN, các máy cần cùng kết nối vào mạng đó và thiết lập quyền chia sẻ (sharing) phù hợp.",
    "choiceFeedback": [
     "Đúng — đây là điều kiện cần thiết để chia sẻ tệp qua LAN.",
     "Sai — bàn phím là thiết bị riêng của từng máy, không liên quan việc chia sẻ tệp.",
     "Sai — chia sẻ qua LAN không nhất thiết cần địa chỉ email.",
     "Sai — các máy có hệ điều hành khác nhau vẫn có thể chia sẻ tệp qua mạng LAN."
    ]
   },
   {
    "stem": "Mục đích chính của việc nén tệp là gì?",
    "choices": [
     "Giảm dung lượng tệp và gộp nhiều tệp thành một để thuận tiện lưu trữ, gửi đi",
     "Làm tệp có chất lượng cao hơn",
     "Xoá bớt nội dung không cần thiết trong tệp",
     "Chuyển tệp văn bản thành tệp âm thanh"
    ],
    "answer": 0,
    "explanation": "Nén tệp giúp giảm dung lượng lưu trữ và có thể gộp nhiều tệp/thư mục thành một tệp nén duy nhất, thuận tiện cho việc lưu trữ và gửi qua mạng.",
    "choiceFeedback": [
     "Đúng — đây là mục đích chính của việc nén tệp.",
     "Sai — nén tệp không làm tăng chất lượng nội dung.",
     "Sai — nén tệp không xoá nội dung, dữ liệu vẫn được giữ nguyên (có thể giải nén lại).",
     "Sai — nén tệp không thay đổi định dạng loại tệp."
    ]
   },
   {
    "stem": "Định dạng tệp nén phổ biến nào sau đây thường gặp?",
    "choices": [
     ".zip hoặc .rar",
     ".docx",
     ".mp3",
     ".jpg"
    ],
    "answer": 0,
    "explanation": "Các định dạng .zip và .rar là định dạng tệp nén phổ biến, được tạo ra bởi các phần mềm như WinRAR, 7-Zip.",
    "choiceFeedback": [
     "Đúng — đây là hai định dạng nén tệp phổ biến nhất.",
     "Sai — .docx là định dạng tệp văn bản Word, không phải tệp nén.",
     "Sai — .mp3 là định dạng tệp âm thanh.",
     "Sai — .jpg là định dạng tệp hình ảnh."
    ]
   },
   {
    "stem": "Hành vi nào sau đây vi phạm đạo đức và pháp luật khi sử dụng Internet?",
    "choices": [
     "Sao chép bài viết của người khác và đăng lại như của mình mà không xin phép",
     "Trích dẫn nguồn khi sử dụng thông tin của người khác",
     "Đăng bài chia sẻ kiến thức do bản thân tự viết",
     "Xin phép tác giả trước khi sử dụng lại nội dung"
    ],
    "answer": 0,
    "explanation": "Sao chép nội dung của người khác và nhận là của mình (đạo văn) là hành vi vi phạm bản quyền và đạo đức khi sử dụng Internet.",
    "choiceFeedback": [
     "Đúng — đây là hành vi vi phạm bản quyền (đạo văn).",
     "Sai — trích dẫn nguồn là hành vi đúng đắn, tôn trọng bản quyền.",
     "Sai — đăng nội dung tự viết là hành vi hợp pháp và được khuyến khích.",
     "Sai — xin phép trước khi sử dụng là hành vi tôn trọng bản quyền."
    ]
   },
   {
    "stem": "Ứng xử nào sau đây thể hiện văn hoá giao tiếp đúng mực trên mạng xã hội?",
    "choices": [
     "Bình luận lịch sự, tôn trọng ý kiến của người khác dù không đồng tình",
     "Dùng lời lẽ xúc phạm khi tranh luận",
     "Đăng ảnh chế giễu bạn bè lên nhóm chung",
     "Bình luận công kích cá nhân người khác"
    ],
    "answer": 0,
    "explanation": "Ứng xử văn minh trên mạng xã hội là giao tiếp lịch sự, tôn trọng người khác, kể cả khi có ý kiến trái chiều.",
    "choiceFeedback": [
     "Đúng — đây là cách ứng xử văn minh, đúng mực trên mạng.",
     "Sai — xúc phạm người khác là hành vi thiếu văn hoá và có thể vi phạm pháp luật.",
     "Sai — chế giễu bạn bè có thể coi là bắt nạt trực tuyến (cyberbullying).",
     "Sai — công kích cá nhân là hành vi tiêu cực, thiếu tôn trọng người khác."
    ]
   },
   {
    "stem": "Dấu hiệu nào sau đây cho thấy một email có khả năng là lừa đảo (phishing)?",
    "choices": [
     "Yêu cầu cung cấp gấp mật khẩu hoặc thông tin tài khoản qua đường link lạ",
     "Gửi từ địa chỉ email quen thuộc của bạn bè, nội dung bình thường",
     "Thông báo lịch học từ nhà trường qua email chính thức",
     "Email xác nhận đơn hàng mà em đã đặt mua"
    ],
    "answer": 0,
    "explanation": "Email lừa đảo (phishing) thường tạo cảm giác gấp gáp, yêu cầu cung cấp thông tin nhạy cảm qua đường link không rõ nguồn gốc.",
    "choiceFeedback": [
     "Đúng — đây là dấu hiệu điển hình của email lừa đảo.",
     "Sai — email bình thường từ người quen ít có dấu hiệu đáng ngờ này.",
     "Sai — thông báo chính thức từ nhà trường thường đáng tin cậy.",
     "Sai — email xác nhận đơn hàng đã đặt là hợp lệ, không đáng ngờ."
    ]
   },
   {
    "stem": "Trong phần mềm soạn thảo văn bản, chức năng căn lề và giãn dòng thuộc nhóm thao tác nào?",
    "choices": [
     "Định dạng văn bản",
     "Chèn hình ảnh",
     "Chèn bảng biểu",
     "Kiểm tra chính tả"
    ],
    "answer": 0,
    "explanation": "Căn lề, giãn dòng, cỡ chữ, kiểu chữ đều là các thao tác thuộc nhóm định dạng văn bản.",
    "choiceFeedback": [
     "Đúng — đây là các thao tác định dạng văn bản cơ bản.",
     "Sai — chèn hình ảnh là thao tác chèn đối tượng, khác với định dạng chữ/đoạn văn.",
     "Sai — chèn bảng biểu là thao tác tạo bảng, không phải định dạng đoạn văn.",
     "Sai — kiểm tra chính tả là công cụ riêng, không liên quan căn lề, giãn dòng."
    ]
   },
   {
    "stem": "Khi chèn hình ảnh vào văn bản, tùy chọn 'bọc văn bản quanh ảnh' (wrap text) dùng để làm gì?",
    "choices": [
     "Quy định cách văn bản hiển thị xung quanh vị trí của ảnh",
     "Thay đổi màu sắc của ảnh",
     "Nén dung lượng ảnh",
     "Xoá ảnh khỏi văn bản"
    ],
    "answer": 0,
    "explanation": "Wrap text cho phép người dùng chọn cách văn bản bao quanh hình ảnh, ví dụ chữ chạy quanh ảnh hoặc ảnh nằm trên một dòng riêng.",
    "choiceFeedback": [
     "Đúng — đây chính là chức năng của bọc văn bản quanh ảnh.",
     "Sai — thay đổi màu ảnh là chức năng chỉnh sửa ảnh, không phải wrap text.",
     "Sai — nén dung lượng ảnh là một chức năng khác trong xử lý ảnh.",
     "Sai — wrap text không dùng để xoá ảnh."
    ]
   },
   {
    "stem": "Để tạo một bảng gồm 3 cột và 5 hàng trong văn bản, em cần sử dụng chức năng nào?",
    "choices": [
     "Insert Table (Chèn bảng)",
     "Insert Picture (Chèn ảnh)",
     "Spell Check (Kiểm tra chính tả)",
     "Page Setup (Thiết lập trang)"
    ],
    "answer": 0,
    "explanation": "Insert Table là chức năng dùng để chèn bảng với số hàng và cột tuỳ chọn vào văn bản.",
    "choiceFeedback": [
     "Đúng — đây là chức năng để chèn bảng vào văn bản.",
     "Sai — Insert Picture dùng để chèn hình ảnh, không phải bảng.",
     "Sai — Spell Check dùng để kiểm tra lỗi chính tả.",
     "Sai — Page Setup dùng để thiết lập khổ giấy, lề trang."
    ]
   },
   {
    "stem": "Danh sách liệt kê các bước thực hiện theo đúng thứ tự (1, 2, 3...) nên sử dụng kiểu danh sách nào?",
    "choices": [
     "Danh sách có thứ tự (Numbered list)",
     "Danh sách không thứ tự (Bulleted list)",
     "Bảng biểu",
     "Chú thích cuối trang"
    ],
    "answer": 0,
    "explanation": "Khi cần thể hiện trình tự các bước, nên dùng danh sách có thứ tự (đánh số 1, 2, 3...) để người đọc dễ theo dõi đúng trình tự.",
    "choiceFeedback": [
     "Đúng — danh sách có thứ tự phù hợp khi cần thể hiện trình tự các bước.",
     "Sai — danh sách không thứ tự (dấu chấm) không thể hiện rõ trình tự trước sau.",
     "Sai — bảng biểu phù hợp hơn cho dữ liệu dạng hàng cột, không phải liệt kê bước.",
     "Sai — chú thích cuối trang dùng để giải thích thêm, không phải liệt kê các bước."
    ]
   },
   {
    "stem": "Khi soạn một tờ báo tường có tiêu đề, hình ảnh minh hoạ và danh sách các hoạt động, em nên kết hợp những kỹ năng nào?",
    "choices": [
     "Định dạng chữ, chèn ảnh và tạo danh sách phân cấp",
     "Chỉ cần gõ chữ không định dạng gì",
     "Chỉ cần chèn ảnh mà không cần chữ",
     "Chỉ cần in đậm toàn bộ văn bản"
    ],
    "answer": 0,
    "explanation": "Một văn bản hoàn chỉnh như báo tường cần kết hợp nhiều kỹ năng: định dạng chữ, chèn hình ảnh minh hoạ, và tạo danh sách để trình bày rõ ràng, hấp dẫn.",
    "choiceFeedback": [
     "Đúng — cần kết hợp nhiều kỹ năng soạn thảo để có văn bản hoàn chỉnh, đẹp mắt.",
     "Sai — văn bản không định dạng sẽ kém trực quan và khó theo dõi.",
     "Sai — thiếu chữ giải thích sẽ làm văn bản không đầy đủ thông tin.",
     "Sai — in đậm toàn bộ khiến văn bản không có điểm nhấn, khó đọc."
    ]
   },
   {
    "stem": "Trong học kì I, hai nội dung lớn mà em đã học là gì?",
    "choices": [
     "Mạng máy tính, Internet, an toàn thông tin và soạn thảo văn bản nâng cao",
     "Lập trình Python và trí tuệ nhân tạo",
     "Thiết kế đồ hoạ 3D và làm phim hoạt hình",
     "Lắp ráp phần cứng máy tính"
    ],
    "answer": 0,
    "explanation": "Nội dung học kì I của Tin học 7 tập trung vào mạng máy tính, Internet, an toàn thông tin và kỹ năng soạn thảo văn bản nâng cao.",
    "choiceFeedback": [
     "Đúng — đây chính xác là hai mảng nội dung lớn của học kì I.",
     "Sai — nội dung lập trình được học ở học kì II với thuật toán, không phải học kì I.",
     "Sai — thiết kế đồ hoạ 3D không nằm trong chương trình Tin học 7.",
     "Sai — lắp ráp phần cứng không phải nội dung trọng tâm học kì I."
    ]
   },
   {
    "stem": "Bạn Hùng nhận được một tin nhắn lạ mời 'đăng nhập tài khoản để nhận quà miễn phí' kèm đường link. Xét theo các kiến thức về an toàn thông tin và phòng chống lừa đảo đã học, Hùng nên làm gì?",
    "choices": [
     "Không bấm vào đường link lạ và không cung cấp thông tin đăng nhập, nên báo với người lớn",
     "Bấm vào link và đăng nhập ngay để nhận quà nhanh",
     "Chuyển tiếp tin nhắn cho càng nhiều bạn bè càng tốt để ai cũng được quà",
     "Trả lời tin nhắn kèm số điện thoại và địa chỉ nhà để được gửi quà"
    ],
    "answer": 0,
    "explanation": "Đây là dấu hiệu lừa đảo trực tuyến điển hình. Cần cảnh giác, không bấm link lạ, không cung cấp thông tin cá nhân/tài khoản, và nên thông báo cho người lớn tin cậy.",
    "choiceFeedback": [
     "Đúng — đây là cách xử lý an toàn, đúng đắn trước nghi ngờ lừa đảo.",
     "Sai — bấm vào link lạ và đăng nhập có thể khiến tài khoản bị đánh cắp.",
     "Sai — chuyển tiếp tin nhắn lừa đảo sẽ khiến nhiều người khác gặp rủi ro hơn.",
     "Sai — cung cấp thông tin cá nhân cho nguồn không rõ ràng rất nguy hiểm."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S7TIN-exam-gk2": {
  "id": "S7TIN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Tin học 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Tin học 7",
  "questions": [
   {
    "stem": "Trong phần mềm bảng tính, giao điểm giữa một hàng và một cột được gọi là gì?",
    "choices": [
     "Ô tính (cell)",
     "Trang tính (sheet)",
     "Bảng tính (workbook)",
     "Thanh công thức"
    ],
    "answer": 0,
    "explanation": "Ô tính (cell) là giao điểm giữa một hàng và một cột trong trang tính, mỗi ô có một địa chỉ riêng.",
    "choiceFeedback": [
     "Đúng — đây là định nghĩa của ô tính.",
     "Sai — trang tính (sheet) là một tờ chứa nhiều ô, không phải một ô.",
     "Sai — bảng tính (workbook) là tệp chứa nhiều trang tính.",
     "Sai — thanh công thức hiển thị nội dung của ô đang chọn, không phải bản thân ô."
    ]
   },
   {
    "stem": "Địa chỉ ô B3 trong bảng tính cho biết điều gì?",
    "choices": [
     "Ô nằm ở cột B, hàng 3",
     "Ô nằm ở hàng B, cột 3",
     "Ô có giá trị bằng 3",
     "Ô được định dạng màu xanh (Blue)"
    ],
    "answer": 0,
    "explanation": "Địa chỉ ô gồm tên cột (chữ) và số hàng, ví dụ B3 nghĩa là ô thuộc cột B, hàng 3.",
    "choiceFeedback": [
     "Đúng — đây là cách đọc đúng địa chỉ ô trong bảng tính.",
     "Sai — trong bảng tính, cột được ký hiệu bằng chữ, hàng bằng số, không phải ngược lại.",
     "Sai — địa chỉ ô không thể hiện giá trị chứa trong ô.",
     "Sai — chữ B trong địa chỉ ô là tên cột, không phải màu sắc."
    ]
   },
   {
    "stem": "Khi nhập một dãy số vào ô tính nhưng muốn nó được hiểu là văn bản (không tính toán), em nên làm gì?",
    "choices": [
     "Định dạng ô đó theo kiểu Text (văn bản) trước khi nhập",
     "Nhập kèm dấu cộng ở đầu dãy số",
     "Gõ số bằng phông chữ in đậm",
     "Nhập số và nhấn phím Delete"
    ],
    "answer": 0,
    "explanation": "Định dạng ô kiểu Text giúp dãy số nhập vào được lưu dưới dạng văn bản, không bị tính toán như số học.",
    "choiceFeedback": [
     "Đúng — định dạng Text là cách xử lý đúng cho trường hợp này.",
     "Sai — thêm dấu cộng không biến số thành văn bản đúng cách.",
     "Sai — in đậm chỉ thay đổi hình thức hiển thị, không thay đổi kiểu dữ liệu.",
     "Sai — nhấn Delete sẽ xoá dữ liệu, không giúp định dạng thành văn bản."
    ]
   },
   {
    "stem": "Việc định dạng ô tính (đổi màu nền, kiểu chữ, đường viền) có tác dụng gì?",
    "choices": [
     "Giúp bảng tính rõ ràng, dễ đọc và nổi bật thông tin quan trọng",
     "Làm thay đổi giá trị tính toán trong ô",
     "Tăng tốc độ tính toán của công thức",
     "Tự động sửa lỗi trong công thức"
    ],
    "answer": 0,
    "explanation": "Định dạng ô chỉ thay đổi hình thức hiển thị (màu sắc, kiểu chữ, đường viền...), giúp bảng tính trực quan hơn mà không ảnh hưởng đến giá trị hay công thức tính toán.",
    "choiceFeedback": [
     "Đúng — đây là tác dụng chính của việc định dạng ô.",
     "Sai — định dạng chỉ thay đổi hình thức, không làm thay đổi giá trị dữ liệu.",
     "Sai — định dạng không ảnh hưởng đến tốc độ tính toán của công thức.",
     "Sai — định dạng không có chức năng sửa lỗi công thức."
    ]
   },
   {
    "stem": "Một công thức trong Excel luôn phải bắt đầu bằng ký hiệu nào?",
    "choices": [
     "Dấu bằng (=)",
     "Dấu cộng (+)",
     "Dấu chấm hỏi (?)",
     "Dấu ngoặc đơn (()"
    ],
    "answer": 0,
    "explanation": "Mọi công thức trong bảng tính đều bắt đầu bằng dấu \"=\" để phần mềm nhận biết đó là công thức cần tính toán.",
    "choiceFeedback": [
     "Đúng — dấu bằng luôn là ký hiệu bắt đầu công thức.",
     "Sai — dấu cộng chỉ là toán tử cộng, không dùng để mở đầu công thức.",
     "Sai — dấu chấm hỏi không liên quan đến công thức.",
     "Sai — dấu ngoặc đơn dùng để nhóm phép tính, không phải ký hiệu mở đầu."
    ]
   },
   {
    "stem": "Ô A1 chứa giá trị 8, ô A2 chứa giá trị 5. Công thức =A1-A2*2 cho kết quả là bao nhiêu?",
    "choices": [
     "-2",
     "6",
     "11",
     "26"
    ],
    "answer": 0,
    "explanation": "Theo thứ tự ưu tiên phép toán, nhân trước trừ sau: A2*2 = 5*2 =10; A1-10 = 8-10 = -2.",
    "choiceFeedback": [
     "Đúng — thực hiện nhân trước (5×2=10), rồi trừ (8-10=-2).",
     "Sai — có thể đã tính (A1-A2)*2 sai thứ tự phép toán.",
     "Sai — kết quả này không đúng thứ tự ưu tiên phép toán.",
     "Sai — kết quả này có thể do cộng nhầm thay vì trừ."
    ]
   },
   {
    "stem": "Hàm nào dùng để tính tổng các giá trị trong một vùng ô?",
    "choices": [
     "=SUM(vùng ô)",
     "=AVERAGE(vùng ô)",
     "=MAX(vùng ô)",
     "=COUNT(vùng ô)"
    ],
    "answer": 0,
    "explanation": "Hàm SUM dùng để tính tổng các giá trị số trong vùng ô được chọn.",
    "choiceFeedback": [
     "Đúng — SUM là hàm tính tổng.",
     "Sai — AVERAGE dùng để tính trung bình cộng, không phải tổng.",
     "Sai — MAX dùng để tìm giá trị lớn nhất.",
     "Sai — COUNT dùng để đếm số lượng ô chứa số."
    ]
   },
   {
    "stem": "Vùng ô B2:B6 lần lượt chứa các giá trị 6, 8, 10, 8, 8. Kết quả của công thức =AVERAGE(B2:B6) là bao nhiêu?",
    "choices": [
     "8",
     "6",
     "10",
     "40"
    ],
    "answer": 0,
    "explanation": "Trung bình cộng = (6+8+10+8+8)/5 = 40/5 = 8.",
    "choiceFeedback": [
     "Đúng — tổng 5 giá trị là 40, chia cho 5 ô được kết quả 8.",
     "Sai — 6 chỉ là giá trị nhỏ nhất trong dãy, không phải trung bình cộng.",
     "Sai — 10 chỉ là giá trị lớn nhất trong dãy, không phải trung bình cộng.",
     "Sai — 40 là tổng các giá trị, chưa chia cho số lượng ô (5)."
    ]
   },
   {
    "stem": "Để tính điểm trung bình môn của một học sinh từ 3 cột điểm miệng, điểm 15 phút và điểm cuối kì (giả sử trọng số bằng nhau), hàm nào phù hợp nhất?",
    "choices": [
     "=AVERAGE(vùng chứa 3 cột điểm)",
     "=COUNT(vùng chứa 3 cột điểm)",
     "=MAX(vùng chứa 3 cột điểm)",
     "=MIN(vùng chứa 3 cột điểm)"
    ],
    "answer": 0,
    "explanation": "Khi các cột điểm có trọng số bằng nhau, hàm AVERAGE giúp tính trung bình cộng nhanh và chính xác.",
    "choiceFeedback": [
     "Đúng — AVERAGE phù hợp để tính điểm trung bình khi trọng số bằng nhau.",
     "Sai — COUNT chỉ đếm số ô có dữ liệu, không tính điểm trung bình.",
     "Sai — MAX chỉ tìm điểm cao nhất, không phải điểm trung bình.",
     "Sai — MIN chỉ tìm điểm thấp nhất, không phải điểm trung bình."
    ]
   },
   {
    "stem": "Vùng ô C2:C5 chứa các giá trị 7, 9, 5, 10. Hàm =MAX(C2:C5) trả về kết quả nào?",
    "choices": [
     "10",
     "5",
     "7",
     "31"
    ],
    "answer": 0,
    "explanation": "Hàm MAX trả về giá trị lớn nhất trong vùng ô, ở đây là 10.",
    "choiceFeedback": [
     "Đúng — 10 là giá trị lớn nhất trong vùng dữ liệu.",
     "Sai — 5 là giá trị nhỏ nhất, đó là kết quả của hàm MIN.",
     "Sai — 7 chỉ là một trong các giá trị, không phải giá trị lớn nhất.",
     "Sai — 31 là tổng các giá trị, đó là kết quả của hàm SUM."
    ]
   },
   {
    "stem": "Hàm COUNT trong bảng tính dùng để làm gì?",
    "choices": [
     "Đếm số lượng ô chứa dữ liệu kiểu số trong một vùng",
     "Tính tổng các giá trị số",
     "Tìm giá trị nhỏ nhất",
     "Sắp xếp dữ liệu tăng dần"
    ],
    "answer": 0,
    "explanation": "Hàm COUNT đếm số lượng ô có chứa giá trị số trong vùng dữ liệu được chọn.",
    "choiceFeedback": [
     "Đúng — đây chính là chức năng của hàm COUNT.",
     "Sai — tính tổng là chức năng của hàm SUM.",
     "Sai — tìm giá trị nhỏ nhất là chức năng của hàm MIN.",
     "Sai — sắp xếp dữ liệu là một chức năng khác, không phải hàm COUNT."
    ]
   },
   {
    "stem": "Cấu trúc chung của hàm IF trong bảng tính là gì?",
    "choices": [
     "=IF(điều kiện, giá trị nếu đúng, giá trị nếu sai)",
     "=IF(giá trị 1, giá trị 2, giá trị 3, giá trị 4)",
     "=IF(vùng ô cần tính tổng)",
     "=IF(vùng ô cần đếm)"
    ],
    "answer": 0,
    "explanation": "Hàm IF có cú pháp: =IF(điều kiện, giá trị trả về nếu điều kiện đúng, giá trị trả về nếu điều kiện sai).",
    "choiceFeedback": [
     "Đúng — đây đúng là cấu trúc của hàm IF.",
     "Sai — hàm IF chỉ có 3 phần: điều kiện, giá trị đúng, giá trị sai.",
     "Sai — đây là cách dùng gần giống hàm SUM, không phải IF.",
     "Sai — đây là cách dùng gần giống hàm COUNT, không phải IF."
    ]
   },
   {
    "stem": "Ô D2 chứa điểm trung bình của học sinh là 4.5. Công thức =IF(D2>=5,\"Đạt\",\"Chưa đạt\") tại ô D2 sẽ cho kết quả gì?",
    "choices": [
     "Chưa đạt",
     "Đạt",
     "4.5",
     "Lỗi công thức"
    ],
    "answer": 0,
    "explanation": "Vì D2 = 4.5 không thỏa mãn điều kiện D2>=5 (điều kiện sai), hàm IF trả về giá trị ứng với trường hợp sai là \"Chưa đạt\".",
    "choiceFeedback": [
     "Đúng — vì 4.5 < 5 nên điều kiện sai, kết quả trả về là \"Chưa đạt\".",
     "Sai — \"Đạt\" chỉ được trả về khi điều kiện D2>=5 đúng.",
     "Sai — công thức trả về văn bản, không phải giá trị số 4.5.",
     "Sai — công thức này viết đúng cú pháp, không có lỗi."
    ]
   },
   {
    "stem": "Muốn phân loại học sinh là 'Học sinh giỏi' nếu điểm trung bình từ 8.0 trở lên, còn lại là 'Chưa đạt loại giỏi', em nên dùng hàm nào?",
    "choices": [
     "IF",
     "SUM",
     "COUNT",
     "MAX"
    ],
    "answer": 0,
    "explanation": "Đây là bài toán kiểm tra điều kiện (>=8.0) để phân loại kết quả, phù hợp sử dụng hàm IF.",
    "choiceFeedback": [
     "Đúng — hàm IF dùng để kiểm tra điều kiện và phân loại kết quả.",
     "Sai — SUM dùng để tính tổng, không kiểm tra điều kiện phân loại.",
     "Sai — COUNT dùng để đếm ô, không kiểm tra điều kiện phân loại.",
     "Sai — MAX dùng để tìm giá trị lớn nhất, không phân loại theo điều kiện."
    ]
   },
   {
    "stem": "Chức năng lọc (Filter) trong bảng tính dùng để làm gì?",
    "choices": [
     "Hiển thị các dòng dữ liệu thỏa mãn điều kiện được chọn, ẩn các dòng còn lại",
     "Xoá vĩnh viễn các dòng không thỏa mãn điều kiện",
     "Tính tổng toàn bộ dữ liệu trong bảng",
     "Đổi màu toàn bộ bảng dữ liệu"
    ],
    "answer": 0,
    "explanation": "Chức năng Filter cho phép chỉ hiển thị các dòng thỏa mãn điều kiện lọc, các dòng còn lại tạm thời bị ẩn đi (không bị xoá).",
    "choiceFeedback": [
     "Đúng — đây chính là chức năng của Filter.",
     "Sai — Filter chỉ ẩn tạm thời, không xoá dữ liệu.",
     "Sai — tính tổng là chức năng của hàm SUM, không phải Filter.",
     "Sai — đổi màu là chức năng định dạng, không phải Filter."
    ]
   },
   {
    "stem": "Khi sắp xếp cột điểm theo thứ tự giảm dần, học sinh có điểm cao nhất sẽ nằm ở vị trí nào?",
    "choices": [
     "Dòng đầu tiên của vùng dữ liệu đã sắp xếp",
     "Dòng cuối cùng của vùng dữ liệu đã sắp xếp",
     "Giữa bảng dữ liệu",
     "Vị trí ngẫu nhiên, không xác định"
    ],
    "answer": 0,
    "explanation": "Sắp xếp giảm dần (từ lớn đến nhỏ) sẽ đưa giá trị lớn nhất lên dòng đầu tiên của vùng dữ liệu.",
    "choiceFeedback": [
     "Đúng — sắp xếp giảm dần đưa giá trị lớn nhất lên đầu tiên.",
     "Sai — dòng cuối cùng sẽ là giá trị nhỏ nhất khi sắp xếp giảm dần.",
     "Sai — sắp xếp luôn đưa các giá trị theo đúng thứ tự tăng/giảm dần, không phải ở giữa.",
     "Sai — kết quả sắp xếp là có quy luật, không phải ngẫu nhiên."
    ]
   },
   {
    "stem": "Để so sánh trực quan sự thay đổi của doanh thu theo từng tháng trong năm, loại biểu đồ nào phù hợp nhất?",
    "choices": [
     "Biểu đồ đường (Line chart)",
     "Biểu đồ tròn (Pie chart)",
     "Không cần biểu đồ",
     "Bảng màu (Color scale)"
    ],
    "answer": 0,
    "explanation": "Biểu đồ đường phù hợp để thể hiện xu hướng thay đổi của một đại lượng theo thời gian, ví dụ doanh thu theo tháng.",
    "choiceFeedback": [
     "Đúng — biểu đồ đường thể hiện rõ xu hướng thay đổi theo thời gian.",
     "Sai — biểu đồ tròn phù hợp thể hiện tỉ lệ phần trăm của các phần trong tổng thể, không phải xu hướng theo thời gian.",
     "Sai — biểu đồ giúp trực quan hoá dữ liệu dễ hiểu hơn nhiều so với chỉ nhìn bảng số.",
     "Sai — bảng màu không phải là biểu đồ và không thể hiện xu hướng rõ ràng."
    ]
   },
   {
    "stem": "Biểu đồ tròn (Pie chart) thường được dùng để thể hiện điều gì?",
    "choices": [
     "Tỉ lệ phần trăm của từng phần trong một tổng thể",
     "Sự thay đổi giá trị theo thời gian",
     "So sánh giá trị lớn nhất và nhỏ nhất",
     "Danh sách các công thức đã sử dụng"
    ],
    "answer": 0,
    "explanation": "Biểu đồ tròn thể hiện tỉ lệ (phần trăm) đóng góp của từng thành phần trong một tổng thể duy nhất.",
    "choiceFeedback": [
     "Đúng — đây là mục đích chính của biểu đồ tròn.",
     "Sai — thể hiện thay đổi theo thời gian phù hợp hơn với biểu đồ đường.",
     "Sai — so sánh lớn nhất/nhỏ nhất có thể dùng hàm MAX/MIN, không phải mục đích chính của biểu đồ tròn.",
     "Sai — biểu đồ không liệt kê công thức đã dùng."
    ]
   },
   {
    "stem": "Một bảng điểm có cột Toán, Văn, Anh và cột Trung bình dùng hàm AVERAGE, cột Xếp loại dùng hàm IF. Đây là ví dụ của việc",
    "choices": [
     "Kết hợp nhiều công thức và hàm để xử lý một bảng dữ liệu thực tế",
     "Chỉ sử dụng duy nhất một hàm SUM",
     "Không cần dùng công thức nào",
     "Chỉ định dạng màu sắc cho bảng"
    ],
    "answer": 0,
    "explanation": "Đây là bài tập thực hành tổng hợp, kết hợp nhiều hàm (AVERAGE, IF) để xử lý một bảng dữ liệu hoàn chỉnh — kỹ năng quan trọng của thực hành Excel.",
    "choiceFeedback": [
     "Đúng — đây là ví dụ điển hình về thực hành tổng hợp nhiều công thức, hàm.",
     "Sai — bảng điểm này dùng nhiều hàm khác nhau (AVERAGE, IF), không chỉ SUM.",
     "Sai — bảng điểm sử dụng công thức AVERAGE và IF rất rõ ràng.",
     "Sai — mục đích chính là tính toán, không chỉ là định dạng màu sắc."
    ]
   },
   {
    "stem": "Bảng chi tiêu gia đình có các cột: Khoản chi, Số tiền, Tháng. Để biết tổng chi tiêu của từng tháng và trực quan hoá bằng biểu đồ so sánh giữa các tháng, em cần thực hiện các bước nào theo đúng trình tự?",
    "choices": [
     "Dùng hàm SUM/SUMIF để tính tổng theo tháng, sau đó tạo biểu đồ cột hoặc đường từ bảng tổng đó",
     "Chỉ cần tô màu các ô số tiền",
     "Chỉ cần sắp xếp bảng theo tên khoản chi",
     "Xoá cột Tháng để bảng gọn hơn"
    ],
    "answer": 0,
    "explanation": "Cần tính tổng chi tiêu theo từng tháng bằng hàm phù hợp (SUM/SUMIF theo điều kiện tháng), sau đó dùng dữ liệu tổng hợp đó để vẽ biểu đồ so sánh trực quan.",
    "choiceFeedback": [
     "Đúng — đây là quy trình đúng để tổng hợp và trực quan hoá dữ liệu chi tiêu theo tháng.",
     "Sai — tô màu chỉ thay đổi hình thức, không tính được tổng chi tiêu theo tháng.",
     "Sai — sắp xếp theo tên khoản chi không giúp tính tổng theo tháng.",
     "Sai — xoá cột Tháng sẽ làm mất thông tin cần thiết để phân nhóm theo tháng."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S7TIN-exam-ck2": {
  "id": "S7TIN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Tin học 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Tin học 7",
  "questions": [
   {
    "stem": "Trong bảng tính điện tử, một tệp bảng tính hoàn chỉnh (có thể chứa nhiều trang tính) được gọi là gì?",
    "choices": [
     "Bảng tính (workbook)",
     "Ô tính (cell)",
     "Hàm (function)",
     "Biểu đồ (chart)"
    ],
    "answer": 0,
    "explanation": "Workbook (bảng tính) là tệp có thể chứa một hoặc nhiều trang tính (sheet), mỗi trang tính chứa các ô dữ liệu.",
    "choiceFeedback": [
     "Đúng — workbook là tệp bảng tính hoàn chỉnh.",
     "Sai — ô tính chỉ là một đơn vị nhỏ trong trang tính.",
     "Sai — hàm là công cụ tính toán, không phải một tệp.",
     "Sai — biểu đồ chỉ là một đối tượng trực quan hoá trong bảng tính, không phải cả tệp."
    ]
   },
   {
    "stem": "Khi nhập ngày tháng vào ô tính, phần mềm bảng tính thường tự động nhận diện đó là kiểu dữ liệu nào?",
    "choices": [
     "Ngày tháng (Date)",
     "Văn bản (Text)",
     "Công thức (Formula)",
     "Hàm (Function)"
    ],
    "answer": 0,
    "explanation": "Phần mềm bảng tính thường tự động nhận diện dữ liệu nhập theo định dạng ngày/tháng/năm là kiểu Date.",
    "choiceFeedback": [
     "Đúng — đây là kiểu dữ liệu ngày tháng được tự động nhận diện.",
     "Sai — nếu là Date thì phần mềm có thể tính toán được (ví dụ số ngày), khác với Text thông thường.",
     "Sai — công thức phải bắt đầu bằng dấu \"=\", ngày tháng nhập trực tiếp không phải công thức.",
     "Sai — hàm là công cụ tính toán riêng, không phải kiểu dữ liệu của ô."
    ]
   },
   {
    "stem": "Ô A1 chứa 12, ô A2 chứa 4. Công thức =(A1+A2)/A2 cho kết quả là bao nhiêu?",
    "choices": [
     "4",
     "3",
     "16",
     "8"
    ],
    "answer": 0,
    "explanation": "(A1+A2) = 12+4 =16; 16/A2 = 16/4 = 4.",
    "choiceFeedback": [
     "Đúng — (12+4)/4 = 16/4 = 4.",
     "Sai — kết quả này chưa cộng A1 và A2 trước khi chia.",
     "Sai — đây là kết quả của (A1+A2) nhưng chưa chia cho A2.",
     "Sai — kết quả này không khớp với phép tính theo đúng thứ tự trong ngoặc."
    ]
   },
   {
    "stem": "Muốn tính tổng số tiền chi tiêu trong cột từ B2 đến B10, em dùng công thức nào?",
    "choices": [
     "=SUM(B2:B10)",
     "=AVERAGE(B2:B10)",
     "=COUNT(B2:B10)",
     "=MAX(B2:B10)"
    ],
    "answer": 0,
    "explanation": "Hàm SUM(B2:B10) cộng tất cả giá trị trong vùng ô từ B2 đến B10.",
    "choiceFeedback": [
     "Đúng — SUM dùng để tính tổng vùng ô đã chọn.",
     "Sai — AVERAGE tính trung bình cộng, không phải tổng.",
     "Sai — COUNT chỉ đếm số lượng ô có giá trị số.",
     "Sai — MAX chỉ tìm giá trị lớn nhất trong vùng ô."
    ]
   },
   {
    "stem": "Hàm MIN trong bảng tính dùng để",
    "choices": [
     "Tìm giá trị nhỏ nhất trong vùng ô được chọn",
     "Tìm giá trị lớn nhất trong vùng ô được chọn",
     "Tính tổng các giá trị",
     "Đếm số ô có dữ liệu"
    ],
    "answer": 0,
    "explanation": "Hàm MIN trả về giá trị nhỏ nhất trong vùng dữ liệu được chỉ định.",
    "choiceFeedback": [
     "Đúng — đây là chức năng của hàm MIN.",
     "Sai — tìm giá trị lớn nhất là chức năng của hàm MAX.",
     "Sai — tính tổng là chức năng của hàm SUM.",
     "Sai — đếm số ô có dữ liệu là chức năng của hàm COUNT."
    ]
   },
   {
    "stem": "Ô E5 chứa công thức =IF(D5>=6.5,\"Đạt\",\"Chưa đạt\"), biết D5 = 6.5. Kết quả tại E5 là gì?",
    "choices": [
     "Đạt",
     "Chưa đạt",
     "6.5",
     "Lỗi công thức"
    ],
    "answer": 0,
    "explanation": "Vì D5 = 6.5 thỏa mãn điều kiện D5>=6.5 (bằng 6.5 vẫn thỏa mãn >=), nên kết quả trả về là \"Đạt\".",
    "choiceFeedback": [
     "Đúng — 6.5 thỏa mãn điều kiện lớn hơn hoặc bằng 6.5, nên kết quả là \"Đạt\".",
     "Sai — \"Chưa đạt\" chỉ xảy ra khi D5 nhỏ hơn 6.5.",
     "Sai — công thức trả về văn bản chứ không phải giá trị số của D5.",
     "Sai — công thức viết đúng cú pháp, không có lỗi."
    ]
   },
   {
    "stem": "Sắp xếp dữ liệu tăng dần (A→Z hoặc từ nhỏ đến lớn) nghĩa là gì?",
    "choices": [
     "Giá trị nhỏ nhất/chữ cái đầu bảng chữ cái đứng ở đầu danh sách",
     "Giá trị lớn nhất đứng ở đầu danh sách",
     "Dữ liệu được xáo trộn ngẫu nhiên",
     "Dữ liệu bị xoá bớt để dễ nhìn"
    ],
    "answer": 0,
    "explanation": "Sắp xếp tăng dần đưa các giá trị từ nhỏ đến lớn (hoặc chữ cái từ A đến Z) theo thứ tự từ trên xuống.",
    "choiceFeedback": [
     "Đúng — đây đúng là ý nghĩa của sắp xếp tăng dần.",
     "Sai — đó là đặc điểm của sắp xếp giảm dần.",
     "Sai — sắp xếp luôn theo quy luật, không phải ngẫu nhiên.",
     "Sai — sắp xếp không làm mất hay xoá bất kỳ dữ liệu nào."
    ]
   },
   {
    "stem": "Khi muốn so sánh số học sinh giỏi, khá, trung bình, yếu giữa các lớp bằng hình ảnh trực quan, em nên chọn loại biểu đồ nào?",
    "choices": [
     "Biểu đồ cột (Column/Bar chart)",
     "Không cần biểu đồ, chỉ cần liệt kê số liệu",
     "Bảng định dạng có điều kiện màu duy nhất",
     "Ảnh chụp màn hình dữ liệu thô"
    ],
    "answer": 0,
    "explanation": "Biểu đồ cột giúp so sánh trực quan số liệu giữa nhiều nhóm (các lớp) một cách rõ ràng, dễ hiểu.",
    "choiceFeedback": [
     "Đúng — biểu đồ cột phù hợp để so sánh số liệu giữa nhiều nhóm.",
     "Sai — liệt kê số liệu thô khó so sánh trực quan bằng biểu đồ.",
     "Sai — định dạng màu chỉ làm nổi bật ô, không thể hiện so sánh tổng thể trực quan.",
     "Sai — ảnh chụp màn hình không phải là công cụ trực quan hoá dữ liệu chuẩn."
    ]
   },
   {
    "stem": "Trong bài thực hành tổng hợp Excel, thứ tự hợp lý để xử lý một bảng dữ liệu điểm là gì?",
    "choices": [
     "Nhập dữ liệu → tính toán bằng công thức/hàm → sắp xếp hoặc lọc → trực quan hoá bằng biểu đồ",
     "Vẽ biểu đồ trước khi có dữ liệu",
     "Sắp xếp dữ liệu trước khi nhập dữ liệu",
     "Định dạng màu sắc trước khi nhập dữ liệu"
    ],
    "answer": 0,
    "explanation": "Quy trình hợp lý là nhập dữ liệu trước, sau đó dùng công thức/hàm để tính toán, tiếp theo sắp xếp/lọc nếu cần, cuối cùng trực quan hoá bằng biểu đồ.",
    "choiceFeedback": [
     "Đúng — đây là trình tự xử lý dữ liệu hợp lý trong Excel.",
     "Sai — không thể vẽ biểu đồ khi chưa có dữ liệu để biểu diễn.",
     "Sai — không thể sắp xếp dữ liệu khi dữ liệu chưa được nhập vào.",
     "Sai — định dạng màu chỉ có ý nghĩa sau khi đã có dữ liệu cần làm nổi bật."
    ]
   },
   {
    "stem": "Khi lưu tệp bảng tính Excel, định dạng tệp phổ biến là gì?",
    "choices": [
     ".xlsx",
     ".docx",
     ".pptx",
     ".mp4"
    ],
    "answer": 0,
    "explanation": ".xlsx là định dạng tệp chuẩn của phần mềm bảng tính Excel.",
    "choiceFeedback": [
     "Đúng — .xlsx là định dạng tệp bảng tính Excel.",
     "Sai — .docx là định dạng tệp văn bản Word.",
     "Sai — .pptx là định dạng tệp trình chiếu PowerPoint.",
     "Sai — .mp4 là định dạng tệp video."
    ]
   },
   {
    "stem": "Thuật toán được hiểu là gì?",
    "choices": [
     "Một dãy các bước được sắp xếp theo trình tự để giải quyết một bài toán hoặc vấn đề cụ thể",
     "Một loại phần cứng máy tính",
     "Tên gọi khác của bảng tính điện tử",
     "Một loại virus máy tính"
    ],
    "answer": 0,
    "explanation": "Thuật toán là dãy hữu hạn các bước (chỉ dẫn) được sắp xếp theo một trình tự xác định để giải quyết một bài toán hay vấn đề cụ thể.",
    "choiceFeedback": [
     "Đúng — đây là định nghĩa chính xác của thuật toán.",
     "Sai — thuật toán là khái niệm logic/quy trình, không phải phần cứng.",
     "Sai — thuật toán không phải tên gọi khác của bảng tính.",
     "Sai — thuật toán không liên quan đến virus máy tính."
    ]
   },
   {
    "stem": "Thuật toán có thể được biểu diễn bằng những cách nào sau đây?",
    "choices": [
     "Liệt kê các bước bằng ngôn ngữ tự nhiên hoặc vẽ sơ đồ khối (lưu đồ)",
     "Chỉ có thể biểu diễn bằng hình ảnh chụp màn hình",
     "Chỉ có thể biểu diễn bằng một đoạn nhạc",
     "Chỉ có thể biểu diễn bằng bảng màu sắc"
    ],
    "answer": 0,
    "explanation": "Hai cách biểu diễn thuật toán phổ biến là liệt kê các bước bằng lời (ngôn ngữ tự nhiên) và vẽ sơ đồ khối (lưu đồ).",
    "choiceFeedback": [
     "Đúng — đây là hai cách biểu diễn thuật toán phổ biến, đúng chương trình học.",
     "Sai — ảnh chụp màn hình không phải là cách biểu diễn thuật toán chuẩn.",
     "Sai — âm nhạc không phải là công cụ biểu diễn thuật toán.",
     "Sai — bảng màu sắc không dùng để biểu diễn thuật toán."
    ]
   },
   {
    "stem": "Cấu trúc tuần tự trong thuật toán có đặc điểm gì?",
    "choices": [
     "Các bước được thực hiện lần lượt theo đúng thứ tự đã liệt kê, không bỏ qua bước nào",
     "Các bước được thực hiện lặp đi lặp lại nhiều lần",
     "Chỉ thực hiện một trong hai nhánh tùy theo điều kiện",
     "Các bước được thực hiện theo thứ tự ngẫu nhiên"
    ],
    "answer": 0,
    "explanation": "Cấu trúc tuần tự là cấu trúc điều khiển cơ bản nhất, trong đó các bước được thực hiện lần lượt, theo đúng thứ tự từ trên xuống dưới.",
    "choiceFeedback": [
     "Đúng — đây là đặc điểm của cấu trúc tuần tự.",
     "Sai — thực hiện lặp lại nhiều lần là đặc điểm của cấu trúc lặp.",
     "Sai — chọn một trong hai nhánh theo điều kiện là đặc điểm của cấu trúc rẽ nhánh.",
     "Sai — cấu trúc tuần tự luôn theo thứ tự xác định, không phải ngẫu nhiên."
    ]
   },
   {
    "stem": "Cấu trúc rẽ nhánh dạng đủ (if...else) được sử dụng khi nào?",
    "choices": [
     "Khi cần thực hiện một trong hai việc khác nhau tuỳ theo điều kiện đúng hay sai",
     "Khi cần lặp lại một công việc nhiều lần",
     "Khi các bước luôn được thực hiện tuần tự, không có điều kiện",
     "Khi không cần kiểm tra điều kiện nào cả"
    ],
    "answer": 0,
    "explanation": "Rẽ nhánh dạng đủ dùng khi cần chọn thực hiện một trong hai nhánh công việc khác nhau, tùy theo điều kiện đúng hay sai.",
    "choiceFeedback": [
     "Đúng — đây là mục đích sử dụng của cấu trúc rẽ nhánh dạng đủ.",
     "Sai — lặp lại công việc nhiều lần là đặc điểm của cấu trúc lặp.",
     "Sai — thực hiện tuần tự không có điều kiện là đặc điểm của cấu trúc tuần tự, không phải rẽ nhánh.",
     "Sai — rẽ nhánh luôn cần một điều kiện để quyết định nhánh thực hiện."
    ]
   },
   {
    "stem": "Cho thuật toán: 'Nếu điểm >= 5 thì thông báo Đạt, ngược lại thông báo Chưa đạt'. Với điểm = 4, kết quả thông báo là gì?",
    "choices": [
     "Chưa đạt",
     "Đạt",
     "Không có thông báo nào",
     "Cả hai thông báo cùng lúc"
    ],
    "answer": 0,
    "explanation": "Vì điểm = 4 không thỏa mãn điều kiện điểm >= 5, nên nhánh else (ngược lại) được thực hiện, thông báo \"Chưa đạt\".",
    "choiceFeedback": [
     "Đúng — điểm 4 nhỏ hơn 5 nên điều kiện sai, thực hiện nhánh \"Chưa đạt\".",
     "Sai — \"Đạt\" chỉ xảy ra khi điểm >= 5.",
     "Sai — cấu trúc rẽ nhánh dạng đủ luôn có một thông báo được đưa ra.",
     "Sai — chỉ một trong hai nhánh được thực hiện, không phải cả hai."
    ]
   },
   {
    "stem": "Cấu trúc lặp với số lần lặp biết trước (ví dụ: lặp đúng 10 lần) thường được gọi là cấu trúc gì?",
    "choices": [
     "Lặp For (lặp với số lần xác định)",
     "Lặp While (lặp với điều kiện chưa xác định số lần)",
     "Rẽ nhánh If",
     "Tuần tự"
    ],
    "answer": 0,
    "explanation": "Cấu trúc lặp For dùng khi biết trước số lần cần lặp lại một công việc.",
    "choiceFeedback": [
     "Đúng — For là cấu trúc lặp phù hợp khi biết trước số lần lặp.",
     "Sai — While thường dùng khi số lần lặp phụ thuộc vào điều kiện, chưa biết trước chính xác số lần.",
     "Sai — rẽ nhánh If dùng để chọn nhánh thực hiện, không phải để lặp.",
     "Sai — cấu trúc tuần tự thực hiện các bước một lần theo thứ tự, không lặp lại."
    ]
   },
   {
    "stem": "Để tính tổng các số từ 1 đến 100, cách làm phù hợp với cấu trúc lặp là",
    "choices": [
     "Dùng vòng lặp cộng dồn lần lượt từng số từ 1 đến 100 vào biến tổng",
     "Viết tay 100 phép cộng riêng biệt không dùng lặp",
     "Chỉ dùng cấu trúc rẽ nhánh If duy nhất",
     "Không thể thực hiện bằng thuật toán"
    ],
    "answer": 0,
    "explanation": "Dùng vòng lặp (For) để lặp lại 100 lần, mỗi lần cộng dồn một số vào biến tổng là cách hiệu quả và đúng với tư duy thuật toán.",
    "choiceFeedback": [
     "Đúng — đây là cách áp dụng cấu trúc lặp hợp lý và hiệu quả.",
     "Sai — cách này không hiệu quả và không thể hiện được tư duy thuật toán lặp.",
     "Sai — rẽ nhánh If dùng để kiểm tra điều kiện, không phù hợp để cộng dồn nhiều lần.",
     "Sai — bài toán này hoàn toàn có thể giải bằng thuật toán với cấu trúc lặp."
    ]
   },
   {
    "stem": "Để tìm số lớn nhất trong 3 số a, b, c bằng thuật toán, em cần sử dụng chủ yếu cấu trúc điều khiển nào?",
    "choices": [
     "Cấu trúc rẽ nhánh (so sánh các số với nhau)",
     "Cấu trúc lặp (không cần so sánh)",
     "Chỉ cấu trúc tuần tự (không so sánh gì)",
     "Không cần cấu trúc điều khiển nào"
    ],
    "answer": 0,
    "explanation": "Bài toán tìm số lớn nhất cần so sánh các số với nhau, phù hợp sử dụng cấu trúc rẽ nhánh (if) để chọn ra số lớn hơn.",
    "choiceFeedback": [
     "Đúng — cấu trúc rẽ nhánh phù hợp để so sánh và tìm số lớn nhất.",
     "Sai — cấu trúc lặp phù hợp khi lặp lại thao tác nhiều lần, ở đây chủ yếu cần so sánh.",
     "Sai — tuần tự chỉ thực hiện các bước theo thứ tự, không có khả năng so sánh, lựa chọn.",
     "Sai — cần có cấu trúc điều khiển (rẽ nhánh) để so sánh và xác định số lớn nhất."
    ]
   },
   {
    "stem": "Ví dụ nào sau đây thể hiện một thuật toán trong đời sống hằng ngày?",
    "choices": [
     "Các bước pha một cốc trà: đun nước, cho trà vào ấm, rót nước sôi, đợi vài phút rồi rót ra cốc",
     "Màu sắc của chiếc cốc",
     "Cảm giác thích uống trà hay không",
     "Giá tiền của gói trà"
    ],
    "answer": 0,
    "explanation": "Một dãy các bước cụ thể, có thứ tự để đạt được mục tiêu (pha trà) chính là một ví dụ điển hình của thuật toán trong đời sống.",
    "choiceFeedback": [
     "Đúng — đây là ví dụ rõ ràng về một thuật toán trong đời sống hằng ngày.",
     "Sai — màu sắc chiếc cốc không phải một quy trình các bước.",
     "Sai — cảm giác thích hay không không phải là một dãy bước thực hiện.",
     "Sai — giá tiền là một thông tin, không phải một quy trình các bước."
    ]
   },
   {
    "stem": "Một bảng tính quản lý điểm thi cuối năm cần: tính điểm trung bình bằng hàm AVERAGE, xếp loại Đạt/Chưa đạt bằng hàm IF, sau đó vẽ biểu đồ cột so sánh điểm trung bình giữa các lớp. Đây là ví dụ tổng hợp kiến thức của những nội dung nào đã học trong năm?",
    "choices": [
     "Kỹ năng sử dụng công thức, hàm và biểu đồ trong bảng tính điện tử",
     "Chỉ kiến thức về mạng máy tính và Internet",
     "Chỉ kiến thức về soạn thảo văn bản",
     "Chỉ kiến thức về thuật toán, không liên quan đến bảng tính"
    ],
    "answer": 0,
    "explanation": "Ví dụ này kết hợp các kiến thức và kỹ năng về bảng tính điện tử đã học: công thức, các hàm (AVERAGE, IF) và biểu đồ, thể hiện khả năng vận dụng tổng hợp.",
    "choiceFeedback": [
     "Đúng — đây là sự tổng hợp đúng đắn các kỹ năng bảng tính điện tử đã học trong năm.",
     "Sai — ví dụ này không liên quan đến mạng máy tính và Internet.",
     "Sai — ví dụ này liên quan đến bảng tính, không phải soạn thảo văn bản.",
     "Sai — mặc dù thuật toán có liên hệ với logic của hàm IF, nhưng đây chủ yếu vẫn là kỹ năng bảng tính điện tử."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
