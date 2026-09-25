// ============================================================
// Lớp 9 · KHOA HỌC TỰ NHIÊN (KHTN) — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám CT GDPT 2018, tích hợp Vật lý + Hoá học + Sinh học.
// HK1: Hoá vô cơ (kim loại, phi kim) + Điện học.
// HK2: Hoá hữu cơ + Điện từ học + Quang học + Di truyền học.
// ID prefix: "S9KHTN-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S9KHTN', 'khtn', n, title, qs, opts);

export const S9KHTN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Kim loại — Tính chất vật lý và hoá học chung', [
    Q('Tính chất vật lý chung của kim loại?', ['Cứng, giòn', 'Có mùi đặc trưng', 'Không dẫn điện', 'Dẫn điện, dẫn nhiệt, ánh kim, dẻo'], 3, 'Kim loại có 4 tính chất vật lý đặc trưng: dẫn điện, dẫn nhiệt, ánh kim, dẻo.', [
      'Kim loại có <b>4 tính chất vật lý chung</b>: <i>dẫn điện, dẫn nhiệt, ánh kim, dẻo</i>. Nguyên nhân chung là trong mạng tinh thể kim loại có <b>các electron tự do</b> chuyển động.',
      '<ul><li><b>Dẫn điện – dẫn nhiệt</b>: electron tự do mang điện và truyền nhiệt năng.</li><li><b>Ánh kim</b>: electron tự do phản xạ ánh sáng ⇒ bề mặt sáng bóng.</li><li><b>Dẻo</b>: các lớp ion dương trượt lên nhau mà liên kết không bị phá vỡ.</li></ul>',
      'Thứ tự dẫn điện giảm dần: <code>Ag &gt; Cu &gt; Au &gt; Al &gt; Fe</code>. Các tính chất riêng (màu sắc, khối lượng riêng, độ cứng, nhiệt độ nóng chảy) lại <i>rất khác nhau</i> giữa các kim loại.',
    ], ['Sai — cứng/giòn là đặc tính của phi kim hoặc gốm; kim loại nhìn chung dẻo, dễ dát mỏng.', 'Sai — mùi đặc trưng không phải tính chất vật lý của kim loại; đây là nhầm với một số phi kim (Cl₂, S).', 'Sai — ngược hoàn toàn: kim loại dẫn điện tốt nhờ electron tự do.', 'Đúng — 4 tính chất vật lý chung: dẫn điện, dẫn nhiệt, ánh kim, dẻo.']),
    Q('Kim loại nào dẫn điện tốt nhất?', ['Ag', 'Cu (xếp thứ hai sau Ag)', 'Fe (dùng làm dây cáp truyền tải)', 'Al (kim loại nhẹ, dẫn điện khá)'], 0, 'Thứ tự dẫn điện: Ag > Cu > Au > Al > Fe… ⇒ Ag tốt nhất.', [
      'Khả năng dẫn điện phụ thuộc mật độ và độ linh động của <b>electron tự do</b>. Thứ tự dẫn điện giảm dần cần nhớ: <code>Ag &gt; Cu &gt; Au &gt; Al &gt; Fe</code>.',
      '<ul><li><b>Ag (bạc)</b> dẫn điện tốt nhất nhưng đắt ⇒ chỉ dùng trong linh kiện đặc biệt.</li><li><b>Cu (đồng)</b> đứng thứ hai, rẻ hơn ⇒ dùng làm dây điện dân dụng.</li><li><b>Al (nhôm)</b> nhẹ ⇒ dùng cho đường dây cao thế truyền tải xa.</li></ul>',
    ], ['Đúng — Ag (bạc) dẫn điện tốt nhất: Ag > Cu > Au > Al > Fe.', 'Sai — Cu đứng thứ hai, chỉ kém Ag; là lựa chọn kinh tế cho dây điện.', 'Sai — Fe dẫn điện kém hơn nhiều; dây cáp truyền tải dùng Al/Cu chứ không phải Fe.', 'Sai — Al dẫn điện khá nhưng vẫn xếp sau Ag, Cu, Au.']),
    Q('Kim loại tác dụng với phi kim tạo?', ['Bazơ tan trong nước', 'Axit tương ứng với phi kim', 'Khí hiđro thoát ra', 'Muối hoặc oxit'], 3, 'Kim loại + phi kim → muối (kl + Cl₂) hoặc oxit (kl + O₂).', [
      'Kim loại có tính <b>khử</b> (nhường electron), phi kim có tính <b>oxi hoá</b> (nhận electron) ⇒ chúng kết hợp tạo hợp chất ion.',
      '<ul><li>Kim loại + <b>O₂</b> → <b>oxit bazơ</b>: <code>3Fe + 2O₂ → Fe₃O₄</code>.</li><li>Kim loại + <b>Cl₂</b> → <b>muối clorua</b>: <code>2Fe + 3Cl₂ → 2FeCl₃</code>.</li><li>Kim loại + <b>S</b> → <b>muối sunfua</b>: <code>Fe + S → FeS</code>.</li></ul>',
      'Lưu ý: khí H₂ chỉ thoát ra khi kim loại tác dụng với <i>axit</i> hoặc <i>nước</i>, không phải khi tác dụng với phi kim.',
    ], ['Sai — bazơ sinh ra khi kim loại kiềm tác dụng với nước, không phải với phi kim.', 'Sai — axit không phải sản phẩm của kim loại + phi kim.', 'Sai — H₂ thoát ra khi kim loại + axit/nước, không phải khi tác dụng phi kim.', 'Đúng — kim loại + Cl₂ → muối clorua; kim loại + O₂ → oxit.']),
    Q('Phương trình Na + O₂ → ?', ['NaO (hoá trị I cân với O hoá trị II)', 'NaO₂ (natri superoxit)', 'Na₂O₂ (natri peroxit)', 'Na₂O'], 3, '4Na + O₂ → 2Na₂O (natri oxit).', [
      'Để viết đúng công thức oxit, dùng <b>quy tắc hoá trị</b>: Na có hoá trị <b>I</b>, O có hoá trị <b>II</b> ⇒ công thức là <code>Na₂O</code> (chéo hoá trị).',
      'Phương trình cháy của natri trong oxi: <code>4Na + O₂ → 2Na₂O</code> (natri oxit). Cần cân bằng: 4 Na đứng trước để khớp với 2 phân tử Na₂O.',
      'Các sản phẩm như peroxit (Na₂O₂) hay superoxit (NaO₂) chỉ tạo trong điều kiện đặc biệt, <i>không nằm trong yêu cầu của lớp 9</i>.',
    ], ['Sai — Na hoá trị I, O hoá trị II nên công thức phải là Na₂O, không phải NaO.', 'Sai — superoxit không phải sản phẩm thông thường khi Na cháy trong không khí ở mức lớp 9.', 'Sai — peroxit là sản phẩm điều kiện đặc biệt; sản phẩm chuẩn cần nhớ là Na₂O.', 'Đúng — 4Na + O₂ → 2Na₂O (natri oxit), cân bằng đúng hoá trị.']),
    Q('Kim loại nào nhẹ nhất?', ['Cu (khối lượng riêng 8,96 g/cm³)', 'Fe (khối lượng riêng 7,87 g/cm³)', 'Li (Liti)', 'Al (kim loại nhẹ, 2,7 g/cm³)'], 2, 'Liti có khối lượng riêng nhỏ nhất trong các kim loại (~0,53 g/cm³).', [
      '<b>Khối lượng riêng (D)</b> cho biết kim loại nặng hay nhẹ. Người ta chia: <i>kim loại nhẹ</i> (D &lt; 5 g/cm³) và <i>kim loại nặng</i> (D &gt; 5 g/cm³).',
      '<ul><li><b>Li (liti)</b>: D ≈ <code>0,53 g/cm³</code> — nhẹ nhất, nhẹ hơn cả nước.</li><li><b>Al (nhôm)</b>: D ≈ 2,7 g/cm³ — kim loại nhẹ thông dụng.</li><li><b>Fe, Cu</b>: D ≈ 7,9 và 8,96 g/cm³ — kim loại nặng.</li></ul>',
    ], ['Sai — Cu nặng (8,96 g/cm³), thuộc nhóm kim loại nặng.', 'Sai — Fe (7,87 g/cm³) cũng là kim loại nặng.', 'Đúng — Li có khối lượng riêng nhỏ nhất (~0,53 g/cm³), nhẹ nhất trong các kim loại.', 'Sai — Al nhẹ (2,7 g/cm³) nhưng vẫn nặng hơn Li nhiều lần.']),
    Q('Tại sao kim loại dẻo?', ['Vì cứng', 'Vì cấu trúc tinh thể với electron tự do và các lớp ion có thể trượt lên nhau', 'Vì có mùi', 'Vì có màu'], 1, 'Cấu trúc mạng tinh thể kim loại + electron tự do ⇒ dễ biến dạng.', [
      'Trong tinh thể kim loại, các <b>ion dương</b> sắp xếp đều đặn, xen giữa là <b>electron tự do</b> như một "lớp keo" giữ chúng lại với nhau.',
      'Khi tác dụng lực, các <i>lớp ion trượt lên nhau</i> nhưng electron tự do vẫn liên kết các lớp ⇒ kim loại <b>không bị gãy</b> mà chỉ thay đổi hình dạng (dát mỏng, kéo sợi).',
      'Đó là lý do người ta dát được vàng thành lá rất mỏng và kéo đồng thành sợi dây dài.',
    ], ['Sai — cứng không giải thích được tính dẻo; nhiều chất cứng lại giòn.', 'Đúng — các lớp ion trượt lên nhau, electron tự do giữ liên kết ⇒ kim loại dẻo.', 'Sai — mùi không liên quan đến tính dẻo.', 'Sai — màu sắc (ánh kim) là tính chất khác, không quyết định tính dẻo.']),
  ]),

  M(2, 'Dãy hoạt động hoá học của kim loại', [
    Q('Dãy hoạt động hoá học có dạng (sắp xếp giảm dần)?', ['K, Na, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au', 'Cu, Fe, Zn, Al, Mg, Na, K', 'Au, Ag, Cu, H, Fe, Zn, Al, K', 'Theo bảng tuần hoàn'], 0, 'Dãy hoạt động hoá học từ mạnh đến yếu: K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Hg, Ag, Pt, Au.', [
      '<b>Dãy hoạt động hoá học</b> sắp xếp kim loại theo chiều <i>giảm dần</i> mức độ hoạt động (khả năng nhường electron): <code>K, Na, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au</code>.',
      'Câu thần chú dễ nhớ: <i>"Khi Nào May Áo Záp Sắt Phải Hỏi Cúc Bạc Vàng"</i>.',
      '<ul><li>Kim loại đứng <b>trước H</b>: phản ứng với axit loãng giải phóng H₂.</li><li>Kim loại đứng trước đẩy được kim loại đứng sau ra khỏi <b>dung dịch muối</b>.</li><li>K, Na, Ca, Ba… (đầu dãy) phản ứng với <b>nước</b> ở nhiệt độ thường.</li></ul>',
    ], ['Đúng — đúng thứ tự giảm dần độ hoạt động, H nằm giữa, Au yếu nhất.', 'Sai — đây là thứ tự đảo ngược (yếu → mạnh), không đúng quy ước.', 'Sai — sắp xếp ngược, Au mạnh nhất là vô lý vì Au rất kém hoạt động.', 'Sai — dãy hoạt động xếp theo khả năng phản ứng, không theo vị trí bảng tuần hoàn.']),
    Q('Kim loại đứng trước H trong dãy có thể?', ['Tác dụng với dung dịch axit loãng giải phóng H₂', 'Cháy trong không khí', 'Không phản ứng', 'Chỉ tan trong nước'], 0, 'Kim loại trước H + HCl/H₂SO₄ loãng → muối + H₂.', [
      'Vị trí của <b>H</b> trong dãy hoạt động là một "mốc" quan trọng: nó chia kim loại thành hai nhóm về khả năng phản ứng với axit loãng.',
      '<ul><li>Kim loại <b>trước H</b> (K, Na, Mg, Al, Zn, Fe…) + axit loãng (HCl, H₂SO₄) → <b>muối + H₂↑</b>.</li><li>Kim loại <b>sau H</b> (Cu, Ag, Au) <i>không</i> phản ứng với axit loãng.</li></ul>',
      'Ví dụ: <code>Zn + 2HCl → ZnCl₂ + H₂↑</code> còn <code>Cu + HCl → không phản ứng</code>.',
    ], ['Đúng — kim loại trước H đẩy được H₂ ra khỏi axit loãng (HCl, H₂SO₄ loãng).', 'Sai — cháy trong không khí là phản ứng với O₂, không phải dấu hiệu đứng trước H.', 'Sai — chính vì đứng trước H nên có phản ứng với axit, không phải trơ.', 'Sai — chỉ kim loại kiềm/kiềm thổ mới tan trong nước; nhiều kim loại trước H không tan trong nước.']),
    Q('Phản ứng nào KHÔNG xảy ra?', ['Fe + H₂SO₄ → FeSO₄ + H₂', '2Al + 6HCl → 2AlCl₃ + 3H₂', 'Zn + 2HCl → ZnCl₂ + H₂', 'Cu + 2HCl → CuCl₂ + H₂'], 3, 'Cu đứng sau H ⇒ không phản ứng với HCl loãng.', [
      'Muốn biết phản ứng kim loại + axit loãng có xảy ra không, hãy xét vị trí kim loại so với <b>H</b> trong dãy hoạt động.',
      '<ul><li>Fe, Al, Zn đứng <b>trước H</b> ⇒ phản ứng được với HCl, H₂SO₄ loãng, sinh H₂.</li><li><b>Cu đứng sau H</b> ⇒ <i>không</i> phản ứng với axit loãng ⇒ phương trình Cu + HCl là sai.</li></ul>',
      'Đây là dạng câu hỏi nhận biết "phản ứng nào không xảy ra" rất hay gặp trong đề thi vào 10.',
    ], ['Sai — Fe đứng trước H nên phản ứng với H₂SO₄ loãng, phản ứng này xảy ra.', 'Sai — Al đứng trước H, phản ứng với HCl bình thường.', 'Sai — Zn đứng trước H, phản ứng với HCl bình thường.', 'Đúng — Cu đứng sau H nên KHÔNG phản ứng với HCl loãng; đây là phản ứng không xảy ra.']),
    Q('Phản ứng giữa Fe + CuSO₄ tạo?', ['FeSO₄ + Cu', 'Không phản ứng', 'FeS + CuO', 'Fe₂(SO₄)₃ + Cu'], 0, 'Fe đứng trước Cu ⇒ Fe đẩy Cu khỏi muối: Fe + CuSO₄ → FeSO₄ + Cu↓.', [
      '<b>Phản ứng đẩy kim loại</b>: kim loại mạnh hơn (đứng trước trong dãy) đẩy kim loại yếu hơn ra khỏi dung dịch muối.',
      'Fe đứng <i>trước</i> Cu nên xảy ra: <code>Fe + CuSO₄ → FeSO₄ + Cu↓</code>. Hiện tượng quan sát: đinh sắt bị <b>phủ lớp đồng đỏ</b>, dung dịch xanh lam nhạt dần.',
      'Lưu ý: trong phản ứng với muối, Fe chỉ lên hoá trị <b>+2</b> (tạo FeSO₄), <i>không</i> lên +3.',
    ], ['Đúng — Fe đẩy Cu khỏi muối tạo FeSO₄ và Cu kim loại bám vào đinh sắt.', 'Sai — Fe đứng trước Cu nên phản ứng đẩy kim loại có xảy ra.', 'Sai — không có sự phân hủy thành FeS và CuO; đây là phản ứng đẩy kim loại.', 'Sai — Fe đẩy kim loại tạo muối Fe²⁺ (FeSO₄), không lên Fe³⁺ trong phản ứng này.']),
    Q('Kim loại nào phản ứng được với nước ở nhiệt độ thường?', ['K, Na, Ca, Ba', 'Cu, Ag', 'Fe, Al', 'Au, Pt'], 0, 'Chỉ kim loại kiềm và kiềm thổ (K, Na, Ca, Ba…) phản ứng với H₂O ở nhiệt độ thường.', [
      'Chỉ các kim loại <b>rất mạnh</b> ở đầu dãy hoạt động mới phản ứng với nước ngay ở nhiệt độ thường, tạo <b>bazơ tan (kiềm) + H₂↑</b>.',
      '<ul><li>Kim loại <b>kiềm</b>: K, Na… ⇒ <code>2Na + 2H₂O → 2NaOH + H₂↑</code>.</li><li>Kim loại <b>kiềm thổ</b>: Ca, Ba… ⇒ <code>Ca + 2H₂O → Ca(OH)₂ + H₂↑</code>.</li></ul>',
      'Fe, Al không phản ứng với nước ở nhiệt độ thường; còn Cu, Ag, Au, Pt thì hoàn toàn <i>trơ</i> với nước.',
    ], ['Đúng — K, Na, Ca, Ba là kim loại kiềm/kiềm thổ mạnh, phản ứng với nước ở nhiệt độ thường.', 'Sai — Cu, Ag đứng sau H, không phản ứng với nước.', 'Sai — Fe, Al không phản ứng với nước ở nhiệt độ thường (Al có lớp oxit bảo vệ).', 'Sai — Au, Pt là kim loại quý rất trơ, không phản ứng với nước.']),
    Q('Phương trình Na + H₂O → ?', ['NaH + O₂', 'Na₂O + H₂O', 'NaOH + H₂', '2NaOH + H₂'], 3, '2Na + 2H₂O → 2NaOH + H₂↑.', [
      'Natri là kim loại kiềm rất mạnh, phản ứng mãnh liệt với nước ở nhiệt độ thường, tạo <b>dung dịch kiềm NaOH</b> và <b>khí H₂</b>.',
      'Phương trình cân bằng đúng: <code>2Na + 2H₂O → 2NaOH + H₂↑</code>. Cần hệ số 2 trước Na, H₂O và NaOH để cân bằng số nguyên tử H.',
      'Hiện tượng: viên Na chạy trên mặt nước, nóng chảy thành giọt tròn, có khí thoát ra; dung dịch làm hồng phenolphtalein (tính bazơ).',
    ], ['Sai — không tạo NaH và O₂; phản ứng cho bazơ và khí H₂.', 'Sai — không tạo Na₂O từ phản ứng với nước; sản phẩm là NaOH tan.', 'Sai — đúng sản phẩm nhưng chưa cân bằng (thiếu hệ số); cần 2NaOH + H₂.', 'Đúng — 2Na + 2H₂O → 2NaOH + H₂↑, cân bằng đúng.']),
  ]),

  M(3, 'Nhôm (Al) — Tính chất và ứng dụng', [
    Q('Số hiệu nguyên tử của Al?', ['12', '14', '13', '11'], 2, 'Al ở ô số 13, chu kỳ 3, nhóm IIIA.', [
      '<b>Số hiệu nguyên tử (Z)</b> bằng số proton trong hạt nhân và cũng là số thứ tự ô của nguyên tố trong bảng tuần hoàn.',
      'Nhôm <b>Al</b> có <code>Z = 13</code>, nằm ở <i>chu kỳ 3, nhóm IIIA</i>. Nguyên tử Al có 3 electron lớp ngoài cùng nên hoá trị đặc trưng là <b>III</b>.',
      'Vài mốc cần nhớ quanh đó: Na (Z=11), Mg (Z=12), Al (Z=13), Si (Z=14).',
    ], ['Sai — Z = 12 là Mg, không phải Al.', 'Sai — Z = 14 là Si, không phải Al.', 'Đúng — Al có Z = 13, chu kỳ 3, nhóm IIIA.', 'Sai — Z = 11 là Na, không phải Al.']),
    Q('Tính chất vật lý nổi bật của Al?', ['Nặng, không dẫn điện', 'Nhẹ, dẫn điện tốt, màu trắng bạc', 'Đen, giòn', 'Lỏng ở nhiệt độ thường'], 1, 'Al nhẹ (D = 2,7 g/cm³), dẫn điện tốt (sau Cu), màu trắng bạc.', [
      'Nhôm là kim loại <b>màu trắng bạc</b>, có ánh kim, <i>nhẹ</i> (D = 2,7 g/cm³), nóng chảy ở 660°C.',
      '<ul><li><b>Dẫn điện, dẫn nhiệt tốt</b> (kém hơn Cu nhưng nhẹ và rẻ hơn).</li><li><b>Dẻo</b> ⇒ dễ dát thành lá, kéo thành sợi.</li></ul>',
      'Chính vì nhẹ + dẫn điện tốt + chống ăn mòn nên Al được dùng làm dây tải điện cao thế, vỏ máy bay, đồ gia dụng.',
    ], ['Sai — Al nhẹ và dẫn điện tốt, ngược với mô tả này.', 'Đúng — Al nhẹ (D = 2,7), dẫn điện tốt, màu trắng bạc.', 'Sai — Al màu trắng bạc và dẻo, không đen/giòn.', 'Sai — Al là chất rắn ở nhiệt độ thường (nóng chảy ~660°C).']),
    Q('Al phản ứng với axit HCl tạo?', ['AlCl₃ + H₂', 'Không phản ứng', 'AlCl₂ + H₂', 'Al₂Cl₃ + H₂'], 0, '2Al + 6HCl → 2AlCl₃ + 3H₂↑.', [
      'Al đứng <b>trước H</b> trong dãy hoạt động nên phản ứng với axit loãng giải phóng <b>H₂</b>.',
      'Al chỉ có một hoá trị là <b>III</b> nên muối tạo thành là <code>AlCl₃</code>. Phương trình cân bằng: <code>2Al + 6HCl → 2AlCl₃ + 3H₂↑</code>.',
      'Cách cân bằng: 2 Al cần 6 HCl để tạo 2 AlCl₃, đồng thời sinh 3 phân tử H₂.',
    ], ['Đúng — Al hoá trị III tạo AlCl₃ và giải phóng H₂: 2Al + 6HCl → 2AlCl₃ + 3H₂.', 'Sai — Al đứng trước H nên phản ứng với HCl loãng.', 'Sai — Al chỉ có hoá trị III nên không tạo AlCl₂.', 'Sai — công thức Al₂Cl₃ sai hoá trị; đúng phải là AlCl₃.']),
    Q('Al có tan trong dung dịch kiềm (NaOH) không?', ['Chỉ tan trong axit', 'Có (vì Al là kim loại lưỡng tính)', 'Không, chỉ Zn mới tan trong kiềm', 'Chỉ ở nhiệt độ cao'], 1, '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.', [
      'Nhôm là <b>kim loại lưỡng tính</b>: vừa tan trong axit, vừa tan trong dung dịch bazơ mạnh (kiềm).',
      'Phản ứng với kiềm: <code>2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑</code>. Đây là tính chất riêng đặc biệt của Al (và Zn).',
      'Hệ quả thực tế: <i>không</i> nên đựng thức ăn có tính kiềm (nước tro, xút) trong nồi nhôm vì Al sẽ bị ăn mòn.',
    ], ['Sai — Al tan được cả trong axit lẫn kiềm vì tính lưỡng tính.', 'Đúng — Al lưỡng tính nên tan trong NaOH: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.', 'Sai — không chỉ Zn; Al cũng tan trong kiềm do tính lưỡng tính.', 'Sai — Al tan trong dung dịch NaOH ngay ở nhiệt độ thường.']),
    Q('Ứng dụng của Al?', ['Làm vỏ tàu thủy', 'Làm pin', 'Làm xoong nồi, vỏ máy bay, dây điện', 'Làm nhiên liệu'], 2, 'Al nhẹ + chống ăn mòn ⇒ dùng làm đồ gia dụng, vỏ máy bay, dây điện cao thế.', [
      'Ứng dụng của nhôm xuất phát trực tiếp từ tính chất: <i>nhẹ, dẫn điện – dẫn nhiệt tốt, chống ăn mòn (nhờ lớp Al₂O₃)</i>.',
      '<ul><li><b>Đồ gia dụng</b>: xoong, nồi, ấm (dẫn nhiệt tốt, nhẹ).</li><li><b>Hàng không</b>: vỏ và khung máy bay (hợp kim đuyra nhẹ, bền).</li><li><b>Tải điện</b>: dây điện cao thế (nhẹ, rẻ hơn đồng).</li></ul>',
    ], ['Sai — vỏ tàu thủy thường dùng thép vì cần độ bền cơ học cao.', 'Sai — pin thông dụng dùng Zn, Li…, không phải ứng dụng tiêu biểu của Al.', 'Đúng — Al nhẹ, chống ăn mòn nên làm xoong nồi, vỏ máy bay, dây điện cao thế.', 'Sai — Al là kim loại, không dùng làm nhiên liệu thông thường.']),
    Q('Vì sao đồ Al không bị gỉ trong không khí?', ['Al không phản ứng O₂', 'Có lớp Al₂O₃ mỏng phủ bên ngoài bảo vệ', 'Al ở dạng đặc biệt', 'Al rất bền'], 1, 'Lớp Al₂O₃ mỏng, bền, không cho không khí và nước tiếp tục tác dụng.', [
      'Thực ra Al <b>có</b> phản ứng với O₂ trong không khí: <code>4Al + 3O₂ → 2Al₂O₃</code>. Nhưng phản ứng này lại chính là điều bảo vệ Al.',
      'Lớp <b>Al₂O₃</b> sinh ra rất <i>mỏng, mịn, bền chắc</i>, bám chặt bề mặt và <b>ngăn không khí, nước</b> tiếp xúc với Al bên trong ⇒ nhôm không bị ăn mòn tiếp.',
      'Hiện tượng này gọi là sự <i>thụ động hoá</i> bề mặt, cũng gặp ở kẽm, crom.',
    ], ['Sai — Al CÓ phản ứng với O₂ tạo Al₂O₃; chính lớp này mới bảo vệ.', 'Đúng — lớp Al₂O₃ mỏng, bền, ngăn không khí và nước tiếp xúc Al bên trong.', 'Sai — Al thường, không phải dạng đặc biệt nào.', 'Sai — nói chung chung; lý do cụ thể là lớp oxit Al₂O₃ bảo vệ.']),
  ]),

  M(4, 'Sắt (Fe) — Tính chất và hợp chất', [
    Q('Số hiệu nguyên tử của Fe?', ['24', '26', '25', '27'], 1, 'Fe ở ô số 26, chu kỳ 4, nhóm VIIIB.', [
      'Sắt <b>Fe</b> có số hiệu nguyên tử <code>Z = 26</code>, nằm ở <i>chu kỳ 4, nhóm VIIIB</i> — thuộc nhóm kim loại chuyển tiếp.',
      'Vì là kim loại chuyển tiếp, Fe có nhiều hoá trị; phổ biến là <b>+2</b> và <b>+3</b>.',
      'Vài nguyên tố lân cận cần phân biệt: Cr (Z=24), Mn (Z=25), Fe (Z=26), Co (Z=27), Ni (Z=28).',
    ], ['Sai — Z = 24 là Cr (crom), không phải Fe.', 'Đúng — Fe có Z = 26, chu kỳ 4, nhóm VIIIB.', 'Sai — Z = 25 là Mn (mangan), không phải Fe.', 'Sai — Z = 27 là Co (coban), không phải Fe.']),
    Q('Fe có những hoá trị nào?', ['+1, +2', '+2, +3', '+3, +4', '+1, +3'], 1, 'Fe có 2 hoá trị phổ biến: +2 (sắt II) và +3 (sắt III).', [
      'Sắt là kim loại chuyển tiếp nên có nhiều hoá trị, trong chương trình lớ 9 cần nhớ <b>hai hoá trị</b>: <code>+2 (sắt II)</code> và <code>+3 (sắt III)</code>.',
      '<ul><li>Tác dụng với chất oxi hoá <b>yếu</b> (HCl, H₂SO₄ loãng, S) → Fe lên <b>+2</b>.</li><li>Tác dụng với chất oxi hoá <b>mạnh</b> (Cl₂, HNO₃, H₂SO₄ đặc) → Fe lên <b>+3</b>.</li></ul>',
      'Đây là điểm khác biệt quan trọng so với Al (chỉ có hoá trị III).',
    ], ['Sai — Fe không có hoá trị +1 phổ biến.', 'Đúng — Fe có 2 hoá trị thường gặp: +2 (sắt II) và +3 (sắt III).', 'Sai — Fe không có hoá trị +4 trong chương trình; thiếu +2.', 'Sai — Fe không có hoá trị +1; bỏ sót +2.']),
    Q('Fe + 2HCl → ?', ['Fe(OH)₂', 'FeO + H₂O', 'FeCl₃ + H₂', 'FeCl₂ + H₂'], 3, 'Trong HCl loãng, Fe tạo muối Fe²⁺: FeCl₂.', [
      'HCl loãng là chất oxi hoá <b>yếu</b>, chỉ đẩy Fe lên hoá trị <b>+2</b>, tạo muối <code>FeCl₂</code> và giải phóng H₂.',
      'Phương trình: <code>Fe + 2HCl → FeCl₂ + H₂↑</code>.',
      'So sánh: với Cl₂ (oxi hoá mạnh) thì Fe lại lên +3 (FeCl₃). Phân biệt được điều này giúp tránh nhầm sản phẩm.',
    ], ['Sai — Fe(OH)₂ là bazơ, không phải sản phẩm của Fe + HCl.', 'Sai — không tạo oxit + nước; phản ứng tạo muối và H₂.', 'Sai — với HCl loãng Fe chỉ lên +2 (FeCl₂), không lên FeCl₃.', 'Đúng — Fe + 2HCl → FeCl₂ + H₂↑ (Fe tạo muối Fe²⁺).']),
    Q('Fe phản ứng với khí Cl₂ tạo?', ['FeO (sắt(II) oxit)', 'Fe₂O₃ (sắt(III) oxit)', 'FeCl₂ (sắt clorua hoá trị II)', 'FeCl₃'], 3, '2Fe + 3Cl₂ → 2FeCl₃ (Cl₂ là chất oxi hoá mạnh, đẩy Fe lên +3).', [
      '<b>Cl₂ là chất oxi hoá mạnh</b> nên đẩy Fe lên hoá trị cao nhất <b>+3</b>, tạo muối <code>FeCl₃</code> (màu vàng nâu).',
      'Phương trình: <code>2Fe + 3Cl₂ →(t°) 2FeCl₃</code>.',
      'Ghi nhớ quy luật: <i>chất oxi hoá mạnh đẩy Fe lên +3, chất oxi hoá yếu chỉ tới +2</i> ⇒ Cl₂ cho FeCl₃, còn HCl cho FeCl₂.',
    ], ['Sai — FeO là oxit, sản phẩm với O₂; phản ứng với Cl₂ cho muối clorua.', 'Sai — Fe₂O₃ là oxit, không phải sản phẩm với Cl₂.', 'Sai — Cl₂ oxi hoá mạnh đẩy Fe lên +3, không dừng ở FeCl₂.', 'Đúng — 2Fe + 3Cl₂ → 2FeCl₃; Cl₂ oxi hoá mạnh nên Fe lên +3.']),
    Q('Gang là hợp kim của?', ['Fe + Si', 'Fe + Al', 'Fe + Cu', 'Fe + C (2-5%)'], 3, 'Gang: hợp kim Fe-C với C từ 2-5%; thép: 0,01-2%.', [
      '<b>Gang</b> và <b>thép</b> đều là hợp kim của <i>sắt và cacbon</i>, khác nhau ở hàm lượng C.',
      '<ul><li><b>Gang</b>: hàm lượng C từ <code>2–5%</code> — cứng nhưng giòn, dùng đúc.</li><li><b>Thép</b>: hàm lượng C từ <code>0,01–2%</code> — bền, dẻo, đàn hồi, dùng làm máy móc, cầu, khung nhà.</li></ul>',
      'Để luyện thép từ gang, người ta <i>oxi hoá bớt cacbon</i> và tạp chất trong gang.',
    ], ['Sai — Si chỉ là tạp chất nhỏ; thành phần chính tạo gang là cacbon.', 'Sai — gang không phải hợp kim Fe-Al.', 'Sai — gang không phải hợp kim Fe-Cu.', 'Đúng — gang là hợp kim Fe-C với hàm lượng C 2-5% (thép 0,01-2%).']),
    Q('Phương trình điều chế Fe từ oxit trong lò cao?', ['FeO + C → Fe', 'Fe₂O₃ + H₂ → Fe + H₂O', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', 'Fe + O₂ → Fe₂O₃'], 2, 'Phản ứng nhiệt luyện trong lò cao: dùng CO khử Fe₂O₃ thành Fe.', [
      'Trong <b>lò cao</b>, người ta luyện gang bằng cách dùng khí <b>CO</b> (sinh ra từ than cốc) để <i>khử</i> quặng sắt oxit thành sắt.',
      'Phương trình chính: <code>Fe₂O₃ + 3CO →(t°) 2Fe + 3CO₂</code>. Ở đây CO đóng vai trò <b>chất khử</b>, lấy oxi ra khỏi Fe₂O₃.',
      'Đây là phản ứng <i>nhiệt luyện</i> quan trọng trong công nghiệp luyện kim.',
    ], ['Sai — chưa cân bằng và không phản ánh đúng chất khử CO trong lò cao.', 'Sai — trong lò cao chất khử chính là CO (từ than), không phải H₂.', 'Đúng — Fe₂O₃ + 3CO → 2Fe + 3CO₂, CO khử oxit sắt trong lò cao.', 'Sai — đây là phản ứng tạo gỉ (oxi hoá Fe), không phải điều chế Fe.']),
  ]),

  M(5, 'Đồng (Cu) — Tính chất và ứng dụng', [
    Q('Số hiệu nguyên tử của Cu?', ['28', '29', '27', '30'], 1, 'Cu ở ô số 29, chu kỳ 4, nhóm IB.', [
      'Đồng <b>Cu</b> có số hiệu nguyên tử <code>Z = 29</code>, nằm ở <i>chu kỳ 4, nhóm IB</i> — kim loại chuyển tiếp.',
      'Cu thường có hoá trị <b>+2</b> (đôi khi +1), muối Cu²⁺ trong dung dịch có màu <i>xanh lam</i> đặc trưng.',
      'Phân biệt với nguyên tố lân cận: Ni (Z=28), Cu (Z=29), Zn (Z=30).',
    ], ['Sai — Z = 28 là Ni (niken), không phải Cu.', 'Đúng — Cu có Z = 29, chu kỳ 4, nhóm IB.', 'Sai — Z = 27 là Co (coban), không phải Cu.', 'Sai — Z = 30 là Zn (kẽm), không phải Cu.']),
    Q('Tính chất vật lý đặc trưng của Cu?', ['Màu trắng, không dẫn điện', 'Màu đỏ, dẫn điện tốt thứ 2 sau Ag', 'Lỏng ở nhiệt độ thường', 'Có từ tính'], 1, 'Cu đỏ ánh kim, dẫn điện tốt thứ 2 sau Ag, dẫn nhiệt tốt.', [
      'Đồng là kim loại <b>màu đỏ</b> (đỏ cam) đặc trưng, có ánh kim, dẻo, nóng chảy ở ~1083°C.',
      '<ul><li><b>Dẫn điện tốt thứ hai</b> chỉ sau Ag ⇒ làm dây điện phổ biến.</li><li><b>Dẫn nhiệt tốt</b> ⇒ làm ruột nồi, bộ tản nhiệt.</li><li><b>Không có từ tính</b> (khác Fe, Co, Ni).</li></ul>',
    ], ['Sai — Cu màu đỏ và dẫn điện rất tốt, ngược với mô tả này.', 'Đúng — Cu màu đỏ ánh kim, dẫn điện tốt thứ 2 sau Ag.', 'Sai — Cu là chất rắn ở nhiệt độ thường (nóng chảy ~1083°C).', 'Sai — Cu không có từ tính (khác Fe, Co, Ni).']),
    Q('Cu có phản ứng với HCl loãng không?', ['Chỉ ở nhiệt độ cao', 'Tan chậm', 'Không (vì Cu đứng sau H trong dãy)', 'Có, mạnh'], 2, 'Cu sau H ⇒ không phản ứng với HCl loãng.', [
      'Cu đứng <b>sau H</b> trong dãy hoạt động hoá học nên <i>không</i> đẩy được H₂ ra khỏi axit loãng.',
      'Vì vậy <code>Cu + HCl loãng → không phản ứng</code>, dù có đun nóng.',
      'Tuy nhiên Cu lại phản ứng với axit oxi hoá mạnh như <b>H₂SO₄ đặc nóng</b> hay <b>HNO₃</b> (không sinh H₂ mà sinh khí khác như SO₂, NO₂).',
    ], ['Sai — dù đun nóng Cu vẫn không phản ứng với HCl loãng.', 'Sai — Cu không tan trong HCl loãng dù chậm.', 'Đúng — Cu đứng sau H trong dãy nên không phản ứng với HCl loãng.', 'Sai — Cu trơ với HCl loãng, không phản ứng mạnh.']),
    Q('Cu phản ứng với H₂SO₄ đặc nóng tạo?', ['CuSO₄ + H₂', 'CuSO₄ + SO₂ + H₂O', 'Không phản ứng', 'CuO + H₂'], 1, 'Cu + 2H₂SO₄ đặc nóng → CuSO₄ + SO₂↑ + 2H₂O.', [
      'Tuy không phản ứng với H₂SO₄ loãng, Cu lại phản ứng với <b>H₂SO₄ đặc, nóng</b> vì đây là axit có tính <i>oxi hoá mạnh</i>.',
      'Phương trình: <code>Cu + 2H₂SO₄(đặc) →(t°) CuSO₄ + SO₂↑ + 2H₂O</code>. Khí sinh ra là <b>SO₂</b> (mùi hắc), <i>không</i> phải H₂.',
      'Ghi nhớ: axit oxi hoá mạnh tác dụng với kim loại sinh khí (SO₂, NO₂, NO) chứ không sinh H₂.',
    ], ['Sai — H₂SO₄ đặc nóng không cho H₂; sản phẩm khí là SO₂.', 'Đúng — Cu + 2H₂SO₄ đặc nóng → CuSO₄ + SO₂↑ + 2H₂O.', 'Sai — Cu không phản ứng với H₂SO₄ loãng nhưng phản ứng với H₂SO₄ đặc nóng.', 'Sai — không tạo CuO và H₂; đây là phản ứng oxi hoá tạo muối và SO₂.']),
    Q('Ứng dụng quan trọng của Cu?', ['Làm dây điện, vật liệu xây dựng, hợp kim đồng thau, đồng đen', 'Làm xoong nồi nhôm', 'Làm pin', 'Làm thuốc'], 0, 'Cu dẫn điện tốt + bền ⇒ dây điện; hợp kim Cu-Zn (đồng thau), Cu-Sn (đồng đen).', [
      'Ứng dụng của đồng dựa trên tính <b>dẫn điện – dẫn nhiệt tốt</b> và khả năng tạo nhiều <b>hợp kim</b> bền đẹp.',
      '<ul><li><b>Dây điện, mạch điện</b>: dẫn điện tốt thứ hai sau Ag, rẻ hơn.</li><li><b>Đồng thau (Cu-Zn)</b>: làm đồ trang trí, nhạc cụ.</li><li><b>Đồng đen / đồng thanh (Cu-Sn)</b>: đúc tượng, chuông.</li></ul>',
    ], ['Đúng — Cu dẫn điện tốt, bền nên làm dây điện, hợp kim đồng thau (Cu-Zn), đồng đen (Cu-Sn).', 'Sai — xoong nồi nhôm làm từ Al, không phải Cu.', 'Sai — làm pin không phải ứng dụng tiêu biểu của Cu.', 'Sai — Cu không dùng làm thuốc.']),
    Q('Dung dịch CuSO₄ có màu?', ['Đỏ gạch (giống Cu kim loại)', 'Vàng nâu (giống dung dịch FeCl₃)', 'Trắng trong (giống dung dịch NaCl)', 'Xanh lam'], 3, 'CuSO₄·5H₂O và dung dịch CuSO₄ có màu xanh lam đặc trưng.', [
      'Ion <b>Cu²⁺</b> trong dung dịch tạo màu <b>xanh lam</b> đặc trưng. Đây là dấu hiệu nhận biết muối đồng(II).',
      'Tinh thể <code>CuSO₄·5H₂O</code> (phèn xanh) có màu xanh lam; khi nung mất nước trở thành CuSO₄ khan màu trắng.',
      'So sánh màu các dung dịch muối thường gặp: <i>Cu²⁺ xanh lam, Fe³⁺ vàng nâu, Fe²⁺ lục nhạt, NaCl không màu</i>.',
    ], ['Sai — đỏ gạch là màu của Cu kim loại, không phải dung dịch CuSO₄.', 'Sai — vàng nâu là màu dung dịch FeCl₃/muối Fe³⁺, không phải CuSO₄.', 'Sai — trắng trong là dung dịch NaCl; CuSO₄ có màu.', 'Đúng — dung dịch CuSO₄ (và tinh thể CuSO₄·5H₂O) có màu xanh lam đặc trưng.']),
  ]),

  M(6, 'Phi kim — Tính chất chung và Clo (Cl₂)', [
    Q('Tính chất vật lý của phi kim?', ['Đều lỏng', 'Đa dạng: rắn (S, P), lỏng (Br), khí (O₂, Cl₂)', 'Đều khí', 'Đều rắn'], 1, 'Phi kim có nhiều trạng thái: S/P/I rắn, Br lỏng, O₂/N₂/Cl₂ khí.', [
      'Khác với kim loại (hầu hết là rắn), <b>phi kim</b> tồn tại ở cả ba trạng thái ở điều kiện thường.',
      '<ul><li><b>Rắn</b>: lưu huỳnh (S), photpho (P), cacbon (C), iot (I₂).</li><li><b>Lỏng</b>: brom (Br₂).</li><li><b>Khí</b>: oxi (O₂), nitơ (N₂), clo (Cl₂), hiđro (H₂).</li></ul>',
      'Phần lớn phi kim <i>không dẫn điện</i>, không ánh kim (trừ vài ngoại lệ như than chì dẫn điện).',
    ], ['Sai — chỉ Br₂ lỏng; phần lớn phi kim ở dạng rắn hoặc khí.', 'Đúng — phi kim đa dạng trạng thái: S, P rắn; Br lỏng; O₂, Cl₂ khí.', 'Sai — S, P, I là phi kim rắn nên không thể nói đều khí.', 'Sai — O₂, N₂, Cl₂ là phi kim khí nên không thể nói đều rắn.']),
    Q('Khí Clo (Cl₂) có màu?', ['Vàng lục', 'Xanh dương', 'Không màu', 'Nâu đỏ (giống khí NO₂)'], 0, 'Cl₂ là khí vàng lục, mùi xốc, độc.', [
      'Clo <b>Cl₂</b> là khí màu <b>vàng lục</b>, mùi xốc, rất độc, nặng hơn không khí.',
      'Đây là một phi kim hoạt động mạnh, có tính <i>oxi hoá mạnh</i>; tan một phần trong nước tạo "nước clo".',
      'So sánh màu các khí quen thuộc: <i>Cl₂ vàng lục, NO₂ nâu đỏ, O₂/N₂/H₂ không màu</i>.',
    ], ['Đúng — Cl₂ là khí màu vàng lục, mùi xốc, rất độc.', 'Sai — xanh dương không phải màu của Cl₂.', 'Sai — Cl₂ có màu vàng lục, không phải không màu.', 'Sai — nâu đỏ là màu khí NO₂, không phải Cl₂.']),
    Q('Cl₂ + H₂O → ?', ['HClO₂ (axit clorơ)', 'HCl + O₂', 'HCl + HClO (nước clo)', 'Không phản ứng'], 2, 'Cl₂ + H₂O ⇌ HCl + HClO (nước clo có tính tẩy màu nhờ HClO).', [
      'Khi tan trong nước, một phần Cl₂ phản ứng thuận nghịch tạo hỗn hợp axit: <code>Cl₂ + H₂O ⇌ HCl + HClO</code>. Dung dịch này gọi là <b>nước clo</b>.',
      '<b>HClO (axit hipoclorơ)</b> có tính oxi hoá mạnh nên nước clo có khả năng <i>tẩy màu, sát trùng</i>.',
      'Đây là lí do clo được dùng để khử trùng nước sinh hoạt, tẩy trắng vải sợi.',
    ], ['Sai — không tạo HClO₂; sản phẩm là HCl và HClO.', 'Sai — Cl₂ tan trong nước không giải phóng O₂.', 'Đúng — Cl₂ + H₂O ⇌ HCl + HClO (nước clo, tẩy màu nhờ HClO).', 'Sai — Cl₂ tan và phản ứng một phần với nước, không phải không phản ứng.']),
    Q('Cl₂ phản ứng với NaOH (loãng, nguội) tạo?', ['NaClO₃', 'NaCl + O₂', 'NaCl + NaClO + H₂O (nước Gia-ven)', 'NaCl + H₂'], 2, 'Cl₂ + 2NaOH → NaCl + NaClO + H₂O — nước Gia-ven, dùng tẩy trắng, sát trùng.', [
      'Cl₂ tác dụng với dung dịch <b>NaOH loãng, nguội</b> tạo hỗn hợp hai muối: <code>Cl₂ + 2NaOH → NaCl + NaClO + H₂O</code>.',
      'Dung dịch sản phẩm gọi là <b>nước Gia-ven</b>, chứa NaClO có tính oxi hoá mạnh ⇒ dùng <i>tẩy trắng, sát trùng</i>.',
      'Đây là một ví dụ điển hình về phản ứng của phi kim mạnh với dung dịch kiềm.',
    ], ['Sai — NaClO₃ tạo khi đun nóng đặc, không phải điều kiện loãng nguội.', 'Sai — phản ứng không giải phóng O₂.', 'Đúng — Cl₂ + 2NaOH → NaCl + NaClO + H₂O, đây là nước Gia-ven.', 'Sai — phản ứng không tạo H₂.']),
    Q('Ứng dụng quan trọng của Cl₂?', ['Làm nước giải khát', 'Làm thực phẩm', 'Khử trùng nước, sản xuất nhựa PVC, thuốc trừ sâu', 'Làm phân bón'], 2, 'Cl₂ khử trùng nước máy, sản xuất HCl, PVC, hợp chất hữu cơ.', [
      'Nhờ tính <b>oxi hoá mạnh</b> và khả năng tạo nhiều hợp chất, clo có nhiều ứng dụng công nghiệp.',
      '<ul><li><b>Khử trùng</b> nước sinh hoạt, nước hồ bơi.</li><li>Sản xuất <b>nhựa PVC</b>, axit HCl, nước Gia-ven.</li><li>Sản xuất một số <b>thuốc trừ sâu, dược phẩm</b>.</li></ul>',
      'Lưu ý: Cl₂ rất độc nên <i>không</i> dùng trực tiếp trong thực phẩm hay đồ uống.',
    ], ['Sai — Cl₂ độc, không dùng làm nước giải khát.', 'Sai — Cl₂ độc, không dùng làm thực phẩm.', 'Đúng — Cl₂ khử trùng nước, sản xuất PVC, HCl, hợp chất hữu cơ.', 'Sai — phân bón chủ yếu từ hợp chất N, P, K, không phải Cl₂.']),
    Q('Cl₂ + 2Fe → ?', ['2FeCl₃', 'Fe + Cl', 'FeCl₂ (chỉ tạo khi Fe phản ứng với HCl)', 'FeCl (hợp chất giả định không tồn tại)'], 0, '3Cl₂ + 2Fe → 2FeCl₃ (Cl₂ oxi hoá mạnh, đẩy Fe lên +3).', [
      'Clo là chất oxi hoá <b>mạnh</b> nên khi tác dụng với sắt sẽ đẩy Fe lên hoá trị cao nhất <b>+3</b>.',
      'Phương trình cân bằng: <code>3Cl₂ + 2Fe →(t°) 2FeCl₃</code> (sắt(III) clorua màu vàng nâu).',
      'Nhắc lại quy luật: với Cl₂ → FeCl₃ (+3), còn với HCl loãng → FeCl₂ (+2).',
    ], ['Đúng — 3Cl₂ + 2Fe → 2FeCl₃; Cl₂ oxi hoá mạnh nên Fe lên +3.', 'Sai — đây không phải sản phẩm; phản ứng tạo muối FeCl₃.', 'Sai — với Cl₂ Fe lên +3 (FeCl₃); chỉ với HCl mới tạo FeCl₂.', 'Sai — FeCl không tồn tại; Fe có hoá trị +2 hoặc +3.']),
  ]),

  M(7, 'Cacbon (C) và silic (Si)', [
    Q('Cacbon có các dạng thù hình phổ biến?', ['Chỉ kim cương', 'Chỉ than chì', 'Kim cương, than chì, fuleren, cacbon vô định hình', 'Khí, lỏng, rắn'], 2, 'Thù hình của C: kim cương (cứng), than chì (mềm, dẫn điện), fuleren, cacbon vô định hình.', [
      '<b>Thù hình</b> là các dạng đơn chất khác nhau của <i>cùng một nguyên tố</i>. Cacbon là ví dụ kinh điển về hiện tượng thù hình.',
      '<ul><li><b>Kim cương</b>: cứng nhất trong tự nhiên, trong suốt, không dẫn điện.</li><li><b>Than chì</b>: mềm, màu xám đen, <i>dẫn điện</i>.</li><li><b>Fuleren, cacbon vô định hình</b> (than gỗ, muội than): các dạng khác.</li></ul>',
      'Lưu ý: rắn/lỏng/khí là <i>trạng thái vật chất</i>, không phải thù hình.',
    ], ['Sai — kim cương chỉ là một trong các dạng thù hình của C.', 'Sai — than chì chỉ là một dạng; còn kim cương, fuleren…', 'Đúng — C có nhiều dạng thù hình: kim cương, than chì, fuleren, cacbon vô định hình.', 'Sai — khí/lỏng/rắn là trạng thái vật chất, không phải thù hình.']),
    Q('Vì sao kim cương cứng, than chì mềm dù cùng nguyên tố C?', ['Do khối lượng khác', 'Do cấu trúc tinh thể khác nhau', 'Do màu sắc khác', 'Do tỉ lệ pha tạp'], 1, 'Kim cương: cấu trúc tứ diện chặt chẽ; than chì: cấu trúc lớp dễ trượt.', [
      'Kim cương và than chì cùng là cacbon nguyên chất, vì vậy <i>khối lượng nguyên tử như nhau</i>; điều quyết định tính chất là <b>cách sắp xếp nguyên tử</b> (cấu trúc tinh thể).',
      '<ul><li><b>Kim cương</b>: mỗi C liên kết với 4 C khác theo cấu trúc <i>tứ diện</i> bền chặt mọi hướng ⇒ rất cứng.</li><li><b>Than chì</b>: các nguyên tử C xếp thành <i>lớp</i>, các lớp dễ trượt lên nhau ⇒ mềm, làm ruột bút chì.</li></ul>',
    ], ['Sai — cùng là nguyên tố C nên khối lượng nguyên tử như nhau.', 'Đúng — kim cương có cấu trúc tứ diện chặt; than chì có cấu trúc lớp dễ trượt.', 'Sai — màu sắc không quyết định độ cứng.', 'Sai — đây là thù hình của C nguyên chất, không phải do pha tạp.']),
    Q('CO có tính chất hoá học đặc biệt?', ['Là chất bazơ', 'Khử oxit kim loại ở nhiệt độ cao (luyện kim)', 'Cháy được trong CO₂', 'Là chất axit mạnh'], 1, 'CO + CuO → Cu + CO₂ — dùng nhiều trong luyện kim.', [
      '<b>CO (cacbon monoxit)</b> là oxit <i>trung tính</i> (không phải axit hay bazơ), nhưng có tính chất quan trọng là <b>chất khử mạnh</b> ở nhiệt độ cao.',
      'Nó lấy oxi ra khỏi oxit kim loại: <code>CO + CuO →(t°) Cu + CO₂</code>; <code>3CO + Fe₂O₃ →(t°) 2Fe + 3CO₂</code>.',
      'Nhờ tính khử này, CO được dùng nhiều trong <i>luyện kim</i> (lò cao luyện gang). CO cũng rất độc vì gắn chặt với hemoglobin trong máu.',
    ], ['Sai — CO là oxit trung tính, không có tính bazơ.', 'Đúng — CO là chất khử, khử oxit kim loại: CO + CuO → Cu + CO₂.', 'Sai — CO₂ không duy trì sự cháy nên CO không cháy trong CO₂.', 'Sai — CO không phải axit; nó là oxit trung tính.']),
    Q('CO₂ làm đục nước vôi trong là phản ứng nào?', ['CO₂ + NaOH', 'CO₂ + H₂O → H₂CO₃', 'CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O', 'CO₂ + Ca → CaCO₃'], 2, 'Phản ứng đặc trưng để nhận biết CO₂: tạo kết tủa trắng CaCO₃.', [
      'Để <b>nhận biết khí CO₂</b>, người ta dẫn khí qua <i>nước vôi trong</i> [dung dịch Ca(OH)₂]. Nếu nước vôi <b>bị đục</b> thì đó là CO₂.',
      'Phương trình: <code>CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O</code>. Kết tủa <b>CaCO₃</b> màu trắng làm dung dịch vẩn đục.',
      'CO₂ là oxit axit nên còn tác dụng với NaOH; nhưng phản ứng dùng để <i>nhận biết</i> là với nước vôi trong.',
    ], ['Sai — sản phẩm Na₂CO₃ tan, không tạo kết tủa làm đục.', 'Sai — tạo H₂CO₃ tan, không gây vẩn đục.', 'Đúng — CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O, kết tủa trắng làm đục nước vôi.', 'Sai — Ca kim loại không phản ứng với CO₂ theo cách này ở điều kiện thường.']),
    Q('Si có ứng dụng quan trọng trong?', ['Làm dây điện', 'Làm thực phẩm', 'Làm thuốc nổ', 'Sản xuất chip điện tử, pin mặt trời, thủy tinh'], 3, 'Si tinh khiết = vật liệu bán dẫn quan trọng; SiO₂ = thuỷ tinh.', [
      '<b>Silic (Si)</b> là phi kim quan trọng bậc nhất trong công nghệ vì là <i>chất bán dẫn</i>.',
      '<ul><li>Si siêu tinh khiết ⇒ chế tạo <b>chip vi xử lý, transistor, pin mặt trời</b>.</li><li>Hợp chất <b>SiO₂</b> ⇒ sản xuất <i>thuỷ tinh</i>, làm khuôn đúc, vật liệu chịu lửa.</li></ul>',
      'Si không dùng làm dây dẫn điện (đó là việc của kim loại như Cu, Al).',
    ], ['Sai — dây điện dùng Cu/Al; Si là bán dẫn, không dùng làm dây dẫn.', 'Sai — Si không dùng làm thực phẩm.', 'Sai — Si không dùng làm thuốc nổ.', 'Đúng — Si là vật liệu bán dẫn cho chip, pin mặt trời; SiO₂ làm thuỷ tinh.']),
    Q('SiO₂ là?', ['Cát thạch anh', 'Khí không màu ở nhiệt độ thường', 'Chất lỏng nhớt giống dầu silicon', 'Kim loại'], 0, 'SiO₂ là chất rắn — thành phần chính của cát thạch anh, thuỷ tinh.', [
      '<b>SiO₂ (silic đioxit)</b> là chất <b>rắn</b>, không tan trong nước, là thành phần chính của <i>cát thạch anh, đá thạch anh, thuỷ tinh</i>.',
      'Mặc dù có công thức giống "đioxit" như CO₂, nhưng SiO₂ <i>khác hẳn</i> CO₂: SiO₂ rắn, nhiệt độ nóng chảy rất cao (~1700°C), còn CO₂ là khí.',
      'SiO₂ là oxit axit, tác dụng với kiềm nóng chảy và một số oxit bazơ ở nhiệt độ cao.',
    ], ['Đúng — SiO₂ là chất rắn, thành phần chính của cát thạch anh và thuỷ tinh.', 'Sai — SiO₂ là chất rắn, không phải khí (khác CO₂).', 'Sai — SiO₂ là rắn, không phải chất lỏng nhớt.', 'Sai — SiO₂ là oxit phi kim, không phải kim loại.']),
  ]),

  M(8, 'Lưu huỳnh (S) và photpho (P)', [
    Q('Lưu huỳnh ở dạng tinh thể có màu?', ['Đen (giống cacbon)', 'Trắng đục (giống photpho trắng)', 'Xanh lam (giống CuSO₄·5H₂O)', 'Vàng nhạt'], 3, 'S rắn màu vàng nhạt, không tan trong nước, tan trong dung môi hữu cơ.', [
      'Lưu huỳnh <b>S</b> là phi kim rắn màu <b>vàng nhạt</b> ở điều kiện thường, không tan trong nước nhưng tan trong dung môi hữu cơ.',
      'S là chất oxi hoá yếu (đẩy kim loại lên hoá trị thấp): <code>Fe + S → FeS</code>; đồng thời cháy trong O₂ tạo SO₂.',
      'Phân biệt màu: <i>S vàng nhạt, C/than đen, P trắng đục, CuSO₄·5H₂O xanh lam</i>.',
    ], ['Sai — đen là màu của cacbon/than, không phải lưu huỳnh.', 'Sai — trắng đục là màu của P trắng, không phải S.', 'Sai — xanh lam là màu CuSO₄·5H₂O, không phải S.', 'Đúng — S rắn màu vàng nhạt, không tan trong nước.']),
    Q('S + O₂ → ?', ['S₂O (oxit không tồn tại)', 'SO₃ (chỉ tạo khi có xúc tác V₂O₅)', 'SO₂', 'SO (hợp chất không bền)'], 2, 'S cháy trong không khí tạo SO₂ (lưu huỳnh đioxit) — khí mùi hắc.', [
      'Khi cháy trong oxi (không khí), lưu huỳnh tạo <b>SO₂ (lưu huỳnh đioxit)</b> — khí không màu, mùi hắc, gây ho.',
      'Phương trình: <code>S + O₂ →(t°) SO₂</code>. Đây là phản ứng cháy điển hình của phi kim.',
      'SO₃ chỉ tạo ra khi <i>oxi hoá tiếp</i> SO₂ với xúc tác V₂O₅ (trong sản xuất H₂SO₄), không phải sản phẩm cháy trực tiếp.',
    ], ['Sai — S₂O không phải sản phẩm cháy của S.', 'Sai — SO₃ chỉ tạo khi oxi hoá SO₂ có xúc tác V₂O₅; cháy trực tiếp cho SO₂.', 'Đúng — S + O₂ → SO₂ (lưu huỳnh đioxit), khí mùi hắc.', 'Sai — SO không phải sản phẩm chính khi S cháy.']),
    Q('SO₂ + Ca(OH)₂ → ?', ['CaSO₂ (công thức sai về hoá trị)', 'Không phản ứng', 'CaSO₃ + H₂O', 'CaSO₄ + H₂'], 2, 'SO₂ tan trong nước tạo H₂SO₃, phản ứng với bazơ tạo muối sunfit.', [
      '<b>SO₂ là oxit axit</b> nên tác dụng với dung dịch bazơ Ca(OH)₂ tạo muối và nước.',
      'Phương trình: <code>SO₂ + Ca(OH)₂ → CaSO₃↓ + H₂O</code>. Muối tạo thành là <b>canxi sunfit CaSO₃</b> (gốc =SO₃, từ axit H₂SO₃).',
      'Lưu ý phân biệt gốc: <i>sunfit SO₃²⁻ (từ SO₂/H₂SO₃)</i> khác <i>sunfat SO₄²⁻ (từ SO₃/H₂SO₄)</i>.',
    ], ['Sai — CaSO₂ sai hoá trị; muối đúng là CaSO₃ (sunfit).', 'Sai — SO₂ là oxit axit nên phản ứng với bazơ Ca(OH)₂.', 'Đúng — SO₂ + Ca(OH)₂ → CaSO₃↓ + H₂O (muối sunfit).', 'Sai — không tạo CaSO₄ và H₂; sản phẩm là muối sunfit và nước.']),
    Q('H₂SO₄ đặc nóng có tính chất đặc trưng?', ['Tính bazơ', 'Tính oxi hoá mạnh, hút nước, gây bỏng', 'Tính khử mạnh', 'Trung hoà'], 1, 'H₂SO₄ đặc: oxi hoá mạnh, hút nước mạnh, ăn mòn.', [
      'Axit sunfuric đặc, nóng có những tính chất <b>rất đặc biệt</b>, khác hẳn H₂SO₄ loãng.',
      '<ul><li><b>Tính oxi hoá mạnh</b>: tác dụng được cả Cu, Ag (kim loại sau H), sinh SO₂.</li><li><b>Tính háo nước</b>: hút nước mạnh, làm than hoá đường, giấy, vải.</li><li><b>Ăn mòn, gây bỏng nặng</b> ⇒ phải pha loãng cẩn thận (rót axit vào nước).</li></ul>',
    ], ['Sai — H₂SO₄ là axit, không có tính bazơ.', 'Đúng — H₂SO₄ đặc nóng oxi hoá mạnh, hút nước mạnh, gây bỏng nặng.', 'Sai — H₂SO₄ đặc là chất oxi hoá, không phải chất khử.', 'Sai — H₂SO₄ là axit mạnh, không trung hoà.']),
    Q('Photpho có 2 dạng thù hình chính?', ['P xanh và P vàng', 'P kim loại', 'P lỏng và P khí', 'P trắng và P đỏ'], 3, 'P trắng: rất độc, dễ cháy; P đỏ: bền hơn, ít độc.', [
      'Photpho <b>P</b> là phi kim có hai dạng <b>thù hình</b> chính, tính chất khác nhau rõ rệt.',
      '<ul><li><b>P trắng</b>: chất rắn trắng đục, <i>rất độc</i>, dễ bốc cháy trong không khí, phát quang trong tối.</li><li><b>P đỏ</b>: bền hơn, ít độc, dùng làm vỏ bao diêm.</li></ul>',
      'Đun nóng P trắng (không có không khí) chuyển thành P đỏ; đây là minh hoạ cho hiện tượng thù hình.',
    ], ['Sai — không có dạng P xanh; thù hình chính là P trắng và P đỏ.', 'Sai — P là phi kim, không có dạng kim loại trong chương trình.', 'Sai — lỏng/khí là trạng thái, không phải thù hình.', 'Đúng — 2 dạng thù hình chính: P trắng (độc, dễ cháy) và P đỏ (bền hơn).']),
    Q('Ứng dụng của H₃PO₄?', ['Sản xuất phân lân, chất tẩy rửa, đồ uống có gas', 'Làm thực phẩm trực tiếp', 'Làm thuốc nổ', 'Làm xăng'], 0, 'H₃PO₄ làm phân DAP, MAP; là chất phụ gia trong nhiều ngành công nghiệp.', [
      '<b>Axit photphoric H₃PO₄</b> là axit trung bình, có nhiều ứng dụng quan trọng trong nông nghiệp và công nghiệp.',
      '<ul><li>Sản xuất <b>phân lân</b> (DAP, MAP, supe lân) cung cấp nguyên tố P cho cây.</li><li>Làm <b>chất tẩy rửa</b>, xử lý bề mặt kim loại.</li><li>Phụ gia tạo vị chua trong một số <i>đồ uống có gas</i> (với liều lượng cho phép).</li></ul>',
    ], ['Đúng — H₃PO₄ làm phân lân (DAP, MAP), chất tẩy rửa, phụ gia đồ uống có gas.', 'Sai — H₃PO₄ là axit, không ăn trực tiếp.', 'Sai — H₃PO₄ không dùng làm thuốc nổ.', 'Sai — H₃PO₄ không liên quan đến sản xuất xăng.']),
  ]),

  M(9, 'Định luật Ôm — Cường độ dòng điện và hiệu điện thế', [
    Q('Định luật Ôm phát biểu?', ['R = I·U', 'I = U/R', 'U = I/R', 'I = U·R'], 1, 'I = U/R (I: cường độ dòng điện, U: hiệu điện thế, R: điện trở).', [
      '<b>Định luật Ôm</b>: cường độ dòng điện chạy qua dây dẫn <i>tỉ lệ thuận</i> với hiệu điện thế đặt vào hai đầu và <i>tỉ lệ nghịch</i> với điện trở của dây.',
      'Công thức: <code>I = U / R</code> với <b>I</b> (ampe, A), <b>U</b> (vôn, V), <b>R</b> (ôm, Ω).',
      'Từ đó suy ra: <code>U = I·R</code> và <code>R = U / I</code>. Nắm vững tam giác U–I–R giúp giải hầu hết bài tập điện học lớp 9.',
    ], ['Sai — biến đổi sai; đúng phải là R = U/I, không phải R = I·U.', 'Đúng — định luật Ôm: I = U/R.', 'Sai — đúng phải là U = I·R, không phải U = I/R.', 'Sai — I tỉ lệ nghịch với R nên là U/R chứ không phải U·R.']),
    Q('Đơn vị của cường độ dòng điện?', ['Oát (W)', 'Ampe (A)', 'Ôm (Ω)', 'Vôn (V)'], 1, 'Cường độ dòng điện đo bằng Ampe (A).', [
      '<b>Cường độ dòng điện (I)</b> cho biết lượng điện tích qua tiết diện dây trong một đơn vị thời gian; đo bằng <b>ampe (A)</b>, dùng <i>ampe kế</i> mắc nối tiếp.',
      'Bảng đơn vị điện học cần nhớ: <code>I → A (ampe)</code>, <code>U → V (vôn)</code>, <code>R → Ω (ôm)</code>, <code>P → W (oát)</code>.',
    ], ['Sai — Oát (W) là đơn vị công suất, không phải cường độ dòng điện.', 'Đúng — cường độ dòng điện đo bằng Ampe (A).', 'Sai — Ôm (Ω) là đơn vị điện trở.', 'Sai — Vôn (V) là đơn vị hiệu điện thế.']),
    Q('Đơn vị điện trở?', ['Vôn (đơn vị hiệu điện thế)', 'Ampe (đơn vị cường độ dòng điện)', 'Oát (đơn vị công suất điện)', 'Ôm (Ω)'], 3, 'Điện trở đo bằng Ôm (Ω).', [
      '<b>Điện trở (R)</b> đặc trưng cho mức độ cản trở dòng điện của vật dẫn; đo bằng <b>ôm (Ω)</b>.',
      'Định nghĩa từ định luật Ôm: <code>R = U / I</code>. Một vật dẫn có R = 1 Ω nếu đặt U = 1 V thì I = 1 A.',
      'Đừng nhầm Ω (điện trở) với V (hiệu điện thế), A (dòng điện) hay W (công suất).',
    ], ['Sai — Vôn là đơn vị hiệu điện thế, không phải điện trở.', 'Sai — Ampe là đơn vị cường độ dòng điện.', 'Sai — Oát là đơn vị công suất.', 'Đúng — điện trở đo bằng Ôm (Ω).']),
    Q('Tính I khi U = 12V, R = 4Ω?', ['3A', '8A', '0,33A', '48A'], 0, 'I = U/R = 12/4 = 3 A.', [
      'Áp dụng trực tiếp <b>định luật Ôm</b>: <code>I = U / R</code>.',
      'Thay số: <code>I = 12 V / 4 Ω = 3 A</code>.',
      'Lưu ý các lỗi hay gặp: <i>không</i> nhân (12×4 = 48) và <i>không</i> đảo tử mẫu (4/12 ≈ 0,33). Phải lấy U chia cho R.',
    ], ['Đúng — I = U/R = 12/4 = 3 A.', 'Sai — 8 không phải kết quả của 12/4; có thể nhầm phép tính.', 'Sai — 0,33 là kết quả của 4/12 (đảo tử mẫu).', 'Sai — 48 là 12×4 (nhầm nhân thay vì chia).']),
    Q('Khi R không đổi, nếu U tăng 2 lần thì I?', ['Không đổi', 'Tăng 2 lần', 'Giảm 2 lần', 'Tăng 4 lần'], 1, 'I tỉ lệ thuận với U khi R không đổi.', [
      'Theo định luật Ôm <code>I = U / R</code>: khi <b>R giữ nguyên</b>, cường độ dòng điện <b>tỉ lệ thuận</b> với hiệu điện thế.',
      'Vì vậy U tăng 2 lần ⇒ I tăng 2 lần; U giảm một nửa ⇒ I giảm một nửa. Đây là quan hệ <i>bậc nhất (tuyến tính)</i>, không phải bình phương.',
    ], ['Sai — I phụ thuộc U nên không thể không đổi khi U thay đổi.', 'Đúng — I = U/R, R không đổi nên I tỉ lệ thuận U, tăng 2 lần.', 'Sai — I tỉ lệ thuận U (không nghịch) nên tăng chứ không giảm.', 'Sai — quan hệ là tuyến tính (bậc 1), không phải bình phương.']),
    Q('Mạch nối tiếp R₁ = 2Ω, R₂ = 3Ω thì R_tđ = ?', ['1Ω', '6Ω', '0,5Ω', '5Ω'], 3, 'Mắc nối tiếp: R_tđ = R₁ + R₂ = 2 + 3 = 5 Ω.', [
      'Trong <b>đoạn mạch nối tiếp</b>, điện trở tương đương bằng <i>tổng</i> các điện trở thành phần: <code>R_tđ = R₁ + R₂ + …</code>.',
      'Thay số: <code>R_tđ = 2 + 3 = 5 Ω</code>. Điện trở tương đương luôn <b>lớn hơn</b> mỗi điện trở thành phần.',
      'Đừng nhầm với công thức mạch song song (lấy nghịch đảo).',
    ], ['Sai — 1 là hiệu hai điện trở, không phải tổng nối tiếp.', 'Sai — 6 là tích 2×3, không phải tổng nối tiếp.', 'Sai — 0,5 áp dụng nhầm công thức song song.', 'Đúng — nối tiếp: R_tđ = R₁ + R₂ = 2 + 3 = 5 Ω.']),
  ]),

  M(10, 'Mạch điện — Nối tiếp và song song', [
    Q('Trong mạch nối tiếp, I qua các điện trở?', ['Tỉ lệ với R', 'Bằng nhau', 'Tỉ lệ nghịch với R', 'Khác nhau'], 1, 'Mạch nối tiếp: I₁ = I₂ = I (dòng điện như nhau qua các điện trở).', [
      'Trong <b>mạch nối tiếp</b>, dòng điện chỉ có một đường đi duy nhất nên <i>cường độ dòng điện bằng nhau</i> tại mọi điểm: <code>I = I₁ = I₂</code>.',
      'Các đặc điểm khác của mạch nối tiếp: <code>U = U₁ + U₂</code> (hiệu điện thế cộng dồn) và <code>R_tđ = R₁ + R₂</code> (điện trở cộng dồn).',
    ], ['Sai — trong nối tiếp dòng điện như nhau, không tỉ lệ với R.', 'Đúng — mạch nối tiếp: I₁ = I₂ = I, dòng qua các điện trở bằng nhau.', 'Sai — dòng nối tiếp bằng nhau, không tỉ lệ nghịch với R.', 'Sai — dòng qua các điện trở nối tiếp luôn bằng nhau.']),
    Q('Trong mạch nối tiếp, hiệu điện thế?', ['U = U₁·U₂', 'U = U₁ = U₂', 'U = U₁ + U₂', 'U = U₁/U₂'], 2, 'Tổng hiệu điện thế = tổng các U thành phần.', [
      'Với <b>mạch nối tiếp</b>, hiệu điện thế hai đầu đoạn mạch bằng <i>tổng</i> các hiệu điện thế thành phần: <code>U = U₁ + U₂ + …</code>.',
      'Tóm tắt 3 đặc trưng của mạch nối tiếp: <ul><li>Dòng điện: <code>I = I₁ = I₂</code> (bằng nhau).</li><li>Hiệu điện thế: <code>U = U₁ + U₂</code> (cộng).</li><li>Điện trở: <code>R = R₁ + R₂</code> (cộng).</li></ul>',
    ], ['Sai — không nhân các hiệu điện thế.', 'Sai — U bằng nhau là đặc điểm của mạch song song, không phải nối tiếp.', 'Đúng — nối tiếp: U = U₁ + U₂ (tổng các hiệu điện thế thành phần).', 'Sai — không lấy thương các hiệu điện thế.']),
    Q('Trong mạch song song, U?', ['Khác nhau', 'Cộng dồn', 'Bằng nhau trên các nhánh', 'Bằng 0'], 2, 'Mạch song song: U₁ = U₂ = U (hiệu điện thế chung).', [
      'Trong <b>mạch song song</b>, các nhánh đều nối chung vào hai điểm nên hiệu điện thế hai đầu mỗi nhánh <i>bằng nhau</i>: <code>U = U₁ = U₂</code>.',
      'Tóm tắt đặc trưng mạch song song: <ul><li>Hiệu điện thế: <code>U = U₁ = U₂</code> (bằng nhau).</li><li>Dòng điện: <code>I = I₁ + I₂</code> (cộng).</li><li>Điện trở: <code>1/R = 1/R₁ + 1/R₂</code> (nghịch đảo).</li></ul>',
    ], ['Sai — song song có U bằng nhau trên các nhánh.', 'Sai — cộng dồn U là đặc điểm mạch nối tiếp.', 'Đúng — song song: U₁ = U₂ = U, hiệu điện thế chung cho các nhánh.', 'Sai — U trên các nhánh khác 0.']),
    Q('Mạch song song R₁ = 6Ω, R₂ = 3Ω thì R_tđ = ?', ['1Ω', '4,5Ω', '2Ω', '9Ω'], 2, '1/R = 1/R₁ + 1/R₂ = 1/6 + 1/3 = 3/6 ⇒ R = 2 Ω.', [
      'Với <b>mạch song song</b>, dùng công thức nghịch đảo: <code>1/R_tđ = 1/R₁ + 1/R₂</code>.',
      'Thay số: <code>1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2</code> ⇒ <code>R_tđ = 2 Ω</code>.',
      'Điện trở tương đương của mạch song song luôn <b>nhỏ hơn</b> điện trở nhỏ nhất trong mạch (ở đây nhỏ hơn 3 Ω).',
    ], ['Sai — 1 không đúng; tính 1/6 + 1/3 = 1/2 ⇒ R = 2.', 'Sai — 4,5 là trung bình cộng (nhầm cách tính).', 'Đúng — 1/R = 1/6 + 1/3 = 1/2 ⇒ R_tđ = 2 Ω.', 'Sai — 9 là tổng (nhầm công thức nối tiếp).']),
    Q('Khi nào mắc thêm song song, R_tđ?', ['Bằng 0', 'Giảm xuống', 'Không đổi', 'Tăng lên'], 1, 'Thêm điện trở song song ⇒ R_tđ luôn giảm (nhỏ hơn điện trở nhỏ nhất).', [
      'Mỗi khi mắc thêm một điện trở <b>song song</b>, ta tạo thêm "đường đi" cho dòng điện nên tổng cản trở <i>giảm</i> ⇒ <b>R_tđ giảm</b>.',
      'Kết quả luôn nhỏ hơn điện trở nhỏ nhất trong mạch. (Ngược lại, mắc thêm <i>nối tiếp</i> thì R_tđ <b>tăng</b>.)',
    ], ['Sai — R_tđ giảm nhưng không về 0.', 'Đúng — thêm nhánh song song làm R_tđ giảm, nhỏ hơn điện trở nhỏ nhất.', 'Sai — R_tđ thay đổi (giảm) khi thêm nhánh song song.', 'Sai — tăng R_tđ là đặc điểm khi mắc nối tiếp thêm.']),
    Q('Điện trở dây dẫn phụ thuộc?', ['Chỉ tiết diện', 'Chỉ chiều dài', 'Chỉ vật liệu', 'Vật liệu (ρ), chiều dài (l), tiết diện (S): R = ρ·l/S'], 3, 'Công thức: R = ρ·l/S.', [
      'Điện trở của một dây dẫn phụ thuộc <b>ba yếu tố</b>, gói gọn trong công thức: <code>R = ρ·l / S</code>.',
      '<ul><li><b>ρ (điện trở suất)</b>: phụ thuộc bản chất vật liệu (đồng nhỏ hơn sắt).</li><li><b>l (chiều dài)</b>: dây càng dài, R càng lớn (tỉ lệ thuận).</li><li><b>S (tiết diện)</b>: dây càng to, R càng nhỏ (tỉ lệ nghịch).</li></ul>',
    ], ['Sai — tiết diện chỉ là một yếu tố; còn phụ thuộc ρ và l.', 'Sai — chiều dài chỉ là một yếu tố; còn ρ và S.', 'Sai — vật liệu (ρ) chỉ là một yếu tố; còn l và S.', 'Đúng — R = ρ·l/S, phụ thuộc cả vật liệu, chiều dài và tiết diện.']),
  ]),

  M(11, 'Công và công suất điện', [
    Q('Công suất điện được tính bởi?', ['P = U/I', 'P = U·I', 'P = U²·I', 'P = U + I'], 1, 'P = U·I (W); ngoài ra P = I²R = U²/R.', [
      '<b>Công suất điện (P)</b> cho biết lượng điện năng tiêu thụ trong một đơn vị thời gian. Công thức cơ bản: <code>P = U·I</code>.',
      'Kết hợp định luật Ôm, ta có thêm hai biểu thức: <code>P = I²·R</code> và <code>P = U² / R</code>.',
      'Tuỳ đề cho biết đại lượng nào (U, I, R) mà chọn công thức phù hợp.',
    ], ['Sai — U/I cho điện trở R, không phải công suất.', 'Đúng — P = U·I (ngoài ra P = I²R = U²/R).', 'Sai — công thức U²·I không có trong các biểu thức công suất.', 'Sai — công suất là tích U·I, không phải tổng.']),
    Q('Đơn vị công suất điện?', ['Vôn (đơn vị hiệu điện thế)', 'Ampe (đơn vị cường độ dòng điện)', 'Jun (J)', 'Oát (W)'], 3, 'Công suất đo bằng Oát (W) = J/s.', [
      '<b>Công suất</b> đo bằng <b>oát (W)</b>. Định nghĩa: <code>1 W = 1 J/s</code> (mỗi giây tiêu thụ 1 jun năng lượng).',
      'Phân biệt: <i>oát (W) là công suất</i> còn <i>jun (J) là công/năng lượng</i>. Bội số thường gặp: 1 kW = 1000 W.',
    ], ['Sai — Vôn là đơn vị hiệu điện thế.', 'Sai — Ampe là đơn vị cường độ dòng điện.', 'Sai — Jun là đơn vị công/năng lượng, không phải công suất.', 'Đúng — công suất đo bằng Oát (W) = J/s.']),
    Q('Đèn ghi 220V – 60W. Cường độ dòng điện qua đèn?', ['0,27A', '1A', '0,5A', '3,67A'], 0, 'I = P/U = 60/220 ≈ 0,27 A.', [
      'Số ghi trên đèn (220V – 60W) là <b>hiệu điện thế định mức</b> và <b>công suất định mức</b>.',
      'Từ công thức <code>P = U·I</code> suy ra <code>I = P / U</code>.',
      'Thay số: <code>I = 60 / 220 ≈ 0,27 A</code>. (Lỗi hay gặp: lấy 220/60 ≈ 3,67 là đảo tử mẫu.)',
    ], ['Đúng — I = P/U = 60/220 ≈ 0,27 A.', 'Sai — 1 A không khớp với 60/220.', 'Sai — 0,5 A không khớp với phép tính 60/220.', 'Sai — 3,67 là 220/60 (đảo tử mẫu).']),
    Q('Công của dòng điện?', ['A = U/I', 'A = U + I·t', 'A = P·t = U·I·t', 'A = R·I'], 2, 'A = công suất × thời gian = U·I·t.', [
      '<b>Công của dòng điện (A)</b> chính là <i>điện năng tiêu thụ</i>, bằng công suất nhân thời gian: <code>A = P·t = U·I·t</code>.',
      'Đơn vị là <b>jun (J)</b>; trong thực tế dùng kilôoát giờ (kWh).',
      'Kết hợp định luật Ôm có thể viết <code>A = I²·R·t = (U²/R)·t</code>.',
    ], ['Sai — U/I cho điện trở, không phải công.', 'Sai — không có công thức cộng U với I·t.', 'Đúng — A = P·t = U·I·t (công = công suất × thời gian).', 'Sai — R·I cho hiệu điện thế, không phải công.']),
    Q('Đơn vị của điện năng tiêu thụ trên hoá đơn điện?', ['W (đơn vị công suất tức thời)', 'kWh (kilôoát giờ)', 'V (đơn vị hiệu điện thế)', 'J (đơn vị năng lượng trong hệ SI)'], 1, 'Hoá đơn điện tính bằng kWh = 1 000 W · 3 600 s = 3,6·10⁶ J.', [
      'Trên hoá đơn tiền điện, <b>điện năng tiêu thụ</b> (số điện) được tính bằng đơn vị <b>kWh (kilôoát giờ)</b>, gọi dân dã là "số điện".',
      '<code>1 kWh</code> là điện năng tiêu thụ của thiết bị công suất 1 kW chạy trong 1 giờ. Đổi ra: <code>1 kWh = 3 600 000 J = 3,6 MJ</code>.',
      'Tuy J là đơn vị SI của năng lượng, nhưng J quá nhỏ cho sinh hoạt nên thực tế dùng kWh.',
    ], ['Sai — W là công suất tức thời, không phải điện năng tiêu thụ.', 'Đúng — hoá đơn điện tính bằng kWh (kilôoát giờ).', 'Sai — V là hiệu điện thế, không đo điện năng.', 'Sai — J đúng là đơn vị năng lượng SI nhưng hoá đơn thực tế dùng kWh.']),
    Q('1 kWh bằng bao nhiêu J?', ['3 600', '3 600 000', '3 600·1 000', '1 000'], 1, '1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6 MJ.', [
      'Để đổi kWh ra jun, dùng công thức <code>A = P·t</code> với P tính bằng W, t tính bằng giây.',
      '<code>1 kWh = 1 000 W × 3 600 s = 3 600 000 J = 3,6·10⁶ J</code>.',
      'Ghi nhớ mốc: <i>1 giờ = 3600 giây; 1 kW = 1000 W</i> ⇒ nhân lại được 3,6 triệu jun.',
    ], ['Sai — 3 600 J chỉ là 1 W·h, thiếu thừa số 1000.', 'Đúng — 1 kWh = 1 000 W × 3 600 s = 3 600 000 J.', 'Sai — biểu thức chưa nhân ra; kết quả phải là 3 600 000.', 'Sai — 1 000 J quá nhỏ so với 1 kWh.']),
  ]),

  M(12, 'Định luật Jun-Len-xơ — Nhiệt lượng toả ra', [
    Q('Định luật Jun-Len-xơ?', ['Q = I²/R·t', 'Q = I·R·t', 'Q = I·R/t', 'Q = I²·R·t'], 3, 'Nhiệt lượng tỏa ra trên điện trở khi có dòng điện đi qua: Q = I²Rt.', [
      '<b>Định luật Jun – Len-xơ</b>: nhiệt lượng toả ra ở một vật dẫn <i>tỉ lệ thuận</i> với bình phương cường độ dòng điện, với điện trở và với thời gian.',
      'Công thức: <code>Q = I²·R·t</code>, trong đó Q (jun, J), I (A), R (Ω), t (giây, s).',
      'Đây là cơ sở hoạt động của các thiết bị toả nhiệt (bàn ủi, bếp điện) và cũng giải thích hao phí điện trên đường dây.',
    ], ['Sai — sai vị trí R (chia thay vì nhân); đúng là Q = I²Rt.', 'Sai — thiếu bình phương I; đúng là I².', 'Sai — sai cả mũ của I lẫn vị trí t.', 'Đúng — Q = I²·R·t, nhiệt lượng tỏa ra trên điện trở.']),
    Q('Đơn vị nhiệt lượng?', ['Vôn (đơn vị hiệu điện thế)', 'Jun (J) hoặc calo (cal)', 'Oát (đơn vị công suất)', 'Ampe (đơn vị cường độ dòng điện)'], 1, 'J là đơn vị SI; 1 cal ≈ 4,18 J.', [
      '<b>Nhiệt lượng (Q)</b> là một dạng năng lượng nên đơn vị trong hệ SI là <b>jun (J)</b>; ngoài ra còn dùng <b>calo (cal)</b>.',
      'Hệ thức đổi đơn vị: <code>1 cal ≈ 4,18 J</code> và ngược lại <code>1 J ≈ 0,24 cal</code>.',
      'Đừng nhầm jun (năng lượng) với oát (công suất) hay vôn (hiệu điện thế).',
    ], ['Sai — Vôn là đơn vị hiệu điện thế.', 'Đúng — nhiệt lượng đo bằng Jun (J) hoặc calo (cal); 1 cal ≈ 4,18 J.', 'Sai — Oát là đơn vị công suất.', 'Sai — Ampe là đơn vị cường độ dòng điện.']),
    Q('Tính Q khi I = 2A, R = 10Ω, t = 60s?', ['2 400 J', '1 200 J', '600 J', '120 J'], 0, 'Q = 2²·10·60 = 4·10·60 = 2 400 J.', [
      'Áp dụng định luật Jun – Len-xơ: <code>Q = I²·R·t</code>. Chú ý phải <b>bình phương I trước</b>.',
      'Thay số: <code>Q = 2² × 10 × 60 = 4 × 10 × 60 = 2 400 J</code>.',
      'Lỗi phổ biến: quên bình phương I (dùng 2 thay vì 4) ⇒ ra 1 200 J là sai.',
    ], ['Đúng — Q = I²Rt = 2²·10·60 = 2 400 J.', 'Sai — 1 200 quên bình phương I (dùng I=2 thay vì 4).', 'Sai — 600 sai hệ số nhiều lần.', 'Sai — 120 chỉ là 2·60 (bỏ qua R và bình phương).']),
    Q('Ứng dụng định luật Jun-Len-xơ?', ['Pin sạc dự phòng điện thoại', 'Bóng đèn LED', 'Bàn ủi, bếp điện, lò sưởi, nồi cơm điện', 'Quạt điện'], 2, 'Các thiết bị toả nhiệt khi dòng điện qua dây điện trở: bàn ủi, bếp điện…', [
      'Định luật Jun – Len-xơ là cơ sở của các thiết bị <b>biến điện năng thành nhiệt năng</b> nhờ dây có điện trở lớn (dây mayso).',
      '<ul><li>Toả nhiệt mong muốn: <b>bàn ủi, bếp điện, lò sưởi, nồi cơm điện, ấm siêu tốc</b>.</li><li>Toả nhiệt <i>không mong muốn</i>: hao phí trên đường dây tải điện.</li></ul>',
      'Quạt điện, LED không dựa chủ yếu vào toả nhiệt (biến điện thành cơ năng / ánh sáng).',
    ], ['Sai — pin sạc tích trữ điện, không phải thiết bị toả nhiệt theo Jun-Len-xơ.', 'Sai — LED chuyển điện thành ánh sáng, hiệu suất cao, không dựa trên toả nhiệt.', 'Đúng — bàn ủi, bếp điện, lò sưởi, nồi cơm điện toả nhiệt nhờ dây điện trở (Jun-Len-xơ).', 'Sai — quạt biến điện thành cơ năng, không phải toả nhiệt là chính.']),
    Q('Để giảm hao phí điện năng do nhiệt khi truyền tải xa, người ta?', ['Tăng U lên cao (giảm I)', 'Dùng dây nhỏ', 'Tăng I', 'Giảm R'], 0, 'P_hp = I²R; tăng U ⇒ giảm I cùng công suất ⇒ giảm P_hp đáng kể.', [
      'Hao phí điện năng trên đường dây tỏa ra dưới dạng nhiệt: <code>P_hp = I²·R</code>. Muốn giảm hao phí, hiệu quả nhất là <b>giảm I</b>.',
      'Vì công suất truyền tải <code>P = U·I</code> không đổi, nên <b>tăng hiệu điện thế U</b> sẽ làm I giảm ⇒ I² giảm rất mạnh ⇒ hao phí giảm nhiều.',
      'Đó là lý do điện được truyền đi ở <i>hiệu điện thế rất cao</i> (110 kV, 220 kV, 500 kV) rồi mới hạ áp về dùng.',
    ], ['Đúng — tăng U truyền tải làm giảm I cùng công suất ⇒ P_hp = I²R giảm mạnh.', 'Sai — dây nhỏ làm R tăng ⇒ hao phí tăng.', 'Sai — tăng I làm P_hp = I²R tăng, đi ngược mục tiêu.', 'Sai — giảm R có lợi nhưng giải pháp chính và hiệu quả nhất là tăng U.']),
    Q('Vì sao khi tăng hiệu điện thế thì giảm hao phí?', ['Không có lý do', 'Vì t nhỏ', 'Vì R nhỏ', 'Vì P_hp = I²R, mà I = P/U; tăng U ⇒ giảm I ⇒ giảm I² mạnh'], 3, 'Hao phí tỉ lệ I² nên tăng U gấp đôi ⇒ I giảm 1/2 ⇒ hao phí giảm 4 lần.', [
      'Lập luận định lượng: hao phí <code>P_hp = I²·R</code>; mà với công suất P không đổi thì <code>I = P / U</code>.',
      'Thay vào: <code>P_hp = (P/U)²·R = P²·R / U²</code>. Vậy hao phí <b>tỉ lệ nghịch với U²</b>.',
      'Hệ quả: tăng U gấp đôi ⇒ I giảm còn một nửa ⇒ I² giảm 4 lần ⇒ <b>hao phí giảm 4 lần</b>.',
    ], ['Sai — có lý do rõ ràng dựa trên công thức hao phí.', 'Sai — thời gian không phải nguyên nhân giảm hao phí.', 'Sai — R không đổi khi tăng U; nguyên nhân là I giảm.', 'Đúng — P_hp = I²R, I = P/U; tăng U ⇒ I giảm ⇒ I² giảm rất mạnh (tăng U 2 lần, hao phí giảm 4 lần).']),
  ]),

  M(13, 'Sử dụng an toàn và tiết kiệm điện', [
    Q('Tại sao phải sử dụng điện an toàn?', ['Giảm hao phí điện năng trên đường dây', 'Tăng tuổi thọ thiết bị', 'Tiết kiệm tiền', 'Tránh điện giật, cháy nổ, hoả hoạn'], 3, 'An toàn điện = an toàn tính mạng + tài sản.', [
      '<b>An toàn điện</b> đặt mục tiêu hàng đầu là <i>bảo vệ tính mạng và tài sản</i>: tránh điện giật, cháy nổ, hoả hoạn.',
      'Dòng điện qua người chỉ vài chục mA đã nguy hiểm; nguồn điện gia đình 220 V hoàn toàn có thể gây tử vong.',
      'Tiết kiệm điện hay tăng tuổi thọ thiết bị là <i>lợi ích phụ</i>, không phải mục tiêu chính của an toàn điện.',
    ], ['Sai — đây là mục tiêu tiết kiệm, không phải lý do chính của an toàn điện.', 'Sai — tuổi thọ thiết bị là lợi ích phụ, không phải mục đích an toàn.', 'Sai — tiết kiệm tiền là lợi ích phụ; an toàn nhắm tới tính mạng.', 'Đúng — an toàn điện trước hết để tránh điện giật, cháy nổ, hoả hoạn (bảo vệ tính mạng và tài sản).']),
    Q('Khi sửa điện cần?', ['Dùng tay không', 'Ngắt nguồn điện trước khi sửa', 'Sửa thẳng', 'Sửa khi đang có điện'], 1, 'Quy tắc bắt buộc: ngắt cầu dao trước khi thao tác.', [
      '<b>Quy tắc số một</b> khi sửa chữa điện: <i>ngắt nguồn điện (cầu dao, aptomat) trước khi thao tác</i>.',
      'Khi mạch đã ngắt điện thì không còn dòng điện chạy qua ⇒ thao tác mới an toàn. Nên dùng thêm <b>bút thử điện</b> để kiểm tra chắc chắn.',
      'Tuyệt đối <i>không</i> sửa điện khi mạch còn điện, không dùng tay trần chạm dây trần.',
    ], ['Sai — tay không tiếp xúc điện rất nguy hiểm.', 'Đúng — ngắt nguồn (cầu dao) trước khi sửa là quy tắc bắt buộc.', 'Sai — phải ngắt điện trước, không sửa khi đang có điện.', 'Sai — sửa khi đang có điện dễ gây điện giật chết người.']),
    Q('Cầu chì có tác dụng?', ['Tự động ngắt mạch khi dòng điện quá lớn', 'Tạo dòng', 'Tăng điện áp', 'Tiết kiệm điện'], 0, 'Cầu chì bảo vệ mạch khỏi quá tải, ngắn mạch.', [
      '<b>Cầu chì</b> là thiết bị bảo vệ: bên trong có sợi chì (hoặc hợp kim) <i>nóng chảy và đứt</i> khi dòng điện vượt quá mức cho phép.',
      'Khi xảy ra <b>quá tải</b> hoặc <b>ngắn mạch</b>, dòng tăng đột ngột ⇒ cầu chì đứt ⇒ mạch bị ngắt, tránh cháy dây và hoả hoạn.',
      'Ngày nay aptomat (cầu dao tự động) cũng làm nhiệm vụ tương tự nhưng có thể đóng lại được.',
    ], ['Đúng — cầu chì nóng chảy và ngắt mạch khi dòng quá lớn, bảo vệ khỏi quá tải/ngắn mạch.', 'Sai — cầu chì không tạo dòng, nó bảo vệ mạch.', 'Sai — cầu chì không tăng điện áp.', 'Sai — cầu chì không có chức năng tiết kiệm điện.']),
    Q('Để tiết kiệm điện, nên?', ['Dùng bóng sợi đốt', 'Dùng đèn LED, tắt thiết bị khi không cần, dùng thiết bị có nhãn năng lượng cao', 'Bật cả ngày', 'Mở cửa tủ lạnh nhiều'], 1, 'LED tiết kiệm hơn sợi đốt 80%; tắt thiết bị + chọn thiết bị tiết kiệm năng lượng.', [
      'Tiết kiệm điện vừa giảm chi phí, vừa bảo vệ môi trường. Một số biện pháp hiệu quả:',
      '<ul><li>Dùng <b>đèn LED</b> thay bóng sợi đốt (LED chỉ tốn ~10–20% điện).</li><li><b>Tắt thiết bị</b> khi không sử dụng, rút phích cắm.</li><li>Chọn thiết bị có <b>nhãn năng lượng nhiều sao</b> (hiệu suất cao).</li></ul>',
    ], ['Sai — bóng sợi đốt tốn điện nhiều, đi ngược tiết kiệm.', 'Đúng — dùng LED, tắt thiết bị khi không cần, chọn thiết bị nhãn năng lượng cao.', 'Sai — bật cả ngày gây lãng phí điện.', 'Sai — mở tủ lạnh nhiều làm máy chạy nhiều, tốn điện hơn.']),
    Q('Đèn LED so với bóng sợi đốt?', ['Tiết kiệm điện hơn nhiều, tuổi thọ cao hơn', 'Tiêu tốn hơn', 'Đắt mãi mãi', 'Sáng kém hơn'], 0, 'LED chỉ tốn ~10-20% điện so với sợi đốt cùng độ sáng.', [
      'Bóng <b>sợi đốt</b> phát sáng bằng cách đốt nóng dây tóc ⇒ phần lớn điện biến thành <i>nhiệt vô ích</i>, hiệu suất chiếu sáng thấp.',
      'Đèn <b>LED</b> biến điện trực tiếp thành ánh sáng nên hiệu suất cao: cùng độ sáng nhưng chỉ tốn khoảng <code>10–20%</code> điện và <b>tuổi thọ cao hơn</b> nhiều lần.',
      'Dù giá mua ban đầu cao hơn, LED tiết kiệm chi phí về lâu dài.',
    ], ['Đúng — LED chỉ tốn ~10-20% điện so với sợi đốt cùng độ sáng và bền hơn nhiều.', 'Sai — LED tiêu tốn ít hơn, không nhiều hơn.', 'Sai — LED ngày càng rẻ và tiết kiệm dài hạn.', 'Sai — LED cho độ sáng tương đương hoặc hơn với cùng độ sáng yêu cầu.']),
    Q('Khi gặp người bị điện giật, ưu tiên?', ['Ngắt nguồn điện trước, sau đó sơ cứu', 'Kéo tay nạn nhân', 'Đổ nước', 'Gọi điện thoại'], 0, 'Ngắt nguồn là bước đầu tiên để cứu nạn nhân an toàn.', [
      'Khi gặp người bị điện giật, việc <b>đầu tiên</b> phải làm là <i>ngắt nguồn điện</i> (cầu dao, rút phích) để cắt dòng điện qua nạn nhân.',
      'Tuyệt đối <b>không</b> dùng tay trần kéo nạn nhân khi chưa ngắt điện (người cứu cũng bị giật), <b>không</b> đổ nước (nước dẫn điện).',
      'Sau khi ngắt điện và đưa nạn nhân ra nơi an toàn mới tiến hành sơ cứu (hô hấp nhân tạo nếu cần) và gọi cấp cứu 115.',
    ], ['Đúng — ngắt nguồn điện trước để an toàn, sau đó mới sơ cứu nạn nhân.', 'Sai — kéo tay trực tiếp khi chưa ngắt điện làm người cứu cũng bị giật.', 'Sai — đổ nước dẫn điện, càng nguy hiểm.', 'Sai — gọi điện thoại cần thiết nhưng phải ngắt nguồn cứu nạn nhân trước.']),
  ]),

  M(14, 'Hiện tượng cảm ứng điện từ — Định luật Faraday', [
    Q('Hiện tượng cảm ứng điện từ phát hiện bởi?', ['Galileo', 'Edison', 'Michael Faraday (1831)', 'Newton'], 2, 'Faraday phát hiện 1831: nam châm chuyển động qua cuộn dây sinh dòng điện.', [
      '<b>Michael Faraday</b> (nhà bác học người Anh) phát hiện hiện tượng <b>cảm ứng điện từ</b> năm <code>1831</code>.',
      'Thí nghiệm kinh điển: đưa nam châm chuyển động vào/ra một cuộn dây kín thì trong cuộn dây <i>xuất hiện dòng điện</i> (dòng điện cảm ứng).',
      'Phát hiện này mở đường cho máy phát điện, máy biến áp — nền tảng của ngành điện hiện đại.',
    ], ['Sai — Galileo nổi tiếng về thiên văn và cơ học, không phải cảm ứng điện từ.', 'Sai — Edison liên quan đèn điện và phát minh ứng dụng, không phải người phát hiện cảm ứng.', 'Đúng — Michael Faraday phát hiện hiện tượng cảm ứng điện từ năm 1831.', 'Sai — Newton thuộc cơ học cổ điển, không phải cảm ứng điện từ.']),
    Q('Điều kiện để xuất hiện dòng điện cảm ứng?', ['Từ thông qua mạch kín biến thiên', 'Có nguồn pin', 'Mạch hở', 'Có điện trở lớn'], 0, 'Định luật cảm ứng: từ thông biến thiên ⇒ suất điện động cảm ứng.', [
      'Điều kiện cốt lõi để có <b>dòng điện cảm ứng</b> là <i>từ thông qua mạch kín biến thiên</i> (thay đổi theo thời gian).',
      'Có thể làm từ thông biến thiên bằng cách: cho nam châm chuyển động lại gần/ra xa cuộn dây, thay đổi cường độ dòng trong cuộn dây bên cạnh, hoặc quay khung dây trong từ trường.',
      'Lưu ý: dòng cảm ứng <b>không cần pin</b>, nhưng mạch phải <b>kín</b> thì dòng mới chạy được.',
    ], ['Đúng — từ thông qua mạch kín biến thiên thì sinh dòng điện cảm ứng.', 'Sai — dòng cảm ứng không cần nguồn pin; nó sinh ra do từ thông biến thiên.', 'Sai — mạch phải kín mới có dòng cảm ứng chạy.', 'Sai — điện trở lớn không tạo ra dòng cảm ứng.']),
    Q('Khi đưa nam châm lại gần cuộn dây, dòng điện cảm ứng?', ['Chỉ khi cuộn dây quay', 'Chỉ khi nam châm dừng', 'Không, vì cuộn dây đứng yên', 'Có'], 3, 'Có chuyển động tương đối ⇒ từ thông biến thiên ⇒ sinh dòng cảm ứng.', [
      'Chỉ cần có <b>chuyển động tương đối</b> giữa nam châm và cuộn dây thì từ thông qua cuộn dây <i>thay đổi</i> ⇒ <b>xuất hiện dòng điện cảm ứng</b>.',
      'Vì vậy nam châm chuyển động trong khi cuộn dây đứng yên vẫn sinh dòng. Ngược lại, khi nam châm <i>đứng yên</i> thì từ thông không đổi ⇒ không có dòng.',
      'Đây chính là nguyên lý của máy phát điện và đàn ghi-ta điện.',
    ], ['Sai — chỉ cần chuyển động tương đối; nam châm chuyển động cũng đủ.', 'Sai — nam châm dừng thì từ thông không đổi ⇒ không sinh dòng.', 'Sai — nam châm chuyển động làm từ thông biến thiên dù cuộn dây đứng yên.', 'Đúng — có chuyển động tương đối ⇒ từ thông biến thiên ⇒ sinh dòng cảm ứng.']),
    Q('Máy phát điện hoạt động dựa trên?', ['Hiệu ứng quang điện', 'Định luật Jun', 'Hiện tượng cảm ứng điện từ', 'Định luật Ôm'], 2, 'Máy phát điện = chuyển cơ năng → điện năng dựa trên cảm ứng điện từ.', [
      '<b>Máy phát điện</b> hoạt động dựa trên <b>hiện tượng cảm ứng điện từ</b>: khi khung dây quay trong từ trường, từ thông biến thiên ⇒ sinh suất điện động và dòng điện.',
      'Về năng lượng, máy phát điện <i>biến cơ năng thành điện năng</i> (cơ năng từ tua-bin nước, gió, hơi nước…).',
      'Phân biệt: hiệu ứng quang điện dùng cho pin mặt trời; định luật Jun nói về toả nhiệt; định luật Ôm nói về quan hệ U–I–R.',
    ], ['Sai — hiệu ứng quang điện dùng cho pin mặt trời, không phải máy phát điện.', 'Sai — định luật Jun mô tả toả nhiệt, không phải nguyên lý máy phát.', 'Đúng — máy phát điện chuyển cơ năng thành điện năng dựa trên cảm ứng điện từ.', 'Sai — định luật Ôm mô tả quan hệ U-I-R, không phải nguyên lý máy phát.']),
    Q('Máy biến áp có tác dụng?', ['Đo điện', 'Tăng hoặc giảm hiệu điện thế xoay chiều', 'Tạo dòng điện', 'Đổi chiều dòng điện'], 1, 'Máy biến áp dùng cảm ứng điện từ để tăng/giảm U xoay chiều.', [
      '<b>Máy biến áp (biến thế)</b> dùng để <b>tăng hoặc giảm hiệu điện thế xoay chiều</b>, dựa trên hiện tượng cảm ứng điện từ.',
      'Cấu tạo gồm hai cuộn dây (sơ cấp, thứ cấp) quấn trên cùng một lõi sắt. Quan hệ: <code>U₂/U₁ = N₂/N₁</code>.',
      'Máy biến áp chỉ làm việc với dòng <i>xoay chiều</i> (vì cần từ thông biến thiên); nó <b>không</b> tạo ra dòng điện hay đổi chiều dòng.',
    ], ['Sai — đo điện là chức năng của ampe kế/vôn kế, không phải máy biến áp.', 'Đúng — máy biến áp tăng/giảm hiệu điện thế xoay chiều dựa trên cảm ứng điện từ.', 'Sai — máy biến áp không tạo dòng; máy phát mới tạo dòng.', 'Sai — đổi chiều dòng là chức năng của bộ chỉnh lưu/cổ góp, không phải máy biến áp.']),
    Q('Số vòng dây tăng thì hiệu điện thế thứ cấp?', ['Bằng 0', 'Không đổi', 'Tăng tỉ lệ với số vòng (U₂/U₁ = N₂/N₁)', 'Giảm tỉ lệ nghịch với số vòng'], 2, 'Công thức máy biến áp: U₂/U₁ = N₂/N₁.', [
      'Công thức máy biến áp: <code>U₂/U₁ = N₂/N₁</code>, trong đó N₁, N₂ là số vòng cuộn sơ cấp và thứ cấp.',
      'Vậy hiệu điện thế ở mỗi cuộn <b>tỉ lệ thuận với số vòng dây</b>. Tăng số vòng thứ cấp N₂ ⇒ U₂ tăng theo.',
      '<ul><li>N₂ &gt; N₁ ⇒ máy <b>tăng áp</b>.</li><li>N₂ &lt; N₁ ⇒ máy <b>hạ áp</b>.</li></ul>',
    ], ['Sai — U₂ không bằng 0 khi tăng số vòng thứ cấp.', 'Sai — U₂ thay đổi theo số vòng, không cố định.', 'Đúng — U₂/U₁ = N₂/N₁, tăng N₂ thì U₂ tăng tỉ lệ.', 'Sai — quan hệ là tỉ lệ thuận với số vòng, không phải nghịch.']),
  ]),

  M(15, 'Dòng điện xoay chiều', [
    Q('Dòng điện xoay chiều là?', ['Dòng điện không đổi', 'Dòng điện có chiều và cường độ thay đổi theo thời gian (thường hình sin)', 'Dòng điện một chiều', 'Dòng điện trong pin'], 1, 'AC = Alternating Current — đổi chiều liên tục.', [
      '<b>Dòng điện xoay chiều (AC – Alternating Current)</b> là dòng điện có <i>chiều và cường độ thay đổi tuần hoàn</i> theo thời gian, thường theo dạng hình sin.',
      'Nó được tạo ra trong máy phát điện khi khung dây quay đều trong từ trường ⇒ dòng đổi chiều liên tục.',
      'Khác với <b>dòng một chiều (DC)</b> từ pin/ắc-quy luôn giữ một chiều cố định.',
    ], ['Sai — dòng không đổi là dòng một chiều, không phải xoay chiều.', 'Đúng — dòng xoay chiều (AC) có chiều và cường độ thay đổi theo thời gian (thường hình sin).', 'Sai — dòng một chiều ngược với xoay chiều.', 'Sai — pin cho dòng một chiều, không phải xoay chiều.']),
    Q('Tần số dòng điện ở Việt Nam?', ['60 Hz', '220 Hz', '50 Hz', '100 Hz'], 2, 'Mạng điện Việt Nam: 220V – 50Hz (60Hz ở Mỹ, Nhật Bản).', [
      'Mạng điện sinh hoạt ở Việt Nam có thông số <code>220 V – 50 Hz</code>.',
      '<b>Tần số 50 Hz</b> nghĩa là dòng điện đổi chiều 50 chu kỳ trong mỗi giây.',
      'Một số nước (Mỹ, Nhật một phần) dùng 60 Hz; đừng nhầm 220 (đó là điện áp V) với tần số (Hz).',
    ], ['Sai — 60 Hz là tần số ở Mỹ, Nhật, không phải Việt Nam.', 'Sai — 220 là điện áp (V), nhầm với tần số.', 'Đúng — mạng điện Việt Nam là 220V – 50Hz.', 'Sai — 100 Hz không phải tần số lưới điện Việt Nam.']),
    Q('1 Hz nghĩa là?', ['1 chu kỳ/giây', '1 vòng/phút', '1 hiệu điện thế', '1 sóng/giờ'], 0, 'Hz = đơn vị tần số = số chu kỳ trong 1 giây.', [
      '<b>Héc (Hz)</b> là đơn vị của <i>tần số</i>. Định nghĩa: <code>1 Hz = 1 chu kỳ trong 1 giây</code>.',
      'Với lưới điện 50 Hz, dòng điện thực hiện 50 chu kỳ dao động mỗi giây.',
      'Chú ý đơn vị thời gian là <b>giây</b>, không phải phút hay giờ.',
    ], ['Đúng — 1 Hz = 1 chu kỳ trong 1 giây.', 'Sai — vòng/phút không phải định nghĩa của Hz.', 'Sai — Hz là tần số, không phải hiệu điện thế.', 'Sai — Hz tính theo giây, không phải giờ.']),
    Q('Tác dụng nhiệt của dòng điện xoay chiều?', ['Không có vì dòng đổi chiều liên tục', 'Tương tự dòng một chiều (làm nóng vật)', 'Yếu hơn', 'Mạnh hơn nhiều'], 1, 'Dòng AC vẫn làm nóng vật dẫn (nguyên lý bàn ủi, bếp điện).', [
      'Dù dòng xoay chiều đổi chiều liên tục, nó vẫn có <b>tác dụng nhiệt</b> giống dòng một chiều: làm nóng dây dẫn theo định luật Jun – Len-xơ (<code>Q = I²Rt</code>).',
      'Lý do: nhiệt phụ thuộc <i>I²</i>, mà bình phương luôn dương dù dòng đổi chiều.',
      'Nhờ tác dụng nhiệt này, bàn ủi, bếp điện, ấm siêu tốc dùng điện xoay chiều vẫn hoạt động bình thường.',
    ], ['Sai — đổi chiều không làm mất tác dụng nhiệt; AC vẫn làm nóng vật dẫn.', 'Đúng — AC vẫn có tác dụng nhiệt tương tự DC (bàn ủi, bếp điện hoạt động được).', 'Sai — tác dụng nhiệt không yếu hơn rõ rệt so với DC cùng giá trị hiệu dụng.', 'Sai — không mạnh hơn nhiều; tương đương DC có cùng giá trị hiệu dụng.']),
    Q('Tác dụng từ của dòng điện xoay chiều?', ['Cố định', 'Có và biến thiên (tạo từ trường biến thiên)', 'Không có vì dòng đổi chiều liên tục', 'Bằng 0'], 1, 'AC tạo từ trường biến thiên ⇒ ứng dụng trong máy biến áp, động cơ.', [
      'Dòng xoay chiều vẫn có <b>tác dụng từ</b>, nhưng vì dòng biến thiên nên <i>từ trường nó sinh ra cũng biến thiên</i> theo thời gian.',
      'Chính từ trường biến thiên này là cơ sở hoạt động của <b>máy biến áp</b> và <b>động cơ điện xoay chiều</b>.',
      'So với DC tạo từ trường không đổi, AC tạo từ trường liên tục thay đổi chiều và độ lớn.',
    ], ['Sai — từ trường của AC biến thiên theo thời gian, không cố định.', 'Đúng — AC tạo từ trường biến thiên, ứng dụng trong máy biến áp, động cơ.', 'Sai — AC vẫn có tác dụng từ; chính nhờ nó mà máy biến áp hoạt động.', 'Sai — tác dụng từ khác 0, biến thiên theo dòng.']),
    Q('Tác dụng nào CHỈ có ở dòng một chiều mà không có ở xoay chiều?', ['Tác dụng hoá học (điện phân)', 'Tác dụng từ', 'Tác dụng sinh lý', 'Tác dụng nhiệt'], 0, 'Điện phân cần dòng một chiều ổn định để chuyển ion về cực âm/dương.', [
      '<b>Tác dụng hoá học</b> (điện phân, mạ điện, nạp ắc-quy) chỉ thực hiện được với <b>dòng một chiều</b>.',
      'Lý do: điện phân cần các ion dương về cực âm, ion âm về cực dương <i>ổn định</i>. Nếu dùng AC, chiều dòng đổi liên tục nên ion không di chuyển có hướng được.',
      'Các tác dụng <b>nhiệt, từ, sinh lý</b> thì có ở cả dòng một chiều lẫn xoay chiều.',
    ], ['Đúng — tác dụng hoá học (điện phân, mạ điện) cần dòng một chiều ổn định.', 'Sai — tác dụng từ có ở cả DC và AC.', 'Sai — tác dụng sinh lý (gây giật) có ở cả DC và AC.', 'Sai — tác dụng nhiệt có ở cả DC và AC.']),
  ]),

  M(16, 'Thấu kính — Khái niệm và phân loại', [
    Q('Thấu kính là gì?', ['Gương phẳng', 'Vật chất bất kỳ', 'Khối gỗ', 'Khối chất trong suốt giới hạn bởi 2 mặt cong (hoặc 1 mặt phẳng + 1 mặt cong)'], 3, 'Thấu kính: chất trong suốt (thuỷ tinh/nhựa), giới hạn bởi mặt cầu/phẳng.', [
      '<b>Thấu kính</b> là một khối <i>chất trong suốt</i> (thuỷ tinh, nhựa) được giới hạn bởi hai mặt cong, hoặc một mặt phẳng và một mặt cong.',
      'Khi ánh sáng đi qua, thấu kính làm <b>khúc xạ</b> tia sáng, từ đó tạo ra ảnh của vật.',
      'Phân biệt với gương (phản xạ ánh sáng): thấu kính cho ánh sáng <i>truyền qua</i> và bị bẻ cong.',
    ], ['Sai — gương phẳng phản xạ ánh sáng, không phải thấu kính.', 'Sai — thấu kính phải trong suốt và có mặt cong, không phải vật bất kỳ.', 'Sai — gỗ không trong suốt nên không thể là thấu kính.', 'Đúng — thấu kính là khối chất trong suốt giới hạn bởi mặt cong (hoặc 1 mặt phẳng + 1 mặt cong).']),
    Q('2 loại thấu kính chính?', ['Thấu kính tròn và vuông', 'Thấu kính đỏ và xanh', 'Thấu kính lớn và nhỏ', 'Thấu kính hội tụ (lồi) và phân kì (lõm)'], 3, 'Hội tụ: dày ở giữa, mỏng ở mép; phân kì: ngược lại.', [
      'Dựa vào hình dạng và tác dụng với tia sáng, thấu kính chia thành <b>hai loại chính</b>:',
      '<ul><li><b>Thấu kính hội tụ (lồi)</b>: phần giữa dày hơn rìa, làm chùm tia song song <i>hội tụ</i> tại một điểm.</li><li><b>Thấu kính phân kì (lõm)</b>: phần rìa dày hơn giữa, làm chùm tia song song <i>loe ra</i> (phân kì).</li></ul>',
    ], ['Sai — phân loại theo hình dạng tròn/vuông không phải phân loại thấu kính.', 'Sai — màu sắc không dùng để phân loại thấu kính.', 'Sai — kích thước lớn/nhỏ không phải phân loại quang học.', 'Đúng — 2 loại chính: thấu kính hội tụ (lồi) và phân kì (lõm).']),
    Q('Thấu kính hội tụ có?', ['Đường rìa dày, giữa mỏng', 'Đều mỏng', 'Đều dày', 'Đường rìa mỏng, giữa dày'], 3, 'Thấu kính hội tụ (lồi) có mép mỏng, giữa dày.', [
      'Đặc điểm hình dạng giúp nhận diện nhanh: <b>thấu kính hội tụ (lồi)</b> có <i>phần rìa mỏng, phần giữa dày</i>.',
      'Ngược lại, thấu kính phân kì (lõm) có rìa dày, giữa mỏng.',
      'Thấu kính hội tụ làm chùm tia tới song song hội tụ tại tiêu điểm ⇒ là loại dùng làm kính lúp, kính hiển vi, máy ảnh.',
    ], ['Sai — đây là mô tả thấu kính phân kì (lõm), ngược với hội tụ.', 'Sai — thấu kính hội tụ không đều mỏng; nó dày ở giữa.', 'Sai — thấu kính hội tụ không đều dày; mép mỏng hơn.', 'Đúng — thấu kính hội tụ (lồi) có mép mỏng, giữa dày.']),
    Q('Tiêu cự f của thấu kính là?', ['Khoảng cách từ quang tâm đến tiêu điểm', 'Chiều cao kính', 'Độ dày kính', 'Bán kính mặt cong'], 0, 'f = khoảng cách từ O (quang tâm) đến F (tiêu điểm chính).', [
      '<b>Tiêu cự f</b> là khoảng cách từ <i>quang tâm O</i> (tâm thấu kính) đến <i>tiêu điểm chính F</i>.',
      'Tiêu cự đặc trưng cho khả năng hội tụ của thấu kính: f càng nhỏ thì thấu kính hội tụ càng mạnh.',
      'Quy ước dấu: <code>f &gt; 0</code> cho thấu kính hội tụ, <code>f &lt; 0</code> cho thấu kính phân kì.',
    ], ['Đúng — f là khoảng cách từ quang tâm O đến tiêu điểm chính F.', 'Sai — chiều cao kính không phải tiêu cự.', 'Sai — độ dày kính không phải tiêu cự.', 'Sai — bán kính mặt cong liên quan nhưng không bằng tiêu cự.']),
    Q('Tiêu điểm chính F là?', ['Điểm hội tụ của chùm tia tới song song trục chính (qua thấu kính hội tụ)', 'Điểm bất kỳ', 'Đỉnh kính', 'Tâm kính'], 0, 'Chùm song song qua thấu kính hội tụ ⇒ cắt nhau tại F.', [
      '<b>Tiêu điểm chính F</b> là điểm mà tại đó <i>chùm tia tới song song với trục chính</i> hội tụ lại sau khi qua thấu kính hội tụ.',
      'Mỗi thấu kính có hai tiêu điểm đối xứng qua quang tâm. Khoảng cách từ quang tâm tới tiêu điểm chính là tiêu cự f.',
      'Với thấu kính phân kì, chùm song song loe ra như xuất phát từ tiêu điểm ảo.',
    ], ['Đúng — F là điểm hội tụ của chùm tia tới song song trục chính (với thấu kính hội tụ).', 'Sai — tiêu điểm là điểm xác định, không phải điểm bất kỳ.', 'Sai — đỉnh kính không phải tiêu điểm.', 'Sai — tâm kính (quang tâm O) khác tiêu điểm F.']),
    Q('Đối với thấu kính phân kì, f mang dấu?', ['Bằng 0', 'Phụ thuộc', 'Dương (vì xét giá trị tuyệt đối)', 'Âm'], 3, 'Quy ước: f hội tụ > 0; f phân kì < 0.', [
      'Theo <b>quy ước dấu</b> trong quang hình học:',
      '<ul><li>Thấu kính <b>hội tụ</b>: <code>f &gt; 0</code> (dương).</li><li>Thấu kính <b>phân kì</b>: <code>f &lt; 0</code> (âm).</li></ul>',
      'Dấu của tiêu cự giúp phân biệt loại thấu kính khi tính toán bằng công thức <code>1/f = 1/d + 1/d′</code>.',
    ], ['Sai — f phân kì khác 0.', 'Sai — theo quy ước f phân kì luôn mang dấu âm, không phụ thuộc.', 'Sai — dương là quy ước cho thấu kính hội tụ.', 'Đúng — quy ước: f hội tụ > 0, f phân kì < 0 (mang dấu âm).']),
  ]),

  M(17, 'Ảnh tạo bởi thấu kính hội tụ', [
    Q('Vật đặt ngoài tiêu cự (d > f) qua thấu kính hội tụ tạo ảnh?', ['Ảo, cùng chiều', 'Thật, ngược chiều', 'Vô cực', 'Bằng vật'], 1, 'd > f ⇒ ảnh thật, ngược chiều, có thể hứng được trên màn.', [
      'Với thấu kính hội tụ, vị trí của vật so với tiêu điểm quyết định tính chất ảnh.',
      'Khi <b>vật đặt ngoài tiêu cự (d &gt; f)</b>: ảnh là <b>ảnh thật, ngược chiều</b> với vật và có thể <i>hứng được trên màn</i>.',
      'Đây là nguyên lý của máy ảnh, máy chiếu, mắt người (ảnh thật ngược chiều trên võng mạc).',
    ], ['Sai — ảnh ảo cùng chiều xảy ra khi d < f, không phải d > f.', 'Đúng — d > f ⇒ ảnh thật, ngược chiều, hứng được trên màn.', 'Sai — ảnh ở vô cực chỉ khi vật đặt đúng tại tiêu điểm.', 'Sai — kích thước ảnh thay đổi theo d, không nhất thiết bằng vật.']),
    Q('Vật đặt trong tiêu cự (d < f) qua thấu kính hội tụ tạo ảnh?', ['Ảo, ngược chiều', 'Bằng vật', 'Thật, lớn hơn', 'Ảo, cùng chiều, lớn hơn vật'], 3, 'd < f ⇒ ảnh ảo, cùng chiều, lớn hơn vật — nguyên lý kính lúp.', [
      'Khi <b>vật đặt trong tiêu cự (d &lt; f)</b> của thấu kính hội tụ: ảnh là <b>ảnh ảo, cùng chiều và lớn hơn vật</b>.',
      'Ảnh ảo không hứng được trên màn nhưng nhìn thấy qua thấu kính. Đây chính là <i>nguyên lý của kính lúp</i>.',
      'Ghi nhớ: qua thấu kính hội tụ, ảnh ảo luôn <b>cùng chiều</b> và <b>lớn hơn</b> vật.',
    ], ['Sai — ảnh ảo qua thấu kính hội tụ luôn cùng chiều, không ngược chiều.', 'Sai — ảnh lớn hơn vật, không bằng vật.', 'Sai — d < f cho ảnh ảo, không phải ảnh thật.', 'Đúng — d < f ⇒ ảnh ảo, cùng chiều, lớn hơn vật (nguyên lý kính lúp).']),
    Q('Vật ở vô cực (d = ∞) qua thấu kính hội tụ tạo ảnh?', ['Tại quang tâm O', 'Không có ảnh', 'Tại vô cực', 'Tại tiêu điểm F\''], 3, 'Chùm tia song song hội tụ tại tiêu điểm ảnh.', [
      'Khi vật ở <b>rất xa (d = ∞)</b>, các tia sáng từ vật tới thấu kính coi như <i>song song với trục chính</i>.',
      'Chùm tia song song qua thấu kính hội tụ sẽ hội tụ đúng tại <b>tiêu điểm ảnh F′</b>. Vậy ảnh là một điểm sáng tại tiêu điểm.',
      'Đây là cơ sở để dùng thấu kính hội tụ làm bộ thu ánh sáng mặt trời, kính thiên văn.',
    ], ['Sai — ảnh không nằm tại quang tâm O.', 'Sai — vẫn có ảnh (điểm) tại tiêu điểm.', 'Sai — chùm tia từ vô cực hội tụ lại, ảnh không ở vô cực.', 'Đúng — chùm tia song song từ vật ở vô cực hội tụ tại tiêu điểm ảnh F\'.']),
    Q('Kính lúp là?', ['Lăng kính', 'Gương cầu', 'Thấu kính hội tụ có tiêu cự ngắn, vật đặt trong tiêu cự', 'Thấu kính phân kì'], 2, 'Kính lúp: thấu kính hội tụ f ngắn, cho ảnh ảo lớn hơn vật.', [
      '<b>Kính lúp</b> thực chất là một <i>thấu kính hội tụ có tiêu cự ngắn</i>, dùng để quan sát các vật nhỏ.',
      'Khi đặt vật <b>trong tiêu cự (d &lt; f)</b>, kính lúp cho <b>ảnh ảo, cùng chiều, lớn hơn vật</b> nên ta nhìn rõ chi tiết nhỏ.',
      'Số bội giác của kính lúp càng lớn khi tiêu cự càng ngắn.',
    ], ['Sai — lăng kính dùng để tán sắc ánh sáng, không phải kính lúp.', 'Sai — gương cầu phản xạ; kính lúp là thấu kính khúc xạ.', 'Đúng — kính lúp là thấu kính hội tụ tiêu cự ngắn, vật đặt trong tiêu cự cho ảnh ảo lớn.', 'Sai — thấu kính phân kì cho ảnh ảo nhỏ hơn, không phóng to.']),
    Q('Công thức thấu kính (gần đúng)?', ['f = d + d\'', '1/d = 1/f + 1/d\'', '1/f = 1/d + 1/d\' (cho ảnh thật)', 'd = f·d\''], 2, 'Công thức 1/f = 1/d + 1/d\' (quy ước dấu cho từng trường hợp).', [
      'Công thức liên hệ giữa <b>tiêu cự (f)</b>, <b>khoảng cách vật (d)</b> và <b>khoảng cách ảnh (d′)</b>:',
      '<code>1/f = 1/d + 1/d′</code> (áp dụng quy ước dấu cho từng trường hợp ảnh thật/ảo).',
      'Từ công thức này, biết hai đại lượng có thể tính đại lượng còn lại; kết hợp với số phóng đại để giải bài toán thấu kính.',
    ], ['Sai — f không bằng tổng d + d\'.', 'Sai — sắp xếp sai vế; đúng là 1/f = 1/d + 1/d\'.', 'Đúng — 1/f = 1/d + 1/d\' (quy ước dấu cho từng trường hợp).', 'Sai — d không bằng tích f·d\'.']),
    Q('Số phóng đại k = ?', ['d·d\' (tích khoảng cách vật và ảnh)', 'd\'/d (hoặc h\'/h)', 'f/d (tỉ số tiêu cự trên khoảng vật)', 'd + d\''], 1, 'k = h\'/h = d\'/d (giá trị tuyệt đối).', [
      '<b>Số phóng đại (k)</b> cho biết ảnh lớn gấp mấy lần vật và cùng chiều hay ngược chiều.',
      'Công thức (xét độ lớn): <code>k = h′/h = d′/d</code>, trong đó h, h′ là chiều cao vật và ảnh.',
      '<ul><li>k &gt; 1: ảnh lớn hơn vật; k &lt; 1: ảnh nhỏ hơn.</li><li>Ảnh thật ngược chiều, ảnh ảo cùng chiều với vật.</li></ul>',
    ], ['Sai — số phóng đại là tỉ số, không phải tích d·d\'.', 'Đúng — k = h\'/h = d\'/d (xét giá trị tuyệt đối).', 'Sai — f/d không phải công thức số phóng đại.', 'Sai — số phóng đại là tỉ số d\'/d, không phải tổng.']),
  ]),

  M(18, 'Ôn tập học kỳ I', [
    Q('Phương trình Fe + CuSO₄?', ['FeS + CuO', 'Fe(OH)₂ + Cu', 'Cu + FeSO₄', 'Không phản ứng'], 2, 'Fe đẩy Cu (đứng trước Cu): Fe + CuSO₄ → FeSO₄ + Cu↓.', [
      'Ôn lại <b>phản ứng đẩy kim loại</b>: kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi dung dịch muối.',
      'Fe đứng <i>trước</i> Cu nên: <code>Fe + CuSO₄ → FeSO₄ + Cu↓</code>. Hiện tượng: đinh sắt phủ đồng đỏ, dung dịch xanh nhạt dần.',
      'Lưu ý Fe chỉ lên +2 trong phản ứng với muối (tạo FeSO₄).',
    ], ['Sai — không có sự phân hủy thành FeS và CuO; đây là phản ứng đẩy kim loại.', 'Sai — không tạo Fe(OH)₂; sản phẩm là muối FeSO₄ và Cu.', 'Đúng — Fe đẩy Cu khỏi muối: Fe + CuSO₄ → FeSO₄ + Cu↓.', 'Sai — Fe đứng trước Cu nên phản ứng xảy ra.']),
    Q('Al phản ứng với dung dịch NaOH vì?', ['Al rất hoạt động', 'Al là kim loại lưỡng tính', 'Al không lưỡng tính', 'NaOH là axit'], 1, 'Al phản ứng được cả axit và bazơ ⇒ kim loại lưỡng tính.', [
      'Nhôm là <b>kim loại lưỡng tính</b>: tan được trong cả axit lẫn dung dịch bazơ mạnh.',
      'Phản ứng với kiềm: <code>2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑</code>.',
      'Đây là tính chất riêng nổi bật của Al (và Zn), giải thích vì sao không nên đựng đồ kiềm trong nồi nhôm.',
    ], ['Sai — độ hoạt động không giải thích việc Al tan trong kiềm; lý do là tính lưỡng tính.', 'Đúng — Al lưỡng tính nên phản ứng được cả axit và bazơ (NaOH).', 'Sai — Al chính là kim loại lưỡng tính nên mới tan trong NaOH.', 'Sai — NaOH là bazơ, không phải axit.']),
    Q('Định luật Ôm: I = ?', ['R/U (đảo tử số và mẫu số)', 'U + R (cộng thay vì chia)', 'U/R', 'U·R (nhân thay vì chia)'], 2, 'I = U/R.', [
      'Ôn lại <b>định luật Ôm</b>: cường độ dòng điện tỉ lệ thuận với hiệu điện thế, tỉ lệ nghịch với điện trở.',
      'Công thức: <code>I = U / R</code>; suy ra <code>U = I·R</code> và <code>R = U / I</code>.',
      'Lỗi hay gặp: đảo tử mẫu (R/U) hoặc nhân thay vì chia (U·R).',
    ], ['Sai — đảo tử mẫu; đúng là U/R chứ không phải R/U.', 'Sai — phép cộng sai; định luật Ôm là phép chia U/R.', 'Đúng — I = U/R (định luật Ôm).', 'Sai — phép nhân sai; I tỉ lệ nghịch với R nên là U/R.']),
    Q('Mắc 2 điện trở 6Ω song song, R_tđ = ?', ['6Ω', '3Ω', '0Ω', '12Ω'], 1, 'Mạch song song 2 R giống nhau: R_tđ = R/2 = 3 Ω.', [
      'Với <b>hai điện trở bằng nhau mắc song song</b>, điện trở tương đương bằng một nửa: <code>R_tđ = R/2</code>.',
      'Thay số: <code>R_tđ = 6/2 = 3 Ω</code>. (Kiểm tra: 1/R = 1/6 + 1/6 = 2/6 = 1/3 ⇒ R = 3 Ω.)',
      'Điện trở tương đương luôn nhỏ hơn mỗi điện trở thành phần khi mắc song song.',
    ], ['Sai — 6 là giá trị 1 điện trở, song song phải giảm.', 'Đúng — 2 điện trở bằng nhau song song: R_tđ = R/2 = 3 Ω.', 'Sai — R_tđ giảm nhưng không về 0.', 'Sai — 12 là tổng (nhầm công thức nối tiếp).']),
    Q('Khí Cl₂ có màu?', ['Nâu đỏ (giống khí NO₂)', 'Xanh dương (giống dung dịch CuSO₄)', 'Vàng lục', 'Không màu'], 2, 'Cl₂: khí vàng lục, mùi xốc, độc.', [
      'Ôn lại tính chất vật lý của clo: <b>Cl₂ là khí màu vàng lục</b>, mùi xốc, độc, nặng hơn không khí.',
      'Đây là phi kim hoạt động mạnh, có tính oxi hoá mạnh, dùng khử trùng nước và sản xuất PVC.',
      'So sánh màu khí: <i>Cl₂ vàng lục, NO₂ nâu đỏ, O₂/H₂/N₂ không màu</i>.',
    ], ['Sai — nâu đỏ là màu khí NO₂, không phải Cl₂.', 'Sai — xanh dương là màu dung dịch CuSO₄, không phải Cl₂.', 'Đúng — Cl₂ là khí màu vàng lục, mùi xốc, độc.', 'Sai — Cl₂ có màu vàng lục, không phải không màu.']),
    Q('Công suất P = U·I = ? khi U = 220V, I = 2A?', ['218W', '222W', '440W', '110W'], 2, 'P = 220·2 = 440 W.', [
      'Áp dụng công thức công suất điện: <code>P = U·I</code>.',
      'Thay số: <code>P = 220 × 2 = 440 W</code>.',
      'Cảnh giác các lỗi: cộng (220+2=222), trừ (220−2=218) hay chia (220/2=110) đều sai — phải <b>nhân</b>.',
    ], ['Sai — 218 là 220-2 (nhầm phép trừ).', 'Sai — 222 là 220+2 (nhầm phép cộng).', 'Đúng — P = U·I = 220·2 = 440 W.', 'Sai — 110 là 220/2 (nhầm phép chia).']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Mở đầu hoá hữu cơ — Khái niệm hợp chất hữu cơ', [
    Q('Hợp chất hữu cơ là?', ['Hợp chất của cacbon (trừ CO, CO₂, muối cacbonat…)', 'Hợp chất khoáng', 'Hợp chất kim loại', 'Hợp chất chứa oxi'], 0, 'Hợp chất hữu cơ luôn chứa C (trừ vài hợp chất vô cơ chứa C như CO₂, CaCO₃).', [
      '<b>Hợp chất hữu cơ</b> là hợp chất của <i>cacbon</i> (thường có cả H, đôi khi O, N, X…).',
      'Một số hợp chất chứa C nhưng được xếp vào <b>vô cơ</b> vì tính chất giống chất vô cơ: <code>CO, CO₂, H₂CO₃, muối cacbonat (CaCO₃, NaHCO₃)</code>.',
      'Ví dụ hữu cơ: CH₄ (metan), C₂H₅OH (rượu etylic), CH₃COOH (axit axetic), glucozơ.',
    ], ['Đúng — hợp chất hữu cơ là hợp chất của cacbon (trừ CO, CO₂, muối cacbonat…).', 'Sai — hợp chất khoáng thuộc vô cơ.', 'Sai — hợp chất kim loại thuộc vô cơ.', 'Sai — chứa oxi không phải dấu hiệu của hữu cơ; dấu hiệu là chứa cacbon.']),
    Q('Đặc điểm chung của hợp chất hữu cơ?', ['Kém bền nhiệt, đa số tan trong dung môi hữu cơ, dễ cháy', 'Khó cháy', 'Bền nhiệt cao', 'Dễ tan trong nước'], 0, 'Hữu cơ thường kém bền, dễ cháy, ít tan trong nước, tan tốt trong dung môi hữu cơ.', [
      'Các hợp chất hữu cơ có một số <b>đặc điểm chung</b> giúp phân biệt với chất vô cơ:',
      '<ul><li>Đa số <b>kém bền nhiệt</b>, dễ bị phân huỷ, dễ <b>cháy</b>.</li><li>Phần lớn <i>ít tan trong nước</i>, nhưng <b>tan tốt trong dung môi hữu cơ</b> (xăng, ете, cồn).</li><li>Phản ứng thường <i>chậm</i>, theo nhiều hướng, cần xúc tác hoặc nhiệt độ.</li></ul>',
    ], ['Đúng — hữu cơ kém bền nhiệt, dễ cháy, tan tốt trong dung môi hữu cơ.', 'Sai — đa số hợp chất hữu cơ dễ cháy, không khó cháy.', 'Sai — hữu cơ thường kém bền nhiệt, dễ bị phân hủy.', 'Sai — phần lớn hữu cơ ít tan trong nước.']),
    Q('Hoá học hữu cơ là ngành nghiên cứu?', ['Các hợp chất hữu cơ và phản ứng của chúng', 'Các bazơ và muối của chúng', 'Các chất khí trong khí quyển', 'Kim loại'], 0, 'Hoá hữu cơ tập trung vào hợp chất C-H, C-O, C-N…', [
      '<b>Hoá học hữu cơ</b> là ngành hoá học chuyên nghiên cứu các <i>hợp chất hữu cơ</i> (hợp chất của cacbon) và phản ứng của chúng.',
      'Đối tượng gồm hidrocacbon (C, H) và dẫn xuất (chứa thêm O, N, halogen…): rượu, axit, este, gluxit, protein, polime…',
      'Đây là ngành rất rộng, gắn liền với hoá dầu, dược phẩm, polime, thực phẩm, sự sống.',
    ], ['Đúng — hoá hữu cơ nghiên cứu các hợp chất hữu cơ và phản ứng của chúng.', 'Sai — bazơ và muối là đối tượng của hoá vô cơ.', 'Sai — chất khí khí quyển là hoá vô cơ/môi trường.', 'Sai — kim loại là đối tượng của hoá vô cơ.']),
    Q('Liên kết phổ biến trong hợp chất hữu cơ?', ['Liên kết hidro', 'Liên kết cộng hoá trị', 'Liên kết ion', 'Liên kết kim loại'], 1, 'Hữu cơ chủ yếu liên kết cộng hoá trị (C-H, C-C, C-O…).', [
      'Trong hợp chất hữu cơ, các nguyên tử liên kết với nhau chủ yếu bằng <b>liên kết cộng hoá trị</b> (dùng chung electron): C–H, C–C, C–O…',
      'Nguyên tử cacbon luôn có hoá trị <b>IV</b>, có thể tạo mạch thẳng, nhánh hoặc vòng ⇒ tạo vô số hợp chất khác nhau.',
      'Liên kết ion đặc trưng cho hợp chất vô cơ (muối); liên kết hidro chỉ là liên kết phụ giữa các phân tử.',
    ], ['Sai — liên kết hidro chỉ là liên kết phụ giữa phân tử, không phải liên kết chính.', 'Đúng — hữu cơ chủ yếu là liên kết cộng hoá trị (C-H, C-C, C-O…).', 'Sai — liên kết ion đặc trưng cho hợp chất vô cơ (muối).', 'Sai — liên kết kim loại có ở kim loại, không phải hợp chất hữu cơ.']),
    Q('Phân loại hợp chất hữu cơ theo thành phần?', ['Phân theo màu', 'Chỉ có hidrocacbon', 'Hidrocacbon (chỉ C, H) và dẫn xuất hidrocacbon', 'Có 5 loại'], 2, '2 nhóm chính: hidrocacbon (CₓHᵧ) và dẫn xuất (chứa thêm O, N, X…).', [
      'Dựa vào thành phần nguyên tố, hợp chất hữu cơ chia thành <b>hai nhóm chính</b>:',
      '<ul><li><b>Hidrocacbon</b>: phân tử chỉ gồm <i>C và H</i> (metan, etilen, benzen…).</li><li><b>Dẫn xuất của hidrocacbon</b>: ngoài C, H còn có thêm O, N, halogen… (rượu, axit, este, amin…).</li></ul>',
    ], ['Sai — màu không phải tiêu chí phân loại theo thành phần.', 'Sai — ngoài hidrocacbon còn dẫn xuất hidrocacbon.', 'Đúng — 2 nhóm: hidrocacbon (chỉ C, H) và dẫn xuất hidrocacbon (thêm O, N, X…).', 'Sai — chỉ có 2 nhóm chính, không phải 5 loại.']),
    Q('Ví dụ hợp chất hữu cơ là?', ['CH₄, C₂H₅OH, CH₃COOH, glucozơ', 'KOH, CaO', 'Fe, Cu', 'NaCl, H₂O, CO₂'], 0, 'CH₄ (metan), C₂H₅OH (rượu etylic), CH₃COOH (axit axetic), glucozơ — đều hữu cơ.', [
      'Để nhận biết hợp chất hữu cơ, hãy tìm <b>nguyên tố cacbon</b> trong phân tử (và thường có H).',
      'Ví dụ hữu cơ: <code>CH₄, C₂H₅OH, CH₃COOH, glucozơ (C₆H₁₂O₆)</code>.',
      'Các chất KOH, CaO, Fe, Cu, NaCl, H₂O là vô cơ; riêng CO₂ chứa C nhưng vẫn xếp vào <i>vô cơ</i> (ngoại lệ).',
    ], ['Đúng — CH₄, C₂H₅OH, CH₃COOH, glucozơ đều là hợp chất hữu cơ chứa cacbon.', 'Sai — KOH, CaO là hợp chất vô cơ.', 'Sai — Fe, Cu là đơn chất kim loại.', 'Sai — NaCl, H₂O, CO₂ là hợp chất vô cơ (CO₂ là ngoại lệ chứa C).']),
  ]),

  M(20, 'Metan (CH₄)', [
    Q('Công thức phân tử của metan?', ['C₂H₄ (etilen)', 'CH₂ (gốc metylen không bền)', 'C₂H₆ (etan)', 'CH₄'], 3, 'Metan = CH₄ — hidrocacbon đơn giản nhất.', [
      '<b>Metan</b> có công thức phân tử <code>CH₄</code> — là <i>hidrocacbon đơn giản nhất</i> với một nguyên tử C và bốn nguyên tử H.',
      'Phân biệt với các hidrocacbon khác: <code>C₂H₆ (etan), C₂H₄ (etilen), C₂H₂ (axetilen)</code>.',
      'Metan thuộc dãy ankan (hidrocacbon no), chỉ có liên kết đơn C–H.',
    ], ['Sai — C₂H₄ là etilen, có liên kết đôi.', 'Sai — CH₂ là gốc không bền, không phải phân tử metan.', 'Sai — C₂H₆ là etan, 2 nguyên tử C.', 'Đúng — metan là CH₄, hidrocacbon đơn giản nhất.']),
    Q('Cấu tạo phân tử metan?', ['Mặt phẳng', 'Đường thẳng', 'Cấu trúc vòng 4 nguyên tử C', 'Tứ diện đều, 4 liên kết C-H'], 3, 'C ở giữa, 4 H tại 4 đỉnh tứ diện đều, góc liên kết ~109,5°.', [
      'Trong phân tử metan, nguyên tử <b>C ở tâm</b>, bốn nguyên tử <b>H ở bốn đỉnh của hình tứ diện đều</b>.',
      'Bốn liên kết C–H giống hệt nhau, góc liên kết khoảng <code>109,5°</code> ⇒ phân tử có dạng <i>không gian</i>, không phẳng cũng không thẳng.',
      'Cacbon trong metan có hoá trị IV, tạo 4 liên kết đơn bền.',
    ], ['Sai — metan không phẳng mà có dạng không gian tứ diện.', 'Sai — metan không thẳng; 4 liên kết C-H hướng về 4 đỉnh tứ diện.', 'Sai — metan chỉ có 1 nguyên tử C, không có vòng.', 'Đúng — C ở giữa, 4 H ở 4 đỉnh tứ diện đều (góc ~109,5°).']),
    Q('Tính chất vật lý của metan?', ['Khí có màu vàng', 'Khí không màu, không mùi, nhẹ hơn không khí, ít tan trong nước', 'Chất lỏng dễ bay hơi giống xăng', 'Chất rắn không màu giống parafin'], 1, 'CH₄ là khí, M = 16 < 29 (KK), ít tan trong H₂O.', [
      'Metan là chất <b>khí, không màu, không mùi</b> ở điều kiện thường.',
      'Khối lượng mol <code>M = 16</code> nhỏ hơn không khí (≈29) nên metan <i>nhẹ hơn không khí</i>; nó cũng <b>ít tan trong nước</b>.',
      'Đây là khí dễ cháy, là thành phần chính của khí thiên nhiên và biogas.',
    ], ['Sai — metan không màu, không phải khí màu vàng.', 'Đúng — CH₄ là khí không màu, không mùi, M=16 nhẹ hơn không khí, ít tan trong nước.', 'Sai — metan là khí, không phải chất lỏng.', 'Sai — metan là khí, không phải chất rắn.']),
    Q('CH₄ + Cl₂ →? (có ánh sáng)', ['CH₃Cl + HCl', 'CCl₄ (chỉ tạo khi Cl₂ rất dư)', 'CH₄Cl (công thức sai cấu tạo)', 'CO₂ (sản phẩm của phản ứng cháy)'], 0, 'Phản ứng thế: CH₄ + Cl₂ → CH₃Cl + HCl (askt).', [
      'Metan là hidrocacbon <b>no</b> (chỉ có liên kết đơn) nên đặc trưng bởi <b>phản ứng thế</b> với clo khi có ánh sáng.',
      'Phương trình: <code>CH₄ + Cl₂ →(askt) CH₃Cl + HCl</code> — một nguyên tử H bị thay thế bởi một nguyên tử Cl.',
      'Nếu Cl₂ dư có thể thế tiếp tạo CH₂Cl₂, CHCl₃, CCl₄; nhưng sản phẩm thế đầu tiên là CH₃Cl.',
    ], ['Đúng — phản ứng thế: CH₄ + Cl₂ → CH₃Cl + HCl (askt).', 'Sai — CCl₄ chỉ tạo khi thế hết 4 H với Cl₂ rất dư, không phải sản phẩm chính.', 'Sai — CH₄Cl sai công thức; metan no nên xảy ra phản ứng thế tạo CH₃Cl.', 'Sai — CO₂ là sản phẩm cháy với O₂, không phải phản ứng với Cl₂.']),
    Q('CH₄ cháy trong O₂ tạo?', ['CO₂ + H₂O', 'Không cháy', 'CO + H₂', 'C + H₂'], 0, 'CH₄ + 2O₂ → CO₂ + 2H₂O (phản ứng tỏa nhiều nhiệt).', [
      'Metan là <b>nhiên liệu</b>, cháy hoàn toàn trong oxi tạo khí cacbonic và hơi nước, đồng thời <i>toả nhiều nhiệt</i>.',
      'Phương trình: <code>CH₄ + 2O₂ →(t°) CO₂ + 2H₂O</code>.',
      'Khi cháy thiếu oxi mới tạo CO (độc) hoặc muội than; cháy đủ oxi cho CO₂ và H₂O. Hỗn hợp metan – không khí có thể gây nổ.',
    ], ['Đúng — CH₄ + 2O₂ → CO₂ + 2H₂O, toả nhiều nhiệt.', 'Sai — metan là nhiên liệu, cháy tốt trong O₂.', 'Sai — CO + H₂ chỉ tạo khi cháy thiếu oxi không hoàn toàn.', 'Sai — không tạo muội C và H₂ khi cháy đủ oxi.']),
    Q('Metan có ở đâu?', ['Trong nước biển', 'Trong cát', 'Trong kim loại', 'Khí thiên nhiên, khí biogas, ruột động vật, đầm lầy'], 3, 'CH₄ là thành phần chính của khí thiên nhiên (~95%), biogas.', [
      'Metan là khí phổ biến trong tự nhiên, sinh ra từ sự <i>phân huỷ chất hữu cơ trong điều kiện thiếu không khí</i>.',
      '<ul><li>Thành phần chính (~95%) của <b>khí thiên nhiên</b> và <b>khí mỏ dầu</b>.</li><li>Có trong <b>khí biogas</b> (ủ phân, rác), khí ở <b>đầm lầy</b>, ruột động vật.</li></ul>',
      'Metan là nhiên liệu sạch nhưng cũng là khí gây hiệu ứng nhà kính mạnh.',
    ], ['Sai — nước biển chủ yếu chứa muối, không phải nguồn metan.', 'Sai — cát (SiO₂) không chứa metan.', 'Sai — kim loại không chứa metan.', 'Đúng — CH₄ có trong khí thiên nhiên (~95%), biogas, ruột động vật, đầm lầy.']),
  ]),

  M(21, 'Etilen (C₂H₄)', [
    Q('Công thức của etilen?', ['C₂H₆ (etan, không có liên kết đôi)', 'CH₄ (metan, hidrocacbon no)', 'C₂H₂ (axetilen, có liên kết ba)', 'C₂H₄'], 3, 'Etilen = C₂H₄ (eten).', [
      '<b>Etilen (eten)</b> có công thức phân tử <code>C₂H₄</code>, công thức cấu tạo <code>CH₂=CH₂</code>.',
      'Đặc trưng là có <b>một liên kết đôi C=C</b> ⇒ thuộc dãy anken (hidrocacbon không no).',
      'Phân biệt: C₂H₆ (etan, no), C₂H₂ (axetilen, liên kết ba), CH₄ (metan).',
    ], ['Sai — C₂H₆ là etan, hidrocacbon no không có liên kết đôi.', 'Sai — CH₄ là metan, không phải etilen.', 'Sai — C₂H₂ là axetilen, có liên kết ba.', 'Đúng — etilen = C₂H₄ (eten), có 1 liên kết đôi.']),
    Q('Đặc điểm cấu tạo etilen?', ['Có 1 liên kết ba C≡C', 'Liên kết kim loại', 'Chỉ liên kết đơn', 'Có 1 liên kết đôi C=C'], 3, 'C₂H₄: H₂C=CH₂ — có 1 liên kết đôi giữa 2 nguyên tử C.', [
      'Trong phân tử etilen, hai nguyên tử C liên kết với nhau bằng <b>một liên kết đôi C=C</b>: <code>H₂C=CH₂</code>.',
      'Liên kết đôi gồm một liên kết bền (σ) và một liên kết kém bền (π). Liên kết π <i>dễ bị phá vỡ</i> nên etilen dễ tham gia <b>phản ứng cộng</b>.',
      'Đây là điểm khác biệt cơ bản giữa hidrocacbon không no (etilen) và hidrocacbon no (metan, etan).',
    ], ['Sai — liên kết ba C≡C là đặc điểm của axetilen, không phải etilen.', 'Sai — liên kết kim loại có ở kim loại, không phải hợp chất hữu cơ.', 'Sai — etilen có liên kết đôi, không phải chỉ liên kết đơn (đó là etan).', 'Đúng — etilen có 1 liên kết đôi C=C: H₂C=CH₂.']),
    Q('Etilen tham gia phản ứng đặc trưng?', ['Chỉ trao đổi', 'Phản ứng cộng (với H₂, Br₂, H₂O…)', 'Không phản ứng', 'Chỉ phản ứng thế'], 1, 'Liên kết π yếu ⇒ dễ bị phá vỡ ⇒ cộng các phân tử khác.', [
      'Nhờ có <b>liên kết đôi C=C</b> với liên kết π kém bền, etilen đặc trưng bởi <b>phản ứng cộng</b>.',
      '<ul><li>Cộng H₂: <code>C₂H₄ + H₂ → C₂H₆</code> (xúc tác Ni).</li><li>Cộng Br₂: <code>C₂H₄ + Br₂ → C₂H₄Br₂</code> (làm mất màu nước brom).</li><li>Cộng H₂O: <code>C₂H₄ + H₂O → C₂H₅OH</code> (xúc tác axit).</li></ul>',
      'Etilen còn tham gia phản ứng <i>trùng hợp</i> tạo PE.',
    ], ['Sai — phản ứng trao đổi không phải đặc trưng của etilen.', 'Đúng — etilen đặc trưng bởi phản ứng cộng (H₂, Br₂, H₂O…) do liên kết đôi.', 'Sai — etilen rất hoạt động nhờ liên kết đôi.', 'Sai — phản ứng thế đặc trưng cho hidrocacbon no (metan), không phải etilen.']),
    Q('C₂H₄ + Br₂ → ?', ['Không phản ứng', 'C₂H₄Br₂ (làm mất màu nước Brom)', 'C₂HBr₃', 'CBr₄ (sản phẩm thế hoàn toàn metan)'], 1, 'Phản ứng đặc trưng để nhận biết liên kết đôi: nC₂H₄ + Br₂ → mất màu vàng nâu.', [
      'Etilen <b>cộng</b> brom: <code>C₂H₄ + Br₂ → C₂H₄Br₂ (đibrometan)</code>.',
      'Hiện tượng quan trọng: nước brom (màu vàng nâu) <b>bị mất màu</b>. Đây là <i>phản ứng nhận biết liên kết đôi</i> (phân biệt etilen với metan).',
      'Phản ứng cộng làm liên kết π bị phá vỡ, mỗi C nhận thêm một nguyên tử Br.',
    ], ['Sai — etilen phản ứng cộng với Br₂, làm mất màu nước brom.', 'Đúng — C₂H₄ + Br₂ → C₂H₄Br₂, làm mất màu nước brom (nhận biết liên kết đôi).', 'Sai — công thức C₂HBr₃ sai; sản phẩm cộng là C₂H₄Br₂.', 'Sai — CBr₄ liên quan đến thế metan, không phải cộng etilen.']),
    Q('Etilen có ứng dụng quan trọng?', ['Làm xăng', 'Làm thuốc nổ', 'Làm phân bón', 'Sản xuất nhựa PE, kích thích trái cây chín, sản xuất rượu etylic'], 3, 'C₂H₄ là monome của PE; cũng dùng làm chín hoa quả; nguyên liệu hoá dầu.', [
      'Etilen là nguyên liệu quan trọng bậc nhất của ngành hoá dầu, có nhiều ứng dụng:',
      '<ul><li>Trùng hợp tạo nhựa <b>polietilen (PE)</b> — bao bì, túi nilon.</li><li><b>Kích thích trái cây mau chín</b> (chuối, cà chua).</li><li>Sản xuất <b>rượu etylic</b>, axit axetic, nhiều hoá chất khác.</li></ul>',
    ], ['Sai — etilen không dùng làm xăng.', 'Sai — etilen không dùng làm thuốc nổ.', 'Sai — phân bón chủ yếu từ N, P, K, không phải etilen.', 'Đúng — etilen làm monome PE, kích thích trái cây chín, sản xuất rượu etylic.']),
    Q('Phản ứng trùng hợp etilen tạo?', ['Cao su', 'PVC (trùng hợp từ vinyl clorua)', 'Polipropilen', 'Polietilen (PE)'], 3, 'n·CH₂=CH₂ → (-CH₂-CH₂-)ₙ = PE.', [
      '<b>Phản ứng trùng hợp</b> là quá trình nhiều phân tử nhỏ (monome) kết hợp tạo phân tử rất lớn (polime).',
      'Etilen trùng hợp tạo <b>polietilen (PE)</b>: <code>n CH₂=CH₂ → (–CH₂–CH₂–)ₙ</code>.',
      'PE là nhựa dẻo, bền, dùng làm túi, màng bọc, chai lọ. (PVC từ vinyl clorua, cao su từ isopren — không phải từ etilen.)',
    ], ['Sai — cao su trùng hợp từ isopren/butadien, không phải etilen.', 'Sai — PVC trùng hợp từ vinyl clorua CH₂=CHCl, không phải etilen.', 'Sai — polipropilen trùng hợp từ propilen, không phải etilen.', 'Đúng — n CH₂=CH₂ → (-CH₂-CH₂-)ₙ = polietilen (PE).']),
  ]),

  M(22, 'Axetilen (C₂H₂) — Benzen (C₆H₆)', [
    Q('Công thức của axetilen?', ['C₂H₆ (etan, hidrocacbon no)', 'C₂H₂', 'CH₄ (metan, một nguyên tử C)', 'C₂H₄ (etilen, có liên kết đôi)'], 1, 'Axetilen (etin) = C₂H₂ — có 1 liên kết ba C≡C.', [
      '<b>Axetilen (etin)</b> có công thức phân tử <code>C₂H₂</code>, công thức cấu tạo <code>CH≡CH</code>.',
      'Đặc trưng là có <b>một liên kết ba C≡C</b> (gồm 1 σ và 2 π) ⇒ thuộc dãy ankin, rất hoạt động.',
      'Phân biệt theo số liên kết: <i>etan C₂H₆ (đơn), etilen C₂H₄ (đôi), axetilen C₂H₂ (ba)</i>.',
    ], ['Sai — C₂H₆ là etan, no, không có liên kết ba.', 'Đúng — axetilen (etin) = C₂H₂, có 1 liên kết ba C≡C.', 'Sai — CH₄ là metan, chỉ 1 nguyên tử C.', 'Sai — C₂H₄ là etilen, có liên kết đôi.']),
    Q('Axetilen được điều chế từ?', ['Khí than', 'Đá vôi', 'Mỡ động vật', 'CaC₂ + H₂O → C₂H₂ + Ca(OH)₂'], 3, 'Phương pháp công nghiệp: thủy phân canxi cacbua (đất đèn).', [
      'Trong phòng thí nghiệm và công nghiệp, axetilen được điều chế bằng cách cho <b>đất đèn (canxi cacbua CaC₂)</b> tác dụng với nước.',
      'Phương trình: <code>CaC₂ + 2H₂O → C₂H₂↑ + Ca(OH)₂</code>.',
      'Đây là phản ứng quen thuộc, dùng tạo khí axetilen cho đèn xì hàn cắt kim loại.',
    ], ['Sai — khí than không trực tiếp tạo axetilen theo cách phổ biến này.', 'Sai — đá vôi (CaCO₃) là nguyên liệu tạo CaC₂, không trực tiếp tạo C₂H₂.', 'Sai — mỡ động vật là chất béo, không tạo axetilen.', 'Đúng — CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ (thuỷ phân đất đèn).']),
    Q('Axetilen dùng làm gì?', ['Làm thực phẩm', 'Làm thuốc', 'Đèn xì hàn cắt kim loại, sản xuất nhựa, dung môi', 'Làm phân bón'], 2, 'C₂H₂ cháy với O₂ tạo ngọn lửa nóng ~3000°C ⇒ hàn cắt kim loại.', [
      'Axetilen cháy trong oxi cho ngọn lửa <b>rất nóng (~3000°C)</b> nên ứng dụng nổi bật là <b>đèn xì hàn, cắt kim loại</b>.',
      'Ngoài ra C₂H₂ còn là nguyên liệu để sản xuất <i>nhựa PVC, cao su tổng hợp, axit axetic</i> và nhiều hoá chất.',
      'Vì rất dễ cháy nổ, axetilen phải được bảo quản và sử dụng cẩn thận.',
    ], ['Sai — axetilen không dùng làm thực phẩm.', 'Sai — axetilen không dùng làm thuốc.', 'Đúng — C₂H₂ cháy với O₂ tạo ngọn lửa ~3000°C để hàn cắt kim loại; còn làm nhựa, dung môi.', 'Sai — phân bón từ N, P, K, không phải axetilen.']),
    Q('Benzen có công thức?', ['C₅H₅ (vòng 5 cạnh, không phải benzen)', 'C₇H₈ (toluen, đồng đẳng của benzen)', 'C₆H₁₂ (xiclohexan, vòng no)', 'C₆H₆'], 3, 'Benzen = C₆H₆ — vòng 6 cạnh đặc trưng.', [
      '<b>Benzen</b> có công thức phân tử <code>C₆H₆</code> — chất lỏng không màu, mùi đặc trưng, là hidrocacbon thơm điển hình.',
      'Cấu tạo gồm <i>vòng 6 cạnh đều</i> với ba liên kết đôi xen kẽ (hệ liên hợp thơm rất bền).',
      'Phân biệt: C₇H₈ là toluen (đồng đẳng), C₆H₁₂ là xiclohexan (vòng no).',
    ], ['Sai — C₅H₅ vòng 5 cạnh không phải benzen.', 'Sai — C₇H₈ là toluen, đồng đẳng của benzen.', 'Sai — C₆H₁₂ là xiclohexan (vòng no), không phải benzen.', 'Đúng — benzen = C₆H₆, vòng 6 cạnh thơm đặc trưng.']),
    Q('Cấu trúc benzen?', ['Hình cầu', 'Tứ diện', 'Mạch thẳng', 'Vòng 6 cạnh đều, có 3 liên kết đôi xen kẽ (vòng thơm)'], 3, 'Vòng benzen với hệ liên kết π liên hợp (thơm) — rất bền.', [
      'Phân tử benzen có cấu trúc <b>vòng 6 cạnh đều, phẳng</b>, với <i>ba liên kết đôi xen kẽ ba liên kết đơn</i>.',
      'Thực chất các electron π <i>phân bố đều</i> trên cả vòng tạo nên <b>hệ thơm</b> rất bền vững.',
      'Chính độ bền của vòng thơm khiến benzen <b>khó tham gia phản ứng cộng, ưu tiên phản ứng thế</b>.',
    ], ['Sai — benzen không có dạng hình cầu.', 'Sai — benzen là vòng phẳng, không phải tứ diện.', 'Sai — benzen có cấu trúc vòng, không phải mạch thẳng.', 'Đúng — benzen là vòng 6 cạnh đều, có 3 liên kết đôi xen kẽ (vòng thơm bền).']),
    Q('Tính chất hoá học của benzen?', ['Khó cộng, dễ thế (vì vòng thơm bền)', 'Phản ứng mạnh với nước', 'Dễ cộng', 'Tan tốt trong nước'], 0, 'Benzen ưu tiên phản ứng thế (Br₂/Fe, HNO₃/H₂SO₄…) hơn cộng.', [
      'Do vòng thơm rất bền, benzen có tính chất hoá học đặc biệt: <b>khó cộng, dễ thế</b>.',
      '<ul><li>Phản ứng thế: <code>C₆H₆ + Br₂ →(Fe) C₆H₅Br + HBr</code>; thế với HNO₃/H₂SO₄ đặc.</li><li>Cộng (khó, cần điều kiện mạnh): cộng H₂, cộng Cl₂ (ánh sáng).</li></ul>',
      'Benzen <i>không tan trong nước</i> (là dung môi không phân cực) và là dung môi hữu cơ tốt.',
    ], ['Đúng — vòng thơm bền nên benzen khó cộng, ưu tiên phản ứng thế (Br₂/Fe, HNO₃/H₂SO₄).', 'Sai — benzen không phản ứng với nước.', 'Sai — benzen khó cộng do vòng thơm bền (khác etilen).', 'Sai — benzen không tan trong nước (là dung môi không phân cực).']),
  ]),

  M(23, 'Rượu etylic (C₂H₅OH)', [
    Q('Công thức của rượu etylic?', ['CH₃COOH', 'C₃H₇OH', 'CH₃OH (metanol, rượu độc)', 'C₂H₅OH'], 3, 'Etanol: CH₃-CH₂-OH = C₂H₅OH.', [
      '<b>Rượu etylic (etanol)</b> có công thức phân tử <code>C₂H₅OH</code>, công thức cấu tạo <code>CH₃–CH₂–OH</code>.',
      'Nó chứa <b>nhóm –OH (hidroxyl)</b> gắn vào nguyên tử C ⇒ thuộc loại <i>ancol (rượu)</i>.',
      'Phân biệt: CH₃OH là metanol (rất độc), CH₃COOH là axit axetic, C₃H₇OH là propanol.',
    ], ['Sai — CH₃COOH là axit axetic, không phải rượu.', 'Sai — C₃H₇OH là propanol, không phải rượu etylic.', 'Sai — CH₃OH là metanol (rượu độc), không phải etanol.', 'Đúng — rượu etylic = C₂H₅OH (CH₃-CH₂-OH).']),
    Q('Nhóm chức của rượu?', ['-CHO', '-OH (hidroxyl)', '-NH₂', '-COOH'], 1, 'Rượu (alcohol) đặc trưng bởi nhóm -OH gắn vào C no.', [
      '<b>Nhóm chức</b> là nhóm nguyên tử quyết định tính chất hoá học đặc trưng của một loại hợp chất.',
      'Rượu (ancol) đặc trưng bởi nhóm <b>–OH (hidroxyl)</b> liên kết với nguyên tử C no.',
      'Phân biệt các nhóm chức: <i>–OH (rượu), –COOH (axit), –CHO (anđehit), –NH₂ (amin)</i>.',
    ], ['Sai — -CHO là nhóm anđehit, không phải rượu.', 'Đúng — nhóm chức của rượu là -OH (hidroxyl) gắn vào C no.', 'Sai — -NH₂ là nhóm amin, không phải rượu.', 'Sai — -COOH là nhóm axit cacboxylic, không phải rượu.']),
    Q('Rượu etylic tan trong nước?', ['Tan ít', 'Không tan', 'Tan ở nhiệt độ cao', 'Tan vô hạn (cồn pha nước)'], 3, 'C₂H₅OH tan vô hạn trong nước nhờ liên kết hidro với H₂O.', [
      'Rượu etylic <b>tan vô hạn trong nước</b> theo mọi tỉ lệ (vì vậy có "cồn 70°, 90°"…).',
      'Nguyên nhân: nhóm <b>–OH</b> của rượu tạo được <i>liên kết hidro</i> với phân tử nước.',
      'Đây là lý do rượu, cồn dễ pha loãng với nước và được dùng làm dung môi.',
    ], ['Sai — rượu etylic tan vô hạn, không tan ít.', 'Sai — rượu etylic tan tốt trong nước (cồn pha nước).', 'Sai — rượu tan vô hạn ở mọi nhiệt độ thường.', 'Đúng — C₂H₅OH tan vô hạn trong nước nhờ liên kết hidro với H₂O.']),
    Q('Phản ứng đặc trưng: rượu + Na → ?', ['CH₃COONa + H₂', 'Không phản ứng', 'C₂H₅ONa + H₂', 'C₂H₅OH·Na'], 2, '2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑ (nhận biết nhóm -OH).', [
      'Nguyên tử H trong nhóm <b>–OH</b> của rượu có thể bị Na thay thế, giải phóng khí H₂.',
      'Phương trình: <code>2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑</code> (natri etylat + khí hiđro).',
      'Phản ứng này dùng để <i>nhận biết nhóm –OH</i> trong phân tử rượu.',
    ], ['Sai — CH₃COONa là sản phẩm của axit axetic + Na, không phải rượu.', 'Sai — rượu phản ứng với Na ở nhóm -OH giải phóng H₂.', 'Đúng — 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑ (nhận biết nhóm -OH).', 'Sai — không tạo phức C₂H₅OH·Na; tạo natri etylat và H₂.']),
    Q('Rượu etylic được sản xuất công nghiệp từ?', ['Tinh bột/đường + lên men (men rượu)', 'Khoáng vật', 'Cát thạch anh nung nóng', 'Đá vôi'], 0, 'Lên men: (C₆H₁₀O₅)ₙ → glucozơ → 2C₂H₅OH + 2CO₂.', [
      'Phương pháp truyền thống sản xuất rượu etylic là <b>lên men</b> tinh bột hoặc đường nhờ men rượu.',
      'Quá trình: tinh bột → glucozơ, rồi <code>C₆H₁₂O₆ →(men) 2C₂H₅OH + 2CO₂</code>.',
      'Ngoài ra còn điều chế từ etilen: <code>C₂H₄ + H₂O →(axit) C₂H₅OH</code>.',
    ], ['Đúng — lên men tinh bột/đường: glucozơ → 2C₂H₅OH + 2CO₂.', 'Sai — khoáng vật không tạo rượu etylic.', 'Sai — cát thạch anh (SiO₂) không tạo rượu.', 'Sai — đá vôi (CaCO₃) không tạo rượu etylic.']),
    Q('Độ rượu là?', ['Số ml C₂H₅OH có trong 100 ml dung dịch rượu', 'Khối lượng rượu', 'Nhiệt độ rượu', 'Áp suất rượu'], 0, 'Rượu 40° = 40 ml etanol nguyên chất trong 100 ml dung dịch.', [
      '<b>Độ rượu</b> cho biết nồng độ của rượu etylic trong dung dịch, tính theo <i>thể tích</i>.',
      'Định nghĩa: <code>độ rượu = số ml C₂H₅OH nguyên chất có trong 100 ml dung dịch rượu</code>.',
      'Ví dụ: rượu 40° nghĩa là trong 100 ml dung dịch có 40 ml etanol nguyên chất.',
    ], ['Đúng — độ rượu = số ml C₂H₅OH nguyên chất trong 100 ml dung dịch rượu.', 'Sai — độ rượu là tỉ lệ thể tích, không phải khối lượng.', 'Sai — độ rượu không liên quan đến nhiệt độ.', 'Sai — độ rượu không liên quan đến áp suất.']),
  ]),

  M(24, 'Axit axetic (CH₃COOH)', [
    Q('Công thức axit axetic?', ['C₂H₅OH', 'HCOOH (axit fomic, ít C hơn)', 'CH₃COOH', 'CH₃COCH₃'], 2, 'Axit axetic = CH₃-COOH, có nhóm -COOH.', [
      '<b>Axit axetic</b> có công thức phân tử <code>CH₃COOH</code> (hay C₂H₄O₂), chứa nhóm chức <b>–COOH (cacboxyl)</b>.',
      'Nó là axit hữu cơ điển hình, có trong giấm ăn.',
      'Phân biệt: HCOOH là axit fomic (ít C hơn), C₂H₅OH là rượu, CH₃COCH₃ là axeton (xeton).',
    ], ['Sai — C₂H₅OH là rượu etylic, không phải axit.', 'Sai — HCOOH là axit fomic (ít C hơn), không phải axit axetic.', 'Đúng — axit axetic = CH₃COOH, có nhóm -COOH.', 'Sai — CH₃COCH₃ là axeton (xeton), không phải axit.']),
    Q('Nhóm chức của axit cacboxylic?', ['-CHO', '-CO-', '-COOH (cacboxyl)', '-OH'], 2, 'Nhóm -COOH = cacboxyl, kết hợp -C=O và -OH.', [
      'Axit cacboxylic đặc trưng bởi nhóm chức <b>–COOH (cacboxyl)</b>, là sự kết hợp của nhóm cacbonyl (–C=O) và nhóm hidroxyl (–OH).',
      'Chính nhóm –COOH tạo nên <i>tính axit</i> (làm quỳ đỏ, phản ứng với kim loại, bazơ, muối).',
      'Phân biệt với: –OH (rượu), –CHO (anđehit), –CO– (xeton).',
    ], ['Sai — -CHO là nhóm anđehit.', 'Sai — -CO- là nhóm xeton (cacbonyl), không phải axit.', 'Đúng — nhóm -COOH (cacboxyl) đặc trưng cho axit cacboxylic.', 'Sai — -OH là nhóm rượu, không phải axit.']),
    Q('CH₃COOH có tính chất?', ['Tính bazơ', 'Tính axit yếu, làm quỳ tím hoá đỏ', 'Trung tính', 'Không có tính chất'], 1, 'Axit yếu nhưng vẫn làm quỳ đỏ, tác dụng kim loại, oxit bazơ, bazơ, muối.', [
      'Axit axetic là một <b>axit yếu</b> nhưng vẫn có đầy đủ tính chất hoá học của axit.',
      '<ul><li>Làm <b>quỳ tím hoá đỏ</b>.</li><li>Tác dụng kim loại (Zn, Mg…) → muối + H₂.</li><li>Tác dụng oxit bazơ, bazơ, muối cacbonat (giải phóng CO₂).</li></ul>',
      'Ví dụ: <code>CH₃COOH + NaOH → CH₃COONa + H₂O</code>.',
    ], ['Sai — CH₃COOH là axit, không có tính bazơ.', 'Đúng — CH₃COOH là axit yếu, làm quỳ tím hoá đỏ, phản ứng kim loại, bazơ, muối.', 'Sai — axit axetic không trung tính, làm quỳ đỏ.', 'Sai — axit axetic có đầy đủ tính chất của axit.']),
    Q('CH₃COOH + Na → ?', ['Không phản ứng', 'CH₃COONa + H₂', 'CH₃ONa', 'CH₃COOH·Na'], 1, '2CH₃COOH + 2Na → 2CH₃COONa + H₂↑.', [
      'Giống các axit khác, axit axetic phản ứng với kim loại Na giải phóng khí H₂.',
      'Phương trình: <code>2CH₃COOH + 2Na → 2CH₃COONa + H₂↑</code> (natri axetat + khí hiđro).',
      'Lưu ý phân biệt sản phẩm muối: CH₃COONa (từ axit) khác C₂H₅ONa (từ rượu).',
    ], ['Sai — axit axetic phản ứng với Na giải phóng H₂.', 'Đúng — 2CH₃COOH + 2Na → 2CH₃COONa + H₂↑.', 'Sai — CH₃ONa là natri metylat, không phải sản phẩm này.', 'Sai — không tạo phức; tạo muối CH₃COONa và H₂.']),
    Q('CH₃COOH + C₂H₅OH ⇌ ? (xt H₂SO₄ đặc)', ['Không phản ứng', 'CO₂ + H₂O', 'CH₃COOC₂H₅ (este) + H₂O', 'CH₃OH + C₂H₅OH'], 2, 'Phản ứng este hoá: axit + rượu → este + nước.', [
      '<b>Phản ứng este hoá</b>: axit cacboxylic tác dụng với rượu (xúc tác H₂SO₄ đặc, đun nóng) tạo <b>este</b> và nước.',
      'Phương trình: <code>CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O</code> (etyl axetat).',
      'Đây là phản ứng <i>thuận nghịch</i>; este sinh ra có mùi thơm đặc trưng.',
    ], ['Sai — axit và rượu có phản ứng este hoá với xúc tác H₂SO₄ đặc.', 'Sai — không tạo CO₂; đây là phản ứng este hoá.', 'Đúng — este hoá: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.', 'Sai — không tách thành 2 rượu; sản phẩm là este và nước.']),
    Q('Giấm ăn là?', ['Đường tan', 'Nước muối', 'Rượu loãng', 'Dung dịch CH₃COOH 2-5% trong nước'], 3, 'Giấm = dung dịch axit axetic ~3-5%.', [
      '<b>Giấm ăn</b> là dung dịch <i>axit axetic loãng</i>, nồng độ khoảng <code>2–5%</code> trong nước.',
      'Giấm có vị chua đặc trưng, được tạo ra khi lên men rượu loãng (rượu → axit axetic).',
      'Phân biệt: nước muối là dung dịch NaCl; đường tan là dung dịch saccarozơ — đều không phải giấm.',
    ], ['Sai — giấm không phải đường tan.', 'Sai — nước muối là dung dịch NaCl, không phải giấm.', 'Sai — giấm là axit axetic loãng, không phải rượu loãng.', 'Đúng — giấm ăn là dung dịch CH₃COOH 2-5% trong nước.']),
  ]),

  M(25, 'Chất béo — Lipit', [
    Q('Chất béo là?', ['Đường đơn (monosaccarit)', 'Tinh bột', 'Protein', 'Trieste của glixerol và các axit béo'], 3, 'Chất béo (lipit) = trieste của glixerol C₃H₅(OH)₃ với các axit béo.', [
      '<b>Chất béo (lipit)</b> về bản chất là <b>trieste của glixerol</b> [C₃H₅(OH)₃] với các <i>axit béo</i> (axit có mạch C dài).',
      'Công thức chung dạng (R–COO)₃C₃H₅. Chất béo là một loại este, không phải gluxit hay protein.',
      'Phân biệt: monosaccarit (đường đơn), tinh bột (polisaccarit), protein (từ axit amin) — đều khác chất béo.',
    ], ['Sai — đường đơn là gluxit, không phải chất béo.', 'Sai — tinh bột là polisaccarit (gluxit), không phải chất béo.', 'Sai — protein cấu tạo từ axit amin, không phải chất béo.', 'Đúng — chất béo (lipit) là trieste của glixerol và các axit béo.']),
    Q('Chất béo gồm 2 dạng?', ['Mỡ (động vật, no, rắn) và dầu (thực vật, không no, lỏng)', 'Chỉ dầu', 'Bột và lỏng', 'Chỉ mỡ'], 0, 'Mỡ: chứa axit béo no, rắn; dầu: chứa axit béo không no, lỏng.', [
      'Chất béo tồn tại ở <b>hai dạng</b> tuỳ thành phần axit béo và nguồn gốc:',
      '<ul><li><b>Mỡ</b>: thường từ động vật, chứa nhiều <i>axit béo no</i>, ở thể <b>rắn</b>.</li><li><b>Dầu</b>: thường từ thực vật, chứa nhiều <i>axit béo không no</i>, ở thể <b>lỏng</b>.</li></ul>',
      'Chính số liên kết đôi trong gốc axit béo quyết định chất béo rắn hay lỏng.',
    ], ['Đúng — mỡ (động vật, axit béo no, rắn) và dầu (thực vật, axit béo không no, lỏng).', 'Sai — chất béo gồm cả mỡ lẫn dầu, không chỉ dầu.', 'Sai — bột và lỏng không phải phân loại chất béo.', 'Sai — chất béo gồm cả dầu lẫn mỡ, không chỉ mỡ.']),
    Q('Phản ứng xà phòng hoá chất béo?', ['Chất béo + NaOH → muối Na của axit béo (xà phòng) + glixerol', 'Chất béo + nước → đường', 'Không phản ứng', 'Chất béo + O₂ → CO₂'], 0, 'Thủy phân kiềm tạo xà phòng (muối Na/K của axit béo).', [
      '<b>Phản ứng xà phòng hoá</b> là sự <i>thuỷ phân chất béo trong môi trường kiềm</i> (NaOH, KOH).',
      'Sản phẩm: <code>chất béo + 3NaOH → muối natri của axit béo (xà phòng) + glixerol</code>.',
      'Đây là cơ sở của ngành sản xuất xà phòng; muối Na của axit béo chính là thành phần chính của xà phòng.',
    ], ['Đúng — chất béo + NaOH → muối Na của axit béo (xà phòng) + glixerol.', 'Sai — thủy phân chất béo cho axit béo và glixerol, không tạo đường.', 'Sai — chất béo có phản ứng xà phòng hoá với kiềm.', 'Sai — đây là phản ứng cháy, không phải xà phòng hoá.']),
    Q('Chất béo có vai trò gì?', ['Cung cấp năng lượng cao, dung môi cho vitamin tan trong dầu (A, D, E, K)', 'Chỉ làm thực phẩm', 'Chỉ làm đẹp', 'Không có vai trò'], 0, '1 g chất béo cho 9 kcal — nguồn năng lượng dự trữ.', [
      'Chất béo có vai trò quan trọng với cơ thể sống:',
      '<ul><li>Là <b>nguồn cung cấp năng lượng cao</b>: 1 g chất béo cho ~9 kcal (gấp đôi đường, đạm).</li><li>Là <b>dung môi</b> hoà tan các vitamin tan trong dầu: <code>A, D, E, K</code>.</li><li>Dự trữ năng lượng, bảo vệ cơ quan, giữ ấm cơ thể.</li></ul>',
    ], ['Đúng — chất béo cung cấp năng lượng cao (9 kcal/g) và là dung môi cho vitamin A, D, E, K.', 'Sai — chất béo còn nhiều vai trò ngoài thực phẩm (dung môi vitamin, dự trữ năng lượng).', 'Sai — chất béo có vai trò sinh học quan trọng, không chỉ làm đẹp.', 'Sai — chất béo có vai trò quan trọng với cơ thể.']),
    Q('Vì sao không nên ăn quá nhiều chất béo?', ['Tăng chiều cao', 'Tăng sức khỏe', 'Gây béo phì, xơ vữa động mạch, bệnh tim mạch', 'Không có hại'], 2, 'Quá nhiều cholesterol/triglyceride ⇒ xơ vữa, tim mạch, béo phì.', [
      'Chất béo cần thiết nhưng <i>ăn quá nhiều</i> (nhất là mỡ động vật) lại có hại cho sức khoẻ.',
      'Dư thừa chất béo và cholesterol gây <b>béo phì, xơ vữa động mạch, các bệnh tim mạch, huyết áp cao</b>.',
      'Vì vậy nên ăn cân đối, hạn chế mỡ động vật, ưu tiên dầu thực vật và tập thể dục.',
    ], ['Sai — ăn nhiều chất béo không giúp tăng chiều cao.', 'Sai — ăn quá nhiều chất béo gây hại, không tăng sức khỏe.', 'Đúng — quá nhiều chất béo gây béo phì, xơ vữa động mạch, bệnh tim mạch.', 'Sai — ăn quá nhiều chất béo có hại cho sức khỏe.']),
    Q('Ứng dụng của chất béo?', ['Làm thuốc nổ', 'Thực phẩm, sản xuất xà phòng, mỹ phẩm, biodiesel', 'Làm gỗ', 'Làm phân bón'], 1, 'Đa dụng: ăn uống, công nghiệp xà phòng, nhiên liệu sinh học.', [
      'Chất béo có nhiều ứng dụng trong đời sống và công nghiệp:',
      '<ul><li><b>Thực phẩm</b>: nguồn dinh dưỡng và năng lượng.</li><li>Sản xuất <b>xà phòng</b> (phản ứng xà phòng hoá), <b>mỹ phẩm</b>.</li><li>Sản xuất <b>biodiesel</b> (nhiên liệu sinh học) từ dầu thực vật.</li></ul>',
    ], ['Sai — chất béo không dùng làm thuốc nổ.', 'Đúng — chất béo dùng làm thực phẩm, sản xuất xà phòng, mỹ phẩm, biodiesel.', 'Sai — chất béo không làm ra gỗ.', 'Sai — phân bón từ N, P, K, không phải chất béo.']),
  ]),

  M(26, 'Glucozơ (C₆H₁₂O₆) và saccarozơ (C₁₂H₂₂O₁₁)', [
    Q('Glucozơ thuộc loại?', ['Disaccarit', 'Polisaccarit', 'Monosaccarit (đường đơn)', 'Lipit (chất béo, không phải gluxit)'], 2, 'Glucozơ là monosaccarit — đường đơn đơn giản nhất.', [
      'Gluxit (cacbohiđrat) được chia theo số đơn vị đường: <i>monosaccarit, disaccarit, polisaccarit</i>.',
      '<b>Glucozơ</b> là <b>monosaccarit (đường đơn)</b> — loại đường đơn giản nhất, không bị thuỷ phân nữa.',
      'Phân biệt: saccarozơ là disaccarit (đường đôi), tinh bột/xenlulozơ là polisaccarit (đường đa).',
    ], ['Sai — disaccarit là saccarozơ, mantozơ; glucozơ là đường đơn.', 'Sai — polisaccarit là tinh bột, xenlulozơ; glucozơ là đường đơn.', 'Đúng — glucozơ là monosaccarit (đường đơn) đơn giản nhất.', 'Sai — glucozơ là gluxit, không phải lipit.']),
    Q('Công thức glucozơ?', ['C₁₂H₂₂O₁₁', 'C₆H₁₂O₆', 'C₂H₆O (công thức của etanol)', '(C₆H₁₀O₅)ₙ'], 1, 'Glucozơ = C₆H₁₂O₆ (M = 180).', [
      '<b>Glucozơ</b> có công thức phân tử <code>C₆H₁₂O₆</code>, khối lượng mol <code>M = 180</code>.',
      'Glucozơ và fructozơ cùng công thức C₆H₁₂O₆ (là đồng phân của nhau).',
      'Phân biệt: C₁₂H₂₂O₁₁ là saccarozơ, (C₆H₁₀O₅)ₙ là tinh bột/xenlulozơ.',
    ], ['Sai — C₁₂H₂₂O₁₁ là saccarozơ, không phải glucozơ.', 'Đúng — glucozơ = C₆H₁₂O₆ (M = 180).', 'Sai — C₂H₆O là etanol, không phải glucozơ.', 'Sai — (C₆H₁₀O₅)ₙ là tinh bột/xenlulozơ, không phải glucozơ.']),
    Q('Glucozơ có ở đâu?', ['Trong máu, mật ong, nho chín', 'Trong dầu', 'Trong cát', 'Trong sắt'], 0, 'Glucozơ có nhiều trong mật ong, nho chín, máu (glucoza huyết).', [
      'Glucozơ là loại đường phổ biến trong tự nhiên, có nhiều trong:',
      '<ul><li><b>Quả chín</b> (đặc biệt nho chín), <b>mật ong</b>.</li><li><b>Máu người và động vật</b> (đường huyết, nồng độ ~0,1%).</li></ul>',
      'Glucozơ là nguồn năng lượng trực tiếp cho tế bào.',
    ], ['Đúng — glucozơ có trong máu, mật ong, nho chín.', 'Sai — dầu là chất béo, không chứa glucozơ.', 'Sai — cát (SiO₂) không chứa glucozơ.', 'Sai — sắt là kim loại, không chứa glucozơ.']),
    Q('Phản ứng tráng gương của glucozơ?', ['Khử Ag⁺ tạo Ag↓ kim loại bóng', 'Tạo CO₂', 'Tạo H₂', 'Không phản ứng'], 0, 'Glucozơ có nhóm -CHO ⇒ phản ứng với AgNO₃/NH₃ tạo gương Ag.', [
      'Trong phân tử glucozơ có nhóm chức <b>–CHO (anđehit)</b>, nên glucozơ có <i>tính khử</i>.',
      '<b>Phản ứng tráng gương</b>: glucozơ khử Ag⁺ (trong AgNO₃/NH₃) thành <b>Ag kim loại</b> bám lên thành ống nghiệm như một lớp gương sáng.',
      'Phản ứng này dùng để <i>nhận biết glucozơ</i> và ứng dụng tráng ruột phích, gương soi.',
    ], ['Đúng — glucozơ có nhóm -CHO khử Ag⁺ tạo Ag↓ kim loại bóng (gương).', 'Sai — phản ứng tráng gương không tạo CO₂.', 'Sai — phản ứng tráng gương không tạo H₂.', 'Sai — glucozơ có nhóm anđehit nên phản ứng tráng gương xảy ra.']),
    Q('Saccarozơ là?', ['Monosaccarit', 'Lipit (chất béo, không phải gluxit)', 'Disaccarit (1 phân tử glucozơ + 1 phân tử fructozơ)', 'Polisaccarit'], 2, 'Saccarozơ = đường mía/đường thốt nốt, M = 342.', [
      '<b>Saccarozơ</b> (đường mía, đường thốt nốt) là <b>disaccarit</b>, công thức <code>C₁₂H₂₂O₁₁</code>, M = 342.',
      'Một phân tử saccarozơ gồm <b>1 gốc glucozơ + 1 gốc fructozơ</b> liên kết với nhau.',
      'Saccarozơ <i>không</i> có phản ứng tráng gương (khác glucozơ), nhưng bị thuỷ phân tạo glucozơ và fructozơ.',
    ], ['Sai — monosaccarit là glucozơ, fructozơ; saccarozơ là đường đôi.', 'Sai — saccarozơ là gluxit, không phải lipit.', 'Đúng — saccarozơ là disaccarit gồm 1 glucozơ + 1 fructozơ (đường mía).', 'Sai — polisaccarit là tinh bột, xenlulozơ; saccarozơ là đường đôi.']),
    Q('Saccarozơ thủy phân tạo?', ['2 phân tử fructozơ', 'Tinh bột', 'Glucozơ + Fructozơ', 'Glucozơ + Glucozơ'], 2, 'C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucozơ) + C₆H₁₂O₆ (fructozơ).', [
      'Saccarozơ bị <b>thuỷ phân</b> (xúc tác axit hoặc enzim) thành hai đường đơn.',
      'Phương trình: <code>C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucozơ) + C₆H₁₂O₆ (fructozơ)</code>.',
      'Đây là quá trình xảy ra khi tiêu hoá đường ăn trong cơ thể.',
    ], ['Sai — không tạo 2 fructozơ; tạo 1 glucozơ + 1 fructozơ.', 'Sai — saccarozơ thủy phân tạo đường đơn, không tạo tinh bột.', 'Đúng — saccarozơ + H₂O → glucozơ + fructozơ.', 'Sai — không tạo 2 glucozơ; sản phẩm gồm glucozơ và fructozơ.']),
  ]),

  M(27, 'Tinh bột — Xenlulozơ', [
    Q('Tinh bột và xenlulozơ đều thuộc?', ['Polisaccarit (C₆H₁₀O₅)ₙ', 'Disaccarit', 'Lipit (chất béo, không phải gluxit)', 'Monosaccarit'], 0, 'Đều là polisaccarit, cùng công thức (C₆H₁₀O₅)ₙ nhưng cấu trúc khác.', [
      'Tinh bột và xenlulozơ đều là <b>polisaccarit</b> (đường đa), có cùng công thức chung <code>(C₆H₁₀O₅)ₙ</code>.',
      'Cả hai đều được tạo thành từ nhiều mắt xích <i>glucozơ</i>, nhưng <b>cách sắp xếp mạch khác nhau</b> ⇒ tính chất khác nhau.',
      'Tinh bột dễ tiêu hoá (cho người), còn xenlulozơ thì người không tiêu hoá được.',
    ], ['Đúng — cả hai là polisaccarit, cùng công thức (C₆H₁₀O₅)ₙ nhưng cấu trúc khác nhau.', 'Sai — disaccarit là saccarozơ; tinh bột và xenlulozơ là polisaccarit.', 'Sai — cả hai là gluxit, không phải lipit.', 'Sai — monosaccarit là glucozơ; tinh bột/xenlulozơ là polisaccarit.']),
    Q('Tinh bột có ở đâu?', ['Dầu thực vật ép từ hạt', 'Gỗ và bã mía (chứa nhiều xenlulozơ)', 'Hạt ngũ cốc, củ, quả (gạo, ngô, khoai, sắn)', 'Quặng sắt và đá vôi'], 2, 'Tinh bột tích lũy trong các cơ quan dự trữ của thực vật.', [
      '<b>Tinh bột</b> là chất dự trữ năng lượng của thực vật, tích luỹ nhiều trong các cơ quan dự trữ.',
      'Nguồn giàu tinh bột: <b>hạt ngũ cốc (gạo, ngô, lúa mì), củ (khoai, sắn), quả</b>.',
      'Phân biệt: gỗ, bã mía chứa nhiều xenlulozơ; dầu thực vật là chất béo.',
    ], ['Sai — dầu thực vật là chất béo, không phải tinh bột.', 'Sai — gỗ, bã mía chứa nhiều xenlulozơ, không phải tinh bột.', 'Đúng — tinh bột có trong hạt ngũ cốc, củ, quả (gạo, ngô, khoai, sắn).', 'Sai — quặng sắt và đá vôi là khoáng vô cơ, không chứa tinh bột.']),
    Q('Xenlulozơ có ở đâu?', ['Máu và dịch tế bào động vật', 'Đường mía và nước ép trái cây', 'Thành tế bào thực vật (bông, gỗ, tre nứa)', 'Mỡ động vật và dầu thực vật'], 2, 'Xenlulozơ là thành phần chính của vách tế bào thực vật.', [
      '<b>Xenlulozơ</b> là thành phần chính tạo nên <b>thành (vách) tế bào thực vật</b>, giúp cây cứng cáp.',
      'Nguồn giàu xenlulozơ: <b>bông (gần như nguyên chất), gỗ, tre nứa, rơm rạ</b>.',
      'Người không có enzim phân giải xenlulozơ nên không tiêu hoá được; tuy vậy chất xơ này hỗ trợ tiêu hoá.',
    ], ['Sai — máu chứa glucozơ, không chứa xenlulozơ.', 'Sai — đường mía là saccarozơ, không phải xenlulozơ.', 'Đúng — xenlulozơ là thành phần chính của thành tế bào thực vật (bông, gỗ, tre nứa).', 'Sai — mỡ và dầu là chất béo, không phải xenlulozơ.']),
    Q('Phản ứng nhận biết tinh bột?', ['Tinh bột + axit → màu vàng', 'Tinh bột + iot (I₂) → màu xanh tím', 'Tinh bột + nước → màu đỏ', 'Tinh bột + AgNO₃ → kết tủa trắng'], 1, 'Phản ứng nhận biết tinh bột là tạo phức màu xanh tím với iot.', [
      'Để <b>nhận biết tinh bột</b>, người ta dùng dung dịch <b>iot (I₂)</b>.',
      'Tinh bột tác dụng với iot tạo hợp chất có <b>màu xanh tím</b> đặc trưng. Khi đun nóng màu mất, để nguội màu hiện lại.',
      'Đây là phản ứng đặc trưng dùng để thử tinh bột trong thực phẩm (ví dụ nhỏ iot lên lát khoai).',
    ], ['Sai — tinh bột với axit không cho màu vàng đặc trưng để nhận biết.', 'Đúng — tinh bột + iot tạo phức màu xanh tím, dùng để nhận biết.', 'Sai — tinh bột với nước không tạo màu đỏ.', 'Sai — phản ứng với AgNO₃ không phải đặc trưng nhận biết tinh bột.']),
    Q('Ứng dụng của xenlulozơ?', ['Làm thực phẩm trực tiếp', 'Làm phân bón', 'Làm thuốc nổ', 'Sản xuất giấy, vải sợi, tơ nhân tạo (visco, axetat)'], 3, 'Giấy, vải bông, sợi visco, axetat… đều từ xenlulozơ.', [
      'Xenlulozơ là nguyên liệu công nghiệp quan trọng:',
      '<ul><li>Sản xuất <b>giấy</b> (từ bột gỗ).</li><li>Dệt <b>vải sợi bông</b>.</li><li>Sản xuất <b>tơ nhân tạo</b>: tơ visco, tơ axetat.</li></ul>',
      'Người không tiêu hoá được xenlulozơ nên không dùng làm thực phẩm dinh dưỡng trực tiếp.',
    ], ['Sai — người không tiêu hoá được xenlulozơ thành dinh dưỡng trực tiếp.', 'Sai — xenlulozơ không dùng làm phân bón.', 'Sai — thuốc súng không khói từ xenlulozơ nitrat là trường hợp đặc biệt, không phải ứng dụng phổ biến lớp 9.', 'Đúng — xenlulozơ dùng sản xuất giấy, vải sợi, tơ nhân tạo (visco, axetat).']),
    Q('Trong cơ thể người, tinh bột được tiêu hoá thành?', ['Glucozơ (qua enzim amilaza)', 'Fructozơ', 'Xenlulozơ', 'Saccarozơ'], 0, 'Tinh bột → maltozơ → glucozơ trong miệng, ruột.', [
      'Trong cơ thể, tinh bột được <b>thuỷ phân</b> nhờ enzim (amilaza trong nước bọt và ruột) thành đường đơn.',
      'Quá trình: <code>tinh bột → mantozơ → glucozơ</code>. Sản phẩm cuối cùng là <b>glucozơ</b> được hấp thụ vào máu.',
      'Đó là lý do nhai cơm lâu thấy có vị ngọt (tinh bột chuyển một phần thành đường).',
    ], ['Đúng — tinh bột → maltozơ → glucozơ nhờ enzim amilaza.', 'Sai — sản phẩm tiêu hoá tinh bột là glucozơ, không phải fructozơ.', 'Sai — cơ thể không tổng hợp xenlulozơ từ tinh bột.', 'Sai — tinh bột tiêu hoá thành glucozơ, không phải saccarozơ.']),
  ]),

  M(28, 'Protein và polime', [
    Q('Protein được cấu tạo từ?', ['Axit béo', 'Các axit amin liên kết với nhau bằng liên kết peptit', 'Glucozơ', 'Nucleotit'], 1, 'Protein = chuỗi axit amin nối nhau qua liên kết peptit (-CO-NH-).', [
      '<b>Protein</b> là hợp chất cao phân tử, được cấu tạo từ các đơn phân là <b>axit amin</b>.',
      'Các axit amin nối với nhau bằng <b>liên kết peptit (–CO–NH–)</b> tạo thành chuỗi polipeptit.',
      'Phân biệt đơn phân: axit amin (protein), glucozơ (gluxit), nucleotit (ADN/ARN), axit béo (chất béo).',
    ], ['Sai — axit béo cấu tạo nên chất béo, không phải protein.', 'Đúng — protein là chuỗi axit amin nối nhau bằng liên kết peptit (-CO-NH-).', 'Sai — glucozơ là đơn vị của gluxit, không phải protein.', 'Sai — nucleotit là đơn phân của ADN/ARN, không phải protein.']),
    Q('Có khoảng bao nhiêu loại axit amin tạo nên protein của sinh vật?', ['100', '20', '50', '10'], 1, 'Có 20 axit amin chuẩn, trong đó 9 axit amin thiết yếu phải lấy từ thức ăn.', [
      'Có khoảng <b>20 loại axit amin</b> chuẩn tham gia cấu tạo protein của các sinh vật.',
      'Trong đó có <i>9 axit amin thiết yếu</i> cơ thể người không tự tổng hợp được, phải lấy từ thức ăn.',
      'Từ 20 loại axit amin, sự sắp xếp khác nhau tạo nên <b>vô số loại protein</b> với chức năng đa dạng.',
    ], ['Sai — không tới 100; có 20 loại axit amin chuẩn.', 'Đúng — có 20 axit amin chuẩn, trong đó 9 loại thiết yếu lấy từ thức ăn.', 'Sai — không phải 50; con số đúng là 20.', 'Sai — không phải 10; con số đúng là 20.']),
    Q('Protein có ở đâu?', ['Trong sắt', 'Trong cơ thể sinh vật (thịt, cá, trứng, sữa, đậu nành)', 'Trong cát', 'Trong khí O₂'], 1, 'Protein có nhiều trong thực phẩm động vật và một số thực vật (đậu).', [
      'Protein có mặt trong mọi cơ thể sống và là thành phần dinh dưỡng quan trọng.',
      'Nguồn giàu protein: <b>thịt, cá, trứng, sữa</b> (động vật) và <b>đậu nành, các loại đậu</b> (thực vật).',
      'Protein xây dựng tế bào, cơ bắp, enzim, kháng thể — không thể thiếu trong khẩu phần ăn.',
    ], ['Sai — sắt là kim loại, không chứa protein.', 'Đúng — protein có nhiều trong thịt, cá, trứng, sữa, đậu nành.', 'Sai — cát (SiO₂) không chứa protein.', 'Sai — khí O₂ là đơn chất, không chứa protein.']),
    Q('Polime là?', ['Hợp chất nhỏ', 'Hợp chất vô cơ', 'Hợp chất khí', 'Hợp chất phân tử khối rất lớn, do nhiều monome liên kết tạo thành'], 3, 'Polime: phân tử lớn (polymer = nhiều monome).', [
      '<b>Polime</b> là những hợp chất có <b>phân tử khối rất lớn</b>, do nhiều phân tử nhỏ (<i>monome</i>) liên kết lặp lại tạo thành.',
      'Ví dụ: PE (từ etilen), PVC (từ vinyl clorua), tinh bột, protein, cao su.',
      'Polime được chia thành <i>polime thiên nhiên</i> (tinh bột, xenlulozơ, protein) và <i>polime tổng hợp</i> (PE, PVC…).',
    ], ['Sai — polime là phân tử rất lớn, không phải hợp chất nhỏ.', 'Sai — nhiều polime là hữu cơ; định nghĩa dựa trên kích thước phân tử, không phải vô cơ.', 'Sai — polime thường là chất rắn, không phải khí.', 'Đúng — polime là hợp chất phân tử khối rất lớn, do nhiều monome liên kết tạo thành.']),
    Q('PE (polietilen) được tạo từ?', ['Trùng hợp protein', 'Phản ứng trùng hợp etilen (C₂H₄)', 'Trùng hợp glucozơ', 'Trùng hợp metan'], 1, 'n CH₂=CH₂ → (-CH₂-CH₂-)ₙ.', [
      '<b>Polietilen (PE)</b> được tạo ra bằng <b>phản ứng trùng hợp etilen</b>.',
      'Phương trình: <code>n CH₂=CH₂ → (–CH₂–CH₂–)ₙ</code>. Liên kết đôi của etilen mở ra để nối các monome.',
      'Metan (no, không có liên kết đôi) <i>không</i> trùng hợp được; glucozơ, protein cũng không tạo PE.',
    ], ['Sai — protein không phải monome tạo PE.', 'Đúng — PE tạo từ trùng hợp etilen: n CH₂=CH₂ → (-CH₂-CH₂-)ₙ.', 'Sai — glucozơ không trùng hợp tạo PE.', 'Sai — metan no, không có liên kết đôi nên không trùng hợp được.']),
    Q('PVC là?', ['Cao su', 'Polipropylen', 'Polivinyl clorua, tạo từ vinyl clorua CH₂=CHCl', 'Polietilen'], 2, 'PVC dùng làm ống nước, cửa nhựa, dây cáp điện…', [
      '<b>PVC (polivinyl clorua)</b> là polime tổng hợp được tạo ra từ trùng hợp <b>vinyl clorua CH₂=CHCl</b>.',
      'Phương trình: <code>n CH₂=CHCl → (–CH₂–CHCl–)ₙ</code>.',
      'PVC bền, cách điện tốt nên dùng làm <i>ống nước, cửa nhựa, vỏ dây cáp điện, áo mưa</i>.',
    ], ['Sai — cao su là polime khác (từ isopren/butadien).', 'Sai — polipropylen tạo từ propilen, không phải PVC.', 'Đúng — PVC là polivinyl clorua, tạo từ vinyl clorua CH₂=CHCl.', 'Sai — polietilen (PE) tạo từ etilen, khác PVC.']),
  ]),

  M(29, 'Di truyền học — Menđen và quy luật di truyền', [
    Q('Gregor Mendel được coi là?', ['Cha của vật lý', 'Người phát minh kính hiển vi', 'Cha đẻ của di truyền học hiện đại', 'Người phát minh ra ADN'], 2, 'Mendel (1822-1884) công bố các quy luật di truyền năm 1865.', [
      '<b>Gregor Mendel</b> (1822–1884) là nhà khoa học người Áo, được coi là <b>"cha đẻ của di truyền học"</b>.',
      'Năm 1865, ông công bố các <i>quy luật di truyền</i> dựa trên thí nghiệm lai đậu Hà Lan.',
      'Phân biệt: ADN do Watson – Crick mô tả (1953); Mendel không phát minh kính hiển vi hay ADN.',
    ], ['Sai — Mendel thuộc lĩnh vực sinh học/di truyền, không phải vật lý.', 'Sai — Mendel không phát minh kính hiển vi.', 'Đúng — Mendel (1822-1884) là cha đẻ của di truyền học hiện đại, công bố quy luật năm 1865.', 'Sai — ADN được Watson-Crick mô tả 1953, không phải Mendel.']),
    Q('Mendel nghiên cứu di truyền ở?', ['Ruồi giấm', 'Cây đậu Hà Lan', 'Chuột bạch', 'Người (qua phả hệ gia đình)'], 1, 'Mendel chọn đậu Hà Lan vì có nhiều cặp tính trạng đối lập rõ rệt.', [
      'Mendel chọn <b>cây đậu Hà Lan</b> làm đối tượng nghiên cứu di truyền.',
      'Lý do: đậu Hà Lan <i>tự thụ phấn nghiêm ngặt</i>, dễ trồng, vòng đời ngắn và có nhiều <b>cặp tính trạng tương phản rõ rệt</b> (hạt trơn/nhăn, hoa tím/trắng…).',
      'Phân biệt: ruồi giấm là đối tượng của Morgan (sau này), không phải Mendel.',
    ], ['Sai — ruồi giấm là đối tượng của Morgan, không phải Mendel.', 'Đúng — Mendel nghiên cứu trên cây đậu Hà Lan vì có nhiều cặp tính trạng tương phản rõ.', 'Sai — chuột bạch không phải đối tượng của Mendel.', 'Sai — Mendel không nghiên cứu di truyền người qua phả hệ.']),
    Q('Quy luật phân li của Mendel phát biểu?', ['Gen luôn đi cùng nhau', 'Tính trạng không di truyền', 'Tính trạng do nhiều gen', 'Mỗi cặp tính trạng do 1 cặp gen quy định; khi giảm phân, 2 gen tách rời nhau, mỗi giao tử chứa 1 gen'], 3, 'Quy luật phân li: alen tách nhau khi tạo giao tử.', [
      '<b>Quy luật phân li</b> của Mendel: mỗi cặp tính trạng do <i>một cặp nhân tố di truyền (gen/alen)</i> quy định.',
      'Khi <b>giảm phân</b> tạo giao tử, hai gen trong cặp <b>phân li (tách rời) nhau</b>, mỗi giao tử chỉ chứa một gen của cặp.',
      'Khi thụ tinh, các giao tử kết hợp ngẫu nhiên ⇒ phục hồi cặp gen ở đời con.',
    ], ['Sai — quy luật phân li nói các alen tách rời nhau, không đi cùng nhau.', 'Sai — tính trạng có di truyền; đó là nội dung di truyền học.', 'Sai — quy luật phân li xét 1 cặp gen quy định 1 cặp tính trạng.', 'Đúng — mỗi cặp tính trạng do 1 cặp gen quy định; khi giảm phân 2 gen tách rời, mỗi giao tử chứa 1 gen.']),
    Q('Tính trạng trội là tính trạng?', ['Tự nhiên', 'Biểu hiện ở F₂', 'Không biểu hiện', 'Biểu hiện ở F₁ khi lai 2 dòng thuần khác nhau'], 3, 'F₁ đồng tính trội ⇒ tính trạng đó là trội.', [
      '<b>Tính trạng trội</b> là tính trạng <i>biểu hiện ở thế hệ F₁</i> khi lai hai dòng thuần chủng khác nhau.',
      'Ví dụ: lai đậu hoa tím (thuần) × hoa trắng (thuần) → F₁ toàn hoa tím ⇒ tính trạng hoa tím là trội.',
      '<b>Tính trạng lặn</b> (hoa trắng) bị che lấp ở F₁, chỉ xuất hiện lại ở F₂ với tỉ lệ 1/4.',
    ], ['Sai — "tự nhiên" không phải định nghĩa của tính trạng trội.', 'Sai — tính trạng trội biểu hiện ngay ở F₁, không chờ F₂.', 'Sai — tính trạng trội có biểu hiện; tính trạng lặn mới bị che ở F₁.', 'Đúng — tính trạng trội biểu hiện ở F₁ khi lai 2 dòng thuần khác nhau.']),
    Q('Tỉ lệ kiểu hình ở F₂ trong lai 1 cặp tính trạng (Mendel)?', ['1:2:1', '3 trội : 1 lặn', '1:1', '9:3:3:1'], 1, '3 trội : 1 lặn ở F₂ khi lai 2 bố mẹ thuần chủng.', [
      'Trong phép lai <b>một cặp tính trạng</b> của Mendel (P thuần chủng tương phản), F₁ đồng tính trội.',
      'Cho F₁ tự thụ phấn, ở <b>F₂</b> thu được tỉ lệ kiểu hình <code>3 trội : 1 lặn</code>.',
      'Lưu ý phân biệt: <i>tỉ lệ kiểu gen</i> là 1 : 2 : 1 (AA : Aa : aa), còn <i>tỉ lệ kiểu hình</i> là 3 : 1.',
    ], ['Sai — 1:2:1 là tỉ lệ kiểu GEN, không phải kiểu hình.', 'Đúng — tỉ lệ kiểu hình F₂ là 3 trội : 1 lặn.', 'Sai — 1:1 là tỉ lệ phép lai phân tích, không phải F₂.', 'Sai — 9:3:3:1 là tỉ lệ lai 2 cặp tính trạng, không phải 1 cặp.']),
    Q('Genotype Aa × Aa cho tỉ lệ kiểu gen?', ['1 AA : 3 Aa', '1 AA : 1 aa', '1 AA : 2 Aa : 1 aa', '3 Aa : 1 aa'], 2, 'Lai phân tích Aa × Aa: 1/4 AA + 2/4 Aa + 1/4 aa.', [
      'Phép lai <b>Aa × Aa</b>: mỗi bên cho hai loại giao tử A và a với tỉ lệ bằng nhau.',
      'Dùng khung Punnett, đời con có tỉ lệ kiểu gen: <code>1 AA : 2 Aa : 1 aa</code>.',
      'Tương ứng tỉ lệ kiểu hình: 3 trội (AA, Aa) : 1 lặn (aa) — đúng với kết quả F₂ của Mendel.',
    ], ['Sai — không phải 1:3; tỉ lệ kiểu gen đúng là 1:2:1.', 'Sai — bỏ sót kiểu gen Aa chiếm 2 phần.', 'Đúng — Aa × Aa cho 1 AA : 2 Aa : 1 aa.', 'Sai — thiếu AA; tỉ lệ đúng là 1 AA : 2 Aa : 1 aa.']),
  ]),

  M(30, 'ADN — Cấu trúc và chức năng', [
    Q('ADN là viết tắt của?', ['Axit nucleic', 'ADN viết tắt nguyên gốc tiếng Việt', 'Axit deoxiribonucleic', 'Adenin'], 2, 'ADN = Axit deoxiribonucleic (DNA - Deoxyribonucleic Acid).', [
      '<b>ADN</b> là viết tắt của <b>Axit deoxiribonucleic</b> (tiếng Anh: DNA – Deoxyribonucleic Acid).',
      'ADN là một loại axit nucleic, đóng vai trò vật chất di truyền ở cấp độ phân tử.',
      'Phân biệt: "axit nucleic" là khái niệm rộng gồm cả ADN và ARN; Adenin (A) chỉ là một loại bazơ.',
    ], ['Sai — axit nucleic là khái niệm rộng (gồm ADN và ARN), không phải tên đầy đủ của ADN.', 'Sai — ADN là viết tắt từ thuật ngữ khoa học, không phải tiếng Việt.', 'Đúng — ADN = Axit deoxiribonucleic.', 'Sai — Adenin (A) là một loại bazơ nitơ, không phải tên đầy đủ của ADN.']),
    Q('Cấu trúc của ADN?', ['Chuỗi đơn xoắn', 'Mạch đơn', 'Khối cầu', 'Chuỗi xoắn kép gồm 2 mạch đơn liên kết theo nguyên tắc bổ sung'], 3, 'Watson-Crick (1953): ADN là chuỗi xoắn kép.', [
      'Năm 1953, Watson và Crick mô tả ADN có cấu trúc <b>chuỗi xoắn kép</b>.',
      'ADN gồm <b>hai mạch đơn</b> song song, xoắn đều quanh một trục; các nucleotit trên hai mạch liên kết với nhau theo <b>nguyên tắc bổ sung</b> (A–T, G–X).',
      'Khác với ARN (chỉ có một mạch đơn).',
    ], ['Sai — ADN có 2 mạch, không phải chuỗi đơn.', 'Sai — ADN là mạch kép, không phải mạch đơn (khác ARN).', 'Sai — ADN có dạng xoắn kép, không phải khối cầu.', 'Đúng — ADN là chuỗi xoắn kép gồm 2 mạch liên kết theo nguyên tắc bổ sung (Watson-Crick 1953).']),
    Q('Các loại bazơ nitơ trong ADN?', ['A, T, G, X (C)', 'A, G, X chỉ', 'A, U, G, X', 'A, T, U, G'], 0, '4 loại bazơ: Adenin (A), Timin (T), Guanin (G), Xytosin (X/C).', [
      'ADN được cấu tạo từ 4 loại đơn phân (nucleotit), phân biệt bởi 4 loại <b>bazơ nitơ</b>:',
      '<code>A (Adenin), T (Timin), G (Guanin), X/C (Xitozin)</code>.',
      'Lưu ý: <b>ARN</b> không có Timin (T) mà thay bằng <b>Uraxin (U)</b>. Vậy U chỉ có trong ARN, không có trong ADN.',
    ], ['Đúng — 4 bazơ trong ADN: Adenin (A), Timin (T), Guanin (G), Xytosin (X/C).', 'Sai — thiếu Timin (T); ADN có 4 loại bazơ.', 'Sai — U (Uraxin) có trong ARN, không có trong ADN; ADN dùng T.', 'Sai — ADN không có U; U thuộc ARN.']),
    Q('Nguyên tắc bổ sung trong ADN?', ['A với A, T với T', 'Không có nguyên tắc', 'A liên kết với T, G liên kết với X (C)', 'A với G, T với X'], 2, 'A=T (2 liên kết H), G≡X (3 liên kết H).', [
      '<b>Nguyên tắc bổ sung</b> quy định cách các bazơ trên hai mạch ADN bắt cặp với nhau:',
      '<ul><li><b>A liên kết với T</b> bằng 2 liên kết hidro.</li><li><b>G liên kết với X (C)</b> bằng 3 liên kết hidro.</li></ul>',
      'Nhờ nguyên tắc này, biết trình tự một mạch ⇒ suy ra mạch kia; đây cũng là cơ sở của nhân đôi ADN.',
    ], ['Sai — A không liên kết với A; A bắt cặp với T.', 'Sai — ADN tuân theo nguyên tắc bổ sung chặt chẽ.', 'Đúng — A liên kết với T (2 liên kết H), G liên kết với X (3 liên kết H).', 'Sai — A không cặp với G; cặp đúng là A-T và G-X.']),
    Q('Chức năng của ADN?', ['Tạo protein trực tiếp', 'Tạo năng lượng', 'Lưu trữ, bảo quản và truyền đạt thông tin di truyền', 'Tạo lipit'], 2, 'ADN là vật chất di truyền, mã hoá thông tin tạo protein.', [
      'ADN là <b>vật chất di truyền</b>, có chức năng <b>lưu trữ, bảo quản và truyền đạt thông tin di truyền</b> qua các thế hệ tế bào và cơ thể.',
      'Thông tin trên ADN quy định trình tự axit amin của protein, nhưng ADN <i>không trực tiếp</i> tạo protein — phải qua phiên mã (ARN) rồi dịch mã.',
      'Việc tạo năng lượng (ATP) hay tạo lipit là của các quá trình chuyển hoá khác.',
    ], ['Sai — ADN không tạo protein trực tiếp; phải qua phiên mã và dịch mã.', 'Sai — tạo năng lượng là chức năng của ATP/chuyển hoá, không phải ADN.', 'Đúng — ADN lưu trữ, bảo quản và truyền đạt thông tin di truyền.', 'Sai — ADN không tạo lipit.']),
    Q('Đơn phân (monome) của ADN là?', ['Axit amin', 'Đường glucozơ', 'Axit béo', 'Nucleotit'], 3, 'Đơn phân ADN = nucleotit, gồm 3 thành phần: đường deoxiribozơ + bazơ + photphat.', [
      'ADN là một polime, có đơn phân (monome) là <b>nucleotit</b>.',
      'Mỗi nucleotit gồm ba thành phần: <code>đường deoxiribozơ + bazơ nitơ (A/T/G/X) + nhóm photphat</code>.',
      'Phân biệt đơn phân các đại phân tử: axit amin (protein), glucozơ (gluxit), nucleotit (axit nucleic).',
    ], ['Sai — axit amin là đơn phân của protein, không phải ADN.', 'Sai — glucozơ là đơn phân của polisaccarit, không phải ADN.', 'Sai — axit béo cấu tạo chất béo, không phải ADN.', 'Đúng — đơn phân của ADN là nucleotit (đường deoxiribozơ + bazơ + photphat).']),
  ]),

  M(31, 'Gen và protein — Cơ chế di truyền', [
    Q('Gen là?', ['Một đoạn của ADN mang thông tin quy định 1 tính trạng/cấu trúc protein', 'Một protein', 'Một nhiễm sắc thể', 'Một tế bào'], 0, 'Gen = đoạn ADN có chức năng cụ thể (mã hoá 1 polypeptit).', [
      '<b>Gen</b> là một <i>đoạn của phân tử ADN</i> mang thông tin quy định một tính trạng (thường là cấu trúc của một loại protein/polipeptit).',
      'Một phân tử ADN chứa <b>rất nhiều gen</b>; thông tin trong gen được mã hoá bằng trình tự các nucleotit.',
      'Phân biệt: gen (đoạn ADN) ≠ protein (sản phẩm của gen) ≠ NST (cấu trúc chứa nhiều gen).',
    ], ['Đúng — gen là một đoạn ADN mang thông tin quy định 1 tính trạng/cấu trúc protein.', 'Sai — protein là sản phẩm của gen, không phải bản thân gen.', 'Sai — nhiễm sắc thể chứa nhiều gen; gen chỉ là đoạn ADN.', 'Sai — tế bào là đơn vị sống, không phải gen.']),
    Q('Quá trình tạo protein gồm?', ['Chỉ dịch mã', 'Trao đổi chất', 'Phiên mã (ADN→ARN) + Dịch mã (ARN→protein)', 'Chỉ phiên mã'], 2, '2 giai đoạn: phiên mã trong nhân, dịch mã trên ribosome.', [
      'Thông tin từ gen được biểu hiện thành protein qua <b>hai giai đoạn</b>:',
      '<ul><li><b>Phiên mã</b>: tổng hợp mARN dựa trên mạch khuôn ADN (trong nhân).</li><li><b>Dịch mã</b>: ribosome đọc mARN để tổng hợp chuỗi axit amin (protein).</li></ul>',
      'Sơ đồ tổng quát: <code>ADN → ARN → Protein</code> (luận điểm trung tâm của sinh học phân tử).',
    ], ['Sai — thiếu giai đoạn phiên mã trước đó.', 'Sai — trao đổi chất là khái niệm rộng, không mô tả cơ chế tạo protein.', 'Đúng — gồm phiên mã (ADN→ARN) trong nhân và dịch mã (ARN→protein) trên ribosome.', 'Sai — thiếu giai đoạn dịch mã tạo protein.']),
    Q('mARN có vai trò?', ['Tạo chất béo', 'Tạo ATP', 'Lưu trữ thông tin', 'Mang thông tin từ ADN ra ribosome để tổng hợp protein'], 3, 'mARN (messenger RNA) = bản sao của gen, truyền tin đến ribosome.', [
      '<b>mARN (ARN thông tin)</b> là bản sao của gen, được tạo ra qua quá trình phiên mã.',
      'Vai trò: <b>mang thông tin di truyền từ ADN (trong nhân) ra ribosome</b> (trong tế bào chất) để làm khuôn tổng hợp protein.',
      'Lưu trữ thông tin gốc là việc của ADN; tạo ATP là của ti thể — không phải vai trò của mARN.',
    ], ['Sai — mARN không tạo chất béo.', 'Sai — tạo ATP là chức năng của ti thể/chuyển hoá, không phải mARN.', 'Sai — lưu trữ thông tin là chức năng của ADN; mARN truyền tin.', 'Đúng — mARN mang thông tin từ ADN ra ribosome để tổng hợp protein.']),
    Q('Bộ ba mã hoá (codon) gồm?', ['1 nucleotit', '4 nucleotit', '3 nucleotit liên tiếp mã hoá 1 axit amin', '5 nucleotit'], 2, 'Codon = 3 nucleotit; 64 codon mã hoá 20 axit amin + tín hiệu start/stop.', [
      '<b>Mã di truyền</b> là mã bộ ba: cứ <b>3 nucleotit liên tiếp</b> (một bộ ba, codon) mã hoá cho <i>một axit amin</i>.',
      'Có <code>4³ = 64 bộ ba</code>, mã hoá cho 20 axit amin và các tín hiệu mở đầu/kết thúc.',
      'Vì mỗi codon gồm 3 nucleotit nên không thể là 1, 4 hay 5 nucleotit.',
    ], ['Sai — 1 nucleotit không đủ; codon gồm 3 nucleotit.', 'Sai — codon gồm 3 nucleotit, không phải 4.', 'Đúng — codon gồm 3 nucleotit liên tiếp mã hoá 1 axit amin.', 'Sai — codon gồm 3 nucleotit, không phải 5.']),
    Q('Đột biến gen là?', ['Mất nhiễm sắc thể', 'Phân bào sai', 'Biến đổi trong cấu trúc của gen (do thay đổi 1 hoặc 1 vài cặp nucleotit)', 'Tăng số nhiễm sắc thể'], 2, 'Đột biến gen: thay đổi cấu trúc 1 gen ở mức nucleotit.', [
      '<b>Đột biến gen</b> là những biến đổi trong <i>cấu trúc của gen</i>, liên quan tới <b>một hoặc một vài cặp nucleotit</b>.',
      'Các dạng: <i>mất, thêm, thay thế</i> một cặp nucleotit ⇒ có thể làm thay đổi protein và tính trạng.',
      'Phân biệt với <b>đột biến nhiễm sắc thể</b> (mất/thêm/đảo đoạn NST, thay đổi số lượng NST) — ở cấp độ lớn hơn.',
    ], ['Sai — mất NST là đột biến nhiễm sắc thể, không phải đột biến gen.', 'Sai — phân bào sai dẫn đến đột biến NST, không phải đột biến gen.', 'Đúng — đột biến gen là biến đổi cấu trúc gen do thay đổi 1 hoặc vài cặp nucleotit.', 'Sai — tăng số NST là đột biến số lượng NST, không phải đột biến gen.']),
    Q('Ý nghĩa của đột biến?', ['Chỉ làm biến đổi kiểu hình tạm thời', 'Luôn có hại', 'Cung cấp nguyên liệu cho tiến hoá và chọn giống', 'Chỉ xảy ra ở vi khuẩn'], 2, 'Đột biến là nguồn biến dị di truyền cho tiến hoá và chọn giống.', [
      'Đột biến tạo ra các <b>biến dị di truyền</b> (di truyền được cho đời sau), nên có ý nghĩa quan trọng:',
      '<ul><li>Cung cấp <b>nguyên liệu cho quá trình tiến hoá</b> (chọn lọc tự nhiên).</li><li>Cung cấp nguyên liệu cho <b>chọn giống</b> cây trồng, vật nuôi, vi sinh vật.</li></ul>',
      'Đột biến có thể <i>có hại, có lợi hoặc trung tính</i> — không phải luôn có hại.',
    ], ['Sai — đột biến gen di truyền được, không chỉ tạm thời.', 'Sai — đột biến có thể có hại, có lợi hoặc trung tính, không luôn có hại.', 'Đúng — đột biến cung cấp nguyên liệu (biến dị di truyền) cho tiến hoá và chọn giống.', 'Sai — đột biến xảy ra ở mọi sinh vật, không chỉ vi khuẩn.']),
  ]),

  M(32, 'Nhiễm sắc thể — Cơ chế phân bào', [
    Q('Nhiễm sắc thể (NST) là?', ['Cấu trúc nằm trong nhân tế bào, mang ADN, có thể quan sát ở phân bào', 'Lipit cấu tạo nên màng tế bào', 'Protein', 'Bào quan'], 0, 'NST = ADN + protein histone, quan sát rõ ở kỳ giữa phân bào.', [
      '<b>Nhiễm sắc thể (NST)</b> là cấu trúc nằm trong <i>nhân tế bào</i>, được cấu tạo từ <b>ADN và protein histone</b>.',
      'NST <b>quan sát rõ nhất ở kì giữa</b> của quá trình phân bào, khi chúng co xoắn cực đại.',
      'NST là nơi chứa các gen, đóng vai trò mang và truyền thông tin di truyền.',
    ], ['Đúng — NST là cấu trúc trong nhân tế bào, mang ADN, quan sát rõ khi phân bào.', 'Sai — lipit cấu tạo màng tế bào, không phải NST.', 'Sai — NST gồm ADN và protein histone, không chỉ là protein.', 'Sai — NST nằm trong nhân, không phải bào quan trong tế bào chất.']),
    Q('Bộ NST 2n ở người?', ['48', '46 (23 cặp)', '44', '23'], 1, 'Người: 46 NST = 22 cặp NST thường + 1 cặp NST giới tính (XX hoặc XY).', [
      'Mỗi loài có bộ NST đặc trưng. Ở <b>người</b>, bộ NST lưỡng bội <code>2n = 46</code>.',
      '46 NST gồm <b>23 cặp</b>: 22 cặp NST thường + 1 cặp NST giới tính (XX ở nữ, XY ở nam).',
      'Phân biệt: 2n = 46 là bộ lưỡng bội (tế bào sinh dưỡng); n = 23 là bộ đơn bội (trong giao tử). 48 là bộ NST của tinh tinh.',
    ], ['Sai — 48 là bộ NST của tinh tinh, không phải người.', 'Đúng — người có 46 NST = 23 cặp (22 cặp thường + 1 cặp giới tính).', 'Sai — 44 chỉ là số NST thường, thiếu cặp giới tính.', 'Sai — 23 là bộ NST đơn bội n trong giao tử, không phải 2n.']),
    Q('NST giới tính ở người nam và nữ?', ['Cả hai XX', 'Cả hai XY', 'Nam: XX, Nữ: XY', 'Nam: XY, Nữ: XX'], 3, 'Nữ: XX (đồng giao tử), Nam: XY (dị giao tử).', [
      'Cặp NST giới tính quyết định giới tính ở người:',
      '<ul><li><b>Nữ: XX</b> (đồng giao tử — chỉ cho một loại giao tử mang X).</li><li><b>Nam: XY</b> (dị giao tử — cho hai loại giao tử mang X hoặc Y).</li></ul>',
      'Vì vậy <i>giới tính của con do tinh trùng (bố) quyết định</i>: tinh trùng X → con gái, tinh trùng Y → con trai.',
    ], ['Sai — chỉ nữ là XX; nam là XY.', 'Sai — chỉ nam là XY; nữ là XX.', 'Sai — ngược: nam là XY, nữ là XX.', 'Đúng — nam: XY (dị giao tử), nữ: XX (đồng giao tử).']),
    Q('Nguyên phân (mitosis) là?', ['Phân chia ngẫu nhiên', 'Tạo n NST', 'Tạo giao tử', 'Phân bào tạo 2 tế bào con giống tế bào mẹ (cùng 2n)'], 3, 'Nguyên phân duy trì bộ NST 2n ổn định qua thế hệ tế bào.', [
      '<b>Nguyên phân</b> là hình thức phân bào tạo ra <b>2 tế bào con</b> có bộ NST <i>giống hệt tế bào mẹ</i> (cùng 2n).',
      'Nhờ NST nhân đôi rồi phân chia đều, nguyên phân giúp <b>duy trì ổn định bộ NST 2n</b> qua các thế hệ tế bào.',
      'Đây là cơ chế giúp cơ thể lớn lên, thay thế tế bào già và sinh sản vô tính.',
    ], ['Sai — nguyên phân diễn ra theo cơ chế chính xác, không ngẫu nhiên.', 'Sai — tạo NST đơn bội n là giảm phân, không phải nguyên phân.', 'Sai — tạo giao tử là giảm phân; nguyên phân tạo tế bào sinh dưỡng.', 'Đúng — nguyên phân tạo 2 tế bào con giống tế bào mẹ (cùng 2n).']),
    Q('Giảm phân (meiosis) là?', ['Phân chia ngẫu nhiên', 'Phân bào tạo giao tử với bộ NST n (đơn bội)', 'Tạo 2n', 'Tạo tế bào sinh dưỡng'], 1, 'Giảm phân giảm bộ NST từ 2n xuống n trong giao tử ⇒ thụ tinh phục hồi 2n.', [
      '<b>Giảm phân</b> là hình thức phân bào xảy ra ở tế bào sinh dục, tạo ra các <b>giao tử</b> mang bộ NST <b>đơn bội n</b>.',
      'Qua giảm phân, bộ NST <i>giảm đi một nửa</i> (từ 2n xuống n). Khi thụ tinh, hai giao tử (n + n) kết hợp phục hồi bộ 2n.',
      'Nhờ vậy bộ NST của loài được duy trì ổn định qua các thế hệ cơ thể.',
    ], ['Sai — giảm phân diễn ra theo cơ chế xác định, không ngẫu nhiên.', 'Đúng — giảm phân tạo giao tử với bộ NST n (đơn bội), giảm từ 2n.', 'Sai — tạo tế bào 2n là nguyên phân, không phải giảm phân.', 'Sai — tế bào sinh dưỡng do nguyên phân tạo ra; giảm phân tạo giao tử.']),
    Q('Ý nghĩa của giảm phân?', ['Giảm tốc độ sinh sản', 'Tăng số NST', 'Duy trì ổn định bộ NST của loài qua các thế hệ + tạo biến dị tổ hợp', 'Chỉ tạo tế bào nhỏ'], 2, 'Giảm phân + thụ tinh = cơ chế duy trì 2n + tạo đa dạng di truyền.', [
      'Giảm phân kết hợp với thụ tinh có hai ý nghĩa quan trọng:',
      '<ul><li><b>Duy trì ổn định bộ NST 2n</b> của loài qua các thế hệ (giảm phân tạo n, thụ tinh phục hồi 2n).</li><li>Sự phân li và tổ hợp ngẫu nhiên của NST tạo nên <b>biến dị tổ hợp</b> ⇒ đa dạng di truyền.</li></ul>',
      'Biến dị tổ hợp là nguồn nguyên liệu cho tiến hoá và chọn giống.',
    ], ['Sai — giảm phân không nhằm giảm tốc độ sinh sản.', 'Sai — giảm phân giảm số NST (xuống n), không tăng.', 'Đúng — giảm phân + thụ tinh duy trì ổn định bộ NST 2n của loài và tạo biến dị tổ hợp.', 'Sai — ý nghĩa giảm phân không phải tạo tế bào nhỏ.']),
  ]),

  M(33, 'Ứng dụng di truyền học — Chọn giống', [
    Q('Ứng dụng quan trọng của di truyền học?', ['Y học, chọn giống cây trồng/vật nuôi, công nghệ sinh học, pháp y', 'Chỉ giải trí', 'Chỉ trong sách', 'Chỉ áp dụng được ở vi sinh vật'], 0, 'Di truyền học có ứng dụng rộng: y học (xét nghiệm gen), nông nghiệp, pháp y…', [
      'Di truyền học là ngành khoa học có ứng dụng thực tiễn rất rộng:',
      '<ul><li><b>Y học</b>: chẩn đoán, tư vấn bệnh di truyền, xét nghiệm gen.</li><li><b>Nông nghiệp</b>: chọn và tạo giống cây trồng, vật nuôi năng suất cao.</li><li><b>Công nghệ sinh học, pháp y</b>: sản xuất thuốc, xác định danh tính.</li></ul>',
    ], ['Đúng — di truyền học ứng dụng trong y học, chọn giống, công nghệ sinh học, pháp y.', 'Sai — di truyền học có ứng dụng thực tiễn lớn, không chỉ giải trí.', 'Sai — di truyền học ứng dụng rộng rãi thực tế, không chỉ trong sách.', 'Sai — di truyền học áp dụng cho mọi sinh vật, không chỉ vi sinh vật.']),
    Q('Lai giống là?', ['Phương pháp cho 2 dòng thuần khác nhau giao phối/giao phấn để tạo con lai có nhiều ưu thế', 'Chăn nuôi', 'Trồng vô tính', 'Trồng cây'], 0, 'Lai giống = phép lai 2 dòng thuần ⇒ ưu thế lai ở F₁.', [
      '<b>Lai giống</b> là phương pháp cho hai dòng (giống) thuần chủng khác nhau <i>giao phối hoặc giao phấn</i> với nhau để tạo con lai.',
      'Con lai (đặc biệt F₁) thường mang <b>nhiều đặc điểm tốt</b> của cả hai bố mẹ, có thể có ưu thế lai.',
      'Phân biệt: lai giống tạo con lai từ hai dòng khác nhau (khác với nhân giống vô tính như giâm, chiết).',
    ], ['Đúng — lai giống là cho 2 dòng thuần khác nhau giao phối/giao phấn tạo con lai ưu thế.', 'Sai — chăn nuôi là hoạt động nuôi dưỡng, không phải định nghĩa lai giống.', 'Sai — trồng vô tính (giâm, chiết) không tạo con lai từ 2 dòng.', 'Sai — trồng cây nói chung không phải lai giống.']),
    Q('Ưu thế lai (heterosis) là?', ['Con lai kém hơn', 'Bằng bố mẹ', 'Không di truyền sang đời sau', 'Con lai F₁ vượt trội cả 2 bố mẹ về một số chỉ tiêu'], 3, 'F₁ thường cao to khỏe, năng suất cao hơn cả bố mẹ.', [
      '<b>Ưu thế lai</b> là hiện tượng con lai <b>F₁ vượt trội</b> hơn cả hai dạng bố mẹ về sức sống, sinh trưởng, năng suất.',
      'Ví dụ: ngô lai, lợn lai thường to khoẻ, năng suất cao hơn các giống thuần ban đầu.',
      'Lưu ý: ưu thế lai <i>cao nhất ở F₁ rồi giảm dần</i> ở các đời sau, nên người ta thường chỉ dùng F₁.',
    ], ['Sai — ưu thế lai là con lai vượt trội, không kém hơn bố mẹ.', 'Sai — ưu thế lai thể hiện con lai vượt trội, không chỉ bằng bố mẹ.', 'Sai — ưu thế lai cao nhất ở F₁ rồi giảm dần; mệnh đề này không phải định nghĩa.', 'Đúng — ưu thế lai là con lai F₁ vượt trội cả 2 bố mẹ về một số chỉ tiêu.']),
    Q('Công nghệ ADN tái tổ hợp dùng để?', ['Chỉ giải trí', 'Không ứng dụng', 'Phá hoại tự nhiên', 'Tạo sinh vật biến đổi gen (GMO), insulin, vaccine'], 3, 'CN gen sản xuất insulin từ vi khuẩn E.coli, lúa vàng giàu vitamin A…', [
      '<b>Công nghệ ADN tái tổ hợp (công nghệ gen)</b> là kỹ thuật ghép gen từ loài này sang loài khác để tạo sản phẩm mong muốn.',
      'Ứng dụng nổi bật: <ul><li>Tạo <b>sinh vật biến đổi gen (GMO)</b> năng suất cao, kháng sâu bệnh.</li><li>Sản xuất <b>insulin</b> (từ vi khuẩn E.coli), <b>vaccine</b>, hormone.</li></ul>',
      'Đây là thành tựu lớn của sinh học hiện đại, phục vụ y học và nông nghiệp.',
    ], ['Sai — công nghệ ADN tái tổ hợp có ứng dụng nghiêm túc, không phải giải trí.', 'Sai — công nghệ này có nhiều ứng dụng thực tiễn quan trọng.', 'Sai — mục đích là tạo sản phẩm có lợi, không phải phá hoại tự nhiên.', 'Đúng — tạo GMO, sản xuất insulin (từ E.coli), vaccine.']),
    Q('Xét nghiệm ADN trong pháp y dùng để?', ['Đoán tương lai', 'Đoán bệnh tật', 'Xác định danh tính (hung thủ, cha con, hài cốt)', 'Đoán tính cách'], 2, 'Pháp y dùng STR/DNA fingerprinting để xác định cá thể.', [
      'Mỗi người (trừ sinh đôi cùng trứng) có trình tự ADN <b>riêng biệt</b>, như một "dấu vân tay di truyền".',
      'Trong <b>pháp y</b>, xét nghiệm ADN dùng để <b>xác định danh tính</b>: tìm hung thủ qua mẫu sinh học, xác định quan hệ huyết thống (cha – con), nhận dạng hài cốt.',
      'ADN không dùng để "đoán tương lai" hay "đoán tính cách".',
    ], ['Sai — ADN không dùng để đoán tương lai.', 'Sai — đoán bệnh là xét nghiệm gen y học, không phải mục đích pháp y.', 'Đúng — pháp y dùng ADN để xác định danh tính (hung thủ, quan hệ cha con, hài cốt).', 'Sai — ADN không dùng để đoán tính cách trong pháp y.']),
    Q('Bệnh di truyền là?', ['Bệnh do môi trường', 'Bệnh do gen hoặc NST bị bất thường, di truyền từ bố mẹ sang con', 'Bệnh do dinh dưỡng', 'Bệnh nhiễm trùng'], 1, 'Vd: hồng cầu hình liềm, máu khó đông, Down (NST 21)…', [
      '<b>Bệnh di truyền</b> là bệnh do <i>gen hoặc nhiễm sắc thể bị bất thường</i>, có thể truyền từ bố mẹ sang con.',
      'Ví dụ: <b>bệnh máu khó đông, hồng cầu hình liềm</b> (do đột biến gen); <b>hội chứng Down</b> (thừa một NST số 21).',
      'Phân biệt với bệnh do môi trường, dinh dưỡng hay nhiễm trùng (do vi sinh vật) — những bệnh này không di truyền qua gen.',
    ], ['Sai — bệnh do môi trường không di truyền qua gen.', 'Đúng — bệnh di truyền do gen/NST bất thường, truyền từ bố mẹ sang con (vd: máu khó đông, Down).', 'Sai — bệnh do thiếu dinh dưỡng không phải bệnh di truyền.', 'Sai — bệnh nhiễm trùng do vi sinh vật, không di truyền.']),
  ]),

  M(34, 'Ôn tập học kỳ II — Phần I', [
    Q('Hợp chất nào là hợp chất hữu cơ?', ['CO₂ (oxit của cacbon, vô cơ)', 'NaHCO₃', 'CH₄', 'CaCO₃ (muối cacbonat, vô cơ)'], 2, 'CH₄ là hữu cơ; CO₂, NaHCO₃, CaCO₃ là hợp chất vô cơ chứa C (ngoại lệ).', [
      'Ôn lại định nghĩa: <b>hợp chất hữu cơ là hợp chất của cacbon</b>, trừ một số ngoại lệ.',
      'Các ngoại lệ <i>chứa C nhưng vẫn là vô cơ</i>: <code>CO, CO₂, H₂CO₃, muối cacbonat (CaCO₃, NaHCO₃)</code>.',
      'Vậy trong đáp án, chỉ <b>CH₄ (metan)</b> là hợp chất hữu cơ.',
    ], ['Sai — CO₂ là oxit của cacbon, xếp vào vô cơ.', 'Sai — NaHCO₃ là muối hiđrocacbonat, hợp chất vô cơ.', 'Đúng — CH₄ (metan) là hợp chất hữu cơ.', 'Sai — CaCO₃ là muối cacbonat, hợp chất vô cơ.']),
    Q('Etilen có liên kết?', ['Ba C≡C', 'Vòng 6 cạnh giống benzen', 'Đơn C-C', 'Đôi C=C'], 3, 'Etilen C₂H₄ có 1 liên kết đôi C=C đặc trưng.', [
      'Ôn lại đặc điểm cấu tạo của etilen <code>C₂H₄</code>: có <b>một liên kết đôi C=C</b> (<code>CH₂=CH₂</code>).',
      'Liên kết đôi này làm etilen dễ tham gia <i>phản ứng cộng</i> và <i>trùng hợp</i>.',
      'Phân biệt với: liên kết ba C≡C (axetilen), liên kết đơn C–C (etan), vòng thơm (benzen).',
    ], ['Sai — liên kết ba C≡C là của axetilen, không phải etilen.', 'Sai — vòng 6 cạnh là của benzen, không phải etilen.', 'Sai — chỉ liên kết đơn là etan, không phải etilen.', 'Đúng — etilen C₂H₄ có 1 liên kết đôi C=C đặc trưng.']),
    Q('Phản ứng đặc trưng nhận biết liên kết đôi?', ['Làm mất màu nước brom', 'Tạo H₂', 'Tạo CO₂', 'Tạo H₂O'], 0, 'Cộng Br₂ làm mất màu nước brom vàng nâu.', [
      'Để <b>nhận biết liên kết đôi C=C</b> (etilen, anken), dùng <b>nước brom</b>.',
      'Hợp chất có liên kết đôi <i>cộng brom</i>, làm nước brom (màu vàng nâu) <b>bị mất màu</b>: <code>C₂H₄ + Br₂ → C₂H₄Br₂</code>.',
      'Đây là dấu hiệu phân biệt hidrocacbon không no (etilen) với hidrocacbon no (metan, không làm mất màu).',
    ], ['Đúng — cộng Br₂ làm mất màu nước brom vàng nâu, nhận biết liên kết đôi.', 'Sai — tạo H₂ là phản ứng rượu/axit với Na, không nhận biết liên kết đôi.', 'Sai — tạo CO₂ là phản ứng cháy, không đặc trưng nhận biết liên kết đôi.', 'Sai — tạo H₂O không phải dấu hiệu đặc trưng của liên kết đôi.']),
    Q('Rượu etylic + Na → ?', ['C₂H₅OH·Na', 'C₂H₅ONa + H₂', 'CH₃COOH', 'Không phản ứng'], 1, 'Phản ứng nhận biết nhóm -OH: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂.', [
      'Ôn lại phản ứng đặc trưng của rượu etylic với natri (do nhóm <b>–OH</b>):',
      '<code>2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑</code> (natri etylat + khí hiđro).',
      'Phản ứng dùng <i>nhận biết nhóm –OH</i>; sản phẩm muối là C₂H₅ONa (không phải phức C₂H₅OH·Na).',
    ], ['Sai — không tạo phức C₂H₅OH·Na; tạo natri etylat và H₂.', 'Đúng — 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂ (nhận biết nhóm -OH).', 'Sai — CH₃COOH là axit axetic, không phải sản phẩm.', 'Sai — rượu phản ứng với Na ở nhóm -OH giải phóng H₂.']),
    Q('Glucozơ có công thức?', ['C₂H₅OH', 'C₁₂H₂₂O₁₁', 'C₆H₁₂O₆', '(C₆H₁₀O₅)ₙ'], 2, 'Glucozơ — monosaccarit, M = 180.', [
      'Ôn lại công thức các gluxit quan trọng:',
      '<ul><li><b>Glucozơ</b>: <code>C₆H₁₂O₆</code> (monosaccarit, M = 180).</li><li><b>Saccarozơ</b>: C₁₂H₂₂O₁₁ (disaccarit).</li><li><b>Tinh bột, xenlulozơ</b>: (C₆H₁₀O₅)ₙ (polisaccarit).</li></ul>',
      'C₂H₅OH là rượu etylic, không phải gluxit.',
    ], ['Sai — C₂H₅OH là rượu etylic, không phải glucozơ.', 'Sai — C₁₂H₂₂O₁₁ là saccarozơ, không phải glucozơ.', 'Đúng — glucozơ = C₆H₁₂O₆ (monosaccarit, M = 180).', 'Sai — (C₆H₁₀O₅)ₙ là tinh bột/xenlulozơ, không phải glucozơ.']),
    Q('ADN có cấu trúc?', ['Hình sợi đơn', 'Mạch đơn', 'Hình cầu', 'Chuỗi xoắn kép'], 3, 'Cấu trúc xoắn kép Watson-Crick.', [
      'Ôn lại cấu trúc ADN theo mô hình Watson – Crick (1953): ADN là <b>chuỗi xoắn kép</b>.',
      'Gồm <i>hai mạch đơn</i> liên kết theo nguyên tắc bổ sung (A–T, G–X) và xoắn đều quanh một trục.',
      'Khác với ARN chỉ có một mạch đơn.',
    ], ['Sai — ADN có 2 mạch, không phải sợi đơn.', 'Sai — ADN là mạch kép, không phải mạch đơn (khác ARN).', 'Sai — ADN có dạng xoắn kép, không phải hình cầu.', 'Đúng — ADN có cấu trúc chuỗi xoắn kép (Watson-Crick).']),
  ]),

  M(35, 'Ôn tập học kỳ II — Phần II + Đề thi vào 10', [
    Q('Định luật Ôm: I = ?', ['U/R', 'U + R (cộng thay vì chia)', 'U·R (nhân thay vì chia)', 'R/U (đảo tử số và mẫu số)'], 0, 'I = U/R (định luật Ôm cơ bản).', [
      'Ôn tập định luật Ôm — kiến thức nền tảng phần điện học: <code>I = U / R</code>.',
      'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở.',
      'Các biến đổi cần nhớ: <code>U = I·R</code>, <code>R = U / I</code>. Tránh lỗi đảo tử mẫu hay nhân/cộng sai.',
    ], ['Đúng — I = U/R (định luật Ôm).', 'Sai — phép cộng sai; định luật Ôm là phép chia U/R.', 'Sai — I tỉ lệ nghịch với R nên là U/R, không phải U·R.', 'Sai — đảo tử mẫu; đúng là U/R chứ không phải R/U.']),
    Q('Thấu kính hội tụ cho vật trong tiêu cự (d < f) tạo ảnh?', ['Bằng vật', 'Ảo, cùng chiều, lớn hơn vật', 'Ảo, ngược chiều', 'Thật, lớn hơn'], 1, 'Nguyên lý kính lúp: d < f ⇒ ảnh ảo lớn hơn.', [
      'Ôn lại: với thấu kính hội tụ, khi <b>vật đặt trong tiêu cự (d &lt; f)</b> thì ảnh là <b>ảnh ảo, cùng chiều, lớn hơn vật</b>.',
      'Đây chính là nguyên lý hoạt động của <i>kính lúp</i> dùng quan sát vật nhỏ.',
      'Nhớ quy tắc: ảnh ảo qua thấu kính hội tụ luôn cùng chiều và lớn hơn vật; ảnh thật thì ngược chiều.',
    ], ['Sai — ảnh lớn hơn vật khi d < f, không bằng vật.', 'Đúng — d < f ⇒ ảnh ảo, cùng chiều, lớn hơn vật (kính lúp).', 'Sai — ảnh ảo qua thấu kính hội tụ luôn cùng chiều, không ngược chiều.', 'Sai — d < f cho ảnh ảo, không phải ảnh thật.']),
    Q('Máy biến áp tăng U khi?', ['Bằng nhau', 'Số vòng cuộn thứ cấp > số vòng cuộn sơ cấp', 'Ngược lại', 'Không thay đổi'], 1, 'U₂/U₁ = N₂/N₁; muốn U₂ > U₁ thì N₂ > N₁.', [
      'Ôn lại công thức máy biến áp: <code>U₂/U₁ = N₂/N₁</code> (hiệu điện thế tỉ lệ thuận số vòng dây).',
      'Để máy <b>tăng áp</b> (U₂ &gt; U₁) thì cần <b>số vòng cuộn thứ cấp lớn hơn cuộn sơ cấp</b> (N₂ &gt; N₁).',
      'Ngược lại N₂ &lt; N₁ thì máy hạ áp; N₂ = N₁ thì U không đổi.',
    ], ['Sai — N₂ = N₁ thì U không đổi, không tăng.', 'Đúng — U₂/U₁ = N₂/N₁; muốn U₂ > U₁ thì N₂ > N₁ (thứ cấp nhiều vòng hơn).', 'Sai — N₂ < N₁ làm giảm U (máy hạ áp).', 'Sai — số vòng phải khác nhau thì U mới thay đổi.']),
    Q('Phản ứng nào xảy ra?', ['Cu + AgNO₃ → Cu(NO₃)₂ + Ag', 'Au + HNO₃ loãng → muối + NO', 'Cu + HCl → CuCl₂ + H₂', 'Ag + CuSO₄ → AgSO₄ + Cu'], 0, 'Cu trước Ag trong dãy hoạt động ⇒ Cu đẩy Ag khỏi muối.', [
      'Ôn lại <b>phản ứng đẩy kim loại</b>: kim loại đứng trước đẩy kim loại đứng sau ra khỏi dung dịch muối.',
      'Cu đứng <i>trước</i> Ag nên: <code>Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓</code> — phản ứng xảy ra.',
      'Các phương án còn lại đều không xảy ra: Au rất trơ; Cu đứng sau H (không tác dụng HCl); Ag đứng sau Cu (không đẩy được Cu).',
    ], ['Đúng — Cu đứng trước Ag nên đẩy Ag khỏi muối: Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag.', 'Sai — Au là kim loại quý, không phản ứng với HNO₃ loãng.', 'Sai — Cu đứng sau H nên không phản ứng với HCl.', 'Sai — Ag đứng sau Cu nên không đẩy được Cu khỏi muối.']),
    Q('Mendel nghiên cứu di truyền ở?', ['Chuột bạch (đối tượng của di truyền y học)', 'Đậu Hà Lan', 'Người (qua phả hệ gia đình)', 'Ruồi giấm'], 1, 'Mendel chọn đậu Hà Lan vì có nhiều cặp tính trạng tương phản rõ.', [
      'Ôn lại: Mendel — cha đẻ của di truyền học — nghiên cứu trên <b>cây đậu Hà Lan</b>.',
      'Đậu Hà Lan tự thụ phấn nghiêm ngặt, vòng đời ngắn, có nhiều <i>cặp tính trạng tương phản rõ rệt</i> ⇒ thuận lợi cho thí nghiệm lai.',
      'Phân biệt: ruồi giấm là đối tượng của Morgan, không phải Mendel.',
    ], ['Sai — chuột bạch không phải đối tượng của Mendel.', 'Đúng — Mendel nghiên cứu trên cây đậu Hà Lan với nhiều cặp tính trạng tương phản.', 'Sai — Mendel không nghiên cứu di truyền người qua phả hệ.', 'Sai — ruồi giấm là đối tượng của Morgan, không phải Mendel.']),
    Q('Để đạt điểm cao môn KHTN, cần?', ['Chỉ học Lý', 'Bỏ qua bài khó', 'Chỉ học thuộc', 'Học đầy đủ 3 phân môn (Lý-Hoá-Sinh), làm nhiều bài tập, hiểu bản chất'], 3, 'KHTN tích hợp 3 môn ⇒ cần ôn đều cả 3 lĩnh vực.', [
      'Môn KHTN tích hợp <b>ba phân môn: Vật lí – Hoá học – Sinh học</b>, nên cần ôn tập đầy đủ cả ba lĩnh vực.',
      'Phương pháp học hiệu quả, nhất là cho kì <b>thi vào lớp 10</b>:',
      '<ul><li>Học đều cả Lý, Hoá, Sinh — không học lệch.</li><li><b>Hiểu bản chất</b>, không học thuộc lòng máy móc.</li><li>Luyện <b>nhiều bài tập, đề thi</b> để rèn kỹ năng và tốc độ.</li></ul>',
    ], ['Sai — KHTN gồm cả Hoá và Sinh, không chỉ học Lý.', 'Sai — bỏ qua bài khó khiến mất điểm phần khó; cần luyện tập.', 'Sai — KHTN cần hiểu bản chất và vận dụng, không chỉ học thuộc.', 'Đúng — học đều 3 phân môn (Lý-Hoá-Sinh), làm nhiều bài tập, hiểu bản chất.']),
  ]),

  M(36, 'Kết thúc KHTN THCS — Khoa học là hành trình, không phải đích đến', [
    Q('Ba mạch kiến thức của KHTN 9 tương ứng với những nội dung nào?',
      ['Vật lí: điện - từ - ánh sáng - năng lượng · Hoá học: nguyên tố, phản ứng, chất hữu cơ · Sinh học: di truyền, tiến hoá, hệ sinh thái', 'Vật lí: quang hợp · Hoá học: di truyền · Sinh học: điện từ', 'Cả ba phân môn đều học chung một nội dung', 'Vật lí: hệ sinh thái · Hoá học: ánh sáng · Sinh học: nguyên tố'],
      0,
      'Vật lí là điện - từ - ánh sáng - năng lượng; Hoá học là nguyên tố, phản ứng, chất hữu cơ; Sinh học là di truyền, tiến hoá, hệ sinh thái.',
      ['KHTN 9 là năm cuối trước khi ba phân môn <b>tách hẳn</b> ở THPT, nên cần nắm rõ bản đồ của từng mạch.',
       '<ul><li><b>Vật lí</b> — <b>điện, từ, ánh sáng, năng lượng</b>: giải thích mọi thứ từ bóng đèn, động cơ đến viễn thông</li><li><b>Hoá học</b> — <b>nguyên tố, phản ứng, chất hữu cơ</b>: nền tảng của vật liệu, dược phẩm, thực phẩm</li><li><b>Sinh học</b> — <b>di truyền, tiến hoá, hệ sinh thái</b>: giải mã sự sống và mối quan hệ giữa các sinh vật</li></ul>',
       'Ba mạch này không rời nhau: chúng là <i>ba góc nhìn về cùng một thế giới</i>.'],
      ['Đúng — đúng bản đồ ba mạch của KHTN 9.',
       'Sai — các nội dung bị gán lẫn giữa ba phân môn.',
       'Sai — ba phân môn có nội dung riêng, dù liên hệ với nhau.',
       'Sai — ba nội dung bị đảo sang phân môn khác.']),
    Q('Quá trình quang hợp thể hiện sự kết nối của ba phân môn như thế nào?',
      ['Chỉ liên quan tới Sinh học', 'Ánh sáng cung cấp năng lượng (Vật lí) → phản ứng chuyển CO₂ và H₂O thành glucose, O₂ (Hoá học) → cây dùng glucose để sống (Sinh học)', 'Chỉ liên quan tới Hoá học', 'Không liên quan tới Vật lí vì cây không dùng điện'],
      1,
      'Quang hợp cần ánh sáng (Vật lí), là một phản ứng hoá học (Hoá), và phục vụ sự sống của cây (Sinh).',
      ['Quang hợp là ví dụ kinh điển cho việc <b>KHTN là một tổng thể</b>.',
       'Ba lớp giải thích xếp lên nhau:<ul><li><b>Vật lí</b> — <b>ánh sáng</b> cung cấp năng lượng đầu vào</li><li><b>Hoá học</b> — phản ứng chuyển <b>CO₂ + H₂O → glucose + O₂</b></li><li><b>Sinh học</b> — cây dùng glucose để <b>sống và sinh trưởng</b></li></ul>',
       'Một ví dụ khác cùng kiểu: trong y học, <b>thuốc</b> (Hoá học) tác động lên <b>tế bào</b> (Sinh học) thông qua các <b>tín hiệu điện và hoá học</b> (Vật lí + Hoá).'],
      ['Sai — quang hợp cần cả ánh sáng và phản ứng hoá học.',
       'Đúng — ba lớp giải thích Vật lí, Hoá học và Sinh học xếp lên nhau.',
       'Sai — thiếu vai trò của ánh sáng và của chính cây.',
       'Sai — ánh sáng là đối tượng của Vật lí, không chỉ điện.']),
    Q('Tổ hợp B00 gồm những môn nào và thường dẫn tới nhóm ngành nào?',
      ['Toán - Lí - Hoá, hướng kĩ thuật công nghệ', 'Toán - Lí - Anh, hướng IT và điện tử', 'Toán - Hoá - Sinh, hướng y dược, nông lâm, môi trường', 'Toán - Văn - Anh, hướng kinh tế'],
      2,
      'B00 là Toán - Hoá - Sinh, thường dẫn tới y dược, nông lâm và môi trường.',
      ['Từ lớp 10, Vật lí, Hoá học và Sinh học thành <b>ba môn độc lập</b> với nội dung sâu hơn nhiều — và em sẽ chọn <b>tổ hợp</b> để xét tuyển.',
       'Ba tổ hợp thường gặp với khối KHTN:<ul><li><b>A00</b> (Toán - Lí - Hoá) → ngành kĩ thuật, công nghệ, một phần y dược</li><li><b>B00</b> (<b>Toán - Hoá - Sinh</b>) → <b>y dược, nông lâm, môi trường</b></li><li><b>A01</b> (Toán - Lí - Anh) → IT, điện tử, kinh tế kĩ thuật</li></ul>',
       'Cách chọn: tự hỏi em thích <i>giải bài toán cơ học và điện</i> (Vật lí), thích <i>thí nghiệm và phân tử</i> (Hoá học), hay thích <i>cơ thể người, gen và môi trường</i> (Sinh học). <b>Đam mê thường dẫn tới thành công hơn là chọn theo xu hướng</b>.'],
      ['Sai — đó là tổ hợp A00.',
       'Sai — đó là tổ hợp A01.',
       'Đúng — B00 là Toán - Hoá - Sinh.',
       'Sai — đó là tổ hợp khối xã hội, không thuộc KHTN.']),
    Q('Lời khuyên nào ĐÚNG cho việc học KHTN ở THPT?',
      ['Học thuộc lòng toàn bộ công thức là đủ', 'Chỉ đọc lí thuyết, không cần làm bài tập', 'Học riêng từng môn, không cần liên hệ', 'Hiểu nguyên lí để suy ra công thức, luyện bài tập nhiều và kết nối kiến thức ba môn'],
      3,
      'Nên hiểu nguyên lí thay vì học thuộc, luyện bài tập nhiều và liên kết kiến thức giữa ba môn.',
      ['Bài học đưa ba lời khuyên rất cụ thể cho năm THPT đầu tiên.',
       '<ul><li><b>đừng học thuộc lòng công thức</b> — hiểu <b>nguyên lí</b> để suy ra công thức khi quên</li><li><b>luyện bài tập nhiều hơn đọc lí thuyết</b> — KHTN là môn <i>thực hành tư duy</i></li><li><b>kết nối kiến thức giữa ba môn</b> — bài thi tổng hợp ở đại học sẽ yêu cầu điều này</li></ul>',
       'Học thuộc công thức mà không hiểu nguyên lí là chiến lược <i>vỡ ngay khi đề đổi cách hỏi</i> — mà đề THPT và đại học thì luôn đổi cách hỏi.'],
      ['Sai — học thuộc mà không hiểu sẽ vỡ khi đề đổi cách hỏi.',
       'Sai — KHTN là môn thực hành tư duy, cần luyện bài tập.',
       'Sai — bài thi tổng hợp đòi hỏi liên hệ ba môn.',
       'Đúng — hiểu nguyên lí, luyện bài tập và kết nối ba môn.']),
    Q('Ví dụ nào cho thấy KHTN có mặt trong công nghệ hằng ngày?',
      ['Pin điện thoại là điện hoá học (Hoá); tiếng nhạc từ loa là sóng âm (Vật lí); kháng sinh trị bệnh là sinh học phân tử (Sinh)', 'Công nghệ hiện đại không liên quan gì tới KHTN', 'Chỉ máy móc công nghiệp mới dùng KHTN', 'KHTN chỉ dùng trong phòng thí nghiệm'],
      0,
      'Pin (Hoá), loa (Vật lí), kháng sinh (Sinh) — mọi công nghệ đều có KHTN bên trong.',
      ['Bài học chỉ ra rằng KHTN không nằm trong phòng thí nghiệm mà nằm <b>trong tay em mỗi ngày</b>.',
       '<ul><li><b>pin điện thoại</b> em sạc hằng ngày = <b>điện hoá học</b> (Hoá)</li><li><b>tiếng nhạc từ loa</b> = <b>sóng âm</b> (Vật lí)</li><li><b>kháng sinh</b> trị bệnh = ứng dụng <b>sinh học phân tử</b> (Sinh)</li></ul><b>Mọi công nghệ đều có KHTN ở bên trong.</b>',
       'Ứng dụng trong quyết định hằng ngày: hiểu điện học để đấu nối thiết bị an toàn; hiểu hoá học để <b>không trộn thuốc tẩy với giấm</b>; hiểu sinh học để <b>dùng kháng sinh đúng cách</b>.'],
      ['Đúng — pin, loa và kháng sinh đều là KHTN ứng dụng.',
       'Sai — mọi công nghệ đều dựa trên KHTN.',
       'Sai — KHTN có trong cả đồ dùng hằng ngày.',
       'Sai — KHTN hiện diện trong mọi quyết định hằng ngày.']),
    Q('Theo bài học, khoảnh khắc nào cho thấy em "đang làm khoa học"?',
      ['Khi học thuộc xong một chương', 'Khi thắc mắc "Tại sao thế này?"', 'Khi làm đúng hết một đề trắc nghiệm', 'Khi nhớ được nhiều công thức nhất lớp'],
      1,
      'Khoa học bắt đầu từ câu hỏi "tại sao" — đó là cách nhìn thế giới, không phải nội dung để học thuộc.',
      ['Bài học kết lại bằng một định nghĩa rất gọn: <b>khoa học không phải để học thuộc — khoa học là cách nhìn thế giới</b>.',
       '<i>"Mỗi khi thắc mắc <b>Tại sao thế này?</b>, đó là lúc em đang làm khoa học. Hãy giữ mãi sự tò mò đó."</i>',
       'Vì thế tiêu đề của tuần cuối là <b>"Khoa học là hành trình, không phải đích đến"</b>: học thuộc và làm đúng đề là <i>công cụ</i>, còn sự tò mò mới là <b>động cơ</b> đưa em đi xa.'],
      ['Sai — học thuộc là công cụ, không phải bản chất của khoa học.',
       'Đúng — câu hỏi "tại sao" chính là khởi đầu của khoa học.',
       'Sai — làm đúng đề là kết quả, không phải bản chất.',
       'Sai — nhớ nhiều công thức không đồng nghĩa với tư duy khoa học.']),
  ]),
];

export const S9KHTN_SCENARIOS = indexBy(S9KHTN_WEEKS);
