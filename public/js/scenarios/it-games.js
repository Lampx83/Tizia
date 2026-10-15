// ============================================================
// Trường CNTT — Game Scenarios (IG01–IG04)
// ============================================================
// Quiz nhanh dạng game: Code Race, Bug Hunt, SQL Detective,
// System Design Battle. Mỗi game 10 câu, có explanation.
// ============================================================

// ─── IG01 · Code Race — Giải thuật 5 phút ─────────────────
export const IG01_QUIZ = {
  id: 'IG01-code-race-quiz',
  title: 'IG01 · Code Race — Giải thuật 5 phút',
  kind: 'quiz',
  subject: 'game', difficulty: 1,
  skillsTrained: ['algorithm', 'complexity', 'data-structure'],
  questions: [
    {
      stem: 'Để tìm phần tử lớn nhất trong mảng chưa sắp xếp n phần tử, thuật toán tốt nhất có thể đạt độ phức tạp:',
      choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 2,
      explanation: 'Phải duyệt toàn bộ n phần tử ít nhất một lần vì mảng chưa sắp xếp → giới hạn dưới O(n). Không thể làm tốt hơn nếu không có thêm thông tin về cấu trúc dữ liệu.',
    },
    {
      stem: 'Cho hàm đệ quy `f(n) = f(n-1) + f(n-2)` với `f(0)=0, f(1)=1`. Đây là tính toán gì và tại sao cần memoization?',
      choices: [
        'Giai thừa — vì cần giảm số phép nhân',
        'Fibonacci — vì bài toán con bị tính lại nhiều lần (overlapping subproblems)',
        'Lũy thừa — vì cần giảm chiều cao đệ quy',
        'Tổng prefix — vì cần tránh tràn stack',
      ],
      answer: 1,
      explanation: 'Đây là dãy Fibonacci. Đệ quy thuần tính lại f(n-2) ở cả nhánh f(n-1) và trực tiếp → cây đệ quy có O(2^n) lá. Memoization (cache kết quả đã tính) giảm xuống O(n) thời gian, O(n) không gian. Dynamic Programming bottom-up không cần đệ quy, O(1) không gian.',
    },
    {
      stem: 'Thuật toán nào SAU ĐÂY có độ phức tạp thời gian tệ nhất là O(n log n) mọi trường hợp?',
      choices: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
      answer: 1,
      explanation: 'Merge Sort luôn chia đôi → O(n log n) best/avg/worst. Quick Sort: trung bình O(n log n), tệ nhất O(n²) khi pivot luôn là min/max (mảng đã sắp xếp). Bubble/Insertion: O(n²) worst. Merge Sort ổn định và đảm bảo O(n log n) nhưng cần O(n) bộ nhớ phụ.',
    },
    {
      stem: 'Stack và Queue khác nhau căn bản ở điểm nào?',
      choices: [
        'Stack dùng mảng, Queue dùng linked list',
        'Stack: LIFO (Last In First Out), Queue: FIFO (First In First Out)',
        'Stack có thể duyệt ngẫu nhiên, Queue thì không',
        'Stack hỗ trợ O(1) tìm kiếm, Queue thì O(n)',
      ],
      answer: 1,
      explanation: 'Stack: push/pop ở cùng 1 đầu → LIFO. Ví dụ: lịch sử trình duyệt, undo, call stack. Queue: enqueue ở cuối, dequeue ở đầu → FIFO. Ví dụ: hàng đợi in, BFS, task scheduler. Cả hai đều có thể cài bằng mảng hoặc linked list.',
    },
    {
      stem: 'Cho đồ thị có trọng số không âm, thuật toán nào tìm đường đi ngắn nhất từ 1 nguồn đến mọi đỉnh hiệu quả nhất?',
      choices: ['BFS', 'DFS', 'Dijkstra', 'Bellman-Ford'],
      answer: 2,
      explanation: 'Dijkstra dùng min-heap (priority queue), O((V+E) log V). Luôn chọn đỉnh có khoảng cách nhỏ nhất chưa xét → greedy. BFS chỉ đúng với đồ thị không trọng số. Bellman-Ford O(VE), xử lý được trọng số âm nhưng chậm hơn. Dijkstra sai với trọng số âm.',
    },
    {
      stem: 'Two Pointers là kỹ thuật gì và phù hợp với bài toán nào?',
      choices: [
        'Dùng 2 con trỏ trong linked list để phát hiện chu trình',
        'Dùng 2 chỉ số trái-phải trên mảng đã sắp xếp để thu hẹp không gian tìm kiếm — O(n)',
        'Dùng 2 stack để giả lập queue',
        'Dùng 2 luồng song song để tăng tốc',
      ],
      answer: 1,
      explanation: 'Two Pointers: left=0, right=n-1, dịch chuyển về trung tâm → O(n) thay vì O(n²) brute-force. Dùng cho: tìm cặp tổng bằng k (mảng đã sắp), kiểm tra palindrome, merge 2 mảng đã sắp. Floyd Cycle Detection (fast/slow pointer) dùng cho linked list.',
    },
    {
      stem: 'Sliding Window giải quyết bài toán nào hiệu quả?',
      choices: [
        'Tìm đường đi ngắn nhất trong đồ thị',
        'Sắp xếp mảng lớn trong O(n)',
        'Tìm subarray/substring dài nhất/ngắn nhất thỏa điều kiện — O(n) thay vì O(n²)',
        'Tìm phần tử trùng lặp trong mảng',
      ],
      answer: 2,
      explanation: 'Sliding Window: duy trì cửa sổ [left, right], mở rộng right khi cần, thu hẹp left khi vi phạm điều kiện. Ví dụ: subarray dài nhất không có ký tự trùng, sum subarray lớn nhất = k, minimum window substring. O(n) vì mỗi phần tử vào/ra cửa sổ đúng 1 lần.',
    },
    {
      stem: 'Binary Search đòi hỏi điều kiện gì về dữ liệu đầu vào?',
      choices: [
        'Mảng chưa sắp xếp, O(log n)',
        'Mảng đã sắp xếp (hoặc có tính đơn điệu), O(log n)',
        'Mảng đã sắp xếp, O(n)',
        'Mảng không trùng phần tử, O(1)',
      ],
      answer: 1,
      explanation: 'Binary Search yêu cầu dữ liệu có tính đơn điệu (monotonic): sắp xếp tăng/giảm, hoặc hàm f(x) chuyển từ false→true tại một điểm. So sánh mid với target → loại bỏ nửa còn lại → O(log n). Sai nếu mảng chưa sắp xếp. Biến thể: tìm first/last occurrence, search in rotated array.',
    },
    {
      stem: 'Greedy algorithm phù hợp khi nào?',
      choices: [
        'Khi bài toán có subproblems độc lập (independent subproblems)',
        'Khi chọn tốt nhất cục bộ ở mỗi bước dẫn đến kết quả tối ưu toàn cục (greedy choice property)',
        'Khi cần tính tất cả khả năng và chọn max',
        'Khi cần duyệt đệ quy có cache',
      ],
      answer: 1,
      explanation: 'Greedy: chọn lựa chọn tốt nhất ở từng bước mà không xét lại. Đúng khi bài toán có "greedy choice property" + "optimal substructure". Ví dụ: Activity selection (chọn nhiều hoạt động nhất không chồng lên), Huffman encoding, Kruskal/Prim MST. Không đúng với Knapsack 0-1 → cần DP.',
    },
    {
      stem: 'Bài toán "đếm số cặp (i,j) với i<j và arr[i]+arr[j]=k" có giải pháp O(n) bằng cách nào?',
      choices: [
        'Sắp xếp mảng rồi Binary Search từng phần tử',
        'Dùng HashMap: với mỗi arr[j], kiểm tra k-arr[j] đã xuất hiện trước đó chưa',
        'Two Pointers trên mảng chưa sắp xếp',
        'Dynamic Programming với bảng 2D n×n',
      ],
      answer: 1,
      explanation: 'HashMap (hash set) lưu các phần tử đã thấy. Duyệt từng arr[j]: nếu k-arr[j] trong map → đếm +1; thêm arr[j] vào map. O(n) thời gian, O(n) không gian. Binary Search sau khi sort: O(n log n). Two Pointers cần mảng đã sắp xếp → O(n log n). DP 2D: O(n²).',
    },
  ],
};

// ─── IG02 · Bug Hunt — Debug speed ─────────────────────────
export const IG02_QUIZ = {
  id: 'IG02-bug-hunt-quiz',
  title: 'IG02 · Bug Hunt — Debug speed',
  kind: 'quiz',
  subject: 'game', difficulty: 2,
  skillsTrained: ['debugging', 'code-reading', 'error-analysis'],
  questions: [
    {
      stem: 'Đoạn code Python: `def sum_list(lst): total = 0; for i in range(len(lst)): total += lst[i+1]; return total`. Bug là gì?',
      choices: [
        'Biến total chưa khởi tạo',
        'IndexError: lst[i+1] truy cập ngoài giới hạn khi i = len(lst)-1',
        'Vòng lặp chạy sai số lần',
        'Return value không đúng kiểu',
      ],
      answer: 1,
      explanation: 'range(len(lst)) cho i từ 0 đến len-1. Khi i=len-1, lst[i+1] = lst[len] → IndexError. Sửa: dùng `lst[i]` hoặc dùng `for x in lst: total += x`. Off-by-one error là bug phổ biến nhất trong lập trình.',
    },
    {
      stem: 'Code Java: `int x = 5; int y = 2; double result = x / y;`. result bằng bao nhiêu và tại sao?',
      choices: [
        '2.5 — Java tự động ép kiểu khi gán vào double',
        '2.0 — phép chia integer x/y cho ra int 2, rồi mới gán vào double',
        '2 — result là double nên không vấn đề',
        '0.5 — Java làm tròn về phân số',
      ],
      answer: 1,
      explanation: 'x/y là phép chia số nguyên (int/int) → kết quả int = 2 (phần dư bỏ). Sau đó 2 được ép thành 2.0 khi gán vào double. Sửa: `(double)x / y` hoặc `x / (double)y` hoặc `5.0 / 2`. Integer division là nguồn bug ngầm thường gặp trong Java/C.',
    },
    {
      stem: 'JavaScript: `console.log(0.1 + 0.2 === 0.3)`. Kết quả là gì?',
      choices: [
        'true — phép cộng cơ bản',
        'false — floating point biểu diễn nhị phân gây sai số',
        'undefined — 0.3 không phải số hợp lệ',
        'NaN — JS không so sánh được số thực',
      ],
      answer: 1,
      explanation: '0.1 + 0.2 = 0.30000000000000004 trong IEEE 754 floating point (binary). Số thập phân không thể biểu diễn chính xác trong nhị phân — như 1/3 không thể viết chính xác bằng thập phân. Sửa: `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON` hoặc dùng thư viện decimal.',
    },
    {
      stem: 'Python: `def append_to(element, to=[]): to.append(element); return to`. Gọi `append_to(1)` rồi `append_to(2)` cho ra gì?',
      choices: [
        '[1] rồi [2] — mỗi lần gọi tạo list mới',
        '[1] rồi [1, 2] — default argument mutable được chia sẻ giữa các lần gọi',
        'Error — không thể dùng list làm default argument',
        '[1, 2] rồi [1, 2] — cả hai lần trả về cùng list',
      ],
      answer: 1,
      explanation: 'Python tạo default argument một lần khi define function. List [] là mutable → cùng object được reuse. Gọi lần 2: list đã có [1], thêm 2 → [1,2]. Sửa: `def append_to(element, to=None): if to is None: to = []; to.append(element); return to`. Đây là Python gotcha nổi tiếng.',
    },
    {
      stem: 'SQL: `SELECT * FROM orders WHERE customer_id = NULL`. Câu query này trả về gì?',
      choices: [
        'Tất cả row có customer_id là NULL',
        'Không có row nào — so sánh với NULL bằng = luôn cho UNKNOWN, không phải TRUE',
        'Lỗi cú pháp SQL',
        'Tất cả row trong bảng',
      ],
      answer: 1,
      explanation: 'Trong SQL, NULL là "giá trị không xác định". NULL = NULL trả về UNKNOWN (không phải TRUE). WHERE lọc chỉ giữ row có điều kiện = TRUE. Sửa: `WHERE customer_id IS NULL`. Tương tự, `NULL != NULL` cũng là UNKNOWN. Đây là nguồn bug rất phổ biến với SQL.',
    },
    {
      stem: 'Code C: `int arr[5] = {1,2,3,4,5}; printf("%d", arr[5]);`. Điều gì xảy ra?',
      choices: [
        'In ra 0 — C tự khởi tạo vùng ngoài mảng',
        'Undefined Behavior — truy cập ngoài giới hạn mảng (buffer overflow)',
        'Compile error — C kiểm tra bound tại compile time',
        'In ra 5 — phần tử cuối cùng',
      ],
      answer: 1,
      explanation: 'C không kiểm tra bounds khi runtime. arr[5] đọc vùng nhớ ngay sau arr (index hợp lệ: 0-4). Kết quả: có thể in rác, crash, hoặc đọc biến khác. Đây là buffer overflow — nguồn gốc nhiều lỗ hổng bảo mật. C++ std::vector hoặc C++ span có bounds checking. Luôn kiểm tra `i < len`.',
    },
    {
      stem: 'Git: sau khi `git merge feature` sinh ra merge conflict, developer sửa xong nhưng quên `git add` trước khi `git commit`. Điều gì xảy ra?',
      choices: [
        'Commit thành công nhưng không bao gồm file đã sửa',
        'Git báo lỗi "You have unmerged paths" — cần stage file đã resolve trước',
        'Merge tự động rollback',
        'Git tự add tất cả file đã sửa',
      ],
      answer: 1,
      explanation: 'Sau khi giải quyết conflict, cần `git add <file>` để đánh dấu conflict đã resolve. Sau đó `git commit` mới tạo được merge commit. Nếu quên add, git báo "You have unmerged paths" và từ chối commit. `git status` luôn là bước đầu tiên khi không chắc.',
    },
    {
      stem: 'Python: `for i in range(10): if i == 5: continue; print(i)`. Output có dòng số 5 không?',
      choices: [
        'Có — continue chỉ bỏ qua lần lặp kế tiếp',
        'Không — continue bỏ qua phần còn lại của vòng lặp hiện tại (i=5), nhảy sang i=6',
        'Lỗi — continue không dùng trong if',
        'Không — continue dừng toàn bộ vòng lặp',
      ],
      answer: 1,
      explanation: '`continue` bỏ qua phần code còn lại của iteration hiện tại và nhảy lên đầu vòng lặp. Khi i=5: continue → không in. i=0,1,2,3,4,6,7,8,9 được in. `break` mới dừng toàn vòng lặp. Phân biệt continue (skip) vs break (stop).',
    },
    {
      stem: 'JavaScript: `var x = 1; function foo() { console.log(x); var x = 2; } foo()`. In ra gì?',
      choices: [
        '1 — x trong foo() tham chiếu x ngoài',
        'undefined — hoisting: khai báo var x được đưa lên đầu hàm, nhưng giá trị chưa được gán',
        '2 — x = 2 được thực thi trước khi console.log',
        'ReferenceError — x chưa được khai báo',
      ],
      answer: 1,
      explanation: 'Hoisting: `var x` trong foo() được kéo lên đầu hàm → `var x; console.log(x); x = 2;` → x = undefined lúc log. Nếu dùng `let`/`const`, sẽ có TDZ (Temporal Dead Zone) → ReferenceError. Đây là lý do hiện đại dùng `let`/`const` thay `var`.',
    },
    {
      stem: 'Race condition là gì và xảy ra khi nào?',
      choices: [
        'CPU chạy 2 tiến trình tranh nhau tài nguyên phần cứng',
        'Lỗi khi nhiều thread/process đọc-ghi cùng resource mà không đồng bộ hóa, kết quả phụ thuộc thứ tự thực thi',
        'Vòng lặp chạy nhanh hơn dự kiến gây tràn bộ nhớ',
        'Database deadlock khi 2 transaction chờ nhau',
      ],
      answer: 1,
      explanation: 'Race condition: T1 đọc x=5, T2 đọc x=5, T1 viết x=6, T2 viết x=6 → mất 1 lần tăng. Sửa bằng mutex/lock, atomic operations, hoặc message passing. Deadlock khác: 2 thread chờ lock của nhau → đứng cứng. Race condition là bug khó debug nhất vì không reproduce được.',
    },
  ],
};

// ─── IG03 · SQL Detective ───────────────────────────────────
export const IG03_QUIZ = {
  id: 'IG03-sql-detective-quiz',
  title: 'IG03 · SQL Detective',
  kind: 'quiz',
  subject: 'game', difficulty: 2,
  skillsTrained: ['sql', 'database', 'query-optimization'],
  questions: [
    {
      stem: 'Cho bảng employees(id, name, dept_id, salary). Câu query nào đúng để lấy tên nhân viên có lương cao nhất TỪNG phòng ban?',
      choices: [
        'SELECT dept_id, name, MAX(salary) FROM employees GROUP BY dept_id',
        'SELECT e.dept_id, e.name, e.salary FROM employees e INNER JOIN (SELECT dept_id, MAX(salary) AS max_sal FROM employees GROUP BY dept_id) m ON e.dept_id = m.dept_id AND e.salary = m.max_sal',
        'SELECT dept_id, name, salary FROM employees ORDER BY salary DESC LIMIT 1',
        'SELECT dept_id, name FROM employees WHERE salary = MAX(salary)',
      ],
      answer: 1,
      explanation: 'Cần subquery để tìm max_sal per dept, rồi JOIN ngược lại để lấy tên. Câu A sai: name trong SELECT không trong GROUP BY → lỗi hoặc kết quả không xác định. Câu C chỉ lấy 1 người. Câu D sai vì không dùng aggregate trong WHERE trực tiếp. Window function: `SELECT *, RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)` sẽ tự động hóa.',
    },
    {
      stem: 'INNER JOIN vs LEFT JOIN khác nhau như thế nào?',
      choices: [
        'INNER JOIN nhanh hơn LEFT JOIN',
        'INNER JOIN: chỉ row có match ở CẢ HAI bảng; LEFT JOIN: tất cả row bảng trái + NULL cho cột bảng phải khi không có match',
        'LEFT JOIN giống INNER JOIN nhưng bao gồm cả NULL từ bảng phải',
        'Không khác nhau, chỉ là cú pháp khác nhau',
      ],
      answer: 1,
      explanation: 'INNER JOIN = giao (intersection): chỉ giữ row khớp. LEFT JOIN = tất cả bảng trái, bảng phải NULL nếu không khớp. RIGHT JOIN: ngược lại. FULL OUTER JOIN: tất cả từ cả hai, NULL ở bên không có match. Dùng LEFT JOIN khi cần "customers và đơn hàng của họ (kể cả chưa đặt hàng)".',
    },
    {
      stem: 'Câu lệnh SQL nào ĐẦU TIÊN được thực thi trong một SELECT hoàn chỉnh?',
      choices: ['SELECT', 'WHERE', 'FROM', 'HAVING'],
      answer: 2,
      explanation: 'Thứ tự thực thi SQL (khác thứ tự viết): FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. FROM xác định nguồn dữ liệu trước tiên. WHERE lọc trước GROUP BY. HAVING lọc sau GROUP BY (dùng với aggregate). Hiểu thứ tự này giúp tránh nhiều lỗi.',
    },
    {
      stem: 'Index trong database có tác dụng gì và trade-off là gì?',
      choices: [
        'Index tăng tốc đọc (SELECT) nhưng tốn thêm disk và làm chậm ghi (INSERT/UPDATE/DELETE)',
        'Index tăng tốc ghi nhưng làm chậm đọc',
        'Index chỉ hiệu quả với PRIMARY KEY, không dùng cho cột thường',
        'Index không ảnh hưởng INSERT, chỉ ảnh hưởng SELECT',
      ],
      answer: 0,
      explanation: 'Index = cấu trúc B-tree (hoặc hash) song song bảng, cho phép tìm kiếm O(log n) thay vì O(n) full scan. Trade-off: mỗi INSERT/UPDATE/DELETE phải cập nhật index → chậm hơn. Không nên index mọi cột: index ít được dùng làm chậm write mà không tăng read. Compound index (a,b): hiệu quả cho WHERE a=? AND b=? nhưng không cho WHERE b=? đơn lẻ.',
    },
    {
      stem: 'Subquery correlated là gì và tại sao thường chậm?',
      choices: [
        'Subquery chạy một lần và kết quả được cache lại cho outer query',
        'Subquery tham chiếu cột từ outer query, chạy lại một lần cho MỖI ROW của outer query → O(n²)',
        'Subquery trong FROM clause — luôn hiệu quả hơn JOIN',
        'Subquery dùng EXISTS thay vì IN để tối ưu',
      ],
      answer: 1,
      explanation: 'Correlated subquery: `SELECT e.name FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id)`. Subquery chạy lại cho mỗi row của outer → O(n*m). Tối ưu: viết lại bằng JOIN với subquery non-correlated hoặc window function. EXPLAIN/EXPLAIN ANALYZE để phân tích query plan.',
    },
    {
      stem: 'Sự khác biệt giữa DELETE, TRUNCATE và DROP?',
      choices: [
        'Đều giống nhau, chỉ khác cú pháp',
        'DELETE: xóa row có thể rollback, TRUNCATE: xóa tất cả nhanh hơn (thường không rollback được), DROP: xóa cả cấu trúc bảng',
        'TRUNCATE có thể dùng WHERE để lọc, DELETE thì không',
        'DROP chỉ xóa data, cấu trúc bảng vẫn còn',
      ],
      answer: 1,
      explanation: 'DELETE: DML, có thể WHERE, trigger kích hoạt, có thể ROLLBACK. TRUNCATE: DDL, xóa toàn bộ row, reset identity/sequence, nhanh hơn (không ghi log từng row), một số DB không rollback được. DROP: DDL, xóa cả bảng (cấu trúc + data). Luôn backup trước TRUNCATE và DROP trong môi trường production.',
    },
    {
      stem: 'Window function `ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)` làm gì?',
      choices: [
        'Đếm tổng số row trong bảng',
        'Gán số thứ tự cho từng row trong mỗi nhóm dept, xếp theo lương giảm dần — không làm thu nhỏ kết quả',
        'Tương đương GROUP BY dept',
        'Lấy row có lương cao nhất trong mỗi dept',
      ],
      answer: 1,
      explanation: 'Window function tính toán trên "cửa sổ" nhóm row nhưng KHÔNG thu nhỏ kết quả như GROUP BY. PARTITION BY dept: reset đếm mỗi dept. ORDER BY salary DESC: row lương cao nhất = 1. Dùng để lọc `WHERE rn = 1` (top 1 per dept), pagination, running totals. RANK() và DENSE_RANK() khác khi có giá trị bằng nhau.',
    },
    {
      stem: 'N+1 query problem là gì trong ORM?',
      choices: [
        'Query có N bảng JOIN với nhau → N+1 indexes cần',
        'Load N đối tượng bằng 1 query, rồi chạy thêm 1 query PER đối tượng để load dữ liệu liên quan → N+1 queries tổng',
        'Query lớn hơn N MB phải chia thành N+1 batch',
        'Lỗi khi DELETE N row cần N+1 transaction',
      ],
      answer: 1,
      explanation: 'N+1: `SELECT * FROM posts` (1 query) → với mỗi post, `SELECT * FROM comments WHERE post_id = ?` (N queries). Giải pháp: eager loading — `SELECT * FROM posts; SELECT * FROM comments WHERE post_id IN (1,2,...N)` (2 queries). ORM: Hibernate `@OneToMany(fetch=EAGER)`, Django `prefetch_related()`, Rails `includes()`. Luôn dùng EXPLAIN để phát hiện.',
    },
    {
      stem: 'Transaction ACID đảm bảo gì trong database?',
      choices: [
        'Atomicity (tất cả hoặc không gì cả), Consistency (dữ liệu hợp lệ), Isolation (transaction độc lập), Durability (commit không mất)',
        'Accuracy, Concurrency, Integrity, Distribution',
        'Authentication, Cryptography, Indexing, Denormalization',
        'Atomicity, Caching, Indexes, Durability',
      ],
      answer: 0,
      explanation: 'ACID: A=Atomicity (toàn bộ hoặc rollback), C=Consistency (ràng buộc luôn thỏa mãn), I=Isolation (transaction song song không thấy nhau trong quá trình), D=Durability (commit = persist kể cả crash). NoSQL thường chọn BASE (Basically Available, Soft-state, Eventually consistent) thay vì ACID để đổi lấy hiệu năng/phân tán.',
    },
    {
      stem: 'Điều gì xảy ra khi EXPLAIN của query có "Seq Scan" trên bảng lớn?',
      choices: [
        'Query đang dùng index hiệu quả',
        'Database đọc tuần tự từng row (full table scan) — thường là dấu hiệu cần thêm index',
        'Query đang được cache trong memory',
        'Database đang backup bảng',
      ],
      answer: 1,
      explanation: 'Seq Scan = quét tuần tự toàn bảng O(n). Với bảng nhỏ (<1000 row) thì OK. Với bảng lớn → chậm. Giải pháp: thêm index trên cột WHERE/JOIN/ORDER BY. Nhưng không phải lúc nào cũng cần: nếu query lấy >20-30% bảng, planner có thể chọn Seq Scan thay Index Scan (vì index scan có overhead per-row). Index Scan = O(log n + k) với k là số row kết quả.',
    },
  ],
};

// ─── IG04 · Kafka — System Design battle ────────────────────
export const IG04_QUIZ = {
  id: 'IG04-system-design-quiz',
  title: 'IG04 · System Design battle — Kafka, Microservices & Distributed Systems',
  kind: 'quiz',
  subject: 'game', difficulty: 3,
  skillsTrained: ['system-design', 'distributed-systems', 'kafka', 'microservices'],
  questions: [
    {
      stem: 'Kafka khác gì so với RabbitMQ về mô hình lưu trữ message?',
      choices: [
        'Kafka: message bị xóa sau khi consumer đọc (như queue). RabbitMQ: message được lưu log vĩnh viễn',
        'Kafka: lưu message vào log bất biến (immutable log), consumer tự quản lý offset → có thể đọc lại. RabbitMQ: xóa message sau khi consumer ack',
        'Kafka và RabbitMQ đều xóa message sau khi đọc',
        'RabbitMQ hỗ trợ replay message, Kafka thì không',
      ],
      answer: 1,
      explanation: 'Kafka: append-only log, message retained theo time/size (mặc định 7 ngày). Consumer group tự quản offset → có thể re-consume, replay, audit. RabbitMQ: message queue truyền thống, message bị xóa sau ack. Kafka phù hợp: event streaming, audit log, microservice event bus. RabbitMQ phù hợp: task queue, RPC pattern.',
    },
    {
      stem: 'CAP theorem phát biểu điều gì về hệ thống phân tán?',
      choices: [
        'Một hệ thống phân tán có thể đồng thời đảm bảo: Consistency, Availability, và Partition tolerance',
        'Một hệ thống phân tán chỉ có thể đảm bảo TỐI ĐA 2 trong 3: Consistency, Availability, Partition tolerance',
        'CAP chỉ áp dụng cho database quan hệ, không áp dụng cho NoSQL',
        'Partition tolerance không thể tránh → chỉ có thể chọn giữa Consistency và Availability',
      ],
      answer: 3,
      explanation: 'Trong thực tế, mạng luôn có thể bị phân vùng (partition) → P không thể bỏ. Phải chọn C hoặc A khi có partition: CP (consistency, từ chối phục vụ khi bất đồng bộ) như ZooKeeper, etcd, HBase; AP (availability, chấp nhận stale data) như Cassandra, DynamoDB. Hệ thống tốt thiết kế tunable consistency.',
    },
    {
      stem: 'Circuit Breaker pattern giải quyết vấn đề gì trong microservices?',
      choices: [
        'Mã hóa traffic giữa các service',
        'Ngăn cascade failure: khi service B lỗi, Circuit Breaker ở service A "ngắt" call → trả lỗi nhanh thay vì chờ timeout → giải phóng resource',
        'Load balancing giữa các instance của cùng service',
        'Versioning API giữa các service',
      ],
      answer: 1,
      explanation: 'Circuit Breaker states: CLOSED (hoạt động bình thường), OPEN (lỗi nhiều → tự ngắt, không gọi service B nữa, trả lỗi ngay), HALF-OPEN (thử lại sau timeout). Ngăn cascade: nếu B lỗi mà A cứ gọi → thread pool A cạn kiệt → A cũng lỗi → toàn hệ thống sập. Netflix Hystrix, Resilience4j, Polly (.NET) implement pattern này.',
    },
    {
      stem: 'Eventual Consistency trong distributed systems có nghĩa gì?',
      choices: [
        'Dữ liệu luôn nhất quán ở mọi node tại mọi thời điểm',
        'Nếu không có update mới, sau một khoảng thời gian tất cả replica sẽ đồng quy về cùng giá trị — tạm thời có thể đọc stale data',
        'Dữ liệu chỉ nhất quán trong transaction, không đảm bảo sau đó',
        'System đảm bảo nhất quán sau khi tất cả node restart',
      ],
      answer: 1,
      explanation: 'Eventual consistency: write đến 1 node → propagate async đến các replica → "eventually" tất cả thống nhất. DNS là ví dụ cổ điển. DynamoDB, Cassandra, S3 đều dùng. Trade-off: latency thấp hơn (write không cần chờ tất cả replica). Conflict resolution: Last-Write-Wins (timestamp), vector clocks, CRDTs. Strong consistency: mọi read thấy write cuối cùng ngay lập tức.',
    },
    {
      stem: 'API Gateway trong microservices kiến trúc đảm nhận vai trò gì?',
      choices: [
        'Database connection pool cho tất cả service',
        'Single entry point: routing, auth, rate limiting, SSL termination, request aggregation — client chỉ cần biết 1 địa chỉ',
        'Message broker giữa các microservice',
        'Monitoring và alerting cho toàn hệ thống',
      ],
      answer: 1,
      explanation: 'API Gateway: client → Gateway → service A/B/C. Gateway lo: authenticate (JWT/OAuth), rate limit, SSL, logging, request transformation, response aggregation. Ví dụ: Kong, AWS API Gateway, Nginx, Traefik. Không nên để business logic vào Gateway (spaghetti). Backend For Frontend (BFF): Gateway riêng cho mobile vs web.',
    },
    {
      stem: 'Kafka topic partition có tác dụng gì và trade-off khi tăng số partition?',
      choices: [
        'Partition tăng fault tolerance nhưng giảm throughput',
        'Partition tăng parallelism (mỗi partition có thể xử lý song song bởi 1 consumer trong group) → tăng throughput, nhưng tăng overhead metadata và giảm ordering guarantee (only within partition)',
        'Partition không ảnh hưởng performance, chỉ là cơ chế replication',
        'Nhiều partition → message được deduplicated tự động',
      ],
      answer: 1,
      explanation: 'Kafka partition = đơn vị parallelism. Consumer group: mỗi partition assign cho 1 consumer → max parallelism = số partition. Tăng partition: tăng throughput (nhiều consumer xử lý song song), tăng latency failover, tăng file handles. Ordering: chỉ đảm bảo trong cùng partition → dùng message key để route cùng key vào cùng partition.',
    },
    {
      stem: 'Service Mesh (như Istio, Linkerd) giải quyết vấn đề gì?',
      choices: [
        'Thay thế API Gateway cho routing',
        'Infrastructure layer xử lý service-to-service communication: mTLS, load balancing, retries, circuit breaking, observability — không cần thay đổi application code',
        'Thay thế Kubernetes cho container orchestration',
        'Message queue thay thế Kafka',
      ],
      answer: 1,
      explanation: 'Service Mesh: mỗi service có sidecar proxy (Envoy). Traffic service A → sidecar A → sidecar B → service B. Sidecar lo: encrypt (mTLS), retry, timeout, circuit break, metrics, tracing. Application code không cần biết. Control plane (Istio: Istiod) configure các sidecar. Overhead: thêm hop network, thêm CPU/RAM cho sidecar.',
    },
    {
      stem: 'CQRS (Command Query Responsibility Segregation) pattern là gì?',
      choices: [
        'Tách database đọc và ghi vào 2 server khác nhau',
        'Tách model đọc (Query) và ghi (Command) thành 2 model riêng biệt → tối ưu độc lập read và write paths',
        'Cache tất cả query kết quả để giảm tải database',
        'Dùng stored procedures cho tất cả command',
      ],
      answer: 1,
      explanation: 'CQRS: Command (write): validate, apply business logic, lưu event. Query (read): materialized view tối ưu cho read, có thể denormalize. Ưu điểm: scale read và write độc lập, read model đơn giản. Thường đi kèm Event Sourcing: lưu tất cả event thay vì state cuối cùng → rebuild state bất kỳ thời điểm. Phức tạp hơn CRUD thuần túy.',
    },
    {
      stem: 'Distributed tracing (như Jaeger, Zipkin) giúp gì trong microservices?',
      choices: [
        'Track số lượng request mỗi service nhận',
        'Theo dõi 1 request qua nhiều service: span/trace ID lan truyền → thấy được latency từng service, tìm bottleneck, debug lỗi cross-service',
        'Monitor CPU và RAM của mỗi service',
        'Log tập trung từ tất cả service vào 1 nơi',
      ],
      answer: 1,
      explanation: 'Distributed tracing: mỗi request có trace-id. Mỗi service tạo span với thời gian xử lý. Trace = cây các span. Jaeger/Zipkin thu thập, visualize Gantt chart của request. Phân biệt: Logging (ghi event), Metrics (số đo aggregate), Tracing (follow request journey). Observability = Logs + Metrics + Traces (3 trụ cột).',
    },
    {
      stem: 'Trong thiết kế hệ thống URL shortener (như bit.ly), bottleneck chính khi scale là gì và giải pháp?',
      choices: [
        'CPU khi tính hash — giải pháp: dùng GPU',
        'Database read (redirect lookup) — giải pháp: CDN + in-memory cache (Redis) để read O(1), write ít hơn nhiều so với read',
        'Network bandwidth — giải pháp: nén URL',
        'Application logic — giải pháp: rewrite bằng ngôn ngữ nhanh hơn',
      ],
      answer: 1,
      explanation: 'URL shortener: 1 write (shorten) nhưng nhiều read (redirect). Read/write ratio ~100:1. Giải pháp: cache (Redis) lưu short→long mapping, TTL = vĩnh viễn (URL không đổi). Cache hit rate ~99% → database ít phải đọc. CDN edge caching cho URL phổ biến. Consistent hashing cho cache cluster. DB: dùng base62 encode (a-z, A-Z, 0-9) cho short code 6-8 ký tự → 62^7 = 3.5 tỉ URL.',
    },
  ],
};

export const IT_GAMES_SCENARIOS = {
  [IG01_QUIZ.id]: IG01_QUIZ,
  [IG02_QUIZ.id]: IG02_QUIZ,
  [IG03_QUIZ.id]: IG03_QUIZ,
  [IG04_QUIZ.id]: IG04_QUIZ,
};
