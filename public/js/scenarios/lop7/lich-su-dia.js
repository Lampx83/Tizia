// ============================================================
// Lớp 7 — Lịch sử và Địa lí (GDPT 2018, tích hợp)
// HK1 (T1–18): chủ yếu LỊCH SỬ thế giới trung đại + đầu trung đại VN
// HK2 (T19–35): chủ yếu ĐỊA LÍ các châu lục + tiếp nối LSVN trung đại
// 35 tuần · 5 câu/tuần · ID prefix: "S7LSDL-wNN-quiz".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('S7LSDL', 'lich-su-dia', n, title, qs, opts);

export const S7LSDL_WEEKS = [
  // ===== HK1 — LỊCH SỬ TRUNG ĐẠI =====
  M(1, 'Quá trình hình thành xã hội phong kiến Tây Âu', [
    Q('Đế quốc La Mã sụp đổ vào năm nào, mở đầu thời trung đại Tây Âu?', ['Năm 1492', 'Năm 476', 'Năm 1789', 'Năm 1000'], 1, 'Năm 476 đế quốc Tây La Mã sụp đổ — mốc mở đầu thời trung đại.',[
      "Đến cuối thế kỉ V, đế quốc <b>La Mã</b> suy yếu do khủng hoảng nội bộ và các cuộc xâm nhập của người <i>Giéc-man</i>. Năm <b>476</b>, đế quốc <b>Tây La Mã</b> sụp đổ.",
      "Mốc 476 được coi là điểm <i>mở đầu thời trung đại</i> ở Tây Âu, kết thúc thời cổ đại. <ul><li>Trên đất Tây La Mã cũ, người Giéc-man lập nhiều <b>vương quốc</b> mới.</li><li>Quan hệ sản xuất phong kiến dần hình thành thay cho chế độ chiếm hữu nô lệ.</li></ul>",
      "Cần phân biệt với các mốc khác: <code>1492</code> (Cô-lôm-bô tới châu Mỹ) đã thuộc thời cận đại; <code>1789</code> (Cách mạng tư sản Pháp) đánh dấu sự kết thúc của thời trung đại.",
    ],
     ['Sai — 1492 là năm Cô-lôm-bô tìm ra châu Mỹ, đã sang thời cận đại.', 'Đúng — năm 476 Tây La Mã sụp đổ, mở đầu trung đại Tây Âu.', 'Sai — 1789 là Cách mạng tư sản Pháp, kết thúc thời trung đại.', 'Sai — năm 1000 là giữa thời trung đại, không phải mốc mở đầu.']),
    Q('Hai giai cấp cơ bản trong xã hội phong kiến Tây Âu là?', ['Quý tộc và nô lệ', 'Tư sản và vô sản', 'Chủ nô và nô lệ', 'Lãnh chúa và nông nô'], 3, 'Phong kiến Tây Âu: lãnh chúa phong kiến và nông nô.',[
      "Xã hội phong kiến Tây Âu hình thành với hai giai cấp cơ bản: <b>lãnh chúa phong kiến</b> và <b>nông nô</b>.",
      "<ul><li><b>Lãnh chúa</b>: những quý tộc, tướng lĩnh người Giéc-man được chia ruộng đất, trở thành chủ đất giàu có và có quyền lực.</li><li><b>Nông nô</b>: từ nô lệ được giải phóng và nông dân tự do mất ruộng, phải nhận đất của lãnh chúa để cày cấy và nộp tô.</li></ul>",
      "Phân biệt: <i>chủ nô — nô lệ</i> là hai giai cấp của xã hội cổ đại; <i>tư sản — vô sản</i> là hai giai cấp của xã hội tư bản về sau.",
    ],
     ['Sai — nô lệ là giai cấp của xã hội chiếm hữu nô lệ cổ đại.', 'Sai — tư sản và vô sản là hai giai cấp của xã hội tư bản.', 'Sai — chủ nô và nô lệ thuộc xã hội cổ đại, không phải phong kiến.', 'Đúng — phong kiến Tây Âu có hai giai cấp lãnh chúa và nông nô.']),
    Q('Lãnh địa phong kiến là?', ['Vùng đất rộng lớn của lãnh chúa, kinh tế khép kín', 'Một bộ tộc du mục', 'Một thành phố', 'Một quốc gia'], 0, 'Lãnh địa là đơn vị chính trị — kinh tế cơ bản, tự cấp tự túc.',[
      "<b>Lãnh địa phong kiến</b> là vùng đất rộng lớn do lãnh chúa làm chủ, là đơn vị <i>chính trị và kinh tế</i> cơ bản của Tây Âu thời sơ kì trung đại.",
      "Đặc điểm: <ul><li>Kinh tế <b>tự cấp tự túc</b>, khép kín — mọi thứ cần dùng đều tự sản xuất trong lãnh địa.</li><li>Lãnh chúa có lâu đài, có quân đội riêng, nắm mọi quyền trong lãnh địa.</li></ul>",
      "Khác với <b>thành thị</b> (nơi cư trú của thợ thủ công, thương nhân làm kinh tế hàng hoá), lãnh địa là vùng đất nông nghiệp đóng kín.",
    ],
     ['Đúng — lãnh địa là đất riêng của lãnh chúa, kinh tế tự cấp tự túc.', 'Sai — lãnh địa gắn với ruộng đất, không phải bộ tộc du mục.', 'Sai — thành thị mới là nơi thợ thủ công, thương nhân; lãnh địa là đất nông nghiệp.', 'Sai — lãnh địa nhỏ hơn quốc gia, chỉ là một đơn vị thuộc vương quốc.']),
    Q('Nông nô khác nô lệ ở điểm nào?', ['Là chủ ruộng đất', 'Có gia đình, công cụ riêng nhưng bị lệ thuộc vào lãnh chúa', 'Bị mua bán như hàng hoá', 'Hoàn toàn tự do'], 1, 'Nông nô có gia đình, công cụ; phải nộp tô và bị gắn với ruộng đất.',[
      "<b>Nông nô</b> là lực lượng sản xuất chính trong lãnh địa, khác hẳn nô lệ thời cổ đại.",
      "<ul><li>Nông nô có <i>gia đình</i>, có <i>túp lều</i> và <i>công cụ</i> sản xuất riêng.</li><li>Họ được canh tác ruộng của lãnh chúa nhưng bị gắn chặt với ruộng đất, phải nộp <b>tô</b> và nhiều khoản phụ thu.</li></ul>",
      "Trái lại, <b>nô lệ</b> bị coi như \"công cụ biết nói\", có thể bị <code>mua bán</code> như hàng hoá. Đây là điểm phân biệt then chốt giữa nông nô và nô lệ.",
    ],
     ['Sai — ruộng đất thuộc lãnh chúa, nông nô chỉ canh tác và nộp tô.', 'Đúng — nông nô có gia đình, công cụ riêng nhưng lệ thuộc lãnh chúa.', 'Sai — bị mua bán như hàng hoá là đặc điểm của nô lệ, không phải nông nô.', 'Sai — nông nô bị gắn với ruộng đất, không hoàn toàn tự do.']),
    Q('Người Giéc-man đã đóng vai trò gì trong sự ra đời xã hội phong kiến Tây Âu?', ['Sáng lập Hồi giáo', 'Khôi phục đế quốc La Mã', 'Tiêu diệt đế quốc Tây La Mã, lập các vương quốc mới', 'Cai trị châu Á'], 2, 'Các bộ tộc Giéc-man tràn vào, tiêu diệt La Mã, lập nên các vương quốc phong kiến.',[
      "Từ thế kỉ III, các bộ tộc <b>Giéc-man</b> từ phương bắc tràn vào lãnh thổ đế quốc La Mã.",
      "Năm 476, người Giéc-man <b>tiêu diệt đế quốc Tây La Mã</b>. Trên vùng đất ấy, họ lập nên nhiều <i>vương quốc</i> mới như Phơ-răng, Tây Gốt, Đông Gốt...",
      "Quá trình này dẫn tới sự hình thành <b>quan hệ sản xuất phong kiến</b>: thủ lĩnh, quý tộc Giéc-man chiếm ruộng đất trở thành lãnh chúa, nông dân và nô lệ cũ trở thành nông nô.",
    ],
     ['Sai — Hồi giáo do Mô-ha-mét sáng lập ở bán đảo A-ráp, không liên quan Giéc-man.', 'Sai — người Giéc-man tiêu diệt chứ không khôi phục đế quốc La Mã.', 'Đúng — người Giéc-man diệt Tây La Mã, lập các vương quốc phong kiến mới.', 'Sai — người Giéc-man hoạt động ở châu Âu, không cai trị châu Á.']),
  ]),

  M(2, 'Lãnh địa phong kiến và quan hệ sản xuất phong kiến', [
    Q('Đặc điểm kinh tế của lãnh địa là?', ['Chỉ trồng cây công nghiệp xuất khẩu', 'Công nghiệp phát triển', 'Mở cửa buôn bán quốc tế', 'Tự cấp tự túc, đóng kín'], 3, 'Lãnh địa là nền kinh tế khép kín, tự cung tự cấp.',[
      "Kinh tế trong <b>lãnh địa phong kiến</b> mang tính <i>tự nhiên, tự cấp tự túc</i>.",
      "Mọi nhu cầu — lương thực, vải vóc, công cụ — đều được sản xuất ngay trong lãnh địa. <ul><li>Hầu như không có trao đổi, buôn bán với bên ngoài.</li><li>Sản xuất chủ yếu là <b>nông nghiệp</b> và thủ công nghiệp gia đình.</li></ul>",
      "Tính chất <code>đóng kín</code> này là đặc trưng cơ bản của nền kinh tế lãnh địa, khác hẳn nền kinh tế hàng hoá ở thành thị về sau.",
    ],
     ['Sai — lãnh địa tự sản xuất để dùng, không trồng cây xuất khẩu.', 'Sai — công nghiệp chưa có; lãnh địa chủ yếu là nông nghiệp thủ công.', 'Sai — lãnh địa đóng kín, không buôn bán quốc tế.', 'Đúng — kinh tế lãnh địa tự cấp tự túc, đóng kín.']),
    Q('Người đứng đầu lãnh địa gọi là?', ['Hoàng đế', 'Giáo hoàng', 'Lãnh chúa', 'Thủ lĩnh bộ lạc'], 2, 'Lãnh chúa có quyền tuyệt đối trong lãnh địa của mình.',[
      "<b>Lãnh chúa</b> là người đứng đầu lãnh địa, có quyền lực gần như tuyệt đối trong vùng đất của mình.",
      "<ul><li>Lãnh chúa có lâu đài kiên cố, quân đội, toà án và luật lệ riêng.</li><li>Trong lãnh địa, lãnh chúa như một \"ông vua con\".</li></ul>",
      "Phân biệt: <i>hoàng đế / vua</i> đứng đầu cả vương quốc; <i>Giáo hoàng</i> đứng đầu Giáo hội; còn lãnh chúa chỉ cai quản một lãnh địa.",
    ],
     ['Sai — hoàng đế đứng đầu cả vương quốc, không phải một lãnh địa.', 'Sai — giáo hoàng đứng đầu Giáo hội, không quản lãnh địa.', 'Đúng — lãnh chúa là người đứng đầu, có quyền tuyệt đối trong lãnh địa.', 'Sai — thủ lĩnh bộ lạc thuộc xã hội nguyên thuỷ, không phải phong kiến.']),
    Q('Tô thuế chủ yếu nông nô phải nộp là?', ['Tô bằng vàng bạc', 'Tô lao dịch và tô hiện vật', 'Tô tiền', 'Không phải nộp gì'], 1, 'Nông nô nộp tô lao dịch (làm không công) và tô hiện vật (sản phẩm).',[
      "Nông nô phải nộp cho lãnh chúa nhiều khoản, trong đó hai hình thức tô chính là:",
      "<ul><li><b>Tô lao dịch</b>: lao động không công trên phần ruộng riêng của lãnh chúa.</li><li><b>Tô hiện vật</b>: nộp một phần sản phẩm thu hoạch được (thóc, gia súc...).</li></ul>",
      "Ngoài ra nông nô còn phải chịu nhiều khoản phụ như thuế cưới xin, thuế thừa kế... Đời sống nông nô vì thế rất cực khổ. <i>Tô tiền</i> chỉ phổ biến muộn hơn, khi kinh tế hàng hoá phát triển.",
    ],
     ['Sai — nông nô không có vàng bạc; họ nộp bằng sức lao động và sản phẩm.', 'Đúng — nông nô nộp tô lao dịch (làm không công) và tô hiện vật.', 'Sai — tô tiền phổ biến muộn hơn; tô chủ yếu là lao dịch và hiện vật.', 'Sai — nông nô bị bóc lột nặng, phải nộp tô cho lãnh chúa.']),
    Q('Lãnh chúa sống chủ yếu dựa vào?', ['Bóc lột nông nô', 'Đi đánh cá', 'Tự cày cấy', 'Buôn bán'], 0, 'Lãnh chúa ăn chơi xa hoa, sống nhờ tô thuế từ nông nô.',[
      "<b>Lãnh chúa</b> không tham gia lao động sản xuất.",
      "Họ sống xa hoa, dành thời gian cho tiệc tùng, săn bắn, đấu võ... Toàn bộ đời sống đó dựa vào <b>tô thuế</b> bóc lột từ nông nô. <ul><li>Nông nô làm ra của cải, lãnh chúa hưởng thụ.</li></ul>",
      "Quan hệ <i>lãnh chúa — nông nô</i> vì thế là quan hệ <code>bóc lột</code> đặc trưng của chế độ phong kiến phân quyền ở Tây Âu.",
    ],
     ['Đúng — lãnh chúa sống nhờ tô thuế, bóc lột sức lao động nông nô.', 'Sai — lãnh chúa không lao động; đánh cá không phải nguồn sống của họ.', 'Sai — lãnh chúa không tự cày cấy, việc đó do nông nô làm.', 'Sai — buôn bán là việc của thương nhân, lãnh chúa sống nhờ tô thuế.']),
    Q('Vì sao gọi quan hệ giữa lãnh chúa và nông nô là quan hệ phong kiến?', ['Lãnh chúa chiếm ruộng đất, nông nô lệ thuộc và bị bóc lột địa tô', 'Hai bên bình đẳng', 'Nông nô làm chủ', 'Không có bóc lột'], 0, 'Đặc trưng phong kiến: địa chủ chiếm ruộng, nông dân lệ thuộc nộp tô.',[
      "Quan hệ giữa lãnh chúa và nông nô được gọi là <b>quan hệ sản xuất phong kiến</b>.",
      "Đặc trưng của nó: <ul><li>Lãnh chúa (địa chủ) <b>chiếm hữu ruộng đất</b>.</li><li>Nông nô <i>lệ thuộc</i>, bị gắn với ruộng đất và bị bóc lột chủ yếu bằng <b>địa tô</b>.</li></ul>",
      "Đây là quan hệ <code>bất bình đẳng</code> — khác với quan hệ chiếm hữu nô lệ (chủ nô sở hữu cả thân thể nô lệ) và quan hệ tư bản chủ nghĩa (bóc lột giá trị thặng dư) sau này.",
    ],
     ['Đúng — lãnh chúa chiếm ruộng, nông nô lệ thuộc và bị bóc lột địa tô.', 'Sai — quan hệ phong kiến là bất bình đẳng, có bóc lột.', 'Sai — nông nô lệ thuộc lãnh chúa chứ không làm chủ.', 'Sai — đặc trưng phong kiến chính là bóc lột địa tô.']),
  ]),

  M(3, 'Thành thị trung đại và sự xuất hiện thị dân', [
    Q('Thành thị trung đại Tây Âu ra đời từ khoảng?', ['Thế kỉ V', 'Thế kỉ XX', 'Thế kỉ XI', 'Thế kỉ XV'], 2, 'Từ thế kỉ XI, do thủ công nghiệp và thương nghiệp phát triển.',[
      "Từ khoảng <b>thế kỉ XI</b>, sản xuất phát triển khiến hàng thủ công làm ra ngày càng nhiều, nhu cầu trao đổi tăng lên.",
      "Thợ thủ công tìm tới những nơi đông người, đầu mối giao thông để lập xưởng, bán hàng → các <b>thành thị trung đại</b> ra đời. <ul><li>Một số thành thị mọc lên trên nền đô thị La Mã cũ;</li><li>số khác hình thành quanh lâu đài, tu viện, bến sông.</li></ul>",
      "Như vậy, nguyên nhân chủ yếu là sự phát triển của <i>thủ công nghiệp</i> và <i>thương nghiệp</i>, chứ không phải do lãnh chúa lập ra.",
    ],
     ['Sai — thế kỉ V là lúc Tây La Mã vừa sụp đổ, thành thị chưa ra đời.', 'Sai — thế kỉ XX là thời hiện đại, lệch quá xa mốc trung đại.', 'Đúng — thành thị ra đời từ thế kỉ XI do thủ công và thương nghiệp phát triển.', 'Sai — thế kỉ XV thành thị đã phát triển mạnh, không phải mốc ra đời.']),
    Q('Cư dân chủ yếu của thành thị là?', ['Nông nô', 'Thợ thủ công và thương nhân', 'Tăng lữ', 'Lãnh chúa'], 1, 'Thành thị là nơi cư trú của thợ thủ công và thương nhân.',[
      "Cư dân chủ yếu của thành thị trung đại là <b>thợ thủ công</b> và <b>thương nhân</b> — gọi chung là <i>thị dân</i>.",
      "<ul><li>Họ sống bằng nghề làm hàng thủ công và buôn bán, không phải làm ruộng.</li><li>Nhiều nông nô trốn khỏi lãnh địa ra thành thị để tìm tự do và việc làm.</li></ul>",
      "Khác với <i>nông nô</i> (sống trong lãnh địa), thị dân là lực lượng mới gắn với nền kinh tế hàng hoá đang lên.",
    ],
     ['Sai — nông nô sống ở lãnh địa nông thôn, không phải thành thị.', 'Đúng — cư dân thành thị chủ yếu là thợ thủ công và thương nhân.', 'Sai — tăng lữ thuộc Giáo hội, không phải cư dân chính của thành thị.', 'Sai — lãnh chúa sống trong lãnh địa, không phải dân thành thị.']),
    Q('Phường hội là tổ chức của ai?', ['Những người cùng làm một nghề thủ công', 'Lãnh chúa phong kiến quản lí lãnh địa', 'Tăng lữ', 'Lãnh chúa'], 0, 'Phường hội là tổ chức của thợ thủ công cùng nghề trong thành thị.',[
      "<b>Phường hội</b> là tổ chức của những người thợ thủ công cùng làm <i>một nghề</i> trong thành thị (phường dệt, phường rèn...).",
      "Mục đích: <ul><li>giữ độc quyền sản xuất, bảo vệ quyền lợi nghề nghiệp;</li><li>quy định về kĩ thuật, mẫu mã, giá cả, chống cạnh tranh từ bên ngoài.</li></ul>",
      "Phường hội thể hiện tính <code>tổ chức chặt chẽ</code> của tầng lớp thợ thủ công thành thị.",
    ],
     ['Đúng — phường hội là tổ chức của thợ thủ công cùng một nghề.', 'Sai — lãnh chúa quản lãnh địa, không lập phường hội thủ công.', 'Sai — tăng lữ thuộc Giáo hội, không lập phường hội.', 'Sai — lãnh chúa không liên quan tới phường hội của thợ thủ công.']),
    Q('Thương hội là tổ chức của?', ['Nông dân', 'Thương nhân', 'Trẻ em', 'Quân lính'], 1, 'Thương hội là hiệp hội của các thương nhân.',[
      "<b>Thương hội</b> là tổ chức (hiệp hội) của các <b>thương nhân</b> trong thành thị.",
      "Vai trò: <ul><li>bảo vệ quyền lợi buôn bán của các thành viên;</li><li>thống nhất giá cả, an toàn cho các đoàn buôn trên đường đi.</li></ul>",
      "Cùng với <i>phường hội</i> của thợ thủ công, thương hội cho thấy đời sống kinh tế thành thị được tổ chức quy củ.",
    ],
     ['Sai — nông dân làm ruộng ở nông thôn, không lập thương hội.', 'Đúng — thương hội là hiệp hội của các thương nhân.', 'Sai — trẻ em không lập tổ chức kinh tế như thương hội.', 'Sai — quân lính không phải lực lượng buôn bán lập thương hội.']),
    Q('Vai trò của thành thị trung đại?', ['Phá vỡ kinh tế tự cung tự cấp, thúc đẩy kinh tế hàng hoá', 'Củng cố chế độ nông nô', 'Làm châu Âu lạc hậu', 'Không có tác dụng gì'], 0, 'Thành thị giúp kinh tế hàng hoá phát triển, làm rạn nứt chế độ phong kiến.',[
      "Thành thị trung đại có vai trò to lớn đối với lịch sử Tây Âu:",
      "<ul><li>Phá vỡ dần nền kinh tế <b>tự cấp tự túc</b> của lãnh địa, thúc đẩy kinh tế <b>hàng hoá</b>.</li><li>Mang lại không khí tự do, mở mang tri thức (nhiều trường đại học ra đời ở thành thị).</li><li>Góp phần làm <i>rạn nứt</i> và suy yếu chế độ phong kiến phân quyền.</li></ul>",
      "Vì vậy thành thị được ví như \"bông hoa rực rỡ\" của thời trung đại, mở đường cho những biến đổi lớn về sau.",
    ],
     ['Đúng — thành thị phá vỡ kinh tế tự cung tự cấp, thúc đẩy kinh tế hàng hoá.', 'Sai — thành thị làm rạn nứt chứ không củng cố chế độ nông nô.', 'Sai — thành thị thúc đẩy tiến bộ, không làm châu Âu lạc hậu.', 'Sai — thành thị có vai trò lớn trong phát triển kinh tế hàng hoá.']),
  ]),

  M(4, 'Các cuộc phát kiến địa lí lớn (XV–XVI)', [
    Q('Người Bồ Đào Nha B. Đi-a-xơ đã đi đến mũi đất nào năm 1487?', ['Mũi Bắc Cực', 'Mũi Cát-tê-rin', 'Mũi Cà Mau', 'Mũi Hảo Vọng (cực Nam châu Phi)'], 3, 'B. Đi-a-xơ tới mũi Hảo Vọng năm 1487.',[
      "Cuối thế kỉ XV, người <b>Bồ Đào Nha</b> đi đầu trong việc thám hiểm đường biển vòng quanh châu Phi để sang phương Đông.",
      "Năm <b>1487</b>, <i>B. Đi-a-xơ</i> đi tới cực nam châu Phi, đặt tên là <b>mũi Hảo Vọng</b> (mũi Bão Táp).",
      "Đây là bước chuẩn bị quan trọng để sau đó <i>Va-xcô đơ Ga-ma</i> tiếp tục vòng qua mũi Hảo Vọng và đến được Ấn Độ.",
    ],
     ['Sai — Đi-a-xơ đi xuống phía nam châu Phi, không hề đến Bắc Cực.', 'Sai — không có "mũi Cát-tê-rin" trong hành trình của Đi-a-xơ.', 'Sai — mũi Cà Mau ở Việt Nam, ngoài hành trình của Đi-a-xơ.', 'Đúng — năm 1487 Đi-a-xơ tới mũi Hảo Vọng, cực nam châu Phi.']),
    Q('C. Cô-lôm-bô tìm ra châu Mỹ năm?', ['1492', '1519', '1498', '1543'], 0, 'Năm 1492, Cô-lôm-bô đặt chân tới châu Mỹ.',[
      "Năm <b>1492</b>, được Tây Ban Nha tài trợ, <b>C. Cô-lôm-bô</b> dẫn đoàn thuyền đi về phía tây qua Đại Tây Dương.",
      "Ông đặt chân tới một số đảo thuộc vùng biển Ca-ri-bê — thực chất là <b>châu Mỹ</b>, nhưng cho rằng đã đến Ấn Độ (vì thế gọi dân bản địa là \"In-đi-an\").",
      "Cô-lôm-bô được coi là người <i>tìm ra châu Mỹ</i> đối với người châu Âu. Cần phân biệt: <code>1498</code> là năm Va-xcô đơ Ga-ma đến Ấn Độ, <code>1519</code> là khi Ma-gien-lăng khởi hành.",
    ],
     ['Đúng — năm 1492 Cô-lôm-bô đặt chân tới châu Mỹ.', 'Sai — 1519 là năm Ma-gien-lăng bắt đầu hành trình vòng quanh thế giới.', 'Sai — 1498 là năm Va-xcô đơ Ga-ma đến Ấn Độ, không phải Cô-lôm-bô.', 'Sai — 1543 lệch mốc; châu Mỹ được tìm ra năm 1492.']),
    Q('Va-xcô đơ Ga-ma đã đến được?', ['Ấn Độ (1498) bằng đường biển vòng qua châu Phi', 'Châu Úc', 'Bắc Cực', 'Trung Quốc'], 0, 'Va-xcô đơ Ga-ma đến Ca-li-cút, Ấn Độ năm 1498.',[
      "Năm <b>1498</b>, nhà thám hiểm Bồ Đào Nha <b>Va-xcô đơ Ga-ma</b> chỉ huy đoàn thuyền vòng qua mũi Hảo Vọng, vượt Ấn Độ Dương.",
      "Ông cập bến <b>Ca-li-cút</b> ở <i>Ấn Độ</i>, mở ra con đường biển trực tiếp từ Tây Âu sang phương Đông.",
      "Thành công này khẳng định tuyến đường vòng quanh châu Phi mà Đi-a-xơ đã dò đường trước đó là khả thi.",
    ],
     ['Đúng — Va-xcô đơ Ga-ma đến Ca-li-cút (Ấn Độ) năm 1498 vòng qua châu Phi.', 'Sai — châu Úc được người châu Âu biết tới muộn hơn nhiều.', 'Sai — Va-xcô đơ Ga-ma đi về phía Ấn Độ, không tới Bắc Cực.', 'Sai — đích đến của ông là Ấn Độ, không phải Trung Quốc.']),
    Q('Đoàn thám hiểm của Ma-gien-lăng đã làm được điều gì lớn?', ['Tìm ra mặt trăng', 'Đi vòng quanh thế giới bằng đường biển (1519–1522)', 'Tìm ra Mỹ trước Cô-lôm-bô', 'Tìm ra Bắc Cực'], 1, 'Đoàn của Ma-gien-lăng hoàn thành chuyến vòng quanh Trái Đất 1519–1522.',[
      "Năm <b>1519</b>, <b>Ph. Ma-gien-lăng</b> chỉ huy đoàn thuyền của Tây Ban Nha đi về phía tây, vượt Đại Tây Dương rồi Thái Bình Dương.",
      "Tuy Ma-gien-lăng tử trận ở Phi-líp-pin, đoàn của ông vẫn hoàn thành chuyến <b>đi vòng quanh thế giới</b> bằng đường biển, trở về năm <b>1522</b>.",
      "Chuyến đi chứng minh Trái Đất hình <i>cầu</i> và các đại dương nối liền nhau — một thành tựu vĩ đại của thời đại phát kiến địa lí.",
    ],
     ['Sai — đây là thám hiểm hàng hải trên Trái Đất, không liên quan mặt trăng.', 'Đúng — đoàn Ma-gien-lăng đi vòng quanh thế giới bằng đường biển 1519–1522.', 'Sai — Cô-lôm-bô tìm ra Mỹ năm 1492, trước Ma-gien-lăng.', 'Sai — đoàn Ma-gien-lăng đi vòng quanh Trái Đất, không tới Bắc Cực.']),
    Q('Hệ quả tích cực của các phát kiến địa lí?', ['Phá huỷ châu Âu', 'Mở rộng giao lưu Đông–Tây, thúc đẩy kinh tế hàng hoá', 'Không có tác động', 'Chấm dứt thương mại'], 1, 'Phát kiến địa lí mở ra giao lưu Đông–Tây và thúc đẩy chủ nghĩa tư bản.',[
      "Các cuộc <b>phát kiến địa lí</b> đem lại nhiều hệ quả to lớn cho thế giới.",
      "Hệ quả <i>tích cực</i>: <ul><li>tìm ra những con đường biển, vùng đất, châu lục mới;</li><li>mở rộng giao lưu <b>Đông — Tây</b>, thúc đẩy kinh tế <b>hàng hoá</b> và thương mại;</li><li>đem về nhiều vàng bạc, góp phần làm ra đời chủ nghĩa tư bản.</li></ul>",
      "Song bên cạnh đó còn có hệ quả tiêu cực: nảy sinh nạn buôn bán <code>nô lệ</code> và quá trình xâm chiếm <i>thuộc địa</i>.",
    ],
     ['Sai — phát kiến địa lí thúc đẩy chứ không phá huỷ châu Âu.', 'Đúng — phát kiến địa lí mở rộng giao lưu Đông–Tây, thúc đẩy kinh tế hàng hoá.', 'Sai — phát kiến địa lí có tác động to lớn tới kinh tế thế giới.', 'Sai — phát kiến địa lí mở rộng chứ không chấm dứt thương mại.']),
  ]),

  M(5, 'Phong trào Văn hoá Phục Hưng', [
    Q('Phong trào Văn hoá Phục Hưng bắt đầu ở đâu?', ['I-ta-li-a', 'Đức (quê hương phong trào Cải cách tôn giáo)', 'Anh (nơi phát triển kịch Sếch-xpia về sau)', 'Pháp (trung tâm khai sáng thế kỉ XVIII)'], 0, 'Phục Hưng khởi đầu ở I-ta-li-a vào thế kỉ XIV.',[
      "Phong trào <b>Văn hoá Phục Hưng</b> khởi đầu ở <b>I-ta-li-a</b> vào thế kỉ <i>XIV</i>, sau đó lan ra khắp Tây Âu.",
      "I-ta-li-a là nơi có nền tảng thuận lợi: <ul><li>là cái nôi của văn minh Hi Lạp — La Mã cổ đại;</li><li>thành thị, thương nghiệp và tầng lớp tư sản phát triển sớm.</li></ul>",
      "\"Phục Hưng\" nghĩa là <code>khôi phục</code>, làm sống lại tinh hoa văn hoá cổ đại Hi Lạp — La Mã.",
    ],
     ['Đúng — Phục Hưng khởi đầu ở I-ta-li-a vào thế kỉ XIV.', 'Sai — Đức là nơi nổ ra Cải cách tôn giáo, không phải nơi mở đầu Phục Hưng.', 'Sai — Anh có Sếch-xpia nhưng Phục Hưng khởi đầu ở I-ta-li-a.', 'Sai — Pháp là trung tâm Khai sáng thế kỉ XVIII, muộn hơn Phục Hưng.']),
    Q('Nội dung tư tưởng chính của Phục Hưng?', ['Đề cao con người, tự do, khoa học', 'Đề cao chế độ nông nô', 'Phản đối khoa học', 'Đề cao thần quyền'], 0, 'Chủ nghĩa nhân văn — đề cao con người, lí trí, khoa học.',[
      "Nội dung tư tưởng cốt lõi của Phục Hưng là <b>chủ nghĩa nhân văn</b>.",
      "<ul><li>Đề cao <b>con người</b>, giá trị và vẻ đẹp của con người trần thế.</li><li>Đề cao <i>tự do</i>, lí trí và <b>khoa học</b>.</li><li>Phê phán Giáo hội và xã hội phong kiến đang kìm hãm con người.</li></ul>",
      "Đây là cuộc đấu tranh tư tưởng của giai cấp <code>tư sản</code> chống lại trật tự phong kiến và thần quyền của Giáo hội.",
    ],
     ['Đúng — Phục Hưng đề cao con người, tự do và khoa học (chủ nghĩa nhân văn).', 'Sai — Phục Hưng phê phán chứ không đề cao chế độ phong kiến nông nô.', 'Sai — Phục Hưng đề cao chứ không phản đối khoa học.', 'Sai — Phục Hưng đề cao con người, chống lại thần quyền của Giáo hội.']),
    Q('Lê-ô-na đờ Vanh-xi nổi tiếng với tác phẩm nào?', ['Đền Pác-tê-nông', 'Bức tranh Mô-na Li-da', 'Tháp Ép-phen', 'Tượng Vệ Nữ Mi-lô'], 1, 'Lê-ô-na đờ Vanh-xi (Leonardo da Vinci) vẽ Mô-na Li-da.',[
      "<b>Lê-ô-na đờ Vanh-xi</b> (Leonardo da Vinci) là danh hoạ, nhà khoa học tiêu biểu của Phục Hưng I-ta-li-a.",
      "Tác phẩm nổi tiếng nhất của ông là bức <b>Mô-na Li-da</b> (La Gioconda), cùng với <i>Bữa tiệc cuối cùng</i>.",
      "Cần phân biệt với nghệ thuật <i>Hi Lạp cổ đại</i> như đền <code>Pác-tê-nông</code> hay tượng <code>Vệ Nữ Mi-lô</code> — thuộc thời cổ đại, không phải Phục Hưng.",
    ],
     ['Sai — đền Pác-tê-nông là kiến trúc Hi Lạp cổ đại, không phải của Vanh-xi.', 'Đúng — Lê-ô-na đờ Vanh-xi vẽ bức Mô-na Li-da nổi tiếng.', 'Sai — tháp Ép-phen xây ở Pháp thế kỉ XIX, không liên quan Vanh-xi.', 'Sai — tượng Vệ Nữ Mi-lô là điêu khắc Hi Lạp cổ đại.']),
    Q('Nhà thiên văn nào khẳng định Trái Đất quay quanh Mặt Trời?', ['Ga-li-lê', 'N. Cô-péc-ních', 'Anh-xtanh', 'Niu-tơn'], 1, 'Cô-péc-ních đưa ra thuyết Mặt Trời là trung tâm.',[
      "Nhà thiên văn học Ba Lan <b>N. Cô-péc-ních</b> nêu thuyết <b>nhật tâm</b>: Mặt Trời (chứ không phải Trái Đất) là trung tâm, các hành tinh quay quanh Mặt Trời.",
      "Thuyết này bác bỏ quan niệm \"Trái Đất là trung tâm\" mà Giáo hội bảo vệ. <ul><li><i>Ga-li-lê</i> về sau dùng kính thiên văn để củng cố và chứng minh thuyết của Cô-péc-ních.</li></ul>",
      "Đừng nhầm với <i>Niu-tơn</i> (định luật vạn vật hấp dẫn) hay <i>Anh-xtanh</i> (thế kỉ XX) — họ ở những thời kì khác.",
    ],
     ['Sai — Ga-li-lê ủng hộ thuyết này nhưng người nêu ra là Cô-péc-ních.', 'Đúng — Cô-péc-ních nêu thuyết Mặt Trời là trung tâm (nhật tâm).', 'Sai — Anh-xtanh là nhà vật lí thế kỉ XX, không phải thời Phục Hưng.', 'Sai — Niu-tơn nổi tiếng với định luật vạn vật hấp dẫn, không nêu thuyết nhật tâm.']),
    Q('Vai trò của Phong trào Phục Hưng?', ['Phục hồi chế độ nô lệ', 'Làm khoa học lùi bước', 'Mở đường cho khoa học và tư tưởng tiến bộ phát triển', 'Củng cố chế độ phong kiến'], 2, 'Phục Hưng là cuộc cách mạng tư tưởng, mở đường cho khoa học hiện đại.',[
      "Phong trào Văn hoá Phục Hưng có ý nghĩa to lớn:",
      "<ul><li>Là cuộc <b>cách mạng tiến bộ về tư tưởng và văn hoá</b>.</li><li>Lên án Giáo hội, đề cao con người và khoa học.</li><li>Mở đường cho sự phát triển của <b>văn hoá, khoa học</b> châu Âu trong các thế kỉ tiếp theo.</li></ul>",
      "Phục Hưng đặt nền móng cho tư tưởng tiến bộ, góp phần làm <code>lung lay</code> nền tảng tư tưởng của chế độ phong kiến.",
    ],
     ['Sai — Phục Hưng đề cao con người, không phục hồi chế độ nô lệ.', 'Sai — Phục Hưng thúc đẩy chứ không làm khoa học lùi bước.', 'Đúng — Phục Hưng mở đường cho khoa học và tư tưởng tiến bộ phát triển.', 'Sai — Phục Hưng tấn công nền tảng tư tưởng phong kiến.']),
  ]),

  M(6, 'Cải cách tôn giáo và chiến tranh nông dân Đức', [
    Q('Người khởi xướng cuộc Cải cách tôn giáo ở Đức?', ['Sếch-xpia', 'Mác-tin Lu-thơ', 'Cô-péc-ních', 'Lê-ô-na đờ Vanh-xi'], 1, 'Năm 1517, Lu-thơ dán 95 luận điểm chống Giáo hội La Mã.',[
      "Đầu thế kỉ XVI, Giáo hội Thiên Chúa giáo ở Tây Âu ngày càng lũng đoạn, đặc biệt là việc bán \"thẻ miễn tội\".",
      "Năm <b>1517</b>, ở <b>Đức</b>, <b>Mác-tin Lu-thơ</b> công bố <i>95 luận điểm</i> phê phán Giáo hội La Mã, mở đầu phong trào <b>Cải cách tôn giáo</b>.",
      "Phong trào nhanh chóng lan rộng ra nhiều nước Tây Âu.",
    ],
     ['Sai — Sếch-xpia là nhà soạn kịch Anh, không khởi xướng Cải cách tôn giáo.', 'Đúng — Mác-tin Lu-thơ khởi xướng Cải cách tôn giáo ở Đức năm 1517.', 'Sai — Cô-péc-ních là nhà thiên văn, không lãnh đạo cải cách tôn giáo.', 'Sai — Vanh-xi là hoạ sĩ Phục Hưng, không liên quan cải cách tôn giáo.']),
    Q('Cải cách tôn giáo lập ra giáo phái nào?', ['Hồi giáo', 'Hin-đu giáo', 'Tin Lành (Tân giáo)', 'Phật giáo'], 2, 'Đạo Tin Lành ra đời, chống lại Giáo hội Thiên Chúa La Mã.',[
      "Cuộc Cải cách tôn giáo dẫn tới sự ra đời của <b>đạo Tin Lành</b> (Tân giáo, Kháng Cách).",
      "Đạo Tin Lành: <ul><li>không thừa nhận quyền tối cao của Giáo hoàng;</li><li>chủ trương đơn giản hoá nghi lễ, đề cao Kinh Thánh.</li></ul>",
      "Từ đây, Thiên Chúa giáo ở Tây Âu phân chia thành hai dòng lớn: <i>Cựu giáo</i> (Công giáo La Mã) và <i>Tân giáo</i> (Tin Lành). Hồi giáo, Hin-đu giáo, Phật giáo có nguồn gốc khác hẳn.",
    ],
     ['Sai — Hồi giáo ra đời ở A-ráp thế kỉ VII, không phải từ cải cách tôn giáo.', 'Sai — Hin-đu giáo có nguồn gốc ở Ấn Độ cổ, không liên quan cải cách.', 'Đúng — Cải cách tôn giáo lập ra đạo Tin Lành (Tân giáo).', 'Sai — Phật giáo ra đời ở Ấn Độ cổ đại, không phải từ cải cách tôn giáo.']),
    Q('Cuộc chiến tranh nông dân Đức (1524–1525) do ai lãnh đạo?', ['Lu-thơ', 'Can-vanh', 'Cô-péc-ních', 'Tô-mát Muyn-xơ'], 3, 'Tô-mát Muyn-xơ lãnh đạo nông dân Đức nổi dậy.',[
      "Hưởng ứng tư tưởng cải cách, nông dân Đức nổi dậy trong cuộc <b>Chiến tranh nông dân Đức (1524–1525)</b>.",
      "Lãnh đạo phong trào là <b>Tô-mát Muyn-xơ</b>. Nông dân đòi xoá bỏ chế độ phong kiến, giảm tô thuế.",
      "Cuộc đấu tranh tuy thất bại nhưng là một trong những phong trào nông dân lớn, thể hiện mâu thuẫn gay gắt trong xã hội phong kiến Đức.",
    ],
     ['Sai — Lu-thơ khởi xướng cải cách tôn giáo nhưng không lãnh đạo nông dân khởi nghĩa.', 'Sai — Can-vanh cải cách tôn giáo ở Thuỵ Sĩ, không lãnh đạo nông dân Đức.', 'Sai — Cô-péc-ních là nhà thiên văn, không lãnh đạo chiến tranh nông dân.', 'Đúng — Tô-mát Muyn-xơ lãnh đạo nông dân Đức nổi dậy 1524–1525.']),
    Q('Vì sao có cuộc cải cách tôn giáo?', ['Người dân muốn vui chơi', 'Vua ra lệnh', 'Giáo hội bóc lột, cản trở phát triển tư sản', 'Tôn giáo tự nhiên thay đổi'], 2, 'Giáo hội cản trở sự phát triển của giai cấp tư sản, dẫn đến cải cách.',[
      "Nguyên nhân sâu xa của Cải cách tôn giáo nằm ở mâu thuẫn <i>kinh tế — xã hội</i>.",
      "<ul><li>Giáo hội Thiên Chúa giáo có thế lực kinh tế lớn, <b>bóc lột</b> nhân dân, vơ vét của cải.</li><li>Giáo hội trở thành lực lượng <b>cản trở</b> sự phát triển của giai cấp tư sản đang lên.</li></ul>",
      "Vì vậy giai cấp tư sản đi đầu trong việc đòi cải cách, giải phóng tư tưởng khỏi sự ràng buộc của Giáo hội.",
    ],
     ['Sai — cải cách tôn giáo có nguyên nhân kinh tế — xã hội, không vì vui chơi.', 'Sai — cải cách do mâu thuẫn với Giáo hội, không phải do vua ra lệnh.', 'Đúng — Giáo hội bóc lột, cản trở phát triển tư sản nên nổ ra cải cách.', 'Sai — cải cách bắt nguồn từ mâu thuẫn xã hội, không tự nhiên xảy ra.']),
    Q('Ý nghĩa của Cải cách tôn giáo?', ['Làm khoa học chậm lại', 'Củng cố chế độ phong kiến', 'Đánh vào chế độ phong kiến, cổ vũ giai cấp tư sản', 'Không có ý nghĩa'], 2, 'Cải cách tôn giáo tấn công nền tảng tư tưởng phong kiến.',[
      "Cải cách tôn giáo mang ý nghĩa lớn về mặt tư tưởng và xã hội:",
      "<ul><li><b>Đánh vào</b> Giáo hội và chế độ phong kiến đang khủng hoảng.</li><li>Cổ vũ và mở đường cho giai cấp <b>tư sản</b> phát triển.</li></ul>",
      "Cùng với Phong trào Văn hoá Phục Hưng, Cải cách tôn giáo góp phần làm <code>suy yếu</code> nền tảng tư tưởng của chế độ phong kiến Tây Âu.",
    ],
     ['Sai — cải cách góp phần giải phóng tư tưởng, không làm khoa học chậm lại.', 'Sai — cải cách tấn công chứ không củng cố chế độ phong kiến.', 'Đúng — Cải cách tôn giáo đánh vào chế độ phong kiến, cổ vũ giai cấp tư sản.', 'Sai — cải cách tôn giáo có ý nghĩa lớn về tư tưởng và xã hội.']),
  ]),

  M(7, 'Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX', [
    Q('Triều đại nào ở Trung Quốc được coi là cường thịnh bậc nhất?', ['Nhà Đường (618–907)', 'Nhà Hán', 'Nhà Tần', 'Nhà Thanh'], 0, 'Nhà Đường là thời kì rực rỡ nhất trong lịch sử phong kiến Trung Quốc.',[
      "Trong lịch sử phong kiến Trung Quốc, <b>nhà Đường (618–907)</b> được coi là thời kì <i>cường thịnh bậc nhất</i>.",
      "Dưới thời Đường: <ul><li>chế độ phong kiến đạt tới đỉnh cao về kinh tế, chính trị, văn hoá;</li><li>lãnh thổ mở rộng, kinh tế nông nghiệp và thương mại (Con đường Tơ lụa) phát triển.</li></ul>",
      "Các triều khác như Hán, Tần, Thanh có vị trí riêng nhưng đỉnh cao của chế độ phong kiến vẫn là nhà Đường.",
    ],
     ['Đúng — nhà Đường (618–907) là thời kì cường thịnh bậc nhất.', 'Sai — nhà Hán hùng mạnh nhưng đỉnh cao phong kiến là nhà Đường.', 'Sai — nhà Tần thống nhất Trung Quốc nhưng tồn tại ngắn, không phải đỉnh cao.', 'Sai — nhà Thanh là triều cuối, suy yếu dần, không phải cường thịnh nhất.']),
    Q('Người sáng lập nhà Đường là?', ['Lý Uyên (Đường Cao Tổ)', 'Tần Thuỷ Hoàng', 'Lưu Bang', 'Càn Long'], 0, 'Lý Uyên lập nhà Đường năm 618.',[
      "Người sáng lập nhà Đường là <b>Lý Uyên</b> (Đường Cao Tổ), lên ngôi năm <b>618</b>.",
      "Sau đó con ông là <i>Đường Thái Tông</i> (Lý Thế Dân) đưa nhà Đường bước vào thời kì hưng thịnh.",
      "Phân biệt: <i>Tần Thuỷ Hoàng</i> lập nhà Tần, <i>Lưu Bang</i> lập nhà Hán, còn <i>Càn Long</i> là vua nhà Thanh ở thế kỉ XVIII.",
    ],
     ['Đúng — Lý Uyên (Đường Cao Tổ) lập nhà Đường năm 618.', 'Sai — Tần Thuỷ Hoàng lập nhà Tần, không phải nhà Đường.', 'Sai — Lưu Bang lập nhà Hán, không phải nhà Đường.', 'Sai — Càn Long là vua nhà Thanh, sống muộn hơn nhiều.']),
    Q('Nhà nào của Trung Quốc xâm lược nước ta lần đầu thất bại ở Bạch Đằng (938)?', ['Nguyên', 'Nam Hán', 'Tống (bị Lý Thường Kiệt chặn ở sông Như Nguyệt)', 'Minh (bị Lê Lợi đánh bại ở Chi Lăng — Xương Giang)'], 1, 'Nam Hán bị Ngô Quyền đánh bại trên sông Bạch Đằng năm 938.',[
      "Năm <b>938</b>, quân <b>Nam Hán</b> (một nước ở Nam Trung Quốc) đưa quân sang xâm lược nước ta.",
      "<b>Ngô Quyền</b> đã đánh tan quân Nam Hán trên sông <b>Bạch Đằng</b> bằng kế đóng cọc ngầm, chấm dứt hơn 1000 năm Bắc thuộc.",
      "Cần phân biệt các lần xâm lược: quân <i>Tống</i> bị chặn ở sông Như Nguyệt (1077), quân <i>Mông — Nguyên</i> thất bại thời Trần, quân <i>Minh</i> bị Lê Lợi đánh bại (1427).",
    ],
     ['Sai — quân Nguyên bị nhà Trần đánh bại thế kỉ XIII, không phải năm 938.', 'Đúng — Nam Hán bị Ngô Quyền đánh tan trên sông Bạch Đằng năm 938.', 'Sai — quân Tống bị Lý Thường Kiệt chặn ở Như Nguyệt năm 1077.', 'Sai — quân Minh bị Lê Lợi đánh bại ở Chi Lăng — Xương Giang 1427.']),
    Q('Bốn phát minh lớn của Trung Quốc thời trung đại?', ['Lúa, ngô, khoai, sắn', 'Giấy, kĩ thuật in, la bàn, thuốc súng', 'Vàng, bạc, đồng, sắt', 'Bóng đèn, ô tô, máy bay, máy tính'], 1, '"Tứ đại phát minh" — giấy, in, la bàn, thuốc súng.',[
      "Người Trung Quốc thời trung đại có nhiều phát minh kĩ thuật quan trọng, nổi bật là <b>tứ đại phát minh</b>:",
      "<ul><li><b>kĩ thuật làm giấy</b>;</li><li><b>kĩ thuật in</b>;</li><li><b>la bàn</b>;</li><li><b>thuốc súng</b>.</li></ul>",
      "Bốn phát minh này lan truyền sang phương Tây, có ảnh hưởng <code>to lớn</code> tới tiến trình lịch sử thế giới.",
    ],
     ['Sai — đây là các cây lương thực, không phải phát minh kĩ thuật.', 'Đúng — tứ đại phát minh: giấy, kĩ thuật in, la bàn, thuốc súng.', 'Sai — đây là các kim loại, không phải bốn phát minh lớn.', 'Sai — đây là phát minh thời hiện đại, không phải trung đại Trung Quốc.']),
    Q('Nhà Thanh ở Trung Quốc do dân tộc nào lập?', ['Hán (dân tộc chủ thể của Trung Quốc)', 'Mãn Châu', 'Đột Quyết', 'Mông Cổ'], 1, 'Người Mãn lập nhà Thanh năm 1644.',[
      "Năm <b>1644</b>, người <b>Mãn Châu</b> (Mãn Thanh) từ phía đông bắc tiến vào, lập ra <b>nhà Thanh</b> — triều đại phong kiến cuối cùng của Trung Quốc.",
      "Nhà Thanh tuy do người Mãn lập nhưng cai trị quốc gia đa số là người <i>Hán</i>. <ul><li>Thời đầu (Khang Hi, Càn Long) đất nước còn thịnh;</li><li>về sau suy yếu và bị các nước phương Tây xâm lược.</li></ul>",
      "Phân biệt: <i>người Mông Cổ</i> lập nhà <b>Nguyên</b>, còn <i>người Mãn</i> lập nhà <b>Thanh</b>.",
    ],
     ['Sai — nhà Thanh do người Mãn lập, không phải dân tộc Hán.', 'Đúng — người Mãn Châu lập nhà Thanh năm 1644.', 'Sai — Đột Quyết là tộc du mục phía bắc, không lập nhà Thanh.', 'Sai — người Mông Cổ lập nhà Nguyên, không phải nhà Thanh.']),
  ]),

  M(8, 'Ấn Độ thời trung đại — Vương triều Mô-gôn', [
    Q('Vương triều Hồi giáo Đê-li ở Ấn Độ tồn tại trong khoảng?', ['Thế kỉ XIX–XX', 'Thế kỉ XIII–XVI', 'Trước Công nguyên', 'Thế kỉ V–VIII'], 1, 'Vương triều Đê-li (1206–1526) — Hồi giáo do người Thổ lập.',[
      "<b>Vương triều Hồi giáo Đê-li</b> do người Hồi giáo gốc Thổ lập nên, tồn tại khoảng <b>1206–1526</b> (thế kỉ XIII–XVI).",
      "Đây là vương triều ngoại tộc đầu tiên áp đặt sự cai trị Hồi giáo trên phần lớn Bắc Ấn Độ. <ul><li>Đạo Hồi được truyền bá mạnh;</li><li>mâu thuẫn dân tộc, tôn giáo gay gắt với cư dân theo Hin-đu giáo.</li></ul>",
      "Trước đó, thời cổ — trung đại Ấn Độ còn có vương triều <i>Gúp-ta</i> (thế kỉ IV–VI).",
    ],
     ['Sai — thế kỉ XIX–XX Ấn Độ đã là thuộc địa Anh, quá muộn.', 'Đúng — Vương triều Đê-li tồn tại khoảng 1206–1526 (thế kỉ XIII–XVI).', 'Sai — trước Công nguyên là thời cổ đại, chưa có vương triều Hồi giáo.', 'Sai — thế kỉ V–VIII là thời vương triều Gúp-ta, chưa có Đê-li.']),
    Q('Người sáng lập Vương triều Mô-gôn là?', ['Ba-bua', 'A-sô-ca', 'Sa Gia-han', 'A-cơ-ba'], 0, 'Ba-bua lập Vương triều Mô-gôn năm 1526.',[
      "Năm <b>1526</b>, <b>Ba-bua</b> — một thủ lĩnh gốc Mông Cổ theo Hồi giáo — đánh chiếm Đê-li, lập ra <b>Vương triều Mô-gôn</b>.",
      "Đây là vương triều phong kiến cuối cùng và hùng mạnh của Ấn Độ thời trung đại.",
      "Phân biệt: <i>A-sô-ca</i> là vua vương triều Mô-ri-a thời cổ đại; <i>A-cơ-ba</i> và <i>Sa Gia-han</i> là các vua Mô-gôn về sau, không phải người sáng lập.",
    ],
     ['Đúng — Ba-bua lập Vương triều Mô-gôn năm 1526.', 'Sai — A-sô-ca là vua vương triều Mô-ri-a thời cổ đại Ấn Độ.', 'Sai — Sa Gia-han là vua Mô-gôn về sau, người xây Ta-giơ Ma-han.', 'Sai — A-cơ-ba là cháu Ba-bua, không phải người sáng lập.']),
    Q('Vị vua Mô-gôn nào nổi tiếng vĩ đại nhất, đặt nền móng cho thịnh vượng?', ['O-răng-dép', 'A-cơ-ba', 'Ba-bua', 'Sa Gia-han'], 1, 'Hoàng đế A-cơ-ba (1556–1605) — vị vua vĩ đại nhất Mô-gôn.',[
      "Vị vua vĩ đại nhất của Vương triều Mô-gôn là <b>A-cơ-ba</b> (1556–1605).",
      "Ông thi hành nhiều chính sách tiến bộ: <ul><li>xây dựng bộ máy nhà nước vững mạnh;</li><li>khuyến khích phát triển kinh tế, văn hoá;</li><li>thực hiện <i>hoà hợp dân tộc, tôn giáo</i> giữa người Hồi và người Hin-đu.</li></ul>",
      "A-cơ-ba đặt nền móng cho thời kì <code>thịnh vượng</code> nhất của Mô-gôn.",
    ],
     ['Sai — O-răng-dép là vua cuối thời thịnh, gắn với suy yếu của Mô-gôn.', 'Đúng — A-cơ-ba (1556–1605) là vị vua vĩ đại nhất, đặt nền móng thịnh vượng.', 'Sai — Ba-bua là người sáng lập, vua vĩ đại nhất là A-cơ-ba.', 'Sai — Sa Gia-han nổi tiếng xây Ta-giơ Ma-han, không phải vua vĩ đại nhất.']),
    Q('Công trình Ta-giơ Ma-han do vua nào xây?', ['Sa Gia-han (xây cho hoàng hậu Mum-tát)', 'A-cơ-ba', 'Ba-bua', 'O-răng-dép'], 0, 'Sa Gia-han xây Taj Mahal làm lăng cho hoàng hậu Mumtaz Mahal.',[
      "<b>Ta-giơ Ma-han</b> (Taj Mahal) là công trình kiến trúc bằng đá cẩm thạch trắng nổi tiếng thế giới, ở Ấn Độ.",
      "Công trình do vua <b>Sa Gia-han</b> cho xây làm <i>lăng mộ</i> cho hoàng hậu <b>Mum-tát</b> (Mumtaz Mahal).",
      "Đây là biểu tượng cho trình độ nghệ thuật rực rỡ của Vương triều Mô-gôn, được UNESCO ghi danh là Di sản thế giới.",
    ],
     ['Đúng — Sa Gia-han xây Ta-giơ Ma-han làm lăng cho hoàng hậu Mum-tát.', 'Sai — A-cơ-ba là vua vĩ đại nhất nhưng không xây Ta-giơ Ma-han.', 'Sai — Ba-bua là người sáng lập triều đại, không xây công trình này.', 'Sai — O-răng-dép không phải người xây Ta-giơ Ma-han.']),
    Q('Tôn giáo do các vua Mô-gôn theo là?', ['Thiên Chúa giáo', 'Phật giáo', 'Hin-đu giáo', 'Hồi giáo'], 3, 'Triều đại Mô-gôn theo Hồi giáo, cai trị đa số người Hin-đu.',[
      "Các vua của Vương triều Mô-gôn theo <b>Hồi giáo</b>.",
      "Tuy nhiên họ cai trị một đất nước mà đa số dân theo <b>Hin-đu giáo</b>. <ul><li>Vì vậy chính sách <i>hoà hợp tôn giáo</i> (như thời A-cơ-ba) rất quan trọng để giữ ổn định.</li><li>Khi các vua sau (như O-răng-dép) đàn áp Hin-đu giáo, mâu thuẫn bùng lên làm vương triều suy yếu.</li></ul>",
      "Đừng nhầm: Hin-đu giáo là tôn giáo của <i>đa số dân</i>, còn các <i>vua</i> Mô-gôn theo Hồi giáo.",
    ],
     ['Sai — các vua Mô-gôn theo Hồi giáo, không phải Thiên Chúa giáo.', 'Sai — Phật giáo phổ biến ở nơi khác; vua Mô-gôn theo Hồi giáo.', 'Sai — Hin-đu giáo là tôn giáo của đa số dân, còn vua Mô-gôn theo Hồi giáo.', 'Đúng — các vua Mô-gôn theo Hồi giáo, cai trị đa số người Hin-đu.']),
  ]),

  M(9, 'Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI', [
    Q('Quốc gia phong kiến nào ở Đông Nam Á phát triển rực rỡ với đền Ăng-co Vát?', ['Cam-pu-chia (Ăng-co)', 'Thái Lan', 'Mi-an-ma', 'In-đô-nê-xi-a'], 0, 'Thời Ăng-co (IX–XV) là thời hoàng kim của Cam-pu-chia.',[
      "Vương quốc <b>Cam-pu-chia</b> bước vào thời kì hoàng kim dưới triều đại <b>Ăng-co</b> (thế kỉ IX–XV).",
      "Đây là thời kì người Khơ-me xây dựng nhiều công trình kì vĩ, tiêu biểu là quần thể đền <b>Ăng-co Vát</b> và <i>Ăng-co Thom</i>.",
      "Phân biệt với các nền văn minh khác: <code>Bô-rô-bu-đua</code> ở In-đô-nê-xi-a, <code>Pa-gan</code> ở Mi-an-ma, <code>Su-khô-thay</code> ở Thái Lan.",
    ],
     ['Đúng — Cam-pu-chia thời Ăng-co (IX–XV) xây đền Ăng-co Vát rực rỡ.', 'Sai — Thái Lan có Su-khô-thay, không phải nơi có Ăng-co Vát.', 'Sai — Mi-an-ma nổi tiếng với Pa-gan, không phải Ăng-co Vát.', 'Sai — In-đô-nê-xi-a có Bô-rô-bu-đua, còn Ăng-co Vát ở Cam-pu-chia.']),
    Q('Vương quốc nào ở In-đô-nê-xi-a hùng mạnh thế kỉ VIII–IX?', ['Mô-gôn', 'Cao Mi-an', 'Sri-vi-giay-a', 'Đại Việt'], 2, 'Sri-vi-giay-a thống trị eo Ma-lắc-ca, khu vực hải đảo.',[
      "Ở vùng hải đảo, vương quốc <b>Sri-vi-giay-a</b> (Sri Vijaya) hùng mạnh trong các thế kỉ <i>VIII–IX</i>.",
      "Sri-vi-giay-a có vị trí then chốt, kiểm soát <b>eo biển Ma-lắc-ca</b> — tuyến hàng hải nối Ấn Độ Dương với Thái Bình Dương. <ul><li>Nhờ đó vương quốc giàu lên nhờ thương mại biển.</li></ul>",
      "Phân biệt: <i>Mô-gôn</i> ở Ấn Độ, <i>Đại Việt</i> là quốc gia của người Việt — không thuộc In-đô-nê-xi-a.",
    ],
     ['Sai — Mô-gôn là vương triều ở Ấn Độ, không phải In-đô-nê-xi-a.', 'Sai — Cao Mi-an không phải vương quốc ở In-đô-nê-xi-a.', 'Đúng — Sri-vi-giay-a thống trị eo Ma-lắc-ca, hùng mạnh thế kỉ VIII–IX.', 'Sai — Đại Việt là quốc gia của người Việt, không ở In-đô-nê-xi-a.']),
    Q('Đế quốc Pa-gan ở quốc gia nào hiện nay?', ['Lào (quê hương Vương quốc Lan Xang)', 'Thái Lan', 'Mi-an-ma (Myanmar)', 'Việt Nam'], 2, 'Pa-gan (Bagan) là đế quốc đầu tiên thống nhất Myanmar.',[
      "Đế quốc <b>Pa-gan</b> (Bagan) là vương quốc đầu tiên thống nhất phần lớn lãnh thổ <b>Mi-an-ma</b> (Myanmar) từ thế kỉ XI.",
      "Pa-gan nổi tiếng với hàng nghìn ngôi <i>chùa, tháp Phật giáo</i> trên đồng bằng sông I-ra-oa-đi.",
      "Phân biệt: <i>Lan Xang</i> ở Lào, <i>Su-khô-thay</i> ở Thái Lan, đều khác với Pa-gan của Mi-an-ma.",
    ],
     ['Sai — Lào gắn với Vương quốc Lan Xang, không phải Pa-gan.', 'Sai — Thái Lan có Su-khô-thay, không phải Pa-gan.', 'Đúng — Pa-gan là đế quốc đầu tiên thống nhất Mi-an-ma (Myanmar).', 'Sai — Pa-gan ở Mi-an-ma chứ không phải Việt Nam.']),
    Q('Đặc điểm chung của các quốc gia phong kiến Đông Nam Á trung đại?', ['Nông nghiệp lúa nước, ảnh hưởng văn hoá Ấn Độ và Trung Quốc', 'Hàng hải xuyên Đại Tây Dương', 'Công nghiệp nặng', 'Du mục thảo nguyên'], 0, 'Nông nghiệp lúa nước + ảnh hưởng văn hoá Ấn — Trung là đặc trưng chung.',[
      "Các quốc gia phong kiến Đông Nam Á thời trung đại có những đặc điểm chung:",
      "<ul><li>Nền kinh tế dựa trên <b>nông nghiệp lúa nước</b>.</li><li>Chịu ảnh hưởng sâu sắc của văn hoá <b>Ấn Độ</b> (tôn giáo, chữ viết, kiến trúc) và văn hoá <b>Trung Quốc</b>.</li></ul>",
      "Trên cơ sở đó, mỗi dân tộc lại sáng tạo nên bản sắc văn hoá riêng. Đông Nam Á vì thế thường được gọi là khu vực \"thống nhất trong đa dạng\".",
    ],
     ['Đúng — ĐNA trung đại làm nông nghiệp lúa nước, ảnh hưởng văn hoá Ấn — Trung.', 'Sai — hàng hải xuyên Đại Tây Dương là của châu Âu cận đại.', 'Sai — công nghiệp nặng là đặc điểm thời hiện đại, không phải ĐNA trung đại.', 'Sai — du mục thảo nguyên là của vùng Trung Á, không phải ĐNA.']),
    Q('Đền Bô-rô-bu-đua là công trình Phật giáo nổi tiếng ở?', ['Ấn Độ (nơi khởi nguồn Phật giáo)', 'Cam-pu-chia', 'In-đô-nê-xi-a (đảo Gia-va)', 'Việt Nam'], 2, 'Borobudur ở đảo Java, In-đô-nê-xi-a — di sản UNESCO.',[
      "<b>Bô-rô-bu-đua</b> (Borobudur) là công trình <i>Phật giáo</i> đồ sộ ở đảo <b>Gia-va</b>, <b>In-đô-nê-xi-a</b>, xây dựng khoảng thế kỉ VIII–IX.",
      "Đây là một trong những ngôi đền — bảo tháp Phật giáo lớn nhất thế giới, được UNESCO công nhận là Di sản thế giới.",
      "Phân biệt: Phật giáo <i>khởi nguồn</i> ở Ấn Độ, nhưng công trình Bô-rô-bu-đua nằm ở In-đô-nê-xi-a; còn <code>Ăng-co Vát</code> ở Cam-pu-chia.",
    ],
     ['Sai — Phật giáo khởi nguồn ở Ấn Độ nhưng Bô-rô-bu-đua ở In-đô-nê-xi-a.', 'Sai — Cam-pu-chia có Ăng-co Vát, còn Bô-rô-bu-đua ở In-đô-nê-xi-a.', 'Đúng — Bô-rô-bu-đua ở đảo Gia-va, In-đô-nê-xi-a, di sản UNESCO.', 'Sai — Bô-rô-bu-đua ở In-đô-nê-xi-a chứ không phải Việt Nam.']),
  ]),

  M(10, 'Việt Nam từ Khúc Thừa Dụ đến Ngô Quyền', [
    Q('Năm 905, Khúc Thừa Dụ đã làm gì?', ['Đánh bại quân Tống', 'Lập nhà Lý', 'Tự xưng Tiết độ sứ, giành quyền tự chủ', 'Dời đô về Thăng Long'], 2, 'Khúc Thừa Dụ đánh dấu bước đầu giành quyền tự chủ từ tay nhà Đường.',[
      "Năm <b>905</b>, nhân lúc nhà Đường suy yếu, <b>Khúc Thừa Dụ</b> nổi dậy chiếm thành Tống Bình (Hà Nội), <i>tự xưng Tiết độ sứ</i>.",
      "Nhà Đường buộc phải công nhận, đánh dấu bước đầu nhân dân ta <b>giành quyền tự chủ</b> sau hơn nghìn năm Bắc thuộc.",
      "Đây là tiền đề quan trọng để Ngô Quyền giành độc lập hoàn toàn năm 938.",
    ],
     ['Sai — đánh bại quân Tống là việc của Lê Hoàn (981) và nhà Lý (1077).', 'Sai — nhà Lý do Lý Công Uẩn lập năm 1010, không phải Khúc Thừa Dụ.', 'Đúng — năm 905 Khúc Thừa Dụ tự xưng Tiết độ sứ, giành quyền tự chủ.', 'Sai — dời đô về Thăng Long là việc của Lý Công Uẩn năm 1010.']),
    Q('Người kế tục Khúc Thừa Dụ cải cách hành chính, đặt nền tự chủ là?', ['Dương Đình Nghệ', 'Đinh Bộ Lĩnh', 'Khúc Hạo', 'Ngô Quyền'], 2, 'Khúc Hạo thực hiện nhiều cải cách quan trọng.',[
      "Người kế tục sự nghiệp tự chủ của Khúc Thừa Dụ là con ông — <b>Khúc Hạo</b>.",
      "Khúc Hạo tiến hành nhiều <b>cải cách hành chính</b> quan trọng: <ul><li>chia lại các đơn vị hành chính;</li><li>định lại tô thuế, lập sổ hộ khẩu;</li><li>chủ trương \"chính sự cốt chuộng khoan dung, giản dị, nhân dân đều được yên vui\".</li></ul>",
      "Những cải cách đó củng cố nền tự chủ vừa giành được. Phân biệt: <i>Dương Đình Nghệ</i> giành lại quyền tự chủ sau khi nhà Khúc mất, còn <i>Ngô Quyền</i> gắn với chiến thắng Bạch Đằng.",
    ],
     ['Sai — Dương Đình Nghệ là tướng giành quyền sau, không phải người cải cách kế tục Khúc Thừa Dụ.', 'Sai — Đinh Bộ Lĩnh dẹp loạn 12 sứ quân muộn hơn nhiều.', 'Đúng — Khúc Hạo kế tục, cải cách hành chính, đặt nền tự chủ.', 'Sai — Ngô Quyền gắn với chiến thắng Bạch Đằng 938, không phải cải cách hành chính.']),
    Q('Năm 938, Ngô Quyền đánh bại quân nào trên sông Bạch Đằng?', ['Nam Hán', 'Quân Minh (bị Lê Lợi đánh bại năm 1427)', 'Nguyên', 'Quân Tống (bị chặn ở sông Như Nguyệt 1077)'], 0, 'Ngô Quyền đánh tan quân Nam Hán năm 938.',[
      "Năm <b>938</b>, quân <b>Nam Hán</b> kéo sang xâm lược nước ta.",
      "<b>Ngô Quyền</b> chỉ huy quân dân ta bố trí trận địa <i>cọc ngầm</i> trên sông <b>Bạch Đằng</b>, lợi dụng thuỷ triều, đánh tan đạo quân xâm lược.",
      "Phân biệt với các mốc khác: quân <i>Minh</i> bị Lê Lợi đánh bại (1427), quân <i>Nguyên</i> thất bại thời Trần, quân <i>Tống</i> bị chặn ở Như Nguyệt (1077).",
    ],
     ['Đúng — năm 938 Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng.', 'Sai — quân Minh bị Lê Lợi đánh bại năm 1427, không phải năm 938.', 'Sai — quân Nguyên bị nhà Trần đánh bại thế kỉ XIII.', 'Sai — quân Tống bị Lý Thường Kiệt chặn ở Như Nguyệt năm 1077.']),
    Q('Kế đánh giặc nổi tiếng của Ngô Quyền là?', ['Đốt rừng', 'Đóng cọc nhọn đầu bịt sắt ở cửa sông Bạch Đằng', 'Đào hào quanh thành', 'Dùng voi chiến'], 1, 'Cọc Bạch Đằng — sáng tạo quân sự đặc sắc của Ngô Quyền.',[
      "Kế đánh giặc nổi tiếng của Ngô Quyền là <b>đóng cọc nhọn bịt sắt</b> dưới lòng sông Bạch Đằng.",
      "Cách đánh: <ul><li>nhử thuyền giặc vào khi thuỷ triều lên;</li><li>khi triều rút, thuyền giặc va vào bãi cọc, vỡ và đắm;</li><li>quân ta đổ ra đánh, tiêu diệt phần lớn quân Nam Hán.</li></ul>",
      "Đây là một sáng tạo quân sự đặc sắc, sau này được nhà Trần kế thừa và phát triển trên chính sông Bạch Đằng (1288).",
    ],
     ['Sai — Ngô Quyền dùng cọc ngầm trên sông, không phải đốt rừng.', 'Đúng — Ngô Quyền đóng cọc nhọn bịt sắt ở cửa sông Bạch Đằng.', 'Sai — đào hào quanh thành không phải kế của Ngô Quyền ở Bạch Đằng.', 'Sai — kế nổi tiếng là bãi cọc ngầm, không phải voi chiến.']),
    Q('Ý nghĩa chiến thắng Bạch Đằng 938?', ['Mở đầu Bắc thuộc', 'Không có ý nghĩa', 'Là thất bại', 'Chấm dứt hơn 1000 năm Bắc thuộc, mở thời kì độc lập lâu dài'], 3, 'Bạch Đằng 938 chấm dứt Bắc thuộc, mở kỉ nguyên độc lập tự chủ.',[
      "Chiến thắng <b>Bạch Đằng năm 938</b> có ý nghĩa lịch sử trọng đại.",
      "<ul><li><b>Chấm dứt hơn 1000 năm Bắc thuộc</b>.</li><li>Mở ra thời kì <b>độc lập, tự chủ lâu dài</b> cho dân tộc.</li><li>Khẳng định ý chí và sức mạnh của nhân dân ta.</li></ul>",
      "Vì vậy, Bạch Đằng 938 được coi là một <code>mốc son</code> chói lọi, mở đầu kỉ nguyên độc lập của Việt Nam.",
    ],
     ['Sai — Bạch Đằng 938 kết thúc chứ không mở đầu Bắc thuộc.', 'Sai — đây là chiến thắng có ý nghĩa lịch sử trọng đại.', 'Sai — đây là chiến thắng vĩ đại, không phải thất bại.', 'Đúng — Bạch Đằng 938 chấm dứt hơn 1000 năm Bắc thuộc, mở thời độc lập.']),
  ]),

  M(11, 'Nhà Đinh và Tiền Lê', [
    Q('Đinh Bộ Lĩnh dẹp loạn nào để thống nhất đất nước?', ['Loạn 3 vua', 'Loạn 12 sứ quân', 'Loạn An Sử', 'Loạn Hồng Bàng'], 1, 'Đinh Bộ Lĩnh dẹp 12 sứ quân, lập nước Đại Cồ Việt năm 968.',[
      "Sau khi Ngô Quyền mất, đất nước rơi vào <b>loạn 12 sứ quân</b> — các thế lực cát cứ tranh giành.",
      "<b>Đinh Bộ Lĩnh</b> đã lần lượt đánh dẹp, thống nhất đất nước, lập nên nước <b>Đại Cồ Việt</b> năm <b>968</b>.",
      "Ông được suy tôn là <i>Đinh Tiên Hoàng</i> — vị hoàng đế đầu tiên của nước ta.",
    ],
     ['Sai — không có "loạn 3 vua"; Đinh Bộ Lĩnh dẹp loạn 12 sứ quân.', 'Đúng — Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước.', 'Sai — loạn An Sử xảy ra ở Trung Quốc thời Đường, không ở nước ta.', 'Sai — Hồng Bàng là thời đại truyền thuyết, không phải loạn cần dẹp.']),
    Q('Quốc hiệu Đại Cồ Việt ra đời năm?', ['938', '1428', '968', '1010'], 2, 'Năm 968, Đinh Bộ Lĩnh lên ngôi, đặt tên nước Đại Cồ Việt.',[
      "Năm <b>968</b>, sau khi dẹp loạn 12 sứ quân, Đinh Bộ Lĩnh lên ngôi Hoàng đế, đặt quốc hiệu là <b>Đại Cồ Việt</b> (nghĩa là \"nước Việt lớn\").",
      "Đây là <i>quốc hiệu</i> đầu tiên thể hiện ý thức độc lập, ngang hàng với phương Bắc. <ul><li>Kinh đô đặt ở Hoa Lư (Ninh Bình).</li></ul>",
      "Phân biệt mốc: <code>938</code> (Bạch Đằng), <code>1010</code> (dời đô Thăng Long), <code>1428</code> (lập nhà Lê sơ).",
    ],
     ['Sai — 938 là năm chiến thắng Bạch Đằng của Ngô Quyền.', 'Sai — 1428 là năm Lê Lợi lập nhà Lê sơ.', 'Đúng — năm 968 Đinh Bộ Lĩnh lên ngôi, đặt quốc hiệu Đại Cồ Việt.', 'Sai — 1010 là năm Lý Công Uẩn dời đô về Thăng Long.']),
    Q('Kinh đô của nhà Đinh — Tiền Lê đặt ở đâu?', ['Hoa Lư (Ninh Bình)', 'Cổ Loa', 'Thăng Long', 'Phú Xuân (kinh đô nhà Nguyễn sau này)'], 0, 'Hoa Lư — kinh đô tự nhiên hiểm yếu.',[
      "Kinh đô của nhà <b>Đinh</b> và <b>Tiền Lê</b> đặt ở <b>Hoa Lư</b> (Ninh Bình).",
      "Hoa Lư có địa thế <i>hiểm yếu</i>, núi non bao bọc như bức tường thành tự nhiên, thuận lợi cho việc <b>phòng thủ</b> khi đất nước mới giành độc lập còn nhiều bất ổn.",
      "Phải đến năm 1010, Lý Công Uẩn mới dời đô từ Hoa Lư về <code>Thăng Long</code> để mở rộng phát triển.",
    ],
     ['Đúng — nhà Đinh — Tiền Lê đóng đô ở Hoa Lư (Ninh Bình), địa thế hiểm yếu.', 'Sai — Cổ Loa là kinh đô thời An Dương Vương và Ngô Quyền.', 'Sai — Thăng Long là kinh đô từ thời Lý (1010), muộn hơn.', 'Sai — Phú Xuân là kinh đô nhà Nguyễn về sau, không phải Đinh — Tiền Lê.']),
    Q('Vị vua nào lập ra nhà Tiền Lê, đánh bại quân Tống xâm lược năm 981?', ['Trần Hưng Đạo', 'Đinh Bộ Lĩnh', 'Lê Hoàn (Lê Đại Hành)', 'Lý Thường Kiệt'], 2, 'Lê Hoàn lên ngôi, đại phá quân Tống trên sông Bạch Đằng 981.',[
      "Năm 979, Đinh Tiên Hoàng bị sát hại; trước nguy cơ quân <b>Tống</b> xâm lược, triều thần tôn <b>Lê Hoàn</b> lên ngôi, lập <b>nhà Tiền Lê</b>.",
      "Năm <b>981</b>, Lê Hoàn (Lê Đại Hành) lãnh đạo quân dân <i>đánh bại quân Tống</i>, bảo vệ vững chắc nền độc lập.",
      "Phân biệt: <i>Đinh Bộ Lĩnh</i> lập nhà Đinh; <i>Lý Thường Kiệt</i> chống Tống năm 1077 dưới thời Lý; <i>Trần Hưng Đạo</i> chống Nguyên thời Trần.",
    ],
     ['Sai — Trần Hưng Đạo chống quân Nguyên thế kỉ XIII, không lập Tiền Lê.', 'Sai — Đinh Bộ Lĩnh lập nhà Đinh, không phải nhà Tiền Lê.', 'Đúng — Lê Hoàn (Lê Đại Hành) lập Tiền Lê, đánh bại quân Tống năm 981.', 'Sai — Lý Thường Kiệt chống Tống năm 1077 dưới thời Lý.']),
    Q('Đóng góp của nhà Đinh — Tiền Lê?', ['Đầu hàng nhà Tống', 'Mở rộng Bắc thuộc', 'Suy yếu đất nước', 'Củng cố nền độc lập, thống nhất đất nước, đánh bại Tống'], 3, 'Đinh — Tiền Lê đặt nền móng vững chắc cho độc lập dân tộc.',[
      "Nhà <b>Đinh — Tiền Lê</b> có nhiều đóng góp quan trọng cho lịch sử dân tộc:",
      "<ul><li><b>Thống nhất</b> đất nước (dẹp loạn 12 sứ quân).</li><li><b>Củng cố nền độc lập</b>, xây dựng bộ máy nhà nước quân chủ đầu tiên.</li><li><b>Đánh bại quân Tống</b> (981), bảo vệ chủ quyền.</li></ul>",
      "Nhờ đó, nhà Đinh — Tiền Lê đặt nền móng vững chắc cho thời kì độc lập tự chủ tiếp theo của các triều Lý, Trần.",
    ],
     ['Sai — Tiền Lê đánh bại quân Tống năm 981 chứ không đầu hàng.', 'Sai — Đinh — Tiền Lê củng cố độc lập, không mở rộng Bắc thuộc.', 'Sai — Đinh — Tiền Lê làm đất nước mạnh lên chứ không suy yếu.', 'Đúng — Đinh — Tiền Lê củng cố độc lập, thống nhất đất nước, đánh bại Tống.']),
  ]),

  M(12, 'Nhà Lý xây dựng và phát triển đất nước', [
    Q('Năm 1010, Lý Công Uẩn dời đô từ Hoa Lư về?', ['Phú Xuân (kinh đô nhà Nguyễn từ 1802)', 'Đại La (đổi tên thành Thăng Long)', 'Phú Xuân', 'Cổ Loa'], 1, 'Năm 1010, Lý Thái Tổ dời đô về Đại La, đổi tên Thăng Long.',[
      "Năm <b>1009</b>, Lý Công Uẩn lên ngôi, lập ra <b>nhà Lý</b>.",
      "Năm <b>1010</b>, ông quyết định dời đô từ <b>Hoa Lư</b> ra <b>thành Đại La</b> và đổi tên thành <b>Thăng Long</b> (\"rồng bay lên\").",
      "Việc dời đô thể hiện tầm nhìn chiến lược: Thăng Long ở vùng đồng bằng trung tâm, thuận lợi cho việc phát triển lâu dài của đất nước. Sự kiện được ghi trong <i>Chiếu dời đô</i>.",
    ],
     ['Sai — Phú Xuân là kinh đô nhà Nguyễn từ 1802, không phải thời Lý.', 'Đúng — năm 1010 Lý Công Uẩn dời đô về Đại La, đổi tên Thăng Long.', 'Sai — Phú Xuân gắn với nhà Nguyễn, không phải nơi Lý dời đô.', 'Sai — Cổ Loa là kinh đô thời An Dương Vương, không phải thời Lý.']),
    Q('Quốc hiệu nhà Lý đặt từ năm 1054 là?', ['Đại Cồ Việt', 'Đại Việt', 'Việt Nam', 'Đại Nam'], 1, 'Năm 1054, Lý Thánh Tông đổi quốc hiệu thành Đại Việt.',[
      "Năm <b>1054</b>, vua <b>Lý Thánh Tông</b> đổi quốc hiệu từ Đại Cồ Việt thành <b>Đại Việt</b>.",
      "Quốc hiệu <b>Đại Việt</b> được sử dụng lâu dài qua nhiều triều đại (Lý, Trần, Lê...), thể hiện ý thức về một quốc gia độc lập, hùng cường.",
      "Phân biệt: <i>Đại Cồ Việt</i> (thời Đinh — Tiền Lê), <i>Việt Nam</i> (1804, thời Gia Long), <i>Đại Nam</i> (thời Minh Mạng).",
    ],
     ['Sai — Đại Cồ Việt là quốc hiệu thời Đinh — Tiền Lê, trước nhà Lý.', 'Đúng — năm 1054 Lý Thánh Tông đổi quốc hiệu thành Đại Việt.', 'Sai — Việt Nam là quốc hiệu thời Gia Long (1804), muộn hơn.', 'Sai — Đại Nam là quốc hiệu thời Minh Mạng, không phải thời Lý.']),
    Q('Văn Miếu — Quốc Tử Giám lập thời Lý nhằm?', ['Lập kho lương', 'Trại lính', 'Thờ Khổng Tử và đào tạo nhân tài', 'Thờ Phật'], 2, 'Văn Miếu (1070), Quốc Tử Giám (1076) — trường đại học đầu tiên VN.',[
      "Năm <b>1070</b>, nhà Lý cho xây <b>Văn Miếu</b> ở Thăng Long để <i>thờ Khổng Tử</i> và các bậc tiên hiền.",
      "Năm <b>1076</b>, lập <b>Quốc Tử Giám</b> — được coi là <b>trường đại học đầu tiên</b> của nước ta, nơi đào tạo nhân tài cho đất nước.",
      "Đây là dấu mốc quan trọng cho thấy nhà Lý rất coi trọng <code>giáo dục</code> và Nho học.",
    ],
     ['Sai — Văn Miếu là nơi học hành, không phải kho lương.', 'Sai — đây là cơ sở giáo dục, không phải trại lính.', 'Đúng — Văn Miếu — Quốc Tử Giám thờ Khổng Tử và đào tạo nhân tài.', 'Sai — thờ Phật là chùa, còn Văn Miếu thờ Khổng Tử (Nho học).']),
    Q('Bộ luật thành văn đầu tiên của nước ta là?', ['Hình thư (thời Lý)', 'Gia Long', 'Hồng Đức', 'Hà Nội'], 0, 'Bộ Hình thư ban hành thời Lý Thái Tông (1042).',[
      "Năm <b>1042</b>, dưới thời <i>Lý Thái Tông</i>, nhà Lý ban hành bộ <b>Hình thư</b>.",
      "<b>Hình thư</b> là bộ <i>luật thành văn đầu tiên</i> của nước ta, đánh dấu bước tiến trong việc xây dựng nhà nước pháp quyền phong kiến.",
      "Phân biệt với các bộ luật sau: <i>Quốc triều hình luật</i> (thời Trần — Lê), <i>luật Hồng Đức</i> (Lê sơ), <i>luật Gia Long</i> (Nguyễn, 1815).",
    ],
     ['Đúng — Hình thư (thời Lý, 1042) là bộ luật thành văn đầu tiên của nước ta.', 'Sai — Luật Gia Long ban hành thời Nguyễn (1815), muộn hơn nhiều.', 'Sai — Luật Hồng Đức là thời Lê sơ, không phải bộ luật đầu tiên.', 'Sai — Hà Nội là địa danh, không phải tên một bộ luật.']),
    Q('Lý Thường Kiệt nổi tiếng với bài thơ thần?', ['"Hịch tướng sĩ"', '"Nam quốc sơn hà"', '"Bình Ngô đại cáo"', '"Truyện Kiều"'], 1, 'Bài thơ "Nam quốc sơn hà" — bản tuyên ngôn độc lập đầu tiên.',[
      "Trong cuộc kháng chiến chống Tống (1077), tương truyền <b>Lý Thường Kiệt</b> cho người ngâm vang bài thơ thần <b>\"Nam quốc sơn hà\"</b> ở đền bên sông Như Nguyệt.",
      "Bài thơ khẳng định chủ quyền: \"Sông núi nước Nam vua Nam ở\" — được coi là <b>bản Tuyên ngôn độc lập đầu tiên</b> của dân tộc.",
      "Phân biệt: <i>\"Hịch tướng sĩ\"</i> (Trần Hưng Đạo), <i>\"Bình Ngô đại cáo\"</i> (Nguyễn Trãi), <i>\"Truyện Kiều\"</i> (Nguyễn Du) — thuộc thời kì và tác giả khác.",
    ],
     ['Sai — "Hịch tướng sĩ" là của Trần Hưng Đạo thời chống Nguyên.', 'Đúng — Lý Thường Kiệt gắn với bài thơ thần "Nam quốc sơn hà".', 'Sai — "Bình Ngô đại cáo" là của Nguyễn Trãi thời Lê sơ.', 'Sai — "Truyện Kiều" là của Nguyễn Du, một tác phẩm văn học.']),
  ]),

  M(13, 'Cuộc kháng chiến chống Tống thời Lý (1075–1077)', [
    Q('Lý Thường Kiệt chủ trương "tiên phát chế nhân" nghĩa là?', ['Đầu hàng trước', 'Đợi địch tới mới đánh', 'Cầu hoà ngay lập tức', 'Chủ động tấn công trước để chế ngự địch'], 3, '"Tiên phát chế nhân" — đánh phủ đầu để chế ngự kẻ địch.',[
      "Trước nguy cơ quân Tống chuẩn bị xâm lược, <b>Lý Thường Kiệt</b> chủ trương <b>\"tiên phát chế nhân\"</b>.",
      "\"Tiên phát chế nhân\" nghĩa là <i>chủ động tấn công trước</i> để giành thế chủ động, chế ngự kẻ địch — \"ngồi yên đợi giặc không bằng đem quân đánh trước để chặn mũi nhọn của giặc\".",
      "Đây là một tư tưởng quân sự <code>táo bạo</code> và sáng tạo, không phải hành động xâm lược mà nhằm tự vệ chủ động.",
    ],
     ['Sai — "tiên phát chế nhân" là chủ động tấn công, không phải đầu hàng.', 'Sai — chủ trương này là đánh trước, không đợi địch tới.', 'Sai — đây là chủ trương đánh phủ đầu, không phải cầu hoà.', 'Đúng — "tiên phát chế nhân" là chủ động tấn công trước để chế ngự địch.']),
    Q('Năm 1075, Lý Thường Kiệt tấn công vào căn cứ nào của Tống?', ['Hà Khẩu', 'Mê Linh', 'Châu Ung, châu Khâm, châu Liêm (Trung Quốc)', 'Hà Nội'], 2, 'Đánh sang đất Tống — chiến lược tấn công bất ngờ.',[
      "Thực hiện kế \"tiên phát chế nhân\", năm <b>1075</b> Lý Thường Kiệt đem quân tấn công sang đất Tống.",
      "Mục tiêu là các căn cứ tập trung lương thảo, vũ khí của Tống: <b>châu Ung</b>, <b>châu Khâm</b>, <b>châu Liêm</b>.",
      "Sau khi phá huỷ các kho tàng đó, quân ta chủ động rút về nước để chuẩn bị phòng thủ — làm chậm và làm yếu cuộc xâm lược của Tống.",
    ],
     ['Sai — Hà Khẩu không phải mục tiêu của cuộc tập kích năm 1075.', 'Sai — Mê Linh gắn với khởi nghĩa Hai Bà Trưng, không phải đất Tống.', 'Đúng — năm 1075 Lý Thường Kiệt đánh châu Ung, châu Khâm, châu Liêm trên đất Tống.', 'Sai — Hà Nội thuộc Đại Việt, không phải căn cứ của Tống.']),
    Q('Phòng tuyến nào chặn đại quân Tống năm 1077?', ['Sông Bạch Đằng', 'Sông Hồng', 'Sông Đà', 'Sông Như Nguyệt (sông Cầu)'], 3, 'Phòng tuyến Như Nguyệt — kì tích của Lý Thường Kiệt.',[
      "Năm <b>1077</b>, đại quân Tống tràn sang. Lý Thường Kiệt cho xây dựng <b>phòng tuyến sông Như Nguyệt</b> (sông Cầu) để chặn giặc.",
      "Phòng tuyến này: <ul><li>chắn ngang con đường tiến về Thăng Long;</li><li>là nơi diễn ra những trận chiến quyết định, đập tan ý chí xâm lược của quân Tống.</li></ul>",
      "Phân biệt: <i>Bạch Đằng</i> gắn với Ngô Quyền (938) và nhà Trần (1288); còn <b>Như Nguyệt</b> là phòng tuyến chống Tống thời Lý.",
    ],
     ['Sai — Bạch Đằng gắn với Ngô Quyền (938) và nhà Trần (1288).', 'Sai — phòng tuyến chống Tống 1077 lập trên sông Như Nguyệt, không phải sông Hồng.', 'Sai — sông Đà không phải nơi lập phòng tuyến chống Tống.', 'Đúng — phòng tuyến sông Như Nguyệt (sông Cầu) chặn đại quân Tống năm 1077.']),
    Q('Sau chiến thắng, Lý Thường Kiệt làm gì?', ['Đầu hàng', 'Dời đô', 'Tiếp tục đánh sâu vào Tống', 'Chủ động giảng hoà, để giữ quan hệ ổn định'], 3, 'Sau khi chiến thắng, ông chủ động giảng hoà để giữ hoà bình lâu dài.',[
      "Sau khi quân Tống bị tổn thất nặng ở phòng tuyến Như Nguyệt, <b>Lý Thường Kiệt</b> không truy đuổi tiêu diệt mà chủ động <b>\"giảng hoà\"</b>.",
      "Cách kết thúc chiến tranh này nhằm: <ul><li>tránh tổn thất xương máu cho cả hai bên;</li><li>giữ <i>quan hệ hoà hiếu</i> lâu dài với nhà Tống;</li><li>giữ thể diện cho nước lớn, bảo đảm hoà bình bền vững.</li></ul>",
      "Đây là nét đặc sắc trong nghệ thuật <code>kết thúc chiến tranh</code> của ông cha ta — đánh để bảo vệ độc lập, rồi chủ động hoà để giữ hoà bình.",
    ],
     ['Sai — ông chiến thắng nên không đầu hàng.', 'Sai — dời đô không liên quan tới cuộc kháng chiến chống Tống.', 'Sai — ông chủ động giảng hoà chứ không đánh sâu vào đất Tống.', 'Đúng — sau chiến thắng, Lý Thường Kiệt chủ động giảng hoà giữ quan hệ ổn định.']),
    Q('Ý nghĩa cuộc kháng chiến chống Tống 1075–1077?', ['Phải cống nạp Tống', 'Thất bại', 'Mất một phần đất', 'Bảo vệ độc lập, khẳng định sức mạnh Đại Việt'], 3, 'Đại Việt khẳng định mạnh mẽ chủ quyền trước nhà Tống.',[
      "Cuộc kháng chiến chống Tống <b>1075–1077</b> giành thắng lợi vẻ vang.",
      "Ý nghĩa: <ul><li><b>Bảo vệ vững chắc nền độc lập</b>, chủ quyền của Đại Việt.</li><li>Khẳng định <b>sức mạnh và ý chí</b> của dân tộc ta trước một đế chế lớn.</li><li>Buộc nhà Tống từ bỏ mộng xâm lược Đại Việt.</li></ul>",
      "Thắng lợi này gắn liền với tài thao lược của <i>Lý Thường Kiệt</i> và tinh thần đoàn kết của quân dân Đại Việt.",
    ],
     ['Sai — Đại Việt chiến thắng, không phải cống nạp Tống.', 'Sai — đây là cuộc kháng chiến thắng lợi, không phải thất bại.', 'Sai — Đại Việt giữ vững lãnh thổ, không mất đất.', 'Đúng — cuộc kháng chiến bảo vệ độc lập, khẳng định sức mạnh Đại Việt.']),
  ]),

  M(14, 'Nhà Trần xây dựng đất nước', [
    Q('Nhà Trần được thành lập năm?', ['1226', '1400', '1010', '1428'], 0, 'Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh năm 1226.',[
      "Cuối thế kỉ XII, nhà Lý suy yếu. Năm <b>1226</b>, <b>Lý Chiêu Hoàng</b> nhường ngôi cho chồng là <b>Trần Cảnh</b>, lập ra <b>nhà Trần</b>.",
      "Sự chuyển giao này diễn ra tương đối êm thấm, do Trần Thủ Độ sắp đặt.",
      "Phân biệt các mốc: <code>1010</code> (lập nhà Lý, dời đô), <code>1400</code> (lập nhà Hồ), <code>1428</code> (lập nhà Lê sơ).",
    ],
     ['Đúng — năm 1226 Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh, lập nhà Trần.', 'Sai — 1400 là năm Hồ Quý Ly lập nhà Hồ.', 'Sai — 1010 là năm Lý Công Uẩn lập nhà Lý dời đô.', 'Sai — 1428 là năm Lê Lợi lập nhà Lê sơ.']),
    Q('Người đặt nền móng cho nhà Trần là?', ['Trần Nhân Tông', 'Trần Quang Khải', 'Trần Hưng Đạo', 'Trần Thủ Độ'], 3, 'Trần Thủ Độ là kiến trúc sư của triều Trần.',[
      "Người có vai trò quyết định trong việc thành lập và đặt nền móng cho nhà Trần là <b>Trần Thủ Độ</b>.",
      "Ông là người sắp đặt việc chuyển giao ngôi báu, củng cố quyền lực, được coi là <i>\"kiến trúc sư\"</i> của triều Trần.",
      "Phân biệt: <i>Trần Hưng Đạo</i>, <i>Trần Quang Khải</i>, <i>Trần Nhân Tông</i> là những nhân vật gắn với cuộc kháng chiến chống Mông — Nguyên về sau.",
    ],
     ['Sai — Trần Nhân Tông là vua thời chống Nguyên, không phải người lập nền móng.', 'Sai — Trần Quang Khải là tướng thời chống Nguyên, không lập nền móng triều Trần.', 'Sai — Trần Hưng Đạo là danh tướng chống Nguyên, không phải người đặt nền móng.', 'Đúng — Trần Thủ Độ là kiến trúc sư, đặt nền móng cho nhà Trần.']),
    Q('Chế độ "Thái thượng hoàng" của nhà Trần nghĩa là?', ['Vua sống ẩn dật', 'Vua không có quyền', 'Vua sống ở Trung Quốc', 'Vua cha truyền ngôi cho con, ở phía sau cùng trị vì'], 3, 'Vua cha nhường ngôi nhưng vẫn cùng coi sóc triều chính.',[
      "Nhà Trần thực hiện chế độ <b>Thái thượng hoàng</b> độc đáo.",
      "Theo đó, vua cha khi còn khoẻ thường <i>truyền ngôi</i> sớm cho con, lên làm <b>Thái thượng hoàng</b> nhưng vẫn cùng vua mới <b>coi sóc triều chính</b>. <ul><li>Vừa rèn luyện vua mới, vừa tránh tranh chấp ngôi báu.</li></ul>",
      "Đây là một biện pháp giúp nhà Trần giữ ổn định chính trị trong thời kì đầu.",
    ],
     ['Sai — Thái thượng hoàng vẫn coi sóc triều chính, không ẩn dật.', 'Sai — Thái thượng hoàng vẫn có quyền lực cùng vua mới.', 'Sai — Thái thượng hoàng ở Đại Việt, không sống ở Trung Quốc.', 'Đúng — vua cha truyền ngôi cho con nhưng vẫn ở phía sau cùng trị vì.']),
    Q('Bộ luật nào ban hành thời Trần?', ['Hình thư', 'Quốc triều hình luật', 'Hồng Đức', 'Gia Long'], 1, 'Quốc triều hình luật ban hành dưới triều Trần.',[
      "Về luật pháp, nhà Trần ban hành bộ <b>Quốc triều hình luật</b>.",
      "Bộ luật này kế thừa và phát triển từ Hình thư thời Lý, củng cố trật tự xã hội và bảo vệ chế độ phong kiến.",
      "Phân biệt: <i>Hình thư</i> (Lý), <i>luật Hồng Đức</i> (Lê sơ), <i>luật Gia Long</i> (Nguyễn) — mỗi bộ gắn với một triều đại khác nhau.",
    ],
     ['Sai — Hình thư là bộ luật thời Lý, không phải thời Trần.', 'Đúng — Quốc triều hình luật ban hành dưới triều Trần.', 'Sai — Luật Hồng Đức là thời Lê sơ.', 'Sai — Luật Gia Long là thời Nguyễn.']),
    Q('Nhà Trần có cải cách nông nghiệp nào nổi bật?', ['Phá hết đê điều', 'Lấp sông Hồng', 'Đắp đê Đỉnh nhĩ (đê quai vạc) dọc các sông lớn', 'Cấm trồng lúa'], 2, 'Hệ thống đê Đỉnh nhĩ giúp trị thuỷ và mở rộng diện tích trồng lúa.',[
      "Để phát triển nông nghiệp và trị thuỷ, nhà Trần cho đắp hệ thống <b>đê Đỉnh nhĩ</b> (đê quai vạc) dọc các con sông lớn.",
      "Nhà Trần còn lập chức <i>Hà đê sứ</i> chuyên trông coi việc đê điều. <ul><li>Hệ thống đê giúp chống lũ lụt;</li><li>mở rộng diện tích trồng lúa, phát triển nông nghiệp.</li></ul>",
      "Đây là một thành tựu lớn về <code>thuỷ lợi</code> của nhà Trần.",
    ],
     ['Sai — nhà Trần đắp đê để trị thuỷ, không phá đê điều.', 'Sai — nhà Trần đắp đê chứ không lấp sông Hồng.', 'Đúng — nhà Trần đắp đê Đỉnh nhĩ (đê quai vạc) dọc các sông lớn.', 'Sai — nhà Trần khuyến khích trồng lúa chứ không cấm.']),
  ]),

  M(15, 'Ba lần kháng chiến chống Mông — Nguyên (XIII)', [
    Q('Quân Mông Cổ — Nguyên xâm lược Đại Việt mấy lần?', ['5 lần', '1 lần', '3 lần (1258, 1285, 1287–1288)', '2 lần'], 2, 'Ba cuộc xâm lược: 1258, 1285, 1287–1288.',[
      "Trong thế kỉ XIII, quân <b>Mông Cổ — Nguyên</b> ba lần đem đại quân sang xâm lược Đại Việt.",
      "Ba lần xâm lược vào các năm: <b>1258</b>, <b>1285</b>, <b>1287–1288</b>.",
      "Cả ba lần, dưới sự lãnh đạo của nhà Trần, quân dân Đại Việt đều <i>đánh bại</i> đội quân hùng mạnh nhất thế giới lúc bấy giờ.",
    ],
     ['Sai — quân Mông — Nguyên xâm lược 3 lần, không phải 5 lần.', 'Sai — không chỉ 1 lần; chúng đánh tới 3 lần đều thất bại.', 'Đúng — quân Mông — Nguyên xâm lược 3 lần (1258, 1285, 1287–1288).', 'Sai — đúng là 3 lần chứ không phải 2 lần.']),
    Q('Người chỉ huy quân Đại Việt trong các cuộc kháng chiến chống Nguyên là?', ['Lý Thường Kiệt', 'Ngô Quyền', 'Trần Hưng Đạo (Trần Quốc Tuấn)', 'Lê Lợi'], 2, 'Trần Quốc Tuấn — Hưng Đạo Vương — Đại Vương quân sự.',[
      "Người chỉ huy tối cao của quân dân Đại Việt trong các cuộc kháng chiến chống Mông — Nguyên là <b>Trần Hưng Đạo</b> (Trần Quốc Tuấn).",
      "Ông là nhà quân sự thiên tài, được phong <i>Quốc công Tiết chế</i>, tổng chỉ huy quân đội. <ul><li>Soạn \"Hịch tướng sĩ\" để khích lệ binh sĩ;</li><li>chỉ huy trận Bạch Đằng 1288 lừng lẫy.</li></ul>",
      "Phân biệt: <i>Lý Thường Kiệt</i> chống Tống, <i>Ngô Quyền</i> chống Nam Hán, <i>Lê Lợi</i> chống Minh.",
    ],
     ['Sai — Lý Thường Kiệt chống Tống thời Lý, không phải chống Nguyên.', 'Sai — Ngô Quyền chống Nam Hán (938), trước nhà Trần.', 'Đúng — Trần Hưng Đạo (Trần Quốc Tuấn) chỉ huy quân chống Nguyên.', 'Sai — Lê Lợi lãnh đạo khởi nghĩa Lam Sơn chống Minh, muộn hơn.']),
    Q('"Hịch tướng sĩ" do ai soạn?', ['Trần Hưng Đạo', 'Nguyễn Trãi', 'Quang Trung', 'Lý Thường Kiệt'], 0, 'Trần Hưng Đạo soạn để khích lệ tướng sĩ chống quân Nguyên.',[
      "Trước cuộc kháng chiến lần thứ hai (1285), <b>Trần Hưng Đạo</b> soạn bài <b>\"Hịch tướng sĩ\"</b>.",
      "Bài hịch nhằm: <ul><li>khơi dậy lòng yêu nước, căm thù giặc;</li><li>khích lệ tướng sĩ ra sức học tập binh thư, quyết chiến chống quân Nguyên.</li></ul>",
      "Phân biệt: <i>\"Nam quốc sơn hà\"</i> (Lý Thường Kiệt), <i>\"Bình Ngô đại cáo\"</i> (Nguyễn Trãi) — của tác giả và thời kì khác.",
    ],
     ['Đúng — Trần Hưng Đạo soạn "Hịch tướng sĩ" khích lệ quân chống Nguyên.', 'Sai — Nguyễn Trãi viết "Bình Ngô đại cáo", không phải "Hịch tướng sĩ".', 'Sai — Quang Trung là vua Tây Sơn, không soạn "Hịch tướng sĩ".', 'Sai — Lý Thường Kiệt gắn với "Nam quốc sơn hà", không phải hịch này.']),
    Q('Câu nói nổi tiếng của vua Trần Nhân Tông tại Hội nghị Diên Hồng?', ['"Cống nạp"', '"Hoà!"', '"Đầu hàng"', '"Đánh!"'], 3, 'Các bô lão đồng thanh "Đánh!" tại Hội nghị Diên Hồng.',[
      "Trước cuộc xâm lược lần thứ hai, nhà Trần triệu tập <b>Hội nghị Diên Hồng</b> mời các <i>bô lão</i> trong cả nước.",
      "Khi vua Trần hỏi nên \"hoà\" hay nên \"đánh\", các bô lão đồng thanh hô vang <b>\"Đánh!\"</b>.",
      "Hội nghị thể hiện <code>ý chí quyết chiến</code> và tinh thần đoàn kết toàn dân — một biểu tượng của dân chủ và đồng lòng chống ngoại xâm.",
    ],
     ['Sai — Hội nghị Diên Hồng thể hiện ý chí chiến đấu, không phải cống nạp.', 'Sai — các bô lão đồng thanh "Đánh!" chứ không cầu hoà.', 'Sai — tinh thần Diên Hồng là quyết chiến, không đầu hàng.', 'Đúng — các bô lão đồng thanh "Đánh!" tại Hội nghị Diên Hồng.']),
    Q('Trận thuỷ chiến nổi tiếng năm 1288 nhấn chìm quân Nguyên?', ['Chương Dương', 'Bạch Đằng', 'Như Nguyệt', 'Đông Bộ Đầu'], 1, 'Trận Bạch Đằng 1288 — đỉnh cao nghệ thuật quân sự Trần Hưng Đạo.',[
      "Năm <b>1288</b>, trong cuộc kháng chiến lần thứ ba, Trần Hưng Đạo bố trí <b>trận địa cọc</b> trên sông <b>Bạch Đằng</b>.",
      "Lợi dụng thuỷ triều, quân ta nhử đoàn thuyền chiến của quân Nguyên vào bãi cọc, rồi tổng phản công, <i>nhấn chìm</i> và tiêu diệt toàn bộ đạo thuỷ quân địch.",
      "Phân biệt các trận: <i>Đông Bộ Đầu</i> (1258), <i>Chương Dương</i> (1285), còn <b>Bạch Đằng</b> là trận thuỷ chiến quyết định năm 1288.",
    ],
     ['Sai — Chương Dương là trận đánh năm 1285, không phải thuỷ chiến 1288.', 'Đúng — trận Bạch Đằng 1288 nhấn chìm thuyền quân Nguyên bằng bãi cọc.', 'Sai — Như Nguyệt là phòng tuyến chống Tống năm 1077.', 'Sai — Đông Bộ Đầu là trận năm 1258, không phải thuỷ chiến 1288.']),
  ]),

  M(16, 'Suy yếu nhà Trần — Hồ Quý Ly và cải cách', [
    Q('Cuối thế kỉ XIV, nhà Trần suy yếu chủ yếu vì?', ['Bị bão lũ liên miên', 'Bị nội chiến phía Nam', 'Vua quan ăn chơi xa xỉ, ruộng đất tập trung vào tay quý tộc', 'Bị Mông Cổ chiếm'], 2, 'Tham nhũng, phân hoá ruộng đất, khởi nghĩa nông dân nổ ra.',[
      "Từ nửa sau thế kỉ XIV, nhà Trần lâm vào tình trạng <b>khủng hoảng, suy yếu</b>.",
      "Nguyên nhân chính: <ul><li>vua quan ăn chơi <b>sa đoạ</b>, không quan tâm sản xuất;</li><li><b>ruộng đất</b> ngày càng tập trung vào tay quý tộc, địa chủ;</li><li>đời sống nông dân cực khổ, nhiều cuộc <i>khởi nghĩa nông dân</i> nổ ra.</li></ul>",
      "Tình hình đó tạo điều kiện cho Hồ Quý Ly từng bước thâu tóm quyền lực.",
    ],
     ['Sai — bão lũ không phải nguyên nhân chính khiến nhà Trần suy yếu.', 'Sai — nguyên nhân là khủng hoảng nội bộ, không phải nội chiến phía Nam.', 'Đúng — vua quan ăn chơi, ruộng đất tập trung vào quý tộc làm nhà Trần suy yếu.', 'Sai — nhà Trần đã ba lần đánh thắng Mông — Nguyên, không bị chiếm.']),
    Q('Hồ Quý Ly truất ngôi nhà Trần lập nhà Hồ năm?', ['1400', '1428', '1226', '1010'], 0, 'Hồ Quý Ly lập nhà Hồ năm 1400, đổi quốc hiệu Đại Ngu.',[
      "Năm <b>1400</b>, <b>Hồ Quý Ly</b> truất ngôi vua Trần, lập ra <b>nhà Hồ</b>, đổi quốc hiệu thành <b>Đại Ngu</b>.",
      "Ông là người nắm thực quyền trong triều Trần cuối, tiến hành nhiều cải cách táo bạo.",
      "Phân biệt các mốc: <code>1226</code> (lập nhà Trần), <code>1428</code> (lập nhà Lê sơ), <code>1010</code> (dời đô Thăng Long).",
    ],
     ['Đúng — năm 1400 Hồ Quý Ly truất ngôi nhà Trần, lập nhà Hồ.', 'Sai — 1428 là năm Lê Lợi lập nhà Lê sơ.', 'Sai — 1226 là năm lập nhà Trần.', 'Sai — 1010 là năm Lý Công Uẩn dời đô về Thăng Long.']),
    Q('Cải cách "hạn điền" của Hồ Quý Ly là?', ['Cấm dùng tiền', 'Cấm cày ruộng', 'Giới hạn diện tích ruộng tư của quý tộc', 'Cấm học chữ Hán'], 2, 'Hạn điền hạn chế sự bành trướng ruộng tư của quý tộc.',[
      "Một trong những cải cách quan trọng của Hồ Quý Ly là chính sách <b>\"hạn điền\"</b>.",
      "\"Hạn điền\" nghĩa là <i>giới hạn diện tích ruộng tư</i> mà quý tộc, địa chủ được phép sở hữu; phần dôi ra bị sung công.",
      "Mục đích: <ul><li>hạn chế thế lực kinh tế của tầng lớp quý tộc;</li><li>tăng nguồn ruộng đất và thu nhập cho nhà nước.</li></ul>",
    ],
     ['Sai — Hồ Quý Ly phát hành tiền giấy chứ không cấm dùng tiền.', 'Sai — hạn điền liên quan ruộng đất nhưng không cấm cày ruộng.', 'Đúng — "hạn điền" giới hạn diện tích ruộng tư của quý tộc.', 'Sai — hạn điền là chính sách ruộng đất, không liên quan học chữ Hán.']),
    Q('Hồ Quý Ly cho phát hành loại tiền nào lần đầu?', ['Tiền nhựa', 'Tiền giấy "Thông bảo hội sao"', 'Tiền điện tử', 'Tiền vàng'], 1, 'Tiền giấy đầu tiên của Việt Nam dưới thời Hồ.',[
      "Về tiền tệ, Hồ Quý Ly cho phát hành <b>tiền giấy</b> mang tên <b>\"Thông bảo hội sao\"</b>.",
      "Đây là loại <i>tiền giấy đầu tiên</i> trong lịch sử Việt Nam, thay cho tiền đồng. <ul><li>Nhà nước thu lại tiền đồng để đúc vũ khí, dự trữ.</li></ul>",
      "Cải cách này thể hiện đầu óc cách tân của Hồ Quý Ly, dù khi áp dụng còn gặp nhiều khó khăn.",
    ],
     ['Sai — tiền nhựa là sản phẩm hiện đại, không có thời Hồ.', 'Đúng — Hồ Quý Ly phát hành tiền giấy "Thông bảo hội sao" đầu tiên.', 'Sai — tiền điện tử là sản phẩm hiện đại, không có thời Hồ.', 'Sai — cải cách của Hồ Quý Ly là tiền giấy, không phải tiền vàng.']),
    Q('Nhà Hồ thất bại trước quân Minh năm?', ['1400', '1407', '1428', '1789'], 1, 'Năm 1407, nhà Hồ sụp đổ, nước ta rơi vào ách Minh thuộc.',[
      "Năm <b>1407</b>, sau cuộc kháng chiến thất bại, nhà Hồ sụp đổ trước cuộc xâm lược của nhà <b>Minh</b>.",
      "Từ đây, nước ta rơi vào ách đô hộ tàn bạo của nhà Minh (thời kì <i>Minh thuộc</i>).",
      "Nguyên nhân thất bại chủ yếu là nhà Hồ <code>không tập hợp được</code> sức mạnh toàn dân. Phân biệt: <code>1400</code> là năm lập nhà Hồ; <code>1428</code> là khi Lê Lợi đánh đuổi quân Minh, lập nhà Lê sơ.",
    ],
     ['Sai — 1400 là năm Hồ Quý Ly lập nhà Hồ, chưa thất bại.', 'Đúng — năm 1407 nhà Hồ sụp đổ, nước ta rơi vào ách Minh thuộc.', 'Sai — 1428 là năm Lê Lợi lập nhà Lê sơ sau khi đuổi Minh.', 'Sai — 1789 là chiến thắng Ngọc Hồi — Đống Đa của Quang Trung.']),
  ]),

  M(17, 'Khởi nghĩa Lam Sơn và sự ra đời nhà Lê sơ', [
    Q('Lê Lợi dựng cờ khởi nghĩa Lam Sơn năm?', ['1428', '1442', '1407', '1418'], 3, 'Năm 1418, Lê Lợi khởi nghĩa tại Lam Sơn (Thanh Hoá).',[
      "Năm <b>1418</b>, <b>Lê Lợi</b> dựng cờ <b>khởi nghĩa Lam Sơn</b> tại vùng rừng núi Lam Sơn (Thanh Hoá), chống ách đô hộ của nhà Minh.",
      "Buổi đầu nghĩa quân gặp muôn vàn khó khăn, nhiều lần bị vây khốn nhưng vẫn kiên trì chiến đấu.",
      "Phân biệt mốc: <code>1407</code> (nhà Hồ sụp đổ), <code>1427</code> (khởi nghĩa thắng lợi), <code>1428</code> (lập nhà Lê sơ).",
    ],
     ['Sai — 1428 là năm khởi nghĩa thắng lợi, Lê Lợi lập nhà Lê sơ.', 'Sai — 1442 lệch mốc, không liên quan khởi nghĩa Lam Sơn.', 'Sai — 1407 là năm nhà Hồ sụp đổ, chưa có khởi nghĩa Lam Sơn.', 'Đúng — năm 1418 Lê Lợi dựng cờ khởi nghĩa Lam Sơn (Thanh Hoá).']),
    Q('Người được coi là quân sư xuất sắc của Lê Lợi?', ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Nguyễn Trãi', 'Hồ Quý Ly'], 2, 'Nguyễn Trãi soạn "Bình Ngô đại cáo" và là quân sư.',[
      "Người được coi là <b>quân sư xuất sắc</b> của Lê Lợi là <b>Nguyễn Trãi</b>.",
      "Ông đề ra đường lối kháng chiến đúng đắn (\"tâm công\" — đánh vào lòng người), giúp Lê Lợi giành thắng lợi.",
      "Sau chiến thắng, Nguyễn Trãi soạn <b>\"Bình Ngô đại cáo\"</b> — áng \"thiên cổ hùng văn\", tổng kết cuộc kháng chiến.",
    ],
     ['Sai — Trần Hưng Đạo là danh tướng nhà Trần, không phải quân sư của Lê Lợi.', 'Sai — Lý Thường Kiệt là tướng thời Lý, không liên quan Lam Sơn.', 'Đúng — Nguyễn Trãi là quân sư của Lê Lợi, soạn "Bình Ngô đại cáo".', 'Sai — Hồ Quý Ly lập nhà Hồ, là người bị Minh đánh bại trước đó.']),
    Q('Khởi nghĩa Lam Sơn kết thúc thắng lợi năm?', ['1407', '1010', '1427 (Trận Chi Lăng — Xương Giang)', '1789'], 2, 'Năm 1427, nghĩa quân Lam Sơn đại thắng, quân Minh rút về.',[
      "Cuối năm <b>1427</b>, nghĩa quân Lam Sơn giành thắng lợi quyết định trong trận <b>Chi Lăng — Xương Giang</b>, tiêu diệt viện binh của nhà Minh.",
      "Quân Minh buộc phải chấp nhận giảng hoà và rút quân về nước, kết thúc cuộc khởi nghĩa Lam Sơn thắng lợi.",
      "Phân biệt: <code>1418</code> là năm khởi nghĩa bùng nổ; <code>1428</code> là năm Lê Lợi lên ngôi lập nhà Lê sơ.",
    ],
     ['Sai — 1407 là năm nhà Hồ sụp đổ, mở đầu Minh thuộc.', 'Sai — 1010 là năm Lý Công Uẩn dời đô, không liên quan Lam Sơn.', 'Đúng — năm 1427 nghĩa quân Lam Sơn đại thắng ở Chi Lăng — Xương Giang.', 'Sai — 1789 là chiến thắng Quang Trung trước quân Thanh.']),
    Q('"Bình Ngô đại cáo" được coi là?', ['Bài thơ tình', 'Truyện kể', 'Bản tuyên ngôn độc lập thứ 2 của nước ta', 'Hịch tướng sĩ'], 2, 'Nguyễn Trãi soạn — bản tuyên ngôn độc lập hùng tráng.',[
      "<b>\"Bình Ngô đại cáo\"</b> do <b>Nguyễn Trãi</b> thừa lệnh Lê Lợi soạn thảo, công bố năm 1428.",
      "Tác phẩm tổng kết cuộc khởi nghĩa Lam Sơn, khẳng định nền độc lập, được coi là <b>bản Tuyên ngôn độc lập thứ hai</b> của dân tộc (sau \"Nam quốc sơn hà\").",
      "Phân biệt: <i>\"Hịch tướng sĩ\"</i> (Trần Hưng Đạo), <i>\"Nam quốc sơn hà\"</i> (gắn với Lý Thường Kiệt) — của tác giả khác.",
    ],
     ['Sai — "Bình Ngô đại cáo" là áng văn chính luận, không phải thơ tình.', 'Sai — đây là bản đại cáo tổng kết kháng chiến, không phải truyện kể.', 'Đúng — "Bình Ngô đại cáo" được coi là bản tuyên ngôn độc lập thứ 2 của nước ta.', 'Sai — "Hịch tướng sĩ" là tác phẩm của Trần Hưng Đạo, khác hẳn.']),
    Q('Nhà Lê sơ chính thức thành lập năm?', ['1407', '1226', '1428 (Lê Lợi lên ngôi, đặt quốc hiệu Đại Việt)', '1010'], 2, 'Lê Lợi lên ngôi vua, lập nhà Lê sơ năm 1428.',[
      "Năm <b>1428</b>, sau khi đánh đuổi quân Minh, <b>Lê Lợi</b> lên ngôi Hoàng đế (Lê Thái Tổ), lập ra <b>nhà Lê sơ</b>.",
      "Nhà nước khôi phục quốc hiệu <b>Đại Việt</b>, đóng đô ở Thăng Long (Đông Kinh).",
      "Phân biệt mốc: <code>1407</code> (nhà Hồ sụp), <code>1226</code> (lập nhà Trần), <code>1010</code> (lập nhà Lý) — đều khác năm lập nhà Lê sơ.",
    ],
     ['Sai — 1407 là năm nhà Hồ sụp đổ, chưa có nhà Lê sơ.', 'Sai — 1226 là năm thành lập nhà Trần.', 'Đúng — năm 1428 Lê Lợi lên ngôi, lập nhà Lê sơ, quốc hiệu Đại Việt.', 'Sai — 1010 là năm Lý Công Uẩn lập nhà Lý dời đô.']),
  ]),

  M(18, 'Ôn tập Lịch sử HK1', [
    Q('Năm 938 gắn với sự kiện nào?', ['Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng', 'Hồ Quý Ly lập nhà Hồ', 'Lý Công Uẩn dời đô', 'Lê Lợi khởi nghĩa'], 0, 'Năm 938 — chiến thắng Bạch Đằng, chấm dứt Bắc thuộc.',[
      "Năm <b>938</b> gắn với <b>chiến thắng Bạch Đằng</b> của <b>Ngô Quyền</b> trước quân Nam Hán.",
      "Đây là mốc <i>chấm dứt hơn 1000 năm Bắc thuộc</i>, mở ra thời kì độc lập, tự chủ lâu dài của dân tộc.",
      "Phân biệt với các mốc khác: <code>1010</code> (Lý Công Uẩn dời đô), <code>1400</code> (Hồ Quý Ly lập nhà Hồ), <code>1418</code> (Lê Lợi khởi nghĩa).",
    ],
     ['Đúng — năm 938 Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng.', 'Sai — Hồ Quý Ly lập nhà Hồ năm 1400, không phải 938.', 'Sai — Lý Công Uẩn dời đô năm 1010, không phải 938.', 'Sai — Lê Lợi khởi nghĩa Lam Sơn năm 1418, không phải 938.']),
    Q('Triều đại nào dời đô về Thăng Long?', ['Nhà Lý (1010)', 'Nhà Đinh', 'Nhà Trần', 'Nhà Tiền Lê'], 0, 'Lý Công Uẩn dời đô từ Hoa Lư về Đại La, đổi tên Thăng Long.',[
      "Triều đại <b>dời đô về Thăng Long</b> là <b>nhà Lý</b>.",
      "Năm <b>1010</b>, <b>Lý Công Uẩn</b> dời đô từ Hoa Lư ra thành Đại La, đổi tên thành Thăng Long.",
      "Phân biệt: nhà <i>Đinh — Tiền Lê</i> đóng đô ở Hoa Lư; nhà <i>Trần</i> kế thừa Thăng Long chứ không phải triều dời đô về đó.",
    ],
     ['Đúng — nhà Lý (Lý Công Uẩn, 1010) dời đô về Đại La, đổi tên Thăng Long.', 'Sai — nhà Đinh đóng đô ở Hoa Lư, không dời về Thăng Long.', 'Sai — nhà Trần kế thừa Thăng Long, không phải triều dời đô về đó.', 'Sai — nhà Tiền Lê đóng đô ở Hoa Lư.']),
    Q('Triều đại nào lập phòng tuyến sông Như Nguyệt chống Tống?', ['Nhà Hồ', 'Nhà Lê sơ', 'Nhà Lý', 'Nhà Trần'], 2, 'Lý Thường Kiệt lập phòng tuyến Như Nguyệt năm 1077.',[
      "Triều đại lập <b>phòng tuyến sông Như Nguyệt</b> chống Tống là <b>nhà Lý</b>.",
      "Năm <b>1077</b>, <b>Lý Thường Kiệt</b> xây phòng tuyến trên sông Như Nguyệt (sông Cầu) để chặn và đánh tan đại quân Tống.",
      "Phân biệt: nhà <i>Trần</i> chống Mông — Nguyên; nhà <i>Hồ</i> và nhà <i>Lê sơ</i> liên quan tới quân Minh.",
    ],
     ['Sai — nhà Hồ chống Minh năm 1407, không lập phòng tuyến Như Nguyệt.', 'Sai — nhà Lê sơ chống Minh, không phải triều chống Tống ở Như Nguyệt.', 'Đúng — nhà Lý (Lý Thường Kiệt) lập phòng tuyến Như Nguyệt chống Tống 1077.', 'Sai — nhà Trần chống Mông — Nguyên, không phải phòng tuyến Như Nguyệt.']),
    Q('Triều đại nào ba lần đánh thắng Mông — Nguyên?', ['Nhà Trần', 'Nhà Lê', 'Nhà Hồ', 'Nhà Lý'], 0, 'Nhà Trần ba lần chiến thắng quân Mông — Nguyên (1258, 1285, 1288).',[
      "Triều đại <b>ba lần đánh thắng quân Mông — Nguyên</b> là <b>nhà Trần</b>.",
      "Ba cuộc kháng chiến vào các năm <b>1258, 1285, 1287–1288</b>, dưới sự lãnh đạo của Trần Hưng Đạo, đỉnh cao là trận Bạch Đằng 1288.",
      "Phân biệt: nhà <i>Lý</i> chống Tống; nhà <i>Lê</i> chống Minh; nhà <i>Hồ</i> thất bại trước Minh.",
    ],
     ['Đúng — nhà Trần ba lần đánh thắng quân Mông — Nguyên (1258, 1285, 1288).', 'Sai — nhà Lê chống Minh, không đánh Mông — Nguyên.', 'Sai — nhà Hồ thất bại trước Minh, không chống Mông — Nguyên.', 'Sai — nhà Lý chống Tống, còn nhà Trần mới chống Mông — Nguyên.']),
    Q('Cuộc khởi nghĩa nào kết thúc ách đô hộ của nhà Minh?', ['Khởi nghĩa Lý Bí', 'Khởi nghĩa Bà Triệu', 'Khởi nghĩa Hai Bà Trưng', 'Khởi nghĩa Lam Sơn'], 3, 'Khởi nghĩa Lam Sơn (1418–1427) đánh đuổi quân Minh.',[
      "Cuộc khởi nghĩa <b>kết thúc ách đô hộ của nhà Minh</b> là <b>khởi nghĩa Lam Sơn</b> (1418–1427), do <b>Lê Lợi</b> lãnh đạo.",
      "Thắng lợi này mở ra thời kì độc lập với nhà Lê sơ.",
      "Phân biệt với các khởi nghĩa thời Bắc thuộc: <i>Hai Bà Trưng</i> (chống Hán), <i>Bà Triệu</i> (chống Ngô), <i>Lý Bí</i> (chống Lương).",
    ],
     ['Sai — khởi nghĩa Lý Bí chống nhà Lương thời Bắc thuộc, không phải Minh.', 'Sai — khởi nghĩa Bà Triệu chống nhà Ngô thời Bắc thuộc.', 'Sai — khởi nghĩa Hai Bà Trưng chống nhà Hán, không phải Minh.', 'Đúng — khởi nghĩa Lam Sơn (1418–1427) kết thúc ách đô hộ của nhà Minh.']),
  ]),

  // ===== HK2 — ĐỊA LÍ CÁC CHÂU LỤC + TIẾP TỤC LSVN =====
  M(19, 'Châu Á — vị trí, kích thước và địa hình', [
    Q('Châu Á là châu lục có diện tích?', ['Bằng châu Phi', 'Bằng châu Âu', 'Nhỏ nhất', 'Lớn nhất thế giới (~44,4 triệu km²)'], 3, 'Châu Á rộng nhất, chiếm ~30% diện tích đất nổi.',[
      "<b>Châu Á</b> là châu lục có diện tích <b>lớn nhất</b> thế giới, khoảng <b>44,4 triệu km²</b> (kể cả các đảo).",
      "Châu Á chiếm khoảng <code>1/3</code> diện tích đất nổi của Trái Đất. <ul><li>Lãnh thổ trải dài từ vùng cực Bắc đến gần xích đạo.</li></ul>",
      "Xếp hạng diện tích: châu Á (1) > châu Mỹ > châu Phi > châu Nam Cực > châu Âu > châu Đại Dương (nhỏ nhất).",
    ],
     ['Sai — châu Á (~44,4 triệu km²) rộng hơn nhiều so với châu Phi.', 'Sai — châu Âu nhỏ hơn rất nhiều so với châu Á.', 'Sai — châu Á lớn nhất; châu Đại Dương mới nhỏ nhất.', 'Đúng — châu Á rộng nhất thế giới (~44,4 triệu km²).']),
    Q('Châu Á tiếp giáp với mấy đại dương?', ['5', '3 (Bắc Băng Dương, Thái Bình Dương, Ấn Độ Dương)', '1', '2'], 1, 'Châu Á giáp 3 đại dương lớn.',[
      "Châu Á tiếp giáp với <b>ba đại dương</b> lớn:",
      "<ul><li><b>Bắc Băng Dương</b> ở phía bắc;</li><li><b>Thái Bình Dương</b> ở phía đông;</li><li><b>Ấn Độ Dương</b> ở phía nam.</li></ul>",
      "Phía tây, châu Á tiếp giáp với châu Âu và châu Phi qua đất liền và Địa Trung Hải, Biển Đỏ.",
    ],
     ['Sai — châu Á giáp 3 đại dương, không phải 5.', 'Đúng — châu Á giáp 3 đại dương: Bắc Băng Dương, Thái Bình Dương, Ấn Độ Dương.', 'Sai — châu Á giáp tới 3 đại dương, không chỉ 1.', 'Sai — đúng là 3 đại dương chứ không phải 2.']),
    Q('Dãy núi cao nhất thế giới ở châu Á là?', ['Hi-ma-lay-a', 'Cooc-đi-e', 'An-đét', 'An-pơ (dãy núi trẻ ở châu Âu)'], 0, 'Hi-ma-lay-a có đỉnh Everest 8848 m — cao nhất thế giới.',[
      "Dãy núi cao và đồ sộ nhất thế giới là dãy <b>Hi-ma-lay-a</b>, nằm ở châu Á.",
      "Trên dãy này có đỉnh <b>Everest (Chô-mô-lung-ma)</b> cao <b>8848 m</b> — đỉnh cao nhất Trái Đất.",
      "Phân biệt với các dãy ở châu lục khác: <i>Coóc-đi-e</i> (Bắc Mỹ), <i>An-đét</i> (Nam Mỹ), <i>An-pơ</i> (châu Âu).",
    ],
     ['Đúng — dãy Hi-ma-lay-a có đỉnh Everest 8848 m, cao nhất thế giới.', 'Sai — dãy Cooc-đi-e nằm ở Bắc Mỹ, không phải châu Á.', 'Sai — dãy An-đét ở Nam Mỹ, không phải châu Á.', 'Sai — dãy An-pơ ở châu Âu, không phải châu Á.']),
    Q('Đồng bằng nào lớn nhất châu Á?', ['Đồng bằng sông Mê Công', 'Đồng bằng Hoa Bắc', 'Đồng bằng Ấn — Hằng', 'Đồng bằng Tây Xi-bia'], 3, 'Đồng bằng Tây Xi-bia rộng nhất châu Á (~2,6 triệu km²).',[
      "Đồng bằng rộng lớn nhất châu Á là <b>đồng bằng Tây Xi-bia</b> (~2,6 triệu km²), ở phần lãnh thổ Nga thuộc Bắc Á.",
      "Châu Á còn nhiều đồng bằng lớn khác như Ấn — Hằng, Hoa Bắc, đồng bằng sông Mê Công... nhưng đều nhỏ hơn Tây Xi-bia.",
      "Địa hình châu Á rất <i>đa dạng</i>: núi, sơn nguyên đồ sộ xen các đồng bằng rộng.",
    ],
     ['Sai — đồng bằng sông Mê Công nhỏ hơn nhiều so với Tây Xi-bia.', 'Sai — đồng bằng Hoa Bắc lớn nhưng không bằng Tây Xi-bia.', 'Sai — đồng bằng Ấn — Hằng rộng nhưng vẫn nhỏ hơn Tây Xi-bia.', 'Đúng — đồng bằng Tây Xi-bia rộng nhất châu Á (~2,6 triệu km²).']),
    Q('Sơn nguyên rộng và cao nhất thế giới ở châu Á là?', ['Sơn nguyên I-ran', 'Sơn nguyên A-ráp', 'Sơn nguyên Tây Tạng', 'Sơn nguyên Đề-can'], 2, 'Tây Tạng — "nóc nhà thế giới", cao trung bình ~4500 m.',[
      "<b>Sơn nguyên Tây Tạng</b> là sơn nguyên rộng và cao nhất thế giới, độ cao trung bình ~<b>4500 m</b>.",
      "Vì độ cao lớn, Tây Tạng được mệnh danh là <b>\"nóc nhà thế giới\"</b>. <ul><li>Đây là nơi bắt nguồn của nhiều con sông lớn như Trường Giang, Mê Công, sông Hằng...</li></ul>",
      "Phân biệt với các sơn nguyên khác ở châu Á: I-ran, A-ráp, Đề-can — đều thấp hơn Tây Tạng nhiều.",
    ],
     ['Sai — sơn nguyên I-ran thấp hơn nhiều so với Tây Tạng.', 'Sai — sơn nguyên A-ráp không cao bằng Tây Tạng.', 'Đúng — sơn nguyên Tây Tạng là "nóc nhà thế giới", cao và rộng nhất.', 'Sai — sơn nguyên Đề-can ở Ấn Độ thấp hơn Tây Tạng.']),
  ]),

  M(20, 'Khí hậu và sông ngòi châu Á', [
    Q('Khí hậu châu Á có đặc điểm gì nổi bật?', ['Chỉ có khí hậu nóng', 'Chỉ có khí hậu lạnh', 'Đa dạng nhất thế giới, phân hoá theo đới và khu vực', 'Đồng đều khắp nơi'], 2, 'Châu Á có đủ các đới khí hậu: hàn — ôn — nhiệt — xích đạo.',[
      "Do lãnh thổ rộng lớn, trải dài trên nhiều vĩ độ và địa hình phức tạp, châu Á có khí hậu <b>đa dạng nhất thế giới</b>.",
      "Khí hậu châu Á <i>phân hoá</i>: <ul><li>theo <b>đới</b> (từ hàn đới ở Bắc Á đến nhiệt đới, xích đạo ở Nam Á, Đông Nam Á);</li><li>theo <b>khu vực</b> (gió mùa ẩm, lục địa khô hạn, núi cao...).</li></ul>",
      "Sự đa dạng này tạo nên nhiều kiểu cảnh quan và sản vật phong phú.",
    ],
     ['Sai — châu Á có đủ các đới, không chỉ khí hậu nóng.', 'Sai — châu Á có cả vùng nóng lẫn lạnh, không chỉ khí hậu lạnh.', 'Đúng — khí hậu châu Á đa dạng nhất thế giới, phân hoá theo đới và khu vực.', 'Sai — khí hậu châu Á phân hoá mạnh, không đồng đều khắp nơi.']),
    Q('Khí hậu gió mùa châu Á tập trung ở khu vực nào?', ['Bắc Á (vùng khí hậu ôn đới lạnh)', 'Trung Á', 'Nam Á, Đông Á, Đông Nam Á', 'Tây Nam Á'], 2, 'Khu vực gió mùa: Nam Á, Đông Á, Đông Nam Á.',[
      "Khí hậu <b>gió mùa</b> ở châu Á tập trung ở các khu vực: <b>Nam Á</b>, <b>Đông Á</b> và <b>Đông Nam Á</b>.",
      "Đặc điểm gió mùa: <ul><li>mùa hạ có gió từ biển thổi vào, nóng ẩm, <b>mưa nhiều</b>;</li><li>mùa đông có gió từ lục địa thổi ra, lạnh và khô.</li></ul>",
      "Phân biệt: Bắc Á có khí hậu ôn đới lạnh; Trung Á và Tây Nam Á khô hạn lục địa.",
    ],
     ['Sai — Bắc Á có khí hậu ôn đới lạnh, không phải vùng gió mùa.', 'Sai — Trung Á khô hạn lục địa, không phải vùng gió mùa.', 'Đúng — khí hậu gió mùa tập trung ở Nam Á, Đông Á, Đông Nam Á.', 'Sai — Tây Nam Á khô hạn, không phải vùng gió mùa điển hình.']),
    Q('Sông dài nhất châu Á?', ['Sông Hồng', 'Sông Mê Công', 'Sông Trường Giang (~6300 km)', 'Sông Hằng'], 2, 'Trường Giang (Dương Tử) dài nhất châu Á, thứ 3 thế giới.',[
      "Sông dài nhất châu Á là sông <b>Trường Giang</b> (Dương Tử), dài khoảng <b>6300 km</b>.",
      "Trường Giang bắt nguồn từ sơn nguyên Tây Tạng, chảy qua Trung Quốc rồi đổ ra Thái Bình Dương — là sông dài thứ <i>ba thế giới</i>.",
      "Phân biệt với các sông khác ở châu Á: sông Hằng, sông Mê Công, sông Hồng — đều ngắn hơn Trường Giang.",
    ],
     ['Sai — sông Hồng ngắn hơn nhiều so với Trường Giang.', 'Sai — sông Mê Công dài nhưng vẫn ngắn hơn Trường Giang.', 'Đúng — sông Trường Giang (~6300 km) dài nhất châu Á, thứ 3 thế giới.', 'Sai — sông Hằng quan trọng nhưng không dài bằng Trường Giang.']),
    Q('Sông nào chảy qua nhiều quốc gia Đông Nam Á?', ['Sông Hoàng Hà', 'Sông Mê Công', 'Sông Hồng', 'Sông Ấn'], 1, 'Mê Công chảy qua TQ, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia, VN.',[
      "Sông <b>Mê Công</b> là con sông lớn chảy qua nhiều quốc gia Đông Nam Á.",
      "Mê Công bắt nguồn từ sơn nguyên Tây Tạng, chảy qua <b>Trung Quốc, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia</b> và đổ ra biển ở <b>Việt Nam</b> (đồng bằng sông Cửu Long).",
      "Vì chảy qua nhiều nước, Mê Công có vai trò quan trọng và cần sự <i>hợp tác</i> giữa các quốc gia trong sử dụng nguồn nước.",
    ],
     ['Sai — Hoàng Hà chảy trong nội địa Trung Quốc, không qua nhiều nước ĐNA.', 'Đúng — Mê Công chảy qua TQ, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia, VN.', 'Sai — sông Hồng chủ yếu chảy ở Việt Nam, không qua nhiều nước ĐNA.', 'Sai — sông Ấn ở Nam Á, không chảy qua Đông Nam Á.']),
    Q('Khí hậu lục địa khô hạn rộng lớn ở châu Á thuộc khu vực?', ['Đông Á', 'Trung Á và Tây Nam Á', 'Nam Á (khí hậu nhiệt đới gió mùa ẩm)', 'Đông Nam Á'], 1, 'Trung Á, Tây Nam Á khô hạn, có hoang mạc rộng.',[
      "Khí hậu <b>lục địa khô hạn</b> rộng lớn ở châu Á phân bố chủ yếu tại <b>Trung Á</b> và <b>Tây Nam Á</b>.",
      "Các khu vực này nằm sâu trong nội địa hoặc gần chí tuyến, ít chịu ảnh hưởng của biển nên: <ul><li>lượng mưa rất thấp;</li><li>hình thành nhiều <b>hoang mạc, bán hoang mạc</b> rộng lớn.</li></ul>",
      "Phân biệt: Đông Á, Nam Á, Đông Nam Á chủ yếu là khí hậu gió mùa ẩm, mưa nhiều.",
    ],
     ['Sai — Đông Á phần lớn là gió mùa ẩm, không phải khô hạn lục địa.', 'Đúng — Trung Á và Tây Nam Á khô hạn, có hoang mạc rộng.', 'Sai — Nam Á là nhiệt đới gió mùa ẩm, không phải khô hạn lục địa.', 'Sai — Đông Nam Á nóng ẩm mưa nhiều, không phải khô hạn lục địa.']),
  ]),

  M(21, 'Dân cư — xã hội châu Á', [
    Q('Châu Á chiếm khoảng bao nhiêu phần dân số thế giới?', ['~20% (nhầm với châu Phi)', '~90% (vượt quá tổng dân số thế giới)', '~10% (nhầm với châu Âu)', '~60%'], 3, 'Châu Á có ~4,7 tỉ người, chiếm ~60% dân số thế giới.',[
      "Châu Á là châu lục <b>đông dân nhất</b> thế giới.",
      "Dân số châu Á khoảng <b>4,7 tỉ người</b>, chiếm khoảng <b>60%</b> dân số thế giới.",
      "Dân cư phân bố không đều: tập trung đông ở các đồng bằng và ven biển Nam Á, Đông Á, Đông Nam Á; thưa thớt ở vùng núi cao, hoang mạc, Bắc Á.",
    ],
     ['Sai — ~20% là quá ít; châu Á chiếm tới khoảng 60% dân số thế giới.', 'Sai — ~90% là phi lí, không một châu nào chiếm tỉ lệ đó.', 'Sai — ~10% quá thấp; đó là mức gần châu Âu.', 'Đúng — châu Á có ~4,7 tỉ người, chiếm khoảng 60% dân số thế giới.']),
    Q('Hai quốc gia đông dân nhất thế giới đều ở châu Á?', ['Trung Quốc và Ấn Độ', 'Việt Nam và Lào', 'Thái Lan và In-đô-nê-xi-a', 'Nhật Bản và Hàn Quốc'], 0, 'Trung Quốc và Ấn Độ, mỗi nước trên 1,4 tỉ dân.',[
      "Hai quốc gia đông dân nhất thế giới đều nằm ở châu Á: <b>Trung Quốc</b> và <b>Ấn Độ</b>.",
      "Mỗi nước có dân số trên <b>1,4 tỉ người</b>. <ul><li>Đây là yếu tố quan trọng tạo nên quy mô dân số khổng lồ của châu Á.</li></ul>",
      "Phân biệt: các nước như Việt Nam, In-đô-nê-xi-a, Nhật Bản tuy đông dân nhưng không phải hai nước đông dân nhất thế giới.",
    ],
     ['Đúng — Trung Quốc và Ấn Độ là hai nước đông dân nhất, mỗi nước trên 1,4 tỉ.', 'Sai — Việt Nam và Lào dân số nhỏ hơn nhiều.', 'Sai — Thái Lan và In-đô-nê-xi-a đông nhưng không phải hai nước đông nhất thế giới.', 'Sai — Nhật Bản và Hàn Quốc dân số ít hơn Trung Quốc và Ấn Độ rất nhiều.']),
    Q('Châu Á là cái nôi của những nền văn minh lớn nào?', ['Hi Lạp và La Mã', 'Mỹ La-tinh', 'Châu Đại Dương', 'Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa'], 3, 'Bốn nền văn minh cổ đại lớn (3 ở châu Á + Ai Cập ở Bắc Phi).',[
      "Châu Á là <b>cái nôi của nhiều nền văn minh lớn</b> của nhân loại thời cổ đại.",
      "Các nền văn minh lớn: <ul><li><b>Lưỡng Hà</b> (vùng Tây Á);</li><li><b>Ấn Độ</b> (lưu vực sông Ấn — Hằng);</li><li><b>Trung Hoa</b> (lưu vực Hoàng Hà — Trường Giang).</li></ul>",
      "Cùng với <i>Ai Cập</i> (Bắc Phi), đây là những nền văn minh sớm nhất của loài người.",
    ],
     ['Sai — Hi Lạp và La Mã là văn minh châu Âu, không phải châu Á.', 'Sai — Mỹ La-tinh ở châu Mỹ, không phải cái nôi văn minh châu Á.', 'Sai — châu Đại Dương không phải cái nôi của các nền văn minh cổ.', 'Đúng — các nền văn minh lớn: Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa.']),
    Q('Tôn giáo nào ra đời ở châu Á?', ['Phật giáo, Hin-đu giáo, Hồi giáo, Ki-tô giáo', 'Chỉ Phật giáo', 'Không có tôn giáo nào', 'Chỉ Hồi giáo'], 0, '4 tôn giáo lớn đều khởi nguồn ở châu Á.',[
      "Châu Á là nơi <b>ra đời của nhiều tôn giáo lớn</b> trên thế giới.",
      "Bốn tôn giáo lớn đều khởi nguồn ở châu Á: <ul><li><b>Phật giáo</b> và <b>Hin-đu giáo</b> (Ấn Độ);</li><li><b>Hồi giáo</b> (bán đảo A-ráp);</li><li><b>Ki-tô giáo</b> (vùng Pa-le-xtin, Tây Á).</li></ul>",
      "Điều này cho thấy bề dày văn hoá — tín ngưỡng phong phú của châu Á.",
    ],
     ['Đúng — cả 4 tôn giáo lớn (Phật, Hin-đu, Hồi, Ki-tô) đều ra đời ở châu Á.', 'Sai — không chỉ Phật giáo; nhiều tôn giáo lớn cùng ra đời ở châu Á.', 'Sai — châu Á là nơi ra đời nhiều tôn giáo lớn.', 'Sai — không chỉ Hồi giáo; nhiều tôn giáo lớn cùng khởi nguồn ở châu Á.']),
    Q('Việt Nam thuộc khu vực nào của châu Á?', ['Đông Nam Á', 'Đông Á', 'Trung Á', 'Nam Á (gồm Ấn Độ, Pa-ki-xtan, Băng-la-đét)'], 0, 'Việt Nam thuộc khu vực Đông Nam Á.',[
      "<b>Việt Nam</b> thuộc khu vực <b>Đông Nam Á</b> của châu Á.",
      "Đông Nam Á gồm 11 quốc gia, chia thành Đông Nam Á <i>lục địa</i> (có Việt Nam) và Đông Nam Á <i>hải đảo</i>.",
      "Phân biệt với các khu vực khác: <i>Đông Á</i> (Trung Quốc, Nhật, Hàn), <i>Nam Á</i> (Ấn Độ, Pa-ki-xtan), <i>Trung Á</i> (các nước nội địa).",
    ],
     ['Đúng — Việt Nam thuộc khu vực Đông Nam Á.', 'Sai — Đông Á gồm Trung Quốc, Nhật, Hàn; Việt Nam ở Đông Nam Á.', 'Sai — Trung Á gồm các nước nội địa như Ca-dắc-xtan, không có Việt Nam.', 'Sai — Nam Á gồm Ấn Độ, Pa-ki-xtan; Việt Nam thuộc Đông Nam Á.']),
  ]),

  M(22, 'Châu Âu — vị trí, địa hình', [
    Q('Châu Âu nằm ở phía nào của lục địa Á–Âu?', ['Trung tâm', 'Phía tây', 'Phía bắc cực', 'Phía đông'], 1, 'Châu Âu là phần phía tây của lục địa Á–Âu.',[
      "<b>Châu Âu</b> là một bộ phận của lục địa <b>Á — Âu</b>, nằm ở phần <b>phía tây</b> của lục địa này.",
      "Châu Âu có ba mặt giáp biển và đại dương (Bắc Băng Dương, Đại Tây Dương, Địa Trung Hải), đường bờ biển bị cắt xẻ mạnh.",
      "Ranh giới tự nhiên với châu Á ở phía đông là dãy <code>U-ran</code>.",
    ],
     ['Sai — châu Âu nằm ở rìa phía tây, không phải trung tâm lục địa Á–Âu.', 'Đúng — châu Âu là phần phía tây của lục địa Á–Âu.', 'Sai — châu Âu ở phía tây, một phần lên gần Bắc cực nhưng không nằm ở bắc cực.', 'Sai — phía đông lục địa Á–Âu là châu Á, còn châu Âu ở phía tây.']),
    Q('Châu Âu có diện tích khoảng?', ['~30 triệu km²', '~10 triệu km²', '~44 triệu km²', '~1 triệu km²'], 1, 'Châu Âu ~10,18 triệu km² — nhỏ thứ hai sau châu Đại Dương.',[
      "Châu Âu có diện tích khoảng <b>10,18 triệu km²</b>.",
      "Đây là châu lục có diện tích <i>nhỏ thứ hai</i> trên thế giới, chỉ lớn hơn châu Đại Dương.",
      "So sánh: châu Á ~44 triệu km², châu Phi ~30 triệu km² — đều lớn hơn châu Âu nhiều lần.",
    ],
     ['Sai — ~30 triệu km² là diện tích châu Phi, không phải châu Âu.', 'Đúng — châu Âu rộng ~10,18 triệu km².', 'Sai — ~44 triệu km² là diện tích châu Á, không phải châu Âu.', 'Sai — ~1 triệu km² quá nhỏ so với châu Âu (~10 triệu km²).']),
    Q('Dãy núi nào ngăn cách châu Âu với châu Á?', ['An-pơ (nằm trong nội bộ Tây Âu)', 'Cap-pa', 'Pi-rê-nê', 'U-ran'], 3, 'Dãy U-ran (Ural) — ranh giới tự nhiên Âu — Á.',[
      "Dãy núi <b>U-ran</b> (Ural) là ranh giới tự nhiên ngăn cách <b>châu Âu với châu Á</b>.",
      "Dãy U-ran chạy theo hướng bắc — nam, được coi là đường phân chia giữa hai châu lục trên cùng một lục địa Á — Âu.",
      "Phân biệt với các dãy khác trong châu Âu: <i>An-pơ</i> (nội bộ Tây — Trung Âu), <i>Pi-rê-nê</i> (giữa Pháp và Tây Ban Nha) — không phải ranh giới Âu — Á.",
    ],
     ['Sai — dãy An-pơ nằm trong nội bộ Tây Âu, không phải ranh giới Âu — Á.', 'Sai — Cap-pa không phải dãy ranh giới giữa châu Âu và châu Á.', 'Sai — dãy Pi-rê-nê ngăn Tây Ban Nha với Pháp, không phải ranh giới Âu — Á.', 'Đúng — dãy U-ran (Ural) là ranh giới tự nhiên giữa châu Âu và châu Á.']),
    Q('Đồng bằng lớn nhất châu Âu?', ['Đồng bằng Đông Âu (Nga)', 'Đồng bằng Hung-ga-ri', 'Đồng bằng Trung Âu', 'Đồng bằng Pa-ri'], 0, 'Đồng bằng Đông Âu rộng lớn nhất.',[
      "Đồng bằng lớn nhất châu Âu là <b>đồng bằng Đông Âu</b> (đồng bằng Nga), trải rộng trên phần lãnh thổ Nga thuộc châu Âu.",
      "Địa hình châu Âu chủ yếu là <i>đồng bằng</i> (chiếm khoảng 2/3 diện tích), xen kẽ với các vùng núi già và núi trẻ.",
      "Các đồng bằng khác như Trung Âu, Hung-ga-ri, Pa-ri đều nhỏ hơn đồng bằng Đông Âu.",
    ],
     ['Đúng — đồng bằng Đông Âu (Nga) rộng lớn nhất châu Âu.', 'Sai — đồng bằng Hung-ga-ri nhỏ hơn nhiều so với Đông Âu.', 'Sai — đồng bằng Trung Âu nhỏ hơn đồng bằng Đông Âu.', 'Sai — đồng bằng Pa-ri nhỏ, không phải lớn nhất châu Âu.']),
    Q('Bán đảo nào lớn nhất châu Âu?', ['Bán đảo I-ta-li-a', 'Bán đảo Xcan-đi-na-vi', 'Bán đảo Ban-căng', 'Bán đảo I-bê-rích'], 1, 'Bán đảo Scandinavi (Na Uy, Thuỵ Điển) lớn nhất châu Âu.',[
      "Bán đảo lớn nhất châu Âu là bán đảo <b>Xcan-đi-na-vi</b> (Scandinavi), gồm các nước <b>Na Uy</b> và <b>Thuỵ Điển</b>.",
      "Đường bờ biển châu Âu bị cắt xẻ mạnh, tạo nhiều <i>bán đảo, vịnh, đảo</i> lớn.",
      "Các bán đảo khác như I-ta-li-a (hình chiếc ủng), I-bê-rích, Ban-căng đều nhỏ hơn Xcan-đi-na-vi.",
    ],
     ['Sai — bán đảo I-ta-li-a hình chiếc ủng nhỏ hơn Xcan-đi-na-vi.', 'Đúng — bán đảo Xcan-đi-na-vi (Na Uy, Thuỵ Điển) lớn nhất châu Âu.', 'Sai — bán đảo Ban-căng nhỏ hơn Xcan-đi-na-vi.', 'Sai — bán đảo I-bê-rích (Tây Ban Nha, Bồ Đào Nha) nhỏ hơn Xcan-đi-na-vi.']),
  ]),

  M(23, 'Khí hậu và dân cư châu Âu', [
    Q('Phần lớn lãnh thổ châu Âu có khí hậu?', ['Hàn đới', 'Nhiệt đới', 'Xích đạo', 'Ôn đới'], 3, 'Châu Âu chủ yếu ôn đới (ôn đới hải dương, lục địa).',[
      "Phần lớn lãnh thổ châu Âu nằm trong đới <b>khí hậu ôn đới</b>.",
      "Châu Âu có các kiểu khí hậu chính: <ul><li><b>ôn đới hải dương</b> (Tây Âu);</li><li><b>ôn đới lục địa</b> (Đông Âu);</li><li>khí hậu <b>Địa Trung Hải</b> (Nam Âu);</li><li>một phần nhỏ hàn đới ở cực bắc.</li></ul>",
      "Khí hậu ôn hoà là điều kiện thuận lợi cho sản xuất và đời sống.",
    ],
     ['Sai — chỉ vùng cực bắc châu Âu mới có hàn đới, không phải phần lớn.', 'Sai — châu Âu nằm vĩ độ cao, không phải khí hậu nhiệt đới.', 'Sai — xích đạo nóng ẩm thuộc vùng gần xích đạo, không phải châu Âu.', 'Đúng — phần lớn châu Âu có khí hậu ôn đới (hải dương, lục địa).']),
    Q('Khí hậu ôn đới hải dương đặc trưng cho vùng nào châu Âu?', ['Bắc cực', 'Tây Âu (Anh, Pháp, Đức)', 'Đông Âu', 'Địa Trung Hải'], 1, 'Tây Âu chịu ảnh hưởng dòng biển nóng — ôn đới hải dương.',[
      "Khí hậu <b>ôn đới hải dương</b> đặc trưng cho vùng <b>Tây Âu</b> (Anh, Pháp, Đức...).",
      "Đặc điểm: <ul><li>mùa hạ <i>mát</i>, mùa đông <i>không lạnh lắm</i>;</li><li>mưa quanh năm, độ ẩm cao.</li></ul>",
      "Sở dĩ như vậy là do Tây Âu chịu ảnh hưởng của <b>dòng biển nóng</b> Bắc Đại Tây Dương và gió tây ôn đới từ biển thổi vào.",
    ],
     ['Sai — vùng Bắc cực có khí hậu hàn đới, không phải ôn đới hải dương.', 'Đúng — Tây Âu (Anh, Pháp, Đức) chịu ảnh hưởng biển nóng, ôn đới hải dương.', 'Sai — Đông Âu sâu trong lục địa nên là ôn đới lục địa.', 'Sai — vùng Địa Trung Hải có khí hậu Địa Trung Hải, không phải hải dương.']),
    Q('Khí hậu Địa Trung Hải có đặc điểm?', ['Mưa quanh năm', 'Mùa hạ nóng — khô, mùa đông ấm — mưa', 'Khô hạn quanh năm', 'Bốn mùa lạnh'], 1, 'Khí hậu Địa Trung Hải đặc trưng Nam Âu.',[
      "Khí hậu <b>Địa Trung Hải</b> đặc trưng cho vùng Nam Âu, ven Địa Trung Hải.",
      "Đặc điểm nổi bật: <ul><li>mùa hạ <b>nóng và khô</b>;</li><li>mùa đông <b>ấm và mưa nhiều</b>.</li></ul>",
      "Kiểu khí hậu này thuận lợi cho trồng các cây như nho, ô liu, cam, chanh — đặc sản của vùng Địa Trung Hải.",
    ],
     ['Sai — khí hậu Địa Trung Hải mưa vào mùa đông, không mưa quanh năm.', 'Đúng — Địa Trung Hải: mùa hạ nóng — khô, mùa đông ấm — mưa.', 'Sai — Địa Trung Hải có mùa đông mưa, không khô hạn quanh năm.', 'Sai — khí hậu Địa Trung Hải ấm áp, không phải bốn mùa lạnh.']),
    Q('Dân cư châu Âu chủ yếu thuộc chủng tộc nào?', ['Môn-gô-lô-ít', 'Ô-xtra-lô-ít', 'Nê-grô-ít', 'Ơ-rô-pê-ô-ít (da trắng)'], 3, 'Châu Âu chủ yếu chủng Âu (Europoid) da trắng.',[
      "Dân cư châu Âu chủ yếu thuộc chủng tộc <b>Ơ-rô-pê-ô-ít</b> (Europoid) — người <i>da trắng</i>.",
      "Đặc điểm: da trắng, mũi cao, mắt sáng màu... <ul><li>Đây là một trong ba đại chủng tộc chính của loài người.</li></ul>",
      "Phân biệt: chủng <i>Môn-gô-lô-ít</i> (châu Á), <i>Nê-grô-ít</i> (châu Phi), <i>Ô-xtra-lô-ít</i> (châu Đại Dương).",
    ],
     ['Sai — chủng Môn-gô-lô-ít chủ yếu ở châu Á, không phải châu Âu.', 'Sai — chủng Ô-xtra-lô-ít ở châu Đại Dương, không phải châu Âu.', 'Sai — chủng Nê-grô-ít chủ yếu ở châu Phi, không phải châu Âu.', 'Đúng — dân cư châu Âu chủ yếu là chủng Ơ-rô-pê-ô-ít (da trắng).']),
    Q('Châu Âu có đặc điểm dân cư nổi bật nào?', ['Đa số sống ở nông thôn', 'Dân số trẻ tăng nhanh', 'Mật độ rất thấp', 'Dân số già, tỉ lệ đô thị hoá cao'], 3, 'Dân số châu Âu già, tỉ lệ đô thị hoá ~75%.',[
      "Dân cư châu Âu có hai đặc điểm nổi bật:",
      "<ul><li><b>Dân số già</b>: tỉ lệ người cao tuổi lớn, tỉ lệ sinh thấp, dân số tăng chậm.</li><li><b>Tỉ lệ đô thị hoá cao</b> (khoảng 75%): phần lớn dân sống ở các thành phố.</li></ul>",
      "Tình trạng dân số già đặt ra nhiều thách thức về lao động và an sinh xã hội cho các nước châu Âu.",
    ],
     ['Sai — phần lớn dân châu Âu sống ở đô thị, không phải nông thôn.', 'Sai — dân số châu Âu già và tăng chậm, không phải trẻ tăng nhanh.', 'Sai — châu Âu có mật độ dân khá cao, không phải rất thấp.', 'Đúng — châu Âu có dân số già, tỉ lệ đô thị hoá cao (~75%).']),
  ]),

  M(24, 'Châu Phi — vị trí, địa hình, khí hậu', [
    Q('Châu Phi có vị trí?', ['Nằm cân xứng hai bên xích đạo', 'Hoàn toàn ở bán cầu Bắc', 'Ở vùng cực', 'Hoàn toàn ở bán cầu Nam'], 0, 'Châu Phi nằm cân xứng hai bên xích đạo → khí hậu nóng.',[
      "<b>Châu Phi</b> nằm <b>cân xứng hai bên đường xích đạo</b>.",
      "Phần lớn lãnh thổ nằm giữa hai chí tuyến, nên châu Phi có khí hậu <b>nóng</b>, là châu lục nóng nhất thế giới.",
      "Đường bờ biển châu Phi ít bị cắt xẻ, có dạng khối \"mập mạp\".",
    ],
     ['Đúng — châu Phi nằm cân xứng hai bên xích đạo nên khí hậu nóng.', 'Sai — châu Phi trải cả hai bán cầu, không chỉ ở bán cầu Bắc.', 'Sai — châu Phi nằm quanh xích đạo, không phải ở vùng cực.', 'Sai — châu Phi trải cả hai bán cầu, không chỉ ở bán cầu Nam.']),
    Q('Châu Phi rộng đứng thứ mấy thế giới?', ['Thứ 5 (nhầm với châu Nam Cực)', 'Thứ 1 (vị trí của châu Á)', 'Thứ 3 (~30 triệu km²)', 'Thứ 7 (không tồn tại — chỉ có 6 châu lục)'], 2, 'Châu Phi rộng ~30,3 triệu km² — đứng thứ 3.',[
      "<b>Châu Phi</b> có diện tích khoảng <b>30,3 triệu km²</b>, đứng <b>thứ ba</b> thế giới về diện tích.",
      "Xếp hạng diện tích: châu Á (1) > châu Mỹ (2) > châu Phi (3) > châu Nam Cực > châu Âu > châu Đại Dương.",
      "Châu Phi nối với châu Á qua eo đất Xuy-ê (kênh đào Xuy-ê).",
    ],
     ['Sai — thứ 5 là vị trí của châu Nam Cực, không phải châu Phi.', 'Sai — thứ 1 là châu Á; châu Phi đứng thứ 3.', 'Đúng — châu Phi rộng ~30,3 triệu km², đứng thứ 3 thế giới.', 'Sai — chỉ có 6 châu lục nên không có thứ 7.']),
    Q('Sa mạc lớn nhất thế giới ở châu Phi là?', ['Ka-la-ha-ri', 'Gô-bi (sa mạc ở Trung Á, Mông Cổ)', 'A-ta-ca-ma', 'Xa-ha-ra'], 3, 'Xa-ha-ra ~9 triệu km² — sa mạc nóng lớn nhất thế giới.',[
      "Sa mạc lớn nhất thế giới là sa mạc <b>Xa-ha-ra</b>, nằm ở <b>Bắc Phi</b>, rộng khoảng <b>9 triệu km²</b>.",
      "Xa-ha-ra là sa mạc <i>nóng</i> lớn nhất thế giới, gần bằng diện tích cả châu Âu. <ul><li>Khí hậu cực kì khô hạn, chênh lệch nhiệt độ ngày — đêm rất lớn.</li></ul>",
      "Phân biệt: <i>Gô-bi</i> (Trung Á), <i>A-ta-ca-ma</i> (Nam Mỹ), <i>Ka-la-ha-ri</i> (Nam Phi, nhỏ hơn Xa-ha-ra).",
    ],
     ['Sai — Ka-la-ha-ri ở Nam Phi nhưng nhỏ hơn Xa-ha-ra nhiều.', 'Sai — Gô-bi là sa mạc ở Trung Á, Mông Cổ, không ở châu Phi.', 'Sai — A-ta-ca-ma ở Nam Mỹ, không phải châu Phi.', 'Đúng — Xa-ha-ra (~9 triệu km²) là sa mạc nóng lớn nhất thế giới.']),
    Q('Sông dài nhất châu Phi (cũng dài nhất thế giới) là?', ['Sông Nin (Nile)', 'Sông Ni-giê', 'Sông Công-gô', 'Sông Dăm-be-zi'], 0, 'Sông Nin dài ~6650 km — dài nhất thế giới.',[
      "Sông <b>Nin</b> (Nile) là sông dài nhất châu Phi, đồng thời là sông <b>dài nhất thế giới</b>, khoảng <b>6650 km</b>.",
      "Sông Nin chảy theo hướng từ nam lên bắc, đổ ra Địa Trung Hải. <ul><li>Lưu vực sông Nin là cái nôi của nền văn minh Ai Cập cổ đại.</li></ul>",
      "Phân biệt với các sông khác ở châu Phi: Công-gô, Ni-giê, Dăm-be-zi — đều ngắn hơn sông Nin.",
    ],
     ['Đúng — sông Nin dài ~6650 km, dài nhất châu Phi và thế giới.', 'Sai — sông Ni-giê ngắn hơn sông Nin nhiều.', 'Sai — sông Công-gô lưu lượng lớn nhưng không dài bằng sông Nin.', 'Sai — sông Dăm-be-zi ngắn hơn sông Nin.']),
    Q('Khí hậu châu Phi chủ yếu?', ['Lạnh quanh năm', 'Hàn đới', 'Khô và nóng (nhiệt đới, hoang mạc)', 'Ôn đới hải dương'], 2, 'Phần lớn châu Phi khô nóng, có sa mạc rộng lớn.',[
      "Phần lớn châu Phi có khí hậu <b>khô và nóng</b>.",
      "Các kiểu khí hậu chính: <ul><li><b>nhiệt đới</b> và <b>hoang mạc</b> chiếm phần lớn diện tích;</li><li>khí hậu xích đạo ẩm ở vùng trung tâm;</li><li>khí hậu Địa Trung Hải ở cực bắc và cực nam.</li></ul>",
      "Vì nằm cân xứng hai bên xích đạo nên châu Phi nóng quanh năm, có nhiều <i>hoang mạc</i> rộng lớn.",
    ],
     ['Sai — châu Phi nóng, không lạnh quanh năm.', 'Sai — hàn đới ở vùng cực, không phải châu Phi.', 'Đúng — phần lớn châu Phi khô và nóng (nhiệt đới, hoang mạc).', 'Sai — ôn đới hải dương là khí hậu của Tây Âu, không phải châu Phi.']),
  ]),

  M(25, 'Dân cư — xã hội châu Phi', [
    Q('Dân cư châu Phi chủ yếu thuộc chủng tộc nào?', ['Ơ-rô-pê-ô-ít', 'Ô-xtra-lô-ít', 'Môn-gô-lô-ít', 'Nê-grô-ít (da đen)'], 3, 'Phần lớn dân châu Phi là chủng Nê-grô-ít.',[
      "Dân cư châu Phi chủ yếu thuộc chủng tộc <b>Nê-grô-ít</b> (Negroid) — người <i>da đen</i>.",
      "Đặc điểm: da đen, tóc xoăn, môi dày... <ul><li>Ở Bắc Phi còn có người thuộc chủng Ơ-rô-pê-ô-ít.</li></ul>",
      "Phân biệt: chủng <i>Ơ-rô-pê-ô-ít</i> (châu Âu), <i>Môn-gô-lô-ít</i> (châu Á), <i>Ô-xtra-lô-ít</i> (châu Đại Dương).",
    ],
     ['Sai — chủng Ơ-rô-pê-ô-ít chủ yếu ở châu Âu, không phải châu Phi.', 'Sai — chủng Ô-xtra-lô-ít ở châu Đại Dương, không phải châu Phi.', 'Sai — chủng Môn-gô-lô-ít chủ yếu ở châu Á, không phải châu Phi.', 'Đúng — phần lớn dân châu Phi thuộc chủng Nê-grô-ít (da đen).']),
    Q('Dân số châu Phi hiện khoảng?', ['~500 triệu', '~5 tỉ (vượt mức dân số toàn thế giới)', '~100 triệu', '~1,4 tỉ người'], 3, 'Châu Phi ~1,4 tỉ người, tăng nhanh.',[
      "Dân số châu Phi hiện nay khoảng <b>1,4 tỉ người</b>.",
      "Châu Phi có tỉ lệ <i>gia tăng dân số tự nhiên cao</i> nhất thế giới, dân số <b>trẻ</b> và <b>tăng nhanh</b>.",
      "Điều này vừa là nguồn lao động dồi dào, vừa tạo sức ép lớn về lương thực, việc làm, giáo dục, y tế.",
    ],
     ['Sai — ~500 triệu là con số quá thấp so với thực tế.', 'Sai — ~5 tỉ vượt quá thực tế; cả thế giới chỉ ~8 tỉ.', 'Sai — ~100 triệu quá ít so với dân số châu Phi.', 'Đúng — châu Phi hiện có khoảng 1,4 tỉ người và tăng nhanh.']),
    Q('Châu Phi là nơi phát tích của loài người, gắn với phát hiện hoá thạch ở?', ['Tây Phi', 'Đông Phi (Ê-ti-ô-pi-a, Kê-ni-a)', 'Nam Phi', 'Bắc Phi'], 1, 'Đông Phi là cái nôi loài người (hoá thạch Lucy ở Ê-ti-ô-pi-a).',[
      "Châu Phi được coi là nơi <b>phát tích của loài người</b>.",
      "Các phát hiện <i>hoá thạch người cổ</i> quan trọng nhất được tìm thấy ở <b>Đông Phi</b> (Ê-ti-ô-pi-a, Kê-ni-a), tiêu biểu là hoá thạch \"Lucy\".",
      "Từ Đông Phi, loài người dần di cư đi khắp các châu lục. Phân biệt: Bắc Phi gắn với văn minh Ai Cập cổ đại.",
    ],
     ['Sai — Tây Phi không phải nơi tìm thấy hoá thạch người cổ tiêu biểu.', 'Đúng — Đông Phi (Ê-ti-ô-pi-a, Kê-ni-a) là cái nôi loài người (hoá thạch Lucy).', 'Sai — Nam Phi có di chỉ nhưng cái nôi tiêu biểu là Đông Phi.', 'Sai — Bắc Phi gắn với văn minh Ai Cập, không phải nơi phát tích loài người.']),
    Q('Khó khăn lớn nhất của châu Phi hiện nay?', ['Đói nghèo, xung đột, dịch bệnh', 'Dư thừa tài nguyên', 'Đô thị hoá quá mức', 'Dân số quá già'], 0, 'Châu Phi đối mặt với đói nghèo, xung đột, dịch bệnh.',[
      "Châu Phi hiện đang đối mặt với nhiều khó khăn lớn:",
      "<ul><li><b>Đói nghèo</b> — nhiều quốc gia thuộc nhóm kém phát triển nhất thế giới;</li><li><b>Xung đột</b> sắc tộc, nội chiến;</li><li><b>Dịch bệnh</b> (sốt rét, HIV/AIDS...).</li></ul>",
      "Châu Phi giàu tài nguyên nhưng bị khai thác thuộc địa lâu dài, kinh tế còn lạc hậu, đây là nguyên nhân sâu xa của các khó khăn trên.",
    ],
     ['Đúng — châu Phi đối mặt với đói nghèo, xung đột, dịch bệnh.', 'Sai — châu Phi giàu tài nguyên nhưng khai thác kém, không phải dư thừa.', 'Sai — vấn đề là đô thị hoá tự phát chứ không phải đô thị hoá quá mức.', 'Sai — dân số châu Phi trẻ và tăng nhanh, không phải quá già.']),
    Q('Ai Cập nằm ở khu vực nào của châu Phi?', ['Đông Phi', 'Nam Phi', 'Bắc Phi', 'Trung Phi'], 2, 'Ai Cập ở Bắc Phi, bên bờ sông Nin.',[
      "<b>Ai Cập</b> nằm ở khu vực <b>Bắc Phi</b>, bên bờ sông <b>Nin</b> và giáp Địa Trung Hải, Biển Đỏ.",
      "Ai Cập là nơi hình thành <i>nền văn minh Ai Cập cổ đại</i> rực rỡ (kim tự tháp, chữ tượng hình...).",
      "Phân biệt: <i>Đông Phi</i> (Ê-ti-ô-pi-a, Kê-ni-a), <i>Nam Phi</i> (cực nam), <i>Trung Phi</i> (quanh xích đạo) — đều khác Bắc Phi.",
    ],
     ['Sai — Ai Cập ở Bắc Phi, còn Đông Phi gồm Ê-ti-ô-pi-a, Kê-ni-a.', 'Sai — Nam Phi nằm ở cực nam lục địa, còn Ai Cập ở phía bắc.', 'Đúng — Ai Cập nằm ở Bắc Phi, bên bờ sông Nin.', 'Sai — Trung Phi nằm quanh xích đạo, còn Ai Cập ở phía bắc.']),
  ]),

  M(26, 'Châu Mỹ — phát kiến, vị trí, địa hình', [
    Q('Người châu Âu đầu tiên tìm ra châu Mỹ là?', ['Va-xcô đơ Ga-ma', 'B. Đi-a-xơ', 'C. Cô-lôm-bô (1492)', 'Ma-gien-lăng'], 2, 'Cô-lôm-bô tìm ra châu Mỹ năm 1492.',[
      "Người châu Âu đầu tiên tìm ra châu Mỹ là <b>C. Cô-lôm-bô</b>, vào năm <b>1492</b>.",
      "Trong chuyến đi do Tây Ban Nha tài trợ, ông vượt Đại Tây Dương về phía tây và đặt chân tới châu Mỹ.",
      "Phân biệt: <i>Va-xcô đơ Ga-ma</i> đến Ấn Độ; <i>Đi-a-xơ</i> tới mũi Hảo Vọng; <i>Ma-gien-lăng</i> đi vòng quanh thế giới.",
    ],
     ['Sai — Va-xcô đơ Ga-ma đến Ấn Độ, không phải tìm ra châu Mỹ.', 'Sai — Đi-a-xơ tới mũi Hảo Vọng châu Phi, không tìm ra châu Mỹ.', 'Đúng — C. Cô-lôm-bô tìm ra châu Mỹ năm 1492.', 'Sai — Ma-gien-lăng đi vòng quanh thế giới, không phải người tìm ra châu Mỹ.']),
    Q('Châu Mỹ trải dài từ?', ['Chỉ ở Nam bán cầu', 'Quanh xích đạo', 'Vùng cực Bắc đến cực Nam', 'Chỉ ở Bắc bán cầu'], 2, 'Châu Mỹ kéo dài từ vòng cực Bắc đến gần cực Nam.',[
      "<b>Châu Mỹ</b> là một châu lục rộng lớn, trải dài trên cả hai bán cầu.",
      "Lãnh thổ châu Mỹ kéo dài từ <b>vùng cực Bắc</b> đến gần <b>cực Nam</b>, qua đủ các đới khí hậu.",
      "Vì trải dài như vậy, châu Mỹ có thiên nhiên rất <i>đa dạng</i> từ băng giá đến rừng rậm nhiệt đới.",
    ],
     ['Sai — châu Mỹ trải cả hai bán cầu, không chỉ ở Nam bán cầu.', 'Sai — châu Mỹ kéo dài rất xa, không chỉ quanh xích đạo.', 'Đúng — châu Mỹ trải từ vòng cực Bắc đến gần cực Nam.', 'Sai — châu Mỹ trải cả hai bán cầu, không chỉ ở Bắc bán cầu.']),
    Q('Dãy núi nào dài nhất thế giới ở châu Mỹ?', ['Hi-ma-lay-a', 'An-pơ (dãy núi trẻ ở châu Âu)', 'U-ran (ranh giới Âu — Á)', 'An-đét (Andes, ~7000 km)'], 3, 'Dãy An-đét chạy dọc bờ Tây Nam Mỹ — dài nhất thế giới.',[
      "Dãy núi <b>An-đét</b> (Andes), dài khoảng <b>7000 km</b>, là dãy núi <i>dài nhất thế giới</i>.",
      "An-đét chạy dọc theo bờ <b>phía tây Nam Mỹ</b>, qua nhiều quốc gia. <ul><li>Đây là một dãy núi trẻ, còn hoạt động địa chất mạnh (động đất, núi lửa).</li></ul>",
      "Phân biệt với các dãy khác: <i>Hi-ma-lay-a</i> (châu Á), <i>An-pơ</i> (châu Âu), <i>U-ran</i> (ranh giới Âu — Á).",
    ],
     ['Sai — Hi-ma-lay-a ở châu Á, không phải châu Mỹ.', 'Sai — An-pơ ở châu Âu, không phải châu Mỹ.', 'Sai — U-ran là ranh giới Âu — Á, không ở châu Mỹ.', 'Đúng — dãy An-đét (~7000 km) chạy dọc Tây Nam Mỹ, dài nhất thế giới.']),
    Q('Sông lớn nhất châu Mỹ (lưu lượng lớn nhất thế giới)?', ['A-ma-dôn', 'Pa-ra-na', 'Mi-xi-xi-pi', 'Cô-lô-ra-đô'], 0, 'Sông A-ma-dôn có lưu lượng nước lớn nhất thế giới.',[
      "Sông <b>A-ma-dôn</b> (Amazon) ở Nam Mỹ là sông có <b>lưu lượng nước lớn nhất thế giới</b>.",
      "Lưu vực sông A-ma-dôn rộng lớn, mưa nhiều quanh năm, có khu rừng nhiệt đới khổng lồ.",
      "Phân biệt: các sông Pa-ra-na, Mi-xi-xi-pi, Cô-lô-ra-đô đều có lưu lượng nhỏ hơn A-ma-dôn nhiều.",
    ],
     ['Đúng — sông A-ma-dôn có lưu lượng nước lớn nhất thế giới.', 'Sai — sông Pa-ra-na nhỏ hơn A-ma-dôn nhiều.', 'Sai — sông Mi-xi-xi-pi ở Bắc Mỹ, lưu lượng nhỏ hơn A-ma-dôn.', 'Sai — sông Cô-lô-ra-đô nhỏ hơn A-ma-dôn rất nhiều.']),
    Q('Châu Mỹ được chia thành?', ['Bắc Mỹ, Trung Mỹ và Nam Mỹ', '2 phần', '5 phần', '7 phần'], 0, 'Châu Mỹ thường được chia thành Bắc — Trung — Nam Mỹ.',[
      "Về mặt tự nhiên và lịch sử, <b>châu Mỹ</b> thường được chia thành ba khu vực:",
      "<ul><li><b>Bắc Mỹ</b>;</li><li><b>Trung Mỹ</b> (gồm cả vùng Ca-ri-bê);</li><li><b>Nam Mỹ</b>.</li></ul>",
      "Trung và Nam Mỹ còn được gọi chung là khu vực <i>Mỹ La-tinh</i>.",
    ],
     ['Đúng — châu Mỹ thường được chia thành Bắc Mỹ, Trung Mỹ và Nam Mỹ.', 'Sai — châu Mỹ chia thành 3 phần, không phải 2.', 'Sai — châu Mỹ chia thành 3 phần, không phải 5.', 'Sai — châu Mỹ chia thành 3 phần, không phải 7.']),
  ]),

  M(27, 'Khí hậu và dân cư châu Mỹ', [
    Q('Khí hậu châu Mỹ?', ['Chỉ có khí hậu nóng', 'Đa dạng, đủ các đới từ hàn đới đến xích đạo', 'Chỉ có khí hậu lạnh', 'Đồng đều khắp nơi'], 1, 'Châu Mỹ có đủ các đới khí hậu.',[
      "Vì lãnh thổ trải dài từ vùng cực Bắc đến gần cực Nam, châu Mỹ có khí hậu rất <b>đa dạng</b>.",
      "Châu Mỹ có đủ các đới khí hậu: <ul><li>từ <b>hàn đới</b> (vùng cực);</li><li>qua ôn đới, nhiệt đới;</li><li>đến <b>xích đạo</b> (vùng A-ma-dôn).</li></ul>",
      "Sự đa dạng khí hậu tạo nên các cảnh quan phong phú từ băng tuyết đến rừng rậm xích đạo.",
    ],
     ['Sai — châu Mỹ trải dài nên có đủ các đới, không chỉ khí hậu nóng.', 'Đúng — khí hậu châu Mỹ đa dạng, đủ các đới từ hàn đới đến xích đạo.', 'Sai — châu Mỹ có cả vùng nóng lẫn lạnh, không chỉ khí hậu lạnh.', 'Sai — khí hậu châu Mỹ phân hoá mạnh, không đồng đều khắp nơi.']),
    Q('Rừng A-ma-dôn được mệnh danh là?', ['"Đại dương xanh"', '"Lá phổi xanh của Trái Đất"', '"Hoang mạc cát"', '"Sa mạc lớn nhất"'], 1, 'Rừng nhiệt đới A-ma-dôn là "lá phổi xanh" của Trái Đất.',[
      "Rừng nhiệt đới <b>A-ma-dôn</b> ở Nam Mỹ được mệnh danh là <b>\"lá phổi xanh của Trái Đất\"</b>.",
      "Đây là khu rừng nhiệt đới lớn nhất thế giới, có vai trò: <ul><li>điều hoà khí hậu toàn cầu;</li><li>cung cấp lượng lớn <code>khí ô-xi</code>;</li><li>là kho dự trữ sinh học (đa dạng sinh vật) khổng lồ.</li></ul>",
      "Việc rừng A-ma-dôn bị tàn phá là mối lo lớn cho môi trường toàn cầu.",
    ],
     ['Sai — "đại dương xanh" không phải tên gọi của rừng A-ma-dôn.', 'Đúng — rừng A-ma-dôn được mệnh danh "lá phổi xanh của Trái Đất".', 'Sai — A-ma-dôn là rừng rậm nhiệt đới, không phải hoang mạc cát.', 'Sai — A-ma-dôn là rừng, không phải sa mạc.']),
    Q('Dân cư bản địa của châu Mỹ trước khi người châu Âu đến là?', ['Người Mã Lai', 'Người Ấn Độ', 'Người Hán', 'Người In-đi-an và E-xki-mô'], 3, 'Người In-đi-an ở Trung — Nam Mỹ, người E-xki-mô ở Bắc cực.',[
      "Trước khi người châu Âu đến, dân cư <b>bản địa</b> của châu Mỹ là người <b>In-đi-an</b> và người <b>E-xki-mô</b>.",
      "<ul><li>Người <b>In-đi-an</b> sinh sống chủ yếu ở Trung và Nam Mỹ, đã tạo nên các nền văn minh Mai-a, A-dơ-tếch, In-ca.</li><li>Người <b>E-xki-mô</b> sống ở vùng băng giá cực bắc.</li></ul>",
      "Cả hai nhóm này đều thuộc chủng <i>Môn-gô-lô-ít</i>, di cư từ châu Á sang từ rất lâu đời.",
    ],
     ['Sai — người Mã Lai ở Đông Nam Á, không phải dân bản địa châu Mỹ.', 'Sai — người Ấn Độ ở Nam Á; dân bản địa châu Mỹ là In-đi-an và E-xki-mô.', 'Sai — người Hán ở Trung Quốc, không phải dân bản địa châu Mỹ.', 'Đúng — dân bản địa châu Mỹ là người In-đi-an và E-xki-mô.']),
    Q('Người da đen ở châu Mỹ chủ yếu là?', ['Người bản địa', 'Người Trung Quốc nhập cư', 'Hậu duệ nô lệ bị bắt từ châu Phi', 'Người Mê-hi-cô'], 2, 'Thời thuộc địa, nô lệ châu Phi bị đưa sang châu Mỹ làm việc.',[
      "Người <b>da đen</b> ở châu Mỹ chủ yếu là <b>hậu duệ của nô lệ</b> bị bắt từ <b>châu Phi</b> sang.",
      "Thời thuộc địa, thực dân châu Âu đưa hàng triệu người da đen từ châu Phi sang châu Mỹ làm nô lệ trong các đồn điền.",
      "Vì vậy, ngày nay châu Mỹ là nơi có thành phần dân cư rất <i>đa dạng</i>: người da trắng, da đen, In-đi-an và người lai.",
    ],
     ['Sai — dân bản địa châu Mỹ là người In-đi-an, không phải người da đen.', 'Sai — người Trung Quốc nhập cư là người da vàng, không phải da đen.', 'Đúng — người da đen ở châu Mỹ chủ yếu là hậu duệ nô lệ bị bắt từ châu Phi.', 'Sai — người Mê-hi-cô phần lớn là người lai, không phải nhóm da đen chủ yếu.']),
    Q('Châu Mỹ được gọi là "Tân thế giới" vì?', ['Người châu Âu mới phát hiện ra từ cuối thế kỉ XV', 'Có nền kinh tế mới', 'Mới có loài người', 'Mới hình thành'], 0, 'Châu Âu khám phá ra châu Mỹ cuối thế kỉ XV → "Tân thế giới".',[
      "Châu Mỹ được người châu Âu gọi là <b>\"Tân thế giới\"</b> (thế giới mới).",
      "Lí do: châu Mỹ chỉ được người châu Âu <i>phát hiện</i> vào <b>cuối thế kỉ XV</b> (1492), muộn hơn các châu lục đã biết từ trước (châu Âu, Á, Phi — \"Cựu thế giới\").",
      "Thực ra loài người (người In-đi-an) đã sinh sống ở châu Mỹ từ rất lâu trước đó; chỉ là <code>\"mới\"</code> đối với người châu Âu.",
    ],
     ['Đúng — châu Mỹ được người châu Âu mới phát hiện cuối thế kỉ XV nên gọi là "Tân thế giới".', 'Sai — tên gọi này do mốc phát hiện, không phải vì nền kinh tế mới.', 'Sai — loài người đã sống ở châu Mỹ từ lâu trước khi người châu Âu đến.', 'Sai — châu Mỹ hình thành từ lâu; "mới" là với người châu Âu.']),
  ]),

  M(28, 'Châu Đại Dương — vị trí, đặc điểm', [
    Q('Châu Đại Dương gồm?', ['Bắc Cực', 'Chỉ một đảo lớn', 'Lục địa Ô-xtrây-li-a và nhiều quần đảo Thái Bình Dương', 'Nam Cực'], 2, 'Châu Đại Dương = Australia + các quần đảo Thái Bình Dương.',[
      "<b>Châu Đại Dương</b> nằm giữa Thái Bình Dương rộng lớn.",
      "Châu Đại Dương gồm: <ul><li>lục địa <b>Ô-xtrây-li-a</b> (Australia);</li><li>vô số <b>quần đảo</b> lớn nhỏ trên Thái Bình Dương (Mê-la-nê-di, Mi-crô-nê-di, Pô-li-nê-di...).</li></ul>",
      "Phân biệt: <i>Bắc Cực</i> chỉ là vùng biển băng; <i>Nam Cực</i> là một châu lục riêng (châu Nam Cực).",
    ],
     ['Sai — Bắc Cực là vùng biển băng, không phải châu Đại Dương.', 'Sai — châu Đại Dương gồm lục địa Úc và nhiều quần đảo, không chỉ một đảo.', 'Đúng — châu Đại Dương gồm lục địa Ô-xtrây-li-a và nhiều quần đảo Thái Bình Dương.', 'Sai — Nam Cực là một châu lục riêng (châu Nam Cực).']),
    Q('Quốc gia lớn nhất châu Đại Dương?', ['Ô-xtrây-li-a (Úc)', 'Niu Di-lân', 'Phi-gi', 'Pa-pua Niu Ghi-nê'], 0, 'Úc chiếm phần lớn diện tích châu Đại Dương.',[
      "Quốc gia lớn nhất châu Đại Dương là <b>Ô-xtrây-li-a</b> (nước Úc).",
      "Úc chiếm phần lớn diện tích châu Đại Dương, là một lục địa độc lập giữa Thái Bình Dương và Ấn Độ Dương.",
      "Các nước còn lại như Niu Di-lân, Pa-pua Niu Ghi-nê, Phi-gi... đều nhỏ hơn Úc rất nhiều.",
    ],
     ['Đúng — Ô-xtrây-li-a (Úc) chiếm phần lớn diện tích châu Đại Dương.', 'Sai — Niu Di-lân nhỏ hơn Úc rất nhiều.', 'Sai — Phi-gi là quốc đảo nhỏ, không phải lớn nhất.', 'Sai — Pa-pua Niu Ghi-nê nhỏ hơn Úc nhiều.']),
    Q('Châu Đại Dương có diện tích?', ['Bằng châu Á', 'Nhỏ nhất thế giới (~8,5 triệu km²)', 'Lớn nhất', 'Bằng châu Phi'], 1, 'Châu Đại Dương là châu lục nhỏ nhất.',[
      "<b>Châu Đại Dương</b> là châu lục có diện tích <b>nhỏ nhất</b> thế giới, khoảng <b>8,5 triệu km²</b>.",
      "Dù diện tích nhỏ nhưng châu Đại Dương lại trải trên một vùng biển rộng lớn của Thái Bình Dương.",
      "Xếp hạng diện tích từ nhỏ đến lớn: châu Đại Dương < châu Âu < châu Nam Cực < châu Phi < châu Mỹ < châu Á.",
    ],
     ['Sai — châu Á (~44 triệu km²) lớn hơn châu Đại Dương rất nhiều.', 'Đúng — châu Đại Dương nhỏ nhất thế giới (~8,5 triệu km²).', 'Sai — châu Đại Dương nhỏ nhất, không phải lớn nhất.', 'Sai — châu Phi (~30 triệu km²) lớn hơn châu Đại Dương nhiều.']),
    Q('Phần lớn lục địa Úc có khí hậu?', ['Hàn đới', 'Mưa nhiều', 'Khô hạn, nhiều hoang mạc', 'Lạnh quanh năm'], 2, 'Trung tâm Úc là hoang mạc rộng lớn.',[
      "Phần lớn lục địa <b>Ô-xtrây-li-a</b> (Úc) có khí hậu <b>khô hạn</b>.",
      "Vùng trung tâm và phía tây Úc là các <b>hoang mạc</b> rộng lớn, ít mưa. <ul><li>Dân cư tập trung chủ yếu ở ven biển phía đông và đông nam, nơi mưa nhiều hơn.</li></ul>",
      "Đây là một trong những lục địa khô hạn nhất thế giới.",
    ],
     ['Sai — hàn đới ở vùng cực, còn Úc phần lớn khô hạn.', 'Sai — phần lớn Úc khô hạn, không phải mưa nhiều.', 'Đúng — phần lớn lục địa Úc khô hạn, nhiều hoang mạc.', 'Sai — Úc nằm vùng nóng, không lạnh quanh năm.']),
    Q('Loài thú đặc trưng của Úc là?', ['Gấu trắng', 'Hươu cao cổ', 'Kăng-gu-ru và gấu túi', 'Voi (đặc trưng châu Phi và Nam Á)'], 2, 'Úc có nhiều loài thú có túi đặc trưng.',[
      "Do tách biệt với các lục địa khác từ lâu, châu Đại Dương (nhất là Úc) có nhiều loài sinh vật <i>độc đáo, đặc hữu</i>.",
      "Tiêu biểu là các loài <b>thú có túi</b> như <b>kăng-gu-ru</b> và <b>gấu túi</b> (koala).",
      "Phân biệt với các loài đặc trưng châu lục khác: <i>voi</i> (châu Phi, Nam Á), <i>hươu cao cổ</i> (châu Phi), <i>gấu trắng</i> (Bắc Cực).",
    ],
     ['Sai — gấu trắng sống ở vùng Bắc cực, không phải ở Úc.', 'Sai — hươu cao cổ sống ở châu Phi, không phải ở Úc.', 'Đúng — kăng-gu-ru và gấu túi là loài thú có túi đặc trưng của Úc.', 'Sai — voi đặc trưng cho châu Phi và Nam Á, không phải Úc.']),
  ]),

  M(29, 'Việt Nam — Đất nước Đại Việt thời Lê sơ (1428–1527)', [
    Q('Vị vua nào nổi tiếng cải cách hành chính, ban hành luật Hồng Đức?', ['Lê Nhân Tông', 'Lê Thánh Tông', 'Lê Hiển Tông', 'Lê Lợi'], 1, 'Lê Thánh Tông (1460–1497) — vị vua minh quân vĩ đại.',[
      "Vị vua tiêu biểu nhất của nhà Lê sơ là <b>Lê Thánh Tông</b> (trị vì 1460–1497).",
      "Ông tiến hành cuộc <b>cải cách hành chính</b> lớn, củng cố chế độ quân chủ tập quyền, và cho ban hành bộ <b>luật Hồng Đức</b> (Quốc triều hình luật).",
      "Thời Lê Thánh Tông được coi là thời kì <i>thịnh trị</i> bậc nhất của chế độ phong kiến Việt Nam.",
    ],
     ['Sai — Lê Nhân Tông không phải vua ban hành luật Hồng Đức.', 'Đúng — Lê Thánh Tông (1460–1497) cải cách hành chính, ban hành luật Hồng Đức.', 'Sai — Lê Hiển Tông là vua thời Lê trung hưng về sau.', 'Sai — Lê Lợi lập nhà Lê sơ, còn luật Hồng Đức do Lê Thánh Tông ban hành.']),
    Q('Bộ luật Hồng Đức (Quốc triều hình luật) có điểm tiến bộ nào?', ['Chỉ dành cho quý tộc', 'Phân biệt giai cấp tuyệt đối', 'Bảo vệ một số quyền của phụ nữ', 'Chỉ bảo vệ vua'], 2, 'Luật Hồng Đức tiến bộ, bảo vệ phần nào quyền phụ nữ.',[
      "Bộ <b>luật Hồng Đức</b> (Quốc triều hình luật) ban hành thời Lê Thánh Tông có nhiều điểm tiến bộ.",
      "Một điểm nổi bật là <b>bảo vệ một số quyền lợi của phụ nữ</b>: <ul><li>quyền thừa kế tài sản;</li><li>quyền trong hôn nhân, gia đình.</li></ul>",
      "Đây là điểm <i>tiến bộ</i> hiếm thấy trong luật pháp phong kiến đương thời.",
    ],
     ['Sai — luật Hồng Đức áp dụng cho cả xã hội, không chỉ quý tộc.', 'Sai — điểm tiến bộ của luật là bảo vệ phụ nữ, không phải phân biệt giai cấp.', 'Đúng — luật Hồng Đức tiến bộ ở chỗ bảo vệ một số quyền của phụ nữ.', 'Sai — luật điều chỉnh cả xã hội, không chỉ bảo vệ vua.']),
    Q('Lê Thánh Tông chia cả nước thành?', ['63 tỉnh', '13 đạo thừa tuyên', '15 bộ', '7 châu'], 1, 'Năm 1471, Lê Thánh Tông chia cả nước thành 13 đạo thừa tuyên.',[
      "Trong cuộc cải cách hành chính, năm <b>1471</b>, <b>Lê Thánh Tông</b> chia cả nước thành <b>13 đạo thừa tuyên</b> và một phủ Trung Đô.",
      "Mỗi đạo thừa tuyên có ba cơ quan phụ trách các mặt khác nhau, giúp quản lí đất nước chặt chẽ, tăng cường quyền lực trung ương.",
      "Phân biệt: <i>63 tỉnh</i> là cách chia hành chính hiện đại; <i>15 bộ</i> gắn với thời Hùng Vương (truyền thuyết).",
    ],
     ['Sai — 63 tỉnh là cách chia hành chính hiện đại, không phải thời Lê sơ.', 'Đúng — năm 1471 Lê Thánh Tông chia cả nước thành 13 đạo thừa tuyên.', 'Sai — 15 bộ là cách chia thời Hùng Vương (truyền thuyết), không phải Lê sơ.', 'Sai — Lê Thánh Tông chia thành 13 đạo thừa tuyên, không phải 7 châu.']),
    Q('Văn hoá thời Lê sơ ảnh hưởng tư tưởng nào?', ['Thiên Chúa giáo', 'Nho giáo độc tôn', 'Đạo giáo', 'Phật giáo'], 1, 'Nho giáo trở thành quốc giáo, chi phối giáo dục và chính trị.',[
      "Văn hoá, giáo dục thời Lê sơ chịu ảnh hưởng sâu sắc của <b>Nho giáo</b>.",
      "Nho giáo được đề cao thành <b>tư tưởng độc tôn</b>, chi phối: <ul><li>giáo dục và khoa cử (lấy Nho học làm chính);</li><li>tổ chức nhà nước và đời sống xã hội.</li></ul>",
      "Phân biệt: thời <i>Lý — Trần</i> Phật giáo thịnh hành, còn thời <i>Lê sơ</i> đề cao Nho giáo.",
    ],
     ['Sai — Thiên Chúa giáo chưa phổ biến ở thời Lê sơ.', 'Đúng — thời Lê sơ Nho giáo độc tôn, chi phối giáo dục và chính trị.', 'Sai — Đạo giáo không phải tư tưởng chủ đạo thời Lê sơ.', 'Sai — Phật giáo thịnh thời Lý — Trần, còn Lê sơ đề cao Nho giáo.']),
    Q('Tác phẩm sử học nổi tiếng do Ngô Sĩ Liên biên soạn thời Lê sơ?', ['Bình Ngô đại cáo', 'Đại Việt sử ký toàn thư', 'Truyện Kiều', 'Hịch tướng sĩ'], 1, 'Ngô Sĩ Liên biên soạn Đại Việt sử ký toàn thư.',[
      "Bộ sử lớn được biên soạn thời Lê sơ là <b>Đại Việt sử ký toàn thư</b>, do sử gia <b>Ngô Sĩ Liên</b> biên soạn.",
      "Đây là bộ <i>quốc sử</i> quan trọng, ghi chép lịch sử nước ta từ thời Hồng Bàng đến đầu thời Lê.",
      "Phân biệt: <i>\"Bình Ngô đại cáo\"</i> (Nguyễn Trãi), <i>\"Hịch tướng sĩ\"</i> (Trần Hưng Đạo), <i>\"Truyện Kiều\"</i> (Nguyễn Du) — không phải tác phẩm sử học của Ngô Sĩ Liên.",
    ],
     ['Sai — "Bình Ngô đại cáo" là của Nguyễn Trãi, không phải sử của Ngô Sĩ Liên.', 'Đúng — Ngô Sĩ Liên biên soạn Đại Việt sử ký toàn thư thời Lê sơ.', 'Sai — "Truyện Kiều" là của Nguyễn Du, một tác phẩm văn học.', 'Sai — "Hịch tướng sĩ" là của Trần Hưng Đạo thời Trần.']),
  ]),

  M(30, 'Việt Nam — Đại Việt thời Mạc, Trịnh — Nguyễn phân tranh', [
    Q('Nhà Mạc do ai sáng lập (1527)?', ['Nguyễn Hoàng', 'Mạc Đăng Dung', 'Trịnh Kiểm', 'Lê Lợi'], 1, 'Mạc Đăng Dung cướp ngôi nhà Lê, lập nhà Mạc 1527.',[
      "Năm <b>1527</b>, <b>Mạc Đăng Dung</b> ép vua Lê nhường ngôi, lập ra <b>nhà Mạc</b>.",
      "Sự kiện này chấm dứt thời kì Lê sơ, mở đầu giai đoạn <i>chia cắt, loạn lạc</i> kéo dài của đất nước.",
      "Phân biệt: <i>Nguyễn Hoàng</i> mở Đàng Trong, <i>Trịnh Kiểm</i> là chúa Trịnh, <i>Lê Lợi</i> lập nhà Lê sơ — không phải người lập nhà Mạc.",
    ],
     ['Sai — Nguyễn Hoàng là người mở mang Đàng Trong, không lập nhà Mạc.', 'Đúng — Mạc Đăng Dung cướp ngôi nhà Lê, lập nhà Mạc năm 1527.', 'Sai — Trịnh Kiểm là chúa Trịnh phù Lê, không lập nhà Mạc.', 'Sai — Lê Lợi lập nhà Lê sơ năm 1428, trước nhà Mạc rất lâu.']),
    Q('Cuộc chiến Nam — Bắc triều diễn ra giữa?', ['Lê và Trịnh', 'Pháp và Đại Việt', 'Trịnh và Nguyễn', 'Nhà Mạc (Bắc triều) và nhà Lê — Trịnh (Nam triều)'], 3, 'Nam — Bắc triều: Lê — Trịnh chống nhà Mạc.',[
      "Cuộc chiến <b>Nam — Bắc triều</b> diễn ra giữa hai thế lực:",
      "<ul><li><b>Bắc triều</b>: nhà <b>Mạc</b> (đóng ở Thăng Long);</li><li><b>Nam triều</b>: nhà <b>Lê — Trịnh</b> (lập ở Thanh Hoá, nêu danh nghĩa \"phù Lê diệt Mạc\").</li></ul>",
      "Phân biệt: <i>Trịnh — Nguyễn phân tranh</i> là cuộc chiến khác (về sau), chia đất nước thành Đàng Trong — Đàng Ngoài.",
    ],
     ['Sai — Lê và Trịnh cùng phe Nam triều, không đối đầu nhau ở giai đoạn này.', 'Sai — chiến tranh Pháp — Đại Việt xảy ra muộn hơn nhiều (giữa thế kỉ XIX).', 'Sai — Trịnh — Nguyễn phân tranh là cuộc chiến khác, không phải Nam — Bắc triều.', 'Đúng — Nam — Bắc triều là chiến tranh giữa nhà Mạc và nhà Lê — Trịnh.']),
    Q('Sông Gianh là ranh giới giữa?', ['Đông và Tây', 'Đàng Trong (chúa Nguyễn) và Đàng Ngoài (chúa Trịnh)', 'Việt Nam và Trung Quốc', 'Bắc Bộ và Trung Bộ'], 1, 'Sông Gianh chia đất nước thành Đàng Trong — Đàng Ngoài.',[
      "Trong thời kì Trịnh — Nguyễn phân tranh, <b>sông Gianh</b> (Quảng Bình) trở thành <i>ranh giới</i> chia cắt đất nước.",
      "<ul><li>Phía bắc sông Gianh là <b>Đàng Ngoài</b>, do <b>chúa Trịnh</b> nắm quyền (danh nghĩa vẫn là vua Lê).</li><li>Phía nam là <b>Đàng Trong</b>, do <b>chúa Nguyễn</b> cai quản.</li></ul>",
      "Đây là tình trạng đất nước bị <code>chia cắt</code> kéo dài hơn 200 năm.",
    ],
     ['Sai — sông Gianh chia Nam — Bắc (Đàng Trong — Đàng Ngoài), không phải Đông — Tây.', 'Đúng — sông Gianh là ranh giới Đàng Trong (chúa Nguyễn) và Đàng Ngoài (chúa Trịnh).', 'Sai — biên giới Việt — Trung ở phía bắc, không phải sông Gianh.', 'Sai — sông Gianh phân chia Đàng Trong — Đàng Ngoài, không phải ranh giới vùng địa lí hiện nay.']),
    Q('Người mở mang Đàng Trong, đặt nền móng cho chúa Nguyễn?', ['Trịnh Tùng', 'Nguyễn Hoàng', 'Mạc Đăng Dung', 'Lê Thánh Tông'], 1, 'Nguyễn Hoàng (1558) vào trấn thủ Thuận Hoá — Quảng Nam.',[
      "Người đặt nền móng cho thế lực <b>chúa Nguyễn</b> ở Đàng Trong là <b>Nguyễn Hoàng</b>.",
      "Năm <b>1558</b>, Nguyễn Hoàng xin vào trấn thủ vùng <b>Thuận Hoá — Quảng Nam</b>, từ đó từng bước xây dựng cơ nghiệp riêng, mở mang bờ cõi về phía nam.",
      "Phân biệt: <i>Trịnh Tùng</i> là chúa Trịnh ở Đàng Ngoài; <i>Mạc Đăng Dung</i> lập nhà Mạc; <i>Lê Thánh Tông</i> là vua Lê sơ.",
    ],
     ['Sai — Trịnh Tùng là chúa Trịnh ở Đàng Ngoài, không mở mang Đàng Trong.', 'Đúng — Nguyễn Hoàng (1558) vào trấn thủ Thuận Hoá — Quảng Nam, mở Đàng Trong.', 'Sai — Mạc Đăng Dung lập nhà Mạc, không liên quan Đàng Trong.', 'Sai — Lê Thánh Tông là vua nhà Lê sơ, sống trước thời chúa Nguyễn.']),
    Q('Tình trạng Trịnh — Nguyễn phân tranh kéo dài khoảng?', ['50 năm', '1000 năm', 'Hơn 200 năm', '20 năm'], 2, 'Trịnh — Nguyễn phân tranh kéo dài từ thế kỉ XVII đến cuối XVIII.',[
      "Tình trạng <b>Trịnh — Nguyễn phân tranh</b> kéo dài <b>hơn 200 năm</b> (từ thế kỉ XVII đến cuối thế kỉ XVIII).",
      "Hai bên nhiều lần giao tranh ác liệt nhưng không phân thắng bại, lấy sông Gianh làm ranh giới.",
      "Cuộc chia cắt này gây nhiều <i>đau khổ</i> cho nhân dân, kìm hãm sự phát triển của đất nước.",
    ],
     ['Sai — 50 năm là quá ngắn so với thực tế hơn 200 năm.', 'Sai — 1000 năm là phi lí, đó gần bằng cả thời Bắc thuộc.', 'Đúng — Trịnh — Nguyễn phân tranh kéo dài hơn 200 năm (thế kỉ XVII đến cuối XVIII).', 'Sai — 20 năm quá ngắn so với thực tế hơn 200 năm.']),
  ]),

  M(31, 'Việt Nam — Phong trào Tây Sơn (1771–1802)', [
    Q('Ba anh em Tây Sơn quê ở?', ['Hà Nội', 'TP HCM', 'Huế (kinh đô nhà Nguyễn về sau)', 'Bình Định'], 3, 'Ba anh em Nguyễn Nhạc — Nguyễn Huệ — Nguyễn Lữ quê Bình Định.',[
      "Lãnh đạo phong trào Tây Sơn là ba anh em <b>Nguyễn Nhạc — Nguyễn Huệ — Nguyễn Lữ</b>.",
      "Ba anh em quê ở <b>Bình Định</b> (vùng đất Tây Sơn), thuộc Đàng Trong.",
      "Phong trào lấy tên \"Tây Sơn\" từ chính quê hương khởi nghĩa của họ.",
    ],
     ['Sai — Hà Nội (Thăng Long) ở phía bắc, không phải quê Tây Sơn.', 'Sai — TP HCM thuộc Nam Bộ, không phải quê ba anh em Tây Sơn.', 'Sai — Huế là kinh đô nhà Nguyễn về sau, không phải quê Tây Sơn.', 'Đúng — ba anh em Nguyễn Nhạc — Nguyễn Huệ — Nguyễn Lữ quê ở Bình Định.']),
    Q('Khởi nghĩa Tây Sơn nổ ra năm?', ['1789', '1771', '1802', '1858'], 1, 'Năm 1771, ba anh em Tây Sơn dựng cờ khởi nghĩa.',[
      "Phong trào nông dân <b>Tây Sơn</b> bùng nổ năm <b>1771</b>.",
      "Nguyên nhân: chế độ chúa Nguyễn ở Đàng Trong mục nát, đời sống nhân dân cực khổ. <ul><li>Ba anh em Tây Sơn dựng cờ khởi nghĩa, được nhân dân hưởng ứng.</li></ul>",
      "Phân biệt mốc: <code>1785</code> (đánh quân Xiêm), <code>1789</code> (đại phá quân Thanh), <code>1802</code> (Tây Sơn sụp đổ).",
    ],
     ['Sai — 1789 là năm Quang Trung đại phá quân Thanh, không phải năm nổ ra.', 'Đúng — năm 1771 ba anh em Tây Sơn dựng cờ khởi nghĩa.', 'Sai — 1802 là năm Nguyễn Ánh lập nhà Nguyễn, kết thúc Tây Sơn.', 'Sai — 1858 là năm Pháp nổ súng xâm lược, muộn hơn nhiều.']),
    Q('Năm 1785, Nguyễn Huệ đánh tan quân Xiêm ở?', ['Ngọc Hồi', 'Bạch Đằng', 'Chi Lăng', 'Rạch Gầm — Xoài Mút'], 3, 'Rạch Gầm — Xoài Mút (Tiền Giang) — diệt 5 vạn quân Xiêm.',[
      "Năm <b>1785</b>, <b>Nguyễn Huệ</b> chỉ huy quân Tây Sơn đánh tan <b>5 vạn quân Xiêm</b> xâm lược ở trận <b>Rạch Gầm — Xoài Mút</b> (trên sông Tiền, Tiền Giang).",
      "Đây là một trong những trận <i>thuỷ chiến</i> lớn nhất trong lịch sử chống ngoại xâm của dân tộc.",
      "Phân biệt: <i>Ngọc Hồi — Đống Đa</i> (chống Thanh, 1789), <i>Bạch Đằng</i> (Ngô Quyền, Trần), <i>Chi Lăng</i> (Lam Sơn chống Minh).",
    ],
     ['Sai — Ngọc Hồi gắn với chiến thắng quân Thanh năm 1789, không phải quân Xiêm.', 'Sai — Bạch Đằng gắn với Ngô Quyền và nhà Trần, không phải trận chống Xiêm.', 'Sai — Chi Lăng gắn với khởi nghĩa Lam Sơn chống Minh.', 'Đúng — năm 1785 Nguyễn Huệ đánh tan quân Xiêm ở Rạch Gầm — Xoài Mút.']),
    Q('Tết Kỷ Dậu 1789, Quang Trung đại phá quân nào ở Ngọc Hồi — Đống Đa?', ['Quân Tống', 'Quân Nguyên', 'Quân Thanh', 'Quân Minh'], 2, 'Quang Trung — Nguyễn Huệ đại phá 29 vạn quân Thanh Tết 1789.',[
      "Tết <b>Kỷ Dậu 1789</b>, vua <b>Quang Trung — Nguyễn Huệ</b> chỉ huy quân Tây Sơn thần tốc tiến ra Bắc, đại phá <b>29 vạn quân Thanh</b>.",
      "Chiến thắng vang dội ở <b>Ngọc Hồi — Đống Đa</b> đã quét sạch quân Thanh, bảo vệ nền độc lập dân tộc.",
      "Phân biệt: quân <i>Tống</i> (nhà Lý đánh 1077), quân <i>Nguyên</i> (nhà Trần), quân <i>Minh</i> (Lê Lợi đánh 1427).",
    ],
     ['Sai — quân Tống bị nhà Lý đánh bại năm 1077, không phải 1789.', 'Sai — quân Nguyên bị nhà Trần đánh bại thế kỉ XIII.', 'Đúng — Tết Kỷ Dậu 1789 Quang Trung đại phá 29 vạn quân Thanh.', 'Sai — quân Minh bị Lê Lợi đánh bại năm 1427, không phải 1789.']),
    Q('Triều đại Tây Sơn kết thúc năm?', ['1858', '1789', '1802 (khi Nguyễn Ánh lập nhà Nguyễn)', '1771'], 2, 'Năm 1802, Nguyễn Ánh đánh bại Tây Sơn, lập nhà Nguyễn.',[
      "Sau khi Quang Trung mất sớm (1792), triều Tây Sơn suy yếu.",
      "Năm <b>1802</b>, <b>Nguyễn Ánh</b> đánh bại triều Tây Sơn, lên ngôi (hiệu Gia Long), lập ra <b>nhà Nguyễn</b> — chấm dứt phong trào Tây Sơn.",
      "Phân biệt mốc: <code>1771</code> (Tây Sơn khởi nghĩa), <code>1789</code> (chiến thắng quân Thanh) — khác năm Tây Sơn kết thúc.",
    ],
     ['Sai — 1858 là năm Pháp nổ súng xâm lược, sau khi Tây Sơn đã sụp.', 'Sai — 1789 là năm chiến thắng quân Thanh, Tây Sơn đang hưng thịnh.', 'Đúng — năm 1802 Nguyễn Ánh đánh bại Tây Sơn, lập nhà Nguyễn.', 'Sai — 1771 là năm Tây Sơn khởi nghĩa, không phải năm kết thúc.']),
  ]),

  M(32, 'Việt Nam — Nhà Nguyễn (1802–1858)', [
    Q('Người sáng lập nhà Nguyễn?', ['Lê Lợi', 'Nguyễn Huệ', 'Lý Công Uẩn', 'Nguyễn Ánh (Gia Long)'], 3, 'Nguyễn Ánh lên ngôi năm 1802, hiệu Gia Long.',[
      "Người sáng lập <b>nhà Nguyễn</b> là <b>Nguyễn Ánh</b>.",
      "Năm <b>1802</b>, sau khi đánh bại Tây Sơn, Nguyễn Ánh lên ngôi, lấy niên hiệu <b>Gia Long</b>, lập ra triều Nguyễn — triều đại phong kiến cuối cùng của Việt Nam.",
      "Phân biệt: <i>Lê Lợi</i> lập nhà Lê sơ; <i>Nguyễn Huệ</i> là vua Tây Sơn; <i>Lý Công Uẩn</i> lập nhà Lý.",
    ],
     ['Sai — Lê Lợi lập nhà Lê sơ năm 1428, không phải nhà Nguyễn.', 'Sai — Nguyễn Huệ là vua Tây Sơn, đối thủ của Nguyễn Ánh.', 'Sai — Lý Công Uẩn lập nhà Lý năm 1010.', 'Đúng — Nguyễn Ánh lên ngôi năm 1802, hiệu Gia Long, lập nhà Nguyễn.']),
    Q('Quốc hiệu Việt Nam chính thức xuất hiện năm?', ['1945', '1428', '1804 (thời Gia Long)', '1010'], 2, 'Năm 1804, Gia Long đổi quốc hiệu thành Việt Nam.',[
      "Năm <b>1804</b>, vua <b>Gia Long</b> đặt quốc hiệu nước ta là <b>Việt Nam</b>.",
      "Đây là lần đầu tiên quốc hiệu \"Việt Nam\" chính thức xuất hiện trong lịch sử. (Đến thời Minh Mạng đổi thành <i>Đại Nam</i>.)",
      "Phân biệt mốc: <code>1010</code> (thời Lý, quốc hiệu Đại Việt), <code>1428</code> (Lê sơ, Đại Việt), <code>1945</code> (lập nước Việt Nam Dân chủ Cộng hoà).",
    ],
     ['Sai — 1945 là năm lập nước Việt Nam Dân chủ Cộng hoà, muộn hơn nhiều.', 'Sai — 1428 quốc hiệu là Đại Việt, chưa phải Việt Nam.', 'Đúng — năm 1804 Gia Long đổi quốc hiệu thành Việt Nam.', 'Sai — 1010 là thời Lý, quốc hiệu lúc đó chưa phải Việt Nam.']),
    Q('Kinh đô nhà Nguyễn đặt ở?', ['Phú Xuân (Huế)', 'Hoa Lư', 'Thăng Long', 'Hà Nội'], 0, 'Nhà Nguyễn đóng đô ở Phú Xuân (Huế).',[
      "Kinh đô của <b>nhà Nguyễn</b> đặt ở <b>Phú Xuân</b> (tức <b>Huế</b> ngày nay).",
      "Tại đây, nhà Nguyễn xây dựng <i>Kinh thành Huế</i> với hệ thống cung điện, lăng tẩm bề thế (nay là Di sản văn hoá thế giới).",
      "Phân biệt: <i>Hoa Lư</i> (Đinh — Tiền Lê), <i>Thăng Long</i> (Lý — Trần — Lê) — không phải kinh đô nhà Nguyễn.",
    ],
     ['Đúng — nhà Nguyễn đóng đô ở Phú Xuân (Huế).', 'Sai — Hoa Lư là kinh đô thời Đinh — Tiền Lê.', 'Sai — Thăng Long là kinh đô từ thời Lý đến Lê, không phải nhà Nguyễn.', 'Sai — Hà Nội (Thăng Long) không phải kinh đô nhà Nguyễn.']),
    Q('Bộ luật ban hành thời Gia Long là?', ['Hoàng Việt luật lệ (Luật Gia Long)', 'Hình thư', 'Hồng Đức', 'Quốc triều hình luật'], 0, 'Luật Gia Long ban hành năm 1815.',[
      "Bộ luật ban hành thời <b>Gia Long</b> là <b>Hoàng Việt luật lệ</b> (thường gọi là <b>Luật Gia Long</b>), năm <b>1815</b>.",
      "Bộ luật này mang tính hà khắc, bảo vệ chặt chẽ quyền lợi của nhà vua và chế độ phong kiến.",
      "Phân biệt với các bộ luật khác: <i>Hình thư</i> (Lý), <i>Quốc triều hình luật</i> (Trần), <i>luật Hồng Đức</i> (Lê sơ).",
    ],
     ['Đúng — Hoàng Việt luật lệ (Luật Gia Long) ban hành năm 1815.', 'Sai — Hình thư là bộ luật thời Lý.', 'Sai — Luật Hồng Đức là thời Lê sơ.', 'Sai — Quốc triều hình luật gắn với thời Trần và Lê, không phải Gia Long.']),
    Q('Nhà Nguyễn thi hành chính sách ngoại giao gì với phương Tây?', ['Bế quan toả cảng, cấm đạo Thiên Chúa', 'Liên kết với Pháp', 'Cho phương Tây cai trị', 'Mở cửa rộng rãi'], 0, 'Nhà Nguyễn bế quan toả cảng, cấm đạo → cô lập đất nước.',[
      "Về đối ngoại, nhà Nguyễn thi hành chính sách <b>\"bế quan toả cảng\"</b> và <b>cấm đạo Thiên Chúa</b>.",
      "<ul><li>Hạn chế giao thương, đóng cửa với phương Tây.</li><li>Cấm và đàn áp việc truyền đạo Thiên Chúa.</li></ul>",
      "Chính sách <i>cô lập, đóng cửa</i> này khiến đất nước ngày càng lạc hậu, suy yếu, tạo cớ để thực dân Pháp xâm lược (1858).",
    ],
     ['Đúng — nhà Nguyễn bế quan toả cảng, cấm đạo Thiên Chúa, cô lập đất nước.', 'Sai — nhà Nguyễn dè dặt với Pháp, không liên kết.', 'Sai — nhà Nguyễn đóng cửa, không cho phương Tây cai trị.', 'Sai — nhà Nguyễn đóng cửa chứ không mở cửa rộng rãi.']),
  ]),

  M(33, 'Châu Á — Đông Nam Á: tự nhiên và dân cư', [
    Q('Đông Nam Á gồm bao nhiêu quốc gia?', ['30 quốc gia', '11 quốc gia', '5 quốc gia', '20 quốc gia'], 1, 'Đông Nam Á có 11 nước (kể cả Đông Ti-mo).',[
      "Khu vực <b>Đông Nam Á</b> hiện nay gồm <b>11 quốc gia</b>.",
      "Đó là: Việt Nam, Lào, Cam-pu-chia, Thái Lan, Mi-an-ma, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Phi-líp-pin, Bru-nây và <b>Đông Ti-mo</b>.",
      "Đông Nam Á nằm ở phía đông nam châu Á, là cầu nối giữa lục địa Á — Âu và châu Đại Dương.",
    ],
     ['Sai — 30 quốc gia là quá nhiều so với thực tế 11 nước.', 'Đúng — Đông Nam Á có 11 quốc gia (kể cả Đông Ti-mo).', 'Sai — 5 quốc gia là quá ít; ĐNA có 11 nước.', 'Sai — 20 quốc gia là quá nhiều so với thực tế 11 nước.']),
    Q('Đông Nam Á chia thành hai khu vực?', ['Đông Nam Á lục địa và Đông Nam Á hải đảo', 'Bắc và Nam', 'Trên và dưới', 'Đông và Tây'], 0, 'ĐNA lục địa (Việt Nam, Lào...) và hải đảo (In-đô, Phi-líp-pin...).',[
      "<b>Đông Nam Á</b> được chia thành hai bộ phận:",
      "<ul><li><b>Đông Nam Á lục địa</b> (bán đảo Trung Ấn): Việt Nam, Lào, Cam-pu-chia, Thái Lan, Mi-an-ma;</li><li><b>Đông Nam Á hải đảo</b>: In-đô-nê-xi-a, Phi-líp-pin, Ma-lai-xi-a, Xin-ga-po, Bru-nây, Đông Ti-mo.</li></ul>",
      "Cách chia này dựa trên đặc điểm <i>tự nhiên</i> (đất liền và hải đảo).",
    ],
     ['Đúng — ĐNA chia thành ĐNA lục địa và ĐNA hải đảo.', 'Sai — ĐNA chia theo lục địa — hải đảo, không phải Bắc — Nam.', 'Sai — "trên và dưới" không phải cách chia khu vực ĐNA.', 'Sai — ĐNA chia thành lục địa và hải đảo, không phải Đông — Tây.']),
    Q('Khí hậu Đông Nam Á chủ yếu?', ['Lạnh quanh năm', 'Ôn đới', 'Hàn đới', 'Nhiệt đới gió mùa và xích đạo'], 3, 'ĐNA mang khí hậu nhiệt đới gió mùa và xích đạo ẩm.',[
      "Khí hậu Đông Nam Á chủ yếu là <b>nhiệt đới gió mùa</b> và <b>xích đạo</b>.",
      "<ul><li>Đông Nam Á lục địa: chủ yếu khí hậu <b>nhiệt đới gió mùa</b>;</li><li>Đông Nam Á hải đảo: chủ yếu khí hậu <b>xích đạo</b> nóng ẩm, mưa nhiều quanh năm.</li></ul>",
      "Khí hậu nóng ẩm thuận lợi cho phát triển nền nông nghiệp <i>lúa nước</i> và rừng rậm nhiệt đới.",
    ],
     ['Sai — ĐNA nóng ẩm quanh năm, không lạnh quanh năm.', 'Sai — ôn đới là khí hậu của Tây Âu, không phải ĐNA.', 'Sai — hàn đới ở vùng cực, không phải ĐNA.', 'Đúng — ĐNA chủ yếu là khí hậu nhiệt đới gió mùa và xích đạo ẩm.']),
    Q('Quốc gia đông dân nhất Đông Nam Á?', ['Phi-líp-pin', 'Việt Nam', 'In-đô-nê-xi-a (~280 triệu)', 'Thái Lan'], 2, 'In-đô-nê-xi-a đông dân nhất ĐNA, thứ 4 thế giới.',[
      "Quốc gia <b>đông dân nhất Đông Nam Á</b> là <b>In-đô-nê-xi-a</b>, với khoảng <b>280 triệu</b> người.",
      "In-đô-nê-xi-a cũng là nước đông dân thứ <i>tư thế giới</i> (sau Ấn Độ, Trung Quốc, Hoa Kì).",
      "Phân biệt: Phi-líp-pin, Việt Nam, Thái Lan đông dân nhưng vẫn ít hơn In-đô-nê-xi-a.",
    ],
     ['Sai — Phi-líp-pin đông dân nhưng vẫn ít hơn In-đô-nê-xi-a.', 'Sai — Việt Nam đông dân nhưng vẫn ít hơn In-đô-nê-xi-a.', 'Đúng — In-đô-nê-xi-a (~280 triệu) đông dân nhất ĐNA, thứ 4 thế giới.', 'Sai — Thái Lan ít dân hơn In-đô-nê-xi-a nhiều.']),
    Q('Tổ chức ASEAN được thành lập năm?', ['1945', '1995', '1967', '2000'], 2, 'ASEAN thành lập ngày 8/8/1967 tại Băng Cốc.',[
      "Tổ chức <b>ASEAN</b> (Hiệp hội các quốc gia Đông Nam Á) được thành lập ngày <b>8/8/1967</b> tại <b>Băng Cốc</b> (Thái Lan).",
      "ASEAN ban đầu có 5 nước, nay gồm 10 nước thành viên (Đông Ti-mo đang trong tiến trình gia nhập). <ul><li>Việt Nam gia nhập ASEAN năm <code>1995</code>.</li></ul>",
      "ASEAN nhằm thúc đẩy hợp tác kinh tế, văn hoá, giữ gìn hoà bình, ổn định trong khu vực.",
    ],
     ['Sai — 1945 là năm kết thúc Thế chiến II, chưa có ASEAN.', 'Sai — 1995 là năm Việt Nam gia nhập ASEAN, không phải năm thành lập.', 'Đúng — ASEAN thành lập ngày 8/8/1967 tại Băng Cốc.', 'Sai — năm 2000 lệch mốc; ASEAN ra đời năm 1967.']),
  ]),

  M(34, 'Địa lí — Vị trí, lãnh thổ Việt Nam', [
    Q('Việt Nam nằm ở khu vực?', ['Đông Nam Á, rìa đông bán đảo Đông Dương', 'Đông Bắc Á', 'Nam Á (gồm Ấn Độ và các nước lân cận)', 'Tây Á (khu vực bán đảo A-ra-bi-a)'], 0, 'Việt Nam ở Đông Nam Á, rìa đông bán đảo Đông Dương.',[
      "<b>Việt Nam</b> nằm ở khu vực <b>Đông Nam Á</b>, ở <i>rìa phía đông</i> của bán đảo Đông Dương.",
      "Vị trí này tạo cho Việt Nam: <ul><li>khí hậu nhiệt đới gió mùa;</li><li>vai trò cầu nối giữa lục địa và biển, giữa các nước trong khu vực.</li></ul>",
      "Phân biệt: <i>Đông Bắc Á</i> (Trung Quốc, Nhật, Hàn), <i>Nam Á</i> (Ấn Độ), <i>Tây Á</i> (bán đảo A-ra-bi-a) — đều khác khu vực của Việt Nam.",
    ],
     ['Đúng — Việt Nam ở Đông Nam Á, rìa đông bán đảo Đông Dương.', 'Sai — Đông Bắc Á gồm Trung Quốc, Nhật, Hàn, không có Việt Nam.', 'Sai — Nam Á gồm Ấn Độ và lân cận, còn Việt Nam ở Đông Nam Á.', 'Sai — Tây Á là khu vực bán đảo A-ra-bi-a, không phải Việt Nam.']),
    Q('Việt Nam giáp biển nào?', ['Biển Đông', 'Biển Đỏ', 'Biển Ban-tích', 'Biển Đen'], 0, 'Phía đông và nam giáp Biển Đông.',[
      "Phía đông và phía nam, Việt Nam giáp <b>Biển Đông</b> — một biển lớn thuộc Thái Bình Dương.",
      "Đường bờ biển nước ta dài khoảng <b>3260 km</b>, với nhiều vũng, vịnh, bãi biển đẹp và giàu tài nguyên.",
      "Phân biệt: <i>Biển Đỏ</i> (giữa châu Phi và A-ráp), <i>Biển Ban-tích</i> (Bắc Âu), <i>Biển Đen</i> (giữa Âu — Á) — không giáp Việt Nam.",
    ],
     ['Đúng — Việt Nam giáp Biển Đông ở phía đông và nam.', 'Sai — Biển Đỏ nằm giữa châu Phi và bán đảo A-ráp, không giáp Việt Nam.', 'Sai — Biển Ban-tích ở Bắc Âu, không giáp Việt Nam.', 'Sai — Biển Đen ở giữa châu Âu và châu Á, không giáp Việt Nam.']),
    Q('Diện tích Việt Nam khoảng?', ['~331 000 km²', '~50 000 km²', '~5000 km²', '~1 triệu km²'], 0, 'Diện tích phần đất liền Việt Nam ~331 000 km².',[
      "Diện tích phần đất liền của <b>Việt Nam</b> khoảng <b>331 000 km²</b>.",
      "Ngoài phần đất liền, Việt Nam còn có vùng biển rộng lớn cùng nhiều đảo, quần đảo.",
      "So sánh để ghi nhớ: diện tích này lớn hơn nhiều so với các con số gây nhiễu như 5000 hay 50 000 km².",
    ],
     ['Đúng — diện tích phần đất liền Việt Nam khoảng 331 000 km².', 'Sai — ~50 000 km² quá nhỏ so với diện tích Việt Nam.', 'Sai — ~5000 km² quá nhỏ, chỉ bằng một tỉnh.', 'Sai — ~1 triệu km² là quá lớn so với Việt Nam.']),
    Q('Việt Nam tiếp giáp với mấy quốc gia trên đất liền?', ['10 nước', '5 nước', '1 nước', '3 nước (Trung Quốc, Lào, Cam-pu-chia)'], 3, 'Việt Nam giáp Trung Quốc, Lào, Cam-pu-chia.',[
      "Trên đất liền, <b>Việt Nam</b> tiếp giáp với <b>ba quốc gia</b>:",
      "<ul><li><b>Trung Quốc</b> ở phía bắc;</li><li><b>Lào</b> ở phía tây;</li><li><b>Cam-pu-chia</b> ở phía tây nam.</li></ul>",
      "Đường biên giới trên đất liền dài, đi qua nhiều địa hình núi non hiểm trở.",
    ],
     ['Sai — Việt Nam giáp 3 nước trên đất liền, không phải 10.', 'Sai — Việt Nam giáp 3 nước, không phải 5.', 'Sai — Việt Nam giáp tới 3 nước, không chỉ 1.', 'Đúng — Việt Nam giáp 3 nước: Trung Quốc, Lào, Cam-pu-chia.']),
    Q('Hai quần đảo lớn thuộc chủ quyền Việt Nam trên Biển Đông?', ['Hoàng Sa và Trường Sa', 'Cô Tô và Vân Đồn', 'Phú Quốc và Côn Đảo', 'Cát Bà và Bạch Long Vĩ'], 0, 'Hoàng Sa và Trường Sa thuộc chủ quyền Việt Nam.',[
      "Trên <b>Biển Đông</b>, Việt Nam có hai quần đảo lớn thuộc chủ quyền là <b>Hoàng Sa</b> và <b>Trường Sa</b>.",
      "Hai quần đảo này có vị trí chiến lược quan trọng và là một phần lãnh thổ thiêng liêng của Tổ quốc.",
      "Phân biệt với các đảo ven bờ: Cô Tô, Vân Đồn, Phú Quốc, Côn Đảo, Cát Bà, Bạch Long Vĩ — đều khác Hoàng Sa, Trường Sa ngoài khơi.",
    ],
     ['Đúng — Hoàng Sa và Trường Sa là hai quần đảo thuộc chủ quyền Việt Nam.', 'Sai — Cô Tô và Vân Đồn là đảo ven bờ, không phải hai quần đảo lớn ngoài khơi.', 'Sai — Phú Quốc và Côn Đảo là đảo lớn ven bờ, không phải hai quần đảo nói tới.', 'Sai — Cát Bà và Bạch Long Vĩ là đảo ven bờ, không phải Hoàng Sa — Trường Sa.']),
  ]),

  M(35, 'Ôn tập Địa lí HK2 — Tổng kết', [
    Q('Châu lục nào lớn nhất thế giới?', ['Châu Á', 'Châu Mỹ', 'Châu Phi', 'Châu Âu'], 0, 'Châu Á rộng nhất ~44,4 triệu km².',[
      "Châu lục có diện tích <b>lớn nhất</b> thế giới là <b>châu Á</b>, khoảng <b>44,4 triệu km²</b>.",
      "Châu Á chiếm khoảng 1/3 diện tích đất nổi của Trái Đất.",
      "Xếp hạng diện tích: châu Á > châu Mỹ > châu Phi > châu Nam Cực > châu Âu > châu Đại Dương.",
    ],
     ['Đúng — châu Á rộng nhất thế giới (~44,4 triệu km²).', 'Sai — châu Mỹ rộng nhưng vẫn nhỏ hơn châu Á.', 'Sai — châu Phi đứng thứ 3, nhỏ hơn châu Á.', 'Sai — châu Âu nhỏ hơn châu Á rất nhiều.']),
    Q('Sa mạc Xa-ha-ra thuộc châu nào?', ['Châu Đại Dương', 'Châu Phi', 'Châu Á', 'Châu Mỹ'], 1, 'Xa-ha-ra ở Bắc Phi — sa mạc nóng lớn nhất thế giới.',[
      "Sa mạc <b>Xa-ha-ra</b> nằm ở <b>Bắc Phi</b> (châu Phi).",
      "Đây là sa mạc <i>nóng</i> lớn nhất thế giới, rộng khoảng 9 triệu km².",
      "Phân biệt: châu Á có sa mạc <i>Gô-bi</i>; châu Đại Dương có hoang mạc ở trung tâm Úc — khác Xa-ha-ra.",
    ],
     ['Sai — châu Đại Dương có hoang mạc ở Úc nhưng không phải Xa-ha-ra.', 'Đúng — Xa-ha-ra ở Bắc Phi, sa mạc nóng lớn nhất thế giới.', 'Sai — Xa-ha-ra ở châu Phi, không phải châu Á (châu Á có Gô-bi).', 'Sai — Xa-ha-ra ở châu Phi, không phải châu Mỹ.']),
    Q('Sông A-ma-dôn chảy ở châu nào?', ['Châu Âu', 'Châu Mỹ (Nam Mỹ)', 'Châu Á', 'Châu Phi'], 1, 'Sông A-ma-dôn chảy qua Nam Mỹ — lưu lượng lớn nhất thế giới.',[
      "Sông <b>A-ma-dôn</b> chảy ở <b>Nam Mỹ</b> (châu Mỹ).",
      "A-ma-dôn là con sông có <b>lưu lượng nước lớn nhất thế giới</b>, gắn với khu rừng nhiệt đới khổng lồ — \"lá phổi xanh\" của Trái Đất.",
      "Phân biệt: châu Phi có sông Nin (dài nhất thế giới); châu Á có sông Trường Giang.",
    ],
     ['Sai — sông A-ma-dôn không chảy ở châu Âu.', 'Đúng — sông A-ma-dôn chảy ở Nam Mỹ (châu Mỹ), lưu lượng lớn nhất thế giới.', 'Sai — A-ma-dôn ở châu Mỹ, không phải châu Á.', 'Sai — A-ma-dôn ở châu Mỹ, còn châu Phi có sông Nin.']),
    Q('Dãy U-ran là ranh giới giữa?', ['Châu Âu và châu Á', 'Châu Phi và châu Âu', 'Châu Mỹ và châu Phi', 'Châu Đại Dương và châu Á'], 0, 'Dãy U-ran (Ural) phân chia châu Âu và châu Á.',[
      "Dãy <b>U-ran</b> (Ural) là ranh giới tự nhiên giữa <b>châu Âu và châu Á</b> trên lục địa Á — Âu.",
      "Dãy núi chạy theo hướng bắc — nam, phân chia hai châu lục.",
      "Phân biệt: châu Mỹ và châu Phi cách nhau bởi Đại Tây Dương; U-ran không liên quan tới các ranh giới đó.",
    ],
     ['Đúng — dãy U-ran (Ural) là ranh giới giữa châu Âu và châu Á.', 'Sai — U-ran phân chia châu Âu — châu Á, không phải Phi — Âu.', 'Sai — châu Mỹ và châu Phi cách nhau bởi Đại Tây Dương, không phải U-ran.', 'Sai — U-ran là ranh giới Âu — Á, không liên quan châu Đại Dương.']),
    Q('Quốc gia nào lớn nhất châu Đại Dương?', ['Ô-xtrây-li-a (Úc)', 'Niu Di-lân', 'Pa-pua Niu Ghi-nê', 'Phi-gi'], 0, 'Úc chiếm phần lớn diện tích châu Đại Dương.',[
      "Quốc gia lớn nhất <b>châu Đại Dương</b> là <b>Ô-xtrây-li-a</b> (nước Úc).",
      "Úc chiếm phần lớn diện tích châu Đại Dương, là một lục địa độc lập giữa Thái Bình Dương.",
      "Phân biệt: Niu Di-lân, Pa-pua Niu Ghi-nê, Phi-gi đều nhỏ hơn Úc nhiều.",
    ],
     ['Đúng — Ô-xtrây-li-a (Úc) chiếm phần lớn diện tích châu Đại Dương.', 'Sai — Niu Di-lân nhỏ hơn Úc nhiều.', 'Sai — Pa-pua Niu Ghi-nê nhỏ hơn Úc nhiều.', 'Sai — Phi-gi là quốc đảo nhỏ, không phải lớn nhất.']),
  ]),

  M(36, 'Kết thúc Lịch Sử & Địa Lý 7 — Thế giới và Việt Nam trong tầm tay', [
    Q('Khởi nghĩa Lam Sơn thắng lợi, Lê Lợi đánh đuổi quân Minh vào năm nào?',
      ['1288', '1789', '1427', '938'],
      2,
      'Năm 1427 khởi nghĩa Lam Sơn toàn thắng, Lê Lợi lập nhà Hậu Lê.',
      ['Ba mốc thắng lợi lớn của lịch sử Việt Nam thời trung đại rất dễ lẫn. Hãy gắn mỗi mốc với <b>triều đại</b> và <b>kẻ xâm lược</b>.',
       '<ul><li><b>1288</b> — Bạch Đằng, nhà <b>Trần</b> (Trần Quốc Tuấn) đánh tan quân <b>Nguyên</b> lần thứ ba</li><li><b>1427</b> — khởi nghĩa <b>Lam Sơn</b> toàn thắng, <b>Lê Lợi</b> đánh đuổi quân <b>Minh</b>, lập nhà Hậu Lê</li><li><b>1789</b> — Ngọc Hồi – Đống Đa, <b>Quang Trung</b> đánh tan quân <b>Thanh</b></li></ul>',
       'Mốc <b>938</b> (Bạch Đằng, Ngô Quyền) thuộc chương trình lớp 6 — mở đầu kỷ nguyên độc lập.'],
      ['Sai — 1288 là Bạch Đằng thời Trần, chống quân Nguyên.',
       'Sai — 1789 là Ngọc Hồi – Đống Đa, Quang Trung chống quân Thanh.',
       'Đúng — 1427 Lam Sơn toàn thắng, Lê Lợi lập nhà Hậu Lê.',
       'Sai — 938 là Bạch Đằng của Ngô Quyền.']),
    Q('Vì sao chiến thắng Bạch Đằng năm 938 được coi là mốc mở đầu kỷ nguyên độc lập?',
      ['Vì đó là chiến thắng đầu tiên của người Việt', 'Vì chấm dứt hơn 1 000 năm Bắc thuộc, mở ra thời kỳ độc lập tự chủ lâu dài', 'Vì Ngô Quyền lên ngôi hoàng đế đầu tiên', 'Vì từ đó Việt Nam không còn bị xâm lược nữa'],
      1,
      'Trước 938, nước ta bị Bắc thuộc hơn 1 000 năm; chiến thắng Bạch Đằng chấm dứt thời kỳ đó.',
      ['Từ năm <b>111 TCN</b> nước ta rơi vào thời <b>Bắc thuộc</b> kéo dài hơn <i>một nghìn năm</i>, với nhiều cuộc khởi nghĩa nhưng đều chỉ giành độc lập ngắn.',
       'Chiến thắng Bạch Đằng <b>938</b>:<ul><li>Ngô Quyền dùng <b>cọc gỗ bịt đầu sắt</b> cắm dưới lòng sông, lợi dụng thuỷ triều đánh chìm thuyền quân Nam Hán</li><li>chấm dứt hơn 1 000 năm Bắc thuộc</li><li>mở ra thời kỳ <b>độc lập, tự chủ lâu dài</b> của dân tộc</li></ul>',
       'Sau 938 nước ta vẫn còn bị xâm lược nhiều lần (Tống, Nguyên, Minh, Thanh) — nhưng luôn ở <i>tư cách một quốc gia độc lập</i> đứng lên chống ngoại xâm, chứ không còn là một quận huyện bị cai trị.'],
      ['Sai — trước đó đã có nhiều khởi nghĩa thắng lợi nhưng không giữ được lâu.',
       'Đúng — chấm dứt hơn 1 000 năm Bắc thuộc.',
       'Sai — Ngô Quyền xưng vương; Đinh Bộ Lĩnh mới xưng hoàng đế.',
       'Sai — sau 938 nước ta còn nhiều lần chống ngoại xâm.']),
    Q('Các cuộc phát kiến địa lý thế kỉ XV–XVI gắn với những nhà hàng hải nào?',
      ['Marco Polo, Trịnh Hoà, Ibn Battuta', 'Galileo, Newton, Copernicus', 'C. Columbus, Magellan, Vasco da Gama', 'James Cook, Amundsen, Livingstone'],
      2,
      'Ba tên tuổi tiêu biểu của các cuộc phát kiến địa lý là Columbus, Magellan và Vasco da Gama.',
      ['Các cuộc <b>phát kiến địa lý</b> đã nối liền thế giới và mở đầu thời đại thực dân — một bước ngoặt của Lịch Sử 7.',
       'Ba nhà hàng hải tiêu biểu:<ul><li><b>C. Columbus</b> (1492) — vượt Đại Tây Dương, tới châu Mỹ</li><li><b>Vasco da Gama</b> (1498) — vòng mũi Hảo Vọng, tới Ấn Độ bằng đường biển</li><li><b>Magellan</b> (1519–1522) — đoàn thuyền lần đầu đi vòng quanh thế giới</li></ul>',
       'Galileo, Newton, Copernicus là <i>nhà khoa học</i>; Marco Polo là nhà du hành thời trung đại trước đó; Cook và Amundsen thuộc thời cận – hiện đại.'],
      ['Sai — đó là các nhà du hành thời trung đại trước phát kiến địa lý.',
       'Sai — đó là các nhà khoa học, không phải nhà hàng hải.',
       'Đúng — Columbus, Magellan và Vasco da Gama.',
       'Sai — đó là các nhà thám hiểm thời cận – hiện đại.']),
    Q('Đặc trưng kinh tế – xã hội của các quốc gia phong kiến châu Âu thời Trung đại là?',
      ['Kinh tế trang trại, quan hệ lãnh chúa — nông nô, Giáo hội Thiên Chúa giáo có thế lực lớn', 'Kinh tế công nghiệp và nhà máy hơi nước', 'Kinh tế thương mại tự do toàn cầu', 'Kinh tế tập trung do nhà nước quản lý'],
      0,
      'Phong kiến châu Âu trung đại đặc trưng bởi trang trại (lãnh địa), quan hệ lãnh chúa — nông nô và quyền lực Giáo hội.',
      ['Xã hội phong kiến châu Âu trung đại gồm ba nét lớn:',
       '<ul><li><b>Kinh tế trang trại (lãnh địa)</b> — mỗi lãnh địa gần như tự cấp tự túc, ít giao thương</li><li><b>Quan hệ lãnh chúa — nông nô</b> — nông nô canh tác đất của lãnh chúa và phải nộp thuế, lao dịch</li><li><b>Giáo hội Thiên Chúa giáo</b> — chi phối cả đời sống tinh thần lẫn chính trị</li></ul>',
       'Nhà máy hơi nước và công nghiệp thuộc <i>thời cận đại</i> (cách mạng công nghiệp thế kỉ XVIII). Về sau, chế độ phong kiến suy vong và mầm mống <b>tư bản chủ nghĩa</b> xuất hiện, cùng phong trào <b>Văn hoá Phục hưng</b>.'],
      ['Đúng — trang trại, lãnh chúa — nông nô và Giáo hội.',
       'Sai — công nghiệp hơi nước là thời cận đại.',
       'Sai — thương mại tự do toàn cầu là hiện tượng hiện đại.',
       'Sai — kinh tế tập trung nhà nước là mô hình thế kỉ XX.']),
    Q('Vì sao châu Phi có dân số tăng nhanh nhưng kinh tế còn kém phát triển?',
      ['Vì châu Phi thiếu hoàn toàn tài nguyên thiên nhiên', 'Vì khí hậu quá lạnh không canh tác được', 'Vì tỉ lệ sinh cao trong khi bị thực dân bóc lột lâu dài, bất ổn chính trị, thiếu hạ tầng và giáo dục', 'Vì dân số già nên thiếu lao động'],
      2,
      'Dân số tăng nhanh do tỉ lệ sinh cao; kinh tế chậm phát triển do di sản thực dân, bất ổn chính trị và thiếu hạ tầng, giáo dục.',
      ['Châu Phi là ví dụ rõ nhất cho việc <b>Địa lý và Lịch sử phải đọc cùng nhau</b> mới hiểu đúng.',
       'Vì sao dân số tăng nhanh:<ul><li>tỉ lệ sinh cao — trung bình <b>4–5 con/phụ nữ</b></li><li>tỉ lệ tử vong giảm nhờ y tế cải thiện</li></ul>Vì sao kinh tế còn kém phát triển:<ul><li>bị thực dân cai trị và <b>bóc lột tài nguyên</b> lâu dài</li><li><b>bất ổn chính trị</b>, xung đột</li><li>thiếu <b>hạ tầng</b> và <b>giáo dục</b></li></ul>',
       'Châu Phi rất <i>giàu</i> tài nguyên, và có <b>dân số trẻ đông</b> — đó là lợi thế, nhưng chỉ phát huy được khi đầu tư vào giáo dục và việc làm.'],
      ['Sai — châu Phi rất giàu tài nguyên khoáng sản.',
       'Sai — phần lớn châu Phi thuộc đới nóng.',
       'Đúng — tỉ lệ sinh cao cộng với di sản thực dân, bất ổn và thiếu hạ tầng, giáo dục.',
       'Sai — châu Phi có dân số trẻ nhất thế giới.']),
    Q('Ở lớp 8, phần Địa Lý sẽ tập trung vào nội dung nào?',
      ['Địa lý các châu lục ngoài châu Á', 'Địa lý Việt Nam chuyên sâu — vị trí, địa hình, khí hậu, sông ngòi, dân cư, vùng kinh tế', 'Địa lý các đới khí hậu trên thế giới', 'Bản đồ và cách sử dụng la bàn'],
      1,
      'Địa Lý lớp 8 chuyển sang Địa lý Việt Nam chuyên sâu.',
      ['Địa Lý 7 cho em cái nhìn <b>toàn cầu</b>: các đới khí hậu, địa hình lục địa và đại dương, dân số và kinh tế thế giới.',
       'Lớp 8 thu hẹp ống kính về <b>Việt Nam</b>:<ul><li>vị trí, phạm vi lãnh thổ</li><li>địa hình, khí hậu, sông ngòi, đất và sinh vật</li><li>dân cư và các <b>vùng kinh tế</b></li></ul>',
       'Song song đó, Lịch Sử 8 bước sang <b>thời cận đại</b>: cách mạng tư sản Anh, Pháp, Mỹ; chủ nghĩa thực dân và phong trào giải phóng dân tộc; Việt Nam thế kỉ XIX khi thực dân Pháp xâm lược. Hiểu điều kiện tự nhiên của một vùng đất giúp em hiểu vì sao lịch sử của nó diễn ra như vậy.'],
      ['Sai — các châu lục đã học ở lớp 7.',
       'Đúng — lớp 8 học Địa lý Việt Nam chuyên sâu.',
       'Sai — đới khí hậu là nội dung lớp 7.',
       'Sai — bản đồ, la bàn là kĩ năng đã học từ lớp 6.']),
  ]),
];

export const S7LSDL_SCENARIOS = indexBy(S7LSDL_WEEKS);
