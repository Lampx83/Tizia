// P3MT — ĐỀ ÔN TẬP (GK1/CK1/GK2/CK2) bám SGK GDPT 2018. Sinh tự động + kiểm định 2 lớp.
// Ráp bởi data/gen-content/assemble-exam-all.mjs — file này chỉ là NGUỒN SEED (content phục vụ từ DB).
export const P3MT_EXAMS = {
 "P3MT-exam-gk1": {
  "id": "P3MT-exam-gk1",
  "title": "Đề kiểm tra giữa học kì I — Mĩ thuật 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "my-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì I — Mĩ thuật 3",
  "questions": [
   {
    "stem": "Ba màu cơ bản trong hội hoạ là những màu nào?",
    "choices": [
     "Đỏ, vàng, xanh dương",
     "Đỏ, cam, tím",
     "Xanh lá, nâu, đen",
     "Hồng, trắng, xám"
    ],
    "answer": 0,
    "explanation": "Ba màu cơ bản (màu gốc) là đỏ, vàng, xanh dương — không pha được từ màu nào khác, từ đó pha ra mọi màu khác.",
    "choiceFeedback": [
     "Đúng — đây là 3 màu gốc, không pha ra từ màu nào khác.",
     "Sai — cam và tím là màu pha ra từ 2 màu cơ bản, không phải màu gốc.",
     "Sai — xanh lá, nâu, đen đều là màu pha, không phải màu cơ bản.",
     "Sai — hồng, trắng, xám là màu pha hoặc màu trung tính, không phải màu cơ bản."
    ]
   },
   {
    "stem": "Khi pha màu đỏ với màu vàng, em được màu gì?",
    "choices": [
     "Tím",
     "Cam",
     "Xanh lá",
     "Nâu"
    ],
    "answer": 1,
    "explanation": "Đỏ + Vàng = Cam, một trong các màu pha cơ bản mà học sinh lớp 3 cần biết.",
    "choiceFeedback": [
     "Sai — tím được pha từ đỏ và xanh dương, không phải đỏ và vàng.",
     "Đúng — đỏ pha với vàng luôn cho ra màu cam.",
     "Sai — xanh lá được pha từ vàng và xanh dương.",
     "Sai — nâu được pha từ nhiều màu (đỏ + xanh + vàng), không chỉ từ đỏ và vàng."
    ]
   },
   {
    "stem": "Nhóm màu nào sau đây là màu nóng?",
    "choices": [
     "Xanh dương, xanh lá, tím xanh",
     "Trắng, đen, xám",
     "Đỏ, cam, vàng",
     "Xanh lá, nâu, xanh dương"
    ],
    "answer": 2,
    "explanation": "Màu nóng gồm đỏ, cam, vàng, hồng đỏ — gợi cảm giác ấm áp như mặt trời, lửa.",
    "choiceFeedback": [
     "Sai — đây là các màu lạnh, gợi cảm giác mát mẻ.",
     "Sai — đây là các màu trung tính, không thuộc nhóm nóng hay lạnh.",
     "Đúng — đỏ, cam, vàng là nhóm màu nóng, gợi cảm giác ấm áp.",
     "Sai — nhóm này lẫn cả màu lạnh (xanh lá, xanh dương)."
    ]
   },
   {
    "stem": "Bạn Lan vẽ bức tranh 'Biển xanh và cát vàng'. Cặp màu này thể hiện điều gì?",
    "choices": [
     "Toàn màu lạnh",
     "Toàn màu nóng",
     "Không có ý nghĩa gì về màu sắc",
     "Phối nóng (cát vàng) - lạnh (biển xanh) làm tranh nổi bật"
    ],
    "answer": 3,
    "explanation": "Biển xanh (lạnh) đặt cạnh cát vàng (nóng) là ví dụ phối màu nóng-lạnh làm cả hai màu nổi bật hơn.",
    "choiceFeedback": [
     "Sai — cát vàng là màu nóng, không phải lạnh.",
     "Sai — biển xanh là màu lạnh, không phải nóng.",
     "Sai — phối màu luôn mang lại hiệu ứng thị giác rõ rệt cho bức tranh.",
     "Đúng — đây chính là cách phối nóng-lạnh làm tranh sống động, nổi bật."
    ]
   },
   {
    "stem": "Để vẽ quả bóng tròn có vẻ nổi khối, em nên làm gì?",
    "choices": [
     "Tô đậm một bên (phía bóng đổ), nhạt một bên (phía sáng)",
     "Tô đều một độ đậm khắp quả bóng",
     "Chỉ dùng nét viền, không tô màu",
     "Tô toàn bộ bằng màu trắng"
    ],
    "answer": 0,
    "explanation": "Tạo độ đậm-nhạt khác nhau giúp vật có chiều sâu, trông có hình khối thay vì bị phẳng.",
    "choiceFeedback": [
     "Đúng — đậm một bên nhạt một bên tạo cảm giác tròn, có khối.",
     "Sai — tô đều một độ đậm sẽ làm hình bị phẳng, không có khối.",
     "Sai — chỉ vẽ nét viền không thể hiện được độ đậm nhạt và khối tròn.",
     "Sai — tô toàn màu trắng sẽ không thấy rõ hình dạng quả bóng."
    ]
   },
   {
    "stem": "Nguyên tắc quan trọng khi trang trí hình vuông là gì?",
    "choices": [
     "Vẽ hoạ tiết chỉ ở một góc",
     "Vẽ đối xứng, cân đối quanh tâm hình vuông",
     "Dùng càng nhiều màu càng đẹp",
     "Không cần tìm tâm hình vuông"
    ],
    "answer": 1,
    "explanation": "Trang trí hình vuông cần đối xứng: 4 góc và 4 cạnh giống nhau, cân đối quanh tâm.",
    "choiceFeedback": [
     "Sai — chỉ vẽ 1 góc sẽ làm hình mất cân đối.",
     "Đúng — đối xứng quanh tâm là nguyên tắc cốt lõi của trang trí hình vuông.",
     "Sai — dùng quá nhiều màu (trên 3-4 màu) dễ làm hoạ tiết rối mắt.",
     "Sai — tìm tâm là bước đầu tiên để vẽ hoạ tiết cân đối."
    ]
   },
   {
    "stem": "Cô giáo yêu cầu vẽ lại con mèo nhà em nhưng không có mèo trước mặt. Em nên làm gì trước tiên?",
    "choices": [
     "Không vẽ vì không nhìn thấy mèo",
     "Vẽ hình một con vật bất kỳ không liên quan",
     "Nhớ lại hình dáng tổng thể rồi vẽ phác trước, thêm chi tiết sau",
     "Chép lại tranh của bạn"
    ],
    "answer": 2,
    "explanation": "Vẽ theo trí nhớ cần nhớ hình dáng tổng thể, vẽ phác trước rồi thêm chi tiết và tô màu sau.",
    "choiceFeedback": [
     "Sai — vẽ theo trí nhớ nghĩa là vẽ dù không có vật mẫu trước mắt.",
     "Sai — cần vẽ đúng con vật được yêu cầu (con mèo), theo trí nhớ của em.",
     "Đúng — nhớ hình dáng chung trước, vẽ phác rồi thêm chi tiết là đúng cách vẽ trí nhớ.",
     "Sai — chép tranh bạn không phải là vẽ theo trí nhớ của chính mình."
    ]
   },
   {
    "stem": "Trong tranh phong cảnh, núi ở gần và núi ở xa nên vẽ khác nhau như thế nào?",
    "choices": [
     "Núi gần vẽ nhỏ và nhạt, núi xa vẽ to và đậm",
     "Cả hai vẽ giống hệt nhau",
     "Không cần vẽ núi xa",
     "Núi gần vẽ to và đậm, núi xa vẽ nhỏ và nhạt"
    ],
    "answer": 3,
    "explanation": "Vật ở gần vẽ lớn, màu đậm; vật ở xa vẽ nhỏ, màu nhạt — tạo cảm giác chiều sâu cho bức tranh.",
    "choiceFeedback": [
     "Sai — đây là ngược lại với nguyên tắc xa-gần trong vẽ phong cảnh.",
     "Sai — vẽ giống hệt nhau sẽ làm tranh bị phẳng, mất chiều sâu.",
     "Sai — núi xa vẫn cần vẽ, chỉ nhỏ và nhạt hơn để thể hiện khoảng cách.",
     "Đúng — gần thì to và đậm, xa thì nhỏ và nhạt, đúng nguyên tắc chiều sâu."
    ]
   },
   {
    "stem": "Kĩ thuật in mộc bản là gì?",
    "choices": [
     "In hình từ một khuôn (gỗ, lá, khoai...) đã bôi mực lên giấy",
     "Vẽ trực tiếp bằng bút chì lên giấy",
     "Xé giấy màu rồi dán thành hình",
     "Nặn đất sét thành hình"
    ],
    "answer": 0,
    "explanation": "In mộc bản là bôi mực lên khuôn (gỗ, lá, khoai...) rồi ấn lên giấy để in ra hình.",
    "choiceFeedback": [
     "Đúng — in mộc bản là bôi mực lên khuôn rồi ấn lên giấy để tạo hình in.",
     "Sai — đó là vẽ, không phải in từ khuôn.",
     "Sai — đó là kĩ thuật tranh xé dán, khác với in mộc bản.",
     "Sai — đó là kĩ thuật tạo hình từ đất nặn, khác với in mộc bản."
    ]
   },
   {
    "stem": "Khi in mộc bản, hình in ra bị nhoè. Nguyên nhân có thể là gì?",
    "choices": [
     "Dùng đúng lượng mực vừa đủ",
     "Ấn quá mạnh hoặc mực quá ướt",
     "Khuôn in được khắc rõ nét",
     "Ấn quá nhẹ và mực quá khô"
    ],
    "answer": 1,
    "explanation": "Ấn quá mạnh hoặc mực quá ướt sẽ làm mực lem ra ngoài hình, gây nhoè.",
    "choiceFeedback": [
     "Sai — lượng mực vừa đủ sẽ cho hình in rõ nét, không nhoè.",
     "Đúng — ấn mạnh tay hoặc mực quá ướt dễ làm mực lem ra ngoài, gây nhoè.",
     "Sai — khuôn khắc rõ nét giúp hình in đẹp, không phải nguyên nhân gây nhoè.",
     "Sai — mực quá khô thường làm hình in bị mờ, nhạt chứ không nhoè."
    ]
   },
   {
    "stem": "Em vẽ bức tranh 'Mặt trời lặn trên biển' và muốn nó thật ấm áp, nổi bật. Em nên phối những màu nào là chủ đạo?",
    "choices": [
     "Chỉ dùng xanh dương và xanh lá",
     "Chỉ dùng màu đen và trắng",
     "Cam, đỏ, vàng làm chủ đạo, có thể thêm chút xanh dương của biển",
     "Dùng đều 7 màu như nhau"
    ],
    "answer": 2,
    "explanation": "Mặt trời lặn cần màu nóng (cam, đỏ, vàng) làm chủ đạo để tạo cảm giác ấm áp, nổi bật.",
    "choiceFeedback": [
     "Sai — toàn màu lạnh sẽ không tạo được cảm giác ấm áp của cảnh mặt trời lặn.",
     "Sai — đen trắng không thể hiện được sắc màu ấm áp của mặt trời lặn.",
     "Đúng — màu nóng làm chủ đạo tạo đúng cảm giác ấm áp cho cảnh hoàng hôn.",
     "Sai — dùng quá nhiều màu bằng nhau sẽ làm tranh rối, mất màu chủ đạo."
    ]
   },
   {
    "stem": "Trên bánh xe màu, hai màu đối diện nhau (ví dụ đỏ và xanh lá) khi đặt cạnh nhau trong một hoạ tiết trang trí sẽ tạo hiệu ứng gì?",
    "choices": [
     "Làm cả hai màu bị mờ nhạt đi",
     "Làm bức tranh trở nên đơn điệu",
     "Không có hiệu ứng gì đặc biệt",
     "Làm cả hai màu nổi bật, tương phản mạnh"
    ],
    "answer": 3,
    "explanation": "Đây là hai màu tương phản (đối diện trên bánh xe màu), đặt cạnh nhau sẽ làm cả hai nổi bật rõ rệt.",
    "choiceFeedback": [
     "Sai — màu tương phản làm nhau nổi bật hơn, không hề mờ nhạt.",
     "Sai — phối tương phản thường tạo hiệu ứng ấn tượng, sinh động chứ không đơn điệu.",
     "Sai — đây là nguyên tắc phối màu quan trọng, luôn tạo hiệu ứng thị giác rõ.",
     "Đúng — hai màu đối diện trên bánh xe là màu tương phản, đặt cạnh nhau sẽ rất nổi bật."
    ]
   }
  ],
  "semester": 1,
  "week": 9,
  "isExam": true
 },
 "P3MT-exam-ck1": {
  "id": "P3MT-exam-ck1",
  "title": "Đề kiểm tra cuối học kì I — Mĩ thuật 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "my-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì I — Mĩ thuật 3",
  "questions": [
   {
    "stem": "Từ 3 màu cơ bản đỏ, vàng, xanh dương, em có thể làm được điều gì?",
    "choices": [
     "Không pha ra được màu nào khác",
     "Pha ra tất cả các màu khác",
     "Chỉ pha được màu đen",
     "Chỉ dùng để vẽ tranh phong cảnh"
    ],
    "answer": 1,
    "explanation": "Ba màu cơ bản đỏ, vàng, xanh dương pha trộn với nhau tạo ra tất cả các màu khác trong hội hoạ.",
    "choiceFeedback": [
     "Sai — ba màu cơ bản chính là gốc để pha ra mọi màu khác.",
     "Đúng — ba màu cơ bản đỏ, vàng, xanh dương pha trộn với nhau tạo ra tất cả các màu khác.",
     "Sai — pha 3 màu cơ bản với nhau thường cho màu nâu/xám, không phải màu đen thuần.",
     "Sai — màu cơ bản dùng được cho mọi thể loại tranh, không chỉ phong cảnh."
    ]
   },
   {
    "stem": "Cách nào sau đây KHÔNG dùng để tạo độ đậm khi vẽ bằng bút chì?",
    "choices": [
     "Tẩy nhiều lần lên nét vẽ",
     "Ấn bút mạnh tay hơn",
     "Tô đi tô lại nhiều lần",
     "Chọn loại chì có ruột mềm, đậm hơn"
    ],
    "answer": 0,
    "explanation": "Tẩy làm nét mờ đi, nhạt hơn chứ không tạo độ đậm cho nét vẽ.",
    "choiceFeedback": [
     "Đúng — tẩy làm nét bị mờ, nhạt đi chứ không tạo độ đậm.",
     "Sai — ấn mạnh tay là một cách tạo nét đậm bằng bút chì.",
     "Sai — tô đi tô lại nhiều lần cũng làm nét đậm hơn.",
     "Sai — chì ruột mềm cho nét đậm hơn chì ruột cứng."
    ]
   },
   {
    "stem": "Tranh Đông Hồ là loại tranh dân gian nổi tiếng của vùng nào?",
    "choices": [
     "Làng gốm Bát Tràng, Hà Nội",
     "Phố cổ Hội An",
     "Làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh",
     "Cố đô Huế"
    ],
    "answer": 2,
    "explanation": "Tranh Đông Hồ có nguồn gốc từ làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh, làm bằng kĩ thuật in mộc bản trên giấy điệp.",
    "choiceFeedback": [
     "Sai — Bát Tràng nổi tiếng về gốm sứ, không phải tranh Đông Hồ.",
     "Sai — Hội An nổi tiếng phố cổ, không phải nơi làm tranh Đông Hồ.",
     "Đúng — tranh Đông Hồ có nguồn gốc từ làng Đông Hồ, huyện Thuận Thành, tỉnh Bắc Ninh.",
     "Sai — Huế là cố đô, không phải nơi làm tranh Đông Hồ."
    ]
   },
   {
    "stem": "Em muốn vẽ một bức tranh theo phong cách Đông Hồ. Đặc điểm nào sau đây là đúng?",
    "choices": [
     "Nét vẽ tả thực, chi tiết như ảnh chụp",
     "Chỉ dùng màu đen trắng",
     "Không có đường viền bao quanh hình",
     "Nét đơn giản, ngộ nghĩnh, có viền đen rõ, màu tươi (đỏ, vàng, xanh)"
    ],
    "answer": 3,
    "explanation": "Tranh Đông Hồ có nét vẽ đơn giản, ngộ nghĩnh, đường viền đen rõ và màu sắc tươi tắn.",
    "choiceFeedback": [
     "Sai — tranh Đông Hồ có nét đơn giản, ngộ nghĩnh, không tả thực chi tiết.",
     "Sai — tranh Đông Hồ dùng màu sắc tươi (đỏ, vàng, xanh), không chỉ đen trắng.",
     "Sai — tranh Đông Hồ có đường viền đen rõ bao quanh hình.",
     "Đúng — đây đúng là đặc điểm của tranh dân gian Đông Hồ."
    ]
   },
   {
    "stem": "Khi làm mặt nạ giấy, bước nào là bắt buộc để có thể đeo và nhìn được?",
    "choices": [
     "Vẽ thêm râu",
     "Cắt 2 lỗ ở đúng vị trí mắt",
     "Buộc dây thun màu sặc sỡ",
     "Vẽ hoa văn cầu kỳ"
    ],
    "answer": 1,
    "explanation": "Phải cắt 2 lỗ đúng vị trí mắt thì người đeo mới nhìn ra ngoài và đi lại được.",
    "choiceFeedback": [
     "Sai — vẽ râu chỉ là trang trí thêm, không bắt buộc để đeo được.",
     "Đúng — phải cắt lỗ đúng vị trí mắt thì mới nhìn ra ngoài khi đeo mặt nạ.",
     "Sai — màu dây thun không ảnh hưởng đến việc nhìn thấy khi đeo.",
     "Sai — hoa văn là phần trang trí thêm, không phải điều kiện bắt buộc."
    ]
   },
   {
    "stem": "Origami là nghệ thuật gấp giấy có nguồn gốc từ đâu?",
    "choices": [
     "Việt Nam",
     "Trung Quốc",
     "Nhật Bản",
     "Hàn Quốc"
    ],
    "answer": 2,
    "explanation": "Origami là nghệ thuật gấp giấy truyền thống của Nhật Bản; 'ori' nghĩa là gấp, 'kami' là giấy.",
    "choiceFeedback": [
     "Sai — Origami không có nguồn gốc từ Việt Nam.",
     "Sai — Origami không có nguồn gốc từ Trung Quốc.",
     "Đúng — Origami là nghệ thuật gấp giấy truyền thống của Nhật Bản.",
     "Sai — Origami không có nguồn gốc từ Hàn Quốc."
    ]
   },
   {
    "stem": "Theo truyền thuyết Nhật Bản, gấp đủ 1.000 con hạc giấy sẽ mang lại điều gì?",
    "choices": [
     "Một điều ước, biểu tượng hoà bình",
     "Thật nhiều tiền bạc",
     "Một chuyến du lịch miễn phí",
     "Không có ý nghĩa gì đặc biệt"
    ],
    "answer": 0,
    "explanation": "Truyền thuyết Nhật Bản nói rằng gấp 1.000 con hạc giấy sẽ được điều ước, mang ý nghĩa hoà bình.",
    "choiceFeedback": [
     "Đúng — truyền thuyết Nhật Bản nói gấp 1.000 con hạc giấy sẽ được điều ước, mang ý nghĩa hoà bình.",
     "Sai — truyền thuyết không nói về tiền bạc.",
     "Sai — truyền thuyết không liên quan đến du lịch.",
     "Sai — con hạc giấy mang ý nghĩa hoà bình, may mắn rất sâu sắc trong văn hoá Nhật."
    ]
   },
   {
    "stem": "Em muốn vẽ con thỏ sao cho dễ nhận ra ngay. Em cần chú ý đặc điểm nổi bật nào?",
    "choices": [
     "Vẽ đuôi thật dài",
     "Vẽ mỏ dẹt như con vịt",
     "Vẽ vằn sọc như con hổ",
     "Vẽ hai tai dài đặc trưng của thỏ"
    ],
    "answer": 3,
    "explanation": "Hai tai dài là đặc điểm nổi bật, dễ nhận biết nhất của con thỏ khi vẽ.",
    "choiceFeedback": [
     "Sai — đuôi thỏ ngắn và tròn, không dài.",
     "Sai — mỏ dẹt là đặc điểm của con vịt, không phải thỏ.",
     "Sai — vằn sọc là đặc điểm của con hổ, không phải thỏ.",
     "Đúng — hai tai dài là đặc điểm dễ nhận biết nhất của con thỏ."
    ]
   },
   {
    "stem": "Theo tỉ lệ khuôn mặt cơ bản, hai mắt nên được vẽ ở vị trí nào?",
    "choices": [
     "Ở phần trên cùng, sát tóc",
     "Ở giữa mặt (đường chia ngang khuôn mặt)",
     "Ở ngay trên miệng",
     "Ở hai bên tai"
    ],
    "answer": 1,
    "explanation": "Theo tỉ lệ cơ bản của khuôn mặt, hai mắt nằm ở khoảng giữa mặt, trên đường chia ngang.",
    "choiceFeedback": [
     "Sai — vẽ mắt sát tóc, ở trên cùng sẽ làm khuôn mặt trông sai tỉ lệ.",
     "Đúng — theo tỉ lệ cơ bản, hai mắt nằm ở khoảng giữa khuôn mặt.",
     "Sai — vị trí ngay trên miệng là vị trí của mũi, không phải mắt.",
     "Sai — hai bên tai không phải là vị trí của mắt trên khuôn mặt."
    ]
   },
   {
    "stem": "Bạn của em đeo kính. Khi vẽ chân dung bạn, em nên vẽ theo thứ tự nào?",
    "choices": [
     "Vẽ gọng kính trước, không cần vẽ mắt",
     "Vẽ tóc trước, kính sau cùng không cần chính xác vị trí",
     "Vẽ mắt trước, rồi vẽ vòng tròn gọng kính bao quanh mắt",
     "Vẽ kính ở vị trí bất kỳ trên mặt"
    ],
    "answer": 2,
    "explanation": "Nên vẽ mắt trước rồi vẽ vòng tròn gọng kính bao quanh mắt để kính ở đúng vị trí.",
    "choiceFeedback": [
     "Sai — vẫn cần vẽ mắt vì kính chỉ là vật đeo bao quanh mắt.",
     "Sai — kính cần đặt đúng vị trí quanh mắt, không phải tuỳ ý.",
     "Đúng — vẽ mắt trước rồi vẽ gọng kính bao quanh là đúng thứ tự và vị trí.",
     "Sai — kính phải đặt đúng vị trí quanh mắt để chân dung hợp lý."
    ]
   },
   {
    "stem": "Em có một vỏ chai nhựa đã rửa sạch. Em có thể tái chế thành vật gì hữu ích?",
    "choices": [
     "Không thể dùng làm gì cả, chỉ nên bỏ đi",
     "Chỉ có thể đốt bỏ",
     "Nấu chảy thành đồ nhựa mới ngay tại nhà",
     "Cắt làm chậu trồng cây hoặc ống đựng bút"
    ],
    "answer": 3,
    "explanation": "Cắt vỏ chai nhựa làm chậu trồng cây hoặc ống đựng bút là cách tái chế đơn giản, phù hợp học sinh lớp 3.",
    "choiceFeedback": [
     "Sai — vỏ chai nhựa hoàn toàn có thể tái chế thành đồ dùng khác.",
     "Sai — đốt nhựa gây ô nhiễm, không phải cách tái chế đúng.",
     "Sai — nấu chảy nhựa tại nhà không an toàn và không phải kĩ thuật mĩ thuật lớp 3.",
     "Đúng — cắt vỏ chai làm chậu cây hoặc ống bút là cách tái chế đơn giản, hữu ích."
    ]
   },
   {
    "stem": "Một dải hoạ tiết trang trí gấu áo được tạo bằng cách nào?",
    "choices": [
     "Vẽ một hoạ tiết nhỏ rồi lặp lại đều nhau dọc theo gấu áo",
     "Vẽ mỗi chỗ một hoạ tiết khác nhau, không theo quy luật",
     "Chỉ vẽ một hoạ tiết duy nhất ở giữa gấu áo",
     "Không cần hoạ tiết, để trơn là đẹp nhất"
    ],
    "answer": 0,
    "explanation": "Hoạ tiết trang trí là hình vẽ lặp lại đều đặn theo quy luật, tạo thành dải viền đẹp mắt.",
    "choiceFeedback": [
     "Đúng — hoạ tiết trang trí là hình lặp lại đều theo quy luật, tạo thành dải viền đẹp mắt.",
     "Sai — hoạ tiết trang trí cần lặp lại theo quy luật, không phải ngẫu nhiên khác nhau.",
     "Sai — một hoạ tiết ở giữa không tạo thành dải hoạ tiết viền dọc gấu áo.",
     "Sai — hoạ tiết là cách phổ biến để trang trí gấu áo đẹp và sinh động hơn."
    ]
   }
  ],
  "semester": 1,
  "week": 18,
  "isExam": true
 },
 "P3MT-exam-gk2": {
  "id": "P3MT-exam-gk2",
  "title": "Đề kiểm tra giữa học kì II — Mĩ thuật 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "my-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra giữa học kì II — Mĩ thuật 3",
  "questions": [
   {
    "stem": "Hoa nào là biểu tượng của Tết ở miền Bắc Việt Nam?",
    "choices": [
     "Hoa mai vàng",
     "Hoa đào hồng",
     "Hoa sen",
     "Hoa hồng"
    ],
    "answer": 1,
    "explanation": "Hoa đào là biểu tượng Tết đặc trưng ở miền Bắc, còn hoa mai là ở miền Nam.",
    "choiceFeedback": [
     "Sai — hoa mai vàng là biểu tượng Tết ở miền Nam.",
     "Đúng — hoa đào là biểu tượng Tết đặc trưng của miền Bắc.",
     "Sai — hoa sen là quốc hoa Việt Nam, không riêng cho ngày Tết.",
     "Sai — hoa hồng không phải biểu tượng đặc trưng của ngày Tết."
    ]
   },
   {
    "stem": "Em vẽ tranh 'Ngày Tết quê em' nhưng chỉ dùng toàn màu xanh dương và xanh lá. Tranh có hợp không khí Tết không?",
    "choices": [
     "Rất hợp vì Tết cần sự yên tĩnh",
     "Hợp, vì màu nào cũng vẽ được Tết",
     "Không hợp, cần thêm màu đỏ, vàng để có không khí rực rỡ",
     "Không quan trọng, Tết không cần màu sắc đặc biệt"
    ],
    "answer": 2,
    "explanation": "Tết cần phối màu đỏ, vàng rực rỡ (câu đối đỏ, hoa mai/đào) để đúng không khí ngày lễ.",
    "choiceFeedback": [
     "Sai — Tết là dịp vui tươi, rực rỡ, không phải yên tĩnh trầm lắng.",
     "Sai — màu sắc cần phù hợp với không khí của chủ đề, không phải màu nào cũng hợp.",
     "Đúng — Tết cần màu đỏ, vàng rực rỡ (câu đối đỏ, hoa mai/đào) để đúng không khí.",
     "Sai — màu sắc rất quan trọng để thể hiện đúng không khí ngày Tết."
    ]
   },
   {
    "stem": "Khi vẽ tranh về mẹ, yếu tố nào giúp bức tranh thể hiện tình cảm ấm áp nhất?",
    "choices": [
     "Vẽ mẹ với khuôn mặt nghiêm nghị",
     "Vẽ mẹ đứng một mình, không có ai bên cạnh",
     "Vẽ mẹ bằng màu đen trắng",
     "Vẽ mẹ đang cười, có chi tiết như tay mẹ ôm em hoặc vuốt tóc em"
    ],
    "answer": 3,
    "explanation": "Nét mặt tươi cười và các chi tiết thân mật (tay mẹ ôm em) thể hiện rõ tình cảm yêu thương.",
    "choiceFeedback": [
     "Sai — khuôn mặt nghiêm nghị không thể hiện được sự ấm áp, gần gũi.",
     "Sai — có hình ảnh em bên mẹ sẽ thể hiện tình cảm rõ hơn.",
     "Sai — màu sắc tươi sáng sẽ thể hiện cảm xúc tốt hơn màu đen trắng.",
     "Đúng — nét mặt tươi cười và chi tiết thân mật thể hiện rõ tình cảm yêu thương."
    ]
   },
   {
    "stem": "Bạn Nam sống ở nông thôn muốn vẽ tranh 'Quê hương em'. Cảnh vật nào phù hợp nhất?",
    "choices": [
     "Cánh đồng lúa, con trâu, ao cá, cây tre",
     "Nhà cao tầng, cầu vượt, xe hơi",
     "Núi tuyết và cực quang",
     "Sa mạc và lạc đà"
    ],
    "answer": 0,
    "explanation": "Cánh đồng lúa, con trâu, ao cá, cây tre là những hình ảnh đặc trưng của làng quê nông thôn Việt Nam.",
    "choiceFeedback": [
     "Đúng — đây là những hình ảnh đặc trưng của làng quê nông thôn Việt Nam.",
     "Sai — đó là cảnh thành phố, không phù hợp với quê nông thôn của Nam.",
     "Sai — Việt Nam không có núi tuyết, cực quang, không phải cảnh quê hương thực tế.",
     "Sai — Việt Nam không có sa mạc, lạc đà, không phải cảnh quê hương thực tế."
    ]
   },
   {
    "stem": "Bạn Hoa sống ở thành phố, chưa từng ở nông thôn. Bạn có thể vẽ tranh 'Quê hương em' không?",
    "choices": [
     "Không, vì tranh quê hương chỉ được vẽ cảnh nông thôn",
     "Không, vì thành phố không phải là quê hương",
     "Có, bạn có thể vẽ phố, nhà, công viên nơi mình sống — đó cũng là quê hương",
     "Có, nhưng phải vẽ giống hệt tranh của bạn khác"
    ],
    "answer": 2,
    "explanation": "Quê hương là nơi mình sinh sống và gắn bó, thành phố cũng là quê hương của em.",
    "choiceFeedback": [
     "Sai — quê hương không chỉ giới hạn ở cảnh nông thôn.",
     "Sai — nơi mình sinh sống, kể cả thành phố, vẫn là quê hương của mình.",
     "Đúng — quê hương là nơi mình sống và gắn bó, thành phố cũng là quê hương.",
     "Sai — mỗi bức tranh nên thể hiện quê hương riêng của từng bạn, không cần giống nhau."
    ]
   },
   {
    "stem": "Kĩ thuật nào sau đây KHÔNG phải là kĩ thuật nặn đất cơ bản?",
    "choices": [
     "Vê tròn",
     "Cắt bằng kéo sắc",
     "Ấn dẹt",
     "Ghép các phần với nhau"
    ],
    "answer": 1,
    "explanation": "Nặn đất dùng tay để vê, ấn, ghép; cắt bằng kéo sắc không phải là kĩ thuật nặn đất cơ bản.",
    "choiceFeedback": [
     "Sai — vê tròn là kĩ thuật nặn đất cơ bản.",
     "Đúng — cắt bằng kéo không phải là kĩ thuật nặn đất; nặn dùng tay để vê, ấn, ghép.",
     "Sai — ấn dẹt là kĩ thuật nặn đất cơ bản.",
     "Sai — ghép các phần lại là kĩ thuật nặn đất cơ bản."
    ]
   },
   {
    "stem": "Tranh tuyên truyền 'Bảo vệ môi trường' thường thể hiện nội dung gì?",
    "choices": [
     "Cảnh xe cộ đông đúc gây tắc đường",
     "Cảnh thi đấu thể thao",
     "Cảnh chợ hoa ngày Tết",
     "Cảnh trồng cây, nhặt rác hoặc rừng xanh cần bảo vệ"
    ],
    "answer": 3,
    "explanation": "Hành động trồng cây, nhặt rác hoặc cảnh rừng xanh là nội dung phù hợp với chủ đề bảo vệ môi trường.",
    "choiceFeedback": [
     "Sai — tắc đường không liên quan trực tiếp đến chủ đề bảo vệ môi trường.",
     "Sai — thi đấu thể thao không phải nội dung của tranh bảo vệ môi trường.",
     "Sai — chợ hoa ngày Tết là chủ đề khác, không phải bảo vệ môi trường.",
     "Đúng — hành động trồng cây, nhặt rác hoặc cảnh rừng xanh là nội dung phù hợp với chủ đề này."
    ]
   },
   {
    "stem": "Em vẽ tranh 'Bảo vệ môi trường' và muốn thêm khẩu hiệu. Câu nào sau đây phù hợp?",
    "choices": [
     "'Vì một Trái Đất xanh'",
     "'Học, học nữa, học mãi'",
     "'Kính thầy, yêu bạn'",
     "'Ăn quả nhớ kẻ trồng cây'"
    ],
    "answer": 0,
    "explanation": "'Vì một Trái Đất xanh' là khẩu hiệu phù hợp với chủ đề bảo vệ môi trường.",
    "choiceFeedback": [
     "Đúng — đây là khẩu hiệu phù hợp với chủ đề bảo vệ môi trường.",
     "Sai — đây là khẩu hiệu về học tập, không liên quan môi trường.",
     "Sai — đây là khẩu hiệu về đạo đức học đường, không liên quan môi trường.",
     "Sai — đây là câu tục ngữ về lòng biết ơn, không phải khẩu hiệu môi trường."
    ]
   },
   {
    "stem": "Đặc điểm quan trọng của kĩ thuật tranh xé dán là gì?",
    "choices": [
     "Dùng kéo cắt giấy thật thẳng",
     "Vẽ chì trước rồi tô màu, không dán gì",
     "Xé giấy bằng tay (không dùng kéo) rồi dán thành hình",
     "Chỉ dùng một màu giấy duy nhất"
    ],
    "answer": 2,
    "explanation": "Tranh xé dán phải xé giấy bằng tay (không dùng kéo) rồi dán lên nền, tạo hiệu ứng mộc mạc, đáng yêu.",
    "choiceFeedback": [
     "Sai — tranh xé dán phải xé bằng tay, không dùng kéo cắt.",
     "Sai — đây là mô tả của tranh vẽ tô màu, không phải xé dán.",
     "Đúng — xé giấy bằng tay rồi dán lên nền là đặc trưng của kĩ thuật này.",
     "Sai — tranh xé dán thường dùng nhiều màu giấy khác nhau để tạo hình sinh động."
    ]
   },
   {
    "stem": "Bức tranh có lá vàng rơi, trăng tròn, gió mát là đặc trưng của mùa nào?",
    "choices": [
     "Mùa xuân",
     "Mùa thu",
     "Mùa hè",
     "Mùa đông"
    ],
    "answer": 1,
    "explanation": "Lá vàng rơi, trăng tròn, gió mát là hình ảnh đặc trưng của mùa thu.",
    "choiceFeedback": [
     "Sai — mùa xuân đặc trưng bởi hoa nở, lá non, không phải lá vàng rơi.",
     "Đúng — lá vàng rơi, trăng tròn, gió mát là hình ảnh đặc trưng của mùa thu.",
     "Sai — mùa hè đặc trưng bởi nắng vàng, hoa phượng đỏ, ve kêu.",
     "Sai — mùa đông đặc trưng bởi cây trụi lá, trời lạnh, không phải lá vàng rơi."
    ]
   },
   {
    "stem": "Em muốn vẽ phong cảnh mùa hè. Chi tiết nào sau đây phù hợp nhất?",
    "choices": [
     "Cây trụi lá, người mặc áo ấm",
     "Hoa đào nở, mưa phùn",
     "Lá vàng rụng, trăng tròn",
     "Hoa phượng đỏ nở rộ, nắng vàng, ve kêu"
    ],
    "answer": 3,
    "explanation": "Hoa phượng đỏ, nắng vàng, ve kêu là hình ảnh đặc trưng của mùa hè ở Việt Nam.",
    "choiceFeedback": [
     "Sai — đây là đặc trưng của mùa đông, không phải mùa hè.",
     "Sai — đây là đặc trưng của mùa xuân, không phải mùa hè.",
     "Sai — đây là đặc trưng của mùa thu, không phải mùa hè.",
     "Đúng — hoa phượng đỏ, nắng vàng, ve kêu là hình ảnh đặc trưng của mùa hè."
    ]
   },
   {
    "stem": "Vì sao hình tròn được coi là hình đối xứng đặc biệt?",
    "choices": [
     "Vì hình tròn không có trục đối xứng nào",
     "Vì hình tròn chỉ đối xứng qua đúng 1 đường duy nhất",
     "Vì mọi đường thẳng đi qua tâm đều chia hình tròn thành 2 nửa giống nhau",
     "Vì hình tròn không có tâm"
    ],
    "answer": 2,
    "explanation": "Mọi đường kính (đường thẳng đi qua tâm) đều là trục đối xứng của hình tròn, nên hình tròn có vô số trục đối xứng.",
    "choiceFeedback": [
     "Sai — hình tròn có vô số trục đối xứng, không phải không có.",
     "Sai — hình tròn có vô số đường đối xứng, không chỉ 1 đường.",
     "Đúng — mọi đường kính (qua tâm) đều là trục đối xứng của hình tròn.",
     "Sai — hình tròn luôn có tâm, đó là điểm cách đều mọi điểm trên đường tròn."
    ]
   }
  ],
  "semester": 2,
  "week": 27,
  "isExam": true
 },
 "P3MT-exam-ck2": {
  "id": "P3MT-exam-ck2",
  "title": "Đề kiểm tra cuối học kì II — Mĩ thuật 3",
  "kind": "quiz",
  "yearLevel": 3,
  "subject": "my-thuat",
  "difficulty": 3,
  "description": "Đề kiểm tra cuối học kì II — Mĩ thuật 3",
  "questions": [
   {
    "stem": "Ngày Tết ở miền Nam, hoa nào thường được trưng bày?",
    "choices": [
     "Hoa mai vàng",
     "Hoa đào hồng",
     "Hoa sen",
     "Hoa cúc trắng"
    ],
    "answer": 0,
    "explanation": "Hoa mai vàng là biểu tượng Tết đặc trưng ở miền Nam Việt Nam.",
    "choiceFeedback": [
     "Đúng — hoa mai vàng là biểu tượng Tết đặc trưng ở miền Nam.",
     "Sai — hoa đào là biểu tượng Tết của miền Bắc.",
     "Sai — hoa sen là quốc hoa Việt Nam, không riêng ngày Tết.",
     "Sai — hoa cúc trắng không phải biểu tượng đặc trưng ngày Tết."
    ]
   },
   {
    "stem": "Trong tranh 'Bảo vệ môi trường', hình ảnh nào thể hiện hành động tích cực?",
    "choices": [
     "Khói đen từ nhà máy",
     "Trẻ em trồng cây, nhặt rác",
     "Rác thải chất đống",
     "Rừng bị chặt phá"
    ],
    "answer": 1,
    "explanation": "Trẻ em trồng cây, nhặt rác là hành động tích cực, phù hợp thể hiện tinh thần bảo vệ môi trường.",
    "choiceFeedback": [
     "Sai — đây là hình ảnh tiêu cực cần thay đổi, không phải hành động tích cực.",
     "Đúng — trồng cây, nhặt rác là hành động tích cực bảo vệ môi trường.",
     "Sai — đây là hình ảnh tiêu cực, phản ánh vấn đề cần giải quyết.",
     "Sai — đây là hình ảnh tiêu cực về tàn phá môi trường."
    ]
   },
   {
    "stem": "Bạn Mai vẽ tranh với cây cối trụi lá và mọi người mặc áo ấm dày. Đó là mùa nào?",
    "choices": [
     "Xuân",
     "Hạ",
     "Thu",
     "Đông"
    ],
    "answer": 3,
    "explanation": "Cây trụi lá và mọi người mặc áo ấm dày là hình ảnh đặc trưng của mùa đông.",
    "choiceFeedback": [
     "Sai — mùa xuân có lá non, hoa nở, không phải trụi lá.",
     "Sai — mùa hè nắng nóng, không mặc áo ấm dày.",
     "Sai — mùa thu lá vàng rụng nhưng cây chưa trụi hết, trời chỉ mát chứ chưa lạnh sâu.",
     "Đúng — cây trụi lá và mặc áo ấm dày là đặc trưng mùa đông."
    ]
   },
   {
    "stem": "Em vẽ con bướm nhưng một cánh to, một cánh nhỏ hơn hẳn. Em nên sửa thế nào?",
    "choices": [
     "Giữ nguyên vì bướm thật cũng như vậy",
     "Xoá cả 2 cánh, không vẽ bướm nữa",
     "Vẽ trục đối xứng ở giữa, chỉnh 2 cánh giống nhau qua trục đó",
     "Tô màu đậm cho cánh nhỏ để che khuyết điểm"
    ],
    "answer": 2,
    "explanation": "Bướm có 2 cánh đối xứng; nên vẽ trục giữa và chỉnh 2 cánh giống nhau qua trục để hình cân đối.",
    "choiceFeedback": [
     "Sai — bướm thật có 2 cánh đối xứng gần như bằng nhau.",
     "Sai — không cần bỏ vẽ, chỉ cần chỉnh lại cho đối xứng.",
     "Đúng — vẽ trục giữa và chỉnh 2 cánh đối xứng qua trục là cách sửa đúng.",
     "Sai — tô màu đậm không giải quyết được vấn đề kích thước không đối xứng."
    ]
   },
   {
    "stem": "Khi làm thiệp chúc mừng tặng mẹ ngày 8/3, lời chúc nên như thế nào?",
    "choices": [
     "Ngắn gọn, chân thật, khoảng 2-3 câu",
     "Dài ít nhất 3 trang giấy",
     "Không cần viết gì, chỉ cần vẽ hình",
     "Chép nguyên lời chúc trên mạng"
    ],
    "answer": 0,
    "explanation": "Lời chúc ngắn gọn, chân thật (khoảng 2-3 câu) là đẹp và ý nghĩa nhất khi làm thiệp tặng mẹ.",
    "choiceFeedback": [
     "Đúng — lời chúc ngắn gọn, chân thật là đẹp và ý nghĩa nhất.",
     "Sai — lời chúc quá dài không cần thiết và khó đọc hết.",
     "Sai — lời chúc bằng chữ giúp thiệp thêm ý nghĩa và tình cảm.",
     "Sai — lời chúc nên xuất phát từ tình cảm thật của em, không nên chép nguyên văn."
    ]
   },
   {
    "stem": "Lớp em chuẩn bị trang trí chào mừng ngày 20/11. Hoạt động nào phù hợp?",
    "choices": [
     "Xé bỏ các tranh đã treo trong lớp",
     "Vẽ tranh tặng cô, cắt chữ 'Chúc mừng cô' dán lên bảng",
     "Không trang trí gì, chỉ học bình thường",
     "Chỉ một mình em trang trí, không rủ bạn"
    ],
    "answer": 1,
    "explanation": "Vẽ tranh tặng cô và cắt chữ chúc mừng dán lên bảng là hoạt động trang trí phù hợp với dịp 20/11.",
    "choiceFeedback": [
     "Sai — không nên xé bỏ tranh, mà nên thêm trang trí phù hợp với dịp lễ.",
     "Đúng — vẽ tranh tặng cô và trang trí chữ chúc mừng là hoạt động phù hợp với 20/11.",
     "Sai — dịp lễ nên có trang trí để không khí lớp học vui tươi, ý nghĩa hơn.",
     "Sai — trang trí lớp là việc chung, nên cùng các bạn tham gia sẽ vui và nhanh hơn."
    ]
   },
   {
    "stem": "Bức tranh 'Trường em' vẽ toà nhà trường to chiếm hết khung giấy, không có cây xanh hay sân trường. Bức tranh có cần chỉnh sửa không?",
    "choices": [
     "Không, trường càng to càng đẹp",
     "Không, không cần cây xanh trong tranh trường học",
     "Có, nên xoá hết trường và chỉ vẽ cây xanh",
     "Có, nên thu nhỏ trường một chút và thêm cây xanh, sân chơi cho sinh động"
    ],
    "answer": 3,
    "explanation": "Nên thu nhỏ toà nhà trường và thêm cây xanh, sân chơi để bố cục cân đối, bức tranh sinh động hơn.",
    "choiceFeedback": [
     "Sai — trường quá to sẽ làm mất cân đối bố cục, thiếu các chi tiết khác.",
     "Sai — cây xanh giúp bức tranh sinh động và có bố cục cân đối hơn.",
     "Sai — không cần xoá hết trường, chỉ cần điều chỉnh tỉ lệ và thêm chi tiết.",
     "Đúng — thu nhỏ trường và thêm cây xanh, sân chơi sẽ làm bố cục cân đối, sinh động hơn."
    ]
   },
   {
    "stem": "Hoa nào được xem là quốc hoa của Việt Nam, thường xuất hiện trong hoạ tiết dân tộc?",
    "choices": [
     "Hoa hồng",
     "Hoa mai",
     "Hoa sen",
     "Hoa cúc"
    ],
    "answer": 2,
    "explanation": "Hoa sen là quốc hoa Việt Nam, biểu tượng cho sự thuần khiết và thường xuất hiện trong hoạ tiết dân tộc.",
    "choiceFeedback": [
     "Sai — hoa hồng không phải quốc hoa Việt Nam.",
     "Sai — hoa mai là biểu tượng Tết miền Nam, không phải quốc hoa.",
     "Đúng — hoa sen là quốc hoa Việt Nam, biểu tượng cho sự thuần khiết.",
     "Sai — hoa cúc không phải quốc hoa Việt Nam."
    ]
   },
   {
    "stem": "Em phối 7 màu khác nhau trong một bức tranh trang trí. Điều gì có thể xảy ra?",
    "choices": [
     "Tranh chắc chắn sẽ đẹp hơn vì nhiều màu",
     "Tranh dễ bị rối mắt, mất đi màu chủ đạo",
     "Đây là cách phối màu chuẩn nhất",
     "Không có ảnh hưởng gì đến bức tranh"
    ],
    "answer": 1,
    "explanation": "Dùng quá nhiều màu (trên 3-4 màu) trong một bức tranh dễ làm tranh rối mắt và mất đi màu chủ đạo.",
    "choiceFeedback": [
     "Sai — dùng quá nhiều màu thường làm tranh rối, không đẹp hơn.",
     "Đúng — quá nhiều màu (trên 3-4 màu) dễ làm tranh rối mắt, thiếu màu chủ đạo.",
     "Sai — nguyên tắc phối màu tốt thường giới hạn 3-4 màu, có màu chủ đạo.",
     "Sai — số lượng màu sắc ảnh hưởng rất lớn đến sự hài hoà của bức tranh."
    ]
   },
   {
    "stem": "Em không nghĩ ra đề tài để vẽ tranh tự chọn. Lời khuyên nào hợp lý nhất?",
    "choices": [
     "Nhìn quanh cuộc sống của mình: vẽ phòng em, thú cưng, hoặc kỉ niệm vui",
     "Không vẽ gì cả vì không có ý tưởng",
     "Chép nguyên tranh của bạn khác",
     "Chỉ vẽ những gì cô giáo đã vẽ mẫu, không sáng tạo thêm"
    ],
    "answer": 0,
    "explanation": "Quan sát cuộc sống quanh mình (phòng ở, thú cưng, kỉ niệm) luôn cho ra nhiều đề tài thú vị để vẽ.",
    "choiceFeedback": [
     "Đúng — quan sát cuộc sống quanh mình luôn có rất nhiều đề tài thú vị để vẽ.",
     "Sai — luôn có thể tìm được đề tài nếu quan sát xung quanh mình.",
     "Sai — chép tranh bạn không thể hiện được sự sáng tạo của riêng em.",
     "Sai — đề tài tự chọn khuyến khích em sáng tạo theo ý riêng, không chỉ chép mẫu."
    ]
   },
   {
    "stem": "Khi xem tranh của bạn trong buổi triển lãm cuối năm, em nên có thái độ như thế nào?",
    "choices": [
     "Cười chê nếu tranh bạn vẽ chưa đẹp",
     "Không quan tâm, chỉ xem tranh của mình",
     "So sánh tranh bạn với tranh mình để hơn thua",
     "Khen ngợi điểm tốt, góp ý nhẹ nhàng nếu được hỏi"
    ],
    "answer": 3,
    "explanation": "Khen ngợi điểm tốt và góp ý nhẹ nhàng thể hiện sự tôn trọng công sức của bạn và tinh thần học hỏi.",
    "choiceFeedback": [
     "Sai — chê bai tranh bạn là không tôn trọng công sức của bạn.",
     "Sai — nên xem và học hỏi từ tranh của các bạn khác nữa.",
     "Sai — triển lãm là dịp chia sẻ, không phải để so sánh hơn thua.",
     "Đúng — khen ngợi và góp ý nhẹ nhàng thể hiện sự tôn trọng và tinh thần học hỏi."
    ]
   },
   {
    "stem": "Trong năm học mỹ thuật lớp 3, em đã được học những kĩ thuật tạo hình nào?",
    "choices": [
     "Chỉ vẽ bằng bút chì",
     "Chỉ tô màu nước",
     "Nhiều kĩ thuật: vẽ chì, sáp, màu nước, in mộc bản, Origami, nặn đất, xé dán",
     "Chỉ học lý thuyết, không thực hành"
    ],
    "answer": 2,
    "explanation": "Chương trình lớp 3 gồm rất nhiều kĩ thuật tạo hình đa dạng: vẽ chì, sáp, màu nước, in mộc bản, Origami, nặn đất, xé dán.",
    "choiceFeedback": [
     "Sai — chương trình còn có nhiều kĩ thuật khác ngoài vẽ bút chì.",
     "Sai — màu nước chỉ là một trong nhiều kĩ thuật đã học.",
     "Đúng — năm học đã bao gồm rất nhiều kĩ thuật tạo hình đa dạng.",
     "Sai — chương trình có nhiều hoạt động thực hành phong phú, không chỉ lý thuyết."
    ]
   }
  ],
  "semester": 2,
  "week": 35,
  "isExam": true
 }
};
