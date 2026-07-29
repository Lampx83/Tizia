// LabelEditor — TÁCH 2 loại nhãn (theo yêu cầu thầy Lâm):
//   • openHdsdEditor   — Nhãn HƯỚNG DẪN SỬ DỤNG dán lên HỘP thuốc (liều + thời điểm + số phút trước/sau ăn)
//   • openPackageEditor — Nhãn BAO BÌ RA LẺ (trắng/vàng/hồng) theo mẫu phong bì; túi zip chỉ đựng kín khí
// Giữ semantic field cũ để backend chấm điểm + render in/dán nhãn vẫn work.
import { ALL_DRUGS, getDrug, PHARMACY_INFO } from './catalog.js?v=ph0729e';
import { TIMING_LABEL, totalPerDay } from './labels.js';

const QUICK_NOTES = [
  'Uống nhiều nước',
  'Tránh lái xe, vận hành máy móc',
  'Không dùng chung với rượu bia',
  'Uống cách kháng sinh ≥ 2 giờ',
  'Bảo quản nơi khô ráo, tránh ánh nắng'
];
const TIMING_OPTIONS = [
  { value: 'before_meal', label: 'Trước ăn' },
  { value: 'after_meal',  label: 'Sau ăn'  },
  { value: 'with_meal',   label: 'Cùng bữa ăn' },
  { value: 'any',         label: 'Bất kỳ thời điểm' }
];
// Bao bì ra lẻ — màu + tiêu đề đặc biệt theo mẫu phong bì của thầy.
export const PACKAGE_TYPES = {
  white: { label: 'Bao bì trắng', color: '#ffffff', text: '#0f172a', special: '' },
  yellow:{ label: 'Bao bì vàng',  color: '#fde68a', text: '#7c2d12', special: 'THUỐC DÙNG NGOÀI' },
  pink:  { label: 'Bao bì hồng',  color: '#fbcfe8', text: '#831843', special: 'THUỐC PHẢI KIỂM SOÁT ĐẶC BIỆT' },
  zip:   { label: 'Túi zip kín khí', color: '#cffafe', text: '#0c4a6e', special: '', airtight: true }
};
// Dạng đơn vị ra lẻ — dùng cho bước "cho thuốc vào bao bì".
export const RETAIL_FORMS = [
  { value: 'vi',   label: 'Vỉ' },
  { value: 'goi',  label: 'Gói' },
  { value: 'vien', label: 'Viên' },
  { value: 'ong',  label: 'Ống' }
];

// Hiển thị thời điểm uống kèm số phút trước/sau ăn ("Sau ăn 30 phút").
export function timingText(l) {
  const base = TIMING_LABEL[l.timing] || 'Bất kỳ';
  if ((l.timing === 'before_meal' || l.timing === 'after_meal') && l.mealOffsetMin > 0) {
    return `${base} ${l.mealOffsetMin} phút`;
  }
  return base;
}

// ────────────────────────────────────────────────────────────────────────────
// NHÃN HƯỚNG DẪN SỬ DỤNG (dán lên hộp)
// ────────────────────────────────────────────────────────────────────────────
export function openHdsdEditor({ pickedIds = [], onCreate, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'label-overlay label-overlay-v2';
  overlay.innerHTML = `
    <div class="label-modal-v2">
      <div class="label-head-v2">
        <div class="label-title-v2">🏷️ Soạn nhãn HDSD – Hướng dẫn sử dụng thuốc</div>
        <button class="label-close-v2" type="button">✕</button>
      </div>
      <div class="label-body-v2">
        <div class="le2-left">
          <label class="le2-field">
            <span class="le2-lbl">Chọn thuốc</span>
            <input class="le2-drug-search" type="search" placeholder="🔎 Gõ tên thuốc để tìm nhanh…" autocomplete="off"/>
            <select class="le2-drug" size="1"></select>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">Cách dùng, Liều dùng</span>
            <textarea class="le2-usage" rows="3" placeholder="VD: Uống 1 ống/lần, ngày 2 lần (sáng – tối). Lắc kỹ trước khi dùng."></textarea>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">Thời điểm dùng</span>
            <textarea class="le2-timepoint" rows="2" placeholder="VD: Sau ăn 30 phút; hoặc uống ngay sau mỗi lần đi ngoài."></textarea>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">Ghi chú thêm (chú ý đặc biệt)</span>
            <textarea class="le2-notes" rows="2" placeholder="Ví dụ: uống nhiều nước, tránh ánh nắng..."></textarea>
          </label>
          <div class="le2-quicks">
            ${QUICK_NOTES.map(n => `<button class="le2-quick" type="button">+ ${n}</button>`).join('')}
          </div>
        </div>
        <div class="le2-right">
          <div class="le2-preview-title">Xem trước nhãn dán (kích thước thật)</div>
          <div class="le2-sticker">
            <div class="le2-sk-pharm">${PHARMACY_INFO.name} · ${PHARMACY_INFO.address} · ĐT ${PHARMACY_INFO.phone}</div>
            <div class="le2-sk-drug"><b class="le2-sk-brand">—</b> <span class="le2-sk-strength"></span></div>
            <div class="le2-sk-usage"><b>Cách dùng, liều dùng:</b> <span class="le2-sk-usage-v">…</span></div>
            <div class="le2-sk-timepoint"><b>Thời điểm dùng:</b> <span class="le2-sk-timepoint-v">…</span></div>
            <div class="le2-sk-notes"></div>
          </div>
          <p class="le2-hint">Sau khi bấm <b>Tạo nhãn</b>, con trỏ sẽ mang theo nhãn → <b>click vào hộp thuốc</b> trên kệ. Hộp được phóng to để bạn <b>kéo nhãn vào chỗ trống</b>, không che thông tin thuốc.</p>
        </div>
      </div>
      <div class="label-foot-v2">
        <button class="le2-cancel" type="button">Huỷ</button>
        <button class="le2-create" type="button">🏷️ Tạo nhãn → kéo dán lên hộp</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const $ = (s) => overlay.querySelector(s);
  const $$ = (s) => Array.from(overlay.querySelectorAll(s));

  // Populate drug select — có Ô TÌM (yêu cầu thầy #10: gõ tên thuốc tìm nhanh).
  const pickedDrugs = pickedIds.map(getDrug).filter(Boolean);
  const otherDrugs = ALL_DRUGS.filter(d => !pickedIds.includes(d.id));
  const norm = (s) => String(s || '').toLowerCase();
  function renderDrugOptions(query = '') {
    const q = norm(query).trim();
    const match = (d) => !q || norm(`${d.brand} ${d.name} ${d.generic} ${d.sku} ${d.strength}`).includes(q);
    const prevVal = $('.le2-drug').value;
    const groups = [];
    if (pickedDrugs.length) groups.push(['Đã chọn từ kệ', pickedDrugs.filter(match)]);
    const others = otherDrugs.filter(match);
    // Khi đang tìm → cho xem tới 200 kết quả; mặc định 80 để select gọn.
    groups.push([q ? `Kết quả (${others.length})` : 'Tất cả catalog', others.slice(0, q ? 200 : 80)]);
    $('.le2-drug').innerHTML = groups.filter(([, it]) => it.length).map(([gName, items]) => `
      <optgroup label="${gName}">
        ${items.map(d => `<option value="${d.id}">${d.brand || d.name} ${d.strength || ''}</option>`).join('')}
      </optgroup>
    `).join('') || '<option value="">— Không có thuốc khớp —</option>';
    // Giữ lựa chọn cũ nếu còn trong danh sách lọc.
    if (prevVal && [...$('.le2-drug').options].some(o => o.value === prevVal)) $('.le2-drug').value = prevVal;
  }
  renderDrugOptions();
  $('.le2-drug-search').addEventListener('input', (e) => { renderDrugOptions(e.target.value); renderPreview(); });

  // CBS 20/07 #4: 2 ô nhập tự do thay cho liều S/T/C/T + thời điểm cố định.
  $('.le2-usage').addEventListener('input', renderPreview);
  $('.le2-timepoint').addEventListener('input', renderPreview);

  // Quick notes
  $$('.le2-quick').forEach(b => b.addEventListener('click', () => {
    const text = b.textContent.replace(/^\+\s*/, '');
    const cur = $('.le2-notes').value.trim();
    $('.le2-notes').value = cur ? `${cur}; ${text}` : text;
    renderPreview();
  }));

  // Inputs
  $('.le2-drug').addEventListener('change', renderPreview);
  $('.le2-notes').addEventListener('input', renderPreview);

  function readLabel() {
    const drugId = $('.le2-drug').value;
    const d = getDrug(drugId);
    return {
      drugId,
      brand: d?.brand || d?.name || '',
      generic: d?.generic || '',
      strength: d?.strength || '',
      exp: d?.expDate || '',
      usage: $('.le2-usage').value.trim(),
      timePoint: $('.le2-timepoint').value.trim(),
      notes: $('.le2-notes').value,
      issuedAt: Date.now()
    };
  }

  function renderPreview() {
    const l = readLabel();
    $('.le2-sk-brand').textContent = l.brand || '—';
    // Hàm lượng GỘP cùng hàng với tên thuốc ("Aleucin 500mg") — rỗng khi không có
    // hoặc khi tên thuốc đã chứa sẵn hàm lượng (tránh lặp "500mg 500mg").
    const _str = String(l.strength || l.generic || '').trim();
    const _hasStr = _str && String(l.brand || '').toLowerCase().includes(_str.toLowerCase());
    $('.le2-sk-strength').textContent = _hasStr ? '' : _str;
    $('.le2-sk-usage-v').textContent = l.usage || '…';
    $('.le2-sk-timepoint-v').textContent = l.timePoint || '…';
    $('.le2-sk-notes').textContent = l.notes ? '📝 ' + l.notes : '';
  }

  // Close handlers
  const closeBtn = $('.label-close-v2');
  const cancelBtn = $('.le2-cancel');
  closeBtn?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  cancelBtn?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  const escHandler = (e) => { if (e.key === 'Escape') { close(); } };
  document.addEventListener('keydown', escHandler);
  const _origClose = () => { document.removeEventListener('keydown', escHandler); overlay.remove(); onClose?.(); };
  $('.le2-create').addEventListener('click', () => {
    const l = readLabel();
    if (!l.drugId) { alert('Chọn thuốc.'); return; }
    if (!l.usage)  { alert('Nhập "Cách dùng, Liều dùng".'); return; }
    onCreate?.(l);
    close();
  });

  renderPreview();
  function close() { _origClose(); }
}

// Backward-compat: tên cũ trỏ tới nhãn HDSD.
export const openLabelEditor = openHdsdEditor;

// ────────────────────────────────────────────────────────────────────────────
// NHÃN BAO BÌ RA LẺ (phong bì trắng/vàng/hồng) — theo mẫu của thầy
// ────────────────────────────────────────────────────────────────────────────
export function openPackageEditor({ drug, formType = 'vi', packageType = 'white', onCreate, onClose }) {
  const pkg = PACKAGE_TYPES[packageType] || PACKAGE_TYPES.white;
  const formLabel = (RETAIL_FORMS.find(f => f.value === formType) || {}).label || 'Vỉ';
  const d = drug || {};
  const overlay = document.createElement('div');
  overlay.className = 'label-overlay pkg-overlay';
  overlay.innerHTML = `
    <div class="pkg-modal">
      <div class="label-head-v2">
        <div class="label-title-v2">✉️ Ghi nhãn ${pkg.label} · đựng <b>${formLabel}</b> ra lẻ</div>
        <button class="label-close-v2" type="button">✕</button>
      </div>
      <div class="pkg-body">
        <div class="pkg-form">
          <label class="le2-field">
            <span class="le2-lbl">Tên thuốc, Nồng độ/Hàm lượng</span>
            <input class="pkg-drug" value="${esc((d.brand || d.name || ''))}${d.strength ? ' ' + esc(d.strength) : ''}"/>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">Cách dùng, liều dùng</span>
            <textarea class="pkg-dose" rows="2" placeholder="VD: uống 1 viên × 3 lần/ngày, sau ăn 30 phút"></textarea>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">Hạn dùng</span>
            <input class="pkg-exp" value="${esc(d.expDate || '')}" placeholder="dd/mm/yyyy"/>
          </label>
          <label class="le2-field">
            <span class="le2-lbl">*Lưu ý</span>
            <textarea class="pkg-note" rows="2" placeholder="VD: để xa tầm tay trẻ em">${pkg.special === 'THUỐC DÙNG NGOÀI' ? 'Không được uống. Chỉ dùng ngoài da.' : ''}</textarea>
          </label>
        </div>
        <div class="pkg-preview-wrap">
          <div class="le2-preview-title">Xem trước nhãn phong bì</div>
          <div class="pkg-sticker" style="background:${pkg.color};color:${pkg.text}">
            <div class="pkg-sk-head">
              <span class="pkg-sk-logo">⚕</span>
              <div>
                <b>${PHARMACY_INFO.name} ${esc(PHARMACY_INFO.address)}</b><br>
                Số điện thoại: ${PHARMACY_INFO.phone}
              </div>
            </div>
            ${pkg.special ? `<div class="pkg-sk-special">${pkg.special}</div>` : ''}
            <div class="pkg-sk-row"><b>Tên thuốc, Nồng độ/Hàm lượng:</b><br><span class="pkg-sk-drug">—</span></div>
            <div class="pkg-sk-row"><b>- Cách dùng, liều dùng:</b><br><span class="pkg-sk-dose">…</span></div>
            <div class="pkg-sk-row"><b>- Hạn dùng:</b> <span class="pkg-sk-exp">…</span></div>
            <div class="pkg-sk-row"><b>*Lưu ý:</b> <span class="pkg-sk-note">…</span></div>
          </div>
        </div>
      </div>
      <div class="label-foot-v2">
        <button class="pkg-cancel" type="button">Huỷ</button>
        <button class="pkg-create" type="button">✅ Ghi nhãn & đóng gói</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  const $ = (s) => overlay.querySelector(s);

  function render() {
    $('.pkg-sk-drug').textContent = $('.pkg-drug').value || '—';
    $('.pkg-sk-dose').textContent = $('.pkg-dose').value || '…';
    $('.pkg-sk-exp').textContent  = $('.pkg-exp').value || '…';
    $('.pkg-sk-note').textContent = $('.pkg-note').value || '…';
  }
  ['.pkg-drug', '.pkg-dose', '.pkg-exp', '.pkg-note'].forEach(s => $(s).addEventListener('input', render));

  const escHandler = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', escHandler);
  const close = () => { document.removeEventListener('keydown', escHandler); overlay.remove(); onClose?.(); };
  $('.label-close-v2').addEventListener('click', close);
  $('.pkg-cancel').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  $('.pkg-create').addEventListener('click', () => {
    onCreate?.({
      drugId: d.id || '',
      packageType,
      formType,
      drugText: $('.pkg-drug').value,
      dose: $('.pkg-dose').value,
      exp: $('.pkg-exp').value,
      note: $('.pkg-note').value,
      issuedAt: Date.now()
    });
    close();
  });

  render();
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
