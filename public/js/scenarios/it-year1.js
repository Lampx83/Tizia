// ============================================================
// Trường CNTT — Scenarios Năm 1 (I1.1 → I1.5)
// ============================================================
// Soạn theo chương trình Cử nhân CNTT/KHMT VN (UET, HUST, FPT…).
// Mỗi câu có explanation giải thích kỹ để sinh viên năm 1 tự học.
// ============================================================

// ─── I1.1 · Nhập môn lập trình (Python) ─────────────────────
export const I11_QUIZ = {
  id: 'I1.1-python-quiz',
  title: 'I1.1 · Nhập môn lập trình Python — Cú pháp & Kiểu dữ liệu',
  kind: 'quiz',
  yearLevel: 1, subject: 'lap-trinh-co-ban', difficulty: 1,
  skillsTrained: ['bien-python', 'kieu-du-lieu', 'vong-lap', 'ham', 'list-comprehension'],
  questions: [
    {
      stem: 'Trong Python, lệnh nào in ra "Xin chào EduVerse" ra màn hình?',
      choices: [
        'echo("Xin chào EduVerse")',
        'print("Xin chào EduVerse")',
        'console.log("Xin chào EduVerse")',
        'System.out.println("Xin chào EduVerse")',
      ],
      answer: 1,
      explanation: 'Python dùng hàm built-in print() để xuất ra màn hình. echo() là lệnh shell, console.log() là JavaScript, System.out.println() là Java. Python không cần dấu chấm phẩy cuối dòng và không cần khai báo kiểu biến.',
    },
    {
      stem: 'Kết quả của biểu thức Python: 7 // 2 là gì?',
      choices: ['3.5', '3', '4', '2'],
      answer: 1,
      explanation: '// là toán tử chia lấy phần nguyên (floor division) trong Python. 7 // 2 = 3 (bỏ phần thập phân). Để chia thập phân dùng /: 7 / 2 = 3.5. Toán tử % là chia lấy dư: 7 % 2 = 1.',
    },
    {
      stem: 'Đoạn code: for i in range(3): print(i) — in ra những số nào?',
      choices: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'],
      answer: 1,
      explanation: 'range(3) tạo dãy [0, 1, 2] — bắt đầu từ 0, không bao gồm 3. Python dùng 0-indexing. range(start, stop, step): range(1,4) → [1,2,3]; range(0,6,2) → [0,2,4]. Đây là cạm bẫy phổ biến nhất với người mới học Python.',
    },
    {
      stem: 'Kiểu dữ liệu nào trong Python là BẤT BIẾN (immutable)?',
      choices: ['list', 'dict', 'set', 'tuple'],
      answer: 3,
      explanation: 'Tuple là bất biến (immutable) — không thể thay đổi phần tử sau khi tạo. List, dict, set đều có thể thay đổi (mutable). Bất biến quan trọng vì tuple có thể làm key trong dict; list thì không. t = (1, 2, 3); t[0] = 5 → TypeError!',
    },
    {
      stem: 'Trong Python, "đệ quy" (recursion) là kỹ thuật:',
      choices: [
        'Vòng lặp for chạy nhiều lần',
        'Hàm gọi lại chính nó',
        'Import thư viện bên ngoài',
        'Ghi dữ liệu ra file',
      ],
      answer: 1,
      explanation: 'Đệ quy: hàm tự gọi lại chính nó. Mọi đệ quy cần (1) điều kiện dừng (base case) và (2) lời gọi đệ quy thu nhỏ vấn đề. Ví dụ factorial(n): factorial(0)=1 (base), factorial(n)=n*factorial(n-1). Python giới hạn độ sâu đệ quy mặc định ~1000.',
    },
    {
      stem: 'Phương thức nào thêm phần tử vào CUỐI danh sách (list) trong Python?',
      choices: ['list.add(x)', 'list.insert(x)', 'list.append(x)', 'list.push(x)'],
      answer: 2,
      explanation: 'list.append(x) thêm x vào cuối list — O(1) thời gian. Các phương thức list khác: insert(i, x) chèn tại vị trí i — O(n); extend([y,z]) nối list; remove(x) xóa lần xuất hiện đầu tiên của x; pop() lấy và xóa phần tử cuối. add() là phương thức của set, không phải list.',
    },
    {
      stem: 'Khi truy cập index ngoài phạm vi list, Python báo lỗi gì?',
      choices: ['TypeError', 'ValueError', 'IndexError', 'KeyError'],
      answer: 2,
      explanation: 'IndexError: index out of range — khi dùng index vượt quá giới hạn list. KeyError xảy ra với dict (key không tồn tại). TypeError khi toán tử/hàm không hỗ trợ kiểu đó. ValueError khi hàm nhận đối số sai giá trị (vd: int("abc")). Nhớ: Python cho phép index âm (-1 = phần tử cuối).',
    },
    {
      stem: 'Điều kiện if trong Python cần:',
      choices: [
        'Dấu ngoặc đơn () bắt buộc quanh điều kiện',
        'Dấu ngoặc nhọn {} để khối lệnh',
        'Dấu hai chấm : sau điều kiện và thụt lề khối',
        'Từ khóa then sau điều kiện',
      ],
      answer: 2,
      explanation: 'Python dùng thụt lề (indentation) thay vì {} như Java/C. Cú pháp: if condition: (có dấu :). Khối lệnh thụt vào 4 dấu cách. Không cần () quanh điều kiện (nhưng được phép). Không có từ khóa "then" như Pascal. Đây là đặc điểm làm Python dễ đọc hơn nhiều ngôn ngữ khác.',
    },
    {
      stem: 'List comprehension [x*2 for x in range(4)] cho kết quả:',
      choices: ['[0, 2, 4, 6]', '[1, 2, 4, 8]', '[2, 4, 6, 8]', '[0, 1, 2, 3]'],
      answer: 0,
      explanation: 'range(4) = [0,1,2,3]. Với mỗi x: x*2 → [0,2,4,6]. List comprehension cú pháp: [biểu_thức for biến in iterable if điều_kiện]. Ví dụ nâng cao: [x**2 for x in range(10) if x%2==0] → bình phương các số chẵn từ 0 đến 8. Ngắn gọn và Pythonic hơn vòng for thông thường.',
    },
    {
      stem: 'Sự khác biệt chính giữa list và tuple trong Python là:',
      choices: [
        'List lưu số, tuple lưu chuỗi',
        'List dùng [], tuple dùng () và tuple bất biến',
        'Tuple nhanh hơn trong mọi trường hợp',
        'List không thể lồng nhau, tuple có thể',
      ],
      answer: 1,
      explanation: 'List: [1,2,3] — mutable, có thể thêm/xóa/sửa. Tuple: (1,2,3) — immutable, không thể thay đổi sau khi tạo. Tuple thường dùng cho dữ liệu cố định (toạ độ, RGB), an toàn hơn và nhẹ hơn. Cả hai đều có thể lồng nhau và lưu bất kỳ kiểu dữ liệu. Tuple có thể làm key dict vì immutable.',
    },
  ],
};

// ─── I1.2 · Toán rời rạc ────────────────────────────────────
export const I12_QUIZ = {
  id: 'I1.2-discrete-math-quiz',
  title: 'I1.2 · Toán rời rạc — Logic, Tập hợp & Đồ thị',
  kind: 'quiz',
  yearLevel: 1, subject: 'toan-roi-rac', difficulty: 2,
  skillsTrained: ['menh-de', 'tap-hop', 'to-hop', 'do-thi', 'chung-minh'],
  questions: [
    {
      stem: 'Mệnh đề P → Q (P kéo theo Q) tương đương với mệnh đề nào?',
      choices: ['Q → P', '¬P → ¬Q', '¬P ∨ Q', 'P ∧ ¬Q'],
      answer: 2,
      explanation: 'P → Q ≡ ¬P ∨ Q (phủ định P hoặc Q đúng). Dễ nhớ: "nếu P thì Q" — P sai thì kéo theo bất kỳ Q nào cũng đúng; P đúng thì Q phải đúng. Q → P là đảo chiều (converse) — không tương đương. ¬Q → ¬P là đảo phủ (contrapositive) — tương đương với P → Q. ¬P → ¬Q là nghịch đảo (inverse) — không tương đương.',
    },
    {
      stem: 'Nếu |A| = 5, |B| = 6 và |A ∩ B| = 2, thì |A ∪ B| = ?',
      choices: ['13', '11', '9', '7'],
      answer: 2,
      explanation: 'Nguyên lý bù trừ (Inclusion-Exclusion): |A ∪ B| = |A| + |B| − |A ∩ B| = 5 + 6 − 2 = 9. Nếu cộng thêm |A ∩ B| ta đếm vùng giao nhau hai lần, nên phải trừ đi. Mở rộng cho 3 tập: |A∪B∪C| = |A|+|B|+|C| − |A∩B| − |B∩C| − |A∩C| + |A∩B∩C|.',
    },
    {
      stem: 'C(8, 3) (chọn 3 phần tử từ 8 phần tử) bằng bao nhiêu?',
      choices: ['56', '24', '336', '40320'],
      answer: 0,
      explanation: 'C(n,k) = n! / (k! × (n−k)!) = 8! / (3! × 5!) = (8×7×6) / (3×2×1) = 336/6 = 56. C(8,3) đếm số cách chọn 3 phần tử từ 8 phần tử KHÔNG quan tâm thứ tự. Nếu quan tâm thứ tự dùng P(8,3) = 8×7×6 = 336 (hoán vị). Ứng dụng: chọn đội, xác suất tổ hợp.',
    },
    {
      stem: 'Định lý Handshaking (Bắt tay) trong lý thuyết đồ thị phát biểu:',
      choices: [
        'Mọi đồ thị đều có chu trình Euler',
        'Tổng bậc tất cả đỉnh bằng 2 lần số cạnh',
        'Số đỉnh luôn lớn hơn số cạnh',
        'Đồ thị liên thông nếu mọi đỉnh có bậc ≥ 2',
      ],
      answer: 1,
      explanation: 'Định lý Handshaking: Σ deg(v) = 2|E|. Mỗi cạnh đóng góp 2 đơn vị vào tổng bậc (1 cho mỗi đỉnh đầu mút). Hệ quả: số đỉnh bậc lẻ luôn chẵn. Ứng dụng: trong mạng xã hội, tổng số kết bạn của tất cả người dùng = 2 × số quan hệ.',
    },
    {
      stem: '15 ≡ ? (mod 4) — 15 đồng dư bao nhiêu theo modulo 4?',
      choices: ['0', '1', '3', '2'],
      answer: 2,
      explanation: '15 = 4 × 3 + 3, nên 15 ≡ 3 (mod 4). Modulo là phép chia lấy dư: a ≡ b (mod m) nghĩa là m chia hết (a − b). Ứng dụng rất rộng trong CNTT: hash table, mã hoá RSA, kiểm tra chẵn/lẻ, địa chỉ IP subnet. Python: 15 % 4 == 3.',
    },
    {
      stem: 'Phủ định của mệnh đề "Tất cả sinh viên đều chăm học" là:',
      choices: [
        'Không có sinh viên nào chăm học',
        'Có ít nhất một sinh viên không chăm học',
        'Tất cả sinh viên đều không chăm học',
        'Một số sinh viên chăm học',
      ],
      answer: 1,
      explanation: 'Phủ định ∀x P(x) là ∃x ¬P(x). "Tất cả (∀) sinh viên chăm học" → phủ định: "Tồn tại (∃) ít nhất một sinh viên KHÔNG chăm học". Lỗi thường gặp: phủ định ∀ thành ∀ ¬P (sai — đó là "không ai chăm"). Phủ định ∃ thành ∀ ¬P: "không tồn tại" → "tất cả đều không".',
    },
    {
      stem: 'Trong cây nhị phân tìm kiếm (BST), nút gốc (root) thỏa mãn:',
      choices: [
        'Là nút lớn nhất trong cây',
        'Mọi nút con trái < root < mọi nút con phải',
        'Luôn là nút lá (leaf)',
        'Có đúng 2 con',
      ],
      answer: 1,
      explanation: 'BST property: với mỗi nút: giá trị cây con trái < nút < giá trị cây con phải. Tìm kiếm O(log n) cho cây cân bằng. Duyệt inorder (trái → nút → phải) cho kết quả tăng dần. Thao tác insert/delete/search đều O(h) với h là chiều cao. Cây lệch (skewed) → h = n → O(n).',
    },
    {
      stem: 'Thuật toán tìm kiếm nhị phân (binary search) yêu cầu mảng:',
      choices: [
        'Không cần điều kiện gì',
        'Đã được sắp xếp',
        'Chỉ chứa số nguyên',
        'Có độ dài là luỹ thừa của 2',
      ],
      answer: 1,
      explanation: 'Binary search yêu cầu mảng đã SẮP XẾP. Ý tưởng: so sánh với phần tử giữa, loại bỏ nửa không chứa target, lặp lại. Độ phức tạp O(log n) — rất nhanh so với linear search O(n). Nếu n=1 tỉ: linear search tối đa 10⁹ bước, binary search tối đa 30 bước (2³⁰ ≈ 10⁹).',
    },
    {
      stem: 'Hàm f: A → B được gọi là đơn ánh (injective/one-to-one) khi:',
      choices: [
        'Mỗi phần tử của B được ánh xạ từ đúng 1 phần tử của A',
        'Mọi phần tử của B đều là ảnh của ít nhất 1 phần tử A',
        'Các phần tử A khác nhau luôn cho ảnh khác nhau trong B',
        'f(A) = B (tập ảnh bằng tập đích)',
      ],
      answer: 2,
      explanation: 'Đơn ánh (injection/one-to-one): a₁ ≠ a₂ → f(a₁) ≠ f(a₂) (hay f(a₁)=f(a₂) → a₁=a₂). Toàn ánh (surjection/onto): ∀b∈B, ∃a∈A: f(a)=b — đáp án C. Song ánh (bijection): vừa đơn vừa toàn. Song ánh cho phép tồn tại hàm ngược f⁻¹. Trong mật mã, song ánh bảo đảm tính khả nghịch.',
    },
    {
      stem: 'Tập lũy thừa (power set) của A = {1, 2} có bao nhiêu phần tử?',
      choices: ['2', '4', '8', '3'],
      answer: 1,
      explanation: 'Power set P(A) chứa mọi tập con của A, bao gồm ∅ và A. |P(A)| = 2^|A|. Với A = {1,2}: P(A) = {∅, {1}, {2}, {1,2}} — 4 phần tử = 2² = 4. Ứng dụng: NP-hard problems thường duyệt power set (subset sum, knapsack vét cạn). Với |A|=20 → 2²⁰ ≈ 1 triệu; |A|=50 → 2⁵⁰ ≈ 10¹⁵ (không khả thi).',
    },
  ],
};

// ─── I1.3 · Kiến trúc máy tính ──────────────────────────────
export const I13_QUIZ = {
  id: 'I1.3-computer-arch-quiz',
  title: 'I1.3 · Kiến trúc máy tính — CPU, Bộ nhớ & Hệ số đếm',
  kind: 'quiz',
  yearLevel: 1, subject: 'kien-truc-may-tinh', difficulty: 2,
  skillsTrained: ['he-so-dem', 'cpu', 'bo-nho', 'cache', 'pipeline'],
  questions: [
    {
      stem: 'Số nhị phân 1011₂ bằng bao nhiêu trong hệ thập phân?',
      choices: ['9', '10', '11', '13'],
      answer: 2,
      explanation: '1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11. Quy tắc: mỗi bit nhân với 2ⁿ (n từ phải sang trái bắt đầu từ 0). Ngược lại, 11 → nhị phân: 11÷2=5 dư 1, 5÷2=2 dư 1, 2÷2=1 dư 0, 1÷2=0 dư 1 → đọc từ dưới lên: 1011.',
    },
    {
      stem: 'Chu trình Fetch-Decode-Execute (FDE) mô tả:',
      choices: [
        'Quy trình khởi động máy tính',
        'Cách CPU thực thi lệnh: nạp, giải mã, thực thi',
        'Cách dữ liệu lưu vào ổ cứng',
        'Giao tiếp giữa CPU và GPU',
      ],
      answer: 1,
      explanation: 'FDE cycle: (1) Fetch — PC (Program Counter) trỏ địa chỉ lệnh, nạp từ RAM vào IR (Instruction Register); (2) Decode — Control Unit giải mã lệnh, xác định phép toán và toán hạng; (3) Execute — ALU thực hiện phép toán, cập nhật thanh ghi/bộ nhớ. PC tăng lên để trỏ lệnh kế tiếp. Hiện đại: pipelining chồng chéo các giai đoạn.',
    },
    {
      stem: 'Bộ nhớ đệm (cache) L1 trong CPU có đặc điểm:',
      choices: [
        'Dung lượng lớn nhất, tốc độ thấp nhất',
        'Nằm ngoài chip CPU, nối qua bus',
        'Nhỏ nhất, nhanh nhất, gần CPU nhất',
        'Dùng để lưu trữ lâu dài như ổ cứng',
      ],
      answer: 2,
      explanation: 'Phân cấp bộ nhớ (memory hierarchy): L1 cache (KB, ~1ns) → L2 cache (MB, ~5ns) → L3 cache (MB-GB, ~30ns) → RAM (GB, ~100ns) → SSD (TB, ~100μs) → HDD (TB, ~10ms). L1 nhanh nhất, gần CPU nhất, nhỏ nhất. Nguyên lý locality: CPU thường dùng lại dữ liệu vừa dùng (temporal) hoặc dữ liệu kề cạnh (spatial).',
    },
    {
      stem: 'Kiến trúc Von Neumann khác với Harvard ở điểm nào?',
      choices: [
        'Von Neumann có nhiều CPU hơn',
        'Von Neumann dùng chung bus cho lệnh và dữ liệu; Harvard dùng bus riêng',
        'Harvard không có RAM',
        'Von Neumann chỉ dùng cho máy tính cá nhân',
      ],
      answer: 1,
      explanation: 'Von Neumann: lệnh và dữ liệu lưu chung một bộ nhớ, dùng chung bus → đơn giản hơn nhưng tạo "Von Neumann bottleneck". Harvard: bộ nhớ lệnh và bộ nhớ dữ liệu tách biệt, bus riêng → song song truy cập, nhanh hơn. Vi điều khiển (Arduino, PIC) dùng Harvard. PC hiện đại dùng Modified Harvard (L1 cache tách lệnh/dữ liệu).',
    },
    {
      stem: 'Số hex FF₁₆ bằng bao nhiêu trong hệ thập phân?',
      choices: ['255', '256', '128', '15'],
      answer: 0,
      explanation: 'F₁₆ = 15₁₀. FF₁₆ = 15×16 + 15 = 240 + 15 = 255. Hex tiện lợi vì 1 nibble (4 bit) = 1 chữ số hex: 0000=0, 1111=F. 1 byte = 8 bit = 2 chữ số hex (00–FF = 0–255). Ứng dụng: màu RGB (FF0000 = đỏ), địa chỉ bộ nhớ, mã lỗi hệ thống.',
    },
    {
      stem: 'RAM (Random Access Memory) là bộ nhớ:',
      choices: [
        'Không mất dữ liệu khi tắt điện (non-volatile)',
        'Mất dữ liệu khi tắt điện (volatile)',
        'Chỉ đọc được, không ghi được',
        'Dùng để lưu firmware BIOS',
      ],
      answer: 1,
      explanation: 'RAM là bộ nhớ volatile — dữ liệu mất khi mất điện. RAM lưu chương trình đang chạy và dữ liệu đang xử lý. Non-volatile: ROM, Flash, SSD, HDD — lưu dữ liệu kể cả khi tắt nguồn. BIOS/firmware lưu trong Flash ROM (EEPROM). DRAM (Dynamic RAM) cần làm mới liên tục (refresh); SRAM (Static RAM) nhanh hơn, dùng cho cache.',
    },
    {
      stem: 'Pipelining trong CPU cho phép:',
      choices: [
        'Chạy nhiều chương trình đồng thời',
        'Chồng chéo các giai đoạn FDE của nhiều lệnh liên tiếp',
        'Tăng dung lượng bộ nhớ cache',
        'Kết nối nhiều CPU với nhau',
      ],
      answer: 1,
      explanation: 'Pipeline: khi lệnh 1 đang Execute, lệnh 2 đang Decode, lệnh 3 đang Fetch — cùng lúc. Giống dây chuyền nhà máy. CPU 5-stage pipeline (IF, ID, EX, MEM, WB) lý tưởng cho throughput tăng 5x. Vấn đề: hazard (data hazard, control hazard khi branch). Giải pháp: stall, forwarding, branch prediction.',
    },
    {
      stem: 'Biểu diễn số nguyên âm −5 theo phương pháp bù 2 (two\'s complement) trong 4 bit là:',
      choices: ['1101', '1010', '1011', '0101'],
      answer: 2,
      explanation: 'Bù 2 của −5: (1) Viết +5 = 0101; (2) Đảo bit: 1010; (3) Cộng 1: 1011. Kiểm tra: 0101 + 1011 = 10000 (bỏ bit carry → 0000 = 0) ✓. Bù 2 tiện lợi vì phép cộng số âm và dương dùng cùng mạch cộng. Range 4-bit bù 2: −8 đến +7.',
    },
    {
      stem: 'ALU (Arithmetic Logic Unit) trong CPU thực hiện:',
      choices: [
        'Nạp lệnh từ bộ nhớ',
        'Giải mã lệnh và điều khiển CPU',
        'Phép tính số học và logic nhị phân',
        'Quản lý bộ nhớ và cache',
      ],
      answer: 2,
      explanation: 'ALU thực hiện phép tính số học (cộng, trừ, nhân, chia) và logic (AND, OR, NOT, XOR, dịch bit). CPU có 3 thành phần chính: ALU (tính toán), Control Unit/CU (điều khiển luồng thực thi), Registers (lưu trữ tạm thời tốc độ cao). CU giải mã lệnh từ IR và ra tín hiệu điều khiển ALU, bus, bộ nhớ.',
    },
    {
      stem: 'Đơn vị lưu trữ nào phù hợp nhất với ổ SSD dung lượng hiện đại?',
      choices: ['Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
      answer: 3,
      explanation: 'SSD hiện đại thường có dung lượng 256GB đến 4TB. Thứ tự đơn vị: 1 TB = 1024 GB = 1024² MB = 1024³ KB = 1024⁴ B. Quy tắc nhớ: file text ~ KB; ảnh JPEG ~ MB; video HD ~ GB; ổ cứng/SSD ~ TB. RAM hiện đại: 8–64 GB. File chương trình đơn giản: vài KB đến vài MB.',
    },
  ],
};

// ─── I1.4 · Hệ điều hành (Linux căn bản) ────────────────────
export const I14_QUIZ = {
  id: 'I1.4-linux-quiz',
  title: 'I1.4 · Hệ điều hành Linux — Lệnh, Quyền & Tiến trình',
  kind: 'quiz',
  yearLevel: 1, subject: 'he-dieu-hanh', difficulty: 2,
  skillsTrained: ['lenh-linux', 'quyen-tap-tin', 'tien-trinh', 'filesystem', 'shell'],
  questions: [
    {
      stem: 'Lệnh Linux nào liệt kê các file và thư mục trong thư mục hiện tại (bao gồm file ẩn)?',
      choices: ['ls', 'ls -a', 'dir', 'show'],
      answer: 1,
      explanation: 'ls -a liệt kê TẤT CẢ file, bao gồm file ẩn (tên bắt đầu bằng dấu chấm như .bashrc, .gitignore). ls không hiện file ẩn. ls -l hiện chi tiết (quyền, kích thước, ngày). ls -la kết hợp cả hai. Trong Linux, file ẩn là cơ chế bảo vệ cấu hình khỏi bị xóa vô ý.',
    },
    {
      stem: 'Quyền file "rwxr-xr--" trong Linux có nghĩa là:',
      choices: [
        'Owner: đọc-ghi-chạy; Group: đọc-chạy; Others: đọc',
        'Owner: đọc-ghi; Group: chạy; Others: không',
        'Tất cả có thể đọc, ghi, chạy',
        'Chỉ owner được truy cập',
      ],
      answer: 0,
      explanation: 'rwxr-xr-- phân tích: [rwx][r-x][r--]. Owner (u): r=đọc, w=ghi, x=chạy → full quyền. Group (g): r=đọc, -=không ghi, x=chạy. Others (o): r=đọc, -=không ghi, -=không chạy. Dạng số: rwx=7, r-x=5, r--=4 → 754. Lệnh: chmod 754 file.sh',
    },
    {
      stem: 'Lệnh "chmod 755 script.sh" trong Linux có nghĩa là:',
      choices: [
        'Xóa quyền chạy của script.sh',
        'Owner: rwx (7); Group: r-x (5); Others: r-x (5)',
        'Đổi chủ sở hữu file sang user 755',
        'Tạo file mới tên 755',
      ],
      answer: 1,
      explanation: 'chmod dùng số octal: r=4, w=2, x=1. 7=4+2+1=rwx; 5=4+0+1=r-x; 5=r-x. 755 là quyền phổ biến cho script thực thi: owner có toàn quyền, group và others chỉ đọc và chạy. Script web server thường dùng 755. File nhạy cảm (private key): 600 (rw-------)',
    },
    {
      stem: 'Trong Linux, sự khác biệt giữa "process" và "program" là:',
      choices: [
        'Hoàn toàn giống nhau',
        'Program là file thực thi trên đĩa; Process là instance đang chạy trong RAM',
        'Process là file source code; Program là file đã biên dịch',
        'Program chạy trong kernel; Process chạy trong user space',
      ],
      answer: 1,
      explanation: 'Program (chương trình): file thực thi tĩnh trên đĩa (vd: /usr/bin/python3). Process (tiến trình): instance đang chạy trong bộ nhớ, có PID, stack, heap, file descriptors. Một program có thể tạo nhiều processes (vd: Chrome mở nhiều process). Process trạng thái: Running, Sleeping, Zombie, Stopped.',
    },
    {
      stem: 'Lệnh "ps aux" trong Linux dùng để:',
      choices: [
        'Liệt kê tất cả file trong thư mục',
        'Xem tất cả tiến trình đang chạy',
        'In ra nội dung file',
        'Cài đặt phần mềm mới',
      ],
      answer: 1,
      explanation: 'ps aux hiện tất cả processes: a=tất cả user, u=chi tiết user/CPU/RAM, x=processes không gắn terminal. Cột quan trọng: PID (ID tiến trình), %CPU, %MEM, COMMAND. Kết hợp: ps aux | grep python → tìm processes Python. Cách khác: top (real-time), htop (giao diện đẹp hơn).',
    },
    {
      stem: 'Thư mục "/etc" trong hệ thống Linux thường chứa:',
      choices: [
        'File thực thi (executable) của hệ thống',
        'File cấu hình hệ thống và ứng dụng',
        'File tạm thời',
        'Thư mục home của root',
      ],
      answer: 1,
      explanation: 'Cấu trúc Linux theo FHS (Filesystem Hierarchy Standard): /etc = cấu hình hệ thống (/etc/passwd, /etc/nginx/nginx.conf). /bin, /usr/bin = lệnh cơ bản. /var = dữ liệu biến đổi (logs). /tmp = file tạm. /home = thư mục người dùng. /root = home của root. /proc = virtual filesystem cho processes.',
    },
    {
      stem: 'Lệnh "grep -r \'error\' /var/log/" thực hiện:',
      choices: [
        'Xóa tất cả file chứa từ "error" trong /var/log/',
        'Tìm kiếm đệ quy chuỗi "error" trong tất cả file thuộc /var/log/',
        'Tạo file mới tên "error" trong /var/log/',
        'Hiện thông tin RAM trống',
      ],
      answer: 1,
      explanation: 'grep (Global Regular Expression Print) tìm chuỗi trong file. -r (recursive) tìm trong tất cả file của thư mục và thư mục con. Kết quả hiện tên file:số dòng:nội dung. Thêm -i để không phân biệt hoa/thường; -n hiện số dòng; -l chỉ hiện tên file. Dùng regex: grep -r "ERR[0-9]+" /var/log/',
    },
    {
      stem: 'Ký hiệu "|" (pipe) trong lệnh Linux "ls -l | grep .txt" có nghĩa là:',
      choices: [
        'Toán tử OR logic',
        'Chuyển output của lệnh trước làm input của lệnh sau',
        'Chạy 2 lệnh song song',
        'Ký tự phân cách tên file',
      ],
      answer: 1,
      explanation: 'Pipe (|) là triết lý Unix: "làm một việc, làm tốt". ls -l tạo danh sách chi tiết → pipe chuyển cho grep lọc dòng chứa ".txt". Kết hợp mạnh: cat log.txt | grep ERROR | sort | uniq -c | sort -rn | head -10 (top 10 lỗi phổ biến). Pipe thực hiện left-to-right, kết nối stdout → stdin.',
    },
    {
      stem: 'Lệnh "head -20 file.log" trong Linux hiển thị:',
      choices: [
        '20 dòng cuối của file.log',
        '20 dòng đầu của file.log',
        'Dòng số 20 của file.log',
        'Tổng số dòng của file.log',
      ],
      answer: 1,
      explanation: 'head hiện N dòng ĐẦU (mặc định 10). tail hiện N dòng CUỐI. Cực kỳ hữu ích với log file lớn: tail -f /var/log/syslog (theo dõi log real-time, -f = follow). Kết hợp: head -100 big.csv | tail -10 → lấy dòng 91-100. wc -l file.log đếm tổng số dòng.',
    },
    {
      stem: 'Kernel (nhân) Linux đảm nhiệm vai trò nào?',
      choices: [
        'Cung cấp giao diện đồ hoạ cho người dùng',
        'Quản lý phần cứng, bộ nhớ và cung cấp system calls cho ứng dụng',
        'Biên dịch mã nguồn C thành file thực thi',
        'Kết nối máy tính với Internet',
      ],
      answer: 1,
      explanation: 'Kernel là lõi HĐH, chạy ở kernel space: (1) Quản lý CPU/process (scheduling); (2) Quản lý bộ nhớ (virtual memory, MMU); (3) Quản lý thiết bị (device drivers); (4) Quản lý filesystem; (5) Cung cấp system calls (interface cho ứng dụng). User space (ứng dụng) giao tiếp với kernel qua syscalls: read(), write(), fork(), exec(). Shell (bash) là ứng dụng user space.',
    },
  ],
};

// ─── I1.5 · Tiếng Anh CNTT ──────────────────────────────────
export const I15_QUIZ = {
  id: 'I1.5-it-english-quiz',
  title: 'I1.5 · Tiếng Anh CNTT — Thuật ngữ & Đọc tài liệu kỹ thuật',
  kind: 'quiz',
  yearLevel: 1, subject: 'tieng-anh-it', difficulty: 1,
  skillsTrained: ['thuat-ngu-it', 'doc-doc', 'api-terms', 'error-message', 'git-terms'],
  questions: [
    {
      stem: 'Trong lập trình, "API" (Application Programming Interface) là:',
      choices: [
        'Ngôn ngữ lập trình cấp cao',
        'Tập hợp quy tắc/giao thức để phần mềm giao tiếp với nhau',
        'Phần mềm diệt virus',
        'Tên hãng phần cứng nổi tiếng',
      ],
      answer: 1,
      explanation: 'API: bộ quy tắc để phần mềm "nói chuyện" với nhau mà không cần biết code bên trong. REST API dùng HTTP (GET/POST/PUT/DELETE) + JSON. Ví dụ: app thời tiết gọi API OpenWeather để lấy dữ liệu; ứng dụng thanh toán gọi VNPay API. Như "menu nhà hàng" — khách (client) gọi món từ menu (API) mà không cần vào bếp (implementation).',
    },
    {
      stem: '"Debugging" trong lập trình có nghĩa là:',
      choices: [
        'Tối ưu hoá hiệu suất chương trình',
        'Viết tài liệu cho code',
        'Tìm và sửa lỗi (bug) trong chương trình',
        'Triển khai ứng dụng lên server',
      ],
      answer: 2,
      explanation: 'Bug (lỗi phần mềm) có nguồn gốc từ 1947: một con bướm thật (moth) kẹt trong relay máy tính Harvard Mark II gây ra lỗi — Grace Hopper ghi chú "First actual case of bug being found". Debugging: quá trình tìm nguyên nhân bug và sửa. Công cụ: debugger (breakpoint, step-over, inspect variables), print debugging, logging.',
    },
    {
      stem: 'Hàm trả về "null" trong nhiều ngôn ngữ lập trình có nghĩa là:',
      choices: [
        'Trả về số 0',
        'Trả về chuỗi rỗng ""',
        'Không có giá trị / giá trị vắng mặt',
        'Hàm bị lỗi và dừng lại',
      ],
      answer: 2,
      explanation: 'null (hay None trong Python, nil trong Go/Ruby) biểu thị "không có giá trị". Khác với 0 (số không), "" (chuỗi rỗng), hay false. "The Billion Dollar Mistake" — Tony Hoare phát minh null pointer (1965) và sau đó hối hận. NullPointerException (NPE) là lỗi runtime phổ biến nhất Java. Modern languages như Rust, Kotlin, Swift dùng Option/Optional thay vì null.',
    },
    {
      stem: '"Open source" phần mềm có nghĩa là:',
      choices: [
        'Phần mềm miễn phí hoàn toàn',
        'Mã nguồn công khai, có thể đọc, sửa, chia sẻ theo license',
        'Phần mềm không có bản quyền',
        'Phần mềm chỉ chạy trên Linux',
      ],
      answer: 1,
      explanation: 'Open source: mã nguồn công khai, cộng đồng có thể xem, sửa, phân phối — theo điều khoản license cụ thể. MIT/Apache-2.0: rất tự do, cho phép dùng thương mại. GPL: code sửa phải open source. CC: cho content. Open source ≠ miễn phí (Red Hat bán hỗ trợ doanh nghiệp). Ví dụ nổi tiếng: Linux, Python, VS Code (MIT), React (MIT), TensorFlow (Apache-2.0).',
    },
    {
      stem: 'Trong tài liệu kỹ thuật, thuật ngữ "deprecated" có nghĩa là:',
      choices: [
        'Tính năng mới được thêm vào',
        'Tính năng/API đã lỗi thời, không nên dùng, sẽ bị xóa',
        'Lỗi nghiêm trọng trong hệ thống',
        'Phiên bản beta chưa ổn định',
      ],
      answer: 1,
      explanation: 'Deprecated: tính năng vẫn còn hoạt động nhưng KHÔNG NÊN dùng — đã có cách tốt hơn, sẽ bị remove trong version tương lai. Ví dụ: Python 2 là deprecated; React class components dần deprecated thay bằng hooks. Khi đọc docs thấy [DEPRECATED]: ngừng dùng và chuyển sang alternative được gợi ý. Ngược lại: experimental/alpha = mới, chưa ổn định.',
    },
    {
      stem: 'Trong Git, "repository" (repo) là:',
      choices: [
        'Tên máy chủ GitHub',
        'Kho chứa toàn bộ lịch sử code và các phiên bản của dự án',
        'Thư mục tạm thời để biên dịch',
        'Tên người dùng trên hệ thống',
      ],
      answer: 1,
      explanation: 'Repository (repo): kho lưu trữ code kèm toàn bộ lịch sử thay đổi (commits). Local repo: trên máy bạn (.git/). Remote repo: trên GitHub/GitLab/Bitbucket. git init: tạo repo mới. git clone URL: nhân bản repo từ remote. Mỗi commit lưu ảnh chụp (snapshot) toàn bộ codebase tại một thời điểm.',
    },
    {
      stem: 'Lỗi "NullPointerException" (NPE) trong Java thường xảy ra khi:',
      choices: [
        'Chia một số cho 0',
        'Truy cập thuộc tính/phương thức của một object đang là null',
        'File không tìm thấy',
        'Bộ nhớ đầy',
      ],
      answer: 1,
      explanation: 'NPE xảy ra khi gọi method hoặc truy cập field trên biến đang trỏ đến null: String s = null; s.length() → NPE! Cách phòng: kiểm tra null trước (if s != null), dùng Optional<T> (Java 8+), Objects.requireNonNull(). Stack trace NPE cho biết chính xác dòng gây lỗi. Tương tự Python: AttributeError trên None.',
    },
    {
      stem: 'Trong Git, sự khác biệt giữa "merge" và "rebase" là:',
      choices: [
        'Hoàn toàn giống nhau',
        'Merge gộp lịch sử và tạo merge commit; Rebase viết lại lịch sử cho tuyến tính',
        'Rebase chỉ dùng cho local branch',
        'Merge nhanh hơn rebase',
      ],
      answer: 1,
      explanation: 'Merge: gộp 2 nhánh, tạo thêm "merge commit", giữ nguyên lịch sử — safe, không viết lại history. Rebase: "chuyển" commits của nhánh lên đỉnh nhánh đích, lịch sử tuyến tính, commit hash thay đổi — KHÔNG rebase trên nhánh public đã push. Câu thần chú: "Rebase local, Merge public".',
    },
    {
      stem: 'CRUD trong lập trình web là viết tắt của:',
      choices: [
        'Create, Read, Update, Delete',
        'Connect, Respond, Use, Deploy',
        'Cache, Render, URL, Data',
        'Client, Route, UI, Database',
      ],
      answer: 0,
      explanation: 'CRUD là 4 thao tác cơ bản với dữ liệu: Create (tạo), Read (đọc), Update (cập nhật), Delete (xóa). Trong REST API: Create → POST; Read → GET; Update → PUT/PATCH; Delete → DELETE. Trong SQL: Create → INSERT; Read → SELECT; Update → UPDATE; Delete → DELETE. Mọi ứng dụng quản lý dữ liệu đều có các thao tác CRUD.',
    },
    {
      stem: 'Trong lập trình hệ thống, "throughput" (thông lượng) là:',
      choices: [
        'Thời gian xử lý 1 yêu cầu',
        'Số lượng yêu cầu/công việc hoàn thành trong một đơn vị thời gian',
        'Dung lượng bộ nhớ tối đa',
        'Số người dùng đồng thời tối đa',
      ],
      answer: 1,
      explanation: 'Throughput: số requests/transactions hoàn thành trong 1 giây (RPS, TPS). Khác với latency (thời gian một request): latency thấp ≠ throughput cao. Ví dụ: API có latency 100ms nhưng chỉ xử lý 10 req/s (throughput thấp vì bottleneck thread). Cách tăng throughput: concurrency, caching, queue, horizontal scaling. Amdahl\'s Law giới hạn speedup khi parallelism.',
    },
  ],
};

// Aggregate export
export const IT_YEAR1_SCENARIOS = {
  [I11_QUIZ.id]: I11_QUIZ,
  [I12_QUIZ.id]: I12_QUIZ,
  [I13_QUIZ.id]: I13_QUIZ,
  [I14_QUIZ.id]: I14_QUIZ,
  [I15_QUIZ.id]: I15_QUIZ,
};
