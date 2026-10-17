// ============================================================
// Lớp 8 · Tin học — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Python cơ bản · Tin học văn phòng · Thuật toán · An toàn thông tin · AI.
// Key TRÙNG id quiz: "S8TIN-wNN-quiz".
// Độ sâu chuẩn ngang Lớp 6: theory 8–12 block (xen kẽ {h}{p}{ul}{note}), examples ≥ 3/tuần.
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8TIN_LESSONS = {
  'S8TIN-w01-quiz': L(
    'Giới thiệu ngôn ngữ lập trình Python',
    'Các em ơi, từ lớp 8 chúng ta bước vào thế giới lập trình thật sự với Python — một ngôn ngữ dễ đọc, dễ học nhưng cực kỳ mạnh, được dùng từ làm web, phân tích dữ liệu đến trí tuệ nhân tạo.',
    ['Hiểu ngôn ngữ lập trình bậc cao và vai trò của Python.', 'Nhận biết môi trường chạy Python.', 'Viết và chạy được chương trình đầu tiên "Hello, World!".', 'Biết phân biệt mã nguồn và kết quả chạy.'],
    [
      { h: '1. Ngôn ngữ lập trình là gì?' },
      { p: 'Ngôn ngữ lập trình là phương tiện để con người viết ra các câu lệnh chỉ dẫn máy tính làm việc. Máy tính chỉ hiểu mã máy (0/1), nên ta dùng ngôn ngữ bậc cao gần với ngôn ngữ tự nhiên rồi để máy dịch lại.' },
      { ul: [
        'Ngôn ngữ bậc thấp: gần với phần cứng, khó đọc (hợp ngữ).',
        'Ngôn ngữ bậc cao: gần với con người, dễ đọc (Python, C, Java).',
        'Python thuộc nhóm bậc cao, là ngôn ngữ thông dịch (interpreted).',
      ] },
      { h: '2. Vì sao học Python?' },
      { ul: [
        'Cú pháp đơn giản, gần tiếng Anh, ít dấu ngoặc.',
        'Có sẵn nhiều thư viện cho toán học, đồ họa, dữ liệu, AI.',
        'Cộng đồng lớn, nhiều tài liệu, miễn phí và nguồn mở.',
        'Được dùng rộng rãi trong thực tế: Google, YouTube, NASA...',
      ] },
      { h: '3. Môi trường chạy Python' },
      { ul: [
        'IDLE: đi kèm khi cài Python từ python.org.',
        'VS Code, PyCharm: trình soạn thảo/IDE chuyên nghiệp.',
        'Google Colab, replit.com: chạy ngay trên trình duyệt, không cần cài.',
        'Chế độ tương tác (shell >>>) thử nhanh; chế độ tệp .py để lưu chương trình.',
      ] },
      { h: '4. Chương trình đầu tiên' },
      { p: 'Lệnh print() dùng để hiển thị thông tin ra màn hình. Câu lệnh print("Hello, World!") sẽ in dòng chữ Hello, World! — đây là chương trình truyền thống của người mới học lập trình.' },
      { h: '5. Mã nguồn và kết quả' },
      { p: 'Mã nguồn (source code) là những dòng lệnh em viết; kết quả là những gì hiện ra khi chạy. Trình thông dịch Python đọc từng dòng mã nguồn rồi thực hiện ngay.' },
      { note: 'Python phân biệt CHỮ HOA - chữ thường: "Print" khác "print". Viết sai một chữ hoa cũng gây lỗi NameError.' },
    ],
    [
      { q: 'Viết lệnh hiện dòng chữ "Em yêu Python" ra màn hình.', a: 'print("Em yêu Python") — chuỗi đặt trong dấu nháy kép, máy in đúng nội dung bên trong dấu nháy.' },
      { q: 'In ra 2 dòng "Dòng 1" và "Dòng 2".', a: 'Cách 1: print("Dòng 1"); print("Dòng 2") — hai lệnh print. Cách 2: print("Dòng 1\\nDòng 2") — dùng kí tự xuống dòng \\n trong cùng một chuỗi.' },
      { q: 'Vì sao chạy lệnh Print("Hi") lại báo lỗi?', a: 'Vì Python phân biệt hoa/thường — không có hàm tên "Print" (chữ P hoa), chỉ có "print" (chữ p thường). Máy báo NameError: name "Print" is not defined.' },
    ]
  ),

  'S8TIN-w02-quiz': L(
    'Biến và kiểu dữ liệu cơ bản',
    'Các em ơi, để chương trình "nhớ" được dữ liệu, ta cần đến biến — giống như những chiếc hộp có tên để cất giá trị. Mỗi hộp lại chứa một loại dữ liệu khác nhau.',
    ['Hiểu khái niệm biến và phép gán.', 'Phân biệt các kiểu int, float, str, bool.', 'Nắm quy tắc đặt tên biến hợp lệ.', 'Dùng hàm type() để kiểm tra kiểu dữ liệu.'],
    [
      { h: '1. Biến là gì?' },
      { p: 'Biến là tên đại diện cho một vùng nhớ lưu giá trị. Khi viết tuoi = 13, máy tạo một biến tên tuoi và gán cho nó giá trị 13. Dấu = gọi là phép gán (assignment).' },
      { ul: [
        'Phép gán đặt giá trị bên phải vào biến bên trái.',
        'Giá trị của biến có thể thay đổi: tuoi = 13 rồi tuoi = 14.',
        'Trong Python, kiểu của biến được xác định tự động theo giá trị gán.',
      ] },
      { h: '2. Các kiểu dữ liệu cơ bản' },
      { ul: [
        'int — số nguyên: 5, -3, 0, 100.',
        'float — số thực (có phần thập phân): 3.14, -0.5, 2.0.',
        'str — chuỗi kí tự (đặt trong nháy): "Hello", \'Nam\'.',
        'bool — logic: True hoặc False.',
      ] },
      { h: '3. Kiểm tra kiểu với type()' },
      { p: 'Hàm type(x) cho biết kiểu của giá trị x. Ví dụ type(5) → int, type(3.14) → float, type("Hi") → str, type(True) → bool.' },
      { h: '4. Quy tắc đặt tên biến' },
      { ul: [
        'Bắt đầu bằng chữ cái hoặc dấu gạch dưới _.',
        'Không có dấu cách, không bắt đầu bằng chữ số.',
        'Không trùng từ khoá của Python (if, for, while, print, True...).',
        'Phân biệt hoa/thường: Tuoi và tuoi là hai biến khác nhau.',
      ] },
      { h: '5. Đặt tên có ý nghĩa' },
      { p: 'Nên đặt tên biến gợi nội dung: dùng diem_toan thay vì d, ten_hs thay vì x. Tên rõ ràng giúp người đọc (và chính em) hiểu chương trình dễ hơn.' },
      { note: 'Trong Python KHÔNG cần khai báo kiểu trước như C/Java. Chỉ cần gán giá trị, máy tự hiểu kiểu — nhưng phải hiểu rõ kiểu để xử lí cho đúng.' },
    ],
    [
      { q: 'Khai báo một biến lưu tên của em.', a: 'ten = "Nam" — biến ten thuộc kiểu str (chuỗi), giá trị là "Nam".' },
      { q: 'Trong các tên sau, tên nào hợp lệ: "2hs", "_diem", "ho ten", "diem8"?', a: '_diem và diem8 hợp lệ. "2hs" sai vì bắt đầu bằng số. "ho ten" sai vì có dấu cách — nên viết ho_ten.' },
      { q: 'Kết quả của type(3.0) và type(3) khác nhau thế nào?', a: 'type(3.0) là float (số thực, vì có dấu chấm thập phân), còn type(3) là int (số nguyên). Cùng giá trị nhưng khác kiểu.' },
    ]
  ),

  'S8TIN-w03-quiz': L(
    'Toán tử số học và toán tử so sánh',
    'Các em ơi, máy tính sinh ra trước hết để tính toán. Tuần này cô trò mình học cách dùng các toán tử để cộng trừ nhân chia và so sánh các giá trị trong Python.',
    ['Sử dụng toán tử số học + - * / // % **.', 'Hiểu toán tử so sánh và kết quả bool.', 'Nắm thứ tự ưu tiên các phép tính.', 'Vận dụng tính toán bài toán thực tế.'],
    [
      { h: '1. Toán tử số học' },
      { ul: [
        '+ cộng, - trừ, * nhân, / chia (kết quả luôn là float: 6/2 = 3.0).',
        '// chia lấy phần nguyên: 7 // 2 = 3.',
        '% chia lấy phần dư (modulo): 7 % 2 = 1.',
        '** luỹ thừa: 2 ** 3 = 8.',
      ] },
      { h: '2. Ứng dụng của // và %' },
      { ul: [
        '% giúp kiểm tra chia hết: n % 2 == 0 → n chẵn.',
        '% lấy chữ số cuối: 123 % 10 = 3.',
        '// bỏ chữ số cuối: 123 // 10 = 12.',
        'Kết hợp // và % để tách từng chữ số của một số.',
      ] },
      { h: '3. Toán tử so sánh' },
      { ul: [
        '== bằng, != khác.',
        '< nhỏ hơn, > lớn hơn.',
        '<= nhỏ hơn hoặc bằng, >= lớn hơn hoặc bằng.',
        'Kết quả của phép so sánh luôn là True hoặc False (kiểu bool).',
      ] },
      { h: '4. Phân biệt = và ==' },
      { p: 'Dấu = là phép GÁN (đặt giá trị vào biến). Dấu == là phép SO SÁNH (kiểm tra hai bên có bằng nhau không). Nhầm hai dấu này là lỗi rất phổ biến của người mới học.' },
      { h: '5. Thứ tự ưu tiên' },
      { p: 'Python tính theo thứ tự: ** trước, rồi đến *, /, //, %, sau cùng là +, -. Phép trong dấu ngoặc () được ưu tiên cao nhất — nên dùng ngoặc để biểu thức rõ ràng.' },
      { note: 'Khi chia cho 0 (vd 5/0), Python báo lỗi ZeroDivisionError. Luôn kiểm tra mẫu số khác 0 trước khi chia.' },
    ],
    [
      { q: 'Kết quả của 17 // 5 và 17 % 5 là gì?', a: '17 // 5 = 3 (thương nguyên), 17 % 5 = 2 (số dư). Vì 17 = 5 × 3 + 2.' },
      { q: 'Tính 2 ** 10.', a: '2 ** 10 = 1024, tức 2 nhân với chính nó 10 lần.' },
      { q: 'Cho số ngày = 100, tính số tuần và số ngày lẻ.', a: 'tuan = 100 // 7 → 14 (tuần đầy đủ); le = 100 % 7 → 2 (ngày lẻ). Vậy 100 ngày = 14 tuần và 2 ngày.' },
    ]
  ),

  'S8TIN-w04-quiz': L(
    'Nhập dữ liệu từ bàn phím và xuất ra màn hình',
    'Các em ơi, một chương trình hữu ích phải biết "nói chuyện" với người dùng: nhận dữ liệu vào và trả kết quả ra. Đó là vai trò của input() và print().',
    ['Dùng input() để đọc dữ liệu người dùng nhập.', 'Ép kiểu dữ liệu với int() và float().', 'Định dạng kết quả bằng f-string.', 'Hiểu input() luôn trả về chuỗi.'],
    [
      { h: '1. Hàm input()' },
      { p: 'input() dừng chương trình lại chờ người dùng gõ và nhấn Enter, rồi trả về những gì đã gõ. Ví dụ: a = input("Nhập số: ") — biến a nhận giá trị người dùng nhập.' },
      { note: 'Quan trọng: input() LUÔN trả về kiểu str (chuỗi), kể cả khi người dùng gõ số. Muốn tính toán phải ép kiểu.' },
      { h: '2. Ép kiểu dữ liệu' },
      { ul: [
        'int(input()) — đọc và chuyển thành số nguyên.',
        'float(input()) — đọc và chuyển thành số thực.',
        'str(x) — chuyển số thành chuỗi (để ghép với chuỗi khác).',
      ] },
      { h: '3. Hàm print() nâng cao' },
      { ul: [
        'print(a, b, c) — in nhiều giá trị, ngăn cách bằng dấu cách.',
        'print("A", "B", sep="-") — đổi dấu ngăn cách thành "-".',
        'print("...", end="") — không xuống dòng sau khi in.',
      ] },
      { h: '4. f-string — chèn biến vào chuỗi' },
      { p: 'f-string là cách hiện đại để ghép biến vào chuỗi: đặt chữ f trước dấu nháy, rồi để biến trong {}. Ví dụ: print(f"Tuổi của {ten} là {tuoi}").' },
      { h: '5. Lỗi thường gặp khi nhập số' },
      { p: 'Nếu quên ép kiểu, "5" + "3" cho ra "53" (ghép chuỗi) chứ không phải 8. Ngược lại, nếu người dùng gõ chữ mà chương trình int() thì báo ValueError.' },
      { note: 'Quy trình chuẩn của một chương trình nhỏ: NHẬP (input) → XỬ LÍ (tính toán) → XUẤT (print).' },
    ],
    [
      { q: 'Viết chương trình đọc 2 số nguyên rồi in tổng.', a: 'a = int(input("Số thứ nhất: "))\\nb = int(input("Số thứ hai: "))\\nprint(f"Tổng = {a + b}") — nhớ ép int() để cộng số chứ không ghép chuỗi.' },
      { q: 'Vì sao "5" + "3" lại cho kết quả "53"?', a: 'Vì input() trả về chuỗi. Với chuỗi, dấu + là phép NỐI (ghép), nên "5" nối "3" thành "53". Muốn cộng số phải ép int("5") + int("3") = 8.' },
      { q: 'Đọc tên và lớp của học sinh, in ra "Bạn Nam học lớp 8A".', a: 'ten = input("Tên: ")\\nlop = input("Lớp: ")\\nprint(f"Bạn {ten} học lớp {lop}") — f-string chèn hai biến vào câu.' },
    ]
  ),

  'S8TIN-w05-quiz': L(
    'Câu lệnh điều kiện if',
    'Các em ơi, đến lúc chương trình của ta biết "suy nghĩ". Với câu lệnh if, máy tính có thể quyết định làm việc này hay việc kia tùy theo điều kiện đúng hay sai.',
    ['Nắm cú pháp câu lệnh if.', 'Hiểu vai trò của thụt lề (indentation).', 'Viết điều kiện bằng toán tử so sánh.', 'Vận dụng if vào bài toán đơn giản.'],
    [
      { h: '1. Câu lệnh rẽ nhánh' },
      { p: 'Bình thường chương trình chạy tuần tự từ trên xuống. Câu lệnh if cho phép RẼ NHÁNH: chỉ thực hiện một khối lệnh khi điều kiện đúng (True).' },
      { h: '2. Cú pháp if' },
      { p: 'Cấu trúc: if điều_kiện: rồi xuống dòng, thụt lề khối lệnh. Ví dụ: if diem >= 5: (xuống dòng, thụt lề) print("Đậu").' },
      { h: '3. Điều kiện là gì?' },
      { ul: [
        'Điều kiện là một biểu thức cho kết quả True hoặc False.',
        'Thường dùng toán tử so sánh: n > 0, diem >= 5, x == 10.',
        'Khi điều kiện True → khối lệnh chạy; False → bỏ qua.',
      ] },
      { h: '4. Thụt lề (Indentation)' },
      { p: 'Python dùng thụt lề (thường 4 dấu cách) để xác định những lệnh nào thuộc khối if. Đây là điểm KHÁC BIỆT lớn so với nhiều ngôn ngữ khác — sai thụt lề là sai chương trình.' },
      { ul: [
        'Mọi lệnh thụt vào sau dấu : đều thuộc khối if.',
        'Lệnh không thụt vào sẽ chạy bất kể điều kiện đúng hay sai.',
        'Trộn dấu cách và Tab gây lỗi IndentationError / TabError.',
      ] },
      { h: '5. Biểu thức logic trong điều kiện' },
      { p: 'Có thể nối nhiều điều kiện: and (và — cả hai đúng), or (hoặc — một trong hai đúng), not (phủ định). Ví dụ: if diem >= 5 and diem <= 10:.' },
      { note: 'Quên dấu hai chấm ":" sau if là lỗi cú pháp (SyntaxError) phổ biến nhất ở người mới học.' },
    ],
    [
      { q: 'Viết câu lệnh if kiểm tra một số n có phải số chẵn không.', a: 'if n % 2 == 0:\\n    print("Chẵn") — số chẵn là số chia hết cho 2, tức số dư bằng 0.' },
      { q: 'Đoạn sau sai ở đâu: if n > 0:\\nprint(n)', a: 'Sai vì thiếu thụt lề ở dòng print(n). Phải viết: if n > 0:\\n    print(n) — lệnh print thụt vào 4 dấu cách để thuộc khối if.' },
      { q: 'Viết if kiểm tra điểm d nằm trong khoảng từ 0 đến 10.', a: 'if d >= 0 and d <= 10:\\n    print("Điểm hợp lệ") — dùng and để nối hai điều kiện; cả hai đều đúng thì khối lệnh mới chạy.' },
    ]
  ),

  'S8TIN-w06-quiz': L(
    'Cấu trúc if-else và if-elif-else',
    'Các em ơi, cuộc sống không chỉ có "đúng" hay "không làm gì". Với else và elif, chương trình có thể xử lí nhiều trường hợp khác nhau một cách gọn gàng.',
    ['Hiểu cấu trúc if-else (hai nhánh).', 'Hiểu if-elif-else (nhiều nhánh).', 'Biết khi nào dùng cấu trúc nào.', 'Vận dụng vào bài toán xếp loại.'],
    [
      { h: '1. Cấu trúc if-else' },
      { p: 'else cho biết phải làm gì KHI điều kiện sai. if cond: (làm A) else: (làm B) — nếu cond đúng thì làm A, ngược lại làm B. Chỉ một trong hai nhánh được chạy.' },
      { h: '2. Cấu trúc if-elif-else' },
      { p: 'Khi có nhiều hơn hai trường hợp, dùng elif (viết tắt của else if) để thêm các nhánh. Python kiểm tra lần lượt từ trên xuống, gặp điều kiện đúng đầu tiên thì chạy nhánh đó rồi dừng.' },
      { ul: [
        'if là nhánh đầu, bắt buộc có.',
        'elif có thể có nhiều, đặt giữa.',
        'else là nhánh cuối, không có điều kiện, chạy khi tất cả phía trên đều sai.',
      ] },
      { h: '3. Thứ tự kiểm tra rất quan trọng' },
      { p: 'Các điều kiện được xét theo thứ tự. Khi xếp loại điểm, phải xét điều kiện chặt nhất trước (>= 8) rồi mới đến điều kiện rộng hơn (>= 6.5), nếu không kết quả sẽ sai.' },
      { h: '4. Khi nào dùng cấu trúc nào?' },
      { ul: [
        'if đơn: chỉ cần làm gì đó khi điều kiện đúng.',
        'if-else: có đúng hai trường hợp đối lập (đậu/rớt).',
        'if-elif-else: từ ba trường hợp trở lên (xếp loại Giỏi/Khá/TB/Yếu).',
      ] },
      { h: '5. else có bắt buộc không?' },
      { p: 'Không. Nếu không có trường hợp ngược lại cần xử lí thì có thể bỏ else. if và elif đứng một mình vẫn hợp lệ.' },
      { note: 'Mỗi nhánh if/elif/else đều phải có dấu hai chấm và khối lệnh thụt lề. Các từ if-elif-else phải thẳng hàng (cùng mức thụt lề).' },
    ],
    [
      { q: 'Viết chương trình xếp loại điểm: ≥8 Giỏi, ≥6.5 Khá, ≥5 Trung bình, <5 Yếu.', a: 'if d >= 8:\\n    print("Giỏi")\\nelif d >= 6.5:\\n    print("Khá")\\nelif d >= 5:\\n    print("Trung bình")\\nelse:\\n    print("Yếu") — xét từ ngưỡng cao xuống thấp.' },
      { q: 'else có bắt buộc phải có không?', a: 'Không bắt buộc. Nếu không có trường hợp ngược lại cần làm gì thì bỏ else đi. Chỉ if (và elif) cũng là một chương trình hợp lệ.' },
      { q: 'Vì sao xếp loại điểm phải xét d >= 8 TRƯỚC d >= 5?', a: 'Vì Python dừng ở điều kiện đúng đầu tiên. Nếu xét d >= 5 trước thì điểm 9 cũng thoả d >= 5 và bị xếp "Trung bình" sai. Phải xét ngưỡng cao nhất trước.' },
    ]
  ),

  'S8TIN-w07-quiz': L(
    'Vòng lặp for',
    'Các em ơi, máy tính giỏi nhất ở việc làm đi làm lại một việc mà không biết mệt. Vòng lặp for giúp ta ra lệnh "lặp lại" mà chỉ cần viết một lần.',
    ['Hiểu ý nghĩa của vòng lặp.', 'Sử dụng for với hàm range().', 'Lặp qua phần tử của danh sách.', 'Vận dụng tính tổng, đếm bằng for.'],
    [
      { h: '1. Vì sao cần vòng lặp?' },
      { p: 'Muốn in các số từ 1 đến 100, ta không thể viết 100 lệnh print. Vòng lặp cho phép lặp lại một khối lệnh nhiều lần — viết ngắn mà làm được nhiều.' },
      { h: '2. Hàm range()' },
      { ul: [
        'range(5) → 0, 1, 2, 3, 4 (từ 0, dừng TRƯỚC 5).',
        'range(1, 6) → 1, 2, 3, 4, 5 (từ 1 đến 5).',
        'range(0, 10, 2) → 0, 2, 4, 6, 8 (bước nhảy 2).',
        'range(10, 0, -1) → 10, 9, ..., 1 (đếm ngược).',
      ] },
      { h: '3. Cú pháp for' },
      { p: 'for i in range(5): (xuống dòng, thụt lề) print(i). Biến i lần lượt nhận từng giá trị trong range, mỗi lần chạy lại khối lệnh một lần.' },
      { h: '4. Lặp qua danh sách' },
      { p: 'for có thể duyệt trực tiếp từng phần tử của list: for x in [1, 2, 3]: print(x). Biến x nhận lần lượt 1, rồi 2, rồi 3.' },
      { h: '5. Biến đếm và biến tích luỹ' },
      { ul: [
        'Biến tích luỹ tổng: khởi tạo s = 0 trước vòng lặp, mỗi vòng s += i.',
        'Biến đếm: khởi tạo cnt = 0, mỗi lần thoả điều kiện thì cnt += 1.',
        'Phải khởi tạo biến TRƯỚC vòng lặp, không khởi tạo bên trong.',
      ] },
      { note: 'range không tạo sẵn cả dãy số trong bộ nhớ mà sinh từng số khi cần — rất tiết kiệm bộ nhớ ngay cả với range(1000000).' },
    ],
    [
      { q: 'Tính tổng các số từ 1 đến 100.', a: 's = 0\\nfor i in range(1, 101):\\n    s += i\\nprint(s)  # kết quả 5050. Lưu ý range(1, 101) để bao gồm cả số 100.' },
      { q: 'In tất cả số chẵn từ 0 đến 20.', a: 'for i in range(0, 21, 2):\\n    print(i) — bước nhảy 2 nên chỉ in số chẵn 0, 2, 4, ..., 20.' },
      { q: 'Đếm xem trong danh sách [3, 8, 5, 12, 7] có bao nhiêu số lớn hơn 5.', a: 'cnt = 0\\nfor x in [3, 8, 5, 12, 7]:\\n    if x > 5:\\n        cnt += 1\\nprint(cnt)  # 2 (là 8 và 12).' },
    ]
  ),

  'S8TIN-w08-quiz': L(
    'Vòng lặp while',
    'Các em ơi, đôi khi ta không biết trước phải lặp bao nhiêu lần — chỉ biết "lặp đến khi nào điều kiện còn đúng". Đó chính là lúc cần vòng lặp while.',
    ['Nắm cú pháp vòng lặp while.', 'Hiểu và tránh lặp vô hạn.', 'Phân biệt khi nào dùng for, khi nào dùng while.', 'Vận dụng while vào bài toán có điều kiện dừng.'],
    [
      { h: '1. Vòng lặp while' },
      { p: 'while lặp lại khối lệnh CHỪNG NÀO điều kiện còn đúng (True). Cú pháp: while điều_kiện: (xuống dòng, thụt lề) khối lệnh. Trước mỗi vòng, Python kiểm tra điều kiện; nếu sai thì dừng lặp.' },
      { h: '2. Ba thành phần của while' },
      { ul: [
        'Khởi tạo biến điều kiện TRƯỚC vòng lặp (vd i = 1).',
        'Điều kiện lặp (vd while i <= 10:).',
        'Cập nhật biến điều kiện trong vòng lặp (vd i += 1).',
      ] },
      { h: '3. Lặp vô hạn — nguy hiểm cần tránh' },
      { p: 'Nếu trong vòng lặp KHÔNG có lệnh làm điều kiện sớm muộn trở thành sai, vòng lặp sẽ chạy mãi mãi (lặp vô hạn), khiến chương trình treo. Luôn nhớ cập nhật biến điều kiện.' },
      { h: '4. for và while khác nhau thế nào?' },
      { ul: [
        'for: dùng khi BIẾT TRƯỚC số lần lặp (duyệt qua một dãy).',
        'while: dùng khi KHÔNG biết trước số lần, chỉ biết điều kiện dừng.',
        'Mọi vòng for đều có thể viết lại bằng while, nhưng for thường gọn hơn.',
      ] },
      { h: '5. break và continue' },
      { ul: [
        'break: thoát ngay khỏi vòng lặp.',
        'continue: bỏ qua phần còn lại, sang vòng lặp tiếp theo.',
        'Hữu ích để dừng sớm khi đã tìm thấy kết quả.',
      ] },
      { note: 'Nếu chương trình bị treo do lặp vô hạn, có thể nhấn Ctrl + C để dừng. Luôn kiểm tra lại lệnh cập nhật biến điều kiện.' },
    ],
    [
      { q: 'Cộng dồn 1, 2, 3, ... cho đến khi tổng vượt quá 50, in ra số cuối cùng được cộng.', a: 's = 0; i = 1\\nwhile s <= 50:\\n    s += i\\n    i += 1\\nprint(i - 1) — vòng lặp dừng khi tổng vượt 50.' },
      { q: 'Đoạn sau bị lỗi gì: while i < 10:\\n    print(i)', a: 'Lặp vô hạn. Biến i không bao giờ thay đổi nên điều kiện i < 10 mãi đúng, vòng lặp chạy mãi. Phải thêm i += 1 trong vòng lặp.' },
      { q: 'Yêu cầu người dùng nhập mật khẩu cho đến khi đúng "abc".', a: 'mk = input("Nhập mật khẩu: ")\\nwhile mk != "abc":\\n    mk = input("Sai, nhập lại: ")\\nprint("Đúng rồi!") — while phù hợp vì không biết trước người dùng nhập sai bao nhiêu lần.' },
    ]
  ),

  'S8TIN-w09-quiz': L(
    'Bài tập tổng hợp: vòng lặp',
    'Các em ơi, sau khi học for và while, tuần này ta sẽ vận dụng chúng để giải các bài toán quen thuộc: đếm, tính tổng có điều kiện và tìm kiếm.',
    ['Giải bài toán đếm theo điều kiện.', 'Tính tổng/tích có điều kiện.', 'Áp dụng vòng lặp tìm giá trị thoả mãn.', 'Kết hợp for, while với if linh hoạt.'],
    [
      { h: '1. Mẫu bài toán ĐẾM' },
      { p: 'Đếm số phần tử thoả điều kiện: dùng biến đếm cnt = 0, duyệt qua dãy bằng for, mỗi lần gặp phần tử thoả điều kiện thì cnt += 1.' },
      { ul: [
        'Đếm số chia hết cho 3 từ 1 đến 100.',
        'Đếm số nguyên tố trong một khoảng.',
        'Đếm số học sinh đạt điểm trên 5.',
      ] },
      { h: '2. Mẫu bài toán TỔNG / TÍCH có điều kiện' },
      { ul: [
        'Tổng các số lẻ từ 1 đến 50: s = 0; for i in range(1, 51, 2): s += i.',
        'Tổng các số chia hết cho 7: dùng for + if i % 7 == 0.',
        'Tính giai thừa n! bằng vòng lặp nhân dồn.',
      ] },
      { h: '3. Mẫu bài toán TÌM' },
      { p: 'Dùng while để lặp đến khi tìm thấy giá trị thoả điều kiện. Ví dụ tìm số nhỏ nhất lớn hơn 100 chia hết cho cả 3 và 5: bắt đầu từ 101, tăng dần đến khi tìm được.' },
      { h: '4. Vòng lặp lồng nhau' },
      { p: 'Có thể đặt một vòng lặp bên trong vòng lặp khác (lặp lồng). Thường dùng để duyệt bảng, in hình, hoặc xét mọi cặp phần tử. Vòng trong chạy hết cho mỗi lần của vòng ngoài.' },
      { h: '5. Mẹo chọn vòng lặp' },
      { ul: [
        'Biết rõ chạy bao nhiêu lần → dùng for.',
        'Lặp đến khi đạt điều kiện → dùng while.',
        'Cần dừng sớm khi tìm thấy → dùng break.',
      ] },
      { note: 'Luôn khởi tạo biến đếm/biến tổng TRƯỚC vòng lặp. Lỗi hay gặp là khởi tạo bên trong, làm biến bị "reset" mỗi vòng.' },
    ],
    [
      { q: 'Đếm các số chia hết cho 7 từ 1 đến 100.', a: 'cnt = 0\\nfor i in range(1, 101):\\n    if i % 7 == 0:\\n        cnt += 1\\nprint(cnt)  # 14 (gồm 7, 14, 21, ..., 98).' },
      { q: 'Tìm số nhỏ nhất lớn hơn hoặc bằng 100 chia hết cho cả 3 và 5.', a: 'i = 100\\nwhile not (i % 3 == 0 and i % 5 == 0):\\n    i += 1\\nprint(i)  # 105 (vừa chia hết 3 vừa chia hết 5).' },
      { q: 'In bảng cửu chương 2 (2×1 đến 2×10) bằng for.', a: 'for i in range(1, 11):\\n    print(f"2 x {i} = {2 * i}") — vòng lặp chạy i từ 1 đến 10, mỗi vòng in một dòng của bảng nhân.' },
    ]
  ),

  'S8TIN-w10-quiz': L(
    'Kiểu danh sách (list)',
    'Các em ơi, thay vì tạo 30 biến để lưu điểm của 30 bạn, ta dùng MỘT danh sách. List là kiểu dữ liệu mạnh mẽ giúp gom nhiều giá trị vào chung một biến.',
    ['Khai báo và truy cập danh sách.', 'Hiểu chỉ số (index) và chỉ số âm.', 'Thêm, xoá, sửa phần tử.', 'Dùng len(), cắt lát (slice).'],
    [
      { h: '1. Danh sách là gì?' },
      { p: 'List (danh sách) lưu nhiều giá trị theo thứ tự trong một biến. Khai báo bằng dấu ngoặc vuông: a = [1, 2, 3, "Nam"]. List có thể chứa nhiều kiểu dữ liệu khác nhau.' },
      { h: '2. Chỉ số (index)' },
      { ul: [
        'Phần tử được đánh số từ 0: a[0] là phần tử đầu tiên.',
        'a[-1] là phần tử cuối, a[-2] là phần tử áp cuối (chỉ số âm).',
        'Truy cập sai chỉ số (vượt quá độ dài) gây lỗi IndexError.',
      ] },
      { h: '3. Cắt lát (slicing)' },
      { ul: [
        'a[1:3] → các phần tử từ vị trí 1 đến TRƯỚC 3.',
        'a[:2] → từ đầu đến trước vị trí 2.',
        'a[2:] → từ vị trí 2 đến hết.',
        'a[:] → bản sao của cả danh sách.',
      ] },
      { h: '4. Sửa và truy cập' },
      { p: 'List có thể thay đổi (mutable): a[0] = 10 đổi phần tử đầu thành 10. Đây là điểm khác với chuỗi (chuỗi không sửa được trực tiếp).' },
      { h: '5. Các thao tác cơ bản' },
      { ul: [
        'a.append(x) — thêm x vào cuối danh sách.',
        'a.insert(i, x) — chèn x vào vị trí i.',
        'a.remove(x) — xoá phần tử có giá trị x đầu tiên.',
        'a.pop() — lấy và xoá phần tử cuối.',
        'len(a) — số phần tử của danh sách.',
      ] },
      { note: 'List khác tuple ở chỗ list dùng [] và sửa được, còn tuple dùng () và không sửa được sau khi tạo.' },
    ],
    [
      { q: 'Tạo một danh sách gồm 5 số em yêu thích.', a: 'a = [3, 7, 8, 13, 21] — đây là list 5 phần tử kiểu int, truy cập a[0] = 3.' },
      { q: 'Lấy phần tử cuối cùng của danh sách a.', a: 'a[-1] (cách ngắn gọn) hoặc a[len(a) - 1] (dùng độ dài). Cả hai đều cho phần tử cuối.' },
      { q: 'Cho a = [10, 20, 30, 40, 50], kết quả của a[1:4] là gì?', a: '[20, 30, 40] — cắt lấy các phần tử từ vị trí 1 đến TRƯỚC vị trí 4 (tức vị trí 1, 2, 3).' },
    ]
  ),

  'S8TIN-w11-quiz': L(
    'Thao tác trên danh sách — Duyệt, tìm, đếm',
    'Các em ơi, có danh sách rồi thì việc quan trọng nhất là biết XỬ LÍ nó: duyệt qua từng phần tử, tìm xem có gì, đếm xem bao nhiêu. Ba thao tác này dùng suốt đời lập trình.',
    ['Duyệt danh sách bằng for.', 'Tìm phần tử với in và index().', 'Đếm và lọc theo điều kiện.', 'Dùng sum(), max(), min() trên danh sách.'],
    [
      { h: '1. Duyệt danh sách' },
      { ul: [
        'Duyệt theo phần tử: for x in a: print(x).',
        'Duyệt theo chỉ số: for i in range(len(a)): print(a[i]).',
        'Duyệt cả chỉ số và giá trị: for i, x in enumerate(a):.',
      ] },
      { h: '2. Tìm phần tử' },
      { ul: [
        'x in a → True/False, kiểm tra x có trong danh sách không.',
        'a.index(x) → vị trí của x (báo lỗi ValueError nếu không có).',
        'Nên kiểm tra if x in a trước khi gọi a.index(x).',
      ] },
      { h: '3. Đếm' },
      { ul: [
        'a.count(x) — đếm số lần x xuất hiện.',
        'Đếm theo điều kiện: dùng for + if + biến đếm.',
        'len(a) — đếm tổng số phần tử.',
      ] },
      { h: '4. Các hàm tổng hợp có sẵn' },
      { ul: [
        'sum(a) — tổng các phần tử (dãy số).',
        'max(a) — phần tử lớn nhất.',
        'min(a) — phần tử nhỏ nhất.',
        'sum(a) / len(a) — giá trị trung bình.',
      ] },
      { h: '5. Lọc phần tử theo điều kiện' },
      { p: 'Để tạo danh sách mới chỉ gồm các phần tử thoả điều kiện, dùng vòng lặp với append, hoặc list comprehension: [x for x in a if x > 5].' },
      { note: 'Khi tính trung bình điểm, nhớ kiểm tra danh sách không rỗng (len(a) > 0) để tránh chia cho 0.' },
    ],
    [
      { q: 'Tính điểm trung bình của danh sách điểm a = [7, 8, 6, 9, 5].', a: 'tb = sum(a) / len(a)  # (7+8+6+9+5)/5 = 35/5 = 7.0. Dùng sum() chia cho len() để ra trung bình.' },
      { q: 'Đếm số phần tử chẵn trong danh sách a.', a: 'cnt = 0\\nfor x in a:\\n    if x % 2 == 0:\\n        cnt += 1\\nprint(cnt) — duyệt từng phần tử, gặp số chẵn thì tăng biến đếm.' },
      { q: 'Tìm bạn có điểm cao nhất và điểm đó là bao nhiêu trong a = [7, 9, 6, 9].', a: 'cao_nhat = max(a)  # 9. Để biết vị trí: a.index(cao_nhat) → 1 (bạn đầu tiên đạt 9). max() trả giá trị lớn nhất.' },
    ]
  ),

  'S8TIN-w12-quiz': L(
    'Hàm trong Python',
    'Các em ơi, khi một đoạn lệnh được dùng đi dùng lại nhiều lần, ta nên "đóng gói" nó thành một hàm. Hàm giúp chương trình ngắn gọn, dễ đọc và ít lỗi hơn.',
    ['Khai báo hàm bằng def.', 'Truyền tham số và nhận kết quả qua return.', 'Hiểu phạm vi biến (cục bộ/toàn cục).', 'Vận dụng hàm để chia nhỏ bài toán.'],
    [
      { h: '1. Hàm là gì?' },
      { p: 'Hàm là một khối lệnh có tên, thực hiện một công việc cụ thể. Viết hàm một lần, gọi lại nhiều lần — giống như nút bấm: bấm là chạy, không cần viết lại quy trình bên trong.' },
      { h: '2. Khai báo hàm' },
      { p: 'Dùng từ khoá def: def ten_ham(tham_so): (xuống dòng, thụt lề) khối lệnh, rồi return kết_quả. Tên hàm đặt theo quy tắc giống tên biến.' },
      { h: '3. Tham số (parameter) và đối số (argument)' },
      { ul: [
        'Tham số: biến nhận giá trị, ghi trong dấu ngoặc khi định nghĩa.',
        'Đối số: giá trị thực truyền vào khi gọi hàm.',
        'Có thể có nhiều tham số, ngăn cách bằng dấu phẩy.',
        'Có thể đặt giá trị mặc định: def chao(ten="bạn"):.',
      ] },
      { h: '4. Lệnh return' },
      { ul: [
        'return trả giá trị kết quả ra ngoài hàm và kết thúc hàm.',
        'Hàm không có return sẽ trả về None.',
        'Sau khi return, các lệnh phía dưới trong hàm không chạy.',
      ] },
      { h: '5. Gọi hàm' },
      { p: 'Gọi hàm bằng tên kèm đối số: kq = ten_ham(5). Giá trị 5 được truyền vào tham số, hàm tính rồi trả kết quả gán cho biến kq.' },
      { h: '6. Lợi ích của hàm' },
      { ul: [
        'Tái sử dụng: viết một lần, dùng nhiều lần.',
        'Dễ đọc: chia bài toán lớn thành các phần nhỏ có tên rõ ràng.',
        'Dễ sửa: lỗi nằm gọn trong một hàm, sửa một chỗ.',
      ] },
      { note: 'Biến tạo bên trong hàm là biến cục bộ — chỉ tồn tại trong hàm đó, không dùng được bên ngoài.' },
    ],
    [
      { q: 'Viết hàm tính giai thừa n! của một số n.', a: 'def giai_thua(n):\\n    s = 1\\n    for i in range(1, n + 1):\\n        s *= i\\n    return s — gọi giai_thua(5) trả về 120.' },
      { q: 'Vì sao nên dùng hàm thay vì viết lặp lại đoạn lệnh?', a: 'Vì hàm giúp tái sử dụng (viết một lần dùng nhiều lần), dễ đọc, dễ sửa (chỉ sửa một nơi), giảm lỗi và làm chương trình ngắn gọn hơn.' },
      { q: 'Viết hàm kiem_tra_chan(n) trả về True nếu n chẵn, ngược lại False.', a: 'def kiem_tra_chan(n):\\n    return n % 2 == 0 — biểu thức n % 2 == 0 đã cho kết quả bool nên return thẳng. Gọi kiem_tra_chan(4) → True.' },
    ]
  ),

  'S8TIN-w13-quiz': L(
    'Soạn thảo văn bản nâng cao — Định dạng đoạn, kiểu (styles)',
    'Các em ơi, một văn bản dài như báo cáo hay tiểu luận cần được định dạng nhất quán. Styles giúp em làm điều đó chỉ với một cú nhấp chuột, và còn tạo được mục lục tự động.',
    ['Hiểu khái niệm style và lợi ích.', 'Áp dụng các style Heading và Normal.', 'Tạo và cập nhật mục lục tự động.', 'Biết chỉnh sửa style theo ý muốn.'],
    [
      { h: '1. Style là gì?' },
      { p: 'Style (kiểu) là một tập hợp các định dạng (phông chữ, cỡ chữ, màu, căn lề, giãn dòng) được đặt tên sẵn. Thay vì chỉnh từng thứ một, em áp dụng style là cả đoạn được định dạng đồng loạt.' },
      { h: '2. Vì sao dùng style?' },
      { ul: [
        'Nhất quán: mọi tiêu đề cùng cấp trông giống hệt nhau.',
        'Nhanh: một cú nhấp thay vì chỉnh nhiều bước.',
        'Tạo mục lục tự động dựa trên các Heading.',
        'Sửa một lần áp dụng toàn bộ: đổi style là đổi mọi đoạn dùng style đó.',
      ] },
      { h: '3. Các style thường dùng' },
      { ul: [
        'Heading 1: tiêu đề chương/phần lớn.',
        'Heading 2: tiêu đề mục.',
        'Heading 3: tiêu đề mục nhỏ hơn.',
        'Normal: văn bản thường (mặc định).',
        'Title, Subtitle: tiêu đề và phụ đề trang bìa.',
      ] },
      { h: '4. Cách áp dụng style' },
      { ul: [
        'Đặt con trỏ vào đoạn (hoặc bôi đen).',
        'Vào tab Home → nhóm Styles → chọn style mong muốn.',
        'Word áp dụng ngay định dạng cho cả đoạn.',
      ] },
      { h: '5. Tạo mục lục tự động' },
      { p: 'Sau khi các tiêu đề đã gắn Heading 1, 2, 3, vào References → Table of Contents → chọn mẫu. Word tự gom các Heading thành mục lục kèm số trang.' },
      { h: '6. Cập nhật mục lục' },
      { p: 'Khi nội dung thay đổi (thêm mục, đổi trang), bấm chuột phải vào mục lục → Update Field, chọn Update entire table để cập nhật cả tiêu đề và số trang.' },
      { note: 'Định dạng tay từng đoạn vừa mất công, vừa không nhất quán và KHÔNG tạo được mục lục tự động. Style giải quyết cả ba vấn đề này.' },
    ],
    [
      { q: 'Vì sao không nên định dạng tay từng đoạn tiêu đề?', a: 'Vì mất nhiều công, dễ làm các tiêu đề không đồng nhất, và Word không nhận diện được đó là tiêu đề nên không tạo được mục lục tự động. Dùng style Heading khắc phục tất cả.' },
      { q: 'Sau khi thêm một mục mới, mục lục có tự cập nhật không?', a: 'Không tự động. Phải bấm chuột phải vào mục lục → Update Field → Update entire table, hoặc bấm nút Update Table, thì số trang và tiêu đề mới được cập nhật.' },
      { q: 'Em muốn mọi tiêu đề Heading 1 đổi sang màu xanh. Cách nhanh nhất là gì?', a: 'Sửa lại style Heading 1 (chuột phải vào style Heading 1 → Modify → đổi màu xanh). Tất cả đoạn đang dùng Heading 1 sẽ đồng loạt đổi màu — không cần sửa từng đoạn.' },
    ]
  ),

  'S8TIN-w14-quiz': L(
    'Chèn bảng, biểu đồ vào văn bản',
    'Các em ơi, khi cần trình bày số liệu trong một báo cáo, bảng và biểu đồ giúp người đọc nắm thông tin nhanh hơn nhiều so với chữ. Tuần này ta học cách đưa chúng vào Word.',
    ['Chèn và định dạng bảng trong Word.', 'Gộp/tách ô, dùng Table Styles.', 'Chèn biểu đồ minh hoạ số liệu.', 'Sao chép dữ liệu từ Excel sang Word.'],
    [
      { h: '1. Khi nào dùng bảng, khi nào dùng biểu đồ?' },
      { ul: [
        'Bảng: trình bày số liệu chính xác theo hàng/cột.',
        'Biểu đồ: thể hiện xu hướng, so sánh, tỉ lệ một cách trực quan.',
        'Thường dùng cả hai: bảng để tra cứu, biểu đồ để nhìn tổng quan.',
      ] },
      { h: '2. Chèn bảng' },
      { p: 'Insert → Table → kéo chuột chọn số hàng × cột, hoặc Insert Table để gõ chính xác. Bảng xuất hiện tại vị trí con trỏ.' },
      { h: '3. Định dạng bảng' },
      { ul: [
        'Merge Cells: gộp nhiều ô thành một (cho ô tiêu đề).',
        'Split Cells: tách một ô thành nhiều ô.',
        'Table Styles: chọn mẫu màu/đường viền có sẵn.',
        'Tab Layout: thêm/xoá hàng cột, căn chỉnh nội dung ô.',
      ] },
      { h: '4. Chèn biểu đồ' },
      { p: 'Insert → Chart → chọn loại (Column/Line/Pie...) → một bảng số liệu mini (giống Excel) hiện ra để em nhập dữ liệu. Sửa số liệu xong, biểu đồ tự cập nhật.' },
      { h: '5. Các loại biểu đồ thường dùng' },
      { ul: [
        'Cột (Column): so sánh giá trị giữa các nhóm.',
        'Đường (Line): xu hướng thay đổi theo thời gian.',
        'Tròn (Pie): tỉ lệ phần trăm của các thành phần.',
      ] },
      { h: '6. Sao chép từ Excel sang Word' },
      { ul: [
        'Paste thường: dán bảng/biểu đồ như ảnh tĩnh.',
        'Paste Special → Paste Link: liên kết, sửa Excel thì Word tự cập nhật.',
        'Giữ định dạng nguồn hoặc theo định dạng đích tuỳ chọn khi dán.',
      ] },
      { note: 'Biểu đồ tròn chỉ nên có ít thành phần (3–6). Quá nhiều phần sẽ khó đọc — khi đó nên dùng biểu đồ cột.' },
    ],
    [
      { q: 'Khi nào nên dùng biểu đồ tròn?', a: 'Khi muốn thể hiện tỉ lệ phần trăm các thành phần trong một tổng thể (vd tỉ lệ học sinh yêu thích từng môn). Tổng các phần luôn bằng 100%.' },
      { q: 'Làm sao để khi sửa bảng trong Excel thì Word tự cập nhật theo?', a: 'Sao chép bảng trong Excel, sang Word dùng Paste Special → Paste Link. Khi sửa số liệu trong Excel, bảng trong Word liên kết sẽ tự cập nhật theo.' },
      { q: 'Để so sánh điểm thi của 5 môn học, nên chọn loại biểu đồ nào?', a: 'Biểu đồ cột (Column) — mỗi cột là một môn, chiều cao cột thể hiện điểm, dễ so sánh môn nào cao môn nào thấp.' },
    ]
  ),

  'S8TIN-w15-quiz': L(
    'Bảng tính — Công thức và hàm cơ bản',
    'Các em ơi, sức mạnh thật sự của bảng tính nằm ở khả năng TỰ ĐỘNG tính toán. Chỉ cần nhập công thức một lần, dữ liệu đổi là kết quả đổi theo ngay.',
    ['Viết công thức bắt đầu bằng dấu =.', 'Sử dụng các hàm SUM, AVERAGE, MAX, MIN, COUNT.', 'Hiểu địa chỉ ô và vùng dữ liệu.', 'Sao chép công thức với tham chiếu tương đối/tuyệt đối.'],
    [
      { h: '1. Ô và địa chỉ ô' },
      { p: 'Mỗi ô trong bảng tính có địa chỉ gồm cột (chữ) và hàng (số): A1 là ô cột A hàng 1, C5 là ô cột C hàng 5. Vùng A1:A10 là dải ô từ A1 đến A10.' },
      { h: '2. Công thức' },
      { ul: [
        'Mọi công thức bắt đầu bằng dấu =.',
        'Ví dụ: =A1+B1 cộng giá trị hai ô.',
        'Dùng được + - * / và dấu ngoặc ().',
        'Tham chiếu ô thay vì gõ số: dữ liệu đổi, kết quả tự cập nhật.',
      ] },
      { h: '3. Các hàm cơ bản' },
      { ul: [
        '=SUM(A1:A10) — tổng các ô.',
        '=AVERAGE(A1:A10) — trung bình cộng.',
        '=MAX(A1:A10) — giá trị lớn nhất.',
        '=MIN(A1:A10) — giá trị nhỏ nhất.',
        '=COUNT(A1:A10) — đếm số ô CHỨA SỐ.',
      ] },
      { h: '4. Sao chép công thức' },
      { p: 'Kéo góc dưới phải của ô (fill handle) để sao chép công thức xuống các ô khác. Excel tự điều chỉnh địa chỉ ô theo vị trí mới — gọi là tham chiếu tương đối.' },
      { h: '5. Tham chiếu tương đối và tuyệt đối' },
      { ul: [
        'A1 — tương đối: sao chép sẽ thay đổi theo vị trí.',
        '$A$1 — tuyệt đối: sao chép vẫn giữ nguyên A1.',
        '$A1 / A$1 — hỗn hợp: cố định một phần (cột hoặc hàng).',
        'Dùng $ khi cần luôn trỏ về một ô cố định (vd ô tỉ giá, hằng số).',
      ] },
      { note: 'Khác COUNT, hàm COUNTA đếm cả ô chứa chữ. Chọn đúng hàm đếm theo loại dữ liệu cần đếm.' },
    ],
    [
      { q: 'Tính tổng điểm 5 môn nằm ở các ô A2 đến E2.', a: '=SUM(A2:E2) — hàm SUM cộng tất cả ô trong vùng A2 đến E2. Có thể gõ =A2+B2+C2+D2+E2 nhưng dùng SUM gọn hơn.' },
      { q: 'Khác nhau giữa A1 và $A$1 khi sao chép công thức?', a: 'A1 là tham chiếu tương đối: khi sao chép xuống dưới sẽ thành A2, A3... $A$1 là tuyệt đối: dù sao chép đi đâu vẫn giữ nguyên A1 (dùng cho ô hằng số như tỉ giá).' },
      { q: 'Có một bảng giá, cột B là số lượng, ô D1 chứa đơn giá. Viết công thức tính thành tiền cho hàng 2 và sao chép xuống.', a: '=B2*$D$1 — đặt ở ô C2. Dùng $D$1 (tuyệt đối) để khi kéo xuống C3, C4 vẫn nhân với đơn giá ở D1, còn B2 (tương đối) tự đổi thành B3, B4.' },
    ]
  ),

  'S8TIN-w16-quiz': L(
    'Bảng tính — Hàm logic IF',
    'Các em ơi, giống như câu lệnh if trong Python, bảng tính cũng có hàm IF cho phép "ra quyết định" — hiển thị kết quả này hay kết quả kia tuỳ theo điều kiện.',
    ['Nắm cú pháp hàm IF.', 'Viết điều kiện so sánh trong IF.', 'Dùng IF lồng nhau cho nhiều bậc.', 'Vận dụng IF vào xếp loại, đánh giá đạt/không đạt.'],
    [
      { h: '1. Hàm IF dùng để làm gì?' },
      { p: 'IF kiểm tra một điều kiện: nếu đúng thì trả về một giá trị, nếu sai thì trả về giá trị khác. Đây là cách bảng tính tự động phân loại, đánh giá dữ liệu.' },
      { h: '2. Cú pháp IF' },
      { p: '=IF(điều_kiện, giá_trị_nếu_đúng, giá_trị_nếu_sai). Ba phần ngăn cách bằng dấu phẩy (hoặc chấm phẩy tuỳ cài đặt vùng).' },
      { h: '3. Điều kiện trong IF' },
      { ul: [
        'Dùng toán tử so sánh: =, <>, <, >, <=, >=.',
        'Ví dụ: A2>=5 (điểm đạt từ 5 trở lên).',
        'Giá trị chữ phải đặt trong dấu nháy kép: "Đậu".',
      ] },
      { h: '4. Ví dụ cơ bản' },
      { p: '=IF(A2>=5, "Đậu", "Rớt") — nếu điểm ở A2 từ 5 trở lên thì ghi "Đậu", ngược lại ghi "Rớt".' },
      { h: '5. IF lồng nhau' },
      { p: 'Khi có nhiều hơn hai trường hợp, đặt IF bên trong IF. Ví dụ xếp loại: =IF(A2>=8, "Giỏi", IF(A2>=6.5, "Khá", IF(A2>=5, "TB", "Yếu"))). Mỗi IF xử lí một mức.' },
      { h: '6. So sánh IF với IFS' },
      { ul: [
        'IFS đơn giản hơn cho nhiều điều kiện: =IFS(A2>=8,"Giỏi", A2>=6.5,"Khá",...).',
        'IFS chỉ có ở Excel phiên bản mới (2019+, Microsoft 365).',
        'IF lồng nhau dùng được ở mọi phiên bản.',
      ] },
      { note: 'Khi viết IF lồng, đếm kỹ số dấu ngoặc đóng phải bằng số IF đã mở, nếu không sẽ báo lỗi công thức.' },
    ],
    [
      { q: 'Viết hàm IF: nếu điểm ở A2 ≥ 7 thì ghi "Khá", ngược lại ghi "Cần cố gắng".', a: '=IF(A2>=7, "Khá", "Cần cố gắng") — điều kiện A2>=7, giá trị đúng "Khá", giá trị sai "Cần cố gắng". Chữ phải đặt trong nháy kép.' },
      { q: 'IF khác IFS thế nào?', a: 'IF chỉ xử lí một điều kiện (đúng/sai); muốn nhiều bậc phải lồng IF trong IF. IFS gọn hơn cho nhiều điều kiện nhưng chỉ có ở Excel mới. Logic cuối cùng giống nhau.' },
      { q: 'Viết công thức xếp loại học lực: ≥8 "Giỏi", ≥6.5 "Khá", ≥5 "TB", còn lại "Yếu", với điểm ở A2.', a: '=IF(A2>=8,"Giỏi",IF(A2>=6.5,"Khá",IF(A2>=5,"TB","Yếu"))) — ba hàm IF lồng nhau, xét từ ngưỡng cao xuống thấp, đóng đủ ba dấu ngoặc ở cuối.' },
    ]
  ),

  'S8TIN-w17-quiz': L(
    'Biểu đồ trong bảng tính',
    'Các em ơi, một bảng đầy số khô khan rất khó nắm bắt. Biểu đồ biến những con số đó thành hình ảnh trực quan, giúp người xem hiểu ngay xu hướng và sự khác biệt.',
    ['Chọn loại biểu đồ phù hợp với dữ liệu.', 'Vẽ biểu đồ từ vùng dữ liệu.', 'Định dạng tiêu đề, nhãn, chú thích.', 'Hiểu khi nào dùng cột/đường/tròn.'],
    [
      { h: '1. Vai trò của biểu đồ' },
      { p: 'Biểu đồ giúp người xem nhận ra nhanh: cái gì lớn nhất, xu hướng tăng hay giảm, tỉ lệ giữa các phần. Cùng một dữ liệu, biểu đồ thường dễ hiểu hơn nhiều so với bảng số.' },
      { h: '2. Các loại biểu đồ' },
      { ul: [
        'Cột (Column): so sánh giá trị giữa các đối tượng.',
        'Đường (Line): xu hướng thay đổi theo thời gian.',
        'Tròn (Pie): tỉ lệ phần trăm trong một tổng thể.',
        'Thanh ngang (Bar): so sánh, xếp hạng khi tên dài.',
        'Phân tán (Scatter): quan hệ giữa hai đại lượng.',
      ] },
      { h: '3. Các bước vẽ biểu đồ' },
      { ul: [
        'Bước 1: bôi đen vùng dữ liệu (gồm cả tiêu đề cột/hàng).',
        'Bước 2: Insert → chọn nhóm biểu đồ → chọn loại.',
        'Bước 3: biểu đồ xuất hiện, có thể di chuyển và thay đổi kích thước.',
      ] },
      { h: '4. Các thành phần của biểu đồ' },
      { ul: [
        'Chart Title: tiêu đề biểu đồ.',
        'Axis (trục): trục ngang (hoành) và trục dọc (tung) cùng nhãn.',
        'Legend: chú thích màu/đường ứng với dãy dữ liệu.',
        'Data Labels: nhãn hiển thị giá trị từng cột/phần.',
      ] },
      { h: '5. Định dạng và chỉnh sửa' },
      { p: 'Khi chọn biểu đồ sẽ xuất hiện tab Chart Design và Format. Có thể đổi loại biểu đồ, đổi màu, thêm/bớt thành phần qua dấu + bên cạnh biểu đồ.' },
      { note: 'Chọn SAI loại biểu đồ sẽ gây hiểu lầm. Số liệu theo thời gian dùng đường; so sánh nhóm dùng cột; tỉ lệ phần trăm dùng tròn.' },
    ],
    [
      { q: 'Để so sánh điểm thi 5 môn của một bạn, nên chọn loại biểu đồ nào?', a: 'Biểu đồ cột — mỗi môn là một cột, chiều cao thể hiện điểm. Dễ thấy môn nào cao, môn nào thấp.' },
      { q: 'Muốn thể hiện tỉ lệ phần trăm học sinh yêu thích các môn, nên dùng loại nào?', a: 'Biểu đồ tròn — mỗi môn là một "miếng bánh", kích thước miếng tỉ lệ với phần trăm. Tổng tất cả miếng bằng 100%.' },
      { q: 'Muốn xem nhiệt độ trung bình của một thành phố thay đổi qua 12 tháng, dùng biểu đồ gì?', a: 'Biểu đồ đường (Line) — trục ngang là tháng, trục dọc là nhiệt độ. Đường nối thể hiện rõ xu hướng tăng/giảm theo thời gian.' },
    ]
  ),

  'S8TIN-w18-quiz': L(
    'Ôn tập học kì I',
    'Các em ơi, nửa năm học đã trôi qua. Tuần này cô trò mình cùng hệ thống lại toàn bộ kiến thức Học kì I: lập trình Python cơ bản, soạn thảo văn bản nâng cao và bảng tính.',
    ['Hệ thống kiến thức Python cơ bản.', 'Ôn lại các kĩ năng Word nâng cao.', 'Ôn lại công thức và hàm Excel.', 'Liên hệ Python với hàm logic trong Excel.'],
    [
      { h: '1. Python — cấu trúc cơ bản' },
      { ul: [
        'Biến và kiểu dữ liệu: int, float, str, bool.',
        'input()/print() và ép kiểu int(), float().',
        'Toán tử số học (// % **) và so sánh.',
        'Rẽ nhánh: if, if-else, if-elif-else.',
      ] },
      { h: '2. Python — lặp và cấu trúc dữ liệu' },
      { ul: [
        'Vòng lặp for (biết số lần) và while (theo điều kiện).',
        'Danh sách (list): thêm, xoá, duyệt, tìm, đếm.',
        'Hàm: def, tham số, return, tái sử dụng.',
      ] },
      { h: '3. Soạn thảo văn bản (Word)' },
      { ul: [
        'Style: Heading 1/2/3, Normal — định dạng nhất quán.',
        'Mục lục tự động và cách cập nhật.',
        'Chèn bảng, gộp/tách ô, biểu đồ minh hoạ.',
      ] },
      { h: '4. Bảng tính (Excel)' },
      { ul: [
        'Công thức bắt đầu bằng =, địa chỉ ô, vùng dữ liệu.',
        'Hàm SUM, AVERAGE, MAX, MIN, COUNT.',
        'Tham chiếu tương đối A1 và tuyệt đối $A$1.',
        'Hàm IF và IF lồng nhau; biểu đồ.',
      ] },
      { h: '5. Liên hệ giữa các phần' },
      { p: 'Logic rẽ nhánh xuất hiện ở cả Python (if) và Excel (IF). Hiểu một bên giúp hiểu bên kia. Tin học văn phòng và lập trình bổ trợ nhau trong xử lí dữ liệu thực tế.' },
      { note: 'Khi ôn, hãy tự đặt câu hỏi "vì sao?" cho mỗi cú pháp — hiểu bản chất sẽ nhớ lâu hơn học thuộc.' },
    ],
    [
      { q: 'Phân biệt vòng lặp for và while.', a: 'for dùng khi biết trước số lần lặp (duyệt qua một dãy/range). while dùng khi không biết trước số lần, chỉ biết điều kiện dừng. Mọi for đều viết lại được bằng while.' },
      { q: 'Hàm IF trong Excel có giống câu lệnh if trong Python không?', a: 'Giống về LOGIC (kiểm tra điều kiện, rẽ hai nhánh) nhưng khác CÚ PHÁP: Excel viết =IF(điều_kiện, đúng, sai) trên một dòng; Python viết if điều_kiện: rồi else: trên nhiều dòng có thụt lề.' },
      { q: 'Em cần tính trung bình điểm của một lớp 30 bạn. Nên dùng Python hay Excel? Vì sao?', a: 'Cả hai đều được. Excel nhanh hơn cho thao tác sẵn có (=AVERAGE), trực quan với bảng. Python linh hoạt hơn khi cần xử lí phức tạp, tự động hoá. Với bài đơn giản này, Excel tiện hơn.' },
    ]
  ),

  'S8TIN-w19-quiz': L(
    'Thuật toán sắp xếp — Khái niệm',
    'Các em ơi, danh bạ điện thoại, bảng xếp hạng, từ điển — tất cả đều cần dữ liệu được sắp xếp. Sắp xếp là một trong những bài toán nền tảng và quan trọng nhất của tin học.',
    ['Hiểu bài toán sắp xếp.', 'Biết tên các thuật toán sắp xếp phổ biến.', 'Hiểu khái niệm độ phức tạp thời gian.', 'Nhận ra vì sao sắp xếp lại quan trọng.'],
    [
      { h: '1. Thuật toán là gì?' },
      { p: 'Thuật toán là một dãy các bước rõ ràng, hữu hạn để giải một bài toán. Cùng một bài toán có thể có nhiều thuật toán khác nhau, nhanh chậm khác nhau.' },
      { h: '2. Bài toán sắp xếp' },
      { p: 'Cho một dãy gồm n phần tử (thường là số hoặc chuỗi), hãy sắp xếp chúng theo thứ tự tăng dần (hoặc giảm dần). Đây là bài toán cơ bản xuất hiện ở khắp nơi.' },
      { h: '3. Các thuật toán sắp xếp phổ biến' },
      { ul: [
        'Sắp xếp nổi bọt (Bubble sort): đổi chỗ hai phần tử liền kề sai thứ tự.',
        'Sắp xếp chọn (Selection sort): chọn phần tử nhỏ nhất đặt lên đầu.',
        'Sắp xếp chèn (Insertion sort): chèn từng phần tử vào đúng chỗ.',
        'Quick sort, Merge sort: nâng cao, nhanh hơn nhiều.',
      ] },
      { h: '4. Độ phức tạp thời gian' },
      { p: 'Độ phức tạp cho biết số phép tính tăng nhanh thế nào khi dữ liệu lớn lên. Kí hiệu O lớn (Big-O) dùng để mô tả: O(n²), O(n log n)...' },
      { ul: [
        'Bubble/Selection/Insertion: O(n²) — chậm với dữ liệu lớn.',
        'Quick/Merge: O(n log n) — nhanh hơn nhiều.',
        'O(n²) với n = 1000 cần khoảng 1 triệu phép tính.',
      ] },
      { h: '5. Vì sao sắp xếp quan trọng?' },
      { ul: [
        'Tìm kiếm nhị phân yêu cầu dữ liệu đã sắp xếp.',
        'Hiển thị bảng xếp hạng, danh sách theo thứ tự.',
        'Tiền xử lí cho nhiều thuật toán khác.',
      ] },
      { note: 'Ở lớp 8 ta học các thuật toán O(n²) vì dễ hiểu ý tưởng. Quick/Merge sort sẽ học sâu hơn ở các lớp/bậc cao hơn.' },
    ],
    [
      { q: 'Tại sao sắp xếp lại quan trọng trong tin học?', a: 'Vì nhiều việc cần dữ liệu có thứ tự: tìm kiếm nhị phân chỉ chạy trên dãy đã sắp; hiển thị bảng xếp hạng; xử lí, thống kê dữ liệu. Sắp xếp là bước nền cho nhiều bài toán khác.' },
      { q: 'O(n²) nghĩa là gì?', a: 'Nghĩa là số phép so sánh/đổi chỗ tỉ lệ với n bình phương. Với n = 1000 phần tử thì cần khoảng 1.000.000 phép tính — tăng rất nhanh khi n lớn.' },
      { q: 'Cùng một dãy số, sắp xếp tăng dần và giảm dần khác nhau ở đâu?', a: 'Khác ở điều kiện so sánh: tăng dần đặt số nhỏ trước, giảm dần đặt số lớn trước. Thuật toán giống hệt, chỉ đảo chiều phép so sánh (đổi < thành >).' },
    ]
  ),

  'S8TIN-w20-quiz': L(
    'Thuật toán sắp xếp chọn (Selection sort)',
    'Các em ơi, hãy tưởng tượng em xếp một hàng học sinh theo chiều cao: mỗi lượt em chọn bạn thấp nhất còn lại đưa lên đầu. Đó chính là ý tưởng của thuật toán sắp xếp chọn.',
    ['Hiểu ý tưởng sắp xếp chọn.', 'Cài đặt sắp xếp chọn bằng Python.', 'Phân tích số lần so sánh và đổi chỗ.', 'Theo dõi diễn biến qua từng bước.'],
    [
      { h: '1. Ý tưởng sắp xếp chọn' },
      { p: 'Ở mỗi bước, tìm phần tử NHỎ NHẤT trong phần chưa sắp xếp rồi đưa nó về đầu phần đó. Phần đầu dãy dần dần được sắp xếp đúng, phần còn lại thu nhỏ lại.' },
      { h: '2. Các bước cụ thể' },
      { ul: [
        'Bước i: tìm phần tử nhỏ nhất trong a[i..n-1].',
        'Đổi chỗ phần tử nhỏ nhất đó với a[i].',
        'Tăng i lên, lặp lại cho đến khi i = n-1.',
        'Sau mỗi bước, a[i] đã ở đúng vị trí cuối cùng.',
      ] },
      { h: '3. Cài đặt bằng Python' },
      { p: 'for i in range(n):\\n    m = i\\n    for j in range(i+1, n):\\n        if a[j] < a[m]:\\n            m = j\\n    a[i], a[m] = a[m], a[i] — biến m lưu vị trí phần tử nhỏ nhất.' },
      { h: '4. Kĩ thuật đổi chỗ' },
      { p: 'Trong Python, đổi chỗ hai phần tử rất gọn: a[i], a[m] = a[m], a[i]. Không cần biến tạm như nhiều ngôn ngữ khác.' },
      { h: '5. Phân tích' },
      { ul: [
        'Số phép so sánh: luôn khoảng n²/2 → độ phức tạp O(n²).',
        'Số lần đổi chỗ: tối đa n-1 lần (ít hơn Bubble sort).',
        'Số lần so sánh không phụ thuộc dữ liệu ban đầu đã sắp hay chưa.',
      ] },
      { note: 'Selection sort ít đổi chỗ nên có lợi khi việc đổi chỗ tốn kém, nhưng số phép so sánh vẫn nhiều — chỉ phù hợp dãy nhỏ.' },
    ],
    [
      { q: 'Sắp xếp tăng dần dãy [5, 2, 8, 1, 9] bằng selection sort, mô tả các lượt đầu.', a: 'Lượt 1: tìm nhỏ nhất là 1, đổi với 5 → [1, 2, 8, 5, 9]. Lượt 2: nhỏ nhất còn lại là 2 (đã đúng chỗ). Lượt 3: nhỏ nhất là 5, đổi với 8 → [1, 2, 5, 8, 9]. Kết quả: [1, 2, 5, 8, 9].' },
      { q: 'Số lần đổi chỗ tối đa của selection sort với dãy n phần tử là bao nhiêu?', a: 'Tối đa n-1 lần, vì mỗi lượt chỉ đổi chỗ đúng một lần (đưa min về đầu). Đây là ưu điểm so với Bubble sort vốn đổi chỗ nhiều hơn.' },
      { q: 'Vì sao biến m được khởi tạo bằng i ở mỗi lượt?', a: 'Vì ban đầu ta giả định phần tử ở vị trí i là nhỏ nhất. Sau đó vòng lặp trong duyệt phần còn lại để cập nhật m nếu tìm thấy phần tử nhỏ hơn. Khởi tạo m = i để có mốc so sánh.' },
    ]
  ),

  'S8TIN-w21-quiz': L(
    'Thuật toán sắp xếp chèn (Insertion sort)',
    'Các em ơi, khi chơi bài, em thường cầm từng lá rồi chèn vào đúng vị trí trong những lá đã sắp trên tay. Sắp xếp chèn hoạt động đúng như vậy — rất tự nhiên và trực quan.',
    ['Hiểu ý tưởng sắp xếp chèn.', 'Cài đặt sắp xếp chèn bằng Python.', 'So sánh với sắp xếp chọn.', 'Biết khi nào insertion sort hiệu quả.'],
    [
      { h: '1. Ý tưởng sắp xếp chèn' },
      { p: 'Coi phần đầu dãy là "đã sắp xếp". Lần lượt lấy từng phần tử tiếp theo và CHÈN nó vào đúng vị trí trong phần đã sắp, đẩy các phần tử lớn hơn sang phải.' },
      { h: '2. Liên hệ thực tế' },
      { p: 'Giống như xếp bài trên tay: em rút một lá mới, so với các lá đã có, rồi chèn vào vị trí phù hợp để cả tay bài luôn theo thứ tự.' },
      { h: '3. Các bước cụ thể' },
      { ul: [
        'Bắt đầu từ phần tử thứ 2 (chỉ số 1).',
        'Lưu phần tử hiện tại vào biến key.',
        'So sánh key với các phần tử bên trái, dịch phần tử lớn hơn sang phải.',
        'Đặt key vào đúng vị trí trống.',
      ] },
      { h: '4. Cài đặt bằng Python' },
      { p: 'for i in range(1, n):\\n    key = a[i]\\n    j = i - 1\\n    while j >= 0 and a[j] > key:\\n        a[j+1] = a[j]\\n        j -= 1\\n    a[j+1] = key' },
      { h: '5. So sánh với selection sort' },
      { ul: [
        'Cả hai đều O(n²) ở trường hợp xấu nhất.',
        'Insertion sort hiệu quả với dãy GẦN sắp xếp: chỉ O(n).',
        'Insertion sort ổn định (giữ thứ tự phần tử bằng nhau).',
        'Thường dùng insertion sort cho dãy nhỏ vì cài đặt gọn, chạy nhanh.',
      ] },
      { note: 'Insertion sort là thuật toán mà nhiều thư viện dùng cho phần dữ liệu nhỏ vì nó nhanh khi n bé và khi dữ liệu gần như đã sắp.' },
    ],
    [
      { q: 'Sắp xếp dãy [3, 1, 4, 1, 5, 9, 2, 6] bằng insertion sort, kết quả là gì?', a: 'Kết quả tăng dần: [1, 1, 2, 3, 4, 5, 6, 9]. Lần lượt chèn từng phần tử vào phần đã sắp ở bên trái.' },
      { q: 'Khi nào insertion sort cho hiệu quả tốt nhất?', a: 'Khi dãy đã gần như được sắp xếp. Khi đó vòng while hầu như không phải dịch phần tử nào, độ phức tạp chỉ còn O(n) — nhanh hơn nhiều thuật toán khác.' },
      { q: 'Vì sao gọi insertion sort là thuật toán "ổn định"?', a: 'Vì khi có các phần tử bằng nhau, thứ tự ban đầu của chúng được giữ nguyên sau khi sắp xếp (không bị đảo chỗ). Tính chất này quan trọng khi sắp xếp dữ liệu theo nhiều tiêu chí.' },
    ]
  ),

  'S8TIN-w22-quiz': L(
    'Thực hành sắp xếp với Python',
    'Các em ơi, hiểu thuật toán sắp xếp là nền tảng, nhưng trong thực tế Python đã có sẵn công cụ sắp xếp cực nhanh và tiện. Tuần này ta học cách dùng sort() và sorted().',
    ['Dùng phương thức a.sort().', 'Dùng hàm sorted().', 'Sắp xếp giảm dần với reverse.', 'Sắp xếp theo tiêu chí với tham số key.'],
    [
      { h: '1. Hai cách sắp xếp có sẵn' },
      { ul: [
        'a.sort() — sắp xếp NGAY TRÊN danh sách a (thay đổi a, không trả về gì).',
        'sorted(a) — trả về DANH SÁCH MỚI đã sắp, a giữ nguyên.',
        'Cả hai dùng thuật toán Timsort rất nhanh, O(n log n).',
      ] },
      { h: '2. Khi nào dùng cái nào?' },
      { p: 'Dùng a.sort() khi không cần giữ lại thứ tự gốc. Dùng sorted(a) khi muốn giữ nguyên a và tạo bản sắp xếp riêng. sorted() còn dùng được cho mọi dãy (tuple, chuỗi), không chỉ list.' },
      { h: '3. Sắp xếp giảm dần' },
      { p: 'Thêm tham số reverse=True: a.sort(reverse=True) hoặc sorted(a, reverse=True) cho thứ tự giảm dần (từ lớn xuống nhỏ).' },
      { h: '4. Sắp xếp theo tiêu chí (key)' },
      { ul: [
        'key nhận một hàm quyết định tiêu chí so sánh.',
        'sorted(names, key=len) — sắp theo độ dài chuỗi.',
        'sorted(hs, key=lambda x: x["diem"]) — sắp theo điểm.',
        'lambda là cách viết hàm ngắn gọn ngay tại chỗ.',
      ] },
      { h: '5. Sắp xếp danh sách phức tạp' },
      { p: 'Với danh sách các từ điển (như danh sách học sinh có tên và điểm), dùng key để chọn tiêu chí sắp xếp: theo điểm, theo tên, theo tuổi...' },
      { note: 'sort() trả về None (không phải danh sách). Viết b = a.sort() là SAI — b sẽ là None. Phải dùng b = sorted(a).' },
    ],
    [
      { q: 'Sắp xếp danh sách tên ["An", "Bình", "Cường", "Dũng"] theo độ dài.', a: 'sorted(names, key=len) — dùng key=len để so sánh theo số kí tự. "An" (2) trước "Bình", "Dũng" (4), rồi "Cường" (5).' },
      { q: 'Khác nhau giữa a.sort() và sorted(a)?', a: 'a.sort() sắp xếp ngay trên a, làm thay đổi a và trả về None. sorted(a) không đổi a, trả về một danh sách mới đã sắp xếp. Dùng sorted khi cần giữ lại bản gốc.' },
      { q: 'Cho danh sách điểm a = [7, 3, 9, 5]. Lấy ra danh sách sắp giảm dần mà KHÔNG đổi a.', a: 'b = sorted(a, reverse=True)  # b = [9, 7, 5, 3], a vẫn là [7, 3, 9, 5]. Dùng sorted (không phải sort) để giữ a, thêm reverse=True để giảm dần.' },
    ]
  ),

  'S8TIN-w23-quiz': L(
    'Tìm kiếm tuyến tính (Linear search)',
    'Các em ơi, muốn tìm một cuốn sách trên giá, cách đơn giản nhất là xem từng cuốn từ đầu đến khi gặp. Tìm kiếm tuyến tính trong tin học hoạt động đúng như vậy.',
    ['Hiểu ý tưởng tìm kiếm tuyến tính.', 'Cài đặt linear search bằng Python.', 'Đánh giá độ phức tạp.', 'Biết ưu điểm và hạn chế.'],
    [
      { h: '1. Bài toán tìm kiếm' },
      { p: 'Cho một dãy và một giá trị cần tìm (gọi là khoá). Hãy cho biết khoá có trong dãy không, và nếu có thì ở vị trí nào. Đây là thao tác cực kỳ phổ biến.' },
      { h: '2. Ý tưởng tìm kiếm tuyến tính' },
      { p: 'Duyệt lần lượt từ phần tử đầu đến cuối, so sánh mỗi phần tử với khoá. Gặp phần tử bằng khoá thì trả về vị trí; duyệt hết mà không thấy thì trả về -1 (không có).' },
      { h: '3. Cài đặt bằng Python' },
      { p: 'def tim_kiem(a, x):\\n    for i in range(len(a)):\\n        if a[i] == x:\\n            return i\\n    return -1 — trả vị trí đầu tiên tìm thấy, hoặc -1 nếu không có.' },
      { h: '4. Đánh giá độ phức tạp' },
      { ul: [
        'Tốt nhất: phần tử đầu đúng ngay → 1 phép so sánh.',
        'Xấu nhất: ở cuối hoặc không có → n phép so sánh.',
        'Trung bình: khoảng n/2 phép → độ phức tạp O(n).',
      ] },
      { h: '5. Ưu điểm và hạn chế' },
      { ul: [
        'Ưu điểm: đơn giản, áp dụng cho MỌI dãy, không cần sắp xếp trước.',
        'Hạn chế: chậm với dãy lớn (phải duyệt nhiều).',
        'Phù hợp khi dãy nhỏ hoặc dữ liệu chưa sắp xếp.',
      ] },
      { note: 'Toán tử in của Python (if x in a) thực chất chính là tìm kiếm tuyến tính được làm sẵn.' },
    ],
    [
      { q: 'Tìm giá trị 8 trong dãy [3, 1, 8, 4] bằng linear search, kết quả là gì?', a: 'Trả về 2 — vì 8 nằm ở vị trí chỉ số 2 (đếm từ 0: a[0]=3, a[1]=1, a[2]=8). Duyệt từ đầu, đến vị trí 2 thì gặp.' },
      { q: 'Số phép so sánh tối đa khi tìm kiếm tuyến tính trong dãy n phần tử là bao nhiêu?', a: 'n phép so sánh — xảy ra khi phần tử cần tìm nằm ở cuối dãy hoặc không có trong dãy (phải duyệt hết). Đây là trường hợp xấu nhất, độ phức tạp O(n).' },
      { q: 'Vì sao tìm kiếm tuyến tính dùng được cho dãy chưa sắp xếp?', a: 'Vì nó so sánh tuần tự từng phần tử, không dựa vào thứ tự của dãy. Bất kể dãy sắp xếp hay lộn xộn, nó vẫn duyệt hết và tìm đúng. Đây là ưu điểm so với tìm kiếm nhị phân.' },
    ]
  ),

  'S8TIN-w24-quiz': L(
    'Tìm kiếm nhị phân (Binary search)',
    'Các em ơi, khi tra từ điển, em không lật từng trang mà mở giữa rồi quyết định lật về trước hay sau. Cách "chia đôi" thông minh đó chính là tìm kiếm nhị phân — nhanh đến kinh ngạc.',
    ['Hiểu ý tưởng chia đôi.', 'Cài đặt binary search bằng Python.', 'Đánh giá độ phức tạp O(log n).', 'So sánh với tìm kiếm tuyến tính.'],
    [
      { h: '1. Điều kiện tiên quyết' },
      { p: 'Tìm kiếm nhị phân CHỈ áp dụng được khi dãy ĐÃ SẮP XẾP (thường tăng dần). Nhờ thứ tự, ta có thể loại bỏ một nửa dãy sau mỗi lần so sánh.' },
      { h: '2. Ý tưởng chia đôi' },
      { ul: [
        'So sánh khoá với phần tử Ở GIỮA.',
        'Nếu bằng → tìm thấy.',
        'Nếu khoá nhỏ hơn → tìm tiếp nửa BÊN TRÁI.',
        'Nếu khoá lớn hơn → tìm tiếp nửa BÊN PHẢI.',
        'Lặp lại đến khi tìm thấy hoặc hết khoảng tìm.',
      ] },
      { h: '3. Cài đặt bằng Python' },
      { p: 'l, r = 0, len(a) - 1\\nwhile l <= r:\\n    m = (l + r) // 2\\n    if a[m] == x:\\n        return m\\n    elif a[m] < x:\\n        l = m + 1\\n    else:\\n        r = m - 1\\nreturn -1' },
      { h: '4. Đánh giá độ phức tạp' },
      { ul: [
        'Mỗi bước loại bỏ một nửa số phần tử còn lại.',
        'Độ phức tạp O(log n) — nhanh hơn O(n) rất nhiều.',
        'Với 1.000.000 phần tử chỉ cần khoảng 20 phép so sánh.',
      ] },
      { h: '5. So sánh với tìm kiếm tuyến tính' },
      { ul: [
        'Tuyến tính: O(n), không cần sắp xếp.',
        'Nhị phân: O(log n), bắt buộc sắp xếp trước.',
        'Dãy lớn và sắp xếp sẵn → dùng nhị phân.',
        'Dãy nhỏ hoặc chưa sắp → dùng tuyến tính.',
      ] },
      { note: 'log₂ của một số cho biết phải chia đôi bao nhiêu lần để còn 1. Vì log₂(1024) = 10 nên tìm trong 1024 phần tử chỉ tốn khoảng 10 bước.' },
    ],
    [
      { q: 'Yêu cầu bắt buộc của tìm kiếm nhị phân là gì?', a: 'Dãy phải ĐÃ ĐƯỢC SẮP XẾP (tăng dần hoặc giảm dần). Nếu dãy chưa sắp, tìm kiếm nhị phân sẽ cho kết quả sai vì việc loại bỏ nửa dãy dựa trên thứ tự.' },
      { q: 'Tìm một giá trị trong 1024 phần tử (đã sắp) tốn tối đa bao nhiêu bước?', a: 'Khoảng 10 bước, vì log₂(1024) = 10. Mỗi bước loại bỏ một nửa: 1024 → 512 → 256 → ... → 1, tổng cộng 10 lần chia đôi.' },
      { q: 'Vì sao binary search nhanh hơn linear search rất nhiều với dãy lớn?', a: 'Vì mỗi bước binary search loại bỏ MỘT NỬA số phần tử, độ phức tạp O(log n). Linear search phải duyệt từng phần tử, O(n). Với 1 triệu phần tử: tuyến tính cần đến 1 triệu phép, nhị phân chỉ ~20 phép.' },
    ]
  ),

  'S8TIN-w25-quiz': L(
    'Kiểu dữ liệu xâu (string) trong Python',
    'Các em ơi, mọi văn bản, tên người, câu chữ trong chương trình đều là chuỗi (string). Đây là kiểu dữ liệu xuất hiện nhiều nhất, nên hiểu rõ về chuỗi là rất cần thiết.',
    ['Tạo và hiểu chuỗi kí tự.', 'Truy cập và cắt lát chuỗi.', 'Dùng các phương thức chuỗi cơ bản.', 'Hiểu chuỗi là không thể sửa trực tiếp.'],
    [
      { h: '1. Chuỗi là gì?' },
      { p: 'Chuỗi (string) là một dãy các kí tự đặt trong dấu nháy. Có thể dùng nháy đơn \'...\' hoặc nháy kép "...". Chuỗi nhiều dòng dùng ba dấu nháy """...""".' },
      { h: '2. Truy cập và độ dài' },
      { ul: [
        's[0] — kí tự đầu tiên (đếm từ 0).',
        's[-1] — kí tự cuối cùng.',
        'len(s) — số kí tự của chuỗi.',
        'Truy cập sai vị trí gây lỗi IndexError.',
      ] },
      { h: '3. Cắt lát chuỗi (slicing)' },
      { ul: [
        's[1:4] — các kí tự từ vị trí 1 đến TRƯỚC 4.',
        's[:3] — ba kí tự đầu.',
        's[2:] — từ vị trí 2 đến hết.',
        's[::-1] — đảo ngược chuỗi.',
      ] },
      { h: '4. Chuỗi không thể sửa trực tiếp' },
      { p: 'Chuỗi là immutable: không thể gán s[0] = "X". Muốn thay đổi, phải tạo chuỗi mới (vd dùng replace) — đây là điểm khác với danh sách.' },
      { h: '5. Các phương thức cơ bản' },
      { ul: [
        's.upper() — chuyển thành IN HOA.',
        's.lower() — chuyển thành chữ thường.',
        's.strip() — bỏ khoảng trắng thừa ở đầu/cuối.',
        's.replace("a", "b") — thay mọi "a" bằng "b".',
        's.count("a") — đếm số lần "a" xuất hiện.',
      ] },
      { h: '6. Cộng và nhân chuỗi' },
      { ul: [
        '"Hello" + " " + "World" → "Hello World" (nối chuỗi).',
        '"ab" * 3 → "ababab" (lặp chuỗi).',
      ] },
      { note: 'Có thể duyệt từng kí tự của chuỗi bằng for: for c in s: print(c) — rất hữu ích khi xử lí văn bản.' },
    ],
    [
      { q: 'Kết quả của "Hello"[1:4] là gì?', a: '"ell" — cắt lấy các kí tự từ vị trí 1 đến TRƯỚC vị trí 4 (vị trí 1=\'e\', 2=\'l\', 3=\'l\').' },
      { q: 'Đếm số kí tự "a" trong chuỗi s = "banana".', a: 's.count("a") → 3. Phương thức count đếm số lần kí tự (hoặc chuỗi con) xuất hiện.' },
      { q: 'Đảo ngược chuỗi "Python" và chuyển nó thành chữ in hoa.', a: '"Python"[::-1] → "nohtyP"; rồi .upper() → "NOHTYP". Hoặc gộp: "Python"[::-1].upper(). Cú pháp [::-1] đảo chuỗi, .upper() in hoa.' },
    ]
  ),

  'S8TIN-w26-quiz': L(
    'Xử lý xâu — Tách, ghép, tìm',
    'Các em ơi, xử lí văn bản trong thực tế thường cần tách một câu thành các từ, ghép các từ lại, hoặc tìm xem một từ có trong câu không. Ba thao tác split, join, find giúp ta làm điều đó.',
    ['Tách chuỗi bằng split().', 'Ghép chuỗi bằng join().', 'Tìm chuỗi con bằng find() và in.', 'Kết hợp xử lí câu thực tế.'],
    [
      { h: '1. Tách chuỗi — split()' },
      { ul: [
        '"a,b,c".split(",") → ["a", "b", "c"].',
        '"Tôi yêu Python".split() → ["Tôi", "yêu", "Python"] (tách theo khoảng trắng).',
        'split() trả về một DANH SÁCH các phần.',
      ] },
      { h: '2. Ghép chuỗi — join()' },
      { ul: [
        '"-".join(["a", "b", "c"]) → "a-b-c".',
        '" ".join(["Tôi", "yêu", "Python"]) → "Tôi yêu Python".',
        'Chuỗi đứng trước join là "keo dán" giữa các phần tử.',
      ] },
      { h: '3. split và join là cặp đối ngẫu' },
      { p: 'split tách chuỗi thành danh sách, join gộp danh sách thành chuỗi. Hai thao tác này thường đi cùng nhau khi xử lí văn bản: tách ra, xử lí từng phần, rồi ghép lại.' },
      { h: '4. Tìm chuỗi con — find() và in' },
      { ul: [
        '"hello".find("ll") → 2 (vị trí xuất hiện); -1 nếu không có.',
        '"ll" in "hello" → True (kiểm tra có/không).',
        '"hello".index("ll") → 2, nhưng báo lỗi nếu không có (khác find).',
      ] },
      { h: '5. Đếm từ và xử lí câu' },
      { p: 'Dùng len(s.split()) để đếm số từ. Dùng split() rồi reversed() rồi join() để đảo thứ tự các từ trong câu.' },
      { h: '6. Một số phương thức bổ trợ' },
      { ul: [
        's.startswith("abc") — kiểm tra chuỗi bắt đầu bằng "abc".',
        's.endswith(".txt") — kiểm tra chuỗi kết thúc bằng ".txt".',
        's.title() — viết hoa chữ cái đầu mỗi từ.',
      ] },
      { note: 'split() không có đối số sẽ tự bỏ qua khoảng trắng thừa và xuống dòng — rất tiện khi tách văn bản người dùng nhập.' },
    ],
    [
      { q: 'Đảo ngược thứ tự các từ trong câu "Toi yeu Python".', a: '" ".join(reversed("Toi yeu Python".split())) → "Python yeu Toi". Bước 1: split() tách thành ["Toi","yeu","Python"]. Bước 2: reversed() đảo thứ tự. Bước 3: join() ghép lại bằng dấu cách.' },
      { q: 'Đếm số từ trong chuỗi s.', a: 'len(s.split()) — split() tách câu thành danh sách các từ, len() đếm số phần tử của danh sách đó.' },
      { q: 'Kiểm tra tệp "baitap.docx" có phải là tệp Word không.', a: '"baitap.docx".endswith(".docx") → True. Phương thức endswith kiểm tra phần đuôi của chuỗi, dùng để nhận biết loại tệp qua phần mở rộng.' },
    ]
  ),

  'S8TIN-w27-quiz': L(
    'Kiểu từ điển (dictionary)',
    'Các em ơi, đôi khi ta cần tra "tên → tuổi", "mã hàng → giá", giống như tra từ điển. Kiểu dictionary của Python lưu các cặp khoá–giá trị để tra cứu cực nhanh.',
    ['Tạo và hiểu cấu trúc dictionary.', 'Truy cập, thêm, sửa, xoá phần tử.', 'Duyệt qua dictionary.', 'Phân biệt dict với list.'],
    [
      { h: '1. Dictionary là gì?' },
      { p: 'Dictionary (từ điển) lưu các cặp KHOÁ–GIÁ TRỊ (key–value). Mỗi khoá là duy nhất và dùng để tra ra giá trị tương ứng. Khai báo bằng dấu ngoặc nhọn: d = {"ten": "Nam", "tuoi": 13}.' },
      { h: '2. Truy cập giá trị' },
      { ul: [
        'd["ten"] → "Nam" (tra theo khoá).',
        'd.get("a", 0) → trả 0 nếu khoá "a" không có (an toàn, không lỗi).',
        'Truy cập khoá không tồn tại bằng d["x"] gây lỗi KeyError.',
      ] },
      { h: '3. Thêm, sửa, xoá' },
      { ul: [
        'd["mon"] = "Toán" — thêm cặp mới hoặc sửa nếu khoá đã có.',
        'del d["tuoi"] — xoá cặp theo khoá.',
        '"ten" in d — kiểm tra khoá có tồn tại không.',
      ] },
      { h: '4. Duyệt dictionary' },
      { ul: [
        'for k in d: — duyệt các khoá.',
        'for v in d.values(): — duyệt các giá trị.',
        'for k, v in d.items(): — duyệt cả cặp khoá–giá trị.',
      ] },
      { h: '5. So sánh dict với list' },
      { ul: [
        'List: truy cập bằng chỉ số 0, 1, 2... (theo vị trí).',
        'Dict: truy cập bằng khoá (tên có ý nghĩa).',
        'Dict tra cứu theo khoá rất nhanh, không phải duyệt.',
      ] },
      { h: '6. Ứng dụng phổ biến' },
      { p: 'Dictionary rất hợp để đếm tần suất (đếm số lần mỗi kí tự/từ xuất hiện), lưu hồ sơ (tên → thông tin), tra cứu (mã → giá).' },
      { note: 'Khoá của dict phải là kiểu không đổi (chuỗi, số, tuple). Giá trị thì tuỳ ý, kể cả là list hay dict khác.' },
    ],
    [
      { q: 'Đếm số lần xuất hiện của mỗi kí tự trong chuỗi s.', a: 'd = {}\\nfor c in s:\\n    d[c] = d.get(c, 0) + 1\\nprint(d) — dùng get(c, 0) để khởi tạo 0 cho kí tự mới, rồi cộng dồn. Kết quả là dict {kí_tự: số_lần}.' },
      { q: 'Dictionary khác list ở điểm nào?', a: 'List truy cập bằng chỉ số theo vị trí (0, 1, 2...), thứ tự cố định. Dictionary truy cập bằng KHOÁ (tên có ý nghĩa như "ten", "tuoi"), tra cứu nhanh mà không cần biết vị trí.' },
      { q: 'Tạo một dict lưu thông tin học sinh gồm tên "An", lớp "8A", điểm 9. In ra điểm.', a: 'hs = {"ten": "An", "lop": "8A", "diem": 9}\\nprint(hs["diem"])  # 9. Truy cập giá trị qua khoá "diem".' },
    ]
  ),

  'S8TIN-w28-quiz': L(
    'An toàn thông tin — Mật khẩu mạnh và xác thực 2 yếu tố',
    'Các em ơi, mỗi tài khoản online của em là một cánh cửa, và mật khẩu là chiếc khoá. Tuần này cô dạy các em cách làm cho khoá thật chắc và thêm một lớp bảo vệ thứ hai.',
    ['Hiểu thế nào là mật khẩu mạnh.', 'Biết cách quản lí nhiều mật khẩu.', 'Hiểu và biết bật xác thực 2 yếu tố (2FA).', 'Vận dụng vào tài khoản thực tế.'],
    [
      { h: '1. Vì sao cần mật khẩu mạnh?' },
      { p: 'Mật khẩu yếu (123456, ngày sinh, tên mình) chỉ mất vài giây để kẻ xấu dò ra bằng phần mềm. Mất tài khoản, em có thể bị lấy tiền, lộ thông tin, hoặc bị mạo danh lừa người thân.' },
      { h: '2. Đặc điểm mật khẩu mạnh' },
      { ul: [
        'Dài tối thiểu 12 kí tự (càng dài càng khó dò).',
        'Có CẢ chữ HOA, chữ thường, số và kí tự đặc biệt (!@#$...).',
        'Không dùng ngày sinh, tên, "password", dãy số liên tiếp.',
        'Mỗi tài khoản dùng một mật khẩu RIÊNG.',
      ] },
      { h: '3. Mẹo tạo mật khẩu dễ nhớ mà mạnh' },
      { p: 'Lấy một câu em nhớ rồi viết tắt và biến tấu. Ví dụ "Tôi yêu Python năm 2026" → "T0i$YeuPy#2026". Vừa khó dò, vừa dễ nhớ với riêng em.' },
      { h: '4. Quản lí nhiều mật khẩu' },
      { ul: [
        'Không thể nhớ hết mật khẩu mạnh cho hàng chục tài khoản.',
        'Dùng trình quản lí mật khẩu (Bitwarden, 1Password) lưu an toàn.',
        'Chỉ cần nhớ một mật khẩu chính để mở trình quản lí.',
      ] },
      { h: '5. Xác thực 2 yếu tố (2FA)' },
      { ul: [
        '2FA = lớp bảo vệ thứ hai ngoài mật khẩu.',
        'Sau khi nhập mật khẩu, cần thêm mã OTP gửi về điện thoại/ứng dụng.',
        'Dù lộ mật khẩu, kẻ xấu vẫn không vào được vì thiếu điện thoại của em.',
        'Nên bật 2FA cho Gmail, Facebook, ngân hàng.',
      ] },
      { h: '6. Hai "yếu tố" trong 2FA' },
      { p: 'Yếu tố 1 là thứ em BIẾT (mật khẩu). Yếu tố 2 là thứ em CÓ (điện thoại nhận OTP). Kết hợp hai yếu tố khác loại khiến tài khoản an toàn hơn hẳn.' },
      { note: 'Quy tắc vàng: KHÔNG bao giờ chia sẻ mật khẩu hay mã OTP cho bất kỳ ai, kể cả người tự xưng là nhân viên ngân hàng hay nhà mạng.' },
    ],
    [
      { q: 'Mật khẩu nào tốt hơn: "20100515" hay "T0i$YeuPy#2026"?', a: '"T0i$YeuPy#2026" tốt hơn nhiều — dài, đủ chữ hoa, thường, số, kí tự đặc biệt và không phải ngày sinh. "20100515" chỉ có số, lại giống ngày sinh nên rất dễ đoán.' },
      { q: 'Xác thực 2 yếu tố gồm những "yếu tố" nào?', a: 'Hai yếu tố khác loại: (1) thứ em BIẾT là mật khẩu, (2) thứ em CÓ là điện thoại nhận mã OTP. Phải có cả hai mới đăng nhập được, nên an toàn hơn chỉ dùng mật khẩu.' },
      { q: 'Vì sao không nên dùng cùng một mật khẩu cho nhiều tài khoản?', a: 'Vì nếu một dịch vụ bị lộ dữ liệu, kẻ xấu sẽ thử mật khẩu đó cho mọi tài khoản khác của em (Gmail, Facebook, ngân hàng). Dùng mật khẩu riêng cho từng nơi giúp giới hạn thiệt hại.' },
    ]
  ),

  'S8TIN-w29-quiz': L(
    'An toàn thông tin — Lừa đảo trực tuyến (phishing)',
    'Các em ơi, kẻ xấu trên mạng rất tinh vi, giả mạo ngân hàng, Facebook để lừa em tự đưa mật khẩu. Tuần này cô giúp các em nhận diện và phòng tránh chiêu lừa đảo phishing.',
    ['Hiểu phishing là gì.', 'Nhận biết các dấu hiệu lừa đảo.', 'Biết cách phòng tránh.', 'Biết phản ứng khi nghi ngờ bị lừa.'],
    [
      { h: '1. Phishing là gì?' },
      { p: 'Phishing (lừa đảo qua mạng) là việc kẻ xấu giả mạo một tổ chức uy tín (ngân hàng, Facebook, nhà mạng) gửi email/tin nhắn/website giả để dụ em cung cấp mật khẩu, mã OTP, thông tin thẻ — rồi chiếm đoạt.' },
      { h: '2. Vì sao gọi là "câu cá"?' },
      { p: 'Phishing đọc gần giống fishing (câu cá): kẻ xấu thả "mồi" (email/link hấp dẫn hoặc đe doạ) và chờ "cá" cắn câu (người nhẹ dạ bấm vào và khai thông tin).' },
      { h: '3. Dấu hiệu nhận biết' },
      { ul: [
        'Địa chỉ web sai chính tả: vietcombak.com, faceb00k.com.',
        'Nội dung đe doạ: "tài khoản sẽ bị khoá", "phát hiện đăng nhập lạ".',
        'Mồi nhử: "bạn trúng thưởng", "nhận quà miễn phí".',
        'Yêu cầu nhập mật khẩu/OTP GẤP, tạo cảm giác hối thúc.',
        'Link rút gọn lạ (bit.ly...), email không đúng tên miền chính thức.',
      ] },
      { h: '4. Cách phòng tránh' },
      { ul: [
        'KHÔNG bấm link lạ trong email/tin nhắn.',
        'Vào trực tiếp website chính thức bằng cách gõ địa chỉ, không qua link.',
        'Kiểm tra kĩ tên miền và biểu tượng khoá https.',
        'KHÔNG cung cấp mật khẩu, OTP cho bất kỳ ai.',
      ] },
      { h: '5. Khi nghi ngờ hoặc lỡ bị lừa' },
      { ul: [
        'Lỡ bấm và nhập thông tin → ĐỔI NGAY mật khẩu.',
        'Báo ngân hàng khoá thẻ nếu liên quan tiền.',
        'Báo người thân, thầy cô; lưu bằng chứng.',
        'Phản ánh tới cơ quan chức năng nếu thiệt hại lớn.',
      ] },
      { note: 'Nhân viên ngân hàng, công an THẬT không bao giờ hỏi mật khẩu hay mã OTP của em. Ai hỏi những thứ đó đều là lừa đảo.' },
    ],
    [
      { q: 'Em nhận email "Tài khoản Facebook của bạn sẽ bị khoá, click để xác minh ngay". Em làm gì?', a: 'Không bấm vào link. Đây là phishing điển hình dùng đe doạ để hối thúc. Muốn kiểm tra, em tự mở trình duyệt gõ facebook.com vào trực tiếp, không bao giờ vào qua link trong email lạ.' },
      { q: 'Người tự xưng nhân viên ngân hàng gọi điện hỏi mã OTP. Em phản ứng thế nào?', a: 'Tuyệt đối KHÔNG đọc mã OTP cho họ. Không ai — kể cả nhân viên ngân hàng thật — có quyền hỏi OTP của em. Cúp máy, gọi tổng đài chính thức của ngân hàng để kiểm tra nếu cần.' },
      { q: 'Làm sao phân biệt website ngân hàng thật và giả?', a: 'Kiểm tra tên miền chính xác (vd vietcombank.com.vn, không phải vietcombak.com), có biểu tượng khoá https. Tốt nhất là tự gõ địa chỉ hoặc dùng bookmark đã lưu, không bấm link từ email/tin nhắn.' },
    ]
  ),

  'S8TIN-w30-quiz': L(
    'Phần mềm độc hại (malware) và phòng tránh',
    'Các em ơi, "malware" là tên gọi chung cho các phần mềm độc hại có thể phá máy, đánh cắp dữ liệu hoặc tống tiền. Hiểu chúng và biết cách phòng tránh sẽ giúp em an toàn.',
    ['Hiểu khái niệm malware và các loại.', 'Biết các con đường lây nhiễm.', 'Nắm các biện pháp phòng tránh.', 'Biết xử lí khi máy nhiễm độc.'],
    [
      { h: '1. Malware là gì?' },
      { p: 'Malware (malicious software — phần mềm độc hại) là các chương trình được tạo ra với mục đích xấu: phá hoại, đánh cắp dữ liệu, theo dõi hoặc tống tiền người dùng.' },
      { h: '2. Các loại malware' },
      { ul: [
        'Virus: bám vào tệp, lây khi tệp được chạy.',
        'Trojan: giả dạng phần mềm "hợp pháp" để lừa cài.',
        'Worm (sâu): tự nhân bản và lây qua mạng.',
        'Ransomware: mã hoá dữ liệu rồi đòi tiền chuộc.',
        'Spyware: âm thầm theo dõi, đánh cắp thông tin.',
      ] },
      { h: '3. Con đường lây nhiễm' },
      { ul: [
        'Tải phần mềm crack/bẻ khoá.',
        'Bấm link hoặc mở tệp đính kèm lạ trong email.',
        'Cắm USB không rõ nguồn gốc.',
        'Truy cập website đen, tải file từ trang không uy tín.',
      ] },
      { h: '4. Biện pháp phòng tránh' },
      { ul: [
        'Cài và bật phần mềm diệt virus (Windows Defender đã đủ tốt).',
        'Cập nhật hệ điều hành và phần mềm thường xuyên (vá lỗ hổng).',
        'KHÔNG tải phần mềm crack, không mở tệp lạ.',
        'Sao lưu (backup) dữ liệu định kì để phòng ransomware.',
      ] },
      { h: '5. Dấu hiệu máy có thể bị nhiễm' },
      { ul: [
        'Máy chạy chậm bất thường, hay treo.',
        'Quảng cáo, cửa sổ lạ tự bật lên.',
        'Tệp bị đổi đuôi hoặc không mở được.',
        'Tài khoản tự đăng nhập/gửi tin nhắn lạ.',
      ] },
      { h: '6. Khi máy đã nhiễm' },
      { ul: [
        'Ngắt kết nối mạng để chặn lây lan.',
        'Quét toàn bộ máy bằng phần mềm diệt virus.',
        'Với ransomware: KHÔNG trả tiền, khôi phục từ backup, báo người lớn/công an.',
      ] },
      { note: 'Phần mềm crack thường đi kèm malware ẩn. Tiết kiệm một khoản phí bản quyền có thể đổi lấy mất sạch dữ liệu — không đáng.' },
    ],
    [
      { q: 'Tại sao tải phần mềm crack lại nguy hiểm?', a: 'Vì phần mềm crack thường được nhúng sẵn malware ẩn (virus, spyware). Cài vào, em có thể bị đánh cắp tài khoản, mật khẩu, dữ liệu, hoặc máy bị điều khiển từ xa. Vừa vi phạm bản quyền vừa nguy hiểm.' },
      { q: 'Máy bị ransomware mã hoá toàn bộ dữ liệu, đòi tiền chuộc. Em làm gì?', a: 'KHÔNG trả tiền (trả rồi cũng thường không lấy lại được dữ liệu, lại khuyến khích kẻ xấu). Ngắt mạng, báo người lớn/công an, và khôi phục dữ liệu từ bản sao lưu (backup) đã chuẩn bị trước.' },
      { q: 'Vì sao cần cập nhật hệ điều hành thường xuyên?', a: 'Vì các bản cập nhật vá những lỗ hổng bảo mật mà malware có thể lợi dụng để xâm nhập. Máy không cập nhật giống nhà có cửa hỏng khoá — dễ bị kẻ xấu khai thác.' },
    ]
  ),

  'S8TIN-w31-quiz': L(
    'Đạo đức số — Quyền tác giả trong môi trường số',
    'Các em ơi, mỗi bức ảnh, bản nhạc, dòng code trên mạng đều do ai đó tạo ra và có quyền sở hữu. Tôn trọng quyền tác giả là một phần của ứng xử văn minh trong thế giới số.',
    ['Hiểu khái niệm quyền tác giả.', 'Nhận biết hành vi vi phạm thường gặp.', 'Biết về giấy phép Creative Commons.', 'Trích dẫn nguồn đúng cách.'],
    [
      { h: '1. Quyền tác giả là gì?' },
      { p: 'Quyền tác giả (bản quyền) là quyền hợp pháp của người sáng tạo đối với tác phẩm của mình (sách, ảnh, nhạc, video, phần mềm). Quyền này tự động phát sinh khi tác phẩm ra đời và được pháp luật bảo vệ.' },
      { h: '2. Quyền của tác giả' },
      { ul: [
        'Được đứng tên trên tác phẩm.',
        'Quyết định việc công bố, sao chép, sửa đổi.',
        'Được nhận thù lao khi tác phẩm được sử dụng.',
        'Cấm người khác sao chép, phát tán trái phép.',
      ] },
      { h: '3. Vi phạm thường gặp' },
      { ul: [
        'Copy bài của người khác làm thành bài của mình (đạo văn).',
        'Tải phim, nhạc, phần mềm lậu.',
        'Dùng ảnh trên mạng không xin phép, nhất là cho mục đích thương mại.',
        'Sao chép mã nguồn (code) mà không ghi nguồn.',
      ] },
      { h: '4. Creative Commons (CC)' },
      { p: 'Creative Commons là hệ thống giấy phép cho phép tác giả chia sẻ tác phẩm với một số điều kiện rõ ràng, giúp người khác tái sử dụng hợp pháp.' },
      { ul: [
        'CC0: tự do dùng hoàn toàn, không cần ghi nguồn.',
        'CC BY: được dùng nhưng phải ghi nguồn.',
        'CC BY-NC: được dùng nhưng KHÔNG thương mại.',
        'CC BY-SA: được dùng, sửa nhưng phải chia sẻ lại cùng giấy phép.',
      ] },
      { h: '5. Trích dẫn đúng cách' },
      { p: 'Khi dùng tác phẩm của người khác, ghi rõ tác giả, nguồn và năm. Ví dụ: "Theo Nguyễn Văn A (2024), ...". Trích dẫn vừa hợp pháp vừa thể hiện sự tôn trọng.' },
      { note: 'Nguyên tắc đơn giản trước khi dùng tác phẩm người khác: "Mình có được phép không?" Nếu không chắc — tìm nguồn có giấy phép tự do hoặc xin phép tác giả.' },
    ],
    [
      { q: 'Em tải một bức ảnh đẹp từ Google bỏ vào bài thuyết trình. Có thể vi phạm gì không?', a: 'Có thể vi phạm bản quyền nếu ảnh được bảo hộ và em không xin phép/ghi nguồn. An toàn hơn: dùng ảnh có giấy phép Creative Commons (lọc trong Google Images) hoặc lấy từ Unsplash, Pexels, và ghi rõ nguồn trên slide.' },
      { q: 'Copy nguyên một đoạn văn của bạn rồi nộp như bài của mình có sai không?', a: 'Sai. Đó là đạo văn — vừa vi phạm đạo đức (gian lận) vừa xâm phạm quyền tác giả của bạn. Nếu tham khảo ý của bạn, phải tự diễn đạt lại và ghi nguồn.' },
      { q: 'Một ảnh có giấy phép CC BY nghĩa là em được làm gì?', a: 'Em được dùng và chỉnh sửa ảnh đó, kể cả cho mục đích thương mại, nhưng BẮT BUỘC phải ghi rõ nguồn/tên tác giả. "BY" nghĩa là "ghi công" (attribution).' },
    ]
  ),

  'S8TIN-w32-quiz': L(
    'Đạo đức số — Ứng xử trên mạng xã hội',
    'Các em ơi, mạng xã hội phóng đại mọi hành vi — một lời tử tế lan rộng, mà một lời ác ý cũng vậy. Cùng cô học cách ứng xử văn minh và bảo vệ bản thân trên mạng.',
    ['Nắm các nguyên tắc ứng xử văn minh.', 'Hiểu và phòng chống bắt nạt mạng.', 'Bảo vệ thông tin cá nhân.', 'Biết suy nghĩ trước khi đăng/chia sẻ.'],
    [
      { h: '1. Nguyên tắc ứng xử trên mạng' },
      { ul: [
        'Tử tế trên mạng như khi giao tiếp ngoài đời.',
        'Suy nghĩ kĩ trước khi đăng, bình luận, chia sẻ.',
        'Không lan truyền tin chưa kiểm chứng.',
        'Tôn trọng ý kiến khác biệt, tranh luận văn minh.',
      ] },
      { h: '2. Quy tắc THINK trước khi đăng' },
      { ul: [
        'T (True) — có đúng sự thật không?',
        'H (Helpful) — có ích cho ai không?',
        'I (Inspiring) — có truyền cảm hứng không?',
        'N (Necessary) — có thật sự cần đăng không?',
        'K (Kind) — có tử tế, có làm tổn thương ai không?',
      ] },
      { h: '3. Bắt nạt mạng (Cyberbullying)' },
      { p: 'Là hành vi đe doạ, lăng mạ, bôi nhọ, cô lập người khác qua mạng (tin nhắn, ảnh chế, lập nhóm nói xấu). Hậu quả tinh thần rất nặng nề, có thể dẫn đến trầm cảm.' },
      { h: '4. Nếu em hoặc bạn bị bắt nạt mạng' },
      { ul: [
        'KHÔNG im lặng — nói với bố mẹ, thầy cô.',
        'Lưu bằng chứng (chụp màn hình tin nhắn, bình luận).',
        'Chặn (block) và báo cáo (report) kẻ bắt nạt.',
        'Đứng về phía nạn nhân, không cười hùa theo.',
      ] },
      { h: '5. Bảo vệ thông tin cá nhân' },
      { ul: [
        'Không công khai địa chỉ nhà, số điện thoại.',
        'Cẩn thận khi check-in vị trí thật theo thời gian thực.',
        'Đặt chế độ riêng tư cho trang cá nhân.',
        'Không nhận lời mời kết bạn từ người lạ.',
      ] },
      { note: 'Internet "không quên": mọi thứ em đăng đều có thể bị lưu lại, chụp lại dù em đã xoá. Hãy nghĩ kĩ — điều em đăng hôm nay có thể theo em nhiều năm sau.' },
    ],
    [
      { q: 'Một bạn bị chế giễu trong nhóm chat lớp. Em nên làm gì?', a: 'Đứng về phía bạn bị hại, không cười hùa theo. Có thể nhắn nhẹ nhàng đề nghị dừng lại, an ủi bạn, lưu lại screenshot làm bằng chứng và báo thầy cô nếu việc tiếp diễn. Im lặng đứng ngoài cũng vẫn nên báo người lớn.' },
      { q: 'Em định đăng ảnh kỳ nghỉ kèm địa chỉ khách sạn và lịch trình. Có nên không?', a: 'Không nên đăng theo thời gian thực. Điều đó tiết lộ em đang đi vắng (nhà trống → nguy cơ trộm) và vị trí cụ thể của em. Tốt nhất đăng ảnh sau khi đã về nhà, không kèm địa chỉ chi tiết.' },
      { q: 'Áp dụng quy tắc THINK, em định đăng một tin đồn chưa kiểm chứng về một bạn. Em quyết định ra sao?', a: 'Không đăng. Tin đó vi phạm chữ T (chưa chắc đúng sự thật) và chữ K (có thể làm tổn thương bạn). Quy tắc THINK giúp em dừng lại trước khi gây hại.' },
    ]
  ),

  'S8TIN-w33-quiz': L(
    'Trí tuệ nhân tạo (AI) trong đời sống',
    'Các em ơi, trí tuệ nhân tạo đang hiện diện khắp nơi: từ gợi ý video YouTube đến trợ lý ảo, công cụ tạo ảnh. Hiểu AI giúp em dùng nó một cách thông minh và có trách nhiệm.',
    ['Hiểu khái niệm AI và machine learning.', 'Kể được các ứng dụng AI quanh ta.', 'Nhận ra cơ hội AI mang lại.', 'Cảnh giác với nguy cơ và hạn chế của AI.'],
    [
      { h: '1. AI là gì?' },
      { p: 'Trí tuệ nhân tạo (Artificial Intelligence) là khả năng của máy tính thực hiện các việc vốn cần trí tuệ con người: học hỏi, suy luận, nhận dạng, ra quyết định. Ngày nay đa số AI dựa trên học máy (machine learning).' },
      { h: '2. Học máy (Machine Learning)' },
      { p: 'Thay vì lập trình từng quy tắc, người ta cho máy "học" từ rất nhiều dữ liệu mẫu để tự rút ra quy luật. Ví dụ, cho máy xem hàng triệu ảnh mèo, nó học cách nhận ra mèo.' },
      { h: '3. Ứng dụng AI quanh ta' },
      { ul: [
        'Trợ lý ảo: Siri, Google Assistant.',
        'Gợi ý nội dung: YouTube, TikTok, Netflix.',
        'Dịch máy: Google Translate.',
        'Tạo văn bản, ảnh: ChatGPT, các công cụ tạo ảnh.',
        'Y tế: hỗ trợ chẩn đoán bệnh từ ảnh chụp.',
        'Giao thông: xe tự lái, bản đồ thông minh.',
      ] },
      { h: '4. Cơ hội từ AI' },
      { ul: [
        'Hỗ trợ học tập: giải thích bài, gợi ý ý tưởng.',
        'Tăng năng suất, tự động hoá việc lặp lại.',
        'Giúp giải quyết các vấn đề lớn: y tế, môi trường.',
      ] },
      { h: '5. Nguy cơ và hạn chế' },
      { ul: [
        'AI có thể SAI (ảo giác — bịa thông tin nghe rất thật).',
        'Tin giả, ảnh/video giả mạo (deepfake) ngày càng tinh vi.',
        'Phụ thuộc quá mức làm mất khả năng tự suy nghĩ.',
        'Lo ngại về việc làm, quyền riêng tư, thiên kiến dữ liệu.',
      ] },
      { h: '6. Dùng AI thông minh' },
      { p: 'Coi AI là công cụ HỖ TRỢ, không phải để chép đáp án. Luôn kiểm tra lại thông tin AI đưa ra bằng nguồn đáng tin. Tự suy nghĩ trước, dùng AI để mở rộng và kiểm chứng.' },
      { note: 'AI giỏi xử lí khối lượng lớn nhưng không có sự thấu hiểu, cảm xúc và trách nhiệm như con người. Người dùng phải chịu trách nhiệm cuối cùng cho quyết định của mình.' },
    ],
    [
      { q: 'ChatGPT có thể giúp gì cho học sinh?', a: 'Giải thích lại bài khó, gợi ý ý tưởng, tóm tắt tài liệu, kiểm tra cách diễn đạt. Nhưng phải dùng để HỌC, kiểm tra lại thông tin nó đưa ra, và không sao chép nguyên văn rồi nộp như của mình.' },
      { q: 'Vì sao không nên tin AI 100%?', a: 'Vì AI có thể bịa thông tin sai mà nghe rất thuyết phục (gọi là ảo giác/hallucination), có thể mang thiên kiến từ dữ liệu huấn luyện. Luôn cần đối chiếu với nguồn đáng tin trước khi tin và dùng.' },
      { q: 'Deepfake là gì và vì sao đáng lo ngại?', a: 'Deepfake là ảnh/video/giọng nói giả do AI tạo ra, trông như thật. Đáng lo vì có thể bị dùng để bôi nhọ, lừa đảo (giả giọng người thân xin tiền), lan truyền tin giả. Cần kiểm chứng kỹ nguồn video/giọng nói đáng ngờ.' },
    ]
  ),

  'S8TIN-w34-quiz': L(
    'Dự án — Lập trình giải bài toán nhỏ',
    'Các em ơi, đã đến lúc vận dụng tất cả những gì đã học về Python để giải một bài toán thực tế từ đầu đến cuối. Đây là cách thật sự để trở thành người lập trình.',
    ['Phân tích yêu cầu bài toán (input/output).', 'Thiết kế thuật toán bằng các bước.', 'Cài đặt chương trình Python.', 'Kiểm thử và sửa lỗi (debug).'],
    [
      { h: '1. Quy trình giải bài toán bằng lập trình' },
      { ul: [
        'Bước 1: Hiểu rõ bài toán — xác định INPUT (dữ liệu vào) và OUTPUT (kết quả cần ra).',
        'Bước 2: Phác thảo thuật toán bằng lời/giả mã (pseudo-code).',
        'Bước 3: Cài đặt thành chương trình Python.',
        'Bước 4: Kiểm thử với nhiều bộ dữ liệu khác nhau.',
      ] },
      { h: '2. Phân tích bài toán' },
      { p: 'Trước khi viết code, hãy hỏi: Dữ liệu vào là gì? Kết quả mong muốn là gì? Có trường hợp đặc biệt nào không (số 0, dãy rỗng, dữ liệu sai)?' },
      { h: '3. Thiết kế thuật toán' },
      { p: 'Viết các bước giải bằng ngôn ngữ tự nhiên hoặc giả mã trước khi viết Python. Việc này giúp em tập trung vào CÁCH GIẢI thay vì lo cú pháp.' },
      { h: '4. Các ý tưởng dự án' },
      { ul: [
        'Quản lí điểm học sinh: nhập, lưu vào list, tìm, sắp xếp, tính trung bình.',
        'Trò chơi đoán số (1–100) với gợi ý "lớn quá"/"nhỏ quá".',
        'Tính tiền hoá đơn cửa hàng đơn giản.',
        'Đổi đơn vị (km↔m, °C↔°F), tính chỉ số BMI.',
      ] },
      { h: '5. Kiểm thử (testing)' },
      { ul: [
        'Thử với dữ liệu bình thường.',
        'Thử với trường hợp biên (số 0, số âm, dãy rỗng).',
        'Thử với dữ liệu sai (người dùng gõ chữ thay vì số).',
      ] },
      { h: '6. Gỡ lỗi (debug)' },
      { p: 'Khi chương trình sai, dùng print() để in giá trị các biến và theo dõi luồng chạy. Đọc kĩ thông báo lỗi — nó cho biết loại lỗi và dòng nào.' },
      { note: 'Lập trình tốt không phải là viết đúng ngay lần đầu, mà là biết tìm và sửa lỗi một cách kiên nhẫn, có hệ thống.' },
    ],
    [
      { q: 'Trong trò đoán số 1–100 với gợi ý "lớn quá"/"nhỏ quá", người chơi nên dùng chiến lược nào?', a: 'Dùng ý tưởng tìm kiếm nhị phân: luôn đoán giá trị GIỮA khoảng còn lại (bắt đầu 50). Theo gợi ý, thu hẹp một nửa mỗi lần. Cách này tìm ra số trong tối đa khoảng 7 lần đoán (log₂ 100).' },
      { q: 'Chương trình báo "IndentationError". Nguyên nhân và cách sửa?', a: 'Lỗi do thụt lề sai — có thể thiếu thụt lề sau dấu hai chấm, hoặc trộn dấu cách với Tab. Sửa: dùng nhất quán 4 dấu cách cho mỗi cấp thụt lề, các lệnh trong cùng khối phải thẳng hàng.' },
      { q: 'Hãy phân tích input/output cho bài "tính trung bình điểm của một lớp".', a: 'INPUT: số học sinh n và danh sách n điểm số. OUTPUT: điểm trung bình của lớp. Thuật toán: đọc các điểm vào một list, tính sum(list)/len(list). Lưu ý kiểm tra n > 0 để tránh chia cho 0.' },
    ]
  ),

  'S8TIN-w35-quiz': L(
    'Ôn tập cuối năm',
    'Các em ơi, trọn một năm Tin học 8 đã khép lại. Tuần cuối này cô trò mình hệ thống toàn bộ hành trình: từ những dòng Python đầu tiên đến thuật toán, an toàn thông tin và AI.',
    ['Hệ thống toàn bộ kiến thức Python.', 'Ôn lại tin học văn phòng và thuật toán.', 'Củng cố an toàn, đạo đức số và AI.', 'Định hướng học Tin học 9.'],
    [
      { h: '1. Python — nền tảng lập trình' },
      { ul: [
        'Biến, kiểu dữ liệu, toán tử, nhập/xuất.',
        'Rẽ nhánh if-elif-else; vòng lặp for, while.',
        'Cấu trúc dữ liệu: list, string, dictionary.',
        'Hàm: def, tham số, return.',
      ] },
      { h: '2. Thuật toán cơ bản' },
      { ul: [
        'Sắp xếp: chọn (selection), chèn (insertion); sort()/sorted().',
        'Tìm kiếm: tuyến tính O(n) và nhị phân O(log n).',
        'Khái niệm độ phức tạp thời gian.',
      ] },
      { h: '3. Tin học văn phòng' },
      { ul: [
        'Word: style, mục lục tự động, bảng, biểu đồ.',
        'Excel: công thức, hàm SUM/AVERAGE/IF, biểu đồ.',
        'Tham chiếu tương đối và tuyệt đối.',
      ] },
      { h: '4. An toàn và đạo đức số' },
      { ul: [
        'Mật khẩu mạnh, xác thực 2 yếu tố (2FA).',
        'Phòng chống phishing và malware.',
        'Quyền tác giả, Creative Commons, ứng xử mạng.',
      ] },
      { h: '5. Trí tuệ nhân tạo' },
      { ul: [
        'AI và học máy; ứng dụng quanh ta.',
        'Cơ hội và nguy cơ; dùng AI có trách nhiệm.',
        'Cảnh giác tin giả, deepfake.',
      ] },
      { h: '6. Định hướng Tin học 9' },
      { p: 'Lớp 9 sẽ đào sâu lập trình (hàm nâng cao, xử lí tệp), mô phỏng, phân tích dữ liệu và các chủ đề công nghệ mới. Nền tảng Python vững ở lớp 8 sẽ giúp em học tiếp thuận lợi.' },
      { note: 'Tin học là công cụ — biết cách dùng đúng, an toàn và thông minh quan trọng hơn việc nhớ thuộc lòng từng dòng cú pháp.' },
    ],
    [
      { q: 'Hãy nêu 3 thói quen an toàn thông tin em sẽ giữ.', a: 'Ví dụ: (1) Dùng mật khẩu mạnh và bật xác thực 2 yếu tố. (2) Không bấm link lạ, không đọc OTP cho ai. (3) Sao lưu dữ liệu định kì để phòng malware/ransomware.' },
      { q: 'AI có thể thay thế thầy cô được không?', a: 'Không hoàn toàn. AI hỗ trợ rất tốt (giải thích, luyện tập) nhưng không có cảm xúc, sự thấu hiểu, định hướng đạo đức và trách nhiệm như thầy cô. AI là công cụ bổ trợ, không thay thế người thầy.' },
      { q: 'So sánh tìm kiếm tuyến tính và nhị phân — khi nào dùng cái nào?', a: 'Tuyến tính O(n) dùng được cho mọi dãy (kể cả chưa sắp), phù hợp dãy nhỏ. Nhị phân O(log n) nhanh hơn nhiều nhưng yêu cầu dãy đã sắp xếp, phù hợp dãy lớn đã được sắp sẵn.' },
    ]
  ),

  'S8TIN-w36-quiz': L(
    'Kết thúc Tin Học 8 — Tư duy lập trình bước vào kỉ nguyên số',
    'Chào mừng đến tuần học cuối của Tin Học 8! Năm nay em đã học lập trình Python thực sự — viết code chạy được, giải bài toán và hiểu thuật toán. Em cũng hiểu sâu hơn về an toàn thông tin và trí tuệ nhân tạo — những chủ đề quan trọng nhất của thế kỉ XXI. Hãy nhìn lại hành trình đó để tự tin bước tiếp!',
    [
      'Tổng hợp các chủ đề lớn của Tin Học 8: Python cơ bản, thuật toán, an toàn thông tin và AI.',
      'Ôn lại cú pháp Python trọng tâm và các thuật toán đã học.',
      'Hiểu định hướng Tin Học lớp 9 và cách phát triển tư duy lập trình.',
    ],
    [
      { h: '1. Python cơ bản' },
      { ul: [
        'Kiểu dữ liệu: int, float, str, bool, list, tuple, dict.',
        'Vào/ra dữ liệu: input() (trả về str, cần int()/float() để đổi kiểu), print() (f-string: f"Kết quả: {x}").',
        'Toán tử: số học (+, -, *, /, //, %, **), so sánh (==, !=, <, >, <=, >=), logic (and, or, not).',
        'Cấu trúc rẽ nhánh: if/elif/else.',
        'Vòng lặp: for item in list / for i in range(n), while (điều kiện); break và continue.',
        'Hàm (function): def func_name(params): ... return value; tầm quan trọng của docstring.',
        'List: indexing [i], slicing [a:b], len(), append(), remove(), sort().',
      ] },
      { h: '2. Thuật toán' },
      { ul: [
        'Khái niệm: tính đúng đắn, hữu hạn, xác định, hiệu quả; biểu diễn bằng ngôn ngữ tự nhiên, sơ đồ khối (flowchart), giả mã.',
        'Tìm kiếm tuyến tính: duyệt từng phần tử, O(n), dùng cho mọi dãy.',
        'Tìm kiếm nhị phân: cần dãy đã sắp, chia đôi mỗi bước, O(log n).',
        'Sắp xếp nổi bọt (Bubble Sort): so sánh hai phần tử kề nhau và đổi chỗ, O(n²), dễ cài đặt.',
        'Đánh giá độ phức tạp thời gian (Big-O): O(1), O(log n), O(n), O(n log n), O(n²).',
      ] },
      { h: '3. An toàn thông tin' },
      { ul: [
        'Mật khẩu mạnh: ≥ 12 kí tự, kết hợp HOA, thường, số, đặc biệt; không dùng ngày sinh, tên người thân.',
        'Xác thực 2 yếu tố (2FA): lớp bảo vệ thứ hai ngoài mật khẩu.',
        'Phishing và social engineering: nhận biết email/tin nhắn lừa đảo, không bấm link lạ, không tiết lộ OTP.',
        'Malware, ransomware: sao lưu dữ liệu định kì; cài phần mềm diệt virus; không cài phần mềm lậu.',
        'Quyền tác giả và Creative Commons: không sao chép trái phép; trích dẫn nguồn.',
        'Ứng xử mạng: không bắt nạt trực tuyến, không phát tán thông tin sai lệch (tin giả, deepfake).',
      ] },
      { h: '4. Trí tuệ nhân tạo (AI)' },
      { ul: [
        'AI là gì: máy tính thực hiện các nhiệm vụ đòi hỏi trí tuệ người (nhận diện ảnh, xử lí ngôn ngữ, ra quyết định).',
        'Học máy (Machine Learning): hệ thống học từ dữ liệu thay vì được lập trình tường minh.',
        'Ứng dụng quanh ta: gợi ý YouTube/Netflix, trợ lí ảo (Siri, Google), xe tự lái, chẩn đoán y tế.',
        'Cơ hội và nguy cơ: năng suất tăng, nhiều công việc mới xuất hiện; nhưng cũng gây mất việc làm, lo ngại về quyền riêng tư và thiên kiến (bias).',
        'Dùng AI có trách nhiệm: kiểm chứng thông tin AI đưa ra, không dùng AI để gian lận hay tạo nội dung có hại.',
      ] },
      { h: '5. Định hướng Tin Học lớp 9' },
      { ul: [
        'Python nâng cao: hàm đệ quy, xử lí tệp văn bản (open/read/write), từ điển nâng cao, module.',
        'Thuật toán nâng cao: sắp xếp chọn, sắp xếp chèn; phân tích và tối ưu chương trình.',
        'Cơ sở dữ liệu cơ bản: khái niệm CSDL, bảng, truy vấn đơn giản.',
        'Dự án nhỏ: viết chương trình giải bài toán thực tế — bước đầu trải nghiệm lập trình dự án.',
      ] },
      { note: 'Lập trình là ngôn ngữ của thế kỉ XXI — biết lập trình không chỉ giúp em làm việc tốt hơn mà còn giúp em tư duy rõ ràng, giải quyết vấn đề có hệ thống. Hãy giữ thói quen viết code mỗi ngày, dù chỉ 15 phút!' },
    ],
    [
      { q: 'Viết hàm Python đếm số phần tử chẵn trong một danh sách.', a: 'def dem_chan(lst):\n    return sum(1 for x in lst if x % 2 == 0)\n# Ví dụ: dem_chan([1, 2, 3, 4, 6]) → 3 (các số chẵn: 2, 4, 6).' },
      { q: 'Dãy [3, 1, 4, 1, 5, 9, 2, 6]. Tìm kiếm nhị phân số 5 có áp dụng được không? Vì sao?', a: 'Không áp dụng được ngay, vì tìm kiếm nhị phân yêu cầu dãy đã sắp xếp tăng dần. Cần sắp xếp trước: [1, 1, 2, 3, 4, 5, 6, 9], rồi mới tìm nhị phân số 5 tại chỉ số 5.' },
      { q: 'Tại sao không nên dùng cùng một mật khẩu cho nhiều tài khoản?', a: 'Nếu một dịch vụ bị rò rỉ dữ liệu và mật khẩu bị lộ, kẻ xấu sẽ thử mật khẩu đó trên tất cả các dịch vụ khác (credential stuffing attack). Dùng mật khẩu khác nhau cho mỗi tài khoản đảm bảo dù một tài khoản bị xâm phạm, các tài khoản khác vẫn an toàn. Dùng trình quản lí mật khẩu (password manager) để không cần nhớ hết.' },
    ]
  ),
};
