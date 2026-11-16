// GPP 2D — sinh các bước tương tác cho từng cấp. Mỗi bước tương ứng 1 tiêu chí
// bảng kiểm (Phụ lục 2) → chọn đúng = tiêu chí Đạt. Chấm khách quan, tất định.
import { DRUGS, NHOM_DUOC_LY, KE_DON, MUC_QUAN_LY, NGANH_HANG, CHECKLISTS } from './data.js?v=gpp0906a';

// Trộn mảng (không dùng Math.random cố định — chỉ để đa dạng lượt chơi).
function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
// Tạo 4 phương án gồm đáp án đúng + 3 nhiễu từ danh sách.
function mcq(correct, pool) {
  const distract = shuffle(pool.filter(x => x !== correct)).slice(0, 3);
  const opts = shuffle([correct, ...distract]);
  return { options: opts, answer: opts.indexOf(correct) };
}

// ---- Cấp 1: chọn 1 thuốc ngẫu nhiên, đi 6 bước theo bảng kiểm ----
function level1(drug) {
  // Chỉ chọn thuốc có nhóm tác dụng dược lý rõ ràng (loại TPBVSK…) làm đối tượng chấm.
  const pool = DRUGS.filter(x => x.subject !== false && x.nhom);
  const d = drug || pool[Math.floor(Math.random() * pool.length)];
  const cl = CHECKLISTS[1];
  const sdkMcq = mcq(d.sdk, DRUGS.map(x => x.sdk));
  const nhomMcq = mcq(d.nhom, NHOM_DUOC_LY);
  const keMcq = mcq(d.keDon, KE_DON);
  const qlMcq = mcq(d.quanLy, MUC_QUAN_LY);
  const nganhMcq = mcq(d.nganh, NGANH_HANG);
  return {
    drug: d,
    steps: [
      { key: 'l1s1', crit: cl[0], prompt: `Đọc nhãn — Số đăng ký (SĐK) của "${d.ten}" là:`, ...sdkMcq, fb: 'SĐK cho biết thuốc được cấp phép lưu hành hợp pháp.' },
      { key: 'l1s2', crit: cl[1], prompt: `"${d.ten}" (${d.hoatChat}) thuộc nhóm tác dụng dược lý nào?`, ...nhomMcq },
      { key: 'l1s3', crit: cl[2], prompt: `"${d.ten}" là thuốc kê đơn hay không kê đơn?`, ...keMcq, fb: 'ETC bắt buộc có đơn hợp lệ khi bán.' },
      { key: 'l1s4', crit: cl[3], prompt: `"${d.ten}" thuộc mức độ quản lý nào?`, ...qlMcq, fb: 'Thuốc kiểm soát đặc biệt (gây nghiện/hướng thần/tiền chất) để tủ riêng, có sổ theo dõi.' },
      { key: 'l1s5', crit: cl[4], prompt: `"${d.ten}" thuộc ngành hàng nào?`, ...nganhMcq },
      { key: 'l1s6', crit: cl[5], prompt: `Trên kệ, xếp "${d.ten}" vào nhóm nào?`, ...nhomMcq, fb: 'Sắp theo nhóm tác dụng dược lý giúp tra cứu, tư vấn đúng và hạn chế nhầm.' },
    ],
  };
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---- Cấp 2: tình huống kiểm nhập 1 lô hàng có lỗi (4 biến thể) ----
function level2() { return pick([level2a, level2b, level2c, level2d])(); }
function level2a() {
  const cl = CHECKLISTS[2];
  return {
    context: {
      title: 'Lô hàng nhập: Amoxicilin 500mg × 50 hộp',
      lines: ['Hoá đơn ghi: 50 hộp — số lô L2401 — HD 12/2026', 'Thực nhận: đếm được 48 hộp; 1 hộp bị móp bẹp góc', 'Nhãn hộp: tên & hàm lượng khớp; số lô L2401; HD 12/2026'],
    },
    steps: [
      { key: 'l2s1', crit: cl[0], prompt: 'Việc cần làm khi tiếp nhận lô hàng?', options: ['Xếp thẳng lên kệ cho nhanh', 'Kiểm tra nguồn gốc xuất xứ & hoá đơn hợp lệ trước', 'Niêm yết giá ngay', 'Bán thử vài hộp'], answer: 1 },
      { key: 'l2s2', crit: cl[1], prompt: 'Đối chiếu số lượng thực tế với hoá đơn, phát hiện:', options: ['Khớp 50 hộp', 'Thực nhận 48 hộp — thiếu 2 so với hoá đơn', 'Thừa 2 hộp', 'Không cần đếm'], answer: 1, fb: 'Ghi nhận chênh lệch số lượng để phản hồi nhà cung ứng.' },
      { key: 'l2s3', crit: cl[2], prompt: 'Kiểm cảm quan bao bì cho thấy:', options: ['Tất cả nguyên vẹn', 'Có 1 hộp móp bẹp góc — nghi ảnh hưởng chất lượng', 'Bao bì không cần kiểm', 'Chỉ cần kiểm hạn dùng'], answer: 1 },
      { key: 'l2s4', crit: cl[3], prompt: 'Đối chiếu thông tin bao bì với hoá đơn (tên, hàm lượng, số lô, HD):', options: ['Số lô trên hộp khác hoá đơn', 'Khớp: L2401, HD 12/2026', 'Thiếu hạn dùng', 'Sai tên thuốc'], answer: 1 },
      { key: 'l2s5', crit: cl[4], prompt: 'Kiểm chất lượng cảm quan sản phẩm, nguyên tắc đúng là:', options: ['Bỏ qua nếu còn hạn', 'Quan sát viên/màu/mùi; loại sản phẩm bất thường', 'Nếm thử thuốc', 'Chỉ tin hoá đơn'], answer: 1 },
      { key: 'l2s6', crit: cl[5], prompt: 'Xử lý hộp móp/thiếu số lượng:', options: ['Vẫn nhập kho, bán kèm khuyến mãi', 'Nhập kho chờ gần hạn mới bán', 'Tách riêng, không nhập bán; trả/đổi nhà cung ứng theo quy định', 'Hạ giá bán ngay'], answer: 2, fb: 'Hàng không đạt không được đưa vào khu bán.' },
      { key: 'l2s7', crit: cl[6], prompt: 'Với số hộp đạt yêu cầu, bước tiếp theo:', options: ['Bán không cần giá', 'Niêm yết giá theo quy định', 'Cất kho không niêm yết', 'Đợi kiểm kê'], answer: 1 },
      { key: 'l2s8', crit: cl[7], prompt: 'Hoàn tất kiểm nhập bằng việc:', options: ['Ghi chép vào sổ sách/phần mềm bán hàng', 'Không cần ghi', 'Chỉ nhớ trong đầu', 'Báo miệng cho chủ'], answer: 0 },
    ],
  };
}

function level2b() {
  const cl = CHECKLISTS[2];
  return {
    context: {
      title: 'Lô hàng nhập: Cefuroxim 500mg × 30 hộp',
      lines: ['Hoá đơn ghi: 30 hộp — số lô C2405 — HD 03/2026', 'Thực nhận: đủ 30 hộp; 2 hộp bong tróc nhãn phụ', 'Nhãn hộp: 1 hộp in số lô C2404 (khác hoá đơn)'],
    },
    steps: [
      { key: 'l2bs1', crit: cl[0], prompt: 'Việc cần làm khi tiếp nhận lô hàng?', options: ['Niêm yết giá ngay', 'Kiểm tra nguồn gốc xuất xứ & hoá đơn hợp lệ trước', 'Xếp thẳng lên kệ', 'Bán thử vài hộp'], answer: 1 },
      { key: 'l2bs2', crit: cl[1], prompt: 'Đối chiếu số lượng thực tế với hoá đơn:', options: ['Thiếu 5 hộp', 'Đủ 30 hộp — khớp hoá đơn', 'Thừa 3 hộp', 'Không cần đếm'], answer: 1 },
      { key: 'l2bs3', crit: cl[2], prompt: 'Kiểm cảm quan bao bì cho thấy:', options: ['Tất cả nguyên vẹn', 'Có 2 hộp bong tróc nhãn phụ — cần xem xét', 'Không cần kiểm bao bì', 'Chỉ kiểm giá'], answer: 1 },
      { key: 'l2bs4', crit: cl[3], prompt: 'Đối chiếu thông tin bao bì với hoá đơn (số lô, HD):', options: ['Khớp hoàn toàn', '1 hộp in số lô C2404 khác hoá đơn (C2405)', 'Sai tên thuốc', 'Thiếu hàm lượng'], answer: 1, fb: 'Số lô không khớp phải làm rõ với nhà cung ứng trước khi nhập.' },
      { key: 'l2bs5', crit: cl[4], prompt: 'Kiểm chất lượng cảm quan sản phẩm:', options: ['Bỏ qua nếu còn hạn', 'Quan sát viên/màu/mùi; loại sản phẩm bất thường', 'Nếm thử', 'Chỉ tin hoá đơn'], answer: 1 },
      { key: 'l2bs6', crit: cl[5], prompt: 'Xử lý hộp sai số lô/bong nhãn:', options: ['Vẫn nhập bán bình thường', 'Tách riêng, không nhập bán; liên hệ trả/đổi nhà cung ứng', 'Dán nhãn mới rồi bán', 'Hạ giá bán'], answer: 1 },
      { key: 'l2bs7', crit: cl[6], prompt: 'Với số hộp đạt yêu cầu:', options: ['Bán không cần giá', 'Niêm yết giá theo quy định', 'Cất kho không niêm yết', 'Đợi kiểm kê'], answer: 1 },
      { key: 'l2bs8', crit: cl[7], prompt: 'Hoàn tất kiểm nhập bằng việc:', options: ['Ghi chép vào sổ sách/phần mềm bán hàng', 'Không cần ghi', 'Nhớ trong đầu', 'Báo miệng'], answer: 0 },
    ],
  };
}

// ---- Cấp 3: bảo quản & sắp xếp (4 biến thể) ----
function level3() { return pick([level3a, level3b, level3c, level3d])(); }
function level3a() {
  const cl = CHECKLISTS[3];
  return {
    context: {
      title: 'Lô hàng cần lên kệ',
      lines: ['Insulin (lọ tiêm) • Vitamin C sủi • Diazepam 5mg • Amoxicilin 500mg', 'Có 2 lô Paracetamol: lô A hạn 06/2026, lô B hạn 12/2026'],
    },
    steps: [
      { key: 'l3s1', crit: cl[0], prompt: 'Sản phẩm nào phải bảo quản lạnh 2–8°C (tủ lạnh)?', options: ['Amoxicilin', 'Insulin', 'Vitamin C sủi', 'Diazepam'], answer: 1, fb: 'Insulin và một số vaccin/sinh phẩm cần 2–8°C.' },
      { key: 'l3s2', crit: cl[1], prompt: 'Phân theo ngành hàng — Vitamin C sủi thuộc:', options: ['Thuốc', 'Thực phẩm bảo vệ sức khoẻ', 'Mỹ phẩm', 'Trang thiết bị y tế'], answer: 1 },
      { key: 'l3s3', crit: cl[2], prompt: 'Sản phẩm phải kiểm soát đặc biệt (để tủ riêng, có sổ) là:', options: ['Amoxicilin', 'Vitamin C sủi', 'Diazepam', 'Paracetamol'], answer: 2 },
      { key: 'l3s4', crit: cl[3], prompt: 'Amoxicilin xếp vào nhóm tác dụng dược lý nào?', options: ['Kháng sinh', 'Tim mạch', 'Tiêu hoá', 'Hô hấp'], answer: 0 },
      { key: 'l3s5', crit: cl[4], prompt: 'Cơ sở xác định vị trí sắp xếp trên giá:', options: ['Theo giá bán', 'Theo nhóm tác dụng dược lý và điều kiện bảo quản', 'Theo bảng chữ cái tên thương mại', 'Theo nhà cung ứng'], answer: 1 },
      { key: 'l3s6', crit: cl[5], prompt: 'Hai lô Paracetamol (A: HD 06/2026, B: HD 12/2026) — theo FEFO xuất lô nào trước?', options: ['Lô A (06/2026)', 'Lô B (12/2026)', 'Lô nào cũng được', 'Lô nhập sau'], answer: 0, fb: 'FEFO: hạn dùng gần xuất trước → giảm nguy cơ tồn hàng hết hạn.' },
      { key: 'l3s7', crit: cl[6], prompt: 'Nguyên tắc "3 dễ" khi xếp sản phẩm vào vị trí là:', options: ['Dễ mua, dễ bán, dễ đổi', 'Dễ thấy, dễ lấy, dễ kiểm tra', 'Dễ đếm, dễ ghi, dễ nhớ', 'Dễ vận chuyển, dễ đóng, dễ huỷ'], answer: 1 },
    ],
  };
}

// ---- Cấp 4: kiểm kê định kỳ + xử lý thu hồi (4 biến thể) ----
function level4() { return pick([level4a, level4b, level4c, level4d])(); }
function level4a() {
  const cl = CHECKLISTS[4];
  return {
    context: {
      title: 'Công văn thu hồi & kỳ kiểm kê',
      lines: ['Nhận công văn thu hồi: Cefuroxim 500mg — số lô C2312', 'Rà kho: cơ sở có nhập đúng lô C2312', 'Đến kỳ kiểm kê, kiểm soát chất lượng định kỳ'],
    },
    steps: [
      { key: 'l4s1', crit: cl[0], prompt: 'Việc lập sổ & báo cáo sau kiểm kê định kỳ nhằm:', options: ['Chỉ để đáp ứng thủ tục thuế', 'Theo dõi tồn kho, phát hiện thuốc cận/hết hạn', 'Đánh giá năng lực nhân viên', 'Xác định giá bán mới'], answer: 1 },
      { key: 'l4s2', crit: cl[1], prompt: 'Trước khi kiểm kê nên:', options: ['Đếm lộn xộn', 'Phân nhóm sản phẩm cần kiểm kê', 'Bỏ qua thuốc kiểm soát đặc biệt', 'Chỉ kiểm hàng bán chạy'], answer: 1 },
      { key: 'l4s3', crit: cl[2], prompt: 'Với công văn thu hồi lô C2312, việc đầu tiên:', options: ['Bỏ qua vì ít hàng', 'Đối chiếu số lô kho với công văn xem có nhập lô C2312 không', 'Bán nhanh trước khi thu hồi', 'Chờ kỳ kiểm kê sau'], answer: 1 },
      { key: 'l4s4', crit: cl[3], prompt: 'Xác định có lô C2312 — xử lý ngay:', options: ['Giảm giá bán nhanh', 'Ngừng bán, tách riêng, chuyển khu chờ xử lý', 'Tiếp tục bán cho khách quen', 'Trộn với lô đạt chuẩn'], answer: 1, fb: 'Cách ly ngay hàng thu hồi, không để lẫn hàng đang bán.' },
      { key: 'l4s5', crit: cl[4], prompt: 'Ghi nhận hành chính đúng quy định:', options: ['Không cần ghi', 'Ghi sổ theo dõi thuốc đình chỉ lưu hành', 'Chỉ báo miệng', 'Xoá dữ liệu lô đó'], answer: 1 },
      { key: 'l4s6', crit: cl[5], prompt: 'Hoàn tất xử lý thu hồi bằng cách:', options: ['Tự tiêu huỷ tại quầy không lập biên bản', 'Liên hệ công ty/nhà cung ứng để trả lại hàng', 'Giữ lại dùng dần', 'Bán rẻ cho cơ sở khác'], answer: 1 },
    ],
  };
}
function level4b() {
  const cl = CHECKLISTS[4];
  return {
    context: {
      title: 'Thu hồi Paracetamol & kiểm kê quý',
      lines: ['Công văn thu hồi: Paracetamol 500mg — số lô P2308 (vi phạm chất lượng)', 'Rà kho: cơ sở KHÔNG nhập lô P2308 (chỉ có lô P2401)', 'Đồng thời tới kỳ kiểm kê định kỳ hàng quý'],
    },
    steps: [
      { key: 'l4bs1', crit: cl[0], prompt: 'Mục đích lập sổ kiểm kê & kiểm soát chất lượng định kỳ:', options: ['Đối phó thanh tra', 'Theo dõi tồn kho, phát hiện thuốc cận/hết hạn, kém chất lượng', 'Tính thưởng nhân viên', 'Định giá lại toàn bộ'], answer: 1 },
      { key: 'l4bs2', crit: cl[1], prompt: 'Chuẩn bị kiểm kê, nên:', options: ['Đếm ngẫu nhiên', 'Phân nhóm sản phẩm cần kiểm kê rồi kiểm lần lượt', 'Chỉ kiểm hàng đắt tiền', 'Bỏ qua hàng cận hạn'], answer: 1 },
      { key: 'l4bs3', crit: cl[2], prompt: 'Đối chiếu công văn thu hồi lô P2308 với kho:', options: ['Cơ sở có nhập P2308', 'Cơ sở KHÔNG nhập P2308 (chỉ có P2401) — ghi nhận, không phải thu hồi', 'Không cần đối chiếu', 'Thu hồi luôn cả P2401'], answer: 1, fb: 'Chỉ xử lý đúng số lô bị thu hồi; lô khác vẫn lưu hành bình thường.' },
      { key: 'l4bs4', crit: cl[3], prompt: 'Vì không có lô bị thu hồi, với lô P2401 đang bán cần:', options: ['Ngừng bán toàn bộ Paracetamol', 'Tiếp tục bán bình thường, lưu công văn để theo dõi', 'Tiêu huỷ hết', 'Trả lại nhà cung ứng'], answer: 1 },
      { key: 'l4bs5', crit: cl[4], prompt: 'Ghi nhận hành chính với công văn thu hồi:', options: ['Bỏ công văn đi', 'Lưu/ghi sổ theo dõi công văn thuốc đình chỉ lưu hành', 'Chỉ đọc rồi bỏ qua', 'Dán lên tường'], answer: 1 },
      { key: 'l4bs6', crit: cl[5], prompt: 'Trong kiểm kê phát hiện vài hộp cận hạn — xử trí:', options: ['Vẫn để bán đến khi hết hạn', 'Tách khu cận hạn, ưu tiên xuất trước (FEFO), báo cáo; hết hạn thì loại & xử lý đúng quy định', 'Bán tháo giá rẻ cho ai cũng được', 'Giấu đi'], answer: 1 },
    ],
  };
}

// ===== Biến thể bổ sung Cấp 2 =====
function level2c() {
  const cl = CHECKLISTS[2];
  return {
    context: {
      title: 'Lô hàng nhập: Insulin (lọ tiêm) × 10 lọ — hàng lạnh',
      lines: ['Hoá đơn ghi: 10 lọ — số lô I2403 — HD 08/2026', 'Thùng bảo quản lạnh: gel đá đã tan, nhiệt độ trong thùng ~18°C (không đạt 2–8°C)', '3 lọ dung dịch vẩn đục bất thường'],
    },
    steps: [
      { key: 'l2cs1', crit: cl[0], prompt: 'Việc cần làm khi tiếp nhận lô hàng lạnh?', options: ['Cho ngay vào tủ lạnh rồi bán', 'Kiểm nguồn gốc, hoá đơn hợp lệ & điều kiện vận chuyển lạnh', 'Niêm yết giá ngay', 'Xếp lên kệ thường'], answer: 1 },
      { key: 'l2cs2', crit: cl[1], prompt: 'Đối chiếu số lượng thực tế với hoá đơn:', options: ['Thiếu 2 lọ', 'Đủ 10 lọ — khớp hoá đơn', 'Thừa 1 lọ', 'Không cần đếm'], answer: 1 },
      { key: 'l2cs3', crit: cl[2], prompt: 'Kiểm điều kiện bảo quản/bao bì khi nhận:', options: ['Chuỗi lạnh đạt', 'Gel đá đã tan, nhiệt ~18°C — chuỗi lạnh KHÔNG đạt', 'Không cần quan tâm nhiệt độ', 'Chỉ cần còn hạn'], answer: 1, fb: 'Insulin phải giữ 2–8°C suốt vận chuyển; đứt chuỗi lạnh nghi hỏng.' },
      { key: 'l2cs4', crit: cl[3], prompt: 'Đối chiếu thông tin bao bì với hoá đơn:', options: ['Sai tên thuốc', 'Khớp: số lô I2403, HD 08/2026', 'Thiếu hạn dùng', 'Sai hàm lượng'], answer: 1 },
      { key: 'l2cs5', crit: cl[4], prompt: 'Kiểm chất lượng cảm quan các lọ:', options: ['Bỏ qua vì còn hạn', '3 lọ dung dịch vẩn đục/bất thường — loại ra', 'Lắc mạnh cho tan rồi bán', 'Chỉ tin hoá đơn'], answer: 1 },
      { key: 'l2cs6', crit: cl[5], prompt: 'Xử lý số lọ nghi hỏng do đứt chuỗi lạnh:', options: ['Vẫn nhập bán, dặn khách dùng nhanh', 'Tách riêng, không nhập bán; lập biên bản, trả/đổi nhà cung ứng', 'Hạ giá bán', 'Để tủ lạnh vài ngày rồi bán'], answer: 1 },
      { key: 'l2cs7', crit: cl[6], prompt: 'Với các lọ đạt yêu cầu, bước tiếp theo:', options: ['Bán không cần giá', 'Bảo quản 2–8°C và niêm yết giá theo quy định', 'Để ngoài quầy', 'Đợi kiểm kê'], answer: 1 },
      { key: 'l2cs8', crit: cl[7], prompt: 'Hoàn tất kiểm nhập bằng việc:', options: ['Ghi chép vào sổ sách/phần mềm bán hàng', 'Không cần ghi', 'Nhớ trong đầu', 'Báo miệng'], answer: 0 },
    ],
  };
}
function level2d() {
  const cl = CHECKLISTS[2];
  return {
    context: {
      title: 'Lô hàng nhập: Amoxicilin bột pha hỗn dịch × 40 lọ',
      lines: ['Hoá đơn ghi: 40 lọ — số lô A2312 — HD 02/2026 (còn ~2 tháng)', 'Thực nhận: đủ 40 lọ, bao bì nguyên vẹn', 'Hạn dùng cận ngày so với tốc độ bán của cơ sở'],
    },
    steps: [
      { key: 'l2ds1', crit: cl[0], prompt: 'Việc cần làm khi tiếp nhận lô hàng?', options: ['Xếp lên kệ ngay', 'Kiểm nguồn gốc xuất xứ & hoá đơn hợp lệ trước', 'Niêm yết giá ngay', 'Bán thử'], answer: 1 },
      { key: 'l2ds2', crit: cl[1], prompt: 'Đối chiếu số lượng thực tế với hoá đơn:', options: ['Thiếu 5 lọ', 'Đủ 40 lọ — khớp', 'Thừa 2 lọ', 'Không cần đếm'], answer: 1 },
      { key: 'l2ds3', crit: cl[2], prompt: 'Kiểm cảm quan bao bì:', options: ['Nhiều lọ nứt vỡ', 'Bao bì nguyên vẹn, đạt', 'Không cần kiểm', 'Chỉ kiểm giá'], answer: 1 },
      { key: 'l2ds4', crit: cl[3], prompt: 'Đối chiếu thông tin bao bì với hoá đơn — điểm cần lưu ý:', options: ['Sai tên thuốc', 'Khớp, nhưng HD 02/2026 khá cận ngày', 'Thiếu số lô', 'Sai hàm lượng'], answer: 1, fb: 'Hàng cận hạn vẫn nhập được nhưng phải cân nhắc tốc độ bán để tránh tồn hết hạn.' },
      { key: 'l2ds5', crit: cl[4], prompt: 'Kiểm chất lượng cảm quan sản phẩm:', options: ['Bỏ qua', 'Quan sát bột/màu; loại lọ bất thường', 'Nếm thử', 'Chỉ tin hoá đơn'], answer: 1 },
      { key: 'l2ds6', crit: cl[5], prompt: 'Vì hàng cận hạn, cách xử lý hợp lý:', options: ['Từ chối nhập toàn bộ dù chưa trao đổi', 'Cân nhắc số lượng nhập vừa đủ bán trước hạn, hoặc thoả thuận đổi lô dài hạn với NCC', 'Nhập hết rồi để đó', 'Bán vượt liều cho nhanh hết'], answer: 1 },
      { key: 'l2ds7', crit: cl[6], prompt: 'Với số lọ nhận bán, bước tiếp theo:', options: ['Bán không cần giá', 'Niêm yết giá; đánh dấu ưu tiên xuất trước (FEFO)', 'Cất kho không niêm yết', 'Đợi kiểm kê'], answer: 1 },
      { key: 'l2ds8', crit: cl[7], prompt: 'Hoàn tất kiểm nhập bằng việc:', options: ['Ghi chép vào sổ sách/phần mềm bán hàng', 'Không cần ghi', 'Nhớ trong đầu', 'Báo miệng'], answer: 0 },
    ],
  };
}

// ===== Biến thể bổ sung Cấp 3 =====
function level3b() {
  const cl = CHECKLISTS[3];
  return {
    context: {
      title: 'Lô hàng cần lên kệ',
      lines: ['Insulin (lọ tiêm) • Phenobarbital 100mg • Cefuroxim 500mg • Viên sủi Vitamin C', 'Có 2 lô Amoxicilin: lô A hạn 09/2026, lô B hạn 03/2027'],
    },
    steps: [
      { key: 'l3bs1', crit: cl[0], prompt: 'Sản phẩm nào phải bảo quản lạnh 2–8°C?', options: ['Cefuroxim', 'Insulin', 'Vitamin C sủi', 'Phenobarbital'], answer: 1 },
      { key: 'l3bs2', crit: cl[1], prompt: 'Phân theo ngành hàng — Viên sủi Vitamin C thuộc:', options: ['Thuốc', 'Thực phẩm bảo vệ sức khoẻ', 'Mỹ phẩm', 'Trang thiết bị y tế'], answer: 1 },
      { key: 'l3bs3', crit: cl[2], prompt: 'Sản phẩm phải kiểm soát đặc biệt (tủ riêng, có sổ) là:', options: ['Cefuroxim', 'Vitamin C sủi', 'Phenobarbital', 'Insulin'], answer: 2, fb: 'Phenobarbital là thuốc hướng thần → kiểm soát đặc biệt.' },
      { key: 'l3bs4', crit: cl[3], prompt: 'Cefuroxim xếp vào nhóm tác dụng dược lý nào?', options: ['Kháng sinh', 'Tim mạch', 'Hô hấp', 'Tiêu hoá'], answer: 0 },
      { key: 'l3bs5', crit: cl[4], prompt: 'Cơ sở xác định vị trí sắp xếp trên giá:', options: ['Theo giá bán', 'Theo nhóm tác dụng dược lý và điều kiện bảo quản', 'Theo bảng chữ cái', 'Theo nhà cung ứng'], answer: 1 },
      { key: 'l3bs6', crit: cl[5], prompt: 'Hai lô Amoxicilin (A: HD 09/2026, B: HD 03/2027) — theo FEFO xuất lô nào trước?', options: ['Lô A (09/2026)', 'Lô B (03/2027)', 'Lô nào cũng được', 'Lô nhập sau'], answer: 0 },
      { key: 'l3bs7', crit: cl[6], prompt: 'Nguyên tắc "3 dễ" khi xếp sản phẩm là:', options: ['Dễ mua, dễ bán, dễ đổi', 'Dễ thấy, dễ lấy, dễ kiểm tra', 'Dễ đếm, dễ ghi, dễ nhớ', 'Dễ vận chuyển, dễ đóng, dễ huỷ'], answer: 1 },
    ],
  };
}
function level3c() {
  const cl = CHECKLISTS[3];
  return {
    context: {
      title: 'Lô hàng cần lên kệ',
      lines: ['Salbutamol 2mg (viên) • Atorvastatin 10mg • Oresol • Insulin (lọ tiêm)', 'Có 2 lô Cefuroxim: lô A hạn 05/2026, lô B hạn 11/2026'],
    },
    steps: [
      { key: 'l3cs1', crit: cl[0], prompt: 'Sản phẩm nào phải bảo quản lạnh 2–8°C?', options: ['Atorvastatin', 'Oresol', 'Insulin', 'Salbutamol'], answer: 2 },
      { key: 'l3cs2', crit: cl[1], prompt: 'Phân theo ngành hàng — Oresol thuộc:', options: ['Thuốc', 'Thực phẩm bảo vệ sức khoẻ', 'Mỹ phẩm', 'Trang thiết bị y tế'], answer: 0 },
      { key: 'l3cs3', crit: cl[2], prompt: 'Sản phẩm phải kiểm soát đặc biệt là:', options: ['Atorvastatin', 'Salbutamol', 'Oresol', 'Insulin'], answer: 1, fb: 'Salbutamol thuộc danh mục phải kiểm soát đặc biệt (NĐ 54/2017).' },
      { key: 'l3cs4', crit: cl[3], prompt: 'Atorvastatin xếp vào nhóm tác dụng dược lý nào?', options: ['Rối loạn lipid máu', 'Kháng sinh', 'Tiêu hoá', 'Hô hấp'], answer: 0 },
      { key: 'l3cs5', crit: cl[4], prompt: 'Cơ sở xác định vị trí sắp xếp:', options: ['Theo giá bán', 'Theo nhóm tác dụng dược lý và điều kiện bảo quản', 'Theo bảng chữ cái', 'Theo nhà cung ứng'], answer: 1 },
      { key: 'l3cs6', crit: cl[5], prompt: 'Hai lô Cefuroxim (A: HD 05/2026, B: HD 11/2026) — theo FEFO xuất lô nào trước?', options: ['Lô A (05/2026)', 'Lô B (11/2026)', 'Lô nào cũng được', 'Lô nhập sau'], answer: 0 },
      { key: 'l3cs7', crit: cl[6], prompt: 'Nguyên tắc "3 dễ" khi xếp sản phẩm là:', options: ['Dễ mua, dễ bán, dễ đổi', 'Dễ thấy, dễ lấy, dễ kiểm tra', 'Dễ đếm, dễ ghi, dễ nhớ', 'Dễ vận chuyển, dễ đóng, dễ huỷ'], answer: 1 },
    ],
  };
}
function level3d() {
  const cl = CHECKLISTS[3];
  return {
    context: {
      title: 'Lô hàng cần lên kệ',
      lines: ['Adrenalin ống tiêm • Diazepam 5mg • Metformin 500mg • Loratadin 10mg', 'Có 2 lô Paracetamol: lô A hạn 07/2026, lô B hạn 01/2027'],
    },
    steps: [
      { key: 'l3ds1', crit: cl[0], prompt: 'Sản phẩm nào cần bảo quản TRÁNH ÁNH SÁNG?', options: ['Metformin', 'Adrenalin (ống tiêm)', 'Loratadin', 'Paracetamol'], answer: 1, fb: 'Adrenalin nhạy sáng — để tránh ánh sáng, không phơi sáng.' },
      { key: 'l3ds2', crit: cl[1], prompt: 'Phân theo ngành hàng — Metformin thuộc:', options: ['Thuốc', 'Thực phẩm bảo vệ sức khoẻ', 'Mỹ phẩm', 'Trang thiết bị y tế'], answer: 0 },
      { key: 'l3ds3', crit: cl[2], prompt: 'Sản phẩm phải kiểm soát đặc biệt là:', options: ['Metformin', 'Loratadin', 'Diazepam', 'Paracetamol'], answer: 2 },
      { key: 'l3ds4', crit: cl[3], prompt: 'Loratadin xếp vào nhóm tác dụng dược lý nào?', options: ['Kháng histamin H1', 'Kháng sinh', 'Tim mạch', 'Tiêu hoá'], answer: 0 },
      { key: 'l3ds5', crit: cl[4], prompt: 'Cơ sở xác định vị trí sắp xếp:', options: ['Theo giá bán', 'Theo nhóm tác dụng dược lý và điều kiện bảo quản', 'Theo bảng chữ cái', 'Theo nhà cung ứng'], answer: 1 },
      { key: 'l3ds6', crit: cl[5], prompt: 'Hai lô Paracetamol (A: HD 07/2026, B: HD 01/2027) — theo FEFO xuất lô nào trước?', options: ['Lô A (07/2026)', 'Lô B (01/2027)', 'Lô nào cũng được', 'Lô nhập sau'], answer: 0 },
      { key: 'l3ds7', crit: cl[6], prompt: 'Nguyên tắc "3 dễ" khi xếp sản phẩm là:', options: ['Dễ mua, dễ bán, dễ đổi', 'Dễ thấy, dễ lấy, dễ kiểm tra', 'Dễ đếm, dễ ghi, dễ nhớ', 'Dễ vận chuyển, dễ đóng, dễ huỷ'], answer: 1 },
    ],
  };
}

// ===== Biến thể bổ sung Cấp 4 =====
function level4c() {
  const cl = CHECKLISTS[4];
  return {
    context: {
      title: 'Thu hồi Salbutamol & kiểm kê thuốc kiểm soát đặc biệt',
      lines: ['Công văn thu hồi: Salbutamol 2mg — số lô S2405', 'Rà kho: cơ sở có nhập lô S2405 (thuốc phải kiểm soát đặc biệt)', 'Kỳ kiểm kê tủ thuốc kiểm soát đặc biệt'],
    },
    steps: [
      { key: 'l4cs1', crit: cl[0], prompt: 'Sổ kiểm kê tủ thuốc kiểm soát đặc biệt cần:', options: ['Không bắt buộc', 'Lập riêng, ghi chi tiết nhập–xuất–tồn từng lần', 'Gộp chung sổ thường', 'Chỉ ghi khi thanh tra'], answer: 1, fb: 'Thuốc kiểm soát đặc biệt phải có sổ theo dõi riêng, đối chiếu thường xuyên.' },
      { key: 'l4cs2', crit: cl[1], prompt: 'Chuẩn bị kiểm kê, nên:', options: ['Đếm ngẫu nhiên', 'Phân nhóm; tách riêng nhóm kiểm soát đặc biệt để đối chiếu sổ', 'Bỏ qua tủ đặc biệt', 'Chỉ kiểm hàng bán chạy'], answer: 1 },
      { key: 'l4cs3', crit: cl[2], prompt: 'Với công văn thu hồi lô S2405, việc đầu tiên:', options: ['Bỏ qua', 'Đối chiếu số lô kho với công văn xem có nhập S2405 không', 'Bán nhanh trước thu hồi', 'Chờ kỳ sau'], answer: 1 },
      { key: 'l4cs4', crit: cl[3], prompt: 'Xác định có lô S2405 — xử lý ngay:', options: ['Giảm giá bán', 'Ngừng bán, tách riêng vào khu chờ xử lý (giữ trong tủ kiểm soát đặc biệt có khoá)', 'Bán cho khách quen', 'Trộn với lô đạt chuẩn'], answer: 1 },
      { key: 'l4cs5', crit: cl[4], prompt: 'Ghi nhận hành chính:', options: ['Không cần ghi', 'Ghi sổ theo dõi thuốc đình chỉ lưu hành và sổ thuốc kiểm soát đặc biệt', 'Chỉ báo miệng', 'Xoá dữ liệu lô'], answer: 1 },
      { key: 'l4cs6', crit: cl[5], prompt: 'Hoàn tất xử lý thu hồi:', options: ['Tự tiêu huỷ không biên bản', 'Liên hệ nhà cung ứng để trả lại theo quy định (có biên bản)', 'Giữ dùng dần', 'Bán rẻ cơ sở khác'], answer: 1 },
    ],
  };
}
function level4d() {
  const cl = CHECKLISTS[4];
  return {
    context: {
      title: 'Kiểm kê định kỳ phát hiện thuốc cận/hết hạn',
      lines: ['Kỳ kiểm kê định kỳ hàng quý', 'Phát hiện: 5 hộp Cefuroxim hết hạn 03/2026; 8 hộp Amoxicilin cận hạn (còn 1 tháng)', 'Chưa có công văn thu hồi nào trong kỳ'],
    },
    steps: [
      { key: 'l4ds1', crit: cl[0], prompt: 'Việc lập sổ & báo cáo sau kiểm kê định kỳ nhằm:', options: ['Đối phó thuế', 'Theo dõi tồn kho, phát hiện thuốc cận/hết hạn, kém chất lượng', 'Tính thưởng', 'Định giá lại'], answer: 1 },
      { key: 'l4ds2', crit: cl[1], prompt: 'Tiến hành kiểm kê nên:', options: ['Đếm ngẫu nhiên', 'Phân nhóm sản phẩm, kiểm lần lượt và đối chiếu hạn dùng', 'Chỉ kiểm hàng đắt', 'Bỏ qua hàng cận hạn'], answer: 1 },
      { key: 'l4ds3', crit: cl[2], prompt: 'Với 5 hộp Cefuroxim đã HẾT HẠN 03/2026:', options: ['Vẫn để bán', 'Tách khỏi khu bán ngay, dán nhãn "chờ xử lý/huỷ"', 'Hạ giá bán gấp', 'Trộn lô còn hạn'], answer: 1, fb: 'Thuốc hết hạn tuyệt đối không để trong khu bán.' },
      { key: 'l4ds4', crit: cl[3], prompt: 'Với 8 hộp Amoxicilin CẬN HẠN (còn 1 tháng):', options: ['Huỷ ngay', 'Đưa lên đầu kệ, ưu tiên xuất trước (FEFO), theo dõi sát', 'Giấu vào trong', 'Bán vượt liều'], answer: 1 },
      { key: 'l4ds5', crit: cl[4], prompt: 'Ghi nhận hành chính sau kiểm kê:', options: ['Không cần', 'Lập báo cáo kiểm kê, ghi sổ hàng hết hạn chờ xử lý', 'Chỉ nhớ', 'Báo miệng'], answer: 1 },
      { key: 'l4ds6', crit: cl[5], prompt: 'Xử trí cuối với hàng hết hạn:', options: ['Bán rẻ cho cơ sở khác', 'Huỷ theo quy định, có biên bản; không đưa lại lưu thông', 'Trả khách đã mua', 'Để dùng nội bộ'], answer: 1 },
    ],
  };
}

export function buildLevel(level) {
  if (level === 1) return level1();
  if (level === 2) return level2();
  if (level === 3) return level3();
  if (level === 4) return level4();
  return level1();
}
