// ============================================================
// Request board — "Ban điều hành AI" của mỗi trường
// ============================================================
// SV gửi yêu cầu (thêm trò chơi / lý thuyết / cải thiện lab / kỹ năng)
// → lưu DB qua /api/requests. Ban điều hành (AI = Claude) xem xét &
// cải tiến hàng ngày, cập nhật status.
//
// Usage:
//   import { renderRequestBoard } from './js/request-board.js';
//   renderRequestBoard({ host, domain: 'pharmacy', domainName: 'Trường Dược', getStudent });
// ============================================================

import { getPlayerName } from './api.js';
import { renderRequestThread } from './request-thread.js';
import { boardIcon } from './ai-board-icons.js';

const TYPE_META = {
  game:   { icon: '🎮', label: 'Thêm trò chơi' },
  theory: { icon: '📖', label: 'Thêm lý thuyết' },
  lab:    { icon: '🧪', label: 'Cải thiện phòng thí nghiệm / thực hành' },
  skill:  { icon: '🎯', label: 'Luyện kỹ năng' },
  other:  { icon: '💡', label: 'Ý kiến khác' },
};
const STATUS_META = {
  pending:   { label: 'Chờ duyệt',   cls: 'pending' },
  reviewing: { label: 'Đang làm',    cls: 'reviewing' },
  done:      { label: '✓ Hoàn thành', cls: 'done' },
  rejected:  { label: 'Từ chối',     cls: 'rejected' },
};

export async function renderRequestBoard({ host, domain, domainName }) {
  injectStylesOnce();

  host.innerHTML = `
    <div class="rb-card">
      <div class="rb-head">
        <div class="rb-icon">${boardIcon('board')}</div>
        <div>
          <h3 class="rb-title">Ban điều hành AI · ${escapeHtml(domainName)}</h3>
          <p class="rb-sub">Trường do <b>AI điều hành</b> — cung cấp học liệu, môi trường học tập và
             <b>liên tục tự cải tiến</b> theo yêu cầu của bạn. Đề xuất thêm trò chơi, học liệu lý thuyết,
             cải thiện phòng thí nghiệm… Hiệu trưởng AI sẽ phản hồi & đưa vào hàng đợi nâng cấp.</p>
        </div>
      </div>

      <form class="rb-form" id="rb-form">
        <div class="rb-row">
          <label class="rb-field rb-type-field" for="rb-type">Loại yêu cầu
            <select id="rb-type" class="rb-input rb-type">
              ${Object.entries(TYPE_META).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
            </select>
          </label>
          <label class="rb-field rb-title-field" for="rb-title">Tiêu đề yêu cầu
            <input id="rb-title" class="rb-input rb-titlein" maxlength="200" required minlength="4"
                   placeholder="VD: Thêm game ghép cặp tương tác thuốc" aria-describedby="rb-msg" />
          </label>
        </div>
        <label class="rb-field" for="rb-detail">Mô tả chi tiết (tuỳ chọn)
          <textarea id="rb-detail" class="rb-input rb-detail" maxlength="10000" rows="3"
                    placeholder="Mô tả điều bạn muốn thay đổi và kết quả mong đợi."></textarea>
        </label>
        <div class="rb-actions">
          <span class="rb-msg" id="rb-msg" role="status" aria-live="polite"></span>
          <button type="submit" class="rb-submit" id="rb-submit">${boardIcon('send')} Gửi cho Ban điều hành</button>
        </div>
      </form>

      <div class="rb-stats" id="rb-stats"></div>
      <div class="rb-list" id="rb-list" aria-busy="true"><div class="rb-empty" role="status">Đang tải yêu cầu…</div></div>
    </div>
  `;

  const form = host.querySelector('#rb-form');
  const msg = host.querySelector('#rb-msg');
  let pendingRequestKey = null;
  let submitting = false;

  async function load() {
    try {
      const r = await fetch(`api/requests?domain=${encodeURIComponent(domain)}`);
      if (!r.ok) throw new Error('http ' + r.status);
      const data = await r.json();
      renderStats(host.querySelector('#rb-stats'), data.stats || {});
      renderList(host.querySelector('#rb-list'), data.items || [], load);
    } catch {
      const list = host.querySelector('#rb-list');
      list.innerHTML = '<div class="rb-empty" role="status">Không tải được yêu cầu. <button type="button" class="rb-thread-toggle" data-reload>Thử tải lại</button></div>';
      list.querySelector('[data-reload]').addEventListener('click', load);
    } finally {
      host.querySelector('#rb-list').setAttribute('aria-busy', 'false');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitting) return;
    const type = host.querySelector('#rb-type').value;
    const title = host.querySelector('#rb-title').value.trim();
    const detail = host.querySelector('#rb-detail').value.trim();
    if (title.length < 4) { msg.textContent = '⚠️ Tiêu đề quá ngắn'; return; }
    submitting = true;
    const submit = host.querySelector('#rb-submit');
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    msg.textContent = 'Đang gửi…';
    try {
      pendingRequestKey ||= crypto.randomUUID();
      const r = await fetch('api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': pendingRequestKey },
        body: JSON.stringify({ domain, type, title, detail, student: getPlayerName() || 'Ẩn danh' }),
      });
      if (!r.ok) { const e2 = await r.json().catch(() => ({})); msg.textContent = '⚠️ ' + (e2.error || 'Lỗi gửi'); return; }
      msg.textContent = '✓ Đã gửi! Hiệu trưởng AI đang xem xét…';
      pendingRequestKey = null;
      host.querySelector('#rb-title').value = '';
      host.querySelector('#rb-detail').value = '';
      load();
      // AI phản hồi ở nền — reload lại để hiện lời phê duyệt khi sẵn sàng
      setTimeout(load, 2500);
      setTimeout(() => { load(); msg.textContent = ''; }, 8000);
    } catch {
      msg.textContent = '⚠️ Lỗi mạng';
    } finally {
      submitting = false;
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });

  await load();
}

function renderStats(host, stats) {
  const total = (stats.pending || 0) + (stats.reviewing || 0) + (stats.done || 0) + (stats.rejected || 0);
  host.innerHTML = `
    <span class="rb-stat">${stats.pending || 0} chờ duyệt</span>
    <span class="rb-stat">${stats.reviewing || 0} đang làm</span>
    <span class="rb-stat done">✓ ${stats.done || 0} hoàn thành</span>
    <span class="rb-stat total">${total} tổng yêu cầu</span>
  `;
}

function renderList(host, items, reload) {
  if (!items.length) {
    host.innerHTML = '<div class="rb-empty">Chưa có yêu cầu nào. Hãy là người đầu tiên đề xuất cải tiến trường! 🚀</div>';
    return;
  }
  const me = getPlayerName() || '';
  host.innerHTML = items.map(it => {
    const tm = TYPE_META[it.type] || TYPE_META.other;
    const sm = STATUS_META[it.status] || STATUS_META.pending;
    const mine = me && it.student === me;
    return `
      <div class="rb-item">
        <button type="button" class="rb-vote" data-vote="${it.id}" aria-label="Ủng hộ: ${escapeHtml(it.title)} (${it.votes} lượt)" title="Ủng hộ yêu cầu này">
          ${boardIcon('up')}
          <span class="rb-vote-n">${it.votes}</span>
        </button>
        <div class="rb-item-body">
          <div class="rb-item-title">${boardIcon(it.type)} <span>${escapeHtml(it.title)}</span></div>
          ${it.detail ? `<div class="rb-item-detail">${escapeHtml(it.detail)}</div>` : ''}
          ${renderAtts(it.attachments)}
          ${it.admin_note ? `<div class="rb-item-note"><b>Ban điều hành:</b> ${escapeHtml(it.admin_note)}</div>` : ''}
          <div class="rb-item-meta">
            <span class="rb-status ${sm.cls}">${sm.label}</span>
            <span class="rb-by">${escapeHtml(it.student)}</span>
            <button type="button" class="rb-thread-toggle" data-thread="${it.id}" aria-expanded="false" aria-controls="rb-thread-${it.id}">
              ${boardIcon('chat')} ${mine ? 'Trao đổi với Ban điều hành' : 'Xem trao đổi'}
            </button>
          </div>
          <div class="rb-thread" id="rb-thread-${it.id}" hidden></div>
        </div>
      </div>
    `;
  }).join('');

  host.querySelectorAll('[data-vote]').forEach(el => {
    el.addEventListener('click', async () => {
      el.disabled = true;
      try {
        const r = await fetch(`api/requests/${el.dataset.vote}/vote`, { method: 'POST' });
        if (!r.ok) throw new Error('http ' + r.status);
        await reload();
      } catch {
        el.disabled = false;
        const msg = host.closest('.rb-card')?.querySelector('#rb-msg');
        if (msg) msg.textContent = 'Không gửi được lượt ủng hộ. Bạn có thể thử lại.';
      }
    });
  });

  host.querySelectorAll('[data-thread]').forEach(btn => {
    btn.addEventListener('click', () => toggleThread(host, btn.dataset.thread, me, reload));
  });

  // Tự mở thread khi điều hướng tới #req-<id> (vd từ chuông / FAB).
  try {
    const m = /#req-(\d+)/.exec(location.hash || '');
    if (m) {
      const id = m[1];
      const btn = host.querySelector(`[data-thread="${id}"]`);
      if (btn) { openThread(host, id, me, reload); btn.closest('.rb-item')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    }
  } catch {}
}

function openThread(host, id, me, reload) {
  const panel = host.querySelector(`#rb-thread-${id}`);
  if (!panel || !panel.hidden) return;
  panel.hidden = false;
  host.querySelector(`[data-thread="${id}"]`)?.setAttribute('aria-expanded', 'true');
  renderRequestThread({ host: panel, requestId: id, me, onChange: reload });
}
function toggleThread(host, id, me, reload) {
  const panel = host.querySelector(`#rb-thread-${id}`);
  if (!panel) return;
  if (panel.hidden) openThread(host, id, me, reload);
  else { panel.hidden = true; panel.innerHTML = ''; host.querySelector(`[data-thread="${id}"]`)?.setAttribute('aria-expanded', 'false'); }
}

// Render đính kèm (ảnh thumbnail + link file) — chỉ hiển thị, board không tự
// upload. URL do BE cấp; mở tab mới với rel=noopener. Khớp giao diện FAB Đề nghị.
function renderAtts(atts) {
  const list = Array.isArray(atts) ? atts : [];
  if (!list.length) return '';
  const inner = list.map(a => {
    const isImg = /^image\//.test(a.mime || '');
    if (isImg) {
      return `<a class="rb-att-thumb" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" title="${escapeHtml(a.name)}">
                <img loading="lazy" src="${escapeHtml(a.url)}" alt="${escapeHtml(a.name)}" />
              </a>`;
    }
    const ic = a.kind === 'screenshot' ? '📸' : '📎';
    return `<a class="rb-att-file" href="${escapeHtml(a.url)}" target="_blank" rel="noopener" download="${escapeHtml(a.name)}">${ic} ${escapeHtml(a.name)}</a>`;
  }).join('');
  return `<div class="rb-att">${inner}</div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let stylesInjected = false;
function injectStylesOnce() {
  if (stylesInjected) return;
  stylesInjected = true;
  const css = `
    .rb-card {
      --rb-text: #e2e8f0; --rb-muted: #b8c5d8; --rb-line: #334155; --rb-accent: #fbbf24;
      background: #111a2e; border: 1px solid var(--rb-line); color: var(--rb-text);
      border-radius: 16px; padding: 24px; font-size: 14px; line-height: 1.6;
    }
    .rb-card, .rb-card * { box-sizing: border-box; }
    .rb-card ::selection { background: #fbbf24; color: #111a2e; }
    .rb-card .ai-board-icon { flex-shrink: 0; vertical-align: middle; }
    .rb-card :is(button, input, select, textarea, a):focus-visible { outline: 3px solid #a5b4fc; outline-offset: 3px; }
    .rb-card button:disabled { opacity: .65; cursor: wait; }
    .rb-head { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 24px; }
    .rb-icon { color: var(--rb-accent); padding-top: 3px; }
    .rb-icon svg { width: 28px; height: 28px; }
    .rb-title { margin: 0 0 8px; font-size: 20px; font-weight: 750; color: #f8fafc; line-height: 1.35; }
    .rb-sub { margin: 0; font-size: 14px; color: var(--rb-muted); line-height: 1.6; max-width: 72ch; }
    .rb-form { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .rb-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .rb-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; font-size: 13px; font-weight: 600; }
    .rb-type-field { flex: 0 1 280px; }
    .rb-title-field { flex: 1 1 240px; }
    .rb-input {
      width: 100%; min-height: 44px; padding: 11px 12px; border-radius: 8px; border: 1px solid #64748b;
      background: #0b1220; color: #f8fafc; font: inherit; font-size: 14px; font-weight: 400; caret-color: var(--rb-accent);
    }
    .rb-input::placeholder { color: #b8c5d8; opacity: 1; }
    .rb-detail { width: 100%; resize: vertical; }
    .rb-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; justify-content: flex-end; }
    .rb-msg { font-size: 13px; color: var(--rb-muted); margin-right: auto; }
    .rb-submit {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px;
      padding: 11px 18px; border: none; border-radius: 8px; cursor: pointer;
      background: var(--rb-accent); color: #1f1147; font-family: inherit; font-size: 14px; font-weight: 700; line-height: 1.4;
    }
    .rb-submit:hover { background: #fcd34d; }
    .rb-stats { display: flex; gap: 8px 16px; flex-wrap: wrap; padding: 16px 0; border-top: 1px solid var(--rb-line); font-size: 13px; font-variant-numeric: tabular-nums; }
    .rb-stat { color: var(--rb-muted); }
    .rb-stat.done { color: #6ee7b7; }
    .rb-stat.total { margin-left: auto; }
    .rb-list { display: flex; flex-direction: column; }
    .rb-empty { color: var(--rb-muted); font-size: 14px; padding: 24px 0; text-align: center; }
    .rb-item {
      display: flex; gap: 12px; align-items: flex-start;
      border-top: 1px solid var(--rb-line); padding: 20px 0;
    }
    .rb-vote {
      display: flex; flex-direction: column; align-items: center; cursor: pointer;
      min-width: 44px; min-height: 52px; padding: 6px; border: 1px solid var(--rb-line); border-radius: 8px;
      background: transparent; color: var(--rb-text); font: inherit; transition: background 0.15s;
    }
    .rb-vote:hover { background: rgba(251,191,36,0.25); }
    .rb-vote-n { font-weight: 800; font-size: 15px; color: #fbbf24; }
    .rb-item-body { flex: 1; min-width: 0; }
    .rb-item-title { display: flex; gap: 8px; align-items: flex-start; font-size: 16px; font-weight: 650; color: #f8fafc; overflow-wrap: anywhere; }
    .rb-item-title svg { margin-top: 3px; color: var(--rb-muted); }
    .rb-item-detail { font-size: 14px; color: var(--rb-muted); margin-top: 6px; line-height: 1.6; overflow-wrap: anywhere; }
    .rb-item-note { font-size: 13px; margin-top: 12px; padding: 10px 12px; border-radius: 8px; background: #282419; color: #fde68a; overflow-wrap: anywhere; }
    .rb-att { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
    .rb-att-thumb { display: inline-block; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.18); line-height: 0; }
    .rb-att-thumb img { display: block; max-width: 120px; max-height: 90px; object-fit: cover; }
    .rb-att-file { display: inline-flex; align-items: center; gap: 4px; font-size: 11.5px; color: #fde68a;
      background: rgba(251,191,36,0.12); padding: 3px 8px; border-radius: 6px; text-decoration: none; border: 1px solid rgba(251,191,36,0.25); }
    .rb-att-file:hover { background: rgba(251,191,36,0.22); }
    .rb-item-meta { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; margin-top: 12px; font-size: 12px; }
    .rb-status { padding: 3px 8px; border-radius: 6px; font-weight: 600; white-space: nowrap; }
    .rb-status.pending   { background: rgba(148,163,184,0.25); }
    .rb-status.reviewing { background: rgba(251,191,36,0.25); }
    .rb-status.done      { background: rgba(16,185,129,0.25); }
    .rb-status.rejected  { background: rgba(239,68,68,0.22); color: #fecaca; }
    .rb-by { color: var(--rb-muted); overflow-wrap: anywhere; }
    .rb-thread-toggle {
      display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px;
      margin-left: auto; border: 1px solid var(--rb-line); cursor: pointer;
      background: transparent; color: var(--rb-text); font: inherit; font-size: 13px;
      padding: 8px 10px; border-radius: 8px; text-align: left;
    }
    .rb-thread-toggle:hover { background: rgba(251,191,36,0.2); border-color: rgba(251,191,36,0.5); }
    .rb-thread { margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1); }
    .rb-thread[hidden] { display: none; }
    @media (max-width: 540px) {
      .rb-card { padding: 20px 16px; }
      .rb-head { gap: 12px; }
      .rb-type-field, .rb-title-field { flex-basis: 100%; }
      .rb-submit { width: 100%; }
      .rb-thread-toggle { margin-left: 0; max-width: 100%; }
      .rb-item { gap: 10px; }
      .rb-input { font-size: 16px; }
    }
    @media (prefers-reduced-motion: reduce) { .rb-vote { transition: none; } }
  `;
  const style = document.createElement('style');
  style.setAttribute('data-injected', 'request-board');
  style.textContent = css;
  document.head.appendChild(style);
}
