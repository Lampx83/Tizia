// ============================================================
// Trường CNTT — Scenarios Năm 3, phần 1/4: I3.1 + I3.2
// ============================================================

// ─── I3.1 · Kỹ thuật phần mềm ──────────────────────────────
export const I31_QUIZ = {
  id: 'I3.1-se-quiz',
  title: 'I3.1 · Kỹ thuật phần mềm — SDLC, Agile, Testing, UML',
  kind: 'quiz',
  yearLevel: 3, subject: 'ky-thuat-pm', difficulty: 3,
  skillsTrained: ['sdlc', 'agile', 'testing', 'uml', 'requirements'],
  questions: [
    {
      stem: 'Trong mô hình Agile Scrum, "Sprint" là gì?',
      choices: [
        'Giai đoạn lập kế hoạch dự án dài 3–6 tháng',
        'Chu kỳ phát triển ngắn cố định (thường 1–4 tuần) kết thúc với sản phẩm có thể demo',
        'Buổi họp hàng ngày 15 phút của nhóm phát triển',
        'Danh sách tất cả yêu cầu của sản phẩm',
      ],
      answer: 1,
      explanation: 'Sprint là timebox cố định (thường 2 tuần) — nhóm chọn items từ Product Backlog vào Sprint Backlog và cam kết hoàn thành. Kết thúc sprint: Sprint Review (demo) + Sprint Retrospective (cải tiến quy trình). Daily Scrum (stand-up) là cuộc họp 15 phút hàng ngày. Product Backlog = danh sách yêu cầu ưu tiên. Sprint Backlog = subset được chọn cho sprint. Scrum Master giải quyết impediment; Product Owner ưu tiên backlog.',
    },
    {
      stem: 'Mô hình thác nước (Waterfall) khác Agile chủ yếu ở điểm nào?',
      choices: [
        'Waterfall dùng nhiều sprint ngắn, Agile dùng một giai đoạn dài',
        'Waterfall tuyến tính (mỗi phase hoàn thành mới qua phase tiếp), Agile lặp lại và thích nghi với thay đổi',
        'Waterfall không có giai đoạn kiểm thử',
        'Agile không có tài liệu (documentation)',
      ],
      answer: 1,
      explanation: 'Waterfall: Requirement → Design → Implementation → Testing → Maintenance — mỗi giai đoạn phải hoàn thành 100% trước khi chuyển tiếp, khó thay đổi khi đã ký kết. Agile: phát triển lặp (iterate) qua các sprint ngắn, ôm ấp thay đổi, phản hồi liên tục từ khách hàng. Agile tốt cho yêu cầu không rõ ràng; Waterfall phù hợp với yêu cầu cố định (xây dựng, phần cứng). Agile Manifesto 2001: individuals over processes, working software over documentation.',
    },
    {
      stem: 'Unit Test kiểm tra điều gì?',
      choices: [
        'Tương tác giữa nhiều module với nhau',
        'Hành vi của toàn bộ hệ thống từ góc nhìn người dùng',
        'Một đơn vị code độc lập (hàm, method) hoạt động đúng theo spec',
        'Hiệu năng và tải của hệ thống',
      ],
      answer: 2,
      explanation: 'Testing pyramid: Unit Test (nền — nhiều, nhanh, rẻ) → Integration Test (giữa — kiểm tra tương tác module) → E2E/UI Test (đỉnh — ít, chậm, đắt). Unit Test: test từng hàm/method riêng lẻ, dùng mock/stub để cô lập dependencies. Ví dụ: test hàm tính giá giảm không cần DB thật. Framework: Jest (JS), JUnit (Java), pytest (Python). Integration Test: nhiều module cùng chạy — ví dụ API + DB. E2E: toàn bộ flow từ UI đến backend.',
    },
    {
      stem: 'Trong UML, biểu đồ Use Case (Use Case Diagram) mô tả gì?',
      choices: [
        'Cấu trúc bên trong của class và quan hệ kế thừa',
        'Luồng thực thi tuần tự của các phương thức trong runtime',
        'Chức năng hệ thống từ góc nhìn người dùng: Actor và những gì họ có thể làm',
        'Trạng thái của object qua từng sự kiện',
      ],
      answer: 2,
      explanation: 'Use Case Diagram: Actor (người/hệ thống ngoài) + Use Cases (hình oval = tính năng) + quan hệ include/extend. Dùng để thu thập yêu cầu, giao tiếp với stakeholder. Class Diagram: cấu trúc class + thuộc tính + phương thức + quan hệ (kế thừa, association, aggregation, composition). Sequence Diagram: luồng tin nhắn theo thời gian giữa các object. State Diagram: vòng đời object qua các trạng thái và sự kiện kích hoạt chuyển trạng thái.',
    },
    {
      stem: 'Software Requirement Specification (SRS) phân loại yêu cầu thành hai loại chính:',
      choices: [
        'Yêu cầu Frontend và yêu cầu Backend',
        'Yêu cầu chức năng (Functional) và yêu cầu phi chức năng (Non-Functional)',
        'Yêu cầu khách hàng và yêu cầu kỹ thuật',
        'Yêu cầu bắt buộc và yêu cầu tùy chọn',
      ],
      answer: 1,
      explanation: 'Functional Requirements: HỆ THỐNG PHẢI LÀM GÌ — ví dụ "hệ thống cho phép user đăng nhập bằng email+password". Non-Functional Requirements (NFR): CHẤT LƯỢNG — Performance (trang load < 2s), Security (mã hoá TLS), Scalability (chịu 10.000 concurrent users), Usability (WCAG 2.1), Reliability (uptime 99.9%), Maintainability. NFR thường ảnh hưởng kiến trúc hơn feature. IEEE 830 chuẩn hoá SRS. User Story (Agile): "As a [role], I want [feature] so that [benefit]" + Acceptance Criteria.',
    },
    {
      stem: 'Nguyên tắc SOLID trong OOP — chữ "O" là gì?',
      choices: [
        'Open-Closed Principle: class mở để mở rộng, đóng để sửa đổi',
        'Object-Oriented Principle: mọi thứ phải là object',
        'Optional Dependency: phụ thuộc không bắt buộc',
        'Overloading Principle: ưu tiên overloading hơn override',
      ],
      answer: 0,
      explanation: 'SOLID: S = Single Responsibility (1 class 1 lý do thay đổi); O = Open/Closed (mở rộng bằng kế thừa/composition, KHÔNG sửa code cũ → không break existing); L = Liskov Substitution (subclass thay thế được superclass); I = Interface Segregation (nhiều interface nhỏ hơn 1 interface lớn); D = Dependency Inversion (depend on abstractions, not concretions). SOLID giúp code dễ maintain, test, và mở rộng. Ví dụ vi phạm O: thêm type mới phải sửa switch-case trong class cũ → dùng Strategy Pattern thay thế.',
    },
    {
      stem: 'Code Review mang lại lợi ích chính nào?',
      choices: [
        'Tăng tốc độ phát triển vì nhiều người cùng viết code một lúc',
        'Phát hiện bug sớm, chia sẻ kiến thức, đảm bảo code style nhất quán, giảm technical debt',
        'Cho phép deploy code không cần chạy test',
        'Chứng minh code đúng về mặt toán học',
      ],
      answer: 1,
      explanation: 'Code Review: ít nhất 1 developer khác đọc code trước khi merge. Lợi ích: bắt bug logic sớm (rẻ hơn gấp 6× so với fix sau production), knowledge sharing (không để "code chỉ 1 người biết"), enforce coding standards, cải thiện thiết kế. Tool: GitHub Pull Request / GitLab MR. Best practices: review nhỏ (< 400 dòng), comment constructive, approve nhanh (< 24h). Pair Programming: 2 người cùng viết 1 màn — review realtime nhưng tốn gấp đôi người. Static Analysis (ESLint, SonarQube): tự động kiểm tra, bổ sung (không thay thế) review.',
    },
    {
      stem: 'Version Control với Git — "merge conflict" xảy ra khi nào?',
      choices: [
        'Khi push code lên remote bị từ chối vì không có quyền',
        'Khi hai nhánh (branch) sửa cùng một dòng hoặc vùng code, Git không tự quyết định giữ cái nào',
        'Khi commit message quá ngắn',
        'Khi xóa file mà file đó chưa được track bởi Git',
      ],
      answer: 1,
      explanation: 'Merge conflict: Git merge 2 nhánh mà cùng vùng code bị sửa theo 2 hướng khác nhau → Git đánh dấu <<<<<< HEAD ... ====== ... >>>>>> branch-name. Dev phải tự quyết định giữ phần nào rồi xoá markers và git add. Tránh conflict: pull thường xuyên, branch ngắn (< 1 tuần), feature nhỏ, communicate với team. Rebase vs Merge: rebase viết lại history (linear), merge tạo merge commit (preserve history). Golden rule: không rebase nhánh đã share.',
    },
    {
      stem: 'Continuous Integration (CI) là gì?',
      choices: [
        'Triết lý thiết kế phần mềm dựa trên tích hợp nhiều ngôn ngữ lập trình',
        'Phương pháp dev thường xuyên merge code vào nhánh chính, mỗi lần merge tự động build + test',
        'Công cụ quản lý database tự động migration',
        'Kỹ thuật deploy server không cần downtime',
      ],
      answer: 1,
      explanation: 'CI: mỗi commit/PR tự động trigger pipeline: build → unit test → integration test → lint → security scan → report. Mục tiêu: phát hiện lỗi sớm, "broken build = team stops". Tool: GitHub Actions, GitLab CI, Jenkins, CircleCI. CD = Continuous Delivery: tự động đóng gói artifact sẵn sàng deploy; Continuous Deployment: tự động deploy luôn đến production. CI/CD pipeline giảm thiểu risk của release, cho phép deploy nhiều lần/ngày. Thước đo: DORA metrics (deployment frequency, lead time, MTTR, change failure rate).',
    },
    {
      stem: 'Kỹ thuật Test-Driven Development (TDD) theo thứ tự nào?',
      choices: [
        'Viết code → Viết test → Refactor',
        'Viết test (FAIL) → Viết code đủ để test PASS → Refactor (Red-Green-Refactor)',
        'Viết tài liệu → Viết test → Viết code',
        'Deploy → Viết test → Fix bug',
      ],
      answer: 1,
      explanation: 'TDD: Red-Green-Refactor. 1) Red: viết test cho tính năng CHƯA có → test phải FAIL (xác nhận test đang test đúng thứ). 2) Green: viết code ĐỦ để test PASS (kể cả hard-code tạm). 3) Refactor: cải thiện code giữ test xanh. Lợi ích: luôn có test coverage cao, thiết kế testable, confidence khi refactor. Khó: cần kỷ luật cao, overhead ban đầu. BDD (Behavior-Driven): viết test bằng ngôn ngữ tự nhiên "Given/When/Then" (Cucumber, Gherkin) — PO + Dev + QA cùng viết.',
    },
  ],
};

// ─── I3.2 · Phân tích & Thiết kế hệ thống ──────────────────
export const I32_QUIZ = {
  id: 'I3.2-sad-quiz',
  title: 'I3.2 · Phân tích & Thiết kế hệ thống — Architecture, Patterns, DDD',
  kind: 'quiz',
  yearLevel: 3, subject: 'phan-tich-tk', difficulty: 3,
  skillsTrained: ['system-design', 'architecture', 'design-patterns', 'ddd', 'microservices'],
  questions: [
    {
      stem: 'Kiến trúc Microservices khác Monolithic ở điểm chính nào?',
      choices: [
        'Microservices viết bằng một ngôn ngữ duy nhất, Monolithic dùng nhiều ngôn ngữ',
        'Microservices tách thành nhiều dịch vụ nhỏ độc lập giao tiếp qua API; Monolithic tất cả trong một ứng dụng',
        'Monolithic không thể scale, Microservices luôn scale tốt hơn',
        'Microservices không cần database',
      ],
      answer: 1,
      explanation: 'Monolith: 1 codebase, 1 deployment unit — đơn giản ban đầu nhưng scale khó, deploy toàn bộ mỗi lần. Microservices: phân rã theo bounded context (Domain-Driven Design), mỗi service: 1 trách nhiệm, DB riêng, deploy độc lập, team riêng. Lợi ích: scale từng service riêng, fault isolation, technology diversity. Nhược: phức tạp ops (Kubernetes, service discovery, distributed tracing, eventual consistency). "Microservices là sự đánh đổi: giải quyết vấn đề scale và team nhưng thêm complexity distributed systems." Bắt đầu monolith, chuyển dần.',
    },
    {
      stem: 'Design Pattern "Singleton" đảm bảo điều gì?',
      choices: [
        'Class chỉ có một phương thức duy nhất',
        'Chỉ một instance của class tồn tại trong toàn bộ ứng dụng',
        'Class không thể bị kế thừa',
        'Mỗi thread có instance riêng của class',
      ],
      answer: 1,
      explanation: 'Singleton: constructor private, static method `getInstance()` tạo instance lần đầu và trả về cùng instance mãi sau. Dùng cho: logger, config manager, connection pool, cache. Vấn đề: khó test (global state), vi phạm Single Responsibility, thread-safety (cần synchronized hoặc double-checked locking trong Java). Lazy initialization: tạo khi lần đầu dùng. Eager: tạo khi class load. GoF (Gang of Four) Patterns: Creational (Singleton, Factory, Builder, Prototype, Abstract Factory), Structural (Adapter, Decorator, Facade, Proxy), Behavioral (Observer, Strategy, Command, Iterator).',
    },
    {
      stem: 'REST API dùng HTTP method nào để CẬP NHẬT một phần resource?',
      choices: ['POST', 'PUT', 'PATCH', 'DELETE'],
      answer: 2,
      explanation: 'HTTP Methods cho REST: GET (lấy dữ liệu, safe + idempotent), POST (tạo mới, không idempotent), PUT (thay thế toàn bộ resource, idempotent), PATCH (cập nhật một phần — partial update, không bắt buộc idempotent), DELETE (xóa, idempotent). Idempotent = gọi nhiều lần cùng kết quả. RESTful constraints: stateless (mỗi request self-contained), resource-based URLs (/users/123), uniform interface, HATEOAS (responses chứa links). GraphQL thay thế: 1 endpoint, client khai báo data cần lấy.',
    },
    {
      stem: 'Observer Pattern (Publish-Subscribe) được áp dụng trong tình huống nào?',
      choices: [
        'Khi cần tạo nhiều object cùng kiểu mà không cần biết class cụ thể',
        'Khi một object thay đổi trạng thái cần tự động thông báo cho nhiều object phụ thuộc',
        'Khi muốn bọc interface cũ bằng interface mới',
        'Khi cần đảm bảo chỉ có một instance của class',
      ],
      answer: 1,
      explanation: 'Observer: Subject (Publisher) duy trì danh sách Observers (Subscribers), khi trạng thái thay đổi → notify all observers. Ví dụ: EventEmitter trong Node.js, useState React (component re-render khi state đổi), Kotlin Flow, Android LiveData. Pub/Sub qua message broker (Kafka, RabbitMQ): publisher gửi event vào topic, subscriber đăng ký topic — hoàn toàn decoupled. Reactive Programming (RxJS, Project Reactor): stream-based, observer pattern mở rộng với operators (map, filter, debounce). Factory: tạo object. Adapter: bọc interface.',
    },
    {
      stem: 'Database Normalization (Chuẩn hoá CSDL) — 3NF (Third Normal Form) yêu cầu gì?',
      choices: [
        'Mọi thuộc tính phải là nguyên tử (không chia nhỏ được)',
        'Bảng đã ở 2NF và không có phụ thuộc bắc cầu (transitive dependency) vào khóa chính',
        'Mọi cột phải là NOT NULL',
        'Mỗi bảng chỉ được có một cột khóa ngoại',
      ],
      answer: 1,
      explanation: '1NF: giá trị nguyên tử, không nhóm lặp. 2NF: đã ở 1NF + mọi non-key attribute phụ thuộc HOÀN TOÀN vào khóa chính (không partial dependency — áp dụng khi khóa composite). 3NF: đã ở 2NF + không có transitive dependency (A→B→C thì phải tách B ra bảng riêng). BCNF (Boyce-Codd): mọi determinant là candidate key. Denormalization: cố tình vi phạm NF để tăng read performance (thêm redundancy). OLTP thường ở 3NF; Data Warehouse thường denormalize (Star Schema). Ví dụ vi phạm 3NF: bảng Orders(order_id, customer_id, customer_city) — city phụ thuộc customer_id, không phải order_id.',
    },
    {
      stem: 'CAP Theorem trong distributed systems phát biểu rằng hệ thống phân tán không thể đồng thời đảm bảo tất cả 3 tính chất:',
      choices: [
        'Consistency, Availability, Partition tolerance — chỉ có thể đạt 2 trong 3',
        'Concurrency, Atomicity, Persistence — chỉ đạt 2 trong 3',
        'Cache, API, Protocol — phải chọn ưu tiên',
        'Correctness, Accuracy, Performance — trade-off tất nhiên',
      ],
      answer: 0,
      explanation: 'CAP: C = Consistency (mọi node trả cùng data mới nhất), A = Availability (mọi request được phản hồi, kể cả không phải data mới nhất), P = Partition Tolerance (hệ thống tiếp tục hoạt động khi mạng bị phân tách). Vì P không thể tắt trong distributed system (mạng luôn có thể fail), thực tế chọn giữa CP hoặc AP. CP: HBase, ZooKeeper, MongoDB (strong consistency). AP: Cassandra, CouchDB, DynamoDB (eventual consistency). PACELC mở rộng: khi không có partition, chọn giữa latency và consistency.',
    },
    {
      stem: 'Load Balancer (Cân bằng tải) giải quyết vấn đề gì?',
      choices: [
        'Nén dữ liệu trước khi gửi đến client để tăng tốc',
        'Phân phối traffic đến nhiều server instance để tăng khả năng chịu tải và tính sẵn sàng cao',
        'Tự động sao lưu database mỗi giờ',
        'Mã hoá toàn bộ dữ liệu trong transit',
      ],
      answer: 1,
      explanation: 'Load Balancer: nằm trước server pool, phân phối request theo thuật toán: Round Robin (lần lượt), Least Connections (gửi đến server ít kết nối nhất), IP Hash (cùng client → cùng server — dùng cho session). Layer 4 LB: TCP/UDP level (nhanh). Layer 7 LB: HTTP/HTTPS level — routing dựa trên URL, header, cookie. Sticky sessions: giữ client gắn với 1 server (không scale tốt — nên dùng centralized session store như Redis thay thế). Health check: LB loại server unhealthy khỏi pool. AWS ELB, Nginx, HAProxy là các tool phổ biến.',
    },
    {
      stem: 'Domain-Driven Design (DDD) — "Bounded Context" là gì?',
      choices: [
        'Giới hạn số lượng domain object được phép tạo ra',
        'Ranh giới rõ ràng trong đó một model domain cụ thể có nghĩa nhất quán và một ngôn ngữ chung (Ubiquitous Language)',
        'Phạm vi địa lý mà hệ thống phục vụ',
        'Giới hạn kích thước cơ sở dữ liệu của mỗi service',
      ],
      answer: 1,
      explanation: 'DDD (Eric Evans 2003): Bounded Context = ranh giới nghiệp vụ nơi model và Ubiquitous Language nhất quán. Ví dụ: "Account" trong Banking Context (số dư, giao dịch) khác "Account" trong CRM Context (thông tin khách hàng). Ubiquitous Language: cùng từ ngữ giữa dev và domain expert — tránh translation. Aggregate: cluster entities + value objects, 1 Aggregate Root. Entity: có identity (ID duy nhất). Value Object: không có identity, bất biến (tiền tệ, địa chỉ). Context Map: sơ đồ quan hệ giữa các bounded contexts. Microservices thường align với bounded contexts.',
    },
    {
      stem: 'Caching (bộ nhớ đệm) chiến lược "Cache-Aside" (Lazy Loading) hoạt động như thế nào?',
      choices: [
        'Data luôn được ghi vào cache trước, sau đó ghi vào DB',
        'App đọc cache trước; nếu miss → đọc DB → ghi vào cache → trả kết quả',
        'Tất cả data được load vào cache khi khởi động ứng dụng',
        'Cache tự động sync với DB mọi thứ theo real-time',
      ],
      answer: 1,
      explanation: 'Cache-Aside (Lazy Loading): 1) Đọc cache → hit → return; miss → 2) đọc DB → 3) ghi cache → 4) return. Đơn giản, chỉ cache data thực sự cần. Nhược: cold start miss; cache có thể stale. Write-Through: ghi cache + DB đồng thời → luôn consistent nhưng chậm hơn. Write-Behind (Write-Back): ghi cache ngay, async ghi DB → nhanh nhưng risk mất data. Read-Through: cache layer xử lý DB fetch (app không biết). Cache Eviction: LRU (Least Recently Used — phổ biến nhất), LFU, TTL. Redis: in-memory key-value, hỗ trợ data structures (List, Set, SortedSet, Hash, Stream).',
    },
    {
      stem: 'API Gateway trong kiến trúc Microservices đóng vai trò gì?',
      choices: [
        'Database trung tâm chia sẻ giữa mọi microservice',
        'Điểm vào duy nhất (single entry point) cho client: routing, auth, rate limiting, load balancing, logging',
        'Message broker để các service giao tiếp bất đồng bộ',
        'Tool CI/CD để tự động deploy các microservice',
      ],
      answer: 1,
      explanation: 'API Gateway: pattern quan trọng trong microservices. Client gọi 1 endpoint → Gateway định tuyến đến service phù hợp. Chức năng: Authentication/Authorization (không phải mỗi service tự làm), Rate Limiting (throttle abuse), SSL Termination (decrypt HTTPS một lần), Request/Response transformation, Caching, Logging & Tracing, Circuit Breaker. Backend for Frontend (BFF): mỗi client type (mobile, web) có gateway riêng tối ưu cho đó. Tool: AWS API Gateway, Kong, NGINX, Traefik. Service Mesh (Istio, Linkerd): sidecar proxy — giao tiếp service-to-service, không phải client-to-service.',
    },
  ],
};
