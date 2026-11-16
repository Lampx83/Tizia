// S9TOAN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S9TOAN_EXAMS = {
 "S9TOAN-exam-gk1": {
  "id": "S9TOAN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 9",
  "questions": [
   {
    "stem": "Căn bậc hai số học của 49 là?",
    "choices": [
     "-7",
     "±7",
     "7",
     "14"
    ],
    "answer": 2,
    "explanation": "Căn bậc hai số học của một số không âm a là số x ≥ 0 sao cho x² = a. Vì 7² = 49 và 7 ≥ 0 nên căn bậc hai số học của 49 là 7.",
    "choiceFeedback": [
     "Sai — -7 âm nên không phải là căn bậc hai số học (dù (-7)² = 49).",
     "Sai — ±7 là hai căn bậc hai của 49, nhưng căn bậc hai số học chỉ lấy giá trị không âm.",
     "Đúng — vì 7² = 49 và 7 ≥ 0 nên 7 là căn bậc hai số học của 49.",
     "Sai — 14² = 196 ≠ 49."
    ]
   },
   {
    "stem": "√121 bằng?",
    "choices": [
     "-11",
     "11",
     "121",
     "21"
    ],
    "answer": 1,
    "explanation": "11² = 121 nên √121 = 11 (căn bậc hai số học không âm).",
    "choiceFeedback": [
     "Sai — kết quả căn bậc hai số học không âm.",
     "Đúng — 11² = 121.",
     "Sai — nhầm với số dưới dấu căn.",
     "Sai — 21² = 441 ≠ 121."
    ]
   },
   {
    "stem": "Điều kiện xác định của √(2x − 6) là?",
    "choices": [
     "x ≤ 3",
     "x ≥ -3",
     "x > 3",
     "x ≥ 3"
    ],
    "answer": 3,
    "explanation": "Biểu thức dưới dấu căn phải không âm: 2x − 6 ≥ 0 ⇔ x ≥ 3.",
    "choiceFeedback": [
     "Sai — dấu bất đẳng thức ngược.",
     "Sai — tính sai vế phải.",
     "Sai — thiếu dấu \"=\", vì x = 3 biểu thức vẫn xác định (căn bậc hai của 0).",
     "Đúng — 2x − 6 ≥ 0 ⇔ x ≥ 3."
    ]
   },
   {
    "stem": "√((−9)²) bằng?",
    "choices": [
     "-9",
     "-81",
     "9",
     "81"
    ],
    "answer": 2,
    "explanation": "Với mọi số thực a, √(a²) = |a|. Ở đây a = -9 nên √((-9)²) = |-9| = 9.",
    "choiceFeedback": [
     "Sai — kết quả là giá trị tuyệt đối, không âm.",
     "Sai — sai dấu và chưa khai căn đúng.",
     "Đúng — √((-9)²) = |-9| = 9.",
     "Sai — đó là (-9)² chưa khai căn."
    ]
   },
   {
    "stem": "So sánh √7 và 2,5?",
    "choices": [
     "√7 < 2,5",
     "√7 > 2,5",
     "√7 = 2,5",
     "Không so sánh được"
    ],
    "answer": 1,
    "explanation": "2,5² = 6,25 < 7 nên √7 > 2,5.",
    "choiceFeedback": [
     "Sai — so sánh ngược.",
     "Đúng — 2,5² = 6,25 < 7 nên √7 > 2,5.",
     "Sai — 2,5² ≠ 7.",
     "Sai — hai số thực luôn so sánh được."
    ]
   },
   {
    "stem": "√(a·b) bằng (với a, b ≥ 0)?",
    "choices": [
     "√a · √b",
     "√a + √b",
     "√a − √b",
     "a√b"
    ],
    "answer": 0,
    "explanation": "Với a, b ≥ 0, ta có công thức khai phương một tích: √(ab) = √a · √b.",
    "choiceFeedback": [
     "Đúng — √(ab) = √a · √b với a, b ≥ 0.",
     "Sai — công thức cộng căn như vậy không đúng.",
     "Sai — tương tự, không có công thức trừ căn kiểu này.",
     "Sai — thiếu dấu căn ở a."
    ]
   },
   {
    "stem": "√36 · √4 = ?",
    "choices": [
     "10",
     "6",
     "24",
     "12"
    ],
    "answer": 3,
    "explanation": "√36 = 6, √4 = 2, do đó √36 · √4 = 6 × 2 = 12.",
    "choiceFeedback": [
     "Sai — cộng nhầm 6 + 4 = 10.",
     "Sai — chỉ lấy √36 mà quên nhân với √4.",
     "Sai — tính sai 36 × 4 rồi chưa khai căn đúng.",
     "Đúng — √36 = 6, √4 = 2, 6 × 2 = 12."
    ]
   },
   {
    "stem": "√(81/9) bằng?",
    "choices": [
     "1/3",
     "81/9",
     "3",
     "9"
    ],
    "answer": 2,
    "explanation": "81/9 = 9, do đó √(81/9) = √9 = 3.",
    "choiceFeedback": [
     "Sai — nghịch đảo sai.",
     "Sai — chưa rút gọn phân số/khai căn.",
     "Đúng — 81/9 = 9, √9 = 3.",
     "Sai — chưa khai căn, đó là giá trị 81/9."
    ]
   },
   {
    "stem": "Rút gọn √98?",
    "choices": [
     "2√7",
     "7√2",
     "49√2",
     "14"
    ],
    "answer": 1,
    "explanation": "98 = 49 × 2 nên √98 = √49 · √2 = 7√2.",
    "choiceFeedback": [
     "Sai — phân tích sai thừa số.",
     "Đúng — 98 = 49 · 2 ⇒ √98 = √49 · √2 = 7√2.",
     "Sai — quên khai căn 49.",
     "Sai — 14² = 196 ≠ 98."
    ]
   },
   {
    "stem": "√63 : √7 = ?",
    "choices": [
     "3",
     "9",
     "7",
     "56"
    ],
    "answer": 0,
    "explanation": "√63 : √7 = √(63/7) = √9 = 3.",
    "choiceFeedback": [
     "Đúng — √63 : √7 = √(63/7) = √9 = 3.",
     "Sai — nhầm 63/7 = 9 nhưng quên đã khai căn, kết quả đúng là √9 = 3 chứ không phải 9.",
     "Sai — 63/9 = 7 là phép tính không liên quan phép chia căn này.",
     "Sai — 63 − 7 = 56 không phải là phép chia căn."
    ]
   },
   {
    "stem": "Đưa thừa số ra ngoài dấu căn √75?",
    "choices": [
     "3√5",
     "25√3",
     "5√3",
     "5√15"
    ],
    "answer": 2,
    "explanation": "75 = 25 × 3 nên √75 = √25 · √3 = 5√3.",
    "choiceFeedback": [
     "Sai — nhầm lẫn thừa số trong/ngoài dấu căn.",
     "Sai — quên khai căn của 25.",
     "Đúng — 75 = 25 · 3 ⇒ √75 = 5√3.",
     "Sai — phân tích thừa số sai."
    ]
   },
   {
    "stem": "Trục căn thức ở mẫu: 5/√5 = ?",
    "choices": [
     "1/√5",
     "25",
     "5√5",
     "√5"
    ],
    "answer": 3,
    "explanation": "Nhân cả tử và mẫu với √5: 5/√5 = 5√5/5 = √5.",
    "choiceFeedback": [
     "Sai — chưa trục căn thức ở mẫu.",
     "Sai — bình phương nhầm giá trị.",
     "Sai — tính sai khi rút gọn (5√5/5 phải rút gọn được số 5).",
     "Đúng — nhân tử và mẫu với √5: 5√5/5 = √5."
    ]
   },
   {
    "stem": "Rút gọn 3√2 + √8?",
    "choices": [
     "5√2",
     "4√10",
     "3√10",
     "11√2"
    ],
    "answer": 0,
    "explanation": "√8 = 2√2 nên 3√2 + √8 = 3√2 + 2√2 = 5√2.",
    "choiceFeedback": [
     "Đúng — √8 = 2√2 ⇒ 3√2 + 2√2 = 5√2.",
     "Sai — không được cộng trực tiếp số dưới dấu căn khi chưa đưa về cùng dạng.",
     "Sai — tương tự, phép cộng căn thức sai quy tắc.",
     "Sai — cộng nhầm hệ số của căn."
    ]
   },
   {
    "stem": "Căn bậc ba của −64 là?",
    "choices": [
     "4",
     "-4",
     "-8",
     "8"
    ],
    "answer": 1,
    "explanation": "Vì (-4)³ = -64 nên căn bậc ba của -64 là -4.",
    "choiceFeedback": [
     "Sai — sai dấu, 4³ = 64 chứ không phải -64.",
     "Đúng — (-4)³ = -64.",
     "Sai — (-8)³ = -512 ≠ -64.",
     "Sai — 8³ = 512 ≠ -64."
    ]
   },
   {
    "stem": "∛27 + ∛(−8) = ?",
    "choices": [
     "5",
     "-5",
     "1",
     "-1"
    ],
    "answer": 2,
    "explanation": "∛27 = 3, ∛(-8) = -2, do đó tổng bằng 3 + (-2) = 1.",
    "choiceFeedback": [
     "Sai — tính nhầm ∛(-8) = 2 (sai dấu).",
     "Sai — tính nhầm ∛27 = -3 (sai dấu).",
     "Đúng — ∛27 = 3, ∛(-8) = -2, tổng = 3 + (-2) = 1.",
     "Sai — tính sai một trong hai căn bậc ba."
    ]
   },
   {
    "stem": "Hàm số y = −2x + 7 là hàm số bậc nhất với hệ số góc bằng?",
    "choices": [
     "7",
     "2",
     "-7",
     "-2"
    ],
    "answer": 3,
    "explanation": "Trong hàm số y = ax + b, hệ số góc là a. Ở đây a = -2.",
    "choiceFeedback": [
     "Sai — đó là hệ số tự do b, không phải hệ số góc.",
     "Sai — sai dấu của hệ số góc.",
     "Sai — nhầm dấu và nhầm vị trí hệ số.",
     "Đúng — hệ số góc a = -2 (hệ số của x)."
    ]
   },
   {
    "stem": "Hàm số y = (m−3)x + 1 là hàm bậc nhất khi?",
    "choices": [
     "m ≠ 3",
     "m = 3",
     "m > 3",
     "m ≠ 0"
    ],
    "answer": 0,
    "explanation": "Hàm bậc nhất cần hệ số a ≠ 0, tức m − 3 ≠ 0 ⇔ m ≠ 3.",
    "choiceFeedback": [
     "Đúng — cần hệ số a = m − 3 ≠ 0 ⇔ m ≠ 3.",
     "Sai — khi đó a = 0, không còn là hàm bậc nhất.",
     "Sai — chỉ cần khác 3, không cần lớn hơn 3.",
     "Sai — điều kiện không liên quan trực tiếp kiểu này."
    ]
   },
   {
    "stem": "Hàm số y = 5 − 3x đồng biến hay nghịch biến trên R?",
    "choices": [
     "Đồng biến",
     "Không xác định được",
     "Nghịch biến",
     "Vừa đồng biến vừa nghịch biến"
    ],
    "answer": 2,
    "explanation": "Hệ số góc a = -3 < 0 nên hàm số nghịch biến trên R.",
    "choiceFeedback": [
     "Sai — a = -3 < 0 nên không đồng biến.",
     "Sai — hàm bậc nhất luôn xác định được tính đơn điệu trên R.",
     "Đúng — a = -3 < 0 nên hàm nghịch biến trên R.",
     "Sai — hàm bậc nhất chỉ có một tính chất duy nhất (không đổi trên toàn miền)."
    ]
   },
   {
    "stem": "Tính giá trị của hàm số y = 3x − 4 khi x = −2?",
    "choices": [
     "10",
     "-10",
     "-2",
     "2"
    ],
    "answer": 1,
    "explanation": "y = 3×(-2) − 4 = -6 − 4 = -10.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Đúng — 3×(-2) − 4 = -6 − 4 = -10.",
     "Sai — nhầm với giá trị x.",
     "Sai — tính toán nhầm dấu và giá trị."
    ]
   },
   {
    "stem": "Hệ số góc của đường thẳng y = 4x − 1 là?",
    "choices": [
     "-1",
     "1/4",
     "4",
     "-4"
    ],
    "answer": 2,
    "explanation": "Trong y = ax + b, hệ số góc là a = 4.",
    "choiceFeedback": [
     "Sai — đó là tung độ gốc b.",
     "Sai — nghịch đảo của hệ số góc, không đúng.",
     "Đúng — hệ số góc a = 4.",
     "Sai — sai dấu."
    ]
   },
   {
    "stem": "Hai đường thẳng y = 2x + 3 và y = 2x − 5 có vị trí tương đối?",
    "choices": [
     "Cắt nhau",
     "Song song",
     "Trùng nhau",
     "Vuông góc"
    ],
    "answer": 1,
    "explanation": "Hai đường thẳng có cùng hệ số góc a = 2 nhưng khác tung độ gốc (3 ≠ -5) nên song song.",
    "choiceFeedback": [
     "Sai — song song thì không cắt nhau.",
     "Đúng — cùng hệ số góc a = 2, khác tung độ gốc (3 ≠ -5) nên song song.",
     "Sai — b khác nhau nên không trùng nhau.",
     "Sai — không thoả điều kiện vuông góc a1·a2 = -1."
    ]
   },
   {
    "stem": "Đường thẳng đi qua hai điểm A(1; 3) và B(3; 7) có hệ số góc bằng?",
    "choices": [
     "2",
     "4",
     "1/2",
     "-2"
    ],
    "answer": 0,
    "explanation": "Hệ số góc a = (y_B − y_A)/(x_B − x_A) = (7 − 3)/(3 − 1) = 4/2 = 2.",
    "choiceFeedback": [
     "Đúng — a = (7 − 3)/(3 − 1) = 2.",
     "Sai — nhầm tử số với kết quả, chưa chia cho hiệu hoành độ.",
     "Sai — tính nghịch đảo của kết quả đúng.",
     "Sai — sai dấu."
    ]
   },
   {
    "stem": "Tìm m để đường thẳng y = (2m−1)x + 3 song song với đường thẳng y = 3x − 2?",
    "choices": [
     "m = 1",
     "m = -1",
     "m = 1/2",
     "m = 2"
    ],
    "answer": 3,
    "explanation": "Điều kiện song song: hệ số góc bằng nhau và tung độ gốc khác nhau. 2m − 1 = 3 ⇔ m = 2 (và 3 ≠ -2 nên thoả).",
    "choiceFeedback": [
     "Sai — thay vào a = 2(1) − 1 = 1 ≠ 3.",
     "Sai — a = 2(-1) − 1 = -3 ≠ 3.",
     "Sai — a = 2(1/2) − 1 = 0 ≠ 3.",
     "Đúng — cần 2m − 1 = 3 ⇒ m = 2 (và 3 ≠ -2 nên thoả điều kiện song song)."
    ]
   },
   {
    "stem": "Viết phương trình đường thẳng đi qua điểm A(2; 1) và song song với đường thẳng y = −x + 5?",
    "choices": [
     "y = −x + 3",
     "y = −x + 5",
     "y = x + 3",
     "y = −x − 3"
    ],
    "answer": 0,
    "explanation": "Đường song song có a = -1. Thay A(2;1): 1 = -1×2 + b ⇒ b = 3. Vậy y = -x + 3.",
    "choiceFeedback": [
     "Đúng — hệ số góc a = -1 (song song), thay A(2;1): 1 = -2 + b ⇒ b = 3, được y = -x + 3.",
     "Sai — đây trùng với đường đã cho, không đi qua A(2;1) vì -2 + 5 = 3 ≠ 1.",
     "Sai — hệ số góc sai dấu (a = 1), không song song với đường đã cho.",
     "Sai — tính sai giá trị b."
    ]
   },
   {
    "stem": "Cho hai đường thẳng y = (m+2)x − 1 và y = 3x + 4. Tìm m để hai đường thẳng cắt nhau?",
    "choices": [
     "m = -2",
     "m ≠ 1",
     "m ≠ -2",
     "m = 1"
    ],
    "answer": 1,
    "explanation": "Hai đường thẳng cắt nhau khi hệ số góc khác nhau: m + 2 ≠ 3 ⇔ m ≠ 1.",
    "choiceFeedback": [
     "Sai — khi m = -2, hàm số không còn là bậc nhất theo x (hệ số a = 0).",
     "Đúng — hai đường cắt nhau khi a1 ≠ a2: m + 2 ≠ 3 ⇔ m ≠ 1.",
     "Sai — điều kiện m ≠ -2 chỉ đảm bảo là hàm bậc nhất, không phải điều kiện cắt nhau.",
     "Sai — khi m = 1 thì hai đường song song vì hệ số góc bằng nhau còn tung độ gốc khác nhau (-1 ≠ 4)."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S9TOAN-exam-ck1": {
  "id": "S9TOAN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 9",
  "questions": [
   {
    "stem": "Căn bậc hai số học của 64 là?",
    "choices": [
     "-8",
     "8",
     "±8",
     "16"
    ],
    "answer": 1,
    "explanation": "8² = 64 và 8 ≥ 0 nên căn bậc hai số học của 64 là 8.",
    "choiceFeedback": [
     "Sai — âm không phải là căn bậc hai số học.",
     "Đúng — 8² = 64 và 8 ≥ 0 nên 8 là căn bậc hai số học của 64.",
     "Sai — căn bậc hai số học chỉ lấy giá trị không âm, không viết ±8.",
     "Sai — 16² = 256 ≠ 64."
    ]
   },
   {
    "stem": "Điều kiện xác định của √(5 − x) là?",
    "choices": [
     "x ≥ 5",
     "x < 5",
     "x ≥ -5",
     "x ≤ 5"
    ],
    "answer": 3,
    "explanation": "Biểu thức dưới căn không âm: 5 − x ≥ 0 ⇔ x ≤ 5.",
    "choiceFeedback": [
     "Sai — dấu bất đẳng thức ngược.",
     "Sai — thiếu trường hợp x = 5 (biểu thức vẫn xác định khi bằng 0).",
     "Sai — tính sai vế phải khi chuyển vế.",
     "Đúng — 5 − x ≥ 0 ⇔ x ≤ 5."
    ]
   },
   {
    "stem": "Rút gọn √32?",
    "choices": [
     "2√8",
     "16√2",
     "4√2",
     "8"
    ],
    "answer": 2,
    "explanation": "32 = 16 × 2 nên √32 = √16 · √2 = 4√2.",
    "choiceFeedback": [
     "Sai — chưa khai căn của 8, dạng không tối giản.",
     "Sai — quên khai căn 16.",
     "Đúng — 32 = 16 · 2 ⇒ √32 = 4√2.",
     "Sai — 8² = 64 ≠ 32."
    ]
   },
   {
    "stem": "Trục căn thức ở mẫu: 3/√6 = ?",
    "choices": [
     "√6/2",
     "3√6",
     "6/√6",
     "√6"
    ],
    "answer": 0,
    "explanation": "Nhân tử và mẫu với √6: 3/√6 = 3√6/6, rút gọn được √6/2.",
    "choiceFeedback": [
     "Đúng — nhân tử/mẫu với √6: 3√6/6, rút gọn được √6/2.",
     "Sai — nhân tử/mẫu sai, quên chia lại hệ số.",
     "Sai — chưa trục căn thức đúng cách.",
     "Sai — quên rút gọn phân số 3/6."
    ]
   },
   {
    "stem": "Căn bậc ba của 125 là?",
    "choices": [
     "-5",
     "5",
     "25",
     "15"
    ],
    "answer": 1,
    "explanation": "5³ = 125 nên căn bậc ba của 125 là 5.",
    "choiceFeedback": [
     "Sai — sai dấu.",
     "Đúng — 5³ = 125.",
     "Sai — nhầm với bình phương.",
     "Sai — không đúng."
    ]
   },
   {
    "stem": "Hàm số y = (1 − 2m)x + 3 nghịch biến khi?",
    "choices": [
     "m < 1/2",
     "m = 1/2",
     "m ≠ 1/2",
     "m > 1/2"
    ],
    "answer": 3,
    "explanation": "Hàm nghịch biến khi hệ số a = 1 − 2m < 0 ⇔ m > 1/2.",
    "choiceFeedback": [
     "Sai — khi đó a > 0, hàm đồng biến.",
     "Sai — khi đó a = 0, không còn là hàm số bậc nhất.",
     "Sai — điều kiện này chỉ đảm bảo là hàm bậc nhất, chưa xác định tính đơn điệu.",
     "Đúng — cần a = 1 − 2m < 0 ⇔ m > 1/2."
    ]
   },
   {
    "stem": "Đường thẳng y = ax + b đi qua điểm (0; 4) và song song với đường thẳng y = −2x + 1. Xác định a, b?",
    "choices": [
     "a = 2, b = 4",
     "a = -2, b = 1",
     "a = -2, b = 4",
     "a = -1, b = 4"
    ],
    "answer": 2,
    "explanation": "Song song nên a = -2; đi qua (0;4) nên b = 4.",
    "choiceFeedback": [
     "Sai — sai dấu hệ số góc, không song song.",
     "Sai — nhầm b với hệ số tự do của đường đã cho.",
     "Đúng — song song nên a = -2; đi qua (0;4) nên b = 4.",
     "Sai — hệ số góc sai."
    ]
   },
   {
    "stem": "Hai đường thẳng y = 3x − 2 và y = −x + 6 cắt nhau tại điểm có hoành độ x = ?",
    "choices": [
     "2",
     "-2",
     "1",
     "4"
    ],
    "answer": 0,
    "explanation": "3x − 2 = −x + 6 ⇒ 4x = 8 ⇒ x = 2.",
    "choiceFeedback": [
     "Đúng — 3x − 2 = −x + 6 ⇒ 4x = 8 ⇒ x = 2.",
     "Sai — sai dấu nghiệm.",
     "Sai — tính sai phương trình.",
     "Sai — nhầm hệ số."
    ]
   },
   {
    "stem": "Với giá trị nào của m thì đồ thị hàm số y = (m+3)x − 1 đi qua điểm (1; 4)?",
    "choices": [
     "-2",
     "2",
     "5",
     "-5"
    ],
    "answer": 1,
    "explanation": "Thay (1;4): 4 = (m+3)×1 − 1 ⇒ m + 3 = 5 ⇒ m = 2.",
    "choiceFeedback": [
     "Sai — sai dấu khi giải phương trình.",
     "Đúng — thay (1;4): 4 = (m+3)·1 − 1 ⇒ m+3 = 5 ⇒ m = 2.",
     "Sai — quên trừ 1 ở vế phải khi tìm m.",
     "Sai — sai dấu và giá trị."
    ]
   },
   {
    "stem": "Hệ {x + y = 5; x − y = 1} có nghiệm (x; y) = ?",
    "choices": [
     "(2; 3)",
     "(3; -2)",
     "(-3; 2)",
     "(3; 2)"
    ],
    "answer": 3,
    "explanation": "Cộng hai phương trình: 2x = 6 ⇒ x = 3, thay vào x+y=5 được y = 2.",
    "choiceFeedback": [
     "Sai — hoán đổi x và y.",
     "Sai — sai dấu y.",
     "Sai — sai dấu x.",
     "Đúng — cộng hai PT: 2x = 6 ⇒ x = 3, thay vào y = 2."
    ]
   },
   {
    "stem": "Hệ {2x − y = 3; x + y = 6} giải bằng phương pháp cộng đại số, y = ?",
    "choices": [
     "2",
     "4",
     "3",
     "-3"
    ],
    "answer": 2,
    "explanation": "Cộng hai PT: 3x = 9 ⇒ x = 3, thay vào x+y=6 ⇒ y = 3.",
    "choiceFeedback": [
     "Sai — tính sai khi thay ngược lại.",
     "Sai — tính toán sai.",
     "Đúng — cộng hai PT: 3x = 9 ⇒ x = 3, thay vào x + y = 6 ⇒ y = 3.",
     "Sai — sai dấu."
    ]
   },
   {
    "stem": "Hệ {x = 3 − y; 2x + y = 4} có nghiệm x = ?",
    "choices": [
     "1",
     "2",
     "3",
     "-1"
    ],
    "answer": 0,
    "explanation": "Thế x = 3 − y vào PT2: 2(3−y) + y = 4 ⇒ 6 − y = 4 ⇒ y = 2 ⇒ x = 1.",
    "choiceFeedback": [
     "Đúng — thế x = 3 − y vào PT2: 2(3−y) + y = 4 ⇒ y = 2 ⇒ x = 1.",
     "Sai — nhầm giá trị y với x.",
     "Sai — tính sai khi thế.",
     "Sai — sai dấu."
    ]
   },
   {
    "stem": "Hệ {x + 2y = 8; 2x + 4y = 10} có?",
    "choices": [
     "Vô số nghiệm",
     "Vô nghiệm",
     "Nghiệm duy nhất (2; 3)",
     "Nghiệm duy nhất (0; 4)"
    ],
    "answer": 1,
    "explanation": "Vế trái PT2 gấp đôi PT1 (2x+4y) nhưng vế phải 10 ≠ 2×8 = 16, nên hai đường thẳng song song, hệ vô nghiệm.",
    "choiceFeedback": [
     "Sai — vô số nghiệm chỉ xảy ra khi cả vế phải cũng tỉ lệ đúng theo hệ số.",
     "Đúng — vế trái PT2 gấp đôi PT1 nhưng vế phải 10 ≠ 16, nên hai đường song song, hệ vô nghiệm.",
     "Sai — không thỏa mãn cả hai phương trình khi thử lại.",
     "Sai — không thỏa mãn cả hai phương trình."
    ]
   },
   {
    "stem": "Một khu vườn hình chữ nhật có chu vi 30m, chiều dài hơn chiều rộng 5m. Diện tích khu vườn là?",
    "choices": [
     "44 m²",
     "56 m²",
     "60 m²",
     "50 m²"
    ],
    "answer": 3,
    "explanation": "Gọi chiều rộng x, chiều dài x+5: 2(x + x+5) = 30 ⇒ 2x = 10 ⇒ x = 5, dài = 10. Diện tích = 5×10 = 50 m².",
    "choiceFeedback": [
     "Sai — tính sai một trong hai cạnh.",
     "Sai — tính sai kích thước.",
     "Sai — nhầm công thức chu vi/diện tích.",
     "Đúng — rộng = 5m, dài = 10m (chu vi 30m, dài hơn rộng 5m) ⇒ diện tích = 5×10 = 50 m²."
    ]
   },
   {
    "stem": "Tam giác vuông tại A có AB = 6, AC = 8. Cạnh huyền BC = ?",
    "choices": [
     "14",
     "48",
     "10",
     "7"
    ],
    "answer": 2,
    "explanation": "Theo Pytago: BC = √(AB² + AC²) = √(36+64) = √100 = 10.",
    "choiceFeedback": [
     "Sai — cộng nhầm hai cạnh (6+8) thay vì dùng Pytago.",
     "Sai — nhân hai cạnh (6×8), không đúng công thức.",
     "Đúng — BC = √(AB² + AC²) = √(36+64) = √100 = 10.",
     "Sai — tính sai căn bậc hai."
    ]
   },
   {
    "stem": "sin 30° = ?",
    "choices": [
     "1/2",
     "√3/2",
     "√2/2",
     "1"
    ],
    "answer": 0,
    "explanation": "sin 30° là giá trị lượng giác đặc biệt, bằng 1/2.",
    "choiceFeedback": [
     "Đúng — sin 30° = 1/2 (giá trị lượng giác đặc biệt).",
     "Sai — đó là cos 30° (hay sin 60°).",
     "Sai — đó là sin 45°.",
     "Sai — đó là sin 90°."
    ]
   },
   {
    "stem": "Cho tam giác vuông tại A, AB = 3, AC = 4, BC = 5. tan B = ?",
    "choices": [
     "3/4",
     "4/3",
     "3/5",
     "4/5"
    ],
    "answer": 1,
    "explanation": "tan B = cạnh đối góc B (AC) / cạnh kề góc B (AB) = 4/3.",
    "choiceFeedback": [
     "Sai — đó là tan C (nghịch đảo của tan B).",
     "Đúng — tan B = cạnh đối góc B (AC) / cạnh kề góc B (AB) = 4/3.",
     "Sai — nhầm công thức cos B.",
     "Sai — đó là sin B (đối/huyền)."
    ]
   },
   {
    "stem": "Trong tam giác vuông tại A, AH là đường cao. Hệ thức nào đúng?",
    "choices": [
     "AH² = BH + HC",
     "AH = BH·HC",
     "AH² = BC²",
     "AH² = BH·HC"
    ],
    "answer": 3,
    "explanation": "Hệ thức lượng trong tam giác vuông: bình phương đường cao bằng tích hai hình chiếu, AH² = BH·HC.",
    "choiceFeedback": [
     "Sai — là tích chứ không phải tổng, và phải bình phương AH.",
     "Sai — thiếu bình phương AH.",
     "Sai — không phải hệ thức của đường cao.",
     "Đúng — hệ thức lượng: AH² = BH·HC (bình phương đường cao bằng tích hai hình chiếu)."
    ]
   },
   {
    "stem": "Một cột đèn cao 6m, bóng đổ trên mặt đất dài 6√3 m. Góc tạo bởi tia nắng với mặt đất là?",
    "choices": [
     "45°",
     "60°",
     "30°",
     "90°"
    ],
    "answer": 2,
    "explanation": "tan(góc) = chiều cao/bóng = 6/(6√3) = 1/√3 ⇒ góc = 30°.",
    "choiceFeedback": [
     "Sai — tan 45° = 1 ≠ 1/√3.",
     "Sai — tan 60° = √3 ≠ 1/√3.",
     "Đúng — tan(góc) = 6/(6√3) = 1/√3 ⇒ góc = 30°.",
     "Sai — góc 90° không tạo bóng đổ như vậy."
    ]
   },
   {
    "stem": "Đường tròn (O; 5) có dây AB cách tâm 4. Độ dài AB = ?",
    "choices": [
     "6",
     "3",
     "8",
     "10"
    ],
    "answer": 0,
    "explanation": "Nửa dây = √(R² − d²) = √(25−16) = 3 ⇒ AB = 6.",
    "choiceFeedback": [
     "Đúng — nửa dây = √(R² − d²) = √(25−16) = 3 ⇒ AB = 6.",
     "Sai — đó chỉ là nửa dây, chưa nhân đôi.",
     "Sai — tính sai R² − d².",
     "Sai — nhầm với đường kính."
    ]
   },
   {
    "stem": "Hai tiếp tuyến của đường tròn (O) kẻ từ một điểm M ở ngoài đường tròn tiếp xúc tại A, B. Khẳng định nào đúng?",
    "choices": [
     "MA = 2MB",
     "MA = MB",
     "MA·MB = R²",
     "MA + MB = 2R"
    ],
    "answer": 1,
    "explanation": "Tính chất hai tiếp tuyến cắt nhau: MA = MB.",
    "choiceFeedback": [
     "Sai — không phải tính chất chuẩn của hai tiếp tuyến.",
     "Đúng — tính chất hai tiếp tuyến cắt nhau: MA = MB.",
     "Sai — không phải hệ thức chuẩn.",
     "Sai — không phải tính chất chuẩn."
    ]
   },
   {
    "stem": "Cho hai đường tròn (O; 6) và (O'; 4), khoảng cách OO' = 10. Vị trí tương đối?",
    "choices": [
     "Tiếp xúc trong",
     "Cắt nhau",
     "Ở ngoài nhau",
     "Tiếp xúc ngoài"
    ],
    "answer": 3,
    "explanation": "OO' = R + r (10 = 6+4) nên hai đường tròn tiếp xúc ngoài.",
    "choiceFeedback": [
     "Sai — tiếp xúc trong khi OO' = |R−r| = 2, không phải 10.",
     "Sai — cắt nhau khi |R−r| < OO' < R+r, không thỏa vì OO' bằng đúng R+r.",
     "Sai — ở ngoài nhau khi OO' > R+r = 10, ở đây bằng chứ không lớn hơn.",
     "Đúng — OO' = R+r (10 = 6+4) nên hai đường tròn tiếp xúc ngoài."
    ]
   },
   {
    "stem": "Đường thẳng d cách tâm O một khoảng bằng bán kính R. Khi đó d là?",
    "choices": [
     "Cát tuyến",
     "Không cắt đường tròn",
     "Tiếp tuyến của đường tròn",
     "Đường kính"
    ],
    "answer": 2,
    "explanation": "Khoảng cách từ tâm đến đường thẳng bằng bán kính là điều kiện để đường thẳng là tiếp tuyến.",
    "choiceFeedback": [
     "Sai — cát tuyến khi khoảng cách nhỏ hơn R.",
     "Sai — không cắt khi khoảng cách lớn hơn R.",
     "Đúng — khoảng cách bằng R là điều kiện để d là tiếp tuyến của đường tròn.",
     "Sai — đường kính là dây đi qua tâm, không liên quan khoảng cách này."
    ]
   },
   {
    "stem": "Cho hệ phương trình {mx + y = 3; x + my = 2}. Tìm m để hệ có nghiệm duy nhất?",
    "choices": [
     "m ≠ ±1",
     "m = ±1",
     "m ≠ 0",
     "m = 1"
    ],
    "answer": 0,
    "explanation": "Hệ có nghiệm duy nhất khi định thức m² − 1 ≠ 0 ⇔ m ≠ ±1.",
    "choiceFeedback": [
     "Đúng — hệ có nghiệm duy nhất khi định thức m² − 1 ≠ 0 ⇔ m ≠ ±1.",
     "Sai — đó là điều kiện khiến định thức bằng 0 (hệ vô nghiệm hoặc vô số nghiệm).",
     "Sai — không liên quan trực tiếp đến điều kiện định thức.",
     "Sai — m = 1 là giá trị đặc biệt khiến hệ không có nghiệm duy nhất."
    ]
   },
   {
    "stem": "Cho tam giác ABC vuông tại A, đường cao AH, biết AB = 9, AC = 12. Tính AH.",
    "choices": [
     "6",
     "7,2",
     "8",
     "9,6"
    ],
    "answer": 1,
    "explanation": "BC = √(9²+12²) = √225 = 15. AH = (AB·AC)/BC = (9×12)/15 = 108/15 = 7,2.",
    "choiceFeedback": [
     "Sai — nhầm với một cạnh góc vuông khác.",
     "Đúng — BC = √(9²+12²) = 15; AH = (AB·AC)/BC = (9×12)/15 = 7,2.",
     "Sai — tính sai công thức đường cao.",
     "Sai — tính sai phép chia."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S9TOAN-exam-gk2": {
  "id": "S9TOAN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 9",
  "questions": [
   {
    "stem": "Đồ thị hàm số y = ax² (a ≠ 0) là đường gì?",
    "choices": [
     "Đường thẳng",
     "Hyperbol",
     "Parabol",
     "Đường tròn"
    ],
    "answer": 2,
    "explanation": "Đồ thị hàm số y = ax² (a≠0) là một parabol nhận trục Oy làm trục đối xứng, đỉnh tại gốc tọa độ.",
    "choiceFeedback": [
     "Sai — đường thẳng là đồ thị hàm bậc nhất y = ax+b.",
     "Sai — hyperbol là đồ thị hàm y = a/x.",
     "Đúng — đồ thị hàm số y = ax² (a≠0) là một parabol.",
     "Sai — đường tròn không phải đồ thị của hàm số dạng y = ax²."
    ]
   },
   {
    "stem": "Khi a > 0, parabol y = ax² có bề lõm hướng?",
    "choices": [
     "Xuống dưới",
     "Sang trái",
     "Sang phải",
     "Lên trên"
    ],
    "answer": 3,
    "explanation": "Khi a > 0, mọi giá trị y = ax² ≥ 0 và đồ thị mở rộng lên trên, tức bề lõm hướng lên trên.",
    "choiceFeedback": [
     "Sai — bề lõm xuống dưới xảy ra khi a < 0.",
     "Sai — parabol dạng y = ax² đối xứng qua Oy, không lõm ngang.",
     "Sai — tương tự, không lõm sang phải.",
     "Đúng — khi a > 0, parabol có bề lõm hướng lên trên."
    ]
   },
   {
    "stem": "Tính y khi x = −3 với y = 2x²?",
    "choices": [
     "-18",
     "18",
     "6",
     "-6"
    ],
    "answer": 1,
    "explanation": "y = 2×(-3)² = 2×9 = 18.",
    "choiceFeedback": [
     "Sai — bình phương của số thực luôn không âm nên y không thể âm.",
     "Đúng — y = 2×(-3)² = 2×9 = 18.",
     "Sai — quên bình phương x, chỉ nhân hệ số với |x|.",
     "Sai — sai dấu và tính thiếu bước bình phương."
    ]
   },
   {
    "stem": "Parabol y = −x² có đỉnh là?",
    "choices": [
     "(0; 0)",
     "(1; 0)",
     "(0; -1)",
     "(-1; 0)"
    ],
    "answer": 0,
    "explanation": "Parabol y = -x² có đỉnh tại gốc tọa độ O(0;0) vì y = 0 khi x = 0 và đó là giá trị lớn nhất.",
    "choiceFeedback": [
     "Đúng — đỉnh của y = -x² là gốc tọa độ O(0;0).",
     "Sai — điểm này không thuộc parabol theo đúng vai trò đỉnh.",
     "Sai — không phải đỉnh của parabol này.",
     "Sai — không phải đỉnh của parabol này."
    ]
   },
   {
    "stem": "Điểm nào thuộc đồ thị hàm số y = x²?",
    "choices": [
     "(2; 2)",
     "(-2; -4)",
     "(2; 4)",
     "(4; 2)"
    ],
    "answer": 2,
    "explanation": "Thay x = 2: y = 2² = 4, đúng với điểm (2;4).",
    "choiceFeedback": [
     "Sai — y = 2² = 4 ≠ 2.",
     "Sai — y luôn không âm với hàm y = x², không thể là -4.",
     "Đúng — thay x = 2: y = 2² = 4, đúng với điểm (2;4).",
     "Sai — không thỏa y = x² (4 ≠ 4²)."
    ]
   },
   {
    "stem": "Đồ thị y = 2x² đi qua điểm A(1; m). Giá trị m = ?",
    "choices": [
     "1",
     "4",
     "-2",
     "2"
    ],
    "answer": 3,
    "explanation": "Thay x = 1: y = 2×1² = 2 nên m = 2.",
    "choiceFeedback": [
     "Sai — quên nhân hệ số 2.",
     "Sai — tính nhầm bình phương của hệ số 2.",
     "Sai — sai dấu.",
     "Đúng — thay x = 1: y = 2×1² = 2 nên m = 2."
    ]
   },
   {
    "stem": "Hàm số y = 3x² đồng biến trên khoảng nào?",
    "choices": [
     "(-∞; 0)",
     "(0; +∞)",
     "R",
     "Không đồng biến khoảng nào"
    ],
    "answer": 1,
    "explanation": "Với a = 3 > 0, hàm số đồng biến khi x > 0, tức trên khoảng (0; +∞).",
    "choiceFeedback": [
     "Sai — trên (-∞;0), hàm nghịch biến vì a = 3 > 0.",
     "Đúng — với a > 0, hàm đồng biến khi x > 0, tức trên (0; +∞).",
     "Sai — hàm không đồng biến trên toàn bộ R (nghịch biến khi x<0).",
     "Sai — hàm đồng biến trên (0; +∞)."
    ]
   },
   {
    "stem": "Hai đồ thị y = x² và y = x + 2 cắt nhau tại các điểm có hoành độ là?",
    "choices": [
     "x = 2 hoặc x = -1",
     "x = -2 hoặc x = 1",
     "x = 1 hoặc x = -2",
     "x = 2 hoặc x = 1"
    ],
    "answer": 0,
    "explanation": "Giải x² = x + 2 ⇔ x² − x − 2 = 0 ⇔ (x−2)(x+1) = 0 ⇒ x = 2 hoặc x = -1.",
    "choiceFeedback": [
     "Đúng — x² − x − 2 = 0 ⇔ (x−2)(x+1) = 0 ⇒ x = 2 hoặc x = -1.",
     "Sai — sai dấu nghiệm.",
     "Sai — hoán đổi nghiệm sai dấu.",
     "Sai — không thỏa phương trình x² − x − 2 = 0."
    ]
   },
   {
    "stem": "Biệt thức Δ của phương trình ax² + bx + c = 0 (a ≠ 0) là?",
    "choices": [
     "b² − ac",
     "b² + 4ac",
     "b² − 4ac",
     "4ac − b²"
    ],
    "answer": 2,
    "explanation": "Theo định nghĩa, biệt thức Δ = b² − 4ac.",
    "choiceFeedback": [
     "Sai — thiếu hệ số 4 trước ac.",
     "Sai — sai dấu của 4ac.",
     "Đúng — Δ = b² − 4ac theo định nghĩa.",
     "Sai — sai dấu toàn bộ biểu thức."
    ]
   },
   {
    "stem": "Phương trình bậc hai có nghiệm kép khi?",
    "choices": [
     "Δ > 0",
     "Δ < 0",
     "Δ ≥ 0",
     "Δ = 0"
    ],
    "answer": 3,
    "explanation": "Khi Δ = 0, phương trình có nghiệm kép x = -b/2a.",
    "choiceFeedback": [
     "Sai — Δ > 0 cho hai nghiệm phân biệt.",
     "Sai — Δ < 0 thì phương trình vô nghiệm.",
     "Sai — Δ ≥ 0 gồm cả hai nghiệm phân biệt, không chỉ nghiệm kép.",
     "Đúng — Δ = 0 thì phương trình có nghiệm kép x = -b/2a."
    ]
   },
   {
    "stem": "Phương trình x² − 5x + 6 = 0 có Δ = ?",
    "choices": [
     "49",
     "1",
     "-1",
     "25"
    ],
    "answer": 1,
    "explanation": "Δ = (-5)² − 4×1×6 = 25 − 24 = 1.",
    "choiceFeedback": [
     "Sai — tính sai b² (nhầm bình phương của tổng nghiệm).",
     "Đúng — Δ = (-5)² − 4×1×6 = 25 − 24 = 1.",
     "Sai — sai dấu kết quả.",
     "Sai — quên trừ 4ac, chỉ lấy b²."
    ]
   },
   {
    "stem": "Nghiệm của phương trình x² − 4 = 0 là?",
    "choices": [
     "x = ±2",
     "x = 2",
     "x = -2",
     "x = 4"
    ],
    "answer": 0,
    "explanation": "x² = 4 ⇒ x = ±2.",
    "choiceFeedback": [
     "Đúng — x² = 4 ⇒ x = ±2.",
     "Sai — thiếu nghiệm âm.",
     "Sai — thiếu nghiệm dương.",
     "Sai — nhầm x² = 4 với x = 4."
    ]
   },
   {
    "stem": "Nghiệm của phương trình x² − 5x + 6 = 0 là?",
    "choices": [
     "x = -2 hoặc x = -3",
     "x = 1 hoặc x = 6",
     "x = 2 hoặc x = 3",
     "x = 2 hoặc x = -3"
    ],
    "answer": 2,
    "explanation": "Δ = 1, x = (5 ± 1)/2 ⇒ x = 3 hoặc x = 2.",
    "choiceFeedback": [
     "Sai — sai dấu nghiệm.",
     "Sai — không thỏa phương trình.",
     "Đúng — Δ = 1, x = (5±1)/2 ⇒ x = 3 hoặc x = 2.",
     "Sai — một nghiệm sai dấu."
    ]
   },
   {
    "stem": "Nếu x₁, x₂ là hai nghiệm của ax² + bx + c = 0 (a ≠ 0) thì x₁ + x₂ = ?",
    "choices": [
     "b/a",
     "c/a",
     "-c/a",
     "-b/a"
    ],
    "answer": 3,
    "explanation": "Theo hệ thức Vi-ét, x₁ + x₂ = -b/a.",
    "choiceFeedback": [
     "Sai — sai dấu.",
     "Sai — đó là công thức tích hai nghiệm, không phải tổng.",
     "Sai — sai dấu của công thức tích.",
     "Đúng — theo Vi-ét, x₁ + x₂ = -b/a."
    ]
   },
   {
    "stem": "Không giải phương trình, tính x₁+x₂ và x₁·x₂ của x² − 7x + 10 = 0?",
    "choices": [
     "x₁+x₂=-7, x₁x₂=10",
     "x₁+x₂=7, x₁x₂=10",
     "x₁+x₂=7, x₁x₂=-10",
     "x₁+x₂=-7, x₁x₂=-10"
    ],
    "answer": 1,
    "explanation": "Theo Vi-ét: x₁+x₂ = -b/a = 7, x₁x₂ = c/a = 10.",
    "choiceFeedback": [
     "Sai — sai dấu tổng.",
     "Đúng — theo Vi-ét: x₁+x₂ = 7, x₁x₂ = 10.",
     "Sai — sai dấu tích.",
     "Sai — sai dấu cả hai."
    ]
   },
   {
    "stem": "Tìm hai số có tổng bằng 5 và tích bằng 6?",
    "choices": [
     "2 và 3",
     "1 và 4",
     "-2 và -3",
     "2 và 4"
    ],
    "answer": 0,
    "explanation": "Hai số là nghiệm của x² − 5x + 6 = 0, giải được x = 2 và x = 3 (2+3=5, 2×3=6).",
    "choiceFeedback": [
     "Đúng — hai số là nghiệm của x² − 5x + 6 = 0: x = 2 và x = 3 (2+3=5, 2×3=6).",
     "Sai — 1×4 = 4 ≠ 6.",
     "Sai — tổng -2+(-3) = -5 ≠ 5.",
     "Sai — tích 2×4 = 8 ≠ 6."
    ]
   },
   {
    "stem": "Giải x⁴ − 5x² + 4 = 0. Phương trình có bao nhiêu nghiệm thực?",
    "choices": [
     "2",
     "0",
     "4",
     "3"
    ],
    "answer": 2,
    "explanation": "Đặt t = x² ≥ 0: t² − 5t + 4 = 0 ⇒ (t−1)(t−4)=0 ⇒ t=1 hoặc t=4, cả hai đều dương ⇒ x=±1, ±2: có 4 nghiệm.",
    "choiceFeedback": [
     "Sai — tính thiếu nghiệm.",
     "Sai — phương trình có nghiệm vì cả hai giá trị t=x² tìm được đều dương.",
     "Đúng — đặt t=x²: t²−5t+4=0 ⇒ t=1 hoặc t=4 (đều dương) ⇒ x=±1, ±2: có 4 nghiệm.",
     "Sai — tính thiếu một nghiệm."
    ]
   },
   {
    "stem": "Giải phương trình x − √x − 2 = 0 (x ≥ 0). x = ?",
    "choices": [
     "1",
     "2",
     "0",
     "4"
    ],
    "answer": 3,
    "explanation": "Đặt √x = u ≥ 0: u² − u − 2 = 0 ⇒ (u−2)(u+1)=0 ⇒ u=2 (loại u=-1) ⇒ x = u² = 4.",
    "choiceFeedback": [
     "Sai — không thỏa phương trình khi thay lại.",
     "Sai — nhầm giá trị u (=√x) với x.",
     "Sai — không thỏa phương trình ban đầu.",
     "Đúng — đặt √x = u ≥ 0: u²−u−2=0 ⇒ u=2 (loại u=-1) ⇒ x=u²=4."
    ]
   },
   {
    "stem": "Một số tự nhiên có bình phương lớn hơn chính nó 12 đơn vị. Tìm số đó.",
    "choices": [
     "-3",
     "4",
     "3",
     "6"
    ],
    "answer": 1,
    "explanation": "x² − x = 12 ⇒ x² − x − 12 = 0 ⇒ (x−4)(x+3)=0 ⇒ x=4 (loại x=-3 vì cần số tự nhiên).",
    "choiceFeedback": [
     "Sai — số tự nhiên không âm nên loại nghiệm này.",
     "Đúng — x²−x−12=0 ⇒ (x−4)(x+3)=0 ⇒ x=4 (loại x=-3).",
     "Sai — không thỏa phương trình x²−x=12.",
     "Sai — không thỏa phương trình."
    ]
   },
   {
    "stem": "Tích của hai số tự nhiên liên tiếp là 132. Số nhỏ hơn là?",
    "choices": [
     "11",
     "12",
     "10",
     "13"
    ],
    "answer": 0,
    "explanation": "x(x+1)=132 ⇒ x²+x−132=0 ⇒ Δ=529=23² ⇒ x=(-1+23)/2=11, số kia là 12.",
    "choiceFeedback": [
     "Đúng — x(x+1)=132 ⇒ x²+x−132=0 ⇒ x=11 (số nhỏ), số kia là 12 (11×12=132).",
     "Sai — 12 là số lớn hơn trong cặp.",
     "Sai — 10×11=110≠132.",
     "Sai — 13×14=182≠132."
    ]
   },
   {
    "stem": "Một xe đi quãng đường 120km. Nếu tăng vận tốc 10km/h thì thời gian giảm 1 giờ. Vận tốc ban đầu là?",
    "choices": [
     "40 km/h",
     "20 km/h",
     "30 km/h",
     "50 km/h"
    ],
    "answer": 2,
    "explanation": "120/x − 120/(x+10) = 1 ⇒ x² + 10x − 1200 = 0 ⇒ Δ=4900=70² ⇒ x = (-10+70)/2 = 30 km/h.",
    "choiceFeedback": [
     "Sai — không thỏa phương trình khi thử lại.",
     "Sai — không thỏa phương trình.",
     "Đúng — giải x²+10x−1200=0 ⇒ x=30 km/h.",
     "Sai — không thỏa phương trình."
    ]
   },
   {
    "stem": "Góc ở tâm là góc có đỉnh?",
    "choices": [
     "Nằm trên đường tròn",
     "Nằm ngoài đường tròn",
     "Nằm trên dây cung",
     "Trùng với tâm đường tròn"
    ],
    "answer": 3,
    "explanation": "Góc ở tâm là góc có đỉnh trùng với tâm đường tròn, hai cạnh chứa hai bán kính.",
    "choiceFeedback": [
     "Sai — đó là đặc điểm của góc nội tiếp.",
     "Sai — không đúng định nghĩa góc ở tâm.",
     "Sai — không đúng định nghĩa góc ở tâm.",
     "Đúng — góc ở tâm có đỉnh trùng với tâm đường tròn."
    ]
   },
   {
    "stem": "Góc ở tâm chắn cung AB bằng 70°. Số đo cung nhỏ AB là?",
    "choices": [
     "140°",
     "70°",
     "290°",
     "35°"
    ],
    "answer": 1,
    "explanation": "Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó: 70°.",
    "choiceFeedback": [
     "Sai — không phải gấp đôi ở trường hợp này.",
     "Đúng — số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó: 70°.",
     "Sai — đó là số đo cung lớn (360° − 70°).",
     "Sai — không phải chia đôi."
    ]
   },
   {
    "stem": "Góc nội tiếp chắn nửa đường tròn là góc?",
    "choices": [
     "90°",
     "180°",
     "45°",
     "60°"
    ],
    "answer": 0,
    "explanation": "Góc nội tiếp chắn nửa đường tròn (chắn cung có số đo 180°) bằng 90° theo định lý góc nội tiếp.",
    "choiceFeedback": [
     "Đúng — góc nội tiếp chắn nửa đường tròn bằng 90°.",
     "Sai — 180° là số đo cung bị chắn, không phải số đo góc nội tiếp.",
     "Sai — không đúng với định lý góc nội tiếp chắn nửa đường tròn.",
     "Sai — không đúng với định lý góc nội tiếp chắn nửa đường tròn."
    ]
   },
   {
    "stem": "Tam giác ABC nội tiếp đường tròn (O), biết góc A = 50°. Số đo cung BC nhỏ (không chứa A) là?",
    "choices": [
     "50°",
     "25°",
     "100°",
     "130°"
    ],
    "answer": 2,
    "explanation": "Góc nội tiếp bằng nửa số đo cung bị chắn, nên cung BC = 2×50° = 100°.",
    "choiceFeedback": [
     "Sai — nhầm số đo cung bằng số đo góc.",
     "Sai — nhầm chia đôi thay vì nhân đôi.",
     "Đúng — góc nội tiếp bằng nửa số đo cung bị chắn ⇒ cung BC = 2×50° = 100°.",
     "Sai — không đúng công thức góc nội tiếp - cung."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S9TOAN-exam-ck2": {
  "id": "S9TOAN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 9",
  "questions": [
   {
    "stem": "Parabol y = −2x² có bề lõm hướng nào?",
    "choices": [
     "Lên trên",
     "Xuống dưới",
     "Sang trái",
     "Sang phải"
    ],
    "answer": 1,
    "explanation": "Vì a = -2 < 0 nên parabol có bề lõm hướng xuống dưới.",
    "choiceFeedback": [
     "Sai — bề lõm lên trên xảy ra khi a > 0.",
     "Đúng — a = -2 < 0 nên parabol có bề lõm hướng xuống dưới.",
     "Sai — parabol dạng y = ax² đối xứng qua Oy, không lõm ngang.",
     "Sai — parabol dạng y = ax² đối xứng qua Oy, không lõm ngang."
    ]
   },
   {
    "stem": "Nghiệm của phương trình x² − 9 = 0?",
    "choices": [
     "x = 3",
     "x = -3",
     "x = ±3",
     "x = 9"
    ],
    "answer": 2,
    "explanation": "x² = 9 ⇒ x = ±3.",
    "choiceFeedback": [
     "Sai — thiếu nghiệm âm.",
     "Sai — thiếu nghiệm dương.",
     "Đúng — x² = 9 ⇒ x = ±3.",
     "Sai — nhầm x² = 9 với x = 9."
    ]
   },
   {
    "stem": "Biệt thức Δ của phương trình 2x² − 3x + 1 = 0 là?",
    "choices": [
     "1",
     "17",
     "-1",
     "9"
    ],
    "answer": 0,
    "explanation": "Δ = (-3)² − 4×2×1 = 9 − 8 = 1.",
    "choiceFeedback": [
     "Đúng — Δ = (-3)² − 4×2×1 = 9 − 8 = 1.",
     "Sai — cộng nhầm 4ac thay vì trừ.",
     "Sai — sai dấu kết quả.",
     "Sai — quên trừ 4ac."
    ]
   },
   {
    "stem": "Nghiệm của phương trình 2x² − 3x + 1 = 0 là?",
    "choices": [
     "x=1 hoặc x=-1/2",
     "x=-1 hoặc x=1/2",
     "x=-1 hoặc x=-1/2",
     "x=1 hoặc x=1/2"
    ],
    "answer": 3,
    "explanation": "Δ=1, x = (3±1)/4 ⇒ x=1 hoặc x=1/2.",
    "choiceFeedback": [
     "Sai — sai dấu một nghiệm.",
     "Sai — sai dấu một nghiệm.",
     "Sai — sai dấu cả hai nghiệm.",
     "Đúng — x = (3±1)/4 ⇒ x=1 hoặc x=1/2."
    ]
   },
   {
    "stem": "Phương trình x² − 6x + 8 = 0 có x₁ + x₂ = ?",
    "choices": [
     "8",
     "6",
     "-6",
     "-8"
    ],
    "answer": 1,
    "explanation": "Theo Vi-ét, x₁+x₂ = -b/a = 6.",
    "choiceFeedback": [
     "Sai — đó là tích hai nghiệm x₁x₂ = c/a = 8, không phải tổng.",
     "Đúng — x₁+x₂ = -b/a = 6.",
     "Sai — sai dấu.",
     "Sai — sai dấu."
    ]
   },
   {
    "stem": "Tích hai nghiệm x₁x₂ của phương trình x² + 5x + 6 = 0 là?",
    "choices": [
     "-6",
     "5",
     "6",
     "-5"
    ],
    "answer": 2,
    "explanation": "Theo Vi-ét, x₁x₂ = c/a = 6.",
    "choiceFeedback": [
     "Sai — sai dấu.",
     "Sai — đó là -b nhưng chưa đúng vai trò (đây là -(x₁+x₂)).",
     "Đúng — x₁x₂ = c/a = 6.",
     "Sai — sai dấu và nhầm vai trò với tổng nghiệm."
    ]
   },
   {
    "stem": "Tìm m để phương trình x² − mx + 4 = 0 có nghiệm kép?",
    "choices": [
     "m = ±4",
     "m = 4",
     "m = -4",
     "m = 16"
    ],
    "answer": 0,
    "explanation": "Δ = m² − 16 = 0 ⇔ m = ±4.",
    "choiceFeedback": [
     "Đúng — Δ = m² − 16 = 0 ⇔ m = ±4.",
     "Sai — thiếu một giá trị của m (cả hai dấu đều thỏa).",
     "Sai — thiếu một giá trị của m (cả hai dấu đều thỏa).",
     "Sai — nhầm m² với m."
    ]
   },
   {
    "stem": "Phương trình trùng phương 9x⁴ + 5x² − 4 = 0 có bao nhiêu nghiệm thực?",
    "choices": [
     "4",
     "2",
     "0",
     "1"
    ],
    "answer": 1,
    "explanation": "Đặt t=x²≥0: 9t²+5t−4=0, Δ=169=13², t=(-5±13)/18 ⇒ t=4/9 (nhận) hoặc t=-1 (loại). Vậy có 2 nghiệm x=±2/3.",
    "choiceFeedback": [
     "Sai — không phải cả hai giá trị t đều dương (một giá trị âm bị loại).",
     "Đúng — chỉ có t=4/9>0 thỏa mãn (t=-1 loại), nên có 2 nghiệm x=±2/3.",
     "Sai — phương trình có nghiệm vì tồn tại t dương.",
     "Sai — mỗi giá trị t dương cho 2 nghiệm x đối nhau, không phải 1."
    ]
   },
   {
    "stem": "Một mảnh vườn hình vuông có diện tích 64m². Chu vi mảnh vườn là?",
    "choices": [
     "16m",
     "64m",
     "8m",
     "32m"
    ],
    "answer": 3,
    "explanation": "Cạnh = √64 = 8m, chu vi = 4×8 = 32m.",
    "choiceFeedback": [
     "Sai — nhầm với cạnh nhân 2.",
     "Sai — đó là diện tích, không phải chu vi.",
     "Sai — đó là độ dài một cạnh, chưa nhân 4.",
     "Đúng — cạnh = √64 = 8m, chu vi = 4×8 = 32m."
    ]
   },
   {
    "stem": "Một tam giác vuông có cạnh huyền 13, hiệu hai cạnh góc vuông là 7. Cạnh ngắn hơn là?",
    "choices": [
     "5",
     "12",
     "7",
     "6"
    ],
    "answer": 0,
    "explanation": "Gọi hai cạnh là a và a+7: a² + (a+7)² = 169 ⇒ a² + 7a − 60 = 0 ⇒ Δ=289=17² ⇒ a = 5, cạnh còn lại 12 (5²+12²=169).",
    "choiceFeedback": [
     "Đúng — giải a²+7a−60=0 ⇒ a=5, cạnh còn lại 12 (5²+12²=169).",
     "Sai — đó là cạnh dài hơn (5+7=12).",
     "Sai — đó là hiệu hai cạnh, không phải độ dài cạnh.",
     "Sai — không thỏa phương trình Pytago."
    ]
   },
   {
    "stem": "Một đường tròn được chia bởi 4 điểm cách đều thành 4 cung bằng nhau. Mỗi cung có số đo?",
    "choices": [
     "45°",
     "60°",
     "90°",
     "120°"
    ],
    "answer": 2,
    "explanation": "360° chia đều cho 4 cung: 360°:4 = 90°.",
    "choiceFeedback": [
     "Sai — không đúng khi chia đều 360° cho 4.",
     "Sai — không đúng khi chia đều 360° cho 4.",
     "Đúng — 360° : 4 = 90°.",
     "Sai — không đúng khi chia đều 360° cho 4."
    ]
   },
   {
    "stem": "Trong tứ giác nội tiếp, tổng hai góc đối bằng?",
    "choices": [
     "90°",
     "180°",
     "270°",
     "360°"
    ],
    "answer": 1,
    "explanation": "Định lý tứ giác nội tiếp: tổng hai góc đối bằng 180°.",
    "choiceFeedback": [
     "Sai — không đúng định lý tứ giác nội tiếp.",
     "Đúng — tổng hai góc đối của tứ giác nội tiếp bằng 180°.",
     "Sai — không đúng định lý tứ giác nội tiếp.",
     "Sai — không đúng định lý tứ giác nội tiếp."
    ]
   },
   {
    "stem": "Tứ giác ABCD nội tiếp, góc A = 80°. Góc C = ?",
    "choices": [
     "100°",
     "80°",
     "90°",
     "280°"
    ],
    "answer": 0,
    "explanation": "Góc A + góc C = 180° ⇒ góc C = 180° − 80° = 100°.",
    "choiceFeedback": [
     "Đúng — góc A + góc C = 180° ⇒ góc C = 180° − 80° = 100°.",
     "Sai — góc C không bằng góc A trừ trường hợp đặc biệt.",
     "Sai — không thỏa tổng 180°.",
     "Sai — vượt quá giới hạn góc trong tứ giác."
    ]
   },
   {
    "stem": "Chu vi đường tròn bán kính 5cm (lấy π ≈ 3,14) là?",
    "choices": [
     "15,7 cm",
     "78,5 cm",
     "62,8 cm",
     "31,4 cm"
    ],
    "answer": 3,
    "explanation": "C = 2πR = 2×3,14×5 = 31,4 cm.",
    "choiceFeedback": [
     "Sai — tính thiếu, chưa nhân đủ 2πR.",
     "Sai — đó là diện tích (πR²), không phải chu vi.",
     "Sai — nhầm với đường kính nhân đôi lần nữa.",
     "Đúng — C = 2πR = 2×3,14×5 = 31,4 cm."
    ]
   },
   {
    "stem": "Diện tích hình tròn bán kính 7cm (lấy π = 22/7) là?",
    "choices": [
     "44 cm²",
     "154 cm²",
     "22 cm²",
     "308 cm²"
    ],
    "answer": 1,
    "explanation": "S = πR² = (22/7)×7² = (22/7)×49 = 154 cm².",
    "choiceFeedback": [
     "Sai — tính thiếu, chưa bình phương R đúng cách.",
     "Đúng — S = πR² = (22/7)×49 = 154 cm².",
     "Sai — chỉ lấy hệ số π mà chưa nhân R².",
     "Sai — gấp đôi kết quả đúng do tính nhầm."
    ]
   },
   {
    "stem": "Độ dài cung 60° của đường tròn bán kính R = 6?",
    "choices": [
     "π",
     "3π",
     "2π",
     "4π"
    ],
    "answer": 2,
    "explanation": "l = (πRn°)/180 = (π×6×60)/180 = 2π.",
    "choiceFeedback": [
     "Sai — tính sai tỉ lệ cung theo góc ở tâm.",
     "Sai — tính sai tỉ lệ cung theo góc ở tâm.",
     "Đúng — l = (πRn°)/180 = (π×6×60)/180 = 2π.",
     "Sai — tính sai tỉ lệ cung theo góc ở tâm."
    ]
   },
   {
    "stem": "Diện tích hình quạt 90° của hình tròn bán kính R = 4?",
    "choices": [
     "4π",
     "8π",
     "2π",
     "16π"
    ],
    "answer": 0,
    "explanation": "S = (πR²n°)/360 = (π×16×90)/360 = 4π.",
    "choiceFeedback": [
     "Đúng — S = (πR²n°)/360 = (π×16×90)/360 = 4π.",
     "Sai — tính sai tỉ lệ diện tích quạt theo góc ở tâm.",
     "Sai — tính sai tỉ lệ diện tích quạt theo góc ở tâm.",
     "Sai — tính sai tỉ lệ diện tích quạt theo góc ở tâm."
    ]
   },
   {
    "stem": "Diện tích xung quanh hình trụ có công thức?",
    "choices": [
     "πR²h",
     "2πRh",
     "πRl",
     "4πR²"
    ],
    "answer": 1,
    "explanation": "Diện tích xung quanh hình trụ bằng chu vi đáy nhân chiều cao: S_xq = 2πRh.",
    "choiceFeedback": [
     "Sai — đó không phải công thức diện tích xung quanh (gần giống thể tích nhưng thiếu hệ số).",
     "Đúng — S_xq = 2πRh (chu vi đáy nhân chiều cao).",
     "Sai — đó là công thức diện tích xung quanh hình nón (πRl).",
     "Sai — đó là công thức diện tích mặt cầu."
    ]
   },
   {
    "stem": "Thể tích hình trụ có bán kính đáy R = 3, chiều cao h = 5 (π ≈ 3,14) là?",
    "choices": [
     "47,1",
     "94,2",
     "70,65",
     "141,3"
    ],
    "answer": 3,
    "explanation": "V = πR²h = 3,14×3²×5 = 3,14×9×5 = 141,3.",
    "choiceFeedback": [
     "Sai — thiếu nhân chiều cao đầy đủ hoặc tính sai R².",
     "Sai — tính thiếu một nửa giá trị đúng.",
     "Sai — tính sai một phần.",
     "Đúng — V = πR²h = 3,14×9×5 = 141,3."
    ]
   },
   {
    "stem": "Hình nón có bán kính đáy R = 3, chiều cao h = 4. Đường sinh l = ?",
    "choices": [
     "5",
     "7",
     "25",
     "4"
    ],
    "answer": 0,
    "explanation": "l = √(R²+h²) = √(9+16) = √25 = 5.",
    "choiceFeedback": [
     "Đúng — l = √(R²+h²) = √(9+16) = √25 = 5.",
     "Sai — cộng trực tiếp R+h thay vì dùng Pytago.",
     "Sai — quên khai căn, đó là l².",
     "Sai — nhầm với chiều cao."
    ]
   },
   {
    "stem": "Thể tích hình nón bán kính R = 3, chiều cao h = 4 (π ≈ 3,14) là?",
    "choices": [
     "113,04",
     "37,68",
     "75,36",
     "18,84"
    ],
    "answer": 1,
    "explanation": "V = (1/3)πR²h = (1/3)×3,14×9×4 = (1/3)×113,04 = 37,68.",
    "choiceFeedback": [
     "Sai — quên nhân hệ số 1/3 (đó là kết quả πR²h chưa chia 3).",
     "Đúng — V = (1/3)πR²h = (1/3)×3,14×9×4 = 37,68.",
     "Sai — tính sai hệ số nhân.",
     "Sai — tính thiếu, chia quá nhiều."
    ]
   },
   {
    "stem": "Diện tích mặt cầu bán kính R có công thức?",
    "choices": [
     "πR²",
     "2πR²",
     "4πR²",
     "(4/3)πR³"
    ],
    "answer": 2,
    "explanation": "Diện tích mặt cầu bán kính R là S = 4πR².",
    "choiceFeedback": [
     "Sai — đó là diện tích hình tròn phẳng, không phải mặt cầu.",
     "Sai — thiếu hệ số đúng của công thức mặt cầu.",
     "Đúng — diện tích mặt cầu bán kính R là S = 4πR².",
     "Sai — đó là công thức thể tích khối cầu."
    ]
   },
   {
    "stem": "Một quả bóng hình cầu có thể tích 36π cm³. Bán kính R = ?",
    "choices": [
     "6",
     "9",
     "27",
     "3"
    ],
    "answer": 3,
    "explanation": "(4/3)πR³ = 36π ⇒ R³ = 27 ⇒ R = 3.",
    "choiceFeedback": [
     "Sai — nhầm đường kính với bán kính hoặc tính sai.",
     "Sai — không thỏa phương trình thể tích.",
     "Sai — đó là R³, chưa lấy căn bậc ba.",
     "Đúng — (4/3)πR³=36π ⇒ R³=27 ⇒ R=3."
    ]
   },
   {
    "stem": "Phương trình x² − 2(m−1)x + m² − 3 = 0 có hai nghiệm phân biệt khi?",
    "choices": [
     "m < 2",
     "m > 2",
     "m ≤ 2",
     "m = 2"
    ],
    "answer": 0,
    "explanation": "Δ' = (m−1)² − (m²−3) = -2m+4. Cần Δ' > 0 ⇔ m < 2.",
    "choiceFeedback": [
     "Đúng — Δ' = (m−1)² − (m²−3) = -2m+4; cần Δ'>0 ⇔ m<2.",
     "Sai — sai chiều bất đẳng thức.",
     "Sai — dấu \"=\" ứng với nghiệm kép, không phải hai nghiệm phân biệt.",
     "Sai — m=2 cho Δ'=0, tức nghiệm kép, không phải hai nghiệm phân biệt."
    ]
   },
   {
    "stem": "Hai nghiệm của phương trình x² − 4x + 1 = 0 thoả x₁² + x₂² = ?",
    "choices": [
     "16",
     "14",
     "12",
     "18"
    ],
    "answer": 1,
    "explanation": "Theo Vi-ét: x₁+x₂=4, x₁x₂=1. x₁²+x₂²=(x₁+x₂)²−2x₁x₂=16−2=14.",
    "choiceFeedback": [
     "Sai — quên trừ đi 2x₁x₂.",
     "Đúng — x₁²+x₂²=(x₁+x₂)²−2x₁x₂=4²−2×1=16−2=14.",
     "Sai — trừ nhầm 2×2 thay vì 2×1.",
     "Sai — cộng nhầm thay vì trừ."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
