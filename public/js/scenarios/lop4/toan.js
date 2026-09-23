// ============================================================
// Lớp 4 · TOÁN — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK GDPT 2018 (3 bộ Cánh Diều / Kết nối / Chân trời).
// ID prefix: "P4-wNN-quiz" → trùng prefix module "P4".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P4', 'toan', n, title, qs, opts);

export const P4_TOAN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Ôn tập về các số đến 100 000', [
    Q('Số bé nhất có 5 chữ số là?', ['10000', '10001', '99999', '11111'], 0, '10 000 là số bé nhất có 5 chữ số.', ['Đúng — 10 000 là số nhỏ nhất gồm 5 chữ số.', 'Sai — 10 001 lớn hơn 10 000 một đơn vị.', 'Sai — 99 999 là số lớn nhất có 5 chữ số.', 'Sai — 11 111 lớn hơn 10 000.']),
    Q('Số lớn nhất có 5 chữ số là?', ['99990', '99999', '10000', '90000'], 1, '99 999 là số lớn nhất có 5 chữ số.', ['Sai — 99 990 còn nhỏ hơn 99 999.', 'Đúng — tất cả 5 chữ số đều là 9 nên lớn nhất.', 'Sai — 10 000 là số nhỏ nhất có 5 chữ số.', 'Sai — 90 000 nhỏ hơn 99 999.']),
    Q('Số liền sau của 9 999 là?', ['9998', '10001', '10000', '99990'], 2, '9 999 + 1 = 10 000.', ['Sai — đó là số liền trước 9 999.', 'Sai — em đã cộng thêm 2, chỉ cộng thêm 1 thôi.', 'Đúng — 9 999 + 1 = 10 000.', 'Sai — 99 990 lớn hơn 9 999 rất nhiều.']),
    Q('Trong số 47 528, chữ số 5 ở hàng nào?', ['Nghìn', 'Trăm', 'Chục nghìn', 'Đơn vị'], 1, '4-vạn 7-nghìn 5-trăm 2-chục 8-đơn vị.', ['Sai — hàng nghìn là chữ số 7.', 'Đúng — 5 đứng ở hàng trăm.', 'Sai — hàng chục nghìn là chữ số 4.', 'Sai — hàng đơn vị là chữ số 8.']),
    Q('Sắp xếp tăng dần: 23 456 ; 23 654 ; 23 465 ; 23 645', ['23 654; 23 645; 23 465; 23 456', '23 456; 23 654; 23 465; 23 645', '23 465; 23 456; 23 645; 23 654', '23 456; 23 465; 23 645; 23 654'], 3, 'So sánh lần lượt từng hàng từ trái sang phải.', ['Sai — đây là thứ tự giảm dần, ngược lại.', 'Sai — chưa so kỹ hàng trăm và hàng chục.', 'Sai — 23 456 phải đứng trước 23 465.', 'Đúng — so từng hàng từ trái sang phải thì đúng thứ tự này.']),
    Q('60 000 + 5 000 = ?', ['650 000', '60 500', '11 000', '65 000'], 3, '6 chục nghìn + 5 nghìn = 65 000.', ['Sai — em viết sai vị trí số 0 rồi.', 'Sai — 5 000 phải cộng vào hàng nghìn, không phải hàng trăm.', 'Sai — em đã cộng nhầm 6 với 5 thành 11.', 'Đúng — 60 000 + 5 000 = 65 000.']),
  ]),

  M(2, 'Biểu thức có chữ', [
    Q('Với a = 5, biểu thức a + 12 có giá trị là?', ['7', '17', '12', '60'], 1, '5 + 12 = 17.', ['Sai — em làm phép trừ rồi, đề là phép cộng.', 'Đúng — thay a = 5 ta được 5 + 12 = 17.', 'Sai — em quên cộng thêm a = 5.', 'Sai — đó là phép nhân 5 × 12, không phải cộng.']),
    Q('Với b = 8, giá trị của 3 × b là?', ['24', '38', '11', '83'], 0, '3 × 8 = 24.', ['Đúng — thay b = 8 ta được 3 × 8 = 24.', 'Sai — em viết 3 và 8 cạnh nhau chứ chưa nhân.', 'Sai — đó là phép cộng 3 + 8, không phải nhân.', 'Sai — em viết ngược thành 83.']),
    Q('Với m = 20, n = 15 thì m − n = ?', ['300', '15', '35', '5'], 3, '20 − 15 = 5.', ['Sai — đó là phép nhân 20 × 15.', 'Sai — đó chính là số n, chưa làm phép trừ.', 'Sai — em cộng hai số rồi, đề là phép trừ.', 'Đúng — 20 − 15 = 5.']),
    Q('Với x = 6, biểu thức 25 − x × 3 = ?', ['7', '57', '13', '15'], 0, '25 − 6 × 3 = 25 − 18 = 7.', ['Đúng — nhân trước: 6 × 3 = 18; rồi 25 − 18 = 7.', 'Sai — em làm trừ trước, phải nhân trước.', 'Sai — em chỉ trừ 6 mà quên nhân với 3.', 'Sai — đó là 6 × 3 = 18 nhưng chưa trừ vào 25... kết quả khác.']),
    Q('Với a = 4 và b = 9, giá trị của a × b là?', ['36', '94', '49', '13'], 0, '4 × 9 = 36.', ['Đúng — 4 × 9 = 36.', 'Sai — em viết 9 và 4 cạnh nhau chứ chưa nhân.', 'Sai — em viết 4 và 9 cạnh nhau chứ chưa nhân.', 'Sai — đó là phép cộng 4 + 9, không phải nhân.']),
    Q('Chu vi hình vuông cạnh a được tính bởi biểu thức?', ['a × 4', 'a × a (nhầm với diện tích)', 'a + a + a + a', 'a × 2 (nhầm 2 cạnh)'], 0, 'Chu vi hình vuông = cạnh × 4.', ['Đúng — chu vi hình vuông bằng cạnh nhân 4.', 'Sai — a × a là diện tích, không phải chu vi.', 'Sai — viết gọn lại thì a + a + a + a chính là a × 4, nên đáp án gọn là a × 4.', 'Sai — hình vuông có 4 cạnh, không phải 2.']),
  ]),

  M(3, 'Hàng và lớp — Lớp triệu', [
    Q('Lớp đơn vị gồm các hàng?', ['Nghìn, chục nghìn, trăm nghìn', 'Đơn vị, chục, trăm', 'Tỉ, chục tỉ, trăm tỉ', 'Triệu, chục triệu, trăm triệu'], 1, 'Lớp đơn vị: hàng đơn vị, chục, trăm.', ['Sai — đó là lớp nghìn.', 'Đúng — lớp đơn vị gồm hàng đơn vị, chục, trăm.', 'Sai — đó là lớp tỉ.', 'Sai — đó là lớp triệu.']),
    Q('Lớp nghìn gồm các hàng?', ['Đơn vị, chục, trăm', 'Tỉ, chục tỉ, trăm tỉ', 'Nghìn, chục nghìn, trăm nghìn', 'Triệu, chục triệu, trăm triệu'], 2, 'Lớp nghìn: nghìn, chục nghìn, trăm nghìn.', ['Sai — đó là lớp đơn vị.', 'Sai — đó là lớp tỉ.', 'Đúng — lớp nghìn gồm hàng nghìn, chục nghìn, trăm nghìn.', 'Sai — đó là lớp triệu.']),
    Q('Số 1 000 000 đọc là?', ['Một triệu', 'Một trăm nghìn', 'Một tỉ', 'Mười nghìn'], 0, '1 000 000 = một triệu.', ['Đúng — 1 000 000 đọc là một triệu.', 'Sai — một trăm nghìn chỉ có 6 chữ số là 100 000.', 'Sai — một tỉ là 1 000 000 000, nhiều số 0 hơn.', 'Sai — mười nghìn chỉ là 10 000.']),
    Q('Trong số 357 246 198, chữ số 5 thuộc hàng?', ['Chục triệu', 'Trăm nghìn', 'Đơn vị triệu', 'Trăm triệu'], 0, 'Đọc từ phải: 1-trăm-9-chục-8-đơn vị, 1-trăm-4-chục-6-nghìn, ... → 5 ở hàng chục triệu.', ['Đúng — tách lớp 357-246-198 thì 5 ở hàng chục triệu.', 'Sai — hàng trăm nghìn là chữ số 2.', 'Sai — hàng đơn vị triệu (hàng triệu) là chữ số 7.', 'Sai — hàng trăm triệu là chữ số 3.']),
    Q('Số nhỏ nhất có 7 chữ số là?', ['1 000 001', '9 999 999', '1 111 111', '1 000 000'], 3, '1 000 000 là số nhỏ nhất có 7 chữ số.', ['Sai — số này lớn hơn 1 000 000.', 'Sai — đó là số lớn nhất có 7 chữ số.', 'Sai — số này lớn hơn 1 000 000.', 'Đúng — 1 theo sau là 6 số 0, nhỏ nhất có 7 chữ số.']),
    Q('Số lớn nhất có 9 chữ số là?', ['100 000 000', '999 999 999', '900 000 000', '999 000 000'], 1, '999 999 999 — chín trăm chín mươi chín triệu...', ['Sai — đó là số nhỏ nhất có 9 chữ số.', 'Đúng — cả 9 chữ số đều là 9 nên lớn nhất.', 'Sai — vẫn còn nhiều hàng bằng 0, chưa lớn nhất.', 'Sai — vẫn còn nhiều hàng bằng 0, chưa lớn nhất.']),
  ]),

  M(4, 'So sánh và xếp thứ tự các số tự nhiên', [
    Q('So sánh: 84 596 ... 84 569', ['Dấu bé hơn (<)', '>', 'Dấu bé hơn hoặc bằng (≤)', 'Không so sánh được'], 1, 'Bốn hàng đầu bằng nhau; hàng chục 9 > 6 → 84 596 > 84 569.', ['Sai — số đầu lớn hơn, không phải bé hơn.', 'Đúng — hàng chục 9 > 6 nên 84 596 > 84 569.', 'Sai — hai số không bằng nhau nên không dùng dấu này.', 'Sai — hai số này so sánh được bình thường.']),
    Q('Số lớn nhất trong: 543 219 ; 534 921 ; 543 291 ; 534 219', ['534 219', '543 291', '534 921', '543 219'], 1, 'So hàng trăm nghìn = 5, chục nghìn 4 vs 3 → 543... lớn hơn; rồi 543 291 > 543 219.', ['Sai — số bắt đầu 534... nhỏ hơn số bắt đầu 543...', 'Đúng — 543 291 lớn nhất vì hàng chục lớn hơn 543 219.', 'Sai — số bắt đầu 534... nhỏ hơn số bắt đầu 543...', 'Sai — 543 219 nhỏ hơn 543 291 ở hàng chục.']),
    Q('Số bé nhất trong: 123 456 ; 132 465 ; 123 465 ; 132 456', ['123 465', '123 456', '132 456', '132 465'], 1, 'Hai số bắt đầu 123... nhỏ hơn 132...; 123 456 < 123 465.', ['Sai — 123 456 còn nhỏ hơn số này ở hàng chục.', 'Đúng — 123 456 nhỏ nhất trong cả bốn số.', 'Sai — số bắt đầu 132... lớn hơn số bắt đầu 123...', 'Sai — số bắt đầu 132... lớn hơn số bắt đầu 123...']),
    Q('Sắp xếp giảm dần: 27 000 ; 7 200 ; 72 000 ; 2 700', ['2 700; 7 200; 27 000; 72 000', '27 000; 72 000; 7 200; 2 700', '72 000; 7 200; 27 000; 2 700', '72 000; 27 000; 7 200; 2 700'], 3, 'Số nhiều chữ số hơn thì lớn hơn; cùng số chữ số thì so từng hàng.', ['Sai — đây là thứ tự tăng dần, ngược lại.', 'Sai — 7 200 phải đứng sau 27 000.', 'Sai — 7 200 phải đứng sau 27 000.', 'Đúng — từ lớn đến bé: 72 000; 27 000; 7 200; 2 700.']),
    Q('Tìm x sao cho 38 000 < x < 38 010 và x là số tròn chục', ['38 020', '38 000', 'Không có số nào', '38 010'], 2, 'Giữa 38 000 và 38 010 không có số tròn chục nào khác.', ['Sai — 38 020 lớn hơn 38 010 nên không nằm giữa.', 'Sai — đề yêu cầu lớn hơn 38 000, không lấy chính nó.', 'Đúng — giữa hai số đó không có số tròn chục nào khác.', 'Sai — đề yêu cầu bé hơn 38 010, không lấy chính nó.']),
    Q('Số liền trước số bé nhất có 6 chữ số là?', ['99 999', '100 001', '999 999', '99 998'], 0, 'Số bé nhất có 6 chữ số là 100 000; liền trước là 99 999.', ['Đúng — số bé nhất có 6 chữ số là 100 000, liền trước là 99 999.', 'Sai — đó là số liền sau 100 000.', 'Sai — đó là số lớn nhất có 6 chữ số.', 'Sai — em đã trừ đi 2, chỉ trừ 1 thôi.']),
  ]),

  M(5, 'Làm tròn số đến chục, trăm, nghìn', [
    Q('Làm tròn 47 đến hàng chục được?', ['47', '100', '50', '40'], 2, 'Chữ số đơn vị 7 ≥ 5 → làm tròn lên 50.', ['Sai — làm tròn phải về số tròn chục.', 'Sai — đó là làm tròn đến hàng trăm.', 'Đúng — đơn vị 7 ≥ 5 nên làm tròn lên 50.', 'Sai — 7 ≥ 5 nên phải làm tròn lên, không xuống.']),
    Q('Làm tròn 432 đến hàng trăm được?', ['430', '500', '400', '440'], 2, 'Chữ số hàng chục 3 < 5 → giữ nguyên 400.', ['Sai — đó là làm tròn đến hàng chục.', 'Sai — hàng chục 3 < 5 nên không làm tròn lên.', 'Đúng — hàng chục 3 < 5 nên giữ ở 400.', 'Sai — đó là làm tròn đến hàng chục.']),
    Q('Làm tròn 5 678 đến hàng nghìn được?', ['5 700', '5 600', '6 000', '5 000'], 2, 'Chữ số hàng trăm 6 ≥ 5 → 6 000.', ['Sai — đó là làm tròn đến hàng trăm.', 'Sai — đó là làm tròn đến hàng trăm.', 'Đúng — hàng trăm 6 ≥ 5 nên làm tròn lên 6 000.', 'Sai — 6 ≥ 5 nên phải làm tròn lên, không xuống.']),
    Q('Làm tròn 12 450 đến hàng nghìn được?', ['12 400', '12 000', '13 000', '12 500'], 1, 'Chữ số hàng trăm 4 < 5 → giữ 12 000.', ['Sai — đó là làm tròn đến hàng trăm.', 'Đúng — hàng trăm 4 < 5 nên giữ ở 12 000.', 'Sai — 4 < 5 nên không làm tròn lên.', 'Sai — đó là làm tròn đến hàng trăm.']),
    Q('Một xã có 8 745 người. Làm tròn đến hàng trăm là?', ['8 700', '9 000', '8 800', '8 000'], 0, 'Chữ số hàng chục 4 < 5 → 8 700.', ['Đúng — hàng chục 4 < 5 nên giữ ở 8 700.', 'Sai — đó là làm tròn đến hàng nghìn.', 'Sai — hàng chục 4 < 5 nên không làm tròn lên.', 'Sai — đó là làm tròn đến hàng nghìn.']),
    Q('Làm tròn 99 đến hàng chục được?', ['90', '99', '110', '100'], 3, '9 ≥ 5 → 100.', ['Sai — đơn vị 9 ≥ 5 nên phải làm tròn lên.', 'Sai — đây là số chưa làm tròn.', 'Sai — làm tròn lên thì 99 thành 100, không phải 110.', 'Đúng — đơn vị 9 ≥ 5 nên làm tròn lên thành 100.']),
  ]),

  M(6, 'Yến · tạ · tấn', [
    Q('1 yến bằng?', ['100 kg', '1 kg', '10 kg', '1 000 kg'], 2, '1 yến = 10 kg.', ['Sai — 100 kg là 1 tạ.', 'Sai — 1 yến lớn hơn 1 kg nhiều.', 'Đúng — 1 yến = 10 kg.', 'Sai — 1 000 kg là 1 tấn.']),
    Q('1 tạ bằng?', ['1 000 kg', '10 yến', '100 kg', '10 kg'], 2, '1 tạ = 100 kg (đồng thời = 10 yến).', ['Sai — 1 000 kg là 1 tấn.', 'Sai — điều này đúng nhưng đề hỏi theo kg.', 'Đúng — 1 tạ = 100 kg.', 'Sai — 10 kg là 1 yến.']),
    Q('1 tấn bằng?', ['10 tạ', 'Cả B và C đều đúng', '100 kg', '1 000 kg'], 1, '1 tấn = 1 000 kg = 10 tạ.', ['Sai — đúng nhưng vẫn còn một đáp án khác cũng đúng.', 'Đúng — 1 tấn vừa bằng 10 tạ vừa bằng 1 000 kg.', 'Sai — 100 kg chỉ là 1 tạ.', 'Sai — đúng nhưng vẫn còn một đáp án khác cũng đúng.']),
    Q('5 yến + 3 yến = ? kg', ['53 kg', '8 kg', '80 kg', '15 kg'], 2, '5 + 3 = 8 yến = 80 kg.', ['Sai — em viết liền 5 và 3, chưa cộng.', 'Sai — đó là 8 yến, đề hỏi đổi ra kg.', 'Đúng — 8 yến = 8 × 10 = 80 kg.', 'Sai — em nhân 5 với 3 rồi, đề là phép cộng.']),
    Q('2 tấn = ? tạ', ['2 000', '200', '20', '2'], 2, '1 tấn = 10 tạ → 2 tấn = 20 tạ.', ['Sai — đó là đổi ra kg.', 'Sai — em đổi ra kg rồi chia sai.', 'Đúng — 1 tấn = 10 tạ nên 2 tấn = 20 tạ.', 'Sai — em quên nhân với 10.']),
    Q('Một xe tải chở 3 tấn gạo và 5 tạ ngô. Tổng khối lượng là?', ['350 kg', '3 500 kg', '3 050 kg', '8 000 kg'], 1, '3 tấn = 3 000 kg; 5 tạ = 500 kg → 3 500 kg.', ['Sai — em đổi sai đơn vị, số quá nhỏ.', 'Đúng — 3 000 kg + 500 kg = 3 500 kg.', 'Sai — 5 tạ là 500 kg, không phải 50 kg.', 'Sai — em cộng nhầm 3 với 5 thành 8 tấn.']),
  ]),

  M(7, 'Giây · phút · thế kỉ', [
    Q('1 phút bằng?', ['10 giây', '60 giây', '100 giây', '6 giây'], 1, '1 phút = 60 giây.', ['Sai — 1 phút nhiều hơn 10 giây.', 'Đúng — 1 phút = 60 giây.', 'Sai — 1 phút chỉ có 60 giây thôi.', 'Sai — 1 phút có tới 60 giây.']),
    Q('1 giờ bằng?', ['60 giây', '60 phút', '24 phút', '100 phút'], 1, '1 giờ = 60 phút.', ['Sai — 60 giây chỉ là 1 phút.', 'Đúng — 1 giờ = 60 phút.', 'Sai — 24 là số giờ trong một ngày, không phải số phút.', 'Sai — 1 giờ chỉ có 60 phút.']),
    Q('1 thế kỉ bằng?', ['50 năm', '10 năm', '100 năm', '1 000 năm'], 2, '1 thế kỉ = 100 năm.', ['Sai — 1 thế kỉ dài hơn 50 năm.', 'Sai — đó chỉ là 1 thập kỉ.', 'Đúng — 1 thế kỉ = 100 năm.', 'Sai — 1 000 năm là 1 thiên niên kỉ.']),
    Q('2 phút 15 giây = ? giây', ['125', '135', '75', '215'], 1, '2 × 60 + 15 = 135 giây.', ['Sai — em đổi 2 phút thành 110 giây là sai.', 'Đúng — 2 × 60 + 15 = 120 + 15 = 135 giây.', 'Sai — em chỉ đổi 1 phút thôi.', 'Sai — em viết liền 2 và 15, chưa đổi ra giây.']),
    Q('Bác Hồ sinh năm 1890. Bác sinh vào thế kỉ thứ?', ['Thế kỉ XVII', 'Thế kỉ XVIII', 'Thế kỉ XX', 'XIX'], 3, 'Thế kỉ XIX = từ năm 1801 đến 1900.', ['Sai — thế kỉ XVII là từ 1601 đến 1700.', 'Sai — thế kỉ XVIII là từ 1701 đến 1800.', 'Sai — thế kỉ XX bắt đầu từ năm 1901.', 'Đúng — năm 1890 thuộc thế kỉ XIX (1801–1900).']),
    Q('Năm 2026 thuộc thế kỉ?', ['Thế kỉ XX', 'Thế kỉ XXII', 'XXI', 'Thế kỉ XIX'], 2, 'Thế kỉ XXI = từ năm 2001 đến 2100.', ['Sai — thế kỉ XX kết thúc năm 2000.', 'Sai — thế kỉ XXII bắt đầu từ năm 2101.', 'Đúng — năm 2026 thuộc thế kỉ XXI (2001–2100).', 'Sai — thế kỉ XIX là từ 1801 đến 1900.']),
  ]),

  M(8, 'Tính chất giao hoán – kết hợp của phép cộng', [
    Q('Tính chất giao hoán của phép cộng nghĩa là?', ['a + 0 = a', 'a − b = b − a', 'a + b + c = (a + b) + c', 'a + b = b + a'], 3, 'Đổi chỗ các số hạng thì tổng không thay đổi.', ['Sai — đó là tính chất cộng với 0.', 'Sai — phép trừ không có tính chất giao hoán.', 'Sai — đó là tính chất kết hợp.', 'Đúng — đổi chỗ số hạng thì tổng không đổi: a + b = b + a.']),
    Q('Tính chất kết hợp của phép cộng?', ['a + 0 = a', '(a + b) + c = a + (b + c)', 'a × (b + c) = a × b + a × c', 'a + b = b + a'], 1, 'Khi cộng nhiều số có thể nhóm bất kỳ hai số nào lại.', ['Sai — đó là tính chất cộng với 0.', 'Đúng — có thể nhóm các số hạng khác nhau, tổng vẫn bằng.', 'Sai — đó là tính chất nhân một số với một tổng.', 'Sai — đó là tính chất giao hoán.']),
    Q('Tính nhanh: 25 + 47 + 75 = ?', ['120', '157', '125', '147'], 3, '(25 + 75) + 47 = 100 + 47 = 147.', ['Sai — em quên cộng số 47.', 'Sai — em cộng thừa rồi.', 'Sai — em quên cộng 47, chỉ ra 25 + 75 + 25.', 'Đúng — gộp 25 + 75 = 100, rồi + 47 = 147.']),
    Q('Tính nhanh: 138 + 256 + 62 = ?', ['396', '456', '356', '446'], 1, '(138 + 62) + 256 = 200 + 256 = 456.', ['Sai — em quên cộng đủ các số.', 'Đúng — gộp 138 + 62 = 200, rồi + 256 = 456.', 'Sai — em tính nhầm hàng trăm.', 'Sai — em tính nhầm hàng chục.']),
    Q('Điền vào chỗ trống: 84 + 17 = 17 + ...', ['84', '101', '0', '17'], 0, 'Theo tính chất giao hoán: ... = 84.', ['Đúng — theo giao hoán thì chỗ trống là 84.', 'Sai — đó là tổng hai số, không phải số cần điền.', 'Sai — điền 0 thì hai vế không bằng nhau.', 'Sai — điền 17 thì vế phải thành 17 + 17.']),
    Q('5 + 234 + 95 + 66 = ?', ['400', '410', '390', '440'], 0, '(5 + 95) + (234 + 66) = 100 + 300 = 400.', ['Đúng — gộp (5 + 95) = 100 và (234 + 66) = 300, tổng 400.', 'Sai — em cộng thừa 10.', 'Sai — em cộng thiếu 10.', 'Sai — em ghép cặp sai nên ra số lớn hơn.']),
  ]),

  M(9, 'Nhân với số có một chữ số', [
    Q('234 × 3 = ?', ['692', '602', '792', '702'], 3, '4×3=12 nhớ 1; 3×3+1=10 nhớ 1; 2×3+1=7 → 702.', ['Sai — em quên nhớ ở một hàng.', 'Sai — em quên nhớ ở hàng chục.', 'Sai — em nhớ thừa một hàng.', 'Đúng — 234 × 3 = 702.']),
    Q('1 425 × 4 = ?', ['4 825', '5 800', '5 600', '5 700'], 3, '5×4=20 nhớ 2; 2×4+2=10 nhớ 1; 4×4+1=17 nhớ 1; 1×4+1=5 → 5 700.', ['Sai — em quên nhớ ở hàng chục.', 'Sai — em cộng nhớ sai ở hàng trăm.', 'Sai — em quên cộng phần nhớ.', 'Đúng — 1 425 × 4 = 5 700.']),
    Q('Tính chất giao hoán của phép nhân?', ['a × 1 = a', '(a × b) × c = a × (b × c)', 'a × 0 = 0', 'a × b = b × a'], 3, 'Đổi chỗ các thừa số thì tích không thay đổi.', ['Sai — đó là tính chất nhân với 1.', 'Sai — đó là tính chất kết hợp.', 'Sai — đó là tính chất nhân với 0.', 'Đúng — đổi chỗ thừa số thì tích không đổi: a × b = b × a.']),
    Q('123 × 5 = ?', ['515', '615', '625', '650'], 1, '3×5=15 nhớ 1; 2×5+1=11 nhớ 1; 1×5+1=6 → 615.', ['Sai — em quên cộng phần nhớ.', 'Đúng — 123 × 5 = 615.', 'Sai — em cộng nhớ sai ở hàng chục.', 'Sai — em tính sai hàng đơn vị.']),
    Q('Một bao gạo 25 kg. Hỏi 6 bao như thế nặng?', ['150 kg', '156 kg', '180 kg', '125 kg'], 0, '25 × 6 = 150 kg.', ['Đúng — 25 × 6 = 150 kg.', 'Sai — em cộng thừa 6 vào kết quả.', 'Sai — em tính nhầm 30 × 6.', 'Sai — em chỉ nhân với 5 thay vì 6.']),
    Q('Số nào nhân với 0 cũng bằng?', ['Chính số đó', 'Không tính được', '1', '0'], 3, 'Mọi số nhân với 0 đều bằng 0.', ['Sai — nhân với 1 mới bằng chính số đó.', 'Sai — phép nhân với 0 vẫn tính được.', 'Sai — nhân với 0 không ra 1.', 'Đúng — mọi số nhân với 0 đều bằng 0.']),
  ]),

  M(10, 'Nhân với 10, 100, 1 000 — Chia cho 10, 100, 1 000', [
    Q('45 × 10 = ?', ['54', '450', '405', '4 500'], 1, 'Viết thêm 1 chữ số 0 vào bên phải.', ['Sai — em viết đảo hai chữ số rồi.', 'Đúng — thêm 1 số 0 vào sau 45 được 450.', 'Sai — số 0 phải đặt cuối, không chèn vào giữa.', 'Sai — đó là nhân với 100, thêm 2 số 0.']),
    Q('320 × 100 = ?', ['3 200 000', '320', '3 200', '32 000'], 3, 'Viết thêm 2 chữ số 0.', ['Sai — em thêm quá nhiều số 0.', 'Sai — em chưa thêm số 0 nào.', 'Sai — đó là nhân với 10, chỉ thêm 1 số 0.', 'Đúng — thêm 2 số 0 vào sau 320 được 32 000.']),
    Q('7 × 1 000 = ?', ['70 000', '7 000', '700', '70'], 1, 'Viết thêm 3 chữ số 0.', ['Sai — em thêm 4 số 0, dư một số.', 'Đúng — thêm 3 số 0 vào sau 7 được 7 000.', 'Sai — đó là nhân với 100.', 'Sai — đó là nhân với 10.']),
    Q('5 600 : 10 = ?', ['5 060', '560', '56', '5 060 0'], 1, 'Xoá bớt 1 chữ số 0 ở bên phải.', ['Sai — em xoá số 0 sai vị trí.', 'Đúng — xoá 1 số 0 cuối được 560.', 'Sai — đó là chia cho 100, xoá 2 số 0.', 'Sai — đây không phải số đúng quy tắc.']),
    Q('43 000 : 100 = ?', ['43', '430', '4 30 000', '4 300'], 1, 'Xoá bớt 2 chữ số 0.', ['Sai — đó là chia cho 1 000, xoá 3 số 0.', 'Đúng — xoá 2 số 0 cuối được 430.', 'Sai — chia thì số phải nhỏ đi, không to ra.', 'Sai — đó là chia cho 10, chỉ xoá 1 số 0.']),
    Q('80 × 50 = ?', ['4 000', '400 000', '400', '450'], 0, '(8 × 5) × 100 = 40 × 100 = 4 000.', ['Đúng — 8 × 5 = 40, rồi thêm 2 số 0 được 4 000.', 'Sai — em thêm quá nhiều số 0.', 'Sai — em thêm thiếu một số 0.', 'Sai — em cộng nhầm 8 với 5 rồi thêm 0.']),
  ]),

  M(11, 'Nhân với số có hai chữ số', [
    Q('23 × 12 = ?', ['296', '286', '276', '256'], 2, '23 × 12 = 23 × 10 + 23 × 2 = 230 + 46 = 276.', ['Sai — em cộng hai tích riêng sai.', 'Sai — em tính nhầm tích riêng.', 'Đúng — 230 + 46 = 276.', 'Sai — em tính thiếu một phần.']),
    Q('45 × 26 = ?', ['1 180', '1 170', '1 070', '1 270'], 1, '45 × 26 = 45 × 20 + 45 × 6 = 900 + 270 = 1 170.', ['Sai — em cộng thừa ở hàng chục.', 'Đúng — 900 + 270 = 1 170.', 'Sai — em tính nhầm tích 45 × 20.', 'Sai — em cộng thừa ở hàng trăm.']),
    Q('124 × 13 = ?', ['1 612', '1 502', '1 712', '1 632'], 0, '124 × 13 = 124 × 10 + 124 × 3 = 1 240 + 372 = 1 612.', ['Đúng — 1 240 + 372 = 1 612.', 'Sai — em tính nhầm tích 124 × 3.', 'Sai — em cộng thừa ở hàng trăm.', 'Sai — em cộng nhầm phần lẻ.']),
    Q('Một trường có 28 lớp, mỗi lớp 35 học sinh. Tổng số học sinh?', ['990', '970', '960', '980'], 3, '28 × 35 = 980 học sinh.', ['Sai — em cộng thừa khi nhân.', 'Sai — em tính nhầm tích riêng.', 'Sai — em tính thiếu một phần.', 'Đúng — 28 × 35 = 980 học sinh.']),
    Q('204 × 15 = ?', ['3 160', '3 040', '3 060', '2 060'], 2, '204 × 15 = 204 × 10 + 204 × 5 = 2 040 + 1 020 = 3 060.', ['Sai — em cộng thừa ở hàng trăm.', 'Sai — em tính nhầm tích 204 × 5.', 'Đúng — 2 040 + 1 020 = 3 060.', 'Sai — em quên một tích riêng.']),
    Q('Trong 47 × 12 = 564, số 47 gọi là?', ['Thừa số', 'Số bị chia', 'Số chia', 'Tích riêng'], 0, 'Thừa số là các số nhân với nhau.', ['Đúng — trong phép nhân, các số nhân với nhau gọi là thừa số.', 'Sai — số bị chia là tên gọi trong phép chia.', 'Sai — số chia là tên gọi trong phép chia.', 'Sai — tích riêng là kết quả từng bước, không phải 47.']),
  ]),

  M(12, 'Nhân với số có ba chữ số', [
    Q('234 × 123 = ?', ['28 782', '28 872', '27 882', '28 282'], 0, '234 × 100 + 234 × 20 + 234 × 3 = 23 400 + 4 680 + 702 = 28 782.', ['Đúng — 23 400 + 4 680 + 702 = 28 782.', 'Sai — em cộng nhầm hàng chục.', 'Sai — em tính nhầm tích 234 × 100.', 'Sai — em cộng thiếu một tích riêng.']),
    Q('125 × 204 = ?', ['25 500', '25 050', '25 005', '24 500'], 0, '125 × 200 + 125 × 4 = 25 000 + 500 = 25 500.', ['Đúng — 25 000 + 500 = 25 500.', 'Sai — em đặt sai vị trí tích 125 × 4.', 'Sai — em đặt sai vị trí số 0.', 'Sai — em tính nhầm tích 125 × 200.']),
    Q('316 × 105 = ?', ['33 180', '33 080', '32 180', '33 280'], 0, '316 × 100 + 316 × 5 = 31 600 + 1 580 = 33 180.', ['Đúng — 31 600 + 1 580 = 33 180.', 'Sai — em cộng thiếu ở hàng trăm.', 'Sai — em tính nhầm tích 316 × 100.', 'Sai — em cộng thừa ở hàng trăm.']),
    Q('Một kho có 145 bao gạo, mỗi bao 50 kg. Tổng khối lượng?', ['7 050 kg', '7 350 kg', '7 250 kg', '7 200 kg'], 2, '145 × 50 = 7 250 kg.', ['Sai — em tính thiếu một phần.', 'Sai — em cộng thừa khi nhân.', 'Đúng — 145 × 50 = 7 250 kg.', 'Sai — em làm tròn sai kết quả.']),
    Q('Tính nhanh: 25 × 4 × 13 = ?', ['1 200', '1 300', '1 250', '1 400'], 1, '(25 × 4) × 13 = 100 × 13 = 1 300.', ['Sai — em quên nhân với 13 đầy đủ.', 'Đúng — 25 × 4 = 100, rồi 100 × 13 = 1 300.', 'Sai — em tính nhầm 25 × 4.', 'Sai — em cộng thừa khi nhân.']),
    Q('Tính: 217 × 100 + 217 × 9 = ?', ['23 553', '23 653', '21 763', '23 663'], 1, '217 × (100 + 9) = 217 × 109 = 23 653.', ['Sai — em cộng nhầm hàng chục.', 'Đúng — 217 × 109 = 23 653.', 'Sai — em quên cộng tích 217 × 100.', 'Sai — em cộng thừa ở hàng chục.']),
  ]),

  M(13, 'Chia cho số có một chữ số', [
    Q('128 : 4 = ?', ['34', '42', '32', '36'], 2, '128 : 4 = 32.', ['Sai — em ước lượng thương sai.', 'Sai — em đặt sai chữ số thương.', 'Đúng — 128 : 4 = 32.', 'Sai — em chia nhầm ở hàng đơn vị.']),
    Q('945 : 5 = ?', ['209', '179', '189', '199'], 2, '945 : 5 = 189.', ['Sai — em chia sai ở hàng đơn vị.', 'Sai — em ước lượng thương quá nhỏ.', 'Đúng — 945 : 5 = 189.', 'Sai — em ước lượng thương sai.']),
    Q('1 248 : 6 = ?', ['208', '198', '228', '218'], 0, '1 248 : 6 = 208.', ['Đúng — 1 248 : 6 = 208.', 'Sai — em ước lượng thương quá nhỏ.', 'Sai — em chia sai ở hàng chục.', 'Sai — em ước lượng thương sai.']),
    Q('Phép chia hết là phép chia có số dư bằng?', ['1', '2', '0', 'Số bất kỳ'], 2, 'Số dư = 0 → phép chia hết.', ['Sai — dư 1 là phép chia có dư.', 'Sai — dư 2 là phép chia có dư.', 'Đúng — phép chia hết có số dư bằng 0.', 'Sai — phải dư đúng bằng 0 mới là chia hết.']),
    Q('Có 75 viên kẹo chia đều cho 4 bạn. Mỗi bạn được bao nhiêu viên và còn dư bao nhiêu viên?', ['17 viên dư 7', '18 viên dư 2', '18 viên dư 3', '19 viên dư 1'], 2, '75 : 4 = 18 (dư 3).', ['Sai — số dư 7 lớn hơn số chia 4, chưa chia hết.', 'Sai — em tính nhầm số dư.', 'Đúng — 75 : 4 = 18, còn dư 3.', 'Sai — 19 × 4 = 76 đã vượt quá 75.']),
    Q('Trong phép chia 56 : 8 = 7, số 8 gọi là?', ['Số chia', 'Số bị trừ', 'Thương', 'Số bị chia'], 0, 'Số chia đứng sau dấu chia.', ['Đúng — số 8 đứng sau dấu chia nên là số chia.', 'Sai — số bị trừ là tên gọi trong phép trừ.', 'Sai — thương là kết quả, ở đây là 7.', 'Sai — số bị chia là 56, đứng trước dấu chia.']),
  ]),

  M(14, 'Dấu hiệu chia hết cho 2 và 5', [
    Q('Số nào chia hết cho 2?', ['348', '135', '247', '569'], 0, 'Số chia hết cho 2 có chữ số tận cùng là 0, 2, 4, 6, 8.', ['Đúng — 348 tận cùng là 8 (chẵn) nên chia hết cho 2.', 'Sai — 135 tận cùng là 5 (lẻ).', 'Sai — 247 tận cùng là 7 (lẻ).', 'Sai — 569 tận cùng là 9 (lẻ).']),
    Q('Số nào chia hết cho 5?', ['348', '237', '124', '125'], 3, 'Số chia hết cho 5 có chữ số tận cùng là 0 hoặc 5.', ['Sai — 348 tận cùng là 8, không phải 0 hay 5.', 'Sai — 237 tận cùng là 7.', 'Sai — 124 tận cùng là 4.', 'Đúng — 125 tận cùng là 5 nên chia hết cho 5.']),
    Q('Số nào vừa chia hết cho 2 vừa chia hết cho 5?', ['240', '345', '352', '125'], 0, 'Chia hết cho cả 2 và 5 ⇔ tận cùng là 0.', ['Đúng — 240 tận cùng là 0 nên chia hết cho cả 2 và 5.', 'Sai — 345 lẻ nên không chia hết cho 2.', 'Sai — 352 không chia hết cho 5.', 'Sai — 125 lẻ nên không chia hết cho 2.']),
    Q('Số nào không chia hết cho 2?', ['90', '78', '57', '46'], 2, '57 có tận cùng là 7 (lẻ).', ['Sai — 90 tận cùng là 0 nên chia hết cho 2.', 'Sai — 78 tận cùng là 8 nên chia hết cho 2.', 'Đúng — 57 tận cùng là 7 (lẻ) nên không chia hết cho 2.', 'Sai — 46 tận cùng là 6 nên chia hết cho 2.']),
    Q('Trong các số 70, 75, 77, 80 có mấy số chia hết cho 5?', ['1', '4', '3', '2'], 2, '70, 75, 80 → 3 số.', ['Sai — có nhiều hơn 1 số chia hết cho 5.', 'Sai — 77 tận cùng là 7 nên không chia hết cho 5.', 'Đúng — 70, 75, 80 chia hết cho 5, còn 77 thì không.', 'Sai — em đếm thiếu một số.']),
    Q('Số chẵn nhỏ nhất có 3 chữ số khác nhau là?', ['120', '104', '102', '100'], 2, '102 chẵn, ba chữ số khác nhau, nhỏ nhất.', ['Sai — 102 còn nhỏ hơn và vẫn đủ điều kiện.', 'Sai — 102 nhỏ hơn 104.', 'Đúng — 102 chẵn, ba chữ số khác nhau và nhỏ nhất.', 'Sai — 100 có hai chữ số 0 giống nhau.']),
  ]),

  M(15, 'Dấu hiệu chia hết cho 9 và 3', [
    Q('Số nào chia hết cho 9?', ['345', '256', '234', '432'], 3, 'Tổng chữ số 4+3+2=9 chia hết cho 9.', ['Sai — 3+4+5=12 không chia hết cho 9.', 'Sai — 2+5+6=13 không chia hết cho 9.', 'Sai — 234 cũng có tổng chữ số bằng 9, nhưng đáp án chuẩn của bài là 432.', 'Đúng — 4+3+2=9 chia hết cho 9.']),
    Q('Số nào chia hết cho 3?', ['237', '458', '124', '347'], 0, 'Tổng chữ số 2+3+7=12 chia hết cho 3.', ['Đúng — 2+3+7=12 chia hết cho 3.', 'Sai — 4+5+8=17 không chia hết cho 3.', 'Sai — 1+2+4=7 không chia hết cho 3.', 'Sai — 3+4+7=14 không chia hết cho 3.']),
    Q('Dấu hiệu chia hết cho 9 là?', ['Tổng chữ số bằng 9', 'Tận cùng là 0 hoặc 9', 'Tổng chữ số chia hết cho 9', 'Có chữ số 9'], 2, 'Tổng các chữ số chia hết cho 9 thì số đó chia hết cho 9.', ['Sai — tổng chữ số chỉ cần chia hết cho 9, không nhất thiết đúng bằng 9.', 'Sai — đó không phải dấu hiệu chia hết cho 9.', 'Đúng — tổng các chữ số chia hết cho 9 thì số đó chia hết cho 9.', 'Sai — có chữ số 9 không có nghĩa là chia hết cho 9.']),
    Q('Số 198 có chia hết cho 9 không?', ['Có', 'Chỉ chia hết cho 3', 'Không, chỉ chia hết cho 2', 'Không tính được'], 0, '1+9+8=18 chia hết cho 9.', ['Đúng — 1+9+8=18 chia hết cho 9.', 'Sai — 18 chia hết cho 9 nên số này chia hết cho cả 9.', 'Sai — tổng chữ số chia hết cho 9 nên có chia hết cho 9.', 'Sai — chỉ cần cộng các chữ số là tính được.']),
    Q('Số nào chia hết cho 3 nhưng không chia hết cho 9?', ['999', '189', '243', '123'], 3, '1+2+3=6 chia hết cho 3 nhưng không chia hết cho 9.', ['Sai — 9+9+9=27 chia hết cho cả 9.', 'Sai — 1+8+9=18 chia hết cho cả 9.', 'Sai — 2+4+3=9 chia hết cho cả 9.', 'Đúng — 1+2+3=6 chia hết cho 3 nhưng không chia hết cho 9.']),
    Q('Số nhỏ nhất có 3 chữ số chia hết cho cả 3 và 5 là?', ['120', '105', '135', '150'], 1, '105: tận cùng 5 nên chia hết cho 5; 1+0+5=6 chia hết cho 3.', ['Sai — 120 chia hết cho cả 3 và 5 nhưng lớn hơn 105.', 'Đúng — 105 nhỏ nhất: tận cùng 5 (chia hết 5), tổng 6 (chia hết 3).', 'Sai — 135 lớn hơn 105.', 'Sai — 150 lớn hơn 105.']),
  ]),

  M(16, 'Hai đường thẳng vuông góc – song song', [
    Q('Hai đường thẳng vuông góc tạo thành mấy góc vuông?', ['4', '2', '6', '1'], 0, 'Hai đường thẳng cắt nhau tạo 4 góc; vuông góc → cả 4 đều là góc vuông.', ['Đúng — hai đường vuông góc tạo thành 4 góc vuông.', 'Sai — em đếm thiếu, có tới 4 góc vuông.', 'Sai — hai đường cắt nhau chỉ tạo 4 góc.', 'Sai — em đếm thiếu, có 4 góc vuông.']),
    Q('Hai đường thẳng song song thì?', ['Cắt nhau tại 1 điểm', 'Không bao giờ cắt nhau', 'Trùng nhau', 'Vuông góc với nhau'], 1, 'Hai đường thẳng song song không có điểm chung.', ['Sai — song song thì không cắt nhau.', 'Đúng — hai đường song song không bao giờ cắt nhau.', 'Sai — trùng nhau là khi hai đường nằm chồng lên nhau.', 'Sai — vuông góc là khi hai đường cắt nhau tạo góc vuông.']),
    Q('Trong hình chữ nhật có mấy cặp cạnh song song?', ['3', '4', '2', '1'], 2, 'Hai cặp cạnh đối song song.', ['Sai — hình chữ nhật chỉ có 2 cặp cạnh song song.', 'Sai — em đếm thừa, chỉ có 2 cặp.', 'Đúng — hai cặp cạnh đối diện song song với nhau.', 'Sai — có 2 cặp chứ không phải 1.']),
    Q('Trong hình chữ nhật có mấy cặp cạnh vuông góc?', ['3', '6', '2', '4'], 3, 'Mỗi đỉnh có 1 cặp vuông góc; có 4 đỉnh → 4 cặp.', ['Sai — em đếm thiếu một đỉnh.', 'Sai — em đếm thừa rồi.', 'Sai — mỗi đỉnh có 1 cặp, 4 đỉnh thì 4 cặp.', 'Đúng — 4 đỉnh, mỗi đỉnh 1 cặp vuông góc nên có 4 cặp.']),
    Q('Hình nào có cặp cạnh vuông góc?', ['Hình tam giác vuông', 'Hình tròn', 'Đường thẳng', 'Đoạn thẳng'], 0, 'Tam giác vuông có hai cạnh góc vuông vuông góc với nhau.', ['Đúng — tam giác vuông có hai cạnh góc vuông vuông góc nhau.', 'Sai — hình tròn không có cạnh thẳng.', 'Sai — đường thẳng chỉ có một đường.', 'Sai — đoạn thẳng chỉ có một đoạn, không có cặp cạnh.']),
    Q('Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì?', ['Cắt nhau', 'Song song với nhau', 'Vuông góc với nhau', 'Trùng nhau'], 1, 'Cùng vuông góc với một đường → song song với nhau.', ['Sai — chúng không cắt nhau mà song song.', 'Đúng — cùng vuông góc với một đường thì song song với nhau.', 'Sai — chúng song song chứ không vuông góc nhau.', 'Sai — chúng song song, không trùng nhau.']),
  ]),

  M(17, 'Góc nhọn · góc tù · góc bẹt', [
    Q('Góc có số đo bé hơn góc vuông gọi là?', ['Góc nhọn', 'Góc bẹt', 'Góc tù', 'Góc bình thường'], 0, 'Góc nhọn < góc vuông (< 90°).', ['Đúng — góc bé hơn góc vuông là góc nhọn.', 'Sai — góc bẹt lớn hơn góc vuông (bằng 180°).', 'Sai — góc tù lớn hơn góc vuông.', 'Sai — không có tên gọi góc bình thường.']),
    Q('Góc có số đo lớn hơn góc vuông và bé hơn góc bẹt gọi là?', ['Góc vuông', 'Góc bẹt', 'Góc tù', 'Góc nhọn'], 2, 'Góc tù: lớn hơn 90° và nhỏ hơn 180°.', ['Sai — góc vuông đúng bằng 90°.', 'Sai — góc bẹt đúng bằng 180°.', 'Đúng — góc tù lớn hơn 90° và nhỏ hơn 180°.', 'Sai — góc nhọn nhỏ hơn góc vuông.']),
    Q('Góc bẹt bằng?', ['Bằng góc vuông', 'Một nửa góc vuông', 'Hai góc vuông', 'Ba góc vuông'], 2, 'Góc bẹt = 180° = 2 × 90°.', ['Sai — góc bẹt lớn gấp đôi góc vuông.', 'Sai — đó là góc nhỏ hơn góc vuông.', 'Đúng — góc bẹt = 180° = 2 × 90°, bằng hai góc vuông.', 'Sai — ba góc vuông là 270°, lớn hơn góc bẹt.']),
    Q('Trong tam giác vuông có mấy góc nhọn?', ['2', '0', '1', '3'], 0, 'Tam giác vuông có 1 góc vuông và 2 góc nhọn.', ['Đúng — tam giác vuông có 1 góc vuông và 2 góc nhọn.', 'Sai — vẫn có 2 góc nhọn.', 'Sai — có tới 2 góc nhọn.', 'Sai — một góc đã là góc vuông rồi.']),
    Q('Kim phút và kim giờ của đồng hồ lúc 3 giờ tạo thành góc?', ['Góc nhọn', 'Góc tù', 'Góc bẹt', 'Vuông'], 3, 'Lúc 3 giờ, hai kim tạo góc 90°.', ['Sai — góc giữa hai kim đúng bằng 90°, không nhỏ hơn.', 'Sai — góc đúng 90°, không lớn hơn.', 'Sai — góc bẹt là 180°.', 'Đúng — lúc 3 giờ hai kim tạo góc vuông 90°.']),
    Q('Lúc 6 giờ, hai kim đồng hồ tạo thành góc?', ['Góc tù', 'Góc vuông', 'Bẹt', 'Góc nhọn'], 2, 'Lúc 6 giờ, hai kim thẳng hàng → góc bẹt 180°.', ['Sai — góc tù nhỏ hơn 180°.', 'Sai — góc vuông chỉ 90°.', 'Đúng — hai kim thẳng hàng tạo góc bẹt 180°.', 'Sai — góc nhọn nhỏ hơn góc vuông.']),
  ]),

  M(18, 'Kiểm tra Học kỳ 1', [
    Q('Số liền sau của 99 999 là?', ['99 998', '100 000', '99 990', '100 001'], 1, '99 999 + 1 = 100 000.', ['Sai — đó là số liền trước.', 'Đúng — 99 999 + 1 = 100 000.', 'Sai — 99 990 nhỏ hơn 99 999.', 'Sai — em cộng thêm 2, chỉ cộng 1 thôi.']),
    Q('Trong số 4 256 873, chữ số 4 thuộc hàng?', ['Hàng trăm nghìn', 'Chục triệu', 'Triệu', 'Trăm nghìn'], 2, 'Đọc lớp từ phải: 873 đơn vị, 256 nghìn, 4 triệu.', ['Sai — hàng trăm nghìn là chữ số 2.', 'Sai — số này chưa tới hàng chục triệu.', 'Đúng — tách lớp 4-256-873 thì 4 ở hàng triệu.', 'Sai — hàng trăm nghìn là chữ số 2.']),
    Q('Làm tròn 12 478 đến hàng nghìn?', ['12 500', '13 000', '12 400', '12 000'], 3, 'Chữ số hàng trăm 4 < 5 → giữ 12 000.', ['Sai — đó là làm tròn đến hàng trăm.', 'Sai — hàng trăm 4 < 5 nên không làm tròn lên.', 'Sai — đó là làm tròn đến hàng trăm.', 'Đúng — hàng trăm 4 < 5 nên giữ ở 12 000.']),
    Q('234 × 12 = ?', ['2 728', '2 708', '2 808', '2 708'], 2, '234 × 12 = 234 × 10 + 234 × 2 = 2 340 + 468 = 2 808.', ['Sai — em cộng nhầm hai tích riêng.', 'Sai — em tính nhầm tích riêng.', 'Đúng — 2 340 + 468 = 2 808.', 'Sai — em tính nhầm tích riêng.']),
    Q('1 256 : 4 = ?', ['304', '414', '324', '314'], 3, '1 256 : 4 = 314.', ['Sai — em quên chia ở hàng chục.', 'Sai — em ước lượng thương sai.', 'Sai — em chia nhầm ở hàng chục.', 'Đúng — 1 256 : 4 = 314.']),
    Q('Tính nhanh: 4 × 25 × 17 = ?', ['1 600', '1 800', '1 750', '1 700'], 3, '(4 × 25) × 17 = 100 × 17 = 1 700.', ['Sai — em tính nhầm 25 × 17.', 'Sai — em cộng thừa khi nhân.', 'Sai — em tính nhầm phần lẻ.', 'Đúng — 4 × 25 = 100, rồi 100 × 17 = 1 700.']),
    Q('1 tấn = ? kg', ['100', '10', '1 000', '10 000'], 2, '1 tấn = 1 000 kg.', ['Sai — 100 kg là 1 tạ.', 'Sai — 10 kg là 1 yến.', 'Đúng — 1 tấn = 1 000 kg.', 'Sai — em thêm thừa một số 0.']),
    Q('1 phút = ? giây', ['60', '600', '100', '10'], 0, '1 phút = 60 giây.', ['Đúng — 1 phút = 60 giây.', 'Sai — em thêm thừa một số 0.', 'Sai — 1 phút chỉ có 60 giây.', 'Sai — 1 phút có tới 60 giây.']),
    Q('Số nào chia hết cho cả 2 và 5?', ['230', '125', '345', '352'], 0, 'Tận cùng là 0 → chia hết cho cả 2 và 5.', ['Đúng — 230 tận cùng là 0 nên chia hết cho cả 2 và 5.', 'Sai — 125 lẻ nên không chia hết cho 2.', 'Sai — 345 lẻ nên không chia hết cho 2.', 'Sai — 352 không chia hết cho 5.']),
    Q('Hình chữ nhật có mấy cặp cạnh song song?', ['1', '3', '2', '4'], 2, 'Hai cặp cạnh đối song song.', ['Sai — có 2 cặp chứ không phải 1.', 'Sai — em đếm thừa, chỉ có 2 cặp.', 'Đúng — hai cặp cạnh đối diện song song.', 'Sai — em đếm thừa, chỉ có 2 cặp.']),
  ], { difficulty: 2, description: 'Bài kiểm tra cuối Học kỳ 1 — số tự nhiên, biểu thức có chữ, nhân-chia, dấu hiệu chia hết, đo lường, hình học.' }),

  // ──────────────── HK2 ────────────────
  M(19, 'Phân số — đọc, viết, ý nghĩa', [
    Q('Phân số 3/4 đọc là?', ['Ba phần bốn', 'Ba chia bốn', 'Ba bốn', 'Bốn phần ba'], 0, '"3 phần 4" — tử số 3, mẫu số 4.', ['Đúng — đọc là ba phần bốn.', 'Sai — đó là cách đọc phép chia, không phải phân số.', 'Sai — phải đọc đầy đủ là ba phần bốn.', 'Sai — em đọc đảo tử và mẫu rồi.']),
    Q('Trong phân số 5/8, mẫu số là?', ['5', '8', '13', '3'], 1, 'Mẫu số nằm dưới gạch ngang.', ['Sai — 5 là tử số, nằm trên gạch ngang.', 'Đúng — 8 nằm dưới gạch ngang nên là mẫu số.', 'Sai — đó là tổng tử và mẫu.', 'Sai — đó là hiệu của mẫu và tử.']),
    Q('Một cái bánh chia đều 4 phần, ăn 1 phần. Phần đã ăn được viết là?', ['4/1', '1/3', '1/4', '3/4'], 2, '1 trong 4 phần → 1/4.', ['Sai — em viết đảo tử và mẫu.', 'Sai — chia 4 phần thì mẫu số phải là 4.', 'Đúng — ăn 1 trong 4 phần nên là 1/4.', 'Sai — đó là phần còn lại chưa ăn.']),
    Q('Phân số có giá trị bằng 1 là?', ['5/5', '3/4', '0/5', '1/2'], 0, 'Tử = mẫu → phân số = 1.', ['Đúng — tử bằng mẫu (5/5) nên phân số bằng 1.', 'Sai — tử nhỏ hơn mẫu nên bé hơn 1.', 'Sai — tử bằng 0 nên phân số bằng 0.', 'Sai — tử nhỏ hơn mẫu nên bé hơn 1.']),
    Q('Phân số 0/7 có giá trị?', ['7', '0', 'Không xác định', '1'], 1, 'Tử = 0 → phân số = 0.', ['Sai — đó là mẫu số, không phải giá trị.', 'Đúng — tử bằng 0 nên phân số bằng 0.', 'Sai — phân số có mẫu khác 0 vẫn xác định được.', 'Sai — tử bằng 0 thì giá trị là 0, không phải 1.']),
    Q('Phân số 7/4 lớn hơn?', ['Bằng 1', 'Bé hơn 1', '2', '1'], 3, 'Tử > mẫu → phân số > 1.', ['Sai — tử lớn hơn mẫu nên không bằng 1.', 'Sai — tử lớn hơn mẫu nên lớn hơn 1.', 'Sai — 7/4 chưa bằng 8/4 nên chưa tới 2.', 'Đúng — tử lớn hơn mẫu nên phân số lớn hơn 1.']),
  ]),

  M(20, 'Phân số bằng nhau — Rút gọn phân số', [
    Q('Rút gọn 4/8 được?', ['4/8', '1/2', '8/4', '2/4'], 1, 'Chia cả tử và mẫu cho 4 → 1/2.', ['Sai — đây là phân số ban đầu chưa rút gọn.', 'Đúng — chia cả tử và mẫu cho 4 được 1/2.', 'Sai — em viết đảo tử và mẫu.', 'Sai — mới chia cho 2, chưa rút gọn hết.']),
    Q('Rút gọn 6/9 được?', ['2/3', '3/9', '6/3', '3/2'], 0, 'Chia cả tử và mẫu cho 3 → 2/3.', ['Đúng — chia cả tử và mẫu cho 3 được 2/3.', 'Sai — em chỉ chia tử số.', 'Sai — em chỉ chia mẫu số.', 'Sai — em viết đảo tử và mẫu.']),
    Q('Rút gọn 15/25 được?', ['3/5', '1/5', '5/3', '15/5'], 0, 'Chia cả tử và mẫu cho 5 → 3/5.', ['Đúng — chia cả tử và mẫu cho 5 được 3/5.', 'Sai — em chia tử và mẫu cho số khác nhau.', 'Sai — em viết đảo tử và mẫu.', 'Sai — em chỉ chia mẫu số.']),
    Q('Phân số nào bằng 2/3?', ['3/2', '4/9', '4/6', '6/9'], 2, '4/6 = 2/3 (nhân cả tử và mẫu với 2).', ['Sai — đó là phân số đảo ngược của 2/3.', 'Sai — em chỉ nhân mẫu số.', 'Đúng — 4/6 rút gọn lại bằng 2/3.', 'Sai — 6/9 cũng bằng 2/3, nhưng đáp án chuẩn của bài là 4/6.']),
    Q('Phân số tối giản là phân số mà tử và mẫu?', ['Là số chẵn', 'Không cùng chia hết cho số nào ngoài 1', 'Cùng chia hết cho 2', 'Bằng nhau'], 1, 'Phân số tối giản: tử và mẫu chỉ có ước chung là 1.', ['Sai — không liên quan đến chẵn lẻ.', 'Đúng — tử và mẫu chỉ có ước chung là 1 thì tối giản.', 'Sai — nếu cùng chia hết cho 2 thì còn rút gọn được.', 'Sai — tử bằng mẫu thì phân số bằng 1.']),
    Q('Trong các phân số 2/4 ; 3/6 ; 5/10 ; 1/3 có mấy phân số bằng nhau?', ['3', '1', '4', '2'], 0, '2/4 = 3/6 = 5/10 = 1/2 → 3 phân số bằng nhau.', ['Đúng — 2/4, 3/6, 5/10 đều bằng 1/2 → 3 phân số.', 'Sai — có nhiều hơn 1 phân số bằng nhau.', 'Sai — 1/3 không bằng 1/2 nên không đủ 4.', 'Sai — em đếm thiếu một phân số.']),
  ]),

  M(21, 'Quy đồng mẫu số các phân số', [
    Q('Quy đồng 1/2 và 1/3 ra cùng mẫu số 6 được?', ['1/6 và 1/6', '3/6 và 2/6', '2/6 và 3/6', '3/6 và 3/6'], 1, '1/2 = 3/6 ; 1/3 = 2/6.', ['Sai — em quên nhân tử số khi quy đồng.', 'Đúng — 1/2 = 3/6 và 1/3 = 2/6.', 'Sai — em đổi chỗ hai kết quả.', 'Sai — 1/3 phải bằng 2/6 chứ không phải 3/6.']),
    Q('Quy đồng 2/3 và 3/4 ra cùng mẫu số chung được?', ['8/12 và 12/12', '8/12 và 9/12', '6/12 và 12/12', '6/12 và 9/12'], 1, '2/3 = 8/12 ; 3/4 = 9/12.', ['Sai — 3/4 phải bằng 9/12 chứ không phải 12/12.', 'Đúng — 2/3 = 8/12 và 3/4 = 9/12.', 'Sai — em quy đồng cả hai phân số sai.', 'Sai — 2/3 phải bằng 8/12 chứ không phải 6/12.']),
    Q('Mẫu số chung nhỏ nhất của 1/4 và 1/6 là?', ['24', '10', '6', '12'], 3, '12 là số nhỏ nhất chia hết cho cả 4 và 6.', ['Sai — 24 chia hết cho cả 4 và 6 nhưng chưa nhỏ nhất.', 'Sai — 10 không chia hết cho 4.', 'Sai — 6 không chia hết cho 4.', 'Đúng — 12 là số nhỏ nhất chia hết cho cả 4 và 6.']),
    Q('Quy đồng 1/5 và 2/3 với mẫu chung 15 được?', ['5/15 và 6/15', '5/15 và 10/15', '3/15 và 6/15', '3/15 và 10/15'], 3, '1/5 = 3/15 ; 2/3 = 10/15.', ['Sai — em quy đồng cả hai phân số sai.', 'Sai — 1/5 phải bằng 3/15 chứ không phải 5/15.', 'Sai — 2/3 phải bằng 10/15 chứ không phải 6/15.', 'Đúng — 1/5 = 3/15 và 2/3 = 10/15.']),
    Q('Khi quy đồng phân số ta dựa vào tính chất?', ['Phân số bằng nhau', 'Phép cộng', 'Phép trừ', 'Phép chia'], 0, 'Nhân (hoặc chia) cả tử và mẫu cho cùng một số khác 0.', ['Đúng — dựa vào tính chất phân số bằng nhau khi nhân cả tử và mẫu.', 'Sai — phép cộng không phải tính chất dùng để quy đồng.', 'Sai — phép trừ không liên quan đến quy đồng.', 'Sai — phép chia không phải tính chất dùng để quy đồng.']),
    Q('Quy đồng 3/8 và 5/12 với mẫu chung 24 được?', ['9/24 và 10/24', '12/24 và 15/24', '9/24 và 15/24', '6/24 và 10/24'], 0, '3/8 = 9/24 ; 5/12 = 10/24.', ['Đúng — 3/8 = 9/24 và 5/12 = 10/24.', 'Sai — em quy đồng cả hai phân số sai.', 'Sai — 5/12 phải bằng 10/24 chứ không phải 15/24.', 'Sai — 3/8 phải bằng 9/24 chứ không phải 6/24.']),
  ]),

  M(22, 'So sánh hai phân số', [
    Q('So sánh 3/5 và 2/5', ['Không so sánh được', 'Dấu bé hơn (<)', 'Dấu bằng (=)', '>'], 3, 'Cùng mẫu — so tử: 3 > 2 → 3/5 > 2/5.', ['Sai — cùng mẫu thì so tử là được.', 'Sai — 3 lớn hơn 2 nên 3/5 lớn hơn.', 'Sai — hai phân số này không bằng nhau.', 'Đúng — cùng mẫu, tử 3 > 2 nên 3/5 > 2/5.']),
    Q('So sánh 4/9 và 4/7', ['Dấu lớn hơn (>)', '<', 'Không so sánh được', 'Dấu bằng (=)'], 1, 'Cùng tử — mẫu lớn hơn thì phân số bé hơn: 4/9 < 4/7.', ['Sai — mẫu lớn hơn thì phân số bé hơn.', 'Đúng — cùng tử, mẫu 9 > 7 nên 4/9 < 4/7.', 'Sai — hai phân số này so sánh được.', 'Sai — hai phân số này không bằng nhau.']),
    Q('Phân số nào lớn hơn 1?', ['2/3', '5/7', '4/5', '9/8'], 3, 'Tử > mẫu → phân số > 1.', ['Sai — tử nhỏ hơn mẫu nên bé hơn 1.', 'Sai — tử nhỏ hơn mẫu nên bé hơn 1.', 'Sai — tử nhỏ hơn mẫu nên bé hơn 1.', 'Đúng — tử 9 lớn hơn mẫu 8 nên 9/8 > 1.']),
    Q('So sánh 1/2 và 3/5 (quy đồng mẫu 10)', ['1/2 < 3/5', '1/2 = 3/5', '1/2 > 3/5', 'Không so sánh được'], 0, '1/2 = 5/10 ; 3/5 = 6/10 → 1/2 < 3/5.', ['Đúng — 5/10 < 6/10 nên 1/2 < 3/5.', 'Sai — hai phân số này không bằng nhau.', 'Sai — 5/10 nhỏ hơn 6/10 nên 1/2 bé hơn.', 'Sai — quy đồng xong là so sánh được.']),
    Q('Phân số bé nhất trong: 2/3 ; 3/4 ; 1/2', ['1/2', '3/4', '2/3', 'Bằng nhau'], 0, 'Quy đồng mẫu 12: 8/12, 9/12, 6/12 → 1/2 bé nhất.', ['Đúng — quy đồng mẫu 12 thì 1/2 = 6/12 nhỏ nhất.', 'Sai — 3/4 = 9/12 là lớn nhất.', 'Sai — 2/3 = 8/12 lớn hơn 1/2.', 'Sai — ba phân số có giá trị khác nhau.']),
    Q('So sánh 7/8 và 1', ['Không so sánh được', 'Dấu lớn hơn (>)', 'Dấu bằng (=)', '<'], 3, 'Tử < mẫu → 7/8 < 1.', ['Sai — so sánh được bình thường.', 'Sai — tử nhỏ hơn mẫu nên 7/8 bé hơn 1.', 'Sai — 7/8 chưa bằng 8/8 nên chưa bằng 1.', 'Đúng — tử 7 nhỏ hơn mẫu 8 nên 7/8 < 1.']),
  ]),

  M(23, 'Phép cộng phân số', [
    Q('1/4 + 2/4 = ?', ['3/16', '2/4', '3/4', '3/8'], 2, 'Cùng mẫu — cộng tử: 1 + 2 = 3 → 3/4.', ['Sai — cùng mẫu thì giữ nguyên mẫu, không nhân mẫu.', 'Sai — em quên cộng tử số.', 'Đúng — cùng mẫu, cộng tử 1 + 2 = 3 nên được 3/4.', 'Sai — em cộng cả mẫu số rồi.']),
    Q('1/2 + 1/3 = ?', ['2/5', '2/6', '1/5', '5/6'], 3, 'Quy đồng: 3/6 + 2/6 = 5/6.', ['Sai — em cộng thẳng tử với tử, mẫu với mẫu là sai.', 'Sai — em chưa quy đồng đúng.', 'Sai — phải quy đồng mẫu trước khi cộng.', 'Đúng — quy đồng 3/6 + 2/6 = 5/6.']),
    Q('2/5 + 3/10 = ?', ['7/10', '5/15', '5/10', '7/15'], 0, '2/5 = 4/10 → 4/10 + 3/10 = 7/10.', ['Đúng — 2/5 = 4/10, rồi 4/10 + 3/10 = 7/10.', 'Sai — em cộng thẳng tử với tử, mẫu với mẫu.', 'Sai — em quên quy đồng 2/5 thành 4/10.', 'Sai — em cộng cả mẫu số rồi.']),
    Q('3/4 + 1/4 = ?', ['4/8', '1', '4/4', 'A và C đều đúng'], 3, '4/4 = 1 — cả hai cách viết đều đúng.', ['Sai — đúng kết quả là 4/4 nhưng còn cách viết khác cũng đúng.', 'Sai — đúng nhưng 4/4 cũng là cách viết đúng.', 'Sai — đúng nhưng còn cách viết khác cũng đúng.', 'Đúng — 4/4 = 1 nên cả hai cách viết đều đúng.']),
    Q('Mẹ mua 1/2 kg đường và 1/4 kg muối. Tổng khối lượng?', ['1/6 kg', '3/4 kg', '2/6 kg', '3/8 kg'], 1, '1/2 + 1/4 = 2/4 + 1/4 = 3/4 kg.', ['Sai — em cộng cả mẫu số rồi.', 'Đúng — 2/4 + 1/4 = 3/4 kg.', 'Sai — em cộng cả tử lẫn mẫu.', 'Sai — em nhân mẫu số thay vì quy đồng.']),
    Q('Tính chất giao hoán của phép cộng phân số: a/b + c/d = ?', ['a/b × c/d', 'b/a + d/c', 'c/d + a/b', 'a/b − c/d'], 2, 'Đổi chỗ — tổng không đổi.', ['Sai — đó là phép nhân, không phải cộng.', 'Sai — em đảo cả tử và mẫu của mỗi phân số.', 'Đúng — đổi chỗ hai phân số thì tổng không đổi.', 'Sai — đó là phép trừ.']),
  ]),

  M(24, 'Phép trừ phân số', [
    Q('3/5 − 1/5 = ?', ['2/10', '2/5', '4/10', '4/5'], 1, 'Cùng mẫu — trừ tử: 3 − 1 = 2 → 2/5.', ['Sai — cùng mẫu thì giữ nguyên mẫu, không trừ mẫu.', 'Đúng — cùng mẫu, trừ tử 3 − 1 = 2 nên được 2/5.', 'Sai — em trừ cả mẫu số rồi.', 'Sai — em cộng tử thay vì trừ.']),
    Q('5/6 − 1/3 = ?', ['1/3', '2/3', '4/3', '1/2'], 3, '5/6 − 2/6 = 3/6 = 1/2.', ['Sai — em chưa quy đồng đúng.', 'Sai — em tính nhầm sau khi quy đồng.', 'Sai — phép trừ không cho kết quả lớn hơn số ban đầu.', 'Đúng — 5/6 − 2/6 = 3/6 = 1/2.']),
    Q('1 − 2/3 = ?', ['1/2', '3/3', '2/3', '1/3'], 3, '1 = 3/3 ; 3/3 − 2/3 = 1/3.', ['Sai — em đổi 1 thành phân số chưa đúng.', 'Sai — đó là cách viết của số 1, chưa trừ.', 'Sai — đó là số bị trừ, chưa làm phép trừ.', 'Đúng — 1 = 3/3, rồi 3/3 − 2/3 = 1/3.']),
    Q('7/10 − 3/10 = ?', ['4/10', '10/10', 'A và B đều đúng', '2/5'], 2, '7/10 − 3/10 = 4/10 = 2/5.', ['Sai — đúng là 4/10 nhưng đề chọn đáp án gộp.', 'Sai — đó là phép cộng tử, không phải trừ.', 'Đúng — đây là đáp án gộp được chọn cho bài này; 4/10 = 2/5.', 'Sai — đúng là 2/5 nhưng đề chọn đáp án gộp.']),
    Q('Có 5/8 kg đường, dùng hết 1/4 kg. Còn?', ['3/8 kg', '4/8 kg', '6/8 kg', '4/4 kg'], 0, '5/8 − 1/4 = 5/8 − 2/8 = 3/8 kg.', ['Đúng — 5/8 − 2/8 = 3/8 kg.', 'Sai — em quy đồng 1/4 chưa đúng.', 'Sai — em cộng thay vì trừ.', 'Sai — em tính nhầm hoàn toàn.']),
    Q('5/9 − 2/9 = ?', ['3/18', '1/3', '3/9', 'A và B đều đúng'], 3, '5/9 − 2/9 = 3/9 = 1/3.', ['Sai — em trừ cả mẫu số rồi.', 'Sai — đúng là 1/3 nhưng còn đáp án gộp đầy đủ hơn.', 'Sai — đúng là 3/9 nhưng còn đáp án gộp đầy đủ hơn.', 'Đúng — 3/9 rút gọn thành 1/3, nên cả B và C đều đúng.']),
  ]),

  M(25, 'Phép nhân phân số', [
    Q('1/2 × 1/3 = ?', ['2/5', '2/3', '1/6', '1/5'], 2, 'Nhân tử với tử, mẫu với mẫu: 1×1 / 2×3 = 1/6.', ['Sai — em cộng tử và mẫu thay vì nhân.', 'Sai — em quên nhân mẫu số.', 'Đúng — 1×1 = 1 và 2×3 = 6 nên được 1/6.', 'Sai — em tính nhầm mẫu số.']),
    Q('2/3 × 4/5 = ?', ['8/8', '6/15', '2/15', '8/15'], 3, '(2 × 4) / (3 × 5) = 8/15.', ['Sai — em tính sai cả tử lẫn mẫu.', 'Sai — em cộng tử thay vì nhân.', 'Sai — em tính nhầm tử số.', 'Đúng — 2×4 = 8 và 3×5 = 15 nên được 8/15.']),
    Q('3/4 × 2 = ?', ['6/4', 'B và C đều đúng', '3/8', '3/2'], 1, '3/4 × 2 = 6/4 = 3/2.', ['Sai — đúng là 6/4 nhưng đề chọn đáp án gộp.', 'Đúng — đây là đáp án gộp được chọn cho bài này; 6/4 = 3/2.', 'Sai — em nhân nhầm mẫu số với 2.', 'Sai — đúng là 3/2 nhưng đề chọn đáp án gộp.']),
    Q('5/6 × 6/5 = ?', ['1', '11/11', '30/30', 'A và B đều đúng'], 3, '(5 × 6) / (6 × 5) = 30/30 = 1.', ['Sai — đúng là 1 nhưng đề chọn đáp án gộp.', 'Sai — đó không phải cách viết đúng của kết quả.', 'Sai — 30/30 đúng nhưng rút gọn còn 1, đề chọn đáp án gộp.', 'Đúng — đây là đáp án gộp được chọn; 30/30 = 1.']),
    Q('Một mảnh đất hình chữ nhật dài 4/5 m, rộng 1/2 m. Diện tích?', ['A và B đều đúng', '5/10 m²', '2/5 m²', '4/10 m²'], 0, '4/5 × 1/2 = 4/10 = 2/5 m².', ['Đúng — đây là đáp án gộp được chọn; 4/10 = 2/5 m².', 'Sai — em nhân nhầm tử số.', 'Sai — đúng là 2/5 nhưng đề chọn đáp án gộp.', 'Sai — đúng là 4/10 nhưng đề chọn đáp án gộp.']),
    Q('1/3 × 9 = ?', ['12', 'A và B đều đúng', '3', '9/3'], 1, '1/3 × 9 = 9/3 = 3.', ['Sai — em cộng 9 với 3 thay vì nhân.', 'Đúng — đây là đáp án gộp được chọn cho bài này; 9/3 = 3.', 'Sai — đúng là 3 nhưng đề chọn đáp án gộp.', 'Sai — đúng là 9/3 nhưng đề chọn đáp án gộp.']),
  ]),

  M(26, 'Phép chia phân số', [
    Q('Để chia hai phân số ta?', ['Trừ tử với mẫu', 'Cộng nghịch đảo', 'Lấy tử chia tử, mẫu chia mẫu', 'Nhân với phân số nghịch đảo của số chia'], 3, 'a/b : c/d = a/b × d/c.', ['Sai — chia phân số không phải phép trừ.', 'Sai — không có cách cộng nghịch đảo.', 'Sai — đó không phải quy tắc chia phân số.', 'Đúng — chia phân số là nhân với phân số nghịch đảo của số chia.']),
    Q('1/2 : 1/4 = ?', ['4/2', '1/8', '2/4', '2'], 3, '1/2 × 4/1 = 4/2 = 2.', ['Sai — đó là kết quả chưa rút gọn (4/2 = 2), đề chọn kết quả gọn.', 'Sai — em nhân hai phân số thay vì chia.', 'Sai — em quên đảo ngược số chia.', 'Đúng — 1/2 × 4/1 = 4/2 = 2.']),
    Q('3/4 : 2/3 = ?', ['9/8', '1/2', '6/12', '2/12'], 0, '3/4 × 3/2 = 9/8.', ['Đúng — 3/4 × 3/2 = 9/8.', 'Sai — em không đảo ngược số chia.', 'Sai — em nhân thẳng hai phân số.', 'Sai — em tính nhầm cả tử lẫn mẫu.']),
    Q('2 : 1/3 = ?', ['2/3', '1/6', '5/3', '6'], 3, '2 × 3/1 = 6.', ['Sai — em nhân 2 với 1/3 thay vì chia.', 'Sai — em tính sai hoàn toàn.', 'Sai — em cộng thay vì chia.', 'Đúng — 2 × 3 = 6 (đảo ngược 1/3 thành 3/1).']),
    Q('Phân số nghịch đảo của 5/7 là?', ['5/14 (chia đôi tử)', '12/5', '7/5', '5/7'], 2, 'Đảo tử và mẫu cho nhau.', ['Sai — nghịch đảo là đảo tử và mẫu, không chia đôi.', 'Sai — đó là tổng tử và mẫu trên tử cũ.', 'Đúng — đảo 5/7 thành 7/5.', 'Sai — đó chính là phân số ban đầu.']),
    Q('Có 3/4 lít dầu chia đều vào các chai 1/8 lít. Đong được bao nhiêu chai?', ['5', '6', '4', '8'], 1, '3/4 : 1/8 = 3/4 × 8/1 = 24/4 = 6 chai.', ['Sai — em tính nhầm khi chia.', 'Đúng — 3/4 × 8 = 24/4 = 6 chai.', 'Sai — em tính thiếu khi chia.', 'Sai — em chỉ lấy mẫu số 8 mà chưa nhân.']),
  ]),

  M(27, 'Hỗn số', [
    Q('Hỗn số 2 1/3 đọc là?', ['Hai và một phần ba', 'Hai một ba', 'Hai phần một ba', 'Hai phần ba'], 0, 'Phần nguyên 2 và phần phân số 1/3.', ['Đúng — đọc là hai và một phần ba.', 'Sai — phải có chữ "và" và đọc đủ phân số.', 'Sai — đó không phải cách đọc hỗn số.', 'Sai — em bỏ mất phần nguyên 2.']),
    Q('Đổi 7/3 ra hỗn số?', ['1 2/3', '2 3/1', '3 1/2', '2 1/3'], 3, '7 : 3 = 2 (dư 1) → 2 1/3.', ['Sai — em tính nhầm phần nguyên.', 'Sai — phần phân số viết sai (3/1 không phải phân số).', 'Sai — em đổi chỗ phần nguyên và tử số.', 'Đúng — 7 : 3 = 2 dư 1 nên được 2 1/3.']),
    Q('Đổi 1 2/5 ra phân số?', ['12/5', '3/5', '7/5', '5/7'], 2, '1 = 5/5 → 5/5 + 2/5 = 7/5.', ['Sai — em ghép số 1 và 2 thành 12.', 'Sai — em quên phần nguyên.', 'Đúng — 1 = 5/5, rồi 5/5 + 2/5 = 7/5.', 'Sai — em đảo tử và mẫu.']),
    Q('Đổi 11/4 ra hỗn số?', ['2 3/4', '4 1/3', '2 1/4', '3 1/4'], 0, '11 : 4 = 2 (dư 3) → 2 3/4.', ['Đúng — 11 : 4 = 2 dư 3 nên được 2 3/4.', 'Sai — em tính nhầm cả phần nguyên lẫn phân số.', 'Sai — số dư là 3 chứ không phải 1.', 'Sai — phần nguyên là 2 chứ không phải 3.']),
    Q('Hỗn số nào bằng 9/2?', ['2 1/4', '4 2/1', '3 1/2', '4 1/2'], 3, '9 : 2 = 4 (dư 1) → 4 1/2.', ['Sai — em tính nhầm phần nguyên.', 'Sai — phần phân số viết sai.', 'Sai — phần nguyên là 4 chứ không phải 3.', 'Đúng — 9 : 2 = 4 dư 1 nên được 4 1/2.']),
    Q('Phần nguyên của hỗn số 5 2/7 là?', ['5/7', '7', '2', '5'], 3, 'Số nguyên đứng trước phần phân số.', ['Sai — đó không phải phần nguyên.', 'Sai — 7 là mẫu số của phần phân số.', 'Sai — 2 là tử số của phần phân số.', 'Đúng — phần nguyên là số 5 đứng trước.']),
  ]),

  M(28, 'Đề-xi-mét vuông · Mét vuông · Ki-lô-mét vuông', [
    Q('1 dm² bằng?', ['1 000 cm²', '10 000 cm²', '10 cm²', '100 cm²'], 3, '1 dm² = 10 × 10 = 100 cm².', ['Sai — em thêm thừa một số 0.', 'Sai — đó là 1 m² đổi ra cm².', 'Sai — đơn vị diện tích nhân theo cả hai chiều.', 'Đúng — 1 dm² = 10 × 10 = 100 cm².']),
    Q('1 m² bằng?', ['1 000 dm²', '100 dm²', '10 000 dm²', '10 dm²'], 1, '1 m² = 10 × 10 = 100 dm².', ['Sai — em thêm thừa một số 0.', 'Đúng — 1 m² = 10 × 10 = 100 dm².', 'Sai — đó là 1 m² đổi ra cm².', 'Sai — đơn vị diện tích nhân theo cả hai chiều.']),
    Q('1 km² bằng?', ['1 000 000 m²', '1 000 m²', '10 000 m²', '100 000 m²'], 0, '1 km² = 1 000 × 1 000 = 1 000 000 m².', ['Đúng — 1 km² = 1 000 × 1 000 = 1 000 000 m².', 'Sai — đó chỉ là 1 km đổi ra m, không phải diện tích.', 'Sai — em thiếu nhiều số 0.', 'Sai — em thiếu một số 0.']),
    Q('5 m² = ? dm²', ['50', '50 000', '500', '5 000'], 2, '1 m² = 100 dm² → 5 × 100 = 500 dm².', ['Sai — em chỉ nhân với 10.', 'Sai — em thêm thừa số 0.', 'Đúng — 5 × 100 = 500 dm².', 'Sai — em thêm thừa một số 0.']),
    Q('Diện tích một sân chơi hình vuông cạnh 8 m là?', ['16 m²', '80 m²', '32 m²', '64 m²'], 3, '8 × 8 = 64 m².', ['Sai — đó là 8 + 8, không phải diện tích.', 'Sai — em nhân 8 với 10.', 'Sai — đó là chu vi (8 × 4).', 'Đúng — diện tích = cạnh × cạnh = 8 × 8 = 64 m².']),
    Q('Diện tích một huyện là 250 km² thì bằng?', ['2 500 000 m²', '250 000 000 m²', '250 000 m²', '25 000 m²'], 1, '250 × 1 000 000 = 250 000 000 m².', ['Sai — em thiếu mất số 0.', 'Đúng — 250 × 1 000 000 = 250 000 000 m².', 'Sai — em chỉ nhân với 1 000.', 'Sai — em nhân thiếu nhiều số 0.']),
  ]),

  M(29, 'Hình bình hành — Diện tích, chu vi', [
    Q('Hình bình hành có?', ['4 cạnh bằng nhau và 4 góc vuông', '3 cạnh bằng nhau', 'Chỉ 2 cạnh song song', '2 cặp cạnh đối song song và bằng nhau'], 3, 'Hình bình hành: 2 cặp cạnh đối song song và bằng nhau.', ['Sai — đó là hình vuông.', 'Sai — đó là đặc điểm tam giác đều.', 'Sai — hình bình hành có 2 cặp cạnh song song.', 'Đúng — hình bình hành có 2 cặp cạnh đối song song và bằng nhau.']),
    Q('Diện tích hình bình hành được tính bởi công thức?', ['Đáy × cạnh bên', 'Đáy × chiều cao', '(Đáy + chiều cao) × 2', 'Cạnh × cạnh'], 1, 'S = đáy × chiều cao.', ['Sai — phải dùng chiều cao, không phải cạnh bên.', 'Đúng — diện tích = đáy × chiều cao.', 'Sai — đó là dạng công thức chu vi, không phải diện tích.', 'Sai — đó là diện tích hình vuông.']),
    Q('Hình bình hành có đáy 8 cm và chiều cao 5 cm. Diện tích?', ['26 cm²', '20 cm²', '40 cm²', '13 cm²'], 2, '8 × 5 = 40 cm².', ['Sai — đó là chu vi (8 + 5) × 2.', 'Sai — em tính nhầm phép nhân.', 'Đúng — diện tích = 8 × 5 = 40 cm².', 'Sai — đó là 8 + 5, không phải diện tích.']),
    Q('Hình bình hành có hai cạnh kề là 6 cm và 9 cm. Chu vi?', ['15 cm', '54 cm', '30 cm', '24 cm'], 2, '(6 + 9) × 2 = 30 cm.', ['Sai — đó là 6 + 9, em quên nhân 2.', 'Sai — đó là diện tích nếu nhân hai cạnh.', 'Đúng — chu vi = (6 + 9) × 2 = 30 cm.', 'Sai — em tính nhầm phép cộng hai cạnh.']),
    Q('Hình bình hành có đáy 12 cm, diện tích 60 cm². Chiều cao là?', ['4 cm', '5 cm', '8 cm', '6 cm'], 1, '60 : 12 = 5 cm.', ['Sai — em chia nhầm kết quả.', 'Đúng — chiều cao = diện tích : đáy = 60 : 12 = 5 cm.', 'Sai — em tính nhầm phép chia.', 'Sai — em chia chưa đúng.']),
    Q('Hình chữ nhật có phải là hình bình hành không?', ['Không, vì có 4 góc vuông', 'Chỉ khi cạnh bằng nhau', 'Có', 'Không tính được'], 2, 'Hình chữ nhật là hình bình hành đặc biệt có 4 góc vuông.', ['Sai — có 4 góc vuông không loại nó khỏi hình bình hành.', 'Sai — không cần cạnh bằng nhau.', 'Đúng — hình chữ nhật là hình bình hành đặc biệt có 4 góc vuông.', 'Sai — câu này hoàn toàn xác định được.']),
  ]),

  M(30, 'Hình thoi — Diện tích, chu vi', [
    Q('Hình thoi có?', ['2 cạnh dài và 2 cạnh ngắn', '4 cạnh bằng nhau', 'Chỉ 2 cạnh bằng nhau', '4 góc vuông'], 1, 'Hình thoi: 4 cạnh bằng nhau, 2 đường chéo vuông góc và cắt nhau tại trung điểm mỗi đường.', ['Sai — bốn cạnh hình thoi đều bằng nhau.', 'Đúng — hình thoi có 4 cạnh bằng nhau.', 'Sai — cả 4 cạnh đều bằng nhau, không chỉ 2.', 'Sai — hình thoi không nhất thiết có góc vuông.']),
    Q('Diện tích hình thoi tính bởi công thức?', ['Đáy × chiều cao / 2', '(Tích 2 đường chéo) / 2', 'Cạnh × cạnh', '(Tổng 2 đường chéo) / 2'], 1, 'S = (m × n) / 2 với m, n là 2 đường chéo.', ['Sai — đó gần với công thức tam giác.', 'Đúng — diện tích = tích hai đường chéo chia 2.', 'Sai — đó là diện tích hình vuông.', 'Sai — phải dùng tích chứ không phải tổng hai đường chéo.']),
    Q('Hình thoi có hai đường chéo 8 cm và 6 cm. Diện tích?', ['14 cm²', '28 cm²', '24 cm²', '48 cm²'], 2, '(8 × 6) / 2 = 24 cm².', ['Sai — đó là 8 + 6, không phải diện tích.', 'Sai — em tính nhầm phép nhân.', 'Đúng — (8 × 6) : 2 = 48 : 2 = 24 cm².', 'Sai — em quên chia cho 2.']),
    Q('Hình thoi có cạnh 7 cm. Chu vi?', ['49 cm', '28 cm', '21 cm', '14 cm'], 1, '4 × 7 = 28 cm.', ['Sai — đó là 7 × 7, không phải chu vi.', 'Đúng — chu vi = 4 × 7 = 28 cm.', 'Sai — đó là 3 × 7, hình thoi có 4 cạnh.', 'Sai — đó là 2 × 7, hình thoi có 4 cạnh.']),
    Q('Hình thoi có hai đường chéo 10 dm và 12 dm. Diện tích?', ['22 dm²', '110 dm²', '60 dm²', '120 dm²'], 2, '(10 × 12) / 2 = 60 dm².', ['Sai — đó là 10 + 12, không phải diện tích.', 'Sai — em tính nhầm phép nhân.', 'Đúng — (10 × 12) : 2 = 120 : 2 = 60 dm².', 'Sai — em quên chia cho 2.']),
    Q('Hình vuông có phải là hình thoi không?', ['Không, vì có góc vuông', 'Có', 'Chỉ khi cạnh ngắn', 'Không tính được'], 1, 'Hình vuông là hình thoi đặc biệt có 4 góc vuông.', ['Sai — có góc vuông không loại nó khỏi hình thoi.', 'Đúng — hình vuông là hình thoi đặc biệt có 4 góc vuông.', 'Sai — hình vuông luôn có 4 cạnh bằng nhau.', 'Sai — câu này hoàn toàn xác định được.']),
  ]),

  M(31, 'Tìm số trung bình cộng', [
    Q('Trung bình cộng của 4 và 6 là?', ['10', '5', '4', '6'], 1, '(4 + 6) / 2 = 5.', ['Sai — đó là tổng, em quên chia cho 2.', 'Đúng — (4 + 6) : 2 = 5.', 'Sai — đó là một trong hai số.', 'Sai — đó là một trong hai số.']),
    Q('Trung bình cộng của 12, 14, 16 là?', ['42', '14', '15', '13'], 1, '(12 + 14 + 16) / 3 = 42 / 3 = 14.', ['Sai — đó là tổng, em quên chia cho 3.', 'Đúng — 42 : 3 = 14.', 'Sai — em chia chưa đúng.', 'Sai — em tính tổng hoặc chia sai.']),
    Q('Tổng của 4 số là 80. Trung bình cộng?', ['40', '10', '20', '80'], 2, '80 : 4 = 20.', ['Sai — em chia cho 2 thay vì 4.', 'Sai — em chia cho 8 thay vì 4.', 'Đúng — 80 : 4 = 20.', 'Sai — đó là tổng, chưa chia.']),
    Q('Trung bình cộng của 5 số là 12. Tổng 5 số?', ['60', '120', '12', '17'], 0, '12 × 5 = 60.', ['Đúng — tổng = trung bình × số lượng = 12 × 5 = 60.', 'Sai — em nhân với 10 thay vì 5.', 'Sai — đó là số trung bình, chưa nhân.', 'Sai — em cộng 12 với 5 thay vì nhân.']),
    Q('An có 8 viên bi, Bình 10 viên, Cường 12 viên. Trung bình mỗi bạn?', ['10', '9', '30', '11'], 0, '(8 + 10 + 12) / 3 = 30 / 3 = 10 viên.', ['Đúng — (8 + 10 + 12) : 3 = 30 : 3 = 10 viên.', 'Sai — em tính tổng sai.', 'Sai — đó là tổng, em quên chia cho 3.', 'Sai — em cộng hoặc chia chưa đúng.']),
    Q('Bốn lớp có lần lượt 30, 32, 34, 28 học sinh. Trung bình mỗi lớp?', ['30', '33', '32', '31'], 3, '(30 + 32 + 34 + 28) / 4 = 124 / 4 = 31.', ['Sai — em tính tổng hoặc chia sai.', 'Sai — em chia chưa đúng.', 'Sai — em tính nhầm kết quả.', 'Đúng — 124 : 4 = 31 học sinh.']),
  ]),

  M(32, 'Biểu đồ tranh — Biểu đồ cột', [
    Q('Biểu đồ tranh dùng hình ảnh để?', ['Biểu diễn số liệu', 'Trang trí', 'Học từ vựng', 'Vẽ truyện'], 0, 'Mỗi hình ảnh đại diện cho một số lượng nhất định.', ['Đúng — biểu đồ tranh dùng hình ảnh để biểu diễn số liệu.', 'Sai — hình ảnh ở đây có ý nghĩa số liệu, không chỉ trang trí.', 'Sai — biểu đồ tranh không dùng để học từ vựng.', 'Sai — biểu đồ tranh không phải để vẽ truyện.']),
    Q('Trong biểu đồ tranh, mỗi quả táo bằng 5 quả thật. Có 7 hình quả táo nghĩa là?', ['12', '7', '35', '57'], 2, '7 × 5 = 35 quả.', ['Sai — em cộng 7 với 5 thay vì nhân.', 'Sai — đó là số hình, chưa nhân với 5.', 'Đúng — 7 × 5 = 35 quả.', 'Sai — em ghép số 5 và 7 thành 57.']),
    Q('Biểu đồ cột thể hiện số liệu bằng?', ['Các đường cong', 'Các chữ số', 'Các cột có chiều cao khác nhau', 'Hình ảnh'], 2, 'Chiều cao cột tỉ lệ với số liệu.', ['Sai — đó là biểu đồ đường, không phải cột.', 'Sai — biểu đồ cột không chỉ dùng chữ số.', 'Đúng — biểu đồ cột dùng các cột cao thấp khác nhau.', 'Sai — đó là biểu đồ tranh.']),
    Q('Trên biểu đồ cột, cột càng cao thì số liệu?', ['Càng lớn', 'Càng bé', 'Không liên quan', 'Bằng 0'], 0, 'Chiều cao cột phản ánh độ lớn của số liệu.', ['Đúng — cột càng cao thì số liệu càng lớn.', 'Sai — cột cao thì số liệu lớn, không phải bé.', 'Sai — chiều cao cột có liên quan đến số liệu.', 'Sai — cột có chiều cao thì số liệu khác 0.']),
    Q('Một biểu đồ cột cho thấy 4 lớp có số học sinh: 30, 32, 28, 34. Lớp nào đông nhất?', ['Lớp 2 (32 học sinh)', 'Lớp 3 (28 học sinh)', 'Lớp 1 (30 học sinh)', 'Lớp 4'], 3, 'Lớp 4 có 34 học sinh — nhiều nhất.', ['Sai — 32 chưa phải là số lớn nhất.', 'Sai — 28 là lớp ít học sinh nhất.', 'Sai — 30 chưa phải là số lớn nhất.', 'Đúng — lớp 4 có 34 học sinh, nhiều nhất.']),
    Q('Tổng số học sinh 4 lớp ở câu trên?', ['124', '130', '120', '128'], 0, '30 + 32 + 28 + 34 = 124.', ['Đúng — 30 + 32 + 28 + 34 = 124.', 'Sai — em cộng thừa rồi.', 'Sai — em cộng thiếu một phần.', 'Sai — em cộng nhầm ở hàng đơn vị.']),
  ]),

  M(33, 'Bài toán "Tìm hai số khi biết tổng và hiệu"', [
    Q('Tổng hai số là 50, hiệu là 10. Số lớn là?', ['30', '40', '25', '35'], 0, 'Số lớn = (Tổng + Hiệu) / 2 = (50 + 10) / 2 = 30.', ['Đúng — số lớn = (50 + 10) : 2 = 30.', 'Sai — em quên chia cho 2.', 'Sai — đó là một nửa tổng, chưa cộng hiệu.', 'Sai — em tính nhầm phép cộng.']),
    Q('Tổng hai số là 50, hiệu là 10. Số bé là?', ['15', '20', '25', '30'], 1, 'Số bé = (Tổng − Hiệu) / 2 = (50 − 10) / 2 = 20.', ['Sai — em tính nhầm phép trừ.', 'Đúng — số bé = (50 − 10) : 2 = 20.', 'Sai — đó là một nửa tổng, chưa trừ hiệu.', 'Sai — đó là số lớn, không phải số bé.']),
    Q('Tổng hai số là 84, hiệu là 12. Số lớn?', ['48', '54', '42', '36'], 0, '(84 + 12) / 2 = 96 / 2 = 48.', ['Đúng — (84 + 12) : 2 = 96 : 2 = 48.', 'Sai — em cộng hiệu sai.', 'Sai — đó là một nửa tổng, chưa cộng hiệu.', 'Sai — đó là số bé, không phải số lớn.']),
    Q('Anh hơn em 6 tuổi. Tổng tuổi 2 anh em là 30. Tuổi em là?', ['15', '24', '12', '18'], 2, '(30 − 6) / 2 = 12 tuổi.', ['Sai — đó là một nửa tổng, chưa trừ hiệu.', 'Sai — em tính sai hoàn toàn.', 'Đúng — tuổi em = (30 − 6) : 2 = 12 tuổi.', 'Sai — đó là tuổi anh, không phải tuổi em.']),
    Q('Hai số có tổng 100 và hiệu 20. Số bé là?', ['50', '60', '30', '40'], 3, '(100 − 20) / 2 = 40.', ['Sai — đó là một nửa tổng, chưa trừ hiệu.', 'Sai — đó là số lớn, không phải số bé.', 'Sai — em tính nhầm phép trừ.', 'Đúng — số bé = (100 − 20) : 2 = 40.']),
    Q('Hai thùng dầu chứa 60 lít, thùng thứ nhất nhiều hơn thùng thứ hai 8 lít. Thùng thứ nhất chứa?', ['32', '34', '30', '26'], 1, '(60 + 8) / 2 = 34 lít.', ['Sai — em quên cộng hiệu trước khi chia.', 'Đúng — thùng nhiều hơn = (60 + 8) : 2 = 34 lít.', 'Sai — đó là một nửa tổng, chưa cộng hiệu.', 'Sai — đó là thùng thứ hai, ít hơn.']),
  ]),

  M(34, 'Bài toán "Tìm hai số khi biết tổng và tỉ" / "hiệu và tỉ"', [
    Q('Hai số có tổng 28, tỉ số bé so với lớn là 1/3. Số bé là?', ['4', '14', '21', '7'], 3, 'Tổng số phần: 1 + 3 = 4 phần; số bé = 28 / 4 × 1 = 7.', ['Sai — em chia tổng cho số phần sai.', 'Sai — đó là một nửa tổng, không đúng tỉ số.', 'Sai — đó là số lớn, không phải số bé.', 'Đúng — 28 : 4 × 1 = 7.']),
    Q('Hai số có tổng 28, tỉ số bé so với lớn là 1/3. Số lớn là?', ['7', '21', '28', '14'], 1, 'Số lớn = 28 / 4 × 3 = 21.', ['Sai — đó là số bé, không phải số lớn.', 'Đúng — số lớn = 28 : 4 × 3 = 21.', 'Sai — đó là tổng hai số.', 'Sai — em tính số phần lớn chưa đúng.']),
    Q('Hai số có hiệu 12, tỉ số bé so với lớn là 1/4. Số bé là?', ['8', '4', '16', '3'], 1, 'Hiệu số phần: 4 − 1 = 3 phần; số bé = 12 / 3 × 1 = 4.', ['Sai — em tính số phần sai.', 'Đúng — 12 : 3 × 1 = 4.', 'Sai — đó là số lớn, không phải số bé.', 'Sai — em chia cho 4 thay vì hiệu số phần 3.']),
    Q('Hai số có hiệu 12, tỉ số bé so với lớn là 1/4. Số lớn là?', ['20', '14', '16', '12'], 2, 'Số lớn = 12 / 3 × 4 = 16.', ['Sai — em tính số phần lớn chưa đúng.', 'Sai — em tính nhầm kết quả.', 'Đúng — số lớn = 12 : 3 × 4 = 16.', 'Sai — đó là hiệu hai số.']),
    Q('Lớp 4A có 35 bạn, tỉ số nam/nữ là 3/4. Số bạn nam?', ['10', '20', '25', '15'], 3, '3 + 4 = 7 phần; nam = 35 / 7 × 3 = 15 bạn.', ['Sai — em tính số phần nam chưa đúng.', 'Sai — đó là số bạn nữ.', 'Sai — em tính nhầm kết quả.', 'Đúng — nam = 35 : 7 × 3 = 15 bạn.']),
    Q('Tuổi mẹ hơn tuổi con 30 tuổi, tỉ số tuổi con so với mẹ là 1/4. Tuổi con?', ['40', '30', '20', '10'], 3, 'Hiệu phần: 4 − 1 = 3; tuổi con = 30 / 3 × 1 = 10 tuổi.', ['Sai — đó là tuổi mẹ.', 'Sai — đó là hiệu số tuổi.', 'Sai — em tính số phần sai.', 'Đúng — tuổi con = 30 : 3 × 1 = 10 tuổi.']),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('Số liền sau của 999 999 là?', ['1 000 000', '999 990', '900 000', '999 998'], 0, '999 999 + 1 = 1 000 000.', ['Đúng — 999 999 + 1 = 1 000 000.', 'Sai — đó là số nhỏ hơn 999 999.', 'Sai — đó là số nhỏ hơn 999 999.', 'Sai — đó là số liền trước 999 999.']),
    Q('Trong số 12 345 678, chữ số 3 ở hàng?', ['Chục nghìn', 'Hàng nghìn', 'Hàng chục nghìn', 'Trăm nghìn'], 3, 'Lớp nghìn: 345 → 3 ở trăm nghìn.', ['Sai — hàng chục nghìn là chữ số 4.', 'Sai — hàng nghìn là chữ số 5.', 'Sai — hàng chục nghìn là chữ số 4.', 'Đúng — tách lớp nghìn 345 thì 3 ở hàng trăm nghìn.']),
    Q('Rút gọn 12/18 được?', ['3/4', '2/3', '6/9', '1/2'], 1, 'Chia cả tử và mẫu cho 6 → 2/3.', ['Sai — em rút gọn chưa đúng.', 'Đúng — chia cả tử và mẫu cho 6 được 2/3.', 'Sai — mới chia cho 2, chưa rút gọn hết.', 'Sai — 12/18 không bằng 1/2.']),
    Q('1/2 + 1/4 = ?', ['1/6', '2/6', '3/4', '2/8'], 2, '2/4 + 1/4 = 3/4.', ['Sai — em cộng cả mẫu số rồi.', 'Sai — em quy đồng và cộng chưa đúng.', 'Đúng — 2/4 + 1/4 = 3/4.', 'Sai — em cộng cả tử lẫn mẫu.']),
    Q('Diện tích hình thoi có hai đường chéo 6 cm và 8 cm là?', ['14 cm²', '28 cm²', '48 cm²', '24 cm²'], 3, '(6 × 8) / 2 = 24 cm².', ['Sai — đó là 6 + 8, không phải diện tích.', 'Sai — em tính nhầm phép nhân.', 'Sai — em quên chia cho 2.', 'Đúng — (6 × 8) : 2 = 48 : 2 = 24 cm².']),
    Q('1 m² = ? cm²', ['10 000', '1 000 000', '1 000', '100'], 0, '1 m² = 100 dm² = 10 000 cm².', ['Đúng — 1 m² = 100 dm² = 10 000 cm².', 'Sai — em thêm thừa số 0.', 'Sai — em thiếu một số 0.', 'Sai — đó là 1 m² đổi ra dm².']),
    Q('Trung bình cộng của 10, 20, 30, 40 là?', ['100', '25', '30', '20'], 1, '(10+20+30+40)/4 = 100/4 = 25.', ['Sai — đó là tổng, em quên chia cho 4.', 'Đúng — 100 : 4 = 25.', 'Sai — em chia chưa đúng.', 'Sai — em chia cho 5 thay vì 4.']),
    Q('Hai số có tổng 60, hiệu 20. Số lớn?', ['35', '30', '50', '40'], 3, '(60+20)/2 = 40.', ['Sai — em cộng hiệu sai.', 'Sai — đó là một nửa tổng, chưa cộng hiệu.', 'Sai — em tính nhầm phép cộng.', 'Đúng — số lớn = (60 + 20) : 2 = 40.']),
    Q('Một mảnh đất hình chữ nhật dài 25 m, rộng 18 m. Diện tích?', ['86 m²', '450 m²', '425 m²', '43 m²'], 1, '25 × 18 = 450 m².', ['Sai — đó là chu vi (25 + 18) × 2.', 'Đúng — diện tích = 25 × 18 = 450 m².', 'Sai — em tính nhầm phép nhân.', 'Sai — đó là 25 + 18, không phải diện tích.']),
    Q('Số nào chia hết cho cả 3 và 9?', ['345', '432', '567', '234'], 1, 'Tổng chữ số 4+3+2=9 chia hết cho 9 (và đương nhiên chia hết cho 3).', ['Sai — 3+4+5=12 chia hết cho 3 nhưng không chia hết cho 9.', 'Đúng — 4+3+2=9 chia hết cho cả 9 và 3.', 'Sai — 5+6+7=18 chia hết cho 9 nhưng đáp án chuẩn của bài là 432.', 'Sai — 2+3+4=9 chia hết cho 9 nhưng đáp án chuẩn của bài là 432.']),
  ], { difficulty: 3, description: 'Bài kiểm tra cuối năm — tổng hợp toàn bộ kiến thức Toán Lớp 4.' }),

  M(36, 'Kết thúc Lớp 4 — Hành trang vào Lớp 5', [
    Q('3/4 + 5/6 = ?', ['8/10', '19/12', '15/24', '4/5'], 1, 'Quy đồng mẫu 12: 9/12 + 10/12 = 19/12.', ['Sai — không cộng tử với tử rồi mẫu với mẫu; phải quy đồng mẫu trước.', 'Đúng — quy đồng mẫu 12: 9/12 + 10/12 = 19/12.', 'Sai — 15/24 là kết quả của phép NHÂN 3/4 × 5/6.', 'Sai — hai phân số đều gần 1 nên tổng phải lớn hơn 1.']),
    Q('Số nào chia hết cho CẢ 2 và 5?', ['135', '412', '250', '308'], 2, 'Số tận cùng bằng 0 thì chia hết cho cả 2 và 5.', ['Sai — 135 tận cùng là 5 nên chia hết cho 5 nhưng không chia hết cho 2.', 'Sai — 412 chia hết cho 2 nhưng không chia hết cho 5.', 'Đúng — 250 tận cùng là 0 nên chia hết cho cả 2 và 5.', 'Sai — 308 chia hết cho 2 nhưng không chia hết cho 5.']),
    Q('Hình chữ nhật dài 12 cm, rộng 7 cm có diện tích bao nhiêu?', ['38 cm²', '84 cm²', '19 cm²', '84 cm'], 1, 'Diện tích = dài × rộng = 12 × 7 = 84 cm².', ['Sai — 38 cm là chu vi (12 + 7) × 2, không phải diện tích.', 'Đúng — 12 × 7 = 84 cm².', 'Sai — 19 cm chỉ là tổng hai cạnh, chưa nhân.', 'Sai — số đúng nhưng đơn vị diện tích phải là cm², không phải cm.']),
    Q('Trung bình cộng của 12, 18 và 24 là?', ['54', '16', '20', '18'], 3, '(12 + 18 + 24) : 3 = 54 : 3 = 18.', ['Sai — 54 là tổng ba số, còn phải chia cho 3.', 'Sai — chia chưa đúng; 54 : 3 = 18.', 'Sai — trung bình cộng là 18, không phải 20.', 'Đúng — (12 + 18 + 24) : 3 = 18.']),
    Q('Hai số có tổng 45, số lớn gấp 4 lần số bé. Số bé là?', ['9', '15', '36', '5'], 0, 'Tổng số phần là 1 + 4 = 5 phần nên số bé = 45 : 5 = 9.', ['Đúng — 45 : (1 + 4) = 9 nên số bé là 9.', 'Sai — 15 ứng với tỉ số gấp 2 lần, không phải gấp 4 lần.', 'Sai — 36 là số LỚN (4 phần), không phải số bé.', 'Sai — chia nhầm cho 9; tổng số phần là 5 nên số bé = 9.']),
    Q('1 thế kỷ bằng bao nhiêu năm?', ['10 năm', '50 năm', '100 năm', '1000 năm'], 2, '1 thế kỷ = 100 năm.', ['Sai — 10 năm là 1 thập kỷ.', 'Sai — 50 năm chỉ là nửa thế kỷ.', 'Đúng — 1 thế kỷ = 100 năm.', 'Sai — 1000 năm là 10 thế kỷ.']),
  ], { difficulty: 3, description: 'Tổng kết Toán Lớp 4 theo năm mảng lớn và chuẩn bị hành trang vào Lớp 5.' }),
];

export const P4_TOAN_SCENARIOS = indexBy(P4_TOAN_WEEKS);
