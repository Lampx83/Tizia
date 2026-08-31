// P4 — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định.
// Ráp bởi data/gen-content/assemble-exam.mjs — file này chỉ là NGUỒN SEED.
export const P4_EXAMS = {
 "P4-exam-gk1": {
  "id": "P4-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 4",
  "questions": [
   {
    "stem": "Số bé nhất có 5 chữ số là?",
    "choices": [
     "99 999",
     "9 999",
     "10 000",
     "100 000"
    ],
    "answer": 2,
    "explanation": "Số bé nhất có 5 chữ số là 10 000 vì nó là số nhỏ nhất bắt đầu bằng 1 ở hàng chục nghìn.",
    "choiceFeedback": [
     "Sai — 99 999 là số lớn nhất có 5 chữ số, không phải nhỏ nhất.",
     "Sai — 9 999 chỉ có 4 chữ số.",
     "Đúng — 10 000 là số bé nhất có 5 chữ số.",
     "Sai — 100 000 có 6 chữ số."
    ]
   },
   {
    "stem": "Số liền sau của 9 999 là?",
    "choices": [
     "10 000",
     "9 998",
     "10 001",
     "9 909"
    ],
    "answer": 0,
    "explanation": "Số liền sau của một số là số đó cộng thêm 1: 9 999 + 1 = 10 000.",
    "choiceFeedback": [
     "Đúng — 9 999 + 1 = 10 000.",
     "Sai — 9 998 là số liền trước của 9 999, không phải liền sau.",
     "Sai — 10 001 là số liền sau của 10 000, không phải của 9 999.",
     "Sai — 9 909 không liên quan đến phép tính liền sau."
    ]
   },
   {
    "stem": "Trong số 47 528, chữ số 5 ở hàng nào?",
    "choices": [
     "Hàng chục",
     "Hàng trăm",
     "Hàng nghìn",
     "Hàng đơn vị"
    ],
    "answer": 1,
    "explanation": "Số 47 528 gồm: 4 (chục nghìn), 7 (nghìn), 5 (trăm), 2 (chục), 8 (đơn vị). Vậy chữ số 5 ở hàng trăm.",
    "choiceFeedback": [
     "Sai — hàng chục là chữ số 2.",
     "Đúng — chữ số 5 đứng ở vị trí hàng trăm.",
     "Sai — hàng nghìn là chữ số 7.",
     "Sai — hàng đơn vị là chữ số 8."
    ]
   },
   {
    "stem": "Với a = 5, biểu thức a + 12 có giá trị là?",
    "choices": [
     "15",
     "60",
     "7",
     "17"
    ],
    "answer": 3,
    "explanation": "Thay a = 5 vào biểu thức: 5 + 12 = 17.",
    "choiceFeedback": [
     "Sai — 15 không đúng phép cộng 5 + 12.",
     "Sai — 60 là kết quả của phép nhân 5 × 12, không phải phép cộng.",
     "Sai — 7 là kết quả của 12 − 5, không phải 5 + 12.",
     "Đúng — 5 + 12 = 17."
    ]
   },
   {
    "stem": "Với b = 8, giá trị của 3 × b là?",
    "choices": [
     "24",
     "11",
     "38",
     "83"
    ],
    "answer": 0,
    "explanation": "Thay b = 8: 3 × 8 = 24.",
    "choiceFeedback": [
     "Đúng — 3 × 8 = 24.",
     "Sai — 11 là kết quả của 3 + 8, không phải phép nhân.",
     "Sai — 38 nhầm lẫn giữa ghép số 3 và 8 với phép tính.",
     "Sai — 83 là đảo ngược chữ số của 38, vẫn sai."
    ]
   },
   {
    "stem": "Lớp đơn vị gồm các hàng?",
    "choices": [
     "Hàng nghìn, hàng chục nghìn, hàng trăm nghìn",
     "Hàng triệu, hàng chục triệu, hàng trăm triệu",
     "Hàng đơn vị, hàng chục, hàng trăm",
     "Hàng tỉ, hàng chục tỉ, hàng trăm tỉ"
    ],
    "answer": 2,
    "explanation": "Lớp đơn vị là lớp thấp nhất, gồm ba hàng: đơn vị, chục, trăm.",
    "choiceFeedback": [
     "Sai — đây là ba hàng của lớp nghìn.",
     "Sai — đây là ba hàng của lớp triệu.",
     "Đúng — lớp đơn vị gồm hàng đơn vị, hàng chục, hàng trăm.",
     "Sai — đây là ba hàng của lớp tỉ."
    ]
   },
   {
    "stem": "Số 1 000 000 đọc là?",
    "choices": [
     "Một trăm nghìn",
     "Một triệu",
     "Mười triệu",
     "Một nghìn"
    ],
    "answer": 1,
    "explanation": "1 000 000 có 6 chữ số 0 sau số 1, đọc là một triệu.",
    "choiceFeedback": [
     "Sai — một trăm nghìn là 100 000.",
     "Đúng — 1 000 000 đọc là một triệu.",
     "Sai — mười triệu là 10 000 000.",
     "Sai — một nghìn là 1 000."
    ]
   },
   {
    "stem": "Số lớn nhất trong: 543 219 ; 534 921 ; 543 291 ; 534 219",
    "choices": [
     "543 219",
     "534 921",
     "534 219",
     "543 291"
    ],
    "answer": 3,
    "explanation": "So sánh 543 291 và 543 219: cùng bắt đầu 543, hàng chục 9 > 1 nên 543 291 lớn hơn. Hai số còn lại bắt đầu bằng 534 nên nhỏ hơn nhóm 543.",
    "choiceFeedback": [
     "Sai — 543 219 nhỏ hơn 543 291 vì hàng chục 1 < 9.",
     "Sai — 534 921 có hàng chục nghìn là 3, nhỏ hơn các số bắt đầu bằng 543.",
     "Sai — 534 219 là số nhỏ nhất trong bốn số.",
     "Đúng — 543 291 là số lớn nhất."
    ]
   },
   {
    "stem": "Sắp xếp giảm dần: 27 000 ; 7 200 ; 72 000 ; 2 700",
    "choices": [
     "72 000; 27 000; 7 200; 2 700",
     "27 000; 72 000; 7 200; 2 700",
     "72 000; 7 200; 27 000; 2 700",
     "2 700; 7 200; 27 000; 72 000"
    ],
    "answer": 0,
    "explanation": "Sắp xếp giảm dần nghĩa là từ lớn đến bé: 72 000 > 27 000 > 7 200 > 2 700.",
    "choiceFeedback": [
     "Đúng — thứ tự giảm dần đúng.",
     "Sai — 72 000 phải đứng trước 27 000 vì lớn hơn.",
     "Sai — 27 000 lớn hơn 7 200 nên phải đứng trước.",
     "Sai — đây là thứ tự tăng dần, không phải giảm dần."
    ]
   },
   {
    "stem": "Làm tròn 5 678 đến hàng nghìn được?",
    "choices": [
     "5 000",
     "5 700",
     "6 000",
     "5 680"
    ],
    "answer": 2,
    "explanation": "Xét chữ số hàng trăm của 5 678 là 6 (≥5) nên làm tròn lên: 5 678 ≈ 6 000.",
    "choiceFeedback": [
     "Sai — làm tròn xuống 5 000 chỉ đúng khi chữ số hàng trăm bé hơn 5.",
     "Sai — 5 700 là làm tròn đến hàng trăm, không phải hàng nghìn.",
     "Đúng — vì hàng trăm là 6 (≥5) nên làm tròn lên 6 000.",
     "Sai — 5 680 là làm tròn đến hàng chục."
    ]
   },
   {
    "stem": "Một xã có 8 745 người. Làm tròn đến hàng trăm là?",
    "choices": [
     "8 800",
     "8 700",
     "8 750",
     "8 745"
    ],
    "answer": 1,
    "explanation": "Chữ số hàng chục của 8 745 là 4 (<5) nên làm tròn xuống: 8 745 ≈ 8 700.",
    "choiceFeedback": [
     "Sai — làm tròn lên chỉ đúng khi hàng chục ≥5, ở đây hàng chục là 4.",
     "Đúng — hàng chục là 4 (<5) nên làm tròn xuống 8 700.",
     "Sai — 8 750 không phải là số tròn trăm.",
     "Sai — 8 745 là số chưa làm tròn."
    ]
   },
   {
    "stem": "Một xe tải chở 3 tấn gạo và 5 tạ ngô. Tổng khối lượng là?",
    "choices": [
     "8 tạ",
     "53 tạ",
     "300 tạ",
     "35 tạ"
    ],
    "answer": 3,
    "explanation": "3 tấn = 30 tạ. 30 tạ + 5 tạ = 35 tạ.",
    "choiceFeedback": [
     "Sai — 8 tạ là kết quả nếu cộng nhầm 3 + 5 mà quên đổi đơn vị.",
     "Sai — 53 tạ là do đảo số của 35, không đúng phép tính.",
     "Sai — 300 tạ nhầm 1 tấn = 100 tạ, thực ra 1 tấn = 10 tạ.",
     "Đúng — 3 tấn = 30 tạ, cộng 5 tạ được 35 tạ."
    ]
   },
   {
    "stem": "Bác Hồ sinh năm 1890. Bác sinh vào thế kỉ thứ?",
    "choices": [
     "XX",
     "XIX",
     "XVIII",
     "XVII"
    ],
    "answer": 1,
    "explanation": "Năm 1890 nằm trong khoảng 1801–1900, thuộc thế kỉ XIX.",
    "choiceFeedback": [
     "Sai — thế kỉ XX là từ năm 1901 đến 2000.",
     "Đúng — 1890 thuộc thế kỉ XIX (1801–1900).",
     "Sai — thế kỉ XVIII là từ năm 1701 đến 1800.",
     "Sai — thế kỉ XVII là từ năm 1601 đến 1700."
    ]
   },
   {
    "stem": "2 phút 15 giây = ? giây",
    "choices": [
     "125 giây",
     "215 giây",
     "135 giây",
     "145 giây"
    ],
    "answer": 2,
    "explanation": "2 phút = 120 giây. 120 + 15 = 135 giây.",
    "choiceFeedback": [
     "Sai — 125 giây tính nhầm 2 phút thành 110 giây.",
     "Sai — 215 giây là ghép nhầm số 2 và 15 thành 215.",
     "Đúng — 2 phút = 120 giây, cộng 15 giây được 135 giây.",
     "Sai — 145 giây tính nhầm 2 phút thành 130 giây."
    ]
   },
   {
    "stem": "Tính nhanh: 138 + 256 + 62 = ?",
    "choices": [
     "456",
     "446",
     "356",
     "466"
    ],
    "answer": 0,
    "explanation": "Áp dụng tính chất giao hoán và kết hợp: 138 + 62 = 200; 200 + 256 = 456.",
    "choiceFeedback": [
     "Đúng — nhóm 138 + 62 = 200 rồi cộng 256 được 456.",
     "Sai — 446 tính sai khi cộng 200 + 256.",
     "Sai — 356 là kết quả nếu tính thiếu một số hạng.",
     "Sai — 466 tính nhầm phép cộng cuối cùng."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P4-exam-ck1": {
  "id": "P4-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 4",
  "questions": [
   {
    "stem": "60 000 + 5 000 = ?",
    "choices": [
     "60 500",
     "65 000",
     "55 000",
     "6 500"
    ],
    "answer": 1,
    "explanation": "60 000 + 5 000 = 65 000 (cộng các số tròn nghìn).",
    "choiceFeedback": [
     "Sai — 60 500 tính nhầm khi cộng 5 000 vào hàng trăm thay vì hàng nghìn.",
     "Đúng — 60 000 + 5 000 = 65 000.",
     "Sai — 55 000 là kết quả của phép trừ 60 000 − 5 000, không phải cộng.",
     "Sai — 6 500 thiếu một chữ số 0 so với kết quả đúng."
    ]
   },
   {
    "stem": "Số nhỏ nhất có 7 chữ số là?",
    "choices": [
     "9 999 999",
     "100 000",
     "1 111 111",
     "1 000 000"
    ],
    "answer": 3,
    "explanation": "Số nhỏ nhất có 7 chữ số là số bắt đầu bằng 1 và các chữ số còn lại là 0: 1 000 000.",
    "choiceFeedback": [
     "Sai — 9 999 999 là số lớn nhất có 7 chữ số.",
     "Sai — 100 000 chỉ có 6 chữ số.",
     "Sai — 1 111 111 lớn hơn 1 000 000, không phải số nhỏ nhất.",
     "Đúng — 1 000 000 là số nhỏ nhất có 7 chữ số."
    ]
   },
   {
    "stem": "Làm tròn 12 450 đến hàng nghìn được?",
    "choices": [
     "12 000",
     "13 000",
     "12 500",
     "12 450"
    ],
    "answer": 0,
    "explanation": "Chữ số hàng trăm của 12 450 là 4 (<5) nên làm tròn xuống: 12 450 ≈ 12 000.",
    "choiceFeedback": [
     "Đúng — hàng trăm là 4 (<5) nên làm tròn xuống 12 000.",
     "Sai — làm tròn lên 13 000 chỉ đúng khi hàng trăm ≥5.",
     "Sai — 12 500 không phải là số tròn nghìn.",
     "Sai — 12 450 là số chưa làm tròn."
    ]
   },
   {
    "stem": "2 tấn = ? tạ",
    "choices": [
     "200 tạ",
     "2 tạ",
     "20 tạ",
     "12 tạ"
    ],
    "answer": 2,
    "explanation": "1 tấn = 10 tạ, nên 2 tấn = 2 × 10 = 20 tạ.",
    "choiceFeedback": [
     "Sai — 200 tạ nhầm 1 tấn = 100 tạ.",
     "Sai — 2 tạ nhầm lẫn giữa tấn và tạ.",
     "Đúng — 2 tấn = 20 tạ.",
     "Sai — 12 tạ không đúng phép nhân 2 × 10."
    ]
   },
   {
    "stem": "5 + 234 + 95 + 66 = ?",
    "choices": [
     "390",
     "400",
     "410",
     "300"
    ],
    "answer": 1,
    "explanation": "Nhóm các số: (5 + 95) + (234 + 66) = 100 + 300 = 400.",
    "choiceFeedback": [
     "Sai — 390 tính thiếu 10 đơn vị.",
     "Đúng — (5+95) + (234+66) = 100 + 300 = 400.",
     "Sai — 410 tính thừa 10 đơn vị.",
     "Sai — 300 chỉ là kết quả của một nhóm (234+66), chưa cộng nhóm còn lại."
    ]
   },
   {
    "stem": "Một bao gạo 25 kg. Hỏi 6 bao như thế nặng?",
    "choices": [
     "120 kg",
     "130 kg",
     "140 kg",
     "150 kg"
    ],
    "answer": 3,
    "explanation": "6 bao gạo nặng: 25 × 6 = 150 (kg).",
    "choiceFeedback": [
     "Sai — 120 kg tính nhầm 25 × 6 thành 20 × 6.",
     "Sai — 130 kg không khớp phép nhân 25 × 6.",
     "Sai — 140 kg vẫn chưa đúng, thiếu 10 kg so với kết quả đúng.",
     "Đúng — 25 × 6 = 150 (kg)."
    ]
   },
   {
    "stem": "80 × 50 = ?",
    "choices": [
     "4 000",
     "400",
     "40 000",
     "450"
    ],
    "answer": 0,
    "explanation": "80 × 50 = 8 × 5 × 100 = 40 × 100 = 4 000.",
    "choiceFeedback": [
     "Đúng — 80 × 50 = 4 000.",
     "Sai — 400 thiếu một chữ số 0.",
     "Sai — 40 000 thừa một chữ số 0.",
     "Sai — 450 không đúng phép nhân 80 × 50."
    ]
   },
   {
    "stem": "Một trường có 28 lớp, mỗi lớp 35 học sinh. Tổng số học sinh?",
    "choices": [
     "960",
     "900",
     "980",
     "1 020"
    ],
    "answer": 2,
    "explanation": "Tổng số học sinh: 28 × 35 = 980 (học sinh).",
    "choiceFeedback": [
     "Sai — 960 tính chưa đúng phép nhân 28 × 35.",
     "Sai — 900 là kết quả nếu làm tròn 28 và 35 rồi nhân, không chính xác.",
     "Đúng — 28 × 35 = 980.",
     "Sai — 1 020 tính thừa so với kết quả đúng."
    ]
   },
   {
    "stem": "Tính: 217 × 100 + 217 × 9 = ?",
    "choices": [
     "21 700",
     "23 653",
     "1 953",
     "22 653"
    ],
    "answer": 1,
    "explanation": "217 × 100 + 217 × 9 = 217 × (100+9) = 217 × 109 = 23 653.",
    "choiceFeedback": [
     "Sai — 21 700 chỉ là kết quả của 217 × 100, chưa cộng phần 217 × 9.",
     "Đúng — 217 × 109 = 23 653.",
     "Sai — 1 953 chỉ là kết quả của 217 × 9, chưa cộng phần 217 × 100.",
     "Sai — 22 653 tính sai một chữ số ở hàng nghìn."
    ]
   },
   {
    "stem": "Có 75 viên kẹo chia đều cho 4 bạn. Mỗi bạn được bao nhiêu viên và còn dư bao nhiêu viên?",
    "choices": [
     "19 viên, dư 1",
     "18 viên, dư 1",
     "17 viên, dư 4",
     "18 viên, dư 3"
    ],
    "answer": 3,
    "explanation": "75 : 4 = 18 (dư 3) vì 4 × 18 = 72 và 75 − 72 = 3.",
    "choiceFeedback": [
     "Sai — 4 × 19 = 76 lớn hơn 75, không hợp lệ.",
     "Sai — nếu mỗi bạn 18 viên thì số dư phải là 75 − 72 = 3, không phải 1.",
     "Sai — 4 × 17 = 68, còn dư 7, không phải 4.",
     "Đúng — 4 × 18 = 72, dư 75 − 72 = 3."
    ]
   },
   {
    "stem": "Trong các số 70, 75, 77, 80 có mấy số chia hết cho 5?",
    "choices": [
     "3 số",
     "2 số",
     "4 số",
     "1 số"
    ],
    "answer": 0,
    "explanation": "Các số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5: 70, 75, 80 (77 thì không). Vậy có 3 số.",
    "choiceFeedback": [
     "Đúng — 70, 75, 80 chia hết cho 5 (77 thì không).",
     "Sai — thực tế có 3 số chia hết cho 5, không phải 2.",
     "Sai — 77 không chia hết cho 5 nên không thể cả 4 số.",
     "Sai — có tới 3 số chia hết cho 5 trong dãy này."
    ]
   },
   {
    "stem": "Số 198 có chia hết cho 9 không?",
    "choices": [
     "Không, vì 198 là số chẵn",
     "Không, vì tổng các chữ số bằng 18 không chia hết cho 9",
     "Có, vì tổng các chữ số (1+9+8=18) chia hết cho 9",
     "Có, vì 198 chia hết cho 2"
    ],
    "answer": 2,
    "explanation": "Tổng các chữ số của 198 là 1+9+8=18, mà 18 chia hết cho 9, nên 198 chia hết cho 9.",
    "choiceFeedback": [
     "Sai — tính chẵn lẻ không liên quan đến dấu hiệu chia hết cho 9.",
     "Sai — 18 chia hết cho 9 (18 : 9 = 2), nên khẳng định 'không' là sai.",
     "Đúng — tổng chữ số 18 chia hết cho 9 nên 198 chia hết cho 9.",
     "Sai — chia hết cho 2 không phải là lí do để kết luận chia hết cho 9."
    ]
   },
   {
    "stem": "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì?",
    "choices": [
     "Vuông góc với nhau",
     "Song song với nhau",
     "Cắt nhau tại một điểm",
     "Trùng nhau"
    ],
    "answer": 1,
    "explanation": "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.",
    "choiceFeedback": [
     "Sai — chúng không vuông góc với nhau mà song song với nhau.",
     "Đúng — đây là tính chất về hai đường thẳng cùng vuông góc với đường thẳng thứ ba.",
     "Sai — hai đường thẳng song song thì không cắt nhau.",
     "Sai — chúng song song chứ không trùng nhau."
    ]
   },
   {
    "stem": "Lúc 6 giờ, hai kim đồng hồ tạo thành góc?",
    "choices": [
     "Góc vuông (90°)",
     "Góc nhọn",
     "Góc tù",
     "Góc bẹt (180°)"
    ],
    "answer": 3,
    "explanation": "Lúc 6 giờ, kim giờ chỉ số 6, kim phút chỉ số 12, hai kim thẳng hàng tạo thành góc bẹt 180°.",
    "choiceFeedback": [
     "Sai — góc vuông xảy ra lúc 3 giờ hoặc 9 giờ.",
     "Sai — góc nhọn nhỏ hơn 90°, không đúng ở đây.",
     "Sai — góc tù lớn hơn 90° và bé hơn 180°, còn ở đây hai kim thẳng hàng.",
     "Đúng — lúc 6 giờ hai kim tạo thành góc bẹt 180°."
    ]
   },
   {
    "stem": "Tính nhanh: 4 × 25 × 17 = ?",
    "choices": [
     "1 700",
     "1 007",
     "170",
     "17 000"
    ],
    "answer": 0,
    "explanation": "Nhóm 4 × 25 = 100 trước, rồi 100 × 17 = 1 700.",
    "choiceFeedback": [
     "Đúng — 4 × 25 = 100, rồi 100 × 17 = 1 700.",
     "Sai — 1 007 không phải là bội của 100.",
     "Sai — 170 thiếu một chữ số 0.",
     "Sai — 17 000 thừa một chữ số 0."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P4-exam-gk2": {
  "id": "P4-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 4",
  "questions": [
   {
    "stem": "Phân số 3/4 đọc là?",
    "choices": [
     "Ba phần tư",
     "Bốn phần ba",
     "Ba nhân tư",
     "Ba trừ tư"
    ],
    "answer": 0,
    "explanation": "Phân số a/b đọc là 'a phần b', vậy 3/4 đọc là 'ba phần tư'.",
    "choiceFeedback": [
     "Đúng — 3/4 đọc là 'ba phần tư', tử số đọc trước, mẫu số đọc sau.",
     "Sai — 'Bốn phần ba' là cách đọc của phân số 4/3, đã đảo ngược tử số và mẫu số.",
     "Sai — 'Ba nhân tư' nhầm phân số với phép nhân.",
     "Sai — 'Ba trừ tư' nhầm phân số với phép trừ."
    ]
   },
   {
    "stem": "Trong phân số 5/8, mẫu số là?",
    "choices": [
     "5",
     "13",
     "8",
     "3"
    ],
    "answer": 2,
    "explanation": "Trong phân số 5/8, số 5 là tử số (ở trên), số 8 là mẫu số (ở dưới).",
    "choiceFeedback": [
     "Sai — 5 là tử số, không phải mẫu số.",
     "Sai — 13 là tổng của tử số và mẫu số, không phải mẫu số.",
     "Đúng — 8 là mẫu số của phân số 5/8.",
     "Sai — 3 là hiệu của mẫu số và tử số, không phải mẫu số."
    ]
   },
   {
    "stem": "Một cái bánh chia đều 4 phần, ăn 1 phần. Phần đã ăn được viết là?",
    "choices": [
     "4/1",
     "1/4",
     "1/3",
     "4/4"
    ],
    "answer": 1,
    "explanation": "Bánh chia làm 4 phần bằng nhau (mẫu số là 4), ăn 1 phần (tử số là 1), viết là 1/4.",
    "choiceFeedback": [
     "Sai — 4/1 đã đảo ngược tử số và mẫu số.",
     "Đúng — ăn 1 trong 4 phần bằng nhau được viết là 1/4.",
     "Sai — 1/3 sai vì bánh được chia thành 4 phần, không phải 3 phần.",
     "Sai — 4/4 nghĩa là ăn hết cả cái bánh."
    ]
   },
   {
    "stem": "Rút gọn 15/25 được?",
    "choices": [
     "5/3",
     "1/2",
     "15/25",
     "3/5"
    ],
    "answer": 3,
    "explanation": "Chia cả tử số và mẫu số của 15/25 cho ước chung lớn nhất là 5: 15:5=3, 25:5=5, được 3/5.",
    "choiceFeedback": [
     "Sai — 5/3 đã đảo ngược tử số và mẫu số.",
     "Sai — 1/2 không bằng 15/25.",
     "Sai — 15/25 phải rút gọn tiếp vì tử và mẫu vẫn còn chia hết cho 5.",
     "Đúng — 15/25 = 3/5 sau khi chia cả tử và mẫu cho 5."
    ]
   },
   {
    "stem": "Trong các phân số 2/4 ; 3/6 ; 5/10 ; 1/3 có mấy phân số bằng nhau?",
    "choices": [
     "3 phân số",
     "2 phân số",
     "4 phân số",
     "1 phân số"
    ],
    "answer": 0,
    "explanation": "Rút gọn: 2/4=1/2 ; 3/6=1/2 ; 5/10=1/2 ; còn 1/3 khác 1/2. Vậy có 3 phân số bằng nhau (2/4, 3/6, 5/10).",
    "choiceFeedback": [
     "Đúng — 2/4, 3/6, 5/10 đều bằng 1/2, còn 1/3 thì khác.",
     "Sai — thực tế có tới 3 phân số cùng bằng 1/2.",
     "Sai — 1/3 không bằng 1/2 nên không thể cả 4 phân số bằng nhau.",
     "Sai — có nhiều hơn 1 phân số bằng nhau trong dãy này."
    ]
   },
   {
    "stem": "Mẫu số chung nhỏ nhất của 1/4 và 1/6 là?",
    "choices": [
     "24",
     "6",
     "12",
     "10"
    ],
    "answer": 2,
    "explanation": "BCNN của 4 và 6 là 12 (4×3=12, 6×2=12), nên mẫu số chung nhỏ nhất là 12.",
    "choiceFeedback": [
     "Sai — 24 là một mẫu số chung nhưng không phải nhỏ nhất.",
     "Sai — 6 không chia hết cho 4 nên chưa phải mẫu chung của cả hai phân số.",
     "Đúng — 12 là bội chung nhỏ nhất của 4 và 6.",
     "Sai — 10 không chia hết cho cả 4 và 6."
    ]
   },
   {
    "stem": "So sánh 4/9 và 4/7",
    "choices": [
     "4/9 > 4/7",
     "4/9 < 4/7",
     "4/9 = 4/7",
     "Không so sánh được"
    ],
    "answer": 1,
    "explanation": "Hai phân số có cùng tử số 4, phân số nào có mẫu số lớn hơn thì bé hơn. Vì 9 > 7 nên 4/9 < 4/7.",
    "choiceFeedback": [
     "Sai — cùng tử số, mẫu số lớn hơn (9>7) thì phân số 4/9 nhỏ hơn, không phải lớn hơn.",
     "Đúng — 4/9 < 4/7 vì cùng tử số mà mẫu số 9 lớn hơn 7.",
     "Sai — hai phân số có mẫu số khác nhau nên không thể bằng nhau.",
     "Sai — hai phân số cùng tử số luôn so sánh được bằng cách so sánh mẫu số."
    ]
   },
   {
    "stem": "Phân số bé nhất trong: 2/3 ; 3/4 ; 1/2",
    "choices": [
     "2/3",
     "3/4",
     "Cả ba bằng nhau",
     "1/2"
    ],
    "answer": 3,
    "explanation": "Quy đồng mẫu số 12: 2/3=8/12 ; 3/4=9/12 ; 1/2=6/12. Vì 6<8<9 nên 1/2 là phân số bé nhất.",
    "choiceFeedback": [
     "Sai — 2/3 = 8/12, lớn hơn 1/2 = 6/12.",
     "Sai — 3/4 = 9/12 là phân số lớn nhất trong ba phân số.",
     "Sai — ba phân số có giá trị khác nhau, không bằng nhau.",
     "Đúng — 1/2 = 6/12 là phân số bé nhất."
    ]
   },
   {
    "stem": "3/4 + 1/4 = ?",
    "choices": [
     "1",
     "4/8",
     "3/8",
     "2/4"
    ],
    "answer": 0,
    "explanation": "Hai phân số cùng mẫu số, cộng tử số: 3/4 + 1/4 = 4/4 = 1.",
    "choiceFeedback": [
     "Đúng — 3/4 + 1/4 = 4/4 = 1.",
     "Sai — 4/8 tính nhầm khi cộng cả tử và mẫu số.",
     "Sai — 3/8 tính nhầm khi cộng cả mẫu số lại.",
     "Sai — 2/4 tính nhầm phép cộng tử số (3+1 phải bằng 4, không phải 2)."
    ]
   },
   {
    "stem": "Mẹ mua 1/2 kg đường và 1/4 kg muối. Tổng khối lượng?",
    "choices": [
     "1/2 kg",
     "1 kg",
     "3/4 kg",
     "2/6 kg"
    ],
    "answer": 2,
    "explanation": "Quy đồng mẫu số: 1/2 = 2/4. Tổng: 2/4 + 1/4 = 3/4 (kg).",
    "choiceFeedback": [
     "Sai — 1/2 kg chỉ là khối lượng đường, chưa cộng khối lượng muối.",
     "Sai — 1 kg là kết quả nếu cộng nhầm 1/2 + 1/4 thành 1/2+1/2.",
     "Đúng — 1/2 kg + 1/4 kg = 3/4 kg.",
     "Sai — 2/6 kg là do cộng nhầm cả tử và mẫu số."
    ]
   },
   {
    "stem": "5/6 − 1/3 = ?",
    "choices": [
     "4/3",
     "1/2",
     "2/3",
     "4/9"
    ],
    "answer": 1,
    "explanation": "Quy đồng mẫu số: 1/3 = 2/6. Tính: 5/6 − 2/6 = 3/6 = 1/2 (rút gọn).",
    "choiceFeedback": [
     "Sai — 4/3 lớn hơn 1, không hợp lý vì phép trừ hai phân số nhỏ hơn 1.",
     "Đúng — 5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2.",
     "Sai — 2/3 tính nhầm khi quy đồng sai mẫu số.",
     "Sai — 4/9 không liên quan đến phép trừ đúng."
    ]
   },
   {
    "stem": "Có 5/8 kg đường, dùng hết 1/4 kg. Còn?",
    "choices": [
     "4/4 kg",
     "1/2 kg",
     "1/8 kg",
     "3/8 kg"
    ],
    "answer": 3,
    "explanation": "Quy đồng: 1/4 = 2/8. Còn lại: 5/8 − 2/8 = 3/8 (kg).",
    "choiceFeedback": [
     "Sai — 4/4 kg = 1 kg, lớn hơn cả khối lượng đường ban đầu, không hợp lý.",
     "Sai — 1/2 kg = 4/8 kg, không khớp phép trừ 5/8 − 2/8.",
     "Sai — 1/8 kg tính nhầm phép trừ.",
     "Đúng — 5/8 − 2/8 = 3/8 (kg)."
    ]
   },
   {
    "stem": "Một mảnh đất hình chữ nhật dài 4/5 m, rộng 1/2 m. Diện tích?",
    "choices": [
     "2/5 m²",
     "9/10 m²",
     "1/2 m²",
     "4/5 m²"
    ],
    "answer": 0,
    "explanation": "Diện tích = dài × rộng = 4/5 × 1/2 = 4/10 = 2/5 (m²).",
    "choiceFeedback": [
     "Đúng — 4/5 × 1/2 = 4/10 = 2/5 (m²).",
     "Sai — 9/10 m² là kết quả nếu cộng nhầm hai phân số thay vì nhân.",
     "Sai — 1/2 m² chỉ là chiều rộng, chưa nhân với chiều dài.",
     "Sai — 4/5 m² chỉ là chiều dài, chưa nhân với chiều rộng."
    ]
   },
   {
    "stem": "Có 3/4 lít dầu chia đều vào các chai 1/8 lít. Đong được bao nhiêu chai?",
    "choices": [
     "4 chai",
     "8 chai",
     "6 chai",
     "3 chai"
    ],
    "answer": 2,
    "explanation": "3/4 : 1/8 = 3/4 × 8/1 = 24/4 = 6 (chai).",
    "choiceFeedback": [
     "Sai — 4 chai tính nhầm phép chia phân số.",
     "Sai — 8 chai là số lấy từ mẫu số của 1/8, không phải kết quả phép chia.",
     "Đúng — 3/4 : 1/8 = 3/4 × 8 = 6 (chai).",
     "Sai — 3 chai chỉ bằng một nửa kết quả đúng."
    ]
   },
   {
    "stem": "Đổi 11/4 ra hỗn số?",
    "choices": [
     "2 1/4",
     "2 3/4",
     "3 1/4",
     "1 3/4"
    ],
    "answer": 1,
    "explanation": "11 : 4 = 2 dư 3, nên 11/4 = 2 và 3/4, viết là hỗn số 2 3/4.",
    "choiceFeedback": [
     "Sai — phần dư đúng phải là 3, không phải 1.",
     "Đúng — 11 = 4×2 + 3 nên 11/4 = 2 3/4.",
     "Sai — phần nguyên đúng phải là 2 (vì 4×3=12 > 11), không phải 3.",
     "Sai — phần nguyên đúng là 2 vì 4×1=4, còn dư 7, không khớp cách viết 1 3/4."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P4-exam-ck2": {
  "id": "P4-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 4",
  "kind": "quiz",
  "yearLevel": 4,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 4",
  "questions": [
   {
    "stem": "Phân số có giá trị bằng 1 là?",
    "choices": [
     "3/5",
     "5/5",
     "0/5",
     "5/3"
    ],
    "answer": 1,
    "explanation": "Phân số có giá trị bằng 1 khi tử số bằng mẫu số, ví dụ 5/5 = 1.",
    "choiceFeedback": [
     "Sai — 3/5 nhỏ hơn 1 vì tử số nhỏ hơn mẫu số.",
     "Đúng — 5/5 = 1 vì tử số bằng mẫu số.",
     "Sai — 0/5 = 0, không phải bằng 1.",
     "Sai — 5/3 lớn hơn 1 vì tử số lớn hơn mẫu số."
    ]
   },
   {
    "stem": "Rút gọn 6/9 được?",
    "choices": [
     "3/2",
     "1/3",
     "6/9",
     "2/3"
    ],
    "answer": 3,
    "explanation": "Chia cả tử và mẫu của 6/9 cho ước chung lớn nhất là 3: 6:3=2, 9:3=3, được 2/3.",
    "choiceFeedback": [
     "Sai — 3/2 đã đảo ngược tử số và mẫu số.",
     "Sai — 1/3 không bằng 6/9.",
     "Sai — 6/9 còn rút gọn được vì tử và mẫu cùng chia hết cho 3.",
     "Đúng — 6/9 = 2/3 sau khi chia cả tử và mẫu cho 3."
    ]
   },
   {
    "stem": "So sánh 1/2 và 3/5 (quy đồng mẫu 10)",
    "choices": [
     "1/2 < 3/5",
     "1/2 > 3/5",
     "1/2 = 3/5",
     "Không so sánh được"
    ],
    "answer": 0,
    "explanation": "Quy đồng mẫu số 10: 1/2 = 5/10 ; 3/5 = 6/10. Vì 5<6 nên 1/2 < 3/5.",
    "choiceFeedback": [
     "Đúng — 5/10 < 6/10 nên 1/2 < 3/5.",
     "Sai — sau khi quy đồng, 1/2 = 5/10 nhỏ hơn 3/5 = 6/10.",
     "Sai — 5/10 khác 6/10 nên hai phân số không bằng nhau.",
     "Sai — hai phân số bất kỳ đều có thể so sánh được bằng cách quy đồng mẫu số."
    ]
   },
   {
    "stem": "2/3 × 4/5 = ?",
    "choices": [
     "6/8",
     "8/8",
     "8/15",
     "6/15"
    ],
    "answer": 2,
    "explanation": "Nhân hai phân số: tử nhân tử, mẫu nhân mẫu: (2×4)/(3×5) = 8/15.",
    "choiceFeedback": [
     "Sai — 6/8 tính nhầm phép nhân tử số và mẫu số.",
     "Sai — 8/8 = 1, không đúng vì cả hai phân số đều nhỏ hơn 1.",
     "Đúng — 2/3 × 4/5 = 8/15.",
     "Sai — 6/15 tính nhầm tử số (phải là 2×4=8, không phải 6)."
    ]
   },
   {
    "stem": "Đổi 1 2/5 ra phân số?",
    "choices": [
     "6/5",
     "7/5",
     "2/5",
     "5/7"
    ],
    "answer": 1,
    "explanation": "Hỗn số 1 2/5 = (1×5+2)/5 = 7/5.",
    "choiceFeedback": [
     "Sai — 6/5 tính nhầm phép nhân phần nguyên với mẫu số.",
     "Đúng — 1×5 + 2 = 7, nên 1 2/5 = 7/5.",
     "Sai — 2/5 chỉ là phần phân số, chưa cộng phần nguyên.",
     "Sai — 5/7 đã đảo ngược tử số và mẫu số."
    ]
   },
   {
    "stem": "5 m² = ? dm²",
    "choices": [
     "50",
     "5 000",
     "50 000",
     "500"
    ],
    "answer": 3,
    "explanation": "1 m² = 100 dm², nên 5 m² = 5 × 100 = 500 dm².",
    "choiceFeedback": [
     "Sai — 50 dm² tương ứng với 0,5 m², không phải 5 m².",
     "Sai — 5 000 dm² tương ứng với 50 m², quá lớn.",
     "Sai — 50 000 dm² tương ứng với 500 m², quá lớn.",
     "Đúng — 5 m² = 500 dm²."
    ]
   },
   {
    "stem": "Diện tích một sân chơi hình vuông cạnh 8 m là?",
    "choices": [
     "64 m²",
     "32 m²",
     "16 m²",
     "81 m²"
    ],
    "answer": 0,
    "explanation": "Diện tích hình vuông = cạnh × cạnh = 8 × 8 = 64 (m²).",
    "choiceFeedback": [
     "Đúng — 8 × 8 = 64 (m²).",
     "Sai — 32 m² là chu vi tính nhầm thành diện tích (8×4), không đúng công thức diện tích.",
     "Sai — 16 m² là kết quả của 8×2, không phải 8×8.",
     "Sai — 81 m² là 9×9, nhầm cạnh hình vuông thành 9 m."
    ]
   },
   {
    "stem": "Hình bình hành có đáy 8 cm và chiều cao 5 cm. Diện tích?",
    "choices": [
     "13 cm²",
     "26 cm²",
     "40 cm²",
     "20 cm²"
    ],
    "answer": 2,
    "explanation": "Diện tích hình bình hành = đáy × chiều cao = 8 × 5 = 40 (cm²).",
    "choiceFeedback": [
     "Sai — 13 cm² là tổng đáy và chiều cao (8+5), không phải diện tích.",
     "Sai — 26 cm² không khớp công thức đáy × chiều cao.",
     "Đúng — 8 × 5 = 40 (cm²).",
     "Sai — 20 cm² chỉ bằng một nửa kết quả đúng."
    ]
   },
   {
    "stem": "Hình bình hành có đáy 12 cm, diện tích 60 cm². Chiều cao là?",
    "choices": [
     "6 cm",
     "5 cm",
     "8 cm",
     "4 cm"
    ],
    "answer": 1,
    "explanation": "Chiều cao = diện tích : đáy = 60 : 12 = 5 (cm).",
    "choiceFeedback": [
     "Sai — 6 cm không khớp phép chia 60 : 12.",
     "Đúng — 60 : 12 = 5 (cm).",
     "Sai — 8 cm không khớp phép tính đúng.",
     "Sai — 4 cm nhân với đáy 12 chỉ được 48 cm², không đủ 60 cm²."
    ]
   },
   {
    "stem": "Hình thoi có hai đường chéo 8 cm và 6 cm. Diện tích?",
    "choices": [
     "48 cm²",
     "14 cm²",
     "28 cm²",
     "24 cm²"
    ],
    "answer": 3,
    "explanation": "Diện tích hình thoi = (đường chéo 1 × đường chéo 2) : 2 = (8 × 6) : 2 = 24 (cm²).",
    "choiceFeedback": [
     "Sai — 48 cm² là tích hai đường chéo nhưng quên chia 2.",
     "Sai — 14 cm² là tổng hai đường chéo (8+6), không phải diện tích.",
     "Sai — 28 cm² không khớp công thức tính diện tích hình thoi.",
     "Đúng — (8 × 6) : 2 = 24 (cm²)."
    ]
   },
   {
    "stem": "Bốn lớp có lần lượt 30, 32, 34, 28 học sinh. Trung bình mỗi lớp?",
    "choices": [
     "31",
     "32",
     "30",
     "124"
    ],
    "answer": 0,
    "explanation": "Tổng số học sinh: 30+32+34+28 = 124. Trung bình cộng: 124 : 4 = 31 (học sinh).",
    "choiceFeedback": [
     "Đúng — 124 : 4 = 31 (học sinh).",
     "Sai — 32 chỉ là một trong bốn số liệu, không phải trung bình cộng.",
     "Sai — 30 chỉ là một trong bốn số liệu, không phải trung bình cộng.",
     "Sai — 124 là tổng số học sinh, chưa chia cho 4 lớp."
    ]
   },
   {
    "stem": "Một biểu đồ cột cho thấy 4 lớp có số học sinh: 30, 32, 28, 34. Lớp nào đông nhất?",
    "choices": [
     "Lớp có 30 học sinh",
     "Lớp có 32 học sinh",
     "Lớp có 34 học sinh",
     "Lớp có 28 học sinh"
    ],
    "answer": 2,
    "explanation": "So sánh các số liệu 30, 32, 28, 34 thì 34 là số lớn nhất, nên lớp có 34 học sinh đông nhất.",
    "choiceFeedback": [
     "Sai — 30 không phải là số lớn nhất trong bốn số liệu.",
     "Sai — 32 nhỏ hơn 34 nên chưa phải lớp đông nhất.",
     "Đúng — 34 là số học sinh lớn nhất trong bốn lớp.",
     "Sai — 28 là số học sinh ít nhất, không phải đông nhất."
    ]
   },
   {
    "stem": "Tổng hai số là 84, hiệu là 12. Số lớn?",
    "choices": [
     "42",
     "48",
     "36",
     "46"
    ],
    "answer": 1,
    "explanation": "Số lớn = (Tổng + Hiệu) : 2 = (84 + 12) : 2 = 96 : 2 = 48.",
    "choiceFeedback": [
     "Sai — 42 là kết quả nếu chia đôi tổng 84 mà không cộng hiệu.",
     "Đúng — (84+12) : 2 = 48.",
     "Sai — 36 là số bé (84−48=36), không phải số lớn.",
     "Sai — 46 không khớp công thức tìm số lớn."
    ]
   },
   {
    "stem": "Lớp 4A có 35 bạn, tỉ số nam/nữ là 3/4. Số bạn nam?",
    "choices": [
     "20",
     "12",
     "21",
     "15"
    ],
    "answer": 3,
    "explanation": "Tổng số phần bằng nhau: 3+4=7 phần. Mỗi phần: 35:7=5 (bạn). Số bạn nam: 3×5=15 (bạn).",
    "choiceFeedback": [
     "Sai — 20 là số bạn nữ (4×5=20), không phải số bạn nam.",
     "Sai — 12 không khớp với tỉ số nam/nữ đã cho.",
     "Sai — 21 không khớp phép tính đúng.",
     "Đúng — 3 × (35:7) = 3 × 5 = 15 (bạn nam)."
    ]
   },
   {
    "stem": "Một mảnh đất hình chữ nhật dài 25 m, rộng 18 m. Diện tích?",
    "choices": [
     "450 m²",
     "86 m²",
     "400 m²",
     "500 m²"
    ],
    "answer": 0,
    "explanation": "Diện tích hình chữ nhật = dài × rộng = 25 × 18 = 450 (m²).",
    "choiceFeedback": [
     "Đúng — 25 × 18 = 450 (m²).",
     "Sai — 86 m² là chu vi tính nhầm thành diện tích (2×(25+18)=86), không đúng công thức diện tích.",
     "Sai — 400 m² không khớp phép nhân 25×18.",
     "Sai — 500 m² không khớp phép nhân đúng."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
