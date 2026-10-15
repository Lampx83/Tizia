// ============================================================
// Trường CNTT — Career Path Scenarios (IC01–IC06)
// ============================================================
// 6 quiz hướng nghiệp cho sinh viên CNTT cuối khoá:
//   IC01 — Software Engineer       (10 câu)
//   IC02 — Data Scientist          (10 câu)
//   IC03 — DevOps Engineer         (10 câu)
//   IC04 — Security Engineer       (10 câu)
//   IC05 — Mobile Developer        (10 câu)
//   IC06 — AI / ML Engineer        (10 câu)
// Tổng 60 câu, difficulty 3–4, focus thực tiễn nghề nghiệp VN.
// ============================================================

// ─────────────────────────────────────────────────────────────
// IC01 — Software Engineer
// ─────────────────────────────────────────────────────────────
export const IC01_QUIZ = {
  id: 'IC01-career-quiz',
  title: 'IC01 · Career · Software Engineer — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['software-engineering', 'career-planning', 'system-design'],
  questions: [
    {
      stem: 'Lộ trình thăng tiến phổ biến nhất cho Software Engineer tại Việt Nam là gì?',
      choices: [
        'Junior → Senior → Lead/Principal → Engineering Manager / Staff Engineer (5–10 năm)',
        'Intern → Junior → Senior → CTO (2 năm)',
        'Developer → Team Lead → CEO (3 năm)',
        'Code tự do → Freelance → Startup'
      ],
      answer: 0,
      explanation: 'Lộ trình chuẩn trong ngành: Junior (0–2 năm) → Mid-level (2–4 năm) → Senior (4–7 năm) → Lead/Principal/Staff/Architect → Manager. Tại VN, tốc độ lên cấp nhanh hơn ở các công ty nước ngoài hoặc startup.'
    },
    {
      stem: 'Chứng chỉ nào được nhà tuyển dụng CNTT đánh giá cao nhất cho lập trình viên backend?',
      choices: [
        'AWS Certified Solutions Architect / Google Cloud Professional',
        'Microsoft Office Specialist (MOS)',
        'Chứng chỉ lái xe ô tô hạng B2',
        'IELTS 6.0+'
      ],
      answer: 0,
      explanation: 'Cloud certifications (AWS SAA, GCP ACE, Azure AZ-900/AZ-204) được đánh giá cao vì backend hiện đại gắn với cloud-native. Ngoài ra, các chứng chỉ Java (OCA/OCP), Kubernetes (CKA), hay ngôn ngữ cụ thể cũng có giá trị.'
    },
    {
      stem: 'Mức lương trung bình của Senior Software Engineer tại TP.HCM / Hà Nội (2024–2025) là bao nhiêu?',
      choices: [
        '8–15 triệu/tháng',
        '20–45 triệu/tháng (tương đương ~800–1.800 USD)',
        '100–150 triệu/tháng',
        '3–6 triệu/tháng'
      ],
      answer: 1,
      explanation: 'Theo ITviec Salary Report 2024, Senior Software Engineer tại Việt Nam thường đạt 20–45 triệu/tháng (gross) tuỳ công ty, tech stack và kinh nghiệm. Các vị trí ở MNC hay outsourcing cho thị trường Nhật/US có thể lên 50–80 triệu.'
    },
    {
      stem: 'SOLID là nguyên tắc lập trình gồm 5 chữ cái đầu viết tắt của:',
      choices: [
        'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
        'Simple, Open, Lightweight, Integrated, Distributed',
        'Secure, Optimized, Loosely-coupled, Independent, Dynamic',
        'Scalable, Observable, Loosely-coupled, Immutable, Declarative'
      ],
      answer: 0,
      explanation: 'SOLID là 5 nguyên tắc thiết kế OOP: S (Single Responsibility), O (Open/Closed), L (Liskov Substitution), I (Interface Segregation), D (Dependency Inversion). Robert C. Martin ("Uncle Bob") đề xuất, giúp code dễ bảo trì và mở rộng.'
    },
    {
      stem: 'Trong phỏng vấn System Design, khi hỏi "Thiết kế hệ thống chat như Zalo cho 10 triệu người dùng", bạn nên bắt đầu bằng:',
      choices: [
        'Vẽ ngay database schema chi tiết',
        'Làm rõ yêu cầu (functional/non-functional requirements): số người dùng đồng thời, độ trễ, tính sẵn sàng, loại tin nhắn',
        'Nói ngay về WebSocket và Redis',
        'Từ chối vì không đủ thông tin'
      ],
      answer: 1,
      explanation: 'System Design interview bắt đầu bằng clarification: Who are the users? What features (1-on-1, group chat, media)? Scale (QPS, storage)? Latency requirements? Sau đó mới đến high-level architecture, API design, data model, và deep dive vào components phức tạp.'
    },
    {
      stem: 'Git workflow phổ biến nhất trong dự án doanh nghiệp tại Việt Nam hiện nay là:',
      choices: [
        'Commit thẳng vào main branch',
        'GitFlow (main, develop, feature/*, release/*, hotfix/*)',
        'Dùng FTP upload file trực tiếp',
        'Trunk-based development (không có branch)'
      ],
      answer: 1,
      explanation: 'GitFlow (Vincent Driessen) vẫn là chuẩn phổ biến tại VN với branches: main (production), develop (integration), feature/* (tính năng mới), release/* (chuẩn bị release), hotfix/* (vá lỗi khẩn). Tuy nhiên, các công ty product lớn như Tiki, VNPay đang chuyển sang Trunk-based.'
    },
    {
      stem: 'Code Review là bước quan trọng trong quy trình phát triển phần mềm. Mục đích chính là:',
      choices: [
        'Để quản lý kiểm soát lập trình viên',
        'Phát hiện bug, đảm bảo chất lượng code, chia sẻ kiến thức trong team, tuân thủ coding standards',
        'Chỉ để tìm lỗi chính tả trong comment',
        'Để trì hoãn việc merge code'
      ],
      answer: 1,
      explanation: 'Code Review có nhiều lợi ích: phát hiện bug sớm (trước production), enforce coding standards, knowledge sharing (reviewer cũng học từ code reviewee), cải thiện design. Best practice: review trong 24h, comment constructive, focus on code không phải người.'
    },
    {
      stem: 'Big Tech (Google, Meta, Amazon, Microsoft) nổi tiếng phỏng vấn kiểu "LeetCode" — câu hỏi thường tập trung vào:',
      choices: [
        'Viết CV đẹp và thuyết trình PowerPoint',
        'Data Structures & Algorithms (DSA): arrays, trees, graphs, dynamic programming, time/space complexity',
        'Thuộc lòng syntax của 5 ngôn ngữ lập trình',
        'Quản lý dự án và Microsoft Project'
      ],
      answer: 1,
      explanation: 'FAANG/Big Tech phỏng vấn DSA: Arrays/Strings, Linked Lists, Trees/Graphs, DP, Sorting/Searching, Recursion. Luyện LeetCode (Easy/Medium trước), NeetCode 150, hoặc HackerRank. Ngoài DSA còn có Behavioral (STAR method) và System Design cho Senior.'
    },
    {
      stem: 'Agile Scrum — trong một Sprint (2 tuần), sự kiện nào KHÔNG thuộc Scrum framework?',
      choices: [
        'Sprint Planning',
        'Daily Standup (Daily Scrum)',
        'Sprint Review',
        'Waterfall Review Meeting'
      ],
      answer: 3,
      explanation: 'Scrum có 5 events: Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective. Waterfall Review không thuộc Scrum — nó thuộc mô hình thác nước (Waterfall). Scrum Master đảm bảo team tuân thủ các sự kiện và loại bỏ impediments.'
    },
    {
      stem: 'Công ty phần mềm nào tại Việt Nam được xếp hạng cao nhất về quy mô và xuất khẩu phần mềm (2024)?',
      choices: [
        'FPT Software, TMA Solutions, NashTech (Harvey Nash Vietnam), KMS Technology',
        'Grab, Shopee, VNG',
        'Viettel, VNPT, MobiFone',
        'Vinamilk, Masan, Sabeco'
      ],
      answer: 0,
      explanation: 'FPT Software (25.000+ nhân viên, xuất khẩu sang Nhật/US/EU), TMA Solutions (4.000+ nhân viên, Nhật, US), NashTech / Harvey Nash Vietnam, KMS Technology là những công ty outsourcing/product nổi bật. Grab/Shopee là tech company nhưng không phải software outsourcing.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// IC02 — Data Scientist
// ─────────────────────────────────────────────────────────────
export const IC02_QUIZ = {
  id: 'IC02-career-quiz',
  title: 'IC02 · Career · Data Scientist — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['data-science', 'machine-learning', 'analytics'],
  questions: [
    {
      stem: 'Bộ kỹ năng cốt lõi của một Data Scientist thực chiến là gì?',
      choices: [
        'Photoshop, PowerPoint, Word',
        'Python/R, SQL, Statistics, ML frameworks (scikit-learn, TensorFlow/PyTorch), Data Visualization, Business Acumen',
        'Java, C++, Assembly',
        'HTML, CSS, JavaScript'
      ],
      answer: 1,
      explanation: 'Data Scientist cần: Python (pandas, numpy, scikit-learn) hoặc R; SQL cho data retrieval; Statistics (probability, hypothesis testing, A/B testing); ML (supervised/unsupervised); Visualization (matplotlib, seaborn, Tableau, PowerBI); Business sense để translate data → insights.'
    },
    {
      stem: 'Trong Machine Learning, "overfitting" xảy ra khi nào?',
      choices: [
        'Mô hình học quá kỹ training data, performance trên test data kém hơn nhiều',
        'Mô hình không học được gì từ training data',
        'Dữ liệu bị thiếu quá nhiều',
        'Tốc độ training quá chậm'
      ],
      answer: 0,
      explanation: 'Overfitting: mô hình "memorize" training data thay vì học pattern → high training accuracy, low test accuracy. Giải pháp: regularization (L1/L2), dropout, cross-validation, thêm data, feature selection, early stopping. Underfitting là ngược lại (model quá đơn giản).'
    },
    {
      stem: 'A/B Testing trong Data Science dùng để làm gì?',
      choices: [
        'Kiểm tra hai phiên bản (A và B) của một tính năng/UI để xác định cái nào hiệu quả hơn qua thử nghiệm có kiểm soát',
        'So sánh hai ngôn ngữ lập trình',
        'Debug hai bug cùng lúc',
        'Backup dữ liệu lên hai server'
      ],
      answer: 0,
      explanation: 'A/B Testing (Controlled Experiment): chia ngẫu nhiên user thành group A (control) và B (variant), đo metric (CTR, conversion rate, revenue). Cần đảm bảo statistical significance (p-value < 0.05). Tại VN, Tiki, Shopee, VNG dùng A/B testing để tối ưu UX và doanh thu.'
    },
    {
      stem: 'SQL query nào đúng để lấy top 5 sản phẩm bán chạy nhất?',
      choices: [
        'SELECT product, SUM(quantity) as total_sold FROM orders GROUP BY product ORDER BY total_sold DESC LIMIT 5',
        'SELECT TOP 5 product FROM orders',
        'GET TOP 5 PRODUCTS FROM orders ORDER BY sales',
        'FIND BEST 5 products IN orders TABLE'
      ],
      answer: 0,
      explanation: 'Câu query chuẩn: GROUP BY để nhóm theo sản phẩm, SUM() để tổng số lượng, ORDER BY DESC để sắp xếp giảm dần, LIMIT 5 để lấy top 5 (MySQL/PostgreSQL). Trong SQL Server dùng TOP 5 thay vì LIMIT.'
    },
    {
      stem: 'Pandas trong Python là thư viện dùng để làm gì?',
      choices: [
        'Tạo game 2D',
        'Xử lý và phân tích dữ liệu dạng bảng (DataFrame/Series) — đọc CSV/Excel, lọc, nhóm, biến đổi dữ liệu',
        'Vẽ đồ họa 3D',
        'Lập trình web backend'
      ],
      answer: 1,
      explanation: 'Pandas (Python Data Analysis Library) cung cấp DataFrame (bảng 2D) và Series (cột đơn). Dùng: pd.read_csv(), df.groupby(), df.merge(), df.pivot_table(), df.dropna(), df.fillna(). Không thể thiếu trong Data Science workflow.'
    },
    {
      stem: 'Chứng chỉ Data Science nào được đánh giá cao nhất trên thị trường toàn cầu?',
      choices: [
        'Google Data Analytics Professional Certificate, IBM Data Science Professional Certificate, AWS Certified Machine Learning – Specialty',
        'Microsoft Office Specialist (MOS)',
        'CompTIA A+',
        'Chứng chỉ kế toán ACCA'
      ],
      answer: 0,
      explanation: 'Các chứng chỉ uy tín: Google Data Analytics (Coursera), IBM Data Science (Coursera), AWS ML Specialty, TensorFlow Developer (Google), Microsoft Azure Data Scientist (DP-100). Ngoài ra Kaggle competitions và GitHub portfolio quan trọng hơn chứng chỉ trong nhiều trường hợp.'
    },
    {
      stem: 'Trong pipeline ML, bước "Feature Engineering" có nghĩa là gì?',
      choices: [
        'Xây dựng cơ sở hạ tầng phần cứng cho AI',
        'Chọn, tạo, và biến đổi các biến đầu vào (features) từ raw data để cải thiện hiệu năng mô hình',
        'Viết code bằng Python',
        'Deploy mô hình lên server'
      ],
      answer: 1,
      explanation: 'Feature Engineering: tạo features mới (log transform, interaction terms, date features như day_of_week), normalize/standardize, encode categorical (one-hot, label encoding), xử lý outliers. "Garbage in, garbage out" — dữ liệu tốt và features tốt quyết định 80% chất lượng mô hình.'
    },
    {
      stem: 'Tableau và Power BI là công cụ dùng để làm gì trong Data Science?',
      choices: [
        'Lập trình machine learning',
        'Business Intelligence (BI) và Data Visualization — tạo dashboard, báo cáo trực quan cho người không biết code',
        'Quản lý source code',
        'Tạo database SQL'
      ],
      answer: 1,
      explanation: 'Tableau và Power BI là BI tools: kéo-thả để tạo chart, dashboard, report. Data Scientist dùng để truyền đạt insights cho management và business stakeholders. Tại VN, Power BI phổ biến hơn (vì ecosystem Microsoft), Tableau phổ biến trong MNC.'
    },
    {
      stem: 'Mức lương Data Scientist tại Việt Nam (2024–2025) là bao nhiêu?',
      choices: [
        '5–8 triệu/tháng',
        '25–60 triệu/tháng tuỳ cấp độ và công ty',
        '200 triệu/tháng',
        '10–12 triệu/tháng cố định'
      ],
      answer: 1,
      explanation: 'Theo ITviec Salary Report 2024: Junior Data Scientist 15–25 triệu, Mid-level 25–45 triệu, Senior 40–70 triệu. Tại VNG, Tiki, Grab Vietnam, VinAI, VinBigData mức lương cao hơn đáng kể. VinAI Research tuyển Data Scientist với mức lương cạnh tranh quốc tế.'
    },
    {
      stem: 'VinAI Research (thuộc Vingroup) được biết đến trong cộng đồng AI Việt Nam vì:',
      choices: [
        'Sản xuất điện thoại VinFast',
        'Nghiên cứu AI hàng đầu VN, công bố bài báo tại NeurIPS/ICML/CVPR, tạo PhoBERT (mô hình NLP Tiếng Việt)',
        'Xuất khẩu lao động',
        'Phát triển game mobile'
      ],
      answer: 1,
      explanation: 'VinAI Research thành lập 2019, nổi tiếng với PhoBERT (BERT cho Tiếng Việt), ViT-B (Vision Transformer), công bố tại các hội nghị top AI (NeurIPS, ICML, CVPR, ICLR, AAAI). Là điểm đến của nhiều AI researcher Việt kiều và sinh viên giỏi trong nước.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// IC03 — DevOps Engineer
// ─────────────────────────────────────────────────────────────
export const IC03_QUIZ = {
  id: 'IC03-career-quiz',
  title: 'IC03 · Career · DevOps Engineer — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['devops', 'cloud', 'ci-cd', 'infrastructure'],
  questions: [
    {
      stem: 'DevOps là sự kết hợp của:',
      choices: [
        'Developer Operations — kết hợp phát triển phần mềm (Dev) và vận hành hệ thống (Ops) để rút ngắn vòng đời phát triển',
        'Desktop và Office',
        'Database và Operating System',
        'Delivery và Outsourcing'
      ],
      answer: 0,
      explanation: 'DevOps là văn hoá + thực hành + công cụ kết hợp Dev và Ops: CI/CD pipelines, Infrastructure as Code (IaC), monitoring, automation. Mục tiêu: rút ngắn time-to-market, tăng deployment frequency, giảm failure rate và recovery time (DORA metrics).'
    },
    {
      stem: 'CI/CD trong DevOps viết tắt của:',
      choices: [
        'Continuous Integration / Continuous Delivery (hoặc Deployment)',
        'Code Inspection / Code Deployment',
        'Customer Interface / Customer Design',
        'Computer Integration / Computer Distribution'
      ],
      answer: 0,
      explanation: 'CI (Continuous Integration): dev merge code thường xuyên vào main branch, trigger automated build & test. CD (Continuous Delivery): code luôn sẵn sàng deploy; CD (Continuous Deployment): tự động deploy lên production. Tools: Jenkins, GitLab CI, GitHub Actions, CircleCI, ArgoCD.'
    },
    {
      stem: 'Docker container khác với Virtual Machine (VM) ở điểm gì?',
      choices: [
        'Docker nhanh hơn, nhẹ hơn vì chia sẻ OS kernel với host — không cần hypervisor; VM có OS riêng nặng hơn',
        'Docker chạy trên Windows, VM chạy trên Linux',
        'Docker là phần mềm miễn phí, VM phải trả tiền',
        'Không có gì khác biệt'
      ],
      answer: 0,
      explanation: 'Docker containers: share host OS kernel, start trong giây, image nhỏ (MB). VM: có guest OS riêng, start trong phút, image lớn (GB). Docker phù hợp microservices, CI/CD. Docker Compose cho multi-container, Kubernetes (K8s) cho orchestration quy mô lớn.'
    },
    {
      stem: 'Kubernetes (K8s) là gì?',
      choices: [
        'Một ngôn ngữ lập trình mới',
        'Container orchestration platform — quản lý, scale, và tự phục hồi các containerized applications',
        'Một loại database NoSQL',
        'Công cụ version control thay thế Git'
      ],
      answer: 1,
      explanation: 'Kubernetes (K8s) do Google phát triển, open-source từ 2014. Tự động: load balancing, scaling (HPA), self-healing (restart pod fail), rolling updates. Các cloud provider có managed K8s: AWS EKS, GCP GKE, Azure AKS. CKA (Certified Kubernetes Administrator) là chứng chỉ uy tín.'
    },
    {
      stem: '"Infrastructure as Code" (IaC) là khái niệm gì trong DevOps?',
      choices: [
        'Viết code trên thiết bị phần cứng',
        'Quản lý và provision hạ tầng (servers, networks, databases) bằng code thay vì cấu hình thủ công — version control được',
        'Code chạy trực tiếp trong CPU',
        'Lập trình nhúng cho phần cứng'
      ],
      answer: 1,
      explanation: 'IaC tools phổ biến: Terraform (multi-cloud), AWS CloudFormation, Ansible (configuration management), Pulumi. Lợi ích: reproducible, version control với Git, review được, automation. Thay vì click-click trên AWS console, viết terraform config và apply.'
    },
    {
      stem: 'Monitoring trong DevOps dùng để làm gì và công cụ phổ biến là gì?',
      choices: [
        'Giám sát nhân viên trong văn phòng',
        'Thu thập metrics, logs, traces từ hệ thống để phát hiện lỗi, tối ưu performance — Prometheus, Grafana, ELK Stack, Datadog',
        'Quản lý lịch họp',
        'Ghi lại màn hình trong quá trình dev'
      ],
      answer: 1,
      explanation: 'Observability = Metrics + Logs + Traces (3 pillars). Prometheus thu thập metrics, Grafana visualize, AlertManager gửi alert. ELK (Elasticsearch + Logstash + Kibana) cho log management. Jaeger/Zipkin cho distributed tracing. SRE teams dùng SLI/SLO/SLA để đảm bảo độ tin cậy.'
    },
    {
      stem: 'AWS, GCP, Azure là ba cloud provider lớn nhất. Cloud service model nào phù hợp nhất cho DevOps Engineer cần deploy ứng dụng nhanh không lo quản lý OS?',
      choices: [
        'IaaS (Infrastructure as a Service) — thuê VM, tự quản lý OS',
        'PaaS (Platform as a Service) — như AWS Elastic Beanstalk, GCP App Engine, Heroku — chỉ deploy code',
        'SaaS (Software as a Service) — dùng phần mềm như Gmail',
        'On-premise — mua server vật lý'
      ],
      answer: 1,
      explanation: 'PaaS cho phép developer/DevOps chỉ cần push code, platform lo phần còn lại (OS, runtime, scaling). Nhưng thực tế DevOps VN thường dùng IaaS (EC2, GCE) kết hợp containers (ECS, EKS, GKE) để có kiểm soát tốt hơn. AWS chiếm ~30% market share cloud toàn cầu.'
    },
    {
      stem: 'GitOps là gì?',
      choices: [
        'Dùng Git để quản lý version code thông thường',
        'Mô hình deployment dùng Git làm "single source of truth" — mọi thay đổi infrastructure/app qua Pull Request và tự động sync',
        'Một công ty phần mềm',
        'Phiên bản mới của GitHub'
      ],
      answer: 1,
      explanation: 'GitOps (Weaveworks coined term): mọi thay đổi production đi qua Git PR → review → merge → tự động apply (ArgoCD, Flux). Lợi ích: audit trail đầy đủ, rollback dễ (git revert), declarative state. ArgoCD là tool GitOps phổ biến nhất cho K8s.'
    },
    {
      stem: 'Mức lương DevOps Engineer tại Việt Nam (2024–2025) là bao nhiêu?',
      choices: [
        '8–12 triệu/tháng',
        '20–60 triệu/tháng tuỳ cấp độ — một trong những vị trí được trả cao nhất ngành IT VN',
        '150 triệu/tháng (mọi cấp)',
        '5–7 triệu/tháng (cùng mức tester)'
      ],
      answer: 1,
      explanation: 'DevOps/Cloud Engineer được xếp top lương cao: Junior 15–25 triệu, Mid 25–45 triệu, Senior 45–70+ triệu. Thiếu nhân lực DevOps trầm trọng tại VN — cơ hội lớn. AWS/GCP/Azure certified DevOps có lương cao hơn đáng kể. Thị trường remote tốt (làm việc cho công ty nước ngoài).'
    },
    {
      stem: 'DORA (DevOps Research and Assessment) đo lường hiệu quả DevOps qua 4 key metrics. Chọn bộ metric đúng:',
      choices: [
        'Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service (MTTR)',
        'Bug count, Code lines, Test coverage, Meeting time',
        'CPU usage, Memory usage, Disk I/O, Network bandwidth',
        'Employee satisfaction, Office size, Salary budget, Headcount'
      ],
      answer: 0,
      explanation: 'DORA 4 metrics: (1) Deployment Frequency (bao nhiêu lần/ngày deploy), (2) Lead Time (từ commit đến production), (3) Change Failure Rate (% deploy gây lỗi), (4) MTTR (Mean Time to Restore). Elite teams deploy nhiều lần/ngày với MTTR < 1 giờ.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// IC04 — Security Engineer
// ─────────────────────────────────────────────────────────────
export const IC04_QUIZ = {
  id: 'IC04-career-quiz',
  title: 'IC04 · Career · Security Engineer — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 4,
  skillsTrained: ['cybersecurity', 'pentesting', 'security-engineering'],
  questions: [
    {
      stem: 'OWASP Top 10 là danh sách gì?',
      choices: [
        'Top 10 công ty phần mềm thế giới',
        'Top 10 rủi ro bảo mật Web Application phổ biến nhất, được cập nhật định kỳ bởi OWASP Foundation',
        'Top 10 ngôn ngữ lập trình an toàn nhất',
        'Top 10 thuật toán mã hoá'
      ],
      answer: 1,
      explanation: 'OWASP Top 10 (2021): A01-Broken Access Control, A02-Cryptographic Failures, A03-Injection, A04-Insecure Design, A05-Security Misconfiguration, A06-Vulnerable Components, A07-Auth Failures, A08-Software Integrity Failures, A09-Logging Failures, A10-SSRF. Mọi web developer cần biết.'
    },
    {
      stem: 'SQL Injection là loại tấn công gì và cách phòng chống?',
      choices: [
        'Tấn công vật lý vào server SQL',
        'Chèn câu lệnh SQL độc hại vào input để thao túng database — phòng chống bằng Prepared Statements / Parameterized Queries',
        'Tấn công DDoS vào database server',
        'Đánh cắp backup file SQL'
      ],
      answer: 1,
      explanation: 'SQL Injection: input như `\' OR 1=1 --` bypass authentication. Phòng chống: (1) Parameterized Queries/Prepared Statements, (2) ORM (Hibernate, Sequelize), (3) Input validation/sanitization, (4) Least privilege DB account, (5) WAF. Đây là lỗi A03 trong OWASP Top 10 2021.'
    },
    {
      stem: 'Chứng chỉ bảo mật nào được coi là "gold standard" cho Penetration Tester?',
      choices: [
        'OSCP (Offensive Security Certified Professional) từ Offensive Security — yêu cầu hack lab 24h',
        'CompTIA A+',
        'CCNA (Cisco Certified Network Associate)',
        'PMP (Project Management Professional)'
      ],
      answer: 0,
      explanation: 'OSCP (Offensive Security Certified Professional) yêu cầu pentest 10 machines trong 24h + báo cáo 24h tiếp theo — được đánh giá rất cao vì dựa trên thực hành. Ngoài ra: CEH (Certified Ethical Hacker) của EC-Council, GPEN (GIAC Penetration Tester). Tại VN, CISSP cũng được đánh giá cao cho security manager.'
    },
    {
      stem: 'XSS (Cross-Site Scripting) attack là gì?',
      choices: [
        'Tấn công phần cứng vào switch mạng',
        'Chèn script độc hại vào trang web, khi user truy cập script chạy trong browser của họ để đánh cắp cookie/session',
        'Tấn công Man-in-the-Middle vào wifi',
        'Tấn công brute force vào password'
      ],
      answer: 1,
      explanation: 'XSS: kẻ tấn công inject `<script>document.cookie</script>` vào website. Có 3 loại: Stored (lưu DB), Reflected (qua URL param), DOM-based. Phòng chống: output encoding (html encode), CSP (Content Security Policy), HttpOnly cookies, input validation. Đây là A03 Injection trong OWASP 2021.'
    },
    {
      stem: 'HTTPS bảo mật hơn HTTP bằng cách nào?',
      choices: [
        'Tốc độ tải trang nhanh hơn',
        'Mã hoá dữ liệu truyền giữa client và server bằng TLS (Transport Layer Security) — ngăn eavesdropping và MITM',
        'Sử dụng port 80 thay vì port 443',
        'Lưu trữ password dưới dạng plaintext'
      ],
      answer: 1,
      explanation: 'HTTPS = HTTP + TLS/SSL. TLS handshake: trao đổi certificate, key exchange (ECDHE), establish symmetric session key. Sau đó toàn bộ traffic được mã hoá (AES-256-GCM thường dùng). Giúp ngăn: eavesdropping, MITM, data tampering. Let\'s Encrypt cung cấp SSL certificate miễn phí.'
    },
    {
      stem: 'Bug Bounty Program là gì và công ty nào tại VN có chương trình này?',
      choices: [
        'Chương trình thưởng cho nhân viên khi tìm bug trong phần mềm nội bộ',
        'Chương trình trả thưởng cho security researcher bên ngoài khi họ phát hiện và báo cáo lỗ hổng bảo mật có trách nhiệm',
        'Chương trình mua bug từ chợ đen',
        'Bảo hiểm cho lỗi phần mềm'
      ],
      answer: 1,
      explanation: 'Bug Bounty: công ty mời ethical hacker tìm lỗ hổng, trả tiền theo mức độ nghiêm trọng (CVSS score). Nền tảng: HackerOne, Bugcrowd, Intigriti. Tại VN: MoMo, ViettelPay, VNPay có bug bounty. Thưởng có thể từ $100 đến $10.000+ cho lỗ hổng critical. '
    },
    {
      stem: 'Phương pháp "Zero Trust Security" có nghĩa là gì?',
      choices: [
        'Không tin tưởng bất kỳ ai, kể cả user nội bộ — xác minh mọi request, least privilege, network micro-segmentation',
        'Hệ thống không cần password',
        'Chỉ tin tưởng user trong mạng nội bộ (VPN)',
        'Xoá mọi dữ liệu để tránh rủi ro'
      ],
      answer: 0,
      explanation: 'Zero Trust: "Never trust, always verify". Nguyên tắc: xác thực MFA mọi lúc, authorize per-request (không phải per-session), micro-segmentation, ít privilege nhất có thể. Google triển khai BeyondCorp từ 2009. COVID-19 làm Zero Trust trở thành chuẩn mới khi làm việc từ xa bùng nổ.'
    },
    {
      stem: 'Incident Response trong Cybersecurity gồm các bước nào (theo NIST framework)?',
      choices: [
        'Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity',
        'Hack → Fix → Forget',
        'Detect → Delete → Done',
        'Report → Outsource → Wait'
      ],
      answer: 0,
      explanation: 'NIST IR lifecycle: (1) Preparation (policy, tools, training), (2) Detection & Analysis (SIEM alerts, forensics), (3) Containment (isolate affected systems), Eradication (remove malware), Recovery (restore systems), (4) Post-Incident (lessons learned, update playbooks). CSIRT team phụ trách.'
    },
    {
      stem: 'Mức lương Security Engineer tại Việt Nam (2024–2025) là bao nhiêu?',
      choices: [
        '6–10 triệu/tháng',
        '25–70 triệu/tháng tuỳ chuyên môn — Cybersecurity là ngành thiếu nhân lực trầm trọng',
        '200 triệu/tháng',
        '12–15 triệu/tháng cố định'
      ],
      answer: 1,
      explanation: 'Cybersecurity ở VN đang thiếu hụt trầm trọng (Bộ TT&TT ước tính thiếu 50.000 nhân sự đến 2025). Senior Security Engineer, Red Team, Malware Analyst: 40–80+ triệu/tháng. Remote cho công ty nước ngoài có thể cao hơn nhiều. VSEC, CyberJutsu, Viettel Cyber Security là các công ty nổi bật.'
    },
    {
      stem: 'Công cụ Nmap dùng để làm gì trong quá trình Penetration Testing?',
      choices: [
        'Viết báo cáo bảo mật',
        'Network scanning — phát hiện host đang chạy, open ports, services, OS fingerprinting trong mạng',
        'Mã hoá file',
        'Tạo password mạnh'
      ],
      answer: 1,
      explanation: 'Nmap (Network Mapper) là công cụ network scanner cơ bản: `nmap -sV -sC -p- target` để scan toàn bộ ports, detect service versions, script scan. Kết hợp với Nessus/OpenVAS (vulnerability scanner), Burp Suite (web app testing), Metasploit (exploit framework). Tất cả đều free/open-source.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// IC05 — Mobile Developer
// ─────────────────────────────────────────────────────────────
export const IC05_QUIZ = {
  id: 'IC05-career-quiz',
  title: 'IC05 · Career · Mobile Developer — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 3,
  skillsTrained: ['mobile-development', 'flutter', 'react-native', 'android', 'ios'],
  questions: [
    {
      stem: 'Hai nền tảng mobile phổ biến nhất hiện nay là gì và ngôn ngữ lập trình chính của mỗi nền tảng?',
      choices: [
        'Android (Kotlin/Java) và iOS (Swift/Objective-C)',
        'Windows Mobile (C#) và Symbian (C++)',
        'BlackBerry (Java) và Palm (Perl)',
        'Android (Python) và iOS (Ruby)'
      ],
      answer: 0,
      explanation: 'Android: Google, ngôn ngữ chính Kotlin (khuyến nghị) và Java — IDE Android Studio. iOS: Apple, ngôn ngữ chính Swift (hiện đại) và Objective-C (legacy) — IDE Xcode. Tại VN, Android chiếm ~70% thị phần thiết bị, nhưng iOS users có LTV cao hơn trong thương mại điện tử.'
    },
    {
      stem: 'Flutter là gì và ưu điểm chính so với native development?',
      choices: [
        'Framework của Google, viết code Dart một lần, build cho Android, iOS, Web, Desktop — UI nhất quán, performance gần native',
        'Ngôn ngữ lập trình mới của Apple',
        'Database dành riêng cho mobile',
        'Tool thiết kế UI/UX của Adobe'
      ],
      answer: 0,
      explanation: 'Flutter (Google, 2018) dùng Dart, compile thành native machine code (không dùng JavaScript bridge như React Native). Widget tree render bằng Skia/Impeller engine. Ưu điểm: hot reload, one codebase cho 6 platforms, pub.dev ecosystem. Nhược: Dart ít phổ biến, app size lớn hơn.'
    },
    {
      stem: 'React Native khác Flutter ở điểm gì?',
      choices: [
        'React Native (Meta/Facebook) dùng JavaScript/TypeScript, giao tiếp với native components qua bridge; Flutter tự render UI',
        'React Native chỉ cho iOS, Flutter chỉ cho Android',
        'Không có gì khác biệt — cùng một framework',
        'React Native dùng Python, Flutter dùng Java'
      ],
      answer: 0,
      explanation: 'React Native: JS/TS → bridge → native UI components (Button, TextInput thực sự là native). Ưu điểm: tận dụng kỹ năng React web, ecosystem npm khổng lồ. Flutter: Dart → compile native, tự vẽ UI với Skia. Apps VN dùng RN: Shopee (một phần), VNPay; dùng Flutter: Tiki, Vietcombank.'
    },
    {
      stem: 'Để publish app lên Google Play Store, developer cần gì?',
      choices: [
        'Đăng ký Google Play Developer Account (25 USD phí một lần), ký APK/AAB bằng keystore, điền thông tin app, pass review',
        'Trả phí hàng tháng 100 USD',
        'Chỉ cần upload file APK, không cần tài khoản',
        'Phải là công ty mới được đăng'
      ],
      answer: 0,
      explanation: 'Google Play: (1) Tạo Developer Account $25 (lifetime), (2) Build APK/AAB (Android App Bundle — nhỏ hơn), (3) Sign bằng keystore (BẢO QUẢN KEYSTORE VÌ MẤT KHÔNG UPDATE ĐƯỢC), (4) Điền listing (mô tả, screenshot, privacy policy), (5) Submit review (thường 1–7 ngày). Apple App Store: $99/năm, review 1–3 ngày.'
    },
    {
      stem: 'State management trong mobile app Flutter, thư viện nào phổ biến nhất?',
      choices: [
        'setState() (built-in), Provider, Bloc/Cubit, Riverpod, GetX — mỗi cái có trade-off riêng',
        'Redux chỉ của React',
        'jQuery',
        'Spring Boot'
      ],
      answer: 0,
      explanation: 'Flutter state management: setState (đơn giản, nhỏ), Provider (pub.dev recommend), Bloc/Cubit (enterprise, testable, separation of concerns), Riverpod (Bloc author), GetX (ít boilerplate nhưng opinionated). Tại VN, Bloc và GetX phổ biến nhất. Chọn theo team preference và complexity.'
    },
    {
      stem: 'Mobile app performance — "Jank" trong context Flutter/Android là gì?',
      choices: [
        'File rác trong bộ nhớ điện thoại',
        'Frame render chậm hơn 16ms (< 60fps), gây giật/lag trong animation và scroll — cần profiler để tìm nguyên nhân',
        'Lỗi network timeout',
        'App bị crash'
      ],
      answer: 1,
      explanation: 'Jank = dropped frames = giật hình. Màn hình 60fps = 16ms/frame; 90fps = 11ms. Flutter DevTools, Android Profiler, Xcode Instruments giúp phát hiện. Nguyên nhân: main isolate bị block, render object phức tạp, image decode on main thread. Giải pháp: async/await, compute(), const widgets, image caching.'
    },
    {
      stem: 'Push Notification trong mobile app thường dùng dịch vụ gì?',
      choices: [
        'FCM (Firebase Cloud Messaging — Google) cho Android và iOS; APNs (Apple Push Notification service) là nền tảng iOS native',
        'SMS gateway',
        'Email SMTP',
        'Gọi API polling mỗi giây'
      ],
      answer: 0,
      explanation: 'FCM (Firebase Cloud Messaging) là lựa chọn phổ biến nhất vì: miễn phí, hỗ trợ cả Android và iOS (thông qua APNs), analytics, dễ tích hợp với Firebase suite. Tại VN, Shopee, Tiki, MoMo đều dùng FCM. Ngoài ra có OneSignal, AWS SNS, Pusher cho options khác.'
    },
    {
      stem: 'REST API trong mobile app — cách xử lý lỗi network tốt nhất là gì?',
      choices: [
        'Để app crash khi lỗi network',
        'Try-catch, retry với exponential backoff, offline-first caching (local DB như SQLite/Hive), user-friendly error messages',
        'Chỉ dùng kết nối wifi, không hỗ trợ 4G',
        'Không cần xử lý vì mạng luôn ổn định'
      ],
      answer: 1,
      explanation: 'Mobile network không đáng tin cậy (underground, elevator, rural VN). Best practices: (1) Retry với exponential backoff + jitter, (2) Cache data locally (SQLite, Hive, ObjectBox), (3) Show meaningful error UI (không phải "Error occurred"), (4) Offline-first architecture, (5) Distinguish network error vs server error.'
    },
    {
      stem: 'Mức lương Mobile Developer tại Việt Nam (2024–2025) là bao nhiêu?',
      choices: [
        '5–8 triệu/tháng',
        '18–50 triệu/tháng tuỳ cấp độ và platform',
        '100 triệu/tháng (mọi cấp)',
        '10–12 triệu/tháng'
      ],
      answer: 1,
      explanation: 'Mobile Developer VN (2024): Junior 15–22 triệu, Mid 22–40 triệu, Senior 40–60+ triệu. Flutter developer được tìm kiếm nhiều (2022–2024). Remote cho công ty Singapore/US/EU có thể 60–120 triệu/tháng. iOS developer tương đối hiếm hơn Android nên lương có thể cao hơn.'
    },
    {
      stem: 'MVP (Minimum Viable Product) trong phát triển app mobile có ý nghĩa là gì?',
      choices: [
        'Most Valuable Player — nhân viên tốt nhất team',
        'Phiên bản app có đủ tính năng cốt lõi nhất để launch và thu thập feedback từ real users, tránh lãng phí build thứ không ai dùng',
        'Version đầy đủ nhất của app',
        'App chạy tốt nhất trên thiết bị VIP'
      ],
      answer: 1,
      explanation: 'MVP (Eric Ries, Lean Startup): build → measure → learn loop. Launch app với core features, thu thập data/feedback, iterate nhanh. Tránh "build for 2 years rồi không ai dùng". Các startup VN thành công (Momo, Timo, Be) đều bắt đầu bằng MVP đơn giản trước khi scale.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// IC06 — AI / ML Engineer
// ─────────────────────────────────────────────────────────────
export const IC06_QUIZ = {
  id: 'IC06-career-quiz',
  title: 'IC06 · Career · AI/ML Engineer — Lộ trình nghề nghiệp',
  kind: 'quiz', subject: 'career', difficulty: 4,
  skillsTrained: ['ai', 'machine-learning', 'deep-learning', 'mlops'],
  questions: [
    {
      stem: 'AI Engineer khác Data Scientist ở điểm chính nào?',
      choices: [
        'AI Engineer focus nhiều hơn vào xây dựng, triển khai và vận hành AI/ML systems trong production; Data Scientist focus vào phân tích và insight',
        'AI Engineer không cần biết Python',
        'Không có gì khác biệt — cùng một nghề',
        'AI Engineer chỉ làm robot vật lý'
      ],
      answer: 0,
      explanation: 'AI Engineer: build ML pipelines, model serving, MLOps, scale AI systems (infra-heavy). Data Scientist: EDA, model experimentation, statistical analysis, storytelling với data (analysis-heavy). Thực tế VN nhiều vị trí gộp chung, nhưng tech companies lớn (VNG, Tiki) đã phân biệt rõ ràng.'
    },
    {
      stem: 'Deep Learning framework phổ biến nhất hiện nay là gì?',
      choices: [
        'PyTorch (Meta) và TensorFlow/Keras (Google) — PyTorch dẫn đầu trong research, TF mạnh trong production',
        'Microsoft Excel và PowerPoint',
        'Django và Flask',
        'Unity và Unreal Engine'
      ],
      answer: 0,
      explanation: 'PyTorch (2016) được ưa thích trong research (dynamic computation graph, Pythonic API). TensorFlow (2015) + Keras mạnh về production deployment (TF Serving, TFLite, TensorFlow.js). Hugging Face (transformers library) xây trên PyTorch/TF. JAX (Google) đang nổi lên cho high-performance research.'
    },
    {
      stem: 'LLM (Large Language Model) như GPT-4, Claude, Gemini hoạt động dựa trên kiến trúc nào?',
      choices: [
        'Transformer architecture (Attention is All You Need — Vaswani et al., 2017) với self-attention mechanism',
        'Decision Tree và Random Forest',
        'Convolutional Neural Network (CNN)',
        'Support Vector Machine (SVM)'
      ],
      answer: 0,
      explanation: 'Transformer (Google Brain, 2017) đã cách mạng hoá NLP và AI: self-attention cho phép model xử lý context dài; positional encoding; multi-head attention. GPT (OpenAI), BERT (Google), Claude (Anthropic), Gemini (Google) đều dùng Transformer variants. PhoGPT, VinaLLaMA là LLM Tiếng Việt.'
    },
    {
      stem: 'MLOps là gì và tại sao quan trọng?',
      choices: [
        'Machine Learning Operations — thực hành đưa ML models vào production, monitor, retrain, và maintain bền vững như software engineering',
        'Phòng Operations trong công ty ML',
        'Một loại thuật toán mới',
        'Marketing cho sản phẩm AI'
      ],
      answer: 0,
      explanation: 'MLOps (ML + DevOps): CI/CD cho ML (không chỉ code mà còn data + model), model versioning (MLflow, W&B), feature store, model monitoring (data drift, concept drift), automated retraining. Tools: Kubeflow, MLflow, Weights & Biases, Vertex AI (GCP), SageMaker (AWS). "Models decay" — cần monitor liên tục.'
    },
    {
      stem: 'Kỹ thuật "Fine-tuning" LLM là gì?',
      choices: [
        'Tinh chỉnh volume âm thanh của loa',
        'Tiếp tục train một pre-trained model trên domain-specific data để adapt cho task cụ thể — ví dụ fine-tune LLaMA3 trên data y tế Việt Nam',
        'Xoá model và train lại từ đầu',
        'Nén model để chạy nhanh hơn'
      ],
      answer: 1,
      explanation: 'Fine-tuning: lấy pre-trained model (đã học từ internet-scale data) → train thêm trên data nhỏ hơn của domain cụ thể (medical, legal, e-commerce). Techniques: Full fine-tuning (expensive), LoRA/QLoRA (parameter-efficient, cost-effective), RLHF (Reinforcement Learning from Human Feedback — dùng trong ChatGPT). Tiết kiệm hơn nhiều so với train từ đầu.'
    },
    {
      stem: 'Prompt Engineering là kỹ năng gì trong thời đại AI?',
      choices: [
        'Kỹ năng lập trình phần cứng nhúng',
        'Nghệ thuật thiết kế input (prompt) để LLM trả về output chất lượng cao — bao gồm zero-shot, few-shot, chain-of-thought prompting',
        'Thiết kế giao diện người dùng',
        'Quản lý dự án phần mềm'
      ],
      answer: 1,
      explanation: 'Prompt Engineering: (1) Zero-shot: hỏi thẳng không ví dụ, (2) Few-shot: cho 2–5 ví dụ mẫu, (3) Chain-of-Thought (CoT): yêu cầu model suy luận từng bước ("think step by step"), (4) Role prompting ("Bạn là chuyên gia dược sĩ lâm sàng..."), (5) RAG (Retrieval Augmented Generation): cung cấp context từ database. Kỹ năng quan trọng cho AI Engineer.'
    },
    {
      stem: 'Computer Vision — model nào tốt nhất cho bài toán object detection hiện nay?',
      choices: [
        'YOLO (You Only Look Once) series (YOLOv8, YOLOv9), RT-DETR, và DETR-based models là state-of-the-art',
        'Microsoft Excel',
        'Logistic Regression',
        'Naive Bayes'
      ],
      answer: 0,
      explanation: 'Object Detection: YOLOv8 (Ultralytics) balance tốt giữa speed và accuracy — phổ biến trong production. RT-DETR (Google), Co-DETR là state-of-the-art về accuracy. Ứng dụng VN: camera an ninh (Hikvision dùng YOLO), nhận diện biển số xe (AI Camera VN), kiểm soát chất lượng sản xuất, y tế (đọc X-quang).'
    },
    {
      stem: 'Chứng chỉ AI/ML nào được coi là có giá trị nhất trong ngành?',
      choices: [
        'TensorFlow Developer Certificate (Google), AWS Certified Machine Learning Specialty, Google Professional ML Engineer, DeepLearning.AI specializations',
        'Microsoft Word Specialist',
        'CompTIA Network+',
        'Chứng chỉ lái xe'
      ],
      answer: 0,
      explanation: 'AI/ML certifications: TensorFlow Dev Cert (Google, ~$100), AWS ML Specialty (cao cấp), GCP Professional ML Engineer, Azure AI Engineer. Nhưng trong AI, portfolio (Kaggle competitions, GitHub, bài báo khoa học, open-source contributions) quan trọng hơn chứng chỉ. Kaggle Master/Grandmaster được coi trọng hàng đầu.'
    },
    {
      stem: 'Mức lương AI/ML Engineer tại Việt Nam (2024–2025) là bao nhiêu?',
      choices: [
        '8–12 triệu/tháng',
        '30–80+ triệu/tháng — một trong những mức lương cao nhất ngành IT VN',
        '200 triệu/tháng (mọi cấp)',
        '15–18 triệu/tháng'
      ],
      answer: 1,
      explanation: 'AI Engineer VN 2024: Junior 20–35 triệu, Mid 35–60 triệu, Senior 60–100+ triệu. VinAI Research, VinBigData, FPT AI, Viettel AI, Be Group, các MNC (Samsung R&D, Intel AI, Bosch) trả lương cạnh tranh. Remote job từ US/EU cho AI Engineer VN có thể 100–200 triệu/tháng (contract).'
    },
    {
      stem: 'RAG (Retrieval Augmented Generation) giải quyết vấn đề gì của LLM?',
      choices: [
        'Làm LLM chạy nhanh hơn trên CPU',
        'Cung cấp context thực tế từ database/document cho LLM, giảm hallucination và cho phép trả lời về domain knowledge cụ thể không có trong training data',
        'Giảm kích thước model',
        'Dịch ngôn ngữ tự động'
      ],
      answer: 1,
      explanation: 'RAG (Lewis et al., 2020): khi user hỏi → (1) embed query → (2) vector search trên document store (ChromaDB, Pinecone, Weaviate, pgvector) → (3) retrieve relevant chunks → (4) augment prompt → (5) LLM trả lời với context. Giải quyết: hallucination, knowledge cutoff, domain-specific knowledge. LangChain, LlamaIndex là frameworks phổ biến cho RAG.'
    },
  ]
};

// ─────────────────────────────────────────────────────────────
// Export tổng hợp
// ─────────────────────────────────────────────────────────────
export const IT_CAREERS_SCENARIOS = {
  [IC01_QUIZ.id]: IC01_QUIZ,
  [IC02_QUIZ.id]: IC02_QUIZ,
  [IC03_QUIZ.id]: IC03_QUIZ,
  [IC04_QUIZ.id]: IC04_QUIZ,
  [IC05_QUIZ.id]: IC05_QUIZ,
  [IC06_QUIZ.id]: IC06_QUIZ,
};
