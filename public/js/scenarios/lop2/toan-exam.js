// P2 — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P2_EXAMS = {
 "P2-exam-gk1": {
  "id": "P2-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Toán 2",
  "kind": "quiz",
  "yearLevel": 2,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Toán 2",
  "questions": [
   {
    "stem": "Số liền sau của 89 là?",
    "choices": [
     "90",
     "88",
     "91",
     "80"
    ],
    "answer": 0,
    "explanation": "Số liền sau là số lớn hơn 1 đơn vị: 89 + 1 = 90.",
    "choiceFeedback": [
     "Đúng — 89 + 1 = 90.",
     "Sai — 88 nhỏ hơn 89, không phải số liền sau.",
     "Sai — 91 là số liền sau của 90, không phải của 89.",
     "Sai — 80 nhỏ hơn 89 rất nhiều."
    ]
   },
   {
    "stem": "Số bé nhất có 2 chữ số là?",
    "choices": [
     "1",
     "10",
     "11",
     "99"
    ],
    "answer": 1,
    "explanation": "Các số có 2 chữ số bắt đầu từ 10 đến 99, nên số bé nhất là 10.",
    "choiceFeedback": [
     "Sai — 1 chỉ có 1 chữ số.",
     "Đúng — 10 là số bé nhất có 2 chữ số.",
     "Sai — 11 lớn hơn 10.",
     "Sai — 99 là số lớn nhất có 2 chữ số."
    ]
   },
   {
    "stem": "Trong phép tính 15 − 7 = 8, số 7 gọi là gì?",
    "choices": [
     "Số bị trừ",
     "Hiệu",
     "Số trừ",
     "Tổng"
    ],
    "answer": 2,
    "explanation": "Trong phép trừ, số đứng sau dấu trừ (7) gọi là số trừ.",
    "choiceFeedback": [
     "Sai — số bị trừ là 15.",
     "Sai — hiệu là kết quả, tức 8.",
     "Đúng — 7 là số trừ.",
     "Sai — tổng dùng cho phép cộng, không dùng ở đây."
    ]
   },
   {
    "stem": "Tìm hiệu của 27 và 5.",
    "choices": [
     "20",
     "21",
     "32",
     "22"
    ],
    "answer": 3,
    "explanation": "Hiệu là kết quả phép trừ: 27 − 5 = 22.",
    "choiceFeedback": [
     "Sai — 27 − 5 không bằng 20.",
     "Sai — 27 − 5 không bằng 21.",
     "Sai — 32 là kết quả của phép cộng 27 + 5.",
     "Đúng — 27 − 5 = 22."
    ]
   },
   {
    "stem": "Trong phép tính 7 + 8 = 15, số 15 gọi là gì?",
    "choices": [
     "Tổng",
     "Số hạng",
     "Hiệu",
     "Số bị trừ"
    ],
    "answer": 0,
    "explanation": "Kết quả của phép cộng gọi là tổng.",
    "choiceFeedback": [
     "Đúng — 15 là tổng của 7 và 8.",
     "Sai — số hạng là 7 và 8.",
     "Sai — hiệu dùng cho phép trừ.",
     "Sai — số bị trừ dùng cho phép trừ."
    ]
   },
   {
    "stem": "5 + 0 = ?",
    "choices": [
     "0",
     "5",
     "10",
     "15"
    ],
    "answer": 1,
    "explanation": "Một số cộng với 0 thì bằng chính số đó: 5 + 0 = 5.",
    "choiceFeedback": [
     "Sai — 5 + 0 không bằng 0.",
     "Đúng — 5 + 0 = 5.",
     "Sai — 5 + 0 không bằng 10.",
     "Sai — 5 + 0 không bằng 15."
    ]
   },
   {
    "stem": "20 cm bằng bao nhiêu dm?",
    "choices": [
     "20 dm",
     "200 dm",
     "2 dm",
     "12 dm"
    ],
    "answer": 2,
    "explanation": "1 dm = 10 cm nên 20 cm = 20 : 10 = 2 dm.",
    "choiceFeedback": [
     "Sai — 20 cm không bằng 20 dm.",
     "Sai — 200 dm quá lớn.",
     "Đúng — 20 cm = 2 dm.",
     "Sai — 20 cm không bằng 12 dm."
    ]
   },
   {
    "stem": "7 dm − 3 dm = ?",
    "choices": [
     "3 dm",
     "5 dm",
     "10 dm",
     "4 dm"
    ],
    "answer": 3,
    "explanation": "Trừ các số đo cùng đơn vị: 7 − 3 = 4, vậy 7 dm − 3 dm = 4 dm.",
    "choiceFeedback": [
     "Sai — 7 − 3 không bằng 3.",
     "Sai — 7 − 3 không bằng 5.",
     "Sai — 7 − 3 không bằng 10.",
     "Đúng — 7 dm − 3 dm = 4 dm."
    ]
   },
   {
    "stem": "9 + 9 = ?",
    "choices": [
     "18",
     "17",
     "19",
     "16"
    ],
    "answer": 0,
    "explanation": "9 + 9 = 18.",
    "choiceFeedback": [
     "Đúng — 9 + 9 = 18.",
     "Sai — 9 + 9 không bằng 17.",
     "Sai — 9 + 9 không bằng 19.",
     "Sai — 9 + 9 không bằng 16."
    ]
   },
   {
    "stem": "Có 8 cái bút màu xanh và 7 cái bút màu đỏ. Hỏi có tất cả bao nhiêu cái bút?",
    "choices": [
     "14 cái",
     "15 cái",
     "16 cái",
     "13 cái"
    ],
    "answer": 1,
    "explanation": "Số bút tất cả = 8 + 7 = 15 cái.",
    "choiceFeedback": [
     "Sai — 8 + 7 không bằng 14.",
     "Đúng — 8 + 7 = 15 cái bút.",
     "Sai — 8 + 7 không bằng 16.",
     "Sai — 8 + 7 không bằng 13."
    ]
   },
   {
    "stem": "48 + 7 = ?",
    "choices": [
     "54",
     "53",
     "55",
     "45"
    ],
    "answer": 2,
    "explanation": "48 + 7 = 55 (8 + 7 = 15, viết 5 nhớ 1; 4 + 1 = 5).",
    "choiceFeedback": [
     "Sai — 48 + 7 không bằng 54.",
     "Sai — 48 + 7 không bằng 53.",
     "Đúng — 48 + 7 = 55.",
     "Sai — 48 + 7 không bằng 45."
    ]
   },
   {
    "stem": "58 + 17 = ?",
    "choices": [
     "74",
     "76",
     "65",
     "75"
    ],
    "answer": 3,
    "explanation": "58 + 17 = 75 (8 + 7 = 15, viết 5 nhớ 1; 5 + 1 + 1 = 7).",
    "choiceFeedback": [
     "Sai — 58 + 17 không bằng 74.",
     "Sai — 58 + 17 không bằng 76.",
     "Sai — 58 + 17 không bằng 65.",
     "Đúng — 58 + 17 = 75."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P2-exam-ck1": {
  "id": "P2-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Toán 2",
  "kind": "quiz",
  "yearLevel": 2,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Toán 2",
  "questions": [
   {
    "stem": "Số liền sau của 99 là?",
    "choices": [
     "100",
     "98",
     "101",
     "90"
    ],
    "answer": 0,
    "explanation": "Số liền sau là số lớn hơn 1 đơn vị: 99 + 1 = 100.",
    "choiceFeedback": [
     "Đúng — 99 + 1 = 100.",
     "Sai — 98 nhỏ hơn 99.",
     "Sai — 101 là số liền sau của 100.",
     "Sai — 90 nhỏ hơn 99 nhiều."
    ]
   },
   {
    "stem": "1 mét (m) bằng bao nhiêu xăng-ti-mét (cm)?",
    "choices": [
     "10 cm",
     "100 cm",
     "1000 cm",
     "50 cm"
    ],
    "answer": 1,
    "explanation": "1 m = 100 cm.",
    "choiceFeedback": [
     "Sai — 10 cm bằng 1 dm, không phải 1 m.",
     "Đúng — 1 m = 100 cm.",
     "Sai — 1000 cm quá lớn so với 1 m.",
     "Sai — 50 cm chỉ bằng nửa mét."
    ]
   },
   {
    "stem": "1 ki-lô-gam (kg) bằng bao nhiêu gam (g)?",
    "choices": [
     "10 g",
     "100 g",
     "1000 g",
     "10000 g"
    ],
    "answer": 2,
    "explanation": "1 kg = 1000 g.",
    "choiceFeedback": [
     "Sai — 10 g quá nhỏ.",
     "Sai — 100 g quá nhỏ.",
     "Đúng — 1 kg = 1000 g.",
     "Sai — 10000 g quá lớn."
    ]
   },
   {
    "stem": "Hình chữ nhật có mấy cạnh?",
    "choices": [
     "2 cạnh",
     "3 cạnh",
     "5 cạnh",
     "4 cạnh"
    ],
    "answer": 3,
    "explanation": "Hình chữ nhật là hình tứ giác nên có 4 cạnh.",
    "choiceFeedback": [
     "Sai — 2 cạnh chưa đủ tạo thành hình chữ nhật.",
     "Sai — 3 cạnh là của hình tam giác.",
     "Sai — hình chữ nhật không có 5 cạnh.",
     "Đúng — hình chữ nhật có 4 cạnh."
    ]
   },
   {
    "stem": "48 + 17 = ?",
    "choices": [
     "65",
     "64",
     "66",
     "75"
    ],
    "answer": 0,
    "explanation": "48 + 17 = 65 (8 + 7 = 15, viết 5 nhớ 1; 4 + 1 + 1 = 6).",
    "choiceFeedback": [
     "Đúng — 48 + 17 = 65.",
     "Sai — 48 + 17 không bằng 64.",
     "Sai — 48 + 17 không bằng 66.",
     "Sai — 48 + 17 không bằng 75."
    ]
   },
   {
    "stem": "72 − 28 = ?",
    "choices": [
     "43",
     "44",
     "45",
     "54"
    ],
    "answer": 1,
    "explanation": "72 − 28 = 44.",
    "choiceFeedback": [
     "Sai — 72 − 28 không bằng 43.",
     "Đúng — 72 − 28 = 44.",
     "Sai — 72 − 28 không bằng 45.",
     "Sai — 72 − 28 không bằng 54."
    ]
   },
   {
    "stem": "27 + 5 = ?",
    "choices": [
     "31",
     "30",
     "32",
     "33"
    ],
    "answer": 2,
    "explanation": "27 + 5 = 32.",
    "choiceFeedback": [
     "Sai — 27 + 5 không bằng 31.",
     "Sai — 27 + 5 không bằng 30.",
     "Đúng — 27 + 5 = 32.",
     "Sai — 27 + 5 không bằng 33."
    ]
   },
   {
    "stem": "63 − 27 = ?",
    "choices": [
     "35",
     "34",
     "37",
     "36"
    ],
    "answer": 3,
    "explanation": "63 − 27 = 36.",
    "choiceFeedback": [
     "Sai — 63 − 27 không bằng 35.",
     "Sai — 63 − 27 không bằng 34.",
     "Sai — 63 − 27 không bằng 37.",
     "Đúng — 63 − 27 = 36."
    ]
   },
   {
    "stem": "Em có 36 viên bi, cho bạn 8 viên. Hỏi em còn lại bao nhiêu viên bi?",
    "choices": [
     "28 viên",
     "27 viên",
     "29 viên",
     "26 viên"
    ],
    "answer": 0,
    "explanation": "Số bi còn lại = 36 − 8 = 28 viên.",
    "choiceFeedback": [
     "Đúng — 36 − 8 = 28 viên.",
     "Sai — 36 − 8 không bằng 27.",
     "Sai — 36 − 8 không bằng 29.",
     "Sai — 36 − 8 không bằng 26."
    ]
   },
   {
    "stem": "Lan có 35 nhãn vở, cho bạn 12 cái. Hỏi Lan còn lại bao nhiêu nhãn vở?",
    "choices": [
     "22 cái",
     "23 cái",
     "24 cái",
     "21 cái"
    ],
    "answer": 1,
    "explanation": "Số nhãn vở còn lại = 35 − 12 = 23 cái.",
    "choiceFeedback": [
     "Sai — 35 − 12 không bằng 22.",
     "Đúng — 35 − 12 = 23 cái.",
     "Sai — 35 − 12 không bằng 24.",
     "Sai — 35 − 12 không bằng 21."
    ]
   },
   {
    "stem": "Cân đu đủ nặng 3 kg và cân dưa hấu nặng 5 kg. Hỏi tổng cân nặng là bao nhiêu?",
    "choices": [
     "7 kg",
     "9 kg",
     "8 kg",
     "6 kg"
    ],
    "answer": 2,
    "explanation": "Tổng cân nặng = 3 kg + 5 kg = 8 kg.",
    "choiceFeedback": [
     "Sai — 3 + 5 không bằng 7.",
     "Sai — 3 + 5 không bằng 9.",
     "Đúng — 3 kg + 5 kg = 8 kg.",
     "Sai — 3 + 5 không bằng 6."
    ]
   },
   {
    "stem": "Hình tứ giác có mấy đỉnh?",
    "choices": [
     "3 đỉnh",
     "2 đỉnh",
     "5 đỉnh",
     "4 đỉnh"
    ],
    "answer": 3,
    "explanation": "Hình tứ giác có 4 cạnh và 4 đỉnh.",
    "choiceFeedback": [
     "Sai — 3 đỉnh là của hình tam giác.",
     "Sai — 2 đỉnh không tạo thành hình tứ giác.",
     "Sai — hình tứ giác không có 5 đỉnh.",
     "Đúng — hình tứ giác có 4 đỉnh."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P2-exam-gk2": {
  "id": "P2-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Toán 2",
  "kind": "quiz",
  "yearLevel": 2,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Toán 2",
  "questions": [
   {
    "stem": "2 × 7 = ?",
    "choices": [
     "14",
     "12",
     "16",
     "10"
    ],
    "answer": 0,
    "explanation": "2 × 7 = 14 (theo bảng nhân 2).",
    "choiceFeedback": [
     "Đúng — 2 × 7 = 14.",
     "Sai — 2 × 6 mới bằng 12.",
     "Sai — 2 × 8 mới bằng 16.",
     "Sai — 2 × 5 mới bằng 10."
    ]
   },
   {
    "stem": "5 × 6 = ?",
    "choices": [
     "25",
     "30",
     "35",
     "20"
    ],
    "answer": 1,
    "explanation": "5 × 6 = 30 (theo bảng nhân 5).",
    "choiceFeedback": [
     "Sai — 5 × 5 mới bằng 25.",
     "Đúng — 5 × 6 = 30.",
     "Sai — 5 × 7 mới bằng 35.",
     "Sai — 5 × 4 mới bằng 20."
    ]
   },
   {
    "stem": "3 × 6 = ?",
    "choices": [
     "15",
     "16",
     "18",
     "21"
    ],
    "answer": 2,
    "explanation": "3 × 6 = 18 (theo bảng nhân 3).",
    "choiceFeedback": [
     "Sai — 3 × 5 mới bằng 15.",
     "Sai — 3 × 6 không bằng 16.",
     "Đúng — 3 × 6 = 18.",
     "Sai — 3 × 7 mới bằng 21."
    ]
   },
   {
    "stem": "Cành đào nở 12 bông, sau đó rụng mất 4 bông. Hỏi còn lại bao nhiêu bông?",
    "choices": [
     "6 bông",
     "7 bông",
     "9 bông",
     "8 bông"
    ],
    "answer": 3,
    "explanation": "Số bông còn lại = 12 − 4 = 8 bông.",
    "choiceFeedback": [
     "Sai — 12 − 4 không bằng 6.",
     "Sai — 12 − 4 không bằng 7.",
     "Sai — 12 − 4 không bằng 9.",
     "Đúng — 12 − 4 = 8 bông."
    ]
   },
   {
    "stem": "4 × 5 = ?",
    "choices": [
     "20",
     "16",
     "24",
     "25"
    ],
    "answer": 0,
    "explanation": "4 × 5 = 20 (theo bảng nhân 4).",
    "choiceFeedback": [
     "Đúng — 4 × 5 = 20.",
     "Sai — 4 × 4 mới bằng 16.",
     "Sai — 4 × 6 mới bằng 24.",
     "Sai — 5 × 5 mới bằng 25."
    ]
   },
   {
    "stem": "14 : 2 = ?",
    "choices": [
     "6",
     "7",
     "8",
     "9"
    ],
    "answer": 1,
    "explanation": "14 : 2 = 7 (theo bảng chia 2).",
    "choiceFeedback": [
     "Sai — 2 × 6 = 12, không phải 14.",
     "Đúng — 14 : 2 = 7.",
     "Sai — 2 × 8 = 16, không phải 14.",
     "Sai — 2 × 9 = 18, không phải 14."
    ]
   },
   {
    "stem": "25 : 5 = ?",
    "choices": [
     "4",
     "6",
     "5",
     "3"
    ],
    "answer": 2,
    "explanation": "25 : 5 = 5 (theo bảng chia 5).",
    "choiceFeedback": [
     "Sai — 5 × 4 = 20, không phải 25.",
     "Sai — 5 × 6 = 30, không phải 25.",
     "Đúng — 25 : 5 = 5.",
     "Sai — 5 × 3 = 15, không phải 25."
    ]
   },
   {
    "stem": "18 : 3 = ?",
    "choices": [
     "5",
     "4",
     "7",
     "6"
    ],
    "answer": 3,
    "explanation": "18 : 3 = 6 (theo bảng chia 3).",
    "choiceFeedback": [
     "Sai — 3 × 5 = 15, không phải 18.",
     "Sai — 3 × 4 = 12, không phải 18.",
     "Sai — 3 × 7 = 21, không phải 18.",
     "Đúng — 18 : 3 = 6."
    ]
   },
   {
    "stem": "20 : 4 = ?",
    "choices": [
     "5",
     "4",
     "6",
     "3"
    ],
    "answer": 0,
    "explanation": "20 : 4 = 5 (theo bảng chia 4).",
    "choiceFeedback": [
     "Đúng — 20 : 4 = 5.",
     "Sai — 4 × 4 = 16, không phải 20.",
     "Sai — 4 × 6 = 24, không phải 20.",
     "Sai — 4 × 3 = 12, không phải 20."
    ]
   },
   {
    "stem": "Có 2 hộp bút, mỗi hộp có 8 cái bút. Hỏi có tất cả bao nhiêu cái bút?",
    "choices": [
     "14 cái",
     "16 cái",
     "18 cái",
     "10 cái"
    ],
    "answer": 1,
    "explanation": "Số bút tất cả = 2 × 8 = 16 cái.",
    "choiceFeedback": [
     "Sai — 2 × 8 không bằng 14.",
     "Đúng — 2 × 8 = 16 cái.",
     "Sai — 2 × 8 không bằng 18.",
     "Sai — 2 × 8 không bằng 10."
    ]
   },
   {
    "stem": "Mỗi xe ba bánh có 3 bánh xe, có 5 xe. Hỏi có tất cả bao nhiêu bánh xe?",
    "choices": [
     "10 bánh",
     "12 bánh",
     "15 bánh",
     "20 bánh"
    ],
    "answer": 2,
    "explanation": "Số bánh xe tất cả = 3 × 5 = 15 bánh.",
    "choiceFeedback": [
     "Sai — 3 × 5 không bằng 10.",
     "Sai — 3 × 5 không bằng 12.",
     "Đúng — 3 × 5 = 15 bánh.",
     "Sai — 3 × 5 không bằng 20."
    ]
   },
   {
    "stem": "Có 40 cái bút chia đều vào 5 hộp. Hỏi mỗi hộp có bao nhiêu cái bút?",
    "choices": [
     "6 cái",
     "7 cái",
     "9 cái",
     "8 cái"
    ],
    "answer": 3,
    "explanation": "Số bút mỗi hộp = 40 : 5 = 8 cái.",
    "choiceFeedback": [
     "Sai — 40 : 5 không bằng 6.",
     "Sai — 40 : 5 không bằng 7.",
     "Sai — 40 : 5 không bằng 9.",
     "Đúng — 40 : 5 = 8 cái."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P2-exam-ck2": {
  "id": "P2-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Toán 2",
  "kind": "quiz",
  "yearLevel": 2,
  "subject": "toan",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Toán 2",
  "questions": [
   {
    "stem": "2 × 9 = ?",
    "choices": [
     "18",
     "16",
     "20",
     "14"
    ],
    "answer": 0,
    "explanation": "2 × 9 = 18 (theo bảng nhân 2).",
    "choiceFeedback": [
     "Đúng — 2 × 9 = 18.",
     "Sai — 2 × 8 mới bằng 16.",
     "Sai — 2 × 10 mới bằng 20.",
     "Sai — 2 × 7 mới bằng 14."
    ]
   },
   {
    "stem": "5 × 8 = ?",
    "choices": [
     "35",
     "40",
     "45",
     "30"
    ],
    "answer": 1,
    "explanation": "5 × 8 = 40 (theo bảng nhân 5).",
    "choiceFeedback": [
     "Sai — 5 × 7 mới bằng 35.",
     "Đúng — 5 × 8 = 40.",
     "Sai — 5 × 9 mới bằng 45.",
     "Sai — 5 × 6 mới bằng 30."
    ]
   },
   {
    "stem": "4 × 7 = ?",
    "choices": [
     "24",
     "26",
     "28",
     "32"
    ],
    "answer": 2,
    "explanation": "4 × 7 = 28 (theo bảng nhân 4).",
    "choiceFeedback": [
     "Sai — 4 × 6 mới bằng 24.",
     "Sai — 4 × 7 không bằng 26.",
     "Đúng — 4 × 7 = 28.",
     "Sai — 4 × 8 mới bằng 32."
    ]
   },
   {
    "stem": "18 : 2 = ?",
    "choices": [
     "7",
     "8",
     "6",
     "9"
    ],
    "answer": 3,
    "explanation": "18 : 2 = 9 (theo bảng chia 2).",
    "choiceFeedback": [
     "Sai — 2 × 7 = 14, không phải 18.",
     "Sai — 2 × 8 = 16, không phải 18.",
     "Sai — 2 × 6 = 12, không phải 18.",
     "Đúng — 18 : 2 = 9."
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
    "explanation": "24 : 3 = 8 (theo bảng chia 3).",
    "choiceFeedback": [
     "Đúng — 24 : 3 = 8.",
     "Sai — 3 × 7 = 21, không phải 24.",
     "Sai — 3 × 9 = 27, không phải 24.",
     "Sai — 3 × 6 = 18, không phải 24."
    ]
   },
   {
    "stem": "1 lít bằng bao nhiêu mi-li-lít (ml)?",
    "choices": [
     "100 ml",
     "1000 ml",
     "10 ml",
     "10000 ml"
    ],
    "answer": 1,
    "explanation": "1 lít = 1000 ml.",
    "choiceFeedback": [
     "Sai — 100 ml quá nhỏ so với 1 lít.",
     "Đúng — 1 lít = 1000 ml.",
     "Sai — 10 ml quá nhỏ.",
     "Sai — 10000 ml quá lớn."
    ]
   },
   {
    "stem": "Số gồm 2 trăm, 3 chục và 5 đơn vị là số nào?",
    "choices": [
     "253",
     "325",
     "235",
     "352"
    ],
    "answer": 2,
    "explanation": "2 trăm là 200, 3 chục là 30, 5 đơn vị là 5; 200 + 30 + 5 = 235.",
    "choiceFeedback": [
     "Sai — 253 có 5 chục và 3 đơn vị, không đúng.",
     "Sai — 325 có 3 trăm, không đúng.",
     "Đúng — 235 gồm 2 trăm, 3 chục, 5 đơn vị.",
     "Sai — 352 có 3 trăm, không đúng."
    ]
   },
   {
    "stem": "Số nào lớn nhất trong các số: 456, 465, 546, 564?",
    "choices": [
     "456",
     "465",
     "546",
     "564"
    ],
    "answer": 3,
    "explanation": "So sánh chữ số hàng trăm: 5 > 4, trong các số có hàng trăm là 5 thì 564 lớn nhất vì hàng chục 6 > 4.",
    "choiceFeedback": [
     "Sai — 456 có hàng trăm nhỏ nhất trong nhóm so sánh.",
     "Sai — 465 nhỏ hơn 546 và 564.",
     "Sai — 546 nhỏ hơn 564.",
     "Đúng — 564 là số lớn nhất."
    ]
   },
   {
    "stem": "234 + 142 = ?",
    "choices": [
     "376",
     "366",
     "386",
     "346"
    ],
    "answer": 0,
    "explanation": "234 + 142 = 376 (cộng không nhớ theo từng hàng).",
    "choiceFeedback": [
     "Đúng — 234 + 142 = 376.",
     "Sai — 234 + 142 không bằng 366.",
     "Sai — 234 + 142 không bằng 386.",
     "Sai — 234 + 142 không bằng 346."
    ]
   },
   {
    "stem": "356 + 287 = ?",
    "choices": [
     "633",
     "643",
     "653",
     "634"
    ],
    "answer": 1,
    "explanation": "356 + 287 = 643 (6 + 7 = 13 viết 3 nhớ 1; 5 + 8 + 1 = 14 viết 4 nhớ 1; 3 + 2 + 1 = 6).",
    "choiceFeedback": [
     "Sai — 356 + 287 không bằng 633.",
     "Đúng — 356 + 287 = 643.",
     "Sai — 356 + 287 không bằng 653.",
     "Sai — 356 + 287 không bằng 634."
    ]
   },
   {
    "stem": "Mẹ đưa tờ 20.000 đồng để mua bút giá 14.000 đồng. Hỏi mẹ được trả lại bao nhiêu tiền?",
    "choices": [
     "5.000 đồng",
     "4.000 đồng",
     "6.000 đồng",
     "7.000 đồng"
    ],
    "answer": 2,
    "explanation": "Số tiền trả lại = 20.000 − 14.000 = 6.000 đồng.",
    "choiceFeedback": [
     "Sai — 20.000 − 14.000 không bằng 5.000.",
     "Sai — 20.000 − 14.000 không bằng 4.000.",
     "Đúng — 20.000 − 14.000 = 6.000 đồng.",
     "Sai — 20.000 − 14.000 không bằng 7.000."
    ]
   },
   {
    "stem": "Hình vuông có cạnh dài 8 cm. Hỏi chu vi hình vuông đó là bao nhiêu?",
    "choices": [
     "16 cm",
     "24 cm",
     "28 cm",
     "32 cm"
    ],
    "answer": 3,
    "explanation": "Chu vi hình vuông = cạnh × 4 = 8 × 4 = 32 cm.",
    "choiceFeedback": [
     "Sai — 8 × 4 không bằng 16.",
     "Sai — 8 × 4 không bằng 24.",
     "Sai — 8 × 4 không bằng 28.",
     "Đúng — 8 × 4 = 32 cm."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
