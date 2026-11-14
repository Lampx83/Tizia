// S8TIN — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S8TIN_EXAMS = {
 "S8TIN-exam-gk1": {
  "id": "S8TIN-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Tin học 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Tin học 8",
  "questions": [
   {
    "stem": "Python là ngôn ngữ lập trình có đặc điểm gì?",
    "choices": [
     "Ngôn ngữ bậc cao, cú pháp gần gũi, dễ đọc và dễ học",
     "Chỉ là ngôn ngữ máy dạng nhị phân",
     "Ngôn ngữ chỉ dùng để thiết kế web",
     "Ngôn ngữ đã ngừng phát triển từ lâu"
    ],
    "answer": 0,
    "explanation": "Python là ngôn ngữ lập trình bậc cao, cú pháp đơn giản gần với ngôn ngữ tự nhiên nên dễ đọc, dễ học và được dùng trong nhiều lĩnh vực.",
    "choiceFeedback": [
     "Đúng — Python nổi bật vì cú pháp rõ ràng, dễ tiếp cận với người mới học lập trình.",
     "Sai — ngôn ngữ máy là dãy mã nhị phân, khác hẳn với Python là ngôn ngữ lập trình bậc cao.",
     "Sai — Python được dùng trong nhiều lĩnh vực như dữ liệu, AI, tự động hoá, không chỉ để làm web.",
     "Sai — Python vẫn đang được phát triển, cập nhật và là một trong những ngôn ngữ phổ biến nhất hiện nay."
    ]
   },
   {
    "stem": "Tệp mã nguồn chương trình Python thường có phần mở rộng nào?",
    "choices": [
     ".py",
     ".pdf",
     ".exe",
     ".docx"
    ],
    "answer": 0,
    "explanation": "Tệp chứa mã nguồn Python được lưu với phần mở rộng .py.",
    "choiceFeedback": [
     "Đúng — .py là phần mở rộng chuẩn của tệp mã nguồn Python.",
     "Sai — .pdf là định dạng văn bản, không phải mã nguồn Python.",
     "Sai — .exe là tệp thực thi đã biên dịch, không phải mã nguồn Python.",
     "Sai — .docx là định dạng văn bản Word, không liên quan đến mã nguồn Python."
    ]
   },
   {
    "stem": "Python được sáng lập và phát triển đầu tiên bởi ai?",
    "choices": [
     "Guido van Rossum",
     "Bill Gates",
     "Mark Zuckerberg",
     "Steve Jobs"
    ],
    "answer": 0,
    "explanation": "Python do Guido van Rossum tạo ra và công bố lần đầu vào năm 1991.",
    "choiceFeedback": [
     "Đúng — Guido van Rossum là người sáng lập ngôn ngữ Python.",
     "Sai — Bill Gates là người sáng lập Microsoft, không phải người tạo ra Python.",
     "Sai — Mark Zuckerberg là người sáng lập Facebook, không liên quan đến Python.",
     "Sai — Steve Jobs là người đồng sáng lập Apple, không phải người tạo ra Python."
    ]
   },
   {
    "stem": "Câu lệnh nào dùng để gán giá trị 5 cho biến x trong Python?",
    "choices": [
     "x = 5",
     "5 = x",
     "x == 5",
     "let x = 5"
    ],
    "answer": 0,
    "explanation": "Trong Python, dấu = dùng để gán giá trị, cú pháp đúng là tên biến đứng trước: x = 5.",
    "choiceFeedback": [
     "Đúng — cú pháp gán trong Python là <biến> = <giá trị>.",
     "Sai — Python không cho phép đặt giá trị trước biến theo cách này để gán.",
     "Sai — dấu == là toán tử so sánh bằng, không phải toán tử gán.",
     "Sai — cú pháp let x = 5 thuộc ngôn ngữ khác (như JavaScript), Python không dùng từ khoá let."
    ]
   },
   {
    "stem": "Giá trị 3.14 trong Python thuộc kiểu dữ liệu nào?",
    "choices": [
     "float (số thực)",
     "int (số nguyên)",
     "str (xâu ký tự)",
     "bool (lôgic)"
    ],
    "answer": 0,
    "explanation": "3.14 có phần thập phân nên thuộc kiểu float (số thực) trong Python.",
    "choiceFeedback": [
     "Đúng — số có dấu chấm thập phân được Python coi là kiểu float.",
     "Sai — int dùng cho số nguyên, không có phần thập phân như 3.14.",
     "Sai — str dùng cho xâu ký tự đặt trong dấu nháy, ví dụ \"3.14\", còn 3.14 không có nháy là số thực.",
     "Sai — bool chỉ có hai giá trị True/False, không phải số thực."
    ]
   },
   {
    "stem": "Giá trị \"Hello\" (đặt trong dấu nháy kép) thuộc kiểu dữ liệu nào trong Python?",
    "choices": [
     "str (xâu ký tự)",
     "int (số nguyên)",
     "float (số thực)",
     "bool (lôgic)"
    ],
    "answer": 0,
    "explanation": "Dữ liệu đặt trong dấu nháy đơn hoặc nháy kép là kiểu xâu ký tự (str).",
    "choiceFeedback": [
     "Đúng — \"Hello\" được đặt trong dấu nháy kép nên là kiểu str.",
     "Sai — int chỉ dùng cho số nguyên, không dùng cho chữ trong dấu nháy.",
     "Sai — float chỉ dùng cho số thực, không dùng cho chữ trong dấu nháy.",
     "Sai — bool chỉ có hai giá trị True/False, không phải xâu ký tự."
    ]
   },
   {
    "stem": "Hàm nào trong Python dùng để kiểm tra kiểu dữ liệu của một biến?",
    "choices": [
     "type()",
     "input()",
     "print()",
     "len()"
    ],
    "answer": 0,
    "explanation": "Hàm type() trả về kiểu dữ liệu của giá trị hoặc biến được truyền vào.",
    "choiceFeedback": [
     "Đúng — type() cho biết kiểu dữ liệu, ví dụ type(5) trả về <class 'int'>.",
     "Sai — input() dùng để nhập dữ liệu từ bàn phím, không phải kiểm tra kiểu.",
     "Sai — print() dùng để in giá trị ra màn hình, không phải kiểm tra kiểu.",
     "Sai — len() dùng để tính độ dài của xâu hoặc danh sách, không phải kiểm tra kiểu."
    ]
   },
   {
    "stem": "Toán tử nào trong Python thực hiện phép chia lấy phần nguyên?",
    "choices": [
     "//",
     "/",
     "%",
     "**"
    ],
    "answer": 0,
    "explanation": "Toán tử // trả về phần nguyên của phép chia, ví dụ 7 // 2 = 3.",
    "choiceFeedback": [
     "Đúng — // là toán tử chia lấy phần nguyên trong Python.",
     "Sai — / là toán tử chia thông thường, kết quả có thể là số thực.",
     "Sai — % là toán tử chia lấy phần dư, không phải lấy phần nguyên.",
     "Sai — ** là toán tử tính luỹ thừa, không liên quan đến phép chia."
    ]
   },
   {
    "stem": "Toán tử % trong Python dùng để thực hiện phép tính nào?",
    "choices": [
     "Lấy phần dư của phép chia",
     "Lấy phần nguyên của phép chia",
     "Tính luỹ thừa",
     "So sánh bằng nhau"
    ],
    "answer": 0,
    "explanation": "Toán tử % trả về phần dư của phép chia, ví dụ 7 % 2 = 1.",
    "choiceFeedback": [
     "Đúng — % là toán tử lấy phần dư, thường dùng để kiểm tra số chẵn/lẻ.",
     "Sai — lấy phần nguyên là toán tử //, không phải %.",
     "Sai — tính luỹ thừa dùng toán tử **, không phải %.",
     "Sai — so sánh bằng dùng toán tử ==, không phải %."
    ]
   },
   {
    "stem": "Kết quả của biểu thức 10 / 3 trong Python 3 là giá trị nào?",
    "choices": [
     "3.3333333333333335",
     "3",
     "3.0",
     "1"
    ],
    "answer": 0,
    "explanation": "Trong Python 3, toán tử / luôn cho kết quả là số thực (phép chia thực), 10 / 3 xấp xỉ 3.3333333333333335.",
    "choiceFeedback": [
     "Đúng — / là phép chia thực nên kết quả có phần thập phân.",
     "Sai — 3 là kết quả của 10 // 3 (chia lấy phần nguyên), không phải 10 / 3.",
     "Sai — dù gần đúng về giá trị nguyên nhưng kết quả thực của 10/3 có phần thập phân dài hơn 3.0.",
     "Sai — 1 là kết quả của 10 % 3 (chia lấy phần dư), không phải 10 / 3."
    ]
   },
   {
    "stem": "Mặc định, hàm input() trong Python trả về giá trị thuộc kiểu dữ liệu nào?",
    "choices": [
     "str (xâu ký tự)",
     "int (số nguyên)",
     "float (số thực)",
     "bool (lôgic)"
    ],
    "answer": 0,
    "explanation": "Hàm input() luôn trả về dữ liệu dạng xâu ký tự (str), muốn dùng làm số phải chuyển kiểu bằng int() hoặc float().",
    "choiceFeedback": [
     "Đúng — input() luôn trả về str dù người dùng gõ số hay chữ.",
     "Sai — muốn có kiểu int phải dùng thêm int(input()) để chuyển đổi.",
     "Sai — muốn có kiểu float phải dùng thêm float(input()) để chuyển đổi.",
     "Sai — input() không trả về kiểu bool."
    ]
   },
   {
    "stem": "Để nhập một số nguyên từ bàn phím và gán cho biến x, câu lệnh nào đúng?",
    "choices": [
     "x = int(input())",
     "x = input()",
     "x = str(input())",
     "x = float(input)"
    ],
    "answer": 0,
    "explanation": "Vì input() trả về xâu ký tự, cần bọc thêm int() để chuyển thành số nguyên: x = int(input()).",
    "choiceFeedback": [
     "Đúng — int(input()) chuyển dữ liệu nhập vào thành số nguyên.",
     "Sai — nếu chỉ dùng input(), biến x sẽ mang kiểu str chứ không phải số nguyên.",
     "Sai — str(input()) vẫn cho ra kiểu xâu ký tự, không phải số nguyên.",
     "Sai — thiếu dấu ngoặc () sau input nên câu lệnh này bị sai cú pháp."
    ]
   },
   {
    "stem": "Trong lệnh print(\"a\", end=\" \"), tham số end=\" \" có tác dụng gì so với print(\"a\") mặc định?",
    "choices": [
     "Sau khi in xong không xuống dòng mà thêm một dấu cách",
     "Không in ra gì cả",
     "In ra chữ a ba lần liên tiếp",
     "Xoá màn hình trước khi in"
    ],
    "answer": 0,
    "explanation": "Mặc định print() kết thúc bằng dấu xuống dòng; tham số end=\" \" thay dấu xuống dòng đó bằng một dấu cách.",
    "choiceFeedback": [
     "Đúng — end=\" \" thay ký tự xuống dòng mặc định bằng dấu cách, giúp các lệnh print liên tiếp in trên cùng một dòng.",
     "Sai — lệnh vẫn in ra chữ a bình thường, chỉ khác cách kết thúc dòng.",
     "Sai — lệnh chỉ in một lần chữ a, không lặp lại ba lần.",
     "Sai — print() không có chức năng xoá màn hình."
    ]
   },
   {
    "stem": "Cú pháp câu lệnh điều kiện if nào sau đây là đúng trong Python?",
    "choices": [
     "if <điều kiện>:  (dòng dưới thụt lề chứa khối lệnh)",
     "if (<điều kiện>) <khối lệnh> end",
     "if <điều kiện> then <khối lệnh>",
     "if [<điều kiện>]: <khối lệnh>;"
    ],
    "answer": 0,
    "explanation": "Python dùng dấu hai chấm sau điều kiện if và thụt lề để xác định khối lệnh thực hiện, không dùng end hay from...then như một số ngôn ngữ khác.",
    "choiceFeedback": [
     "Đúng — sau if <điều kiện>: là dấu hai chấm, khối lệnh bên dưới phải thụt lề.",
     "Sai — Python không dùng từ khoá end để kết thúc khối lệnh if.",
     "Sai — Python không dùng cú pháp then như Pascal hay một số ngôn ngữ khác.",
     "Sai — Python không dùng dấu ngoặc vuông quanh điều kiện và không cần dấu chấm phẩy cuối dòng."
    ]
   },
   {
    "stem": "Đoạn lệnh sau sẽ in ra gì khi chạy: if 5 > 3:\\n    print(\"Y\")",
    "choices": [
     "In ra chữ Y",
     "Không in ra gì",
     "Báo lỗi cú pháp",
     "In ra chữ N"
    ],
    "answer": 0,
    "explanation": "Vì 5 > 3 là điều kiện đúng (True), nên lệnh print(\"Y\") bên trong khối if được thực hiện, in ra chữ Y.",
    "choiceFeedback": [
     "Đúng — điều kiện 5 > 3 đúng nên khối lệnh if được thực thi, in ra Y.",
     "Sai — vì điều kiện đúng nên chương trình chắc chắn in ra Y, không phải im lặng.",
     "Sai — đoạn lệnh có cú pháp hợp lệ, không có lỗi.",
     "Sai — chương trình không có lệnh nào in ra chữ N."
    ]
   },
   {
    "stem": "Toán tử logic nào trong Python cho kết quả đúng (True) chỉ khi cả hai điều kiện đều đúng?",
    "choices": [
     "and",
     "or",
     "not",
     "xor"
    ],
    "answer": 0,
    "explanation": "Toán tử and trả về True khi và chỉ khi cả hai vế đều đúng; chỉ cần một vế sai thì kết quả là False.",
    "choiceFeedback": [
     "Đúng — and yêu cầu cả hai điều kiện đều đúng thì kết quả mới đúng.",
     "Sai — or chỉ cần một trong hai điều kiện đúng là đủ để kết quả đúng.",
     "Sai — not là toán tử phủ định một điều kiện, không kết hợp hai điều kiện.",
     "Sai — Python không có toán tử logic tên xor cho kiểu bool cơ bản như and/or."
    ]
   },
   {
    "stem": "Cấu trúc if-else trong Python dùng để làm gì?",
    "choices": [
     "Thực hiện một trong hai nhánh lệnh tuỳ theo điều kiện đúng hay sai",
     "Luôn thực hiện cả hai nhánh lệnh",
     "Lặp lại một khối lệnh nhiều lần",
     "Chỉ dùng để khai báo hàm"
    ],
    "answer": 0,
    "explanation": "if-else cho phép rẽ nhánh: nếu điều kiện đúng thực hiện khối lệnh sau if, sai thì thực hiện khối lệnh sau else.",
    "choiceFeedback": [
     "Đúng — if-else chọn đúng một trong hai nhánh lệnh dựa trên điều kiện.",
     "Sai — chỉ một trong hai nhánh được thực hiện, không phải cả hai.",
     "Sai — lặp lại nhiều lần là chức năng của vòng lặp (for/while), không phải if-else.",
     "Sai — khai báo hàm dùng từ khoá def, không phải if-else."
    ]
   },
   {
    "stem": "Cho chương trình: if x > 0: print(\"D\") elif x < 0: print(\"A\") else: print(\"0\"). Với x = -5, chương trình in ra gì?",
    "choices": [
     "A",
     "D",
     "0",
     "Không in gì"
    ],
    "answer": 0,
    "explanation": "Vì x = -5 không lớn hơn 0 nhưng nhỏ hơn 0, nên điều kiện elif x < 0 đúng, chương trình in ra A.",
    "choiceFeedback": [
     "Đúng — x = -5 thoả điều kiện x < 0 ở nhánh elif nên in ra A.",
     "Sai — D chỉ được in khi x > 0, mà -5 không lớn hơn 0.",
     "Sai — 0 chỉ được in khi cả hai điều kiện trên đều sai, nhưng ở đây elif x < 0 đã đúng.",
     "Sai — chương trình luôn in ra một trong ba giá trị D, A hoặc 0 tuỳ theo x."
    ]
   },
   {
    "stem": "Vòng lặp for i in range(2, 6): sẽ khiến biến i lần lượt nhận các giá trị nào?",
    "choices": [
     "2, 3, 4, 5",
     "2, 3, 4, 5, 6",
     "0, 1, 2, 3",
     "3, 4, 5, 6"
    ],
    "answer": 0,
    "explanation": "range(2, 6) sinh dãy số bắt đầu từ 2 và kết thúc trước 6, tức là 2, 3, 4, 5.",
    "choiceFeedback": [
     "Đúng — range(2, 6) gồm các số từ 2 đến 5, không bao gồm 6.",
     "Sai — số 6 không được bao gồm vì range dừng lại trước giá trị kết thúc.",
     "Sai — dãy này bắt đầu từ 2 chứ không phải từ 0.",
     "Sai — dãy này bắt đầu từ 2, không phải từ 3, và không bao gồm số 6."
    ]
   },
   {
    "stem": "Đoạn chương trình sau in ra giá trị nào? i = 0\\ns = 0\\nwhile i < 5:\\n    s = s + i\\n    i = i + 1\\nprint(s)",
    "choices": [
     "10",
     "5",
     "15",
     "0"
    ],
    "answer": 0,
    "explanation": "Vòng lặp while cộng dồn i khi i chạy từ 0 đến 4 (vì i < 5): s = 0+1+2+3+4 = 10.",
    "choiceFeedback": [
     "Đúng — tổng các giá trị i từ 0 đến 4 là 0+1+2+3+4 = 10.",
     "Sai — 5 là số lần lặp của vòng while, không phải tổng s được cộng dồn.",
     "Sai — 15 là tổng từ 1 đến 5, nhưng vòng lặp này chỉ cộng i từ 0 đến 4.",
     "Sai — s không giữ nguyên giá trị 0 vì vòng lặp có cộng dồn s = s + i nhiều lần."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S8TIN-exam-ck1": {
  "id": "S8TIN-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Tin học 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Tin học 8",
  "questions": [
   {
    "stem": "Trong Python, dấu # ở đầu dòng có tác dụng gì?",
    "choices": [
     "Đánh dấu dòng chú thích (comment), không được thực thi",
     "Bắt đầu khai báo một hàm mới",
     "Kết thúc chương trình ngay lập tức",
     "Yêu cầu nhập dữ liệu từ bàn phím"
    ],
    "answer": 0,
    "explanation": "Dấu # dùng để viết chú thích giải thích mã nguồn; Python bỏ qua, không thực thi các dòng bắt đầu bằng #.",
    "choiceFeedback": [
     "Đúng — dòng bắt đầu bằng # là chú thích, giúp giải thích code mà không ảnh hưởng đến chương trình.",
     "Sai — khai báo hàm dùng từ khoá def, không dùng dấu #.",
     "Sai — kết thúc chương trình không dùng dấu #, mà thường dùng lệnh khác như exit().",
     "Sai — nhập dữ liệu dùng hàm input(), không liên quan đến dấu #."
    ]
   },
   {
    "stem": "Hàm nào trong Python dùng để chuyển một xâu chứa số thành kiểu số nguyên?",
    "choices": [
     "int()",
     "str()",
     "float()",
     "type()"
    ],
    "answer": 0,
    "explanation": "Hàm int() chuyển đổi một xâu (hoặc số thực) sang kiểu số nguyên, ví dụ int(\"5\") cho ra 5.",
    "choiceFeedback": [
     "Đúng — int() dùng để ép kiểu sang số nguyên.",
     "Sai — str() làm ngược lại, chuyển giá trị thành xâu ký tự.",
     "Sai — float() chuyển sang số thực, không phải số nguyên.",
     "Sai — type() dùng để kiểm tra kiểu dữ liệu, không chuyển đổi kiểu."
    ]
   },
   {
    "stem": "Kết quả của biểu thức 2 ** 3 trong Python là bao nhiêu?",
    "choices": [
     "8",
     "6",
     "9",
     "5"
    ],
    "answer": 0,
    "explanation": "Toán tử ** là luỹ thừa, 2 ** 3 nghĩa là 2 nhân với chính nó 3 lần: 2×2×2 = 8.",
    "choiceFeedback": [
     "Đúng — 2 ** 3 = 2×2×2 = 8.",
     "Sai — 6 là kết quả của 2×3, không phải 2 mũ 3.",
     "Sai — 9 là kết quả của 3 mũ 2 (3**2), không phải 2 mũ 3.",
     "Sai — 5 là kết quả của 2+3, không phải phép luỹ thừa."
    ]
   },
   {
    "stem": "Đoạn lệnh sau in ra gì? x = 10\\nif x % 2 == 0:\\n    print(\"Chẵn\")\\nelse:\\n    print(\"Lẻ\")",
    "choices": [
     "Chẵn",
     "Lẻ",
     "10",
     "Lỗi"
    ],
    "answer": 0,
    "explanation": "10 % 2 = 0 nên điều kiện x % 2 == 0 đúng, chương trình in ra \"Chẵn\".",
    "choiceFeedback": [
     "Đúng — 10 chia hết cho 2 (dư 0) nên điều kiện chẵn đúng, in ra Chẵn.",
     "Sai — Lẻ chỉ được in khi x % 2 khác 0, nhưng 10 % 2 = 0.",
     "Sai — chương trình in ra chữ mô tả tính chẵn/lẻ chứ không in giá trị số 10.",
     "Sai — đoạn lệnh có cú pháp hợp lệ, không gây lỗi khi chạy."
    ]
   },
   {
    "stem": "Để phân loại học lực theo 3 mức Giỏi (điểm ≥ 8), Khá (6.5 ≤ điểm < 8), Trung bình (điểm < 6.5), nên dùng cấu trúc điều khiển nào là phù hợp nhất?",
    "choices": [
     "if-elif-else vì có nhiều mức điều kiện xét liên tiếp",
     "Chỉ dùng một câu lệnh if vì chỉ có một điều kiện",
     "Vòng lặp for vì cần lặp nhiều lần",
     "Vòng lặp while vì chưa biết trước số lần lặp"
    ],
    "answer": 0,
    "explanation": "Có từ 3 mức điều kiện loại trừ nhau trở lên nên dùng if-elif-else để kiểm tra tuần tự và chỉ thực hiện đúng một nhánh phù hợp.",
    "choiceFeedback": [
     "Đúng — if-elif-else xử lý gọn nhiều mức điều kiện liên tiếp, mỗi lần chỉ chọn một nhánh.",
     "Sai — bài toán có tới 3 mức điều kiện, một if đơn không đủ để phân loại đầy đủ.",
     "Sai — đây là bài toán rẽ nhánh dựa trên điều kiện, không phải bài toán cần lặp lại nhiều lần.",
     "Sai — while dùng cho các bài toán lặp theo điều kiện, không phù hợp cho việc phân loại một lần theo mức điểm."
    ]
   },
   {
    "stem": "Vòng lặp for và vòng lặp while trong Python khác nhau chủ yếu ở điểm nào?",
    "choices": [
     "for thường dùng khi biết trước số lần lặp, while dùng khi lặp theo điều kiện",
     "for luôn chạy nhanh hơn while trong mọi trường hợp",
     "while không thể sử dụng cùng với biến đếm",
     "for không thể dùng để duyệt qua danh sách"
    ],
    "answer": 0,
    "explanation": "for thường dùng khi biết trước số lần lặp (ví dụ duyệt qua range hoặc danh sách), while dùng khi lặp lại chừng nào điều kiện còn đúng, không biết trước số lần.",
    "choiceFeedback": [
     "Đúng — đây là điểm khác biệt cơ bản về cách sử dụng hai loại vòng lặp.",
     "Sai — tốc độ không phải là điểm khác biệt chính, cả hai đều có thể dùng hiệu quả tuỳ bài toán.",
     "Sai — while vẫn có thể dùng cùng biến đếm, ví dụ i = 0; while i < 5: ...",
     "Sai — for hoàn toàn có thể duyệt qua danh sách bằng for phần_tử in danh_sách:."
    ]
   },
   {
    "stem": "Đoạn chương trình nào sau đây đếm đúng số lượng số chẵn trong khoảng từ 1 đến 10?",
    "choices": [
     "count = 0\\nfor i in range(1, 11):\\n    if i % 2 == 0:\\n        count += 1",
     "count = 0\\nfor i in range(1, 10):\\n    if i % 2 == 1:\\n        count += 1",
     "count = 0\\nfor i in range(1, 11):\\n    if i % 2 == 1:\\n        count -= 1",
     "count = 0\\nwhile i < 10:\\n    count += 1"
    ],
    "answer": 0,
    "explanation": "range(1, 11) duyệt đúng các số từ 1 đến 10; điều kiện i % 2 == 0 kiểm tra số chẵn và count += 1 đếm đúng.",
    "choiceFeedback": [
     "Đúng — dãy 1 đến 10 được duyệt đủ và điều kiện chẵn được kiểm tra chính xác.",
     "Sai — range(1, 10) bỏ sót số 10, và điều kiện i % 2 == 1 lại đếm số lẻ chứ không phải số chẵn.",
     "Sai — điều kiện i % 2 == 1 kiểm tra số lẻ, và count -= 1 làm giảm biến đếm thay vì tăng.",
     "Sai — biến i chưa được khởi tạo trước vòng while nên chương trình sẽ báo lỗi khi chạy."
    ]
   },
   {
    "stem": "Cách nào sau đây tạo một danh sách (list) rỗng trong Python?",
    "choices": [
     "a = []",
     "a = ()",
     "a = {}",
     "a = \"\""
    ],
    "answer": 0,
    "explanation": "Cặp dấu ngoặc vuông [] dùng để tạo danh sách (list) trong Python, [] không chứa phần tử nào là danh sách rỗng.",
    "choiceFeedback": [
     "Đúng — [] là cú pháp tạo danh sách rỗng trong Python.",
     "Sai — () tạo ra một tuple rỗng, không phải danh sách (list).",
     "Sai — {} tạo ra một dictionary rỗng, không phải danh sách (list).",
     "Sai — \"\" tạo ra một xâu ký tự rỗng, không phải danh sách (list)."
    ]
   },
   {
    "stem": "Cho a = [10, 20, 30]. Sau khi thực hiện lệnh a.append(40), danh sách a trở thành gì?",
    "choices": [
     "[10, 20, 30, 40]",
     "[40, 10, 20, 30]",
     "[10, 20, 30]",
     "[10, 20, 30, 40, 40]"
    ],
    "answer": 0,
    "explanation": "Phương thức append() thêm một phần tử vào cuối danh sách, nên a trở thành [10, 20, 30, 40].",
    "choiceFeedback": [
     "Đúng — append() luôn thêm phần tử mới vào vị trí cuối cùng của danh sách.",
     "Sai — append() thêm phần tử vào cuối danh sách, không phải vào đầu danh sách.",
     "Sai — danh sách phải thay đổi sau khi gọi append(40), không thể giữ nguyên như cũ.",
     "Sai — append(40) chỉ thêm một phần tử 40 duy nhất, không thêm hai lần."
    ]
   },
   {
    "stem": "Cho a = [3, 5, 3, 2, 3]. Biểu thức a.count(3) trả về giá trị nào?",
    "choices": [
     "3",
     "2",
     "5",
     "1"
    ],
    "answer": 0,
    "explanation": "Phương thức count() đếm số lần giá trị 3 xuất hiện trong danh sách; số 3 xuất hiện ở vị trí đầu, giữa và cuối, tổng cộng 3 lần.",
    "choiceFeedback": [
     "Đúng — giá trị 3 xuất hiện đúng 3 lần trong danh sách a.",
     "Sai — số 3 xuất hiện nhiều hơn 2 lần trong danh sách này, hãy đếm lại kỹ.",
     "Sai — 5 là một phần tử của danh sách chứ không phải số lần xuất hiện của giá trị 3.",
     "Sai — số 3 xuất hiện nhiều hơn 1 lần trong danh sách a."
    ]
   },
   {
    "stem": "Để sắp xếp danh sách a theo thứ tự tăng dần (thay đổi trực tiếp trên a), ta dùng lệnh nào?",
    "choices": [
     "a.sort()",
     "a.count()",
     "a.append()",
     "a.reverse()"
    ],
    "answer": 0,
    "explanation": "Phương thức sort() sắp xếp danh sách tăng dần mặc định và thay đổi trực tiếp trên danh sách gốc.",
    "choiceFeedback": [
     "Đúng — a.sort() sắp xếp trực tiếp danh sách a theo thứ tự tăng dần.",
     "Sai — count() dùng để đếm số lần xuất hiện của một giá trị, không dùng để sắp xếp.",
     "Sai — append() dùng để thêm phần tử vào cuối danh sách, không dùng để sắp xếp.",
     "Sai — reverse() chỉ đảo ngược thứ tự hiện tại của danh sách, không sắp xếp tăng dần."
    ]
   },
   {
    "stem": "Từ khoá nào dùng để khai báo (định nghĩa) một hàm trong Python?",
    "choices": [
     "def",
     "function",
     "func",
     "lambda"
    ],
    "answer": 0,
    "explanation": "Python dùng từ khoá def để bắt đầu định nghĩa một hàm, ví dụ: def ten_ham(tham_so):.",
    "choiceFeedback": [
     "Đúng — def là từ khoá chuẩn để khai báo hàm trong Python.",
     "Sai — function là từ khoá của một số ngôn ngữ khác như JavaScript, Python không dùng từ này.",
     "Sai — func là từ khoá của Swift/Go, không phải cú pháp khai báo hàm trong Python.",
     "Sai — lambda dùng để tạo hàm ẩn danh ngắn gọn, không phải cách khai báo hàm thông thường."
    ]
   },
   {
    "stem": "Cho hàm def cong(a, b): return a + b. Lời gọi cong(3, 4) trả về giá trị nào?",
    "choices": [
     "7",
     "34",
     "12",
     "Lỗi vì thiếu tham số"
    ],
    "answer": 0,
    "explanation": "Hàm cong(a, b) trả về tổng a + b; với a=3, b=4 thì kết quả là 3+4=7.",
    "choiceFeedback": [
     "Đúng — 3 + 4 = 7, đúng như hàm return a + b thực hiện.",
     "Sai — 34 sẽ là kết quả nếu ghép hai xâu ký tự \"3\" và \"4\", nhưng ở đây a, b là số nên phép + thực hiện cộng số học.",
     "Sai — 12 là kết quả của phép nhân 3×4, nhưng hàm này thực hiện phép cộng (a + b).",
     "Sai — hàm cong(a, b) nhận đủ hai tham số a=3, b=4 nên lời gọi này hợp lệ, không gây lỗi."
    ]
   },
   {
    "stem": "Trong Word, việc sử dụng Style (kiểu) như Heading 1, Heading 2 cho các đề mục có tác dụng gì?",
    "choices": [
     "Tạo cấu trúc văn bản rõ ràng và cho phép tạo mục lục tự động",
     "Chỉ để đổi màu chữ cho đẹp mắt",
     "Chỉ có tác dụng khi in tài liệu ra giấy",
     "Không có tác dụng thực tế nào"
    ],
    "answer": 0,
    "explanation": "Các Style Heading giúp phân cấp tiêu đề rõ ràng, đồng thời Word có thể dựa vào đó để tạo mục lục tự động (Table of Contents).",
    "choiceFeedback": [
     "Đúng — Heading Style giúp cấu trúc văn bản mạch lạc và hỗ trợ tạo mục lục tự động.",
     "Sai — mục đích chính không chỉ là đổi màu chữ, mà là phân cấp và cấu trúc nội dung.",
     "Sai — tác dụng của Style thể hiện cả khi soạn thảo trên máy, không chỉ khi in.",
     "Sai — Style Heading có tác dụng rất thiết thực trong việc tổ chức và định dạng văn bản dài."
    ]
   },
   {
    "stem": "Để chèn một bảng vào văn bản Word, ta thường thực hiện thao tác nào?",
    "choices": [
     "Vào thẻ Insert (Chèn) → chọn Table (Bảng)",
     "Vào thẻ Home (Trang chủ) → chọn Table",
     "Vào thẻ View (Xem) → chọn Table",
     "Vào thẻ References (Tham chiếu) → chọn Table"
    ],
    "answer": 0,
    "explanation": "Chức năng chèn bảng nằm trong thẻ Insert của Word.",
    "choiceFeedback": [
     "Đúng — thẻ Insert chứa các lệnh chèn đối tượng như bảng, hình ảnh, biểu đồ.",
     "Sai — thẻ Home chủ yếu chứa các công cụ định dạng văn bản như phông chữ, không phải chèn bảng.",
     "Sai — thẻ View dùng để thay đổi chế độ hiển thị tài liệu, không dùng để chèn bảng.",
     "Sai — thẻ References dùng cho mục lục, chú thích, trích dẫn, không dùng để chèn bảng."
    ]
   },
   {
    "stem": "Trong Excel/Google Sheets, mọi công thức đều phải bắt đầu bằng ký hiệu nào?",
    "choices": [
     "Dấu = (bằng)",
     "Dấu # (thăng)",
     "Dấu $ (đô la)",
     "Dấu & (và)"
    ],
    "answer": 0,
    "explanation": "Một công thức trong bảng tính luôn bắt đầu bằng dấu =, ví dụ =SUM(A1:A5).",
    "choiceFeedback": [
     "Đúng — dấu = báo hiệu cho bảng tính biết đây là một công thức cần tính toán.",
     "Sai — dấu # thường xuất hiện khi ô báo lỗi (ví dụ #DIV/0!), không phải ký hiệu bắt đầu công thức.",
     "Sai — dấu $ dùng để cố định (tham chiếu tuyệt đối) một ô trong công thức, không phải ký hiệu mở đầu công thức.",
     "Sai — dấu & dùng để nối chuỗi văn bản trong công thức, không phải ký hiệu bắt đầu công thức."
    ]
   },
   {
    "stem": "Hàm nào dùng để tính tổng các giá trị trong vùng từ ô A1 đến A5?",
    "choices": [
     "=SUM(A1:A5)",
     "=AVERAGE(A1:A5)",
     "=MAX(A1:A5)",
     "=COUNT(A1:A5)"
    ],
    "answer": 0,
    "explanation": "Hàm SUM cộng tổng các giá trị trong vùng dữ liệu được chỉ định.",
    "choiceFeedback": [
     "Đúng — SUM(A1:A5) tính tổng các giá trị từ ô A1 đến A5.",
     "Sai — AVERAGE tính giá trị trung bình cộng, không phải tổng.",
     "Sai — MAX tìm giá trị lớn nhất trong vùng, không phải tổng.",
     "Sai — COUNT đếm số lượng ô chứa số, không phải tính tổng giá trị."
    ]
   },
   {
    "stem": "Ô B2 chứa công thức =IF(B2>=5, \"Đạt\", \"Chưa đạt\") — trong đó B2 nhận giá trị điểm số. Nếu điểm nhập vào là 4, công thức tại ô kết quả cho ra giá trị nào?",
    "choices": [
     "Chưa đạt",
     "Đạt",
     "4",
     "Lỗi công thức"
    ],
    "answer": 0,
    "explanation": "Vì điều kiện điểm ≥ 5 là 4 >= 5 sai, hàm IF trả về giá trị ứng với trường hợp sai là \"Chưa đạt\".",
    "choiceFeedback": [
     "Đúng — 4 không lớn hơn hoặc bằng 5 nên điều kiện sai, IF trả về \"Chưa đạt\".",
     "Sai — \"Đạt\" chỉ được trả về khi điểm ≥ 5, nhưng ở đây điểm là 4.",
     "Sai — hàm IF trả về một trong hai xâu kết quả (\"Đạt\"/\"Chưa đạt\"), không trả về lại giá trị số gốc.",
     "Sai — công thức IF với đủ 3 đối số như trên là hợp lệ, không gây lỗi."
    ]
   },
   {
    "stem": "Hàm nào trong Excel dùng để đếm số ô thoả mãn một điều kiện cho trước?",
    "choices": [
     "COUNTIF",
     "SUMIF",
     "IF",
     "AVERAGEIF"
    ],
    "answer": 0,
    "explanation": "COUNTIF đếm số ô thoả mãn điều kiện; SUMIF tính tổng theo điều kiện; AVERAGEIF tính trung bình theo điều kiện — đều khác chức năng đếm số ô.",
    "choiceFeedback": [
     "Đúng — COUNTIF(vùng, điều_kiện) đếm số ô trong vùng thoả mãn điều kiện.",
     "Sai — SUMIF tính tổng các giá trị thoả điều kiện, không phải đếm số ô.",
     "Sai — IF chỉ trả về một trong hai giá trị theo điều kiện của chính ô đó, không đếm trên cả vùng.",
     "Sai — AVERAGEIF tính trung bình cộng các giá trị thoả điều kiện, không phải đếm số ô."
    ]
   },
   {
    "stem": "Để so sánh tỉ lệ phần trăm giữa các phần trong một tổng thể (ví dụ tỉ lệ các loại điểm trong lớp), nên dùng loại biểu đồ nào là phù hợp nhất?",
    "choices": [
     "Biểu đồ tròn (Pie chart)",
     "Biểu đồ đường (Line chart)",
     "Biểu đồ phân tán (Scatter chart)",
     "Biểu đồ cột theo thời gian (Column chart theo mốc thời gian)"
    ],
    "answer": 0,
    "explanation": "Biểu đồ tròn thể hiện rõ tỉ lệ phần trăm của từng phần trong một tổng thể, phù hợp để so sánh cơ cấu.",
    "choiceFeedback": [
     "Đúng — biểu đồ tròn (Pie chart) trực quan cho việc thể hiện tỉ lệ cơ cấu của các phần trong tổng thể.",
     "Sai — biểu đồ đường phù hợp để thể hiện xu hướng thay đổi theo thời gian, không phải tỉ lệ cơ cấu.",
     "Sai — biểu đồ phân tán phù hợp thể hiện mối quan hệ giữa hai đại lượng, không phải tỉ lệ phần trăm cơ cấu.",
     "Sai — biểu đồ cột theo thời gian phù hợp so sánh giá trị qua các mốc thời gian, không phải tỉ lệ cơ cấu."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S8TIN-exam-gk2": {
  "id": "S8TIN-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Tin học 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Tin học 8",
  "questions": [
   {
    "stem": "Sắp xếp (sorting) trong tin học được hiểu là gì?",
    "choices": [
     "Sắp xếp lại các phần tử của một dãy theo một thứ tự xác định (tăng dần hoặc giảm dần)",
     "Xoá bớt các phần tử trong dãy",
     "Tìm phần tử lớn nhất trong dãy",
     "Đảo ngược ngẫu nhiên thứ tự các phần tử"
    ],
    "answer": 0,
    "explanation": "Sắp xếp là quá trình tổ chức lại các phần tử của một dãy theo một trật tự xác định, thường là tăng dần hoặc giảm dần.",
    "choiceFeedback": [
     "Đúng — mục tiêu của sắp xếp là đưa dãy về đúng một thứ tự xác định.",
     "Sai — sắp xếp không làm mất đi phần tử nào, chỉ thay đổi vị trí của chúng.",
     "Sai — tìm phần tử lớn nhất chỉ là một bài toán liên quan, không phải định nghĩa của sắp xếp.",
     "Sai — sắp xếp phải theo một quy tắc thứ tự rõ ràng, không phải đảo ngẫu nhiên."
    ]
   },
   {
    "stem": "Sau khi sắp xếp một dãy số theo thứ tự tăng dần, phần tử đứng ở vị trí đầu tiên là phần tử nào?",
    "choices": [
     "Phần tử nhỏ nhất trong dãy",
     "Phần tử lớn nhất trong dãy",
     "Phần tử đứng giữa dãy",
     "Một phần tử bất kỳ"
    ],
    "answer": 0,
    "explanation": "Khi sắp xếp tăng dần, các phần tử được xếp từ nhỏ đến lớn, nên phần tử đầu tiên chính là phần tử nhỏ nhất.",
    "choiceFeedback": [
     "Đúng — sắp xếp tăng dần đưa phần tử nhỏ nhất lên vị trí đầu tiên.",
     "Sai — phần tử lớn nhất sẽ nằm ở vị trí cuối cùng trong dãy đã sắp xếp tăng dần.",
     "Sai — phần tử đứng giữa không nhất thiết mang giá trị đặc biệt về độ lớn.",
     "Sai — sau khi sắp xếp, vị trí đầu tiên luôn là phần tử nhỏ nhất, không phải ngẫu nhiên."
    ]
   },
   {
    "stem": "Ý tưởng chính của thuật toán sắp xếp chọn (Selection sort) là gì?",
    "choices": [
     "Mỗi lượt chọn phần tử nhỏ nhất trong phần chưa sắp xếp rồi đưa về đúng vị trí",
     "Chèn từng phần tử vào đúng vị trí trong phần dãy đã sắp xếp",
     "Chia dãy thành hai nửa rồi sắp xếp riêng từng nửa",
     "So sánh ngẫu nhiên các cặp phần tử với nhau"
    ],
    "answer": 0,
    "explanation": "Selection sort lặp lại việc tìm phần tử nhỏ nhất trong phần chưa sắp xếp và đưa nó về đúng vị trí ở đầu phần đó.",
    "choiceFeedback": [
     "Đúng — đây chính là ý tưởng cốt lõi của thuật toán sắp xếp chọn.",
     "Sai — chèn phần tử vào đúng vị trí trong phần đã sắp xếp là ý tưởng của thuật toán sắp xếp chèn (Insertion sort).",
     "Sai — chia dãy thành các phần nhỏ hơn để sắp xếp riêng là ý tưởng của các thuật toán chia để trị, không phải selection sort ở mức lớp 8.",
     "Sai — selection sort so sánh có hệ thống để tìm giá trị nhỏ nhất, không so sánh ngẫu nhiên."
    ]
   },
   {
    "stem": "Với dãy có n phần tử, thuật toán selection sort cần thực hiện khoảng bao nhiêu lần so sánh?",
    "choices": [
     "Khoảng n(n-1)/2 lần",
     "Khoảng n lần",
     "Khoảng log₂n lần",
     "Khoảng 2n lần"
    ],
    "answer": 0,
    "explanation": "Selection sort cần khoảng n(n-1)/2 phép so sánh vì với mỗi lượt chọn phần tử nhỏ nhất phải so sánh với các phần tử còn lại.",
    "choiceFeedback": [
     "Đúng — tổng số lần so sánh cộng dồn qua các lượt xấp xỉ n(n-1)/2, tương ứng độ phức tạp O(n²).",
     "Sai — chỉ n lần so sánh là quá ít, vì mỗi lượt chọn đã cần nhiều phép so sánh với các phần tử còn lại.",
     "Sai — log₂n là độ phức tạp của các thuật toán tìm kiếm nhanh như binary search, không phải selection sort.",
     "Sai — 2n vẫn là quá ít so với số phép so sánh thực tế cần thực hiện của thuật toán này."
    ]
   },
   {
    "stem": "Cho dãy [3, 1, 2]. Áp dụng bước đầu tiên của selection sort (tìm phần tử nhỏ nhất trong toàn dãy và đưa về đầu), kết quả sau bước 1 là dãy nào?",
    "choices": [
     "[1, 3, 2]",
     "[3, 1, 2]",
     "[1, 2, 3]",
     "[2, 1, 3]"
    ],
    "answer": 0,
    "explanation": "Phần tử nhỏ nhất của dãy [3,1,2] là 1 (đang ở vị trí thứ 2), đổi chỗ 1 với phần tử đầu dãy (3), được dãy mới [1, 3, 2].",
    "choiceFeedback": [
     "Đúng — đổi chỗ phần tử nhỏ nhất (1) với phần tử đầu dãy (3) cho ra [1, 3, 2].",
     "Sai — dãy phải thay đổi sau bước 1 vì phần tử nhỏ nhất (1) chưa nằm ở đầu dãy ban đầu.",
     "Sai — [1, 2, 3] là kết quả cuối cùng sau khi sắp xếp xong hoàn toàn, không phải chỉ sau bước 1.",
     "Sai — bước 1 chỉ hoán đổi phần tử nhỏ nhất (1) lên đầu, không tạo ra thứ tự [2, 1, 3]."
    ]
   },
   {
    "stem": "Ý tưởng chính của thuật toán sắp xếp chèn (Insertion sort) là gì?",
    "choices": [
     "Lấy từng phần tử và chèn vào đúng vị trí trong phần dãy đã được sắp xếp",
     "Luôn chọn phần tử lớn nhất và đưa ra cuối dãy",
     "Chia đôi dãy liên tục cho đến khi còn một phần tử",
     "Đảo ngẫu nhiên vị trí các phần tử trong dãy"
    ],
    "answer": 0,
    "explanation": "Insertion sort duyệt từng phần tử và chèn nó vào đúng vị trí trong phần dãy con đã được sắp xếp trước đó.",
    "choiceFeedback": [
     "Đúng — đây là ý tưởng cốt lõi của thuật toán sắp xếp chèn.",
     "Sai — chọn phần tử nhỏ nhất mỗi lượt là ý tưởng của thuật toán sắp xếp chọn (Selection sort), không phải insertion sort.",
     "Sai — chia đôi dãy liên tục là ý tưởng của các thuật toán chia để trị, không phải insertion sort ở mức lớp 8.",
     "Sai — insertion sort chèn phần tử vào đúng vị trí có trật tự, không đảo ngẫu nhiên."
    ]
   },
   {
    "stem": "Trong trường hợp xấu nhất, độ phức tạp của thuật toán insertion sort là bao nhiêu?",
    "choices": [
     "O(n²)",
     "O(n)",
     "O(log n)",
     "O(1)"
    ],
    "answer": 0,
    "explanation": "Trường hợp xấu nhất (dãy sắp xếp ngược), insertion sort cần khoảng n(n-1)/2 phép so sánh và dịch chuyển, tức độ phức tạp O(n²).",
    "choiceFeedback": [
     "Đúng — trường hợp xấu nhất của insertion sort có độ phức tạp bậc hai O(n²), tương tự selection sort.",
     "Sai — O(n) là quá nhanh so với thực tế của insertion sort ở trường hợp xấu nhất.",
     "Sai — O(log n) là độ phức tạp rất nhanh của tìm kiếm nhị phân, không phải của sắp xếp chèn.",
     "Sai — O(1) nghĩa là thời gian không đổi, không phù hợp với một thuật toán phải xử lý n phần tử."
    ]
   },
   {
    "stem": "Cho dãy [4, 2, 5, 1]. Sau khi chèn xong phần tử thứ hai (giá trị 2) vào đúng vị trí trong phần dãy đã sắp xếp trước đó (chỉ gồm phần tử 4), dãy trở thành gì?",
    "choices": [
     "[2, 4, 5, 1]",
     "[4, 2, 5, 1]",
     "[1, 2, 4, 5]",
     "[2, 4, 1, 5]"
    ],
    "answer": 0,
    "explanation": "Xét hai phần tử đầu [4, 2]: vì 2 < 4 nên chèn 2 lên trước 4, được [2, 4], phần còn lại [5, 1] giữ nguyên vị trí ban đầu, kết quả [2, 4, 5, 1].",
    "choiceFeedback": [
     "Đúng — 2 nhỏ hơn 4 nên được chèn lên trước, còn 5 và 1 vẫn giữ nguyên vị trí ở bước này.",
     "Sai — dãy phải thay đổi ở bước này vì 2 nhỏ hơn 4 nên cần đổi chỗ hai phần tử đầu.",
     "Sai — [1, 2, 4, 5] là kết quả cuối cùng sau khi sắp xếp xong hoàn toàn, không phải chỉ sau bước chèn phần tử thứ hai.",
     "Sai — ở bước này chỉ xét hai phần tử đầu dãy (4 và 2), phần tử 1 ở cuối dãy chưa được xử lý tới."
    ]
   },
   {
    "stem": "Trong Python, phương thức a.sort() có tác dụng gì với danh sách a?",
    "choices": [
     "Sắp xếp trực tiếp danh sách a tăng dần, làm thay đổi chính a",
     "Trả về một danh sách mới đã sắp xếp, giữ nguyên a",
     "Đảo ngược thứ tự các phần tử trong a",
     "Xoá các phần tử trùng lặp trong a"
    ],
    "answer": 0,
    "explanation": "a.sort() sắp xếp trực tiếp trên danh sách a (in-place), làm thay đổi thứ tự các phần tử trong chính a.",
    "choiceFeedback": [
     "Đúng — sort() thay đổi trực tiếp danh sách gốc theo thứ tự tăng dần mặc định.",
     "Sai — trả về danh sách mới và giữ nguyên danh sách gốc là đặc điểm của hàm sorted(a), không phải a.sort().",
     "Sai — đảo ngược thứ tự là chức năng của reverse(), không phải sort().",
     "Sai — sort() không có chức năng loại bỏ phần tử trùng lặp."
    ]
   },
   {
    "stem": "Cho hs = [7, 5, 9, 3]. Sau khi thực hiện lệnh hs.sort(), danh sách hs trở thành gì?",
    "choices": [
     "[3, 5, 7, 9]",
     "[9, 7, 5, 3]",
     "[7, 5, 9, 3]",
     "[3, 7, 5, 9]"
    ],
    "answer": 0,
    "explanation": "sort() mặc định sắp xếp tăng dần, nên [7, 5, 9, 3] trở thành [3, 5, 7, 9].",
    "choiceFeedback": [
     "Đúng — sắp xếp tăng dần các giá trị 7, 5, 9, 3 cho ra [3, 5, 7, 9].",
     "Sai — [9, 7, 5, 3] là thứ tự giảm dần, trong khi sort() mặc định sắp xếp tăng dần.",
     "Sai — danh sách phải thay đổi thứ tự sau khi gọi sort(), không thể giữ nguyên như ban đầu.",
     "Sai — thứ tự các phần tử trong kết quả chưa đúng, cần sắp xếp đầy đủ tăng dần từ nhỏ đến lớn."
    ]
   },
   {
    "stem": "Thuật toán tìm kiếm tuyến tính (Linear search) hoạt động bằng cách nào?",
    "choices": [
     "Duyệt lần lượt từng phần tử của dãy để so sánh với giá trị cần tìm",
     "Chia đôi dãy liên tục để tìm nhanh hơn",
     "Sắp xếp dãy trước rồi mới bắt đầu tìm kiếm",
     "Chỉ kiểm tra phần tử đầu và phần tử cuối dãy"
    ],
    "answer": 0,
    "explanation": "Linear search kiểm tra tuần tự từng phần tử từ đầu đến cuối dãy cho đến khi tìm thấy hoặc duyệt hết dãy.",
    "choiceFeedback": [
     "Đúng — đây là cách hoạt động cơ bản của tìm kiếm tuyến tính.",
     "Sai — chia đôi dãy để tìm nhanh hơn là ý tưởng của tìm kiếm nhị phân (Binary search), không phải linear search.",
     "Sai — linear search không yêu cầu dãy phải được sắp xếp trước.",
     "Sai — linear search kiểm tra tất cả các phần tử liên tiếp, không chỉ hai đầu dãy."
    ]
   },
   {
    "stem": "Trong trường hợp xấu nhất, độ phức tạp của thuật toán linear search với dãy n phần tử là bao nhiêu?",
    "choices": [
     "O(n)",
     "O(log n)",
     "O(1)",
     "O(n²)"
    ],
    "answer": 0,
    "explanation": "Trường hợp xấu nhất (giá trị cần tìm ở cuối dãy hoặc không tồn tại), linear search phải kiểm tra cả n phần tử, độ phức tạp O(n).",
    "choiceFeedback": [
     "Đúng — cần duyệt tối đa n phần tử trong trường hợp xấu nhất nên độ phức tạp là O(n).",
     "Sai — O(log n) là độ phức tạp của tìm kiếm nhị phân, nhanh hơn linear search rất nhiều.",
     "Sai — O(1) nghĩa là luôn tìm ra ngay lập tức, không đúng với trường hợp xấu nhất của linear search.",
     "Sai — O(n²) là độ phức tạp bậc hai, cao hơn linear search vốn chỉ cần duyệt một lượt qua dãy."
    ]
   },
   {
    "stem": "Thuật toán tìm kiếm nhị phân (Binary search) yêu cầu điều kiện gì ở dãy đầu vào?",
    "choices": [
     "Dãy phải đã được sắp xếp (thường là tăng dần)",
     "Dãy phải có số lượng phần tử là số chẵn",
     "Dãy phải chỉ chứa toàn số nguyên dương",
     "Dãy không được có phần tử trùng nhau"
    ],
    "answer": 0,
    "explanation": "Binary search chỉ hoạt động đúng khi dãy đã được sắp xếp, vì thuật toán dựa vào việc so sánh với phần tử giữa để loại bỏ một nửa dãy.",
    "choiceFeedback": [
     "Đúng — điều kiện bắt buộc của binary search là dãy phải được sắp xếp trước.",
     "Sai — số lượng phần tử chẵn hay lẻ không phải là điều kiện bắt buộc của binary search.",
     "Sai — binary search vẫn hoạt động với số âm, số 0 hoặc số thực, không giới hạn chỉ số nguyên dương.",
     "Sai — dãy vẫn có thể chứa các phần tử trùng nhau, điều đó không ảnh hưởng đến điều kiện áp dụng binary search."
    ]
   },
   {
    "stem": "Ý tưởng chính của thuật toán tìm kiếm nhị phân (Binary search) là gì?",
    "choices": [
     "So sánh với phần tử ở giữa dãy rồi thu hẹp phạm vi tìm kiếm còn một nửa",
     "Duyệt tuần tự từng phần tử từ đầu đến cuối dãy",
     "Tìm kiếm tại một vị trí ngẫu nhiên trong dãy",
     "Sắp xếp lại dãy mỗi lần thực hiện tìm kiếm"
    ],
    "answer": 0,
    "explanation": "Binary search so sánh giá trị cần tìm với phần tử giữa dãy, từ đó loại bỏ một nửa dãy không thể chứa kết quả, lặp lại cho đến khi tìm thấy.",
    "choiceFeedback": [
     "Đúng — mỗi lần so sánh giúp thu hẹp phạm vi tìm kiếm còn một nửa, nên rất nhanh với dãy lớn.",
     "Sai — duyệt tuần tự từng phần tử là ý tưởng của linear search, không phải binary search.",
     "Sai — binary search chọn vị trí giữa dãy một cách có tính toán, không phải ngẫu nhiên.",
     "Sai — binary search không cần sắp xếp lại dãy trong quá trình tìm kiếm, chỉ cần dãy đã sắp xếp từ trước."
    ]
   },
   {
    "stem": "Với một dãy đã sắp xếp có khoảng 1 triệu phần tử (2²⁰ ≈ 1.048.576), thuật toán binary search cần tối đa khoảng bao nhiêu lần so sánh để tìm ra một giá trị?",
    "choices": [
     "Khoảng 20 lần",
     "Khoảng 1 triệu lần",
     "Khoảng 1000 lần",
     "Khoảng 2 lần"
    ],
    "answer": 0,
    "explanation": "Số lần so sánh tối đa của binary search xấp xỉ log₂n; với n ≈ 2²⁰ thì log₂n ≈ 20 lần.",
    "choiceFeedback": [
     "Đúng — vì 2²⁰ ≈ 1 triệu, số lần so sánh tối đa cần thiết là khoảng 20 (log₂ của 1 triệu).",
     "Sai — 1 triệu lần so sánh là độ phức tạp của cách duyệt tuần tự (linear search) trong trường hợp xấu nhất, không phải binary search.",
     "Sai — 1000 lần là quá nhiều so với số lần so sánh cần thiết thực tế của binary search với dãy này.",
     "Sai — chỉ 2 lần là quá ít, không đủ để thu hẹp phạm vi tìm kiếm trong dãy lớn 1 triệu phần tử."
    ]
   },
   {
    "stem": "Để tạo một xâu (chuỗi) ký tự trong Python, nội dung của xâu cần được đặt trong cặp dấu nào?",
    "choices": [
     "Dấu nháy đơn ' ' hoặc dấu nháy kép \" \"",
     "Dấu ngoặc vuông [ ]",
     "Dấu ngoặc nhọn { }",
     "Dấu ngoặc tròn ( )"
    ],
    "answer": 0,
    "explanation": "Xâu ký tự trong Python được đặt trong cặp dấu nháy đơn hoặc nháy kép, ví dụ 'Python' hoặc \"Python\".",
    "choiceFeedback": [
     "Đúng — dấu nháy đơn hoặc nháy kép đều dùng để tạo xâu ký tự trong Python.",
     "Sai — dấu ngoặc vuông dùng để tạo danh sách (list), không dùng để tạo xâu ký tự.",
     "Sai — dấu ngoặc nhọn dùng để tạo dictionary hoặc set, không dùng để tạo xâu ký tự.",
     "Sai — dấu ngoặc tròn dùng để tạo tuple hoặc gọi hàm, không dùng để tạo xâu ký tự."
    ]
   },
   {
    "stem": "Cho s = \"Tin hoc\". Biểu thức len(s) trả về giá trị nào?",
    "choices": [
     "7",
     "6",
     "8",
     "1"
    ],
    "answer": 0,
    "explanation": "Xâu \"Tin hoc\" gồm 7 ký tự: T-i-n-(dấu cách)-h-o-c, nên len(s) = 7.",
    "choiceFeedback": [
     "Đúng — đếm đủ cả dấu cách, xâu \"Tin hoc\" có đúng 7 ký tự.",
     "Sai — 6 là thiếu một ký tự, hãy đếm lại kể cả dấu cách ở giữa hai từ.",
     "Sai — 8 là thừa một ký tự so với độ dài thực tế của xâu này.",
     "Sai — 1 quá ít, len() trả về tổng số ký tự trong toàn bộ xâu chứ không phải số từ."
    ]
   },
   {
    "stem": "Để tách một xâu thành danh sách các từ dựa theo dấu cách, ta dùng phương thức nào?",
    "choices": [
     "s.split()",
     "s.join()",
     "s.find()",
     "s.replace()"
    ],
    "answer": 0,
    "explanation": "Phương thức split() mặc định tách xâu thành danh sách các từ dựa trên khoảng trắng.",
    "choiceFeedback": [
     "Đúng — split() tách xâu thành danh sách các từ theo dấu cách mặc định.",
     "Sai — join() dùng để ghép các phần tử của một danh sách thành một xâu, ngược với split().",
     "Sai — find() dùng để tìm vị trí xuất hiện của một xâu con, không dùng để tách xâu.",
     "Sai — replace() dùng để thay thế một phần của xâu bằng nội dung khác, không dùng để tách xâu."
    ]
   },
   {
    "stem": "Cho s = \"Tin hoc\". Biểu thức s.find(\"hoc\") trả về giá trị nào (vị trí tính từ 0)?",
    "choices": [
     "4",
     "3",
     "0",
     "-1"
    ],
    "answer": 0,
    "explanation": "Trong xâu \"Tin hoc\", các ký tự có chỉ số: T(0) i(1) n(2) (khoảng trắng)(3) h(4) o(5) c(6); xâu con \"hoc\" bắt đầu từ vị trí 4.",
    "choiceFeedback": [
     "Đúng — đếm chỉ số từ 0, chữ 'h' của \"hoc\" nằm ở vị trí thứ 4 trong xâu.",
     "Sai — vị trí 3 là dấu cách giữa hai từ, chưa phải nơi bắt đầu xâu con \"hoc\".",
     "Sai — 0 là vị trí bắt đầu của xâu \"Tin hoc\", không phải vị trí xuất hiện của \"hoc\".",
     "Sai — -1 chỉ được trả về khi không tìm thấy xâu con, nhưng \"hoc\" thực sự có xuất hiện trong s."
    ]
   },
   {
    "stem": "Cho dict diem = {\"Toan\": 8, \"Van\": 7}. Để thêm cặp khoá-giá trị mới \"Anh\": 9 vào dictionary này, câu lệnh nào đúng?",
    "choices": [
     "diem[\"Anh\"] = 9",
     "diem.append(\"Anh\", 9)",
     "diem.add(\"Anh\": 9)",
     "diem + \"Anh\" = 9"
    ],
    "answer": 0,
    "explanation": "Để thêm hoặc cập nhật một cặp khoá-giá trị trong dictionary, dùng cú pháp ten_dict[khoa] = gia_tri.",
    "choiceFeedback": [
     "Đúng — diem[\"Anh\"] = 9 thêm khoá \"Anh\" với giá trị 9 vào dictionary diem.",
     "Sai — dictionary không có phương thức append(); append() chỉ dùng cho danh sách (list).",
     "Sai — cú pháp diem.add(\"Anh\": 9) không hợp lệ trong Python, dictionary không có phương thức add() dùng dấu hai chấm như vậy.",
     "Sai — không thể dùng phép cộng (+) trực tiếp giữa dictionary và xâu ký tự để thêm phần tử."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S8TIN-exam-ck2": {
  "id": "S8TIN-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Tin học 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "tin-hoc",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Tin học 8",
  "questions": [
   {
    "stem": "Thuật toán nào sau đây phù hợp để tìm kiếm nhanh trong một dãy đã được sắp xếp?",
    "choices": [
     "Tìm kiếm nhị phân (Binary search)",
     "Tìm kiếm tuyến tính (Linear search)",
     "Sắp xếp chọn (Selection sort)",
     "Sắp xếp chèn (Insertion sort)"
    ],
    "answer": 0,
    "explanation": "Binary search tận dụng tính chất dãy đã sắp xếp để loại bỏ một nửa dãy sau mỗi lần so sánh, nên tìm kiếm rất nhanh với O(log n).",
    "choiceFeedback": [
     "Đúng — binary search khai thác dãy đã sắp xếp để tìm kiếm với tốc độ O(log n), nhanh hơn nhiều so với duyệt tuần tự.",
     "Sai — linear search vẫn hoạt động đúng nhưng không tận dụng được lợi thế dãy đã sắp xếp để tăng tốc.",
     "Sai — selection sort là thuật toán sắp xếp, không phải thuật toán tìm kiếm.",
     "Sai — insertion sort là thuật toán sắp xếp, không phải thuật toán tìm kiếm."
    ]
   },
   {
    "stem": "Trong Python, hàm sorted(a) khác với phương thức a.sort() ở điểm nào?",
    "choices": [
     "sorted(a) trả về danh sách mới đã sắp xếp và giữ nguyên a; còn a.sort() sắp xếp trực tiếp trên a",
     "sorted(a) chỉ dùng được với số, còn a.sort() dùng được với mọi kiểu dữ liệu",
     "sorted(a) sắp xếp giảm dần, còn a.sort() sắp xếp tăng dần",
     "Hai cách này hoàn toàn giống nhau về mọi mặt"
    ],
    "answer": 0,
    "explanation": "sorted(a) là hàm trả về một danh sách mới đã sắp xếp mà không thay đổi a; a.sort() là phương thức sắp xếp trực tiếp (in-place) trên chính danh sách a.",
    "choiceFeedback": [
     "Đúng — đây là điểm khác biệt cốt lõi giữa hàm sorted() và phương thức sort().",
     "Sai — cả hai đều có thể sắp xếp danh sách chứa số hoặc xâu ký tự, không giới hạn chỉ dùng cho số.",
     "Sai — cả hai đều mặc định sắp xếp tăng dần trừ khi truyền thêm tham số reverse=True.",
     "Sai — hai cách này khác nhau rõ rệt về việc có tạo danh sách mới hay không."
    ]
   },
   {
    "stem": "Cho s = \"Hoc Tin Hoc\". Biểu thức s.upper() trả về kết quả gì?",
    "choices": [
     "\"HOC TIN HOC\"",
     "\"hoc tin hoc\"",
     "\"Hoc Tin Hoc\"",
     "\"HocTinHoc\""
    ],
    "answer": 0,
    "explanation": "Phương thức upper() chuyển toàn bộ chữ cái trong xâu thành chữ in hoa.",
    "choiceFeedback": [
     "Đúng — upper() chuyển tất cả các chữ cái trong xâu thành chữ hoa.",
     "Sai — \"hoc tin hoc\" là kết quả của phương thức lower(), ngược lại với upper().",
     "Sai — kết quả phải thay đổi hoàn toàn thành chữ hoa, không giữ nguyên như xâu gốc.",
     "Sai — upper() không xoá dấu cách giữa các từ, kết quả vẫn giữ nguyên khoảng trắng."
    ]
   },
   {
    "stem": "Trong dictionary Python, để duyệt qua tất cả các khoá (key), ta thường dùng cấu trúc nào?",
    "choices": [
     "for khoa in dict_ten:",
     "while khoa in dict_ten:",
     "if khoa in dict_ten:",
     "print(dict_ten.value())"
    ],
    "answer": 0,
    "explanation": "Vòng lặp for khoa in dict_ten: duyệt qua lần lượt từng khoá có trong dictionary.",
    "choiceFeedback": [
     "Đúng — for khoa in dict_ten: lần lượt gán khoa bằng từng khoá trong dictionary để duyệt.",
     "Sai — while khoa in dict_ten: chỉ kiểm tra một khoá có tồn tại hay không, không dùng để duyệt qua tất cả các khoá.",
     "Sai — if khoa in dict_ten: chỉ kiểm tra sự tồn tại của một khoá cụ thể, không phải cấu trúc lặp qua toàn bộ.",
     "Sai — dictionary không có phương thức value(), và cú pháp này không duyệt qua các khoá."
    ]
   },
   {
    "stem": "Cho a = [5, 2, 8, 1]. Sau khi thực hiện a.sort(reverse=True), danh sách a trở thành gì?",
    "choices": [
     "[8, 5, 2, 1]",
     "[1, 2, 5, 8]",
     "[5, 2, 8, 1]",
     "[1, 8, 2, 5]"
    ],
    "answer": 0,
    "explanation": "Tham số reverse=True làm cho sort() sắp xếp theo thứ tự giảm dần, nên [5,2,8,1] trở thành [8,5,2,1].",
    "choiceFeedback": [
     "Đúng — reverse=True khiến sort() sắp xếp giảm dần: 8, 5, 2, 1.",
     "Sai — [1, 2, 5, 8] là kết quả sắp xếp tăng dần, nhưng reverse=True yêu cầu sắp xếp giảm dần.",
     "Sai — danh sách phải thay đổi thứ tự sau khi gọi sort(reverse=True), không thể giữ nguyên như ban đầu.",
     "Sai — thứ tự các phần tử trong kết quả này chưa đúng quy tắc giảm dần hoàn toàn."
    ]
   },
   {
    "stem": "Ứng dụng thực tế nào sau đây thể hiện rõ nhất việc sử dụng cấu trúc dictionary?",
    "choices": [
     "Danh bạ điện thoại: tra tên để lấy số điện thoại tương ứng",
     "Một danh sách các số nguyên liên tiếp từ 1 đến 100",
     "Một xâu ký tự đơn lẻ chứa một câu văn",
     "Một vòng lặp đếm số lần lặp từ 1 đến 10"
    ],
    "answer": 0,
    "explanation": "Dictionary lưu trữ dữ liệu theo cặp khoá-giá trị; danh bạ điện thoại (tên → số điện thoại) là ví dụ điển hình và trực quan cho cấu trúc này.",
    "choiceFeedback": [
     "Đúng — danh bạ điện thoại ánh xạ mỗi tên (khoá) tới một số điện thoại (giá trị), rất phù hợp với dictionary.",
     "Sai — dãy số nguyên liên tiếp phù hợp biểu diễn bằng danh sách (list) hoặc range, không cần cặp khoá-giá trị.",
     "Sai — một câu văn đơn lẻ chỉ là kiểu xâu ký tự (str), không thể hiện cấu trúc khoá-giá trị của dictionary.",
     "Sai — đây chỉ là một vòng lặp đơn giản, không liên quan đến việc lưu trữ theo khoá-giá trị."
    ]
   },
   {
    "stem": "Một mật khẩu được coi là mật khẩu mạnh khi có đặc điểm nào sau đây?",
    "choices": [
     "Đủ dài, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt, không liên quan thông tin cá nhân",
     "Chỉ gồm toàn chữ cái thường cho dễ nhớ",
     "Là ngày sinh của bản thân để dễ nhớ lại",
     "Ngắn gọn, chỉ khoảng 3-4 ký tự cho nhanh gõ"
    ],
    "answer": 0,
    "explanation": "Mật khẩu mạnh cần đủ độ dài, kết hợp nhiều loại ký tự và không liên quan trực tiếp đến thông tin cá nhân dễ đoán.",
    "choiceFeedback": [
     "Đúng — sự kết hợp đa dạng ký tự cùng độ dài đủ lớn giúp mật khẩu khó bị đoán hoặc dò tìm.",
     "Sai — chỉ dùng chữ thường khiến mật khẩu dễ bị dò ra hơn nhiều so với kết hợp đa dạng ký tự.",
     "Sai — ngày sinh là thông tin cá nhân dễ đoán, khiến mật khẩu trở nên yếu chứ không mạnh.",
     "Sai — mật khẩu quá ngắn rất dễ bị dò ra bằng các công cụ thử mật khẩu tự động."
    ]
   },
   {
    "stem": "Xác thực hai yếu tố (2FA) giúp tăng cường bảo mật tài khoản bằng cách nào?",
    "choices": [
     "Yêu cầu thêm một bước xác minh (ví dụ mã OTP) ngoài mật khẩu khi đăng nhập",
     "Cho phép đăng nhập mà không cần mật khẩu",
     "Tự động đổi mật khẩu mới mỗi ngày",
     "Cho phép chia sẻ mật khẩu cho nhiều thiết bị cùng lúc"
    ],
    "answer": 0,
    "explanation": "2FA thêm một lớp xác minh thứ hai (như mã OTP gửi qua điện thoại/email) bên cạnh mật khẩu, khiến kẻ gian khó chiếm đoạt tài khoản hơn dù biết mật khẩu.",
    "choiceFeedback": [
     "Đúng — lớp xác minh thứ hai giúp bảo vệ tài khoản ngay cả khi mật khẩu bị lộ.",
     "Sai — 2FA vẫn cần mật khẩu ở bước đầu tiên, không phải bỏ qua hoàn toàn mật khẩu.",
     "Sai — 2FA không có chức năng tự động đổi mật khẩu định kỳ.",
     "Sai — chia sẻ mật khẩu cho nhiều người/thiết bị làm giảm bảo mật chứ không phải là mục đích của 2FA."
    ]
   },
   {
    "stem": "Phishing (lừa đảo trực tuyến) là hình thức lừa đảo như thế nào?",
    "choices": [
     "Giả mạo tổ chức/cá nhân uy tín (qua email, tin nhắn, website giả) để đánh cắp thông tin cá nhân",
     "Một loại virus máy tính tự lây lan qua mạng",
     "Một phương pháp mã hoá dữ liệu an toàn",
     "Một phần mềm diệt virus miễn phí"
    ],
    "answer": 0,
    "explanation": "Phishing lợi dụng lòng tin bằng cách giả mạo các tổ chức/cá nhân đáng tin cậy để lừa người dùng cung cấp thông tin nhạy cảm như mật khẩu, số thẻ ngân hàng.",
    "choiceFeedback": [
     "Đúng — phishing đánh lừa nạn nhân qua vỏ bọc giả mạo để chiếm đoạt thông tin cá nhân.",
     "Sai — virus máy tính là phần mềm độc hại tự lây lan, khác với hình thức lừa đảo giả mạo của phishing.",
     "Sai — phishing là hành vi lừa đảo, không phải một phương pháp bảo mật dữ liệu.",
     "Sai — phishing là mối đe doạ cần phòng tránh, không phải một phần mềm bảo vệ."
    ]
   },
   {
    "stem": "Khi nhận được một email nghi ngờ là phishing (yêu cầu cung cấp mật khẩu, có đường link lạ), em nên làm gì?",
    "choices": [
     "Không nhấp vào đường link, không cung cấp thông tin và báo cáo hoặc xoá email",
     "Nhấp vào đường link để kiểm tra xem nó có đúng không",
     "Trả lời email và cung cấp thông tin được yêu cầu",
     "Chuyển tiếp email cho bạn bè để cùng nhấp vào xem thử"
    ],
    "answer": 0,
    "explanation": "Cách an toàn nhất là không tương tác với nội dung nghi ngờ (không nhấp link, không cung cấp thông tin) và báo cáo/xoá email đó.",
    "choiceFeedback": [
     "Đúng — tránh tương tác và báo cáo/xoá là cách xử lý an toàn với email nghi ngờ phishing.",
     "Sai — nhấp vào đường link lạ có thể khiến thiết bị bị nhiễm mã độc hoặc lộ thông tin cá nhân.",
     "Sai — cung cấp thông tin theo yêu cầu trong email lừa đảo chính là mục tiêu kẻ gian muốn đạt được.",
     "Sai — chuyển tiếp và khuyến khích người khác nhấp vào có thể khiến nhiều người cùng gặp rủi ro hơn."
    ]
   },
   {
    "stem": "Ransomware là loại phần mềm độc hại có đặc điểm gì?",
    "choices": [
     "Mã hoá dữ liệu của nạn nhân và đòi tiền chuộc để mở khoá",
     "Chỉ hiển thị quảng cáo gây phiền toái cho người dùng",
     "Giúp tăng tốc độ hoạt động của máy tính",
     "Là một phần mềm diệt virus miễn phí"
    ],
    "answer": 0,
    "explanation": "Ransomware mã hoá toàn bộ hoặc một phần dữ liệu trên thiết bị nạn nhân, sau đó yêu cầu trả tiền chuộc để được cung cấp khoá giải mã.",
    "choiceFeedback": [
     "Đúng — đây chính là đặc điểm nguy hiểm và điển hình của ransomware.",
     "Sai — hiển thị quảng cáo gây phiền toái là đặc điểm của adware, khác với ransomware.",
     "Sai — ransomware gây hại cho hệ thống, hoàn toàn không có tác dụng tăng tốc máy tính.",
     "Sai — ransomware là phần mềm độc hại cần phòng tránh, không phải phần mềm diệt virus."
    ]
   },
   {
    "stem": "Biện pháp nào sau đây giúp phòng tránh phần mềm độc hại (malware) hiệu quả?",
    "choices": [
     "Cài phần mềm diệt virus, cập nhật hệ điều hành thường xuyên, không tải file từ nguồn không rõ",
     "Tắt tường lửa (firewall) để máy chạy nhanh hơn",
     "Tải phần mềm bẻ khoá (crack) từ các trang web không rõ nguồn gốc",
     "Mở mọi tệp đính kèm trong email dù không rõ người gửi"
    ],
    "answer": 0,
    "explanation": "Kết hợp phần mềm diệt virus, cập nhật hệ thống và thận trọng khi tải file là những biện pháp phòng tránh malware cơ bản và hiệu quả.",
    "choiceFeedback": [
     "Đúng — đây là các biện pháp phòng tránh malware được khuyến nghị phổ biến.",
     "Sai — tắt tường lửa làm giảm lớp bảo vệ của máy tính, khiến nguy cơ bị tấn công tăng lên.",
     "Sai — phần mềm crack từ nguồn không rõ ràng là một trong những con đường phổ biến để malware xâm nhập.",
     "Sai — mở tệp đính kèm từ người gửi lạ mà không kiểm tra là hành vi rủi ro cao, dễ khiến máy nhiễm malware."
    ]
   },
   {
    "stem": "Khi muốn sử dụng một bức ảnh tìm thấy trên mạng cho bài thuyết trình của mình, cách làm nào đúng đắn về quyền tác giả?",
    "choices": [
     "Kiểm tra giấy phép sử dụng và ghi rõ nguồn/tác giả của bức ảnh",
     "Sử dụng thoải mái mà không cần quan tâm đến nguồn gốc",
     "Chỉnh sửa lại ảnh để không ai nhận ra ảnh gốc",
     "Chỉ cần thấy ảnh đẹp là có thể sử dụng ngay"
    ],
    "answer": 0,
    "explanation": "Tôn trọng quyền tác giả đòi hỏi kiểm tra giấy phép sử dụng (có được phép dùng miễn phí, dùng thương mại hay không) và ghi rõ nguồn gốc/tác giả khi sử dụng.",
    "choiceFeedback": [
     "Đúng — kiểm tra giấy phép và ghi nguồn là cách thể hiện tôn trọng quyền tác giả.",
     "Sai — sử dụng tuỳ tiện mà không quan tâm nguồn gốc có thể vi phạm quyền tác giả của người tạo ra ảnh.",
     "Sai — chỉnh sửa để che giấu nguồn gốc không giải quyết được vấn đề vi phạm bản quyền, thậm chí còn thể hiện ý định lách luật.",
     "Sai — vẻ đẹp của ảnh không liên quan đến quyền được phép sử dụng nó hợp pháp."
    ]
   },
   {
    "stem": "Đạo văn (plagiarism) trong môi trường số được hiểu là gì?",
    "choices": [
     "Sao chép nội dung, ý tưởng của người khác và nhận là của mình mà không ghi nguồn",
     "Trích dẫn nguồn tài liệu đầy đủ, rõ ràng",
     "Tự viết bài dựa trên hiểu biết của bản thân",
     "Sử dụng phần mềm mã nguồn mở đúng theo giấy phép"
    ],
    "answer": 0,
    "explanation": "Đạo văn là hành vi lấy nội dung/ý tưởng của người khác mà không ghi nhận nguồn gốc, khiến người khác hiểu nhầm đó là sản phẩm của riêng mình.",
    "choiceFeedback": [
     "Đúng — đây chính là bản chất của hành vi đạo văn.",
     "Sai — trích dẫn đầy đủ nguồn tài liệu là cách làm đúng đắn, không phải đạo văn.",
     "Sai — tự viết bài dựa trên hiểu biết của bản thân là hành vi trung thực trong học tập, không phải đạo văn.",
     "Sai — sử dụng đúng giấy phép mã nguồn mở là hành vi hợp pháp, tôn trọng tác giả gốc."
    ]
   },
   {
    "stem": "Trước khi đăng một bài viết hoặc bình luận lên mạng xã hội, em nên làm gì?",
    "choices": [
     "Suy nghĩ kỹ về nội dung, kiểm tra thông tin và cân nhắc hậu quả có thể xảy ra",
     "Đăng ngay lập tức mà không cần suy nghĩ",
     "Đăng thông tin chưa kiểm chứng để thu hút sự chú ý",
     "Chỉ cần đăng cho nhanh, không cần quan tâm nội dung"
    ],
    "answer": 0,
    "explanation": "Ứng xử văn minh trên mạng xã hội đòi hỏi suy nghĩ kỹ, kiểm chứng thông tin và cân nhắc tác động trước khi đăng tải công khai.",
    "choiceFeedback": [
     "Đúng — cẩn trọng trước khi đăng giúp tránh những hậu quả tiêu cực không mong muốn.",
     "Sai — đăng bài vội vàng, thiếu suy nghĩ dễ dẫn đến những phát ngôn gây tranh cãi hoặc sai lệch.",
     "Sai — đăng thông tin chưa kiểm chứng có thể vô tình lan truyền tin giả, gây hậu quả xấu.",
     "Sai — nội dung đăng tải cần được quan tâm kỹ lưỡng vì nó có thể ảnh hưởng đến nhiều người khác."
    ]
   },
   {
    "stem": "Việc chia sẻ tin giả (fake news) trên mạng xã hội có thể dẫn đến hậu quả gì?",
    "choices": [
     "Gây hoang mang dư luận, ảnh hưởng uy tín cá nhân/tổ chức và có thể vi phạm pháp luật",
     "Không có hậu quả gì vì chỉ là chia sẻ lại thông tin",
     "Giúp lan truyền thông tin nhanh hơn nên luôn là điều tốt",
     "Chỉ ảnh hưởng đến người đã đăng bài viết gốc đầu tiên"
    ],
    "answer": 0,
    "explanation": "Chia sẻ tin giả có thể gây hoang mang xã hội, tổn hại uy tín người liên quan, và ở nhiều trường hợp còn vi phạm quy định pháp luật về thông tin trên mạng.",
    "choiceFeedback": [
     "Đúng — hậu quả của việc lan truyền tin giả có thể rất nghiêm trọng và ảnh hưởng đến nhiều bên.",
     "Sai — người chia sẻ lại tin giả vẫn phải chịu trách nhiệm về hành vi lan truyền thông tin sai lệch đó.",
     "Sai — lan truyền tin giả nhanh không phải là điều tốt, mà càng khiến hậu quả tiêu cực lan rộng hơn.",
     "Sai — hậu quả không chỉ dừng ở người đăng bài gốc mà còn ảnh hưởng đến những người chia sẻ lại và cả cộng đồng tiếp nhận thông tin."
    ]
   },
   {
    "stem": "Trí tuệ nhân tạo (AI) hiện nay có thể hỗ trợ con người trong công việc nào?",
    "choices": [
     "Nhận diện hình ảnh, dịch ngôn ngữ, trả lời câu hỏi, gợi ý nội dung phù hợp",
     "Chỉ dùng để chơi trò chơi điện tử",
     "Chỉ hoạt động khi thiết bị không có kết nối Internet",
     "Thay thế hoàn toàn mọi công việc của con người"
    ],
    "answer": 0,
    "explanation": "AI ngày nay được ứng dụng rộng rãi trong nhận diện hình ảnh, dịch thuật, trợ lý ảo trả lời câu hỏi, và gợi ý nội dung cá nhân hoá.",
    "choiceFeedback": [
     "Đúng — đây là những ứng dụng phổ biến và thiết thực của AI trong đời sống hiện nay.",
     "Sai — AI được ứng dụng trong rất nhiều lĩnh vực khác ngoài trò chơi điện tử, như y tế, giáo dục, giao thông.",
     "Sai — phần lớn các ứng dụng AI hiện nay cần kết nối Internet để truy cập dữ liệu và xử lý.",
     "Sai — AI hỗ trợ chứ chưa thể thay thế hoàn toàn con người, đặc biệt trong các công việc cần sáng tạo và cảm xúc."
    ]
   },
   {
    "stem": "Khi sử dụng công cụ AI để hỗ trợ làm bài tập, học sinh cần lưu ý điều gì?",
    "choices": [
     "Kiểm tra lại tính chính xác của thông tin và không sao chép nguyên văn để nhận là của mình",
     "Tin tưởng tuyệt đối mọi câu trả lời mà AI đưa ra",
     "Nộp bài do AI làm mà không cần đọc lại nội dung",
     "Không cần ghi chú gì vì AI không phải là tác giả của bài làm"
    ],
    "answer": 0,
    "explanation": "AI có thể đưa ra thông tin chưa chính xác, vì vậy học sinh cần kiểm chứng lại và không nên sao chép nguyên văn để nhận là sản phẩm của riêng mình, tránh vi phạm về học thuật.",
    "choiceFeedback": [
     "Đúng — kiểm chứng thông tin và sử dụng AI một cách trung thực, có trách nhiệm là điều cần thiết.",
     "Sai — AI vẫn có thể đưa ra thông tin sai hoặc không phù hợp, không nên tin tưởng tuyệt đối mà không kiểm chứng.",
     "Sai — nộp bài mà không đọc lại có thể khiến học sinh nộp phải nội dung sai hoặc không phù hợp với yêu cầu.",
     "Sai — dù AI không phải là 'tác giả' theo nghĩa thông thường nhưng học sinh vẫn cần trung thực về mức độ tự làm bài của mình."
    ]
   },
   {
    "stem": "Khi chương trình chạy ra kết quả sai so với mong đợi, bước quan trọng cần làm là gì?",
    "choices": [
     "Kiểm tra lại logic và dữ liệu đầu vào, dò lỗi (debug) từng bước để tìm nguyên nhân",
     "Xoá toàn bộ chương trình và không làm lại nữa",
     "Bỏ qua lỗi vì máy tính luôn luôn đúng",
     "Đổi tên biến trong chương trình rồi chạy lại mà không kiểm tra gì thêm"
    ],
    "answer": 0,
    "explanation": "Khi có lỗi, cần kiểm tra lại logic thuật toán và dữ liệu đầu vào, dò lỗi (debug) từng bước để xác định chính xác nguyên nhân gây sai kết quả.",
    "choiceFeedback": [
     "Đúng — debug từng bước là cách hiệu quả để tìm ra nguyên nhân gây lỗi trong chương trình.",
     "Sai — xoá bỏ hoàn toàn chương trình không giúp tìm ra và khắc phục được nguyên nhân gây lỗi.",
     "Sai — máy tính chỉ thực hiện đúng theo mã lệnh được viết; nếu logic của chương trình sai thì kết quả cũng sẽ sai.",
     "Sai — đổi tên biến mà không kiểm tra lại logic không giải quyết được nguyên nhân thực sự của lỗi."
    ]
   },
   {
    "stem": "Muốn tìm nhanh một học sinh có tên \"Lan\" trong danh sách 1000 học sinh đã được sắp xếp theo tên, nên áp dụng thuật toán nào để tối ưu thời gian tìm kiếm?",
    "choices": [
     "Tìm kiếm nhị phân (Binary search), vì danh sách đã được sắp xếp",
     "Tìm kiếm tuyến tính (Linear search), vì cách làm đơn giản hơn",
     "Sắp xếp chọn (Selection sort), vì đây cũng là một thao tác liên quan đến sắp xếp",
     "Không có thuật toán nào áp dụng được cho trường hợp này"
    ],
    "answer": 0,
    "explanation": "Vì danh sách đã được sắp xếp theo tên, binary search sẽ tìm kiếm hiệu quả hơn nhiều so với duyệt tuần tự, giảm đáng kể số lần so sánh cần thực hiện.",
    "choiceFeedback": [
     "Đúng — tận dụng dãy đã sắp xếp, binary search giúp tìm kiếm nhanh với độ phức tạp O(log n).",
     "Sai — linear search vẫn cho kết quả đúng nhưng chậm hơn nhiều so với binary search khi dãy đã được sắp xếp sẵn.",
     "Sai — selection sort là thuật toán sắp xếp, không phải thuật toán tìm kiếm, nên không dùng để tìm một học sinh cụ thể.",
     "Sai — hoàn toàn có thuật toán phù hợp cho bài toán này, cụ thể là tìm kiếm nhị phân vì dữ liệu đã được sắp xếp sẵn."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
