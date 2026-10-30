// askConfirm: hộp xác nhận trong trang (confirm() native bị chặn ở trình duyệt nhúng).
// <dialog> modal: Esc đóng, Tab nhốt trong hộp, focus trả về nút đã mở.
const CSS = `
.cd-dlg { max-width:min(460px,92vw); padding:18px 20px; border-radius:12px; border:1px solid var(--border-strong,rgba(255,255,255,.2));
  background:var(--bg2,#111a2e); color:var(--txt,#e2e8f0); font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
.cd-dlg::backdrop { background:rgba(0,0,0,.6); }
.cd-dlg h2 { margin:0 0 8px; font-size:16px; }
.cd-dlg ul { margin:6px 0 4px; padding-left:18px; max-height:40vh; overflow:auto; } .cd-dlg li { margin:3px 0; }
.cd-dlg p { margin:6px 0; color:var(--muted,#94a3b8); }
.cd-dlg .cd-row { display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; margin-top:16px; }
.cd-dlg button { min-height:44px; padding:10px 14px; border-radius:8px; border:1px solid var(--border,rgba(255,255,255,.1));
  background:var(--bg3,#16213d); color:inherit; font:inherit; font-size:13px; cursor:pointer; }
.cd-dlg button:hover { filter:brightness(1.15); }
.cd-dlg button:focus-visible { outline:2px solid var(--accent2,#60a5fa); outline-offset:2px; }
.cd-dlg .cd-ok { background:var(--ok,#22c55e); border-color:var(--ok,#22c55e); color:#04210f; font-weight:700; }
.cd-dlg .cd-ok.cd-danger { background:#b91c1c; border-color:#b91c1c; color:#fff; }
`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Hỏi xác nhận. lines: chuỗi thuần (tự escape). Trả true khi bấm ok; Esc/Thôi → false. Focus mở ở nút huỷ. */
export function askConfirm({ title, message = '', lines = [], ok, cancel = 'Thôi', danger = false }) {
  if (!document.getElementById('cd-style')) {
    const st = document.createElement('style'); st.id = 'cd-style'; st.textContent = CSS; document.head.append(st);
  }
  return new Promise((resolve) => {
    const dlg = document.createElement('dialog');
    dlg.className = 'cd-dlg';
    dlg.setAttribute('role', 'alertdialog');
    dlg.setAttribute('aria-labelledby', 'cd-title');
    dlg.innerHTML = `<h2 id="cd-title">${esc(title)}</h2>${message ? `<p>${esc(message)}</p>` : ''}
      ${lines.length ? `<ul>${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}
      <div class="cd-row"><button type="button" data-cd="no" autofocus>${esc(cancel)}</button>
      <button type="button" data-cd="yes" class="cd-ok${danger ? ' cd-danger' : ''}">${esc(ok)}</button></div>`;
    dlg.addEventListener('click', (e) => { const b = e.target.closest('[data-cd]'); if (b) dlg.close(b.dataset.cd); });
    dlg.addEventListener('close', () => { dlg.remove(); resolve(dlg.returnValue === 'yes'); });
    document.body.append(dlg);
    dlg.showModal();
    dlg.querySelector('[data-cd="no"]').focus();
  });
}
