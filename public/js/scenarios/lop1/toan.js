// ============================================================
// Lớp 1 · TOÁN — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám SGK GDPT 2018 (3 bộ Cánh Diều / Kết nối / Chân trời).
// ID prefix: "P1-wNN-quiz" → trùng prefix module "P1".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P1', 'toan', n, title, qs, opts);

export const P1_TOAN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Làm quen với trường lớp · Vị trí', [
    Q('Quyển sách nằm TRÊN bàn. Vậy bàn ở vị trí nào so với quyển sách?', ['Bên phải sách', 'Trên sách', 'Bên trái sách', 'Dưới'], 3, 'Sách trên bàn → bàn ở DƯỚI sách.', ['Sai — bàn không nằm bên phải sách. Sách ở trên, bàn ở dưới.', 'Sai — trên là chỗ của sách, không phải bàn.', 'Sai — bàn không nằm bên trái sách. Hãy nhìn trên–dưới.', 'Đúng — sách ở trên thì bàn ở DƯỚI sách.']),
    Q('Bạn ngồi BÊN PHẢI của em. Vậy em ở phía nào của bạn?', ['Phía sau bạn', 'Phía trước bạn', 'Trái', 'Bên phải bạn'], 2, 'Đối diện của phải là trái.', ['Sai — đây là phải–trái, không phải trước–sau.', 'Sai — đây là phải–trái, không phải trước–sau.', 'Đúng — bạn ở bên phải em thì em ở bên TRÁI bạn.', 'Sai — nếu cả hai cùng bên phải thì không đúng. Phải đổi sang trái.']),
    Q('Cái bảng ở phía nào của lớp học?', ['Phía sau lớp', 'Dưới sàn', 'Trên trần', 'Trước'], 3, 'Bảng thường ở phía TRƯỚC lớp.', ['Sai — phía sau lớp thường không có bảng để cô viết.', 'Sai — bảng treo trên tường, không nằm dưới sàn.', 'Sai — bảng treo tường phía trước, không ở trên trần.', 'Đúng — bảng ở phía TRƯỚC để cả lớp nhìn rõ.']),
    Q('Tay em viết bút là tay nào (đa số)?', ['Tay chân', 'Tay trái', 'Hai tay', 'Tay phải'], 3, 'Đa số bạn dùng tay PHẢI để viết.', ['Sai — không có "tay chân", chân để đi mà.', 'Sai — một số ít bạn thuận trái, nhưng đa số viết tay phải.', 'Sai — ta cầm bút bằng một tay thôi.', 'Đúng — đa số các bạn viết bằng tay PHẢI.']),
    Q('Quả bóng lăn TỪ TRÊN xuống. Vậy bóng đi theo chiều nào?', ['Đứng yên', 'Đi lên trên', 'Lăn ngang sang phải', 'Xuống'], 3, 'Lăn từ trên → đi XUỐNG.', ['Sai — bóng đang lăn nên không đứng yên.', 'Sai — bóng đi từ trên nên không lên trên được.', 'Sai — bóng đi theo chiều trên–xuống, không sang ngang.', 'Đúng — từ trên thì bóng lăn XUỐNG dưới.']),
  ]),

  M(2, 'Các số 1, 2, 3', [
    Q('Có mấy ngón tay trên một bàn tay?', ['3', '4', '2', '5'], 3, 'Một bàn tay có 5 ngón.', ['Sai — đếm lại nhé, một bàn tay nhiều hơn 3 ngón.', 'Sai — còn thiếu một ngón nữa.', 'Sai — đếm thiếu nhiều rồi.', 'Đúng — một bàn tay có 5 ngón.']),
    Q('Đếm: ★ ★ — Có mấy ngôi sao?', ['2', '4', '1', '3'], 0, 'Có 2 ngôi sao.', ['Đúng — có 2 ngôi sao.', 'Sai — đếm thừa rồi, chỉ có 2 thôi.', 'Sai — đếm thiếu, có tới 2 ngôi sao.', 'Sai — đếm thừa rồi, chỉ có 2 ngôi sao.']),
    Q('Số 3 đứng SAU số nào?', ['2', '5', '4', '1'], 0, '1, 2, 3 → 3 đứng sau 2.', ['Đúng — đếm 1, 2, 3 thì 3 đứng sau 2.', 'Sai — 5 lớn hơn 3, không đứng trước 3.', 'Sai — 4 lớn hơn 3, không đứng trước 3.', 'Sai — sau số 1 là số 2, chưa tới 3.']),
    Q('Số nào BÉ NHẤT trong: 1, 2, 3?', ['1', '2', 'Bằng nhau', '3'], 0, '1 < 2 < 3.', ['Đúng — 1 bé nhất vì 1 < 2 < 3.', 'Sai — 2 lớn hơn 1.', 'Sai — ba số này khác nhau, không bằng nhau.', 'Sai — 3 là số lớn nhất.']),
    Q('Đếm: ● ● ● — Có mấy chấm?', ['2', '1', '4', '3'], 3, 'Ba chấm tròn.', ['Sai — đếm thiếu một chấm.', 'Sai — đếm thiếu nhiều rồi.', 'Sai — đếm thừa, chỉ có 3 chấm.', 'Đúng — có 3 chấm tròn.']),
  ]),

  M(3, 'Các số 4, 5', [
    Q('Số liền sau của 4 là?', ['5', '3', '2', '6'], 0, '4 + 1 = 5.', ['Đúng — liền sau là cộng thêm 1: 4 + 1 = 5.', 'Sai — 3 là số liền TRƯỚC 4.', 'Sai — 2 còn bé hơn nữa, không phải liền sau.', 'Sai — 6 cách 4 hai bước, không phải liền sau.']),
    Q('Số liền trước của 5 là?', ['3', '4', '5', '6'], 1, '5 − 1 = 4.', ['Sai — 3 cách 5 hai bước, không phải liền trước.', 'Đúng — liền trước là bớt 1: 5 − 1 = 4.', 'Sai — đó là chính số 5 rồi.', 'Sai — 6 là số liền SAU 5.']),
    Q('Đếm: ◆ ◆ ◆ ◆ — Có mấy hình?', ['4', '5', '2', '3'], 0, 'Bốn hình thoi.', ['Đúng — có 4 hình.', 'Sai — đếm thừa một hình.', 'Sai — đếm thiếu nhiều rồi.', 'Sai — đếm thiếu một hình.']),
    Q('Trong dãy 1, 2, 3, 4, 5: số LỚN NHẤT là?', ['5', '3', '1', '4'], 0, '5 là số lớn nhất.', ['Đúng — 5 đứng cuối nên lớn nhất.', 'Sai — 3 ở giữa, chưa lớn nhất.', 'Sai — 1 là số bé nhất.', 'Sai — 4 nhỏ hơn 5.']),
    Q('5 viên kẹo bớt 1 viên còn?', ['5', '3', '4', '6'], 2, '5 − 1 = 4.', ['Sai — đã bớt rồi thì phải ít đi, không còn 5.', 'Sai — chỉ bớt 1 viên thôi, không bớt 2.', 'Đúng — 5 − 1 = 4.', 'Sai — bớt là trừ đi, không phải cộng thêm.']),
  ]),

  M(4, 'Nhiều hơn – Ít hơn – Bằng nhau', [
    Q('3 bông hoa và 5 cái lá. Hoa và lá: cái nào ÍT HƠN?', ['Không so được', 'Bằng nhau', 'Hoa', 'Lá cây'], 2, '3 < 5 → hoa ít hơn.', ['Sai — đếm được rồi thì so sánh được mà.', 'Sai — 3 và 5 khác nhau, không bằng nhau.', 'Đúng — 3 ít hơn 5 nên hoa ít hơn.', 'Sai — lá có 5, nhiều hơn hoa.']),
    Q('4 con mèo và 4 con chó. So sánh số con?', ['Mèo nhiều hơn', 'Mèo ít hơn chó', 'Bằng nhau', 'Chó nhiều hơn'], 2, '4 = 4.', ['Sai — hai bên đều 4, không bên nào nhiều hơn.', 'Sai — hai bên đều 4, không bên nào ít hơn.', 'Đúng — 4 bằng 4 nên bằng nhau.', 'Sai — hai bên đều 4, không bên nào nhiều hơn.']),
    Q('Số 5 NHIỀU HƠN số nào?', ['8', '6', '7', '3'], 3, '5 > 3.', ['Sai — 8 lớn hơn 5.', 'Sai — 6 lớn hơn 5.', 'Sai — 7 lớn hơn 5.', 'Đúng — 5 lớn hơn 3.']),
    Q('Dấu nào dùng để chỉ "BÉ HƠN"?', ['<', 'Dấu bằng =', 'Dấu lớn >', '+'], 0, 'Dấu < là bé hơn.', ['Đúng — dấu < nghĩa là bé hơn.', 'Sai — dấu = là bằng nhau.', 'Sai — dấu > là lớn hơn.', 'Sai — dấu + là phép cộng.']),
    Q('2 … 4 — điền dấu thích hợp', ['Dấu bằng =', 'Dấu lớn >', '<', '+'], 2, '2 bé hơn 4.', ['Sai — 2 và 4 khác nhau, không dùng dấu bằng.', 'Sai — 2 không lớn hơn 4.', 'Đúng — 2 bé hơn 4 nên dùng dấu <.', 'Sai — đây là so sánh, không phải phép cộng.']),
  ]),

  M(5, 'Các số 6, 7, 8, 9, 10', [
    Q('Số liền sau của 9 là?', ['10', '8', '11', '7'], 0, '9 + 1 = 10.', ['Đúng — liền sau là cộng 1: 9 + 1 = 10.', 'Sai — 8 là số liền TRƯỚC 9.', 'Sai — 11 cách 9 hai bước.', 'Sai — 7 còn bé hơn 9.']),
    Q('Số liền trước của 7 là?', ['6', '8', '7', '5'], 0, '7 − 1 = 6.', ['Đúng — liền trước là bớt 1: 7 − 1 = 6.', 'Sai — 8 là số liền SAU 7.', 'Sai — đó là chính số 7.', 'Sai — 5 cách 7 hai bước.']),
    Q('Số 10 gồm mấy chục và mấy đơn vị?', ['0 chục 10 đơn vị', '1 chục 1 đơn vị', '1 chục 0 đơn vị', '10 chục'], 2, '10 = 1 chục.', ['Sai — 10 chính là 1 chục, không phải 0 chục.', 'Sai — 1 chục 1 đơn vị là số 11.', 'Đúng — 10 = 1 chục 0 đơn vị.', 'Sai — 10 chục là số rất lớn (100).']),
    Q('Trong các số 6, 8, 7, 9: số LỚN NHẤT là?', ['6', '8', '7', '9'], 3, '9 lớn nhất.', ['Sai — 6 là số bé nhất ở đây.', 'Sai — 8 nhỏ hơn 9.', 'Sai — 7 nhỏ hơn 9.', 'Đúng — 9 lớn nhất.']),
    Q('Đếm các số: 6, 7, 8, …, 10. Số còn thiếu là?', ['9', '11', '10', '8'], 0, '6, 7, 8, 9, 10.', ['Đúng — sau 8 là 9 rồi mới tới 10.', 'Sai — 11 lớn hơn 10, không nằm giữa.', 'Sai — 10 đã có sẵn ở cuối.', 'Sai — 8 đã có ngay trước chỗ trống.']),
    Q('Số nào BÉ HƠN 8?', ['8', '10', '9', '7'], 3, '7 < 8.', ['Sai — 8 bằng 8, không bé hơn.', 'Sai — 10 lớn hơn 8.', 'Sai — 9 lớn hơn 8.', 'Đúng — 7 bé hơn 8.']),
  ]),

  M(6, 'Số 0', [
    Q('Trong giỏ có 3 quả táo, ăn hết. Còn lại mấy quả?', ['0', '1', '3', '2'], 0, '3 − 3 = 0.', ['Đúng — ăn hết thì còn 0 quả.', 'Sai — ăn hết rồi nên không còn quả nào.', 'Sai — đó là số lúc đầu, chưa ăn.', 'Sai — ăn hết thì không còn quả nào.']),
    Q('5 + 0 = ?', ['1', '50', '0', '5'], 3, 'Cộng với 0 giữ nguyên.', ['Sai — cộng 0 không làm số to lên hay nhỏ đi.', 'Sai — viết liền 5 và 0 không phải phép cộng.', 'Sai — cộng 0 thì giữ nguyên, không về 0.', 'Đúng — cộng 0 giữ nguyên: 5 + 0 = 5.']),
    Q('0 + 7 = ?', ['1', '0', '7', '70'], 2, '0 + 7 = 7.', ['Sai — cộng 0 thì giữ nguyên là 7.', 'Sai — 0 cộng 7 vẫn còn 7.', 'Đúng — 0 + 7 = 7.', 'Sai — viết liền 7 và 0 không phải phép cộng.']),
    Q('Số 0 đứng ở vị trí nào trong dãy 0, 1, 2, 3?', ['Đầu tiên', 'Cuối cùng', 'Ở giữa số 1 và số 2', 'Sau số 3'], 0, '0 đứng đầu.', ['Đúng — 0 là số bé nhất nên đứng đầu.', 'Sai — cuối cùng là số 3.', 'Sai — giữa 1 và 2 không có chỗ cho 0.', 'Sai — sau số 3 là số 4, không phải 0.']),
    Q('4 − 4 = ?', ['8', '0', '4', '1'], 1, 'Trừ một số cho chính nó bằng 0.', ['Sai — đây là phép trừ, không phải cộng.', 'Đúng — trừ chính nó thì bằng 0.', 'Sai — đã trừ hết rồi nên không còn 4.', 'Sai — trừ hết thì còn 0, không phải 1.']),
  ]),

  M(7, 'So sánh các số trong phạm vi 10', [
    Q('6 … 9 — điền dấu', ['<', 'Dấu bằng =', '+', 'Dấu lớn >'], 0, '6 < 9.', ['Đúng — 6 bé hơn 9 nên dùng dấu <.', 'Sai — 6 và 9 khác nhau.', 'Sai — đây là so sánh, không phải phép cộng.', 'Sai — 6 không lớn hơn 9.']),
    Q('10 … 7 — điền dấu', ['Dấu bé <', 'Dấu trừ −', '>', 'Dấu bằng ='], 2, '10 > 7.', ['Sai — 10 không bé hơn 7.', 'Sai — đây là so sánh, không phải phép trừ.', 'Đúng — 10 lớn hơn 7 nên dùng dấu >.', 'Sai — 10 và 7 khác nhau.']),
    Q('Sắp xếp tăng dần: 5, 2, 8, 3', ['2, 3, 5, 8', '2, 5, 3, 8', '3, 2, 5, 8', '8, 5, 3, 2'], 0, '2 < 3 < 5 < 8.', ['Đúng — từ bé đến lớn: 2, 3, 5, 8.', 'Sai — 5 phải đứng sau 3, chưa đúng thứ tự.', 'Sai — phải bắt đầu từ số bé nhất là 2.', 'Sai — đây là sắp giảm dần, không phải tăng dần.']),
    Q('Số nào LỚN NHẤT trong: 4, 7, 2, 9?', ['4', '7', '9', '2'], 2, '9 lớn nhất.', ['Sai — 4 nhỏ hơn 9.', 'Sai — 7 nhỏ hơn 9.', 'Đúng — 9 lớn nhất.', 'Sai — 2 là số bé nhất.']),
    Q('Số nào BÉ NHẤT trong: 6, 3, 8, 5?', ['3', '8', '6', '5'], 0, '3 bé nhất.', ['Đúng — 3 bé nhất.', 'Sai — 8 là số lớn nhất.', 'Sai — 6 lớn hơn 3.', 'Sai — 5 lớn hơn 3.']),
    Q('8 … 8 — điền dấu', ['=', 'Dấu bé <', 'Dấu lớn >', '+'], 0, '8 bằng 8.', ['Đúng — hai số bằng nhau nên dùng dấu =.', 'Sai — hai số bằng nhau, không bé hơn.', 'Sai — hai số bằng nhau, không lớn hơn.', 'Sai — đây là so sánh, không phải phép cộng.']),
  ]),

  M(8, 'Hình vuông – Hình tròn – Hình tam giác – Hình chữ nhật', [
    Q('Mặt đồng hồ treo tường thường có dạng hình gì?', ['Chữ nhật', 'Hình vuông', 'Tam giác', 'Tròn'], 3, 'Đồng hồ tròn rất phổ biến.', ['Sai — mặt đồng hồ tròn, không phải chữ nhật.', 'Sai — mặt đồng hồ tròn, không phải vuông.', 'Sai — tam giác có 3 cạnh nhọn, không giống đồng hồ.', 'Đúng — mặt đồng hồ thường tròn.']),
    Q('Cái bảng đen trong lớp thường có dạng?', ['Tam giác', 'Chữ nhật', 'Hình tròn', 'Hình thoi'], 1, 'Bảng có dạng chữ nhật.', ['Sai — bảng không nhọn 3 góc như tam giác.', 'Đúng — bảng dài hơn rộng nên là chữ nhật.', 'Sai — bảng không tròn.', 'Sai — bảng không nghiêng như hình thoi.']),
    Q('Hình có 3 cạnh là?', ['Tam giác', 'Hình tròn', 'Hình vuông', 'Chữ nhật'], 0, 'Tam giác có 3 cạnh.', ['Đúng — tam giác có 3 cạnh.', 'Sai — hình tròn không có cạnh thẳng.', 'Sai — hình vuông có 4 cạnh.', 'Sai — chữ nhật có 4 cạnh.']),
    Q('Hình có 4 cạnh bằng nhau là?', ['Tam giác', 'Hình tròn', 'Chữ nhật', 'Vuông'], 3, 'Hình vuông 4 cạnh bằng nhau.', ['Sai — tam giác chỉ có 3 cạnh.', 'Sai — hình tròn không có cạnh thẳng.', 'Sai — chữ nhật có 4 cạnh nhưng cạnh dài cạnh ngắn.', 'Đúng — hình vuông có 4 cạnh bằng nhau.']),
    Q('Mái nhà thường có dạng hình gì?', ['Hình vuông', 'Hình thoi', 'Tam giác', 'Hình tròn'], 2, 'Mái nhà dạng tam giác.', ['Sai — mái nhà nhọn ở trên, không vuông.', 'Sai — mái nhà không nghiêng như hình thoi.', 'Đúng — mái nhà nhọn trên, dạng tam giác.', 'Sai — mái nhà không tròn.']),
  ]),

  M(9, 'Phép cộng trong phạm vi 6', [
    Q('2 + 3 = ?', ['4', '6', '3', '5'], 3, '2 + 3 = 5.', ['Sai — đếm thiếu 1, đúng là 5.', 'Sai — đếm thừa rồi.', 'Sai — mới cộng có một phần.', 'Đúng — 2 + 3 = 5.']),
    Q('1 + 4 = ?', ['4', '6', '5', '3'], 2, '1 + 4 = 5.', ['Sai — quên cộng thêm 1.', 'Sai — đếm thừa rồi.', 'Đúng — 1 + 4 = 5.', 'Sai — đây là cộng, không phải trừ.']),
    Q('3 + 3 = ?', ['4', '7', '5', '6'], 3, '3 + 3 = 6.', ['Sai — đếm thiếu nhiều rồi.', 'Sai — đếm thừa 1.', 'Sai — đếm thiếu 1.', 'Đúng — 3 + 3 = 6.']),
    Q('Có 2 con cá, mẹ cho thêm 2 con. Tổng?', ['4', '3', '5', '6'], 0, '2 + 2 = 4.', ['Đúng — 2 + 2 = 4.', 'Sai — cho thêm 2 con thì phải cộng đủ 2.', 'Sai — đếm thừa rồi.', 'Sai — đếm thừa nhiều rồi.']),
    Q('4 + 2 = ?', ['7', '6', '4', '5'], 1, '4 + 2 = 6.', ['Sai — đếm thừa 1.', 'Đúng — 4 + 2 = 6.', 'Sai — quên cộng thêm 2.', 'Sai — đếm thiếu 1.']),
    Q('5 + 1 = ?', ['4', '6', '5', '7'], 1, '5 + 1 = 6.', ['Sai — đây là cộng, số phải to lên.', 'Đúng — 5 + 1 = 6.', 'Sai — quên cộng thêm 1.', 'Sai — đếm thừa 1.']),
  ]),

  M(10, 'Phép cộng trong phạm vi 10', [
    Q('4 + 5 = ?', ['8', '10', '9', '7'], 2, '4 + 5 = 9.', ['Sai — đếm thiếu 1.', 'Sai — đếm thừa 1.', 'Đúng — 4 + 5 = 9.', 'Sai — đếm thiếu 2.']),
    Q('6 + 3 = ?', ['10', '8', '9', '7'], 2, '6 + 3 = 9.', ['Sai — đếm thừa 1.', 'Sai — đếm thiếu 1.', 'Đúng — 6 + 3 = 9.', 'Sai — đếm thiếu 2.']),
    Q('7 + 2 = ?', ['10', '7', '9', '8'], 2, '7 + 2 = 9.', ['Sai — đếm thừa 1.', 'Sai — quên cộng thêm 2.', 'Đúng — 7 + 2 = 9.', 'Sai — đếm thiếu 1.']),
    Q('5 + 5 = ?', ['8', '11', '9', '10'], 3, '5 + 5 = 10.', ['Sai — đếm thiếu 2.', 'Sai — đếm thừa 1.', 'Sai — đếm thiếu 1.', 'Đúng — 5 + 5 = 10.']),
    Q('Có 6 quả cam, mua thêm 4 quả. Tổng?', ['11', '9', '10', '8'], 2, '6 + 4 = 10.', ['Sai — đếm thừa 1.', 'Sai — đếm thiếu 1.', 'Đúng — 6 + 4 = 10.', 'Sai — đếm thiếu 2.']),
    Q('8 + 1 = ?', ['8', '10', '7', '9'], 3, '8 + 1 = 9.', ['Sai — quên cộng thêm 1.', 'Sai — đếm thừa 1.', 'Sai — đây là cộng, số phải to lên.', 'Đúng — 8 + 1 = 9.']),
  ]),

  M(11, 'Phép trừ trong phạm vi 6', [
    Q('5 − 2 = ?', ['2', '3', '5', '4'], 1, '5 − 2 = 3.', ['Sai — trừ hơi nhiều rồi.', 'Đúng — 5 − 2 = 3.', 'Sai — đã trừ thì số phải nhỏ đi.', 'Sai — trừ thiếu 1.']),
    Q('6 − 3 = ?', ['5', '3', '4', '2'], 1, '6 − 3 = 3.', ['Sai — trừ thiếu rồi.', 'Đúng — 6 − 3 = 3.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 1.']),
    Q('4 − 1 = ?', ['5', '4', '3', '2'], 2, '4 − 1 = 3.', ['Sai — trừ là bớt đi, không phải cộng.', 'Sai — quên bớt 1.', 'Đúng — 4 − 1 = 3.', 'Sai — trừ thừa 1.']),
    Q('Có 6 viên kẹo, em ăn 2 viên. Còn?', ['6', '3', '5', '4'], 3, '6 − 2 = 4.', ['Sai — ăn rồi thì còn ít hơn 6.', 'Sai — trừ thừa 1.', 'Sai — quên bớt thêm 1.', 'Đúng — 6 − 2 = 4.']),
    Q('5 − 5 = ?', ['1', '10', '0', '5'], 2, 'Trừ chính nó = 0.', ['Sai — trừ hết rồi nên còn 0, không phải 1.', 'Sai — đây là trừ, không phải cộng.', 'Đúng — trừ chính nó bằng 0.', 'Sai — đã trừ thì không còn 5.']),
    Q('3 − 0 = ?', ['0', '3', '1', '30'], 1, 'Trừ 0 giữ nguyên.', ['Sai — trừ 0 không bớt gì cả.', 'Đúng — trừ 0 thì giữ nguyên là 3.', 'Sai — trừ 0 không làm mất số nào.', 'Sai — viết liền 3 và 0 không phải phép trừ.']),
  ]),

  M(12, 'Phép trừ trong phạm vi 10', [
    Q('9 − 4 = ?', ['4', '3', '6', '5'], 3, '9 − 4 = 5.', ['Sai — trừ thừa 1.', 'Sai — trừ thừa 2.', 'Sai — trừ thiếu 1.', 'Đúng — 9 − 4 = 5.']),
    Q('10 − 3 = ?', ['6', '7', '8', '5'], 1, '10 − 3 = 7.', ['Sai — trừ thừa 1.', 'Đúng — 10 − 3 = 7.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 2.']),
    Q('8 − 5 = ?', ['4', '3', '5', '2'], 1, '8 − 5 = 3.', ['Sai — trừ thiếu 1.', 'Đúng — 8 − 5 = 3.', 'Sai — đó là số đem trừ, không phải kết quả.', 'Sai — trừ thừa 1.']),
    Q('Mẹ có 10 cái bánh, cho em 4 cái. Còn?', ['5', '4', '7', '6'], 3, '10 − 4 = 6.', ['Sai — trừ thừa 1.', 'Sai — đó là số đã cho, không phải số còn lại.', 'Sai — trừ thiếu 1.', 'Đúng — 10 − 4 = 6.']),
    Q('7 − 7 = ?', ['0', '1', '14', '7'], 0, 'Bằng 0.', ['Đúng — trừ chính nó bằng 0.', 'Sai — trừ hết rồi nên còn 0.', 'Sai — đây là trừ, không phải cộng.', 'Sai — đã trừ hết thì không còn 7.']),
    Q('10 − 1 = ?', ['9', '8', '11', '10'], 0, '10 − 1 = 9.', ['Đúng — 10 − 1 = 9.', 'Sai — trừ thừa 1.', 'Sai — đây là trừ, số phải nhỏ đi.', 'Sai — quên bớt 1.']),
  ]),

  M(13, 'Luyện tập cộng – trừ trong phạm vi 10', [
    Q('3 + 4 − 2 = ?', ['3', '4', '5', '6'], 2, '3+4=7; 7−2=5.', ['Sai — làm từ trái sang phải mới đúng.', 'Sai — trừ thừa rồi.', 'Đúng — 3+4=7, rồi 7−2=5.', 'Sai — đó là kết quả cộng, chưa trừ 2.']),
    Q('10 − 5 + 3 = ?', ['6', '8', '9', '7'], 1, '10−5=5; 5+3=8.', ['Sai — cộng thiếu rồi.', 'Đúng — 10−5=5, rồi 5+3=8.', 'Sai — cộng thừa 1.', 'Sai — quên cộng đủ 3.']),
    Q('2 + 2 + 2 = ?', ['5', '7', '6', '4'], 2, '2+2+2 = 6.', ['Sai — cộng thiếu 1.', 'Sai — cộng thừa 1.', 'Đúng — 2+2+2 = 6.', 'Sai — mới cộng 2 lần, còn thiếu một lần.']),
    Q('9 − 3 − 2 = ?', ['6', '5', '4', '3'], 2, '9−3=6; 6−2=4.', ['Sai — đó là kết quả sau lần trừ đầu, chưa trừ 2.', 'Sai — trừ thiếu 1.', 'Đúng — 9−3=6, rồi 6−2=4.', 'Sai — trừ thừa 1.']),
    Q('Số nào cộng với 3 bằng 8?', ['7', '5', '4', '6'], 1, '5 + 3 = 8.', ['Sai — 7+3=10, lớn quá.', 'Đúng — 5 + 3 = 8.', 'Sai — 4+3=7, còn thiếu 1.', 'Sai — 6+3=9, thừa 1.']),
    Q('Số nào trừ đi 2 bằng 6?', ['6', '9', '7', '8'], 3, '8 − 2 = 6.', ['Sai — 6−2=4, không phải 6.', 'Sai — 9−2=7, thừa 1.', 'Sai — 7−2=5, thiếu 1.', 'Đúng — 8 − 2 = 6.']),
  ]),

  M(14, 'Các số có hai chữ số: 10, 20, 30, …', [
    Q('1 chục bằng mấy đơn vị?', ['10', '5', '100', '1'], 0, '1 chục = 10.', ['Đúng — 1 chục = 10 đơn vị.', 'Sai — 5 mới là nửa chục.', 'Sai — 100 là 10 chục.', 'Sai — 1 chục nhiều hơn 1 đơn vị.']),
    Q('20 gồm mấy chục?', ['3', '2', '20', '1'], 1, '20 = 2 chục.', ['Sai — 3 chục là 30.', 'Đúng — 20 = 2 chục.', 'Sai — đó là số đơn vị, không phải số chục.', 'Sai — 1 chục là 10.']),
    Q('Số 30 đọc là?', ['Ba mười', 'Mười ba', 'Ba chục lẻ', 'Ba mươi'], 3, '30 đọc là "ba mươi".', ['Sai — phải đọc là "ba mươi", không phải "ba mười".', 'Sai — "mười ba" là số 13.', 'Sai — không đọc kiểu này.', 'Đúng — 30 đọc là "ba mươi".']),
    Q('Số liền sau của 10 là?', ['20', '11', '12', '9'], 1, '10 + 1 = 11.', ['Sai — 20 cách 10 nhiều bước.', 'Đúng — liền sau là cộng 1: 10 + 1 = 11.', 'Sai — 12 cách 10 hai bước.', 'Sai — 9 là số liền TRƯỚC 10.']),
    Q('Số 50 gồm mấy chục mấy đơn vị?', ['5 đơn vị', '50 chục', '5 chục 0 đơn vị', '0 chục 5 đơn vị'], 2, '50 = 5 chục 0 đơn vị.', ['Sai — 5 đơn vị chỉ là số 5.', 'Sai — 50 chục là số rất lớn.', 'Đúng — 50 = 5 chục 0 đơn vị.', 'Sai — 0 chục 5 đơn vị là số 5.']),
  ]),

  M(15, 'Các số từ 11 đến 20', [
    Q('Số 15 gồm 1 chục và mấy đơn vị?', ['5', '6', '3', '4'], 0, '15 = 1 chục 5 đơn vị.', ['Đúng — 15 = 1 chục 5 đơn vị.', 'Sai — đếm thừa 1.', 'Sai — đếm thiếu 2.', 'Sai — đếm thiếu 1.']),
    Q('Số liền sau của 19 là?', ['21', '20', '17', '18'], 1, '19 + 1 = 20.', ['Sai — 21 cách 19 hai bước.', 'Đúng — liền sau là cộng 1: 19 + 1 = 20.', 'Sai — 17 còn bé hơn 19.', 'Sai — 18 là số liền TRƯỚC 19.']),
    Q('Đọc số 17 là?', ['Mười tám', 'Mười bảy', 'Một bảy', 'Bảy mươi'], 1, '17 = mười bảy.', ['Sai — "mười tám" là số 18.', 'Đúng — 17 đọc là "mười bảy".', 'Sai — phải đọc là "mười bảy".', 'Sai — "bảy mươi" là số 70.']),
    Q('Sắp xếp tăng dần: 13, 11, 17, 15', ['11, 13, 17, 15', '17, 15, 13, 11', '11, 13, 15, 17', '13, 11, 15, 17'], 2, '11 < 13 < 15 < 17.', ['Sai — 17 phải đứng sau 15.', 'Sai — đây là giảm dần, không phải tăng dần.', 'Đúng — từ bé đến lớn: 11, 13, 15, 17.', 'Sai — phải bắt đầu từ số bé nhất là 11.']),
    Q('Số nào LỚN nhất trong: 12, 18, 14, 16?', ['18', '14', '12', '16'], 0, '18 lớn nhất.', ['Đúng — 18 lớn nhất.', 'Sai — 14 nhỏ hơn 18.', 'Sai — 12 là số bé nhất.', 'Sai — 16 nhỏ hơn 18.']),
    Q('1 chục + 6 đơn vị = ?', ['7', '17', '16', '61'], 2, '10 + 6 = 16.', ['Sai — 1 chục là 10, không phải 1.', 'Sai — cộng thừa 1.', 'Đúng — 10 + 6 = 16.', 'Sai — viết ngược số rồi.']),
  ]),

  M(16, 'Đo độ dài bằng xăng-ti-mét (cm)', [
    Q('Bút chì dài khoảng bao nhiêu?', ['15 cm', '100 cm', '1 cm', '1 m'], 0, 'Bút chì ~15 cm.', ['Đúng — bút chì dài khoảng 15 cm.', 'Sai — 100 cm dài cả mét, quá dài.', 'Sai — 1 cm ngắn bằng móng tay.', 'Sai — 1 m dài bằng cái bàn.']),
    Q('Đơn vị nào dùng để đo độ dài (lớp 1)?', ['phút (đo thời gian)', 'kg (đo cân nặng)', 'cm', 'lít (đo chất lỏng)'], 2, 'Lớp 1 học cm.', ['Sai — phút để đo thời gian.', 'Sai — kg để cân nặng.', 'Đúng — cm dùng để đo độ dài.', 'Sai — lít để đo nước.']),
    Q('Thước kẻ học sinh thường dài?', ['200 cm', '2 cm', '20 cm', '2 m'], 2, 'Thước thường 20 cm.', ['Sai — 200 cm dài 2 mét, quá dài.', 'Sai — 2 cm ngắn quá.', 'Đúng — thước học sinh thường dài 20 cm.', 'Sai — 2 m dài như cái cửa.']),
    Q('5 cm + 3 cm = ?', ['15 cm', '7 cm', '8 cm', '9 cm'], 2, '5 + 3 = 8 cm.', ['Sai — đó là phép nhân, không phải cộng.', 'Sai — cộng thiếu 1.', 'Đúng — 5 + 3 = 8 cm.', 'Sai — cộng thừa 1.']),
    Q('10 cm − 4 cm = ?', ['5 cm', '7 cm', '6 cm', '14 cm'], 2, '10 − 4 = 6 cm.', ['Sai — trừ thừa 1.', 'Sai — trừ thiếu 1.', 'Đúng — 10 − 4 = 6 cm.', 'Sai — đó là phép cộng, không phải trừ.']),
  ]),

  M(17, 'Ôn tập cuối HK1 (1)', [
    Q('8 + 2 = ?', ['11', '10', '8', '9'], 1, '8 + 2 = 10.', ['Sai — cộng thừa 1.', 'Đúng — 8 + 2 = 10.', 'Sai — quên cộng thêm 2.', 'Sai — cộng thiếu 1.']),
    Q('10 − 6 = ?', ['4', '5', '3', '6'], 0, '10 − 6 = 4.', ['Đúng — 10 − 6 = 4.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 1.', 'Sai — đó là số đem trừ, không phải kết quả.']),
    Q('Số liền trước của 10 là?', ['10', '9', '11', '8'], 1, '10 − 1 = 9.', ['Sai — đó là chính số 10.', 'Đúng — liền trước là bớt 1: 10 − 1 = 9.', 'Sai — 11 là số liền SAU 10.', 'Sai — 8 cách 10 hai bước.']),
    Q('Hình có 4 cạnh bằng nhau là?', ['Tam giác', 'Vuông', 'Hình tròn', 'Chữ nhật'], 1, 'Hình vuông.', ['Sai — tam giác chỉ có 3 cạnh.', 'Đúng — hình vuông có 4 cạnh bằng nhau.', 'Sai — hình tròn không có cạnh thẳng.', 'Sai — chữ nhật có cạnh dài cạnh ngắn.']),
    Q('3 + … = 7. Điền số?', ['4', '6', '5', '3'], 0, '3 + 4 = 7.', ['Đúng — 3 + 4 = 7.', 'Sai — 3+6=9, lớn quá.', 'Sai — 3+5=8, thừa 1.', 'Sai — 3+3=6, thiếu 1.']),
    Q('Số nào BÉ HƠN 5?', ['4', '8', '6', '7'], 0, '4 < 5.', ['Đúng — 4 bé hơn 5.', 'Sai — 8 lớn hơn 5.', 'Sai — 6 lớn hơn 5.', 'Sai — 7 lớn hơn 5.']),
  ]),

  M(18, 'Ôn tập cuối HK1 (2)', [
    Q('Sắp xếp giảm dần: 4, 9, 2, 7', ['9, 7, 4, 2', '9, 4, 7, 2', '2, 4, 7, 9', '7, 9, 4, 2'], 0, '9 > 7 > 4 > 2.', ['Đúng — từ lớn đến bé: 9, 7, 4, 2.', 'Sai — 4 phải đứng sau 7.', 'Sai — đây là tăng dần, không phải giảm dần.', 'Sai — phải bắt đầu từ số lớn nhất là 9.']),
    Q('Có 5 con vịt, thêm 3 con. Tất cả?', ['7', '8', '6', '9'], 1, '5 + 3 = 8.', ['Sai — cộng thiếu 1.', 'Đúng — 5 + 3 = 8.', 'Sai — quên cộng đủ 3.', 'Sai — cộng thừa 1.']),
    Q('10 − 0 = ?', ['100', '0', '10', '1'], 2, 'Trừ 0 giữ nguyên.', ['Sai — viết liền 10 và 0 không phải phép trừ.', 'Sai — trừ 0 không làm mất số.', 'Đúng — trừ 0 thì giữ nguyên là 10.', 'Sai — trừ 0 không bớt gì cả.']),
    Q('Số liền sau của 14 là?', ['13', '12', '15', '16'], 2, '14 + 1 = 15.', ['Sai — 13 là số liền TRƯỚC 14.', 'Sai — 12 cách 14 hai bước.', 'Đúng — liền sau là cộng 1: 14 + 1 = 15.', 'Sai — 16 cách 14 hai bước.']),
    Q('Hình tròn có mấy cạnh?', ['3', '1', '0', '4'], 2, 'Hình tròn không có cạnh thẳng.', ['Sai — 3 cạnh là tam giác.', 'Sai — hình tròn không có cạnh thẳng nào.', 'Đúng — hình tròn không có cạnh thẳng.', 'Sai — 4 cạnh là hình vuông.']),
    Q('1 chục bằng mấy?', ['10', '5', '1', '20'], 0, '1 chục = 10.', ['Đúng — 1 chục = 10.', 'Sai — 5 là nửa chục.', 'Sai — 1 chục nhiều hơn 1.', 'Sai — 20 là 2 chục.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Các số từ 21 đến 50', [
    Q('Số 35 gồm mấy chục mấy đơn vị?', ['5 chục 3 đơn vị', '35 chục', '8 chục', '3 chục 5 đơn vị'], 3, '35 = 3 chục 5 đơn vị.', ['Sai — đọc ngược rồi, đó là số 53.', 'Sai — 35 chục là số rất lớn.', 'Sai — 8 là tổng 3+5, không phải số chục.', 'Đúng — 35 = 3 chục 5 đơn vị.']),
    Q('Số liền sau của 29 là?', ['31', '30', '20', '28'], 1, '29 + 1 = 30.', ['Sai — 31 cách 29 hai bước.', 'Đúng — liền sau là cộng 1: 29 + 1 = 30.', 'Sai — 20 còn bé hơn 29.', 'Sai — 28 là số liền TRƯỚC 29.']),
    Q('Đọc số 42 là?', ['Bốn mươi', 'Bốn hai', 'Bốn mươi hai', 'Hai mươi bốn'], 2, '42 = bốn mươi hai.', ['Sai — "bốn mươi" là số 40, còn thiếu 2.', 'Sai — phải đọc đầy đủ "bốn mươi hai".', 'Đúng — 42 đọc là "bốn mươi hai".', 'Sai — "hai mươi bốn" là số 24, đọc ngược rồi.']),
    Q('Số nào LỚN nhất trong: 27, 32, 25, 30?', ['30', '27', '32', '25'], 2, '32 lớn nhất.', ['Sai — 30 nhỏ hơn 32.', 'Sai — 27 nhỏ hơn 32.', 'Đúng — 32 lớn nhất.', 'Sai — 25 là số bé nhất.']),
    Q('Số liền trước của 50 là?', ['40', '49', '48', '51'], 1, '50 − 1 = 49.', ['Sai — 40 cách 50 nhiều bước.', 'Đúng — liền trước là bớt 1: 50 − 1 = 49.', 'Sai — 48 cách 50 hai bước.', 'Sai — 51 là số liền SAU 50.']),
    Q('4 chục + 7 đơn vị = ?', ['47', '11', '40', '74'], 0, '40 + 7 = 47.', ['Đúng — 40 + 7 = 47.', 'Sai — 4 chục là 40, không phải 4.', 'Sai — quên cộng thêm 7 đơn vị.', 'Sai — viết ngược số rồi.']),
  ]),

  M(20, 'Các số từ 51 đến 99', [
    Q('Số 78 gồm mấy chục mấy đơn vị?', ['8 chục 7 đơn vị', '15 chục', '7 chục 8 đơn vị', '78 chục'], 2, '78 = 7 chục 8 đơn vị.', ['Sai — đọc ngược rồi, đó là số 87.', 'Sai — 15 là tổng 7+8, không phải số chục.', 'Đúng — 78 = 7 chục 8 đơn vị.', 'Sai — 78 chục là số rất lớn.']),
    Q('Số lớn nhất có 2 chữ số là?', ['99', '98', '100', '89'], 0, '99 là số lớn nhất có 2 chữ số.', ['Đúng — 99 là số lớn nhất có 2 chữ số.', 'Sai — 98 nhỏ hơn 99.', 'Sai — 100 có 3 chữ số.', 'Sai — 89 nhỏ hơn 99.']),
    Q('Số liền sau của 89 là?', ['88', '99', '90', '79'], 2, '89 + 1 = 90.', ['Sai — 88 là số liền TRƯỚC 89.', 'Sai — 99 cách 89 nhiều bước.', 'Đúng — liền sau là cộng 1: 89 + 1 = 90.', 'Sai — 79 còn bé hơn 89.']),
    Q('Đọc số 65 là?', ['Năm mươi sáu', 'Sáu năm', 'Sáu mươi lăm', 'Sáu mười năm'], 2, '65 = sáu mươi lăm.', ['Sai — "năm mươi sáu" là số 56, đọc ngược rồi.', 'Sai — phải đọc đầy đủ "sáu mươi lăm".', 'Đúng — 65 đọc là "sáu mươi lăm".', 'Sai — đọc sai, phải là "sáu mươi lăm".']),
    Q('Sắp xếp tăng dần: 72, 65, 80, 59', ['59, 65, 72, 80', '65, 59, 72, 80', '59, 72, 65, 80', '80, 72, 65, 59'], 0, '59 < 65 < 72 < 80.', ['Đúng — từ bé đến lớn: 59, 65, 72, 80.', 'Sai — phải bắt đầu từ số bé nhất là 59.', 'Sai — 72 phải đứng sau 65.', 'Sai — đây là giảm dần, không phải tăng dần.']),
    Q('9 chục + 5 đơn vị = ?', ['14', '90', '95', '59'], 2, '90 + 5 = 95.', ['Sai — 9 chục là 90, không phải 9.', 'Sai — quên cộng thêm 5 đơn vị.', 'Đúng — 90 + 5 = 95.', 'Sai — viết ngược số rồi.']),
  ]),

  M(21, 'Số 100 · Bảng số đến 100', [
    Q('Số liền sau của 99 là?', ['101', '90', '98', '100'], 3, '99 + 1 = 100.', ['Sai — 101 cách 99 hai bước.', 'Sai — 90 còn bé hơn 99.', 'Sai — 98 là số liền TRƯỚC 99.', 'Đúng — liền sau là cộng 1: 99 + 1 = 100.']),
    Q('Số 100 đọc là?', ['Mười chục', 'Một không không', 'Mười mười', 'Một trăm'], 3, '100 = một trăm.', ['Sai — đúng là 10 chục nhưng đọc là "một trăm".', 'Sai — không đọc từng chữ số như vậy.', 'Sai — không đọc kiểu này.', 'Đúng — 100 đọc là "một trăm".']),
    Q('100 gồm mấy chục?', ['10', '0', '1', '100'], 0, '100 = 10 chục.', ['Đúng — 100 = 10 chục.', 'Sai — 0 chục là số 0.', 'Sai — 1 chục chỉ là 10.', 'Sai — đó là chính số 100.']),
    Q('Số nào bé nhất có 3 chữ số?', ['100', '99', '111', '101'], 0, '100 là số bé nhất có 3 chữ số.', ['Đúng — 100 là số bé nhất có 3 chữ số.', 'Sai — 99 chỉ có 2 chữ số.', 'Sai — 111 lớn hơn 100.', 'Sai — 101 lớn hơn 100.']),
    Q('Số liền trước của 100 là?', ['90', '101', '98', '99'], 3, '100 − 1 = 99.', ['Sai — 90 cách 100 nhiều bước.', 'Sai — 101 là số liền SAU 100.', 'Sai — 98 cách 100 hai bước.', 'Đúng — liền trước là bớt 1: 100 − 1 = 99.']),
  ]),

  // Tuần 22 — nghỉ Tết
  M(22, 'Nghỉ Tết (ôn nhẹ)', [
    Q('1 năm có mấy tháng?', ['10', '13', '11', '12'], 3, '1 năm = 12 tháng.', ['Sai — đếm thiếu 2 tháng.', 'Sai — đếm thừa 1 tháng.', 'Sai — đếm thiếu 1 tháng.', 'Đúng — 1 năm có 12 tháng.']),
    Q('Tết cổ truyền Việt Nam vào tháng nào âm lịch?', ['Tháng 12', 'Tháng 6', 'Tháng 1', 'Tháng 9'], 2, 'Tết vào tháng Giêng (tháng 1) âm lịch.', ['Sai — tháng 12 là cuối năm, gần Tết nhưng chưa phải.', 'Sai — tháng 6 là giữa năm.', 'Đúng — Tết vào tháng Giêng (tháng 1) âm lịch.', 'Sai — tháng 9 là mùa thu.']),
    Q('Lì xì là phong tục đầu năm — thường dùng đồ vật nào?', ['Phong bao đỏ', 'Quả táo', 'Cái bút', 'Quyển sách'], 0, 'Phong bao đỏ đựng tiền lì xì.', ['Đúng — lì xì đựng trong phong bao đỏ.', 'Sai — quả táo không dùng để lì xì.', 'Sai — cái bút không phải để lì xì.', 'Sai — quyển sách không phải để lì xì.']),
    Q('Bánh chưng có hình gì?', ['Tam giác', 'Tròn (giống bánh dày)', 'Chữ nhật', 'Vuông'], 3, 'Bánh chưng vuông.', ['Sai — bánh chưng không nhọn góc như tam giác.', 'Sai — bánh dày mới tròn, bánh chưng thì vuông.', 'Sai — bánh chưng 4 cạnh bằng nhau nên là vuông.', 'Đúng — bánh chưng hình vuông.']),
    Q('Bánh tét có hình?', ['Trụ dài', 'Vuông như bánh chưng', 'Tròn dẹt', 'Tam giác'], 0, 'Bánh tét hình trụ dài.', ['Đúng — bánh tét hình trụ dài.', 'Sai — bánh chưng mới vuông, bánh tét thì dài.', 'Sai — bánh tét dài chứ không dẹt.', 'Sai — bánh tét không nhọn góc như tam giác.']),
  ]),

  M(23, 'Phép cộng số có 2 chữ số (không nhớ)', [
    Q('30 + 20 = ?', ['40', '10', '50', '60'], 2, '3 chục + 2 chục = 5 chục = 50.', ['Sai — cộng thiếu 1 chục.', 'Sai — đây là cộng, không phải trừ.', 'Đúng — 3 chục + 2 chục = 5 chục = 50.', 'Sai — cộng thừa 1 chục.']),
    Q('25 + 14 = ?', ['39', '49', '38', '40'], 0, '5+4=9; 2+1=3 → 39.', ['Đúng — 5+4=9, 2+1=3 → 39.', 'Sai — cộng chục bị thừa 1.', 'Sai — cộng đơn vị thiếu 1.', 'Sai — cộng thừa 1.']),
    Q('43 + 26 = ?', ['59', '70', '69', '68'], 2, '3+6=9; 4+2=6 → 69.', ['Sai — cộng chục thiếu 1.', 'Sai — cộng thừa 1.', 'Đúng — 3+6=9, 4+2=6 → 69.', 'Sai — cộng đơn vị thiếu 1.']),
    Q('Có 32 quyển sách, mua thêm 15 quyển. Tổng?', ['46', '47', '57', '48'], 1, '32 + 15 = 47.', ['Sai — cộng đơn vị thiếu 1.', 'Đúng — 32 + 15 = 47.', 'Sai — cộng chục thừa 1.', 'Sai — cộng đơn vị thừa 1.']),
    Q('50 + 30 = ?', ['70', '20', '80', '90'], 2, '5+3 chục = 8 chục.', ['Sai — cộng thiếu 1 chục.', 'Sai — đây là cộng, không phải trừ.', 'Đúng — 5 chục + 3 chục = 8 chục = 80.', 'Sai — cộng thừa 1 chục.']),
    Q('17 + 12 = ?', ['29', '19', '28', '30'], 0, '7+2=9; 1+1=2 → 29.', ['Đúng — 7+2=9, 1+1=2 → 29.', 'Sai — quên cộng chục.', 'Sai — cộng đơn vị thiếu 1.', 'Sai — cộng thừa 1.']),
  ]),

  M(24, 'Phép trừ số có 2 chữ số (không nhớ)', [
    Q('70 − 30 = ?', ['20', '30', '50', '40'], 3, '7−3 chục = 4 chục.', ['Sai — trừ thừa 1 chục.', 'Sai — đó là số đem trừ, không phải kết quả.', 'Sai — trừ thiếu 1 chục.', 'Đúng — 7 chục − 3 chục = 4 chục = 40.']),
    Q('58 − 24 = ?', ['36', '33', '35', '34'], 3, '8−4=4; 5−2=3 → 34.', ['Sai — trừ chục thiếu 1.', 'Sai — trừ đơn vị thừa 1.', 'Sai — trừ đơn vị thừa 1.', 'Đúng — 8−4=4, 5−2=3 → 34.']),
    Q('99 − 45 = ?', ['54', '52', '55', '53'], 0, '9−5=4; 9−4=5 → 54.', ['Đúng — 9−5=4, 9−4=5 → 54.', 'Sai — trừ đơn vị thừa 2.', 'Sai — trừ chục thiếu 1.', 'Sai — trừ đơn vị thừa 1.']),
    Q('Có 47 quả táo, ăn 12 quả. Còn?', ['33', '35', '36', '34'], 1, '47 − 12 = 35.', ['Sai — trừ chục thừa 1.', 'Đúng — 47 − 12 = 35.', 'Sai — trừ đơn vị thiếu 1.', 'Sai — trừ đơn vị thừa 1.']),
    Q('60 − 20 = ?', ['10', '40', '50', '30'], 1, '6−2 chục = 4 chục.', ['Sai — trừ thừa 3 chục.', 'Đúng — 6 chục − 2 chục = 4 chục = 40.', 'Sai — đó là số đem trừ.', 'Sai — trừ thiếu 1 chục.']),
    Q('86 − 33 = ?', ['55', '53', '52', '54'], 1, '6−3=3; 8−3=5 → 53.', ['Sai — trừ chục thừa 1.', 'Đúng — 6−3=3, 8−3=5 → 53.', 'Sai — trừ đơn vị thừa 1.', 'Sai — trừ đơn vị thiếu 1.']),
  ]),

  M(25, 'Luyện tập cộng – trừ', [
    Q('20 + 30 − 10 = ?', ['30', '20', '50', '40'], 3, '20+30=50; 50−10=40.', ['Sai — trừ thừa 1 chục.', 'Sai — trừ thừa nhiều rồi.', 'Sai — đó là kết quả cộng, chưa trừ 10.', 'Đúng — 20+30=50, rồi 50−10=40.']),
    Q('45 + 14 = ?', ['49', '60', '59', '58'], 2, '5+4=9; 4+1=5 → 59.', ['Sai — quên cộng chục.', 'Sai — cộng thừa 1.', 'Đúng — 5+4=9, 4+1=5 → 59.', 'Sai — cộng đơn vị thiếu 1.']),
    Q('77 − 22 = ?', ['54', '55', '57', '56'], 1, '7−2=5; 7−2=5 → 55.', ['Sai — trừ đơn vị thừa 1.', 'Đúng — 7−2=5, 7−2=5 → 55.', 'Sai — trừ đơn vị thiếu 2.', 'Sai — trừ đơn vị thiếu 1.']),
    Q('30 + 40 + 20 = ?', ['90', '70', '80', '100'], 0, '30+40=70; 70+20=90.', ['Đúng — 30+40=70, rồi 70+20=90.', 'Sai — đó là kết quả 30+40, chưa cộng 20.', 'Sai — cộng thiếu 1 chục.', 'Sai — cộng thừa 1 chục.']),
    Q('Số nào cộng với 20 bằng 50?', ['10', '40', '20', '30'], 3, '30 + 20 = 50.', ['Sai — 10+20=30, còn thiếu.', 'Sai — 40+20=60, thừa rồi.', 'Sai — 20+20=40, chưa đủ.', 'Đúng — 30 + 20 = 50.']),
    Q('80 − 50 = ?', ['20', '40', '10', '30'], 3, '8−5 chục = 3 chục.', ['Sai — trừ thừa 1 chục.', 'Sai — trừ thiếu 1 chục.', 'Sai — trừ thừa 2 chục.', 'Đúng — 8 chục − 5 chục = 3 chục = 30.']),
  ]),

  M(26, 'Điểm – Đoạn thẳng', [
    Q('Hai đầu của đoạn thẳng gọi là?', ['Hai cạnh', 'Hai mép', 'Hai điểm', 'Hai đường'], 2, 'Đoạn thẳng có 2 đầu mút là 2 điểm.', ['Sai — cạnh là của hình, không phải đầu đoạn thẳng.', 'Sai — đầu đoạn thẳng gọi là điểm.', 'Đúng — hai đầu đoạn thẳng là hai điểm.', 'Sai — đoạn thẳng là một đường, hai đầu là hai điểm.']),
    Q('Dụng cụ vẽ đoạn thẳng là?', ['Cục tẩy', 'Bút lông', 'Thước kẻ', 'Compa'], 2, 'Thước kẻ giúp vẽ đoạn thẳng.', ['Sai — cục tẩy để xoá, không vẽ.', 'Sai — bút lông khó vẽ thẳng.', 'Đúng — thước kẻ giúp vẽ đoạn thẳng.', 'Sai — compa để vẽ hình tròn.']),
    Q('Đoạn thẳng AB dài 5 cm. Đoạn nào dài hơn: AB hay đoạn 3 cm?', ['Đoạn 3 cm', 'AB', 'Bằng nhau', 'Không so được'], 1, '5 cm > 3 cm.', ['Sai — 3 cm ngắn hơn 5 cm.', 'Đúng — AB dài 5 cm, lớn hơn 3 cm.', 'Sai — 5 cm và 3 cm khác nhau.', 'Sai — có số đo rồi thì so sánh được.']),
    Q('Một điểm được đánh dấu bằng?', ['Một dấu cộng', 'Một chấm và chữ in hoa', 'Một vòng tròn lớn', 'Một mũi tên'], 1, 'Điểm: dấu chấm + chữ A, B…', ['Sai — điểm đánh bằng một chấm, không phải dấu cộng.', 'Đúng — điểm là một chấm kèm chữ in hoa như A, B.', 'Sai — điểm là một chấm nhỏ, không phải vòng tròn lớn.', 'Sai — mũi tên dùng để chỉ chiều, không phải điểm.']),
    Q('Hai điểm A và B nối với nhau tạo thành?', ['Hình tròn', 'Đoạn thẳng AB', 'Tam giác', 'Hình vuông'], 1, 'Nối hai điểm → đoạn thẳng.', ['Sai — nối hai điểm thẳng được đoạn thẳng, không phải hình tròn.', 'Đúng — nối A và B được đoạn thẳng AB.', 'Sai — tam giác cần 3 điểm.', 'Sai — hình vuông cần 4 điểm.']),
  ]),

  M(27, 'Các ngày trong tuần · Lịch', [
    Q('Một tuần có mấy ngày?', ['7', '5', '6', '10'], 0, '1 tuần = 7 ngày.', ['Đúng — 1 tuần có 7 ngày.', 'Sai — đếm thiếu 2 ngày.', 'Sai — đếm thiếu 1 ngày.', 'Sai — đếm thừa nhiều rồi.']),
    Q('Sau Thứ Hai là?', ['Thứ Tư', 'Thứ Bảy', 'Chủ Nhật', 'Thứ Ba'], 3, 'Hai → Ba.', ['Sai — sau Thứ Hai là Thứ Ba, chưa tới Thứ Tư.', 'Sai — Thứ Bảy ở cuối tuần.', 'Sai — Chủ Nhật ở cuối tuần.', 'Đúng — sau Thứ Hai là Thứ Ba.']),
    Q('Ngày nghỉ cuối tuần ở trường thường là?', ['Thứ Tư', 'Thứ Sáu', 'Thứ Hai', 'Thứ Bảy và Chủ Nhật'], 3, 'Thứ Bảy + Chủ Nhật.', ['Sai — Thứ Tư là giữa tuần, vẫn đi học.', 'Sai — Thứ Sáu vẫn còn đi học.', 'Sai — Thứ Hai là đầu tuần đi học.', 'Đúng — nghỉ cuối tuần là Thứ Bảy và Chủ Nhật.']),
    Q('Trước Chủ Nhật là ngày?', ['Thứ Bảy', 'Thứ Hai', 'Thứ Sáu', 'Thứ Năm'], 0, 'Thứ Bảy đứng trước CN.', ['Đúng — trước Chủ Nhật là Thứ Bảy.', 'Sai — Thứ Hai ở đầu tuần.', 'Sai — Thứ Sáu cách Chủ Nhật hai ngày.', 'Sai — Thứ Năm cách Chủ Nhật ba ngày.']),
    Q('Hôm nay Thứ Ba, ngày mai là?', ['Chủ Nhật', 'Thứ Năm', 'Thứ Hai', 'Thứ Tư'], 3, 'Ba → Tư.', ['Sai — Chủ Nhật ở cuối tuần.', 'Sai — Thứ Năm là ngày kia, không phải ngày mai.', 'Sai — Thứ Hai là hôm qua.', 'Đúng — sau Thứ Ba là Thứ Tư.']),
  ]),

  M(28, 'Đồng hồ – Đọc giờ đúng', [
    Q('Kim ngắn chỉ?', ['Kim phút', 'Giờ', 'Ngày trong tháng', 'Kim giây'], 1, 'Kim ngắn là kim giờ.', ['Sai — kim phút là kim dài.', 'Đúng — kim ngắn chỉ giờ.', 'Sai — đồng hồ không chỉ ngày bằng kim này.', 'Sai — kim giây là kim mảnh chạy nhanh.']),
    Q('Kim dài chỉ?', ['Phút', 'Chỉ giờ', 'Số tuần', 'Chỉ giây'], 0, 'Kim dài là kim phút.', ['Đúng — kim dài chỉ phút.', 'Sai — kim giờ là kim ngắn.', 'Sai — đồng hồ không chỉ số tuần.', 'Sai — kim giây là kim mảnh, không phải kim dài.']),
    Q('Kim phút chỉ số 12, kim giờ chỉ số 3. Là mấy giờ?', ['2 giờ', '4 giờ', '3 giờ', '12 giờ'], 2, 'Phút ở 12, giờ ở 3 → 3 giờ đúng.', ['Sai — nhìn kim giờ đang chỉ số 3.', 'Sai — nhìn kim giờ đang chỉ số 3.', 'Đúng — phút ở 12, giờ ở 3 → 3 giờ đúng.', 'Sai — số 12 là chỗ kim phút, không phải giờ.']),
    Q('7 giờ đúng: kim giờ chỉ số mấy?', ['6', '7', '12', '1'], 1, 'Kim giờ chỉ số 7.', ['Sai — 6 là 6 giờ.', 'Đúng — 7 giờ thì kim giờ chỉ số 7.', 'Sai — số 12 là chỗ kim phút khi giờ đúng.', 'Sai — 1 là 1 giờ.']),
    Q('Trên mặt đồng hồ có mấy số?', ['11', '10', '24', '12'], 3, 'Có 12 số.', ['Sai — đếm thiếu 1 số.', 'Sai — đếm thiếu 2 số.', 'Sai — 24 là số giờ trong ngày, không phải số trên mặt.', 'Đúng — mặt đồng hồ có 12 số.']),
    Q('Buổi sáng em đi học lúc?', ['7 giờ', '12 giờ trưa', '11 giờ đêm', '8 giờ tối'], 0, '~7 giờ sáng.', ['Đúng — em đi học khoảng 7 giờ sáng.', 'Sai — 12 giờ trưa là giờ ăn cơm.', 'Sai — 11 giờ đêm là giờ đi ngủ.', 'Sai — 8 giờ tối là buổi tối.']),
  ]),

  M(29, 'Tiền Việt Nam (giới thiệu)', [
    Q('Đơn vị tiền Việt Nam là?', ['Yên (Nhật)', 'Euro (châu Âu)', 'Đồng', 'Đô la (Mỹ)'], 2, 'Đồng (VNĐ).', ['Sai — Yên là tiền của Nhật.', 'Sai — Euro là tiền của châu Âu.', 'Đúng — tiền Việt Nam là Đồng (VNĐ).', 'Sai — Đô la là tiền của Mỹ.']),
    Q('Tờ tiền 10 000 đồng + 5 000 đồng = ?', ['5 000', '15 000', '50 000', '10 000'], 1, '10k + 5k = 15k đồng.', ['Sai — đó là một tờ tiền, chưa cộng.', 'Đúng — 10 000 + 5 000 = 15 000 đồng.', 'Sai — cộng thừa nhiều rồi.', 'Sai — đó là một tờ tiền, chưa cộng.']),
    Q('1 quyển vở giá 5 000 đồng. Mua 2 quyển hết?', ['2 000', '15 000', '10 000', '5 000'], 2, '5k × 2 = 10k.', ['Sai — đó là số quyển, không phải số tiền.', 'Sai — cộng thừa, mới mua 2 quyển thôi.', 'Đúng — 5 000 + 5 000 = 10 000 đồng.', 'Sai — đó là giá 1 quyển, chưa tính 2 quyển.']),
    Q('Em có 20 000 đồng, mua bút 8 000 đồng. Còn?', ['8 000', '14 000', '12 000', '10 000'], 2, '20k − 8k = 12k.', ['Sai — đó là số tiền đã trả, không phải còn lại.', 'Sai — trừ thiếu rồi.', 'Đúng — 20 000 − 8 000 = 12 000 đồng.', 'Sai — trừ thừa rồi.']),
    Q('Tờ tiền nào có MỆNH GIÁ LỚN NHẤT trong các tờ sau?', ['10 000', '5 000', '2 000', '1 000'], 0, '10 000 lớn nhất.', ['Đúng — 10 000 là mệnh giá lớn nhất.', 'Sai — 5 000 nhỏ hơn 10 000.', 'Sai — 2 000 nhỏ hơn 10 000.', 'Sai — 1 000 là mệnh giá nhỏ nhất.']),
  ]),

  M(30, 'Phép cộng có nhớ trong phạm vi 100 (giới thiệu)', [
    Q('27 + 5 = ?', ['33', '31', '32', '22'], 2, '7+5=12; nhớ 1 → 32.', ['Sai — cộng thừa 1.', 'Sai — quên nhớ 1.', 'Đúng — 7+5=12, nhớ 1 → 32.', 'Sai — quên cộng, đây là phép cộng.']),
    Q('48 + 6 = ?', ['53', '54', '55', '42'], 1, '8+6=14; 4+1=5 → 54.', ['Sai — cộng thiếu 1.', 'Đúng — 8+6=14, nhớ 1 → 54.', 'Sai — cộng thừa 1.', 'Sai — đây là cộng, số phải to lên.']),
    Q('39 + 8 = ?', ['46', '47', '48', '31'], 1, '9+8=17; 3+1=4 → 47.', ['Sai — cộng thiếu 1.', 'Đúng — 9+8=17, nhớ 1 → 47.', 'Sai — cộng thừa 1.', 'Sai — đây là cộng, không phải trừ.']),
    Q('Có 26 con gà, mua thêm 7 con. Tổng?', ['33', '19', '34', '32'], 0, '26 + 7 = 33.', ['Đúng — 26 + 7 = 33.', 'Sai — đây là cộng, số phải to lên.', 'Sai — cộng thừa 1.', 'Sai — quên nhớ 1.']),
    Q('58 + 4 = ?', ['54', '61', '63', '62'], 3, '8+4=12; 5+1=6 → 62.', ['Sai — đây là cộng, số phải to lên.', 'Sai — cộng thiếu 1.', 'Sai — cộng thừa 1.', 'Đúng — 8+4=12, nhớ 1 → 62.']),
  ]),

  M(31, 'Phép trừ có nhớ trong phạm vi 100 (giới thiệu)', [
    Q('32 − 5 = ?', ['37', '26', '27', '28'], 2, '32 − 5 = 27.', ['Sai — đây là trừ, số phải nhỏ đi.', 'Sai — trừ thừa 1.', 'Đúng — 32 − 5 = 27.', 'Sai — trừ thiếu 1.']),
    Q('41 − 7 = ?', ['33', '48', '34', '35'], 2, '41 − 7 = 34.', ['Sai — trừ thừa 1.', 'Sai — đây là trừ, số phải nhỏ đi.', 'Đúng — 41 − 7 = 34.', 'Sai — trừ thiếu 1.']),
    Q('50 − 9 = ?', ['40', '41', '42', '59'], 1, '50 − 9 = 41.', ['Sai — trừ thừa 1.', 'Đúng — 50 − 9 = 41.', 'Sai — trừ thiếu 1.', 'Sai — đây là trừ, không phải cộng.']),
    Q('Có 25 cái kẹo, ăn 8 cái. Còn?', ['33', '17', '18', '16'], 1, '25 − 8 = 17.', ['Sai — ăn rồi thì còn ít hơn, không cộng.', 'Đúng — 25 − 8 = 17.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 1.']),
    Q('60 − 4 = ?', ['55', '56', '64', '54'], 1, '60 − 4 = 56.', ['Sai — trừ thừa 1.', 'Đúng — 60 − 4 = 56.', 'Sai — đây là trừ, số phải nhỏ đi.', 'Sai — trừ thừa 2.']),
  ]),

  M(32, 'Bài toán có lời văn (1)', [
    Q('Vườn có 18 cây cam, trồng thêm 5 cây. Vườn có tất cả?', ['13', '24', '23', '22'], 2, '18 + 5 = 23 cây.', ['Sai — trồng thêm thì phải cộng, không trừ.', 'Sai — cộng thừa 1.', 'Đúng — 18 + 5 = 23 cây.', 'Sai — cộng thiếu 1.']),
    Q('Có 30 viên bi, cho bạn 10 viên. Còn?', ['40', '15', '20', '10'], 2, '30 − 10 = 20 viên.', ['Sai — cho đi thì phải bớt, không cộng.', 'Sai — trừ thừa rồi.', 'Đúng — 30 − 10 = 20 viên.', 'Sai — đó là số đã cho, không phải còn lại.']),
    Q('Lớp có 25 bạn nữ và 20 bạn nam. Cả lớp?', ['50', '35', '45', '40'], 2, '25 + 20 = 45 bạn.', ['Sai — cộng thừa 5.', 'Sai — cộng thiếu 10.', 'Đúng — 25 + 20 = 45 bạn.', 'Sai — cộng thiếu 5.']),
    Q('Mẹ mua 12 quả táo, ăn 4 quả. Còn?', ['8', '7', '16', '6'], 0, '12 − 4 = 8.', ['Đúng — 12 − 4 = 8.', 'Sai — trừ thừa 1.', 'Sai — ăn rồi thì phải bớt, không cộng.', 'Sai — trừ thừa 2.']),
    Q('Bình hoa có 7 bông hồng và 5 bông cúc. Tổng?', ['11', '13', '10', '12'], 3, '7 + 5 = 12 bông.', ['Sai — cộng thiếu 1.', 'Sai — cộng thừa 1.', 'Sai — cộng thiếu 2.', 'Đúng — 7 + 5 = 12 bông.']),
  ]),

  M(33, 'Bài toán có lời văn (2)', [
    Q('Có 45 quyển vở, phát mỗi bạn 1 quyển cho 20 bạn. Còn?', ['65', '25', '30', '20'], 1, '45 − 20 = 25 quyển.', ['Sai — phát đi thì phải bớt, không cộng.', 'Đúng — 45 − 20 = 25 quyển.', 'Sai — trừ thiếu 5.', 'Sai — đó là số đã phát, không phải còn lại.']),
    Q('Sân có 24 con chim, bay đi 8 con. Còn?', ['32', '15', '14', '16'], 3, '24 − 8 = 16 con.', ['Sai — bay đi thì phải bớt, không cộng.', 'Sai — trừ thừa 1.', 'Sai — trừ thừa 2.', 'Đúng — 24 − 8 = 16 con.']),
    Q('Cửa hàng có 30 cái bút, nhập thêm 25 cái. Tổng?', ['50', '45', '60', '55'], 3, '30 + 25 = 55 cái.', ['Sai — cộng thiếu 5.', 'Sai — cộng thiếu 10.', 'Sai — cộng thừa 5.', 'Đúng — 30 + 25 = 55 cái.']),
    Q('An có 8 viên kẹo, Bình có hơn An 5 viên. Bình có?', ['12', '13', '14', '3'], 1, '8 + 5 = 13 viên.', ['Sai — cộng thiếu 1.', 'Đúng — Bình hơn nên 8 + 5 = 13 viên.', 'Sai — cộng thừa 1.', 'Sai — Bình hơn thì phải cộng, không trừ.']),
    Q('Hà có 20 nhãn vở, cho em 6 nhãn. Còn?', ['26', '13', '14', '12'], 2, '20 − 6 = 14.', ['Sai — cho đi thì phải bớt, không cộng.', 'Sai — trừ thừa 1.', 'Đúng — 20 − 6 = 14.', 'Sai — trừ thừa 2.']),
  ]),

  M(34, 'Ôn tập cuối HK2 (1)', [
    Q('27 + 13 = ?', ['40', '30', '41', '39'], 0, '7+3=10 nhớ 1; 2+1+1=4 → 40.', ['Đúng — 7+3=10 nhớ 1, 2+1+1=4 → 40.', 'Sai — quên cộng đơn vị.', 'Sai — cộng thừa 1.', 'Sai — quên nhớ 1.']),
    Q('80 − 35 = ?', ['45', '46', '44', '55'], 0, '80 − 35 = 45.', ['Đúng — 80 − 35 = 45.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 1.', 'Sai — trừ chục thiếu 1.']),
    Q('Số liền sau của 99 là?', ['100', '101', '98', '90'], 0, '99 + 1 = 100.', ['Đúng — liền sau là cộng 1: 99 + 1 = 100.', 'Sai — 101 cách 99 hai bước.', 'Sai — 98 là số liền TRƯỚC 99.', 'Sai — 90 còn bé hơn 99.']),
    Q('1 tuần có?', ['5 ngày', '10 ngày', '6 ngày', '7 ngày'], 3, '7 ngày.', ['Sai — đếm thiếu 2 ngày.', 'Sai — đếm thừa 3 ngày.', 'Sai — đếm thiếu 1 ngày.', 'Đúng — 1 tuần có 7 ngày.']),
    Q('Mặt đồng hồ có?', ['24 số', '10 số', '11 số', '12 số'], 3, '12 số.', ['Sai — 24 là số giờ trong ngày, không phải số trên mặt.', 'Sai — đếm thiếu 2 số.', 'Sai — đếm thiếu 1 số.', 'Đúng — mặt đồng hồ có 12 số.']),
    Q('Số 100 gồm?', ['1 chục', '100 chục', '10 chục', '0 chục'], 2, '100 = 10 chục.', ['Sai — 1 chục chỉ là 10.', 'Sai — 100 chục là số rất lớn.', 'Đúng — 100 = 10 chục.', 'Sai — 0 chục là số 0.']),
  ]),

  M(35, 'Ôn tập cuối HK2 (2)', [
    Q('Sắp xếp tăng dần: 47, 32, 81, 59', ['81, 59, 47, 32', '47, 32, 59, 81', '32, 47, 59, 81', '32, 47, 81, 59'], 2, '32 < 47 < 59 < 81.', ['Sai — đây là giảm dần, không phải tăng dần.', 'Sai — phải bắt đầu từ số bé nhất là 32.', 'Đúng — từ bé đến lớn: 32, 47, 59, 81.', 'Sai — 81 phải đứng sau 59.']),
    Q('Có 60 quả trứng, vỡ 12 quả. Còn?', ['47', '48', '72', '46'], 1, '60 − 12 = 48.', ['Sai — trừ thừa 1.', 'Đúng — 60 − 12 = 48.', 'Sai — vỡ rồi thì phải bớt, không cộng.', 'Sai — trừ thừa 2.']),
    Q('Hình có 4 cạnh và 4 góc, các cạnh bằng nhau là?', ['Hình tròn', 'Tam giác', 'Chữ nhật', 'Vuông'], 3, 'Hình vuông.', ['Sai — hình tròn không có cạnh thẳng.', 'Sai — tam giác chỉ có 3 cạnh.', 'Sai — chữ nhật có cạnh dài cạnh ngắn.', 'Đúng — hình vuông có 4 cạnh bằng nhau.']),
    Q('15 + 24 = ?', ['38', '40', '39', '49'], 2, '5+4=9; 1+2=3 → 39.', ['Sai — cộng thiếu 1.', 'Sai — cộng thừa 1.', 'Đúng — 5+4=9, 1+2=3 → 39.', 'Sai — cộng chục thừa 1.']),
    Q('Số bé nhất có 2 chữ số?', ['11', '20', '99', '10'], 3, '10 là số bé nhất có 2 chữ số.', ['Sai — 11 lớn hơn 10.', 'Sai — 20 lớn hơn 10.', 'Sai — 99 là số lớn nhất có 2 chữ số.', 'Đúng — 10 là số bé nhất có 2 chữ số.']),
    Q('1 chục + 1 chục = ? chục', ['2', '1', '10', '20'], 0, '1 + 1 = 2 chục.', ['Đúng — 1 chục + 1 chục = 2 chục.', 'Sai — mới có 1 chục, còn thiếu.', 'Sai — đó là số đơn vị, câu hỏi hỏi số chục.', 'Sai — 20 là số đơn vị, không phải số chục.']),
  ]),

  M(36, 'Kết thúc Lớp 1 — Hành trang vào Lớp 2', [
    Q('Cả năm Lớp 1 em đã học đếm và viết số đến bao nhiêu?', ['Đến 10', 'Đến 20', 'Đến 50', 'Đến 100'], 3, 'Lớp 1 học số từ 0 đến 100.', ['Sai — đó là phần đầu HK1 thôi, sau đó em còn học tiếp.', 'Sai — sang HK2 em đã học tới số lớn hơn nhiều.', 'Sai — em còn học tiếp tới số lớn hơn nữa.', 'Đúng — Lớp 1 học đếm và viết số từ 0 đến 100.']),
    Q('35 + 27 = ?', ['62', '52', '63', '61'], 0, 'Đơn vị: 5 + 7 = 12, viết 2 nhớ 1. Chục: 3 + 2 + 1 = 6 → 62.', ['Đúng — 5 + 7 = 12 viết 2 nhớ 1, rồi 3 + 2 + 1 = 6 → 62.', 'Sai — em quên "nhớ 1" sang hàng chục.', 'Sai — cộng thừa 1 rồi.', 'Sai — cộng thiếu 1 rồi.']),
    Q('Hình nào có 3 cạnh?', ['Hình vuông', 'Hình tam giác', 'Hình tròn', 'Hình chữ nhật'], 1, 'Tam giác có 3 cạnh.', ['Sai — hình vuông có 4 cạnh bằng nhau.', 'Đúng — tam giác có đúng 3 cạnh.', 'Sai — hình tròn không có cạnh thẳng nào.', 'Sai — hình chữ nhật có 4 cạnh.']),
    Q('Kim ngắn chỉ số 9, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?', ['8 giờ', '10 giờ', '9 giờ', '12 giờ'], 2, 'Kim dài chỉ 12 là giờ đúng; kim ngắn chỉ 9 → 9 giờ.', ['Sai — kim ngắn đang chỉ số 9, không phải số 8.', 'Sai — kim ngắn đang chỉ số 9, không phải số 10.', 'Đúng — kim dài chỉ 12 nên là giờ đúng: 9 giờ.', 'Sai — số 12 là chỗ kim dài, kim ngắn mới cho biết mấy giờ.']),
    Q('Có 24 quả cam, cho bạn 9 quả. Còn lại mấy quả?', ['15', '16', '13', '33'], 0, '24 − 9 = 15 quả.', ['Đúng — 24 − 9 = 15 quả.', 'Sai — trừ thiếu 1.', 'Sai — trừ thừa 2.', 'Sai — cho đi thì phải bớt, không cộng thêm.']),
    Q('Lên Lớp 2 em sẽ được học bảng nào?', ['Bảng chữ cái', 'Bảng màu', 'Bảng nhân và bảng chia', 'Bảng tuần hoàn'], 2, 'Lớp 2 bắt đầu học bảng nhân, bảng chia.', ['Sai — bảng chữ cái là của môn Tiếng Việt.', 'Sai — bảng màu là của môn Mĩ thuật.', 'Đúng — Lớp 2 em sẽ học bảng nhân và bảng chia.', 'Sai — bảng tuần hoàn là của môn Hoá học, học ở cấp lớn hơn nhiều.']),
  ]),
];

export const P1_TOAN_SCENARIOS = indexBy(P1_TOAN_WEEKS);
