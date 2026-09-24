// ============================================================
// Lớp 3 · TOÁN — 35 tuần (HK1: 1–18 · HK2: 19–35)
// Bám SGK GDPT 2018 (Cánh Diều / Kết nối / Chân trời).
// ID prefix: "P3-wNN-quiz" → trùng prefix module "P3".
// ============================================================
import { Q, W, indexBy } from './_helper.js';

const M = (n, title, qs, opts) => W('P3', 'toan', n, title, qs, opts);

export const P3_TOAN_WEEKS = [
  // ──────────────── HK1 ────────────────
  M(1, 'Ôn tập về số đến 100', [
    Q('Số liền trước của 100 là?', ['99', '98', '101', '90'], 0, '100 − 1 = 99.', [
      'Đúng — số liền trước là số bé hơn 1 đơn vị: 100 − 1 = 99.',
      'Sai — 98 là số liền trước của 99, không phải của 100.',
      'Sai — 101 là số liền SAU 100, vì nó lớn hơn 1 đơn vị.',
      'Sai — 90 cách 100 tới 10 đơn vị, không phải liền trước.',
    ]),
    Q('Số nào lớn nhất trong: 78, 87, 80, 88?', ['88', '78', '80', '87'], 0, 'So sánh: 78 < 80 < 87 < 88.', [
      'Đúng — 88 có hàng chục là 8 và hàng đơn vị là 8, lớn nhất.',
      'Sai — 78 có hàng chục là 7 nên bé hơn các số có hàng chục 8.',
      'Sai — 80 có hàng đơn vị là 0, bé hơn 87 và 88.',
      'Sai — 87 bé hơn 88 vì hàng đơn vị 7 < 8.',
    ]),
    Q('Số gồm 6 chục và 3 đơn vị là?', ['63', '630', '36', '603'], 0, '6 chục = 60, thêm 3 → 63.', [
      'Đúng — 6 chục là 60, thêm 3 đơn vị thành 63.',
      'Sai — 630 là sáu trăm ba mươi, quá lớn so với đề.',
      'Sai — 36 là 3 chục 6 đơn vị, em đã đảo ngược chục và đơn vị.',
      'Sai — 603 có thêm hàng trăm, không đúng với 6 chục 3 đơn vị.',
    ]),
    Q('45 + 30 = ?', ['48', '75', '85', '78'], 1, '4 chục + 3 chục = 7 chục → 70, thêm 5 → 75.', [
      'Sai — 48 là khi em chỉ cộng 45 với 3 đơn vị, nhưng đề là cộng 30.',
      'Đúng — 4 chục + 3 chục = 7 chục, giữ 5 đơn vị → 75.',
      'Sai — 85 là cộng nhầm thành 4 chục + 4 chục, kiểm tra lại hàng chục.',
      'Sai — 78 là cộng nhầm hàng, hãy cộng đúng chục với chục.',
    ]),
    Q('Số chẵn nào nằm giữa 67 và 71?', ['69', 'Cả 68 và 70', '68', '70'], 1, 'Số chẵn giữa 67 và 71: 68 và 70.', [
      'Sai — 69 là số lẻ, không phải số chẵn.',
      'Đúng — giữa 67 và 71 có hai số chẵn là 68 và 70.',
      'Sai — 68 đúng là số chẵn nhưng còn thiếu 70.',
      'Sai — 70 đúng là số chẵn nhưng còn thiếu 68.',
    ]),
    Q('Sắp xếp giảm dần: 56, 65, 50, 60', ['65, 56, 60, 50', '50, 56, 60, 65', '65, 60, 56, 50', '60, 65, 56, 50'], 2, '65 > 60 > 56 > 50.', [
      'Sai — 56 không thể đứng trước 60 vì 56 bé hơn 60.',
      'Sai — đây là thứ tự tăng dần (bé đến lớn), không phải giảm dần.',
      'Đúng — giảm dần là từ lớn đến bé: 65 > 60 > 56 > 50.',
      'Sai — số lớn nhất 65 phải đứng đầu, không phải 60.',
    ]),
  ]),

  M(2, 'Ôn tập phép cộng – phép trừ trong phạm vi 100', [
    Q('47 + 35 = ?', ['82', '81', '72', '83'], 0, '7 + 5 = 12 (nhớ 1); 4 + 3 + 1 = 8 → 82.', [
      'Đúng — 7 + 5 = 12 viết 2 nhớ 1; 4 + 3 + 1 = 8 → 82.',
      'Sai — 81 là quên cộng đủ, hãy nhớ 1 sang hàng chục.',
      'Sai — 72 là quên cộng nhớ 1 ở hàng chục.',
      'Sai — 83 là cộng dư 1, kiểm tra lại số nhớ.',
    ]),
    Q('83 − 27 = ?', ['46', '56', '54', '66'], 1, '83 − 27 = 56.', [
      'Sai — 46 là trừ thiếu ở hàng chục, hãy mượn cho đúng.',
      'Đúng — 3 không trừ được 7 nên mượn 1 chục: 13 − 7 = 6; 7 − 2 = 5 → 56.',
      'Sai — 54 là tính sai hàng đơn vị, 13 − 7 = 6 chứ không phải 4.',
      'Sai — 66 là quên mượn ở hàng chục.',
    ]),
    Q('Tổng của 36 và 49 là?', ['95', '85', '75', '84'], 1, '36 + 49 = 85.', [
      'Sai — 95 là cộng dư ở hàng chục, kiểm tra lại số nhớ.',
      'Đúng — 6 + 9 = 15 viết 5 nhớ 1; 3 + 4 + 1 = 8 → 85.',
      'Sai — 75 là quên cộng nhớ 1 ở hàng chục.',
      'Sai — 84 là tính sai hàng đơn vị, 6 + 9 = 15 chứ không phải 14.',
    ]),
    Q('Hiệu của 90 và 38 là?', ['58', '42', '62', '52'], 3, '90 − 38 = 52.', [
      'Sai — 58 là trừ thiếu ở hàng chục, hãy mượn cho đúng.',
      'Sai — 42 là tính sai hàng chục sau khi mượn.',
      'Sai — 62 là quên mượn ở hàng chục.',
      'Đúng — 0 không trừ được 8 nên mượn 1 chục: 10 − 8 = 2; 8 − 3 = 5 → 52.',
    ]),
    Q('Lan có 24 nhãn vở, mẹ cho thêm 18. Lan có?', ['41', '42', '52', '32'], 1, '24 + 18 = 42 nhãn vở.', [
      'Sai — 41 là cộng thiếu 1, hãy cộng lại 4 + 8 = 12.',
      'Đúng — cho thêm thì làm phép cộng: 24 + 18 = 42 nhãn vở.',
      'Sai — 52 là cộng dư ở hàng chục, kiểm tra số nhớ.',
      'Sai — 32 là em đã làm phép trừ, nhưng "cho thêm" phải cộng.',
    ]),
    Q('Bể có 60 con cá, bán đi 25 con. Còn?', ['45', '35', '25', '40'], 1, '60 − 25 = 35 con.', [
      'Sai — 45 là trừ thiếu ở hàng chục, hãy mượn cho đúng.',
      'Đúng — bán đi thì làm phép trừ: 60 − 25 = 35 con.',
      'Sai — 25 là số đã bán, không phải số còn lại.',
      'Sai — 40 là tính sai hàng đơn vị sau khi mượn.',
    ]),
  ]),

  M(3, 'Tìm thành phần chưa biết của phép tính', [
    Q('Tìm x: x + 15 = 42', ['x = 25', 'x = 17', 'x = 57', 'x = 27'], 3, 'x = 42 − 15 = 27.', [
      'Sai — 25 là tính sai, hãy lấy 42 − 15.',
      'Sai — 17 là trừ sai, kiểm tra lại 42 − 15.',
      'Sai — 57 là em cộng 42 + 15, nhưng tìm số hạng phải lấy tổng trừ số hạng kia.',
      'Đúng — số hạng chưa biết = tổng − số hạng kia: 42 − 15 = 27.',
    ]),
    Q('Tìm x: x − 8 = 24', ['x = 16', 'x = 18', 'x = 32', 'x = 30'], 2, 'x = 24 + 8 = 32.', [
      'Sai — 16 là em lấy 24 − 8, nhưng tìm số bị trừ phải cộng.',
      'Sai — 18 là tính sai, hãy lấy 24 + 8.',
      'Đúng — số bị trừ = hiệu + số trừ: 24 + 8 = 32.',
      'Sai — 30 là cộng thiếu, 24 + 8 = 32 chứ không phải 30.',
    ]),
    Q('Tìm x: 50 − x = 18', ['x = 32', 'x = 30', 'x = 68', 'x = 28'], 0, 'x = 50 − 18 = 32.', [
      'Đúng — số trừ = số bị trừ − hiệu: 50 − 18 = 32.',
      'Sai — 30 là trừ sai, hãy lấy 50 − 18 cho đúng.',
      'Sai — 68 là em cộng 50 + 18, nhưng tìm số trừ phải lấy số bị trừ trừ hiệu.',
      'Sai — 28 là trừ thiếu, kiểm tra lại 50 − 18.',
    ]),
    Q('Số bị trừ là 70, hiệu là 25. Số trừ là?', ['95', '55', '45', '35'], 2, 'Số trừ = 70 − 25 = 45.', [
      'Sai — 95 là em cộng 70 + 25, nhưng tìm số trừ phải lấy hiệu của chúng.',
      'Sai — 55 là trừ sai, hãy lấy 70 − 25 cho đúng.',
      'Đúng — số trừ = số bị trừ − hiệu: 70 − 25 = 45.',
      'Sai — 35 là trừ thiếu ở hàng chục.',
    ]),
    Q('Hai số có tổng là 60, một số là 24. Số kia là?', ['84', '36', '26', '46'], 1, '60 − 24 = 36.', [
      'Sai — 84 là em cộng 60 + 24, nhưng tìm số kia phải lấy tổng trừ số đã biết.',
      'Đúng — số còn lại = tổng − số đã biết: 60 − 24 = 36.',
      'Sai — 26 là trừ sai ở hàng đơn vị, 60 − 24 = 36.',
      'Sai — 46 là trừ thiếu ở hàng chục.',
    ]),
    Q('Tìm x: x + x = 18', ['x = 6', 'x = 9', 'x = 10', 'x = 8'], 1, '9 + 9 = 18 → x = 9.', [
      'Sai — 6 không đúng vì 6 + 6 = 12 chứ không phải 18.',
      'Đúng — x + x là hai lần x, mà 9 + 9 = 18 nên x = 9.',
      'Sai — 10 không đúng vì 10 + 10 = 20 chứ không phải 18.',
      'Sai — 8 không đúng vì 8 + 8 = 16 chứ không phải 18.',
    ]),
  ]),

  M(4, 'Bảng nhân 2 – Bảng nhân 5 (ôn)', [
    Q('2 × 6 = ?', ['14', '12', '8', '10'], 1, '2 × 6 = 12.', [
      'Sai — 14 là 2 × 7, hãy đếm lại 6 lần số 2.',
      'Đúng — 2 lấy 6 lần bằng 12.',
      'Sai — 8 là 2 × 4, không đủ 6 lần.',
      'Sai — 10 là 2 × 5, còn thiếu một lần 2.',
    ]),
    Q('5 × 7 = ?', ['25', '35', '30', '40'], 1, '5 × 7 = 35.', [
      'Sai — 25 là 5 × 5, chưa đủ 7 lần.',
      'Đúng — 5 lấy 7 lần bằng 35.',
      'Sai — 30 là 5 × 6, còn thiếu một lần 5.',
      'Sai — 40 là 5 × 8, dư một lần 5.',
    ]),
    Q('2 × 9 = ?', ['14', '20', '18', '16'], 2, '2 × 9 = 18.', [
      'Sai — 14 là 2 × 7, chưa đủ 9 lần.',
      'Sai — 20 là 2 × 10, dư một lần 2.',
      'Đúng — 2 lấy 9 lần bằng 18.',
      'Sai — 16 là 2 × 8, còn thiếu một lần 2.',
    ]),
    Q('5 × 8 = ?', ['30', '40', '35', '45'], 1, '5 × 8 = 40.', [
      'Sai — 30 là 5 × 6, chưa đủ 8 lần.',
      'Đúng — 5 lấy 8 lần bằng 40.',
      'Sai — 35 là 5 × 7, còn thiếu một lần 5.',
      'Sai — 45 là 5 × 9, dư một lần 5.',
    ]),
    Q('Mỗi đôi giày có 2 chiếc. 7 đôi có?', ['15', '9', '14', '12'], 2, '2 × 7 = 14 chiếc.', [
      'Sai — 15 là tính nhầm, hãy lấy 2 × 7.',
      'Sai — 9 là em cộng 2 + 7, nhưng đề cần phép nhân.',
      'Đúng — mỗi đôi 2 chiếc, 7 đôi là 2 × 7 = 14 chiếc.',
      'Sai — 12 là 2 × 6, chưa đủ 7 đôi.',
    ]),
    Q('Một bó hoa có 5 bông. 6 bó có?', ['11', '35', '25', '30'], 3, '5 × 6 = 30 bông.', [
      'Sai — 11 là em cộng 5 + 6, nhưng đề cần phép nhân.',
      'Sai — 35 là 5 × 7, nhiều hơn 6 bó.',
      'Sai — 25 là 5 × 5, chưa đủ 6 bó.',
      'Đúng — mỗi bó 5 bông, 6 bó là 5 × 6 = 30 bông.',
    ]),
  ]),

  M(5, 'Bảng nhân 3', [
    Q('3 × 4 = ?', ['14', '10', '15', '12'], 3, '3 × 4 = 12.', [
      'Sai — 14 không có trong bảng nhân 3, hãy đếm lại.',
      'Sai — 10 không phải kết quả của 3 × 4.',
      'Sai — 15 là 3 × 5, dư một lần 3.',
      'Đúng — 3 lấy 4 lần bằng 12.',
    ]),
    Q('3 × 7 = ?', ['24', '20', '18', '21'], 3, '3 × 7 = 21.', [
      'Sai — 24 là 3 × 8, dư một lần 3.',
      'Sai — 20 không có trong bảng nhân 3.',
      'Sai — 18 là 3 × 6, còn thiếu một lần 3.',
      'Đúng — 3 lấy 7 lần bằng 21.',
    ]),
    Q('3 × 9 = ?', ['27', '21', '30', '24'], 0, '3 × 9 = 27.', [
      'Đúng — 3 lấy 9 lần bằng 27.',
      'Sai — 21 là 3 × 7, chưa đủ 9 lần.',
      'Sai — 30 là 3 × 10, dư một lần 3.',
      'Sai — 24 là 3 × 8, còn thiếu một lần 3.',
    ]),
    Q('3 × 5 = ?', ['18', '15', '8', '12'], 1, '3 × 5 = 15.', [
      'Sai — 18 là 3 × 6, dư một lần 3.',
      'Đúng — 3 lấy 5 lần bằng 15.',
      'Sai — 8 là em cộng 3 + 5, nhưng đề cần phép nhân.',
      'Sai — 12 là 3 × 4, chưa đủ 5 lần.',
    ]),
    Q('Một xe đạp 3 bánh. 8 xe có mấy bánh?', ['27', '21', '24', '11'], 2, '3 × 8 = 24 bánh.', [
      'Sai — 27 là 3 × 9, nhiều hơn 8 xe.',
      'Sai — 21 là 3 × 7, chưa đủ 8 xe.',
      'Đúng — mỗi xe 3 bánh, 8 xe là 3 × 8 = 24 bánh.',
      'Sai — 11 là em cộng 3 + 8, nhưng đề cần phép nhân.',
    ]),
    Q('3 × 10 = ?', ['300', '30', '13', '33'], 1, '3 × 10 = 30.', [
      'Sai — 300 là quá lớn, nhân với 10 chỉ thêm một số 0.',
      'Đúng — 3 nhân 10 là thêm một số 0 vào 3 → 30.',
      'Sai — 13 là em cộng 3 + 10, nhưng đề cần phép nhân.',
      'Sai — 33 không phải kết quả của 3 × 10.',
    ]),
  ]),

  M(6, 'Bảng nhân 4', [
    Q('4 × 3 = ?', ['16', '12', '7', '14'], 1, '4 × 3 = 12.', [
      'Sai — 16 là 4 × 4, dư một lần 4.',
      'Đúng — 4 lấy 3 lần bằng 12.',
      'Sai — 7 là em cộng 4 + 3, nhưng đề cần phép nhân.',
      'Sai — 14 không có trong bảng nhân 4.',
    ]),
    Q('4 × 6 = ?', ['20', '28', '10', '24'], 3, '4 × 6 = 24.', [
      'Sai — 20 là 4 × 5, chưa đủ 6 lần.',
      'Sai — 28 là 4 × 7, dư một lần 4.',
      'Sai — 10 là em cộng 4 + 6, nhưng đề cần phép nhân.',
      'Đúng — 4 lấy 6 lần bằng 24.',
    ]),
    Q('4 × 9 = ?', ['28', '32', '36', '40'], 2, '4 × 9 = 36.', [
      'Sai — 28 là 4 × 7, chưa đủ 9 lần.',
      'Sai — 32 là 4 × 8, còn thiếu một lần 4.',
      'Đúng — 4 lấy 9 lần bằng 36.',
      'Sai — 40 là 4 × 10, dư một lần 4.',
    ]),
    Q('4 × 8 = ?', ['32', '28', '24', '36'], 0, '4 × 8 = 32.', [
      'Đúng — 4 lấy 8 lần bằng 32.',
      'Sai — 28 là 4 × 7, chưa đủ 8 lần.',
      'Sai — 24 là 4 × 6, còn thiếu hai lần 4.',
      'Sai — 36 là 4 × 9, dư một lần 4.',
    ]),
    Q('Mỗi bàn xếp 4 ghế. 7 bàn có?', ['24', '11', '28', '32'], 2, '4 × 7 = 28 ghế.', [
      'Sai — 24 là 4 × 6, chưa đủ 7 bàn.',
      'Sai — 11 là em cộng 4 + 7, nhưng đề cần phép nhân.',
      'Đúng — mỗi bàn 4 ghế, 7 bàn là 4 × 7 = 28 ghế.',
      'Sai — 32 là 4 × 8, nhiều hơn 7 bàn.',
    ]),
    Q('4 × 5 = ?', ['9', '20', '15', '25'], 1, '4 × 5 = 20.', [
      'Sai — 9 là em cộng 4 + 5, nhưng đề cần phép nhân.',
      'Đúng — 4 lấy 5 lần bằng 20.',
      'Sai — 15 không có trong bảng nhân 4.',
      'Sai — 25 là 5 × 5, không phải 4 × 5.',
    ]),
  ]),

  M(7, 'Bảng nhân 6', [
    Q('6 × 4 = ?', ['10', '24', '18', '30'], 1, '6 × 4 = 24.', [
      'Sai — 10 là em cộng 6 + 4, nhưng đề cần phép nhân.',
      'Đúng — 6 lấy 4 lần bằng 24.',
      'Sai — 18 là 6 × 3, chưa đủ 4 lần.',
      'Sai — 30 là 6 × 5, dư một lần 6.',
    ]),
    Q('6 × 7 = ?', ['40', '42', '48', '36'], 1, '6 × 7 = 42.', [
      'Sai — 40 không có trong bảng nhân 6.',
      'Đúng — 6 lấy 7 lần bằng 42.',
      'Sai — 48 là 6 × 8, dư một lần 6.',
      'Sai — 36 là 6 × 6, còn thiếu một lần 6.',
    ]),
    Q('6 × 9 = ?', ['48', '45', '60', '54'], 3, '6 × 9 = 54.', [
      'Sai — 48 là 6 × 8, chưa đủ 9 lần.',
      'Sai — 45 không có trong bảng nhân 6.',
      'Sai — 60 là 6 × 10, dư một lần 6.',
      'Đúng — 6 lấy 9 lần bằng 54.',
    ]),
    Q('6 × 8 = ?', ['48', '36', '42', '54'], 0, '6 × 8 = 48.', [
      'Đúng — 6 lấy 8 lần bằng 48.',
      'Sai — 36 là 6 × 6, chưa đủ 8 lần.',
      'Sai — 42 là 6 × 7, còn thiếu một lần 6.',
      'Sai — 54 là 6 × 9, dư một lần 6.',
    ]),
    Q('Mỗi tuần có 6 ngày đi học. 5 tuần có?', ['25', '35', '30', '11'], 2, '6 × 5 = 30 ngày.', [
      'Sai — 25 không phải kết quả của 6 × 5.',
      'Sai — 35 là 5 × 7, không đúng với đề.',
      'Đúng — mỗi tuần 6 ngày học, 5 tuần là 6 × 5 = 30 ngày.',
      'Sai — 11 là em cộng 6 + 5, nhưng đề cần phép nhân.',
    ]),
    Q('6 × 10 = ?', ['66', '60', '600', '16'], 1, '6 × 10 = 60.', [
      'Sai — 66 không phải kết quả của 6 × 10.',
      'Đúng — 6 nhân 10 là thêm một số 0 vào 6 → 60.',
      'Sai — 600 là quá lớn, nhân 10 chỉ thêm một số 0.',
      'Sai — 16 là em cộng 6 + 10, nhưng đề cần phép nhân.',
    ]),
  ]),

  M(8, 'Bảng chia 2 – Bảng chia 5 (ôn)', [
    Q('14 : 2 = ?', ['8', '5', '7', '6'], 2, '2 × 7 = 14 → 14 : 2 = 7.', [
      'Sai — 8 không đúng vì 2 × 8 = 16 chứ không phải 14.',
      'Sai — 5 không đúng vì 2 × 5 = 10 chứ không phải 14.',
      'Đúng — vì 2 × 7 = 14 nên 14 : 2 = 7.',
      'Sai — 6 không đúng vì 2 × 6 = 12 chứ không phải 14.',
    ]),
    Q('35 : 5 = ?', ['7', '8', '6', '9'], 0, '5 × 7 = 35 → 35 : 5 = 7.', [
      'Đúng — vì 5 × 7 = 35 nên 35 : 5 = 7.',
      'Sai — 8 không đúng vì 5 × 8 = 40 chứ không phải 35.',
      'Sai — 6 không đúng vì 5 × 6 = 30 chứ không phải 35.',
      'Sai — 9 không đúng vì 5 × 9 = 45 chứ không phải 35.',
    ]),
    Q('18 : 2 = ?', ['7', '10', '9', '8'], 2, '2 × 9 = 18 → 9.', [
      'Sai — 7 không đúng vì 2 × 7 = 14 chứ không phải 18.',
      'Sai — 10 không đúng vì 2 × 10 = 20 chứ không phải 18.',
      'Đúng — vì 2 × 9 = 18 nên 18 : 2 = 9.',
      'Sai — 8 không đúng vì 2 × 8 = 16 chứ không phải 18.',
    ]),
    Q('Chia đều 40 quyển vở cho 5 bạn. Mỗi bạn?', ['10', '9', '8', '7'], 2, '40 : 5 = 8 quyển.', [
      'Sai — 10 không đúng vì 5 × 10 = 50 chứ không phải 40.',
      'Sai — 9 không đúng vì 5 × 9 = 45 chứ không phải 40.',
      'Đúng — chia đều thì lấy 40 : 5 = 8 quyển mỗi bạn.',
      'Sai — 7 không đúng vì 5 × 7 = 35 chứ không phải 40.',
    ]),
    Q('Một sợi dây dài 16 dm, cắt thành các đoạn 2 dm. Được mấy đoạn?', ['7', '8', '9', '6'], 1, '16 : 2 = 8 đoạn.', [
      'Sai — 7 không đúng vì 2 × 7 = 14 chứ không phải 16.',
      'Đúng — mỗi đoạn 2 dm, lấy 16 : 2 = 8 đoạn.',
      'Sai — 9 không đúng vì 2 × 9 = 18 chứ không phải 16.',
      'Sai — 6 không đúng vì 2 × 6 = 12 chứ không phải 16.',
    ]),
    Q('50 : 5 = ?', ['11', '10', '9', '8'], 1, '50 : 5 = 10.', [
      'Sai — 11 không đúng vì 5 × 11 = 55 chứ không phải 50.',
      'Đúng — vì 5 × 10 = 50 nên 50 : 5 = 10.',
      'Sai — 9 không đúng vì 5 × 9 = 45 chứ không phải 50.',
      'Sai — 8 không đúng vì 5 × 8 = 40 chứ không phải 50.',
    ]),
  ]),

  M(9, 'Bảng chia 3 – Bảng chia 4', [
    Q('27 : 3 = ?', ['9', '8', '7', '10'], 0, '3 × 9 = 27 → 9.', [
      'Đúng — vì 3 × 9 = 27 nên 27 : 3 = 9.',
      'Sai — 8 không đúng vì 3 × 8 = 24 chứ không phải 27.',
      'Sai — 7 không đúng vì 3 × 7 = 21 chứ không phải 27.',
      'Sai — 10 không đúng vì 3 × 10 = 30 chứ không phải 27.',
    ]),
    Q('32 : 4 = ?', ['6', '7', '8', '9'], 2, '4 × 8 = 32 → 8.', [
      'Sai — 6 không đúng vì 4 × 6 = 24 chứ không phải 32.',
      'Sai — 7 không đúng vì 4 × 7 = 28 chứ không phải 32.',
      'Đúng — vì 4 × 8 = 32 nên 32 : 4 = 8.',
      'Sai — 9 không đúng vì 4 × 9 = 36 chứ không phải 32.',
    ]),
    Q('24 : 3 = ?', ['7', '6', '9', '8'], 3, '3 × 8 = 24 → 8.', [
      'Sai — 7 không đúng vì 3 × 7 = 21 chứ không phải 24.',
      'Sai — 6 không đúng vì 3 × 6 = 18 chứ không phải 24.',
      'Sai — 9 không đúng vì 3 × 9 = 27 chứ không phải 24.',
      'Đúng — vì 3 × 8 = 24 nên 24 : 3 = 8.',
    ]),
    Q('36 : 4 = ?', ['10', '7', '9', '8'], 2, '4 × 9 = 36 → 9.', [
      'Sai — 10 không đúng vì 4 × 10 = 40 chứ không phải 36.',
      'Sai — 7 không đúng vì 4 × 7 = 28 chứ không phải 36.',
      'Đúng — vì 4 × 9 = 36 nên 36 : 4 = 9.',
      'Sai — 8 không đúng vì 4 × 8 = 32 chứ không phải 36.',
    ]),
    Q('Chia 21 viên kẹo cho 3 bạn. Mỗi bạn?', ['5', '8', '7', '6'], 2, '21 : 3 = 7 viên.', [
      'Sai — 5 không đúng vì 3 × 5 = 15 chứ không phải 21.',
      'Sai — 8 không đúng vì 3 × 8 = 24 chứ không phải 21.',
      'Đúng — chia đều thì lấy 21 : 3 = 7 viên mỗi bạn.',
      'Sai — 6 không đúng vì 3 × 6 = 18 chứ không phải 21.',
    ]),
    Q('20 : 4 = ?', ['4', '7', '5', '6'], 2, '4 × 5 = 20 → 5.', [
      'Sai — 4 không đúng vì 4 × 4 = 16 chứ không phải 20.',
      'Sai — 7 không đúng vì 4 × 7 = 28 chứ không phải 20.',
      'Đúng — vì 4 × 5 = 20 nên 20 : 4 = 5.',
      'Sai — 6 không đúng vì 4 × 6 = 24 chứ không phải 20.',
    ]),
  ]),

  M(10, 'Bảng chia 6', [
    Q('30 : 6 = ?', ['7', '5', '4', '6'], 1, '6 × 5 = 30 → 5.', [
      'Sai — 7 không đúng vì 6 × 7 = 42 chứ không phải 30.',
      'Đúng — vì 6 × 5 = 30 nên 30 : 6 = 5.',
      'Sai — 4 không đúng vì 6 × 4 = 24 chứ không phải 30.',
      'Sai — 6 không đúng vì 6 × 6 = 36 chứ không phải 30.',
    ]),
    Q('42 : 6 = ?', ['6', '9', '7', '8'], 2, '6 × 7 = 42 → 7.', [
      'Sai — 6 không đúng vì 6 × 6 = 36 chứ không phải 42.',
      'Sai — 9 không đúng vì 6 × 9 = 54 chứ không phải 42.',
      'Đúng — vì 6 × 7 = 42 nên 42 : 6 = 7.',
      'Sai — 8 không đúng vì 6 × 8 = 48 chứ không phải 42.',
    ]),
    Q('54 : 6 = ?', ['10', '8', '7', '9'], 3, '6 × 9 = 54 → 9.', [
      'Sai — 10 không đúng vì 6 × 10 = 60 chứ không phải 54.',
      'Sai — 8 không đúng vì 6 × 8 = 48 chứ không phải 54.',
      'Sai — 7 không đúng vì 6 × 7 = 42 chứ không phải 54.',
      'Đúng — vì 6 × 9 = 54 nên 54 : 6 = 9.',
    ]),
    Q('48 : 6 = ?', ['7', '8', '9', '6'], 1, '6 × 8 = 48 → 8.', [
      'Sai — 7 không đúng vì 6 × 7 = 42 chứ không phải 48.',
      'Đúng — vì 6 × 8 = 48 nên 48 : 6 = 8.',
      'Sai — 9 không đúng vì 6 × 9 = 54 chứ không phải 48.',
      'Sai — 6 không đúng vì 6 × 6 = 36 chứ không phải 48.',
    ]),
    Q('Chia 36 quyển vở vào 6 thùng đều nhau. Mỗi thùng?', ['7', '6', '8', '5'], 1, '36 : 6 = 6 quyển.', [
      'Sai — 7 không đúng vì 6 × 7 = 42 chứ không phải 36.',
      'Đúng — chia đều thì lấy 36 : 6 = 6 quyển mỗi thùng.',
      'Sai — 8 không đúng vì 6 × 8 = 48 chứ không phải 36.',
      'Sai — 5 không đúng vì 6 × 5 = 30 chứ không phải 36.',
    ]),
    Q('60 : 6 = ?', ['11', '10', '9', '12'], 1, '60 : 6 = 10.', [
      'Sai — 11 không đúng vì 6 × 11 = 66 chứ không phải 60.',
      'Đúng — vì 6 × 10 = 60 nên 60 : 6 = 10.',
      'Sai — 9 không đúng vì 6 × 9 = 54 chứ không phải 60.',
      'Sai — 12 không đúng vì 6 × 12 = 72 chứ không phải 60.',
    ]),
  ]),

  M(11, 'Một phần mấy (1/2, 1/3, 1/4, 1/5, 1/6)', [
    Q('Một phần hai của 10 là?', ['8', '5', '4', '2'], 1, '10 : 2 = 5.', [
      'Sai — 8 không đúng, một phần hai là chia 10 cho 2.',
      'Đúng — một phần hai của 10 là 10 : 2 = 5.',
      'Sai — 4 không đúng, hãy lấy 10 : 2.',
      'Sai — 2 là mẫu số, không phải kết quả của 10 : 2.',
    ]),
    Q('1/3 của 18 là?', ['3', '6', '9', '12'], 1, '18 : 3 = 6.', [
      'Sai — 3 là mẫu số, hãy lấy 18 : 3.',
      'Đúng — một phần ba của 18 là 18 : 3 = 6.',
      'Sai — 9 là một phần hai của 18, không phải một phần ba.',
      'Sai — 12 quá lớn, hãy chia 18 cho 3.',
    ]),
    Q('1/4 của 20 là?', ['6', '5', '10', '4'], 1, '20 : 4 = 5.', [
      'Sai — 6 không đúng, hãy lấy 20 : 4.',
      'Đúng — một phần tư của 20 là 20 : 4 = 5.',
      'Sai — 10 là một phần hai của 20, không phải một phần tư.',
      'Sai — 4 là mẫu số, không phải kết quả của 20 : 4.',
    ]),
    Q('1/5 của 25 là?', ['4', '10', '6', '5'], 3, '25 : 5 = 5.', [
      'Sai — 4 không đúng, hãy lấy 25 : 5.',
      'Sai — 10 quá lớn so với một phần năm của 25.',
      'Sai — 6 không đúng, hãy chia 25 cho 5.',
      'Đúng — một phần năm của 25 là 25 : 5 = 5.',
    ]),
    Q('1/6 của 24 là?', ['4', '6', '5', '3'], 0, '24 : 6 = 4.', [
      'Đúng — một phần sáu của 24 là 24 : 6 = 4.',
      'Sai — 6 là mẫu số, không phải kết quả của 24 : 6.',
      'Sai — 5 không đúng, hãy chia 24 cho 6.',
      'Sai — 3 không đúng, hãy lấy 24 : 6.',
    ]),
    Q('Lớp 30 bạn, 1/3 là nữ. Lớp có mấy bạn nữ?', ['10', '15', '9', '12'], 0, '30 : 3 = 10 bạn nữ.', [
      'Đúng — một phần ba của 30 là 30 : 3 = 10 bạn nữ.',
      'Sai — 15 là một phần hai của 30, không phải một phần ba.',
      'Sai — 9 không đúng, hãy chia 30 cho 3.',
      'Sai — 12 không đúng, hãy lấy 30 : 3.',
    ]),
  ]),

  M(12, 'Bảng nhân 7', [
    Q('7 × 3 = ?', ['21', '14', '18', '24'], 0, '7 × 3 = 21.', [
      'Đúng — 7 lấy 3 lần bằng 21.',
      'Sai — 14 là 7 × 2, chưa đủ 3 lần.',
      'Sai — 18 không có trong bảng nhân 7.',
      'Sai — 24 không phải kết quả của 7 × 3.',
    ]),
    Q('7 × 6 = ?', ['36', '42', '40', '48'], 1, '7 × 6 = 42.', [
      'Sai — 36 là 6 × 6, không phải 7 × 6.',
      'Đúng — 7 lấy 6 lần bằng 42.',
      'Sai — 40 không có trong bảng nhân 7.',
      'Sai — 48 là 6 × 8, không đúng với đề.',
    ]),
    Q('7 × 8 = ?', ['56', '63', '54', '49'], 0, '7 × 8 = 56.', [
      'Đúng — 7 lấy 8 lần bằng 56.',
      'Sai — 63 là 7 × 9, dư một lần 7.',
      'Sai — 54 là 6 × 9, không phải 7 × 8.',
      'Sai — 49 là 7 × 7, còn thiếu một lần 7.',
    ]),
    Q('7 × 9 = ?', ['60', '70', '56', '63'], 3, '7 × 9 = 63.', [
      'Sai — 60 không có trong bảng nhân 7.',
      'Sai — 70 là 7 × 10, dư một lần 7.',
      'Sai — 56 là 7 × 8, còn thiếu một lần 7.',
      'Đúng — 7 lấy 9 lần bằng 63.',
    ]),
    Q('Một tuần có 7 ngày. 4 tuần có?', ['14', '21', '30', '28'], 3, '7 × 4 = 28 ngày.', [
      'Sai — 14 là 7 × 2, chưa đủ 4 tuần.',
      'Sai — 21 là 7 × 3, còn thiếu một tuần.',
      'Sai — 30 không phải kết quả của 7 × 4.',
      'Đúng — mỗi tuần 7 ngày, 4 tuần là 7 × 4 = 28 ngày.',
    ]),
    Q('7 × 7 = ?', ['49', '48', '42', '56'], 0, '7 × 7 = 49.', [
      'Đúng — 7 lấy 7 lần bằng 49.',
      'Sai — 48 là 6 × 8, không phải 7 × 7.',
      'Sai — 42 là 7 × 6, còn thiếu một lần 7.',
      'Sai — 56 là 7 × 8, dư một lần 7.',
    ]),
  ]),

  M(13, 'Bảng chia 7', [
    Q('35 : 7 = ?', ['4', '6', '7', '5'], 3, '7 × 5 = 35 → 5.', [
      'Sai — 4 không đúng vì 7 × 4 = 28 chứ không phải 35.',
      'Sai — 6 không đúng vì 7 × 6 = 42 chứ không phải 35.',
      'Sai — 7 không đúng vì 7 × 7 = 49 chứ không phải 35.',
      'Đúng — vì 7 × 5 = 35 nên 35 : 7 = 5.',
    ]),
    Q('49 : 7 = ?', ['8', '6', '7', '9'], 2, '7 × 7 = 49 → 7.', [
      'Sai — 8 không đúng vì 7 × 8 = 56 chứ không phải 49.',
      'Sai — 6 không đúng vì 7 × 6 = 42 chứ không phải 49.',
      'Đúng — vì 7 × 7 = 49 nên 49 : 7 = 7.',
      'Sai — 9 không đúng vì 7 × 9 = 63 chứ không phải 49.',
    ]),
    Q('63 : 7 = ?', ['7', '8', '10', '9'], 3, '7 × 9 = 63 → 9.', [
      'Sai — 7 không đúng vì 7 × 7 = 49 chứ không phải 63.',
      'Sai — 8 không đúng vì 7 × 8 = 56 chứ không phải 63.',
      'Sai — 10 không đúng vì 7 × 10 = 70 chứ không phải 63.',
      'Đúng — vì 7 × 9 = 63 nên 63 : 7 = 9.',
    ]),
    Q('56 : 7 = ?', ['6', '9', '8', '7'], 2, '7 × 8 = 56 → 8.', [
      'Sai — 6 không đúng vì 7 × 6 = 42 chứ không phải 56.',
      'Sai — 9 không đúng vì 7 × 9 = 63 chứ không phải 56.',
      'Đúng — vì 7 × 8 = 56 nên 56 : 7 = 8.',
      'Sai — 7 không đúng vì 7 × 7 = 49 chứ không phải 56.',
    ]),
    Q('Chia 42 quả cam cho 7 bạn. Mỗi bạn?', ['6', '7', '8', '5'], 0, '42 : 7 = 6 quả.', [
      'Đúng — chia đều thì lấy 42 : 7 = 6 quả mỗi bạn.',
      'Sai — 7 không đúng vì 7 × 7 = 49 chứ không phải 42.',
      'Sai — 8 không đúng vì 7 × 8 = 56 chứ không phải 42.',
      'Sai — 5 không đúng vì 7 × 5 = 35 chứ không phải 42.',
    ]),
    Q('70 : 7 = ?', ['11', '10', '7', '17'], 1, '70 : 7 = 10.', [
      'Sai — 11 không đúng vì 7 × 11 = 77 chứ không phải 70.',
      'Đúng — vì 7 × 10 = 70 nên 70 : 7 = 10.',
      'Sai — 7 không đúng vì 7 × 7 = 49 chứ không phải 70.',
      'Sai — 17 không đúng, hãy lấy 70 : 7.',
    ]),
  ]),

  M(14, 'Gấp một số lên nhiều lần · Giảm đi một số lần', [
    Q('Gấp 4 lên 3 lần được?', ['9', '7', '12', '16'], 2, '4 × 3 = 12.', [
      'Sai — 9 không đúng, gấp lên nhiều lần là phép nhân.',
      'Sai — 7 là em cộng 4 + 3, nhưng gấp lên phải nhân.',
      'Đúng — gấp 4 lên 3 lần là 4 × 3 = 12.',
      'Sai — 16 là 4 × 4, gấp 4 lần chứ không phải 3 lần.',
    ]),
    Q('Gấp 6 lên 5 lần được?', ['30', '36', '25', '11'], 0, '6 × 5 = 30.', [
      'Đúng — gấp 6 lên 5 lần là 6 × 5 = 30.',
      'Sai — 36 là 6 × 6, gấp 6 lần chứ không phải 5 lần.',
      'Sai — 25 là 5 × 5, không đúng với đề.',
      'Sai — 11 là em cộng 6 + 5, nhưng gấp lên phải nhân.',
    ]),
    Q('Giảm 24 đi 4 lần được?', ['6', '8', '20', '28'], 0, '24 : 4 = 6.', [
      'Đúng — giảm đi nhiều lần là phép chia: 24 : 4 = 6.',
      'Sai — 8 không đúng, hãy lấy 24 : 4.',
      'Sai — 20 là em lấy 24 − 4, nhưng giảm đi nhiều lần phải chia.',
      'Sai — 28 là em cộng 24 + 4, nhưng giảm đi phải chia.',
    ]),
    Q('Giảm 35 đi 5 lần được?', ['7', '40', '6', '30'], 0, '35 : 5 = 7.', [
      'Đúng — giảm đi nhiều lần là phép chia: 35 : 5 = 7.',
      'Sai — 40 là em cộng 35 + 5, nhưng giảm đi phải chia.',
      'Sai — 6 không đúng, hãy lấy 35 : 5.',
      'Sai — 30 là em lấy 35 − 5, nhưng giảm đi nhiều lần phải chia.',
    ]),
    Q('An có 6 viên kẹo, Bình có gấp 4 lần An. Bình có?', ['24', '20', '10', '2'], 0, '6 × 4 = 24 viên.', [
      'Đúng — gấp 4 lần là 6 × 4 = 24 viên.',
      'Sai — 20 không đúng, hãy lấy 6 × 4.',
      'Sai — 10 là em cộng 6 + 4, nhưng gấp lên phải nhân.',
      'Sai — 2 là em lấy 6 − 4, nhưng gấp lên phải nhân.',
    ]),
    Q('Số 30 giảm đi 6 lần thì còn?', ['6', '5', '24', '36'], 1, '30 : 6 = 5.', [
      'Sai — 6 không đúng, hãy lấy 30 : 6.',
      'Đúng — giảm đi 6 lần là 30 : 6 = 5.',
      'Sai — 24 là em lấy 30 − 6, nhưng giảm đi nhiều lần phải chia.',
      'Sai — 36 là em cộng 30 + 6, nhưng giảm đi phải chia.',
    ]),
  ]),

  M(15, 'Bảng nhân 8 – Bảng chia 8', [
    Q('8 × 4 = ?', ['24', '28', '32', '36'], 2, '8 × 4 = 32.', [
      'Sai — 24 là 8 × 3, chưa đủ 4 lần.',
      'Sai — 28 không có trong bảng nhân 8.',
      'Đúng — 8 lấy 4 lần bằng 32.',
      'Sai — 36 không phải kết quả của 8 × 4.',
    ]),
    Q('8 × 7 = ?', ['64', '56', '54', '48'], 1, '8 × 7 = 56.', [
      'Sai — 64 là 8 × 8, dư một lần 8.',
      'Đúng — 8 lấy 7 lần bằng 56.',
      'Sai — 54 là 6 × 9, không phải 8 × 7.',
      'Sai — 48 là 8 × 6, còn thiếu một lần 8.',
    ]),
    Q('8 × 9 = ?', ['63', '64', '72', '80'], 2, '8 × 9 = 72.', [
      'Sai — 63 là 7 × 9, không phải 8 × 9.',
      'Sai — 64 là 8 × 8, còn thiếu một lần 8.',
      'Đúng — 8 lấy 9 lần bằng 72.',
      'Sai — 80 là 8 × 10, dư một lần 8.',
    ]),
    Q('48 : 8 = ?', ['6', '5', '8', '7'], 0, '8 × 6 = 48 → 6.', [
      'Đúng — vì 8 × 6 = 48 nên 48 : 8 = 6.',
      'Sai — 5 không đúng vì 8 × 5 = 40 chứ không phải 48.',
      'Sai — 8 không đúng vì 8 × 8 = 64 chứ không phải 48.',
      'Sai — 7 không đúng vì 8 × 7 = 56 chứ không phải 48.',
    ]),
    Q('64 : 8 = ?', ['6', '8', '7', '9'], 1, '8 × 8 = 64 → 8.', [
      'Sai — 6 không đúng vì 8 × 6 = 48 chứ không phải 64.',
      'Đúng — vì 8 × 8 = 64 nên 64 : 8 = 8.',
      'Sai — 7 không đúng vì 8 × 7 = 56 chứ không phải 64.',
      'Sai — 9 không đúng vì 8 × 9 = 72 chứ không phải 64.',
    ]),
    Q('Chia 56 viên bi cho 8 bạn. Mỗi bạn?', ['6', '7', '9', '8'], 1, '56 : 8 = 7 viên.', [
      'Sai — 6 không đúng vì 8 × 6 = 48 chứ không phải 56.',
      'Đúng — chia đều thì lấy 56 : 8 = 7 viên mỗi bạn.',
      'Sai — 9 không đúng vì 8 × 9 = 72 chứ không phải 56.',
      'Sai — 8 không đúng vì 8 × 8 = 64 chứ không phải 56.',
    ]),
  ]),

  M(16, 'Bảng nhân 9 – Bảng chia 9', [
    Q('9 × 5 = ?', ['45', '54', '40', '36'], 0, '9 × 5 = 45.', [
      'Đúng — 9 lấy 5 lần bằng 45.',
      'Sai — 54 là 9 × 6, dư một lần 9.',
      'Sai — 40 không có trong bảng nhân 9.',
      'Sai — 36 là 9 × 4, còn thiếu một lần 9.',
    ]),
    Q('9 × 7 = ?', ['54', '63', '72', '56'], 1, '9 × 7 = 63.', [
      'Sai — 54 là 9 × 6, còn thiếu một lần 9.',
      'Đúng — 9 lấy 7 lần bằng 63.',
      'Sai — 72 là 9 × 8, dư một lần 9.',
      'Sai — 56 là 8 × 7, không phải 9 × 7.',
    ]),
    Q('9 × 9 = ?', ['79', '81', '72', '90'], 1, '9 × 9 = 81.', [
      'Sai — 79 không có trong bảng nhân 9.',
      'Đúng — 9 lấy 9 lần bằng 81.',
      'Sai — 72 là 9 × 8, còn thiếu một lần 9.',
      'Sai — 90 là 9 × 10, dư một lần 9.',
    ]),
    Q('54 : 9 = ?', ['8', '7', '6', '5'], 2, '9 × 6 = 54 → 6.', [
      'Sai — 8 không đúng vì 9 × 8 = 72 chứ không phải 54.',
      'Sai — 7 không đúng vì 9 × 7 = 63 chứ không phải 54.',
      'Đúng — vì 9 × 6 = 54 nên 54 : 9 = 6.',
      'Sai — 5 không đúng vì 9 × 5 = 45 chứ không phải 54.',
    ]),
    Q('81 : 9 = ?', ['10', '8', '9', '7'], 2, '9 × 9 = 81 → 9.', [
      'Sai — 10 không đúng vì 9 × 10 = 90 chứ không phải 81.',
      'Sai — 8 không đúng vì 9 × 8 = 72 chứ không phải 81.',
      'Đúng — vì 9 × 9 = 81 nên 81 : 9 = 9.',
      'Sai — 7 không đúng vì 9 × 7 = 63 chứ không phải 81.',
    ]),
    Q('Lớp 27 bạn xếp thành 9 hàng đều. Mỗi hàng?', ['2', '5', '3', '4'], 2, '27 : 9 = 3 bạn.', [
      'Sai — 2 không đúng vì 9 × 2 = 18 chứ không phải 27.',
      'Sai — 5 không đúng vì 9 × 5 = 45 chứ không phải 27.',
      'Đúng — chia đều thì lấy 27 : 9 = 3 bạn mỗi hàng.',
      'Sai — 4 không đúng vì 9 × 4 = 36 chứ không phải 27.',
    ]),
  ]),

  M(17, 'Bài toán có lời văn — giải bằng 2 bước tính', [
    Q('Có 18 quả táo và 12 quả cam. Chia đều vào 6 đĩa. Mỗi đĩa?', ['5', '7', '6', '4'], 0, '(18+12):6 = 30:6 = 5 quả.', [
      'Đúng — cộng trước rồi chia: (18 + 12) : 6 = 30 : 6 = 5 quả.',
      'Sai — 7 không đúng, hãy cộng hai loại quả trước khi chia.',
      'Sai — 6 là số đĩa, không phải số quả mỗi đĩa.',
      'Sai — 4 không đúng, hãy lấy tổng 30 chia cho 6.',
    ]),
    Q('Một thùng có 24 quyển vở, đã dùng 1/4. Còn?', ['6', '18', '12', '20'], 1, '24 − 24:4 = 24 − 6 = 18 quyển.', [
      'Sai — 6 là số vở đã dùng (1/4 của 24), không phải số còn lại.',
      'Đúng — đã dùng 24 : 4 = 6, còn lại 24 − 6 = 18 quyển.',
      'Sai — 12 không đúng, hãy trừ phần đã dùng là 6 quyển.',
      'Sai — 20 là trừ thiếu, phần đã dùng là 6 chứ không phải 4.',
    ]),
    Q('Bố mua 5 chục trứng, làm vỡ 8 quả. Còn?', ['42', '50', '48', '38'], 0, '50 − 8 = 42 quả.', [
      'Đúng — 5 chục là 50 quả, vỡ 8 thì còn 50 − 8 = 42 quả.',
      'Sai — 50 là số trứng ban đầu, chưa trừ số bị vỡ.',
      'Sai — 48 là trừ thiếu, 50 − 8 = 42 chứ không phải 48.',
      'Sai — 38 là trừ dư, kiểm tra lại 50 − 8.',
    ]),
    Q('Lớp có 28 bạn nam, số nữ ít hơn nam 5 bạn. Tổng?', ['51', '53', '55', '52'], 0, 'Nữ = 23. Tổng = 28 + 23 = 51 bạn.', [
      'Đúng — nữ ít hơn 5 nên có 23 bạn; tổng 28 + 23 = 51 bạn.',
      'Sai — 53 là cộng nhầm, số nữ là 23 chứ không phải 25.',
      'Sai — 55 là em cộng 28 + 28 − 1, hãy tính số nữ là 23 trước.',
      'Sai — 52 là cộng nhầm, kiểm tra lại số nữ là 23.',
    ]),
    Q('Mỗi hộp có 6 cây bút, bán 5 hộp. Đã bán?', ['30', '24', '11', '35'], 0, '6 × 5 = 30 cây.', [
      'Đúng — mỗi hộp 6 cây, bán 5 hộp là 6 × 5 = 30 cây.',
      'Sai — 24 là 6 × 4, chưa đủ 5 hộp.',
      'Sai — 11 là em cộng 6 + 5, nhưng đề cần phép nhân.',
      'Sai — 35 là 5 × 7, không đúng với đề.',
    ]),
    Q('Có 36 quyển sách, gấp 4 lần số sách trên bàn. Trên bàn có?', ['9', '6', '32', '12'], 0, '36 : 4 = 9 quyển.', [
      'Đúng — số lớn gấp 4 lần số nhỏ, nên số trên bàn = 36 : 4 = 9.',
      'Sai — 6 không đúng, hãy lấy 36 : 4.',
      'Sai — 32 là em lấy 36 − 4, nhưng gấp 4 lần phải chia.',
      'Sai — 12 không đúng, hãy chia 36 cho 4.',
    ]),
    Q('Tính giá trị biểu thức: 5 + 3 × 4 = ?', ['17', '32', '20', '12'], 0, 'Nhân trước: 3 × 4 = 12; rồi cộng: 5 + 12 = 17.', [
      'Đúng — trong biểu thức có cả nhân và cộng thì nhân trước: 3 × 4 = 12, sau đó 5 + 12 = 17.',
      'Sai — 32 là em cộng 5 + 3 = 8 trước rồi nhân 8 × 4, nhưng phải nhân trước cộng sau.',
      'Sai — 20 là em lấy 5 × 4, bỏ sót số 3 trong biểu thức.',
      'Sai — 12 mới là 3 × 4, em quên cộng thêm 5.',
    ]),
    Q('Tính giá trị biểu thức: 24 : 4 + 2 = ?', ['8', '4', '6', '12'], 0, 'Chia trước: 24 : 4 = 6; rồi cộng: 6 + 2 = 8.', [
      'Đúng — chia trước rồi cộng sau: 24 : 4 = 6, sau đó 6 + 2 = 8.',
      'Sai — 4 là em lấy 24 : (4 + 2) = 24 : 6, nhưng không có ngoặc thì chia trước.',
      'Sai — 6 mới là 24 : 4, em quên cộng thêm 2.',
      'Sai — 12 không đúng, hãy chia 24 cho 4 trước rồi mới cộng 2.',
    ]),
    Q('Tính giá trị biểu thức có dấu ngoặc: (15 − 7) × 2 = ?', ['16', '1', '13', '8'], 0, 'Trong ngoặc trước: 15 − 7 = 8; rồi nhân: 8 × 2 = 16.', [
      'Đúng — luôn tính trong ngoặc trước: 15 − 7 = 8, sau đó nhân 8 × 2 = 16.',
      'Sai — 1 là em lấy 15 − 7 × 2 = 15 − 14, nhưng có ngoặc nên trừ trước.',
      'Sai — 13 không đúng, hãy tính phép trừ trong ngoặc trước.',
      'Sai — 8 mới là kết quả trong ngoặc 15 − 7, em quên nhân với 2.',
    ]),
  ]),

  M(18, 'Ôn tập học kì 1', [
    Q('8 × 6 + 12 = ?', ['48', '60', '50', '54'], 1, '8×6 = 48, + 12 = 60.', [
      'Sai — 48 mới là 8 × 6, còn quên cộng thêm 12.',
      'Đúng — nhân trước: 8 × 6 = 48, rồi cộng 12 → 60.',
      'Sai — 50 là cộng nhầm, 48 + 12 = 60 chứ không phải 50.',
      'Sai — 54 là cộng nhầm, hãy lấy 48 + 12.',
    ]),
    Q('72 : 9 − 3 = ?', ['5', '6', '7', '8'], 0, '72:9 = 8, − 3 = 5.', [
      'Đúng — chia trước: 72 : 9 = 8, rồi trừ 3 → 5.',
      'Sai — 6 là trừ nhầm, 8 − 3 = 5 chứ không phải 6.',
      'Sai — 7 là trừ thiếu, hãy lấy 8 − 3.',
      'Sai — 8 mới là 72 : 9, còn quên trừ 3.',
    ]),
    Q('Tìm x: x × 4 = 28', ['x = 7', 'x = 24', 'x = 32', 'x = 8'], 0, 'x = 28 : 4 = 7.', [
      'Đúng — thừa số chưa biết = tích : thừa số kia: 28 : 4 = 7.',
      'Sai — 24 là em lấy 28 − 4, nhưng tìm thừa số phải chia.',
      'Sai — 32 là em cộng 28 + 4, nhưng tìm thừa số phải chia.',
      'Sai — 8 không đúng vì 8 × 4 = 32 chứ không phải 28.',
    ]),
    Q('Tìm x: x : 5 = 6', ['x = 30', 'x = 11', 'x = 25', 'x = 1'], 0, 'x = 6 × 5 = 30.', [
      'Đúng — số bị chia = thương × số chia: 6 × 5 = 30.',
      'Sai — 11 là em cộng 6 + 5, nhưng tìm số bị chia phải nhân.',
      'Sai — 25 không đúng vì 25 : 5 = 5 chứ không phải 6.',
      'Sai — 1 là em lấy 6 − 5, nhưng tìm số bị chia phải nhân.',
    ]),
    Q('Một hình chữ nhật dài 8 cm, rộng 3 cm. Diện tích (cách đếm ô)?', ['16 ô', '11 ô', '24 ô', '22 ô'], 2, '8 × 3 = 24 ô vuông 1 cm².', [
      'Sai — 16 không đúng, hãy lấy chiều dài nhân chiều rộng.',
      'Sai — 11 là em cộng 8 + 3, nhưng đếm ô phải nhân hai cạnh.',
      'Đúng — số ô vuông = 8 × 3 = 24 ô (mỗi ô 1 cm²).',
      'Sai — 22 là chu vi (8 + 3) × 2, đây hỏi số ô (diện tích) phải nhân.',
    ]),
    Q('Phép tính nào SAI?', ['7 × 7 = 48', '4 × 9 = 36', '6 × 7 = 42', '9 × 8 = 72'], 0, '7 × 7 = 49, không phải 48.', [
      'Đúng — 7 × 7 = 49 chứ không phải 48, nên phép này sai.',
      'Sai — 4 × 9 = 36 là phép tính đúng.',
      'Sai — 6 × 7 = 42 là phép tính đúng.',
      'Sai — 9 × 8 = 72 là phép tính đúng.',
    ]),
  ]),

  // ──────────────── HK2 ────────────────
  M(19, 'Điểm – Đoạn thẳng – Đường thẳng – 3 điểm thẳng hàng', [
    Q('Đường thẳng có đặc điểm gì?', ['Chỉ là 1 điểm', 'Có 2 đầu', 'Có 1 đầu mút và kéo dài về 1 phía', 'Không có đầu, kéo dài mãi'], 3, 'Đường thẳng không có điểm đầu, điểm cuối.', [
      'Sai — một điểm chỉ là chấm nhỏ, không phải đường thẳng.',
      'Sai — có 2 đầu là đặc điểm của đoạn thẳng, không phải đường thẳng.',
      'Sai — có 1 đầu và kéo dài 1 phía là tia, không phải đường thẳng.',
      'Đúng — đường thẳng không có điểm đầu, điểm cuối, kéo dài về hai phía.',
    ]),
    Q('Đoạn thẳng AB là?', ['Phần đường thẳng giới hạn bởi 2 điểm A và B', 'Một điểm', 'Một đường cong', 'Đường thẳng đi qua A và B, kéo dài 2 phía'], 0, 'Đoạn thẳng có 2 đầu mút.', [
      'Đúng — đoạn thẳng AB là phần đường thẳng có hai đầu mút A và B.',
      'Sai — một điểm chỉ là một chấm, không phải đoạn thẳng.',
      'Sai — đường cong không phải đoạn thẳng (đoạn thẳng phải thẳng).',
      'Sai — kéo dài 2 phía là đường thẳng, đoạn thẳng có hai đầu mút.',
    ]),
    Q('3 điểm A, B, C nằm trên một đường thẳng gọi là?', ['Hình vuông', 'Tam giác', '3 điểm thẳng hàng', 'Không có gì'], 2, 'Cùng nằm trên 1 đường thẳng → thẳng hàng.', [
      'Sai — hình vuông cần 4 đỉnh và 4 cạnh, không phải 3 điểm.',
      'Sai — tam giác có 3 đỉnh không thẳng hàng nhau.',
      'Đúng — ba điểm cùng nằm trên một đường thẳng gọi là thẳng hàng.',
      'Sai — ba điểm cùng trên một đường thẳng có tên gọi: thẳng hàng.',
    ]),
    Q('Để có 1 đường thẳng, cần ít nhất mấy điểm?', ['2', '4', '1', '3'], 0, 'Qua 2 điểm vẽ được 1 đường thẳng.', [
      'Đúng — qua 2 điểm ta vẽ được đúng một đường thẳng.',
      'Sai — 4 điểm là nhiều hơn cần thiết, chỉ cần 2 điểm.',
      'Sai — 1 điểm thì vẽ được rất nhiều đường thẳng, không xác định.',
      'Sai — 3 điểm là nhiều hơn cần thiết, chỉ cần 2 điểm.',
    ]),
    Q('Hình nào KHÔNG phải đoạn thẳng?', ['Cạnh quyển sách', 'AB dài 5 cm', 'Mép thước', 'Đường tròn'], 3, 'Đường tròn là đường cong, không phải đoạn thẳng.', [
      'Sai — cạnh quyển sách là một đoạn thẳng.',
      'Sai — AB dài 5 cm là một đoạn thẳng có độ dài rõ ràng.',
      'Sai — mép thước là một đoạn thẳng.',
      'Đúng — đường tròn là đường cong khép kín, không phải đoạn thẳng.',
    ]),
    Q('Đoạn thẳng MN dài 4 cm, kéo dài thêm 3 cm. Đoạn mới dài?', ['1 cm', '7 cm', '34 cm', '12 cm'], 1, '4 + 3 = 7 cm.', [
      'Sai — 1 cm là em lấy 4 − 3, nhưng kéo dài thêm phải cộng.',
      'Đúng — kéo dài thêm thì cộng: 4 + 3 = 7 cm.',
      'Sai — 34 là em viết liền hai số, hãy cộng 4 + 3.',
      'Sai — 12 là 4 × 3, nhưng kéo dài thêm phải cộng.',
    ]),
    Q('Điểm O ở giữa hai điểm A và B khi nào?', ['A, O, B thẳng hàng và O nằm giữa A với B', 'O nằm ngoài đoạn AB', 'O trùng với A', 'A, O, B không thẳng hàng'], 0, 'Điểm ở giữa: ba điểm thẳng hàng và điểm đó nằm giữa hai điểm kia.', [
      'Đúng — điểm O ở giữa A và B khi ba điểm A, O, B thẳng hàng và O nằm trong khoảng giữa A với B.',
      'Sai — nếu O nằm ngoài đoạn AB thì O không thể ở giữa A và B.',
      'Sai — nếu O trùng với A thì O chính là điểm A, không phải ở giữa.',
      'Sai — muốn O ở giữa thì ba điểm phải thẳng hàng, không thẳng hàng thì không có điểm giữa.',
    ]),
    Q('Đoạn thẳng AB dài 8 cm, M là trung điểm. Đoạn AM dài?', ['4 cm', '8 cm', '16 cm', '2 cm'], 0, 'Trung điểm chia đoạn thành hai phần bằng nhau: 8 : 2 = 4 cm.', [
      'Đúng — trung điểm M chia AB thành hai phần bằng nhau, nên AM = 8 : 2 = 4 cm.',
      'Sai — 8 cm là cả đoạn AB, trung điểm chỉ lấy nửa đoạn.',
      'Sai — 16 cm là em lấy 8 × 2, nhưng trung điểm phải chia đôi.',
      'Sai — 2 cm là em chia 8 cho 4, nhưng trung điểm chỉ chia đoạn làm 2 phần.',
    ]),
  ]),

  M(20, 'Hình tam giác – Hình tứ giác – Góc vuông – Góc không vuông', [
    Q('Hình tam giác có mấy cạnh, mấy đỉnh?', ['4 cạnh, 4 đỉnh', '3 cạnh, 3 đỉnh', '2 cạnh, 3 đỉnh', '3 cạnh, 4 đỉnh'], 1, 'Tam giác: 3 cạnh, 3 đỉnh, 3 góc.', [
      'Sai — 4 cạnh 4 đỉnh là hình tứ giác, không phải tam giác.',
      'Đúng — tam giác có 3 cạnh và 3 đỉnh.',
      'Sai — tam giác có 3 cạnh chứ không phải 2 cạnh.',
      'Sai — số cạnh và số đỉnh của tam giác đều bằng 3.',
    ]),
    Q('Hình tứ giác có mấy cạnh?', ['4', '5', '6', '3'], 0, '"Tứ" = 4 → 4 cạnh.', [
      'Đúng — "tứ" nghĩa là 4, nên tứ giác có 4 cạnh.',
      'Sai — 5 cạnh là hình ngũ giác, không phải tứ giác.',
      'Sai — 6 cạnh là hình lục giác, không phải tứ giác.',
      'Sai — 3 cạnh là tam giác, không phải tứ giác.',
    ]),
    Q('Góc vuông là góc?', ['Không xác định', 'Lớn hơn ê-ke', 'Nhỏ hơn ê-ke', 'Bằng góc của ê-ke'], 3, 'Dùng ê-ke kiểm tra: trùng khít → vuông.', [
      'Sai — góc vuông là góc xác định rõ, bằng góc của ê-ke.',
      'Sai — lớn hơn góc ê-ke là góc tù, không phải góc vuông.',
      'Sai — nhỏ hơn góc ê-ke là góc nhọn, không phải góc vuông.',
      'Đúng — góc vuông bằng đúng góc của ê-ke (đặt vào trùng khít).',
    ]),
    Q('Hình chữ nhật có mấy góc vuông?', ['2', '1', '4', '3'], 2, 'Hình chữ nhật có 4 góc vuông.', [
      'Sai — hình chữ nhật có 4 góc vuông chứ không phải 2.',
      'Sai — hình chữ nhật có 4 góc vuông chứ không phải 1.',
      'Đúng — hình chữ nhật có cả 4 góc đều là góc vuông.',
      'Sai — hình chữ nhật có đủ 4 góc vuông chứ không phải 3.',
    ]),
    Q('Dụng cụ để kiểm tra góc vuông là?', ['Bút chì', 'Com-pa', 'Thước thẳng', 'Ê-ke'], 3, 'Ê-ke có 1 góc vuông.', [
      'Sai — bút chì để viết, không kiểm tra được góc vuông.',
      'Sai — com-pa để vẽ đường tròn, không kiểm tra góc vuông.',
      'Sai — thước thẳng để đo độ dài, không kiểm tra góc vuông.',
      'Đúng — ê-ke có một góc vuông nên dùng để kiểm tra góc vuông.',
    ]),
    Q('Một góc nhỏ hơn góc vuông gọi là?', ['Góc vuông', 'Góc tù', 'Đường thẳng', 'Góc không vuông (góc nhọn)'], 3, 'Góc nhỏ hơn vuông gọi là góc nhọn (góc không vuông).', [
      'Sai — góc vuông là góc bằng ê-ke, không phải nhỏ hơn.',
      'Sai — góc tù là góc lớn hơn góc vuông, không phải nhỏ hơn.',
      'Sai — đường thẳng không phải là một góc.',
      'Đúng — góc nhỏ hơn góc vuông là góc nhọn (góc không vuông).',
    ]),
  ]),

  M(21, 'Chu vi hình tam giác – Chu vi hình tứ giác', [
    Q('Chu vi tam giác là?', ['Một cạnh × 3', 'Tổng độ dài 3 cạnh', 'Hiệu 2 cạnh', 'Tích 3 cạnh'], 1, 'Chu vi = tổng độ dài các cạnh.', [
      'Sai — chỉ nhân một cạnh với 3 đúng khi tam giác đều, không phải mọi tam giác.',
      'Đúng — chu vi tam giác là tổng độ dài của cả 3 cạnh.',
      'Sai — chu vi là cộng các cạnh, không phải hiệu.',
      'Sai — chu vi là cộng các cạnh, không phải nhân.',
    ]),
    Q('Tam giác có 3 cạnh 4 cm, 5 cm, 6 cm. Chu vi?', ['20 cm', '16 cm', '14 cm', '15 cm'], 3, '4 + 5 + 6 = 15 cm.', [
      'Sai — 20 là cộng dư, hãy lấy 4 + 5 + 6.',
      'Sai — 16 là cộng nhầm, kiểm tra lại 4 + 5 + 6.',
      'Sai — 14 là cộng thiếu một cạnh, hãy cộng đủ 3 cạnh.',
      'Đúng — chu vi = 4 + 5 + 6 = 15 cm.',
    ]),
    Q('Tam giác đều cạnh 7 cm có chu vi?', ['7 cm', '21 cm', '28 cm', '14 cm'], 1, '7 × 3 = 21 cm.', [
      'Sai — 7 cm mới là một cạnh, chu vi phải cộng cả 3 cạnh.',
      'Đúng — tam giác đều có 3 cạnh bằng nhau: 7 × 3 = 21 cm.',
      'Sai — 28 là 7 × 4, nhưng tam giác chỉ có 3 cạnh.',
      'Sai — 14 là 7 × 2, mới có 2 cạnh, còn thiếu một cạnh.',
    ]),
    Q('Chu vi tứ giác bằng?', ['Hiệu 4 cạnh', 'Tổng độ dài 4 cạnh', '4 × 1 cạnh', 'Tích 2 cạnh'], 1, 'Chu vi tứ giác = tổng 4 cạnh.', [
      'Sai — chu vi là cộng các cạnh, không phải hiệu.',
      'Đúng — chu vi tứ giác là tổng độ dài của cả 4 cạnh.',
      'Sai — nhân một cạnh với 4 chỉ đúng khi 4 cạnh bằng nhau.',
      'Sai — chu vi là cộng 4 cạnh, không phải nhân 2 cạnh.',
    ]),
    Q('Tứ giác ABCD có 4 cạnh: 3 cm, 4 cm, 5 cm, 6 cm. Chu vi?', ['20 cm', '17 cm', '12 cm', '18 cm'], 3, '3 + 4 + 5 + 6 = 18 cm.', [
      'Sai — 20 là cộng dư, hãy lấy 3 + 4 + 5 + 6.',
      'Sai — 17 là cộng thiếu, kiểm tra lại tổng 4 cạnh.',
      'Sai — 12 là cộng thiếu một cạnh, hãy cộng đủ 4 cạnh.',
      'Đúng — chu vi = 3 + 4 + 5 + 6 = 18 cm.',
    ]),
    Q('Tam giác cân có 2 cạnh bằng nhau 6 cm và cạnh đáy 4 cm. Chu vi?', ['16 cm', '18 cm', '14 cm', '20 cm'], 0, '6 + 6 + 4 = 16 cm.', [
      'Đúng — hai cạnh bên 6 cm và đáy 4 cm: 6 + 6 + 4 = 16 cm.',
      'Sai — 18 là cộng dư, hãy lấy 6 + 6 + 4.',
      'Sai — 14 là quên một cạnh bên, phải cộng hai cạnh 6 cm.',
      'Sai — 20 là cộng dư, kiểm tra lại 6 + 6 + 4.',
    ]),
  ]),

  M(22, 'Chu vi hình chữ nhật – Chu vi hình vuông', [
    Q('Công thức chu vi hình chữ nhật?', ['dài + rộng', '(dài + rộng) × 2', 'dài × rộng', '(dài − rộng) × 2'], 1, 'P = (a + b) × 2.', [
      'Sai — dài + rộng mới là nửa chu vi, còn phải nhân 2.',
      'Đúng — chu vi hình chữ nhật = (dài + rộng) × 2.',
      'Sai — dài × rộng là công thức diện tích, không phải chu vi.',
      'Sai — chu vi là cộng dài với rộng rồi nhân 2, không phải hiệu.',
    ]),
    Q('Hình chữ nhật dài 8 cm, rộng 5 cm. Chu vi?', ['26 cm', '40 cm', '13 cm', '24 cm'], 0, '(8 + 5) × 2 = 26 cm.', [
      'Đúng — (8 + 5) × 2 = 13 × 2 = 26 cm.',
      'Sai — 40 là 8 × 5, đó là diện tích chứ không phải chu vi.',
      'Sai — 13 mới là dài + rộng, còn quên nhân 2.',
      'Sai — 24 không đúng, hãy lấy (8 + 5) × 2.',
    ]),
    Q('Công thức chu vi hình vuông?', ['cạnh × cạnh', 'cạnh × 4', '4 × 4', 'cạnh + 4'], 1, 'P = cạnh × 4.', [
      'Sai — cạnh × cạnh là công thức diện tích, không phải chu vi.',
      'Đúng — hình vuông có 4 cạnh bằng nhau nên chu vi = cạnh × 4.',
      'Sai — 4 × 4 chỉ đúng khi cạnh là 4, không phải công thức chung.',
      'Sai — chu vi là cạnh nhân 4, không phải cộng 4.',
    ]),
    Q('Hình vuông cạnh 7 cm có chu vi?', ['28 cm', '21 cm', '14 cm', '49 cm'], 0, '7 × 4 = 28 cm.', [
      'Đúng — hình vuông có 4 cạnh: 7 × 4 = 28 cm.',
      'Sai — 21 là 7 × 3, mới có 3 cạnh, hình vuông có 4 cạnh.',
      'Sai — 14 là 7 × 2, mới có 2 cạnh.',
      'Sai — 49 là 7 × 7, đó là diện tích chứ không phải chu vi.',
    ]),
    Q('Mảnh vườn HCN dài 12 m, rộng 8 m. Rào cần bao nhiêu mét?', ['20 m', '32 m', '48 m', '40 m'], 3, '(12 + 8) × 2 = 40 m.', [
      'Sai — 20 mới là dài + rộng, còn quên nhân 2.',
      'Sai — 32 không đúng, hãy lấy (12 + 8) × 2.',
      'Sai — 48 không đúng với công thức chu vi hình chữ nhật.',
      'Đúng — rào quanh vườn là chu vi: (12 + 8) × 2 = 40 m.',
    ]),
    Q('Khăn vuông cạnh 30 cm có chu vi?', ['120 cm', '60 cm', '900 cm', '90 cm'], 0, '30 × 4 = 120 cm.', [
      'Đúng — khăn vuông có 4 cạnh: 30 × 4 = 120 cm.',
      'Sai — 60 là 30 × 2, mới có 2 cạnh.',
      'Sai — 900 là 30 × 30, đó là diện tích chứ không phải chu vi.',
      'Sai — 90 là 30 × 3, mới có 3 cạnh.',
    ]),
    Q('Diện tích của một hình là gì?', ['Số đo phần mặt bên trong hình', 'Độ dài đường bao quanh hình', 'Số cạnh của hình', 'Số đỉnh của hình'], 0, 'Diện tích là số đo phần mặt nằm bên trong hình.', [
      'Đúng — diện tích cho biết độ lớn phần mặt nằm bên trong hình.',
      'Sai — độ dài đường bao quanh hình là chu vi, không phải diện tích.',
      'Sai — số cạnh là đặc điểm của hình, không phải diện tích.',
      'Sai — số đỉnh là đặc điểm của hình, không phải diện tích.',
    ]),
    Q('Hình chữ nhật dài 6 cm, rộng 4 cm. Diện tích?', ['24 cm²', '20 cm²', '10 cm²', '24 cm'], 0, 'Diện tích = dài × rộng = 6 × 4 = 24 cm².', [
      'Đúng — diện tích hình chữ nhật = dài × rộng = 6 × 4 = 24 cm².',
      'Sai — 20 cm² là chu vi (6 + 4) × 2, đề hỏi diện tích phải nhân hai cạnh.',
      'Sai — 10 cm² là em cộng 6 + 4, nhưng diện tích phải nhân.',
      'Sai — số đúng là 24 nhưng đơn vị diện tích là cm² chứ không phải cm.',
    ]),
    Q('Hình vuông cạnh 5 cm có diện tích?', ['25 cm²', '20 cm²', '10 cm²', '25 cm'], 0, 'Diện tích = cạnh × cạnh = 5 × 5 = 25 cm².', [
      'Đúng — diện tích hình vuông = cạnh × cạnh = 5 × 5 = 25 cm².',
      'Sai — 20 cm² là chu vi 5 × 4, đề hỏi diện tích phải nhân cạnh với cạnh.',
      'Sai — 10 cm² là em lấy 5 × 2, nhưng diện tích là cạnh nhân cạnh.',
      'Sai — số đúng là 25 nhưng đơn vị diện tích là cm² chứ không phải cm.',
    ]),
  ]),

  M(23, 'Số có 4 chữ số – So sánh số', [
    Q('Số 3 254 đọc là?', ['Ba nghìn hai trăm năm mươi tư', 'Ba trăm hai mươi lăm tư', 'Ba mươi hai nghìn năm tư', 'Ba mươi hai năm tư'], 0, '3 254 = ba nghìn hai trăm năm mươi tư.', [
      'Đúng — 3 là nghìn, 2 là trăm, 5 chục 4 đơn vị: ba nghìn hai trăm năm mươi tư.',
      'Sai — cách đọc này bỏ mất hàng nghìn của số 3 254.',
      'Sai — đọc nhầm hàng, số này có hàng nghìn là 3.',
      'Sai — đọc thiếu hàng trăm và hàng chục của số.',
    ]),
    Q('Chữ số 5 trong số 5 482 ở hàng?', ['Hàng trăm', 'Hàng chục', 'Nghìn', 'Đơn vị'], 2, 'Chữ số đầu tiên (trái) là hàng nghìn.', [
      'Sai — hàng trăm là chữ số 4, không phải 5.',
      'Sai — hàng chục là chữ số 8, không phải 5.',
      'Đúng — chữ số 5 đứng đầu bên trái nên ở hàng nghìn.',
      'Sai — hàng đơn vị là chữ số 2, không phải 5.',
    ]),
    Q('Số nhỏ nhất có 4 chữ số là?', ['1000', '9999', '0001', '1111'], 0, '1000.', [
      'Đúng — số nhỏ nhất có 4 chữ số là 1000.',
      'Sai — 9999 là số lớn nhất có 4 chữ số, không phải nhỏ nhất.',
      'Sai — 0001 chỉ là số 1, không tính là số có 4 chữ số.',
      'Sai — 1111 lớn hơn 1000, nên không phải nhỏ nhất.',
    ]),
    Q('Số lớn nhất có 4 chữ số là?', ['9990', '10000', '9909', '9999'], 3, '9999.', [
      'Sai — 9990 nhỏ hơn 9999 vì hàng chục và đơn vị là 0.',
      'Sai — 10000 đã có 5 chữ số, không phải 4 chữ số.',
      'Sai — 9909 nhỏ hơn 9999 vì hàng chục là 0.',
      'Đúng — số lớn nhất có 4 chữ số là 9999.',
    ]),
    Q('So sánh: 4 521 ___ 4 512', ['Dấu <', '>', 'Dấu ≤', 'Dấu ='], 1, 'Chữ số hàng chục: 2 > 1 → 4521 > 4512.', [
      'Sai — 4521 lớn hơn 4512 nên không dùng dấu bé hơn.',
      'Đúng — hai số bằng nhau đến hàng trăm, hàng chục 2 > 1 nên 4521 > 4512.',
      'Sai — 4521 thực sự lớn hơn, không phải bé hơn hoặc bằng.',
      'Sai — hai số khác nhau ở hàng chục nên không bằng nhau.',
    ]),
    Q('Số liền sau của 6 999 là?', ['7000', '6991', '6998', '7001'], 0, '6999 + 1 = 7000.', [
      'Đúng — số liền sau là số lớn hơn 1 đơn vị: 6999 + 1 = 7000.',
      'Sai — 6991 nhỏ hơn 6999, không phải số liền sau.',
      'Sai — 6998 là số liền trước 6999, không phải liền sau.',
      'Sai — 7001 cách 6999 tới 2 đơn vị, không phải liền sau.',
    ]),
    Q('Làm tròn số 47 đến hàng chục được số nào?', ['50', '40', '47', '60'], 0, 'Đơn vị 7 ≥ 5 nên làm tròn lên: 47 → 50.', [
      'Đúng — chữ số hàng đơn vị là 7 (≥ 5) nên làm tròn lên thành 50.',
      'Sai — 40 là làm tròn xuống, nhưng đơn vị 7 ≥ 5 phải làm tròn lên.',
      'Sai — 47 chưa được làm tròn, hãy xét chữ số hàng đơn vị.',
      'Sai — 60 là làm tròn quá xa, 47 gần 50 hơn nên tròn về 50.',
    ]),
    Q('Làm tròn số 3 280 đến hàng nghìn được số nào?', ['3000', '4000', '3200', '3300'], 0, 'Chữ số hàng trăm là 2 (< 5) nên làm tròn xuống: 3 280 → 3000.', [
      'Đúng — chữ số hàng trăm là 2 (< 5) nên làm tròn xuống còn 3000.',
      'Sai — 4000 là làm tròn lên, nhưng hàng trăm 2 < 5 phải làm tròn xuống.',
      'Sai — 3200 là làm tròn đến hàng trăm, đề yêu cầu đến hàng nghìn.',
      'Sai — 3300 là làm tròn đến hàng trăm và còn sai, đề yêu cầu hàng nghìn.',
    ]),
  ]),

  M(24, 'Phép cộng các số trong phạm vi 10 000', [
    Q('3 254 + 2 145 = ?', ['5 399', '5 499', '5 199', '5 299'], 0, '4+5=9; 5+4=9; 2+1=3; 3+2=5 → 5 399.', [
      'Đúng — cộng từng hàng: 4+5=9; 5+4=9; 2+1=3; 3+2=5 → 5 399.',
      'Sai — 5 499 là cộng dư ở hàng trăm, kiểm tra lại.',
      'Sai — 5 199 là cộng thiếu ở hàng trăm.',
      'Sai — 5 299 là cộng nhầm hàng trăm, đúng phải là 3.',
    ]),
    Q('4 567 + 1 234 = ?', ['5 801', '5 811', '5 791', '6 801'], 0, '7+4=11; 6+3+1=10; 5+2+1=8; 4+1=5 → 5 801.', [
      'Đúng — có nhớ: 7+4=11; 6+3+1=10; 5+2+1=8; 4+1=5 → 5 801.',
      'Sai — 5 811 là cộng dư, kiểm tra lại số nhớ ở hàng chục.',
      'Sai — 5 791 là cộng thiếu nhớ, hãy nhớ đúng từng hàng.',
      'Sai — 6 801 là cộng dư ở hàng nghìn, đúng phải là 5.',
    ]),
    Q('2 800 + 3 600 = ?', ['6 400', '6 200', '6 300', '5 400'], 0, '2800 + 3600 = 6400.', [
      'Đúng — 800 + 600 = 1400 nhớ 1; 2 + 3 + 1 = 6 → 6400.',
      'Sai — 6 200 là quên nhớ, 800 + 600 = 1400 phải nhớ 1.',
      'Sai — 6 300 là cộng nhầm, hãy cộng lại 800 + 600.',
      'Sai — 5 400 là quên nhớ 1 sang hàng nghìn.',
    ]),
    Q('Tổng của 1 526 và 3 478 là?', ['5 004', '4 904', '4 994', '5 014'], 0, '1526 + 3478 = 5004.', [
      'Đúng — 1526 + 3478 = 5004 (có nhớ qua nhiều hàng).',
      'Sai — 4 904 là tính sai số nhớ ở hàng nghìn.',
      'Sai — 4 994 là cộng thiếu nhớ, kiểm tra lại từng hàng.',
      'Sai — 5 014 là cộng dư, hãy đặt tính lại cho đúng hàng.',
    ]),
    Q('Một kho có 4 250 kg gạo, nhập thêm 1 750 kg. Kho có?', ['6 000 kg', '5 900 kg', '5 000 kg', '6 100 kg'], 0, '4250 + 1750 = 6000 kg.', [
      'Đúng — nhập thêm thì cộng: 4250 + 1750 = 6000 kg.',
      'Sai — 5 900 là cộng thiếu, kiểm tra lại 250 + 750.',
      'Sai — 5 000 là quên nhớ sang hàng nghìn.',
      'Sai — 6 100 là cộng dư, hãy cộng lại cho đúng.',
    ]),
    Q('6 234 + 0 = ?', ['0', '62340', '1', '6234'], 3, 'Cộng với 0 giữ nguyên.', [
      'Sai — 0 chỉ đúng nếu cả hai số là 0, đây có số 6234.',
      'Sai — 62340 là em viết thêm số 0 vào cuối, không phải phép cộng.',
      'Sai — 1 không phải kết quả của phép cộng với 0.',
      'Đúng — bất kì số nào cộng với 0 đều giữ nguyên giá trị: 6234.',
    ]),
  ]),

  M(25, 'Phép trừ các số trong phạm vi 10 000', [
    Q('5 678 − 2 345 = ?', ['7 023', '3 233', '3 433', '3 333'], 3, '8−5=3; 7−4=3; 6−3=3; 5−2=3 → 3 333.', [
      'Sai — 7 023 là em cộng thay vì trừ, hãy làm phép trừ.',
      'Sai — 3 233 là trừ nhầm một hàng, kiểm tra lại từng hàng.',
      'Sai — 3 433 là trừ nhầm hàng trăm, đúng phải là 3.',
      'Đúng — trừ từng hàng: 8−5=3; 7−4=3; 6−3=3; 5−2=3 → 3 333.',
    ]),
    Q('4 000 − 1 567 = ?', ['2 443', '2 433', '3 433', '2 533'], 1, '4000 − 1567 = 2433.', [
      'Sai — 2 443 là tính sai khi mượn, kiểm tra lại hàng chục.',
      'Đúng — 4000 − 1567 = 2433 (mượn qua nhiều hàng).',
      'Sai — 3 433 là quên mượn ở hàng nghìn.',
      'Sai — 2 533 là tính sai hàng trăm sau khi mượn.',
    ]),
    Q('7 234 − 3 856 = ?', ['3 278', '3 378', '3 388', '4 378'], 1, '7234 − 3856 = 3378.', [
      'Sai — 3 278 là tính sai hàng chục khi mượn.',
      'Đúng — 7234 − 3856 = 3378 (mượn qua nhiều hàng).',
      'Sai — 3 388 là tính sai hàng chục, kiểm tra lại.',
      'Sai — 4 378 là quên mượn ở hàng nghìn.',
    ]),
    Q('Hiệu của 8 500 và 2 700 là?', ['6 200', '5 700', '5 800', '5 200'], 2, '8500 − 2700 = 5800.', [
      'Sai — 6 200 là quên mượn ở hàng trăm.',
      'Sai — 5 700 là tính sai hàng trăm sau khi mượn.',
      'Đúng — 500 − 700 phải mượn: 1500 − 700 = 800; 7 − 2 = 5 → 5800.',
      'Sai — 5 200 là trừ nhầm hàng trăm.',
    ]),
    Q('Trường có 1 245 học sinh, lớp 3 chiếm 320 bạn. Lớp khác?', ['935', '825', '925', '915'], 2, '1245 − 320 = 925 bạn.', [
      'Sai — 935 là trừ nhầm hàng chục, đúng phải là 2.',
      'Sai — 825 là trừ nhầm hàng trăm, kiểm tra lại 2 − 3.',
      'Đúng — số lớp khác = 1245 − 320 = 925 bạn.',
      'Sai — 915 là trừ nhầm hàng chục, hãy đặt tính cho đúng hàng.',
    ]),
    Q('9 999 − 1 = ?', ['9 988', '9 998', '10 000', '999'], 1, '9999 − 1 = 9998.', [
      'Sai — 9 988 là trừ nhầm hàng chục, chỉ trừ 1 đơn vị.',
      'Đúng — bớt 1 đơn vị: 9999 − 1 = 9998.',
      'Sai — 10 000 là em cộng 1, nhưng đề là trừ 1.',
      'Sai — 999 là bớt mất quá nhiều, chỉ trừ 1 đơn vị thôi.',
    ]),
  ]),

  M(26, 'Nhân số có 3 chữ số với số có 1 chữ số', [
    Q('123 × 2 = ?', ['236', '226', '246', '125'], 2, '123 × 2 = 246.', [
      'Sai — 236 là nhân nhầm hàng trăm, 1 × 2 = 2 và giữ đủ hàng.',
      'Sai — 226 là nhân nhầm hàng chục, 2 × 2 = 4 chứ không phải 2.',
      'Đúng — 3×2=6; 2×2=4; 1×2=2 → 246.',
      'Sai — 125 là em cộng 123 + 2, nhưng đề cần phép nhân.',
    ]),
    Q('234 × 3 = ?', ['602', '702', '692', '712'], 1, '234 × 3 = 702.', [
      'Sai — 602 là tính sai số nhớ ở hàng trăm.',
      'Đúng — 4×3=12 viết 2 nhớ 1; 3×3+1=10 viết 0 nhớ 1; 2×3+1=7 → 702.',
      'Sai — 692 là tính sai, kiểm tra lại số nhớ.',
      'Sai — 712 là cộng dư số nhớ ở hàng trăm.',
    ]),
    Q('152 × 4 = ?', ['480', '508', '608', '618'], 2, '152 × 4 = 608.', [
      'Sai — 480 là tính sai, hãy đặt tính nhân từng hàng.',
      'Sai — 508 là quên nhớ ở hàng chục, kiểm tra lại.',
      'Đúng — 2×4=8; 5×4=20 viết 0 nhớ 2; 1×4+2=6 → 608.',
      'Sai — 618 là cộng dư số nhớ ở hàng trăm.',
    ]),
    Q('219 × 5 = ?', ['1 005', '1 095', '1 045', '1 195'], 1, '219 × 5 = 1095.', [
      'Sai — 1 005 là quên nhớ ở hàng chục.',
      'Đúng — 9×5=45 viết 5 nhớ 4; 1×5+4=9; 2×5=10 → 1095.',
      'Sai — 1 045 là tính sai hàng chục, kiểm tra lại số nhớ.',
      'Sai — 1 195 là cộng dư số nhớ ở hàng trăm.',
    ]),
    Q('Mỗi thùng đựng 125 quả táo. 6 thùng có?', ['725', '750', '650', '775'], 1, '125 × 6 = 750 quả.', [
      'Sai — 725 là tính sai số nhớ, kiểm tra lại 125 × 6.',
      'Đúng — mỗi thùng 125 quả, 6 thùng là 125 × 6 = 750 quả.',
      'Sai — 650 là tính thiếu, hãy nhân lại từng hàng.',
      'Sai — 775 là cộng dư số nhớ, kiểm tra lại.',
    ]),
    Q('108 × 7 = ?', ['716', '786', '756', '707'], 2, '108 × 7 = 756.', [
      'Sai — 716 là tính sai, hãy nhân từng hàng có nhớ.',
      'Sai — 786 là cộng dư số nhớ ở hàng trăm.',
      'Đúng — 8×7=56 viết 6 nhớ 5; 0×7+5=5; 1×7=7 → 756.',
      'Sai — 707 là quên nhân hàng chục (0 × 7 rồi cộng nhớ).',
    ]),
  ]),

  M(27, 'Chia số có 3 chữ số cho số có 1 chữ số', [
    Q('246 : 2 = ?', ['132', '122', '124', '123'], 3, '246 : 2 = 123.', [
      'Sai — 132 là chia nhầm hàng chục, 4 : 2 = 2 chứ không phải 3.',
      'Sai — 122 là chia nhầm hàng đơn vị, 6 : 2 = 3 chứ không phải 2.',
      'Sai — 124 là chia nhầm hàng đơn vị, kiểm tra lại 6 : 2.',
      'Đúng — 2:2=1; 4:2=2; 6:2=3 → 123.',
    ]),
    Q('693 : 3 = ?', ['231', '232', '230', '233'], 0, '693 : 3 = 231.', [
      'Đúng — 6:3=2; 9:3=3; 3:3=1 → 231.',
      'Sai — 232 là chia nhầm hàng đơn vị, 3 : 3 = 1 chứ không phải 2.',
      'Sai — 230 là chia nhầm hàng đơn vị, 3 : 3 = 1 chứ không phải 0.',
      'Sai — 233 là chia nhầm hàng đơn vị, kiểm tra lại 3 : 3.',
    ]),
    Q('408 : 4 = ?', ['112', '102', '120', '101'], 1, '408 : 4 = 102.', [
      'Sai — 112 là quên ghi 0 ở hàng chục (0 : 4 = 0).',
      'Đúng — 4:4=1; 0:4=0; 8:4=2 → 102.',
      'Sai — 120 là đặt sai chữ số, kiểm tra lại từng hàng.',
      'Sai — 101 là chia sai hàng đơn vị, 8 : 4 = 2 chứ không phải 1.',
    ]),
    Q('945 : 5 = ?', ['198', '199', '188', '189'], 3, '945 : 5 = 189.', [
      'Sai — 198 là tính sai, hãy chia lần lượt từng hàng có dư.',
      'Sai — 199 là tính sai bước cuối, kiểm tra lại.',
      'Sai — 188 là tính sai, hãy đặt phép chia cho đúng.',
      'Đúng — 9:5=1 dư 4; 44:5=8 dư 4; 45:5=9 → 189.',
    ]),
    Q('Chia đều 720 viên kẹo vào 6 hộp. Mỗi hộp?', ['110', '130', '120', '210'], 2, '720 : 6 = 120 viên.', [
      'Sai — 110 là chia thiếu, hãy chia lại 720 : 6.',
      'Sai — 130 là chia dư, kiểm tra lại 12 : 6 = 2.',
      'Đúng — 7:6=1 dư 1; 12:6=2; 0:6=0 → 120 viên mỗi hộp.',
      'Sai — 210 là đặt sai chữ số, hãy chia lần lượt từng hàng.',
    ]),
    Q('847 : 7 = ?', ['131', '121', '120', '112'], 1, '847 : 7 = 121.', [
      'Sai — 131 là chia dư ở hàng chục, kiểm tra lại.',
      'Đúng — 8:7=1 dư 1; 14:7=2; 7:7=1 → 121.',
      'Sai — 120 là quên chia hàng đơn vị, 7 : 7 = 1.',
      'Sai — 112 là đặt sai chữ số, hãy chia lần lượt từng hàng.',
    ]),
  ]),

  M(28, 'Ki-lô-gam – Gam (g, kg)', [
    Q('1 kg = ? g', ['10 g', '10000 g', '1000 g', '100 g'], 2, '1 kg = 1000 g.', [
      'Sai — 10 g quá nhỏ, 1 kg lớn hơn nhiều.',
      'Sai — 10000 g là 10 kg, quá nhiều.',
      'Đúng — 1 kg bằng 1000 g.',
      'Sai — 100 g chỉ là một phần mười của kg, chưa đủ.',
    ]),
    Q('2 kg = ? g', ['20 g', '20000 g', '2000 g', '200 g'], 2, '2 × 1000 = 2000 g.', [
      'Sai — 20 g quá nhỏ so với 2 kg.',
      'Sai — 20000 g là 20 kg, quá nhiều.',
      'Đúng — mỗi kg là 1000 g nên 2 kg = 2 × 1000 = 2000 g.',
      'Sai — 200 g chưa đủ, hãy nhân 2 với 1000.',
    ]),
    Q('Túi đường nặng 500 g + 500 g = ?', ['1 kg', '10 g', '100 g', '5 kg'], 0, '500 + 500 = 1000 g = 1 kg.', [
      'Đúng — 500 + 500 = 1000 g, mà 1000 g = 1 kg.',
      'Sai — 10 g quá nhỏ, hãy cộng 500 + 500.',
      'Sai — 100 g chưa đủ, tổng là 1000 g.',
      'Sai — 5 kg quá lớn, 1000 g chỉ bằng 1 kg.',
    ]),
    Q('3 kg cam + 2 kg táo = ?', ['5 kg', '32 kg', '1 kg', '6 kg'], 0, '3 + 2 = 5 kg.', [
      'Đúng — cùng đơn vị kg nên cộng: 3 + 2 = 5 kg.',
      'Sai — 32 kg là em viết liền hai số, hãy cộng 3 + 2.',
      'Sai — 1 kg là em lấy 3 − 2, nhưng đề là cộng.',
      'Sai — 6 kg là cộng dư, 3 + 2 = 5 kg.',
    ]),
    Q('Đơn vị nào dùng để cân 1 con voi?', ['mi-li-mét (mm)', 'mi-li-lít', 'gam (g)', 'ki-lô-gam'], 3, 'Voi rất nặng → dùng kg (hoặc tấn).', [
      'Sai — mi-li-mét đo độ dài, không đo khối lượng.',
      'Sai — mi-li-lít đo dung tích chất lỏng, không đo voi.',
      'Sai — gam quá nhỏ để cân một con voi.',
      'Đúng — voi rất nặng nên cân bằng ki-lô-gam (hoặc tấn).',
    ]),
    Q('Một quả táo nặng khoảng?', ['10 kg', '150 g', '1 g', '1 kg'], 1, 'Táo nhỡ ~ 150 g.', [
      'Sai — 10 kg quá nặng cho một quả táo.',
      'Đúng — một quả táo nhỡ nặng khoảng 150 g.',
      'Sai — 1 g quá nhẹ, chỉ bằng vài hạt nhỏ.',
      'Sai — 1 kg là quá nặng cho một quả táo.',
    ]),
  ]),

  M(29, 'Mi-li-lít – Lít (ml, l)', [
    Q('1 l = ? ml', ['1000 ml', '10 ml', '10 000 ml', '100 ml'], 0, '1 l = 1000 ml.', [
      'Đúng — 1 lít bằng 1000 mi-li-lít.',
      'Sai — 10 ml quá ít so với 1 lít.',
      'Sai — 10 000 ml là 10 lít, quá nhiều.',
      'Sai — 100 ml chỉ là một phần mười của lít, chưa đủ.',
    ]),
    Q('2 l = ? ml', ['200 ml', '20000 ml', '20 ml', '2000 ml'], 3, '2 × 1000 = 2000 ml.', [
      'Sai — 200 ml chưa đủ, hãy nhân 2 với 1000.',
      'Sai — 20000 ml là 20 lít, quá nhiều.',
      'Sai — 20 ml quá ít so với 2 lít.',
      'Đúng — mỗi lít là 1000 ml nên 2 l = 2 × 1000 = 2000 ml.',
    ]),
    Q('Cốc nước 250 ml × 4 cốc = ?', ['4 l', '40 ml', '1 l', '100 ml'], 2, '250 × 4 = 1000 ml = 1 l.', [
      'Sai — 4 l quá nhiều, hãy tính 250 × 4 trước.',
      'Sai — 40 ml quá ít, mỗi cốc đã 250 ml rồi.',
      'Đúng — 250 × 4 = 1000 ml, mà 1000 ml = 1 l.',
      'Sai — 100 ml chưa đủ, tổng là 1000 ml.',
    ]),
    Q('Đơn vị nào dùng đo nước?', ['xăng-ti-mét (cm)', 'ki-lô-gam (kg)', 'l hoặc ml', 'mét (m)'], 2, 'l (lít), ml (mi-li-lít) đo dung tích.', [
      'Sai — xăng-ti-mét đo độ dài, không đo nước.',
      'Sai — ki-lô-gam đo khối lượng, không đo dung tích nước.',
      'Đúng — lít (l) và mi-li-lít (ml) đo dung tích chất lỏng như nước.',
      'Sai — mét đo độ dài, không đo nước.',
    ]),
    Q('5 l − 2 l = ?', ['2 l', '3 l', '52 l', '7 l'], 1, '5 − 2 = 3 l.', [
      'Sai — 2 l là tính sai, hãy lấy 5 − 2.',
      'Đúng — cùng đơn vị lít nên trừ: 5 − 2 = 3 l.',
      'Sai — 52 l là em viết liền hai số, hãy lấy 5 − 2.',
      'Sai — 7 l là em cộng 5 + 2, nhưng đề là trừ.',
    ]),
    Q('Bình A 3 l + bình B 1500 ml = bao nhiêu ml?', ['4500 ml', '3015 ml', '3500 ml', '1800 ml'], 0, '3l = 3000 ml; 3000 + 1500 = 4500 ml.', [
      'Đúng — đổi 3 l = 3000 ml rồi cộng: 3000 + 1500 = 4500 ml.',
      'Sai — 3015 ml là cộng nhầm, hãy đổi 3 l thành 3000 ml trước.',
      'Sai — 3500 ml là quên đổi đủ, 3 l là 3000 ml chứ không phải 2000.',
      'Sai — 1800 ml là em cộng 3 + 1500, chưa đổi 3 l ra ml.',
    ]),
  ]),

  M(30, 'Tiền Việt Nam (đồng)', [
    Q('Tờ tiền nào có mệnh giá lớn nhất trong: 1 000đ, 2 000đ, 5 000đ, 10 000đ?', ['10 000đ', '1 000đ', '5 000đ', '2 000đ'], 0, '10 000đ là lớn nhất.', [
      'Đúng — 10 000đ là mệnh giá lớn nhất trong các tờ đã cho.',
      'Sai — 1 000đ là mệnh giá nhỏ nhất, không phải lớn nhất.',
      'Sai — 5 000đ nhỏ hơn 10 000đ.',
      'Sai — 2 000đ nhỏ hơn 10 000đ.',
    ]),
    Q('2 tờ 5 000đ = bao nhiêu?', ['10 000đ', '5 000đ', '15 000đ', '7 000đ'], 0, '5 000 × 2 = 10 000đ.', [
      'Đúng — 2 tờ 5 000đ là 5 000 × 2 = 10 000đ.',
      'Sai — 5 000đ mới là một tờ, đề hỏi hai tờ.',
      'Sai — 15 000đ là 3 tờ 5 000đ, không phải 2 tờ.',
      'Sai — 7 000đ là em cộng 5 000 + 2 000, không đúng với đề.',
    ]),
    Q('Mua bút 3 500đ, đưa 5 000đ. Trả lại?', ['1 500đ', '1 000đ', '500đ', '2 000đ'], 0, '5 000 − 3 500 = 1 500đ.', [
      'Đúng — tiền trả lại = 5 000 − 3 500 = 1 500đ.',
      'Sai — 1 000đ là trừ sai, hãy lấy 5 000 − 3 500.',
      'Sai — 500đ là trừ nhầm, kiểm tra lại 5 000 − 3 500.',
      'Sai — 2 000đ là trừ thiếu, đúng phải là 1 500đ.',
    ]),
    Q('1 tờ 20 000đ + 1 tờ 10 000đ = ?', ['40 000đ', '30 000đ', '25 000đ', '35 000đ'], 1, '20 000 + 10 000 = 30 000đ.', [
      'Sai — 40 000đ là cộng dư, hãy lấy 20 000 + 10 000.',
      'Đúng — 20 000 + 10 000 = 30 000đ.',
      'Sai — 25 000đ là cộng thiếu, kiểm tra lại.',
      'Sai — 35 000đ là cộng dư, đúng phải là 30 000đ.',
    ]),
    Q('Mua 3 quyển vở, mỗi quyển 4 000đ. Tổng?', ['4 003đ', '7 000đ', '12 000đ', '10 000đ'], 2, '4 000 × 3 = 12 000đ.', [
      'Sai — 4 003đ là em viết nhầm, hãy nhân 4 000 × 3.',
      'Sai — 7 000đ là em cộng 4 000 + 3 000, nhưng đề cần phép nhân.',
      'Đúng — mỗi quyển 4 000đ, 3 quyển là 4 000 × 3 = 12 000đ.',
      'Sai — 10 000đ chưa đủ, hãy lấy 4 000 × 3.',
    ]),
    Q('Có 50 000đ, mua hết 32 000đ. Còn?', ['18 000đ', '20 000đ', '28 000đ', '8 000đ'], 0, '50 000 − 32 000 = 18 000đ.', [
      'Đúng — tiền còn lại = 50 000 − 32 000 = 18 000đ.',
      'Sai — 20 000đ là trừ thiếu, kiểm tra lại 50 000 − 32 000.',
      'Sai — 28 000đ là trừ nhầm hàng chục nghìn.',
      'Sai — 8 000đ là trừ dư, đúng phải là 18 000đ.',
    ]),
  ]),

  M(31, 'Giờ – Phút – Xem đồng hồ', [
    Q('1 giờ = ? phút', ['24', '60', '100', '30'], 1, '1 giờ = 60 phút.', [
      'Sai — 24 là số giờ trong một ngày, không phải số phút trong một giờ.',
      'Đúng — 1 giờ bằng 60 phút.',
      'Sai — 100 không đúng, một giờ có 60 phút.',
      'Sai — 30 phút mới là nửa giờ, một giờ có 60 phút.',
    ]),
    Q('Kim ngắn chỉ 8, kim dài chỉ 12. Đồng hồ chỉ?', ['8 giờ', '8 giờ 12 phút', '12 giờ 8 phút', '8 giờ 30 phút'], 0, 'Kim phút ở 12 = đúng giờ → 8 giờ.', [
      'Đúng — kim dài (phút) chỉ 12 nghĩa là đúng giờ → 8 giờ.',
      'Sai — kim dài ở 12 là 0 phút, không phải 12 phút.',
      'Sai — kim ngắn chỉ giờ là 8, không phải 12 giờ.',
      'Sai — kim dài ở 12 là đúng giờ, không phải 30 phút.',
    ]),
    Q('Kim ngắn quá 7 một chút, kim dài ở số 6. Đồng hồ chỉ?', ['7 giờ', '7 giờ 30 phút', '7 giờ 6 phút', '6 giờ 30 phút'], 1, 'Kim phút ở 6 = 30 phút → 7 giờ 30 phút.', [
      'Sai — kim dài ở số 6 là 30 phút, không phải đúng giờ.',
      'Đúng — kim ngắn quá 7 và kim dài ở số 6 (30 phút) → 7 giờ 30 phút.',
      'Sai — kim dài ở số 6 là 30 phút, không phải 6 phút.',
      'Sai — kim ngắn đã quá 7 nên là 7 giờ, không phải 6 giờ.',
    ]),
    Q('15 phút = ? phần của giờ?', ['1/2 giờ', '1/4 giờ', '1/6 giờ', '1/3 giờ'], 1, '60 : 4 = 15 phút.', [
      'Sai — 1/2 giờ là 30 phút, không phải 15 phút.',
      'Đúng — 60 : 4 = 15 nên 15 phút là 1/4 giờ.',
      'Sai — 1/6 giờ là 10 phút, không phải 15 phút.',
      'Sai — 1/3 giờ là 20 phút, không phải 15 phút.',
    ]),
    Q('Em đi học 7 giờ, về 11 giờ. Em ở trường?', ['3 giờ', '5 giờ', '4 giờ', '11 giờ'], 2, '11 − 7 = 4 giờ.', [
      'Sai — 3 giờ là trừ thiếu, hãy lấy 11 − 7.',
      'Sai — 5 giờ là trừ dư, kiểm tra lại 11 − 7.',
      'Đúng — thời gian ở trường = 11 − 7 = 4 giờ.',
      'Sai — 11 là giờ về, không phải số giờ ở trường.',
    ]),
    Q('Nửa giờ bằng?', ['15 phút', '20 phút', '30 phút', '60 phút'], 2, 'Nửa giờ = 60 : 2 = 30 phút.', [
      'Sai — 15 phút là một phần tư giờ, không phải nửa giờ.',
      'Sai — 20 phút là một phần ba giờ, không phải nửa giờ.',
      'Đúng — nửa giờ là 60 : 2 = 30 phút.',
      'Sai — 60 phút là cả một giờ, không phải nửa giờ.',
    ]),
  ]),

  M(32, 'Ngày – Tháng – Năm · Lịch', [
    Q('Một năm có mấy tháng?', ['11', '12', '13', '10'], 1, '12 tháng (từ tháng 1 đến tháng 12).', [
      'Sai — 11 chưa đủ, một năm có đủ 12 tháng.',
      'Đúng — một năm có 12 tháng, từ tháng 1 đến tháng 12.',
      'Sai — 13 quá nhiều, một năm chỉ có 12 tháng.',
      'Sai — 10 chưa đủ, một năm có 12 tháng.',
    ]),
    Q('Tháng nào sau đây có 31 ngày?', ['Tháng 11', 'Tháng 2', 'Tháng 4', 'Tháng 7'], 3, 'Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.', [
      'Sai — tháng 11 chỉ có 30 ngày.',
      'Sai — tháng 2 có 28 hoặc 29 ngày, ít nhất trong năm.',
      'Sai — tháng 4 chỉ có 30 ngày.',
      'Đúng — tháng 7 nằm trong nhóm các tháng có 31 ngày.',
    ]),
    Q('Tháng 2 thường có?', ['28 hoặc 29 ngày', '31 ngày', '27 ngày', '30 ngày'], 0, 'Năm thường: 28; năm nhuận: 29.', [
      'Đúng — tháng 2 có 28 ngày, năm nhuận thì 29 ngày.',
      'Sai — tháng 2 không có 31 ngày.',
      'Sai — tháng 2 ít nhất là 28 ngày, không phải 27.',
      'Sai — tháng 2 không có 30 ngày.',
    ]),
    Q('Một tuần có mấy ngày?', ['8', '7', '5', '6'], 1, '7 ngày: T2 → CN.', [
      'Sai — 8 quá nhiều, một tuần có 7 ngày.',
      'Đúng — một tuần có 7 ngày, từ thứ Hai đến Chủ nhật.',
      'Sai — 5 ngày mới là số ngày đi học, một tuần có 7 ngày.',
      'Sai — 6 chưa đủ, một tuần có 7 ngày.',
    ]),
    Q('Một năm có khoảng bao nhiêu ngày?', ['365', '300', '400', '350'], 0, '365 ngày (năm nhuận 366).', [
      'Đúng — một năm thường có 365 ngày, năm nhuận có 366 ngày.',
      'Sai — 300 chưa đủ, một năm có khoảng 365 ngày.',
      'Sai — 400 quá nhiều, một năm có khoảng 365 ngày.',
      'Sai — 350 chưa đủ, một năm có khoảng 365 ngày.',
    ]),
    Q('Hôm nay là thứ Tư ngày 5. Thứ Tư tuần sau là ngày?', ['13', '11', '14', '12'], 3, '5 + 7 = 12.', [
      'Sai — 13 là cộng dư, mỗi tuần cách nhau 7 ngày.',
      'Sai — 11 là cộng thiếu, hãy lấy 5 + 7.',
      'Sai — 14 là cộng dư, một tuần là 7 ngày.',
      'Đúng — cùng thứ tuần sau cách 7 ngày: 5 + 7 = 12.',
    ]),
  ]),

  M(33, 'Ki-lô-mét (km) · Đo độ dài', [
    Q('1 km = ? m', ['1000 m', '10 m', '10000 m', '100 m'], 0, '1 km = 1000 m.', [
      'Đúng — 1 ki-lô-mét bằng 1000 mét.',
      'Sai — 10 m quá ngắn so với 1 km.',
      'Sai — 10000 m là 10 km, quá nhiều.',
      'Sai — 100 m chỉ là một phần mười của km, chưa đủ.',
    ]),
    Q('Đơn vị nào lớn nhất: mm, cm, dm, m, km?', ['mét (m)', 'đề-xi-mét (dm)', 'xăng-ti-mét (cm)', 'km'], 3, 'km là lớn nhất trong các đơn vị độ dài học ở Lớp 3.', [
      'Sai — mét lớn nhưng km còn lớn hơn (1 km = 1000 m).',
      'Sai — đề-xi-mét nhỏ hơn mét và km.',
      'Sai — xăng-ti-mét là một trong các đơn vị nhỏ.',
      'Đúng — ki-lô-mét (km) là đơn vị lớn nhất trong nhóm này.',
    ]),
    Q('2 km + 3 km = ?', ['500 m', '23 km', '6 km', '5 km'], 3, '2 + 3 = 5 km.', [
      'Sai — 500 m không liên quan, hãy cộng 2 km + 3 km.',
      'Sai — 23 km là em viết liền hai số, hãy lấy 2 + 3.',
      'Sai — 6 km là cộng dư, 2 + 3 = 5 km.',
      'Đúng — cùng đơn vị km nên cộng: 2 + 3 = 5 km.',
    ]),
    Q('Đoạn đường từ nhà đến trường ~ 2 km, đi mất 30 phút. Quãng đường nên đo bằng?', ['mét (m)', 'đề-xi-mét (dm)', 'km', 'xăng-ti-mét (cm)'], 2, 'Quãng đường xa → dùng km.', [
      'Sai — mét đo được nhưng quãng đường xa dùng km tiện hơn.',
      'Sai — đề-xi-mét quá nhỏ cho một quãng đường dài.',
      'Đúng — quãng đường xa như nhà đến trường nên đo bằng km.',
      'Sai — xăng-ti-mét quá nhỏ để đo quãng đường.',
    ]),
    Q('3 m = ? cm', ['33 cm', '300 cm', '30 cm', '3000 cm'], 1, '1 m = 100 cm → 3 × 100 = 300.', [
      'Sai — 33 cm không đúng, mỗi mét là 100 cm.',
      'Đúng — mỗi mét là 100 cm nên 3 m = 3 × 100 = 300 cm.',
      'Sai — 30 cm chưa đủ, hãy nhân 3 với 100.',
      'Sai — 3000 cm là 30 m, quá nhiều.',
    ]),
    Q('5 km − 1500 m = ? m', ['5500 m', '1500 m', '3500 m', '4500 m'], 2, '5 km = 5000 m; 5000 − 1500 = 3500 m.', [
      'Sai — 5500 m là em cộng thay vì trừ, hãy đổi km ra m trước.',
      'Sai — 1500 m là số đem trừ, không phải kết quả.',
      'Đúng — đổi 5 km = 5000 m rồi trừ: 5000 − 1500 = 3500 m.',
      'Sai — 4500 m là trừ thiếu, kiểm tra lại 5000 − 1500.',
    ]),
  ]),

  M(34, 'Hình hộp chữ nhật · Hình lập phương · Biểu đồ tranh', [
    Q('Hình hộp chữ nhật có mấy mặt?', ['5', '4', '8', '6'], 3, 'Hình hộp chữ nhật có 6 mặt.', [
      'Sai — 5 mặt chưa đủ, hình hộp chữ nhật có 6 mặt.',
      'Sai — 4 mặt chưa đủ, hãy đếm cả mặt trên và mặt dưới.',
      'Sai — 8 quá nhiều, hình hộp chữ nhật có 6 mặt.',
      'Đúng — hình hộp chữ nhật có đủ 6 mặt.',
    ]),
    Q('Hình lập phương có mấy mặt và mặt là hình gì?', ['5 mặt vuông', '6 mặt hình vuông', '4 mặt tam giác', '6 mặt chữ nhật'], 1, 'Lập phương: 6 mặt đều là hình vuông bằng nhau.', [
      'Sai — số mặt là 6 chứ không phải 5.',
      'Đúng — hình lập phương có 6 mặt và đều là hình vuông bằng nhau.',
      'Sai — các mặt là hình vuông chứ không phải tam giác.',
      'Sai — số mặt đúng là 6 nhưng các mặt là hình vuông, không phải chữ nhật.',
    ]),
    Q('Vật nào có dạng hình lập phương?', ['Cái cốc', 'Cuốn vở', 'Viên xúc xắc', 'Quả bóng'], 2, 'Xúc xắc 6 mặt bằng nhau.', [
      'Sai — cái cốc có dạng trụ tròn, không phải lập phương.',
      'Sai — cuốn vở dẹt, giống hình hộp chữ nhật hơn.',
      'Đúng — viên xúc xắc có 6 mặt vuông bằng nhau nên là hình lập phương.',
      'Sai — quả bóng tròn, không phải hình lập phương.',
    ]),
    Q('Vật nào có dạng hình hộp chữ nhật?', ['Quả bóng tròn', 'Cái bánh chưng', 'Quả cam', 'Hộp giày'], 3, 'Hộp giày là hộp chữ nhật.', [
      'Sai — quả bóng tròn là hình cầu, không phải hộp chữ nhật.',
      'Sai — bánh chưng vuông gần với lập phương hơn.',
      'Sai — quả cam tròn, không phải hộp chữ nhật.',
      'Đúng — hộp giày có 6 mặt chữ nhật nên là hình hộp chữ nhật.',
    ]),
    Q('Biểu đồ tranh dùng hình vẽ để?', ['Đo độ dài', 'Biểu thị số lượng', 'Vẽ tam giác', 'Tính chu vi'], 1, 'Mỗi hình tượng trưng cho một số lượng.', [
      'Sai — biểu đồ tranh không dùng để đo độ dài.',
      'Đúng — biểu đồ tranh dùng hình vẽ để biểu thị số lượng.',
      'Sai — biểu đồ tranh không phải để vẽ tam giác.',
      'Sai — biểu đồ tranh không dùng để tính chu vi.',
    ]),
    Q('Trong biểu đồ, mỗi hình quả táo = 5 quả. Có 4 hình → tổng?', ['40', '45', '20', '9'], 2, '5 × 4 = 20 quả.', [
      'Sai — 40 là 5 × 8, nhiều hơn 4 hình.',
      'Sai — 45 là 5 × 9, không đúng với 4 hình.',
      'Đúng — mỗi hình 5 quả, 4 hình là 5 × 4 = 20 quả.',
      'Sai — 9 là em cộng 5 + 4, nhưng đề cần phép nhân.',
    ]),
  ]),

  M(35, 'Ôn tập cuối năm', [
    Q('5 248 + 3 752 = ?', ['9 100', '8 990', '8 900', '9 000'], 3, '5248 + 3752 = 9000.', [
      'Sai — 9 100 là cộng dư, kiểm tra lại số nhớ.',
      'Sai — 8 990 là cộng thiếu, hãy cộng lại từng hàng.',
      'Sai — 8 900 là quên nhớ ở hàng trăm.',
      'Đúng — 248 + 752 = 1000 nhớ 1; 5 + 3 + 1 = 9 → 9000.',
    ]),
    Q('Tìm x: x × 8 = 64', ['x = 9', 'x = 7', 'x = 8', 'x = 56'], 2, '64 : 8 = 8.', [
      'Sai — 9 không đúng vì 9 × 8 = 72 chứ không phải 64.',
      'Sai — 7 không đúng vì 7 × 8 = 56 chứ không phải 64.',
      'Đúng — thừa số chưa biết = tích : thừa số kia: 64 : 8 = 8.',
      'Sai — 56 là em lấy 64 − 8, nhưng tìm thừa số phải chia.',
    ]),
    Q('Hình vuông cạnh 9 cm có chu vi?', ['81 cm', '27 cm', '18 cm', '36 cm'], 3, '9 × 4 = 36 cm.', [
      'Sai — 81 là 9 × 9, đó là diện tích chứ không phải chu vi.',
      'Sai — 27 là 9 × 3, mới có 3 cạnh.',
      'Sai — 18 là 9 × 2, mới có 2 cạnh.',
      'Đúng — hình vuông có 4 cạnh: 9 × 4 = 36 cm.',
    ]),
    Q('1 km + 200 m = ? m', ['1 200 m', '12 000 m', '200 m', '1 000 m'], 0, '1000 + 200 = 1200 m.', [
      'Đúng — đổi 1 km = 1000 m rồi cộng: 1000 + 200 = 1200 m.',
      'Sai — 12 000 m là đổi sai, 1 km chỉ bằng 1000 m.',
      'Sai — 200 m mới là phần thêm, còn quên 1 km = 1000 m.',
      'Sai — 1 000 m mới là 1 km, còn quên cộng thêm 200 m.',
    ]),
    Q('Mẹ có 50 000đ, mua 3 ki-lô-gam gạo giá 15 000đ/kg. Còn?', ['35 000đ', '15 000đ', '5 000đ', '45 000đ'], 2, '15 000 × 3 = 45 000; 50 000 − 45 000 = 5 000đ.', [
      'Sai — 35 000đ là chỉ trừ tiền 1 kg gạo, phải tính 3 kg.',
      'Sai — 15 000đ là giá 1 kg gạo, không phải tiền còn lại.',
      'Đúng — tiền gạo 15 000 × 3 = 45 000; còn 50 000 − 45 000 = 5 000đ.',
      'Sai — 45 000đ là tiền mua gạo, chưa trừ khỏi số tiền mẹ có.',
    ]),
    Q('Một năm có 4 mùa. Mỗi mùa khoảng?', ['3 tháng', '4 tháng', '2 tháng', '1 tháng'], 0, '12 : 4 = 3 tháng/mùa.', [
      'Đúng — 12 tháng chia đều 4 mùa: 12 : 4 = 3 tháng mỗi mùa.',
      'Sai — 4 tháng × 4 mùa = 16 tháng, quá nhiều.',
      'Sai — 2 tháng × 4 mùa = 8 tháng, chưa đủ một năm.',
      'Sai — 1 tháng × 4 mùa = 4 tháng, chưa đủ một năm.',
    ]),
  ]),

  M(36, 'Kết thúc Lớp 3 — Hành trang vào Lớp 4', [
    Q('Tính: 3456 + 2789 = ?', ['6145', '6245', '6235', '5245'], 1, 'Cộng từ phải sang trái có nhớ: 3456 + 2789 = 6245.', ['Sai — cộng hàng trăm thiếu 1 (quên nhớ).', 'Đúng — 3456 + 2789 = 6245.', 'Sai — cộng hàng chục thiếu 1.', 'Sai — cộng hàng nghìn thiếu 1.']),
    Q('Tìm x biết: x × 6 = 54', ['x = 8', 'x = 48', 'x = 9', 'x = 60'], 2, 'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số kia: x = 54 : 6 = 9.', ['Sai — 8 × 6 = 48, chưa đủ 54.', 'Sai — 48 là kết quả của 8 × 6, không phải giá trị của x.', 'Đúng — x = 54 : 6 = 9.', 'Sai — 60 là kết quả của 10 × 6, lớn hơn 54.']),
    Q('Số lớn nhất có BỐN chữ số là số nào?', ['10 000', '9999', '9000', '999'], 1, '9999 là số lớn nhất có 4 chữ số; thêm 1 thành 10 000 (5 chữ số).', ['Sai — 10 000 có tới 5 chữ số.', 'Đúng — 9999 là số lớn nhất có 4 chữ số.', 'Sai — 9000 nhỏ hơn 9999.', 'Sai — 999 chỉ có 3 chữ số.']),
    Q('Hình chữ nhật dài 8cm, rộng 5cm. Chu vi bằng bao nhiêu?', ['40 cm', '13 cm', '26 cm', '18 cm'], 2, 'Chu vi = (dài + rộng) × 2 = (8 + 5) × 2 = 26 cm.', ['Sai — 8 × 5 = 40 là cách tính diện tích, em sẽ học ở Lớp 4.', 'Sai — 13 mới là (dài + rộng), còn thiếu bước nhân 2.', 'Đúng — (8 + 5) × 2 = 26 cm.', 'Sai — 18 không khớp với công thức chu vi.']),
    Q('1 lít bằng bao nhiêu mililít?', ['10 ml', '100 ml', '10 000 ml', '1000 ml'], 3, '1 l = 1000 ml.', ['Sai — nhỏ hơn rất nhiều so với 1 lít.', 'Sai — 100 ml mới bằng một phần mười lít.', 'Sai — 10 000 ml là 10 lít.', 'Đúng — 1 lít = 1000 mililít.']),
    Q('Lên Lớp 4 em sẽ bắt đầu học loại số mới nào?', ['Phân số', 'Số La Mã', 'Số âm', 'Số thập phân'], 0, 'Lớp 4 học phân số; số thập phân để dành cho Lớp 5.', ['Đúng — Lớp 4 em sẽ được học phân số.', 'Sai — số La Mã chỉ là cách viết số, không phải loại số mới ở Lớp 4.', 'Sai — số âm học ở cấp lớn hơn nhiều.', 'Sai — số thập phân là nội dung của Lớp 5.']),
  ]),
];

export const P3_TOAN_SCENARIOS = indexBy(P3_TOAN_WEEKS);
