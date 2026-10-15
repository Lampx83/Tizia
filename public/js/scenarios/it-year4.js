// ============================================================
// Trường CNTT — Scenarios Năm 4 (I4.1–I4.5)
// ============================================================
// Soạn theo chương trình Cử nhân CNTT/KHMT VN (UET, HUST, FPT…).
// Mỗi câu có explanation giải thích kỹ để sinh viên năm 4 tự học.
// 5 module × 10 câu = 50 câu hỏi.
// ============================================================

// ─── I4.1 · Kiến trúc phần mềm + Patterns ──────────────────
export const I41_QUIZ = {
  id: 'I4.1-se-arch-quiz',
  title: 'I4.1 · Kiến trúc phần mềm & Design Patterns — SOLID, GoF, Microservices',
  kind: 'quiz',
  yearLevel: 4, subject: 'kien-truc-phan-mem', difficulty: 4,
  skillsTrained: ['solid', 'design-patterns', 'microservices', 'clean-architecture', 'ddd'],
  questions: [
    {
      stem: 'Nguyên tắc "S" trong SOLID là Single Responsibility Principle (SRP). Phát biểu ĐÚNG của SRP là:',
      choices: [
        'Mỗi class chỉ được có 1 method',
        'Mỗi class chỉ nên có 1 lý do để thay đổi',
        'Mỗi class phải kế thừa từ 1 class cha duy nhất',
        'Mỗi module chỉ được import 1 dependency',
      ],
      answer: 1,
      explanation: 'SRP (Robert C. Martin): "A class should have only one reason to change" — mỗi class chịu trách nhiệm đúng 1 vấn đề nghiệp vụ. Ví dụ: class UserService xử lý logic user, KHÔNG kiêm gửi email — đó là EmailService. Vi phạm SRP khiến thay đổi 1 chức năng ảnh hưởng đến chức năng khác. SRP không giới hạn số method mà giới hạn cohesion (tính gắn kết) của class.',
    },
    {
      stem: 'Open/Closed Principle (OCP) phát biểu: phần mềm nên:',
      choices: [
        'Mở để sửa đổi, đóng để kế thừa',
        'Mở để mở rộng, đóng để sửa đổi',
        'Mở cho public access, đóng cho private access',
        'Mở source code, đóng binary',
      ],
      answer: 1,
      explanation: 'OCP (Bertrand Meyer, refinement by Martin): "Open for extension, Closed for modification." Bạn có thể thêm hành vi mới (extend) mà không cần sửa code hiện tại. Cách thực hiện: kế thừa (inheritance), composition, Strategy/Template Method pattern. Ví dụ: thêm payment method mới = implement interface IPayment mới, KHÔNG sửa PaymentProcessor cũ.',
    },
    {
      stem: 'Design Pattern nào thuộc nhóm Creational (tạo lập đối tượng)?',
      choices: [
        'Observer, Strategy, Command',
        'Adapter, Decorator, Facade',
        'Singleton, Factory Method, Abstract Factory, Builder, Prototype',
        'Composite, Iterator, Visitor',
      ],
      answer: 2,
      explanation: 'Gang of Four chia 23 pattern thành 3 nhóm:\n• Creational (5): Singleton, Factory Method, Abstract Factory, Builder, Prototype — quan tâm đến CÁCh TẠO đối tượng.\n• Structural (7): Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy — quan tâm đến CẤU TRÚC kết hợp.\n• Behavioral (11): Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor, Interpreter — quan tâm đến GIAO TIẾP giữa đối tượng.',
    },
    {
      stem: 'Observer Pattern giải quyết vấn đề gì?',
      choices: [
        'Tạo đối tượng mà không cần biết class cụ thể',
        'Cho phép nhiều đối tượng "quan sát" tự động nhận thông báo khi 1 đối tượng thay đổi',
        'Chuyển đổi interface không tương thích thành interface tương thích',
        'Cung cấp interface thống nhất cho tập hợp interface phức tạp',
      ],
      answer: 1,
      explanation: 'Observer (còn gọi Publish-Subscribe): Subject duy trì danh sách Observers; khi trạng thái Subject thay đổi, tự động notify tất cả Observers. Ví dụ thực tế: EventEmitter (Node.js), addEventListener (DOM), data binding (Angular/React). Dependency: Observer → Subject (yếu hơn gọi trực tiếp). Tránh vòng lặp nếu observer sửa subject trong callback.',
    },
    {
      stem: 'Dependency Injection (DI) là kỹ thuật thực hiện nguyên tắc nào trong SOLID?',
      choices: [
        'Single Responsibility Principle',
        'Open/Closed Principle',
        'Dependency Inversion Principle (DIP)',
        'Interface Segregation Principle (ISP)',
      ],
      answer: 2,
      explanation: 'DIP: "High-level modules should not depend on low-level modules; both should depend on abstractions." DI là cách hiện thực DIP: thay vì class A tự tạo dependency (new B()), dependency được inject từ ngoài (constructor injection, setter injection, interface injection). Lợi ích: dễ test (mock), loose coupling, dễ thay thế implementation. Spring/Angular DI framework tự động wire dependencies.',
    },
    {
      stem: 'Kiến trúc Microservices khác Monolithic ở điểm nào QUAN TRỌNG NHẤT?',
      choices: [
        'Microservices dùng ngôn ngữ lập trình khác với Monolithic',
        'Mỗi Microservice là process/container độc lập với DB riêng, giao tiếp qua API/message',
        'Microservices không có database, chỉ dùng cache',
        'Microservices chỉ chạy được trên Kubernetes',
      ],
      answer: 1,
      explanation: 'Microservices: mỗi service (User, Order, Payment…) là unit triển khai độc lập — có thể scale, deploy, fail riêng — và có DB riêng (Database-per-service). Giao tiếp: REST/gRPC (synchronous) hoặc message queue (async). Ưu điểm: scale lẻ service, đa ngôn ngữ (polyglot), deploy độc lập. Nhược điểm: distributed systems complexity (network latency, saga pattern, distributed tracing). Monolithic đơn giản hơn nhưng scale kém.',
    },
    {
      stem: 'CQRS (Command Query Responsibility Segregation) tách biệt điều gì?',
      choices: [
        'Tách front-end và back-end',
        'Tách lệnh ghi (Command) và lệnh đọc (Query) thành các model/luồng riêng',
        'Tách code production và code test',
        'Tách authentication và authorization',
      ],
      answer: 1,
      explanation: 'CQRS (Greg Young): Command = thay đổi state (write); Query = truy vấn state (read). Tách riêng → mỗi bên tối ưu riêng: Command side dùng domain model phức tạp; Query side dùng read model phẳng (denormalized) cho hiệu năng cao. Kết hợp với Event Sourcing: mọi thay đổi là sự kiện bất biến → có thể replay lịch sử. Hữu ích với hệ thống đọc nhiều hơn ghi (read-heavy).',
    },
    {
      stem: 'Domain-Driven Design (DDD) — Bounded Context là gì?',
      choices: [
        'Giới hạn kích thước của database',
        'Phạm vi rõ ràng trong đó một mô hình domain nhất định có ý nghĩa và nhất quán',
        'Tường lửa bảo mật giữa các microservices',
        'Số lượng tối đa request mỗi context được xử lý',
      ],
      answer: 1,
      explanation: 'Bounded Context (Eric Evans, DDD): ranh giới ngữ nghĩa rõ ràng — trong đó Ubiquitous Language và domain model là nhất quán. Ví dụ: "Customer" trong Billing Context có thuộc tính payment_plan; trong Shipping Context chỉ có địa chỉ. Hai context dùng cùng tên nhưng ý nghĩa khác → tách biệt model. Context Map mô tả quan hệ giữa Bounded Contexts (Shared Kernel, Customer-Supplier, Anti-Corruption Layer).',
    },
    {
      stem: 'Clean Architecture (Robert C. Martin) — Tầng nào không được phụ thuộc vào framework hay database?',
      choices: [
        'Interface Adapters (Controllers, Presenters)',
        'Frameworks & Drivers (Database, Web)',
        'Entities (Business Rules) và Use Cases',
        'Infrastructure Layer',
      ],
      answer: 2,
      explanation: 'Clean Architecture: quy tắc phụ thuộc (Dependency Rule) — code chỉ trỏ vào trong (inward). Entities = enterprise business rules; Use Cases = application business rules. Cả hai KHÔNG phụ thuộc vào framework, DB, UI. Interface Adapters chuyển đổi data. Frameworks & Drivers ở ngoài cùng. Lợi ích: business logic độc lập, dễ test, dễ thay database hay web framework.',
    },
    {
      stem: 'API Gateway trong kiến trúc Microservices đóng vai trò gì?',
      choices: [
        'Cơ sở dữ liệu trung tâm cho tất cả services',
        'Điểm vào duy nhất cho clients: routing, authentication, rate limiting, load balancing',
        'Công cụ CI/CD tự động deploy services',
        'Service registry để services tìm thấy nhau',
      ],
      answer: 1,
      explanation: 'API Gateway (pattern): single entry point — client chỉ gọi 1 endpoint thay vì biết địa chỉ từng microservice. Nhiệm vụ: route request đến service đúng, xác thực JWT/OAuth, rate limiting (chống DDoS), SSL termination, load balancing, response aggregation (gộp nhiều service call). Ví dụ: AWS API Gateway, Kong, NGINX. Khác với Service Mesh (Istio) — mesh xử lý service-to-service traffic.',
    },
  ],
};

// ─── I4.2 · Điện toán đám mây (AWS/GCP) ────────────────────
export const I42_QUIZ = {
  id: 'I4.2-cloud-quiz',
  title: 'I4.2 · Điện toán đám mây — IaaS/PaaS/SaaS, AWS, Container, Kubernetes',
  kind: 'quiz',
  yearLevel: 4, subject: 'dam-may', difficulty: 4,
  skillsTrained: ['cloud-model', 'aws', 'container', 'kubernetes', 'serverless', 'iac'],
  questions: [
    {
      stem: 'Phân biệt IaaS, PaaS, SaaS: nhà cung cấp quản lý đến tầng nào trong SaaS?',
      choices: [
        'Chỉ phần cứng (hardware) và network',
        'Phần cứng, OS, middleware, runtime — người dùng quản lý application và data',
        'Toàn bộ stack kể cả application — người dùng chỉ dùng phần mềm qua browser',
        'Người dùng tự quản lý tất cả',
      ],
      answer: 2,
      explanation: 'Phân tầng quản lý:\n• IaaS (EC2, GCE): Cloud quản lý hardware/network; bạn quản lý OS → App.\n• PaaS (App Engine, Heroku): Cloud quản lý đến runtime; bạn chỉ lo App + Data.\n• SaaS (Gmail, Salesforce, Office 365): Cloud quản lý TẤT CẢ — người dùng chỉ dùng ứng dụng qua trình duyệt/app. Quy tắc: càng lên cao, ít quản lý nhưng cũng ít linh hoạt hơn.',
    },
    {
      stem: 'Amazon S3 (Simple Storage Service) là loại lưu trữ gì?',
      choices: [
        'Block storage (tương đương ổ đĩa vật lý)',
        'File storage (hệ thống file phân tán)',
        'Object storage (key-value với metadata, HTTP API)',
        'In-memory cache',
      ],
      answer: 2,
      explanation: 'S3 = Object Storage: dữ liệu lưu dưới dạng object (blob + metadata + unique key). Truy cập qua HTTP REST API (GET/PUT/DELETE). Không có khái niệm thư mục thực — prefix/delimiter mô phỏng thư mục. Đặc điểm: eventually consistent (write-then-read mới nhất), durability 99.999999999% (11 nines), thanh toán theo GB + request. Dùng: static website, backup, data lake, CDN origin. Block storage = EBS (gắn vào EC2 như ổ cứng).',
    },
    {
      stem: 'AWS Lambda là dịch vụ thuộc mô hình nào?',
      choices: [
        'IaaS — Infrastructure as a Service',
        'CaaS — Container as a Service',
        'Serverless / FaaS — Function as a Service',
        'DBaaS — Database as a Service',
      ],
      answer: 2,
      explanation: 'Serverless/FaaS: bạn chỉ viết function (handler), không quản lý server, OS, hay scaling. Lambda tự scale từ 0 → hàng nghìn concurrent invocations. Billing: per invocation + GB-second (thời gian × memory). Giới hạn: max 15 phút/invocation, cold start latency (khởi động lạnh). Dùng cho: event-driven (API Gateway trigger, S3 event, DynamoDB stream), ETL nhẹ, cron job. Tương đương: Google Cloud Functions, Azure Functions.',
    },
    {
      stem: 'Docker container khác Virtual Machine (VM) ở điểm nào CỐT LÕI?',
      choices: [
        'Container không chạy được trên Linux, VM thì chạy được',
        'Container chia sẻ kernel của host OS, VM có OS riêng qua hypervisor',
        'VM nhẹ hơn container và khởi động nhanh hơn',
        'Container không thể cài thêm phần mềm, VM thì được',
      ],
      answer: 1,
      explanation: 'VM: hypervisor (VMware, KVM, VirtualBox) ảo hoá phần cứng → mỗi VM chạy OS riêng (GB). Container (Docker): chia sẻ kernel host → cô lập bằng Linux namespaces + cgroups — nhẹ hơn (MB), khởi động nhanh hơn (giây vs phút). Đánh đổi: container cô lập yếu hơn VM (cùng kernel). Docker image = read-only layers; container = image + writable layer. Dockerfile mô tả cách build image.',
    },
    {
      stem: 'Kubernetes (K8s) — Pod là gì?',
      choices: [
        'Tên gọi khác của Docker container',
        'Đơn vị triển khai nhỏ nhất trong K8s: 1 hoặc nhiều container chia sẻ network và storage',
        'Cụm máy chủ vật lý chạy K8s',
        'Load balancer trong K8s',
      ],
      answer: 1,
      explanation: 'Pod = đơn vị scheduling nhỏ nhất của K8s. Pod chứa ≥1 container dùng chung: IP address, localhost, và volumes. Container trong 1 Pod giao tiếp qua localhost (không qua mạng). Thường 1 Pod = 1 container chính (app) + sidecar (log agent, proxy). Pod là ephemeral — nếu chết, ReplicaSet tạo Pod mới (IP khác). Để expose stable endpoint: dùng Service. Deployment quản lý ReplicaSet → quản lý Pod.',
    },
    {
      stem: 'Infrastructure as Code (IaC) — Terraform khác AWS CloudFormation ở điểm nào?',
      choices: [
        'Terraform miễn phí, CloudFormation mất phí',
        'Terraform là declarative, CloudFormation là imperative',
        'Terraform multi-cloud (AWS, GCP, Azure…), CloudFormation chỉ AWS',
        'CloudFormation hỗ trợ nhiều ngôn ngữ hơn Terraform',
      ],
      answer: 2,
      explanation: 'IaC: mô tả hạ tầng trong code → version control, reproducible. Terraform (HashiCorp): cloud-agnostic — dùng providers cho AWS/GCP/Azure/on-prem. State file (.tfstate) lưu trạng thái thực tế. CloudFormation: native AWS, YAML/JSON template, miễn phí nhưng chỉ AWS. Cả hai đều declarative (mô tả desired state, tool tính diff). Ansible/Chef/Puppet = imperative configuration management. CDK (AWS) cho phép viết TypeScript/Python thay YAML → tạo CloudFormation template.',
    },
    {
      stem: 'Auto Scaling trong cloud giải quyết vấn đề gì?',
      choices: [
        'Tự động backup dữ liệu theo lịch',
        'Tự động tăng/giảm số lượng server dựa trên tải, đảm bảo hiệu năng và tiết kiệm chi phí',
        'Tự động cập nhật OS và phần mềm',
        'Tự động phát hiện và sửa lỗi code',
      ],
      answer: 1,
      explanation: 'Auto Scaling (AWS EC2 Auto Scaling, K8s HPA/VPA): theo dõi metrics (CPU, request count, custom) → scale out (thêm instance) khi tải cao, scale in (bớt instance) khi tải thấp. Lợi ích: high availability (luôn đủ capacity) + cost efficiency (không trả tiền instance dư thừa). Cấu hình: min/max/desired capacity, cooldown period, scaling policy. Kết hợp Load Balancer để phân phối traffic đều.',
    },
    {
      stem: 'CDN (Content Delivery Network) cải thiện hiệu năng bằng cách nào?',
      choices: [
        'Nén dữ liệu trước khi gửi đến người dùng',
        'Cache nội dung tĩnh ở các edge node gần người dùng địa lý, giảm latency',
        'Mã hoá tất cả traffic để tăng tốc độ',
        'Tăng băng thông đường truyền chính',
      ],
      answer: 1,
      explanation: 'CDN (CloudFront, Cloudflare, Akamai): mạng lưới PoP (Points of Presence) toàn cầu. Khi user request, edge node gần nhất phục vụ từ cache — thay vì đi về origin server. Giảm: latency (RTT), tải origin, băng thông. Nội dung cache: static (image, CSS, JS, video). Dynamic content: CDN vẫn hữu ích (TCP connection tối ưu, anycast routing). Cache invalidation khi nội dung thay đổi. TTL (Time To Live) kiểm soát thời gian cache.',
    },
    {
      stem: 'CAP Theorem trong hệ thống phân tán phát biểu:',
      choices: [
        'Hệ thống phân tán luôn đảm bảo cả 3: Consistency, Availability, Partition tolerance',
        'Chỉ chọn được tối đa 2 trong 3: Consistency (C), Availability (A), Partition tolerance (P)',
        'CAP chỉ áp dụng cho database quan hệ, không áp dụng NoSQL',
        'Partition tolerance là bắt buộc; phải chọn C hoặc A khi có network partition',
      ],
      answer: 3,
      explanation: 'CAP (Brewer 2000): trong hệ thống phân tán thực tế, network partition (P) là điều không tránh được → PHẢI chấp nhận P. Câu hỏi thực sự: khi có partition, chọn C hay A?\n• CP (chọn C): trả lời error thay vì dữ liệu stale (HBase, Zookeeper, MongoDB với strong consistency).\n• AP (chọn A): trả lời dữ liệu có thể không mới nhất (Cassandra, DynamoDB, CouchDB).\nPHÁT BIỂU A là cách phổ thông nhưng không chính xác — P không phải "chọn", nên câu D mới đúng.',
    },
    {
      stem: 'SLA (Service Level Agreement) 99.9% uptime tương đương bao nhiêu downtime/năm?',
      choices: [
        '~ 8,7 giờ/năm',
        '~ 52 phút/năm',
        '~ 5 phút/năm',
        '~ 1 phút/năm',
      ],
      answer: 0,
      explanation: 'Tính: 1 năm ≈ 365 × 24 = 8760 giờ. Downtime cho phép = 8760 × (1 - 0.999) = 8,76 giờ ≈ 8 giờ 46 phút/năm.\n• 99.9% (three nines): ~8,7 giờ/năm\n• 99.99% (four nines): ~52 phút/năm\n• 99.999% (five nines): ~5,3 phút/năm — mức target cho hệ thống mission-critical.\nCloud providers thường cam kết 99.9%–99.99%. Để đạt 5 nines cần kiến trúc redundant, failover tự động, multi-AZ/multi-region.',
    },
  ],
};

// ─── I4.3 · Khoa học dữ liệu ────────────────────────────────
export const I43_QUIZ = {
  id: 'I4.3-data-science-quiz',
  title: 'I4.3 · Khoa học dữ liệu — Pipeline, Overfitting, Đánh giá mô hình, Clustering',
  kind: 'quiz',
  yearLevel: 4, subject: 'data-science', difficulty: 4,
  skillsTrained: ['data-pipeline', 'feature-engineering', 'model-evaluation', 'clustering', 'ensemble'],
  questions: [
    {
      stem: 'Overfitting (quá khớp) xảy ra khi:',
      choices: [
        'Mô hình có training error cao và test error cao',
        'Mô hình có training error thấp nhưng test error cao — học thuộc lòng training data',
        'Mô hình quá đơn giản không nắm bắt được pattern',
        'Dataset quá nhỏ không đủ train',
      ],
      answer: 1,
      explanation: 'Overfitting: mô hình "nhớ" training data (kể cả nhiễu) → training error rất thấp nhưng generalize kém (test error cao). Nguyên nhân: mô hình quá phức tạp (nhiều tham số) so với dữ liệu. Dấu hiệu: gap lớn giữa train/val accuracy. Giải pháp: regularization (L1/L2), dropout (neural net), early stopping, cross-validation, thêm dữ liệu, giảm model complexity. Underfitting: ngược lại — mô hình quá đơn giản, cả train và test error đều cao.',
    },
    {
      stem: 'K-Fold Cross Validation (k=5) hoạt động như thế nào?',
      choices: [
        'Chia data thành 5 phần, train 5 lần (mỗi lần 1 phần làm validation, 4 phần làm train), lấy trung bình metric',
        'Train mô hình 5 lần với 5 thuật toán khác nhau rồi chọn tốt nhất',
        'Chia data: 50% train, 50% test, lặp 5 lần',
        'Tăng data 5 lần bằng data augmentation',
      ],
      answer: 0,
      explanation: 'k-Fold CV: chia data thành k phần (fold) bằng nhau. Lặp k lần: mỗi lần 1 fold = validation set, k-1 fold còn lại = training set. Metric cuối = trung bình k lần. Ưu điểm: dùng TẤT CẢ data để train và validate → ước lượng generalization chính xác hơn hold-out. k=5 hoặc 10 phổ biến. Stratified k-Fold: giữ tỉ lệ class trong mỗi fold — dùng khi imbalanced. Leave-One-Out CV (LOOCV): k = n, computationally expensive.',
    },
    {
      stem: 'Precision và Recall — khi nào ưu tiên Precision cao hơn Recall?',
      choices: [
        'Khi false negative (bỏ sót positive) tốn kém — ví dụ bỏ sót bệnh nhân ung thư',
        'Khi false positive (cảnh báo nhầm) tốn kém — ví dụ spam filter block nhầm email quan trọng',
        'Khi dataset cân bằng (balanced)',
        'Precision và Recall luôn phải bằng nhau',
      ],
      answer: 1,
      explanation: 'Precision = TP/(TP+FP): trong những gì mô hình dự đoán là Positive, bao nhiêu phần trăm thực sự là Positive. Recall = TP/(TP+FN): trong tất cả Positive thực sự, mô hình tìm được bao nhiêu phần trăm.\n• Ưu tiên Precision khi FP tốn kém: spam filter (block nhầm email quan trọng), cảnh báo giả làm phiền user.\n• Ưu tiên Recall khi FN tốn kém: phát hiện ung thư (bỏ sót bệnh nhân = nguy hiểm), phát hiện gian lận.\nF1-Score = harmonic mean(P, R) dùng khi cần cân bằng cả hai.',
    },
    {
      stem: 'Thuật toán K-Means Clustering có giới hạn quan trọng nào?',
      choices: [
        'Chỉ hoạt động với dữ liệu văn bản',
        'Phải biết trước số cụm K và nhạy với điểm khởi tạo ngẫu nhiên; giả định cụm hình cầu',
        'Không thể xử lý dữ liệu hơn 1000 điểm',
        'Luôn cho kết quả tối ưu toàn cục',
      ],
      answer: 1,
      explanation: 'K-Means giới hạn:\n1. Phải chọn K trước (dùng Elbow Method hoặc Silhouette Score để ước lượng).\n2. Nhạy với khởi tạo tâm cụm (local optimum) → dùng K-Means++ để khởi tạo thông minh.\n3. Giả định cụm hình cầu (spherical), kích thước tương đương → không phù hợp cụm dạng lưỡi liềm hay mật độ khác nhau.\n4. Nhạy với outlier (centroid bị kéo lệch).\nGiải pháp: DBSCAN (density-based, tự phát hiện K, xử lý outlier), Gaussian Mixture Model (mềm dẻo hơn về hình dạng).',
    },
    {
      stem: 'Feature Engineering — One-Hot Encoding dùng để làm gì?',
      choices: [
        'Chuẩn hoá feature về phạm vi [0, 1]',
        'Chuyển categorical variable (tên, màu sắc…) thành vector nhị phân 0/1',
        'Loại bỏ các feature có phương sai thấp',
        'Điền giá trị missing bằng mean/median',
      ],
      answer: 1,
      explanation: 'One-Hot Encoding: biến categorical (ví dụ màu: Đỏ/Xanh/Vàng) → k cột nhị phân (k = số giá trị). Ví dụ: Đỏ=[1,0,0], Xanh=[0,1,0], Vàng=[0,0,1]. Tránh dùng Label Encoding (Đỏ=0, Xanh=1, Vàng=2) cho nominal data vì ngầm tạo thứ tự (ordinal). Vấn đề: tăng chiều (curse of dimensionality) nếu cardinality cao → dùng Target Encoding, Embedding, hoặc Binary Encoding thay thế.',
    },
    {
      stem: 'Random Forest là phương pháp ensemble nào?',
      choices: [
        'Boosting — các cây học tuần tự, cây sau sửa lỗi cây trước',
        'Bagging (Bootstrap Aggregating) — nhiều cây độc lập, dự đoán bằng vote/average',
        'Stacking — dùng model khác học từ output của nhiều model',
        'Pruning — cắt bớt cây quyết định để giảm overfitting',
      ],
      answer: 1,
      explanation: 'Random Forest = Bagging + Feature Randomness:\n• Bagging: train N cây độc lập trên N bootstrap sample (sampling with replacement).\n• Feature Randomness: mỗi split chỉ xem xét subset ngẫu nhiên của features → giảm correlation giữa cây → variance thấp hơn.\nDự đoán: vote đa số (classification) hoặc trung bình (regression). Ưu điểm: robust với outlier, không cần scaling, feature importance built-in. Nhược điểm: không giải thích được từng quyết định, chậm hơn 1 cây. Boosting (XGBoost, LightGBM): cây học tuần tự, mạnh hơn nhưng dễ overfit hơn.',
    },
    {
      stem: 'Trong pipeline xử lý dữ liệu, bước nào phải được fit TRÊN TRAINING SET rồi transform CÙNG CÁCH trên test set?',
      choices: [
        'Data collection',
        'Chuẩn hoá (StandardScaler, MinMaxScaler) và Imputation',
        'Train/test split',
        'Evaluation (tính accuracy, F1)',
      ],
      answer: 1,
      explanation: 'Data leakage: nếu fit scaler/imputer trên toàn bộ data (kể cả test), thông tin test set "rỉ" vào training → đánh giá mô hình lạc quan giả tạo. Đúng: fit StandardScaler chỉ trên X_train → dùng transform() (không fit lại) trên X_test. Tương tự: imputer, encoder. Scikit-learn Pipeline đảm bảo điều này: Pipeline.fit(X_train) chỉ fit các bước transform trên training data; predict/transform trên test data dùng thống số đã học.',
    },
    {
      stem: 'PCA (Principal Component Analysis) dùng để làm gì?',
      choices: [
        'Tăng số chiều (dimension) của dataset để model học tốt hơn',
        'Giảm số chiều bằng cách tìm các hướng biến thiên lớn nhất (principal components)',
        'Phân cụm dữ liệu không có nhãn',
        'Tăng tốc tính toán bằng cách loại bỏ outlier',
      ],
      answer: 1,
      explanation: 'PCA (Dimensionality Reduction): tìm k hướng (eigenvectors của ma trận hiệp phương sai) giải thích nhiều variance nhất → chiếu data lên k chiều này (k << p ban đầu). Giúp: giảm curse of dimensionality, loại noise, visualize (k=2/3), tăng tốc training. Mất thông tin (lossy) → chọn k sao cho giải thích ≥95% variance (cumulative explained variance ratio). Hạn chế: linear, không tốt nếu data có pattern phi tuyến (dùng t-SNE, UMAP để visualize).',
    },
    {
      stem: 'A/B Testing trong data science — điều kiện nào CẦN ĐỦ để kết luận nhóm B tốt hơn A?',
      choices: [
        'Metric của B cao hơn A dù chỉ 0,01%',
        'p-value < 0.05 và sample size đủ lớn (statistical power ≥ 80%)',
        'Test chạy ít nhất 7 ngày bất kể sample size',
        'Chỉ cần tỉ lệ conversion của B > A',
      ],
      answer: 1,
      explanation: 'A/B Test đúng chuẩn cần:\n1. Randomization: người dùng phân ngẫu nhiên vào A/B.\n2. p-value < α (thường 0.05): xác suất quan sát được kết quả này nếu không có sự khác biệt thực (H₀) < 5%.\n3. Statistical power ≥ 80%: xác suất phát hiện sự khác biệt thực khi tồn tại.\n4. Sample size đủ (tính trước bằng power analysis).\n5. Chạy đủ thời gian (tránh novelty effect). Peeking problem: nhìn kết quả liên tục và dừng sớm → p-value không còn đáng tin.',
    },
    {
      stem: 'CRISP-DM (Cross-Industry Standard Process for Data Mining) gồm bao nhiêu pha theo thứ tự?',
      choices: [
        '3 pha: Collect → Model → Deploy',
        '5 pha: Define → Measure → Analyze → Improve → Control',
        '6 pha: Business Understanding → Data Understanding → Data Preparation → Modeling → Evaluation → Deployment',
        '4 pha: Explore → Hypothesize → Experiment → Scale',
      ],
      answer: 2,
      explanation: 'CRISP-DM (1996): phương pháp luận data mining/science phổ biến nhất:\n1. Business Understanding: hiểu bài toán kinh doanh, xác định mục tiêu.\n2. Data Understanding: thu thập, khám phá (EDA), đánh giá chất lượng data.\n3. Data Preparation: làm sạch, feature engineering, format.\n4. Modeling: chọn thuật toán, train, tune hyperparameter.\n5. Evaluation: đánh giá theo tiêu chí kinh doanh (không chỉ accuracy).\n6. Deployment: đưa model vào production, monitoring.\nCRISP-DM là vòng lặp — thường quay lại bước trước khi phát hiện vấn đề.',
    },
  ],
};

// ─── I4.4 · Blockchain & Web3 ───────────────────────────────
export const I44_QUIZ = {
  id: 'I4.4-blockchain-quiz',
  title: 'I4.4 · Blockchain & Web3 — Consensus, Smart Contract, DeFi, NFT',
  kind: 'quiz',
  yearLevel: 4, subject: 'block-chain', difficulty: 4,
  skillsTrained: ['blockchain', 'consensus', 'smart-contract', 'ethereum', 'defi', 'web3'],
  questions: [
    {
      stem: 'Tính chất CỐT LÕI phân biệt Blockchain với database thông thường là:',
      choices: [
        'Blockchain nhanh hơn database quan hệ nhiều lần',
        'Blockchain lưu dữ liệu phân tán, bất biến (immutable) và không cần tin tưởng bên thứ 3 (trustless)',
        'Blockchain chỉ lưu được dữ liệu tài chính',
        'Blockchain không cần internet để hoạt động',
      ],
      answer: 1,
      explanation: 'Blockchain: chuỗi khối (block) nối nhau bằng hash — mỗi block chứa hash block trước → thay đổi 1 block làm vô hiệu toàn bộ chuỗi sau. Đặc điểm:\n• Phân tán (decentralized): nhiều node giữ bản sao → không có single point of failure.\n• Bất biến (immutable): đã ghi không sửa được.\n• Trustless: không cần tin bên trung gian — quy tắc được đảm bảo bởi code và toán học.\nĐánh đổi: throughput thấp (Bitcoin ~7 TPS vs Visa ~24,000 TPS), latency cao, tiêu hao năng lượng (PoW).',
    },
    {
      stem: 'Proof of Work (PoW) — Bitcoin sử dụng cơ chế đồng thuận nào để thêm block mới?',
      choices: [
        'Node có nhiều coin nhất được thêm block',
        'Miner giải bài toán hash khó (tìm nonce sao cho hash block < target) — tốn tính toán nhưng dễ verify',
        'Tất cả node biểu quyết — đa số thắng',
        'Node đầu tiên đề xuất block được chấp thuận',
      ],
      answer: 1,
      explanation: 'PoW (Nakamoto Consensus): miner cạnh tranh tìm nonce sao cho SHA-256(block_header + nonce) < target_difficulty. Xác suất thắng tỉ lệ với hash rate (sức mạnh tính toán). Block time Bitcoin ~10 phút, difficulty tự điều chỉnh 2 tuần/lần. Ưu điểm: battle-tested (15 năm), Sybil-resistant. Nhược điểm: tốn năng lượng cực lớn (≈ điện của Argentina), mining pool tập trung hoá. Ethereum chuyển sang PoS (The Merge 9/2022) tiết kiệm 99.95% năng lượng.',
    },
    {
      stem: 'Smart Contract trên Ethereum là gì?',
      choices: [
        'Hợp đồng pháp lý điện tử có chữ ký số',
        'Chương trình tự thực thi trên blockchain khi điều kiện được thoả mãn, không thể thay đổi sau khi deploy',
        'Giao diện người dùng của ứng dụng DeFi',
        'Thuật toán mã hoá bảo vệ giao dịch',
      ],
      answer: 1,
      explanation: 'Smart Contract (Nick Szabo 1994, Ethereum triển khai): đoạn code chạy trên EVM (Ethereum Virtual Machine) — deterministic, không cần bên thứ 3. Viết bằng Solidity/Vyper, compile → EVM bytecode → deploy lên blockchain. Sau deploy: immutable (địa chỉ contract cố định, code không đổi). Thực thi: gọi function = gửi transaction, trả gas fee. Ứng dụng: token ERC-20/ERC-721, DEX (Uniswap), lending (Aave), DAO. Rủi ro: bug không sửa được (DAO hack 2016 mất $60M).',
    },
    {
      stem: 'DeFi (Decentralized Finance) — Automated Market Maker (AMM) như Uniswap hoạt động theo cơ chế nào?',
      choices: [
        'Order book tập trung như sàn giao dịch truyền thống',
        'Công thức x × y = k: liquidity pool 2 token, giá tự điều chỉnh theo tỉ lệ trong pool',
        'Người dùng đặt giá mua/bán, khớp lệnh tự động',
        'Giá tham chiếu từ sàn Binance qua oracle',
      ],
      answer: 1,
      explanation: 'AMM Constant Product Formula: pool chứa token A (x) và token B (y). Invariant: x × y = k (hằng số). Khi mua A, thêm B vào pool → x giảm, y tăng → giá A tính bằng dy/dx. Không cần order book hay counterparty — LP (Liquidity Provider) gửi cặp token vào pool nhận fee. Slippage: giao dịch lớn làm dịch chuyển giá nhiều hơn. Impermanent Loss: giá 2 token thay đổi khác nhau khiến LP mất so với giữ. Uniswap v3: concentrated liquidity để LP chọn price range.',
    },
    {
      stem: 'NFT (Non-Fungible Token) khác token ERC-20 thông thường ở điểm nào?',
      choices: [
        'NFT không chạy được trên Ethereum, ERC-20 thì chạy được',
        'NFT là duy nhất (unique), không thể chia nhỏ, không hoán đổi tương đương (non-fungible); ERC-20 có thể hoán đổi 1:1',
        'NFT không có giá trị tài chính, ERC-20 thì có',
        'NFT miễn phí mint, ERC-20 phải trả phí',
      ],
      answer: 1,
      explanation: 'Fungible (hoán đổi được): 1 ETH = 1 ETH bất kỳ. Non-Fungible: mỗi NFT có token ID duy nhất — khác nhau về nội dung/metadata. Chuẩn ERC-721 (Ethereum): mint NFT, transferOwnership, tokenURI (link metadata). ERC-1155: multi-token (fungible + non-fungible trong 1 contract). NFT lưu: token ID + owner trên chain; thường metadata (image) lưu trên IPFS (không trên chain — tốn kém). Ứng dụng: digital art, gaming items, music rights, domain name (ENS).',
    },
    {
      stem: 'Wallet (ví) trong blockchain — Private Key có vai trò gì?',
      choices: [
        'Mật khẩu để đăng nhập vào ứng dụng DApp',
        'Khoá bí mật dùng để ký giao dịch; ai có private key = chủ sở hữu tài sản',
        'Địa chỉ công khai để nhận coin',
        'Mã pin ATM để rút tiền',
      ],
      answer: 1,
      explanation: 'Cặp khoá bất đối xứng (ECDSA secp256k1):\n• Private Key: 256-bit số ngẫu nhiên — KÝ giao dịch. TUYỆT ĐỐI KHÔNG chia sẻ.\n• Public Key → hash → Address (0x…): nhận token. Chia sẻ được.\nGiao dịch: ký bằng private key → network verify bằng public key. Không có server lưu private key — "Not your keys, not your coins." Mnemonic (seed phrase 12/24 từ): tạo ra private keys theo chuẩn BIP-39/BIP-44. Mất private key = mất tài sản vĩnh viễn. Hardware wallet (Ledger): lưu private key offline.',
    },
    {
      stem: 'Gas trong Ethereum là gì và tại sao cần?',
      choices: [
        'Token đặc biệt dùng để mua NFT',
        'Đơn vị đo lường tính toán; người dùng trả ETH = Gas × Gas Price để bù đắp cho validator',
        'Phí rút tiền về ngân hàng',
        'Lãi suất vay trong DeFi',
      ],
      answer: 1,
      explanation: 'Gas: đơn vị đo workload tính toán trên EVM (mỗi opcode có gas cost). Gas Limit: tối đa gas user sẵn lòng dùng. Gas Price (Gwei): giá user trả mỗi đơn vị gas. Phí = Gas Used × Gas Price. EIP-1559: Base Fee (burn) + Priority Fee (tip cho validator). Khi network tắc nghẽn → gas price tăng (auction). Layer 2 (Arbitrum, Optimism, zkSync): xử lý tx ngoài mainnet → gas rẻ hơn 10-100x. Gas limit bảo vệ chống vòng lặp vô tận trong smart contract (Halting Problem).',
    },
    {
      stem: 'Web3 khác Web2 ở điểm nào cơ bản nhất?',
      choices: [
        'Web3 chỉ dùng giao thức HTTP/3, Web2 dùng HTTP/2',
        'Web3 ứng dụng chạy trên blockchain (permissionless, user own data); Web2 tập trung ở server công ty',
        'Web3 không có giao diện người dùng, chỉ có API',
        'Web3 nhanh hơn và rẻ hơn Web2',
      ],
      answer: 1,
      explanation: 'Web1 (read-only) → Web2 (read-write, user-generated content: Facebook, Google — nhưng tập trung hoá) → Web3 (read-write-own):\n• Ownership: user sở hữu data và tài sản số (qua private key) thay vì công ty.\n• Permissionless: ai cũng có thể tham gia không cần xin phép.\n• Trustless: quy tắc được code (smart contract) đảm bảo.\n• Phân tán: không có điểm tắt/censorship duy nhất.\nThách thức Web3: UX phức tạp, scalability kém, regulatory uncertainty, smart contract bugs.',
    },
    {
      stem: 'Merkle Tree trong Bitcoin dùng để làm gì?',
      choices: [
        'Lưu trữ private key của miner',
        'Tổ chức giao dịch trong block; Merkle Root tóm tắt tất cả tx — cho phép verify giao dịch hiệu quả (SPV)',
        'Thuật toán mã hoá dữ liệu người dùng',
        'Cấu trúc quản lý địa chỉ ví',
      ],
      answer: 1,
      explanation: 'Merkle Tree (hash tree): leaf = hash(tx); parent = hash(left_child + right_child); root = Merkle Root (32 bytes). Merkle Root được lưu trong block header → đại diện toàn bộ tập transactions. Tính chất: thay đổi bất kỳ tx → Merkle Root thay đổi. SPV (Simplified Payment Verification): node nhẹ (mobile) chỉ tải block headers (80 bytes/block thay vì toàn block ~1MB) + Merkle proof để verify giao dịch cụ thể — không cần tải toàn bộ blockchain. Cũng dùng trong Git (blob tree), IPFS, Certificate Transparency.',
    },
    {
      stem: 'DAO (Decentralized Autonomous Organization) hoạt động theo nguyên tắc nào?',
      choices: [
        'Công ty truyền thống với CEO và hội đồng quản trị',
        'Tổ chức quản trị qua smart contract và token voting: holder bỏ phiếu quyết định, code thực thi tự động',
        'Tổ chức phi lợi nhuận được chính phủ cấp phép',
        'Mạng xã hội phi tập trung',
      ],
      answer: 1,
      explanation: 'DAO: tổ chức không có ban quản trị truyền thống. Token holder (governance token) đề xuất và bỏ phiếu thay đổi giao thức/sử dụng treasury. Smart contract thực thi quyết định tự động sau khi đạt ngưỡng. Ví dụ: MakerDAO (quản trị stablecoin DAI), Uniswap DAO (quản trị protocol), Gitcoin (tài trợ open source). Thách thức: voter apathy (ít người bỏ phiếu), plutocracy (whale kiểm soát), smart contract bug (DAO hack 2016). Quadratic voting: giảm ảnh hưởng của whale.',
    },
  ],
};

// ─── I4.5 · Khoá luận CNTT ──────────────────────────────────
export const I45_QUIZ = {
  id: 'I4.5-thesis-quiz',
  title: 'I4.5 · Khoá luận CNTT — Phương pháp nghiên cứu & bảo vệ đề tài',
  kind: 'quiz',
  yearLevel: 4, subject: 'khoa-luan-it', difficulty: 4,
  skillsTrained: ['research-methodology', 'academic-writing', 'thesis-defense', 'scientific-thinking', 'research-ethics'],
  questions: [
    {
      stem: 'Câu hỏi nghiên cứu (Research Question) tốt trong khoá luận CNTT cần đáp ứng tiêu chí gì?',
      choices: [
        'Phải liên quan đến AI và Machine Learning',
        'Phải có tính cụ thể, khả thi, có thể đo lường và chưa được giải quyết đầy đủ trong literature',
        'Phải được phê duyệt bởi Bộ Giáo dục và Đào tạo',
        'Phải có ít nhất 50 tài liệu tham khảo trước khi đặt câu hỏi',
      ],
      answer: 1,
      explanation: 'Câu hỏi nghiên cứu tốt cần: (1) Specific — đủ hẹp để trả lời được; (2) Researchable — có thể thu thập dữ liệu/bằng chứng; (3) Feasible — trong khả năng về thời gian, kỹ năng, nguồn lực của sinh viên đại học; (4) Novel — đóng góp mới so với literature. Ví dụ tốt: "BERT có độ chính xác tốt hơn BiLSTM trong phân loại cảm xúc tiếng Việt trên dataset UIT-VSFC không?" — cụ thể, đo được, khả thi.',
    },
    {
      stem: 'Trong lĩnh vực CNTT, nguồn tài liệu tham khảo học thuật UY TÍN nhất để dùng trong khoá luận là:',
      choices: [
        'Wikipedia, Stack Overflow, blog Medium',
        'IEEE Xplore, ACM Digital Library, Springer LNCS, arXiv (preprint)',
        'GitHub README, YouTube tutorials, Reddit r/programming',
        'Tài liệu nội bộ công ty và forum Viblo',
      ],
      answer: 1,
      explanation: 'Nguồn uy tín cho khoá luận CNTT: IEEE Xplore, ACM Digital Library, Springer/LNCS, Elsevier (Science Direct). arXiv là preprint server — có thể dùng nhưng cần ghi rõ "not peer-reviewed". Các nguồn như Wikipedia, blog, Stack Overflow không phải peer-reviewed nên không phù hợp làm tài liệu tham khảo học thuật chính. Scopus và Web of Science là database indexing — dùng để tìm bài, không phải publisher.',
    },
    {
      stem: 'Phương pháp nghiên cứu thực nghiệm (Experimental Research) trong CNTT phù hợp nhất khi:',
      choices: [
        'Sinh viên muốn mô tả hiện trạng sử dụng phần mềm tại doanh nghiệp',
        'Sinh viên cần so sánh hiệu suất hai thuật toán trên cùng tập dữ liệu benchmark',
        'Sinh viên khảo sát ý kiến người dùng về trải nghiệm ứng dụng mobile',
        'Sinh viên phân tích case study triển khai hệ thống ERP tại 1 công ty',
      ],
      answer: 1,
      explanation: 'Experimental Research: thao túng biến độc lập và đo biến phụ thuộc trong điều kiện kiểm soát để thiết lập quan hệ nhân quả. VD: so sánh A* vs Dijkstra trên cùng graph — kiểm soát dữ liệu, đo thời gian + độ chính xác. Các phương pháp khác: Survey → ý kiến người dùng; Case study → khám phá sâu 1 trường hợp; Descriptive → mô tả hiện trạng. Khoá luận CNTT thường kết hợp thực nghiệm với baseline comparison.',
    },
    {
      stem: 'Ngưỡng đạo văn (plagiarism similarity index) được nhiều trường đại học VN chấp nhận tối đa trong khoá luận là:',
      choices: [
        '50% — một nửa có thể sao chép',
        'Không quá 30%, trong đó mỗi nguồn đơn lẻ không quá 5–10%',
        '100% nếu có trích dẫn nguồn',
        '5% — chỉ cho phép trích dẫn trực tiếp',
      ],
      answer: 1,
      explanation: 'Phổ biến tại VN (UET/HUST/NEU và quy định Bộ GD&ĐT): tổng similarity index ≤ 30% (đo bằng iThenticate/Turnitin), không nguồn đơn lẻ vượt 5–10%. Phân biệt: similarity ≠ plagiarism — common phrases, bibliography, methodology thường match hợp lệ. Trích dẫn đúng (paraphrase + cite) không phải đạo văn. Sử dụng AI tạo sinh (ChatGPT) viết thay cũng vi phạm học thuật tại nhiều trường.',
    },
    {
      stem: 'Cấu trúc chuẩn của một khoá luận CNTT theo định dạng IMRaD là:',
      choices: [
        'Abstract → Conclusion → Introduction → Literature Review → Methodology → Results',
        'Introduction → Literature Review → Methodology → Results & Discussion → Conclusion',
        'Methodology → Results → Introduction → Literature Review → Conclusion',
        'Conclusion → Results → Methodology → Introduction → Literature Review',
      ],
      answer: 1,
      explanation: 'IMRaD (Introduction, Methods, Results and Discussion): Introduction (tại sao, mục tiêu) → Literature Review/Background (đã có gì) → Methodology (làm như thế nào) → Results & Discussion (kết quả, phân tích, so sánh) → Conclusion (tóm tắt, hạn chế, hướng tương lai). Khoá luận CNTT thường thêm chương System Design/Implementation giữa Methodology và Results. Abstract được viết cuối nhưng đặt đầu. Appendix: code, dataset, bảng số liệu chi tiết.',
    },
    {
      stem: 'Để kết quả thực nghiệm khoá luận CNTT có thể tái lập (reproducible), sinh viên cần:',
      choices: [
        'Chỉ báo cáo accuracy cuối cùng, không cần chi tiết khác',
        'Công bố code, dataset, hyperparameters, random seed, phiên bản thư viện và môi trường thực nghiệm',
        'Chạy 3 lần và lấy kết quả tốt nhất để báo cáo',
        'Dùng dataset độc quyền để đảm bảo tính duy nhất',
      ],
      answer: 1,
      explanation: 'Reproducibility checklist: (1) Code: GitHub repo public; (2) Dataset: link/mô tả preprocessing; (3) Hyperparameters: learning rate, batch size, epochs, architecture; (4) Random seed: fix seed (torch.manual_seed, numpy.random.seed) để kết quả deterministic; (5) Environment: requirements.txt, conda env.yml, Docker image; (6) Hardware: GPU/CPU, RAM. Báo cáo mean ± std qua nhiều runs (seed khác nhau) tốt hơn báo cáo 1 run tốt nhất.',
    },
    {
      stem: 'Khi so sánh mô hình đề xuất với baseline, phương pháp nào kiểm định ý nghĩa thống kê của sự khác biệt?',
      choices: [
        'Chỉ cần báo cáo con số cao hơn là đủ',
        'Kiểm định thống kê (t-test, Wilcoxon signed-rank, McNemar) với ngưỡng p < 0.05',
        'Chụp màn hình kết quả đính kèm là đủ',
        'Dùng A/B testing cho tất cả loại so sánh',
      ],
      answer: 1,
      explanation: 'Statistical significance testing: "tốt hơn 2%" có thể chỉ là may mắn (noise) nếu không kiểm định. Test phổ biến: t-test (paired/independent) → so sánh means phân phối chuẩn; Wilcoxon signed-rank → không cần giả định phân phối; McNemar → so sánh 2 classifier binary. p < 0.05: bác bỏ H0 ở mức ý nghĩa 5%. Effect size (Cohen\'s d): p nhỏ không đồng nghĩa practically significant. K-fold cross-validation thay vì single split → ước lượng robust hơn.',
    },
    {
      stem: 'Trong buổi bảo vệ khoá luận, hội đồng hỏi về điểm yếu nghiên cứu. Phản hồi TỐT NHẤT của sinh viên là:',
      choices: [
        'Nói rằng nghiên cứu của mình không có điểm yếu',
        'Thẳng thắn thừa nhận hạn chế, giải thích lý do và đề xuất hướng khắc phục trong future work',
        'Tấn công ngược lại câu hỏi của hội đồng',
        'Im lặng và chờ câu hỏi tiếp theo',
      ],
      answer: 1,
      explanation: 'Hội đồng đánh giá cao self-awareness và critical thinking. Cấu trúc phản hồi tốt: (1) Thừa nhận hạn chế cụ thể (VD: dataset nhỏ, thiếu real-world validation); (2) Giải thích lý do (thời gian, tài nguyên, phạm vi khoá luận đại học); (3) Đề xuất hướng mở rộng (future work). Ví dụ: "Hạn chế chính là dataset 5,000 mẫu còn nhỏ. Trong tương lai, có thể thu thập thêm dữ liệu từ X và áp dụng data augmentation." Hội đồng cũng kiểm tra: sinh viên có thực sự hiểu công trình của mình không.',
    },
    {
      stem: 'Đóng góp khoa học của khoá luận CNTT cấp đại học ở mức nào là phù hợp?',
      choices: [
        'Phải đạt Nobel Prize hoặc Turing Award',
        'Áp dụng/cải tiến kỹ thuật hiện có vào bài toán cụ thể, hoặc so sánh đánh giá phương pháp trên ngữ cảnh/dataset mới',
        'Phải tạo ra ngôn ngữ lập trình hoàn toàn mới',
        'Phải có ít nhất 10 bằng sáng chế',
      ],
      answer: 1,
      explanation: 'Khoá luận đại học ≠ luận án tiến sĩ. Mức đóng góp hợp lý: (1) Application study: áp dụng Deep Learning vào bài toán VN chưa có benchmark; (2) Comparative study: so sánh 3–4 mô hình, rút ra hướng dẫn thực tiễn; (3) Tool/system: xây dựng hệ thống giải quyết nhu cầu thực; (4) Incremental improvement: cải tiến nhỏ thuật toán có baseline rõ ràng. Tiêu chí thành công: methodology rõ ràng, thực nghiệm rigorous, kết luận được justify bởi bằng chứng — không nhất thiết đạt SOTA global.',
    },
    {
      stem: 'Từ khoá luận CNTT, sinh viên VN muốn đăng bài quốc tế nên hướng đến hội nghị/tạp chí nào trước tiên?',
      choices: [
        'Nature, Science, Cell — các tạp chí top nhất thế giới',
        'SOICT (UET/Springer LNCS), RIVF (IEEE), hoặc hội nghị IEEE/ACM tier B/C phù hợp chuyên ngành',
        'Chỉ nên đăng ở blog cá nhân vì chưa đủ kinh nghiệm',
        'Bất kỳ tạp chí nào nhận bài mà không peer-review (predatory journals)',
      ],
      answer: 1,
      explanation: 'Lộ trình đăng bài từ khoá luận VN: Bước 1 — Hội nghị quốc gia uy tín: SOICT (Springer LNCS), ACOMP, RIVF (IEEE) — peer-reviewed, phù hợp nghiên cứu đầu đời; Bước 2 — Hội nghị quốc tế tier B/C (CORE ranking): IEEE ICTC, ICPR, ICDM short paper; Bước 3 — Tạp chí Scopus Q3/Q4. Tránh: predatory journals (Beall\'s List) — phí cao, không peer-reviewed thực sự. Kiểm tra: Scimago Journal Ranking (SJR), CORE ranking. Nature/Science dành cho đột phá toàn cầu — không phù hợp khoá luận đại học.',
    },
  ],
};

export const IT_YEAR4_SCENARIOS = {
  [I41_QUIZ.id]: I41_QUIZ,
  [I42_QUIZ.id]: I42_QUIZ,
  [I43_QUIZ.id]: I43_QUIZ,
  [I44_QUIZ.id]: I44_QUIZ,
  [I45_QUIZ.id]: I45_QUIZ,
};
