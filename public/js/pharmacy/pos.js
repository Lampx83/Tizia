// PosTerminal — port từ Pharmacy-AI/src/components/pos/PosTerminal.tsx.
// MVP fidelity: cart, customer, payment, totals, invoice no, Rx warning, action log.
import { ALL_DRUGS, getDrug, PHARMACY_INFO, VAT_RATE } from './catalog.js?v=ph0682';

const VND = (n) => new Intl.NumberFormat('vi-VN').format(Math.round(n)) + ' đ';

export function openPosTerminal({ pickedIds = [], hasValidPrescription = false, onCheckout, onClose }) {
  // Build modal
  const overlay = document.createElement('div');
  overlay.className = 'pos-overlay';
  overlay.innerHTML = `
    <div class="pos-modal">
      <div class="pos-head">
        <div class="pos-title">💳 PHARMA POS v1.0 — ${PHARMACY_INFO.name}</div>
        <button class="pos-close" type="button">✕</button>
      </div>
      <div class="pos-body">
        <div class="pos-left">
          <input class="pos-search" placeholder="Tìm thuốc (brand / generic / hàm lượng)…" />
          <div class="pos-catalog"></div>
        </div>
        <div class="pos-right">
          <div class="pos-rx-warn" hidden>⚠️ Đơn có thuốc kê đơn nhưng chưa xác nhận có đơn hợp lệ.</div>
          <table class="pos-cart">
            <thead><tr><th>#</th><th>Tên thuốc</th><th>SL</th><th>Đơn giá</th><th>CK %</th><th>Thành tiền</th><th></th></tr></thead>
            <tbody></tbody>
          </table>
          <div class="pos-meta">
            <label>Khách: <input data-key="customerName" placeholder="Tên KH"/></label>
            <label>SĐT: <input data-key="customerPhone" placeholder="0xxxxxxxxx"/></label>
            <label>Thu ngân: <input data-key="cashier" value="DS A"/></label>
            <label>Thanh toán:
              <select data-key="payment">
                <option value="cash">Tiền mặt</option>
                <option value="card">Thẻ</option>
                <option value="transfer">Chuyển khoản</option>
              </select>
            </label>
            <label class="rx-toggle"><input type="checkbox" data-key="rx"/> Có đơn hợp lệ</label>
          </div>
          <div class="pos-totals">
            <div>Tạm tính: <b class="sub">0 đ</b></div>
            <div>VAT 8%: <b class="vat">0 đ</b></div>
            <div class="grand">Tổng cộng: <b class="total">0 đ</b></div>
          </div>
          <div class="pos-actions">
            <button class="pos-cancel" type="button">Tạm đóng</button>
            <button class="pos-checkout" type="button">Thanh toán & xuất HD</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // State
  const lines = pickedIds.map(id => {
    const d = getDrug(id);
    return d ? { id, qty: 1, discountPct: 0, mode: 'box' } : null;
  }).filter(Boolean);
  const meta = { customerName: '', customerPhone: '', cashier: 'DS A', payment: 'cash', rx: hasValidPrescription };

  const $ = (sel) => overlay.querySelector(sel);
  const $$ = (sel) => Array.from(overlay.querySelectorAll(sel));

  // Giá theo đơn vị bán: 'box' = nguyên hộp; 'unit' = bán lẻ theo ĐƠN VỊ NHỎ NHẤT
  // (viên/vỉ/ống) = giá bán/đơn vị, hoặc giá hộp ÷ số đơn vị/hộp nếu thiếu.
  function unitPriceFor(l) {
    const d = getDrug(l.id);
    if (l.mode === 'unit')
      return d.retailUnitPrice || (d.unitsPerBox ? Math.round((d.unitPrice || 0) / d.unitsPerBox) : d.unitPrice);
    return d.unitPrice;
  }
  function unitLabelFor(l) {
    const d = getDrug(l.id);
    return l.mode === 'unit' ? (d.unit || 'đơn vị') : 'hộp';
  }
  function lineTotal(l) { return unitPriceFor(l) * l.qty * (1 - l.discountPct / 100); }

  // ── Tồn kho & hạn dùng ──────────────────────────────────────────────
  // Tồn kho đếm theo HỘP. Bán lẻ (mode 'unit') quy đổi viên → số hộp cần lấy.
  const NOW = new Date();
  const DAY = 86400000;
  function parseVNDate(s) {
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(s || '').trim());
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  }
  function boxesNeeded(l) {
    const d = getDrug(l.id);
    return l.mode === 'unit' ? Math.ceil(l.qty / (d.unitsPerBox || 1)) : l.qty;
  }
  function expiryState(d) {
    const exp = parseVNDate(d?.expDate);
    if (!exp) return { state: 'ok', days: null };
    const days = Math.round((exp - NOW) / DAY);
    if (days < 0) return { state: 'expired', days };
    if (days <= 180) return { state: 'near', days };
    return { state: 'ok', days };
  }

  // Lý do chặn thanh toán của lần recompute gần nhất (đọc khi checkout).
  let blockedReasons = [];

  function recompute() {
    let sub = 0;
    blockedReasons = [];
    lines.forEach((l, i) => {
      const d = getDrug(l.id);
      const lt = lineTotal(l);
      sub += lt;
      const row = overlay.querySelector(`tr[data-i="${i}"]`);
      if (!row) return;
      const lnCell = row.querySelector('.ln');
      if (lnCell) lnCell.textContent = VND(lt);
      const msgs = [];
      const ex = expiryState(d);
      if (ex.state === 'expired') { msgs.push(`<span class="ln-bad">⛔ Hết hạn ${d.expDate} — không được bán</span>`); blockedReasons.push(`${d.brand}: đã hết hạn (${d.expDate})`); }
      else if (ex.state === 'near') { msgs.push(`<span class="ln-near">⚠️ Cận hạn (còn ${ex.days} ngày)</span>`); }
      const need = boxesNeeded(l), stock = d.stock ?? 0;
      if (need > stock) { msgs.push(`<span class="ln-bad">⛔ Vượt tồn: cần ${need} hộp · còn ${stock}</span>`); blockedReasons.push(`${d.brand}: vượt tồn kho (cần ${need} hộp, còn ${stock})`); }
      const warn = row.querySelector('.ln-warn');
      if (warn) warn.innerHTML = msgs.join(' ');
    });
    const vat = sub * VAT_RATE;
    const total = sub + vat;
    $('.sub').textContent = VND(sub);
    $('.vat').textContent = VND(vat);
    $('.total').textContent = VND(total);
    const hasRx = lines.some(l => getDrug(l.id)?.isRx);
    $('.pos-rx-warn').hidden = !(hasRx && !meta.rx);
    const btn = $('.pos-checkout');
    btn.disabled = blockedReasons.length > 0;
    btn.title = blockedReasons.length ? ('Không thể thanh toán:\n• ' + blockedReasons.join('\n• ')) : '';
  }
  function renderCart() {
    const tbody = $('.pos-cart tbody');
    tbody.innerHTML = lines.map((l, i) => {
      const d = getDrug(l.id);
      const rxBadge = d.isRx ? '<span class="rx-tag">Rx</span>' : '';
      const abxBadge = d.isAntibiotic ? '<span class="abx-tag">KS</span>' : '';
      const u = unitLabelFor(l);
      const tgLabel = l.mode === 'unit' ? `🔓 Bán lẻ (${u})` : '📦 Nguyên hộp';
      return `<tr data-i="${i}">
        <td>${i + 1}</td>
        <td>${rxBadge}${abxBadge} ${d.brand} <small>${d.strength}</small>
            <button class="mode-tg" type="button" title="Đổi nguyên hộp ↔ bán lẻ theo đơn vị nhỏ nhất">${tgLabel}</button>
            <div class="ln-warn"></div></td>
        <td><input class="qty" type="number" min="1" value="${l.qty}"/> <small>${u}</small></td>
        <td>${VND(unitPriceFor(l))}<small>/${u}</small></td>
        <td><input class="disc" type="number" min="0" max="100" value="${l.discountPct}"/></td>
        <td class="ln">${VND(lineTotal(l))}</td>
        <td><button class="del" type="button">×</button></td>
      </tr>`;
    }).join('') || '<tr><td colspan="7" class="empty">Chưa có thuốc nào. Lấy thuốc từ kệ hoặc tìm trong catalog.</td></tr>';
    tbody.querySelectorAll('.qty').forEach((el, i) => el.addEventListener('input', e => { lines[i].qty = Math.max(1, +e.target.value || 1); recompute(); }));
    tbody.querySelectorAll('.disc').forEach((el, i) => el.addEventListener('input', e => { lines[i].discountPct = Math.max(0, Math.min(100, +e.target.value || 0)); recompute(); }));
    tbody.querySelectorAll('.mode-tg').forEach((el, i) => el.addEventListener('click', () => { lines[i].mode = lines[i].mode === 'unit' ? 'box' : 'unit'; renderCart(); }));
    tbody.querySelectorAll('.del').forEach((el, i) => el.addEventListener('click', () => { lines.splice(i, 1); renderCart(); }));
    recompute();
  }
  function renderCatalog(query = '') {
    const q = query.trim().toLowerCase();
    const list = ALL_DRUGS.filter(d => !q || `${d.brand} ${d.generic} ${d.strength}`.toLowerCase().includes(q)).slice(0, 60);
    $('.pos-catalog').innerHTML = list.map(d => `
      <div class="cat-row" data-id="${d.id}">
        <div class="cat-name">${d.isRx ? '<span class="rx-tag">Rx</span>' : ''} ${d.brand} <small>${d.strength}</small></div>
        <div class="cat-price">${VND(d.unitPrice)}</div>
        <button class="cat-add" type="button" ${lines.some(l => l.id === d.id) ? 'disabled' : ''}>Thêm</button>
      </div>
    `).join('');
    $$('.cat-add').forEach((btn, i) => btn.addEventListener('click', () => {
      const d = list[i];
      if (lines.some(l => l.id === d.id)) return;
      lines.push({ id: d.id, qty: 1, discountPct: 0, mode: 'box' });
      renderCart();
      btn.disabled = true;
    }));
  }

  // Wire events
  $('.pos-close').addEventListener('click', () => close());
  $('.pos-cancel').addEventListener('click', () => close());
  $('.pos-search').addEventListener('input', e => renderCatalog(e.target.value));
  $$('.pos-meta input, .pos-meta select').forEach(el => {
    el.addEventListener('input', e => {
      const k = e.target.dataset.key;
      meta[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      if (k === 'rx') recompute();
    });
  });
  $('.pos-checkout').addEventListener('click', () => {
    if (!lines.length) { alert('Giỏ hàng trống.'); return; }
    recompute();
    if (blockedReasons.length) { alert('Không thể thanh toán:\n• ' + blockedReasons.join('\n• ')); return; }
    const invoiceNo = `HD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`;
    const sub = lines.reduce((s, l) => s + lineTotal(l), 0);
    const vat = sub * VAT_RATE;
    const total = sub + vat;
    const includesAbx = lines.some(l => getDrug(l.id)?.isAntibiotic);
    const rxItemsWithoutPrescription = lines.filter(l => getDrug(l.id)?.isRx && !meta.rx).map(l => l.id);
    const payload = {
      invoiceNo, ts: Date.now(),
      customer: { name: meta.customerName, phone: meta.customerPhone },
      cashier: meta.cashier,
      payment: meta.payment,
      items: lines.map(l => ({ id: l.id, qty: l.qty, boxes: boxesNeeded(l), mode: l.mode, unit: unitLabelFor(l), unitPrice: unitPriceFor(l), discountPct: l.discountPct, lineTotal: lineTotal(l) })),
      sub: Math.round(sub), vat: Math.round(vat), total: Math.round(total),
      includes_abx: includesAbx,
      rxItemsWithoutPrescription
    };
    // Trừ tồn kho (theo hộp) — ALL_DRUGS là tham chiếu chung nên tooltip/inspector cập nhật theo.
    lines.forEach(l => { const d = getDrug(l.id); if (d) d.stock = Math.max(0, (d.stock || 0) - boxesNeeded(l)); });
    onCheckout?.(payload);
    printInvoice(payload);
    close();
  });

  renderCart();
  renderCatalog();

  function close() {
    overlay.remove();
    onClose?.();
  }
}

function printInvoice(p) {
  const w = window.open('', '_blank', 'width=420,height=640');
  if (!w) return;
  const rows = p.items.map(it => {
    const d = getDrug(it.id);
    return `<tr><td>${d.brand}${it.mode === 'unit' ? ' (lẻ)' : ''}</td><td style="text-align:right">${it.qty} ${it.unit || ''}</td><td style="text-align:right">${new Intl.NumberFormat('vi-VN').format(it.lineTotal)}</td></tr>`;
  }).join('');
  w.document.write(`
    <html><head><meta charset="utf-8"><title>${p.invoiceNo}</title>
    <style>body{font-family:'Courier New',monospace;font-size:12px;padding:14px;color:#000}
    h2{text-align:center;margin:6px 0}table{width:100%;border-collapse:collapse}td,th{padding:3px;border-bottom:1px dashed #999}.big{font-size:14px;font-weight:700}</style>
    </head><body>
    <h2>${PHARMACY_INFO.name}</h2>
    <div style="text-align:center;font-size:10px">${PHARMACY_INFO.address} · ĐT: ${PHARMACY_INFO.phone} · MST: ${PHARMACY_INFO.taxCode}</div>
    <hr><div><b>Số HD:</b> ${p.invoiceNo}</div>
    <div>KH: ${p.customer.name || '—'} · ${p.customer.phone || ''}</div>
    <div>Thu ngân: ${p.cashier} · TT: ${p.payment}</div>
    <table><thead><tr><th>Tên</th><th>SL</th><th>Thành tiền</th></tr></thead><tbody>${rows}</tbody></table>
    <div style="margin-top:8px">Tạm tính: ${new Intl.NumberFormat('vi-VN').format(p.sub)} đ</div>
    <div>VAT 8%: ${new Intl.NumberFormat('vi-VN').format(p.vat)} đ</div>
    <div class="big">TỔNG: ${new Intl.NumberFormat('vi-VN').format(p.total)} đ</div>
    ${p.rxItemsWithoutPrescription.length ? '<div style="color:red;margin-top:8px">⚠️ Có thuốc Rx bán không đơn (lỗi nghiệp vụ)</div>' : ''}
    <hr><div style="text-align:center">Cảm ơn quý khách</div>
    <script>window.print()</script></body></html>
  `);
  w.document.close();
}
