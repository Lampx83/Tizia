// ============================================================
// Trường Mầm non — 4 LĨNH VỰC PHÁT TRIỂN còn lại (ngoài Nhận thức)
// Thể chất · Ngôn ngữ · Tình cảm–Xã hội · Thẩm mỹ × Mầm/Chồi/Lá
// ============================================================
// Bám Chương trình GDMN (TT 51/2020/TT-BGDĐT). Mỗi module có:
//   • 1 quiz kiến thức  `${id}-quiz`  (5 câu)
//   • các hoạt động     `${id}-w01…`  (quiz ngắn 4 câu HOẶC ghép cặp)
// Toàn bộ dùng emoji, 3 lựa chọn, giải thích ngắn — render qua preschool-ui
// (Big Bubble + TTS + confetti). id prefix N1-/N2-/N3- (Mầm/Chồi/Lá).
//
// Nội dung giữ ĐÚNG lứa tuổi & an toàn: số cứu hộ 113/114/115, quy tắc đường
// bộ, dinh dưỡng, cảm xúc, dân ca VN. Đã đối chiếu chuẩn GDMN.
// ============================================================

const q = (id, title, yearLevel, subject, questions) => ({
  id, title, kind: 'quiz', yearLevel, subject, difficulty: 1, questions,
});
const Q = (stem, choices, answer, explanation) => ({ stem, choices, answer, explanation });
const m = (id, title, yearLevel, subject, leftItems, rightItems, correctPairs, description) => ({
  id, title, kind: 'drag-match', yearLevel, subject, difficulty: 1,
  description, leftItems, rightItems, correctPairs,
});

// ════════════════════════════════════════════════════════════
// LĨNH VỰC 1 — PHÁT TRIỂN THỂ CHẤT (the-chat)
// Vận động thô/tinh · dinh dưỡng · sức khỏe · an toàn.
// ════════════════════════════════════════════════════════════

// ── Mầm (3 tuổi) ──
const N1_TC = [
  q('N1TC-quiz', 'Mầm · Vận động & Giữ sức khỏe 🤸', 1, 'the-chat', [
    Q('Muốn khỏe mạnh, mỗi ngày bé nên?', ['Vận động, chạy nhảy', 'Ngồi im cả ngày', 'Ăn thật nhiều kẹo'], 0, 'Bé vận động mỗi ngày để cơ thể khỏe mạnh.'),
    Q('Bé cầm thìa xúc cơm bằng tay nào cũng được, nhưng phải?', ['Cầm chắc, không rơi', 'Ném thìa đi', 'Bốc bằng chân'], 0, 'Bé cầm thìa chắc tay để xúc cơm gọn gàng.'),
    Q('Khi chạy 🏃 mà thấy mệt, bé nên?', ['Nghỉ, uống nước', 'Chạy thật nhanh nữa', 'Nín thở'], 0, 'Mệt thì bé nghỉ và uống nước.'),
    Q('Bé leo cầu thang 🪜 thì phải?', ['Vịn tay vào lan can', 'Nhắm mắt leo', 'Nhảy từ trên xuống'], 0, 'Bé vịn lan can để không bị ngã.'),
    Q('Buổi tối bé cần đi ngủ để?', ['Cơ thể được nghỉ, mau lớn', 'Xem tivi cả đêm', 'Chơi tới sáng'], 0, 'Ngủ đủ giấc giúp bé mau lớn và khỏe.'),
  ]),
  q('N1TC-w01', 'Bé tập vận động 🏃', 1, 'the-chat', [
    Q('Con thỏ 🐰 di chuyển bằng cách?', ['Nhảy', 'Bơi', 'Bay'], 0, 'Thỏ nhảy bằng hai chân sau.'),
    Q('Bé bò 🧎 bằng?', ['Hai tay và hai chân', 'Cái đầu', 'Cái bụng lăn'], 0, 'Bé bò bằng hai tay và hai chân.'),
    Q('Bé bật nhảy 🦘 lên cao dùng sức của?', ['Đôi chân', 'Cái tai', 'Cái mũi'], 0, 'Bé nhún đôi chân để bật lên.'),
    Q('Đá quả bóng ⚽ bé dùng?', ['Bàn chân', 'Bàn tay', 'Cái đầu'], 0, 'Bé dùng bàn chân để đá bóng.'),
  ]),
  q('N1TC-w02', 'Bé ăn khỏe mỗi ngày 🍚', 1, 'the-chat', [
    Q('🥛 Sữa giúp bé?', ['Cao lớn, chắc xương', 'Sâu răng', 'Buồn ngủ'], 0, 'Sữa giàu canxi giúp bé cao lớn.'),
    Q('Trước khi ăn cơm, bé phải?', ['Rửa tay sạch', 'Chơi đất', 'Xem tivi'], 0, 'Rửa tay sạch để không đau bụng.'),
    Q('🍎🍌 là nhóm thức ăn gì?', ['Trái cây', 'Bánh kẹo', 'Đồ chơi'], 0, 'Táo, chuối là trái cây, nhiều vitamin.'),
    Q('Khi khát, bé nên uống?', ['Nước lọc', 'Thật nhiều nước ngọt', 'Không uống gì'], 0, 'Bé uống nước lọc cho khỏe.'),
  ]),
  m('N1TC-w03', 'Ghép bộ phận cơ thể với việc 🧒', 1, 'the-chat',
    [{ id: 'chan', label: 'Đôi chân' }, { id: 'tay', label: 'Đôi tay' }, { id: 'mieng', label: 'Cái miệng' }, { id: 'mat', label: 'Đôi mắt' }],
    [{ id: 'chay', label: '🏃 Chạy nhảy' }, { id: 'cam', label: '✋ Cầm nắm' }, { id: 'an', label: '🍚 Ăn cơm' }, { id: 'nhin', label: '👀 Nhìn' }],
    [['chan', 'chay'], ['tay', 'cam'], ['mieng', 'an'], ['mat', 'nhin']],
    'Bấm bộ phận cơ thể rồi bấm việc mà nó làm.'),
  q('N1TC-w04', 'Bé an toàn 🛑', 1, 'the-chat', [
    Q('Ổ điện 🔌 trên tường, bé có được thọc tay vào không?', ['Không, rất nguy hiểm', 'Có', 'Thọc que vào'], 0, 'Ổ điện nguy hiểm, bé tuyệt đối không chạm.'),
    Q('Nước sôi 🍲 rất nóng, bé nên?', ['Tránh xa', 'Sờ thử', 'Nhúng tay'], 0, 'Bé tránh xa nước sôi để không bị bỏng.'),
    Q('Ra đường bé phải?', ['Nắm tay người lớn', 'Chạy một mình', 'Đi giữa đường'], 0, 'Bé nắm tay người lớn khi ra đường.'),
    Q('Vật nhỏ 🔩 bé có nên cho vào miệng?', ['Không', 'Có', 'Nhét vào mũi'], 0, 'Vật nhỏ dễ hóc, bé không cho vào miệng.'),
  ]),
];

// ── Chồi (4 tuổi) ──
const N2_TC = [
  q('N2TC-quiz', 'Chồi · Khéo léo & Dinh dưỡng 🤾', 2, 'the-chat', [
    Q('Đi trên vạch thẳng, bé cần giữ?', ['Thăng bằng', 'Nhắm mắt', 'Chạy thật nhanh'], 0, 'Bé giữ thăng bằng để không bước lệch.'),
    Q('Ném bóng 🏀 trúng rổ cần?', ['Nhắm đích rồi ném', 'Ném lung tung', 'Nhắm mắt'], 0, 'Bé nhắm vào rổ rồi mới ném.'),
    Q('Nhóm thức ăn nào giúp bé chắc xương? 🥛🐟', ['Sữa, cá, tôm', 'Kẹo, nước ngọt', 'Bim bim'], 0, 'Sữa, cá, tôm giàu canxi và đạm.'),
    Q('Rau xanh 🥦 giúp bé?', ['Tiêu hóa tốt, không táo bón', 'Sâu răng', 'Béo phì'], 0, 'Rau xanh nhiều chất xơ, tốt cho tiêu hóa.'),
    Q('Sau khi chơi, bé tự?', ['Cất đồ, rửa tay', 'Bỏ mặc', 'Khóc đòi mẹ làm'], 0, 'Bé Chồi biết tự phục vụ: cất đồ, rửa tay.'),
  ]),
  q('N2TC-w01', 'Bé khéo tay 🖐️', 2, 'the-chat', [
    Q('Cài cúc áo 👕 bé dùng?', ['Ngón tay khéo léo', 'Cả bàn tay đập', 'Răng cắn'], 0, 'Bé dùng ngón tay để cài cúc.'),
    Q('Xâu hạt vòng 📿 cần bé?', ['Kiên nhẫn, tỉ mỉ', 'Vội vàng', 'Ném hạt đi'], 0, 'Xâu hạt giúp bé rèn khéo léo, kiên nhẫn.'),
    Q('Cắt giấy ✂️ bé phải?', ['Cẩn thận, không cắt vào tay', 'Vung kéo', 'Chỉ vào bạn'], 0, 'Bé cầm kéo cẩn thận, hướng xuống.'),
    Q('Xếp chồng khối gỗ 🧱 muốn cao thì?', ['Đặt cân, chắc chắn', 'Đặt lệch', 'Đẩy đổ'], 0, 'Xếp cân đối thì tháp mới cao và vững.'),
  ]),
  q('N2TC-w02', 'Bé chọn bữa ăn khỏe 🍱', 2, 'the-chat', [
    Q('Bữa sáng bé nên ăn?', ['Cơm/cháo/bánh mì + sữa', 'Chỉ ăn kẹo', 'Nhịn đói'], 0, 'Bữa sáng đủ chất giúp bé học tốt cả buổi.'),
    Q('Ăn quá nhiều đồ ngọt 🍭 dễ bị?', ['Sâu răng', 'Cao lớn', 'Khỏe hơn'], 0, 'Đồ ngọt nhiều gây sâu răng.'),
    Q('Một ngày bé nên ăn mấy bữa chính?', ['3 bữa', '1 bữa', '10 bữa'], 0, 'Bé ăn 3 bữa chính: sáng, trưa, tối.'),
    Q('🥕🍅🥦 thuộc nhóm?', ['Rau củ', 'Thịt', 'Bánh'], 0, 'Cà rốt, cà chua, súp lơ là rau củ.'),
  ]),
  m('N2TC-w03', 'Ghép món ăn với nhóm dinh dưỡng 🍽️', 2, 'the-chat',
    [{ id: 'dam', label: 'Chất đạm' }, { id: 'tinhbot', label: 'Tinh bột' }, { id: 'vitamin', label: 'Vitamin' }, { id: 'sua', label: 'Canxi' }],
    [{ id: 'thit', label: '🍗 Thịt, cá' }, { id: 'com', label: '🍚 Cơm, bánh mì' }, { id: 'rau', label: '🥦 Rau, quả' }, { id: 'milk', label: '🥛 Sữa' }],
    [['dam', 'thit'], ['tinhbot', 'com'], ['vitamin', 'rau'], ['sua', 'milk']],
    'Bấm nhóm dinh dưỡng rồi bấm món ăn tương ứng.'),
  q('N2TC-w04', 'Bé giữ an toàn 🚸', 2, 'the-chat', [
    Q('Người lạ cho kẹo và rủ đi, bé?', ['Từ chối, báo cô/bố mẹ', 'Đi theo ngay', 'Nhận kẹo rồi đi'], 0, 'Bé không đi theo người lạ, báo người thân.'),
    Q('Chơi gần ao hồ 🌊 không có người lớn thì?', ['Rất nguy hiểm', 'An toàn', 'Nhảy xuống bơi'], 0, 'Bé không chơi gần ao hồ một mình.'),
    Q('Thấy bạn bị ngã chảy máu 🩹, bé nên?', ['Gọi cô giáo', 'Bỏ đi', 'Cười bạn'], 0, 'Bé gọi cô giáo tới giúp bạn.'),
    Q('Que nhọn, dao 🔪 là đồ?', ['Nguy hiểm, không chơi', 'Đồ chơi', 'Để ngậm'], 0, 'Vật sắc nhọn nguy hiểm, bé không nghịch.'),
  ]),
];

// ── Lá (5 tuổi) ──
const N3_TC = [
  q('N3TC-quiz', 'Lá · Vận động khỏe & An toàn giao thông 🚦', 3, 'the-chat', [
    Q('Đèn đỏ 🔴 khi qua đường nghĩa là?', ['Dừng lại', 'Đi tiếp', 'Chạy nhanh'], 0, 'Đèn đỏ thì dừng lại, không được đi.'),
    Q('Đèn xanh 🟢 nghĩa là?', ['Được đi', 'Dừng', 'Lùi lại'], 0, 'Đèn xanh mới được đi.'),
    Q('Ngồi xe máy 🏍️ bé phải?', ['Đội mũ bảo hiểm', 'Đứng lên', 'Thả hai tay'], 0, 'Bé đội mũ bảo hiểm để an toàn.'),
    Q('Cầm bút ✏️ đúng cách để chuẩn bị vào lớp 1 là?', ['3 ngón tay giữ bút', 'Nắm cả bàn tay', 'Kẹp bằng chân'], 0, 'Bé cầm bút bằng 3 ngón: cái, trỏ, giữa.'),
    Q('Muốn nhảy dây 🤾 giỏi, bé cần?', ['Luyện tập nhiều', 'Bỏ cuộc ngay', 'Chê dây xấu'], 0, 'Luyện tập nhiều thì bé sẽ nhảy giỏi.'),
    Q('Khi có cháy 🔥, người lớn gọi số nào?', ['114', '119', '100'], 0, '114 là số gọi lính cứu hỏa khi có cháy.'),
  ]),
  q('N3TC-w01', 'Bé vận động phối hợp 🤸', 3, 'the-chat', [
    Q('Nhảy lò cò 🦵 bé đứng bằng?', ['Một chân', 'Hai tay', 'Cái đầu'], 0, 'Lò cò là nhảy bằng một chân.'),
    Q('Đá bóng 🥅 vào gôn cần bé?', ['Nhắm và sút chính xác', 'Đá lung tung', 'Ôm bóng chạy'], 0, 'Bé nhắm khung thành rồi sút.'),
    Q('Bò chui qua vòng 🛞 cần bé?', ['Khéo, cúi thấp người', 'Đứng thẳng', 'Nhảy qua'], 0, 'Bé cúi thấp để chui qua vòng.'),
    Q('Chạy tiếp sức 🏁 với bạn, bé cần?', ['Phối hợp, trao gậy đúng', 'Chạy một mình', 'Giữ gậy không trao'], 0, 'Bé trao gậy cho bạn để cùng thắng.'),
  ]),
  q('N3TC-w02', 'Bé ăn uống thông minh 🥗', 3, 'the-chat', [
    Q('Tháp dinh dưỡng: nhóm nào ăn nhiều nhất?', ['Cơm, rau', 'Đường, mỡ', 'Bánh kẹo'], 0, 'Cơm và rau ăn nhiều; đường mỡ ăn ít.'),
    Q('Uống đủ nước mỗi ngày giúp?', ['Cơ thể khỏe, da đẹp', 'Đau bụng', 'Buồn ngủ'], 0, 'Nước rất cần cho cơ thể bé.'),
    Q('Ăn chín, uống sôi để?', ['Không bị đau bụng', 'Ngon hơn kẹo', 'Cao hơn'], 0, 'Ăn chín uống sôi tránh vi khuẩn gây bệnh.'),
    Q('Trước khi ngủ bé nên?', ['Đánh răng', 'Ăn thật no kẹo', 'Chạy nhảy'], 0, 'Bé đánh răng trước khi đi ngủ.'),
  ]),
  m('N3TC-w03', 'Ghép biển báo giao thông 🚸', 3, 'the-chat',
    [{ id: 'do', label: 'Đèn đỏ' }, { id: 'xanh', label: 'Đèn xanh' }, { id: 'vang', label: 'Đèn vàng' }, { id: 'vach', label: 'Vạch kẻ đường' }],
    [{ id: 'dung', label: '🛑 Dừng lại' }, { id: 'di', label: '✅ Được đi' }, { id: 'chuan', label: '⚠️ Chuẩn bị dừng' }, { id: 'quaduong', label: '🚶 Nơi qua đường' }],
    [['do', 'dung'], ['xanh', 'di'], ['vang', 'chuan'], ['vach', 'quaduong']],
    'Bấm tín hiệu rồi bấm ý nghĩa đúng.'),
  q('N3TC-w04', 'Bé sẵn sàng cầm bút vào lớp 1 ✍️', 3, 'the-chat', [
    Q('Khi viết, bé ngồi thế nào?', ['Lưng thẳng, mắt cách vở một gang tay', 'Nằm ra bàn', 'Cúi sát mặt'], 0, 'Ngồi thẳng lưng, mắt cách vở ~1 gang tay để bảo vệ mắt.'),
    Q('Bé tô theo nét chấm để?', ['Tay quen viết chữ', 'Cho vui thôi', 'Làm bẩn vở'], 0, 'Tô nét chấm giúp tay bé quen viết chữ.'),
    Q('Cầm kéo cắt hình, mũi kéo hướng?', ['Ra xa, xuống dưới', 'Vào mặt', 'Vào bạn'], 0, 'Mũi kéo luôn hướng ra xa người.'),
    Q('Muốn viết đẹp, bé cần?', ['Kiên trì tập luyện', 'Viết một lần là xong', 'Nhờ bạn viết hộ'], 0, 'Viết đẹp nhờ kiên trì luyện tập.'),
  ]),
];

// ════════════════════════════════════════════════════════════
// LĨNH VỰC 3 — PHÁT TRIỂN NGÔN NGỮ (ngon-ngu)
// Nghe–nói · từ vựng · làm quen chữ cái & ghép vần (Lá).
// ════════════════════════════════════════════════════════════

// ── Mầm (3 tuổi) ──
const N1_NN = [
  q('N1NN-quiz', 'Mầm · Nghe – Nói & Từ vựng 🗣️', 1, 'ngon-ngu', [
    Q('Gặp cô giáo buổi sáng, bé nói?', ['Con chào cô ạ', 'Im lặng', 'Đi qua'], 0, 'Bé lễ phép chào cô giáo.'),
    Q('Con mèo 🐱 kêu thế nào?', ['Meo meo', 'Gâu gâu', 'Ò ó o'], 0, 'Mèo kêu meo meo.'),
    Q('Được cho quà, bé nói?', ['Con cảm ơn ạ', 'Không nói gì', 'Giật lấy'], 0, 'Bé nói cảm ơn khi nhận quà.'),
    Q('🍎 gọi là quả gì?', ['Quả táo', 'Quả cam', 'Quả chuối'], 0, 'Đó là quả táo.'),
    Q('Khi muốn đi vệ sinh, bé nói với cô?', ['Cô ơi con muốn đi vệ sinh', 'Không nói', 'Khóc'], 0, 'Bé biết nói nhu cầu của mình với cô.'),
  ]),
  q('N1NN-w01', 'Bé gọi tên đồ vật 🧸', 1, 'ngon-ngu', [
    Q('🚗 là cái gì?', ['Ô tô', 'Máy bay', 'Tàu hỏa'], 0, 'Đó là ô tô.'),
    Q('🐶 là con gì?', ['Con chó', 'Con mèo', 'Con gà'], 0, 'Đó là con chó.'),
    Q('☂️ dùng khi nào?', ['Trời mưa', 'Trời nắng ngủ', 'Ăn cơm'], 0, 'Cái ô che mưa cho bé.'),
    Q('👟 mang ở đâu?', ['Ở chân', 'Trên đầu', 'Ở tay'], 0, 'Giày mang ở chân.'),
  ]),
  q('N1NN-w02', 'Bé nghe kể chuyện 📖', 1, 'ngon-ngu', [
    Q('Truyện "Thỏ và Rùa": ai chạy nhanh hơn?', ['Thỏ', 'Rùa', 'Cả hai'], 0, 'Thỏ chạy nhanh hơn nhưng chủ quan ngủ quên.'),
    Q('Cuối truyện ai về đích trước?', ['Rùa', 'Thỏ', 'Không ai'], 0, 'Rùa chăm chỉ nên về đích trước.'),
    Q('Bà kể chuyện, bé nên?', ['Chăm chú lắng nghe', 'Nói chuyện riêng', 'Bỏ đi'], 0, 'Bé lắng nghe khi được kể chuyện.'),
    Q('Con vật trong truyện "Rùa" đi rất?', ['Chậm', 'Nhanh', 'Bay'], 0, 'Rùa đi chậm nhưng bền bỉ.'),
  ]),
  m('N1NN-w03', 'Ghép con vật với tiếng kêu 🔊', 1, 'ngon-ngu',
    [{ id: 'ga', label: '🐔 Gà trống' }, { id: 'meo', label: '🐱 Mèo' }, { id: 'cho', label: '🐶 Chó' }, { id: 'bo', label: '🐄 Bò' }],
    [{ id: 'gay', label: 'Ò ó o' }, { id: 'meo2', label: 'Meo meo' }, { id: 'gau', label: 'Gâu gâu' }, { id: 'um', label: 'Um bò' }],
    [['ga', 'gay'], ['meo', 'meo2'], ['cho', 'gau'], ['bo', 'um']],
    'Bấm con vật rồi bấm tiếng kêu của nó.'),
];

// ── Chồi (4 tuổi) ──
const N2_NN = [
  q('N2NN-quiz', 'Chồi · Kể chuyện & Làm quen âm ✨', 2, 'ngon-ngu', [
    Q('Từ "bà" bắt đầu bằng chữ cái nào?', ['B', 'A', 'C'], 0, 'Từ "bà" bắt đầu bằng chữ B.'),
    Q('Từ "mẹ" bắt đầu bằng chữ?', ['M', 'E', 'N'], 0, 'Từ "mẹ" bắt đầu bằng chữ M.'),
    Q('Nghe xong chuyện, bé kể lại là để?', ['Nhớ và nói tốt hơn', 'Cho vui', 'Không cần'], 0, 'Kể lại giúp bé ghi nhớ và nói mạch lạc.'),
    Q('Muốn biết vì sao trời mưa, bé nên?', ['Hỏi cô/bố mẹ', 'Im lặng', 'Đoán bừa'], 0, 'Bé đặt câu hỏi để học điều mới.'),
    Q('Khi bạn đang nói, bé nên?', ['Lắng nghe, không ngắt lời', 'Nói to hơn', 'Bỏ đi'], 0, 'Bé lịch sự lắng nghe bạn nói hết.'),
  ]),
  q('N2NN-w01', 'Bé tìm chữ đầu tiên 🔤', 2, 'ngon-ngu', [
    Q('"Cá" bắt đầu bằng chữ?', ['C', 'A', 'K'], 0, '"Cá" bắt đầu bằng chữ C.'),
    Q('"Ông" bắt đầu bằng chữ?', ['Ô', 'O', 'A'], 0, '"Ông" bắt đầu bằng chữ Ô.'),
    Q('"Nhà" bắt đầu bằng chữ?', ['N', 'H', 'A'], 0, '"Nhà" bắt đầu bằng chữ N (nh).'),
    Q('"Táo" bắt đầu bằng chữ?', ['T', 'A', 'O'], 0, '"Táo" bắt đầu bằng chữ T.'),
  ]),
  q('N2NN-w02', 'Bé kể chuyện theo tranh 🖼️', 2, 'ngon-ngu', [
    Q('Tranh có mây đen ☁️ và bé cầm ô, trời sắp?', ['Mưa', 'Nắng to', 'Có tuyết'], 0, 'Mây đen báo trời sắp mưa.'),
    Q('Tranh bé tưới cây 🪴, bé đang làm việc?', ['Tốt, chăm cây', 'Xấu', 'Phá cây'], 0, 'Tưới cây là việc tốt, chăm sóc cây.'),
    Q('Tranh gia đình ăn cơm 🍚, mọi người thấy?', ['Vui vẻ, đầm ấm', 'Buồn', 'Giận nhau'], 0, 'Bữa cơm gia đình đầm ấm, vui vẻ.'),
    Q('Kể chuyện theo tranh, bé nên nói?', ['Rõ ràng, đủ câu', 'Ú ớ', 'Không nói'], 0, 'Bé tập nói rõ ràng, thành câu.'),
  ]),
  m('N2NN-w03', 'Ghép chữ cái với từ 🅰️', 2, 'ngon-ngu',
    [{ id: 'b', label: 'Chữ B' }, { id: 'm', label: 'Chữ M' }, { id: 'c', label: 'Chữ C' }, { id: 'n', label: 'Chữ N' }],
    [{ id: 'bo', label: '🏀 Bóng' }, { id: 'me', label: '👩 Mẹ' }, { id: 'ca', label: '🐟 Cá' }, { id: 'na', label: '🏠 Nhà' }],
    [['b', 'bo'], ['m', 'me'], ['c', 'ca'], ['n', 'na']],
    'Bấm chữ cái rồi bấm từ bắt đầu bằng chữ đó.'),
];

// ── Lá (5 tuổi) — 29 chữ cái & ghép vần ──
const N3_NN = [
  q('N3NN-quiz', 'Lá · 29 chữ cái & Ghép vần 📚', 3, 'ngon-ngu', [
    Q('Bảng chữ cái Tiếng Việt có bao nhiêu chữ cái?', ['29', '26', '24'], 0, 'Tiếng Việt có 29 chữ cái.'),
    Q('Chữ cái đầu tiên trong bảng là?', ['A', 'B', 'O'], 0, 'Chữ cái đầu tiên là A.'),
    Q('Ghép "b" + "a" đọc là?', ['ba', 'ab', 'bô'], 0, '"b" ghép "a" đọc là "ba".'),
    Q('Ghép "m" + "e" (dấu nặng) đọc là?', ['mẹ', 'em', 'me'], 0, '"m-e-nặng" đọc là "mẹ".'),
    Q('Từ "cá" có mấy chữ cái?', ['2 (c, a)', '3', '1'], 0, '"cá" gồm chữ c và a, có dấu sắc.'),
  ]),
  q('N3NN-w01', 'Bé đọc chữ cái 🔠', 3, 'ngon-ngu', [
    Q('Sau chữ A là chữ?', ['Ă', 'B', 'O'], 0, 'Trong bảng chữ cái, sau A là Ă.'),
    Q('Chữ nào là nguyên âm?', ['A, E, O', 'B, C, D', 'M, N'], 0, 'A, E, I, O, U… là nguyên âm.'),
    Q('Chữ "Ơ" khác chữ "O" ở?', ['Có dấu móc', 'Không khác', 'To hơn'], 0, '"Ơ" có dấu râu (móc) khác với "O".'),
    Q('Chữ đứng cuối bảng chữ cái là?', ['Y', 'A', 'M'], 0, 'Chữ cuối bảng là Y.'),
  ]),
  q('N3NN-w02', 'Bé ghép vần đơn giản 🧩', 3, 'ngon-ngu', [
    Q('"c" + "o" (dấu huyền) = ?', ['cò', 'co', 'oc'], 0, '"c-o-huyền" đọc là "cò".'),
    Q('"b" + "e" (dấu sắc) = ?', ['bé', 'be', 'eb'], 0, '"b-e-sắc" đọc là "bé".'),
    Q('"g" + "à" = ?', ['gà', 'ag', 'ga'], 0, '"g-a-huyền" đọc là "gà".'),
    Q('"l" + "á" = ?', ['lá', 'al', 'la'], 0, '"l-a-sắc" đọc là "lá".'),
  ]),
  m('N3NN-w03', 'Ghép từ với hình 🖍️', 3, 'ngon-ngu',
    [{ id: 'ba', label: '"bà"' }, { id: 'ca', label: '"cá"' }, { id: 'la', label: '"lá"' }, { id: 'ga', label: '"gà"' }, { id: 'bo', label: '"bò"' }],
    [{ id: 'gba', label: '👵' }, { id: 'gca', label: '🐟' }, { id: 'gla', label: '🍃' }, { id: 'gga', label: '🐔' }, { id: 'gbo', label: '🐄' }],
    [['ba', 'gba'], ['ca', 'gca'], ['la', 'gla'], ['ga', 'gga'], ['bo', 'gbo']],
    'Bấm từ rồi bấm hình đúng nghĩa của từ đó.'),
  q('N3NN-w04', 'Bé đọc thơ & kể chuyện 🎙️', 3, 'ngon-ngu', [
    Q('Bài thơ "Ăn quả" dạy bé nhớ ơn ai?', ['Người trồng cây', 'Người bán', 'Không ai'], 0, '"Ăn quả nhớ kẻ trồng cây" — nhớ ơn người trồng.'),
    Q('Đọc thơ hay, bé cần?', ['Đọc rõ, có nhịp', 'Đọc thật nhanh', 'Lầm bầm'], 0, 'Bé đọc rõ ràng, ngắt nhịp cho hay.'),
    Q('Kể lại chuyện, bé nhớ?', ['Nhân vật và việc chính', 'Chỉ tên mình', 'Không gì'], 0, 'Bé nhớ nhân vật và diễn biến chính.'),
    Q('Học thuộc thơ giúp bé?', ['Nhớ tốt, nói hay', 'Mệt', 'Quên chữ'], 0, 'Thuộc thơ rèn trí nhớ và cách nói hay.'),
  ]),
];

// ════════════════════════════════════════════════════════════
// LĨNH VỰC 4 — PHÁT TRIỂN TÌNH CẢM – XÃ HỘI (tinh-cam-xh)
// Cảm xúc · kỹ năng xã hội · hợp tác · văn hóa VN.
// ════════════════════════════════════════════════════════════

// ── Mầm (3 tuổi) ──
const N1_TX = [
  q('N1TX-quiz', 'Mầm · Cảm xúc & Lễ phép 😊', 1, 'tinh-cam-xh', [
    Q('Gặp người lớn, bé nên?', ['Khoanh tay chào', 'Chạy đi', 'Trốn'], 0, 'Bé khoanh tay lễ phép chào người lớn.'),
    Q('Làm sai điều gì đó, bé nói?', ['Con xin lỗi ạ', 'Không sao', 'Đổ cho bạn'], 0, 'Bé biết xin lỗi khi làm sai.'),
    Q('😊 là khuôn mặt?', ['Vui', 'Buồn', 'Giận'], 0, 'Mặt cười 😊 là vui.'),
    Q('😢 là khuôn mặt?', ['Buồn, khóc', 'Vui', 'Ngủ'], 0, 'Mặt 😢 là buồn.'),
    Q('Được giúp đỡ, bé nói?', ['Cảm ơn', 'Im lặng', 'Chê bai'], 0, 'Bé nói cảm ơn khi được giúp.'),
  ]),
  q('N1TX-w01', 'Bé nhận biết cảm xúc 🎭', 1, 'tinh-cam-xh', [
    Q('😠 là cảm xúc?', ['Giận', 'Vui', 'Buồn'], 0, 'Mặt 😠 là đang giận.'),
    Q('😨 là cảm xúc?', ['Sợ hãi', 'Vui', 'No'], 0, 'Mặt 😨 là sợ hãi.'),
    Q('Khi được mẹ ôm 🤗 bé thấy?', ['Ấm áp, vui', 'Sợ', 'Buồn'], 0, 'Bé thấy ấm áp và được yêu thương.'),
    Q('Khi giận, bé nên?', ['Hít thở, nói với cô', 'Đánh bạn', 'Ném đồ'], 0, 'Bé hít thở và nói ra thay vì làm đau ai.'),
  ]),
  m('N1TX-w02', 'Ghép tình huống với lời nói lễ phép 💬', 1, 'tinh-cam-xh',
    [{ id: 'gap', label: 'Gặp cô giáo' }, { id: 'nhan', label: 'Được cho quà' }, { id: 'sai', label: 'Làm sai' }, { id: 've', label: 'Ra về' }],
    [{ id: 'chao', label: 'Con chào cô ạ' }, { id: 'camon', label: 'Con cảm ơn ạ' }, { id: 'xinloi', label: 'Con xin lỗi ạ' }, { id: 'tambiet', label: 'Con chào, con về ạ' }],
    [['gap', 'chao'], ['nhan', 'camon'], ['sai', 'xinloi'], ['ve', 'tambiet']],
    'Bấm tình huống rồi bấm câu nói lễ phép đúng.'),
  q('N1TX-w03', 'Bé chơi cùng bạn 🤝', 1, 'tinh-cam-xh', [
    Q('Có 1 quả bóng, bé và bạn nên?', ['Chơi chung, thay phiên', 'Giành lấy', 'Ném đi'], 0, 'Bé chia sẻ và chơi cùng bạn.'),
    Q('Bạn buồn khóc 😢, bé nên?', ['An ủi bạn', 'Cười bạn', 'Bỏ đi'], 0, 'Bé an ủi để bạn vui trở lại.'),
    Q('Bạn rủ cùng xếp hình, bé?', ['Vui vẻ nhận lời', 'Từ chối gắt', 'Phá hình'], 0, 'Bé vui vẻ chơi cùng bạn.'),
    Q('Khi thắng trò chơi, bé nên?', ['Vui nhưng không chê bạn', 'Chê bạn thua', 'Cười nhạo'], 0, 'Bé vui vẻ, không chê người thua.'),
  ]),
];

// ── Chồi (4 tuổi) ──
const N2_TX = [
  q('N2TX-quiz', 'Chồi · Chia sẻ & Hợp tác 🤝', 2, 'tinh-cam-xh', [
    Q('Đồ chơi bé thích, bạn muốn mượn, bé?', ['Cho bạn mượn, thay phiên', 'Giấu đi', 'Đánh bạn'], 0, 'Bé biết chia sẻ, cho bạn mượn.'),
    Q('Cùng làm bức tranh nhóm, mỗi bạn?', ['Làm một phần, giúp nhau', 'Tranh giành', 'Bỏ đi chơi'], 0, 'Hợp tác: mỗi bạn góp một phần.'),
    Q('Khi rất muốn nói mà cô đang giảng, bé?', ['Giơ tay chờ', 'La lớn', 'Chạy lên'], 0, 'Bé giơ tay và chờ đến lượt.'),
    Q('Khi tức giận muốn hét lên, bé nên?', ['Hít thở sâu, bình tĩnh', 'Đập đồ', 'Cắn bạn'], 0, 'Bé tự kiềm chế bằng hít thở sâu.'),
    Q('Thấy bạn không có bút màu, bé?', ['Cho bạn dùng chung', 'Mặc kệ', 'Trêu bạn'], 0, 'Bé san sẻ đồ dùng với bạn.'),
  ]),
  q('N2TX-w01', 'Bé làm việc nhóm 👫', 2, 'tinh-cam-xh', [
    Q('Xếp hàng rửa tay, bé nên?', ['Chờ đến lượt', 'Chen ngang', 'Xô bạn'], 0, 'Bé kiên nhẫn chờ đến lượt mình.'),
    Q('Trong nhóm, ý kiến khác nhau thì?', ['Cùng bàn, chọn cách hay', 'Cãi nhau', 'Bỏ nhóm'], 0, 'Bé lắng nghe và cùng thống nhất.'),
    Q('Bạn làm tốt, bé nên?', ['Khen bạn', 'Ghen tị', 'Chê bai'], 0, 'Bé khen ngợi, cổ vũ bạn.'),
    Q('Dọn lớp cùng nhau thì?', ['Nhanh và vui hơn', 'Chậm hơn', 'Mệt hơn'], 0, 'Cùng làm thì nhanh và vui hơn.'),
  ]),
  m('N2TX-w02', 'Ghép hành vi với đánh giá 👍👎', 2, 'tinh-cam-xh',
    [{ id: 'chia', label: 'Chia đồ chơi' }, { id: 'giup', label: 'Giúp bạn' }, { id: 'gianh', label: 'Giành đồ' }, { id: 'true', label: 'Trêu bạn khóc' }],
    [{ id: 'tot1', label: '👍 Việc tốt' }, { id: 'tot2', label: '👍 Việc tốt' }, { id: 'xau1', label: '👎 Chưa ngoan' }, { id: 'xau2', label: '👎 Chưa ngoan' }],
    [['chia', 'tot1'], ['giup', 'tot2'], ['gianh', 'xau1'], ['true', 'xau2']],
    'Bấm hành vi rồi bấm đánh giá đúng (ngoan hay chưa ngoan).'),
  q('N2TX-w03', 'Bé yêu gia đình ❤️', 2, 'tinh-cam-xh', [
    Q('Mẹ đi làm về mệt, bé nên?', ['Lấy nước, hỏi thăm mẹ', 'Đòi đồ chơi', 'Khóc'], 0, 'Bé quan tâm, hỏi thăm mẹ.'),
    Q('Sinh nhật bà 🎂, bé làm gì?', ['Chúc mừng, ôm bà', 'Quên', 'Đòi quà'], 0, 'Bé chúc mừng và thể hiện tình cảm với bà.'),
    Q('Em bé khóc, bé (anh/chị) nên?', ['Dỗ em, gọi mẹ', 'Mặc kệ', 'Trêu thêm'], 0, 'Bé thương và dỗ em.'),
    Q('Bố nhờ bé cất dép, bé?', ['Vui vẻ làm giúp', 'Từ chối', 'Vứt dép'], 0, 'Bé sẵn lòng giúp việc nhỏ trong nhà.'),
  ]),
];

// ── Lá (5 tuổi) ──
const N3_TX = [
  q('N3TX-quiz', 'Lá · Giải quyết xung đột & Tự hào VN 🇻🇳', 3, 'tinh-cam-xh', [
    Q('Hai bạn cùng muốn một món đồ, cách hay là?', ['Oẳn tù tì / thay phiên', 'Đánh nhau', 'Giật lấy'], 0, 'Bé giải quyết ôn hòa: thay phiên hoặc bốc thăm.'),
    Q('Lá cờ Tổ quốc Việt Nam có màu?', ['Đỏ, sao vàng', 'Xanh trắng', 'Đen'], 0, 'Cờ đỏ sao vàng là cờ Việt Nam.'),
    Q('Bác Hồ là ai?', ['Vị lãnh tụ kính yêu của VN', 'Bạn cùng lớp', 'Chú hàng xóm'], 0, 'Bác Hồ là vị lãnh tụ kính yêu của dân tộc.'),
    Q('Vào lớp 1, bé cần?', ['Tự tin, ngoan, chăm học', 'Sợ hãi', 'Khóc nhè'], 0, 'Bé tự tin và sẵn sàng đi học lớp 1.'),
    Q('Bạn mới đến lớp còn lạ, bé nên?', ['Làm quen, rủ chơi', 'Bơ đi', 'Trêu bạn'], 0, 'Bé thân thiện, giúp bạn hòa nhập.'),
  ]),
  q('N3TX-w01', 'Bé xử lý tình huống 🧠', 3, 'tinh-cam-xh', [
    Q('Bé vô tình làm ngã tháp của bạn, bé?', ['Xin lỗi, xếp lại cùng bạn', 'Bỏ chạy', 'Cười'], 0, 'Bé xin lỗi và sửa lỗi cùng bạn.'),
    Q('Bạn giành phần thắng không công bằng, bé?', ['Nói nhẹ nhàng, nhờ cô', 'Đánh bạn', 'La hét'], 0, 'Bé nói rõ và nhờ cô giúp, không bạo lực.'),
    Q('Bé thua cuộc chơi, bé nên?', ['Vui vẻ, cố gắng lần sau', 'Khóc, bỏ chơi', 'Giận bạn'], 0, 'Bé chấp nhận thua và cố gắng tiếp.'),
    Q('Thấy bạn bị bắt nạt, bé?', ['Báo cô giáo', 'Cùng bắt nạt', 'Làm ngơ'], 0, 'Bé báo cô để bảo vệ bạn.'),
  ]),
  m('N3TX-w02', 'Ghép biểu tượng văn hóa Việt Nam 🇻🇳', 3, 'tinh-cam-xh',
    [{ id: 'co', label: 'Cờ Tổ quốc' }, { id: 'bac', label: 'Bác Hồ' }, { id: 'aodai', label: 'Trang phục truyền thống' }, { id: 'tet', label: 'Tết cổ truyền' }],
    [{ id: 'gco', label: '🇻🇳 Cờ đỏ sao vàng' }, { id: 'gbac', label: '👴 Lãnh tụ kính yêu' }, { id: 'gaodai', label: '👘 Áo dài' }, { id: 'gtet', label: '🧧 Bánh chưng, lì xì' }],
    [['co', 'gco'], ['bac', 'gbac'], ['aodai', 'gaodai'], ['tet', 'gtet']],
    'Bấm tên rồi bấm hình biểu tượng văn hóa Việt Nam.'),
  q('N3TX-w03', 'Bé sẵn sàng vào lớp 1 🎒', 3, 'tinh-cam-xh', [
    Q('Ngày đầu vào lớp 1, bé nên?', ['Vui vẻ, tự tin chào bạn mới', 'Khóc đòi về', 'Trốn trong cặp'], 0, 'Bé tự tin làm quen thầy cô, bạn mới.'),
    Q('Bé tự chuẩn bị được việc gì?', ['Sắp cặp, buộc dây giày', 'Không gì cả', 'Nhờ mẹ tất cả'], 0, 'Bé Lá tự phục vụ được nhiều việc.'),
    Q('Quên đồ dùng học tập, bé?', ['Bình tĩnh, mượn hoặc báo cô', 'Khóc to', 'Bỏ học'], 0, 'Bé bình tĩnh xử lý, nhờ cô giúp.'),
    Q('Muốn học giỏi, bé cần?', ['Chăm chú, chăm chỉ', 'Lười biếng', 'Chỉ chơi'], 0, 'Chăm chú nghe giảng và chăm chỉ là chìa khóa.'),
  ]),
];

// ════════════════════════════════════════════════════════════
// LĨNH VỰC 5 — PHÁT TRIỂN THẨM MỸ (tham-my)
// Âm nhạc · tạo hình · cảm thụ cái đẹp · dân ca VN.
// ════════════════════════════════════════════════════════════

// ── Mầm (3 tuổi) ──
const N1_TM = [
  q('N1TM-quiz', 'Mầm · Hát & Tô màu 🎨', 1, 'tham-my', [
    Q('Nghe nhạc vui 🎵, bé thường muốn?', ['Nhún nhảy', 'Ngủ', 'Khóc'], 0, 'Nhạc vui làm bé thích nhún nhảy.'),
    Q('Tô màu 🖍️ bé nên tô?', ['Trong đường viền', 'Ra khắp bàn', 'Lên tường'], 0, 'Bé tô gọn trong hình vẽ.'),
    Q('Ông mặt trời ☀️ bé tô màu gì?', ['Vàng/đỏ', 'Đen', 'Xanh dương đậm'], 0, 'Mặt trời thường tô màu vàng hoặc đỏ cam.'),
    Q('Lá cây 🍃 bé tô màu?', ['Xanh lá', 'Tím', 'Hồng'], 0, 'Lá cây màu xanh.'),
    Q('Nặn đất nặn 🎎 bé có thể tạo?', ['Quả bóng, con giun', 'Không gì', 'Chỉ vứt đi'], 0, 'Bé nặn được quả bóng tròn, con giun dài…'),
  ]),
  q('N1TM-w01', 'Bé cảm nhận âm nhạc 🎶', 1, 'tham-my', [
    Q('Bài "Cháu lên ba" là bài?', ['Hát cho bé', 'Nhạc buồn', 'Nhạc người lớn'], 0, '"Cháu lên ba" là bài hát quen thuộc của bé.'),
    Q('Trống 🥁 phát ra âm thanh khi bé?', ['Gõ vào', 'Nhìn', 'Ngửi'], 0, 'Bé gõ vào trống để tạo tiếng.'),
    Q('Vỗ tay 👏 theo nhạc để?', ['Giữ nhịp, vui', 'Làm ồn', 'Đau tay'], 0, 'Vỗ tay theo nhịp rất vui và đúng nhạc.'),
    Q('Hát cùng cả lớp gọi là?', ['Hát đồng thanh', 'Hát một mình', 'Im lặng'], 0, 'Cả lớp cùng hát là hát đồng thanh.'),
  ]),
  m('N1TM-w02', 'Ghép đồ vật với màu 🌈', 1, 'tham-my',
    [{ id: 'troi', label: '☀️ Mặt trời' }, { id: 'la', label: '🍃 Lá cây' }, { id: 'bien', label: '🌊 Biển' }, { id: 'ca', label: '🍅 Cà chua' }],
    [{ id: 'vang', label: 'Màu vàng' }, { id: 'xanhla', label: 'Màu xanh lá' }, { id: 'xanhduong', label: 'Màu xanh dương' }, { id: 'do', label: 'Màu đỏ' }],
    [['troi', 'vang'], ['la', 'xanhla'], ['bien', 'xanhduong'], ['ca', 'do']],
    'Bấm đồ vật rồi bấm màu thường thấy của nó.'),
  q('N1TM-w03', 'Bé làm quen tạo hình ✂️', 1, 'tham-my', [
    Q('Xé giấy 📄 dán thành hình, bé cần?', ['Khéo tay, dán gọn', 'Vò nát', 'Ăn giấy'], 0, 'Bé xé và dán khéo léo tạo bức tranh.'),
    Q('Cầm bút sáp 🖍️ bé giữ?', ['Bằng mấy ngón tay', 'Bằng chân', 'Bằng miệng'], 0, 'Bé cầm bút bằng ngón tay.'),
    Q('Bức tranh đẹp là bức?', ['Bé tự làm, nhiều màu', 'Bôi bẩn', 'Xé rách'], 0, 'Tranh bé tự làm với nhiều màu là đẹp.'),
    Q('In hình bàn tay 🖐️ lên giấy bằng cách?', ['Chấm màu rồi in tay', 'Cắt tay', 'Vẽ chân'], 0, 'Bé chấm màu vào tay rồi in lên giấy.'),
  ]),
];

// ── Chồi (4 tuổi) ──
const N2_TM = [
  q('N2TM-quiz', 'Chồi · Vẽ & Nhịp điệu 🎵', 2, 'tham-my', [
    Q('Nhạc nhanh 🥁 làm bé muốn?', ['Nhảy nhanh, sôi động', 'Ngồi im', 'Ngủ'], 0, 'Nhạc nhanh thì bé vận động sôi động.'),
    Q('Nhạc chậm 🎻 gợi cảm giác?', ['Nhẹ nhàng, êm', 'Vội vã', 'Ồn ào'], 0, 'Nhạc chậm êm dịu, nhẹ nhàng.'),
    Q('Vẽ theo chủ đề "Gia đình", bé vẽ?', ['Bố, mẹ, bé', 'Ô tô đua', 'Quái vật'], 0, 'Chủ đề gia đình thì vẽ người thân.'),
    Q('Ba màu cơ bản là?', ['Đỏ, vàng, xanh dương', 'Đen, trắng, nâu', 'Hồng, tím, cam'], 0, 'Ba màu cơ bản: đỏ, vàng, xanh dương.'),
    Q('Gấp giấy 🦢 origami cần bé?', ['Gấp theo nếp thẳng', 'Vò tròn', 'Xé nhỏ'], 0, 'Gấp theo nếp thẳng mới ra hình đẹp.'),
  ]),
  q('N2TM-w01', 'Bé pha màu 🎨', 2, 'tham-my', [
    Q('Đỏ 🔴 + Vàng 🟡 = màu?', ['Cam', 'Xanh', 'Tím'], 0, 'Đỏ pha vàng ra màu cam.'),
    Q('Xanh dương 🔵 + Vàng 🟡 = màu?', ['Xanh lá', 'Đỏ', 'Nâu'], 0, 'Xanh dương pha vàng ra xanh lá.'),
    Q('Đỏ 🔴 + Xanh dương 🔵 = màu?', ['Tím', 'Cam', 'Vàng'], 0, 'Đỏ pha xanh dương ra màu tím.'),
    Q('Muốn màu nhạt hơn, bé pha thêm?', ['Màu trắng', 'Màu đen', 'Nước bẩn'], 0, 'Pha trắng làm màu nhạt và sáng hơn.'),
  ]),
  m('N2TM-w02', 'Ghép nhạc cụ với tên 🎸', 2, 'tham-my',
    [{ id: 'trong', label: '🥁 Trống' }, { id: 'dan', label: '🎹 Đàn phím' }, { id: 'sao', label: '🎷 Kèn' }, { id: 'lucnhac', label: '🔔 Chuông' }],
    [{ id: 'go', label: 'Gõ để kêu' }, { id: 'bam', label: 'Bấm phím để kêu' }, { id: 'thoi', label: 'Thổi hơi để kêu' }, { id: 'lac', label: 'Lắc/rung để kêu' }],
    [['trong', 'go'], ['dan', 'bam'], ['sao', 'thoi'], ['lucnhac', 'lac']],
    'Bấm nhạc cụ rồi bấm cách làm nó phát ra tiếng.'),
  q('N2TM-w03', 'Bé tạo hình sáng tạo 🖌️', 2, 'tham-my', [
    Q('Vẽ tự do nghĩa là bé?', ['Vẽ theo ý thích', 'Chép y hệt bạn', 'Không được vẽ'], 0, 'Vẽ tự do là bé sáng tạo theo ý mình.'),
    Q('Nặn con vật 🐘 từ đất nặn cần?', ['Nặn thân, tai, vòi', 'Vò một cục', 'Ăn đất'], 0, 'Bé nặn từng bộ phận rồi ghép lại.'),
    Q('Dán tranh xé giấy, bé dùng?', ['Hồ dán', 'Nước', 'Kẹo'], 0, 'Bé dùng hồ để dán giấy.'),
    Q('Tranh nhiều màu sắc trông?', ['Vui tươi, đẹp', 'Buồn', 'Xấu'], 0, 'Nhiều màu hài hòa làm tranh vui tươi.'),
  ]),
];

// ── Lá (5 tuổi) ──
const N3_TM = [
  q('N3TM-quiz', 'Lá · Biểu diễn & Dân ca Việt Nam 🎭', 3, 'tham-my', [
    Q('"Lý cây đa", "Bắc kim thang" là?', ['Dân ca Việt Nam', 'Nhạc nước ngoài', 'Nhạc rock'], 0, 'Đó là các bài dân ca Việt Nam.'),
    Q('Khi biểu diễn văn nghệ trên sân khấu, bé nên?', ['Tự tin, tươi cười', 'Quay lưng khán giả', 'Bỏ chạy'], 0, 'Bé tự tin, tươi cười khi biểu diễn.'),
    Q('Múa theo nhạc cần bé?', ['Đúng nhịp, mềm mại', 'Đứng im', 'Chạy lung tung'], 0, 'Bé múa theo nhịp, động tác mềm mại.'),
    Q('Vẽ tranh "Quê hương" bé có thể vẽ?', ['Cánh đồng, con trâu, dòng sông', 'Người máy chiến đấu', 'Xe tăng'], 0, 'Quê hương: cánh đồng, con trâu, dòng sông…'),
    Q('Cắt – xé – dán theo ý tưởng riêng thể hiện bé?', ['Sáng tạo', 'Bắt chước', 'Lười'], 0, 'Bé Lá sáng tạo sản phẩm theo ý tưởng riêng.'),
  ]),
  q('N3TM-w01', 'Bé cảm thụ âm nhạc dân tộc 🪕', 3, 'tham-my', [
    Q('Trống cơm, đàn bầu là nhạc cụ?', ['Dân tộc Việt Nam', 'Nước ngoài', 'Đồ chơi'], 0, 'Trống cơm, đàn bầu là nhạc cụ dân tộc VN.'),
    Q('Hát ru 🌙 thường nghe khi?', ['Ru em bé ngủ', 'Chạy nhảy', 'Ăn cơm'], 0, 'Hát ru êm dịu để ru em ngủ.'),
    Q('"Bắc kim thang" là bài hát?', ['Đồng dao vui', 'Nhạc buồn', 'Nhạc chiến'], 0, '"Bắc kim thang" là đồng dao vui của trẻ em.'),
    Q('Nghe nhạc dân ca giúp bé?', ['Yêu quê hương', 'Chán', 'Quên tiếng Việt'], 0, 'Dân ca nuôi dưỡng tình yêu quê hương.'),
  ]),
  m('N3TM-w02', 'Ghép hoạt động nghệ thuật với dụng cụ 🧑‍🎨', 3, 'tham-my',
    [{ id: 've', label: 'Vẽ tranh' }, { id: 'cat', label: 'Cắt giấy' }, { id: 'nan', label: 'Nặn tượng' }, { id: 'hat', label: 'Hát' }],
    [{ id: 'but', label: '🖍️ Bút màu' }, { id: 'keo', label: '✂️ Kéo' }, { id: 'dat', label: '🎎 Đất nặn' }, { id: 'mic', label: '🎤 Micro/giọng hát' }],
    [['ve', 'but'], ['cat', 'keo'], ['nan', 'dat'], ['hat', 'mic']],
    'Bấm hoạt động rồi bấm dụng cụ phù hợp.'),
  q('N3TM-w03', 'Bé biểu diễn tự tin 🌟', 3, 'tham-my', [
    Q('Trước khi lên hát, bé nên?', ['Hít thở, mỉm cười', 'Sợ, trốn', 'Khóc'], 0, 'Bé bình tĩnh, hít thở và mỉm cười.'),
    Q('Quên lời bài hát giữa chừng, bé?', ['Bình tĩnh hát tiếp', 'Òa khóc', 'Chạy xuống'], 0, 'Bé bình tĩnh, cố nhớ và hát tiếp.'),
    Q('Bạn biểu diễn xong, bé nên?', ['Vỗ tay khen bạn', 'Chê bai', 'Bỏ đi'], 0, 'Bé vỗ tay cổ vũ, khen bạn.'),
    Q('Làm sản phẩm tạo hình đẹp, bé nên?', ['Giữ gìn, tặng người thân', 'Xé bỏ', 'Vứt đi'], 0, 'Bé trân trọng sản phẩm, có thể tặng người thân.'),
  ]),
];

// ════════════════════════════════════════════════════════════
// Gom tất cả → map id → scenario
// ════════════════════════════════════════════════════════════
const _ALL = [
  ...N1_TC, ...N2_TC, ...N3_TC,
  ...N1_NN, ...N2_NN, ...N3_NN,
  ...N1_TX, ...N2_TX, ...N3_TX,
  ...N1_TM, ...N2_TM, ...N3_TM,
];

// Rải vị trí đáp án: soạn cho dễ đọc thì đáp án đúng luôn đứng đầu, nhưng UI
// quiz mầm non render `choices` theo đúng thứ tự (KHÔNG xáo trộn). Nếu để
// nguyên, mọi đáp án đúng đều là bong bóng đầu → trẻ học mẹo "chọn ô đầu".
// Ở đây xoay vòng (rotate) các lựa chọn theo hash tất định của câu hỏi để đáp
// án đúng phân bố đều mọi vị trí, mà vẫn cố định (seed vào DB không đổi mỗi lần).
function _hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}
function _spread(sc) {
  if (sc.kind !== 'quiz' || !Array.isArray(sc.questions)) return sc;
  sc.questions = sc.questions.map((q) => {
    const n = q.choices.length;
    if (n < 2) return q;
    const shift = _hash(sc.id + '|' + q.stem) % n;      // 0..n-1, cố định theo câu
    if (!shift) return q;
    const choices = q.choices.map((_, i) => q.choices[(i - shift + n) % n]);
    return { ...q, choices, answer: (q.answer + shift) % n };
  });
  return sc;
}
_ALL.forEach(_spread);

export const PRESCHOOL_FIELDS_SCENARIOS = Object.fromEntries(_ALL.map((s) => [s.id, s]));
