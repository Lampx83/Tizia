const $ = (id) => document.getElementById(id);
const STATUS = { pending: 'Đang chờ xử lý', corrected: 'Đã sửa và tạo yêu cầu mới', upheld: 'Giữ nguyên quyết định' };
const REASON = { not_flagged: 'Yêu cầu này không bị gắn cờ', appeal_pending: 'Đã có kháng nghị đang chờ xử lý', version_conflict: 'Có người vừa xử lý; tải lại trang',
  appeal_decided: 'Kháng nghị đã được xử lý', corrected_text_blocked: 'Bản sửa vẫn vi phạm quy tắc nhận yêu cầu', owner_quota_full: 'Người gửi đã đủ số yêu cầu chờ',
  invalid_reason: 'Lý do cần 10 đến 1000 ký tự', request_not_found: 'Không thấy yêu cầu' };
const requestId = new URLSearchParams(location.search).get('request');

function say(text, ok = false) { $('msg').textContent = text; $('msg').className = ok ? 'ok' : 'err'; }
async function api(path, body) {
  const opts = { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } };
  if (body !== undefined) {
    const { token } = await fetch('/api/csrf', { credentials: 'same-origin' }).then((r) => r.json());
    Object.assign(opts, { method: 'POST', body: JSON.stringify(body) }); opts.headers['X-CSRF-Token'] = token;
  }
  const r = await fetch(path, opts);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || REASON[data.error] || data.error || r.status);
  return data;
}
function el(tag, text, cls) { const e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
const time = (ms) => (ms ? new Date(ms).toLocaleString('vi-VN') : '');

function appealCard(a) {
  const card = el('div', undefined, 'card');
  card.append(el('strong', STATUS[a.status]), el('div', `Gửi lúc ${time(a.created_at)}`, 'muted'), el('p', a.reason));
  if (a.adjudication_reason) card.append(el('p', `Phân xử: ${a.adjudication_reason}`));
  if (a.revision_request_id) card.append(el('p', `Yêu cầu sửa liên kết: #${a.revision_request_id}`));
  return card;
}

async function owner() {
  const d = await api(`/api/requests/${encodeURIComponent(requestId)}/flags`);
  $('title').textContent = d.request.title;
  $('owner').hidden = false;
  $('flags').replaceChildren(...d.flags.map((f) => { const li = el('li'); li.append(el('strong', f.label), ` (${f.source === 'model' ? 'bộ phân loại' : 'từ điển'}): ${f.note}`); return li; }));
  $('unflagged').hidden = d.flagged;
  $('form-wrap').hidden = !d.flagged || d.appeals.some((a) => a.status !== 'upheld');
  $('history').replaceChildren(...d.appeals.map(appealCard));
}

async function admin() {
  const d = await api('/api/admin/ai-board/appeals?status=pending');
  $('admin').hidden = false;
  $('queue').replaceChildren(...d.appeals.map((a) => {
    const card = appealCard(a);
    card.prepend(el('div', `Yêu cầu #${a.request_id}: ${a.request_title}`, 'muted'));
    card.append(el('div', `Cờ: ${a.flags.map((f) => f.label).join(', ') || 'không có'}`, 'muted'));
    const form = el('form');
    const decision = el('select'); for (const [v, t] of [['upheld', 'Giữ nguyên'], ['corrected', 'Sửa và tạo yêu cầu mới']]) decision.append(new Option(t, v));
    const reason = el('textarea'); reason.placeholder = 'Lý do phân xử (10 ký tự trở lên)'; reason.required = true;
    const title = el('input'); title.placeholder = 'Tiêu đề đã sửa'; title.value = a.proposed_title || '';
    const detail = el('textarea'); detail.placeholder = 'Chi tiết đã sửa'; detail.value = a.proposed_detail || '';
    const go = el('button', 'Quyết định');
    form.append(decision, reason, title, detail, go);
    form.onsubmit = async (e) => {
      e.preventDefault();
      try {
        await api(`/api/admin/ai-board/appeals/${a.id}/adjudicate`, { decision: decision.value, reason: reason.value, version: a.version,
          ...(decision.value === 'corrected' ? { corrected_title: title.value, corrected_detail: detail.value } : {}) });
        say('Đã xử lý kháng nghị', true); await admin();
      } catch (err) { say(err.message); }
    };
    card.append(form);
    return card;
  }));
  if (!d.appeals.length) $('queue').append(el('p', 'Không có kháng nghị nào đang chờ.', 'muted'));
}

$('appeal').onsubmit = async (e) => {
  e.preventDefault();
  try {
    await api(`/api/requests/${encodeURIComponent(requestId)}/appeal`, { reason: $('reason').value,
      ...($('ptitle').value.trim() ? { proposed_title: $('ptitle').value, proposed_detail: $('pdetail').value } : {}) });
    say('Đã gửi kháng nghị; yêu cầu gốc và hạn mức giữ nguyên', true); await owner();
  } catch (err) { say(err.message); }
};

try { await (requestId ? owner() : admin()); } catch (err) { say(err.message); }
