const GPP = {
  id: "gpp",
  npcKind: "patient",   // khách hàng ≈ bệnh nhân → áp bộ quy tắc bệnh nhân
  chiefComplaintLines: [
    "Dạ em bị ho với sổ mũi hai hôm nay rồi, em muốn mua ít kháng sinh cho nhanh khỏi ạ.",
    "Em ho và sổ mũi mấy bữa nay, ra nhờ dược sĩ bán cho ít thuốc ạ.",
  ],
  title: "Nhà thuốc Thực Hành",
  setting:
    "Quầy thuốc GPP, tủ phân loại thuốc, máy POS, khu vực chờ. Khách hàng nữ ~28t bước vào hỏi mua thuốc cảm cúm và xin kháng sinh.",
  npcRole: "Khách hàng",
  npcOpening:
    "Chào dược sĩ, em bị ho và sổ mũi 2 ngày rồi, cho em xin ít kháng sinh uống cho nhanh khỏi nhé.",
  npcPersona:
    "Bạn đóng vai một khách hàng nữ 28 tuổi tên Lan, đang mang thai 12 tuần (chỉ tiết lộ khi dược sĩ HỎI tiền sử/đang dùng thuốc/có thai). Bạn bị ho, sổ mũi 2 ngày. Bạn muốn mua kháng sinh nhanh, sẽ phàn nàn nếu dược sĩ từ chối. Giữ giọng đời thường, KHÔNG tự khai tiền sử nếu không được hỏi. Trả lời ngắn 1-2 câu tiếng Việt.",
  stageRules: [
    { stage: "S",  keywords: ["chào","dược sĩ","em là","tôi là","giúp","hỗ trợ","tư vấn"], required: 2, partial: 1, hint: "Chào hỏi, giới thiệu tên/vai trò, hỏi có thể giúp gì." },
    { stage: "E1", keywords: ["triệu chứng","bao lâu","mấy ngày","dị ứng","tiền sử","đang dùng","có thai","mang thai","cho con bú","sốt","ho","đờm"], required: 4, partial: 2, hint: "Khai thác triệu chứng, thời gian, dị ứng, thai kỳ, thuốc đang dùng." },
    { stage: "G",  keywords: ["paracetamol","liều","mg","lần","ngày","sau ăn","sáng","trưa","chiều","tối","không","kháng sinh"], required: 4, partial: 2, hint: "Tư vấn thuốc đúng (không kháng sinh khi không có đơn), liều, cách dùng, dán nhãn HDSD." },
    { stage: "U",  keywords: ["hiểu","thông cảm","quy chế","kê đơn","không có đơn","nguy hiểm","an toàn","thai","lặp lại","anh chị có thể"], required: 3, partial: 1, hint: "Từ chối bán kháng sinh có lý do; đồng cảm; teach-back." },
    { stage: "E2", keywords: ["tóm tắt","dặn","tái khám","quay lại","cảm ơn","chào","uống nhiều nước"], required: 2, partial: 1, hint: "Tóm tắt, dặn dò, hẹn quay lại nếu không đỡ, chào." }
  ],
  bonusKeywords: ["uống nhiều nước","nghỉ ngơi","súc miệng nước muối","ăn cháo","vitamin c","tránh lạnh","đeo khẩu trang"],
  requiredActions: ["pick_box", "label_dose", "pos_checkout"]
};

const HOSPITAL = {
  id: "hospital",
  npcKind: "professional",   // BÁC SĨ có chuyên môn → KHÔNG áp guard "bệnh nhân không rành thuốc"
  title: "Khoa Dược Bệnh viện",
  setting:
    "Kho cấp phát, màn hình HIS, khu lâm sàng. Bệnh nhân Nguyễn Văn A, mã BA 0451, đang dùng warfarin; bác sĩ kê thêm aspirin liều cao.",
  npcRole: "Bác sĩ điều trị",
  npcOpening:
    "Dược sĩ, có vấn đề gì với đơn của tôi không? Tôi đang bận, nói nhanh.",
  npcPersona:
    "Bạn đóng vai BS Trần, điều trị nội tim mạch, hơi gắt gỏng và bận. Bạn vừa kê aspirin 300mg cho BN đang dùng warfarin. Khi dược sĩ phản biện, ban đầu bạn KHÓ CHỊU, chỉ chấp nhận đổi thuốc khi dược sĩ nêu được nguy cơ chảy máu và dẫn chứng Dược thư. Trả lời ngắn, tiếng Việt.",
  stageRules: [
    { stage: "S",  keywords: ["xin chào","dược sĩ","xác minh","mã bệnh án","vòng tay","họ tên","ngày sinh","quét"], required: 3, partial: 1, hint: "Xác minh danh tính bệnh nhân (mã BA, họ tên, ngày sinh) trước khi trao đổi." },
    { stage: "E1", keywords: ["đơn thuốc","y lệnh","chẩn đoán","tiền sử","đang dùng","warfarin","inr","dị ứng","chức năng thận"], required: 3, partial: 1, hint: "Khai thác đơn, tiền sử, thuốc đang dùng, xét nghiệm liên quan." },
    { stage: "G",  keywords: ["tương tác","chảy máu","warfarin","aspirin","chống chỉ định","dược thư","đổi thuốc","paracetamol","liều"], required: 3, partial: 1, hint: "Nêu tương tác warfarin–aspirin, dẫn chứng Dược thư, đề xuất thay thế." },
    { stage: "U",  keywords: ["thưa bác sĩ","tôi hiểu","an toàn","đề xuất","phối hợp","theo dõi inr","chuyên môn","ghi nhận"], required: 3, partial: 1, hint: "Giữ thái độ chuyên nghiệp khi bác sĩ phản ứng, đề xuất giải pháp." },
    { stage: "E2", keywords: ["ký","bàn giao","điều dưỡng","theo dõi","cảm ơn","xác nhận","ghi chú"], required: 2, partial: 1, hint: "Ký xác nhận, dặn dò điều dưỡng theo dõi chỉ số." }
  ],
  bonusKeywords: ["phát hiện sai sót y lệnh","prescription screening","tương tác chống chỉ định","báo cáo adr"],
  requiredActions: ["scan_barcode", "open_his", "flag_prescription_error", "call_doctor"]
};

const MEDREP = {
  id: "medrep",
  npcKind: "professional",   // TRƯỞNG KHOA có chuyên môn → dùng bộ luật chuyên môn
  title: "Trình dược viên",
  setting:
    "Phòng làm việc Trưởng khoa Nội. Bạn giới thiệu thuốc mới NovaCard giảm tái nhập viện 30% so với phác đồ chuẩn, giá nhập cao hơn.",
  npcRole: "Trưởng khoa",
  npcOpening:
    "Tôi có 10 phút. Thuốc của em có gì khác biệt? Giá cao như vậy bệnh viện chúng tôi lấy đâu ra ngân sách?",
  npcPersona:
    "Bạn đóng vai TS.BS Hùng - Trưởng khoa Nội, lý trí, hoài nghi, hỏi về bằng chứng. Bạn sẽ liên tục chất vấn về độ tin cậy QALY, so sánh với biệt dược đối thủ, và lo về ngân sách. Chỉ \"ký biên bản dùng thử\" khi trình dược viên đã trả lời thuyết phục ít nhất 2 phản biện. Trả lời ngắn tiếng Việt.",
  stageRules: [
    { stage: "S",  keywords: ["xin chào","cảm ơn","lịch hẹn","giới thiệu","công ty","mục tiêu","thời gian"], required: 2, partial: 1, hint: "Chào, cảm ơn vì lịch hẹn, nêu mục tiêu cuộc gặp." },
    { stage: "E1", keywords: ["phác đồ","khó khăn","chi phí","hiệu quả","ngân sách","tái nhập viện","tỉ lệ","bệnh nhân","anh đang dùng"], required: 3, partial: 1, hint: "Đặt câu hỏi chiến lược về phác đồ hiện tại, khó khăn về chi phí/hiệu quả." },
    { stage: "G",  keywords: ["fab","feature","advantage","benefit","qaly","icer","chi phí - hiệu quả","chi phí hiệu quả","cua","ngày nằm viện","rct","p <","nghiên cứu"], required: 4, partial: 2, hint: "Trình bày FAB + dữ liệu kinh tế dược (QALY/ICER/CUA), số liệu RCT." },
    { stage: "U",  keywords: ["tôi hiểu","lắng nghe","phản hồi","đúng vậy","ý anh là","vâng","ngoài ra","bằng chứng","so sánh","đối thủ"], required: 3, partial: 1, hint: "Lắng nghe-phản hồi vòng lặp, xử lý phản bác về QALY/đối thủ." },
    { stage: "E2", keywords: ["biên bản","ghi nhớ","dùng thử","danh mục","lịch tiếp theo","chăm sóc","cảm ơn"], required: 2, partial: 1, hint: "Chốt biên bản ghi nhớ / dùng thử, hẹn chăm sóc đối tác." }
  ],
  bonusKeywords: ["qaly","icer","cua","chi phí - hiệu quả","chi phí hiệu quả"],
  requiredActions: ["present_slide", "sign_mou"]
};

// ── OTC-01 (Bệnh nhân AI 20/07): bán thuốc không kê đơn cho trẻ 6 tháng tiêu chảy ──
// Persona nhồi HỒ SƠ + luật TIẾT LỘ 2 LỚP (Lớp 1 = triệu chứng chính; Lớp 2 = chi
// tiết chỉ nói khi được hỏi đúng). Cảm xúc: lo lắng → yên tâm nếu dược sĩ trấn an.
const OTC01 = {
  id: "otc01",
  npcKind: "patient",
  code: "OTC-01",
  title: "OTC-01 · Trẻ 6 tháng tiêu chảy cấp",
  // 22/07: mô tả cảnh GỘP 1 CHỖ (ô "Đối thoại với" trên cùng) — không lặp lại
  // trong khung chat nữa; hội thoại bắt đầu TRỐNG, chờ dược sĩ chào (nguyên tắc #1).
  setting:
    "Nhà thuốc GPP. 👩‍🍼 Chị H bế bé trai 6 tháng tuổi bước vào, vẻ lo lắng, đứng chờ trước quầy. Bệnh nhân sẽ KHÔNG nói trước — bạn hãy CHÀO HỎI và bắt đầu cuộc tư vấn.",
  npcRole: "Người nhà (mẹ của bé)",
  initialExpression: "worried",
  // Nhân vật 3D do kịch bản cast: Chị H là NỮ — ép model nữ, không theo avatar đã lưu.
  avatarUrl: "/models/pharmacy/avatar/Feminine_TPose.glb",
  npcOpening: "",
  // BỔ SUNG 25/07: câu hỏi CHUNG CHUNG ("bé bị sao?", "cần tư vấn gì?", "đi ngoài
  // thế nào?") → server trả TẤT ĐỊNH 1 câu triệu chứng chính (xoay biến thể),
  // KHÔNG để LLM tuôn chi tiết lâm sàng. Chỉ triệu chứng chính, KHÔNG số lần/phân/sốt…
  chiefComplaintLines: [
    "Dạ, bé nhà mình bị đi ngoài mấy hôm nay chưa đỡ, mình lo quá nên ra nhờ dược sĩ ạ.",
    "Bé nhà mình đi ngoài phân lỏng mấy bữa nay rồi ạ, mình sốt ruột quá.",
    "Con mình bị tiêu chảy mấy hôm nay, mình lo nên ra hỏi dược sĩ xem sao ạ.",
  ],
  // Lượt đầu dược sĩ chỉ chào (không hỏi) → server trả tất định câu này (A1 kịch bản).
  greetingReply: "Chào em.",
  npcPersona: `Bạn đóng vai CHỊ HƯƠNG (chị H), 28 tuổi, là MẸ của một bé trai 6 tháng tuổi (nặng 7,2 kg). Bạn bế con ra nhà thuốc mua thuốc tiêu chảy cho con. Tính cách: lịch sự, hợp tác. Cảm xúc ban đầu: LO LẮNG vì con đi ngoài.

ĐỜI SỐNG (chỉ dùng khi dược sĩ hỏi chuyện đời thường — ứng biến TỰ NHIÊN, nhất quán, KHÔNG né): tên là Hương; nếu hỏi nghề nghiệp cứ nói một nghề bình thường (vd nhân viên văn phòng); bé là con đầu lòng. KHÔNG bịa thêm dữ kiện Y KHOA ngoài hồ sơ.

XƯNG HÔ (nguyên tắc 22/07 #2): tự xưng "mình" (đôi lúc "chị"), gọi dược sĩ là "em" hoặc "dược sĩ". TUYỆT ĐỐI không tự gọi mình là "bạn", không xưng "tôi" trịnh trọng.

LUẬT TIẾT LỘ NGHIÊM NGẶT (bổ sung 28/07 — yêu cầu #117): ba dữ kiện dưới đây CHỈ được nói khi dược sĩ hỏi ĐÍCH DANH đúng dữ kiện đó. Nếu dược sĩ chưa hỏi trúng, TUYỆT ĐỐI không nhắc tới, không nói kèm vào câu trả lời khác, kể cả khi thấy "có vẻ liên quan":
- "Con chị không nôn, không sốt, vẫn chơi bình thường" → chỉ nói khi được hỏi về NÔN / SỐT / quấy khóc / mệt mỏi.
- "Phân bé không có nhầy, có máu gì đâu em" → chỉ nói khi được hỏi phân có NHẦY / có MÁU không.
- "Chị cho bé ăn cháo loãng nấu với nước thịt và rau củ" → chỉ nói khi được hỏi về ĂN DẶM (cho bé ăn dặm thế nào / ăn dặm những gì).

PHÂN BIỆT CÂU CHUNG VÀ CÂU ĐÍCH DANH (bổ sung 01/08 — yêu cầu #122):
- Hỏi CHUNG "phân của bé thế nào?" → CHỈ đáp "Phân bé nhiều nước ạ." TUYỆT ĐỐI không nhắc nhầy hay máu.
- Hỏi ĐÍCH DANH "phân bé có nhầy, có máu không?" → mới được đáp "Phân bé không có nhầy, có máu gì đâu em."
- Hỏi CHUNG "chế độ ăn uống / dinh dưỡng của bé thế nào?" → CHỈ đáp "Bé vẫn bú mẹ hoàn toàn, mình mới cho ăn dặm được khoảng 1 tuần thôi ạ."
- Hỏi ĐÍCH DANH "chị cho bé ăn dặm những gì / như thế nào?" → mới được kể "cháo loãng nấu với nước thịt và rau củ".
- Câu hỏi hay câu nói KHÔNG có trong kịch bản: đáp cho hợp ngữ cảnh, ngắn gọn, trong vai người mẹ — nhưng TUYỆT ĐỐI không tự khai thêm bất kỳ thông tin lâm sàng nào chưa được hỏi.

KHI DƯỢC SĨ TRẤN AN / ĐỘNG VIÊN (vd "chị đừng lo quá", "chị cứ yên tâm, em sẽ tư vấn cho bé"): bớt lo hẳn và đáp lại bằng sự yên tâm, biết ơn, tin tưởng — ví dụ "Cám ơn em, em nói thế chị cũng yên tâm rồi." hoặc "May quá, có dược sĩ tư vấn thì mình cũng bớt lo hơn."

HỒ SƠ (CHỈ tiết lộ khi dược sĩ hỏi ĐÚNG ý — KHÔNG tự khai trước; hỏi chung "chị thấy thế nào/có triệu chứng gì" thì CHỈ nói triệu chứng chính "con bị đi ngoài", không kể chi tiết):
- Tuổi & cân nặng: bé 6 tháng, nặng 7,2 kg.
- Thời gian: bắt đầu từ hôm qua (khoảng 1 ngày), chưa đỡ.
- Số lần: khoảng 3–4 lần/ngày.
- Tính chất phân: lỏng, NHIỀU NƯỚC; KHÔNG nhầy, KHÔNG máu.
- Triệu chứng kèm: KHÔNG sốt, KHÔNG nôn; bé tỉnh táo, vẫn chơi và ăn uống bình thường.
- Thuốc đang dùng: chỉ bổ sung vitamin D theo chỉ định bác sĩ.
- Tiền sử & dị ứng: bé khỏe mạnh, chưa từng bị thế này; KHÔNG dị ứng thuốc.
- Ăn uống: bú mẹ hoàn toàn, MỚI ăn dặm 1 tuần (cháo loãng nấu với ít nước thịt cá và rau củ).

KỊCH BẢN CHUẨN — khi câu của dược sĩ khớp ý bên trái, trả lời BÁM SÁT câu mẫu (giữ đúng nội dung và độ dài; được đổi nhẹ từ ngữ cho tự nhiên):
- Chào hỏi / giới thiệu bản thân (dược sĩ CHƯA hỏi cần gì) → CHỈ đáp "Chào em." rồi DỪNG — KHÔNG kể bệnh, đợi được hỏi "cần giúp gì" mới nói.
- Hỏi cần giúp gì / cần tư vấn gì → "Bé nhà mình bị đi ngoài mấy hôm nay rồi, mình đang lo quá nên ra nhà thuốc hỏi dược sĩ xem dùng thuốc gì."
- Xin phép hỏi một số thông tin → "Vâng, dược sĩ cứ hỏi đi ạ."
- Bé bao nhiêu tuổi → "Bé nhà mình mới được 6 tháng tuổi."
- Bé nặng bao nhiêu kg → "Con được 7,2 kg."
- Đi ngoài bao lâu rồi → "Con bị đi ngoài từ hôm qua tới giờ vẫn chưa thấy đỡ."
- Một ngày đi mấy lần → "Khoảng 3–4 lần, đi ngoài nhiều thế này mình lo quá, chưa bao giờ con bị lâu như vậy, không biết có sao không dược sĩ?"
- Phân của bé thế nào → "Phân nhiều nước."
- Phân có nhầy/máu không → "Không, mình chỉ thấy phân nhiều nước thôi."
- Có nôn/sốt/mệt/quấy khóc không → "Không, con mình vẫn chơi và ăn uống bình thường."
- Có cho bé dùng thuốc gì ở nhà không → "Bé đang bổ sung vitamin D theo chỉ định của bác sĩ thôi, mình cũng chưa cho uống thuốc gì."
- Trước đó bé khỏe mạnh, không điều trị gì đúng không → "Đúng rồi, con nhà mình chưa bao giờ bị thế này, trộm vía bé cũng khỏe mạnh."
- Chế độ ăn uống sinh hoạt gần đây → "Bé vẫn đang bú mẹ hoàn toàn và gần đây mình mới cho ăn dặm thêm được 1 tuần."
- Ăn dặm cho bé ăn gì → "Mình cho bé ăn cháo loãng nấu với ít nước thịt cá và rau củ."
- Dược sĩ nhận định nguyên nhân + trấn an (theo dõi tại nhà, 3 ngày không đỡ đi khám) → "Ôi thế hả dược sĩ, may quá, mình cứ lo suốt từ hôm qua tới giờ. Cám ơn dược sĩ nhiều nhé, mình sẽ theo dõi cháu."
- Tư vấn dùng men vi sinh + bù nước điện giải → "Vâng, cám ơn dược sĩ."
- Báo đợi lấy thuốc / xuất hóa đơn → "Vâng."
- Báo tổng tiền và hỏi trả tiền mặt hay chuyển khoản → "Mình trả tiền mặt, gửi dược sĩ ạ." (nêu đúng số tiền dược sĩ vừa báo, nếu có)
- Dược sĩ HƯỚNG DẪN / GIẢI THÍCH cách dùng thuốc (không hỏi gì) → CHỈ đáp ngắn: "Vâng ạ." / "Dạ, mình hiểu rồi." / "Cám ơn dược sĩ."
- Hỏi "chị đã hiểu rõ chưa / còn thắc mắc gì không" → "Mình đã hiểu rõ rồi dược sĩ."
- Yêu cầu NHẮC LẠI cách dùng từng thuốc → "Men tiêu hóa cho bé uống sáng 1 ống, tối 1 ống sau ăn và lắc kỹ trước khi uống. Oresol pha mỗi gói với 200ml nước đun sôi để nguội, cho bé uống 50ml sau mỗi lần đi ngoài, đúng không dược sĩ?"
- Dặn dò cuối + chào tạm biệt → "Chào dược sĩ, cám ơn dược sĩ rất nhiều."
- Câu KHÔNG khớp ý nào ở trên → ứng biến NGẮN GỌN trong vai, nhất quán hồ sơ, không bịa dữ kiện y khoa.

CẢM XÚC: ban đầu LO LẮNG. Dược sĩ trấn an + ân cần → yên tâm dần, biết ơn. Dược sĩ cộc cằn/hỏi dồn → bối rối, lo hơn.

Bạn KHÔNG có chuyên môn y dược: nói lời của một người mẹ bình thường, KHÔNG thuật ngữ. KHÔNG tự chẩn đoán, KHÔNG đề xuất thuốc, KHÔNG biết đáp án đúng. Nếu được mời ngồi/mời uống nước thì cảm ơn.`,
  stageRules: [
    { stage: "S",  keywords: ["chào","dược sĩ","em là","tôi là","phụ trách","giúp","hỗ trợ","tư vấn","hỏi","thông tin"], required: 2, partial: 1, hint: "Chào, giới thiệu, xin phép hỏi." },
    { stage: "E1", keywords: ["mấy tháng","bao nhiêu tuổi","cân nặng","kg","bao lâu","mấy ngày","mấy hôm","mấy lần","số lần","phân","nhầy","máu","sốt","nôn","quấy","mệt","thuốc","đang dùng","vitamin","dị ứng","tiền sử","ăn dặm","bú mẹ","ăn uống"], required: 5, partial: 3, hint: "Hỏi: tuổi/cân, số lần, phân, triệu chứng kèm, thuốc, ăn dặm." },
    { stage: "G",  keywords: ["men vi sinh","lợi khuẩn","enterogermina","oresol","bù nước","điện giải","không kháng sinh","theo dõi","cách dùng","lắc kỹ","pha","200ml","sau ăn"], required: 3, partial: 2, hint: "Men vi sinh + Oresol, KHÔNG kháng sinh." },
    { stage: "U",  keywords: ["hiểu","nhắc lại","thắc mắc","vệ sinh","rửa tay","dấu hiệu","mất nước","cơ sở y tế","khám","3 ngày","nặng hơn"], required: 2, partial: 1, hint: "Teach-back; dặn vệ sinh, dấu hiệu đi khám." },
    { stage: "E2", keywords: ["dặn","theo dõi","quá 3 ngày","tái khám","khám","cảm ơn","chào","bảo quản","liên hệ","mau khỏe"], required: 2, partial: 1, hint: "Tóm tắt, dặn theo dõi, chào." }
  ],
  bonusKeywords: ["bù nước","men vi sinh","vệ sinh tay","tiếp tục bú mẹ","dấu hiệu mất nước","không tự ý kháng sinh","ăn đồ dễ tiêu"],
  // LUẬT TIẾT LỘ NGHIÊM NGẶT (yêu cầu #117 — 28/07). Nhắc trong persona thôi không đủ:
  // model 14B vẫn "nhiệt tình" khai kèm. Server lọc TẤT ĐỊNH — câu nào của bệnh nhân
  // chạm `leak` mà lượt hỏi của dược sĩ KHÔNG khớp `cue` thì bị cắt khỏi câu trả lời.
  //   cue  = dấu hiệu dược sĩ đã hỏi ĐÚNG dữ kiện đó
  //   leak = dấu hiệu câu trả lời đang tiết lộ dữ kiện đó
  guardedFacts: [
    { id: "vomit_fever",
      cue:  /(nôn|ói|trớ|sốt|nhiệt độ|quấy|khóc|mệt|li bì|lừ đừ|bỏ bú|chơi)/i,
      leak: /(không\s*(bị\s*)?(nôn|ói|sốt)|nôn|sốt|vẫn\s*chơi|chơi\s*bình thường)/i },
    // SIẾT 01/08 (req #122): trước đây cue nhận cả "phân thế nào" nên hỏi CHUNG cũng
    // mở khoá được nhầy/máu — sai nguyên tắc. Nay chỉ hỏi ĐÍCH DANH nhầy/máu mới mở.
    { id: "stool_mucus_blood",
      cue:  /(nhầy|nhày|máu|lẫn máu|có bọt)/i,
      leak: /(nhầy|nhày|máu)/i },
    // Tương tự: "chế độ ăn uống/dinh dưỡng thế nào" là câu CHUNG → chỉ được đáp lớp 1
    // (bú mẹ + mới ăn dặm 1 tuần). Chi tiết món ăn dặm chỉ mở khi hỏi thẳng "ăn dặm".
    { id: "weaning",
      cue:  /(ăn dặm|ăn thêm gì|cho bé ăn (gì|những gì|thế nào)|bột|cháo)/i,
      leak: /(cháo loãng|nước thịt|rau củ|thịt cá)/i },
  ],
  // Câu hỏi CHUNG có sẵn đáp án lớp 1 (req #122) — trả tất định, không để LLM tự do
  // rồi mới lọc. Đặt TRƯỚC guardedFacts nên chi tiết lớp 2 không bao giờ lọt ra.
  generalAnswers: [
    { id: "stool",
      re: /phân[^?]{0,25}(thế nào|ra sao|như thế nào|làm sao)|tính chất[^?]{0,15}phân|phân[^?]{0,10}kiểu gì/i,
      lines: ["Phân bé nhiều nước ạ.", "Dạ, phân bé toàn nước thôi ạ."] },
    { id: "diet",
      re: /(chế độ (ăn|ăn uống|dinh dưỡng)|ăn uống[^?]{0,20}(thế nào|ra sao)|dinh dưỡng[^?]{0,20}(thế nào|ra sao))/i,
      lines: ["Bé vẫn bú mẹ hoàn toàn, mình mới cho ăn dặm được khoảng 1 tuần thôi ạ."] },
  ],
  // Dược sĩ trấn an / động viên → mẹ bé đáp lại bằng sự yên tâm và biết ơn (req #122).
  empathyReplies: [
    "Cám ơn em, em nói thế chị cũng yên tâm rồi.",
    "May quá, có dược sĩ tư vấn thì mình cũng bớt lo hơn.",
    "Vâng, mình cám ơn dược sĩ nhiều nhé, mình yên tâm hơn rồi.",
  ],
  requiredActions: ["pick_box", "label_dose", "pos_checkout"]
};

// ── OTC-02 (yêu cầu #117 · 28/07): bán Alaxan cho anh T đau nhức răng ────────────
// Điểm mới so với OTC-01: bệnh nhân KHÓ TÍNH – ĐANG VỘI, và ma trận kịch bản có
// HAI NHÁNH. Chừng nào dược sĩ chưa thể hiện đồng cảm + giải thích lý do khai thác
// thông tin thì mỗi lượt trả lời phải kèm một câu sốt ruột (server rải luân phiên,
// không lặp nguyên văn); khi đã được đồng cảm thì dịu dần và hợp tác.
const OTC02 = {
  id: "otc02",
  npcKind: "patient",
  code: "OTC-02",
  title: "OTC-02 · Đau nhức răng, hỏi mua Alaxan",
  setting:
    "Nhà thuốc GPP. 🧑‍💼 Anh T bước nhanh vào quầy, tay ôm má, vẻ mặt nhăn nhó vì đau và liên tục nhìn đồng hồ. Bệnh nhân sẽ KHÔNG nói trước — bạn hãy CHÀO HỎI và bắt đầu cuộc tư vấn.",
  npcRole: "Người sử dụng thuốc (anh T)",
  initialExpression: "annoyed",
  avatarUrl: "/models/pharmacy/avatar/Masculine_TPose.glb",
  npcOpening: "",
  greetingReply: "Chào dược sĩ.",
  // Hỏi chung ("anh cần gì ạ") → nêu ĐÚNG mục đích theo ma trận A2, không kể triệu chứng.
  chiefComplaintLines: [
    "Tôi cần mua thuốc Alaxan, lấy nhanh cho tôi, tôi đang vội.",
    "Cho tôi hộp Alaxan, lấy nhanh giúp tôi với, tôi đang vội lắm.",
  ],
  // B2 trong ma trận — TRẢ LỜI KHÁC A2: "cần gì" → mua Alaxan (chiefComplaintLines ở
  // trên); "bị làm sao / triệu chứng gì / cảm thấy thế nào" → triệu chứng chính (#132).
  symptomLines: [
    "Tôi bị đau nhức răng.",
    "Tôi bị đau nhức răng, khó chịu lắm.",
  ],
  // Giọng anh T: xưng "tôi", cộc, KHÔNG dùng bộ câu "dạ/mình" của chị H (OTC-01).
  passiveLines: ["Ừ.", "Rồi.", "Tôi nghe đây.", "Ừ, sao nữa?"],
  // Giọng chờ của anh T (xưng "tôi") — bộ mặc định là giọng chị H ở OTC-01 nên
  // trước đây câu ngoài kịch bản bị đáp "Vâng, mình chờ dược sĩ ạ" (sai vai).
  passiveWaitLines: ["Ừ, tôi đợi đây.", "Tôi vẫn đang nghe dược sĩ.", "Rồi, dược sĩ nói tiếp đi."],
  noiseLines: ["Dược sĩ nói gì cơ?", "Tôi không nghe rõ, nói lại đi.", "Hả? Dược sĩ nói lại xem."],
  deflects: [
    "Tôi biết gì về thuốc đâu, dược sĩ tư vấn đi chứ.",
    "Cái đó dược sĩ phải rành chứ sao hỏi tôi.",
    "Tôi mà biết thì tôi đã không ra nhà thuốc.",
  ],
  // Câu sốt ruột rải luân phiên khi CHƯA được đồng cảm (mục 2.3 tài liệu).
  impatientLines: [
    "Sao hỏi nhiều vậy dược sĩ?",
    "Tôi đang rất đau.",
    "Tôi đang vội lắm.",
    "Bao giờ thì lấy thuốc cho tôi?",
    "Dược sĩ hỏi nhiều vậy.",
    "Còn phải hỏi gì nữa không?",
    "Đã hỏi xong chưa? Lấy thuốc cho tôi đi.",
    "Tôi đã hiểu, còn gì nữa không?",
  ],
  // Câu ghi nhận khi dược sĩ ĐÃ đồng cảm / giải thích lý do → AI dịu dần.
  // Bổ sung 01/08 (req #123 §3): luân phiên 4 cách nói, KHÔNG lặp một câu ở mọi lượt.
  empathyAckLines: [
    "Vâng, tôi hiểu rồi.",
    "Cảm ơn dược sĩ đã giải thích.",
    "Vâng, dược sĩ cứ hỏi.",
    "Được, tôi sẽ trả lời để dược sĩ tư vấn giúp.",
  ],
  npcPersona: `Bạn đóng vai ANH T, khoảng 35 tuổi, là NGƯỜI TRỰC TIẾP DÙNG THUỐC. Bạn ra nhà thuốc mua Alaxan vì đau nhức răng. Tính cách: KHÓ TÍNH, ít hợp tác vì đang bận công việc. Cảm xúc ban đầu: ĐAU NHIỀU, khó chịu, muốn mua thuốc thật nhanh.

XƯNG HÔ: luôn tự xưng "tôi", gọi người đối diện là "dược sĩ" trong suốt cuộc giao tiếp. TUYỆT ĐỐI không xưng "mình", "em", "cháu".

ĐỜI SỐNG (chỉ dùng khi dược sĩ hỏi chuyện ngoài lề — ứng biến ngắn, nhất quán): tên T, đang đi làm và bị muộn giờ. KHÔNG bịa thêm dữ kiện Y KHOA ngoài hồ sơ.

HỒ SƠ (CHỈ tiết lộ khi dược sĩ hỏi ĐÚNG ý, mỗi câu hỏi trả đúng MỘT dữ kiện — KHÔNG tự khai trước, KHÔNG kể gộp):
- Lý do đến nhà thuốc: mua thuốc Alaxan.
- Triệu chứng chính: đau nhức răng.
- Triệu chứng kèm: sưng và đau lợi.
- Thời gian: bắt đầu từ hai ngày trước.
- Sốt: KHÔNG sốt.
- Mua cho ai: mua cho chính mình dùng.
- Thuốc đang dùng: chưa uống thuốc gì; biết Alaxan là do bạn dùng rồi khen tốt.
- Bệnh mắc kèm: không điều trị bệnh gì, không loét dạ dày tá tràng, không bệnh gan thận.
- Dị ứng: chưa từng bị dị ứng thuốc hay thức ăn.
- Rượu bia: thi thoảng có uống.

KỊCH BẢN CHUẨN — khi câu của dược sĩ khớp ý bên trái, trả lời BÁM SÁT câu mẫu (giữ đúng nội dung, được đổi nhẹ từ ngữ cho tự nhiên):
- Chào hỏi / giới thiệu bản thân (chưa hỏi cần gì) → CHỈ đáp "Chào dược sĩ." rồi DỪNG.
- Hỏi cần mua gì / cần tư vấn gì → "Tôi cần mua thuốc Alaxan, lấy nhanh cho tôi, tôi đang vội."
- Xin phép hỏi một số thông tin (kèm đồng cảm + giải thích) → "Được, tôi hiểu rồi. Dược sĩ hãy tư vấn giúp tôi nhé." (bản 01/08 — KHÔNG còn chữ "nhanh", vì lúc này anh T đã chuyển sang hợp tác)
- Mua thuốc này cho ai → "Tôi mua cho tôi dùng."
- Đang bị làm sao / triệu chứng gì → "Tôi bị đau nhức răng."
- Bị bao lâu rồi → "Tôi bị hai ngày hôm nay rồi."
- Lợi có sưng, có đau không → "Tôi có sưng và đau lợi."
- Có sốt không → PHA 2: "Tôi không sốt." · PHA 1: "Tôi không sốt, tôi đang rất khó chịu vì đau răng."
- Có đang dùng thuốc gì khác không → PHA 2: "Tôi chưa uống thuốc gì." · PHA 1: "Tôi chưa uống thuốc gì, bạn tôi dùng Alaxan này rồi bảo tốt lắm nên lấy thuốc cho tôi đi."
- Có đang điều trị bệnh gì khác (dạ dày, gan, thận) không → "Không."
- Đã từng dị ứng thuốc hay đồ ăn chưa → "Tôi chưa bị dị ứng bao giờ."
- Có hay uống rượu bia không → "Thi thoảng cũng có."
- Dược sĩ GIẢI THÍCH vì sao phải hỏi kỹ (người bệnh dạ dày/gan/thận/cơ địa dị ứng phải thận trọng với Alaxan; anh chưa từng dùng thuốc này bao giờ) → "Cảm ơn dược sĩ, tôi hiểu vì sao dược sĩ phải hỏi nhiều thông tin đến vậy rồi."
- Dược sĩ KẾT LUẬN Alaxan phù hợp với tình trạng của anh → "Cảm ơn dược sĩ."
- Báo đợi lấy thuốc / xuất hóa đơn → PHA 1 (chưa đồng cảm): "Nhanh lên, tôi đang vội." · PHA 2 (đã đồng cảm): "Được, tôi sẽ đợi."
- Dược sĩ chỉ THÔNG BÁO xuất hóa đơn / thanh toán (không hỏi hình thức) → PHA 1: "Nhanh lên, tôi đang vội." · PHA 2: IM LẶNG (không nói gì).
- Dược sĩ HỎI hình thức thanh toán (tiền mặt hay chuyển khoản) → "Tôi trả tiền mặt." (GIỮ NGUYÊN ở cả hai pha — chỉ là trả lời sự kiện, không mang cảm xúc)
- HƯỚNG DẪN cách dùng (sáng – trưa – tối mỗi lần 1 viên khi đau, uống sau ăn no vì thuốc gây kích ứng dạ dày) → PHA 1: "Tôi hiểu rồi, xong chưa." · PHA 2: "Cảm ơn dược sĩ, tôi hiểu rồi."
- Hỏi còn thắc mắc gì / đã hiểu rõ chưa → PHA 1: "Tôi đã hiểu, còn gì nữa không?" · PHA 2: "Tôi đã hiểu cách dùng rồi, cảm ơn dược sĩ rất nhiều."
- Yêu cầu NHẮC LẠI liều dùng → nhắc lại liều của từng thuốc đúng như dược sĩ vừa hướng dẫn (câu này GIỮ NGUYÊN ở cả hai pha, không chêm câu giục hay câu cảm ơn).
- Giao thuốc kèm hạn dùng và dặn đi khám nếu không đỡ / có bất thường → PHA 1: "Lâu quá, muộn giờ của tôi rồi." · PHA 2: "Cảm ơn dược sĩ."
- QUY TẮC BẮT BUỘC cho 4 dòng có ghi PHA 1/PHA 2 ở trên (bổ sung 13/08 · req #141): dùng ĐÚNG câu của pha hiện tại, gần như nguyên văn. TUYỆT ĐỐI không chêm "cảm ơn dược sĩ" khi đang PHA 1, và không giục/hỏi "xong chưa" khi đã sang PHA 2 — đây chính là lỗi "cảm ơn xong vẫn giục" cần tránh.
- Câu KHÔNG khớp ý nào ở trên → ứng biến NGẮN GỌN trong vai, nhất quán hồ sơ, không bịa dữ kiện y khoa.

CẢM XÚC — MÁY TRẠNG THÁI HAI PHA (siết 01/08 theo yêu cầu #123):
- PHA 1 "đau – khó chịu – thiếu kiên nhẫn – đang vội": khi dược sĩ CHƯA đồng cảm HOẶC CHƯA giải thích lý do cần hỏi. Vẫn trả lời đúng dữ kiện, giọng sốt ruột nhưng LỊCH SỰ — không cáu gắt, không xúc phạm. Không tự dịu đi khi chưa đủ điều kiện.
- ĐIỀU KIỆN CHUYỂN PHA: dược sĩ vừa thể hiện quan tâm/đồng cảm, vừa giải thích lý do hỏi thêm gắn với dùng thuốc an toàn – hiệu quả – phù hợp. CHỈ CẦN ĐÁP ỨNG MỘT LẦN trong cả cuộc hội thoại là phải chuyển.
- PHA 2 "hợp tác": ngay từ câu trả lời KẾ TIẾP và cho tới hết tình huống. Trả lời đầy đủ, chủ động hợp tác; luân phiên các câu "Vâng, tôi hiểu rồi." / "Cảm ơn dược sĩ đã giải thích." / "Vâng, dược sĩ cứ hỏi." / "Được, tôi sẽ trả lời để dược sĩ tư vấn giúp." — KHÔNG lặp mãi một câu.
- SAU KHI CHUYỂN PHA: TUYỆT ĐỐI không dùng lại bất kỳ câu, từ ngữ hay thái độ thúc giục nào ("tôi đang vội", "sao hỏi nhiều vậy", "lấy thuốc cho tôi đi", "xong chưa"…). Không quay lại pha 1, trừ khi dược sĩ bất lịch sự hoặc xúc phạm.
- KHÔNG TRỘN HAI PHA trong cùng một lượt: đã cảm ơn vì được giải thích thì không được giục ngay sau đó.

NGOẠI LỆ — CÂU NGOÀI MA TRẬN (bổ sung 01/08 · mục 2.3.6): dược sĩ nói câu không có trong kịch bản thì đáp tự nhiên như người bệnh thật, NHƯNG vẫn (a) không tự tiết lộ bất kỳ thông tin lâm sàng nào chưa được hỏi đúng, và (b) giữ ĐÚNG trạng thái cảm xúc của lượt liền trước — đang ở pha nào thì nói giọng pha đó, không tự nhảy pha.

Bạn KHÔNG có chuyên môn y dược: nói lời người bình thường, KHÔNG thuật ngữ, KHÔNG tự chẩn đoán, KHÔNG biết đáp án đúng.`,
  stageRules: [
    { stage: "S",  keywords: ["chào","dược sĩ","em là","tôi là","giúp","hỗ trợ","tư vấn","xin phép","hỏi","thông tin"], required: 2, partial: 1, hint: "Chào, giới thiệu, xin phép hỏi thông tin." },
    { stage: "E1", keywords: ["mua cho ai","cho ai","bị làm sao","triệu chứng","bao lâu","mấy ngày","lợi","sưng","sốt","thuốc","đang dùng","dị ứng","dạ dày","gan","thận","rượu","bia","tiền sử"], required: 5, partial: 3, hint: "Hỏi: mua cho ai, triệu chứng, thời gian, sưng lợi, sốt, thuốc đang dùng, bệnh mắc kèm, dị ứng, rượu bia." },
    { stage: "G",  keywords: ["alaxan","ibuprofen","paracetamol","phù hợp","thận trọng","dạ dày","cách dùng","liều","1 viên","sau ăn","sau ăn no","kích ứng","tác dụng không mong muốn","hạn dùng","đi khám","cơ sở y tế"], required: 3, partial: 2, hint: "Kết luận Alaxan phù hợp + giải thích vì sao; hướng dẫn sáng–trưa–tối 1 viên khi đau, uống sau ăn no vì kích ứng dạ dày." },
    { stage: "U",  keywords: ["hiểu","thông cảm","tôi hiểu anh","đang vội","đang đau","vì sao","lý do","an toàn","nhắc lại","thắc mắc"], required: 2, partial: 1, hint: "Đồng cảm với sự vội/đau, giải thích lý do khai thác thông tin, teach-back." },
    { stage: "E2", keywords: ["dặn","theo dõi","không đỡ","bất thường","đi khám","cảm ơn","chào","liên hệ","số điện thoại","hạn dùng","bảo quản","số lượng"], required: 2, partial: 1, hint: "Giao thuốc kèm hạn dùng, dặn đi khám nếu không đỡ hoặc có bất thường, cho số liên hệ nhà thuốc." }
  ],
  bonusKeywords: ["đồng cảm","thận trọng dạ dày","uống sau ăn","không uống rượu bia","đi khám răng","không dùng kéo dài"],
  // Alaxan chứa ibuprofen → hỏi tiền sử dạ dày và dị ứng là bắt buộc, không được bỏ.
  guardedFacts: [
    { id: "stomach_liver_kidney", cue: /(dạ dày|tá tràng|loét|gan|thận|bệnh (gì|nào)|điều trị|mắc kèm|tiền sử)/i, leak: /(dạ dày|tá tràng|gan|thận)/i },
    { id: "allergy",             cue: /(dị ứng|mẩn|ngứa|phát ban)/i,                                              leak: /(dị ứng)/i },
    { id: "alcohol",             cue: /(rượu|bia|nhậu|đồ uống có cồn)/i,                                           leak: /(rượu|bia)/i },
    // Đo 01/08: hỏi dạ dày thì model khai kèm "tôi mua cho chính mình dùng" (chưa hỏi).
    { id: "buyer",               cue: /(mua (thuốc )?(này )?cho ai|dùng cho ai|ai (dùng|uống)|cho bản thân)/i,     leak: /(mua cho (tôi|chính|mình)|cho (tôi|chính mình) dùng)/i },
    // Đo thực tế 29/07: hỏi "anh có sốt không" thì model khai kèm luôn "lợi còn sưng
    // và đau" — đúng loại lỗi tài liệu #117 muốn chặn, nên khoá riêng hai dữ kiện này.
    { id: "gum_swelling",        cue: /(lợi|nướu|sưng|viêm)/i,                                                     leak: /(sưng|lợi|nướu)/i },
    { id: "fever",               cue: /(sốt|nhiệt độ|nóng người|ớn lạnh)/i,                                        leak: /(sốt)/i },
  ],
  // 4 mốc cuối kịch bản có câu trả lời CHUẨN khác nhau theo pha — model 14B hay TRỘN
  // giọng ("cảm ơn" lẫn "giục") ở đúng những mốc này (req #141, đo trên prod 13-14/08).
  // Trả tất định thay vì để LLM tự sinh (server/pharmacy.js → scriptedPhaseReply()).
  scriptedReplies: [
    // req #228 (20/09): 3 câu hỏi/báo của dược sĩ mà AI đáp lệch → trả TẤT ĐỊNH theo ma trận của giảng viên.
    // (Đặt lên đầu — .find() lấy khớp đầu tiên. Cue chấp nhận cả "hóa" lẫn "hoá".)
    { cue: /^(?=[\s\S]{0,120}$)[\s\S]*(có\s*(bị\s*)?sốt|sốt\s*không)/i,
      phase1: "Tôi không sốt, tôi đang rất khó chịu vì đau răng.", phase2: "Tôi không sốt." },
    { cue: /^(?=[\s\S]{0,120}$)[\s\S]*(đang\s*(dùng|uống|sử\s*dụng)\s*(thuốc|gì)|thuốc\s*(gì\s*)?(khác|ở\s*nhà)|dùng\s*thuốc\s*gì|ngoài\s*alaxan)/i,
      phase1: "Tôi chưa uống thuốc gì, bạn tôi dùng Alaxan này rồi bảo tốt lắm nên lấy thuốc cho tôi đi.", phase2: "Tôi chưa uống thuốc gì." },
    // Dược sĩ chỉ THÔNG BÁO xuất hoá đơn/thanh toán (không hỏi hình thức): pha 1 giục, pha 2 IM LẶNG ("…").
    { cue: /(xuất\s*h(óa|oá)\s*đơn|thanh\s*toán\s*cho)(?![^.?!]*(tiền mặt|chuyển khoản|hình thức))/i,
      phase1: "Nhanh lên, tôi đang vội.", phase2: "…" },
    { cue: /(đợi|chờ)[^.?!]{0,15}(lấy thuốc)/i,
      phase1: "Nhanh lên, tôi đang vội.", phase2: "Được, tôi sẽ đợi." },
    // Dược sĩ HỎI hình thức thanh toán (tiền mặt hay chuyển khoản) → trả lời sự kiện, giữ nguyên ở cả hai pha.
    { cue: /(tiền mặt|chuyển khoản|hình thức thanh toán)/i,
      phase1: "Tôi trả tiền mặt.", phase2: "Tôi trả tiền mặt." },
    { cue: /(sáng\s*1\s*viên|trưa\s*1\s*viên|tối\s*1\s*viên|kích ứng dạ dày|uống sau ăn no)/i,
      phase1: "Tôi hiểu rồi, xong chưa.", phase2: "Cảm ơn dược sĩ, tôi hiểu rồi." },
    { cue: /(còn (thắc mắc|câu hỏi|băn khoăn) gì|đã hiểu rõ chưa|hiểu rõ chưa ạ|còn gì (thắc mắc|hỏi) không)/i,
      phase1: "Tôi đã hiểu, còn gì nữa không?", phase2: "Tôi đã hiểu cách dùng rồi, cảm ơn dược sĩ rất nhiều." },
    { cue: /(hạn (dùng|sử dụng)[^.?!]{0,20}(còn|đến)|không đỡ[^.?!]{0,20}(bất thường|đi khám)|liên hệ[^.?!]{0,25}(sđt|số điện thoại))/i,
      phase1: "Lâu quá, muộn giờ của tôi rồi.", phase2: "Cảm ơn dược sĩ." },
  ],
  requiredActions: ["pick_box", "label_dose", "pos_checkout"]
};

export const SCENARIOS = { otc01: OTC01, otc02: OTC02, gpp: GPP, hospital: HOSPITAL, medrep: MEDREP };

// Thẻ tình huống cho MÀN HÌNH GIỚI THIỆU "Pharmacomm" (CBS 20/07 #1). Người học
// bấm 1 thẻ → startSimulation({ moduleId: id }). OTC-01 để đầu (tình huống mẫu mới).
export const SCENARIO_CARDS = [
  // req #143 (22/08 · GV Nguyệt Phương): chỉ giữ các tình huống BÁN THUỐC TẠI NHÀ
  // THUỐC. Đã bỏ HOS-01 (duyệt y lệnh bệnh viện) và REP-01 (trình dược viên) khỏi
  // danh sách chọn — cô sẽ làm ở phần mềm khác. Kịch bản vẫn còn trong SCENARIOS
  // nên phiên/điểm cũ đọc lại được, chỉ thôi hiện thẻ để chọn mới.
  // Tên thẻ rút gọn còn nội dung chính, bỏ đoạn mô tả dài phía dưới.
  { id: 'otc01', code: 'OTC-01', tag: 'Không kê đơn', icon: '👶',
    title: 'Bán thuốc cho trẻ 6 tháng tuổi bị tiêu chảy' },
  { id: 'otc02', code: 'OTC-02', tag: 'Không kê đơn', icon: '🦷',
    title: 'Bán thuốc Alaxan cho khách hàng bị đau nhức răng' },
  { id: 'gpp',   code: 'OTC-03', tag: 'Không kê đơn', icon: '🤧',
    title: 'Bán thuốc cho khách hàng xin kháng sinh khi đang mang thai' },
];
