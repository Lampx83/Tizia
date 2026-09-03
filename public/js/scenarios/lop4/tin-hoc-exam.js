// P4TIN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P4TIN_EXAMS = {
 "P4TIN-exam-gk1": {
  "id": "P4TIN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Tin học 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Tin học 4",
  "questions": [
   {
    "stem": "Phần cứng máy tính là gì?",
    "choices": [
     "Các bộ phận, thiết bị vật lí của máy tính mà em có thể nhìn thấy, sờ được",
     "Các chương trình chạy trên máy tính",
     "Các trang web trên Internet",
     "Các bài hát được lưu trong máy tính"
    ],
    "answer": 0,
    "explanation": "Phần cứng là các bộ phận, thiết bị vật lí của máy tính như màn hình, bàn phím, chuột, thân máy... mà em nhìn thấy và sờ được.",
    "choiceFeedback": [
     "Đúng — phần cứng là các bộ phận, thiết bị vật lí có thể nhìn thấy và sờ được của máy tính.",
     "Sai — đó là khái niệm phần mềm, không phải phần cứng.",
     "Sai — trang web không phải là một bộ phận vật lí của máy tính.",
     "Sai — bài hát là dữ liệu được lưu trữ, không phải phần cứng."
    ]
   },
   {
    "stem": "Đâu là một thiết bị phần cứng?",
    "choices": [
     "Phần mềm soạn thảo văn bản",
     "Bàn phím",
     "Trò chơi điện tử",
     "Bài hát trong máy tính"
    ],
    "answer": 1,
    "explanation": "Bàn phím là thiết bị vật lí dùng để nhập dữ liệu, thuộc phần cứng máy tính.",
    "choiceFeedback": [
     "Sai — phần mềm soạn thảo văn bản là một chương trình, không phải phần cứng.",
     "Đúng — bàn phím là thiết bị vật lí, thuộc về phần cứng máy tính.",
     "Sai — trò chơi điện tử là một loại phần mềm.",
     "Sai — bài hát là dữ liệu, không phải thiết bị phần cứng."
    ]
   },
   {
    "stem": "Phần mềm là gì?",
    "choices": [
     "Thiết bị dùng để gõ chữ",
     "Vỏ ngoài bằng nhựa của máy tính",
     "Các chương trình giúp máy tính thực hiện công việc theo yêu cầu của con người",
     "Dây điện nối máy tính với nguồn điện"
    ],
    "answer": 2,
    "explanation": "Phần mềm là các chương trình được cài vào máy tính để thực hiện công việc theo yêu cầu của con người.",
    "choiceFeedback": [
     "Sai — thiết bị dùng để gõ chữ (bàn phím) là phần cứng.",
     "Sai — vỏ máy là bộ phận vật lí, thuộc phần cứng.",
     "Đúng — phần mềm là các chương trình giúp máy tính làm việc theo yêu cầu.",
     "Sai — dây điện là bộ phận vật lí, thuộc phần cứng."
    ]
   },
   {
    "stem": "Thông tin là gì?",
    "choices": [
     "Chỉ là các con số trong máy tính",
     "Là tên gọi khác của phần cứng",
     "Chỉ có trong sách giáo khoa",
     "Những hiểu biết mà con người thu nhận được về sự vật, sự việc xung quanh"
    ],
    "answer": 3,
    "explanation": "Thông tin là những hiểu biết về sự vật, sự việc xung quanh mà con người thu nhận được qua nghe, nhìn, đọc...",
    "choiceFeedback": [
     "Sai — thông tin không chỉ là các con số, còn có văn bản, hình ảnh, âm thanh.",
     "Sai — thông tin và phần cứng là hai khái niệm khác nhau.",
     "Sai — thông tin có ở khắp nơi trong cuộc sống, không chỉ trong sách.",
     "Đúng — thông tin là những hiểu biết con người thu nhận được về thế giới xung quanh."
    ]
   },
   {
    "stem": "Quá trình xử lí thông tin của máy tính diễn ra theo đúng thứ tự nào?",
    "choices": [
     "Xuất thông tin → Xử lí → Thu nhận thông tin",
     "Thu nhận thông tin → Xử lí thông tin → Xuất thông tin",
     "Xử lí thông tin → Thu nhận thông tin → Xuất thông tin",
     "Chỉ có một bước duy nhất là xử lí thông tin"
    ],
    "answer": 1,
    "explanation": "Máy tính thu nhận thông tin đầu vào, xử lí thông tin đó rồi xuất ra kết quả.",
    "choiceFeedback": [
     "Sai — thứ tự này bị đảo ngược, phải thu nhận trước rồi mới xử lí và xuất.",
     "Đúng — đúng thứ tự là thu nhận, xử lí rồi xuất thông tin.",
     "Sai — không thể xử lí trước khi thu nhận thông tin đầu vào.",
     "Sai — xử lí thông tin gồm nhiều bước, không chỉ một bước."
    ]
   },
   {
    "stem": "Bức ảnh, bức tranh là thông tin dạng gì?",
    "choices": [
     "Dạng hình ảnh",
     "Dạng âm thanh",
     "Dạng văn bản",
     "Dạng con số"
    ],
    "answer": 0,
    "explanation": "Bức ảnh, bức tranh mà em nhìn thấy là thông tin thuộc dạng hình ảnh.",
    "choiceFeedback": [
     "Đúng — bức ảnh, bức tranh là thông tin dạng hình ảnh.",
     "Sai — âm thanh là thông tin nghe được, không phải nhìn được như tranh ảnh.",
     "Sai — văn bản là chữ viết, khác với hình ảnh.",
     "Sai — con số chỉ là một phần nhỏ của thông tin dạng văn bản/số liệu."
    ]
   },
   {
    "stem": "Tiếng nói, tiếng nhạc là thông tin dạng gì?",
    "choices": [
     "Dạng hình ảnh",
     "Dạng văn bản",
     "Dạng phần mềm",
     "Dạng âm thanh"
    ],
    "answer": 3,
    "explanation": "Tiếng nói, tiếng nhạc mà em nghe được là thông tin dạng âm thanh.",
    "choiceFeedback": [
     "Sai — hình ảnh là thứ nhìn thấy được, không phải nghe được.",
     "Sai — văn bản là chữ viết, không phải âm thanh.",
     "Sai — phần mềm là chương trình máy tính, không phải một dạng thông tin.",
     "Đúng — tiếng nói, tiếng nhạc là thông tin dạng âm thanh."
    ]
   },
   {
    "stem": "Trên bàn phím, hàng phím cơ sở là hàng có đặc điểm gì?",
    "choices": [
     "Hàng phím trên cùng, chứa các phím số",
     "Hàng phím dưới cùng chỉ có phím cách",
     "Hàng phím giữa, nơi đặt các ngón tay khi bắt đầu gõ, có hai phím mang gờ nổi",
     "Hàng phím ở bên phải bàn phím, chứa các phím mũi tên"
    ],
    "answer": 2,
    "explanation": "Hàng phím cơ sở nằm ở giữa bàn phím, là nơi đặt tay khi bắt đầu gõ, có hai phím F và J mang gờ nổi để nhận biết.",
    "choiceFeedback": [
     "Sai — hàng phím số nằm ở trên cùng, không phải hàng phím cơ sở.",
     "Sai — hàng dưới cùng có phím cách nhưng không phải hàng phím cơ sở.",
     "Đúng — hàng phím cơ sở ở giữa, là nơi đặt tay khi gõ, có hai phím gờ nổi.",
     "Sai — các phím mũi tên nằm ở khu vực riêng, không thuộc hàng phím cơ sở."
    ]
   },
   {
    "stem": "Hai phím có gờ nổi để đặt hai ngón tay trỏ là hai phím nào?",
    "choices": [
     "A và L",
     "F và J",
     "Q và P",
     "Space và Enter"
    ],
    "answer": 1,
    "explanation": "Hai phím F và J trên hàng phím cơ sở có gờ nổi để em đặt hai ngón trỏ đúng vị trí.",
    "choiceFeedback": [
     "Sai — A và L là hai phím ở đầu hàng cơ sở nhưng không có gờ nổi.",
     "Đúng — F và J là hai phím có gờ nổi để đặt hai ngón trỏ.",
     "Sai — Q và P nằm ở hàng phím trên, không phải hàng cơ sở.",
     "Sai — Space và Enter là các phím chức năng, không mang gờ nổi để định vị ngón trỏ."
    ]
   },
   {
    "stem": "Bạn Lan luôn nhìn xuống bàn phím để tìm từng phím khi gõ bài. Bạn nên thay đổi thói quen này như thế nào để gõ mười ngón đúng cách?",
    "choices": [
     "Tập nhìn vào màn hình hoặc tài liệu, để các ngón tay tự nhớ vị trí phím",
     "Tiếp tục nhìn xuống bàn phím vì như vậy sẽ gõ nhanh hơn",
     "Chỉ dùng một ngón tay để gõ cho chắc chắn",
     "Bỏ hẳn việc luyện gõ phím"
    ],
    "answer": 0,
    "explanation": "Gõ mười ngón đúng cách là không nhìn bàn phím, để mắt nhìn màn hình/tài liệu, các ngón tay tự nhớ vị trí phím nhờ luyện tập.",
    "choiceFeedback": [
     "Đúng — cần tập nhìn màn hình/tài liệu, để ngón tay tự nhớ vị trí phím.",
     "Sai — nhìn xuống bàn phím sẽ làm chậm quá trình luyện gõ mười ngón đúng cách.",
     "Sai — gõ mười ngón nghĩa là dùng đủ mười ngón tay, không phải một ngón.",
     "Sai — cần kiên trì luyện tập để gõ nhanh và chính xác hơn."
    ]
   },
   {
    "stem": "Khi luyện gõ mười ngón, mỗi ngón tay phụ trách một số phím nhất định. Việc làm này giúp ích gì?",
    "choices": [
     "Làm bàn phím nhanh hỏng hơn",
     "Không có tác dụng gì",
     "Chỉ giúp gõ được chữ hoa",
     "Giúp gõ nhanh và chính xác hơn nhờ ngón tay ghi nhớ vị trí phím"
    ],
    "answer": 3,
    "explanation": "Phân công mỗi ngón phụ trách một số phím giúp các ngón tay ghi nhớ vị trí, nhờ đó gõ nhanh và chính xác hơn.",
    "choiceFeedback": [
     "Sai — cách gõ không ảnh hưởng đến độ bền của bàn phím.",
     "Sai — việc phân công ngón tay có tác dụng rất lớn khi luyện gõ.",
     "Sai — cách phân công ngón tay áp dụng cho mọi kí tự, không chỉ chữ hoa.",
     "Đúng — nhờ ghi nhớ vị trí phím, mỗi ngón phụ trách phím riêng giúp gõ nhanh và chính xác hơn."
    ]
   },
   {
    "stem": "Nháy đúp chuột là thao tác như thế nào?",
    "choices": [
     "Nhấn giữ chuột và kéo sang vị trí khác",
     "Nhấn nút phải chuột một lần",
     "Nhấn nhanh liên tiếp hai lần nút trái chuột",
     "Chỉ di chuyển con trỏ chuột mà không nhấn"
    ],
    "answer": 2,
    "explanation": "Nháy đúp chuột là nhấn nhanh liên tiếp hai lần nút trái chuột, thường dùng để mở phần mềm hoặc tệp.",
    "choiceFeedback": [
     "Sai — đó là mô tả của thao tác kéo thả chuột.",
     "Sai — đó là nháy chuột phải, không phải nháy đúp.",
     "Đúng — nháy đúp chuột là nhấn nhanh liên tiếp hai lần nút trái chuột.",
     "Sai — chỉ di chuyển chuột mà không nhấn thì không phải là một thao tác nháy."
    ]
   },
   {
    "stem": "Để mở nhanh một phần mềm bằng chuột từ biểu tượng trên màn hình nền, em nên dùng thao tác nào?",
    "choices": [
     "Nháy đúp chuột trái vào biểu tượng",
     "Nháy nút phải chuột rồi để im, không làm gì thêm",
     "Kéo thả biểu tượng ra khỏi màn hình",
     "Chỉ di chuột ngang qua biểu tượng"
    ],
    "answer": 0,
    "explanation": "Để mở phần mềm từ biểu tượng, em nháy đúp chuột trái vào biểu tượng đó.",
    "choiceFeedback": [
     "Đúng — nháy đúp chuột trái vào biểu tượng sẽ mở phần mềm.",
     "Sai — nháy phải chỉ hiện menu tùy chọn, không mở phần mềm.",
     "Sai — kéo thả chỉ làm thay đổi vị trí biểu tượng, không mở phần mềm.",
     "Sai — chỉ di chuột qua mà không nháy thì phần mềm sẽ không mở."
    ]
   },
   {
    "stem": "Trên màn hình máy tính có biểu tượng phần mềm vẽ tranh. Em muốn mở phần mềm đó để vẽ một bức tranh, em cần làm gì?",
    "choices": [
     "Nhấn giữ phím Enter thật lâu",
     "Nháy đúp chuột trái vào biểu tượng phần mềm vẽ tranh",
     "Rút dây chuột ra khỏi máy tính",
     "Xóa biểu tượng đó đi"
    ],
    "answer": 1,
    "explanation": "Muốn mở phần mềm vẽ tranh, em nháy đúp chuột trái vào biểu tượng của phần mềm đó.",
    "choiceFeedback": [
     "Sai — giữ phím Enter không giúp mở phần mềm từ biểu tượng trên màn hình.",
     "Đúng — nháy đúp chuột trái vào biểu tượng sẽ mở phần mềm vẽ tranh.",
     "Sai — rút dây chuột sẽ khiến em không điều khiển được con trỏ, không mở được phần mềm.",
     "Sai — xóa biểu tượng sẽ làm mất lối tắt, không mở được phần mềm."
    ]
   },
   {
    "stem": "Em thấy trên màn hình có một biểu tượng hình chiếc đĩa mềm màu xanh dùng để lưu bài. Biểu tượng đó thể hiện điều gì?",
    "choices": [
     "Đó là một thiết bị phần cứng thật sự đang cắm vào máy",
     "Đó là virus máy tính",
     "Đó là tên gọi khác của bàn phím",
     "Đó là hình ảnh đại diện cho một lệnh hoặc phần mềm, giúp em nhận biết và thao tác nhanh"
    ],
    "answer": 3,
    "explanation": "Biểu tượng (icon) là hình ảnh nhỏ đại diện cho một lệnh, tệp hoặc phần mềm, giúp người dùng nhận biết và thao tác nhanh, không phải thiết bị vật lí thật.",
    "choiceFeedback": [
     "Sai — biểu tượng chỉ là hình ảnh đại diện, không phải thiết bị vật lí thật.",
     "Sai — biểu tượng lưu bài là chức năng bình thường của phần mềm, không phải virus.",
     "Sai — biểu tượng không liên quan đến bàn phím.",
     "Đúng — biểu tượng là hình ảnh đại diện cho một lệnh/phần mềm, giúp thao tác nhanh và dễ nhận biết."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P4TIN-exam-ck1": {
  "id": "P4TIN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Tin học 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Tin học 4",
  "questions": [
   {
    "stem": "Đâu là một thiết bị phần cứng của máy tính?",
    "choices": [
     "Phần mềm gõ văn bản",
     "Bàn phím",
     "Trò chơi điện tử",
     "Bài hát"
    ],
    "answer": 1,
    "explanation": "Bàn phím là thiết bị vật lí, thuộc về phần cứng máy tính.",
    "choiceFeedback": [
     "Sai — phần mềm gõ văn bản là chương trình, không phải phần cứng.",
     "Đúng — bàn phím là thiết bị vật lí, thuộc phần cứng máy tính.",
     "Sai — trò chơi điện tử là phần mềm.",
     "Sai — bài hát là dữ liệu, không phải thiết bị phần cứng."
    ]
   },
   {
    "stem": "Một bài thơ được in ra giấy là thông tin ở dạng nào?",
    "choices": [
     "Dạng âm thanh",
     "Dạng hình ảnh động",
     "Dạng văn bản",
     "Dạng phần mềm"
    ],
    "answer": 2,
    "explanation": "Bài thơ in trên giấy gồm các chữ viết, là thông tin dạng văn bản.",
    "choiceFeedback": [
     "Sai — âm thanh là thông tin nghe được, không phải chữ viết.",
     "Sai — bài thơ in trên giấy là chữ viết cố định, không phải hình ảnh động.",
     "Đúng — bài thơ in trên giấy là thông tin dạng văn bản.",
     "Sai — phần mềm là chương trình máy tính, không phải dạng thông tin."
    ]
   },
   {
    "stem": "Thao tác kéo thả chuột là gì?",
    "choices": [
     "Nhấn giữ nút trái chuột, di chuyển đến vị trí khác rồi thả ra",
     "Nháy nhanh hai lần nút trái chuột",
     "Chỉ di chuột mà không nhấn nút nào",
     "Nhấn đồng thời cả hai nút chuột"
    ],
    "answer": 0,
    "explanation": "Kéo thả là nhấn giữ nút trái chuột, di chuyển con trỏ đến vị trí mới rồi thả nút ra.",
    "choiceFeedback": [
     "Đúng — kéo thả là nhấn giữ chuột trái, di chuyển rồi thả ra.",
     "Sai — đó là mô tả của nháy đúp chuột.",
     "Sai — không nhấn nút nào thì chỉ là di chuyển con trỏ, không phải kéo thả.",
     "Sai — chuột thường không dùng thao tác nhấn đồng thời hai nút."
    ]
   },
   {
    "stem": "Thư mục trên máy tính dùng để làm gì?",
    "choices": [
     "Phát ra âm thanh khi mở máy",
     "Làm máy tính chạy nhanh hơn",
     "Kết nối máy tính với Internet",
     "Chứa và sắp xếp các tệp, các thư mục con một cách gọn gàng"
    ],
    "answer": 3,
    "explanation": "Thư mục dùng để chứa và tổ chức các tệp, thư mục con giúp dữ liệu gọn gàng, dễ tìm.",
    "choiceFeedback": [
     "Sai — thư mục không liên quan đến âm thanh khi mở máy.",
     "Sai — thư mục dùng để tổ chức dữ liệu, không làm tăng tốc độ máy.",
     "Sai — kết nối Internet là chức năng khác, không phải của thư mục.",
     "Đúng — thư mục dùng để chứa và sắp xếp tệp, thư mục con gọn gàng."
    ]
   },
   {
    "stem": "Tên thư mục nên được đặt như thế nào?",
    "choices": [
     "Đặt tùy ý, không cần liên quan đến nội dung",
     "Ngắn gọn, rõ ràng, dễ nhớ và liên quan đến nội dung bên trong",
     "Càng dài càng tốt để không trùng tên",
     "Không được đặt tên, để trống"
    ],
    "answer": 1,
    "explanation": "Tên thư mục nên ngắn gọn, rõ ràng, dễ nhớ và phản ánh đúng nội dung bên trong để dễ tìm kiếm.",
    "choiceFeedback": [
     "Sai — tên tùy tiện sẽ khó nhớ và khó quản lí về sau.",
     "Đúng — tên thư mục nên ngắn gọn, rõ ràng, dễ nhớ và liên quan tới nội dung.",
     "Sai — tên quá dài gây khó đọc, không cần thiết để tránh trùng tên.",
     "Sai — thư mục luôn cần có tên để phân biệt và quản lí."
    ]
   },
   {
    "stem": "Sao chép (Copy) một tệp nghĩa là gì?",
    "choices": [
     "Xóa tệp gốc và tạo tệp mới",
     "Đổi tên tệp gốc",
     "Tạo ra một bản giống hệt trong khi tệp gốc vẫn còn nguyên ở chỗ cũ",
     "Nén tệp lại cho nhỏ hơn"
    ],
    "answer": 2,
    "explanation": "Sao chép (Copy) tạo ra một bản sao giống hệt tệp gốc, tệp gốc vẫn giữ nguyên ở vị trí cũ.",
    "choiceFeedback": [
     "Sai — sao chép không xóa tệp gốc, tệp gốc vẫn còn nguyên.",
     "Sai — đổi tên chỉ thay đổi tên gọi, không tạo bản sao mới.",
     "Đúng — sao chép tạo bản giống hệt, tệp gốc vẫn còn nguyên ở chỗ cũ.",
     "Sai — nén tệp là làm giảm dung lượng, khác với sao chép."
    ]
   },
   {
    "stem": "Bạn An muốn chuyển hẳn một tệp bài tập từ thư mục 'Nháp' sang thư mục 'Bài nộp' mà không giữ lại bản ở thư mục 'Nháp'. Bạn An nên dùng thao tác nào?",
    "choices": [
     "Di chuyển (Move/Cut) tệp sang thư mục Bài nộp",
     "Sao chép (Copy) tệp sang thư mục Bài nộp",
     "Xóa (Delete) tệp rồi thôi, không làm gì thêm",
     "Đổi tên (Rename) tệp"
    ],
    "answer": 0,
    "explanation": "Di chuyển (Move/Cut) chuyển hẳn tệp sang vị trí mới, không giữ lại bản ở nơi cũ, đúng với yêu cầu của bạn An.",
    "choiceFeedback": [
     "Đúng — di chuyển (Move/Cut) sẽ chuyển hẳn tệp, không giữ bản ở thư mục Nháp.",
     "Sai — sao chép sẽ để lại một bản ở thư mục Nháp, không đúng yêu cầu.",
     "Sai — xóa tệp sẽ làm mất tệp hoàn toàn, không có bản ở thư mục Bài nộp.",
     "Sai — đổi tên chỉ thay đổi tên tệp, không chuyển tệp sang thư mục khác."
    ]
   },
   {
    "stem": "Sắp xếp dữ liệu (tệp, thư mục) giúp ích gì cho em?",
    "choices": [
     "Làm mất bớt dữ liệu cho nhẹ máy",
     "Làm máy tính bị chậm đi",
     "Không có tác dụng gì",
     "Dễ dàng tìm kiếm và quản lí tệp, thư mục hơn"
    ],
    "answer": 3,
    "explanation": "Sắp xếp dữ liệu gọn gàng giúp em dễ tìm kiếm và quản lí các tệp, thư mục hơn.",
    "choiceFeedback": [
     "Sai — sắp xếp không làm mất dữ liệu, chỉ tổ chức lại vị trí.",
     "Sai — sắp xếp gọn gàng không làm máy chậm đi.",
     "Sai — sắp xếp dữ liệu có tác dụng rất lớn trong quản lí.",
     "Đúng — sắp xếp giúp dễ tìm kiếm và quản lí tệp, thư mục hơn."
    ]
   },
   {
    "stem": "Internet là gì?",
    "choices": [
     "Một phần mềm vẽ tranh",
     "Mạng lưới kết nối hàng triệu máy tính trên khắp thế giới để trao đổi thông tin",
     "Một loại bàn phím đặc biệt",
     "Tên gọi khác của thư mục"
    ],
    "answer": 1,
    "explanation": "Internet là mạng lưới kết nối rất nhiều máy tính trên toàn thế giới, giúp con người trao đổi và tìm kiếm thông tin.",
    "choiceFeedback": [
     "Sai — phần mềm vẽ tranh là một chương trình riêng, khác với Internet.",
     "Đúng — Internet là mạng lưới kết nối máy tính toàn cầu để trao đổi thông tin.",
     "Sai — Internet không phải một loại thiết bị phần cứng như bàn phím.",
     "Sai — thư mục dùng để chứa tệp trên máy tính, không liên quan đến Internet."
    ]
   },
   {
    "stem": "Khi cần tìm thông tin về 'các loài chim ở Việt Nam' trên Internet, em nên gõ từ khóa tìm kiếm như thế nào là hợp lí nhất?",
    "choices": [
     "Gõ nguyên một đoạn văn dài kể chuyện không liên quan",
     "Không cần gõ gì, chỉ cần mở máy tính lên",
     "Gõ từ khóa ngắn gọn, đúng trọng tâm như 'các loài chim Việt Nam'",
     "Gõ toàn chữ số ngẫu nhiên"
    ],
    "answer": 2,
    "explanation": "Khi tìm kiếm, nên gõ từ khóa ngắn gọn, đúng trọng tâm để công cụ tìm kiếm cho kết quả phù hợp nhất.",
    "choiceFeedback": [
     "Sai — đoạn văn dài không liên quan sẽ khiến kết quả tìm kiếm không chính xác.",
     "Sai — cần gõ từ khóa thì công cụ tìm kiếm mới tìm được thông tin liên quan.",
     "Đúng — từ khóa ngắn gọn, đúng trọng tâm giúp tìm kiếm hiệu quả nhất.",
     "Sai — chữ số ngẫu nhiên không liên quan đến nội dung cần tìm."
    ]
   },
   {
    "stem": "Thông tin trên Internet có đặc điểm gì mà em cần lưu ý?",
    "choices": [
     "Mọi thông tin trên Internet đều chính xác tuyệt đối",
     "Thông tin trên Internet không bao giờ thay đổi",
     "Không phải thông tin nào trên Internet cũng đúng, cần kiểm tra và chọn nguồn tin cậy",
     "Chỉ có thông tin bằng tiếng Anh mới đáng tin"
    ],
    "answer": 2,
    "explanation": "Không phải mọi thông tin trên Internet đều đúng, em cần kiểm tra, so sánh và chọn nguồn tin cậy trước khi sử dụng.",
    "choiceFeedback": [
     "Sai — có nhiều thông tin trên Internet chưa chính xác hoặc chưa được kiểm chứng.",
     "Sai — thông tin trên Internet có thể được cập nhật hoặc thay đổi liên tục.",
     "Đúng — cần kiểm tra và chọn nguồn tin cậy vì không phải thông tin nào cũng đúng.",
     "Sai — độ tin cậy của thông tin không phụ thuộc vào ngôn ngữ trình bày."
    ]
   },
   {
    "stem": "Mật khẩu tài khoản dùng để làm gì?",
    "choices": [
     "Để trang trí cho tài khoản đẹp hơn",
     "Để bảo vệ tài khoản, chỉ chủ tài khoản mới đăng nhập được",
     "Để chia sẻ công khai cho bạn bè cùng dùng",
     "Không có tác dụng thực sự"
    ],
    "answer": 1,
    "explanation": "Mật khẩu giúp bảo vệ tài khoản, chỉ chủ tài khoản biết và sử dụng để đăng nhập.",
    "choiceFeedback": [
     "Sai — mật khẩu không phải để trang trí, mà để bảo mật tài khoản.",
     "Đúng — mật khẩu dùng để bảo vệ tài khoản, chỉ chủ tài khoản mới đăng nhập được.",
     "Sai — mật khẩu cần được giữ bí mật, không nên chia sẻ công khai.",
     "Sai — mật khẩu có tác dụng bảo mật rất quan trọng."
    ]
   },
   {
    "stem": "Bạn Hùng đặt mật khẩu là ngày sinh của mình để dễ nhớ. Việc làm này có hợp lí không, vì sao?",
    "choices": [
     "Rất hợp lí vì mật khẩu càng dễ nhớ càng an toàn",
     "Chưa hợp lí vì ngày sinh dễ bị người khác đoán ra, mật khẩu nên kết hợp chữ, số phức tạp hơn",
     "Không quan trọng vì mật khẩu không cần bảo mật",
     "Hợp lí vì chỉ Hùng mới biết ngày sinh của mình"
    ],
    "answer": 1,
    "explanation": "Ngày sinh thường công khai hoặc dễ đoán, nên đặt làm mật khẩu là chưa an toàn; mật khẩu nên kết hợp chữ, số phức tạp hơn.",
    "choiceFeedback": [
     "Sai — mật khẩu dễ nhớ nhưng cũng dễ đoán thì không an toàn.",
     "Đúng — ngày sinh dễ bị người khác biết hoặc đoán ra, nên mật khẩu cần phức tạp hơn.",
     "Sai — mật khẩu luôn cần được bảo mật cẩn thận.",
     "Sai — ngày sinh thường được nhiều người khác (bạn bè, thầy cô) biết, không phải bí mật riêng."
    ]
   },
   {
    "stem": "Nếu thấy một bạn trong lớp bị chê bai, trêu chọc trên mạng xã hội, em nên làm gì?",
    "choices": [
     "Tham gia bình luận chê bai thêm cho vui",
     "Bỏ qua vì không liên quan đến mình",
     "Không tham gia trêu chọc và báo cho thầy cô, người lớn tin cậy để được giúp đỡ",
     "Chia sẻ bài viết đó cho thật nhiều người xem"
    ],
    "answer": 2,
    "explanation": "Ứng xử văn minh trên mạng là không tham gia trêu chọc bạn, đồng thời báo cho thầy cô, người lớn tin cậy để được giúp đỡ.",
    "choiceFeedback": [
     "Sai — tham gia chê bai là hành vi thiếu văn minh, có thể gây tổn thương cho bạn.",
     "Sai — dù không liên quan trực tiếp, em vẫn nên giúp đỡ bạn khi bị bắt nạt.",
     "Đúng — không tham gia trêu chọc và báo người lớn tin cậy là cách ứng xử đúng đắn.",
     "Sai — chia sẻ rộng rãi sẽ khiến bạn bị tổn thương nhiều hơn."
    ]
   },
   {
    "stem": "Em rất thích một bức tranh vẽ trên mạng và muốn dùng nó cho bài trình bày của lớp. Em nên làm gì để tôn trọng bản quyền?",
    "choices": [
     "Xin phép hoặc ghi rõ nguồn/tác giả của bức tranh khi sử dụng",
     "Lấy về dùng luôn, không cần nói với ai",
     "Sửa lại một chút rồi nhận là tranh của mình vẽ",
     "Xóa tên tác giả trên bức tranh"
    ],
    "answer": 0,
    "explanation": "Tôn trọng bản quyền là xin phép hoặc ghi rõ nguồn, tác giả khi sử dụng sản phẩm số của người khác.",
    "choiceFeedback": [
     "Đúng — cần xin phép hoặc ghi rõ nguồn, tác giả khi sử dụng sản phẩm số của người khác.",
     "Sai — dùng luôn mà không xin phép, không ghi nguồn là vi phạm bản quyền.",
     "Sai — nhận sản phẩm của người khác là của mình là hành vi gian dối, vi phạm bản quyền.",
     "Sai — xóa tên tác giả là hành vi thiếu tôn trọng bản quyền."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P4TIN-exam-gk2": {
  "id": "P4TIN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Tin học 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Tin học 4",
  "questions": [
   {
    "stem": "Phần mềm soạn thảo văn bản dùng để làm gì?",
    "choices": [
     "Vẽ tranh",
     "Soạn, chỉnh sửa và trình bày văn bản trên máy tính",
     "Nghe nhạc",
     "Kết nối Internet"
    ],
    "answer": 1,
    "explanation": "Phần mềm soạn thảo văn bản dùng để gõ, chỉnh sửa và trình bày văn bản trên máy tính.",
    "choiceFeedback": [
     "Sai — vẽ tranh là chức năng của phần mềm vẽ, không phải soạn thảo văn bản.",
     "Đúng — phần mềm soạn thảo văn bản dùng để soạn, chỉnh sửa và trình bày văn bản.",
     "Sai — nghe nhạc là chức năng của phần mềm phát nhạc.",
     "Sai — kết nối Internet là chức năng của trình duyệt web."
    ]
   },
   {
    "stem": "Phím Backspace trên bàn phím dùng để làm gì?",
    "choices": [
     "Xuống dòng mới",
     "Chèn hình ảnh",
     "Xóa kí tự ở bên trái con trỏ soạn thảo",
     "Gõ chữ in hoa"
    ],
    "answer": 2,
    "explanation": "Phím Backspace dùng để xóa kí tự ở bên trái vị trí con trỏ đang soạn thảo.",
    "choiceFeedback": [
     "Sai — xuống dòng mới là chức năng của phím Enter.",
     "Sai — chèn hình ảnh thực hiện qua lệnh Insert, không phải phím Backspace.",
     "Đúng — Backspace dùng để xóa kí tự ở bên trái con trỏ soạn thảo.",
     "Sai — gõ chữ in hoa thường dùng phím Shift hoặc Caps Lock."
    ]
   },
   {
    "stem": "Phím Enter dùng để làm gì trong soạn thảo văn bản?",
    "choices": [
     "Xóa chữ vừa gõ",
     "Tô đậm chữ",
     "Mở phần mềm vẽ",
     "Xuống dòng mới hoặc tạo đoạn văn bản mới"
    ],
    "answer": 3,
    "explanation": "Phím Enter dùng để xuống dòng mới hoặc bắt đầu một đoạn văn bản mới.",
    "choiceFeedback": [
     "Sai — xóa chữ vừa gõ là chức năng của phím Backspace hoặc Delete.",
     "Sai — tô đậm chữ thường dùng tổ hợp phím hoặc nút Bold.",
     "Sai — mở phần mềm vẽ không liên quan đến phím Enter trong soạn thảo.",
     "Đúng — Enter dùng để xuống dòng mới hoặc tạo đoạn văn bản mới."
    ]
   },
   {
    "stem": "Định dạng chữ đậm (Bold) làm cho chữ trông như thế nào?",
    "choices": [
     "Chữ đậm, nét chữ to và rõ hơn bình thường",
     "Chữ nghiêng đi",
     "Chữ bị gạch chân",
     "Chữ chuyển sang màu đỏ"
    ],
    "answer": 0,
    "explanation": "Định dạng chữ đậm (Bold) làm nét chữ to và đậm hơn so với chữ thường.",
    "choiceFeedback": [
     "Đúng — chữ đậm (Bold) có nét chữ to và đậm hơn bình thường.",
     "Sai — chữ nghiêng là kết quả của định dạng Italic, không phải Bold.",
     "Sai — gạch chân là định dạng Underline, không phải Bold.",
     "Sai — đổi màu chữ là một định dạng khác với việc làm đậm chữ."
    ]
   },
   {
    "stem": "Để cỡ chữ to hơn hoặc nhỏ hơn, em cần thay đổi thông số nào?",
    "choices": [
     "Font chữ (kiểu chữ)",
     "Cỡ chữ (Font Size)",
     "Màu nền trang",
     "Tên tệp văn bản"
    ],
    "answer": 1,
    "explanation": "Muốn chữ to hay nhỏ, em thay đổi cỡ chữ (Font Size).",
    "choiceFeedback": [
     "Sai — font chữ chỉ thay đổi kiểu dáng của chữ, không phải kích thước.",
     "Đúng — thay đổi cỡ chữ (Font Size) sẽ làm chữ to hơn hoặc nhỏ hơn.",
     "Sai — màu nền trang không liên quan đến kích thước chữ.",
     "Sai — tên tệp văn bản không ảnh hưởng đến cỡ chữ trong bài."
    ]
   },
   {
    "stem": "Chèn hình ảnh vào văn bản có tác dụng gì?",
    "choices": [
     "Làm máy tính bị hỏng",
     "Xóa hết chữ đã gõ",
     "Làm bài viết sinh động, minh họa rõ hơn cho nội dung",
     "Không có tác dụng gì"
    ],
    "answer": 2,
    "explanation": "Chèn hình ảnh giúp bài viết sinh động hơn và minh họa rõ ràng cho nội dung.",
    "choiceFeedback": [
     "Sai — chèn hình ảnh là thao tác bình thường, không làm hỏng máy tính.",
     "Sai — chèn hình ảnh không xóa nội dung chữ đã gõ trước đó.",
     "Đúng — chèn hình ảnh giúp bài viết sinh động và minh họa rõ nội dung hơn.",
     "Sai — chèn hình ảnh có tác dụng minh họa rất tốt cho bài viết."
    ]
   },
   {
    "stem": "Sau khi chèn một hình ảnh vào văn bản, em muốn hình nhỏ lại cho vừa với trang. Em nên làm gì?",
    "choices": [
     "Xóa hình đi và chèn lại hình khác",
     "Tắt máy tính rồi bật lại",
     "Đổi tên tệp văn bản",
     "Kéo vào một trong các nút/góc của hình để thay đổi kích thước"
    ],
    "answer": 3,
    "explanation": "Để thay đổi kích thước hình đã chèn, em chọn hình rồi kéo vào các nút/góc của hình.",
    "choiceFeedback": [
     "Sai — không cần xóa và chèn lại, chỉ cần kéo để chỉnh kích thước.",
     "Sai — tắt máy tính không giúp thay đổi kích thước hình ảnh.",
     "Sai — đổi tên tệp không liên quan đến kích thước hình ảnh trong văn bản.",
     "Đúng — kéo vào nút/góc của hình sẽ thay đổi kích thước hình theo ý muốn."
    ]
   },
   {
    "stem": "Trước khi in văn bản, em nên làm gì để tránh in sai, lãng phí giấy?",
    "choices": [
     "Xem trước bản in (Print Preview) để kiểm tra nội dung, cách trình bày",
     "In luôn không cần xem lại",
     "Tắt máy in",
     "Xóa hết nội dung đã gõ"
    ],
    "answer": 0,
    "explanation": "Xem trước bản in (Print Preview) giúp kiểm tra nội dung và cách trình bày trước khi in, tránh in sai và lãng phí giấy.",
    "choiceFeedback": [
     "Đúng — xem trước bản in giúp kiểm tra kĩ trước khi in, tránh lãng phí giấy.",
     "Sai — in ngay mà không kiểm tra dễ dẫn đến in sai, lãng phí giấy.",
     "Sai — tắt máy in thì không thể in được văn bản.",
     "Sai — xóa nội dung sẽ làm mất bài đã soạn thảo."
    ]
   },
   {
    "stem": "Để in được văn bản ra giấy, máy tính cần kết nối với thiết bị nào?",
    "choices": [
     "Chuột máy tính",
     "Máy in",
     "Bàn phím",
     "Loa"
    ],
    "answer": 1,
    "explanation": "Máy tính cần kết nối với máy in thì mới in được văn bản ra giấy.",
    "choiceFeedback": [
     "Sai — chuột dùng để điều khiển con trỏ, không dùng để in.",
     "Đúng — máy tính cần kết nối với máy in để in văn bản ra giấy.",
     "Sai — bàn phím dùng để gõ chữ, không dùng để in.",
     "Sai — loa dùng để phát âm thanh, không liên quan đến việc in."
    ]
   },
   {
    "stem": "Trong phần mềm vẽ, công cụ tô màu (đổ màu) dùng để làm gì?",
    "choices": [
     "Vẽ đường thẳng",
     "Xóa toàn bộ bức tranh",
     "Đổ màu vào một vùng kín được chọn",
     "Gõ chữ vào bức tranh"
    ],
    "answer": 2,
    "explanation": "Công cụ tô màu (đổ màu) dùng để đổ màu vào một vùng khép kín trong bức tranh.",
    "choiceFeedback": [
     "Sai — vẽ đường thẳng là chức năng của công cụ đường thẳng (Line).",
     "Sai — xóa toàn bộ bức tranh là chức năng khác, không phải tô màu.",
     "Đúng — công cụ tô màu dùng để đổ màu vào vùng kín được chọn.",
     "Sai — gõ chữ vào bức tranh là chức năng của công cụ văn bản (Text)."
    ]
   },
   {
    "stem": "Em muốn vẽ một quả bóng tròn trong phần mềm vẽ, em nên chọn công cụ nào là phù hợp nhất?",
    "choices": [
     "Công cụ hình chữ nhật",
     "Công cụ tẩy (Eraser)",
     "Công cụ gõ chữ",
     "Công cụ hình tròn/hình elip (Oval)"
    ],
    "answer": 3,
    "explanation": "Để vẽ quả bóng tròn, em nên dùng công cụ hình tròn/hình elip (Oval).",
    "choiceFeedback": [
     "Sai — công cụ hình chữ nhật vẽ ra hình vuông/chữ nhật, không phải hình tròn.",
     "Sai — công cụ tẩy dùng để xóa nét vẽ, không dùng để vẽ hình.",
     "Sai — công cụ gõ chữ dùng để thêm chữ vào bức tranh, không vẽ hình.",
     "Đúng — công cụ hình tròn/hình elip (Oval) phù hợp nhất để vẽ quả bóng tròn."
    ]
   },
   {
    "stem": "Mỗi trang trong bài trình chiếu được gọi là gì?",
    "choices": [
     "Một trang chiếu (slide)",
     "Một tệp",
     "Một thư mục",
     "Một biểu tượng"
    ],
    "answer": 0,
    "explanation": "Mỗi trang trong bài trình chiếu được gọi là một trang chiếu (slide).",
    "choiceFeedback": [
     "Đúng — mỗi trang trong bài trình chiếu gọi là một trang chiếu (slide).",
     "Sai — cả bài trình chiếu mới là một tệp, không phải từng trang.",
     "Sai — thư mục dùng để chứa tệp, không phải tên gọi của từng trang chiếu.",
     "Sai — biểu tượng là hình ảnh đại diện, không phải tên gọi của trang chiếu."
    ]
   },
   {
    "stem": "Khi tạo một trang chiếu giới thiệu về trường em, chữ trên trang chiếu nên trình bày như thế nào để dễ đọc từ xa?",
    "choices": [
     "Chữ rất nhỏ và viết kín cả trang",
     "Chữ đủ to, ngắn gọn, dễ nhìn, không nên viết quá nhiều chữ trên một trang",
     "Chỉ dùng một màu chữ trùng với màu nền",
     "Không cần tiêu đề cho trang chiếu"
    ],
    "answer": 1,
    "explanation": "Chữ trên trang chiếu nên đủ to, ngắn gọn, dễ nhìn để người xem từ xa vẫn đọc được rõ ràng.",
    "choiceFeedback": [
     "Sai — chữ quá nhỏ và kín trang sẽ khó đọc, nhất là khi xem từ xa.",
     "Đúng — chữ đủ to, ngắn gọn, dễ nhìn giúp người xem dễ đọc từ xa.",
     "Sai — chữ trùng màu nền sẽ khiến người xem không đọc được nội dung.",
     "Sai — tiêu đề giúp người xem nắm được nội dung chính của trang chiếu."
    ]
   },
   {
    "stem": "Bạn Mai làm các bước pha một cốc nước chanh nhưng lại cho đường vào trước rồi mới vắt chanh, cuối cùng quên khuấy đều. Điều này cho thấy điều gì về thuật toán?",
    "choices": [
     "Thứ tự các bước trong thuật toán không quan trọng",
     "Thuật toán chỉ áp dụng cho máy tính, không áp dụng cho đời sống",
     "Nếu thực hiện sai thứ tự các bước, kết quả có thể không đúng như mong muốn",
     "Không cần làm đủ các bước cũng được"
    ],
    "answer": 2,
    "explanation": "Thuật toán cần thực hiện đúng trình tự các bước, nếu sai thứ tự hoặc thiếu bước thì kết quả có thể không như mong muốn.",
    "choiceFeedback": [
     "Sai — thứ tự các bước rất quan trọng, làm sai thứ tự có thể ra kết quả khác.",
     "Sai — thuật toán áp dụng cho cả công việc trong đời sống, không chỉ riêng máy tính.",
     "Đúng — làm sai thứ tự các bước có thể khiến kết quả không đúng như mong muốn.",
     "Sai — cần thực hiện đủ các bước thì công việc mới hoàn thành đúng."
    ]
   },
   {
    "stem": "Trong một sơ đồ khối hướng dẫn cách qua đường an toàn, các bước được nối với nhau bằng mũi tên. Khi đọc sơ đồ khối, em cần đọc theo cách nào?",
    "choices": [
     "Đọc từ dưới lên trên bất kể mũi tên",
     "Đọc ngẫu nhiên bước nào trước cũng được",
     "Chỉ cần đọc bước cuối cùng",
     "Đọc theo chiều mũi tên chỉ ra, từ bước bắt đầu đến bước kết thúc"
    ],
    "answer": 3,
    "explanation": "Khi đọc sơ đồ khối, cần đi theo chiều mũi tên từ bước bắt đầu đến bước kết thúc để hiểu đúng trình tự.",
    "choiceFeedback": [
     "Sai — cần đọc theo chiều mũi tên chỉ dẫn, không phải tùy ý từ dưới lên.",
     "Sai — đọc ngẫu nhiên sẽ làm sai lệch trình tự các bước cần thực hiện.",
     "Sai — cần đọc đủ các bước từ đầu đến cuối mới hiểu đúng quy trình.",
     "Đúng — đọc theo chiều mũi tên từ bước bắt đầu đến bước kết thúc là cách đọc đúng."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P4TIN-exam-ck2": {
  "id": "P4TIN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Tin học 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Tin học 4",
  "questions": [
   {
    "stem": "Phần mềm soạn thảo văn bản dùng để làm gì?",
    "choices": [
     "Vẽ tranh minh họa",
     "Chỉ để nghe nhạc",
     "Soạn, chỉnh sửa và trình bày văn bản trên máy tính",
     "Chỉ để chơi trò chơi"
    ],
    "answer": 2,
    "explanation": "Phần mềm soạn thảo văn bản dùng để soạn, chỉnh sửa và trình bày văn bản trên máy tính.",
    "choiceFeedback": [
     "Sai — vẽ tranh minh họa là chức năng của phần mềm vẽ.",
     "Sai — nghe nhạc là chức năng của phần mềm phát nhạc.",
     "Đúng — phần mềm soạn thảo văn bản dùng để soạn, chỉnh sửa và trình bày văn bản.",
     "Sai — chơi trò chơi không phải chức năng của phần mềm soạn thảo văn bản."
    ]
   },
   {
    "stem": "Chèn hình vào văn bản giúp ích gì cho bài viết?",
    "choices": [
     "Làm mất hết chữ đã gõ",
     "Làm máy tính chậm vĩnh viễn",
     "Không có tác dụng gì",
     "Làm bài viết sinh động và minh họa rõ nội dung hơn"
    ],
    "answer": 3,
    "explanation": "Chèn hình ảnh giúp bài viết sinh động hơn và minh họa rõ nội dung.",
    "choiceFeedback": [
     "Sai — chèn hình không làm mất nội dung chữ đã gõ trước đó.",
     "Sai — chèn hình ảnh không làm máy tính chậm vĩnh viễn.",
     "Sai — chèn hình ảnh có tác dụng minh họa rất tốt cho nội dung bài viết.",
     "Đúng — chèn hình giúp bài viết sinh động và minh họa rõ nội dung hơn."
    ]
   },
   {
    "stem": "Bài trình chiếu (PowerPoint) giúp ích gì cho em khi thuyết trình?",
    "choices": [
     "Trình bày nội dung một cách trực quan, sinh động trước người nghe",
     "Thay thế hoàn toàn việc phải nói trước lớp",
     "Làm bài văn dài ra",
     "Không có tác dụng gì"
    ],
    "answer": 0,
    "explanation": "Bài trình chiếu giúp trình bày nội dung một cách trực quan, sinh động, hỗ trợ người thuyết trình truyền đạt ý tưởng rõ ràng hơn.",
    "choiceFeedback": [
     "Đúng — bài trình chiếu giúp trình bày nội dung trực quan, sinh động trước người nghe.",
     "Sai — em vẫn cần nói và giải thích, bài trình chiếu chỉ hỗ trợ minh họa.",
     "Sai — bài trình chiếu không liên quan đến việc làm dài bài văn.",
     "Sai — bài trình chiếu có tác dụng hỗ trợ thuyết trình rất tốt."
    ]
   },
   {
    "stem": "Thuật toán là gì?",
    "choices": [
     "Một loại phần cứng máy tính",
     "Dãy các bước được sắp xếp theo thứ tự để giải quyết một công việc, vấn đề cụ thể",
     "Tên gọi khác của bàn phím",
     "Chỉ có trong môn Toán"
    ],
    "answer": 1,
    "explanation": "Thuật toán là dãy các bước được sắp xếp theo một trình tự nhất định để giải quyết một công việc hay vấn đề cụ thể.",
    "choiceFeedback": [
     "Sai — thuật toán là một quy trình các bước, không phải thiết bị phần cứng.",
     "Đúng — thuật toán là dãy các bước theo thứ tự để giải quyết một công việc, vấn đề cụ thể.",
     "Sai — thuật toán không liên quan đến bàn phím.",
     "Sai — thuật toán xuất hiện trong nhiều lĩnh vực và công việc đời sống, không chỉ trong môn Toán."
    ]
   },
   {
    "stem": "Scratch là gì?",
    "choices": [
     "Một loại bàn phím đặc biệt",
     "Một phần mềm vẽ tranh",
     "Một ngôn ngữ lập trình kéo thả khối lệnh dành cho học sinh",
     "Một loại virus máy tính"
    ],
    "answer": 2,
    "explanation": "Scratch là một ngôn ngữ lập trình kéo thả khối lệnh, giúp học sinh làm quen với lập trình một cách trực quan.",
    "choiceFeedback": [
     "Sai — Scratch là một phần mềm lập trình, không phải thiết bị bàn phím.",
     "Sai — Scratch dùng để lập trình bằng khối lệnh, không phải phần mềm vẽ tranh.",
     "Đúng — Scratch là ngôn ngữ lập trình kéo thả khối lệnh dành cho học sinh.",
     "Sai — Scratch là phần mềm học tập hữu ích, không phải virus."
    ]
   },
   {
    "stem": "Trong Scratch, em tạo chương trình bằng cách nào?",
    "choices": [
     "Gõ các dòng lệnh phức tạp bằng tiếng Anh",
     "Vẽ tay lên giấy rồi chụp ảnh",
     "Không cần làm gì, chương trình tự chạy",
     "Kéo và ghép các khối lệnh có sẵn lại với nhau"
    ],
    "answer": 3,
    "explanation": "Trong Scratch, em tạo chương trình bằng cách kéo và ghép các khối lệnh có sẵn lại với nhau.",
    "choiceFeedback": [
     "Sai — Scratch không yêu cầu gõ dòng lệnh phức tạp như các ngôn ngữ lập trình văn bản.",
     "Sai — vẽ tay lên giấy không tạo ra chương trình chạy được trên Scratch.",
     "Sai — cần ghép các khối lệnh thì chương trình mới chạy đúng theo ý muốn.",
     "Đúng — trong Scratch, em kéo và ghép các khối lệnh có sẵn để tạo chương trình."
    ]
   },
   {
    "stem": "Trong Scratch, nhân vật hoạt động trên sân khấu được gọi là gì?",
    "choices": [
     "Sprite (nhân vật)",
     "Backdrop (phông nền)",
     "Thư mục",
     "Biểu tượng hệ thống"
    ],
    "answer": 0,
    "explanation": "Trong Scratch, nhân vật hoạt động trên sân khấu được gọi là Sprite.",
    "choiceFeedback": [
     "Đúng — nhân vật hoạt động trên sân khấu trong Scratch gọi là Sprite.",
     "Sai — Backdrop là phông nền phía sau sân khấu, không phải nhân vật.",
     "Sai — thư mục là nơi chứa tệp trên máy tính, không phải khái niệm trong Scratch.",
     "Sai — biểu tượng hệ thống không phải tên gọi của nhân vật trong Scratch."
    ]
   },
   {
    "stem": "Em muốn đổi khung cảnh phía sau nhân vật trong Scratch từ 'bãi biển' sang 'lớp học'. Em cần thay đổi thành phần nào?",
    "choices": [
     "Thay đổi nhân vật (Sprite)",
     "Thay đổi phông nền (Backdrop) của sân khấu",
     "Thay đổi tên chương trình",
     "Thay đổi mật khẩu tài khoản"
    ],
    "answer": 1,
    "explanation": "Khung cảnh phía sau nhân vật chính là phông nền (Backdrop) của sân khấu, cần thay đổi thành phần này.",
    "choiceFeedback": [
     "Sai — thay đổi nhân vật sẽ đổi hình dạng nhân vật, không đổi khung cảnh phía sau.",
     "Đúng — cần thay đổi phông nền (Backdrop) của sân khấu để đổi khung cảnh phía sau.",
     "Sai — tên chương trình không ảnh hưởng đến khung cảnh hiển thị.",
     "Sai — mật khẩu tài khoản không liên quan đến phông nền trong Scratch."
    ]
   },
   {
    "stem": "Khối lệnh 'di chuyển 10 bước' trong Scratch làm nhân vật thay đổi như thế nào?",
    "choices": [
     "Đổi màu sắc",
     "Biến mất khỏi sân khấu",
     "Di chuyển một đoạn theo hướng đang quay mặt tới",
     "Phóng to kích thước"
    ],
    "answer": 2,
    "explanation": "Khối lệnh 'di chuyển 10 bước' làm nhân vật di chuyển một đoạn theo hướng mà nhân vật đang quay mặt tới.",
    "choiceFeedback": [
     "Sai — đổi màu sắc là chức năng của khối lệnh Ngoại hình, không phải khối di chuyển.",
     "Sai — nhân vật không biến mất khi dùng khối di chuyển.",
     "Đúng — khối 'di chuyển 10 bước' làm nhân vật di chuyển theo hướng đang quay mặt tới.",
     "Sai — phóng to kích thước là chức năng khác, không phải của khối di chuyển bước."
    ]
   },
   {
    "stem": "Để cho nhân vật trong Scratch xoay sang một hướng khác trước khi tiếp tục di chuyển, em nên dùng khối lệnh nào?",
    "choices": [
     "Khối lệnh 'chờ đợi'",
     "Khối lệnh 'phát âm thanh'",
     "Khối lệnh 'ẩn nhân vật'",
     "Khối lệnh 'quay'"
    ],
    "answer": 3,
    "explanation": "Để đổi hướng của nhân vật trước khi di chuyển tiếp, em dùng khối lệnh 'quay'.",
    "choiceFeedback": [
     "Sai — khối 'chờ đợi' chỉ làm chương trình tạm dừng, không đổi hướng nhân vật.",
     "Sai — khối 'phát âm thanh' dùng để phát tiếng động, không liên quan đến xoay hướng.",
     "Sai — khối 'ẩn nhân vật' làm nhân vật biến mất, không đổi hướng.",
     "Đúng — khối lệnh 'quay' giúp nhân vật xoay sang hướng khác trước khi di chuyển tiếp."
    ]
   },
   {
    "stem": "Khối lệnh lặp lại (repeat) trong Scratch dùng để làm gì?",
    "choices": [
     "Thực hiện lại nhiều lần một nhóm lệnh mà không phải ghép lại nhiều lần",
     "Xóa toàn bộ chương trình",
     "Chỉ dùng để dừng chương trình",
     "Đổi tên nhân vật"
    ],
    "answer": 0,
    "explanation": "Khối lặp (repeat) giúp thực hiện lại nhiều lần một nhóm lệnh mà không cần ghép lại nhiều lần thủ công.",
    "choiceFeedback": [
     "Đúng — khối lặp giúp thực hiện lại nhiều lần một nhóm lệnh mà không phải ghép lại thủ công.",
     "Sai — khối lặp không xóa chương trình, mà lặp lại các lệnh bên trong nó.",
     "Sai — khối lặp dùng để lặp lại hành động, không phải để dừng chương trình.",
     "Sai — đổi tên nhân vật không liên quan đến chức năng của khối lặp."
    ]
   },
   {
    "stem": "Em muốn nhân vật trong Scratch vẽ một hình vuông bằng cách lặp lại 4 lần thao tác 'đi thẳng rồi quay 90 độ'. Em nên dùng khối lệnh nào để chương trình gọn gàng hơn, không phải ghép 4 lần thủ công?",
    "choices": [
     "Khối 'khi bấm lá cờ xanh'",
     "Khối 'lặp lại 4 lần' (repeat 4)",
     "Khối 'phát âm thanh meo meo'",
     "Khối 'hiện nhân vật'"
    ],
    "answer": 1,
    "explanation": "Dùng khối 'lặp lại 4 lần' sẽ tự động thực hiện 4 lần thao tác 'đi thẳng rồi quay 90 độ' mà không cần ghép lệnh thủ công.",
    "choiceFeedback": [
     "Sai — khối 'khi bấm lá cờ xanh' chỉ dùng để bắt đầu chương trình, không lặp lại thao tác.",
     "Đúng — khối 'lặp lại 4 lần' giúp thực hiện 4 lần thao tác mà không cần ghép thủ công.",
     "Sai — khối phát âm thanh không liên quan đến việc lặp lại thao tác vẽ hình.",
     "Sai — khối 'hiện nhân vật' chỉ làm nhân vật xuất hiện, không lặp lại thao tác."
    ]
   },
   {
    "stem": "Khối sự kiện 'khi bấm lá cờ xanh' trong Scratch dùng để làm gì?",
    "choices": [
     "Dừng hẳn chương trình vĩnh viễn",
     "Xóa nhân vật khỏi sân khấu",
     "Bắt đầu chạy chương trình khi người dùng nháy vào lá cờ xanh",
     "Thay đổi mật khẩu"
    ],
    "answer": 2,
    "explanation": "Khối 'khi bấm lá cờ xanh' là khối sự kiện dùng để bắt đầu chạy chương trình khi người dùng nháy vào lá cờ xanh.",
    "choiceFeedback": [
     "Sai — khối này dùng để bắt đầu chương trình, không phải dừng hẳn.",
     "Sai — khối này không xóa nhân vật khỏi sân khấu.",
     "Đúng — khối 'khi bấm lá cờ xanh' dùng để bắt đầu chạy chương trình khi nháy vào lá cờ xanh.",
     "Sai — khối này không liên quan đến mật khẩu tài khoản."
    ]
   },
   {
    "stem": "Khi làm một dự án Scratch nhỏ mà chương trình chạy chưa đúng như em mong muốn (nhân vật di chuyển sai hướng), em nên làm gì?",
    "choices": [
     "Bỏ dở dự án ngay lập tức",
     "Xóa hết chương trình và không làm lại nữa",
     "Đổ lỗi cho máy tính bị hỏng",
     "Kiểm tra lại các khối lệnh đã ghép, sửa hoặc sắp xếp lại cho đúng rồi chạy thử lại"
    ],
    "answer": 3,
    "explanation": "Khi chương trình chạy chưa đúng, em nên kiểm tra lại các khối lệnh đã ghép, sửa hoặc sắp xếp lại cho đúng rồi chạy thử lại.",
    "choiceFeedback": [
     "Sai — bỏ dở dự án sẽ không giúp em hoàn thành và sửa được lỗi.",
     "Sai — xóa hết chương trình là không cần thiết, chỉ cần sửa phần lệnh sai.",
     "Sai — lỗi thường do cách ghép lệnh chưa đúng, không phải do máy tính hỏng.",
     "Đúng — cần kiểm tra, sửa lại các khối lệnh rồi chạy thử lại để chương trình đúng ý muốn."
    ]
   },
   {
    "stem": "Sau một buổi học dùng máy tính ở phòng tin học chung của trường, em thấy bạn quên tắt máy và để bàn ghế lộn xộn. Là người dùng máy tính có trách nhiệm, em nên làm gì?",
    "choices": [
     "Nhắc bạn cùng tắt máy đúng cách và sắp xếp lại bàn ghế gọn gàng cho buổi học sau",
     "Mặc kệ vì không phải máy của mình",
     "Tắt máy bằng cách rút phích cắm điện đột ngột",
     "Bật thêm nhiều máy khác cho vui"
    ],
    "answer": 0,
    "explanation": "Dùng máy tính có trách nhiệm là biết giữ gìn thiết bị chung, nhắc nhau tắt máy đúng cách và sắp xếp gọn gàng sau khi dùng.",
    "choiceFeedback": [
     "Đúng — nhắc bạn tắt máy đúng cách và sắp xếp bàn ghế gọn gàng thể hiện trách nhiệm khi dùng máy tính chung.",
     "Sai — dù không phải máy của mình, em vẫn nên có trách nhiệm với thiết bị chung của trường.",
     "Sai — rút phích cắm đột ngột có thể làm hỏng máy tính, không phải cách tắt máy đúng.",
     "Sai — bật thêm nhiều máy không cần thiết sẽ gây lãng phí điện và không đúng mục đích sử dụng."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
