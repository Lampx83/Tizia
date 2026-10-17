// P1 — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P1_EXAMS = {
 "P1-exam-gk1": {
  "id": "P1-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 1",
  "kind": "quiz",
  "yearLevel": 1,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 1",
  "questions": [
   {
    "stem": "Quyển sách nằm TRÊN bàn. Vậy bàn ở vị trí nào so với quyển sách?",
    "choices": [
     "Bàn ở dưới quyển sách",
     "Bàn ở trên quyển sách",
     "Bàn ở bên trái quyển sách",
     "Bàn ở bên phải quyển sách"
    ],
    "answer": 0,
    "explanation": "Sách ở trên bàn nên bàn ở dưới sách.",
    "choiceFeedback": [
     "Đúng — bàn ở dưới quyển sách.",
     "Sai — sách mới ở trên bàn, không phải bàn ở trên sách.",
     "Sai — đề không nói về bên trái.",
     "Sai — đề không nói về bên phải."
    ]
   },
   {
    "stem": "Đếm: ● ● ● — Có mấy chấm?",
    "choices": [
     "2",
     "3",
     "4",
     "5"
    ],
    "answer": 1,
    "explanation": "Có 3 chấm tròn.",
    "choiceFeedback": [
     "Sai — đếm lại, có 3 chấm.",
     "Đúng — có 3 chấm.",
     "Sai — nhiều hơn số chấm thật.",
     "Sai — nhiều hơn số chấm thật."
    ]
   },
   {
    "stem": "Số liền trước của 5 là?",
    "choices": [
     "6",
     "5",
     "3",
     "4"
    ],
    "answer": 3,
    "explanation": "Số liền trước của 5 là 4.",
    "choiceFeedback": [
     "Sai — 6 là liền sau của 5.",
     "Sai — 5 chính là số đề bài.",
     "Sai — 3 là liền trước của 4, không phải của 5.",
     "Đúng — 4 liền trước 5."
    ]
   },
   {
    "stem": "Số 5 NHIỀU HƠN số nào?",
    "choices": [
     "6",
     "3",
     "7",
     "8"
    ],
    "answer": 1,
    "explanation": "5 lớn hơn 3 (5 > 3).",
    "choiceFeedback": [
     "Sai — 6 lớn hơn 5.",
     "Đúng — 5 lớn hơn 3.",
     "Sai — 7 lớn hơn 5.",
     "Sai — 8 lớn hơn 5."
    ]
   },
   {
    "stem": "Số 10 gồm mấy chục và mấy đơn vị?",
    "choices": [
     "0 chục 1 đơn vị",
     "1 chục 1 đơn vị",
     "1 chục 0 đơn vị",
     "2 chục 0 đơn vị"
    ],
    "answer": 2,
    "explanation": "10 = 1 chục và 0 đơn vị.",
    "choiceFeedback": [
     "Sai — 10 không phải 1 đơn vị.",
     "Sai — 10 không có đơn vị lẻ.",
     "Đúng — 10 gồm 1 chục 0 đơn vị.",
     "Sai — 2 chục là 20, không phải 10."
    ]
   },
   {
    "stem": "4 − 4 = ?",
    "choices": [
     "0",
     "1",
     "4",
     "8"
    ],
    "answer": 0,
    "explanation": "4 trừ 4 bằng 0.",
    "choiceFeedback": [
     "Đúng — 4 − 4 = 0.",
     "Sai — tính lại phép trừ.",
     "Sai — đó là số bị trừ, chưa trừ.",
     "Sai — quá lớn so với kết quả đúng."
    ]
   },
   {
    "stem": "10 … 7 — điền dấu thích hợp",
    "choices": [
     "<",
     "=",
     ">",
     "Không so sánh được"
    ],
    "answer": 2,
    "explanation": "10 lớn hơn 7 nên điền dấu >.",
    "choiceFeedback": [
     "Sai — 10 không bé hơn 7.",
     "Sai — 10 và 7 không bằng nhau.",
     "Đúng — 10 > 7.",
     "Sai — hai số này so sánh được."
    ]
   },
   {
    "stem": "Mặt đồng hồ treo tường thường có dạng hình gì?",
    "choices": [
     "Hình vuông",
     "Hình tam giác",
     "Hình chữ nhật",
     "Hình tròn"
    ],
    "answer": 3,
    "explanation": "Mặt đồng hồ treo tường thường là hình tròn.",
    "choiceFeedback": [
     "Sai — đồng hồ tròn thường gặp hơn.",
     "Sai — mặt đồng hồ không có góc nhọn.",
     "Sai — không phải hình chữ nhật.",
     "Đúng — hình tròn."
    ]
   },
   {
    "stem": "Quả bóng lăn TỪ TRÊN xuống. Vậy bóng đi theo chiều nào?",
    "choices": [
     "Từ trái sang phải",
     "Từ dưới lên trên",
     "Từ phải sang trái",
     "Từ trên xuống dưới"
    ],
    "answer": 3,
    "explanation": "Bóng lăn từ trên xuống nên đi theo chiều từ trên xuống dưới.",
    "choiceFeedback": [
     "Sai — đề không nói ngang.",
     "Sai — ngược chiều với đề bài.",
     "Sai — đề không nói ngang.",
     "Đúng — bóng đi từ trên xuống dưới."
    ]
   },
   {
    "stem": "2 … 4 — điền dấu thích hợp",
    "choices": [
     ">",
     "=",
     "<",
     "Không có dấu nào đúng"
    ],
    "answer": 2,
    "explanation": "2 bé hơn 4 nên điền dấu <.",
    "choiceFeedback": [
     "Sai — 2 không lớn hơn 4.",
     "Sai — 2 và 4 không bằng nhau.",
     "Đúng — 2 < 4.",
     "Sai — dấu < là đúng."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P1-exam-ck1": {
  "id": "P1-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 1",
  "kind": "quiz",
  "yearLevel": 1,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 1",
  "questions": [
   {
    "stem": "3 + 3 = ?",
    "choices": [
     "6",
     "5",
     "7",
     "8"
    ],
    "answer": 0,
    "explanation": "3 cộng 3 bằng 6.",
    "choiceFeedback": [
     "Đúng — 3+3=6.",
     "Sai — tính lại.",
     "Sai — quá lớn.",
     "Sai — quá lớn."
    ]
   },
   {
    "stem": "6 + 3 = ?",
    "choices": [
     "8",
     "9",
     "7",
     "10"
    ],
    "answer": 1,
    "explanation": "6 cộng 3 bằng 9.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Đúng — 6+3=9.",
     "Sai — tính lại.",
     "Sai — 6+4 mới bằng 10."
    ]
   },
   {
    "stem": "6 − 3 = ?",
    "choices": [
     "2",
     "9",
     "3",
     "4"
    ],
    "answer": 2,
    "explanation": "6 trừ 3 bằng 3.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Sai — đó là 6+3, không phải 6−3.",
     "Đúng — 6−3=3.",
     "Sai — tính lại."
    ]
   },
   {
    "stem": "10 − 3 = ?",
    "choices": [
     "6",
     "8",
     "13",
     "7"
    ],
    "answer": 3,
    "explanation": "10 trừ 3 bằng 7.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Sai — đó là 10+3, không phải 10−3.",
     "Đúng — 10−3=7."
    ]
   },
   {
    "stem": "3 + 4 − 2 = ?",
    "choices": [
     "5",
     "4",
     "6",
     "9"
    ],
    "answer": 0,
    "explanation": "3+4=7, 7−2=5.",
    "choiceFeedback": [
     "Đúng — 3+4−2=5.",
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Sai — đó là 3+4, chưa trừ 2."
    ]
   },
   {
    "stem": "20 gồm mấy chục?",
    "choices": [
     "1 chục",
     "2 chục",
     "3 chục",
     "4 chục"
    ],
    "answer": 1,
    "explanation": "20 = 2 chục.",
    "choiceFeedback": [
     "Sai — 1 chục là 10.",
     "Đúng — 20 gồm 2 chục.",
     "Sai — 3 chục là 30.",
     "Sai — 4 chục là 40."
    ]
   },
   {
    "stem": "Số 15 gồm 1 chục và mấy đơn vị?",
    "choices": [
     "3 đơn vị",
     "4 đơn vị",
     "5 đơn vị",
     "6 đơn vị"
    ],
    "answer": 2,
    "explanation": "15 = 1 chục + 5 đơn vị.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Đúng — 15 gồm 1 chục 5 đơn vị.",
     "Sai — 16 mới có 6 đơn vị."
    ]
   },
   {
    "stem": "5 cm + 3 cm = ?",
    "choices": [
     "7 cm",
     "9 cm",
     "2 cm",
     "8 cm"
    ],
    "answer": 3,
    "explanation": "5 cm cộng 3 cm bằng 8 cm.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Sai — đó là phép trừ, không phải cộng.",
     "Đúng — 5cm+3cm=8cm."
    ]
   },
   {
    "stem": "3 + … = 7. Điền số?",
    "choices": [
     "4",
     "3",
     "5",
     "10"
    ],
    "answer": 0,
    "explanation": "3 + 4 = 7 nên số cần điền là 4.",
    "choiceFeedback": [
     "Đúng — 3+4=7.",
     "Sai — 3+3=6, chưa đủ 7.",
     "Sai — 3+5=8, quá 7.",
     "Sai — quá lớn."
    ]
   },
   {
    "stem": "Có 5 con vịt, thêm 3 con. Tất cả?",
    "choices": [
     "7",
     "8",
     "9",
     "2"
    ],
    "answer": 1,
    "explanation": "5 con vịt thêm 3 con là 5+3=8 con.",
    "choiceFeedback": [
     "Sai — tính lại 5+3.",
     "Đúng — 5+3=8 con.",
     "Sai — tính lại.",
     "Sai — đó là 5−3, không phải cộng."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P1-exam-gk2": {
  "id": "P1-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 1",
  "kind": "quiz",
  "yearLevel": 1,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 1",
  "questions": [
   {
    "stem": "Số 35 gồm mấy chục mấy đơn vị?",
    "choices": [
     "3 chục 5 đơn vị",
     "5 chục 3 đơn vị",
     "3 chục 0 đơn vị",
     "4 chục 5 đơn vị"
    ],
    "answer": 0,
    "explanation": "35 = 3 chục và 5 đơn vị.",
    "choiceFeedback": [
     "Đúng — 35 gồm 3 chục 5 đơn vị.",
     "Sai — nhầm giữa chục và đơn vị.",
     "Sai — thiếu đơn vị.",
     "Sai — 3 chục không phải 4 chục."
    ]
   },
   {
    "stem": "Số lớn nhất có 2 chữ số là?",
    "choices": [
     "100",
     "99",
     "90",
     "98"
    ],
    "answer": 1,
    "explanation": "99 là số lớn nhất có 2 chữ số.",
    "choiceFeedback": [
     "Sai — 100 có 3 chữ số.",
     "Đúng — 99 là số lớn nhất có 2 chữ số.",
     "Sai — 90 chưa phải lớn nhất.",
     "Sai — 98 chưa phải lớn nhất."
    ]
   },
   {
    "stem": "Số liền sau của 99 là?",
    "choices": [
     "98",
     "101",
     "100",
     "90"
    ],
    "answer": 2,
    "explanation": "100 liền sau 99.",
    "choiceFeedback": [
     "Sai — 98 là liền trước của 99.",
     "Sai — 101 liền sau của 100.",
     "Đúng — 100 liền sau 99.",
     "Sai — quá nhỏ."
    ]
   },
   {
    "stem": "Tết cổ truyền Việt Nam vào tháng nào âm lịch?",
    "choices": [
     "Tháng 12",
     "Tháng 3",
     "Tháng 6",
     "Tháng Giêng (tháng 1)"
    ],
    "answer": 3,
    "explanation": "Tết cổ truyền diễn ra vào tháng Giêng (tháng 1) âm lịch.",
    "choiceFeedback": [
     "Sai — Tết không phải tháng 12 âm lịch.",
     "Sai — không đúng.",
     "Sai — không đúng.",
     "Đúng — Tết vào tháng Giêng âm lịch."
    ]
   },
   {
    "stem": "43 + 26 = ?",
    "choices": [
     "69",
     "59",
     "79",
     "67"
    ],
    "answer": 0,
    "explanation": "43+26=69 (3+6=9, 4+2=6).",
    "choiceFeedback": [
     "Đúng — 43+26=69.",
     "Sai — tính lại hàng chục.",
     "Sai — tính lại.",
     "Sai — tính lại hàng đơn vị."
    ]
   },
   {
    "stem": "58 − 24 = ?",
    "choices": [
     "44",
     "34",
     "24",
     "36"
    ],
    "answer": 1,
    "explanation": "58−24=34.",
    "choiceFeedback": [
     "Sai — tính lại hàng chục.",
     "Đúng — 58−24=34.",
     "Sai — tính lại.",
     "Sai — tính lại hàng đơn vị."
    ]
   },
   {
    "stem": "45 + 14 = ?",
    "choices": [
     "49",
     "69",
     "59",
     "58"
    ],
    "answer": 2,
    "explanation": "45+14=59.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Đúng — 45+14=59.",
     "Sai — tính lại hàng đơn vị."
    ]
   },
   {
    "stem": "Dụng cụ vẽ đoạn thẳng là?",
    "choices": [
     "Bút chì",
     "Compa",
     "Tẩy",
     "Thước kẻ"
    ],
    "answer": 3,
    "explanation": "Thước kẻ dùng để vẽ đoạn thẳng thẳng và đúng độ dài.",
    "choiceFeedback": [
     "Sai — bút chì để viết, cần thước để vẽ thẳng.",
     "Sai — compa dùng vẽ hình tròn.",
     "Sai — tẩy dùng để xoá.",
     "Đúng — thước kẻ dùng để vẽ đoạn thẳng."
    ]
   },
   {
    "stem": "Một tuần có mấy ngày?",
    "choices": [
     "7",
     "5",
     "6",
     "8"
    ],
    "answer": 0,
    "explanation": "Một tuần có 7 ngày.",
    "choiceFeedback": [
     "Đúng — một tuần có 7 ngày.",
     "Sai — ít hơn số ngày thật.",
     "Sai — ít hơn số ngày thật.",
     "Sai — nhiều hơn số ngày thật."
    ]
   },
   {
    "stem": "Sau Thứ Hai là?",
    "choices": [
     "Chủ Nhật",
     "Thứ Ba",
     "Thứ Tư",
     "Thứ Sáu"
    ],
    "answer": 1,
    "explanation": "Sau Thứ Hai là Thứ Ba.",
    "choiceFeedback": [
     "Sai — Chủ Nhật là trước Thứ Hai.",
     "Đúng — sau Thứ Hai là Thứ Ba.",
     "Sai — Thứ Tư là sau Thứ Ba.",
     "Sai — quá xa."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P1-exam-ck2": {
  "id": "P1-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 1",
  "kind": "quiz",
  "yearLevel": 1,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 1",
  "questions": [
   {
    "stem": "Số 78 gồm mấy chục mấy đơn vị?",
    "choices": [
     "7 chục 8 đơn vị",
     "8 chục 7 đơn vị",
     "7 chục 0 đơn vị",
     "6 chục 8 đơn vị"
    ],
    "answer": 0,
    "explanation": "78 = 7 chục và 8 đơn vị.",
    "choiceFeedback": [
     "Đúng — 78 gồm 7 chục 8 đơn vị.",
     "Sai — nhầm giữa chục và đơn vị.",
     "Sai — thiếu đơn vị.",
     "Sai — 7 chục không phải 6 chục."
    ]
   },
   {
    "stem": "Kim ngắn trên mặt đồng hồ chỉ?",
    "choices": [
     "Phút",
     "Giờ",
     "Giây",
     "Ngày"
    ],
    "answer": 1,
    "explanation": "Kim ngắn chỉ giờ, kim dài chỉ phút.",
    "choiceFeedback": [
     "Sai — kim dài mới chỉ phút.",
     "Đúng — kim ngắn chỉ giờ.",
     "Sai — đồng hồ lớp 1 không có kim giây.",
     "Sai — không liên quan."
    ]
   },
   {
    "stem": "Kim phút chỉ số 12, kim giờ chỉ số 3. Là mấy giờ?",
    "choices": [
     "12 giờ",
     "2 giờ",
     "3 giờ",
     "9 giờ"
    ],
    "answer": 2,
    "explanation": "Kim giờ chỉ số 3 và kim phút chỉ số 12 nghĩa là 3 giờ đúng.",
    "choiceFeedback": [
     "Sai — kim giờ mới chỉ số 3, không phải 12.",
     "Sai — không đúng.",
     "Đúng — kim giờ chỉ số 3 nghĩa là 3 giờ.",
     "Sai — không đúng."
    ]
   },
   {
    "stem": "Tờ tiền 10 000 đồng cộng thêm tờ 5 000 đồng bằng?",
    "choices": [
     "10 000 đồng",
     "5 000 đồng",
     "20 000 đồng",
     "15 000 đồng"
    ],
    "answer": 3,
    "explanation": "10 000 + 5 000 = 15 000 đồng.",
    "choiceFeedback": [
     "Sai — chưa cộng thêm 5 000.",
     "Sai — chưa cộng thêm 10 000.",
     "Sai — tính lại, không phải 20 000.",
     "Đúng — 10 000 + 5 000 = 15 000 đồng."
    ]
   },
   {
    "stem": "27 + 5 = ?",
    "choices": [
     "32",
     "22",
     "37",
     "30"
    ],
    "answer": 0,
    "explanation": "27+5=32.",
    "choiceFeedback": [
     "Đúng — 27+5=32.",
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Sai — tính lại."
    ]
   },
   {
    "stem": "32 − 5 = ?",
    "choices": [
     "37",
     "27",
     "22",
     "25"
    ],
    "answer": 1,
    "explanation": "32−5=27.",
    "choiceFeedback": [
     "Sai — đó là phép cộng, không phải trừ.",
     "Đúng — 32−5=27.",
     "Sai — tính lại.",
     "Sai — tính lại."
    ]
   },
   {
    "stem": "Vườn có 18 cây cam, trồng thêm 5 cây. Vườn có tất cả?",
    "choices": [
     "13",
     "28",
     "23",
     "24"
    ],
    "answer": 2,
    "explanation": "18+5=23 cây.",
    "choiceFeedback": [
     "Sai — đó là phép trừ, không phải cộng.",
     "Sai — tính lại.",
     "Đúng — 18+5=23 cây.",
     "Sai — tính lại."
    ]
   },
   {
    "stem": "Sân có 24 con chim, bay đi 8 con. Còn?",
    "choices": [
     "32",
     "18",
     "14",
     "16"
    ],
    "answer": 3,
    "explanation": "24−8=16 con.",
    "choiceFeedback": [
     "Sai — đó là phép cộng, không phải trừ.",
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Đúng — 24−8=16 con."
    ]
   },
   {
    "stem": "27 + 13 = ?",
    "choices": [
     "40",
     "30",
     "41",
     "39"
    ],
    "answer": 0,
    "explanation": "27+13=40.",
    "choiceFeedback": [
     "Đúng — 27+13=40.",
     "Sai — tính lại.",
     "Sai — tính lại.",
     "Sai — tính lại."
    ]
   },
   {
    "stem": "Có 60 quả trứng, vỡ 12 quả. Còn?",
    "choices": [
     "52",
     "48",
     "50",
     "72"
    ],
    "answer": 1,
    "explanation": "60−12=48 quả.",
    "choiceFeedback": [
     "Sai — tính lại.",
     "Đúng — 60−12=48 quả.",
     "Sai — tính lại.",
     "Sai — đó là phép cộng, không phải trừ."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
