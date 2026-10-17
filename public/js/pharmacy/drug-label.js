// Nhãn thuốc mô phỏng theo THÔNG TƯ 01/VBHN-BYT — quy định ghi nhãn thuốc.
// Sinh HTML cho 2 loại nhãn từ dữ liệu thật của danh mục (Phase ③):
//   • Nhãn bao bì NGOÀI (mục 3.1: a→l)
//   • Nhãn bao bì TIẾP XÚC TRỰC TIẾP (mục 3.2: a→đ) — tái dùng dán lên vỉ/lọ/ống (Phase ②)
// Mọi nhãn có footer "Dữ liệu mô phỏng CBS – Chỉ dùng cho đào tạo dược".
// Module thuần (không phụ thuộc Three.js) để dùng được cả ở inspector lẫn trang in.

export const SIM_FOOTER = 'Dữ liệu mô phỏng CBS – Chỉ dùng cho đào tạo dược';
// Nhà thuốc thực hành (theo yêu cầu thầy)
export const PRACTICE_PHARMACY = { name: 'Nhà thuốc Thực Hành', address: '35 Đoàn Thị Điểm', phone: '0972560XXX' };

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Đếm số hoạt chất (tách theo ';' hoặc '+') để áp quy tắc TT:
//  ≤2 hoạt chất → ghi hoạt chất/hàm lượng ngay dưới tên thuốc (nhãn ngoài)
//  ≤3 hoạt chất → ghi đầy đủ thành phần trên nhãn tiếp xúc trực tiếp
export function countActives(active) {
  const s = String(active || '').trim();
  if (!s) return 0;
  return s.split(/;|\s\+\s/).map(x => x.trim()).filter(Boolean).length;
}

const isImported = (drug) => drug.country && !/việt\s*nam/i.test(drug.country);

// Dấu hiệu lưu ý + chỉ dẫn đường dùng bắt buộc theo dạng bào chế (TT mục 3.1.h).
export function labelWarnings(drug) {
  const f = (drug.form || '').toLowerCase();
  const grp = (drug.pharmaGroup || drug.category || '').toLowerCase();
  const out = [];
  if (/tiêm|truyền/.test(f) || /tiêm|truyền/.test(grp)) out.push('Tiêm/tiêm truyền: theo chỉ định');
  if (/nhỏ mắt|tra mắt/.test(f)) out.push('Thuốc nhỏ mắt');
  else if (/nhỏ mũi/.test(f)) out.push('Thuốc nhỏ mũi');
  else if (/nhỏ tai/.test(f)) out.push('Thuốc nhỏ tai');
  if (/kem|gel|mỡ|bôi|dùng ngoài|cao xoa|dán/.test(f)) out.push('Thuốc dùng ngoài');
  if (/ống.*uống|uống.*ống/.test(f)) out.push('Không được tiêm');
  if (/hỗn dịch|bột|cốm|siro/.test(f)) out.push('Lắc kỹ trước khi dùng');
  return out;
}

// Tiện ích: lấy NSX–HSD–lô (ưu tiên field thật, fallback meta hash từ scene).
function lotInfo(drug, meta) {
  return {
    lot: drug.lot || meta?.lot || '-',
    mfg: drug.mfgDate || '-',
    exp: drug.expDate || meta?.expiry || '-',
    reg: drug.regNo || drug.sdk || '-',
    storage: drug.storage || '-',
  };
}

// ── Nhãn bao bì NGOÀI (TT 3.1) ──────────────────────────────────────────────
export function outerLabelHTML(drug, meta) {
  const { lot, mfg, exp, reg, storage } = lotInfo(drug, meta);
  const nAct = countActives(drug.activeIngredient || drug.generic);
  const showActiveUnderName = nAct > 0 && nAct <= 2;
  const warns = labelWarnings(drug);
  const imported = isImported(drug);
  return `
  <div class="tt-label tt-outer" style="--tt-acc:${esc(drug.groupAccent || '#0d9488')}">
    ${drug.isRx ? '<span class="tt-rx-corner">Rx</span>' : ''}
    <div class="tt-name">${esc(drug.brand || drug.name)}</div>
    ${showActiveUnderName ? `<div class="tt-active">${esc(drug.activeIngredient || drug.generic)}</div>` : ''}
    <div class="tt-form">Dạng bào chế: <b>${esc(drug.form || '-')}</b></div>
    <dl class="tt-fields">
      <div><dt>Thành phần, hàm lượng</dt><dd>${esc(drug.activeIngredient || drug.generic || '-')}</dd></div>
      <div><dt>Quy cách đóng gói</dt><dd>${esc(drug.packaging || drug.pack || '-')}</dd></div>
      <div><dt>Chỉ định, cách dùng, chống chỉ định</dt><dd><i>Xin đọc trong tờ hướng dẫn sử dụng thuốc</i></dd></div>
      <div><dt>Số giấy ĐK lưu hành</dt><dd>${esc(reg)}</dd></div>
      <div><dt>Số lô SX</dt><dd>${esc(lot)}</dd></div>
      <div><dt>NSX – HSD</dt><dd>${esc(mfg)} – ${esc(exp)}</dd></div>
      <div><dt>Tiêu chuẩn chất lượng</dt><dd>TCCS</dd></div>
      <div><dt>Bảo quản</dt><dd>${esc(storage)}</dd></div>
      <div><dt>Cơ sở sản xuất</dt><dd>${esc(drug.manufacturer || '-')}</dd></div>
      ${imported ? `<div><dt>Xuất xứ</dt><dd>${esc(drug.country)}</dd></div>` : ''}
    </dl>
    <div class="tt-warns">
      ${drug.isRx ? '<span class="tt-chip tt-chip-rx">Thuốc kê đơn</span>' : ''}
      <span class="tt-chip">Để xa tầm tay trẻ em</span>
      <span class="tt-chip">Đọc kỹ hướng dẫn sử dụng trước khi dùng</span>
      ${warns.map(w => `<span class="tt-chip tt-chip-route">${esc(w)}</span>`).join('')}
    </div>
  </div>`;
}

// ── Nhãn bao bì TIẾP XÚC TRỰC TIẾP (TT 3.2) — vỉ/lọ/ống ─────────────────────
export function directLabelHTML(drug, meta) {
  const { lot, exp } = lotInfo(drug, meta);
  const nAct = countActives(drug.activeIngredient || drug.generic);
  const showComp = nAct > 0 && nAct <= 3; // >3 hoạt chất không bắt buộc ghi thành phần
  return `
  <div class="tt-label tt-direct" style="--tt-acc:${esc(drug.groupAccent || '#0d9488')}">
    <div class="tt-name sm">${drug.isRx ? '<span class="tt-rx-inline">Rx</span> ' : ''}${esc(drug.brand || drug.name)}</div>
    ${showComp ? `<div class="tt-active sm">${esc(drug.activeIngredient || drug.generic)}</div>` : ''}
    <div class="tt-direct-rows">
      <span><b>Lô:</b> ${esc(lot)}</span>
      <span><b>HSD:</b> ${esc(exp)}</span>
    </div>
    <div class="tt-maker">${esc(drug.manufacturer || '-')}</div>
  </div>`;
}

// Khối 2 nhãn cho inspector (không cần JS toggle — xếp dọc, có tiêu đề).
export function labelSectionHTML(drug, meta) {
  return `
  <div class="tt-section">
    <div class="tt-section-head">🏷️ Nhãn thuốc mô phỏng <span class="tt-tt">(TT 01/VBHN-BYT)</span></div>
    <div class="tt-cards">
      <div class="tt-card">
        <div class="tt-card-cap">Nhãn bao bì ngoài</div>
        ${outerLabelHTML(drug, meta)}
      </div>
      <div class="tt-card">
        <div class="tt-card-cap">Nhãn tiếp xúc trực tiếp (vỉ/lọ/ống)</div>
        ${directLabelHTML(drug, meta)}
      </div>
    </div>
  </div>`;
}
