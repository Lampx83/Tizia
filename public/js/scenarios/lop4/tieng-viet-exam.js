// P4TV — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định.
// Ráp bởi data/gen-content/assemble-exam.mjs — file này chỉ là NGUỒN SEED.
export const P4TV_EXAMS = {
 "P4TV-exam-gk1": {
  "id": "P4TV-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Tiếng Việt 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tieng-viet",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Tiếng Việt 4",
  "questions": [
   {
    "stem": "Tiếng \"trường\" có cấu tạo gồm những bộ phận nào?",
    "choices": [
     "Âm đầu, vần, thanh",
     "Chỉ có vần và thanh",
     "Âm đầu và vần, không có thanh",
     "Chỉ có âm đầu"
    ],
    "answer": 0,
    "explanation": "Mỗi tiếng thường gồm ba bộ phận: âm đầu, vần và thanh. Tiếng \"trường\" có âm đầu \"tr\", vần \"ương\" và thanh huyền.",
    "choiceFeedback": [
     "Đúng — tiếng \"trường\" có đủ âm đầu (tr), vần (ương) và thanh (huyền).",
     "Sai — tiếng vẫn có âm đầu, không thể bỏ qua bộ phận này.",
     "Sai — tiếng \"trường\" mang thanh huyền, không thể thiếu bộ phận thanh.",
     "Sai — một tiếng còn có vần và thanh, không chỉ có âm đầu."
    ]
   },
   {
    "stem": "Vần của tiếng \"học\" là?",
    "choices": [
     "oc",
     "họ",
     "h",
     "uc"
    ],
    "answer": 0,
    "explanation": "Tiếng \"học\" gồm âm đầu \"h\", vần \"oc\" và thanh nặng. Phần vần đứng sau âm đầu là \"oc\".",
    "choiceFeedback": [
     "Đúng — bỏ âm đầu \"h\" và thanh nặng, phần còn lại là vần \"oc\".",
     "Sai — \"họ\" gồm cả âm đầu và thanh, không phải riêng phần vần.",
     "Sai — \"h\" là âm đầu, không phải vần.",
     "Sai — vần của \"học\" là \"oc\" chứ không phải \"uc\"."
    ]
   },
   {
    "stem": "Tiếng nào sau đây có đủ ba bộ phận âm đầu, vần và thanh?",
    "choices": [
     "oa",
     "an",
     "bàn",
     "ăn"
    ],
    "answer": 2,
    "explanation": "\"Bàn\" có âm đầu \"b\", vần \"an\", thanh huyền — đủ ba bộ phận. Các tiếng \"oa\", \"an\", \"ăn\" đều không có âm đầu.",
    "choiceFeedback": [
     "Sai — tiếng \"oa\" bắt đầu bằng nguyên âm, không có âm đầu.",
     "Sai — tiếng \"an\" không có âm đầu.",
     "Đúng — \"bàn\" có âm đầu \"b\", vần \"an\" và thanh huyền.",
     "Sai — tiếng \"ăn\" không có âm đầu."
    ]
   },
   {
    "stem": "Từ đơn là từ?",
    "choices": [
     "Chỉ gồm một tiếng",
     "Gồm hai tiếng trở lên",
     "Được ghép bởi hai tiếng có nghĩa",
     "Có các tiếng lặp âm hoặc vần với nhau"
    ],
    "answer": 0,
    "explanation": "Từ đơn là từ chỉ gồm một tiếng, ví dụ: bàn, ghế, đi, học.",
    "choiceFeedback": [
     "Đúng — từ đơn chỉ có một tiếng.",
     "Sai — từ gồm hai tiếng trở lên là từ phức, không phải từ đơn.",
     "Sai — đây là cách tạo ra từ ghép, một loại từ phức.",
     "Sai — đây là đặc điểm của từ láy, một loại từ phức."
    ]
   },
   {
    "stem": "Từ nào sau đây là từ đơn?",
    "choices": [
     "học sinh",
     "sách vở",
     "bàn",
     "long lanh"
    ],
    "answer": 2,
    "explanation": "\"Bàn\" chỉ gồm một tiếng nên là từ đơn. Ba từ còn lại đều gồm hai tiếng, là từ phức.",
    "choiceFeedback": [
     "Sai — \"học sinh\" gồm 2 tiếng, là từ phức (từ ghép).",
     "Sai — \"sách vở\" gồm 2 tiếng, là từ phức (từ ghép).",
     "Đúng — \"bàn\" chỉ có một tiếng nên là từ đơn.",
     "Sai — \"long lanh\" gồm 2 tiếng, là từ phức (từ láy)."
    ]
   },
   {
    "stem": "Câu \"Học sinh chăm ngoan\" có mấy từ?",
    "choices": [
     "2",
     "3",
     "4",
     "1"
    ],
    "answer": 0,
    "explanation": "Câu gồm 2 từ phức: \"học sinh\" (từ ghép chỉ người) và \"chăm ngoan\" (từ ghép chỉ tính chất), tổng cộng 2 từ dù có 4 tiếng.",
    "choiceFeedback": [
     "Đúng — câu có 2 từ: \"học sinh\" và \"chăm ngoan\", mỗi từ gồm 2 tiếng ghép lại.",
     "Sai — câu chỉ có 2 từ, không phải 3 từ.",
     "Sai — 4 là số tiếng trong câu, không phải số từ.",
     "Sai — câu có 2 từ chứ không phải chỉ 1 từ."
    ]
   },
   {
    "stem": "Từ ghép là từ phức được tạo bởi?",
    "choices": [
     "Ghép các tiếng có nghĩa lại với nhau",
     "Lặp lại âm đầu hoặc vần giữa các tiếng",
     "Chỉ một tiếng có nghĩa được lặp lại",
     "Các tiếng không có nghĩa ghép ngẫu nhiên"
    ],
    "answer": 0,
    "explanation": "Từ ghép được tạo thành bằng cách ghép các tiếng có nghĩa với nhau, ví dụ: bàn ghế, học tập.",
    "choiceFeedback": [
     "Đúng — từ ghép là các tiếng có nghĩa được ghép lại với nhau.",
     "Sai — đây là cách tạo từ láy, không phải từ ghép.",
     "Sai — từ ghép thường gồm từ hai tiếng có nghĩa trở lên, không chỉ lặp một tiếng.",
     "Sai — các tiếng trong từ ghép đều có nghĩa, không ghép ngẫu nhiên."
    ]
   },
   {
    "stem": "Từ nào sau đây là từ láy?",
    "choices": [
     "bàn ghế",
     "rì rào",
     "học tập",
     "thầy giáo"
    ],
    "answer": 1,
    "explanation": "\"Rì rào\" có các tiếng lặp lại âm, tạo thành từ láy tượng thanh. Ba từ còn lại là từ ghép do các tiếng đều có nghĩa riêng.",
    "choiceFeedback": [
     "Sai — \"bàn\" và \"ghế\" đều có nghĩa riêng nên đây là từ ghép.",
     "Đúng — \"rì rào\" là từ láy, mô phỏng âm thanh.",
     "Sai — \"học\" và \"tập\" đều có nghĩa nên đây là từ ghép.",
     "Sai — \"thầy\" và \"giáo\" đều có nghĩa nên đây là từ ghép."
    ]
   },
   {
    "stem": "\"Ào ào\" là loại từ láy nào?",
    "choices": [
     "Láy âm đầu",
     "Láy vần",
     "Láy toàn bộ (láy hoàn toàn)",
     "Không phải từ láy"
    ],
    "answer": 2,
    "explanation": "\"Ào ào\" lặp lại nguyên vẹn cả tiếng \"ào\" nên thuộc loại láy toàn bộ (láy hoàn toàn).",
    "choiceFeedback": [
     "Sai — láy âm đầu chỉ lặp phụ âm đầu, ví dụ \"long lanh\".",
     "Sai — láy vần chỉ lặp phần vần, ví dụ \"lác đác\".",
     "Đúng — cả tiếng \"ào\" được lặp lại nguyên vẹn nên là láy toàn bộ.",
     "Sai — \"ào ào\" có cấu tạo lặp âm nên chắc chắn là từ láy."
    ]
   },
   {
    "stem": "Danh từ là từ chỉ?",
    "choices": [
     "Người, vật, hiện tượng, khái niệm, đơn vị",
     "Hoạt động, trạng thái của sự vật",
     "Đặc điểm, tính chất của sự vật",
     "Chỉ riêng tên đồ vật"
    ],
    "answer": 0,
    "explanation": "Danh từ là từ chỉ người, vật, hiện tượng, khái niệm hoặc đơn vị, ví dụ: học sinh, mưa, tình bạn, cái.",
    "choiceFeedback": [
     "Đúng — đây là định nghĩa đầy đủ về danh từ.",
     "Sai — đây là định nghĩa của động từ.",
     "Sai — đây là định nghĩa của tính từ.",
     "Sai — danh từ không chỉ nói về đồ vật mà còn chỉ người, hiện tượng, khái niệm, đơn vị."
    ]
   },
   {
    "stem": "Trong câu \"Bạn Lan yêu trường lớp\", có mấy danh từ?",
    "choices": [
     "2",
     "3",
     "4",
     "1"
    ],
    "answer": 2,
    "explanation": "Các danh từ trong câu là: \"Bạn\" (danh từ chỉ người), \"Lan\" (danh từ riêng), \"trường\", \"lớp\" — tổng cộng 4 danh từ. \"Yêu\" là động từ.",
    "choiceFeedback": [
     "Sai — câu có nhiều hơn 2 danh từ.",
     "Sai — câu có nhiều hơn 3 danh từ.",
     "Đúng — Bạn, Lan, trường, lớp đều là danh từ, tổng cộng 4 từ.",
     "Sai — câu có nhiều hơn 1 danh từ."
    ]
   },
   {
    "stem": "Danh từ riêng dùng để gọi tên?",
    "choices": [
     "Một sự vật cụ thể, riêng biệt như tên người, tên địa danh",
     "Một loại sự vật chung chung",
     "Chỉ hiện tượng thiên nhiên",
     "Chỉ khái niệm trừu tượng"
    ],
    "answer": 0,
    "explanation": "Danh từ riêng gọi tên một sự vật cụ thể, duy nhất, ví dụ: Hà Nội, Trần Hưng Đạo — khác với danh từ chung gọi tên chung cho một loại sự vật.",
    "choiceFeedback": [
     "Đúng — danh từ riêng chỉ một sự vật riêng biệt, cụ thể.",
     "Sai — gọi tên chung cho một loại sự vật là chức năng của danh từ chung.",
     "Sai — hiện tượng thiên nhiên (mưa, nắng) là danh từ chung, không phải danh từ riêng.",
     "Sai — khái niệm trừu tượng (tình bạn) thường là danh từ chung."
    ]
   },
   {
    "stem": "Quy tắc viết danh từ riêng là gì?",
    "choices": [
     "Viết hoa chữ cái đầu của mỗi tiếng tạo thành tên riêng",
     "Viết thường toàn bộ các chữ",
     "Viết hoa toàn bộ các chữ cái",
     "Chỉ viết hoa chữ cái cuối cùng"
    ],
    "answer": 0,
    "explanation": "Khi viết tên riêng, ta viết hoa chữ cái đầu của mỗi tiếng, ví dụ: Trần Hưng Đạo, Hà Nội.",
    "choiceFeedback": [
     "Đúng — mỗi tiếng trong tên riêng đều được viết hoa chữ cái đầu.",
     "Sai — danh từ riêng phải viết hoa, không viết thường.",
     "Sai — chỉ viết hoa chữ cái đầu mỗi tiếng, không viết hoa toàn bộ chữ.",
     "Sai — chữ cái đầu mỗi tiếng mới được viết hoa, không phải chữ cuối."
    ]
   },
   {
    "stem": "Trong câu \"Em đi học ở trường Tiểu học Kim Đồng\", danh từ riêng là?",
    "choices": [
     "trường",
     "Tiểu học",
     "Kim Đồng",
     "đi học"
    ],
    "answer": 2,
    "explanation": "\"Kim Đồng\" là tên riêng của ngôi trường, được viết hoa chữ cái đầu mỗi tiếng nên là danh từ riêng. \"Trường\", \"Tiểu học\" là danh từ chung, \"đi học\" là động từ.",
    "choiceFeedback": [
     "Sai — \"trường\" là danh từ chung, chỉ loại cơ sở giáo dục nói chung.",
     "Sai — \"Tiểu học\" là danh từ chung chỉ cấp học, không phải tên riêng.",
     "Đúng — \"Kim Đồng\" là tên riêng của trường nên là danh từ riêng.",
     "Sai — \"đi học\" là động từ, không phải danh từ."
    ]
   },
   {
    "stem": "Từ nào KHÔNG cùng nhóm nghĩa với \"thẳng thắn, trung thực, thật thà\"?",
    "choices": [
     "ngay thẳng",
     "chân thật",
     "gian dối",
     "thật lòng"
    ],
    "answer": 2,
    "explanation": "\"Gian dối\" mang nghĩa trái ngược, chỉ sự không trung thực, trong khi các từ còn lại đều cùng nghĩa với \"trung thực\".",
    "choiceFeedback": [
     "Sai — \"ngay thẳng\" cùng nghĩa với \"trung thực\".",
     "Sai — \"chân thật\" cùng nghĩa với \"trung thực\".",
     "Đúng — \"gian dối\" trái nghĩa với \"trung thực\", không cùng nhóm với các từ còn lại.",
     "Sai — \"thật lòng\" cùng nghĩa với \"trung thực\"."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P4TV-exam-ck1": {
  "id": "P4TV-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Tiếng Việt 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tieng-viet",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Tiếng Việt 4",
  "questions": [
   {
    "stem": "Từ nào sau đây là từ ghép?",
    "choices": [
     "lấp lánh",
     "bàn ghế",
     "rào rào",
     "đo đỏ"
    ],
    "answer": 1,
    "explanation": "\"Bàn\" và \"ghế\" đều là tiếng có nghĩa được ghép lại nên \"bàn ghế\" là từ ghép. Ba từ còn lại đều có tiếng lặp âm/vần nên là từ láy.",
    "choiceFeedback": [
     "Sai — \"lấp lánh\" là từ láy vì có sự lặp lại âm giữa hai tiếng.",
     "Đúng — \"bàn\" và \"ghế\" đều có nghĩa riêng, ghép lại tạo thành từ ghép.",
     "Sai — \"rào rào\" là từ láy toàn bộ.",
     "Sai — \"đo đỏ\" là từ láy vì lặp lại âm \"đ\" và vần \"o\"."
    ]
   },
   {
    "stem": "Từ nào là danh từ riêng?",
    "choices": [
     "học sinh",
     "Việt Nam",
     "xanh",
     "chạy"
    ],
    "answer": 1,
    "explanation": "\"Việt Nam\" là tên riêng của một quốc gia, được viết hoa nên là danh từ riêng. \"Học sinh\" là danh từ chung, \"xanh\" là tính từ, \"chạy\" là động từ.",
    "choiceFeedback": [
     "Sai — \"học sinh\" là danh từ chung, chỉ chung một loại người.",
     "Đúng — \"Việt Nam\" là tên riêng của một quốc gia nên là danh từ riêng.",
     "Sai — \"xanh\" là tính từ chỉ màu sắc, không phải danh từ.",
     "Sai — \"chạy\" là động từ chỉ hoạt động, không phải danh từ."
    ]
   },
   {
    "stem": "Trong câu \"Em đọc sách\", động từ là?",
    "choices": [
     "Em",
     "đọc",
     "sách",
     "không có động từ"
    ],
    "answer": 1,
    "explanation": "\"Đọc\" là từ chỉ hoạt động của \"Em\" nên là động từ trong câu. \"Em\" là chủ ngữ, \"sách\" là danh từ làm bổ ngữ.",
    "choiceFeedback": [
     "Sai — \"Em\" là danh từ/đại từ làm chủ ngữ, không phải động từ.",
     "Đúng — \"đọc\" chỉ hoạt động nên là động từ.",
     "Sai — \"sách\" là danh từ chỉ sự vật, không phải động từ.",
     "Sai — câu có động từ \"đọc\" thể hiện hoạt động."
    ]
   },
   {
    "stem": "Trong câu \"Bầu trời cao và rộng\", có mấy tính từ?",
    "choices": [
     "1",
     "2",
     "3",
     "0"
    ],
    "answer": 1,
    "explanation": "Hai tính từ trong câu là \"cao\" và \"rộng\", đều chỉ đặc điểm của bầu trời.",
    "choiceFeedback": [
     "Sai — câu có 2 tính từ, không phải 1.",
     "Đúng — \"cao\" và \"rộng\" đều là tính từ chỉ đặc điểm.",
     "Sai — câu chỉ có 2 tính từ, không có tính từ thứ ba.",
     "Sai — câu có tính từ, không phải là 0."
    ]
   },
   {
    "stem": "Câu hỏi thường kết thúc bằng dấu?",
    "choices": [
     "Dấu chấm",
     "Dấu chấm hỏi",
     "Dấu chấm than",
     "Dấu hai chấm"
    ],
    "answer": 1,
    "explanation": "Câu hỏi dùng để hỏi điều chưa biết và thường kết thúc bằng dấu chấm hỏi (?).",
    "choiceFeedback": [
     "Sai — dấu chấm thường dùng để kết thúc câu kể.",
     "Đúng — câu hỏi kết thúc bằng dấu chấm hỏi.",
     "Sai — dấu chấm than thường dùng để kết thúc câu cảm hoặc câu khiến.",
     "Sai — dấu hai chấm dùng để báo hiệu lời nói hoặc phần liệt kê, không dùng để kết thúc câu hỏi."
    ]
   },
   {
    "stem": "Câu nào là câu hỏi?",
    "choices": [
     "Em rất thích đọc sách.",
     "Bạn có thích đọc truyện không?",
     "Hãy đọc sách đi!",
     "Ôi, cuốn sách hay quá!"
    ],
    "answer": 1,
    "explanation": "Câu \"Bạn có thích đọc truyện không?\" nêu điều chưa biết cần hỏi và kết thúc bằng dấu chấm hỏi nên là câu hỏi.",
    "choiceFeedback": [
     "Sai — đây là câu kể, nêu một sự việc, kết thúc bằng dấu chấm.",
     "Đúng — câu này hỏi về sở thích và kết thúc bằng dấu chấm hỏi.",
     "Sai — đây là câu khiến, nêu yêu cầu, kết thúc bằng dấu chấm than.",
     "Sai — đây là câu cảm, bộc lộ cảm xúc, kết thúc bằng dấu chấm than."
    ]
   },
   {
    "stem": "Câu \"Cậu giỏi quá nhỉ?\" trong tình huống khen bạn học tốt là câu hỏi dùng để?",
    "choices": [
     "Hỏi thông tin về sự việc",
     "Khen ngợi",
     "Yêu cầu người khác làm việc",
     "Phủ định một điều gì đó"
    ],
    "answer": 1,
    "explanation": "Trong tình huống khen ngợi, câu hỏi này không nhằm hỏi thông tin mà dùng với mục đích khen ngợi bạn.",
    "choiceFeedback": [
     "Sai — người nói không cần câu trả lời thông tin, mục đích là khen.",
     "Đúng — câu hỏi được dùng để khen ngợi, không nhằm hỏi thông tin.",
     "Sai — câu này không nêu yêu cầu hành động.",
     "Sai — câu này không mang ý phủ định."
    ]
   },
   {
    "stem": "Câu tục ngữ \"Có chí thì nên\" khuyên chúng ta điều gì?",
    "choices": [
     "Cần có ý chí, kiên trì thì sẽ thành công",
     "Chỉ cần may mắn là đủ để thành công",
     "Không cần cố gắng vẫn thành công",
     "\"Chí\" là tên gọi của một loại cây"
    ],
    "answer": 0,
    "explanation": "Câu tục ngữ khuyên con người phải có ý chí, quyết tâm, kiên trì thì mới đạt được thành công trong công việc.",
    "choiceFeedback": [
     "Đúng — câu tục ngữ đề cao ý chí, sự kiên trì để đạt được thành công.",
     "Sai — câu tục ngữ đề cao ý chí, không nói về may mắn.",
     "Sai — trái lại, câu tục ngữ nhấn mạnh cần phải cố gắng.",
     "Sai — trong câu này, \"chí\" có nghĩa là ý chí, quyết tâm, không phải tên cây."
    ]
   },
   {
    "stem": "Trong câu \"Mẹ nấu cơm\", vị ngữ là?",
    "choices": [
     "Mẹ",
     "nấu cơm",
     "cơm",
     "không có vị ngữ"
    ],
    "answer": 1,
    "explanation": "\"Nấu cơm\" là bộ phận nêu hoạt động của chủ ngữ \"Mẹ\" nên là vị ngữ trong câu kể \"Ai làm gì?\".",
    "choiceFeedback": [
     "Sai — \"Mẹ\" là chủ ngữ, trả lời câu hỏi \"Ai?\".",
     "Đúng — \"nấu cơm\" nêu hoạt động của \"Mẹ\" nên là vị ngữ.",
     "Sai — \"cơm\" chỉ là một phần của cụm động từ làm vị ngữ, không phải cả vị ngữ.",
     "Sai — câu này có đủ chủ ngữ và vị ngữ."
    ]
   },
   {
    "stem": "Câu nào là câu kể \"Ai làm gì?\"",
    "choices": [
     "Bầu trời rất xanh.",
     "Em là học sinh lớp 4.",
     "Đàn chim đang bay về tổ.",
     "Ôi, đẹp quá!"
    ],
    "answer": 2,
    "explanation": "\"Đàn chim đang bay về tổ\" có chủ ngữ chỉ sự vật và vị ngữ nêu hoạt động nên thuộc kiểu câu kể \"Ai làm gì?\".",
    "choiceFeedback": [
     "Sai — đây là câu kể \"Ai thế nào?\" vì vị ngữ nêu đặc điểm.",
     "Sai — đây là câu kể \"Ai là gì?\" vì vị ngữ giới thiệu, nhận định.",
     "Đúng — vị ngữ \"đang bay về tổ\" nêu hoạt động nên đây là câu kể \"Ai làm gì?\".",
     "Sai — đây là câu cảm, bộc lộ cảm xúc."
    ]
   },
   {
    "stem": "Trong câu \"Bầu trời rất xanh\", vị ngữ là?",
    "choices": [
     "Bầu trời",
     "rất xanh",
     "xanh",
     "không xác định được"
    ],
    "answer": 1,
    "explanation": "\"Rất xanh\" là cụm tính từ nêu đặc điểm của \"bầu trời\" nên là vị ngữ trong câu kể \"Ai thế nào?\".",
    "choiceFeedback": [
     "Sai — \"bầu trời\" là chủ ngữ, trả lời câu hỏi \"Ai (cái gì)?\".",
     "Đúng — \"rất xanh\" nêu đặc điểm của bầu trời nên là vị ngữ.",
     "Sai — \"xanh\" chỉ là một phần, còn từ \"rất\" cũng thuộc vị ngữ.",
     "Sai — câu có đủ chủ ngữ và vị ngữ rõ ràng."
    ]
   },
   {
    "stem": "Trong câu \"Hà Nội là thủ đô của nước ta\", chủ ngữ là?",
    "choices": [
     "Hà Nội",
     "là thủ đô",
     "thủ đô của nước ta",
     "nước ta"
    ],
    "answer": 0,
    "explanation": "\"Hà Nội\" là bộ phận được giới thiệu, trả lời câu hỏi \"Ai (cái gì) là gì?\" nên là chủ ngữ.",
    "choiceFeedback": [
     "Đúng — \"Hà Nội\" là chủ ngữ được giới thiệu trong câu.",
     "Sai — đây là một phần của vị ngữ, không phải chủ ngữ.",
     "Sai — đây là phần nêu nội dung giới thiệu (thuộc vị ngữ), không phải chủ ngữ.",
     "Sai — đây chỉ là một phần bổ nghĩa trong vị ngữ, không phải chủ ngữ của câu."
    ]
   },
   {
    "stem": "Câu \"Vườn nhà em có nhiều cây ăn quả: cam, bưởi, ổi\" có dấu hai chấm dùng để?",
    "choices": [
     "Báo hiệu lời nói trực tiếp của nhân vật",
     "Báo hiệu phần liệt kê",
     "Ngăn cách hai vế câu ghép",
     "Kết thúc câu"
    ],
    "answer": 1,
    "explanation": "Dấu hai chấm ở đây báo hiệu phần liệt kê các loại cây ăn quả: cam, bưởi, ổi.",
    "choiceFeedback": [
     "Sai — câu này không có lời nói trực tiếp của nhân vật.",
     "Đúng — dấu hai chấm báo hiệu phần liệt kê tiếp theo.",
     "Sai — dấu hai chấm ở đây không dùng để ngăn cách hai vế câu ghép.",
     "Sai — dấu kết thúc câu là dấu chấm, không phải dấu hai chấm."
    ]
   },
   {
    "stem": "Câu \"Em là học sinh chăm ngoan\" thuộc kiểu câu kể nào?",
    "choices": [
     "Ai làm gì?",
     "Ai thế nào?",
     "Ai là gì?",
     "Không phải câu kể"
    ],
    "answer": 2,
    "explanation": "Vị ngữ \"là học sinh chăm ngoan\" dùng để giới thiệu, nhận định về chủ ngữ \"Em\" nên thuộc kiểu câu kể \"Ai là gì?\".",
    "choiceFeedback": [
     "Sai — vị ngữ không nêu hoạt động nên không phải \"Ai làm gì?\".",
     "Sai — vị ngữ không chỉ nêu đặc điểm đơn thuần mà giới thiệu, nhận định.",
     "Đúng — vị ngữ bắt đầu bằng \"là\" dùng để giới thiệu, nhận định nên là câu kể \"Ai là gì?\".",
     "Sai — đây vẫn là một câu kể, chỉ khác kiểu."
    ]
   },
   {
    "stem": "Trong 4 câu sau, câu nào KHÔNG có tính từ?",
    "choices": [
     "Bầu trời trong xanh.",
     "Em đang đọc sách.",
     "Bông hoa rất đẹp.",
     "Bạn ấy chăm chỉ học tập."
    ],
    "answer": 1,
    "explanation": "Câu \"Em đang đọc sách\" chỉ có động từ \"đọc\", không có từ nào chỉ đặc điểm, tính chất nên không có tính từ.",
    "choiceFeedback": [
     "Sai — \"trong xanh\" là tính từ chỉ đặc điểm của bầu trời.",
     "Đúng — câu này chỉ có động từ \"đọc\", không có tính từ.",
     "Sai — \"đẹp\" là tính từ chỉ đặc điểm của bông hoa.",
     "Sai — \"chăm chỉ\" là tính từ chỉ đặc điểm của bạn ấy."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P4TV-exam-gk2": {
  "id": "P4TV-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Tiếng Việt 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tieng-viet",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Tiếng Việt 4",
  "questions": [
   {
    "stem": "Chủ ngữ trong câu kể \"Ai làm gì?\" trả lời cho câu hỏi nào?",
    "choices": [
     "Ai (con gì, cái gì)?",
     "Làm gì?",
     "Như thế nào?",
     "Là gì?"
    ],
    "answer": 0,
    "explanation": "Chủ ngữ nêu tên người, con vật, sự vật thực hiện hoạt động, trả lời câu hỏi \"Ai (con gì, cái gì)?\".",
    "choiceFeedback": [
     "Đúng — chủ ngữ trả lời câu hỏi \"Ai (con gì, cái gì)?\".",
     "Sai — \"Làm gì?\" là câu hỏi để tìm vị ngữ.",
     "Sai — \"Như thế nào?\" dùng để tìm vị ngữ trong câu kể \"Ai thế nào?\".",
     "Sai — \"Là gì?\" dùng để tìm vị ngữ trong câu kể \"Ai là gì?\"."
    ]
   },
   {
    "stem": "Trong câu \"Đàn chim hót líu lo\", chủ ngữ là?",
    "choices": [
     "Đàn chim",
     "hót líu lo",
     "líu lo",
     "không có chủ ngữ"
    ],
    "answer": 0,
    "explanation": "\"Đàn chim\" là bộ phận thực hiện hoạt động \"hót líu lo\" nên là chủ ngữ của câu.",
    "choiceFeedback": [
     "Đúng — \"đàn chim\" là chủ thể thực hiện hoạt động hót.",
     "Sai — \"hót líu lo\" là vị ngữ, nêu hoạt động.",
     "Sai — \"líu lo\" chỉ là một phần bổ nghĩa cho động từ \"hót\", không phải chủ ngữ.",
     "Sai — câu này có đủ chủ ngữ và vị ngữ."
    ]
   },
   {
    "stem": "\"Tài năng\" có nghĩa là?",
    "choices": [
     "Khả năng đặc biệt, làm việc giỏi hơn người khác",
     "Sự chăm chỉ trong học tập",
     "Tính cách hiền lành",
     "Sức khoẻ tốt"
    ],
    "answer": 0,
    "explanation": "\"Tài năng\" chỉ khả năng đặc biệt, sự khéo léo, giỏi giang hơn người bình thường trong một lĩnh vực nào đó.",
    "choiceFeedback": [
     "Đúng — tài năng là khả năng đặc biệt, làm việc giỏi hơn người khác.",
     "Sai — chăm chỉ là đức tính, không phải là tài năng.",
     "Sai — hiền lành là tính cách, không liên quan đến tài năng.",
     "Sai — sức khoẻ tốt không phải là nghĩa của từ \"tài năng\"."
    ]
   },
   {
    "stem": "Từ nào KHÔNG cùng nhóm nghĩa với \"tài năng\"?",
    "choices": [
     "tài giỏi",
     "tài ba",
     "xuất sắc",
     "vụng về"
    ],
    "answer": 3,
    "explanation": "\"Vụng về\" mang nghĩa trái ngược, chỉ sự thiếu khéo léo, trong khi ba từ còn lại đều cùng nghĩa với \"tài năng\".",
    "choiceFeedback": [
     "Sai — \"tài giỏi\" cùng nghĩa với \"tài năng\".",
     "Sai — \"tài ba\" cùng nghĩa với \"tài năng\".",
     "Sai — \"xuất sắc\" cùng nghĩa với \"tài năng\".",
     "Đúng — \"vụng về\" trái nghĩa với \"tài năng\", không cùng nhóm với các từ còn lại."
    ]
   },
   {
    "stem": "Câu khiến dùng để?",
    "choices": [
     "Nêu yêu cầu, đề nghị, mong muốn",
     "Hỏi thông tin chưa biết",
     "Kể lại một sự việc",
     "Bộc lộ cảm xúc"
    ],
    "answer": 0,
    "explanation": "Câu khiến dùng để nêu yêu cầu, đề nghị, khuyên bảo hoặc mong muốn người khác làm một việc gì đó.",
    "choiceFeedback": [
     "Đúng — câu khiến nêu yêu cầu, đề nghị hoặc mong muốn.",
     "Sai — hỏi thông tin là mục đích của câu hỏi.",
     "Sai — kể lại sự việc là mục đích của câu kể.",
     "Sai — bộc lộ cảm xúc là mục đích của câu cảm."
    ]
   },
   {
    "stem": "Câu nào là câu khiến?",
    "choices": [
     "Bạn tên là gì?",
     "Hãy giữ trật tự!",
     "Trời hôm nay rất đẹp.",
     "Ôi, thích quá!"
    ],
    "answer": 1,
    "explanation": "\"Hãy giữ trật tự!\" có từ \"hãy\" nêu yêu cầu và kết thúc bằng dấu chấm than nên là câu khiến.",
    "choiceFeedback": [
     "Sai — đây là câu hỏi, nêu điều cần hỏi.",
     "Đúng — từ \"hãy\" cùng dấu chấm than cho thấy đây là câu khiến.",
     "Sai — đây là câu kể, nêu một nhận xét.",
     "Sai — đây là câu cảm, bộc lộ cảm xúc thích thú."
    ]
   },
   {
    "stem": "Câu cảm thường kết thúc bằng dấu?",
    "choices": [
     "Dấu chấm",
     "Dấu chấm hỏi",
     "Dấu chấm than",
     "Dấu phẩy"
    ],
    "answer": 2,
    "explanation": "Câu cảm bộc lộ cảm xúc mạnh (vui, buồn, ngạc nhiên...) nên thường kết thúc bằng dấu chấm than (!).",
    "choiceFeedback": [
     "Sai — dấu chấm thường dùng để kết thúc câu kể.",
     "Sai — dấu chấm hỏi dùng để kết thúc câu hỏi.",
     "Đúng — câu cảm kết thúc bằng dấu chấm than.",
     "Sai — dấu phẩy dùng để ngăn cách các bộ phận trong câu, không kết thúc câu."
    ]
   },
   {
    "stem": "Câu \"Ôi, bông hoa đẹp làm sao!\" bộc lộ cảm xúc gì?",
    "choices": [
     "Ngạc nhiên, thích thú trước vẻ đẹp của bông hoa",
     "Buồn bã, tiếc nuối",
     "Tức giận, khó chịu",
     "Lo lắng, sợ hãi"
    ],
    "answer": 0,
    "explanation": "Từ cảm thán \"Ôi\" cùng cách nói \"đẹp làm sao\" thể hiện sự ngạc nhiên, thích thú của người nói trước vẻ đẹp của bông hoa.",
    "choiceFeedback": [
     "Đúng — câu thể hiện sự ngạc nhiên, thích thú trước vẻ đẹp của bông hoa.",
     "Sai — câu không mang sắc thái buồn bã.",
     "Sai — câu không mang sắc thái tức giận.",
     "Sai — câu không mang sắc thái lo lắng, sợ hãi."
    ]
   },
   {
    "stem": "Câu thành ngữ \"Có sức khoẻ là có tất cả\" muốn nói điều gì?",
    "choices": [
     "Sức khoẻ là điều quan trọng nhất, có sức khoẻ mới làm được nhiều việc",
     "Chỉ cần có tiền là đủ, không cần sức khoẻ",
     "Sức khoẻ không quan trọng bằng tiền bạc",
     "Chỉ người giàu mới có sức khoẻ tốt"
    ],
    "answer": 0,
    "explanation": "Câu này nhấn mạnh sức khoẻ là vốn quý giá nhất, có sức khoẻ tốt thì con người mới có thể học tập, làm việc và tận hưởng cuộc sống.",
    "choiceFeedback": [
     "Đúng — thành ngữ đề cao vai trò quan trọng hàng đầu của sức khoẻ.",
     "Sai — thành ngữ đề cao sức khoẻ, không nói về tiền bạc.",
     "Sai — thành ngữ khẳng định ngược lại, sức khoẻ là điều quan trọng nhất.",
     "Sai — sức khoẻ không phụ thuộc vào việc giàu hay nghèo."
    ]
   },
   {
    "stem": "Trong câu \"Sáng nay, em đi học\", trạng ngữ là?",
    "choices": [
     "Sáng nay",
     "em",
     "đi học",
     "không có trạng ngữ"
    ],
    "answer": 0,
    "explanation": "\"Sáng nay\" bổ sung ý nghĩa về thời gian cho câu và được ngăn cách bằng dấu phẩy nên là trạng ngữ.",
    "choiceFeedback": [
     "Đúng — \"Sáng nay\" là trạng ngữ chỉ thời gian.",
     "Sai — \"em\" là chủ ngữ của câu.",
     "Sai — \"đi học\" là vị ngữ của câu.",
     "Sai — câu này có trạng ngữ chỉ thời gian đứng đầu câu."
    ]
   },
   {
    "stem": "Trạng ngữ thường được ngăn cách với phần còn lại của câu bằng dấu gì?",
    "choices": [
     "Dấu chấm",
     "Dấu phẩy",
     "Dấu hai chấm",
     "Dấu ngoặc kép"
    ],
    "answer": 1,
    "explanation": "Trạng ngữ đứng đầu câu thường được ngăn cách với chủ ngữ, vị ngữ bằng dấu phẩy.",
    "choiceFeedback": [
     "Sai — dấu chấm dùng để kết thúc câu, không dùng để ngăn cách trạng ngữ.",
     "Đúng — dấu phẩy thường dùng để ngăn cách trạng ngữ với phần còn lại của câu.",
     "Sai — dấu hai chấm dùng để báo hiệu lời nói hoặc phần liệt kê.",
     "Sai — dấu ngoặc kép dùng để đánh dấu lời nói trực tiếp hoặc tên tác phẩm."
    ]
   },
   {
    "stem": "\"Trong vườn\" trong câu \"Trong vườn, hoa nở rộ\" là trạng ngữ chỉ?",
    "choices": [
     "Thời gian",
     "Nơi chốn",
     "Nguyên nhân",
     "Mục đích"
    ],
    "answer": 1,
    "explanation": "\"Trong vườn\" cho biết địa điểm diễn ra sự việc \"hoa nở rộ\" nên là trạng ngữ chỉ nơi chốn.",
    "choiceFeedback": [
     "Sai — trạng ngữ chỉ thời gian trả lời câu hỏi \"khi nào?\", ví dụ \"buổi sáng\".",
     "Đúng — \"trong vườn\" cho biết địa điểm nên là trạng ngữ chỉ nơi chốn.",
     "Sai — trạng ngữ chỉ nguyên nhân thường bắt đầu bằng \"vì, do, nhờ\".",
     "Sai — trạng ngữ chỉ mục đích thường bắt đầu bằng \"để, nhằm\"."
    ]
   },
   {
    "stem": "Trong câu \"Vì trời mưa, em không đi chơi\", trạng ngữ là?",
    "choices": [
     "Vì trời mưa",
     "em",
     "không đi chơi",
     "trời mưa"
    ],
    "answer": 0,
    "explanation": "\"Vì trời mưa\" nêu nguyên nhân của việc \"em không đi chơi\" nên là trạng ngữ chỉ nguyên nhân.",
    "choiceFeedback": [
     "Đúng — \"Vì trời mưa\" là trạng ngữ chỉ nguyên nhân, có từ \"vì\" mở đầu.",
     "Sai — \"em\" là chủ ngữ của câu.",
     "Sai — \"không đi chơi\" là vị ngữ của câu.",
     "Sai — cần giữ nguyên từ \"vì\" vì đó là dấu hiệu của trạng ngữ chỉ nguyên nhân."
    ]
   },
   {
    "stem": "Câu \"Em học chăm để cha mẹ vui lòng\" có trạng ngữ chỉ?",
    "choices": [
     "Nguyên nhân",
     "Mục đích",
     "Thời gian",
     "Nơi chốn"
    ],
    "answer": 1,
    "explanation": "\"Để cha mẹ vui lòng\" nêu mục đích của việc học chăm, bắt đầu bằng từ \"để\" nên là trạng ngữ chỉ mục đích.",
    "choiceFeedback": [
     "Sai — trạng ngữ chỉ nguyên nhân thường bắt đầu bằng \"vì, do, nhờ\", không phải \"để\".",
     "Đúng — \"để cha mẹ vui lòng\" nêu mục đích, bắt đầu bằng từ \"để\".",
     "Sai — trạng ngữ này không nêu thời gian.",
     "Sai — trạng ngữ này không nêu địa điểm."
    ]
   },
   {
    "stem": "Người đi thám hiểm cần có phẩm chất gì là chủ yếu?",
    "choices": [
     "Dũng cảm, kiên trì, ham hiểu biết",
     "Chỉ cần giàu có, nhiều tiền bạc",
     "Sợ khó khăn, ngại thử thách",
     "Không cần chuẩn bị gì trước khi đi"
    ],
    "answer": 0,
    "explanation": "Người đi thám hiểm phải đối mặt với nhiều khó khăn, nguy hiểm nên cần dũng cảm, kiên trì và ham muốn khám phá, hiểu biết.",
    "choiceFeedback": [
     "Đúng — dũng cảm, kiên trì và ham hiểu biết là những phẩm chất cần thiết của người thám hiểm.",
     "Sai — tiền bạc không phải là phẩm chất quyết định để đi thám hiểm.",
     "Sai — người thám hiểm cần dũng cảm, không sợ khó khăn.",
     "Sai — người thám hiểm cần chuẩn bị kỹ lưỡng trước chuyến đi."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P4TV-exam-ck2": {
  "id": "P4TV-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Tiếng Việt 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "tieng-viet",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Tiếng Việt 4",
  "questions": [
   {
    "stem": "Từ nào cùng nghĩa với \"tài năng\"?",
    "choices": [
     "tài giỏi",
     "vụng về",
     "yếu đuối",
     "lười biếng"
    ],
    "answer": 0,
    "explanation": "\"Tài giỏi\" cùng nghĩa với \"tài năng\", đều chỉ khả năng đặc biệt, giỏi giang hơn người khác.",
    "choiceFeedback": [
     "Đúng — \"tài giỏi\" cùng nghĩa với \"tài năng\".",
     "Sai — \"vụng về\" trái nghĩa với \"tài năng\".",
     "Sai — \"yếu đuối\" không liên quan đến nghĩa của \"tài năng\".",
     "Sai — \"lười biếng\" không liên quan đến nghĩa của \"tài năng\"."
    ]
   },
   {
    "stem": "Câu \"Hãy giữ gìn vệ sinh chung!\" là kiểu câu gì?",
    "choices": [
     "Câu kể",
     "Câu hỏi",
     "Câu khiến",
     "Câu cảm"
    ],
    "answer": 2,
    "explanation": "Từ \"hãy\" cùng dấu chấm than cho thấy câu này nêu yêu cầu, đề nghị nên là câu khiến.",
    "choiceFeedback": [
     "Sai — câu kể dùng để kể, tả lại sự việc, không nêu yêu cầu.",
     "Sai — câu này không nêu điều cần hỏi, không phải câu hỏi.",
     "Đúng — từ \"hãy\" cho thấy đây là câu khiến, nêu yêu cầu.",
     "Sai — câu này không bộc lộ cảm xúc nên không phải câu cảm."
    ]
   },
   {
    "stem": "Trong câu \"Hôm qua, em đi chơi với mẹ\", trạng ngữ chỉ?",
    "choices": [
     "Thời gian",
     "Nơi chốn",
     "Nguyên nhân",
     "Mục đích"
    ],
    "answer": 0,
    "explanation": "\"Hôm qua\" cho biết thời điểm diễn ra sự việc nên là trạng ngữ chỉ thời gian.",
    "choiceFeedback": [
     "Đúng — \"Hôm qua\" cho biết thời điểm, là trạng ngữ chỉ thời gian.",
     "Sai — trạng ngữ chỉ nơi chốn cho biết địa điểm, ví dụ \"ở công viên\".",
     "Sai — trạng ngữ chỉ nguyên nhân thường bắt đầu bằng \"vì, do\".",
     "Sai — trạng ngữ chỉ mục đích thường bắt đầu bằng \"để, nhằm\"."
    ]
   },
   {
    "stem": "\"Thám hiểm\" có nghĩa là?",
    "choices": [
     "Đi đến những nơi chưa ai biết để tìm hiểu, khám phá",
     "Đi du lịch nghỉ dưỡng tại các khu vui chơi",
     "Ở nhà nghỉ ngơi, thư giãn",
     "Đi học ở trường mỗi ngày"
    ],
    "answer": 0,
    "explanation": "\"Thám hiểm\" là hoạt động đi đến những vùng đất mới, còn ít người biết đến để tìm hiểu, khám phá, nghiên cứu.",
    "choiceFeedback": [
     "Đúng — thám hiểm là đi khám phá những nơi chưa ai biết.",
     "Sai — đây là nghĩa của \"du lịch nghỉ dưỡng\", không phải \"thám hiểm\".",
     "Sai — nghỉ ngơi ở nhà không liên quan đến thám hiểm.",
     "Sai — đi học hằng ngày không liên quan đến thám hiểm."
    ]
   },
   {
    "stem": "Dấu ngoặc kép dùng để?",
    "choices": [
     "Đánh dấu lời nói trực tiếp, từ ngữ có ý nghĩa đặc biệt hoặc tên tác phẩm",
     "Ngăn cách các bộ phận liệt kê trong câu",
     "Kết thúc một câu kể",
     "Nối hai vế của câu ghép"
    ],
    "answer": 0,
    "explanation": "Dấu ngoặc kép dùng để đánh dấu lời nói trực tiếp của nhân vật, từ ngữ được dùng với ý nghĩa đặc biệt (mỉa mai, nhấn mạnh) hoặc tên tác phẩm, tài liệu.",
    "choiceFeedback": [
     "Đúng — đây là các công dụng chính của dấu ngoặc kép.",
     "Sai — ngăn cách phần liệt kê thường dùng dấu phẩy hoặc dấu hai chấm.",
     "Sai — kết thúc câu kể thường dùng dấu chấm.",
     "Sai — nối hai vế câu ghép thường dùng dấu phẩy hoặc quan hệ từ."
    ]
   },
   {
    "stem": "Trong câu \"Em rất thích bài thơ \\\"Tre Việt Nam\\\" của Nguyễn Duy\", dấu ngoặc kép đánh dấu điều gì?",
    "choices": [
     "Lời nói trực tiếp của nhân vật",
     "Tên một tác phẩm",
     "Từ ngữ mang ý mỉa mai",
     "Phần liệt kê trong câu"
    ],
    "answer": 1,
    "explanation": "Dấu ngoặc kép ở đây đánh dấu tên bài thơ \"Tre Việt Nam\" — một tác phẩm văn học.",
    "choiceFeedback": [
     "Sai — câu này không có lời nói trực tiếp của nhân vật.",
     "Đúng — dấu ngoặc kép đánh dấu tên tác phẩm \"Tre Việt Nam\".",
     "Sai — câu này không mang ý mỉa mai.",
     "Sai — câu này không có phần liệt kê."
    ]
   },
   {
    "stem": "Dấu gạch ngang đặt ở đầu dòng thường dùng để?",
    "choices": [
     "Đánh dấu chỗ bắt đầu lời nói của nhân vật trong đối thoại",
     "Đánh dấu tên riêng của người, địa danh",
     "Đánh dấu phần liệt kê trong dấu ngoặc kép",
     "Đánh dấu số thứ tự của câu"
    ],
    "answer": 0,
    "explanation": "Trong các đoạn hội thoại, dấu gạch ngang đặt đầu dòng để đánh dấu lời nói trực tiếp của từng nhân vật.",
    "choiceFeedback": [
     "Đúng — dấu gạch ngang đầu dòng đánh dấu lời thoại của nhân vật.",
     "Sai — tên riêng được đánh dấu bằng cách viết hoa, không dùng dấu gạch ngang.",
     "Sai — đây không phải công dụng của dấu gạch ngang đầu dòng.",
     "Sai — số thứ tự câu không cần đánh dấu bằng dấu gạch ngang."
    ]
   },
   {
    "stem": "Dấu gạch ngang trong câu \"Hà Nội — thủ đô của Việt Nam — rất đẹp\" dùng để?",
    "choices": [
     "Đánh dấu lời thoại của nhân vật",
     "Đánh dấu phần chú thích, giải thích thêm",
     "Liệt kê các ý trong câu",
     "Nối các tiếng trong một từ phức"
    ],
    "answer": 1,
    "explanation": "Cặp dấu gạch ngang ở đây dùng để đánh dấu phần chú thích \"thủ đô của Việt Nam\", giải thích thêm cho \"Hà Nội\".",
    "choiceFeedback": [
     "Sai — câu này không phải lời thoại của nhân vật.",
     "Đúng — dấu gạch ngang đánh dấu phần chú thích, giải thích thêm cho \"Hà Nội\".",
     "Sai — đây không phải phần liệt kê nhiều ý.",
     "Sai — nối các tiếng trong từ phức là công dụng của dấu gạch nối, khác với dấu gạch ngang."
    ]
   },
   {
    "stem": "Bố cục bài văn miêu tả đồ vật thường gồm mấy phần?",
    "choices": [
     "2 phần",
     "3 phần: mở bài, thân bài, kết bài",
     "4 phần",
     "Không có bố cục cố định"
    ],
    "answer": 1,
    "explanation": "Bài văn miêu tả đồ vật cũng như các bài văn khác thường có bố cục 3 phần: mở bài, thân bài, kết bài.",
    "choiceFeedback": [
     "Sai — bài văn miêu tả cần đủ 3 phần, không chỉ 2 phần.",
     "Đúng — bố cục gồm mở bài, thân bài và kết bài.",
     "Sai — bài văn miêu tả đồ vật chỉ cần 3 phần, không cần đến 4 phần.",
     "Sai — bài văn miêu tả luôn cần có bố cục rõ ràng, mạch lạc."
    ]
   },
   {
    "stem": "Trong câu \"Hàng cây ven đường vẫy tay chào đoàn tàu đi qua\", từ nào cho thấy đây là phép nhân hoá?",
    "choices": [
     "hàng cây",
     "vẫy tay chào",
     "đoàn tàu",
     "đi qua"
    ],
    "answer": 1,
    "explanation": "\"Vẫy tay chào\" là hành động của con người được gán cho \"hàng cây\", tạo nên phép nhân hoá sinh động.",
    "choiceFeedback": [
     "Sai — \"hàng cây\" là sự vật được nhân hoá, không phải từ ngữ tạo nên phép nhân hoá.",
     "Đúng — \"vẫy tay chào\" là hành động của người, gán cho cây tạo nên phép nhân hoá.",
     "Sai — \"đoàn tàu\" không liên quan đến phép nhân hoá trong câu.",
     "Sai — \"đi qua\" là hành động của đoàn tàu, không mang tính nhân hoá."
    ]
   },
   {
    "stem": "Câu \"Dòng suối chảy như một dải lụa mềm vắt qua thung lũng\" sử dụng biện pháp tu từ nào?",
    "choices": [
     "Nhân hoá",
     "So sánh",
     "Điệp từ",
     "Đảo ngữ"
    ],
    "answer": 1,
    "explanation": "Từ \"như\" dùng để so sánh dòng suối với dải lụa mềm nên đây là biện pháp so sánh.",
    "choiceFeedback": [
     "Sai — nhân hoá là gán đặc điểm, hành động của người cho vật, câu này không có yếu tố đó.",
     "Đúng — từ \"như\" cho thấy đây là biện pháp so sánh.",
     "Sai — điệp từ là lặp lại từ ngữ, câu này không lặp từ.",
     "Sai — đảo ngữ là thay đổi trật tự thông thường của câu, không phải biện pháp được dùng ở đây."
    ]
   },
   {
    "stem": "Vì sao dùng biện pháp so sánh giúp câu văn gợi hình hơn?",
    "choices": [
     "Vì nó giúp người đọc liên tưởng sự vật được tả với hình ảnh quen thuộc, cụ thể, sinh động hơn",
     "Vì nó làm câu văn dài hơn, nhiều chữ hơn",
     "Vì nó thay thế hoàn toàn nội dung cần miêu tả",
     "Vì nó giúp câu văn đúng ngữ pháp hơn"
    ],
    "answer": 0,
    "explanation": "So sánh giúp người đọc hình dung sự vật được miêu tả rõ ràng, cụ thể hơn nhờ liên tưởng đến hình ảnh quen thuộc, gần gũi.",
    "choiceFeedback": [
     "Đúng — so sánh giúp gợi hình bằng cách liên tưởng đến hình ảnh quen thuộc, sinh động.",
     "Sai — độ dài câu văn không phải lý do khiến biện pháp so sánh gợi hình hơn.",
     "Sai — so sánh bổ sung hình ảnh minh hoạ chứ không thay thế nội dung miêu tả.",
     "Sai — so sánh không liên quan đến việc câu văn đúng ngữ pháp."
    ]
   },
   {
    "stem": "Câu nào dùng biện pháp so sánh để tả con vật?",
    "choices": [
     "Chú mèo có bộ lông trắng muốt.",
     "Đôi mắt chú mèo tròn xoe như hai hòn bi ve.",
     "Chú mèo đang nằm ngủ.",
     "Chú mèo rất đáng yêu."
    ],
    "answer": 1,
    "explanation": "Từ \"như\" trong câu so sánh đôi mắt mèo với \"hai hòn bi ve\" giúp hình ảnh đôi mắt trở nên sinh động, cụ thể hơn.",
    "choiceFeedback": [
     "Sai — câu này chỉ miêu tả trực tiếp, không có từ so sánh.",
     "Đúng — từ \"như\" cho thấy đây là câu miêu tả có sử dụng biện pháp so sánh.",
     "Sai — câu này chỉ kể lại hành động, không có so sánh.",
     "Sai — câu này chỉ nêu nhận xét, không có hình ảnh so sánh."
    ]
   },
   {
    "stem": "Khi viết thư cho thầy cô, lời xưng hô phù hợp là?",
    "choices": [
     "Cậu — tớ",
     "Em — thầy/cô, thể hiện sự kính trọng, lễ phép",
     "Mày — tao",
     "Bạn — mình"
    ],
    "answer": 1,
    "explanation": "Khi viết thư cho thầy cô, cần xưng hô \"em\" với \"thầy/cô\" để thể hiện thái độ kính trọng, lễ phép, phù hợp với quan hệ thầy trò.",
    "choiceFeedback": [
     "Sai — \"cậu — tớ\" chỉ phù hợp khi xưng hô giữa bạn bè cùng lứa tuổi.",
     "Đúng — xưng \"em\" gọi \"thầy/cô\" thể hiện sự kính trọng, lễ phép.",
     "Sai — \"mày — tao\" là cách xưng hô suồng sã, không phù hợp với thầy cô.",
     "Sai — \"bạn — mình\" chỉ phù hợp khi xưng hô giữa bạn bè."
    ]
   },
   {
    "stem": "Từ nào trái nghĩa với \"lạc quan\"?",
    "choices": [
     "vui vẻ",
     "yêu đời",
     "bi quan",
     "hi vọng"
    ],
    "answer": 2,
    "explanation": "\"Bi quan\" chỉ thái độ chán nản, mất niềm tin, trái ngược hoàn toàn với \"lạc quan\" — thái độ tin tưởng, vui vẻ trước cuộc sống.",
    "choiceFeedback": [
     "Sai — \"vui vẻ\" cùng nghĩa với thái độ lạc quan.",
     "Sai — \"yêu đời\" cùng nghĩa với thái độ lạc quan.",
     "Đúng — \"bi quan\" trái nghĩa với \"lạc quan\".",
     "Sai — \"hi vọng\" cùng nghĩa với thái độ lạc quan, tin tưởng vào tương lai."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
