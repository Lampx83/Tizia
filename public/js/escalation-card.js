// Thẻ quyết định dùng chung cho trang admin: năm dòng cố định, mọi chuỗi server/model đi qua esc().
export const ESCALATION_ROWS = [['action', 'Hành động'], ['why', 'Vì sao hỏi'], ['evidence', 'Bằng chứng'], ['risk', 'Rủi ro'], ['options', 'Lựa chọn']];
const RISK = { high: ['bad', 'Cao'], medium: ['warn', 'Trung bình'], low: ['ok', 'Thấp'] };

export const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const text = (s) => `<div style="white-space:pre-wrap">${escHtml(s)}</div>`;

/**
 * card (server escalation-card.js) → HTML. `tag(tone, label)` = pill của trang (tone ok|warn|bad).
 * `html[row]` thay phần chữ mặc định của dòng, `extra[row]` nối thêm sau; `buttons` = nút thật của trang cho dòng Lựa chọn.
 */
export function escalationCard(card, { tag, html = {}, extra = {}, buttons = '' } = {}) {
  if (!card) return buttons ? `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">${buttons}</div>` : '';
  const [tone, label] = RISK[card.risk?.level] || RISK.medium;
  const off = (card.options || []).filter((option) => !option.available && option.note);
  const body = {
    action: text(card.action),
    why: text(card.why),
    evidence: (card.evidence || []).length
      ? `<ul style="margin:2px 0;padding-left:18px">${card.evidence.map((e) => `<li><span class="meta">${escHtml(e.source)}:</span> “${escHtml(e.quote)}”</li>`).join('')}</ul>`
      : '<div class="meta">Không có bằng chứng lưu kèm.</div>',
    risk: `${tag(tone, label)} ${tag(card.risk?.reversible ? 'ok' : 'bad', card.risk?.reversible ? 'hoàn tác được' : 'không hoàn tác được')} <span class="meta">${escHtml(card.risk?.note)}</span>`,
    options: `${buttons ? `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">${buttons}</div>` : ''}${off.length
      ? `<ul class="meta" style="margin:4px 0 0;padding-left:18px">${off.map((o) => `<li>${escHtml(o.label)}: ${escHtml(o.note)}</li>`).join('')}</ul>` : ''}`,
  };
  return `<dl class="escalation-card" data-kind="${escHtml(card.kind)}" style="margin:6px 0;display:grid;grid-template-columns:minmax(90px,max-content) 1fr;gap:6px 12px">${
    ESCALATION_ROWS.map(([key, name]) => `<dt><b>${name}</b></dt><dd style="margin:0;min-width:0;overflow-wrap:anywhere">${html[key] ?? body[key]}${extra[key] ?? ''}</dd>`).join('')}</dl>`;
}
