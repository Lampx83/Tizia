// ============================================================
// Trường CNTT — Scenarios Năm 2 (I2.1 → I2.5)
// ============================================================
// Soạn theo chương trình Cử nhân CNTT/KHMT VN (UET, HUST, FPT…).
// Mỗi câu có explanation giải thích kỹ để sinh viên năm 2 tự học.
// ============================================================

// ─── I2.1 · Cấu trúc dữ liệu & Giải thuật ──────────────────
export const I21_QUIZ = {
  id: 'I2.1-dsa-quiz',
  title: 'I2.1 · Cấu trúc dữ liệu & Giải thuật — Big-O, Stack, Tree, Sort',
  kind: 'quiz',
  yearLevel: 2, subject: 'cau-truc-du-lieu', difficulty: 2,
  skillsTrained: ['bigo', 'stack-queue', 'linked-list', 'tree', 'sorting', 'searching'],
  questions: [
    {
      stem: 'Độ phức tạp thời gian (Big-O) của thuật toán tìm kiếm tuyến tính (linear search) trên mảng n phần tử là:',
      choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      answer: 2,
      explanation: 'Linear search duyệt tuần tự từng phần tử: trường hợp tệ nhất duyệt hết n phần tử → O(n). O(1) là truy cập mảng theo index. O(log n) là binary search (mảng đã sắp xếp). O(n²) là Bubble Sort. Big-O mô tả tốc độ tăng trưởng thời gian theo kích thước input — không phải thời gian tuyệt đối.',
    },
    {
      stem: 'Stack (ngăn xếp) hoạt động theo nguyên tắc:',
      choices: ['FIFO — First In, First Out', 'LIFO — Last In, First Out', 'Random Access', 'Priority-based'],
      answer: 1,
      explanation: 'Stack: LIFO — phần tử vào SAU cùng thì ra TRƯỚC. Ví dụ: chồng sách (lấy cuốn trên cùng trước). Thao tác: push (thêm vào đỉnh), pop (lấy từ đỉnh), peek (xem đỉnh không lấy). Ứng dụng: call stack (hàm đệ quy), undo/redo trong editor, kiểm tra ngoặc hợp lệ, chuyển đổi biểu thức infix → postfix. Queue dùng FIFO.',
    },
    {
      stem: 'Ưu điểm chính của Linked List so với Array là:',
      choices: [
        'Truy cập phần tử theo index nhanh hơn O(1)',
        'Chèn/xóa phần tử ở đầu hoặc giữa không cần dịch chuyển — O(1) nếu có con trỏ',
        'Tốn ít bộ nhớ hơn',
        'Tìm kiếm binary search nhanh hơn',
      ],
      answer: 1,
      explanation: 'Linked List: mỗi node chứa dữ liệu + con trỏ (pointer) đến node tiếp theo. Chèn/xóa O(1) nếu đã có con trỏ tới vị trí đó (chỉ cập nhật pointer). Array: chèn giữa cần dịch chuyển O(n) phần tử. Nhược điểm Linked List: không hỗ trợ random access (phải duyệt từ đầu — O(n)); tốn thêm bộ nhớ cho pointer. Array liên tục trong bộ nhớ → cache-friendly hơn.',
    },
    {
      stem: 'Trong cây nhị phân tìm kiếm (BST) cân bằng với n nút, độ phức tạp tìm kiếm là:',
      choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'BST cân bằng có chiều cao h = log₂(n). Mỗi bước so sánh loại bỏ nửa cây → O(log n). BST lệch (skewed/degenerate) — ví dụ chèn 1,2,3,4,5 theo thứ tự — biến thành linked list, tìm kiếm O(n). Cây tự cân bằng (AVL, Red-Black Tree) đảm bảo O(log n) mọi lúc. Python: thư viện sortedcontainers.SortedList dùng B-Tree.',
    },
    {
      stem: 'Độ phức tạp trung bình của tra cứu (lookup) trong Hash Table là:',
      choices: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      answer: 2,
      explanation: 'Hash Table: hàm hash tính index từ key → truy cập trực tiếp mảng → O(1) trung bình. Collision (va chạm) giảm hiệu suất: hai key có cùng hash → chaining (linked list mỗi bucket) hoặc open addressing. Trường hợp tệ nhất (tất cả collision): O(n). Load factor (số phần tử / số bucket) nên < 0.7. Python dict và set dùng hash table.',
    },
    {
      stem: 'Merge Sort có độ phức tạp thời gian là:',
      choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 1,
      explanation: 'Merge Sort: chia đôi mảng đệ quy (log n tầng) → mỗi tầng merge O(n) → tổng O(n log n). Ưu điểm: ổn định (stable sort), hiệu suất không đổi O(n log n) cả best/average/worst case. Nhược điểm: cần O(n) bộ nhớ phụ. So sánh: Quick Sort trung bình O(n log n) nhưng worst O(n²); Bubble/Insertion/Selection Sort: O(n²).',
    },
    {
      stem: 'Thuật toán BFS (Breadth-First Search) trên đồ thị sử dụng cấu trúc dữ liệu nào?',
      choices: ['Stack', 'Queue', 'Heap (Priority Queue)', 'Linked List'],
      answer: 1,
      explanation: 'BFS dùng Queue (FIFO): duyệt theo từng "lớp" từ gốc ra xa. Thêm các đỉnh kề vào cuối queue, lấy từ đầu → duyệt hết lớp hiện tại trước lớp tiếp theo. DFS (Depth-First Search) dùng Stack (hoặc đệ quy = implicit stack): đi sâu trước, quay lại sau. BFS tìm đường ngắn nhất trên đồ thị không có trọng số. DFS tốt hơn khi cần duyệt toàn bộ hoặc phát hiện chu trình.',
    },
    {
      stem: 'Bubble Sort hoạt động bằng cách:',
      choices: [
        'Chọn phần tử nhỏ nhất và đặt vào đầu mảng mỗi vòng',
        'Chia đôi mảng và sắp xếp đệ quy',
        'So sánh và hoán đổi cặp phần tử kề nhau, phần tử lớn "nổi bọt" lên cuối',
        'Chèn từng phần tử vào đúng vị trí đã sắp xếp',
      ],
      answer: 2,
      explanation: 'Bubble Sort: mỗi vòng lặp duyệt mảng, hoán đổi arr[i] và arr[i+1] nếu arr[i] > arr[i+1]. Sau n-1 vòng lặp, mảng được sắp xếp. Phần tử lớn nhất "nổi" lên cuối mỗi vòng — như bong bóng. O(n²) time, O(1) space. Là thuật toán đơn giản nhất nhưng chậm nhất — thực tế không dùng cho n lớn. Selection Sort: chọn min mỗi vòng. Insertion Sort: chèn đúng chỗ.',
    },
    {
      stem: 'Cây nhị phân hoàn chỉnh (Complete Binary Tree) với chiều cao h có tối đa bao nhiêu nút?',
      choices: ['2h', '2h+1', '2^(h+1) - 1', 'h²'],
      answer: 2,
      explanation: 'Cây nhị phân đầy đủ (Full/Perfect Binary Tree) chiều cao h: mỗi tầng i có 2^i nút → tổng = 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1. Ví dụ h=3: 1+2+4+8 = 15 = 2^4 - 1. Heap là Complete Binary Tree: lấp đầy từ trái sang. Min-Heap: cha ≤ con (phần tử nhỏ nhất ở gốc). Dùng trong Priority Queue, thuật toán Dijkstra, Heap Sort.',
    },
    {
      stem: 'Đâu là độ phức tạp không gian (space complexity) của Quick Sort trong trường hợp trung bình?',
      choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 1,
      explanation: 'Quick Sort: đệ quy với call stack sâu log n (trung bình khi pivot tốt) → space O(log n). Worst case (mảng đã sắp xếp, pivot = phần tử đầu/cuối): độ sâu n → O(n). Merge Sort luôn O(n) space (mảng phụ). In-place sorting (Bubble, Selection, Insertion): O(1) không gian. Quick Sort thường nhanh hơn Merge Sort trong thực tế vì cache-friendly hơn.',
    },
  ],
};

// ─── I2.2 · Lập trình hướng đối tượng (Java) ────────────────
export const I22_QUIZ = {
  id: 'I2.2-oop-java-quiz',
  title: 'I2.2 · Lập trình hướng đối tượng Java — Class, Kế thừa & Đa hình',
  kind: 'quiz',
  yearLevel: 2, subject: 'oop', difficulty: 2,
  skillsTrained: ['class-object', 'ke-thua', 'da-hinh', 'interface', 'exception', 'collections'],
  questions: [
    {
      stem: '4 trụ cột của lập trình hướng đối tượng (OOP) là:',
      choices: [
        'Loop, Condition, Function, Variable',
        'Encapsulation, Inheritance, Polymorphism, Abstraction',
        'Class, Object, Method, Attribute',
        'Public, Private, Protected, Default',
      ],
      answer: 1,
      explanation: '4 trụ cột OOP: (1) Encapsulation (đóng gói): ẩn dữ liệu, chỉ lộ qua getter/setter; (2) Inheritance (kế thừa): lớp con dùng lại code lớp cha; (3) Polymorphism (đa hình): cùng method, hành vi khác nhau tùy object; (4) Abstraction (trừu tượng): ẩn chi tiết, chỉ lộ interface. Mnemonic: A PIE (Abstraction, Polymorphism, Inheritance, Encapsulation).',
    },
    {
      stem: 'Trong Java, từ khóa "extends" được dùng để:',
      choices: [
        'Implement một interface',
        'Kế thừa (inherit) từ một class cha (superclass)',
        'Khai báo một phương thức trừu tượng',
        'Nhập thư viện bên ngoài',
      ],
      answer: 1,
      explanation: 'extends: lớp con kế thừa lớp cha — class Dog extends Animal { }. Dog nhận toàn bộ fields + methods của Animal (trừ private). Java chỉ hỗ trợ đơn kế thừa (single inheritance — 1 lớp cha). implements: triển khai interface (có thể implement nhiều). interface: dùng extends khi interface kế thừa interface khác. super(): gọi constructor lớp cha.',
    },
    {
      stem: 'Đây là đoạn code Java:\n  Animal a = new Dog();\n  a.sound();\nNếu Dog ghi đè (override) sound(), phương thức nào được gọi?',
      choices: [
        'Animal.sound() — vì kiểu khai báo là Animal',
        'Dog.sound() — vì object thực sự là Dog (runtime polymorphism)',
        'Lỗi biên dịch',
        'Gọi ngẫu nhiên một trong hai',
      ],
      answer: 1,
      explanation: 'Runtime Polymorphism (Dynamic Dispatch): Java quyết định method tại RUNTIME dựa vào kiểu THỰC của object (Dog), không phải kiểu khai báo (Animal). Đây là "dynamic method dispatch". Override: cùng tên, cùng tham số, khác lớp → con ghi đè cha. Overload: cùng tên nhưng khác tham số → quyết định tại compile time (static polymorphism). @Override annotation giúp compiler bắt lỗi.',
    },
    {
      stem: 'Sự khác biệt chính giữa abstract class và interface trong Java (trước Java 8) là:',
      choices: [
        'Abstract class dùng cho OOP, interface dùng cho FP',
        'Interface chỉ có phương thức trừu tượng (không có body); abstract class có thể có cả phương thức đã implement',
        'Abstract class có thể implement nhiều lần; interface chỉ 1 lần',
        'Hoàn toàn giống nhau',
      ],
      answer: 1,
      explanation: 'Abstract class: có thể có fields + constructors + methods (cả abstract lẫn concrete). Interface (trước Java 8): chỉ có abstract methods + constants (public static final). Java 8+: interface có default methods và static methods. Khi nào dùng: abstract class khi có "is-a" mạnh + code chung; interface khi định nghĩa "contract/capability" (Serializable, Comparable, Runnable). Java không cho đa kế thừa class nhưng cho implement nhiều interface.',
    },
    {
      stem: 'Trong Java, khối "finally" trong try-catch-finally:',
      choices: [
        'Chỉ chạy khi có exception',
        'Chỉ chạy khi không có exception',
        'Luôn chạy dù có hay không có exception, trừ khi JVM thoát',
        'Chỉ chạy khi bắt được exception trong catch',
      ],
      answer: 2,
      explanation: 'finally: LUÔN thực thi — dù try thành công hay có exception, dù catch xử lý được hay không. Dùng để giải phóng tài nguyên: đóng file, đóng kết nối DB, trả lock. Java 7+: try-with-resources (AutoCloseable) tự động close → không cần finally cho resource. Exception trong finally "nuốt" exception gốc — cẩn thận! System.exit() trong try sẽ không chạy finally.',
    },
    {
      stem: 'ArrayList<String> trong Java khác với String[] ở điểm:',
      choices: [
        'ArrayList chỉ lưu String, array lưu được mọi kiểu',
        'ArrayList kích thước động, tự tăng; array kích thước cố định',
        'Array nhanh hơn ArrayList trong mọi thao tác',
        'ArrayList không hỗ trợ vòng lặp for-each',
      ],
      answer: 1,
      explanation: 'ArrayList: kích thước động — add(), remove() tự điều chỉnh. Array: kích thước cố định khi khai báo (int[] arr = new int[10]). ArrayList thực ra wrap một array bên trong, tự resize khi đầy (copy sang array mới lớn gấp đôi — amortized O(1) cho add). Array truy cập index O(1), nhanh hơn, ít overhead. ArrayList không lưu được kiểu primitive trực tiếp (dùng Integer, not int). Java Collections: LinkedList, TreeMap, HashMap, HashSet...',
    },
    {
      stem: 'Nguyên tắc Encapsulation (đóng gói) trong OOP được thực hiện bằng cách:',
      choices: [
        'Khai báo tất cả fields là public',
        'Khai báo fields là private, truy cập qua public getter/setter',
        'Không dùng class, chỉ dùng hàm',
        'Dùng interface thay vì class',
      ],
      answer: 1,
      explanation: 'Encapsulation: ẩn dữ liệu (data hiding) + kiểm soát truy cập. Khai báo field private → chỉ truy cập trong class. Cung cấp getter (getName()) và setter (setName()) public để đọc/ghi có kiểm soát. Ví dụ: setter có thể validate (if age < 0 throw Exception). Lợi ích: dễ thay đổi implementation mà không ảnh hưởng code bên ngoài; bảo vệ tính nhất quán của data; dễ debug (biết chỗ nào thay đổi field).',
    },
    {
      stem: 'Phương thức "static" trong Java có đặc điểm:',
      choices: [
        'Phải được override trong lớp con',
        'Thuộc về lớp, không cần tạo object mới gọi được',
        'Chỉ truy cập được fields private',
        'Không thể có tham số',
      ],
      answer: 1,
      explanation: 'Static method: thuộc về CLASS, không phải instance. Gọi: ClassName.method() — không cần new. Static method không thể truy cập instance fields/methods (vì không có "this"). Dùng khi: utility functions (Math.abs(), Arrays.sort()), factory methods, hàm không cần state của object. main() là static vì JVM gọi trước khi tạo object. "static" và "override" không tương thích (không có runtime polymorphism cho static method — đây là "hiding" không phải "overriding").',
    },
    {
      stem: 'HashMap trong Java tra cứu key theo cơ chế nào?',
      choices: [
        'Duyệt tuần tự qua tất cả entries',
        'Tính hash của key → xác định bucket → so sánh equals() để tìm chính xác',
        'Binary search theo thứ tự alphabet của key',
        'So sánh địa chỉ bộ nhớ của key',
      ],
      answer: 1,
      explanation: 'HashMap hoạt động: (1) key.hashCode() → số nguyên (2) index = hash % capacity → bucket (3) Duyệt bucket (linked list/tree) dùng key.equals() để tìm đúng entry. Quan trọng: khi override equals() phải override hashCode() — "equal objects must have same hashCode". Java 8+: bucket có nhiều hơn 8 phần tử → chuyển thành Red-Black Tree → O(log n) thay vì O(n). Null key cho phép (lưu ở bucket 0). TreeMap sắp xếp theo key — O(log n) cho get/put.',
    },
    {
      stem: 'Từ khóa "super" trong Java dùng để:',
      choices: [
        'Khai báo lớp tối cao (top-level class)',
        'Gọi constructor hoặc phương thức của lớp cha (superclass)',
        'Đánh dấu phương thức không thể override',
        'Tạo object mới từ lớp cha',
      ],
      answer: 1,
      explanation: 'super: tham chiếu đến lớp cha. super() — gọi constructor lớp cha (phải là dòng ĐẦU TIÊN trong constructor lớp con). super.method() — gọi phương thức lớp cha đã bị override. Ví dụ: class Dog extends Animal { Dog() { super("Dog"); } void sound() { super.sound(); System.out.println("Woof"); } }. this() gọi constructor khác trong cùng lớp. Nếu không gọi super(), compiler tự chèn super() mặc định (không tham số) — lỗi nếu cha không có constructor mặc định.',
    },
  ],
};

// ─── I2.3 · Cơ sở dữ liệu (SQL) ────────────────────────────
export const I23_QUIZ = {
  id: 'I2.3-sql-quiz',
  title: 'I2.3 · Cơ sở dữ liệu SQL — SELECT, JOIN, ACID & Chuẩn hoá',
  kind: 'quiz',
  yearLevel: 2, subject: 'co-so-du-lieu', difficulty: 2,
  skillsTrained: ['select-query', 'join', 'group-by', 'index', 'acid', 'normalization'],
  questions: [
    {
      stem: 'Mệnh đề SQL nào lọc bản ghi DỰA TRÊN KẾT QUẢ hàm nhóm (aggregate)?',
      choices: ['WHERE', 'HAVING', 'FILTER', 'GROUP BY'],
      answer: 1,
      explanation: 'HAVING lọc SAU khi GROUP BY (lọc theo aggregate như COUNT, SUM, AVG). WHERE lọc TRƯỚC khi nhóm (lọc từng hàng). Ví dụ: SELECT dept, COUNT(*) FROM employees GROUP BY dept HAVING COUNT(*) > 5 — chỉ hiện phòng có hơn 5 nhân viên. Không thể viết WHERE COUNT(*) > 5 — lỗi cú pháp. Thứ tự SQL: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.',
    },
    {
      stem: 'INNER JOIN trả về:',
      choices: [
        'Tất cả bản ghi bảng trái và chỉ bản ghi khớp bảng phải',
        'Chỉ các bản ghi có giá trị khớp ở CẢ HAI bảng',
        'Tất cả bản ghi từ cả hai bảng (kể cả không khớp)',
        'Các bản ghi chỉ có ở bảng trái, không có ở bảng phải',
      ],
      answer: 1,
      explanation: 'INNER JOIN: giao — chỉ trả bản ghi có giá trị khớp ở cả hai bảng. LEFT JOIN: tất cả bảng trái + bản ghi khớp bảng phải (NULL nếu không khớp). RIGHT JOIN: ngược lại LEFT JOIN. FULL OUTER JOIN: union của LEFT và RIGHT. CROSS JOIN: tích đề-các (m×n hàng). Ví dụ thực tế: JOIN orders với customers theo customer_id — INNER chỉ trả đơn hàng có customer hợp lệ.',
    },
    {
      stem: 'Primary Key (Khóa chính) trong cơ sở dữ liệu quan hệ có đặc điểm:',
      choices: [
        'Có thể là NULL và có thể trùng lặp',
        'Duy nhất (UNIQUE) và KHÔNG NULL — định danh mỗi bản ghi',
        'Chỉ được dùng với kiểu dữ liệu số nguyên',
        'Phải là giá trị auto-increment',
      ],
      answer: 1,
      explanation: 'Primary Key: (1) UNIQUE — không có 2 bản ghi cùng giá trị; (2) NOT NULL — phải có giá trị; (3) Chỉ có 1 PK mỗi bảng (dù có thể là composite key nhiều cột). Foreign Key (FK): tham chiếu PK của bảng khác — đảm bảo referential integrity. Ví dụ: orders.customer_id là FK tham chiếu customers.id (PK). Khi xóa customer có orders → FK constraint lỗi (nếu không dùng CASCADE).',
    },
    {
      stem: 'Chuẩn hoá 1NF (First Normal Form) yêu cầu:',
      choices: [
        'Không có phụ thuộc bắc cầu (transitive dependency)',
        'Mỗi cột chứa giá trị nguyên tố (atomic) — không có mảng hay tập giá trị',
        'Bảng phải có Primary Key',
        'Mọi cột không phải PK phải phụ thuộc đầy đủ vào toàn bộ PK',
      ],
      answer: 1,
      explanation: 'Dạng chuẩn (Normalization): 1NF: giá trị nguyên tố (atomic) — ô không chứa list "Toán, Lý, Hóa" mà phải tách thành nhiều hàng. 2NF: 1NF + mọi cột phụ thuộc đầy đủ vào toàn bộ PK (loại phụ thuộc một phần). 3NF: 2NF + không có phụ thuộc bắc cầu (cột A → cột B → cột C: B không phải PK). Mục tiêu: loại bỏ dư thừa (redundancy) và anomaly (insertion/update/deletion). BCNF: mạnh hơn 3NF.',
    },
    {
      stem: 'INDEX trong database có tác dụng chính là:',
      choices: [
        'Tăng tốc độ INSERT và UPDATE',
        'Tăng tốc độ SELECT (tìm kiếm, lọc, sort) bằng cách tránh full-table scan',
        'Tự động sắp xếp dữ liệu theo thứ tự alphabet',
        'Ngăn chặn dữ liệu trùng lặp',
      ],
      answer: 1,
      explanation: 'INDEX: cấu trúc B-Tree phụ (thường) giúp database tìm hàng nhanh mà không scan toàn bộ bảng. SELECT * FROM users WHERE email = \'x\' — không có index: O(n); có index: O(log n). Đánh đổi: index chiếm thêm disk space và làm chậm INSERT/UPDATE/DELETE (phải cập nhật index). Nên đánh index trên: cột WHERE thường xuyên, cột JOIN, cột ORDER BY. Unique index: vừa tăng tốc vừa đảm bảo uniqueness.',
    },
    {
      stem: 'ACID trong hệ quản trị CSDL, tính "C" (Consistency) đảm bảo:',
      choices: [
        'Transaction hoàn thành hoàn toàn hoặc không thực hiện gì',
        'Các transaction thực hiện độc lập, không ảnh hưởng nhau',
        'Database luôn chuyển từ trạng thái hợp lệ này sang trạng thái hợp lệ khác',
        'Dữ liệu không bị mất khi hệ thống sập',
      ],
      answer: 2,
      explanation: 'ACID: (A) Atomicity: "tất cả hoặc không" — transfer tiền: trừ tài khoản A VÀ cộng tài khoản B, không thể làm một nửa. (C) Consistency: database luôn thỏa mãn các ràng buộc (constraints, triggers, rules) sau mỗi transaction. (I) Isolation: transaction đồng thời không thấy trạng thái trung gian của nhau. (D) Durability: commit rồi thì dữ liệu tồn tại kể cả khi crash (nhờ WAL — Write-Ahead Log).',
    },
    {
      stem: 'Sự khác biệt giữa DELETE và TRUNCATE trong SQL là:',
      choices: [
        'DELETE xóa toàn bộ bảng, TRUNCATE chỉ xóa theo điều kiện',
        'DELETE có thể có WHERE, có thể rollback; TRUNCATE xóa tất cả nhanh hơn, không rollback được trong nhiều DB',
        'TRUNCATE an toàn hơn vì yêu cầu điều kiện WHERE',
        'Hoàn toàn giống nhau',
      ],
      answer: 1,
      explanation: 'DELETE: từng hàng một, trigger kích hoạt, log từng row, có thể ROLLBACK, có thể WHERE. TRUNCATE: xóa tất cả, nhanh hơn (deallocate pages), thường không kích hoạt row-level triggers, AUTO_INCREMENT reset về 1 (MySQL), khó ROLLBACK hơn (trong nhiều DBMS). DROP TABLE: xóa hẳn cả cấu trúc bảng. Trong production: luôn test DELETE với SELECT WHERE trước khi chạy thật.',
    },
    {
      stem: 'Câu lệnh SELECT nào tìm tất cả sinh viên có điểm TRUNG BÌNH > 8 và học ít nhất 3 môn?',
      choices: [
        'SELECT student_id FROM grades WHERE AVG(score) > 8 AND COUNT(*) >= 3',
        'SELECT student_id FROM grades GROUP BY student_id HAVING AVG(score) > 8 AND COUNT(*) >= 3',
        'SELECT student_id FROM grades GROUP BY student_id WHERE AVG(score) > 8',
        'SELECT student_id FROM grades HAVING AVG(score) > 8 AND COUNT(*) >= 3',
      ],
      answer: 1,
      explanation: 'Cần GROUP BY student_id để nhóm điểm theo sinh viên, sau đó HAVING để lọc theo aggregate (AVG, COUNT). WHERE không thể dùng với aggregate functions. Không thể HAVING mà không có GROUP BY. Câu đúng: SELECT student_id, AVG(score), COUNT(*) FROM grades GROUP BY student_id HAVING AVG(score) > 8 AND COUNT(*) >= 3. Đây là pattern cực kỳ phổ biến trong báo cáo và phân tích dữ liệu.',
    },
    {
      stem: 'Subquery (truy vấn lồng) nào tìm sinh viên có điểm cao hơn điểm trung bình của toàn lớp?',
      choices: [
        'SELECT * FROM students WHERE score = AVG(score)',
        'SELECT * FROM students WHERE score > (SELECT AVG(score) FROM students)',
        'SELECT * FROM students HAVING score > AVG(score)',
        'SELECT * FROM students JOIN avg_table ON score > average',
      ],
      answer: 1,
      explanation: 'Subquery trong WHERE: inner query chạy trước, trả 1 giá trị (scalar subquery), outer query dùng kết quả đó. AVG() không thể dùng trong WHERE mà không có GROUP BY. Subquery còn dùng với IN (WHERE id IN (SELECT...)), EXISTS, correlated subquery (tham chiếu outer query). Thay thế bằng CTE (Common Table Expression) cho dễ đọc: WITH avg_score AS (SELECT AVG(score) FROM students) SELECT * FROM students WHERE score > (SELECT * FROM avg_score).',
    },
    {
      stem: 'Foreign Key Constraint bảo vệ điều gì trong CSDL quan hệ?',
      choices: [
        'Đảm bảo mọi giá trị trong cột là duy nhất',
        'Đảm bảo tính toàn vẹn tham chiếu — giá trị FK phải tồn tại trong bảng được tham chiếu',
        'Tăng tốc độ tìm kiếm trên cột đó',
        'Ngăn NULL value trong cột',
      ],
      answer: 1,
      explanation: 'Foreign Key: orders.customer_id phải tham chiếu đến customer_id đã tồn tại trong bảng customers. Nếu thêm order với customer_id = 999 mà không có customer 999 → lỗi FK violation. ON DELETE CASCADE: xóa customer → xóa luôn tất cả orders của customer đó. ON DELETE SET NULL: xóa customer → đặt customer_id = NULL. ON DELETE RESTRICT: không cho xóa customer còn có orders. FK giúp database tự bảo vệ tính nhất quán dữ liệu.',
    },
  ],
};

// ─── I2.4 · Mạng máy tính ───────────────────────────────────
export const I24_QUIZ = {
  id: 'I2.4-networking-quiz',
  title: 'I2.4 · Mạng máy tính — OSI, TCP/IP, HTTP & Bảo mật mạng',
  kind: 'quiz',
  yearLevel: 2, subject: 'mang-may-tinh', difficulty: 2,
  skillsTrained: ['osi-model', 'tcp-ip', 'ip-address', 'dns', 'http', 'security-network'],
  questions: [
    {
      stem: 'Mô hình OSI có bao nhiêu tầng? Tầng nào chịu trách nhiệm định tuyến (routing) gói tin?',
      choices: [
        '5 tầng — tầng Transport',
        '7 tầng — tầng Network (Layer 3)',
        '4 tầng — tầng Internet',
        '7 tầng — tầng Data Link (Layer 2)',
      ],
      answer: 1,
      explanation: 'OSI 7 tầng (từ dưới lên): (1) Physical — bit, cáp; (2) Data Link — MAC, frame, switch; (3) Network — IP, routing, router; (4) Transport — TCP/UDP, port; (5) Session — session; (6) Presentation — mã hoá, nén; (7) Application — HTTP, FTP, DNS. Router hoạt động ở Layer 3 (Network). Switch ở Layer 2. Hub ở Layer 1. Firewall thường ở Layer 3-4. Mnemonic: "Please Do Not Throw Sausage Pizza Away".',
    },
    {
      stem: 'Sự khác biệt quan trọng nhất giữa TCP và UDP là:',
      choices: [
        'TCP nhanh hơn UDP trong mọi trường hợp',
        'TCP đảm bảo tin cậy (ACK, retransmit, đúng thứ tự); UDP không đảm bảo nhưng nhanh hơn',
        'UDP chỉ dùng cho mạng nội bộ',
        'TCP dùng cho video, UDP dùng cho web',
      ],
      answer: 1,
      explanation: 'TCP (Transmission Control Protocol): connection-oriented, 3-way handshake (SYN→SYN-ACK→ACK), đảm bảo đúng thứ tự, ACK cho mỗi gói, retransmit nếu mất → overhead cao hơn. UDP (User Datagram Protocol): connectionless, "fire and forget", không ACK, không đảm bảo thứ tự → nhanh, latency thấp. Dùng TCP: HTTP/HTTPS, email, file transfer. Dùng UDP: video streaming, VoIP, DNS query, gaming (QUIC/HTTP3 dùng UDP).',
    },
    {
      stem: 'DNS (Domain Name System) có chức năng chính là:',
      choices: [
        'Mã hoá traffic giữa client và server',
        'Phân giải tên miền (vd: google.com) thành địa chỉ IP',
        'Cấp phát địa chỉ IP động cho thiết bị',
        'Lọc nội dung web không phù hợp',
      ],
      answer: 1,
      explanation: 'DNS: "phonebook của Internet". Bạn gõ google.com → DNS resolver truy vấn: Root NS → TLD NS (.com) → Authoritative NS → trả IP 142.250.x.x → browser kết nối. DNS cache giảm số truy vấn. DNS lookup: nslookup google.com hoặc dig google.com. Tấn công DNS: DNS spoofing (giả mạo record), DNS amplification DDoS. DHCP: cấp phát IP động. HTTPS: mã hoá traffic.',
    },
    {
      stem: 'HTTP status code 404 có nghĩa là:',
      choices: [
        'Server lỗi nội bộ (Internal Server Error)',
        'Yêu cầu thành công (OK)',
        'Không tìm thấy tài nguyên (Not Found)',
        'Không được phép (Unauthorized)',
      ],
      answer: 2,
      explanation: 'HTTP Status Codes: 2xx (Success): 200 OK, 201 Created, 204 No Content. 3xx (Redirect): 301 Moved Permanently, 302 Found (tạm). 4xx (Client Error): 400 Bad Request, 401 Unauthorized (chưa đăng nhập), 403 Forbidden (không có quyền), 404 Not Found, 429 Too Many Requests. 5xx (Server Error): 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable. Mẹo: 4xx = lỗi client, 5xx = lỗi server.',
    },
    {
      stem: 'Địa chỉ IP 192.168.1.100 với subnet mask 255.255.255.0 thuộc dải mạng nào?',
      choices: ['192.168.0.0/24', '192.168.1.0/24', '192.168.1.0/16', '10.0.0.0/8'],
      answer: 1,
      explanation: '255.255.255.0 = /24 (24 bit 1). Network address: giữ 24 bit đầu, zero 8 bit cuối → 192.168.1.0. Host range: 192.168.1.1 – 192.168.1.254. Broadcast: 192.168.1.255. CIDR notation: /24 = 256 địa chỉ, 254 host. 192.168.x.x là private IP (RFC 1918). Subnet mask 255.255.0.0 = /16 (65534 hosts). Subnetting: chia mạng lớn thành nhiều mạng nhỏ hơn.',
    },
    {
      stem: 'HTTPS khác HTTP ở điểm cốt lõi nào?',
      choices: [
        'HTTPS nhanh hơn HTTP vì dùng HTTP/2',
        'HTTPS mã hoá traffic bằng TLS/SSL — đảm bảo bảo mật và toàn vẹn dữ liệu',
        'HTTPS chỉ dùng cho trang thanh toán',
        'HTTPS dùng port 8080, HTTP dùng port 80',
      ],
      answer: 1,
      explanation: 'HTTPS = HTTP + TLS (Transport Layer Security, trước đây là SSL). TLS: (1) Authentication — chứng chỉ SSL xác nhận server là ai; (2) Encryption — mã hoá dữ liệu truyền (không nghe lén được); (3) Integrity — MAC đảm bảo dữ liệu không bị sửa. Handshake TLS: trao đổi certificate → verify → thoả thuận cipher suite → symmetric key qua asymmetric encryption → mã hoá session. HTTPS: port 443. HTTP: port 80.',
    },
    {
      stem: 'Router (bộ định tuyến) có chức năng khác switch (thiết bị chuyển mạch) ở điểm:',
      choices: [
        'Router chỉ dùng trong mạng gia đình, switch dùng cho doanh nghiệp',
        'Router kết nối nhiều MẠNG khác nhau (Layer 3, dùng IP); switch kết nối thiết bị trong CÙNG mạng (Layer 2, dùng MAC)',
        'Switch nhanh hơn router vì không cần xử lý',
        'Router không hỗ trợ WiFi',
      ],
      answer: 1,
      explanation: 'Switch (Layer 2): kết nối thiết bị trong cùng LAN, chuyển frame dựa vào MAC address table. Router (Layer 3): kết nối các mạng khác nhau (LAN-LAN, LAN-Internet), forward packet dựa vào routing table + IP. Mạng gia đình: router WiFi thực ra là router + switch + access point + NAT tích hợp. Doanh nghiệp: switch layer 2 trong mỗi tầng nhà, core router kết nối các mạng và Internet.',
    },
    {
      stem: 'Giao thức nào được dùng để cấp phát địa chỉ IP tự động cho thiết bị?',
      choices: ['DNS', 'DHCP', 'FTP', 'SMTP'],
      answer: 1,
      explanation: 'DHCP (Dynamic Host Configuration Protocol): cấp phát IP, subnet mask, gateway, DNS tự động. Quy trình DORA: Discover (client broadcast tìm DHCP server) → Offer (server offer IP) → Request (client chọn offer) → Acknowledge (server xác nhận). DHCP lease: IP được thuê trong thời gian (vd: 24h), sau đó renew hoặc release. FTP: truyền file. SMTP: gửi email. NTP: đồng bộ giờ. SSH: remote terminal an toàn.',
    },
    {
      stem: 'TCP 3-way handshake để thiết lập kết nối diễn ra theo thứ tự:',
      choices: [
        'ACK → SYN → SYN-ACK',
        'SYN → SYN-ACK → ACK',
        'SYN → ACK → FIN',
        'HELLO → HELLO-ACK → READY',
      ],
      answer: 1,
      explanation: 'TCP 3-way handshake: (1) Client gửi SYN (Synchronize) — "tôi muốn kết nối, sequence số X"; (2) Server trả SYN-ACK — "OK, tôi sẵn sàng (ACK X+1), tôi cũng khởi tạo (SYN Y)"; (3) Client gửi ACK — "đã nhận (ACK Y+1)". Sau đó: data exchange. Kết thúc: 4-way FIN-ACK. SYN flood attack: attacker gửi nhiều SYN mà không ACK → server tốn resource — phòng thủ: SYN cookies. Half-open connection: sau SYN-ACK mà không ACK.',
    },
    {
      stem: 'Trong mô hình TCP/IP, "port number" xác định:',
      choices: [
        'Địa chỉ vật lý của card mạng',
        'Ứng dụng/process cụ thể trên máy đích nhận gói tin',
        'Tốc độ truyền dữ liệu của đường truyền',
        'Địa chỉ IP của subnet',
      ],
      answer: 1,
      explanation: 'Port: số 16-bit (0-65535) định danh ứng dụng/process trên máy. IP address → xác định MÁYA nào; port → xác định CHƯƠNG TRÌNH nào. Well-known ports: 22 (SSH), 25/587 (SMTP), 53 (DNS), 80 (HTTP), 443 (HTTPS), 3306 (MySQL), 5432 (PostgreSQL). Ephemeral ports (49152-65535): client dùng khi tạo kết nối. Cặp (IP, port) = socket. Firewall có thể chặn port cụ thể.',
    },
  ],
};

// ─── I2.5 · Thiết kế Web (HTML/CSS/JS) ──────────────────────
export const I25_QUIZ = {
  id: 'I2.5-web-quiz',
  title: 'I2.5 · Thiết kế Web — HTML, CSS, JavaScript & DOM',
  kind: 'quiz',
  yearLevel: 2, subject: 'thiet-ke-web', difficulty: 2,
  skillsTrained: ['html', 'css', 'javascript', 'dom', 'responsive', 'es6'],
  questions: [
    {
      stem: 'Đâu là thẻ HTML "semantic" (ngữ nghĩa) thay thế cho thẻ <div> phổ biến?',
      choices: [
        '<box>, <side>, <top>',
        '<header>, <nav>, <main>, <article>, <footer>',
        '<container>, <wrapper>, <content>',
        '<page>, <section>, <panel>',
      ],
      answer: 1,
      explanation: 'HTML5 Semantic tags: <header> (phần đầu), <nav> (điều hướng), <main> (nội dung chính), <article> (bài viết độc lập), <section> (phần), <aside> (thanh bên), <footer> (chân trang). Lợi ích: (1) SEO — search engine hiểu cấu trúc; (2) Accessibility — screen reader điều hướng tốt hơn; (3) Code dễ đọc. Div + CSS class ("header-wrapper") không mang nghĩa; thẻ semantic mang nghĩa intrinsic.',
    },
    {
      stem: 'CSS Box Model bao gồm (từ trong ra ngoài):',
      choices: [
        'Content → Border → Padding → Margin',
        'Content → Padding → Border → Margin',
        'Margin → Border → Padding → Content',
        'Content → Shadow → Border → Margin',
      ],
      answer: 1,
      explanation: 'Box Model (từ trong ra ngoài): Content (nội dung) → Padding (khoảng đệm trong) → Border (viền) → Margin (khoảng ngoài). Mặc định (box-sizing: content-box): width/height chỉ tính Content — padding và border cộng thêm. box-sizing: border-box: width/height bao gồm cả padding và border → dễ layout hơn. Ví dụ: div { width: 200px; padding: 20px; border: 1px solid; } → tổng chiều rộng = 200+40+2 = 242px (content-box) vs 200px (border-box).',
    },
    {
      stem: 'CSS Flexbox — thuộc tính "justify-content: space-between" có tác dụng:',
      choices: [
        'Căn giữa tất cả items theo chiều ngang',
        'Phân bổ khoảng trống đều giữa các items, item đầu và cuối sát cạnh container',
        'Dàn đều khoảng cách kể cả hai bên ngoài',
        'Xếp tất cả items sát nhau ở giữa container',
      ],
      answer: 1,
      explanation: 'Flexbox justify-content (main axis): flex-start (mặc định, sát trái), flex-end (sát phải), center (giữa), space-between (khoảng trống GIỮA items, không có ở 2 đầu), space-around (khoảng trống đều kể cả 2 đầu nhưng nửa), space-evenly (đều hoàn toàn). align-items: cross axis (flex-start, flex-end, center, stretch, baseline). flex-direction: row (mặc định) hoặc column.',
    },
    {
      stem: 'Media Query CSS nào áp dụng style khi màn hình rộng TỐI ĐA 768px (tablet/mobile)?',
      choices: [
        '@media (min-width: 768px) { ... }',
        '@media screen and (max-width: 768px) { ... }',
        '@media (width: 768px) { ... }',
        '@media mobile { ... }',
      ],
      answer: 1,
      explanation: 'Media Query: @media (max-width: 768px) áp dụng khi viewport ≤ 768px. min-width: áp dụng khi ≥ giá trị (desktop-first → mobile-first). Mobile-first approach (khuyến nghị): base CSS cho mobile, thêm @media (min-width: 768px) cho tablet, (min-width: 1024px) cho desktop. Responsive điểm phổ biến: 480px (phone), 768px (tablet), 1024px (laptop), 1280px (desktop). @media screen loại trừ print media.',
    },
    {
      stem: 'DOM (Document Object Model) trong web là:',
      choices: [
        'Ngôn ngữ lập trình phía server',
        'Biểu diễn dạng cây của tài liệu HTML — JavaScript có thể đọc/sửa/xóa nodes',
        'Hệ thống quản lý file tĩnh',
        'Giao thức truyền dữ liệu qua mạng',
      ],
      answer: 1,
      explanation: 'DOM: chuẩn W3C biểu diễn HTML/XML dưới dạng cây object. Mỗi thẻ HTML là một node. JavaScript tương tác: document.getElementById(\'id\'), document.querySelector(\'.class\'), element.innerHTML, element.style.color, element.addEventListener(\'click\', fn), element.appendChild(child), element.remove(). DOM manipulation là cốt lõi của web interactivity. Shadow DOM: encapsulation trong Web Components.',
    },
    {
      stem: 'Trong JavaScript ES6, sự khác biệt giữa "let" và "var" là:',
      choices: [
        'var là kiểu số, let là kiểu chuỗi',
        'let có block scope ({}); var có function scope và bị hoisted',
        'let không thể thay đổi giá trị; var có thể',
        'Hoàn toàn giống nhau trong ES6',
      ],
      answer: 1,
      explanation: 'var: function-scoped (hoặc global nếu ngoài function), bị hoisted (có thể dùng trước khi khai báo → undefined). let: block-scoped ({}) — chỉ tồn tại trong cặp ngoặc nhọn, không hoisted (TDZ — Temporal Dead Zone). const: block-scoped như let, KHÔNG thể gán lại (nhưng object/array const vẫn có thể thay đổi nội dung). Best practice: dùng const mặc định, let khi cần gán lại, tránh var. Khai báo var trong if block: lọt ra ngoài scope — lỗi kinh điển!',
    },
    {
      stem: 'Hàm JavaScript nào lắng nghe sự kiện click trên một button?',
      choices: [
        'button.onClick = function() { }',
        'button.addEventListener(\'click\', function() { })',
        'button.on(\'click\', function() { })',
        'button.listen(\'click\', function() { })',
      ],
      answer: 1,
      explanation: 'addEventListener(event, callback): cách chuẩn modern. Ưu điểm: có thể gắn nhiều handlers cho cùng event; có thể removeEventListener(). onclick = fn: chỉ 1 handler (gán mới ghi đè cũ). on(\'click\'): là jQuery API (không native). Event bubbling: click trên element con → bubble lên cha → window. event.stopPropagation() ngăn bubble. Event delegation: gắn listener vào cha, check event.target → hiệu quả hơn gắn vào nhiều con.',
    },
    {
      stem: 'Fetch API trong JavaScript dùng để:',
      choices: [
        'Lấy dữ liệu từ local storage',
        'Gọi HTTP request bất đồng bộ (async) đến server mà không reload trang',
        'Tải hình ảnh vào canvas',
        'Đọc file từ ổ cứng',
      ],
      answer: 1,
      explanation: 'fetch() là API thay thế XMLHttpRequest (AJAX) — modern và Promise-based. fetch(url).then(res => res.json()).then(data => console.log(data)). Với async/await: const res = await fetch(url); const data = await res.json(). CORS (Cross-Origin Resource Sharing): browser chặn fetch sang domain khác nếu server không có header Access-Control-Allow-Origin. Lỗi mạng: fetch reject Promise; 4xx/5xx: vẫn resolve (check res.ok hoặc res.status).',
    },
    {
      stem: 'CSS Specificity (độ ưu tiên selector), thứ tự từ cao đến thấp là:',
      choices: [
        'Element < Class < ID < Inline style',
        'ID < Class < Inline < Element',
        'Inline < ID < Class < Element',
        'Class < ID < Element < Inline',
      ],
      answer: 0,
      explanation: 'Specificity (từ thấp đến cao): Element selector (p, div) = 0,0,1 → Class/Pseudo-class (.active, :hover) = 0,1,0 → ID (#header) = 1,0,0 → Inline style (style="") = 1,0,0,0 → !important (tránh dùng). Ví dụ: p.highlight { color: red; } (0,1,1) thắng p { color: blue; } (0,0,1). Khi bằng nhau: rule khai báo SAU (cascade) thắng. Lỗi thường gặp: override CSS không được → check specificity trước khi thêm !important.',
    },
    {
      stem: 'Arrow function trong JavaScript ES6: () => { } khác function() { } ở điểm quan trọng nào?',
      choices: [
        'Arrow function nhanh hơn function thường',
        'Arrow function không có "this" riêng — kế thừa "this" từ lexical scope bên ngoài',
        'Arrow function không có tham số',
        'Arrow function không thể là callback',
      ],
      answer: 1,
      explanation: 'Arrow function: this = this của scope bên ngoài khi khai báo (lexical this). Regular function: this thay đổi theo cách gọi (ai gọi hàm, this là đối tượng đó). Ví dụ class: trong setTimeout, this bên trong regular function có thể là undefined/window — dùng arrow function hoặc const self = this. Arrow function cũng không có: arguments object, prototype property, không thể là generator hay constructor (new ArrowFn() → lỗi). Syntax ngắn gọn: x => x * 2 (không cần return, không cần {}).',
    },
  ],
};

// Aggregate export
export const IT_YEAR2_SCENARIOS = {
  [I21_QUIZ.id]: I21_QUIZ,
  [I22_QUIZ.id]: I22_QUIZ,
  [I23_QUIZ.id]: I23_QUIZ,
  [I24_QUIZ.id]: I24_QUIZ,
  [I25_QUIZ.id]: I25_QUIZ,
};
