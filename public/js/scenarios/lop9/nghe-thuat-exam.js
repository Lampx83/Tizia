// S9NT — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const S9NT_EXAMS = {
 "S9NT-exam-gk1": {
  "id": "S9NT-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Nghệ thuật 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Nghệ thuật 9",
  "questions": [
   {
    "stem": "7 nốt nhạc cơ bản trong âm nhạc phương Tây, theo đúng thứ tự, là gì?",
    "choices": [
     "Đô – Rê – Mi – Fa – Sol – La – Si",
     "Đô – Rê – Mi – Fa – Sol – La – Đô",
     "Đô – Rê – Mi – Pha – Xon – La – Xi",
     "Đô – Mi – Sol – Si – Rê – Fa – La"
    ],
    "answer": 0,
    "explanation": "Thang âm cơ bản gồm 7 tên nốt liền bậc: Đô, Rê, Mi, Fa, Sol, La, Si; sau Si sẽ lặp lại Đô ở quãng 8 kế tiếp.",
    "choiceFeedback": [
     "Đúng — đây là 7 tên nốt liền bậc chuẩn.",
     "Sai — nốt cuối lặp lại Đô là quãng 8, không phải nốt thứ 7 riêng biệt.",
     "Sai — tên nốt bị viết sai chính tả theo quy ước.",
     "Sai — đây là thứ tự các nốt trong hợp âm, không phải thang âm liền bậc."
    ]
   },
   {
    "stem": "Nốt tròn (whole note) có trường độ bằng bao nhiêu nốt đen?",
    "choices": [
     "2 nốt đen",
     "3 nốt đen",
     "4 nốt đen",
     "8 nốt đen"
    ],
    "answer": 2,
    "explanation": "Theo hệ thống trường độ chuẩn: nốt tròn = 2 nốt trắng = 4 nốt đen = 8 nốt móc đơn.",
    "choiceFeedback": [
     "Sai — 2 nốt đen là trường độ của nốt trắng.",
     "Sai — không có tỉ lệ chia 3 trong hệ trường độ cơ bản.",
     "Đúng — nốt tròn ngân dài gấp 4 lần nốt đen.",
     "Sai — 8 nốt đen dài gấp đôi một nốt tròn."
    ]
   },
   {
    "stem": "Trường độ trong âm nhạc thể hiện điều gì của âm thanh?",
    "choices": [
     "Độ cao thấp của âm thanh",
     "Độ dài ngắn (thời gian ngân vang) của âm thanh",
     "Độ to nhỏ (cường độ) của âm thanh",
     "Màu sắc/âm sắc của nhạc cụ"
    ],
    "answer": 1,
    "explanation": "Trường độ là thời gian ngân vang của một âm thanh, được ký hiệu bằng hình dạng nốt nhạc (tròn, trắng, đen, móc...); độ cao thấp gọi là cao độ.",
    "choiceFeedback": [
     "Sai — đó là khái niệm cao độ.",
     "Đúng — trường độ chỉ độ dài ngắn của âm thanh.",
     "Sai — đó là cường độ (to, nhỏ).",
     "Sai — đó là âm sắc, đặc trưng riêng của từng nhạc cụ/giọng hát."
    ]
   },
   {
    "stem": "Hợp âm là gì?",
    "choices": [
     "Một nốt nhạc duy nhất được ngân dài",
     "Một chuỗi các nốt nhạc vang lên lần lượt, nối tiếp nhau",
     "Ký hiệu chỉ tốc độ (nhịp độ) của bản nhạc",
     "Sự kết hợp từ ba nốt nhạc trở lên vang lên đồng thời, tạo thành khối âm thanh hài hòa"
    ],
    "answer": 3,
    "explanation": "Hợp âm (chord) là tổ hợp từ ba nốt trở lên vang lên cùng lúc, tạo cảm giác hài hòa hoặc căng thẳng tùy cấu trúc.",
    "choiceFeedback": [
     "Sai — một nốt đơn lẻ không tạo thành hợp âm.",
     "Sai — các nốt vang lên nối tiếp tạo thành giai điệu, không phải hợp âm.",
     "Sai — đó là ký hiệu tempo, không liên quan hợp âm.",
     "Đúng — đây chính là định nghĩa hợp âm."
    ]
   },
   {
    "stem": "Hợp âm Đô trưởng (C) gồm những nốt nào?",
    "choices": [
     "Đô – Mi – Sol",
     "Đô – Fa – La",
     "Đô – Rê – Mi",
     "Đô – Mi – Sol – Si"
    ],
    "answer": 0,
    "explanation": "Hợp âm trưởng ba nốt được xây trên nốt gốc theo công thức quãng 3 trưởng + quãng 3 thứ: C – E – G (Đô – Mi – Sol).",
    "choiceFeedback": [
     "Đúng — đây là ba nốt của hợp âm Đô trưởng.",
     "Sai — đây là các nốt của hợp âm Fa trưởng (F).",
     "Sai — ba nốt liền bậc này không phải cấu trúc của một hợp âm ba.",
     "Sai — thêm nốt Si sẽ thành hợp âm Cmaj7, không phải hợp âm ba cơ bản."
    ]
   },
   {
    "stem": "Hợp âm La thứ (Am) gồm những nốt nào?",
    "choices": [
     "La – Đô thăng – Mi",
     "La – Si – Rê",
     "La – Đô – Mi",
     "La – Rê – Fa"
    ],
    "answer": 2,
    "explanation": "Hợp âm thứ ba nốt gồm quãng 3 thứ + quãng 3 trưởng tính từ nốt gốc: Am = A – C – E (La – Đô – Mi).",
    "choiceFeedback": [
     "Sai — Đô thăng sẽ tạo ra La trưởng (A), không phải La thứ.",
     "Sai — đây không phải cấu trúc hợp âm ba tính từ La.",
     "Đúng — đây là ba nốt của hợp âm La thứ.",
     "Sai — đây là các nốt gần với hợp âm Rê thứ, không phải La thứ."
    ]
   },
   {
    "stem": "Ký hiệu hợp âm \"Cm\" nghĩa là gì?",
    "choices": [
     "Hợp âm Đô trưởng",
     "Hợp âm Đô thứ",
     "Hợp âm Đô 7",
     "Hợp âm Đô giáng trưởng"
    ],
    "answer": 1,
    "explanation": "Chữ cái in hoa đứng riêng (C) chỉ hợp âm trưởng; thêm chữ \"m\" (Cm) chỉ hợp âm thứ cùng chủ âm.",
    "choiceFeedback": [
     "Sai — hợp âm Đô trưởng chỉ ký hiệu là C, không có chữ m.",
     "Đúng — chữ m sau tên nốt chỉ hợp âm thứ.",
     "Sai — hợp âm 7 ký hiệu là C7.",
     "Sai — Đô giáng ký hiệu là Cb, không phải Cm."
    ]
   },
   {
    "stem": "Hợp âm 7 khác hợp âm ba (trưởng/thứ) cơ bản ở điểm nào?",
    "choices": [
     "Hợp âm 7 chỉ gồm 2 nốt",
     "Hợp âm 7 không có nốt gốc (nốt chủ âm)",
     "Hợp âm 7 luôn là hợp âm thứ, không có dạng trưởng",
     "Hợp âm 7 thêm một nốt thứ tư (quãng 7 so với nốt gốc) vào hợp âm ba"
    ],
    "answer": 3,
    "explanation": "Hợp âm 7 = hợp âm ba (3 nốt) + thêm một nốt ở quãng 7 tính từ nốt gốc, tạo màu sắc hòa âm phong phú hơn.",
    "choiceFeedback": [
     "Sai — hợp âm 7 có 4 nốt, nhiều hơn chứ không ít hơn hợp âm ba.",
     "Sai — hợp âm 7 vẫn giữ nguyên nốt gốc của hợp âm ba.",
     "Sai — hợp âm 7 có nhiều dạng: dominant 7, major 7, minor 7...",
     "Đúng — đây chính là cách hợp âm 7 được hình thành."
    ]
   },
   {
    "stem": "Hợp âm C7 (dominant 7, Đô 7) gồm những nốt nào?",
    "choices": [
     "Đô – Mi – Sol – Si giáng",
     "Đô – Mi – Sol – Si",
     "Đô – Mi giáng – Sol – Si giáng",
     "Đô – Fa – La – Đô"
    ],
    "answer": 0,
    "explanation": "C7 = hợp âm Đô trưởng (Đô – Mi – Sol) + thêm nốt bảy thứ là Si giáng (Bb).",
    "choiceFeedback": [
     "Đúng — đây là bốn nốt của hợp âm C7.",
     "Sai — có Si (không giáng) là hợp âm Cmaj7, không phải C7.",
     "Sai — Mi giáng khiến hợp âm thành thứ (Cm7), không phải C7.",
     "Sai — đây không phải cấu trúc quãng 7 tính từ Đô."
    ]
   },
   {
    "stem": "So với C7, hợp âm Cmaj7 có điểm khác biệt nào?",
    "choices": [
     "Cmaj7 không chứa nốt Mi",
     "Cmaj7 là hợp âm thứ còn C7 là hợp âm trưởng",
     "Cmaj7 có nốt bảy trưởng là Si, thay vì Si giáng như ở C7",
     "Cmaj7 chỉ được dùng trong nhạc rock, không dùng trong jazz"
    ],
    "answer": 2,
    "explanation": "Cmaj7 gồm Đô – Mi – Sol – Si (nốt 7 trưởng), trong khi C7 gồm Đô – Mi – Sol – Si giáng (nốt 7 thứ/dominant).",
    "choiceFeedback": [
     "Sai — cả Cmaj7 và C7 đều có nốt Mi.",
     "Sai — cả hai đều dựa trên hợp âm Đô trưởng, khác nhau ở nốt bảy.",
     "Đúng — điểm khác biệt duy nhất nằm ở nốt bảy: trưởng (Si) hay thứ (Si giáng).",
     "Sai — Cmaj7 lại được dùng phổ biến trong jazz, ít dùng trong rock."
    ]
   },
   {
    "stem": "Dịch giọng (transpose) là thao tác gì?",
    "choices": [
     "Thay đổi tốc độ (nhịp độ) của bản nhạc",
     "Chuyển toàn bộ các nốt của bản nhạc lên hoặc xuống một khoảng cách cố định, giữ nguyên quan hệ cao độ tương đối",
     "Thay nhạc cụ biểu diễn bản nhạc",
     "Viết lại lời mới cho một giai điệu có sẵn"
    ],
    "answer": 1,
    "explanation": "Dịch giọng là dịch chuyển toàn bộ giai điệu/hợp âm sang một giọng khác bằng cách nâng hoặc hạ đều các nốt một khoảng quãng cố định.",
    "choiceFeedback": [
     "Sai — đó là thay đổi tempo, không phải dịch giọng.",
     "Đúng — đây chính là bản chất của dịch giọng.",
     "Sai — đó là hòa âm phối khí, không phải dịch giọng.",
     "Sai — đó là đặt lời mới (viết lời), không liên quan cao độ."
    ]
   },
   {
    "stem": "Khi dịch giọng một bản nhạc, điều gì được giữ nguyên?",
    "choices": [
     "Cao độ tuyệt đối của từng nốt nhạc",
     "Số lượng dấu hoá ghi ở đầu khuông nhạc",
     "Tên gọi ban đầu của các nốt nhạc",
     "Quan hệ cao độ tương đối (khoảng cách giữa các nốt) và hình dáng giai điệu tổng thể"
    ],
    "answer": 3,
    "explanation": "Dịch giọng làm thay đổi cao độ tuyệt đối, tên nốt và số dấu hoá, nhưng khoảng cách giữa các nốt (quan hệ tương đối) và giai điệu vẫn được bảo toàn.",
    "choiceFeedback": [
     "Sai — cao độ tuyệt đối chính là thứ bị thay đổi khi dịch giọng.",
     "Sai — số dấu hoá thường thay đổi theo giọng mới.",
     "Sai — tên nốt cũng thay đổi theo giọng mới.",
     "Đúng — đây là yếu tố cốt lõi được giữ nguyên khi dịch giọng."
    ]
   },
   {
    "stem": "Trong vòng hợp âm, hợp âm chủ (tonic, bậc I) có vai trò gì?",
    "choices": [
     "Tạo cảm giác ổn định, thường là điểm bắt đầu và kết thúc của bản nhạc",
     "Tạo cảm giác căng thẳng, luôn cần được giải quyết về hợp âm khác",
     "Chỉ xuất hiện ở đoạn giữa bài, không dùng để mở đầu hay kết thúc",
     "Luôn phải là một hợp âm 7"
    ],
    "answer": 0,
    "explanation": "Hợp âm chủ (bậc I) là trung tâm của giọng, mang cảm giác ổn định, thường mở đầu và kết thúc một đoạn nhạc hoặc cả bài.",
    "choiceFeedback": [
     "Đúng — hợp âm chủ tạo sự ổn định, thường mở đầu/kết bài.",
     "Sai — đó là vai trò của hợp âm bậc V (dominant).",
     "Sai — hợp âm chủ thường xuất hiện ở cả đầu và cuối bài.",
     "Sai — hợp âm chủ thường ở dạng hợp âm ba đơn giản, không bắt buộc là hợp âm 7."
    ]
   },
   {
    "stem": "Nhạc Jazz có nguồn gốc từ đâu và mang đặc trưng nổi bật nào?",
    "choices": [
     "Ra đời ở London (Anh), đặc trưng bởi nhịp điệu đều đặn, không thay đổi",
     "Ra đời ở Việt Nam, đặc trưng bởi việc sử dụng nhạc cụ dân tộc truyền thống",
     "Ra đời ở New Orleans (Mỹ) cuối thế kỷ 19 – đầu thế kỷ 20, đặc trưng bởi tính ngẫu hứng (improvisation) và swing",
     "Ra đời ở Đức, đặc trưng bởi hợp xướng tôn giáo nhiều bè"
    ],
    "answer": 2,
    "explanation": "Jazz hình thành tại New Orleans (Mỹ) từ sự hòa trộn blues, ragtime và âm nhạc châu Phi, nổi bật với tính ngẫu hứng và nhịp swing.",
    "choiceFeedback": [
     "Sai — jazz không ra đời ở Anh và không có nhịp điệu cố định, đều đặn.",
     "Sai — jazz không sử dụng nhạc cụ dân tộc Việt Nam.",
     "Đúng — đây là nguồn gốc và đặc trưng chính xác của nhạc jazz.",
     "Sai — đó là mô tả gần với nhạc hợp xướng tôn giáo châu Âu, không phải jazz."
    ]
   },
   {
    "stem": "Nhạc Pop có cấu trúc điển hình như thế nào và vì sao dễ được đại chúng đón nhận?",
    "choices": [
     "Cấu trúc phức tạp gồm nhiều chương như một bản giao hưởng, đòi hỏi trình độ nghe cao",
     "Cấu trúc Verse – Chorus lặp lại, giai điệu dễ nhớ, thời lượng ngắn gọn, phù hợp thị hiếu số đông",
     "Không có cấu trúc cố định, hoàn toàn dựa vào ngẫu hứng như nhạc jazz",
     "Chỉ gồm duy nhất một đoạn điệp khúc lặp lại từ đầu đến cuối bài"
    ],
    "answer": 1,
    "explanation": "Pop thường có cấu trúc Verse – Chorus (– Bridge) lặp lại, giai điệu bắt tai, thời lượng ngắn (khoảng 3-4 phút), dễ tiếp cận số đông người nghe.",
    "choiceFeedback": [
     "Sai — đó là đặc điểm của nhạc giao hưởng cổ điển, không phải pop.",
     "Đúng — cấu trúc lặp và dễ nhớ chính là lý do pop phổ biến rộng rãi.",
     "Sai — pop có cấu trúc khá rõ ràng, không ngẫu hứng như jazz.",
     "Sai — pop thường có cả phiên khúc (verse) xen kẽ điệp khúc (chorus), không chỉ một đoạn duy nhất."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S9NT-exam-ck1": {
  "id": "S9NT-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Nghệ thuật 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Nghệ thuật 9",
  "questions": [
   {
    "stem": "Vòng hợp âm phổ biến nhất trong nhạc pop hiện đại (ví dụ C–G–Am–F) được ký hiệu theo bậc là gì?",
    "choices": [
     "I – ii – iii – IV",
     "I – V – vi – IV",
     "I – IV – V – I",
     "ii – iii – IV – V"
    ],
    "answer": 1,
    "explanation": "Vòng hợp âm I–V–vi–IV (ví dụ C–G–Am–F) là một trong những vòng hợp âm được dùng nhiều nhất trong nhạc pop hiện đại vì dễ nghe, dễ nhớ.",
    "choiceFeedback": [
     "Sai — vòng này không phải là vòng hợp âm pop kinh điển.",
     "Đúng — đây là vòng hợp âm pop rất phổ biến.",
     "Sai — đây gần với vòng hợp âm blues cơ bản hơn.",
     "Sai — vòng hợp âm này không phổ biến trong nhạc pop đại chúng."
    ]
   },
   {
    "stem": "Rock and Roll xuất hiện vào khoảng thời gian nào, ở đâu?",
    "choices": [
     "Thập niên 1920, tại Pháp",
     "Thập niên 1980, tại Nhật Bản",
     "Thập niên 1930, tại Anh",
     "Thập niên 1950, tại Mỹ"
    ],
    "answer": 3,
    "explanation": "Rock and Roll hình thành tại Mỹ vào thập niên 1950, kết hợp từ blues, country và rhythm & blues.",
    "choiceFeedback": [
     "Sai — thời điểm và địa điểm đều không đúng.",
     "Sai — đây là thời điểm EDM phát triển mạnh, không phải rock and roll.",
     "Sai — thời điểm quá sớm so với thực tế.",
     "Đúng — Rock and Roll ra đời tại Mỹ vào thập niên 1950."
    ]
   },
   {
    "stem": "Nhạc cụ cơ bản, không thể thiếu trong một ban nhạc rock truyền thống là?",
    "choices": [
     "Guitar điện, guitar bass và trống",
     "Đàn tranh, đàn bầu và sáo trúc",
     "Piano, violin và cello",
     "Kèn saxophone, trumpet và contrabass"
    ],
    "answer": 0,
    "explanation": "Ban nhạc rock truyền thống thường có bộ ba nhạc cụ nền tảng: guitar điện (giai điệu/hòa âm), guitar bass (âm trầm) và trống (nhịp điệu).",
    "choiceFeedback": [
     "Đúng — đây là bộ nhạc cụ nền tảng của rock.",
     "Sai — đây là nhạc cụ dân tộc Việt Nam, không phải nhạc cụ rock.",
     "Sai — đây là nhạc cụ điển hình của nhạc cổ điển thính phòng.",
     "Sai — đây là nhạc cụ điển hình của jazz."
    ]
   },
   {
    "stem": "Hip-hop ra đời vào thập niên nào, tại đâu?",
    "choices": [
     "Thập niên 1990, tại Los Angeles",
     "Thập niên 1960, tại Chicago",
     "Thập niên 1970, tại khu Bronx, New York",
     "Thập niên 1980, tại Atlanta"
    ],
    "answer": 2,
    "explanation": "Hip-hop hình thành từ cộng đồng người Mỹ gốc Phi và gốc Latin tại khu Bronx, thành phố New York, vào thập niên 1970.",
    "choiceFeedback": [
     "Sai — thời điểm và địa điểm đều muộn hơn thực tế.",
     "Sai — thời điểm quá sớm, hip-hop chưa hình thành lúc này.",
     "Đúng — đây chính là thời điểm và nơi ra đời của hip-hop.",
     "Sai — đây là nơi hip-hop phát triển mạnh sau này, không phải nơi khởi nguồn."
    ]
   },
   {
    "stem": "4 yếu tố cơ bản tạo nên văn hoá hip-hop là gì?",
    "choices": [
     "Hát, múa, vẽ tranh, làm phim",
     "MCing (rap), DJing, breakdance và graffiti",
     "Ca hát, chơi nhạc cụ, sáng tác, hoà âm",
     "Beatbox, freestyle, thời trang và ẩm thực"
    ],
    "answer": 1,
    "explanation": "Văn hoá hip-hop gồm 4 yếu tố cốt lõi: MCing (rap), DJing (phối nhạc/scratch), breakdance (nhảy) và graffiti (vẽ tranh tường).",
    "choiceFeedback": [
     "Sai — đây là các hoạt động nghệ thuật chung chung, không phải 4 yếu tố đặc trưng của hip-hop.",
     "Đúng — đây chính là 4 yếu tố cốt lõi của hip-hop.",
     "Sai — đây là các thành phần chung của âm nhạc, không riêng hip-hop.",
     "Sai — beatbox và freestyle là kỹ năng phụ trợ, không phải 1 trong 4 yếu tố cốt lõi."
    ]
   },
   {
    "stem": "\"Sample\" trong âm nhạc (hip-hop, điện tử...) có nghĩa là gì?",
    "choices": [
     "Bản thu âm demo trước khi phát hành chính thức",
     "Đoạn nhạc do ca sĩ tự sáng tác hoàn toàn mới",
     "Bản phối lại (remix) toàn bộ một bài hát",
     "Việc lấy một đoạn nhạc/âm thanh có sẵn từ bản ghi khác để đưa vào bài nhạc mới"
    ],
    "answer": 3,
    "explanation": "Sample là kỹ thuật lấy một đoạn âm thanh/nhạc từ bản ghi âm có trước, xử lý và đưa vào tác phẩm mới — rất phổ biến trong hip-hop và nhạc điện tử.",
    "choiceFeedback": [
     "Sai — đó là bản demo, không phải kỹ thuật sample.",
     "Sai — sample là dùng lại đoạn có sẵn, không phải sáng tác mới hoàn toàn.",
     "Sai — remix là phối lại toàn bộ bài hát, khác với việc lấy một đoạn sample.",
     "Đúng — đây chính là định nghĩa của kỹ thuật sample."
    ]
   },
   {
    "stem": "EDM là viết tắt của cụm từ nào?",
    "choices": [
     "Electronic Dance Music",
     "Extreme Digital Music",
     "Electric Dynamic Melody",
     "Ensemble Dance Movement"
    ],
    "answer": 0,
    "explanation": "EDM (Electronic Dance Music) là dòng nhạc điện tử dành cho khiêu vũ, sử dụng nhiều synthesizer và nhịp điệu mạnh.",
    "choiceFeedback": [
     "Đúng — EDM viết tắt của Electronic Dance Music.",
     "Sai — không phải cách viết tắt chính xác.",
     "Sai — không phải cách viết tắt chính xác.",
     "Sai — không phải cách viết tắt chính xác."
    ]
   },
   {
    "stem": "Nhã nhạc cung đình Huế được UNESCO công nhận là gì, vào năm nào?",
    "choices": [
     "Di sản thiên nhiên thế giới, năm 1993",
     "Ký ức thế giới, năm 2010",
     "Kiệt tác di sản văn hoá phi vật thể và truyền khẩu của nhân loại, năm 2003",
     "Di sản văn hoá phi vật thể cần bảo vệ khẩn cấp, năm 2009"
    ],
    "answer": 2,
    "explanation": "Nhã nhạc cung đình Huế được UNESCO công nhận là Kiệt tác di sản văn hoá phi vật thể và truyền khẩu của nhân loại vào năm 2003.",
    "choiceFeedback": [
     "Sai — đó là danh hiệu và năm dành cho Vịnh Hạ Long, không phải nhã nhạc.",
     "Sai — sai cả danh hiệu lẫn năm công nhận.",
     "Đúng — chính xác danh hiệu và năm UNESCO công nhận nhã nhạc Huế.",
     "Sai — danh hiệu và năm 2009 này thuộc về Ca trù, không phải Nhã nhạc Huế."
    ]
   },
   {
    "stem": "Kiến trúc Hy Lạp cổ đại có 3 thức cột cơ bản, đó là?",
    "choices": [
     "Roman, Gothic, Byzantine",
     "Doric, Ionic, Corinthian",
     "Baroque, Rococo, Neoclassic",
     "Ionic, Gothic, Doric"
    ],
    "answer": 1,
    "explanation": "Ba thức cột kinh điển của kiến trúc Hy Lạp cổ đại là Doric (giản dị), Ionic (thanh thoát, có cuộn xoắn) và Corinthian (cầu kỳ, hoa lá).",
    "choiceFeedback": [
     "Sai — đây là các phong cách kiến trúc thuộc thời kỳ/nền văn minh khác.",
     "Đúng — đây chính là ba thức cột cổ điển Hy Lạp.",
     "Sai — đây là các phong cách nghệ thuật châu Âu về sau, không phải thức cột Hy Lạp.",
     "Sai — Gothic không thuộc ba thức cột Hy Lạp cổ đại."
    ]
   },
   {
    "stem": "Đền Parthenon — công trình tiêu biểu của kiến trúc Hy Lạp cổ đại — toạ lạc ở đâu?",
    "choices": [
     "Rome, trên đồi Palatine",
     "Sparta, trung tâm thành bang",
     "Istanbul, bên bờ Bosphorus",
     "Athens, trên đồi Acropolis"
    ],
    "answer": 3,
    "explanation": "Đền Parthenon nằm trên đồi Acropolis ở thành phố Athens (Hy Lạp), thờ nữ thần Athena.",
    "choiceFeedback": [
     "Sai — đây là địa danh của La Mã cổ đại, không phải Hy Lạp.",
     "Sai — Sparta không phải nơi đặt đền Parthenon.",
     "Sai — đây là địa danh của Đế quốc Byzantine/Ottoman.",
     "Đúng — Parthenon toạ lạc trên đồi Acropolis tại Athens."
    ]
   },
   {
    "stem": "Thời kỳ Phục Hưng (Renaissance) khởi nguồn ở đâu, mang ý nghĩa gì?",
    "choices": [
     "Khởi nguồn tại Ý (thế kỷ 14), nghĩa là \"tái sinh\" các giá trị văn hoá cổ Hy Lạp – La Mã",
     "Khởi nguồn tại Pháp (thế kỷ 18), nghĩa là \"cách mạng\" trong hội hoạ",
     "Khởi nguồn tại Tây Ban Nha (thế kỷ 16), nghĩa là \"khai sáng\" tôn giáo",
     "Khởi nguồn tại Anh (thế kỷ 17), nghĩa là \"phục dựng\" kiến trúc Gothic"
    ],
    "answer": 0,
    "explanation": "Phục Hưng (Renaissance, nghĩa là \"tái sinh\") bắt đầu tại Ý vào thế kỷ 14, hồi sinh các giá trị nghệ thuật, tư tưởng cổ điển Hy Lạp – La Mã.",
    "choiceFeedback": [
     "Đúng — đây chính xác là nguồn gốc và ý nghĩa của Phục Hưng.",
     "Sai — sai cả nơi khởi nguồn, thời điểm và ý nghĩa tên gọi.",
     "Sai — Phục Hưng không liên quan đến phong trào Khai sáng tôn giáo Tây Ban Nha.",
     "Sai — Phục Hưng hồi sinh giá trị cổ điển Hy Lạp – La Mã, không phải phục dựng Gothic."
    ]
   },
   {
    "stem": "Bức tranh \"Mona Lisa\" là tác phẩm của hoạ sĩ nào?",
    "choices": [
     "Michelangelo",
     "Raphael",
     "Leonardo da Vinci",
     "Sandro Botticelli"
    ],
    "answer": 2,
    "explanation": "\"Mona Lisa\" là kiệt tác nổi tiếng của danh hoạ Leonardo da Vinci, hoàn thành trong thời kỳ Phục Hưng.",
    "choiceFeedback": [
     "Sai — Michelangelo nổi tiếng với tác phẩm điêu khắc và tranh trần nhà nguyện Sistine.",
     "Sai — Raphael là hoạ sĩ Phục Hưng khác, không phải tác giả Mona Lisa.",
     "Đúng — Leonardo da Vinci là tác giả của Mona Lisa.",
     "Sai — Botticelli nổi tiếng với tác phẩm \"Sự ra đời của thần Vệ Nữ\"."
    ]
   },
   {
    "stem": "Điểm khác biệt nổi bật giữa phong cách Baroque và Rococo là gì?",
    "choices": [
     "Baroque nhẹ nhàng, trang trí cầu kỳ; Rococo hoành tráng, kịch tính",
     "Baroque hoành tráng, kịch tính, tương phản sáng-tối mạnh phục vụ chủ đề tôn giáo/hoàng gia; Rococo nhẹ nhàng, trang trí tinh tế, chủ đề đời thường quý tộc",
     "Baroque chỉ vẽ phong cảnh; Rococo chỉ vẽ chân dung",
     "Cả hai phong cách hoàn toàn giống nhau, chỉ khác tên gọi theo quốc gia"
    ],
    "answer": 1,
    "explanation": "Baroque thiên về sự hoành tráng, kịch tính, tương phản sáng tối mạnh, phục vụ chủ đề tôn giáo/hoàng gia; Rococo nhẹ nhàng, trang trí tinh xảo, gắn với đời sống quý tộc.",
    "choiceFeedback": [
     "Sai — mô tả bị đảo ngược giữa hai phong cách.",
     "Đúng — đây là điểm khác biệt cốt lõi giữa Baroque và Rococo.",
     "Sai — cả hai phong cách đều vẽ nhiều đề tài khác nhau, không giới hạn như vậy.",
     "Sai — hai phong cách khác nhau rõ rệt về đặc trưng thẩm mỹ, không chỉ khác tên."
    ]
   },
   {
    "stem": "Vì sao hợp âm 7 (như C7, Cmaj7) được sử dụng rất phổ biến trong nhạc Jazz?",
    "choices": [
     "Vì hợp âm 7 dễ chơi hơn hợp âm ba trên mọi nhạc cụ",
     "Vì hợp âm 7 luôn phải đi kèm lời hát",
     "Vì hợp âm 7 chỉ dùng được với nhịp chậm",
     "Vì hợp âm 7 tạo màu sắc hoà âm phong phú, phức tạp hơn hợp âm ba, phù hợp với tính ngẫu hứng đặc trưng của jazz"
    ],
    "answer": 3,
    "explanation": "Hợp âm 7 mang nhiều màu sắc hòa âm và độ căng khác nhau, tạo không gian phong phú cho nghệ sĩ jazz ngẫu hứng (improvise) trên nền hợp âm.",
    "choiceFeedback": [
     "Sai — hợp âm 7 thực tế phức tạp hơn, không dễ chơi hơn hợp âm ba.",
     "Sai — hợp âm 7 vẫn được dùng nhiều trong nhạc không lời.",
     "Sai — hợp âm 7 được dùng ở mọi tốc độ, không riêng nhịp chậm.",
     "Đúng — màu sắc hòa âm phong phú của hợp âm 7 rất phù hợp với jazz."
    ]
   },
   {
    "stem": "Sắp xếp theo trình tự xuất hiện từ sớm đến muộn: (1) Phục Hưng, (2) Nhạc Baroque, (3) Rock and Roll, (4) Hip-hop.",
    "choices": [
     "Phục Hưng → Nhạc Baroque → Rock and Roll → Hip-hop",
     "Nhạc Baroque → Phục Hưng → Hip-hop → Rock and Roll",
     "Rock and Roll → Hip-hop → Phục Hưng → Nhạc Baroque",
     "Hip-hop → Rock and Roll → Nhạc Baroque → Phục Hưng"
    ],
    "answer": 0,
    "explanation": "Trình tự đúng theo mốc lịch sử: Phục Hưng (TK14–16) → Baroque (TK17–giữa TK18) → Rock and Roll (thập niên 1950) → Hip-hop (thập niên 1970).",
    "choiceFeedback": [
     "Đúng — đây là trình tự lịch sử chính xác.",
     "Sai — Phục Hưng có trước Baroque, và Rock and Roll có trước Hip-hop.",
     "Sai — thứ tự bị đảo ngược hoàn toàn so với mốc lịch sử thật.",
     "Sai — thứ tự bị đảo ngược hoàn toàn so với mốc lịch sử thật."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S9NT-exam-gk2": {
  "id": "S9NT-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Nghệ thuật 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Nghệ thuật 9",
  "questions": [
   {
    "stem": "Trường phái Ấn tượng (Impressionism) xuất hiện vào khoảng thời gian nào, ở đâu?",
    "choices": [
     "Đầu thế kỷ 18, tại Đức",
     "Thế kỷ 16, tại Ý",
     "Cuối thế kỷ 19 (khoảng thập niên 1870), tại Pháp",
     "Giữa thế kỷ 20, tại Mỹ"
    ],
    "answer": 2,
    "explanation": "Trường phái Ấn tượng hình thành tại Pháp vào khoảng thập niên 1870, khởi đầu bởi nhóm hoạ sĩ như Monet, Renoir, Degas.",
    "choiceFeedback": [
     "Sai — sai cả thời điểm và địa điểm.",
     "Sai — thời điểm quá sớm, đây là thời kỳ Phục Hưng muộn/Baroque.",
     "Đúng — Ấn tượng xuất hiện tại Pháp vào cuối thế kỷ 19.",
     "Sai — đây là thời điểm gần với Pop Art, không phải Ấn tượng."
    ]
   },
   {
    "stem": "Đặc trưng nổi bật của trường phái Ấn tượng là gì?",
    "choices": [
     "Vẽ ngoài trời (plein air), chú trọng ghi lại ánh sáng và màu sắc biến đổi theo khoảnh khắc, nét cọ rời rạc",
     "Vẽ hoàn toàn trong xưởng, tuân thủ nghiêm ngặt tỉ lệ giải phẫu cổ điển",
     "Chỉ sử dụng hai màu đen trắng, không dùng màu sắc",
     "Miêu tả chi tiết tỉ mỉ như ảnh chụp, không có nét cọ có thể nhìn thấy"
    ],
    "answer": 0,
    "explanation": "Hoạ sĩ Ấn tượng thường vẽ trực tiếp ngoài trời, tập trung ghi lại hiệu ứng ánh sáng và màu sắc tại một khoảnh khắc, với nét cọ nhanh, rời rạc.",
    "choiceFeedback": [
     "Đúng — đây chính là đặc trưng cốt lõi của trường phái Ấn tượng.",
     "Sai — đó là đặc điểm gần với hội hoạ hàn lâm cổ điển, trái ngược với Ấn tượng.",
     "Sai — Ấn tượng sử dụng màu sắc rất phong phú, sống động.",
     "Sai — đó là phong cách tả thực chi tiết, ngược lại với nét cọ rời rạc của Ấn tượng."
    ]
   },
   {
    "stem": "Hoạ sĩ nào được xem là gương mặt tiêu biểu của trường phái Ấn tượng?",
    "choices": [
     "Pablo Picasso",
     "Claude Monet",
     "Salvador Dalí",
     "Andy Warhol"
    ],
    "answer": 1,
    "explanation": "Claude Monet là hoạ sĩ tiêu biểu và có ảnh hưởng lớn nhất của trường phái Ấn tượng.",
    "choiceFeedback": [
     "Sai — Picasso là đại diện của trường phái Lập thể.",
     "Đúng — Claude Monet là gương mặt tiêu biểu của Ấn tượng.",
     "Sai — Dalí là đại diện của trường phái Siêu thực.",
     "Sai — Warhol là đại diện của Pop Art."
    ]
   },
   {
    "stem": "Bức tranh \"Impression, Sunrise\" — tác phẩm đặt tên cho cả trường phái Ấn tượng — là của ai?",
    "choices": [
     "Vincent van Gogh",
     "Paul Cézanne",
     "Edgar Degas",
     "Claude Monet"
    ],
    "answer": 3,
    "explanation": "\"Impression, Sunrise\" (1872) của Claude Monet chính là tác phẩm mà giới phê bình dựa vào để đặt tên cho trường phái Ấn tượng.",
    "choiceFeedback": [
     "Sai — Van Gogh là đại diện của Hậu Ấn tượng, không phải tác giả bức tranh này.",
     "Sai — Cézanne cũng thuộc Hậu Ấn tượng, không phải tác giả bức tranh này.",
     "Sai — Degas là hoạ sĩ Ấn tượng nhưng không phải tác giả bức tranh này.",
     "Đúng — Claude Monet là tác giả của bức tranh mang tính bước ngoặt này."
    ]
   },
   {
    "stem": "Trường phái Hậu Ấn tượng (Post-Impressionism) khác trường phái Ấn tượng ở điểm nào?",
    "choices": [
     "Hậu Ấn tượng ra đời trước Ấn tượng",
     "Hậu Ấn tượng chỉ vẽ tranh đen trắng",
     "Hậu Ấn tượng nhấn mạnh cảm xúc cá nhân và cấu trúc hình khối hơn là chỉ ghi lại ánh sáng khoảnh khắc (tiêu biểu: Van Gogh, Cézanne)",
     "Hậu Ấn tượng không sử dụng màu sắc"
    ],
    "answer": 2,
    "explanation": "Hậu Ấn tượng phát triển sau Ấn tượng, giữ lại việc dùng màu sắc mạnh nhưng chú trọng biểu đạt cảm xúc và cấu trúc hình khối hơn là chỉ ghi lại ánh sáng tức thời.",
    "choiceFeedback": [
     "Sai — Hậu Ấn tượng ra đời sau, không phải trước Ấn tượng.",
     "Sai — Hậu Ấn tượng vẫn sử dụng màu sắc rất mạnh mẽ.",
     "Đúng — đây là điểm khác biệt chính giữa hai trường phái.",
     "Sai — Hậu Ấn tượng nổi bật với việc sử dụng màu sắc táo bạo, biểu cảm."
    ]
   },
   {
    "stem": "Trường phái Lập thể (Cubism) do những hoạ sĩ nào sáng lập?",
    "choices": [
     "Pablo Picasso và Georges Braque",
     "Leonardo da Vinci và Michelangelo",
     "Claude Monet và Auguste Renoir",
     "Salvador Dalí và René Magritte"
    ],
    "answer": 0,
    "explanation": "Pablo Picasso và Georges Braque là hai hoạ sĩ tiên phong sáng lập trường phái Lập thể (Cubism) vào đầu thế kỷ 20.",
    "choiceFeedback": [
     "Đúng — đây chính là hai hoạ sĩ sáng lập Lập thể.",
     "Sai — hai hoạ sĩ này thuộc thời kỳ Phục Hưng, cách xa hàng thế kỷ.",
     "Sai — hai hoạ sĩ này là đại diện của trường phái Ấn tượng.",
     "Sai — hai hoạ sĩ này là đại diện của trường phái Siêu thực."
    ]
   },
   {
    "stem": "Đặc trưng của trường phái Lập thể (Cubism) là gì?",
    "choices": [
     "Vẽ hiện thực chi tiết, đúng tỉ lệ giải phẫu",
     "Phân giải vật thể thành các mặt phẳng hình học, thể hiện đồng thời nhiều góc nhìn khác nhau",
     "Chỉ sử dụng đường nét mềm mại, không có góc cạnh",
     "Tái hiện chính xác ánh sáng tự nhiên ngoài trời"
    ],
    "answer": 1,
    "explanation": "Lập thể phá vỡ cách nhìn phối cảnh truyền thống, phân giải hình khối vật thể thành các mặt phẳng hình học và trình bày nhiều góc nhìn cùng lúc trên một mặt tranh.",
    "choiceFeedback": [
     "Sai — Lập thể chủ động phá vỡ hiện thực và tỉ lệ giải phẫu thông thường.",
     "Đúng — đây chính là đặc trưng cốt lõi của Cubism.",
     "Sai — Lập thể đặc trưng bởi các mặt phẳng, góc cạnh hình học, không phải nét mềm mại.",
     "Sai — đó là đặc trưng của trường phái Ấn tượng, không phải Lập thể."
    ]
   },
   {
    "stem": "Bức tranh \"Les Demoiselles d'Avignon\" — tác phẩm đánh dấu bước khởi đầu của Lập thể — là của ai?",
    "choices": [
     "Georges Braque",
     "Henri Matisse",
     "Joan Miró",
     "Pablo Picasso"
    ],
    "answer": 3,
    "explanation": "\"Les Demoiselles d'Avignon\" (1907) do Pablo Picasso vẽ, được xem là tác phẩm mở đường cho trường phái Lập thể.",
    "choiceFeedback": [
     "Sai — Braque là người cùng sáng lập Lập thể nhưng không phải tác giả bức tranh này.",
     "Sai — Matisse là đại diện của trường phái Dã thú (Fauvism).",
     "Sai — Miró là đại diện của trường phái Siêu thực.",
     "Đúng — Picasso chính là tác giả của bức tranh mang tính bước ngoặt này."
    ]
   },
   {
    "stem": "Bức \"Sự kiên trì của ký ức\" (nổi tiếng với hình ảnh những chiếc đồng hồ chảy) — biểu tượng của trường phái Siêu thực — là tác phẩm của ai?",
    "choices": [
     "René Magritte",
     "Max Ernst",
     "Salvador Dalí",
     "Joan Miró"
    ],
    "answer": 2,
    "explanation": "\"Sự kiên trì của ký ức\" (The Persistence of Memory, 1931) là tác phẩm nổi tiếng của Salvador Dalí, biểu tượng của trường phái Siêu thực.",
    "choiceFeedback": [
     "Sai — Magritte là hoạ sĩ Siêu thực khác, nổi tiếng với \"Con người đội mũ quả dưa\".",
     "Sai — Ernst là hoạ sĩ Siêu thực nhưng không phải tác giả bức tranh này.",
     "Đúng — Salvador Dalí là tác giả của bức tranh này.",
     "Sai — Miró là hoạ sĩ Siêu thực nhưng theo phong cách trừu tượng khác."
    ]
   },
   {
    "stem": "Pop Art xuất hiện vào giữa thế kỷ 20, chủ yếu lấy cảm hứng từ đâu?",
    "choices": [
     "Văn hoá đại chúng, quảng cáo, truyện tranh và các sản phẩm tiêu dùng hàng ngày",
     "Thần thoại Hy Lạp – La Mã cổ đại",
     "Kinh Thánh và các chủ đề tôn giáo",
     "Phong cảnh thiên nhiên hoang sơ"
    ],
    "answer": 0,
    "explanation": "Pop Art khai thác hình ảnh quen thuộc từ văn hoá đại chúng: quảng cáo, truyện tranh, sản phẩm tiêu dùng, người nổi tiếng.",
    "choiceFeedback": [
     "Đúng — đây chính là nguồn cảm hứng đặc trưng của Pop Art.",
     "Sai — đó là đề tài quen thuộc của mỹ thuật cổ điển Hy Lạp – La Mã, không phải Pop Art.",
     "Sai — đó là đề tài phổ biến trong nghệ thuật thời Trung cổ/Phục Hưng.",
     "Sai — đó là đề tài quen thuộc của tranh phong cảnh, không phải trọng tâm Pop Art."
    ]
   },
   {
    "stem": "Andy Warhol — đại diện tiêu biểu của Pop Art — được biết đến nhiều nhất với loạt tác phẩm nào?",
    "choices": [
     "Chân dung các vị vua châu Âu vẽ bằng sơn dầu cổ điển",
     "Tranh in lụa lon súp Campbell's và chân dung Marilyn Monroe",
     "Tranh phong cảnh làng quê Việt Nam",
     "Tượng điêu khắc bằng đá cẩm thạch theo phong cách Hy Lạp"
    ],
    "answer": 1,
    "explanation": "Andy Warhol nổi tiếng với kỹ thuật in lụa (silkscreen), tiêu biểu là loạt tranh lon súp Campbell's và chân dung Marilyn Monroe.",
    "choiceFeedback": [
     "Sai — đây là đề tài của hội hoạ cung đình châu Âu, không phải phong cách Warhol.",
     "Đúng — đây chính là những tác phẩm làm nên tên tuổi Andy Warhol.",
     "Sai — đây không phải đề tài hay phong cách của Warhol.",
     "Sai — đây là phong cách điêu khắc Hy Lạp cổ đại, không phải Pop Art."
    ]
   },
   {
    "stem": "Trường Cao đẳng Mỹ thuật Đông Dương được thành lập vào năm nào, tại đâu?",
    "choices": [
     "Năm 1945, tại Sài Gòn",
     "Năm 1954, tại Huế",
     "Năm 1930, tại Hải Phòng",
     "Năm 1925, tại Hà Nội"
    ],
    "answer": 3,
    "explanation": "Trường Cao đẳng Mỹ thuật Đông Dương được thành lập năm 1925 tại Hà Nội, do hoạ sĩ Victor Tardieu sáng lập.",
    "choiceFeedback": [
     "Sai — sai cả năm thành lập và địa điểm.",
     "Sai — sai cả năm thành lập và địa điểm.",
     "Sai — sai cả năm thành lập và địa điểm.",
     "Đúng — trường được thành lập năm 1925 tại Hà Nội."
    ]
   },
   {
    "stem": "Hoạ sĩ Bùi Xuân Phái (thuộc bộ tứ \"Nghiêm – Liên – Sáng – Phái\") nổi tiếng nhất với đề tài nào?",
    "choices": [
     "Tranh sơn mài về đề tài chiến tranh cách mạng",
     "Tranh lụa về thiếu nữ Việt Nam",
     "Tranh phố cổ Hà Nội (thường gọi là \"Phố Phái\")",
     "Tranh tĩnh vật hoa quả theo phong cách phương Tây"
    ],
    "answer": 2,
    "explanation": "Bùi Xuân Phái nổi tiếng với những bức tranh vẽ phố cổ Hà Nội, được người yêu nghệ thuật gọi thân mật là \"Phố Phái\".",
    "choiceFeedback": [
     "Sai — đây không phải đề tài đặc trưng gắn liền với tên tuổi ông.",
     "Sai — đề tài này gần với hoạ sĩ Tô Ngọc Vân (tranh \"Thiếu nữ bên hoa huệ\").",
     "Đúng — \"Phố Phái\" chính là đề tài làm nên tên tuổi Bùi Xuân Phái.",
     "Sai — đây không phải đề tài đặc trưng của ông."
    ]
   },
   {
    "stem": "Điểm khác biệt cốt lõi trong cách \"phá vỡ\" lối vẽ hiện thực truyền thống giữa trường phái Ấn tượng và Lập thể là gì?",
    "choices": [
     "Ấn tượng phá vỡ bằng cách ưu tiên ghi lại ánh sáng/màu sắc tức thời thay vì chi tiết chính xác; Lập thể phá vỡ bằng cách phân giải hình thể thành các mặt hình học, thể hiện đa góc nhìn",
     "Cả hai đều phá vỡ hiện thực theo cùng một cách là bỏ hoàn toàn màu sắc",
     "Ấn tượng vẽ trừu tượng hoàn toàn, không có hình ảnh cụ thể nào",
     "Lập thể chỉ thay đổi kích thước tranh, không thay đổi cách thể hiện hình khối"
    ],
    "answer": 0,
    "explanation": "Ấn tượng ưu tiên cảm nhận ánh sáng/màu sắc thoáng qua hơn là độ chính xác chi tiết; Lập thể lại phân rã hình thể thành mặt phẳng hình học và trình bày đồng thời nhiều góc nhìn — hai cách phá vỡ hiện thực hoàn toàn khác nhau.",
    "choiceFeedback": [
     "Đúng — đây là cách phân biệt chính xác bản chất cách tân của hai trường phái.",
     "Sai — cả hai trường phái đều sử dụng màu sắc rất phong phú, không loại bỏ màu.",
     "Sai — Ấn tượng vẫn vẽ hình ảnh cụ thể (phong cảnh, con người), chỉ khác cách thể hiện ánh sáng.",
     "Sai — Lập thể thay đổi hẳn cách dựng hình khối, không chỉ là vấn đề kích thước tranh."
    ]
   },
   {
    "stem": "Khi vẽ chân dung, tỉ lệ khuôn mặt cơ bản thường được chia dọc thành ba phần bằng nhau theo các mốc nào?",
    "choices": [
     "Đỉnh đầu – hai mắt – cằm",
     "Trán (chân tóc – chân mày) – từ chân mày đến đáy mũi – từ đáy mũi đến cằm",
     "Hai tai – sống mũi – miệng",
     "Đỉnh đầu – cổ – vai"
    ],
    "answer": 1,
    "explanation": "Quy tắc tỉ lệ cơ bản chia khuôn mặt thành ba phần dọc gần bằng nhau: từ chân tóc đến chân mày, từ chân mày đến đáy mũi, và từ đáy mũi đến cằm.",
    "choiceFeedback": [
     "Sai — đây không phải ba mốc chia tỉ lệ khuôn mặt chuẩn.",
     "Đúng — đây chính là quy tắc chia ba phần khuôn mặt cơ bản khi vẽ chân dung.",
     "Sai — đây là các bộ phận nằm ngang, không dùng để chia tỉ lệ dọc khuôn mặt.",
     "Sai — đây là tỉ lệ toàn thân, không phải tỉ lệ riêng khuôn mặt."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S9NT-exam-ck2": {
  "id": "S9NT-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Nghệ thuật 9",
  "kind": "quiz",
  "yearLevel": 9,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Nghệ thuật 9",
  "questions": [
   {
    "stem": "Nghệ thuật đương đại (contemporary art) được hiểu là gì?",
    "choices": [
     "Chỉ những tác phẩm hội hoạ sơn dầu vẽ theo phong cách cổ điển",
     "Nghệ thuật chỉ tồn tại trước thế kỷ 19",
     "Nghệ thuật chỉ giới hạn trong tranh và tượng truyền thống",
     "Nghệ thuật từ cuối thế kỷ 20 đến nay, đa dạng về hình thức thể hiện và coi trọng ý tưởng của tác giả"
    ],
    "answer": 3,
    "explanation": "Nghệ thuật đương đại là nghệ thuật được sáng tác từ cuối thế kỷ 20 đến hiện tại, không giới hạn chất liệu hay hình thức, đặt trọng tâm vào ý tưởng và thông điệp.",
    "choiceFeedback": [
     "Sai — nghệ thuật đương đại không giới hạn ở tranh sơn dầu cổ điển.",
     "Sai — ngược lại, nghệ thuật đương đại là giai đoạn gần đây nhất, đang tiếp diễn.",
     "Sai — nghệ thuật đương đại còn bao gồm sắp đặt, trình diễn, kỹ thuật số...",
     "Đúng — đây là cách hiểu đúng về nghệ thuật đương đại."
    ]
   },
   {
    "stem": "Installation art (nghệ thuật sắp đặt) có đặc điểm gì?",
    "choices": [
     "Chỉ là một bức tranh treo tường đơn lẻ",
     "Tác phẩm được bố trí, sắp xếp trong một không gian ba chiều cụ thể, người xem có thể đi vào và trải nghiệm xung quanh",
     "Chỉ tồn tại dưới dạng bản nhạc thu âm",
     "Là một buổi biểu diễn sân khấu có kịch bản cố định, lặp lại y hệt mỗi lần diễn"
    ],
    "answer": 1,
    "explanation": "Nghệ thuật sắp đặt xây dựng một không gian ba chiều bằng nhiều vật liệu/đối tượng khác nhau, mời người xem bước vào và trải nghiệm trực tiếp.",
    "choiceFeedback": [
     "Sai — đó là hội hoạ truyền thống, không phải sắp đặt.",
     "Đúng — đây chính là đặc điểm của nghệ thuật sắp đặt.",
     "Sai — đó là âm nhạc, không phải nghệ thuật thị giác sắp đặt.",
     "Sai — đó gần với mô tả của nghệ thuật sân khấu truyền thống, không phải sắp đặt."
    ]
   },
   {
    "stem": "Performance art (nghệ thuật trình diễn) đặc trưng bởi điều gì?",
    "choices": [
     "Hành động trực tiếp của nghệ sĩ diễn ra theo thời gian thực trước khán giả, bản thân hành động chính là tác phẩm",
     "Một bức tượng đá được đặt cố định trong bảo tàng",
     "Một bản vẽ phác thảo bằng bút chì trên giấy",
     "Một đoạn phim hoạt hình được dựng sẵn, không có yếu tố trực tiếp"
    ],
    "answer": 0,
    "explanation": "Performance art lấy chính hành động, cơ thể của nghệ sĩ diễn ra trực tiếp, theo thời gian thực trước khán giả làm tác phẩm nghệ thuật.",
    "choiceFeedback": [
     "Đúng — đây chính là bản chất của nghệ thuật trình diễn.",
     "Sai — đó là điêu khắc tĩnh, không có yếu tố trình diễn trực tiếp.",
     "Sai — đó là hội hoạ/phác thảo, không phải trình diễn.",
     "Sai — đó là tác phẩm dựng sẵn, thiếu yếu tố \"trực tiếp\" đặc trưng của performance art."
    ]
   },
   {
    "stem": "Trong thiết kế đồ hoạ, \"Typography\" là gì?",
    "choices": [
     "Kỹ thuật chụp ảnh phong cảnh",
     "Phần mềm chỉnh sửa video",
     "Nghệ thuật lựa chọn và sắp xếp kiểu chữ (font, cỡ chữ, khoảng cách...) để truyền tải thông điệp và tạo hiệu quả thẩm mỹ",
     "Cách pha trộn màu sắc trên vòng thuần sắc"
    ],
    "answer": 2,
    "explanation": "Typography là nghệ thuật và kỹ thuật lựa chọn, sắp xếp kiểu chữ sao cho vừa dễ đọc, vừa truyền tải đúng thông điệp và tạo hiệu ứng thẩm mỹ.",
    "choiceFeedback": [
     "Sai — đó là nhiếp ảnh, không liên quan đến chữ.",
     "Sai — đó là công cụ dựng phim, không phải khái niệm về chữ.",
     "Đúng — đây chính là định nghĩa của Typography.",
     "Sai — đó là lý thuyết màu sắc, khác với Typography (chữ)."
    ]
   },
   {
    "stem": "Phối màu bổ túc (complementary) là cách phối màu như thế nào?",
    "choices": [
     "Chỉ dùng một màu duy nhất với các sắc độ đậm nhạt khác nhau",
     "Kết hợp các màu nằm cạnh nhau, gần nhau trên vòng thuần sắc",
     "Chỉ sử dụng hai màu đen và trắng",
     "Kết hợp hai màu đối diện nhau trên vòng thuần sắc, tạo hiệu ứng tương phản mạnh, nổi bật"
    ],
    "answer": 3,
    "explanation": "Phối màu bổ túc ghép hai màu ở vị trí đối diện nhau trên vòng thuần sắc (ví dụ đỏ - lục, cam - lam), tạo độ tương phản cao, thu hút thị giác.",
    "choiceFeedback": [
     "Sai — đó là phối màu đơn sắc (monochromatic).",
     "Sai — đó là phối màu tương đồng (analogous).",
     "Sai — đó là phối màu trung tính, không phải bổ túc.",
     "Đúng — đây chính là định nghĩa phối màu bổ túc."
    ]
   },
   {
    "stem": "Nhạc phim (film score) có vai trò chủ yếu nào trong một bộ phim?",
    "choices": [
     "Chỉ để lấp khoảng lặng khi không có lời thoại",
     "Tăng cường cảm xúc, dẫn dắt và nhấn mạnh diễn biến của câu chuyện",
     "Thay thế hoàn toàn lời thoại của diễn viên",
     "Chỉ xuất hiện ở phần giới thiệu đầu phim (credit mở đầu)"
    ],
    "answer": 1,
    "explanation": "Nhạc phim đóng vai trò quan trọng trong việc gợi cảm xúc, tạo không khí và dẫn dắt người xem theo mạch truyện.",
    "choiceFeedback": [
     "Sai — vai trò của nhạc phim lớn hơn nhiều so với việc chỉ lấp khoảng lặng.",
     "Đúng — đây chính là vai trò cốt lõi của nhạc phim.",
     "Sai — nhạc phim bổ trợ chứ không thay thế lời thoại.",
     "Sai — nhạc phim xuất hiện xuyên suốt bộ phim, không chỉ ở phần mở đầu."
    ]
   },
   {
    "stem": "Hans Zimmer được biết đến rộng rãi với vai trò gì?",
    "choices": [
     "Nhà soạn nhạc phim nổi tiếng (Inception, Interstellar...)",
     "Hoạ sĩ trường phái Lập thể",
     "DJ tiên phong của dòng nhạc EDM",
     "Kiến trúc sư thời kỳ Phục Hưng"
    ],
    "answer": 0,
    "explanation": "Hans Zimmer là nhà soạn nhạc phim nổi tiếng thế giới, với các tác phẩm tiêu biểu cho phim Inception, Interstellar, The Dark Knight...",
    "choiceFeedback": [
     "Đúng — Hans Zimmer nổi tiếng với vai trò nhà soạn nhạc phim.",
     "Sai — ông không phải hoạ sĩ, và không thuộc trường phái Lập thể.",
     "Sai — ông sáng tác nhạc phim, không phải DJ nhạc EDM.",
     "Sai — ông là nhạc sĩ đương đại, không liên quan đến kiến trúc Phục Hưng."
    ]
   },
   {
    "stem": "Generative art (nghệ thuật tạo sinh) là gì?",
    "choices": [
     "Tác phẩm được vẽ tay hoàn toàn, không dùng máy móc hay công cụ hỗ trợ nào",
     "Một thể loại nhạc điện tử có nhịp độ nhanh",
     "Tác phẩm nghệ thuật được tạo ra một phần hoặc toàn bộ nhờ thuật toán/hệ thống tự động (có thể có sự can thiệp của AI)",
     "Kỹ thuật khắc gỗ truyền thống của Việt Nam"
    ],
    "answer": 2,
    "explanation": "Generative art là hình thức nghệ thuật trong đó tác phẩm được sinh ra một phần hay toàn bộ thông qua thuật toán, hệ thống quy tắc hoặc AI.",
    "choiceFeedback": [
     "Sai — ngược lại, generative art dựa vào thuật toán/hệ thống tự động.",
     "Sai — đó là mô tả một thể loại âm nhạc, không phải nghệ thuật thị giác tạo sinh.",
     "Đúng — đây chính là định nghĩa của generative art.",
     "Sai — đó là kỹ thuật thủ công truyền thống, không liên quan đến thuật toán."
    ]
   },
   {
    "stem": "Vấn đề đạo đức thường gây tranh cãi nhất đối với AI art (nghệ thuật do AI tạo ra) là gì?",
    "choices": [
     "AI vẽ tranh quá chậm so với con người",
     "AI chỉ tạo được tranh đen trắng",
     "AI art luôn đắt hơn tranh vẽ tay",
     "Bản quyền của dữ liệu/tác phẩm gốc dùng để huấn luyện AI và tính nguyên bản của sản phẩm đầu ra"
    ],
    "answer": 3,
    "explanation": "Tranh cãi đạo đức lớn nhất xoay quanh việc AI được huấn luyện trên dữ liệu tác phẩm có bản quyền của các nghệ sĩ khác, cùng câu hỏi về tính nguyên bản/sáng tạo thực sự của sản phẩm AI tạo ra.",
    "choiceFeedback": [
     "Sai — thực tế AI thường tạo ảnh rất nhanh, đây không phải vấn đề đạo đức.",
     "Sai — AI có thể tạo tranh màu sắc đa dạng, đây không phải vấn đề đạo đức.",
     "Sai — giá cả không phải là vấn đề đạo đức trọng tâm được tranh luận.",
     "Đúng — đây là vấn đề đạo đức trung tâm của AI art hiện nay."
    ]
   },
   {
    "stem": "Nghệ thuật cộng đồng (community art) hướng đến mục tiêu chủ yếu nào?",
    "choices": [
     "Chỉ phục vụ mục đích thương mại, bán tác phẩm với giá cao",
     "Gắn kết cộng đồng, phản ánh tiếng nói và bản sắc địa phương thông qua các hoạt động sáng tạo tập thể",
     "Chỉ được thực hiện bởi một nghệ sĩ duy nhất, không có sự tham gia của người dân",
     "Loại bỏ hoàn toàn yếu tố truyền thống, chỉ dùng công nghệ hiện đại"
    ],
    "answer": 1,
    "explanation": "Nghệ thuật cộng đồng đề cao sự tham gia của người dân địa phương, nhằm gắn kết cộng đồng và phản ánh bản sắc, câu chuyện của chính họ.",
    "choiceFeedback": [
     "Sai — mục tiêu chính không phải thương mại mà là gắn kết cộng đồng.",
     "Đúng — đây chính là mục tiêu cốt lõi của nghệ thuật cộng đồng.",
     "Sai — ngược lại, đặc trưng của nghệ thuật cộng đồng là có sự tham gia rộng rãi của người dân.",
     "Sai — nghệ thuật cộng đồng có thể kết hợp cả yếu tố truyền thống lẫn hiện đại."
    ]
   },
   {
    "stem": "Vòng hợp âm I – V – vi – IV (ví dụ C–G–Am–F) được sử dụng rất phổ biến trong thể loại nhạc nào?",
    "choices": [
     "Nhạc Pop",
     "Nhã nhạc cung đình Huế",
     "Nhạc giao hưởng cổ điển Baroque",
     "Ca trù"
    ],
    "answer": 0,
    "explanation": "Vòng hợp âm I–V–vi–IV là một trong những vòng hợp âm được sử dụng phổ biến nhất trong nhạc Pop hiện đại nhờ giai điệu dễ nghe, dễ nhớ.",
    "choiceFeedback": [
     "Đúng — đây là vòng hợp âm rất phổ biến trong nhạc Pop.",
     "Sai — Nhã nhạc cung đình Huế sử dụng hệ thống thang âm và nhạc cụ truyền thống, không theo hoà âm chức năng phương Tây kiểu này.",
     "Sai — nhạc Baroque có hệ hoà âm phức tạp riêng, không đặc trưng bởi vòng hợp âm pop này.",
     "Sai — Ca trù là loại hình nghệ thuật cổ truyền, không sử dụng hệ hợp âm phương Tây."
    ]
   },
   {
    "stem": "Trường phái hội hoạ nào phân giải vật thể thành các mặt phẳng hình học và thể hiện nhiều góc nhìn cùng lúc trên một tác phẩm?",
    "choices": [
     "Ấn tượng (Impressionism)",
     "Phục Hưng (Renaissance)",
     "Lập thể (Cubism)",
     "Pop Art"
    ],
    "answer": 2,
    "explanation": "Đây là đặc trưng cốt lõi của trường phái Lập thể (Cubism), do Picasso và Braque khởi xướng.",
    "choiceFeedback": [
     "Sai — Ấn tượng tập trung vào ánh sáng và màu sắc, không phân giải hình khối.",
     "Sai — Phục Hưng đề cao phối cảnh và giải phẫu chính xác, ngược lại với Lập thể.",
     "Đúng — đây chính là đặc trưng của Lập thể.",
     "Sai — Pop Art lấy cảm hứng từ văn hoá đại chúng, không đặc trưng bởi phân giải hình khối."
    ]
   },
   {
    "stem": "Vì sao có thể nói nghệ thuật đương đại (installation, performance, conceptual art...) đã mở rộng ranh giới khái niệm \"tác phẩm nghệ thuật\" so với hội hoạ/điêu khắc truyền thống?",
    "choices": [
     "Vì nghệ thuật đương đại chỉ dùng đúng một chất liệu là sơn dầu",
     "Vì nghệ thuật đương đại bắt buộc phải trưng bày trong bảo tàng cổ điển",
     "Vì nghệ thuật đương đại loại bỏ hoàn toàn yếu tố thị giác",
     "Vì nó không còn giới hạn ở vật thể tĩnh trên khung tranh hay bệ tượng, mà mở rộng sang không gian, hành động, ý tưởng, thời gian và sự tương tác với người xem"
    ],
    "answer": 3,
    "explanation": "Nghệ thuật đương đại mở rộng khái niệm tác phẩm ra khỏi vật thể tĩnh truyền thống, bao gồm cả không gian (sắp đặt), hành động - thời gian (trình diễn) và ý tưởng (conceptual art), thường mời gọi sự tương tác của người xem.",
    "choiceFeedback": [
     "Sai — ngược lại, nghệ thuật đương đại sử dụng rất đa dạng chất liệu, không giới hạn ở sơn dầu.",
     "Sai — nghệ thuật đương đại có thể trưng bày ở nhiều không gian khác nhau, không bắt buộc bảo tàng cổ điển.",
     "Sai — nhiều loại hình đương đại (sắp đặt, trình diễn) vẫn giàu yếu tố thị giác.",
     "Đúng — đây là lý do chính xác giải thích sự mở rộng ranh giới khái niệm tác phẩm nghệ thuật."
    ]
   },
   {
    "stem": "Một dự án nghệ thuật cá nhân cuối năm nên được thực hiện theo quy trình hợp lý nào?",
    "choices": [
     "Hoàn thiện tác phẩm ngay lập tức mà không cần phác thảo hay thử nghiệm trước",
     "Xác định ý tưởng/chủ đề → phác thảo và thử nghiệm chất liệu → hoàn thiện tác phẩm → trình bày và tự đánh giá, rút kinh nghiệm",
     "Chỉ cần sao chép lại một tác phẩm có sẵn của người khác",
     "Bỏ qua bước trình bày, chỉ cần nộp sản phẩm cuối cùng"
    ],
    "answer": 1,
    "explanation": "Quy trình sáng tạo hợp lý gồm các bước: hình thành ý tưởng, phác thảo/thử nghiệm, hoàn thiện tác phẩm, và cuối cùng là trình bày, tự đánh giá để rút kinh nghiệm.",
    "choiceFeedback": [
     "Sai — bỏ qua bước phác thảo, thử nghiệm dễ khiến tác phẩm thiếu chỉn chu.",
     "Đúng — đây là quy trình hợp lý cho một dự án sáng tạo.",
     "Sai — sao chép tác phẩm người khác không thể hiện được năng lực sáng tạo cá nhân.",
     "Sai — trình bày và tự đánh giá là bước quan trọng giúp học sinh nhìn lại quá trình sáng tạo."
    ]
   },
   {
    "stem": "Để theo đuổi các ngành nghề liên quan đến nghệ thuật (thiết kế, biểu diễn, sáng tác...), bên cạnh năng khiếu, học sinh cần trang bị thêm điều gì?",
    "choices": [
     "Kiến thức nền tảng vững chắc (nhạc lý/mỹ thuật cơ bản), kỹ năng thực hành thường xuyên, tư duy sáng tạo và khả năng cập nhật xu hướng - công nghệ mới",
     "Chỉ cần năng khiếu bẩm sinh, không cần học thêm kiến thức hay rèn luyện kỹ năng",
     "Chỉ cần ghi nhớ thật nhiều tên tác phẩm và tác giả nổi tiếng",
     "Tránh xa công nghệ, chỉ nên làm việc hoàn toàn thủ công truyền thống"
    ],
    "answer": 0,
    "explanation": "Theo đuổi nghề nghệ thuật cần kết hợp năng khiếu với kiến thức nền tảng, luyện tập thực hành đều đặn, tư duy sáng tạo và khả năng thích ứng với công nghệ, xu hướng mới của ngành.",
    "choiceFeedback": [
     "Đúng — đây là những yếu tố cần thiết bên cạnh năng khiếu để theo đuổi nghề nghệ thuật.",
     "Sai — chỉ có năng khiếu mà thiếu kiến thức, luyện tập thì khó phát triển bền vững trong nghề.",
     "Sai — ghi nhớ kiến thức lý thuyết không thể thay thế kỹ năng thực hành và tư duy sáng tạo.",
     "Sai — công nghệ hiện đại (phần mềm thiết kế, AI, nền tảng số) đang là công cụ quan trọng trong nhiều ngành nghệ thuật."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
