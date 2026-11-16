// P4AN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P4AN_EXAMS = {
 "P4AN-exam-gk1": {
  "id": "P4AN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Âm nhạc 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "am-nhac",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Âm nhạc 4",
  "questions": [
   {
    "stem": "7 nốt nhạc cơ bản trong âm nhạc, xếp theo thứ tự từ thấp đến cao, là:",
    "choices": [
     "Đô – Rê – Mi – Fa – Sol – La – Si",
     "Đô – Rê – Mi – Fa – La – Sol – Si",
     "Đô – Mi – Rê – Fa – Sol – La – Si",
     "Rê – Đô – Mi – Fa – Sol – La – Si"
    ],
    "answer": 0,
    "explanation": "7 nốt nhạc cơ bản theo thứ tự từ thấp đến cao là Đô – Rê – Mi – Fa – Sol – La – Si.",
    "choiceFeedback": [
     "Đúng — đây là thứ tự chuẩn của 7 nốt nhạc cơ bản.",
     "Sai — thứ tự đúng phải là Sol rồi mới đến La, không phải La trước Sol.",
     "Sai — Rê phải đứng trước Mi, không phải sau.",
     "Sai — Đô luôn là nốt đầu tiên trong 7 nốt cơ bản."
    ]
   },
   {
    "stem": "Khóa Sol trên khuông nhạc có tác dụng gì?",
    "choices": [
     "Xác định vị trí nốt Fa trên dòng kẻ thứ 4",
     "Xác định vị trí nốt Sol trên dòng kẻ thứ 2, từ đó xác định các nốt còn lại",
     "Cho biết bài hát nhanh hay chậm",
     "Cho biết bài hát viết ở nhịp mấy"
    ],
    "answer": 1,
    "explanation": "Khóa Sol quy định vị trí nốt Sol nằm trên dòng kẻ thứ 2 của khuông nhạc, từ đó xác định được vị trí các nốt nhạc khác.",
    "choiceFeedback": [
     "Sai — đó là chức năng của khóa Fa, không phải khóa Sol.",
     "Đúng — khóa Sol giúp xác định vị trí nốt Sol và các nốt khác trên khuông nhạc.",
     "Sai — tốc độ bài hát do nhịp độ quy định, không phải khóa nhạc.",
     "Sai — số chỉ nhịp (ví dụ 2/4, 3/4) mới cho biết bài viết ở nhịp mấy."
    ]
   },
   {
    "stem": "Trong khóa Sol, nốt nhạc nằm ở dòng kẻ phụ thứ nhất phía dưới khuông nhạc là nốt gì?",
    "choices": [
     "Rê",
     "Mi",
     "Đô",
     "Sol"
    ],
    "answer": 2,
    "explanation": "Trên khuông nhạc khóa Sol, nốt Đô (Đô giữa) nằm ở dòng kẻ phụ thứ nhất phía dưới khuông nhạc.",
    "choiceFeedback": [
     "Sai — Rê nằm ngay dưới dòng kẻ phụ chứa nốt Đô.",
     "Sai — Mi nằm trên dòng kẻ thứ nhất của khuông nhạc, không phải dòng kẻ phụ.",
     "Đúng — đó chính là vị trí quen thuộc của nốt Đô trên khuông nhạc khóa Sol.",
     "Sai — Sol nằm trên dòng kẻ thứ hai của khuông nhạc."
    ]
   },
   {
    "stem": "So với hình nốt đen, hình nốt trắng có trường độ (độ ngân dài) như thế nào?",
    "choices": [
     "Bằng nhau",
     "Ngắn hơn một nửa",
     "Ngắn hơn",
     "Dài gấp đôi"
    ],
    "answer": 3,
    "explanation": "Hình nốt trắng ngân dài gấp đôi hình nốt đen (nốt trắng = 2 phách nếu nốt đen = 1 phách).",
    "choiceFeedback": [
     "Sai — hai loại nốt này có trường độ khác nhau.",
     "Sai — nốt trắng dài hơn chứ không ngắn hơn nốt đen.",
     "Sai — nốt trắng ngân dài hơn, không phải ngắn hơn.",
     "Đúng — nốt trắng ngân dài gấp đôi nốt đen."
    ]
   },
   {
    "stem": "Số chỉ nhịp 2/4 cho biết điều gì về bài hát?",
    "choices": [
     "Mỗi nhịp có 2 phách, mỗi phách tương ứng một nốt đen",
     "Mỗi nhịp có 4 phách",
     "Mỗi nhịp có 2 phách, mỗi phách tương ứng một nốt trắng",
     "Bài hát không chia nhịp"
    ],
    "answer": 0,
    "explanation": "Nhịp 2/4 nghĩa là mỗi nhịp có 2 phách, giá trị mỗi phách bằng một nốt đen.",
    "choiceFeedback": [
     "Đúng — đây chính là ý nghĩa của số chỉ nhịp 2/4.",
     "Sai — số 2 ở trên cho biết có 2 phách, không phải 4.",
     "Sai — số 4 ở dưới cho biết phách tương ứng nốt đen, không phải nốt trắng.",
     "Sai — mọi bản nhạc có số chỉ nhịp đều được chia thành các nhịp đều nhau."
    ]
   },
   {
    "stem": "Trong nhịp 2/4, phách nào là phách mạnh?",
    "choices": [
     "Phách thứ hai",
     "Cả hai phách mạnh như nhau",
     "Phách thứ nhất",
     "Không có phách nào mạnh"
    ],
    "answer": 2,
    "explanation": "Trong nhịp 2/4, phách thứ nhất là phách mạnh, phách thứ hai là phách nhẹ.",
    "choiceFeedback": [
     "Sai — phách thứ hai là phách nhẹ.",
     "Sai — hai phách trong nhịp 2/4 không mạnh bằng nhau.",
     "Đúng — phách đầu tiên của mỗi nhịp 2/4 luôn là phách mạnh.",
     "Sai — nhịp 2/4 luôn có một phách mạnh và một phách nhẹ."
    ]
   },
   {
    "stem": "Khi gõ đệm bằng thanh phách theo nhịp 2/4 cho một bài hát, em nên gõ như thế nào cho đúng?",
    "choices": [
     "Gõ đều tay, lực như nhau ở mọi phách",
     "Gõ mạnh tay ở phách 1, gõ nhẹ hơn ở phách 2",
     "Chỉ gõ vào phách thứ hai",
     "Gõ nhanh dần không theo nhịp bài hát"
    ],
    "answer": 1,
    "explanation": "Vì phách 1 là phách mạnh và phách 2 là phách nhẹ nên khi gõ đệm cần nhấn mạnh ở phách 1 và gõ nhẹ hơn ở phách 2 để đúng với tính chất của nhịp 2/4.",
    "choiceFeedback": [
     "Sai — gõ đều tay sẽ làm mất đi cảm giác mạnh — nhẹ đặc trưng của nhịp.",
     "Đúng — gõ mạnh — nhẹ đúng theo phách mạnh, phách nhẹ giúp bài hát rõ nhịp hơn.",
     "Sai — bỏ qua phách mạnh sẽ làm bài hát mất trọng âm.",
     "Sai — gõ đệm luôn phải theo đúng tốc độ của bài hát."
    ]
   },
   {
    "stem": "Bài hát “Em yêu hòa bình” do nhạc sĩ nào sáng tác?",
    "choices": [
     "Phạm Tuyên",
     "Bùi Đình Thảo",
     "Nguyễn Đức Toàn",
     "Lưu Hữu Phước"
    ],
    "answer": 2,
    "explanation": "Bài hát “Em yêu hòa bình” do nhạc sĩ Nguyễn Đức Toàn sáng tác.",
    "choiceFeedback": [
     "Sai — Phạm Tuyên là tác giả nhiều bài hát thiếu nhi khác như “Chú voi con ở Bản Đôn”.",
     "Sai — Bùi Đình Thảo là tác giả phần nhạc của bài “Bàn tay mẹ”.",
     "Đúng — Nguyễn Đức Toàn chính là tác giả bài “Em yêu hòa bình”.",
     "Sai — Lưu Hữu Phước là tác giả bài “Thiếu nhi thế giới liên hoan”."
    ]
   },
   {
    "stem": "Nội dung bài hát “Em yêu hòa bình” thể hiện điều gì?",
    "choices": [
     "Tình yêu quê hương, đất nước và ước mong hòa bình của thiếu nhi",
     "Nỗi nhớ mái trường xưa",
     "Tình cảm dành cho người mẹ",
     "Tình bạn giữa thiếu nhi các nước"
    ],
    "answer": 0,
    "explanation": "Bài hát thể hiện tình yêu quê hương, đất nước thanh bình cùng ước mong hòa bình của các bạn nhỏ.",
    "choiceFeedback": [
     "Đúng — đây chính là nội dung xuyên suốt bài hát.",
     "Sai — nội dung không nói về mái trường xưa.",
     "Sai — bài hát này không tập trung ca ngợi mẹ (đó là nội dung bài “Bàn tay mẹ”).",
     "Sai — nội dung là tình yêu hòa bình, quê hương chứ không phải tình bạn quốc tế."
    ]
   },
   {
    "stem": "Khi tập đọc nhạc bài tập với ba nốt Đô – Rê – Mi, em cần chú ý điều gì trước tiên?",
    "choices": [
     "Hát thật to để bạn bè nghe thấy",
     "Xác định đúng cao độ từng nốt rồi đọc đúng tiết tấu",
     "Đọc thật nhanh cho xong bài tập",
     "Chỉ cần thuộc lời ca, không cần đúng cao độ"
    ],
    "answer": 1,
    "explanation": "Khi đọc nhạc, việc quan trọng đầu tiên là xác định đúng cao độ của từng nốt, sau đó đọc đúng trường độ (tiết tấu) đã ghi trong bài tập.",
    "choiceFeedback": [
     "Sai — âm lượng không quan trọng bằng việc đọc đúng cao độ, tiết tấu.",
     "Đúng — đọc đúng cao độ và tiết tấu là yêu cầu cơ bản khi đọc nhạc.",
     "Sai — đọc vội sẽ dễ sai cao độ và tiết tấu.",
     "Sai — bài tập đọc nhạc dùng tên nốt (xướng âm), không phải lời ca."
    ]
   },
   {
    "stem": "Thanh phách và song loan thuộc nhóm nhạc cụ nào?",
    "choices": [
     "Nhạc cụ dây",
     "Nhạc cụ hơi",
     "Nhạc cụ phím",
     "Nhạc cụ gõ (nhạc cụ tiết tấu)"
    ],
    "answer": 3,
    "explanation": "Thanh phách và song loan là các nhạc cụ gõ, thường dùng để giữ nhịp, gõ đệm cho bài hát.",
    "choiceFeedback": [
     "Sai — nhạc cụ dây phát ra âm thanh nhờ dây rung, ví dụ đàn bầu, đàn guitar.",
     "Sai — nhạc cụ hơi phát âm nhờ luồng hơi thổi, ví dụ recorder, sáo trúc.",
     "Sai — nhạc cụ phím có bàn phím, ví dụ đàn organ, piano.",
     "Đúng — thanh phách, song loan là nhạc cụ gõ dùng để giữ tiết tấu."
    ]
   },
   {
    "stem": "Khi nghe một bài dân ca, điều gì giúp em nhận ra đó là dân ca của một vùng miền cụ thể?",
    "choices": [
     "Giai điệu, lời ca mộc mạc và cách luyến láy mang nét riêng của từng vùng miền",
     "Tất cả các bài dân ca luôn có tốc độ giống nhau",
     "Chỉ cần nghe tên bài hát là biết ngay tác giả",
     "Mọi vùng miền đều đệm hát bằng cùng một loại nhạc cụ"
    ],
    "answer": 0,
    "explanation": "Mỗi vùng miền có chất liệu âm nhạc, cách luyến láy và ca từ mộc mạc riêng; đó là đặc trưng giúp nhận biết dân ca từng vùng, ví dụ dân ca Nam Bộ khác dân ca Bắc Bộ hay miền Trung.",
    "choiceFeedback": [
     "Đúng — giai điệu, ca từ và cách luyến láy riêng là đặc trưng để nhận ra dân ca từng vùng miền.",
     "Sai — tốc độ các bài dân ca rất khác nhau tùy bài và vùng miền.",
     "Sai — dân ca thường là sáng tác dân gian, không có tác giả cụ thể.",
     "Sai — mỗi vùng miền thường có nhạc cụ đệm đặc trưng riêng, ví dụ đàn bầu, đàn tranh, sáo trúc."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P4AN-exam-ck1": {
  "id": "P4AN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Âm nhạc 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "am-nhac",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Âm nhạc 4",
  "questions": [
   {
    "stem": "Trong 7 nốt nhạc cơ bản, nốt nào đứng liền sau nốt Mi?",
    "choices": [
     "Rê",
     "Fa",
     "Sol",
     "La"
    ],
    "answer": 1,
    "explanation": "Thứ tự 7 nốt cơ bản là Đô – Rê – Mi – Fa – Sol – La – Si, nốt đứng sau Mi là Fa.",
    "choiceFeedback": [
     "Sai — Rê đứng trước Mi.",
     "Đúng — Fa đứng ngay sau Mi trong 7 nốt cơ bản.",
     "Sai — Sol đứng sau Fa, cách Mi hai bậc.",
     "Sai — La đứng xa hơn, sau Sol."
    ]
   },
   {
    "stem": "Nhịp 2/4 có mấy phách trong mỗi nhịp?",
    "choices": [
     "Hai",
     "Ba",
     "Bốn",
     "Một"
    ],
    "answer": 0,
    "explanation": "Số 2 trên số chỉ nhịp 2/4 cho biết mỗi nhịp có 2 phách.",
    "choiceFeedback": [
     "Đúng — số 2 chỉ có 2 phách mỗi nhịp.",
     "Sai — ba phách là của nhịp 3/4.",
     "Sai — bốn phách là của nhịp 4/4.",
     "Sai — không có nhịp nào chỉ một phách trong chương trình đã học."
    ]
   },
   {
    "stem": "Recorder là nhạc cụ thuộc bộ nào?",
    "choices": [
     "Bộ gõ",
     "Bộ dây",
     "Bộ hơi",
     "Bộ phím"
    ],
    "answer": 2,
    "explanation": "Recorder (sáo dọc) phát âm nhờ luồng hơi thổi qua ống sáo nên thuộc bộ hơi.",
    "choiceFeedback": [
     "Sai — bộ gõ gồm thanh phách, song loan, trống.",
     "Sai — bộ dây gồm đàn bầu, đàn tranh, guitar.",
     "Đúng — recorder tạo âm nhờ hơi thổi, thuộc bộ hơi.",
     "Sai — bộ phím gồm đàn organ, piano."
    ]
   },
   {
    "stem": "“Trống cơm” là dân ca của vùng miền nào?",
    "choices": [
     "Nam Bộ",
     "Đồng bằng Bắc Bộ",
     "Tây Nguyên",
     "Miền Trung"
    ],
    "answer": 1,
    "explanation": "“Trống cơm” là bài dân ca quen thuộc của đồng bằng Bắc Bộ.",
    "choiceFeedback": [
     "Sai — dân ca Nam Bộ tiêu biểu là “Lý cây bông”, “Lý kéo chài”.",
     "Đúng — “Trống cơm” là dân ca đồng bằng Bắc Bộ.",
     "Sai — Tây Nguyên gắn với các bài như “Chú voi con ở Bản Đôn”.",
     "Sai — miền Trung có “Hò mái nhì”."
    ]
   },
   {
    "stem": "Bài hát “Bàn tay mẹ” do nhạc sĩ nào phổ nhạc?",
    "choices": [
     "Nguyễn Đức Toàn",
     "Phạm Tuyên",
     "Lưu Hữu Phước",
     "Bùi Đình Thảo"
    ],
    "answer": 3,
    "explanation": "Nhạc sĩ Bùi Đình Thảo phổ nhạc bài “Bàn tay mẹ” từ bài thơ của nhà thơ Tạ Hữu Yên.",
    "choiceFeedback": [
     "Sai — Nguyễn Đức Toàn là tác giả bài “Em yêu hòa bình”.",
     "Sai — Phạm Tuyên có nhiều sáng tác khác như “Chú voi con ở Bản Đôn”.",
     "Sai — Lưu Hữu Phước là tác giả “Thiếu nhi thế giới liên hoan”.",
     "Đúng — Bùi Đình Thảo là người phổ nhạc bài “Bàn tay mẹ”."
    ]
   },
   {
    "stem": "Bài thơ được phổ nhạc thành bài hát “Bàn tay mẹ” là của nhà thơ nào?",
    "choices": [
     "Tố Hữu",
     "Trần Đăng Khoa",
     "Tạ Hữu Yên",
     "Xuân Quỳnh"
    ],
    "answer": 2,
    "explanation": "Lời bài hát “Bàn tay mẹ” được phổ từ bài thơ của nhà thơ Tạ Hữu Yên.",
    "choiceFeedback": [
     "Sai — Tố Hữu không phải tác giả bài thơ này.",
     "Sai — Trần Đăng Khoa nổi tiếng với các bài thơ thiếu nhi khác.",
     "Đúng — Tạ Hữu Yên là tác giả bài thơ được phổ nhạc thành “Bàn tay mẹ”.",
     "Sai — Xuân Quỳnh là nhà thơ khác, không viết bài thơ này."
    ]
   },
   {
    "stem": "Nhịp 3/4 thường gắn liền với điệu nhảy nào?",
    "choices": [
     "Valse (Van-xơ)",
     "Cha cha cha",
     "Disco",
     "Hip hop"
    ],
    "answer": 0,
    "explanation": "Nhịp 3/4 với 3 phách nhịp nhàng là nhịp điệu đặc trưng của điệu nhảy Valse.",
    "choiceFeedback": [
     "Đúng — Valse là điệu nhảy tiêu biểu viết ở nhịp 3/4.",
     "Sai — Cha cha cha thường viết ở nhịp 4/4.",
     "Sai — Disco cũng thường ở nhịp 4/4.",
     "Sai — Hip hop không gắn với nhịp 3/4 truyền thống."
    ]
   },
   {
    "stem": "“Cò lả” là bài dân ca thuộc vùng miền nào?",
    "choices": [
     "Nam Bộ",
     "Tây Nguyên",
     "Đồng bằng Bắc Bộ",
     "Miền núi phía Bắc"
    ],
    "answer": 2,
    "explanation": "“Cò lả” là bài dân ca quen thuộc của vùng đồng bằng Bắc Bộ.",
    "choiceFeedback": [
     "Sai — Nam Bộ có “Lý cây bông”, “Lý kéo chài”.",
     "Sai — Tây Nguyên gắn với các bài về Bản Đôn, cồng chiêng.",
     "Đúng — “Cò lả” là dân ca đồng bằng Bắc Bộ.",
     "Sai — miền núi phía Bắc có dân ca của các dân tộc thiểu số khác."
    ]
   },
   {
    "stem": "Khi tập hát bè cùng bạn, điều quan trọng nhất em cần làm là gì?",
    "choices": [
     "Hát to hơn để át giọng bạn",
     "Hát nhanh hơn bè bạn",
     "Chỉ cần thuộc lời, không cần nghe bè bạn",
     "Nghe và giữ đúng bè, cao độ của mình để hòa cùng bè kia"
    ],
    "answer": 3,
    "explanation": "Hát bè cần lắng nghe bè của bạn để giữ đúng cao độ, hòa giọng nhịp nhàng, tạo nên sự hòa quyện âm thanh.",
    "choiceFeedback": [
     "Sai — hát to át giọng sẽ làm mất sự hòa quyện giữa các bè.",
     "Sai — các bè cần hát cùng tốc độ, không bè nào nhanh hơn.",
     "Sai — không nghe bè bạn dễ dẫn đến lệch nhịp, sai hòa âm.",
     "Đúng — biết lắng nghe và giữ đúng bè của mình là yếu tố quan trọng nhất khi hát bè."
    ]
   },
   {
    "stem": "“Bàn tay mẹ” được phổ nhạc từ thể loại văn học nào?",
    "choices": [
     "Truyện ngắn",
     "Tục ngữ",
     "Bài thơ",
     "Ca dao"
    ],
    "answer": 2,
    "explanation": "“Bàn tay mẹ” được nhạc sĩ Bùi Đình Thảo phổ nhạc từ một bài thơ của Tạ Hữu Yên.",
    "choiceFeedback": [
     "Sai — không phải phổ từ truyện ngắn.",
     "Sai — tục ngữ là câu nói ngắn đúc kết kinh nghiệm, không phải nguồn phổ nhạc ở đây.",
     "Đúng — bài hát được phổ nhạc từ một bài thơ.",
     "Sai — ca dao là thể loại dân gian khác, không phải nguồn của bài này."
    ]
   },
   {
    "stem": "“Chim sáo” là bài dân ca của dân tộc nào, vùng nào?",
    "choices": [
     "Dân ca Khmer, Nam Bộ",
     "Dân ca Mường, Tây Bắc",
     "Dân ca Thái, Tây Bắc",
     "Dân ca Tày, Việt Bắc"
    ],
    "answer": 0,
    "explanation": "“Chim sáo” là bài dân ca của đồng bào Khmer ở Nam Bộ.",
    "choiceFeedback": [
     "Đúng — “Chim sáo” là dân ca Khmer, vùng Nam Bộ.",
     "Sai — dân ca Mường thường gắn với vùng Tây Bắc, Hòa Bình, không phải bài này.",
     "Sai — dân ca Thái có phong cách khác, không phải “Chim sáo”.",
     "Sai — dân ca Tày gắn với Việt Bắc, không phải nguồn gốc bài “Chim sáo”."
    ]
   },
   {
    "stem": "Khi hát bài “Khăn quàng thắm mãi vai em”, em nên thể hiện tình cảm như thế nào cho phù hợp với ý nghĩa bài hát?",
    "choices": [
     "Hát nhanh, hời hợt cho xong",
     "Hát tự hào, trang nghiêm, thể hiện tình yêu với chiếc khăn quàng đỏ và Đội Thiếu niên Tiền phong",
     "Hát thật nhỏ vì bài buồn",
     "Vừa hát vừa đùa giỡn"
    ],
    "answer": 1,
    "explanation": "Bài hát ca ngợi chiếc khăn quàng đỏ, biểu tượng của Đội Thiếu niên Tiền phong Hồ Chí Minh, nên cần hát với tình cảm tự hào, trang nghiêm, thể hiện tình yêu và trách nhiệm của người đội viên.",
    "choiceFeedback": [
     "Sai — hát hời hợt không thể hiện được ý nghĩa thiêng liêng của bài hát.",
     "Đúng — thể hiện sự tự hào, trang nghiêm phù hợp với ý nghĩa bài hát về khăn quàng đỏ.",
     "Sai — bài hát mang tinh thần tự hào, vui tươi chứ không buồn.",
     "Sai — đùa giỡn khi hát sẽ làm mất đi sự trang nghiêm cần có."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P4AN-exam-gk2": {
  "id": "P4AN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Âm nhạc 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "am-nhac",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Âm nhạc 4",
  "questions": [
   {
    "stem": "Hợp âm Đô trưởng gồm những nốt nào?",
    "choices": [
     "Đô – Mi – Sol",
     "Đô – Rê – Mi",
     "Đô – Fa – La",
     "Rê – Fa – La"
    ],
    "answer": 0,
    "explanation": "Hợp âm Đô trưởng gồm ba nốt Đô – Mi – Sol.",
    "choiceFeedback": [
     "Đúng — hợp âm Đô trưởng gồm Đô, Mi, Sol.",
     "Sai — đây chỉ là 3 nốt liền bậc, không phải hợp âm Đô trưởng.",
     "Sai — hợp âm này không đúng công thức của Đô trưởng.",
     "Sai — đây là các nốt không tạo thành hợp âm Đô trưởng."
    ]
   },
   {
    "stem": "Khi đọc rải hợp âm Đô – Mi – Sol theo chiều đi lên, cao độ các nốt thay đổi ra sao?",
    "choices": [
     "Cao độ giữ nguyên",
     "Cao độ tăng dần",
     "Cao độ giảm dần",
     "Cao độ lên xuống thất thường"
    ],
    "answer": 1,
    "explanation": "Đọc rải hợp âm đi lên nghĩa là đọc lần lượt các nốt theo cao độ tăng dần: Đô thấp nhất, rồi đến Mi, rồi đến Sol cao nhất.",
    "choiceFeedback": [
     "Sai — ba nốt Đô, Mi, Sol có cao độ khác nhau, không giữ nguyên.",
     "Đúng — đọc rải lên là đọc các nốt theo cao độ tăng dần.",
     "Sai — đọc đi lên thì cao độ phải tăng, không giảm.",
     "Sai — đọc rải hợp âm theo một chiều nhất định, không lộn xộn."
    ]
   },
   {
    "stem": "Bản nhạc “Bốn mùa” là tác phẩm của nhạc sĩ nào?",
    "choices": [
     "Mozart",
     "Beethoven",
     "Vivaldi",
     "Bach"
    ],
    "answer": 2,
    "explanation": "“Bốn mùa” (Le Quattro Stagioni) là tác phẩm nổi tiếng của nhà soạn nhạc người Ý Antonio Vivaldi.",
    "choiceFeedback": [
     "Sai — Mozart có nhiều tác phẩm nổi tiếng khác, nhưng không phải “Bốn mùa”.",
     "Sai — Beethoven nổi tiếng với các bản giao hưởng, không phải “Bốn mùa”.",
     "Đúng — Vivaldi là tác giả của “Bốn mùa”.",
     "Sai — Bach là nhà soạn nhạc khác thời kỳ Baroque, không sáng tác “Bốn mùa”."
    ]
   },
   {
    "stem": "“Bốn mùa” của Vivaldi gồm mấy bản concerto?",
    "choices": [
     "3 bản: Xuân, Hạ, Thu",
     "2 bản: Xuân, Thu",
     "5 bản gồm cả mùa mưa",
     "4 bản: Xuân, Hạ, Thu, Đông"
    ],
    "answer": 3,
    "explanation": "“Bốn mùa” gồm 4 bản concerto tương ứng bốn mùa Xuân, Hạ, Thu, Đông.",
    "choiceFeedback": [
     "Sai — thiếu mất mùa Đông.",
     "Sai — có đến 4 bản, không chỉ 2.",
     "Sai — không có bản nào cho “mùa mưa”, chỉ có 4 mùa quen thuộc.",
     "Đúng — có đúng 4 bản concerto cho 4 mùa Xuân, Hạ, Thu, Đông."
    ]
   },
   {
    "stem": "Nhạc cụ nào giữ vai trò độc tấu chính trong các bản concerto của “Bốn mùa”?",
    "choices": [
     "Piano",
     "Guitar",
     "Violin",
     "Trống"
    ],
    "answer": 2,
    "explanation": "Trong “Bốn mùa”, đàn violin (vĩ cầm) đóng vai trò nhạc cụ độc tấu chính, dẫn dắt giai điệu.",
    "choiceFeedback": [
     "Sai — piano không phải nhạc cụ độc tấu chính trong tác phẩm này.",
     "Sai — guitar không xuất hiện trong dàn nhạc của “Bốn mùa”.",
     "Đúng — violin là nhạc cụ độc tấu chính trong “Bốn mùa”.",
     "Sai — trống không giữ vai trò độc tấu trong tác phẩm này."
    ]
   },
   {
    "stem": "Đàn bầu — nhạc cụ dân tộc Việt Nam — có đặc điểm gì nổi bật?",
    "choices": [
     "Có nhiều dây và nhiều phím bấm",
     "Chỉ có một dây duy nhất",
     "Là nhạc cụ gõ bằng gỗ",
     "Thổi bằng hơi như sáo"
    ],
    "answer": 1,
    "explanation": "Đàn bầu là nhạc cụ dân tộc độc đáo của Việt Nam, chỉ có một dây duy nhất nhưng tạo ra âm thanh phong phú.",
    "choiceFeedback": [
     "Sai — đàn bầu chỉ có một dây, không phải nhiều dây.",
     "Đúng — đàn bầu chỉ có một dây, là đặc điểm nổi bật và độc đáo.",
     "Sai — đàn bầu thuộc bộ dây, không phải bộ gõ.",
     "Sai — đàn bầu phát âm nhờ dây rung, không thổi hơi như sáo."
    ]
   },
   {
    "stem": "Sáo trúc thường được làm bằng chất liệu gì?",
    "choices": [
     "Kim loại",
     "Nhựa",
     "Tre hoặc trúc",
     "Gỗ cứng"
    ],
    "answer": 2,
    "explanation": "Sáo trúc là nhạc cụ dân tộc làm từ ống tre hoặc trúc, thuộc bộ hơi.",
    "choiceFeedback": [
     "Sai — kim loại không phải chất liệu truyền thống làm sáo trúc.",
     "Sai — nhựa là chất liệu hiện đại, không phải chất liệu truyền thống.",
     "Đúng — sáo trúc làm từ tre hoặc trúc, đúng như tên gọi.",
     "Sai — gỗ cứng thường dùng làm nhạc cụ khác, không phải sáo trúc truyền thống."
    ]
   },
   {
    "stem": "Lĩnh xướng là gì?",
    "choices": [
     "Một người hát riêng một đoạn trong bài hát, phần còn lại cả nhóm cùng hát",
     "Cả nhóm cùng hát một lúc từ đầu đến cuối",
     "Chỉ nhạc công chơi nhạc cụ không có người hát",
     "Múa phụ họa không hát lời"
    ],
    "answer": 0,
    "explanation": "Lĩnh xướng là hình thức một người hát một đoạn (câu) riêng, các phần còn lại do tập thể (đồng ca/hợp ca) cùng hát.",
    "choiceFeedback": [
     "Đúng — đó chính là đặc điểm của lĩnh xướng.",
     "Sai — đó là mô tả của hát đồng ca/hợp ca, không phải lĩnh xướng.",
     "Sai — lĩnh xướng vẫn có người hát, không phải chỉ chơi nhạc cụ.",
     "Sai — lĩnh xướng liên quan đến hát, không phải múa."
    ]
   },
   {
    "stem": "“Chú voi con ở Bản Đôn” do nhạc sĩ nào sáng tác?",
    "choices": [
     "Nguyễn Đức Toàn",
     "Bùi Đình Thảo",
     "Lưu Hữu Phước",
     "Phạm Tuyên"
    ],
    "answer": 3,
    "explanation": "Bài hát “Chú voi con ở Bản Đôn” do nhạc sĩ Phạm Tuyên sáng tác.",
    "choiceFeedback": [
     "Sai — Nguyễn Đức Toàn là tác giả “Em yêu hòa bình”.",
     "Sai — Bùi Đình Thảo là tác giả nhạc bài “Bàn tay mẹ”.",
     "Sai — Lưu Hữu Phước là tác giả “Thiếu nhi thế giới liên hoan”.",
     "Đúng — Phạm Tuyên chính là tác giả bài này."
    ]
   },
   {
    "stem": "Bản Đôn — địa danh gắn với bài hát “Chú voi con ở Bản Đôn” — thuộc tỉnh nào?",
    "choices": [
     "Lâm Đồng",
     "Gia Lai",
     "Đắk Lắk",
     "Kon Tum"
    ],
    "answer": 2,
    "explanation": "Bản Đôn là địa danh nổi tiếng về nghề thuần dưỡng voi, thuộc tỉnh Đắk Lắk.",
    "choiceFeedback": [
     "Sai — Lâm Đồng không phải nơi có địa danh Bản Đôn.",
     "Sai — Gia Lai là tỉnh khác ở Tây Nguyên.",
     "Đúng — Bản Đôn thuộc tỉnh Đắk Lắk, nổi tiếng với nghề thuần dưỡng voi.",
     "Sai — Kon Tum cũng ở Tây Nguyên nhưng không phải nơi có Bản Đôn."
    ]
   },
   {
    "stem": "Khi bản nhạc có kí hiệu f (forte), em cần hát/chơi nhạc như thế nào?",
    "choices": [
     "Hát nhẹ nhàng, thì thầm",
     "Hát mạnh mẽ, to rõ",
     "Hát nhanh dần",
     "Hát chậm dần"
    ],
    "answer": 1,
    "explanation": "Kí hiệu f (forte) nghĩa là mạnh, to, nên cần hát hoặc chơi nhạc mạnh mẽ, âm lượng lớn tại đoạn đó.",
    "choiceFeedback": [
     "Sai — đó là ý nghĩa của kí hiệu p (piano - nhẹ), ngược với f.",
     "Đúng — f (forte) nghĩa là mạnh, cần hát to, rõ, khỏe khoắn.",
     "Sai — f chỉ về cường độ (mạnh - nhẹ), không phải về tốc độ.",
     "Sai — f không liên quan đến tốc độ nhanh chậm."
    ]
   },
   {
    "stem": "Nhạc sĩ Lưu Hữu Phước — tác giả “Thiếu nhi thế giới liên hoan” — còn được biết đến với sáng tác nào sau đây?",
    "choices": [
     "“Reo vang bình minh”",
     "“Bàn tay mẹ”",
     "“Chú voi con ở Bản Đôn”",
     "“Em yêu hòa bình”"
    ],
    "answer": 0,
    "explanation": "Nhạc sĩ Lưu Hữu Phước là tác giả của nhiều ca khúc thiếu nhi và cách mạng nổi tiếng, trong đó có bài “Reo vang bình minh”.",
    "choiceFeedback": [
     "Đúng — “Reo vang bình minh” cũng là sáng tác của nhạc sĩ Lưu Hữu Phước.",
     "Sai — “Bàn tay mẹ” do Bùi Đình Thảo phổ nhạc.",
     "Sai — “Chú voi con ở Bản Đôn” do Phạm Tuyên sáng tác.",
     "Sai — “Em yêu hòa bình” do Nguyễn Đức Toàn sáng tác."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P4AN-exam-ck2": {
  "id": "P4AN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Âm nhạc 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "am-nhac",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Âm nhạc 4",
  "questions": [
   {
    "stem": "Hợp âm Đô trưởng được tạo thành từ ba nốt nào?",
    "choices": [
     "Đô – Mi – Sol",
     "Rê – Fa – La",
     "Mi – Sol – Si",
     "Fa – La – Đô"
    ],
    "answer": 0,
    "explanation": "Hợp âm Đô trưởng gồm ba nốt Đô – Mi – Sol.",
    "choiceFeedback": [
     "Đúng — đúng ba nốt tạo nên hợp âm Đô trưởng.",
     "Sai — đây là hợp âm khác, không phải Đô trưởng.",
     "Sai — đây cũng không phải hợp âm Đô trưởng.",
     "Sai — đây không đúng ba nốt gốc của hợp âm Đô trưởng."
    ]
   },
   {
    "stem": "Đàn bầu thuộc bộ nhạc cụ nào?",
    "choices": [
     "Bộ gõ",
     "Bộ dây",
     "Bộ hơi",
     "Bộ phím"
    ],
    "answer": 1,
    "explanation": "Đàn bầu phát âm nhờ một dây đàn rung nên thuộc bộ dây.",
    "choiceFeedback": [
     "Sai — bộ gõ gồm thanh phách, trống, song loan.",
     "Đúng — đàn bầu là nhạc cụ dây, có một dây duy nhất.",
     "Sai — bộ hơi gồm sáo, recorder.",
     "Sai — bộ phím gồm đàn organ, piano."
    ]
   },
   {
    "stem": "Kí hiệu p (piano) trong bản nhạc yêu cầu người hát thể hiện như thế nào?",
    "choices": [
     "Hát thật to",
     "Hát nhanh gấp đôi",
     "Hát nhẹ nhàng, êm dịu",
     "Ngừng hát"
    ],
    "answer": 2,
    "explanation": "Kí hiệu p (piano) nghĩa là nhẹ, êm, người hát cần thể hiện với âm lượng nhỏ, dịu dàng.",
    "choiceFeedback": [
     "Sai — hát to là ý nghĩa của f (forte), ngược với p.",
     "Sai — p không liên quan đến tốc độ.",
     "Đúng — p (piano) nghĩa là nhẹ, cần hát êm dịu.",
     "Sai — p không có nghĩa là ngừng hát, vẫn hát nhưng nhẹ nhàng hơn."
    ]
   },
   {
    "stem": "Trong bài tập đọc nhạc Sol – La – Si – Đô’, nốt Đô’ (Đô cao) có cao độ như thế nào so với nốt Đô gốc?",
    "choices": [
     "Thấp hơn một quãng tám",
     "Bằng nhau",
     "Không liên quan",
     "Cao hơn một quãng tám"
    ],
    "answer": 3,
    "explanation": "Đô’ (Đô cao, có dấu phẩy) là nốt Đô cao hơn nốt Đô gốc đúng một quãng tám (8 bậc).",
    "choiceFeedback": [
     "Sai — Đô’ cao hơn, không phải thấp hơn Đô gốc.",
     "Sai — hai nốt tuy cùng tên Đô nhưng cao độ khác nhau một quãng tám.",
     "Sai — hai nốt cùng tên Đô có liên quan chặt chẽ về cao độ (cách nhau một quãng tám).",
     "Đúng — Đô’ là nốt Đô cao hơn một quãng tám so với Đô gốc."
    ]
   },
   {
    "stem": "Khi đọc bài tập đọc nhạc, em nên giữ nhịp bằng cách nào?",
    "choices": [
     "Đọc tùy hứng không cần đều",
     "Vừa đọc vừa gõ phách hoặc đưa tay đều đặn theo nhịp",
     "Chỉ cần đọc đúng tên nốt, không cần giữ nhịp",
     "Nhờ bạn đọc hộ"
    ],
    "answer": 1,
    "explanation": "Gõ phách hoặc đưa tay đều đặn theo nhịp giúp giữ tốc độ ổn định, đọc nhạc chính xác về trường độ.",
    "choiceFeedback": [
     "Sai — đọc tùy hứng dễ làm sai trường độ, lệch nhịp.",
     "Đúng — gõ phách hoặc đưa tay đều là cách giữ nhịp hiệu quả khi đọc nhạc.",
     "Sai — đọc nhạc cần đúng cả cao độ, trường độ và giữ đúng nhịp.",
     "Sai — em cần tự luyện tập để giữ nhịp, không thể nhờ bạn đọc hộ."
    ]
   },
   {
    "stem": "Nhịp lấy đà là gì?",
    "choices": [
     "Nhịp đầu tiên của bài không đủ số phách theo số chỉ nhịp",
     "Nhịp cuối cùng của bài thiếu phách",
     "Một loại nhịp hoàn toàn khác nhịp 2/4, 3/4, 4/4",
     "Nhịp chỉ xuất hiện ở giữa bài hát"
    ],
    "answer": 0,
    "explanation": "Nhịp lấy đà là nhịp đầu tiên của bản nhạc không đủ số phách theo quy định của số chỉ nhịp, thường bắt đầu từ phách yếu để 'lấy đà' vào bài.",
    "choiceFeedback": [
     "Đúng — đó chính là định nghĩa của nhịp lấy đà.",
     "Sai — nhịp lấy đà nằm ở đầu bài, không phải cuối bài.",
     "Sai — nhịp lấy đà vẫn thuộc loại nhịp 2/4, 3/4 hay 4/4, chỉ là nhịp đầu không đủ phách.",
     "Sai — nhịp lấy đà chỉ xuất hiện ở đầu bài, không phải ở giữa."
    ]
   },
   {
    "stem": "Nếu một bài viết ở nhịp 2/4 có nhịp lấy đà 1 phách, điều đó nghĩa là gì?",
    "choices": [
     "Cả bài chỉ có 1 phách",
     "Nhịp cuối cùng dư ra 1 phách",
     "Nhịp đầu tiên chỉ có 1 phách thay vì đủ 2 phách",
     "Bài hát không có nhịp lấy đà"
    ],
    "answer": 2,
    "explanation": "Nhịp lấy đà 1 phách trong bài viết ở nhịp 2/4 nghĩa là nhịp đầu tiên của bài chỉ có 1 phách (thiếu 1 phách) thay vì đủ 2 phách như bình thường.",
    "choiceFeedback": [
     "Sai — chỉ nhịp đầu tiên thiếu phách, không phải cả bài.",
     "Sai — phần phách thiếu ở đầu bài mới liên quan đến lấy đà.",
     "Đúng — nhịp đầu chỉ có 1 trong 2 phách, đó là nhịp lấy đà.",
     "Sai — đề bài đã nêu rõ bài có nhịp lấy đà 1 phách."
    ]
   },
   {
    "stem": "Nhã nhạc cung đình Huế — một loại hình âm nhạc cổ truyền Việt Nam — đã được tổ chức nào công nhận là di sản văn hóa phi vật thể?",
    "choices": [
     "UNICEF",
     "WHO",
     "FIFA",
     "UNESCO"
    ],
    "answer": 3,
    "explanation": "Nhã nhạc cung đình Huế được UNESCO công nhận là Kiệt tác di sản văn hóa phi vật thể của nhân loại.",
    "choiceFeedback": [
     "Sai — UNICEF là tổ chức về trẻ em, không phụ trách di sản văn hóa.",
     "Sai — WHO là tổ chức y tế thế giới.",
     "Sai — FIFA là tổ chức bóng đá quốc tế.",
     "Đúng — UNESCO là tổ chức đã công nhận nhã nhạc cung đình Huế."
    ]
   },
   {
    "stem": "Hợp xướng khác gì so với hát đơn ca?",
    "choices": [
     "Hợp xướng chỉ có một người hát duy nhất",
     "Hợp xướng gồm nhiều người hát nhiều bè khác nhau, có người chỉ huy",
     "Hợp xướng không cần giữ nhịp",
     "Hợp xướng chỉ hát không lời"
    ],
    "answer": 1,
    "explanation": "Hợp xướng là hình thức nhiều người cùng hát, thường chia thành nhiều bè khác nhau, có nhạc trưởng (người chỉ huy) điều khiển.",
    "choiceFeedback": [
     "Sai — đó là đặc điểm của đơn ca, không phải hợp xướng.",
     "Đúng — hợp xướng có nhiều bè, nhiều người hát và có người chỉ huy.",
     "Sai — hợp xướng vẫn cần giữ nhịp chặt chẽ theo sự điều khiển của nhạc trưởng.",
     "Sai — hợp xướng vẫn có lời ca như các hình thức ca hát khác."
    ]
   },
   {
    "stem": "“Lý kéo chài” là bài dân ca mô tả hoạt động gì?",
    "choices": [
     "Cảnh cấy lúa trên đồng ruộng",
     "Cảnh chăn trâu trên đồng cỏ",
     "Cảnh ngư dân kéo lưới đánh cá",
     "Cảnh dệt vải"
    ],
    "answer": 2,
    "explanation": "“Lý kéo chài” là dân ca Nam Bộ mô tả cảnh lao động của ngư dân khi kéo lưới đánh cá trên biển.",
    "choiceFeedback": [
     "Sai — cảnh cấy lúa gắn với các bài dân ca khác về nông nghiệp.",
     "Sai — chăn trâu không phải nội dung của bài này.",
     "Đúng — bài hát mô tả cảnh ngư dân kéo lưới, một hoạt động lao động vùng biển.",
     "Sai — dệt vải không phải nội dung của “Lý kéo chài”."
    ]
   },
   {
    "stem": "Trong nhịp 4/4, ngoài phách 1 là phách mạnh, phách nào được coi là phách mạnh vừa?",
    "choices": [
     "Phách 2",
     "Phách 4",
     "Không có phách nào khác",
     "Phách 3"
    ],
    "answer": 3,
    "explanation": "Trong nhịp 4/4, phách 1 là phách mạnh, phách 3 là phách mạnh vừa, còn phách 2 và 4 là phách nhẹ.",
    "choiceFeedback": [
     "Sai — phách 2 là phách nhẹ.",
     "Sai — phách 4 là phách nhẹ.",
     "Sai — phách 3 chính là phách mạnh vừa trong nhịp 4/4.",
     "Đúng — phách 3 trong nhịp 4/4 là phách mạnh vừa."
    ]
   },
   {
    "stem": "Ở phần biểu diễn cuối năm, khi một bạn trong nhóm lỡ quên lời hoặc hát sai, các bạn còn lại nên xử lý như thế nào để buổi biểu diễn vẫn tốt đẹp?",
    "choices": [
     "Bình tĩnh hát tiếp, hỗ trợ nhắc nhẹ hoặc hát to hơn để át đi phần sai, giữ tinh thần biểu diễn",
     "Dừng lại và chê bai bạn ngay trên sân khấu",
     "Bỏ về không diễn tiếp",
     "Cười to chỉ trỏ vào bạn"
    ],
    "answer": 0,
    "explanation": "Trong biểu diễn tập thể, khi có bạn hát sai hoặc quên lời, cả nhóm cần bình tĩnh, hỗ trợ nhau (nhắc nhẹ, hát to hơn để bù) và tiếp tục biểu diễn cho trọn vẹn, thể hiện tinh thần đoàn kết.",
    "choiceFeedback": [
     "Đúng — bình tĩnh, hỗ trợ nhau và tiếp tục biểu diễn là cách xử lý phù hợp nhất.",
     "Sai — dừng lại chê bai sẽ làm hỏng cả buổi biểu diễn và làm bạn xấu hổ.",
     "Sai — bỏ về giữa chừng là thiếu trách nhiệm với cả nhóm và khán giả.",
     "Sai — cười chê bạn trên sân khấu là hành vi thiếu tôn trọng bạn bè."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
