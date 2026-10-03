// ============================================================
// Request thread — phiên trao đổi của 1 yêu cầu gửi Ban điều hành AI
// ============================================================
// Render luồng hội thoại nhiều lượt cho 1 request: tin mở đầu của HS →
// phản hồi của Ban điều hành AI → HS trao đổi tiếp… tới khi hoàn thành.
// Dùng chung cho request-board (trong space.html) và suggestion-fab
// (nút Đề nghị ở mọi trang). Trao đổi BẤT ĐỒNG BỘ: HS gửi → Ban điều
// hành AI (Routine Claude Opus, ngoài repo) trả lời sau → chuông báo.
//
// Usage:
//   import { renderRequestThread } from './js/request-thread.js';
//   renderRequestThread({ host, requestId, me, onChange });
// ============================================================

const STATUS = {
  pending:   { label: 'Chờ duyệt',    cls: 'pending' },
  reviewing: { label: 'Đang trao đổi', cls: 'reviewing' },
  done:      { label: 'Hoàn thành',  cls: 'done' },
  rejected:  { label: 'Chưa thực hiện', cls: 'rejected' },
  cancelled: { label: 'Đã dừng', cls: 'rejected' },
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
    return `<a class="rt-att-file" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" download="${escapeHtml(a.name)}">${escapeHtml(a.name)}</a>`;
  }).join('');
  return `<div class="rt-att">${inner}</div>`;
}

function renderMessage(m, me) {
  const mine = m.role === 'student' && me && m.author_name === me;
  const side = (m.role === 'student') ? 'right' : 'left';
  const isBoard = m.role === 'ai' || m.role === 'admin';
  const who = isBoard
    ? `${escapeHtml(m.author_name || 'Ban điều hành AI')}`
    : `${escapeHtml(m.author_name || 'Học sinh')}${mine ? ' (bạn)' : ''}`;
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
export async function renderRequestThread({ host, requestId, me = '', onChange }) {
  injectStylesOnce();
  host.classList.add('rt-root');
  host.innerHTML = `<div class="rt-loading">Đang tải phiên trao đổi…</div>`;

  let data;
  try {
    const r = await fetch(`api/requests/${requestId}/thread`);
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
  const closed = ['done', 'rejected', 'cancelled'].includes(req.status);

  host.innerHTML = `
    <div class="rt-head">
      <span class="rt-status ${sm.cls}">${escapeHtml(req.status_label || sm.label)}</span>
      <span class="rt-count">${msgs.length} tin nhắn</span>
    </div>
    <div class="rt-list" id="rt-list-${requestId}">
      ${msgs.map(m => renderMessage(m, me)).join('')}
    </div>
    ${isOwner ? `
      <form class="rt-composer" id="rt-form-${requestId}">
        ${closed ? `<div class="rt-reopen-note">Yêu cầu đã đóng — gửi thêm sẽ <b>mở lại</b> để Ban điều hành xem tiếp.</div>` : ''}
        <textarea class="rt-input" id="rt-in-${requestId}" rows="2" maxlength="10000"
          placeholder="Trao đổi tiếp với Ban điều hành AI… (Enter để gửi, Shift+Enter xuống dòng)"></textarea>
        <div class="rt-composer-bar">
          <span class="rt-cmsg" id="rt-msg-${requestId}"></span>
          <button type="submit" class="rt-send" id="rt-send-${requestId}">Gửi</button>
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

  async function submit() {
    const body = input.value.trim();
    if (!body) { msgEl.textContent = 'Nhập nội dung trước khi gửi'; return; }
    sendBtn.disabled = true;
    msgEl.textContent = 'Đang gửi…';
    try {
      const r = await fetch(`api/requests/${requestId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ body }),
      });
      if (!r.ok) {
        const e = await r.json().catch(() => ({}));
        msgEl.textContent = '' + (e.error === 'unsupported_language' ? e.message
          : e.error === 'forbidden' ? 'Chỉ chủ yêu cầu mới trao đổi được'
          : e.error === 'empty' ? 'Nội dung trống' : (e.error || 'Không gửi được'));
        sendBtn.disabled = false;
        return;
      }
      input.value = '';
      msgEl.textContent = '';
      await renderRequestThread({ host, requestId, me, onChange });
      if (typeof onChange === 'function') onChange();
    } catch {
      msgEl.textContent = 'Lỗi mạng — thử lại sau.';
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
    .rt-status.done      { background: #bbf7d0; color: #065f46; }
    .rt-status.rejected  { background: #fecaca; color: #991b1b; }
    .rt-count { font-size: 11px; opacity: .6; }
    .rt-list { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; padding: 2px; }
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
