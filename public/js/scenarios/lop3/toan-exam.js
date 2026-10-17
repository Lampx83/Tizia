// P3 — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P3_EXAMS = {
 "P3-exam-gk1": {
  "id": "P3-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 3",
  "questions": [
   {
    "stem": "Số liền sau của 76 là?",
    "choices": [
     "75",
     "78",
     "77",
     "67"
    ],
    "answer": 2,
    "explanation": "Số liền sau lớn hơn số đã cho 1 đơn vị: 76 + 1 = 77.",
    "choiceFeedback": [
     "Sai — 75 là số liền trước của 76, không phải liền sau.",
     "Sai — 78 lớn hơn 76 tới 2 đơn vị, không phải số liền sau.",
     "Đúng — số liền sau lớn hơn 1 đơn vị: 76 + 1 = 77.",
     "Sai — 67 là đảo ngược chữ số của 76, không đúng yêu cầu."
    ]
   },
   {
    "stem": "Số nào bé nhất trong các số: 54, 45, 59, 49?",
    "choices": [
     "54",
     "45",
     "59",
     "49"
    ],
    "answer": 1,
    "explanation": "So sánh hàng chục: 45 và 49 có hàng chục là 4, bé hơn 54 và 59 (hàng chục 5); so tiếp hàng đơn vị: 45 < 49.",
    "choiceFeedback": [
     "Sai — 54 có hàng chục là 5, lớn hơn các số có hàng chục 4.",
     "Đúng — 45 có hàng chục bé nhất (4) và hàng đơn vị bé (5), là số bé nhất.",
     "Sai — 59 có hàng chục 5, là số lớn nhất trong dãy.",
     "Sai — 49 tuy hàng chục là 4 nhưng hàng đơn vị 9 lớn hơn 45."
    ]
   },
   {
    "stem": "36 + 42 = ?",
    "choices": [
     "68",
     "88",
     "76",
     "78"
    ],
    "answer": 3,
    "explanation": "6 + 2 = 8 (đơn vị); 3 + 4 = 7 (chục) → 78.",
    "choiceFeedback": [
     "Sai — 68 là cộng thiếu 1 chục, kiểm tra lại hàng chục.",
     "Sai — 88 là cộng dư 1 chục.",
     "Sai — 76 là tính nhầm hàng đơn vị.",
     "Đúng — 6+2=8 (đơn vị), 3+4=7 (chục) → 78."
    ]
   },
   {
    "stem": "91 − 47 = ?",
    "choices": [
     "44",
     "54",
     "34",
     "46"
    ],
    "answer": 0,
    "explanation": "1 không trừ được 7, mượn 1 chục: 11 − 7 = 4; 8 − 4 = 4 → 44.",
    "choiceFeedback": [
     "Đúng — mượn 1 chục: 11−7=4, còn 8−4=4 → 44.",
     "Sai — 54 là quên trừ đủ ở hàng chục sau khi mượn.",
     "Sai — 34 là trừ nhầm hàng chục.",
     "Sai — 46 là tính sai hàng đơn vị."
    ]
   },
   {
    "stem": "Tìm x biết: x + 25 = 60",
    "choices": [
     "85",
     "45",
     "35",
     "25"
    ],
    "answer": 2,
    "explanation": "x = 60 − 25 = 35.",
    "choiceFeedback": [
     "Sai — 85 là lấy tổng cộng với số hạng, phải trừ chứ không cộng.",
     "Sai — 45 là trừ nhầm, kiểm tra lại phép tính.",
     "Đúng — số hạng chưa biết = tổng − số hạng đã biết: 60−25=35.",
     "Sai — 25 là chép lại số hạng đã biết, chưa tìm x."
    ]
   },
   {
    "stem": "Tìm y biết: 90 − y = 36",
    "choices": [
     "126",
     "54",
     "44",
     "56"
    ],
    "answer": 1,
    "explanation": "y = 90 − 36 = 54.",
    "choiceFeedback": [
     "Sai — 126 là cộng nhầm 90+36, phải trừ.",
     "Đúng — số trừ chưa biết = số bị trừ − hiệu: 90−36=54.",
     "Sai — 44 là tính sai, kiểm tra lại phép trừ.",
     "Sai — 56 là trừ nhầm hàng chục."
    ]
   },
   {
    "stem": "5 × 6 = ?",
    "choices": [
     "35",
     "25",
     "56",
     "30"
    ],
    "answer": 3,
    "explanation": "5 × 6 = 30.",
    "choiceFeedback": [
     "Sai — 35 là 5×7, không phải 5×6.",
     "Sai — 25 là 5×5, thiếu một lần 5.",
     "Sai — 56 là ghép hai số 5 và 6 lại, không phải phép nhân.",
     "Đúng — 5×6=30."
    ]
   },
   {
    "stem": "Một hộp có 4 quả táo. Hỏi 5 hộp như thế có bao nhiêu quả táo?",
    "choices": [
     "20",
     "9",
     "16",
     "25"
    ],
    "answer": 0,
    "explanation": "5 hộp × 4 quả = 20 quả.",
    "choiceFeedback": [
     "Đúng — 4×5=20 quả.",
     "Sai — 9 là 4+5, đây là bài toán nhân chứ không phải cộng.",
     "Sai — 16 là 4×4, thiếu một hộp.",
     "Sai — 25 là 5×5, nhầm số quả trong hộp."
    ]
   },
   {
    "stem": "3 × 7 = ?",
    "choices": [
     "24",
     "21",
     "18",
     "37"
    ],
    "answer": 1,
    "explanation": "3 × 7 = 21.",
    "choiceFeedback": [
     "Sai — 24 là 3×8, dư một lần 3.",
     "Đúng — 3×7=21.",
     "Sai — 18 là 3×6, thiếu một lần 3.",
     "Sai — 37 là ghép số 3 và 7, không phải kết quả phép nhân."
    ]
   },
   {
    "stem": "Mỗi bàn học có 3 học sinh ngồi. Có 9 bàn như vậy. Hỏi có tất cả bao nhiêu học sinh?",
    "choices": [
     "12",
     "24",
     "27",
     "18"
    ],
    "answer": 2,
    "explanation": "3 × 9 = 27 học sinh.",
    "choiceFeedback": [
     "Sai — 12 là 3+9, phải nhân chứ không cộng.",
     "Sai — 24 là 3×8, thiếu một bàn.",
     "Đúng — 3 học sinh × 9 bàn = 27 học sinh.",
     "Sai — 18 là 3×6, thiếu ba bàn."
    ]
   },
   {
    "stem": "4 × 8 = ?",
    "choices": [
     "32",
     "36",
     "28",
     "48"
    ],
    "answer": 0,
    "explanation": "4 × 8 = 32.",
    "choiceFeedback": [
     "Đúng — 4×8=32.",
     "Sai — 36 là 4×9, dư một lần 4.",
     "Sai — 28 là 4×7, thiếu một lần 4.",
     "Sai — 48 là ghép số 4 và 8, không phải kết quả phép nhân."
    ]
   },
   {
    "stem": "Mỗi túi có 4 kẹo. Có 6 túi như vậy. Hỏi có tất cả bao nhiêu viên kẹo?",
    "choices": [
     "10",
     "20",
     "28",
     "24"
    ],
    "answer": 3,
    "explanation": "4 × 6 = 24 viên kẹo.",
    "choiceFeedback": [
     "Sai — 10 là 4+6, phải nhân chứ không cộng.",
     "Sai — 20 là 4×5, thiếu một túi.",
     "Sai — 28 là 4×7, dư một túi.",
     "Đúng — 4 kẹo × 6 túi = 24 viên kẹo."
    ]
   },
   {
    "stem": "Lớp 3A có 6 tổ, mỗi tổ có 5 bạn. Hỏi lớp 3A có bao nhiêu bạn?",
    "choices": [
     "11",
     "30",
     "36",
     "24"
    ],
    "answer": 1,
    "explanation": "6 × 5 = 30 bạn.",
    "choiceFeedback": [
     "Sai — 11 là 6+5, đây là bài toán nhân.",
     "Đúng — 6 tổ × 5 bạn = 30 bạn.",
     "Sai — 36 là 6×6, nhầm số bạn mỗi tổ.",
     "Sai — 24 là 6×4, thiếu một tổ."
    ]
   },
   {
    "stem": "Cô giáo có 45 quyển vở, chia đều cho 5 tổ. Hỏi mỗi tổ được bao nhiêu quyển vở?",
    "choices": [
     "8",
     "10",
     "9",
     "40"
    ],
    "answer": 2,
    "explanation": "45 : 5 = 9 quyển.",
    "choiceFeedback": [
     "Sai — 8 là tính thiếu, thử lại phép chia 45:5.",
     "Sai — 10×5=50 chứ không phải 45, chưa đúng.",
     "Đúng — 45 : 5 = 9 quyển vở mỗi tổ.",
     "Sai — 40 là 45 trừ 5, đây là bài toán chia chứ không phải trừ."
    ]
   },
   {
    "stem": "Có 24 cái bánh xếp đều vào các đĩa, mỗi đĩa 4 cái. Sau đó, mỗi bạn lấy 2 đĩa. Hỏi có thể chia đủ cho bao nhiêu bạn?",
    "choices": [
     "3",
     "6",
     "12",
     "2"
    ],
    "answer": 0,
    "explanation": "24 : 4 = 6 đĩa; 6 : 2 = 3 bạn.",
    "choiceFeedback": [
     "Đúng — 24:4=6 đĩa, rồi 6:2=3 bạn.",
     "Sai — 6 mới chỉ là số đĩa, chưa chia tiếp cho 2 đĩa mỗi bạn.",
     "Sai — 12 là 24:2, chưa tính đúng theo 2 bước của đề.",
     "Sai — 2 là tính thiếu bước, chưa nhân đủ số đĩa."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P3-exam-ck1": {
  "id": "P3-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 3",
  "questions": [
   {
    "stem": "Số gồm 7 chục và 4 đơn vị là số nào?",
    "choices": [
     "47",
     "740",
     "74",
     "407"
    ],
    "answer": 2,
    "explanation": "7 chục là 70, thêm 4 đơn vị → 74.",
    "choiceFeedback": [
     "Sai — 47 là đảo ngược chục và đơn vị, không đúng đề.",
     "Sai — 740 có thêm hàng trăm, quá lớn so với đề.",
     "Đúng — 7 chục là 70, thêm 4 đơn vị → 74.",
     "Sai — 407 có chữ số 0 xen giữa, không đúng cấu tạo số."
    ]
   },
   {
    "stem": "58 + 27 = ?",
    "choices": [
     "85",
     "75",
     "95",
     "76"
    ],
    "answer": 0,
    "explanation": "8 + 7 = 15 viết 5 nhớ 1; 5 + 2 + 1 = 8 → 85.",
    "choiceFeedback": [
     "Đúng — 8+7=15 viết 5 nhớ 1; 5+2+1=8 → 85.",
     "Sai — 75 là quên cộng nhớ 1 sang hàng chục.",
     "Sai — 95 là cộng dư 1 chục.",
     "Sai — 76 là tính sai cả hai hàng."
    ]
   },
   {
    "stem": "Mỗi đĩa có 5 quả cam. Có 4 đĩa như vậy. Hỏi có tất cả bao nhiêu quả cam?",
    "choices": [
     "9",
     "25",
     "16",
     "20"
    ],
    "answer": 3,
    "explanation": "5 × 4 = 20 quả.",
    "choiceFeedback": [
     "Sai — 9 là 5+4, đây là bài toán nhân.",
     "Sai — 25 là 5×5, dư một đĩa.",
     "Sai — 16 là 4×4, nhầm số quả mỗi đĩa.",
     "Đúng — 5 quả × 4 đĩa = 20 quả."
    ]
   },
   {
    "stem": "4 × 9 = ?",
    "choices": [
     "32",
     "36",
     "40",
     "49"
    ],
    "answer": 1,
    "explanation": "4 × 9 = 36.",
    "choiceFeedback": [
     "Sai — 32 là 4×8, thiếu một lần 4.",
     "Đúng — 4×9=36.",
     "Sai — 40 là 4×10, dư một lần 4.",
     "Sai — 49 là ghép số 4 và 9, không phải kết quả phép nhân."
    ]
   },
   {
    "stem": "20 : 4 = ?",
    "choices": [
     "4",
     "6",
     "5",
     "8"
    ],
    "answer": 2,
    "explanation": "20 : 4 = 5 vì 5 × 4 = 20.",
    "choiceFeedback": [
     "Sai — 4 là số chia, không phải thương.",
     "Sai — 6×4=24 chứ không phải 20, chưa đúng.",
     "Đúng — 20 : 4 = 5 vì 5×4=20.",
     "Sai — 8×4=32, quá lớn so với 20."
    ]
   },
   {
    "stem": "24 : 3 = ?",
    "choices": [
     "8",
     "7",
     "9",
     "6"
    ],
    "answer": 0,
    "explanation": "24 : 3 = 8 vì 8 × 3 = 24.",
    "choiceFeedback": [
     "Đúng — 24:3=8 vì 8×3=24.",
     "Sai — 7×3=21 chứ không phải 24.",
     "Sai — 9×3=27, quá lớn so với 24.",
     "Sai — 6×3=18, quá bé so với 24."
    ]
   },
   {
    "stem": "42 : 6 = ?",
    "choices": [
     "6",
     "8",
     "9",
     "7"
    ],
    "answer": 3,
    "explanation": "42 : 6 = 7 vì 7 × 6 = 42.",
    "choiceFeedback": [
     "Sai — 6×6=36 chứ không phải 42.",
     "Sai — 8×6=48, quá lớn so với 42.",
     "Sai — 9×6=54, quá lớn so với 42.",
     "Đúng — 42:6=7 vì 7×6=42."
    ]
   },
   {
    "stem": "Hình tròn được chia làm 4 phần bằng nhau, tô màu 1 phần. Phần tô màu là mấy phần hình tròn?",
    "choices": [
     "1/2",
     "1/4",
     "1/3",
     "1/5"
    ],
    "answer": 1,
    "explanation": "Chia 4 phần bằng nhau, tô 1 phần là 1/4 hình tròn.",
    "choiceFeedback": [
     "Sai — 1/2 là chia làm 2 phần bằng nhau, không đúng đề cho 4 phần.",
     "Đúng — chia 4 phần bằng nhau, tô 1 phần là 1/4 hình tròn.",
     "Sai — 1/3 ứng với chia 3 phần bằng nhau.",
     "Sai — 1/5 ứng với chia 5 phần bằng nhau."
    ]
   },
   {
    "stem": "7 × 6 = ?",
    "choices": [
     "35",
     "49",
     "42",
     "56"
    ],
    "answer": 2,
    "explanation": "7 × 6 = 42.",
    "choiceFeedback": [
     "Sai — 35 là 7×5, thiếu một lần 7.",
     "Sai — 49 là 7×7, dư một lần 7.",
     "Đúng — 7×6=42.",
     "Sai — 56 là 7×8, dư hai lần 7."
    ]
   },
   {
    "stem": "56 : 7 = ?",
    "choices": [
     "8",
     "7",
     "9",
     "6"
    ],
    "answer": 0,
    "explanation": "56 : 7 = 8 vì 8 × 7 = 56.",
    "choiceFeedback": [
     "Đúng — 56:7=8 vì 8×7=56.",
     "Sai — 7×7=49 chứ không phải 56.",
     "Sai — 9×7=63, quá lớn so với 56.",
     "Sai — 6×7=42, quá bé so với 56."
    ]
   },
   {
    "stem": "Số 6 gấp lên 5 lần được số nào?",
    "choices": [
     "11",
     "30",
     "25",
     "36"
    ],
    "answer": 1,
    "explanation": "Gấp 6 lên 5 lần là 6 × 5 = 30.",
    "choiceFeedback": [
     "Sai — 11 là 6+5, gấp lên nghĩa là nhân, không phải cộng.",
     "Đúng — gấp 6 lên 5 lần là 6×5=30.",
     "Sai — 25 là 5×5, nhầm số cần gấp.",
     "Sai — 36 là 6×6, nhầm số lần gấp."
    ]
   },
   {
    "stem": "Một đội có 8 bạn, mỗi bạn được phát 3 quyển vở. Hỏi đội đó cần tất cả bao nhiêu quyển vở?",
    "choices": [
     "11",
     "21",
     "16",
     "24"
    ],
    "answer": 3,
    "explanation": "8 × 3 = 24 quyển vở.",
    "choiceFeedback": [
     "Sai — 11 là 8+3, đây là bài toán nhân.",
     "Sai — 21 là 3×7, thiếu một bạn.",
     "Sai — 16 là 8×2, nhầm số vở mỗi bạn.",
     "Đúng — 8 bạn × 3 quyển = 24 quyển vở."
    ]
   },
   {
    "stem": "9 × 4 = ?",
    "choices": [
     "36",
     "32",
     "45",
     "40"
    ],
    "answer": 0,
    "explanation": "9 × 4 = 36.",
    "choiceFeedback": [
     "Đúng — 9×4=36.",
     "Sai — 32 là 8×4 hoặc 4×8, không phải 9×4.",
     "Sai — 45 là 9×5, dư một lần 9.",
     "Sai — 40 là 4×10, không đúng phép tính đề bài."
    ]
   },
   {
    "stem": "Một cửa hàng có 48 quyển sách. Buổi sáng bán được 12 quyển, buổi chiều bán tiếp 9 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển sách?",
    "choices": [
     "30",
     "21",
     "27",
     "36"
    ],
    "answer": 2,
    "explanation": "48 − 12 = 36 quyển, rồi 36 − 9 = 27 quyển còn lại.",
    "choiceFeedback": [
     "Sai — 30 là tính thiếu một bước, kiểm tra lại phép trừ thứ hai.",
     "Sai — 21 là trừ dư, kiểm tra lại phép tính.",
     "Đúng — 48−12=36 quyển, rồi 36−9=27 quyển còn lại.",
     "Sai — 36 mới là kết quả sau bước 1, chưa trừ tiếp 9 quyển buổi chiều."
    ]
   },
   {
    "stem": "Một xe tải chở 6 thùng hàng, mỗi thùng có 8 hộp. Người ta lấy ra 20 hộp để bán. Hỏi còn lại bao nhiêu hộp hàng trên xe?",
    "choices": [
     "20",
     "28",
     "48",
     "26"
    ],
    "answer": 1,
    "explanation": "6 × 8 = 48 hộp, sau khi bán 20 hộp còn 48 − 20 = 28 hộp.",
    "choiceFeedback": [
     "Sai — 20 là số hộp đã bán, chưa phải số còn lại.",
     "Đúng — 6×8=48 hộp, sau khi bán 20 hộp còn 48−20=28 hộp.",
     "Sai — 48 mới là tổng số hộp ban đầu, chưa trừ số đã bán.",
     "Sai — 26 là tính sai phép trừ, kiểm tra lại 48−20."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P3-exam-gk2": {
  "id": "P3-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 3",
  "questions": [
   {
    "stem": "Ba điểm A, B, C thẳng hàng nghĩa là gì?",
    "choices": [
     "Ba điểm cùng nằm trên một đường thẳng",
     "Ba điểm tạo thành một hình tam giác",
     "Ba điểm cách đều nhau",
     "Ba điểm nằm trên một đường tròn"
    ],
    "answer": 0,
    "explanation": "Ba điểm thẳng hàng là ba điểm cùng nằm trên một đường thẳng.",
    "choiceFeedback": [
     "Đúng — ba điểm thẳng hàng nghĩa là chúng cùng nằm trên một đường thẳng.",
     "Sai — nếu tạo thành tam giác thì ba điểm không thẳng hàng.",
     "Sai — thẳng hàng không yêu cầu khoảng cách bằng nhau.",
     "Sai — đây là đặc điểm của điểm trên đường tròn, không phải thẳng hàng."
    ]
   },
   {
    "stem": "Một đoạn thẳng có bao nhiêu điểm đầu mút?",
    "choices": [
     "1",
     "3",
     "2",
     "4"
    ],
    "answer": 2,
    "explanation": "Đoạn thẳng được giới hạn bởi 2 điểm đầu mút.",
    "choiceFeedback": [
     "Sai — 1 điểm chỉ là một điểm, chưa đủ tạo thành đoạn thẳng.",
     "Sai — đoạn thẳng chỉ có 2 đầu mút, không phải 3.",
     "Đúng — đoạn thẳng được giới hạn bởi 2 điểm đầu mút.",
     "Sai — 4 là số đỉnh của một tứ giác, không phải đoạn thẳng."
    ]
   },
   {
    "stem": "Góc vuông là góc như thế nào so với góc của ê-ke?",
    "choices": [
     "Góc lớn hơn góc của ê-ke",
     "Góc bằng góc của ê-ke",
     "Góc bé hơn góc của ê-ke",
     "Góc bằng 2 lần góc của ê-ke"
    ],
    "answer": 1,
    "explanation": "Góc vuông là góc bằng đúng góc của ê-ke.",
    "choiceFeedback": [
     "Sai — góc lớn hơn góc ê-ke là góc tù, không phải góc vuông.",
     "Đúng — góc vuông là góc bằng đúng góc của ê-ke.",
     "Sai — góc bé hơn góc ê-ke là góc nhọn, không phải góc vuông.",
     "Sai — không có khái niệm góc bằng 2 lần góc ê-ke trong bài học này."
    ]
   },
   {
    "stem": "Hình tứ giác có bao nhiêu cạnh?",
    "choices": [
     "2",
     "3",
     "5",
     "4"
    ],
    "answer": 3,
    "explanation": "Hình tứ giác có 4 cạnh và 4 đỉnh.",
    "choiceFeedback": [
     "Sai — 2 cạnh chỉ là một đoạn gấp khúc, chưa phải tứ giác.",
     "Sai — 3 cạnh là hình tam giác, không phải tứ giác.",
     "Sai — 5 cạnh là hình ngũ giác.",
     "Đúng — hình tứ giác có 4 cạnh và 4 đỉnh."
    ]
   },
   {
    "stem": "Hình tam giác có 3 cạnh lần lượt là 5cm, 6cm, 7cm. Chu vi hình tam giác là?",
    "choices": [
     "18 cm",
     "17 cm",
     "19 cm",
     "16 cm"
    ],
    "answer": 0,
    "explanation": "Chu vi = 5 + 6 + 7 = 18 cm.",
    "choiceFeedback": [
     "Đúng — chu vi = 5+6+7=18 cm.",
     "Sai — 17 cm là cộng thiếu, kiểm tra lại phép cộng ba cạnh.",
     "Sai — 19 cm là cộng dư, kiểm tra lại phép cộng.",
     "Sai — 16 cm là tính thiếu một cạnh."
    ]
   },
   {
    "stem": "Hình tứ giác có 4 cạnh đều bằng 4cm. Chu vi hình đó là?",
    "choices": [
     "12 cm",
     "20 cm",
     "16 cm",
     "8 cm"
    ],
    "answer": 2,
    "explanation": "Chu vi = 4 × 4 = 16 cm.",
    "choiceFeedback": [
     "Sai — 12 cm là chỉ cộng 3 cạnh, thiếu một cạnh.",
     "Sai — 20 cm là cộng dư một cạnh.",
     "Đúng — chu vi = 4×4=16 cm.",
     "Sai — 8 cm là chỉ tính 2 cạnh."
    ]
   },
   {
    "stem": "Hình chữ nhật có chiều dài 8cm, chiều rộng 5cm. Chu vi hình chữ nhật là?",
    "choices": [
     "13 cm",
     "26 cm",
     "40 cm",
     "21 cm"
    ],
    "answer": 1,
    "explanation": "Chu vi = (8 + 5) × 2 = 26 cm.",
    "choiceFeedback": [
     "Sai — 13 cm mới là tổng chiều dài và chiều rộng, chưa nhân đôi.",
     "Đúng — chu vi = (8+5)×2=26 cm.",
     "Sai — 40 cm là 8×5, đây là công thức tính diện tích chứ không phải chu vi.",
     "Sai — 21 cm là tính thiếu, kiểm tra lại công thức chu vi hình chữ nhật."
    ]
   },
   {
    "stem": "Hình vuông có cạnh 6cm. Chu vi hình vuông là?",
    "choices": [
     "24 cm",
     "12 cm",
     "36 cm",
     "18 cm"
    ],
    "answer": 0,
    "explanation": "Chu vi hình vuông = cạnh × 4 = 6 × 4 = 24 cm.",
    "choiceFeedback": [
     "Đúng — chu vi hình vuông = cạnh×4 = 6×4=24 cm.",
     "Sai — 12 cm là 6×2, thiếu số lần nhân.",
     "Sai — 36 cm là 6×6, đây là công thức diện tích chứ không phải chu vi.",
     "Sai — 18 cm là 6×3, thiếu một cạnh."
    ]
   },
   {
    "stem": "Số 4826 gồm mấy chữ số?",
    "choices": [
     "2",
     "3",
     "5",
     "4"
    ],
    "answer": 3,
    "explanation": "4826 có 4 chữ số: 4, 8, 2, 6.",
    "choiceFeedback": [
     "Sai — 2 là số chữ số của một số có hai chữ số, không đúng với 4826.",
     "Sai — 3 là số chữ số của số có ba chữ số.",
     "Sai — 5 là số chữ số của một số lớn hơn 4826.",
     "Đúng — 4826 có 4 chữ số: 4, 8, 2, 6."
    ]
   },
   {
    "stem": "So sánh: 5 328 và 5 382. Số nào lớn hơn?",
    "choices": [
     "5 328",
     "Hai số bằng nhau",
     "5 382",
     "Không so sánh được"
    ],
    "answer": 2,
    "explanation": "Hàng nghìn, trăm bằng nhau; hàng chục 8 > 2 nên 5 382 > 5 328.",
    "choiceFeedback": [
     "Sai — 5 328 có hàng chục là 2, bé hơn 5 382 có hàng chục là 8.",
     "Sai — hai số khác nhau ở hàng chục nên không thể bằng nhau.",
     "Đúng — hàng nghìn, trăm bằng nhau; hàng chục 8 > 2 nên 5 382 > 5 328.",
     "Sai — hai số có cùng số chữ số nên hoàn toàn so sánh được."
    ]
   },
   {
    "stem": "2 350 + 1 420 = ?",
    "choices": [
     "3670",
     "3770",
     "3870",
     "3760"
    ],
    "answer": 1,
    "explanation": "Cộng theo từng hàng: 0+0=0; 5+2=7; 3+4=7; 2+1=3 → 3770.",
    "choiceFeedback": [
     "Sai — 3670 là cộng thiếu ở hàng trăm.",
     "Đúng — cộng theo từng hàng: 0+0=0; 5+2=7; 3+4=7; 2+1=3 → 3770.",
     "Sai — 3870 là cộng dư ở hàng trăm.",
     "Sai — 3760 là tính sai hàng chục."
    ]
   },
   {
    "stem": "Một trường có 3 245 học sinh nam và 2 618 học sinh nữ. Hỏi trường đó có tất cả bao nhiêu học sinh?",
    "choices": [
     "5 863",
     "5 763",
     "5 963",
     "5 853"
    ],
    "answer": 0,
    "explanation": "3 245 + 2 618 = 5 863.",
    "choiceFeedback": [
     "Đúng — 3 245+2 618=5 863.",
     "Sai — 5 763 là cộng thiếu 100, kiểm tra lại hàng trăm.",
     "Sai — 5 963 là cộng dư 100.",
     "Sai — 5 853 là tính sai hàng chục."
    ]
   },
   {
    "stem": "Kho có 6 500 quyển sách, đã chuyển đi 2 385 quyển. Hỏi kho còn lại bao nhiêu quyển sách?",
    "choices": [
     "4 215",
     "4 015",
     "3 115",
     "4 115"
    ],
    "answer": 3,
    "explanation": "6 500 − 2 385 = 4 115 quyển sách còn lại.",
    "choiceFeedback": [
     "Sai — 4 215 là trừ thiếu ở hàng chục.",
     "Sai — 4 015 là trừ dư ở hàng trăm.",
     "Sai — 3 115 là trừ dư ở hàng nghìn.",
     "Đúng — 6 500 − 2 385 = 4 115 quyển sách còn lại."
    ]
   },
   {
    "stem": "234 × 3 = ?",
    "choices": [
     "602",
     "692",
     "702",
     "712"
    ],
    "answer": 2,
    "explanation": "4×3=12 viết 2 nhớ 1; 3×3+1=10 viết 0 nhớ 1; 2×3+1=7 → 702.",
    "choiceFeedback": [
     "Sai — 602 là quên nhớ ở hàng trăm.",
     "Sai — 692 là tính sai hàng chục.",
     "Đúng — 4×3=12 (viết 2 nhớ 1); 3×3+1=10 (viết 0 nhớ 1); 2×3+1=7 → 702.",
     "Sai — 712 là cộng dư nhớ ở hàng trăm."
    ]
   },
   {
    "stem": "Có 936 quyển vở chia đều cho 3 lớp. Hỏi mỗi lớp được bao nhiêu quyển vở?",
    "choices": [
     "302",
     "312",
     "322",
     "310"
    ],
    "answer": 1,
    "explanation": "9:3=3 (trăm); 3:3=1 (chục); 6:3=2 (đơn vị) → 312.",
    "choiceFeedback": [
     "Sai — 302 là chia thiếu ở hàng chục, kiểm tra lại 3:3.",
     "Đúng — 9:3=3 (trăm), 3:3=1 (chục), 6:3=2 (đơn vị) → 312.",
     "Sai — 322 là chia sai hàng đơn vị.",
     "Sai — 310 là quên chia hàng đơn vị, kiểm tra lại 6:3."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P3-exam-ck2": {
  "id": "P3-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 3",
  "questions": [
   {
    "stem": "Trong hình vẽ có 3 điểm M, N, P không cùng nằm trên một đường thẳng. Ba điểm đó có thẳng hàng không?",
    "choices": [
     "Có, vì cả 3 đều là điểm",
     "Không, vì chúng không cùng nằm trên một đường thẳng",
     "Có, vì chúng tạo thành đoạn thẳng",
     "Không thể xác định được"
    ],
    "answer": 1,
    "explanation": "Ba điểm thẳng hàng phải cùng nằm trên một đường thẳng; ở đây ba điểm không cùng nằm trên một đường thẳng nên không thẳng hàng.",
    "choiceFeedback": [
     "Sai — là điểm không đồng nghĩa với thẳng hàng.",
     "Đúng — ba điểm thẳng hàng phải cùng nằm trên một đường thẳng, ở đây thì không.",
     "Sai — ba điểm không thẳng hàng thì tạo thành hình tam giác, không phải đoạn thẳng.",
     "Sai — đề đã cho biết rõ 3 điểm không cùng nằm trên một đường thẳng nên xác định được là không thẳng hàng."
    ]
   },
   {
    "stem": "Hình nào sau đây có 4 góc vuông và 4 cạnh bằng nhau?",
    "choices": [
     "Hình chữ nhật",
     "Hình tam giác",
     "Hình vuông",
     "Hình tứ giác thường"
    ],
    "answer": 2,
    "explanation": "Hình vuông có 4 góc vuông và 4 cạnh bằng nhau.",
    "choiceFeedback": [
     "Sai — hình chữ nhật có 4 góc vuông nhưng các cạnh không nhất thiết bằng nhau.",
     "Sai — hình tam giác chỉ có 3 góc, không có góc vuông cố định.",
     "Đúng — hình vuông có 4 góc vuông và 4 cạnh bằng nhau.",
     "Sai — tứ giác thường không có tính chất các góc đều vuông."
    ]
   },
   {
    "stem": "Hình chữ nhật có chiều dài 12cm, chiều rộng 7cm. Chu vi hình đó là?",
    "choices": [
     "19 cm",
     "84 cm",
     "36 cm",
     "38 cm"
    ],
    "answer": 3,
    "explanation": "Chu vi = (12 + 7) × 2 = 38 cm.",
    "choiceFeedback": [
     "Sai — 19 cm mới là tổng chiều dài và rộng, chưa nhân đôi.",
     "Sai — 84 cm là 12×7, đây là công thức diện tích chứ không phải chu vi.",
     "Sai — 36 cm là tính thiếu, kiểm tra lại phép nhân với 2.",
     "Đúng — chu vi = (12+7)×2=38 cm."
    ]
   },
   {
    "stem": "Số liền sau của 6 999 là số nào?",
    "choices": [
     "7 000",
     "6 998",
     "7 099",
     "6 900"
    ],
    "answer": 0,
    "explanation": "6 999 + 1 = 7 000 (đổi hết các hàng vì đều là 9).",
    "choiceFeedback": [
     "Đúng — 6 999+1=7 000 (đổi hết các hàng vì đều là 9).",
     "Sai — 6 998 là số liền trước, không phải liền sau.",
     "Sai — 7 099 là cộng nhầm, không đúng quy tắc đổi hàng.",
     "Sai — 6 900 bé hơn 6 999, không thể là số liền sau."
    ]
   },
   {
    "stem": "4 128 + 3 654 = ?",
    "choices": [
     "7672",
     "7782",
     "7892",
     "7772"
    ],
    "answer": 1,
    "explanation": "8+4=12 viết 2 nhớ 1; 2+5+1=8; 1+6=7; 4+3=7 → 7782.",
    "choiceFeedback": [
     "Sai — 7672 là cộng thiếu ở hàng trăm.",
     "Đúng — cộng lần lượt từng hàng có nhớ: 8+4=12 (viết 2 nhớ 1); 2+5+1=8; 1+6=7; 4+3=7 → 7782.",
     "Sai — 7892 là cộng dư ở hàng trăm.",
     "Sai — 7772 là tính sai hàng chục."
    ]
   },
   {
    "stem": "8 004 − 2 758 = ?",
    "choices": [
     "5346",
     "5156",
     "5246",
     "5254"
    ],
    "answer": 2,
    "explanation": "8 004 − 2 758 = 5 246 (kiểm tra: 5246 + 2758 = 8004).",
    "choiceFeedback": [
     "Sai — 5346 là trừ dư ở hàng trăm.",
     "Sai — 5156 là trừ thiếu ở hàng trăm.",
     "Đúng — 8 004 − 2 758 = 5 246 (kiểm tra: 5246+2758=8004).",
     "Sai — 5254 là tính sai hàng chục."
    ]
   },
   {
    "stem": "1 ki-lô-gam bằng bao nhiêu gam?",
    "choices": [
     "1000 g",
     "100 g",
     "10 g",
     "10000 g"
    ],
    "answer": 0,
    "explanation": "1 kg = 1000 g.",
    "choiceFeedback": [
     "Đúng — 1 kg = 1000 g.",
     "Sai — 100 g chỉ bằng 1/10 kg.",
     "Sai — 10 g quá nhỏ so với 1 kg.",
     "Sai — 10000 g bằng 10 kg, không phải 1 kg."
    ]
   },
   {
    "stem": "Một bao gạo nặng 25kg. Mẹ mua 3 bao như vậy. Hỏi mẹ mua tất cả bao nhiêu ki-lô-gam gạo?",
    "choices": [
     "28 kg",
     "50 kg",
     "75 kg",
     "60 kg"
    ],
    "answer": 2,
    "explanation": "25 kg × 3 = 75 kg.",
    "choiceFeedback": [
     "Sai — 28 kg là 25+3, đây là bài toán nhân chứ không phải cộng.",
     "Sai — 50 kg là 25×2, thiếu một bao.",
     "Đúng — 25 kg × 3 bao = 75 kg.",
     "Sai — 60 kg là tính nhầm, kiểm tra lại phép nhân 25×3."
    ]
   },
   {
    "stem": "1 lít bằng bao nhiêu mi-li-lít?",
    "choices": [
     "100 ml",
     "1000 ml",
     "10 ml",
     "10000 ml"
    ],
    "answer": 1,
    "explanation": "1 lít = 1000 ml.",
    "choiceFeedback": [
     "Sai — 100 ml chỉ bằng 1/10 lít.",
     "Đúng — 1 lít = 1000 ml.",
     "Sai — 10 ml quá nhỏ so với 1 lít.",
     "Sai — 10000 ml bằng 10 lít, không phải 1 lít."
    ]
   },
   {
    "stem": "Một bình chứa 2 lít nước, rót thêm 500ml nữa. Hỏi bình có tất cả bao nhiêu mi-li-lít nước?",
    "choices": [
     "700 ml",
     "2000 ml",
     "700 lít",
     "2500 ml"
    ],
    "answer": 3,
    "explanation": "2 lít = 2000 ml; 2000 + 500 = 2500 ml.",
    "choiceFeedback": [
     "Sai — 700 ml là cộng nhầm 2+500 mà quên đổi đơn vị lít sang ml.",
     "Sai — 2000 ml mới là lượng nước ban đầu, chưa cộng thêm 500ml.",
     "Sai — đơn vị lít không đúng với phép cộng vừa thực hiện.",
     "Đúng — 2 lít = 2000 ml; 2000 + 500 = 2500 ml."
    ]
   },
   {
    "stem": "Nam có 2 tờ 10 000 đồng và 1 tờ 5 000 đồng. Hỏi Nam có tất cả bao nhiêu tiền?",
    "choices": [
     "25 000 đồng",
     "20 000 đồng",
     "15 000 đồng",
     "30 000 đồng"
    ],
    "answer": 0,
    "explanation": "10 000 × 2 = 20 000, cộng thêm 5 000 → 25 000 đồng.",
    "choiceFeedback": [
     "Đúng — 10 000×2=20 000, cộng thêm 5 000 → 25 000 đồng.",
     "Sai — 20 000 đồng mới chỉ tính 2 tờ 10 000, còn thiếu tờ 5 000.",
     "Sai — 15 000 đồng là tính thiếu một tờ 10 000.",
     "Sai — 30 000 đồng là cộng dư, kiểm tra lại số tiền từng tờ."
    ]
   },
   {
    "stem": "Đồng hồ chỉ 3 giờ 15 phút. Sau 30 phút nữa là mấy giờ?",
    "choices": [
     "4 giờ 15 phút",
     "3 giờ 30 phút",
     "3 giờ 45 phút",
     "4 giờ 45 phút"
    ],
    "answer": 2,
    "explanation": "3 giờ 15 phút + 30 phút = 3 giờ 45 phút.",
    "choiceFeedback": [
     "Sai — 4 giờ 15 phút là cộng dư 1 giờ, không đúng với 30 phút thêm vào.",
     "Sai — 3 giờ 30 phút mới là cộng thêm 15 phút, chưa đủ 30 phút.",
     "Đúng — 3 giờ 15 phút + 30 phút = 3 giờ 45 phút.",
     "Sai — 4 giờ 45 phút là cộng dư 1 giờ so với đề bài."
    ]
   },
   {
    "stem": "Tháng 4 có bao nhiêu ngày?",
    "choices": [
     "31 ngày",
     "30 ngày",
     "28 ngày",
     "29 ngày"
    ],
    "answer": 1,
    "explanation": "Tháng 4 có 30 ngày.",
    "choiceFeedback": [
     "Sai — 31 ngày là số ngày của tháng 3 hoặc tháng 5, không phải tháng 4.",
     "Đúng — tháng 4 có 30 ngày.",
     "Sai — 28 ngày là số ngày của tháng 2 (năm không nhuận).",
     "Sai — 29 ngày là số ngày của tháng 2 trong năm nhuận."
    ]
   },
   {
    "stem": "Một ô tô đi từ A đến B dài 45km, rồi đi tiếp từ B đến C dài 38km. Hỏi quãng đường từ A đến C dài bao nhiêu ki-lô-mét?",
    "choices": [
     "83 km",
     "73 km",
     "93 km",
     "7 km"
    ],
    "answer": 0,
    "explanation": "45 km + 38 km = 83 km.",
    "choiceFeedback": [
     "Đúng — 45 km + 38 km = 83 km.",
     "Sai — 73 km là cộng thiếu, kiểm tra lại phép cộng hàng chục.",
     "Sai — 93 km là cộng dư, kiểm tra lại phép tính.",
     "Sai — 7 km là kết quả phép trừ, đề bài yêu cầu cộng quãng đường."
    ]
   },
   {
    "stem": "Có 3 chiếc hộp dạng hình lập phương, mỗi hộp có cạnh 4cm, xếp liền nhau thành một hàng. Hỏi độ dài của cả hàng là bao nhiêu xăng-ti-mét?",
    "choices": [
     "4 cm",
     "7 cm",
     "12 cm",
     "16 cm"
    ],
    "answer": 2,
    "explanation": "3 hộp × 4 cm = 12 cm.",
    "choiceFeedback": [
     "Sai — 4 cm chỉ là cạnh của một hộp, đề hỏi độ dài cả hàng 3 hộp.",
     "Sai — 7 cm là 4+3, đây là bài toán nhân số hộp với cạnh chứ không cộng với số hộp.",
     "Đúng — 3 hộp × 4 cm = 12 cm.",
     "Sai — 16 cm là 4×4, nhầm số hộp xếp liền nhau (đề bài có 3 hộp, không phải 4)."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
