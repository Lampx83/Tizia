// S6NT — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S6NT_EXAMS = {
 "S6NT-exam-gk1": {
  "id": "S6NT-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Nghệ thuật 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Nghệ thuật 6",
  "questions": [
   {
    "stem": "Trong hệ thống nhạc lý cơ bản, có mấy nốt nhạc thường được học đầu tiên?",
    "choices": [
     "5 nốt",
     "6 nốt",
     "7 nốt",
     "8 nốt"
    ],
    "answer": 2,
    "explanation": "Bảy nốt nhạc cơ bản là Đô – Rê – Mi – Fa – Sol – La – Si, được học đầu tiên trong nhạc lý phổ thông.",
    "choiceFeedback": [
     "Sai — nhạc lý cơ bản có 7 nốt, không phải 5.",
     "Sai — nhạc lý cơ bản có 7 nốt, không phải 6.",
     "Đúng — Đô, Rê, Mi, Fa, Sol, La, Si là 7 nốt nhạc cơ bản.",
     "Sai — 8 chỉ là nốt Đô cao lặp lại (quãng 8), không tính là nốt riêng."
    ]
   },
   {
    "stem": "Nốt đứng ngay sau nốt Đô là nốt nào?",
    "choices": [
     "Mi",
     "Rê",
     "Fa",
     "Sol"
    ],
    "answer": 1,
    "explanation": "Thứ tự 7 nốt cơ bản là Đô - Rê - Mi - Fa - Sol - La - Si, nên sau Đô là Rê.",
    "choiceFeedback": [
     "Sai — Mi đứng sau Rê, không phải ngay sau Đô.",
     "Đúng — Rê đứng ngay sau Đô trong dãy 7 nốt.",
     "Sai — Fa đứng thứ 4 trong dãy, không liền sau Đô.",
     "Sai — Sol đứng thứ 5 trong dãy."
    ]
   },
   {
    "stem": "Khuông nhạc gồm mấy dòng kẻ song song?",
    "choices": [
     "4 dòng",
     "5 dòng",
     "6 dòng",
     "7 dòng"
    ],
    "answer": 1,
    "explanation": "Khuông nhạc chuẩn gồm 5 dòng kẻ song song và 4 khe nằm giữa các dòng.",
    "choiceFeedback": [
     "Sai — khuông nhạc chuẩn có 5 dòng, không phải 4.",
     "Đúng — khuông nhạc gồm 5 dòng kẻ song song.",
     "Sai — 6 dòng nhiều hơn số dòng chuẩn của khuông nhạc.",
     "Sai — 7 dòng nhiều hơn hẳn số dòng chuẩn."
    ]
   },
   {
    "stem": "Khoá Sol vòng quanh dòng kẻ thứ mấy của khuông nhạc?",
    "choices": [
     "Dòng 1",
     "Dòng 2",
     "Dòng 3",
     "Dòng 4"
    ],
    "answer": 1,
    "explanation": "Khoá Sol có vòng xoắn bắt đầu và kết thúc tại dòng kẻ thứ 2, xác định nốt Sol tại vị trí đó.",
    "choiceFeedback": [
     "Sai — vòng khoá Sol không nằm ở dòng 1.",
     "Đúng — vòng khoá Sol nằm ở dòng kẻ thứ 2.",
     "Sai — dòng 3 là vị trí nốt Si trong khoá Sol, không phải vòng khoá.",
     "Sai — dòng 4 là vị trí nốt Rê, không phải vòng khoá."
    ]
   },
   {
    "stem": "Nốt tròn có trường độ bằng bao nhiêu phách (khi phách đơn vị là nốt đen)?",
    "choices": [
     "1 phách",
     "2 phách",
     "3 phách",
     "4 phách"
    ],
    "answer": 3,
    "explanation": "Nốt tròn là hình nốt dài nhất trong các hình nốt cơ bản, bằng 4 phách đen.",
    "choiceFeedback": [
     "Sai — 1 phách là trường độ của nốt đen.",
     "Sai — 2 phách là trường độ của nốt trắng.",
     "Sai — không có hình nốt cơ bản đơn nào bằng đúng 3 phách.",
     "Đúng — nốt tròn có trường độ 4 phách."
    ]
   },
   {
    "stem": "Nốt đen có trường độ bao nhiêu phách?",
    "choices": [
     "2 phách",
     "1,5 phách",
     "1 phách",
     "0,5 phách"
    ],
    "answer": 2,
    "explanation": "Nốt đen là đơn vị phách chuẩn, có giá trị 1 phách.",
    "choiceFeedback": [
     "Sai — 2 phách là trường độ của nốt trắng.",
     "Sai — 1,5 phách là trường độ của nốt đen chấm dôi.",
     "Đúng — nốt đen có trường độ 1 phách.",
     "Sai — 0,5 phách là trường độ của nốt móc đơn."
    ]
   },
   {
    "stem": "Số chỉ nhịp 2/4 có nghĩa là gì?",
    "choices": [
     "Mỗi ô nhịp có 4 phách, mỗi phách bằng một nốt đen",
     "Mỗi ô nhịp có 2 phách, mỗi phách bằng một nốt đen",
     "Mỗi ô nhịp có 2 phách, mỗi phách bằng một nốt trắng",
     "Mỗi ô nhịp có 4 phách, mỗi phách bằng một nốt móc đơn"
    ],
    "answer": 1,
    "explanation": "Số chỉ nhịp 2/4: số trên (2) là số phách trong một ô nhịp, số dưới (4) cho biết mỗi phách có giá trị bằng một nốt đen.",
    "choiceFeedback": [
     "Sai — đó là cách hiểu của nhịp 4/4.",
     "Đúng — nhịp 2/4 có 2 phách mỗi ô, mỗi phách bằng một nốt đen.",
     "Sai — phách trong nhịp 2/4 tương ứng nốt đen chứ không phải nốt trắng.",
     "Sai — số dưới 4 tương ứng nốt đen chứ không phải nốt móc đơn."
    ]
   },
   {
    "stem": "Trong nhịp 3/4, mẫu hình phách điển hình là gì?",
    "choices": [
     "Mạnh - nhẹ",
     "Mạnh - nhẹ - mạnh vừa - nhẹ",
     "Mạnh - nhẹ - nhẹ",
     "Nhẹ - mạnh - nhẹ"
    ],
    "answer": 2,
    "explanation": "Nhịp 3/4 có 3 phách mỗi ô, theo mẫu hình phách 1 mạnh, phách 2 và 3 nhẹ.",
    "choiceFeedback": [
     "Sai — đó là mẫu hình 2 phách của nhịp 2/4.",
     "Sai — đó là mẫu hình 4 phách của nhịp 4/4.",
     "Đúng — nhịp 3/4 có mẫu hình mạnh - nhẹ - nhẹ.",
     "Sai — phách mạnh luôn ở đầu ô nhịp, không phải phách 1 nhẹ."
    ]
   },
   {
    "stem": "Nhịp điệu nào thường dùng cho điệu Valse (Van)?",
    "choices": [
     "Nhịp 2/4",
     "Nhịp 3/4",
     "Nhịp 4/4",
     "Nhịp 6/8"
    ],
    "answer": 1,
    "explanation": "Điệu Valse có nhịp điệu uyển chuyển, xoay vòng đặc trưng của nhịp 3/4.",
    "choiceFeedback": [
     "Sai — nhịp 2/4 thường dùng cho hành khúc.",
     "Đúng — Valse là điệu nhảy đặc trưng của nhịp 3/4.",
     "Sai — nhịp 4/4 phổ biến ở nhiều thể loại nhưng không đặc trưng cho Valse.",
     "Sai — nhịp 6/8 không phải nhịp đặc trưng của điệu Valse cổ điển."
    ]
   },
   {
    "stem": "Dấu lặng đen có giá trị tương đương với nốt nào?",
    "choices": [
     "Nốt tròn",
     "Nốt trắng",
     "Nốt đen",
     "Nốt móc đơn"
    ],
    "answer": 2,
    "explanation": "Mỗi loại dấu lặng có thời gian nghỉ bằng đúng trường độ của loại nốt cùng tên; dấu lặng đen nghỉ bằng 1 phách như nốt đen.",
    "choiceFeedback": [
     "Sai — đó là dấu lặng tròn (4 phách).",
     "Sai — đó là dấu lặng trắng (2 phách).",
     "Đúng — dấu lặng đen nghỉ đúng 1 phách như nốt đen.",
     "Sai — đó là dấu lặng đơn (0,5 phách)."
    ]
   },
   {
    "stem": "Trong một ô nhịp 4/4 có 1 nốt trắng và 1 dấu lặng trắng, tổng số phách trong ô nhịp là bao nhiêu?",
    "choices": [
     "2 phách",
     "3 phách",
     "4 phách",
     "5 phách"
    ],
    "answer": 2,
    "explanation": "Nốt trắng = 2 phách, dấu lặng trắng = 2 phách; cộng lại đúng bằng 4 phách của một ô nhịp 4/4.",
    "choiceFeedback": [
     "Sai — 2 phách mới chỉ tính riêng nốt trắng.",
     "Sai — phép cộng 2+2 không ra 3.",
     "Đúng — 2 phách (nốt trắng) + 2 phách (lặng trắng) = 4 phách.",
     "Sai — phép cộng 2+2 không ra 5."
    ]
   },
   {
    "stem": "Sắp xếp các nốt theo thứ tự trường độ TỪ DÀI ĐẾN NGẮN.",
    "choices": [
     "Nốt tròn - nốt trắng - nốt đen - nốt móc đơn",
     "Nốt móc đơn - nốt đen - nốt trắng - nốt tròn",
     "Nốt trắng - nốt tròn - nốt móc đơn - nốt đen",
     "Nốt đen - nốt trắng - nốt tròn - nốt móc đơn"
    ],
    "answer": 0,
    "explanation": "Thứ tự trường độ từ dài đến ngắn: tròn (4 phách) > trắng (2 phách) > đen (1 phách) > móc đơn (0,5 phách).",
    "choiceFeedback": [
     "Đúng — đây đúng thứ tự từ dài nhất đến ngắn nhất.",
     "Sai — đây là thứ tự ngược, từ ngắn đến dài.",
     "Sai — thứ tự bị đảo lộn giữa trắng và tròn.",
     "Sai — đặt đen trước trắng và tròn là sai chiều dài-ngắn."
    ]
   },
   {
    "stem": "Ai là tác giả bài hát \"Tiếng chuông và ngọn cờ\"?",
    "choices": [
     "Văn Cao",
     "Trịnh Công Sơn",
     "Phạm Tuyên",
     "Hoàng Vân"
    ],
    "answer": 2,
    "explanation": "\"Tiếng chuông và ngọn cờ\" là sáng tác nổi tiếng của nhạc sĩ Phạm Tuyên, viết cho thiếu nhi.",
    "choiceFeedback": [
     "Sai — Văn Cao là tác giả bài Tiến quân ca.",
     "Sai — Trịnh Công Sơn nổi tiếng với dòng nhạc trữ tình.",
     "Đúng — Phạm Tuyên là tác giả bài \"Tiếng chuông và ngọn cờ\".",
     "Sai — Hoàng Vân là tác giả nhiều ca khúc khác, không phải bài này."
    ]
   },
   {
    "stem": "Khi hát bài \"Tiếng chuông và ngọn cờ\" theo nhóm/đồng ca, kỹ năng nào cần chú ý NHẤT để bài hát hay?",
    "choices": [
     "Hát thật to để nổi bật giọng cá nhân",
     "Hoà giọng đều, cùng tốc độ và sắc thái với cả nhóm",
     "Chỉ cần thuộc lời, không cần để ý người khác",
     "Hát nhanh hơn nhịp gốc để tạo hào hứng"
    ],
    "answer": 1,
    "explanation": "Khi hát tập thể, các thành viên cần hoà giọng, giữ đều tốc độ và sắc thái để tạo sự thống nhất, hài hoà cho bài hát.",
    "choiceFeedback": [
     "Sai — hát to lấn át người khác làm mất sự hài hoà tập thể.",
     "Đúng — hoà giọng đều, đúng tốc độ và sắc thái là yêu cầu quan trọng nhất khi hát tập thể.",
     "Sai — không chú ý người khác dễ gây lệch nhịp, lệch giọng.",
     "Sai — tự ý hát nhanh hơn làm sai lệch so với bản phối chung."
    ]
   },
   {
    "stem": "Một ô nhịp viết ở nhịp 3/4 đã có sẵn 1 nốt trắng (2 phách). Cần thêm đúng bao nhiêu nốt đen để ô nhịp đủ số phách quy định?",
    "choices": [
     "1 nốt đen",
     "2 nốt đen",
     "3 nốt đen",
     "4 nốt đen"
    ],
    "answer": 0,
    "explanation": "Nhịp 3/4 có 3 phách mỗi ô; đã có nốt trắng (2 phách) nên chỉ cần thêm 1 nốt đen (1 phách) để đủ 3 phách.",
    "choiceFeedback": [
     "Đúng — thêm 1 nốt đen (1 phách) cộng nốt trắng (2 phách) vừa đủ 3 phách.",
     "Sai — thêm 2 nốt đen sẽ dư thành 4 phách, không đúng nhịp 3/4.",
     "Sai — thêm 3 nốt đen sẽ dư quá nhiều so với 3 phách quy định.",
     "Sai — thêm 4 nốt đen càng dư nhiều hơn."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S6NT-exam-ck1": {
  "id": "S6NT-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Nghệ thuật 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Nghệ thuật 6",
  "questions": [
   {
    "stem": "Khuông nhạc có mấy dòng kẻ?",
    "choices": [
     "4 dòng",
     "5 dòng",
     "6 dòng",
     "7 dòng"
    ],
    "answer": 1,
    "explanation": "Khuông nhạc chuẩn có 5 dòng kẻ song song.",
    "choiceFeedback": [
     "Sai — khuông nhạc chuẩn có 5 dòng, không phải 4.",
     "Đúng — khuông nhạc gồm 5 dòng kẻ song song.",
     "Sai — 6 dòng nhiều hơn số dòng chuẩn.",
     "Sai — 7 dòng nhiều hơn hẳn số dòng chuẩn."
    ]
   },
   {
    "stem": "Nốt tròn bằng mấy phách trong nhịp 4/4?",
    "choices": [
     "2 phách",
     "3 phách",
     "4 phách",
     "5 phách"
    ],
    "answer": 2,
    "explanation": "Nốt tròn có trường độ 4 phách, vừa đúng trọn 1 ô nhịp 4/4.",
    "choiceFeedback": [
     "Sai — 2 phách là trường độ của nốt trắng.",
     "Sai — không có hình nốt cơ bản đơn nào bằng 3 phách.",
     "Đúng — nốt tròn có trường độ 4 phách, đúng bằng 1 ô nhịp 4/4.",
     "Sai — không có hình nốt cơ bản nào bằng 5 phách."
    ]
   },
   {
    "stem": "Đàn nhị có mấy dây?",
    "choices": [
     "1 dây",
     "2 dây",
     "3 dây",
     "4 dây"
    ],
    "answer": 1,
    "explanation": "Đàn nhị (đàn cò) là nhạc cụ dây kéo cung của Việt Nam, có 2 dây.",
    "choiceFeedback": [
     "Sai — đàn nhị có 2 dây, không phải 1.",
     "Đúng — đàn nhị có 2 dây, chơi bằng cách kéo cung.",
     "Sai — 3 dây nhiều hơn số dây thực tế của đàn nhị.",
     "Sai — 4 dây nhiều hơn số dây thực tế của đàn nhị."
    ]
   },
   {
    "stem": "Song loan là nhạc cụ gì?",
    "choices": [
     "Nhạc cụ dây, gảy bằng móng",
     "Nhạc cụ gõ, dùng giữ nhịp",
     "Nhạc cụ hơi, thổi bằng miệng",
     "Nhạc cụ gõ có màng rung như trống"
    ],
    "answer": 1,
    "explanation": "Song loan là nhạc cụ gõ nhỏ bằng gỗ, dùng để giữ nhịp, đặc biệt trong đờn ca tài tử và hát chèo.",
    "choiceFeedback": [
     "Sai — đó là mô tả của đàn tranh/đàn nguyệt, không phải song loan.",
     "Đúng — song loan là nhạc cụ gõ nhỏ dùng để giữ nhịp.",
     "Sai — đó là đặc điểm của nhạc cụ hơi như sáo, kèn.",
     "Sai — song loan là hai mảnh gỗ gõ vào nhau, không có màng rung như trống."
    ]
   },
   {
    "stem": "Đàn tranh truyền thống Việt Nam thường có bao nhiêu dây?",
    "choices": [
     "6 dây",
     "10 dây",
     "16 dây",
     "25 dây"
    ],
    "answer": 2,
    "explanation": "Đàn tranh truyền thống Việt Nam phổ biến loại 16 dây, còn gọi là đàn thập lục.",
    "choiceFeedback": [
     "Sai — 6 dây là số dây của đàn guitar.",
     "Sai — không phải số dây phổ biến của đàn tranh truyền thống.",
     "Đúng — đàn tranh truyền thống (đàn thập lục) có 16 dây.",
     "Sai — 25 dây là loại đàn tranh cải tiến hiện đại, không phải loại truyền thống phổ biến."
    ]
   },
   {
    "stem": "Sáo trúc tạo âm bằng cách nào?",
    "choices": [
     "Gảy dây bằng móng tay hoặc miếng gảy",
     "Thổi hơi qua lỗ thổi kết hợp bịt/mở các lỗ bấm",
     "Kéo cung cọ xát vào dây đàn",
     "Gõ hai mảnh gỗ vào nhau"
    ],
    "answer": 1,
    "explanation": "Sáo trúc là nhạc cụ hơi, người chơi thổi luồng hơi qua lỗ thổi và dùng ngón tay bịt/mở các lỗ bấm để thay đổi cao độ.",
    "choiceFeedback": [
     "Sai — đó là cách chơi đàn tranh/đàn nguyệt.",
     "Đúng — sáo trúc tạo âm bằng cách thổi hơi và bịt/mở lỗ bấm.",
     "Sai — đó là cách chơi đàn nhị.",
     "Sai — đó là cách chơi song loan/thanh phách."
    ]
   },
   {
    "stem": "\"Nhã nhạc cung đình Huế\" được UNESCO công nhận là gì?",
    "choices": [
     "Di sản thiên nhiên thế giới",
     "Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại",
     "Di sản văn hoá vật thể thế giới",
     "Công viên địa chất toàn cầu"
    ],
    "answer": 1,
    "explanation": "Nhã nhạc cung đình Huế được UNESCO công nhận là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại vào năm 2003.",
    "choiceFeedback": [
     "Sai — đó là danh hiệu dành cho cảnh quan thiên nhiên như Vịnh Hạ Long.",
     "Đúng — Nhã nhạc cung đình Huế được công nhận là kiệt tác di sản truyền khẩu và phi vật thể.",
     "Sai — Nhã nhạc là di sản phi vật thể (âm nhạc), không phải di sản vật thể.",
     "Sai — công viên địa chất là danh hiệu cho khu vực địa chất, không liên quan âm nhạc."
    ]
   },
   {
    "stem": "Bài \"Lý cây bông\" là dân ca vùng nào?",
    "choices": [
     "Đồng bằng Bắc Bộ",
     "Miền Trung",
     "Nam Bộ",
     "Tây Nguyên"
    ],
    "answer": 2,
    "explanation": "\"Lý cây bông\" là làn điệu dân ca quen thuộc của vùng Nam Bộ.",
    "choiceFeedback": [
     "Sai — dân ca Bắc Bộ tiêu biểu là Quan họ, Trống quân.",
     "Sai — dân ca miền Trung tiêu biểu là Hò Huế, Lý Huế.",
     "Đúng — \"Lý cây bông\" là dân ca tiêu biểu của Nam Bộ.",
     "Sai — Tây Nguyên có các làn điệu cồng chiêng, sử thi khác."
    ]
   },
   {
    "stem": "Dân ca Quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hoá phi vật thể vào khoảng năm nào?",
    "choices": [
     "1999",
     "2003",
     "2009",
     "2015"
    ],
    "answer": 2,
    "explanation": "Dân ca Quan họ Bắc Ninh được UNESCO công nhận là Di sản văn hoá phi vật thể đại diện của nhân loại năm 2009.",
    "choiceFeedback": [
     "Sai — năm 1999 chưa có công nhận này.",
     "Sai — năm 2003 là năm công nhận Nhã nhạc cung đình Huế.",
     "Đúng — Quan họ Bắc Ninh được công nhận năm 2009.",
     "Sai — năm 2015 không phải mốc công nhận Quan họ."
    ]
   },
   {
    "stem": "Quốc ca Việt Nam có tên là gì?",
    "choices": [
     "Tiến quân ca",
     "Diệt phát xít",
     "Du kích ca",
     "Nối vòng tay lớn"
    ],
    "answer": 0,
    "explanation": "Quốc ca nước Cộng hoà xã hội chủ nghĩa Việt Nam là bài \"Tiến quân ca\" do nhạc sĩ Văn Cao sáng tác.",
    "choiceFeedback": [
     "Đúng — \"Tiến quân ca\" là Quốc ca Việt Nam.",
     "Sai — \"Diệt phát xít\" cũng là sáng tác của Văn Cao nhưng không phải Quốc ca.",
     "Sai — \"Du kích ca\" là sáng tác của Đỗ Nhuận, không phải Quốc ca.",
     "Sai — \"Nối vòng tay lớn\" là sáng tác của Trịnh Công Sơn."
    ]
   },
   {
    "stem": "Nhạc sĩ Trịnh Công Sơn nổi tiếng với thể loại sáng tác nào?",
    "choices": [
     "Nhạc hành khúc cách mạng",
     "Ca khúc trữ tình mang tính triết lý (nhạc Trịnh)",
     "Nhạc thiếu nhi vui nhộn",
     "Nhạc giao hưởng cổ điển"
    ],
    "answer": 1,
    "explanation": "Trịnh Công Sơn được biết đến với những ca khúc trữ tình giàu chất thơ và triết lý nhân sinh, thường gọi là \"nhạc Trịnh\".",
    "choiceFeedback": [
     "Sai — nhạc hành khúc cách mạng gắn nhiều với Văn Cao, Đỗ Nhuận.",
     "Đúng — Trịnh Công Sơn nổi tiếng với ca khúc trữ tình giàu chất triết lý.",
     "Sai — nhạc thiếu nhi vui nhộn là sở trường của Phạm Tuyên.",
     "Sai — Trịnh Công Sơn không sáng tác theo thể loại giao hưởng cổ điển."
    ]
   },
   {
    "stem": "Trong khoá Sol, nốt nằm ở khe thứ nhất (giữa dòng kẻ 1 và 2, tính từ dưới lên) là nốt gì?",
    "choices": [
     "Nốt Mi",
     "Nốt Fa",
     "Nốt Sol",
     "Nốt La"
    ],
    "answer": 1,
    "explanation": "Theo thứ tự các khe trong khoá Sol từ dưới lên là Fa - La - Đô - Mi, nên khe thứ nhất là nốt Fa.",
    "choiceFeedback": [
     "Sai — Mi là nốt ở khe thứ 4 (trên cùng), không phải khe 1.",
     "Đúng — khe thứ nhất trong khoá Sol là nốt Fa.",
     "Sai — Sol nằm trên dòng kẻ 2, không phải khe 1.",
     "Sai — La là nốt ở khe thứ 2, không phải khe 1."
    ]
   },
   {
    "stem": "Vỗ tay theo nhịp 2/4 thường có mấy tiếng vỗ trong 1 ô nhịp?",
    "choices": [
     "1 tiếng",
     "2 tiếng",
     "3 tiếng",
     "4 tiếng"
    ],
    "answer": 1,
    "explanation": "Nhịp 2/4 có 2 phách mỗi ô nhịp nên khi vỗ tay giữ nhịp thường vỗ 2 tiếng tương ứng 2 phách.",
    "choiceFeedback": [
     "Sai — 1 tiếng chưa đủ số phách của ô nhịp 2/4.",
     "Đúng — nhịp 2/4 có 2 phách nên vỗ 2 tiếng mỗi ô nhịp.",
     "Sai — 3 tiếng ứng với nhịp 3/4.",
     "Sai — 4 tiếng ứng với nhịp 4/4."
    ]
   },
   {
    "stem": "Khi vỗ tay theo bài hát ở nhịp 4/4, mẫu hình \"mạnh - nhẹ - mạnh vừa - nhẹ\" tương ứng lần lượt với các phách nào?",
    "choices": [
     "Phách 4-3-2-1",
     "Phách 1-2-3-4",
     "Phách 2-1-4-3",
     "Phách 1-3-2-4"
    ],
    "answer": 1,
    "explanation": "Trong nhịp 4/4, phách 1 mạnh, phách 2 nhẹ, phách 3 mạnh vừa, phách 4 nhẹ - đúng theo thứ tự tự nhiên 1-2-3-4.",
    "choiceFeedback": [
     "Sai — thứ tự bị đảo ngược so với ô nhịp.",
     "Đúng — mẫu hình mạnh-nhẹ-mạnh vừa-nhẹ ứng với phách 1-2-3-4.",
     "Sai — thứ tự bị xáo trộn, không đúng vị trí phách mạnh-nhẹ chuẩn.",
     "Sai — thứ tự không khớp mẫu hình mạnh-nhẹ-mạnh vừa-nhẹ."
    ]
   },
   {
    "stem": "Một bài hát viết ở nhịp 2/4, tiết tấu dứt khoát, thường được hát trang nghiêm khi chào cờ đầu tuần. Bài hát đó có nhiều khả năng là bài nào?",
    "choices": [
     "Lý cây bông",
     "Tiến quân ca",
     "Tiếng chuông và ngọn cờ",
     "Nối vòng tay lớn"
    ],
    "answer": 1,
    "explanation": "\"Tiến quân ca\" (Quốc ca) có tính chất hành khúc trang nghiêm, nhịp 2/4 dứt khoát, được hát khi chào cờ.",
    "choiceFeedback": [
     "Sai — \"Lý cây bông\" là dân ca trữ tình vùng Nam Bộ, không dùng khi chào cờ.",
     "Đúng — \"Tiến quân ca\" là bài hát nghi thức chào cờ mang tính hành khúc trang nghiêm.",
     "Sai — \"Tiếng chuông và ngọn cờ\" mang tính chất vui tươi, dành cho thiếu nhi, không phải nghi thức chào cờ.",
     "Sai — \"Nối vòng tay lớn\" mang tính chất sôi nổi, đoàn kết, không phải bài hát nghi thức chào cờ."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S6NT-exam-gk2": {
  "id": "S6NT-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Nghệ thuật 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Nghệ thuật 6",
  "questions": [
   {
    "stem": "Ba màu cơ bản (màu chính) trong hội hoạ là?",
    "choices": [
     "Đỏ, Vàng, Xanh lam",
     "Đỏ, Cam, Tím",
     "Xanh lá, Vàng, Tím",
     "Đỏ, Đen, Trắng"
    ],
    "answer": 0,
    "explanation": "Ba màu cơ bản (màu gốc) là Đỏ, Vàng, Xanh lam — không thể pha trộn từ các màu khác mà có.",
    "choiceFeedback": [
     "Đúng — Đỏ, Vàng, Xanh lam là ba màu gốc không pha trộn được.",
     "Sai — Cam và Tím là màu pha (bậc 2), không phải màu gốc.",
     "Sai — Xanh lá và Tím đều là màu pha, không phải màu cơ bản.",
     "Sai — Đen và Trắng là sắc độ vô sắc, không thuộc 3 màu cơ bản."
    ]
   },
   {
    "stem": "Đỏ + Vàng = màu gì?",
    "choices": [
     "Xanh lá",
     "Cam",
     "Tím",
     "Nâu"
    ],
    "answer": 1,
    "explanation": "Pha màu Đỏ với Vàng tạo ra màu Cam.",
    "choiceFeedback": [
     "Sai — Xanh lá là kết quả pha Vàng với Xanh lam.",
     "Đúng — Đỏ pha Vàng cho ra màu Cam.",
     "Sai — Tím là kết quả pha Đỏ với Xanh lam.",
     "Sai — Nâu thường pha từ nhiều màu hoặc màu bổ túc, không phải từ Đỏ+Vàng đơn thuần."
    ]
   },
   {
    "stem": "Vàng + Xanh lam = màu gì?",
    "choices": [
     "Cam",
     "Tím",
     "Xanh lá",
     "Hồng"
    ],
    "answer": 2,
    "explanation": "Pha màu Vàng với Xanh lam tạo ra màu Xanh lá (lục).",
    "choiceFeedback": [
     "Sai — Cam là kết quả pha Đỏ với Vàng.",
     "Sai — Tím là kết quả pha Đỏ với Xanh lam.",
     "Đúng — Vàng pha Xanh lam cho ra màu Xanh lá.",
     "Sai — Hồng là sắc thái nhạt của Đỏ, không phải từ Vàng+Xanh lam."
    ]
   },
   {
    "stem": "Hai màu nằm ĐỐI DIỆN nhau trên vòng tròn màu gọi là gì?",
    "choices": [
     "Màu tương đồng",
     "Màu bổ túc (tương phản)",
     "Màu trung tính",
     "Màu gốc"
    ],
    "answer": 1,
    "explanation": "Hai màu đối diện nhau trên vòng tròn màu được gọi là cặp màu bổ túc, đặt cạnh nhau tạo hiệu ứng tương phản mạnh.",
    "choiceFeedback": [
     "Sai — màu tương đồng là các màu đứng gần nhau trên vòng tròn, không đối diện.",
     "Đúng — hai màu đối diện nhau trên vòng tròn màu là cặp màu bổ túc.",
     "Sai — màu trung tính chỉ nhóm màu như xám, be, không liên quan vị trí đối diện.",
     "Sai — màu gốc là Đỏ-Vàng-Xanh lam, không phải khái niệm về vị trí đối diện."
    ]
   },
   {
    "stem": "Bổ túc của màu Đỏ là màu gì?",
    "choices": [
     "Vàng",
     "Xanh lá (lục)",
     "Xanh lam",
     "Tím"
    ],
    "answer": 1,
    "explanation": "Trên vòng tròn màu, Đỏ đối diện với Xanh lá, nên Xanh lá là màu bổ túc của Đỏ.",
    "choiceFeedback": [
     "Sai — Vàng không đối diện với Đỏ trên vòng tròn màu.",
     "Đúng — Xanh lá (lục) là màu bổ túc của Đỏ.",
     "Sai — Xanh lam là bổ túc của Cam, không phải của Đỏ.",
     "Sai — Tím là bổ túc của Vàng, không phải của Đỏ."
    ]
   },
   {
    "stem": "\"Đậm – nhạt\" trong mỹ thuật chỉ điều gì?",
    "choices": [
     "Sự khác nhau về kích thước hình vẽ",
     "Mức độ sáng - tối của màu sắc, hình khối",
     "Số lượng màu sử dụng trong tranh",
     "Chất liệu vẽ tranh"
    ],
    "answer": 1,
    "explanation": "Đậm - nhạt (sắc độ) diễn tả mức độ sáng - tối, giúp tạo cảm giác khối và không gian cho hình vẽ.",
    "choiceFeedback": [
     "Sai — kích thước là yếu tố tỉ lệ, không phải đậm nhạt.",
     "Đúng — đậm nhạt là mức độ sáng - tối của màu sắc, hình khối.",
     "Sai — số lượng màu là yếu tố hoà sắc, khác với đậm nhạt.",
     "Sai — chất liệu là vật liệu vẽ, không liên quan trực tiếp đến sắc độ."
    ]
   },
   {
    "stem": "Nguyên tắc \"gần lớn – xa nhỏ\" thuộc về kỹ thuật nào?",
    "choices": [
     "Pha màu",
     "Phối cảnh (luật xa gần)",
     "Trang trí đối xứng",
     "Vẽ đậm nhạt"
    ],
    "answer": 1,
    "explanation": "\"Gần lớn - xa nhỏ\" là nguyên tắc cơ bản của luật xa gần (phối cảnh), giúp tranh có chiều sâu không gian.",
    "choiceFeedback": [
     "Sai — pha màu liên quan đến phối hợp màu sắc, không liên quan kích thước theo khoảng cách.",
     "Đúng — \"gần lớn - xa nhỏ\" là nguyên tắc của luật xa gần (phối cảnh).",
     "Sai — trang trí đối xứng là nguyên tắc bố cục hoạ tiết, không liên quan phối cảnh.",
     "Sai — đậm nhạt diễn tả sáng tối, không phải kích thước theo khoảng cách."
    ]
   },
   {
    "stem": "\"Điểm tụ\" trong phối cảnh là gì?",
    "choices": [
     "Điểm sáng nhất trên vật thể",
     "Điểm các đường thẳng song song hội tụ lại trên đường chân trời",
     "Điểm giữa của bức tranh",
     "Điểm đặt nguồn sáng chính"
    ],
    "answer": 1,
    "explanation": "Điểm tụ là điểm mà các đường thẳng song song (như hai mép đường) có xu hướng hội tụ về khi đi xa, thường nằm trên đường chân trời.",
    "choiceFeedback": [
     "Sai — điểm sáng nhất trên vật thể là khái niệm về đậm nhạt, không phải điểm tụ.",
     "Đúng — điểm tụ là nơi các đường song song hội tụ trên đường chân trời.",
     "Sai — điểm giữa bức tranh chỉ là vị trí bố cục, không phải điểm tụ.",
     "Sai — điểm tụ là khái niệm phối cảnh, không liên quan trực tiếp đến nguồn sáng."
    ]
   },
   {
    "stem": "Theo cách vẽ tỉ lệ cơ thể cơ bản, chiều cao người trưởng thành thường bằng khoảng mấy lần chiều cao đầu?",
    "choices": [
     "4 - 5 lần",
     "5 - 6 lần",
     "7 - 7,5 lần",
     "9 - 10 lần"
    ],
    "answer": 2,
    "explanation": "Theo tỉ lệ vẽ cơ bản, chiều cao người trưởng thành thường bằng khoảng 7 đến 7,5 lần chiều cao đầu.",
    "choiceFeedback": [
     "Sai — 4-5 lần gần với tỉ lệ trẻ nhỏ tuổi mẫu giáo, không phải người trưởng thành.",
     "Sai — 5-6 lần thấp hơn tỉ lệ chuẩn của người trưởng thành.",
     "Đúng — người trưởng thành cao khoảng 7 - 7,5 lần chiều cao đầu.",
     "Sai — 9-10 lần là tỉ lệ được đẩy cao hơn thực tế, dùng trong vẽ minh hoạ cách điệu."
    ]
   },
   {
    "stem": "\"Tĩnh vật\" trong mỹ thuật là gì?",
    "choices": [
     "Tranh vẽ chân dung người đang chuyển động",
     "Tranh vẽ các vật thể không chuyển động được sắp xếp có chủ ý",
     "Tranh vẽ phong cảnh thiên nhiên rộng lớn",
     "Tranh vẽ theo trí tưởng tượng, không có mẫu thật"
    ],
    "answer": 1,
    "explanation": "Tĩnh vật là thể loại tranh vẽ các đồ vật không tự chuyển động (lọ hoa, quả, bình...) được người vẽ sắp xếp bố cục trước khi vẽ.",
    "choiceFeedback": [
     "Sai — chân dung là thể loại khác, tập trung vẽ con người.",
     "Đúng — tĩnh vật vẽ các vật thể không chuyển động, được sắp xếp có chủ ý.",
     "Sai — đó là mô tả tranh phong cảnh, không phải tĩnh vật.",
     "Sai — tĩnh vật thường vẽ theo mẫu thật được bày sẵn, không phải vẽ tưởng tượng."
    ]
   },
   {
    "stem": "Khi vẽ một quả tròn (ví dụ quả cam), để tạo cảm giác khối, người vẽ cần thể hiện điều gì?",
    "choices": [
     "Chỉ cần vẽ đường viền tròn đều, không cần thêm gì khác",
     "Thể hiện sắc độ đậm nhạt chuyển dần từ sáng sang tối và bóng đổ",
     "Tô cùng một màu đều khắp bề mặt quả",
     "Vẽ thêm thật nhiều đường viền lặp lại quanh quả"
    ],
    "answer": 1,
    "explanation": "Để tạo cảm giác khối tròn, cần vẽ đậm nhạt chuyển sắc độ từ vùng sáng sang vùng tối, kèm bóng đổ hợp lý.",
    "choiceFeedback": [
     "Sai — chỉ vẽ đường viền tròn thì hình vẫn phẳng, chưa có khối.",
     "Đúng — cần chuyển sắc độ đậm nhạt từ sáng sang tối kèm bóng đổ để tạo khối.",
     "Sai — tô đều một màu làm mất cảm giác sáng tối, hình sẽ phẳng.",
     "Sai — vẽ nhiều đường viền lặp lại không tạo được hiệu ứng khối như đậm nhạt."
    ]
   },
   {
    "stem": "Khi vẽ một con đường thẳng đi xa theo luật xa gần, hai mép đường sẽ có xu hướng gì?",
    "choices": [
     "Song song mãi mãi, không thay đổi khoảng cách",
     "Thu hẹp dần và có xu hướng gặp nhau tại điểm tụ",
     "Mở rộng dần ra khi đi xa",
     "Uốn cong ngẫu nhiên không theo quy luật"
    ],
    "answer": 1,
    "explanation": "Theo luật xa gần, các đường thẳng song song trong thực tế (như hai mép đường) khi vẽ sẽ thu hẹp dần và có xu hướng gặp nhau tại điểm tụ trên đường chân trời.",
    "choiceFeedback": [
     "Sai — trên tranh vẽ theo phối cảnh, hai mép đường không giữ nguyên khoảng cách song song.",
     "Đúng — hai mép đường thu hẹp dần và gặp nhau tại điểm tụ.",
     "Sai — mở rộng ra là ngược với quy luật xa gần.",
     "Sai — luật xa gần có quy luật rõ ràng (hội tụ về điểm tụ), không phải ngẫu nhiên."
    ]
   },
   {
    "stem": "Để diễn tả cảnh hoàng hôn ở quê hương sinh động, nên ưu tiên sử dụng tông màu nào?",
    "choices": [
     "Tông màu lạnh (xanh lam, xanh lá đậm)",
     "Tông màu nóng (cam, đỏ, vàng)",
     "Chỉ dùng màu đen trắng",
     "Tông màu trung tính (xám, be) toàn bộ"
    ],
    "answer": 1,
    "explanation": "Cảnh hoàng hôn thường có ánh sáng cam, đỏ, vàng rực rỡ nên dùng tông màu nóng sẽ diễn tả đúng và sinh động không khí buổi chiều tà.",
    "choiceFeedback": [
     "Sai — tông lạnh thường hợp với cảnh biển đêm, mùa đông hơn là hoàng hôn rực rỡ.",
     "Đúng — tông màu nóng (cam, đỏ, vàng) diễn tả đúng ánh sáng hoàng hôn.",
     "Sai — chỉ dùng đen trắng sẽ mất đi sắc màu đặc trưng của hoàng hôn.",
     "Sai — tông trung tính làm cảnh trở nên nhạt nhoà, thiếu điểm nhấn ánh sáng hoàng hôn."
    ]
   },
   {
    "stem": "\"Tiền cảnh – trung cảnh – hậu cảnh\" trong tranh phong cảnh dùng để chỉ điều gì?",
    "choices": [
     "Ba mảng màu chính của bức tranh",
     "Cách phân chia không gian tranh theo khoảng cách gần - vừa - xa dần",
     "Ba bước vẽ chì - tô màu - hoàn thiện",
     "Ba loại chất liệu khác nhau trong một bức tranh"
    ],
    "answer": 1,
    "explanation": "\"Tiền cảnh - trung cảnh - hậu cảnh\" là cách phân lớp không gian trong tranh phong cảnh theo thứ tự từ gần đến xa, giúp tranh có chiều sâu.",
    "choiceFeedback": [
     "Sai — đây không phải khái niệm về màu sắc mà là về bố cục không gian.",
     "Đúng — đây là cách phân lớp không gian tranh theo khoảng cách gần - vừa - xa.",
     "Sai — đó là các bước thực hiện tranh, khác với khái niệm phân lớp không gian.",
     "Sai — tiền/trung/hậu cảnh không liên quan đến chất liệu vẽ."
    ]
   },
   {
    "stem": "Khi vẽ một bức tranh phong cảnh quê hương có con đường dẫn vào xa, để tạo chiều sâu không gian hợp lý, hoạ sĩ cần vận dụng ĐỒNG THỜI những yếu tố nào?",
    "choices": [
     "Chỉ cần luật xa gần (phối cảnh)",
     "Chỉ cần đậm nhạt, không cần chú ý kích thước",
     "Luật xa gần kết hợp đậm nhạt và giảm dần kích thước, độ rõ nét theo khoảng cách",
     "Chỉ cần dùng nhiều màu sắc sặc sỡ"
    ],
    "answer": 2,
    "explanation": "Chiều sâu không gian được tạo nên nhờ kết hợp đồng thời luật xa gần (điểm tụ, đường chân trời), sắc độ đậm nhạt và sự giảm dần kích thước, độ rõ nét của vật ở xa.",
    "choiceFeedback": [
     "Sai — chỉ dùng phối cảnh mà thiếu đậm nhạt thì hình khối và không gian chưa thật sinh động.",
     "Sai — chỉ đậm nhạt mà bỏ qua kích thước theo khoảng cách thì chiều sâu chưa thuyết phục.",
     "Đúng — cần kết hợp luật xa gần, đậm nhạt và giảm dần kích thước, độ rõ nét theo khoảng cách.",
     "Sai — màu sắc sặc sỡ không quyết định chiều sâu không gian nếu thiếu các yếu tố phối cảnh và đậm nhạt."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S6NT-exam-ck2": {
  "id": "S6NT-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Nghệ thuật 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Nghệ thuật 6",
  "questions": [
   {
    "stem": "Ba màu cơ bản trong hội hoạ là?",
    "choices": [
     "Đỏ, Vàng, Xanh lam",
     "Cam, Tím, Xanh lá",
     "Đen, Trắng, Xám",
     "Hồng, Nâu, Be"
    ],
    "answer": 0,
    "explanation": "Ba màu cơ bản không thể pha trộn mà có là Đỏ, Vàng, Xanh lam.",
    "choiceFeedback": [
     "Đúng — Đỏ, Vàng, Xanh lam là ba màu gốc.",
     "Sai — Cam, Tím, Xanh lá là các màu pha bậc 2, không phải màu gốc.",
     "Sai — Đen, Trắng, Xám là các sắc độ vô sắc, không phải màu cơ bản.",
     "Sai — Hồng, Nâu, Be là các màu pha/sắc thái, không phải màu gốc."
    ]
   },
   {
    "stem": "Trang trí hình vuông thường dùng nguyên tắc nào?",
    "choices": [
     "Ngẫu nhiên, không theo quy luật",
     "Đối xứng qua các trục (trục dọc, ngang, chéo)",
     "Chỉ dùng một màu duy nhất",
     "Vẽ tự do không cần bố cục"
    ],
    "answer": 1,
    "explanation": "Trang trí hình vuông thường vận dụng nguyên tắc đối xứng qua trục dọc, trục ngang và hai trục chéo để hoạ tiết cân đối.",
    "choiceFeedback": [
     "Sai — trang trí có quy luật rõ ràng, không phải ngẫu nhiên.",
     "Đúng — trang trí hình vuông dùng nguyên tắc đối xứng qua các trục.",
     "Sai — có thể phối nhiều màu, không bắt buộc một màu.",
     "Sai — trang trí luôn cần bố cục cân đối, không vẽ tự do tuỳ tiện."
    ]
   },
   {
    "stem": "Hình tròn trong trang trí có bao nhiêu trục đối xứng?",
    "choices": [
     "1 trục",
     "2 trục",
     "4 trục",
     "Vô số trục đi qua tâm"
    ],
    "answer": 3,
    "explanation": "Hình tròn có vô số trục đối xứng, vì bất kỳ đường thẳng nào đi qua tâm cũng chia hình tròn thành hai nửa bằng nhau.",
    "choiceFeedback": [
     "Sai — 1 trục là quá ít so với tính đối xứng của hình tròn.",
     "Sai — 2 trục vẫn chưa phản ánh đúng đặc điểm hình tròn.",
     "Sai — 4 trục là số trục của hình vuông, không phải hình tròn.",
     "Đúng — hình tròn có vô số trục đối xứng đi qua tâm."
    ]
   },
   {
    "stem": "Tranh Đông Hồ là dòng tranh dân gian gắn với vùng nào?",
    "choices": [
     "Làng Đông Hồ, Thuận Thành, Bắc Ninh",
     "Phố Hàng Trống, Hà Nội",
     "Làng Sình, Huế",
     "Hội An, Quảng Nam"
    ],
    "answer": 0,
    "explanation": "Tranh Đông Hồ có nguồn gốc từ làng Đông Hồ, xã Song Hồ (nay thuộc phường Thuận Thành), tỉnh Bắc Ninh.",
    "choiceFeedback": [
     "Đúng — tranh Đông Hồ có nguồn gốc từ làng Đông Hồ, Thuận Thành, Bắc Ninh.",
     "Sai — Hàng Trống là nơi gắn với dòng tranh Hàng Trống khác.",
     "Sai — làng Sình (Huế) gắn với dòng tranh dân gian làng Sình.",
     "Sai — Hội An không phải nơi gốc của tranh Đông Hồ."
    ]
   },
   {
    "stem": "\"Giấy điệp\" dùng trong tranh Đông Hồ là loại giấy như thế nào?",
    "choices": [
     "Giấy trắng công nghiệp thông thường",
     "Giấy dó quét bột vỏ sò điệp tạo nền óng ánh",
     "Giấy bồi nhiều lớp không xử lý bề mặt",
     "Giấy nhập khẩu tráng nhựa bóng"
    ],
    "answer": 1,
    "explanation": "Giấy điệp là giấy dó được quét một lớp hồ trộn bột vỏ sò điệp nghiền mịn, tạo nền có ánh sáng lấp lánh đặc trưng cho tranh Đông Hồ.",
    "choiceFeedback": [
     "Sai — giấy điệp không phải giấy công nghiệp thông thường mà là giấy dó xử lý thủ công.",
     "Đúng — giấy điệp là giấy dó quét bột vỏ sò điệp, tạo nền óng ánh.",
     "Sai — giấy điệp có xử lý bề mặt bằng bột điệp, không để trơn nhiều lớp.",
     "Sai — giấy điệp làm thủ công truyền thống, không phải giấy tráng nhựa công nghiệp."
    ]
   },
   {
    "stem": "Tranh Hàng Trống có nguồn gốc ở đâu?",
    "choices": [
     "Phố Hàng Trống, Hà Nội",
     "Làng Đông Hồ, Bắc Ninh",
     "Làng Sình, Huế",
     "Làng Chuông, Hà Tây cũ"
    ],
    "answer": 0,
    "explanation": "Tranh Hàng Trống có nguồn gốc từ phố Hàng Trống, khu phố cổ Hà Nội.",
    "choiceFeedback": [
     "Đúng — tranh Hàng Trống có nguồn gốc từ phố Hàng Trống, Hà Nội.",
     "Sai — đó là nguồn gốc của tranh Đông Hồ.",
     "Sai — làng Sình gắn với dòng tranh dân gian khác ở Huế.",
     "Sai — làng Chuông nổi tiếng nghề làm nón, không phải tranh dân gian."
    ]
   },
   {
    "stem": "Kỹ thuật làm tranh Hàng Trống khác tranh Đông Hồ chủ yếu ở điểm nào?",
    "choices": [
     "Hàng Trống chỉ in ván khắc toàn bộ màu, không tô tay",
     "Hàng Trống in nét đen bằng ván khắc rồi tô màu tay bằng bút lông; Đông Hồ in cả hình và màu bằng nhiều bản khắc",
     "Hàng Trống không dùng bản khắc gỗ nào cả",
     "Hai dòng tranh có kỹ thuật hoàn toàn giống nhau"
    ],
    "answer": 1,
    "explanation": "Tranh Hàng Trống chỉ dùng một bản khắc để in nét đen, sau đó nghệ nhân tô màu bằng tay bằng bút lông; còn tranh Đông Hồ dùng nhiều bản khắc gỗ in đè các mảng màu.",
    "choiceFeedback": [
     "Sai — đó là mô tả gần với kỹ thuật tranh Đông Hồ, không phải Hàng Trống.",
     "Đúng — Hàng Trống in nét đen rồi tô màu tay, Đông Hồ in cả hình và màu bằng nhiều bản khắc.",
     "Sai — Hàng Trống vẫn dùng bản khắc gỗ để in nét đen.",
     "Sai — hai dòng tranh có kỹ thuật khác nhau rõ rệt về cách lên màu."
    ]
   },
   {
    "stem": "Bức tranh \"Mona Lisa\" do hoạ sĩ nào vẽ?",
    "choices": [
     "Vincent van Gogh",
     "Leonardo da Vinci",
     "Pablo Picasso",
     "Claude Monet"
    ],
    "answer": 1,
    "explanation": "\"Mona Lisa\" là kiệt tác nổi tiếng của danh hoạ Leonardo da Vinci, thời kỳ Phục hưng.",
    "choiceFeedback": [
     "Sai — Van Gogh là hoạ sĩ trường phái Hậu ấn tượng, không vẽ Mona Lisa.",
     "Đúng — \"Mona Lisa\" là tác phẩm của Leonardo da Vinci.",
     "Sai — Picasso là hoạ sĩ trường phái Lập thể, sống sau thời Phục hưng rất lâu.",
     "Sai — Monet là hoạ sĩ trường phái Ấn tượng, không phải tác giả Mona Lisa."
    ]
   },
   {
    "stem": "Bức \"Đêm đầy sao\" (The Starry Night) là sáng tác của ai?",
    "choices": [
     "Leonardo da Vinci",
     "Vincent van Gogh",
     "Claude Monet",
     "Pablo Picasso"
    ],
    "answer": 1,
    "explanation": "\"Đêm đầy sao\" là một trong những tác phẩm nổi tiếng nhất của hoạ sĩ Vincent van Gogh.",
    "choiceFeedback": [
     "Sai — Da Vinci là tác giả của Mona Lisa, không phải Đêm đầy sao.",
     "Đúng — \"Đêm đầy sao\" là tác phẩm nổi tiếng của Van Gogh.",
     "Sai — Monet nổi tiếng với các bức vẽ về ao súng, không phải Đêm đầy sao.",
     "Sai — Picasso theo trường phái Lập thể, không sáng tác bức tranh này."
    ]
   },
   {
    "stem": "Phong cách hội hoạ của Van Gogh thuộc trào lưu nào?",
    "choices": [
     "Hậu ấn tượng (Post-Impressionism)",
     "Phục hưng",
     "Lập thể (Cubism)",
     "Siêu thực (Surrealism)"
    ],
    "answer": 0,
    "explanation": "Van Gogh là đại diện tiêu biểu của trào lưu Hậu ấn tượng, với nét vẽ mạnh, màu sắc rực rỡ và cảm xúc mãnh liệt.",
    "choiceFeedback": [
     "Đúng — Van Gogh thuộc trào lưu Hậu ấn tượng.",
     "Sai — Phục hưng là thời kỳ sớm hơn nhiều, gắn với Leonardo da Vinci.",
     "Sai — Lập thể gắn với Picasso, xuất hiện sau thời Van Gogh.",
     "Sai — Siêu thực là trào lưu thế kỷ 20, không phải phong cách của Van Gogh."
    ]
   },
   {
    "stem": "\"Mỹ thuật ứng dụng\" là gì?",
    "choices": [
     "Mỹ thuật chỉ để trưng bày trong bảo tàng, không có công năng sử dụng",
     "Lĩnh vực mỹ thuật gắn với thiết kế phục vụ nhu cầu thực tiễn của đời sống (logo, poster, bao bì...)",
     "Chỉ bao gồm việc vẽ tranh phong cảnh",
     "Một tên gọi khác của hội hoạ sơn dầu cổ điển"
    ],
    "answer": 1,
    "explanation": "Mỹ thuật ứng dụng là lĩnh vực mỹ thuật kết hợp yếu tố thẩm mỹ với công năng sử dụng thực tế, như thiết kế logo, poster, bao bì sản phẩm.",
    "choiceFeedback": [
     "Sai — đó là đặc điểm gần với mỹ thuật tạo hình thuần tuý, không phải mỹ thuật ứng dụng.",
     "Đúng — mỹ thuật ứng dụng gắn với thiết kế phục vụ nhu cầu thực tiễn đời sống.",
     "Sai — vẽ tranh phong cảnh thuộc mỹ thuật tạo hình, không phải ứng dụng.",
     "Sai — mỹ thuật ứng dụng không đồng nhất với một chất liệu hay trường phái cụ thể nào."
    ]
   },
   {
    "stem": "Một logo thương hiệu được coi là THIẾT KẾ TỐT khi có đặc điểm nào sau đây?",
    "choices": [
     "Càng nhiều chi tiết, màu sắc càng tốt",
     "Đơn giản, dễ nhận biết, thể hiện đúng đặc trưng thương hiệu và dễ ghi nhớ",
     "Chỉ cần đẹp, không cần liên quan đến thương hiệu",
     "Sao chép logo của thương hiệu nổi tiếng khác để dễ nhận diện"
    ],
    "answer": 1,
    "explanation": "Logo tốt cần đơn giản, dễ nhận biết, thể hiện đúng bản sắc thương hiệu và dễ ghi nhớ trong mắt người xem.",
    "choiceFeedback": [
     "Sai — quá nhiều chi tiết, màu sắc khiến logo khó nhận diện và ghi nhớ.",
     "Đúng — logo tốt cần đơn giản, dễ nhận biết và đúng đặc trưng thương hiệu.",
     "Sai — logo cần gắn liền và thể hiện đúng đặc trưng thương hiệu, không thể tách rời.",
     "Sai — sao chép logo khác vi phạm bản quyền và làm mất bản sắc riêng."
    ]
   },
   {
    "stem": "Kỹ thuật xé dán khác kỹ thuật cắt dán chủ yếu ở điểm nào?",
    "choices": [
     "Xé dán tạo đường mép gọn, thẳng như dùng kéo",
     "Xé dán tạo đường mép tự nhiên, không đều do xé bằng tay; cắt dán tạo đường thẳng, gọn bằng kéo/dao",
     "Xé dán không sử dụng giấy màu",
     "Hai kỹ thuật hoàn toàn giống nhau về hiệu quả tạo hình"
    ],
    "answer": 1,
    "explanation": "Xé dán tạo hình bằng cách xé giấy bằng tay nên đường mép có độ nhám, tự nhiên, không đều; trong khi cắt dán dùng kéo/dao nên đường nét thẳng, gọn, chính xác hơn.",
    "choiceFeedback": [
     "Sai — đó là đặc điểm của cắt dán, không phải xé dán.",
     "Đúng — xé dán tạo mép tự nhiên không đều, cắt dán tạo đường thẳng gọn.",
     "Sai — xé dán vẫn thường dùng giấy màu làm chất liệu chính.",
     "Sai — hai kỹ thuật cho hiệu quả tạo hình khác nhau rõ rệt về đường nét."
    ]
   },
   {
    "stem": "Khi trang trí hình tròn theo cảm hứng mặt trống đồng Đông Sơn, hoạ tiết thường được tổ chức theo dạng nào?",
    "choices": [
     "Các mảng màu lớn không theo quy luật",
     "Các vòng hoạ tiết đồng tâm quanh một tâm điểm ở giữa",
     "Chỉ có hoạ tiết ở viền ngoài, giữa để trống",
     "Hoạ tiết xếp thành hàng ngang song song"
    ],
    "answer": 1,
    "explanation": "Mặt trống đồng Đông Sơn có hoạ tiết được sắp xếp thành các vòng tròn đồng tâm bao quanh ngôi sao nhiều cánh ở giữa, đây cũng là cách tổ chức phổ biến khi trang trí hình tròn.",
    "choiceFeedback": [
     "Sai — hoạ tiết mặt trống đồng có quy luật rõ ràng, không phải ngẫu nhiên.",
     "Đúng — hoạ tiết mặt trống đồng tổ chức thành các vòng đồng tâm quanh tâm điểm.",
     "Sai — mặt trống đồng có hoạ tiết trải đều từ tâm ra ngoài, không bỏ trống phần giữa.",
     "Sai — hoạ tiết trên mặt trống tổ chức theo vòng tròn đồng tâm, không phải hàng ngang."
    ]
   },
   {
    "stem": "Điểm khác biệt CƠ BẢN NHẤT giữa mỹ thuật ứng dụng và mỹ thuật tạo hình thuần tuý (tranh, tượng) là gì?",
    "choices": [
     "Mỹ thuật ứng dụng không cần yếu tố thẩm mỹ",
     "Mỹ thuật ứng dụng gắn liền với công năng sử dụng trong đời sống, còn mỹ thuật tạo hình thuần tuý chủ yếu để thưởng thức thẩm mỹ, biểu đạt cảm xúc",
     "Mỹ thuật tạo hình thuần tuý mới cần bố cục, mỹ thuật ứng dụng thì không",
     "Hai lĩnh vực này không có gì khác nhau"
    ],
    "answer": 1,
    "explanation": "Mỹ thuật ứng dụng (logo, poster, bao bì, thời trang...) luôn gắn với công năng sử dụng thực tiễn; còn mỹ thuật tạo hình thuần tuý như tranh, tượng chủ yếu nhằm mục đích thưởng thức thẩm mỹ và biểu đạt cảm xúc, tư tưởng của tác giả.",
    "choiceFeedback": [
     "Sai — mỹ thuật ứng dụng vẫn rất cần yếu tố thẩm mỹ để hấp dẫn người dùng.",
     "Đúng — khác biệt cơ bản là công năng sử dụng thực tiễn so với mục đích thưởng thức thẩm mỹ.",
     "Sai — cả hai lĩnh vực đều cần bố cục hợp lý, chỉ khác mục đích sử dụng.",
     "Sai — hai lĩnh vực khác nhau rõ rệt về mục đích và công năng như đã phân tích."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
