// ============================================================
// Lớp 1 · TIẾNG VIỆT — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám SGK GDPT 2018 (Cánh Diều / Kết nối / Chân trời).
// Lớp 1 dạy đọc – viết âm, vần, tiếng, câu ngắn.
// ID prefix: "P1TV-wNN-quiz"
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1TV', 'tieng-viet', n, title, qs, opts);

export const P1TV_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Làm quen · Tư thế ngồi viết · Bảng chữ cái', [
    Q('Bảng chữ cái tiếng Việt bắt đầu bằng chữ?', ['chữ o', 'chữ ă', 'chữ b', 'a'], 3, 'Chữ "a" đứng đầu bảng chữ cái.', ['Sai — chữ "o" đứng sau, không phải chữ đầu.', 'Sai — chữ "ă" có dấu, đứng sau chữ "a".', 'Sai — chữ "b" đứng thứ hai, sau chữ "a".', 'Đúng — chữ "a" mở đầu bảng chữ cái.']),
    Q('Khi ngồi viết, lưng em phải?', ['Nghiêng nhiều', 'Cúi sát mặt xuống vở', 'Tựa hẳn xuống', 'Thẳng'], 3, 'Ngồi thẳng lưng để bảo vệ cột sống.', ['Sai — nghiêng nhiều sẽ làm cong lưng.', 'Sai — cúi sát vở dễ hỏng mắt.', 'Sai — tựa hẳn xuống là sai tư thế.', 'Đúng — lưng thẳng giúp bảo vệ cột sống.']),
    Q('Khoảng cách mắt đến vở khoảng?', ['Áp sát', '25–30 cm', '10 cm', '50 cm'], 1, 'Khoảng 25–30 cm là an toàn cho mắt.', ['Sai — áp sát vở sẽ hại mắt.', 'Đúng — khoảng 25–30 cm là vừa, tốt cho mắt.', 'Sai — 10 cm là quá gần.', 'Sai — 50 cm là quá xa, khó nhìn chữ.']),
    Q('Tay nào thường dùng cầm bút (đa số)?', ['Tay phải', 'Tay nào cũng được', 'Tay trái', 'Hai tay'], 0, 'Đa số cầm bút tay phải.', ['Đúng — đa số các bạn cầm bút bằng tay phải.', 'Sai — cầm bút cần một tay quen để viết đẹp.', 'Sai — chỉ một số bạn thuận tay trái.', 'Sai — viết chỉ dùng một tay, không dùng hai tay.']),
    Q('Chữ cái nào sau ĐÂY không có trong bảng chữ cái tiếng Việt?', ['f', 'chữ ă', 'chữ đ', 'chữ â'], 0, 'Tiếng Việt không có chữ "f" (chỉ có ph).', ['Đúng — tiếng Việt không có chữ "f", ta dùng "ph".', 'Sai — chữ "ă" có trong bảng chữ cái.', 'Sai — chữ "đ" có trong bảng chữ cái.', 'Sai — chữ "â" có trong bảng chữ cái.']),
  ]),

  M(2, 'Âm /a/ · /b/ · /c/', [
    Q('Tiếng "ba" gồm những âm nào?', ['b + a', 'a + a', 'b + a + b', 'a + b (đảo thứ tự)'], 0, 'Âm đầu "b" + vần "a".', ['Đúng — tiếng "ba" có âm đầu "b" ghép với "a".', 'Sai — tiếng "ba" không có hai âm "a".', 'Sai — tiếng "ba" không có âm "b" ở cuối.', 'Sai — phải đọc "b" trước rồi đến "a".']),
    Q('Đọc tiếng "ca". Âm đầu là?', ['c', 'âm b', 'âm a', 'âm k'], 0, 'Âm đầu là "c".', ['Đúng — tiếng "ca" có âm đầu là "c".', 'Sai — "b" là âm đầu của tiếng khác.', 'Sai — "a" là âm chính, không phải âm đầu.', 'Sai — "ca" viết bằng "c", không phải "k".']),
    Q('Trong các tiếng: ba – bà – bá – bả – bã, chúng khác nhau ở?', ['Dấu thanh', 'Âm chính (vần)', 'Số chữ cái', 'Âm đầu'], 0, 'Cùng "ba", khác dấu thanh.', ['Đúng — các tiếng này chỉ khác nhau ở dấu thanh.', 'Sai — vần đều là "a", không khác.', 'Sai — số chữ cái đều như nhau.', 'Sai — âm đầu đều là "b".']),
    Q('Tiếng "cá" có dấu gì?', ['Dấu Huyền', 'Sắc', 'Dấu Hỏi', 'Dấu Ngã'], 1, 'Dấu sắc trên a.', ['Sai — dấu huyền đi xuống, "cà" mới có dấu huyền.', 'Đúng — "cá" mang dấu sắc trên chữ "a".', 'Sai — dấu hỏi có ở "cả".', 'Sai — dấu ngã có ở "cã".']),
    Q('Chữ nào VIẾT HOA của "a"?', ['A', 'chữ Ă', 'chữ Â', 'chữ O'], 0, 'A in hoa.', ['Đúng — "A" là chữ hoa của "a".', 'Sai — "Ă" là chữ hoa của "ă".', 'Sai — "Â" là chữ hoa của "â".', 'Sai — "O" là chữ hoa của "o".']),
  ]),

  M(3, 'Âm /o/ · /ô/ · /ơ/', [
    Q('Tiếng "cô" gồm âm đầu là?', ['âm k', 'âm ô', 'âm o', 'c'], 3, 'Âm đầu "c".', ['Sai — "cô" viết bằng "c", không phải "k".', 'Sai — "ô" là âm chính, không phải âm đầu.', 'Sai — "o" không có trong tiếng "cô".', 'Đúng — tiếng "cô" có âm đầu là "c".']),
    Q('Phân biệt: "co" và "cô" khác nhau ở?', ['Âm chính (o – ô)', 'Không khác', 'Dấu thanh', 'Âm đầu'], 0, '"o" và "ô" khác nhau.', ['Đúng — "co" có "o", "cô" có "ô", khác âm chính.', 'Sai — hai tiếng đọc khác nhau rõ ràng.', 'Sai — cả hai đều không có dấu thanh.', 'Sai — âm đầu đều là "c".']),
    Q('Tiếng nào CÓ âm "ơ"?', ['cờ', 'tiếng co', 'tiếng cá', 'tiếng cô'], 0, '"cờ" có âm "ơ".', ['Đúng — tiếng "cờ" có âm chính là "ơ".', 'Sai — "co" có âm "o", không phải "ơ".', 'Sai — "cá" có âm "a".', 'Sai — "cô" có âm "ô".']),
    Q('"Bò" có dấu gì?', ['Huyền', 'Dấu Nặng', 'Dấu Sắc', 'Dấu Hỏi'], 0, 'Dấu huyền.', ['Đúng — "bò" mang dấu huyền đi xuống.', 'Sai — dấu nặng là dấu chấm dưới chữ.', 'Sai — dấu sắc đi lên, có ở "bó".', 'Sai — dấu hỏi có ở "bỏ".']),
    Q('Chữ "ô" khác "o" ở điểm nào?', ['Không khác', 'Có dấu mũ', 'Có nét cong', 'Có dấu sắc'], 1, '"ô" = o + dấu mũ.', ['Sai — "ô" và "o" khác nhau, "ô" có thêm mũ.', 'Đúng — "ô" là "o" đội thêm dấu mũ.', 'Sai — cả hai đều có nét cong tròn.', 'Sai — dấu mũ không phải dấu sắc.']),
  ]),

  M(4, 'Âm /e/ · /ê/ · /i/', [
    Q('Tiếng "bê" có âm chính là?', ['ê', 'âm i', 'âm b', 'âm e'], 0, 'Âm chính "ê".', ['Đúng — tiếng "bê" có âm chính là "ê".', 'Sai — "i" không có trong tiếng "bê".', 'Sai — "b" là âm đầu, không phải âm chính.', 'Sai — "ê" mới đúng, "e" không có mũ.']),
    Q('"Bé" và "bè" khác nhau ở?', ['Âm chính', 'Âm đầu', 'Dấu thanh', 'Số chữ'], 2, 'Khác dấu thanh.', ['Sai — âm chính đều là "e".', 'Sai — âm đầu đều là "b".', 'Đúng — "bé" dấu sắc, "bè" dấu huyền, khác thanh.', 'Sai — số chữ đều bằng nhau.']),
    Q('Tiếng "đi" có mấy chữ cái?', ['1', '3', '2', '4'], 2, 'đ + i = 2 chữ.', ['Sai — "đi" có nhiều hơn một chữ cái.', 'Sai — "đi" chỉ có hai chữ thôi.', 'Đúng — "đ" và "i" là 2 chữ cái.', 'Sai — "đi" không có tới 4 chữ.']),
    Q('Trong các âm: e, ê, i — chữ nào CÓ DẤU MŨ?', ['ê', 'chữ i', 'chữ e', 'Cả ba đều có dấu mũ'], 0, '"ê" có mũ.', ['Đúng — chỉ "ê" có dấu mũ ở trên.', 'Sai — "i" không có dấu mũ.', 'Sai — "e" không có dấu mũ.', 'Sai — chỉ một mình "ê" có mũ thôi.']),
    Q('"Bí" có dấu gì?', ['Dấu Huyền', 'Dấu Ngã', 'Sắc', 'Dấu Hỏi'], 2, 'Dấu sắc.', ['Sai — dấu huyền có ở "bì".', 'Sai — dấu ngã có ở "bĩ".', 'Đúng — "bí" mang dấu sắc đi lên.', 'Sai — dấu hỏi có ở "bỉ".']),
  ]),

  M(5, 'Âm /u/ · /ư/ · /n/ · /m/', [
    Q('Tiếng "mẹ" có âm đầu là?', ['ẹ (âm cuối)', 'âm e', 'm', 'âm n'], 2, 'Âm đầu "m".', ['Sai — "ẹ" là vần, không phải âm đầu.', 'Sai — "e" là âm chính.', 'Đúng — tiếng "mẹ" có âm đầu là "m".', 'Sai — tiếng "mẹ" không có âm "n".']),
    Q('Tiếng "nụ" có dấu gì?', ['Dấu Hỏi', 'Dấu Sắc', 'Nặng', 'Dấu Huyền'], 2, 'Dấu nặng dưới u.', ['Sai — dấu hỏi có ở "nủ".', 'Sai — dấu sắc có ở "nú".', 'Đúng — "nụ" mang dấu nặng (chấm dưới chữ u).', 'Sai — dấu huyền có ở "nù".']),
    Q('"Tu" và "tư" khác nhau ở?', ['Dấu thanh', 'Âm đầu', 'Âm chính', 'Vần (cả "u" và "ư")'], 2, '"u" và "ư" khác nhau.', ['Sai — cả hai đều không có dấu thanh.', 'Sai — âm đầu đều là "t".', 'Đúng — "tu" có "u", "tư" có "ư", khác âm chính.', 'Sai — chỉ khác ở âm chính u và ư thôi.']),
    Q('Chữ "ư" có gì khác chữ "u"?', ['Dấu sắc', 'Dấu mũ', 'Râu nhỏ bên phải', 'Dấu hỏi'], 2, '"ư" có thêm nét râu.', ['Sai — "ư" không có dấu sắc.', 'Sai — "ư" có râu, không phải mũ.', 'Đúng — "ư" là "u" thêm nét râu nhỏ bên phải.', 'Sai — "ư" không có dấu hỏi.']),
    Q('Tiếng "nam" có mấy âm (đầu + chính + cuối)?', ['1', '4', '2', '3'], 3, 'n + a + m = 3 phần.', ['Sai — "nam" có nhiều hơn một phần.', 'Sai — "nam" chỉ có ba phần thôi.', 'Sai — "nam" có cả âm cuối "m".', 'Đúng — "n" + "a" + "m" là 3 phần.']),
  ]),

  M(6, 'Âm ghép: /ch/ · /kh/ · /nh/ · /ph/ · /th/', [
    Q('Tiếng "chợ" có âm đầu là?', ['ợ (vần)', 'âm h', 'âm c', 'ch'], 3, 'Âm đầu "ch" (âm ghép).', ['Sai — "ợ" là vần, không phải âm đầu.', 'Sai — "h" đứng một mình không phải âm đầu ở đây.', 'Sai — phải đọc "ch" cả hai chữ liền nhau.', 'Đúng — "ch" là âm đầu ghép của tiếng "chợ".']),
    Q('"Khế" có âm đầu là?', ['âm k', 'kh', 'âm h', 'ê (vần)'], 1, 'Âm đầu "kh".', ['Sai — "k" đứng một mình không phải âm đầu ở đây.', 'Đúng — "kh" là âm đầu ghép của tiếng "khế".', 'Sai — "h" đứng một mình không phải âm đầu.', 'Sai — "ê" là vần, không phải âm đầu.']),
    Q('Âm đầu của "nhà" là?', ['à (vần)', 'nh', 'âm n', 'âm h'], 1, 'Âm đầu "nh".', ['Sai — "à" là vần, không phải âm đầu.', 'Đúng — "nh" là âm đầu ghép của tiếng "nhà".', 'Sai — "n" đứng một mình không đủ, phải có "h".', 'Sai — "h" đứng một mình không phải âm đầu.']),
    Q('"Phở" có âm đầu là?', ['âm h', 'âm p', 'ở (vần)', 'ph'], 3, 'Âm đầu "ph".', ['Sai — "h" đứng một mình không phải âm đầu.', 'Sai — "p" đứng một mình không phải âm đầu ở đây.', 'Sai — "ở" là vần, không phải âm đầu.', 'Đúng — "ph" là âm đầu ghép của tiếng "phở".']),
    Q('"Thi" có âm đầu là?', ['th', 'âm h', 'i (vần)', 'âm t'], 0, 'Âm đầu "th".', ['Đúng — "th" là âm đầu ghép của tiếng "thi".', 'Sai — "h" đứng một mình không phải âm đầu.', 'Sai — "i" là vần, không phải âm đầu.', 'Sai — "t" đứng một mình không đủ, phải có "h".']),
  ]),

  M(7, 'Vần /an/ · /at/ · /ac/', [
    Q('Vần "an" gồm những âm nào?', ['a + n', 'Một âm', 'a + c', 'a + t'], 0, 'Âm chính "a" + âm cuối "n".', ['Đúng — vần "an" có "a" + âm cuối "n".', 'Sai — vần "an" gồm hai âm, không phải một.', 'Sai — "a + c" là vần "ac".', 'Sai — "a + t" là vần "at".']),
    Q('Tiếng "bàn" có vần là?', ['àn', 'ba (cả tiếng)', 'b (âm đầu)', 'an (chưa có dấu)'], 0, 'Vần "àn" (có dấu huyền).', ['Đúng — vần là "àn" (có dấu huyền).', 'Sai — "ba" không phải vần của tiếng "bàn".', 'Sai — "b" là âm đầu, không phải vần.', 'Sai — vần đã mang dấu huyền là "àn".']),
    Q('Tiếng nào CÓ VẦN "ac"?', ['các', 'tiếng cá', 'tiếng cán', 'tiếng cát'], 0, '"các" có vần "ac".', ['Đúng — "các" có vần "ac".', 'Sai — "cá" có vần "a", không có âm cuối.', 'Sai — "cán" có vần "an".', 'Sai — "cát" có vần "at".']),
    Q('"Hát" có vần?', ['h (âm đầu)', 'át', 'at (chưa có dấu)', 'ha (cả tiếng)'], 1, 'Vần "át".', ['Sai — "h" là âm đầu, không phải vần.', 'Đúng — vần là "át" (mang dấu sắc).', 'Sai — vần đã có dấu sắc là "át".', 'Sai — "ha" không phải vần của tiếng "hát".']),
    Q('Tiếng "lan" và "lát" khác nhau ở?', ['Âm chính', 'Âm cuối', 'Âm đầu', 'Dấu thanh'], 1, '"n" và "t" khác.', ['Sai — âm chính đều là "a".', 'Đúng — "lan" cuối là "n", "lát" cuối là "t".', 'Sai — âm đầu đều là "l".', 'Sai — chúng khác ở âm cuối, không phải dấu thanh.']),
  ]),

  M(8, 'Vần /on/ · /ot/ · /oc/ · /en/ · /et/', [
    Q('"Con" có vần?', ['co (cả tiếng)', 'òn (có dấu huyền)', 'on', 'c (âm đầu)'], 2, 'Vần "on".', ['Sai — "co" không phải vần của tiếng "con".', 'Sai — "con" không có dấu huyền.', 'Đúng — vần là "on".', 'Sai — "c" là âm đầu, không phải vần.']),
    Q('"Mèo" có vần?', ['me (cả tiếng)', 'mèo (cả tiếng)', 'eo (chưa có dấu)', 'èo'], 3, 'Vần "èo".', ['Sai — "me" không phải vần của tiếng "mèo".', 'Sai — đó là cả tiếng, không phải vần.', 'Sai — vần đã mang dấu huyền là "èo".', 'Đúng — vần là "èo" (có dấu huyền).']),
    Q('"Hết" có vần?', ['he (cả tiếng)', 'et (chưa có dấu)', 'hết (cả tiếng)', 'ết'], 3, 'Vần "ết".', ['Sai — "he" không phải vần của tiếng "hết".', 'Sai — vần đã mang dấu sắc là "ết".', 'Sai — đó là cả tiếng, không phải vần.', 'Đúng — vần là "ết" (có dấu sắc).']),
    Q('Tiếng nào CÓ VẦN "oc"?', ['cóc', 'tiếng cọ', 'tiếng có', 'tiếng cò'], 0, '"cóc" có vần "oc".', ['Đúng — "cóc" có vần "oc".', 'Sai — "cọ" có vần "o", không có âm cuối.', 'Sai — "có" có vần "o".', 'Sai — "cò" có vần "o".']),
    Q('"Sen" có vần?', ['en', 'se (cả tiếng)', 's (âm đầu)', 'sn (ghép sai)'], 0, 'Vần "en".', ['Đúng — vần là "en".', 'Sai — "se" không phải vần của tiếng "sen".', 'Sai — "s" là âm đầu, không phải vần.', 'Sai — không có vần "sn", ghép sai rồi.']),
  ]),

  M(9, 'Vần /un/ · /ut/ · /uc/ · /in/ · /it/', [
    Q('"Bún" có vần?', ['ún', 'b (âm đầu)', 'bu (cả tiếng)', 'un (chưa có dấu)'], 0, 'Vần "ún".', ['Đúng — vần là "ún" (có dấu sắc).', 'Sai — "b" là âm đầu, không phải vần.', 'Sai — "bu" không phải vần của tiếng "bún".', 'Sai — vần đã mang dấu sắc là "ún".']),
    Q('"Phút" có vần?', ['út', 'ph (âm đầu)', 'phu (cả tiếng)', 'ut (chưa có dấu)'], 0, 'Vần "út".', ['Đúng — vần là "út" (có dấu sắc).', 'Sai — "ph" là âm đầu, không phải vần.', 'Sai — "phu" không phải vần của tiếng "phút".', 'Sai — vần đã mang dấu sắc là "út".']),
    Q('"Tin" có vần?', ['tin (cả tiếng)', 't (âm đầu)', 'ti (chưa có âm cuối)', 'in'], 3, 'Vần "in".', ['Sai — đó là cả tiếng, không phải vần.', 'Sai — "t" là âm đầu, không phải vần.', 'Sai — vần thiếu âm cuối "n".', 'Đúng — vần là "in".']),
    Q('Tiếng nào CÓ vần "uc"?', ['tiếng bù', 'búc', 'tiếng bụ', 'tiếng búi'], 1, '"búc" → vần "uc".', ['Sai — "bù" có vần "u", không có âm cuối.', 'Đúng — "búc" có vần "uc".', 'Sai — "bụ" có vần "u".', 'Sai — "búi" có vần "ui".']),
    Q('"Mít" có vần?', ['mi (chưa có âm cuối)', 'mít (cả tiếng)', 'ít', 'it (chưa có dấu)'], 2, 'Vần "ít".', ['Sai — vần thiếu âm cuối "t".', 'Sai — đó là cả tiếng, không phải vần.', 'Đúng — vần là "ít" (có dấu sắc).', 'Sai — vần đã mang dấu sắc là "ít".']),
  ]),

  M(10, 'Vần /anh/ · /inh/ · /ach/ · /ich/', [
    Q('"Anh" có vần?', ['a (âm chính)', 'an (thiếu h)', 'nh (âm cuối)', 'anh'], 3, 'Vần "anh".', ['Sai — "a" thiếu âm cuối "nh".', 'Sai — "an" là vần khác, không có "h".', 'Sai — "nh" chỉ là âm cuối, chưa đủ vần.', 'Đúng — vần là "anh".']),
    Q('"Sách" có vần?', ['ach (chưa có dấu)', 's (âm đầu)', 'sa (thiếu âm cuối)', 'ách'], 3, 'Vần "ách".', ['Sai — vần đã mang dấu sắc là "ách".', 'Sai — "s" là âm đầu, không phải vần.', 'Sai — "sa" không phải vần, thiếu âm cuối.', 'Đúng — vần là "ách" (có dấu sắc).']),
    Q('"Xinh" có vần?', ['in (thiếu h)', 'xi', 'x', 'inh'], 3, 'Vần "inh".', ['Sai — "in" thiếu "h", không phải vần ở đây.', 'Sai — "xi" không phải vần của tiếng "xinh".', 'Sai — "x" là âm đầu, không phải vần.', 'Đúng — vần là "inh".']),
    Q('"Lịch" có vần?', ['ich (chưa có dấu)', 'l (âm đầu)', 'ịch', 'li (thiếu âm cuối)'], 2, 'Vần "ịch".', ['Sai — vần đã mang dấu nặng là "ịch".', 'Sai — "l" là âm đầu, không phải vần.', 'Đúng — vần là "ịch" (có dấu nặng).', 'Sai — "li" không phải vần, thiếu âm cuối.']),
    Q('Vần "anh" gồm?', ['a + nh', 'a + nh + h', 'Một âm', 'a + n (thiếu h)'], 0, 'Âm chính "a" + âm cuối "nh".', ['Đúng — vần "anh" có "a" + âm cuối "nh".', 'Sai — không thêm "h" nữa, chỉ "nh" thôi.', 'Sai — vần "anh" gồm hai phần, không phải một âm.', 'Sai — phải là "nh", không phải "n".']),
  ]),

  M(11, 'Vần /ong/ · /ông/ · /ung/ · /ưng/', [
    Q('"Ong" có vần?', ['g (âm cuối)', 'on (thiếu g)', 'o (âm chính)', 'ong'], 3, 'Vần "ong".', ['Sai — "g" chỉ là một chữ, chưa đủ vần.', 'Sai — "on" thiếu chữ "g".', 'Sai — "o" thiếu âm cuối "ng".', 'Đúng — vần là "ong".']),
    Q('"Sông" có vần?', ['so (cả tiếng không dấu)', 'ong (thiếu mũ)', 'ông', 's (âm đầu)'], 2, 'Vần "ông".', ['Sai — "so" không phải vần của tiếng "sông".', 'Sai — vần phải có mũ là "ông".', 'Đúng — vần là "ông" (có mũ trên o).', 'Sai — "s" là âm đầu, không phải vần.']),
    Q('"Bụng" có vần?', ['ung (chưa có dấu)', 'ụng', 'b (âm đầu)', 'bu (thiếu âm cuối)'], 1, 'Vần "ụng".', ['Sai — vần đã mang dấu nặng là "ụng".', 'Đúng — vần là "ụng" (có dấu nặng).', 'Sai — "b" là âm đầu, không phải vần.', 'Sai — "bu" thiếu âm cuối "ng".']),
    Q('"Mừng" có vần?', ['mu (thiếu âm cuối)', 'ưng (chưa có dấu)', 'm (âm đầu)', 'ừng'], 3, 'Vần "ừng".', ['Sai — "mu" thiếu âm cuối "ng".', 'Sai — vần đã mang dấu huyền là "ừng".', 'Sai — "m" là âm đầu, không phải vần.', 'Đúng — vần là "ừng" (có dấu huyền).']),
    Q('Tiếng nào KHÔNG có "ng" ở cuối?', ['mít', 'tiếng mừng', 'tiếng bụng', 'tiếng sông'], 0, '"mít" không có ng.', ['Đúng — "mít" cuối là "t", không có "ng".', 'Sai — "mừng" có "ng" ở cuối.', 'Sai — "bụng" có "ng" ở cuối.', 'Sai — "sông" có "ng" ở cuối.']),
  ]),

  M(12, 'Vần /oi/ · /ai/ · /ay/ · /ây/', [
    Q('"Voi" có vần?', ['oi', 'voi (cả tiếng)', 'v (âm đầu)', 'vo (thiếu i)'], 0, 'Vần "oi".', ['Đúng — vần là "oi".', 'Sai — đó là cả tiếng, không phải vần.', 'Sai — "v" là âm đầu, không phải vần.', 'Sai — "vo" thiếu chữ "i".']),
    Q('"Tai" có vần?', ['t (âm đầu)', 'ta (thiếu i)', 'ai', 'tai (cả tiếng)'], 2, 'Vần "ai".', ['Sai — "t" là âm đầu, không phải vần.', 'Sai — "ta" thiếu chữ "i".', 'Đúng — vần là "ai".', 'Sai — đó là cả tiếng, không phải vần.']),
    Q('"Bay" có vần?', ['ba (thiếu y)', 'bay (cả tiếng)', 'ay', 'b (âm đầu)'], 2, 'Vần "ay".', ['Sai — "ba" thiếu chữ "y".', 'Sai — đó là cả tiếng, không phải vần.', 'Đúng — vần là "ay".', 'Sai — "b" là âm đầu, không phải vần.']),
    Q('"Cây" có vần?', ['ây', 'cây (cả tiếng)', 'c (âm đầu)', 'ca (thiếu mũ và y)'], 0, 'Vần "ây".', ['Đúng — vần là "ây" (có mũ trên a).', 'Sai — đó là cả tiếng, không phải vần.', 'Sai — "c" là âm đầu, không phải vần.', 'Sai — "ca" thiếu mũ và chữ "y".']),
    Q('Tiếng "tay" và "tai" khác nhau ở?', ['Âm cuối (y – i)', 'Âm chính', 'Dấu thanh', 'Âm đầu'], 0, 'y và i ở cuối khác nhau.', ['Đúng — "tay" cuối là "y", "tai" cuối là "i".', 'Sai — âm chính đều là "a".', 'Sai — cả hai đều không có dấu thanh.', 'Sai — âm đầu đều là "t".']),
  ]),

  M(13, 'Vần /eo/ · /êu/ · /iu/ · /au/ · /âu/', [
    Q('"Mèo" có vần?', ['eo (chưa có dấu huyền)', 'èo', 'm (âm đầu)', 'me (thiếu âm cuối)'], 1, 'Vần "èo".', ['Sai — vần đã mang dấu huyền là "èo".', 'Đúng — vần là "èo" (có dấu huyền).', 'Sai — "m" là âm đầu, không phải vần.', 'Sai — "me" thiếu chữ "o".']),
    Q('"Sếu" có vần?', ['se (thiếu âm cuối)', 'êu (chưa có dấu sắc)', 's (âm đầu)', 'ếu'], 3, 'Vần "ếu".', ['Sai — "se" thiếu phần "êu".', 'Sai — vần đã mang dấu sắc là "ếu".', 'Sai — "s" là âm đầu, không phải vần.', 'Đúng — vần là "ếu" (có dấu sắc).']),
    Q('"Rìu" có vần?', ['ri (thiếu u)', 'ìu', 'iu (chưa có dấu huyền)', 'r (âm đầu)'], 1, 'Vần "ìu".', ['Sai — "ri" thiếu chữ "u".', 'Đúng — vần là "ìu" (có dấu huyền).', 'Sai — vần đã mang dấu huyền là "ìu".', 'Sai — "r" là âm đầu, không phải vần.']),
    Q('"Cau" có vần?', ['ca (thiếu u)', 'c (âm đầu)', 'cau (cả tiếng)', 'au'], 3, 'Vần "au".', ['Sai — "ca" thiếu chữ "u".', 'Sai — "c" là âm đầu, không phải vần.', 'Sai — đó là cả tiếng, không phải vần.', 'Đúng — vần là "au".']),
    Q('"Trâu" có vần?', ['tra (thiếu u và mũ)', 'au (thiếu mũ)', 'âu', 'tr (âm đầu)'], 2, 'Vần "âu".', ['Sai — "tra" thiếu mũ và chữ "u".', 'Sai — vần phải có mũ là "âu".', 'Đúng — vần là "âu" (có mũ trên a).', 'Sai — "tr" là âm đầu, không phải vần.']),
  ]),

  M(14, 'Đọc đoạn ngắn (1) · Trường em', [
    Q('Trường tiểu học dạy từ lớp mấy đến lớp mấy?', ['6 – 9', '1 – 9', '1 – 5', '10 – 12'], 2, 'Tiểu học: lớp 1–5.', ['Sai — lớp 6–9 là trường trung học cơ sở.', 'Sai — lớp 1–9 gồm cả cấp hai.', 'Đúng — tiểu học dạy từ lớp 1 đến lớp 5.', 'Sai — lớp 10–12 là trung học phổ thông.']),
    Q('Người dạy em ở trường gọi là?', ['Bác sĩ', 'Cô/Thầy giáo', 'Bộ đội', 'Công nhân'], 1, 'Thầy/cô giáo.', ['Sai — bác sĩ khám bệnh ở bệnh viện.', 'Đúng — thầy giáo, cô giáo dạy em ở trường.', 'Sai — bộ đội bảo vệ Tổ quốc.', 'Sai — công nhân làm việc ở nhà máy.']),
    Q('Đầu giờ học, em làm gì?', ['Chạy ra cổng', 'Chào cờ và đứng nghiêm', 'Ăn quà', 'Đi quanh sân trường'], 1, 'Chào cờ đầu tuần.', ['Sai — không chạy ra cổng khi vào học.', 'Đúng — đầu tuần em chào cờ và đứng nghiêm.', 'Sai — không ăn quà trong giờ chào cờ.', 'Sai — không đi lung tung khi chào cờ.']),
    Q('Khi cô gọi, em đứng lên và?', ['Im lặng', 'Bỏ ra ngoài', 'Khoanh tay chào', 'Cãi cô'], 2, 'Khoanh tay, dạ thưa cô.', ['Sai — cần dạ thưa, không chỉ im lặng.', 'Sai — không được bỏ ra ngoài.', 'Đúng — em khoanh tay và dạ thưa cô.', 'Sai — không được cãi cô, phải lễ phép.']),
    Q('Ngày đầu tiên đi học là ngày?', ['Khai giảng', 'Tết Nguyên đán', 'Sinh nhật', 'Trung Thu'], 0, 'Khai giảng năm học.', ['Đúng — ngày khai giảng mở đầu năm học.', 'Sai — Tết là ngày đầu năm mới, không phải khai giảng.', 'Sai — sinh nhật là ngày em ra đời.', 'Sai — Trung Thu là Tết của thiếu nhi.']),
  ]),

  M(15, 'Đọc đoạn ngắn (2) · Gia đình em', [
    Q('Người sinh ra em là?', ['Cô giáo', 'Ông bà', 'Cô chú', 'Bố mẹ'], 3, 'Bố mẹ sinh em.', ['Sai — cô giáo dạy em ở trường.', 'Sai — ông bà sinh ra bố mẹ.', 'Sai — cô chú là họ hàng.', 'Đúng — bố mẹ là người sinh ra em.']),
    Q('Anh trai của bố em gọi là?', ['Bác', 'gọi là Chú', 'gọi là Cô', 'gọi là Cậu'], 0, 'Bác (anh ruột của bố).', ['Đúng — anh trai của bố gọi là bác.', 'Sai — chú là em trai của bố.', 'Sai — cô là em gái của bố.', 'Sai — cậu là anh, em trai của mẹ.']),
    Q('Em gái của mẹ em gọi là?', ['Dì', 'gọi là Cô', 'gọi là Mợ', 'gọi là Bác'], 0, 'Dì (em ruột của mẹ).', ['Đúng — em gái của mẹ gọi là dì.', 'Sai — cô là em gái của bố.', 'Sai — mợ là vợ của cậu.', 'Sai — bác là anh, chị lớn của bố hoặc mẹ.']),
    Q('Bố của mẹ em là?', ['Ông ngoại', 'Ông nội', 'gọi là Cậu', 'gọi là Bác'], 0, 'Ông ngoại.', ['Đúng — bố của mẹ gọi là ông ngoại.', 'Sai — ông nội là bố của bố.', 'Sai — cậu là anh, em trai của mẹ.', 'Sai — bác là anh, chị lớn của bố mẹ.']),
    Q('Anh, chị, em ruột cùng?', ['Bố mẹ', 'Ông bà', 'Trường', 'Họ hàng'], 0, 'Cùng bố mẹ.', ['Đúng — anh chị em ruột cùng một bố mẹ.', 'Sai — ông bà là người sinh ra bố mẹ.', 'Sai — cùng trường là bạn học, không phải ruột thịt.', 'Sai — họ hàng rộng hơn anh chị em ruột.']),
  ]),

  M(16, 'Viết câu ngắn · Dấu chấm · Dấu phẩy', [
    Q('Cuối câu kể thường dùng dấu gì?', ['Dấu phẩy', 'Dấu hỏi', 'Dấu than', 'Dấu chấm'], 3, 'Dấu chấm "." kết câu kể.', ['Sai — dấu phẩy dùng để ngăn cách trong câu.', 'Sai — dấu hỏi dùng cho câu hỏi.', 'Sai — dấu than dùng cho câu cảm.', 'Đúng — câu kể kết thúc bằng dấu chấm.']),
    Q('Cuối câu hỏi dùng dấu gì?', ['Dấu than', 'Hai chấm', 'Dấu chấm', 'Dấu hỏi (?)'], 3, 'Dấu hỏi cho câu hỏi.', ['Sai — dấu than dùng cho câu cảm.', 'Sai — hai chấm dùng khi liệt kê hoặc dẫn lời.', 'Sai — dấu chấm dùng cho câu kể.', 'Đúng — câu hỏi kết thúc bằng dấu hỏi (?).']),
    Q('Đầu câu chữ cái phải viết?', ['Thường', 'In nghiêng', 'Cùng cỡ với chữ giữa câu', 'Hoa'], 3, 'Chữ đầu câu viết hoa.', ['Sai — chữ đầu câu không viết thường.', 'Sai — không cần in nghiêng.', 'Sai — chữ đầu câu phải khác, viết hoa.', 'Đúng — chữ đầu câu luôn viết hoa.']),
    Q('Trong câu "Em đi học.", có bao nhiêu chữ?', ['3', '2', '4', '5'], 0, 'Em / đi / học → 3 chữ (tiếng).', ['Đúng — "Em", "đi", "học" là 3 tiếng.', 'Sai — đếm thiếu một tiếng rồi.', 'Sai — câu chỉ có 3 tiếng thôi.', 'Sai — câu không có tới 5 tiếng.']),
    Q('Câu "Mẹ ơi" cần thêm dấu gì ở cuối để gọi?', ['Hỏi (?)', 'Chấm (.)', 'Phẩy (,)', 'Than (!)'], 3, 'Câu cảm/gọi thường dùng dấu than.', ['Sai — dấu hỏi dùng để hỏi.', 'Sai — dấu chấm dùng cho câu kể.', 'Sai — dấu phẩy không kết thúc câu gọi.', 'Đúng — câu gọi thường dùng dấu than (!).']),
  ]),

  M(17, 'Ôn tập cuối HK1 (1) – Âm vần', [
    Q('Tiếng "chanh" có âm đầu là?', ['âm "c"', 'ch', 'âm "nh"', 'âm "h"'], 1, 'Âm đầu "ch".', ['Sai — "c" đứng một mình không phải âm đầu ở đây.', 'Đúng — "ch" là âm đầu ghép của tiếng "chanh".', 'Sai — "nh" nằm ở cuối, là âm cuối.', 'Sai — "h" đứng một mình không phải âm đầu.']),
    Q('Vần "anh" có âm cuối là?', ['nh', 'a (âm chính)', 'n (thiếu h)', 'h (chỉ một chữ)'], 0, 'Âm cuối "nh".', ['Đúng — âm cuối của vần "anh" là "nh".', 'Sai — "a" là âm chính, không phải âm cuối.', 'Sai — âm cuối là "nh", không phải "n".', 'Sai — phải đủ "nh", không chỉ "h".']),
    Q('Tiếng nào có dấu HỎI?', ['tiếng mã', 'tiếng mà', 'tiếng má', 'mả'], 3, 'mả – dấu hỏi.', ['Sai — "mã" mang dấu ngã.', 'Sai — "mà" mang dấu huyền.', 'Sai — "má" mang dấu sắc.', 'Đúng — "mả" mang dấu hỏi.']),
    Q('Đâu là TIẾNG có nghĩa?', ['qql', 'btr', 'xyz', 'mèo'], 3, '"mèo" là tiếng có nghĩa.', ['Sai — "qql" không phải tiếng có nghĩa.', 'Sai — "btr" không đọc được, vô nghĩa.', 'Sai — "xyz" không phải tiếng tiếng Việt.', 'Đúng — "mèo" là tiếng có nghĩa, chỉ con vật.']),
    Q('Tiếng "khôn" có vần?', ['kh (âm đầu)', 'kho (thiếu mũ)', 'khôn (cả tiếng)', 'ôn'], 3, 'Vần "ôn".', ['Sai — "kh" là âm đầu, không phải vần.', 'Sai — "kho" thiếu mũ và không phải vần.', 'Sai — đó là cả tiếng, không phải vần.', 'Đúng — vần là "ôn" (có mũ trên o).']),
  ]),

  M(18, 'Ôn tập cuối HK1 (2) – Đọc – Viết', [
    Q('Viết HOA chữ đầu của câu sau: "em yêu trường em." — chữ đúng?', ['EM (viết hoa cả)', 'Em', 'e M (hoa M)', 'em (không hoa)'], 1, 'Chữ đầu câu viết hoa: "Em".', ['Sai — chỉ viết hoa chữ cái đầu, không hoa cả.', 'Đúng — viết hoa chữ "E" đầu câu: "Em".', 'Sai — phải hoa chữ đầu "E", không hoa "M".', 'Sai — chữ đầu câu phải viết hoa.']),
    Q('Đọc đúng dấu thanh "bà" là?', ['ba huyền', 'ba (không dấu)', 'ba hỏi', 'ba sắc'], 0, 'Dấu huyền.', ['Đúng — "bà" đọc là "ba" thanh huyền.', 'Sai — "ba" không dấu khác với "bà".', 'Sai — thanh hỏi là "bả".', 'Sai — thanh sắc là "bá".']),
    Q('Sắp xếp thành câu: "đi / em / học"', ['Học em đi.', 'Đi học em.', 'Em đi học.', 'Đi em học.'], 2, '"Em đi học." là câu đúng.', ['Sai — "Học em đi." nghe không xuôi.', 'Sai — "Đi học em." sai trật tự.', 'Đúng — "Em đi học." là câu đúng.', 'Sai — "Đi em học." sai trật tự từ.']),
    Q('Tên riêng người luôn viết?', ['Hoa chữ cái đầu', 'Thường', 'In nghiêng', 'Gạch chân'], 0, 'Tên người viết hoa chữ cái đầu mỗi tiếng.', ['Đúng — tên người viết hoa chữ cái đầu mỗi tiếng.', 'Sai — tên riêng không viết thường.', 'Sai — không cần in nghiêng.', 'Sai — không cần gạch chân.']),
    Q('"Quê hương" có mấy tiếng?', ['3', '4', '1', '2'], 3, 'quê + hương = 2 tiếng.', ['Sai — chỉ có 2 tiếng thôi.', 'Sai — đếm thừa rồi.', 'Sai — "quê hương" có nhiều hơn một tiếng.', 'Đúng — "quê" và "hương" là 2 tiếng.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Vần khó: /uôi/ · /ươi/ · /uây/', [
    Q('"Chuối" có vần?', ['ch (âm đầu)', 'chu (thiếu âm cuối)', 'ối (thiếu u)', 'uôi'], 3, 'Vần "uôi".', ['Sai — "ch" là âm đầu, không phải vần.', 'Sai — "chu" thiếu phần âm cuối.', 'Sai — "ối" thiếu chữ "u".', 'Đúng — vần là "uôi".']),
    Q('"Tươi" có vần?', ['ơi (thiếu ư)', 'ươi', 't (âm đầu)', 'tu (thiếu mũ)'], 1, 'Vần "ươi".', ['Sai — "ơi" thiếu chữ "ư".', 'Đúng — vần là "ươi".', 'Sai — "t" là âm đầu, không phải vần.', 'Sai — "tu" không phải vần, thiếu phần sau.']),
    Q('"Khuấy" có vần?', ['ây (thiếu u)', 'khu (thiếu mũ và y)', 'kh (âm đầu)', 'uây'], 3, 'Vần "uây".', ['Sai — "ây" thiếu chữ "u".', 'Sai — "khu" không phải vần.', 'Sai — "kh" là âm đầu, không phải vần.', 'Đúng — vần là "uây".']),
    Q('Tiếng nào có vần "uôi"?', ['tiếng sai', 'suối', 'tiếng sỏi', 'tiếng sạ'], 1, '"suối" → vần "uôi".', ['Sai — "sai" có vần "ai".', 'Đúng — "suối" có vần "uôi".', 'Sai — "sỏi" có vần "oi".', 'Sai — "sạ" có vần "a".']),
    Q('"Người" có vần?', ['ng (âm đầu)', 'ời (thiếu ư)', 'ngu (thiếu mũ và i)', 'ươi'], 3, 'Vần "ười".', ['Sai — "ng" là âm đầu, không phải vần.', 'Sai — "ời" thiếu chữ "ư".', 'Sai — "ngu" không phải vần.', 'Đúng — vần "ươi" mang dấu thành "ười".']),
  ]),

  M(20, 'Vần khó: /iên/ · /uôn/ · /ươn/', [
    Q('"Tiền" có vần?', ['iề (thiếu n)', 'iên', 'ti (chưa có âm cuối)', 't (âm đầu)'], 1, 'Vần "iên".', ['Sai — "iề" thiếu âm cuối "n".', 'Đúng — vần là "iên".', 'Sai — "ti" thiếu phần âm cuối.', 'Sai — "t" là âm đầu, không phải vần.']),
    Q('"Buôn" có vần?', ['uô (thiếu n)', 'b (âm đầu)', 'uôn', 'bu (thiếu mũ và n)'], 2, 'Vần "uôn".', ['Sai — "uô" thiếu âm cuối "n".', 'Sai — "b" là âm đầu, không phải vần.', 'Đúng — vần là "uôn".', 'Sai — "bu" không phải vần.']),
    Q('"Vườn" có vần?', ['ườ (thiếu n)', 'v (âm đầu)', 'vu (thiếu ơ và n)', 'ươn'], 3, 'Vần "ươn".', ['Sai — "ườ" thiếu âm cuối "n".', 'Sai — "v" là âm đầu, không phải vần.', 'Sai — "vu" không phải vần.', 'Đúng — vần "ươn" mang dấu thành "ườn".']),
    Q('"Hiền" có vần?', ['iề (thiếu n)', 'h (âm đầu)', 'hi (thiếu âm cuối)', 'iên'], 3, 'Vần "iên".', ['Sai — "iề" thiếu âm cuối "n".', 'Sai — "h" là âm đầu, không phải vần.', 'Sai — "hi" thiếu phần sau.', 'Đúng — vần "iên" mang dấu thành "iền".']),
    Q('"Muốn" có vần?', ['mu (thiếu mũ và n)', 'uôn', 'm (âm đầu)', 'uố (thiếu n)'], 1, 'Vần "uôn".', ['Sai — "mu" không phải vần.', 'Đúng — vần "uôn" mang dấu thành "uốn".', 'Sai — "m" là âm đầu, không phải vần.', 'Sai — "uố" thiếu âm cuối "n".']),
  ]),

  M(21, 'Vần khó: /oan/ · /oat/ · /uân/ · /uât/', [
    Q('"Toàn" có vần?', ['oan', 'oà (thiếu n)', 't (âm đầu)', 'to (thiếu a và n)'], 0, 'Vần "oan".', ['Đúng — vần "oan" mang dấu thành "oàn".', 'Sai — "oà" thiếu âm cuối "n".', 'Sai — "t" là âm đầu, không phải vần.', 'Sai — "to" không phải vần.']),
    Q('"Hoạt" có vần?', ['ho (thiếu a và t)', 'oat', 'h (âm đầu)', 'oạ (thiếu t)'], 1, 'Vần "oat".', ['Sai — "ho" không phải vần.', 'Đúng — vần "oat" mang dấu thành "oạt".', 'Sai — "h" là âm đầu, không phải vần.', 'Sai — "oạ" thiếu âm cuối "t".']),
    Q('"Tuần" có vần?', ['t (âm đầu)', 'uầ (thiếu n)', 'uân', 'tu (thiếu â và n)'], 2, 'Vần "uân".', ['Sai — "t" là âm đầu, không phải vần.', 'Sai — "uầ" thiếu âm cuối "n".', 'Đúng — vần "uân" mang dấu thành "uần".', 'Sai — "tu" không phải vần.']),
    Q('"Thuật" có vần?', ['uât', 'thu (thiếu â và t)', 'th (âm đầu)', 'uậ (thiếu t)'], 0, 'Vần "uât".', ['Đúng — vần "uât" mang dấu thành "uật".', 'Sai — "thu" không phải vần.', 'Sai — "th" là âm đầu, không phải vần.', 'Sai — "uậ" thiếu âm cuối "t".']),
    Q('Tiếng nào có vần "oan"?', ['tiếng hoá', 'tiếng hoà', 'tiếng hối', 'hoan'], 3, '"hoan" → "oan".', ['Sai — "hoá" có vần "oa".', 'Sai — "hoà" có vần "oa".', 'Sai — "hối" có vần "ôi".', 'Đúng — "hoan" có vần "oan".']),
  ]),

  // Tuần 22 — nghỉ Tết
  M(22, 'Nghỉ Tết (đọc nhẹ về Tết)', [
    Q('Tết Nguyên đán là Tết của?', ['Người Việt và một số nước Á Đông', 'Người Mỹ', 'Người Đức', 'Người Pháp'], 0, 'Tết cổ truyền VN và một số nước châu Á.', ['Đúng — Tết là của người Việt và vài nước Á Đông.', 'Sai — người Mỹ không đón Tết Nguyên đán.', 'Sai — người Đức không đón Tết Nguyên đán.', 'Sai — người Pháp không đón Tết Nguyên đán.']),
    Q('Cây hoa đặc trưng miền Bắc dịp Tết là?', ['Hoa cúc', 'Hoa đào', 'Hoa hồng', 'Hoa mai'], 1, 'Hoa đào miền Bắc.', ['Sai — hoa cúc nở quanh năm, không riêng Tết.', 'Đúng — miền Bắc chơi hoa đào hồng dịp Tết.', 'Sai — hoa hồng không phải hoa Tết miền Bắc.', 'Sai — hoa mai là của miền Nam.']),
    Q('Cây hoa đặc trưng miền Nam dịp Tết là?', ['Hoa lay-ơn', 'Hoa mai', 'Hoa lan', 'Hoa đào'], 1, 'Hoa mai vàng miền Nam.', ['Sai — hoa lay-ơn không phải hoa Tết miền Nam.', 'Đúng — miền Nam chơi hoa mai vàng dịp Tết.', 'Sai — hoa lan không phải hoa Tết tiêu biểu.', 'Sai — hoa đào là của miền Bắc.']),
    Q('Bánh chưng vuông tượng trưng cho?', ['Mặt trăng', 'Đất', 'Núi rừng', 'Mặt trời'], 1, 'Vuông tượng cho ĐẤT.', ['Sai — mặt trăng không liên quan bánh chưng.', 'Đúng — bánh chưng vuông tượng trưng cho Đất.', 'Sai — bánh chưng không tượng trưng núi rừng.', 'Sai — bánh dày tròn mới chỉ Trời.']),
    Q('"Chúc mừng năm mới" là lời?', ['Chào hỏi bình thường', 'Lời xin lỗi', 'Lời chia tay', 'Chúc Tết'], 3, 'Lời chúc đầu năm.', ['Sai — đây là lời chúc, không phải chào hỏi thường.', 'Sai — đây không phải lời xin lỗi.', 'Sai — đây không phải lời chia tay.', 'Đúng — đó là lời chúc Tết đầu năm.']),
  ]),

  M(23, 'Đọc đoạn: Cây bàng sân trường', [
    Q('Cây bàng thường được trồng ở đâu?', ['Sân trường, lề đường', 'Trong nhà', 'Trên giường', 'Trong tủ'], 0, 'Bàng cho bóng mát.', ['Đúng — cây bàng trồng ở sân trường, lề đường cho mát.', 'Sai — cây bàng to, không trồng trong nhà.', 'Sai — không ai trồng cây trên giường.', 'Sai — không thể trồng cây trong tủ.']),
    Q('Mùa hè, lá bàng có màu?', ['Vàng tươi', 'Đỏ rực', 'Nâu sẫm', 'Xanh'], 3, 'Mùa hè lá xanh.', ['Sai — lá vàng là vào mùa thu.', 'Sai — lá đỏ là vào mùa thu.', 'Sai — lá nâu là khi sắp rụng.', 'Đúng — mùa hè lá bàng xanh tốt.']),
    Q('Mùa thu, lá bàng chuyển màu?', ['Vẫn xanh đậm', 'Tím nhạt', 'Vàng – đỏ', 'Nâu sẫm rồi rụng'], 2, 'Đỏ vàng rụng.', ['Sai — mùa thu lá không còn xanh đậm.', 'Sai — lá bàng không chuyển tím.', 'Đúng — mùa thu lá bàng chuyển vàng rồi đỏ.', 'Sai — nâu sẫm là khi đã rụng, mùa đông.']),
    Q('Dưới gốc bàng, em thường làm gì giờ ra chơi?', ['Học bài', 'Cãi nhau', 'Ngồi nghịch lá rụng', 'Vui chơi cùng bạn'], 3, 'Vui chơi cùng bạn.', ['Sai — giờ ra chơi để nghỉ, không học bài.', 'Sai — không nên cãi nhau với bạn.', 'Sai — nghịch lá một mình chưa vui bằng chơi cùng bạn.', 'Đúng — giờ ra chơi em vui chơi cùng bạn dưới gốc bàng.']),
    Q('Bài đọc khuyên em điều gì?', ['Chặt cây', 'Yêu quý cây xanh', 'Không tưới nước', 'Bẻ cành'], 1, 'Yêu và bảo vệ cây.', ['Sai — không được chặt cây.', 'Đúng — bài khuyên em yêu quý cây xanh.', 'Sai — cây cần được tưới nước.', 'Sai — không được bẻ cành cây.']),
  ]),

  M(24, 'Đọc đoạn: Bạn của em', [
    Q('Bạn thân là người?', ['Người lạ', 'Gần gũi, chia sẻ với em', 'Ghét em', 'Chỉ chơi 1 lần'], 1, 'Bạn thân: gần gũi, sẻ chia.', ['Sai — bạn thân không phải người lạ.', 'Đúng — bạn thân gần gũi và chia sẻ với em.', 'Sai — người ghét em không phải bạn thân.', 'Sai — bạn thân chơi với em lâu dài.']),
    Q('Khi bạn buồn, em nên?', ['An ủi và lắng nghe', 'Tránh xa, kệ bạn', 'Cười nhạo', 'Mách cô'], 0, 'An ủi, sẻ chia.', ['Đúng — em an ủi và lắng nghe khi bạn buồn.', 'Sai — không nên tránh xa bạn lúc bạn buồn.', 'Sai — không được cười nhạo bạn.', 'Sai — bạn buồn không cần mách cô.']),
    Q('Bạn quên bút, em nên?', ['Không cho mượn', 'Mách cô', 'Cho bạn mượn bút', 'Cười bạn'], 2, 'Cho mượn để giúp bạn.', ['Sai — nên giúp bạn, không từ chối.', 'Sai — chuyện nhỏ này không cần mách cô.', 'Đúng — em cho bạn mượn bút để giúp bạn.', 'Sai — không được cười bạn.']),
    Q('"Tình bạn" được xây dựng từ?', ['Sự ghét bỏ', 'Sự yêu thương và tin cậy', 'Sự đua tranh', 'Sự xa lánh'], 1, 'Yêu thương + tin cậy.', ['Sai — ghét bỏ không tạo nên tình bạn.', 'Đúng — tình bạn xây từ yêu thương và tin cậy.', 'Sai — đua tranh không phải tình bạn.', 'Sai — xa lánh thì không có tình bạn.']),
    Q('Khi chơi cùng bạn, em không nên?', ['Cười với bạn', 'Chia sẻ kẹo', 'Cùng học bài', 'Tranh giành đồ chơi'], 3, 'Không tranh giành.', ['Sai — cười với bạn là điều vui, nên làm.', 'Sai — chia sẻ kẹo là điều tốt.', 'Sai — cùng học bài là điều nên làm.', 'Đúng — không nên tranh giành đồ chơi với bạn.']),
  ]),

  M(25, 'Chính tả nghe – viết (1)', [
    Q('"Em yêu trường em." — có mấy tiếng?', ['4', '6', '5', '3'], 0, 'em / yêu / trường / em → 4 tiếng.', ['Đúng — "em", "yêu", "trường", "em" là 4 tiếng.', 'Sai — đếm thừa rồi, chỉ có 4 tiếng.', 'Sai — câu chỉ có 4 tiếng thôi.', 'Sai — đếm thiếu một tiếng rồi.']),
    Q('Tiếng "trường" gồm âm đầu + vần?', ['tru + ờng', 'tr + ường', 't + rường', 'tr + ường (đúng)'], 1, 'Âm đầu "tr" + vần "ường".', ['Sai — tách sai, âm đầu là "tr" không phải "tru".', 'Đúng — âm đầu "tr" + vần "ường".', 'Sai — âm đầu là "tr", không tách rời "t".', 'Sai — cách này lặp lại, đáp án đúng là "tr + ường".']),
    Q('"Chiều thứ Bảy" — chữ "B" trong "Bảy" viết hoa vì?', ['Đúng quy tắc viết Hoa thứ', 'Đầu câu', 'Sau dấu phẩy', 'Tên riêng (thứ trong tuần đầu câu)'], 0, 'Tên các thứ trong tuần thường viết hoa.', ['Đúng — tên các thứ trong tuần thường viết hoa.', 'Sai — "Bảy" không đứng đầu câu.', 'Sai — trước "Bảy" không có dấu phẩy.', 'Sai — thứ không phải tên riêng theo cách này.']),
    Q('Chính tả: "con … nhỏ" — điền', ['Mèo (viết hoa M)', 'meo (không dấu)', 'mèo', 'mẻo (sai dấu hỏi)'], 2, '"con mèo nhỏ".', ['Sai — giữa câu không viết hoa "Mèo".', 'Sai — "meo" thiếu dấu huyền.', 'Đúng — viết "mèo" trong "con mèo nhỏ".', 'Sai — "mẻo" sai dấu, phải là dấu huyền.']),
    Q('Chính tả: "cây … xanh" — điền', ['báng (sai dấu sắc)', 'bang (không dấu)', 'bàng', 'bạng (sai dấu nặng)'], 2, '"cây bàng xanh".', ['Sai — "báng" sai dấu, phải là dấu huyền.', 'Sai — "bang" thiếu dấu huyền.', 'Đúng — viết "bàng" trong "cây bàng xanh".', 'Sai — "bạng" sai dấu, phải là dấu huyền.']),
  ]),

  M(26, 'Chính tả nghe – viết (2)', [
    Q('Tiếng nào VIẾT đúng?', ['ngành', 'ngàng (sai dấu huyền)', 'nghành', 'nghànhh'], 0, '"ngành" đúng.', ['Đúng — "ngành" viết "ng" trước "a" là đúng.', 'Sai — "ngàng" sai chính tả.', 'Sai — trước "a" phải dùng "ng", không phải "ngh".', 'Sai — "nghànhh" thừa chữ "h".']),
    Q('Tiếng nào VIẾT đúng?', ['kệm (sai dấu nặng)', 'kẻm (sai dấu hỏi)', 'kẹm (sai dấu nặng)', 'kẽm'], 3, '"kẽm" (kim loại).', ['Sai — "kệm" sai dấu, phải là dấu ngã.', 'Sai — "kẻm" sai, dễ nhầm hỏi với ngã.', 'Sai — "kẹm" sai dấu, phải là dấu ngã.', 'Đúng — "kẽm" mang dấu ngã là đúng.']),
    Q('Tiếng nào VIẾT đúng?', ['cá sáu', 'cá xáu', 'cá sấu', 'cá xấu'], 2, '"cá sấu" đúng chính tả.', ['Sai — "sáu" sai dấu, phải là dấu mũ "ấ".', 'Sai — "xáu" sai cả âm đầu lẫn dấu.', 'Đúng — "cá sấu" viết "s" và dấu mũ là đúng.', 'Sai — phải dùng "s", không phải "x".']),
    Q('"Quả …" — điền chữ phù hợp', ['chuối', 'chuộti', 'chuổi (sai dấu hỏi)', 'chuồi (sai dấu huyền)'], 0, '"quả chuối".', ['Đúng — viết "chuối" trong "quả chuối".', 'Sai — "chuộti" viết sai, thừa chữ.', 'Sai — "chuổi" sai dấu, phải là dấu sắc.', 'Sai — "chuồi" sai dấu, phải là dấu sắc.']),
    Q('"Đi …" (mặc vào chân) — điền', ['rày (sai âm đầu r)', 'giày', 'giáy (sai dấu sắc)', 'dày (sai âm đầu d)'], 1, '"đi giày".', ['Sai — phải dùng "gi", không phải "r".', 'Đúng — viết "giày" trong "đi giày".', 'Sai — "giáy" sai dấu, phải là dấu huyền.', 'Sai — phải dùng "gi", không phải "d".']),
  ]),

  M(27, 'Từ chỉ sự vật · Đồ vật quen thuộc', [
    Q('Đâu là TỪ chỉ đồ dùng học tập?', ['Cái thìa', 'Cái bút', 'Cái nồi', 'Cái chảo'], 1, 'Bút là đồ dùng học tập.', ['Sai — cái thìa là đồ dùng ăn uống.', 'Đúng — cái bút là đồ dùng học tập.', 'Sai — cái nồi là đồ dùng nấu ăn.', 'Sai — cái chảo là đồ dùng nhà bếp.']),
    Q('Đâu là TỪ chỉ con vật?', ['Cái áo', 'Cái bàn', 'Con gà', 'Cây cam'], 2, '"Con gà" chỉ con vật.', ['Sai — cái áo là đồ vật.', 'Sai — cái bàn là đồ vật.', 'Đúng — con gà là từ chỉ con vật.', 'Sai — cây cam là cây cối.']),
    Q('"Cô giáo" là từ chỉ?', ['Người', 'Con vật', 'Đồ vật', 'Cây cối'], 0, 'Chỉ người.', ['Đúng — "cô giáo" là từ chỉ người.', 'Sai — cô giáo không phải con vật.', 'Sai — cô giáo không phải đồ vật.', 'Sai — cô giáo không phải cây cối.']),
    Q('"Quả táo" là từ chỉ?', ['Chỉ người', 'Đồ vật', 'Cây cối/quả', 'Con vật'], 2, 'Chỉ quả (cây cối).', ['Sai — quả táo không phải người.', 'Sai — quả táo không phải đồ vật.', 'Đúng — "quả táo" chỉ quả của cây cối.', 'Sai — quả táo không phải con vật.']),
    Q('Đâu KHÔNG phải đồ dùng học tập?', ['Bút chì', 'Cặp sách', 'Quyển vở', 'Cái chảo'], 3, 'Cái chảo là đồ bếp.', ['Sai — bút chì là đồ dùng học tập.', 'Sai — cặp sách là đồ dùng học tập.', 'Sai — quyển vở là đồ dùng học tập.', 'Đúng — cái chảo là đồ bếp, không phải đồ học tập.']),
  ]),

  M(28, 'Từ chỉ hoạt động', [
    Q('Từ nào chỉ HOẠT ĐỘNG?', ['tiếng đẹp', 'tiếng đỏ', 'chạy', 'tiếng cao'], 2, '"chạy" là hoạt động.', ['Sai — "đẹp" chỉ đặc điểm.', 'Sai — "đỏ" chỉ màu sắc.', 'Đúng — "chạy" là từ chỉ hoạt động.', 'Sai — "cao" chỉ đặc điểm.']),
    Q('Em đến trường để?', ['chơi với bạn', 'ngủ trưa', 'ăn quà vặt', 'học'], 3, 'Đi học.', ['Sai — chơi chỉ là lúc ra chơi, không phải mục đích chính.', 'Sai — em không đến trường để ngủ trưa.', 'Sai — em không đến trường để ăn quà.', 'Đúng — em đến trường để học.']),
    Q('"Đọc sách" là hoạt động của?', ['Mắt và tay', 'Chân và miệng', 'Đầu và tai', 'Tai và mũi'], 0, 'Mắt nhìn, tay cầm.', ['Đúng — mắt nhìn chữ, tay cầm sách.', 'Sai — đọc sách không dùng chân.', 'Sai — đọc sách không chủ yếu dùng tai.', 'Sai — đọc sách không dùng mũi.']),
    Q('Hoạt động nào tốt cho sức khỏe?', ['Ngồi xem TV cả ngày', 'Tập thể dục', 'Ăn nhiều bánh kẹo', 'Thức khuya'], 1, 'Thể dục tốt cho sức khoẻ.', ['Sai — xem TV cả ngày không tốt cho sức khỏe.', 'Đúng — tập thể dục giúp khỏe mạnh.', 'Sai — ăn nhiều bánh kẹo dễ sâu răng.', 'Sai — thức khuya hại sức khỏe.']),
    Q('Hoạt động nào giúp em sạch sẽ?', ['Rửa tay', 'Chơi đất', 'Cãi nhau', 'Ngủ nhiều cả ngày'], 0, 'Rửa tay sạch.', ['Đúng — rửa tay giúp em sạch sẽ.', 'Sai — chơi đất làm tay bẩn.', 'Sai — cãi nhau không liên quan sạch sẽ.', 'Sai — ngủ nhiều không làm em sạch.']),
  ]),

  M(29, 'Từ chỉ đặc điểm (màu sắc, hình dáng)', [
    Q('Từ nào chỉ MÀU SẮC?', ['đỏ', 'tiếng ăn', 'tiếng cao', 'tiếng chạy'], 0, '"đỏ" là màu.', ['Đúng — "đỏ" là từ chỉ màu sắc.', 'Sai — "ăn" chỉ hoạt động.', 'Sai — "cao" chỉ hình dáng.', 'Sai — "chạy" chỉ hoạt động.']),
    Q('Từ nào chỉ HÌNH DÁNG?', ['vàng (màu sắc)', 'ngủ (hoạt động)', 'cười (hoạt động)', 'tròn'], 3, '"tròn" – hình dáng.', ['Sai — "vàng" chỉ màu sắc.', 'Sai — "ngủ" chỉ hoạt động.', 'Sai — "cười" chỉ hoạt động.', 'Đúng — "tròn" là từ chỉ hình dáng.']),
    Q('Lá cây thường có màu?', ['Màu Đen', 'Màu Trắng', 'Xanh', 'Màu Tím'], 2, 'Màu xanh lá.', ['Sai — lá cây không có màu đen.', 'Sai — lá cây không có màu trắng.', 'Đúng — lá cây thường có màu xanh.', 'Sai — lá cây không có màu tím.']),
    Q('Mặt trời có màu gì (khi nhìn)?', ['Màu Xanh', 'Màu Đen', 'Đỏ/Vàng', 'Màu Tím'], 2, 'Đỏ hoặc vàng.', ['Sai — mặt trời không có màu xanh.', 'Sai — mặt trời không có màu đen.', 'Đúng — mặt trời nhìn thấy màu đỏ hoặc vàng.', 'Sai — mặt trời không có màu tím.']),
    Q('Quả cam khi chín có màu?', ['Xanh (lúc còn non)', 'Cam (vàng cam)', 'Màu Tím', 'Đỏ thẫm'], 1, 'Màu cam.', ['Sai — xanh là lúc cam còn non.', 'Đúng — quả cam chín có màu cam (vàng cam).', 'Sai — quả cam không có màu tím.', 'Sai — quả cam không có màu đỏ thẫm.']),
  ]),

  M(30, 'Câu kể · Câu hỏi · Câu cảm', [
    Q('"Em đi học." là câu?', ['Cầu khiến', 'Kể', 'Câu Cảm', 'Câu Hỏi'], 1, 'Kết bằng dấu chấm → câu kể.', ['Sai — câu này không sai khiến ai.', 'Đúng — câu kết bằng dấu chấm là câu kể.', 'Sai — câu này không bộc lộ cảm xúc.', 'Sai — câu này không có dấu hỏi.']),
    Q('"Bạn tên là gì?" là câu?', ['Câu Kể', 'Hỏi', 'Câu Khiến', 'Câu Cảm'], 1, 'Dấu hỏi → câu hỏi.', ['Sai — câu có dấu hỏi, không phải câu kể.', 'Đúng — câu có dấu hỏi là câu hỏi.', 'Sai — câu này không sai khiến.', 'Sai — câu này không bộc lộ cảm xúc.']),
    Q('"Ôi đẹp quá!" là câu?', ['Cảm', 'Câu Khiến', 'Câu Hỏi', 'Câu Kể'], 0, 'Bộc lộ cảm xúc → câu cảm.', ['Đúng — câu bộc lộ cảm xúc là câu cảm.', 'Sai — câu này không sai khiến.', 'Sai — câu này không có dấu hỏi.', 'Sai — câu này không phải câu kể.']),
    Q('Để hỏi tuổi bạn, em nói?', ['Bạn đi đâu đấy?', 'Bạn bao nhiêu tuổi?', 'Bạn ở đâu?', 'Bạn ăn gì?'], 1, 'Câu hỏi tuổi.', ['Sai — câu này hỏi nơi đi, không hỏi tuổi.', 'Đúng — "Bạn bao nhiêu tuổi?" hỏi đúng tuổi.', 'Sai — câu này hỏi nơi ở.', 'Sai — câu này hỏi món ăn.']),
    Q('Câu "Ngày mai trời mưa." kết thúc bằng?', ['dấu ?', 'dấu !', ',', '.'], 3, 'Dấu chấm.', ['Sai — đây không phải câu hỏi.', 'Sai — đây không phải câu cảm.', 'Sai — dấu phẩy không kết thúc câu.', 'Đúng — câu kể kết thúc bằng dấu chấm.']),
  ]),

  M(31, 'Kể chuyện ngắn: Rùa và Thỏ', [
    Q('Trong truyện, ai chạy nhanh hơn?', ['Bằng nhau', 'Không ai', 'Con Rùa', 'Thỏ'], 3, 'Thỏ vốn nhanh.', ['Sai — hai con không chạy bằng nhau.', 'Sai — có một con chạy nhanh hơn.', 'Sai — rùa chậm hơn thỏ.', 'Đúng — thỏ vốn chạy nhanh hơn rùa.']),
    Q('Vì sao Thỏ thua Rùa?', ['Thỏ ốm', 'Rùa khỏe hơn', 'Thỏ chủ quan, ngủ quên', 'Rùa nhanh hơn'], 2, 'Thỏ kiêu căng + ngủ quên.', ['Sai — thỏ không ốm.', 'Sai — rùa không khỏe hơn thỏ.', 'Đúng — thỏ chủ quan, ngủ quên nên thua.', 'Sai — rùa chạy chậm hơn thỏ.']),
    Q('Bài học của truyện là?', ['Đừng chạy', 'Đừng ngủ', 'Đừng kiên trì', 'Kiêu căng sẽ thua; kiên trì sẽ thắng'], 3, 'Bài học về tính kiêu căng.', ['Sai — bài học không phải là đừng chạy.', 'Sai — bài học không phải đừng ngủ.', 'Sai — kiên trì là điều tốt nên giữ.', 'Đúng — kiêu căng sẽ thua, kiên trì sẽ thắng.']),
    Q('Rùa chiến thắng nhờ?', ['Kiên trì, cố gắng', 'Bạn giúp', 'Bí mật', 'May mắn'], 0, 'Kiên trì + bền bỉ.', ['Đúng — rùa thắng nhờ kiên trì, cố gắng.', 'Sai — không có bạn nào giúp rùa.', 'Sai — rùa không dùng bí mật gì.', 'Sai — rùa thắng nhờ cố gắng, không phải may mắn.']),
    Q('Sau cuộc thi, Thỏ thấy?', ['Vui mừng', 'Bình thường', 'Xấu hổ vì chủ quan', 'Tự hào'], 2, 'Xấu hổ.', ['Sai — thỏ thua nên không vui mừng.', 'Sai — thỏ thua nên không thấy bình thường.', 'Đúng — thỏ xấu hổ vì đã chủ quan.', 'Sai — thỏ thua thì không tự hào.']),
  ]),

  M(32, 'Đọc – hiểu đoạn ngắn (1)', [
    Q('Đoạn: "Mẹ đi chợ về. Mẹ mua cho em một quả táo đỏ." — Mẹ mua gì cho em?', ['Quả cam', 'Quả táo', 'Quả lê', 'Quả chuối'], 1, 'Quả táo.', ['Sai — đoạn nói mẹ mua quả táo, không phải cam.', 'Đúng — mẹ mua cho em quả táo đỏ.', 'Sai — đoạn không nhắc quả lê.', 'Sai — đoạn không nhắc quả chuối.']),
    Q('Quả táo trong đoạn có màu gì?', ['Đỏ', 'Xanh lá', 'Vàng đậm', 'Tím đen'], 0, 'Đỏ.', ['Đúng — đoạn nói quả táo màu đỏ.', 'Sai — đoạn không nói màu xanh.', 'Sai — đoạn không nói màu vàng.', 'Sai — đoạn không nói màu tím.']),
    Q('Ai đi chợ về?', ['Em bé', 'Bà ngoại', 'Mẹ', 'Bố của em'], 2, 'Mẹ.', ['Sai — đoạn nói mẹ đi chợ, không phải em.', 'Sai — đoạn không nhắc bà ngoại.', 'Đúng — mẹ là người đi chợ về.', 'Sai — đoạn không nhắc bố.']),
    Q('Em cảm thấy thế nào khi nhận quà?', ['Tức giận', 'Bình thường', 'Buồn vì phải cảm ơn', 'Vui'], 3, 'Vui.', ['Sai — nhận quà thì không tức giận.', 'Sai — nhận quà thường thấy vui, không bình thường.', 'Sai — cảm ơn là điều vui, không buồn.', 'Đúng — em vui khi nhận được quà.']),
    Q('Em nên nói gì với mẹ?', ['Chạy đi chơi', 'Khóc to', 'Không nói', 'Cảm ơn mẹ'], 3, 'Cảm ơn mẹ.', ['Sai — nhận quà nên cảm ơn trước khi đi chơi.', 'Sai — nhận quà không khóc.', 'Sai — nhận quà nên nói lời cảm ơn.', 'Đúng — em nên nói lời cảm ơn mẹ.']),
  ]),

  M(33, 'Đọc – hiểu đoạn ngắn (2)', [
    Q('Đoạn: "Sáng nay trời nắng đẹp. Em đi học cùng bạn Lan." — Em đi học với ai?', ['Bà ngoại', 'Em một mình', 'Bạn Lan', 'Mẹ của em'], 2, 'Bạn Lan.', ['Sai — đoạn không nhắc bà ngoại.', 'Sai — đoạn nói em đi cùng bạn, không một mình.', 'Đúng — em đi học cùng bạn Lan.', 'Sai — đoạn không nói đi cùng mẹ.']),
    Q('Thời tiết trong đoạn?', ['Bão lớn', 'Nắng đẹp', 'Mưa nhẹ', 'Lạnh giá có tuyết'], 1, 'Nắng đẹp.', ['Sai — đoạn không nói có bão.', 'Đúng — đoạn nói trời nắng đẹp.', 'Sai — đoạn không nói trời mưa.', 'Sai — đoạn không nói trời lạnh có tuyết.']),
    Q('Em đi đâu?', ['Đi học', 'Đi ngủ', 'Đi chơi', 'Đi chợ'], 0, 'Đi học.', ['Đúng — đoạn nói em đi học.', 'Sai — buổi sáng em đi học, không đi ngủ.', 'Sai — đoạn nói đi học, không đi chơi.', 'Sai — đoạn không nói đi chợ.']),
    Q('"Sáng nay" là buổi nào?', ['Buổi tối', 'Buổi sáng', 'Buổi chiều', 'Buổi trưa'], 1, 'Buổi sáng.', ['Sai — "sáng nay" không phải buổi tối.', 'Đúng — "sáng nay" là buổi sáng.', 'Sai — "sáng nay" không phải buổi chiều.', 'Sai — "sáng nay" không phải buổi trưa.']),
    Q('Tên bạn trong đoạn viết hoa vì?', ['Đúng quy tắc đẹp', 'Sau dấu chấm', 'Đầu câu', 'Là tên riêng'], 3, 'Tên riêng → viết hoa.', ['Sai — không phải vì cho đẹp.', 'Sai — "Lan" không đứng sau dấu chấm.', 'Sai — "Lan" không đứng đầu câu.', 'Đúng — "Lan" là tên riêng nên viết hoa.']),
  ]),

  M(34, 'Ôn tập cuối HK2 (1)', [
    Q('Tiếng "trường" có âm đầu là?', ['tr', 'ờng (vần)', 't (chỉ một chữ)', 'r (chỉ một chữ)'], 0, 'Âm đầu "tr".', ['Đúng — âm đầu là "tr" (ghép hai chữ).', 'Sai — "ờng" là vần, không phải âm đầu.', 'Sai — âm đầu là "tr", không chỉ "t".', 'Sai — âm đầu là "tr", không chỉ "r".']),
    Q('Cuối câu hỏi dùng dấu?', ['?', '.', 'dấu !', ','], 0, 'Dấu hỏi.', ['Đúng — câu hỏi kết thúc bằng dấu hỏi (?).', 'Sai — dấu chấm dùng cho câu kể.', 'Sai — dấu than dùng cho câu cảm.', 'Sai — dấu phẩy không kết thúc câu.']),
    Q('"Con mèo" – từ "con mèo" chỉ?', ['Con vật', 'Chỉ người', 'Chỉ cây cối', 'Đồ vật'], 0, 'Con vật.', ['Đúng — "con mèo" là từ chỉ con vật.', 'Sai — con mèo không phải người.', 'Sai — con mèo không phải cây cối.', 'Sai — con mèo không phải đồ vật.']),
    Q('"Đỏ" là từ chỉ?', ['Tên riêng', 'Hoạt động', 'Màu sắc', 'Số đếm'], 2, 'Màu sắc.', ['Sai — "đỏ" không phải tên riêng.', 'Sai — "đỏ" không chỉ hoạt động.', 'Đúng — "đỏ" là từ chỉ màu sắc.', 'Sai — "đỏ" không phải số đếm.']),
    Q('Tên riêng người viết?', ['Hoa chữ cái đầu', 'In đậm', 'Thường', 'Gạch chân'], 0, 'Hoa chữ cái đầu mỗi tiếng.', ['Đúng — tên người viết hoa chữ cái đầu mỗi tiếng.', 'Sai — không cần in đậm.', 'Sai — tên riêng không viết thường.', 'Sai — không cần gạch chân.']),
    Q('"Bàn" có vần?', ['b (âm đầu)', 'àn', 'an (chưa có dấu)', 'ba (thiếu âm cuối)'], 1, 'Vần "àn".', ['Sai — "b" là âm đầu, không phải vần.', 'Đúng — vần là "àn" (có dấu huyền).', 'Sai — vần đã mang dấu huyền là "àn".', 'Sai — "ba" thiếu âm cuối, không phải vần.']),
  ]),

  M(35, 'Ôn tập cuối HK2 (2)', [
    Q('Câu "Em yêu mẹ." là câu?', ['Câu Khiến', 'Kể', 'Câu Cảm', 'Câu Hỏi'], 1, 'Câu kể.', ['Sai — câu này không sai khiến ai.', 'Đúng — câu kết bằng dấu chấm là câu kể.', 'Sai — câu này không bộc lộ cảm xúc mạnh.', 'Sai — câu này không có dấu hỏi.']),
    Q('Tiếng "chuối" có vần?', ['ch (âm đầu)', 'chu (thiếu âm cuối)', 'ối (thiếu u)', 'uôi'], 3, 'Vần "uôi".', ['Sai — "ch" là âm đầu, không phải vần.', 'Sai — "chu" thiếu phần âm cuối.', 'Sai — "ối" thiếu chữ "u".', 'Đúng — vần "uôi" mang dấu thành "uối".']),
    Q('Đâu là viết ĐÚNG chính tả?', ['quả gứa', 'quả zứa', 'quả giứa', 'quả dứa'], 3, '"quả dứa" đúng.', ['Sai — "gứa" sai âm đầu.', 'Sai — không có chữ "z" trong tiếng Việt.', 'Sai — "giứa" sai âm đầu.', 'Đúng — "quả dứa" viết "d" là đúng.']),
    Q('Đầu câu KỂ viết?', ['Thường', 'In nghiêng', 'In đậm', 'Hoa'], 3, 'Chữ đầu viết hoa.', ['Sai — chữ đầu câu không viết thường.', 'Sai — không cần in nghiêng.', 'Sai — không cần in đậm.', 'Đúng — chữ đầu câu luôn viết hoa.']),
    Q('Sắp xếp thành câu: "yêu / em / cô"', ['Em yêu cô.', 'Cô yêu em.', 'Yêu em cô.', 'Cả hai đều đúng tuỳ ngữ cảnh'], 3, 'Cả "Em yêu cô." và "Cô yêu em." đều là câu đúng.', ['Sai — "Em yêu cô." đúng nhưng chưa đủ, còn cách khác.', 'Sai — "Cô yêu em." đúng nhưng chưa đủ, còn cách khác.', 'Sai — "Yêu em cô." sai trật tự từ.', 'Đúng — cả "Em yêu cô." và "Cô yêu em." đều đúng.']),
    Q('Bài học cuối năm: em nên?', ['Quên hết kiến thức', 'Bỏ học', 'Chỉ chơi', 'Ôn lại bài thường xuyên'], 3, 'Ôn bài thường xuyên.', ['Sai — không nên quên kiến thức đã học.', 'Sai — không được bỏ học.', 'Sai — không chỉ chơi mà quên học.', 'Đúng — em nên ôn lại bài thường xuyên.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Hành trang Tiếng Việt vào Lớp 2', [
    Q('Bảng chữ cái tiếng Việt có bao nhiêu chữ cái?', ['24', '29', '26', '32'], 1, 'Tiếng Việt có 29 chữ cái.', ['Sai — đếm thiếu rồi, tiếng Việt nhiều chữ cái hơn.', 'Đúng — bảng chữ cái tiếng Việt có 29 chữ cái.', 'Sai — 26 là bảng chữ cái tiếng Anh.', 'Sai — đếm thừa rồi.']),
    Q('Tiếng Việt có mấy dấu thanh?', ['4', '5', '6', '7'], 2, 'Ngang, huyền, sắc, hỏi, ngã, nặng — 6 thanh.', ['Sai — đếm thiếu, còn thanh hỏi và thanh ngã nữa.', 'Sai — đếm thiếu 1 thanh.', 'Đúng — ngang, huyền, sắc, hỏi, ngã, nặng: 6 thanh.', 'Sai — đếm thừa 1 thanh.']),
    Q('Tiếng "trâu" có âm đầu là gì?', ['t', 'tr', 'ch', 'th'], 1, 'Âm đầu "tr", vần "âu".', ['Sai — "t" mới là một phần, âm đầu ở đây là âm ghép.', 'Đúng — âm đầu là "tr", vần là "âu".', 'Sai — "ch" là âm đầu của tiếng khác, ví dụ "chân".', 'Sai — "th" là âm đầu của tiếng khác, ví dụ "thỏ".']),
    Q('Câu hỏi thường kết thúc bằng dấu gì?', ['Dấu chấm', 'Dấu phẩy', 'Dấu chấm than', 'Dấu chấm hỏi'], 3, 'Câu hỏi kết thúc bằng dấu chấm hỏi (?).', ['Sai — dấu chấm dùng cho câu kể.', 'Sai — dấu phẩy dùng để ngăn cách trong câu, không kết thúc câu.', 'Sai — dấu chấm than dùng cho câu cảm.', 'Đúng — câu hỏi kết thúc bằng dấu chấm hỏi (?).']),
    Q('Lên Lớp 2 em sẽ tập viết gì?', ['Chỉ viết chữ cái', 'Đoạn văn ngắn', 'Không viết nữa', 'Chỉ chép lại bài'], 1, 'Lớp 2 bắt đầu viết đoạn văn ngắn.', ['Sai — viết chữ cái em đã làm xong ở Lớp 1 rồi.', 'Đúng — Lớp 2 em sẽ tập viết đoạn văn ngắn.', 'Sai — lên lớp em còn viết nhiều hơn nữa.', 'Sai — không chỉ chép, em còn tự viết câu và đoạn của mình.']),
    Q('Cách tốt nhất để giỏi Tiếng Việt trong hè là?', ['Đọc sách mỗi ngày', 'Xem tivi cả ngày', 'Cất hết sách đi', 'Chỉ chơi điện tử'], 0, 'Đọc mỗi ngày 10 phút cũng rất tốt.', ['Đúng — đọc sách mỗi ngày, dù chỉ 10 phút, giúp em tiến bộ nhanh.', 'Sai — xem tivi cả ngày không giúp em đọc và viết tốt hơn.', 'Sai — hè vẫn nên giữ thói quen đọc sách.', 'Sai — chơi điện tử cả ngày không giúp em giỏi Tiếng Việt.']),
  ]),
];

export const P1TV_SCENARIOS = indexBy(P1TV_WEEKS);
