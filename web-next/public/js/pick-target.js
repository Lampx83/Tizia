// =====================================================================
// CHỌN ĐỐI TƯỢNG TRÊN TRANG — dùng cho form gửi yêu cầu tới Ban điều hành AI.
//
// Vì sao có file này: trước đây người gửi phải TẢ BẰNG LỜI phần cần sửa
// ("xoá phần này", "sửa tên mục kia") nên Ban điều hành hay phải đoán, dễ sửa
// nhầm chỗ. Nay bấm "Chọn đối tượng" rồi trỏ thẳng vào phần đó trên trang.
//
// Dùng chung cho CẢ HAI bản giao diện (React web-next và vanilla legacy) nên
// viết thuần DOM, không phụ thuộc framework: pickTarget() trả Promise.
// =====================================================================

/** Rút gọn chuỗi cho gọn khi hiển thị/ghi vào yêu cầu. */
function short(s, max = 70) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1) + '…' : t;
}

/** Nhãn dễ hiểu cho một phần tử — ưu tiên thứ NGƯỜI DÙNG nhìn thấy. */
function describe(el) {
  if (!el || el === document.body) return { label: 'Toàn trang', kind: 'trang' };
  const tag = el.tagName.toLowerCase();
  const kindMap = {
    button: 'nút', a: 'liên kết', input: 'ô nhập', select: 'ô chọn', textarea: 'ô nhập',
    img: 'ảnh', h1: 'tiêu đề', h2: 'tiêu đề', h3: 'tiêu đề', h4: 'tiêu đề',
    li: 'mục danh sách', td: 'ô bảng', th: 'ô bảng', table: 'bảng',
  };
  const kind = kindMap[tag] || (el.className && /card|room|tile|item|box/i.test(el.className) ? 'thẻ' : 'khối');
  const label =
    short(el.getAttribute('aria-label')) ||
    short(el.getAttribute('title')) ||
    short(el.getAttribute('alt')) ||
    short(el.getAttribute('placeholder')) ||
    short(el.innerText || el.textContent) ||
    short(el.getAttribute('href')) || '(không có chữ)';
  return { label, kind };
}

/** Đường dẫn CSS ngắn — để Ban điều hành tìm lại đúng phần tử trong mã nguồn. */
function cssPath(el) {
  const parts = [];
  let cur = el;
  for (let i = 0; cur && cur.nodeType === 1 && i < 4 && cur !== document.body; i++) {
    let p = cur.tagName.toLowerCase();
    if (cur.id) { parts.unshift(p + '#' + cur.id); break; }
    const cls = (cur.className && typeof cur.className === 'string')
      ? cur.className.trim().split(/\s+/).filter(c => !/^(is|has)-/.test(c)).slice(0, 2).join('.')
      : '';
    if (cls) p += '.' + cls;
    parts.unshift(p);
    cur = cur.parentElement;
  }
  return parts.join(' > ');
}

/** Bỏ qua chính widget gửi yêu cầu và lớp phủ của bộ chọn. */
function isOwnUi(el) {
  return !!(el.closest && (el.closest('#sgf-root') || el.closest('.ptk-layer') || el.closest('.ptk-bar')));
}

/** Leo lên cha gần nhất có nội dung có nghĩa — tránh chọn trúng thẻ rỗng lồng sâu. */
function meaningful(el) {
  let cur = el;
  for (let i = 0; cur && cur !== document.body && i < 4; i++) {
    const txt = (cur.innerText || '').trim();
    const r = cur.getBoundingClientRect();
    if ((txt.length >= 2 || cur.tagName === 'IMG') && r.width >= 24 && r.height >= 14) return cur;
    cur = cur.parentElement;
  }
  return el;
}

/**
 * Bật chế độ chọn. Trả Promise:
 *   { label, kind, path, rect }  khi người dùng bấm chọn
 *   null                          khi bấm Esc / bấm Huỷ
 */
export function pickTarget() {
  return new Promise((resolve) => {
    const style = document.createElement('style');
    style.textContent = `
      .ptk-layer{position:fixed;inset:0;z-index:2147483000;cursor:crosshair;background:rgba(15,23,42,.06)}
      .ptk-box{position:fixed;z-index:2147483001;pointer-events:none;border:2.5px solid #7c3aed;
        border-radius:8px;background:rgba(124,58,237,.14);box-shadow:0 0 0 9999px rgba(15,23,42,.28);
        transition:all .06s linear}
      .ptk-tag{position:fixed;z-index:2147483002;pointer-events:none;max-width:340px;
        background:#7c3aed;color:#fff;font:700 12px/1.35 system-ui,sans-serif;
        padding:5px 9px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
      .ptk-tag i{display:block;font-style:normal;font-weight:600;opacity:.85;font-size:11px}
      .ptk-bar{position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:2147483003;
        background:#111827;color:#e5e7eb;border:1px solid #374151;border-radius:12px;
        padding:9px 14px;font:600 13px system-ui,sans-serif;display:flex;gap:12px;align-items:center;
        box-shadow:0 10px 30px rgba(0,0,0,.45)}
      .ptk-bar b{color:#c4b5fd}
      .ptk-bar button{cursor:pointer;font:inherit;font-size:12px;color:#e5e7eb;background:#374151;
        border:0;border-radius:8px;padding:5px 11px}
      .ptk-bar button:hover{background:#4b5563}
    `;
    const layer = document.createElement('div'); layer.className = 'ptk-layer';
    const box = document.createElement('div'); box.className = 'ptk-box'; box.style.display = 'none';
    const tag = document.createElement('div'); tag.className = 'ptk-tag'; tag.style.display = 'none';
    const bar = document.createElement('div'); bar.className = 'ptk-bar';
    bar.innerHTML = '<span>🎯 Di chuột tới phần cần sửa rồi <b>bấm để chọn</b></span><button type="button">Huỷ (Esc)</button>';

    let hovered = null;
    const cleanup = () => {
      [style, layer, box, tag, bar].forEach((n) => n.remove());
      document.removeEventListener('keydown', onKey, true);
    };
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); cleanup(); resolve(null); } };

    layer.addEventListener('mousemove', (e) => {
      layer.style.pointerEvents = 'none';
      let el = document.elementFromPoint(e.clientX, e.clientY);
      layer.style.pointerEvents = '';
      if (!el || isOwnUi(el)) { box.style.display = 'none'; tag.style.display = 'none'; hovered = null; return; }
      el = meaningful(el);
      hovered = el;
      const r = el.getBoundingClientRect();
      Object.assign(box.style, { display: 'block', left: r.left + 'px', top: r.top + 'px',
        width: r.width + 'px', height: r.height + 'px' });
      const d = describe(el);
      tag.innerHTML = `${d.label}<i>${d.kind}</i>`;
      tag.style.display = 'block';
      const ty = r.top > 46 ? r.top - 40 : r.bottom + 8;
      Object.assign(tag.style, { left: Math.max(6, Math.min(r.left, innerWidth - 350)) + 'px', top: ty + 'px' });
    });

    layer.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (!hovered) return;
      const d = describe(hovered);
      const r = hovered.getBoundingClientRect();
      cleanup();
      resolve({ label: d.label, kind: d.kind, path: cssPath(hovered),
        rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } });
    }, true);

    bar.querySelector('button').addEventListener('click', () => { cleanup(); resolve(null); });
    document.addEventListener('keydown', onKey, true);
    document.head.appendChild(style);
    document.body.append(layer, box, tag, bar);
  });
}

/** Một dòng mô tả gọn để ghim vào nội dung yêu cầu. */
export function targetLine(t) {
  if (!t) return '';
  return `[Đối tượng: ${t.kind} "${t.label}" · vị trí ${t.path}]`;
}
