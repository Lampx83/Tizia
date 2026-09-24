// ============================================================
// Lớp 5 · TOÁN — 35 tuần (HK1: 1–18 · HK2: 19–35 · T22 nghỉ Tết)
// Bám SGK GDPT 2018 (3 bộ Cánh Diều / Kết nối / Chân trời).
// ID prefix: "P5-wNN-quiz" → trùng prefix module "P5".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P5', 'toan', n, title, qs, opts);

export const P5_TOAN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Ôn tập số tự nhiên', [
    Q('Số liền sau của 9 999 là?', ['9 998', '1 000', '99 999', '10 000'], 3, '9 999 + 1 = 10 000.', ['Sai — đó là số liền trước (9 999 − 1).', 'Sai — số này nhỏ hơn 9 999 rất nhiều.', 'Sai — em thêm tận 9 chữ số, chỉ cần cộng 1 thôi.', 'Đúng — số liền sau là cộng thêm 1: 9 999 + 1 = 10 000.']),
    Q('Số gồm 3 chục nghìn, 2 nghìn, 5 trăm và 4 đơn vị là?', ['3 254', '32 540', '325 040', '32 504'], 3, '30 000 + 2 000 + 500 + 4 = 32 504.', ['Sai — em thiếu mất hàng chục nghìn.', 'Sai — em đặt chữ số 4 nhầm sang hàng chục, hàng đơn vị phải là 4.', 'Sai — số này quá lớn, em thêm thừa chữ số 0.', 'Đúng — 30 000 + 2 000 + 500 + 4 = 32 504.']),
    Q('Chữ số 7 trong số 87 432 có giá trị là?', ['70', '7 000', '700', '7'], 1, 'Chữ số 7 đứng ở hàng nghìn.', ['Sai — đó là giá trị nếu 7 ở hàng chục.', 'Đúng — chữ số 7 ở hàng nghìn nên có giá trị 7 000.', 'Sai — đó là giá trị nếu 7 ở hàng trăm.', 'Sai — đó là giá trị nếu 7 ở hàng đơn vị.']),
    Q('Sắp xếp từ bé đến lớn: 4 321; 4 312; 4 231; 4 213', ['4 213; 4 231; 4 312; 4 321', '4 213; 4 312; 4 231; 4 321', '4 321; 4 312; 4 231; 4 213', '4 231; 4 213; 4 312; 4 321'], 0, 'So sánh theo từng hàng từ trái sang phải.', ['Đúng — so sánh hàng trăm rồi hàng chục: 4 213 < 4 231 < 4 312 < 4 321.', 'Sai — 4 231 phải đứng trước 4 312 vì hàng trăm 2 < 3.', 'Sai — đây là thứ tự từ lớn đến bé, ngược yêu cầu.', 'Sai — 4 213 nhỏ nhất phải đứng đầu, không phải 4 231.']),
    Q('1 triệu có mấy chữ số 0?', ['5', '7', '4', '6'], 3, '1 000 000 có 6 chữ số 0.', ['Sai — em đếm thiếu 1 chữ số 0.', 'Sai — em đếm thừa, hãy đếm lại các số 0.', 'Sai — em đếm thiếu 2 chữ số 0.', 'Đúng — 1 000 000 có 6 chữ số 0.']),
    Q('Số chẵn lớn nhất có 4 chữ số khác nhau là?', ['8 642', '9 876', '9 998', '9 874'], 1, 'Chữ số tận cùng phải chẵn, các chữ số khác nhau → 9876.', ['Sai — còn nhiều số lớn hơn bắt đầu bằng 9.', 'Đúng — bắt đầu bằng 9 8 7 và tận cùng chẵn là 6 → 9 876.', 'Sai — số này có hai chữ số 9 giống nhau.', 'Sai — 9 874 nhỏ hơn 9 876.']),
  ]),

  M(2, 'Ôn tập phân số (1)', [
    Q('Phân số 3/4 đọc là?', ['Ba phần tư', 'Bốn phần ba', 'Ba bốn', 'Ba trên bốn'], 0, '3/4 đọc là "ba phần tư".', ['Đúng — tử đọc trước, mẫu đọc sau: ba phần tư.', 'Sai — em đọc ngược tử và mẫu, đó là 4/3.', 'Sai — phân số phải đọc có chữ \'phần\'.', 'Sai — cách đọc đúng dùng chữ \'phần\', không phải \'trên\'.']),
    Q('Phân số 5/5 bằng?', ['10', '0', '5', '1'], 3, 'Tử = mẫu thì phân số = 1.', ['Sai — em cộng tử với mẫu, phân số là phép chia.', 'Sai — tử khác 0 nên kết quả không thể bằng 0.', 'Sai — đó là tử số, chưa chia cho mẫu.', 'Đúng — tử bằng mẫu nên 5/5 = 1.']),
    Q('Trong các phân số sau, phân số nào lớn hơn 1?', ['7/4', '5/5', '1/2', '2/3'], 0, '7/4 có tử > mẫu nên > 1.', ['Đúng — tử 7 lớn hơn mẫu 4 nên phân số lớn hơn 1.', 'Sai — tử bằng mẫu nên bằng đúng 1.', 'Sai — tử nhỏ hơn mẫu nên nhỏ hơn 1.', 'Sai — tử nhỏ hơn mẫu nên nhỏ hơn 1.']),
    Q('Rút gọn 6/8 ta được?', ['3/8', '2/4', '6/4', '3/4'], 3, 'Chia cả tử và mẫu cho 2: 6/8 = 3/4.', ['Sai — em chỉ chia tử mà quên chia mẫu.', 'Sai — chia 2 thì 6 thành 3 chứ không phải 2.', 'Sai — em chia mẫu nhưng không chia tử.', 'Đúng — chia cả tử và mẫu cho 2: 6/8 = 3/4.']),
    Q('Quy đồng 1/2 và 1/3 (mẫu chung 6) được?', ['2/6 và 3/6', '6/2 và 6/3', '3/6 và 2/6', '1/6 và 1/6'], 2, '1/2 = 3/6, 1/3 = 2/6.', ['Sai — em đặt nhầm: 1/2 = 3/6 mới đúng, không phải 2/6.', 'Sai — em viết ngược tử và mẫu rồi.', 'Đúng — 1/2 = 3/6 và 1/3 = 2/6.', 'Sai — phải nhân tử theo từng phân số, không cùng là 1.']),
    Q('Phân số 8/12 rút gọn tối giản là?', ['2/3', '3/4', '8/12', '4/6'], 0, '8/12 = 2/3 (chia cả tử và mẫu cho 4).', ['Đúng — chia cả tử và mẫu cho 4: 8/12 = 2/3.', 'Sai — đó là kết quả của một phân số khác.', 'Sai — đây là phân số chưa rút gọn.', 'Sai — 4/6 chưa tối giản, còn chia tiếp được cho 2.']),
  ]),

  M(3, 'Ôn tập phân số (2) — Cộng trừ', [
    Q('1/4 + 2/4 = ?', ['2/8', '3/4', '1/2', '3/8'], 1, 'Cùng mẫu: cộng tử số.', ['Sai — cùng mẫu thì giữ nguyên mẫu, không cộng mẫu.', 'Đúng — cùng mẫu: cộng tử 1 + 2 = 3, giữ mẫu 4 → 3/4.', 'Sai — 3/4 không rút gọn được thành 1/2.', 'Sai — em cộng cả mẫu là sai, mẫu giữ nguyên là 4.']),
    Q('1/2 + 1/3 = ?', ['2/5', '5/6', '2/6', '1/5'], 1, 'Quy đồng: 3/6 + 2/6 = 5/6.', ['Sai — không được cộng thẳng tử với tử, mẫu với mẫu.', 'Đúng — quy đồng mẫu 6: 3/6 + 2/6 = 5/6.', 'Sai — đó mới chỉ là 1/3 sau khi quy đồng.', 'Sai — phải quy đồng mẫu trước khi cộng.']),
    Q('5/6 − 1/6 = ?', ['4/6', '2/3', '6/6', 'Cả A và B đều đúng'], 3, '5/6 − 1/6 = 4/6 = 2/3.', ['Sai — đúng nhưng chưa đủ, 4/6 còn rút gọn được.', 'Sai — đúng nhưng đây là dạng đã rút gọn, còn dạng chưa rút gọn.', 'Sai — cùng mẫu thì trừ tử 5 − 1 = 4, không phải 6.', 'Đúng — 5/6 − 1/6 = 4/6 = 2/3 nên cả A và B đều đúng.']),
    Q('3/4 − 1/2 = ?', ['1/2', '1/4', '2/2', '2/4'], 1, '3/4 − 2/4 = 1/4.', ['Sai — em chưa quy đồng 1/2 thành 2/4 trước khi trừ.', 'Đúng — 1/2 = 2/4, lấy 3/4 − 2/4 = 1/4.', 'Sai — kết quả phải nhỏ hơn 3/4, không thể là 1.', 'Sai — 2/4 chưa rút gọn và cũng không phải kết quả.']),
    Q('1 − 2/5 = ?', ['2/5', '3/5', '1/5', '5/2'], 1, '5/5 − 2/5 = 3/5.', ['Sai — đó là số bị trừ đi, không phải kết quả.', 'Đúng — viết 1 = 5/5 rồi trừ: 5/5 − 2/5 = 3/5.', 'Sai — em trừ tử sai, 5 − 2 = 3 chứ không phải 1.', 'Sai — em viết ngược tử và mẫu rồi.']),
    Q('Tổng 1/2 + 1/4 + 1/4 = ?', ['1/2', '2/4', '1', '3/4'], 2, '2/4 + 1/4 + 1/4 = 4/4 = 1.', ['Sai — em mới cộng được một phần, còn thiếu hai số sau.', 'Sai — đó chỉ là 1/2 sau khi quy đồng, chưa cộng hết.', 'Đúng — 2/4 + 1/4 + 1/4 = 4/4 = 1.', 'Sai — em quên cộng thêm 1/4 cuối cùng.']),
  ]),

  M(4, 'Ôn tập phân số (3) — Nhân chia', [
    Q('2/3 × 3/4 = ?', ['1/2', '6/12', '5/7', 'Cả A và B đều đúng'], 3, '2×3/3×4 = 6/12 = 1/2.', ['Sai — đúng giá trị nhưng còn cách viết chưa rút gọn nữa.', 'Sai — đúng giá trị nhưng đây là dạng chưa rút gọn.', 'Sai — nhân phân số là tử nhân tử, mẫu nhân mẫu, không cộng.', 'Đúng — 6/12 = 1/2 nên cả A và B đều đúng.']),
    Q('1/2 × 4 = ?', ['2', '4/2', '1/8', 'Cả A và B đều đúng'], 3, '1/2 × 4 = 4/2 = 2.', ['Sai — đúng giá trị nhưng còn cách viết 4/2 cũng đúng.', 'Sai — đúng giá trị nhưng 4/2 rút gọn được thành 2.', 'Sai — nhân với 4 thì tử nhân 4, không phải mẫu.', 'Đúng — 4/2 = 2 nên cả A và B đều đúng.']),
    Q('2/5 : 1/5 = ?', ['5/2', '2/25', '2', '1'], 2, '2/5 × 5/1 = 10/5 = 2.', ['Sai — em đảo nhầm cả phân số thứ nhất.', 'Sai — chia phân số là nhân với phân số đảo, không nhân thẳng.', 'Đúng — 2/5 × 5/1 = 10/5 = 2.', 'Sai — hai phân số khác nhau nên thương không bằng 1.']),
    Q('3/4 : 3 = ?', ['1/3', 'Cả A và C đều đúng', '1/4', '3/12'], 1, '3/4 × 1/3 = 3/12 = 1/4.', ['Sai — chia cho 3 là nhân với 1/3, kết quả là 1/4.', 'Đúng — 3/4 × 1/3 = 3/12 = 1/4 nên 1/4 và 3/12 cùng đúng.', 'Sai — đúng giá trị nhưng còn cách viết 3/12 cũng đúng.', 'Sai — đúng giá trị nhưng 3/12 rút gọn thành 1/4.']),
    Q('Phân số đảo ngược của 2/7 là?', ['2/14', '2/7', '7/2', '7/−2'], 2, 'Đổi chỗ tử và mẫu.', ['Sai — đảo ngược là đổi chỗ tử mẫu, không nhân mẫu lên.', 'Sai — đó là chính phân số ban đầu, chưa đổi chỗ.', 'Đúng — đổi chỗ tử và mẫu: 2/7 thành 7/2.', 'Sai — không được thêm dấu âm khi đảo ngược.']),
    Q('1/2 × 1/3 × 1/4 = ?', ['1/12', '1/9', '1/24', '3/24'], 2, '1×1×1 / 2×3×4 = 1/24.', ['Sai — em mới nhân hai mẫu đầu, còn thiếu × 4.', 'Sai — mẫu phải là 2 × 3 × 4, không phải 3 × 3.', 'Đúng — tử 1×1×1 = 1, mẫu 2×3×4 = 24 → 1/24.', 'Sai — tử phải là 1×1×1 = 1, không phải 3.']),
  ]),

  M(5, 'Hỗn số', [
    Q('Hỗn số 2 và 1/3 viết thành phân số là?', ['7/3', '3/2', '6/3', '5/3'], 0, '2 × 3 + 1 = 7 → 7/3.', ['Đúng — lấy phần nguyên nhân mẫu cộng tử: 2×3+1 = 7 → 7/3.', 'Sai — em không được dùng tử 1 làm mẫu mới.', 'Sai — em quên cộng thêm tử 1.', 'Sai — em nhân thiếu, 2×3+1 = 7 chứ không phải 5.']),
    Q('Phân số 7/2 đổi ra hỗn số là?', ['1 và 7/2', '3 và 1/2', '2 và 3/2', '7 và 1/2'], 1, '7 : 2 = 3 dư 1 → 3 và 1/2.', ['Sai — phần nguyên là thương 7:2 = 3, không phải 1.', 'Đúng — 7 : 2 = 3 dư 1 nên được 3 và 1/2.', 'Sai — phần phân số phải nhỏ hơn 1, 3/2 thì lớn hơn 1.', 'Sai — em lấy nhầm tử số làm phần nguyên.']),
    Q('Phần nguyên của hỗn số 5 và 2/7 là?', ['10', '5', '2', '7'], 1, '5 là phần nguyên đứng trước.', ['Sai — đó không phải số nào trong hỗn số.', 'Đúng — số đứng trước phần phân số là phần nguyên: 5.', 'Sai — 2 là tử của phần phân số.', 'Sai — 7 là mẫu của phần phân số.']),
    Q('1 và 1/2 + 2 và 1/2 = ?', ['3 và 1/2', '4', '4 và 1/2', '3'], 1, '1 + 2 = 3; 1/2 + 1/2 = 1 → 4.', ['Sai — 1/2 + 1/2 = 1 nguyên chứ không còn 1/2.', 'Đúng — phần nguyên 1+2 = 3, phần phân số 1/2+1/2 = 1 → 4.', 'Sai — em cộng thừa, 1/2 + 1/2 chỉ bằng 1.', 'Sai — em quên cộng phần phân số bằng 1.']),
    Q('Đổi 11/4 thành hỗn số?', ['4 và 2/3', '2 và 3/4', '3 và 3/4', '2 và 1/4'], 1, '11 : 4 = 2 dư 3 → 2 và 3/4.', ['Sai — em chia nhầm, 11:4 không bằng 4.', 'Đúng — 11 : 4 = 2 dư 3 nên được 2 và 3/4.', 'Sai — phần nguyên là 2, không phải 3.', 'Sai — số dư là 3 nên tử phải là 3, không phải 1.']),
    Q('Hỗn số nào lớn nhất?', ['1 và 7/8', '2 và 1/8', '2', '1 và 1/2'], 1, '2 và 1/8 ≈ 2,125 — lớn nhất.', ['Sai — 1 và 7/8 chưa tới 2 nên nhỏ hơn.', 'Đúng — 2 và 1/8 lớn hơn 2 nên là lớn nhất.', 'Sai — số 2 nhỏ hơn 2 và 1/8.', 'Sai — 1 và 1/2 chỉ bằng 1,5.']),
  ]),

  M(6, 'Số thập phân — đọc viết', [
    Q('Số 3,14 đọc là?', ['Ba phẩy mười bốn', 'Ba phẩy một bốn', 'Ba mươi mốt phần tư', 'Ba một bốn'], 0, 'Phần thập phân đọc liền: "mười bốn".', ['Đúng — đọc phần nguyên \'ba\', dấu \'phẩy\', rồi \'mười bốn\'.', 'Sai — phần thập phân 14 đọc liền là \'mười bốn\', không tách \'một bốn\'.', 'Sai — đây là một phân số khác, không phải cách đọc số thập phân.', 'Sai — thiếu chữ \'phẩy\' và phần thập phân đọc chưa đúng.']),
    Q('Phân số 1/10 viết dưới dạng số thập phân là?', ['0,1', '1,0', '0,01', '10'], 0, '1/10 = 0,1.', ['Đúng — chia 1 phần thành 10 nên 1/10 = 0,1.', 'Sai — đó là số 1, lớn hơn 1/10 nhiều.', 'Sai — đó là 1/100, em đặt dư một chữ số 0.', 'Sai — đó là gấp 10 lần, ngược với 1/10.']),
    Q('Phần thập phân của 7,205 là?', ['7', '205', '0,205', '2 0 5'], 1, 'Phần sau dấu phẩy là phần thập phân.', ['Sai — đó là phần nguyên đứng trước dấu phẩy.', 'Đúng — các chữ số sau dấu phẩy là phần thập phân: 205.', 'Sai — phần thập phân chỉ gồm các chữ số sau dấu phẩy.', 'Sai — viết liền là 205, không tách rời.']),
    Q('Hàng phần trăm của số 5,247 là chữ số?', ['4', '5', '2', '7'], 0, 'Chữ số thứ hai sau dấu phẩy là hàng phần trăm.', ['Đúng — chữ số thứ hai sau dấu phẩy là hàng phần trăm: 4.', 'Sai — đó là phần nguyên, không phải hàng phần trăm.', 'Sai — đó là hàng phần mười (chữ số đầu sau dấu phẩy).', 'Sai — đó là hàng phần nghìn (chữ số thứ ba sau dấu phẩy).']),
    Q('Viết "không phẩy ba mươi lăm" bằng chữ số?', ['3,5', '0,305', '0,035', '0,35'], 3, '"ba mươi lăm" → 35 ở phần thập phân.', ['Sai — phần nguyên phải là 0, không phải 3.', 'Sai — em chèn thừa chữ số 0 vào giữa.', 'Sai — em đặt thừa một chữ số 0 ở đầu phần thập phân.', 'Đúng — phần nguyên 0, phần thập phân là 35 → 0,35.']),
    Q('45/100 viết dưới dạng thập phân?', ['4,5', '45,00', '0,045', '0,45'], 3, '45/100 = 0,45.', ['Sai — đó là 45/10, em dời dấu phẩy sai chỗ.', 'Sai — đó là số 45, không phải chia cho 100.', 'Sai — đó là 45/1000, em thừa một chữ số 0.', 'Đúng — chia cho 100 nên 45/100 = 0,45.']),
  ]),

  M(7, 'So sánh — cộng trừ số thập phân', [
    Q('So sánh 2,5 và 2,50', ['Bằng nhau', 'Không so sánh được', '2,5 lớn hơn', '2,50 lớn hơn'], 0, 'Thêm 0 vào tận cùng phần thập phân không đổi giá trị.', ['Đúng — thêm 0 vào cuối phần thập phân không làm đổi giá trị.', 'Sai — hai số thập phân luôn so sánh được.', 'Sai — hai số này bằng nhau, không số nào lớn hơn.', 'Sai — chữ số 0 cuối cùng không làm số lớn hơn.']),
    Q('Số bé hơn 1,5 là?', ['1,55', '1,6', '1,499', '2,0'], 2, '1,499 < 1,500.', ['Sai — 1,55 lớn hơn 1,5 vì hàng phần trăm có thêm 5.', 'Sai — 1,6 lớn hơn 1,5.', 'Đúng — 1,499 nhỏ hơn 1,500 dù nhìn dài hơn.', 'Sai — 2,0 lớn hơn 1,5.']),
    Q('1,2 + 3,5 = ?', ['47', '5,7', '4,07', '4,7'], 3, 'Đặt tính thẳng cột thập phân.', ['Sai — em quên mất dấu phẩy thập phân.', 'Sai — em cộng nhầm phần nguyên 1+3 = 4 chứ không phải 5.', 'Sai — em đặt sai chỗ dấu phẩy.', 'Đúng — đặt thẳng cột: 1,2 + 3,5 = 4,7.']),
    Q('5,8 − 2,3 = ?', ['8,1', '3,5', '2,5', '3,05'], 1, '5,8 − 2,3 = 3,5.', ['Sai — đây là phép cộng, đề bài là phép trừ.', 'Đúng — 5−2 = 3 và 8−3 = 5 phần mười → 3,5.', 'Sai — phần nguyên 5−2 = 3, không phải 2.', 'Sai — em đặt sai chỗ dấu phẩy thập phân.']),
    Q('0,75 + 0,25 = ?', ['1', '0,9', '10', '0,100'], 0, '0,75 + 0,25 = 1,00 = 1.', ['Đúng — 0,75 + 0,25 = 1,00 = 1.', 'Sai — em cộng thiếu, kết quả tròn 1.', 'Sai — em đặt sai dấu phẩy, kết quả là 1 chứ không phải 10.', 'Sai — đó cách viết 0,1 chứ không phải kết quả.']),
    Q('10 − 0,1 = ?', ['9,9', '9,99', '10,1', '9,1'], 0, '10,0 − 0,1 = 9,9.', ['Đúng — viết 10 = 10,0 rồi trừ: 10,0 − 0,1 = 9,9.', 'Sai — em trừ thừa, chỉ bớt đi 0,1.', 'Sai — đây là phép cộng, đề bài là phép trừ.', 'Sai — em trừ nhầm ở phần nguyên.']),
  ]),

  M(8, 'Nhân số thập phân', [
    Q('1,2 × 10 = ?', ['0,12', '120', '1,20', '12'], 3, 'Nhân 10: dời dấu phẩy sang phải 1 chữ số.', ['Sai — em dời dấu phẩy sang trái, nhân 10 phải dời sang phải.', 'Sai — đó là nhân 100, em dời thừa một chỗ.', 'Sai — đó là giá trị cũ, em chưa nhân với 10.', 'Đúng — nhân 10 dời dấu phẩy sang phải 1 chữ số: 12.']),
    Q('0,5 × 100 = ?', ['50', '500', '5', '0,05'], 0, 'Nhân 100: dời dấu phẩy sang phải 2 chữ số.', ['Đúng — nhân 100 dời dấu phẩy sang phải 2 chữ số: 50.', 'Sai — đó là nhân 1000, em dời thừa một chỗ.', 'Sai — đó là nhân 10, em dời thiếu một chỗ.', 'Sai — em dời dấu phẩy sang trái, ngược chiều.']),
    Q('2,5 × 4 = ?', ['8,5', '10,0', 'Cả A và B đều đúng', '10'], 2, '2,5 × 4 = 10.', ['Sai — em cộng nhầm, 2,5 × 4 không phải 8,5.', 'Sai — đúng giá trị nhưng còn cách viết 10 cũng đúng.', 'Đúng — 2,5 × 4 = 10 nên 10,0 và 10 đều đúng.', 'Sai — đúng giá trị nhưng 10,0 cũng là cách viết đúng.']),
    Q('0,3 × 0,2 = ?', ['0,6', '0,006', '6', '0,06'], 3, '3×2 = 6, tổng 2 chữ số thập phân → 0,06.', ['Sai — em quên đếm chữ số thập phân của cả hai thừa số.', 'Sai — em đếm thừa một chữ số thập phân.', 'Sai — em bỏ quên hẳn dấu phẩy thập phân.', 'Đúng — 3×2 = 6, hai số đều có 1 chữ số thập phân → 0,06.']),
    Q('1,5 × 1,5 = ?', ['3', '2,25', '22,5', '2,5'], 1, '15 × 15 = 225 → 2,25.', ['Sai — đó là 1,5 + 1,5, đề bài là phép nhân.', 'Đúng — 15 × 15 = 225, hai chữ số thập phân → 2,25.', 'Sai — em đặt sai chỗ dấu phẩy.', 'Sai — em chưa nhân, đó vẫn là thừa số.']),
    Q('Nhân nhẩm 7,8 × 0,1 = ?', ['0,078', '0,78', '7,80', '78'], 1, 'Nhân 0,1: dời dấu phẩy sang trái 1 chữ số.', ['Sai — em dời dấu phẩy sang trái thừa một chỗ.', 'Đúng — nhân 0,1 là dời dấu phẩy sang trái 1 chữ số: 0,78.', 'Sai — đó là giá trị cũ, em chưa nhân với 0,1.', 'Sai — nhân với 0,1 làm số nhỏ đi, không lớn lên.']),
  ]),

  M(9, 'Chia số thập phân', [
    Q('25,5 : 10 = ?', ['2,55', '25,50', '255', '0,255'], 0, 'Chia 10: dời dấu phẩy sang trái 1 chữ số.', ['Đúng — chia 10 dời dấu phẩy sang trái 1 chữ số: 2,55.', 'Sai — đó là giá trị cũ, em chưa chia cho 10.', 'Sai — em dời dấu phẩy sang phải, chia phải dời sang trái.', 'Sai — đó là chia 100, em dời thừa một chỗ.']),
    Q('7,5 : 100 = ?', ['0,75', '0,075', '7,5', '750'], 1, 'Chia 100: dời dấu phẩy sang trái 2 chữ số.', ['Sai — đó là chia 10, em dời thiếu một chỗ.', 'Đúng — chia 100 dời dấu phẩy sang trái 2 chữ số: 0,075.', 'Sai — đó là giá trị cũ, em chưa chia.', 'Sai — em nhân thay vì chia, số phải nhỏ đi.']),
    Q('6 : 0,1 = ?', ['60', '0,6', '6', '0,06'], 0, 'Chia 0,1 tương đương nhân 10.', ['Đúng — chia cho 0,1 giống nhân 10: 6 × 10 = 60.', 'Sai — chia cho số nhỏ hơn 1 thì kết quả lớn lên, không nhỏ đi.', 'Sai — đó là giá trị cũ, em chưa chia.', 'Sai — chia 0,1 làm số lớn lên chứ không nhỏ đi.']),
    Q('8,4 : 2 = ?', ['0,42', '4,2', '4,02', '42'], 1, '8,4 : 2 = 4,2.', ['Sai — em đặt sai chỗ dấu phẩy.', 'Đúng — 8 : 2 = 4 và 4 phần mười : 2 = 2 phần mười → 4,2.', 'Sai — em chèn thừa chữ số 0 vào giữa.', 'Sai — em quên mất dấu phẩy thập phân.']),
    Q('1 : 4 (viết dưới dạng số thập phân) = ?', ['0,025', '0,25', '0,4', '0,5'], 1, '1/4 = 0,25.', ['Sai — đó là 1/40, em đặt thừa một chữ số 0.', 'Đúng — 1 chia 4 bằng 0,25.', 'Sai — 0,4 là 2/5, không phải 1/4.', 'Sai — 0,5 là 1/2, không phải 1/4.']),
    Q('5,6 : 0,7 = ?', ['7', '0,8', '8', '80'], 2, '5,6 : 0,7 = 56 : 7 = 8.', ['Sai — em chia nhầm, 56 : 7 = 8.', 'Sai — chia cho 0,7 làm số lớn lên, không nhỏ đi.', 'Đúng — bỏ dấu phẩy hai số: 56 : 7 = 8.', 'Sai — em đặt sai chỗ dấu phẩy, kết quả là 8.']),
  ]),

  M(10, 'Đơn vị đo diện tích — dm² mm² km² ha', [
    Q('1 m² bằng bao nhiêu dm²?', ['10', '100', '10 000', '1 000'], 1, '1 m² = 100 dm².', ['Sai — đơn vị diện tích hơn kém nhau 100 lần, không phải 10.', 'Đúng — hai đơn vị diện tích liền nhau hơn kém 100 lần: 1 m² = 100 dm².', 'Sai — đó là số dm² trong 1 dam², em nhảy cách hai bậc.', 'Sai — đó là quan hệ của đơn vị độ dài chứ không phải diện tích.']),
    Q('1 km² bằng bao nhiêu m²?', ['100 000', '1 000 000', '10 000', '1 000'], 1, '1 km² = 1 000 000 m².', ['Sai — em đếm thiếu một chữ số 0.', 'Đúng — 1 km² = 1 000 000 m².', 'Sai — đó là số m² trong 1 ha, không phải 1 km².', 'Sai — đó là quan hệ của đơn vị độ dài (1 km = 1 000 m).']),
    Q('1 ha (héc-ta) bằng?', ['100 m²', '100 000 m²', '1 000 m²', '10 000 m²'], 3, '1 ha = 10 000 m².', ['Sai — đó là 1 dam², ha lớn hơn nhiều.', 'Sai — em đếm thừa một chữ số 0.', 'Sai — em đếm thiếu một chữ số 0.', 'Đúng — 1 ha = 10 000 m².']),
    Q('1 km² bằng bao nhiêu ha?', ['1 000', '10 000', '10', '100'], 3, '1 km² = 100 ha.', ['Sai — em đếm thừa chữ số 0.', 'Sai — đó là số m² trong 1 ha, nhầm đơn vị.', 'Sai — em đếm thiếu một chữ số 0.', 'Đúng — 1 km² = 100 ha.']),
    Q('5 ha = ? m²', ['5 000', '500 000', '500', '50 000'], 3, '5 × 10 000 = 50 000 m².', ['Sai — em quên 1 ha bằng tận 10 000 m².', 'Sai — em nhân thừa một chữ số 0.', 'Sai — em đổi sai, 1 ha không phải 100 m².', 'Đúng — 5 × 10 000 = 50 000 m².']),
    Q('1 cm² bằng bao nhiêu mm²?', ['1', '100', '1 000', '10'], 1, '1 cm² = 100 mm².', ['Sai — hai đơn vị diện tích không thể bằng nhau.', 'Đúng — hai đơn vị diện tích liền nhau hơn kém 100 lần: 1 cm² = 100 mm².', 'Sai — em đếm thừa một chữ số 0.', 'Sai — đó là quan hệ độ dài (1 cm = 10 mm), không phải diện tích.']),
  ]),

  M(11, 'Diện tích hình tam giác', [
    Q('Công thức diện tích tam giác là?', ['(a + h) : 2', 'a × b × c', 'a × h × 2', 'a × h : 2'], 3, 'S = đáy × chiều cao : 2.', ['Sai — đáy và cao phải nhân với nhau, không cộng.', 'Sai — đó không phải công thức diện tích tam giác.', 'Sai — phải chia 2 chứ không nhân 2.', 'Đúng — S = đáy × chiều cao : 2.']),
    Q('Tam giác có đáy 6 cm, cao 4 cm. S = ?', ['12 cm²', '20 cm²', '24 cm²', '10 cm²'], 0, '6 × 4 : 2 = 12 cm².', ['Đúng — 6 × 4 : 2 = 12 cm².', 'Sai — kết quả không khớp công thức đáy × cao : 2.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — em cộng đáy với cao thay vì nhân rồi chia 2.']),
    Q('Tam giác vuông có 2 cạnh góc vuông 3 cm và 4 cm. S = ?', ['7 cm²', '6 cm²', '12 cm²', '5 cm²'], 1, '3 × 4 : 2 = 6 cm².', ['Sai — em cộng hai cạnh thay vì nhân rồi chia 2.', 'Đúng — hai cạnh góc vuông làm đáy và cao: 3 × 4 : 2 = 6 cm².', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — kết quả không khớp công thức.']),
    Q('Chiều cao của tam giác là đoạn nào?', ['Cạnh bên', 'Một cạnh bất kì', 'Đường chéo', 'Đoạn vuông góc từ đỉnh xuống đáy'], 3, 'Chiều cao vuông góc với đáy.', ['Sai — cạnh bên không phải lúc nào cũng vuông góc với đáy.', 'Sai — chiều cao là đoạn vuông góc, không phải cạnh tuỳ ý.', 'Sai — tam giác không có đường chéo.', 'Đúng — chiều cao là đoạn vuông góc từ đỉnh xuống đáy.']),
    Q('Tam giác có S = 20 cm², đáy 5 cm. Chiều cao?', ['10 cm', '8 cm', '4 cm', '2 cm'], 1, 'h = 2S : a = 2×20 : 5 = 8 cm.', ['Sai — em quên nhân S với 2 trước khi chia đáy.', 'Đúng — h = 2 × S : đáy = 2 × 20 : 5 = 8 cm.', 'Sai — em chia S cho đáy nhưng quên nhân 2.', 'Sai — kết quả quá nhỏ so với công thức.']),
    Q('Tam giác đáy 10 cm, cao 0,5 m. S = ? cm²', ['5', '500', '250', '50'], 2, '0,5 m = 50 cm; 10 × 50 : 2 = 250 cm².', ['Sai — em quên đổi 0,5 m ra cm trước khi tính.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Đúng — đổi 0,5 m = 50 cm rồi 10 × 50 : 2 = 250 cm².', 'Sai — em chưa đổi đơn vị nên đáp số sai.']),
  ]),

  M(12, 'Diện tích hình thang', [
    Q('Công thức diện tích hình thang?', ['(a − b) × h', '(a + b) × h : 2', 'a × b × h', '(a + b) × h'], 1, 'S = (đáy lớn + đáy bé) × cao : 2.', ['Sai — hai đáy phải cộng với nhau, không trừ.', 'Đúng — S = (đáy lớn + đáy bé) × chiều cao : 2.', 'Sai — đó không phải công thức hình thang.', 'Sai — em quên chia 2 ở cuối.']),
    Q('Hình thang có đáy lớn 10, đáy bé 6, cao 4. S = ?', ['32', '40', '60', '64'], 0, '(10 + 6) × 4 : 2 = 32.', ['Đúng — (10 + 6) × 4 : 2 = 32.', 'Sai — kết quả không khớp công thức.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — em tính sai bước nhân với cao.']),
    Q('Hình thang có 2 đáy 8 cm và 4 cm, cao 5 cm. S = ?', ['30 cm²', '40 cm²', '60 cm²', '20 cm²'], 0, '(8 + 4) × 5 : 2 = 30 cm².', ['Đúng — (8 + 4) × 5 : 2 = 30 cm².', 'Sai — kết quả không khớp công thức.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — em tính thiếu một bước.']),
    Q('Hình thang vuông là hình thang có?', ['Hai đáy bằng nhau', 'Bốn góc vuông', 'Một cạnh bên vuông góc với 2 đáy', 'Bốn cạnh bằng nhau'], 2, 'Cạnh bên đó chính là chiều cao.', ['Sai — hình thang có hai đáy khác nhau.', 'Sai — bốn góc vuông là hình chữ nhật.', 'Đúng — có một cạnh bên vuông góc với hai đáy, cạnh đó là chiều cao.', 'Sai — bốn cạnh bằng nhau là hình thoi hoặc hình vuông.']),
    Q('Hình thang đáy lớn 12, đáy bé 8, cao 10. S = ?', ['100', '200', '120', '80'], 0, '(12 + 8) × 10 : 2 = 100.', ['Đúng — (12 + 8) × 10 : 2 = 100.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — kết quả không khớp công thức.', 'Sai — em tính thiếu một bước.']),
    Q('Tổng 2 đáy của hình thang là 30 cm, S = 60 cm². Chiều cao?', ['2 cm', '8 cm', '6 cm', '4 cm'], 3, 'h = 2S / (a+b) = 120/30 = 4 cm.', ['Sai — em quên nhân S với 2 trước khi chia.', 'Sai — kết quả không khớp công thức ngược.', 'Sai — em chia chưa đúng, 120 : 30 = 4.', 'Đúng — h = 2 × S : tổng hai đáy = 120 : 30 = 4 cm.']),
  ]),

  M(13, 'Hình tròn — chu vi đường tròn', [
    Q('Đường kính gấp bao nhiêu lần bán kính?', ['2', '3', '4', '1'], 0, 'd = 2r.', ['Đúng — đường kính gấp 2 lần bán kính: d = 2r.', 'Sai — đường kính chỉ gấp 2 lần bán kính.', 'Sai — đường kính chỉ gấp 2 lần bán kính.', 'Sai — nếu bằng nhau thì không gọi là đường kính và bán kính.']),
    Q('Công thức chu vi đường tròn?', ['π × r × r', '2π × d', 'π × d', 'r × r × π'], 2, 'C = d × π = 2 × r × π.', ['Sai — đó là công thức diện tích hình tròn (π × r²).', 'Sai — em nhân thừa, dùng d thì không nhân thêm 2.', 'Đúng — C = π × đường kính = π × d.', 'Sai — đó là công thức diện tích hình tròn.']),
    Q('Đường tròn bán kính 5 cm. Chu vi ≈ ? (π ≈ 3,14)', ['78,5 cm', '10 cm', '31,4 cm', '15,7 cm'], 2, 'C = 2 × 5 × 3,14 = 31,4 cm.', ['Sai — đó là diện tích, đề hỏi chu vi.', 'Sai — đó mới chỉ là đường kính 2r, chưa nhân π.', 'Đúng — C = 2 × 5 × 3,14 = 31,4 cm.', 'Sai — em chỉ nhân r với π mà quên nhân 2.']),
    Q('Đường tròn có d = 10 cm. Chu vi ≈ ?', ['20 cm', '31,4 cm', '78,5 cm', '15,7 cm'], 1, 'C = 10 × 3,14 = 31,4 cm.', ['Sai — em chưa nhân với π.', 'Đúng — có đường kính rồi: C = 10 × 3,14 = 31,4 cm.', 'Sai — đó là diện tích, đề hỏi chu vi.', 'Sai — em nhân nhầm bán kính thay vì đường kính.']),
    Q('Bán kính đường tròn có chu vi 6,28 cm? (π ≈ 3,14)', ['1 cm', '2 cm', '0,5 cm', '3 cm'], 0, 'r = C / (2π) = 6,28 / 6,28 = 1 cm.', ['Đúng — r = C : (2 × π) = 6,28 : 6,28 = 1 cm.', 'Sai — đó là đường kính, đề hỏi bán kính.', 'Sai — em chia thừa thêm một lần nữa.', 'Sai — kết quả không khớp công thức ngược.']),
    Q('π là số gì?', ['Số nguyên', 'Số tự nhiên', 'Phân số', 'Số thập phân vô hạn không tuần hoàn'], 3, 'π ≈ 3,14159265… vô hạn không tuần hoàn.', ['Sai — π có phần thập phân nên không phải số nguyên.', 'Sai — π có phần thập phân nên không phải số tự nhiên.', 'Sai — π không viết được thành phân số đúng.', 'Đúng — π ≈ 3,14159265… là số thập phân vô hạn không tuần hoàn.']),
  ]),

  M(14, 'Diện tích hình tròn', [
    Q('Công thức diện tích hình tròn?', ['π × d × d', '2π × r', 'π × r × r', 'π × d : 2'], 2, 'S = π × r².', ['Sai — diện tích dùng bán kính nhân bán kính, không phải đường kính.', 'Sai — đó là công thức chu vi đường tròn.', 'Đúng — S = π × bán kính × bán kính = π × r².', 'Sai — đó không phải công thức diện tích.']),
    Q('Hình tròn r = 2 cm. S ≈ ? (π ≈ 3,14)', ['4 cm²', '12,56 cm²', '3,14 cm²', '6,28 cm²'], 1, '3,14 × 2 × 2 = 12,56 cm².', ['Sai — em mới tính r × r mà quên nhân π.', 'Đúng — S = 3,14 × 2 × 2 = 12,56 cm².', 'Sai — em quên nhân với r × r.', 'Sai — đó là chu vi, đề hỏi diện tích.']),
    Q('Hình tròn r = 10 cm. S ≈ ?', ['314 cm²', '100 cm²', '31,4 cm²', '62,8 cm²'], 0, '3,14 × 100 = 314 cm².', ['Đúng — S = 3,14 × 10 × 10 = 314 cm².', 'Sai — em mới tính r × r mà quên nhân π.', 'Sai — em quên nhân với r × r.', 'Sai — đó là chu vi, đề hỏi diện tích.']),
    Q('Hình tròn d = 6 cm. S ≈ ?', ['Cả A và B đều đúng', '36π cm²', '28,26 cm²', '9π cm²'], 0, 'r = 3 → S = 3,14 × 9 = 28,26 cm² = 9π.', ['Đúng — r = 3 nên S = 3,14 × 9 = 28,26 cm² = 9π, cả B và C đúng.', 'Sai — em dùng nhầm đường kính làm bán kính, r = 3 mới đúng.', 'Sai — đúng giá trị nhưng còn cách viết 9π cũng đúng.', 'Sai — đúng giá trị nhưng còn cách viết 28,26 cũng đúng.']),
    Q('Hai hình tròn cùng tâm tạo thành hình?', ['Hình thang', 'Hình quạt', 'Hình elip', 'Vành khăn'], 3, 'Phần giữa 2 đường tròn đồng tâm là vành khăn.', ['Sai — hình thang là hình bốn cạnh, không liên quan đường tròn.', 'Sai — hình quạt là một phần cắt từ một hình tròn.', 'Sai — elip là hình bầu dục, không phải hai đường tròn.', 'Đúng — phần giữa hai đường tròn cùng tâm gọi là vành khăn.']),
    Q('S hình tròn r = 5 cm là?', ['15,7 cm²', '25 cm²', '31,4 cm²', '78,5 cm²'], 3, '3,14 × 25 = 78,5 cm².', ['Sai — đó là một nửa chu vi, không phải diện tích.', 'Sai — em mới tính r × r mà quên nhân π.', 'Sai — đó là chu vi, đề hỏi diện tích.', 'Đúng — S = 3,14 × 5 × 5 = 78,5 cm².']),
  ]),

  M(15, 'Tỉ số — Tỉ số phần trăm (%)', [
    Q('Tỉ số phần trăm của 25 và 100 là?', ['4%', '25%', '100%', '0,25%'], 1, '25/100 = 25%.', ['Sai — em chia ngược, 100 : 25 mới ra 4.', 'Đúng — 25 trên 100 chính là 25%.', 'Sai — 100% là khi hai số bằng nhau.', 'Sai — em đặt dư dấu phẩy, 25/100 = 25% chứ không phải 0,25%.']),
    Q('40% viết dưới dạng phân số là?', ['40/100 = 2/5', '4/10', '40', '0,4%'], 0, '40% = 40/100 = 2/5.', ['Đúng — phần trăm là trên 100: 40/100 rút gọn thành 2/5.', 'Sai — 4/10 = 40% nhưng mẫu phải là 100 cho đúng dạng phần trăm.', 'Sai — đó là số 40, không phải phân số.', 'Sai — em viết thừa dấu % và sai giá trị.']),
    Q('0,75 = bao nhiêu %?', ['0,75%', '750%', '75%', '7,5%'], 2, '0,75 = 75/100 = 75%.', ['Sai — em quên nhân với 100 khi đổi sang phần trăm.', 'Sai — em nhân thừa, chỉ nhân 100 thôi.', 'Đúng — 0,75 = 75/100 = 75%.', 'Sai — em dời dấu phẩy thiếu một chỗ.']),
    Q('Lớp có 30 HS, 12 HS giỏi. Tỉ số % HS giỏi?', ['12%', '30%', '40%', '60%'], 2, '12 / 30 × 100 = 40%.', ['Sai — đó là số HS giỏi, chưa tính tỉ số phần trăm.', 'Sai — đó là sĩ số lớp, không phải tỉ số.', 'Đúng — 12 : 30 × 100 = 40%.', 'Sai — em chia ngược 30 cho 12 rồi.']),
    Q('20% của 50 là?', ['20', '2,5', '10', '100'], 2, '50 × 20 / 100 = 10.', ['Sai — đó là 20% viết dưới dạng số, chưa tính của 50.', 'Sai — em chia thừa, kết quả phải là 10.', 'Đúng — 50 × 20 : 100 = 10.', 'Sai — em nhân thẳng 50 với 20 mà quên chia 100.']),
    Q('Tìm 1 số biết 25% của nó là 30', ['120', '60', '7,5', '90'], 0, '30 : 25 × 100 = 120.', ['Đúng — 30 : 25 × 100 = 120.', 'Sai — đó mới là một nửa, em chia chưa đúng.', 'Sai — em lấy 25% của 30 thay vì làm ngược lại.', 'Sai — kết quả không khớp công thức tìm số.']),
  ]),

  M(16, 'Vận tốc — Quãng đường — Thời gian (1)', [
    Q('Công thức tính vận tốc?', ['v = s : t', 'v = s + t', 'v = t : s', 'v = s × t'], 0, 'Vận tốc = quãng đường : thời gian.', ['Đúng — vận tốc = quãng đường : thời gian.', 'Sai — phải chia chứ không cộng.', 'Sai — em chia ngược, phải lấy quãng đường chia thời gian.', 'Sai — đó là công thức tính quãng đường.']),
    Q('Quãng đường 120 km, thời gian 3 giờ. Vận tốc?', ['30 km/h', '4 km/h', '360 km/h', '40 km/h'], 3, '120 : 3 = 40 km/h.', ['Sai — em chia chưa đúng, 120 : 3 = 40.', 'Sai — em chia ngược 3 cho 120 rồi.', 'Sai — đó là phép nhân, vận tốc phải chia.', 'Đúng — v = 120 : 3 = 40 km/h.']),
    Q('Đơn vị vận tốc thông dụng?', ['km + h', 'km/h', 'km × h', 'km − h'], 1, 'km/h = ki-lô-mét trên giờ.', ['Sai — đơn vị vận tốc dùng dấu gạch chéo, không phải dấu cộng.', 'Đúng — km/h nghĩa là ki-lô-mét trên giờ.', 'Sai — đơn vị vận tốc không dùng dấu nhân.', 'Sai — đơn vị vận tốc không dùng dấu trừ.']),
    Q('Đi bộ thường có vận tốc khoảng?', ['100 km/h', '0,5 km/h', '5 km/h', '50 km/h'], 2, 'Người đi bộ ~ 5 km/h.', ['Sai — đó là vận tốc của ô tô chạy nhanh.', 'Sai — quá chậm, người đi bộ nhanh hơn nhiều.', 'Đúng — người đi bộ thường khoảng 5 km/h.', 'Sai — đó là vận tốc của xe máy.']),
    Q('Vận tốc 1 ô tô 60 km/h nghĩa là?', ['Đi được 60 m mỗi giây', 'Đi được 60 km mỗi giờ', 'Đi được 60 km mỗi ngày', 'Đi được 60 km mỗi phút'], 1, '1 giờ đi được 60 km.', ['Sai — đơn vị là km mỗi giờ, không phải m mỗi giây.', 'Đúng — km/h nghĩa là mỗi giờ đi được 60 km.', 'Sai — đơn vị là mỗi giờ, không phải mỗi ngày.', 'Sai — đơn vị là mỗi giờ, không phải mỗi phút.']),
    Q('Đổi 36 km/h ra m/giây?', ['10 m/s', '3,6 m/s', '100 m/s', '36 m/s'], 0, '36 × 1000 / 3600 = 10 m/s.', ['Đúng — 36 × 1000 : 3600 = 10 m/s.', 'Sai — em chia thừa, chia 10 thay vì 3600.', 'Sai — em quên chia cho số giây trong 1 giờ.', 'Sai — đó vẫn là số cũ, em chưa đổi đơn vị.']),
  ]),

  M(17, 'Vận tốc — Quãng đường — Thời gian (2)', [
    Q('Công thức tính quãng đường?', ['s = v : t', 's = v × t', 's = v + t', 's = t : v'], 1, 'Quãng đường = vận tốc × thời gian.', ['Sai — đó là công thức tính vận tốc.', 'Đúng — quãng đường = vận tốc × thời gian.', 'Sai — phải nhân chứ không cộng.', 'Sai — đó không phải công thức quãng đường.']),
    Q('Công thức tính thời gian?', ['t = v − s', 't = s × v', 't = s : v', 't = v + s'], 2, 'Thời gian = quãng đường : vận tốc.', ['Sai — không dùng phép trừ ở đây.', 'Sai — đó là công thức tính quãng đường.', 'Đúng — thời gian = quãng đường : vận tốc.', 'Sai — không dùng phép cộng ở đây.']),
    Q('Vận tốc 50 km/h, thời gian 2 giờ. Quãng đường?', ['52 km', '100 km', '25 km', '52 km/h'], 1, '50 × 2 = 100 km.', ['Sai — em cộng vận tốc với thời gian, phải nhân.', 'Đúng — s = 50 × 2 = 100 km.', 'Sai — em chia thay vì nhân.', 'Sai — quãng đường có đơn vị km, không phải km/h.']),
    Q('Quãng đường 240 km, vận tốc 60 km/h. Thời gian?', ['4 giờ', '14 400 giờ', '6 giờ', '3 giờ'], 0, '240 : 60 = 4 giờ.', ['Đúng — t = 240 : 60 = 4 giờ.', 'Sai — em nhân thay vì chia.', 'Sai — em chia chưa đúng, 240 : 60 = 4.', 'Sai — kết quả không khớp công thức.']),
    Q('Xe máy 40 km/h đi 1 giờ 30 phút. Quãng đường?', ['40 km', '60 km', '30 km', '120 km'], 1, '1 giờ 30 phút = 1,5 giờ; 40 × 1,5 = 60 km.', ['Sai — em mới tính cho 1 giờ, còn thiếu 30 phút.', 'Đúng — đổi 1 giờ 30 phút = 1,5 giờ rồi 40 × 1,5 = 60 km.', 'Sai — em tính nhầm thời gian thành nửa giờ.', 'Sai — em đổi sai, 1 giờ 30 phút là 1,5 giờ không phải 3 giờ.']),
    Q('Đi 3 km với vận tốc 6 km/h. Thời gian?', ['30 phút', '2 giờ', '0,5 giờ', 'Cả A và C đều đúng'], 3, '3 : 6 = 0,5 giờ = 30 phút.', ['Sai — đúng giá trị nhưng còn cách viết 0,5 giờ cũng đúng.', 'Sai — em chia ngược 6 cho 3 rồi.', 'Sai — đúng giá trị nhưng còn cách viết 30 phút cũng đúng.', 'Đúng — 3 : 6 = 0,5 giờ = 30 phút nên cả A và C đúng.']),
  ]),

  M(18, 'Ôn tập học kỳ I', [
    Q('Số thập phân 0,5 = phân số?', ['1/5', '5/100', '1/2', '5/1'], 2, '0,5 = 5/10 = 1/2.', ['Sai — 1/5 = 0,2 chứ không phải 0,5.', 'Sai — đó là 0,05, em đặt thừa một chữ số 0.', 'Đúng — 0,5 = 5/10 = 1/2.', 'Sai — đó là số 5, không phải phân số 0,5.']),
    Q('Diện tích tam giác đáy 8, cao 5 là?', ['40', '20', '13', '4'], 1, '8 × 5 : 2 = 20.', ['Sai — em quên chia 2 nên ra gấp đôi.', 'Đúng — 8 × 5 : 2 = 20.', 'Sai — em cộng đáy với cao thay vì nhân rồi chia 2.', 'Sai — kết quả không khớp công thức.']),
    Q('25% của 200 là?', ['100', '75', '25', '50'], 3, '200 × 25 / 100 = 50.', ['Sai — đó là 50% của 200, không phải 25%.', 'Sai — kết quả không khớp phép tính.', 'Sai — đó là số 25, chưa tính của 200.', 'Đúng — 200 × 25 : 100 = 50.']),
    Q('1 ha = ? m²', ['1 000', '100', '100 000', '10 000'], 3, '1 ha = 10 000 m².', ['Sai — em đếm thiếu một chữ số 0.', 'Sai — đó là 1 dam², ha lớn hơn.', 'Sai — em đếm thừa một chữ số 0.', 'Đúng — 1 ha = 10 000 m².']),
    Q('Chu vi đường tròn d = 4 cm? (π ≈ 3,14)', ['4 cm', '50,24 cm', '6,28 cm', '12,56 cm'], 3, '4 × 3,14 = 12,56 cm.', ['Sai — đó mới là đường kính, em chưa nhân π.', 'Sai — đó là diện tích, đề hỏi chu vi.', 'Sai — em nhân nhầm bán kính thay vì đường kính.', 'Đúng — C = d × π = 4 × 3,14 = 12,56 cm.']),
    Q('Vận tốc 80 km/h trong 0,5 giờ. Quãng đường?', ['80,5 km', '160 km', '40 km', '4 km'], 2, '80 × 0,5 = 40 km.', ['Sai — em cộng vận tốc với thời gian, phải nhân.', 'Sai — em nhân nhầm với 2 thay vì 0,5.', 'Đúng — s = 80 × 0,5 = 40 km.', 'Sai — em đặt sai chỗ dấu phẩy.']),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Hình hộp chữ nhật — diện tích xung quanh, toàn phần', [
    Q('Hình hộp chữ nhật có mấy mặt?', ['4', '6', '5', '8'], 1, 'Có 6 mặt là hình chữ nhật.', ['Sai — em đếm thiếu, hộp có 6 mặt.', 'Đúng — hình hộp chữ nhật có 6 mặt.', 'Sai — em đếm thiếu một mặt.', 'Sai — đó là số đỉnh chứ không phải số mặt.']),
    Q('Số đỉnh của hình hộp chữ nhật?', ['6', '12', '4', '8'], 3, 'Hình hộp chữ nhật có 8 đỉnh.', ['Sai — đó là số mặt, không phải số đỉnh.', 'Sai — đó là số cạnh, không phải số đỉnh.', 'Sai — em đếm thiếu nhiều đỉnh.', 'Đúng — hình hộp chữ nhật có 8 đỉnh.']),
    Q('Diện tích xung quanh = ?', ['a × b × h', '6 × a × b', '(a + b) × 2 × h', 'a + b + h'], 2, 'Sxq = chu vi đáy × chiều cao.', ['Sai — đó là công thức thể tích.', 'Sai — đó không phải công thức diện tích xung quanh.', 'Đúng — Sxq = chu vi đáy × chiều cao = (a + b) × 2 × h.', 'Sai — diện tích không phải phép cộng các kích thước.']),
    Q('Hộp dài 5, rộng 4, cao 3. Sxq = ?', ['60', '120', '54', '47'], 2, '(5+4)×2×3 = 54.', ['Sai — đó là thể tích, đề hỏi diện tích xung quanh.', 'Sai — em nhân thừa một lần.', 'Đúng — Sxq = (5 + 4) × 2 × 3 = 54.', 'Sai — kết quả không khớp công thức.']),
    Q('Diện tích toàn phần = ?', ['Sđáy × 6', '2 × Sxq', 'Sxq + 2 × Sđáy', 'Sxq + Sđáy'], 2, 'Stp = Sxq + 2 đáy.', ['Sai — đó là công thức cho hình lập phương, không phải hộp chữ nhật.', 'Sai — không phải gấp đôi diện tích xung quanh.', 'Đúng — Stp = Sxq + 2 × diện tích đáy.', 'Sai — em quên hộp có 2 đáy nên phải cộng 2 lần.']),
    Q('Hộp 5 × 4 × 3. Stp = ?', ['120', '94', '74', '54'], 1, 'Sxq = 54; Sđáy = 20; Stp = 54 + 2×20 = 94.', ['Sai — đó là thể tích, đề hỏi diện tích toàn phần.', 'Đúng — Sxq = 54, hai đáy 2 × 20 = 40 → Stp = 94.', 'Sai — em chỉ cộng một đáy thay vì hai.', 'Sai — đó mới là diện tích xung quanh, chưa cộng hai đáy.']),
  ]),

  M(20, 'Thể tích — đơn vị đo thể tích', [
    Q('Đơn vị đo thể tích cơ bản?', ['m² (mét vuông)', 'dm (đề-xi-mét)', 'cm² (xăng-ti-mét vuông)', 'm³'], 3, 'Thể tích dùng đơn vị mét khối (m³).', ['Sai — mét vuông là đơn vị diện tích.', 'Sai — đề-xi-mét là đơn vị độ dài.', 'Sai — xăng-ti-mét vuông là đơn vị diện tích.', 'Đúng — thể tích dùng đơn vị mét khối (m³).']),
    Q('1 dm³ bằng?', ['100 lít', '0,1 lít', '1 lít', '10 lít'], 2, '1 dm³ = 1 lít.', ['Sai — em đếm thừa, 1 dm³ chỉ bằng 1 lít.', 'Sai — quá nhỏ, 1 dm³ đúng bằng 1 lít.', 'Đúng — 1 dm³ = 1 lít.', 'Sai — em nhân thừa, 1 dm³ bằng đúng 1 lít.']),
    Q('1 m³ bằng bao nhiêu dm³?', ['10', '1 000', '100', '10 000'], 1, '1 m³ = 1 000 dm³.', ['Sai — đơn vị thể tích hơn kém nhau 1 000 lần.', 'Đúng — hai đơn vị thể tích liền nhau hơn kém 1 000 lần: 1 m³ = 1 000 dm³.', 'Sai — đó là quan hệ của đơn vị diện tích.', 'Sai — em đếm thừa một chữ số 0.']),
    Q('1 m³ bằng bao nhiêu cm³?', ['1 000', '100', '10 000', '1 000 000'], 3, '1 m³ = 1 000 000 cm³.', ['Sai — đó là số dm³, em nhảy thiếu một bậc.', 'Sai — quá nhỏ so với thực tế.', 'Sai — em đếm thiếu nhiều chữ số 0.', 'Đúng — 1 m³ = 1 000 000 cm³.']),
    Q('Thể tích hình hộp chữ nhật?', ['2 × (a + b + c)', 'a + b + c', '(a+b) × c', 'a × b × c'], 3, 'V = dài × rộng × cao.', ['Sai — đó không phải công thức thể tích.', 'Sai — thể tích phải nhân ba kích thước, không cộng.', 'Sai — em thiếu một kích thước trong tích.', 'Đúng — V = dài × rộng × cao = a × b × c.']),
    Q('Hộp 5 × 4 × 3. V = ?', ['94', '12', '60', '47'], 2, '5 × 4 × 3 = 60.', ['Sai — đó là diện tích toàn phần, đề hỏi thể tích.', 'Sai — em cộng các kích thước thay vì nhân.', 'Đúng — V = 5 × 4 × 3 = 60.', 'Sai — kết quả không khớp công thức.']),
  ]),

  M(21, 'Thể tích hình lập phương', [
    Q('Hình lập phương có 6 mặt là?', ['Hình thoi', 'Hình vuông', 'Hình tròn', 'Hình chữ nhật'], 1, '6 mặt đều là hình vuông bằng nhau.', ['Sai — các mặt là hình vuông, không phải hình thoi.', 'Đúng — 6 mặt đều là hình vuông bằng nhau.', 'Sai — mặt phẳng của hình lập phương không phải hình tròn.', 'Sai — đó là hình hộp chữ nhật, lập phương có mặt vuông.']),
    Q('Thể tích hình lập phương cạnh a?', ['a × a × a', '4 × a', 'a × a × 6', 'a + a + a'], 0, 'V = a³.', ['Đúng — V = cạnh × cạnh × cạnh = a³.', 'Sai — đó không phải công thức thể tích.', 'Sai — đó liên quan đến diện tích toàn phần.', 'Sai — thể tích phải nhân ba cạnh, không cộng.']),
    Q('Hình lập phương cạnh 3 cm. V = ?', ['12 cm³', '18 cm³', '27 cm³', '9 cm³'], 2, '3 × 3 × 3 = 27 cm³.', ['Sai — em tính nhầm, phải nhân ba lần.', 'Sai — kết quả không khớp a × a × a.', 'Đúng — V = 3 × 3 × 3 = 27 cm³.', 'Sai — đó mới là 3 × 3, còn thiếu một lần nhân.']),
    Q('Hình lập phương cạnh 5 cm. Diện tích toàn phần?', ['25', '125', '100', '150'], 3, 'Mỗi mặt 25; 6 × 25 = 150 cm².', ['Sai — đó mới là diện tích một mặt, còn 6 mặt.', 'Sai — đó là thể tích, đề hỏi diện tích toàn phần.', 'Sai — em mới tính 4 mặt thay vì 6.', 'Đúng — mỗi mặt 25, có 6 mặt: 6 × 25 = 150 cm².']),
    Q('Cạnh hình lập phương có V = 64 cm³?', ['2 cm', '8 cm', '4 cm', '16 cm'], 2, '4 × 4 × 4 = 64.', ['Sai — 2 × 2 × 2 = 8, chưa tới 64.', 'Sai — 8 × 8 × 8 quá lớn so với 64.', 'Đúng — 4 × 4 × 4 = 64 nên cạnh là 4 cm.', 'Sai — em chia 64 cho 4 chứ chưa tìm số nhân ba lần.']),
    Q('1 thùng lập phương cạnh 1 m chứa bao nhiêu lít nước?', ['10 000', '1 000', '100', '10'], 1, '1 m³ = 1 000 dm³ = 1 000 lít.', ['Sai — em đếm thừa một chữ số 0.', 'Đúng — 1 m³ = 1 000 dm³ = 1 000 lít.', 'Sai — em đếm thiếu chữ số 0.', 'Sai — quá nhỏ, 1 m³ chứa tới 1 000 lít.']),
  ]),

  M(22, 'Ôn nhẹ sau Tết — Số đo thời gian', [
    Q('1 giờ = ? phút', ['600', '100', '60', '24'], 2, '1 giờ = 60 phút.', ['Sai — em đếm thừa một chữ số 0.', 'Sai — 1 giờ không phải 100 phút.', 'Đúng — 1 giờ = 60 phút.', 'Sai — đó là số giờ trong 1 ngày.']),
    Q('1 phút = ? giây', ['24', '100', '60', '10'], 2, '1 phút = 60 giây.', ['Sai — đó là số giờ trong 1 ngày.', 'Sai — 1 phút không phải 100 giây.', 'Đúng — 1 phút = 60 giây.', 'Sai — quá ít, 1 phút có tới 60 giây.']),
    Q('1 ngày = ? giờ', ['24', '60', '7', '12'], 0, '1 ngày = 24 giờ.', ['Đúng — 1 ngày = 24 giờ.', 'Sai — đó là số phút trong 1 giờ.', 'Sai — đó là số ngày trong 1 tuần.', 'Sai — đó mới là nửa ngày.']),
    Q('1 thế kỉ = ? năm', ['1 000', '10', '50', '100'], 3, '1 thế kỉ = 100 năm.', ['Sai — đó là 1 thiên niên kỉ.', 'Sai — đó là 1 thập kỉ.', 'Sai — đó mới là nửa thế kỉ.', 'Đúng — 1 thế kỉ = 100 năm.']),
    Q('2 giờ 30 phút = ? phút', ['60', '150', '90', '230'], 1, '2 × 60 + 30 = 150 phút.', ['Sai — em mới đổi 1 giờ, còn thiếu phần còn lại.', 'Đúng — 2 × 60 + 30 = 150 phút.', 'Sai — em quên cộng thêm 30 phút.', 'Sai — em ghép số chứ chưa đổi 2 giờ ra phút.']),
    Q('Năm 2025 thuộc thế kỉ thứ?', ['Thế kỉ XXV', 'Thế kỉ XX', 'XXI', 'Thế kỉ XXII'], 2, 'Năm 2001–2100 thuộc thế kỉ XXI.', ['Sai — đó là thế kỉ 25, quá xa.', 'Sai — thế kỉ XX là năm 1901–2000.', 'Đúng — năm 2001–2100 thuộc thế kỉ XXI.', 'Sai — thế kỉ XXII bắt đầu từ năm 2101.']),
  ]),

  M(23, 'Cộng trừ số đo thời gian', [
    Q('2 giờ 15 phút + 1 giờ 30 phút = ?', ['3 giờ 45 phút', '3 giờ 5 phút', '3 giờ 15 phút', '4 giờ 45 phút'], 0, 'Cộng giờ + giờ, phút + phút.', ['Đúng — 2+1 = 3 giờ và 15+30 = 45 phút → 3 giờ 45 phút.', 'Sai — em cộng phút chưa đúng, 15 + 30 = 45.', 'Sai — em quên cộng phần phút.', 'Sai — em cộng giờ chưa đúng, 2 + 1 = 3.']),
    Q('5 giờ 20 phút − 2 giờ 10 phút = ?', ['7 giờ 30 phút', '3 giờ 10 phút', '3 giờ 30 phút', '2 giờ 10 phút'], 1, '5−2 = 3 giờ; 20−10 = 10 phút.', ['Sai — đây là phép trừ, em lại đi cộng.', 'Đúng — 5−2 = 3 giờ và 20−10 = 10 phút → 3 giờ 10 phút.', 'Sai — em trừ phút chưa đúng, 20 − 10 = 10.', 'Sai — em trừ giờ chưa đúng, 5 − 2 = 3.']),
    Q('3 giờ 45 phút + 1 giờ 30 phút = ?', ['4 giờ 15 phút', '4 giờ 75 phút', '5 giờ 15 phút', '5 giờ 75 phút'], 2, '75 phút = 1 giờ 15 phút → 5 giờ 15 phút.', ['Sai — em quên đổi 75 phút thành 1 giờ 15 phút.', 'Sai — phút không được vượt 60, phải đổi 75 phút thành giờ.', 'Đúng — 45+30 = 75 phút = 1 giờ 15 phút, cộng vào 4 giờ → 5 giờ 15 phút.', 'Sai — em đã đổi giờ nhưng quên đổi luôn phần phút.']),
    Q('4 giờ 5 phút − 1 giờ 30 phút = ?', ['2 giờ 25 phút', '3 giờ 35 phút', '2 giờ 35 phút', '3 giờ 25 phút'], 2, 'Mượn 1 giờ = 60 phút: 3 giờ 65 phút − 1 giờ 30 phút = 2 giờ 35 phút.', ['Sai — em mượn giờ nhưng tính phút chưa đúng.', 'Sai — em chưa mượn 1 giờ nên phần giờ sai.', 'Đúng — mượn 1 giờ thành 65 phút: 3 giờ 65 phút − 1 giờ 30 phút = 2 giờ 35 phút.', 'Sai — em quên mượn giờ khi phút bị thiếu.']),
    Q('2 giờ 30 phút × 2 = ?', ['4 giờ 60 phút', '5 giờ', '4 giờ', '4 giờ 30 phút'], 1, '2×2 = 4 giờ; 30×2 = 60 phút = 1 giờ → 5 giờ.', ['Sai — 60 phút phải đổi thành 1 giờ, viết gọn là 5 giờ.', 'Đúng — 2×2 = 4 giờ và 30×2 = 60 phút = 1 giờ → 5 giờ.', 'Sai — em quên nhân phần phút.', 'Sai — em chỉ nhân phần giờ với 2, còn phút thì không.']),
    Q('6 giờ 40 phút : 2 = ?', ['4 giờ 20 phút', '3 giờ 20 phút', '3 giờ 40 phút', '3 giờ 30 phút'], 1, '6:2 = 3 giờ; 40:2 = 20 phút.', ['Sai — em chia giờ chưa đúng, 6 : 2 = 3.', 'Đúng — 6:2 = 3 giờ và 40:2 = 20 phút → 3 giờ 20 phút.', 'Sai — em quên chia phần phút.', 'Sai — em chia phút chưa đúng, 40 : 2 = 20.']),
  ]),

  M(24, 'Toán chuyển động đều — 2 vật ngược chiều', [
    Q('2 vật chuyển động ngược chiều, vận tốc gặp nhau = ?', ['v1 − v2', 'v1 × v2', 'v1 : v2', 'v1 + v2'], 3, 'Ngược chiều: cộng 2 vận tốc.', ['Sai — đó là trường hợp cùng chiều (lấy hiệu).', 'Sai — không nhân hai vận tốc với nhau.', 'Sai — không chia hai vận tốc với nhau.', 'Đúng — ngược chiều thì cộng hai vận tốc.']),
    Q('A 40 km/h, B 60 km/h cách nhau 200 km đi ngược chiều. Thời gian gặp?', ['4 giờ', '5 giờ', '1 giờ', '2 giờ'], 3, '200 : (40+60) = 2 giờ.', ['Sai — em dùng nhầm hiệu vận tốc thay vì tổng.', 'Sai — kết quả không khớp công thức.', 'Sai — em chia chưa đúng, 200 : 100 = 2.', 'Đúng — 200 : (40 + 60) = 200 : 100 = 2 giờ.']),
    Q('2 xe đi ngược chiều, v tổng 80 km/h, gặp nhau sau 1,5 giờ. Khoảng cách ban đầu?', ['80 km', '120 km', '40 km', '160 km'], 1, '80 × 1,5 = 120 km.', ['Sai — em mới tính cho 1 giờ, còn thiếu 0,5 giờ.', 'Đúng — s = vận tốc tổng × thời gian = 80 × 1,5 = 120 km.', 'Sai — em tính nhầm thời gian thành nửa giờ.', 'Sai — em nhân nhầm với 2 thay vì 1,5.']),
    Q('Người 1 đi 5 km/h, người 2 đi 3 km/h ngược chiều, cách 16 km. Gặp sau?', ['3 giờ', '4 giờ', '2 giờ', '8 giờ'], 2, '16 : 8 = 2 giờ.', ['Sai — kết quả không khớp 16 : tổng vận tốc.', 'Sai — em tính tổng vận tốc chưa đúng.', 'Đúng — tổng vận tốc 5 + 3 = 8, thời gian = 16 : 8 = 2 giờ.', 'Sai — em dùng nhầm một vận tốc thay vì tổng.']),
    Q('Hai ô tô khởi hành cùng lúc từ 2 đầu đường dài 270 km, đi ngược chiều, v lần lượt 60 và 75 km/h. Gặp sau?', ['4 giờ', '1,5 giờ', '3 giờ', '2 giờ'], 3, '270 : 135 = 2 giờ.', ['Sai — kết quả không khớp công thức.', 'Sai — em tính tổng vận tốc chưa đúng.', 'Sai — em chia chưa đúng, 270 : 135 = 2.', 'Đúng — tổng vận tốc 60 + 75 = 135, thời gian = 270 : 135 = 2 giờ.']),
    Q('Vận tốc tổng càng lớn thì thời gian gặp nhau?', ['Càng nhỏ', 'Càng lớn', 'Bằng 0', 'Không đổi'], 0, 't = s : (v1+v2), v tổng lớn → t nhỏ.', ['Đúng — thời gian = quãng đường : vận tốc tổng nên tổng lớn thì thời gian nhỏ.', 'Sai — vận tốc tổng lớn thì gặp nhanh hơn, thời gian nhỏ đi.', 'Sai — thời gian không thể bằng 0 khi hai xe còn cách nhau.', 'Sai — thời gian thay đổi theo vận tốc tổng.']),
  ]),

  M(25, 'Toán chuyển động đều — 2 vật cùng chiều', [
    Q('2 vật cùng chiều, vận tốc đuổi kịp = ?', ['v1 : v2', '|v1 − v2|', 'v1 + v2', 'v1 × v2'], 1, 'Cùng chiều: hiệu 2 vận tốc.', ['Sai — không chia hai vận tốc với nhau.', 'Đúng — cùng chiều thì lấy hiệu hai vận tốc.', 'Sai — đó là trường hợp ngược chiều (lấy tổng).', 'Sai — không nhân hai vận tốc với nhau.']),
    Q('A đi 50 km/h, B đi 30 km/h cùng chiều, cách 40 km. A đuổi kịp B sau?', ['1 giờ', '4 giờ', '2 giờ', '5 giờ'], 2, '40 : (50−30) = 2 giờ.', ['Sai — kết quả không khớp công thức.', 'Sai — em dùng nhầm tổng vận tốc thay vì hiệu.', 'Đúng — hiệu vận tốc 50 − 30 = 20, thời gian = 40 : 20 = 2 giờ.', 'Sai — kết quả không khớp công thức.']),
    Q('Xe đạp 12 km/h, người đi bộ 4 km/h cùng chiều cách nhau 16 km. Xe đạp đuổi kịp sau?', ['4 giờ', '2 giờ', '8 giờ', '1 giờ'], 1, '16 : 8 = 2 giờ.', ['Sai — kết quả không khớp công thức.', 'Đúng — hiệu vận tốc 12 − 4 = 8, thời gian = 16 : 8 = 2 giờ.', 'Sai — em dùng nhầm một vận tốc thay vì hiệu.', 'Sai — em tính hiệu vận tốc chưa đúng.']),
    Q('Hai xe cách 20 km, v1 = 40, v2 = 30 km/h cùng chiều. Đuổi kịp sau?', ['2 giờ', '1 giờ', '4 giờ', '0,5 giờ'], 0, '20 : 10 = 2 giờ.', ['Đúng — hiệu vận tốc 40 − 30 = 10, thời gian = 20 : 10 = 2 giờ.', 'Sai — em chia chưa đúng, 20 : 10 = 2.', 'Sai — em tính hiệu vận tốc chưa đúng.', 'Sai — kết quả quá nhỏ so với công thức.']),
    Q('Nếu 2 vật cùng vận tốc và cùng chiều thì?', ['Càng xa dần', 'Đuổi kịp sau 1 giờ', 'Không bao giờ đuổi kịp', 'Đuổi kịp ngay'], 2, 'Hiệu vận tốc = 0 nên không đuổi kịp.', ['Sai — cùng vận tốc thì khoảng cách giữ nguyên, không xa dần.', 'Sai — hiệu vận tốc bằng 0 nên không bao giờ đuổi kịp.', 'Đúng — hiệu vận tốc bằng 0 nên không bao giờ đuổi kịp.', 'Sai — hai vật còn cách nhau nên không thể kịp ngay.']),
    Q('Khoảng cách 24 km, v hiệu 8 km/h. Đuổi kịp sau?', ['8 giờ', '4 giờ', '3 giờ', '2 giờ'], 2, '24 : 8 = 3 giờ.', ['Sai — em lấy hiệu vận tốc làm đáp số.', 'Sai — kết quả không khớp 24 : 8.', 'Đúng — thời gian = 24 : 8 = 3 giờ.', 'Sai — em chia chưa đúng, 24 : 8 = 3.']),
  ]),

  M(26, 'Toán tỉ lệ thuận', [
    Q('2 đại lượng tỉ lệ thuận: khi cái này gấp đôi thì cái kia?', ['Gấp đôi', 'Giảm 1 nửa', 'Không đổi', 'Gấp 4'], 0, 'Tỉ lệ thuận: cùng tăng, cùng giảm theo tỉ số.', ['Đúng — tỉ lệ thuận: cái này gấp đôi thì cái kia cũng gấp đôi.', 'Sai — giảm đi là tỉ lệ nghịch, không phải tỉ lệ thuận.', 'Sai — tỉ lệ thuận thì hai đại lượng cùng thay đổi.', 'Sai — gấp đôi chỉ làm cái kia gấp đôi, không gấp 4.']),
    Q('5 kg gạo giá 75 000 đ. 10 kg giá?', ['7 500 đ', '150 000 đ', '75 000 đ', '100 000 đ'], 1, '10 kg gấp đôi 5 kg → 150 000 đ.', ['Sai — em chia thay vì nhân, gạo nhiều thì tiền nhiều hơn.', 'Đúng — 10 kg gấp đôi 5 kg nên giá gấp đôi = 150 000 đ.', 'Sai — đó là giá của 5 kg, chưa tính cho 10 kg.', 'Sai — kết quả không khớp tỉ lệ thuận.']),
    Q('1 giờ làm 30 sản phẩm. 5 giờ làm bao nhiêu?', ['30', '120', '60', '150'], 3, '30 × 5 = 150 sản phẩm.', ['Sai — đó là số làm trong 1 giờ, chưa nhân 5.', 'Sai — em nhân chưa đúng, 30 × 5 = 150.', 'Sai — đó mới là 2 giờ.', 'Đúng — 30 × 5 = 150 sản phẩm.']),
    Q('3 m vải may được 2 áo. 9 m vải may được?', ['6 áo', '12 áo', '3 áo', '4 áo'], 0, '9 m gấp 3 lần 3 m → 6 áo.', ['Đúng — 9 m gấp 3 lần 3 m nên may được 2 × 3 = 6 áo.', 'Sai — em nhân nhầm vải với số áo.', 'Sai — em tính sai số lần gấp.', 'Sai — kết quả không khớp tỉ lệ thuận.']),
    Q('Mua 4 quyển vở hết 24 000 đ. 7 quyển hết?', ['14 000', '42 000', '28 000', '60 000'], 1, '24 000 : 4 × 7 = 42 000 đ.', ['Sai — em tính giá 1 quyển chưa đúng.', 'Đúng — 1 quyển 6 000 đ, 7 quyển = 6 000 × 7 = 42 000 đ.', 'Sai — đó mới là giá của một số quyển khác.', 'Sai — kết quả quá lớn so với giá mỗi quyển.']),
    Q('Tỉ lệ thuận thường giải bằng phương pháp nào?', ['Cộng số', 'Rút về đơn vị', 'Tìm tỉ số phần trăm', 'So sánh'], 1, 'Tìm giá trị 1 đơn vị rồi nhân lên.', ['Sai — bài tỉ lệ không giải bằng cách cộng.', 'Đúng — tìm giá trị của 1 đơn vị rồi nhân lên (rút về đơn vị).', 'Sai — đó là dạng bài phần trăm khác.', 'Sai — chỉ so sánh thôi thì không ra đáp số.']),
  ]),

  M(27, 'Toán tỉ lệ nghịch', [
    Q('2 đại lượng tỉ lệ nghịch: khi cái này gấp đôi thì cái kia?', ['Không đổi', 'Bằng 0', 'Giảm 1 nửa', 'Gấp đôi'], 2, 'Tỉ lệ nghịch: tăng thì giảm và ngược lại.', ['Sai — tỉ lệ nghịch thì cái kia phải thay đổi.', 'Sai — cái kia giảm còn một nửa chứ không về 0.', 'Đúng — tỉ lệ nghịch: cái này gấp đôi thì cái kia giảm còn một nửa.', 'Sai — cùng gấp đôi là tỉ lệ thuận, không phải nghịch.']),
    Q('4 người làm xong việc trong 6 ngày. 8 người làm xong trong?', ['6 ngày', '12 ngày', '2 ngày', '3 ngày'], 3, '8 người gấp đôi → thời gian còn 1 nửa = 3 ngày.', ['Sai — thêm người thì làm nhanh hơn, ngày phải ít đi.', 'Sai — em làm ngược, nhiều người thì nhanh hơn.', 'Sai — em chia chưa đúng, một nửa của 6 là 3.', 'Đúng — 8 người gấp đôi nên thời gian còn một nửa = 3 ngày.']),
    Q('Vận tốc gấp 2, thời gian đi hết quãng đường?', ['Gấp đôi', 'Giảm còn 1/4', 'Không đổi', 'Giảm 1 nửa'], 3, 's không đổi → v gấp 2 thì t giảm 1 nửa.', ['Sai — đi nhanh hơn thì thời gian ít đi, không gấp đôi.', 'Sai — vận tốc gấp 2 thì thời gian chỉ còn một nửa.', 'Sai — đi nhanh hơn thì thời gian phải thay đổi.', 'Đúng — quãng đường không đổi, vận tốc gấp 2 thì thời gian còn một nửa.']),
    Q('20 con bò ăn hết 1 đống cỏ trong 30 ngày. 60 con ăn trong?', ['60 ngày', '10 ngày', '20 ngày', '90 ngày'], 1, '60 con gấp 3 → thời gian còn 1/3 × 30 = 10 ngày.', ['Sai — nhiều bò hơn thì ăn nhanh hơn, ngày phải ít đi.', 'Đúng — 60 con gấp 3 lần nên thời gian còn 1/3 × 30 = 10 ngày.', 'Sai — em chia chưa đúng số lần gấp.', 'Sai — em làm ngược, nhiều bò thì hết cỏ nhanh hơn.']),
    Q('Đại lượng nào là tỉ lệ nghịch?', ['Quãng đường và thời gian (v cố định)', 'Số người làm và thời gian hoàn thành', 'Số kg và giá tiền', 'Số vở và tiền'], 1, 'Càng nhiều người, thời gian càng ngắn.', ['Sai — vận tốc cố định thì quãng đường và thời gian cùng tăng (tỉ lệ thuận).', 'Đúng — càng nhiều người làm thì thời gian càng ngắn (tỉ lệ nghịch).', 'Sai — mua nhiều kg thì trả nhiều tiền (tỉ lệ thuận).', 'Sai — mua nhiều vở thì trả nhiều tiền (tỉ lệ thuận).']),
    Q('12 công nhân làm 1 việc trong 8 ngày. Muốn xong trong 6 ngày cần?', ['14 công nhân', '24 công nhân', '16 công nhân', '9 công nhân'], 2, '12 × 8 = 96; 96 : 6 = 16 công nhân.', ['Sai — kết quả không khớp công thức tỉ lệ nghịch.', 'Sai — em nhân thừa, cần ít người hơn thế.', 'Đúng — tổng công 12 × 8 = 96, chia 6 ngày = 16 công nhân.', 'Sai — muốn xong sớm hơn thì cần thêm người, không bớt đi.']),
  ]),

  M(28, 'Biểu đồ hình quạt', [
    Q('Biểu đồ hình quạt dùng để biểu diễn?', ['So sánh chiều cao', 'Vẽ đường tròn', 'Sự thay đổi theo thời gian', 'Tỉ lệ phần trăm trong tổng thể'], 3, 'Biểu đồ quạt hiển thị tỉ lệ % các phần.', ['Sai — so sánh chiều cao là biểu đồ cột.', 'Sai — đó chỉ là hình vẽ, không phải mục đích của biểu đồ.', 'Sai — thay đổi theo thời gian thường dùng biểu đồ đường.', 'Đúng — biểu đồ quạt cho thấy tỉ lệ phần trăm của các phần trong tổng thể.']),
    Q('Tổng các phần của biểu đồ hình quạt bằng?', ['180%', '100%', '50%', '360%'], 1, 'Tổng các phần = 100%.', ['Sai — đó là số đo nửa đường tròn, không phải phần trăm.', 'Đúng — các phần cộng lại bằng 100%.', 'Sai — đó mới là một nửa, chưa đủ tổng thể.', 'Sai — 360 là số độ của cả vòng tròn, còn phần trăm là 100%.']),
    Q('Hình quạt chiếm 1/4 đường tròn ứng với?', ['10%', '75%', '50%', '25%'], 3, '1/4 = 25%.', ['Sai — 1/4 không phải 10%.', 'Sai — đó là 3/4, không phải 1/4.', 'Sai — đó là 1/2, không phải 1/4.', 'Đúng — 1/4 = 25%.']),
    Q('Lớp có 40 HS. Biểu đồ cho biết 50% giỏi. Số HS giỏi?', ['25', '15', '20', '10'], 2, '40 × 50% = 20.', ['Sai — kết quả không khớp 50% của 40.', 'Sai — em tính phần trăm chưa đúng.', 'Đúng — 40 × 50% = 20 HS giỏi.', 'Sai — đó là 25% của 40, không phải 50%.']),
    Q('Trong biểu đồ quạt, phần lớn nhất ứng với?', ['Tỉ lệ nhỏ nhất', 'Không xác định', 'Trung bình', 'Tỉ lệ lớn nhất'], 3, 'Diện tích phần càng lớn → tỉ lệ càng lớn.', ['Sai — phần lớn ứng với tỉ lệ lớn, không phải nhỏ.', 'Sai — nhìn diện tích phần là biết được tỉ lệ.', 'Sai — phần lớn nhất không phải trung bình.', 'Đúng — phần có diện tích lớn nhất ứng với tỉ lệ lớn nhất.']),
    Q('1 phần biểu đồ quạt chiếm 90°. Tỉ lệ % là?', ['75%', '25%', '10%', '50%'], 1, '90 / 360 = 25%.', ['Sai — đó là phần 270°, không phải 90°.', 'Đúng — 90 : 360 = 1/4 = 25%.', 'Sai — kết quả không khớp 90 : 360.', 'Sai — đó là phần 180°, không phải 90°.']),
  ]),

  M(29, 'Toán % nâng cao — tìm 1 số khi biết %', [
    Q('Biết 40% của số là 24. Số đó là?', ['12', '96', '40', '60'], 3, '24 : 40 × 100 = 60.', ['Sai — kết quả phải lớn hơn 24 vì 40% chưa phải toàn bộ.', 'Sai — em nhân quá nhiều lần.', 'Sai — đó là số phần trăm, không phải số cần tìm.', 'Đúng — 24 : 40 × 100 = 60.']),
    Q('1 cửa hàng bán được 30% số gạo, còn lại 350 kg. Tổng?', ['500 kg', '1 000 kg', '700 kg', '450 kg'], 0, '350 kg = 70%; tổng = 350 : 70 × 100 = 500 kg.', ['Đúng — 350 kg chính là 70% còn lại, tổng = 350 : 70 × 100 = 500 kg.', 'Sai — em tính 350 là 35% nên ra gấp đôi.', 'Sai — em dùng nhầm 50% thay vì 70%.', 'Sai — kết quả không khớp công thức.']),
    Q('25% của số là 50. Số đó?', ['12,5', '150', '200', '100'], 2, '50 : 25 × 100 = 200.', ['Sai — em lấy 25% của 50 thay vì làm ngược lại.', 'Sai — kết quả không khớp công thức.', 'Đúng — 50 : 25 × 100 = 200.', 'Sai — đó mới là 50% của số, không phải 25%.']),
    Q('Mua áo giảm 20% còn 240 000 đ. Giá gốc?', ['260 000', '300 000', '288 000', '320 000'], 1, '240 000 : 80 × 100 = 300 000.', ['Sai — em chỉ cộng thêm 20 000, chưa đúng cách tính.', 'Đúng — còn lại 80% là 240 000 nên giá gốc = 240 000 : 80 × 100 = 300 000.', 'Sai — em cộng thêm 20% của giá đã giảm, sai gốc.', 'Sai — kết quả không khớp công thức.']),
    Q('Lớp 5A có 18 HS nữ chiếm 60%. Tổng HS lớp?', ['30', '24', '35', '25'], 0, '18 : 60 × 100 = 30.', ['Đúng — 18 : 60 × 100 = 30 HS.', 'Sai — em lấy 60% rồi cộng thêm, sai cách.', 'Sai — kết quả không khớp công thức.', 'Sai — kết quả không khớp công thức.']),
    Q('Tiền lãi 15% của vốn là 30 triệu. Vốn?', ['150 triệu', '200 triệu', '450 triệu', '100 triệu'], 1, '30 : 15 × 100 = 200.', ['Sai — kết quả không khớp công thức.', 'Đúng — 30 : 15 × 100 = 200 triệu.', 'Sai — em nhân thừa, kết quả quá lớn.', 'Sai — kết quả không khớp công thức.']),
  ]),

  M(30, 'Ôn tập hình học', [
    Q('Diện tích hình vuông cạnh 5 cm?', ['15', '25', '10', '20'], 1, '5 × 5 = 25 cm².', ['Sai — em cộng cạnh thay vì nhân.', 'Đúng — diện tích hình vuông = cạnh × cạnh = 5 × 5 = 25 cm².', 'Sai — đó là một nửa chu vi, không phải diện tích.', 'Sai — kết quả không khớp cạnh × cạnh.']),
    Q('Chu vi hình chữ nhật dài 6, rộng 4?', ['20', '10', '24', '12'], 0, '(6+4) × 2 = 20.', ['Đúng — chu vi = (dài + rộng) × 2 = (6 + 4) × 2 = 20.', 'Sai — em quên nhân 2, đó mới là nửa chu vi.', 'Sai — đó là diện tích, đề hỏi chu vi.', 'Sai — em chỉ cộng hai chiều dài thay vì cả công thức.']),
    Q('Hình tròn r = 3 cm. C ≈ ? (π ≈ 3,14)', ['6,28 cm', '18,84 cm', '9,42 cm', '28,26 cm'], 1, '2 × 3 × 3,14 = 18,84.', ['Sai — đó là chu vi khi r = 1, em tính nhầm.', 'Đúng — C = 2 × 3 × 3,14 = 18,84 cm.', 'Sai — em chỉ nhân r với π mà quên nhân 2.', 'Sai — đó là diện tích, đề hỏi chu vi.']),
    Q('Tam giác đáy 10, cao 6. Diện tích?', ['30', '60', '16', '20'], 0, '10 × 6 : 2 = 30.', ['Đúng — S = 10 × 6 : 2 = 30.', 'Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — em cộng đáy với cao thay vì nhân rồi chia 2.', 'Sai — kết quả không khớp công thức.']),
    Q('Hình thang 2 đáy 5 và 7, cao 4. S?', ['48', '20', '24', '12'], 2, '(5+7) × 4 : 2 = 24.', ['Sai — em quên chia 2 nên ra gấp đôi.', 'Sai — kết quả không khớp công thức.', 'Đúng — S = (5 + 7) × 4 : 2 = 24.', 'Sai — em tính thiếu một bước.']),
    Q('Hình lập phương cạnh 4. V?', ['48', '12', '64', '16'], 2, '4³ = 64.', ['Sai — kết quả không khớp a × a × a.', 'Sai — em cộng các cạnh thay vì nhân.', 'Đúng — V = 4 × 4 × 4 = 64.', 'Sai — đó mới là 4 × 4, còn thiếu một lần nhân.']),
  ]),

  M(31, 'Ôn tập số đo đại lượng', [
    Q('5 tấn = ? kg', ['500', '50 000', '50', '5 000'], 3, '1 tấn = 1 000 kg.', ['Sai — em đếm thiếu một chữ số 0.', 'Sai — em nhân thừa một chữ số 0.', 'Sai — quá nhỏ, 1 tấn đã bằng 1 000 kg.', 'Đúng — 5 × 1 000 = 5 000 kg.']),
    Q('2,5 km = ? m', ['25', '2 500', '25 000', '250'], 1, '1 km = 1 000 m.', ['Sai — em dời dấu phẩy thiếu nhiều chỗ.', 'Đúng — 2,5 × 1 000 = 2 500 m.', 'Sai — em nhân thừa một chữ số 0.', 'Sai — em đổi thiếu một bậc.']),
    Q('3 m² = ? dm²', ['30', '3 000', '3', '300'], 3, '1 m² = 100 dm².', ['Sai — đơn vị diện tích hơn kém 100 lần, không phải 10.', 'Sai — em nhân thừa một chữ số 0.', 'Sai — em quên đổi đơn vị.', 'Đúng — 3 × 100 = 300 dm².']),
    Q('1,5 giờ = ? phút', ['60', '90', '15', '150'], 1, '1,5 × 60 = 90.', ['Sai — đó mới là 1 giờ, còn thiếu nửa giờ.', 'Đúng — 1,5 × 60 = 90 phút.', 'Sai — quá ít so với 1,5 giờ.', 'Sai — em đặt sai chỗ dấu phẩy.']),
    Q('500 g = ? kg', ['50', '0,5', '5', '0,05'], 1, '500 / 1 000 = 0,5 kg.', ['Sai — em dời dấu phẩy sai chiều.', 'Đúng — 500 : 1 000 = 0,5 kg.', 'Sai — em đổi thiếu, 500 g chưa tới 5 kg.', 'Sai — em dời dấu phẩy thừa một chỗ.']),
    Q('1 lít = ? dm³', ['10', '1 000', '1', '100'], 2, '1 lít = 1 dm³.', ['Sai — 1 lít đúng bằng 1 dm³.', 'Sai — đó là số cm³ trong 1 lít.', 'Đúng — 1 lít = 1 dm³.', 'Sai — em nhân thừa, 1 lít chỉ bằng 1 dm³.']),
  ]),

  M(32, 'Ôn tập 4 phép tính số thập phân', [
    Q('4,5 + 2,75 = ?', ['7,20', '7,75', '6,25', '7,25'], 3, 'Đặt thẳng cột thập phân.', ['Sai — em cộng phần thập phân chưa đúng.', 'Sai — em cộng nhầm phần thập phân.', 'Sai — em cộng phần nguyên chưa đúng.', 'Đúng — viết 4,50 + 2,75 = 7,25.']),
    Q('10 − 3,5 = ?', ['0,5', '7,5', '6,5', '13,5'], 2, '10,0 − 3,5 = 6,5.', ['Sai — em trừ nhầm phần nguyên.', 'Sai — em trừ chưa đúng, kết quả là 6,5.', 'Đúng — 10,0 − 3,5 = 6,5.', 'Sai — đây là phép trừ, em lại đi cộng.']),
    Q('1,2 × 5 = ?', ['7', '60', '0,6', '6'], 3, '1,2 × 5 = 6,0 = 6.', ['Sai — em cộng thay vì nhân.', 'Sai — em quên dấu phẩy, kết quả là 6 chứ không phải 60.', 'Sai — nhân với 5 thì số phải lớn lên, không nhỏ đi.', 'Đúng — 1,2 × 5 = 6,0 = 6.']),
    Q('12,5 : 5 = ?', ['5,2', '0,25', '25', '2,5'], 3, '12,5 : 5 = 2,5.', ['Sai — em viết ngược các chữ số.', 'Sai — kết quả không khớp 12,5 : 5.', 'Sai — em quên mất dấu phẩy.', 'Đúng — 12,5 : 5 = 2,5.']),
    Q('0,8 × 0,5 = ?', ['4', '0,04', '0,13', '0,4'], 3, '8×5 = 40, 2 chữ số TP → 0,40 = 0,4.', ['Sai — em quên hẳn dấu phẩy thập phân.', 'Sai — em đếm thừa một chữ số thập phân.', 'Sai — nhân phân thập phân không phải phép cộng.', 'Đúng — 8 × 5 = 40, hai số đều có 1 chữ số thập phân → 0,40 = 0,4.']),
    Q('7,2 : 0,9 = ?', ['0,8', '80', '8', '6,3'], 2, '72 : 9 = 8.', ['Sai — chia cho số nhỏ hơn 1 thì kết quả lớn lên, không nhỏ đi.', 'Sai — em đặt sai chỗ dấu phẩy.', 'Đúng — bỏ dấu phẩy hai số: 72 : 9 = 8.', 'Sai — đây là phép chia, không phải phép trừ.']),
  ]),

  M(33, 'Toán tổng hợp — chuyển động & tỉ số %', [
    Q('Xe đạp 12 km/h, đi 2 giờ 30 phút được?', ['30 km', '24 km', '36 km', '15 km'], 0, '12 × 2,5 = 30 km.', ['Đúng — đổi 2 giờ 30 phút = 2,5 giờ rồi 12 × 2,5 = 30 km.', 'Sai — em mới tính cho 2 giờ, còn thiếu 30 phút.', 'Sai — em tính nhầm thời gian thành 3 giờ.', 'Sai — em chỉ tính cho 1 giờ 15 phút.']),
    Q('1 kho có 200 tấn thóc, bán 25%. Còn lại?', ['150 tấn', '175 tấn', '50 tấn', '125 tấn'], 0, 'Bán 50, còn 150.', ['Đúng — bán 25% là 50 tấn, còn lại 200 − 50 = 150 tấn.', 'Sai — em tính bán có 25 tấn thôi.', 'Sai — đó là số đã bán, không phải số còn lại.', 'Sai — em tính phần bán chưa đúng.']),
    Q('2 xe ngược chiều cách 300 km, v1 = 50, v2 = 75. Gặp sau?', ['2,4 giờ', '5 giờ', '2 giờ', '3 giờ'], 0, '300 / 125 = 2,4 giờ.', ['Đúng — tổng vận tốc 50 + 75 = 125, thời gian = 300 : 125 = 2,4 giờ.', 'Sai — em dùng nhầm một vận tốc thay vì tổng.', 'Sai — em tính tổng vận tốc chưa đúng.', 'Sai — kết quả không khớp 300 : 125.']),
    Q('Lãi 12% vốn 50 triệu thì lãi?', ['5 triệu', '12 triệu', '6 triệu', '8 triệu'], 2, '50 × 12% = 6.', ['Sai — đó là 10% của vốn, không phải 12%.', 'Sai — đó là số phần trăm, chưa tính của vốn.', 'Đúng — 50 × 12% = 6 triệu.', 'Sai — kết quả không khớp 50 × 12%.']),
    Q('Quãng đường 90 km, thời gian 1,5 giờ. Vận tốc?', ['45 km/h', '75 km/h', '60 km/h', '135 km/h'], 2, '90 : 1,5 = 60 km/h.', ['Sai — em chia nhầm với 2 thay vì 1,5.', 'Sai — kết quả không khớp 90 : 1,5.', 'Đúng — v = 90 : 1,5 = 60 km/h.', 'Sai — em nhân thay vì chia.']),
    Q('30% của 200 cộng 25% của 160 = ?', ['100', '80', '90', '120'], 0, '60 + 40 = 100.', ['Đúng — 30% của 200 = 60, 25% của 160 = 40, cộng lại = 100.', 'Sai — em tính thiếu một phần.', 'Sai — em tính một trong hai phần chưa đúng.', 'Sai — kết quả không khớp tổng hai phần.']),
  ]),

  M(34, 'Ôn cuối cấp — Toán đố tổng hợp', [
    Q('Mảnh vườn HCN dài 30 m, rộng 20 m. S = ?', ['300 m²', '100 m²', '50 m²', '600 m²'], 3, '30 × 20 = 600 m².', ['Sai — em quên một chữ số 0 khi nhân.', 'Sai — kết quả không khớp dài × rộng.', 'Sai — em cộng dài với rộng thay vì nhân.', 'Đúng — diện tích = 30 × 20 = 600 m².']),
    Q('Bể nước hình hộp 2 m × 1,5 m × 1 m. V = ? lít', ['3 000', '30 000', '30', '300'], 0, '3 m³ = 3 000 lít.', ['Đúng — V = 2 × 1,5 × 1 = 3 m³ = 3 000 lít.', 'Sai — em nhân thừa một chữ số 0.', 'Sai — em đổi sai, 1 m³ bằng tận 1 000 lít.', 'Sai — em đổi thiếu một chữ số 0.']),
    Q('Lớp 30 HS, 18 HS đạt giỏi. Tỉ lệ %?', ['60%', '180%', '18%', '30%'], 0, '18/30 = 60%.', ['Đúng — 18 : 30 × 100 = 60%.', 'Sai — em chia ngược 30 cho 18 rồi nhân sai.', 'Sai — đó là số HS giỏi, chưa tính tỉ lệ.', 'Sai — đó là sĩ số lớp, không phải tỉ lệ.']),
    Q('Ô tô đi 3 giờ với v = 55 km/h. Quãng đường?', ['58 km', '180 km', '165 km', '52 km'], 2, '55 × 3 = 165 km.', ['Sai — em cộng vận tốc với thời gian, phải nhân.', 'Sai — kết quả không khớp 55 × 3.', 'Đúng — s = 55 × 3 = 165 km.', 'Sai — em trừ thay vì nhân.']),
    Q('Hình tròn r = 7 cm. S ≈ ? (π ≈ 3,14)', ['49', '153,86', '21,98', '43,96'], 1, '3,14 × 49 = 153,86.', ['Sai — đó mới là r × r, em chưa nhân π.', 'Đúng — S = 3,14 × 7 × 7 = 153,86 cm².', 'Sai — đó là chu vi, đề hỏi diện tích.', 'Sai — em tính nhầm theo đường kính.']),
    Q('Giảm giá 10% trên 500 000 đ. Số tiền giảm?', ['10 000 đ', '5 000 đ', '100 000 đ', '50 000 đ'], 3, '500 000 × 10% = 50 000.', ['Sai — kết quả không khớp 10% của 500 000.', 'Sai — em tính thiếu một chữ số 0.', 'Sai — đó là 20%, không phải 10%.', 'Đúng — 500 000 × 10% = 50 000 đ.']),
  ]),

  M(35, 'Ôn cuối cấp — Tổng hợp Toán 5', [
    Q('Phân số 4/5 viết dưới dạng số thập phân?', ['4,5', '0,45', '0,4', '0,8'], 3, '4 : 5 = 0,8.', ['Sai — em chia chưa đúng, 4 : 5 nhỏ hơn 1.', 'Sai — kết quả không khớp 4 : 5.', 'Sai — 0,4 là 2/5, không phải 4/5.', 'Đúng — 4 chia 5 bằng 0,8.']),
    Q('1 thế kỉ = ? năm', ['10', '1 000', '50', '100'], 3, '1 thế kỉ = 100 năm.', ['Sai — đó là 1 thập kỉ.', 'Sai — đó là 1 thiên niên kỉ.', 'Sai — đó mới là nửa thế kỉ.', 'Đúng — 1 thế kỉ = 100 năm.']),
    Q('2 vòi nước chảy đầy bể: vòi 1 trong 3 giờ, vòi 2 trong 6 giờ. Mở chung đầy bể trong?', ['2 giờ', '9 giờ', '4 giờ', '1,5 giờ'], 0, '1/3 + 1/6 = 1/2 → đầy 1 bể mất 2 giờ.', ['Đúng — mỗi giờ chảy 1/3 + 1/6 = 1/2 bể nên đầy bể mất 2 giờ.', 'Sai — em cộng thời gian hai vòi, mở chung phải nhanh hơn.', 'Sai — mở chung nhanh hơn cả vòi nhanh nhất.', 'Sai — kết quả không khớp phần chảy mỗi giờ.']),
    Q('Hình lập phương cạnh 10 cm. Stp = ?', ['60', '1 000', '600', '100'], 2, '6 × 100 = 600 cm².', ['Sai — em quên nhân diện tích một mặt.', 'Sai — đó là thể tích, đề hỏi diện tích toàn phần.', 'Đúng — mỗi mặt 10 × 10 = 100, có 6 mặt: 6 × 100 = 600 cm².', 'Sai — đó mới là diện tích một mặt, còn 6 mặt.']),
    Q('Một số tăng thêm 25% được 250. Số ban đầu?', ['187,5', '300', '200', '225'], 2, '250 : 125 × 100 = 200.', ['Sai — em lấy 75% thay vì làm ngược lại.', 'Sai — số ban đầu phải nhỏ hơn 250.', 'Đúng — 250 là 125% nên số ban đầu = 250 : 125 × 100 = 200.', 'Sai — em chỉ trừ đi 25 đơn vị, sai cách.']),
    Q('1 năm thường có?', ['365 ngày', '360 ngày', '366 ngày', '350 ngày'], 0, 'Năm thường 365, năm nhuận 366.', ['Đúng — năm thường có 365 ngày.', 'Sai — đó là số làm tròn, năm thường có 365 ngày.', 'Sai — đó là số ngày của năm nhuận.', 'Sai — không có năm nào chỉ 350 ngày.']),
  ]),

  M(36, 'Kết thúc Tiểu học — Hành trang Toán vào Lớp 6', [
    Q('Hình hộp chữ nhật dài 5cm, rộng 4cm, cao 3cm. Thể tích bằng bao nhiêu?', ['12 cm³', '60 cm³', '47 cm³', '120 cm³'], 1, 'V = dài × rộng × cao = 5 × 4 × 3 = 60 cm³.', ['Sai — 12 là tích của rộng và cao, còn thiếu chiều dài.', 'Đúng — 5 × 4 × 3 = 60 cm³.', 'Sai — đây là tổng chứ không phải tích ba kích thước.', 'Sai — 120 là gấp đôi kết quả đúng.']),
    Q('25% của 200 là bao nhiêu?', ['50', '25', '40', '75'], 0, '200 × 25 : 100 = 50.', ['Đúng — 25% của 200 là 200 : 4 = 50.', 'Sai — 25 là tỉ số phần trăm, không phải kết quả.', 'Sai — 40 ứng với 20% của 200.', 'Sai — 75 ứng với 37,5% của 200.']),
    Q('Phân số 3/4 viết dưới dạng số thập phân là?', ['0,34', '0,43', '0,75', '7,5'], 2, '3 : 4 = 0,75.', ['Sai — đây là ghép hai chữ số 3 và 4, không phải phép chia.', 'Sai — đây là ghép hai chữ số theo thứ tự ngược, không phải phép chia.', 'Đúng — 3 : 4 = 0,75.', 'Sai — 7,5 lớn hơn 1, trong khi 3/4 nhỏ hơn 1.']),
    Q('Một ô tô đi 120km trong 2 giờ. Vận tốc trung bình là?', ['240 km/giờ', '120 km/giờ', '30 km/giờ', '60 km/giờ'], 3, 'v = s : t = 120 : 2 = 60 km/giờ.', ['Sai — đó là kết quả của phép nhân, không phải phép chia.', 'Sai — 120km là quãng đường, không phải vận tốc.', 'Sai — 30 km/giờ ứng với 4 giờ đi hết 120km.', 'Đúng — 120 : 2 = 60 km/giờ.']),
    Q('Hình tam giác có đáy 8cm, chiều cao 5cm. Diện tích bằng?', ['40 cm²', '20 cm²', '13 cm²', '26 cm²'], 1, 'S = đáy × chiều cao : 2 = 8 × 5 : 2 = 20 cm².', ['Sai — quên chia cho 2.', 'Đúng — 8 × 5 : 2 = 20 cm².', 'Sai — 13 là tổng đáy và chiều cao.', 'Sai — 26 là chu vi của một hình khác, không liên quan công thức này.']),
    Q('Lên Lớp 6 em sẽ bắt đầu học loại số nào mới?', ['Số nguyên âm', 'Phân số', 'Số thập phân', 'Số tự nhiên'], 0, 'Lớp 6 mở rộng sang số nguyên âm, tỉ lệ thức, biểu thức chứa chữ.', ['Đúng — Lớp 6 em sẽ học số nguyên âm và số nguyên dương.', 'Sai — phân số em đã học từ Lớp 4.', 'Sai — số thập phân em đã học ở Lớp 5.', 'Sai — số tự nhiên em học từ Lớp 1.']),
  ]),
];

export const P5_TOAN_SCENARIOS = indexBy(P5_TOAN_WEEKS);
