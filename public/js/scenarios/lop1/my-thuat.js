// ============================================================
// Lớp 1 · MĨ THUẬT — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018: chấm–nét cơ bản, màu cơ bản (đỏ/vàng/lam),
// hình vuông–tròn–tam giác, vẽ đồ vật/cây/nhà/con vật/chân dung,
// in lá, xé dán, nặn đất, trang trí khung tranh.
// ID prefix: "P1MT-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1MT', 'my-thuat', n, title, qs, opts);

export const P1MT_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Làm quen môn Mĩ thuật', [
    Q('Đồ dùng nào KHÔNG dùng trong giờ Mĩ thuật?', ['Bút chì', 'Cái cuốc', 'Giấy vẽ', 'Sáp màu'], 1, 'Cuốc là dụng cụ làm vườn, không dùng để vẽ.', ['Sai — bút chì dùng để vẽ.', 'Đúng — cái cuốc để làm vườn, không dùng vẽ.', 'Sai — giấy vẽ để vẽ.', 'Sai — sáp màu để tô.']),
    Q('Khi vẽ, em cầm bút bằng tay nào cho thuận?', ['Hai tay cùng lúc', 'Bằng miệng', 'Bằng chân', 'Tay thuận của em'], 3, 'Cầm bằng tay thuận (phải hoặc trái) để vẽ thoải mái.', ['Sai — chỉ cầm một tay thôi.', 'Sai — không cầm bút bằng miệng.', 'Sai — không cầm bút bằng chân.', 'Đúng — cầm bằng tay thuận cho dễ vẽ.']),
    Q('Trước khi vẽ, em cần chuẩn bị gì?', ['Bút, giấy, màu', 'Cặp sách bỏ ngoài cửa', 'Truyện tranh để đọc trong giờ học', 'Đồ chơi'], 0, 'Chuẩn bị bút, giấy, màu là cần thiết.', ['Đúng — bút, giấy, màu là đồ vẽ cần thiết.', 'Sai — không bỏ cặp ra ngoài cửa.', 'Sai — giờ học không đọc truyện.', 'Sai — đồ chơi không dùng để vẽ.']),
    Q('Sau khi vẽ xong em nên?', ['Cất gọn đồ dùng', 'Bỏ về luôn', 'Vứt đồ bừa bãi', 'Bôi màu lên bàn'], 0, 'Cất gọn đồ dùng để giữ lớp sạch sẽ.', ['Đúng — cất gọn đồ dùng cho lớp sạch.', 'Sai — phải dọn rồi mới về.', 'Sai — không vứt đồ bừa bãi.', 'Sai — không bôi màu lên bàn.']),
  ]),

  M(2, 'Chấm – tạo hình từ chấm', [
    Q('Dụng cụ nào dễ tạo chấm tròn nhất?', ['Cục tẩy', 'Thước kẻ dài', 'Bút chì nhọn đầu', 'Đầu bút màu/bông tăm'], 3, 'Đầu bút hoặc bông tăm tạo chấm tròn đều.', ['Sai — cục tẩy để xoá, khó tạo chấm.', 'Sai — thước để kẻ nét thẳng.', 'Sai — bút chì nhọn cho chấm nhỏ xíu.', 'Đúng — đầu bút hoặc bông tăm cho chấm tròn đều.']),
    Q('Bầu trời đầy sao được vẽ bằng?', ['Đường gãy khúc', 'Đường thẳng dài', 'Hình vuông to', 'Nhiều chấm nhỏ sáng'], 3, 'Các ngôi sao được gợi bằng các chấm nhỏ.', ['Sai — gãy khúc gợi tia chớp.', 'Sai — đường thẳng dài không giống sao.', 'Sai — hình vuông to không phải sao.', 'Đúng — sao được gợi bằng nhiều chấm nhỏ sáng.']),
    Q('Nhiều chấm xếp gần nhau cho cảm giác?', ['Thưa thớt', 'Mất màu', 'Dày, đậm', 'Trống rỗng'], 2, 'Mật độ chấm dày tạo mảng đậm.', ['Sai — chấm gần nhau thì không thưa.', 'Sai — chấm gần nhau không mất màu.', 'Đúng — chấm dày tạo mảng đậm.', 'Sai — chấm dày thì không trống rỗng.']),
    Q('Chấm to – chấm nhỏ khác nhau làm tranh?', ['Nhàm chán', 'Sinh động hơn', 'Bị xấu', 'Mất nét'], 1, 'Chấm có to–nhỏ giúp tranh sinh động.', ['Sai — to nhỏ khác nhau không nhàm chán.', 'Đúng — chấm to nhỏ giúp tranh sinh động.', 'Sai — to nhỏ khác nhau không làm xấu.', 'Sai — chấm không liên quan mất nét.']),
  ]),

  M(3, 'Nét thẳng', [
    Q('Đường nào là đường thẳng?', ['Zíc-zắc', 'Lượn sóng', 'Kẻ bằng thước', 'Đường tròn'], 2, 'Kẻ bằng thước cho ta nét thẳng.', ['Sai — zíc-zắc là nét gấp khúc.', 'Sai — lượn sóng là nét cong.', 'Đúng — kẻ bằng thước cho nét thẳng.', 'Sai — đường tròn là nét cong khép kín.']),
    Q('Cạnh bàn, cạnh bảng là nét?', ['Lượn sóng', 'Thẳng', 'Xoắn ốc', 'Gấp khúc zíc-zắc'], 1, 'Các cạnh đồ dùng học tập là nét thẳng.', ['Sai — cạnh bàn không lượn sóng.', 'Đúng — cạnh bàn, cạnh bảng là nét thẳng.', 'Sai — cạnh bàn không xoắn ốc.', 'Sai — cạnh bàn không gấp khúc.']),
    Q('Để vẽ thân cột cờ, em dùng nét?', ['Gãy khúc', 'Cong lượn', 'Chấm rời', 'Thẳng đứng'], 3, 'Cột cờ là một nét thẳng đứng.', ['Sai — cột cờ không gãy khúc.', 'Sai — cột cờ không cong lượn.', 'Sai — chấm rời không vẽ được cột.', 'Đúng — thân cột cờ là nét thẳng đứng.']),
    Q('Nét thẳng có thể vẽ bằng?', ['Chỉ bằng tay không', 'Chỉ bút lông', 'Cả bằng tay không và thước', 'Chỉ bút chì'], 2, 'Có thể vẽ tay hoặc dùng thước cho thẳng hơn.', ['Sai — không chỉ vẽ bằng tay không.', 'Sai — không chỉ vẽ bằng bút lông.', 'Đúng — có thể vẽ tay hoặc dùng thước.', 'Sai — không chỉ vẽ bằng bút chì.']),
  ]),

  M(4, 'Nét cong', [
    Q('Nét cong gợi cảm giác?', ['Mềm mại, uyển chuyển', 'Gãy gọn', 'Cứng, mạnh', 'Sắc nhọn'], 0, 'Nét cong mềm mại, uyển chuyển.', ['Đúng — nét cong gợi sự mềm mại, uyển chuyển.', 'Sai — gãy gọn là nét gấp khúc.', 'Sai — cứng mạnh là nét thẳng.', 'Sai — sắc nhọn không phải nét cong.']),
    Q('Thân con rắn được vẽ bằng nét?', ['Cong/lượn', 'Gãy khúc', 'Thẳng đứng', 'Chấm rời'], 0, 'Thân rắn uốn lượn → nét cong.', ['Đúng — thân rắn uốn lượn nên dùng nét cong.', 'Sai — thân rắn không gãy khúc.', 'Sai — thân rắn không thẳng đứng.', 'Sai — chấm rời không vẽ được thân rắn.']),
    Q('Cầu vồng có dạng?', ['Hình tam giác', 'Đường cong vòng cung', 'Hình vuông', 'Đường thẳng'], 1, 'Cầu vồng cong hình vòng cung.', ['Sai — cầu vồng không phải tam giác.', 'Đúng — cầu vồng cong hình vòng cung.', 'Sai — cầu vồng không vuông.', 'Sai — cầu vồng không thẳng.']),
    Q('Sóng biển được gợi bằng nét?', ['Thẳng đứng', 'Gấp khúc nhọn', 'Lượn sóng', 'Gãy vuông'], 2, 'Sóng biển dùng nét lượn sóng.', ['Sai — sóng biển không thẳng đứng.', 'Sai — sóng biển không gấp khúc nhọn.', 'Đúng — sóng biển gợi bằng nét lượn sóng.', 'Sai — sóng biển không gãy vuông.']),
  ]),

  M(5, 'Nét gấp khúc', [
    Q('Nét gấp khúc (zíc-zắc) gợi cảm giác?', ['Lặng yên', 'Mạnh, gấp', 'Mềm mại', 'Buồn ngủ, chậm rãi'], 1, 'Nét gấp khúc gợi tia chớp, mạnh và gấp.', ['Sai — gấp khúc không gợi lặng yên.', 'Đúng — nét gấp khúc gợi sự mạnh, gấp.', 'Sai — mềm mại là nét cong.', 'Sai — gấp khúc không gợi chậm rãi.']),
    Q('Răng cưa của lá có dạng nét?', ['Cong tròn', 'Gấp khúc nhỏ', 'Thẳng dài', 'Chấm tròn'], 1, 'Răng cưa của lá là các nét gấp khúc nhỏ.', ['Sai — răng cưa không cong tròn.', 'Đúng — răng cưa của lá là nét gấp khúc nhỏ.', 'Sai — răng cưa không thẳng dài.', 'Sai — răng cưa không phải chấm tròn.']),
    Q('Tia chớp trên trời được vẽ bằng?', ['Đường cong tròn', 'Đường gấp khúc', 'Đường thẳng dài', 'Đường tròn'], 1, 'Tia chớp là đường gấp khúc.', ['Sai — tia chớp không cong tròn.', 'Đúng — tia chớp là đường gấp khúc.', 'Sai — tia chớp không thẳng dài.', 'Sai — tia chớp không phải đường tròn.']),
    Q('Mái nhà ngói thường có nét?', ['Lượn sóng', 'Hai nét thẳng nghiêng chụm đỉnh', 'Một nét cong tròn lớn', 'Chấm rời'], 1, 'Mái nhà ngói tạo bởi hai nét thẳng nghiêng.', ['Sai — mái nhà không lượn sóng.', 'Đúng — mái nhà do hai nét thẳng nghiêng chụm đỉnh.', 'Sai — mái nhà không phải một nét cong tròn.', 'Sai — chấm rời không vẽ được mái nhà.']),
  ]),

  M(6, 'Màu đỏ', [
    Q('Màu đỏ là màu?', ['Trắng đen', 'Cơ bản', 'Pha trộn', 'Màu lạnh'], 1, 'Đỏ là một trong 3 màu cơ bản.', ['Sai — đỏ không phải trắng đen.', 'Đúng — đỏ là một trong 3 màu cơ bản.', 'Sai — đỏ không phải màu pha.', 'Sai — đỏ là màu nóng, không phải lạnh.']),
    Q('Vật nào thường có màu đỏ?', ['Bầu trời ban ngày', 'Lá cây non', 'Bầu trời', 'Quả cà chua chín'], 3, 'Cà chua chín có màu đỏ.', ['Sai — bầu trời ban ngày màu xanh lam.', 'Sai — lá cây non màu xanh.', 'Sai — bầu trời màu xanh lam.', 'Đúng — quả cà chua chín có màu đỏ.']),
    Q('Đèn giao thông đỏ nghĩa là?', ['Rẽ phải', 'Dừng lại', 'Đi chậm', 'Được phép đi tiếp'], 1, 'Đèn đỏ — dừng lại.', ['Sai — đèn đỏ không phải rẽ phải.', 'Đúng — đèn đỏ là dừng lại.', 'Sai — đèn đỏ không phải đi chậm.', 'Sai — đèn đỏ thì không được đi tiếp.']),
    Q('Lá cờ Tổ quốc Việt Nam có nền?', ['Vàng có ngôi sao đỏ', 'Trắng có ngôi sao đỏ', 'Xanh lam có ngôi sao vàng', 'Đỏ'], 3, 'Cờ đỏ sao vàng — nền màu đỏ.', ['Sai — nền cờ không phải vàng.', 'Sai — nền cờ không phải trắng.', 'Sai — nền cờ không phải xanh lam.', 'Đúng — cờ Tổ quốc nền đỏ, sao vàng.']),
  ]),

  M(7, 'Màu vàng', [
    Q('Màu vàng là màu?', ['Cơ bản', 'Màu trung tính', 'Pha trộn', 'Trắng đen'], 0, 'Vàng là một trong 3 màu cơ bản.', ['Đúng — vàng là một trong 3 màu cơ bản.', 'Sai — vàng không phải màu trung tính.', 'Sai — vàng không phải màu pha.', 'Sai — vàng không phải trắng đen.']),
    Q('Mặt trời thường tô màu?', ['Xám tro', 'Hồng nhạt', 'Xanh lam', 'Vàng/cam'], 3, 'Mặt trời gợi nắng — vàng/cam.', ['Sai — mặt trời không tô xám tro.', 'Sai — mặt trời không tô hồng nhạt.', 'Sai — mặt trời không tô xanh lam.', 'Đúng — mặt trời gợi nắng nên tô vàng/cam.']),
    Q('Quả chuối chín có vỏ màu?', ['Tím sẫm', 'Vàng', 'Xanh lam', 'Đỏ tươi'], 1, 'Chuối chín có vỏ vàng.', ['Sai — chuối chín không tím sẫm.', 'Đúng — chuối chín có vỏ vàng.', 'Sai — chuối chín không xanh lam.', 'Sai — chuối chín không đỏ tươi.']),
    Q('Ngôi sao trên cờ Tổ quốc có màu?', ['Vàng', 'Trắng', 'Xanh lam', 'Đỏ tươi'], 0, 'Sao vàng nằm giữa nền đỏ.', ['Đúng — ngôi sao trên cờ có màu vàng.', 'Sai — ngôi sao không phải màu trắng.', 'Sai — ngôi sao không phải xanh lam.', 'Sai — đỏ là màu nền, không phải ngôi sao.']),
  ]),

  M(8, 'Màu xanh (lam)', [
    Q('Màu xanh lam là màu?', ['Đen trắng', 'Màu trung tính', 'Pha trộn', 'Cơ bản'], 3, 'Xanh lam là 1 trong 3 màu cơ bản.', ['Sai — xanh lam không phải đen trắng.', 'Sai — xanh lam không phải trung tính.', 'Sai — xanh lam không phải màu pha.', 'Đúng — xanh lam là 1 trong 3 màu cơ bản.']),
    Q('Bầu trời quang đãng thường có màu?', ['Vàng tươi', 'Đen kịt', 'Đỏ rực', 'Xanh lam'], 3, 'Trời ban ngày thường xanh lam.', ['Sai — trời quang không vàng tươi.', 'Sai — trời quang không đen kịt.', 'Sai — trời quang không đỏ rực.', 'Đúng — bầu trời quang đãng thường xanh lam.']),
    Q('Nước biển thường được vẽ màu?', ['Hồng phấn', 'Xanh lam', 'Vàng tươi', 'Đỏ tươi'], 1, 'Nước biển có màu xanh lam.', ['Sai — nước biển không hồng phấn.', 'Đúng — nước biển có màu xanh lam.', 'Sai — nước biển không vàng tươi.', 'Sai — nước biển không đỏ tươi.']),
    Q('Màu xanh lam thuộc nhóm?', ['Nóng', 'Lạnh', 'Trung tính', 'Màu pha'], 1, 'Xanh lam là màu lạnh.', ['Sai — xanh lam không phải màu nóng.', 'Đúng — xanh lam là màu lạnh.', 'Sai — xanh lam không phải trung tính.', 'Sai — xanh lam là màu cơ bản, không phải màu pha.']),
  ]),

  M(9, 'Ba màu cơ bản', [
    Q('Ba màu cơ bản gồm?', ['Đỏ – Đen – Trắng', 'Hồng – Tím – Cam', 'Nâu – Xám – Lục', 'Đỏ – Vàng – Xanh lam'], 3, 'Ba màu cơ bản: đỏ, vàng, xanh lam.', ['Sai — đen, trắng không phải màu cơ bản.', 'Sai — hồng, tím, cam là màu pha.', 'Sai — nâu, xám, lục là màu pha.', 'Đúng — ba màu cơ bản là đỏ, vàng, xanh lam.']),
    Q('Màu nào KHÔNG phải màu cơ bản?', ['Đen', 'Trắng', 'Xanh lam', 'Tím'], 3, 'Tím là màu pha, không phải màu cơ bản.', ['Sai — câu hỏi tìm màu không cơ bản; đen không phải đáp án đúng ở đây.', 'Sai — đây chưa phải đáp án đúng.', 'Sai — xanh lam là màu cơ bản.', 'Đúng — tím là màu pha, không phải màu cơ bản.']),
    Q('Từ 3 màu cơ bản, ta có thể?', ['Pha ra nhiều màu khác', 'Không pha được gì', 'Chỉ pha được màu xám', 'Chỉ vẽ ba màu'], 0, 'Ba màu cơ bản pha ra được nhiều màu mới.', ['Đúng — từ 3 màu cơ bản pha ra nhiều màu khác.', 'Sai — pha được rất nhiều màu mới.', 'Sai — không chỉ pha ra màu xám.', 'Sai — không chỉ vẽ được ba màu.']),
    Q('Em hãy chọn nhóm CHỈ gồm màu cơ bản:', ['Đỏ – Hồng – Vàng', 'Đỏ – Vàng – Xanh lam', 'Đen – Trắng – Xám', 'Cam – Lục – Tím'], 1, 'Chỉ nhóm đầu là 3 màu cơ bản.', ['Sai — hồng là màu pha.', 'Đúng — đỏ, vàng, xanh lam đều là màu cơ bản.', 'Sai — đen, trắng, xám không phải màu cơ bản.', 'Sai — cam, lục, tím là màu pha.']),
  ]),

  M(10, 'Hình vuông', [
    Q('Hình vuông có mấy cạnh?', ['6', '4', '3', '5'], 1, 'Hình vuông có 4 cạnh bằng nhau.', ['Sai — hình vuông không có 6 cạnh.', 'Đúng — hình vuông có 4 cạnh.', 'Sai — 3 cạnh là hình tam giác.', 'Sai — hình vuông không có 5 cạnh.']),
    Q('Bốn cạnh của hình vuông?', ['Khác nhau', 'Bằng nhau', 'Lượn sóng', 'Hai dài hai ngắn'], 1, 'Hình vuông có 4 cạnh bằng nhau.', ['Sai — bốn cạnh không khác nhau.', 'Đúng — bốn cạnh hình vuông bằng nhau.', 'Sai — cạnh hình vuông là nét thẳng.', 'Sai — bốn cạnh đều bằng nhau, không hai dài hai ngắn.']),
    Q('Vật nào có dạng hình vuông?', ['Quả bóng', 'Cái nón', 'Mặt khăn tay', 'Cây bút'], 2, 'Khăn tay thường vuông.', ['Sai — quả bóng có dạng tròn.', 'Sai — cái nón gần như tam giác.', 'Đúng — mặt khăn tay thường vuông.', 'Sai — cây bút có dạng dài.']),
    Q('Hình vuông được vẽ bằng nét?', ['Thẳng', 'Cong khép kín', 'Chấm rời nối nhau', 'Lượn sóng'], 0, 'Cạnh hình vuông là nét thẳng.', ['Đúng — cạnh hình vuông là nét thẳng.', 'Sai — cong khép kín là hình tròn.', 'Sai — không vẽ vuông bằng chấm rời.', 'Sai — lượn sóng là nét cong.']),
  ]),

  M(11, 'Hình tròn', [
    Q('Hình tròn được vẽ bằng nét?', ['Nhiều chấm rời', 'Cong khép kín', 'Thẳng nối bốn cạnh', 'Gấp khúc'], 1, 'Hình tròn là nét cong khép kín.', ['Sai — không vẽ tròn bằng chấm rời.', 'Đúng — hình tròn là nét cong khép kín.', 'Sai — thẳng nối bốn cạnh là hình vuông.', 'Sai — gấp khúc không tạo hình tròn.']),
    Q('Vật nào có dạng hình tròn?', ['Cái bút', 'Bánh xe', 'Quyển vở', 'Cái thước'], 1, 'Bánh xe là hình tròn.', ['Sai — cái bút có dạng dài.', 'Đúng — bánh xe có dạng hình tròn.', 'Sai — quyển vở có dạng chữ nhật.', 'Sai — cái thước có dạng dài.']),
    Q('Mặt trời thường vẽ dạng?', ['Hình tròn', 'Hình vuông', 'Hình chữ nhật', 'Hình tam giác'], 0, 'Mặt trời vẽ tròn.', ['Đúng — mặt trời thường vẽ dạng hình tròn.', 'Sai — mặt trời không vẽ vuông.', 'Sai — mặt trời không vẽ chữ nhật.', 'Sai — mặt trời không vẽ tam giác.']),
    Q('Để vẽ hình tròn em có thể dùng?', ['Thước thẳng', 'Bút chì và thước kẻ', 'Compa hoặc cốc úp ngược', 'Bút xoá'], 2, 'Compa hoặc đáy cốc giúp vẽ tròn dễ.', ['Sai — thước thẳng để kẻ nét thẳng.', 'Sai — thước kẻ chỉ vẽ được nét thẳng.', 'Đúng — compa hoặc đáy cốc giúp vẽ tròn dễ.', 'Sai — bút xoá không dùng để vẽ tròn.']),
  ]),

  M(12, 'Hình tam giác', [
    Q('Hình tam giác có mấy cạnh?', ['2', '5', '4', '3'], 3, 'Tam giác có 3 cạnh.', ['Sai — tam giác không có 2 cạnh.', 'Sai — tam giác không có 5 cạnh.', 'Sai — 4 cạnh là hình vuông.', 'Đúng — tam giác có 3 cạnh.']),
    Q('Mái nhà ngói thường có dạng?', ['Hình tròn', 'Tam giác', 'Hình vuông', 'Lượn sóng'], 1, 'Mái nhà ngói thường là hình tam giác.', ['Sai — mái nhà không tròn.', 'Đúng — mái nhà ngói thường là hình tam giác.', 'Sai — mái nhà không vuông.', 'Sai — mái nhà không lượn sóng.']),
    Q('Hình tam giác được vẽ bằng?', ['3 nét thẳng nối nhau', '2 nét cong', '1 nét tròn', '4 nét thẳng'], 0, 'Tam giác do 3 nét thẳng tạo thành.', ['Đúng — tam giác do 3 nét thẳng nối nhau.', 'Sai — 2 nét cong không tạo tam giác.', 'Sai — 1 nét tròn là hình tròn.', 'Sai — 4 nét thẳng là hình vuông.']),
    Q('Cái nón lá có dạng?', ['Hình vuông', 'Chữ nhật', 'Tam giác', 'Lượn sóng'], 2, 'Nón lá nhìn ngang gần như tam giác.', ['Sai — nón lá không vuông.', 'Sai — nón lá không phải chữ nhật.', 'Đúng — nón lá nhìn ngang gần như tam giác.', 'Sai — nón lá không lượn sóng.']),
  ]),

  M(13, 'Vẽ đồ vật quen thuộc – cái ô', [
    Q('Cái ô thường có phần?', ['Đầu và đuôi', 'Tán và cán', 'Cánh và mỏ', 'Chân và tay'], 1, 'Ô gồm tán ô (che) và cán ô (tay cầm).', ['Sai — đầu và đuôi là của con vật.', 'Đúng — ô gồm tán ô che và cán ô cầm.', 'Sai — cánh và mỏ là của con chim.', 'Sai — chân và tay là của người.']),
    Q('Tán ô có dạng?', ['Tam giác nhọn', 'Đường thẳng', 'Tròn/vòng cung', 'Hình chữ nhật dài'], 2, 'Tán ô là vòng cung che đầu.', ['Sai — tán ô không phải tam giác nhọn.', 'Sai — tán ô không phải đường thẳng.', 'Đúng — tán ô có dạng tròn/vòng cung che đầu.', 'Sai — tán ô không phải chữ nhật dài.']),
    Q('Cán ô được vẽ bằng nét?', ['Lượn sóng', 'Thẳng', 'Chấm rời nhau', 'Gấp khúc lớn'], 1, 'Cán ô là nét thẳng dài.', ['Sai — cán ô không lượn sóng.', 'Đúng — cán ô là nét thẳng dài.', 'Sai — chấm rời không vẽ được cán ô.', 'Sai — cán ô không gấp khúc.']),
    Q('Em nên tô cái ô bằng?', ['Bôi đen hết', 'Nhiều màu tươi vui', 'Để trắng', 'Một màu duy nhất'], 1, 'Tô nhiều màu tươi vui cho đẹp.', ['Sai — không nên bôi đen hết.', 'Đúng — tô nhiều màu tươi vui cho đẹp.', 'Sai — để trắng thì tranh chưa đẹp.', 'Sai — một màu duy nhất kém vui mắt.']),
  ]),

  M(14, 'Vẽ cây', [
    Q('Cây gồm các phần?', ['Đầu – mình – chân', 'Tán – cán', 'Tay – chân', 'Thân – cành – lá'], 3, 'Cây có thân, cành và lá.', ['Sai — đầu, mình, chân là của con vật.', 'Sai — tán, cán là của cái ô.', 'Sai — tay, chân là của người.', 'Đúng — cây có thân, cành và lá.']),
    Q('Thân cây vẽ bằng nét?', ['Cong lượn', 'Thẳng đứng', 'Lượn sóng', 'Gấp khúc nhỏ'], 1, 'Thân cây thường là nét thẳng đứng.', ['Sai — thân cây không cong lượn.', 'Đúng — thân cây thường là nét thẳng đứng.', 'Sai — thân cây không lượn sóng.', 'Sai — thân cây không gấp khúc.']),
    Q('Tán lá thường vẽ dạng?', ['Đường thẳng', 'Tam giác nhọn', 'Vòng cong', 'Hình chữ nhật dài'], 2, 'Tán lá vẽ dạng vòng cong rồi tô màu xanh.', ['Sai — tán lá không phải đường thẳng.', 'Sai — tán lá không phải tam giác nhọn.', 'Đúng — tán lá vẽ dạng vòng cong rồi tô màu xanh.', 'Sai — tán lá không phải chữ nhật dài.']),
    Q('Lá cây thường có màu?', ['Xanh lam', 'Hồng phấn', 'Xanh lá', 'Cam'], 2, 'Lá cây thường màu xanh lá.', ['Sai — lá cây không phải xanh lam.', 'Sai — lá cây không phải hồng phấn.', 'Đúng — lá cây thường màu xanh lá.', 'Sai — lá cây không phải màu cam.']),
  ]),

  M(15, 'Vẽ ngôi nhà của em', [
    Q('Ngôi nhà đơn giản gồm?', ['Tán và cán', 'Chỉ mái', 'Chỉ cửa', 'Thân nhà – mái – cửa'], 3, 'Nhà có thân, mái và cửa.', ['Sai — tán và cán là của cái ô.', 'Sai — nhà không chỉ có mái.', 'Sai — nhà không chỉ có cửa.', 'Đúng — nhà có thân nhà, mái và cửa.']),
    Q('Thân nhà thường vẽ dạng?', ['Lượn sóng', 'Tam giác', 'Hình vuông/chữ nhật', 'Hình tròn'], 2, 'Thân nhà thường là hình vuông hoặc chữ nhật.', ['Sai — thân nhà không lượn sóng.', 'Sai — tam giác là mái nhà.', 'Đúng — thân nhà thường là hình vuông/chữ nhật.', 'Sai — thân nhà không tròn.']),
    Q('Mái nhà thường vẽ dạng?', ['Hình tròn', 'Hình chữ nhật nằm ngang', 'Tam giác', 'Chấm rời'], 2, 'Mái nhà thường là hình tam giác.', ['Sai — mái nhà không tròn.', 'Sai — mái nhà không phải chữ nhật nằm ngang.', 'Đúng — mái nhà thường là hình tam giác.', 'Sai — chấm rời không vẽ được mái nhà.']),
    Q('Cửa ra vào thường vẽ dạng?', ['Lượn sóng', 'Tam giác nhọn', 'Chữ nhật đứng', 'Hình tròn'], 2, 'Cửa ra vào là chữ nhật đứng.', ['Sai — cửa không lượn sóng.', 'Sai — cửa không phải tam giác nhọn.', 'Đúng — cửa ra vào là hình chữ nhật đứng.', 'Sai — cửa ra vào không tròn.']),
  ]),

  M(16, 'Vẽ con vật – con cá', [
    Q('Con cá có phần?', ['Tán – cán', 'Tay – chân', 'Mái – cửa', 'Đầu – mình – đuôi'], 3, 'Cá có đầu, mình và đuôi.', ['Sai — tán, cán là của cái ô.', 'Sai — tay, chân là của người.', 'Sai — mái, cửa là của ngôi nhà.', 'Đúng — cá có đầu, mình và đuôi.']),
    Q('Mình cá thường có dạng?', ['Đường thẳng', 'Tam giác nhọn', 'Bầu dục/oval', 'Hình chữ nhật dài'], 2, 'Mình cá có dạng bầu dục.', ['Sai — mình cá không phải đường thẳng.', 'Sai — mình cá không phải tam giác nhọn.', 'Đúng — mình cá có dạng bầu dục/oval.', 'Sai — mình cá không phải chữ nhật dài.']),
    Q('Đuôi cá vẽ dạng?', ['Tam giác/quạt', 'Đường thẳng dài', 'Vuông cứng', 'Tròn kín'], 0, 'Đuôi cá xòe như hình tam giác.', ['Đúng — đuôi cá xòe như hình tam giác/quạt.', 'Sai — đuôi cá không phải đường thẳng.', 'Sai — đuôi cá không vuông cứng.', 'Sai — đuôi cá không tròn kín.']),
    Q('Cá sống ở đâu?', ['Trên cây', 'Dưới nước', 'Trong tủ', 'Trên trời'], 1, 'Cá sống ở dưới nước.', ['Sai — cá không sống trên cây.', 'Đúng — cá sống ở dưới nước.', 'Sai — cá không sống trong tủ.', 'Sai — cá không sống trên trời.']),
  ]),

  M(17, 'Vẽ con vật – con mèo', [
    Q('Mèo có mấy chân?', ['8', '4', '6', '2'], 1, 'Mèo có 4 chân.', ['Sai — mèo không có 8 chân.', 'Đúng — mèo có 4 chân.', 'Sai — mèo không có 6 chân.', 'Sai — mèo không có 2 chân.']),
    Q('Đầu mèo có dạng?', ['Đường thẳng', 'Vuông cứng', 'Tròn', 'Tam giác nhọn'], 2, 'Đầu mèo thường vẽ dạng tròn.', ['Sai — đầu mèo không phải đường thẳng.', 'Sai — đầu mèo không vuông cứng.', 'Đúng — đầu mèo thường vẽ dạng tròn.', 'Sai — đầu mèo không phải tam giác nhọn.']),
    Q('Tai mèo có dạng?', ['Tam giác nhỏ', 'Hình vuông nhỏ', 'Tròn to', 'Lượn sóng'], 0, 'Tai mèo là hai tam giác nhỏ.', ['Đúng — tai mèo là hai tam giác nhỏ.', 'Sai — tai mèo không vuông.', 'Sai — tai mèo không tròn to.', 'Sai — tai mèo không lượn sóng.']),
    Q('Mèo kêu thế nào?', ['Ụt ịt', 'Chiếp chiếp', 'Meo meo', 'Gâu gâu'], 2, 'Mèo kêu “meo meo”.', ['Sai — ụt ịt là tiếng con lợn.', 'Sai — chiếp chiếp là tiếng gà con.', 'Đúng — mèo kêu meo meo.', 'Sai — gâu gâu là tiếng con chó.']),
  ]),

  M(18, 'Trưng bày tranh cuối HK1', [
    Q('Trước khi trưng bày, em cần?', ['Vò tranh lại', 'Bôi bẩn tranh', 'Kí tên/dán nhãn lên tranh', 'Xé góc tranh'], 2, 'Kí tên/dán nhãn để biết tranh của ai.', ['Sai — không vò tranh.', 'Sai — không bôi bẩn tranh.', 'Đúng — kí tên/dán nhãn để biết tranh của ai.', 'Sai — không xé góc tranh.']),
    Q('Khi xem tranh của bạn, em nên?', ['Chê bai bạn', 'Khen ngợi điểm hay', 'Vẽ lên tranh bạn', 'Xé tranh'], 1, 'Khen ngợi điều bạn làm tốt.', ['Sai — không nên chê bai bạn.', 'Đúng — khen ngợi điều bạn làm tốt.', 'Sai — không vẽ lên tranh bạn.', 'Sai — không xé tranh.']),
    Q('Tranh được treo ở đâu cho dễ xem?', ['Dưới gầm bàn', 'Trên bảng/tường lớp', 'Ngoài cửa sổ', 'Trong cặp'], 1, 'Treo trên bảng/tường để cả lớp cùng xem.', ['Sai — dưới gầm bàn khó xem.', 'Đúng — treo trên bảng/tường để cả lớp cùng xem.', 'Sai — ngoài cửa sổ khó xem.', 'Sai — trong cặp thì không ai xem được.']),
    Q('Trưng bày tranh giúp em?', ['Tự tin và học hỏi từ bạn', 'Mất bạn', 'Quên cách vẽ', 'Buồn ngủ'], 0, 'Trưng bày giúp em tự tin và học hỏi từ bạn.', ['Đúng — trưng bày giúp em tự tin và học hỏi từ bạn.', 'Sai — trưng bày không làm mất bạn.', 'Sai — trưng bày không làm quên cách vẽ.', 'Sai — trưng bày không gây buồn ngủ.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Pha màu vui – cam', [
    Q('Đỏ + Vàng cho ra màu?', ['Cam', 'Tím', 'Lục (xanh lá)', 'Hồng'], 0, 'Đỏ + vàng = cam.', ['Đúng — đỏ pha vàng cho ra màu cam.', 'Sai — tím là đỏ pha xanh lam.', 'Sai — lục là vàng pha xanh lam.', 'Sai — hồng là đỏ pha trắng.']),
    Q('Quả nào thường có màu cam?', ['Quả mận', 'Quả nho', 'Quả việt quất', 'Quả cam'], 3, 'Quả cam có màu cam.', ['Sai — quả mận thường màu tím đỏ.', 'Sai — quả nho thường màu tím.', 'Sai — việt quất màu tím xanh.', 'Đúng — quả cam có màu cam.']),
    Q('Màu cam thuộc nhóm?', ['Nóng', 'Lạnh', 'Trung tính', 'Không có'], 0, 'Cam là màu nóng.', ['Đúng — cam là màu nóng.', 'Sai — cam không phải màu lạnh.', 'Sai — cam không phải màu trung tính.', 'Sai — cam có thuộc nhóm màu nóng.']),
    Q('Để tô con cá vàng, ta dùng?', ['Xanh lam đậm', 'Đen kịt', 'Tím sẫm', 'Cam/vàng'], 3, 'Cá vàng tô vàng/cam.', ['Sai — cá vàng không tô xanh lam.', 'Sai — cá vàng không tô đen kịt.', 'Sai — cá vàng không tô tím sẫm.', 'Đúng — cá vàng tô bằng màu cam/vàng.']),
  ]),

  M(20, 'Pha màu vui – lục', [
    Q('Xanh lam + Vàng cho ra màu?', ['Hồng', 'Lục (xanh lá)', 'Tím', 'Cam'], 1, 'Lam + vàng = lục.', ['Sai — hồng là đỏ pha trắng.', 'Đúng — xanh lam pha vàng cho ra lục.', 'Sai — tím là đỏ pha xanh lam.', 'Sai — cam là đỏ pha vàng.']),
    Q('Lá cây thường màu?', ['Tím', 'Lục/xanh lá', 'Đen kịt', 'Đỏ tươi'], 1, 'Lá cây màu lục.', ['Sai — lá cây không màu tím.', 'Đúng — lá cây thường màu lục/xanh lá.', 'Sai — lá cây không đen kịt.', 'Sai — lá cây không đỏ tươi.']),
    Q('Màu lục thuộc nhóm?', ['Nóng', 'Đen', 'Trắng', 'Lạnh'], 3, 'Lục là màu lạnh.', ['Sai — lục không phải màu nóng.', 'Sai — lục không phải màu đen.', 'Sai — lục không phải màu trắng.', 'Đúng — lục là màu lạnh.']),
    Q('Em hãy chọn vật có màu lục:', ['Ngọn lửa bếp ga', 'Quả cà chua', 'Quả dưa hấu (vỏ)', 'Quả chuối chín'], 2, 'Vỏ dưa hấu có màu lục.', ['Sai — ngọn lửa bếp ga thường xanh lam.', 'Sai — quả cà chua chín màu đỏ.', 'Đúng — vỏ dưa hấu có màu lục.', 'Sai — chuối chín màu vàng.']),
  ]),

  M(21, 'In lá cây', [
    Q('Để in lá cây, ta tô màu vào mặt nào của lá?', ['Không cần tô', 'Mặt có gân nổi', 'Cuống lá', 'Mặt nhẵn'], 1, 'Mặt có gân nổi sẽ in rõ nét.', ['Sai — phải tô màu thì mới in được.', 'Đúng — mặt có gân nổi sẽ in rõ nét.', 'Sai — chỉ tô cuống thì không in được hình lá.', 'Sai — mặt nhẵn in không rõ gân.']),
    Q('Sau khi tô màu lên lá, ta?', ['Bỏ vào nước', 'Ném đi', 'Úp lên giấy và ấn nhẹ', 'Để khô rồi xé'], 2, 'Úp lá lên giấy rồi ấn nhẹ để in.', ['Sai — bỏ vào nước sẽ trôi màu.', 'Sai — không ném lá đi.', 'Đúng — úp lá lên giấy rồi ấn nhẹ để in.', 'Sai — để khô rồi xé thì không in được.']),
    Q('In lá giúp tạo ra?', ['Hình tam giác', 'Hình tròn đặc', 'Hình lá có gân đẹp', 'Hình vuông'], 2, 'In ra hình lá có gân rõ.', ['Sai — in lá không tạo hình tam giác.', 'Sai — in lá không tạo hình tròn đặc.', 'Đúng — in lá tạo ra hình lá có gân đẹp.', 'Sai — in lá không tạo hình vuông.']),
    Q('Sau khi in xong em nên?', ['Rửa tay, lau bàn', 'Để bừa', 'Ăn cái lá', 'Bôi màu khắp lớp'], 0, 'Rửa tay và lau bàn cho sạch.', ['Đúng — rửa tay và lau bàn cho sạch.', 'Sai — không để bừa.', 'Sai — không ăn cái lá.', 'Sai — không bôi màu khắp lớp.']),
  ]),

  M(22, 'Nghỉ Tết – tranh ngày Tết', [
    Q('Ngày Tết thường có loại hoa nào ở miền Bắc?', ['Hoa cải', 'Hoa sen', 'Hoa hướng dương', 'Hoa đào'], 3, 'Miền Bắc có hoa đào hồng dịp Tết.', ['Sai — hoa cải không phải hoa Tết miền Bắc.', 'Sai — hoa sen nở vào mùa hè.', 'Sai — hoa hướng dương không phải hoa Tết.', 'Đúng — miền Bắc có hoa đào hồng dịp Tết.']),
    Q('Ở miền Nam, Tết thường có hoa?', ['Hoa cúc trắng', 'Hoa đào', 'Hoa hồng', 'Hoa mai vàng'], 3, 'Miền Nam có hoa mai vàng.', ['Sai — hoa cúc trắng không phải hoa Tết miền Nam.', 'Sai — hoa đào là của miền Bắc.', 'Sai — hoa hồng không phải hoa Tết tiêu biểu.', 'Đúng — miền Nam có hoa mai vàng dịp Tết.']),
    Q('Màu chủ đạo của tranh Tết thường?', ['Trắng toát', 'Tím sẫm', 'Đỏ – vàng tươi vui', 'Đen – xám buồn'], 2, 'Tranh Tết thường đỏ – vàng tươi vui.', ['Sai — tranh Tết không trắng toát.', 'Sai — tranh Tết không tím sẫm.', 'Đúng — tranh Tết thường đỏ – vàng tươi vui.', 'Sai — tranh Tết không đen – xám buồn.']),
    Q('Vật nào hay xuất hiện trong tranh Tết?', ['Áo mưa', 'Máy giặt', 'Tủ lạnh', 'Bánh chưng'], 3, 'Bánh chưng quen thuộc ngày Tết.', ['Sai — áo mưa không gắn với Tết.', 'Sai — máy giặt không gắn với Tết.', 'Sai — tủ lạnh không gắn với Tết.', 'Đúng — bánh chưng quen thuộc ngày Tết.']),
  ]),

  M(23, 'Xé dán giấy – hình tròn', [
    Q('Khi xé giấy, em nên?', ['Giật mạnh một cái', 'Nhúng nước rồi xé', 'Cắn xé giấy', 'Xé từ từ theo đường vẽ'], 3, 'Xé từ từ để mép đẹp.', ['Sai — giật mạnh dễ rách hỏng.', 'Sai — nhúng nước làm nhão giấy.', 'Sai — không cắn xé giấy.', 'Đúng — xé từ từ theo đường vẽ cho mép đẹp.']),
    Q('Để dán giấy, em dùng?', ['Hồ/keo dán', 'Đất sét', 'Nước lã', 'Bột mì khô'], 0, 'Dùng hồ hoặc keo dán giấy.', ['Đúng — dùng hồ hoặc keo để dán giấy.', 'Sai — đất sét để nặn, không dán giấy.', 'Sai — nước lã không dán được giấy.', 'Sai — bột mì khô không dán được.']),
    Q('Trước khi dán em nên?', ['Vò giấy', 'Dán bừa', 'Bôi keo khắp bàn', 'Ướm thử vị trí'], 3, 'Ướm thử trước để biết chỗ dán đẹp.', ['Sai — không vò giấy.', 'Sai — không dán bừa.', 'Sai — không bôi keo khắp bàn.', 'Đúng — ướm thử trước để biết chỗ dán đẹp.']),
    Q('Sau khi xé dán em nên?', ['Lau tay sạch, dọn vụn giấy', 'Để vụn khắp lớp', 'Vứt ra cửa sổ', 'Bôi keo lên áo bạn'], 0, 'Phải dọn vụn giấy cho sạch.', ['Đúng — lau tay sạch và dọn vụn giấy.', 'Sai — không để vụn khắp lớp.', 'Sai — không vứt ra cửa sổ.', 'Sai — không bôi keo lên áo bạn.']),
  ]),

  M(24, 'Xé dán – con vật từ hình cơ bản', [
    Q('Để xé dán con cá, em xé hình?', ['Chỉ hình tròn', 'Chỉ hình vuông', 'Chỉ đường thẳng', 'Bầu dục (mình) + tam giác (đuôi)'], 3, 'Mình cá oval + đuôi tam giác.', ['Sai — chỉ hình tròn chưa thành con cá.', 'Sai — chỉ hình vuông không giống cá.', 'Sai — chỉ đường thẳng không thành cá.', 'Đúng — mình bầu dục + đuôi tam giác thành con cá.']),
    Q('Để xé dán mặt trời, em xé hình?', ['Vuông có nhiều tia', 'Lượn sóng', 'Tròn + nhiều tia thẳng', 'Tam giác'], 2, 'Mặt trời: tròn + tia thẳng.', ['Sai — mặt trời không vuông.', 'Sai — lượn sóng không phải mặt trời.', 'Đúng — mặt trời gồm hình tròn + nhiều tia thẳng.', 'Sai — mặt trời không phải tam giác.']),
    Q('Để xé dán ngôi nhà, ta cần?', ['Vuông (thân) + tam giác (mái)', 'Chỉ vuông', 'Chỉ tam giác', 'Chỉ tròn'], 0, 'Thân vuông + mái tam giác.', ['Đúng — thân vuông + mái tam giác thành ngôi nhà.', 'Sai — chỉ vuông thì thiếu mái.', 'Sai — chỉ tam giác thì thiếu thân nhà.', 'Sai — chỉ tròn không thành ngôi nhà.']),
    Q('Khi sắp xếp hình lên giấy, em nên?', ['Đè chồng lên nhau hết', 'Dồn về một góc', 'Cân đối, hài hoà', 'Quay ngược tất cả'], 2, 'Sắp xếp cân đối, hài hoà.', ['Sai — không đè chồng lên nhau hết.', 'Sai — không dồn về một góc.', 'Đúng — sắp xếp cân đối, hài hoà.', 'Sai — không quay ngược tất cả.']),
  ]),

  M(25, 'Nặn đất sét – quả bóng', [
    Q('Để nặn quả bóng tròn, em?', ['Bóp dẹt', 'Ấn ngón tay vào', 'Vò tròn đất giữa hai lòng bàn tay', 'Kéo dài như sợi dây'], 2, 'Vò tròn giữa hai lòng bàn tay.', ['Sai — bóp dẹt thì không tròn.', 'Sai — ấn ngón tay làm lõm đất.', 'Đúng — vò tròn đất giữa hai lòng bàn tay.', 'Sai — kéo dài thành sợi, không tròn.']),
    Q('Khi nặn, em ngồi thế nào?', ['Đứng nhảy', 'Quay lưng', 'Ngay ngắn tại bàn', 'Nằm ra bàn'], 2, 'Ngồi ngay ngắn để dễ nặn.', ['Sai — không đứng nhảy khi nặn.', 'Sai — không quay lưng lại bàn.', 'Đúng — ngồi ngay ngắn tại bàn để dễ nặn.', 'Sai — không nằm ra bàn.']),
    Q('Sau khi nặn em phải?', ['Bôi lên áo bạn', 'Ăn đất sét', 'Rửa tay, lau bàn', 'Vứt đất khắp lớp'], 2, 'Rửa tay và lau bàn cho sạch.', ['Sai — không bôi đất lên áo bạn.', 'Sai — không ăn đất sét.', 'Đúng — rửa tay và lau bàn cho sạch.', 'Sai — không vứt đất khắp lớp.']),
    Q('Đất sét có thể tái sử dụng nếu?', ['Ném ra ngoài trời', 'Ngâm nước nhiều giờ', 'Bảo quản trong hộp kín', 'Để khô ngoài không khí'], 2, 'Đậy kín để đất không bị khô.', ['Sai — ném ra ngoài trời làm hỏng đất.', 'Sai — ngâm nước nhiều giờ làm nhão đất.', 'Đúng — bảo quản trong hộp kín để đất không bị khô.', 'Sai — để khô ngoài không khí thì đất cứng lại.']),
  ]),

  M(26, 'Nặn quả em thích', [
    Q('Để nặn quả táo, ta nặn?', ['Khối vuông', 'Khối tròn rồi gắn cuống nhỏ', 'Khối phẳng', 'Khối dài'], 1, 'Táo có dạng tròn, có cuống nhỏ.', ['Sai — táo không phải khối vuông.', 'Đúng — nặn khối tròn rồi gắn cuống nhỏ.', 'Sai — táo không phải khối phẳng.', 'Sai — táo không phải khối dài.']),
    Q('Để nặn quả chuối, ta nặn?', ['Khối phẳng tam giác', 'Khối dài, cong nhẹ', 'Khối vuông', 'Khối tròn đặc'], 1, 'Chuối dài và cong nhẹ.', ['Sai — chuối không phải khối phẳng tam giác.', 'Đúng — chuối là khối dài, cong nhẹ.', 'Sai — chuối không phải khối vuông.', 'Sai — khối tròn là quả táo.']),
    Q('Màu của quả chuối chín thường?', ['Xanh lá đậm', 'Đỏ tươi', 'Vàng', 'Xanh lam'], 2, 'Chuối chín thường vàng.', ['Sai — chuối xanh chưa chín.', 'Sai — chuối chín không đỏ tươi.', 'Đúng — chuối chín thường có màu vàng.', 'Sai — chuối chín không xanh lam.']),
    Q('Sau khi nặn xong em nên?', ['Đập bẹp', 'Ăn thử', 'Vứt đi luôn', 'Trưng bày khoe bạn'], 3, 'Trưng bày cho cả lớp cùng xem.', ['Sai — không đập bẹp sản phẩm.', 'Sai — không ăn thử đất nặn.', 'Sai — không vứt đi luôn.', 'Đúng — trưng bày khoe bạn cho cả lớp cùng xem.']),
  ]),

  M(27, 'Vẽ chân dung mẹ', [
    Q('Khuôn mặt thường vẽ dạng?', ['Đường thẳng', 'Bầu dục (oval)', 'Tam giác nhọn', 'Vuông cứng'], 1, 'Mặt người thường dạng bầu dục.', ['Sai — khuôn mặt không phải đường thẳng.', 'Đúng — khuôn mặt thường vẽ dạng bầu dục.', 'Sai — khuôn mặt không phải tam giác nhọn.', 'Sai — khuôn mặt không vuông cứng.']),
    Q('Trên mặt có những bộ phận gì?', ['Mắt – mũi – miệng – tai', 'Tán và cán', 'Chỉ có tóc', 'Mái và cửa'], 0, 'Mặt có mắt, mũi, miệng, tai.', ['Đúng — mặt có mắt, mũi, miệng, tai.', 'Sai — tán, cán là của cái ô.', 'Sai — mặt không chỉ có tóc.', 'Sai — mái, cửa là của ngôi nhà.']),
    Q('Hai mắt vẽ thế nào cho cân đối?', ['Cùng kích thước, ngang nhau', 'Cả hai ở má', 'Một trên một dưới', 'Một to một nhỏ'], 0, 'Hai mắt bằng nhau, ngang hàng.', ['Đúng — hai mắt cùng kích thước, ngang nhau.', 'Sai — mắt không nằm ở má.', 'Sai — hai mắt không một trên một dưới.', 'Sai — hai mắt không một to một nhỏ.']),
    Q('Tô màu tranh chân dung mẹ, em nên?', ['Tô tươi vui, dịu dàng', 'Tô đen sì', 'Để trắng hết', 'Bôi xám'], 0, 'Màu tươi vui thể hiện tình yêu mẹ.', ['Đúng — tô tươi vui, dịu dàng thể hiện tình yêu mẹ.', 'Sai — không tô đen sì.', 'Sai — để trắng hết thì chưa đẹp.', 'Sai — bôi xám làm tranh buồn.']),
  ]),

  M(28, 'Vẽ chân dung bạn em', [
    Q('Trước khi vẽ, em nên?', ['Hỏi bạn ăn gì', 'Nhắm mắt tưởng tượng hết', 'Xem điện thoại', 'Quan sát kĩ khuôn mặt bạn'], 3, 'Quan sát kĩ để vẽ giống.', ['Sai — hỏi bạn ăn gì không giúp vẽ.', 'Sai — nhắm mắt thì khó vẽ giống.', 'Sai — xem điện thoại không giúp vẽ.', 'Đúng — quan sát kĩ khuôn mặt bạn để vẽ giống.']),
    Q('Nếu bạn có tóc xoăn, em vẽ tóc bằng nét?', ['Gấp khúc nhọn', 'Lượn xoăn', 'Chấm rời', 'Thẳng tắp'], 1, 'Tóc xoăn vẽ bằng nét lượn xoăn.', ['Sai — gấp khúc nhọn là tia chớp.', 'Đúng — tóc xoăn vẽ bằng nét lượn xoăn.', 'Sai — chấm rời không vẽ tóc xoăn.', 'Sai — thẳng tắp là tóc thẳng.']),
    Q('Nếu bạn đeo kính, em vẽ thêm?', ['Vẽ ô tô', 'Vẽ thêm mũ', 'Hai hình tròn nối nhau ở mắt', 'Không vẽ gì'], 2, 'Kính: hai hình tròn nối nhau che hai mắt.', ['Sai — ô tô không liên quan khuôn mặt.', 'Sai — bạn đeo kính chứ không đội mũ.', 'Đúng — kính là hai hình tròn nối nhau che hai mắt.', 'Sai — phải vẽ thêm kính cho giống.']),
    Q('Khi vẽ xong em nên?', ['Xé tranh', 'Bôi bẩn', 'Giấu đi', 'Tặng tranh cho bạn'], 3, 'Tặng tranh cho bạn rất ý nghĩa.', ['Sai — không xé tranh.', 'Sai — không bôi bẩn tranh.', 'Sai — không giấu đi.', 'Đúng — tặng tranh cho bạn rất ý nghĩa.']),
  ]),

  M(29, 'Vẽ cảnh sân trường', [
    Q('Sân trường có thể có?', ['Núi tuyết', 'Cây xanh, ghế đá, cột cờ', 'Bãi biển', 'Ruộng lúa'], 1, 'Sân trường thường có cây, ghế đá, cột cờ.', ['Sai — sân trường không có núi tuyết.', 'Đúng — sân trường thường có cây xanh, ghế đá, cột cờ.', 'Sai — sân trường không có bãi biển.', 'Sai — sân trường không có ruộng lúa.']),
    Q('Cột cờ thường có gì trên đỉnh?', ['Lá cờ', 'Cái nón', 'Quả bóng', 'Bông hoa'], 0, 'Trên đỉnh cột cờ có lá cờ.', ['Đúng — trên đỉnh cột cờ có lá cờ.', 'Sai — cột cờ không gắn cái nón.', 'Sai — cột cờ không gắn quả bóng.', 'Sai — cột cờ không gắn bông hoa.']),
    Q('Để vẽ nhiều bạn đang chơi, em nên?', ['Vẽ tất cả giống hệt', 'Vẽ to – nhỏ khác nhau', 'Vẽ chồng lên nhau hết', 'Chỉ vẽ một bạn'], 1, 'Vẽ kích thước khác nhau cho sinh động.', ['Sai — vẽ giống hệt thì kém sinh động.', 'Đúng — vẽ to – nhỏ khác nhau cho sinh động.', 'Sai — không vẽ chồng lên nhau hết.', 'Sai — đề bài là vẽ nhiều bạn.']),
    Q('Bầu trời em tô màu?', ['Tím sẫm', 'Xanh lam', 'Xám đậm như sắp mưa', 'Đỏ tươi'], 1, 'Bầu trời thường xanh lam.', ['Sai — bầu trời thường không tím sẫm.', 'Đúng — bầu trời thường tô màu xanh lam.', 'Sai — xám đậm là trời sắp mưa.', 'Sai — bầu trời ban ngày không đỏ tươi.']),
  ]),

  M(30, 'Vẽ con đường tới trường', [
    Q('Con đường có dạng?', ['Hai nét dài song song', 'Hình tròn', 'Hình vuông', 'Chấm rời'], 0, 'Đường là hai nét dài song song.', ['Đúng — con đường là hai nét dài song song.', 'Sai — con đường không phải hình tròn.', 'Sai — con đường không phải hình vuông.', 'Sai — chấm rời không vẽ được con đường.']),
    Q('Hai bên đường thường có?', ['Biển sâu', 'Núi lửa', 'Tàu vũ trụ', 'Cây xanh, nhà cửa'], 3, 'Hai bên đường thường có cây và nhà.', ['Sai — hai bên đường không có biển sâu.', 'Sai — hai bên đường không có núi lửa.', 'Sai — hai bên đường không có tàu vũ trụ.', 'Đúng — hai bên đường thường có cây xanh, nhà cửa.']),
    Q('Để tô đường, em dùng màu?', ['Xám/nâu nhạt', 'Đen kịt', 'Hồng phấn', 'Tím sẫm'], 0, 'Đường thường xám hoặc nâu nhạt.', ['Đúng — đường thường tô màu xám/nâu nhạt.', 'Sai — đường không tô đen kịt.', 'Sai — đường không tô hồng phấn.', 'Sai — đường không tô tím sẫm.']),
    Q('Khi đi trên đường em phải?', ['Đi vỉa hè bên phải', 'Nhắm mắt đi', 'Vừa đi vừa đùa nghịch', 'Chạy giữa đường'], 0, 'Đi vỉa hè bên phải an toàn.', ['Đúng — đi vỉa hè bên phải cho an toàn.', 'Sai — không nhắm mắt khi đi đường.', 'Sai — không đùa nghịch khi đi đường.', 'Sai — không chạy giữa đường.']),
  ]),

  M(31, 'Trang trí khung tranh', [
    Q('Khung tranh thường có hình?', ['Chữ nhật/vuông bao quanh tranh', 'Tam giác nhọn', 'Lượn sóng', 'Tròn nhỏ'], 0, 'Khung tranh thường là chữ nhật/vuông.', ['Đúng — khung tranh thường là chữ nhật/vuông bao quanh tranh.', 'Sai — khung tranh không phải tam giác nhọn.', 'Sai — khung tranh không lượn sóng.', 'Sai — khung tranh không phải tròn nhỏ.']),
    Q('Để khung đẹp, em dùng họa tiết?', ['Để trắng hết', 'Lặp lại đều', 'Bôi đen hết', 'Lộn xộn'], 1, 'Họa tiết lặp lại đều khiến khung đẹp.', ['Sai — để trắng hết thì chưa đẹp.', 'Đúng — họa tiết lặp lại đều khiến khung đẹp.', 'Sai — bôi đen hết làm khung xấu.', 'Sai — lộn xộn làm khung kém đẹp.']),
    Q('Họa tiết có thể là?', ['Số dài', 'Chữ cái khó', 'Toán học', 'Chấm – nét – hoa lá'], 3, 'Họa tiết là chấm, nét, hoa lá đơn giản.', ['Sai — số dài không phải họa tiết.', 'Sai — chữ cái khó không phải họa tiết.', 'Sai — toán học không phải họa tiết.', 'Đúng — họa tiết là chấm, nét, hoa lá đơn giản.']),
    Q('Khung KHÔNG nên?', ['Cân đối', 'Đẹp đều', 'Hài hoà', 'Lấn vào hình chính'], 3, 'Khung không nên che mất hình chính.', ['Sai — khung nên cân đối.', 'Sai — khung nên đẹp đều.', 'Sai — khung nên hài hoà.', 'Đúng — khung không nên lấn che mất hình chính.']),
  ]),

  M(32, 'Trang trí đường diềm', [
    Q('Đường diềm là gì?', ['Một nét dài', 'Một chấm to', 'Một hình tròn', 'Dải họa tiết lặp lại theo hàng'], 3, 'Đường diềm là họa tiết lặp lại thành dải.', ['Sai — đường diềm không phải một nét dài.', 'Sai — đường diềm không phải một chấm to.', 'Sai — đường diềm không phải một hình tròn.', 'Đúng — đường diềm là dải họa tiết lặp lại theo hàng.']),
    Q('Họa tiết trên đường diềm thường?', ['Mỗi cái khác nhau', 'Đè chồng lên', 'Lộn xộn', 'Lặp lại đều'], 3, 'Họa tiết lặp đều nhau.', ['Sai — họa tiết đường diềm không mỗi cái khác nhau.', 'Sai — họa tiết không đè chồng lên.', 'Sai — họa tiết không lộn xộn.', 'Đúng — họa tiết trên đường diềm lặp lại đều.']),
    Q('Đường diềm hay trang trí ở đâu?', ['Dưới gầm bàn', 'Giữa giấy', 'Trên trần', 'Mép khăn, mép áo, mép giấy'], 3, 'Đường diềm hay ở mép khăn, mép áo, mép giấy.', ['Sai — đường diềm không trang trí dưới gầm bàn.', 'Sai — đường diềm ở mép chứ không giữa giấy.', 'Sai — đường diềm không trang trí trên trần.', 'Đúng — đường diềm hay ở mép khăn, mép áo, mép giấy.']),
    Q('Để đường diềm đẹp, màu nên?', ['Hài hoà 2–3 màu', 'Bôi đen hết', 'Dùng 10 màu một lúc', 'Không tô'], 0, 'Hài hoà 2–3 màu cho dễ nhìn.', ['Đúng — hài hoà 2–3 màu cho dễ nhìn.', 'Sai — không bôi đen hết.', 'Sai — dùng quá nhiều màu sẽ rối.', 'Sai — không tô thì chưa đẹp.']),
  ]),

  M(33, 'Vẽ bức tranh em yêu', [
    Q('Chủ đề tranh nên?', ['Quá xa lạ', 'Không có chủ đề', 'Sao chép y nguyên', 'Gần gũi với em'], 3, 'Vẽ điều quen thuộc, em hiểu rõ.', ['Sai — chủ đề quá xa lạ khó vẽ.', 'Sai — tranh nên có chủ đề.', 'Sai — không sao chép y nguyên.', 'Đúng — chọn chủ đề gần gũi, em hiểu rõ.']),
    Q('Trước khi vẽ em nên?', ['Đi chơi đã', 'Vẽ ngay không nghĩ', 'Xé giấy ra', 'Hình dung bố cục'], 3, 'Hình dung trước để bố cục tốt.', ['Sai — chưa đi chơi vội.', 'Sai — không vẽ ngay khi chưa nghĩ.', 'Sai — không xé giấy ra.', 'Đúng — hình dung bố cục trước cho tranh đẹp.']),
    Q('Khi đặt tên tranh, em chọn?', ['Tên của bạn', 'Không cần tên', 'Tên thật dài, khó hiểu', 'Tên ngắn, rõ ý'], 3, 'Tên ngắn, rõ ý.', ['Sai — không lấy tên của bạn.', 'Sai — tranh nên có tên.', 'Sai — tên quá dài, khó hiểu.', 'Đúng — chọn tên ngắn, rõ ý.']),
    Q('Khi vẽ sai một chi tiết, em nên?', ['Vò tranh vứt đi', 'Tô đè màu đen lên toàn bộ', 'Đổ lỗi cho bạn', 'Xử lí khéo, biến thành chi tiết khác'], 3, 'Có thể sáng tạo, biến cái sai thành chi tiết mới.', ['Sai — không vò tranh vứt đi.', 'Sai — không tô đè đen lên toàn bộ.', 'Sai — không đổ lỗi cho bạn.', 'Đúng — xử lí khéo, biến cái sai thành chi tiết mới.']),
  ]),

  M(34, 'Trưng bày tác phẩm', [
    Q('Để chuẩn bị trưng bày, tranh cần?', ['Bị nhàu', 'Khô và phẳng', 'Còn ướt', 'Bị rách'], 1, 'Tranh cần khô và phẳng.', ['Sai — tranh không nên bị nhàu.', 'Đúng — tranh cần khô và phẳng.', 'Sai — tranh còn ướt sẽ lem.', 'Sai — tranh không nên bị rách.']),
    Q('Khi giới thiệu tranh, em nên?', ['Im lặng', 'Quay đi', 'Nói rõ tên tranh và ý mình muốn vẽ', 'Cười to'], 2, 'Nói rõ tên và ý nghĩa cho người xem hiểu.', ['Sai — im lặng thì người xem không hiểu.', 'Sai — không quay đi khi giới thiệu.', 'Đúng — nói rõ tên tranh và ý mình muốn vẽ.', 'Sai — không cười to khi giới thiệu.']),
    Q('Khi nghe bạn giới thiệu tranh, em nên?', ['Bỏ ra ngoài', 'Nói chuyện riêng', 'Chú ý lắng nghe và vỗ tay', 'Cười nhạo'], 2, 'Lắng nghe là tôn trọng bạn.', ['Sai — không bỏ ra ngoài.', 'Sai — không nói chuyện riêng.', 'Đúng — chú ý lắng nghe và vỗ tay là tôn trọng bạn.', 'Sai — không cười nhạo bạn.']),
    Q('Trưng bày giúp em?', ['Ngại nói trước lớp', 'Tự tin và học hỏi', 'Mất bạn', 'Buồn ngủ'], 1, 'Trưng bày giúp em tự tin và học hỏi từ bạn.', ['Sai — trưng bày giúp em bớt ngại.', 'Đúng — trưng bày giúp em tự tin và học hỏi.', 'Sai — trưng bày không làm mất bạn.', 'Sai — trưng bày không gây buồn ngủ.']),
  ]),

  M(35, 'Tổng kết năm học', [
    Q('Sau một năm học Mĩ thuật, em đã biết?', ['Chỉ biết một hình', 'Chỉ biết một màu', 'Không biết gì cả', 'Nhiều nét, màu và hình cơ bản'], 3, 'Em đã biết nhiều nét, màu, hình cơ bản.', ['Sai — em biết nhiều hơn một hình.', 'Sai — em biết nhiều hơn một màu.', 'Sai — em đã biết rất nhiều điều.', 'Đúng — em đã biết nhiều nét, màu và hình cơ bản.']),
    Q('Em sẽ tiếp tục?', ['Chỉ vẽ khi cô giáo yêu cầu', 'Sợ Mĩ thuật', 'Quan sát và sáng tạo nhiều hơn', 'Vò hết tranh đi'], 2, 'Quan sát và sáng tạo tiếp tục cho lớp sau.', ['Sai — em có thể tự vẽ, không chỉ khi cô yêu cầu.', 'Sai — không nên sợ Mĩ thuật.', 'Đúng — quan sát và sáng tạo nhiều hơn.', 'Sai — không vò hết tranh đi.']),
    Q('Đồ dùng Mĩ thuật cuối năm em nên?', ['Vứt đi hết', 'Cho mượn rồi quên', 'Cất gọn, giữ cho năm sau', 'Đập bẹp'], 2, 'Cất gọn để dùng tiếp năm sau.', ['Sai — không vứt đi hết.', 'Sai — cho mượn thì nên nhớ lấy lại.', 'Đúng — cất gọn, giữ cho năm sau dùng tiếp.', 'Sai — không đập bẹp đồ dùng.']),
    Q('Điều quan trọng nhất khi vẽ là?', ['Phải đẹp nhất lớp', 'Vẽ thật nhanh', 'Phải giống y người khác', 'Cảm xúc và sáng tạo của em'], 3, 'Cảm xúc và sáng tạo là quan trọng nhất.', ['Sai — không cần phải đẹp nhất lớp.', 'Sai — vẽ nhanh không phải điều quan trọng nhất.', 'Sai — không cần giống y người khác.', 'Đúng — cảm xúc và sáng tạo của em là quan trọng nhất.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Nhìn lại hành trình sáng tạo', [
    Q('Ba màu cơ bản là gì?', ['Đỏ, vàng, xanh lam', 'Đen, trắng, xám', 'Hồng, tím, nâu', 'Cam, lục, tím'], 0, 'Đỏ – vàng – xanh lam là ba màu cơ bản.', ['Đúng — đỏ, vàng, xanh lam là ba màu cơ bản.', 'Sai — đen, trắng, xám là các sắc độ, không phải màu cơ bản.', 'Sai — đây là các màu pha, không phải màu cơ bản.', 'Sai — cam, lục, tím là màu thứ cấp, do pha hai màu cơ bản mà thành.']),
    Q('Pha màu đỏ với màu vàng được màu gì?', ['Xanh lá', 'Cam', 'Tím', 'Nâu'], 1, 'Đỏ + vàng = cam.', ['Sai — xanh lá do vàng pha với xanh lam.', 'Đúng — đỏ pha vàng ra màu cam.', 'Sai — tím do đỏ pha với xanh lam.', 'Sai — nâu thường do pha nhiều màu lẫn nhau.']),
    Q('Hình nào có 4 cạnh bằng nhau?', ['Hình tròn', 'Hình tam giác', 'Hình vuông', 'Hình chữ nhật'], 2, 'Hình vuông có 4 cạnh dài bằng nhau.', ['Sai — hình tròn không có cạnh thẳng.', 'Sai — tam giác chỉ có 3 cạnh.', 'Đúng — hình vuông có 4 cạnh bằng nhau.', 'Sai — hình chữ nhật có cạnh dài và cạnh ngắn khác nhau.']),
    Q('Xé dán là kĩ thuật dùng gì để tạo hình?', ['Bút mực', 'Đất nặn nung lửa', 'Máy tính', 'Giấy xé thành hình rồi dán'], 3, 'Xé dán: xé giấy thành hình rồi dán lên nền.', ['Sai — bút mực dùng để viết và vẽ nét.', 'Sai — nặn đất là kĩ thuật khác, và Lớp 1 không nung lửa.', 'Sai — xé dán làm bằng tay với giấy thật.', 'Đúng — xé giấy thành hình rồi dán lên nền giấy.']),
    Q('Khi xem tranh của bạn, em nên làm gì?', ['Chê bai bức tranh', 'Vẽ thêm lên tranh bạn', 'Nói điều em thích ở bức tranh', 'Quay đi không nhìn'], 2, 'Cảm thụ tranh là biết nói điều mình thích.', ['Sai — chê bai làm bạn buồn và không giúp bạn tiến bộ.', 'Sai — không được vẽ lên tranh của bạn khi chưa xin phép.', 'Đúng — nói điều em thích là cách xem tranh hay nhất.', 'Sai — xem tranh của bạn giúp em học hỏi thêm.']),
    Q('Lên Lớp 2 em sẽ học thêm cách vẽ nào?', ['Chỉ vẽ bằng một màu', 'Không vẽ nữa', 'Chỉ tô màu vào hình có sẵn', 'Phối cảnh gần – xa đơn giản'], 3, 'Lớp 2 làm quen phối cảnh gần – xa.', ['Sai — em vẫn dùng nhiều màu như ở Lớp 1.', 'Sai — lên Lớp 2 em vẫn học Mĩ thuật.', 'Sai — em sẽ tự vẽ nhiều hơn, không chỉ tô hình sẵn.', 'Đúng — Lớp 2 em sẽ học vẽ phối cảnh gần – xa đơn giản.']),
  ], { difficulty: 2 }),
];

export const P1MT_SCENARIOS = indexBy(P1MT_WEEKS);
