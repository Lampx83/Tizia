// ============================================================
// Lớp 1 · HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN) — 35 tuần
// Bám CT GDPT 2018 · HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết.
// Mạch: Bản thân → Gia đình → Nhà trường → Cộng đồng → Tự nhiên.
// ID prefix: "P1HDTN-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1HDTN', 'htn', n, title, qs, opts);

export const P1HDTN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Chào năm học mới', [
    Q('Ngày khai giảng em đến trường với tâm trạng?', ['Háo hức, vui vẻ', 'Sợ hãi', 'Buồn ngủ', 'Cáu giận'], 0, 'Ngày khai giảng là ngày vui đầu năm học.', ['Đúng — khai giảng là ngày vui nên em háo hức.', 'Sai — không có gì phải sợ, đến trường rất vui.', 'Sai — ngày vui thì phải tỉnh táo, háo hức.', 'Sai — không nên cáu giận trong ngày vui.']),
    Q('Đến trường ngày khai giảng em mặc?', ['Đồng phục sạch sẽ, gọn gàng', 'Đồ ngủ', 'Đồ chơi ở nhà', 'Đồ thể thao bẩn'], 0, 'Mặc đồng phục sạch, gọn gàng.', ['Đúng — đến trường mặc đồng phục sạch, gọn gàng.', 'Sai — đồ ngủ chỉ mặc ở nhà thôi.', 'Sai — đồ chơi không hợp khi đi học.', 'Sai — đồ bẩn không nên mặc đến trường.']),
    Q('Khi cô giáo đọc tên, em?', ['Cười to', 'Đứng dậy “Có ạ!” rõ ràng', 'Bỏ ra ngoài', 'Im lặng'], 1, 'Đứng dậy thưa “Có ạ!” lễ phép.', ['Sai — cười to là không lễ phép.', 'Đúng — đứng dậy thưa “Có ạ!” rõ ràng, lễ phép.', 'Sai — không được tự ý bỏ ra ngoài.', 'Sai — phải thưa để cô biết em có mặt.']),
    Q('Khai giảng giúp em cảm thấy?', ['Mình vẫn là em bé', 'Buồn vì xa nhà', 'Mình đã là học sinh, có trách nhiệm', 'Không có gì khác'], 2, 'Em đã là học sinh, cần có trách nhiệm.', ['Sai — em đã lớn, là học sinh rồi.', 'Sai — đến trường vui chứ không buồn.', 'Đúng — em đã là học sinh, cần có trách nhiệm.', 'Sai — khai giảng đánh dấu em đã lớn hơn.']),
  ]),

  M(2, 'Giới thiệu bản thân', [
    Q('Câu giới thiệu lễ phép là?', ['Hỏi gì hỏi nhiều', 'Tao tên là…', 'Em chào cô và các bạn, em tên là…', 'Ờ thì…'], 2, 'Có lời chào, rồi nói tên.', ['Sai — đây không phải lời giới thiệu.', 'Sai — xưng “tao” là không lễ phép.', 'Đúng — có lời chào rồi nói tên là lễ phép.', 'Sai — nói ấp úng thì người nghe khó hiểu.']),
    Q('Giọng nói khi giới thiệu nên?', ['Cười nhăn nhở', 'Rõ ràng, đủ nghe', 'Lí nhí', 'Quát to'], 1, 'Giọng rõ ràng, đủ nghe.', ['Sai — cười nhăn nhở khiến lời nói khó nghe.', 'Đúng — giọng rõ ràng, đủ nghe là tốt nhất.', 'Sai — nói lí nhí thì bạn không nghe được.', 'Sai — quát to làm mọi người khó chịu.']),
    Q('Thông tin KHÔNG nên kể trước lớp?', ['Mật khẩu điện thoại bố mẹ', 'Tên lớp', 'Sở thích', 'Tên em'], 0, 'Thông tin riêng tư không kể cho ai.', ['Đúng — mật khẩu là bí mật, không kể cho ai.', 'Sai — tên lớp kể được bình thường.', 'Sai — sở thích kể được để làm quen.', 'Sai — tên em kể được khi giới thiệu.']),
    Q('Khi bạn giới thiệu, em nên?', ['Nói chuyện riêng', 'Lắng nghe, vỗ tay khi bạn xong', 'Trêu bạn', 'Quay lưng'], 1, 'Lắng nghe để tôn trọng bạn.', ['Sai — nói chuyện riêng là không tôn trọng bạn.', 'Đúng — lắng nghe và vỗ tay để tôn trọng bạn.', 'Sai — trêu bạn là không lịch sự.', 'Sai — quay lưng là thiếu tôn trọng bạn.']),
  ]),

  M(3, 'Làm quen bạn mới', [
    Q('Để làm quen bạn, em?', ['Chạy đi chỗ khác', 'Đứng im đợi', 'Chủ động chào, hỏi tên bạn', 'Lè lưỡi với bạn'], 2, 'Chủ động chào và hỏi tên bạn.', ['Sai — chạy đi thì khó làm quen bạn.', 'Sai — đứng im đợi thì lâu mới quen.', 'Đúng — chủ động chào, hỏi tên để làm quen.', 'Sai — lè lưỡi là trêu, không phải làm quen.']),
    Q('Khi bạn buồn, em nên?', ['Cười nhạo', 'Hỏi han, an ủi bạn', 'Trêu chọc', 'Quay đi'], 1, 'Hỏi han và an ủi bạn.', ['Sai — cười nhạo làm bạn buồn hơn.', 'Đúng — hỏi han, an ủi để bạn vui hơn.', 'Sai — trêu chọc khi bạn buồn là không tốt.', 'Sai — quay đi là bỏ mặc bạn.']),
    Q('Khi giận bạn, em nên?', ['Đánh bạn', 'Mách cô vô cớ', 'Nói rõ điều em không thích', 'Bỏ chơi mãi'], 2, 'Nói rõ điều em không hài lòng.', ['Sai — đánh bạn là sai, làm bạn đau.', 'Sai — mách cô vô cớ là không đúng.', 'Đúng — nói rõ điều em không thích để bạn hiểu.', 'Sai — bỏ chơi mãi thì mất bạn.']),
    Q('Một người bạn tốt là?', ['Hay nói xấu mình', 'Hay đòi đồ của mình', 'Hay đánh mình', 'Biết chia sẻ và lắng nghe'], 3, 'Bạn tốt biết chia sẻ và lắng nghe.', ['Sai — bạn tốt không nói xấu mình.', 'Sai — bạn tốt không đòi đồ của mình.', 'Sai — bạn tốt không đánh mình.', 'Đúng — bạn tốt biết chia sẻ và lắng nghe.']),
  ]),

  M(4, 'Em là học sinh lớp 1', [
    Q('Hằng ngày, học sinh lớp 1 cần?', ['Đi học khi nào thích', 'Mặc đồ ngủ', 'Đi học đúng giờ, mặc đồng phục', 'Mang đồ chơi đi học'], 2, 'Đi học đúng giờ, mặc đồng phục.', ['Sai — phải đi học đúng giờ mỗi ngày.', 'Sai — đồ ngủ chỉ mặc ở nhà.', 'Đúng — đi học đúng giờ và mặc đồng phục.', 'Sai — đồ chơi để ở nhà, không mang đi học.']),
    Q('Trong lớp, em phải?', ['Vẽ bậy ra vở bạn bên cạnh', 'Nói chen ngang', 'Đi lại tự do', 'Lắng nghe, giơ tay khi muốn nói'], 3, 'Lắng nghe và giơ tay xin phát biểu.', ['Sai — không vẽ bậy ra vở của bạn.', 'Sai — không nói chen ngang khi cô giảng.', 'Sai — không tự ý đi lại trong lớp.', 'Đúng — lắng nghe và giơ tay khi muốn nói.']),
    Q('Khi muốn ra ngoài, em?', ['Đi ra luôn', 'Giơ tay xin phép cô', 'Trốn ra', 'Khóc bỏ ra'], 1, 'Phải giơ tay xin phép cô giáo.', ['Sai — không tự ý đi ra ngoài.', 'Đúng — giơ tay xin phép cô trước khi ra.', 'Sai — trốn ra là sai quy định.', 'Sai — không khóc, chỉ cần xin phép cô.']),
    Q('Vào lớp, em đi giày?', ['Để gọn ở giá, đi dép trong lớp (nếu có quy định)', 'Đi giày bẩn lên ghế', 'Cởi vứt giữa lối', 'Mang giày vào tủ bạn'], 0, 'Cất giày gọn theo quy định.', ['Đúng — để giày gọn ở giá theo quy định.', 'Sai — không đặt giày bẩn lên ghế.', 'Sai — vứt giày giữa lối làm bạn vấp.', 'Sai — không để giày vào tủ của bạn.']),
  ]),

  M(5, 'Em đeo cặp đúng cách', [
    Q('Cặp sách em đeo?', ['Một quai', 'Đội lên đầu', 'Cầm ngược', 'Hai quai vai cho cân'], 3, 'Đeo hai quai để lưng không lệch.', ['Sai — đeo một quai làm lưng lệch.', 'Sai — cặp không phải để đội lên đầu.', 'Sai — cầm ngược thì đồ rơi hết.', 'Đúng — đeo hai quai để lưng cân, không lệch.']),
    Q('Cặp KHÔNG nên?', ['Buộc dây gọn', 'Nhồi quá nặng, lệch một bên', 'Có đủ sách hôm nay', 'Sắp gọn vở'], 1, 'Không nhồi nhét quá nặng.', ['Sai — buộc dây gọn là việc nên làm.', 'Đúng — không nên nhồi quá nặng, lệch một bên.', 'Sai — có đủ sách hôm nay là tốt.', 'Sai — sắp gọn vở là việc nên làm.']),
    Q('Đầu giờ em sắp sách vở?', ['Theo ý thích', 'Toàn đồ chơi', 'Theo thời khoá biểu', 'Toàn truyện tranh'], 2, 'Sắp theo thời khoá biểu để khỏi quên.', ['Sai — sắp theo ý thích dễ quên sách.', 'Sai — đồ chơi không cần mang đi học.', 'Đúng — sắp theo thời khoá biểu để khỏi quên.', 'Sai — truyện tranh không phải sách học.']),
    Q('Khi cặp hỏng quai, em?', ['Đổ lỗi cho cô', 'Vẫn đeo lệch', 'Vứt cặp đi', 'Nhờ bố mẹ sửa hoặc đổi'], 3, 'Nhờ bố mẹ sửa hoặc đổi để đeo đúng.', ['Sai — không đổ lỗi cho cô.', 'Sai — đeo lệch sẽ đau lưng.', 'Sai — vứt cặp đi rất lãng phí.', 'Đúng — nhờ bố mẹ sửa hoặc đổi để đeo đúng.']),
  ]),

  M(6, 'Tự phục vụ – đánh răng, rửa mặt', [
    Q('Một ngày em đánh răng?', ['Ít nhất 2 lần (sáng và tối)', '1 lần/tuần', 'Khi đau răng mới đánh', 'Không cần'], 0, 'Sáng – tối, ít nhất 2 lần/ngày.', ['Đúng — đánh răng ít nhất 2 lần, sáng và tối.', 'Sai — 1 lần/tuần thì răng rất bẩn.', 'Sai — phải đánh hằng ngày, không đợi đau.', 'Sai — không đánh răng thì sâu răng.']),
    Q('Khi đánh răng, em chải?', ['Cả mặt ngoài, trong và mặt nhai', 'Lợi đến chảy máu', 'Chỉ mặt ngoài', 'Đầu lưỡi'], 0, 'Chải đủ ba mặt: ngoài, trong, mặt nhai.', ['Đúng — chải đủ ba mặt: ngoài, trong, mặt nhai.', 'Sai — chải mạnh đến chảy máu là sai.', 'Sai — chỉ mặt ngoài thì chưa sạch.', 'Sai — bàn chải là để chải răng, không phải lưỡi.']),
    Q('Sau khi đánh răng em?', ['Để bọt trên răng', 'Uống kem đánh răng', 'Đi ngủ luôn', 'Súc miệng nhiều lần với nước sạch'], 3, 'Súc miệng nhiều lần với nước sạch.', ['Sai — phải súc cho hết bọt kem.', 'Sai — kem đánh răng không được uống.', 'Sai — cần súc miệng sạch trước đã.', 'Đúng — súc miệng nhiều lần với nước sạch.']),
    Q('Rửa mặt em dùng?', ['Nước bẩn', 'Áo của mình', 'Khăn riêng, nước sạch', 'Khăn của người khác'], 2, 'Dùng khăn riêng và nước sạch.', ['Sai — nước bẩn làm mặt dễ bị bệnh.', 'Sai — áo không phải để lau mặt.', 'Đúng — dùng khăn riêng và nước sạch.', 'Sai — dùng chung khăn dễ lây bệnh.']),
  ]),

  M(7, 'Tự phục vụ – mặc quần áo, gấp đồ', [
    Q('Gấp áo em làm?', ['Vò áo lại', 'Vứt xuống sàn', 'Vắt lên ghế', 'Gấp tay áo vào, rồi gấp đôi thân'], 3, 'Gấp tay áo trước, rồi gấp đôi thân.', ['Sai — vò áo làm áo nhăn nhúm.', 'Sai — vứt xuống sàn làm áo bẩn.', 'Sai — vắt lên ghế không phải gấp gọn.', 'Đúng — gấp tay áo vào rồi gấp đôi thân.']),
    Q('Quần áo bẩn em?', ['Vứt sàn', 'Bỏ vào giỏ đồ bẩn', 'Đem ra cửa sổ', 'Cất chung đồ sạch'], 1, 'Bỏ giỏ đồ bẩn để giặt.', ['Sai — vứt sàn làm nhà bừa bộn.', 'Đúng — bỏ vào giỏ đồ bẩn để giặt.', 'Sai — đem ra cửa sổ là không đúng.', 'Sai — không cất đồ bẩn chung đồ sạch.']),
    Q('Khi áo bị tuột cúc, em?', ['Bỏ áo đi', 'Nhờ người lớn khâu lại', 'Cứ mặc vậy mãi', 'Cắt áo'], 1, 'Nhờ người lớn khâu lại.', ['Sai — bỏ áo đi rất lãng phí.', 'Đúng — nhờ người lớn khâu lại cúc áo.', 'Sai — mặc áo tuột cúc trông không gọn.', 'Sai — cắt áo làm hỏng áo.']),
    Q('Tự mặc đồ giúp em?', ['Tự lập, không phiền mẹ', 'Phụ thuộc mẹ', 'Mất thời gian vô ích', 'Ốm nhanh'], 0, 'Tự mặc đồ giúp em tự lập.', ['Đúng — tự mặc đồ giúp em tự lập, không phiền mẹ.', 'Sai — tự mặc là bớt phụ thuộc mẹ.', 'Sai — đây là việc có ích, không vô ích.', 'Sai — tự mặc đồ không làm em ốm.']),
  ]),

  M(8, 'Giữ gìn lớp học sạch đẹp', [
    Q('Khi ăn xong em vứt rác?', ['Sau lưng', 'Ngoài cửa sổ', 'Dưới bàn', 'Vào thùng rác'], 3, 'Vứt vào thùng rác.', ['Sai — vứt sau lưng làm lớp bẩn.', 'Sai — vứt ra cửa sổ làm bẩn ngoài sân.', 'Sai — vứt dưới bàn là không sạch.', 'Đúng — vứt rác vào thùng rác.']),
    Q('Khi thấy giấy rơi ở lớp em?', ['Nhặt bỏ vào thùng rác', 'Bảo bạn nhặt', 'Đá đi chỗ khác', 'Bước qua'], 0, 'Tự giác nhặt cho lớp sạch.', ['Đúng — tự giác nhặt bỏ vào thùng rác.', 'Sai — nên tự nhặt thay vì sai bạn.', 'Sai — đá đi làm lớp bẩn thêm.', 'Sai — bước qua là không quan tâm lớp.']),
    Q('Bàn ghế trong lớp em nên?', ['Bóc keo', 'Ngồi ngay ngắn, không khắc vẽ', 'Vẽ bậy', 'Khắc tên'], 1, 'Không khắc, không vẽ bậy.', ['Sai — bóc keo làm hỏng bàn ghế.', 'Đúng — ngồi ngay ngắn, không khắc vẽ.', 'Sai — vẽ bậy làm bẩn bàn ghế.', 'Sai — khắc tên làm hỏng bàn.']),
    Q('Sau giờ học em?', ['Bỏ rác trong ngăn bàn', 'Vứt sách trên bàn', 'Sắp ghế gọn, lau bảng nếu được phân công', 'Chạy ra cổng luôn'], 2, 'Sắp ghế gọn, hoàn thành phần việc.', ['Sai — không để rác trong ngăn bàn.', 'Sai — cần cất sách gọn, không vứt bừa.', 'Đúng — sắp ghế gọn, lau bảng nếu được phân công.', 'Sai — nên dọn gọn rồi mới ra về.']),
  ]),

  M(9, 'Em làm việc nhà', [
    Q('Việc nhà phù hợp lớp 1?', ['Đun bếp ga một mình', 'Sửa điện', 'Bê tủ lạnh', 'Gấp quần áo, dọn bàn ăn'], 3, 'Việc nhẹ nhàng, an toàn.', ['Sai — đun bếp ga một mình rất nguy hiểm.', 'Sai — sửa điện là việc của người lớn.', 'Sai — bê tủ lạnh quá nặng và nguy hiểm.', 'Đúng — gấp quần áo, dọn bàn ăn là việc vừa sức.']),
    Q('Trước khi ăn, em có thể giúp?', ['Bê nồi nước sôi', 'Dùng dao thái thịt', 'Bày bát đũa', 'Mở bếp ga'], 2, 'Bày bát đũa là việc vừa sức và an toàn.', ['Sai — nồi nước sôi rất nguy hiểm.', 'Sai — dao thái thịt dễ làm em bị thương.', 'Đúng — bày bát đũa vừa sức và an toàn.', 'Sai — mở bếp ga là việc của người lớn.']),
    Q('Khi giúp việc nhà em cảm thấy?', ['Ghét bố mẹ', 'Mệt nên không muốn làm nữa', 'Vui vì giúp được bố mẹ', 'Đòi bố mẹ thưởng tiền mới làm'], 2, 'Vui vì đã giúp được bố mẹ.', ['Sai — giúp bố mẹ không phải lý do để ghét.', 'Sai — giúp việc nhà là điều nên vui.', 'Đúng — vui vì đã giúp được bố mẹ.', 'Sai — giúp bố mẹ không phải để đòi tiền.']),
    Q('Khi không biết làm, em?', ['Làm bừa', 'Trốn đi chơi', 'Tự đoán rồi làm theo ý mình', 'Hỏi bố mẹ cách làm'], 3, 'Hỏi bố mẹ cách làm cho đúng.', ['Sai — làm bừa dễ hỏng việc.', 'Sai — trốn đi chơi là né tránh việc.', 'Sai — đoán bừa dễ làm sai.', 'Đúng — hỏi bố mẹ cách làm cho đúng.']),
  ]),

  M(10, 'Yêu thương ông bà cha mẹ', [
    Q('Khi ông bà ốm, em?', ['Hỏi thăm và lấy nước', 'Mặc kệ', 'Quát to', 'Mở loa nhạc lớn'], 0, 'Hỏi thăm và lấy nước cho ông bà.', ['Đúng — hỏi thăm và lấy nước cho ông bà.', 'Sai — mặc kệ là không quan tâm ông bà.', 'Sai — quát to làm ông bà mệt thêm.', 'Sai — loa to làm ông bà khó nghỉ ngơi.']),
    Q('Đi học về em chào?', ['Chỉ chào bạn', 'Ông bà, bố mẹ', 'Chỉ chào tivi', 'Không chào ai'], 1, 'Chào ông bà, bố mẹ khi về.', ['Sai — về nhà cần chào người thân.', 'Đúng — chào ông bà, bố mẹ khi về.', 'Sai — chào tivi là không đúng.', 'Sai — về nhà phải chào người lớn.']),
    Q('Khi bố mẹ đi làm về mệt, em?', ['Đòi mua đồ chơi', 'Bật tivi to', 'Khóc nhõng nhẽo', 'Lấy nước, hỏi han'], 3, 'Lấy nước, hỏi han bố mẹ.', ['Sai — không đòi đồ chơi khi bố mẹ mệt.', 'Sai — tivi to làm bố mẹ khó nghỉ.', 'Sai — khóc nhõng nhẽo làm bố mẹ mệt hơn.', 'Đúng — lấy nước, hỏi han bố mẹ.']),
    Q('Em thể hiện yêu thương bằng?', ['Chỉ khi mua đồ', 'Chỉ ngày lễ', 'Không cần thể hiện', 'Lời nói, việc làm nhỏ hằng ngày'], 3, 'Yêu thương qua lời nói và việc làm nhỏ hằng ngày.', ['Sai — yêu thương không gắn với mua đồ.', 'Sai — không chỉ ngày lễ mới yêu thương.', 'Sai — yêu thương nên được thể hiện ra.', 'Đúng — yêu thương qua lời nói, việc làm nhỏ hằng ngày.']),
  ]),

  M(11, 'An toàn khi đi học', [
    Q('Đi học em đi bên?', ['Phải lề đường, trên vỉa hè', 'Bên trái', 'Trong làn ô tô', 'Giữa đường'], 0, 'Đi vỉa hè bên phải, an toàn.', ['Đúng — đi sát lề bên phải, trên vỉa hè cho an toàn.', 'Sai — đi bên trái không đúng quy định.', 'Sai — làn ô tô rất nguy hiểm.', 'Sai — đi giữa đường rất nguy hiểm.']),
    Q('Khi qua đường em?', ['Lao qua nhanh', 'Đi giữa làn xe', 'Nhắm mắt qua', 'Nhìn trái-phải, đi vạch cho người đi bộ'], 3, 'Quan sát và đi đúng vạch cho người đi bộ.', ['Sai — lao qua nhanh rất nguy hiểm.', 'Sai — đi giữa làn xe dễ bị tai nạn.', 'Sai — nhắm mắt qua đường rất nguy hiểm.', 'Đúng — nhìn trái-phải, đi đúng vạch cho người đi bộ.']),
    Q('Nếu bị người lạ rủ đi, em?', ['Lên xe người lạ', 'Từ chối và chạy về gặp người tin cậy', 'Nhận quà', 'Đi theo'], 1, 'Từ chối, tìm người lớn tin cậy.', ['Sai — không lên xe người lạ.', 'Đúng — từ chối và chạy về gặp người tin cậy.', 'Sai — không nhận quà của người lạ.', 'Sai — đi theo người lạ rất nguy hiểm.']),
    Q('Khi đi xe máy với bố mẹ em?', ['Đứng trên yên', 'Đứng giữa xe', 'Cởi mũ cho mát', 'Đội mũ bảo hiểm'], 3, 'Phải đội mũ bảo hiểm.', ['Sai — đứng trên yên rất nguy hiểm.', 'Sai — đứng giữa xe dễ ngã.', 'Sai — phải đội mũ để bảo vệ đầu.', 'Đúng — phải đội mũ bảo hiểm khi đi xe máy.']),
  ]),

  M(12, 'An toàn khi ở nhà', [
    Q('Em KHÔNG được chơi với?', ['Búp bê', 'Sách vở', 'Ổ điện, lửa, dao kéo', 'Diêm và bật lửa trong bếp'], 2, 'Ổ điện, lửa, dao kéo rất nguy hiểm.', ['Sai — búp bê chơi được, không nguy hiểm.', 'Sai — sách vở an toàn, dùng để học.', 'Đúng — ổ điện, lửa, dao kéo rất nguy hiểm.', 'Sai — đây cũng nguy hiểm, nhưng câu hỏi chọn một đáp án bao trùm hơn.']),
    Q('Khi mở cửa cho khách lạ, em?', ['Đưa khách lên phòng', 'Cho khách vào nhà', 'Mở ngay', 'Không tự mở, gọi người lớn'], 3, 'Không tự mở cho người lạ; gọi người lớn.', ['Sai — không đưa người lạ lên phòng.', 'Sai — không cho người lạ vào nhà.', 'Sai — không tự mở cửa cho người lạ.', 'Đúng — không tự mở, gọi người lớn.']),
    Q('Khi bị bỏng nhẹ, em?', ['Giấu đi', 'Báo người lớn, ngâm vùng bỏng vào nước mát sạch', 'Bôi kem đánh răng', 'Bôi mỡ'], 1, 'Ngâm nước mát sạch và báo người lớn.', ['Sai — giấu đi vết bỏng dễ nặng hơn.', 'Đúng — báo người lớn, ngâm vùng bỏng vào nước mát sạch.', 'Sai — không bôi kem đánh răng lên vết bỏng.', 'Sai — không bôi mỡ lên vết bỏng.']),
    Q('Số điện thoại cứu hoả ở Việt Nam là?', ['115', '113', '114', '116'], 2, '114 là cứu hoả; 113 cảnh sát; 115 y tế.', ['Sai — 115 là gọi cấp cứu y tế.', 'Sai — 113 là gọi cảnh sát.', 'Đúng — 114 là số gọi cứu hoả.', 'Sai — 116 không phải số cứu hoả.']),
  ]),

  M(13, 'Lễ hội mùa thu – Tết Trung thu', [
    Q('Tết Trung thu vào?', ['Rằm tháng 8 âm lịch', 'Rằm tháng 7', 'Rằm tháng 12', 'Rằm tháng 1'], 0, 'Trung thu là Rằm tháng 8 âm lịch.', ['Đúng — Trung thu là Rằm tháng 8 âm lịch.', 'Sai — Rằm tháng 7 không phải Trung thu.', 'Sai — Rằm tháng 12 không phải Trung thu.', 'Sai — Rằm tháng 1 không phải Trung thu.']),
    Q('Bánh đặc trưng Trung thu?', ['Bánh chưng', 'Bánh nướng, bánh dẻo', 'Bánh mì', 'Bánh tét'], 1, 'Trung thu có bánh nướng, bánh dẻo.', ['Sai — bánh chưng là món Tết Nguyên đán.', 'Đúng — Trung thu có bánh nướng, bánh dẻo.', 'Sai — bánh mì không phải bánh Trung thu.', 'Sai — bánh tét là món Tết miền Nam.']),
    Q('Đèn Trung thu hay có hình?', ['Tròn trơn không hình', 'Ông sao, cá chép', 'Hộp giấy đen', 'Hình vuông to'], 1, 'Đèn ông sao, đèn cá chép quen thuộc.', ['Sai — đèn Trung thu thường có hình ngộ nghĩnh.', 'Đúng — đèn ông sao, đèn cá chép quen thuộc.', 'Sai — hộp giấy đen không phải đèn Trung thu.', 'Sai — đèn Trung thu không phải hình vuông to.']),
    Q('Trung thu trẻ em làm gì?', ['Đi làm', 'Đi học cả ngày', 'Tự ở nhà', 'Phá cỗ, rước đèn'], 3, 'Trẻ em phá cỗ, rước đèn.', ['Sai — trẻ em không đi làm.', 'Sai — Trung thu là dịp vui chơi.', 'Sai — Trung thu nên cùng mọi người vui chơi.', 'Đúng — trẻ em phá cỗ, rước đèn vui Trung thu.']),
  ]),

  M(14, 'Em yêu trường em', [
    Q('Trong trường em có?', ['Bến xe', 'Nhà máy', 'Lớp học, sân chơi, thư viện', 'Chợ và quán phở'], 2, 'Trong trường có lớp học, sân chơi, thư viện.', ['Sai — bến xe không nằm trong trường.', 'Sai — nhà máy không nằm trong trường.', 'Đúng — trong trường có lớp học, sân chơi, thư viện.', 'Sai — chợ và quán phở không nằm trong trường.']),
    Q('Người làm việc ở trường gồm?', ['Công an', 'Lính cứu hoả', 'Cô/thầy, bác bảo vệ, cô lao công', 'Bác sĩ và y tá'], 2, 'Cô thầy, bác bảo vệ, cô lao công…', ['Sai — công an làm việc ở nơi khác.', 'Sai — lính cứu hoả làm ở đội cứu hoả.', 'Đúng — cô/thầy, bác bảo vệ, cô lao công làm ở trường.', 'Sai — bác sĩ, y tá làm ở bệnh viện.']),
    Q('Gặp bác bảo vệ em?', ['Trêu bác', 'Quay đi', 'Chào lễ phép', 'Không chào'], 2, 'Chào lễ phép.', ['Sai — trêu bác là không lễ phép.', 'Sai — quay đi là thiếu lịch sự.', 'Đúng — chào bác bảo vệ lễ phép.', 'Sai — gặp người lớn cần chào hỏi.']),
    Q('Em giữ gìn trường lớp bằng?', ['Không vẽ bậy, vứt rác đúng chỗ', 'Bẻ cây', 'Vẽ bậy lên tường', 'Đập kính'], 0, 'Không vẽ bậy, vứt rác đúng chỗ.', ['Đúng — không vẽ bậy, vứt rác đúng chỗ.', 'Sai — bẻ cây làm hại cây xanh.', 'Sai — vẽ bậy làm bẩn tường.', 'Sai — đập kính làm hỏng tài sản của trường.']),
  ]),

  M(15, 'Tôn sư trọng đạo – 20/11', [
    Q('Ngày Nhà giáo Việt Nam là?', ['1/6', '8/3', '20/11', '20/10'], 2, '20/11 là Ngày Nhà giáo Việt Nam.', ['Sai — 1/6 là Quốc tế Thiếu nhi.', 'Sai — 8/3 là Quốc tế Phụ nữ.', 'Đúng — 20/11 là Ngày Nhà giáo Việt Nam.', 'Sai — 20/10 là Ngày Phụ nữ Việt Nam.']),
    Q('Để cảm ơn cô giáo em có thể?', ['Trêu cô', 'Không nói gì', 'Vẽ một tấm thiệp', 'Đập bàn'], 2, 'Vẽ thiệp tặng cô là việc dễ thương.', ['Sai — trêu cô là không lễ phép.', 'Sai — nên nói lời cảm ơn cô.', 'Đúng — vẽ một tấm thiệp tặng cô là việc dễ thương.', 'Sai — đập bàn là hành vi không ngoan.']),
    Q('Trong giờ học em thể hiện kính trọng bằng?', ['Bỏ học', 'Nói chuyện riêng', 'Lắng nghe, làm bài đầy đủ', 'Chỉ chào cô khi có điểm tốt'], 2, 'Lắng nghe và làm bài là cách kính trọng cô.', ['Sai — bỏ học là không kính trọng cô.', 'Sai — nói chuyện riêng làm mất trật tự.', 'Đúng — lắng nghe và làm bài đầy đủ là kính trọng cô.', 'Sai — luôn lễ phép với cô, không chỉ khi có điểm tốt.']),
    Q('Gặp cô ngoài đường em?', ['Quay đầu chạy', 'Trêu cô', 'Chào lễ phép', 'Đợi cô chào trước em mới chào'], 2, 'Chào lễ phép khi gặp cô.', ['Sai — quay đầu chạy là thiếu lễ phép.', 'Sai — trêu cô là không ngoan.', 'Đúng — chào cô lễ phép khi gặp ở ngoài đường.', 'Sai — em nên chủ động chào cô trước.']),
  ]),

  M(16, 'Cảnh quan nhà trường', [
    Q('Cây xanh trong trường giúp?', ['Mất chỗ chơi', 'Hết oxy', 'Gây bụi', 'Bóng mát, không khí trong lành'], 3, 'Cây xanh cho bóng mát và không khí trong lành.', ['Sai — cây xanh không làm mất chỗ chơi.', 'Sai — cây xanh tạo thêm oxy.', 'Sai — cây xanh giúp giảm bụi.', 'Đúng — cây xanh cho bóng mát và không khí trong lành.']),
    Q('Em chăm cây bằng?', ['Vặt lá', 'Tưới nước, không bẻ cành', 'Khắc tên lên thân', 'Bẻ cành'], 1, 'Tưới nước, không phá hoại cây.', ['Sai — vặt lá làm hại cây.', 'Đúng — tưới nước và không bẻ cành.', 'Sai — khắc tên làm tổn thương thân cây.', 'Sai — bẻ cành làm cây bị đau.']),
    Q('Khi thấy bạn vứt rác bừa, em?', ['Nhắc bạn nhặt bỏ thùng rác', 'Cười theo', 'Mặc kệ', 'Vứt thêm'], 0, 'Nhắc bạn bỏ rác đúng chỗ.', ['Đúng — nhắc bạn nhặt bỏ vào thùng rác.', 'Sai — cười theo là cổ vũ điều sai.', 'Sai — mặc kệ thì sân trường sẽ bẩn.', 'Sai — vứt thêm làm bẩn thêm.']),
    Q('Trường đẹp giúp em?', ['Bỏ học', 'Mệt mỏi', 'Học tập vui hơn', 'Sợ đến trường'], 2, 'Trường đẹp giúp việc học vui hơn.', ['Sai — trường đẹp khiến em thích đến trường.', 'Sai — trường đẹp giúp em thoải mái hơn.', 'Đúng — trường đẹp giúp việc học vui hơn.', 'Sai — trường đẹp khiến em yêu trường hơn.']),
  ]),

  M(17, 'Em thi đua học tập', [
    Q('Khi cô giao bài, em?', ['Chép bài bạn', 'Chỉ làm những câu em thấy dễ', 'Bỏ qua', 'Cố gắng làm hết, ngay ngắn'], 3, 'Cố gắng làm hết bài và viết ngay ngắn.', ['Sai — chép bài bạn thì em không học được.', 'Sai — nên cố làm cả câu khó.', 'Sai — bỏ qua bài là không cố gắng.', 'Đúng — cố gắng làm hết bài và viết ngay ngắn.']),
    Q('Khi không hiểu bài, em?', ['Bỏ học', 'Đoán đại một đáp án rồi ghi vào', 'Bỏ qua', 'Hỏi cô hoặc bạn'], 3, 'Hỏi cô hoặc bạn để hiểu.', ['Sai — bỏ học không giúp em hiểu bài.', 'Sai — đoán bừa thì vẫn không hiểu.', 'Sai — bỏ qua thì em mãi không hiểu.', 'Đúng — hỏi cô hoặc bạn để hiểu bài.']),
    Q('Bạn được điểm cao, em?', ['Trêu chọc', 'Ghen tị', 'Chúc mừng và học hỏi', 'Cãi bạn'], 2, 'Chúc mừng và học hỏi từ bạn.', ['Sai — trêu chọc bạn là không tốt.', 'Sai — ghen tị không giúp em tiến bộ.', 'Đúng — chúc mừng và học hỏi từ bạn.', 'Sai — cãi bạn là không nên.']),
    Q('Học tập tốt mang lại?', ['Bị bạn ghét', 'Mệt mỏi vô ích', 'Phải học thêm rất nhiều ca tối', 'Niềm vui, tự tin'], 3, 'Học tốt giúp em vui và tự tin.', ['Sai — học tốt không khiến bạn ghét em.', 'Sai — học tập là điều có ích.', 'Sai — học tốt không có nghĩa phải học quá nhiều.', 'Đúng — học tốt mang lại niềm vui và sự tự tin.']),
  ]),

  M(18, 'Tổng kết HK1', [
    Q('Kết thúc HK1 em đã?', ['Yếu hơn', 'Quên hết', 'Không thay đổi', 'Trưởng thành hơn'], 3, 'Em đã trưởng thành hơn so với đầu năm.', ['Sai — học một kì em tiến bộ chứ không yếu hơn.', 'Sai — em đã học được nhiều điều, không quên hết.', 'Sai — sau một kì em có nhiều thay đổi.', 'Đúng — em đã trưởng thành hơn so với đầu năm.']),
    Q('Khi nhận xét cuối kì, em nên?', ['Cãi cô', 'Bình tĩnh lắng nghe', 'Chỉ nhớ phần khen, quên phần nhắc nhở', 'Tránh đi'], 1, 'Bình tĩnh lắng nghe để tiến bộ.', ['Sai — cãi cô là không lễ phép.', 'Đúng — bình tĩnh lắng nghe để tiến bộ.', 'Sai — cần nhớ cả lời nhắc nhở để sửa.', 'Sai — tránh đi thì không tiến bộ được.']),
    Q('Việc gì em làm tốt nhất HK1?', ['Tự mình ghi nhớ và chia sẻ', 'Không có gì tốt', 'Phải hỏi mẹ', 'Bỏ qua câu này'], 0, 'Tự nhớ điều mình làm tốt để tự hào.', ['Đúng — tự nhớ điều mình làm tốt và chia sẻ để tự hào.', 'Sai — ai cũng có điều làm tốt của mình.', 'Sai — em tự biết việc mình làm tốt.', 'Sai — nên suy nghĩ và trả lời câu này.']),
    Q('HK2 em sẽ?', ['Chán nản', 'Lười hơn', 'Cố gắng hơn nữa', 'Bỏ học'], 2, 'Sang HK2 cố gắng hơn nữa.', ['Sai — không nên chán nản khi sang kì mới.', 'Sai — lười hơn thì em sẽ thụt lùi.', 'Đúng — sang HK2 cố gắng hơn nữa.', 'Sai — bỏ học là điều không nên.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Chào HK2 – Mục tiêu của em', [
    Q('Đầu HK2 em nên?', ['Đặt mục tiêu nhỏ cho mình', 'Bỏ học', 'Quên hết HK1', 'Đợi đến giữa kì mới bắt đầu học'], 0, 'Đặt mục tiêu nhỏ để cố gắng.', ['Đúng — đặt mục tiêu nhỏ để cố gắng.', 'Sai — bỏ học là điều không nên.', 'Sai — nên nhớ điều đã học ở HK1.', 'Sai — nên bắt đầu cố gắng ngay từ đầu kì.']),
    Q('Mục tiêu phù hợp lớp 1?', ['Học giỏi nhất nước', 'Mua đồ chơi mới', 'Viết đẹp hơn, đọc trôi chảy hơn', 'Không cần mục tiêu'], 2, 'Mục tiêu vừa sức và rõ ràng.', ['Sai — mục tiêu này quá lớn so với lớp 1.', 'Sai — mua đồ chơi không phải mục tiêu học tập.', 'Đúng — viết đẹp hơn, đọc trôi chảy hơn là mục tiêu vừa sức.', 'Sai — có mục tiêu giúp em cố gắng hơn.']),
    Q('Để đạt mục tiêu em cần?', ['Cố gắng mỗi ngày', 'Đổ lỗi', 'Sao chép bạn', 'Đợi may mắn'], 0, 'Mỗi ngày một chút sẽ đạt được.', ['Đúng — cố gắng mỗi ngày một chút sẽ đạt được.', 'Sai — đổ lỗi không giúp em tiến bộ.', 'Sai — sao chép bạn thì em không tự học được.', 'Sai — không thể chỉ đợi may mắn.']),
    Q('Khi gặp khó khăn em?', ['Nhờ cô, bố mẹ giúp', 'Giấu không cho ai biết là mình khó', 'Trách bạn', 'Bỏ cuộc'], 0, 'Nhờ người lớn giúp đỡ.', ['Đúng — nhờ cô, bố mẹ giúp khi gặp khó khăn.', 'Sai — giấu đi thì không ai giúp được em.', 'Sai — trách bạn không giải quyết được khó khăn.', 'Sai — bỏ cuộc là không cố gắng.']),
  ]),

  M(20, 'Đón Tết cùng gia đình', [
    Q('Tết Nguyên đán vào?', ['Ngày 1/1 dương lịch', 'Rằm tháng Tám', 'Rằm tháng Bảy', 'Mùng 1 tháng Giêng âm lịch'], 3, 'Mùng 1 tháng Giêng âm lịch.', ['Sai — 1/1 dương lịch là Tết Tây.', 'Sai — Rằm tháng Tám là Trung thu.', 'Sai — Rằm tháng Bảy không phải Tết.', 'Đúng — Tết Nguyên đán là Mùng 1 tháng Giêng âm lịch.']),
    Q('Trước Tết em giúp?', ['Cãi nhau với em', 'Vứt rác khắp nhà', 'Ngồi xem tivi suốt', 'Dọn dẹp, lau bàn ghế'], 3, 'Cùng giúp dọn nhà đón Tết.', ['Sai — cãi nhau làm cả nhà mệt.', 'Sai — vứt rác làm nhà bẩn.', 'Sai — nên giúp việc thay vì xem tivi suốt.', 'Đúng — dọn dẹp, lau bàn ghế giúp nhà đón Tết.']),
    Q('Mâm cỗ ngày Tết miền Bắc thường có?', ['Bánh sinh nhật nhiều tầng', 'Bánh chưng', 'Bánh mì', 'Mì gói'], 1, 'Bánh chưng là món truyền thống.', ['Sai — bánh sinh nhật không phải món Tết.', 'Đúng — bánh chưng là món truyền thống ngày Tết.', 'Sai — bánh mì không phải món cỗ Tết.', 'Sai — mì gói không phải món cỗ Tết.']),
    Q('Khi chúc Tết em nói?', ['Đòi tiền lì xì', 'Im lặng', 'Lời chúc lễ phép, vui vẻ', 'Quay đi'], 2, 'Nói lời chúc lễ phép.', ['Sai — không đòi tiền lì xì.', 'Sai — nên nói lời chúc, không im lặng.', 'Đúng — nói lời chúc lễ phép, vui vẻ.', 'Sai — quay đi là thiếu lịch sự.']),
  ]),

  M(21, 'Lì xì và lễ phép ngày Tết', [
    Q('Nhận lì xì em?', ['Đếm tiền chê ít', 'Nhận bằng hai tay, cảm ơn', 'Mở ngay trước mặt khách', 'Giật tiền'], 1, 'Nhận hai tay và cảm ơn.', ['Sai — chê ít là không lễ phép.', 'Đúng — nhận bằng hai tay và nói cảm ơn.', 'Sai — không mở phong bao ngay trước mặt khách.', 'Sai — giật tiền là rất bất lịch sự.']),
    Q('Khi khách đến chơi Tết, em?', ['Trốn vào phòng', 'Trêu khách', 'Chỉ chào ông bà, không chào khách lạ', 'Chào lễ phép, mời nước'], 3, 'Chào hỏi lễ phép và mời nước.', ['Sai — trốn vào phòng là thiếu lễ phép.', 'Sai — trêu khách là không ngoan.', 'Sai — nên chào cả khách đến chơi.', 'Đúng — chào lễ phép và mời nước khách.']),
    Q('Số tiền lì xì em làm gì?', ['Mua thật nhiều bánh', 'Giấu kĩ một mình', 'Đưa bố mẹ giữ giúp', 'Tiêu ngay'], 2, 'Đưa bố mẹ giữ giúp.', ['Sai — không nên tiêu hết vào bánh kẹo.', 'Sai — nên nói với bố mẹ, không giấu một mình.', 'Đúng — đưa bố mẹ giữ giúp cho an toàn.', 'Sai — tiêu ngay là không biết tiết kiệm.']),
    Q('Lì xì có ý nghĩa?', ['May mắn, lời chúc tốt lành', 'Chỉ là tiền', 'So sánh xem ai được lì xì nhiều hơn', 'Khoe của'], 0, 'Lì xì mang ý nghĩa may mắn, tốt lành.', ['Đúng — lì xì mang ý nghĩa may mắn, lời chúc tốt lành.', 'Sai — lì xì không chỉ là tiền.', 'Sai — không nên so sánh ai được nhiều hơn.', 'Sai — lì xì không phải để khoe của.']),
  ]),

  M(22, 'Trò chơi dân gian ngày Tết', [
    Q('Trò chơi nào KHÔNG phải dân gian?', ['Trò chơi điện tử', 'Bịt mắt bắt dê', 'Ô ăn quan', 'Rồng rắn lên mây'], 0, 'Trò chơi điện tử là hiện đại.', ['Đúng — trò chơi điện tử là hiện đại, không phải dân gian.', 'Sai — bịt mắt bắt dê là trò dân gian.', 'Sai — ô ăn quan là trò dân gian.', 'Sai — rồng rắn lên mây là trò dân gian.']),
    Q('Khi chơi cùng bạn ngày Tết em?', ['Cãi nhau', 'Đánh nhau ăn thua', 'Vui vẻ, không hơn thua', 'Gian lận'], 2, 'Chơi vui vẻ là chính.', ['Sai — cãi nhau làm mất vui.', 'Sai — đánh nhau ăn thua là sai.', 'Đúng — chơi vui vẻ, không hơn thua.', 'Sai — gian lận là không trung thực.']),
    Q('Ô ăn quan dùng?', ['Quân bài', 'Bóng đá', 'Sỏi nhỏ và bàn vẽ trên đất/giấy', 'Bàn cờ vua'], 2, 'Ô ăn quan chơi với sỏi và bàn vẽ.', ['Sai — ô ăn quan không dùng quân bài.', 'Sai — ô ăn quan không phải đá bóng.', 'Đúng — ô ăn quan chơi với sỏi nhỏ và bàn vẽ.', 'Sai — ô ăn quan không dùng bàn cờ vua.']),
    Q('Sau khi chơi, em?', ['Cãi nhau ai thắng', 'Vứt sỏi lung tung', 'Cất gọn đồ, không xả rác', 'Để đồ chơi lại sân cho bạn khác chơi tiếp'], 2, 'Cất gọn và giữ sân sạch.', ['Sai — cãi nhau ai thắng làm mất vui.', 'Sai — vứt sỏi lung tung làm bẩn sân.', 'Đúng — cất gọn đồ và không xả rác.', 'Sai — nên cất gọn đồ của mình lại.']),
  ]),

  M(23, 'Mùa xuân và cây xanh', [
    Q('Mùa xuân ở miền Bắc có thời tiết?', ['Mát mẻ, hay mưa phùn', 'Lạnh tuyết', 'Nắng gắt', 'Bão lớn'], 0, 'Miền Bắc mùa xuân mát mẻ, mưa phùn.', ['Đúng — mùa xuân miền Bắc mát mẻ, hay mưa phùn.', 'Sai — miền Bắc rất hiếm khi có tuyết.', 'Sai — nắng gắt là của mùa hè.', 'Sai — bão lớn thường vào mùa hè, mùa thu.']),
    Q('Tết trồng cây do ai phát động?', ['Bác Hồ', 'Cô lao công', 'Các bác nông dân trong làng', 'Bạn em'], 0, 'Bác Hồ phát động Tết trồng cây.', ['Đúng — Bác Hồ phát động Tết trồng cây.', 'Sai — không phải do cô lao công phát động.', 'Sai — không phải do các bác nông dân phát động.', 'Sai — không phải do bạn em phát động.']),
    Q('Em chăm cây bằng?', ['Bóc vỏ', 'Đốt lá', 'Bẻ cành', 'Tưới nước, bắt sâu'], 3, 'Tưới nước, bắt sâu cho cây khoẻ.', ['Sai — bóc vỏ làm cây bị thương.', 'Sai — đốt lá làm hại cây.', 'Sai — bẻ cành làm cây bị đau.', 'Đúng — tưới nước, bắt sâu cho cây khoẻ.']),
    Q('Trồng cây giúp?', ['Hết oxy', 'Mất đất', 'Gây bụi', 'Không khí trong lành, bóng mát'], 3, 'Cây xanh giúp không khí trong lành.', ['Sai — cây xanh tạo thêm oxy.', 'Sai — trồng cây giúp giữ đất.', 'Sai — cây xanh giúp giảm bụi.', 'Đúng — cây giúp không khí trong lành và cho bóng mát.']),
  ]),

  M(24, 'Sinh hoạt cộng đồng – xóm em', [
    Q('Hàng xóm gặp em, em?', ['Lè lưỡi', 'Quay đi', 'Không nói gì', 'Chào lễ phép'], 3, 'Chào hỏi lễ phép.', ['Sai — lè lưỡi là không lễ phép.', 'Sai — quay đi là thiếu lịch sự.', 'Sai — gặp người lớn cần chào hỏi.', 'Đúng — chào hàng xóm lễ phép.']),
    Q('Trong xóm, em không nên?', ['Chào hàng xóm', 'Tham gia dọn vệ sinh', 'Cười nói vừa phải', 'Mở loa thật to'], 3, 'Không mở loa to làm phiền người khác.', ['Sai — chào hàng xóm là việc nên làm.', 'Sai — dọn vệ sinh là việc tốt.', 'Sai — cười nói vừa phải là bình thường.', 'Đúng — không mở loa thật to làm phiền người khác.']),
    Q('Khi hàng xóm cần giúp đỡ, em?', ['Trêu chọc', 'Đóng cửa', 'Báo bố mẹ giúp đỡ', 'Mặc kệ'], 2, 'Báo bố mẹ để giúp đỡ.', ['Sai — trêu chọc là không tốt.', 'Sai — đóng cửa là không quan tâm.', 'Đúng — báo bố mẹ để giúp đỡ hàng xóm.', 'Sai — mặc kệ là vô tâm.']),
    Q('Xóm sạch đẹp nhờ?', ['Tự nhiên', 'Mọi người cùng giữ gìn', 'May mắn', 'Một mình bác tổ trưởng'], 1, 'Tất cả cùng giữ gìn.', ['Sai — xóm sạch không tự nhiên mà có.', 'Đúng — nhờ mọi người cùng nhau giữ gìn.', 'Sai — không phải nhờ may mắn.', 'Sai — một mình bác tổ trưởng không đủ.']),
  ]),

  M(25, 'Quốc tế Phụ nữ 8/3', [
    Q('Ngày 8/3 là ngày?', ['Quốc khánh', 'Nhà giáo Việt Nam', 'Quốc tế Phụ nữ', 'Quốc tế Thiếu nhi'], 2, '8/3 là Quốc tế Phụ nữ.', ['Sai — Quốc khánh là ngày 2/9.', 'Sai — Nhà giáo Việt Nam là 20/11.', 'Đúng — 8/3 là Quốc tế Phụ nữ.', 'Sai — Quốc tế Thiếu nhi là 1/6.']),
    Q('Em làm gì cho mẹ ngày 8/3?', ['Cãi mẹ', 'Đòi mua quà', 'Khóc nhõng nhẽo', 'Tặng thiệp, giúp việc nhà'], 3, 'Tặng thiệp và giúp việc nhà.', ['Sai — cãi mẹ là không ngoan.', 'Sai — ngày này nên tặng mẹ, không đòi quà.', 'Sai — khóc nhõng nhẽo làm mẹ buồn.', 'Đúng — tặng thiệp và giúp mẹ việc nhà.']),
    Q('Trong lớp em chúc?', ['Cô giáo và các bạn nữ', 'Trêu các bạn nữ', 'Chỉ bạn thân', 'Không chúc ai'], 0, 'Chúc cô và các bạn nữ.', ['Đúng — chúc cô giáo và các bạn nữ trong lớp.', 'Sai — trêu bạn là không lịch sự.', 'Sai — nên chúc cô và tất cả các bạn nữ.', 'Sai — ngày 8/3 nên gửi lời chúc.']),
    Q('Lời chúc nên?', ['Chân thành, lịch sự', 'Trêu chọc', 'Chỉ chúc khi được nhắc', 'Bông đùa thô'], 0, 'Chân thành và lịch sự.', ['Đúng — lời chúc nên chân thành và lịch sự.', 'Sai — trêu chọc không phải lời chúc.', 'Sai — nên chủ động chúc, không đợi nhắc.', 'Sai — bông đùa thô là không lịch sự.']),
  ]),

  M(26, 'Em yêu bộ đội – 22/12 / 30/4', [
    Q('Bộ đội bảo vệ?', ['Tự bản thân', 'Tổ quốc, nhân dân', 'Chỉ một xóm', 'Chỉ trường em'], 1, 'Bộ đội bảo vệ Tổ quốc và nhân dân.', ['Sai — bộ đội bảo vệ cả đất nước, không chỉ bản thân.', 'Đúng — bộ đội bảo vệ Tổ quốc và nhân dân.', 'Sai — bộ đội bảo vệ cả nước, không chỉ một xóm.', 'Sai — bộ đội bảo vệ cả nước, không chỉ trường em.']),
    Q('Để cảm ơn bộ đội, em?', ['Cãi cô', 'Bỏ học', 'Đập phá đồ', 'Học giỏi, ngoan ngoãn'], 3, 'Học giỏi cũng là cách cảm ơn.', ['Sai — cãi cô là không ngoan.', 'Sai — bỏ học là điều không nên.', 'Sai — đập phá đồ là hành vi xấu.', 'Đúng — học giỏi, ngoan ngoãn cũng là cách cảm ơn.']),
    Q('Gặp chú bộ đội ngoài đường em?', ['Chào lễ phép', 'Quay đi', 'Sợ hãi bỏ chạy', 'Lè lưỡi'], 0, 'Chào hỏi lễ phép.', ['Đúng — chào chú bộ đội lễ phép.', 'Sai — quay đi là thiếu lịch sự.', 'Sai — không cần sợ chú bộ đội.', 'Sai — lè lưỡi là không lễ phép.']),
    Q('Khi thấy ảnh chú bộ đội canh giữ biển đảo, em cảm thấy?', ['Biết ơn và tự hào', 'Sợ hãi', 'Lạnh nhạt', 'Buồn chán'], 0, 'Cảm thấy biết ơn và tự hào.', ['Đúng — em cảm thấy biết ơn và tự hào.', 'Sai — không có gì phải sợ hãi.', 'Sai — nên trân trọng chứ không lạnh nhạt.', 'Sai — đây là điều đáng tự hào, không buồn chán.']),
  ]),

  M(27, 'Em bảo vệ môi trường', [
    Q('Em bỏ rác?', ['Ra đường', 'Xuống sông', 'Đúng nơi quy định', 'Vứt ra cửa sổ'], 2, 'Bỏ rác đúng nơi quy định.', ['Sai — bỏ rác ra đường làm bẩn môi trường.', 'Sai — bỏ rác xuống sông làm ô nhiễm nước.', 'Đúng — bỏ rác đúng nơi quy định.', 'Sai — vứt ra cửa sổ làm bẩn xung quanh.']),
    Q('Khi đánh răng em?', ['Hứng nước vào cốc, không xả liên tục', 'Không cần tiết kiệm', 'Mở vòi cả lúc đánh', 'Xả mạnh nhất'], 0, 'Hứng nước vào cốc để tiết kiệm.', ['Đúng — hứng nước vào cốc, không xả liên tục để tiết kiệm.', 'Sai — cần tiết kiệm nước.', 'Sai — mở vòi cả lúc đánh sẽ phí nước.', 'Sai — xả mạnh làm lãng phí nước.']),
    Q('Em phân loại rác?', ['Chôn xuống đất', 'Rác tái chế và rác bỏ đi', 'Đốt tất cả', 'Trộn lẫn cho gọn'], 1, 'Phân loại để dễ tái chế.', ['Sai — chôn rác bừa làm ô nhiễm đất.', 'Đúng — chia rác tái chế và rác bỏ đi.', 'Sai — đốt tất cả gây khói độc.', 'Sai — trộn lẫn thì khó tái chế.']),
    Q('Em nên dùng?', ['Cốc nhựa dùng 1 lần', 'Ống hút nhựa', 'Túi ni-lông mỗi lần', 'Túi vải, bình nước cá nhân'], 3, 'Túi vải và bình cá nhân thân thiện môi trường.', ['Sai — cốc nhựa dùng 1 lần thải nhiều rác.', 'Sai — ống hút nhựa gây hại môi trường.', 'Sai — túi ni-lông thải nhiều rác nhựa.', 'Đúng — túi vải, bình nước cá nhân thân thiện môi trường.']),
  ]),

  M(28, 'Em yêu thiên nhiên', [
    Q('Khi đi công viên em không nên?', ['Hít thở không khí', 'Ngắm hoa', 'Hái hoa, bẻ cành', 'Chụp ảnh'], 2, 'Không được hái hoa, bẻ cành.', ['Sai — hít thở không khí trong lành là tốt.', 'Sai — ngắm hoa là việc bình thường.', 'Đúng — không được hái hoa, bẻ cành.', 'Sai — chụp ảnh là việc bình thường.']),
    Q('Khi gặp con vật nhỏ, em?', ['Quan sát từ xa, không bắt', 'Bắt về', 'Ném đá', 'Đánh chết'], 0, 'Quan sát từ xa, không gây hại.', ['Đúng — quan sát từ xa, không bắt, không gây hại.', 'Sai — bắt về làm con vật sợ và có thể bị thương.', 'Sai — ném đá làm hại con vật.', 'Sai — đánh chết con vật là tàn nhẫn.']),
    Q('Nước em uống nên?', ['Nước nhiễm bẩn', 'Nước mưa lẫn bụi', 'Nước sạch đun sôi/để nguội', 'Nước ao'], 2, 'Nước sạch đun sôi mới an toàn.', ['Sai — nước nhiễm bẩn gây bệnh.', 'Sai — nước mưa lẫn bụi không sạch.', 'Đúng — nước sạch đun sôi/để nguội mới an toàn.', 'Sai — nước ao rất bẩn, không uống được.']),
    Q('Yêu thiên nhiên là?', ['Đốt rừng', 'Vứt rác xuống suối', 'Chiếm hữu hoa', 'Giữ gìn, không phá hoại'], 3, 'Yêu là giữ gìn, không phá hoại.', ['Sai — đốt rừng phá hoại thiên nhiên.', 'Sai — vứt rác xuống suối làm ô nhiễm.', 'Sai — không nên chiếm hữu hoa.', 'Đúng — yêu thiên nhiên là giữ gìn, không phá hoại.']),
  ]),

  M(29, 'Hành vi ứng xử nơi công cộng', [
    Q('Trên xe buýt em?', ['Đùa to', 'Chạy nhảy', 'Ăn vặt bừa', 'Nhường ghế người già, em nhỏ'], 3, 'Nhường ghế cho người già, em nhỏ.', ['Sai — đùa to làm phiền mọi người.', 'Sai — chạy nhảy trên xe rất nguy hiểm.', 'Sai — ăn vặt bừa làm bẩn xe.', 'Đúng — nhường ghế cho người già, em nhỏ.']),
    Q('Trong thư viện em?', ['Chạy đùa', 'Giữ im lặng', 'Đập sách', 'Cười nói to'], 1, 'Thư viện cần giữ im lặng.', ['Sai — chạy đùa làm ồn thư viện.', 'Đúng — giữ im lặng trong thư viện.', 'Sai — đập sách làm hỏng sách.', 'Sai — cười nói to làm phiền người đọc.']),
    Q('Khi xếp hàng em?', ['Đẩy bạn', 'La hét', 'Chen ngang', 'Xếp trật tự, không chen'], 3, 'Xếp trật tự, không chen lấn.', ['Sai — đẩy bạn dễ làm bạn ngã.', 'Sai — la hét gây mất trật tự.', 'Sai — chen ngang là không lịch sự.', 'Đúng — xếp hàng trật tự, không chen lấn.']),
    Q('Khi va chạm bạn, em?', ['Cãi nhau', 'Trừng mắt', 'Giả vờ như không có chuyện gì', 'Xin lỗi nhẹ nhàng'], 3, 'Xin lỗi nhẹ nhàng.', ['Sai — cãi nhau làm to chuyện.', 'Sai — trừng mắt là thiếu lịch sự.', 'Sai — nên xin lỗi chứ không lờ đi.', 'Đúng — xin lỗi bạn nhẹ nhàng.']),
  ]),

  M(30, 'Ngày Quốc tế Thiếu nhi 1/6', [
    Q('Ngày 1/6 là?', ['Quốc tế Phụ nữ', 'Quốc khánh', 'Nhà giáo Việt Nam', 'Quốc tế Thiếu nhi'], 3, '1/6 là Quốc tế Thiếu nhi.', ['Sai — Quốc tế Phụ nữ là 8/3.', 'Sai — Quốc khánh là 2/9.', 'Sai — Nhà giáo Việt Nam là 20/11.', 'Đúng — 1/6 là Quốc tế Thiếu nhi.']),
    Q('Ngày này em được?', ['Đi làm thay bố', 'Bị mắng', 'Ở nhà ngủ cả ngày', 'Tham gia hoạt động vui chơi'], 3, 'Em được tham gia hoạt động vui chơi.', ['Sai — trẻ em không đi làm thay bố.', 'Sai — đây là ngày vui của thiếu nhi.', 'Sai — ngày này nên tham gia vui chơi.', 'Đúng — em được tham gia hoạt động vui chơi.']),
    Q('Quyền cơ bản của trẻ em là?', ['Được tự ý nghỉ học', 'Được làm gì cũng được', 'Được học, được vui chơi, được bảo vệ', 'Không có quyền gì'], 2, 'Trẻ em có quyền học, vui chơi, được bảo vệ.', ['Sai — không được tự ý nghỉ học.', 'Sai — không phải làm gì cũng được.', 'Đúng — trẻ em được học, vui chơi, được bảo vệ.', 'Sai — trẻ em có nhiều quyền cơ bản.']),
    Q('Khi thấy bạn bị bắt nạt, em?', ['Báo cô/thầy/người lớn', 'Đánh lại bạn xấu', 'Cười theo', 'Bỏ chạy'], 0, 'Báo người lớn để bảo vệ bạn.', ['Đúng — báo cô/thầy/người lớn để bảo vệ bạn.', 'Sai — đánh lại làm sự việc tệ hơn.', 'Sai — cười theo là cổ vũ điều xấu.', 'Sai — bỏ chạy là bỏ mặc bạn.']),
  ]),

  M(31, 'Em làm thẻ giới thiệu bản thân', [
    Q('Thẻ giới thiệu nên có?', ['Số tài khoản ngân hàng', 'Số CCCD bố', 'Mật khẩu Wi-Fi', 'Tên, lớp, sở thích'], 3, 'Tên, lớp, sở thích là phù hợp.', ['Sai — số tài khoản là thông tin riêng tư.', 'Sai — số CCCD của bố là thông tin riêng tư.', 'Sai — mật khẩu là bí mật, không ghi lên thẻ.', 'Đúng — tên, lớp, sở thích là phù hợp.']),
    Q('Khi viết thẻ em chữ nên?', ['Cẩu thả', 'Quá nhỏ không đọc được', 'Tô lem nhem', 'Rõ ràng, đẹp'], 3, 'Chữ rõ ràng, sạch đẹp.', ['Sai — viết cẩu thả khó đọc.', 'Sai — chữ quá nhỏ thì không đọc được.', 'Sai — tô lem nhem làm thẻ xấu.', 'Đúng — viết chữ rõ ràng, sạch đẹp.']),
    Q('Em trang trí thẻ bằng?', ['Bôi đen hết', 'Xé góc thẻ', 'Vẽ bậy', 'Hình em yêu thích, màu tươi'], 3, 'Hình em yêu thích, màu tươi.', ['Sai — bôi đen hết làm hỏng thẻ.', 'Sai — xé góc thẻ làm rách thẻ.', 'Sai — vẽ bậy làm thẻ xấu.', 'Đúng — trang trí bằng hình em yêu thích, màu tươi.']),
    Q('Khi giới thiệu thẻ trước lớp em?', ['Tự tin, mỉm cười', 'Quay lưng', 'Bỏ ra ngoài', 'Cúi gằm'], 0, 'Tự tin và mỉm cười.', ['Đúng — tự tin và mỉm cười khi giới thiệu.', 'Sai — quay lưng thì bạn không nghe được.', 'Sai — không bỏ ra ngoài khi đang giới thiệu.', 'Sai — cúi gằm khiến em thiếu tự tin.']),
  ]),

  M(32, 'Em tham gia hoạt động lớp', [
    Q('Khi cô chia nhóm, em?', ['Khóc đòi nhóm khác', 'Vui vẻ tham gia với bạn', 'Im lặng không làm', 'Bỏ ra ngoài'], 1, 'Vui vẻ tham gia với bạn.', ['Sai — khóc đòi nhóm khác là không hợp tác.', 'Đúng — vui vẻ tham gia cùng các bạn.', 'Sai — im lặng không làm là không tham gia.', 'Sai — không bỏ ra ngoài khi đang làm việc nhóm.']),
    Q('Khi nhóm cần em làm việc, em?', ['Trốn việc', 'Đẩy việc cho bạn', 'Cố gắng hoàn thành phần của mình', 'Ngồi không'], 2, 'Hoàn thành phần việc của mình.', ['Sai — trốn việc là không trách nhiệm.', 'Sai — đẩy việc cho bạn là không công bằng.', 'Đúng — cố gắng hoàn thành phần việc của mình.', 'Sai — ngồi không thì nhóm không xong việc.']),
    Q('Khi nhóm cãi nhau, em?', ['Im lặng theo ý bạn lớn tiếng nhất', 'Hét to nhất', 'Đánh bạn', 'Nói chuyện hoà nhã, nhờ cô giúp'], 3, 'Hoà nhã và nhờ cô giúp.', ['Sai — không nên chỉ nghe theo ai to tiếng nhất.', 'Sai — hét to làm to chuyện thêm.', 'Sai — đánh bạn là sai.', 'Đúng — nói chuyện hoà nhã và nhờ cô giúp.']),
    Q('Khi nhóm thắng cuộc, em?', ['Vui và cảm ơn các bạn', 'Khoe khoang', 'Im lặng', 'Coi thường bạn yếu'], 0, 'Vui chung và cảm ơn các bạn.', ['Đúng — vui chung và cảm ơn các bạn.', 'Sai — khoe khoang là không khiêm tốn.', 'Sai — nên chia sẻ niềm vui với nhóm.', 'Sai — không coi thường bạn yếu hơn.']),
  ]),

  M(33, 'Em yêu nghề – ước mơ của em', [
    Q('Ước mơ của em nên?', ['Không cần có', 'Bắt chước bạn', 'Bố mẹ áp đặt', 'Là điều em yêu thích'], 3, 'Là điều em yêu thích và phù hợp với mình.', ['Sai — ai cũng nên có ước mơ.', 'Sai — ước mơ là của riêng em, không bắt chước.', 'Sai — ước mơ nên do em chọn.', 'Đúng — ước mơ là điều em yêu thích và phù hợp với mình.']),
    Q('Nghề bác sĩ giúp?', ['Lái máy bay', 'Bán hàng', 'Sửa xe', 'Chữa bệnh cho mọi người'], 3, 'Bác sĩ chữa bệnh cứu người.', ['Sai — lái máy bay là nghề phi công.', 'Sai — bán hàng là nghề khác.', 'Sai — sửa xe là nghề thợ sửa xe.', 'Đúng — bác sĩ chữa bệnh cho mọi người.']),
    Q('Nghề giáo viên?', ['Bán đồ', 'Lái tàu', 'Trồng lúa', 'Dạy học cho học sinh'], 3, 'Giáo viên dạy học.', ['Sai — bán đồ là nghề người bán hàng.', 'Sai — lái tàu là nghề khác.', 'Sai — trồng lúa là nghề nông dân.', 'Đúng — giáo viên dạy học cho học sinh.']),
    Q('Để đạt ước mơ em cần?', ['Đợi may mắn', 'Lười biếng', 'Học tập chăm chỉ từ bây giờ', 'Bỏ học'], 2, 'Học tập chăm chỉ từ bây giờ.', ['Sai — không thể chỉ đợi may mắn.', 'Sai — lười biếng thì không đạt ước mơ.', 'Đúng — học tập chăm chỉ ngay từ bây giờ.', 'Sai — bỏ học thì không đạt được ước mơ.']),
  ]),

  M(34, 'Em chia tay bạn nghỉ hè', [
    Q('Trước nghỉ hè em nên?', ['Cãi cô', 'Im lặng bỏ về', 'Không đến lớp', 'Tạm biệt cô và bạn lịch sự'], 3, 'Tạm biệt lễ phép trước khi nghỉ hè.', ['Sai — cãi cô là không lễ phép.', 'Sai — nên chào tạm biệt trước khi về.', 'Sai — vẫn nên đến lớp ngày cuối.', 'Đúng — tạm biệt cô và bạn lịch sự.']),
    Q('Trong hè em không nên?', ['Quên hết kiến thức', 'Đi dã ngoại', 'Ôn lại bài cũ', 'Đọc truyện'], 0, 'Nên duy trì ôn bài để khỏi quên.', ['Đúng — không nên quên hết kiến thức, hãy ôn bài.', 'Sai — đi dã ngoại là hoạt động bổ ích.', 'Sai — ôn lại bài cũ là việc nên làm.', 'Sai — đọc truyện là sở thích bổ ích.']),
    Q('Khi đi bơi mùa hè, em?', ['Đi cùng người lớn ở nơi an toàn', 'Bơi một mình', 'Tự ra ao sâu', 'Trốn bố mẹ đi bơi'], 0, 'Phải có người lớn và nơi an toàn.', ['Đúng — đi cùng người lớn ở nơi an toàn.', 'Sai — bơi một mình rất nguy hiểm.', 'Sai — ao sâu rất nguy hiểm.', 'Sai — không trốn bố mẹ đi bơi.']),
    Q('Khi nắng nóng em?', ['Nhịn nước', 'Cởi áo phơi nắng', 'Chạy ngoài trưa lâu', 'Đội mũ, uống đủ nước'], 3, 'Đội mũ, uống nước đầy đủ.', ['Sai — nhịn nước dễ bị say nắng.', 'Sai — phơi nắng dễ bị cảm.', 'Sai — chạy ngoài trưa nắng lâu hại sức khoẻ.', 'Đúng — đội mũ và uống đủ nước khi nắng nóng.']),
  ]),

  M(35, 'Tổng kết – Em lên Lớp 2', [
    Q('Sau một năm em đã?', ['Không thay đổi', 'Quên hết', 'Yếu đi', 'Trưởng thành, biết tự lập hơn'], 3, 'Em đã lớn hơn và tự lập hơn.', ['Sai — sau một năm em có nhiều thay đổi.', 'Sai — em đã học được nhiều điều.', 'Sai — em tiến bộ chứ không yếu đi.', 'Đúng — em đã trưởng thành, biết tự lập hơn.']),
    Q('Lên Lớp 2 em sẽ?', ['Tự tin và cố gắng hơn', 'Buồn vì phải xa cô giáo lớp 1', 'Bỏ học', 'Lười hơn'], 0, 'Tự tin và cố gắng hơn nữa.', ['Đúng — lên Lớp 2 em sẽ tự tin và cố gắng hơn.', 'Sai — em vẫn có thể thăm cô giáo cũ.', 'Sai — bỏ học là điều không nên.', 'Sai — lười hơn thì em sẽ thụt lùi.']),
    Q('Em cảm ơn ai đã đồng hành cùng em?', ['Chỉ cảm ơn đồ chơi', 'Không cần cảm ơn ai', 'Cô, bố mẹ, bạn bè', 'Chỉ cảm ơn tivi'], 2, 'Cảm ơn cô, bố mẹ, bạn bè đã đồng hành.', ['Sai — đồ chơi không phải người đồng hành.', 'Sai — nên biết ơn những người giúp em.', 'Đúng — cảm ơn cô, bố mẹ, bạn bè đã đồng hành.', 'Sai — tivi không phải người đồng hành.']),
    Q('Lời chúc em dành cho lớp?', ['Vui vẻ, mạnh khoẻ, học giỏi', 'Cãi nhau', 'Không có gì', 'Quên nhau'], 0, 'Lời chúc tốt đẹp cho cả lớp.', ['Đúng — chúc cả lớp vui vẻ, mạnh khoẻ, học giỏi.', 'Sai — cãi nhau không phải lời chúc.', 'Sai — nên gửi lời chúc tốt đẹp cho lớp.', 'Sai — bạn bè nên nhớ nhau.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Hành trang trải nghiệm vào Lớp 2', [
    Q('Khi được bạn giúp đỡ, em nói gì?', ['Không nói gì', 'Cảm ơn bạn', 'Bỏ đi luôn', 'Trêu lại bạn'], 1, 'Nói lời cảm ơn là điều em đã học cả năm.', ['Sai — im lặng làm bạn nghĩ em không để ý tới việc bạn giúp.', 'Đúng — nói "Cảm ơn bạn" là lời cảm ơn em đã học.', 'Sai — bỏ đi luôn là không lịch sự.', 'Sai — trêu bạn sau khi được giúp là không tử tế.']),
    Q('Khi làm sai với bạn, em nên?', ['Im lặng cho qua', 'Đổ lỗi cho bạn khác', 'Xin lỗi bạn', 'Cười trừ rồi bỏ đi'], 2, 'Biết nói lời xin lỗi là em đã lớn.', ['Sai — im lặng không sửa được điều em làm sai.', 'Sai — đổ lỗi cho người khác là không thật thà.', 'Đúng — xin lỗi bạn là cách đúng nhất.', 'Sai — cười trừ rồi bỏ đi làm bạn buồn thêm.']),
    Q('Tối trước khi đi ngủ, em tự làm gì để sáng mai đi học?', ['Chuẩn bị sách vở theo thời khoá biểu', 'Để bố mẹ làm hết', 'Không cần chuẩn bị gì', 'Xem tivi tới khuya'], 0, 'Tự chuẩn bị sách vở là kĩ năng tự lập của Lớp 1.', ['Đúng — tự soạn sách vở theo thời khoá biểu là tự lập.', 'Sai — em đã lớn, có thể tự soạn sách vở của mình.', 'Sai — không chuẩn bị thì sáng mai dễ quên đồ.', 'Sai — xem tivi khuya làm em dậy muộn và quên soạn sách.']),
    Q('Hoạt động nào là sự kiện của trường em đã tham gia?', ['Đi chợ', 'Lễ khai giảng', 'Đi siêu thị', 'Ngủ trưa ở nhà'], 1, 'Khai giảng, Trung Thu, 20/11 là các sự kiện của trường.', ['Sai — đi chợ là việc của gia đình, không phải sự kiện trường.', 'Đúng — lễ khai giảng là sự kiện lớn của trường.', 'Sai — đi siêu thị là việc của gia đình.', 'Sai — đó là sinh hoạt ở nhà, không phải sự kiện trường.']),
    Q('Để giữ lớp học sạch đẹp, em?', ['Vứt giấy xuống sàn', 'Bôi bẩn lên mặt bàn', 'Không quan tâm', 'Nhặt rác và lau bàn ghế'], 3, 'Giữ vệ sinh lớp là trách nhiệm chung của cả lớp.', ['Sai — vứt giấy xuống sàn làm lớp bẩn.', 'Sai — bôi bẩn lên bàn là phá hoại đồ dùng chung.', 'Sai — lớp là của chung, em nên cùng giữ gìn.', 'Đúng — nhặt rác và lau bàn ghế giúp lớp luôn sạch đẹp.']),
    Q('Lên Lớp 2, em sẽ?', ['Quên hết bạn cũ', 'Tự tin, tiếp tục tự lập và tử tế', 'Không kết bạn mới', 'Bỏ hết hoạt động của lớp'], 1, 'Giữ tình bạn cũ, tự tin đón hoạt động mới.', ['Sai — em vẫn nên giữ tình bạn với các bạn Lớp 1.', 'Đúng — tự tin, giữ nếp tự lập và sống tử tế.', 'Sai — Lớp 2 em sẽ có thêm nhiều bạn mới.', 'Sai — hoạt động của lớp giúp em học được nhiều điều.']),
  ]),
];

export const P1HDTN_SCENARIOS = indexBy(P1HDTN_WEEKS);
