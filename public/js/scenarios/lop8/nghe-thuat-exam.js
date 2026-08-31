// S8NT — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định.
// Ráp bởi data/gen-content/assemble-exam.mjs — file này chỉ là NGUỒN SEED.
export const S8NT_EXAMS = {
 "S8NT-exam-gk1": {
  "id": "S8NT-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Nghệ thuật 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Nghệ thuật 8",
  "questions": [
   {
    "stem": "7 nốt nhạc cơ bản trong âm nhạc là gì?",
    "choices": [
     "Đô Rê Mi Fa Sol La Si",
     "Đô Rê Mi Sol La Si Đô",
     "Đô Rê Mi Fa Sol La Đố",
     "Đô Rê Mi Fa Sol La Si giáng"
    ],
    "answer": 0,
    "explanation": "Bảy nốt nhạc cơ bản theo thứ tự là Đô, Rê, Mi, Fa, Sol, La, Si; sau Si sẽ lặp lại Đô ở quãng tám cao hơn.",
    "choiceFeedback": [
     "Đúng — đây đúng là 7 nốt nhạc cơ bản theo thứ tự chuẩn.",
     "Sai — dãy này thiếu nốt Fa và lặp lại Đô, không phải 7 nốt cơ bản.",
     "Sai — \"Đố\" là Đô ở quãng tám cao, không phải nốt cơ bản thứ 7.",
     "Sai — Si giáng là nốt đã bị biến âm (giáng), không thuộc 7 nốt cơ bản."
    ]
   },
   {
    "stem": "Nhịp 4/4 nghĩa là gì?",
    "choices": [
     "Mỗi ô nhịp có 3 phách, mỗi phách bằng một nốt đen",
     "Mỗi ô nhịp có 4 phách, mỗi phách bằng một nốt đen",
     "Mỗi ô nhịp có 4 phách, mỗi phách bằng một nốt móc đơn",
     "Mỗi ô nhịp có 2 phách, mỗi phách bằng một nốt trắng"
    ],
    "answer": 1,
    "explanation": "Số 4 trên chỉ số phách trong một ô nhịp, số 4 dưới chỉ mỗi phách có trường độ bằng một nốt đen (1/4 nốt tròn).",
    "choiceFeedback": [
     "Sai — 3 phách mỗi ô nhịp là đặc điểm của nhịp 3/4, không phải 4/4.",
     "Đúng — nhịp 4/4 có 4 phách mỗi ô, mỗi phách bằng một nốt đen.",
     "Sai — nếu mỗi phách là nốt móc đơn thì số dưới phải là 8 (nhịp 4/8), không phải 4/4.",
     "Sai — 2 phách mỗi ô nhịp với nốt trắng không đúng cấu trúc nhịp 4/4."
    ]
   },
   {
    "stem": "Đảo phách (syncopation) là hiện tượng gì trong âm nhạc?",
    "choices": [
     "Trọng âm của giai điệu dịch chuyển từ phách mạnh sang phách nhẹ hoặc phần yếu của phách",
     "Tăng tốc độ toàn bộ bản nhạc lên gấp đôi",
     "Đổi nhịp 4/4 sang nhịp 3/4 giữa bài hát",
     "Lặp lại y nguyên một câu nhạc nhiều lần"
    ],
    "answer": 0,
    "explanation": "Đảo phách là kỹ thuật nhấn trọng âm ở phách nhẹ hoặc phần yếu của phách thay vì phách mạnh thông thường, tạo cảm giác lệch nhịp có chủ ý.",
    "choiceFeedback": [
     "Đúng — đây chính là bản chất của đảo phách: dịch trọng âm sang chỗ nhẹ.",
     "Sai — đảo phách không liên quan đến việc thay đổi tốc độ (tempo) bản nhạc.",
     "Sai — đó là hiện tượng đổi nhịp (mixed meter), khác với đảo phách.",
     "Sai — lặp lại câu nhạc là mô típ nhắc lại, không phải đảo phách."
    ]
   },
   {
    "stem": "Đảo phách thường tạo cảm giác gì cho người nghe?",
    "choices": [
     "Đều đặn, buồn tẻ vì trọng âm không đổi",
     "Bất ngờ, sinh động, phá vỡ cảm giác đều đặn của nhịp điệu",
     "Chậm rãi, kéo dài trường độ mọi nốt nhạc",
     "Không ảnh hưởng gì tới cảm nhận nhịp điệu"
    ],
    "answer": 1,
    "explanation": "Vì trọng âm rơi vào chỗ bất ngờ (phách nhẹ), đảo phách khiến giai điệu trở nên sống động, cuốn hút, thường gặp trong nhạc Jazz, Latin, nhạc nhẹ hiện đại.",
    "choiceFeedback": [
     "Sai — ngược lại, đảo phách phá vỡ sự đều đặn chứ không gây buồn tẻ.",
     "Đúng — cảm giác bất ngờ, sinh động chính là hiệu quả đặc trưng của đảo phách.",
     "Sai — đảo phách là dịch trọng âm, không phải kéo dài trường độ nốt.",
     "Sai — đảo phách ảnh hưởng rõ rệt đến cảm nhận nhịp điệu của người nghe."
    ]
   },
   {
    "stem": "Hợp âm 7 (Seventh chord) được cấu tạo bằng cách nào?",
    "choices": [
     "Hợp âm ba (gồm âm 1-3-5) cộng thêm một nốt ở quãng 7 so với âm gốc",
     "Hai hợp âm ba chồng lên nhau cách nhau đúng một quãng 8",
     "Hợp âm ba cộng thêm một nốt ở quãng 4 so với âm gốc",
     "Chỉ gồm hai nốt cách nhau một quãng 7"
    ],
    "answer": 0,
    "explanation": "Hợp âm 7 = hợp âm ba (ba nốt: âm gốc, quãng 3, quãng 5) cộng thêm một nốt ở quãng 7 so với âm gốc, tạo màu sắc căng và cần giải quyết.",
    "choiceFeedback": [
     "Đúng — đây chính là cách hình thành hợp âm 7 từ hợp âm ba.",
     "Sai — chồng hai hợp âm ba cách quãng 8 chỉ tạo ra hợp âm ba nhân đôi, không phải hợp âm 7.",
     "Sai — thêm quãng 4 sẽ tạo hợp âm treo (sus4), không phải hợp âm 7.",
     "Sai — hợp âm 7 có ít nhất 4 nốt (hợp âm ba + nốt quãng 7), không chỉ 2 nốt."
    ]
   },
   {
    "stem": "Hợp âm C7 (Đô 7) gồm những nốt nào?",
    "choices": [
     "Đô – Mi – Sol – Si giáng (C-E-G-Bb)",
     "Đô – Mi – Sol – Si (C-E-G-B)",
     "Đô – Rê – Mi – Sol (C-D-E-G)",
     "Đô – Fa – Sol – Si giáng (C-F-G-Bb)"
    ],
    "answer": 0,
    "explanation": "C7 là hợp âm ba Đô trưởng (C-E-G) cộng thêm nốt Si giáng (Bb), là quãng 7 thứ so với Đô — đặc trưng của hợp âm 7 át (dominant seventh).",
    "choiceFeedback": [
     "Đúng — C-E-G-Bb chính là cấu tạo chuẩn của hợp âm C7.",
     "Sai — C-E-G-B (Si bình) là hợp âm Cmaj7 (7 trưởng), không phải C7.",
     "Sai — dãy này thiếu nốt Mi và có Rê xen vào, không đúng cấu trúc hợp âm 7.",
     "Sai — đây gần với hợp âm Fa (F) thêm quãng 7, không phải hợp âm C7."
    ]
   },
   {
    "stem": "Khi hát, hít thở đúng cách là như thế nào?",
    "choices": [
     "Hít nhanh và nông bằng vai để tiết kiệm thời gian",
     "Hít sâu, đều bằng cơ hoành (bụng phình ra), kiểm soát hơi thở ra từ từ",
     "Nín thở hoàn toàn trong lúc hát nốt dài",
     "Chỉ cần hít bằng mũi, không cần quan tâm đến bụng hay ngực"
    ],
    "answer": 1,
    "explanation": "Hít thở bằng cơ hoành (thở bụng) giúp lấy được nhiều hơi và kiểm soát luồng hơi ổn định khi hát, tránh hụt hơi hay căng cứng thanh quản.",
    "choiceFeedback": [
     "Sai — thở nông bằng vai làm hơi ngắn, dễ hụt hơi khi hát câu dài.",
     "Đúng — thở sâu bằng cơ hoành và kiểm soát hơi ra là kỹ thuật hát đúng.",
     "Sai — nín thở khi hát nốt dài là không thể và sẽ làm gián đoạn âm thanh.",
     "Sai — cách hít vào (mũi/miệng) không quan trọng bằng việc điều khiển cơ hoành và bụng."
    ]
   },
   {
    "stem": "Khi thổi recorder muốn phát ra nốt cao hơn (bát độ trên), người thổi cần làm gì?",
    "choices": [
     "Thổi hơi mạnh hơn và điều chỉnh các ngón bấm phù hợp (thường hé lỗ bấm phía sau)",
     "Bịt kín toàn bộ các lỗ trên thân sáo",
     "Thổi hơi nhẹ hơn và bỏ ngón tay khỏi tất cả các lỗ",
     "Không có cách nào, recorder chỉ phát được một âm vực duy nhất"
    ],
    "answer": 0,
    "explanation": "Để lên bát độ trên, người thổi recorder cần tăng lực hơi kết hợp hé nhẹ lỗ bấm phía sau (lỗ ngón cái) để tạo dao động cột khí bậc cao hơn.",
    "choiceFeedback": [
     "Đúng — tăng lực hơi và điều chỉnh ngón bấm (hé lỗ sau) giúp lên nốt cao.",
     "Sai — bịt kín hết các lỗ thường tạo ra nốt trầm nhất, không phải nốt cao.",
     "Sai — thổi nhẹ và mở hết lỗ thường tạo âm không rõ hoặc nốt khác hẳn, không phải cách lên bát độ trên.",
     "Sai — recorder hoàn toàn có thể phát nhiều âm vực nhờ kỹ thuật hơi và bấm ngón."
    ]
   },
   {
    "stem": "Sáo trúc Việt Nam khác recorder ở điểm nào?",
    "choices": [
     "Sáo trúc làm từ ống trúc/tre, thổi ngang và không có lưỡi gà định âm sẵn; recorder thổi dọc, có đầu thổi định âm sẵn",
     "Sáo trúc và recorder thực chất là một loại nhạc cụ, chỉ khác tên gọi",
     "Sáo trúc chỉ được dùng trong nhạc cổ điển phương Tây",
     "Recorder làm bằng tre, còn sáo trúc làm bằng nhựa"
    ],
    "answer": 0,
    "explanation": "Sáo trúc là nhạc cụ dân tộc Việt Nam, thổi ngang, người thổi tự tạo luồng hơi qua lỗ thổi; recorder là nhạc cụ phương Tây, thổi dọc, có phần đầu thổi (fipple) định sẵn giúp dễ phát âm hơn.",
    "choiceFeedback": [
     "Đúng — khác biệt về chất liệu, cách cầm thổi và cơ chế phát âm như mô tả.",
     "Sai — đây là hai nhạc cụ khác nhau về nguồn gốc, hình dáng và kỹ thuật thổi.",
     "Sai — sáo trúc là nhạc cụ dân tộc Việt Nam, gắn liền với dân ca và nhạc truyền thống, không phải nhạc cổ điển phương Tây.",
     "Sai — thông tin bị đảo ngược: sáo trúc làm từ tre/trúc, recorder mới thường làm bằng nhựa hoặc gỗ."
    ]
   },
   {
    "stem": "J.S. Bach được coi là nhạc sĩ tiêu biểu của thời kỳ nào và có sở trường gì?",
    "choices": [
     "Thời kỳ Baroque người Đức, bậc thầy về kỹ thuật phức điệu",
     "Thời kỳ Lãng mạn người Áo",
     "Nghệ sĩ nhạc Jazz hiện đại người Mỹ",
     "Nhà soạn nhạc thời kỳ Cổ điển người Ý"
    ],
    "answer": 0,
    "explanation": "Johann Sebastian Bach (1685–1750) là nhà soạn nhạc người Đức, đại diện tiêu biểu của thời kỳ Baroque, nổi tiếng với kỹ thuật phức điệu (polyphony) điêu luyện.",
    "choiceFeedback": [
     "Đúng — Bach thuộc thời kỳ Baroque, người Đức, bậc thầy phức điệu.",
     "Sai — thời kỳ Lãng mạn thuộc về các nhạc sĩ như Chopin, Schubert, muộn hơn Bach khoảng một thế kỷ.",
     "Sai — Bach sống ở thế kỷ 17-18, trước khi nhạc Jazz ra đời rất lâu, và không phải người Mỹ.",
     "Sai — Bach là người Đức chứ không phải người Ý, và thuộc thời Baroque chứ không phải Cổ điển."
    ]
   },
   {
    "stem": "Phức điệu (polyphony) là kỹ thuật sáng tác trong đó điều gì xảy ra?",
    "choices": [
     "Chỉ có một bè giai điệu duy nhất, các nhạc cụ khác chỉ chơi đệm hòa âm",
     "Nhiều bè giai điệu độc lập vang lên đồng thời, đan xen với nhau",
     "Toàn bộ dàn nhạc chơi cùng một giai điệu ở cùng quãng tám",
     "Chỉ sử dụng giọng hát, không có nhạc cụ đệm"
    ],
    "answer": 1,
    "explanation": "Phức điệu là kỹ thuật trong đó nhiều bè (giai điệu) độc lập, có giá trị âm nhạc riêng, cùng vang lên và đan xen, tiêu biểu trong các tác phẩm của Bach.",
    "choiceFeedback": [
     "Sai — đó là mô tả của kỹ thuật đơn điệu (homophony) với một bè chính và phần đệm.",
     "Đúng — nhiều bè giai điệu độc lập cùng vang lên chính là bản chất của phức điệu.",
     "Sai — chơi cùng một giai điệu đồng loạt là kỹ thuật unison, không phải phức điệu.",
     "Sai — phức điệu áp dụng cho cả giọng hát lẫn nhạc cụ, không giới hạn chỉ giọng hát."
    ]
   },
   {
    "stem": "Mozart được nhắc đến như thế nào trong lịch sử âm nhạc?",
    "choices": [
     "Thần đồng âm nhạc, bắt đầu sáng tác và biểu diễn từ khi còn rất nhỏ",
     "Nhạc sĩ khiếm thính sáng tác chủ yếu bằng trí nhớ âm thanh",
     "Người sáng lập dòng nhạc Jazz hiện đại",
     "Nhạc sĩ dân gian Việt Nam thế kỷ 20"
    ],
    "answer": 0,
    "explanation": "Wolfgang Amadeus Mozart (1756–1791) là thần đồng âm nhạc người Áo, đã biểu diễn và sáng tác từ khi mới 5-6 tuổi, đại diện tiêu biểu của âm nhạc Cổ điển.",
    "choiceFeedback": [
     "Đúng — Mozart nổi tiếng là thần đồng, sáng tác từ rất sớm.",
     "Sai — đặc điểm khiếm thính là của Beethoven ở giai đoạn cuối đời, không phải Mozart.",
     "Sai — Mozart sống ở thế kỷ 18, trước khi nhạc Jazz hình thành khoảng một thế kỷ.",
     "Sai — Mozart là nhạc sĩ người Áo thuộc dòng nhạc Cổ điển phương Tây, không phải nhạc sĩ Việt Nam."
    ]
   },
   {
    "stem": "Đặc trưng nổi bật trong âm nhạc của Mozart là gì?",
    "choices": [
     "Giai điệu trong sáng, cân đối, hài hòa, tiêu biểu cho phong cách Cổ điển",
     "Âm hưởng u tối, phức tạp, nhiều nghịch âm bất thường",
     "Chủ yếu dùng nhạc cụ điện tử và tổng hợp âm thanh",
     "Chỉ sáng tác cho một loại nhạc cụ duy nhất là đàn ghi-ta"
    ],
    "answer": 0,
    "explanation": "Âm nhạc Mozart mang tính cân đối, sáng rõ, hài hòa về cấu trúc — đặc trưng chuẩn mực của phong cách Cổ điển (Classical period).",
    "choiceFeedback": [
     "Đúng — sự trong sáng, cân đối là dấu ấn phong cách Cổ điển của Mozart.",
     "Sai — âm hưởng u tối, nhiều nghịch âm gần với phong cách Lãng mạn hoặc Hiện đại hơn, không phải Mozart.",
     "Sai — nhạc cụ điện tử chưa tồn tại ở thời Mozart (thế kỷ 18).",
     "Sai — Mozart sáng tác cho nhiều loại nhạc cụ và cả dàn nhạc, opera, không chỉ ghi-ta."
    ]
   },
   {
    "stem": "Beethoven vẫn tiếp tục sáng tác những kiệt tác dù gặp khó khăn nào trong cuộc đời?",
    "choices": [
     "Bị mù hoàn toàn từ nhỏ",
     "Bị điếc dần và gần như mất hoàn toàn thính giác ở giai đoạn cuối đời",
     "Không được học nhạc bài bản",
     "Sống trong hoàn cảnh chiến tranh nên không thể sáng tác"
    ],
    "answer": 1,
    "explanation": "Beethoven bắt đầu bị suy giảm thính lực từ khoảng năm 1798 và gần như điếc hoàn toàn về sau, nhưng vẫn sáng tác nhiều kiệt tác, kể cả Symphony số 9.",
    "choiceFeedback": [
     "Sai — Beethoven bị điếc chứ không phải mù; thị giác của ông không bị ảnh hưởng.",
     "Đúng — Beethoven bị điếc dần rồi mất thính giác nhưng vẫn sáng tác nhiều kiệt tác.",
     "Sai — Beethoven được đào tạo âm nhạc bài bản từ nhỏ, kể cả học với Haydn.",
     "Sai — khó khăn lớn nhất và nổi tiếng nhất của Beethoven là bệnh điếc, không phải chiến tranh."
    ]
   },
   {
    "stem": "Bản Symphony số 9 của Beethoven được biết đến rộng rãi vì điều gì?",
    "choices": [
     "Là bản giao hưởng đầu tiên trong lịch sử âm nhạc",
     "Có chương cuối sử dụng hợp xướng với phần lời \"Ode to Joy\" (Khúc ca hoan hỉ)",
     "Là tác phẩm duy nhất còn được lưu giữ của Beethoven",
     "Được sáng tác khi Beethoven còn là một đứa trẻ"
    ],
    "answer": 1,
    "explanation": "Symphony số 9 (hoàn thành năm 1824) nổi tiếng vì chương IV sử dụng hợp xướng và giọng hát, phổ nhạc bài thơ \"An die Freude\" (Ode to Joy) của Schiller — điều chưa từng có trong giao hưởng trước đó.",
    "choiceFeedback": [
     "Sai — giao hưởng đã tồn tại từ trước Beethoven rất lâu (thời Haydn, Mozart), Symphony 9 không phải bản đầu tiên.",
     "Đúng — chương cuối có hợp xướng hát \"Ode to Joy\" là điểm đặc biệt nổi tiếng nhất của tác phẩm này.",
     "Sai — Beethoven sáng tác 9 bản giao hưởng cùng nhiều tác phẩm khác, không chỉ riêng bản này.",
     "Sai — Symphony số 9 là tác phẩm cuối đời, sáng tác khi Beethoven đã lớn tuổi và gần như điếc hoàn toàn, không phải lúc còn nhỏ."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "S8NT-exam-ck1": {
  "id": "S8NT-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Nghệ thuật 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Nghệ thuật 8",
  "questions": [
   {
    "stem": "Nhịp 4/4 có bao nhiêu phách trong mỗi ô nhịp, và mỗi phách tương ứng trường độ nào?",
    "choices": [
     "3 phách, mỗi phách 1 nốt đen",
     "4 phách, mỗi phách 1 nốt đen",
     "4 phách, mỗi phách 1 nốt trắng",
     "2 phách, mỗi phách 1 nốt móc đơn"
    ],
    "answer": 1,
    "explanation": "Nhịp 4/4: số trên (4) là số phách trong ô nhịp, số dưới (4) chỉ mỗi phách bằng một nốt đen.",
    "choiceFeedback": [
     "Sai — 3 phách là đặc điểm của nhịp 3/4, không phải 4/4.",
     "Đúng — 4 phách mỗi ô nhịp, mỗi phách là một nốt đen, đúng với nhịp 4/4.",
     "Sai — nếu mỗi phách là nốt trắng thì tổng trường độ ô nhịp sẽ gấp đôi, không khớp nhịp 4/4.",
     "Sai — 2 phách với nốt móc đơn không phải cấu trúc của nhịp 4/4."
    ]
   },
   {
    "stem": "Hợp âm C7 (Đô 7) gồm những nốt nào?",
    "choices": [
     "Đô – Mi – Sol – Si giáng (C-E-G-Bb)",
     "Đô – Mi – Sol – Si (C-E-G-B)",
     "Đô – Fa – La – Đô (C-F-A-C)",
     "Rê – Fa – La – Đô (D-F-A-C)"
    ],
    "answer": 0,
    "explanation": "C7 gồm hợp âm ba Đô trưởng (C-E-G) cộng thêm nốt Si giáng (Bb) ở quãng 7 thứ.",
    "choiceFeedback": [
     "Đúng — C-E-G-Bb là cấu tạo chuẩn của hợp âm C7.",
     "Sai — C-E-G-B (Si bình) là hợp âm Cmaj7, không phải C7.",
     "Sai — dãy nốt này không đúng cấu trúc hợp âm 7 trên nền Đô.",
     "Sai — đây là các nốt của hợp âm khác (gần giống Rê thứ 7), không phải C7."
    ]
   },
   {
    "stem": "J.S. Bach là nhạc sĩ tiêu biểu của thời kỳ âm nhạc nào?",
    "choices": [
     "Thời kỳ Baroque",
     "Thời kỳ Lãng mạn",
     "Thời kỳ Hiện đại",
     "Thời kỳ Phục hưng"
    ],
    "answer": 0,
    "explanation": "Bach (1685–1750) là đại diện tiêu biểu của thời kỳ Baroque, nổi bật với kỹ thuật phức điệu.",
    "choiceFeedback": [
     "Đúng — Bach thuộc thời kỳ Baroque.",
     "Sai — thời Lãng mạn (thế kỷ 19) muộn hơn Bach khoảng một thế kỷ, gắn với Chopin, Schubert.",
     "Sai — thời Hiện đại (thế kỷ 20) cách xa thời Bach rất nhiều.",
     "Sai — thời Phục hưng diễn ra trước Baroque, kết thúc trước khi Bach sinh ra."
    ]
   },
   {
    "stem": "Đặc trưng nổi bật trong âm nhạc của Mozart là gì?",
    "choices": [
     "Giai điệu trong sáng, cân đối, tiêu biểu cho phong cách Cổ điển",
     "Âm hưởng u tối, nhiều nghịch âm bất thường",
     "Chủ yếu dùng nhạc cụ điện tử",
     "Chỉ sáng tác nhạc dân gian Việt Nam"
    ],
    "answer": 0,
    "explanation": "Mozart đại diện cho sự cân đối, trong sáng, hài hòa — chuẩn mực của phong cách Cổ điển.",
    "choiceFeedback": [
     "Đúng — sự trong sáng, cân đối là dấu ấn phong cách Cổ điển của Mozart.",
     "Sai — đặc điểm này gần với phong cách Lãng mạn/Hiện đại hơn, không phải Mozart.",
     "Sai — nhạc cụ điện tử chưa xuất hiện ở thời đại của Mozart (thế kỷ 18).",
     "Sai — Mozart là nhạc sĩ Cổ điển người Áo, không sáng tác nhạc dân gian Việt Nam."
    ]
   },
   {
    "stem": "Beethoven vẫn sáng tác những kiệt tác dù gặp khó khăn gì trong cuộc đời?",
    "choices": [
     "Bị mù từ nhỏ",
     "Bị điếc dần rồi mất gần như hoàn toàn thính giác",
     "Không được đào tạo âm nhạc bài bản",
     "Bị cấm biểu diễn ở quê hương"
    ],
    "answer": 1,
    "explanation": "Beethoven bị suy giảm thính lực từ cuối những năm 1790, gần như điếc hoàn toàn về sau nhưng vẫn sáng tác nhiều kiệt tác lớn.",
    "choiceFeedback": [
     "Sai — Beethoven bị điếc, không phải mù.",
     "Đúng — bệnh điếc là khó khăn nổi tiếng nhất mà Beethoven đã vượt qua để sáng tác.",
     "Sai — Beethoven được đào tạo âm nhạc từ nhỏ, kể cả học với Haydn.",
     "Sai — không có sự kiện lịch sử nào ghi nhận Beethoven bị cấm biểu diễn ở quê hương."
    ]
   },
   {
    "stem": "Luật xa gần (perspective) trong hội họa là gì?",
    "choices": [
     "Quy luật vẽ hình sao cho vật ở xa nhỏ và mờ hơn, vật ở gần to và rõ hơn, tạo cảm giác không gian",
     "Quy luật phối màu nóng-lạnh trong tranh",
     "Cách chọn khung tranh phù hợp kích thước tường",
     "Kỹ thuật pha màu sơn dầu để tạo độ bóng"
    ],
    "answer": 0,
    "explanation": "Luật xa gần là hệ thống quy tắc thể hiện chiều sâu không gian trên mặt phẳng hai chiều: vật xa nhỏ, mờ; vật gần to, rõ.",
    "choiceFeedback": [
     "Đúng — đây chính là bản chất của luật xa gần (perspective).",
     "Sai — đó là nguyên lý phối màu (hòa sắc), khác với luật xa gần.",
     "Sai — chọn khung tranh là vấn đề trưng bày, không liên quan đến luật xa gần.",
     "Sai — pha màu tạo độ bóng là kỹ thuật chất liệu, không phải luật xa gần."
    ]
   },
   {
    "stem": "Điểm tụ (vanishing point) trong luật xa gần là gì?",
    "choices": [
     "Điểm cao nhất của bức tranh, nơi đặt tiêu đề",
     "Điểm mà các đường thẳng song song trong không gian thực tế hội tụ lại trên đường tầm mắt",
     "Điểm giữa bức tranh dùng để chia bố cục đối xứng",
     "Điểm đặt nguồn sáng chính trong tranh"
    ],
    "answer": 1,
    "explanation": "Điểm tụ là nơi các đường song song (ví dụ hai bên đường ray) hội tụ trên đường tầm mắt khi vẽ theo luật xa gần, tạo cảm giác chiều sâu.",
    "choiceFeedback": [
     "Sai — điểm tụ liên quan đến chiều sâu không gian, không phải vị trí đặt tiêu đề.",
     "Đúng — điểm tụ là nơi các đường song song hội tụ trên đường tầm mắt.",
     "Sai — đây là khái niệm về bố cục đối xứng, khác với điểm tụ trong phối cảnh.",
     "Sai — vị trí nguồn sáng là yếu tố ánh sáng, không phải điểm tụ phối cảnh."
    ]
   },
   {
    "stem": "Ký họa là gì?",
    "choices": [
     "Vẽ nhanh, ghi lại nhanh đặc điểm chính của đối tượng trong thời gian ngắn",
     "Vẽ tỉ mỉ, hoàn chỉnh một tác phẩm trong nhiều tháng",
     "Kỹ thuật in tranh hàng loạt bằng khuôn khắc gỗ",
     "Cách phối màu cho tranh sơn dầu"
    ],
    "answer": 0,
    "explanation": "Ký họa là hình thức vẽ nhanh nhằm ghi lại nhanh dáng vẻ, đặc điểm cơ bản của đối tượng, thường dùng để luyện quan sát và làm tư liệu.",
    "choiceFeedback": [
     "Đúng — ký họa đúng là vẽ nhanh, ghi lại đặc điểm chính trong thời gian ngắn.",
     "Sai — vẽ tỉ mỉ trong thời gian dài là đặc trưng của tranh hoàn chỉnh, không phải ký họa.",
     "Sai — đó là kỹ thuật tranh khắc gỗ (in ấn), khác hoàn toàn với ký họa.",
     "Sai — phối màu sơn dầu là một kỹ thuật chất liệu riêng, không phải định nghĩa ký họa."
    ]
   },
   {
    "stem": "Theo tỉ lệ chuẩn khuôn mặt người, khoảng cách giữa hai mắt xấp xỉ bằng bao nhiêu?",
    "choices": [
     "Chiều rộng của một con mắt",
     "Chiều rộng của cả khuôn mặt",
     "Chiều dài của mũi",
     "Hai lần chiều rộng khuôn mặt"
    ],
    "answer": 0,
    "explanation": "Theo tỉ lệ giải phẫu chuẩn thường dùng khi ký họa chân dung, khoảng cách giữa hai mắt xấp xỉ bằng chiều rộng của một con mắt.",
    "choiceFeedback": [
     "Đúng — đây là tỉ lệ chuẩn thường được dùng làm mốc khi ký họa chân dung.",
     "Sai — khoảng cách hai mắt chỉ là một phần nhỏ so với chiều rộng cả khuôn mặt.",
     "Sai — chiều dài mũi không phải mốc tỉ lệ chuẩn cho khoảng cách hai mắt.",
     "Sai — không có tỉ lệ nào lớn gấp đôi khuôn mặt cho khoảng cách hai mắt, đây là con số phi thực tế."
    ]
   },
   {
    "stem": "Khi vẽ tranh tự do (chủ đề học đường), bố cục tranh cần đảm bảo điều gì?",
    "choices": [
     "Vẽ càng nhiều chi tiết càng tốt, không cần sắp xếp",
     "Có mảng chính - phụ rõ ràng, cân đối, làm nổi bật nội dung chủ đề",
     "Chỉ dùng một màu duy nhất cho toàn bộ bức tranh",
     "Đặt tất cả nhân vật thẳng hàng ở chính giữa tranh"
    ],
    "answer": 1,
    "explanation": "Bố cục tốt cần có mảng chính - phụ rõ ràng, sắp xếp cân đối để làm nổi bật chủ đề, tránh dàn trải chi tiết vô mục đích.",
    "choiceFeedback": [
     "Sai — vẽ nhiều chi tiết không sắp xếp sẽ làm bố cục rối, thiếu trọng tâm.",
     "Đúng — mảng chính-phụ rõ ràng, cân đối chính là yêu cầu quan trọng của bố cục tranh.",
     "Sai — dùng một màu duy nhất không phải yêu cầu về bố cục mà là hạn chế về màu sắc.",
     "Sai — xếp thẳng hàng cứng nhắc ở giữa thường khiến bố cục đơn điệu, thiếu sinh động."
    ]
   },
   {
    "stem": "Mục đích chính của poster (áp phích) cổ động là gì?",
    "choices": [
     "Trang trí đơn thuần, không mang thông điệp gì",
     "Truyền tải nhanh, mạnh một thông điệp hoặc lời kêu gọi tới đông đảo người xem",
     "Ghi lại chân dung con người thật một cách chi tiết",
     "Ghi chép số liệu thống kê phức tạp"
    ],
    "answer": 1,
    "explanation": "Poster cổ động dùng hình ảnh cô đọng, chữ ngắn gọn, màu sắc nổi bật để truyền tải nhanh một thông điệp tuyên truyền, kêu gọi hành động.",
    "choiceFeedback": [
     "Sai — poster cổ động luôn mang thông điệp rõ ràng, không chỉ để trang trí.",
     "Đúng — mục đích cốt lõi của poster cổ động là truyền tải thông điệp nhanh, mạnh.",
     "Sai — ghi lại chân dung chi tiết là mục đích của tranh chân dung/ký họa, không phải poster.",
     "Sai — poster không phải công cụ để trình bày số liệu thống kê phức tạp."
    ]
   },
   {
    "stem": "Rồng thời Lý có đặc điểm tiêu biểu nào?",
    "choices": [
     "Thân mập, đuôi xoắn ốc to như rồng thời sau",
     "Thân dài, uốn lượn hình sin nhiều khúc, nhỏ dần về đuôi, đầu có mào lửa",
     "Có sừng to, vảy cứng giống rồng phương Tây",
     "Chỉ được chạm khắc với hai chân, không có móng vuốt rõ"
    ],
    "answer": 1,
    "explanation": "Rồng thời Lý có thân hình uốn lượn mềm mại nhiều khúc như hình sin, nhỏ dần về phía đuôi, đầu có mào lửa — biểu tượng gắn với tín ngưỡng cầu mưa của cư dân nông nghiệp.",
    "choiceFeedback": [
     "Sai — thân mập, đuôi xoắn ốc to là đặc điểm gần với rồng thời Trần hơn.",
     "Đúng — thân uốn lượn mềm mại hình sin, đầu có mào lửa là đặc trưng rồng thời Lý.",
     "Sai — rồng Việt Nam thời Lý không có sừng to, vảy cứng kiểu rồng phương Tây.",
     "Sai — rồng thời Lý thường được chạm khắc với móng vuốt rõ ràng, không thiếu chi tiết như vậy."
    ]
   },
   {
    "stem": "So với rồng thời Lý, rồng thời Trần có điểm khác biệt nào?",
    "choices": [
     "Giữ nguyên hoàn toàn hình dáng, không có gì thay đổi",
     "Thân rồng mập mạp, khỏe khoắn hơn, đường uốn lượn ít mềm mại hơn rồng thời Lý",
     "Không còn xuất hiện trong điêu khắc thời Trần",
     "Chỉ được chạm khắc bằng vàng, không dùng đá hay gỗ"
    ],
    "answer": 1,
    "explanation": "Rồng thời Trần mập mạp, khỏe khoắn hơn, phản ánh tinh thần thượng võ của thời đại (gắn với ba lần chiến thắng quân Nguyên Mông), khác với vẻ mềm mại của rồng thời Lý.",
    "choiceFeedback": [
     "Sai — rồng thời Trần có sự thay đổi rõ rệt so với thời Lý, không giữ nguyên.",
     "Đúng — sự mập mạp, khỏe khoắn hơn là điểm khác biệt tiêu biểu của rồng thời Trần.",
     "Sai — rồng vẫn là biểu tượng phổ biến trong điêu khắc, kiến trúc thời Trần.",
     "Sai — rồng thời Trần được chạm khắc trên nhiều chất liệu như đá, gỗ, gốm, không chỉ vàng."
    ]
   },
   {
    "stem": "Đình làng (phát triển mạnh thời Lê) có chức năng gì trong đời sống cộng đồng?",
    "choices": [
     "Chỉ dùng để làm nơi ở của vua chúa",
     "Nơi thờ Thành hoàng làng và tổ chức sinh hoạt cộng đồng của dân làng",
     "Nơi buôn bán, họp chợ duy nhất trong làng",
     "Công trình phòng thủ quân sự của triều đình"
    ],
    "answer": 1,
    "explanation": "Đình làng là công trình kiến trúc dân gian, vừa là nơi thờ Thành hoàng làng, vừa là nơi hội họp, sinh hoạt văn hóa cộng đồng của người dân.",
    "choiceFeedback": [
     "Sai — đình làng là công trình dân gian, không phải nơi ở của vua chúa.",
     "Đúng — đình làng vừa thờ Thành hoàng, vừa là trung tâm sinh hoạt cộng đồng.",
     "Sai — chợ làng là công trình riêng biệt, khác với đình làng.",
     "Sai — đình làng mang chức năng văn hóa - tín ngưỡng, không phải công trình quân sự."
    ]
   },
   {
    "stem": "Tranh dân gian Đông Hồ (Bắc Ninh) thường thể hiện chủ đề gì?",
    "choices": [
     "Cảnh sinh hoạt, ước vọng dân gian như \"Đám cưới chuột\", \"Lợn đàn\", \"Gà đàn\"",
     "Chân dung các vị vua triều Nguyễn",
     "Phong cảnh châu Âu thời Phục hưng",
     "Kiến trúc nhà thờ Công giáo phương Tây"
    ],
    "answer": 0,
    "explanation": "Tranh Đông Hồ là dòng tranh dân gian khắc gỗ in trên giấy dó, thể hiện đời sống sinh hoạt, ước vọng no đủ, sung túc của người dân qua các đề tài quen thuộc như \"Đám cưới chuột\", \"Lợn đàn\", \"Gà đàn\".",
    "choiceFeedback": [
     "Đúng — các đề tài sinh hoạt, ước vọng dân gian là nội dung đặc trưng của tranh Đông Hồ.",
     "Sai — chân dung vua triều Nguyễn không phải chủ đề của dòng tranh dân gian Đông Hồ.",
     "Sai — tranh Đông Hồ là nghệ thuật dân gian Việt Nam, không vẽ phong cảnh châu Âu.",
     "Sai — kiến trúc nhà thờ phương Tây không liên quan đến đề tài của tranh Đông Hồ."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "S8NT-exam-gk2": {
  "id": "S8NT-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Nghệ thuật 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Nghệ thuật 8",
  "questions": [
   {
    "stem": "Nhạc thính phòng (chamber music) là gì?",
    "choices": [
     "Thể loại nhạc dành cho không gian nhỏ, số lượng người biểu diễn ít, mỗi người chơi một bè riêng",
     "Nhạc giao hưởng biểu diễn tại sân vận động lớn",
     "Nhạc điện tử phối khí hoàn toàn bằng máy tính",
     "Nhạc chỉ dành cho một nhạc công độc tấu duy nhất"
    ],
    "answer": 0,
    "explanation": "Nhạc thính phòng là thể loại nhạc hòa tấu quy mô nhỏ (thường 2-9 người), mỗi nhạc công đảm nhiệm một bè riêng, biểu diễn phù hợp trong không gian nhỏ như phòng khách, phòng hòa nhạc nhỏ.",
    "choiceFeedback": [
     "Đúng — quy mô nhỏ, mỗi người một bè riêng là đặc trưng của nhạc thính phòng.",
     "Sai — nhạc giao hưởng biểu diễn ở sân khấu lớn với dàn nhạc đông người, khác với thính phòng.",
     "Sai — nhạc thính phòng do nhạc công thật biểu diễn, không phải nhạc điện tử.",
     "Sai — nhạc thính phòng thường có từ 2 người trở lên, không giới hạn ở độc tấu một người."
    ]
   },
   {
    "stem": "Tứ tấu dây (string quartet) thường gồm những nhạc cụ nào?",
    "choices": [
     "2 vĩ cầm (violin), 1 viola và 1 cello",
     "1 violin, 1 piano, 1 guitar và 1 sáo",
     "4 cây đàn guitar",
     "2 cello và 2 contrabass"
    ],
    "answer": 0,
    "explanation": "Tứ tấu dây kinh điển gồm 2 violin, 1 viola và 1 cello — một trong những hình thức nhạc thính phòng phổ biến nhất, tiêu biểu ở các tác phẩm của Haydn, Mozart, Beethoven.",
    "choiceFeedback": [
     "Đúng — 2 violin, 1 viola, 1 cello là biên chế chuẩn của tứ tấu dây.",
     "Sai — piano và guitar không phải nhạc cụ dây kéo, không thuộc biên chế tứ tấu dây.",
     "Sai — tứ tấu dây cần các nhạc cụ khác âm vực nhau (violin, viola, cello), không phải 4 guitar giống nhau.",
     "Sai — contrabass thường không xuất hiện trong tứ tấu dây truyền thống, vốn dùng 2 violin, 1 viola, 1 cello."
    ]
   },
   {
    "stem": "Opera là gì?",
    "choices": [
     "Thể loại nhạc kịch kết hợp hát, diễn xuất, dàn nhạc và mỹ thuật sân khấu",
     "Một bản giao hưởng không lời dành cho dàn nhạc",
     "Điệu múa dân gian không có lời hát",
     "Bài hát ngắn chỉ có một người hát, không nhạc đệm"
    ],
    "answer": 0,
    "explanation": "Opera là hình thức nghệ thuật tổng hợp: câu chuyện được kể bằng lời hát (không phải lời thoại thường), có diễn xuất, dàn nhạc đệm, cùng thiết kế sân khấu, trang phục.",
    "choiceFeedback": [
     "Đúng — opera kết hợp hát, diễn xuất, dàn nhạc và mỹ thuật sân khấu.",
     "Sai — giao hưởng không lời không có phần hát và cốt truyện kịch tính như opera.",
     "Sai — opera luôn có phần hát là trung tâm, khác với múa dân gian không lời.",
     "Sai — opera là tác phẩm sân khấu quy mô lớn, không phải một bài hát ngắn đơn giản."
    ]
   },
   {
    "stem": "Mozart đã sáng tác vở opera nổi tiếng nào?",
    "choices": [
     "Cây sáo thần (Die Zauberflöte)",
     "Chín bản giao hưởng đánh số từ 1 đến 9",
     "Bộ tứ tấu Rasumovsky",
     "Bản Requiem của Verdi"
    ],
    "answer": 0,
    "explanation": "\"Cây sáo thần\" (Die Zauberflöte, 1791) là một trong những vở opera nổi tiếng nhất của Mozart, sáng tác vào năm cuối đời ông.",
    "choiceFeedback": [
     "Đúng — Die Zauberflöte (Cây sáo thần) là vở opera tiêu biểu của Mozart.",
     "Sai — Mozart sáng tác khoảng 41 bản giao hưởng, không phải chỉ 9 bản như Beethoven, và giao hưởng không phải opera.",
     "Sai — bộ tứ tấu Rasumovsky là tác phẩm của Beethoven, không phải Mozart.",
     "Sai — Requiem là tác phẩm dang dở của chính Mozart (không phải của Verdi), và đây là thánh ca chứ không phải opera."
    ]
   },
   {
    "stem": "Sơn dầu là gì?",
    "choices": [
     "Kỹ thuật vẽ dùng màu pha với dầu (dầu lanh...), khô chậm, dễ chỉnh sửa, tạo độ bóng sâu",
     "Kỹ thuật vẽ bằng mực nho trên giấy dó",
     "Kỹ thuật in tranh bằng khuôn khắc gỗ",
     "Kỹ thuật vẽ màu nước loãng trên giấy"
    ],
    "answer": 0,
    "explanation": "Sơn dầu là chất liệu hội họa dùng bột màu pha với dầu (như dầu lanh), khô chậm nên cho phép chỉnh sửa, chồng lớp, tạo chiều sâu và độ bóng đặc trưng.",
    "choiceFeedback": [
     "Đúng — pha màu với dầu, khô chậm, tạo độ bóng sâu là đặc điểm của sơn dầu.",
     "Sai — vẽ bằng mực nho trên giấy dó là kỹ thuật tranh thủy mặc, khác với sơn dầu.",
     "Sai — in bằng khuôn khắc gỗ là kỹ thuật tranh khắc gỗ (như tranh Đông Hồ), không phải sơn dầu.",
     "Sai — màu nước loãng trên giấy là kỹ thuật tranh màu nước (watercolor), khác hẳn sơn dầu."
    ]
   },
   {
    "stem": "Ưu điểm nổi bật của sơn dầu so với các chất liệu khác là gì?",
    "choices": [
     "Khô rất nhanh nên vẽ xong ngay lập tức",
     "Khô chậm, cho phép họa sĩ chỉnh sửa, chồng lớp màu tạo chiều sâu, độ bền màu cao",
     "Chỉ vẽ được trên giấy dó truyền thống",
     "Không cần pha trộn màu, dùng nguyên màu từ tuýp"
    ],
    "answer": 1,
    "explanation": "Chính vì khô chậm, họa sĩ có thời gian chỉnh sửa, chồng nhiều lớp màu để tạo chiều sâu và sắc độ phong phú; màu sơn dầu cũng có độ bền cao theo thời gian.",
    "choiceFeedback": [
     "Sai — sơn dầu khô chậm chứ không nhanh, đây là điểm khác biệt so với màu nước hay màu bột.",
     "Đúng — khô chậm giúp chỉnh sửa, chồng lớp, và độ bền màu cao là các ưu điểm chính của sơn dầu.",
     "Sai — sơn dầu thường vẽ trên vải toan (canvas) hoặc gỗ, không phải giấy dó.",
     "Sai — họa sĩ vẫn cần pha trộn màu để tạo sắc độ phong phú, không chỉ dùng màu nguyên."
    ]
   },
   {
    "stem": "Tranh lụa là gì?",
    "choices": [
     "Tranh được vẽ trực tiếp trên nền vải lụa, thường dùng màu nước hoặc mực",
     "Tranh khắc gỗ in trên giấy dó",
     "Tranh vẽ bằng sơn dầu trên vải toan (canvas)",
     "Tranh ghép từ nhiều mảnh vải màu khác nhau"
    ],
    "answer": 0,
    "explanation": "Tranh lụa là thể loại tranh vẽ trên nền lụa, dùng màu nước hoặc mực nho, đặc trưng bởi hiệu ứng thấm màu nhẹ nhàng qua thớ vải.",
    "choiceFeedback": [
     "Đúng — vẽ trên nền lụa bằng màu nước/mực chính là bản chất của tranh lụa.",
     "Sai — khắc gỗ in trên giấy dó là kỹ thuật của tranh dân gian (như Đông Hồ), khác với tranh lụa.",
     "Sai — vẽ sơn dầu trên canvas là một chất liệu khác hẳn, không phải tranh lụa.",
     "Sai — ghép vải nhiều màu là kỹ thuật khác (như appliqué), không phải tranh lụa."
    ]
   },
   {
    "stem": "Đặc trưng của tranh lụa Việt Nam là gì?",
    "choices": [
     "Màu sắc rực rỡ, tương phản mạnh như tranh cổ động",
     "Màu sắc nhẹ nhàng, trong trẻo, thấm dần qua nhiều lớp, đường nét mềm mại",
     "Chỉ vẽ bằng màu đen trắng, không dùng màu sắc",
     "Luôn có khung hình vuông cố định"
    ],
    "answer": 1,
    "explanation": "Tranh lụa Việt Nam đặc trưng bởi màu sắc nhẹ nhàng, trong trẻo do màu thấm qua thớ lụa nhiều lớp, đường nét mềm mại, gợi cảm xúc tinh tế.",
    "choiceFeedback": [
     "Sai — màu tương phản mạnh, rực rỡ là đặc trưng của poster/tranh cổ động, không phải tranh lụa.",
     "Đúng — sự nhẹ nhàng, trong trẻo, mềm mại chính là đặc trưng nổi bật của tranh lụa Việt Nam.",
     "Sai — tranh lụa Việt Nam vẫn sử dụng màu sắc phong phú, không chỉ đen trắng.",
     "Sai — tranh lụa không bắt buộc khung hình vuông, có thể theo nhiều kích thước, tỉ lệ khác nhau."
    ]
   },
   {
    "stem": "Trường Mỹ thuật Đông Dương được thành lập vào năm nào?",
    "choices": [
     "1925",
     "1945",
     "1802",
     "2000"
    ],
    "answer": 0,
    "explanation": "Trường Cao đẳng Mỹ thuật Đông Dương (École des Beaux-Arts de l'Indochine) được thành lập năm 1925 tại Hà Nội, đào tạo thế hệ họa sĩ Việt Nam đầu tiên theo phong cách hiện đại.",
    "choiceFeedback": [
     "Đúng — năm 1925 là năm thành lập Trường Mỹ thuật Đông Dương tại Hà Nội.",
     "Sai — 1945 là năm Cách mạng tháng Tám thành công, muộn hơn năm thành lập trường 20 năm.",
     "Sai — 1802 là năm bắt đầu triều Nguyễn, trước khi trường này ra đời hơn một thế kỷ.",
     "Sai — trường đã thành lập từ đầu thế kỷ 20, không phải năm 2000."
    ]
   },
   {
    "stem": "Bức tranh \"Thiếu nữ bên hoa huệ\" là tác phẩm nổi tiếng của họa sĩ nào thuộc thế hệ đầu Trường Mỹ thuật Đông Dương?",
    "choices": [
     "Tô Ngọc Vân",
     "Nguyễn Phan Chánh",
     "Trần Văn Cẩn",
     "Nguyễn Gia Trí"
    ],
    "answer": 0,
    "explanation": "\"Thiếu nữ bên hoa huệ\" (1943) là tác phẩm sơn dầu nổi tiếng của họa sĩ Tô Ngọc Vân, một trong những gương mặt tiêu biểu của hội họa Việt Nam hiện đại.",
    "choiceFeedback": [
     "Đúng — Tô Ngọc Vân là tác giả của \"Thiếu nữ bên hoa huệ\".",
     "Sai — Nguyễn Phan Chánh nổi tiếng với tranh lụa như \"Chơi ô ăn quan\", không phải tác phẩm này.",
     "Sai — Trần Văn Cẩn nổi tiếng với tranh \"Em Thúy\" và \"Gội đầu\", không phải tác phẩm này.",
     "Sai — Nguyễn Gia Trí nổi tiếng với tranh sơn mài, không phải tác giả của \"Thiếu nữ bên hoa huệ\"."
    ]
   },
   {
    "stem": "Thời kỳ âm nhạc Lãng mạn (Romantic) kéo dài khoảng thời gian nào?",
    "choices": [
     "Thế kỷ 19 (khoảng 1820-1900)",
     "Thế kỷ 17 (khoảng 1600-1700)",
     "Thế kỷ 21 (từ năm 2000 đến nay)",
     "Thời kỳ Trung cổ (thế kỷ 5-14)"
    ],
    "answer": 0,
    "explanation": "Thời kỳ Lãng mạn trong âm nhạc kéo dài khoảng từ đầu thế kỷ 19 đến đầu thế kỷ 20, với các đại diện như Chopin, Schubert, Schumann.",
    "choiceFeedback": [
     "Đúng — thế kỷ 19 là khoảng thời gian của thời kỳ âm nhạc Lãng mạn.",
     "Sai — thế kỷ 17 là giai đoạn đầu thời Baroque, trước thời Lãng mạn khoảng 2 thế kỷ.",
     "Sai — thế kỷ 21 là thời hiện đại/đương đại, cách xa thời Lãng mạn rất nhiều.",
     "Sai — thời Trung cổ diễn ra trước cả thời Phục hưng và Baroque, rất xa thời Lãng mạn."
    ]
   },
   {
    "stem": "Chopin nổi tiếng với thể loại sáng tác nào cho nhạc cụ nào?",
    "choices": [
     "Các bản Nocturne, Waltz, Polonaise cho đàn piano",
     "Các bản giao hưởng lớn cho dàn nhạc đầy đủ",
     "Các vở opera cho giọng hát",
     "Các bản nhạc cho đàn organ nhà thờ"
    ],
    "answer": 0,
    "explanation": "Frédéric Chopin là nhà soạn nhạc Ba Lan thời Lãng mạn, nổi tiếng với các tác phẩm piano độc tấu như Nocturne, Waltz, Polonaise, Mazurka.",
    "choiceFeedback": [
     "Đúng — Chopin chủ yếu sáng tác cho piano với các thể loại Nocturne, Waltz, Polonaise.",
     "Sai — Chopin gần như không sáng tác giao hưởng, ông tập trung vào piano độc tấu.",
     "Sai — Chopin không viết opera, ông là nhà soạn nhạc piano tiêu biểu.",
     "Sai — Chopin không sáng tác cho đàn organ nhà thờ, trọng tâm sự nghiệp của ông là piano."
    ]
   },
   {
    "stem": "Dân ca Quan họ (Bắc Ninh) có đặc trưng gì nổi bật?",
    "choices": [
     "Hát đối đáp nam nữ, giai điệu mượt mà, trang phục áo tứ thân - khăn mỏ quạ",
     "Chỉ hát một mình, không có đối đáp",
     "Sử dụng nhạc cụ điện tử hiện đại",
     "Bắt nguồn từ miền Nam Bộ"
    ],
    "answer": 0,
    "explanation": "Quan họ là loại hình dân ca đối đáp nam nữ đặc trưng của vùng Kinh Bắc (Bắc Ninh - Bắc Giang), giai điệu mượt mà, gắn với trang phục áo tứ thân, khăn mỏ quạ; đã được UNESCO công nhận Di sản văn hóa phi vật thể.",
    "choiceFeedback": [
     "Đúng — hát đối đáp nam nữ cùng trang phục truyền thống là đặc trưng của Quan họ.",
     "Sai — Quan họ đặc trưng bởi hình thức hát đối đáp, không phải hát một mình.",
     "Sai — Quan họ là loại hình dân ca truyền thống, không sử dụng nhạc cụ điện tử.",
     "Sai — Quan họ bắt nguồn từ vùng Kinh Bắc (Bắc Bộ), không phải Nam Bộ."
    ]
   },
   {
    "stem": "Nguyên tắc thiết kế cơ bản trong graphic design (thiết kế đồ họa) gồm những yếu tố nào?",
    "choices": [
     "Cân bằng, tương phản, nhấn mạnh, lặp lại, thống nhất trong bố cục",
     "Chỉ cần dùng càng nhiều màu càng bắt mắt",
     "Không cần bố cục, sắp xếp ngẫu nhiên",
     "Chỉ áp dụng cho thiết kế logo, không dùng cho poster"
    ],
    "answer": 0,
    "explanation": "Các nguyên tắc thiết kế cơ bản gồm: cân bằng (balance), tương phản (contrast), nhấn mạnh (emphasis), lặp lại (repetition) và thống nhất (unity) — áp dụng chung cho mọi sản phẩm đồ họa.",
    "choiceFeedback": [
     "Đúng — đây là các nguyên tắc thiết kế cơ bản, áp dụng chung cho nhiều sản phẩm đồ họa.",
     "Sai — dùng quá nhiều màu không có nguyên tắc thường làm thiết kế rối mắt, kém hiệu quả.",
     "Sai — thiết kế tốt luôn cần bố cục có chủ đích, không phải sắp xếp ngẫu nhiên.",
     "Sai — các nguyên tắc thiết kế áp dụng chung cho logo, poster và nhiều sản phẩm đồ họa khác."
    ]
   },
   {
    "stem": "Bức tranh \"Em Thúy\" nổi tiếng là tác phẩm sơn dầu của họa sĩ nào?",
    "choices": [
     "Trần Văn Cẩn",
     "Tô Ngọc Vân",
     "Nguyễn Phan Chánh",
     "Bùi Xuân Phái"
    ],
    "answer": 0,
    "explanation": "\"Em Thúy\" (1943) là bức tranh sơn dầu nổi tiếng của họa sĩ Trần Văn Cẩn, hiện được lưu giữ tại Bảo tàng Mỹ thuật Việt Nam.",
    "choiceFeedback": [
     "Đúng — Trần Văn Cẩn là tác giả của bức tranh \"Em Thúy\".",
     "Sai — Tô Ngọc Vân nổi tiếng với \"Thiếu nữ bên hoa huệ\", không phải \"Em Thúy\".",
     "Sai — Nguyễn Phan Chánh nổi tiếng với tranh lụa như \"Chơi ô ăn quan\", không phải \"Em Thúy\".",
     "Sai — Bùi Xuân Phái nổi tiếng với tranh phố cổ Hà Nội, không phải tác giả \"Em Thúy\"."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "S8NT-exam-ck2": {
  "id": "S8NT-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Nghệ thuật 8",
  "kind": "quiz",
  "yearLevel": 8,
  "subject": "nghe-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Nghệ thuật 8",
  "questions": [
   {
    "stem": "Đàn bầu là nhạc cụ dân tộc Việt Nam có đặc điểm gì?",
    "choices": [
     "Chỉ có một dây, âm thanh phát ra nhờ kỹ thuật gảy kết hợp uốn cần đàn",
     "Có 16 dây, thuộc bộ gõ",
     "Là nhạc cụ hơi, thổi bằng miệng",
     "Có 2 dây, kéo bằng vĩ giống violin"
    ],
    "answer": 0,
    "explanation": "Đàn bầu là nhạc cụ độc đáo chỉ có một dây, âm sắc được tạo ra nhờ kỹ thuật gảy dây kết hợp uốn cần đàn (vòi đàn) để thay đổi cao độ và tạo âm bồi.",
    "choiceFeedback": [
     "Đúng — đàn bầu chỉ có một dây, dùng kỹ thuật gảy và uốn cần đàn để tạo âm.",
     "Sai — nhạc cụ 16 dây, thuộc bộ dây gảy là đàn tranh, không phải đàn bầu.",
     "Sai — đàn bầu thuộc bộ dây (gảy), không phải nhạc cụ hơi.",
     "Sai — nhạc cụ 2 dây, kéo bằng vĩ là đàn nhị (đàn cò), không phải đàn bầu."
    ]
   },
   {
    "stem": "Đàn tranh (Việt Nam) theo loại phổ biến truyền thống có bao nhiêu dây?",
    "choices": [
     "16 dây",
     "6 dây",
     "1 dây",
     "36 dây"
    ],
    "answer": 0,
    "explanation": "Đàn tranh truyền thống Việt Nam phổ biến nhất là loại 16 dây, còn gọi là đàn thập lục; ngày nay có thêm các loại cải tiến nhiều dây hơn.",
    "choiceFeedback": [
     "Đúng — đàn tranh truyền thống phổ biến là loại 16 dây (đàn thập lục).",
     "Sai — 6 dây là số dây phổ biến của đàn guitar, không phải đàn tranh.",
     "Sai — nhạc cụ chỉ có 1 dây là đàn bầu, không phải đàn tranh.",
     "Sai — 36 dây là đặc điểm của đàn tam thập lục (một nhạc cụ gõ dây khác), không phải đàn tranh."
    ]
   },
   {
    "stem": "Hình thức A-B-A (ba phần) trong âm nhạc là gì?",
    "choices": [
     "Phần A xuất hiện, chuyển sang phần B tương phản, rồi trở lại phần A",
     "Ba đoạn nhạc hoàn toàn khác nhau, không liên quan gì đến nhau",
     "Chỉ có một đoạn nhạc lặp lại duy nhất suốt bài",
     "Bốn đoạn nhạc nối tiếp theo thứ tự A-B-C-D"
    ],
    "answer": 0,
    "explanation": "Hình thức A-B-A gồm phần A (chủ đề chính), phần B tương phản về giai điệu/tính chất, sau đó quay trở lại phần A, tạo cấu trúc cân đối, quen thuộc trong nhiều bài hát và tác phẩm khí nhạc.",
    "choiceFeedback": [
     "Đúng — cấu trúc A-B-A đúng là trình tự chủ đề chính - tương phản - trở lại chủ đề chính.",
     "Sai — ba đoạn không liên quan sẽ không tạo thành một hình thức có cấu trúc như A-B-A.",
     "Sai — chỉ lặp một đoạn duy nhất là hình thức một đoạn (A), không phải ba phần A-B-A.",
     "Sai — đó là mô tả một cấu trúc bốn phần khác hẳn, không phải hình thức A-B-A."
    ]
   },
   {
    "stem": "Trong hình thức Verse-Chorus, Chorus (điệp khúc) có vai trò gì?",
    "choices": [
     "Là đoạn kể chuyện, thay đổi lời ở mỗi lần lặp lại",
     "Là đoạn nhấn mạnh chủ đề chính, giai điệu và lời thường lặp lại giống nhau qua các lần",
     "Là đoạn chuyển tiếp ngắn, chỉ xuất hiện đúng một lần trong bài",
     "Là phần mở đầu không lời của bài hát"
    ],
    "answer": 1,
    "explanation": "Chorus (điệp khúc) là phần cao trào, nhấn mạnh thông điệp/chủ đề chính của bài hát, thường lặp lại với giai điệu và lời gần như giống nhau sau mỗi phiên khúc (verse).",
    "choiceFeedback": [
     "Sai — đó là vai trò của Verse (phiên khúc): kể chuyện, lời thay đổi mỗi lần.",
     "Đúng — Chorus nhấn mạnh chủ đề chính và thường lặp lại giống nhau qua các lần.",
     "Sai — đoạn chuyển tiếp ngắn chỉ xuất hiện một lần thường là Bridge, không phải Chorus.",
     "Sai — phần mở đầu không lời là Intro, khác với Chorus."
    ]
   },
   {
    "stem": "Khi trang trí đồ vật ứng dụng (như vải, áo dài...), cần chú ý điều gì?",
    "choices": [
     "Họa tiết phù hợp với công năng, chất liệu và hình dáng của vật thể",
     "Không cần quan tâm hình dáng vật thể, chỉ cần họa tiết đẹp",
     "Chỉ dùng một màu duy nhất cho mọi sản phẩm",
     "Họa tiết càng phức tạp càng tốt, không cần phù hợp mục đích sử dụng"
    ],
    "answer": 0,
    "explanation": "Trang trí ứng dụng phải gắn với công năng sử dụng thực tế: họa tiết, màu sắc cần phù hợp chất liệu, hình dáng và mục đích của vật thể để vừa đẹp vừa hữu dụng.",
    "choiceFeedback": [
     "Đúng — sự phù hợp giữa họa tiết với công năng, chất liệu, hình dáng vật thể là nguyên tắc quan trọng.",
     "Sai — bỏ qua hình dáng vật thể dễ khiến họa tiết không ăn khớp, mất thẩm mỹ và công năng.",
     "Sai — màu sắc trang trí nên linh hoạt tùy sản phẩm, không cứng nhắc chỉ một màu.",
     "Sai — họa tiết cần phù hợp mục đích sử dụng, không phải càng phức tạp càng tốt."
    ]
   },
   {
    "stem": "Cấu trúc phổ biến của một bài hát hiện đại thường gồm những phần nào?",
    "choices": [
     "Mở đầu (Intro) - Phiên khúc (Verse) - Điệp khúc (Chorus) - Đoạn chuyển (Bridge) - Kết (Outro)",
     "Chỉ có duy nhất một điệp khúc lặp lại toàn bài",
     "Chỉ gồm phần mở đầu và kết thúc, không có nội dung chính",
     "Bắt buộc phải có 4 chương như một bản giao hưởng"
    ],
    "answer": 0,
    "explanation": "Một bài hát hiện đại thường có cấu trúc gồm Intro (mở đầu), Verse (phiên khúc), Chorus (điệp khúc), Bridge (đoạn chuyển) và Outro (kết), sắp xếp linh hoạt tùy tác phẩm.",
    "choiceFeedback": [
     "Đúng — đây là cấu trúc phổ biến của nhiều bài hát hiện đại.",
     "Sai — bài hát cần có Verse để phát triển nội dung, không chỉ lặp một điệp khúc duy nhất.",
     "Sai — thiếu phần Verse/Chorus phát triển nội dung sẽ khiến bài hát thiếu trọn vẹn.",
     "Sai — bài hát phổ thông khác với giao hưởng, không bắt buộc theo cấu trúc 4 chương."
    ]
   },
   {
    "stem": "Sắp đặt (installation art) là gì?",
    "choices": [
     "Hình thức nghệ thuật sắp xếp, bố trí vật thể/không gian ba chiều để tạo trải nghiệm thị giác, cảm xúc cho người xem",
     "Kỹ thuật vẽ tranh sơn dầu truyền thống",
     "Thể loại âm nhạc giao hưởng",
     "Cách trình bày văn bản trên trang giấy"
    ],
    "answer": 0,
    "explanation": "Sắp đặt (installation art) là hình thức nghệ thuật đương đại trong đó nghệ sĩ bố trí vật thể, ánh sáng, âm thanh trong một không gian ba chiều để tạo trải nghiệm tổng thể cho người xem.",
    "choiceFeedback": [
     "Đúng — bố trí vật thể/không gian ba chiều tạo trải nghiệm là bản chất của installation art.",
     "Sai — sơn dầu là kỹ thuật hội họa hai chiều, khác hẳn nghệ thuật sắp đặt không gian ba chiều.",
     "Sai — giao hưởng là thể loại âm nhạc, không liên quan đến nghệ thuật sắp đặt thị giác.",
     "Sai — trình bày văn bản là vấn đề thiết kế trang in, không phải nghệ thuật sắp đặt."
    ]
   },
   {
    "stem": "Vật liệu thường được sử dụng trong nghệ thuật sắp đặt là gì?",
    "choices": [
     "Chỉ giới hạn ở sơn dầu và bút chì",
     "Đa dạng: vật liệu tái chế, ánh sáng, âm thanh, đồ vật thường ngày, không gian thực tế",
     "Chỉ dùng đất sét để nặn tượng",
     "Chỉ dùng giấy dó truyền thống"
    ],
    "answer": 1,
    "explanation": "Nghệ thuật sắp đặt sử dụng vật liệu rất đa dạng, không giới hạn ở chất liệu hội họa truyền thống, mà có thể là vật liệu tái chế, ánh sáng, âm thanh, đồ vật có sẵn, kết hợp với không gian trưng bày thực tế.",
    "choiceFeedback": [
     "Sai — sơn dầu và bút chì là chất liệu của hội họa/vẽ, không phải đặc trưng của sắp đặt.",
     "Đúng — tính đa dạng vật liệu, kể cả phi truyền thống, là đặc trưng của nghệ thuật sắp đặt.",
     "Sai — đất sét là vật liệu điêu khắc truyền thống, sắp đặt không giới hạn chỉ ở đất sét.",
     "Sai — giấy dó là vật liệu của tranh dân gian, không phải đặc trưng riêng của sắp đặt."
    ]
   },
   {
    "stem": "Bố cục 1/3 (rule of thirds) trong nhiếp ảnh là gì?",
    "choices": [
     "Chia khung hình thành 9 phần bằng nhau bởi 2 đường ngang và 2 đường dọc, đặt chủ thể tại các giao điểm để bố cục hài hòa",
     "Chia khung hình làm đôi, đặt chủ thể chính giữa tuyệt đối",
     "Chỉ áp dụng cho ảnh đen trắng",
     "Yêu cầu chủ thể luôn nằm ở góc trên cùng bên trái"
    ],
    "answer": 0,
    "explanation": "Quy tắc 1/3 chia khung hình thành lưới 3x3 (9 ô bằng nhau) bởi 2 đường kẻ ngang và 2 đường kẻ dọc; đặt chủ thể tại các đường kẻ hoặc giao điểm giúp bố cục ảnh hài hòa, tự nhiên hơn so với đặt chính giữa.",
    "choiceFeedback": [
     "Đúng — lưới 3x3 và đặt chủ thể tại giao điểm là đúng bản chất quy tắc 1/3.",
     "Sai — đặt chủ thể chính giữa tuyệt đối là cách bố cục đối xứng, khác với quy tắc 1/3.",
     "Sai — quy tắc 1/3 áp dụng cho cả ảnh màu lẫn ảnh đen trắng, không giới hạn riêng loại nào.",
     "Sai — quy tắc 1/3 không cố định vị trí chủ thể ở một góc duy nhất mà có nhiều điểm giao lựa chọn."
    ]
   },
   {
    "stem": "Bản giao hưởng số mấy của Beethoven có chương cuối sử dụng hợp xướng với lời \"Ode to Joy\"?",
    "choices": [
     "Symphony số 9",
     "Symphony số 5",
     "Symphony số 3 (Eroica)",
     "Symphony số 1"
    ],
    "answer": 0,
    "explanation": "Symphony số 9 của Beethoven, hoàn thành năm 1824, có chương IV nổi tiếng sử dụng hợp xướng và giọng hát phổ nhạc bài thơ \"An die Freude\" (Ode to Joy) của Schiller.",
    "choiceFeedback": [
     "Đúng — Symphony số 9 chính là tác phẩm có chương cuối hợp xướng \"Ode to Joy\".",
     "Sai — Symphony số 5 nổi tiếng với mô-típ 4 nốt mở đầu \"số phận gõ cửa\", không có hợp xướng \"Ode to Joy\".",
     "Sai — Symphony số 3 (Eroica) là tác phẩm không lời dành riêng cho dàn nhạc, không có hợp xướng.",
     "Sai — Symphony số 1 là tác phẩm giao hưởng đầu tay của Beethoven, chưa có chương hợp xướng như Symphony số 9."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
