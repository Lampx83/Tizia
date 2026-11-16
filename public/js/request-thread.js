// ============================================================
// Request thread — phiên trao đổi của 1 yêu cầu gửi Ban điều hành AI
// ============================================================
// Render luồng hội thoại nhiều lượt cho 1 request: tin mở đầu của HS →
// phản hồi của Ban điều hành AI → HS trao đổi tiếp… tới khi hoàn thành.
// Dùng chung cho request-board (trong space.html) và suggestion-fab
// (nút 🏛️ Đề nghị ở mọi trang). Trao đổi BẤT ĐỒNG BỘ: HS gửi → Ban điều
// hành AI (Routine Claude Opus, ngoài repo) trả lời sau → chuông báo.
//
// Usage:
//   import { renderRequestThread } from './js/request-thread.js';
//   renderRequestThread({ host, requestId, me, onChange });
// ============================================================

const STATUS = {
  pending:   { label: 'Chờ duyệt',    cls: 'pending' },
  reviewing: { label: 'Đang trao đổi', cls: 'reviewing' },
  awaiting_user: { label: '⏳ Chờ bạn bổ sung', cls: 'awaiting' },
  done:      { label: '✓ Hoàn thành',  cls: 'done' },
  rejected:  { label: 'Chưa thực hiện', cls: 'rejected' },
};

const fmtTime = (t) => {
  if (!t) return '';
  const d = Date.now() - t, mm = Math.floor(d / 60_000);
  if (mm < 1) return 'vừa xong';
  if (mm < 60) return `${mm} phút trước`;
  const hh = Math.floor(mm / 60);
  if (hh < 24) return `${hh} giờ trước`;
  const dd = Math.floor(hh / 24);
  if (dd < 30) return `${dd} ngày trước`;
  try { return new Date(t).toLocaleDateString('vi-VN'); } catch { return ''; }
};

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderAtts(atts) {
  const list = Array.isArray(atts) ? atts : [];
  if (!list.length) return '';
  const inner = list.map(a => {
    const isImg = /^image\//.test(a.mime || '');
    if (isImg) {
      return `<a class="rt-att-thumb" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" title="${escapeHtml(a.name)}">
                <img loading="lazy" src="${escapeHtml(a.url)}" alt="${escapeHtml(a.name)}" />
              </a>`;
    }
    const ic = a.kind === 'screenshot' ? '📸' : '📎';
    return `<a class="rt-att-file" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" download="${escapeHtml(a.name)}">${ic} ${escapeHtml(a.name)}</a>`;
  }).join('');
  return `<div class="rt-att">${inner}</div>`;
}

function renderMessage(m, me) {
  const mine = m.role === 'student' && me && m.author_name === me;
  const side = (m.role === 'student') ? 'right' : 'left';
  const isBoard = m.role === 'ai' || m.role === 'admin';
  const who = isBoard
    ? `🏛️ ${escapeHtml(m.author_name || 'Ban điều hành AI')}`
    : `👤 ${escapeHtml(m.author_name || 'Học sinh')}${mine ? ' (bạn)' : ''}`;
  // Giữ xuống dòng của tin nhắn (white-space: pre-wrap qua class).
  return `
    <div class="rt-msg rt-${side} ${isBoard ? 'rt-board' : 'rt-student'}">
      <div class="rt-bubble">
        <div class="rt-who">${who}</div>
        <div class="rt-body">${escapeHtml(m.body)}</div>
        ${renderAtts(m.attachments)}
        <div class="rt-time">${fmtTime(m.created_at)}</div>
      </div>
    </div>
  `;
}

/**
 * Mount thread vào `host`. Tải /thread, hiện hội thoại + ô trả lời (nếu `me` là
 * chủ yêu cầu). `onChange` gọi sau khi HS gửi tin mới (để parent reload list).
 */
export async function renderRequestThread({ host, requestId, me = '', onChange, showTitle = false }) {
  injectStylesOnce();
  host.classList.add('rt-root');
  host.innerHTML = `<div class="rt-loading">Đang tải phiên trao đổi…</div>`;

  let data;
  try {
    const r = await fetch(`/api/requests/${requestId}/thread`);
    if (!r.ok) throw new Error('http ' + r.status);
    data = await r.json();
  } catch {
    host.innerHTML = `<div class="rt-loading">Không tải được phiên trao đổi.</div>`;
    return;
  }

  const req = data.request || {};
  const msgs = Array.isArray(data.messages) ? data.messages : [];
  const sm = STATUS[req.status] || STATUS.pending;
  const isOwner = !!me && me === req.student;
  const closed = req.status === 'done' || req.status === 'rejected';

  host.innerHTML = `
    ${showTitle && req.title ? `<div class="rt-title">#${escapeHtml(req.id)} · ${escapeHtml(req.title)}${req.created_at ? `<small>Gửi ${fmtTime(req.created_at)}</small>` : ''}</div>` : ''}
    <div class="rt-head">
      <span class="rt-status ${sm.cls}">${sm.label}</span>
      <span class="rt-count">${msgs.length} tin nhắn</span>
    </div>
    <div class="rt-list" id="rt-list-${requestId}">
      ${msgs.map(m => renderMessage(m, me)).join('')}
    </div>
    ${isOwner ? `
      <form class="rt-composer" id="rt-form-${requestId}">
        ${closed ? `<div class="rt-reopen-note">Yêu cầu đã đóng — gửi thêm sẽ <b>mở lại</b> để Ban điều hành xem tiếp.</div>` : ''}
        <textarea class="rt-input" id="rt-in-${requestId}" rows="2" maxlength="10000"
          placeholder="Trao đổi tiếp với Ban điều hành AI… (Enter để gửi, Shift+Enter xuống dòng · dán ảnh trực tiếp được)"></textarea>
        <div class="rt-files" id="rt-files-${requestId}"></div>
        <div class="rt-composer-bar">
          <input type="file" id="rt-file-${requestId}" multiple hidden
            accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip">
          <button type="button" class="rt-attach" id="rt-attach-${requestId}" title="Đính kèm ảnh / file (có thể dán ảnh hoặc kéo-thả vào đây)">📎 Đính kèm</button>
          <span class="rt-cmsg" id="rt-msg-${requestId}"></span>
          <button type="submit" class="rt-send" id="rt-send-${requestId}">Gửi 📨</button>
        </div>
      </form>
    ` : (me ? '' : `<div class="rt-login-hint">Đăng nhập để trao đổi với Ban điều hành AI.</div>`)}
  `;

  const listEl = host.querySelector(`#rt-list-${requestId}`);
  if (listEl) listEl.scrollTop = listEl.scrollHeight;

  if (!isOwner) return;

  const form = host.querySelector(`#rt-form-${requestId}`);
  const input = host.querySelector(`#rt-in-${requestId}`);
  const sendBtn = host.querySelector(`#rt-send-${requestId}`);
  const msgEl = host.querySelector(`#rt-msg-${requestId}`);
  const fileIn = host.querySelector(`#rt-file-${requestId}`);
  const filesEl = host.querySelector(`#rt-files-${requestId}`);
  // File đính kèm cho tin trao đổi tiếp (trước đây chỉ gõ chữ được).
  let files = [];
  const paintFiles = () => {
    filesEl.innerHTML = files.map((f, i) => `<span class="rt-file-chip">📎 ${escapeHtml(f.name)} <small>(${Math.max(1, Math.round(f.size / 1024))} KB)</small><button type="button" data-rm="${i}" aria-label="Bỏ file">✕</button></span>`).join('');
  };
  const addFiles = (list) => { files = [...files, ...Array.from(list || [])].slice(0, 5); paintFiles(); };
  host.querySelector(`#rt-attach-${requestId}`).addEventListener('click', () => fileIn.click());
  fileIn.addEventListener('change', () => { addFiles(fileIn.files); fileIn.value = ''; });
  filesEl.addEventListener('click', (e) => { const b = e.target.closest('[data-rm]'); if (b) { files.splice(Number(b.dataset.rm), 1); paintFiles(); } });
  form.addEventListener('dragover', (e) => e.preventDefault());
  form.addEventListener('drop', (e) => { e.preventDefault(); addFiles(e.dataTransfer?.files); });
  form.addEventListener('paste', (e) => {
    const imgs = [];
    for (const it of e.clipboardData?.items || []) {
      if (it.kind === 'file') { const f = it.getAsFile(); if (f) imgs.push(new File([f], `dan-anh-${Date.now()}.${(f.type.split('/')[1] || 'png').replace('jpeg', 'jpg')}`, { type: f.type })); }
    }
    if (imgs.length) { e.preventDefault(); addFiles(imgs); }
  });
  async function uploadFile(f) {
    const r = await fetch('/api/requests/attachments', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': f.type || 'application/octet-stream', 'X-Filename': encodeURIComponent(f.name || 'attachment'), 'X-Kind': 'file' },
      body: f,
    });
    if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e.message || e.error || 'Không tải được file'); }
    return r.json();
  }

  async function submit() {
    const body = input.value.trim() || (files.length ? '📎 Gửi file đính kèm' : '');
    if (!body) { msgEl.textContent = '⚠️ Nhập nội dung trước khi gửi'; return; }
    sendBtn.disabled = true;
    msgEl.textContent = files.length ? 'Đang tải file lên…' : 'Đang gửi…';
    try {
      const attachments = [];
      for (const f of files) attachments.push(await uploadFile(f));
      const r = await fetch(`/api/requests/${requestId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ body, attachments }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        msgEl.textContent = '⚠️ ' + (e.error === 'forbidden' ? 'Chỉ chủ yêu cầu mới trao đổi được'
          : e.error === 'empty' ? 'Nội dung trống' : (e.error || 'Không gửi được'));
        sendBtn.disabled = false;
        return;
      }
      input.value = '';
      msgEl.textContent = '';
      await renderRequestThread({ host, requestId, me, onChange, showTitle });
      if (typeof onChange === 'function') onChange();
    } catch (err) {
      msgEl.textContent = '⚠️ ' + (err?.message && err.message !== 'Failed to fetch' ? err.message : 'Lỗi mạng — thử lại sau.');
      sendBtn.disabled = false;
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); submit(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
  });
}

let stylesInjected = false;
function injectStylesOnce() {
  if (stylesInjected) return;
  stylesInjected = true;
  // Màu bong bóng chọn rõ trên cả nền sáng (FAB) lẫn nền tối (board).
  const css = `
    .rt-root { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
    .rt-loading { opacity: .65; font-size: 12.5px; font-style: italic; padding: 10px; text-align: center; }
    .rt-head { display: flex; align-items: center; gap: 8px; }
    .rt-status { font-size: 11px; padding: 2px 8px; border-radius: 7px; font-weight: 700; }
    .rt-status.pending   { background: #e2e8f0; color: #475569; }
    .rt-status.reviewing { background: #fde68a; color: #92400e; }
    .rt-status.awaiting  { background: #bfdbfe; color: #1e40af; }
    .rt-status.done      { background: #bbf7d0; color: #065f46; }
    .rt-status.rejected  { background: #fecaca; color: #991b1b; }
    .rt-count { font-size: 11px; opacity: .6; }
    .rt-title { font-size: 15px; font-weight: 800; line-height: 1.35; }
    .rt-title small { display: block; font-size: 11.5px; font-weight: 500; opacity: .6; margin-top: 2px; }
    .rt-list { display: flex; flex-direction: column; gap: 8px; padding: 2px; }
    .rt-msg { display: flex; }
    .rt-msg.rt-right { justify-content: flex-end; }
    .rt-msg.rt-left  { justify-content: flex-start; }
    .rt-bubble { max-width: 82%; border-radius: 12px; padding: 8px 11px; line-height: 1.45; }
    .rt-student .rt-bubble { background: #6366f1; color: #fff; border-bottom-right-radius: 4px; }
    .rt-board   .rt-bubble { background: #f1f5f9; color: #1f2937; border-bottom-left-radius: 4px; border: 1px solid #e2e8f0; }
    .rt-who { font-size: 11px; font-weight: 800; opacity: .85; margin-bottom: 3px; }
    .rt-body { font-size: 13px; white-space: pre-wrap; word-break: break-word; }
    .rt-time { font-size: 10px; opacity: .6; margin-top: 4px; text-align: right; }
    .rt-att { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .rt-att-thumb { display: inline-block; border-radius: 6px; overflow: hidden; line-height: 0; border: 1px solid rgba(0,0,0,.12); }
    .rt-att-thumb img { display: block; max-width: 110px; max-height: 84px; object-fit: cover; }
    .rt-att-file { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; text-decoration: none;
      color: inherit; background: rgba(0,0,0,.08); padding: 3px 8px; border-radius: 6px; }
    .rt-student .rt-att-file { background: rgba(255,255,255,.2); color: #fff; }
    .rt-composer { display: flex; flex-direction: column; gap: 6px; }
    .rt-reopen-note { font-size: 11.5px; opacity: .8; background: rgba(245,158,11,.12);
      border-left: 3px solid #f59e0b; padding: 5px 9px; border-radius: 7px; }
    .rt-reopen-note b { font-weight: 800; }
    .rt-input { width: 100%; box-sizing: border-box; padding: 8px 10px; border-radius: 9px;
      border: 1px solid #cbd5e1; background: #fff; color: #1f2937; font: inherit; resize: vertical; min-height: 42px; }
    .rt-input:focus { outline: 2px solid #c7d2fe; border-color: #6366f1; }
    .rt-composer-bar { display: flex; align-items: center; gap: 10px; }
    .rt-cmsg { font-size: 11.5px; opacity: .85; margin-right: auto; }
    .rt-attach { padding: 6px 11px; border: 1px solid #c7d2fe; border-radius: 9px; background: #eef2ff; color: #3730a3; font: 700 12.5px/1 inherit; cursor: pointer; white-space: nowrap; }
    .rt-files { display: flex; flex-wrap: wrap; gap: 6px; }
    .rt-files:empty { display: none; }
    .rt-file-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; background: #f1f5f9; color: #1f2937; border: 1px solid #e2e8f0; border-radius: 8px; padding: 3px 4px 3px 8px; }
    .rt-file-chip small { opacity: .6; }
    .rt-file-chip button { border: 0; background: rgba(0,0,0,.08); border-radius: 6px; width: 20px; height: 20px; cursor: pointer; font-size: 11px; }
    .rt-send { padding: 7px 15px; border: 0; border-radius: 9px; cursor: pointer; font: 700 13px/1 inherit;
      background: linear-gradient(135deg,#fbbf24,#f97316); color: #1f1147; }
    .rt-send:hover { filter: brightness(1.06); }
    .rt-send:disabled { opacity: .55; cursor: wait; }
    .rt-login-hint { font-size: 11.5px; opacity: .7; font-style: italic; padding: 4px 2px; }
  `;
  const st = document.createElement('style');
  st.setAttribute('data-injected', 'request-thread');
  st.textContent = css;
  document.head.appendChild(st);
}
