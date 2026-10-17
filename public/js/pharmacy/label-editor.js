// LabelEditor — TÁCH 2 loại nhãn (theo yêu cầu thầy Lâm):
//   • openHdsdEditor   — Nhãn HƯỚNG DẪN SỬ DỤNG dán lên HỘP thuốc (liều + thời điểm + số phút trước/sau ăn)
//   • openPackageEditor — Nhãn BAO BÌ RA LẺ (trắng/vàng/hồng) theo mẫu phong bì; túi zip chỉ đựng kín khí
// Giữ semantic field cũ để backend chấm điểm + render in/dán nhãn vẫn work.
import { ALL_DRUGS, getDrug, PHARMACY_INFO } from './catalog.js?v=ph0682';
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
            <span class="le2-lbl">Bệnh nhân</span>
            <input class="le2-patient" placeholder="Khách vãng lai" value="Khách vãng lai"/>
          </label>
          <fieldset class="le2-doses-box">
            <legend>Số viên mỗi cữ</legend>
            <div class="le2-doses-grid">
              ${['morning','noon','afternoon','evening'].map((k, i) => `
                <div class="le2-dose">
                  <div class="le2-dose-lbl">${['Sáng','Trưa','Chiều','Tối'][i]}</div>
                  <div class="le2-stepper">
                    <button class="le2-minus" data-k="${k}" type="button">−</button>
                    <span class="le2-val" data-k="${k}">${i % 2 === 0 ? 1 : 0}</span>
                    <button class="le2-plus" data-k="${k}" type="button">+</button>
                  </div>
                </div>`).join('')}
            </div>
            <div class="le2-total">Tổng liều/ngày: <b class="le2-total-val">2 viên</b></div>
          </fieldset>
          <fieldset class="le2-timing-box">
            <legend>Thời điểm uống</legend>
            <div class="le2-chips">
              ${TIMING_OPTIONS.map(o => `<button class="le2-chip le2-time" data-v="${o.value}" type="button">${o.label}</button>`).join('')}
            </div>
            <div class="le2-offset-row" hidden>
              <span class="le2-lbl">Số phút <b class="le2-offset-dir">trước</b> ăn</span>
              <div class="le2-stepper">
                <button class="le2-off-minus" type="button">−</button>
                <span class="le2-offset-val">30</span>
                <button class="le2-off-plus" type="button">+</button>
              </div>
              <span class="le2-lbl">phút</span>
            </div>
          </fieldset>
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
            <div class="le2-sk-head">HƯỚNG DẪN SỬ DỤNG</div>
            <div class="le2-sk-bn">BN: <b class="le2-sk-patient">Khách vãng lai</b></div>
            <div class="le2-sk-drug"><b class="le2-sk-brand">-</b></div>
            <div class="le2-sk-strength">-</div>
            <div class="le2-sk-doses-grid">
              ${['Sáng','Trưa','Chiều','Tối'].map((t, i) => `
                <div class="le2-sk-cell">
                  <div class="le2-sk-time">${t}</div>
                  <div class="le2-sk-num" data-cell="${i}">${i % 2 === 0 ? 1 : 0}</div>
                </div>`).join('')}
            </div>
            <div class="le2-sk-foot">
              <span class="le2-sk-timing">🕒 Sau ăn</span>
              <span class="le2-sk-total">· 2 viên/ngày</span>
            </div>
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
    `).join('') || '<option value="">Không có thuốc khớp</option>';
    // Giữ lựa chọn cũ nếu còn trong danh sách lọc.
    if (prevVal && [...$('.le2-drug').options].some(o => o.value === prevVal)) $('.le2-drug').value = prevVal;
  }
  renderDrugOptions();
  $('.le2-drug-search').addEventListener('input', (e) => { renderDrugOptions(e.target.value); renderPreview(); });

  // Stepper handlers
  function getDose(k) { return +$(`.le2-val[data-k="${k}"]`).textContent || 0; }
  function setDose(k, v) {
    v = Math.max(0, Math.min(4, v));
    $(`.le2-val[data-k="${k}"]`).textContent = v;
  }
  $$('.le2-minus').forEach(b => b.addEventListener('click', () => { setDose(b.dataset.k, getDose(b.dataset.k) - 1); renderPreview(); }));
  $$('.le2-plus' ).forEach(b => b.addEventListener('click', () => { setDose(b.dataset.k, getDose(b.dataset.k) + 1); renderPreview(); }));

  // State khai báo TRƯỚC mọi callback để tránh TDZ.
  let timing = 'after_meal';
  let mealOffsetMin = 30;

  // Timing chips — hiện ô số phút khi chọn trước/sau ăn
  function setTiming(v) {
    timing = v;
    $$('.le2-time').forEach(c => c.classList.toggle('le2-chip-active', c.dataset.v === v));
    const offRow = $('.le2-offset-row');
    const showOff = (v === 'before_meal' || v === 'after_meal');
    offRow.hidden = !showOff;
    if (showOff) $('.le2-offset-dir').textContent = (v === 'before_meal') ? 'trước' : 'sau';
    renderPreview();
  }
  $$('.le2-time').forEach(c => c.addEventListener('click', () => setTiming(c.dataset.v)));

  // Số phút trước/sau ăn (bước 5 phút)
  $('.le2-off-minus').addEventListener('click', () => { mealOffsetMin = Math.max(0, mealOffsetMin - 5); $('.le2-offset-val').textContent = mealOffsetMin; renderPreview(); });
  $('.le2-off-plus' ).addEventListener('click', () => { mealOffsetMin = Math.min(120, mealOffsetMin + 5); $('.le2-offset-val').textContent = mealOffsetMin; renderPreview(); });

  // Quick notes
  $$('.le2-quick').forEach(b => b.addEventListener('click', () => {
    const text = b.textContent.replace(/^\+\s*/, '');
    const cur = $('.le2-notes').value.trim();
    $('.le2-notes').value = cur ? `${cur}; ${text}` : text;
    renderPreview();
  }));

  // Inputs
  $('.le2-drug').addEventListener('change', renderPreview);
  $('.le2-patient').addEventListener('input', renderPreview);
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
      patient: $('.le2-patient').value || 'Khách vãng lai',
      morning: getDose('morning'),
      noon: getDose('noon'),
      afternoon: getDose('afternoon'),
      evening: getDose('evening'),
      timing,
      mealOffsetMin,
      notes: $('.le2-notes').value,
      issuedAt: Date.now()
    };
  }

  function renderPreview() {
    const l = readLabel();
    $('.le2-sk-patient').textContent = l.patient || '-';
    $('.le2-sk-brand').textContent = l.brand || '-';
    $('.le2-sk-strength').textContent = l.strength || (l.generic || '-');
    ['morning','noon','afternoon','evening'].forEach((k, i) => {
      $(`.le2-sk-num[data-cell="${i}"]`).textContent = l[k];
    });
    $('.le2-sk-timing').textContent = '🕒 ' + timingText(l);
    $('.le2-sk-total').textContent = ` · ${totalPerDay(l)} viên/ngày`;
    $('.le2-sk-notes').textContent = l.notes ? '📝 ' + l.notes : '';
    $('.le2-total-val').textContent = `${totalPerDay(l)} viên`;
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
    if (!l.drugId)            { alert('Chọn thuốc.'); return; }
    if (!l.patient.trim())    { alert('Nhập tên bệnh nhân.'); return; }
    if (totalPerDay(l) === 0) { alert('Liều phải > 0.'); return; }
    onCreate?.(l);
    close();
  });

  setTiming('after_meal');
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
            <div class="pkg-sk-row"><b>Tên thuốc, Nồng độ/Hàm lượng:</b><br><span class="pkg-sk-drug">-</span></div>
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
    $('.pkg-sk-drug').textContent = $('.pkg-drug').value || '-';
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
