// ============================================================
// Trường CNTT — Scenarios Năm 3, phần 3/4: I3.5 + I3.6
// ============================================================

// ─── I3.5 · Web Full-stack (Node + React) ───────────────────
export const I35_QUIZ = {
  id: 'I3.5-fullstack-quiz',
  title: 'I3.5 · Web Full-stack — Node.js, React, REST, Auth, Database',
  kind: 'quiz',
  yearLevel: 3, subject: 'web-fullstack', difficulty: 3,
  skillsTrained: ['nodejs', 'react', 'rest-api', 'auth', 'fullstack-patterns'],
  questions: [
    {
      stem: 'Event Loop trong Node.js cho phép Node.js xử lý I/O không đồng bộ mặc dù chỉ có:',
      choices: [
        '4 CPU core dành riêng cho I/O',
        'Một single thread (single-threaded), dùng callback queue và libuv để không block',
        'Worker threads tự động với mỗi request',
        'GPU acceleration cho network I/O',
      ],
      answer: 1,
      explanation: 'Node.js: single-threaded JavaScript runtime, dùng libuv (C++) để xử lý I/O bất đồng bộ ở OS level. Event Loop phases: timers (setTimeout/setInterval) → pending callbacks → idle/prepare → poll (chờ I/O events) → check (setImmediate) → close callbacks. Khi I/O xong → callback vào queue → event loop pick up → execute. Không block thread chính! Phù hợp: I/O-bound (API server, real-time apps). Không phù hợp: CPU-bound (nặng tính toán block thread). Worker Threads: module cho CPU-bound tasks. Cluster module: fork processes để tận dụng multi-core. PM2: process manager cho production.',
    },
    {
      stem: 'React Hook "useEffect" được dùng để làm gì?',
      choices: [
        'Khai báo state mới trong functional component',
        'Xử lý side effects (fetch data, subscribe, DOM manipulation) sau khi component render',
        'Tối ưu hoá rendering bằng memoization',
        'Quản lý routing giữa các pages',
      ],
      answer: 1,
      explanation: 'useEffect(fn, deps): fn chạy sau khi DOM đã update. deps = [] → chạy 1 lần sau mount (componentDidMount). deps = [val] → chạy lại khi val thay đổi. Không có deps → chạy sau mỗi render. Cleanup: return function từ fn → cleanup trước render tiếp hoặc unmount (unsubscribe, clearTimeout). Hooks: useState (local state), useEffect (side effects), useContext (consume context), useReducer (complex state), useMemo (memoize value), useCallback (memoize function), useRef (mutable ref không trigger re-render), custom hooks (tái sử dụng logic). Rules: chỉ gọi top-level, chỉ trong React functions.',
    },
    {
      stem: 'JWT (JSON Web Token) trong authentication — payload được:',
      choices: [
        'Mã hoá AES-256 và chỉ server giải mã được',
        'Base64-encoded (không mã hoá) + signed bằng secret key — ai cũng đọc payload được, nhưng không giả mạo được chữ ký',
        'Hashed một chiều, không thể đọc nội dung',
        'Mã hoá bất đối xứng RSA, chỉ client giải mã được bằng public key',
      ],
      answer: 1,
      explanation: 'JWT: header.payload.signature. Header + Payload: base64url-encoded — có thể decode mà không cần secret! Vì vậy KHÔNG đặt sensitive data (password, PII) trong payload. Signature: HMAC_SHA256(base64url(header)+"."+base64url(payload), secret) → xác thực tính toàn vẹn. Stateless: server không cần lưu session — chỉ verify signature. Access Token: ngắn (15min); Refresh Token: dài (7 ngày), lưu httpOnly cookie. Nhược: không revoke được (phải chờ expire hoặc dùng blacklist). Session vs JWT: session lưu server-side, JWT stateless. HTTPS bắt buộc (token bị sniff → stolen). JWE: JWT mã hoá thật sự (ít dùng hơn JWS).',
    },
    {
      stem: 'Trong React, "prop drilling" là vấn đề gì và giải pháp là gì?',
      choices: [
        'Hiệu năng chậm khi truyền quá nhiều data qua props',
        'Phải truyền props qua nhiều tầng component trung gian không dùng đến — giải quyết bằng Context API hoặc state management (Redux, Zustand)',
        'React không cho phép truyền function qua props',
        'Props bị đột biến (mutate) bởi component con',
      ],
      answer: 1,
      explanation: 'Prop drilling: ComponentA (có data) → ComponentB → ComponentC → ComponentD (cần data) — B và C chỉ là "pipe", không dùng data nhưng phải nhận và truyền tiếp → khó maintain. Giải pháp: 1) React Context: createContext → Provider wraps tree → useContext ở consumer (tốt cho theme, locale, auth). 2) Redux: centralized store, actions, reducers — phức tạp hơn nhưng cho large app. 3) Zustand/Jotai/Recoil: simpler state management. 4) Composition (component composition): render children/render props. Khi nào dùng global state: auth, theme, cart (user-wide). Khi nào local state đủ: form input, toggle, UI state.',
    },
    {
      stem: 'SQL Injection được phòng chống hiệu quả nhất bằng cách:',
      choices: [
        'Mã hoá database password',
        'Dùng Prepared Statements / Parameterized Queries — input được tách biệt khỏi SQL command',
        'Validate độ dài input tối đa',
        'Dùng HTTPS thay HTTP',
      ],
      answer: 1,
      explanation: "SQL Injection: input độc hại phá vỡ cấu trúc SQL. Ví dụ: `SELECT * FROM users WHERE username = '${input}'` — input = `' OR 1=1 --` → bypass auth. Prepared Statement: `db.prepare(\"SELECT * FROM users WHERE username = ?\").get(input)` — input là data, không được interpret là SQL. ORM (Sequelize, Prisma): tự dùng prepared statements. Validation bổ sung nhưng không đủ (bypass được). Least Privilege: DB user chỉ có quyền cần thiết. WAF (Web Application Firewall) phát hiện nhưng không thay thế Prepared Statements. OWASP Top 10: Injection là #1 lâu năm (nay #3 sau Broken Access Control và Cryptographic Failures).",
    },
    {
      stem: 'React Virtual DOM hoạt động như thế nào để tối ưu rendering?',
      choices: [
        'React render trực tiếp lên canvas thay vì DOM để nhanh hơn',
        'React giữ bản sao lightweight của DOM trong memory, so sánh (diffing) khi state đổi, chỉ cập nhật phần thực sự thay đổi trong real DOM',
        'React lazy load mọi component để tránh render không cần thiết',
        'React dùng Web Workers để render trên thread riêng',
      ],
      answer: 1,
      explanation: 'Virtual DOM (VDOM): tree structure JavaScript thuần (không phải browser DOM API). Khi state/props đổi → React tạo VDOM mới → Reconciliation/Diffing algorithm (O(n) thay vì O(n³) nhờ heuristics: same type = update, different type = replace; key prop cho list) → so sánh VDOM cũ và mới → Commit Phase: chỉ update những DOM nodes thực sự thay đổi. Real DOM mutation tốn kém (reflow, repaint); VDOM diff rẻ hơn nhiều. React Fiber (React 16+): reconciler mới, interruptible rendering, prioritized updates. React 18: Concurrent Mode, startTransition, Suspense cải tiến.',
    },
    {
      stem: 'Express.js middleware hoạt động theo nguyên tắc nào?',
      choices: [
        'Chạy song song, xử lý request đồng thời',
        'Hàm có signature (req, res, next) được gọi tuần tự — next() chuyển sang middleware tiếp, không gọi next() thì dừng chain',
        'Chỉ chạy khi có lỗi (error-only)',
        'Middleware chạy ở client (browser), không phải server',
      ],
      answer: 1,
      explanation: 'Express middleware: fn(req, res, next). Ứng dụng: logging (Morgan), parsing (express.json()), authentication, CORS headers, rate limiting, error handling. Thứ tự quan trọng: đăng ký theo thứ tự, middleware nào đăng ký trước chạy trước. Error handling middleware: 4 tham số (err, req, res, next) — đặt cuối cùng. Route-level vs Application-level. next("route") skip các handler khác của route hiện tại. Ví dụ auth middleware: kiểm tra JWT → nếu valid: gắn user vào req.user rồi next() → nếu invalid: res.status(401).json({error: "Unauthorized"}) (không gọi next). Router: express.Router() nhóm routes.',
    },
    {
      stem: 'WebSocket khác HTTP ở điểm chính nào?',
      choices: [
        'WebSocket dùng UDP, HTTP dùng TCP',
        'WebSocket cho phép giao tiếp hai chiều (full-duplex) liên tục trên một kết nối; HTTP là request-response, server không chủ động push',
        'WebSocket mã hoá tốt hơn HTTP',
        'WebSocket chỉ chạy trên localhost, HTTP chạy qua internet',
      ],
      answer: 1,
      explanation: 'HTTP: stateless, request-response — client gửi, server trả lời, kết nối đóng. Polling: client hỏi liên tục (waste bandwidth). Long-polling: server giữ request đến khi có data. WebSocket: handshake HTTP → upgrade → full-duplex persistent connection. Server có thể push bất cứ lúc nào. Dùng cho: chat, live notifications, multiplayer game, live dashboard, collaborative editing. Socket.IO: abstraction over WebSocket + fallback. Server-Sent Events (SSE): server-to-client only, đơn giản hơn, tự reconnect. wss:// = WebSocket over TLS (như HTTPS).',
    },
    {
      stem: 'Docker container giải quyết vấn đề gì trong phát triển phần mềm?',
      choices: [
        'Tăng tốc compile time cho các ngôn ngữ biên dịch',
        '"Works on my machine" problem — đóng gói app + dependencies + config thành image chạy nhất quán mọi môi trường',
        'Tự động viết unit test cho code mới',
        'Nén source code để giảm dung lượng deploy',
      ],
      answer: 1,
      explanation: 'Docker: containerization — không phải virtualization. Container: isolated process, share OS kernel (nhẹ hơn VM). Image: immutable template (Dockerfile). Container: running instance của image. Dockerfile: FROM (base image) → RUN (commands) → COPY → EXPOSE → CMD. Layer caching: mỗi instruction là layer, cache nếu không thay đổi. .dockerignore: bỏ qua file thừa. Docker Compose: multi-container app (app + db + redis). Volumes: persistent data. Networks: container communication. Registry: Docker Hub, ECR, GCR. Production: Kubernetes (K8s) orchestrate nhiều containers. Immutable infrastructure: rebuild image thay vì patch in-place.',
    },
    {
      stem: 'Next.js cải tiến React thuần (Create React App) ở điểm nào quan trọng nhất?',
      choices: [
        'Next.js dùng Vue.js thay vì React cho performance tốt hơn',
        'Server-Side Rendering (SSR), Static Site Generation (SSG), file-based routing, API routes — SEO tốt hơn và First Contentful Paint nhanh hơn',
        'Next.js không cần JavaScript phía client',
        'Next.js tự động viết CSS và không cần styling',
      ],
      answer: 1,
      explanation: 'CRA (Client-Side Rendering): HTML shell → JS bundle tải và render → SEO kém (crawler thấy blank page), slow FCP. Next.js SSR: server render HTML đầy đủ → gửi về client → hydrate (gắn event listeners). SSG: render lúc build time → CDN serve HTML tĩnh (nhanh nhất). ISR (Incremental Static Regeneration): regenerate trang theo interval. App Router (Next.js 13+): Server Components (render trên server, không ship JS), Client Components (interactive). API Routes: backend endpoint trong cùng project. Middleware: Edge Runtime. Vercel: deploy Next.js zero-config. Hệ sinh thái: Prisma, tRPC, NextAuth, Tailwind.',
    },
  ],
};

// ─── I3.6 · Mobile Dev (Android/iOS) ────────────────────────
export const I36_QUIZ = {
  id: 'I3.6-mobile-quiz',
  title: 'I3.6 · Mobile Dev — Android, iOS, React Native, Flutter, UX Mobile',
  kind: 'quiz',
  yearLevel: 3, subject: 'mobile-dev', difficulty: 3,
  skillsTrained: ['android', 'ios', 'cross-platform', 'mobile-ux', 'mobile-api'],
  questions: [
    {
      stem: 'React Native khác Native Android/iOS development ở điểm nào?',
      choices: [
        'React Native viết CSS, Native dùng XML layout',
        'React Native dùng JavaScript/TypeScript để viết UI components cross-platform; Native dùng Kotlin/Java (Android) hoặc Swift/ObjC (iOS) riêng cho từng platform',
        'React Native không thể truy cập camera và GPS',
        'React Native chỉ chạy trên iOS',
      ],
      answer: 1,
      explanation: 'React Native: "Write once, run anywhere (mostly)". JS bridge → Native UI components (không phải WebView). Lợi ích: 1 codebase, developer web có thể làm mobile, fast refresh. Nhược: bridge overhead (cải thiện với New Architecture/JSI), không phải 100% native performance, một số feature cần native module riêng. Flutter (Google): Dart, render bằng Skia engine riêng (pixel perfect), performance gần native, hot reload. Kotlin Multiplatform Mobile (KMM): share business logic, native UI. Native: best performance, full API access, platform conventions, nhưng 2 team/2 codebase. Expo: managed workflow cho React Native, đơn giản hóa setup.',
    },
    {
      stem: 'Android Activity Lifecycle — onPause() được gọi khi nào?',
      choices: [
        'Khi user nhấn back button và Activity bị destroy',
        'Khi Activity mất focus nhưng còn visible một phần (dialog, popup) hoặc system cần tài nguyên',
        'Khi user xoay màn hình (orientation change)',
        'Khi app được khởi động lần đầu',
      ],
      answer: 1,
      explanation: 'Android Activity Lifecycle: onCreate → onStart → onResume → [active] → onPause → onStop → onDestroy. onPause: Activity mất focus (dialog overlay, multi-window, switching app). Nên: dừng animations, lưu unsaved data, giải phóng resources cần exclusive access (camera). onStop: Activity không còn visible (user switched app). onDestroy: Activity bị destroy (finish() gọi hoặc system reclaim). onSaveInstanceState: lưu UI state trước khi destroy. onRestoreInstanceState: khôi phục. Xoay màn hình: onPause → onStop → onDestroy → onCreate (trừ khi configChanges trong manifest). ViewModel + LiveData tồn tại qua config changes.',
    },
    {
      stem: 'iOS Swift — "optionals" là gì?',
      choices: [
        'Các tham số function có thể bỏ qua',
        'Kiểu dữ liệu có thể có giá trị hoặc nil (không có giá trị) — Swift yêu cầu xử lý rõ ràng để tránh nil dereference crash',
        'Các file Swift không bắt buộc phải có trong project',
        'Constants không thể thay đổi sau khi khai báo',
      ],
      answer: 1,
      explanation: 'Swift Optionals: String? = có thể là String hoặc nil. Nil safety: Swift compiler bắt lỗi compile-time thay vì crash runtime (khác Obj-C). Unwrap options: 1) if let: `if let name = optName { use name }` — safe. 2) guard let: `guard let name = optName else { return }`. 3) Force unwrap: `name!` — crash nếu nil (tránh dùng). 4) Nil coalescing: `name ?? "default"`. 5) Optional chaining: `user?.address?.city`. Optional map: `optNumber.map { $0 * 2 }`. So sánh: Kotlin Nullable Types (`String?`, `?.`, `?:`), Java Optional<T>. Tất cả đều giải quyết Null Pointer Exception (Tony Hoare: "billion dollar mistake").',
    },
    {
      stem: 'Push Notification trên mobile — FCM (Firebase Cloud Messaging) hoạt động như thế nào?',
      choices: [
        'App liên tục poll server để kiểm tra notification mới',
        'Server gửi notification đến FCM → FCM push đến thiết bị qua persistent connection; app nhận kể cả khi đang background/closed',
        'Notification chỉ đến khi user mở app',
        'FCM dùng SMS gateway để gửi notification dạng tin nhắn',
      ],
      answer: 1,
      explanation: 'Push Notification flow: 1) App đăng ký → nhận Device Token từ FCM (Android) / APNs (iOS). 2) App gửi token đến backend server. 3) Server muốn notify → gửi message đến FCM/APNs kèm token. 4) FCM/APNs push đến thiết bị qua persistent encrypted connection. 5) OS nhận → hiển thị notification / wake app. Data vs Notification message: notification message hiển thị tự động; data message app xử lý. iOS: phải xin permission trước. Background modes: silent push (content-available) để update data ngầm. Topic-based: broadcast cho group users. Alternatives: OneSignal, AWS SNS.',
    },
    {
      stem: 'Mobile app "battery drain" thường do nguyên nhân nào trong code?',
      choices: [
        'Dùng quá nhiều màu trên UI',
        'Excessive wake locks, GPS liên tục, network polling thường xuyên, background processing không kiểm soát',
        'Dùng nhiều hình ảnh PNG thay vì WebP',
        'Màn hình resolution quá cao',
      ],
      answer: 1,
      explanation: 'Battery drain nguyên nhân code: 1) Location: HIGH_ACCURACY GPS (tốn nhất) → dùng BALANCED_POWER hoặc passive khi không cần realtime. 2) Network: polling thay vì push → dùng JobScheduler/WorkManager (Android) hoặc BGTaskScheduler (iOS) để batch network requests. 3) Wake locks: giữ CPU awake → phải release sau khi xong. 4) Background tasks: chạy liên tục → chỉ chạy khi cần, dùng Doze Mode friendly APIs. 5) Sensor: camera, microphone, accelerometer liên tục. Android Battery Optimization: Doze Mode (idle → restrict background), App Standby. iOS Background App Refresh: limited. Android Vitals / iOS Instruments: monitor battery usage.',
    },
    {
      stem: 'Jetpack Compose (Android) và SwiftUI thay thế gì?',
      choices: [
        'Kotlin và Swift — dùng Java và Obj-C thay thế',
        'XML layouts (Android) và UIKit Storyboards (iOS) — sang declarative UI framework theo state-driven paradigm',
        'REST API → GraphQL',
        'SQLite → Room database',
      ],
      answer: 1,
      explanation: 'Declarative UI: mô tả UI TRÔNG NHƯ THẾ NÀO khi state X, framework tự update khi state đổi. Imperative (cũ): code step-by-step CHỈ ĐỊNH cập nhật gì (findViewByID, setText, setVisibility). Jetpack Compose: Composable functions, @Composable, remember/mutableStateOf, LaunchedEffect, State hoisting. SwiftUI: View protocol, @State, @Binding, @ObservedObject, @EnvironmentObject. Ưu điểm: ít boilerplate, preview realtime, easier animation, testable, same language (không XML riêng). Nhược: API còn trưởng thành (đặc biệt Compose), learning curve. React Native inspiration từ React declarative model. Flutter cũng declarative (Widget tree).',
    },
    {
      stem: 'Trong phát triển mobile, "Deep Link" là gì?',
      choices: [
        'Link đến tầng database của app',
        'URL/scheme cho phép mở app trực tiếp đến màn hình cụ thể từ web, email, hay app khác',
        'Kết nối mạng tốc độ cao dành riêng cho app',
        'Link tải app từ App Store/Play Store',
      ],
      answer: 1,
      explanation: 'Deep Link: myapp://product/123 → mở app đến trang product 123. Types: 1) Custom URI scheme: myapp:// — đơn giản nhưng bị chặn iOS 9+ nếu app chưa cài. 2) Universal Links (iOS) / App Links (Android): https://domain.com/product/123 → nếu app cài thì mở app, không thì mở browser — seamless experience. 3) Deferred Deep Link: link đến App Store, sau khi install → mở đúng trang (Firebase Dynamic Links). Use cases: marketing campaigns, email CTAs, sharing content, app-to-app navigation. Branch.io, Adjust: deep link analytics. Handling: intent-filter (Android manifest), Associated Domains + AASA file (iOS).',
    },
    {
      stem: 'App Store Optimization (ASO) và Play Store Optimization tương tự với:',
      choices: [
        'Unit testing của ứng dụng',
        'SEO (Search Engine Optimization) nhưng cho app stores — tối ưu title, description, keywords, ratings để tăng discoverability',
        'Code optimization để giảm app size',
        'A/B testing UI của app',
      ],
      answer: 1,
      explanation: 'ASO: tương tự SEO cho organic discovery trong stores. Yếu tố: 1) Title (quan trọng nhất — include keywords tự nhiên). 2) Subtitle (iOS) / Short Description (Android). 3) Keywords field (iOS — 100 ký tự). 4) Description (đoạn đầu quan trọng nhất). 5) Ratings & Reviews: ảnh hưởng ranking lớn → in-app review prompt (SKStoreReviewRequest iOS, Review API Android) đúng thời điểm. 6) Screenshots & Previews video: conversion rate. 7) App category. Localization: dịch listing cho từng thị trường. App Store ranking algorithm: downloads velocity, ratings, engagement. Tools: AppFollow, Sensor Tower, AppAnnie (data.ai).',
    },
    {
      stem: 'Retrofit (Android) là gì?',
      choices: [
        'Framework UI cho Android thay thế XML',
        'Type-safe HTTP client cho Android — khai báo API interface với annotations, tự generate implementation',
        'Testing framework cho unit test trên Android',
        'Database ORM thay thế Room',
      ],
      answer: 1,
      explanation: 'Retrofit (Square): @GET("/users/{id}"), @POST, @Body, @Query, @Header — annotation-based, compile-time safety. Tự generate HTTP calls. Converters: Gson/Moshi (JSON → object), Kotlin Serialization. Coroutine support: suspend function trả về response. Interceptors (OkHttp): logging, auth header, retry, offline cache. iOS equivalent: URLSession (built-in), Alamofire (popular library). Kotlin Coroutines + Flow: xử lý async, replace callbacks và RxJava. Error handling: try-catch với suspend, onFailure. Timeout, retry logic. MVVM + Repository Pattern: ViewModel → Repository → Retrofit/Room → ViewModel (observe) → UI.',
    },
    {
      stem: 'Mobile app testing — "Monkey Testing" là gì?',
      choices: [
        'Test do các lập trình viên trẻ thiếu kinh nghiệm thực hiện',
        'Tự động random input/gestures vào app để tìm crashes — kiểm tra stability trong điều kiện ngẫu nhiên',
        'Test giao diện UI bằng cách so sánh screenshot',
        'Test hiệu năng dưới tải cao',
      ],
      answer: 1,
      explanation: 'Monkey Testing: UI Automator Monkey (Android) gửi random events (tap, swipe, key) → tìm crash, ANR (App Not Responding). Không test business logic — chỉ stability. Android Testing: Unit Test (JUnit + Mockito), Integration Test (Room Test), UI Test (Espresso — deterministic), UI Test (UI Automator — cross-app). iOS Testing: XCTest (unit + UI), XCUITest. Robolectric: chạy Android test trên JVM không cần emulator. Firebase Test Lab: test trên cloud device farm. Screenshot testing: Paparazzi (Android), XCTest snapshots (iOS) — detect unintended UI changes. TestFlight (iOS), Firebase App Distribution (Android): beta testing với real users.',
    },
  ],
};
