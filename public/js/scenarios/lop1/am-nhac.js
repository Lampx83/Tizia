// ============================================================
// Lớp 1 · ÂM NHẠC — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 chủ đề Tết)
// Bám SGK Âm nhạc Lớp 1 (CTGD 2018): hát bài quen, nhạc cụ gõ,
// to – nhỏ, nhanh – chậm, phách, nốt đen / trắng.
// ID prefix: "P1AN-wNN-quiz"
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1AN', 'am-nhac', n, title, qs, opts);

export const P1AN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Bài hát "Quê hương tươi đẹp"', [
    Q('"Quê hương tươi đẹp" là dân ca của dân tộc nào?', ['Dân ca Nùng', 'Dân ca Khmer', 'Dân ca Kinh', 'Dân ca Thái'], 0, '"Quê hương tươi đẹp" là dân ca Nùng được đặt lời mới.', ['Đúng — đây là dân ca Nùng đặt lời mới.', 'Sai — bài này không phải dân ca Khmer.', 'Sai — bài này không phải dân ca Kinh.', 'Sai — bài này không phải dân ca Thái.']),
    Q('Bài hát nói về điều gì?', ['Mùa xuân', 'Đi học', 'Vẻ đẹp quê hương', 'Mẹ ru con'], 2, 'Bài hát ca ngợi vẻ đẹp quê hương.', ['Sai — bài không nói về mùa xuân.', 'Sai — bài không nói về đi học.', 'Đúng — bài ca ngợi vẻ đẹp quê hương.', 'Sai — bài không phải lời mẹ ru con.']),
    Q('Khi hát bài này, em nên có cảm xúc?', ['Buồn bã', 'Sợ hãi', 'Giận dữ', 'Vui tươi, tự hào'], 3, 'Bài hát có giai điệu vui tươi, êm dịu.', ['Sai — bài không buồn bã.', 'Sai — bài không gợi sợ hãi.', 'Sai — bài không giận dữ.', 'Đúng — hát vui tươi, tự hào về quê hương.']),
    Q('Câu mở đầu bài hát là "Quê hương em …"?', ['buồn lắm', 'ướt át mưa', 'biết bao tươi đẹp', 'xa quá rồi'], 2, '"Quê hương em biết bao tươi đẹp…"', ['Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Đúng — "Quê hương em biết bao tươi đẹp…".', 'Sai — lời hát không phải vậy.']),
    Q('Khi hát em ngồi/đứng thế nào?', ['Ngồi/đứng thẳng, mắt nhìn cô', 'Nằm xuống', 'Ngồi gục xuống bàn', 'Quay lưng đi'], 0, 'Tư thế đẹp giúp hơi thở tốt, hát hay hơn.', ['Đúng — ngồi/đứng thẳng, mắt nhìn cô để hát hay.', 'Sai — không nằm khi hát.', 'Sai — không gục xuống bàn.', 'Sai — không quay lưng đi.']),
    Q('Khi cô đánh nhịp, em nên?', ['Hát theo nhịp tay cô', 'Hát thật nhanh cho xong', 'Hát to át lời bạn', 'Hát thật chậm'], 0, 'Hát theo nhịp cô đánh giúp cả lớp hát đều.', ['Đúng — hát theo nhịp tay cô để cả lớp đều.', 'Sai — không hát nhanh cho xong.', 'Sai — không hát to át lời bạn.', 'Sai — không hát thật chậm.']),
  ]),

  M(2, 'Nghe nhạc — phân biệt to và nhỏ', [
    Q('Âm thanh to là âm thanh thế nào?', ['Yên lặng', 'Không có âm', 'Nhỏ, êm, thì thầm', 'Vang, mạnh, nghe rõ'], 3, 'Âm to nghe rõ và vang.', ['Sai — yên lặng là không có âm.', 'Sai — không có âm thì không nghe được.', 'Sai — đó là âm nhỏ.', 'Đúng — âm to vang, mạnh, nghe rõ.']),
    Q('Tiếng trống thường là âm?', ['Im lặng', 'Không nghe được', 'Nhỏ như tiếng lá rơi', 'To'], 3, 'Trống là nhạc cụ có âm to.', ['Sai — trống không im lặng.', 'Sai — trống nghe rõ.', 'Sai — trống không nhỏ như lá rơi.', 'Đúng — trống là nhạc cụ có âm to.']),
    Q('Tiếng thì thầm là âm?', ['Không nghe được', 'Rất to', 'To như tiếng trống', 'Nhỏ'], 3, 'Thì thầm là âm rất nhỏ.', ['Sai — thì thầm vẫn nghe được khi ở gần.', 'Sai — thì thầm không to.', 'Sai — thì thầm không to như trống.', 'Đúng — thì thầm là âm rất nhỏ.']),
    Q('Khi cô bảo "hát to lên", em nên?', ['Hát nhỏ hơn', 'Hát to vừa phải, rõ lời', 'Hét thật to', 'Im lặng'], 1, 'To đủ rõ lời, không phải hét.', ['Sai — cô bảo hát to chứ không nhỏ.', 'Đúng — hát to vừa phải, rõ lời.', 'Sai — hát to không phải là hét.', 'Sai — không được im lặng.']),
    Q('Trong lớp học em nên nói âm thanh thế nào?', ['Nói vừa nghe, không hét', 'Im lặng', 'Thì thầm cả ngày', 'Hét thật to'], 0, 'Nói vừa nghe là lịch sự trong lớp.', ['Đúng — nói vừa nghe là lịch sự.', 'Sai — không cần im lặng cả buổi.', 'Sai — không cần thì thầm cả ngày.', 'Sai — hét to làm ồn lớp.']),
    Q('Khi nghe nhạc trầm em sẽ thấy?', ['Nhức tai', 'Khó chịu', 'Êm dịu, dễ chịu', 'Sợ hãi'], 2, 'Âm thanh êm dịu khiến em dễ chịu.', ['Sai — nhạc trầm không gây nhức tai.', 'Sai — nhạc trầm không khó chịu.', 'Đúng — âm êm dịu khiến em dễ chịu.', 'Sai — nhạc trầm không gây sợ hãi.']),
  ]),

  M(3, 'Vỗ tay theo phách bài "Quê hương tươi đẹp"', [
    Q('Phách là gì?', ['Tên một con vật', 'Một loại bánh', 'Một loại quả', 'Đơn vị thời gian đều đặn trong nhạc'], 3, 'Phách là nhịp đều giúp ta vỗ tay theo nhạc.', ['Sai — phách không phải con vật.', 'Sai — phách không phải bánh.', 'Sai — phách không phải quả.', 'Đúng — phách là đơn vị thời gian đều đặn trong nhạc.']),
    Q('Vỗ tay theo phách giúp em?', ['Hát nhanh hơn', 'Hát lệch', 'Hát đúng nhịp', 'Hát to hơn'], 2, 'Vỗ tay giúp giữ nhịp đều.', ['Sai — vỗ phách không để hát nhanh hơn.', 'Sai — vỗ phách giúp khỏi hát lệch.', 'Đúng — vỗ tay giúp hát đúng nhịp.', 'Sai — vỗ phách không để hát to hơn.']),
    Q('Một phách trong bài hát thường tương ứng với?', ['Không có vỗ', 'Hai cái vỗ', 'Bốn cái vỗ', 'Một cái vỗ tay đều'], 3, 'Mỗi phách = một cái vỗ đều đặn.', ['Sai — mỗi phách có một cái vỗ.', 'Sai — không phải hai cái vỗ.', 'Sai — không phải bốn cái vỗ.', 'Đúng — mỗi phách là một cái vỗ tay đều.']),
    Q('Khi vỗ tay theo nhạc, em nên?', ['Vỗ thật chậm', 'Vỗ đều, không nhanh không chậm', 'Vỗ thật nhanh', 'Không cần đều'], 1, 'Đều đặn là quan trọng nhất.', ['Sai — không vỗ thật chậm.', 'Đúng — vỗ đều, không nhanh không chậm.', 'Sai — không vỗ thật nhanh.', 'Sai — phải vỗ đều.']),
    Q('Bạn nào vỗ tay đúng?', ['Bạn Bình không vỗ', 'Bạn Hà vỗ thật nhanh', 'Bạn Mai vỗ đều theo nhịp cô', 'Bạn Tú vỗ lung tung'], 2, 'Vỗ đều theo nhịp là đúng.', ['Sai — bạn Bình không vỗ là chưa đúng.', 'Sai — bạn Hà vỗ quá nhanh.', 'Đúng — bạn Mai vỗ đều theo nhịp cô.', 'Sai — bạn Tú vỗ lung tung.']),
    Q('Vỗ tay là một cách?', ['Đệm cho lời hát', 'Phá lời hát', 'Không cần thiết', 'Làm bạn rối'], 0, 'Vỗ tay là cách đệm đơn giản cho bài hát.', ['Đúng — vỗ tay là cách đệm cho lời hát.', 'Sai — vỗ đúng không phá lời hát.', 'Sai — vỗ tay rất hữu ích.', 'Sai — vỗ đều không làm bạn rối.']),
  ]),

  M(4, 'Nhạc cụ gõ — thanh phách', [
    Q('Thanh phách làm bằng?', ['Nhựa cứng', 'Một ống sắt dài', 'Hai thanh gỗ ngắn', 'Vỏ tre mỏng'], 2, 'Thanh phách là hai thanh gỗ tròn ngắn.', ['Sai — thanh phách không làm bằng nhựa cứng.', 'Sai — thanh phách không phải ống sắt.', 'Đúng — thanh phách là hai thanh gỗ ngắn.', 'Sai — thanh phách không phải vỏ tre.']),
    Q('Cách chơi thanh phách?', ['Đập xuống đất', 'Gõ hai thanh vào nhau', 'Kéo như đàn', 'Thổi như sáo'], 1, 'Gõ hai thanh vào nhau tạo ra âm "tách – tách".', ['Sai — không đập xuống đất.', 'Đúng — gõ hai thanh vào nhau kêu "tách – tách".', 'Sai — phách không kéo như đàn.', 'Sai — phách không thổi như sáo.']),
    Q('Âm của thanh phách là?', ['Trầm vang', 'Rất to', 'Êm dịu như sáo', 'Khô, giòn'], 3, 'Tiếng phách khô, giòn — hợp đệm nhịp.', ['Sai — phách không trầm vang.', 'Sai — phách không quá to.', 'Sai — phách không êm như sáo.', 'Đúng — tiếng phách khô, giòn.']),
    Q('Thanh phách thường dùng để?', ['Giữ nhịp', 'Tạo giai điệu chính', 'Chỉ trang trí', 'Thay tiếng hát của ca sĩ'], 0, 'Phách giúp giữ nhịp cho bài hát.', ['Đúng — phách dùng để giữ nhịp.', 'Sai — phách không tạo giai điệu chính.', 'Sai — phách không chỉ để trang trí.', 'Sai — phách không thay tiếng hát.']),
    Q('Khi gõ phách em nên?', ['Quăng phách đi', 'Gõ thật mạnh', 'Gõ lung tung', 'Gõ đều theo nhịp'], 3, 'Gõ đều theo nhịp là đúng.', ['Sai — không quăng phách đi.', 'Sai — không gõ thật mạnh.', 'Sai — không gõ lung tung.', 'Đúng — gõ đều theo nhịp là đúng.']),
    Q('Phách là nhạc cụ thuộc nhóm?', ['Nhạc cụ điện', 'Nhạc cụ gõ', 'Nhạc cụ dây', 'Nhạc cụ hơi'], 1, 'Phách là nhạc cụ gõ truyền thống.', ['Sai — phách không phải nhạc cụ điện.', 'Đúng — phách là nhạc cụ gõ.', 'Sai — phách không phải nhạc cụ dây.', 'Sai — phách không phải nhạc cụ hơi.']),
  ]),

  M(5, 'Bài hát "Cháu lên ba"', [
    Q('"Cháu lên ba" là bài hát của nhạc sĩ?', ['Văn Cao', 'Phạm Tuyên', 'Trịnh Công Sơn', 'Lưu Hữu Phước'], 1, 'Bài "Cháu lên ba" do nhạc sĩ Phạm Tuyên sáng tác.', ['Sai — không phải Văn Cao.', 'Đúng — bài do nhạc sĩ Phạm Tuyên sáng tác.', 'Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Lưu Hữu Phước.']),
    Q('Bài hát nói về?', ['Cháu lên ba đi mẫu giáo', 'Cháu đi làm', 'Cháu đi học lớp 5', 'Cháu đi chơi xa'], 0, 'Bài hát kể chuyện bé 3 tuổi đi mẫu giáo.', ['Đúng — bé 3 tuổi đi mẫu giáo.', 'Sai — bé chưa đi làm.', 'Sai — bé chưa học lớp 5.', 'Sai — bài không nói đi chơi xa.']),
    Q('Câu hát mở đầu là "Cháu lên ba …"?', ['cháu đi chơi', 'cháu đi mẫu giáo', 'cháu ở nhà', 'cháu đi học chữ'], 1, '"Cháu lên ba, cháu đi mẫu giáo…"', ['Sai — lời hát không phải vậy.', 'Đúng — "Cháu lên ba, cháu đi mẫu giáo…".', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.']),
    Q('Cảm xúc khi hát bài này?', ['Sợ hãi', 'Buồn, da diết', 'Vui tươi, hồn nhiên', 'Giận dữ'], 2, 'Bài hát rộn ràng, hồn nhiên.', ['Sai — bài không gợi sợ hãi.', 'Sai — bài không buồn da diết.', 'Đúng — bài vui tươi, hồn nhiên.', 'Sai — bài không giận dữ.']),
    Q('Bài hát phù hợp tốc độ?', ['Vừa phải, vui tươi', 'Nhanh như chạy', 'Đứng yên', 'Chậm rất chậm'], 0, 'Tốc độ vừa phải để rõ lời và vui.', ['Đúng — tốc độ vừa phải, vui tươi.', 'Sai — không nhanh như chạy.', 'Sai — hát thì không đứng yên về tốc độ.', 'Sai — không chậm rất chậm.']),
    Q('Khi hát bài này em nên?', ['Mỉm cười, hát rõ lời', 'Hát thì thầm', 'Không hát', 'Hát buồn'], 0, 'Mỉm cười giúp giọng hát tươi vui hơn.', ['Đúng — mỉm cười, hát rõ lời.', 'Sai — bài vui không hát thì thầm.', 'Sai — phải cùng hát.', 'Sai — bài này không hát buồn.']),
  ]),

  M(6, 'Nhanh và chậm trong âm nhạc', [
    Q('Nhịp nhanh thường gợi cảm giác?', ['Yên tĩnh', 'Vui, sôi nổi', 'Sợ hãi', 'Buồn ngủ'], 1, 'Nhịp nhanh tạo không khí sôi nổi.', ['Sai — nhịp nhanh không yên tĩnh.', 'Đúng — nhịp nhanh vui, sôi nổi.', 'Sai — nhịp nhanh không gợi sợ hãi.', 'Sai — nhịp nhanh không gây buồn ngủ.']),
    Q('Nhịp chậm thường gợi?', ['Náo nhiệt', 'Giận dữ', 'Lo lắng', 'Êm dịu, sâu lắng'], 3, 'Nhịp chậm cho cảm giác sâu lắng.', ['Sai — nhịp chậm không náo nhiệt.', 'Sai — nhịp chậm không giận dữ.', 'Sai — nhịp chậm không gây lo lắng.', 'Đúng — nhịp chậm êm dịu, sâu lắng.']),
    Q('Bài hát ru em bé thường có tốc độ?', ['Chậm', 'Nhanh và rộn ràng', 'Rất nhanh', 'Cực nhanh'], 0, 'Hát ru chậm để em bé dễ ngủ.', ['Đúng — hát ru chậm để bé dễ ngủ.', 'Sai — hát ru không nhanh rộn ràng.', 'Sai — hát ru không rất nhanh.', 'Sai — hát ru không cực nhanh.']),
    Q('Khi cô bảo "hát nhanh hơn", em nên?', ['Im lặng', 'Hát nhanh nhưng vẫn rõ lời', 'Hát thật chậm', 'Hát líu lưỡi'], 1, 'Nhanh nhưng phải rõ lời.', ['Sai — không được im lặng.', 'Đúng — hát nhanh nhưng vẫn rõ lời.', 'Sai — cô bảo nhanh chứ không chậm.', 'Sai — nhanh nhưng không líu lưỡi.']),
    Q('Bài hát đi diễu hành thường tốc độ?', ['Líu lưỡi', 'Rất chậm', 'Vừa, đều như bước chân', 'Đứng yên'], 2, 'Tốc độ đi đều giúp bước chân khớp nhau.', ['Sai — không líu lưỡi.', 'Sai — diễu hành không rất chậm.', 'Đúng — vừa, đều như bước chân.', 'Sai — diễu hành là bước đi, không đứng yên.']),
    Q('Em có thể đổi tốc độ khi hát không?', ['Không bao giờ', 'Phải luôn chậm', 'Có, theo cảm xúc bài hát', 'Phải luôn nhanh'], 2, 'Bài hát có thể nhanh hay chậm tuỳ nội dung.', ['Sai — tốc độ có thể đổi.', 'Sai — không phải luôn chậm.', 'Đúng — đổi tốc độ theo cảm xúc bài hát.', 'Sai — không phải luôn nhanh.']),
  ]),

  M(7, 'Bài hát "Mời bạn vui múa ca"', [
    Q('Bài "Mời bạn vui múa ca" của nhạc sĩ?', ['Văn Cao', 'Hoàng Vân', 'Trần Hoàn', 'Phạm Tuyên'], 3, 'Nhạc sĩ Phạm Tuyên là tác giả bài này.', ['Sai — không phải Văn Cao.', 'Sai — không phải Hoàng Vân.', 'Sai — không phải Trần Hoàn.', 'Đúng — nhạc sĩ Phạm Tuyên là tác giả.']),
    Q('Bài hát mời các bạn làm gì?', ['Ăn cơm', 'Đi học bài', 'Đi ngủ', 'Vui múa ca cùng nhau'], 3, 'Bài hát mời các bạn cùng múa ca.', ['Sai — bài không mời ăn cơm.', 'Sai — bài không mời đi học bài.', 'Sai — bài không mời đi ngủ.', 'Đúng — mời các bạn vui múa ca cùng nhau.']),
    Q('Cảm xúc khi hát bài này?', ['Sợ hãi', 'Vui tươi, rộn ràng', 'Mệt mỏi', 'Buồn, sâu lắng'], 1, 'Giai điệu vui tươi, mời gọi.', ['Sai — bài không gợi sợ hãi.', 'Đúng — vui tươi, rộn ràng.', 'Sai — bài không gây mệt mỏi.', 'Sai — bài không buồn sâu lắng.']),
    Q('Khi hát bài này em có thể?', ['Ngồi im một chỗ', 'Hét to', 'Quay lưng đi', 'Vừa hát vừa múa nhẹ'], 3, 'Vừa hát vừa múa giúp bài thêm sinh động.', ['Sai — bài này nên có động tác.', 'Sai — không hét to.', 'Sai — không quay lưng đi.', 'Đúng — vừa hát vừa múa nhẹ.']),
    Q('Hát bài này nên có nhịp?', ['Rất nhanh líu lưỡi', 'Lệch nhịp', 'Rất chậm', 'Đều, vui'], 3, 'Đều và vui là phù hợp.', ['Sai — không nhanh líu lưỡi.', 'Sai — không hát lệch nhịp.', 'Sai — bài này không rất chậm.', 'Đúng — hát đều, vui.']),
    Q('Khi cùng các bạn múa, em nên?', ['Làm theo ý mình lung tung', 'Làm động tác cùng cả lớp', 'Đứng yên', 'Bỏ ra ngoài'], 1, 'Múa đều cùng lớp mới đẹp.', ['Sai — không làm lung tung.', 'Đúng — làm động tác cùng cả lớp.', 'Sai — không đứng yên.', 'Sai — không bỏ ra ngoài.']),
  ]),

  M(8, 'Nhạc cụ gõ — trống nhỏ', [
    Q('Trống nhỏ thường được làm bằng?', ['Bông và len mềm', 'Da và gỗ (hoặc nhựa)', 'Giấy cứng cuộn tròn', 'Vải dày nhiều lớp'], 1, 'Trống có mặt da căng trên thân gỗ.', ['Sai — trống không làm bằng bông len.', 'Đúng — trống có mặt da căng trên thân gỗ.', 'Sai — trống không làm bằng giấy cuộn.', 'Sai — trống không làm bằng vải dày.']),
    Q('Cách chơi trống nhỏ?', ['Đập xuống đất', 'Thổi vào lỗ nhỏ trên trống', 'Kéo dây', 'Gõ bằng tay hoặc dùi'], 3, 'Gõ tay hoặc dùi lên mặt trống.', ['Sai — không đập trống xuống đất.', 'Sai — trống không thổi như sáo.', 'Sai — trống không có dây để kéo.', 'Đúng — gõ bằng tay hoặc dùi lên mặt trống.']),
    Q('Âm của trống là?', ['Êm như sáo', 'Cao véo von', 'To, vang, sâu', 'Nhỏ thì thầm'], 2, 'Trống có âm to và vang.', ['Sai — trống không êm như sáo.', 'Sai — trống không cao véo von.', 'Đúng — trống có âm to, vang, sâu.', 'Sai — trống không nhỏ thì thầm.']),
    Q('Trống nhỏ thuộc nhóm?', ['Nhạc cụ hơi', 'Nhạc cụ dây', 'Nhạc cụ điện', 'Nhạc cụ gõ'], 3, 'Trống là nhạc cụ gõ.', ['Sai — trống không phải nhạc cụ hơi.', 'Sai — trống không phải nhạc cụ dây.', 'Sai — trống không phải nhạc cụ điện.', 'Đúng — trống là nhạc cụ gõ.']),
    Q('Khi gõ trống em nên?', ['Đập thật mạnh', 'Gõ đều theo nhịp', 'Quăng dùi', 'Gõ lung tung'], 1, 'Đều theo nhịp là đúng.', ['Sai — không đập thật mạnh.', 'Đúng — gõ đều theo nhịp.', 'Sai — không quăng dùi.', 'Sai — không gõ lung tung.']),
    Q('Trống thường dùng để?', ['Trang trí', 'Không có công dụng', 'Đệm rất nhẹ như đàn', 'Giữ nhịp mạnh cho bài hát'], 3, 'Trống giữ nhịp mạnh mẽ cho bài hát.', ['Sai — trống không chỉ để trang trí.', 'Sai — trống rất hữu ích.', 'Sai — trống không đệm nhẹ như đàn.', 'Đúng — trống giữ nhịp mạnh cho bài hát.']),
  ]),

  M(9, 'Bài hát "Cùng quây quần"', [
    Q('"Cùng quây quần" nói về điều gì?', ['Đi ngủ', 'Các bạn quây quần ca hát', 'Đi chợ', 'Đi học một mình'], 1, 'Bài hát kể về các bạn cùng quây quần ca hát.', ['Sai — bài không nói đi ngủ.', 'Đúng — các bạn quây quần ca hát.', 'Sai — bài không nói đi chợ.', 'Sai — bài nói cùng nhau chứ không một mình.']),
    Q('Khi hát cùng bạn, em nên?', ['Hát sai cố tình', 'Hát đều cùng cả lớp', 'Át tiếng bạn', 'Im lặng'], 1, 'Hát đều giúp lớp hát đẹp.', ['Sai — không hát sai cố tình.', 'Đúng — hát đều cùng cả lớp.', 'Sai — không át tiếng bạn.', 'Sai — phải cùng hát, không im lặng.']),
    Q('Cảm xúc khi hát "Cùng quây quần"?', ['Buồn, nhớ nhà', 'Sợ hãi', 'Vui, ấm áp', 'Giận dữ'], 2, 'Bài hát rất vui và ấm áp.', ['Sai — bài không buồn nhớ nhà.', 'Sai — bài không gợi sợ hãi.', 'Đúng — bài vui và ấm áp.', 'Sai — bài không giận dữ.']),
    Q('Nếu bạn hát sai, em nên?', ['Cười nhạo', 'La mắng bạn', 'Nhẹ nhàng nhắc bạn', 'Bỏ ra ngoài'], 2, 'Nhẹ nhàng giúp bạn hát tốt hơn.', ['Sai — không cười nhạo bạn.', 'Sai — không la mắng bạn.', 'Đúng — nhẹ nhàng nhắc bạn.', 'Sai — không bỏ ra ngoài.']),
    Q('Hát cùng nhau gọi là?', ['Hát tập thể', 'Hát đôi', 'Hát theo nhạc', 'Hát đơn'], 0, 'Hát tập thể là hát cùng nhau.', ['Đúng — hát cùng nhau gọi là hát tập thể.', 'Sai — hát đôi là hai người.', 'Sai — hát theo nhạc khác với cùng nhau.', 'Sai — hát đơn là một mình.']),
    Q('Khi hát tập thể em không nên?', ['Cùng giữ nhịp', 'Hát to át tiếng bạn', 'Lắng nghe nhau', 'Hát hoà giọng'], 1, 'Át tiếng bạn làm bài hát mất đẹp.', ['Sai — cùng giữ nhịp là điều nên làm.', 'Đúng — không nên hát to át tiếng bạn.', 'Sai — lắng nghe nhau là điều nên làm.', 'Sai — hát hoà giọng là điều nên làm.']),
  ]),

  M(10, 'Nghe nhạc — "Quốc ca Việt Nam"', [
    Q('Quốc ca Việt Nam có tên gốc?', ['Diệt phát xít', 'Hành quân xa', 'Lên đàng', 'Tiến quân ca'], 3, 'Quốc ca là bài "Tiến quân ca" của Văn Cao.', ['Sai — không phải "Diệt phát xít".', 'Sai — không phải "Hành quân xa".', 'Sai — không phải "Lên đàng".', 'Đúng — Quốc ca là "Tiến quân ca".']),
    Q('Khi hát/ nghe Quốc ca, em có tư thế?', ['Ngồi tự do', 'Cười đùa', 'Nằm nghỉ thoải mái', 'Đứng nghiêm, mắt hướng cờ'], 3, 'Đứng nghiêm và hướng về Quốc kỳ là tôn kính.', ['Sai — không ngồi tự do.', 'Sai — không cười đùa.', 'Sai — không nằm nghỉ.', 'Đúng — đứng nghiêm, mắt hướng cờ.']),
    Q('Quốc ca thường vang lên khi nào ở trường?', ['Giờ ra chơi', 'Giờ ăn', 'Giờ chào cờ thứ Hai', 'Giờ ngủ trưa'], 2, 'Lễ chào cờ thứ Hai là dịp hát Quốc ca.', ['Sai — không phải giờ ra chơi.', 'Sai — không phải giờ ăn.', 'Đúng — giờ chào cờ thứ Hai.', 'Sai — không phải giờ ngủ trưa.']),
    Q('Khi nghe Quốc ca, em có cười nói không?', ['Có, vừa nghe vừa nói chuyện', 'Chỉ cười nhẹ', 'Tuỳ thích', 'Không, phải trang nghiêm'], 3, 'Nghe Quốc ca cần thái độ nghiêm trang.', ['Sai — không vừa nghe vừa nói chuyện.', 'Sai — không cười dù là cười nhẹ.', 'Sai — không tuỳ thích.', 'Đúng — phải trang nghiêm khi nghe Quốc ca.']),
    Q('Quốc kỳ Việt Nam có màu?', ['Trắng, sao xanh', 'Đỏ, sao vàng', 'Xanh, sao trắng', 'Vàng, sao đỏ'], 1, 'Cờ đỏ sao vàng là Quốc kỳ Việt Nam.', ['Sai — không phải trắng sao xanh.', 'Đúng — cờ đỏ sao vàng.', 'Sai — không phải xanh sao trắng.', 'Sai — không phải vàng sao đỏ.']),
    Q('Tác giả của Quốc ca là?', ['Văn Cao', 'Hoàng Vân', 'Phạm Tuyên', 'Lưu Hữu Phước'], 0, 'Nhạc sĩ Văn Cao là tác giả "Tiến quân ca".', ['Đúng — nhạc sĩ Văn Cao là tác giả.', 'Sai — không phải Hoàng Vân.', 'Sai — không phải Phạm Tuyên.', 'Sai — không phải Lưu Hữu Phước.']),
  ]),

  M(11, 'Bài hát "Lý cây xanh"', [
    Q('"Lý cây xanh" là dân ca?', ['Dân ca quan họ', 'Dân ca Nam Bộ', 'Dân ca Bắc Bộ', 'Dân ca Tây Nguyên'], 1, '"Lý cây xanh" là dân ca Nam Bộ.', ['Sai — không phải dân ca quan họ.', 'Đúng — là dân ca Nam Bộ.', 'Sai — không phải dân ca Bắc Bộ.', 'Sai — không phải dân ca Tây Nguyên.']),
    Q('Bài hát nói về?', ['Mưa to', 'Cây xanh, con chim hót', 'Mẹ ru con', 'Đi học'], 1, 'Bài hát tả cảnh cây xanh có chim hót.', ['Sai — bài không nói mưa to.', 'Đúng — tả cây xanh và chim hót.', 'Sai — bài không phải mẹ ru con.', 'Sai — bài không nói đi học.']),
    Q('Câu mở đầu là "Cái cây xanh xanh thì lá …"?', ['cũng xanh', 'cũng đỏ', 'cũng tím', 'cũng vàng'], 0, '"Cái cây xanh xanh thì lá cũng xanh…"', ['Đúng — "…thì lá cũng xanh…".', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.']),
    Q('Khi hát bài dân ca em nên?', ['Hát mềm mại, rõ lời', 'Hát thì thầm', 'Hát rất nhanh', 'Hát mạnh như hành quân'], 0, 'Dân ca cần giọng mềm mại, tình cảm.', ['Đúng — hát mềm mại, rõ lời.', 'Sai — không hát thì thầm.', 'Sai — không hát rất nhanh.', 'Sai — dân ca không hát mạnh như hành quân.']),
    Q('Cảm xúc bài "Lý cây xanh"?', ['Buồn bã', 'Sợ hãi', 'Trong sáng, vui tươi', 'Giận dữ'], 2, 'Giai điệu trong sáng, dễ thương.', ['Sai — bài không buồn bã.', 'Sai — bài không gợi sợ hãi.', 'Đúng — bài trong sáng, vui tươi.', 'Sai — bài không giận dữ.']),
    Q('Bài "Lý cây xanh" thuộc loại?', ['Nhạc ru con', 'Nhạc cách mạng', 'Bài hát nước ngoài', 'Dân ca Việt Nam'], 3, 'Là dân ca Việt Nam.', ['Sai — không phải nhạc ru con.', 'Sai — không phải nhạc cách mạng.', 'Sai — không phải bài hát nước ngoài.', 'Đúng — là dân ca Việt Nam.']),
  ]),

  M(12, 'Cao và thấp trong âm nhạc', [
    Q('Tiếng chim hót thường là âm?', ['Cao', 'Thấp như tiếng bò rống', 'Trầm như tiếng trống lớn', 'Im lặng'], 0, 'Chim hót có âm cao, véo von.', ['Đúng — chim hót có âm cao, véo von.', 'Sai — chim không hót thấp như bò.', 'Sai — chim không trầm như trống.', 'Sai — chim hót không im lặng.']),
    Q('Tiếng trống lớn thường là âm?', ['Cao véo von', 'Thấp, trầm', 'Vừa, không cao không thấp', 'Rất cao'], 1, 'Trống lớn cho âm thấp, trầm vang.', ['Sai — trống lớn không cao véo von.', 'Đúng — trống lớn cho âm thấp, trầm.', 'Sai — trống lớn không phải âm vừa.', 'Sai — trống lớn không rất cao.']),
    Q('Khi cô đàn nốt thấp, em nghe thấy?', ['Tiếng ồn', 'Âm trầm, dày', 'Âm cao véo von', 'Im lặng'], 1, 'Nốt thấp nghe trầm.', ['Sai — đó không phải tiếng ồn.', 'Đúng — nốt thấp nghe trầm, dày.', 'Sai — đó là âm cao, không phải nốt thấp.', 'Sai — vẫn nghe được âm thanh.']),
    Q('Khi cô đàn nốt cao, em nghe?', ['Âm trầm dày', 'Âm sáng, vút lên', 'Im lặng', 'Tiếng động'], 1, 'Nốt cao nghe sáng và vút lên.', ['Sai — đó là nốt thấp.', 'Đúng — nốt cao nghe sáng, vút lên.', 'Sai — vẫn nghe được âm thanh.', 'Sai — đó không phải tiếng động.']),
    Q('Giọng của bạn nhỏ thường?', ['Bằng người lớn', 'Cao hơn người lớn', 'Thấp hơn người lớn', 'Không có giọng'], 1, 'Giọng bạn nhỏ thường cao và trong.', ['Sai — giọng bạn nhỏ khác người lớn.', 'Đúng — giọng bạn nhỏ cao hơn người lớn.', 'Sai — giọng bạn nhỏ không thấp hơn.', 'Sai — bạn nhỏ vẫn có giọng.']),
    Q('Khi hát em nên?', ['Tự ý đổi độ cao', 'Hát thật cao', 'Hát đúng độ cao cô đàn', 'Hát thật trầm'], 2, 'Hát đúng cao độ là quan trọng.', ['Sai — không tự ý đổi độ cao.', 'Sai — không hát thật cao.', 'Đúng — hát đúng độ cao cô đàn.', 'Sai — không hát thật trầm.']),
  ]),

  M(13, 'Bài hát "Tìm bạn thân"', [
    Q('"Tìm bạn thân" là bài hát của?', ['Phạm Tuyên', 'Văn Cao', 'Trịnh Công Sơn', 'Việt Anh'], 3, 'Bài "Tìm bạn thân" do nhạc sĩ Việt Anh sáng tác.', ['Sai — không phải Phạm Tuyên.', 'Sai — không phải Văn Cao.', 'Sai — không phải Trịnh Công Sơn.', 'Đúng — do nhạc sĩ Việt Anh sáng tác.']),
    Q('Bài hát nói về?', ['Tìm và làm bạn với nhau', 'Đi học một mình', 'Đi chợ', 'Đi xa không trở về'], 0, 'Bài hát mời các bạn cùng tìm bạn thân.', ['Đúng — bài nói về tìm và làm bạn với nhau.', 'Sai — bài không nói đi học một mình.', 'Sai — bài không nói đi chợ.', 'Sai — bài không nói đi xa.']),
    Q('Khi hát em nên?', ['Quay lưng đi', 'Cười tươi, rủ bạn cùng hát', 'Im lặng', 'Hát một mình'], 1, 'Cùng hát với bạn là vui nhất.', ['Sai — không quay lưng đi.', 'Đúng — cười tươi, rủ bạn cùng hát.', 'Sai — không im lặng.', 'Sai — bài này nên hát cùng bạn.']),
    Q('Cảm xúc bài hát?', ['Giận dữ', 'Cô đơn', 'Vui, thân thiện', 'Buồn, nhớ mong'], 2, 'Bài hát ấm áp, thân thiện.', ['Sai — bài không giận dữ.', 'Sai — bài không cô đơn.', 'Đúng — bài vui, thân thiện.', 'Sai — bài không buồn nhớ mong.']),
    Q('Sau khi học bài này em nên?', ['Quan tâm bạn xung quanh', 'Trêu bạn', 'Cô lập bạn', 'Bỏ mặc bạn'], 0, 'Bài hát dạy em quý tình bạn.', ['Đúng — quan tâm bạn xung quanh.', 'Sai — không trêu bạn.', 'Sai — không cô lập bạn.', 'Sai — không bỏ mặc bạn.']),
    Q('Hát có nhịp?', ['Đều, vui', 'Lệch nhịp', 'Rất nhanh', 'Rất chậm'], 0, 'Đều, vui là phù hợp.', ['Đúng — hát đều, vui.', 'Sai — không hát lệch nhịp.', 'Sai — bài này không rất nhanh.', 'Sai — bài này không rất chậm.']),
  ]),

  M(14, 'Nhạc cụ gõ — song loan', [
    Q('Song loan là?', ['Một loại trống điện', 'Một loại sáo', 'Một loại đàn', 'Một nhạc cụ gõ bằng gỗ'], 3, 'Song loan là nhạc cụ gõ truyền thống Việt Nam.', ['Sai — song loan không phải trống điện.', 'Sai — song loan không phải sáo.', 'Sai — song loan không phải đàn.', 'Đúng — song loan là nhạc cụ gõ bằng gỗ.']),
    Q('Cách chơi song loan?', ['Kéo dây', 'Dùng chân hoặc tay gõ', 'Bóp mạnh hai đầu lại', 'Thổi vào lỗ nhỏ'], 1, 'Song loan được gõ bằng chân hoặc tay.', ['Sai — song loan không có dây để kéo.', 'Đúng — dùng chân hoặc tay gõ.', 'Sai — không bóp hai đầu.', 'Sai — song loan không thổi như sáo.']),
    Q('Âm của song loan?', ['Êm như sáo', 'Cao véo von', 'Khô, sắc, gọn', 'Trầm vang'], 2, 'Tiếng song loan khô, sắc — hợp giữ nhịp.', ['Sai — song loan không êm như sáo.', 'Sai — song loan không cao véo von.', 'Đúng — tiếng song loan khô, sắc, gọn.', 'Sai — song loan không trầm vang.']),
    Q('Song loan thường dùng trong?', ['Nhạc EDM', 'Nhạc cổ điển phương Tây', 'Nhạc rock', 'Nhạc cải lương, tuồng'], 3, 'Song loan rất phổ biến trong nhạc cải lương, tuồng.', ['Sai — không dùng trong nhạc EDM.', 'Sai — không dùng trong nhạc cổ điển phương Tây.', 'Sai — không dùng trong nhạc rock.', 'Đúng — dùng trong nhạc cải lương, tuồng.']),
    Q('Song loan thuộc nhóm?', ['Nhạc cụ gõ', 'Nhạc cụ điện', 'Nhạc cụ dây', 'Nhạc cụ hơi'], 0, 'Song loan là nhạc cụ gõ.', ['Đúng — song loan là nhạc cụ gõ.', 'Sai — không phải nhạc cụ điện.', 'Sai — không phải nhạc cụ dây.', 'Sai — không phải nhạc cụ hơi.']),
    Q('Khi gõ song loan em nên?', ['Quăng đi', 'Gõ lung tung', 'Gõ đều theo nhịp', 'Đập thật mạnh'], 2, 'Đều theo nhịp là đúng.', ['Sai — không quăng đi.', 'Sai — không gõ lung tung.', 'Đúng — gõ đều theo nhịp.', 'Sai — không đập thật mạnh.']),
  ]),

  M(15, 'Bài hát "Bắc kim thang"', [
    Q('"Bắc kim thang" là?', ['Nhạc nước ngoài', 'Nhạc cách mạng', 'Nhạc thiếu nhi mới', 'Đồng dao – dân ca Nam Bộ'], 3, '"Bắc kim thang" là đồng dao – dân ca Nam Bộ.', ['Sai — không phải nhạc nước ngoài.', 'Sai — không phải nhạc cách mạng.', 'Sai — không phải nhạc thiếu nhi mới.', 'Đúng — là đồng dao – dân ca Nam Bộ.']),
    Q('Bài hát có nhịp điệu?', ['Vui tươi, dí dỏm', 'Lo lắng', 'Buồn bã', 'Sợ hãi'], 0, 'Giai điệu vui và dí dỏm.', ['Đúng — giai điệu vui tươi, dí dỏm.', 'Sai — bài không lo lắng.', 'Sai — bài không buồn bã.', 'Sai — bài không gợi sợ hãi.']),
    Q('Câu mở đầu là?', ['"Trời mưa lất phất"', '"Cháu lên ba"', '"Mẹ ru con ngủ"', '"Bắc kim thang cà lang bí rợ"'], 3, '"Bắc kim thang cà lang bí rợ…"', ['Sai — lời hát không phải vậy.', 'Sai — đó là bài khác.', 'Sai — lời hát không phải vậy.', 'Đúng — "Bắc kim thang cà lang bí rợ…".']),
    Q('Khi hát em có thể?', ['Quay lưng', 'Bỏ ra ngoài', 'Vừa hát vừa vỗ tay/làm động tác', 'Ngồi im'], 2, 'Vừa hát vừa làm động tác cho vui.', ['Sai — không quay lưng.', 'Sai — không bỏ ra ngoài.', 'Đúng — vừa hát vừa vỗ tay/làm động tác.', 'Sai — bài này nên có động tác.']),
    Q('Bài này phù hợp tốc độ?', ['Đứng yên', 'Chậm rất chậm', 'Vui, vừa phải', 'Nhanh líu lưỡi'], 2, 'Vừa phải để rõ lời.', ['Sai — hát không đứng yên về tốc độ.', 'Sai — không chậm rất chậm.', 'Đúng — vui, vừa phải.', 'Sai — không nhanh líu lưỡi.']),
    Q('Hát bài này em nên?', ['Mỉm cười, hát rõ lời', 'Im lặng', 'Buồn rầu', 'Hát thì thầm'], 0, 'Mỉm cười giúp giọng vui hơn.', ['Đúng — mỉm cười, hát rõ lời.', 'Sai — phải cùng hát.', 'Sai — bài này vui, không buồn rầu.', 'Sai — không hát thì thầm.']),
  ]),

  M(16, 'Ôn tập: hát + gõ phách', [
    Q('Hát kết hợp gõ phách giúp em?', ['Giữ nhịp đều, hát hay hơn', 'Hát lệch', 'Hát nhanh hơn', 'Hát to hơn'], 0, 'Gõ phách giúp giữ nhịp đều.', ['Đúng — giữ nhịp đều, hát hay hơn.', 'Sai — gõ phách giúp khỏi hát lệch.', 'Sai — không để hát nhanh hơn.', 'Sai — không để hát to hơn.']),
    Q('Bài "Quê hương tươi đẹp" là dân ca?', ['Dân ca Kinh đồng bằng Bắc Bộ', 'Dân ca Thái Tây Bắc', 'Dân ca Mường Hòa Bình', 'Nùng'], 3, 'Dân ca Nùng.', ['Sai — không phải dân ca Kinh.', 'Sai — không phải dân ca Thái.', 'Sai — không phải dân ca Mường.', 'Đúng — là dân ca Nùng.']),
    Q('"Cháu lên ba" của nhạc sĩ?', ['Hoàng Vân', 'Văn Cao', 'Trịnh Công Sơn', 'Phạm Tuyên'], 3, 'Phạm Tuyên.', ['Sai — không phải Hoàng Vân.', 'Sai — không phải Văn Cao.', 'Sai — không phải Trịnh Công Sơn.', 'Đúng — của nhạc sĩ Phạm Tuyên.']),
    Q('"Lý cây xanh" là dân ca?', ['Nam Bộ', 'Tây Nguyên', 'Bắc Bộ', 'Quan họ'], 0, 'Dân ca Nam Bộ.', ['Đúng — là dân ca Nam Bộ.', 'Sai — không phải Tây Nguyên.', 'Sai — không phải Bắc Bộ.', 'Sai — không phải quan họ.']),
    Q('Khi hát em nên?', ['Hát thật to', 'Hét lên', 'Tuỳ ý sai cũng được', 'Đúng cao độ, đúng nhịp'], 3, 'Đúng cao độ, đúng nhịp là tốt.', ['Sai — không hát thật to.', 'Sai — không hét lên.', 'Sai — không hát tuỳ ý sai.', 'Đúng — hát đúng cao độ, đúng nhịp.']),
    Q('Bạn nào hát ngoan?', ['Bạn Lan đều nhịp, rõ lời', 'Bạn Bình quay lưng', 'Bạn Hà la hét', 'Bạn Tú át tiếng bạn'], 0, 'Đều nhịp, rõ lời là hát đẹp.', ['Đúng — bạn Lan đều nhịp, rõ lời.', 'Sai — bạn Bình quay lưng là chưa ngoan.', 'Sai — bạn Hà la hét là chưa ngoan.', 'Sai — bạn Tú át tiếng bạn là chưa ngoan.']),
  ]),

  M(17, 'Ôn tập HK1 — kể tên bài đã học', [
    Q('Bài hát nói về quê hương em đã học?', ['Bắc kim thang', 'Cháu lên ba', 'Cùng quây quần', 'Quê hương tươi đẹp'], 3, '"Quê hương tươi đẹp" là bài về quê hương.', ['Sai — "Bắc kim thang" là đồng dao.', 'Sai — "Cháu lên ba" về bé đi mẫu giáo.', 'Sai — "Cùng quây quần" về ca hát cùng nhau.', 'Đúng — "Quê hương tươi đẹp" về quê hương.']),
    Q('Bài hát về bé 3 tuổi đi mẫu giáo?', ['Cháu lên ba', 'Quê hương tươi đẹp', 'Bắc kim thang', 'Lý cây xanh'], 0, '"Cháu lên ba".', ['Đúng — "Cháu lên ba" về bé đi mẫu giáo.', 'Sai — "Quê hương tươi đẹp" về quê hương.', 'Sai — "Bắc kim thang" là đồng dao.', 'Sai — "Lý cây xanh" về cây và chim.']),
    Q('Bài dân ca Nam Bộ về cây và chim?', ['Lý cây xanh', 'Cháu lên ba', 'Cùng quây quần', 'Quê hương tươi đẹp'], 0, '"Lý cây xanh".', ['Đúng — "Lý cây xanh" về cây và chim.', 'Sai — "Cháu lên ba" về bé đi mẫu giáo.', 'Sai — "Cùng quây quần" về ca hát cùng nhau.', 'Sai — "Quê hương tươi đẹp" về quê hương.']),
    Q('Đồng dao – dân ca Nam Bộ là?', ['Cháu lên ba', 'Quê hương tươi đẹp', 'Bắc kim thang', 'Lý cây xanh'], 2, '"Bắc kim thang".', ['Sai — "Cháu lên ba" do Phạm Tuyên.', 'Sai — "Quê hương tươi đẹp" là dân ca Nùng.', 'Đúng — "Bắc kim thang" là đồng dao Nam Bộ.', 'Sai — "Lý cây xanh" là dân ca Nam Bộ nhưng không phải đồng dao.']),
    Q('Nhạc cụ gõ làm bằng hai thanh gỗ?', ['Thanh phách', 'Đàn nhị', 'Sáo trúc thổi hơi', 'Trống lớn'], 0, 'Thanh phách.', ['Đúng — thanh phách làm bằng hai thanh gỗ.', 'Sai — đàn nhị là nhạc cụ dây.', 'Sai — sáo trúc là nhạc cụ hơi.', 'Sai — trống lớn có mặt da.']),
    Q('Quốc ca Việt Nam tên là?', ['Tiến quân ca', 'Hành quân xa', 'Diệt phát xít', 'Lên đàng'], 0, '"Tiến quân ca".', ['Đúng — Quốc ca là "Tiến quân ca".', 'Sai — không phải "Hành quân xa".', 'Sai — không phải "Diệt phát xít".', 'Sai — không phải "Lên đàng".']),
  ]),

  M(18, 'Kiểm tra cuối HK1', [
    Q('Hát Quốc ca em phải?', ['Cười đùa', 'Đứng nghiêm trang', 'Ngồi tự do', 'Nằm xuống'], 1, 'Tư thế nghiêm trang.', ['Sai — không cười đùa khi hát Quốc ca.', 'Đúng — đứng nghiêm trang.', 'Sai — không ngồi tự do.', 'Sai — không nằm xuống.']),
    Q('Vỗ tay theo phách giúp?', ['Hát đúng nhịp', 'Hát lệch', 'Hát nhanh', 'Hát to hơn'], 0, 'Giữ nhịp đều.', ['Đúng — vỗ phách giúp hát đúng nhịp.', 'Sai — vỗ phách giúp khỏi hát lệch.', 'Sai — không để hát nhanh.', 'Sai — không để hát to hơn.']),
    Q('Thanh phách thuộc nhóm?', ['Nhạc cụ điện', 'Nhạc cụ gõ', 'Nhạc cụ dây', 'Nhạc cụ hơi'], 1, 'Nhạc cụ gõ.', ['Sai — không phải nhạc cụ điện.', 'Đúng — thanh phách là nhạc cụ gõ.', 'Sai — không phải nhạc cụ dây.', 'Sai — không phải nhạc cụ hơi.']),
    Q('Tiếng chim hót là âm?', ['Trầm như trống lớn', 'Cao', 'Thấp như tiếng bò', 'Im lặng'], 1, 'Âm cao véo von.', ['Sai — chim không trầm như trống.', 'Đúng — tiếng chim hót là âm cao.', 'Sai — chim không thấp như bò.', 'Sai — chim hót không im lặng.']),
    Q('Bài hát ru em bé thường?', ['Nhanh sôi nổi', 'Chậm, êm dịu', 'To như trống', 'Rất nhanh'], 1, 'Chậm và êm để bé ngủ.', ['Sai — hát ru không nhanh sôi nổi.', 'Đúng — hát ru chậm, êm dịu.', 'Sai — hát ru không to như trống.', 'Sai — hát ru không rất nhanh.']),
    Q('Khi hát tập thể em nên?', ['Át tiếng bạn', 'Hoà giọng cùng bạn', 'Im lặng', 'Hát sai cố tình'], 1, 'Hoà giọng để cả lớp hát đẹp.', ['Sai — không át tiếng bạn.', 'Đúng — hoà giọng cùng bạn.', 'Sai — phải cùng hát, không im lặng.', 'Sai — không hát sai cố tình.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Bài hát "Sắp đến Tết rồi"', [
    Q('"Sắp đến Tết rồi" của nhạc sĩ?', ['Văn Cao', 'Hoàng Vân', 'Phạm Tuyên', 'Trịnh Công Sơn'], 1, 'Nhạc sĩ Hoàng Vân sáng tác bài này.', ['Sai — không phải Văn Cao.', 'Đúng — nhạc sĩ Hoàng Vân sáng tác.', 'Sai — không phải Phạm Tuyên.', 'Sai — không phải Trịnh Công Sơn.']),
    Q('Bài hát nói về?', ['Niềm vui sắp đến Tết', 'Đi ngủ', 'Mưa to', 'Đi học'], 0, 'Bé háo hức vì sắp được đón Tết.', ['Đúng — niềm vui sắp đến Tết.', 'Sai — bài không nói đi ngủ.', 'Sai — bài không nói mưa to.', 'Sai — bài không nói đi học.']),
    Q('Cảm xúc bài hát?', ['Buồn, thương nhớ', 'Rộn ràng, vui tươi', 'Giận dữ', 'Sợ hãi'], 1, 'Rộn ràng đón Tết.', ['Sai — bài không buồn thương nhớ.', 'Đúng — rộn ràng, vui tươi.', 'Sai — bài không giận dữ.', 'Sai — bài không gợi sợ hãi.']),
    Q('Câu mở đầu là "Sắp đến Tết rồi …"?', ['đến trường rất vui', 'đến trường buồn quá', 'đến trường thật xa', 'đến trường nhớ mẹ'], 0, '"Sắp đến Tết rồi, đến trường rất vui…"', ['Đúng — "…đến trường rất vui…".', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.']),
    Q('Khi Tết đến em được?', ['Buồn rầu', 'Ở một mình', 'Mặc áo mới, chúc Tết ông bà', 'Đi học bình thường'], 2, 'Tết là dịp đoàn viên, mặc áo mới.', ['Sai — Tết không buồn rầu.', 'Sai — Tết là dịp sum vầy, không ở một mình.', 'Đúng — mặc áo mới, chúc Tết ông bà.', 'Sai — Tết là dịp nghỉ, không đi học.']),
    Q('Khi hát bài này em nên?', ['Buồn rầu', 'Tươi cười, rộn ràng', 'Im lặng', 'Quay lưng'], 1, 'Tươi cười cho hợp không khí Tết.', ['Sai — bài vui không buồn rầu.', 'Đúng — tươi cười, rộn ràng.', 'Sai — phải cùng hát.', 'Sai — không quay lưng.']),
  ]),

  M(20, 'Bài hát "Cả nhà thương nhau"', [
    Q('"Cả nhà thương nhau" của nhạc sĩ?', ['Phan Văn Minh', 'Văn Cao', 'Hoàng Vân', 'Phạm Tuyên'], 0, 'Nhạc sĩ Phan Văn Minh sáng tác bài này.', ['Đúng — nhạc sĩ Phan Văn Minh sáng tác.', 'Sai — không phải Văn Cao.', 'Sai — không phải Hoàng Vân.', 'Sai — không phải Phạm Tuyên.']),
    Q('Bài hát nói về?', ['Đi học', 'Đi chợ', 'Tình yêu thương trong gia đình', 'Cơn mưa rào ngoài sân'], 2, 'Tình yêu thương bố – mẹ – con.', ['Sai — bài không nói đi học.', 'Sai — bài không nói đi chợ.', 'Đúng — tình yêu thương trong gia đình.', 'Sai — bài không nói cơn mưa.']),
    Q('Câu mở đầu là "Ba thương con vì con …"?', ['giống ba', 'giống ông', 'giống cô', 'giống mẹ'], 3, '"Ba thương con vì con giống mẹ…"', ['Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Đúng — "Ba thương con vì con giống mẹ…".']),
    Q('Cảm xúc bài hát?', ['Ấm áp, yêu thương', 'Buồn, cô đơn một mình', 'Sợ hãi', 'Giận dữ'], 0, 'Ấm áp, yêu thương.', ['Đúng — ấm áp, yêu thương.', 'Sai — bài không buồn cô đơn.', 'Sai — bài không gợi sợ hãi.', 'Sai — bài không giận dữ.']),
    Q('Khi hát bài này em nên nghĩ về?', ['Đồ chơi mới', 'Bài kiểm tra', 'Trò chơi điện tử', 'Bố mẹ, người thân'], 3, 'Nghĩ về bố mẹ giúp hát truyền cảm.', ['Sai — không phải nghĩ về đồ chơi.', 'Sai — không phải nghĩ về bài kiểm tra.', 'Sai — không phải nghĩ về trò chơi điện tử.', 'Đúng — nghĩ về bố mẹ, người thân.']),
    Q('Bài hát phù hợp tốc độ?', ['Đứng yên', 'Rất nhanh', 'Vừa, êm, ấm áp', 'Líu lưỡi'], 2, 'Vừa và êm để truyền cảm xúc.', ['Sai — hát không đứng yên về tốc độ.', 'Sai — bài này không rất nhanh.', 'Đúng — vừa, êm, ấm áp.', 'Sai — không hát líu lưỡi.']),
  ]),

  M(21, 'Đếm phách 1 – 2', [
    Q('Bài hát nhịp 2/4 em đếm như thế nào?', ['1 – 2, 1 – 2…', '1 – 2 – 3', 'Đếm 1 – 2 – 3 – 4 – 5', '1 – 2 – 3 – 4'], 0, 'Nhịp 2/4 đếm 1 – 2 đều nhau.', ['Đúng — nhịp 2/4 đếm 1 – 2, 1 – 2…', 'Sai — 1 – 2 – 3 là nhịp 3/4.', 'Sai — không đếm tới 5.', 'Sai — 1 – 2 – 3 – 4 là nhịp 4/4.']),
    Q('Phách 1 là phách?', ['Im lặng', 'Cao nhất', 'Mạnh', 'Nhẹ, lướt qua'], 2, 'Phách 1 thường là phách mạnh.', ['Sai — phách 1 không im lặng.', 'Sai — phách không nói về cao thấp.', 'Đúng — phách 1 là phách mạnh.', 'Sai — phách 1 không nhẹ.']),
    Q('Phách 2 là phách?', ['Cao nhất', 'Trầm nhất', 'Nhẹ', 'Mạnh hơn phách 1'], 2, 'Phách 2 thường nhẹ hơn phách 1.', ['Sai — phách không nói về cao thấp.', 'Sai — phách không nói về trầm.', 'Đúng — phách 2 là phách nhẹ.', 'Sai — phách 2 không mạnh hơn phách 1.']),
    Q('Khi vỗ tay theo nhịp 2/4 em vỗ?', ['Đều mỗi phách', 'Không vỗ', 'Chỉ vỗ một lần', 'Lung tung'], 0, 'Đều mỗi phách giúp giữ nhịp.', ['Đúng — vỗ đều mỗi phách.', 'Sai — phải vỗ.', 'Sai — không chỉ vỗ một lần.', 'Sai — không vỗ lung tung.']),
    Q('Khi cô đếm "1 – 2", em hát?', ['Hát sau cô 1 phút', 'Vào nhịp, đều theo cô', 'Không hát', 'Hát ngược'], 1, 'Vào nhịp theo cô là đúng.', ['Sai — không hát chậm sau cô.', 'Đúng — vào nhịp, đều theo cô.', 'Sai — phải hát.', 'Sai — không hát ngược.']),
    Q('Đếm phách giúp em?', ['Hát đều, không sai nhịp', 'Hát to hơn', 'Hát nhanh hơn', 'Hát chậm'], 0, 'Giữ nhịp đều.', ['Đúng — hát đều, không sai nhịp.', 'Sai — không để hát to hơn.', 'Sai — không để hát nhanh hơn.', 'Sai — không để hát chậm.']),
  ]),

  M(22, 'Tết — bài hát "Sắp đến Tết rồi" (ôn)', [
    Q('Tết là dịp em đoàn viên với?', ['Bạn xa lạ', 'Người lạ', 'Một mình', 'Gia đình, người thân'], 3, 'Tết là dịp gia đình quây quần.', ['Sai — không phải bạn xa lạ.', 'Sai — không phải người lạ.', 'Sai — Tết là sum vầy, không một mình.', 'Đúng — đoàn viên với gia đình, người thân.']),
    Q('Bài "Sắp đến Tết rồi" do nhạc sĩ?', ['Trịnh Công Sơn', 'Văn Cao', 'Hoàng Vân', 'Phạm Tuyên'], 2, 'Hoàng Vân.', ['Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Văn Cao.', 'Đúng — của nhạc sĩ Hoàng Vân.', 'Sai — không phải Phạm Tuyên.']),
    Q('Cảm xúc của bài?', ['Rộn ràng, vui tươi', 'Lo lắng', 'Buồn, nhớ năm cũ', 'Giận dữ'], 0, 'Rộn ràng đón Tết.', ['Đúng — rộn ràng, vui tươi.', 'Sai — bài không lo lắng.', 'Sai — bài không buồn nhớ năm cũ.', 'Sai — bài không giận dữ.']),
    Q('Tết, em có thể hát tặng?', ['Tự mình thôi', 'Ông bà, cha mẹ', 'Hát qua loa cho hàng xóm', 'Không ai cả'], 1, 'Hát tặng ông bà cha mẹ là món quà ý nghĩa.', ['Sai — hát tặng người thân ý nghĩa hơn.', 'Đúng — hát tặng ông bà, cha mẹ.', 'Sai — không hát qua loa.', 'Sai — có thể hát tặng người thân.']),
    Q('Khi đi chúc Tết em nên?', ['Đòi lì xì luôn', 'Lễ phép, vui vẻ', 'Im lặng quay đi', 'Cãi người lớn'], 1, 'Lễ phép là biểu hiện đẹp ngày Tết.', ['Sai — không đòi lì xì.', 'Đúng — lễ phép, vui vẻ.', 'Sai — không im lặng quay đi.', 'Sai — không cãi người lớn.']),
    Q('Hoa đào nở vào dịp nào?', ['Trung thu', 'Mùa hè', 'Mùa thu', 'Tết Nguyên đán'], 3, 'Hoa đào báo hiệu Tết.', ['Sai — hoa đào không nở dịp Trung thu.', 'Sai — hoa đào không nở mùa hè.', 'Sai — hoa đào không nở mùa thu.', 'Đúng — hoa đào nở vào Tết Nguyên đán.']),
  ]),

  M(23, 'Bài hát "Quả"', [
    Q('Bài hát "Quả" do nhạc sĩ?', ['Văn Cao', 'Phạm Tuyên', 'Trịnh Công Sơn', 'Xanh Xanh'], 1, 'Bài "Quả" của nhạc sĩ Phạm Tuyên (Phạm Tuyên có nhiều bài cho thiếu nhi).', ['Sai — không phải Văn Cao.', 'Đúng — bài "Quả" của nhạc sĩ Phạm Tuyên.', 'Sai — không phải Trịnh Công Sơn.', 'Sai — không phải tên nhạc sĩ này.']),
    Q('Bài "Quả" hỏi về?', ['Các loại quả như khế, trứng…', 'Mẹ ru con ngủ trên võng', 'Cơn mưa rào mùa hạ', 'Bài học toán'], 0, 'Bài hát hỏi đáp về các loại quả.', ['Đúng — hỏi đáp về các loại quả như khế, trứng.', 'Sai — bài không nói mẹ ru con.', 'Sai — bài không nói cơn mưa.', 'Sai — bài không nói bài học toán.']),
    Q('Khi hát bài này em có thể?', ['Bỏ ra ngoài', 'Hỏi đáp cùng bạn', 'Quay lưng', 'Im lặng'], 1, 'Hỏi đáp cùng bạn cho vui.', ['Sai — không bỏ ra ngoài.', 'Đúng — hỏi đáp cùng bạn.', 'Sai — không quay lưng.', 'Sai — phải cùng hát.']),
    Q('Quả khế khi cắt ra có dạng?', ['Hình tam giác', 'Hình tròn đặc', 'Hình vuông', 'Hình ngôi sao'], 3, 'Quả khế cắt ngang có hình ngôi sao 5 cánh.', ['Sai — không phải hình tam giác.', 'Sai — không phải hình tròn đặc.', 'Sai — không phải hình vuông.', 'Đúng — quả khế cắt ngang có hình ngôi sao.']),
    Q('Cảm xúc bài hát?', ['Buồn, nhớ bạn cũ', 'Giận dữ', 'Sợ hãi', 'Vui, hồn nhiên'], 3, 'Vui và hồn nhiên.', ['Sai — bài không buồn nhớ bạn.', 'Sai — bài không giận dữ.', 'Sai — bài không gợi sợ hãi.', 'Đúng — vui và hồn nhiên.']),
    Q('Khi hát hỏi đáp, em nên?', ['La hét', 'Im lặng', 'Đáp lung tung', 'Lắng nghe và đáp đúng nhịp'], 3, 'Lắng nghe và đáp đúng nhịp là đúng.', ['Sai — không la hét.', 'Sai — phải đáp lời.', 'Sai — không đáp lung tung.', 'Đúng — lắng nghe và đáp đúng nhịp.']),
  ]),

  M(24, 'Nhịp 2/4 — vỗ tay theo nhịp mạnh và nhẹ', [
    Q('Trong nhịp 2/4, phách mạnh là phách?', ['4', '2', '1', '3'], 2, 'Phách 1 là phách mạnh.', ['Sai — nhịp 2/4 không có phách 4.', 'Sai — phách 2 là phách nhẹ.', 'Đúng — phách 1 là phách mạnh.', 'Sai — nhịp 2/4 không có phách 3.']),
    Q('Phách nhẹ là phách?', ['2', '1', '4', '3'], 0, 'Phách 2 là phách nhẹ.', ['Đúng — phách 2 là phách nhẹ.', 'Sai — phách 1 là phách mạnh.', 'Sai — nhịp 2/4 không có phách 4.', 'Sai — nhịp 2/4 không có phách 3.']),
    Q('Vỗ tay theo nhịp mạnh – nhẹ giúp em?', ['Hát nhanh hơn', 'Cảm nhận tiết tấu', 'Hát to hơn', 'Át tiếng bạn'], 1, 'Giúp em cảm nhận tiết tấu bài hát.', ['Sai — không để hát nhanh hơn.', 'Đúng — giúp cảm nhận tiết tấu.', 'Sai — không để hát to hơn.', 'Sai — không phải để át tiếng bạn.']),
    Q('Khi vỗ phách mạnh, em vỗ?', ['Không vỗ', 'Yếu hơn', 'Vỗ nhanh hơn', 'Mạnh hơn một chút'], 3, 'Mạnh hơn để nổi bật phách mạnh.', ['Sai — phách mạnh phải vỗ.', 'Sai — phách mạnh không vỗ yếu.', 'Sai — không phải vỗ nhanh hơn.', 'Đúng — vỗ mạnh hơn một chút.']),
    Q('Khi vỗ phách nhẹ, em vỗ?', ['Không vỗ', 'Mạnh hơn', 'Nhẹ hơn', 'Vỗ rất chậm'], 2, 'Nhẹ để phân biệt với phách mạnh.', ['Sai — phách nhẹ vẫn vỗ.', 'Sai — phách nhẹ không vỗ mạnh hơn.', 'Đúng — vỗ nhẹ hơn.', 'Sai — không phải vỗ rất chậm.']),
    Q('Cô đếm "1 – 2 – 1 – 2…", nhịp này là?', ['Nhịp 4/4', 'Nhịp đếm tự do không đều', 'Nhịp 2/4', 'Nhịp 3/4'], 2, 'Đếm 1 – 2 là nhịp 2/4.', ['Sai — 4/4 đếm tới 4.', 'Sai — đây là nhịp đều.', 'Đúng — đếm 1 – 2 là nhịp 2/4.', 'Sai — 3/4 đếm tới 3.']),
  ]),

  M(25, 'Bài hát "Đi học về"', [
    Q('Bài "Đi học về" của nhạc sĩ?', ['Trịnh Công Sơn', 'Phạm Tuyên', 'Hoàng Long – Hoàng Lân', 'Văn Cao'], 2, 'Hai anh em nhạc sĩ Hoàng Long – Hoàng Lân.', ['Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Phạm Tuyên.', 'Đúng — của nhạc sĩ Hoàng Long – Hoàng Lân.', 'Sai — không phải Văn Cao.']),
    Q('Bài hát nói về?', ['Bé đi ngủ', 'Bé đi chơi', 'Bé đi chợ', 'Bé đi học về chào bố mẹ'], 3, 'Bài hát kể chuyện bé đi học về.', ['Sai — bài không nói bé đi ngủ.', 'Sai — bài không nói bé đi chơi.', 'Sai — bài không nói bé đi chợ.', 'Đúng — bé đi học về chào bố mẹ.']),
    Q('Câu mở đầu là "Đi học về là …"?', ['là đi ngủ', 'là ăn cơm', 'là đi chơi', 'đi học về'], 3, '"Đi học về là đi học về…"', ['Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.', 'Đúng — "Đi học về là đi học về…".']),
    Q('Bài hát dạy em?', ['Chào hỏi bố mẹ khi về nhà', 'Cãi mẹ', 'Vứt cặp rồi chơi', 'Bỏ ra ngoài'], 0, 'Đi học về phải chào hỏi bố mẹ.', ['Đúng — chào hỏi bố mẹ khi về nhà.', 'Sai — không cãi mẹ.', 'Sai — không vứt cặp rồi chơi.', 'Sai — không bỏ ra ngoài.']),
    Q('Cảm xúc bài hát?', ['Giận dữ', 'Buồn, lẻ loi', 'Sợ hãi', 'Vui, ấm áp'], 3, 'Vui và ấm áp.', ['Sai — bài không giận dữ.', 'Sai — bài không buồn lẻ loi.', 'Sai — bài không gợi sợ hãi.', 'Đúng — vui và ấm áp.']),
    Q('Khi hát bài này em nên?', ['Quay lưng', 'La hét', 'Cười tươi, hát rõ lời', 'Im lặng'], 2, 'Cười tươi để giọng hát ấm.', ['Sai — không quay lưng.', 'Sai — không la hét.', 'Đúng — cười tươi, hát rõ lời.', 'Sai — phải cùng hát.']),
  ]),

  M(26, 'Nốt đen và nốt trắng (làm quen)', [
    Q('Nốt đen kéo dài?', ['3 phách', '1 phách', '2 phách', '4 phách'], 1, 'Nốt đen có giá trị 1 phách.', ['Sai — nốt đen không phải 3 phách.', 'Đúng — nốt đen kéo dài 1 phách.', 'Sai — 2 phách là nốt trắng.', 'Sai — nốt đen không phải 4 phách.']),
    Q('Nốt trắng kéo dài?', ['3 phách', '1 phách', '4 phách', '2 phách'], 3, 'Nốt trắng có giá trị 2 phách.', ['Sai — nốt trắng không phải 3 phách.', 'Sai — 1 phách là nốt đen.', 'Sai — nốt trắng không phải 4 phách.', 'Đúng — nốt trắng kéo dài 2 phách.']),
    Q('Nốt đen có hình?', ['Tròn rỗng', 'Đầu đen, có đuôi', 'Đầu trắng, có đuôi', 'Hình vuông có đuôi'], 1, 'Nốt đen có đầu tô đen.', ['Sai — đầu nốt đen được tô đen.', 'Đúng — nốt đen có đầu đen, có đuôi.', 'Sai — đầu trắng là nốt trắng.', 'Sai — nốt nhạc không có đầu vuông.']),
    Q('Nốt trắng có hình?', ['Hình vuông rỗng giữa', 'Đầu trắng (rỗng), có đuôi', 'Tam giác', 'Đầu đen có đuôi'], 1, 'Nốt trắng có đầu rỗng.', ['Sai — nốt nhạc không có đầu vuông.', 'Đúng — nốt trắng có đầu trắng (rỗng), có đuôi.', 'Sai — nốt nhạc không có đầu tam giác.', 'Sai — đầu đen là nốt đen.']),
    Q('Khi gặp nốt trắng em ngân?', ['Không ngân', 'Ngắn hơn nốt đen', 'Lâu hơn nốt đen', 'Bằng nốt đen'], 2, 'Nốt trắng dài bằng 2 nốt đen.', ['Sai — nốt trắng vẫn ngân.', 'Sai — nốt trắng dài hơn nốt đen.', 'Đúng — nốt trắng ngân lâu hơn nốt đen.', 'Sai — nốt trắng dài gấp đôi nốt đen.']),
    Q('Hai nốt đen liền nhau bằng?', ['Một nốt trắng', 'Một nốt tròn', 'Một nốt đen', 'Im lặng'], 0, 'Hai nốt đen = một nốt trắng (cùng 2 phách).', ['Đúng — hai nốt đen bằng một nốt trắng.', 'Sai — nốt tròn dài 4 phách.', 'Sai — một nốt đen chỉ 1 phách.', 'Sai — hai nốt đen vẫn có âm.']),
  ]),

  M(27, 'Bài hát "Đàn gà con"', [
    Q('Bài "Đàn gà con" có lời Việt do?', ['Trịnh Công Sơn', 'Văn Cao', 'Phạm Tuyên đặt lời', 'Việt Anh đặt lời'], 3, 'Lời Việt Anh dựa trên nhạc nước ngoài (Filippenko).', ['Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Văn Cao.', 'Sai — không phải Phạm Tuyên.', 'Đúng — lời Việt do Việt Anh đặt.']),
    Q('Bài hát nói về?', ['Đàn chim', 'Đàn gà con và mẹ gà', 'Đàn cừu', 'Đàn cá'], 1, 'Đàn gà con vui đùa cùng mẹ gà.', ['Sai — bài không nói đàn chim.', 'Đúng — đàn gà con và mẹ gà.', 'Sai — bài không nói đàn cừu.', 'Sai — bài không nói đàn cá.']),
    Q('Tiếng kêu của gà con?', ['Gâu gâu', 'Chiếp chiếp', 'Ò ó o (tiếng gà trống)', 'Meo meo'], 1, 'Gà con kêu "chiếp chiếp".', ['Sai — "gâu gâu" là tiếng chó.', 'Đúng — gà con kêu "chiếp chiếp".', 'Sai — "ò ó o" là tiếng gà trống.', 'Sai — "meo meo" là tiếng mèo.']),
    Q('Khi hát em có thể làm động tác?', ['Bỏ ra ngoài', 'Đứng yên', 'Mô phỏng gà con kêu', 'Quay lưng'], 2, 'Mô phỏng động tác gà con cho vui.', ['Sai — không bỏ ra ngoài.', 'Sai — bài này nên có động tác.', 'Đúng — mô phỏng gà con kêu.', 'Sai — không quay lưng.']),
    Q('Cảm xúc bài hát?', ['Giận dữ', 'Sợ hãi', 'Buồn, nhớ bạn xa', 'Vui, ngộ nghĩnh'], 3, 'Vui và ngộ nghĩnh.', ['Sai — bài không giận dữ.', 'Sai — bài không gợi sợ hãi.', 'Sai — bài không buồn nhớ bạn.', 'Đúng — vui và ngộ nghĩnh.']),
    Q('Bài hát có nhịp?', ['Rất chậm', 'Lệch nhịp', 'Đều, vừa phải', 'Rất nhanh líu lưỡi'], 2, 'Nhịp đều, vừa phải.', ['Sai — bài này không rất chậm.', 'Sai — không hát lệch nhịp.', 'Đúng — nhịp đều, vừa phải.', 'Sai — không nhanh líu lưỡi.']),
  ]),

  M(28, 'Bài hát "Chú voi con ở Bản Đôn"', [
    Q('"Chú voi con ở Bản Đôn" của nhạc sĩ?', ['Hoàng Vân', 'Phạm Tuyên', 'Văn Cao', 'Trịnh Công Sơn'], 1, 'Nhạc sĩ Phạm Tuyên sáng tác bài này.', ['Sai — không phải Hoàng Vân.', 'Đúng — nhạc sĩ Phạm Tuyên sáng tác.', 'Sai — không phải Văn Cao.', 'Sai — không phải Trịnh Công Sơn.']),
    Q('Bài hát kể về?', ['Chú cá con', 'Chú voi con ở Bản Đôn (Tây Nguyên)', 'Chú mèo con', 'Chú chim con'], 1, 'Chú voi con vùng Tây Nguyên.', ['Sai — bài không kể chú cá con.', 'Đúng — chú voi con ở Bản Đôn (Tây Nguyên).', 'Sai — bài không kể chú mèo con.', 'Sai — bài không kể chú chim con.']),
    Q('Bản Đôn ở đâu?', ['Đà Nẵng', 'Tây Nguyên', 'TP.HCM', 'Hà Nội'], 1, 'Bản Đôn thuộc Đắk Lắk – Tây Nguyên.', ['Sai — Bản Đôn không ở Đà Nẵng.', 'Đúng — Bản Đôn ở Tây Nguyên.', 'Sai — Bản Đôn không ở TP.HCM.', 'Sai — Bản Đôn không ở Hà Nội.']),
    Q('Câu mở đầu là "Chú voi con ở Bản Đôn …"?', ['chưa có ngà', 'đang đói', 'đã có ngà', 'rất to'], 0, '"Chú voi con ở Bản Đôn, chưa có ngà nên còn trẻ con…"', ['Đúng — "…chưa có ngà nên còn trẻ con…".', 'Sai — lời hát không phải vậy.', 'Sai — lời hát là "chưa có ngà".', 'Sai — lời hát không phải vậy.']),
    Q('Khi hát em nên?', ['Sợ hãi', 'Vui, ngộ nghĩnh', 'Buồn rầu', 'Im lặng'], 1, 'Vui, ngộ nghĩnh phù hợp bài hát.', ['Sai — bài không gợi sợ hãi.', 'Đúng — hát vui, ngộ nghĩnh.', 'Sai — bài không buồn rầu.', 'Sai — phải cùng hát.']),
    Q('Bài hát có cảm xúc?', ['Ghét voi', 'Sợ voi', 'Yêu mến chú voi', 'Không có cảm xúc'], 2, 'Bài hát thể hiện sự yêu mến voi.', ['Sai — bài không ghét voi.', 'Sai — bài không sợ voi.', 'Đúng — bài yêu mến chú voi.', 'Sai — bài có cảm xúc yêu mến.']),
  ]),

  M(29, 'Bài hát "Múa vui"', [
    Q('"Múa vui" của nhạc sĩ?', ['Lưu Hữu Phước', 'Trịnh Công Sơn', 'Văn Cao', 'Phạm Tuyên'], 0, 'Nhạc sĩ Lưu Hữu Phước sáng tác bài này.', ['Đúng — nhạc sĩ Lưu Hữu Phước sáng tác.', 'Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Văn Cao.', 'Sai — không phải Phạm Tuyên.']),
    Q('Bài hát mời các bạn?', ['Cầm tay nhau múa hát', 'Đi ngủ', 'Đi chợ', 'Đi học bài'], 0, 'Bài hát mời các bạn cầm tay múa hát.', ['Đúng — cầm tay nhau múa hát.', 'Sai — bài không mời đi ngủ.', 'Sai — bài không mời đi chợ.', 'Sai — bài không mời đi học bài.']),
    Q('Câu mở đầu "Cùng nhau múa …"?', ['xung quanh vòng', 'một mình', 'thật buồn', 'rồi đi ngủ'], 0, '"Cùng nhau múa xung quanh vòng…"', ['Đúng — "Cùng nhau múa xung quanh vòng…".', 'Sai — lời hát là cùng nhau, không một mình.', 'Sai — lời hát không phải vậy.', 'Sai — lời hát không phải vậy.']),
    Q('Khi múa em nên?', ['Cùng làm động tác với bạn', 'Tự ý lung tung', 'Đứng yên', 'Bỏ ra ngoài'], 0, 'Múa đều cùng bạn mới đẹp.', ['Đúng — cùng làm động tác với bạn.', 'Sai — không múa tự ý lung tung.', 'Sai — không đứng yên.', 'Sai — không bỏ ra ngoài.']),
    Q('Cảm xúc bài hát?', ['Sợ hãi', 'Buồn, lặng lẽ một mình', 'Giận dữ', 'Vui, rộn ràng'], 3, 'Vui và rộn ràng.', ['Sai — bài không gợi sợ hãi.', 'Sai — bài không buồn lặng lẽ.', 'Sai — bài không giận dữ.', 'Đúng — vui và rộn ràng.']),
    Q('Bài hát dạy em?', ['Cô lập bạn', 'Bắt nạt bạn', 'Tự chơi một mình', 'Đoàn kết, vui chơi cùng bạn'], 3, 'Đoàn kết là điều bài hát muốn truyền tải.', ['Sai — không cô lập bạn.', 'Sai — không bắt nạt bạn.', 'Sai — bài dạy chơi cùng bạn.', 'Đúng — đoàn kết, vui chơi cùng bạn.']),
  ]),

  M(30, 'Phân biệt âm thanh nhạc cụ', [
    Q('Tiếng "tách tách" giòn là của?', ['Sáo trúc thổi véo von', 'Thanh phách', 'Trống lớn', 'Đàn nhị'], 1, 'Thanh phách kêu "tách tách".', ['Sai — sáo trúc kêu véo von.', 'Đúng — thanh phách kêu "tách tách".', 'Sai — trống lớn kêu "tùng tùng".', 'Sai — đàn nhị kéo bằng vĩ.']),
    Q('Tiếng "tùng tùng" vang là của?', ['Trống', 'Đàn tranh', 'Sáo trúc thổi cao véo von', 'Phách gõ tách tách giòn'], 0, 'Trống kêu "tùng tùng".', ['Đúng — trống kêu "tùng tùng".', 'Sai — đàn tranh gảy bằng tay.', 'Sai — sáo trúc kêu véo von.', 'Sai — phách kêu "tách tách".']),
    Q('Tiếng "véo von" cao là của?', ['Trống lớn vang tùng tùng', 'Đàn đáy', 'Sáo', 'Phách gõ tách tách'], 2, 'Sáo có âm cao véo von.', ['Sai — trống kêu "tùng tùng".', 'Sai — đàn đáy là nhạc cụ dây gảy.', 'Đúng — sáo có âm cao véo von.', 'Sai — phách kêu "tách tách".']),
    Q('Đàn nhị có?', ['Không có dây', 'Hai dây kéo bằng vĩ', 'Sáu dây gảy', 'Một dây'], 1, 'Đàn nhị có 2 dây kéo bằng vĩ.', ['Sai — đàn nhị có dây.', 'Đúng — đàn nhị có hai dây kéo bằng vĩ.', 'Sai — đàn nhị không có sáu dây.', 'Sai — đàn nhị có hai dây.']),
    Q('Đàn tranh có?', ['Một dây', 'Hai dây kéo', 'Không có dây', 'Nhiều dây gảy'], 3, 'Đàn tranh có nhiều dây gảy bằng tay.', ['Sai — đàn tranh có nhiều dây.', 'Sai — đàn tranh không kéo bằng vĩ.', 'Sai — đàn tranh có dây.', 'Đúng — đàn tranh có nhiều dây gảy bằng tay.']),
    Q('Phách, trống, song loan thuộc nhóm?', ['Nhạc cụ gõ', 'Nhạc cụ hơi', 'Nhạc cụ điện', 'Nhạc cụ dây'], 0, 'Cả ba đều là nhạc cụ gõ.', ['Đúng — cả ba đều là nhạc cụ gõ.', 'Sai — không phải nhạc cụ hơi.', 'Sai — không phải nhạc cụ điện.', 'Sai — không phải nhạc cụ dây.']),
  ]),

  M(31, 'Bài hát "Năm ngón tay ngoan"', [
    Q('"Năm ngón tay ngoan" của nhạc sĩ?', ['Trần Văn Thụ', 'Trịnh Công Sơn', 'Văn Cao', 'Phạm Tuyên'], 0, 'Nhạc sĩ Trần Văn Thụ sáng tác bài này.', ['Đúng — nhạc sĩ Trần Văn Thụ sáng tác.', 'Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Văn Cao.', 'Sai — không phải Phạm Tuyên.']),
    Q('Bài hát có mấy ngón tay?', ['10 ngón', '4 ngón', '5 ngón', '3 ngón'], 2, 'Năm ngón tay trên một bàn tay.', ['Sai — bài nói năm ngón.', 'Sai — bài nói năm ngón.', 'Đúng — năm ngón tay trên một bàn tay.', 'Sai — bài nói năm ngón.']),
    Q('Mỗi ngón tay trong bài đều?', ['Ngoan, đáng yêu', 'Hư hỏng', 'Xấu xí', 'Lười biếng'], 0, 'Bài hát kể về các ngón tay ngoan.', ['Đúng — các ngón tay đều ngoan, đáng yêu.', 'Sai — bài nói ngón tay ngoan.', 'Sai — bài nói ngón tay đáng yêu.', 'Sai — bài nói ngón tay ngoan.']),
    Q('Khi hát em có thể?', ['Làm động tác với các ngón tay', 'Quay lưng', 'Bỏ ra ngoài', 'Đứng yên'], 0, 'Vừa hát vừa giơ ngón tay cho vui.', ['Đúng — làm động tác với các ngón tay.', 'Sai — không quay lưng.', 'Sai — không bỏ ra ngoài.', 'Sai — bài này nên có động tác.']),
    Q('Cảm xúc bài hát?', ['Buồn, nhớ bạn cũ', 'Giận dữ', 'Vui, hồn nhiên', 'Sợ hãi'], 2, 'Vui và hồn nhiên.', ['Sai — bài không buồn nhớ bạn.', 'Sai — bài không giận dữ.', 'Đúng — vui và hồn nhiên.', 'Sai — bài không gợi sợ hãi.']),
    Q('Bài hát dạy em?', ['Vứt bỏ', 'Yêu quý đôi tay của mình', 'Không quan tâm', 'Để tay nghịch lung tung'], 1, 'Đôi tay rất quý — em hãy giữ gìn.', ['Sai — không vứt bỏ.', 'Đúng — yêu quý đôi tay của mình.', 'Sai — phải quan tâm đôi tay.', 'Sai — không để tay nghịch lung tung.']),
  ]),

  M(32, 'Bài hát "Trời nắng, trời mưa"', [
    Q('"Trời nắng, trời mưa" của nhạc sĩ?', ['Trịnh Công Sơn', 'Phạm Tuyên', 'Đặng Nhất Mai', 'Văn Cao'], 2, 'Nhạc sĩ Đặng Nhất Mai sáng tác bài này.', ['Sai — không phải Trịnh Công Sơn.', 'Sai — không phải Phạm Tuyên.', 'Đúng — nhạc sĩ Đặng Nhất Mai sáng tác.', 'Sai — không phải Văn Cao.']),
    Q('Bài hát nói về?', ['Các bạn thỏ đi tắm nắng và chạy mưa', 'Đi chợ', 'Đi học', 'Đi ngủ'], 0, 'Các bạn thỏ vui đùa rồi trú mưa.', ['Đúng — các bạn thỏ tắm nắng và chạy mưa.', 'Sai — bài không nói đi chợ.', 'Sai — bài không nói đi học.', 'Sai — bài không nói đi ngủ.']),
    Q('Khi trời mưa em nên?', ['Mặc áo mưa hoặc trú mưa', 'Chạy nhảy dưới mưa lâu', 'Đứng giữa trời cho ướt', 'Tắm mưa lâu'], 0, 'Tránh mưa để không bị cảm lạnh.', ['Đúng — mặc áo mưa hoặc trú mưa.', 'Sai — không chạy nhảy dưới mưa lâu.', 'Sai — không đứng giữa trời cho ướt.', 'Sai — không tắm mưa lâu.']),
    Q('Bài hát có nhịp?', ['Nhịp lệch, không đều', 'Rất nhanh', 'Rất chậm', 'Vui, đều'], 3, 'Vui và đều.', ['Sai — không hát nhịp lệch.', 'Sai — bài này không rất nhanh.', 'Sai — bài này không rất chậm.', 'Đúng — vui và đều.']),
    Q('Khi hát em nên?', ['Cười tươi, làm động tác', 'Im lặng', 'Bỏ ra ngoài', 'Quay lưng'], 0, 'Vừa hát vừa làm động tác cho sinh động.', ['Đúng — cười tươi, làm động tác.', 'Sai — phải cùng hát.', 'Sai — không bỏ ra ngoài.', 'Sai — không quay lưng.']),
    Q('Cảm xúc bài hát?', ['Vui, ngộ nghĩnh', 'Giận dữ', 'Buồn, nhớ bạn cũ', 'Lo lắng'], 0, 'Vui và ngộ nghĩnh.', ['Đúng — vui và ngộ nghĩnh.', 'Sai — bài không giận dữ.', 'Sai — bài không buồn nhớ bạn.', 'Sai — bài không lo lắng.']),
  ]),

  M(33, 'Ôn tập: nhạc cụ gõ + nốt đen, nốt trắng', [
    Q('Nốt đen = mấy phách?', ['2', '3', '1', '4'], 2, '1 phách.', ['Sai — 2 phách là nốt trắng.', 'Sai — nốt đen không phải 3 phách.', 'Đúng — nốt đen bằng 1 phách.', 'Sai — nốt đen không phải 4 phách.']),
    Q('Nốt trắng = mấy phách?', ['2', '4', '3', '1'], 0, '2 phách.', ['Đúng — nốt trắng bằng 2 phách.', 'Sai — nốt trắng không phải 4 phách.', 'Sai — nốt trắng không phải 3 phách.', 'Sai — 1 phách là nốt đen.']),
    Q('Phách, song loan, trống thuộc nhóm?', ['Nhạc cụ dây', 'Nhạc cụ điện', 'Nhạc cụ hơi', 'Nhạc cụ gõ'], 3, 'Nhạc cụ gõ.', ['Sai — không phải nhạc cụ dây.', 'Sai — không phải nhạc cụ điện.', 'Sai — không phải nhạc cụ hơi.', 'Đúng — cả ba là nhạc cụ gõ.']),
    Q('Vỗ tay theo phách giúp?', ['Hát nhanh', 'Giữ nhịp đều', 'Hát lệch', 'Hát to'], 1, 'Giữ nhịp đều.', ['Sai — không để hát nhanh.', 'Đúng — vỗ phách giúp giữ nhịp đều.', 'Sai — vỗ phách giúp khỏi hát lệch.', 'Sai — không để hát to.']),
    Q('Nhịp 2/4 đếm?', ['Đếm tự do không theo nhịp', '1 – 2, 1 – 2', '1 – 2 – 3', '1 – 2 – 3 – 4'], 1, '1 – 2 đều nhau.', ['Sai — nhịp 2/4 đếm đều.', 'Đúng — nhịp 2/4 đếm 1 – 2, 1 – 2.', 'Sai — 1 – 2 – 3 là nhịp 3/4.', 'Sai — 1 – 2 – 3 – 4 là nhịp 4/4.']),
    Q('Bạn nào hát đẹp?', ['Hát lệch nhịp', 'Hát thật to át bạn', 'Hét lên', 'Đúng cao độ, đúng nhịp, rõ lời'], 3, 'Đúng cao độ và nhịp là đẹp.', ['Sai — hát lệch nhịp là chưa đẹp.', 'Sai — hát to át bạn là chưa đẹp.', 'Sai — hét lên là chưa đẹp.', 'Đúng — đúng cao độ, đúng nhịp, rõ lời.']),
  ]),

  M(34, 'Ôn tập HK2 — các bài hát đã học', [
    Q('Bài về Tết là?', ['Đàn gà con', 'Lý cây xanh', 'Cháu lên ba', 'Sắp đến Tết rồi'], 3, '"Sắp đến Tết rồi".', ['Sai — "Đàn gà con" về đàn gà.', 'Sai — "Lý cây xanh" về cây và chim.', 'Sai — "Cháu lên ba" về bé đi mẫu giáo.', 'Đúng — "Sắp đến Tết rồi" về Tết.']),
    Q('Bài về tình cảm gia đình là?', ['Đàn gà con', 'Cả nhà thương nhau', 'Bắc kim thang', 'Múa vui'], 1, '"Cả nhà thương nhau".', ['Sai — "Đàn gà con" về đàn gà.', 'Đúng — "Cả nhà thương nhau" về gia đình.', 'Sai — "Bắc kim thang" là đồng dao.', 'Sai — "Múa vui" về cùng nhau múa hát.']),
    Q('Bài về chú voi con là?', ['Chú voi con ở Bản Đôn', 'Quê hương tươi đẹp', 'Đàn gà con', 'Lý cây xanh'], 0, '"Chú voi con ở Bản Đôn".', ['Đúng — "Chú voi con ở Bản Đôn".', 'Sai — "Quê hương tươi đẹp" về quê hương.', 'Sai — "Đàn gà con" về đàn gà.', 'Sai — "Lý cây xanh" về cây và chim.']),
    Q('Bài về đi học về là?', ['Cháu lên ba', 'Đi học', 'Tìm bạn thân', 'Đi học về'], 3, '"Đi học về".', ['Sai — "Cháu lên ba" về bé đi mẫu giáo.', 'Sai — đó không phải bài này.', 'Sai — "Tìm bạn thân" về tình bạn.', 'Đúng — "Đi học về".']),
    Q('Bài về các ngón tay là?', ['Trời nắng trời mưa', 'Cả nhà thương nhau', 'Năm ngón tay ngoan', 'Múa vui'], 2, '"Năm ngón tay ngoan".', ['Sai — "Trời nắng trời mưa" về thỏ.', 'Sai — "Cả nhà thương nhau" về gia đình.', 'Đúng — "Năm ngón tay ngoan".', 'Sai — "Múa vui" về cùng nhau múa hát.']),
    Q('Bài về thỏ và mưa nắng là?', ['Trời nắng, trời mưa', 'Quả khế, quả trứng', 'Đàn gà con', 'Đi học về'], 0, '"Trời nắng, trời mưa".', ['Đúng — "Trời nắng, trời mưa" về thỏ.', 'Sai — đó không phải tên bài.', 'Sai — "Đàn gà con" về đàn gà.', 'Sai — "Đi học về" về bé đi học về.']),
  ]),

  M(35, 'Tổng kết — Em yêu âm nhạc', [
    Q('Âm nhạc giúp em?', ['Vui vẻ, sống tích cực', 'Mệt mỏi', 'Không có ích', 'Buồn hơn'], 0, 'Âm nhạc làm cuộc sống đẹp hơn.', ['Đúng — âm nhạc giúp vui vẻ, sống tích cực.', 'Sai — âm nhạc không gây mệt mỏi.', 'Sai — âm nhạc rất có ích.', 'Sai — âm nhạc không làm buồn hơn.']),
    Q('Khi nghe nhạc em nên?', ['Nói chuyện to át nhạc', 'Lắng nghe, cảm nhận', 'Bỏ ra ngoài chơi khác', 'Phá nhạc'], 1, 'Lắng nghe để cảm nhận âm nhạc.', ['Sai — không nói chuyện át nhạc.', 'Đúng — lắng nghe, cảm nhận.', 'Sai — không bỏ ra ngoài.', 'Sai — không phá nhạc.']),
    Q('Hát cùng bạn bè giúp em?', ['Đoàn kết, vui vẻ', 'Mệt mỏi', 'Cô đơn', 'Bị bạn ghét'], 0, 'Cùng hát là cùng vui.', ['Đúng — đoàn kết, vui vẻ.', 'Sai — hát cùng bạn không gây mệt mỏi.', 'Sai — hát cùng bạn không cô đơn.', 'Sai — hát cùng bạn không bị ghét.']),
    Q('Sau một năm học, em đã biết hát?', ['Không bài nào', 'Chỉ một bài', 'Không nhớ', 'Nhiều bài hay'], 3, 'Em đã biết nhiều bài hát thiếu nhi.', ['Sai — em đã học nhiều bài.', 'Sai — em đã học nhiều bài.', 'Sai — em đã nhớ nhiều bài.', 'Đúng — em đã biết nhiều bài hay.']),
    Q('Lên lớp 2, em mong?', ['Học thêm nhiều bài hát mới', 'Không hát nữa', 'Quên hết', 'Bỏ môn nhạc'], 0, 'Cứ tiếp tục yêu âm nhạc nhé.', ['Đúng — học thêm nhiều bài hát mới.', 'Sai — vẫn nên tiếp tục hát.', 'Sai — không nên quên hết.', 'Sai — không bỏ môn nhạc.']),
    Q('Em yêu âm nhạc nghĩa là?', ['Phá tiếng hát bạn', 'Hát lung tung', 'Chỉ hát lúc cô bắt', 'Trân trọng và hát bằng cả tấm lòng'], 3, 'Hát bằng cả tấm lòng là yêu âm nhạc.', ['Sai — không phá tiếng hát bạn.', 'Sai — không hát lung tung.', 'Sai — không chỉ hát lúc cô bắt.', 'Đúng — trân trọng và hát bằng cả tấm lòng.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Một năm hát ca vui vẻ', [
    Q('Khi hát Quốc ca Việt Nam em phải làm gì?', ['Vừa hát vừa đùa', 'Đứng nghiêm, hát rõ lời', 'Ngồi xuống cho đỡ mỏi', 'Nói chuyện riêng'], 1, 'Quốc ca hát khi chào cờ — đứng nghiêm, trang trọng.', ['Sai — Quốc ca là bài hát trang trọng, không đùa nghịch.', 'Đúng — đứng nghiêm và hát rõ lời, thể hiện lòng tự hào.', 'Sai — chào cờ phải đứng nghiêm.', 'Sai — nói chuyện riêng là thiếu tôn trọng.']),
    Q('Thanh phách dùng để làm gì?', ['Vẽ tranh', 'Viết chữ', 'Gõ đệm theo nhịp', 'Đo chiều cao'], 2, 'Thanh phách là nhạc cụ gõ, dùng đệm nhịp cho bài hát.', ['Sai — vẽ tranh dùng bút màu, không dùng thanh phách.', 'Sai — viết chữ dùng bút.', 'Đúng — thanh phách dùng gõ đệm theo nhịp bài hát.', 'Sai — đo chiều cao dùng thước.']),
    Q('Nhạc cụ nào là nhạc cụ gõ em đã học ở Lớp 1?', ['Đàn piano', 'Trống nhỏ', 'Đàn violin', 'Sáo trúc'], 1, 'Nhạc cụ gõ Lớp 1: thanh phách, trống nhỏ, song loan.', ['Sai — piano là nhạc cụ phím, chưa học ở Lớp 1.', 'Đúng — trống nhỏ là nhạc cụ gõ em đã được học.', 'Sai — violin là nhạc cụ dây.', 'Sai — sáo trúc là nhạc cụ hơi.']),
    Q('Tiếng hát to và tiếng hát nhỏ khác nhau về điều gì?', ['Độ cao', 'Tốc độ', 'Độ to (to – nhỏ)', 'Lời bài hát'], 2, 'To – nhỏ là nói về độ to của âm thanh.', ['Sai — độ cao là cao – thấp, không phải to – nhỏ.', 'Sai — tốc độ là nhanh – chậm.', 'Đúng — to – nhỏ là nói về độ to của âm thanh.', 'Sai — lời bài hát không đổi khi hát to hay hát nhỏ.']),
    Q('Hát nhanh – hát chậm là nói về?', ['Tốc độ', 'Màu sắc', 'Độ to', 'Số câu hát'], 0, 'Nhanh – chậm là tốc độ (nhịp độ) của bài hát.', ['Đúng — nhanh – chậm chính là tốc độ của bài hát.', 'Sai — màu sắc là của môn Mĩ thuật.', 'Sai — độ to là to – nhỏ.', 'Sai — số câu hát không đổi khi hát nhanh hay chậm.']),
    Q('Lên Lớp 2 em sẽ được học thêm điều gì trong môn Âm nhạc?', ['Không học nhạc nữa', 'Chỉ nghe, không hát', 'Chỉ hát đúng một bài', 'Nhịp và nốt nhạc đơn giản'], 3, 'Lớp 2 bắt đầu làm quen nhịp và nốt nhạc đơn giản.', ['Sai — lên Lớp 2 em vẫn học Âm nhạc.', 'Sai — em vẫn được hát, còn hát nhiều bài mới nữa.', 'Sai — em sẽ học thêm nhiều bài, không chỉ một bài.', 'Đúng — Lớp 2 em sẽ học nhịp và nốt nhạc đơn giản.']),
  ]),
];

export const P1AN_SCENARIOS = indexBy(P1AN_WEEKS);
