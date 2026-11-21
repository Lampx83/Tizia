// Admin "Duyệt" tab: what waits for an admin decision, counts, and the network-request card.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const NET_WARNING = 'Quyết định duyệt không thu hồi được: gói đã vào cache nội bộ và run tiếp tục với nó. Thay đổi code vẫn rollback được qua luồng release.';
export const NET_META = { version: 'Phiên bản', license: 'Giấy phép', age: 'Tuổi', weekly_downloads: 'Lượt tải/tuần', install_scripts: 'Script cài đặt',
  transitive_count: 'Số gói phụ thuộc gián tiếp' };
export const netValue = (v) => (typeof v === 'boolean' ? (v ? 'Có' : 'Không') : Array.isArray(v) ? v.join(', ') : v && typeof v === 'object' ? JSON.stringify(v) : String(v));
export const netTitle = (item) => (item.kind === 'package' ? `${item.name || '?'}${item.version_range ? `@${item.version_range}` : ''}` : item.url || '?');
export const netMetaRows = (item) => Object.entries(NET_META).filter(([k]) => item.metadata?.[k] != null && item.metadata[k] !== '')
  .map(([k, label]) => `<div><span class="meta">${esc(label)}</span> ${esc(netValue(item.metadata[k]))}</div>`).join('');

/** Counts per kind and total; waiting excludes tickets already shown as elevation. */
export function approvalCounts({ requests = [], tickets = [], netCounts = {}, dbItems = [] } = {}) {
  const elevating = new Set(requests.filter((r) => r.elevation === 'requested').map((r) => r.id));
  const elevation = elevating.size;
  const waiting = tickets.filter((t) => t.card && !elevating.has(t.source_request_id)).length;
  const net = Object.values(netCounts).reduce((n, v) => n + (Number(v) || 0), 0);
  const db = dbItems.length;
  return { elevation, waiting, net, db, total: elevation + waiting + net + db };
}

/** Network request card; the page supplies tag() and escalationCard(). reason: typed rejection reason. */
export function renderNetItem(entry, { reason = '', msg = '' } = {}, { tag, escalationCard }) {
  const { item, request_id: rid, title } = entry;
  const rows = netMetaRows(item), id = esc(item.id), hid = `appr-net-${id}`;
  const buttons = `<label class="meta" for="${hid}-reason" style="display:block;width:100%">Lý do từ chối (không bắt buộc)
      <input id="${hid}-reason" data-net-reason="${id}" maxlength="500" autocomplete="off" value="${esc(reason)}" style="width:100%;max-width:72ch;display:block;margin-top:4px"></label>
      <button class="btn primary" data-act="net-approve" data-id="${id}" data-rid="${esc(rid)}">Duyệt</button>
      <button class="btn danger" data-act="net-reject" data-id="${id}" data-rid="${esc(rid)}">Từ chối</button>`;
  return `<article class="net-item" id="${hid}" data-id="${id}" aria-label="Yêu cầu mạng cho yêu cầu ${esc(rid)}">
    <div><b>#${esc(rid)}</b> ${esc(title || '')} · <a href="/admin-request.html?id=${esc(rid)}" target="_top">mở trang yêu cầu</a></div>
    <div><b><code>${esc(netTitle(item))}</code></b> ${tag('warn', item.kind === 'package' ? 'Gói npm' : 'URL')}</div>
    ${escalationCard(item.card, { tag, extra: { evidence: rows ? `<div class="meta">${rows}</div>` : '<div class="meta">Chưa có metadata cho mục này.</div>',
      risk: `<div class="net-warn" role="note">${esc(NET_WARNING)}</div>` }, buttons })}
    ${msg ? `<div class="meta" role="status">${esc(msg)}</div>` : ''}
  </article>`;
}

/** Section shell: heading with count, optional state line. Empty sections return ''. */
export function section(id, title, count, body, hint = '') {
  if (!body) return '';
  return `<section class="appr-section" id="appr-${id}" aria-labelledby="appr-${id}-h"><h2 id="appr-${id}-h" class="appr-h">${esc(title)} <span class="pill">${esc(count)}</span></h2>${hint ? `<p class="meta">${esc(hint)}</p>` : ''}${body}</section>`;
}

/** Read-only pointer shown on the Góp ý tab and request page; '' when nothing waits. */
export function approvalsNotice(n, href = '#approvals') {
  if (!n) return '';
  return `<p class="appr-notice" role="status"><b>${esc(n)}</b> mục đang chờ admin duyệt. <a href="${esc(href)}" target="_top">Mở tab Duyệt</a></p>`;
}
