// ============================================================
//  Từ vựng Tiếng Anh chuyên ngành — nguồn seed cho collection 'vocab-en'.
//  Mỗi phần tử = 1 CHỦ ĐỀ: { topic, label, words:[{w,pos,ph,v,ex}] }.
//  Trang /tu-vung-tieng-anh (Next) đọc qua /api/content/vocab-en. Sửa: seed lại file này.
// ============================================================

export const VOCAB_EN_TOPICS = [
  {
    "topic": "cntt",
    "label": "💻 Công nghệ thông tin",
    "words": [
      {
        "w": "algorithm",
        "pos": "noun",
        "ph": "/ˈæl.ɡə.rɪð.əm/",
        "v": "thuật toán",
        "ex": "A sorting algorithm arranges data in order."
      },
      {
        "w": "database",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə.beɪs/",
        "v": "cơ sở dữ liệu",
        "ex": "User accounts are stored in the database."
      },
      {
        "w": "encryption",
        "pos": "noun",
        "ph": "/ɪnˈkrɪp.ʃən/",
        "v": "sự mã hoá",
        "ex": "Encryption protects data from hackers."
      },
      {
        "w": "framework",
        "pos": "noun",
        "ph": "/ˈfreɪm.wɜːk/",
        "v": "nền tảng/bộ khung",
        "ex": "React is a popular front-end framework."
      },
      {
        "w": "compiler",
        "pos": "noun",
        "ph": "/kəmˈpaɪ.lər/",
        "v": "trình biên dịch",
        "ex": "The compiler turns source code into machine code."
      },
      {
        "w": "debug",
        "pos": "verb",
        "ph": "/ˌdiːˈbʌɡ/",
        "v": "gỡ lỗi",
        "ex": "It took hours to debug the login error."
      },
      {
        "w": "deploy",
        "pos": "verb",
        "ph": "/dɪˈplɔɪ/",
        "v": "triển khai (lên máy chủ)",
        "ex": "We deploy the app every Friday."
      },
      {
        "w": "repository",
        "pos": "noun",
        "ph": "/rɪˈpɒz.ɪ.tər.i/",
        "v": "kho lưu trữ mã",
        "ex": "Push your code to the Git repository."
      },
      {
        "w": "bandwidth",
        "pos": "noun",
        "ph": "/ˈbænd.wɪdθ/",
        "v": "băng thông",
        "ex": "Video streaming needs high bandwidth."
      },
      {
        "w": "latency",
        "pos": "noun",
        "ph": "/ˈleɪ.tən.si/",
        "v": "độ trễ",
        "ex": "Low latency is vital for online games."
      },
      {
        "w": "firewall",
        "pos": "noun",
        "ph": "/ˈfaɪə.wɔːl/",
        "v": "tường lửa",
        "ex": "A firewall blocks unauthorized access."
      },
      {
        "w": "backend",
        "pos": "noun",
        "ph": "/ˈbæk.end/",
        "v": "phần máy chủ (hậu trường)",
        "ex": "The backend handles the business logic."
      },
      {
        "w": "frontend",
        "pos": "noun",
        "ph": "/ˈfrʌnt.end/",
        "v": "phần giao diện người dùng",
        "ex": "The frontend is built with HTML and CSS."
      },
      {
        "w": "query",
        "pos": "noun",
        "ph": "/ˈkwɪə.ri/",
        "v": "truy vấn",
        "ex": "This query returns all active users."
      },
      {
        "w": "variable",
        "pos": "noun",
        "ph": "/ˈveə.ri.ə.bəl/",
        "v": "biến",
        "ex": "Store the result in a variable."
      },
      {
        "w": "function",
        "pos": "noun",
        "ph": "/ˈfʌŋk.ʃən/",
        "v": "hàm",
        "ex": "Write a function to calculate the sum."
      },
      {
        "w": "array",
        "pos": "noun",
        "ph": "/əˈreɪ/",
        "v": "mảng",
        "ex": "An array can hold many values."
      },
      {
        "w": "cache",
        "pos": "noun",
        "ph": "/kæʃ/",
        "v": "bộ nhớ đệm",
        "ex": "The cache makes the page load faster."
      },
      {
        "w": "server",
        "pos": "noun",
        "ph": "/ˈsɜː.vər/",
        "v": "máy chủ",
        "ex": "The server is down for maintenance."
      },
      {
        "w": "protocol",
        "pos": "noun",
        "ph": "/ˈprəʊ.tə.kɒl/",
        "v": "giao thức",
        "ex": "HTTP is a web protocol."
      },
      {
        "w": "authentication",
        "pos": "noun",
        "ph": "/ɔːˌθen.tɪˈkeɪ.ʃən/",
        "v": "sự xác thực",
        "ex": "Two-factor authentication adds security."
      },
      {
        "w": "scalable",
        "pos": "adj",
        "ph": "/ˈskeɪ.lə.bəl/",
        "v": "có khả năng mở rộng",
        "ex": "A scalable system handles more users easily."
      },
      {
        "w": "iteration",
        "pos": "noun",
        "ph": "/ˌɪt.əˈreɪ.ʃən/",
        "v": "vòng lặp / lần lặp",
        "ex": "Each iteration improves the model."
      },
      {
        "w": "recursion",
        "pos": "noun",
        "ph": "/rɪˈkɜː.ʒən/",
        "v": "đệ quy",
        "ex": "Recursion solves a problem by calling itself."
      },
      {
        "w": "bug",
        "pos": "noun",
        "ph": "/bʌɡ/",
        "v": "lỗi phần mềm",
        "ex": "The team fixed a critical bug."
      },
      {
        "w": "software",
        "pos": "noun",
        "ph": "/ˈsɒft.weər/",
        "v": "phần mềm",
        "ex": "Update your software regularly."
      },
      {
        "w": "hardware",
        "pos": "noun",
        "ph": "/ˈhɑːd.weər/",
        "v": "phần cứng",
        "ex": "The new hardware is much faster."
      },
      {
        "w": "network",
        "pos": "noun",
        "ph": "/ˈnet.wɜːk/",
        "v": "mạng",
        "ex": "The whole office shares one network."
      },
      {
        "w": "syntax",
        "pos": "noun",
        "ph": "/ˈsɪn.tæks/",
        "v": "cú pháp",
        "ex": "A missing comma is a syntax error."
      },
      {
        "w": "runtime",
        "pos": "noun",
        "ph": "/ˈrʌn.taɪm/",
        "v": "thời gian chạy",
        "ex": "The error appears at runtime."
      },
      {
        "w": "interface",
        "pos": "noun",
        "ph": "/ˈɪn.tə.feɪs/",
        "v": "giao diện / interface",
        "ex": "The API defines a clear interface."
      },
      {
        "w": "parameter",
        "pos": "noun",
        "ph": "/pəˈræm.ɪ.tər/",
        "v": "tham số",
        "ex": "Pass the file name as a parameter."
      },
      {
        "w": "loop",
        "pos": "noun",
        "ph": "/luːp/",
        "v": "vòng lặp",
        "ex": "A loop repeats the same block of code."
      },
      {
        "w": "binary",
        "pos": "adj",
        "ph": "/ˈbaɪ.nər.i/",
        "v": "nhị phân",
        "ex": "Computers store data in binary."
      },
      {
        "w": "virtual",
        "pos": "adj",
        "ph": "/ˈvɜː.tʃu.əl/",
        "v": "ảo",
        "ex": "We met in a virtual classroom."
      },
      {
        "w": "cloud",
        "pos": "noun",
        "ph": "/klaʊd/",
        "v": "điện toán đám mây",
        "ex": "The files are stored in the cloud."
      },
      {
        "w": "backup",
        "pos": "noun",
        "ph": "/ˈbæk.ʌp/",
        "v": "bản sao lưu",
        "ex": "Make a backup before the update."
      },
      {
        "w": "malware",
        "pos": "noun",
        "ph": "/ˈmæl.weər/",
        "v": "phần mềm độc hại",
        "ex": "Antivirus software detects malware."
      },
      {
        "w": "patch",
        "pos": "noun",
        "ph": "/pætʃ/",
        "v": "bản vá lỗi",
        "ex": "Install the security patch today."
      },
      {
        "w": "token",
        "pos": "noun",
        "ph": "/ˈtəʊ.kən/",
        "v": "mã thông báo (token)",
        "ex": "The login token expires in one hour."
      },
      {
        "w": "render",
        "pos": "verb",
        "ph": "/ˈren.dər/",
        "v": "kết xuất / hiển thị",
        "ex": "The browser renders the page."
      },
      {
        "w": "operating system",
        "pos": "noun",
        "ph": "/ˈɒp.ər.eɪ.tɪŋ ˌsɪs.təm/",
        "v": "hệ điều hành",
        "ex": "Linux is a free operating system."
      },
      {
        "w": "browser",
        "pos": "noun",
        "ph": "/ˈbraʊ.zər/",
        "v": "trình duyệt",
        "ex": "Open the link in your browser."
      },
      {
        "w": "download",
        "pos": "verb",
        "ph": "/ˌdaʊnˈləʊd/",
        "v": "tải xuống",
        "ex": "Download the file before the meeting."
      },
      {
        "w": "upload",
        "pos": "verb",
        "ph": "/ˌʌpˈləʊd/",
        "v": "tải lên",
        "ex": "Upload your homework to the portal."
      },
      {
        "w": "install",
        "pos": "verb",
        "ph": "/ɪnˈstɔːl/",
        "v": "cài đặt",
        "ex": "Install the app from the official store."
      },
      {
        "w": "configuration",
        "pos": "noun",
        "ph": "/kənˌfɪɡ.əˈreɪ.ʃən/",
        "v": "cấu hình",
        "ex": "Check the server configuration first."
      },
      {
        "w": "storage",
        "pos": "noun",
        "ph": "/ˈstɔː.rɪdʒ/",
        "v": "bộ nhớ lưu trữ",
        "ex": "My phone is running out of storage."
      },
      {
        "w": "memory",
        "pos": "noun",
        "ph": "/ˈmem.ər.i/",
        "v": "bộ nhớ (RAM)",
        "ex": "The program uses too much memory."
      },
      {
        "w": "processor",
        "pos": "noun",
        "ph": "/ˈprəʊ.ses.ər/",
        "v": "bộ vi xử lý",
        "ex": "A faster processor speeds up the laptop."
      },
      {
        "w": "open source",
        "pos": "adj",
        "ph": "/ˌəʊ.pən ˈsɔːs/",
        "v": "mã nguồn mở",
        "ex": "The project uses open source libraries."
      },
      {
        "w": "virtual machine",
        "pos": "noun",
        "ph": "/ˌvɜː.tʃu.əl məˈʃiːn/",
        "v": "máy ảo",
        "ex": "Test the code in a virtual machine."
      },
      {
        "w": "container",
        "pos": "noun",
        "ph": "/kənˈteɪ.nər/",
        "v": "container (đóng gói ứng dụng)",
        "ex": "Each service runs in its own container."
      },
      {
        "w": "plugin",
        "pos": "noun",
        "ph": "/ˈplʌɡ.ɪn/",
        "v": "phần mở rộng",
        "ex": "This plugin adds spell checking."
      },
      {
        "w": "thread",
        "pos": "noun",
        "ph": "/θred/",
        "v": "luồng xử lý",
        "ex": "The app runs tasks on separate threads."
      },
      {
        "w": "exception",
        "pos": "noun",
        "ph": "/ɪkˈsep.ʃən/",
        "v": "ngoại lệ (lỗi khi chạy)",
        "ex": "The code throws an exception on bad input."
      },
      {
        "w": "script",
        "pos": "noun",
        "ph": "/skrɪpt/",
        "v": "đoạn mã kịch bản",
        "ex": "A small script backs up the files nightly."
      },
      {
        "w": "terminal",
        "pos": "noun",
        "ph": "/ˈtɜː.mɪ.nəl/",
        "v": "cửa sổ dòng lệnh",
        "ex": "Type the command in the terminal."
      },
      {
        "w": "command",
        "pos": "noun",
        "ph": "/kəˈmɑːnd/",
        "v": "câu lệnh",
        "ex": "This command lists all the files."
      },
      {
        "w": "automation",
        "pos": "noun",
        "ph": "/ˌɔː.təˈmeɪ.ʃən/",
        "v": "tự động hoá",
        "ex": "Automation saves hours of manual work."
      },
      {
        "w": "firmware",
        "pos": "noun",
        "ph": "/ˈfɜːm.weər/",
        "v": "phần sụn",
        "ex": "Update the router firmware for security."
      },
      {
        "w": "peripheral",
        "pos": "noun",
        "ph": "/pəˈrɪf.ər.əl/",
        "v": "thiết bị ngoại vi",
        "ex": "A mouse is an input peripheral."
      },
      {
        "w": "virtualization",
        "pos": "noun",
        "ph": "/ˌvɜː.tʃu.əl.aɪˈzeɪ.ʃən/",
        "v": "ảo hoá",
        "ex": "Virtualization runs many VMs on one server."
      },
      {
        "w": "scalability",
        "pos": "noun",
        "ph": "/ˌskeɪ.ləˈbɪl.ə.ti/",
        "v": "khả năng mở rộng",
        "ex": "Cloud gives great scalability."
      },
      {
        "w": "redundancy",
        "pos": "noun",
        "ph": "/rɪˈdʌn.dən.si/",
        "v": "dự phòng",
        "ex": "Redundancy keeps the system up if one node fails."
      },
      {
        "w": "API",
        "pos": "noun",
        "ph": "/ˌeɪ.piːˈaɪ/",
        "v": "giao diện lập trình ứng dụng",
        "ex": "The weather app calls a public API for its data."
      },
      {
        "w": "endpoint",
        "pos": "noun",
        "ph": "/ˈend.pɔɪnt/",
        "v": "điểm cuối (địa chỉ gọi API)",
        "ex": "Each REST endpoint returns data in JSON."
      },
      {
        "w": "middleware",
        "pos": "noun",
        "ph": "/ˈmɪd.əl.weər/",
        "v": "phần mềm trung gian",
        "ex": "Middleware checks the token before the request reaches the controller."
      },
      {
        "w": "kernel",
        "pos": "noun",
        "ph": "/ˈkɜː.nəl/",
        "v": "nhân hệ điều hành",
        "ex": "The kernel manages memory and running processes."
      },
      {
        "w": "metadata",
        "pos": "noun",
        "ph": "/ˈmet.ə.deɪ.tə/",
        "v": "siêu dữ liệu",
        "ex": "Photo metadata stores the date and the location."
      },
      {
        "w": "checksum",
        "pos": "noun",
        "ph": "/ˈtʃek.sʌm/",
        "v": "tổng kiểm tra",
        "ex": "Compare the checksum to verify that the download is intact."
      },
      {
        "w": "bottleneck",
        "pos": "noun",
        "ph": "/ˈbɒt.əl.nek/",
        "v": "nút thắt cổ chai",
        "ex": "Disk speed is the main bottleneck on this server."
      },
      {
        "w": "rollout",
        "pos": "noun",
        "ph": "/ˈrəʊl.aʊt/",
        "v": "đợt triển khai",
        "ex": "The rollout of the new version starts on Monday."
      },
      {
        "w": "legacy system",
        "pos": "noun",
        "ph": "/ˈleɡ.ə.si ˈsɪs.təm/",
        "v": "hệ thống cũ, lỗi thời",
        "ex": "Replacing the legacy system took two years."
      },
      {
        "w": "emulator",
        "pos": "noun",
        "ph": "/ˈem.jə.leɪ.tər/",
        "v": "trình giả lập",
        "ex": "Test the app on an Android emulator first."
      },
      {
        "w": "driver",
        "pos": "noun",
        "ph": "/ˈdraɪ.vər/",
        "v": "trình điều khiển thiết bị",
        "ex": "Install the printer driver before you print."
      },
      {
        "w": "registry",
        "pos": "noun",
        "ph": "/ˈredʒ.ɪ.stri/",
        "v": "kho lưu trữ ảnh, sổ đăng ký",
        "ex": "Docker images are pushed to a private registry."
      },
      {
        "w": "batch",
        "pos": "noun",
        "ph": "/bætʃ/",
        "v": "lô, mẻ (xử lý theo lô)",
        "ex": "Reports are generated by a nightly batch job."
      },
      {
        "w": "clipboard",
        "pos": "noun",
        "ph": "/ˈklɪp.bɔːd/",
        "v": "bộ nhớ tạm khi sao chép",
        "ex": "Press Ctrl+C to copy the text to the clipboard."
      },
      {
        "w": "shortcut",
        "pos": "noun",
        "ph": "/ˈʃɔːt.kʌt/",
        "v": "phím tắt",
        "ex": "Ctrl+S is the shortcut for saving a file."
      },
      {
        "w": "bandwidth cap",
        "pos": "noun",
        "ph": "/ˈbænd.wɪdθ kæp/",
        "v": "hạn mức băng thông",
        "ex": "The plan has a monthly bandwidth cap of 500 GB."
      },
      {
        "w": "uninstall",
        "pos": "verb",
        "ph": "/ˌʌn.ɪnˈstɔːl/",
        "v": "gỡ cài đặt",
        "ex": "Uninstall the old version before installing this one."
      },
      {
        "w": "crash",
        "pos": "verb",
        "ph": "/kræʃ/",
        "v": "treo, sập (chương trình)",
        "ex": "The app crashes when the file is empty."
      },
      {
        "w": "load balancing",
        "pos": "noun",
        "ph": "/ləʊd ˈbæl.ən.sɪŋ/",
        "v": "cân bằng tải",
        "ex": "Load balancing spreads requests across three servers."
      },
      {
        "w": "failover",
        "pos": "noun",
        "ph": "/ˈfeɪl.əʊ.vər/",
        "v": "chuyển dự phòng khi hỏng",
        "ex": "Failover moves traffic to the backup site automatically."
      },
      {
        "w": "uptime monitoring",
        "pos": "noun",
        "ph": "/ˈʌp.taɪm ˈmɒn.ɪ.tər.ɪŋ/",
        "v": "giám sát thời gian hoạt động",
        "ex": "Uptime monitoring alerts us within a minute of an outage."
      },
      {
        "w": "log",
        "pos": "noun",
        "ph": "/lɒɡ/",
        "v": "nhật ký hệ thống",
        "ex": "Check the server log to see what failed."
      },
      {
        "w": "timestamp",
        "pos": "noun",
        "ph": "/ˈtaɪm.stæmp/",
        "v": "dấu thời gian",
        "ex": "Every log line begins with a timestamp."
      },
      {
        "w": "job queue",
        "pos": "noun",
        "ph": "/dʒɒb kjuː/",
        "v": "hàng đợi tác vụ",
        "ex": "Long tasks go into a job queue instead of blocking the request."
      },
      {
        "w": "data centre",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˈsen.tər/",
        "v": "trung tâm dữ liệu",
        "ex": "Our servers sit in a data centre in Singapore."
      },
      {
        "w": "bare metal",
        "pos": "noun",
        "ph": "/beər ˈmet.əl/",
        "v": "máy chủ vật lý thuần",
        "ex": "Some workloads still run faster on bare metal."
      },
      {
        "w": "serverless",
        "pos": "adjective",
        "ph": "/ˈsɜː.və.ləs/",
        "v": "không máy chủ (điện toán)",
        "ex": "A serverless function only costs money while it runs."
      },
      {
        "w": "edge computing",
        "pos": "noun",
        "ph": "/edʒ kəmˈpjuː.tɪŋ/",
        "v": "điện toán biên",
        "ex": "Edge computing processes data close to the user."
      },
      {
        "w": "digital twin",
        "pos": "noun",
        "ph": "/ˈdɪdʒ.ɪ.təl twɪn/",
        "v": "bản sao số",
        "ex": "A digital twin simulates the real factory in software."
      },
      {
        "w": "interoperability",
        "pos": "noun",
        "ph": "/ˌɪn.tər.ɒp.ər.əˈbɪl.ə.ti/",
        "v": "khả năng liên thông",
        "ex": "Interoperability lets the two hospital systems share records."
      },
      {
        "w": "accessibility",
        "pos": "noun",
        "ph": "/əkˌses.əˈbɪl.ə.ti/",
        "v": "khả năng tiếp cận (cho người khuyết tật)",
        "ex": "Accessibility means the site works with a screen reader."
      },
      {
        "w": "responsive design",
        "pos": "noun",
        "ph": "/rɪˈspɒn.sɪv dɪˈzaɪn/",
        "v": "thiết kế đáp ứng",
        "ex": "Responsive design fits the layout to any screen size."
      },
      {
        "w": "dark mode",
        "pos": "noun",
        "ph": "/dɑːk məʊd/",
        "v": "chế độ nền tối",
        "ex": "Dark mode is easier on the eyes at night."
      },
      {
        "w": "offline mode",
        "pos": "noun",
        "ph": "/ˌɒfˈlaɪn məʊd/",
        "v": "chế độ ngoại tuyến",
        "ex": "Offline mode keeps the app usable without a network."
      }
    ]
  },
  {
    "topic": "laptrinh",
    "label": "👨‍💻 Lập trình & Phần mềm",
    "words": [
      {
        "w": "source code",
        "pos": "noun",
        "ph": "/ˈsɔːs ˌkəʊd/",
        "v": "mã nguồn",
        "ex": "The source code is stored on GitHub."
      },
      {
        "w": "object",
        "pos": "noun",
        "ph": "/ˈɒb.dʒɪkt/",
        "v": "đối tượng",
        "ex": "Each user is an object in the system."
      },
      {
        "w": "class",
        "pos": "noun",
        "ph": "/klɑːs/",
        "v": "lớp (trong OOP)",
        "ex": "Define a class for the customer data."
      },
      {
        "w": "method",
        "pos": "noun",
        "ph": "/ˈmeθ.əd/",
        "v": "phương thức",
        "ex": "Call the save method to store the record."
      },
      {
        "w": "constructor",
        "pos": "noun",
        "ph": "/kənˈstrʌk.tər/",
        "v": "hàm khởi tạo",
        "ex": "The constructor sets the default values."
      },
      {
        "w": "instance",
        "pos": "noun",
        "ph": "/ˈɪn.stəns/",
        "v": "thể hiện (của lớp)",
        "ex": "Create a new instance of the class."
      },
      {
        "w": "inheritance",
        "pos": "noun",
        "ph": "/ɪnˈher.ɪ.təns/",
        "v": "tính kế thừa",
        "ex": "Inheritance lets a class reuse another class."
      },
      {
        "w": "polymorphism",
        "pos": "noun",
        "ph": "/ˌpɒl.iˈmɔː.fɪ.zəm/",
        "v": "tính đa hình",
        "ex": "Polymorphism lets one method act differently."
      },
      {
        "w": "encapsulation",
        "pos": "noun",
        "ph": "/ɪnˌkæp.sjəˈleɪ.ʃən/",
        "v": "tính đóng gói",
        "ex": "Encapsulation hides the internal details."
      },
      {
        "w": "abstraction",
        "pos": "noun",
        "ph": "/æbˈstræk.ʃən/",
        "v": "tính trừu tượng",
        "ex": "Abstraction keeps the interface simple."
      },
      {
        "w": "library",
        "pos": "noun",
        "ph": "/ˈlaɪ.brər.i/",
        "v": "thư viện (mã)",
        "ex": "Use a library instead of writing it yourself."
      },
      {
        "w": "dependency",
        "pos": "noun",
        "ph": "/dɪˈpen.dən.si/",
        "v": "gói phụ thuộc",
        "ex": "Update the project dependencies monthly."
      },
      {
        "w": "version control",
        "pos": "noun",
        "ph": "/ˈvɜː.ʃən kənˌtrəʊl/",
        "v": "quản lý phiên bản",
        "ex": "Git is a version control system."
      },
      {
        "w": "commit",
        "pos": "verb",
        "ph": "/kəˈmɪt/",
        "v": "lưu thay đổi (vào repo)",
        "ex": "Commit your changes with a clear message."
      },
      {
        "w": "branch",
        "pos": "noun",
        "ph": "/brɑːntʃ/",
        "v": "nhánh (mã nguồn)",
        "ex": "Create a branch for the new feature."
      },
      {
        "w": "merge",
        "pos": "verb",
        "ph": "/mɜːdʒ/",
        "v": "gộp nhánh",
        "ex": "Merge the branch after the review."
      },
      {
        "w": "pull request",
        "pos": "noun",
        "ph": "/ˈpʊl rɪˌkwest/",
        "v": "yêu cầu gộp mã",
        "ex": "Open a pull request for your fix."
      },
      {
        "w": "code review",
        "pos": "noun",
        "ph": "/ˈkəʊd rɪˌvjuː/",
        "v": "rà soát mã",
        "ex": "Every change needs a code review."
      },
      {
        "w": "refactor",
        "pos": "verb",
        "ph": "/ˌriːˈfæk.tər/",
        "v": "tái cấu trúc mã",
        "ex": "Refactor the function to make it cleaner."
      },
      {
        "w": "unit test",
        "pos": "noun",
        "ph": "/ˈjuː.nɪt ˌtest/",
        "v": "kiểm thử đơn vị",
        "ex": "Write a unit test for each function."
      },
      {
        "w": "test case",
        "pos": "noun",
        "ph": "/ˈtest ˌkeɪs/",
        "v": "ca kiểm thử",
        "ex": "This test case checks empty input."
      },
      {
        "w": "requirement",
        "pos": "noun",
        "ph": "/rɪˈkwaɪə.mənt/",
        "v": "yêu cầu (phần mềm)",
        "ex": "The team reviews the requirements first."
      },
      {
        "w": "specification",
        "pos": "noun",
        "ph": "/ˌspes.ɪ.fɪˈkeɪ.ʃən/",
        "v": "đặc tả",
        "ex": "Follow the API specification exactly."
      },
      {
        "w": "documentation",
        "pos": "noun",
        "ph": "/ˌdɒk.jə.menˈteɪ.ʃən/",
        "v": "tài liệu (kỹ thuật)",
        "ex": "Good documentation helps new developers."
      },
      {
        "w": "agile",
        "pos": "adj",
        "ph": "/ˈædʒ.aɪl/",
        "v": "linh hoạt (mô hình Agile)",
        "ex": "Our team follows agile development."
      },
      {
        "w": "sprint",
        "pos": "noun",
        "ph": "/sprɪnt/",
        "v": "chu kỳ phát triển ngắn",
        "ex": "We plan the work in two-week sprints."
      },
      {
        "w": "backlog",
        "pos": "noun",
        "ph": "/ˈbæk.lɒɡ/",
        "v": "danh sách việc tồn",
        "ex": "Add the idea to the product backlog."
      },
      {
        "w": "milestone",
        "pos": "noun",
        "ph": "/ˈmaɪl.stəʊn/",
        "v": "cột mốc (dự án)",
        "ex": "The beta release is our next milestone."
      },
      {
        "w": "pseudocode",
        "pos": "noun",
        "ph": "/ˈsjuː.dəʊ.kəʊd/",
        "v": "mã giả",
        "ex": "Sketch the logic in pseudocode first."
      },
      {
        "w": "flowchart",
        "pos": "noun",
        "ph": "/ˈfləʊ.tʃɑːt/",
        "v": "lưu đồ",
        "ex": "The flowchart shows each decision step."
      },
      {
        "w": "data structure",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˌstrʌk.tʃər/",
        "v": "cấu trúc dữ liệu",
        "ex": "Choose the right data structure for speed."
      },
      {
        "w": "stack",
        "pos": "noun",
        "ph": "/stæk/",
        "v": "ngăn xếp",
        "ex": "A stack works in last-in, first-out order."
      },
      {
        "w": "queue",
        "pos": "noun",
        "ph": "/kjuː/",
        "v": "hàng đợi",
        "ex": "Jobs wait in a queue to be processed."
      },
      {
        "w": "linked list",
        "pos": "noun",
        "ph": "/ˌlɪŋkt ˈlɪst/",
        "v": "danh sách liên kết",
        "ex": "A linked list grows easily at both ends."
      },
      {
        "w": "hash table",
        "pos": "noun",
        "ph": "/ˈhæʃ ˌteɪ.bəl/",
        "v": "bảng băm",
        "ex": "A hash table finds values very fast."
      },
      {
        "w": "pointer",
        "pos": "noun",
        "ph": "/ˈpɔɪn.tər/",
        "v": "con trỏ",
        "ex": "A pointer stores a memory address."
      },
      {
        "w": "string",
        "pos": "noun",
        "ph": "/strɪŋ/",
        "v": "chuỗi ký tự",
        "ex": "Store the name as a string."
      },
      {
        "w": "boolean",
        "pos": "noun",
        "ph": "/ˈbuː.li.ən/",
        "v": "kiểu đúng/sai",
        "ex": "A boolean is either true or false."
      },
      {
        "w": "operator",
        "pos": "noun",
        "ph": "/ˈɒp.ər.eɪ.tər/",
        "v": "toán tử",
        "ex": "The plus operator adds two numbers."
      },
      {
        "w": "optimize",
        "pos": "verb",
        "ph": "/ˈɒp.tɪ.maɪz/",
        "v": "tối ưu hoá",
        "ex": "Optimize the query to run faster."
      },
      {
        "w": "compile",
        "pos": "verb",
        "ph": "/kəmˈpaɪl/",
        "v": "biên dịch",
        "ex": "The code must compile before it runs."
      },
      {
        "w": "runtime error",
        "pos": "noun",
        "ph": "/ˈrʌn.taɪm ˌer.ər/",
        "v": "lỗi lúc chạy",
        "ex": "A runtime error crashes the program mid-execution."
      },
      {
        "w": "callback",
        "pos": "noun",
        "ph": "/ˈkɔːl.bæk/",
        "v": "hàm gọi lại",
        "ex": "Pass a callback to run after the file loads."
      },
      {
        "w": "asynchronous",
        "pos": "adj",
        "ph": "/eɪˈsɪŋ.krə.nəs/",
        "v": "bất đồng bộ",
        "ex": "Asynchronous code does not block the main thread."
      },
      {
        "w": "immutable",
        "pos": "adj",
        "ph": "/ɪˈmjuː.tə.bəl/",
        "v": "bất biến",
        "ex": "A tuple is immutable — you cannot change it."
      },
      {
        "w": "scope",
        "pos": "noun",
        "ph": "/skəʊp/",
        "v": "phạm vi biến",
        "ex": "A local variable is only visible in its scope."
      },
      {
        "w": "closure",
        "pos": "noun",
        "ph": "/ˈkləʊ.ʒər/",
        "v": "bao đóng",
        "ex": "A closure remembers variables from its outer function."
      },
      {
        "w": "deprecated",
        "pos": "adj",
        "ph": "/ˈdep.rə.keɪ.tɪd/",
        "v": "đã lỗi thời",
        "ex": "This method is deprecated; use the new one."
      },
      {
        "w": "boilerplate",
        "pos": "noun",
        "ph": "/ˈbɔɪ.lə.pleɪt/",
        "v": "mã khuôn mẫu lặp",
        "ex": "The framework removes a lot of boilerplate."
      },
      {
        "w": "idempotent",
        "pos": "adj",
        "ph": "/ˌaɪ.demˈpəʊ.tənt/",
        "v": "bất biến khi lặp",
        "ex": "A safe API call should be idempotent."
      },
      {
        "w": "concurrency",
        "pos": "noun",
        "ph": "/kənˈkʌr.ən.si/",
        "v": "tính đồng thời",
        "ex": "Concurrency lets many tasks progress at once."
      },
      {
        "w": "serialization",
        "pos": "noun",
        "ph": "/ˌsɪə.ri.əl.aɪˈzeɪ.ʃən/",
        "v": "tuần tự hoá",
        "ex": "JSON serialization turns objects into text."
      },
      {
        "w": "namespace",
        "pos": "noun",
        "ph": "/ˈneɪm.speɪs/",
        "v": "không gian tên",
        "ex": "Namespaces prevent name clashes between modules."
      },
      {
        "w": "module",
        "pos": "noun",
        "ph": "/ˈmɒdʒ.uːl/",
        "v": "mô-đun",
        "ex": "Split the program into small, testable modules."
      },
      {
        "w": "package manager",
        "pos": "noun",
        "ph": "/ˈpæk.ɪdʒ ˈmæn.ɪ.dʒər/",
        "v": "trình quản lý gói",
        "ex": "npm is the package manager for Node.js."
      },
      {
        "w": "lambda",
        "pos": "noun",
        "ph": "/ˈlæm.də/",
        "v": "hàm ẩn danh (lambda)",
        "ex": "Sort the list with a short lambda function."
      },
      {
        "w": "garbage collection",
        "pos": "noun",
        "ph": "/ˈɡɑː.bɪdʒ kəˈlek.ʃən/",
        "v": "cơ chế thu gom bộ nhớ rác",
        "ex": "Garbage collection frees memory that is no longer used."
      },
      {
        "w": "memory leak",
        "pos": "noun",
        "ph": "/ˈmem.ər.i liːk/",
        "v": "rò rỉ bộ nhớ",
        "ex": "A memory leak makes the app slower hour after hour."
      },
      {
        "w": "stack trace",
        "pos": "noun",
        "ph": "/stæk treɪs/",
        "v": "vết ngăn xếp lỗi",
        "ex": "Read the stack trace from the bottom up to find the cause."
      },
      {
        "w": "breakpoint",
        "pos": "noun",
        "ph": "/ˈbreɪk.pɔɪnt/",
        "v": "điểm dừng khi gỡ lỗi",
        "ex": "Set a breakpoint to inspect the variable at that line."
      },
      {
        "w": "mock",
        "pos": "noun",
        "ph": "/mɒk/",
        "v": "đối tượng giả lập khi kiểm thử",
        "ex": "Use a mock database so the unit test runs offline."
      },
      {
        "w": "override",
        "pos": "verb",
        "ph": "/ˌəʊ.vəˈraɪd/",
        "v": "ghi đè phương thức",
        "ex": "The subclass overrides the parent method."
      },
      {
        "w": "overload",
        "pos": "verb",
        "ph": "/ˌəʊ.vəˈləʊd/",
        "v": "nạp chồng (hàm cùng tên)",
        "ex": "You can overload a method with different parameters."
      },
      {
        "w": "indentation",
        "pos": "noun",
        "ph": "/ˌɪn.denˈteɪ.ʃən/",
        "v": "thụt lề",
        "ex": "Python uses indentation to mark blocks of code."
      },
      {
        "w": "iterator",
        "pos": "noun",
        "ph": "/ˈɪt.ər.eɪ.tər/",
        "v": "bộ lặp",
        "ex": "An iterator returns the items one at a time."
      },
      {
        "w": "pipeline",
        "pos": "noun",
        "ph": "/ˈpaɪp.laɪn/",
        "v": "chuỗi xử lý, luồng dựng tự động",
        "ex": "The build pipeline runs the tests on every commit."
      },
      {
        "w": "readability",
        "pos": "noun",
        "ph": "/ˌriː.dəˈbɪl.ə.ti/",
        "v": "tính dễ đọc của mã",
        "ex": "Clear naming improves readability more than comments do."
      },
      {
        "w": "edge case",
        "pos": "noun",
        "ph": "/edʒ keɪs/",
        "v": "trường hợp biên",
        "ex": "Empty input is an edge case you must handle."
      },
      {
        "w": "null",
        "pos": "noun",
        "ph": "/nʌl/",
        "v": "giá trị rỗng",
        "ex": "Check for null before you use the object."
      },
      {
        "w": "snippet",
        "pos": "noun",
        "ph": "/ˈsnɪp.ət/",
        "v": "đoạn mã mẫu",
        "ex": "Save this snippet; you will need it again."
      },
      {
        "w": "type safety",
        "pos": "noun",
        "ph": "/taɪp ˈseɪf.ti/",
        "v": "an toàn kiểu dữ liệu",
        "ex": "Type safety catches many bugs before the code runs."
      },
      {
        "w": "linting",
        "pos": "noun",
        "ph": "/ˈlɪn.tɪŋ/",
        "v": "việc soi lỗi phong cách mã",
        "ex": "Linting keeps the whole team writing in one style."
      },
      {
        "w": "formatter",
        "pos": "noun",
        "ph": "/ˈfɔː.mæt.ər/",
        "v": "công cụ định dạng mã",
        "ex": "A formatter ends every argument about spacing."
      },
      {
        "w": "code generation",
        "pos": "noun",
        "ph": "/kəʊd ˌdʒen.əˈreɪ.ʃən/",
        "v": "sinh mã tự động",
        "ex": "Code generation builds the client from the API schema."
      },
      {
        "w": "parser",
        "pos": "noun",
        "ph": "/ˈpɑː.zər/",
        "v": "bộ phân tích cú pháp",
        "ex": "The parser turns text into a syntax tree."
      },
      {
        "w": "compiler error",
        "pos": "noun",
        "ph": "/kəmˈpaɪ.lər ˈer.ər/",
        "v": "lỗi biên dịch",
        "ex": "Fix the compiler error before you run the tests."
      },
      {
        "w": "race condition",
        "pos": "noun",
        "ph": "/reɪs kənˈdɪʃ.ən/",
        "v": "tình trạng tranh chấp luồng",
        "ex": "A race condition makes the bug appear only sometimes."
      },
      {
        "w": "deadlock",
        "pos": "noun",
        "ph": "/ˈded.lɒk/",
        "v": "bế tắc khoá",
        "ex": "Two threads waiting for each other cause a deadlock."
      },
      {
        "w": "thread pool",
        "pos": "noun",
        "ph": "/θred puːl/",
        "v": "nhóm luồng dùng lại",
        "ex": "A thread pool avoids creating a thread per request."
      },
      {
        "w": "caching strategy",
        "pos": "noun",
        "ph": "/ˈkæʃ.ɪŋ ˈstræt.ə.dʒi/",
        "v": "chiến lược lưu đệm",
        "ex": "A good caching strategy cut the load time in half."
      },
      {
        "w": "rate limit",
        "pos": "noun",
        "ph": "/reɪt ˈlɪm.ɪt/",
        "v": "giới hạn số lần gọi",
        "ex": "The API has a rate limit of 60 calls per minute."
      },
      {
        "w": "retry",
        "pos": "verb",
        "ph": "/rɪˈtraɪ/",
        "v": "thử lại",
        "ex": "The client retries three times before giving up."
      },
      {
        "w": "stub",
        "pos": "noun",
        "ph": "/stʌb/",
        "v": "hàm giả tối giản khi kiểm thử",
        "ex": "Replace the payment service with a stub during tests."
      },
      {
        "w": "migration",
        "pos": "noun",
        "ph": "/maɪˈɡreɪ.ʃən/",
        "v": "di trú dữ liệu, chuyển đổi",
        "ex": "Run the database migration before you deploy."
      },
      {
        "w": "schema",
        "pos": "noun",
        "ph": "/ˈskiː.mə/",
        "v": "lược đồ dữ liệu",
        "ex": "Every table change starts with a schema update."
      },
      {
        "w": "endpointing",
        "pos": "noun",
        "ph": "/ˈend.pɔɪn.tɪŋ/",
        "v": "việc chốt điểm kết thúc",
        "ex": "Endpointing decides when the user has stopped speaking."
      }
    ]
  },
  {
    "topic": "mang",
    "label": "🌐 Mạng máy tính",
    "words": [
      {
        "w": "router",
        "pos": "noun",
        "ph": "/ˈruː.tər/",
        "v": "bộ định tuyến",
        "ex": "Restart the router if the Wi-Fi drops."
      },
      {
        "w": "switch",
        "pos": "noun",
        "ph": "/swɪtʃ/",
        "v": "bộ chuyển mạch",
        "ex": "The switch connects all office computers."
      },
      {
        "w": "modem",
        "pos": "noun",
        "ph": "/ˈməʊ.dem/",
        "v": "bộ điều giải",
        "ex": "The modem links your home to the internet."
      },
      {
        "w": "IP address",
        "pos": "noun",
        "ph": "/ˌaɪˈpiː əˌdres/",
        "v": "địa chỉ IP",
        "ex": "Each device has a unique IP address."
      },
      {
        "w": "DNS",
        "pos": "noun",
        "ph": "/ˌdiː.enˈes/",
        "v": "hệ thống phân giải tên miền",
        "ex": "DNS turns a domain name into an IP address."
      },
      {
        "w": "domain name",
        "pos": "noun",
        "ph": "/dəˈmeɪn ˌneɪm/",
        "v": "tên miền",
        "ex": "The company bought a short domain name."
      },
      {
        "w": "subnet",
        "pos": "noun",
        "ph": "/ˈsʌb.net/",
        "v": "mạng con",
        "ex": "The office network is split into subnets."
      },
      {
        "w": "gateway",
        "pos": "noun",
        "ph": "/ˈɡeɪt.weɪ/",
        "v": "cổng kết nối mạng",
        "ex": "The gateway routes traffic to the internet."
      },
      {
        "w": "LAN",
        "pos": "noun",
        "ph": "/læn/",
        "v": "mạng cục bộ",
        "ex": "The printers are shared over the LAN."
      },
      {
        "w": "ethernet",
        "pos": "noun",
        "ph": "/ˈiː.θə.net/",
        "v": "mạng dây Ethernet",
        "ex": "An ethernet cable is faster than Wi-Fi."
      },
      {
        "w": "Wi-Fi",
        "pos": "noun",
        "ph": "/ˈwaɪ.faɪ/",
        "v": "mạng không dây",
        "ex": "The cafe offers free Wi-Fi."
      },
      {
        "w": "packet",
        "pos": "noun",
        "ph": "/ˈpæk.ɪt/",
        "v": "gói tin",
        "ex": "Data travels across the network in packets."
      },
      {
        "w": "ping",
        "pos": "verb",
        "ph": "/pɪŋ/",
        "v": "kiểm tra kết nối (ping)",
        "ex": "Ping the server to check the connection."
      },
      {
        "w": "port",
        "pos": "noun",
        "ph": "/pɔːt/",
        "v": "cổng (dịch vụ mạng)",
        "ex": "The web server listens on port 80."
      },
      {
        "w": "VPN",
        "pos": "noun",
        "ph": "/ˌviː.piːˈen/",
        "v": "mạng riêng ảo",
        "ex": "Use a VPN on public Wi-Fi."
      },
      {
        "w": "proxy",
        "pos": "noun",
        "ph": "/ˈprɒk.si/",
        "v": "máy chủ trung gian",
        "ex": "The proxy filters outgoing traffic."
      },
      {
        "w": "load balancer",
        "pos": "noun",
        "ph": "/ˈləʊd ˌbæl.ən.sər/",
        "v": "bộ cân bằng tải",
        "ex": "A load balancer spreads traffic across servers."
      },
      {
        "w": "hosting",
        "pos": "noun",
        "ph": "/ˈhəʊ.stɪŋ/",
        "v": "dịch vụ lưu trữ web",
        "ex": "The site moved to cheaper hosting."
      },
      {
        "w": "SSL certificate",
        "pos": "noun",
        "ph": "/ˌes.esˈel səˌtɪf.ɪ.kət/",
        "v": "chứng chỉ bảo mật SSL",
        "ex": "An SSL certificate enables the padlock icon."
      },
      {
        "w": "topology",
        "pos": "noun",
        "ph": "/təˈpɒl.ə.dʒi/",
        "v": "cấu trúc liên kết mạng",
        "ex": "Draw the network topology first."
      },
      {
        "w": "node",
        "pos": "noun",
        "ph": "/nəʊd/",
        "v": "nút mạng",
        "ex": "Every device is a node in the network."
      },
      {
        "w": "client",
        "pos": "noun",
        "ph": "/ˈklaɪ.ənt/",
        "v": "máy khách",
        "ex": "The client sends a request to the server."
      },
      {
        "w": "host",
        "pos": "noun",
        "ph": "/həʊst/",
        "v": "máy chủ (host)",
        "ex": "The host runs several services."
      },
      {
        "w": "signal",
        "pos": "noun",
        "ph": "/ˈsɪɡ.nəl/",
        "v": "tín hiệu",
        "ex": "The Wi-Fi signal is weak upstairs."
      },
      {
        "w": "broadband",
        "pos": "noun",
        "ph": "/ˈbrɔːd.bænd/",
        "v": "băng thông rộng",
        "ex": "Broadband brought fast internet to the village."
      },
      {
        "w": "fiber optic",
        "pos": "adj",
        "ph": "/ˌfaɪ.bər ˈɒp.tɪk/",
        "v": "cáp quang",
        "ex": "Fiber optic cables carry data as light."
      },
      {
        "w": "hotspot",
        "pos": "noun",
        "ph": "/ˈhɒt.spɒt/",
        "v": "điểm phát Wi-Fi",
        "ex": "Turn your phone into a hotspot."
      },
      {
        "w": "MAC address",
        "pos": "noun",
        "ph": "/ˈmæk əˌdres/",
        "v": "địa chỉ phần cứng MAC",
        "ex": "The router filters devices by MAC address."
      },
      {
        "w": "traffic",
        "pos": "noun",
        "ph": "/ˈtræf.ɪk/",
        "v": "lưu lượng mạng",
        "ex": "Network traffic peaks in the evening."
      },
      {
        "w": "throughput",
        "pos": "noun",
        "ph": "/ˈθruː.pʊt/",
        "v": "thông lượng",
        "ex": "The new link doubled our throughput."
      },
      {
        "w": "connection",
        "pos": "noun",
        "ph": "/kəˈnek.ʃən/",
        "v": "kết nối",
        "ex": "The connection dropped during the call."
      },
      {
        "w": "transmission",
        "pos": "noun",
        "ph": "/trænzˈmɪʃ.ən/",
        "v": "sự truyền (dữ liệu)",
        "ex": "Encryption protects data during transmission."
      },
      {
        "w": "handshake",
        "pos": "noun",
        "ph": "/ˈhænd.ʃeɪk/",
        "v": "bắt tay (thiết lập kết nối)",
        "ex": "The TLS handshake happens before data flows."
      },
      {
        "w": "downtime",
        "pos": "noun",
        "ph": "/ˈdaʊn.taɪm/",
        "v": "thời gian ngừng hoạt động",
        "ex": "The upgrade caused an hour of downtime."
      },
      {
        "w": "uptime",
        "pos": "noun",
        "ph": "/ˈʌp.taɪm/",
        "v": "thời gian hoạt động liên tục",
        "ex": "The server has 99.9% uptime."
      },
      {
        "w": "bridge",
        "pos": "noun",
        "ph": "/brɪdʒ/",
        "v": "cầu nối mạng",
        "ex": "A bridge joins two network segments into one."
      },
      {
        "w": "repeater",
        "pos": "noun",
        "ph": "/rɪˈpiː.tər/",
        "v": "bộ lặp tín hiệu",
        "ex": "A repeater extends the Wi-Fi range to the garden."
      },
      {
        "w": "access point",
        "pos": "noun",
        "ph": "/ˈæk.ses pɔɪnt/",
        "v": "điểm truy cập không dây",
        "ex": "Add an access point to cover the second floor."
      },
      {
        "w": "SSID",
        "pos": "noun",
        "ph": "/ˌes.es.aɪˈdiː/",
        "v": "tên mạng Wi-Fi",
        "ex": "Enter the SSID and the password to join the network."
      },
      {
        "w": "DHCP",
        "pos": "noun",
        "ph": "/ˌdiː.eɪtʃ.siːˈpiː/",
        "v": "giao thức cấp IP tự động",
        "ex": "DHCP assigns an IP address to every new device."
      },
      {
        "w": "jitter",
        "pos": "noun",
        "ph": "/ˈdʒɪt.ər/",
        "v": "độ biến thiên trễ",
        "ex": "High jitter makes video calls choppy."
      },
      {
        "w": "packet loss",
        "pos": "noun",
        "ph": "/ˈpæk.ɪt lɒs/",
        "v": "mất gói tin",
        "ex": "Packet loss is why the call keeps breaking up."
      },
      {
        "w": "routing table",
        "pos": "noun",
        "ph": "/ˈruː.tɪŋ ˈteɪ.bəl/",
        "v": "bảng định tuyến",
        "ex": "The router checks its routing table to forward each packet."
      },
      {
        "w": "subnet mask",
        "pos": "noun",
        "ph": "/ˈsʌb.net mɑːsk/",
        "v": "mặt nạ mạng con",
        "ex": "The subnet mask separates the network part from the host part."
      },
      {
        "w": "static IP",
        "pos": "noun",
        "ph": "/ˈstæt.ɪk ˌaɪˈpiː/",
        "v": "địa chỉ IP tĩnh",
        "ex": "Servers usually need a static IP address."
      },
      {
        "w": "ISP",
        "pos": "noun",
        "ph": "/ˌaɪ.esˈpiː/",
        "v": "nhà cung cấp dịch vụ Internet",
        "ex": "Call your ISP if the line is still down."
      },
      {
        "w": "intranet",
        "pos": "noun",
        "ph": "/ˈɪn.trə.net/",
        "v": "mạng nội bộ",
        "ex": "Internal documents are kept on the intranet."
      },
      {
        "w": "port forwarding",
        "pos": "noun",
        "ph": "/pɔːt ˈfɔː.wə.dɪŋ/",
        "v": "chuyển tiếp cổng",
        "ex": "Set up port forwarding to reach the server from outside."
      },
      {
        "w": "broadcast",
        "pos": "noun",
        "ph": "/ˈbrɔːd.kɑːst/",
        "v": "phát quảng bá",
        "ex": "A broadcast message reaches every device on the LAN."
      },
      {
        "w": "throttle",
        "pos": "verb",
        "ph": "/ˈθrɒt.əl/",
        "v": "bóp băng thông",
        "ex": "The provider throttles the speed after the data cap."
      },
      {
        "w": "cable",
        "pos": "noun",
        "ph": "/ˈkeɪ.bəl/",
        "v": "cáp mạng",
        "ex": "Plug the network cable into the switch."
      },
      {
        "w": "wireless",
        "pos": "adjective",
        "ph": "/ˈwaɪə.ləs/",
        "v": "không dây",
        "ex": "The whole office runs on a wireless network."
      },
      {
        "w": "packet filter",
        "pos": "noun",
        "ph": "/ˈpæk.ɪt ˈfɪl.tər/",
        "v": "bộ lọc gói tin",
        "ex": "A packet filter drops traffic from unknown addresses."
      },
      {
        "w": "duplex",
        "pos": "noun",
        "ph": "/ˈdjuː.pleks/",
        "v": "chế độ truyền hai chiều",
        "ex": "Full duplex lets both sides send at the same time."
      },
      {
        "w": "latency spike",
        "pos": "noun",
        "ph": "/ˈleɪ.tən.si spaɪk/",
        "v": "đợt tăng vọt độ trễ",
        "ex": "A latency spike at noon slowed every request."
      },
      {
        "w": "traceroute",
        "pos": "noun",
        "ph": "/ˈtreɪs.ruːt/",
        "v": "lệnh dò đường đi gói tin",
        "ex": "Traceroute shows every hop between you and the server."
      },
      {
        "w": "mesh network",
        "pos": "noun",
        "ph": "/meʃ ˈnet.wɜːk/",
        "v": "mạng lưới mắt lưới",
        "ex": "A mesh network covers a large house without dead spots."
      },
      {
        "w": "backbone",
        "pos": "noun",
        "ph": "/ˈbæk.bəʊn/",
        "v": "đường trục mạng",
        "ex": "Fibre forms the backbone of the campus network."
      },
      {
        "w": "bandwidth throttling",
        "pos": "noun",
        "ph": "/ˈbænd.wɪdθ ˈθrɒt.əl.ɪŋ/",
        "v": "việc bóp băng thông",
        "ex": "Bandwidth throttling starts after the monthly quota."
      },
      {
        "w": "network segmentation",
        "pos": "noun",
        "ph": "/ˈnet.wɜːk ˌseɡ.menˈteɪ.ʃən/",
        "v": "phân đoạn mạng",
        "ex": "Network segmentation stops an attack from spreading."
      },
      {
        "w": "IoT device",
        "pos": "noun",
        "ph": "/ˌaɪ.əʊˈtiː dɪˈvaɪs/",
        "v": "thiết bị IoT",
        "ex": "Every IoT device needs its own password."
      },
      {
        "w": "bandwidth test",
        "pos": "noun",
        "ph": "/ˈbænd.wɪdθ test/",
        "v": "đo tốc độ đường truyền",
        "ex": "Run a bandwidth test before the online exam."
      },
      {
        "w": "roaming",
        "pos": "noun",
        "ph": "/ˈrəʊ.mɪŋ/",
        "v": "chuyển vùng",
        "ex": "Roaming keeps the call alive as you walk between floors."
      },
      {
        "w": "firewall bypass",
        "pos": "noun",
        "ph": "/ˈfaɪə.wɔːl ˈbaɪ.pɑːs/",
        "v": "vượt tường lửa",
        "ex": "Blocking VPNs prevents firewall bypass."
      },
      {
        "w": "network outage",
        "pos": "noun",
        "ph": "/ˈnet.wɜːk ˈaʊ.tɪdʒ/",
        "v": "sự cố mất mạng",
        "ex": "The network outage lasted forty minutes."
      },
      {
        "w": "redundant link",
        "pos": "noun",
        "ph": "/rɪˈdʌn.dənt lɪŋk/",
        "v": "đường truyền dự phòng",
        "ex": "A redundant link keeps the office online if one line fails."
      }
    ]
  },
  {
    "topic": "ai-ml",
    "label": "🤖 AI & Dữ liệu",
    "words": [
      {
        "w": "artificial intelligence",
        "pos": "noun",
        "ph": "/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/",
        "v": "trí tuệ nhân tạo",
        "ex": "Artificial intelligence powers the chatbot."
      },
      {
        "w": "machine learning",
        "pos": "noun",
        "ph": "/məˌʃiːn ˈlɜː.nɪŋ/",
        "v": "học máy",
        "ex": "Machine learning improves with more data."
      },
      {
        "w": "deep learning",
        "pos": "noun",
        "ph": "/ˌdiːp ˈlɜː.nɪŋ/",
        "v": "học sâu",
        "ex": "Deep learning recognizes faces in photos."
      },
      {
        "w": "neural network",
        "pos": "noun",
        "ph": "/ˌnjʊə.rəl ˈnet.wɜːk/",
        "v": "mạng nơ-ron",
        "ex": "A neural network mimics the human brain."
      },
      {
        "w": "model",
        "pos": "noun",
        "ph": "/ˈmɒd.əl/",
        "v": "mô hình",
        "ex": "Train the model on last year’s data."
      },
      {
        "w": "training data",
        "pos": "noun",
        "ph": "/ˈtreɪ.nɪŋ ˌdeɪ.tə/",
        "v": "dữ liệu huấn luyện",
        "ex": "Bad training data leads to bad predictions."
      },
      {
        "w": "dataset",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə.set/",
        "v": "bộ dữ liệu",
        "ex": "The dataset contains one million images."
      },
      {
        "w": "feature",
        "pos": "noun",
        "ph": "/ˈfiː.tʃər/",
        "v": "đặc trưng (dữ liệu)",
        "ex": "Age and income are features of the model."
      },
      {
        "w": "label",
        "pos": "noun",
        "ph": "/ˈleɪ.bəl/",
        "v": "nhãn (dữ liệu)",
        "ex": "Each image has a label: cat or dog."
      },
      {
        "w": "prediction",
        "pos": "noun",
        "ph": "/prɪˈdɪk.ʃən/",
        "v": "dự đoán",
        "ex": "The prediction was 90 percent accurate."
      },
      {
        "w": "classification",
        "pos": "noun",
        "ph": "/ˌklæs.ɪ.fɪˈkeɪ.ʃən/",
        "v": "phân loại",
        "ex": "Spam filtering is a classification task."
      },
      {
        "w": "regression",
        "pos": "noun",
        "ph": "/rɪˈɡreʃ.ən/",
        "v": "hồi quy",
        "ex": "Use regression to predict house prices."
      },
      {
        "w": "clustering",
        "pos": "noun",
        "ph": "/ˈklʌs.tər.ɪŋ/",
        "v": "phân cụm",
        "ex": "Clustering groups similar customers together."
      },
      {
        "w": "overfitting",
        "pos": "noun",
        "ph": "/ˌəʊ.vəˈfɪt.ɪŋ/",
        "v": "quá khớp",
        "ex": "Overfitting means the model memorizes, not learns."
      },
      {
        "w": "accuracy",
        "pos": "noun",
        "ph": "/ˈæk.jə.rə.si/",
        "v": "độ chính xác",
        "ex": "The model reached 95 percent accuracy."
      },
      {
        "w": "bias",
        "pos": "noun",
        "ph": "/ˈbaɪ.əs/",
        "v": "thiên lệch",
        "ex": "Biased data produces unfair results."
      },
      {
        "w": "chatbot",
        "pos": "noun",
        "ph": "/ˈtʃæt.bɒt/",
        "v": "trợ lý trò chuyện tự động",
        "ex": "The chatbot answers common questions."
      },
      {
        "w": "natural language processing",
        "pos": "noun",
        "ph": "/ˌnætʃ.ər.əl ˈlæŋ.ɡwɪdʒ ˌprəʊ.ses.ɪŋ/",
        "v": "xử lý ngôn ngữ tự nhiên",
        "ex": "Natural language processing reads human text."
      },
      {
        "w": "computer vision",
        "pos": "noun",
        "ph": "/kəmˌpjuː.tər ˈvɪʒ.ən/",
        "v": "thị giác máy tính",
        "ex": "Computer vision detects objects in video."
      },
      {
        "w": "big data",
        "pos": "noun",
        "ph": "/ˌbɪɡ ˈdeɪ.tə/",
        "v": "dữ liệu lớn",
        "ex": "Big data reveals customer trends."
      },
      {
        "w": "data mining",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˌmaɪ.nɪŋ/",
        "v": "khai phá dữ liệu",
        "ex": "Data mining finds hidden patterns."
      },
      {
        "w": "data science",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˌsaɪ.əns/",
        "v": "khoa học dữ liệu",
        "ex": "She studies data science at university."
      },
      {
        "w": "analytics",
        "pos": "noun",
        "ph": "/ˌæn.əˈlɪt.ɪks/",
        "v": "phân tích dữ liệu",
        "ex": "Web analytics show where visitors come from."
      },
      {
        "w": "visualization",
        "pos": "noun",
        "ph": "/ˌvɪʒ.u.əl.aɪˈzeɪ.ʃən/",
        "v": "trực quan hoá",
        "ex": "A good visualization tells the story fast."
      },
      {
        "w": "statistics",
        "pos": "noun",
        "ph": "/stəˈtɪs.tɪks/",
        "v": "thống kê",
        "ex": "Statistics support the research findings."
      },
      {
        "w": "correlation",
        "pos": "noun",
        "ph": "/ˌkɒr.əˈleɪ.ʃən/",
        "v": "tương quan",
        "ex": "There is a correlation between sleep and grades."
      },
      {
        "w": "outlier",
        "pos": "noun",
        "ph": "/ˈaʊtˌlaɪ.ər/",
        "v": "giá trị ngoại lai",
        "ex": "Remove outliers before training."
      },
      {
        "w": "preprocessing",
        "pos": "noun",
        "ph": "/ˌpriːˈprəʊ.ses.ɪŋ/",
        "v": "tiền xử lý",
        "ex": "Preprocessing cleans the raw data."
      },
      {
        "w": "prompt",
        "pos": "noun",
        "ph": "/prɒmpt/",
        "v": "câu lệnh cho AI",
        "ex": "A clear prompt gets a better answer."
      },
      {
        "w": "generative AI",
        "pos": "noun",
        "ph": "/ˌdʒen.ər.ə.tɪv ˌeɪˈaɪ/",
        "v": "AI tạo sinh",
        "ex": "Generative AI writes text and draws images."
      },
      {
        "w": "fine-tune",
        "pos": "verb",
        "ph": "/ˌfaɪnˈtjuːn/",
        "v": "tinh chỉnh (mô hình)",
        "ex": "Fine-tune the model on medical texts."
      },
      {
        "w": "inference",
        "pos": "noun",
        "ph": "/ˈɪn.fər.əns/",
        "v": "suy luận (chạy mô hình)",
        "ex": "Inference runs on a smaller server."
      },
      {
        "w": "supervised learning",
        "pos": "noun",
        "ph": "/ˌsuː.pə.vaɪzd ˈlɜː.nɪŋ/",
        "v": "học có giám sát",
        "ex": "Supervised learning needs labeled data."
      },
      {
        "w": "recommendation system",
        "pos": "noun",
        "ph": "/ˌrek.ə.menˈdeɪ.ʃən ˌsɪs.təm/",
        "v": "hệ gợi ý",
        "ex": "The recommendation system suggests new films."
      },
      {
        "w": "benchmark",
        "pos": "noun",
        "ph": "/ˈbentʃ.mɑːk/",
        "v": "chuẩn so sánh",
        "ex": "The new model beats every benchmark."
      },
      {
        "w": "underfitting",
        "pos": "noun",
        "ph": "/ˌʌn.dəˈfɪt.ɪŋ/",
        "v": "dưới khớp",
        "ex": "Underfitting means the model is too simple."
      },
      {
        "w": "gradient descent",
        "pos": "noun",
        "ph": "/ˌɡreɪ.di.ənt dɪˈsent/",
        "v": "hạ gradient",
        "ex": "Gradient descent minimizes the loss function."
      },
      {
        "w": "epoch",
        "pos": "noun",
        "ph": "/ˈiː.pɒk/",
        "v": "vòng huấn luyện",
        "ex": "One epoch is a full pass over the dataset."
      },
      {
        "w": "embedding",
        "pos": "noun",
        "ph": "/ɪmˈbed.ɪŋ/",
        "v": "vector nhúng",
        "ex": "An embedding turns a word into a vector."
      },
      {
        "w": "hallucination",
        "pos": "noun",
        "ph": "/həˌluː.sɪˈneɪ.ʃən/",
        "v": "ảo giác (AI bịa)",
        "ex": "RAG reduces AI hallucination."
      },
      {
        "w": "reinforcement",
        "pos": "noun",
        "ph": "/ˌriː.ɪnˈfɔːs.mənt/",
        "v": "học tăng cường",
        "ex": "Reinforcement learning rewards good actions."
      },
      {
        "w": "weight",
        "pos": "noun",
        "ph": "/weɪt/",
        "v": "trọng số",
        "ex": "Training gradually adjusts the weights of the network."
      },
      {
        "w": "loss function",
        "pos": "noun",
        "ph": "/lɒs ˈfʌŋk.ʃən/",
        "v": "hàm mất mát",
        "ex": "The loss function measures how wrong each prediction is."
      },
      {
        "w": "learning rate",
        "pos": "noun",
        "ph": "/ˈlɜː.nɪŋ reɪt/",
        "v": "tốc độ học",
        "ex": "A learning rate that is too high makes training unstable."
      },
      {
        "w": "validation set",
        "pos": "noun",
        "ph": "/ˌvæl.ɪˈdeɪ.ʃən set/",
        "v": "tập kiểm định",
        "ex": "Tune the model on the validation set, not on the test set."
      },
      {
        "w": "feature engineering",
        "pos": "noun",
        "ph": "/ˈfiː.tʃər ˌen.dʒɪˈnɪə.rɪŋ/",
        "v": "kỹ thuật tạo đặc trưng",
        "ex": "Good feature engineering often beats a fancier model."
      },
      {
        "w": "normalization",
        "pos": "noun",
        "ph": "/ˌnɔː.mə.laɪˈzeɪ.ʃən/",
        "v": "chuẩn hoá dữ liệu",
        "ex": "Normalization puts every feature on a similar scale."
      },
      {
        "w": "confusion matrix",
        "pos": "noun",
        "ph": "/kənˈfjuː.ʒən ˈmeɪ.trɪks/",
        "v": "ma trận nhầm lẫn",
        "ex": "The confusion matrix shows the false positives clearly."
      },
      {
        "w": "precision",
        "pos": "noun",
        "ph": "/prɪˈsɪʒ.ən/",
        "v": "độ chuẩn xác (trong dự đoán dương)",
        "ex": "Precision matters most when false alarms are costly."
      },
      {
        "w": "recall",
        "pos": "noun",
        "ph": "/rɪˈkɔːl/",
        "v": "độ bao phủ, độ nhạy",
        "ex": "Recall tells us how many real cases the model found."
      },
      {
        "w": "unsupervised learning",
        "pos": "noun",
        "ph": "/ˌʌn.ˈsuː.pə.vaɪzd ˈlɜː.nɪŋ/",
        "v": "học không giám sát",
        "ex": "Clustering customers is a form of unsupervised learning."
      },
      {
        "w": "transfer learning",
        "pos": "noun",
        "ph": "/ˈtræns.fɜː ˈlɜː.nɪŋ/",
        "v": "học chuyển giao",
        "ex": "Transfer learning reuses a model trained on a bigger dataset."
      },
      {
        "w": "annotation",
        "pos": "noun",
        "ph": "/ˌæn.əˈteɪ.ʃən/",
        "v": "việc gán nhãn dữ liệu",
        "ex": "Image annotation is slow and expensive work."
      },
      {
        "w": "corpus",
        "pos": "noun",
        "ph": "/ˈkɔː.pəs/",
        "v": "kho ngữ liệu",
        "ex": "The model was trained on a huge text corpus."
      },
      {
        "w": "tokenization",
        "pos": "noun",
        "ph": "/ˌtəʊ.kən.aɪˈzeɪ.ʃən/",
        "v": "việc tách token",
        "ex": "Tokenization splits a sentence into smaller units."
      },
      {
        "w": "ground truth",
        "pos": "noun",
        "ph": "/ɡraʊnd truːθ/",
        "v": "nhãn thực tế dùng để đối chiếu",
        "ex": "Compare each prediction with the ground truth."
      },
      {
        "w": "data drift",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə drɪft/",
        "v": "sự trôi dữ liệu theo thời gian",
        "ex": "Data drift slowly makes an old model less accurate."
      },
      {
        "w": "overfit",
        "pos": "verb",
        "ph": "/ˌəʊ.vəˈfɪt/",
        "v": "học vẹt dữ liệu huấn luyện",
        "ex": "The model overfits when the dataset is too small."
      },
      {
        "w": "hyperparameter",
        "pos": "noun",
        "ph": "/ˌhaɪ.pəpəˈræm.ɪ.tər/",
        "v": "siêu tham số",
        "ex": "Batch size is a hyperparameter you tune by hand."
      },
      {
        "w": "cross-validation",
        "pos": "noun",
        "ph": "/krɒs ˌvæl.ɪˈdeɪ.ʃən/",
        "v": "kiểm định chéo",
        "ex": "Cross-validation gives a more honest accuracy estimate."
      },
      {
        "w": "labelled data",
        "pos": "noun",
        "ph": "/ˈleɪ.bəld ˈdeɪ.tə/",
        "v": "dữ liệu đã gán nhãn",
        "ex": "Labelled data is the expensive part of any project."
      },
      {
        "w": "synthetic data",
        "pos": "noun",
        "ph": "/sɪnˈθet.ɪk ˈdeɪ.tə/",
        "v": "dữ liệu tổng hợp",
        "ex": "Synthetic data helps when real samples are rare."
      },
      {
        "w": "data pipeline",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˈpaɪp.laɪn/",
        "v": "luồng xử lý dữ liệu",
        "ex": "The data pipeline cleans and stores records every night."
      },
      {
        "w": "feature store",
        "pos": "noun",
        "ph": "/ˈfiː.tʃər stɔːr/",
        "v": "kho đặc trưng",
        "ex": "A feature store shares features between teams."
      },
      {
        "w": "model registry",
        "pos": "noun",
        "ph": "/ˈmɒd.əl ˈredʒ.ɪ.stri/",
        "v": "kho quản lý mô hình",
        "ex": "Every trained model is versioned in the model registry."
      },
      {
        "w": "explainability",
        "pos": "noun",
        "ph": "/ɪkˌspleɪ.nəˈbɪl.ə.ti/",
        "v": "khả năng giải thích của mô hình",
        "ex": "Explainability matters when the model refuses a loan."
      },
      {
        "w": "fairness",
        "pos": "noun",
        "ph": "/ˈfeə.nəs/",
        "v": "tính công bằng của mô hình",
        "ex": "Fairness testing checks the model across age groups."
      },
      {
        "w": "anomaly detection",
        "pos": "noun",
        "ph": "/əˈnɒm.ə.li dɪˈtek.ʃən/",
        "v": "phát hiện bất thường",
        "ex": "Anomaly detection flags unusual bank transfers."
      },
      {
        "w": "time series",
        "pos": "noun",
        "ph": "/taɪm ˈsɪə.riːz/",
        "v": "chuỗi thời gian",
        "ex": "Sales figures are a classic time series."
      },
      {
        "w": "vector database",
        "pos": "noun",
        "ph": "/ˈvek.tər ˈdeɪ.tə.beɪs/",
        "v": "cơ sở dữ liệu vectơ",
        "ex": "A vector database finds the most similar documents fast."
      },
      {
        "w": "retrieval",
        "pos": "noun",
        "ph": "/rɪˈtriː.vəl/",
        "v": "việc truy hồi tài liệu",
        "ex": "Retrieval feeds the model real documents before it answers."
      },
      {
        "w": "context window",
        "pos": "noun",
        "ph": "/ˈkɒn.tekst ˈwɪn.dəʊ/",
        "v": "cửa sổ ngữ cảnh",
        "ex": "A longer context window lets the model read the whole file."
      }
    ]
  },
  {
    "topic": "security",
    "label": "🔐 An toàn thông tin",
    "words": [
      {
        "w": "cybersecurity",
        "pos": "noun",
        "ph": "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/",
        "v": "an ninh mạng",
        "ex": "Cybersecurity protects systems from attacks."
      },
      {
        "w": "vulnerability",
        "pos": "noun",
        "ph": "/ˌvʌl.nər.əˈbɪl.ə.ti/",
        "v": "lỗ hổng bảo mật",
        "ex": "Patch the vulnerability before release."
      },
      {
        "w": "exploit",
        "pos": "noun",
        "ph": "/ˈek.splɔɪt/",
        "v": "mã khai thác lỗ hổng",
        "ex": "The exploit targets an old browser version."
      },
      {
        "w": "threat",
        "pos": "noun",
        "ph": "/θret/",
        "v": "mối đe doạ",
        "ex": "Phishing is a common online threat."
      },
      {
        "w": "attacker",
        "pos": "noun",
        "ph": "/əˈtæk.ər/",
        "v": "kẻ tấn công",
        "ex": "The attacker guessed weak passwords."
      },
      {
        "w": "phishing",
        "pos": "noun",
        "ph": "/ˈfɪʃ.ɪŋ/",
        "v": "lừa đảo qua email/tin giả",
        "ex": "Phishing emails pretend to be your bank."
      },
      {
        "w": "ransomware",
        "pos": "noun",
        "ph": "/ˈræn.səm.weər/",
        "v": "mã độc tống tiền",
        "ex": "Ransomware locks files until you pay."
      },
      {
        "w": "spyware",
        "pos": "noun",
        "ph": "/ˈspaɪ.weər/",
        "v": "phần mềm gián điệp",
        "ex": "Spyware secretly records your activity."
      },
      {
        "w": "virus",
        "pos": "noun",
        "ph": "/ˈvaɪə.rəs/",
        "v": "vi-rút máy tính",
        "ex": "The virus spread through email attachments."
      },
      {
        "w": "trojan",
        "pos": "noun",
        "ph": "/ˈtrəʊ.dʒən/",
        "v": "mã độc trá hình (trojan)",
        "ex": "A trojan hides inside a free game."
      },
      {
        "w": "data breach",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə ˌbriːtʃ/",
        "v": "rò rỉ dữ liệu",
        "ex": "The data breach exposed user emails."
      },
      {
        "w": "leak",
        "pos": "noun",
        "ph": "/liːk/",
        "v": "sự rò rỉ",
        "ex": "The leak revealed private documents."
      },
      {
        "w": "penetration testing",
        "pos": "noun",
        "ph": "/ˌpen.ɪˈtreɪ.ʃən ˌtes.tɪŋ/",
        "v": "kiểm thử xâm nhập",
        "ex": "Penetration testing finds weaknesses legally."
      },
      {
        "w": "ethical hacker",
        "pos": "noun",
        "ph": "/ˌeθ.ɪ.kəl ˈhæk.ər/",
        "v": "hacker mũ trắng",
        "ex": "An ethical hacker reports the bugs found."
      },
      {
        "w": "social engineering",
        "pos": "noun",
        "ph": "/ˌsəʊ.ʃəl ˌen.dʒɪˈnɪə.rɪŋ/",
        "v": "tấn công phi kỹ thuật (lừa người)",
        "ex": "Social engineering tricks people, not machines."
      },
      {
        "w": "two-factor authentication",
        "pos": "noun",
        "ph": "/ˌtuː ˌfæk.tər ɔːˌθen.tɪˈkeɪ.ʃən/",
        "v": "xác thực hai lớp",
        "ex": "Two-factor authentication stops most account theft."
      },
      {
        "w": "biometrics",
        "pos": "noun",
        "ph": "/ˌbaɪ.əʊˈmet.rɪks/",
        "v": "sinh trắc học",
        "ex": "Biometrics unlock the phone with your face."
      },
      {
        "w": "permission",
        "pos": "noun",
        "ph": "/pəˈmɪʃ.ən/",
        "v": "quyền truy cập",
        "ex": "The app asks for camera permission."
      },
      {
        "w": "privilege",
        "pos": "noun",
        "ph": "/ˈprɪv.əl.ɪdʒ/",
        "v": "đặc quyền (hệ thống)",
        "ex": "Admin privilege allows installing software."
      },
      {
        "w": "access control",
        "pos": "noun",
        "ph": "/ˈæk.ses kənˌtrəʊl/",
        "v": "kiểm soát truy cập",
        "ex": "Access control limits who sees the data."
      },
      {
        "w": "audit",
        "pos": "noun",
        "ph": "/ˈɔː.dɪt/",
        "v": "kiểm toán / rà soát",
        "ex": "The security audit runs every quarter."
      },
      {
        "w": "incident",
        "pos": "noun",
        "ph": "/ˈɪn.sɪ.dənt/",
        "v": "sự cố",
        "ex": "Report the incident to the security team."
      },
      {
        "w": "encryption key",
        "pos": "noun",
        "ph": "/ɪnˈkrɪp.ʃən ˌkiː/",
        "v": "khoá mã hoá",
        "ex": "Never share your encryption key."
      },
      {
        "w": "decryption",
        "pos": "noun",
        "ph": "/diːˈkrɪp.ʃən/",
        "v": "giải mã",
        "ex": "Decryption needs the correct key."
      },
      {
        "w": "digital signature",
        "pos": "noun",
        "ph": "/ˌdɪdʒ.ɪ.təl ˈsɪɡ.nə.tʃər/",
        "v": "chữ ký số",
        "ex": "A digital signature proves the sender."
      },
      {
        "w": "certificate",
        "pos": "noun",
        "ph": "/səˈtɪf.ɪ.kət/",
        "v": "chứng chỉ (bảo mật)",
        "ex": "The site’s certificate expired yesterday."
      },
      {
        "w": "privacy",
        "pos": "noun",
        "ph": "/ˈprɪv.ə.si/",
        "v": "quyền riêng tư",
        "ex": "The new law protects user privacy."
      },
      {
        "w": "anonymous",
        "pos": "adj",
        "ph": "/əˈnɒn.ɪ.məs/",
        "v": "ẩn danh",
        "ex": "The survey keeps answers anonymous."
      },
      {
        "w": "spam",
        "pos": "noun",
        "ph": "/spæm/",
        "v": "thư rác",
        "ex": "The filter moves spam to a separate folder."
      },
      {
        "w": "firewall rule",
        "pos": "noun",
        "ph": "/ˈfaɪə.wɔːl ˌruːl/",
        "v": "luật tường lửa",
        "ex": "Add a firewall rule to block that port."
      },
      {
        "w": "password strength",
        "pos": "noun",
        "ph": "/ˈpɑːs.wɜːd ˌstreŋθ/",
        "v": "độ mạnh mật khẩu",
        "ex": "Length matters most for password strength."
      },
      {
        "w": "security patch",
        "pos": "noun",
        "ph": "/sɪˈkjʊə.rə.ti ˌpætʃ/",
        "v": "bản vá bảo mật",
        "ex": "Install security patches as soon as possible."
      },
      {
        "w": "sandbox",
        "pos": "noun",
        "ph": "/ˈsænd.bɒks/",
        "v": "môi trường cách ly",
        "ex": "Run unknown files in a sandbox."
      },
      {
        "w": "whitelist",
        "pos": "noun",
        "ph": "/ˈwaɪt.lɪst/",
        "v": "danh sách cho phép",
        "ex": "Only apps on the whitelist can run."
      },
      {
        "w": "backdoor",
        "pos": "noun",
        "ph": "/ˈbæk.dɔːr/",
        "v": "cửa hậu (truy cập ngầm)",
        "ex": "The malware installed a hidden backdoor."
      },
      {
        "w": "authorization",
        "pos": "noun",
        "ph": "/ˌɔː.θər.aɪˈzeɪ.ʃən/",
        "v": "phân quyền",
        "ex": "Authorization decides what a user may do."
      },
      {
        "w": "hashing",
        "pos": "noun",
        "ph": "/ˈhæʃ.ɪŋ/",
        "v": "băm (mật khẩu)",
        "ex": "Passwords are stored using hashing, never plain text."
      },
      {
        "w": "salt",
        "pos": "noun",
        "ph": "/sɒlt/",
        "v": "chuỗi muối (băm)",
        "ex": "A salt makes each password hash unique."
      },
      {
        "w": "brute force",
        "pos": "noun",
        "ph": "/ˌbruːt ˈfɔːs/",
        "v": "tấn công dò cạn",
        "ex": "A long password resists brute force attacks."
      },
      {
        "w": "zero-day",
        "pos": "noun",
        "ph": "/ˌzɪə.rəʊ ˈdeɪ/",
        "v": "lỗ hổng 0-day",
        "ex": "A zero-day has no patch available yet."
      },
      {
        "w": "penetration test",
        "pos": "noun",
        "ph": "/ˌpen.ɪˈtreɪ.ʃən ˌtest/",
        "v": "kiểm thử xâm nhập",
        "ex": "A penetration test finds weaknesses before hackers do."
      },
      {
        "w": "SQL injection",
        "pos": "noun",
        "ph": "/ˌes.kjuːˈel ɪnˌdʒek.ʃən/",
        "v": "tấn công chèn SQL",
        "ex": "Parameterized queries prevent SQL injection."
      },
      {
        "w": "two-factor",
        "pos": "adj",
        "ph": "/ˌtuː ˈfæk.tər/",
        "v": "xác thực hai lớp",
        "ex": "Two-factor login adds an extra code."
      },
      {
        "w": "audit log",
        "pos": "noun",
        "ph": "/ˈɔː.dɪt ˌlɒɡ/",
        "v": "nhật ký kiểm tra",
        "ex": "The audit log records every admin action."
      },
      {
        "w": "keylogger",
        "pos": "noun",
        "ph": "/ˈkiːˌlɒɡ.ər/",
        "v": "phần mềm ghi lại phím gõ",
        "ex": "A keylogger records everything the user types."
      },
      {
        "w": "botnet",
        "pos": "noun",
        "ph": "/ˈbɒt.net/",
        "v": "mạng máy tính bị chiếm quyền",
        "ex": "The attack came from a botnet of thousands of devices."
      },
      {
        "w": "DDoS attack",
        "pos": "noun",
        "ph": "/ˌdiː.dɒs əˈtæk/",
        "v": "tấn công từ chối dịch vụ phân tán",
        "ex": "A DDoS attack floods the server until it stops responding."
      },
      {
        "w": "password manager",
        "pos": "noun",
        "ph": "/ˈpɑːs.wɜːd ˈmæn.ɪ.dʒər/",
        "v": "trình quản lý mật khẩu",
        "ex": "A password manager creates and stores strong passwords for you."
      },
      {
        "w": "session hijacking",
        "pos": "noun",
        "ph": "/ˈseʃ.ən ˈhaɪ.dʒæk.ɪŋ/",
        "v": "chiếm phiên đăng nhập",
        "ex": "Session hijacking lets an attacker act as the logged-in user."
      },
      {
        "w": "man-in-the-middle",
        "pos": "noun",
        "ph": "/ˌmæn.ɪn.ðəˈmɪd.əl/",
        "v": "tấn công xen giữa",
        "ex": "Public Wi-Fi makes a man-in-the-middle attack easier."
      },
      {
        "w": "spoofing",
        "pos": "noun",
        "ph": "/ˈspuː.fɪŋ/",
        "v": "sự giả mạo danh tính",
        "ex": "Email spoofing makes a fake message look official."
      },
      {
        "w": "antivirus",
        "pos": "noun",
        "ph": "/ˌæn.tiˈvaɪə.rəs/",
        "v": "phần mềm diệt vi-rút",
        "ex": "Keep the antivirus database up to date."
      },
      {
        "w": "least privilege",
        "pos": "noun",
        "ph": "/liːst ˈprɪv.əl.ɪdʒ/",
        "v": "nguyên tắc đặc quyền tối thiểu",
        "ex": "Follow least privilege: give each account only what it needs."
      },
      {
        "w": "risk assessment",
        "pos": "noun",
        "ph": "/rɪsk əˈses.mənt/",
        "v": "đánh giá rủi ro",
        "ex": "Start with a risk assessment of the whole system."
      },
      {
        "w": "forensics",
        "pos": "noun",
        "ph": "/fəˈren.zɪks/",
        "v": "điều tra số",
        "ex": "Digital forensics traced the intrusion to one laptop."
      },
      {
        "w": "integrity",
        "pos": "noun",
        "ph": "/ɪnˈteɡ.rə.ti/",
        "v": "tính toàn vẹn dữ liệu",
        "ex": "Hashing protects the integrity of the file."
      },
      {
        "w": "confidentiality",
        "pos": "noun",
        "ph": "/ˌkɒn.fɪ.den.ʃiˈæl.ə.ti/",
        "v": "tính bí mật",
        "ex": "Encryption ensures the confidentiality of the message."
      },
      {
        "w": "availability",
        "pos": "noun",
        "ph": "/əˌveɪ.ləˈbɪl.ə.ti/",
        "v": "tính sẵn sàng của hệ thống",
        "ex": "Backups protect the availability of the service."
      },
      {
        "w": "countermeasure",
        "pos": "noun",
        "ph": "/ˈkaʊn.təˌmeʒ.ər/",
        "v": "biện pháp đối phó",
        "ex": "Rate limiting is a cheap countermeasure against brute force."
      },
      {
        "w": "honeypot",
        "pos": "noun",
        "ph": "/ˈhʌn.i.pɒt/",
        "v": "bẫy nhử tin tặc",
        "ex": "A honeypot attracts attackers so you can study them."
      },
      {
        "w": "multi-factor authentication",
        "pos": "noun",
        "ph": "/ˌmʌl.tiˈfæk.tər ɔːˌθen.tɪˈkeɪ.ʃən/",
        "v": "xác thực nhiều yếu tố",
        "ex": "Multi-factor authentication blocks most stolen-password attacks."
      },
      {
        "w": "single sign-on",
        "pos": "noun",
        "ph": "/ˌsɪŋ.ɡəl saɪnˈɒn/",
        "v": "đăng nhập một lần",
        "ex": "Single sign-on lets staff use one account for every tool."
      },
      {
        "w": "security policy",
        "pos": "noun",
        "ph": "/sɪˈkjʊə.rə.ti ˈpɒl.ə.si/",
        "v": "chính sách an toàn thông tin",
        "ex": "The security policy bans shared accounts."
      },
      {
        "w": "data retention",
        "pos": "noun",
        "ph": "/ˈdeɪ.tə rɪˈten.ʃən/",
        "v": "thời hạn lưu giữ dữ liệu",
        "ex": "Our data retention rule deletes logs after 90 days."
      },
      {
        "w": "anonymization",
        "pos": "noun",
        "ph": "/əˌnɒn.ɪ.maɪˈzeɪ.ʃən/",
        "v": "ẩn danh hoá dữ liệu",
        "ex": "Anonymization removes names before the data is shared."
      },
      {
        "w": "security awareness",
        "pos": "noun",
        "ph": "/sɪˈkjʊə.rə.ti əˈweə.nəs/",
        "v": "nhận thức an toàn thông tin",
        "ex": "Security awareness training reduced phishing clicks by half."
      },
      {
        "w": "incident response",
        "pos": "noun",
        "ph": "/ˈɪn.sɪ.dənt rɪˈspɒns/",
        "v": "ứng phó sự cố",
        "ex": "The incident response plan says who to call first."
      },
      {
        "w": "patch cycle",
        "pos": "noun",
        "ph": "/pætʃ ˈsaɪ.kəl/",
        "v": "chu kỳ vá lỗi",
        "ex": "A monthly patch cycle keeps the servers current."
      },
      {
        "w": "endpoint protection",
        "pos": "noun",
        "ph": "/ˈend.pɔɪnt prəˈtek.ʃən/",
        "v": "bảo vệ máy trạm",
        "ex": "Endpoint protection scans every laptop in the company."
      },
      {
        "w": "insider threat",
        "pos": "noun",
        "ph": "/ɪnˈsaɪ.dər θret/",
        "v": "nguy cơ từ nội bộ",
        "ex": "An insider threat is harder to spot than an outside attack."
      },
      {
        "w": "supply chain attack",
        "pos": "noun",
        "ph": "/səˈplaɪ tʃeɪn əˈtæk/",
        "v": "tấn công chuỗi cung ứng",
        "ex": "A supply chain attack hides malware in a trusted update."
      },
      {
        "w": "security by design",
        "pos": "noun",
        "ph": "/sɪˈkjʊə.rə.ti baɪ dɪˈzaɪn/",
        "v": "an toàn ngay từ thiết kế",
        "ex": "Security by design is cheaper than fixing holes later."
      },
      {
        "w": "vulnerability scan",
        "pos": "noun",
        "ph": "/ˌvʌl.nər.əˈbɪl.ə.ti skæn/",
        "v": "quét lỗ hổng",
        "ex": "Run a vulnerability scan before every release."
      },
      {
        "w": "access log",
        "pos": "noun",
        "ph": "/ˈæk.ses lɒɡ/",
        "v": "nhật ký truy cập",
        "ex": "The access log shows who opened the file and when."
      }
    ]
  },
  {
    "topic": "yte",
    "label": "🩺 Y tế",
    "words": [
      {
        "w": "diagnosis",
        "pos": "noun",
        "ph": "/ˌdaɪ.əɡˈnəʊ.sɪs/",
        "v": "sự chẩn đoán",
        "ex": "Early diagnosis saves lives."
      },
      {
        "w": "symptom",
        "pos": "noun",
        "ph": "/ˈsɪmp.təm/",
        "v": "triệu chứng",
        "ex": "Fever is a common symptom of the flu."
      },
      {
        "w": "treatment",
        "pos": "noun",
        "ph": "/ˈtriːt.mənt/",
        "v": "sự điều trị",
        "ex": "The treatment lasted two weeks."
      },
      {
        "w": "vaccine",
        "pos": "noun",
        "ph": "/ˈvæk.siːn/",
        "v": "vắc-xin",
        "ex": "The vaccine prevents serious illness."
      },
      {
        "w": "surgery",
        "pos": "noun",
        "ph": "/ˈsɜː.dʒər.i/",
        "v": "phẫu thuật",
        "ex": "She recovered well after surgery."
      },
      {
        "w": "prescription",
        "pos": "noun",
        "ph": "/prɪˈskrɪp.ʃən/",
        "v": "đơn thuốc",
        "ex": "You need a prescription for this medicine."
      },
      {
        "w": "infection",
        "pos": "noun",
        "ph": "/ɪnˈfek.ʃən/",
        "v": "sự nhiễm trùng",
        "ex": "Wash the wound to avoid infection."
      },
      {
        "w": "antibiotic",
        "pos": "noun",
        "ph": "/ˌæn.ti.baɪˈɒt.ɪk/",
        "v": "thuốc kháng sinh",
        "ex": "Antibiotics fight bacterial infections."
      },
      {
        "w": "immune",
        "pos": "adj",
        "ph": "/ɪˈmjuːn/",
        "v": "(thuộc) miễn dịch",
        "ex": "A strong immune system fights disease."
      },
      {
        "w": "chronic",
        "pos": "adj",
        "ph": "/ˈkrɒn.ɪk/",
        "v": "mãn tính",
        "ex": "Diabetes is a chronic disease."
      },
      {
        "w": "dosage",
        "pos": "noun",
        "ph": "/ˈdəʊ.sɪdʒ/",
        "v": "liều lượng",
        "ex": "Follow the dosage on the label."
      },
      {
        "w": "therapy",
        "pos": "noun",
        "ph": "/ˈθer.ə.pi/",
        "v": "liệu pháp",
        "ex": "Physical therapy helped him walk again."
      },
      {
        "w": "nutrition",
        "pos": "noun",
        "ph": "/njuːˈtrɪʃ.ən/",
        "v": "dinh dưỡng",
        "ex": "Good nutrition supports growth."
      },
      {
        "w": "recovery",
        "pos": "noun",
        "ph": "/rɪˈkʌv.ər.i/",
        "v": "sự hồi phục",
        "ex": "Rest speeds up recovery."
      },
      {
        "w": "patient",
        "pos": "noun",
        "ph": "/ˈpeɪ.ʃənt/",
        "v": "bệnh nhân",
        "ex": "The doctor examined the patient."
      },
      {
        "w": "physician",
        "pos": "noun",
        "ph": "/fɪˈzɪʃ.ən/",
        "v": "bác sĩ (nội khoa)",
        "ex": "Consult a physician before taking it."
      },
      {
        "w": "allergy",
        "pos": "noun",
        "ph": "/ˈæl.ə.dʒi/",
        "v": "dị ứng",
        "ex": "He has an allergy to peanuts."
      },
      {
        "w": "inflammation",
        "pos": "noun",
        "ph": "/ˌɪn.fləˈmeɪ.ʃən/",
        "v": "sự viêm",
        "ex": "Ice reduces inflammation."
      },
      {
        "w": "anesthesia",
        "pos": "noun",
        "ph": "/ˌæn.əsˈθiː.zi.ə/",
        "v": "sự gây mê",
        "ex": "The surgery is done under anesthesia."
      },
      {
        "w": "pulse",
        "pos": "noun",
        "ph": "/pʌls/",
        "v": "mạch (đập)",
        "ex": "The nurse checked his pulse."
      },
      {
        "w": "wound",
        "pos": "noun",
        "ph": "/wuːnd/",
        "v": "vết thương",
        "ex": "Clean the wound carefully."
      },
      {
        "w": "hygiene",
        "pos": "noun",
        "ph": "/ˈhaɪ.dʒiːn/",
        "v": "vệ sinh",
        "ex": "Hand hygiene prevents disease."
      },
      {
        "w": "epidemic",
        "pos": "noun",
        "ph": "/ˌep.ɪˈdem.ɪk/",
        "v": "dịch bệnh",
        "ex": "The epidemic spread to nearby cities."
      },
      {
        "w": "dehydration",
        "pos": "noun",
        "ph": "/ˌdiː.haɪˈdreɪ.ʃən/",
        "v": "sự mất nước",
        "ex": "Drink water to avoid dehydration."
      },
      {
        "w": "fracture",
        "pos": "noun",
        "ph": "/ˈfræk.tʃər/",
        "v": "sự gãy xương",
        "ex": "The X-ray showed a fracture."
      },
      {
        "w": "transfusion",
        "pos": "noun",
        "ph": "/trænsˈfjuː.ʒən/",
        "v": "sự truyền máu",
        "ex": "The patient needed a blood transfusion."
      },
      {
        "w": "contagious",
        "pos": "adj",
        "ph": "/kənˈteɪ.dʒəs/",
        "v": "dễ lây",
        "ex": "Measles is highly contagious."
      },
      {
        "w": "rehabilitation",
        "pos": "noun",
        "ph": "/ˌriː.əˌbɪl.ɪˈteɪ.ʃən/",
        "v": "sự phục hồi chức năng",
        "ex": "Rehabilitation takes several months."
      },
      {
        "w": "cardiac",
        "pos": "adj",
        "ph": "/ˈkɑː.di.æk/",
        "v": "(thuộc) tim",
        "ex": "He has a cardiac condition."
      },
      {
        "w": "tumor",
        "pos": "noun",
        "ph": "/ˈtjuː.mər/",
        "v": "khối u",
        "ex": "The tumor was benign."
      },
      {
        "w": "sterile",
        "pos": "adj",
        "ph": "/ˈster.aɪl/",
        "v": "vô trùng",
        "ex": "Use sterile instruments in surgery."
      },
      {
        "w": "clinic",
        "pos": "noun",
        "ph": "/ˈklɪn.ɪk/",
        "v": "phòng khám",
        "ex": "The clinic opens at eight."
      },
      {
        "w": "genetic",
        "pos": "adj",
        "ph": "/dʒəˈnet.ɪk/",
        "v": "(thuộc) di truyền",
        "ex": "Some diseases are genetic."
      },
      {
        "w": "pharmacy",
        "pos": "noun",
        "ph": "/ˈfɑː.mə.si/",
        "v": "nhà thuốc",
        "ex": "Buy the medicine at the pharmacy."
      },
      {
        "w": "checkup",
        "pos": "noun",
        "ph": "/ˈtʃek.ʌp/",
        "v": "khám sức khoẻ định kỳ",
        "ex": "Go for a checkup once a year."
      },
      {
        "w": "nurse",
        "pos": "noun",
        "ph": "/nɜːs/",
        "v": "y tá / điều dưỡng",
        "ex": "The nurse changed his bandage."
      },
      {
        "w": "blood pressure",
        "pos": "noun",
        "ph": "/ˈblʌd ˌpreʃ.ər/",
        "v": "huyết áp",
        "ex": "High blood pressure is dangerous."
      },
      {
        "w": "diabetes",
        "pos": "noun",
        "ph": "/ˌdaɪ.əˈbiː.tiːz/",
        "v": "bệnh tiểu đường",
        "ex": "Diabetes affects blood sugar levels."
      },
      {
        "w": "obesity",
        "pos": "noun",
        "ph": "/əʊˈbiː.sə.ti/",
        "v": "béo phì",
        "ex": "Obesity raises the risk of heart disease."
      },
      {
        "w": "quarantine",
        "pos": "noun",
        "ph": "/ˈkwɒr.ən.tiːn/",
        "v": "sự cách ly",
        "ex": "Travelers were placed in quarantine."
      },
      {
        "w": "outbreak",
        "pos": "noun",
        "ph": "/ˈaʊt.breɪk/",
        "v": "sự bùng phát dịch",
        "ex": "A flu outbreak closed the school."
      },
      {
        "w": "first aid",
        "pos": "noun",
        "ph": "/ˌfɜːst ˈeɪd/",
        "v": "sơ cứu",
        "ex": "She gave first aid to the injured man."
      },
      {
        "w": "prognosis",
        "pos": "noun",
        "ph": "/prɒɡˈnəʊ.sɪs/",
        "v": "tiên lượng bệnh",
        "ex": "The prognosis is good if treatment starts early."
      },
      {
        "w": "referral",
        "pos": "noun",
        "ph": "/rɪˈfɜː.rəl/",
        "v": "giấy chuyển tuyến",
        "ex": "The clinic gave her a referral to a specialist."
      },
      {
        "w": "specialist",
        "pos": "noun",
        "ph": "/ˈspeʃ.əl.ɪst/",
        "v": "bác sĩ chuyên khoa",
        "ex": "You should see a specialist about that pain."
      },
      {
        "w": "side effect",
        "pos": "noun",
        "ph": "/ˈsaɪd ɪˌfekt/",
        "v": "tác dụng phụ",
        "ex": "Drowsiness is a common side effect of this drug."
      },
      {
        "w": "injection",
        "pos": "noun",
        "ph": "/ɪnˈdʒek.ʃən/",
        "v": "mũi tiêm",
        "ex": "The nurse gave him an injection in the arm."
      },
      {
        "w": "ward",
        "pos": "noun",
        "ph": "/wɔːd/",
        "v": "khoa, buồng bệnh",
        "ex": "He was moved to the surgical ward after the operation."
      },
      {
        "w": "emergency room",
        "pos": "noun",
        "ph": "/ɪˈmɜː.dʒən.si ruːm/",
        "v": "phòng cấp cứu",
        "ex": "She was taken to the emergency room at midnight."
      },
      {
        "w": "ambulance",
        "pos": "noun",
        "ph": "/ˈæm.bjə.ləns/",
        "v": "xe cứu thương",
        "ex": "Call an ambulance immediately."
      },
      {
        "w": "x-ray",
        "pos": "noun",
        "ph": "/ˈeks.reɪ/",
        "v": "phim chụp X-quang",
        "ex": "The x-ray showed a broken rib."
      },
      {
        "w": "ultrasound",
        "pos": "noun",
        "ph": "/ˈʌl.trə.saʊnd/",
        "v": "siêu âm",
        "ex": "An ultrasound checks how the baby is growing."
      },
      {
        "w": "screening",
        "pos": "noun",
        "ph": "/ˈskriː.nɪŋ/",
        "v": "sàng lọc",
        "ex": "Regular screening detects the disease early."
      },
      {
        "w": "vital signs",
        "pos": "noun",
        "ph": "/ˈvaɪ.təl saɪnz/",
        "v": "dấu hiệu sinh tồn",
        "ex": "Nurses record vital signs every four hours."
      },
      {
        "w": "painkiller",
        "pos": "noun",
        "ph": "/ˈpeɪnˌkɪl.ər/",
        "v": "thuốc giảm đau",
        "ex": "Take a painkiller if the pain comes back."
      },
      {
        "w": "antiseptic",
        "pos": "noun",
        "ph": "/ˌæn.tiˈsep.tɪk/",
        "v": "thuốc sát khuẩn",
        "ex": "Clean the wound with an antiseptic first."
      },
      {
        "w": "nausea",
        "pos": "noun",
        "ph": "/ˈnɔː.zi.ə/",
        "v": "buồn nôn",
        "ex": "Nausea is common in the first weeks of pregnancy."
      },
      {
        "w": "fatigue",
        "pos": "noun",
        "ph": "/fəˈtiːɡ/",
        "v": "sự mệt mỏi kéo dài",
        "ex": "Constant fatigue can be a sign of anaemia."
      },
      {
        "w": "relapse",
        "pos": "noun",
        "ph": "/rɪˈlæps/",
        "v": "sự tái phát",
        "ex": "He had a relapse two months after treatment."
      },
      {
        "w": "consent form",
        "pos": "noun",
        "ph": "/kənˈsent fɔːm/",
        "v": "giấy đồng ý (trước thủ thuật)",
        "ex": "Sign the consent form before the operation."
      },
      {
        "w": "medical record",
        "pos": "noun",
        "ph": "/ˈmed.ɪ.kəl ˈrek.ɔːd/",
        "v": "hồ sơ bệnh án",
        "ex": "The doctor checked her medical record first."
      },
      {
        "w": "appointment",
        "pos": "noun",
        "ph": "/əˈpɔɪnt.mənt/",
        "v": "lịch hẹn khám",
        "ex": "I have an appointment at nine tomorrow."
      },
      {
        "w": "outpatient",
        "pos": "noun",
        "ph": "/ˈaʊtˌpeɪ.ʃənt/",
        "v": "bệnh nhân ngoại trú",
        "ex": "Most minor surgery is done on an outpatient basis."
      },
      {
        "w": "inpatient",
        "pos": "noun",
        "ph": "/ˈɪnˌpeɪ.ʃənt/",
        "v": "bệnh nhân nội trú",
        "ex": "Inpatient care costs far more than a clinic visit."
      },
      {
        "w": "discharge",
        "pos": "verb",
        "ph": "/dɪsˈtʃɑːdʒ/",
        "v": "cho xuất viện",
        "ex": "The hospital discharged him after three days."
      },
      {
        "w": "health insurance",
        "pos": "noun",
        "ph": "/helθ ɪnˈʃɔː.rəns/",
        "v": "bảo hiểm y tế",
        "ex": "Health insurance covered most of the bill."
      },
      {
        "w": "side-effect monitoring",
        "pos": "noun",
        "ph": "/ˈsaɪd ɪˌfekt ˈmɒn.ɪ.tər.ɪŋ/",
        "v": "theo dõi tác dụng phụ",
        "ex": "Side-effect monitoring continues for a month after the trial."
      },
      {
        "w": "drug interaction",
        "pos": "noun",
        "ph": "/drʌɡ ˌɪn.təˈræk.ʃən/",
        "v": "tương tác thuốc",
        "ex": "Warfarin has a dangerous drug interaction with aspirin."
      },
      {
        "w": "contraindication",
        "pos": "noun",
        "ph": "/ˌkɒn.trə.ɪn.dɪˈkeɪ.ʃən/",
        "v": "chống chỉ định",
        "ex": "Pregnancy is a contraindication for this medicine."
      },
      {
        "w": "over-the-counter",
        "pos": "adjective",
        "ph": "/ˌəʊ.və.ðəˈkaʊn.tər/",
        "v": "không kê đơn",
        "ex": "Paracetamol is an over-the-counter medicine."
      },
      {
        "w": "expiry date",
        "pos": "noun",
        "ph": "/ɪkˈspaɪə.ri deɪt/",
        "v": "hạn dùng",
        "ex": "Always check the expiry date before you dispense."
      },
      {
        "w": "sterilization",
        "pos": "noun",
        "ph": "/ˌster.ɪ.laɪˈzeɪ.ʃən/",
        "v": "tiệt khuẩn",
        "ex": "Sterilization kills every microorganism on the instrument."
      },
      {
        "w": "rehydration",
        "pos": "noun",
        "ph": "/ˌriː.haɪˈdreɪ.ʃən/",
        "v": "bù nước",
        "ex": "Oral rehydration salts treat mild dehydration at home."
      },
      {
        "w": "immunity",
        "pos": "noun",
        "ph": "/ɪˈmjuː.nə.ti/",
        "v": "miễn dịch",
        "ex": "The vaccine builds immunity in about two weeks."
      }
    ]
  },
  {
    "topic": "giaoduc",
    "label": "🎓 Giáo dục",
    "words": [
      {
        "w": "curriculum",
        "pos": "noun",
        "ph": "/kəˈrɪk.jə.ləm/",
        "v": "chương trình học",
        "ex": "The new curriculum focuses on skills."
      },
      {
        "w": "assessment",
        "pos": "noun",
        "ph": "/əˈses.mənt/",
        "v": "sự đánh giá",
        "ex": "The assessment includes a final project."
      },
      {
        "w": "tuition",
        "pos": "noun",
        "ph": "/tjuːˈɪʃ.ən/",
        "v": "học phí",
        "ex": "University tuition is rising every year."
      },
      {
        "w": "scholarship",
        "pos": "noun",
        "ph": "/ˈskɒl.ə.ʃɪp/",
        "v": "học bổng",
        "ex": "She won a full scholarship."
      },
      {
        "w": "lecture",
        "pos": "noun",
        "ph": "/ˈlek.tʃər/",
        "v": "bài giảng",
        "ex": "The lecture starts at nine."
      },
      {
        "w": "semester",
        "pos": "noun",
        "ph": "/sɪˈmes.tər/",
        "v": "học kỳ",
        "ex": "Exams are at the end of the semester."
      },
      {
        "w": "enrollment",
        "pos": "noun",
        "ph": "/ɪnˈrəʊl.mənt/",
        "v": "sự ghi danh",
        "ex": "Enrollment opens next week."
      },
      {
        "w": "literacy",
        "pos": "noun",
        "ph": "/ˈlɪt.ər.ə.si/",
        "v": "khả năng đọc viết",
        "ex": "Digital literacy is now essential."
      },
      {
        "w": "pedagogy",
        "pos": "noun",
        "ph": "/ˈped.ə.ɡɒdʒ.i/",
        "v": "phương pháp sư phạm",
        "ex": "Modern pedagogy values active learning."
      },
      {
        "w": "syllabus",
        "pos": "noun",
        "ph": "/ˈsɪl.ə.bəs/",
        "v": "đề cương môn học",
        "ex": "Read the syllabus on the first day."
      },
      {
        "w": "diploma",
        "pos": "noun",
        "ph": "/dɪˈpləʊ.mə/",
        "v": "bằng tốt nghiệp",
        "ex": "He earned a diploma in design."
      },
      {
        "w": "undergraduate",
        "pos": "noun",
        "ph": "/ˌʌn.dəˈɡrædʒ.u.ət/",
        "v": "sinh viên đại học",
        "ex": "She is an undergraduate in physics."
      },
      {
        "w": "thesis",
        "pos": "noun",
        "ph": "/ˈθiː.sɪs/",
        "v": "luận văn",
        "ex": "He is writing his thesis on AI."
      },
      {
        "w": "faculty",
        "pos": "noun",
        "ph": "/ˈfæk.əl.ti/",
        "v": "khoa / đội ngũ giảng viên",
        "ex": "The faculty of engineering is large."
      },
      {
        "w": "mentor",
        "pos": "noun",
        "ph": "/ˈmen.tɔːr/",
        "v": "người cố vấn",
        "ex": "A good mentor guides your career."
      },
      {
        "w": "competency",
        "pos": "noun",
        "ph": "/ˈkɒm.pɪ.tən.si/",
        "v": "năng lực",
        "ex": "The course builds digital competency."
      },
      {
        "w": "plagiarism",
        "pos": "noun",
        "ph": "/ˈpleɪ.dʒə.rɪ.zəm/",
        "v": "sự đạo văn",
        "ex": "Plagiarism can lead to failure."
      },
      {
        "w": "transcript",
        "pos": "noun",
        "ph": "/ˈtræn.skrɪpt/",
        "v": "bảng điểm",
        "ex": "Send your transcript with the application."
      },
      {
        "w": "vocational",
        "pos": "adj",
        "ph": "/vəʊˈkeɪ.ʃən.əl/",
        "v": "hướng nghiệp / dạy nghề",
        "ex": "Vocational training prepares job skills."
      },
      {
        "w": "tutor",
        "pos": "noun",
        "ph": "/ˈtjuː.tər/",
        "v": "gia sư",
        "ex": "A tutor helped her with math."
      },
      {
        "w": "graduate",
        "pos": "verb",
        "ph": "/ˈɡrædʒ.u.eɪt/",
        "v": "tốt nghiệp",
        "ex": "They graduate next June."
      },
      {
        "w": "discipline",
        "pos": "noun",
        "ph": "/ˈdɪs.ə.plɪn/",
        "v": "kỷ luật / ngành học",
        "ex": "Self discipline helps you study well."
      },
      {
        "w": "accreditation",
        "pos": "noun",
        "ph": "/əˌkred.ɪˈteɪ.ʃən/",
        "v": "sự kiểm định chất lượng",
        "ex": "The program received accreditation."
      },
      {
        "w": "coursework",
        "pos": "noun",
        "ph": "/ˈkɔːs.wɜːk/",
        "v": "bài tập trong khoá học",
        "ex": "Coursework counts for forty percent."
      },
      {
        "w": "seminar",
        "pos": "noun",
        "ph": "/ˈsem.ɪ.nɑːr/",
        "v": "hội thảo chuyên đề",
        "ex": "The seminar is on Friday afternoon."
      },
      {
        "w": "internship",
        "pos": "noun",
        "ph": "/ˈɪn.tɜːn.ʃɪp/",
        "v": "kỳ thực tập",
        "ex": "He did an internship at a tech firm."
      },
      {
        "w": "campus",
        "pos": "noun",
        "ph": "/ˈkæm.pəs/",
        "v": "khuôn viên trường",
        "ex": "The campus has a large library."
      },
      {
        "w": "major",
        "pos": "noun",
        "ph": "/ˈmeɪ.dʒər/",
        "v": "chuyên ngành chính",
        "ex": "Her major is computer science."
      },
      {
        "w": "credential",
        "pos": "noun",
        "ph": "/krəˈden.ʃəl/",
        "v": "chứng chỉ / bằng cấp",
        "ex": "The job requires a teaching credential."
      },
      {
        "w": "remote",
        "pos": "adj",
        "ph": "/rɪˈməʊt/",
        "v": "từ xa (học từ xa)",
        "ex": "Remote learning grew during the pandemic."
      },
      {
        "w": "workshop",
        "pos": "noun",
        "ph": "/ˈwɜːk.ʃɒp/",
        "v": "buổi tập huấn / hội thảo thực hành",
        "ex": "The coding workshop lasts two days."
      },
      {
        "w": "postgraduate",
        "pos": "noun",
        "ph": "/ˌpəʊstˈɡrædʒ.u.ət/",
        "v": "học viên sau đại học",
        "ex": "She is a postgraduate in economics."
      },
      {
        "w": "dissertation",
        "pos": "noun",
        "ph": "/ˌdɪs.əˈteɪ.ʃən/",
        "v": "luận án",
        "ex": "His dissertation took three years."
      },
      {
        "w": "lecturer",
        "pos": "noun",
        "ph": "/ˈlek.tʃər.ər/",
        "v": "giảng viên",
        "ex": "The lecturer explained the theory clearly."
      },
      {
        "w": "attendance",
        "pos": "noun",
        "ph": "/əˈten.dəns/",
        "v": "sự chuyên cần / điểm danh",
        "ex": "Attendance is part of the grade."
      },
      {
        "w": "grade",
        "pos": "noun",
        "ph": "/ɡreɪd/",
        "v": "điểm số",
        "ex": "She got the top grade in class."
      },
      {
        "w": "deadline extension",
        "pos": "noun",
        "ph": "/ˈded.laɪn ɪkˌsten.ʃən/",
        "v": "gia hạn nộp bài",
        "ex": "He asked for a deadline extension."
      },
      {
        "w": "peer",
        "pos": "noun",
        "ph": "/pɪər/",
        "v": "bạn đồng trang lứa",
        "ex": "Students learn a lot from their peers."
      },
      {
        "w": "feedback",
        "pos": "noun",
        "ph": "/ˈfiːd.bæk/",
        "v": "phản hồi",
        "ex": "The teacher gave helpful feedback."
      },
      {
        "w": "motivation",
        "pos": "noun",
        "ph": "/ˌməʊ.tɪˈveɪ.ʃən/",
        "v": "động lực",
        "ex": "Clear goals boost motivation."
      },
      {
        "w": "rubric",
        "pos": "noun",
        "ph": "/ˈruː.brɪk/",
        "v": "bảng tiêu chí chấm điểm",
        "ex": "The rubric explains exactly how the essay is graded."
      },
      {
        "w": "retake",
        "pos": "verb",
        "ph": "/ˌriːˈteɪk/",
        "v": "thi lại",
        "ex": "Students who fail may retake the exam in July."
      },
      {
        "w": "credit",
        "pos": "noun",
        "ph": "/ˈkred.ɪt/",
        "v": "tín chỉ",
        "ex": "This course is worth three credits."
      },
      {
        "w": "elective",
        "pos": "noun",
        "ph": "/ɪˈlek.tɪv/",
        "v": "môn tự chọn",
        "ex": "I took robotics as an elective."
      },
      {
        "w": "compulsory",
        "pos": "adjective",
        "ph": "/kəmˈpʌl.sər.i/",
        "v": "bắt buộc",
        "ex": "Maths is compulsory for every major."
      },
      {
        "w": "dropout rate",
        "pos": "noun",
        "ph": "/ˈdrɒp.aʊt reɪt/",
        "v": "tỉ lệ bỏ học",
        "ex": "The dropout rate fell after the tutoring programme."
      },
      {
        "w": "extracurricular",
        "pos": "adjective",
        "ph": "/ˌek.strə.kəˈrɪk.jə.lər/",
        "v": "ngoại khoá",
        "ex": "Extracurricular activities strengthen an application."
      },
      {
        "w": "alumni",
        "pos": "noun",
        "ph": "/əˈlʌm.naɪ/",
        "v": "cựu sinh viên",
        "ex": "Alumni often come back to give talks."
      },
      {
        "w": "apprenticeship",
        "pos": "noun",
        "ph": "/əˈpren.tɪs.ʃɪp/",
        "v": "chương trình học nghề",
        "ex": "He began an apprenticeship at a car factory."
      },
      {
        "w": "blended learning",
        "pos": "noun",
        "ph": "/ˈblen.dɪd ˈlɜː.nɪŋ/",
        "v": "học kết hợp trực tiếp và trực tuyến",
        "ex": "Blended learning mixes online lessons with classroom work."
      },
      {
        "w": "assignment",
        "pos": "noun",
        "ph": "/əˈsaɪn.mənt/",
        "v": "bài tập được giao",
        "ex": "Submit the assignment before Friday noon."
      },
      {
        "w": "presentation",
        "pos": "noun",
        "ph": "/ˌprez.ənˈteɪ.ʃən/",
        "v": "bài thuyết trình",
        "ex": "Each group gives a ten-minute presentation."
      },
      {
        "w": "proficiency",
        "pos": "noun",
        "ph": "/prəˈfɪʃ.ən.si/",
        "v": "trình độ thành thạo",
        "ex": "The job requires English proficiency at B2 level."
      },
      {
        "w": "self-study",
        "pos": "noun",
        "ph": "/ˌselfˈstʌd.i/",
        "v": "việc tự học",
        "ex": "Two hours of self-study a day makes a real difference."
      },
      {
        "w": "lifelong learning",
        "pos": "noun",
        "ph": "/ˈlaɪf.lɒŋ ˈlɜː.nɪŋ/",
        "v": "học tập suốt đời",
        "ex": "Lifelong learning keeps your skills up to date."
      },
      {
        "w": "placement test",
        "pos": "noun",
        "ph": "/ˈpleɪs.mənt test/",
        "v": "bài kiểm tra xếp lớp",
        "ex": "All new students sit a placement test."
      },
      {
        "w": "distance learning",
        "pos": "noun",
        "ph": "/ˈdɪs.təns ˈlɜː.nɪŋ/",
        "v": "học từ xa",
        "ex": "Distance learning kept the school open during the pandemic."
      },
      {
        "w": "learning outcome",
        "pos": "noun",
        "ph": "/ˈlɜː.nɪŋ ˈaʊt.kʌm/",
        "v": "chuẩn đầu ra",
        "ex": "Each unit lists three learning outcomes."
      },
      {
        "w": "formative assessment",
        "pos": "noun",
        "ph": "/ˈfɔː.mə.tɪv əˈses.mənt/",
        "v": "đánh giá quá trình",
        "ex": "Formative assessment guides teaching while the course runs."
      },
      {
        "w": "summative assessment",
        "pos": "noun",
        "ph": "/ˈsʌm.ə.tɪv əˈses.mənt/",
        "v": "đánh giá tổng kết",
        "ex": "The final exam is a summative assessment."
      },
      {
        "w": "differentiated instruction",
        "pos": "noun",
        "ph": "/ˌdɪf.əˈren.ʃi.eɪ.tɪd ɪnˈstrʌk.ʃən/",
        "v": "dạy học phân hoá",
        "ex": "Differentiated instruction gives each level a suitable task."
      },
      {
        "w": "scaffolding",
        "pos": "noun",
        "ph": "/ˈskæf.əl.dɪŋ/",
        "v": "giàn giáo hỗ trợ học tập",
        "ex": "Scaffolding supports learners until they can work alone."
      },
      {
        "w": "flipped classroom",
        "pos": "noun",
        "ph": "/flɪpt ˈklɑːs.ruːm/",
        "v": "lớp học đảo ngược",
        "ex": "In a flipped classroom students watch the lecture at home."
      },
      {
        "w": "project-based learning",
        "pos": "noun",
        "ph": "/ˈprɒdʒ.ekt beɪst ˈlɜː.nɪŋ/",
        "v": "học qua dự án",
        "ex": "Project-based learning ends with a real product."
      },
      {
        "w": "learning management system",
        "pos": "noun",
        "ph": "/ˈlɜː.nɪŋ ˈmæn.ɪdʒ.mənt ˈsɪs.təm/",
        "v": "hệ thống quản lý học tập",
        "ex": "Assignments are submitted through the learning management system."
      },
      {
        "w": "gamification",
        "pos": "noun",
        "ph": "/ˌɡeɪm.ɪ.fɪˈkeɪ.ʃən/",
        "v": "trò chơi hoá",
        "ex": "Gamification keeps young learners coming back."
      },
      {
        "w": "inclusive education",
        "pos": "noun",
        "ph": "/ɪnˈkluː.sɪv ˌedʒ.uˈkeɪ.ʃən/",
        "v": "giáo dục hoà nhập",
        "ex": "Inclusive education welcomes learners with disabilities."
      },
      {
        "w": "teacher training",
        "pos": "noun",
        "ph": "/ˈtiː.tʃər ˈtreɪ.nɪŋ/",
        "v": "bồi dưỡng giáo viên",
        "ex": "Teacher training runs every summer."
      },
      {
        "w": "curriculum reform",
        "pos": "noun",
        "ph": "/kəˈrɪk.jə.ləm rɪˈfɔːm/",
        "v": "cải cách chương trình",
        "ex": "The curriculum reform started in 2018."
      },
      {
        "w": "school year",
        "pos": "noun",
        "ph": "/skuːl jɪər/",
        "v": "năm học",
        "ex": "The school year begins in September."
      },
      {
        "w": "exam board",
        "pos": "noun",
        "ph": "/ɪɡˈzæm bɔːd/",
        "v": "hội đồng thi",
        "ex": "The exam board sets the papers for the whole province."
      }
    ]
  },
  {
    "topic": "business",
    "label": "💼 Kinh doanh",
    "words": [
      {
        "w": "invoice",
        "pos": "noun",
        "ph": "/ˈɪn.vɔɪs/",
        "v": "hoá đơn",
        "ex": "Please send me the invoice by email."
      },
      {
        "w": "negotiate",
        "pos": "verb",
        "ph": "/nɪˈɡəʊ.ʃi.eɪt/",
        "v": "thương lượng",
        "ex": "We need to negotiate the price."
      },
      {
        "w": "revenue",
        "pos": "noun",
        "ph": "/ˈrev.ə.njuː/",
        "v": "doanh thu",
        "ex": "Revenue grew twenty percent last year."
      },
      {
        "w": "stakeholder",
        "pos": "noun",
        "ph": "/ˈsteɪkˌhəʊl.dər/",
        "v": "bên liên quan",
        "ex": "All stakeholders agreed with the plan."
      },
      {
        "w": "deadline",
        "pos": "noun",
        "ph": "/ˈded.laɪn/",
        "v": "hạn chót",
        "ex": "The deadline is next Friday."
      },
      {
        "w": "budget",
        "pos": "noun",
        "ph": "/ˈbʌdʒ.ɪt/",
        "v": "ngân sách",
        "ex": "We must stay within budget."
      },
      {
        "w": "investment",
        "pos": "noun",
        "ph": "/ɪnˈvest.mənt/",
        "v": "sự đầu tư",
        "ex": "The investment paid off well."
      },
      {
        "w": "profit",
        "pos": "noun",
        "ph": "/ˈprɒf.ɪt/",
        "v": "lợi nhuận",
        "ex": "The shop made a small profit."
      },
      {
        "w": "strategy",
        "pos": "noun",
        "ph": "/ˈstræt.ə.dʒi/",
        "v": "chiến lược",
        "ex": "Our marketing strategy worked."
      },
      {
        "w": "entrepreneur",
        "pos": "noun",
        "ph": "/ˌɒn.trə.prəˈnɜːr/",
        "v": "doanh nhân (khởi nghiệp)",
        "ex": "The entrepreneur founded three startups."
      },
      {
        "w": "supply",
        "pos": "noun",
        "ph": "/səˈplaɪ/",
        "v": "nguồn cung",
        "ex": "Supply could not meet demand."
      },
      {
        "w": "demand",
        "pos": "noun",
        "ph": "/dɪˈmɑːnd/",
        "v": "nhu cầu / cầu",
        "ex": "Demand for the product is high."
      },
      {
        "w": "merger",
        "pos": "noun",
        "ph": "/ˈmɜː.dʒər/",
        "v": "sự sáp nhập",
        "ex": "The merger created a huge company."
      },
      {
        "w": "asset",
        "pos": "noun",
        "ph": "/ˈæs.et/",
        "v": "tài sản",
        "ex": "The building is a valuable asset."
      },
      {
        "w": "liability",
        "pos": "noun",
        "ph": "/ˌlaɪ.əˈbɪl.ə.ti/",
        "v": "khoản nợ / trách nhiệm pháp lý",
        "ex": "The loan is a long-term liability."
      },
      {
        "w": "forecast",
        "pos": "noun",
        "ph": "/ˈfɔː.kɑːst/",
        "v": "dự báo",
        "ex": "The sales forecast looks positive."
      },
      {
        "w": "startup",
        "pos": "noun",
        "ph": "/ˈstɑːt.ʌp/",
        "v": "công ty khởi nghiệp",
        "ex": "The startup raised new funding."
      },
      {
        "w": "turnover",
        "pos": "noun",
        "ph": "/ˈtɜːn.əʊ.vər/",
        "v": "doanh số / tỉ lệ nghỉ việc",
        "ex": "Annual turnover doubled this year."
      },
      {
        "w": "outsource",
        "pos": "verb",
        "ph": "/ˈaʊt.sɔːs/",
        "v": "thuê ngoài",
        "ex": "They outsource customer support."
      },
      {
        "w": "dividend",
        "pos": "noun",
        "ph": "/ˈdɪv.ɪ.dend/",
        "v": "cổ tức",
        "ex": "Shareholders receive a yearly dividend."
      },
      {
        "w": "recession",
        "pos": "noun",
        "ph": "/rɪˈseʃ.ən/",
        "v": "suy thoái kinh tế",
        "ex": "Sales dropped during the recession."
      },
      {
        "w": "compliance",
        "pos": "noun",
        "ph": "/kəmˈplaɪ.əns/",
        "v": "sự tuân thủ",
        "ex": "The firm ensures legal compliance."
      },
      {
        "w": "incentive",
        "pos": "noun",
        "ph": "/ɪnˈsen.tɪv/",
        "v": "sự khích lệ / ưu đãi",
        "ex": "Bonuses are a strong incentive."
      },
      {
        "w": "logistics",
        "pos": "noun",
        "ph": "/ləˈdʒɪs.tɪks/",
        "v": "hậu cần",
        "ex": "Good logistics cut delivery time."
      },
      {
        "w": "shareholder",
        "pos": "noun",
        "ph": "/ˈʃeəˌhəʊl.dər/",
        "v": "cổ đông",
        "ex": "Shareholders vote at the annual meeting."
      },
      {
        "w": "equity",
        "pos": "noun",
        "ph": "/ˈek.wɪ.ti/",
        "v": "vốn chủ sở hữu / cổ phần",
        "ex": "The founder kept most of the equity."
      },
      {
        "w": "valuation",
        "pos": "noun",
        "ph": "/ˌvæl.juˈeɪ.ʃən/",
        "v": "định giá",
        "ex": "The startup reached a billion-dollar valuation."
      },
      {
        "w": "cash flow",
        "pos": "noun",
        "ph": "/ˈkæʃ ˌfləʊ/",
        "v": "dòng tiền",
        "ex": "Positive cash flow keeps a business alive."
      },
      {
        "w": "overhead",
        "pos": "noun",
        "ph": "/ˈəʊ.və.hed/",
        "v": "chi phí cố định",
        "ex": "Renting a smaller office cuts overhead."
      },
      {
        "w": "procurement",
        "pos": "noun",
        "ph": "/prəˈkjʊə.mənt/",
        "v": "thu mua",
        "ex": "The procurement team compares suppliers."
      },
      {
        "w": "margin",
        "pos": "noun",
        "ph": "/ˈmɑː.dʒɪn/",
        "v": "biên lợi nhuận",
        "ex": "The margin on this product is thin."
      },
      {
        "w": "pitch",
        "pos": "noun",
        "ph": "/pɪtʃ/",
        "v": "bài thuyết trình gọi vốn",
        "ex": "Her pitch impressed the investors."
      },
      {
        "w": "quarter",
        "pos": "noun",
        "ph": "/ˈkwɔː.tər/",
        "v": "quý (tài chính)",
        "ex": "Profits rose in the last quarter."
      },
      {
        "w": "retail",
        "pos": "noun",
        "ph": "/ˈriː.teɪl/",
        "v": "bán lẻ",
        "ex": "The brand sells through retail stores."
      },
      {
        "w": "wholesale",
        "pos": "noun",
        "ph": "/ˈhəʊl.seɪl/",
        "v": "bán sỉ",
        "ex": "They buy fruit at wholesale prices."
      },
      {
        "w": "franchise",
        "pos": "noun",
        "ph": "/ˈfræn.tʃaɪz/",
        "v": "nhượng quyền thương mại",
        "ex": "He opened a coffee franchise."
      },
      {
        "w": "branding",
        "pos": "noun",
        "ph": "/ˈbræn.dɪŋ/",
        "v": "xây dựng thương hiệu",
        "ex": "Strong branding builds customer trust."
      },
      {
        "w": "target market",
        "pos": "noun",
        "ph": "/ˈtɑː.ɡɪt ˌmɑː.kɪt/",
        "v": "thị trường mục tiêu",
        "ex": "Teens are their target market."
      },
      {
        "w": "KPI",
        "pos": "noun",
        "ph": "/ˌkeɪ.piːˈaɪ/",
        "v": "chỉ số hiệu quả trọng yếu",
        "ex": "Sales growth is our main KPI this quarter."
      },
      {
        "w": "ROI",
        "pos": "noun",
        "ph": "/ˌɑːr.əʊˈaɪ/",
        "v": "tỉ suất hoàn vốn",
        "ex": "The campaign delivered a strong ROI."
      },
      {
        "w": "break-even",
        "pos": "noun",
        "ph": "/ˌbreɪkˈiː.vən/",
        "v": "điểm hoà vốn",
        "ex": "The shop reached break-even in ten months."
      },
      {
        "w": "cost-effective",
        "pos": "adjective",
        "ph": "/ˌkɒst.ɪˈfek.tɪv/",
        "v": "hiệu quả về chi phí",
        "ex": "Online meetings are far more cost-effective."
      },
      {
        "w": "contract",
        "pos": "noun",
        "ph": "/ˈkɒn.trækt/",
        "v": "hợp đồng",
        "ex": "Both sides signed a two-year contract."
      },
      {
        "w": "tender",
        "pos": "noun",
        "ph": "/ˈten.dər/",
        "v": "gói thầu, việc đấu thầu",
        "ex": "Three firms took part in the tender."
      },
      {
        "w": "warranty",
        "pos": "noun",
        "ph": "/ˈwɒr.ən.ti/",
        "v": "bảo hành",
        "ex": "The laptop comes with a two-year warranty."
      },
      {
        "w": "refund",
        "pos": "noun",
        "ph": "/ˈriː.fʌnd/",
        "v": "tiền hoàn lại",
        "ex": "Customers can ask for a refund within 30 days."
      },
      {
        "w": "discount",
        "pos": "noun",
        "ph": "/ˈdɪs.kaʊnt/",
        "v": "chiết khấu, giảm giá",
        "ex": "We offer a 10% discount for early payment."
      },
      {
        "w": "inventory",
        "pos": "noun",
        "ph": "/ˈɪn.vən.tər.i/",
        "v": "hàng tồn kho",
        "ex": "Inventory is counted at the end of every month."
      },
      {
        "w": "competitor",
        "pos": "noun",
        "ph": "/kəmˈpet.ɪ.tər/",
        "v": "đối thủ cạnh tranh",
        "ex": "Our main competitor cut its prices last week."
      },
      {
        "w": "market share",
        "pos": "noun",
        "ph": "/ˈmɑː.kɪt ʃeər/",
        "v": "thị phần",
        "ex": "The brand gained market share in the south."
      },
      {
        "w": "customer retention",
        "pos": "noun",
        "ph": "/ˈkʌs.tə.mər rɪˈten.ʃən/",
        "v": "việc giữ chân khách hàng",
        "ex": "Customer retention costs far less than winning new buyers."
      },
      {
        "w": "partnership",
        "pos": "noun",
        "ph": "/ˈpɑːt.nə.ʃɪp/",
        "v": "quan hệ đối tác",
        "ex": "The two firms announced a partnership yesterday."
      },
      {
        "w": "subscription",
        "pos": "noun",
        "ph": "/səbˈskrɪp.ʃən/",
        "v": "gói thuê bao",
        "ex": "The software is sold on a monthly subscription."
      },
      {
        "w": "freelancer",
        "pos": "noun",
        "ph": "/ˈfriːˌlɑːn.sər/",
        "v": "người làm việc tự do",
        "ex": "We hired a freelancer to design the logo."
      },
      {
        "w": "cash reserve",
        "pos": "noun",
        "ph": "/kæʃ rɪˈzɜːv/",
        "v": "quỹ tiền mặt dự phòng",
        "ex": "Keep a cash reserve for three months of costs."
      },
      {
        "w": "due diligence",
        "pos": "noun",
        "ph": "/djuː ˈdɪl.ɪ.dʒəns/",
        "v": "thẩm định trước giao dịch",
        "ex": "Due diligence found problems in the accounts."
      },
      {
        "w": "term sheet",
        "pos": "noun",
        "ph": "/tɜːm ʃiːt/",
        "v": "bản điều khoản đầu tư",
        "ex": "The investor sent a term sheet last week."
      },
      {
        "w": "runway",
        "pos": "noun",
        "ph": "/ˈrʌn.weɪ/",
        "v": "thời gian sống bằng vốn còn lại",
        "ex": "The startup has nine months of runway left."
      },
      {
        "w": "burn rate",
        "pos": "noun",
        "ph": "/bɜːn reɪt/",
        "v": "tốc độ đốt tiền",
        "ex": "A high burn rate scares investors."
      },
      {
        "w": "churn rate",
        "pos": "noun",
        "ph": "/tʃɜːn reɪt/",
        "v": "tỉ lệ khách rời bỏ",
        "ex": "Churn rate fell after we improved support."
      },
      {
        "w": "lead",
        "pos": "noun",
        "ph": "/liːd/",
        "v": "khách hàng tiềm năng",
        "ex": "The campaign generated two hundred leads."
      },
      {
        "w": "conversion rate",
        "pos": "noun",
        "ph": "/kənˈvɜː.ʃən reɪt/",
        "v": "tỉ lệ chuyển đổi",
        "ex": "A clearer button raised the conversion rate."
      },
      {
        "w": "supply chain",
        "pos": "noun",
        "ph": "/səˈplaɪ tʃeɪn/",
        "v": "chuỗi cung ứng",
        "ex": "The war disrupted the whole supply chain."
      },
      {
        "w": "cost of goods sold",
        "pos": "noun",
        "ph": "/kɒst əv ɡʊdz səʊld/",
        "v": "giá vốn hàng bán",
        "ex": "Subtract the cost of goods sold to get gross profit."
      },
      {
        "w": "break clause",
        "pos": "noun",
        "ph": "/breɪk klɔːz/",
        "v": "điều khoản chấm dứt sớm",
        "ex": "The break clause lets us leave after one year."
      },
      {
        "w": "non-disclosure agreement",
        "pos": "noun",
        "ph": "/ˌnɒn.dɪsˈkləʊ.ʒər əˈɡriː.mənt/",
        "v": "thoả thuận bảo mật",
        "ex": "Sign the non-disclosure agreement before the demo."
      },
      {
        "w": "unit economics",
        "pos": "noun",
        "ph": "/ˈjuː.nɪt ˌiː.kəˈnɒm.ɪks/",
        "v": "hiệu quả kinh tế trên mỗi đơn vị",
        "ex": "Unit economics show whether each sale actually makes money."
      },
      {
        "w": "remote work",
        "pos": "noun",
        "ph": "/rɪˈməʊt wɜːk/",
        "v": "làm việc từ xa",
        "ex": "Remote work widened our hiring pool."
      }
    ]
  },
  {
    "topic": "basic",
    "label": "📖 Cơ bản",
    "words": [
      {
        "w": "beautiful",
        "pos": "adj",
        "ph": "/ˈbjuː.tɪ.fəl/",
        "v": "đẹp",
        "ex": "She has a beautiful smile."
      },
      {
        "w": "remember",
        "pos": "verb",
        "ph": "/rɪˈmem.bər/",
        "v": "nhớ",
        "ex": "I always remember my first teacher."
      },
      {
        "w": "family",
        "pos": "noun",
        "ph": "/ˈfæm.əl.i/",
        "v": "gia đình",
        "ex": "My family is going to the beach."
      },
      {
        "w": "happy",
        "pos": "adj",
        "ph": "/ˈhæp.i/",
        "v": "hạnh phúc, vui",
        "ex": "I am happy to see you again."
      },
      {
        "w": "water",
        "pos": "noun",
        "ph": "/ˈwɔː.tər/",
        "v": "nước",
        "ex": "Please give me a glass of water."
      },
      {
        "w": "travel",
        "pos": "verb",
        "ph": "/ˈtræv.əl/",
        "v": "du lịch, đi",
        "ex": "I love to travel around the world."
      },
      {
        "w": "study",
        "pos": "verb",
        "ph": "/ˈstʌd.i/",
        "v": "học",
        "ex": "I study English every day."
      },
      {
        "w": "friend",
        "pos": "noun",
        "ph": "/frend/",
        "v": "bạn",
        "ex": "She is my best friend."
      },
      {
        "w": "important",
        "pos": "adj",
        "ph": "/ɪmˈpɔː.tənt/",
        "v": "quan trọng",
        "ex": "Health is more important than money."
      },
      {
        "w": "understand",
        "pos": "verb",
        "ph": "/ˌʌn.dəˈstænd/",
        "v": "hiểu",
        "ex": "I do not understand this question."
      },
      {
        "w": "together",
        "pos": "adv",
        "ph": "/təˈɡeð.ər/",
        "v": "cùng nhau",
        "ex": "We cook dinner together on Sundays."
      },
      {
        "w": "different",
        "pos": "adj",
        "ph": "/ˈdɪf.ər.ənt/",
        "v": "khác nhau",
        "ex": "The twins like different sports."
      },
      {
        "w": "question",
        "pos": "noun",
        "ph": "/ˈkwes.tʃən/",
        "v": "câu hỏi",
        "ex": "May I ask a question?"
      },
      {
        "w": "answer",
        "pos": "noun",
        "ph": "/ˈɑːn.sər/",
        "v": "câu trả lời",
        "ex": "The answer is at the back of the book."
      },
      {
        "w": "weather",
        "pos": "noun",
        "ph": "/ˈweð.ər/",
        "v": "thời tiết",
        "ex": "The weather is lovely today."
      },
      {
        "w": "breakfast",
        "pos": "noun",
        "ph": "/ˈbrek.fəst/",
        "v": "bữa sáng",
        "ex": "I had eggs for breakfast."
      },
      {
        "w": "delicious",
        "pos": "adj",
        "ph": "/dɪˈlɪʃ.əs/",
        "v": "ngon",
        "ex": "This soup is delicious."
      },
      {
        "w": "expensive",
        "pos": "adj",
        "ph": "/ɪkˈspen.sɪv/",
        "v": "đắt",
        "ex": "That phone is too expensive for me."
      },
      {
        "w": "early",
        "pos": "adv",
        "ph": "/ˈɜː.li/",
        "v": "sớm",
        "ex": "She wakes up early every day."
      },
      {
        "w": "practice",
        "pos": "verb",
        "ph": "/ˈpræk.tɪs/",
        "v": "luyện tập",
        "ex": "Practice English a little every day."
      },
      {
        "w": "promise",
        "pos": "verb",
        "ph": "/ˈprɒm.ɪs/",
        "v": "hứa",
        "ex": "I promise to call you tonight."
      },
      {
        "w": "borrow",
        "pos": "verb",
        "ph": "/ˈbɒr.əʊ/",
        "v": "mượn",
        "ex": "Can I borrow your pen?"
      },
      {
        "w": "weekend",
        "pos": "noun",
        "ph": "/ˌwiːkˈend/",
        "v": "cuối tuần",
        "ex": "We visit our grandparents at the weekend."
      },
      {
        "w": "hungry",
        "pos": "adj",
        "ph": "/ˈhʌŋ.ɡri/",
        "v": "đói",
        "ex": "I am hungry after the long walk."
      },
      {
        "w": "favorite",
        "pos": "adj",
        "ph": "/ˈfeɪ.vər.ɪt/",
        "v": "yêu thích",
        "ex": "Blue is my favorite color."
      },
      {
        "w": "morning",
        "pos": "noun",
        "ph": "/ˈmɔː.nɪŋ/",
        "v": "buổi sáng",
        "ex": "I read the news every morning."
      },
      {
        "w": "evening",
        "pos": "noun",
        "ph": "/ˈiːv.nɪŋ/",
        "v": "buổi tối",
        "ex": "We walk in the park in the evening."
      },
      {
        "w": "money",
        "pos": "noun",
        "ph": "/ˈmʌn.i/",
        "v": "tiền",
        "ex": "She saves money every month."
      },
      {
        "w": "people",
        "pos": "noun",
        "ph": "/ˈpiː.pəl/",
        "v": "mọi người",
        "ex": "Many people enjoy music."
      },
      {
        "w": "because",
        "pos": "conj",
        "ph": "/bɪˈkɒz/",
        "v": "bởi vì",
        "ex": "I stayed home because it rained."
      },
      {
        "w": "always",
        "pos": "adv",
        "ph": "/ˈɔːl.weɪz/",
        "v": "luôn luôn",
        "ex": "He always arrives on time."
      },
      {
        "w": "sometimes",
        "pos": "adv",
        "ph": "/ˈsʌm.taɪmz/",
        "v": "thỉnh thoảng",
        "ex": "Sometimes we eat out on Fridays."
      },
      {
        "w": "help",
        "pos": "verb",
        "ph": "/help/",
        "v": "giúp đỡ",
        "ex": "Can you help me with this?"
      },
      {
        "w": "listen",
        "pos": "verb",
        "ph": "/ˈlɪs.ən/",
        "v": "lắng nghe",
        "ex": "Listen to the teacher carefully."
      },
      {
        "w": "speak",
        "pos": "verb",
        "ph": "/spiːk/",
        "v": "nói",
        "ex": "She can speak three languages."
      },
      {
        "w": "buy",
        "pos": "verb",
        "ph": "/baɪ/",
        "v": "mua",
        "ex": "I want to buy a new bag."
      },
      {
        "w": "clean",
        "pos": "adj",
        "ph": "/kliːn/",
        "v": "sạch",
        "ex": "Keep your room clean."
      },
      {
        "w": "tired",
        "pos": "adj",
        "ph": "/taɪəd/",
        "v": "mệt",
        "ex": "I feel tired after work."
      },
      {
        "w": "vegetable",
        "pos": "noun",
        "ph": "/ˈvedʒ.tə.bəl/",
        "v": "rau củ",
        "ex": "Try to eat more vegetables every day."
      },
      {
        "w": "exercise",
        "pos": "verb",
        "ph": "/ˈek.sə.saɪz/",
        "v": "tập thể dục",
        "ex": "I exercise three times a week."
      },
      {
        "w": "market",
        "pos": "noun",
        "ph": "/ˈmɑː.kɪt/",
        "v": "chợ",
        "ex": "My mother goes to the market every morning."
      },
      {
        "w": "neighbour",
        "pos": "noun",
        "ph": "/ˈneɪ.bər/",
        "v": "hàng xóm",
        "ex": "Our neighbour helped us move the sofa."
      },
      {
        "w": "kitchen",
        "pos": "noun",
        "ph": "/ˈkɪtʃ.ən/",
        "v": "nhà bếp",
        "ex": "She is cooking in the kitchen."
      },
      {
        "w": "careful",
        "pos": "adjective",
        "ph": "/ˈkeə.fəl/",
        "v": "cẩn thận",
        "ex": "Be careful when you cross the street."
      },
      {
        "w": "difficult",
        "pos": "adjective",
        "ph": "/ˈdɪf.ɪ.kəlt/",
        "v": "khó",
        "ex": "This exercise is difficult for beginners."
      },
      {
        "w": "cheap",
        "pos": "adjective",
        "ph": "/tʃiːp/",
        "v": "rẻ",
        "ex": "Street food here is cheap and delicious."
      },
      {
        "w": "birthday",
        "pos": "noun",
        "ph": "/ˈbɜːθ.deɪ/",
        "v": "sinh nhật",
        "ex": "We bought a cake for her birthday."
      },
      {
        "w": "holiday",
        "pos": "noun",
        "ph": "/ˈhɒl.ə.deɪ/",
        "v": "kỳ nghỉ",
        "ex": "We visited Da Nang during the holiday."
      },
      {
        "w": "homework",
        "pos": "noun",
        "ph": "/ˈhəʊm.wɜːk/",
        "v": "bài tập về nhà",
        "ex": "Finish your homework before dinner."
      },
      {
        "w": "forget",
        "pos": "verb",
        "ph": "/fəˈɡet/",
        "v": "quên",
        "ex": "Don’t forget your umbrella."
      },
      {
        "w": "healthy",
        "pos": "adjective",
        "ph": "/ˈhel.θi/",
        "v": "khoẻ mạnh, lành mạnh",
        "ex": "Walking every day keeps you healthy."
      },
      {
        "w": "decide",
        "pos": "verb",
        "ph": "/dɪˈsaɪd/",
        "v": "quyết định",
        "ex": "We decided to leave early."
      },
      {
        "w": "worry",
        "pos": "verb",
        "ph": "/ˈwʌr.i/",
        "v": "lo lắng",
        "ex": "Don’t worry, everything is fine."
      },
      {
        "w": "enough",
        "pos": "adjective",
        "ph": "/ɪˈnʌf/",
        "v": "đủ",
        "ex": "We don’t have enough chairs for everyone."
      },
      {
        "w": "lend",
        "pos": "verb",
        "ph": "/lend/",
        "v": "cho mượn",
        "ex": "Can you lend me your pen?"
      },
      {
        "w": "umbrella",
        "pos": "noun",
        "ph": "/ʌmˈbrel.ə/",
        "v": "cái ô",
        "ex": "Take an umbrella; it looks like rain."
      },
      {
        "w": "crowded",
        "pos": "adjective",
        "ph": "/ˈkraʊ.dɪd/",
        "v": "đông đúc",
        "ex": "The bus is crowded in the morning."
      },
      {
        "w": "quiet",
        "pos": "adjective",
        "ph": "/ˈkwaɪ.ət/",
        "v": "yên tĩnh",
        "ex": "The library is quiet in the afternoon."
      },
      {
        "w": "noisy",
        "pos": "adjective",
        "ph": "/ˈnɔɪ.zi/",
        "v": "ồn ào",
        "ex": "The street is very noisy at night."
      },
      {
        "w": "borrow money",
        "pos": "verb",
        "ph": "/ˈbɒr.əʊ ˈmʌn.i/",
        "v": "vay tiền",
        "ex": "He had to borrow money to fix the roof."
      },
      {
        "w": "save",
        "pos": "verb",
        "ph": "/seɪv/",
        "v": "tiết kiệm",
        "ex": "I save a little money every month."
      },
      {
        "w": "repair",
        "pos": "verb",
        "ph": "/rɪˈpeər/",
        "v": "sửa chữa",
        "ex": "Can you repair my bicycle?"
      },
      {
        "w": "invite",
        "pos": "verb",
        "ph": "/ɪnˈvaɪt/",
        "v": "mời",
        "ex": "They invited us to dinner."
      },
      {
        "w": "arrive",
        "pos": "verb",
        "ph": "/əˈraɪv/",
        "v": "đến nơi",
        "ex": "We arrived at the station just in time."
      },
      {
        "w": "leave",
        "pos": "verb",
        "ph": "/liːv/",
        "v": "rời đi",
        "ex": "The train leaves at seven."
      },
      {
        "w": "afraid",
        "pos": "adjective",
        "ph": "/əˈfreɪd/",
        "v": "sợ",
        "ex": "She is afraid of dogs."
      },
      {
        "w": "proud",
        "pos": "adjective",
        "ph": "/praʊd/",
        "v": "tự hào",
        "ex": "My parents are proud of me."
      },
      {
        "w": "polite",
        "pos": "adjective",
        "ph": "/pəˈlaɪt/",
        "v": "lịch sự",
        "ex": "He is always polite to older people."
      },
      {
        "w": "careless",
        "pos": "adjective",
        "ph": "/ˈkeə.ləs/",
        "v": "bất cẩn",
        "ex": "A careless mistake cost him the game."
      },
      {
        "w": "weekend plan",
        "pos": "noun",
        "ph": "/ˌwiːkˈend plæn/",
        "v": "kế hoạch cuối tuần",
        "ex": "What is your weekend plan?"
      }
    ]
  },
  {
    "topic": "travel",
    "label": "✈️ Du lịch",
    "words": [
      {
        "w": "airport",
        "pos": "noun",
        "ph": "/ˈeə.pɔːt/",
        "v": "sân bay",
        "ex": "The flight leaves from the airport at noon."
      },
      {
        "w": "luggage",
        "pos": "noun",
        "ph": "/ˈlʌɡ.ɪdʒ/",
        "v": "hành lý",
        "ex": "Put your luggage on the belt."
      },
      {
        "w": "reservation",
        "pos": "noun",
        "ph": "/ˌrez.əˈveɪ.ʃən/",
        "v": "việc đặt chỗ",
        "ex": "I have a reservation for two."
      },
      {
        "w": "passport",
        "pos": "noun",
        "ph": "/ˈpɑːs.pɔːt/",
        "v": "hộ chiếu",
        "ex": "Please show me your passport."
      },
      {
        "w": "currency",
        "pos": "noun",
        "ph": "/ˈkʌr.ən.si/",
        "v": "tiền tệ",
        "ex": "The local currency is the euro."
      },
      {
        "w": "destination",
        "pos": "noun",
        "ph": "/ˌdes.tɪˈneɪ.ʃən/",
        "v": "điểm đến",
        "ex": "Paris is a popular destination."
      },
      {
        "w": "itinerary",
        "pos": "noun",
        "ph": "/aɪˈtɪn.ər.ər.i/",
        "v": "lịch trình",
        "ex": "Our itinerary covers three cities."
      },
      {
        "w": "tourist",
        "pos": "noun",
        "ph": "/ˈtʊə.rɪst/",
        "v": "khách du lịch",
        "ex": "Tourists love this beach."
      },
      {
        "w": "boarding pass",
        "pos": "noun",
        "ph": "/ˈbɔː.dɪŋ ˌpɑːs/",
        "v": "thẻ lên máy bay",
        "ex": "Show your boarding pass at the gate."
      },
      {
        "w": "departure",
        "pos": "noun",
        "ph": "/dɪˈpɑː.tʃər/",
        "v": "sự khởi hành",
        "ex": "The departure time is 9 a.m."
      },
      {
        "w": "arrival",
        "pos": "noun",
        "ph": "/əˈraɪ.vəl/",
        "v": "sự đến nơi",
        "ex": "Our arrival was delayed by rain."
      },
      {
        "w": "customs",
        "pos": "noun",
        "ph": "/ˈkʌs.təmz/",
        "v": "hải quan",
        "ex": "We waited an hour at customs."
      },
      {
        "w": "visa",
        "pos": "noun",
        "ph": "/ˈviː.zə/",
        "v": "thị thực",
        "ex": "You need a visa to enter that country."
      },
      {
        "w": "accommodation",
        "pos": "noun",
        "ph": "/əˌkɒm.əˈdeɪ.ʃən/",
        "v": "chỗ ở",
        "ex": "The tour includes accommodation and meals."
      },
      {
        "w": "check-in",
        "pos": "noun",
        "ph": "/ˈtʃek.ɪn/",
        "v": "thủ tục nhận phòng/lên máy bay",
        "ex": "Check-in opens two hours before the flight."
      },
      {
        "w": "sightseeing",
        "pos": "noun",
        "ph": "/ˈsaɪtˌsiː.ɪŋ/",
        "v": "tham quan",
        "ex": "We spent the morning sightseeing."
      },
      {
        "w": "souvenir",
        "pos": "noun",
        "ph": "/ˌsuː.vənˈɪər/",
        "v": "quà lưu niệm",
        "ex": "She bought a souvenir for her mother."
      },
      {
        "w": "guidebook",
        "pos": "noun",
        "ph": "/ˈɡaɪd.bʊk/",
        "v": "sách hướng dẫn du lịch",
        "ex": "The guidebook lists the best cafes."
      },
      {
        "w": "round trip",
        "pos": "noun",
        "ph": "/ˌraʊnd ˈtrɪp/",
        "v": "chuyến khứ hồi",
        "ex": "A round trip ticket is cheaper."
      },
      {
        "w": "delay",
        "pos": "noun",
        "ph": "/dɪˈleɪ/",
        "v": "sự trễ chuyến",
        "ex": "There is a two-hour delay."
      },
      {
        "w": "layover",
        "pos": "noun",
        "ph": "/ˈleɪ.əʊ.vər/",
        "v": "chặng dừng nối chuyến",
        "ex": "We have a short layover in Dubai."
      },
      {
        "w": "boarding gate",
        "pos": "noun",
        "ph": "/ˈbɔː.dɪŋ ˌɡeɪt/",
        "v": "cửa lên máy bay",
        "ex": "Go to the boarding gate 30 minutes early."
      },
      {
        "w": "aisle seat",
        "pos": "noun",
        "ph": "/ˈaɪl ˌsiːt/",
        "v": "ghế cạnh lối đi",
        "ex": "I prefer an aisle seat on long flights."
      },
      {
        "w": "jet lag",
        "pos": "noun",
        "ph": "/ˈdʒet ˌlæɡ/",
        "v": "mệt mỏi do lệch múi giờ",
        "ex": "Jet lag kept me awake all night."
      },
      {
        "w": "excursion",
        "pos": "noun",
        "ph": "/ɪkˈskɜː.ʃən/",
        "v": "chuyến tham quan ngắn",
        "ex": "The hotel offers a day excursion."
      },
      {
        "w": "backpacker",
        "pos": "noun",
        "ph": "/ˈbækˌpæk.ər/",
        "v": "khách du lịch bụi",
        "ex": "Backpackers filled the cheap hostel."
      },
      {
        "w": "landmark",
        "pos": "noun",
        "ph": "/ˈlænd.mɑːk/",
        "v": "địa danh nổi bật",
        "ex": "The tower is a famous landmark."
      },
      {
        "w": "travel insurance",
        "pos": "noun",
        "ph": "/ˈtræv.əl ɪnˌʃɔː.rəns/",
        "v": "bảo hiểm du lịch",
        "ex": "Buy travel insurance before you go."
      },
      {
        "w": "fare",
        "pos": "noun",
        "ph": "/feər/",
        "v": "giá vé",
        "ex": "The train fare went up this year."
      },
      {
        "w": "peak season",
        "pos": "noun",
        "ph": "/ˈpiːk ˌsiː.zən/",
        "v": "mùa cao điểm",
        "ex": "Hotels are pricey in peak season."
      },
      {
        "w": "departure lounge",
        "pos": "noun",
        "ph": "/dɪˈpɑː.tʃə ˌlaʊndʒ/",
        "v": "phòng chờ khởi hành",
        "ex": "We waited in the departure lounge."
      },
      {
        "w": "guided tour",
        "pos": "noun",
        "ph": "/ˌɡaɪ.dɪd ˈtʊər/",
        "v": "tour có hướng dẫn viên",
        "ex": "A guided tour explains the history."
      },
      {
        "w": "one-way ticket",
        "pos": "noun",
        "ph": "/ˌwʌnˈweɪ ˈtɪk.ɪt/",
        "v": "vé một chiều",
        "ex": "A one-way ticket is cheaper than a return."
      },
      {
        "w": "baggage claim",
        "pos": "noun",
        "ph": "/ˈbæɡ.ɪdʒ kleɪm/",
        "v": "khu nhận hành lý",
        "ex": "I will meet you at baggage claim."
      },
      {
        "w": "carry-on",
        "pos": "noun",
        "ph": "/ˈkær.i.ɒn/",
        "v": "hành lý xách tay",
        "ex": "Only one carry-on bag is allowed."
      },
      {
        "w": "transit",
        "pos": "noun",
        "ph": "/ˈtræn.zɪt/",
        "v": "quá cảnh",
        "ex": "We have a six-hour transit in Bangkok."
      },
      {
        "w": "hostel",
        "pos": "noun",
        "ph": "/ˈhɒs.təl/",
        "v": "nhà nghỉ giá rẻ",
        "ex": "Backpackers usually stay in a hostel."
      },
      {
        "w": "booking",
        "pos": "noun",
        "ph": "/ˈbʊk.ɪŋ/",
        "v": "việc đặt chỗ",
        "ex": "Show your booking at the front desk."
      },
      {
        "w": "refundable",
        "pos": "adjective",
        "ph": "/rɪˈfʌn.də.bəl/",
        "v": "được hoàn tiền",
        "ex": "This cheap fare is not refundable."
      },
      {
        "w": "travel agency",
        "pos": "noun",
        "ph": "/ˈtræv.əl ˈeɪ.dʒən.si/",
        "v": "công ty lữ hành",
        "ex": "The travel agency arranged our visas."
      },
      {
        "w": "currency exchange",
        "pos": "noun",
        "ph": "/ˈkʌr.ən.si ɪksˈtʃeɪndʒ/",
        "v": "quầy đổi tiền",
        "ex": "There is a currency exchange in the arrivals hall."
      },
      {
        "w": "passport control",
        "pos": "noun",
        "ph": "/ˈpɑːs.pɔːt kənˈtrəʊl/",
        "v": "khu kiểm tra hộ chiếu",
        "ex": "Passport control took twenty minutes."
      },
      {
        "w": "overbooked",
        "pos": "adjective",
        "ph": "/ˌəʊ.vəˈbʊkt/",
        "v": "bán vé quá số chỗ",
        "ex": "The flight was overbooked, so we took a later one."
      },
      {
        "w": "cancellation",
        "pos": "noun",
        "ph": "/ˌkæn.səlˈeɪ.ʃən/",
        "v": "việc huỷ chuyến",
        "ex": "Bad weather caused several cancellations."
      },
      {
        "w": "resort",
        "pos": "noun",
        "ph": "/rɪˈzɔːt/",
        "v": "khu nghỉ dưỡng",
        "ex": "We stayed at a beach resort for three nights."
      },
      {
        "w": "homestay",
        "pos": "noun",
        "ph": "/ˈhəʊm.steɪ/",
        "v": "hình thức ở nhà dân",
        "ex": "A homestay is a good way to meet local people."
      },
      {
        "w": "shuttle bus",
        "pos": "noun",
        "ph": "/ˈʃʌt.əl bʌs/",
        "v": "xe đưa đón",
        "ex": "A free shuttle bus runs to the terminal."
      },
      {
        "w": "travel document",
        "pos": "noun",
        "ph": "/ˈtræv.əl ˈdɒk.jə.mənt/",
        "v": "giấy tờ đi lại",
        "ex": "Keep your travel documents in one folder."
      },
      {
        "w": "boarding announcement",
        "pos": "noun",
        "ph": "/ˈbɔː.dɪŋ əˈnaʊns.mənt/",
        "v": "thông báo lên máy bay",
        "ex": "Listen for the boarding announcement."
      },
      {
        "w": "window seat",
        "pos": "noun",
        "ph": "/ˈwɪn.dəʊ siːt/",
        "v": "ghế cạnh cửa sổ",
        "ex": "I always ask for a window seat."
      },
      {
        "w": "excess baggage",
        "pos": "noun",
        "ph": "/ˈek.ses ˈbæɡ.ɪdʒ/",
        "v": "hành lý quá cước",
        "ex": "Excess baggage costs ten dollars a kilo."
      },
      {
        "w": "duty-free",
        "pos": "adjective",
        "ph": "/ˌdjuː.tiˈfriː/",
        "v": "miễn thuế",
        "ex": "She bought perfume at the duty-free shop."
      },
      {
        "w": "local cuisine",
        "pos": "noun",
        "ph": "/ˈləʊ.kəl kwɪˈziːn/",
        "v": "ẩm thực địa phương",
        "ex": "Try the local cuisine before you leave."
      },
      {
        "w": "travel budget",
        "pos": "noun",
        "ph": "/ˈtræv.əl ˈbʌdʒ.ɪt/",
        "v": "ngân sách chuyến đi",
        "ex": "Our travel budget is tight this year."
      },
      {
        "w": "off-peak",
        "pos": "adjective",
        "ph": "/ˌɒfˈpiːk/",
        "v": "ngoài mùa cao điểm",
        "ex": "Off-peak flights are much cheaper."
      },
      {
        "w": "road trip",
        "pos": "noun",
        "ph": "/rəʊd trɪp/",
        "v": "chuyến đi bằng ô tô",
        "ex": "We took a road trip along the coast."
      },
      {
        "w": "travel advisory",
        "pos": "noun",
        "ph": "/ˈtræv.əl ədˈvaɪ.zər.i/",
        "v": "khuyến cáo đi lại",
        "ex": "Check the travel advisory before you book."
      },
      {
        "w": "accommodation fee",
        "pos": "noun",
        "ph": "/əˌkɒm.əˈdeɪ.ʃən fiː/",
        "v": "phí lưu trú",
        "ex": "The accommodation fee includes breakfast."
      },
      {
        "w": "boarding queue",
        "pos": "noun",
        "ph": "/ˈbɔː.dɪŋ kjuː/",
        "v": "hàng chờ lên máy bay",
        "ex": "The boarding queue moved slowly."
      },
      {
        "w": "travel companion",
        "pos": "noun",
        "ph": "/ˈtræv.əl kəmˈpæn.jən/",
        "v": "bạn đồng hành",
        "ex": "A good travel companion makes any trip better."
      }
    ]
  },
  {
    "topic": "academic",
    "label": "🔬 Học thuật",
    "words": [
      {
        "w": "analyze",
        "pos": "verb",
        "ph": "/ˈæn.əl.aɪz/",
        "v": "phân tích",
        "ex": "Researchers analyze the data carefully."
      },
      {
        "w": "hypothesis",
        "pos": "noun",
        "ph": "/haɪˈpɒθ.ə.sɪs/",
        "v": "giả thuyết",
        "ex": "The hypothesis was confirmed."
      },
      {
        "w": "methodology",
        "pos": "noun",
        "ph": "/ˌmeθ.əˈdɒl.ə.dʒi/",
        "v": "phương pháp luận",
        "ex": "The paper explains its methodology."
      },
      {
        "w": "paradigm",
        "pos": "noun",
        "ph": "/ˈpær.ə.daɪm/",
        "v": "mô hình / hệ hình",
        "ex": "AI is a new paradigm in education."
      },
      {
        "w": "empirical",
        "pos": "adj",
        "ph": "/ɪmˈpɪr.ɪ.kəl/",
        "v": "thực nghiệm",
        "ex": "Empirical evidence supports the theory."
      },
      {
        "w": "cite",
        "pos": "verb",
        "ph": "/saɪt/",
        "v": "trích dẫn",
        "ex": "Always cite your sources."
      },
      {
        "w": "abstract",
        "pos": "noun",
        "ph": "/ˈæb.strækt/",
        "v": "tóm tắt (bài báo)",
        "ex": "Read the abstract before the full paper."
      },
      {
        "w": "literature review",
        "pos": "noun",
        "ph": "/ˈlɪt.rə.tʃər rɪˌvjuː/",
        "v": "tổng quan tài liệu",
        "ex": "The literature review covers ten years of studies."
      },
      {
        "w": "evidence",
        "pos": "noun",
        "ph": "/ˈev.ɪ.dəns/",
        "v": "bằng chứng",
        "ex": "The evidence supports the conclusion."
      },
      {
        "w": "conclusion",
        "pos": "noun",
        "ph": "/kənˈkluː.ʒən/",
        "v": "kết luận",
        "ex": "The conclusion summarizes the findings."
      },
      {
        "w": "significant",
        "pos": "adj",
        "ph": "/sɪɡˈnɪf.ɪ.kənt/",
        "v": "đáng kể / có ý nghĩa",
        "ex": "The results show a significant difference."
      },
      {
        "w": "qualitative",
        "pos": "adj",
        "ph": "/ˈkwɒl.ɪ.tə.tɪv/",
        "v": "định tính",
        "ex": "The study uses qualitative interviews."
      },
      {
        "w": "survey",
        "pos": "noun",
        "ph": "/ˈsɜː.veɪ/",
        "v": "khảo sát",
        "ex": "The survey collected 500 responses."
      },
      {
        "w": "sample",
        "pos": "noun",
        "ph": "/ˈsɑːm.pəl/",
        "v": "mẫu (nghiên cứu)",
        "ex": "The sample included students from five schools."
      },
      {
        "w": "peer review",
        "pos": "noun",
        "ph": "/ˌpɪə rɪˈvjuː/",
        "v": "phản biện đồng nghiệp",
        "ex": "The journal uses double-blind peer review."
      },
      {
        "w": "appendix",
        "pos": "noun",
        "ph": "/əˈpen.dɪks/",
        "v": "phụ lục",
        "ex": "The full data is in the appendix."
      },
      {
        "w": "journal",
        "pos": "noun",
        "ph": "/ˈdʒɜː.nəl/",
        "v": "tạp chí khoa học",
        "ex": "The paper appeared in a top journal."
      },
      {
        "w": "validate",
        "pos": "verb",
        "ph": "/ˈvæl.ɪ.deɪt/",
        "v": "kiểm chứng",
        "ex": "Repeat the experiment to validate the result."
      },
      {
        "w": "interpret",
        "pos": "verb",
        "ph": "/ɪnˈtɜː.prət/",
        "v": "diễn giải",
        "ex": "Be careful when you interpret the data."
      },
      {
        "w": "objective",
        "pos": "adj",
        "ph": "/əbˈdʒek.tɪv/",
        "v": "khách quan",
        "ex": "A researcher must stay objective."
      },
      {
        "w": "quantitative",
        "pos": "adj",
        "ph": "/ˈkwɒn.tɪ.tə.tɪv/",
        "v": "định lượng",
        "ex": "Quantitative data can be measured in numbers."
      },
      {
        "w": "causation",
        "pos": "noun",
        "ph": "/kɔːˈzeɪ.ʃən/",
        "v": "quan hệ nhân quả",
        "ex": "Correlation does not prove causation."
      },
      {
        "w": "determinant",
        "pos": "noun",
        "ph": "/dɪˈtɜː.mɪ.nənt/",
        "v": "yếu tố quyết định",
        "ex": "Income is a key determinant of health."
      },
      {
        "w": "construct",
        "pos": "noun",
        "ph": "/ˈkɒn.strʌkt/",
        "v": "khái niệm cấu trúc",
        "ex": "Intelligence is a difficult construct to measure."
      },
      {
        "w": "assumption",
        "pos": "noun",
        "ph": "/əˈsʌmp.ʃən/",
        "v": "giả định",
        "ex": "State your assumptions clearly."
      },
      {
        "w": "validity",
        "pos": "noun",
        "ph": "/vəˈlɪd.ə.ti/",
        "v": "tính hợp lệ / giá trị",
        "ex": "The test has high validity."
      },
      {
        "w": "replicate",
        "pos": "verb",
        "ph": "/ˈrep.lɪ.keɪt/",
        "v": "lặp lại (thí nghiệm)",
        "ex": "Other labs could replicate the study."
      },
      {
        "w": "derive",
        "pos": "verb",
        "ph": "/dɪˈraɪv/",
        "v": "suy ra / rút ra",
        "ex": "We derive the formula from basic rules."
      },
      {
        "w": "notion",
        "pos": "noun",
        "ph": "/ˈnəʊ.ʃən/",
        "v": "khái niệm",
        "ex": "The notion of fairness is complex."
      },
      {
        "w": "systematic",
        "pos": "adj",
        "ph": "/ˌsɪs.təˈmæt.ɪk/",
        "v": "có hệ thống",
        "ex": "They took a systematic approach."
      },
      {
        "w": "rigorous",
        "pos": "adj",
        "ph": "/ˈrɪɡ.ər.əs/",
        "v": "chặt chẽ / nghiêm ngặt",
        "ex": "The method must be rigorous."
      },
      {
        "w": "preliminary",
        "pos": "adj",
        "ph": "/prɪˈlɪm.ɪ.nər.i/",
        "v": "sơ bộ",
        "ex": "The preliminary results look promising."
      },
      {
        "w": "synthesize",
        "pos": "verb",
        "ph": "/ˈsɪn.θə.saɪz/",
        "v": "tổng hợp",
        "ex": "A review synthesizes many studies."
      },
      {
        "w": "rationale",
        "pos": "noun",
        "ph": "/ˌræʃ.əˈnɑːl/",
        "v": "cơ sở lý luận",
        "ex": "The rationale for the study is set out in section two."
      },
      {
        "w": "limitation",
        "pos": "noun",
        "ph": "/ˌlɪm.ɪˈteɪ.ʃən/",
        "v": "hạn chế của nghiên cứu",
        "ex": "The small sample is the main limitation of this work."
      },
      {
        "w": "implication",
        "pos": "noun",
        "ph": "/ˌɪm.plɪˈkeɪ.ʃən/",
        "v": "hàm ý, ý nghĩa rút ra",
        "ex": "The findings have clear implications for policy."
      },
      {
        "w": "theoretical",
        "pos": "adjective",
        "ph": "/ˌθɪəˈret.ɪ.kəl/",
        "v": "thuộc về lý thuyết",
        "ex": "The paper builds a theoretical model of the process."
      },
      {
        "w": "cohort",
        "pos": "noun",
        "ph": "/ˈkəʊ.hɔːt/",
        "v": "nhóm thuần tập",
        "ex": "The study followed a cohort of 200 students."
      },
      {
        "w": "longitudinal",
        "pos": "adjective",
        "ph": "/ˌlɒn.dʒɪˈtʃuː.dɪ.nəl/",
        "v": "theo chiều dọc, dài hạn",
        "ex": "A longitudinal study tracks the same people for years."
      },
      {
        "w": "randomized",
        "pos": "adjective",
        "ph": "/ˈræn.də.maɪzd/",
        "v": "được phân ngẫu nhiên",
        "ex": "Participants were randomized into two groups."
      },
      {
        "w": "control group",
        "pos": "noun",
        "ph": "/kənˈtrəʊl ɡruːp/",
        "v": "nhóm đối chứng",
        "ex": "The control group received no extra training."
      },
      {
        "w": "bibliography",
        "pos": "noun",
        "ph": "/ˌbɪb.liˈɒɡ.rə.fi/",
        "v": "danh mục tài liệu tham khảo",
        "ex": "Every source must appear in the bibliography."
      },
      {
        "w": "footnote",
        "pos": "noun",
        "ph": "/ˈfʊt.nəʊt/",
        "v": "chú thích chân trang",
        "ex": "Put the definition in a footnote."
      },
      {
        "w": "paraphrase",
        "pos": "verb",
        "ph": "/ˈpær.ə.freɪz/",
        "v": "diễn đạt lại bằng lời mình",
        "ex": "Paraphrase the idea instead of copying the sentence."
      },
      {
        "w": "corroborate",
        "pos": "verb",
        "ph": "/kəˈrɒb.ə.reɪt/",
        "v": "chứng thực, củng cố",
        "ex": "The interviews corroborate the survey results."
      },
      {
        "w": "extrapolate",
        "pos": "verb",
        "ph": "/ɪkˈstræp.ə.leɪt/",
        "v": "ngoại suy",
        "ex": "Do not extrapolate beyond the range of the data."
      },
      {
        "w": "generalizable",
        "pos": "adjective",
        "ph": "/ˈdʒen.ər.ə.laɪ.zə.bəl/",
        "v": "có thể khái quát hoá",
        "ex": "The results may not be generalizable to other schools."
      },
      {
        "w": "discourse",
        "pos": "noun",
        "ph": "/ˈdɪs.kɔːs/",
        "v": "diễn ngôn",
        "ex": "The paper analyses classroom discourse in detail."
      },
      {
        "w": "research question",
        "pos": "noun",
        "ph": "/rɪˈsɜːtʃ ˈkwes.tʃən/",
        "v": "câu hỏi nghiên cứu",
        "ex": "A sharp research question shapes the whole paper."
      },
      {
        "w": "conceptual framework",
        "pos": "noun",
        "ph": "/kənˈsep.tʃu.əl ˈfreɪm.wɜːk/",
        "v": "khung khái niệm",
        "ex": "The conceptual framework links the three variables."
      },
      {
        "w": "operationalize",
        "pos": "verb",
        "ph": "/ˌɒp.ərˈeɪ.ʃən.əl.aɪz/",
        "v": "thao tác hoá khái niệm",
        "ex": "We operationalize motivation as time spent studying."
      },
      {
        "w": "reliability",
        "pos": "noun",
        "ph": "/rɪˌlaɪ.əˈbɪl.ə.ti/",
        "v": "độ tin cậy của thang đo",
        "ex": "The scale showed high reliability across both groups."
      },
      {
        "w": "triangulation",
        "pos": "noun",
        "ph": "/traɪˌæŋ.ɡjəˈleɪ.ʃən/",
        "v": "tam giác hoá dữ liệu",
        "ex": "Triangulation combines interviews, tests and observation."
      },
      {
        "w": "grounded theory",
        "pos": "noun",
        "ph": "/ˈɡraʊn.dɪd ˈθɪə.ri/",
        "v": "lý thuyết nền",
        "ex": "Grounded theory builds concepts from the data itself."
      },
      {
        "w": "case study",
        "pos": "noun",
        "ph": "/keɪs ˈstʌd.i/",
        "v": "nghiên cứu trường hợp",
        "ex": "The case study follows one school for a year."
      },
      {
        "w": "meta-analysis",
        "pos": "noun",
        "ph": "/ˌmet.ə.əˈnæl.ə.sɪs/",
        "v": "phân tích tổng hợp",
        "ex": "A meta-analysis pools results from forty studies."
      },
      {
        "w": "confounding variable",
        "pos": "noun",
        "ph": "/kənˈfaʊn.dɪŋ ˈveə.ri.ə.bəl/",
        "v": "biến gây nhiễu",
        "ex": "Family income is a confounding variable here."
      },
      {
        "w": "ethical approval",
        "pos": "noun",
        "ph": "/ˈeθ.ɪ.kəl əˈpruː.vəl/",
        "v": "phê duyệt đạo đức nghiên cứu",
        "ex": "No data was collected before ethical approval."
      },
      {
        "w": "informed consent",
        "pos": "noun",
        "ph": "/ɪnˌfɔːmd kənˈsent/",
        "v": "đồng ý sau khi được giải thích",
        "ex": "Every participant gave informed consent."
      },
      {
        "w": "pilot study",
        "pos": "noun",
        "ph": "/ˈpaɪ.lət ˈstʌd.i/",
        "v": "nghiên cứu thử nghiệm",
        "ex": "A pilot study tested the questionnaire on ten people."
      },
      {
        "w": "scholarly",
        "pos": "adjective",
        "ph": "/ˈskɒl.əl.i/",
        "v": "thuộc học thuật",
        "ex": "Use scholarly sources, not blog posts."
      }
    ]
  },
  {
    "topic": "ielts",
    "label": "📝 IELTS 6.5+",
    "words": [
      {
        "w": "exacerbate",
        "pos": "verb",
        "ph": "/ɪɡˈzæs.ə.beɪt/",
        "v": "làm trầm trọng thêm",
        "ex": "Smoking can exacerbate the illness."
      },
      {
        "w": "mitigate",
        "pos": "verb",
        "ph": "/ˈmɪt.ɪ.ɡeɪt/",
        "v": "giảm nhẹ",
        "ex": "We must mitigate climate change."
      },
      {
        "w": "ubiquitous",
        "pos": "adj",
        "ph": "/juːˈbɪk.wɪ.təs/",
        "v": "có mặt khắp nơi",
        "ex": "Smartphones are ubiquitous today."
      },
      {
        "w": "plethora",
        "pos": "noun",
        "ph": "/ˈpleθ.ər.ə/",
        "v": "số lượng lớn",
        "ex": "There is a plethora of choices."
      },
      {
        "w": "meticulous",
        "pos": "adj",
        "ph": "/məˈtɪk.jə.ləs/",
        "v": "tỉ mỉ, cẩn thận",
        "ex": "She is meticulous about details."
      },
      {
        "w": "inevitable",
        "pos": "adj",
        "ph": "/ɪnˈev.ɪ.tə.bəl/",
        "v": "không thể tránh khỏi",
        "ex": "Change is inevitable."
      },
      {
        "w": "detrimental",
        "pos": "adj",
        "ph": "/ˌdet.rɪˈmen.təl/",
        "v": "có hại",
        "ex": "Lack of sleep is detrimental to health."
      },
      {
        "w": "prevalent",
        "pos": "adj",
        "ph": "/ˈprev.əl.ənt/",
        "v": "phổ biến",
        "ex": "Remote work is prevalent in tech."
      },
      {
        "w": "controversial",
        "pos": "adj",
        "ph": "/ˌkɒn.trəˈvɜː.ʃəl/",
        "v": "gây tranh cãi",
        "ex": "The new policy is highly controversial."
      },
      {
        "w": "feasible",
        "pos": "adj",
        "ph": "/ˈfiː.zə.bəl/",
        "v": "khả thi",
        "ex": "The plan is feasible with more funding."
      },
      {
        "w": "compelling",
        "pos": "adj",
        "ph": "/kəmˈpel.ɪŋ/",
        "v": "thuyết phục",
        "ex": "She gave a compelling argument."
      },
      {
        "w": "alleviate",
        "pos": "verb",
        "ph": "/əˈliː.vi.eɪt/",
        "v": "làm dịu, giảm bớt",
        "ex": "New roads alleviate traffic congestion."
      },
      {
        "w": "facilitate",
        "pos": "verb",
        "ph": "/fəˈsɪl.ɪ.teɪt/",
        "v": "tạo điều kiện",
        "ex": "Technology facilitates distance learning."
      },
      {
        "w": "advocate",
        "pos": "verb",
        "ph": "/ˈæd.və.keɪt/",
        "v": "ủng hộ, cổ vũ",
        "ex": "Many experts advocate early education."
      },
      {
        "w": "undermine",
        "pos": "verb",
        "ph": "/ˌʌn.dəˈmaɪn/",
        "v": "làm suy yếu",
        "ex": "Rumors undermine public trust."
      },
      {
        "w": "unprecedented",
        "pos": "adj",
        "ph": "/ʌnˈpres.ɪ.den.tɪd/",
        "v": "chưa từng có",
        "ex": "The city grew at an unprecedented rate."
      },
      {
        "w": "paramount",
        "pos": "adj",
        "ph": "/ˈpær.ə.maʊnt/",
        "v": "tối quan trọng",
        "ex": "Safety is of paramount importance."
      },
      {
        "w": "scrutinize",
        "pos": "verb",
        "ph": "/ˈskruː.tɪ.naɪz/",
        "v": "xem xét kỹ lưỡng",
        "ex": "Auditors scrutinize every expense."
      },
      {
        "w": "resilient",
        "pos": "adj",
        "ph": "/rɪˈzɪl.i.ənt/",
        "v": "kiên cường, phục hồi nhanh",
        "ex": "Children are remarkably resilient."
      },
      {
        "w": "discrepancy",
        "pos": "noun",
        "ph": "/dɪˈskrep.ən.si/",
        "v": "sự không nhất quán",
        "ex": "There is a discrepancy between the two reports."
      },
      {
        "w": "ambiguous",
        "pos": "adj",
        "ph": "/æmˈbɪɡ.ju.əs/",
        "v": "mơ hồ, đa nghĩa",
        "ex": "The instructions were ambiguous."
      },
      {
        "w": "coherent",
        "pos": "adj",
        "ph": "/kəʊˈhɪə.rənt/",
        "v": "mạch lạc",
        "ex": "A high-band essay is clear and coherent."
      },
      {
        "w": "nuance",
        "pos": "noun",
        "ph": "/ˈnjuː.ɑːns/",
        "v": "sắc thái tinh tế",
        "ex": "She grasped every nuance of the poem."
      },
      {
        "w": "profound",
        "pos": "adj",
        "ph": "/prəˈfaʊnd/",
        "v": "sâu sắc",
        "ex": "The book had a profound impact on me."
      },
      {
        "w": "diminish",
        "pos": "verb",
        "ph": "/dɪˈmɪn.ɪʃ/",
        "v": "làm giảm đi",
        "ex": "Exercise can diminish stress."
      },
      {
        "w": "proliferate",
        "pos": "verb",
        "ph": "/prəˈlɪf.ər.eɪt/",
        "v": "sinh sôi nhanh",
        "ex": "Online courses have proliferated recently."
      },
      {
        "w": "susceptible",
        "pos": "adj",
        "ph": "/səˈsep.tə.bəl/",
        "v": "dễ bị (ảnh hưởng)",
        "ex": "Young children are susceptible to colds."
      },
      {
        "w": "notwithstanding",
        "pos": "prep",
        "ph": "/ˌnɒt.wɪðˈstæn.dɪŋ/",
        "v": "mặc dù vậy",
        "ex": "Notwithstanding the cost, the plan went ahead."
      },
      {
        "w": "lucrative",
        "pos": "adj",
        "ph": "/ˈluː.krə.tɪv/",
        "v": "sinh lời nhiều",
        "ex": "Programming can be a lucrative career."
      },
      {
        "w": "redundant",
        "pos": "adj",
        "ph": "/rɪˈdʌn.dənt/",
        "v": "thừa / dư thừa",
        "ex": "Avoid redundant words in your essay."
      },
      {
        "w": "coincide",
        "pos": "verb",
        "ph": "/ˌkəʊ.ɪnˈsaɪd/",
        "v": "trùng khớp / xảy ra cùng lúc",
        "ex": "The festival coincides with the holiday."
      },
      {
        "w": "inherent",
        "pos": "adj",
        "ph": "/ɪnˈher.ənt/",
        "v": "vốn có, cố hữu",
        "ex": "Risk is inherent in any investment."
      },
      {
        "w": "comprehensive",
        "pos": "adj",
        "ph": "/ˌkɒm.prɪˈhen.sɪv/",
        "v": "toàn diện",
        "ex": "The report gives a comprehensive overview."
      },
      {
        "w": "albeit",
        "pos": "conjunction",
        "ph": "/ɔːlˈbiː.ɪt/",
        "v": "mặc dù vậy",
        "ex": "The plan worked, albeit more slowly than expected."
      },
      {
        "w": "deteriorate",
        "pos": "verb",
        "ph": "/dɪˈtɪə.ri.ə.reɪt/",
        "v": "xấu đi, suy giảm",
        "ex": "Air quality has deteriorated sharply in recent years."
      },
      {
        "w": "eradicate",
        "pos": "verb",
        "ph": "/ɪˈræd.ɪ.keɪt/",
        "v": "xoá sổ hoàn toàn",
        "ex": "Vaccination has eradicated smallpox worldwide."
      },
      {
        "w": "imperative",
        "pos": "adjective",
        "ph": "/ɪmˈper.ə.tɪv/",
        "v": "cấp thiết, bắt buộc phải",
        "ex": "It is imperative to act before the situation worsens."
      },
      {
        "w": "indispensable",
        "pos": "adjective",
        "ph": "/ˌɪn.dɪˈspen.sə.bəl/",
        "v": "không thể thiếu",
        "ex": "Smartphones have become indispensable to daily life."
      },
      {
        "w": "intricate",
        "pos": "adjective",
        "ph": "/ˈɪn.trɪ.kət/",
        "v": "phức tạp, tinh vi",
        "ex": "Tax law is an intricate system of rules."
      },
      {
        "w": "outweigh",
        "pos": "verb",
        "ph": "/ˌaʊtˈweɪ/",
        "v": "lớn hơn, vượt trội hơn",
        "ex": "The benefits clearly outweigh the drawbacks."
      },
      {
        "w": "pervasive",
        "pos": "adjective",
        "ph": "/pəˈveɪ.sɪv/",
        "v": "lan rộng khắp nơi",
        "ex": "Social media is pervasive among teenagers."
      },
      {
        "w": "reinforce",
        "pos": "verb",
        "ph": "/ˌriː.ɪnˈfɔːs/",
        "v": "củng cố",
        "ex": "The new data reinforce the earlier findings."
      },
      {
        "w": "substantiate",
        "pos": "verb",
        "ph": "/səbˈstæn.ʃi.eɪt/",
        "v": "chứng minh bằng bằng chứng",
        "ex": "He could not substantiate his claim with evidence."
      },
      {
        "w": "tackle",
        "pos": "verb",
        "ph": "/ˈtæk.əl/",
        "v": "xử lý, giải quyết (vấn đề)",
        "ex": "Governments must tackle youth unemployment."
      },
      {
        "w": "viable",
        "pos": "adjective",
        "ph": "/ˈvaɪ.ə.bəl/",
        "v": "khả thi",
        "ex": "Solar power is now a viable alternative to coal."
      },
      {
        "w": "widespread",
        "pos": "adjective",
        "ph": "/ˈwaɪd.spred/",
        "v": "phổ biến rộng rãi",
        "ex": "There is widespread support for the reform."
      },
      {
        "w": "disparity",
        "pos": "noun",
        "ph": "/dɪˈspær.ə.ti/",
        "v": "sự chênh lệch",
        "ex": "The disparity between rich and poor keeps growing."
      },
      {
        "w": "foster",
        "pos": "verb",
        "ph": "/ˈfɒs.tər/",
        "v": "nuôi dưỡng, thúc đẩy",
        "ex": "Group work fosters collaboration among students."
      },
      {
        "w": "curb",
        "pos": "verb",
        "ph": "/kɜːb/",
        "v": "kiềm chế, hạn chế",
        "ex": "The new rules aim to curb air pollution."
      },
      {
        "w": "mitigation",
        "pos": "noun",
        "ph": "/ˌmɪt.ɪˈɡeɪ.ʃən/",
        "v": "sự giảm nhẹ",
        "ex": "Flood mitigation requires long-term planning."
      },
      {
        "w": "accelerate",
        "pos": "verb",
        "ph": "/əkˈsel.ə.reɪt/",
        "v": "đẩy nhanh",
        "ex": "Technology has accelerated the pace of change."
      },
      {
        "w": "advocate for",
        "pos": "verb",
        "ph": "/ˈæd.və.keɪt fɔːr/",
        "v": "vận động ủng hộ",
        "ex": "Many scientists advocate for stricter emission limits."
      },
      {
        "w": "counterargument",
        "pos": "noun",
        "ph": "/ˈkaʊn.tərˌɑː.ɡjə.mənt/",
        "v": "luận điểm phản bác",
        "ex": "A strong essay answers the main counterargument."
      },
      {
        "w": "drawback",
        "pos": "noun",
        "ph": "/ˈdrɔː.bæk/",
        "v": "nhược điểm",
        "ex": "The main drawback is the cost."
      },
      {
        "w": "incentivize",
        "pos": "verb",
        "ph": "/ɪnˈsen.tɪ.vaɪz/",
        "v": "tạo động lực bằng lợi ích",
        "ex": "Tax breaks incentivize companies to hire graduates."
      },
      {
        "w": "marginalized",
        "pos": "adjective",
        "ph": "/ˈmɑː.dʒɪ.nə.laɪzd/",
        "v": "bị gạt ra bên lề",
        "ex": "Marginalized groups often lack access to health care."
      },
      {
        "w": "offset",
        "pos": "verb",
        "ph": "/ˌɒfˈset/",
        "v": "bù đắp",
        "ex": "Planting trees can offset some emissions."
      },
      {
        "w": "predominantly",
        "pos": "adverb",
        "ph": "/prɪˈdɒm.ɪ.nənt.li/",
        "v": "chủ yếu là",
        "ex": "The workforce is predominantly young."
      },
      {
        "w": "sustainable",
        "pos": "adjective",
        "ph": "/səˈsteɪ.nə.bəl/",
        "v": "bền vững",
        "ex": "We need a sustainable transport system."
      },
      {
        "w": "threshold",
        "pos": "noun",
        "ph": "/ˈθreʃ.həʊld/",
        "v": "ngưỡng",
        "ex": "Pollution passed the safe threshold in June."
      },
      {
        "w": "trigger",
        "pos": "verb",
        "ph": "/ˈtrɪɡ.ər/",
        "v": "châm ngòi, gây ra",
        "ex": "The price rise triggered widespread protests."
      },
      {
        "w": "underpin",
        "pos": "verb",
        "ph": "/ˌʌn.dəˈpɪn/",
        "v": "làm nền tảng cho",
        "ex": "Trust underpins every successful partnership."
      },
      {
        "w": "vulnerable",
        "pos": "adjective",
        "ph": "/ˈvʌl.nər.ə.bəl/",
        "v": "dễ bị tổn thương",
        "ex": "Elderly people are the most vulnerable in a heatwave."
      }
    ]
  },
  {
    "topic": "se",
    "label": "🏗️ Kỹ thuật phần mềm",
    "words": [
      {
        "w": "use case",
        "pos": "noun",
        "ph": "/ˈjuːs ˌkeɪs/",
        "v": "ca sử dụng",
        "ex": "Each use case describes one user goal."
      },
      {
        "w": "technical debt",
        "pos": "noun",
        "ph": "/ˌtek.nɪ.kəl ˈdet/",
        "v": "nợ kỹ thuật",
        "ex": "Quick fixes create technical debt."
      },
      {
        "w": "integration test",
        "pos": "noun",
        "ph": "/ˌɪn.tɪˈɡreɪ.ʃən ˌtest/",
        "v": "kiểm thử tích hợp",
        "ex": "Integration tests check modules together."
      },
      {
        "w": "deployment",
        "pos": "noun",
        "ph": "/dɪˈplɔɪ.mənt/",
        "v": "triển khai",
        "ex": "Automated deployment reduces mistakes."
      },
      {
        "w": "merge conflict",
        "pos": "noun",
        "ph": "/ˈmɜːdʒ ˌkɒn.flɪkt/",
        "v": "xung đột hợp nhất",
        "ex": "Resolve the merge conflict before pushing."
      },
      {
        "w": "maintainability",
        "pos": "noun",
        "ph": "/meɪnˌteɪ.nəˈbɪl.ə.ti/",
        "v": "khả năng bảo trì",
        "ex": "Clean code improves maintainability."
      },
      {
        "w": "prototype",
        "pos": "noun",
        "ph": "/ˈprəʊ.tə.taɪp/",
        "v": "bản mẫu",
        "ex": "Build a prototype to test the idea fast."
      },
      {
        "w": "estimation",
        "pos": "noun",
        "ph": "/ˌes.tɪˈmeɪ.ʃən/",
        "v": "ước lượng công sức",
        "ex": "Estimation helps plan the sprint."
      },
      {
        "w": "bug tracker",
        "pos": "noun",
        "ph": "/ˈbʌɡ ˌtræk.ər/",
        "v": "hệ theo dõi lỗi",
        "ex": "Log the issue in the bug tracker."
      },
      {
        "w": "continuous integration",
        "pos": "noun",
        "ph": "/kənˌtɪn.ju.əs ˌɪn.tɪˈɡreɪ.ʃən/",
        "v": "tích hợp liên tục",
        "ex": "CI runs tests on every commit."
      },
      {
        "w": "waterfall",
        "pos": "noun",
        "ph": "/ˈwɔː.tə.fɔːl/",
        "v": "mô hình thác nước",
        "ex": "Waterfall finishes each phase before the next."
      },
      {
        "w": "scrum",
        "pos": "noun",
        "ph": "/skrʌm/",
        "v": "khung làm việc Scrum",
        "ex": "Scrum organizes work into sprints."
      },
      {
        "w": "kanban",
        "pos": "noun",
        "ph": "/ˈkæn.bæn/",
        "v": "bảng Kanban",
        "ex": "A kanban board shows tasks moving across columns."
      },
      {
        "w": "retrospective",
        "pos": "noun",
        "ph": "/ˌret.rəˈspek.tɪv/",
        "v": "buổi nhìn lại",
        "ex": "A retrospective reviews what went well and badly."
      },
      {
        "w": "staging",
        "pos": "noun",
        "ph": "/ˈsteɪ.dʒɪŋ/",
        "v": "môi trường thử nghiệm",
        "ex": "Test on staging before going to production."
      },
      {
        "w": "rollback",
        "pos": "noun",
        "ph": "/ˈrəʊl.bæk/",
        "v": "khôi phục bản cũ",
        "ex": "A bad release triggers a rollback."
      },
      {
        "w": "changelog",
        "pos": "noun",
        "ph": "/ˈtʃeɪndʒ.lɒɡ/",
        "v": "nhật ký thay đổi",
        "ex": "The changelog lists every new feature."
      },
      {
        "w": "linter",
        "pos": "noun",
        "ph": "/ˈlɪn.tər/",
        "v": "công cụ soi lỗi mã",
        "ex": "A linter flags style problems automatically."
      },
      {
        "w": "scalable architecture",
        "pos": "noun",
        "ph": "/ˈskeɪ.lə.bəl ˈɑː.kɪ.tek.tʃər/",
        "v": "kiến trúc mở rộng được",
        "ex": "Microservices give a scalable architecture."
      },
      {
        "w": "acceptance criteria",
        "pos": "noun",
        "ph": "/əkˈsep.təns kraɪˈtɪə.ri.ə/",
        "v": "tiêu chí nghiệm thu",
        "ex": "Each task lists its acceptance criteria."
      },
      {
        "w": "code smell",
        "pos": "noun",
        "ph": "/kəʊd smel/",
        "v": "dấu hiệu mã thiết kế kém",
        "ex": "A five-hundred-line function is a classic code smell."
      },
      {
        "w": "design pattern",
        "pos": "noun",
        "ph": "/dɪˈzaɪn ˈpæt.ən/",
        "v": "mẫu thiết kế",
        "ex": "The observer design pattern fits this problem well."
      },
      {
        "w": "coupling",
        "pos": "noun",
        "ph": "/ˈkʌp.lɪŋ/",
        "v": "độ phụ thuộc giữa các mô-đun",
        "ex": "Low coupling makes a module easy to replace."
      },
      {
        "w": "cohesion",
        "pos": "noun",
        "ph": "/kəʊˈhiː.ʒən/",
        "v": "độ gắn kết bên trong mô-đun",
        "ex": "High cohesion means the module does one job well."
      },
      {
        "w": "user story",
        "pos": "noun",
        "ph": "/ˈjuː.zər ˈstɔː.ri/",
        "v": "câu chuyện người dùng",
        "ex": "Each user story must fit inside one sprint."
      },
      {
        "w": "stand-up",
        "pos": "noun",
        "ph": "/ˈstænd.ʌp/",
        "v": "họp nhanh hằng ngày",
        "ex": "The daily stand-up lasts fifteen minutes."
      },
      {
        "w": "velocity",
        "pos": "noun",
        "ph": "/vəˈlɒs.ə.ti/",
        "v": "tốc độ hoàn thành của nhóm",
        "ex": "The team’s velocity is about thirty points per sprint."
      },
      {
        "w": "code coverage",
        "pos": "noun",
        "ph": "/kəʊd ˈkʌv.ər.ɪdʒ/",
        "v": "độ phủ của kiểm thử",
        "ex": "Aim for at least 80% code coverage on core modules."
      },
      {
        "w": "regression test",
        "pos": "noun",
        "ph": "/rɪˈɡreʃ.ən test/",
        "v": "kiểm thử hồi quy",
        "ex": "Run the regression tests before every release."
      },
      {
        "w": "smoke test",
        "pos": "noun",
        "ph": "/sməʊk test/",
        "v": "kiểm thử nhanh sau khi dựng",
        "ex": "A smoke test checks that the app starts at all."
      },
      {
        "w": "release candidate",
        "pos": "noun",
        "ph": "/rɪˈliːs ˈkæn.dɪ.dət/",
        "v": "bản ứng viên phát hành",
        "ex": "Version 2.0-rc1 is our first release candidate."
      },
      {
        "w": "versioning",
        "pos": "noun",
        "ph": "/ˈvɜː.ʃən.ɪŋ/",
        "v": "cách đánh số phiên bản",
        "ex": "Semantic versioning uses major, minor and patch numbers."
      },
      {
        "w": "feature flag",
        "pos": "noun",
        "ph": "/ˈfiː.tʃər flæɡ/",
        "v": "cờ bật tắt tính năng",
        "ex": "Hide the new page behind a feature flag until launch."
      },
      {
        "w": "hotfix",
        "pos": "noun",
        "ph": "/ˈhɒt.fɪks/",
        "v": "bản vá khẩn cấp",
        "ex": "We shipped a hotfix within an hour of the report."
      },
      {
        "w": "code freeze",
        "pos": "noun",
        "ph": "/kəʊd friːz/",
        "v": "giai đoạn ngừng sửa mã",
        "ex": "There is a code freeze in the week before release."
      },
      {
        "w": "scope creep",
        "pos": "noun",
        "ph": "/skəʊp kriːp/",
        "v": "sự phình phạm vi dự án",
        "ex": "Scope creep delayed the project by two months."
      },
      {
        "w": "pair programming",
        "pos": "noun",
        "ph": "/peər ˈprəʊ.ɡræm.ɪŋ/",
        "v": "lập trình đôi",
        "ex": "Pair programming spreads knowledge across the team."
      },
      {
        "w": "definition of done",
        "pos": "noun",
        "ph": "/ˌdef.ɪˈnɪʃ.ən əv dʌn/",
        "v": "tiêu chí coi là hoàn thành",
        "ex": "Nothing ships unless it meets the definition of done."
      },
      {
        "w": "burndown chart",
        "pos": "noun",
        "ph": "/ˈbɜːn.daʊn tʃɑːt/",
        "v": "biểu đồ tiến độ sprint",
        "ex": "The burndown chart shows how much work is left."
      },
      {
        "w": "traceability",
        "pos": "noun",
        "ph": "/ˌtreɪ.səˈbɪl.ə.ti/",
        "v": "khả năng truy vết yêu cầu",
        "ex": "Traceability links every requirement to a test case."
      },
      {
        "w": "sprint planning",
        "pos": "noun",
        "ph": "/sprɪnt ˈplæn.ɪŋ/",
        "v": "họp lập kế hoạch sprint",
        "ex": "Sprint planning turns the backlog into this week’s work."
      },
      {
        "w": "story point",
        "pos": "noun",
        "ph": "/ˈstɔː.ri pɔɪnt/",
        "v": "điểm ước lượng công việc",
        "ex": "This task is five story points."
      },
      {
        "w": "epic",
        "pos": "noun",
        "ph": "/ˈep.ɪk/",
        "v": "nhóm việc lớn",
        "ex": "An epic breaks down into many user stories."
      },
      {
        "w": "impediment",
        "pos": "noun",
        "ph": "/ɪmˈped.ɪ.mənt/",
        "v": "trở ngại cần gỡ",
        "ex": "The scrum master removes impediments for the team."
      },
      {
        "w": "handover",
        "pos": "noun",
        "ph": "/ˈhæn.dəʊ.vər/",
        "v": "bàn giao",
        "ex": "Write a handover note before you go on leave."
      },
      {
        "w": "runbook",
        "pos": "noun",
        "ph": "/ˈrʌn.bʊk/",
        "v": "sổ tay vận hành",
        "ex": "The runbook lists what to do when the queue backs up."
      },
      {
        "w": "postmortem",
        "pos": "noun",
        "ph": "/ˌpəʊstˈmɔː.təm/",
        "v": "họp rút kinh nghiệm sau sự cố",
        "ex": "The postmortem blamed the process, not the person."
      },
      {
        "w": "service level agreement",
        "pos": "noun",
        "ph": "/ˈsɜː.vɪs ˈlev.əl əˈɡriː.mənt/",
        "v": "cam kết mức dịch vụ",
        "ex": "Our service level agreement promises 99.9% uptime."
      },
      {
        "w": "backward compatibility",
        "pos": "noun",
        "ph": "/ˈbæk.wəd kəmˌpæt.əˈbɪl.ə.ti/",
        "v": "tương thích ngược",
        "ex": "Backward compatibility lets old clients keep working."
      },
      {
        "w": "breaking change",
        "pos": "noun",
        "ph": "/ˈbreɪ.kɪŋ tʃeɪndʒ/",
        "v": "thay đổi phá vỡ tương thích",
        "ex": "Renaming that field is a breaking change."
      },
      {
        "w": "canary release",
        "pos": "noun",
        "ph": "/kəˈneə.ri rɪˈliːs/",
        "v": "phát hành thăm dò",
        "ex": "A canary release ships to 1% of users first."
      },
      {
        "w": "blue-green deployment",
        "pos": "noun",
        "ph": "/ˌbluːˈɡriːn dɪˈplɔɪ.mənt/",
        "v": "triển khai hai môi trường song song",
        "ex": "Blue-green deployment switches traffic with no downtime."
      },
      {
        "w": "observability",
        "pos": "noun",
        "ph": "/əbˌzɜː.vəˈbɪl.ə.ti/",
        "v": "khả năng quan sát hệ thống",
        "ex": "Good observability tells you why, not just that it broke."
      },
      {
        "w": "on-call",
        "pos": "adjective",
        "ph": "/ˌɒnˈkɔːl/",
        "v": "trực hệ thống",
        "ex": "She is on-call this weekend."
      }
    ]
  }
];
