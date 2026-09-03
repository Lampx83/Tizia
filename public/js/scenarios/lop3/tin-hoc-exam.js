// P3TIN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P3TIN_EXAMS = {
 "P3TIN-exam-gk1": {
  "id": "P3TIN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Tin học 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Tin học 3",
  "questions": [
   {
    "stem": "Máy tính giúp em làm được việc gì dưới đây?",
    "choices": [
     "Học bài, xem tranh ảnh, nghe nhạc",
     "Tự nấu cơm cho em",
     "Tự đi chợ mua đồ ăn",
     "Thay em quét nhà"
    ],
    "answer": 0,
    "explanation": "Máy tính là công cụ hỗ trợ em học tập và giải trí như xem tranh ảnh, nghe nhạc; máy tính không thể tự làm việc nhà hay đi chợ.",
    "choiceFeedback": [
     "Đúng — máy tính giúp em học tập và giải trí.",
     "Sai — máy tính không thể tự nấu cơm.",
     "Sai — máy tính không thể tự đi chợ mua đồ ăn.",
     "Sai — máy tính không thể quét nhà thay em."
    ]
   },
   {
    "stem": "Loại máy tính nào em thường thấy đặt cố định trên bàn ở phòng máy của trường?",
    "choices": [
     "Máy tính để bàn",
     "Máy tính bảng",
     "Điện thoại thông minh",
     "Đồng hồ thông minh"
    ],
    "answer": 0,
    "explanation": "Máy tính để bàn gồm thân máy, màn hình, bàn phím, chuột thường được đặt cố định trên bàn ở phòng máy.",
    "choiceFeedback": [
     "Đúng — máy tính để bàn là loại đặt cố định trên bàn ở phòng máy.",
     "Sai — máy tính bảng là thiết bị cầm tay, không đặt cố định kiểu này.",
     "Sai — điện thoại thông minh là thiết bị cầm tay nhỏ gọn.",
     "Sai — đồng hồ thông minh đeo ở tay, không phải máy tính phòng máy."
    ]
   },
   {
    "stem": "Bộ phận nào của máy tính dùng để xem hình ảnh, chữ viết?",
    "choices": [
     "Bàn phím",
     "Màn hình",
     "Chuột",
     "Loa"
    ],
    "answer": 1,
    "explanation": "Màn hình là bộ phận hiển thị hình ảnh, chữ viết để em quan sát.",
    "choiceFeedback": [
     "Sai — bàn phím dùng để gõ chữ, số.",
     "Đúng — màn hình hiển thị hình ảnh, chữ viết cho em xem.",
     "Sai — chuột dùng để di chuyển con trỏ và nháy chọn.",
     "Sai — loa dùng để phát ra âm thanh."
    ]
   },
   {
    "stem": "Phần chứa \"bộ não\" xử lí thông tin của máy tính để bàn thường được gọi là gì?",
    "choices": [
     "Thân máy (CPU)",
     "Bàn phím",
     "Màn hình",
     "Chuột"
    ],
    "answer": 0,
    "explanation": "Thân máy chứa bộ xử lí (CPU) — nơi xử lí thông tin của máy tính để bàn.",
    "choiceFeedback": [
     "Đúng — thân máy chứa bộ xử lí, được coi là \"bộ não\" của máy tính.",
     "Sai — bàn phím chỉ dùng để nhập chữ, số.",
     "Sai — màn hình chỉ dùng để hiển thị.",
     "Sai — chuột chỉ dùng để điều khiển con trỏ."
    ]
   },
   {
    "stem": "Để bật máy tính, em cần làm gì?",
    "choices": [
     "Nhấn nút nguồn (Power)",
     "Gõ vào bàn phím bất kì",
     "Rút phích cắm điện",
     "Di chuyển chuột thật nhanh"
    ],
    "answer": 0,
    "explanation": "Muốn bật máy tính, em nhấn nút nguồn (Power) trên thân máy.",
    "choiceFeedback": [
     "Đúng — nhấn nút nguồn (Power) để bật máy tính.",
     "Sai — gõ bàn phím không giúp bật máy khi máy chưa có điện.",
     "Sai — rút phích cắm điện làm máy mất điện, không bật được.",
     "Sai — di chuyển chuột không thể bật máy khi máy đang tắt."
    ]
   },
   {
    "stem": "Cách tắt máy tính đúng là?",
    "choices": [
     "Rút dây điện ngay khi đang dùng",
     "Chọn lệnh Tắt máy (Shut down) trong hệ điều hành",
     "Đập mạnh vào thân máy",
     "Để nguyên máy đang chạy rồi bỏ đi"
    ],
    "answer": 1,
    "explanation": "Tắt máy đúng cách là chọn lệnh Shut down để máy lưu lại và tắt an toàn.",
    "choiceFeedback": [
     "Sai — rút dây điện đột ngột có thể làm hỏng máy, mất dữ liệu.",
     "Đúng — chọn lệnh Tắt máy (Shut down) là cách tắt máy an toàn.",
     "Sai — đập mạnh vào thân máy có thể làm hỏng máy.",
     "Sai — để máy chạy rồi bỏ đi không phải cách tắt máy đúng, gây tốn điện."
    ]
   },
   {
    "stem": "Tư thế ngồi đúng khi dùng máy tính là?",
    "choices": [
     "Lưng thẳng, mắt cách màn hình vừa phải",
     "Nằm bò ra bàn",
     "Ngồi vẹo hẳn sang một bên",
     "Cúi sát mặt vào màn hình"
    ],
    "answer": 0,
    "explanation": "Ngồi lưng thẳng, mắt cách màn hình một khoảng vừa phải giúp bảo vệ cột sống và đôi mắt.",
    "choiceFeedback": [
     "Đúng — lưng thẳng, mắt cách màn hình vừa phải là tư thế tốt cho sức khoẻ.",
     "Sai — nằm bò ra bàn gây mỏi lưng, hại mắt.",
     "Sai — ngồi vẹo sang một bên lâu ngày có thể ảnh hưởng cột sống.",
     "Sai — cúi sát mặt vào màn hình dễ hại mắt."
    ]
   },
   {
    "stem": "Để chọn một biểu tượng trên màn hình, em thường?",
    "choices": [
     "Nháy đúp chuột thật nhanh nhiều lần liên tục",
     "Nháy chuột trái một lần vào biểu tượng đó",
     "Lắc chuột qua lại",
     "Nhấn giữ phím Enter"
    ],
    "answer": 1,
    "explanation": "Để chọn một biểu tượng, em nháy chuột trái một lần vào biểu tượng đó.",
    "choiceFeedback": [
     "Sai — nháy đúp liên tục thường dùng để mở, không phải để chọn.",
     "Đúng — nháy chuột trái một lần để chọn biểu tượng.",
     "Sai — lắc chuột chỉ di chuyển con trỏ, không chọn được biểu tượng.",
     "Sai — phím Enter không dùng để chọn biểu tượng bằng chuột."
    ]
   },
   {
    "stem": "Thao tác kéo thả (kéo-rê) chuột là?",
    "choices": [
     "Nháy đúp chuột trái rồi thả tay ngay",
     "Nhấn giữ chuột trái, di chuyển đến vị trí khác rồi thả ra",
     "Nháy chuột phải rồi bỏ tay",
     "Xoay bánh xe chuột liên tục"
    ],
    "answer": 1,
    "explanation": "Kéo thả là nhấn giữ nút chuột trái, di chuyển chuột đến vị trí mới rồi mới thả tay.",
    "choiceFeedback": [
     "Sai — nháy đúp là thao tác mở, khác với kéo thả.",
     "Đúng — nhấn giữ chuột trái, kéo đến vị trí mới rồi thả ra là thao tác kéo thả.",
     "Sai — nháy chuột phải thường để mở bảng chọn nhanh.",
     "Sai — xoay bánh xe chuột dùng để cuộn trang."
    ]
   },
   {
    "stem": "Phím cách (Space) trên bàn phím dùng để làm gì?",
    "choices": [
     "Xoá chữ vừa gõ",
     "Tạo khoảng trống giữa các từ",
     "Xuống dòng mới",
     "Gõ chữ in hoa"
    ],
    "answer": 1,
    "explanation": "Phím cách (Space) tạo một khoảng trắng, thường dùng để cách giữa các từ.",
    "choiceFeedback": [
     "Sai — xoá chữ vừa gõ là chức năng của phím Backspace.",
     "Đúng — phím cách tạo khoảng trống giữa các từ.",
     "Sai — xuống dòng mới là chức năng của phím Enter.",
     "Sai — gõ chữ in hoa thường dùng phím Shift hoặc Caps Lock."
    ]
   },
   {
    "stem": "Phím Backspace (xoá lùi) dùng để làm gì?",
    "choices": [
     "Xoá kí tự ở bên trái con trỏ",
     "Thêm khoảng trắng",
     "Xuống dòng mới",
     "In đậm chữ"
    ],
    "answer": 0,
    "explanation": "Phím Backspace xoá kí tự nằm ngay bên trái vị trí con trỏ đang gõ.",
    "choiceFeedback": [
     "Đúng — Backspace xoá kí tự ở bên trái con trỏ.",
     "Sai — thêm khoảng trắng là chức năng của phím cách (Space).",
     "Sai — xuống dòng mới là chức năng của phím Enter.",
     "Sai — in đậm chữ là chức năng của phần mềm soạn thảo, không phải Backspace."
    ]
   },
   {
    "stem": "Tấm biển ghi \"CẤM HÚT THUỐC\" đặt ở cổng trường cho em loại thông tin gì?",
    "choices": [
     "Thông tin dạng âm thanh",
     "Thông tin dạng chữ viết và hình ảnh, nhắc nhở việc cần làm",
     "Thông tin dạng mùi vị",
     "Không phải là thông tin"
    ],
    "answer": 1,
    "explanation": "Tấm biển gồm chữ viết (và có thể có hình ảnh) truyền đạt thông tin nhắc nhở mọi người không hút thuốc.",
    "choiceFeedback": [
     "Sai — tấm biển không phát ra âm thanh.",
     "Đúng — tấm biển cho thông tin dạng chữ viết, hình ảnh nhắc nhở.",
     "Sai — tấm biển không truyền thông tin bằng mùi vị.",
     "Sai — tấm biển vẫn là một dạng thông tin mà em nhận được."
    ]
   },
   {
    "stem": "Khi nghe tiếng trống trường vang lên báo giờ vào lớp, em nhận biết thông tin đó bằng giác quan nào?",
    "choices": [
     "Bằng mắt (thị giác)",
     "Bằng tai (thính giác)",
     "Bằng mũi (khứu giác)",
     "Bằng lưỡi (vị giác)"
    ],
    "answer": 1,
    "explanation": "Tiếng trống là âm thanh, em nghe được nhờ đôi tai (thính giác).",
    "choiceFeedback": [
     "Sai — mắt dùng để nhìn, không nghe được âm thanh.",
     "Đúng — tai giúp em nghe được tiếng trống trường.",
     "Sai — mũi dùng để ngửi mùi, không nghe được âm thanh.",
     "Sai — lưỡi dùng để nếm vị, không nghe được âm thanh."
    ]
   },
   {
    "stem": "Thấy đèn giao thông chuyển sang màu đỏ khi đang chuẩn bị qua đường, em nên quyết định thế nào?",
    "choices": [
     "Tiếp tục băng qua đường thật nhanh",
     "Dừng lại, chờ đèn xanh rồi mới đi",
     "Nhắm mắt đi tiếp",
     "Chạy thật nhanh qua cho kịp"
    ],
    "answer": 1,
    "explanation": "Thông tin đèn đỏ giúp em quyết định dừng lại để an toàn, chờ đèn xanh mới qua đường.",
    "choiceFeedback": [
     "Sai — băng qua khi đèn đỏ rất nguy hiểm.",
     "Đúng — dừng lại chờ đèn xanh là quyết định an toàn.",
     "Sai — nhắm mắt đi tiếp cực kì nguy hiểm.",
     "Sai — chạy nhanh qua khi đèn đỏ vẫn rất nguy hiểm."
    ]
   },
   {
    "stem": "Bạn Lan đọc thấy nhãn \"Hết hạn sử dụng\" trên hộp sữa. Theo em, bạn Lan nên quyết định gì?",
    "choices": [
     "Vẫn uống bình thường vì sữa còn đầy hộp",
     "Không sử dụng hộp sữa đó nữa và báo cho người lớn",
     "Đổ sữa ra chơi cho vui",
     "Uống thử một chút xem có sao không"
    ],
    "answer": 1,
    "explanation": "Thông tin \"Hết hạn sử dụng\" giúp bạn Lan quyết định không dùng sữa đó nữa để bảo vệ sức khoẻ, nên báo người lớn biết.",
    "choiceFeedback": [
     "Sai — sữa hết hạn có thể gây hại dù còn đầy hộp.",
     "Đúng — không dùng sữa hết hạn và báo người lớn là quyết định đúng.",
     "Sai — đổ sữa ra chơi vừa lãng phí vừa không an toàn.",
     "Sai — uống thử sữa hết hạn có thể gây hại cho sức khoẻ."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P3TIN-exam-ck1": {
  "id": "P3TIN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Tin học 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Tin học 3",
  "questions": [
   {
    "stem": "Bộ phận nào dùng để gõ chữ và số vào máy tính?",
    "choices": [
     "Bàn phím",
     "Màn hình",
     "Loa",
     "Webcam"
    ],
    "answer": 0,
    "explanation": "Bàn phím là bộ phận dùng để gõ chữ, số và các kí hiệu vào máy tính.",
    "choiceFeedback": [
     "Đúng — bàn phím dùng để gõ chữ và số.",
     "Sai — màn hình dùng để hiển thị, không dùng để gõ.",
     "Sai — loa dùng để phát âm thanh.",
     "Sai — webcam dùng để quay hình, không dùng để gõ chữ."
    ]
   },
   {
    "stem": "Vì sao không nên rút dây điện đột ngột khi máy tính đang chạy?",
    "choices": [
     "Vì tốn điện",
     "Vì có thể làm hỏng máy hoặc mất dữ liệu chưa lưu",
     "Vì máy sẽ kêu to",
     "Vì làm nóng máy"
    ],
    "answer": 1,
    "explanation": "Rút điện đột ngột khi máy đang chạy có thể làm hỏng linh kiện và mất dữ liệu chưa kịp lưu.",
    "choiceFeedback": [
     "Sai — vấn đề chính không phải là tốn điện.",
     "Đúng — rút điện đột ngột dễ làm hỏng máy và mất dữ liệu chưa lưu.",
     "Sai — máy không tự kêu to khi rút điện.",
     "Sai — rút điện đột ngột không làm máy nóng lên."
    ]
   },
   {
    "stem": "Sau khoảng 30 phút sử dụng máy tính liên tục, em nên làm gì?",
    "choices": [
     "Tiếp tục dùng không nghỉ",
     "Đứng dậy, nhìn ra xa, cho mắt nghỉ ngơi một chút",
     "Nhắm mắt lại nhưng vẫn ngồi trước màn hình",
     "Dụi mắt thật mạnh"
    ],
    "answer": 1,
    "explanation": "Nghỉ ngơi, nhìn ra xa sau một khoảng thời gian dùng máy giúp mắt đỡ mỏi.",
    "choiceFeedback": [
     "Sai — dùng liên tục không nghỉ dễ hại mắt.",
     "Đúng — đứng dậy, nhìn ra xa giúp mắt được thư giãn.",
     "Sai — nhắm mắt nhưng vẫn ngồi trước màn hình không giúp mắt nghỉ hoàn toàn.",
     "Sai — dụi mắt mạnh có thể làm hại mắt hơn."
    ]
   },
   {
    "stem": "Con số 25°C hiển thị trên nhiệt kế cho em biết điều gì?",
    "choices": [
     "Thông tin về nhiệt độ không khí lúc đó",
     "Thông tin về thời gian",
     "Thông tin về âm thanh",
     "Không có ý nghĩa gì"
    ],
    "answer": 0,
    "explanation": "Số trên nhiệt kế thể hiện thông tin về nhiệt độ tại thời điểm đo.",
    "choiceFeedback": [
     "Đúng — con số trên nhiệt kế cho biết nhiệt độ không khí.",
     "Sai — nhiệt kế không hiển thị thời gian.",
     "Sai — nhiệt kế không liên quan đến âm thanh.",
     "Sai — con số trên nhiệt kế luôn mang một ý nghĩa cụ thể."
    ]
   },
   {
    "stem": "Trong các phím sau, phím nào dùng để xuống dòng mới khi soạn thảo?",
    "choices": [
     "Enter",
     "Shift",
     "Space",
     "Ctrl"
    ],
    "answer": 0,
    "explanation": "Phím Enter dùng để xuống dòng mới khi soạn thảo văn bản.",
    "choiceFeedback": [
     "Đúng — Enter dùng để xuống dòng mới.",
     "Sai — Shift thường dùng để gõ chữ in hoa hoặc kí hiệu trên.",
     "Sai — Space tạo khoảng trắng giữa các từ.",
     "Sai — Ctrl thường kết hợp với phím khác để thực hiện lệnh nhanh."
    ]
   },
   {
    "stem": "Phần mềm là gì?",
    "choices": [
     "Một bộ phận cứng bên trong máy tính",
     "Chương trình chạy trên máy tính giúp thực hiện công việc",
     "Một loại dây cắm điện",
     "Một loại chuột máy tính"
    ],
    "answer": 1,
    "explanation": "Phần mềm là chương trình được cài đặt và chạy trên máy tính để thực hiện các công việc như vẽ, soạn thảo, chơi trò chơi.",
    "choiceFeedback": [
     "Sai — bộ phận cứng là phần cứng (như CPU, chuột), không phải phần mềm.",
     "Đúng — phần mềm là chương trình chạy trên máy tính.",
     "Sai — dây cắm điện là thiết bị phần cứng.",
     "Sai — chuột máy tính là thiết bị phần cứng."
    ]
   },
   {
    "stem": "Ví dụ nào sau đây là một phần mềm?",
    "choices": [
     "Bàn phím",
     "Chuột máy tính",
     "Phần mềm Paint để vẽ tranh",
     "Màn hình máy tính"
    ],
    "answer": 2,
    "explanation": "Paint là một chương trình (phần mềm) giúp em vẽ tranh trên máy tính; các lựa chọn còn lại là thiết bị phần cứng.",
    "choiceFeedback": [
     "Sai — bàn phím là thiết bị phần cứng.",
     "Sai — chuột máy tính là thiết bị phần cứng.",
     "Đúng — Paint là phần mềm dùng để vẽ tranh.",
     "Sai — màn hình là thiết bị phần cứng."
    ]
   },
   {
    "stem": "Phần mềm Paint dùng để làm gì?",
    "choices": [
     "Vẽ và tô màu tranh trên máy tính",
     "Nghe nhạc",
     "Xem phim",
     "Soạn công văn"
    ],
    "answer": 0,
    "explanation": "Paint là phần mềm vẽ, giúp em vẽ hình và tô màu trên máy tính.",
    "choiceFeedback": [
     "Đúng — Paint dùng để vẽ và tô màu tranh.",
     "Sai — nghe nhạc cần phần mềm phát nhạc, không phải Paint.",
     "Sai — xem phim cần phần mềm phát video, không phải Paint.",
     "Sai — soạn công văn cần phần mềm soạn thảo văn bản, không phải Paint."
    ]
   },
   {
    "stem": "Công cụ Tẩy (Eraser) trong Paint dùng để làm gì?",
    "choices": [
     "Vẽ thêm nét mới",
     "Xoá bớt phần đã vẽ",
     "Đổ màu cho hình",
     "Chọn màu vẽ"
    ],
    "answer": 1,
    "explanation": "Công cụ Tẩy dùng để xoá bớt những nét đã vẽ trên bản vẽ.",
    "choiceFeedback": [
     "Sai — vẽ thêm nét mới là chức năng của Bút chì.",
     "Đúng — Tẩy dùng để xoá bớt phần đã vẽ.",
     "Sai — đổ màu cho hình là chức năng của công cụ Đổ màu (Fill).",
     "Sai — chọn màu vẽ là chức năng của Bảng màu (Color)."
    ]
   },
   {
    "stem": "Để vẽ một hình tròn trong Paint, em nên chọn công cụ nào?",
    "choices": [
     "Công cụ Hình tròn (Oval/Ellipse)",
     "Công cụ Tẩy",
     "Công cụ Bút chì tự do",
     "Bảng màu"
    ],
    "answer": 0,
    "explanation": "Công cụ Hình tròn (Oval/Ellipse) giúp vẽ hình tròn hoặc hình bầu dục nhanh và đều hơn vẽ tự do.",
    "choiceFeedback": [
     "Đúng — công cụ Hình tròn (Oval) dùng để vẽ hình tròn/bầu dục.",
     "Sai — công cụ Tẩy dùng để xoá, không dùng để vẽ hình tròn.",
     "Sai — vẽ tự do bằng bút chì khó tạo hình tròn đều.",
     "Sai — Bảng màu chỉ dùng để chọn màu, không vẽ hình."
    ]
   },
   {
    "stem": "Khi lỡ vẽ sai một nét trong Paint, cách xử lí hợp lí nhất là?",
    "choices": [
     "Tắt máy ngay không lưu",
     "Dùng lệnh Hoàn tác (Undo) hoặc công cụ Tẩy để sửa",
     "Vẽ đè lên nét sai bằng màu đen cho khuất",
     "Bỏ dở bài, làm bài mới"
    ],
    "answer": 1,
    "explanation": "Khi vẽ sai, em nên dùng Undo hoặc Tẩy để sửa lại nét vẽ cho đúng, thay vì bỏ dở hoặc tắt máy.",
    "choiceFeedback": [
     "Sai — tắt máy ngay có thể làm mất toàn bộ bài vẽ.",
     "Đúng — Undo hoặc Tẩy giúp sửa lại nét vẽ sai một cách hợp lí.",
     "Sai — vẽ đè màu đen làm bài vẽ xấu và không sửa được lỗi.",
     "Sai — bỏ dở bài làm mất công sức đã vẽ trước đó."
    ]
   },
   {
    "stem": "Nếu vẽ xong tranh mà không lưu bài rồi tắt máy, điều gì sẽ xảy ra?",
    "choices": [
     "Bài vẽ vẫn còn nguyên trong máy",
     "Bài vẽ có thể bị mất vì chưa được lưu lại",
     "Máy tính sẽ tự lưu lại giúp em",
     "Bài vẽ sẽ in ra giấy"
    ],
    "answer": 1,
    "explanation": "Nếu không lưu bài trước khi tắt máy, bài vẽ có thể bị mất vì chưa được ghi lại vào bộ nhớ.",
    "choiceFeedback": [
     "Sai — bài vẽ chưa lưu sẽ không còn nguyên khi tắt máy.",
     "Đúng — không lưu bài thì bài vẽ có thể bị mất.",
     "Sai — máy tính không tự động lưu nếu em không thực hiện lệnh lưu.",
     "Sai — tắt máy không tự in bài vẽ ra giấy."
    ]
   },
   {
    "stem": "Bạn Minh gõ chữ bị sai một kí tự, cần xoá kí tự đó ở ngay bên trái con trỏ. Bạn nên nhấn phím nào?",
    "choices": [
     "Enter",
     "Backspace",
     "Space",
     "Shift"
    ],
    "answer": 1,
    "explanation": "Phím Backspace xoá kí tự nằm bên trái vị trí con trỏ, phù hợp để xoá kí tự gõ sai.",
    "choiceFeedback": [
     "Sai — Enter dùng để xuống dòng mới, không xoá kí tự.",
     "Đúng — Backspace xoá kí tự ở bên trái con trỏ.",
     "Sai — Space tạo khoảng trắng, không xoá kí tự.",
     "Sai — Shift dùng để gõ chữ in hoa hoặc kí hiệu trên, không xoá kí tự."
    ]
   },
   {
    "stem": "Em muốn tìm hiểu thêm về loài voi để làm bài tập, em có thể dùng Internet để làm gì?",
    "choices": [
     "Tìm kiếm thông tin, hình ảnh về loài voi trên các trang phù hợp với lứa tuổi",
     "Chỉ chơi trò chơi điện tử",
     "Chỉ nghe nhạc",
     "Không thể tìm được gì"
    ],
    "answer": 0,
    "explanation": "Internet giúp em tìm kiếm thông tin, hình ảnh phục vụ học tập trên các trang phù hợp với lứa tuổi.",
    "choiceFeedback": [
     "Đúng — Internet giúp em tìm thông tin, hình ảnh về loài voi để học tập.",
     "Sai — Internet còn nhiều lợi ích khác ngoài chơi trò chơi.",
     "Sai — Internet còn nhiều lợi ích khác ngoài nghe nhạc.",
     "Sai — Internet hoàn toàn có thể giúp em tìm thông tin cần thiết."
    ]
   },
   {
    "stem": "Khi tìm thông tin trên Internet để phục vụ học tập, em nên làm gì để đảm bảo an toàn và hiệu quả?",
    "choices": [
     "Nhờ người lớn hướng dẫn, chỉ vào các trang phù hợp với lứa tuổi",
     "Vào bất kì trang nào hiện ra đầu tiên",
     "Không cần hỏi ai, tự làm gì cũng được",
     "Tải và cài mọi thứ trang web yêu cầu"
    ],
    "answer": 0,
    "explanation": "Để an toàn và hiệu quả, em nên có người lớn hướng dẫn và chỉ truy cập các trang phù hợp với lứa tuổi.",
    "choiceFeedback": [
     "Đúng — nhờ người lớn hướng dẫn và chọn trang phù hợp lứa tuổi là cách an toàn.",
     "Sai — không phải trang nào hiện ra đầu tiên cũng phù hợp và an toàn.",
     "Sai — trẻ em cần người lớn hướng dẫn khi dùng Internet.",
     "Sai — tải và cài mọi thứ theo yêu cầu của trang web có thể gây hại cho máy tính."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P3TIN-exam-gk2": {
  "id": "P3TIN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Tin học 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Tin học 3",
  "questions": [
   {
    "stem": "Khi dùng Internet, em nên có ai ở bên cạnh hướng dẫn?",
    "choices": [
     "Không cần ai cả",
     "Bố mẹ hoặc thầy cô, người lớn tin cậy",
     "Bạn bè lạ trên mạng",
     "Không ai cả, tự làm gì cũng được"
    ],
    "answer": 1,
    "explanation": "Khi dùng Internet, em nên có bố mẹ, thầy cô hoặc người lớn tin cậy hướng dẫn để dùng an toàn.",
    "choiceFeedback": [
     "Sai — trẻ em cần người lớn hướng dẫn khi dùng Internet.",
     "Đúng — bố mẹ, thầy cô là người lớn tin cậy nên có bên cạnh khi dùng Internet.",
     "Sai — bạn bè lạ trên mạng không phải người đáng tin để hướng dẫn.",
     "Sai — tự dùng Internet không có ai hướng dẫn dễ gặp rủi ro."
    ]
   },
   {
    "stem": "Gặp hình ảnh hoặc thông tin đáng sợ, không phù hợp trên mạng, em nên?",
    "choices": [
     "Xem tiếp cho biết",
     "Đóng lại và nói với người lớn",
     "Chia sẻ ngay cho bạn bè",
     "Lưu lại để xem sau"
    ],
    "answer": 1,
    "explanation": "Gặp nội dung không phù hợp, em nên đóng lại ngay và báo cho người lớn biết để được giúp đỡ.",
    "choiceFeedback": [
     "Sai — xem tiếp nội dung không phù hợp có thể gây ảnh hưởng không tốt.",
     "Đúng — đóng lại và báo người lớn là cách xử lí an toàn.",
     "Sai — chia sẻ nội dung không phù hợp cho bạn bè là không nên.",
     "Sai — lưu lại nội dung không phù hợp không phải cách xử lí đúng."
    ]
   },
   {
    "stem": "Thông tin cá nhân như tên, tuổi, số điện thoại, địa chỉ nhà, em nên?",
    "choices": [
     "Chia sẻ công khai cho mọi người trên mạng biết",
     "Giữ kín, không đưa cho người lạ trên mạng",
     "Đăng lên mạng xã hội để khoe",
     "Cho bất kì ai hỏi"
    ],
    "answer": 1,
    "explanation": "Thông tin cá nhân cần được giữ kín, không cung cấp cho người lạ trên mạng để tránh bị lợi dụng.",
    "choiceFeedback": [
     "Sai — chia sẻ công khai thông tin cá nhân rất nguy hiểm.",
     "Đúng — giữ kín thông tin cá nhân, không đưa cho người lạ là đúng.",
     "Sai — đăng thông tin cá nhân lên mạng xã hội có thể gây rủi ro.",
     "Sai — không nên cho bất kì ai hỏi cũng biết thông tin cá nhân."
    ]
   },
   {
    "stem": "Có người lạ trên mạng hỏi mật khẩu tài khoản của em, em nên?",
    "choices": [
     "Cho họ biết ngay",
     "Không cung cấp và báo cho người lớn biết",
     "Đổi mật khẩu thành dễ đoán hơn",
     "Hỏi lại tên người đó rồi mới cho"
    ],
    "answer": 1,
    "explanation": "Không bao giờ cung cấp mật khẩu cho người lạ; nên báo ngay cho người lớn biết.",
    "choiceFeedback": [
     "Sai — không được cho người lạ biết mật khẩu.",
     "Đúng — không cung cấp mật khẩu và báo người lớn là cách xử lí đúng.",
     "Sai — đổi mật khẩu dễ đoán càng khiến tài khoản kém an toàn.",
     "Sai — dù biết tên, người lạ trên mạng vẫn không đáng tin để cho mật khẩu."
    ]
   },
   {
    "stem": "Tệp (file) trên máy tính là gì?",
    "choices": [
     "Một đơn vị thông tin được lưu trữ, ví dụ một bài vẽ, một văn bản",
     "Một loại bàn phím",
     "Một loại chuột",
     "Tên gọi khác của màn hình"
    ],
    "answer": 0,
    "explanation": "Tệp là đơn vị thông tin được lưu trữ trên máy tính, có thể là bài vẽ, văn bản, ảnh...",
    "choiceFeedback": [
     "Đúng — tệp là một đơn vị thông tin được lưu trữ như bài vẽ, văn bản.",
     "Sai — bàn phím là thiết bị phần cứng, không phải tệp.",
     "Sai — chuột là thiết bị phần cứng, không phải tệp.",
     "Sai — màn hình là thiết bị hiển thị, không phải tệp."
    ]
   },
   {
    "stem": "Thư mục (folder) trên máy tính dùng để làm gì?",
    "choices": [
     "Chứa và sắp xếp các tệp cho gọn gàng",
     "Phát ra âm thanh",
     "Hiển thị hình ảnh",
     "Kết nối Internet"
    ],
    "answer": 0,
    "explanation": "Thư mục dùng để chứa và sắp xếp các tệp một cách gọn gàng, dễ tìm.",
    "choiceFeedback": [
     "Đúng — thư mục dùng để chứa, sắp xếp các tệp gọn gàng.",
     "Sai — phát âm thanh là chức năng của loa, không phải thư mục.",
     "Sai — hiển thị hình ảnh là chức năng của màn hình, không phải thư mục.",
     "Sai — kết nối Internet không phải chức năng của thư mục."
    ]
   },
   {
    "stem": "Khi có nhiều bức tranh đã vẽ, em nên làm gì để dễ tìm lại sau này?",
    "choices": [
     "Để tất cả lộn xộn trên màn hình",
     "Tạo thư mục và đặt tên tệp rõ ràng, dễ nhớ",
     "Xoá hết đi cho gọn",
     "Đổi tên tất cả thành một tên giống nhau"
    ],
    "answer": 1,
    "explanation": "Tạo thư mục và đặt tên tệp rõ ràng giúp em sắp xếp và tìm lại các bức tranh dễ dàng.",
    "choiceFeedback": [
     "Sai — để lộn xộn sẽ khó tìm lại tệp khi cần.",
     "Đúng — tạo thư mục, đặt tên rõ ràng giúp dễ tìm và quản lí tệp.",
     "Sai — xoá hết sẽ mất luôn các bức tranh đã vẽ.",
     "Sai — đặt cùng một tên khiến các tệp dễ bị nhầm lẫn, ghi đè lên nhau."
    ]
   },
   {
    "stem": "Khi nhắn tin, bình luận với bạn bè trên mạng, em nên?",
    "choices": [
     "Dùng lời lẽ lịch sự, tôn trọng người khác",
     "Viết lời nói tục, xúc phạm cho vui",
     "Bịa chuyện để trêu bạn",
     "Giả làm người khác để lừa bạn"
    ],
    "answer": 0,
    "explanation": "Ứng xử văn minh trên mạng là dùng lời lẽ lịch sự, tôn trọng người khác khi giao tiếp.",
    "choiceFeedback": [
     "Đúng — dùng lời lẽ lịch sự, tôn trọng người khác là ứng xử văn minh.",
     "Sai — nói tục, xúc phạm người khác là hành vi không văn minh.",
     "Sai — bịa chuyện trêu bạn có thể gây hiểu lầm, tổn thương.",
     "Sai — giả làm người khác để lừa bạn là hành vi không trung thực."
    ]
   },
   {
    "stem": "Thấy một bạn trong lớp bị chế giễu, bắt nạt trên mạng xã hội, em nên?",
    "choices": [
     "Tham gia chế giễu cùng cho vui",
     "Im lặng bỏ qua vì không liên quan",
     "Báo cho thầy cô, người lớn biết để giúp đỡ bạn",
     "Chia sẻ chuyện đó cho nhiều người biết hơn"
    ],
    "answer": 2,
    "explanation": "Khi thấy bạn bị bắt nạt trên mạng, em nên báo cho thầy cô hoặc người lớn biết để được giúp đỡ kịp thời.",
    "choiceFeedback": [
     "Sai — tham gia chế giễu là hành vi không đúng, làm tổn thương bạn.",
     "Sai — im lặng bỏ qua có thể khiến bạn tiếp tục bị bắt nạt.",
     "Đúng — báo cho thầy cô, người lớn biết giúp bạn được bảo vệ kịp thời.",
     "Sai — chia sẻ rộng rãi có thể khiến bạn bị tổn thương thêm."
    ]
   },
   {
    "stem": "Khi muốn dùng hình ảnh do người khác vẽ hoặc chụp cho bài của mình, em nên?",
    "choices": [
     "Tự ý dùng, không cần hỏi ai",
     "Xin phép và ghi rõ nguồn/tên tác giả",
     "Xoá tên tác giả đi rồi dùng",
     "Nói đó là sản phẩm của mình"
    ],
    "answer": 1,
    "explanation": "Tôn trọng bản quyền nghĩa là xin phép và ghi rõ nguồn khi sử dụng sản phẩm của người khác.",
    "choiceFeedback": [
     "Sai — tự ý dùng không xin phép là không tôn trọng bản quyền.",
     "Đúng — xin phép và ghi rõ nguồn là cách tôn trọng bản quyền.",
     "Sai — xoá tên tác giả là hành vi không trung thực.",
     "Sai — nhận sản phẩm của người khác là của mình là vi phạm bản quyền."
    ]
   },
   {
    "stem": "Chép nguyên bài làm của bạn rồi nộp là hành vi như thế nào?",
    "choices": [
     "Là việc bình thường ai cũng làm",
     "Là không tôn trọng công sức, sản phẩm của bạn khác",
     "Là cách học tốt",
     "Là được khuyến khích"
    ],
    "answer": 1,
    "explanation": "Chép nguyên bài của bạn rồi nộp là hành vi thiếu trung thực, không tôn trọng công sức của bạn.",
    "choiceFeedback": [
     "Sai — đây không phải việc nên làm dù có phổ biến hay không.",
     "Đúng — chép bài của bạn là không tôn trọng công sức, sản phẩm của người khác.",
     "Sai — chép bài không giúp em học tốt hơn, mà còn thiếu trung thực.",
     "Sai — đây là hành vi không nên được khuyến khích."
    ]
   },
   {
    "stem": "Dùng điện thoại, máy tính bảng liên tục trong thời gian dài sẽ ảnh hưởng gì?",
    "choices": [
     "Không ảnh hưởng gì cả",
     "Có thể hại mắt, mỏi cổ, vai, ảnh hưởng sức khoẻ",
     "Giúp mắt sáng hơn",
     "Giúp cao lớn hơn"
    ],
    "answer": 1,
    "explanation": "Dùng thiết bị số liên tục, không nghỉ có thể gây hại mắt và mỏi cơ thể.",
    "choiceFeedback": [
     "Sai — dùng thiết bị liên tục có ảnh hưởng đến sức khoẻ.",
     "Đúng — dùng liên tục lâu dài có thể hại mắt, mỏi cổ vai.",
     "Sai — dùng thiết bị số liên tục không giúp mắt sáng hơn, mà có thể hại mắt.",
     "Sai — dùng thiết bị số không liên quan đến việc cao lớn."
    ]
   },
   {
    "stem": "Trước khi đi ngủ, việc nào sau đây tốt cho sức khoẻ của em?",
    "choices": [
     "Dùng điện thoại xem video đến khuya",
     "Không dùng thiết bị điện tử lâu, đi ngủ đúng giờ",
     "Chơi trò chơi điện tử liên tục",
     "Bật đèn sáng và xem màn hình sát mắt"
    ],
    "answer": 1,
    "explanation": "Không dùng thiết bị điện tử lâu trước khi ngủ và đi ngủ đúng giờ giúp bảo vệ sức khoẻ, mắt và giấc ngủ.",
    "choiceFeedback": [
     "Sai — xem video đến khuya ảnh hưởng giấc ngủ và mắt.",
     "Đúng — hạn chế dùng thiết bị và ngủ đúng giờ tốt cho sức khoẻ.",
     "Sai — chơi trò chơi điện tử liên tục trước khi ngủ không tốt cho sức khoẻ.",
     "Sai — xem màn hình sát mắt trong phòng sáng đèn không tốt cho mắt."
    ]
   },
   {
    "stem": "Để pha một cốc nước cam, bước đầu tiên hợp lí nhất là gì?",
    "choices": [
     "Cho đường và khuấy đều luôn",
     "Chuẩn bị cốc, cam và các dụng cụ cần thiết",
     "Uống thử trước",
     "Lau khô cốc sau khi đã pha xong"
    ],
    "answer": 1,
    "explanation": "Trước khi pha nước cam, cần chuẩn bị đầy đủ cốc, cam, dụng cụ rồi mới thực hiện các bước tiếp theo.",
    "choiceFeedback": [
     "Sai — chưa chuẩn bị nguyên liệu thì chưa thể cho đường và khuấy.",
     "Đúng — chuẩn bị dụng cụ, nguyên liệu là bước đầu tiên hợp lí.",
     "Sai — chưa pha xong thì chưa có gì để uống thử.",
     "Sai — lau khô cốc nên làm trước khi pha, không phải sau khi pha xong."
    ]
   },
   {
    "stem": "Khi rửa tay, thứ tự các bước đúng nhất là?",
    "choices": [
     "Lau khô tay - làm ướt tay - xoa xà phòng - xả nước",
     "Làm ướt tay - xoa xà phòng - xả nước sạch - lau khô tay",
     "Xoa xà phòng - lau khô tay - làm ướt tay - xả nước",
     "Xả nước - lau khô tay - làm ướt tay - xoa xà phòng"
    ],
    "answer": 1,
    "explanation": "Thứ tự rửa tay đúng là làm ướt tay, xoa xà phòng, xả nước sạch rồi lau khô tay.",
    "choiceFeedback": [
     "Sai — không thể lau khô tay trước khi làm ướt.",
     "Đúng — làm ướt tay, xoa xà phòng, xả nước, lau khô tay là thứ tự đúng.",
     "Sai — không thể xoa xà phòng khi tay chưa được làm ướt.",
     "Sai — không thể xả nước trước khi tay được làm ướt và xoa xà phòng."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P3TIN-exam-ck2": {
  "id": "P3TIN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Tin học 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Tin học 3",
  "questions": [
   {
    "stem": "Trang web phù hợp với học sinh là trang web như thế nào?",
    "choices": [
     "Trang có nội dung học tập, giải trí lành mạnh, phù hợp lứa tuổi",
     "Trang có nhiều quảng cáo người lớn",
     "Trang yêu cầu cung cấp mật khẩu ngân hàng",
     "Trang không rõ nguồn gốc, yêu cầu tải file lạ"
    ],
    "answer": 0,
    "explanation": "Trang web phù hợp với học sinh là trang có nội dung lành mạnh, học tập, giải trí phù hợp lứa tuổi.",
    "choiceFeedback": [
     "Đúng — trang có nội dung lành mạnh, phù hợp lứa tuổi là trang nên dùng.",
     "Sai — trang có quảng cáo người lớn không phù hợp với học sinh.",
     "Sai — không trang nào hợp lệ lại yêu cầu mật khẩu ngân hàng của học sinh.",
     "Sai — trang không rõ nguồn gốc, yêu cầu tải file lạ tiềm ẩn nguy hiểm."
    ]
   },
   {
    "stem": "Vì sao phải bảo vệ thông tin cá nhân trên mạng?",
    "choices": [
     "Vì thông tin cá nhân không quan trọng",
     "Để tránh bị người xấu lợi dụng, gây hại cho bản thân và gia đình",
     "Vì máy tính sẽ chạy chậm nếu để lộ",
     "Không có lí do gì đặc biệt"
    ],
    "answer": 1,
    "explanation": "Bảo vệ thông tin cá nhân giúp em tránh bị kẻ xấu lợi dụng, gây hại cho bản thân và gia đình.",
    "choiceFeedback": [
     "Sai — thông tin cá nhân rất quan trọng, cần được bảo vệ.",
     "Đúng — bảo vệ thông tin cá nhân giúp tránh bị kẻ xấu lợi dụng.",
     "Sai — để lộ thông tin cá nhân không làm máy tính chạy chậm.",
     "Sai — có lí do rõ ràng và quan trọng để bảo vệ thông tin cá nhân."
    ]
   },
   {
    "stem": "Mỗi tệp trên máy tính thường có phần mở rộng (đuôi tệp) để làm gì?",
    "choices": [
     "Để trang trí cho đẹp",
     "Giúp máy tính và người dùng biết đó là loại tệp gì (ảnh, văn bản...)",
     "Không có tác dụng gì",
     "Để đổi màu tệp"
    ],
    "answer": 1,
    "explanation": "Phần mở rộng của tệp giúp nhận biết loại tệp, ví dụ ảnh, văn bản, âm thanh.",
    "choiceFeedback": [
     "Sai — phần mở rộng không phải để trang trí.",
     "Đúng — phần mở rộng giúp nhận biết loại tệp.",
     "Sai — phần mở rộng có tác dụng quan trọng trong việc nhận diện tệp.",
     "Sai — phần mở rộng không dùng để đổi màu tệp."
    ]
   },
   {
    "stem": "Có thể sắp xếp các tệp trong một thư mục theo cách nào sau đây?",
    "choices": [
     "Theo tên, theo ngày tạo hoặc theo loại tệp",
     "Theo màu tóc của em",
     "Theo cân nặng của máy tính",
     "Không thể sắp xếp được"
    ],
    "answer": 0,
    "explanation": "Các tệp trong thư mục có thể được sắp xếp theo tên, ngày tạo, loại tệp... giúp dễ quản lí.",
    "choiceFeedback": [
     "Đúng — có thể sắp xếp tệp theo tên, ngày tạo, loại tệp.",
     "Sai — màu tóc của em không liên quan đến việc sắp xếp tệp.",
     "Sai — cân nặng máy tính không liên quan đến việc sắp xếp tệp.",
     "Sai — máy tính hoàn toàn có thể sắp xếp tệp theo nhiều cách."
    ]
   },
   {
    "stem": "Sản phẩm (bài vẽ, bài viết) do chính em tự làm ra thì sao?",
    "choices": [
     "Em không có quyền gì với sản phẩm đó",
     "Em là tác giả, có quyền đối với sản phẩm của mình",
     "Sản phẩm đó thuộc về người khác",
     "Ai lấy dùng cũng được không cần hỏi"
    ],
    "answer": 1,
    "explanation": "Sản phẩm do chính em làm ra thì em là tác giả và có quyền đối với sản phẩm đó.",
    "choiceFeedback": [
     "Sai — em vẫn có quyền với sản phẩm do chính mình làm ra.",
     "Đúng — em là tác giả, có quyền đối với sản phẩm của mình.",
     "Sai — sản phẩm do em làm ra thuộc về em, không phải người khác.",
     "Sai — người khác muốn dùng sản phẩm của em cũng cần xin phép, tôn trọng bản quyền."
    ]
   },
   {
    "stem": "Sơ đồ khối dùng để làm gì?",
    "choices": [
     "Thể hiện các bước thực hiện một công việc theo một trình tự rõ ràng",
     "Để nghe nhạc",
     "Để vẽ tranh phong cảnh",
     "Để tính tiền"
    ],
    "answer": 0,
    "explanation": "Sơ đồ khối dùng để thể hiện các bước thực hiện một công việc theo trình tự rõ ràng, dễ hiểu.",
    "choiceFeedback": [
     "Đúng — sơ đồ khối thể hiện các bước thực hiện công việc theo trình tự.",
     "Sai — sơ đồ khối không dùng để nghe nhạc.",
     "Sai — sơ đồ khối không phải công cụ vẽ tranh phong cảnh.",
     "Sai — sơ đồ khối không dùng để tính tiền."
    ]
   },
   {
    "stem": "Mũi tên trong sơ đồ khối cho biết điều gì?",
    "choices": [
     "Màu sắc của sơ đồ",
     "Thứ tự thực hiện từ bước này sang bước khác",
     "Kích thước của hình khối",
     "Tên người vẽ sơ đồ"
    ],
    "answer": 1,
    "explanation": "Mũi tên trong sơ đồ khối chỉ ra thứ tự chuyển từ bước này sang bước kế tiếp.",
    "choiceFeedback": [
     "Sai — mũi tên không thể hiện màu sắc của sơ đồ.",
     "Đúng — mũi tên cho biết thứ tự thực hiện các bước.",
     "Sai — mũi tên không thể hiện kích thước của hình khối.",
     "Sai — mũi tên không dùng để ghi tên người vẽ sơ đồ."
    ]
   },
   {
    "stem": "Việc nào sau đây em phải lặp lại nhiều lần, đều đặn?",
    "choices": [
     "Đánh răng mỗi sáng và tối",
     "Đi khai giảng năm học",
     "Đi khám bệnh khi bị ốm",
     "Đi xem phim cuối tuần một lần duy nhất"
    ],
    "answer": 0,
    "explanation": "Đánh răng sáng tối là việc được lặp lại đều đặn hằng ngày.",
    "choiceFeedback": [
     "Đúng — đánh răng sáng tối là việc lặp lại đều đặn mỗi ngày.",
     "Sai — khai giảng chỉ diễn ra một lần vào đầu năm học.",
     "Sai — khám bệnh chỉ khi bị ốm, không lặp lại đều đặn.",
     "Sai — đây chỉ là một lần xem phim, không phải việc lặp lại đều đặn."
    ]
   },
   {
    "stem": "Bạn An tưới cây mỗi sáng trước khi đi học. Đây là ví dụ của điều gì trong các bước thực hiện công việc?",
    "choices": [
     "Một việc chỉ làm một lần duy nhất trong đời",
     "Một việc được lặp lại đều đặn hằng ngày",
     "Một việc không cần làm theo thứ tự",
     "Một việc không có bước nào cả"
    ],
    "answer": 1,
    "explanation": "Tưới cây mỗi sáng là ví dụ về việc lặp lại đều đặn hằng ngày.",
    "choiceFeedback": [
     "Sai — việc này lặp lại mỗi ngày, không phải chỉ một lần.",
     "Đúng — tưới cây mỗi sáng là việc lặp lại đều đặn hằng ngày.",
     "Sai — việc tưới cây vẫn cần thực hiện theo các bước nhất định.",
     "Sai — việc tưới cây vẫn có các bước như lấy nước, tưới vào gốc cây."
    ]
   },
   {
    "stem": "Câu \"Nếu trời mưa thì em mang ô\" thuộc loại câu nào trong các bước thực hiện công việc?",
    "choices": [
     "Câu lặp lại",
     "Câu lựa chọn (nếu... thì...)",
     "Câu không có ý nghĩa",
     "Câu kết thúc công việc"
    ],
    "answer": 1,
    "explanation": "Đây là câu lựa chọn dạng \"nếu... thì...\", thực hiện hành động khi điều kiện xảy ra.",
    "choiceFeedback": [
     "Sai — câu này không lặp lại nhiều lần mà chỉ xét theo điều kiện.",
     "Đúng — đây là câu lựa chọn dạng \"nếu... thì...\".",
     "Sai — câu này có ý nghĩa rõ ràng, giúp quyết định hành động.",
     "Sai — đây không phải câu kết thúc mà là câu điều kiện."
    ]
   },
   {
    "stem": "Trong câu \"Nếu em làm xong bài tập thì em được xem hoạt hình\", phần \"em làm xong bài tập\" đóng vai trò gì?",
    "choices": [
     "Là điều kiện để quyết định việc tiếp theo",
     "Là kết quả cuối cùng",
     "Không có vai trò gì",
     "Là một bước lặp lại"
    ],
    "answer": 0,
    "explanation": "Phần \"em làm xong bài tập\" là điều kiện; nếu điều kiện đúng thì mới thực hiện việc tiếp theo.",
    "choiceFeedback": [
     "Đúng — đây là điều kiện để quyết định có thực hiện việc tiếp theo hay không.",
     "Sai — \"được xem hoạt hình\" mới là kết quả, không phải \"làm xong bài tập\".",
     "Sai — phần này có vai trò quan trọng, là điều kiện của câu.",
     "Sai — đây là điều kiện, không phải một bước lặp lại nhiều lần."
    ]
   },
   {
    "stem": "Để làm chữ đậm hơn trong phần mềm soạn thảo văn bản, em thường dùng nút lệnh nào?",
    "choices": [
     "Nút chữ B (Bold - in đậm)",
     "Nút chữ I (Italic - in nghiêng)",
     "Nút gạch chân (Underline)",
     "Nút xoá (Delete)"
    ],
    "answer": 0,
    "explanation": "Nút B (Bold) dùng để làm chữ in đậm trong phần mềm soạn thảo văn bản.",
    "choiceFeedback": [
     "Đúng — nút B (Bold) dùng để làm chữ in đậm.",
     "Sai — nút I (Italic) dùng để làm chữ in nghiêng.",
     "Sai — nút gạch chân dùng để tạo đường gạch dưới chữ.",
     "Sai — nút xoá (Delete) dùng để xoá chữ, không phải làm đậm chữ."
    ]
   },
   {
    "stem": "Bạn Hoa viết một bài giới thiệu về con mèo và muốn bài thêm sinh động, dễ hiểu, bạn nên làm gì?",
    "choices": [
     "Chỉ viết toàn chữ, không cần gì thêm",
     "Chèn thêm hình ảnh con mèo phù hợp với nội dung bài viết",
     "Viết chữ thật nhỏ để đỡ tốn giấy",
     "Xoá hết nội dung đã viết"
    ],
    "answer": 1,
    "explanation": "Chèn hình ảnh phù hợp giúp bài viết sinh động và dễ hiểu hơn.",
    "choiceFeedback": [
     "Sai — chỉ có chữ đôi khi khó hình dung, kém sinh động.",
     "Đúng — chèn hình ảnh phù hợp giúp bài viết sinh động, dễ hiểu.",
     "Sai — viết chữ quá nhỏ khiến bài khó đọc, không liên quan đến làm sinh động bài viết.",
     "Sai — xoá hết nội dung sẽ mất công sức bạn đã viết."
    ]
   },
   {
    "stem": "Khi làm một dự án nhỏ (ví dụ làm một tấm thiệp điện tử) cùng các bạn trong nhóm, em nên?",
    "choices": [
     "Tự làm một mình, không cần hợp tác với ai",
     "Cùng bàn bạc, phân công công việc và giúp đỡ nhau",
     "Tranh cãi để giành phần việc dễ nhất",
     "Không quan tâm đến kết quả chung"
    ],
    "answer": 1,
    "explanation": "Làm việc nhóm hiệu quả cần cùng nhau bàn bạc, phân công và giúp đỡ nhau hoàn thành công việc chung.",
    "choiceFeedback": [
     "Sai — làm dự án nhóm cần có sự hợp tác giữa các thành viên.",
     "Đúng — cùng bàn bạc, phân công, giúp đỡ nhau là cách làm việc nhóm tốt.",
     "Sai — tranh cãi giành phần dễ gây mất đoàn kết trong nhóm.",
     "Sai — mỗi thành viên nên quan tâm đến kết quả chung của cả nhóm."
    ]
   },
   {
    "stem": "Khi không chắc chắn về một thông tin hoặc một việc nên làm trên máy tính hay trên mạng, một người dùng máy tính thông minh nên làm gì?",
    "choices": [
     "Cứ làm liều, không hỏi ai",
     "Hỏi ý kiến người lớn hoặc thầy cô để được hướng dẫn",
     "Làm theo lời người lạ trên mạng",
     "Bỏ mặc, không quan tâm"
    ],
    "answer": 1,
    "explanation": "Người dùng máy tính thông minh biết hỏi ý kiến người lớn, thầy cô khi không chắc chắn để được hướng dẫn đúng.",
    "choiceFeedback": [
     "Sai — làm liều khi không chắc chắn có thể gây ra hậu quả không mong muốn.",
     "Đúng — hỏi người lớn, thầy cô giúp em xử lí đúng khi không chắc chắn.",
     "Sai — người lạ trên mạng có thể không đáng tin cậy.",
     "Sai — bỏ mặc không giải quyết được vấn đề và có thể gây rủi ro."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
