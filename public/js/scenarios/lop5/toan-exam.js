// P5 — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P5_EXAMS = {
 "P5-exam-gk1": {
  "id": "P5-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 5",
  "kind": "quiz",
  "yearLevel": 5,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 5",
  "questions": [
   {
    "stem": "Số liền sau của 6 999 là số nào?",
    "choices": [
     "7000",
     "6998",
     "6990",
     "7001"
    ],
    "answer": 0,
    "explanation": "Số liền sau của một số là số đó cộng thêm 1. 6 999 + 1 = 7 000.",
    "choiceFeedback": [
     "Đúng — 6 999 + 1 = 7 000.",
     "Sai — 6998 nhỏ hơn 6999, không phải số liền sau.",
     "Sai — 6990 không liền sau 6999.",
     "Sai — 7001 là số liền sau của 7000, không phải của 6999."
    ]
   },
   {
    "stem": "Số gồm 4 chục nghìn, 3 nghìn, 2 trăm và 5 đơn vị là số nào?",
    "choices": [
     "4325",
     "43205",
     "43250",
     "40325"
    ],
    "answer": 1,
    "explanation": "4 chục nghìn = 40000, 3 nghìn = 3000, 2 trăm = 200, 5 đơn vị = 5. Cộng lại: 40000+3000+200+5 = 43205.",
    "choiceFeedback": [
     "Sai — 4325 thiếu chữ số 0 ở hàng chục nghìn.",
     "Đúng — 40000+3000+200+5 = 43205.",
     "Sai — 43250 có hàng chục là 5, hàng đơn vị là 0, không đúng đề bài.",
     "Sai — 40325 đổi nhầm vị trí hàng trăm và hàng đơn vị."
    ]
   },
   {
    "stem": "Chữ số 6 trong số 46 812 có giá trị là bao nhiêu?",
    "choices": [
     "6",
     "60",
     "6000",
     "600"
    ],
    "answer": 2,
    "explanation": "Số 46812 có chữ số 6 ở hàng nghìn, nên giá trị của nó là 6000.",
    "choiceFeedback": [
     "Sai — 6 là giá trị nếu chữ số 6 ở hàng đơn vị.",
     "Sai — 60 là giá trị nếu chữ số 6 ở hàng chục.",
     "Đúng — chữ số 6 đứng ở hàng nghìn nên có giá trị 6000.",
     "Sai — 600 là giá trị nếu chữ số 6 ở hàng trăm."
    ]
   },
   {
    "stem": "Phân số 3/5 đọc là gì?",
    "choices": [
     "năm phần ba",
     "ba nhân năm",
     "ba trên không năm",
     "ba phần năm"
    ],
    "answer": 3,
    "explanation": "Phân số a/b đọc là 'a phần b'. Vậy 3/5 đọc là 'ba phần năm'.",
    "choiceFeedback": [
     "Sai — đọc ngược tử số và mẫu số.",
     "Sai — dấu gạch ngang của phân số không phải phép nhân.",
     "Sai — không có số 0 nào trong phân số này.",
     "Đúng — 3/5 đọc là 'ba phần năm'."
    ]
   },
   {
    "stem": "Rút gọn phân số 8/12, ta được phân số tối giản là?",
    "choices": [
     "2/3",
     "4/6",
     "6/9",
     "1/2"
    ],
    "answer": 0,
    "explanation": "8 và 12 cùng chia hết cho 4: 8:4=2, 12:4=3. Vậy 8/12 = 2/3, đây là phân số tối giản.",
    "choiceFeedback": [
     "Đúng — 8:4=2 và 12:4=3 nên 8/12 = 2/3.",
     "Sai — 4/6 vẫn còn rút gọn được (chia tiếp cho 2).",
     "Sai — 6/9 vẫn còn rút gọn được (chia tiếp cho 3).",
     "Sai — 1/2 không bằng 8/12 (8/12 ≈ 0,67 còn 1/2 = 0,5)."
    ]
   },
   {
    "stem": "Tính: 2,5 × 4 = ?",
    "choices": [
     "20",
     "10",
     "6,5",
     "100"
    ],
    "answer": 1,
    "explanation": "2,5 × 4 = 10.",
    "choiceFeedback": [
     "Sai — 20 là kết quả nếu nhân 2,5 × 8.",
     "Đúng — 2,5 × 4 = 10.",
     "Sai — 6,5 là kết quả của phép cộng 2,5 + 4, không phải phép nhân.",
     "Sai — 100 là kết quả nếu nhân 2,5 × 40."
    ]
   },
   {
    "stem": "Tính: 3/5 + 1/5 = ?",
    "choices": [
     "4/10",
     "3/10",
     "4/5",
     "2/5"
    ],
    "answer": 2,
    "explanation": "Hai phân số cùng mẫu số, ta cộng tử số và giữ nguyên mẫu số: 3/5 + 1/5 = 4/5.",
    "choiceFeedback": [
     "Sai — không được cộng cả mẫu số khi hai phân số đã cùng mẫu.",
     "Sai — 3/10 tính sai tử số.",
     "Đúng — 3/5 + 1/5 = 4/5.",
     "Sai — 2/5 là kết quả của phép trừ, không phải phép cộng."
    ]
   },
   {
    "stem": "Tính: 3/4 − 1/4 = ?",
    "choices": [
     "2/8",
     "1/4",
     "4/4",
     "1/2"
    ],
    "answer": 3,
    "explanation": "Hai phân số cùng mẫu, trừ tử số: 3/4 − 1/4 = 2/4 = 1/2.",
    "choiceFeedback": [
     "Sai — không được trừ luôn mẫu số.",
     "Sai — 1/4 tính sai tử số (3−1 phải bằng 2, không phải 1).",
     "Sai — 4/4 là kết quả của phép cộng, không phải phép trừ.",
     "Đúng — 3/4 − 1/4 = 2/4, rút gọn được 1/2."
    ]
   },
   {
    "stem": "Tính: 2/3 × 3/5 = ?",
    "choices": [
     "2/5",
     "5/8",
     "6/8",
     "3/2"
    ],
    "answer": 0,
    "explanation": "Nhân tử với tử, mẫu với mẫu: (2×3)/(3×5) = 6/15, rút gọn cho 3 được 2/5.",
    "choiceFeedback": [
     "Đúng — 2/3 × 3/5 = 6/15 = 2/5.",
     "Sai — không được cộng tử số và mẫu số khi nhân phân số.",
     "Sai — 6/8 tính sai mẫu số.",
     "Sai — 3/2 là phân số nghịch đảo của kết quả đúng."
    ]
   },
   {
    "stem": "Tính: 4/5 : 2/5 = ?",
    "choices": [
     "8/25",
     "2",
     "1/2",
     "6/5"
    ],
    "answer": 1,
    "explanation": "Chia phân số bằng cách nhân với phân số đảo ngược: 4/5 : 2/5 = 4/5 × 5/2 = 20/10 = 2.",
    "choiceFeedback": [
     "Sai — 8/25 là kết quả nếu nhân trực tiếp hai phân số thay vì chia.",
     "Đúng — 4/5 : 2/5 = 4/5 × 5/2 = 2.",
     "Sai — 1/2 là kết quả nếu tính ngược 2/5 : 4/5.",
     "Sai — 6/5 tính nhầm phép toán."
    ]
   },
   {
    "stem": "Hỗn số 3 và 1/4 viết thành phân số là?",
    "choices": [
     "31/4",
     "7/4",
     "13/4",
     "12/4"
    ],
    "answer": 2,
    "explanation": "Hỗn số 3 và 1/4 = (3×4+1)/4 = 13/4.",
    "choiceFeedback": [
     "Sai — 31/4 ghép nhầm số 3 và 1 thành 31.",
     "Sai — 7/4 chỉ lấy phần dư mà quên nhân phần nguyên.",
     "Đúng — (3×4+1)/4 = 13/4.",
     "Sai — 12/4 chỉ là phần nguyên đổi ra phân số, thiếu 1/4."
    ]
   },
   {
    "stem": "Phân số 9/2 đổi ra hỗn số là?",
    "choices": [
     "3 và 3/2",
     "4 và 1/4",
     "9 và 1/2",
     "4 và 1/2"
    ],
    "answer": 3,
    "explanation": "9 : 2 = 4 dư 1, nên 9/2 = 4 và 1/2.",
    "choiceFeedback": [
     "Sai — 3 và 3/2 chưa phải hỗn số hợp lệ vì phần phân số lớn hơn 1.",
     "Sai — 4 và 1/4 sai phần phân số (phải là 1/2).",
     "Sai — 9 và 1/2 sai phần nguyên.",
     "Đúng — 9 : 2 = 4 dư 1, nên 9/2 = 4 và 1/2."
    ]
   },
   {
    "stem": "Số 0,7 đọc là gì?",
    "choices": [
     "không phẩy bảy",
     "bảy phần trăm",
     "bảy phẩy không",
     "bảy phần nghìn"
    ],
    "answer": 0,
    "explanation": "Số thập phân 0,7 đọc là 'không phẩy bảy'.",
    "choiceFeedback": [
     "Đúng — 0,7 đọc là 'không phẩy bảy'.",
     "Sai — 'bảy phần trăm' là cách đọc của 0,07 hoặc 7%.",
     "Sai — đọc ngược phần nguyên và phần thập phân.",
     "Sai — 'bảy phần nghìn' là cách đọc của 0,007."
    ]
   },
   {
    "stem": "Phân số 3/10 viết dưới dạng số thập phân là?",
    "choices": [
     "3,0",
     "0,3",
     "0,03",
     "30"
    ],
    "answer": 1,
    "explanation": "3/10 = 3 chia 10 = 0,3.",
    "choiceFeedback": [
     "Sai — 3,0 bằng 3, không bằng 3/10.",
     "Đúng — 3/10 = 0,3.",
     "Sai — 0,03 là giá trị của 3/100.",
     "Sai — 30 không liên quan tới phân số 3/10."
    ]
   },
   {
    "stem": "So sánh 4,5 và 4,50.",
    "choices": [
     "4,5 lớn hơn 4,50",
     "4,50 lớn hơn 4,5",
     "4,5 bằng 4,50",
     "Không so sánh được"
    ],
    "answer": 2,
    "explanation": "Thêm chữ số 0 vào cuối phần thập phân không làm thay đổi giá trị số, nên 4,5 = 4,50.",
    "choiceFeedback": [
     "Sai — hai số này bằng nhau, không số nào lớn hơn.",
     "Sai — hai số này bằng nhau, không số nào lớn hơn.",
     "Đúng — 4,5 = 4,50 vì thêm số 0 ở cuối phần thập phân không đổi giá trị.",
     "Sai — hai số thập phân luôn so sánh được với nhau."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P5-exam-ck1": {
  "id": "P5-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 5",
  "kind": "quiz",
  "yearLevel": 5,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 5",
  "questions": [
   {
    "stem": "Tính: 25,5 : 10 = ?",
    "choices": [
     "2,55",
     "255",
     "0,255",
     "25,5"
    ],
    "answer": 0,
    "explanation": "Chia một số thập phân cho 10, ta chỉ cần dời dấu phẩy sang trái 1 chữ số: 25,5 : 10 = 2,55.",
    "choiceFeedback": [
     "Đúng — dời dấu phẩy sang trái 1 chữ số: 25,5 : 10 = 2,55.",
     "Sai — 255 là kết quả nếu nhân 25,5 × 10, không phải chia.",
     "Sai — 0,255 là kết quả nếu chia 25,5 cho 100.",
     "Sai — 25,5 giữ nguyên số ban đầu, chưa thực hiện phép chia."
    ]
   },
   {
    "stem": "Tính: 6 : 0,1 = ?",
    "choices": [
     "0,6",
     "60",
     "6",
     "600"
    ],
    "answer": 1,
    "explanation": "Chia cho 0,1 tức là nhân với 10: 6 : 0,1 = 6 × 10 = 60.",
    "choiceFeedback": [
     "Sai — 0,6 là kết quả nếu nhân 6 × 0,1.",
     "Đúng — chia cho 0,1 bằng nhân với 10: 6 × 10 = 60.",
     "Sai — 6 là số bị chia, chưa thực hiện phép tính.",
     "Sai — 600 là kết quả nếu chia 6 cho 0,01."
    ]
   },
   {
    "stem": "1 mét vuông (m²) bằng bao nhiêu đề-xi-mét vuông (dm²)?",
    "choices": [
     "10",
     "1000",
     "100",
     "10000"
    ],
    "answer": 2,
    "explanation": "Mỗi đơn vị đo diện tích liền kề hơn kém nhau 100 lần, nên 1 m² = 100 dm².",
    "choiceFeedback": [
     "Sai — 10 là tỉ lệ giữa hai đơn vị đo độ dài liền kề, không phải diện tích.",
     "Sai — 1000 không đúng tỉ lệ giữa m² và dm².",
     "Đúng — 1 m² = 100 dm² (hai đơn vị diện tích liền kề hơn kém 100 lần).",
     "Sai — 10000 là tỉ lệ giữa m² và cm²."
    ]
   },
   {
    "stem": "1 héc-ta (ha) bằng bao nhiêu mét vuông (m²)?",
    "choices": [
     "100",
     "1000",
     "1000000",
     "10000"
    ],
    "answer": 3,
    "explanation": "1 ha = 1 hm² = 10000 m².",
    "choiceFeedback": [
     "Sai — 100 m² bằng 1 a (a-re), không phải 1 ha.",
     "Sai — 1000 không đúng đơn vị quy đổi héc-ta.",
     "Sai — 1000000 m² bằng 1 km², không phải 1 ha.",
     "Đúng — 1 ha = 10000 m²."
    ]
   },
   {
    "stem": "Một hình tam giác có đáy 6 cm, chiều cao 4 cm. Diện tích tam giác đó là bao nhiêu?",
    "choices": [
     "12 cm²",
     "24 cm²",
     "10 cm²",
     "20 cm²"
    ],
    "answer": 0,
    "explanation": "S = đáy × chiều cao : 2 = 6 × 4 : 2 = 12 (cm²).",
    "choiceFeedback": [
     "Đúng — S = 6 × 4 : 2 = 12 cm².",
     "Sai — 24 cm² là kết quả nếu quên chia cho 2.",
     "Sai — 10 cm² tính sai phép nhân.",
     "Sai — 20 cm² không khớp với công thức diện tích tam giác."
    ]
   },
   {
    "stem": "Công thức tính diện tích hình tam giác là gì?",
    "choices": [
     "đáy × chiều cao",
     "đáy × chiều cao : 2",
     "(đáy + chiều cao) : 2",
     "đáy × chiều cao × 2"
    ],
    "answer": 1,
    "explanation": "Diện tích tam giác bằng độ dài đáy nhân với chiều cao rồi chia cho 2.",
    "choiceFeedback": [
     "Sai — thiếu bước chia cho 2, đây là công thức tính diện tích hình chữ nhật/bình hành.",
     "Đúng — S = đáy × chiều cao : 2.",
     "Sai — đây không phải công thức tính diện tích tam giác.",
     "Sai — nhân thêm 2 thay vì chia cho 2 là sai."
    ]
   },
   {
    "stem": "Một hình thang có đáy lớn 10 cm, đáy bé 6 cm, chiều cao 4 cm. Diện tích hình thang là bao nhiêu?",
    "choices": [
     "16 cm²",
     "64 cm²",
     "32 cm²",
     "40 cm²"
    ],
    "answer": 2,
    "explanation": "S = (đáy lớn + đáy bé) × chiều cao : 2 = (10+6) × 4 : 2 = 32 (cm²).",
    "choiceFeedback": [
     "Sai — 16 cm² là tổng hai đáy, chưa nhân với chiều cao và chia 2.",
     "Sai — 64 cm² là kết quả nếu quên chia cho 2.",
     "Đúng — (10+6) × 4 : 2 = 32 cm².",
     "Sai — 40 cm² không khớp với công thức diện tích hình thang."
    ]
   },
   {
    "stem": "Công thức tính diện tích hình thang là gì?",
    "choices": [
     "(đáy lớn + đáy bé) × chiều cao",
     "đáy lớn × đáy bé : 2",
     "(đáy lớn + đáy bé) : 2",
     "(đáy lớn + đáy bé) × chiều cao : 2"
    ],
    "answer": 3,
    "explanation": "Diện tích hình thang bằng tổng hai đáy nhân với chiều cao rồi chia cho 2.",
    "choiceFeedback": [
     "Sai — thiếu bước chia cho 2.",
     "Sai — đây không phải công thức diện tích hình thang.",
     "Sai — thiếu nhân với chiều cao.",
     "Đúng — S = (đáy lớn + đáy bé) × chiều cao : 2."
    ]
   },
   {
    "stem": "Một đường tròn có bán kính 5 cm. Chu vi đường tròn đó khoảng bao nhiêu? (lấy π ≈ 3,14)",
    "choices": [
     "31,4 cm",
     "15,7 cm",
     "62,8 cm",
     "10 cm"
    ],
    "answer": 0,
    "explanation": "C = 2 × r × π = 2 × 5 × 3,14 = 31,4 (cm).",
    "choiceFeedback": [
     "Đúng — C = 2 × 5 × 3,14 = 31,4 cm.",
     "Sai — 15,7 cm là kết quả nếu quên nhân đôi bán kính.",
     "Sai — 62,8 cm là kết quả nếu tính với bán kính 10 cm.",
     "Sai — 10 cm chỉ là đường kính, chưa nhân với π."
    ]
   },
   {
    "stem": "Đường kính của một đường tròn gấp bao nhiêu lần bán kính?",
    "choices": [
     "3 lần",
     "2 lần",
     "4 lần",
     "1/2 lần"
    ],
    "answer": 1,
    "explanation": "Đường kính bằng hai lần bán kính (d = 2 × r).",
    "choiceFeedback": [
     "Sai — đường kính không gấp 3 lần bán kính.",
     "Đúng — d = 2 × r, nên đường kính gấp 2 lần bán kính.",
     "Sai — đường kính không gấp 4 lần bán kính.",
     "Sai — ngược lại, bán kính mới bằng 1/2 đường kính."
    ]
   },
   {
    "stem": "Một đường tròn có bán kính 2 cm. Diện tích hình tròn đó khoảng bao nhiêu? (lấy π ≈ 3,14)",
    "choices": [
     "6,28 cm²",
     "3,14 cm²",
     "12,56 cm²",
     "25,12 cm²"
    ],
    "answer": 2,
    "explanation": "S = r × r × π = 2 × 2 × 3,14 = 12,56 (cm²).",
    "choiceFeedback": [
     "Sai — 6,28 cm² là kết quả nếu chỉ nhân r một lần với π.",
     "Sai — 3,14 cm² là diện tích của hình tròn bán kính 1 cm.",
     "Đúng — S = 2 × 2 × 3,14 = 12,56 cm².",
     "Sai — 25,12 cm² là kết quả nếu tính với bán kính 4 cm."
    ]
   },
   {
    "stem": "Tỉ số phần trăm của 25 và 100 là bao nhiêu?",
    "choices": [
     "4%",
     "40%",
     "2,5%",
     "25%"
    ],
    "answer": 3,
    "explanation": "25 : 100 = 0,25 = 25%.",
    "choiceFeedback": [
     "Sai — 4% là kết quả nếu tính ngược 100:25 rồi hiểu sai đơn vị.",
     "Sai — 40% không đúng với phép chia 25:100.",
     "Sai — 2,5% thiếu một chữ số 0.",
     "Đúng — 25 : 100 = 25%."
    ]
   },
   {
    "stem": "20% của 50 là bao nhiêu?",
    "choices": [
     "10",
     "20",
     "5",
     "15"
    ],
    "answer": 0,
    "explanation": "20% của 50 = 50 × 20 : 100 = 10.",
    "choiceFeedback": [
     "Đúng — 50 × 20 : 100 = 10.",
     "Sai — 20 là nhầm với tỉ lệ phần trăm đã cho.",
     "Sai — 5 là kết quả nếu tính 10% của 50.",
     "Sai — 15 không khớp phép tính 50 × 20 : 100."
    ]
   },
   {
    "stem": "Một ô tô đi quãng đường 120 km hết 3 giờ. Vận tốc của ô tô là bao nhiêu?",
    "choices": [
     "400 km/giờ",
     "40 km/giờ",
     "360 km/giờ",
     "4 km/giờ"
    ],
    "answer": 1,
    "explanation": "Vận tốc = quãng đường : thời gian = 120 : 3 = 40 (km/giờ).",
    "choiceFeedback": [
     "Sai — 400 km/giờ là kết quả nếu nhân thay vì chia.",
     "Đúng — 120 : 3 = 40 km/giờ.",
     "Sai — 360 km/giờ là kết quả của phép nhân 120 × 3.",
     "Sai — 4 km/giờ thiếu một chữ số 0."
    ]
   },
   {
    "stem": "Một xe máy đi với vận tốc 50 km/giờ trong 2 giờ. Quãng đường xe đi được là bao nhiêu?",
    "choices": [
     "25 km",
     "52 km",
     "100 km",
     "48 km"
    ],
    "answer": 2,
    "explanation": "Quãng đường = vận tốc × thời gian = 50 × 2 = 100 (km).",
    "choiceFeedback": [
     "Sai — 25 km là kết quả nếu chia thay vì nhân.",
     "Sai — 52 km là kết quả của phép cộng, không phải nhân.",
     "Đúng — 50 × 2 = 100 km.",
     "Sai — 48 km là kết quả của phép trừ, không đúng công thức."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P5-exam-gk2": {
  "id": "P5-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 5",
  "kind": "quiz",
  "yearLevel": 5,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 5",
  "questions": [
   {
    "stem": "Hình hộp chữ nhật có mấy mặt?",
    "choices": [
     "6",
     "8",
     "4",
     "12"
    ],
    "answer": 0,
    "explanation": "Hình hộp chữ nhật có 6 mặt: 2 mặt đáy và 4 mặt bên.",
    "choiceFeedback": [
     "Đúng — hình hộp chữ nhật có 6 mặt.",
     "Sai — 8 là số đỉnh, không phải số mặt.",
     "Sai — 4 chỉ là số mặt bên, chưa tính 2 mặt đáy.",
     "Sai — 12 là số cạnh của hình hộp chữ nhật."
    ]
   },
   {
    "stem": "Một hình hộp chữ nhật có chiều dài 5 cm, chiều rộng 4 cm, chiều cao 3 cm. Diện tích xung quanh của hình hộp là bao nhiêu?",
    "choices": [
     "27 cm²",
     "54 cm²",
     "108 cm²",
     "60 cm²"
    ],
    "answer": 1,
    "explanation": "Sxq = (dài + rộng) × 2 × cao = (5+4) × 2 × 3 = 54 (cm²).",
    "choiceFeedback": [
     "Sai — 27 cm² là nửa chu vi đáy nhân chiều cao, thiếu nhân đôi.",
     "Đúng — (5+4) × 2 × 3 = 54 cm².",
     "Sai — 108 cm² là kết quả nếu nhân đôi thêm một lần nữa.",
     "Sai — 60 cm² không khớp công thức diện tích xung quanh."
    ]
   },
   {
    "stem": "Với hình hộp chữ nhật ở câu trên (dài 5 cm, rộng 4 cm, cao 3 cm, Sxq = 54 cm²), diện tích toàn phần là bao nhiêu?",
    "choices": [
     "60 cm²",
     "74 cm²",
     "94 cm²",
     "114 cm²"
    ],
    "answer": 2,
    "explanation": "Stp = Sxq + 2 × (dài × rộng) = 54 + 2 × (5×4) = 54 + 40 = 94 (cm²).",
    "choiceFeedback": [
     "Sai — 60 cm² thiếu diện tích xung quanh.",
     "Sai — 74 cm² tính thiếu diện tích 2 đáy.",
     "Đúng — 54 + 2×20 = 94 cm².",
     "Sai — 114 cm² là kết quả nếu cộng nhầm số liệu."
    ]
   },
   {
    "stem": "1 mét khối (m³) bằng bao nhiêu đề-xi-mét khối (dm³)?",
    "choices": [
     "10",
     "100",
     "10000",
     "1000"
    ],
    "answer": 3,
    "explanation": "Mỗi đơn vị đo thể tích liền kề hơn kém nhau 1000 lần, nên 1 m³ = 1000 dm³.",
    "choiceFeedback": [
     "Sai — 10 là tỉ lệ giữa hai đơn vị đo độ dài liền kề.",
     "Sai — 100 là tỉ lệ giữa hai đơn vị đo diện tích liền kề.",
     "Sai — 10000 không đúng tỉ lệ giữa m³ và dm³.",
     "Đúng — 1 m³ = 1000 dm³."
    ]
   },
   {
    "stem": "Công thức tính thể tích hình hộp chữ nhật là gì?",
    "choices": [
     "dài × rộng × cao",
     "dài + rộng + cao",
     "(dài + rộng) × cao",
     "dài × rộng : cao"
    ],
    "answer": 0,
    "explanation": "Thể tích hình hộp chữ nhật bằng chiều dài nhân chiều rộng nhân chiều cao.",
    "choiceFeedback": [
     "Đúng — V = dài × rộng × cao.",
     "Sai — đây là phép cộng, không tính được thể tích.",
     "Sai — thiếu nhân với chiều rộng riêng biệt.",
     "Sai — thể tích phải nhân với chiều cao, không phải chia."
    ]
   },
   {
    "stem": "Một hình hộp chữ nhật có kích thước 5 cm × 4 cm × 3 cm. Thể tích của hình hộp là bao nhiêu?",
    "choices": [
     "12 cm³",
     "60 cm³",
     "94 cm³",
     "20 cm³"
    ],
    "answer": 1,
    "explanation": "V = 5 × 4 × 3 = 60 (cm³).",
    "choiceFeedback": [
     "Sai — 12 cm³ chỉ là tích của 2 kích thước (4×3), thiếu nhân với 5.",
     "Đúng — 5 × 4 × 3 = 60 cm³.",
     "Sai — 94 cm² là diện tích toàn phần ở câu trước, không phải thể tích.",
     "Sai — 20 cm³ chỉ là tích của 5×4, thiếu nhân với 3."
    ]
   },
   {
    "stem": "Công thức tính thể tích hình lập phương cạnh a là gì?",
    "choices": [
     "a × 3",
     "a × a",
     "a × a × a",
     "3 × a"
    ],
    "answer": 2,
    "explanation": "Thể tích hình lập phương bằng cạnh nhân cạnh nhân cạnh: V = a × a × a.",
    "choiceFeedback": [
     "Sai — đây là phép nhân với 3, không phải lập phương cạnh.",
     "Sai — a × a chỉ là diện tích một mặt, chưa nhân thêm lần a để ra thể tích.",
     "Đúng — V = a × a × a.",
     "Sai — 3 × a chỉ là phép nhân đơn giản, không đúng công thức thể tích."
    ]
   },
   {
    "stem": "Một hình lập phương có cạnh 3 cm. Thể tích hình đó là bao nhiêu?",
    "choices": [
     "9 cm³",
     "6 cm³",
     "18 cm³",
     "27 cm³"
    ],
    "answer": 3,
    "explanation": "V = 3 × 3 × 3 = 27 (cm³).",
    "choiceFeedback": [
     "Sai — 9 cm² chỉ là diện tích một mặt (3×3), chưa nhân thêm lần 3.",
     "Sai — 6 cm³ không đúng, đây là 3+3 nhân đôi.",
     "Sai — 18 cm³ là kết quả của 3×3×2, không đúng.",
     "Đúng — 3 × 3 × 3 = 27 cm³."
    ]
   },
   {
    "stem": "Một hình lập phương có cạnh 5 cm. Diện tích toàn phần của hình đó là bao nhiêu?",
    "choices": [
     "150 cm²",
     "125 cm²",
     "100 cm²",
     "30 cm²"
    ],
    "answer": 0,
    "explanation": "Stp = 6 × (cạnh × cạnh) = 6 × (5×5) = 150 (cm²).",
    "choiceFeedback": [
     "Đúng — 6 × 5 × 5 = 150 cm².",
     "Sai — 125 cm³ là thể tích (5×5×5), không phải diện tích toàn phần.",
     "Sai — 100 cm² thiếu một mặt trong 6 mặt.",
     "Sai — 30 cm² chỉ là chu vi liên quan, không phải diện tích toàn phần."
    ]
   },
   {
    "stem": "1 giờ bằng bao nhiêu phút?",
    "choices": [
     "100",
     "60",
     "24",
     "30"
    ],
    "answer": 1,
    "explanation": "1 giờ = 60 phút.",
    "choiceFeedback": [
     "Sai — 100 không đúng đơn vị đo thời gian.",
     "Đúng — 1 giờ = 60 phút.",
     "Sai — 24 là số giờ trong 1 ngày, không phải số phút trong 1 giờ.",
     "Sai — 30 chỉ bằng nửa giờ."
    ]
   },
   {
    "stem": "4 người làm xong một công việc trong 6 ngày. Nếu có 8 người cùng làm (năng suất như nhau) thì xong công việc trong bao nhiêu ngày?",
    "choices": [
     "12 ngày",
     "6 ngày",
     "3 ngày",
     "2 ngày"
    ],
    "answer": 2,
    "explanation": "Số người và số ngày là hai đại lượng tỉ lệ nghịch: 4 người × 6 ngày = 24 (phần việc); 8 người thì cần 24 : 8 = 3 ngày.",
    "choiceFeedback": [
     "Sai — 12 ngày là kết quả nếu tính nhầm thành tỉ lệ thuận.",
     "Sai — 6 ngày là số ngày ban đầu, chưa tính lại với 8 người.",
     "Đúng — 4×6 : 8 = 3 ngày (số người tăng thì số ngày giảm).",
     "Sai — 2 ngày không khớp phép tính 24 : 8."
    ]
   },
   {
    "stem": "Tính: 2 giờ 15 phút + 1 giờ 30 phút = ?",
    "choices": [
     "3 giờ 30 phút",
     "4 giờ",
     "3 giờ 15 phút",
     "3 giờ 45 phút"
    ],
    "answer": 3,
    "explanation": "Cộng giờ với giờ, phút với phút: 2 giờ + 1 giờ = 3 giờ; 15 phút + 30 phút = 45 phút. Kết quả: 3 giờ 45 phút.",
    "choiceFeedback": [
     "Sai — 3 giờ 30 phút cộng thiếu phút.",
     "Sai — 4 giờ làm tròn sai.",
     "Sai — 3 giờ 15 phút quên cộng thêm phút của số thứ hai.",
     "Đúng — 3 giờ + 45 phút = 3 giờ 45 phút."
    ]
   },
   {
    "stem": "Ô tô A khởi hành từ một đầu, ô tô B khởi hành từ đầu kia của quãng đường dài 200 km, đi ngược chiều nhau cùng lúc, vận tốc A là 40 km/giờ, vận tốc B là 60 km/giờ. Hỏi sau bao lâu hai xe gặp nhau?",
    "choices": [
     "2 giờ",
     "4 giờ",
     "5 giờ",
     "1 giờ"
    ],
    "answer": 0,
    "explanation": "Khi đi ngược chiều, thời gian gặp nhau = quãng đường : (vận tốc A + vận tốc B) = 200 : (40+60) = 2 (giờ).",
    "choiceFeedback": [
     "Đúng — 200 : (40+60) = 2 giờ.",
     "Sai — 4 giờ là kết quả nếu chỉ chia cho vận tốc A.",
     "Sai — 5 giờ là kết quả nếu chỉ chia cho vận tốc B.",
     "Sai — 1 giờ không khớp với phép chia 200 : 100."
    ]
   },
   {
    "stem": "Người A đi xe đạp với vận tốc 50 km/giờ, người B đi cùng chiều với vận tốc 30 km/giờ, xuất phát cùng lúc, cách nhau 40 km (A ở phía sau). Hỏi sau bao lâu A đuổi kịp B?",
    "choices": [
     "4 giờ",
     "2 giờ",
     "1 giờ",
     "8 giờ"
    ],
    "answer": 1,
    "explanation": "Khi đi cùng chiều, thời gian đuổi kịp = khoảng cách : (vận tốc nhanh − vận tốc chậm) = 40 : (50−30) = 2 (giờ).",
    "choiceFeedback": [
     "Sai — 4 giờ là kết quả nếu chia cho hiệu vận tốc sai.",
     "Đúng — 40 : (50−30) = 2 giờ.",
     "Sai — 1 giờ không khớp phép chia 40 : 20.",
     "Sai — 8 giờ không khớp phép tính đúng."
    ]
   },
   {
    "stem": "5 kg gạo có giá 75 000 đồng. Hỏi 10 kg gạo cùng loại có giá bao nhiêu?",
    "choices": [
     "100 000 đồng",
     "125 000 đồng",
     "150 000 đồng",
     "200 000 đồng"
    ],
    "answer": 2,
    "explanation": "10 kg gấp đôi 5 kg, giá tiền cũng tỉ lệ thuận nên gấp đôi: 75000 × 2 = 150 000 (đồng).",
    "choiceFeedback": [
     "Sai — 100 000 đồng không đúng tỉ lệ thuận.",
     "Sai — 125 000 đồng không khớp phép nhân đôi.",
     "Đúng — 75 000 × 2 = 150 000 đồng.",
     "Sai — 200 000 đồng vượt quá tỉ lệ thuận đúng."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P5-exam-ck2": {
  "id": "P5-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 5",
  "kind": "quiz",
  "yearLevel": 5,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 5",
  "questions": [
   {
    "stem": "Một hình hộp chữ nhật có chiều dài 6 cm, chiều rộng 4 cm, chiều cao 3 cm. Diện tích toàn phần của hình hộp là bao nhiêu?",
    "choices": [
     "108 cm²",
     "60 cm²",
     "84 cm²",
     "132 cm²"
    ],
    "answer": 0,
    "explanation": "Sxq = (6+4)×2×3 = 60 cm²; diện tích 2 đáy = 2×(6×4) = 48 cm². Stp = 60+48 = 108 (cm²).",
    "choiceFeedback": [
     "Đúng — 60 + 48 = 108 cm².",
     "Sai — 60 cm² mới chỉ là diện tích xung quanh, chưa cộng 2 mặt đáy.",
     "Sai — 84 cm² tính thiếu diện tích 2 đáy.",
     "Sai — 132 cm² tính thừa so với công thức đúng."
    ]
   },
   {
    "stem": "1 mét khối (m³) bằng bao nhiêu xăng-ti-mét khối (cm³)?",
    "choices": [
     "100000",
     "1000000",
     "10000",
     "1000"
    ],
    "answer": 1,
    "explanation": "1 m³ = 1000 dm³ = 1000 × 1000 cm³ = 1 000 000 cm³.",
    "choiceFeedback": [
     "Sai — 100000 thiếu một lần nhân 10.",
     "Đúng — 1 m³ = 1 000 000 cm³.",
     "Sai — 10000 quá nhỏ so với thực tế.",
     "Sai — 1000 chỉ đúng cho 1 m³ = 1000 dm³, chưa đổi tiếp sang cm³."
    ]
   },
   {
    "stem": "Một hình lập phương có cạnh 4 cm. Thể tích của hình đó là bao nhiêu?",
    "choices": [
     "16 cm³",
     "48 cm³",
     "64 cm³",
     "256 cm³"
    ],
    "answer": 2,
    "explanation": "V = 4 × 4 × 4 = 64 (cm³).",
    "choiceFeedback": [
     "Sai — 16 cm² là diện tích một mặt, chưa nhân thêm lần cạnh nữa.",
     "Sai — 48 cm³ không khớp phép tính 4×4×4.",
     "Đúng — 4 × 4 × 4 = 64 cm³.",
     "Sai — 256 cm³ là kết quả nếu tính 4×4×4×4."
    ]
   },
   {
    "stem": "2 giờ 30 phút bằng bao nhiêu phút?",
    "choices": [
     "120",
     "100",
     "130",
     "150"
    ],
    "answer": 3,
    "explanation": "2 giờ = 120 phút; cộng thêm 30 phút = 150 phút.",
    "choiceFeedback": [
     "Sai — 120 phút mới chỉ là 2 giờ, chưa cộng thêm 30 phút.",
     "Sai — 100 không đúng đơn vị quy đổi.",
     "Sai — 130 phút tính thiếu 20 phút.",
     "Đúng — 2 giờ 30 phút = 120 + 30 = 150 phút."
    ]
   },
   {
    "stem": "Tính: 5 giờ 20 phút − 2 giờ 10 phút = ?",
    "choices": [
     "3 giờ 10 phút",
     "3 giờ 30 phút",
     "2 giờ 10 phút",
     "3 giờ"
    ],
    "answer": 0,
    "explanation": "Trừ giờ với giờ, phút với phút: 5 giờ − 2 giờ = 3 giờ; 20 phút − 10 phút = 10 phút. Kết quả: 3 giờ 10 phút.",
    "choiceFeedback": [
     "Đúng — 3 giờ và 10 phút.",
     "Sai — 3 giờ 30 phút tính sai phần phút.",
     "Sai — 2 giờ 10 phút là số bị trừ đi, không phải kết quả.",
     "Sai — 3 giờ thiếu phần phút còn lại."
    ]
   },
   {
    "stem": "Hai ô tô khởi hành cùng lúc từ hai đầu quãng đường dài 270 km, đi ngược chiều nhau, vận tốc lần lượt là 60 km/giờ và 75 km/giờ. Hỏi sau bao lâu hai xe gặp nhau?",
    "choices": [
     "1 giờ",
     "2 giờ",
     "3 giờ",
     "4 giờ"
    ],
    "answer": 1,
    "explanation": "Thời gian gặp nhau = quãng đường : tổng vận tốc = 270 : (60+75) = 270 : 135 = 2 (giờ).",
    "choiceFeedback": [
     "Sai — 1 giờ không khớp phép chia 270:135.",
     "Đúng — 270 : 135 = 2 giờ.",
     "Sai — 3 giờ là kết quả nếu tính nhầm tổng vận tốc.",
     "Sai — 4 giờ không khớp phép tính đúng."
    ]
   },
   {
    "stem": "Một người đi xe đạp với vận tốc 12 km/giờ, một người đi bộ cùng chiều với vận tốc 4 km/giờ, xuất phát cùng lúc, cách nhau 16 km (xe đạp ở phía sau). Hỏi sau bao lâu xe đạp đuổi kịp người đi bộ?",
    "choices": [
     "4 giờ",
     "1 giờ",
     "2 giờ",
     "8 giờ"
    ],
    "answer": 2,
    "explanation": "Thời gian đuổi kịp = khoảng cách : hiệu vận tốc = 16 : (12−4) = 2 (giờ).",
    "choiceFeedback": [
     "Sai — 4 giờ không khớp phép chia 16:8.",
     "Sai — 1 giờ không khớp phép tính đúng.",
     "Đúng — 16 : (12−4) = 2 giờ.",
     "Sai — 8 giờ là hiệu vận tốc, không phải thời gian."
    ]
   },
   {
    "stem": "3 mét vải may được 2 chiếc áo. Hỏi 9 mét vải cùng loại may được bao nhiêu chiếc áo?",
    "choices": [
     "3 áo",
     "4 áo",
     "5 áo",
     "6 áo"
    ],
    "answer": 3,
    "explanation": "9 m gấp 3 lần 3 m, số áo may được cũng tỉ lệ thuận nên gấp 3 lần: 2 × 3 = 6 (áo).",
    "choiceFeedback": [
     "Sai — 3 áo không đúng tỉ lệ thuận.",
     "Sai — 4 áo không khớp phép nhân 2×3.",
     "Sai — 5 áo không khớp tỉ lệ thuận.",
     "Đúng — 9m gấp 3 lần 3m nên 2×3 = 6 áo."
    ]
   },
   {
    "stem": "12 công nhân làm xong một công việc trong 8 ngày. Muốn làm xong công việc đó trong 6 ngày thì cần bao nhiêu công nhân (năng suất như nhau)?",
    "choices": [
     "16 người",
     "10 người",
     "9 người",
     "14 người"
    ],
    "answer": 0,
    "explanation": "Số công nhân và số ngày là hai đại lượng tỉ lệ nghịch: 12 × 8 = 96 (phần việc); cần 96 : 6 = 16 (người).",
    "choiceFeedback": [
     "Đúng — 12×8 : 6 = 16 người.",
     "Sai — 10 người không khớp phép tính 96:6.",
     "Sai — 9 người không khớp phép tính đúng.",
     "Sai — 14 người không khớp phép tính đúng."
    ]
   },
   {
    "stem": "Trong biểu đồ hình quạt, tổng các phần trăm của tất cả các phần bằng bao nhiêu?",
    "choices": [
     "90%",
     "100%",
     "360%",
     "50%"
    ],
    "answer": 1,
    "explanation": "Biểu đồ hình quạt biểu diễn toàn bộ số liệu, nên tổng các phần luôn bằng 100%.",
    "choiceFeedback": [
     "Sai — 90% chưa đủ để biểu diễn toàn bộ số liệu.",
     "Đúng — tổng các phần của biểu đồ hình quạt luôn bằng 100%.",
     "Sai — 360% là nhầm với số đo góc của cả hình tròn (360°), không phải tỉ lệ phần trăm.",
     "Sai — 50% chỉ là một nửa, không phải toàn bộ."
    ]
   },
   {
    "stem": "Biết 40% của một số là 24. Số đó là bao nhiêu?",
    "choices": [
     "16",
     "96",
     "60",
     "10"
    ],
    "answer": 2,
    "explanation": "Số đó = 24 : 40 × 100 = 60.",
    "choiceFeedback": [
     "Sai — 16 không khớp phép tính 24:40×100.",
     "Sai — 96 là kết quả nếu nhân nhầm 24×4.",
     "Đúng — 24 : 40 × 100 = 60.",
     "Sai — 10 không khớp phép tính đúng."
    ]
   },
   {
    "stem": "Một hình tròn có bán kính 3 cm. Chu vi hình tròn đó khoảng bao nhiêu? (lấy π ≈ 3,14)",
    "choices": [
     "9,42 cm",
     "6,28 cm",
     "12,56 cm",
     "18,84 cm"
    ],
    "answer": 3,
    "explanation": "C = 2 × r × π = 2 × 3 × 3,14 = 18,84 (cm).",
    "choiceFeedback": [
     "Sai — 9,42 cm là kết quả nếu chỉ nhân r một lần với π.",
     "Sai — 6,28 cm là chu vi của hình tròn bán kính 1 cm.",
     "Sai — 12,56 cm là diện tích của hình tròn bán kính 2 cm, không phải chu vi ở đây.",
     "Đúng — 2 × 3 × 3,14 = 18,84 cm."
    ]
   },
   {
    "stem": "2,5 km bằng bao nhiêu mét?",
    "choices": [
     "2500",
     "250",
     "25000",
     "2,5"
    ],
    "answer": 0,
    "explanation": "1 km = 1000 m, nên 2,5 km = 2,5 × 1000 = 2500 (m).",
    "choiceFeedback": [
     "Đúng — 2,5 × 1000 = 2500 m.",
     "Sai — 250 m thiếu một chữ số 0.",
     "Sai — 25000 m thừa một chữ số 0.",
     "Sai — 2,5 vẫn là đơn vị ki-lô-mét, chưa đổi ra mét."
    ]
   },
   {
    "stem": "Tính: 0,8 × 0,5 = ?",
    "choices": [
     "4",
     "0,4",
     "0,04",
     "40"
    ],
    "answer": 1,
    "explanation": "0,8 × 0,5 = 0,4 (8 × 5 = 40, có 2 chữ số ở phần thập phân của hai thừa số nên đặt dấu phẩy: 0,40 = 0,4).",
    "choiceFeedback": [
     "Sai — 4 quên đặt dấu phẩy phần thập phân.",
     "Đúng — 0,8 × 0,5 = 0,4.",
     "Sai — 0,04 đặt dấu phẩy sai vị trí (thừa một chữ số 0).",
     "Sai — 40 sai hoàn toàn vị trí dấu phẩy."
    ]
   },
   {
    "stem": "Một bể nước hình hộp chữ nhật có kích thước 2 m × 1,5 m × 1 m. Bể đó chứa được bao nhiêu lít nước? (1 dm³ = 1 lít)",
    "choices": [
     "300 lít",
     "30 lít",
     "3000 lít",
     "300000 lít"
    ],
    "answer": 2,
    "explanation": "V = 2 × 1,5 × 1 = 3 (m³) = 3000 dm³ = 3000 lít (1 m³ = 1000 dm³ = 1000 lít).",
    "choiceFeedback": [
     "Sai — 300 lít thiếu một chữ số 0.",
     "Sai — 30 lít quá nhỏ so với thể tích bể.",
     "Đúng — V = 3 m³ = 3000 lít.",
     "Sai — 300000 lít thừa quá nhiều so với thể tích thực."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
