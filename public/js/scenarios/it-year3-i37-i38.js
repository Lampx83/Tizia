// ============================================================
// Trường CNTT — Scenarios Năm 3, phần 4/4: I3.7 + I3.8
// ============================================================

// ─── I3.7 · DevOps & Cloud ──────────────────────────────────
export const I37_QUIZ = {
  id: 'I3.7-devops-quiz',
  title: 'I3.7 · DevOps & Cloud — CI/CD, Kubernetes, AWS, Monitoring, IaC',
  kind: 'quiz',
  yearLevel: 3, subject: 'devops', difficulty: 3,
  skillsTrained: ['cicd', 'kubernetes', 'cloud', 'monitoring', 'iac'],
  questions: [
    {
      stem: 'Kubernetes (K8s) giải quyết vấn đề gì mà Docker Compose không giải quyết tốt?',
      choices: [
        'Kubernetes viết Dockerfile còn Docker Compose thì không thể',
        'Orchestration ở scale lớn: auto-scaling, self-healing (restart crashed containers), rolling deployments, service discovery trên nhiều machines',
        'Kubernetes dùng Docker images còn Compose không',
        'Kubernetes chạy trên Windows, Compose chỉ chạy Linux',
      ],
      answer: 1,
      explanation: 'Docker Compose: tốt cho development (multi-container local). K8s: production-grade orchestration. K8s concepts: Pod (1+ containers, unit scheduling), Deployment (desired state, manages ReplicaSet), Service (stable IP/DNS cho set Pods), Ingress (HTTP routing), ConfigMap/Secret, PersistentVolume. Auto-scaling: HPA (Horizontal Pod Autoscaler) dựa CPU/memory/custom metrics. Self-healing: kubelet restart Pod crash, liveness/readiness probes. Rolling update: zero-downtime deploy. Namespace: isolation. Managed K8s: EKS (AWS), GKE (Google), AKS (Azure) — không cần quản lý control plane. Helm: package manager (Charts). K9s, Lens: K8s GUI.',
    },
    {
      stem: 'Infrastructure as Code (IaC) với Terraform cho phép:',
      choices: [
        'Viết test code cho infrastructure',
        'Định nghĩa và provision infrastructure (servers, networks, databases) bằng code, version-controlled, reproducible',
        'Monitor infrastructure cost tự động',
        'Auto-scale servers dựa trên CPU usage',
      ],
      answer: 1,
      explanation: 'IaC: infrastructure được mô tả trong code (HCL với Terraform, YAML với AWS CloudFormation/CDK, Python/TS với Pulumi). Lợi ích: reproducible (deploy cùng infra ở nhiều env), version controlled (git history), peer-reviewed, drift detection. Terraform: provider-agnostic (AWS, GCP, Azure, K8s). terraform plan: preview changes. terraform apply: create/update/destroy resources. State file: track current infra. Remote state: S3 + DynamoDB locking. Modules: reusable infra components. Ansible: configuration management (install software, configure OS) — khác Terraform (provision). GitOps: infra changes qua PR → auto-apply sau merge (ArgoCD, FluxCD cho K8s).',
    },
    {
      stem: 'AWS S3 (Simple Storage Service) phù hợp nhất cho loại lưu trữ nào?',
      choices: [
        'Lưu trữ SQL relational data cho application',
        'Object storage cho files không có cấu trúc (ảnh, video, backup, static assets) với 99.999999999% durability',
        'Low-latency in-memory caching',
        'Block storage cho EC2 instances chạy OS',
      ],
      answer: 1,
      explanation: 'AWS storage types: S3: object storage (flat key-value, file-based). EBS: block storage (EC2 disk, like SSD). EFS: file storage (NFS, nhiều EC2 share). S3 Durability: 11 9s (0.000000001% annual data loss). S3 features: versioning, lifecycle policies (transition cold data → Glacier), event notifications (trigger Lambda), static website hosting, Cross-Region Replication. S3 Classes: Standard (frequent access), Intelligent-Tiering (auto-move), Standard-IA (infrequent), Glacier Instant/Flexible/Deep Archive (archival). ACL vs Bucket Policy vs IAM. Pre-signed URL: temporary access. CloudFront + S3: CDN cho global distribution. Cost: pay per GB + requests.',
    },
    {
      stem: 'Blue-Green Deployment là chiến lược deploy nào?',
      choices: [
        'Deploy ứng dụng trên AWS màu xanh và GCP màu xanh lá',
        'Duy trì 2 môi trường production giống hệt (Blue=active, Green=new), switch traffic sau khi Green test xong — rollback tức thì bằng switch lại',
        'Deploy theo múi giờ — ban ngày Blue, ban đêm Green',
        'A/B test phiên bản code cho 50% user Blue và 50% user Green',
      ],
      answer: 1,
      explanation: 'Blue-Green: 2 environments giống nhau. Blue = production hiện tại. Green = phiên bản mới. Test Green với traffic giả → khi OK, switch load balancer từ Blue sang Green (seconds). Rollback: switch lại Blue. Nhược: tốn gấp đôi infrastructure. Canary Release: route dần traffic (5% → 25% → 50% → 100%) → giảm risk hơn. Rolling Update (K8s default): replace pods dần, không cần 2x infra nhưng có period cả old và new chạy cùng. Feature Flags: deploy code mà không kích hoạt feature → control riêng. Recreate: destroy all → deploy new (downtime). Immutable Infra: không patch in-place, tạo mới từ image.',
    },
    {
      stem: 'Observability trong hệ thống phân tán gồm 3 pillars:',
      choices: [
        'CPU, Memory, Disk — giám sát hardware',
        'Logs (ghi lại events), Metrics (số đo theo thời gian), Traces (theo dõi request xuyên suốt các services)',
        'Frontend, Backend, Database — giám sát theo tầng',
        'Development, Staging, Production — giám sát theo môi trường',
      ],
      answer: 1,
      explanation: '3 Pillars of Observability: 1) Logs: structured records (JSON) của events — what happened. Centralized logging: ELK Stack (Elasticsearch + Logstash + Kibana), Loki + Grafana. 2) Metrics: numerical measurements over time (request rate, error rate, latency, CPU%). Prometheus (scrape) + Grafana (dashboard). RED Method: Rate, Errors, Duration. USE Method: Utilization, Saturation, Errors. 3) Distributed Traces: track request across services — Jaeger, Zipkin, AWS X-Ray. Span: unit of work trong trace, propagate trace context qua headers. OpenTelemetry: vendor-neutral instrumentation standard. SLI (metric), SLO (target), SLA (contract). Error budget: 100% - SLO.',
    },
    {
      stem: 'GitHub Actions CI/CD — "workflow" được trigger khi nào theo mặc định phổ biến nhất?',
      choices: [
        'Mỗi giờ tự động',
        'Khi có push lên branch hoặc pull request được tạo/update — định nghĩa trong on: [push, pull_request]',
        'Khi maintainer bấm nút thủ công',
        'Chỉ khi deploy lên production',
      ],
      answer: 1,
      explanation: 'GitHub Actions: .github/workflows/*.yml. Triggers (on:): push (branch/tags filter), pull_request, schedule (cron), workflow_dispatch (manual), repository_dispatch, release. Jobs: chạy trên runners (ubuntu-latest, windows-latest, macos-latest hoặc self-hosted). Steps: run (shell command), uses (action). Secrets: lưu credentials an toàn (GITHUB_TOKEN tự động). Matrix strategy: test nhiều version Python/Node song song. Artifacts: upload/download giữa jobs. Cache: dependencies để speed up. Actions marketplace: pre-built actions (checkout, setup-node, docker-build-push). Pricing: free cho public repos, 2000 min/month free cho private.',
    },
    {
      stem: 'Serverless Functions (AWS Lambda, Cloud Functions) phù hợp nhất với workload nào?',
      choices: [
        'Machine learning training job chạy nhiều giờ trên GPU',
        'Event-driven, short-lived tasks: image resize, webhook handler, scheduled job — pay per invocation, không quản lý server',
        'Stateful application cần persistent connection như WebSocket server',
        'Database transactions phức tạp cần ACID',
      ],
      answer: 1,
      explanation: 'Serverless: chạy code không cần quản lý server. AWS Lambda: max 15 min execution, max 10GB RAM, event-driven (API Gateway, S3, SQS, DynamoDB Streams, EventBridge). Cold start: container khởi tạo lần đầu (~100ms → vài giây tùy runtime). Provisioned concurrency: pre-warm để tránh cold start. Pricing: per request + duration (GB-sec). Use cases: REST API (API GW + Lambda), image processing, scheduled tasks (EventBridge), stream processing (Kinesis/SQS). Không phù hợp: long-running, stateful, predictable high-traffic (EC2 rẻ hơn). Function-as-a-Service (FaaS). SAM (Serverless Application Model), Serverless Framework: IaC cho serverless.',
    },
    {
      stem: 'Rate Limiting trong API được implement để:',
      choices: [
        'Tăng tốc độ phản hồi của API',
        'Giới hạn số requests từ client trong khoảng thời gian nhất định — tránh abuse, DDoS, bảo vệ tài nguyên',
        'Kiểm soát phiên bản API (v1, v2)',
        'Mã hoá data transfer',
      ],
      answer: 1,
      explanation: 'Rate Limiting: X requests per second/minute per client (IP, API key, user). Algorithms: Fixed Window (đơn giản, có burst issue ở boundary), Sliding Window (chính xác hơn), Token Bucket (cho phép burst ngắn — phổ biến nhất), Leaky Bucket (smooth output rate). Implementation: Redis (INCR + EXPIRE, atomic Lua script). HTTP 429 Too Many Requests + Retry-After header. API Gateway (Kong, AWS API GW): built-in rate limiting. Throttling (tốc độ) vs Quota (tổng số). Client-side: exponential backoff khi nhận 429. Circuit Breaker pattern: tự động dừng gọi khi service fail nhiều → reset sau timeout.',
    },
    {
      stem: 'Disaster Recovery (DR) — "RPO" và "RTO" là gì?',
      choices: [
        'Remote Process Orchestration và Real-Time Output — chỉ số hiệu năng',
        'Recovery Point Objective (chấp nhận mất tối đa bao nhiêu data) và Recovery Time Objective (downtime tối đa trước khi phục hồi)',
        'Resource Pool Options và Request Throughput Optimization',
        'Redundancy Protocol và Replication Timeout',
      ],
      answer: 1,
      explanation: 'RPO: Recovery Point Objective — "có thể mất data bao nhiêu?". RPO = 1h → backup mỗi giờ. RPO = 0 → sync replication realtime. RTO: Recovery Time Objective — "chịu downtime bao lâu?". RTO = 4h → phục hồi trong 4 giờ. RTO = 0 → active-active. DR Strategies (AWS): Backup & Restore (RPO hours, RTO hours, rẻ nhất), Pilot Light (RTO ~1h), Warm Standby (scaled-down production running, RTO ~min), Multi-Site Active-Active (RTO seconds, đắt nhất). High Availability (HA) ≠ DR: HA = uptime trong normal operations (multi-AZ); DR = recovery sau disaster. SLA 99.9% = 8.7h downtime/year; 99.99% = 52.6 min.',
    },
    {
      stem: 'Container security best practice — "least privilege principle" trong Docker là:',
      choices: [
        'Dùng image size nhỏ nhất có thể',
        'Không chạy container với root user, giới hạn capabilities, dùng read-only filesystem — giảm blast radius nếu bị compromise',
        'Không expose port nào ra ngoài',
        'Tắt logging để giảm attack surface',
      ],
      answer: 1,
      explanation: 'Container Security: 1) Non-root user: USER node trong Dockerfile (không chạy process với root — compromise không có full host access). 2) Read-only filesystem: --read-only (thêm tmpfs cho /tmp nếu cần). 3) Drop capabilities: --cap-drop=ALL --cap-add=NET_BIND_SERVICE. 4) No privileged: tránh --privileged. 5) Image security: scan với Trivy, Snyk, Clair (tìm CVE trong base image). 6) Secrets: mount qua Docker Secrets/K8s Secrets, không ENV trong image. 7) Network policies: K8s NetworkPolicy — chỉ allow traffic cần thiết. 8) Immutable tags: tránh :latest, dùng digest. 9) RBAC: K8s role-based access. Supply chain: SBOM (Software Bill of Materials), Sigstore/Cosign (sign images).',
    },
  ],
};

// ─── I3.8 · An toàn thông tin ───────────────────────────────
export const I38_QUIZ = {
  id: 'I3.8-security-quiz',
  title: 'I3.8 · An toàn thông tin — Mật mã, OWASP, Network Security, Pentest',
  kind: 'quiz',
  yearLevel: 3, subject: 'an-toan-thong-tin', difficulty: 3,
  skillsTrained: ['cryptography', 'owasp', 'network-security', 'pentest', 'secure-coding'],
  questions: [
    {
      stem: 'Mã hoá bất đối xứng (Asymmetric Encryption) dùng cặp khoá nào?',
      choices: [
        'Hai khoá giống hệt nhau (shared secret)',
        'Public key (công khai — ai cũng biết) và Private key (bí mật — chỉ chủ sở hữu biết)',
        'Một khoá ngắn cho encrypt và một khoá dài cho decrypt',
        'Khoá được tạo ngẫu nhiên mới mỗi lần giao tiếp',
      ],
      answer: 1,
      explanation: "Asymmetric (Public-Key Cryptography): RSA, ECC (Elliptic Curve), Ed25519. Public key: mã hoá message hoặc verify chữ ký số. Private key: giải mã hoặc ký số. Bất đối xứng: biết public key không suy ra được private key. Ứng dụng: TLS handshake (trao đổi symmetric key an toàn), chữ ký số (code signing, email S/MIME, blockchain), SSH, PGP. Nhược: chậm hơn symmetric → thực tế: dùng asymmetric để exchange symmetric session key (Hybrid encryption). RSA-2048 bit an toàn hiện tại; ECC-256 tương đương nhưng key nhỏ hơn. Quantum computing threat: Shor's algorithm → Post-Quantum Cryptography (NIST PQC: CRYSTALS-Kyber, CRYSTALS-Dilithium).",
    },
    {
      stem: 'OWASP Top 10 — "Broken Access Control" (đứng #1) xảy ra khi nào?',
      choices: [
        'Password quá ngắn ít hơn 8 ký tự',
        'User có thể thực hiện hành động hoặc truy cập resource ngoài quyền hạn được cấp — ví dụ xem dữ liệu user khác bằng cách đổi ID trong URL',
        'Ứng dụng không có HTTPS',
        'Session timeout quá ngắn',
      ],
      answer: 1,
      explanation: 'Broken Access Control: ví dụ IDOR (Insecure Direct Object Reference) — /api/orders/123 → đổi thành /api/orders/124 → xem đơn hàng người khác (nếu server không check ownership). Phòng chống: deny by default, check authorization ở mỗi request (không chỉ dựa UI), log failures, server-side enforcement (không tin client-side check). OWASP Top 10 2021: 1. Broken Access Control, 2. Cryptographic Failures, 3. Injection, 4. Insecure Design, 5. Security Misconfiguration, 6. Vulnerable Components, 7. Auth Failures, 8. Software Integrity Failures, 9. Logging Failures, 10. SSRF. Áp dụng principle of least privilege: cấp đúng quyền cần thiết.',
    },
    {
      stem: 'Cross-Site Scripting (XSS) là lỗ hổng gì và cách phòng chống chính?',
      choices: [
        'Server bị tấn công từ nhiều IP cùng lúc — dùng firewall chặn IP',
        'Kẻ tấn công inject code JavaScript độc hại vào trang web, thực thi trong browser của victim — phòng bằng output encoding và Content Security Policy',
        'Kết nối database bị intercept — dùng TLS để mã hoá',
        'File upload không được kiểm tra — chặn extension nguy hiểm',
      ],
      answer: 1,
      explanation: 'XSS types: Reflected (URL param → page), Stored (lưu DB → hiển thị cho user khác — nguy hiểm nhất), DOM-based (JavaScript manipulate DOM). Impact: đánh cắp cookie/session (document.cookie), keylogging, redirect, defacement, CSRF proxy. Phòng chống: 1) Output Encoding: HTML-encode trước khi render (`<` → `&lt;`) — framework tự động (React, Angular, Django templates). 2) CSP (Content Security Policy): HTTP header chỉ cho phép execute script từ nguồn trusted. 3) HttpOnly cookie: JavaScript không đọc được. 4) Validate input (không đủ — phải kết hợp encoding). DOM-based: dùng textContent thay innerHTML. `eval()` và `setTimeout(string)` = nguy hiểm.',
    },
    {
      stem: 'HTTPS dùng TLS — TLS Handshake thiết lập gì?',
      choices: [
        'Tài khoản và mật khẩu giữa client và server',
        'Shared symmetric session key được trao đổi an toàn qua asymmetric crypto, xác thực server bằng certificate',
        'Địa chỉ IP của server để routing',
        'Phiên bản HTTP protocol (1.1 hay 2)',
      ],
      answer: 1,
      explanation: "TLS 1.3 Handshake (simplified): 1) Client Hello: hỗ trợ cipher suites, TLS version, random nonce. 2) Server Hello: chọn cipher, gửi certificate (X.509 — chứa public key, domain, CA signature). 3) Client verify certificate: CA chain → kiểm tra domain, expiry, revocation (OCSP). 4) Key exchange: ECDHE (Ephemeral Diffie-Hellman) → both derive same session key (forward secrecy). 5) Finished: verify handshake integrity bằng session key. Sau đó: AES-GCM encrypt data với session key. Certificate Authority (CA): Let's Encrypt (miễn phí, automated), DigiCert. Certificate Transparency (CT): log công khai, phát hiện mis-issuance. HSTS: browser chỉ dùng HTTPS cho domain.",
    },
    {
      stem: 'Password hashing — tại sao phải dùng bcrypt/Argon2 thay vì SHA-256?',
      choices: [
        'SHA-256 không thể hash password vì chỉ dùng cho file integrity',
        'bcrypt/Argon2 có salt tự động và cost factor điều chỉnh được (chậm có chủ ý) — SHA-256 quá nhanh nên brute-force/rainbow table dễ dàng',
        'SHA-256 output ngắn hơn nên không đủ an toàn',
        'bcrypt mã hoá 2 chiều có thể giải mã, SHA-256 một chiều không giải mã được',
      ],
      answer: 1,
      explanation: 'SHA-256: cực nhanh (hàng tỉ hash/giây trên GPU) → rainbow table attack, brute-force dễ. bcrypt: dùng Blowfish cipher, built-in salt (random per password — tránh rainbow table), work factor (cost) → mỗi hash ~100ms → brute-force 10 tỉ lần chậm hơn. Argon2 (winner PHC 2015): memory-hard (tốn RAM) → kháng GPU/ASIC attack tốt hơn. scrypt: cũng memory-hard. NIST SP 800-63B: dùng Argon2/bcrypt/scrypt/PBKDF2. KHÔNG dùng: MD5, SHA-1, SHA-256 trực tiếp, base64 encoding, symmetric encryption cho password (reversible → key leak = all passwords leak). Pepper: secret thêm vào ngoài salt (lưu ở env, không DB).',
    },
    {
      stem: 'Network attack "Man-in-the-Middle" (MitM) là gì?',
      choices: [
        'Tấn công từ chối dịch vụ bằng cách làm tràn băng thông',
        'Kẻ tấn công chèn vào giữa giao tiếp của 2 bên, có thể nghe lén và/hoặc sửa đổi dữ liệu mà không bị phát hiện',
        'Khai thác lỗ hổng trong SQL database',
        'Dùng dictionary attack để đoán password',
      ],
      answer: 1,
      explanation: 'MitM: attacker intercept và relay communication. Kỹ thuật: ARP Spoofing (local network — fake ARP reply, redirect traffic qua attacker), SSL Stripping (downgrade HTTPS→HTTP), DNS Spoofing (fake DNS response → redirect đến malicious IP), Rogue WiFi Hotspot. Phòng chống: HTTPS (TLS) + certificate validation, HSTS (HTTP Strict Transport Security), Certificate Pinning (mobile app — pin expected cert/public key, reject unexpected), DNSSEC. Wireshark: packet capture tool — dùng cho legitimate network debugging. SSL/TLS không chống được phishing domain (chỉ chứng minh server là chủ cert, không chứng minh legitimate). PKI (Public Key Infrastructure): trust chain qua CA.',
    },
    {
      stem: 'Penetration Testing (Pentest) — giai đoạn "Reconnaissance" là gì?',
      choices: [
        'Khai thác lỗ hổng đã phát hiện để chiếm quyền truy cập',
        'Thu thập thông tin về mục tiêu (domain, IP, email, tech stack, employees) trước khi tấn công',
        'Viết báo cáo kết quả pentest',
        'Xóa dấu vết sau khi xâm nhập',
      ],
      answer: 1,
      explanation: 'Pentest phases (PTES): 1) Pre-engagement (scope, rules of engagement). 2) Reconnaissance/OSINT: passive (Google dorking, Shodan, LinkedIn, WHOIS, Wayback Machine) và active (port scan — Nmap, service enumeration). 3) Scanning & Vulnerability Assessment: Nessus, OpenVAS. 4) Exploitation: Metasploit, custom exploits. 5) Post-exploitation: privilege escalation, lateral movement, persistence, data exfiltration. 6) Reporting: findings + severity + remediation. Types: Black box (no info), White box (full info), Gray box. Red Team: full attack simulation, long duration. Bug Bounty: crowdsourced pentest với reward. OWASP Testing Guide, PTES, NIST 800-115 frameworks. Authorized testing only!',
    },
    {
      stem: 'SQL Injection — Union-based attack dùng để làm gì?',
      choices: [
        'Xoá toàn bộ bảng trong database',
        'Kết hợp kết quả query độc hại với query hợp lệ để extract data từ bảng khác của database',
        'Bypass authentication bằng cách inject OR 1=1',
        'Tạo tài khoản admin mới trong database',
      ],
      answer: 1,
      explanation: "SQL Injection variants: 1) Classic/Error-based: error message leak database info. 2) Union-based: `' UNION SELECT username, password FROM users --` → merge kết quả với query gốc. 3) Blind: boolean (true/false response khác nhau) hoặc time-based (SLEEP()). 4) Out-of-band: DNS/HTTP lookup. Khai thác: extract schema (information_schema), dump table, privilege escalation (xp_cmdshell SQL Server). sqlmap: tool tự động phát hiện và khai thác SQLi. Phòng: Prepared Statements (biện pháp #1), stored procedures (cẩn thận với dynamic SQL), WAF, least privilege DB user, error handling không lộ stack trace.",
    },
    {
      stem: 'Two-Factor Authentication (2FA) / Multi-Factor Authentication (MFA) kết hợp các yếu tố nào?',
      choices: [
        'Hai password khác nhau cho cùng tài khoản',
        'Ít nhất 2 trong 3 yếu tố: Something you know (password), Something you have (phone/token), Something you are (biometrics)',
        'Hai email xác nhận gửi đến hai địa chỉ khác nhau',
        'Password và câu hỏi bảo mật — vì câu hỏi bảo mật là yếu tố thứ 2',
      ],
      answer: 1,
      explanation: '3 authentication factors: 1) Knowledge: password, PIN, security question (yếu — phishing, guessable). 2) Possession: OTP app (Google Authenticator, Authy — TOTP RFC 6238), hardware token (YubiKey), SMS OTP (yếu hơn — SIM swap attack). 3) Inherence: fingerprint, FaceID, voice. MFA = 2+ factors từ 2+ categories. SMS OTP vẫn tốt hơn không có MFA dù kém TOTP/hardware key. FIDO2/WebAuthn: passwordless — phishing-resistant (key pair per-domain). Passkeys (Apple/Google/Microsoft): FIDO2 với cloud sync. Adaptive MFA: yêu cầu factor thêm khi phát hiện bất thường (new device, new location). Security question KHÔNG phải factor thứ 2 (cũng là knowledge factor).',
    },
    {
      stem: 'Social Engineering attack phổ biến nhất là:',
      choices: [
        'Buffer overflow trong ứng dụng C/C++',
        'Phishing — giả mạo email/website hợp lệ để lừa user tiết lộ credentials hoặc click link độc hại',
        'SQL Injection vào web application',
        'Brute-force tấn công password bằng dictionary',
      ],
      answer: 1,
      explanation: 'Social Engineering: khai thác tâm lý người thay vì lỗ hổng kỹ thuật. Phishing types: Email phishing (mass), Spear Phishing (targeted cá nhân — nghiên cứu kỹ), Whaling (target C-level executives), Smishing (SMS), Vishing (voice call — pretend IT support), Business Email Compromise (BEC — giả CFO yêu cầu chuyển tiền). Pretexting: fabricate scenario. Baiting: USB "miễn phí". Quid pro quo: offer help. Tailgating/Piggybacking: theo vào secure area. Defenses: security awareness training (phishing simulation — KnowBe4), verify requests out-of-band (gọi điện xác nhận), zero-trust ("trust but verify"). Kỹ thuật giỏi nhất vẫn thua social engineering tốt.',
    },
  ],
};
