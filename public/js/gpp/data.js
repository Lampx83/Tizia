// =====================================================================
// GPP 2D — Nội dung số hoá từ 2 học phần và phụ lục thuyết minh đề tài:
//   • Giáo trình Thực hành Dược lý (danh mục thuốc theo buổi, nhóm tác dụng)
//   • Giáo trình Thực hành Kỹ năng thực hành tại CSBL thuốc (quy trình + bảng kiểm)
// Toàn bộ câu hỏi/bảng kiểm/thang đo lấy nguyên theo Phụ lục 1–3 của thuyết minh.
// Đây là DỮ LIỆU TĨNH đi kèm module; AI chỉ dùng để sinh tình huống LUYỆN TẬP
// bổ sung (gắn cờ cần giảng viên duyệt), không thay các câu chuẩn dưới đây.
// =====================================================================

// ---- Vùng kệ / phân loại dùng chung ----
// Taxonomy nhóm bám 11 buổi giáo trình Thực hành Dược lý (buổi 2–12).
export const NHOM_DUOC_LY = [
  'Thần kinh thực vật',      // buổi 2
  'Thần kinh trung ương',    // buổi 3
  'Giảm đau – hạ sốt – NSAID', // buổi 4
  'Điều trị thiếu máu',      // buổi 4
  'Kháng histamin H1',       // buổi 5
  'Kháng virus',             // buổi 5
  'Tim mạch',                // buổi 6
  'Hormon và kháng hormon',  // buổi 7
  'Rối loạn lipid máu',      // buổi 8
  'Đái tháo đường',          // buổi 8
  'Kháng sinh',              // buổi 9
  'Tiêu hoá',                // buổi 10
  'Hô hấp',                  // buổi 11
  'Điều trị lao',            // buổi 11
  'Kháng nấm',               // buổi 12
  'Điều trị bệnh do động vật nguyên sinh', // buổi 12
  'Điều trị ung thư',        // buổi 12
];
export const MUC_QUAN_LY = ['Thuốc thường', 'Kiểm soát đặc biệt']; // gây nghiện/hướng thần/tiền chất
export const KE_DON = ['ETC (kê đơn)', 'OTC (không kê đơn)'];
export const NGANH_HANG = ['Thuốc', 'Thực phẩm bảo vệ sức khoẻ', 'Mỹ phẩm', 'Trang thiết bị y tế'];
export const BAO_QUAN = ['Thường (≤30°C)', 'Mát 2–8°C (tủ lạnh)', 'Tránh ánh sáng'];

// ---- Danh mục thuốc mẫu (bám 11 buổi Thực hành Dược lý) ----
// Mỗi thuốc đủ thông tin để luyện Cấp 1 (đọc nhãn + phân loại) và Cấp 3 (bảo quản).
// Trường buoi = số buổi trong giáo trình để truy vết. keDon/quanLy/baoQuan đã qua
// sub-agent dược kiểm ĐÚNG/SAI (TT07/2017 OTC; NĐ54/2017 kiểm soát đặc biệt).
export const DRUGS = [
  // Buổi 2 — Thần kinh thực vật
  { id: 'atropin', ten: 'Atropin sulfat 0,25mg', hoatChat: 'Atropin sulfat', hamLuong: '0,25 mg', dang: 'Dung dịch tiêm', sdk: 'VD-11002-17', nhom: 'Thần kinh thực vật', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Tránh ánh sáng', buoi: 2 },
  { id: 'adrenalin', ten: 'Adrenalin 1mg/1ml', hoatChat: 'Adrenalin (Epinephrin)', hamLuong: '1 mg/ml', dang: 'Dung dịch tiêm', sdk: 'VD-11540-16', nhom: 'Thần kinh thực vật', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Tránh ánh sáng', buoi: 2 },
  // Buổi 3 — Thần kinh trung ương
  { id: 'diazepam', ten: 'Diazepam 5mg', hoatChat: 'Diazepam', hamLuong: '5 mg', dang: 'Viên nén', sdk: 'QLĐB-0455-17', nhom: 'Thần kinh trung ương', keDon: 'ETC (kê đơn)', quanLy: 'Kiểm soát đặc biệt', nganh: 'Thuốc', baoQuan: 'Tránh ánh sáng', buoi: 3 },
  { id: 'phenobarbital', ten: 'Phenobarbital 100mg', hoatChat: 'Phenobarbital', hamLuong: '100 mg', dang: 'Viên nén', sdk: 'QLĐB-0231-18', nhom: 'Thần kinh trung ương', keDon: 'ETC (kê đơn)', quanLy: 'Kiểm soát đặc biệt', nganh: 'Thuốc', baoQuan: 'Tránh ánh sáng', buoi: 3 },
  // Buổi 4 — Giảm đau – hạ sốt – NSAID + thiếu máu
  { id: 'paracetamol', ten: 'Paracetamol 500mg', hoatChat: 'Paracetamol', hamLuong: '500 mg', dang: 'Viên nén', sdk: 'VD-10002-16', nhom: 'Giảm đau – hạ sốt – NSAID', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 4 },
  { id: 'ibuprofen', ten: 'Ibuprofen 400mg', hoatChat: 'Ibuprofen', hamLuong: '400 mg', dang: 'Viên nén bao phim', sdk: 'VD-14520-18', nhom: 'Giảm đau – hạ sốt – NSAID', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 4 },
  { id: 'aspirin', ten: 'Aspirin 500mg', hoatChat: 'Acid acetylsalicylic', hamLuong: '500 mg', dang: 'Viên nén', sdk: 'VD-10880-15', nhom: 'Giảm đau – hạ sốt – NSAID', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 4 },
  { id: 'diclofenac', ten: 'Diclofenac 50mg', hoatChat: 'Diclofenac natri', hamLuong: '50 mg', dang: 'Viên nén bao tan trong ruột', sdk: 'VD-19003-17', nhom: 'Giảm đau – hạ sốt – NSAID', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 4 },
  { id: 'sat-sulfat', ten: 'Sắt (II) sulfat 200mg', hoatChat: 'Sắt (II) sulfat + acid folic', hamLuong: '200 mg', dang: 'Viên nén bao phim', sdk: 'VD-20114-18', nhom: 'Điều trị thiếu máu', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 4 },
  // Buổi 5 — Kháng histamin H1 + kháng virus
  { id: 'loratadin', ten: 'Loratadin 10mg', hoatChat: 'Loratadin', hamLuong: '10 mg', dang: 'Viên nén', sdk: 'VD-30021-19', nhom: 'Kháng histamin H1', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 5 },
  { id: 'cetirizin', ten: 'Cetirizin 10mg', hoatChat: 'Cetirizin dihydroclorid', hamLuong: '10 mg', dang: 'Viên nén bao phim', sdk: 'VD-30890-19', nhom: 'Kháng histamin H1', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 5 },
  { id: 'clorpheniramin', ten: 'Clorpheniramin 4mg', hoatChat: 'Clorpheniramin maleat', hamLuong: '4 mg', dang: 'Viên nén', sdk: 'VD-08123-14', nhom: 'Kháng histamin H1', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 5 },
  { id: 'acyclovir', ten: 'Acyclovir 400mg', hoatChat: 'Acyclovir', hamLuong: '400 mg', dang: 'Viên nén', sdk: 'VD-25410-17', nhom: 'Kháng virus', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 5 },
  { id: 'oseltamivir', ten: 'Oseltamivir 75mg', hoatChat: 'Oseltamivir phosphat', hamLuong: '75 mg', dang: 'Viên nang', sdk: 'VD-26900-18', nhom: 'Kháng virus', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 5 },
  // Buổi 6 — Tim mạch
  { id: 'amlodipin', ten: 'Amlodipin 5mg', hoatChat: 'Amlodipin', hamLuong: '5 mg', dang: 'Viên nén', sdk: 'VD-33417-18', nhom: 'Tim mạch', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 6 },
  { id: 'enalapril', ten: 'Enalapril 5mg', hoatChat: 'Enalapril maleat', hamLuong: '5 mg', dang: 'Viên nén', sdk: 'VD-34120-18', nhom: 'Tim mạch', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 6 },
  { id: 'furosemid', ten: 'Furosemid 40mg', hoatChat: 'Furosemid', hamLuong: '40 mg', dang: 'Viên nén', sdk: 'VD-31900-18', nhom: 'Tim mạch', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 6 },
  { id: 'digoxin', ten: 'Digoxin 0,25mg', hoatChat: 'Digoxin', hamLuong: '0,25 mg', dang: 'Viên nén', sdk: 'VD-30099-17', nhom: 'Tim mạch', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 6 },
  // Buổi 7 — Hormon và kháng hormon
  { id: 'prednisolon', ten: 'Prednisolon 5mg', hoatChat: 'Prednisolon', hamLuong: '5 mg', dang: 'Viên nén', sdk: 'VD-18770-16', nhom: 'Hormon và kháng hormon', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 7 },
  { id: 'dexamethason', ten: 'Dexamethason 0,5mg', hoatChat: 'Dexamethason', hamLuong: '0,5 mg', dang: 'Viên nén', sdk: 'VD-18990-16', nhom: 'Hormon và kháng hormon', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 7 },
  { id: 'levothyroxin', ten: 'Levothyroxin 100mcg', hoatChat: 'Levothyroxin natri', hamLuong: '100 mcg', dang: 'Viên nén', sdk: 'VD-24510-18', nhom: 'Hormon và kháng hormon', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 7 },
  // Buổi 8 — Rối loạn lipid + đái tháo đường
  { id: 'atorvastatin', ten: 'Atorvastatin 10mg', hoatChat: 'Atorvastatin', hamLuong: '10 mg', dang: 'Viên nén bao phim', sdk: 'VD-52011-20', nhom: 'Rối loạn lipid máu', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 8 },
  { id: 'simvastatin', ten: 'Simvastatin 20mg', hoatChat: 'Simvastatin', hamLuong: '20 mg', dang: 'Viên nén bao phim', sdk: 'VD-51330-19', nhom: 'Rối loạn lipid máu', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 8 },
  { id: 'metformin', ten: 'Metformin 500mg', hoatChat: 'Metformin hydroclorid', hamLuong: '500 mg', dang: 'Viên nén bao phim', sdk: 'VD-51200-19', nhom: 'Đái tháo đường', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 8 },
  { id: 'gliclazid', ten: 'Gliclazid 30mg', hoatChat: 'Gliclazid', hamLuong: '30 mg', dang: 'Viên nén phóng thích chậm', sdk: 'VD-40770-18', nhom: 'Đái tháo đường', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 8 },
  { id: 'insulin', ten: 'Insulin (lọ tiêm)', hoatChat: 'Insulin người', hamLuong: '100 IU/ml', dang: 'Dung dịch tiêm', sdk: 'VD-29900-19', nhom: 'Đái tháo đường', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Mát 2–8°C (tủ lạnh)', buoi: 8 },
  // Buổi 9 — Kháng sinh
  { id: 'amoxicilin', ten: 'Amoxicilin 500mg', hoatChat: 'Amoxicilin', hamLuong: '500 mg', dang: 'Viên nang', sdk: 'VD-12345-17', nhom: 'Kháng sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 9 },
  { id: 'cefuroxim', ten: 'Cefuroxim 500mg', hoatChat: 'Cefuroxim', hamLuong: '500 mg', dang: 'Viên nén bao phim', sdk: 'VD-27781-18', nhom: 'Kháng sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 9 },
  { id: 'azithromycin', ten: 'Azithromycin 500mg', hoatChat: 'Azithromycin', hamLuong: '500 mg', dang: 'Viên nén bao phim', sdk: 'VD-28112-18', nhom: 'Kháng sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 9 },
  { id: 'ciprofloxacin', ten: 'Ciprofloxacin 500mg', hoatChat: 'Ciprofloxacin', hamLuong: '500 mg', dang: 'Viên nén bao phim', sdk: 'VD-27650-17', nhom: 'Kháng sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 9 },
  // Buổi 10 — Tiêu hoá
  { id: 'omeprazol', ten: 'Omeprazol 20mg', hoatChat: 'Omeprazol', hamLuong: '20 mg', dang: 'Viên nang bao tan trong ruột', sdk: 'VD-40318-18', nhom: 'Tiêu hoá', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 10 },
  { id: 'oresol', ten: 'Oresol (gói bù nước)', hoatChat: 'Glucose + điện giải', hamLuong: '1 gói/200ml', dang: 'Bột pha uống', sdk: 'VD-60112-17', nhom: 'Tiêu hoá', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 10 },
  { id: 'loperamid', ten: 'Loperamid 2mg', hoatChat: 'Loperamid hydroclorid', hamLuong: '2 mg', dang: 'Viên nang', sdk: 'VD-15220-16', nhom: 'Tiêu hoá', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 10 },
  { id: 'domperidon', ten: 'Domperidon 10mg', hoatChat: 'Domperidon', hamLuong: '10 mg', dang: 'Viên nén', sdk: 'VD-17880-16', nhom: 'Tiêu hoá', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 10 },
  // Buổi 11 — Hô hấp + lao
  { id: 'salbutamol', ten: 'Salbutamol 2mg', hoatChat: 'Salbutamol', hamLuong: '2 mg', dang: 'Viên nén', sdk: 'VD-22110-18', nhom: 'Hô hấp', keDon: 'ETC (kê đơn)', quanLy: 'Kiểm soát đặc biệt', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 11 },
  { id: 'bromhexin', ten: 'Bromhexin 8mg', hoatChat: 'Bromhexin hydroclorid', hamLuong: '8 mg', dang: 'Viên nén', sdk: 'VD-13440-15', nhom: 'Hô hấp', keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 11 },
  { id: 'isoniazid', ten: 'Isoniazid 150mg', hoatChat: 'Isoniazid (INH)', hamLuong: '150 mg', dang: 'Viên nén', sdk: 'VD-21330-17', nhom: 'Điều trị lao', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 11 },
  { id: 'rifampicin', ten: 'Rifampicin 150mg', hoatChat: 'Rifampicin', hamLuong: '150 mg', dang: 'Viên nang', sdk: 'VD-21440-17', nhom: 'Điều trị lao', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 11 },
  // Buổi 12 — Kháng nấm; động vật nguyên sinh/sốt rét; ung thư
  { id: 'fluconazol', ten: 'Fluconazol 150mg', hoatChat: 'Fluconazol', hamLuong: '150 mg', dang: 'Viên nang', sdk: 'VD-25110-17', nhom: 'Kháng nấm', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 12 },
  { id: 'metronidazol', ten: 'Metronidazol 250mg', hoatChat: 'Metronidazol', hamLuong: '250 mg', dang: 'Viên nén', sdk: 'VD-23670-17', nhom: 'Điều trị bệnh do động vật nguyên sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 12 },
  { id: 'cloroquin', ten: 'Cloroquin 250mg', hoatChat: 'Cloroquin phosphat', hamLuong: '250 mg', dang: 'Viên nén', sdk: 'VD-22990-16', nhom: 'Điều trị bệnh do động vật nguyên sinh', keDon: 'ETC (kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thuốc', baoQuan: 'Thường (≤30°C)', buoi: 12 },
  // TPBVSK — không có "nhóm tác dụng dược lý" nên KHÔNG dùng làm thuốc được chấm ở
  // Cấp 1 (subject:false); vẫn giữ trong danh mục làm ví dụ phân loại ngành hàng.
  { id: 'vitaminc', ten: 'Viên sủi Vitamin C', hoatChat: 'Acid ascorbic', hamLuong: '1000 mg', dang: 'Viên sủi', sdk: 'TPBVSK-6699/2022/ĐKSP', nhom: null, keDon: 'OTC (không kê đơn)', quanLy: 'Thuốc thường', nganh: 'Thực phẩm bảo vệ sức khoẻ', baoQuan: 'Thường (≤30°C)', subject: false },
];

// ---- Ngân hàng câu hỏi trắc nghiệm (Phụ lục 1, nguyên văn) ----
// tag: 'nen' kiến thức nền Dược lý | 'l1'..'l4' theo cấp. year2 lấy nen + l1 (10 câu);
// year3 lấy toàn bộ (20 câu). fb = giải thích (hiện sau khi chọn ở chế độ luyện).
export const QUIZ = [
  { id: 1, tag: 'nen', q: 'Phân nhóm theo tác dụng dược lý của Amoxicilin là:', o: ['Kháng sinh nhóm beta-lactam', 'Kháng sinh nhóm macrolid', 'Kháng sinh nhóm quinolon', 'Kháng sinh nhóm aminoglycosid'], a: 0 },
  { id: 2, tag: 'nen', q: 'Phân nhóm theo tác dụng dược lý của Salbutamol là:', o: ['Chẹn β giao cảm', 'Cường α giao cảm', 'Cường β2 giao cảm (giãn phế quản)', 'Kháng cholinergic (kháng muscarinic)'], a: 2 },
  { id: 3, tag: 'nen', q: 'Phân nhóm theo tác dụng dược lý của Loratadin là:', o: ['Kháng histamin H1 thế hệ 1', 'Kháng histamin H1 thế hệ 2', 'Kháng histamin H1 thế hệ 3', 'Kháng histamin H1 thế hệ 4'], a: 1 },
  { id: 4, tag: 'nen', q: 'Cơ chế tác dụng của Omeprazol trong điều trị loét dạ dày – tá tràng là:', o: ['Trung hoà acid dịch vị', 'Kháng thụ thể H2', 'Tạo màng bảo vệ niêm mạc', 'Ức chế bơm proton'], a: 3 },
  { id: 5, tag: 'nen', q: 'Thuốc điều trị đái tháo đường typ 2 dùng theo đường uống là:', o: ['Metformin', 'Insulin', 'Furosemid', 'Atorvastatin'], a: 0 },
  { id: 6, tag: 'nen', q: 'Mục đích của việc chỉ định Atorvastatin và Simvastatin là:', o: ['Hạ huyết áp', 'Chống đông máu', 'Hạ lipid máu', 'Điều trị suy tim'], a: 2 },
  { id: 7, tag: 'l1', q: 'Thuốc thuộc danh mục phải kiểm soát đặc biệt là:', o: ['Loratadin', 'Salbutamol', 'Furosemid', 'Cefuroxim'], a: 1, fb: 'Salbutamol thuộc danh mục chất phải kiểm soát đặc biệt (Nghị định 54/2017/NĐ-CP và cập nhật).' },
  { id: 8, tag: 'l1', q: 'Đặc điểm dùng để phân biệt thuốc kê đơn (ETC) với thuốc không kê đơn (OTC) là:', o: ['Nguồn gốc nhập khẩu hay sản xuất trong nước', 'Bắt buộc phải có đơn của người kê đơn khi bán', 'Dạng bào chế là viên hay thuốc tiêm', 'Hàm lượng hoạt chất cao hay thấp'], a: 1 },
  { id: 9, tag: 'l1', q: 'Ý nghĩa của số đăng ký (SĐK) in trên bao bì thuốc là:', o: ['Cho biết thuốc được cấp phép lưu hành hợp pháp', 'Cho biết mã vạch để quét giá bán', 'Cho biết hạn dùng của thuốc', 'Là khối lượng tịnh của sản phẩm'], a: 0 },
  { id: 10, tag: 'l1', q: 'Mục đích chính của việc sắp xếp thuốc theo nhóm tác dụng dược lý tại CSBL thuốc là:', o: ['Giảm số lần kiểm kê định kỳ', 'Tăng nhanh vòng quay vốn', 'Thuận tiện tra cứu, tư vấn đúng nhóm và hạn chế nhầm lẫn', 'Đáp ứng yêu cầu phòng cháy chữa cháy'], a: 2 },
  { id: 11, tag: 'l2', q: 'Bước đầu tiên trong quy trình kiểm nhập thuốc, niêm yết giá tại CSBL thuốc là:', o: ['Niêm yết giá với sản phẩm đạt yêu cầu', 'Ghi chép vào sổ sách/phần mềm bán hàng', 'Đối chiếu số lượng thực tế với hoá đơn', 'Kiểm tra nguồn gốc xuất xứ của sản phẩm'], a: 3 },
  { id: 12, tag: 'l2', q: 'Nội dung bắt buộc phải đối chiếu giữa hoá đơn và thực tế khi kiểm nhập là:', o: ['Vị trí sẽ trưng bày sản phẩm', 'Tên thuốc, số lô, hạn dùng, số lượng', 'Giá bán lẻ dự kiến của cơ sở', 'Quốc gia xuất xứ ghi trên hoá đơn'], a: 1 },
  { id: 13, tag: 'l2', q: 'Khi phát hiện sản phẩm bị hư hỏng, kém chất lượng ở khâu kiểm nhập, cách xử lý đúng là:', o: ['Trả lại hoặc đổi cho nhà cung ứng theo quy định, không đưa vào kho bán', 'Vẫn nhập kho và bán kèm khuyến mãi', 'Nhập kho nhưng hạ giá bán', 'Nhập kho chờ gần hạn mới bán'], a: 0 },
  { id: 14, tag: 'l3', q: 'Nguyên tắc "hạn dùng gần xuất trước" (FEFO) trong sắp xếp hàng hoá nhằm:', o: ['Tăng lợi nhuận trên mỗi sản phẩm', 'Tiết kiệm diện tích trưng bày', 'Giảm nguy cơ thuốc hết hạn còn tồn', 'Rút ngắn thời gian kiểm kê'], a: 2 },
  { id: 15, tag: 'l3', q: 'Tiêu chí "3 dễ" khi sắp xếp thuốc tại cơ sở bán lẻ thuốc là:', o: ['Dễ mua, dễ bán, dễ đổi', 'Dễ đếm, dễ ghi, dễ nhớ', 'Dễ vận chuyển, dễ đóng gói, dễ huỷ', 'Dễ thấy, dễ lấy, dễ kiểm tra'], a: 3 },
  { id: 16, tag: 'l3', q: 'Cơ sở để phân nhóm và bố trí vị trí thuốc trên giá là:', o: ['Theo thứ tự bảng chữ cái tên thương mại', 'Theo nhóm tác dụng dược lý và điều kiện bảo quản', 'Theo giá bán từ thấp đến cao', 'Theo nhà cung ứng sản phẩm'], a: 1 },
  { id: 17, tag: 'l3', q: 'Thuốc cần bảo quản lạnh (2–8°C) trong tủ lạnh là:', o: ['Insulin và một số vaccin/sinh phẩm', 'Viên nén Paracetamol', 'Viên đặt hậu môn Paracetamol', 'Siro ho bổ phế Nam Hà'], a: 0 },
  { id: 18, tag: 'l4', q: 'Khi phát hiện cơ sở đã nhập lô thuốc nằm trong danh mục bị thu hồi, việc cần làm ngay là:', o: ['Giảm giá để bán nhanh trước khi thu hồi', 'Tiếp tục bán cho khách quen', 'Ngừng bán, tách riêng và chuyển vào khu vực chờ xử lý', 'Chờ đến kỳ kiểm kê định kỳ mới xử lý'], a: 2 },
  { id: 19, tag: 'l4', q: 'Một bước đúng trong quy trình xử lý thuốc bị thu hồi tại CSBL thuốc là:', o: ['Tiếp tục bán số thuốc còn lại cho khách quen', 'Trộn lô thu hồi với lô đạt chuẩn để bán', 'Tự tiêu huỷ tại quầy mà không lập biên bản', 'Ghi sổ theo dõi thuốc đình chỉ lưu hành và liên hệ nhà cung ứng để trả lại hàng'], a: 3 },
  { id: 20, tag: 'l4', q: 'Việc lập sổ và báo cáo sau kiểm kê, kiểm soát chất lượng định kỳ nhằm:', o: ['Chỉ để đáp ứng thủ tục của thuế', 'Theo dõi tồn kho, phát hiện thuốc cận/hết hạn', 'Đánh giá năng lực nhân viên bán hàng', 'Xác định giá nhập/giá bán mới'], a: 1 },
];

// ---- Bảng kiểm 4 cấp (Phụ lục 2, nguyên văn) ----
export const CHECKLISTS = {
  1: ['Đọc đúng thông tin trên nhãn thuốc (tên/hoạt chất, hàm lượng, dạng bào chế, số lô, hạn dùng, SĐK)',
      'Xác định đúng nhóm tác dụng dược lý của thuốc',
      'Phân loại thuốc kê đơn (ETC) và không kê đơn (OTC)',
      'Phân loại theo mức độ quản lý (thường; kiểm soát đặc biệt)',
      'Phân loại sản phẩm theo ngành hàng (thuốc, TPBVSK, mỹ phẩm, TTBYT)',
      'Sắp xếp thuốc vào đúng nhóm tác dụng dược lý'],
  2: ['Kiểm tra nguồn gốc xuất xứ của sản phẩm',
      'Đối chiếu số lượng thực tế với hoá đơn',
      'Kiểm tra cảm quan bao bì của sản phẩm',
      'Kiểm tra thông tin trên bao bì và hoá đơn (tên, nồng độ/hàm lượng, số lô, hạn dùng)',
      'Kiểm tra chất lượng sản phẩm bằng cảm quan',
      'Xử lý nếu sản phẩm không đạt yêu cầu',
      'Niêm yết giá với các sản phẩm đạt yêu cầu',
      'Ghi chép vào sổ sách/phần mềm bán hàng'],
  3: ['Phân loại sản phẩm theo điều kiện bảo quản',
      'Phân loại các sản phẩm theo ngành hàng',
      'Phân loại nhóm thuốc theo mức độ quản lý',
      'Phân nhóm thuốc theo tác dụng dược lý',
      'Xác định vị trí sắp xếp sản phẩm',
      'Kiểm tra hạn dùng của sản phẩm (nguyên tắc FEFO/FIFO)',
      'Sắp xếp sản phẩm vào vị trí'],
  4: ['Lập sổ kiểm kê và kiểm soát chất lượng định kỳ',
      'Phân nhóm sản phẩm cần kiểm kê',
      'Kiểm tra CSBL có nhập thuốc phải thu hồi hay không',
      'Ngừng nhập, ngừng bán, tách riêng thuốc phải thu hồi',
      'Ghi sổ theo dõi thuốc đình chỉ lưu hành',
      'Liên hệ công ty/nhà cung ứng để trả lại hàng'],
};

// ---- Trò chơi học kiến thức: ghép thuốc → nhóm tác dụng dược lý ----
export const GAME_PAIRS = [
  { drug: 'Amoxicilin', group: 'Kháng sinh' },
  { drug: 'Salbutamol', group: 'Hô hấp (giãn phế quản)' },
  { drug: 'Loratadin', group: 'Kháng histamin H1' },
  { drug: 'Omeprazol', group: 'Tiêu hoá (ức chế bơm proton)' },
  { drug: 'Metformin', group: 'Đái tháo đường' },
  { drug: 'Atorvastatin', group: 'Rối loạn lipid máu' },
  { drug: 'Amlodipin', group: 'Tim mạch (hạ áp)' },
  { drug: 'Diazepam', group: 'Thần kinh trung ương' },
  { drug: 'Isoniazid', group: 'Điều trị lao' },
  { drug: 'Fluconazol', group: 'Kháng nấm' },
  { drug: 'Prednisolon', group: 'Hormon (corticoid)' },
  { drug: 'Acyclovir', group: 'Kháng virus' },
];

// ---- Thang đo cuối buổi (Phụ lục 3) ----
export const SURVEYS = {
  arcs: {
    title: 'Thang đo động lực học tập (ARCS)', scale: 5,
    legend: '1 = Hoàn toàn không đồng ý … 5 = Hoàn toàn đồng ý',
    items: [
      'Giao diện và tình huống trong phần mềm khiến tôi thấy tò mò, muốn khám phá. (Chú ý)',
      'Các cấp độ và tình huống đa dạng giúp tôi duy trì sự chú ý trong suốt buổi học. (Chú ý)',
      'Hình ảnh, âm thanh và phản hồi của phần mềm làm tôi không thấy nhàm chán. (Chú ý)',
      'Những tình huống bất ngờ trong phần mềm kích thích tôi suy nghĩ. (Chú ý)',
      'Nội dung luyện tập liên quan trực tiếp đến công việc thực tế tại CSBL thuốc. (Liên quan)',
      'Những kỹ năng trong phần mềm là cần thiết cho nghề nghiệp tương lai của tôi. (Liên quan)',
      'Tôi thấy rõ mối liên hệ giữa bài học với môn Dược lý và môn KNTH tại CSBL thuốc. (Liên quan)',
      'Việc luyện tập trên phần mềm đáp ứng nhu cầu học tập của tôi. (Liên quan)',
      'Ngay từ đầu tôi tin rằng mình có thể hoàn thành các nhiệm vụ trong phần mềm. (Tự tin)',
      'Sau khi luyện tập, tôi tự tin hơn khi thực hiện các nghiệp vụ tại CSBL thuốc. (Tự tin)',
      'Phản hồi và gợi ý của phần mềm giúp tôi tin rằng mình đang tiến bộ. (Tự tin)',
      'Tôi tin mình đủ khả năng vượt qua các cấp độ khó hơn. (Tự tin)',
      'Tôi hài lòng với những gì đã học được qua phần mềm. (Thoả mãn)',
      'Hoàn thành mỗi cấp độ mang lại cho tôi cảm giác thành công. (Thoả mãn)',
      'Tôi muốn tiếp tục sử dụng phần mềm để luyện tập thêm. (Thoả mãn)',
      'Tôi sẵn lòng giới thiệu phần mềm này cho bạn bè cùng học. (Thoả mãn)',
    ],
  },
  clt: {
    title: 'Thang đo tải nhận thức', scale: 10,
    legend: '0 = hoàn toàn không đúng với tôi … 10 = hoàn toàn đúng với tôi',
    items: [
      'Nội dung và nhiệm vụ trong bài luyện tập bản thân nó rất phức tạp. (Tải nội tại)',
      'Các khái niệm và thao tác trong bài đòi hỏi tôi phải xử lý nhiều thông tin cùng lúc. (Tải nội tại)',
      'Bài luyện tập bao gồm nhiều nội dung mà tôi thấy khó. (Tải nội tại)',
      'Cách trình bày và giao diện của phần mềm khiến tôi khó tiếp thu. (Tải ngoại lai)',
      'Các hướng dẫn, chỉ dẫn trong phần mềm chưa rõ ràng, gây mất thời gian. (Tải ngoại lai)',
      'Bố cục màn hình làm tôi mất tập trung vào nội dung cần học. (Tải ngoại lai)',
      'Hoạt động luyện tập giúp tôi hiểu sâu hơn các nghiệp vụ tại nhà thuốc. (Tải liên quan)',
      'Quá trình luyện tập giúp tôi kết nối kiến thức mới với những gì đã biết. (Tải liên quan)',
      'Sau khi luyện tập, tôi hiểu được cách thực hiện quy trình rõ ràng hơn. (Tải liên quan)',
      'Bài luyện tập thực sự nâng cao hiểu biết của tôi về nội dung môn học. (Tải liên quan)',
    ],
  },
  sus: {
    title: 'Thang đo tính khả dụng (SUS)', scale: 5,
    legend: '1 = Hoàn toàn không đồng ý … 5 = Hoàn toàn đồng ý',
    // Mục lẻ (index chẵn) khẳng định; mục chẵn (index lẻ) phủ định — tính điểm ở client.
    items: [
      'Tôi nghĩ mình sẽ muốn sử dụng phần mềm này thường xuyên.',
      'Tôi thấy phần mềm phức tạp một cách không cần thiết.',
      'Tôi thấy phần mềm dễ sử dụng.',
      'Tôi nghĩ mình cần được hỗ trợ kỹ thuật mới có thể dùng được phần mềm.',
      'Tôi thấy các chức năng của phần mềm được tích hợp, phối hợp tốt.',
      'Tôi thấy phần mềm có nhiều điểm thiếu nhất quán.',
      'Tôi nghĩ hầu hết mọi người sẽ học cách dùng phần mềm này rất nhanh.',
      'Tôi thấy phần mềm khó thao tác, gây lúng túng khi sử dụng.',
      'Tôi cảm thấy tự tin khi sử dụng phần mềm.',
      'Tôi cần làm quen nhiều thứ trước khi có thể dùng tốt phần mềm.',
    ],
  },
};

// ---- Metadata 4 cấp (nhan đề + mô tả ngắn cho hub) ----
export const LEVELS = [
  { level: 1, icon: '🔎', title: 'Cấp 1 — Nhận biết & phân loại thuốc', desc: 'Đọc nhãn, xác định nhóm dược lý, ETC/OTC, mức quản lý, ngành hàng.' },
  { level: 2, icon: '📦', title: 'Cấp 2 — Kiểm nhập & kiểm soát chất lượng', desc: 'Đối chiếu hoá đơn, kiểm cảm quan, xử lý hàng không đạt, niêm yết giá.' },
  { level: 3, icon: '🗄️', title: 'Cấp 3 — Bảo quản & sắp xếp hàng hoá', desc: 'Phân loại theo bảo quản/quản lý/nhóm, áp dụng FEFO, xếp đúng vị trí.' },
  { level: 4, icon: '📋', title: 'Cấp 4 — Kiểm kê & xử lý thuốc thu hồi', desc: 'Kiểm kê định kỳ; cách ly, ghi sổ, liên hệ NCC khi có thuốc thu hồi.' },
];
