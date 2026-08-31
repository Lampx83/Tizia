// S8TOAN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định.
// Ráp bởi data/gen-content/assemble-exam.mjs — file này chỉ là NGUỒN SEED.
export const S8TOAN_EXAMS = {
 "S8TOAN-exam-gk1": {
  "id": "S8TOAN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 8",
  "questions": [
   {
    "stem": "Trong các biểu thức sau, biểu thức nào là đơn thức?",
    "choices": [
     "3x²y",
     "x + 2y",
     "1/x",
     "x² + y − 1"
    ],
    "answer": 0,
    "explanation": "Đơn thức là biểu thức chỉ gồm tích của số và biến; 3x²y thỏa mãn.",
    "choiceFeedback": [
     "Đúng — 3x²y chỉ gồm tích của số và các biến, là đơn thức.",
     "Sai — x + 2y là tổng, không phải đơn thức.",
     "Sai — 1/x có biến ở mẫu, không phải đơn thức.",
     "Sai — x² + y − 1 là đa thức (tổng nhiều hạng tử)."
    ]
   },
   {
    "stem": "Hệ số của đơn thức −7x²y là?",
    "choices": [
     "7",
     "−7",
     "2",
     "1"
    ],
    "answer": 1,
    "explanation": "Hệ số là phần số đứng trước các biến, ở đây là −7.",
    "choiceFeedback": [
     "Sai — thiếu dấu âm.",
     "Đúng — hệ số của đơn thức là −7.",
     "Sai — 2 là số mũ của x.",
     "Sai — 1 là số mũ của y."
    ]
   },
   {
    "stem": "Đa thức 3x² − 2xy + y² − 5 có bậc là?",
    "choices": [
     "1",
     "2",
     "3",
     "4"
    ],
    "answer": 1,
    "explanation": "Các hạng tử có bậc lần lượt 2, 2, 2, 0; bậc đa thức là bậc lớn nhất = 2.",
    "choiceFeedback": [
     "Sai — bậc của hạng tử −5 là 0, không phải bậc cả đa thức.",
     "Đúng — hạng tử bậc cao nhất (3x², −2xy, y²) đều có bậc 2.",
     "Sai — không có hạng tử nào bậc 3.",
     "Sai — không có hạng tử nào bậc 4."
    ]
   },
   {
    "stem": "(3x² + 2x − 1) + (x² − 2x + 5) = ?",
    "choices": [
     "4x² + 4",
     "4x² − 4",
     "2x² + 4",
     "4x² + 4x + 4"
    ],
    "answer": 0,
    "explanation": "Cộng theo bậc: (3x²+x²)+(2x−2x)+(−1+5)=4x²+0+4=4x²+4.",
    "choiceFeedback": [
     "Đúng — 4x² + 0x + 4 = 4x² + 4.",
     "Sai — dấu của hằng số bị tính sai.",
     "Sai — thiếu bậc x², phải cộng 3x²+x²=4x².",
     "Sai — hạng tử x triệt tiêu (2x−2x=0), không còn 4x."
    ]
   },
   {
    "stem": "Đa thức đối của 2x² − 3x + 1 là?",
    "choices": [
     "−2x² + 3x − 1",
     "2x² + 3x − 1",
     "−2x² − 3x + 1",
     "2x² − 3x − 1"
    ],
    "answer": 0,
    "explanation": "Đa thức đối đổi dấu tất cả các hạng tử: −2x² + 3x − 1.",
    "choiceFeedback": [
     "Đúng — đổi dấu cả ba hạng tử.",
     "Sai — hạng tử 2x² chưa đổi dấu.",
     "Sai — hạng tử −3x chưa đổi dấu.",
     "Sai — hạng tử +1 chưa đổi dấu."
    ]
   },
   {
    "stem": "(a + b) − (a − b) = ?",
    "choices": [
     "2b",
     "2a",
     "0",
     "a + b"
    ],
    "answer": 0,
    "explanation": "a+b−a+b = 2b.",
    "choiceFeedback": [
     "Đúng — a và −a triệt tiêu, còn lại b+b=2b.",
     "Sai — phần a triệt tiêu (a−a=0), không còn 2a.",
     "Sai — kết quả không triệt tiêu hoàn toàn.",
     "Sai — chưa rút gọn hết biểu thức."
    ]
   },
   {
    "stem": "2x · (3x − 5) = ?",
    "choices": [
     "6x² − 10x",
     "6x² + 10x",
     "6x − 10x",
     "6x² − 10"
    ],
    "answer": 0,
    "explanation": "Nhân phân phối: 2x·3x − 2x·5 = 6x² − 10x.",
    "choiceFeedback": [
     "Đúng — 2x·3x=6x², 2x·5=10x, dấu trừ giữ nguyên.",
     "Sai — dấu của 10x bị đổi sai.",
     "Sai — 2x·3x phải là 6x² chứ không phải 6x.",
     "Sai — 2x·5 = 10x (còn biến x), không phải hằng số 10."
    ]
   },
   {
    "stem": "Tích (a + b)(a − b) = ?",
    "choices": [
     "a² − b²",
     "a² + b²",
     "a² − 2ab + b²",
     "a² + 2ab − b²"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức hiệu hai bình phương: a²−b².",
    "choiceFeedback": [
     "Đúng — đây là hằng đẳng thức hiệu hai bình phương.",
     "Sai — không có dấu trừ giữa hai bình phương như thế.",
     "Sai — đây là khai triển của (a−b)².",
     "Sai — biểu thức có hạng tử ab không xuất hiện ở tích này."
    ]
   },
   {
    "stem": "Hệ số của x² trong tích (x + 3)(x − 5) là?",
    "choices": [
     "1",
     "−2",
     "−15",
     "8"
    ],
    "answer": 0,
    "explanation": "(x+3)(x−5)=x²−2x−15; hệ số của x² là 1.",
    "choiceFeedback": [
     "Đúng — hệ số của x² luôn là 1 vì x·x=x².",
     "Sai — −2 là hệ số của x, không phải x².",
     "Sai — −15 là hạng tử tự do.",
     "Sai — 8 không xuất hiện trong khai triển này."
    ]
   },
   {
    "stem": "(a − b)² = ?",
    "choices": [
     "a² − 2ab + b²",
     "a² + 2ab + b²",
     "a² − b²",
     "a² + b²"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức bình phương của một hiệu.",
    "choiceFeedback": [
     "Đúng — đúng công thức (a−b)².",
     "Sai — đây là công thức (a+b)².",
     "Sai — đây là hiệu hai bình phương.",
     "Sai — thiếu hạng tử −2ab."
    ]
   },
   {
    "stem": "Khai triển (2x − 1)² = ?",
    "choices": [
     "4x² − 4x + 1",
     "4x² + 4x + 1",
     "4x² − 1",
     "2x² − 4x + 1"
    ],
    "answer": 0,
    "explanation": "(2x−1)² = (2x)²−2·2x·1+1² = 4x²−4x+1.",
    "choiceFeedback": [
     "Đúng — 4x²−4x+1 đúng công thức.",
     "Sai — dấu hạng tử giữa phải âm vì (2x−1)².",
     "Sai — thiếu hạng tử giữa −4x.",
     "Sai — (2x)²=4x² chứ không phải 2x²."
    ]
   },
   {
    "stem": "Tính nhanh 101² = ?",
    "choices": [
     "10201",
     "10101",
     "10001",
     "11001"
    ],
    "answer": 0,
    "explanation": "101²=(100+1)²=10000+200+1=10201.",
    "choiceFeedback": [
     "Đúng — 100²+2·100·1+1²=10000+200+1=10201.",
     "Sai — thiếu cộng đúng hạng tử giữa 2·100·1=200.",
     "Sai — thiếu cả hai lần cộng 100.",
     "Sai — tính sai tổng các hạng tử."
    ]
   },
   {
    "stem": "a³ + b³ = ?",
    "choices": [
     "(a + b)(a² − ab + b²)",
     "(a + b)(a² + ab + b²)",
     "(a − b)(a² + ab + b²)",
     "(a − b)(a² − ab + b²)"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức tổng hai lập phương.",
    "choiceFeedback": [
     "Đúng — đúng công thức tổng hai lập phương.",
     "Sai — phải là −ab chứ không phải +ab trong ngoặc.",
     "Sai — nhân tử đầu phải là (a+b) chứ không phải (a−b).",
     "Sai — cả hai nhân tử đều sai dấu."
    ]
   },
   {
    "stem": "Phân tích x³ − 8 = ?",
    "choices": [
     "(x − 2)(x² + 2x + 4)",
     "(x − 2)(x² − 2x + 4)",
     "(x + 2)(x² − 2x + 4)",
     "(x − 2)³"
    ],
    "answer": 0,
    "explanation": "8=2³, dùng hiệu hai lập phương: a=x, b=2.",
    "choiceFeedback": [
     "Đúng — (x−2)(x²+2x+4) đúng công thức a³−b³.",
     "Sai — dấu hạng tử giữa trong ngoặc phải là +2x.",
     "Sai — nhân tử đầu phải là (x−2) chứ không phải (x+2).",
     "Sai — x³−8 không phải lập phương của một hiệu."
    ]
   },
   {
    "stem": "(a + b)³ = ?",
    "choices": [
     "a³ + 3a²b + 3ab² + b³",
     "a³ − 3a²b + 3ab² − b³",
     "a³ + b³",
     "a³ + 3ab² + b³"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức lập phương của một tổng.",
    "choiceFeedback": [
     "Đúng — đúng công thức (a+b)³.",
     "Sai — đây là công thức (a−b)³.",
     "Sai — thiếu các hạng tử trung gian 3a²b và 3ab².",
     "Sai — thiếu hạng tử 3a²b."
    ]
   },
   {
    "stem": "Khai triển (x + 1)³ = ?",
    "choices": [
     "x³ + 3x² + 3x + 1",
     "x³ − 3x² + 3x − 1",
     "x³ + 3x + 1",
     "x³ + 1"
    ],
    "answer": 0,
    "explanation": "(x+1)³=x³+3x²·1+3x·1²+1³=x³+3x²+3x+1.",
    "choiceFeedback": [
     "Đúng — đúng khai triển (x+1)³.",
     "Sai — dấu phải dương vì là lập phương của một tổng.",
     "Sai — thiếu hạng tử 3x².",
     "Sai — đây chỉ là hiệu hai lập phương, thiếu các hạng tử giữa."
    ]
   },
   {
    "stem": "Viết gọn x³ + 9x² + 27x + 27 = ?",
    "choices": [
     "(x + 3)³",
     "(x + 9)³",
     "(x + 27)³",
     "(x − 3)³"
    ],
    "answer": 0,
    "explanation": "9x²=3·x²·3, 27x=3·x·3², 27=3³ nên đây là (x+3)³.",
    "choiceFeedback": [
     "Đúng — đúng công thức (x+3)³ với a=x, b=3.",
     "Sai — 9 là hệ số của x² chứ không phải số hạng b.",
     "Sai — 27 là hạng tử tự do chứ không phải số hạng b.",
     "Sai — các hạng tử đều dương nên không thể là lập phương của một hiệu."
    ]
   },
   {
    "stem": "Phân tích 3x² + 6x = ?",
    "choices": [
     "3x(x + 2)",
     "3x(x + 6)",
     "x(3x + 6)",
     "3(x² + 2x)"
    ],
    "answer": 0,
    "explanation": "NTC là 3x: 3x²+6x=3x·x+3x·2=3x(x+2).",
    "choiceFeedback": [
     "Đúng — 3x là nhân tử chung lớn nhất, còn lại (x+2).",
     "Sai — 6x/3x=2 chứ không phải 6.",
     "Sai — chưa lấy hết nhân tử chung 3.",
     "Sai — chưa lấy hết nhân tử chung x."
    ]
   },
   {
    "stem": "NTC lớn nhất của 12a²b và 18ab² là?",
    "choices": [
     "6ab",
     "6a²b²",
     "36ab",
     "ab"
    ],
    "answer": 0,
    "explanation": "GCD(12,18)=6; phần biến chung là ab (lấy số mũ nhỏ nhất mỗi biến).",
    "choiceFeedback": [
     "Đúng — hệ số GCD=6, biến chung nhỏ nhất là a¹b¹.",
     "Sai — phải lấy số mũ nhỏ nhất của mỗi biến (a¹, b¹), không phải a²b².",
     "Sai — 36 là BCNN của hệ số, không phải ƯCLN.",
     "Sai — thiếu hệ số chung 6."
    ]
   },
   {
    "stem": "Phân tích x³ − x = ?",
    "choices": [
     "x(x − 1)(x + 1)",
     "x(x − 1)²",
     "x(x + 1)²",
     "x²(x − 1)"
    ],
    "answer": 0,
    "explanation": "x³−x=x(x²−1)=x(x−1)(x+1).",
    "choiceFeedback": [
     "Đúng — đặt x làm NTC rồi dùng hiệu hai bình phương.",
     "Sai — x²−1 phân tích thành (x−1)(x+1), không phải bình phương.",
     "Sai — x²−1 phân tích thành (x−1)(x+1), không phải bình phương.",
     "Sai — chưa phân tích hết x²−1 thành nhân tử."
    ]
   },
   {
    "stem": "Phân tích 4x² − 25 = ?",
    "choices": [
     "(2x − 5)(2x + 5)",
     "(2x − 5)²",
     "(4x − 25)(x + 1)",
     "(2x + 5)²"
    ],
    "answer": 0,
    "explanation": "4x²=(2x)², 25=5²: hiệu hai bình phương.",
    "choiceFeedback": [
     "Đúng — (2x)²−5²=(2x−5)(2x+5).",
     "Sai — đây là khai triển bình phương, không phải phân tích hiệu.",
     "Sai — không đúng cách tách nhân tử.",
     "Sai — đây là khai triển bình phương của một tổng."
    ]
   },
   {
    "stem": "Phân tích x² + 4x + 4 − y² = ?",
    "choices": [
     "(x + 2 − y)(x + 2 + y)",
     "(x + 2)(x + 2 − y)",
     "(x − 2 − y)(x − 2 + y)",
     "(x + 2)² − y"
    ],
    "answer": 0,
    "explanation": "x²+4x+4=(x+2)², rồi hiệu hai bình phương với y²: (x+2−y)(x+2+y).",
    "choiceFeedback": [
     "Đúng — nhóm thành (x+2)²−y² rồi phân tích hiệu hai bình phương.",
     "Sai — chưa trừ y² đúng cách theo hằng đẳng thức.",
     "Sai — (x+2)² chứ không phải (x−2)².",
     "Sai — mới khai triển được phần đầu, chưa xử lý −y²."
    ]
   },
   {
    "stem": "Phân tích x³ − 27 = ?",
    "choices": [
     "(x − 3)(x² + 3x + 9)",
     "(x − 3)(x² − 3x + 9)",
     "(x + 3)(x² − 3x + 9)",
     "(x − 3)³"
    ],
    "answer": 0,
    "explanation": "27=3³, dùng hiệu hai lập phương: a=x, b=3.",
    "choiceFeedback": [
     "Đúng — (x−3)(x²+3x+9) đúng công thức a³−b³.",
     "Sai — dấu hạng tử giữa trong ngoặc phải là +3x.",
     "Sai — nhân tử đầu phải là (x−3) chứ không phải (x+3).",
     "Sai — x³−27 không phải lập phương của một hiệu."
    ]
   },
   {
    "stem": "Điều kiện xác định của (x+1)/(x−2) là?",
    "choices": [
     "x ≠ 2",
     "x ≠ −1",
     "x ≠ −2",
     "x ≠ 1"
    ],
    "answer": 0,
    "explanation": "Mẫu x−2 ≠ 0 ⇔ x ≠ 2.",
    "choiceFeedback": [
     "Đúng — mẫu x−2 khác 0 khi x≠2.",
     "Sai — −1 là nghiệm làm tử bằng 0, không ảnh hưởng ĐKXĐ.",
     "Sai — không liên quan đến mẫu thức đã cho.",
     "Sai — không liên quan đến mẫu thức đã cho."
    ]
   },
   {
    "stem": "Rút gọn (2x)/(4x²) (x≠0) = ?",
    "choices": [
     "1/(2x)",
     "2/x",
     "1/(4x)",
     "x/2"
    ],
    "answer": 0,
    "explanation": "Chia cả tử và mẫu cho 2x: (2x)/(4x²)=1/(2x).",
    "choiceFeedback": [
     "Đúng — chia tử và mẫu cho NTC 2x được 1/(2x).",
     "Sai — chưa rút gọn hết, còn dư hệ số.",
     "Sai — mẫu phải còn lại 2x chứ không phải 4x.",
     "Sai — đã rút gọn ngược tử và mẫu."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S8TOAN-exam-ck1": {
  "id": "S8TOAN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 8",
  "questions": [
   {
    "stem": "Trong các biểu thức sau, biểu thức nào là đơn thức?",
    "choices": [
     "3x²y",
     "x + 2y",
     "1/x",
     "x² + y − 1"
    ],
    "answer": 0,
    "explanation": "Đơn thức là biểu thức chỉ gồm tích của số và biến; 3x²y thỏa mãn.",
    "choiceFeedback": [
     "Đúng — 3x²y chỉ gồm tích của số và các biến, là đơn thức.",
     "Sai — x + 2y là tổng, không phải đơn thức.",
     "Sai — 1/x có biến ở mẫu, không phải đơn thức.",
     "Sai — x² + y − 1 là đa thức (tổng nhiều hạng tử)."
    ]
   },
   {
    "stem": "Đa thức 3x² − 2xy + y² − 5 có bậc là?",
    "choices": [
     "1",
     "2",
     "3",
     "4"
    ],
    "answer": 1,
    "explanation": "Các hạng tử có bậc lần lượt 2, 2, 2, 0; bậc đa thức là bậc lớn nhất = 2.",
    "choiceFeedback": [
     "Sai — bậc của hạng tử −5 là 0, không phải bậc cả đa thức.",
     "Đúng — hạng tử bậc cao nhất (3x², −2xy, y²) đều có bậc 2.",
     "Sai — không có hạng tử nào bậc 3.",
     "Sai — không có hạng tử nào bậc 4."
    ]
   },
   {
    "stem": "Đa thức đối của 2x² − 3x + 1 là?",
    "choices": [
     "−2x² + 3x − 1",
     "2x² + 3x − 1",
     "−2x² − 3x + 1",
     "2x² − 3x − 1"
    ],
    "answer": 0,
    "explanation": "Đa thức đối đổi dấu tất cả các hạng tử: −2x² + 3x − 1.",
    "choiceFeedback": [
     "Đúng — đổi dấu cả ba hạng tử.",
     "Sai — hạng tử 2x² chưa đổi dấu.",
     "Sai — hạng tử −3x chưa đổi dấu.",
     "Sai — hạng tử +1 chưa đổi dấu."
    ]
   },
   {
    "stem": "2x · (3x − 5) = ?",
    "choices": [
     "6x² − 10x",
     "6x² + 10x",
     "6x − 10x",
     "6x² − 10"
    ],
    "answer": 0,
    "explanation": "Nhân phân phối: 2x·3x − 2x·5 = 6x² − 10x.",
    "choiceFeedback": [
     "Đúng — 2x·3x=6x², 2x·5=10x, dấu trừ giữ nguyên.",
     "Sai — dấu của 10x bị đổi sai.",
     "Sai — 2x·3x phải là 6x² chứ không phải 6x.",
     "Sai — 2x·5 = 10x (còn biến x), không phải hằng số 10."
    ]
   },
   {
    "stem": "Hệ số của x² trong tích (x + 3)(x − 5) là?",
    "choices": [
     "1",
     "−2",
     "−15",
     "8"
    ],
    "answer": 0,
    "explanation": "(x+3)(x−5)=x²−2x−15; hệ số của x² là 1.",
    "choiceFeedback": [
     "Đúng — hệ số của x² luôn là 1 vì x·x=x².",
     "Sai — −2 là hệ số của x, không phải x².",
     "Sai — −15 là hạng tử tự do.",
     "Sai — 8 không xuất hiện trong khai triển này."
    ]
   },
   {
    "stem": "Khai triển (2x − 1)² = ?",
    "choices": [
     "4x² − 4x + 1",
     "4x² + 4x + 1",
     "4x² − 1",
     "2x² − 4x + 1"
    ],
    "answer": 0,
    "explanation": "(2x−1)² = (2x)²−2·2x·1+1² = 4x²−4x+1.",
    "choiceFeedback": [
     "Đúng — 4x²−4x+1 đúng công thức.",
     "Sai — dấu hạng tử giữa phải âm vì (2x−1)².",
     "Sai — thiếu hạng tử giữa −4x.",
     "Sai — (2x)²=4x² chứ không phải 2x²."
    ]
   },
   {
    "stem": "a³ + b³ = ?",
    "choices": [
     "(a + b)(a² − ab + b²)",
     "(a + b)(a² + ab + b²)",
     "(a − b)(a² + ab + b²)",
     "(a − b)(a² − ab + b²)"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức tổng hai lập phương.",
    "choiceFeedback": [
     "Đúng — đúng công thức tổng hai lập phương.",
     "Sai — phải là −ab chứ không phải +ab trong ngoặc.",
     "Sai — nhân tử đầu phải là (a+b) chứ không phải (a−b).",
     "Sai — cả hai nhân tử đều sai dấu."
    ]
   },
   {
    "stem": "(a + b)³ = ?",
    "choices": [
     "a³ + 3a²b + 3ab² + b³",
     "a³ − 3a²b + 3ab² − b³",
     "a³ + b³",
     "a³ + 3ab² + b³"
    ],
    "answer": 0,
    "explanation": "Hằng đẳng thức lập phương của một tổng.",
    "choiceFeedback": [
     "Đúng — đúng công thức (a+b)³.",
     "Sai — đây là công thức (a−b)³.",
     "Sai — thiếu các hạng tử trung gian 3a²b và 3ab².",
     "Sai — thiếu hạng tử 3a²b."
    ]
   },
   {
    "stem": "Viết gọn x³ + 9x² + 27x + 27 = ?",
    "choices": [
     "(x + 3)³",
     "(x + 9)³",
     "(x + 27)³",
     "(x − 3)³"
    ],
    "answer": 0,
    "explanation": "9x²=3·x²·3, 27x=3·x·3², 27=3³ nên đây là (x+3)³.",
    "choiceFeedback": [
     "Đúng — đúng công thức (x+3)³ với a=x, b=3.",
     "Sai — 9 là hệ số của x² chứ không phải số hạng b.",
     "Sai — 27 là hạng tử tự do chứ không phải số hạng b.",
     "Sai — các hạng tử đều dương nên không thể là lập phương của một hiệu."
    ]
   },
   {
    "stem": "NTC lớn nhất của 12a²b và 18ab² là?",
    "choices": [
     "6ab",
     "6a²b²",
     "36ab",
     "ab"
    ],
    "answer": 0,
    "explanation": "GCD(12,18)=6; phần biến chung là ab (lấy số mũ nhỏ nhất mỗi biến).",
    "choiceFeedback": [
     "Đúng — hệ số GCD=6, biến chung nhỏ nhất là a¹b¹.",
     "Sai — phải lấy số mũ nhỏ nhất của mỗi biến (a¹, b¹), không phải a²b².",
     "Sai — 36 là BCNN của hệ số, không phải ƯCLN.",
     "Sai — thiếu hệ số chung 6."
    ]
   },
   {
    "stem": "Phân tích 4x² − 25 = ?",
    "choices": [
     "(2x − 5)(2x + 5)",
     "(2x − 5)²",
     "(4x − 25)(x + 1)",
     "(2x + 5)²"
    ],
    "answer": 0,
    "explanation": "4x²=(2x)², 25=5²: hiệu hai bình phương.",
    "choiceFeedback": [
     "Đúng — (2x)²−5²=(2x−5)(2x+5).",
     "Sai — đây là khai triển bình phương, không phải phân tích hiệu.",
     "Sai — không đúng cách tách nhân tử.",
     "Sai — đây là khai triển bình phương của một tổng."
    ]
   },
   {
    "stem": "Phân tích x³ − 27 = ?",
    "choices": [
     "(x − 3)(x² + 3x + 9)",
     "(x − 3)(x² − 3x + 9)",
     "(x + 3)(x² − 3x + 9)",
     "(x − 3)³"
    ],
    "answer": 0,
    "explanation": "27=3³, dùng hiệu hai lập phương: a=x, b=3.",
    "choiceFeedback": [
     "Đúng — (x−3)(x²+3x+9) đúng công thức a³−b³.",
     "Sai — dấu hạng tử giữa trong ngoặc phải là +3x.",
     "Sai — nhân tử đầu phải là (x−3) chứ không phải (x+3).",
     "Sai — x³−27 không phải lập phương của một hiệu."
    ]
   },
   {
    "stem": "Rút gọn (2x)/(4x²) (x≠0) = ?",
    "choices": [
     "1/(2x)",
     "2/x",
     "1/(4x)",
     "x/2"
    ],
    "answer": 0,
    "explanation": "Chia cả tử và mẫu cho 2x: (2x)/(4x²)=1/(2x).",
    "choiceFeedback": [
     "Đúng — chia tử và mẫu cho NTC 2x được 1/(2x).",
     "Sai — chưa rút gọn hết, còn dư hệ số.",
     "Sai — mẫu phải còn lại 2x chứ không phải 4x.",
     "Sai — đã rút gọn ngược tử và mẫu."
    ]
   },
   {
    "stem": "Để cộng a/x + b/y (x,y khác 0), MC là?",
    "choices": [
     "xy",
     "x + y",
     "x − y",
     "a + b"
    ],
    "answer": 0,
    "explanation": "Mẫu chung của hai phân thức khác mẫu là tích các mẫu: xy.",
    "choiceFeedback": [
     "Đúng — mẫu chung nhỏ nhất khi x,y không có nhân tử chung là xy.",
     "Sai — MC phải là tích các mẫu, không phải tổng.",
     "Sai — MC phải là tích các mẫu, không phải hiệu.",
     "Sai — đây là liên quan đến tử, không phải mẫu chung."
    ]
   },
   {
    "stem": "(2/3) · (5/4) = ?",
    "choices": [
     "5/6",
     "10/12",
     "10/7",
     "7/12"
    ],
    "answer": 0,
    "explanation": "2·5/(3·4)=10/12=5/6 (đã rút gọn).",
    "choiceFeedback": [
     "Đúng — 10/12 rút gọn còn 5/6.",
     "Sai — đây là kết quả chưa rút gọn, nên chọn dạng tối giản 5/6.",
     "Sai — mẫu số phải nhân (3·4=12), không cộng (3+4=7).",
     "Sai — tử số phải nhân (2·5=10), không cộng (2+5=7)."
    ]
   },
   {
    "stem": "(3/x) : (6/x²) (x≠0) = ?",
    "choices": [
     "x/2",
     "2/x",
     "18/x³",
     "1/(2x)"
    ],
    "answer": 0,
    "explanation": "(3/x)·(x²/6)=3x²/(6x)=x/2.",
    "choiceFeedback": [
     "Đúng — nhân với nghịch đảo rồi rút gọn còn x/2.",
     "Sai — nhầm chiều rút gọn của biến x.",
     "Sai — đây là tích nếu không rút gọn, chưa phải kết quả cuối.",
     "Sai — rút gọn nhầm phần biến."
    ]
   },
   {
    "stem": "Giải 5x − 2 = 3x + 8?",
    "choices": [
     "x = 5",
     "x = 3",
     "x = −5",
     "x = 10"
    ],
    "answer": 0,
    "explanation": "5x−3x=8+2 ⇒ 2x=10 ⇒ x=5.",
    "choiceFeedback": [
     "Đúng — 2x=10 ⇒ x=5.",
     "Sai — tính sai khi chuyển vế các hạng tử.",
     "Sai — nhầm dấu kết quả.",
     "Sai — quên chia cho hệ số 2."
    ]
   },
   {
    "stem": "Hai lần một số cộng 5 bằng 23. Số đó là?",
    "choices": [
     "9",
     "18",
     "14",
     "23"
    ],
    "answer": 0,
    "explanation": "2x+5=23 ⇒ 2x=18 ⇒ x=9.",
    "choiceFeedback": [
     "Đúng — 2x=18 ⇒ x=9.",
     "Sai — đây là giá trị 2x, chưa chia 2.",
     "Sai — tính sai phép trừ 23−5.",
     "Sai — đây là vế phải của phương trình, không phải nghiệm."
    ]
   },
   {
    "stem": "Sau bài toán, cần làm gì?",
    "choices": [
     "Đối chiếu điều kiện và kết luận",
     "Không cần làm gì thêm",
     "Lập lại phương trình khác",
     "Chỉ cần giải phương trình"
    ],
    "answer": 0,
    "explanation": "Bước 3: kiểm tra nghiệm có thỏa điều kiện bài toán rồi kết luận.",
    "choiceFeedback": [
     "Đúng — cần đối chiếu điều kiện ban đầu rồi kết luận đáp số.",
     "Sai — nếu không kiểm tra có thể chọn nghiệm không phù hợp thực tế.",
     "Sai — không cần lập phương trình khác nếu đã giải đúng.",
     "Sai — giải xong PT chưa chắc là đáp số cuối cùng của bài toán."
    ]
   },
   {
    "stem": "Đường trung bình của hình thang có tính chất?",
    "choices": [
     "Song song hai đáy và bằng nửa tổng hai đáy",
     "Vuông góc hai đáy",
     "Bằng hiệu hai đáy",
     "Bằng tổng hai đáy"
    ],
    "answer": 0,
    "explanation": "Tính chất đường trung bình hình thang: song song 2 đáy, độ dài bằng nửa tổng 2 đáy.",
    "choiceFeedback": [
     "Đúng — đúng tính chất đường trung bình hình thang.",
     "Sai — đường trung bình song song với đáy, không vuông góc.",
     "Sai — đường trung bình bằng nửa tổng, không phải hiệu.",
     "Sai — đường trung bình bằng nửa tổng hai đáy, không phải cả tổng."
    ]
   },
   {
    "stem": "Hình bình hành ABCD có AB = 5 cm. Vậy CD = ?",
    "choices": [
     "5 cm",
     "10 cm",
     "2.5 cm",
     "Không xác định được"
    ],
    "answer": 0,
    "explanation": "Cạnh đối của hbh bằng nhau: CD=AB=5 cm.",
    "choiceFeedback": [
     "Đúng — cạnh đối hình bình hành bằng nhau nên CD=AB=5 cm.",
     "Sai — không có căn cứ để gấp đôi độ dài cạnh.",
     "Sai — không có căn cứ để chia đôi độ dài cạnh.",
     "Sai — tính chất cạnh đối bằng nhau cho phép xác định được CD."
    ]
   },
   {
    "stem": "Hình chữ nhật là?",
    "choices": [
     "Tứ giác có bốn góc vuông",
     "Tứ giác có bốn cạnh bằng nhau",
     "Tứ giác có hai đường chéo vuông góc",
     "Hình bình hành có hai cạnh kề bằng nhau"
    ],
    "answer": 0,
    "explanation": "Định nghĩa hình chữ nhật: tứ giác có 4 góc vuông (hay hbh có 1 góc vuông).",
    "choiceFeedback": [
     "Đúng — đây là định nghĩa hình chữ nhật.",
     "Sai — đó là đặc điểm của hình thoi.",
     "Sai — đó là đặc điểm của hình thoi, không phải hình chữ nhật.",
     "Sai — đó là định nghĩa hình thoi, không phải hình chữ nhật."
    ]
   },
   {
    "stem": "Hình vuông là?",
    "choices": [
     "Tứ giác có bốn góc vuông và bốn cạnh bằng nhau",
     "Tứ giác có bốn cạnh bằng nhau",
     "Tứ giác có bốn góc vuông",
     "Hình bình hành bất kỳ"
    ],
    "answer": 0,
    "explanation": "Hình vuông vừa là hình chữ nhật vừa là hình thoi: 4 góc vuông và 4 cạnh bằng nhau.",
    "choiceFeedback": [
     "Đúng — hình vuông có cả hai tính chất: góc vuông và cạnh bằng nhau.",
     "Sai — đó mới chỉ là hình thoi, chưa chắc góc vuông.",
     "Sai — đó mới chỉ là hình chữ nhật, chưa chắc cạnh bằng nhau.",
     "Sai — hình bình hành nói chung chưa chắc là hình vuông."
    ]
   },
   {
    "stem": "Đảo của Talet: MN // BC khi nào?",
    "choices": [
     "AM/AB = AN/AC",
     "AM = AN",
     "MB = NC",
     "AM/MB = AC/AB"
    ],
    "answer": 0,
    "explanation": "Định lý đảo Talet: nếu AM/AB=AN/AC (hay AM/MB=AN/NC) thì MN//BC.",
    "choiceFeedback": [
     "Đúng — đây là điều kiện của định lý Talet đảo.",
     "Sai — bằng nhau về độ dài chưa đủ để suy ra song song.",
     "Sai — bằng nhau về độ dài chưa đủ để suy ra song song.",
     "Sai — không đúng dạng tỉ lệ của định lý đảo Talet."
    ]
   },
   {
    "stem": "Phân tích x² − 9 = ?",
    "choices": [
     "(x − 3)(x + 3)",
     "(x − 3)²",
     "(x + 3)²",
     "(x − 9)(x + 1)"
    ],
    "answer": 0,
    "explanation": "9=3², hiệu hai bình phương: (x−3)(x+3).",
    "choiceFeedback": [
     "Đúng — x²−3²=(x−3)(x+3).",
     "Sai — đây là khai triển bình phương, không phải phân tích hiệu.",
     "Sai — đây là khai triển bình phương của một tổng.",
     "Sai — không đúng cách tách nhân tử."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S8TOAN-exam-gk2": {
  "id": "S8TOAN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 8",
  "questions": [
   {
    "stem": "Bất đẳng thức nào sau đây đúng?",
    "choices": [
     "2 + 3 > 4",
     "5 < 3",
     "−2 > 0",
     "1 > 2"
    ],
    "answer": 0,
    "explanation": "2+3=5>4 là đúng; các bất đẳng thức còn lại đều sai.",
    "choiceFeedback": [
     "Đúng — 5 > 4 là bất đẳng thức đúng.",
     "Sai — 5 không nhỏ hơn 3.",
     "Sai — −2 không lớn hơn 0.",
     "Sai — 1 không lớn hơn 2."
    ]
   },
   {
    "stem": "Nếu a < b và c > 0 thì a·c ___ b·c?",
    "choices": [
     "<",
     ">",
     "=",
     "≥"
    ],
    "answer": 0,
    "explanation": "Nhân hai vế với số dương không đổi chiều bất đẳng thức.",
    "choiceFeedback": [
     "Đúng — nhân với số dương giữ nguyên chiều <.",
     "Sai — chỉ đổi chiều khi nhân với số âm, ở đây c>0.",
     "Sai — a<b và c>0 nên a·c không thể bằng b·c.",
     "Sai — chiều đúng là < chứ không phải ≥."
    ]
   },
   {
    "stem": "Cho a > 0, b > 0. Khẳng định nào đúng?",
    "choices": [
     "a + b > 0",
     "a + b < 0",
     "a − b > 0",
     "a·b < 0"
    ],
    "answer": 0,
    "explanation": "Tổng hai số dương luôn dương.",
    "choiceFeedback": [
     "Đúng — tổng hai số dương luôn là số dương.",
     "Sai — tổng hai số dương không thể âm.",
     "Sai — a−b chưa chắc dương, tùy thuộc độ lớn của a, b.",
     "Sai — tích hai số dương luôn dương, không âm."
    ]
   },
   {
    "stem": "Bất phương trình bậc nhất một ẩn dạng?",
    "choices": [
     "ax + b > 0 (a ≠ 0)",
     "ax² + b > 0 (a ≠ 0)",
     "ax + b = 0",
     "ax + by > 0"
    ],
    "answer": 0,
    "explanation": "Dạng tổng quát ax+b (>,<,≥,≤) 0 với a≠0.",
    "choiceFeedback": [
     "Đúng — đúng dạng bất phương trình bậc nhất một ẩn.",
     "Sai — có x² là bất phương trình bậc hai.",
     "Sai — đây là phương trình (dấu =), không phải bất phương trình.",
     "Sai — có hai ẩn x, y nên không phải một ẩn."
    ]
   },
   {
    "stem": "Giải −3x > 9?",
    "choices": [
     "x < −3",
     "x > −3",
     "x < 3",
     "x > 3"
    ],
    "answer": 0,
    "explanation": "Chia hai vế cho −3 (số âm), đổi chiều: x < −3.",
    "choiceFeedback": [
     "Đúng — chia cho số âm −3 nên đổi chiều bất phương trình.",
     "Sai — chia cho số âm phải đổi chiều, không giữ nguyên.",
     "Sai — nhầm dấu của nghiệm.",
     "Sai — nhầm cả dấu và chiều bất phương trình."
    ]
   },
   {
    "stem": "Tập nghiệm của 2x − 4 ≥ 0?",
    "choices": [
     "x ≥ 2",
     "x ≤ 2",
     "x ≥ 4",
     "x ≤ −2"
    ],
    "answer": 0,
    "explanation": "2x≥4 ⇒ x≥2.",
    "choiceFeedback": [
     "Đúng — chia 2 vế cho 2 (dương), giữ chiều: x≥2.",
     "Sai — chia cho số dương không đổi chiều bất phương trình.",
     "Sai — quên chia cho hệ số 2.",
     "Sai — nhầm dấu và giá trị nghiệm."
    ]
   },
   {
    "stem": "Hàm số bậc nhất có dạng?",
    "choices": [
     "y = ax + b (a ≠ 0)",
     "y = ax² + b",
     "y = a/x",
     "y = ax + b (a = 0)"
    ],
    "answer": 0,
    "explanation": "Định nghĩa hàm số bậc nhất: y=ax+b với a≠0.",
    "choiceFeedback": [
     "Đúng — đúng dạng hàm số bậc nhất.",
     "Sai — có x² là hàm số bậc hai.",
     "Sai — đây là hàm phân thức, không phải hàm bậc nhất.",
     "Sai — nếu a=0 thì y=b là hàm hằng, không phải bậc nhất."
    ]
   },
   {
    "stem": "Đồ thị y = 2x đi qua điểm nào?",
    "choices": [
     "(0; 0)",
     "(1; 1)",
     "(0; 2)",
     "(2; 0)"
    ],
    "answer": 0,
    "explanation": "Khi x=0, y=2·0=0, nên đồ thị đi qua gốc tọa độ (0;0).",
    "choiceFeedback": [
     "Đúng — thay x=0 được y=0, đồ thị đi qua gốc tọa độ.",
     "Sai — thay x=1 phải được y=2, không phải 1.",
     "Sai — thay x=0 được y=0, không phải 2.",
     "Sai — thay x=2 phải được y=4, không phải 0."
    ]
   },
   {
    "stem": "Hệ số góc của đường thẳng y = −2x + 1 là?",
    "choices": [
     "−2",
     "1",
     "2",
     "−1"
    ],
    "answer": 0,
    "explanation": "Hệ số góc chính là hệ số a, ở đây là −2.",
    "choiceFeedback": [
     "Đúng — hệ số góc là hệ số của x, bằng −2.",
     "Sai — 1 là tung độ gốc b, không phải hệ số góc.",
     "Sai — thiếu dấu âm của hệ số góc.",
     "Sai — hệ số góc phải là −2, không phải −1."
    ]
   },
   {
    "stem": "y = 2x − 4 cắt trục Ox tại điểm có hoành độ?",
    "choices": [
     "2",
     "4",
     "−2",
     "−4"
    ],
    "answer": 0,
    "explanation": "Cho y=0: 2x−4=0 ⇒ x=2.",
    "choiceFeedback": [
     "Đúng — 2x=4 ⇒ x=2.",
     "Sai — 4 là hệ số tự do, chưa chia cho hệ số góc.",
     "Sai — nhầm dấu của nghiệm.",
     "Sai — nhầm cả dấu và giá trị của nghiệm."
    ]
   },
   {
    "stem": "Hai đường thẳng trùng nhau khi?",
    "choices": [
     "a = a′ và b = b′",
     "a = a′ và b ≠ b′",
     "a ≠ a′",
     "b = b′ và a ≠ a′"
    ],
    "answer": 0,
    "explanation": "Trùng nhau khi cùng hệ số góc và cùng tung độ gốc.",
    "choiceFeedback": [
     "Đúng — cả hệ số góc và tung độ gốc đều bằng nhau.",
     "Sai — đó là điều kiện song song, không phải trùng nhau.",
     "Sai — a≠a′ làm hai đường thẳng cắt nhau, không trùng nhau.",
     "Sai — a≠a′ làm hai đường thẳng cắt nhau dù b bằng nhau."
    ]
   },
   {
    "stem": "Hai đường thẳng y=2x+1 và y=2x−3 có quan hệ?",
    "choices": [
     "Song song",
     "Trùng nhau",
     "Cắt nhau",
     "Vuông góc"
    ],
    "answer": 0,
    "explanation": "Cùng hệ số góc a=2 nhưng b khác (1≠−3) nên song song.",
    "choiceFeedback": [
     "Đúng — a=a′=2, b≠b′ (1≠−3) nên song song.",
     "Sai — b khác nhau (1≠−3) nên không trùng nhau.",
     "Sai — cùng hệ số góc nên không cắt nhau.",
     "Sai — hai đường thẳng cùng hệ số góc không thể vuông góc."
    ]
   },
   {
    "stem": "Tỉ số đồng dạng k của △ABC ~ △A′B′C′ là?",
    "choices": [
     "Tỉ số giữa các cặp cạnh tương ứng",
     "Tỉ số hai đường cao bất kỳ",
     "Tỉ số hai diện tích",
     "Hiệu hai chu vi"
    ],
    "answer": 0,
    "explanation": "Tỉ số đồng dạng là tỉ số các cạnh tương ứng (không đổi cho mọi cặp cạnh tương ứng).",
    "choiceFeedback": [
     "Đúng — đúng định nghĩa tỉ số đồng dạng.",
     "Sai — đường cao tương ứng có tỉ số bằng k, nhưng định nghĩa gốc là theo cạnh tương ứng.",
     "Sai — tỉ số diện tích bằng k², không phải chính k.",
     "Sai — đó không phải định nghĩa tỉ số đồng dạng."
    ]
   },
   {
    "stem": "△ABC ~ △DEF với k=2 (AB/DE=2) và BC=6. EF = ?",
    "choices": [
     "3",
     "12",
     "6",
     "4"
    ],
    "answer": 0,
    "explanation": "BC/EF=k=2 ⇒ EF=BC/2=6/2=3.",
    "choiceFeedback": [
     "Đúng — EF = BC/k = 6/2 = 3.",
     "Sai — đây là kết quả nếu nhân thay vì chia cho k.",
     "Sai — đây là giá trị BC, chưa áp dụng tỉ số k.",
     "Sai — tính sai phép chia theo tỉ số k."
    ]
   },
   {
    "stem": "Trường hợp đồng dạng cạnh-cạnh-cạnh viết tắt là?",
    "choices": [
     "c.c.c",
     "c.g.c",
     "g.g",
     "g.c.g"
    ],
    "answer": 0,
    "explanation": "Trường hợp đồng dạng ba cạnh tỉ lệ: c.c.c.",
    "choiceFeedback": [
     "Đúng — c.c.c là ba cặp cạnh tương ứng tỉ lệ.",
     "Sai — c.g.c là cạnh-góc-cạnh, một trường hợp khác.",
     "Sai — g.g là góc-góc, một trường hợp khác.",
     "Sai — g.c.g là trường hợp bằng nhau của tam giác, không dùng cho đồng dạng."
    ]
   },
   {
    "stem": "Trường hợp g.g yêu cầu?",
    "choices": [
     "Hai cặp góc tương ứng bằng nhau",
     "Ba cặp cạnh tỉ lệ",
     "Một cặp góc và một cặp cạnh",
     "Hai cặp cạnh tỉ lệ"
    ],
    "answer": 0,
    "explanation": "g.g: hai cặp góc tương ứng bằng nhau là đủ để suy ra đồng dạng (góc thứ ba tự bằng nhau).",
    "choiceFeedback": [
     "Đúng — chỉ cần hai cặp góc bằng nhau (góc thứ 3 suy ra được).",
     "Sai — đó là điều kiện trường hợp c.c.c.",
     "Sai — đó không phải điều kiện của trường hợp g.g.",
     "Sai — đó là điều kiện một phần của trường hợp c.g.c."
    ]
   },
   {
    "stem": "Cho △ABC vuông ở A, đường cao AH. Tam giác nào đồng dạng?",
    "choices": [
     "△HBA và △HAC (và với △ABC)",
     "△ABC và △ABH không liên quan",
     "Không có tam giác nào đồng dạng",
     "Chỉ △ABC đồng dạng chính nó"
    ],
    "answer": 0,
    "explanation": "Đường cao AH tạo ra 3 tam giác đồng dạng với nhau: △ABC ~ △HBA ~ △HAC.",
    "choiceFeedback": [
     "Đúng — đường cao trong tam giác vuông tạo ra ba tam giác đồng dạng với nhau.",
     "Sai — thực tế △ABH đồng dạng với △ABC (và △HAC).",
     "Sai — có ba tam giác đồng dạng được tạo ra từ đường cao này.",
     "Sai — có nhiều hơn một tam giác trong hình liên quan và đồng dạng với nhau."
    ]
   },
   {
    "stem": "Cây cao bóng dài 9 m, cọc cao 1.5 m bóng 3 m (cùng thời điểm). Cây cao?",
    "choices": [
     "4.5 m",
     "6 m",
     "18 m",
     "13.5 m"
    ],
    "answer": 0,
    "explanation": "Tỉ lệ cây/cọc = bóng cây/bóng cọc: cây = 1.5×9/3 = 4.5 m.",
    "choiceFeedback": [
     "Đúng — 1.5×9/3 = 4.5 m.",
     "Sai — tính sai tỉ lệ giữa chiều cao và bóng.",
     "Sai — tính nhầm phép nhân thay vì áp dụng đúng tỉ lệ.",
     "Sai — cộng nhầm các đại lượng thay vì dùng tỉ lệ đồng dạng."
    ]
   },
   {
    "stem": "Tỉ số đồng dạng k = 3. Tỉ số chu vi 2 tam giác?",
    "choices": [
     "3",
     "9",
     "6",
     "1/3"
    ],
    "answer": 0,
    "explanation": "Tỉ số chu vi bằng đúng tỉ số đồng dạng k.",
    "choiceFeedback": [
     "Đúng — tỉ số chu vi bằng k = 3.",
     "Sai — 9=k² là tỉ số diện tích, không phải chu vi.",
     "Sai — không đúng công thức tỉ số chu vi.",
     "Sai — đây là nghịch đảo của k, không đúng chiều tỉ số đã cho."
    ]
   },
   {
    "stem": "Một cây cao 5 m, bóng dài 4 m. Cùng lúc, tháp có bóng dài 24 m. Tháp cao?",
    "choices": [
     "30 m",
     "19.2 m",
     "4.8 m",
     "120 m"
    ],
    "answer": 0,
    "explanation": "Tỉ lệ cây/bóng cây = tháp/bóng tháp: tháp = 5×24/4 = 30 m.",
    "choiceFeedback": [
     "Đúng — 5×24/4 = 30 m.",
     "Sai — tính sai tỉ lệ giữa chiều cao và bóng.",
     "Sai — đây là kết quả nếu tính ngược tỉ lệ.",
     "Sai — tính nhầm phép nhân, ra kết quả quá lớn so với thực tế."
    ]
   },
   {
    "stem": "Tam giác vuông có 2 cạnh góc vuông 3, 4. Cạnh huyền?",
    "choices": [
     "5",
     "7",
     "6",
     "25"
    ],
    "answer": 0,
    "explanation": "c=√(3²+4²)=√25=5.",
    "choiceFeedback": [
     "Đúng — √(9+16)=√25=5.",
     "Sai — đó là tổng hai cạnh góc vuông (3+4), không phải cạnh huyền.",
     "Sai — không đúng theo định lý Pytago.",
     "Sai — 25 là c² chứ chưa lấy căn bậc hai."
    ]
   },
   {
    "stem": "Bộ ba số nào KHÔNG là Pytago?",
    "choices": [
     "(2, 3, 4)",
     "(3, 4, 5)",
     "(6, 8, 10)",
     "(5, 12, 13)"
    ],
    "answer": 0,
    "explanation": "2²+3²=13≠4²=16, không thỏa mãn; các bộ còn lại đều thỏa mãn định lý Pytago.",
    "choiceFeedback": [
     "Đúng — 2²+3²=13 ≠ 4²=16, không thỏa mãn Pytago.",
     "Sai — 3²+4²=25=5², đây là bộ ba Pytago hợp lệ.",
     "Sai — 6²+8²=100=10², đây là bộ ba Pytago hợp lệ.",
     "Sai — 5²+12²=169=13², đây là bộ ba Pytago hợp lệ."
    ]
   },
   {
    "stem": "Đường chéo hình vuông cạnh a bằng?",
    "choices": [
     "a√2",
     "2a",
     "a²",
     "a/√2"
    ],
    "answer": 0,
    "explanation": "Đường chéo là cạnh huyền tam giác vuông cân cạnh a: √(a²+a²)=a√2.",
    "choiceFeedback": [
     "Đúng — √(a²+a²)=a√2.",
     "Sai — đó là tổng hai cạnh, không đúng theo Pytago.",
     "Sai — đó là diện tích hình vuông, không phải đường chéo.",
     "Sai — đây là nghịch đảo tỉ lệ, không đúng công thức đường chéo."
    ]
   },
   {
    "stem": "Hình hộp chữ nhật là lăng trụ đứng đáy?",
    "choices": [
     "Hình chữ nhật",
     "Hình tam giác",
     "Hình lục giác",
     "Hình tròn"
    ],
    "answer": 0,
    "explanation": "Hình hộp chữ nhật là trường hợp riêng của lăng trụ đứng với đáy là hình chữ nhật.",
    "choiceFeedback": [
     "Đúng — đáy của hình hộp chữ nhật là hình chữ nhật.",
     "Sai — đó là lăng trụ tam giác, không phải hình hộp chữ nhật.",
     "Sai — đó là lăng trụ lục giác, không phải hình hộp chữ nhật.",
     "Sai — hình tròn là đáy của hình trụ, không phải lăng trụ."
    ]
   },
   {
    "stem": "Diện tích xung quanh lăng trụ đứng = ?",
    "choices": [
     "Chu vi đáy × chiều cao",
     "Diện tích đáy × chiều cao",
     "Nửa chu vi đáy × chiều cao",
     "Diện tích đáy × 2"
    ],
    "answer": 0,
    "explanation": "Sxq = chu vi đáy × chiều cao.",
    "choiceFeedback": [
     "Đúng — đúng công thức diện tích xung quanh lăng trụ đứng.",
     "Sai — đó là công thức thể tích, không phải diện tích xung quanh.",
     "Sai — phải dùng cả chu vi đáy, không phải nửa chu vi (đó là công thức của hình chóp).",
     "Sai — không đúng công thức diện tích xung quanh."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S8TOAN-exam-ck2": {
  "id": "S8TOAN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 8",
  "questions": [
   {
    "stem": "Bất đẳng thức nào sau đây đúng?",
    "choices": [
     "2 + 3 > 4",
     "5 < 3",
     "−2 > 0",
     "1 > 2"
    ],
    "answer": 0,
    "explanation": "2+3=5>4 là đúng; các bất đẳng thức còn lại đều sai.",
    "choiceFeedback": [
     "Đúng — 5 > 4 là bất đẳng thức đúng.",
     "Sai — 5 không nhỏ hơn 3.",
     "Sai — −2 không lớn hơn 0.",
     "Sai — 1 không lớn hơn 2."
    ]
   },
   {
    "stem": "Cho a > 0, b > 0. Khẳng định nào đúng?",
    "choices": [
     "a + b > 0",
     "a + b < 0",
     "a − b > 0",
     "a·b < 0"
    ],
    "answer": 0,
    "explanation": "Tổng hai số dương luôn dương.",
    "choiceFeedback": [
     "Đúng — tổng hai số dương luôn là số dương.",
     "Sai — tổng hai số dương không thể âm.",
     "Sai — a−b chưa chắc dương, tùy thuộc độ lớn của a, b.",
     "Sai — tích hai số dương luôn dương, không âm."
    ]
   },
   {
    "stem": "Giải −3x > 9?",
    "choices": [
     "x < −3",
     "x > −3",
     "x < 3",
     "x > 3"
    ],
    "answer": 0,
    "explanation": "Chia hai vế cho −3 (số âm), đổi chiều: x < −3.",
    "choiceFeedback": [
     "Đúng — chia cho số âm −3 nên đổi chiều bất phương trình.",
     "Sai — chia cho số âm phải đổi chiều, không giữ nguyên.",
     "Sai — nhầm dấu của nghiệm.",
     "Sai — nhầm cả dấu và chiều bất phương trình."
    ]
   },
   {
    "stem": "Hàm số bậc nhất có dạng?",
    "choices": [
     "y = ax + b (a ≠ 0)",
     "y = ax² + b",
     "y = a/x",
     "y = ax + b (a = 0)"
    ],
    "answer": 0,
    "explanation": "Định nghĩa hàm số bậc nhất: y=ax+b với a≠0.",
    "choiceFeedback": [
     "Đúng — đúng dạng hàm số bậc nhất.",
     "Sai — có x² là hàm số bậc hai.",
     "Sai — đây là hàm phân thức, không phải hàm bậc nhất.",
     "Sai — nếu a=0 thì y=b là hàm hằng, không phải bậc nhất."
    ]
   },
   {
    "stem": "Hàm y = 3x + 5 đồng biến hay nghịch biến?",
    "choices": [
     "Đồng biến vì a = 3 > 0",
     "Nghịch biến vì a = 3 > 0",
     "Đồng biến vì b = 5 > 0",
     "Không xác định được"
    ],
    "answer": 0,
    "explanation": "Hàm số bậc nhất đồng biến khi a>0; ở đây a=3>0.",
    "choiceFeedback": [
     "Đúng — a=3>0 nên hàm số đồng biến trên R.",
     "Sai — a>0 làm hàm đồng biến, không phải nghịch biến.",
     "Sai — tính đồng biến/nghịch biến phụ thuộc vào a, không phải b.",
     "Sai — có thể xác định được dựa vào dấu của hệ số a."
    ]
   },
   {
    "stem": "Hai đường thẳng y=ax+b và y=a′x+b′ song song khi?",
    "choices": [
     "a = a′ và b ≠ b′",
     "a = a′ và b = b′",
     "a ≠ a′",
     "a·a′ = −1"
    ],
    "answer": 0,
    "explanation": "Điều kiện song song: cùng hệ số góc nhưng khác tung độ gốc.",
    "choiceFeedback": [
     "Đúng — cùng hệ số góc (a=a′) và khác b để không trùng nhau.",
     "Sai — nếu b=b′ nữa thì hai đường thẳng trùng nhau, không phải song song.",
     "Sai — a≠a′ thì hai đường thẳng cắt nhau, không song song.",
     "Sai — đó là điều kiện vuông góc, không phải song song."
    ]
   },
   {
    "stem": "Hai tam giác đồng dạng khi nào?",
    "choices": [
     "Các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ",
     "Các cạnh tương ứng bằng nhau",
     "Diện tích bằng nhau",
     "Chu vi bằng nhau"
    ],
    "answer": 0,
    "explanation": "Định nghĩa hai tam giác đồng dạng.",
    "choiceFeedback": [
     "Đúng — đúng định nghĩa hai tam giác đồng dạng.",
     "Sai — đó là điều kiện của hai tam giác bằng nhau, chặt hơn đồng dạng.",
     "Sai — diện tích bằng nhau không đảm bảo đồng dạng (hình dạng có thể khác).",
     "Sai — chu vi bằng nhau không đảm bảo đồng dạng."
    ]
   },
   {
    "stem": "△ABC ~ △DEF với k=2 (AB/DE=2) và BC=6. EF = ?",
    "choices": [
     "3",
     "12",
     "6",
     "4"
    ],
    "answer": 0,
    "explanation": "BC/EF=k=2 ⇒ EF=BC/2=6/2=3.",
    "choiceFeedback": [
     "Đúng — EF = BC/k = 6/2 = 3.",
     "Sai — đây là kết quả nếu nhân thay vì chia cho k.",
     "Sai — đây là giá trị BC, chưa áp dụng tỉ số k.",
     "Sai — tính sai phép chia theo tỉ số k."
    ]
   },
   {
    "stem": "Trường hợp g.g yêu cầu?",
    "choices": [
     "Hai cặp góc tương ứng bằng nhau",
     "Ba cặp cạnh tỉ lệ",
     "Một cặp góc và một cặp cạnh",
     "Hai cặp cạnh tỉ lệ"
    ],
    "answer": 0,
    "explanation": "g.g: hai cặp góc tương ứng bằng nhau là đủ để suy ra đồng dạng (góc thứ ba tự bằng nhau).",
    "choiceFeedback": [
     "Đúng — chỉ cần hai cặp góc bằng nhau (góc thứ 3 suy ra được).",
     "Sai — đó là điều kiện trường hợp c.c.c.",
     "Sai — đó không phải điều kiện của trường hợp g.g.",
     "Sai — đó là điều kiện một phần của trường hợp c.g.c."
    ]
   },
   {
    "stem": "Cây cao bóng dài 9 m, cọc cao 1.5 m bóng 3 m (cùng thời điểm). Cây cao?",
    "choices": [
     "4.5 m",
     "6 m",
     "18 m",
     "13.5 m"
    ],
    "answer": 0,
    "explanation": "Tỉ lệ cây/cọc = bóng cây/bóng cọc: cây = 1.5×9/3 = 4.5 m.",
    "choiceFeedback": [
     "Đúng — 1.5×9/3 = 4.5 m.",
     "Sai — tính sai tỉ lệ giữa chiều cao và bóng.",
     "Sai — tính nhầm phép nhân thay vì áp dụng đúng tỉ lệ.",
     "Sai — cộng nhầm các đại lượng thay vì dùng tỉ lệ đồng dạng."
    ]
   },
   {
    "stem": "Ánh sáng mặt trời chiếu xuống đất tạo tia song song nên 2 tam giác (vật + bóng)?",
    "choices": [
     "Đồng dạng với nhau",
     "Bằng nhau",
     "Không liên quan gì nhau",
     "Vuông góc với nhau"
    ],
    "answer": 0,
    "explanation": "Các tia sáng song song tạo góc bằng nhau giữa vật/bóng và mặt đất, nên hai tam giác vật-bóng đồng dạng.",
    "choiceFeedback": [
     "Đúng — góc tạo bởi tia sáng song song bằng nhau nên hai tam giác đồng dạng.",
     "Sai — hai vật có chiều cao khác nhau nên tam giác chỉ đồng dạng, không bằng nhau.",
     "Sai — chúng có mối liên hệ đồng dạng rõ ràng qua tỉ lệ bóng nắng.",
     "Sai — đây không phải là mối quan hệ vuông góc mà là đồng dạng."
    ]
   },
   {
    "stem": "Tam giác vuông có cạnh huyền 13, một cạnh góc vuông 5. Cạnh còn lại?",
    "choices": [
     "12",
     "8",
     "18",
     "144"
    ],
    "answer": 0,
    "explanation": "b=√(13²−5²)=√(169−25)=√144=12.",
    "choiceFeedback": [
     "Đúng — √(169−25)=√144=12.",
     "Sai — đó là hiệu hai cạnh (13−5), không đúng theo Pytago.",
     "Sai — đó là tổng hai cạnh (13+5), không đúng theo Pytago.",
     "Sai — 144 là bình phương của cạnh còn lại, chưa lấy căn bậc hai."
    ]
   },
   {
    "stem": "Hình lăng trụ đứng có mặt bên là?",
    "choices": [
     "Hình chữ nhật",
     "Hình tam giác",
     "Hình tròn",
     "Hình thoi"
    ],
    "answer": 0,
    "explanation": "Mặt bên lăng trụ đứng luôn là hình chữ nhật (vuông góc với đáy).",
    "choiceFeedback": [
     "Đúng — mặt bên lăng trụ đứng là hình chữ nhật.",
     "Sai — mặt đáy mới có thể là tam giác, mặt bên luôn là hình chữ nhật.",
     "Sai — hình tròn là mặt của hình trụ, không phải lăng trụ.",
     "Sai — mặt bên lăng trụ đứng không phải hình thoi."
    ]
   },
   {
    "stem": "Thể tích lăng trụ đứng = ?",
    "choices": [
     "Diện tích đáy × chiều cao",
     "Chu vi đáy × chiều cao",
     "Diện tích xung quanh × chiều cao",
     "Nửa diện tích đáy × chiều cao"
    ],
    "answer": 0,
    "explanation": "V=Sđáy×h.",
    "choiceFeedback": [
     "Đúng — đúng công thức thể tích lăng trụ đứng.",
     "Sai — đó là công thức diện tích xung quanh, không phải thể tích.",
     "Sai — không đúng công thức thể tích.",
     "Sai — phải dùng cả diện tích đáy, không phải một nửa."
    ]
   },
   {
    "stem": "Mặt bên của hình chóp đều là?",
    "choices": [
     "Tam giác cân",
     "Hình chữ nhật",
     "Hình vuông",
     "Tam giác đều bất kỳ"
    ],
    "answer": 0,
    "explanation": "Mặt bên hình chóp đều là các tam giác cân bằng nhau.",
    "choiceFeedback": [
     "Đúng — mặt bên hình chóp đều là tam giác cân.",
     "Sai — hình chữ nhật là mặt bên của lăng trụ đứng, không phải hình chóp.",
     "Sai — mặt bên chỉ là tam giác cân, không nhất thiết là tam giác đều nên không thể là hình vuông.",
     "Sai — mặt bên là tam giác cân, không nhất thiết đều (trừ trường hợp đặc biệt)."
    ]
   },
   {
    "stem": "Trong dãy 1,2,2,3,3,3,4: tần số của 3 là?",
    "choices": [
     "3",
     "2",
     "1",
     "4"
    ],
    "answer": 0,
    "explanation": "Số 3 xuất hiện 3 lần trong dãy.",
    "choiceFeedback": [
     "Đúng — số 3 xuất hiện 3 lần.",
     "Sai — 2 là tần số của giá trị 2, không phải của 3.",
     "Sai — 1 là tần số của giá trị 1 hoặc 4, không phải của 3.",
     "Sai — 4 là giá trị trong dãy, không phải tần số của số 3."
    ]
   },
   {
    "stem": "Trung bình cộng của 4, 6, 8, 10 là?",
    "choices": [
     "7",
     "6",
     "8",
     "28"
    ],
    "answer": 0,
    "explanation": "(4+6+8+10)/4=28/4=7.",
    "choiceFeedback": [
     "Đúng — 28/4=7.",
     "Sai — đó là một trong các giá trị của dãy, không phải trung bình.",
     "Sai — đó là một trong các giá trị của dãy, không phải trung bình.",
     "Sai — đó là tổng các giá trị, chưa chia cho số lượng."
    ]
   },
   {
    "stem": "Trung vị của dãy 2,4,6,8 (chẵn phần tử) là?",
    "choices": [
     "5",
     "6",
     "4",
     "8"
    ],
    "answer": 0,
    "explanation": "Dãy chẵn: trung vị là TB hai giá trị giữa (4+6)/2=5.",
    "choiceFeedback": [
     "Đúng — (4+6)/2=5.",
     "Sai — 6 là một trong hai giá trị giữa, chưa lấy trung bình cộng.",
     "Sai — 4 là một trong hai giá trị giữa, chưa lấy trung bình cộng.",
     "Sai — 8 là giá trị lớn nhất, không phải trung vị."
    ]
   },
   {
    "stem": "Xác suất của biến cố chắc chắn?",
    "choices": [
     "1",
     "0",
     "0.5",
     "Không xác định"
    ],
    "answer": 0,
    "explanation": "Biến cố chắc chắn luôn xảy ra, xác suất bằng 1.",
    "choiceFeedback": [
     "Đúng — biến cố chắc chắn có xác suất bằng 1.",
     "Sai — 0 là xác suất của biến cố không thể, ngược lại với chắc chắn.",
     "Sai — 0.5 là xác suất của biến cố có khả năng xảy ra 50%, không phải chắc chắn.",
     "Sai — xác suất của biến cố chắc chắn luôn xác định và bằng 1."
    ]
   },
   {
    "stem": "Gieo xúc xắc. P(ra số chẵn) = ?",
    "choices": [
     "1/2",
     "1/3",
     "1/6",
     "2/3"
    ],
    "answer": 0,
    "explanation": "Có 3 số chẵn (2,4,6) trong 6 mặt: P=3/6=1/2.",
    "choiceFeedback": [
     "Đúng — 3/6=1/2.",
     "Sai — đó là xác suất ra một số cụ thể trong 3 số chẵn (2 mặt trên 6), không phải xác suất ra số chẵn nói chung.",
     "Sai — đó là xác suất ra một mặt cụ thể (ví dụ chỉ số 6), không phải xác suất ra số chẵn.",
     "Sai — chỉ có 3 số chẵn trong 6 mặt, không phải 4."
    ]
   },
   {
    "stem": "ĐKXĐ của PT 1/(x−2) = 3 là?",
    "choices": [
     "x ≠ 2",
     "x ≠ 3",
     "x ≠ 0",
     "x ≠ −2"
    ],
    "answer": 0,
    "explanation": "Mẫu x−2≠0 ⇒ x≠2.",
    "choiceFeedback": [
     "Đúng — mẫu x−2 khác 0 khi x≠2.",
     "Sai — 3 là vế phải phương trình, không liên quan đến ĐKXĐ.",
     "Sai — không liên quan đến mẫu thức đã cho.",
     "Sai — không đúng dấu, mẫu là x−2 chứ không phải x+2."
    ]
   },
   {
    "stem": "Giải bpt 2x−4 > 0?",
    "choices": [
     "x > 2",
     "x < 2",
     "x > 4",
     "x < −2"
    ],
    "answer": 0,
    "explanation": "2x>4 ⇒ x>2.",
    "choiceFeedback": [
     "Đúng — chia 2 vế cho 2 (dương), giữ chiều: x>2.",
     "Sai — chia cho số dương không đổi chiều bất phương trình.",
     "Sai — quên chia cho hệ số 2.",
     "Sai — nhầm dấu và giá trị nghiệm."
    ]
   },
   {
    "stem": "Rút gọn (x²−25)/(x+5) (x≠−5)?",
    "choices": [
     "x − 5",
     "x + 5",
     "x² − 5",
     "x + 25"
    ],
    "answer": 0,
    "explanation": "x²−25=(x−5)(x+5), chia cho (x+5) còn (x−5).",
    "choiceFeedback": [
     "Đúng — (x−5)(x+5)/(x+5)=x−5.",
     "Sai — đây là chính mẫu thức, chưa rút gọn.",
     "Sai — không đúng theo hằng đẳng thức hiệu hai bình phương.",
     "Sai — không đúng cách tách nhân tử của 25."
    ]
   },
   {
    "stem": "Diện tích xq lăng trụ tam giác đều cạnh đáy 4, cao 10?",
    "choices": [
     "120",
     "40",
     "12",
     "80"
    ],
    "answer": 0,
    "explanation": "Chu vi đáy=3×4=12; Sxq=12×10=120.",
    "choiceFeedback": [
     "Đúng — chu vi đáy 12 nhân chiều cao 10 = 120.",
     "Sai — đây chỉ là tích một cạnh đáy với chiều cao (4×10), chưa nhân đủ chu vi.",
     "Sai — đây là chu vi đáy, chưa nhân với chiều cao.",
     "Sai — tính sai chu vi đáy (không phải 8×10)."
    ]
   },
   {
    "stem": "Phân tích x²−2x+1 = ?",
    "choices": [
     "(x − 1)²",
     "(x + 1)²",
     "(x − 1)(x + 1)",
     "(x − 2)(x + 1)"
    ],
    "answer": 0,
    "explanation": "x²−2·1·x+1²=(x−1)².",
    "choiceFeedback": [
     "Đúng — đúng dạng bình phương của một hiệu với b=1.",
     "Sai — dấu hạng tử giữa −2x phải cho (x−1)² chứ không phải (x+1)².",
     "Sai — đây là hiệu hai bình phương x²−1, không đúng với x²−2x+1.",
     "Sai — không đúng cách tách nhân tử."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
