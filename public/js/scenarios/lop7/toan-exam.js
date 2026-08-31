// S7TOAN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định.
// Ráp bởi data/gen-content/assemble-exam.mjs — file này chỉ là NGUỒN SEED.
export const S7TOAN_EXAMS = {
 "S7TOAN-exam-gk1": {
  "id": "S7TOAN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 7",
  "questions": [
   {
    "stem": "Số hữu tỉ là số có thể viết được dưới dạng nào sau đây?",
    "choices": [
     "a/b với a, b ∈ ℤ, b ≠ 0",
     "a/b với a, b ∈ ℕ",
     "√a với a là số tự nhiên",
     "Chỉ các số nguyên"
    ],
    "answer": 0,
    "explanation": "Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b nguyên, b khác 0.",
    "choiceFeedback": [
     "Đúng — đây chính là định nghĩa số hữu tỉ.",
     "Sai — a, b phải thuộc tập số nguyên ℤ (kể cả âm), không chỉ số tự nhiên.",
     "Sai — √a nói chung là số vô tỉ, không phải số hữu tỉ.",
     "Sai — số nguyên chỉ là một bộ phận của tập số hữu tỉ, chưa đầy đủ."
    ]
   },
   {
    "stem": "Trong các số sau, số nào KHÔNG phải là số hữu tỉ?",
    "choices": [
     "2/3",
     "√2",
     "-5",
     "0,25"
    ],
    "answer": 1,
    "explanation": "√2 là số vô tỉ vì không viết được dưới dạng phân số a/b (a,b nguyên).",
    "choiceFeedback": [
     "Sai — 2/3 là phân số nên là số hữu tỉ.",
     "Đúng — √2 là số vô tỉ, không viết được thành phân số của hai số nguyên.",
     "Sai — -5 = -5/1 là số hữu tỉ.",
     "Sai — 0,25 = 1/4 là số hữu tỉ."
    ]
   },
   {
    "stem": "Kết quả của phép tính 1/2 + 1/3 là?",
    "choices": [
     "2/5",
     "1/5",
     "5/6",
     "2/6"
    ],
    "answer": 2,
    "explanation": "Quy đồng mẫu 6: 1/2=3/6, 1/3=2/6, tổng = 5/6.",
    "choiceFeedback": [
     "Sai — không được cộng trực tiếp tử với tử, mẫu với mẫu.",
     "Sai — kết quả cộng nhầm dấu hoặc quy đồng sai.",
     "Đúng — 3/6 + 2/6 = 5/6.",
     "Sai — 2/6 chưa rút gọn và không đúng kết quả phép cộng."
    ]
   },
   {
    "stem": "(−2/5) + 3/5 = ?",
    "choices": [
     "-1/5",
     "1",
     "-1",
     "1/5"
    ],
    "answer": 3,
    "explanation": "(-2+3)/5 = 1/5.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Sai — cộng tử sai.",
     "Sai — sai dấu và không rút gọn đúng.",
     "Đúng — (-2+3)/5 = 1/5."
    ]
   },
   {
    "stem": "3/4 − 1/2 = ?",
    "choices": [
     "1/4",
     "1/2",
     "1",
     "-1/4"
    ],
    "answer": 0,
    "explanation": "3/4 - 2/4 = 1/4.",
    "choiceFeedback": [
     "Đúng — 3/4 - 2/4 = 1/4.",
     "Sai — chưa quy đồng mẫu trước khi trừ.",
     "Sai — tính sai kết quả phép trừ.",
     "Sai — sai dấu kết quả."
    ]
   },
   {
    "stem": "Số đối của 5/7 là?",
    "choices": [
     "5/7",
     "-5/7",
     "7/5",
     "-7/5"
    ],
    "answer": 1,
    "explanation": "Số đối của a là -a, nên số đối của 5/7 là -5/7.",
    "choiceFeedback": [
     "Sai — đây là chính số đã cho, không phải số đối.",
     "Đúng — số đối của 5/7 là -5/7 vì 5/7+(-5/7)=0.",
     "Sai — đây là số nghịch đảo, không phải số đối.",
     "Sai — đây là số đối của số nghịch đảo, không đúng yêu cầu."
    ]
   },
   {
    "stem": "(2/3)·(3/4) = ?",
    "choices": [
     "2/3",
     "6/7",
     "1/2",
     "1"
    ],
    "answer": 2,
    "explanation": "(2·3)/(3·4)=6/12=1/2.",
    "choiceFeedback": [
     "Sai — chưa nhân đúng, chỉ giữ nguyên một thừa số.",
     "Sai — cộng tử và mẫu nhầm thay vì nhân.",
     "Đúng — 6/12 rút gọn bằng 1/2.",
     "Sai — kết quả nhân hai phân số nhỏ hơn 1 không thể bằng 1."
    ]
   },
   {
    "stem": "(−3/5) · (10/9) = ?",
    "choices": [
     "2/3",
     "-3/2",
     "-6/5",
     "-2/3"
    ],
    "answer": 3,
    "explanation": "(-3·10)/(5·9) = -30/45 = -2/3.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Sai — tính nhầm phép nhân phân số.",
     "Sai — chưa rút gọn đúng phân số -30/45.",
     "Đúng — -30/45 rút gọn bằng -2/3."
    ]
   },
   {
    "stem": "(2/3) : (4/9) = ?",
    "choices": [
     "3/2",
     "8/27",
     "2/3",
     "1"
    ],
    "answer": 0,
    "explanation": "(2/3)·(9/4) = 18/12 = 3/2.",
    "choiceFeedback": [
     "Đúng — chia bằng nhân với phân số nghịch đảo: (2/3)·(9/4)=3/2.",
     "Sai — đây là kết quả của phép nhân (2/3)·(4/9), không phải phép chia.",
     "Sai — chưa thực hiện phép chia.",
     "Sai — tính nhầm khi rút gọn."
    ]
   },
   {
    "stem": "Số nghịch đảo của −7/4 là?",
    "choices": [
     "7/4",
     "-4/7",
     "4/7",
     "-7/4"
    ],
    "answer": 1,
    "explanation": "Số nghịch đảo của a/b là b/a; của -7/4 là -4/7.",
    "choiceFeedback": [
     "Sai — thiếu dấu âm.",
     "Đúng — nghịch đảo của -7/4 là -4/7 vì (-7/4)·(-4/7)=1.",
     "Sai — sai dấu.",
     "Sai — đây là chính số đã cho, không phải nghịch đảo."
    ]
   },
   {
    "stem": "(2/3)^2 = ?",
    "choices": [
     "2/9",
     "4/3",
     "4/9",
     "2/3"
    ],
    "answer": 2,
    "explanation": "(2/3)^2 = 2²/3² = 4/9.",
    "choiceFeedback": [
     "Sai — chỉ bình phương tử, chưa bình phương mẫu.",
     "Sai — nhầm giữa bình phương và nhân đôi.",
     "Đúng — 2²=4, 3²=9 nên (2/3)²=4/9.",
     "Sai — đây là số ban đầu, chưa tính luỹ thừa."
    ]
   },
   {
    "stem": "a^m · a^n (a ≠ 0) = ?",
    "choices": [
     "a^(m-n)",
     "a^(mn)",
     "a^(m/n)",
     "a^(m+n)"
    ],
    "answer": 3,
    "explanation": "Nhân hai luỹ thừa cùng cơ số, ta giữ cơ số và cộng số mũ.",
    "choiceFeedback": [
     "Sai — đây là công thức chia hai luỹ thừa cùng cơ số.",
     "Sai — đây không phải quy tắc nhân luỹ thừa cùng cơ số.",
     "Sai — không có quy tắc chia số mũ khi nhân.",
     "Đúng — a^m · a^n = a^(m+n)."
    ]
   },
   {
    "stem": "Tính 2 + 3·(1/2) = ?",
    "choices": [
     "7/2",
     "5/2",
     "4",
     "5"
    ],
    "answer": 0,
    "explanation": "Nhân trước: 3·1/2=3/2; 2+3/2 = 7/2.",
    "choiceFeedback": [
     "Đúng — thực hiện phép nhân trước: 2 + 3/2 = 7/2.",
     "Sai — tính sai phép cộng phân số.",
     "Sai — cộng số nguyên trước khi nhân là sai thứ tự.",
     "Sai — cộng 2+3 rồi mới nhân là sai thứ tự thực hiện phép tính."
    ]
   },
   {
    "stem": "Tính 1 − (1/2 − 1/4) = ?",
    "choices": [
     "1/4",
     "3/4",
     "1/2",
     "5/4"
    ],
    "answer": 1,
    "explanation": "1/2-1/4=1/4; 1-1/4=3/4.",
    "choiceFeedback": [
     "Sai — đây là giá trị trong ngoặc, chưa trừ cho 1.",
     "Đúng — 1/2-1/4=1/4, rồi 1-1/4=3/4.",
     "Sai — tính sai phép trừ trong ngoặc.",
     "Sai — cộng nhầm thay vì trừ."
    ]
   },
   {
    "stem": "Bỏ ngoặc đúng của biểu thức −(a − b + c) là?",
    "choices": [
     "-a-b+c",
     "-a+b+c",
     "-a+b-c",
     "a-b+c"
    ],
    "answer": 2,
    "explanation": "Trước ngoặc có dấu trừ nên đổi dấu tất cả các số hạng trong ngoặc: -a+b-c.",
    "choiceFeedback": [
     "Sai — dấu của b chưa đổi đúng.",
     "Sai — dấu của c chưa đổi đúng.",
     "Đúng — đổi dấu tất cả: -a+b-c.",
     "Sai — chưa đổi dấu số hạng a."
    ]
   },
   {
    "stem": "|−3/4| = ?",
    "choices": [
     "-3/4",
     "4/3",
     "0",
     "3/4"
    ],
    "answer": 3,
    "explanation": "Giá trị tuyệt đối của một số âm là số đối của nó (dương).",
    "choiceFeedback": [
     "Sai — giá trị tuyệt đối luôn không âm.",
     "Sai — nhầm với số nghịch đảo.",
     "Sai — chỉ số 0 mới có giá trị tuyệt đối bằng 0.",
     "Đúng — |−3/4| = 3/4."
    ]
   },
   {
    "stem": "Tìm x biết |x| = 5?",
    "choices": [
     "x = 5 hoặc x = -5",
     "x = 5",
     "x = -5",
     "x = 0"
    ],
    "answer": 0,
    "explanation": "Có hai số có giá trị tuyệt đối bằng 5 là 5 và -5.",
    "choiceFeedback": [
     "Đúng — cả 5 và -5 đều có giá trị tuyệt đối bằng 5.",
     "Sai — thiếu nghiệm x = -5.",
     "Sai — thiếu nghiệm x = 5.",
     "Sai — |0| = 0 ≠ 5."
    ]
   },
   {
    "stem": "Làm tròn 3,1415 đến chữ số thập phân thứ hai là?",
    "choices": [
     "3,15",
     "3,14",
     "3,1",
     "3,142"
    ],
    "answer": 1,
    "explanation": "Chữ số hàng phần nghìn là 1 < 5 nên giữ nguyên chữ số hàng phần trăm: 3,14.",
    "choiceFeedback": [
     "Sai — làm tròn lên không đúng vì chữ số bỏ đi là 1 (<5).",
     "Đúng — chữ số hàng phần nghìn là 1<5 nên giữ nguyên, được 3,14.",
     "Sai — đây là làm tròn đến chữ số thập phân thứ nhất, không đúng yêu cầu.",
     "Sai — đây là làm tròn đến chữ số thập phân thứ ba, không đúng yêu cầu."
    ]
   },
   {
    "stem": "Làm tròn 27,486 đến chữ số thập phân thứ nhất là?",
    "choices": [
     "27,4",
     "28,0",
     "27,5",
     "27,49"
    ],
    "answer": 2,
    "explanation": "Chữ số hàng phần trăm là 8 ≥5 nên làm tròn lên: 27,5.",
    "choiceFeedback": [
     "Sai — chưa làm tròn lên dù chữ số bỏ đi là 8 ≥5.",
     "Sai — làm tròn quá xa, không đúng vị trí yêu cầu.",
     "Đúng — chữ số hàng phần trăm 8≥5 nên phần mười tăng từ 4 lên 5: 27,5.",
     "Sai — đây là làm tròn đến chữ số thập phân thứ hai, không đúng yêu cầu."
    ]
   },
   {
    "stem": "Làm tròn 1 234 đến hàng trăm là?",
    "choices": [
     "1300",
     "1230",
     "1000",
     "1200"
    ],
    "answer": 3,
    "explanation": "Chữ số hàng chục là 3 <5 nên giữ nguyên hàng trăm: 1200.",
    "choiceFeedback": [
     "Sai — làm tròn lên không đúng vì chữ số hàng chục là 3<5.",
     "Sai — đây không phải làm tròn đến hàng trăm.",
     "Sai — làm tròn quá xa đến hàng nghìn.",
     "Đúng — chữ số hàng chục là 3<5 nên giữ nguyên hàng trăm, được 1200."
    ]
   },
   {
    "stem": "Căn bậc hai số học của 25 là?",
    "choices": [
     "5",
     "-5",
     "±5",
     "25"
    ],
    "answer": 0,
    "explanation": "Căn bậc hai số học của một số không âm a là số không âm x sao cho x²=a; của 25 là 5.",
    "choiceFeedback": [
     "Đúng — 5² = 25 và 5 ≥ 0.",
     "Sai — căn bậc hai số học luôn không âm.",
     "Sai — ±5 là hai căn bậc hai, nhưng căn bậc hai SỐ HỌC chỉ lấy giá trị không âm.",
     "Sai — đây là số ban đầu, chưa lấy căn."
    ]
   },
   {
    "stem": "Trong các số: 2; 1/3; √2; 0,75 — số nào là số vô tỉ?",
    "choices": [
     "2",
     "√2",
     "1/3",
     "0,75"
    ],
    "answer": 1,
    "explanation": "√2 không viết được dưới dạng phân số của hai số nguyên nên là số vô tỉ.",
    "choiceFeedback": [
     "Sai — 2 là số nguyên, cũng là số hữu tỉ.",
     "Đúng — √2 là số vô tỉ.",
     "Sai — 1/3 là phân số, là số hữu tỉ.",
     "Sai — 0,75 = 3/4 là số hữu tỉ."
    ]
   },
   {
    "stem": "Một hình vuông có diện tích 49 cm². Độ dài cạnh hình vuông là?",
    "choices": [
     "49 cm",
     "14 cm",
     "7 cm",
     "24,5 cm"
    ],
    "answer": 2,
    "explanation": "Cạnh = √diện tích = √49 = 7 cm.",
    "choiceFeedback": [
     "Sai — đây là diện tích, không phải cạnh.",
     "Sai — đây gấp đôi cạnh đúng.",
     "Đúng — cạnh = √49 = 7 cm.",
     "Sai — đây là một nửa diện tích, không phải cạnh hình vuông."
    ]
   },
   {
    "stem": "Tính giá trị biểu thức (−2)^2 + (−3)·2",
    "choices": [
     "10",
     "-10",
     "2",
     "-2"
    ],
    "answer": 3,
    "explanation": "(-2)^2=4; (-3)·2=-6; 4+(-6)=-2.",
    "choiceFeedback": [
     "Sai — tính sai dấu của (-3)·2.",
     "Sai — tính sai (-2)^2 (phải là số dương).",
     "Sai — cộng nhầm dấu của -6.",
     "Đúng — 4 + (-6) = -2."
    ]
   },
   {
    "stem": "Một người có 3/4 kg táo, sau đó mua thêm 1/2 kg táo cùng loại. Tổng khối lượng táo là bao nhiêu ki-lô-gam?",
    "choices": [
     "5/4 kg",
     "1 kg",
     "1/4 kg",
     "2 kg"
    ],
    "answer": 0,
    "explanation": "3/4 + 1/2 = 3/4+2/4 = 5/4 (kg).",
    "choiceFeedback": [
     "Đúng — 3/4+2/4=5/4 kg.",
     "Sai — tính tròn số chưa chính xác phân số.",
     "Sai — đây là hiệu chứ không phải tổng.",
     "Sai — tính vượt quá giá trị đúng."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S7TOAN-exam-ck1": {
  "id": "S7TOAN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 7",
  "questions": [
   {
    "stem": "Kết quả (−1/3) − (−1/6) = ?",
    "choices": [
     "1/6",
     "-1/6",
     "-1/2",
     "1/2"
    ],
    "answer": 1,
    "explanation": "-1/3-(-1/6) = -1/3+1/6 = -2/6+1/6 = -1/6.",
    "choiceFeedback": [
     "Sai — sai dấu kết quả.",
     "Đúng — -2/6+1/6=-1/6.",
     "Sai — quy đồng mẫu sai.",
     "Sai — sai dấu và sai quy đồng."
    ]
   },
   {
    "stem": "a^m : a^n (a≠0) = ?",
    "choices": [
     "a^(m+n)",
     "a^(mn)",
     "a^(m-n)",
     "a^(n-m)"
    ],
    "answer": 2,
    "explanation": "Chia hai luỹ thừa cùng cơ số, giữ cơ số, trừ số mũ.",
    "choiceFeedback": [
     "Sai — đây là công thức nhân hai luỹ thừa.",
     "Sai — không có quy tắc nhân số mũ khi chia.",
     "Đúng — a^m:a^n=a^(m-n).",
     "Sai — thứ tự trừ số mũ bị đảo ngược."
    ]
   },
   {
    "stem": "Quy ước a^0 (a≠0) = ?",
    "choices": [
     "0",
     "a",
     "Không xác định",
     "1"
    ],
    "answer": 3,
    "explanation": "Theo quy ước, mọi số khác 0 luỹ thừa 0 đều bằng 1.",
    "choiceFeedback": [
     "Sai — chỉ 0^0 mới không xác định, còn a^0=1.",
     "Sai — nhầm với a^1.",
     "Sai — quy ước a^0 luôn xác định bằng 1 khi a≠0.",
     "Đúng — a^0=1 với mọi a≠0."
    ]
   },
   {
    "stem": "Tập số thực R gồm?",
    "choices": [
     "Tất cả số hữu tỉ và số vô tỉ",
     "Chỉ số hữu tỉ",
     "Chỉ số vô tỉ",
     "Chỉ số nguyên"
    ],
    "answer": 0,
    "explanation": "Tập số thực là hợp của tập số hữu tỉ và tập số vô tỉ.",
    "choiceFeedback": [
     "Đúng — R = Q ∪ (tập số vô tỉ).",
     "Sai — thiếu số vô tỉ.",
     "Sai — thiếu số hữu tỉ.",
     "Sai — số nguyên chỉ là một bộ phận nhỏ của R."
    ]
   },
   {
    "stem": "Quan hệ bao hàm đúng là?",
    "choices": [
     "R ⊂ Q",
     "N ⊂ Z ⊂ Q ⊂ R",
     "Q ⊂ N",
     "Z ⊂ N"
    ],
    "answer": 1,
    "explanation": "Thứ tự bao hàm chuẩn: N ⊂ Z ⊂ Q ⊂ R.",
    "choiceFeedback": [
     "Sai — ngược lại, Q ⊂ R.",
     "Đúng — đây là thứ tự bao hàm chuẩn của các tập số.",
     "Sai — N ⊂ Q chứ không phải ngược lại.",
     "Sai — Z ⊂ N chứ không phải ngược lại (N ⊂ Z mới đúng)."
    ]
   },
   {
    "stem": "Cho tỉ lệ thức 2/3 = x/12. Tìm x?",
    "choices": [
     "6",
     "18",
     "8",
     "4"
    ],
    "answer": 2,
    "explanation": "x = (2·12)/3 = 8.",
    "choiceFeedback": [
     "Sai — tính nhầm phép nhân chéo.",
     "Sai — nhân sai vị trí.",
     "Đúng — x=(2·12)/3=8.",
     "Sai — chia nhầm thay vì nhân chéo đúng cách."
    ]
   },
   {
    "stem": "Tính chất dãy tỉ số bằng nhau: a/b = c/d = (a+c)/?",
    "choices": [
     "a-c",
     "b-d",
     "a·c",
     "b+d"
    ],
    "answer": 3,
    "explanation": "Tính chất dãy tỉ số bằng nhau: a/b=c/d=(a+c)/(b+d) (b+d≠0).",
    "choiceFeedback": [
     "Sai — đây không phải công thức của tính chất dãy tỉ số.",
     "Sai — mẫu phải là tổng, không phải hiệu.",
     "Sai — không liên quan đến tính chất này.",
     "Đúng — a/b=c/d=(a+c)/(b+d)."
    ]
   },
   {
    "stem": "Cho 3/x = 5/15. Tìm x?",
    "choices": [
     "9",
     "5",
     "15",
     "3"
    ],
    "answer": 0,
    "explanation": "5/15=1/3, nên 3/x=1/3 => x=9.",
    "choiceFeedback": [
     "Đúng — 5/15 rút gọn=1/3 nên x=9.",
     "Sai — nhầm x với tử số của vế phải.",
     "Sai — nhầm x với mẫu số của vế phải.",
     "Sai — nhầm x bằng tử số vế trái."
    ]
   },
   {
    "stem": "Trong tỉ lệ thức a/b = c/d, b và c được gọi là?",
    "choices": [
     "Ngoại tỉ",
     "Trung tỉ",
     "Tỉ số",
     "Số hạng tự do"
    ],
    "answer": 1,
    "explanation": "Trong tỉ lệ thức a:b=c:d, b và c là các trung tỉ, còn a và d là ngoại tỉ.",
    "choiceFeedback": [
     "Sai — a và d mới là ngoại tỉ.",
     "Đúng — b và c là trung tỉ (nằm giữa).",
     "Sai — đây không phải tên gọi trong tỉ lệ thức.",
     "Sai — khái niệm này không dùng cho tỉ lệ thức."
    ]
   },
   {
    "stem": "Hai đại lượng y, x tỉ lệ thuận khi?",
    "choices": [
     "y = k/x (k≠0)",
     "y = x + k",
     "y = kx (k≠0)",
     "y = x - k"
    ],
    "answer": 2,
    "explanation": "y tỉ lệ thuận với x khi y=kx với k là hằng số khác 0.",
    "choiceFeedback": [
     "Sai — đây là công thức tỉ lệ nghịch.",
     "Sai — đây không phải quan hệ tỉ lệ.",
     "Đúng — y=kx là công thức tỉ lệ thuận.",
     "Sai — đây không phải quan hệ tỉ lệ."
    ]
   },
   {
    "stem": "Mua 3 kg gạo hết 60 nghìn đồng. Hỏi mua 5 kg gạo cùng loại hết bao nhiêu?",
    "choices": [
     "80 nghìn",
     "90 nghìn",
     "120 nghìn",
     "100 nghìn"
    ],
    "answer": 3,
    "explanation": "Đơn giá 60:3=20 nghìn/kg; 5 kg hết 5·20=100 nghìn đồng.",
    "choiceFeedback": [
     "Sai — tính sai đơn giá hoặc phép nhân.",
     "Sai — tính sai đơn giá hoặc phép nhân.",
     "Sai — nhân nhầm với số khác 5.",
     "Đúng — đơn giá 20 nghìn/kg, 5 kg hết 100 nghìn."
    ]
   },
   {
    "stem": "Hai đại lượng y, x tỉ lệ nghịch khi?",
    "choices": [
     "xy = k (k≠0, không đổi)",
     "y = kx",
     "y = x + k",
     "y/x = k"
    ],
    "answer": 0,
    "explanation": "x, y tỉ lệ nghịch khi tích xy không đổi = k.",
    "choiceFeedback": [
     "Đúng — xy=k không đổi là đặc trưng của tỉ lệ nghịch.",
     "Sai — đây là công thức tỉ lệ thuận.",
     "Sai — đây không phải quan hệ tỉ lệ.",
     "Sai — đây là đặc trưng của tỉ lệ thuận (thương không đổi)."
    ]
   },
   {
    "stem": "Nếu xy = 24 và x = 4 thì y = ?",
    "choices": [
     "20",
     "6",
     "28",
     "96"
    ],
    "answer": 1,
    "explanation": "y=24/4=6.",
    "choiceFeedback": [
     "Sai — tính bằng phép trừ thay vì chia.",
     "Đúng — y=24:4=6.",
     "Sai — tính bằng phép cộng thay vì chia.",
     "Sai — tính bằng phép nhân thay vì chia."
    ]
   },
   {
    "stem": "4 người làm xong một công việc trong 6 ngày. Hỏi 8 người (cùng năng suất) làm xong công việc đó trong bao nhiêu ngày?",
    "choices": [
     "12 ngày",
     "4 ngày",
     "3 ngày",
     "24 ngày"
    ],
    "answer": 2,
    "explanation": "Số người và số ngày tỉ lệ nghịch: 4·6=8·t => t=3 ngày.",
    "choiceFeedback": [
     "Sai — tính nhầm theo tỉ lệ thuận thay vì nghịch.",
     "Sai — chưa tính đúng theo tích không đổi.",
     "Đúng — 4·6=8·t nên t=3 ngày.",
     "Sai — nhân thay vì chia."
    ]
   },
   {
    "stem": "Biểu đồ hình quạt thường dùng để biểu diễn?",
    "choices": [
     "Sự thay đổi theo thời gian",
     "So sánh số liệu theo thứ tự",
     "Số liệu rời rạc theo cột",
     "Tỉ lệ phần trăm các thành phần trong tổng thể"
    ],
    "answer": 3,
    "explanation": "Biểu đồ quạt (tròn) thể hiện tỉ lệ phần trăm của các phần trong một tổng thể.",
    "choiceFeedback": [
     "Sai — đây là công dụng của biểu đồ đoạn thẳng.",
     "Sai — đây thiên về biểu đồ cột.",
     "Sai — đây là mô tả của biểu đồ cột.",
     "Đúng — biểu đồ quạt thể hiện tỉ lệ % của từng thành phần."
    ]
   },
   {
    "stem": "Tổng các phần trăm trong biểu đồ hình quạt phải bằng?",
    "choices": [
     "100%",
     "50%",
     "360%",
     "Không cố định"
    ],
    "answer": 0,
    "explanation": "Biểu đồ quạt biểu diễn toàn bộ dữ liệu nên tổng tỉ lệ phần trăm luôn bằng 100%.",
    "choiceFeedback": [
     "Đúng — tổng tỉ lệ các phần luôn là 100% của tổng thể.",
     "Sai — 50% chỉ là một phần, không phải toàn bộ.",
     "Sai — nhầm với tổng số đo góc (360°).",
     "Sai — tổng luôn cố định bằng 100%."
    ]
   },
   {
    "stem": "Trung bình cộng của dãy số liệu 3; 5; 7 là?",
    "choices": [
     "4",
     "5",
     "7",
     "15"
    ],
    "answer": 1,
    "explanation": "(3+5+7)/3=15/3=5.",
    "choiceFeedback": [
     "Sai — chia sai tổng cho số lượng số liệu.",
     "Đúng — (3+5+7):3=5.",
     "Sai — đây là giá trị lớn nhất, không phải trung bình.",
     "Sai — đây là tổng, chưa chia cho số lượng số liệu."
    ]
   },
   {
    "stem": "Mốt của dãy số liệu 2; 3; 3; 4; 5 là?",
    "choices": [
     "2",
     "5",
     "3",
     "4"
    ],
    "answer": 2,
    "explanation": "Mốt là giá trị xuất hiện nhiều nhất, ở đây là 3 (xuất hiện 2 lần).",
    "choiceFeedback": [
     "Sai — 2 chỉ xuất hiện 1 lần.",
     "Sai — 5 chỉ xuất hiện 1 lần.",
     "Đúng — 3 xuất hiện nhiều nhất (2 lần).",
     "Sai — 4 chỉ xuất hiện 1 lần."
    ]
   },
   {
    "stem": "Hai góc kề bù có tổng số đo bằng?",
    "choices": [
     "90°",
     "360°",
     "120°",
     "180°"
    ],
    "answer": 3,
    "explanation": "Hai góc kề bù có tổng số đo bằng 180°.",
    "choiceFeedback": [
     "Sai — đây là tổng của hai góc phụ nhau.",
     "Sai — đây là tổng số đo một vòng tròn.",
     "Sai — không phải định nghĩa góc kề bù.",
     "Đúng — hai góc kề bù có tổng bằng 180°."
    ]
   },
   {
    "stem": "Nếu ∠AOB = 60° và Ot là tia phân giác của góc AOB thì ∠AOt = ?",
    "choices": [
     "30°",
     "60°",
     "120°",
     "15°"
    ],
    "answer": 0,
    "explanation": "Tia phân giác chia góc thành hai góc bằng nhau, mỗi góc bằng một nửa: 60°:2=30°.",
    "choiceFeedback": [
     "Đúng — ∠AOt = 60°:2 = 30°.",
     "Sai — đây là số đo cả góc AOB, chưa chia đôi.",
     "Sai — gấp đôi giá trị đúng.",
     "Sai — chia sai (chia 4 thay vì chia 2)."
    ]
   },
   {
    "stem": "Khi một đường thẳng cắt hai đường thẳng song song, hai góc đồng vị?",
    "choices": [
     "Bù nhau",
     "Bằng nhau",
     "Phụ nhau",
     "Kề nhau"
    ],
    "answer": 1,
    "explanation": "Tính chất hai đường thẳng song song: các cặp góc đồng vị bằng nhau.",
    "choiceFeedback": [
     "Sai — đây là tính chất của góc trong cùng phía.",
     "Đúng — hai góc đồng vị bằng nhau khi hai đường thẳng song song.",
     "Sai — không đúng tính chất góc đồng vị.",
     "Sai — kề nhau là quan hệ vị trí, không phải tính chất bằng nhau."
    ]
   },
   {
    "stem": "Tiên đề Ơ-clit khẳng định: qua một điểm nằm ngoài một đường thẳng cho trước, có bao nhiêu đường thẳng song song với đường thẳng đó?",
    "choices": [
     "Không có đường nào",
     "Vô số",
     "Chỉ một đường duy nhất",
     "Hai đường"
    ],
    "answer": 2,
    "explanation": "Tiên đề Ơ-clit: qua một điểm ngoài đường thẳng, chỉ có một và chỉ một đường thẳng song song với đường thẳng đó.",
    "choiceFeedback": [
     "Sai — luôn tồn tại một đường như vậy.",
     "Sai — chỉ có duy nhất một đường, không phải vô số.",
     "Đúng — đây chính là nội dung tiên đề Ơ-clit.",
     "Sai — chỉ có một đường duy nhất, không phải hai."
    ]
   },
   {
    "stem": "Tổng ba góc trong một tam giác bằng?",
    "choices": [
     "90°",
     "270°",
     "360°",
     "180°"
    ],
    "answer": 3,
    "explanation": "Định lí tổng ba góc trong tam giác: tổng ba góc bằng 180°.",
    "choiceFeedback": [
     "Sai — đây là số đo góc vuông.",
     "Sai — không đúng định lí tổng ba góc.",
     "Sai — đây là tổng góc của tứ giác.",
     "Đúng — tổng ba góc trong tam giác luôn bằng 180°."
    ]
   },
   {
    "stem": "Một tam giác có hai góc lần lượt là 50° và 60°. Góc thứ ba của tam giác bằng?",
    "choices": [
     "70°",
     "80°",
     "60°",
     "110°"
    ],
    "answer": 0,
    "explanation": "Góc thứ ba = 180°-50°-60°=70°.",
    "choiceFeedback": [
     "Đúng — 180°-50°-60°=70°.",
     "Sai — tính sai phép trừ.",
     "Sai — trùng với một góc đã cho, không đúng.",
     "Sai — tính nhầm bằng phép cộng thay vì trừ."
    ]
   },
   {
    "stem": "Một tam giác có hai góc 35° và 95°. Số đo góc còn lại và loại tam giác (theo góc) là?",
    "choices": [
     "50°; tam giác vuông",
     "50°; tam giác tù",
     "60°; tam giác nhọn",
     "50°; tam giác nhọn"
    ],
    "answer": 1,
    "explanation": "Góc còn lại = 180°-35°-95°=50°. Vì có góc 95°>90° nên tam giác là tam giác tù.",
    "choiceFeedback": [
     "Sai — góc đúng nhưng đây không phải tam giác vuông vì không có góc 90°.",
     "Đúng — góc còn lại 50°, và vì có góc 95°>90° nên là tam giác tù.",
     "Sai — tính sai góc còn lại.",
     "Sai — góc đúng nhưng phân loại sai vì có góc tù (95°>90°)."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S7TOAN-exam-gk2": {
  "id": "S7TOAN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 7",
  "questions": [
   {
    "stem": "Hai tam giác bằng nhau thì có?",
    "choices": [
     "Diện tích bằng nhau nhưng góc khác nhau",
     "Chu vi bằng nhau nhưng cạnh khác nhau",
     "Các cạnh tương ứng và các góc tương ứng bằng nhau",
     "Chỉ các góc tương ứng bằng nhau"
    ],
    "answer": 2,
    "explanation": "Hai tam giác bằng nhau là hai tam giác có các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.",
    "choiceFeedback": [
     "Sai — đây chỉ là hệ quả, chưa đủ và chưa đúng bản chất.",
     "Sai — cạnh tương ứng cũng phải bằng nhau, không chỉ chu vi.",
     "Đúng — đây đúng định nghĩa hai tam giác bằng nhau.",
     "Sai — cạnh tương ứng cũng phải bằng nhau, không chỉ góc."
    ]
   },
   {
    "stem": "Trường hợp bằng nhau cạnh-cạnh-cạnh (c-c-c) có nghĩa là?",
    "choices": [
     "Hai tam giác có một cặp cạnh bằng nhau",
     "Hai tam giác có hai cặp cạnh bằng nhau",
     "Hai tam giác có một góc bằng nhau",
     "Ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia"
    ],
    "answer": 3,
    "explanation": "Trường hợp c-c-c: nếu ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia thì hai tam giác bằng nhau.",
    "choiceFeedback": [
     "Sai — cần đủ ba cặp cạnh, không phải một cặp.",
     "Sai — cần đủ ba cặp cạnh, không phải hai cặp.",
     "Sai — c-c-c không liên quan đến góc.",
     "Đúng — ba cặp cạnh tương ứng bằng nhau."
    ]
   },
   {
    "stem": "Cho ΔABC = ΔDEF (theo đúng thứ tự đỉnh tương ứng). Suy ra AB = ?",
    "choices": [
     "DE",
     "EF",
     "DF",
     "FD"
    ],
    "answer": 0,
    "explanation": "Theo thứ tự tương ứng A↔D, B↔E, C↔F nên AB tương ứng với DE.",
    "choiceFeedback": [
     "Đúng — A tương ứng D, B tương ứng E nên AB=DE.",
     "Sai — EF tương ứng với BC, không phải AB.",
     "Sai — DF tương ứng với AC, không phải AB.",
     "Sai — FD không phải cạnh tương ứng với AB."
    ]
   },
   {
    "stem": "Trường hợp bằng nhau cạnh-góc-cạnh (c-g-c) là?",
    "choices": [
     "Hai cạnh và một góc bất kỳ bằng nhau",
     "Hai cạnh và góc xen giữa hai cạnh đó bằng nhau",
     "Ba góc bằng nhau",
     "Một cạnh và hai góc bằng nhau"
    ],
    "answer": 1,
    "explanation": "c-g-c: hai cạnh và góc xen giữa hai cạnh ấy của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia.",
    "choiceFeedback": [
     "Sai — góc phải là góc xen giữa hai cạnh, không phải góc bất kỳ.",
     "Đúng — đúng định nghĩa trường hợp c-g-c.",
     "Sai — đây không xác định được bằng nhau (chỉ đồng dạng).",
     "Sai — đây là mô tả của trường hợp g-c-g."
    ]
   },
   {
    "stem": "Trường hợp bằng nhau góc-cạnh-góc (g-c-g) cần dữ kiện?",
    "choices": [
     "Ba góc bằng nhau",
     "Hai góc bất kỳ và một cạnh bất kỳ",
     "Một cạnh và hai góc kề cạnh đó bằng nhau",
     "Hai cạnh bằng nhau"
    ],
    "answer": 2,
    "explanation": "g-c-g: một cạnh và hai góc kề cạnh ấy của tam giác này bằng một cạnh và hai góc kề cạnh tương ứng của tam giác kia.",
    "choiceFeedback": [
     "Sai — ba góc bằng nhau chỉ cho hai tam giác đồng dạng, không chắc bằng nhau.",
     "Sai — góc và cạnh phải có vị trí kề nhau xác định, không phải bất kỳ.",
     "Đúng — đúng định nghĩa trường hợp g-c-g.",
     "Sai — đây là mô tả không đầy đủ, thiếu góc xen giữa (đó là c-g-c hoặc c-c-c)."
    ]
   },
   {
    "stem": "Tam giác cân là tam giác có?",
    "choices": [
     "Ba cạnh bằng nhau",
     "Một góc vuông",
     "Ba góc bằng nhau",
     "Hai cạnh bằng nhau"
    ],
    "answer": 3,
    "explanation": "Tam giác cân là tam giác có hai cạnh bằng nhau (hai cạnh bên).",
    "choiceFeedback": [
     "Sai — đây là định nghĩa tam giác đều.",
     "Sai — đây là định nghĩa tam giác vuông.",
     "Sai — đây cũng là đặc điểm của tam giác đều.",
     "Đúng — tam giác cân có đúng hai cạnh bằng nhau."
    ]
   },
   {
    "stem": "Trong tam giác cân, hai góc ở đáy có tính chất?",
    "choices": [
     "Bằng nhau",
     "Bù nhau",
     "Phụ nhau",
     "Luôn bằng 90°"
    ],
    "answer": 0,
    "explanation": "Tính chất tam giác cân: hai góc ở đáy bằng nhau.",
    "choiceFeedback": [
     "Đúng — đây là tính chất cơ bản của tam giác cân.",
     "Sai — không có ràng buộc tổng 180° giữa hai góc đáy.",
     "Sai — không có ràng buộc tổng 90° giữa hai góc đáy.",
     "Sai — góc đáy tam giác cân không nhất thiết là góc vuông."
    ]
   },
   {
    "stem": "Tam giác cân có một góc ở đáy bằng 50°. Góc ở đỉnh bằng?",
    "choices": [
     "50°",
     "80°",
     "100°",
     "130°"
    ],
    "answer": 1,
    "explanation": "Hai góc đáy bằng nhau =50° mỗi góc; góc đỉnh = 180°-50°-50°=80°.",
    "choiceFeedback": [
     "Sai — đây là góc đáy, không phải góc đỉnh.",
     "Đúng — 180°-50°-50°=80°.",
     "Sai — tính nhầm, chỉ trừ một góc đáy.",
     "Sai — tính vượt quá giá trị đúng."
    ]
   },
   {
    "stem": "Tam giác cân có góc ở đỉnh bằng 80°. Mỗi góc ở đáy bằng?",
    "choices": [
     "80°",
     "100°",
     "50°",
     "40°"
    ],
    "answer": 2,
    "explanation": "Hai góc đáy bằng nhau: (180°-80°)/2=50°.",
    "choiceFeedback": [
     "Sai — đây là góc đỉnh, không phải góc đáy.",
     "Sai — tổng hai góc đáy phải là 100°, mỗi góc chỉ bằng một nửa.",
     "Đúng — (180°-80°):2=50°.",
     "Sai — chia sai (chia 2,5 thay vì chia 2)."
    ]
   },
   {
    "stem": "Tam giác có hai góc bằng 60° thì tam giác đó là?",
    "choices": [
     "Tam giác vuông",
     "Tam giác cân (không đều)",
     "Tam giác tù",
     "Tam giác đều"
    ],
    "answer": 3,
    "explanation": "Góc thứ ba = 180°-60°-60°=60°, ba góc đều bằng 60° nên là tam giác đều.",
    "choiceFeedback": [
     "Sai — không có góc nào bằng 90°.",
     "Sai — thực tế cả ba góc bằng nhau nên là tam giác đều, mạnh hơn cân.",
     "Sai — không có góc nào lớn hơn 90°.",
     "Đúng — góc thứ ba cũng bằng 60°, ba góc bằng nhau nên là tam giác đều."
    ]
   },
   {
    "stem": "Định lí Py-ta-go áp dụng cho loại tam giác nào?",
    "choices": [
     "Tam giác vuông",
     "Tam giác cân",
     "Tam giác đều",
     "Mọi tam giác bất kỳ"
    ],
    "answer": 0,
    "explanation": "Định lí Py-ta-go chỉ áp dụng cho tam giác vuông: bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.",
    "choiceFeedback": [
     "Đúng — định lí Py-ta-go phát biểu riêng cho tam giác vuông.",
     "Sai — tam giác cân không nhất thiết vuông.",
     "Sai — tam giác đều không nhất thiết vuông.",
     "Sai — định lí chỉ đúng cho tam giác vuông, không phải mọi tam giác."
    ]
   },
   {
    "stem": "Trong tam giác vuông có cạnh huyền c, hai cạnh góc vuông a, b, hệ thức Py-ta-go là?",
    "choices": [
     "c^2 = a^2 - b^2",
     "c^2 = a^2 + b^2",
     "c = a + b",
     "a^2 = b^2 + c^2"
    ],
    "answer": 1,
    "explanation": "Định lí Py-ta-go: bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông: c²=a²+b².",
    "choiceFeedback": [
     "Sai — phải là dấu cộng, không phải trừ.",
     "Đúng — c²=a²+b².",
     "Sai — đây không phải hệ thức bình phương.",
     "Sai — cạnh huyền c phải là vế có giá trị lớn nhất, không phải a."
    ]
   },
   {
    "stem": "Tam giác vuông có hai cạnh góc vuông lần lượt là 3 và 4. Cạnh huyền bằng?",
    "choices": [
     "7",
     "12",
     "5",
     "25"
    ],
    "answer": 2,
    "explanation": "c=√(3²+4²)=√25=5.",
    "choiceFeedback": [
     "Sai — cộng trực tiếp hai cạnh, không bình phương.",
     "Sai — nhân hai cạnh, không đúng công thức.",
     "Đúng — √(9+16)=√25=5.",
     "Sai — đây là 3²+4²=25, chưa lấy căn bậc hai."
    ]
   },
   {
    "stem": "Tam giác vuông có cạnh huyền 13, một cạnh góc vuông là 5. Cạnh góc vuông còn lại bằng?",
    "choices": [
     "8",
     "18",
     "144",
     "12"
    ],
    "answer": 3,
    "explanation": "cạnh còn lại=√(13²-5²)=√(169-25)=√144=12.",
    "choiceFeedback": [
     "Sai — tính nhầm phép trừ dưới căn.",
     "Sai — cộng thay vì trừ dưới căn.",
     "Sai — đây là 13²-5²=144, chưa lấy căn bậc hai.",
     "Đúng — √(169-25)=√144=12."
    ]
   },
   {
    "stem": "Bộ ba số (5; 12; 13) là bộ ba Py-ta-go vì?",
    "choices": [
     "5²+12²=13²",
     "5+12=13",
     "5·12=13",
     "12²+13²=5²"
    ],
    "answer": 0,
    "explanation": "25+144=169=13², thỏa mãn định lí Py-ta-go đảo nên (5,12,13) là bộ ba Py-ta-go.",
    "choiceFeedback": [
     "Đúng — 25+144=169=13².",
     "Sai — 5+12=17≠13, đây không phải điều kiện Py-ta-go.",
     "Sai — phép nhân không liên quan đến định lí Py-ta-go.",
     "Sai — sai vị trí, cạnh huyền phải là 13 chứ không phải 5."
    ]
   },
   {
    "stem": "Đường trung trực của một đoạn thẳng là đường thẳng?",
    "choices": [
     "Đi qua một đầu mút của đoạn thẳng",
     "Vuông góc với đoạn thẳng tại trung điểm của nó",
     "Song song với đoạn thẳng",
     "Cắt đoạn thẳng tại một điểm bất kỳ"
    ],
    "answer": 1,
    "explanation": "Đường trung trực của đoạn thẳng vuông góc với đoạn thẳng đó tại trung điểm.",
    "choiceFeedback": [
     "Sai — đường trung trực đi qua trung điểm, không phải đầu mút.",
     "Đúng — đây đúng định nghĩa đường trung trực.",
     "Sai — đường trung trực vuông góc, không song song.",
     "Sai — điểm cắt phải là trung điểm, không phải điểm bất kỳ."
    ]
   },
   {
    "stem": "Ba đường trung tuyến của một tam giác đồng quy tại điểm gọi là?",
    "choices": [
     "Trực tâm",
     "Tâm đường tròn ngoại tiếp",
     "Trọng tâm",
     "Tâm đường tròn nội tiếp"
    ],
    "answer": 2,
    "explanation": "Ba đường trung tuyến của tam giác đồng quy tại trọng tâm.",
    "choiceFeedback": [
     "Sai — trực tâm là giao điểm ba đường cao.",
     "Sai — tâm ngoại tiếp là giao điểm ba đường trung trực.",
     "Đúng — giao điểm ba đường trung tuyến là trọng tâm.",
     "Sai — tâm nội tiếp là giao điểm ba đường phân giác."
    ]
   },
   {
    "stem": "Trọng tâm chia mỗi đường trung tuyến theo tỉ số nào, tính từ đỉnh?",
    "choices": [
     "1:1",
     "1:3",
     "3:1",
     "2:1"
    ],
    "answer": 3,
    "explanation": "Trọng tâm chia mỗi đường trung tuyến thành hai đoạn theo tỉ số 2:1, đoạn từ đỉnh tới trọng tâm dài gấp đôi đoạn còn lại.",
    "choiceFeedback": [
     "Sai — không chia đều nhau.",
     "Sai — sai tỉ số và ngược thứ tự.",
     "Sai — ngược thứ tự đúng.",
     "Đúng — đoạn từ đỉnh đến trọng tâm gấp đôi đoạn từ trọng tâm đến trung điểm cạnh đối diện."
    ]
   },
   {
    "stem": "Ba đường phân giác trong của tam giác đồng quy tại điểm gọi là?",
    "choices": [
     "Tâm đường tròn nội tiếp",
     "Trọng tâm",
     "Trực tâm",
     "Tâm đường tròn ngoại tiếp"
    ],
    "answer": 0,
    "explanation": "Ba đường phân giác trong đồng quy tại tâm đường tròn nội tiếp tam giác.",
    "choiceFeedback": [
     "Đúng — đây là tâm đường tròn nội tiếp tam giác.",
     "Sai — trọng tâm là giao điểm ba trung tuyến.",
     "Sai — trực tâm là giao điểm ba đường cao.",
     "Sai — tâm ngoại tiếp là giao điểm ba trung trực."
    ]
   },
   {
    "stem": "Ba đường cao của một tam giác đồng quy tại điểm gọi là?",
    "choices": [
     "Trọng tâm",
     "Trực tâm",
     "Tâm nội tiếp",
     "Tâm ngoại tiếp"
    ],
    "answer": 1,
    "explanation": "Ba đường cao đồng quy tại trực tâm của tam giác.",
    "choiceFeedback": [
     "Sai — trọng tâm là giao điểm ba trung tuyến.",
     "Đúng — giao điểm ba đường cao là trực tâm.",
     "Sai — tâm nội tiếp là giao điểm ba phân giác.",
     "Sai — tâm ngoại tiếp là giao điểm ba trung trực."
    ]
   },
   {
    "stem": "Trong tam giác, cạnh đối diện với góc lớn hơn thì?",
    "choices": [
     "Nhỏ hơn",
     "Bằng cạnh đối diện góc nhỏ hơn",
     "Lớn hơn",
     "Không so sánh được"
    ],
    "answer": 2,
    "explanation": "Quan hệ giữa góc và cạnh đối diện trong tam giác: góc lớn hơn thì cạnh đối diện lớn hơn.",
    "choiceFeedback": [
     "Sai — quan hệ ngược lại mới đúng.",
     "Sai — hai cạnh không bằng nhau nếu hai góc đối diện khác nhau.",
     "Đúng — góc lớn hơn thì cạnh đối diện lớn hơn.",
     "Sai — luôn so sánh được nhờ định lí quan hệ góc-cạnh."
    ]
   },
   {
    "stem": "Bất đẳng thức tam giác: nếu a, b, c là ba cạnh của một tam giác thì?",
    "choices": [
     "a = b + c",
     "a + b < c",
     "a - b > c",
     "a < b + c"
    ],
    "answer": 3,
    "explanation": "Trong tam giác, mỗi cạnh nhỏ hơn tổng hai cạnh còn lại (bất đẳng thức tam giác).",
    "choiceFeedback": [
     "Sai — đây không thể là đẳng thức, tam giác sẽ suy biến.",
     "Sai — ngược dấu bất đẳng thức đúng.",
     "Sai — đây không đúng bất đẳng thức tam giác.",
     "Đúng — mỗi cạnh luôn nhỏ hơn tổng hai cạnh còn lại."
    ]
   },
   {
    "stem": "Bộ ba số nào sau đây KHÔNG thể là độ dài ba cạnh của một tam giác?",
    "choices": [
     "1 cm; 2 cm; 3 cm",
     "3 cm; 4 cm; 5 cm",
     "5 cm; 6 cm; 7 cm",
     "6 cm; 8 cm; 10 cm"
    ],
    "answer": 0,
    "explanation": "1+2=3 không lớn hơn 3 nên không thoả bất đẳng thức tam giác, không tạo thành tam giác.",
    "choiceFeedback": [
     "Đúng — 1+2=3, không lớn hơn cạnh còn lại nên không tạo thành tam giác.",
     "Sai — 3+4>5, thoả mãn, đây là bộ ba Py-ta-go hợp lệ.",
     "Sai — 5+6>7, thoả mãn bất đẳng thức tam giác.",
     "Sai — 6+8>10, thoả mãn, đây là bộ ba Py-ta-go hợp lệ."
    ]
   },
   {
    "stem": "Trong biểu thức 5x²y, hệ số là?",
    "choices": [
     "x²y",
     "5",
     "2",
     "x"
    ],
    "answer": 1,
    "explanation": "Trong đơn thức 5x²y, phần số 5 là hệ số, x²y là phần biến.",
    "choiceFeedback": [
     "Sai — đây là phần biến, không phải hệ số.",
     "Đúng — 5 là hệ số của đơn thức.",
     "Sai — 2 chỉ là số mũ của biến x, không phải hệ số.",
     "Sai — x chỉ là một phần của biến, không phải hệ số."
    ]
   },
   {
    "stem": "Trong biểu thức 3x + 5, khi x = 2, giá trị của biểu thức là bao nhiêu, và biểu thức 3x+5 có phải đơn thức không?",
    "choices": [
     "8; là đơn thức",
     "11; là đơn thức",
     "11; không phải đơn thức",
     "6; không phải đơn thức"
    ],
    "answer": 2,
    "explanation": "Thay x=2: 3·2+5=11. Vì biểu thức có phép cộng hai hạng tử (3x và 5) nên là đa thức, không phải đơn thức.",
    "choiceFeedback": [
     "Sai — giá trị tính sai và phân loại cũng sai.",
     "Sai — giá trị đúng nhưng phân loại sai, đây có phép cộng nên không phải đơn thức.",
     "Đúng — 3·2+5=11, và vì có phép cộng nên đây là đa thức, không phải đơn thức.",
     "Sai — cả giá trị và phân loại đều sai."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S7TOAN-exam-ck2": {
  "id": "S7TOAN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 7",
  "kind": "quiz",
  "yearLevel": 7,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 7",
  "questions": [
   {
    "stem": "Trường hợp bằng nhau cạnh-cạnh-cạnh (c-c-c) của hai tam giác nghĩa là?",
    "choices": [
     "Ba cạnh tương ứng bằng nhau",
     "Ba góc tương ứng bằng nhau",
     "Một cạnh và một góc bằng nhau",
     "Hai cạnh bằng nhau"
    ],
    "answer": 0,
    "explanation": "c-c-c: ba cạnh của tam giác này bằng ba cạnh tương ứng của tam giác kia.",
    "choiceFeedback": [
     "Đúng — đúng định nghĩa trường hợp c-c-c.",
     "Sai — ba góc bằng nhau chỉ cho đồng dạng, không chắc bằng nhau.",
     "Sai — chưa đủ dữ kiện để hai tam giác bằng nhau.",
     "Sai — chưa đủ ba cặp cạnh."
    ]
   },
   {
    "stem": "Định lí Py-ta-go đảo dùng để?",
    "choices": [
     "Tính cạnh huyền của tam giác vuông",
     "Nhận biết một tam giác có phải tam giác vuông hay không",
     "Tính chu vi tam giác",
     "Tính diện tích tam giác"
    ],
    "answer": 1,
    "explanation": "Định lí Py-ta-go đảo: nếu bình phương một cạnh bằng tổng bình phương hai cạnh còn lại thì tam giác đó là tam giác vuông — dùng để nhận biết tam giác vuông.",
    "choiceFeedback": [
     "Sai — đây là công dụng của định lí Py-ta-go thuận.",
     "Đúng — định lí đảo dùng để kiểm tra một tam giác có vuông hay không.",
     "Sai — không liên quan trực tiếp đến chu vi.",
     "Sai — không liên quan trực tiếp đến diện tích."
    ]
   },
   {
    "stem": "Tam giác có ba cạnh 6 cm, 8 cm, 10 cm. Đây là tam giác gì?",
    "choices": [
     "Tam giác đều",
     "Tam giác cân",
     "Tam giác vuông",
     "Tam giác tù"
    ],
    "answer": 2,
    "explanation": "6²+8²=100=10² nên theo định lí Py-ta-go đảo, tam giác này là tam giác vuông.",
    "choiceFeedback": [
     "Sai — ba cạnh không bằng nhau.",
     "Sai — không có hai cạnh bằng nhau.",
     "Đúng — 36+64=100=10², thoả Py-ta-go đảo nên là tam giác vuông.",
     "Sai — tổng bình phương hai cạnh nhỏ bằng bình phương cạnh lớn, không phải tù."
    ]
   },
   {
    "stem": "Ba đường trung trực của một tam giác đồng quy tại tâm của đường tròn nào?",
    "choices": [
     "Đường tròn nội tiếp",
     "Không đường tròn nào",
     "Đường tròn bất kỳ",
     "Đường tròn ngoại tiếp"
    ],
    "answer": 3,
    "explanation": "Giao điểm ba đường trung trực là tâm đường tròn ngoại tiếp tam giác (đi qua ba đỉnh).",
    "choiceFeedback": [
     "Sai — tâm nội tiếp là giao điểm ba phân giác.",
     "Sai — luôn tồn tại một đường tròn duy nhất.",
     "Sai — đó là một đường tròn xác định, không phải bất kỳ.",
     "Đúng — đây là tâm đường tròn ngoại tiếp tam giác."
    ]
   },
   {
    "stem": "Đường cao của tam giác là đoạn thẳng kẻ từ một đỉnh?",
    "choices": [
     "Vuông góc với cạnh đối diện (hoặc đường thẳng chứa cạnh đó)",
     "Đến trung điểm cạnh đối diện",
     "Song song với cạnh đối diện",
     "Chia đôi góc ở đỉnh đó"
    ],
    "answer": 0,
    "explanation": "Đường cao là đoạn vuông góc kẻ từ một đỉnh đến cạnh đối diện (hoặc đường thẳng chứa cạnh đó).",
    "choiceFeedback": [
     "Đúng — đây đúng định nghĩa đường cao.",
     "Sai — đây là định nghĩa đường trung tuyến.",
     "Sai — đường cao vuông góc, không song song.",
     "Sai — đây là định nghĩa đường phân giác."
    ]
   },
   {
    "stem": "Đơn thức là biểu thức đại số gồm?",
    "choices": [
     "Tổng của các số và biến",
     "Một số, hoặc một biến, hoặc tích giữa các số và các biến",
     "Hiệu của hai biến",
     "Thương của hai biến"
    ],
    "answer": 1,
    "explanation": "Đơn thức là biểu thức chỉ gồm phép nhân giữa các số và biến (không có phép cộng, trừ, chia cho biến).",
    "choiceFeedback": [
     "Sai — có phép cộng thì trở thành đa thức nhiều hạng tử, không phải đơn thức.",
     "Đúng — đơn thức chỉ chứa tích của số và biến.",
     "Sai — phép trừ tạo thành đa thức, không phải đơn thức.",
     "Sai — chia cho biến không tạo thành đơn thức thông thường."
    ]
   },
   {
    "stem": "Trong các biểu thức: 3x; 2x+1; 5; xy — có mấy đơn thức?",
    "choices": [
     "1",
     "2",
     "3",
     "4"
    ],
    "answer": 2,
    "explanation": "3x, 5, xy là đơn thức; riêng 2x+1 có phép cộng nên là đa thức, không phải đơn thức. Vậy có 3 đơn thức.",
    "choiceFeedback": [
     "Sai — đếm thiếu, có nhiều hơn 1 đơn thức.",
     "Sai — đếm thiếu một đơn thức.",
     "Đúng — 3x, 5, xy là đơn thức; 2x+1 không phải.",
     "Sai — 2x+1 không phải là đơn thức nên không thể đếm cả 4."
    ]
   },
   {
    "stem": "Bậc của đa thức 3x² − 5x + 1 là?",
    "choices": [
     "1",
     "0",
     "3",
     "2"
    ],
    "answer": 3,
    "explanation": "Bậc của đa thức là số mũ cao nhất của biến có hệ số khác 0; ở đây là x² nên bậc là 2.",
    "choiceFeedback": [
     "Sai — đây là số mũ của hạng tử -5x, không phải bậc cao nhất.",
     "Sai — đây là số mũ của hạng tử tự do, không phải bậc của đa thức.",
     "Sai — không có hạng tử bậc 3 trong đa thức này.",
     "Đúng — hạng tử có số mũ cao nhất là x², nên bậc của đa thức là 2."
    ]
   },
   {
    "stem": "Hệ số cao nhất của đa thức 4x³ + 2x − 7 là?",
    "choices": [
     "4",
     "2",
     "-7",
     "3"
    ],
    "answer": 0,
    "explanation": "Hệ số cao nhất là hệ số của hạng tử có bậc cao nhất (x³), tức là 4.",
    "choiceFeedback": [
     "Đúng — hạng tử bậc cao nhất là 4x³, hệ số là 4.",
     "Sai — đây là hệ số của hạng tử bậc 1 (2x), không phải bậc cao nhất.",
     "Sai — đây là hệ số tự do, không phải hệ số cao nhất.",
     "Sai — đây là số mũ (bậc), không phải hệ số."
    ]
   },
   {
    "stem": "Sắp xếp đa thức 2x − 3x² + 5 + x³ theo luỹ thừa giảm dần của biến, ta được?",
    "choices": [
     "5+2x-3x²+x³",
     "x³-3x²+2x+5",
     "2x-3x²+x³+5",
     "x³+2x-3x²+5"
    ],
    "answer": 1,
    "explanation": "Sắp xếp theo số mũ giảm dần: x³ (bậc 3), -3x² (bậc 2), 2x (bậc 1), 5 (bậc 0).",
    "choiceFeedback": [
     "Sai — đây là thứ tự tăng dần, không phải giảm dần.",
     "Đúng — thứ tự đúng từ bậc cao đến thấp: x³, -3x², 2x, 5.",
     "Sai — thứ tự các hạng tử chưa sắp xếp đúng theo bậc giảm dần.",
     "Sai — hạng tử -3x² (bậc 2) phải đứng trước 2x (bậc 1)."
    ]
   },
   {
    "stem": "Đa thức 0 (đa thức không) có bậc là?",
    "choices": [
     "0",
     "1",
     "Không xác định",
     "Vô cùng"
    ],
    "answer": 2,
    "explanation": "Theo quy ước, đa thức không (bằng 0) không có bậc xác định.",
    "choiceFeedback": [
     "Sai — bậc 0 dùng cho đa thức hằng khác 0, không phải đa thức không.",
     "Sai — đa thức không không có bậc 1.",
     "Đúng — theo quy ước, đa thức 0 không có bậc xác định.",
     "Sai — đây không phải quy ước chuẩn cho đa thức không."
    ]
   },
   {
    "stem": "(2x² + 3x) + (x² − 5x) = ?",
    "choices": [
     "3x²+8x",
     "x²-2x",
     "3x²+2x",
     "3x²-2x"
    ],
    "answer": 3,
    "explanation": "Cộng các hạng tử đồng dạng: (2x²+x²)+(3x-5x)=3x²-2x.",
    "choiceFeedback": [
     "Sai — cộng nhầm dấu của hạng tử bậc 1.",
     "Sai — cộng sai hạng tử bậc 2.",
     "Sai — sai dấu hạng tử bậc 1.",
     "Đúng — 3x²+(-2x)=3x²-2x."
    ]
   },
   {
    "stem": "(5x² − 4x + 3) − (2x² + x − 1) = ?",
    "choices": [
     "3x²-5x+4",
     "3x²-3x+2",
     "7x²-5x+2",
     "3x²-5x+2"
    ],
    "answer": 0,
    "explanation": "Trừ từng hạng tử đồng dạng: (5x²-2x²)+(-4x-x)+(3+1)=3x²-5x+4.",
    "choiceFeedback": [
     "Đúng — 3x²-5x+4 là kết quả đúng khi trừ từng hạng tử đồng dạng.",
     "Sai — tính sai hạng tử bậc 1 và hằng số.",
     "Sai — cộng nhầm hạng tử bậc 2 thay vì trừ.",
     "Sai — tính sai hằng số (3-(-1) phải bằng 4, không phải 2)."
    ]
   },
   {
    "stem": "Hai đơn thức nào sau đây là hai đơn thức đồng dạng?",
    "choices": [
     "3x² và 3x",
     "5xy và -2xy",
     "2x và 2y",
     "x² và x³"
    ],
    "answer": 1,
    "explanation": "Hai đơn thức đồng dạng phải có cùng phần biến (cùng biến, cùng số mũ); 5xy và -2xy có cùng phần biến xy.",
    "choiceFeedback": [
     "Sai — số mũ của x khác nhau (x² và x).",
     "Đúng — cùng phần biến xy, chỉ khác hệ số.",
     "Sai — biến khác nhau (x và y).",
     "Sai — số mũ của x khác nhau (x² và x³)."
    ]
   },
   {
    "stem": "Cộng hai đa thức P(x) = x³ và Q(x) = −x³ + 2, ta được?",
    "choices": [
     "2x³+2",
     "0",
     "2",
     "x³+2"
    ],
    "answer": 2,
    "explanation": "P(x)+Q(x)=x³+(-x³+2)=2.",
    "choiceFeedback": [
     "Sai — x³ và -x³ triệt tiêu nhau, không phải cộng dồn.",
     "Sai — còn lại hạng tử hằng số 2, không phải 0.",
     "Đúng — x³-x³+2=2.",
     "Sai — x³ và -x³ triệt tiêu, không còn hạng tử x³."
    ]
   },
   {
    "stem": "x · x² = ?",
    "choices": [
     "x",
     "2x²",
     "x²",
     "x³"
    ],
    "answer": 3,
    "explanation": "Nhân hai luỹ thừa cùng cơ số: x^1·x²=x^(1+2)=x³.",
    "choiceFeedback": [
     "Sai — chưa cộng đúng số mũ.",
     "Sai — nhầm nhân hệ số thay vì cộng số mũ.",
     "Sai — chưa cộng số mũ của x.",
     "Đúng — x¹·x²=x³."
    ]
   },
   {
    "stem": "2x(x + 3) = ?",
    "choices": [
     "2x²+6x",
     "2x²+3x",
     "2x+6x",
     "x²+6x"
    ],
    "answer": 0,
    "explanation": "Phân phối: 2x·x+2x·3=2x²+6x.",
    "choiceFeedback": [
     "Đúng — 2x·x+2x·3=2x²+6x.",
     "Sai — nhân sai hạng tử thứ hai (2x·3 phải bằng 6x, không phải 3x).",
     "Sai — chưa nhân đúng, thiếu bình phương x ở hạng tử đầu.",
     "Sai — hệ số của x² tính sai (2x·x=2x², không phải x²)."
    ]
   },
   {
    "stem": "(x + 1)(x − 1) = ?",
    "choices": [
     "x²+1",
     "x²-1",
     "x²-2x-1",
     "x²+2x-1"
    ],
    "answer": 1,
    "explanation": "Đây là hằng đẳng thức hiệu hai bình phương: (x+1)(x-1)=x²-1.",
    "choiceFeedback": [
     "Sai — sai dấu số hạng tự do.",
     "Đúng — áp dụng hằng đẳng thức a²-b²: x²-1²=x²-1.",
     "Sai — có thêm hạng tử -2x không đúng.",
     "Sai — có thêm hạng tử 2x không đúng."
    ]
   },
   {
    "stem": "(x + 2)(x + 3) = ?",
    "choices": [
     "x²+6x+5",
     "x²+5",
     "x²+5x+6",
     "x²+6"
    ],
    "answer": 2,
    "explanation": "Nhân đa thức: x²+3x+2x+6=x²+5x+6.",
    "choiceFeedback": [
     "Sai — hoán đổi nhầm hệ số của x và số hạng tự do.",
     "Sai — thiếu hạng tử bậc 1 (5x).",
     "Đúng — x²+3x+2x+6=x²+5x+6.",
     "Sai — thiếu cả hạng tử bậc 1 và tính sai số hạng tự do."
    ]
   },
   {
    "stem": "(12x³ − 6x²) : (3x) = ?",
    "choices": [
     "4x²+2x",
     "4x-2x",
     "4x³-2x²",
     "4x²-2x"
    ],
    "answer": 3,
    "explanation": "Chia từng hạng tử cho 3x: 12x³:3x=4x²; -6x²:3x=-2x. Kết quả: 4x²-2x.",
    "choiceFeedback": [
     "Sai — sai dấu hạng tử thứ hai.",
     "Sai — chia sai số mũ của hạng tử đầu.",
     "Sai — chưa chia hết số mũ, còn dư bậc.",
     "Đúng — 12x³:3x=4x² và -6x²:3x=-2x."
    ]
   },
   {
    "stem": "Điều kiện để phép chia đa thức A cho đơn thức B cho ra kết quả không dư là?",
    "choices": [
     "Mỗi hạng tử của A đều chia hết cho B",
     "A và B có cùng bậc",
     "A và B có cùng số hạng tử",
     "B phải là số nguyên dương"
    ],
    "answer": 0,
    "explanation": "Phép chia đa thức cho đơn thức cho kết quả không dư khi mọi hạng tử của đa thức bị chia đều chia hết cho đơn thức chia.",
    "choiceFeedback": [
     "Đúng — mỗi hạng tử của A phải chia hết cho B thì phép chia mới trọn vẹn.",
     "Sai — không cần cùng bậc, chỉ cần chia hết từng hạng tử.",
     "Sai — số hạng tử không liên quan đến điều kiện chia hết.",
     "Sai — B là đơn thức bất kỳ khác 0, không nhất thiết là số nguyên dương."
    ]
   },
   {
    "stem": "x = a là nghiệm của đa thức P(x) khi?",
    "choices": [
     "P(a) khác 0",
     "P(a) = 0",
     "a = 0",
     "P(x) = a"
    ],
    "answer": 1,
    "explanation": "x=a là nghiệm của P(x) nếu giá trị của đa thức tại x=a bằng 0, tức P(a)=0.",
    "choiceFeedback": [
     "Sai — ngược lại, nghiệm là khi giá trị bằng 0.",
     "Đúng — theo định nghĩa, nghiệm là giá trị làm đa thức bằng 0.",
     "Sai — nghiệm có thể là bất kỳ số nào, không nhất thiết bằng 0.",
     "Sai — đây không phải điều kiện đúng của nghiệm."
    ]
   },
   {
    "stem": "Nghiệm của đa thức P(x) = 2x + 4 là?",
    "choices": [
     "x=2",
     "x=4",
     "x=-2",
     "x=-4"
    ],
    "answer": 2,
    "explanation": "Giải 2x+4=0 => 2x=-4 => x=-2.",
    "choiceFeedback": [
     "Sai — sai dấu nghiệm.",
     "Sai — nhầm với hệ số tự do, chưa giải phương trình.",
     "Đúng — giải 2x+4=0 được x=-2.",
     "Sai — tính sai khi chia, -4:2=-2 chứ không phải -4."
    ]
   },
   {
    "stem": "Đa thức P(x) = x² − 1 có các nghiệm là?",
    "choices": [
     "Chỉ x=1",
     "Chỉ x=-1",
     "Không có nghiệm",
     "x=1 và x=-1"
    ],
    "answer": 3,
    "explanation": "x²-1=(x-1)(x+1)=0 => x=1 hoặc x=-1.",
    "choiceFeedback": [
     "Sai — thiếu nghiệm x=-1.",
     "Sai — thiếu nghiệm x=1.",
     "Sai — đa thức này có nghiệm thực, không phải vô nghiệm.",
     "Đúng — phân tích (x-1)(x+1)=0 cho hai nghiệm x=1 và x=-1."
    ]
   },
   {
    "stem": "Cho đại lượng x, y tỉ lệ nghịch với nhau và x·y = 36. Khi x = 9, giá trị y bằng bao nhiêu, và nếu tam giác có ba cạnh 5, 12, 13 thì đó là tam giác gì?",
    "choices": [
     "y=4; tam giác vuông",
     "y=4; tam giác cân",
     "y=27; tam giác vuông",
     "y=4; tam giác đều"
    ],
    "answer": 0,
    "explanation": "y=36:9=4 (theo tính chất tỉ lệ nghịch xy=36 không đổi). Với 5²+12²=169=13², theo Py-ta-go đảo, tam giác (5,12,13) là tam giác vuông.",
    "choiceFeedback": [
     "Đúng — y=36:9=4 và 5²+12²=13² nên tam giác vuông.",
     "Sai — không có hai cạnh bằng nhau nên không phải tam giác cân.",
     "Sai — tính sai y (36-9=27 là phép trừ, không đúng công thức tỉ lệ nghịch).",
     "Sai — ba cạnh không bằng nhau nên không phải tam giác đều."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
