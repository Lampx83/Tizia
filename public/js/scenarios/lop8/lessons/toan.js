// ============================================================
// Lớp 8 · TOÁN — Lý thuyết + Ví dụ 35 tuần (GDPT 2018)
// Key TRÙNG id quiz: "S8TOAN-wNN-quiz".
// ============================================================

const L = (topic, intro, objectives, theory, examples) => ({ topic, intro, objectives, theory, examples });

export const S8TOAN_LESSONS = {
  // ──────────────── HK1 · ĐA THỨC NHIỀU BIẾN ────────────────
  'S8TOAN-w01-quiz': L(
    'Đơn thức và đa thức nhiều biến',
    'Chào các em bước vào lớp 8! Ở lớp 7 các em đã làm quen với biểu thức đại số một biến. Tuần này ta mở rộng sang đơn thức và đa thức NHIỀU BIẾN — nền tảng của toàn bộ chương Đại số đầu năm.',
    [
      'Nhận biết đơn thức, đa thức nhiều biến và xác định bậc của chúng.',
      'Phân biệt và nhóm các đơn thức đồng dạng.',
      'Thu gọn đơn thức, thu gọn và sắp xếp đa thức nhiều biến.',
    ],
    [
      { h: 'Đơn thức nhiều biến là gì?' },
      { p: 'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một TÍCH giữa các số và các biến. Mỗi đơn thức có một số (gọi là hệ số) nhân với phần biến. Ví dụ 3x²y có hệ số 3 và phần biến x²y.' },
      { ul: ['Đơn thức thu gọn: mỗi biến chỉ viết một lần, dưới dạng lũy thừa, hệ số đứng đầu.', 'Bậc của đơn thức (đã thu gọn, hệ số ≠ 0) = TỔNG số mũ của tất cả các biến.', 'Số khác 0 là đơn thức bậc 0; số 0 là đơn thức không có bậc.'] },
      { h: 'Đơn thức đồng dạng' },
      { p: 'Hai đơn thức đồng dạng là hai đơn thức (khác 0, đã thu gọn) có HỆ SỐ khác 0 và CÙNG phần biến. Ví dụ 4x²y và −7x²y đồng dạng vì cùng phần biến x²y; còn 4x²y và 4xy² thì KHÔNG đồng dạng.' },
      { note: 'Muốn cộng hay trừ hai đơn thức đồng dạng, ta cộng/trừ các hệ số và giữ nguyên phần biến.' },
      { h: 'Đa thức nhiều biến là gì?' },
      { p: 'Đa thức là một tổng của những đơn thức. Mỗi đơn thức trong tổng đó gọi là một HẠNG TỬ của đa thức. Một đơn thức cũng được coi là một đa thức (gồm một hạng tử).' },
      { h: 'Thu gọn và bậc của đa thức' },
      { p: 'Thu gọn đa thức là cộng các hạng tử đồng dạng với nhau. Bậc của đa thức là bậc cao nhất trong các hạng tử của nó SAU KHI đã thu gọn.' },
      { ul: ['Ví dụ M = x²y + 3xy − x²y + 5 thu gọn thành M = 3xy + 5, bậc 2.', 'Nên sắp xếp các hạng tử theo bậc giảm dần cho dễ nhìn.'] },
      { note: 'Trước khi tìm bậc, BẮT BUỘC phải thu gọn — vì các hạng tử đồng dạng có thể triệt tiêu làm thay đổi bậc.' },
    ],
    [
      { q: 'Cho đơn thức 5x³y²z. Tìm hệ số và bậc.', a: 'Hệ số là 5. Bậc = tổng số mũ các biến = 3 + 2 + 1 = 6. Vậy đây là đơn thức bậc 6.' },
      { q: 'Thu gọn đơn thức 2x · 3xy² · (−x).', a: 'Nhân các hệ số: 2·3·(−1) = −6. Nhân phần biến: x·x·x · y² = x³y². Vậy đơn thức thu gọn là −6x³y², bậc 5.' },
      { q: 'Thu gọn đa thức A = 4x²y + 2xy − 3x²y + xy − 1.', a: 'Nhóm đồng dạng: (4x²y − 3x²y) + (2xy + xy) − 1 = x²y + 3xy − 1. Đa thức có bậc 3.' },
    ]
  ),

  'S8TOAN-w02-quiz': L(
    'Phép cộng, trừ đa thức',
    'Đã quen với đa thức nhiều biến, tuần này ta học hai thao tác cơ bản nhất: CỘNG và TRỪ hai đa thức. Đây là kĩ năng dùng suốt cả chương.',
    [
      'Cộng, trừ hai đa thức nhiều biến.',
      'Tìm đa thức đối của một đa thức.',
      'Tính giá trị của đa thức tại các giá trị cho trước của biến.',
    ],
    [
      { h: 'Cộng hai đa thức' },
      { p: 'Để cộng hai đa thức, ta viết tổng của chúng rồi bỏ dấu ngoặc (giữ nguyên dấu các hạng tử), sau đó nhóm và cộng các hạng tử đồng dạng.' },
      { ul: ['Ví dụ (3x² + 2x − 1) + (x² − 2x + 5) = 3x² + x² + 2x − 2x − 1 + 5 = 4x² + 4.', 'Có thể đặt phép tính theo hàng dọc, các hạng tử đồng dạng thẳng cột.'] },
      { h: 'Đa thức đối' },
      { p: 'Đa thức đối của đa thức A, kí hiệu −A, có được bằng cách đổi dấu TẤT CẢ các hạng tử của A. Tổng của một đa thức và đa thức đối của nó bằng 0.' },
      { ul: ['Đối của 2x² − 3x + 1 là −2x² + 3x − 1.'] },
      { h: 'Trừ hai đa thức' },
      { p: 'Muốn trừ A − B, ta cộng A với đa thức đối của B: A − B = A + (−B). Khi bỏ dấu ngoặc có dấu "−" đứng trước, phải ĐỔI DẤU mọi hạng tử trong ngoặc.' },
      { note: 'Quy tắc dấu: −(a + b) = −a − b; −(a − b) = −a + b. Đây là chỗ học sinh hay sai nhất khi trừ đa thức.' },
      { h: 'Tính giá trị của đa thức' },
      { p: 'Muốn tính giá trị của đa thức tại các giá trị cho trước của biến, ta thay các giá trị đó vào đa thức (nên thu gọn trước) rồi thực hiện phép tính.' },
      { note: 'Sắp các hạng tử cùng bậc thẳng cột khi cộng-trừ theo hàng dọc để tránh nhầm dấu hoặc bỏ sót hạng tử.' },
    ],
    [
      { q: 'Tính (5x − 3y) − (2x − 3y).', a: 'Bỏ ngoặc, đổi dấu hạng tử của đa thức bị trừ: 5x − 3y − 2x + 3y = (5x − 2x) + (−3y + 3y) = 3x. Kết quả: 3x.' },
      { q: 'Cho A = 4x²y − 5xy + 2 và B = x²y + 3xy − 7. Tính A + B.', a: 'A + B = (4x²y + x²y) + (−5xy + 3xy) + (2 − 7) = 5x²y − 2xy − 5.' },
      { q: 'Cho A = 2x − y. Tính giá trị của A tại x = 1, y = 3 và tìm đa thức đối của A.', a: 'A(1; 3) = 2·1 − 3 = −1. Đa thức đối: −A = −2x + y.' },
    ]
  ),

  'S8TOAN-w03-quiz': L(
    'Phép nhân đa thức',
    'Tiếp tục với phép NHÂN. Toàn bộ phép nhân đa thức đều dựa trên một quy tắc duy nhất — quy tắc phân phối của phép nhân đối với phép cộng.',
    [
      'Nhân đơn thức với đa thức.',
      'Nhân hai đa thức nhiều biến.',
      'Vận dụng phép nhân để rút gọn biểu thức.',
    ],
    [
      { h: 'Nhân đơn thức với đa thức' },
      { p: 'Muốn nhân một đơn thức với một đa thức, ta nhân đơn thức đó với TỪNG hạng tử của đa thức rồi cộng các tích lại. Đây chính là quy tắc phân phối a·(b + c) = a·b + a·c.' },
      { ul: ['Ví dụ 2x·(3x − 5) = 2x·3x − 2x·5 = 6x² − 10x.', 'Nhớ nhân cả hệ số lẫn lũy thừa của biến.'] },
      { h: 'Nhân hai đa thức' },
      { p: 'Muốn nhân hai đa thức, ta nhân MỖI hạng tử của đa thức này với MỖI hạng tử của đa thức kia, rồi cộng tất cả các tích và thu gọn các hạng tử đồng dạng.' },
      { ul: ['Ví dụ (x + 2)(x − 3) = x·x + x·(−3) + 2·x + 2·(−3) = x² − 3x + 2x − 6 = x² − x − 6.'] },
      { h: 'Mẹo kiểm tra số tích' },
      { p: 'Khi nhân một đa thức có m hạng tử với đa thức có n hạng tử, trước khi thu gọn ta sẽ có đúng m·n tích. Đếm số tích giúp kiểm tra xem có bỏ sót hạng tử nào không.' },
      { note: 'Một vài tích đặc biệt sẽ trở thành hằng đẳng thức ở tuần sau: (a + b)(a − b) = a² − b²; (x − 1)(x² + x + 1) = x³ − 1.' },
      { h: 'Ứng dụng' },
      { p: 'Phép nhân đa thức được dùng để khai triển biểu thức, rút gọn rồi tính giá trị, hoặc chứng minh giá trị một biểu thức không phụ thuộc vào biến.' },
    ],
    [
      { q: 'Tính 3x²·(2x³ − 4x + 1).', a: 'Nhân với từng hạng tử: 3x²·2x³ − 3x²·4x + 3x²·1 = 6x⁵ − 12x³ + 3x².' },
      { q: 'Tính (2x − 1)(x + 4).', a: '2x·x + 2x·4 − 1·x − 1·4 = 2x² + 8x − x − 4 = 2x² + 7x − 4.' },
      { q: 'Tính (x + y)(x² − xy + y²).', a: 'x·x² − x·xy + x·y² + y·x² − y·xy + y·y² = x³ − x²y + xy² + x²y − xy² + y³ = x³ + y³. (Đây là hằng đẳng thức tổng hai lập phương.)' },
    ]
  ),

  'S8TOAN-w04-quiz': L(
    'Hằng đẳng thức — Bình phương của một tổng, một hiệu',
    'Hằng đẳng thức đáng nhớ là công cụ rất mạnh để khai triển, tính nhanh và phân tích đa thức. Tuần này học hai hằng đẳng thức đầu tiên: bình phương của một tổng và của một hiệu.',
    [
      'Phát biểu và viết đúng hai hằng đẳng thức (a + b)² và (a − b)².',
      'Khai triển và viết gọn nhanh các biểu thức dạng bình phương.',
      'Vận dụng để tính nhẩm và tính nhanh.',
    ],
    [
      { h: 'Hằng đẳng thức là gì?' },
      { p: 'Hằng đẳng thức là đẳng thức ĐÚNG VỚI MỌI giá trị của các biến. Nhờ đó ta có thể thay thế biểu thức ở vế này bằng biểu thức ở vế kia bất cứ lúc nào.' },
      { h: 'Bình phương của một tổng' },
      { p: '(a + b)² = a² + 2ab + b². Phát biểu bằng lời: bình phương của một tổng bằng bình phương số thứ nhất CỘNG hai lần tích hai số CỘNG bình phương số thứ hai.' },
      { h: 'Bình phương của một hiệu' },
      { p: '(a − b)² = a² − 2ab + b². Bình phương của một hiệu bằng bình phương số thứ nhất TRỪ hai lần tích hai số CỘNG bình phương số thứ hai.' },
      { ul: ['(x + 3)² = x² + 6x + 9.', '(2x − 1)² = 4x² − 4x + 1.', 'Theo chiều ngược lại: x² + 10x + 25 = (x + 5)².'] },
      { note: 'Lỗi phổ biến nhất là QUÊN số hạng giữa 2ab. (a + b)² KHÔNG bằng a² + b².' },
      { h: 'Áp dụng tính nhanh' },
      { p: 'Tách số cần tính thành tổng hoặc hiệu của một số tròn và một số nhỏ, rồi dùng hằng đẳng thức. Ví dụ 101² = (100 + 1)² và 99² = (100 − 1)².' },
    ],
    [
      { q: 'Khai triển (3x + 2)².', a: 'Áp dụng (a + b)² với a = 3x, b = 2: (3x)² + 2·3x·2 + 2² = 9x² + 12x + 4.' },
      { q: 'Khai triển (x − 5)² và (2a − 3b)².', a: '(x − 5)² = x² − 10x + 25. (2a − 3b)² = (2a)² − 2·2a·3b + (3b)² = 4a² − 12ab + 9b².' },
      { q: 'Tính nhanh 101² và 99².', a: '101² = (100 + 1)² = 10000 + 200 + 1 = 10201. 99² = (100 − 1)² = 10000 − 200 + 1 = 9801.' },
    ]
  ),

  'S8TOAN-w05-quiz': L(
    'Hiệu hai bình phương — Tổng và hiệu hai lập phương',
    'Thêm ba hằng đẳng thức nữa giúp ta phân tích biểu thức và tính nhanh: hiệu hai bình phương, tổng hai lập phương, hiệu hai lập phương.',
    [
      'Vận dụng a² − b² = (a + b)(a − b).',
      'Vận dụng a³ + b³ và a³ − b³.',
      'Phân tích biểu thức và tính nhanh nhờ ba hằng đẳng thức.',
    ],
    [
      { h: 'Hiệu hai bình phương' },
      { p: 'a² − b² = (a + b)(a − b). Hiệu của hai bình phương bằng tích của tổng với hiệu của hai số đó.' },
      { ul: ['x² − 49 = x² − 7² = (x − 7)(x + 7).', '4x² − 9 = (2x)² − 3² = (2x − 3)(2x + 3).'] },
      { h: 'Tổng hai lập phương' },
      { p: 'a³ + b³ = (a + b)(a² − ab + b²). Lưu ý dấu ở thừa số bình phương thiếu: a² − ab + b².' },
      { h: 'Hiệu hai lập phương' },
      { p: 'a³ − b³ = (a − b)(a² + ab + b²). Ở đây thừa số bình phương thiếu mang dấu "+": a² + ab + b².' },
      { ul: ['x³ − 8 = x³ − 2³ = (x − 2)(x² + 2x + 4).', 'x³ + 27 = x³ + 3³ = (x + 3)(x² − 3x + 9).'] },
      { note: 'Mẹo nhớ: dấu trong ngoặc (a ± b) GIỐNG dấu của biểu thức ban đầu; còn dấu của hạng tử ab ở ngoặc lớn thì NGƯỢC lại.' },
      { h: 'Áp dụng tính nhanh' },
      { p: 'Với tích hai số đối xứng quanh một số tròn, dùng hiệu hai bình phương: 99·101 = (100 − 1)(100 + 1) = 100² − 1² = 9999.' },
    ],
    [
      { q: 'Phân tích 4x² − 25 thành nhân tử.', a: '4x² − 25 = (2x)² − 5² = (2x − 5)(2x + 5).' },
      { q: 'Phân tích x³ + 27 và 8 − y³.', a: 'x³ + 27 = x³ + 3³ = (x + 3)(x² − 3x + 9). 8 − y³ = 2³ − y³ = (2 − y)(4 + 2y + y²).' },
      { q: 'Tính nhanh 53² − 47².', a: '53² − 47² = (53 + 47)(53 − 47) = 100·6 = 600.' },
    ]
  ),

  'S8TOAN-w06-quiz': L(
    'Lập phương của một tổng, một hiệu',
    'Hoàn thiện bộ bảy hằng đẳng thức đáng nhớ với hai hằng đẳng thức bậc ba: lập phương của một tổng và của một hiệu.',
    [
      'Phát biểu và viết đúng (a + b)³ và (a − b)³.',
      'Khai triển nhanh các biểu thức lập phương.',
      'Viết gọn một đa thức về dạng lập phương.',
    ],
    [
      { h: 'Lập phương của một tổng' },
      { p: '(a + b)³ = a³ + 3a²b + 3ab² + b³. Khai triển gồm 4 hạng tử; số mũ của a giảm dần 3, 2, 1, 0 còn số mũ của b tăng dần 0, 1, 2, 3.' },
      { h: 'Lập phương của một hiệu' },
      { p: '(a − b)³ = a³ − 3a²b + 3ab² − b³. Các dấu xen kẽ +, −, +, − bắt đầu bằng dấu "+".' },
      { ul: ['Các hệ số 1, 3, 3, 1 chính là một dòng trong tam giác Pascal.', '(x + 1)³ = x³ + 3x² + 3x + 1.', '(x − 2)³ = x³ − 6x² + 12x − 8.'] },
      { h: 'Nhận dạng để viết gọn' },
      { p: 'Để viết một đa thức 4 hạng tử về dạng lập phương, ta kiểm tra: hạng tử đầu và cuối có là lập phương đúng không, hai hạng tử giữa có khớp 3a²b và 3ab² không.' },
      { ul: ['x³ + 9x² + 27x + 27: có 3·x²·3 = 9x², 3·x·9 = 27x, 3³ = 27 → (x + 3)³.'] },
      { note: 'Phân biệt với bình phương: (a + b)² có 3 hạng tử, còn (a + b)³ có 4 hạng tử. Đừng nhầm hệ số.' },
    ],
    [
      { q: 'Khai triển (x − 3)³.', a: '(x − 3)³ = x³ − 3·x²·3 + 3·x·3² − 3³ = x³ − 9x² + 27x − 27.' },
      { q: 'Khai triển (2x + 1)³.', a: '(2x)³ + 3·(2x)²·1 + 3·2x·1² + 1³ = 8x³ + 12x² + 6x + 1.' },
      { q: 'Viết x³ + 12x² + 48x + 64 dưới dạng lập phương.', a: 'Nhận thấy 3·x²·4 = 12x², 3·x·4² = 48x, 4³ = 64 nên x³ + 12x² + 48x + 64 = (x + 4)³.' },
    ]
  ),

  'S8TOAN-w07-quiz': L(
    'Phân tích đa thức thành nhân tử — Đặt nhân tử chung',
    'Phân tích đa thức thành nhân tử là viết đa thức thành TÍCH của các đa thức — kĩ năng then chốt để rút gọn, giải phương trình. Phương pháp đầu tiên: đặt nhân tử chung.',
    [
      'Hiểu thế nào là phân tích đa thức thành nhân tử.',
      'Tìm nhân tử chung của các hạng tử.',
      'Đặt nhân tử chung ra ngoài dấu ngoặc.',
    ],
    [
      { h: 'Phân tích đa thức thành nhân tử là gì?' },
      { p: 'Phân tích đa thức thành nhân tử (hay thừa số) là biến đổi đa thức đó thành một TÍCH của những đa thức. Đây là phép biến đổi ngược của phép nhân đa thức.' },
      { h: 'Phương pháp đặt nhân tử chung' },
      { p: 'Nếu mọi hạng tử của đa thức có một nhân tử chung, ta đặt nhân tử chung đó ra ngoài dấu ngoặc theo quy tắc: a·b + a·c = a·(b + c).' },
      { h: 'Cách tìm nhân tử chung' },
      { ul: ['Phần hệ số: lấy ƯCLN của các hệ số.', 'Phần biến: lấy các biến có mặt trong MỌI hạng tử, mỗi biến với số mũ NHỎ NHẤT.', 'Nhân tử chung cũng có thể là một đa thức, ví dụ (y − 1) trong x(y − 1) + 2(y − 1).'] },
      { note: 'Đôi khi cần đổi dấu để xuất hiện nhân tử chung: A − B = −(B − A). Ví dụ x(x − 2) + (2 − x) = x(x − 2) − (x − 2) = (x − 2)(x − 1).' },
      { h: 'Kiểm tra kết quả' },
      { p: 'Sau khi đặt nhân tử chung, hãy nhân ngược trở lại để chắc chắn ra đúng đa thức ban đầu — đây là cách tự kiểm tra hiệu quả.' },
      { h: 'Ứng dụng' },
      { p: 'Phân tích nhân tử giúp tính nhanh giá trị biểu thức và giải phương trình dạng tích (sẽ học ở HK2).' },
    ],
    [
      { q: 'Phân tích 5xy − 10x²y thành nhân tử.', a: 'Hệ số chung: ƯCLN(5; 10) = 5. Biến chung: x (mũ nhỏ nhất 1), y. Nhân tử chung 5xy: 5xy − 10x²y = 5xy(1 − 2x).' },
      { q: 'Phân tích 3x²(x − 1) − 6x(x − 1).', a: 'Nhân tử chung gồm 3x và (x − 1): 3x(x − 1)[x − 2] = 3x(x − 1)(x − 2).' },
      { q: 'Phân tích a(b + c) − (b + c).', a: 'Nhân tử chung (b + c): a(b + c) − 1·(b + c) = (b + c)(a − 1).' },
    ]
  ),

  'S8TOAN-w08-quiz': L(
    'Phân tích đa thức — Dùng hằng đẳng thức và nhóm hạng tử',
    'Hai phương pháp phân tích mạnh hơn: dùng hằng đẳng thức đáng nhớ và nhóm các hạng tử. Nhiều bài cần phối hợp cả ba phương pháp.',
    [
      'Nhận diện và dùng hằng đẳng thức để phân tích nhân tử.',
      'Phân tích bằng cách nhóm các hạng tử.',
      'Phối hợp nhiều phương pháp trong một bài.',
    ],
    [
      { h: 'Phương pháp dùng hằng đẳng thức' },
      { p: 'Nếu đa thức có dạng của một hằng đẳng thức (a² ± 2ab + b², a² − b², a³ ± b³…), ta viết ngay nó về dạng nhân tử tương ứng.' },
      { ul: ['x² − 6x + 9 = (x − 3)².', 'x² − 16 = (x − 4)(x + 4).', '8x³ + 1 = (2x)³ + 1³ = (2x + 1)(4x² − 2x + 1).'] },
      { h: 'Phương pháp nhóm hạng tử' },
      { p: 'Khi cả đa thức không có nhân tử chung nhưng từng nhóm hạng tử lại có, ta NHÓM các hạng tử (thường 2 − 2 hoặc 3 − 1) sao cho sau khi đặt nhân tử chung mỗi nhóm thì xuất hiện một nhân tử chung mới.' },
      { ul: ['x² − xy + 5x − 5y = (x² − xy) + (5x − 5y) = x(x − y) + 5(x − y) = (x − y)(x + 5).'] },
      { h: 'Phối hợp nhiều phương pháp' },
      { p: 'Thứ tự ưu tiên: (1) đặt nhân tử chung trước, (2) thử hằng đẳng thức, (3) nhóm hạng tử. Một bài có thể cần dùng liên tiếp nhiều phương pháp.' },
      { ul: ['x² + 4x + 4 − y² = (x + 2)² − y² = (x + 2 − y)(x + 2 + y).'] },
      { note: 'Sau khi phân tích, kiểm tra xem mỗi nhân tử đã phân tích "kiệt" chưa — có còn nhân tử nào tiếp tục phân tích được không.' },
    ],
    [
      { q: 'Phân tích x² + 4x + 4 − y².', a: 'Nhóm 3 hạng tử đầu thành bình phương: (x² + 4x + 4) − y² = (x + 2)² − y². Rồi dùng hiệu hai bình phương: (x + 2 − y)(x + 2 + y).' },
      { q: 'Phân tích x² − xy + 5x − 5y.', a: 'Nhóm: (x² − xy) + (5x − 5y) = x(x − y) + 5(x − y) = (x − y)(x + 5).' },
      { q: 'Phân tích 2x³ − 8x.', a: 'Đặt nhân tử chung 2x: 2x(x² − 4). Tiếp dùng hiệu hai bình phương: 2x(x − 2)(x + 2).' },
    ]
  ),

  'S8TOAN-w09-quiz': L(
    'Phân thức đại số — Khái niệm và rút gọn',
    'Phân thức đại số là "phân số có chứa biến". Tuần này ta tìm hiểu khái niệm, điều kiện xác định và cách rút gọn phân thức.',
    [
      'Hiểu khái niệm phân thức đại số và hai phân thức bằng nhau.',
      'Tìm điều kiện xác định của phân thức.',
      'Rút gọn phân thức bằng tính chất cơ bản.',
    ],
    [
      { h: 'Phân thức đại số là gì?' },
      { p: 'Phân thức đại số (gọi tắt là phân thức) là biểu thức có dạng A/B, trong đó A và B là những đa thức và B KHÁC đa thức 0. A gọi là tử thức, B gọi là mẫu thức.' },
      { ul: ['Mỗi đa thức cũng là một phân thức với mẫu bằng 1.', 'Mỗi số khác 0 cũng là một phân thức.'] },
      { h: 'Điều kiện xác định' },
      { p: 'Phân thức A/B chỉ có nghĩa khi mẫu thức B khác 0. Tập các giá trị của biến làm cho B ≠ 0 gọi là ĐIỀU KIỆN XÁC ĐỊNH (ĐKXĐ) của phân thức.' },
      { h: 'Hai phân thức bằng nhau' },
      { p: 'Hai phân thức A/B và C/D gọi là bằng nhau nếu A·D = B·C (nhân chéo). Đây là cơ sở cho phép rút gọn và quy đồng.' },
      { h: 'Tính chất cơ bản của phân thức' },
      { p: 'Nếu nhân (hoặc chia) cả tử và mẫu của một phân thức với cùng một đa thức khác 0 thì được một phân thức bằng phân thức đã cho: A/B = (A·M)/(B·M) = (A:N)/(B:N).' },
      { h: 'Rút gọn phân thức' },
      { p: 'Muốn rút gọn một phân thức, ta: (1) phân tích tử và mẫu thành nhân tử (nếu cần); (2) chia cả tử và mẫu cho nhân tử chung.' },
      { note: 'Khi rút gọn, nên ghi rõ điều kiện xác định để phép biến đổi luôn hợp lệ.' },
    ],
    [
      { q: 'Tìm điều kiện xác định và rút gọn (x² − 4)/(x − 2).', a: 'ĐKXĐ: x − 2 ≠ 0 ⇔ x ≠ 2. Phân tích tử: x² − 4 = (x − 2)(x + 2). Rút gọn (x − 2): (x² − 4)/(x − 2) = x + 2 (với x ≠ 2).' },
      { q: 'Rút gọn 6x²y / (9xy²).', a: 'ĐKXĐ: x ≠ 0, y ≠ 0. Chia tử và mẫu cho 3xy: 6x²y / (9xy²) = 2x/(3y).' },
      { q: 'Rút gọn (x² − 2x + 1)/(x² − 1).', a: 'ĐKXĐ: x ≠ ±1. Tử = (x − 1)², mẫu = (x − 1)(x + 1). Rút gọn (x − 1): kết quả (x − 1)/(x + 1).' },
    ]
  ),

  'S8TOAN-w10-quiz': L(
    'Cộng, trừ phân thức đại số',
    'Cộng và trừ phân thức làm giống hệt với phân số: cùng mẫu thì cộng tử, khác mẫu thì quy đồng rồi cộng.',
    [
      'Cộng, trừ các phân thức cùng mẫu.',
      'Quy đồng mẫu nhiều phân thức.',
      'Cộng, trừ phân thức khác mẫu và rút gọn kết quả.',
    ],
    [
      { h: 'Cộng, trừ phân thức CÙNG mẫu' },
      { p: 'Muốn cộng (trừ) hai phân thức cùng mẫu, ta cộng (trừ) các tử và giữ nguyên mẫu: A/M + B/M = (A + B)/M; A/M − B/M = (A − B)/M.' },
      { h: 'Quy đồng mẫu nhiều phân thức' },
      { p: 'Để quy đồng, ta tìm MẪU THỨC CHUNG (MTC) rồi tìm nhân tử phụ của mỗi mẫu, sau đó nhân cả tử và mẫu mỗi phân thức với nhân tử phụ tương ứng.' },
      { ul: ['Phân tích các mẫu thành nhân tử.', 'MTC = tích các nhân tử chung và riêng, mỗi nhân tử lấy số mũ lớn nhất.', 'Nhân tử phụ của mỗi mẫu = MTC chia cho mẫu đó.'] },
      { h: 'Cộng, trừ phân thức KHÁC mẫu' },
      { p: 'Bước 1: quy đồng mẫu. Bước 2: cộng/trừ các tử, giữ nguyên mẫu chung. Bước 3: rút gọn phân thức kết quả nếu được.' },
      { note: 'Khi trừ, nhớ đổi dấu TẤT CẢ các hạng tử của tử số bị trừ — đây là chỗ rất dễ sai.' },
      { h: 'Phân thức đối' },
      { p: 'Phân thức đối của A/B là −A/B (cũng bằng A/(−B)). Tổng của một phân thức và phân thức đối bằng 0. Trừ một phân thức là cộng với phân thức đối của nó.' },
    ],
    [
      { q: 'Tính 1/x + 2/x.', a: 'Cùng mẫu x: (1 + 2)/x = 3/x (với x ≠ 0).' },
      { q: 'Tính 1/x + 1/y.', a: 'MTC = xy. Quy đồng: y/(xy) + x/(xy) = (x + y)/(xy) (với x ≠ 0, y ≠ 0).' },
      { q: 'Tính 3/(x − 1) − 2/(x + 1).', a: 'MTC = (x − 1)(x + 1). Quy đồng: [3(x + 1) − 2(x − 1)] / [(x − 1)(x + 1)] = (3x + 3 − 2x + 2)/[(x−1)(x+1)] = (x + 5)/[(x − 1)(x + 1)].' },
    ]
  ),

  'S8TOAN-w11-quiz': L(
    'Nhân, chia phân thức đại số',
    'Nhân và chia phân thức cũng giống phân số: nhân thì lấy tử nhân tử, mẫu nhân mẫu; chia thì nhân với phân thức nghịch đảo.',
    [
      'Nhân hai phân thức đại số.',
      'Tìm phân thức nghịch đảo và chia hai phân thức.',
      'Rút gọn kết quả phép nhân, chia.',
    ],
    [
      { h: 'Nhân hai phân thức' },
      { p: 'Muốn nhân hai phân thức, ta nhân các tử với nhau và nhân các mẫu với nhau: (A/B)·(C/D) = (A·C)/(B·D).' },
      { note: 'Nên RÚT GỌN chéo trước khi nhân (triệt tiêu nhân tử chung giữa tử của phân thức này với mẫu của phân thức kia) để tránh tính trên đa thức cồng kềnh.' },
      { h: 'Phân thức nghịch đảo' },
      { p: 'Nghịch đảo của phân thức A/B (với A ≠ 0) là phân thức B/A. Tích của một phân thức với nghịch đảo của nó bằng 1.' },
      { h: 'Chia hai phân thức' },
      { p: 'Muốn chia phân thức A/B cho phân thức C/D (C ≠ 0), ta nhân A/B với phân thức nghịch đảo của C/D: (A/B) : (C/D) = (A/B)·(D/C) = (A·D)/(B·C).' },
      { h: 'Điều kiện xác định' },
      { p: 'Trong phép chia, ngoài các mẫu thức khác 0, còn cần tử thức của phân thức chia (số chia) khác 0 để phép nghịch đảo có nghĩa.' },
      { note: 'Tính chất: phép nhân phân thức có tính giao hoán, kết hợp và phân phối đối với phép cộng — giống như với phân số.' },
    ],
    [
      { q: 'Tính (x/y)·(y²/x²).', a: 'Nhân tử nhân tử, mẫu nhân mẫu: (x·y²)/(y·x²). Rút gọn: y/x (với x ≠ 0, y ≠ 0).' },
      { q: 'Tính (2/x) : (4/x²).', a: 'Nhân với nghịch đảo: (2/x)·(x²/4) = 2x²/(4x) = x/2 (với x ≠ 0).' },
      { q: 'Tính ((x + 1)/(x − 2)) · ((x − 2)/(x² − 1)).', a: 'Rút gọn chéo (x − 2) và x² − 1 = (x − 1)(x + 1): kết quả (x + 1)/[(x − 1)(x + 1)] = 1/(x − 1) (với x ≠ 2, x ≠ ±1).' },
    ]
  ),

  'S8TOAN-w12-quiz': L(
    'Phương trình bậc nhất một ẩn',
    'Phương trình bậc nhất ax + b = 0 (a ≠ 0) là loại phương trình quan trọng nhất ở lớp 8 và là nền tảng để giải các bài toán thực tế.',
    [
      'Nhận biết phương trình bậc nhất một ẩn và nghiệm của nó.',
      'Vận dụng quy tắc chuyển vế và quy tắc nhân để giải.',
      'Giải các phương trình đưa được về dạng bậc nhất.',
    ],
    [
      { h: 'Phương trình một ẩn' },
      { p: 'Một phương trình với ẩn x có dạng A(x) = B(x), trong đó A(x) là vế trái, B(x) là vế phải. Nghiệm của phương trình là giá trị của ẩn làm cho hai vế bằng nhau.' },
      { h: 'Định nghĩa phương trình bậc nhất một ẩn' },
      { p: 'Phương trình bậc nhất một ẩn là phương trình có dạng ax + b = 0, với a, b là các số đã cho và a ≠ 0.' },
      { h: 'Quy tắc chuyển vế' },
      { p: 'Trong một phương trình, ta có thể CHUYỂN một hạng tử từ vế này sang vế kia và ĐỔI DẤU hạng tử đó.' },
      { h: 'Quy tắc nhân (chia)' },
      { p: 'Trong một phương trình, ta có thể NHÂN (hoặc CHIA) cả hai vế với cùng một số khác 0.' },
      { h: 'Cách giải phương trình bậc nhất' },
      { p: 'Từ ax + b = 0, chuyển b sang vế phải: ax = −b; chia hai vế cho a: x = −b/a. Phương trình bậc nhất luôn có DUY NHẤT một nghiệm x = −b/a.' },
      { ul: ['Với phương trình phức tạp: bỏ ngoặc, quy đồng khử mẫu (nếu có), chuyển vế thu gọn về dạng ax = c rồi tìm x.'] },
      { note: 'Luôn thử lại nghiệm bằng cách thay vào phương trình ban đầu để kiểm tra.' },
    ],
    [
      { q: 'Giải phương trình 2x + 6 = 0.', a: 'Chuyển vế: 2x = −6. Chia hai vế cho 2: x = −3. Vậy phương trình có nghiệm x = −3.' },
      { q: 'Giải phương trình 3(x − 1) = 5x − 7.', a: 'Bỏ ngoặc: 3x − 3 = 5x − 7. Chuyển vế: 3x − 5x = −7 + 3 ⇔ −2x = −4 ⇔ x = 2.' },
      { q: 'Giải phương trình (x − 1)/2 + x = 4.', a: 'Nhân hai vế cho 2: (x − 1) + 2x = 8 ⇔ 3x − 1 = 8 ⇔ 3x = 9 ⇔ x = 3.' },
    ]
  ),

  'S8TOAN-w13-quiz': L(
    'Giải bài toán bằng cách lập phương trình',
    'Một trong những ứng dụng quan trọng nhất của phương trình: giải các bài toán thực tế bằng cách đặt ẩn và lập phương trình.',
    [
      'Đọc hiểu đề, chọn ẩn và đặt điều kiện cho ẩn.',
      'Biểu diễn các đại lượng và lập phương trình.',
      'Giải phương trình và đối chiếu điều kiện để kết luận.',
    ],
    [
      { h: 'Các bước giải bài toán bằng cách lập phương trình' },
      { p: 'Bước 1: Lập phương trình — chọn ẩn số và đặt điều kiện thích hợp; biểu diễn các đại lượng chưa biết theo ẩn; lập phương trình biểu thị mối quan hệ. Bước 2: Giải phương trình. Bước 3: Kiểm tra điều kiện rồi trả lời.' },
      { h: 'Một số dạng quan hệ thường gặp' },
      { ul: ['Chuyển động: quãng đường = vận tốc × thời gian (s = v·t).', 'Năng suất — công việc: khối lượng công việc = năng suất × thời gian.', 'Toán phần trăm, tăng giảm, tỉ lệ.'] },
      { h: 'Toán quan hệ số' },
      { p: 'Với bài toán về hai số, thường đặt một số là ẩn rồi biểu diễn số kia qua tổng, hiệu hoặc tỉ số đã cho.' },
      { h: 'Mẹo lập phương trình' },
      { p: 'Vẽ sơ đồ hoặc lập bảng tóm tắt các đại lượng theo ẩn giúp nhìn ra phương trình dễ dàng hơn, nhất là với toán chuyển động và năng suất.' },
      { note: 'Sau khi giải xong, NHỚ đối chiếu nghiệm với điều kiện của ẩn (ví dụ tuổi, số người phải dương và nguyên) rồi mới kết luận.' },
    ],
    [
      { q: 'Tổng hai số là 30, hiệu của chúng là 8. Tìm hai số.', a: 'Gọi số bé là x. Số lớn là x + 8. Tổng: x + (x + 8) = 30 ⇔ 2x = 22 ⇔ x = 11. Vậy hai số là 11 và 19.' },
      { q: 'Hiện nay mẹ hơn con 24 tuổi. 6 năm nữa tuổi mẹ gấp 3 lần tuổi con. Tính tuổi mỗi người hiện nay.', a: 'Gọi tuổi con hiện nay là x (tuổi, x > 0). Tuổi mẹ là x + 24. Sau 6 năm: (x + 24 + 6) = 3(x + 6) ⇔ x + 30 = 3x + 18 ⇔ 2x = 12 ⇔ x = 6. Vậy con 6 tuổi, mẹ 30 tuổi.' },
      { q: 'Một ô tô đi từ A đến B với vận tốc 50 km/h, lúc về đi với vận tốc 40 km/h nên thời gian về nhiều hơn lượt đi 30 phút. Tính quãng đường AB.', a: 'Gọi quãng đường AB là x km (x > 0). Thời gian đi: x/50 (giờ); thời gian về: x/40 (giờ). Đổi 30 phút = 1/2 giờ. Phương trình: x/40 − x/50 = 1/2. Quy đồng (MTC 200): 5x/200 − 4x/200 = 100/200 ⇔ x/200 = 1/2 ⇔ x = 100. Quãng đường AB = 100 km.' },
    ]
  ),

  'S8TOAN-w14-quiz': L(
    'Tứ giác — Hình thang cân',
    'Bắt đầu phần Hình học lớp 8 với tứ giác — hình nền tảng, từ đó sinh ra mọi tứ giác đặc biệt.',
    [
      'Nắm định lí tổng các góc của một tứ giác.',
      'Nhận biết hình thang, hình thang cân.',
      'Vận dụng tính chất và dấu hiệu nhận biết hình thang cân.',
    ],
    [
      { h: 'Tứ giác lồi' },
      { p: 'Tứ giác ABCD là hình gồm 4 đoạn thẳng AB, BC, CD, DA, trong đó không có hai đoạn nào cùng nằm trên một đường thẳng. Tứ giác lồi là tứ giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào.' },
      { h: 'Định lí tổng các góc của tứ giác' },
      { p: 'Tổng số đo bốn góc của một tứ giác bằng 360°. (Có thể thấy bằng cách chia tứ giác thành hai tam giác bởi một đường chéo: 180° + 180° = 360°.)' },
      { h: 'Hình thang' },
      { p: 'Hình thang là tứ giác có HAI CẠNH ĐỐI SONG SONG. Hai cạnh song song gọi là hai ĐÁY; hai cạnh còn lại là hai CẠNH BÊN.' },
      { h: 'Hình thang cân' },
      { p: 'Hình thang cân là hình thang có HAI GÓC KỀ MỘT ĐÁY bằng nhau.' },
      { ul: ['Trong hình thang cân, hai cạnh bên bằng nhau.', 'Trong hình thang cân, hai đường chéo bằng nhau.'] },
      { h: 'Dấu hiệu nhận biết hình thang cân' },
      { p: 'Một hình thang là hình thang cân nếu: có hai góc kề một đáy bằng nhau, HOẶC có hai đường chéo bằng nhau.' },
      { note: 'Lưu ý: hình thang có hai cạnh bên bằng nhau CHƯA chắc là hình thang cân (có thể là hình bình hành) — cần thêm điều kiện về góc hoặc đường chéo.' },
    ],
    [
      { q: 'Tứ giác ABCD có Â = 80°, B̂ = 100°, Ĉ = 70°. Tính D̂.', a: 'Tổng bốn góc = 360°, nên D̂ = 360° − 80° − 100° − 70° = 110°.' },
      { q: 'Hình thang cân ABCD (AB // CD) có  = 70°. Tính các góc còn lại.', a: 'Hai góc kề đáy AB bằng nhau nên B̂ = 70°. Góc kề cạnh bên bù nhau: D̂ = 180° − 70° = 110°, và Ĉ = 110°.' },
      { q: 'Trong hình thang cân, hai đường chéo có bằng nhau không?', a: 'Có. Hai đường chéo bằng nhau là một tính chất đặc trưng của hình thang cân.' },
    ]
  ),

  'S8TOAN-w15-quiz': L(
    'Hình bình hành',
    'Hình bình hành là tứ giác có hai cặp cạnh đối song song — một hình rất thường gặp với nhiều tính chất hữu ích.',
    [
      'Nắm định nghĩa hình bình hành.',
      'Vận dụng các tính chất về cạnh, góc, đường chéo.',
      'Sử dụng dấu hiệu nhận biết hình bình hành.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Hình bình hành là tứ giác có CÁC CẠNH ĐỐI SONG SONG (hai cặp cạnh đối song song).' },
      { h: 'Tính chất' },
      { p: 'Trong một hình bình hành:' },
      { ul: ['Các cạnh đối bằng nhau.', 'Các góc đối bằng nhau.', 'Hai đường chéo cắt nhau tại trung điểm của mỗi đường.'] },
      { h: 'Dấu hiệu nhận biết hình bình hành' },
      { p: 'Một tứ giác là hình bình hành nếu thỏa mãn một trong các dấu hiệu sau:' },
      { ul: ['Có các cạnh đối song song.', 'Có các cạnh đối bằng nhau.', 'Có hai cạnh đối song song và bằng nhau.', 'Có các góc đối bằng nhau.', 'Có hai đường chéo cắt nhau tại trung điểm mỗi đường.'] },
      { h: 'Tâm đối xứng' },
      { p: 'Hình bình hành có một tâm đối xứng là giao điểm của hai đường chéo. Qua tâm này, mỗi điểm của hình có một điểm đối xứng cũng thuộc hình.' },
      { note: 'Hình bình hành là "tổ tiên" của hình chữ nhật, hình thoi và hình vuông — chúng đều là hình bình hành có thêm điều kiện đặc biệt.' },
    ],
    [
      { q: 'Hình bình hành ABCD có AB = 5 cm. Tính CD.', a: 'Trong hình bình hành các cạnh đối bằng nhau, nên CD = AB = 5 cm.' },
      { q: 'Hình bình hành ABCD có Â = 110°. Tính các góc còn lại.', a: 'Góc đối Ĉ = Â = 110°. Hai góc kề bù nhau: B̂ = D̂ = 180° − 110° = 70°.' },
      { q: 'Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường có là hình bình hành không?', a: 'Có — đây là một trong các dấu hiệu nhận biết hình bình hành.' },
    ]
  ),

  'S8TOAN-w16-quiz': L(
    'Hình chữ nhật — Hình thoi — Hình vuông',
    'Ba hình bình hành đặc biệt: hình chữ nhật (bốn góc vuông), hình thoi (bốn cạnh bằng nhau) và hình vuông (cả hai).',
    [
      'Nắm định nghĩa, tính chất hình chữ nhật, hình thoi, hình vuông.',
      'Phân biệt tính chất đường chéo của các hình.',
      'Vận dụng để tính độ dài và nhận biết hình.',
    ],
    [
      { h: 'Hình chữ nhật' },
      { p: 'Hình chữ nhật là tứ giác có BỐN GÓC VUÔNG. Hình chữ nhật cũng là một hình bình hành.' },
      { ul: ['Có đầy đủ tính chất của hình bình hành.', 'Hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường.'] },
      { h: 'Hình thoi' },
      { p: 'Hình thoi là tứ giác có BỐN CẠNH BẰNG NHAU. Hình thoi cũng là một hình bình hành.' },
      { ul: ['Hai đường chéo vuông góc với nhau.', 'Hai đường chéo là các đường phân giác của các góc của hình thoi.'] },
      { h: 'Hình vuông' },
      { p: 'Hình vuông là tứ giác có BỐN GÓC VUÔNG và BỐN CẠNH BẰNG NHAU. Hình vuông vừa là hình chữ nhật vừa là hình thoi.' },
      { ul: ['Hai đường chéo bằng nhau, vuông góc với nhau và cắt nhau tại trung điểm mỗi đường.'] },
      { h: 'Quan hệ giữa các hình' },
      { p: 'Hình chữ nhật có hai cạnh kề bằng nhau là hình vuông. Hình thoi có một góc vuông là hình vuông. Hình bình hành có một góc vuông là hình chữ nhật; hình bình hành có hai cạnh kề bằng nhau là hình thoi.' },
      { note: 'Mẹo nhớ đường chéo: hình chữ nhật → hai đường chéo BẰNG nhau; hình thoi → hai đường chéo VUÔNG GÓC; hình vuông → vừa bằng vừa vuông góc.' },
    ],
    [
      { q: 'Hình chữ nhật có hai cạnh 3 cm và 4 cm. Tính độ dài đường chéo.', a: 'Đường chéo là cạnh huyền của tam giác vuông hai cạnh 3 và 4: d = √(3² + 4²) = √25 = 5 cm.' },
      { q: 'Hình thoi có hai đường chéo 6 cm và 8 cm. Tính độ dài cạnh.', a: 'Hai đường chéo vuông góc và cắt nhau tại trung điểm, nên cạnh = √(3² + 4²) = 5 cm (nửa đường chéo là 3 và 4).' },
      { q: 'Hình thoi có hai đường chéo 10 cm và 24 cm. Tính diện tích.', a: 'Diện tích hình thoi = (1/2)·d₁·d₂ = (1/2)·10·24 = 120 cm².' },
    ]
  ),

  'S8TOAN-w17-quiz': L(
    'Định lí Thalès trong tam giác',
    'Định lí Thalès liên hệ các đoạn thẳng tỉ lệ khi một đường thẳng song song cắt hai cạnh của tam giác — nền tảng để học tam giác đồng dạng.',
    [
      'Hiểu khái niệm tỉ số và đoạn thẳng tỉ lệ.',
      'Phát biểu và vận dụng định lí Thalès thuận và đảo.',
      'Dùng hệ quả để tính độ dài đoạn thẳng.',
    ],
    [
      { h: 'Đoạn thẳng tỉ lệ' },
      { p: 'Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng (cùng đơn vị). Hai đoạn thẳng AB và CD gọi là tỉ lệ với hai đoạn A′B′ và C′D′ nếu AB/CD = A′B′/C′D′.' },
      { h: 'Định lí Thalès' },
      { p: 'Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó ĐỊNH RA trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.' },
      { ul: ['Tam giác ABC, đường thẳng song song BC cắt AB tại D, AC tại E ⇒ AD/AB = AE/AC; AD/DB = AE/EC.'] },
      { h: 'Định lí Thalès đảo' },
      { p: 'Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó SONG SONG với cạnh còn lại.' },
      { ul: ['Nếu AD/DB = AE/EC thì DE // BC.'] },
      { h: 'Hệ quả' },
      { p: 'Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho: AD/AB = AE/AC = DE/BC.' },
      { note: 'Thalès là cơ sở của tam giác đồng dạng và nhiều bài toán đo gián tiếp (chiều cao, khoảng cách).' },
    ],
    [
      { q: 'Tam giác ABC có AB = 6, AC = 9. Điểm D ∈ AB, E ∈ AC với AD = 2 và DE // BC. Tính AE.', a: 'Theo định lí Thalès: AD/AB = AE/AC ⇒ 2/6 = AE/9 ⇒ AE = 9·2/6 = 3.' },
      { q: 'Tam giác ABC, DE // BC với AD/DB = 1/2. Tính tỉ số DE/BC.', a: 'AD/AB = AD/(AD + DB) = 1/(1 + 2) = 1/3. Theo hệ quả: DE/BC = AD/AB = 1/3.' },
      { q: 'Tam giác ABC có D ∈ AB, E ∈ AC với AD = 3, DB = 6, AE = 4, EC = 8. DE có song song BC không?', a: 'AD/DB = 3/6 = 1/2; AE/EC = 4/8 = 1/2. Hai tỉ số bằng nhau nên theo định lí đảo, DE // BC.' },
    ]
  ),

  'S8TOAN-w18-quiz': L(
    'Ôn tập học kì I',
    'Tổng hợp toàn bộ kiến thức Đại số và Hình học của học kì 1 để chuẩn bị cho bài kiểm tra cuối kì.',
    [
      'Hệ thống lại bảy hằng đẳng thức và các phương pháp phân tích nhân tử.',
      'Ôn các phép tính phân thức và phương trình bậc nhất.',
      'Ôn tứ giác và các tứ giác đặc biệt, định lí Thalès.',
    ],
    [
      { h: 'Bản đồ kiến thức Đại số HK1' },
      { p: 'HK1 đi từ đơn thức, đa thức nhiều biến → các phép tính cộng, trừ, nhân → bảy hằng đẳng thức → phân tích đa thức thành nhân tử → phân thức đại số → phương trình bậc nhất và ứng dụng.' },
      { h: 'Bảy hằng đẳng thức đáng nhớ' },
      { ul: ['(a + b)² = a² + 2ab + b²; (a − b)² = a² − 2ab + b².', 'a² − b² = (a + b)(a − b).', '(a + b)³ và (a − b)³.', 'a³ + b³ = (a + b)(a² − ab + b²); a³ − b³ = (a − b)(a² + ab + b²).'] },
      { h: 'Phân tích nhân tử và phân thức' },
      { p: 'Ba phương pháp phân tích: đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử (có thể phối hợp). Phân thức: rút gọn, quy đồng, cộng-trừ-nhân-chia.' },
      { h: 'Hình học HK1' },
      { ul: ['Tổng các góc của tứ giác = 360°.', 'Hình thang, hình thang cân; hình bình hành.', 'Hình chữ nhật, hình thoi, hình vuông và tính chất đường chéo.', 'Định lí Thalès thuận, đảo và hệ quả.'] },
      { note: 'Tự lập đề cương theo từng chủ đề và giải lại các bài tiêu biểu là cách ôn hiệu quả nhất.' },
    ],
    [
      { q: 'Phân tích x² + 6x + 9 − y² thành nhân tử.', a: '(x² + 6x + 9) − y² = (x + 3)² − y² = (x + 3 − y)(x + 3 + y).' },
      { q: 'Giải phương trình 2(x + 3) = 4x − 2.', a: '2x + 6 = 4x − 2 ⇔ −2x = −8 ⇔ x = 4.' },
      { q: 'Hình thoi có hai đường chéo 10 cm và 24 cm. Tính diện tích và độ dài cạnh.', a: 'Diện tích = (1/2)·10·24 = 120 cm². Cạnh = √(5² + 12²) = √169 = 13 cm.' },
    ]
  ),

  // ──────────────── HK2 ────────────────
  'S8TOAN-w19-quiz': L(
    'Bất đẳng thức',
    'Khởi đầu học kì 2 với bất đẳng thức — quan hệ "lớn hơn", "nhỏ hơn" giữa các số và biểu thức.',
    [
      'Hiểu khái niệm bất đẳng thức và các kí hiệu >, <, ≥, ≤.',
      'Nắm các tính chất cơ bản của bất đẳng thức.',
      'Chứng minh một số bất đẳng thức đơn giản.',
    ],
    [
      { h: 'Bất đẳng thức là gì?' },
      { p: 'Ta gọi hệ thức dạng a < b (hoặc a > b, a ≤ b, a ≥ b) là bất đẳng thức, trong đó a là vế trái, b là vế phải.' },
      { h: 'Tính chất bắc cầu' },
      { p: 'Nếu a < b và b < c thì a < c. Tính chất này cho phép so sánh gián tiếp qua một số trung gian.' },
      { h: 'Liên hệ với phép cộng' },
      { p: 'Khi cộng cùng một số vào cả hai vế của một bất đẳng thức, ta được bất đẳng thức mới cùng chiều: nếu a < b thì a + c < b + c.' },
      { h: 'Liên hệ với phép nhân' },
      { p: 'Nhân cả hai vế với một số DƯƠNG thì GIỮ NGUYÊN chiều; nhân với một số ÂM thì ĐỔI CHIỀU bất đẳng thức.' },
      { ul: ['Nếu a < b và c > 0 thì ac < bc.', 'Nếu a < b và c < 0 thì ac > bc.'] },
      { h: 'Vài bất đẳng thức quan trọng' },
      { ul: ['a² ≥ 0 với mọi a; dấu "=" khi a = 0.', '|a| ≥ 0 với mọi a.', 'a² + b² ≥ 2ab với mọi a, b (suy ra từ (a − b)² ≥ 0).'] },
      { note: 'Lỗi hay gặp: quên đổi chiều khi nhân hoặc chia hai vế cho một số âm.' },
    ],
    [
      { q: 'Cho a < b. So sánh −2a và −2b.', a: 'Nhân hai vế với −2 (số âm) phải đổi chiều: −2a > −2b.' },
      { q: 'Chứng minh a² + 1 ≥ 2a với mọi số a.', a: 'Xét hiệu: a² + 1 − 2a = (a − 1)² ≥ 0. Vậy a² + 1 ≥ 2a. Dấu "=" xảy ra khi a = 1.' },
      { q: 'Cho a > b. So sánh a + 3 và b + 3.', a: 'Cộng 3 vào cả hai vế giữ nguyên chiều: a + 3 > b + 3.' },
    ]
  ),

  'S8TOAN-w20-quiz': L(
    'Bất phương trình bậc nhất một ẩn',
    'Bất phương trình giống phương trình nhưng dấu "=" thay bằng dấu bất đẳng thức; tập nghiệm thường là một khoảng.',
    [
      'Nhận biết bất phương trình bậc nhất một ẩn.',
      'Giải bất phương trình bậc nhất và biểu diễn tập nghiệm.',
      'Lưu ý đổi chiều khi nhân hoặc chia cho số âm.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Bất phương trình bậc nhất một ẩn là bất phương trình có dạng ax + b > 0 (hoặc <, ≥, ≤) với a, b là số đã cho và a ≠ 0.' },
      { h: 'Hai quy tắc biến đổi' },
      { ul: ['Quy tắc chuyển vế: chuyển một hạng tử từ vế này sang vế kia và đổi dấu (giữ nguyên chiều bất phương trình).', 'Quy tắc nhân (chia): nhân/chia hai vế cho số DƯƠNG giữ nguyên chiều; nhân/chia cho số ÂM thì ĐỔI CHIỀU.'] },
      { h: 'Cách giải' },
      { p: 'Chuyển vế đưa về dạng ax > c (hoặc <, ≥, ≤), rồi chia hai vế cho a — chú ý đổi chiều nếu a < 0. Tập nghiệm thường viết dạng x > m, x ≤ m…' },
      { h: 'Biểu diễn tập nghiệm trên trục số' },
      { p: 'Dùng dấu ngoặc tròn ( hoặc dấu khoanh trống cho < và >; dùng ngoặc vuông [ hoặc khoanh đặc cho ≤ và ≥; gạch bỏ phần không thuộc tập nghiệm.' },
      { note: 'Lỗi phổ biến nhất: quên đổi chiều khi chia hai vế cho một số âm.' },
    ],
    [
      { q: 'Giải bất phương trình 2x − 4 > 0.', a: 'Chuyển vế: 2x > 4. Chia cho 2 (dương, giữ chiều): x > 2. Tập nghiệm: x > 2.' },
      { q: 'Giải bất phương trình −3x + 6 ≥ 0.', a: 'Chuyển vế: −3x ≥ −6. Chia cho −3 (âm, đổi chiều): x ≤ 2. Tập nghiệm: x ≤ 2.' },
      { q: 'Giải bất phương trình 5x − 1 < 2x + 8.', a: 'Chuyển vế: 5x − 2x < 8 + 1 ⇔ 3x < 9 ⇔ x < 3.' },
    ]
  ),

  'S8TOAN-w21-quiz': L(
    'Hàm số bậc nhất y = ax + b (a ≠ 0)',
    'Hàm số bậc nhất có đồ thị là một đường thẳng — nền tảng để mô tả nhiều quan hệ trong thực tế.',
    [
      'Nhận biết hàm số bậc nhất và xác định hệ số a, b.',
      'Tính giá trị hàm số tại các điểm.',
      'Xác định hàm số đồng biến hay nghịch biến.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Hàm số bậc nhất là hàm số được cho bởi công thức y = ax + b, trong đó a, b là các số cho trước và a ≠ 0. a là hệ số góc, b là tung độ gốc.' },
      { h: 'Giá trị của hàm số' },
      { p: 'Với mỗi giá trị của x, ta thay vào công thức để tính giá trị tương ứng của y. Cặp (x; y) cho một điểm thuộc đồ thị.' },
      { h: 'Tính đồng biến, nghịch biến' },
      { p: 'Hàm số bậc nhất y = ax + b xác định với mọi x. Khi a > 0 hàm số ĐỒNG BIẾN (x tăng thì y tăng); khi a < 0 hàm số NGHỊCH BIẾN (x tăng thì y giảm).' },
      { ul: ['a > 0: đồ thị là đường thẳng đi LÊN từ trái sang phải.', 'a < 0: đồ thị là đường thẳng đi XUỐNG từ trái sang phải.', 'b là giá trị của y khi x = 0, tức là tung độ giao điểm với trục Oy.'] },
      { h: 'Trường hợp đặc biệt' },
      { p: 'Khi b = 0, hàm số có dạng y = ax — đồ thị là đường thẳng đi qua gốc tọa độ O.' },
      { note: 'Điều kiện a ≠ 0 là bắt buộc; nếu a = 0 thì y = b là hàm hằng, KHÔNG phải hàm số bậc nhất.' },
    ],
    [
      { q: 'Hàm số y = 2x − 3 đồng biến hay nghịch biến? Đồ thị cắt trục Oy ở đâu?', a: 'Vì a = 2 > 0 nên hàm số đồng biến. Khi x = 0 thì y = −3, nên đồ thị cắt Oy tại điểm (0; −3).' },
      { q: 'Cho hàm số y = −x + 5. Tính y khi x = 2 và khi x = −1.', a: 'Tại x = 2: y = −2 + 5 = 3. Tại x = −1: y = −(−1) + 5 = 1 + 5 = 6.' },
      { q: 'Trong các hàm sau, hàm nào là hàm số bậc nhất: y = 3x + 1; y = 5; y = x²; y = −2x?', a: 'y = 3x + 1 (a = 3) và y = −2x (a = −2) là hàm số bậc nhất. y = 5 là hàm hằng; y = x² là hàm bậc hai — đều không phải.' },
    ]
  ),

  'S8TOAN-w22-quiz': L(
    'Đồ thị hàm số bậc nhất — Hệ số góc',
    'Học cách vẽ đồ thị đường thẳng và dùng hệ số góc để xét vị trí tương đối của hai đường thẳng.',
    [
      'Vẽ đồ thị hàm số y = ax + b.',
      'Hiểu ý nghĩa hệ số góc a.',
      'Xét hai đường thẳng song song, cắt nhau, trùng nhau.',
    ],
    [
      { h: 'Cách vẽ đồ thị y = ax + b' },
      { p: 'Đồ thị là một đường thẳng. Để vẽ, ta xác định HAI điểm thuộc đồ thị rồi kẻ đường thẳng qua chúng. Thường chọn giao với hai trục: cho x = 0 được điểm (0; b), cho y = 0 được điểm (−b/a; 0).' },
      { h: 'Hệ số góc' },
      { p: 'Hệ số a gọi là hệ số góc của đường thẳng y = ax + b. Nó cho biết độ "dốc" của đường thẳng: |a| càng lớn đường thẳng càng dốc.' },
      { ul: ['a > 0: đường thẳng tạo với trục Ox một góc nhọn.', 'a < 0: đường thẳng tạo với trục Ox một góc tù.'] },
      { h: 'Vị trí tương đối của hai đường thẳng' },
      { p: 'Cho hai đường thẳng (d): y = ax + b và (d′): y = a′x + b′. So sánh hệ số góc và tung độ gốc để biết vị trí của chúng.' },
      { ul: ['(d) // (d′) khi a = a′ và b ≠ b′.', '(d) ≡ (d′) (trùng nhau) khi a = a′ và b = b′.', '(d) cắt (d′) khi a ≠ a′.'] },
      { h: 'Tìm giao điểm' },
      { p: 'Để tìm giao điểm hai đường thẳng cắt nhau, ta giải phương trình hoành độ giao điểm ax + b = a′x + b′ để tìm x, rồi thay vào một trong hai công thức để tìm y.' },
      { note: 'Hai đường thẳng vuông góc khi tích hai hệ số góc bằng −1 (a·a′ = −1) — kiến thức mở rộng.' },
    ],
    [
      { q: 'Vẽ đồ thị hàm số y = 2x + 1 (nêu hai điểm).', a: 'Cho x = 0 ⇒ y = 1, được điểm (0; 1). Cho x = −1 ⇒ y = −1, được điểm (−1; −1). Kẻ đường thẳng qua hai điểm này.' },
      { q: 'Xét vị trí của hai đường thẳng y = 2x + 1 và y = 2x − 3.', a: 'Có a = a′ = 2 và b = 1 ≠ b′ = −3, nên hai đường thẳng song song.' },
      { q: 'Tìm giao điểm của y = x + 1 và y = −x + 3.', a: 'Phương trình hoành độ: x + 1 = −x + 3 ⇔ 2x = 2 ⇔ x = 1. Thay vào: y = 1 + 1 = 2. Giao điểm (1; 2).' },
    ]
  ),

  'S8TOAN-w23-quiz': L(
    'Hai tam giác đồng dạng',
    'Hai tam giác đồng dạng có hình dạng giống nhau, chỉ khác về kích thước theo một tỉ số không đổi.',
    [
      'Hiểu định nghĩa hai tam giác đồng dạng.',
      'Xác định tỉ số đồng dạng và các yếu tố tương ứng.',
      'Vận dụng tính chất về tỉ số chu vi, diện tích.',
    ],
    [
      { h: 'Định nghĩa' },
      { p: 'Tam giác A′B′C′ gọi là đồng dạng với tam giác ABC nếu: các góc tương ứng bằng nhau (Â′ = Â, B̂′ = B̂, Ĉ′ = Ĉ) VÀ các cạnh tương ứng tỉ lệ: A′B′/AB = B′C′/BC = C′A′/CA.' },
      { h: 'Tỉ số đồng dạng' },
      { p: 'Tỉ số các cạnh tương ứng của hai tam giác đồng dạng gọi là TỈ SỐ ĐỒNG DẠNG, kí hiệu k.' },
      { h: 'Định lí về đường thẳng song song' },
      { p: 'Nếu một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì nó tạo thành một tam giác đồng dạng với tam giác đã cho. Đây là cầu nối giữa Thalès và đồng dạng.' },
      { h: 'Tính chất tỉ số' },
      { ul: ['Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng k.', 'Tỉ số diện tích của hai tam giác đồng dạng bằng BÌNH PHƯƠNG tỉ số đồng dạng, tức k².', 'Tỉ số các đường cao, trung tuyến, phân giác tương ứng cũng bằng k.'] },
      { note: 'Lưu ý viết đúng THỨ TỰ đỉnh tương ứng khi kí hiệu đồng dạng (ΔABC ∽ ΔA′B′C′) — thứ tự này quyết định cặp cạnh, cặp góc nào tương ứng.' },
    ],
    [
      { q: 'ΔABC ∽ ΔDEF với tỉ số đồng dạng 2/3. Nếu BC = 6 thì EF bằng bao nhiêu?', a: 'BC tương ứng EF nên BC/EF = 2/3 ⇒ EF = 6·3/2 = 9.' },
      { q: 'Hai tam giác đồng dạng có tỉ số chu vi là 1 : 2. Tính tỉ số diện tích.', a: 'Tỉ số đồng dạng k = 1/2. Tỉ số diện tích = k² = (1/2)² = 1/4, tức 1 : 4.' },
      { q: 'ΔABC ∽ ΔMNP với k = 3. Nếu diện tích ΔMNP là 5 cm² thì diện tích ΔABC là bao nhiêu?', a: 'Tỉ số diện tích = k² = 9, nên S(ABC) = 9·S(MNP) = 9·5 = 45 cm².' },
    ]
  ),

  'S8TOAN-w24-quiz': L(
    'Các trường hợp đồng dạng của hai tam giác',
    'Ba trường hợp giúp khẳng định hai tam giác đồng dạng mà không cần kiểm tra hết các góc và cạnh: cạnh-cạnh-cạnh, cạnh-góc-cạnh, góc-góc.',
    [
      'Vận dụng trường hợp đồng dạng cạnh-cạnh-cạnh (c.c.c).',
      'Vận dụng trường hợp cạnh-góc-cạnh (c.g.c).',
      'Vận dụng trường hợp góc-góc (g.g), kể cả cho tam giác vuông.',
    ],
    [
      { h: 'Trường hợp cạnh-cạnh-cạnh (c.c.c)' },
      { p: 'Nếu BA CẶP CẠNH tương ứng của hai tam giác tỉ lệ với nhau thì hai tam giác đó đồng dạng: A′B′/AB = B′C′/BC = C′A′/CA ⇒ ΔA′B′C′ ∽ ΔABC.' },
      { h: 'Trường hợp cạnh-góc-cạnh (c.g.c)' },
      { p: 'Nếu HAI CẶP CẠNH tương ứng tỉ lệ và GÓC XEN GIỮA hai cặp cạnh đó bằng nhau thì hai tam giác đồng dạng.' },
      { h: 'Trường hợp góc-góc (g.g)' },
      { p: 'Nếu HAI GÓC của tam giác này lần lượt bằng hai góc của tam giác kia thì hai tam giác đồng dạng. Đây là trường hợp dễ dùng nhất.' },
      { h: 'Các trường hợp đồng dạng của tam giác vuông' },
      { ul: ['Hai tam giác vuông có một cặp góc nhọn bằng nhau thì đồng dạng (g.g).', 'Hai tam giác vuông có hai cặp cạnh góc vuông tỉ lệ thì đồng dạng (c.g.c).', 'Hai tam giác vuông có cạnh huyền và một cạnh góc vuông tỉ lệ thì đồng dạng.'] },
      { note: 'Khi chứng minh đồng dạng, ưu tiên trường hợp g.g vì chỉ cần tìm hai cặp góc bằng nhau (thường nhờ góc chung, góc so le, đồng vị).' },
    ],
    [
      { q: 'ΔABC và ΔDEF có Â = D̂ và B̂ = Ê. Hai tam giác đồng dạng theo trường hợp nào?', a: 'Có hai cặp góc bằng nhau nên đồng dạng theo trường hợp góc-góc (g.g).' },
      { q: 'Vì sao hai tam giác vuông có một góc nhọn bằng nhau thì đồng dạng?', a: 'Mỗi tam giác có một góc vuông (bằng nhau) và thêm một cặp góc nhọn bằng nhau ⇒ có hai cặp góc bằng nhau ⇒ đồng dạng theo g.g.' },
      { q: 'ΔABC có AB = 4, BC = 6 và ΔMNP có MN = 6, NP = 9, biết B̂ = N̂. Hai tam giác có đồng dạng không?', a: 'AB/MN = 4/6 = 2/3; BC/NP = 6/9 = 2/3. Hai cặp cạnh tỉ lệ và góc xen giữa B̂ = N̂ bằng nhau ⇒ đồng dạng theo trường hợp c.g.c.' },
    ]
  ),

  'S8TOAN-w25-quiz': L(
    'Ứng dụng tam giác đồng dạng — Đo gián tiếp chiều cao, khoảng cách',
    'Tam giác đồng dạng cho phép đo chiều cao của cây, tháp hoặc khoảng cách qua sông mà không cần tới tận nơi.',
    [
      'Đo chiều cao vật nhờ bóng nắng.',
      'Đo chiều cao bằng cọc ngắm.',
      'Tính toán dựa trên tỉ số đồng dạng.',
    ],
    [
      { h: 'Vì sao đo được?' },
      { p: 'Cùng một thời điểm, các tia nắng song song tạo với mặt đất những góc bằng nhau. Vật và bóng của nó tạo thành tam giác vuông; các tam giác vuông này ĐỒNG DẠNG nên các cạnh tương ứng tỉ lệ.' },
      { h: 'Phương pháp bóng nắng' },
      { p: 'Cùng thời điểm, một vật cao h có bóng dài b, một vật khác cao H có bóng dài B. Do hai tam giác (vật–bóng) đồng dạng nên H/h = B/b, suy ra H = h·B/b.' },
      { h: 'Phương pháp cọc ngắm' },
      { p: 'Đặt một cọc thẳng đứng, ngắm sao cho đỉnh cọc, mắt người và đỉnh vật cần đo thẳng hàng. Hai tam giác đồng dạng tạo thành cho phép tính chiều cao vật theo các đoạn đo được.' },
      { h: 'Các bước giải' },
      { ul: ['Xác định hai tam giác đồng dạng trong tình huống.', 'Viết tỉ lệ thức giữa các cạnh tương ứng.', 'Thay số đã đo và tính đại lượng cần tìm.'] },
      { note: 'Luôn dùng cùng đơn vị đo cho tất cả các đoạn thẳng trước khi lập tỉ lệ thức.' },
    ],
    [
      { q: 'Một người cao 1,6 m có bóng dài 1 m. Cùng lúc đó, một cái cây có bóng dài 5 m. Tính chiều cao của cây.', a: 'Hai tam giác (người–bóng) và (cây–bóng) đồng dạng: H/1,6 = 5/1 ⇒ H = 1,6·5 = 8 m.' },
      { q: 'Một cột điện cao 4 m có bóng dài 2 m. Cùng lúc, một tòa nhà có bóng dài 30 m. Tính chiều cao tòa nhà.', a: 'H/4 = 30/2 = 15 ⇒ H = 4·15 = 60 m.' },
      { q: 'Một cọc cao 2 m có bóng 1,5 m. Cùng lúc, một tháp có bóng 18 m. Tính chiều cao tháp.', a: 'H/2 = 18/1,5 = 12 ⇒ H = 2·12 = 24 m.' },
    ]
  ),

  'S8TOAN-w26-quiz': L(
    'Định lí Pythagore — Ôn tập và vận dụng',
    'Định lí Pythagore liên hệ ba cạnh của tam giác vuông — đã làm quen ở lớp 7, nay ôn lại và kết hợp với tam giác đồng dạng.',
    [
      'Phát biểu và vận dụng định lí Pythagore.',
      'Vận dụng định lí Pythagore đảo để nhận biết tam giác vuông.',
      'Tính độ dài cạnh trong tam giác vuông.',
    ],
    [
      { h: 'Định lí Pythagore' },
      { p: 'Trong một tam giác vuông, bình phương độ dài cạnh huyền bằng tổng các bình phương độ dài hai cạnh góc vuông: nếu tam giác vuông tại A thì BC² = AB² + AC².' },
      { h: 'Định lí Pythagore đảo' },
      { p: 'Nếu một tam giác có bình phương độ dài một cạnh bằng tổng bình phương độ dài hai cạnh kia thì tam giác đó VUÔNG (góc vuông đối diện cạnh lớn nhất).' },
      { h: 'Bộ ba Pythagore' },
      { p: 'Bộ ba số nguyên dương (a; b; c) thỏa mãn a² + b² = c² gọi là bộ ba Pythagore. Nhận ra chúng giúp tính nhanh.' },
      { ul: ['(3; 4; 5) và các bội: (6; 8; 10), (9; 12; 15)…', '(5; 12; 13).', '(8; 15; 17).'] },
      { h: 'Ứng dụng' },
      { p: 'Định lí Pythagore dùng để tính độ dài đoạn thẳng, đường chéo hình chữ nhật/hình vuông, cạnh hình thoi khi biết hai đường chéo, khoảng cách giữa hai điểm.' },
      { note: 'Cạnh huyền luôn là cạnh DÀI NHẤT và đối diện góc vuông — không nhầm với cạnh góc vuông khi áp dụng công thức.' },
    ],
    [
      { q: 'Tam giác vuông có hai cạnh góc vuông 6 và 8. Tính cạnh huyền.', a: 'Cạnh huyền = √(6² + 8²) = √(36 + 64) = √100 = 10.' },
      { q: 'Tam giác có ba cạnh 5; 12; 13 có vuông không?', a: 'Xét: 5² + 12² = 25 + 144 = 169 = 13². Theo định lí đảo, tam giác vuông (góc vuông đối diện cạnh 13).' },
      { q: 'Hình chữ nhật có hai cạnh 9 cm và 12 cm. Tính độ dài đường chéo.', a: 'Đường chéo = √(9² + 12²) = √(81 + 144) = √225 = 15 cm.' },
    ]
  ),

  'S8TOAN-w27-quiz': L(
    'Hình chóp tam giác đều — Hình chóp tứ giác đều',
    'Chuyển sang hình học không gian với các hình chóp đều — đáy là đa giác đều, các mặt bên là tam giác cân bằng nhau.',
    [
      'Mô tả cấu tạo của hình chóp tam giác đều, hình chóp tứ giác đều.',
      'Tính diện tích xung quanh của hình chóp đều.',
      'Tính thể tích của hình chóp đều.',
    ],
    [
      { h: 'Hình chóp tam giác đều' },
      { p: 'Hình chóp tam giác đều có đáy là tam giác đều; các mặt bên là ba tam giác cân bằng nhau có chung đỉnh. Đoạn nối đỉnh chóp tới trung điểm một cạnh đáy gọi là TRUNG ĐOẠN.' },
      { h: 'Hình chóp tứ giác đều' },
      { p: 'Hình chóp tứ giác đều có đáy là hình vuông; bốn mặt bên là bốn tam giác cân bằng nhau. Đỉnh chóp nằm trên đường thẳng vuông góc với đáy đi qua tâm đáy.' },
      { h: 'Diện tích xung quanh' },
      { p: 'Diện tích xung quanh của hình chóp đều bằng nửa chu vi đáy nhân với trung đoạn: Sxq = (1/2)·C·d, với C là chu vi đáy, d là trung đoạn.' },
      { h: 'Diện tích toàn phần' },
      { p: 'Diện tích toàn phần bằng diện tích xung quanh cộng diện tích đáy: Stp = Sxq + Sđáy.' },
      { h: 'Thể tích' },
      { p: 'Thể tích hình chóp đều bằng một phần ba tích của diện tích đáy với chiều cao: V = (1/3)·Sđáy·h, trong đó h là chiều cao (khoảng cách từ đỉnh tới mặt đáy).' },
      { note: 'Phân biệt TRUNG ĐOẠN d (dùng cho diện tích xung quanh) với CHIỀU CAO h của hình chóp (dùng cho thể tích) — hai đại lượng khác nhau.' },
    ],
    [
      { q: 'Hình chóp tứ giác đều có cạnh đáy 6 cm, trung đoạn 5 cm. Tính diện tích xung quanh.', a: 'Chu vi đáy = 4·6 = 24 cm. Sxq = (1/2)·24·5 = 60 cm².' },
      { q: 'Hình chóp tứ giác đều có đáy hình vuông cạnh 3 cm và chiều cao 4 cm. Tính thể tích.', a: 'Sđáy = 3² = 9 cm². V = (1/3)·9·4 = 12 cm³.' },
      { q: 'Hình chóp tam giác đều có bao nhiêu mặt? Mỗi mặt bên là hình gì?', a: 'Có 4 mặt: 1 mặt đáy (tam giác đều) và 3 mặt bên là tam giác cân bằng nhau.' },
    ]
  ),

  'S8TOAN-w28-quiz': L(
    'Hình lăng trụ đứng — Diện tích, thể tích',
    'Hình lăng trụ đứng có hai đáy là đa giác bằng nhau và song song, các mặt bên là hình chữ nhật.',
    [
      'Mô tả cấu tạo của hình lăng trụ đứng (kể cả hình hộp chữ nhật).',
      'Tính diện tích xung quanh và toàn phần.',
      'Tính thể tích hình lăng trụ đứng.',
    ],
    [
      { h: 'Hình lăng trụ đứng' },
      { p: 'Hình lăng trụ đứng có hai đáy là hai đa giác bằng nhau và nằm trong hai mặt phẳng song song; các mặt bên là hình chữ nhật và vuông góc với mặt đáy. Cạnh bên chính là chiều cao của lăng trụ.' },
      { h: 'Trường hợp đặc biệt' },
      { ul: ['Hình hộp chữ nhật là lăng trụ đứng có đáy là hình chữ nhật.', 'Hình lập phương là hình hộp chữ nhật có ba kích thước bằng nhau.'] },
      { h: 'Diện tích xung quanh' },
      { p: 'Diện tích xung quanh của hình lăng trụ đứng bằng chu vi đáy nhân với chiều cao: Sxq = C·h, với C là chu vi đáy, h là chiều cao.' },
      { h: 'Diện tích toàn phần' },
      { p: 'Diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai đáy: Stp = Sxq + 2·Sđáy.' },
      { h: 'Thể tích' },
      { p: 'Thể tích của hình lăng trụ đứng bằng diện tích đáy nhân với chiều cao: V = Sđáy·h.' },
      { note: 'Với hình hộp chữ nhật ba kích thước a, b, c thì V = a·b·c; đường chéo của hình hộp bằng √(a² + b² + c²).' },
    ],
    [
      { q: 'Lăng trụ đứng đáy là tam giác đều cạnh 4 cm, chiều cao 10 cm. Tính diện tích xung quanh.', a: 'Chu vi đáy = 3·4 = 12 cm. Sxq = C·h = 12·10 = 120 cm².' },
      { q: 'Hình hộp chữ nhật có ba kích thước 4 cm, 5 cm, 6 cm. Tính thể tích.', a: 'V = a·b·c = 4·5·6 = 120 cm³.' },
      { q: 'Lăng trụ đứng đáy hình chữ nhật 3 cm × 4 cm, chiều cao 10 cm. Tính diện tích toàn phần.', a: 'Sđáy = 3·4 = 12 cm²; chu vi đáy = 2·(3 + 4) = 14 cm. Sxq = 14·10 = 140 cm². Stp = 140 + 2·12 = 164 cm².' },
    ]
  ),

  'S8TOAN-w29-quiz': L(
    'Thu thập và phân loại dữ liệu — Biểu đồ',
    'Mở đầu phần Thống kê: cách thu thập, tổ chức dữ liệu và biểu diễn chúng bằng các loại biểu đồ phù hợp.',
    [
      'Phân loại dữ liệu định tính và định lượng.',
      'Lập bảng thống kê (bảng tần số).',
      'Lựa chọn và đọc biểu đồ phù hợp.',
    ],
    [
      { h: 'Phân loại dữ liệu' },
      { p: 'Dữ liệu thu thập được chia thành: dữ liệu ĐỊNH TÍNH (mô tả tính chất, ví dụ màu sắc, giới tính) và dữ liệu ĐỊNH LƯỢNG (biểu thị bằng số, ví dụ điểm số, chiều cao).' },
      { h: 'Bảng thống kê (bảng tần số)' },
      { p: 'Để tổ chức dữ liệu, ta lập bảng gồm các giá trị và TẦN SỐ (số lần xuất hiện) của mỗi giá trị. Tổng các tần số bằng tổng số đối tượng được thống kê.' },
      { h: 'Các loại biểu đồ thường gặp' },
      { ul: ['Biểu đồ tranh, biểu đồ cột: so sánh số liệu giữa các nhóm rời rạc.', 'Biểu đồ cột kép: so sánh hai bộ số liệu cùng lúc.', 'Biểu đồ đoạn thẳng: thể hiện sự thay đổi theo thời gian.', 'Biểu đồ hình quạt tròn: thể hiện tỉ lệ phần trăm của các phần so với tổng thể.'] },
      { h: 'Chọn biểu đồ phù hợp' },
      { p: 'Muốn so sánh số lượng giữa các nhóm thì dùng biểu đồ cột; muốn thấy xu thế theo thời gian thì dùng biểu đồ đoạn thẳng; muốn thấy tỉ lệ thành phần thì dùng biểu đồ hình quạt tròn.' },
      { note: 'Khi đọc biểu đồ, luôn chú ý tiêu đề, đơn vị trên các trục và chú giải để tránh hiểu sai số liệu.' },
    ],
    [
      { q: 'Điểm kiểm tra của 10 học sinh: 5, 6, 5, 7, 8, 6, 5, 7, 8, 6. Lập bảng tần số.', a: 'Giá trị 5: tần số 3; giá trị 6: tần số 3; giá trị 7: tần số 2; giá trị 8: tần số 2. Tổng tần số = 10.' },
      { q: 'Muốn thể hiện tỉ lệ phần trăm học sinh nam và nữ trong lớp, nên dùng biểu đồ nào?', a: 'Nên dùng biểu đồ hình quạt tròn vì nó thể hiện tỉ lệ phần trăm các phần so với tổng thể.' },
      { q: 'Muốn theo dõi nhiệt độ trung bình mỗi tháng trong một năm, nên dùng biểu đồ nào?', a: 'Nên dùng biểu đồ đoạn thẳng vì nó thể hiện rõ sự thay đổi của số liệu theo thời gian.' },
    ]
  ),

  'S8TOAN-w30-quiz': L(
    'Số trung bình — Mốt — Trung vị',
    'Ba số đặc trưng đo "trung tâm" của một mẫu số liệu: số trung bình, mốt và trung vị.',
    [
      'Tính số trung bình cộng của mẫu số liệu.',
      'Tìm mốt của mẫu số liệu.',
      'Tìm trung vị của mẫu số liệu.',
    ],
    [
      { h: 'Số trung bình cộng' },
      { p: 'Số trung bình cộng của một mẫu số liệu bằng TỔNG tất cả các giá trị chia cho SỐ giá trị. Nó cho biết "mức trung bình" của mẫu.' },
      { h: 'Mốt' },
      { p: 'Mốt của mẫu số liệu là giá trị có TẦN SỐ LỚN NHẤT (xuất hiện nhiều lần nhất). Một mẫu có thể có nhiều mốt.' },
      { h: 'Trung vị' },
      { p: 'Để tìm trung vị, ta sắp xếp các giá trị theo thứ tự KHÔNG GIẢM. Nếu số giá trị là LẺ, trung vị là giá trị chính giữa. Nếu số giá trị là CHẴN, trung vị là trung bình cộng của hai giá trị chính giữa.' },
      { h: 'Ý nghĩa và lựa chọn' },
      { ul: ['Số trung bình phù hợp khi số liệu khá đồng đều.', 'Khi có giá trị quá lớn hoặc quá nhỏ (giá trị bất thường), trung vị phản ánh "trung tâm" tốt hơn số trung bình.', 'Mốt hữu ích với dữ liệu định tính (giá trị phổ biến nhất).'] },
      { note: 'Đừng quên SẮP XẾP số liệu trước khi tìm trung vị — đây là bước hay bị bỏ sót.' },
    ],
    [
      { q: 'Cho dãy số liệu 2; 3; 5; 7; 8. Tính số trung bình cộng.', a: 'Trung bình = (2 + 3 + 5 + 7 + 8)/5 = 25/5 = 5.' },
      { q: 'Cho dãy 3; 5; 5; 7; 8. Tìm mốt và trung vị.', a: 'Mốt là 5 (xuất hiện 2 lần, nhiều nhất). Dãy đã sắp xếp tăng, có 5 số nên trung vị là số chính giữa = 5.' },
      { q: 'Cho dãy 4; 6; 8; 10. Tìm trung vị.', a: 'Có 4 số (chẵn), hai số chính giữa là 6 và 8. Trung vị = (6 + 8)/2 = 7.' },
    ]
  ),

  'S8TOAN-w31-quiz': L(
    'Xác suất của biến cố',
    'Xác suất là một số đo khả năng xảy ra của một biến cố. Tuần này học cách tính xác suất theo công thức cổ điển.',
    [
      'Hiểu khái niệm biến cố và không gian mẫu.',
      'Tính xác suất của biến cố bằng công thức cổ điển.',
      'Vận dụng vào các bài toán đơn giản.',
    ],
    [
      { h: 'Phép thử, kết quả, không gian mẫu' },
      { p: 'Phép thử là một hành động mà ta không đoán trước được kết quả (ví dụ gieo xúc xắc). Tập hợp tất cả các kết quả có thể của phép thử gọi là KHÔNG GIAN MẪU.' },
      { h: 'Biến cố' },
      { p: 'Biến cố là một tập con của không gian mẫu, mô tả một sự kiện ta quan tâm. Kết quả làm cho biến cố xảy ra gọi là kết quả THUẬN LỢI cho biến cố đó.' },
      { h: 'Công thức xác suất cổ điển' },
      { p: 'Khi các kết quả của phép thử đồng khả năng, xác suất của biến cố A bằng số kết quả thuận lợi chia cho tổng số kết quả: P(A) = (số kết quả thuận lợi) / (tổng số kết quả).' },
      { h: 'Tính chất của xác suất' },
      { ul: ['0 ≤ P(A) ≤ 1 với mọi biến cố A.', 'P(A) = 0: biến cố không thể xảy ra; P(A) = 1: biến cố chắc chắn.', 'Xác suất của biến cố A và biến cố đối của nó có tổng bằng 1.'] },
      { note: 'Khi tính xác suất, phải đảm bảo các kết quả ĐỒNG KHẢ NĂNG; nếu không, công thức cổ điển không áp dụng được.' },
    ],
    [
      { q: 'Gieo một con xúc xắc cân đối 6 mặt. Tính xác suất xuất hiện mặt có số chấm chẵn.', a: 'Không gian mẫu có 6 kết quả. Số chấm chẵn gồm {2; 4; 6}: 3 kết quả thuận lợi. P = 3/6 = 1/2.' },
      { q: 'Một hộp có 3 bi đỏ và 2 bi xanh. Lấy ngẫu nhiên 1 viên. Tính xác suất lấy được bi đỏ.', a: 'Tổng số bi = 5; số bi đỏ = 3. P(đỏ) = 3/5.' },
      { q: 'Gieo một con xúc xắc. Tính xác suất xuất hiện số chấm lớn hơn 4.', a: 'Số chấm lớn hơn 4 gồm {5; 6}: 2 kết quả. P = 2/6 = 1/3.' },
    ]
  ),

  'S8TOAN-w32-quiz': L(
    'Phương trình tích — Phương trình chứa ẩn ở mẫu',
    'Hai dạng phương trình quan trọng: phương trình tích (đưa về dạng tích bằng 0) và phương trình chứa ẩn ở mẫu.',
    [
      'Giải phương trình tích A(x)·B(x) = 0.',
      'Tìm điều kiện xác định của phương trình chứa ẩn ở mẫu.',
      'Giải phương trình chứa ẩn ở mẫu và đối chiếu điều kiện.',
    ],
    [
      { h: 'Phương trình tích' },
      { p: 'Phương trình tích có dạng A(x)·B(x) = 0. Áp dụng tính chất: một tích bằng 0 khi và chỉ khi MỘT trong các thừa số bằng 0. Vậy A(x)·B(x) = 0 ⇔ A(x) = 0 hoặc B(x) = 0.' },
      { h: 'Cách đưa về phương trình tích' },
      { p: 'Chuyển tất cả về một vế để vế kia bằng 0, rồi PHÂN TÍCH vế đó thành nhân tử. Sau đó giải từng phương trình con.' },
      { h: 'Phương trình chứa ẩn ở mẫu' },
      { p: 'Đây là phương trình mà ẩn xuất hiện ở mẫu thức. Trước khi giải, bắt buộc phải tìm ĐIỀU KIỆN XÁC ĐỊNH (tất cả các mẫu khác 0).' },
      { h: 'Các bước giải phương trình chứa ẩn ở mẫu' },
      { ul: ['Bước 1: Tìm điều kiện xác định (ĐKXĐ).', 'Bước 2: Quy đồng mẫu hai vế rồi khử mẫu.', 'Bước 3: Giải phương trình vừa nhận được.', 'Bước 4: Đối chiếu nghiệm với ĐKXĐ rồi kết luận.'] },
      { note: 'Nghiệm tìm được nếu VI PHẠM điều kiện xác định thì phải LOẠI. Đây là điểm khác biệt quan trọng so với phương trình thường.' },
    ],
    [
      { q: 'Giải phương trình (x − 2)(x + 3) = 0.', a: 'x − 2 = 0 ⇒ x = 2, hoặc x + 3 = 0 ⇒ x = −3. Tập nghiệm: {−3; 2}.' },
      { q: 'Giải phương trình x² − 5x = 0.', a: 'Phân tích: x(x − 5) = 0 ⇒ x = 0 hoặc x = 5. Tập nghiệm: {0; 5}.' },
      { q: 'Giải phương trình 1/(x − 1) = 2/x.', a: 'ĐKXĐ: x ≠ 0 và x ≠ 1. Khử mẫu (nhân chéo): x = 2(x − 1) ⇒ x = 2x − 2 ⇒ x = 2. Giá trị x = 2 thỏa ĐKXĐ nên là nghiệm.' },
    ]
  ),

  'S8TOAN-w33-quiz': L(
    'Ôn tập Đại số học kì II',
    'Tổng hợp kiến thức Đại số học kì 2: bất đẳng thức, bất phương trình, hàm số bậc nhất, các loại phương trình.',
    [
      'Ôn bất đẳng thức và bất phương trình bậc nhất.',
      'Ôn hàm số bậc nhất và đồ thị.',
      'Ôn phương trình tích và phương trình chứa ẩn ở mẫu.',
    ],
    [
      { h: 'Bản đồ kiến thức Đại số HK2' },
      { p: 'HK2 đi từ bất đẳng thức → bất phương trình bậc nhất → hàm số bậc nhất và đồ thị → phương trình tích và phương trình chứa ẩn ở mẫu.' },
      { h: 'Bất đẳng thức và bất phương trình' },
      { ul: ['Tính chất bắc cầu, cộng và nhân; nhân với số âm thì ĐỔI CHIỀU.', 'Giải bất phương trình bậc nhất, biểu diễn tập nghiệm trên trục số.'] },
      { h: 'Hàm số bậc nhất' },
      { ul: ['y = ax + b (a ≠ 0): a > 0 đồng biến, a < 0 nghịch biến.', 'Vẽ đồ thị qua hai điểm; xét song song, cắt nhau, trùng nhau theo a và b.'] },
      { h: 'Các loại phương trình' },
      { p: 'Phương trình tích A·B = 0 ⇔ A = 0 hoặc B = 0. Phương trình chứa ẩn ở mẫu: tìm ĐKXĐ, khử mẫu, giải, đối chiếu điều kiện.' },
      { note: 'Với phương trình chứa ẩn ở mẫu, luôn kiểm tra lại nghiệm có thỏa điều kiện xác định hay không trước khi kết luận.' },
    ],
    [
      { q: 'Giải bất phương trình 3x − 6 ≤ 0.', a: '3x ≤ 6 ⇒ x ≤ 2 (chia 3 dương, giữ chiều). Tập nghiệm: x ≤ 2.' },
      { q: 'Giải phương trình (x² − 1)/(x − 1) = 3 (với x ≠ 1).', a: 'Rút gọn vế trái: (x − 1)(x + 1)/(x − 1) = x + 1. Phương trình thành x + 1 = 3 ⇒ x = 2 (thỏa ĐKXĐ x ≠ 1).' },
      { q: 'Xét vị trí hai đường thẳng y = 3x − 2 và y = 3x + 4.', a: 'Có a = a′ = 3 nhưng b = −2 ≠ b′ = 4, nên hai đường thẳng song song.' },
    ]
  ),

  'S8TOAN-w34-quiz': L(
    'Ôn tập Hình học học kì II',
    'Tổng hợp kiến thức Hình học học kì 2: tam giác đồng dạng, định lí Pythagore, hình chóp đều và lăng trụ đứng.',
    [
      'Ôn ba trường hợp đồng dạng và ứng dụng đo gián tiếp.',
      'Ôn định lí Pythagore và định lí đảo.',
      'Ôn diện tích, thể tích hình chóp đều và lăng trụ đứng.',
    ],
    [
      { h: 'Tam giác đồng dạng' },
      { p: 'Ba trường hợp đồng dạng: c.c.c, c.g.c, g.g. Tỉ số chu vi bằng k, tỉ số diện tích bằng k². Ứng dụng đo chiều cao, khoảng cách gián tiếp nhờ tam giác đồng dạng.' },
      { h: 'Định lí Pythagore' },
      { p: 'Trong tam giác vuông: bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Định lí đảo dùng để nhận biết tam giác vuông và tính độ dài đoạn thẳng.' },
      { h: 'Hình chóp đều' },
      { ul: ['Sxq = (1/2)·(chu vi đáy)·(trung đoạn).', 'Stp = Sxq + Sđáy.', 'V = (1/3)·Sđáy·(chiều cao).'] },
      { h: 'Hình lăng trụ đứng' },
      { ul: ['Sxq = (chu vi đáy)·(chiều cao).', 'Stp = Sxq + 2·Sđáy.', 'V = Sđáy·(chiều cao).'] },
      { note: 'Ghi nhớ: thể tích hình chóp có hệ số 1/3, còn lăng trụ thì không — đây là điểm dễ nhầm nhất.' },
    ],
    [
      { q: 'Hai tam giác đồng dạng có tỉ số đồng dạng 1 : 3. Tính tỉ số diện tích.', a: 'Tỉ số diện tích = (1/3)² = 1/9, tức 1 : 9.' },
      { q: 'Hình hộp chữ nhật ba kích thước 4, 5, 6. Tính thể tích và độ dài đường chéo.', a: 'V = 4·5·6 = 120 (đơn vị thể tích). Đường chéo = √(4² + 5² + 6²) = √(16 + 25 + 36) = √77 ≈ 8,77.' },
      { q: 'Hình chóp tứ giác đều đáy hình vuông cạnh 6 cm, chiều cao 8 cm. Tính thể tích.', a: 'Sđáy = 6² = 36 cm². V = (1/3)·36·8 = 96 cm³.' },
    ]
  ),

  'S8TOAN-w35-quiz': L(
    'Ôn tập cuối năm',
    'Tổng kết toàn bộ chương trình Toán 8 — hệ thống lại cả Đại số, Hình học, Thống kê và Xác suất để chuẩn bị cho bài kiểm tra cuối năm.',
    [
      'Hệ thống lại các chủ đề chính trong năm.',
      'Giải các bài tập tổng hợp nhiều dạng.',
      'Tự đánh giá và củng cố các phần còn yếu.',
    ],
    [
      { h: 'Đại số cả năm' },
      { ul: ['Đa thức nhiều biến, bảy hằng đẳng thức, phân tích nhân tử, phân thức đại số.', 'Phương trình bậc nhất và bài toán lập phương trình.', 'Bất đẳng thức, bất phương trình bậc nhất.', 'Hàm số bậc nhất, đồ thị; phương trình tích, phương trình chứa ẩn ở mẫu.'] },
      { h: 'Hình học cả năm' },
      { ul: ['Tứ giác: hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông.', 'Định lí Thalès, tam giác đồng dạng và ứng dụng.', 'Định lí Pythagore.', 'Hình chóp đều và hình lăng trụ đứng: diện tích, thể tích.'] },
      { h: 'Thống kê và Xác suất' },
      { p: 'Thu thập, phân loại dữ liệu; bảng tần số và biểu đồ; số trung bình, mốt, trung vị; xác suất của biến cố theo công thức cổ điển.' },
      { h: 'Những công thức trọng tâm cần thuộc' },
      { ul: ['Bảy hằng đẳng thức đáng nhớ.', 'Tỉ số diện tích hai tam giác đồng dạng = k²; định lí Pythagore c² = a² + b².', 'Lăng trụ đứng: V = Sđáy·h; hình chóp đều: V = (1/3)·Sđáy·h.', 'Xác suất cổ điển: P(A) = (số kết quả thuận lợi)/(tổng số kết quả).'] },
      { note: 'Cách ôn hiệu quả: với mỗi chủ đề tự ra một vài đề và giải lại; lập sổ tay các công thức và hằng đẳng thức cần nhớ.' },
    ],
    [
      { q: 'Khai triển (2x + 3)².', a: '(2x)² + 2·2x·3 + 3² = 4x² + 12x + 9.' },
      { q: 'Phân tích x² − 2x + 1 thành nhân tử.', a: 'Nhận dạng hằng đẳng thức: x² − 2x + 1 = (x − 1)².' },
      { q: 'Giải phương trình 2x − 5 = 3.', a: '2x = 8 ⇒ x = 4. Vậy nghiệm là x = 4.' },
    ]
  ),

  'S8TOAN-w36-quiz': L(
    'Kết thúc Toán 8 — Hành trang vào lớp 9',
    'Chào mừng các em đến với tuần học cuối cùng của năm lớp 8! Đây là dịp để nhìn lại toàn bộ hành trình — từ bảy hằng đẳng thức, phân thức đại số, hàm số bậc nhất, đến tứ giác, tam giác đồng dạng, hình chóp và xác suất. Mỗi viên gạch toán học đó đang chờ đợi để nâng em lên những tầm cao mới ở lớp 9.',
    [
      'Hệ thống lại toàn bộ chương trình Toán 8 theo bốn mạch lớn: Đại số, Hình học, Thống kê & Xác suất.',
      'Nhận diện các dạng bài trọng tâm và những công thức không thể thiếu.',
      'Hiểu rõ hành trang kiến thức cần chuẩn bị để học tốt Toán 9.',
    ],
    [
      { h: 'Mạch 1 — Đại số' },
      { ul: [
        'Đa thức nhiều biến: bậc, thu gọn, cộng trừ nhân.',
        'Bảy hằng đẳng thức đáng nhớ — nền tảng của phân tích nhân tử.',
        'Phân tích nhân tử: đặt nhân tử chung, hằng đẳng thức, nhóm, hệ số bất định.',
        'Phân thức đại số: rút gọn, cộng trừ nhân chia, tìm ĐKXĐ.',
        'Phương trình bậc nhất một ẩn và bài toán lập phương trình.',
        'Bất phương trình bậc nhất; hàm số bậc nhất y = ax + b và đồ thị.',
        'Phương trình tích, phương trình chứa ẩn ở mẫu.',
      ] },
      { h: 'Mạch 2 — Hình học' },
      { ul: [
        'Tứ giác đặc biệt: hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông — tính chất và dấu hiệu nhận biết.',
        'Định lí Thalès và hệ quả; đường trung bình của tam giác và hình thang.',
        'Tam giác đồng dạng (c.c.c, c.g.c, g.g): tỉ số k, tỉ số chu vi = k, tỉ số diện tích = k².',
        'Ứng dụng đo gián tiếp nhờ tam giác đồng dạng.',
        'Định lí Pythagore và đảo; hình chóp đều, lăng trụ đứng (S, V).',
      ] },
      { h: 'Mạch 3 — Thống kê và Xác suất' },
      { p: 'Thu thập, phân loại dữ liệu; bảng tần số, tần suất và biểu đồ (cột, đường, quạt); các số đặc trưng (trung bình, mốt, trung vị). Xác suất theo công thức cổ điển: P(A) = số kết quả thuận lợi / tổng số kết quả đồng khả năng.' },
      { h: 'Cầu nối sang lớp 9' },
      { ul: [
        'Căn bậc hai — hệ thức lượng trong tam giác vuông (sẽ học HK I).',
        'Phương trình bậc hai một ẩn: discriminant Δ, công thức nghiệm, hệ thức Viète.',
        'Hàm số bậc hai y = ax² và parabol; bất phương trình bậc hai.',
        'Hình học: đường tròn, góc với đường tròn, tứ giác nội tiếp.',
        'Thống kê mô tả nâng cao và xác suất có điều kiện (lớp 9).',
      ] },
      { h: 'Những công thức không thể thiếu' },
      { ul: [
        '7 HĐT: (a±b)², a²−b², (a±b)³, a³±b³, (a±b)(a²∓ab+b²).',
        'Đồng dạng: k tỉ số → k² diện tích → k³ thể tích.',
        'Hình chóp đều: V = (1/3)·S_đáy·h; lăng trụ: V = S_đáy·h.',
        'Xác suất cổ điển: P(A) = m/n.',
      ] },
      { note: 'Mỗi chương toán là một công cụ; người học giỏi không chỉ nhớ công thức mà còn biết chọn đúng công cụ cho đúng bài toán. Hãy tự ra đề và giải để kiểm tra mình trước khi bước vào lớp 9!' },
    ],
    [
      { q: 'Hãy khai triển và thu gọn: (x − 2)(x + 2) − (x − 1)².', a: '(x−2)(x+2) = x²−4 (HĐT số 3). (x−1)² = x²−2x+1 (HĐT số 1). Kết quả: x²−4 − (x²−2x+1) = x²−4−x²+2x−1 = 2x−5.' },
      { q: 'Hai tam giác đồng dạng có tỉ số k = 3. Tam giác nhỏ có diện tích 12 cm². Tính diện tích tam giác lớn.', a: 'Tỉ số diện tích = k² = 9. Diện tích tam giác lớn = 12 × 9 = 108 cm².' },
      { q: 'Giải phương trình: (2x − 1)/(x + 1) = 1 với x ≠ −1.', a: 'ĐKXĐ: x ≠ −1. Nhân cả hai vế với (x+1): 2x−1 = x+1 ⇒ x = 2 (thỏa ĐK). Nghiệm: x = 2.' },
    ]
  ),
};
