// ============================================================
// Lớp 5 · ÂM NHẠC — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018 môn Âm nhạc Lớp 5.
// ID prefix: "P5AN-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P5AN', 'am-nhac', n, title, qs, opts);

export const P5AN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Ôn tập đầu năm — Hát "Reo vang bình minh"', [
    Q('"Reo vang bình minh" do ai sáng tác?', ['Lưu Hữu Phước', 'Phạm Tuyên', 'Phan Huỳnh Điểu', 'Văn Cao'], 0, '"Reo vang bình minh" là sáng tác của Lưu Hữu Phước.', ['Đúng — nhạc sĩ Lưu Hữu Phước sáng tác bài này.', 'Sai — Phạm Tuyên có nhiều bài khác, không phải bài này.', 'Sai — Phan Huỳnh Điểu không viết bài này.', 'Sai — Văn Cao không viết bài này.']),
    Q('Bài hát có giai điệu?', ['Trầm lắng', 'Vui tươi, rộn ràng', 'Tha thiết, sâu lắng', 'Bi thương'], 1, 'Giai điệu vui tươi, rộn ràng buổi sáng.', ['Sai — bài hát không trầm lắng.', 'Đúng — giai điệu vui tươi, rộn ràng buổi sáng.', 'Sai — bài hát không tha thiết sâu lắng.', 'Sai — bài hát không bi thương.']),
    Q('Hát đầu năm thường gồm?', ['Hét to hết sức', 'Im lặng', 'Nói chuyện', 'Khởi động giọng, ôn bài cũ'], 3, 'Khởi động giọng trước khi hát.', ['Sai — không nên hét to hết sức.', 'Sai — im lặng thì không tập hát được.', 'Sai — nói chuyện không phải hoạt động hát.', 'Đúng — khởi động giọng và ôn bài cũ.']),
    Q('Tư thế hát đúng?', ['Đứng thẳng, vai thả lỏng', 'Ngồi gục', 'Cúi gập người', 'Vặn người'], 0, 'Đứng thẳng giúp giọng vang.', ['Đúng — đứng thẳng, vai thả lỏng giúp giọng vang.', 'Sai — ngồi gục làm tức hơi.', 'Sai — cúi gập người khó lấy hơi.', 'Sai — vặn người là tư thế sai.']),
  ]),

  M(2, 'Học hát "Reo vang bình minh" (tiếp)', [
    Q('Bài hát nói về cảnh?', ['Mưa bão', 'Cảnh chiến tranh', 'Đêm khuya', 'Buổi sáng tươi đẹp ở quê hương'], 3, 'Bài hát ca ngợi buổi sáng đẹp đẽ.', ['Sai — bài hát không nói về mưa bão.', 'Sai — bài hát không nói về chiến tranh.', 'Sai — bài hát nói về buổi sáng, không phải đêm khuya.', 'Đúng — buổi sáng tươi đẹp ở quê hương.']),
    Q('Để hát hay, em cần?', ['Hét lên', 'Hát đúng nhịp, lấy hơi đúng', 'Hát nhanh', 'Hát to hết sức'], 1, 'Đúng nhịp và lấy hơi đúng là quan trọng.', ['Sai — hét lên không phải hát hay.', 'Đúng — hát đúng nhịp và lấy hơi đúng.', 'Sai — hát nhanh dễ sai nhịp.', 'Sai — hát to hết sức làm hỏng giọng.']),
    Q('Khi hát đồng ca, em nên?', ['Hát lệch', 'Hát nhanh', 'Hét to nhất', 'Hát hoà giọng, không hét'], 3, 'Hoà giọng là nguyên tắc hát đồng ca.', ['Sai — hát lệch làm hỏng bài.', 'Sai — hát nhanh làm lệch nhịp.', 'Sai — hét to nhất sẽ át bạn.', 'Đúng — hát hoà giọng, không hét.']),
    Q('Lấy hơi tốt bằng cách?', ['Hét lên', 'Hít sâu qua mũi, giữ hơi đều', 'Nín thở', 'Thở dốc'], 1, 'Hít sâu qua mũi và giữ hơi đều.', ['Sai — hét lên không phải lấy hơi.', 'Đúng — hít sâu qua mũi, giữ hơi đều.', 'Sai — nín thở thì không hát được.', 'Sai — thở dốc làm hơi không đều.']),
  ]),

  M(3, 'Ôn "Reo vang bình minh" + Tập đọc nhạc số 1', [
    Q('Trên khuông nhạc có?', ['7 dòng', '10 dòng', '5 dòng và 4 khe', '3 dòng và 2 khe'], 2, 'Khuông nhạc có 5 dòng và 4 khe.', ['Sai — khuông nhạc không có 7 dòng.', 'Sai — khuông nhạc không có 10 dòng.', 'Đúng — khuông nhạc có 5 dòng và 4 khe.', 'Sai — không phải 3 dòng và 2 khe.']),
    Q('Khoá Son đặt ở?', ['Dòng 1', 'Dòng 5', 'Dòng 2 từ dưới lên', 'Khe 2 từ dưới lên'], 2, 'Khoá Son đặt ở dòng 2.', ['Sai — khoá Son không ở dòng 1.', 'Sai — khoá Son không ở dòng 5.', 'Đúng — khoá Son đặt ở dòng 2 từ dưới lên.', 'Sai — khoá Son ở dòng 2 chứ không phải khe 2.']),
    Q('Các nốt nhạc cơ bản?', ['Đô Rê Mi Pha Son La Si', '1 2 3 4 5', 'Đỏ vàng xanh', 'A B C D'], 0, '7 nốt cơ bản Đô Rê Mi Pha Son La Si.', ['Đúng — 7 nốt cơ bản Đô Rê Mi Pha Son La Si.', 'Sai — đó là chữ số, không phải tên nốt.', 'Sai — đó là màu sắc.', 'Sai — đó là chữ cái.']),
    Q('Nốt cao hơn được viết?', ['Ở vị trí cao trên khuông', 'Ở vị trí thấp', 'Bên phải', 'Bên trái'], 0, 'Nốt càng cao thì vị trí trên khuông càng cao.', ['Đúng — nốt càng cao thì vị trí trên khuông càng cao.', 'Sai — vị trí thấp là nốt trầm.', 'Sai — bên phải là về thời gian, không phải cao độ.', 'Sai — bên trái không quyết định cao độ.']),
  ]),

  M(4, 'Học hát "Hãy giữ cho em bầu trời xanh"', [
    Q('Bài hát "Hãy giữ cho em bầu trời xanh" do ai sáng tác?', ['Phạm Tuyên', 'Huy Trân', 'Văn Cao', 'Trịnh Công Sơn'], 1, '"Hãy giữ cho em bầu trời xanh" do Huy Trân sáng tác.', ['Sai — Phạm Tuyên không viết bài này.', 'Đúng — bài này do Huy Trân sáng tác.', 'Sai — Văn Cao không viết bài này.', 'Sai — Trịnh Công Sơn không viết bài này.']),
    Q('Nội dung bài hát nói về?', ['Học tập', 'Tình bạn', 'Khát vọng hoà bình', 'Mùa xuân'], 2, 'Bài hát thể hiện khát vọng hoà bình cho trẻ em.', ['Sai — bài hát không nói về học tập.', 'Sai — bài hát không nói về tình bạn.', 'Đúng — khát vọng hoà bình cho trẻ em.', 'Sai — bài hát không nói về mùa xuân.']),
    Q('Bài hát phù hợp dịp nào?', ['Ngày hoà bình thế giới, kỉ niệm trẻ em', 'Lễ Vu Lan', 'Tết âm lịch', 'Lễ Phục sinh'], 0, 'Phù hợp ngày hoà bình và sự kiện trẻ em.', ['Đúng — phù hợp ngày hoà bình và sự kiện trẻ em.', 'Sai — không hợp lễ Vu Lan.', 'Sai — không hợp Tết âm lịch.', 'Sai — không hợp lễ Phục sinh.']),
    Q('Khi hát bài này, sắc thái?', ['Buồn bã', 'Hài hước', 'Mạnh mẽ, gay gắt', 'Trong sáng, tha thiết'], 3, 'Sắc thái trong sáng, tha thiết.', ['Sai — bài hát không buồn bã.', 'Sai — bài hát không hài hước.', 'Sai — bài hát không gay gắt.', 'Đúng — sắc thái trong sáng, tha thiết.']),
    Q('Bầu trời xanh tượng trưng cho?', ['Buồn bã', 'Bóng tối', 'Chiến tranh', 'Hoà bình, hi vọng'], 3, 'Bầu trời xanh là biểu tượng hoà bình.', ['Sai — bầu trời xanh không tượng trưng buồn bã.', 'Sai — bầu trời xanh không phải bóng tối.', 'Sai — bầu trời xanh trái nghĩa với chiến tranh.', 'Đúng — bầu trời xanh là biểu tượng hoà bình, hi vọng.']),
  ]),

  M(5, 'Ôn "Hãy giữ cho em bầu trời xanh" + nhạc cụ', [
    Q('Recorder là?', ['Đàn phím', 'Sáo dọc của phương Tây', 'Nhạc cụ gõ bằng dùi', 'Đàn dây'], 1, 'Recorder là sáo dọc thường dùng trong trường học.', ['Sai — recorder không phải đàn phím.', 'Đúng — recorder là sáo dọc của phương Tây.', 'Sai — recorder không phải nhạc cụ gõ.', 'Sai — recorder không phải đàn dây.']),
    Q('Recorder thổi bằng?', ['Dây cọ vào nhau', 'Tay đánh', 'Hơi qua đầu thổi', 'Que gõ'], 2, 'Recorder thổi bằng hơi qua đầu thổi.', ['Sai — recorder không có dây.', 'Sai — không đánh bằng tay.', 'Đúng — thổi bằng hơi qua đầu thổi.', 'Sai — không dùng que gõ.']),
    Q('Bấm nốt Si trên recorder?', ['Bịt kín tất cả các lỗ', 'Bịt hết', 'Bịt kín lỗ ngón cái và lỗ ngón trỏ', 'Mở hết'], 2, 'Nốt Si bịt ngón cái và ngón trỏ.', ['Sai — bịt kín hết là nốt khác.', 'Sai — bịt hết không ra nốt Si.', 'Đúng — nốt Si bịt lỗ ngón cái và ngón trỏ.', 'Sai — mở hết không ra nốt Si.']),
    Q('Khi thổi recorder, em nên?', ['Thổi nhẹ và đều', 'Thổi rất mạnh', 'Lắc đầu', 'Cắn ống'], 0, 'Thổi nhẹ và đều cho âm thanh trong.', ['Đúng — thổi nhẹ và đều cho âm thanh trong.', 'Sai — thổi rất mạnh làm chói tiếng.', 'Sai — lắc đầu không giúp gì.', 'Sai — không nên cắn ống.']),
  ]),

  M(6, 'Tập đọc nhạc số 2', [
    Q('Trường độ nốt đen?', ['2 phách', '1 phách', '4 phách', 'Nửa phách'], 1, 'Nốt đen có trường độ 1 phách.', ['Sai — 2 phách là nốt trắng.', 'Đúng — nốt đen có trường độ 1 phách.', 'Sai — 4 phách là nốt tròn.', 'Sai — nửa phách là nốt móc đơn.']),
    Q('Nốt trắng có giá trị?', ['Nửa phách', '1 phách', '4 phách', '2 phách'], 3, 'Nốt trắng = 2 phách.', ['Sai — nửa phách là nốt móc đơn.', 'Sai — 1 phách là nốt đen.', 'Sai — 4 phách là nốt tròn.', 'Đúng — nốt trắng = 2 phách.']),
    Q('Nốt tròn có giá trị?', ['8 phách', '1 phách', '2 phách', '4 phách'], 3, 'Nốt tròn = 4 phách.', ['Sai — nốt tròn không bằng 8 phách.', 'Sai — 1 phách là nốt đen.', 'Sai — 2 phách là nốt trắng.', 'Đúng — nốt tròn = 4 phách.']),
    Q('Dấu lặng đen là?', ['Khoảng nghỉ 2 phách', 'Khoảng nghỉ 4 phách', 'Khoảng nghỉ 1 phách', 'Nốt 1 phách'], 2, 'Dấu lặng đen nghỉ 1 phách.', ['Sai — không phải nghỉ 2 phách.', 'Sai — không phải nghỉ 4 phách.', 'Đúng — dấu lặng đen nghỉ 1 phách.', 'Sai — dấu lặng là nghỉ, không phải nốt.']),
  ]),

  M(7, 'Học hát "Con chim hay hót"', [
    Q('"Con chim hay hót" do ai sáng tác?', ['Phạm Tuyên', 'Trịnh Công Sơn', 'Phan Huỳnh Điểu', 'Văn Cao'], 2, '"Con chim hay hót" của Phan Huỳnh Điểu (phổ thơ).', ['Sai — Phạm Tuyên không viết bài này.', 'Sai — Trịnh Công Sơn không viết bài này.', 'Đúng — Phan Huỳnh Điểu sáng tác (phổ thơ).', 'Sai — Văn Cao không viết bài này.']),
    Q('Bài hát có tính chất?', ['Buồn bã', 'Trầm tư', 'Bi tráng', 'Hồn nhiên, vui tươi'], 3, 'Tính chất hồn nhiên, vui tươi.', ['Sai — bài hát không buồn bã.', 'Sai — bài hát không trầm tư.', 'Sai — bài hát không bi tráng.', 'Đúng — tính chất hồn nhiên, vui tươi.']),
    Q('Bài hát phỏng theo?', ['Hát ru Nam Bộ', 'Quan họ Bắc Ninh', 'Đồng dao', 'Ca trù miền Bắc'], 2, 'Phỏng theo đồng dao Việt Nam.', ['Sai — không phải hát ru Nam Bộ.', 'Sai — không phải quan họ Bắc Ninh.', 'Đúng — phỏng theo đồng dao Việt Nam.', 'Sai — không phải ca trù.']),
    Q('Khi hát, gõ đệm bằng?', ['Phách hoặc thanh phách', 'Trống lớn', 'Đàn organ', 'Kèn saxophone'], 0, 'Gõ đệm bằng nhạc cụ gõ nhỏ.', ['Đúng — gõ đệm bằng phách hoặc thanh phách.', 'Sai — trống lớn quá to cho bài này.', 'Sai — đàn organ không phải nhạc cụ gõ.', 'Sai — kèn saxophone không phải nhạc cụ gõ.']),
  ]),

  M(8, 'Ôn tập 2 bài hát + Ôn TĐN', [
    Q('Khi ôn 2 bài hát, em nên?', ['Quên lời', 'Bỏ qua', 'Hát sai nhịp', 'Hát đúng giai điệu, lời ca'], 3, 'Hát đúng giai điệu và lời ca.', ['Sai — quên lời thì cần ôn lại.', 'Sai — bỏ qua thì không ôn được.', 'Sai — hát sai nhịp là chưa thuộc.', 'Đúng — hát đúng giai điệu và lời ca.']),
    Q('Lưu ý khi đọc nhạc?', ['Đọc tuỳ ý', 'Đúng cao độ, đúng trường độ', 'Đọc to hết sức', 'Đọc nhanh'], 1, 'Đúng cao độ và trường độ là quan trọng.', ['Sai — đọc tuỳ ý sẽ sai.', 'Đúng — đúng cao độ và đúng trường độ.', 'Sai — đọc to hết sức không cần thiết.', 'Sai — đọc nhanh dễ sai.']),
    Q('Sắc thái bài "Hãy giữ cho em bầu trời xanh"?', ['Sôi nổi, dồn dập', 'Mạnh mẽ', 'Trong sáng, tha thiết', 'Hài hước'], 2, 'Trong sáng, tha thiết.', ['Sai — bài hát không dồn dập.', 'Sai — bài hát không mạnh mẽ gay gắt.', 'Đúng — trong sáng, tha thiết.', 'Sai — bài hát không hài hước.']),
    Q('Bài "Reo vang bình minh" sắc thái?', ['Bi tráng', 'Trầm lắng', 'Vui tươi, rộn ràng', 'Buồn bã'], 2, 'Vui tươi, rộn ràng.', ['Sai — bài hát không bi tráng.', 'Sai — bài hát không trầm lắng.', 'Đúng — vui tươi, rộn ràng.', 'Sai — bài hát không buồn bã.']),
  ]),

  M(9, 'Học hát "Những bông hoa, những bài ca"', [
    Q('"Những bông hoa, những bài ca" do ai sáng tác?', ['Phạm Tuyên', 'Hoàng Long', 'Trịnh Công Sơn', 'Văn Cao'], 1, '"Những bông hoa, những bài ca" của Hoàng Long.', ['Sai — Phạm Tuyên không viết bài này.', 'Đúng — bài này của nhạc sĩ Hoàng Long.', 'Sai — Trịnh Công Sơn không viết bài này.', 'Sai — Văn Cao không viết bài này.']),
    Q('Bài hát viết về?', ['Quê hương', 'Bạn bè thân thiết', 'Mùa xuân', 'Thầy cô giáo'], 3, 'Bài hát ca ngợi thầy cô giáo.', ['Sai — bài hát không viết về quê hương.', 'Sai — bài hát không viết về bạn bè.', 'Sai — bài hát không viết về mùa xuân.', 'Đúng — bài hát ca ngợi thầy cô giáo.']),
    Q('Phù hợp dịp nào?', ['1/6 — Quốc tế Thiếu nhi', '2/9', '20/11 — Ngày Nhà giáo VN', '8/3'], 2, 'Phù hợp Ngày Nhà giáo Việt Nam.', ['Sai — 1/6 là ngày thiếu nhi.', 'Sai — 2/9 là Quốc khánh.', 'Đúng — 20/11 Ngày Nhà giáo Việt Nam.', 'Sai — 8/3 là ngày Quốc tế Phụ nữ.']),
    Q('Sắc thái bài hát?', ['Trang nghiêm, hùng tráng', 'Tươi vui, trìu mến', 'Dữ dội', 'Hài hước'], 1, 'Tươi vui và trìu mến.', ['Sai — bài hát không hùng tráng.', 'Đúng — tươi vui và trìu mến.', 'Sai — bài hát không dữ dội.', 'Sai — bài hát không hài hước.']),
  ]),

  M(10, 'Ôn "Những bông hoa, những bài ca" + TĐN số 3', [
    Q('Nhịp 2/4 nghĩa là?', ['Mỗi ô 3 phách', 'Mỗi ô nhịp 2 phách, mỗi phách bằng nốt đen', 'Mỗi ô 4 phách', 'Mỗi ô 6 phách'], 1, '2/4: 2 phách, đơn vị là nốt đen.', ['Sai — 3 phách là nhịp 3/4.', 'Đúng — mỗi ô 2 phách, mỗi phách là nốt đen.', 'Sai — 4 phách là nhịp 4/4.', 'Sai — 6 phách là nhịp khác.']),
    Q('Trong nhịp 2/4, phách 1 là?', ['Phách yếu', 'Phách nhẹ', 'Phách mạnh vừa', 'Phách mạnh'], 3, 'Phách 1 luôn là phách mạnh.', ['Sai — phách 1 không phải phách yếu.', 'Sai — phách 1 không nhẹ.', 'Sai — phách 1 không phải mạnh vừa.', 'Đúng — phách 1 luôn là phách mạnh.']),
    Q('Vạch nhịp dùng để?', ['Trang trí', 'Chia ô nhịp', 'Không dùng', 'Đánh dấu kết'], 1, 'Vạch nhịp chia khuông thành các ô.', ['Sai — vạch nhịp không phải để trang trí.', 'Đúng — vạch nhịp chia khuông thành các ô.', 'Sai — vạch nhịp luôn được dùng.', 'Sai — đánh dấu kết là vạch kết, không phải vạch nhịp.']),
    Q('Vạch kết bài là?', ['Vạch nhịp đôi đậm', 'Dấu chấm', 'Vạch đơn', 'Dấu hỏi'], 0, 'Vạch nhịp đôi đậm là vạch kết bài.', ['Đúng — vạch nhịp đôi đậm là vạch kết bài.', 'Sai — dấu chấm không phải vạch kết.', 'Sai — vạch đơn là vạch nhịp thường.', 'Sai — dấu hỏi không có trong nhạc.']),
  ]),

  M(11, 'Nhạc cụ dân tộc — Đàn tranh', [
    Q('Đàn tranh có bao nhiêu dây phổ biến?', ['6 dây', '12 dây', '4 dây', '16 dây'], 3, 'Đàn tranh Việt Nam phổ biến 16 dây.', ['Sai — đàn tranh không phổ biến 6 dây.', 'Sai — đàn tranh không phổ biến 12 dây.', 'Sai — 4 dây là đàn khác.', 'Đúng — đàn tranh Việt Nam phổ biến 16 dây.']),
    Q('Đàn tranh thuộc nhóm?', ['Nhạc cụ hơi', 'Nhạc cụ gõ', 'Nhạc cụ dây gảy', 'Nhạc cụ điện'], 2, 'Đàn tranh là nhạc cụ dây gảy.', ['Sai — đàn tranh không phải nhạc cụ hơi.', 'Sai — đàn tranh không phải nhạc cụ gõ.', 'Đúng — đàn tranh là nhạc cụ dây gảy.', 'Sai — đàn tranh không phải nhạc cụ điện.']),
    Q('Cách chơi đàn tranh?', ['Bấm phím', 'Gảy dây bằng móng tay đeo', 'Gõ búa', 'Thổi hơi'], 1, 'Gảy dây bằng móng đeo trên ngón.', ['Sai — đàn tranh không có phím để bấm.', 'Đúng — gảy dây bằng móng đeo trên ngón.', 'Sai — không gõ búa.', 'Sai — không thổi hơi.']),
    Q('Đàn tranh có âm sắc?', ['Chát chúa', 'Trầm, đục', 'Trong, ngân vang', 'Ngắn, gọn'], 2, 'Âm trong và ngân vang.', ['Sai — âm đàn tranh không chát chúa.', 'Sai — âm đàn tranh không trầm đục.', 'Đúng — âm trong và ngân vang.', 'Sai — âm đàn tranh ngân dài, không ngắn gọn.']),
  ]),

  M(12, 'Nhạc cụ dân tộc — Đàn nhị', [
    Q('Đàn nhị có?', ['6 dây', '16 dây', '4 dây', '2 dây'], 3, 'Đàn nhị có 2 dây (nên gọi là "nhị").', ['Sai — đàn nhị không có 6 dây.', 'Sai — 16 dây là đàn tranh.', 'Sai — đàn nhị không có 4 dây.', 'Đúng — đàn nhị có 2 dây nên gọi là "nhị".']),
    Q('Đàn nhị chơi bằng?', ['Kéo cung', 'Thổi hơi', 'Gảy tay', 'Gõ búa'], 0, 'Kéo bằng cung (vĩ).', ['Đúng — đàn nhị kéo bằng cung (vĩ).', 'Sai — đàn nhị không thổi hơi.', 'Sai — đàn nhị không gảy tay.', 'Sai — đàn nhị không gõ búa.']),
    Q('Đàn nhị thuộc nhóm?', ['Nhạc cụ dây kéo', 'Nhạc cụ phím', 'Nhạc cụ hơi', 'Nhạc cụ gõ'], 0, 'Là nhạc cụ dây kéo.', ['Đúng — đàn nhị là nhạc cụ dây kéo.', 'Sai — đàn nhị không có phím.', 'Sai — đàn nhị không phải nhạc cụ hơi.', 'Sai — đàn nhị không phải nhạc cụ gõ.']),
    Q('Đàn nhị thường dùng trong?', ['Nhạc pop quốc tế', 'Hát chèo, hát văn, dân ca', 'Nhạc giao hưởng phương Tây', 'Nhạc rock'], 1, 'Đàn nhị dùng trong nhạc dân tộc VN.', ['Sai — đàn nhị ít dùng trong pop quốc tế.', 'Đúng — đàn nhị dùng trong hát chèo, hát văn, dân ca.', 'Sai — giao hưởng phương Tây dùng violin.', 'Sai — đàn nhị không dùng trong nhạc rock.']),
  ]),

  M(13, 'Nhạc cụ dân tộc — Sáo trúc', [
    Q('Sáo trúc thổi bằng?', ['Bằng tay', 'Hơi qua lỗ thổi ngang', 'Bằng búa', 'Hơi qua đầu thổi'], 1, 'Sáo trúc thổi ngang qua lỗ thổi.', ['Sai — không thổi bằng tay.', 'Đúng — thổi hơi qua lỗ thổi ngang.', 'Sai — không thổi bằng búa.', 'Sai — thổi đầu là recorder, không phải sáo trúc.']),
    Q('Sáo trúc làm bằng?', ['Kim loại', 'Cây trúc', 'Gỗ cứng', 'Nhựa hoàn toàn'], 1, 'Làm từ cây trúc tự nhiên.', ['Sai — sáo trúc không làm bằng kim loại.', 'Đúng — làm từ cây trúc tự nhiên.', 'Sai — không làm bằng gỗ cứng.', 'Sai — sáo trúc làm từ trúc, không phải nhựa.']),
    Q('Sáo trúc thuộc nhóm?', ['Nhạc cụ gõ', 'Nhạc cụ phím', 'Nhạc cụ hơi', 'Nhạc cụ dây'], 2, 'Là nhạc cụ hơi.', ['Sai — sáo trúc không phải nhạc cụ gõ.', 'Sai — sáo trúc không có phím.', 'Đúng — sáo trúc là nhạc cụ hơi.', 'Sai — sáo trúc không có dây.']),
    Q('Sáo trúc có âm sắc?', ['Trầm đục', 'The thé, chói gắt', 'Trong, du dương', 'Vang rền như chuông'], 2, 'Âm trong và du dương.', ['Sai — âm sáo trúc không trầm đục.', 'Sai — âm sáo trúc không chói gắt.', 'Đúng — âm trong và du dương.', 'Sai — sáo trúc không vang rền như chuông.']),
  ]),

  M(14, 'Nhạc cụ dân tộc — Cồng chiêng', [
    Q('Cồng chiêng là?', ['Nhạc cụ phím', 'Nhạc cụ dây', 'Nhạc cụ gõ bằng đồng', 'Nhạc cụ hơi'], 2, 'Cồng chiêng là nhạc cụ gõ bằng đồng.', ['Sai — cồng chiêng không có phím.', 'Sai — cồng chiêng không có dây.', 'Đúng — cồng chiêng là nhạc cụ gõ bằng đồng.', 'Sai — cồng chiêng không phải nhạc cụ hơi.']),
    Q('Cồng chiêng nổi tiếng ở?', ['Đồng bằng sông Hồng', 'Tây Nguyên', 'TP.HCM', 'Hà Nội'], 1, 'Cồng chiêng Tây Nguyên nổi tiếng.', ['Sai — không nổi tiếng ở đồng bằng sông Hồng.', 'Đúng — cồng chiêng Tây Nguyên nổi tiếng.', 'Sai — không gắn với TP.HCM.', 'Sai — không gắn với Hà Nội.']),
    Q('Không gian văn hoá cồng chiêng được UNESCO công nhận là?', ['Không gì cả', 'Di sản văn hoá phi vật thể nhân loại', 'Bí mật', 'Di sản vật thể'], 1, 'UNESCO công nhận là di sản văn hoá phi vật thể.', ['Sai — UNESCO đã công nhận cồng chiêng.', 'Đúng — di sản văn hoá phi vật thể của nhân loại.', 'Sai — đây không phải bí mật.', 'Sai — là phi vật thể, không phải vật thể.']),
    Q('Cồng chiêng dùng trong?', ['Quán cà phê', 'Lễ hội Halloween', 'Tiệc cưới Tây', 'Lễ hội, sinh hoạt cộng đồng Tây Nguyên'], 3, 'Dùng trong lễ hội cộng đồng Tây Nguyên.', ['Sai — không dùng trong quán cà phê.', 'Sai — Halloween không phải lễ hội cồng chiêng.', 'Sai — không dùng cho tiệc cưới Tây.', 'Đúng — dùng trong lễ hội, sinh hoạt cộng đồng Tây Nguyên.']),
  ]),

  M(15, 'Học hát "Ước mơ" (nhạc Trung Quốc, lời Việt)', [
    Q('Bài "Ước mơ" là bài hát nước ngoài lời Việt do?', ['Văn Cao', 'An Hoà đặt lời', 'Phạm Tuyên', 'Trịnh Công Sơn'], 1, '"Ước mơ" nhạc TQ, An Hoà đặt lời Việt.', ['Sai — Văn Cao không đặt lời bài này.', 'Đúng — nhạc Trung Quốc, An Hoà đặt lời Việt.', 'Sai — Phạm Tuyên không đặt lời bài này.', 'Sai — Trịnh Công Sơn không đặt lời bài này.']),
    Q('Nội dung bài hát?', ['Buồn bã', 'Lao động vất vả', 'Chiến tranh', 'Ước mơ tốt đẹp của trẻ em'], 3, 'Ước mơ đẹp của tuổi học trò.', ['Sai — bài hát không buồn bã.', 'Sai — bài hát không nói lao động vất vả.', 'Sai — bài hát không nói chiến tranh.', 'Đúng — ước mơ tốt đẹp của trẻ em.']),
    Q('Sắc thái?', ['Mạnh mẽ', 'Mơ màng, tha thiết', 'Hài hước', 'Bi tráng'], 1, 'Mơ màng, tha thiết.', ['Sai — bài hát không mạnh mẽ.', 'Đúng — mơ màng, tha thiết.', 'Sai — bài hát không hài hước.', 'Sai — bài hát không bi tráng.']),
    Q('Khi hát, em nên?', ['Hát thật to để át bạn', 'Hát đúng cao độ và lời', 'Hát to nhất', 'Cười lớn'], 1, 'Đúng cao độ và lời mới hay.', ['Sai — không nên át bạn.', 'Đúng — hát đúng cao độ và lời.', 'Sai — hát to nhất không phải hát hay.', 'Sai — cười lớn khi đang hát là sai.']),
  ]),

  M(16, 'Ôn "Ước mơ" + TĐN số 4', [
    Q('Dấu lặng nghĩa là?', ['Hát chậm', 'Hát nhanh', 'Im lặng theo trường độ', 'Hát to'], 2, 'Dấu lặng = nghỉ theo trường độ.', ['Sai — dấu lặng không phải hát chậm.', 'Sai — dấu lặng không phải hát nhanh.', 'Đúng — im lặng (nghỉ) theo trường độ.', 'Sai — dấu lặng không phải hát to.']),
    Q('Dấu nối nối 2 nốt cùng cao độ để?', ['Hát to', 'Hát rời', 'Đổi giọng', 'Kéo dài trường độ'], 3, 'Dấu nối kéo dài trường độ.', ['Sai — dấu nối không làm hát to.', 'Sai — dấu nối làm liền, không rời.', 'Sai — dấu nối không đổi giọng.', 'Đúng — dấu nối kéo dài trường độ.']),
    Q('Dấu luyến nối 2 nốt khác cao độ để?', ['Hát to', 'Hát liền tiếng', 'Hát rời', 'Im lặng'], 1, 'Dấu luyến hát liền tiếng nhau.', ['Sai — dấu luyến không làm hát to.', 'Đúng — dấu luyến hát liền tiếng nhau.', 'Sai — dấu luyến làm liền, không rời.', 'Sai — dấu luyến không phải im lặng.']),
    Q('Tốc độ "vừa phải" tiếng Ý là?', ['Presto', 'Adagio', 'Moderato', 'Allegro'], 2, 'Moderato = vừa phải.', ['Sai — Presto là rất nhanh.', 'Sai — Adagio là chậm.', 'Đúng — Moderato nghĩa là vừa phải.', 'Sai — Allegro là nhanh.']),
  ]),

  M(17, 'Ôn tập cuối HK1', [
    Q('Cuối HK1 em đã học mấy bài hát chính?', ['Không bài nào', '4 bài', '10 bài', '1 bài'], 1, 'Khoảng 4 bài chính trong HK1.', ['Sai — em đã học vài bài.', 'Đúng — khoảng 4 bài chính trong HK1.', 'Sai — không nhiều tới 10 bài.', 'Sai — không phải chỉ 1 bài.']),
    Q('Nhạc cụ dân tộc đã học?', ['Guitar điện', 'Đàn tranh, đàn nhị, sáo trúc, cồng chiêng', 'Trống jazz', 'Violin và kèn trumpet'], 1, 'Đã học 4 nhạc cụ dân tộc trên.', ['Sai — guitar điện không phải nhạc cụ dân tộc.', 'Đúng — đàn tranh, đàn nhị, sáo trúc, cồng chiêng.', 'Sai — trống jazz là nhạc cụ phương Tây.', 'Sai — violin và trumpet là nhạc cụ phương Tây.']),
    Q('Khi biểu diễn, em nên?', ['Run, quên lời', 'Bỏ chạy', 'Hát thật to để át nhạc', 'Tự tin, hát đúng'], 3, 'Tự tin và hát đúng là tốt.', ['Sai — run, quên lời là chưa tự tin.', 'Sai — bỏ chạy là sai.', 'Sai — không nên hát át nhạc.', 'Đúng — tự tin và hát đúng.']),
    Q('Sắc thái "Hãy giữ cho em bầu trời xanh"?', ['Mạnh mẽ, hành khúc', 'Trong sáng, tha thiết', 'Hài hước', 'Bi tráng'], 1, 'Trong sáng, tha thiết.', ['Sai — bài hát không phải hành khúc.', 'Đúng — trong sáng, tha thiết.', 'Sai — bài hát không hài hước.', 'Sai — bài hát không bi tráng.']),
  ]),

  M(18, 'Kiểm tra HK1', [
    Q('Khi kiểm tra, em nên?', ['Hát rất nhanh cho xong', 'Hát thật to để được điểm cao', 'Tự tin, hát đúng', 'Run, quên'], 2, 'Tự tin và đúng.', ['Sai — hát nhanh cho xong sẽ sai nhịp.', 'Sai — hát to không phải tiêu chí điểm cao.', 'Đúng — tự tin và hát đúng.', 'Sai — run, quên là chưa chuẩn bị tốt.']),
    Q('Hát cá nhân cần chú ý?', ['Hơi, cao độ, lời ca', 'Hát thật nhanh cho gọn', 'Vừa hát vừa nhảy múa', 'Hét to'], 0, 'Hơi, cao độ, lời là 3 yếu tố quan trọng.', ['Đúng — chú ý hơi, cao độ và lời ca.', 'Sai — hát nhanh cho gọn dễ sai.', 'Sai — vừa hát vừa nhảy dễ lệch.', 'Sai — hét to không phải hát hay.']),
    Q('Đọc nhạc cần?', ['Đọc theo cảm hứng riêng', 'Đọc nhanh', 'Đúng cao độ và trường độ', 'Đọc to'], 2, 'Đúng cao độ và trường độ.', ['Sai — không đọc theo cảm hứng riêng.', 'Sai — đọc nhanh dễ sai.', 'Đúng — đúng cao độ và trường độ.', 'Sai — đọc to không phải tiêu chí.']),
    Q('Thái độ khi nghe bạn hát?', ['Nói chuyện', 'Bỏ ra ngoài', 'Lắng nghe, vỗ tay', 'Cười nhạo'], 2, 'Lắng nghe và động viên.', ['Sai — nói chuyện là thiếu tôn trọng.', 'Sai — bỏ ra ngoài là không lịch sự.', 'Đúng — lắng nghe và vỗ tay động viên.', 'Sai — không nên cười nhạo bạn.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Học hát "Hát mừng" (dân ca Hrê)', [
    Q('"Hát mừng" là dân ca?', ['Nam Bộ', 'Hrê (Tây Nguyên)', 'Hàn Quốc', 'Bắc Bộ'], 1, '"Hát mừng" là dân ca Hrê.', ['Sai — không phải dân ca Nam Bộ.', 'Đúng — "Hát mừng" là dân ca Hrê (Tây Nguyên).', 'Sai — không phải dân ca Hàn Quốc.', 'Sai — không phải dân ca Bắc Bộ.']),
    Q('Tính chất bài?', ['Vui tươi, rộn ràng', 'Bi tráng', 'Trầm lắng', 'Êm dịu, ru ngủ'], 0, 'Vui tươi, rộn ràng kiểu lễ hội Tây Nguyên.', ['Đúng — vui tươi, rộn ràng kiểu lễ hội Tây Nguyên.', 'Sai — bài hát không bi tráng.', 'Sai — bài hát không trầm lắng.', 'Sai — bài hát không êm dịu ru ngủ.']),
    Q('Nhạc cụ phù hợp đệm?', ['Guitar điện', 'Saxophone', 'Đàn organ điện tử', 'Cồng chiêng, trống'], 3, 'Cồng chiêng và trống phù hợp dân ca Tây Nguyên.', ['Sai — guitar điện không hợp dân ca Tây Nguyên.', 'Sai — saxophone không hợp.', 'Sai — đàn organ điện tử không hợp.', 'Đúng — cồng chiêng và trống phù hợp dân ca Tây Nguyên.']),
    Q('Khi hát em nên?', ['Buồn bã', 'Im lặng', 'Nhanh quá độ', 'Vui tươi, gõ đệm theo'], 3, 'Vui tươi, gõ đệm theo nhịp.', ['Sai — bài này vui, không buồn bã.', 'Sai — im lặng thì không hát được.', 'Sai — nhanh quá độ làm lệch nhịp.', 'Đúng — vui tươi, gõ đệm theo nhịp.']),
  ]),

  M(20, 'Ôn "Hát mừng" + TĐN số 5', [
    Q('Nhịp 4/4 nghĩa là?', ['4 phách/ô, đơn vị là nốt đen', '3 phách', '6 phách', '2 phách'], 0, '4/4: 4 phách/ô, đơn vị nốt đen.', ['Đúng — 4 phách/ô, đơn vị là nốt đen.', 'Sai — 3 phách là nhịp 3/4.', 'Sai — 6 phách là nhịp khác.', 'Sai — 2 phách là nhịp 2/4.']),
    Q('Trong 4/4, phách mạnh nhất ở?', ['Phách 2', 'Phách 4', 'Phách 3', 'Phách 1'], 3, 'Phách 1 mạnh nhất.', ['Sai — phách 2 nhẹ.', 'Sai — phách 4 nhẹ.', 'Sai — phách 3 chỉ mạnh vừa.', 'Đúng — phách 1 mạnh nhất.']),
    Q('Phách mạnh vừa trong 4/4 ở?', ['Phách 1', 'Phách 3', 'Phách 2', 'Phách 4'], 1, 'Phách 3 mạnh vừa, phách 2 và 4 nhẹ.', ['Sai — phách 1 là mạnh nhất.', 'Đúng — phách 3 mạnh vừa.', 'Sai — phách 2 nhẹ.', 'Sai — phách 4 nhẹ.']),
    Q('Nhịp 4/4 hay dùng cho?', ['Điệu valse xoay', 'Hành khúc', 'Nhạc trữ tình, nhạc nhẹ', 'Vọng cổ'], 2, '4/4 phổ biến cho nhạc trữ tình.', ['Sai — valse là nhịp 3/4.', 'Sai — hành khúc thường nhịp 2/4.', 'Đúng — 4/4 phổ biến cho nhạc trữ tình, nhạc nhẹ.', 'Sai — vọng cổ có cấu trúc riêng.']),
  ]),

  M(21, 'Học hát "Tre ngà bên Lăng Bác"', [
    Q('"Tre ngà bên Lăng Bác" do ai sáng tác?', ['Trịnh Công Sơn', 'Hàn Ngọc Bích', 'Phạm Tuyên', 'Văn Cao'], 1, '"Tre ngà bên Lăng Bác" của Hàn Ngọc Bích.', ['Sai — Trịnh Công Sơn không viết bài này.', 'Đúng — bài này của nhạc sĩ Hàn Ngọc Bích.', 'Sai — Phạm Tuyên không viết bài này.', 'Sai — Văn Cao không viết bài này.']),
    Q('Nội dung bài hát?', ['Tình bạn', 'Ca ngợi Bác Hồ, Lăng Bác', 'Mùa xuân', 'Học tập'], 1, 'Ca ngợi Bác Hồ qua hình ảnh tre ngà bên Lăng.', ['Sai — bài hát không nói về tình bạn.', 'Đúng — ca ngợi Bác Hồ qua hình ảnh tre ngà bên Lăng.', 'Sai — bài hát không nói về mùa xuân.', 'Sai — bài hát không nói về học tập.']),
    Q('Sắc thái bài?', ['Dữ dội', 'Vui nhộn', 'Hài hước', 'Tha thiết, trang nghiêm'], 3, 'Tha thiết, trang nghiêm.', ['Sai — bài hát không dữ dội.', 'Sai — bài hát không vui nhộn.', 'Sai — bài hát không hài hước.', 'Đúng — tha thiết, trang nghiêm.']),
    Q('Lăng Bác Hồ ở?', ['Đà Nẵng', 'Quảng trường Ba Đình, Hà Nội', 'TP.HCM', 'Làng Sen, Nghệ An'], 1, 'Lăng Bác ở Quảng trường Ba Đình, Hà Nội.', ['Sai — Lăng Bác không ở Đà Nẵng.', 'Đúng — Lăng Bác ở Quảng trường Ba Đình, Hà Nội.', 'Sai — Lăng Bác không ở TP.HCM.', 'Sai — Làng Sen là quê Bác, không phải nơi đặt Lăng.']),
  ]),

  M(22, 'Ôn "Tre ngà bên Lăng Bác" + TĐN số 6', [
    Q('Tiết tấu chấm dôi là?', ['Giảm trường độ', 'Tăng thêm 1/2 trường độ nốt đứng trước', 'Im lặng', 'Đổi cao độ'], 1, 'Dấu chấm dôi tăng thêm 1/2.', ['Sai — chấm dôi không giảm trường độ.', 'Đúng — tăng thêm 1/2 trường độ nốt đứng trước.', 'Sai — chấm dôi không phải im lặng.', 'Sai — chấm dôi không đổi cao độ.']),
    Q('Nốt đen chấm dôi có giá trị?', ['1.5 phách', '2 phách', '0.5 phách', '1 phách'], 0, 'Đen chấm dôi = 1 + 0.5 = 1.5 phách.', ['Đúng — đen chấm dôi = 1 + 0.5 = 1.5 phách.', 'Sai — 2 phách là nốt trắng.', 'Sai — 0.5 phách là nốt móc đơn.', 'Sai — 1 phách là nốt đen không chấm.']),
    Q('Khi đọc tiết tấu chấm dôi, cần?', ['Đọc tuỳ ý', 'Đọc nhanh', 'Giữ đúng độ dài', 'Bỏ qua'], 2, 'Giữ đúng độ dài chấm dôi.', ['Sai — không đọc tuỳ ý.', 'Sai — đọc nhanh làm sai trường độ.', 'Đúng — giữ đúng độ dài chấm dôi.', 'Sai — không được bỏ qua.']),
    Q('Khi hát có chấm dôi?', ['Bỏ qua', 'Ngắt ngay không ngân', 'Ngân đủ thời gian', 'Hát nhanh'], 2, 'Phải ngân đủ thời gian.', ['Sai — không được bỏ qua.', 'Sai — ngắt ngay làm thiếu trường độ.', 'Đúng — phải ngân đủ thời gian.', 'Sai — hát nhanh làm sai trường độ.']),
  ]),

  M(23, 'Học hát "Màu xanh quê hương"', [
    Q('"Màu xanh quê hương" là dân ca?', ['Trung Bộ', 'Tây Nguyên', 'Bắc Bộ', 'Khmer Nam Bộ'], 3, 'Dân ca Khmer Nam Bộ (lời Việt).', ['Sai — không phải dân ca Trung Bộ.', 'Sai — không phải dân ca Tây Nguyên.', 'Sai — không phải dân ca Bắc Bộ.', 'Đúng — dân ca Khmer Nam Bộ (lời Việt).']),
    Q('Bài hát ca ngợi?', ['Học tập', 'Chiến tranh', 'Lao động vất vả', 'Quê hương tươi đẹp'], 3, 'Quê hương tươi đẹp, màu xanh.', ['Sai — bài hát không nói học tập.', 'Sai — bài hát không nói chiến tranh.', 'Sai — bài hát không nói lao động vất vả.', 'Đúng — ca ngợi quê hương tươi đẹp, màu xanh.']),
    Q('Sắc thái?', ['Vui tươi, trong sáng', 'Dữ dội', 'Trầm lắng', 'Buồn bã'], 0, 'Vui tươi và trong sáng.', ['Đúng — vui tươi và trong sáng.', 'Sai — bài hát không dữ dội.', 'Sai — bài hát không trầm lắng.', 'Sai — bài hát không buồn bã.']),
    Q('Khi hát em nên?', ['Hát nhanh', 'Hát đúng giai điệu dân ca', 'Hát kiểu rock', 'Hát thật nhanh và to'], 1, 'Giữ chất dân ca khi hát.', ['Sai — hát nhanh làm mất chất dân ca.', 'Đúng — hát đúng giai điệu, giữ chất dân ca.', 'Sai — không hát kiểu rock.', 'Sai — hát nhanh và to làm hỏng bài.']),
  ]),

  M(24, 'Ôn "Màu xanh quê hương" + giới thiệu hợp xướng', [
    Q('Hợp xướng là?', ['Hát đơn', 'Hát đuổi nhau', 'Hát nhiều bè cùng lúc', 'Đọc thơ'], 2, 'Hợp xướng là hát nhiều bè cùng lúc.', ['Sai — hát đơn là một người hát.', 'Sai — hát đuổi là hình thức khác.', 'Đúng — hợp xướng là hát nhiều bè cùng lúc.', 'Sai — đọc thơ không phải hát.']),
    Q('Hợp xướng nhiều bè giúp?', ['Lệch nhịp', 'Tệ hơn', 'Khó nghe', 'Âm thanh phong phú, đẹp'], 3, 'Nhiều bè làm âm thanh phong phú.', ['Sai — hợp xướng đúng thì không lệch nhịp.', 'Sai — nhiều bè không làm tệ hơn.', 'Sai — hoà bè đúng thì dễ nghe.', 'Đúng — âm thanh phong phú, đẹp hơn.']),
    Q('Trong hợp xướng, em cần?', ['Hét to nhất', 'Hát lung tung', 'Át bè khác', 'Hát đúng bè của mình, nghe các bè khác'], 3, 'Đúng bè và biết nghe bè khác.', ['Sai — không nên hét to nhất.', 'Sai — không hát lung tung.', 'Sai — không át bè khác.', 'Đúng — hát đúng bè của mình và nghe các bè khác.']),
    Q('Các giọng cơ bản trong hợp xướng?', ['Đỏ, vàng, xanh', 'Trầm, cao, vang, ngân', 'Soprano, alto, tenor, bass', '1, 2, 3, 4'], 2, '4 giọng cơ bản của hợp xướng.', ['Sai — đó là màu sắc.', 'Sai — đó không phải tên giọng.', 'Đúng — soprano, alto, tenor, bass là 4 giọng cơ bản.', 'Sai — đó là chữ số.']),
  ]),

  M(25, 'Học hát "Em vẫn nhớ trường xưa"', [
    Q('"Em vẫn nhớ trường xưa" do ai sáng tác?', ['Phạm Tuyên', 'Trịnh Công Sơn', 'Văn Cao', 'Thanh Sơn'], 3, '"Em vẫn nhớ trường xưa" của Thanh Sơn.', ['Sai — Phạm Tuyên không viết bài này.', 'Sai — Trịnh Công Sơn không viết bài này.', 'Sai — Văn Cao không viết bài này.', 'Đúng — bài này của nhạc sĩ Thanh Sơn.']),
    Q('Nội dung bài hát?', ['Tình cảm với mái trường', 'Mùa xuân', 'Quê hương', 'Chiến tranh'], 0, 'Tình cảm sâu sắc với mái trường.', ['Đúng — tình cảm sâu sắc với mái trường.', 'Sai — bài hát không nói mùa xuân.', 'Sai — bài hát không nói quê hương.', 'Sai — bài hát không nói chiến tranh.']),
    Q('Sắc thái?', ['Tha thiết, sâu lắng', 'Dữ dội', 'Hài hước', 'Vui nhộn'], 0, 'Tha thiết, sâu lắng.', ['Đúng — tha thiết, sâu lắng.', 'Sai — bài hát không dữ dội.', 'Sai — bài hát không hài hước.', 'Sai — bài hát không vui nhộn.']),
    Q('Phù hợp dịp?', ['Lễ khai giảng đầu năm', 'Quốc khánh', '8/3', 'Lễ ra trường, kỉ niệm trường'], 3, 'Phù hợp lễ ra trường tiểu học.', ['Sai — không hợp lễ khai giảng.', 'Sai — không hợp Quốc khánh.', 'Sai — không hợp 8/3.', 'Đúng — phù hợp lễ ra trường, kỉ niệm trường.']),
  ]),

  M(26, 'Ôn "Em vẫn nhớ trường xưa" + recorder', [
    Q('Bấm nốt La trên recorder?', ['Bịt ngón cái và ngón trỏ', 'Bịt ngón cái, ngón trỏ, ngón giữa', 'Mở hết', 'Bịt hết'], 1, 'Nốt La bịt 3 ngón đầu.', ['Sai — bịt 2 ngón là nốt Si.', 'Đúng — nốt La bịt ngón cái, trỏ và giữa.', 'Sai — mở hết không ra nốt La.', 'Sai — bịt hết là nốt thấp khác.']),
    Q('Khi thổi recorder, lưỡi?', ['Đẩy ra', 'Cuộn lại', 'Để yên', 'Dùng để ngắt âm "tu-tu"'], 3, 'Lưỡi ngắt âm bằng "tu-tu".', ['Sai — không đẩy lưỡi ra.', 'Sai — không cuộn lưỡi lại.', 'Sai — lưỡi không để yên hoàn toàn.', 'Đúng — lưỡi ngắt âm bằng "tu-tu".']),
    Q('Recorder cần giữ?', ['Sạch sẽ, lau khô sau dùng', 'Để ướt', 'Vứt bừa', 'Bẩn cũng được'], 0, 'Giữ sạch và lau khô sau dùng.', ['Đúng — giữ sạch và lau khô sau khi dùng.', 'Sai — để ướt dễ hỏng và mất vệ sinh.', 'Sai — không vứt bừa nhạc cụ.', 'Sai — để bẩn không tốt cho sức khoẻ.']),
    Q('Thổi recorder nhịp 4/4 cần?', ['Thổi rất nhanh', 'Thổi rất chậm', 'Thổi tuỳ ý', 'Đúng phách, đều'], 3, 'Đúng phách và đều đặn.', ['Sai — thổi rất nhanh làm sai nhịp.', 'Sai — thổi rất chậm làm lệch nhịp.', 'Sai — thổi tuỳ ý sẽ sai.', 'Đúng — thổi đúng phách và đều đặn.']),
  ]),

  M(27, 'Học hát "Dàn đồng ca mùa hạ"', [
    Q('"Dàn đồng ca mùa hạ" do ai sáng tác?', ['Văn Cao', 'Lê Minh Châu', 'Phạm Tuyên', 'Phan Huỳnh Điểu'], 1, '"Dàn đồng ca mùa hạ" của Lê Minh Châu (phổ thơ).', ['Sai — Văn Cao không viết bài này.', 'Đúng — bài này của Lê Minh Châu (phổ thơ).', 'Sai — Phạm Tuyên không viết bài này.', 'Sai — Phan Huỳnh Điểu không viết bài này.']),
    Q('Nội dung bài hát?', ['Mùa đông', 'Âm thanh mùa hè qua tiếng ve', 'Mùa xuân và cây đào nở', 'Chiến tranh'], 1, 'Âm thanh ve sầu mùa hè.', ['Sai — bài hát nói về mùa hè, không phải mùa đông.', 'Đúng — âm thanh mùa hè qua tiếng ve.', 'Sai — bài hát không nói về mùa xuân.', 'Sai — bài hát không nói về chiến tranh.']),
    Q('Sắc thái?', ['Trầm tư', 'Bi tráng', 'Vui tươi, sôi nổi', 'Tha thiết, trầm lắng'], 2, 'Vui tươi, sôi nổi.', ['Sai — bài hát không trầm tư.', 'Sai — bài hát không bi tráng.', 'Đúng — vui tươi, sôi nổi.', 'Sai — bài hát không trầm lắng.']),
    Q('Phù hợp dịp?', ['Khai giảng đầu năm học', 'Trung thu', '20/11', 'Cuối năm học, hè về'], 3, 'Phù hợp dịp hè về.', ['Sai — không hợp khai giảng.', 'Sai — không hợp Trung thu.', 'Sai — không hợp 20/11.', 'Đúng — phù hợp dịp cuối năm học, hè về.']),
  ]),

  M(28, 'Ôn "Dàn đồng ca mùa hạ" + TĐN số 7', [
    Q('Nhịp 3/4 nghĩa là?', ['2 phách', '4 phách', '6 phách', '3 phách/ô, đơn vị là nốt đen'], 3, '3/4: 3 phách/ô.', ['Sai — 2 phách là nhịp 2/4.', 'Sai — 4 phách là nhịp 4/4.', 'Sai — 6 phách là nhịp khác.', 'Đúng — 3 phách/ô, đơn vị là nốt đen.']),
    Q('Trong 3/4, phách mạnh ở?', ['Phách 1', 'Phách 2', 'Không có', 'Phách 3'], 0, 'Phách 1 mạnh, 2 và 3 nhẹ.', ['Đúng — phách 1 mạnh, phách 2 và 3 nhẹ.', 'Sai — phách 2 nhẹ.', 'Sai — nhịp luôn có phách mạnh.', 'Sai — phách 3 nhẹ.']),
    Q('Nhịp 3/4 hay dùng cho?', ['Hành khúc duyệt binh', 'Điệu valse', 'Vọng cổ', 'Hành khúc'], 1, 'Valse là điệu nhảy 3/4.', ['Sai — hành khúc thường nhịp 2/4.', 'Đúng — valse là điệu nhảy nhịp 3/4.', 'Sai — vọng cổ có cấu trúc riêng.', 'Sai — hành khúc thường không phải 3/4.']),
    Q('Đọc TĐN nhịp 3/4 cần?', ['Nhấn phách 4', 'Đọc lung tung', 'Nhấn phách 1', 'Không nhấn'], 2, 'Nhấn vào phách 1.', ['Sai — nhịp 3/4 không có phách 4.', 'Sai — đọc lung tung sẽ sai.', 'Đúng — nhấn vào phách 1.', 'Sai — cần nhấn phách mạnh.']),
  ]),

  M(29, 'Nghe nhạc — tác phẩm hoà tấu dân tộc', [
    Q('Hoà tấu dân tộc là?', ['Hát một mình', 'Nhiều nhạc cụ dân tộc cùng chơi', 'Đọc thơ', 'Một nhạc cụ'], 1, 'Nhiều nhạc cụ dân tộc cùng chơi tác phẩm.', ['Sai — hoà tấu không phải hát một mình.', 'Đúng — nhiều nhạc cụ dân tộc cùng chơi.', 'Sai — đọc thơ không phải hoà tấu.', 'Sai — một nhạc cụ là độc tấu.']),
    Q('Khi nghe hoà tấu, em nên?', ['Vừa nghe vừa hát theo to', 'Nói chuyện', 'Lắng nghe yên lặng và cảm nhận', 'Bỏ ra ngoài'], 2, 'Lắng nghe và cảm nhận.', ['Sai — hát theo to làm ồn.', 'Sai — nói chuyện là thiếu tôn trọng.', 'Đúng — lắng nghe yên lặng và cảm nhận.', 'Sai — bỏ ra ngoài là không lịch sự.']),
    Q('Tác phẩm nổi tiếng cho đàn tranh?', ['"Lý ngựa ô"', '"Như có Bác"', '"Trống cơm"', '"Tiến quân ca"'], 0, 'Đàn tranh hay chơi các điệu dân ca như Lý ngựa ô.', ['Đúng — đàn tranh hay chơi điệu dân ca như "Lý ngựa ô".', 'Sai — "Như có Bác" là ca khúc, không tiêu biểu cho đàn tranh.', 'Sai — "Trống cơm" gắn với trống hơn.', 'Sai — "Tiến quân ca" là Quốc ca.']),
    Q('Lợi ích nghe nhạc dân tộc?', ['Mệt mỏi', 'Không gì', 'Mất thời gian', 'Hiểu và yêu văn hoá dân tộc'], 3, 'Hiểu và yêu văn hoá dân tộc.', ['Sai — nghe nhạc dân tộc không gây mệt mỏi.', 'Sai — có nhiều lợi ích.', 'Sai — không phải mất thời gian.', 'Đúng — giúp hiểu và yêu văn hoá dân tộc.']),
  ]),

  M(30, 'Hợp xướng 2 bè đơn giản', [
    Q('Hợp xướng 2 bè là?', ['Một bài đọc', 'Hai nhóm hát giống nhau', 'Hai nhóm hát 2 giai điệu khác nhau cùng lúc', 'Một nhóm hát'], 2, '2 bè hát 2 giai điệu khác nhau cùng lúc.', ['Sai — đó không phải bài đọc.', 'Sai — hát giống nhau là hát 1 bè.', 'Đúng — hai nhóm hát 2 giai điệu khác nhau cùng lúc.', 'Sai — một nhóm hát là 1 bè.']),
    Q('Trong 2 bè, bè cao gọi?', ['Bè trầm (giọng thấp)', 'Bè 1 (giọng cao)', 'Bè trầm', 'Bè giữa'], 1, 'Bè 1 thường là giọng cao.', ['Sai — bè trầm là giọng thấp.', 'Đúng — bè 1 thường là giọng cao.', 'Sai — bè trầm không phải bè cao.', 'Sai — 2 bè không có bè giữa.']),
    Q('Khi hát 2 bè, em cần?', ['Hét to', 'Hát theo bè khác', 'Giữ đúng bè, không bị bè kia lôi', 'Hát lung tung'], 2, 'Giữ đúng bè của mình.', ['Sai — không nên hét to.', 'Sai — hát theo bè khác là lạc bè.', 'Đúng — giữ đúng bè, không bị bè kia lôi.', 'Sai — hát lung tung làm hỏng bài.']),
    Q('Hợp xướng 2 bè tạo cảm giác?', ['Nghèo nàn', 'Phong phú, đầy đặn', 'Khó nghe', 'Đơn điệu, lặp lại'], 1, 'Tạo cảm giác phong phú.', ['Sai — 2 bè không nghèo nàn.', 'Đúng — tạo cảm giác phong phú, đầy đặn.', 'Sai — hoà bè đúng thì dễ nghe.', 'Sai — 2 bè không đơn điệu.']),
  ]),

  M(31, 'Ôn tập 4 bài hát HK2', [
    Q('Bài "Hát mừng" là?', ['Sáng tác mới', 'Dân ca Bắc Bộ', 'Dân ca Hrê', 'Nhạc Tây'], 2, 'Dân ca Hrê (Tây Nguyên).', ['Sai — đây là dân ca, không phải sáng tác mới.', 'Sai — không phải dân ca Bắc Bộ.', 'Đúng — dân ca Hrê (Tây Nguyên).', 'Sai — không phải nhạc Tây.']),
    Q('"Tre ngà bên Lăng Bác" ca ngợi?', ['Người mẹ Việt Nam', 'Mùa xuân', 'Bác Hồ', 'Quê hương'], 2, 'Ca ngợi Bác Hồ.', ['Sai — bài hát không ca ngợi người mẹ.', 'Sai — bài hát không nói mùa xuân.', 'Đúng — ca ngợi Bác Hồ.', 'Sai — bài hát tập trung vào Bác Hồ.']),
    Q('"Màu xanh quê hương" là dân ca?', ['Tây Nguyên', 'Bắc Bộ', 'Khmer Nam Bộ', 'Trung Bộ'], 2, 'Dân ca Khmer Nam Bộ.', ['Sai — không phải dân ca Tây Nguyên.', 'Sai — không phải dân ca Bắc Bộ.', 'Đúng — dân ca Khmer Nam Bộ.', 'Sai — không phải dân ca Trung Bộ.']),
    Q('"Em vẫn nhớ trường xưa" sắc thái?', ['Tha thiết, sâu lắng', 'Vui nhộn', 'Bi tráng', 'Hài hước'], 0, 'Tha thiết, sâu lắng.', ['Đúng — tha thiết, sâu lắng.', 'Sai — bài hát không vui nhộn.', 'Sai — bài hát không bi tráng.', 'Sai — bài hát không hài hước.']),
  ]),

  M(32, 'Ôn tập TĐN', [
    Q('Để đọc TĐN tốt em cần?', ['Nắm tên nốt, trường độ và đọc đúng', 'Đọc to', 'Đọc nhanh', 'Đọc lướt qua thật nhanh'], 0, 'Nắm tên nốt và trường độ.', ['Đúng — nắm tên nốt, trường độ và đọc đúng.', 'Sai — đọc to không phải tiêu chí.', 'Sai — đọc nhanh dễ sai.', 'Sai — đọc lướt qua sẽ không chính xác.']),
    Q('Vị trí nốt Đô (giữa)?', ['Dòng 5', 'Trên dòng 5', 'Khe 3 từ dưới lên', 'Dưới dòng 1 (trên dòng kẻ phụ)'], 3, 'Đô giữa nằm ngay dưới dòng 1.', ['Sai — dòng 5 là nốt cao.', 'Sai — trên dòng 5 là nốt rất cao.', 'Sai — khe 3 không phải Đô giữa.', 'Đúng — Đô giữa nằm ngay dưới dòng 1 (dòng kẻ phụ).']),
    Q('Vị trí nốt Son?', ['Trên dòng 5', 'Dòng 2', 'Dòng 5', 'Khe 2 từ dưới lên'], 1, 'Nốt Son ở dòng 2.', ['Sai — trên dòng 5 là nốt rất cao.', 'Đúng — nốt Son ở dòng 2.', 'Sai — dòng 5 là nốt khác.', 'Sai — Son ở dòng 2 chứ không phải khe 2.']),
    Q('Đọc gam Đô trưởng đi lên?', ['Si Đô Rê', 'Pha Son', 'Đô La Si', 'Đô Rê Mi Pha Son La Si Đô'], 3, 'Gam Đô trưởng từ Đô đi lên 1 quãng 8.', ['Sai — đó không phải gam đầy đủ.', 'Sai — đó chỉ là 2 nốt.', 'Sai — thiếu nhiều nốt và sai thứ tự.', 'Đúng — Đô Rê Mi Pha Son La Si Đô.']),
  ]),

  M(33, 'Biểu diễn — tiết mục tự chọn', [
    Q('Khi biểu diễn em nên?', ['Tự tin, đúng giai điệu, sắc thái phù hợp', 'Hát to át nhạc đệm', 'Bỏ chạy', 'Run, quên lời'], 0, 'Tự tin và đúng sắc thái.', ['Đúng — tự tin, đúng giai điệu và sắc thái phù hợp.', 'Sai — không nên hát át nhạc đệm.', 'Sai — bỏ chạy là sai.', 'Sai — run, quên lời là chưa chuẩn bị tốt.']),
    Q('Trang phục biểu diễn?', ['Áo bẩn', 'Quần ngắn lệch', 'Đồng phục thể dục thường ngày', 'Gọn gàng, phù hợp bài'], 3, 'Gọn gàng và phù hợp.', ['Sai — không mặc áo bẩn.', 'Sai — quần lệch không phù hợp.', 'Sai — đồ thể dục không hợp sân khấu.', 'Đúng — gọn gàng và phù hợp với bài.']),
    Q('Khi lên sân khấu em nên?', ['Cúi gằm', 'Vẫy tay cho bạn bè trước', 'Chào khán giả', 'Không chào'], 2, 'Chào khán giả là phép lịch sự.', ['Sai — không nên cúi gằm.', 'Sai — không vẫy riêng cho bạn bè.', 'Đúng — chào khán giả là phép lịch sự.', 'Sai — không chào là thiếu lịch sự.']),
    Q('Khi nghe bạn biểu diễn em nên?', ['Cười nhạo', 'Bỏ ra ngoài', 'Nói chuyện', 'Lắng nghe, vỗ tay khích lệ'], 3, 'Lắng nghe và vỗ tay động viên.', ['Sai — không cười nhạo bạn.', 'Sai — bỏ ra ngoài là không lịch sự.', 'Sai — nói chuyện làm ồn.', 'Đúng — lắng nghe và vỗ tay khích lệ.']),
  ]),

  M(34, 'Ôn tập cuối năm', [
    Q('Cả năm em đã học mấy bài hát chính?', ['Khoảng 8 bài', '30 bài', 'Không bài nào', '1 bài'], 0, 'Khoảng 8 bài chính cả năm.', ['Đúng — khoảng 8 bài chính cả năm.', 'Sai — không nhiều tới 30 bài.', 'Sai — em đã học nhiều bài.', 'Sai — không phải chỉ 1 bài.']),
    Q('Nhạc cụ dân tộc đã học?', ['Guitar điện', 'Đàn organ điện tử', 'Trống jazz', 'Đàn tranh, đàn nhị, sáo trúc, cồng chiêng'], 3, '4 nhạc cụ dân tộc.', ['Sai — guitar điện không phải nhạc cụ dân tộc.', 'Sai — đàn organ điện tử không phải nhạc cụ dân tộc.', 'Sai — trống jazz là nhạc cụ phương Tây.', 'Đúng — đàn tranh, đàn nhị, sáo trúc, cồng chiêng.']),
    Q('Lý thuyết nhịp đã học?', ['2/4, 3/4, 4/4', 'Chỉ 4/4', 'Chỉ 2/4', 'Chỉ 3/4 và 6/8'], 0, 'Đã học 2/4, 3/4, 4/4.', ['Đúng — đã học nhịp 2/4, 3/4, 4/4.', 'Sai — không chỉ học 4/4.', 'Sai — không chỉ học 2/4.', 'Sai — chưa học 6/8.']),
    Q('Khi rời cấp 1, em vẫn nên?', ['Tiếp tục yêu âm nhạc', 'Bỏ học', 'Chỉ nghe pop', 'Quên hết'], 0, 'Tiếp tục yêu âm nhạc.', ['Đúng — tiếp tục yêu âm nhạc.', 'Sai — không nên bỏ học.', 'Sai — nên nghe đa dạng, không chỉ pop.', 'Sai — không nên quên hết.']),
  ]),

  M(35, 'Kiểm tra cuối năm — biểu diễn', [
    Q('Kiểm tra cuối năm gồm?', ['Hát, đọc nhạc, nhận biết nhạc cụ', 'Chỉ đọc', 'Chỉ hát', 'Chỉ nghe'], 0, 'Tổng hợp các nội dung đã học.', ['Đúng — gồm hát, đọc nhạc và nhận biết nhạc cụ.', 'Sai — không chỉ có đọc.', 'Sai — không chỉ có hát.', 'Sai — không chỉ có nghe.']),
    Q('Tự đánh giá em đã tiến bộ ở?', ['Lười hơn', 'Hát đúng hơn, hiểu nhạc dân tộc', 'Tệ hơn', 'Không có gì'], 1, 'Tự nhìn lại sự tiến bộ của mình.', ['Sai — tiến bộ không phải lười hơn.', 'Đúng — hát đúng hơn và hiểu nhạc dân tộc.', 'Sai — tiến bộ không phải tệ hơn.', 'Sai — em đã học được nhiều điều.']),
    Q('Sau cấp 1 em sẽ?', ['Học tiếp âm nhạc ở cấp 2', 'Quên hết', 'Không quan tâm', 'Bỏ học'], 0, 'Tiếp tục học âm nhạc ở cấp 2.', ['Đúng — tiếp tục học âm nhạc ở cấp 2.', 'Sai — không nên quên hết.', 'Sai — nên giữ niềm yêu âm nhạc.', 'Sai — không nên bỏ học.']),
    Q('Lời tạm biệt thầy cô môn nhạc?', ['Trêu chọc', 'Vẫy tay rồi chạy ra cửa', 'Cảm ơn và hứa giữ tình yêu âm nhạc', 'Im lặng'], 2, 'Lời cảm ơn chân thành.', ['Sai — không nên trêu chọc thầy cô.', 'Sai — chạy ra cửa là thiếu lễ phép.', 'Đúng — cảm ơn và hứa giữ tình yêu âm nhạc.', 'Sai — im lặng là thiếu lời cảm ơn.']),
  ]),

  M(36, 'Kết thúc Tiểu học — Âm nhạc đồng hành cả đời', [
    Q('Ký hiệu sắc thái "forte" (f) trong bản nhạc nghĩa là gì?', ['Hát to, mạnh', 'Hát nhỏ, nhẹ', 'Hát nhanh', 'Hát chậm'], 0, 'forte = to, mạnh.', ['Đúng — forte (f) là hát/đàn to, mạnh.', 'Sai — nhỏ, nhẹ là piano (p).', 'Sai — nhanh – chậm là tốc độ, ghi bằng ký hiệu khác.', 'Sai — nhanh – chậm là tốc độ, ghi bằng ký hiệu khác.']),
    Q('Ký hiệu sắc thái "piano" (p) trong bản nhạc nghĩa là gì?', ['Hát to, mạnh', 'Hát nhỏ, nhẹ', 'Đàn piano', 'Hát nhanh'], 1, 'piano = nhỏ, nhẹ (không phải tên cây đàn).', ['Sai — to, mạnh là forte (f).', 'Đúng — piano (p) là hát/đàn nhỏ, nhẹ.', 'Sai — ở đây "piano" là ký hiệu sắc thái, không phải tên nhạc cụ.', 'Sai — đó là ký hiệu về tốc độ, không phải sắc thái.']),
    Q('Recorder (sáo dọc) là loại nhạc cụ gì?', ['Nhạc cụ gõ', 'Nhạc cụ dây', 'Nhạc cụ hơi', 'Nhạc cụ phím'], 2, 'Recorder phát ra âm thanh nhờ luồng hơi thổi vào.', ['Sai — nhạc cụ gõ là trống, phách, song loan.', 'Sai — nhạc cụ dây là đàn guitar, violin, đàn tranh.', 'Đúng — recorder là nhạc cụ hơi, thổi bằng luồng hơi.', 'Sai — nhạc cụ phím là piano, organ.']),
    Q('Nhạc cụ tự nhiên mà ai cũng luôn mang theo bên mình là gì?', ['Trống', 'Đàn', 'Sáo', 'Giọng hát'], 3, 'Giọng hát là nhạc cụ tự nhiên, luôn sẵn có.', ['Sai — trống là nhạc cụ phải mang theo.', 'Sai — đàn là nhạc cụ phải mang theo.', 'Sai — sáo là nhạc cụ phải mang theo.', 'Đúng — giọng hát là nhạc cụ tự nhiên luôn sẵn có của mỗi người.']),
    Q('Nhịp 2/4 có mấy phách trong một ô nhịp?', ['2 phách', '3 phách', '4 phách', '8 phách'], 0, 'Số trên của nhịp cho biết số phách trong ô nhịp.', ['Đúng — nhịp 2/4 có 2 phách mỗi ô nhịp.', 'Sai — 3 phách là nhịp 3/4.', 'Sai — 4 phách là nhịp 4/4.', 'Sai — không có nhịp 8 phách trong các nhịp đã học ở tiểu học.']),
    Q('Âm nhạc giúp ích gì cho việc học các môn khác?', ['Không giúp gì cả', 'Giúp thư giãn, tăng trí nhớ và rèn sự tập trung', 'Chỉ làm mất thời gian', 'Chỉ dành cho người có năng khiếu'], 1, 'Âm nhạc giúp não thư giãn, tăng trí nhớ, rèn tập trung và kiên nhẫn.', ['Sai — âm nhạc hỗ trợ rất nhiều cho việc học.', 'Đúng — âm nhạc giúp thư giãn, tăng trí nhớ và rèn sự tập trung.', 'Sai — nghe và hát đúng cách còn giúp em học hiệu quả hơn.', 'Sai — ai cũng có thể hát và cảm thụ âm nhạc.']),
  ]),
];

export const P5AN_SCENARIOS = indexBy(P5AN_WEEKS);
