// S6TOAN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S6TOAN_EXAMS = {
 "S6TOAN-exam-gk1": {
  "id": "S6TOAN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 6",
  "questions": [
   {
    "stem": "Tập hợp N là tập hợp các số gì?",
    "choices": [
     "Số nguyên",
     "Số hữu tỉ",
     "Số vô tỉ",
     "Số tự nhiên"
    ],
    "answer": 3,
    "explanation": "N = {0;1;2;3;...} là tập hợp các số tự nhiên.",
    "choiceFeedback": [
     "Sai — số nguyên (Z) gồm cả số âm.",
     "Sai — số hữu tỉ ký hiệu Q.",
     "Sai — số vô tỉ không phải N.",
     "Đúng — N là tập số tự nhiên."
    ]
   },
   {
    "stem": "Số tự nhiên nhỏ nhất là?",
    "choices": [
     "1",
     "-1",
     "0",
     "Không tồn tại"
    ],
    "answer": 2,
    "explanation": "Trong tập N, số tự nhiên nhỏ nhất là 0.",
    "choiceFeedback": [
     "Sai — 1 không phải số nhỏ nhất vì còn có 0.",
     "Sai — -1 không thuộc N.",
     "Đúng — 0 là số tự nhiên nhỏ nhất.",
     "Sai — N có số nhỏ nhất là 0."
    ]
   },
   {
    "stem": "Số phần tử của tập hợp A = {0; 1; 2; …; 10} là?",
    "choices": [
     "10",
     "9",
     "12",
     "11"
    ],
    "answer": 3,
    "explanation": "Từ 0 đến 10 có 10-0+1=11 số.",
    "choiceFeedback": [
     "Sai — thiếu số 0.",
     "Sai — tính nhầm.",
     "Sai — tính thừa.",
     "Đúng — 11 số từ 0 đến 10."
    ]
   },
   {
    "stem": "2^3 bằng?",
    "choices": [
     "6",
     "8",
     "9",
     "5"
    ],
    "answer": 1,
    "explanation": "2^3=2·2·2=8.",
    "choiceFeedback": [
     "Sai — 2·3=6 không phải lũy thừa.",
     "Đúng — 2·2·2=8.",
     "Sai — nhầm 3^2=9.",
     "Sai — tính sai."
    ]
   },
   {
    "stem": "Viết gọn 3·3·3·3·3 dưới dạng lũy thừa?",
    "choices": [
     "3^5",
     "5^3",
     "3·5",
     "5^5"
    ],
    "answer": 0,
    "explanation": "Có 5 thừa số 3 nhân với nhau nên viết gọn là 3^5.",
    "choiceFeedback": [
     "Đúng — 5 thừa số 3.",
     "Sai — nhầm cơ số và số mũ.",
     "Sai — không phải lũy thừa.",
     "Sai — sai cơ số."
    ]
   },
   {
    "stem": "Quy ước a^1 bằng?",
    "choices": [
     "1",
     "0",
     "a",
     "a·a"
    ],
    "answer": 2,
    "explanation": "Theo quy ước, a^1 = a.",
    "choiceFeedback": [
     "Sai — 1 là a^0 (a≠0).",
     "Sai — không đúng quy ước.",
     "Đúng — a^1=a.",
     "Sai — đó là a^2."
    ]
   },
   {
    "stem": "2^3 · 2^4 = ?",
    "choices": [
     "2^12",
     "2^1",
     "4^7",
     "2^7"
    ],
    "answer": 3,
    "explanation": "Nhân hai lũy thừa cùng cơ số, giữ cơ số cộng số mũ: 2^(3+4)=2^7=128.",
    "choiceFeedback": [
     "Sai — nhân số mũ là sai quy tắc.",
     "Sai — trừ nhầm số mũ.",
     "Sai — sai cơ số.",
     "Đúng — cộng số mũ 3+4=7."
    ]
   },
   {
    "stem": "5^6 : 5^2 = ?",
    "choices": [
     "5^3",
     "5^12",
     "5^4",
     "1^4"
    ],
    "answer": 2,
    "explanation": "Chia hai lũy thừa cùng cơ số, giữ cơ số trừ số mũ: 6-2=4, được 5^4=625.",
    "choiceFeedback": [
     "Sai — trừ nhầm số mũ.",
     "Sai — nhân số mũ là sai quy tắc.",
     "Đúng — 5^(6-2)=5^4.",
     "Sai — sai cơ số."
    ]
   },
   {
    "stem": "Viết gọn 7^2 · 7^5 · 7?",
    "choices": [
     "7^10",
     "7^8",
     "7^7",
     "7^9"
    ],
    "answer": 1,
    "explanation": "Cộng các số mũ: 2+5+1=8, kết quả 7^8.",
    "choiceFeedback": [
     "Sai — cộng thừa 1 đơn vị.",
     "Đúng — 2+5+1=8.",
     "Sai — thiếu số mũ của 7.",
     "Sai — cộng dư."
    ]
   },
   {
    "stem": "Tính 18 : 3 + 2 · 5 = ?",
    "choices": [
     "33",
     "16",
     "40",
     "20"
    ],
    "answer": 1,
    "explanation": "Thực hiện nhân chia trước: 18:3=6, 2·5=10, sau đó cộng: 6+10=16.",
    "choiceFeedback": [
     "Sai — cộng sai thứ tự.",
     "Đúng — 6+10=16.",
     "Sai — tính nhầm phép chia.",
     "Sai — tính nhầm."
    ]
   },
   {
    "stem": "Tính 20 − [10 − (4 − 2)] = ?",
    "choices": [
     "8",
     "12",
     "22",
     "6"
    ],
    "answer": 1,
    "explanation": "4-2=2; 10-2=8; 20-8=12.",
    "choiceFeedback": [
     "Sai — nhầm kết quả trong ngoặc vuông là đáp số cuối.",
     "Đúng — tính đúng thứ tự ngoặc tròn→vuông.",
     "Sai — cộng nhầm dấu.",
     "Sai — tính sai bước trừ."
    ]
   },
   {
    "stem": "Tính 3^2 + 4 · 5 = ?",
    "choices": [
     "35",
     "49",
     "25",
     "29"
    ],
    "answer": 3,
    "explanation": "Lũy thừa trước: 3^2=9; nhân: 4·5=20; cộng: 9+20=29.",
    "choiceFeedback": [
     "Sai — (3+4)·5 sai thứ tự.",
     "Sai — (3^2+4)·5 sai.",
     "Sai — tính lũy thừa sai.",
     "Đúng — 3^2+4·5=9+20=29."
    ]
   },
   {
    "stem": "Tính 100 − 5^2 · 2 = ?",
    "choices": [
     "90",
     "70",
     "190",
     "50"
    ],
    "answer": 3,
    "explanation": "Lũy thừa trước: 5^2=25; nhân: 25·2=50; trừ: 100-50=50.",
    "choiceFeedback": [
     "Sai — quên nhân với 2.",
     "Sai — tính nhầm.",
     "Sai — thứ tự thực hiện hoàn toàn sai.",
     "Đúng — 100-25·2=100-50=50."
    ]
   },
   {
    "stem": "Tính nhanh 25 · 13 · 4 = ?",
    "choices": [
     "1200",
     "1350",
     "1040",
     "1300"
    ],
    "answer": 3,
    "explanation": "Nhóm 25·4=100 rồi nhân với 13: 100·13=1300.",
    "choiceFeedback": [
     "Sai — tính thiếu.",
     "Sai — tính dư.",
     "Sai — nhân nhầm 25·13 rồi cộng sai.",
     "Đúng — 25×4×13=100×13=1300."
    ]
   },
   {
    "stem": "Một hình chữ nhật dài 8 cm, rộng 5 cm. Chu vi là?",
    "choices": [
     "40 cm",
     "13 cm",
     "26 cm",
     "30 cm"
    ],
    "answer": 2,
    "explanation": "Chu vi HCN = 2×(dài+rộng) = 2×(8+5) = 26 cm.",
    "choiceFeedback": [
     "Sai — đó là diện tích (8×5=40).",
     "Sai — chỉ cộng dài+rộng, chưa nhân 2.",
     "Đúng — 2×13=26 cm.",
     "Sai — tính nhầm phép nhân."
    ]
   },
   {
    "stem": "Lớp 6A có 30 học sinh, mỗi học sinh góp 5 nghìn đồng. Tổng tiền góp là?",
    "choices": [
     "100 nghìn đồng",
     "35 nghìn đồng",
     "150 nghìn đồng",
     "200 nghìn đồng"
    ],
    "answer": 2,
    "explanation": "Tổng tiền = số HS × số tiền mỗi HS = 30×5 = 150 nghìn đồng.",
    "choiceFeedback": [
     "Sai — tính nhầm phép nhân.",
     "Sai — nhầm cộng 30+5.",
     "Đúng — 30×5=150.",
     "Sai — tính dư."
    ]
   },
   {
    "stem": "15 chia hết cho số nào sau đây?",
    "choices": [
     "4",
     "5",
     "6",
     "7"
    ],
    "answer": 1,
    "explanation": "15 = 3×5 nên 15 chia hết cho 5 (và cho 3, cho 1, cho 15).",
    "choiceFeedback": [
     "Sai — 15:4 không hết.",
     "Đúng — 15:5=3.",
     "Sai — 15:6 không hết.",
     "Sai — 15:7 không hết."
    ]
   },
   {
    "stem": "Nếu a chia hết cho 12 thì a chia hết cho số nào sau đây?",
    "choices": [
     "5",
     "4",
     "7",
     "9"
    ],
    "answer": 1,
    "explanation": "Vì 4 là ước của 12 nên nếu a chia hết cho 12 thì a cũng chia hết cho 4.",
    "choiceFeedback": [
     "Sai — 5 không là ước của 12.",
     "Đúng — 4 là ước của 12 (12=4×3).",
     "Sai — 7 không là ước của 12.",
     "Sai — 9 không là ước của 12."
    ]
   },
   {
    "stem": "Số chia hết cho 2 có chữ số tận cùng là?",
    "choices": [
     "0; 2; 4; 6; 8",
     "0; 5",
     "1; 3; 5; 7; 9",
     "Chỉ số 0"
    ],
    "answer": 0,
    "explanation": "Số chẵn (chia hết cho 2) có chữ số tận cùng thuộc {0,2,4,6,8}.",
    "choiceFeedback": [
     "Đúng — đúng dấu hiệu chia hết cho 2.",
     "Sai — đó là dấu hiệu chia hết cho 5.",
     "Sai — đó là các chữ số lẻ.",
     "Sai — thiếu các chữ số chẵn khác."
    ]
   },
   {
    "stem": "234 có chia hết cho 9 không?",
    "choices": [
     "Có, vì 2+3+4=9 chia hết cho 9",
     "Không, vì 234 là số chẵn",
     "Có, vì 234 chia hết cho 2",
     "Không, vì 2+3+4=9 không chia hết cho 9"
    ],
    "answer": 0,
    "explanation": "Tổng các chữ số 2+3+4=9, chia hết cho 9 nên 234 chia hết cho 9 (234:9=26).",
    "choiceFeedback": [
     "Đúng — tổng chữ số 9 chia hết cho 9.",
     "Sai — tính chẵn lẻ không liên quan đến chia hết cho 9.",
     "Sai — lí do sai, chia hết cho 2 khác chia hết cho 9.",
     "Sai — 9 chia hết cho 9 nên kết luận sai."
    ]
   },
   {
    "stem": "Trong các số: 130; 245; 369; 462 — số nào chia hết cho cả 2 và 5?",
    "choices": [
     "245",
     "369",
     "130",
     "462"
    ],
    "answer": 2,
    "explanation": "Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Trong các số trên chỉ 130 tận cùng bằng 0.",
    "choiceFeedback": [
     "Sai — 245 chia hết cho 5 nhưng không chia hết cho 2 (số lẻ).",
     "Sai — 369 không chia hết cho 2 lẫn 5.",
     "Đúng — 130 tận cùng 0, chia hết cho cả 2 và 5.",
     "Sai — 462 chia hết cho 2 nhưng không chia hết cho 5."
    ]
   },
   {
    "stem": "Điền chữ số vào *: 12*5 chia hết cho 9. * = ?",
    "choices": [
     "0",
     "1",
     "3",
     "9"
    ],
    "answer": 1,
    "explanation": "Tổng các chữ số 1+2+*+5 = 8+* phải chia hết cho 9. Với * là chữ số (0-9), chỉ có *=1 thỏa 8+1=9.",
    "choiceFeedback": [
     "Sai — 8+0=8 không chia hết 9.",
     "Đúng — 8+1=9 chia hết cho 9.",
     "Sai — 8+3=11 không chia hết 9.",
     "Sai — 8+9=17 không chia hết 9."
    ]
   },
   {
    "stem": "Trong các số sau, số nào là số nguyên tố?",
    "choices": [
     "21",
     "29",
     "27",
     "33"
    ],
    "answer": 1,
    "explanation": "29 chỉ có hai ước là 1 và chính nó nên là số nguyên tố; các số còn lại đều là hợp số (21=3×7; 27=3³; 33=3×11).",
    "choiceFeedback": [
     "Sai — 21=3×7 là hợp số.",
     "Đúng — 29 là số nguyên tố.",
     "Sai — 27=3³ là hợp số.",
     "Sai — 33=3×11 là hợp số."
    ]
   },
   {
    "stem": "Hợp số nhỏ nhất là?",
    "choices": [
     "1",
     "2",
     "4",
     "6"
    ],
    "answer": 2,
    "explanation": "4 = 2×2 có nhiều hơn 2 ước (1,2,4) nên là hợp số nhỏ nhất; 2,3 là số nguyên tố, 1 không phải nguyên tố cũng không phải hợp số.",
    "choiceFeedback": [
     "Sai — 1 không là hợp số, không là số nguyên tố.",
     "Sai — 2 là số nguyên tố nhỏ nhất.",
     "Đúng — 4 là hợp số nhỏ nhất.",
     "Sai — 6 lớn hơn 4."
    ]
   },
   {
    "stem": "Trong các số: 19; 23; 29; 21 — đâu là hợp số?",
    "choices": [
     "19",
     "23",
     "29",
     "21"
    ],
    "answer": 3,
    "explanation": "21=3×7 có nhiều hơn 2 ước nên là hợp số; 19, 23, 29 đều là số nguyên tố.",
    "choiceFeedback": [
     "Sai — 19 là số nguyên tố.",
     "Sai — 23 là số nguyên tố.",
     "Sai — 29 là số nguyên tố.",
     "Đúng — 21=3×7 là hợp số."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S6TOAN-exam-ck1": {
  "id": "S6TOAN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 6",
  "questions": [
   {
    "stem": "3^4 bằng?",
    "choices": [
     "12",
     "81",
     "64",
     "34"
    ],
    "answer": 1,
    "explanation": "3^4=3×3×3×3=81.",
    "choiceFeedback": [
     "Sai — 3×4=12 không phải lũy thừa.",
     "Đúng — 3×3×3×3=81.",
     "Sai — nhầm 4^3=64.",
     "Sai — ghép số sai."
    ]
   },
   {
    "stem": "6^3 : 6^1 = ?",
    "choices": [
     "6^2",
     "6^3",
     "6^4",
     "1"
    ],
    "answer": 0,
    "explanation": "Chia cùng cơ số: 3-1=2 → 6^2=36.",
    "choiceFeedback": [
     "Đúng — 6^(3-1)=6^2.",
     "Sai — không trừ số mũ.",
     "Sai — cộng nhầm số mũ.",
     "Sai — nhầm 6^0."
    ]
   },
   {
    "stem": "Tính 30 − 2·(5+3) = ?",
    "choices": [
     "64",
     "22",
     "244",
     "14"
    ],
    "answer": 3,
    "explanation": "Trong ngoặc trước: 5+3=8; nhân: 2×8=16; trừ: 30-16=14.",
    "choiceFeedback": [
     "Sai — nhân nhầm thứ tự không theo ngoặc.",
     "Sai — cộng nhầm dấu.",
     "Sai — ghép nhầm số.",
     "Đúng — 30-16=14."
    ]
   },
   {
    "stem": "Số nào sau chia hết cho cả 3 và 9?",
    "choices": [
     "123",
     "126",
     "128",
     "133"
    ],
    "answer": 1,
    "explanation": "126 có tổng chữ số 1+2+6=9, chia hết cho cả 3 và 9 (126=9×14).",
    "choiceFeedback": [
     "Sai — tổng chữ số 6 chỉ chia hết cho 3, không chia hết cho 9.",
     "Đúng — tổng chữ số 9 chia hết cho cả 3 và 9.",
     "Sai — tổng chữ số 11 không chia hết cho 3 hay 9.",
     "Sai — tổng chữ số 7 không chia hết cho 3 hay 9."
    ]
   },
   {
    "stem": "Trong các số 31; 37; 41; 49 — số nào là hợp số?",
    "choices": [
     "31",
     "37",
     "41",
     "49"
    ],
    "answer": 3,
    "explanation": "49=7×7 có ước 1,7,49 (hơn 2 ước) nên là hợp số; 31,37,41 đều là số nguyên tố.",
    "choiceFeedback": [
     "Sai — 31 là số nguyên tố.",
     "Sai — 37 là số nguyên tố.",
     "Sai — 41 là số nguyên tố.",
     "Đúng — 49=7² là hợp số."
    ]
   },
   {
    "stem": "Tính giá trị biểu thức: 2^3 + 3^2 · 2 = ?",
    "choices": [
     "100",
     "26",
     "44",
     "22"
    ],
    "answer": 1,
    "explanation": "2^3=8; 3^2=9; 9×2=18; 8+18=26.",
    "choiceFeedback": [
     "Sai — nhân nhầm thứ tự (2^3+3)^2.",
     "Đúng — 8+18=26.",
     "Sai — cộng trước nhân sau sai thứ tự.",
     "Sai — tính lũy thừa sai."
    ]
   },
   {
    "stem": "Phân tích 60 ra thừa số nguyên tố?",
    "choices": [
     "2×3×10",
     "2²×3×5",
     "2×30",
     "4×15"
    ],
    "answer": 1,
    "explanation": "60=2×30=2×2×15=2×2×3×5=2²×3×5.",
    "choiceFeedback": [
     "Sai — 10 không phải số nguyên tố.",
     "Đúng — 60=2²×3×5.",
     "Sai — 30 không phải số nguyên tố.",
     "Sai — 4 và 15 không phải số nguyên tố."
    ]
   },
   {
    "stem": "Số 45 = 3² · ?",
    "choices": [
     "3",
     "9",
     "15",
     "5"
    ],
    "answer": 3,
    "explanation": "45=9×5=3²×5, vậy phần còn lại là 5.",
    "choiceFeedback": [
     "Sai — 3²×3=27≠45.",
     "Sai — 3²×9=81≠45.",
     "Sai — 3²×15=135≠45.",
     "Đúng — 45=3²×5."
    ]
   },
   {
    "stem": "ƯCLN(24, 36) = ?",
    "choices": [
     "6",
     "72",
     "12",
     "4"
    ],
    "answer": 2,
    "explanation": "24=2³×3; 36=2²×3²; ƯCLN lấy thừa số chung với số mũ nhỏ nhất: 2²×3=12.",
    "choiceFeedback": [
     "Sai — thiếu thừa số 2.",
     "Sai — đó là BCNN(24,36)=72.",
     "Đúng — ƯCLN(24,36)=12.",
     "Sai — thiếu thừa số 3."
    ]
   },
   {
    "stem": "Hai số 8 và 15 nguyên tố cùng nhau khi?",
    "choices": [
     "ƯCLN(8,15)=1",
     "ƯCLN(8,15)=8",
     "BCNN(8,15)=1",
     "Cả hai đều là số nguyên tố"
    ],
    "answer": 0,
    "explanation": "Hai số nguyên tố cùng nhau là hai số có ƯCLN bằng 1; thật vậy ƯCLN(8,15)=1.",
    "choiceFeedback": [
     "Đúng — đúng định nghĩa và đúng với 8,15.",
     "Sai — ƯCLN(8,15) không phải 8.",
     "Sai — BCNN luôn là số lớn hơn hoặc bằng các số đã cho, không thể bằng 1.",
     "Sai — 8 không phải số nguyên tố, định nghĩa nguyên tố cùng nhau không yêu cầu bản thân là số nguyên tố."
    ]
   },
   {
    "stem": "BCNN(8, 12) = ?",
    "choices": [
     "4",
     "96",
     "24",
     "20"
    ],
    "answer": 2,
    "explanation": "8=2³, 12=2²×3; BCNN lấy thừa số chung và riêng với số mũ lớn nhất: 2³×3=24.",
    "choiceFeedback": [
     "Sai — đó là ƯCLN(8,12).",
     "Sai — đó là tích 8×12, không phải BCNN.",
     "Đúng — BCNN(8,12)=24.",
     "Sai — tính sai."
    ]
   },
   {
    "stem": "Số học sinh xếp hàng đều thành 4 hàng và 6 hàng đều không dư; số học sinh nhỏ nhất khác 0 là?",
    "choices": [
     "10",
     "24",
     "12",
     "6"
    ],
    "answer": 2,
    "explanation": "Số HS phải là bội chung của 4 và 6, nhỏ nhất khác 0 là BCNN(4,6)=12.",
    "choiceFeedback": [
     "Sai — 10 không chia hết cho cả 4 và 6.",
     "Sai — 24 là bội chung nhưng không nhỏ nhất.",
     "Đúng — BCNN(4,6)=12.",
     "Sai — 6 không chia hết cho 4."
    ]
   },
   {
    "stem": "Giá trị tuyệt đối |−9| = ?",
    "choices": [
     "−9",
     "0",
     "9",
     "18"
    ],
    "answer": 2,
    "explanation": "Giá trị tuyệt đối của một số nguyên là khoảng cách từ điểm đó đến 0 trên trục số, luôn không âm: |−9|=9.",
    "choiceFeedback": [
     "Sai — giá trị tuyệt đối không âm.",
     "Sai — chỉ |0|=0.",
     "Đúng — |−9|=9.",
     "Sai — không phải nhân đôi."
    ]
   },
   {
    "stem": "Số đối của −7 là?",
    "choices": [
     "−7",
     "0",
     "1/7",
     "7"
    ],
    "answer": 3,
    "explanation": "Số đối của một số nguyên a là −a; số đối của −7 là −(−7)=7.",
    "choiceFeedback": [
     "Sai — đó là số ban đầu.",
     "Sai — không đúng.",
     "Sai — đó là nghịch đảo, khác số đối.",
     "Đúng — số đối của −7 là 7."
    ]
   },
   {
    "stem": "Sắp xếp tăng dần các số: −2; 3; 0; −7; 1?",
    "choices": [
     "−7;−2;0;1;3",
     "3;1;0;−2;−7",
     "−2;−7;0;1;3",
     "−7;0;−2;1;3"
    ],
    "answer": 0,
    "explanation": "Trên trục số, số càng nhỏ càng ở bên trái; thứ tự tăng dần là −7 < −2 < 0 < 1 < 3.",
    "choiceFeedback": [
     "Đúng — đúng thứ tự tăng dần.",
     "Sai — đây là thứ tự giảm dần.",
     "Sai — sai vị trí −7.",
     "Sai — sai vị trí −2."
    ]
   },
   {
    "stem": "Số liền trước của −5 là?",
    "choices": [
     "−4",
     "−6",
     "4",
     "6"
    ],
    "answer": 1,
    "explanation": "Trên trục số, số liền trước nhỏ hơn 1 đơn vị: −5−1=−6.",
    "choiceFeedback": [
     "Sai — −4 là số liền sau của −5.",
     "Đúng — −6 liền trước −5.",
     "Sai — sai dấu.",
     "Sai — sai hoàn toàn."
    ]
   },
   {
    "stem": "(−12) + 20 = ?",
    "choices": [
     "8",
     "−8",
     "32",
     "−32"
    ],
    "answer": 0,
    "explanation": "Hai số khác dấu, lấy số lớn trừ số nhỏ về giá trị tuyệt đối và giữ dấu số có giá trị tuyệt đối lớn hơn: 20−12=8, dấu dương vì |20|>|−12|.",
    "choiceFeedback": [
     "Đúng — kết quả dương 8.",
     "Sai — sai dấu.",
     "Sai — đó là phép cộng giá trị tuyệt đối, sai quy tắc khác dấu.",
     "Sai — sai cả giá trị và dấu."
    ]
   },
   {
    "stem": "Tính (−25) + (−15) = ?",
    "choices": [
     "40",
     "−10",
     "10",
     "−40"
    ],
    "answer": 3,
    "explanation": "Hai số cùng dấu âm, cộng giá trị tuyệt đối rồi giữ dấu âm: −(25+15)=−40.",
    "choiceFeedback": [
     "Sai — sai dấu.",
     "Sai — đây là phép trừ, không phải cộng.",
     "Sai — sai cả dấu và phép tính.",
     "Đúng — −(25+15)=−40."
    ]
   },
   {
    "stem": "(−7) − 3 = ?",
    "choices": [
     "−10",
     "−4",
     "4",
     "10"
    ],
    "answer": 0,
    "explanation": "Trừ đi 3 tương đương cộng với −3: (−7)+(−3)=−10.",
    "choiceFeedback": [
     "Đúng — (−7)+(−3)=−10.",
     "Sai — tính nhầm dấu.",
     "Sai — sai dấu kết quả.",
     "Sai — sai hoàn toàn."
    ]
   },
   {
    "stem": "(−4) − (−6) = ?",
    "choices": [
     "−10",
     "−2",
     "2",
     "10"
    ],
    "answer": 2,
    "explanation": "Trừ một số âm tương đương cộng với số đối của nó: (−4)−(−6)=(−4)+6=2.",
    "choiceFeedback": [
     "Sai — cộng nhầm dấu.",
     "Sai — sai dấu kết quả.",
     "Đúng — (−4)+6=2.",
     "Sai — tính sai giá trị."
    ]
   },
   {
    "stem": "(−5) · (−6) = ?",
    "choices": [
     "−30",
     "30",
     "−11",
     "11"
    ],
    "answer": 1,
    "explanation": "Tích hai số nguyên cùng dấu (âm × âm) là số dương: 5×6=30.",
    "choiceFeedback": [
     "Sai — sai dấu, cùng dấu cho kết quả dương.",
     "Đúng — (−5)×(−6)=30.",
     "Sai — đây là phép cộng giá trị tuyệt đối, không phải nhân.",
     "Sai — sai cả phép tính lẫn dấu."
    ]
   },
   {
    "stem": "Tính (−2) · 3 · (−5) = ?",
    "choices": [
     "−30",
     "10",
     "−10",
     "30"
    ],
    "answer": 3,
    "explanation": "(−2)×3=−6; (−6)×(−5)=30 (âm×âm=dương).",
    "choiceFeedback": [
     "Sai — sai dấu ở bước nhân cuối.",
     "Sai — tính nhầm giá trị.",
     "Sai — sai cả dấu và giá trị.",
     "Đúng — kết quả là 30."
    ]
   },
   {
    "stem": "(−36) : (−6) = ?",
    "choices": [
     "−6",
     "42",
     "6",
     "−42"
    ],
    "answer": 2,
    "explanation": "Hai số cùng dấu âm chia nhau cho kết quả dương: 36:6=6.",
    "choiceFeedback": [
     "Sai — sai dấu, cùng dấu chia cho dương.",
     "Sai — đó là phép cộng giá trị tuyệt đối.",
     "Đúng — (−36):(−6)=6.",
     "Sai — sai cả dấu và phép tính."
    ]
   },
   {
    "stem": "Tính (−7)·(−2) + 15 : (−5) = ?",
    "choices": [
     "11",
     "−11",
     "17",
     "−17"
    ],
    "answer": 0,
    "explanation": "(−7)×(−2)=14 (cùng dấu); 15:(−5)=−3 (khác dấu); tổng 14+(−3)=11.",
    "choiceFeedback": [
     "Đúng — 14+(−3)=11.",
     "Sai — sai dấu kết quả cuối.",
     "Sai — quên trừ khi cộng số âm.",
     "Sai — sai cả dấu và giá trị."
    ]
   },
   {
    "stem": "Tính giá trị biểu thức: (−4) · (−5) − 12 : 4 = ?",
    "choices": [
     "−17",
     "23",
     "8",
     "17"
    ],
    "answer": 3,
    "explanation": "(−4)×(−5)=20 (cùng dấu); 12:4=3; 20−3=17.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Sai — cộng nhầm thay vì trừ.",
     "Sai — tính nhầm phép nhân đầu.",
     "Đúng — 20−3=17."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S6TOAN-exam-gk2": {
  "id": "S6TOAN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 6",
  "questions": [
   {
    "stem": "Phân số a/b cần điều kiện gì?",
    "choices": [
     "a,b∈Z, b≠0",
     "a,b∈N",
     "a=b",
     "b=0"
    ],
    "answer": 0,
    "explanation": "Phân số a/b có a,b là số nguyên và b khác 0 (b là mẫu số không được bằng 0).",
    "choiceFeedback": [
     "Đúng — đúng điều kiện của phân số.",
     "Sai — a,b có thể là số nguyên âm, không chỉ số tự nhiên.",
     "Sai — không có yêu cầu a=b.",
     "Sai — mẫu số phải khác 0."
    ]
   },
   {
    "stem": "Phân số −5/8 là số?",
    "choices": [
     "Số tự nhiên",
     "Số nguyên",
     "Số hữu tỉ âm",
     "Số hữu tỉ dương"
    ],
    "answer": 2,
    "explanation": "−5/8 có tử âm, mẫu dương nên là một phân số âm, tức số hữu tỉ âm.",
    "choiceFeedback": [
     "Sai — không phải số tự nhiên.",
     "Sai — không phải số nguyên (không chia hết).",
     "Đúng — là số hữu tỉ âm.",
     "Sai — giá trị âm không phải dương."
    ]
   },
   {
    "stem": "Hai phân số a/b = c/d (b,d≠0) khi nào?",
    "choices": [
     "a=c và b=d",
     "a·d = b·c",
     "a+d=b+c",
     "a−b=c−d"
    ],
    "answer": 1,
    "explanation": "Theo định nghĩa, a/b=c/d khi và chỉ khi a·d=b·c (tích chéo bằng nhau).",
    "choiceFeedback": [
     "Sai — không cần bằng từng đôi một, ví dụ 2/4=1/2 nhưng a≠c.",
     "Đúng — điều kiện tích chéo bằng nhau.",
     "Sai — không phải điều kiện đúng.",
     "Sai — không phải điều kiện đúng."
    ]
   },
   {
    "stem": "Hai phân số 4/10 và 6/15 có bằng nhau không?",
    "choices": [
     "Bằng nhau vì 4×15=10×6",
     "Không bằng nhau vì tử số khác nhau",
     "Không bằng nhau vì mẫu số khác nhau",
     "Không xác định được"
    ],
    "answer": 0,
    "explanation": "Xét tích chéo: 4×15=60 và 10×6=60, bằng nhau nên hai phân số bằng nhau (cả hai đều rút gọn về 2/5).",
    "choiceFeedback": [
     "Đúng — tích chéo bằng nhau (60=60).",
     "Sai — tử số khác nhau không có nghĩa là hai phân số khác nhau.",
     "Sai — mẫu số khác nhau không quyết định hai phân số khác nhau.",
     "Sai — có thể xác định được bằng tích chéo hoặc rút gọn."
    ]
   },
   {
    "stem": "Rút gọn 8/12 = ?",
    "choices": [
     "4/6",
     "2/3",
     "1/2",
     "3/4"
    ],
    "answer": 1,
    "explanation": "ƯCLN(8,12)=4; 8:4=2, 12:4=3 → 2/3 (tối giản).",
    "choiceFeedback": [
     "Sai — 4/6 chưa tối giản (còn rút gọn được nữa).",
     "Đúng — 8/12=2/3 (tối giản).",
     "Sai — tính sai.",
     "Sai — tính sai."
    ]
   },
   {
    "stem": "Rút gọn 36/60?",
    "choices": [
     "3/5",
     "6/10",
     "9/15",
     "18/30"
    ],
    "answer": 0,
    "explanation": "ƯCLN(36,60)=12; 36:12=3, 60:12=5, kết quả tối giản là 3/5.",
    "choiceFeedback": [
     "Đúng — 36/60=3/5.",
     "Sai — 6/10 chưa tối giản.",
     "Sai — 9/15 chưa tối giản.",
     "Sai — 18/30 chưa tối giản."
    ]
   },
   {
    "stem": "Phân số nào dưới đây đã tối giản?",
    "choices": [
     "4/8",
     "6/9",
     "5/12",
     "10/15"
    ],
    "answer": 2,
    "explanation": "ƯCLN(5,12)=1 nên 5/12 đã là phân số tối giản; các phân số còn lại đều còn rút gọn được.",
    "choiceFeedback": [
     "Sai — 4/8 rút gọn được thành 1/2.",
     "Sai — 6/9 rút gọn được thành 2/3.",
     "Đúng — 5/12 không rút gọn được nữa.",
     "Sai — 10/15 rút gọn được thành 2/3."
    ]
   },
   {
    "stem": "Mẫu chung nhỏ nhất của 1/4 và 1/6 là?",
    "choices": [
     "24",
     "10",
     "12",
     "6"
    ],
    "answer": 2,
    "explanation": "Mẫu chung nhỏ nhất là BCNN(4,6)=12.",
    "choiceFeedback": [
     "Sai — 24 là bội chung nhưng không nhỏ nhất.",
     "Sai — 10 không chia hết cho cả 4 và 6.",
     "Đúng — BCNN(4,6)=12.",
     "Sai — 6 không chia hết cho 4."
    ]
   },
   {
    "stem": "Trong 5/8 và 7/12, mẫu chung nhỏ nhất là?",
    "choices": [
     "96",
     "20",
     "12",
     "24"
    ],
    "answer": 3,
    "explanation": "8=2³, 12=2²×3 → BCNN=2³×3=24.",
    "choiceFeedback": [
     "Sai — 96 là bội chung nhưng không nhỏ nhất (8×12).",
     "Sai — 20 không chia hết cho cả 8 và 12.",
     "Sai — 12 không chia hết cho 8.",
     "Đúng — BCNN(8,12)=24."
    ]
   },
   {
    "stem": "Phân số nào lớn nhất trong 2/3; 3/5; 4/7?",
    "choices": [
     "2/3",
     "3/5",
     "4/7",
     "Cả ba bằng nhau"
    ],
    "answer": 0,
    "explanation": "Quy đồng hoặc đổi ra số thập phân: 2/3≈0,667; 3/5=0,6; 4/7≈0,571 → 2/3 lớn nhất.",
    "choiceFeedback": [
     "Đúng — 2/3 là phân số lớn nhất.",
     "Sai — 3/5 nhỏ hơn 2/3.",
     "Sai — 4/7 nhỏ nhất trong ba phân số.",
     "Sai — ba phân số có giá trị khác nhau."
    ]
   },
   {
    "stem": "1/2 + 1/3 = ?",
    "choices": [
     "2/5",
     "5/6",
     "1/6",
     "2/6"
    ],
    "answer": 1,
    "explanation": "Quy đồng mẫu 6: 1/2=3/6, 1/3=2/6; tổng =5/6.",
    "choiceFeedback": [
     "Sai — cộng tử và mẫu riêng lẻ là sai.",
     "Đúng — 3/6+2/6=5/6.",
     "Sai — nhầm với phép trừ.",
     "Sai — quên tối giản/tính sai tử."
    ]
   },
   {
    "stem": "5/6 − 1/3 = ?",
    "choices": [
     "4/3",
     "1/2",
     "1/3",
     "4/6"
    ],
    "answer": 1,
    "explanation": "Quy đồng mẫu 6: 1/3=2/6; 5/6−2/6=3/6=1/2 (đã rút gọn).",
    "choiceFeedback": [
     "Sai — trừ nhầm tử và mẫu riêng lẻ.",
     "Đúng — 5/6−2/6=3/6=1/2.",
     "Sai — tính nhầm giá trị.",
     "Sai — chưa rút gọn về dạng tối giản và giá trị chưa đúng."
    ]
   },
   {
    "stem": "Bạn An ăn 1/4 cái bánh, bạn Bình ăn 2/5 cái bánh. Hai bạn ăn tổng cộng?",
    "choices": [
     "3/9",
     "13/20",
     "3/20",
     "1/2"
    ],
    "answer": 1,
    "explanation": "Quy đồng mẫu 20: 1/4=5/20, 2/5=8/20; tổng =13/20.",
    "choiceFeedback": [
     "Sai — cộng tử và mẫu riêng lẻ là sai cách.",
     "Đúng — 5/20+8/20=13/20.",
     "Sai — nhầm thành phép trừ.",
     "Sai — tính sai giá trị."
    ]
   },
   {
    "stem": "(−1/3) + 1/2 = ?",
    "choices": [
     "−1/6",
     "5/6",
     "−5/6",
     "1/6"
    ],
    "answer": 3,
    "explanation": "Quy đồng mẫu 6: −1/3=−2/6, 1/2=3/6; tổng =(−2+3)/6=1/6.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Sai — cộng nhầm tử số.",
     "Sai — sai cả dấu và giá trị.",
     "Đúng — (−2+3)/6=1/6."
    ]
   },
   {
    "stem": "(−2/5) + (−3/5) = ?",
    "choices": [
     "1",
     "−5/10",
     "5/5",
     "−1"
    ],
    "answer": 3,
    "explanation": "Cộng hai phân số cùng mẫu âm: (−2+(−3))/5=−5/5=−1.",
    "choiceFeedback": [
     "Sai — sai dấu.",
     "Sai — không rút gọn đúng, và sai dấu.",
     "Sai — thiếu dấu âm.",
     "Đúng — −5/5=−1."
    ]
   },
   {
    "stem": "Tổng của một phân số và số đối của nó bằng?",
    "choices": [
     "1",
     "Chính phân số đó",
     "Không xác định",
     "0"
    ],
    "answer": 3,
    "explanation": "Theo định nghĩa số đối, a/b + (−a/b) = 0.",
    "choiceFeedback": [
     "Sai — không đúng với mọi phân số.",
     "Sai — kết quả là 0 chứ không giữ nguyên.",
     "Sai — luôn xác định được và bằng 0.",
     "Đúng — một phân số cộng số đối của nó luôn bằng 0."
    ]
   },
   {
    "stem": "2/3 · 4/5 = ?",
    "choices": [
     "6/8",
     "8/8",
     "8/15",
     "6/15"
    ],
    "answer": 2,
    "explanation": "Nhân tử với tử, mẫu với mẫu: (2×4)/(3×5)=8/15.",
    "choiceFeedback": [
     "Sai — tính nhầm tử/mẫu.",
     "Sai — tính sai hoàn toàn.",
     "Đúng — 8/15 là kết quả đúng và đã tối giản.",
     "Sai — nhân nhầm chéo tử mẫu."
    ]
   },
   {
    "stem": "Nghịch đảo của 4/9 là?",
    "choices": [
     "−4/9",
     "4/9",
     "−9/4",
     "9/4"
    ],
    "answer": 3,
    "explanation": "Nghịch đảo của phân số a/b (a,b≠0) là b/a; nghịch đảo của 4/9 là 9/4.",
    "choiceFeedback": [
     "Sai — đó là số đối, không phải nghịch đảo.",
     "Sai — đó là chính phân số ban đầu.",
     "Sai — sai cả dấu và vị trí.",
     "Đúng — nghịch đảo của 4/9 là 9/4."
    ]
   },
   {
    "stem": "(−3/5) · (−10/9) = ?",
    "choices": [
     "−2/3",
     "30/45",
     "−30/45",
     "2/3"
    ],
    "answer": 3,
    "explanation": "Âm nhân âm ra dương: (3×10)/(5×9)=30/45=2/3 (đã rút gọn với ƯCLN=15).",
    "choiceFeedback": [
     "Sai — sai dấu, âm nhân âm phải ra dương.",
     "Sai — đúng giá trị nhưng chưa rút gọn.",
     "Sai — sai dấu và chưa rút gọn.",
     "Đúng — kết quả rút gọn là 2/3."
    ]
   },
   {
    "stem": "2/3 : 4/5 = ?",
    "choices": [
     "8/15",
     "10/12",
     "5/6",
     "6/5"
    ],
    "answer": 2,
    "explanation": "Chia cho phân số bằng nhân với phân số nghịch đảo: 2/3×5/4=10/12=5/6 (đã rút gọn).",
    "choiceFeedback": [
     "Sai — đó là kết quả của phép nhân 2/3×4/5.",
     "Sai — đúng giá trị nhưng chưa rút gọn.",
     "Đúng — kết quả rút gọn là 5/6.",
     "Sai — nhầm phép chia ngược lại."
    ]
   },
   {
    "stem": "Đổi 7/3 ra hỗn số?",
    "choices": [
     "3 1/2",
     "2 1/2",
     "1 1/3",
     "2 1/3"
    ],
    "answer": 3,
    "explanation": "7=3×2+1, nên 7/3 = 2 (phần nguyên) và 1/3 (phần dư trên mẫu): 2 1/3.",
    "choiceFeedback": [
     "Sai — tính nhầm thương và số dư.",
     "Sai — sai phần phân số.",
     "Sai — sai phần nguyên.",
     "Đúng — 7/3=2 1/3."
    ]
   },
   {
    "stem": "(−3/4) : 1/2 = ?",
    "choices": [
     "−3/2",
     "−3/8",
     "3/2",
     "−6/4"
    ],
    "answer": 0,
    "explanation": "Chia cho 1/2 tương đương nhân với 2: (−3/4)×2=−6/4=−3/2 (đã rút gọn).",
    "choiceFeedback": [
     "Đúng — kết quả rút gọn đúng là −3/2.",
     "Sai — nhân nhầm mẫu số thay vì tử số.",
     "Sai — sai dấu.",
     "Sai — đúng giá trị nhưng chưa rút gọn về tối giản."
    ]
   },
   {
    "stem": "Làm tròn 12,46 đến hàng phần mười?",
    "choices": [
     "12,4",
     "12,5",
     "12,46",
     "13"
    ],
    "answer": 1,
    "explanation": "Xét chữ số hàng phần trăm (6) để làm tròn hàng phần mười: vì 6≥5 nên làm tròn lên, 12,46 ≈ 12,5.",
    "choiceFeedback": [
     "Sai — làm tròn xuống là sai vì chữ số hàng phần trăm ≥5.",
     "Đúng — 12,46≈12,5.",
     "Sai — chưa làm tròn.",
     "Sai — làm tròn đến hàng đơn vị chứ không phải hàng phần mười."
    ]
   },
   {
    "stem": "Làm tròn 7,832 đến hàng phần trăm?",
    "choices": [
     "7,84",
     "7,8",
     "7,83",
     "8"
    ],
    "answer": 2,
    "explanation": "Chữ số hàng phần nghìn là 2<5 nên làm tròn xuống, giữ 7,83.",
    "choiceFeedback": [
     "Sai — làm tròn lên là sai vì chữ số hàng phần nghìn <5.",
     "Sai — đó là làm tròn đến hàng phần mười.",
     "Đúng — 7,832≈7,83.",
     "Sai — làm tròn đến hàng đơn vị."
    ]
   },
   {
    "stem": "Số 0,2 bằng phân số nào?",
    "choices": [
     "1/5",
     "2/10",
     "1/2",
     "5"
    ],
    "answer": 0,
    "explanation": "0,2 = 2/10, rút gọn với ƯCLN(2,10)=2 được 1/5.",
    "choiceFeedback": [
     "Đúng — 0,2=1/5 (tối giản).",
     "Sai — đúng giá trị nhưng chưa tối giản.",
     "Sai — nhầm với 0,5.",
     "Sai — sai hoàn toàn."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S6TOAN-exam-ck2": {
  "id": "S6TOAN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 6",
  "kind": "quiz",
  "yearLevel": 6,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 6",
  "questions": [
   {
    "stem": "Rút gọn 16/24?",
    "choices": [
     "4/6",
     "8/12",
     "1/3",
     "2/3"
    ],
    "answer": 3,
    "explanation": "ƯCLN(16,24)=8; 16:8=2,24:8=3 → 2/3.",
    "choiceFeedback": [
     "Sai — chưa tối giản.",
     "Sai — chưa tối giản.",
     "Sai — tính sai.",
     "Đúng — 16/24=2/3 (tối giản)."
    ]
   },
   {
    "stem": "3/4 + 1/6 = ?",
    "choices": [
     "11/12",
     "4/10",
     "4/24",
     "2/5"
    ],
    "answer": 0,
    "explanation": "Quy đồng mẫu 12: 3/4=9/12, 1/6=2/12; tổng=11/12.",
    "choiceFeedback": [
     "Đúng — 9/12+2/12=11/12.",
     "Sai — cộng tử và mẫu riêng lẻ sai cách.",
     "Sai — nhân mẫu số thay vì quy đồng.",
     "Sai — tính sai hoàn toàn."
    ]
   },
   {
    "stem": "(−3/7) + 3/7 = ?",
    "choices": [
     "0",
     "6/7",
     "−6/7",
     "6/14"
    ],
    "answer": 0,
    "explanation": "Một phân số cộng số đối của nó bằng 0: (−3/7)+3/7=0.",
    "choiceFeedback": [
     "Đúng — kết quả bằng 0.",
     "Sai — nhầm là cộng hai phân số cùng dấu.",
     "Sai — sai dấu và sai phép tính.",
     "Sai — sai hoàn toàn."
    ]
   },
   {
    "stem": "5/6 · 3/10 = ?",
    "choices": [
     "8/16",
     "15/60",
     "2/4",
     "1/4"
    ],
    "answer": 3,
    "explanation": "(5×3)/(6×10)=15/60, rút gọn với ƯCLN=15 được 1/4.",
    "choiceFeedback": [
     "Sai — tính sai hoàn toàn.",
     "Sai — đúng giá trị nhưng chưa rút gọn.",
     "Sai — tính sai.",
     "Đúng — kết quả rút gọn là 1/4."
    ]
   },
   {
    "stem": "9/5 : 3 = ?",
    "choices": [
     "3/5",
     "27/5",
     "9/15",
     "3/15"
    ],
    "answer": 0,
    "explanation": "Chia phân số cho số nguyên tương đương nhân với nghịch đảo: 9/5×1/3=9/15=3/5 (rút gọn).",
    "choiceFeedback": [
     "Đúng — kết quả rút gọn là 3/5.",
     "Sai — nhân nhầm thay vì chia.",
     "Sai — đúng giá trị nhưng chưa rút gọn.",
     "Sai — tính nhầm tử số."
    ]
   },
   {
    "stem": "Làm tròn 24,68 đến hàng phần mười?",
    "choices": [
     "24,6",
     "24,7",
     "24,68",
     "25"
    ],
    "answer": 1,
    "explanation": "Chữ số hàng phần trăm là 8≥5 nên làm tròn lên: 24,68≈24,7.",
    "choiceFeedback": [
     "Sai — làm tròn xuống sai vì chữ số hàng phần trăm ≥5.",
     "Đúng — 24,68≈24,7.",
     "Sai — chưa làm tròn.",
     "Sai — làm tròn đến hàng đơn vị."
    ]
   },
   {
    "stem": "Đổi 5/4 ra hỗn số?",
    "choices": [
     "1 1/2",
     "2 1/4",
     "1 1/5",
     "1 1/4"
    ],
    "answer": 3,
    "explanation": "5=4×1+1, nên 5/4=1 1/4.",
    "choiceFeedback": [
     "Sai — tính nhầm phần phân số.",
     "Sai — sai phần nguyên.",
     "Sai — sai phần phân số.",
     "Đúng — 5/4=1 1/4."
    ]
   },
   {
    "stem": "Đổi 2 3/5 ra phân số?",
    "choices": [
     "10/5",
     "23/5",
     "6/5",
     "13/5"
    ],
    "answer": 3,
    "explanation": "2×5+3=13, giữ nguyên mẫu: 2 3/5 = 13/5.",
    "choiceFeedback": [
     "Sai — quên cộng phần dư.",
     "Sai — ghép số sai (23 thay vì 13).",
     "Sai — tính sai phần nguyên.",
     "Đúng — 2 3/5=13/5."
    ]
   },
   {
    "stem": "Tính 25% của 200?",
    "choices": [
     "25",
     "75",
     "100",
     "50"
    ],
    "answer": 3,
    "explanation": "25% của 200 = 200×25/100=50.",
    "choiceFeedback": [
     "Sai — tính nhầm.",
     "Sai — tính nhầm phần trăm.",
     "Sai — tính nhầm gấp đôi.",
     "Đúng — 200×0,25=50."
    ]
   },
   {
    "stem": "Tìm số biết 30% của nó là 60?",
    "choices": [
     "180",
     "20",
     "200",
     "90"
    ],
    "answer": 2,
    "explanation": "Gọi số cần tìm là x: 30%×x=60 → x=60:0,3=200.",
    "choiceFeedback": [
     "Sai — tính nhầm phép chia.",
     "Sai — tính nhầm phép nhân thay vì chia.",
     "Đúng — 60:0,3=200.",
     "Sai — tính sai hoàn toàn."
    ]
   },
   {
    "stem": "Một áo giá 200 nghìn đồng, giảm giá 15%. Giá sau khi giảm là?",
    "choices": [
     "185 nghìn",
     "30 nghìn",
     "215 nghìn",
     "170 nghìn"
    ],
    "answer": 3,
    "explanation": "Số tiền giảm = 200×15%=30 nghìn; giá sau giảm = 200−30=170 nghìn đồng.",
    "choiceFeedback": [
     "Sai — tính nhầm số tiền giảm.",
     "Sai — đó chỉ là số tiền được giảm, chưa phải giá sau giảm.",
     "Sai — cộng nhầm thay vì trừ.",
     "Đúng — 200−30=170 nghìn đồng."
    ]
   },
   {
    "stem": "Lớp có 40 học sinh, 60% là nữ. Số học sinh nữ là?",
    "choices": [
     "24",
     "16",
     "20",
     "60"
    ],
    "answer": 0,
    "explanation": "Số HS nữ = 40×60%=40×0,6=24 (học sinh).",
    "choiceFeedback": [
     "Đúng — 40×0,6=24.",
     "Sai — đó là số HS nam (40−24).",
     "Sai — tính nhầm 40×50%.",
     "Sai — nhầm với con số phần trăm."
    ]
   },
   {
    "stem": "Tăng 50 lên 20% được?",
    "choices": [
     "60",
     "70",
     "10",
     "52"
    ],
    "answer": 0,
    "explanation": "Tăng thêm 20% của 50 là 50×0,2=10; giá trị mới =50+10=60.",
    "choiceFeedback": [
     "Đúng — 50+10=60.",
     "Sai — tính nhầm phần tăng.",
     "Sai — đó chỉ là phần tăng thêm, chưa cộng vào 50.",
     "Sai — cộng nhầm phần trăm dạng số nguyên."
    ]
   },
   {
    "stem": "Qua hai điểm phân biệt có?",
    "choices": [
     "Vô số đường thẳng",
     "Đúng một đường thẳng",
     "Hai đường thẳng",
     "Không có đường thẳng nào"
    ],
    "answer": 1,
    "explanation": "Tiên đề hình học: qua hai điểm phân biệt, có một và chỉ một đường thẳng đi qua.",
    "choiceFeedback": [
     "Sai — chỉ có duy nhất 1 đường thẳng.",
     "Đúng — đúng tiên đề hình học.",
     "Sai — không thể có 2 đường thẳng khác nhau cùng qua 2 điểm đó.",
     "Sai — luôn tồn tại đường thẳng qua 2 điểm phân biệt."
    ]
   },
   {
    "stem": "Hai đường thẳng không có điểm chung gọi là hai đường thẳng?",
    "choices": [
     "Cắt nhau",
     "Trùng nhau",
     "Song song",
     "Vuông góc"
    ],
    "answer": 2,
    "explanation": "Hai đường thẳng phân biệt không có điểm chung được gọi là hai đường thẳng song song.",
    "choiceFeedback": [
     "Sai — cắt nhau có đúng 1 điểm chung.",
     "Sai — trùng nhau có vô số điểm chung.",
     "Đúng — song song không có điểm chung.",
     "Sai — vuông góc là trường hợp đặc biệt của cắt nhau, vẫn có điểm chung."
    ]
   },
   {
    "stem": "M là trung điểm của đoạn thẳng AB khi?",
    "choices": [
     "M nằm giữa A,B",
     "MA=MB",
     "M nằm giữa A và B, đồng thời MA=MB",
     "M trùng với A hoặc B"
    ],
    "answer": 2,
    "explanation": "Trung điểm M của AB phải thỏa cả hai điều kiện: M nằm giữa A,B và cách đều hai đầu mút MA=MB.",
    "choiceFeedback": [
     "Sai — chỉ nằm giữa chưa đủ, cần cách đều.",
     "Sai — chỉ cách đều chưa đủ, cần nằm giữa.",
     "Đúng — đủ cả hai điều kiện.",
     "Sai — trung điểm không trùng với A hay B."
    ]
   },
   {
    "stem": "Cho AB=12 cm, M là trung điểm AB, N là trung điểm AM. Độ dài AN là?",
    "choices": [
     "6 cm",
     "3 cm",
     "4 cm",
     "9 cm"
    ],
    "answer": 1,
    "explanation": "M là trung điểm AB nên AM=12:2=6 cm; N là trung điểm AM nên AN=6:2=3 cm.",
    "choiceFeedback": [
     "Sai — đó là độ dài AM, chưa chia tiếp cho N.",
     "Đúng — AN=AM:2=3 cm.",
     "Sai — tính sai phép chia.",
     "Sai — tính nhầm 3/4 của AB."
    ]
   },
   {
    "stem": "Góc tù là góc có số đo?",
    "choices": [
     "Bằng 90°",
     "Nhỏ hơn 90°",
     "Lớn hơn 90° và nhỏ hơn 180°",
     "Bằng 180°"
    ],
    "answer": 2,
    "explanation": "Góc tù có số đo lớn hơn 90° (góc vuông) và nhỏ hơn 180° (góc bẹt).",
    "choiceFeedback": [
     "Sai — đó là góc vuông.",
     "Sai — đó là góc nhọn.",
     "Đúng — đúng định nghĩa góc tù.",
     "Sai — đó là góc bẹt."
    ]
   },
   {
    "stem": "Tổng số đo hai góc kề bù bằng?",
    "choices": [
     "90°",
     "180°",
     "360°",
     "100°"
    ],
    "answer": 1,
    "explanation": "Hai góc kề bù có tổng số đo bằng 180° (tạo thành một góc bẹt).",
    "choiceFeedback": [
     "Sai — đó là số đo góc vuông, không phải tổng hai góc kề bù.",
     "Đúng — hai góc kề bù tổng bằng 180°.",
     "Sai — đó là tổng số đo góc quanh 1 điểm.",
     "Sai — không có cơ sở."
    ]
   },
   {
    "stem": "Lục giác đều có bao nhiêu cạnh và số đo mỗi góc trong là?",
    "choices": [
     "5 cạnh, 108°",
     "6 cạnh, 108°",
     "8 cạnh, 135°",
     "6 cạnh, 120°"
    ],
    "answer": 3,
    "explanation": "Lục giác đều có 6 cạnh bằng nhau; tổng góc trong = (6−2)×180°=720°, mỗi góc =720°:6=120°.",
    "choiceFeedback": [
     "Sai — đó là số liệu của ngũ giác đều.",
     "Sai — nhầm số đo góc với ngũ giác đều.",
     "Sai — đó là số liệu của bát giác đều.",
     "Đúng — 6 cạnh, mỗi góc 120°."
    ]
   },
   {
    "stem": "Hình vuông cạnh 5 cm có chu vi là?",
    "choices": [
     "10 cm",
     "25 cm",
     "20 cm",
     "15 cm"
    ],
    "answer": 2,
    "explanation": "Chu vi hình vuông = 4×cạnh = 4×5=20 cm.",
    "choiceFeedback": [
     "Sai — đó là 2×cạnh, không phải chu vi.",
     "Sai — đó là diện tích (5×5=25), không phải chu vi.",
     "Đúng — 4×5=20 cm.",
     "Sai — tính nhầm 3×cạnh."
    ]
   },
   {
    "stem": "Trong hình bình hành ABCD, biết AB=6 cm thì CD bằng?",
    "choices": [
     "3 cm",
     "6 cm",
     "12 cm",
     "Không xác định"
    ],
    "answer": 1,
    "explanation": "Trong hình bình hành, các cạnh đối song song và bằng nhau, AB đối diện với CD nên CD=AB=6 cm.",
    "choiceFeedback": [
     "Sai — không có cơ sở chia đôi.",
     "Đúng — cạnh đối của hình bình hành bằng nhau.",
     "Sai — không có cơ sở nhân đôi.",
     "Sai — luôn xác định được nhờ tính chất hình bình hành."
    ]
   },
   {
    "stem": "Hình thang cân là hình thang có?",
    "choices": [
     "Hai cạnh bên bằng nhau",
     "Hai cạnh đáy bằng nhau",
     "Hai đường chéo vuông góc",
     "Bốn cạnh bằng nhau"
    ],
    "answer": 0,
    "explanation": "Hình thang cân là hình thang có hai cạnh bên bằng nhau (đồng thời hai góc kề một đáy bằng nhau).",
    "choiceFeedback": [
     "Đúng — đúng định nghĩa hình thang cân.",
     "Sai — hai cạnh đáy của hình thang thường không bằng nhau.",
     "Sai — không phải tính chất định nghĩa hình thang cân.",
     "Sai — đó có thể là hình thoi hoặc hình vuông, không phải định nghĩa hình thang cân."
    ]
   },
   {
    "stem": "Diện tích hình thang có hai đáy 6 cm và 10 cm, chiều cao 4 cm là?",
    "choices": [
     "64 cm²",
     "40 cm²",
     "32 cm²",
     "20 cm²"
    ],
    "answer": 2,
    "explanation": "Diện tích hình thang = (đáy lớn+đáy nhỏ)×chiều cao : 2 = (6+10)×4:2=32 cm².",
    "choiceFeedback": [
     "Sai — quên chia 2.",
     "Sai — tính nhầm công thức.",
     "Đúng — (6+10)×4:2=32 cm².",
     "Sai — chỉ nhân chiều cao với đáy nhỏ."
    ]
   },
   {
    "stem": "Một mảnh vườn hình chữ nhật dài 20 m, rộng 15 m. Diện tích là?",
    "choices": [
     "70 m²",
     "300 m²",
     "35 m²",
     "150 m²"
    ],
    "answer": 1,
    "explanation": "Diện tích HCN = dài×rộng = 20×15=300 m².",
    "choiceFeedback": [
     "Sai — đó là nửa chu vi, không phải diện tích.",
     "Đúng — 20×15=300 m².",
     "Sai — tính nhầm phép nhân.",
     "Sai — tính nhầm phân nửa."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
