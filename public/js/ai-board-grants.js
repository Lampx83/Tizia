const $ = (id) => document.getElementById(id);
const STATUS = { pending: 'Chờ duyệt', approved: 'Đã duyệt', rejected: 'Từ chối' };
const REASON = { scope_denied: 'Không đủ quyền trên phạm vi này', admin_required: 'Chỉ admin được duyệt', user_not_found: 'Không có người dùng này',
  review_already_decided: 'Yêu cầu đã được xử lý', resource_not_found: 'Không thấy tài nguyên', feature_unavailable: 'Tính năng không khả dụng' };
let base = '', admin = false;

function say(text, ok = false) { const m = $('msg'); m.textContent = text; m.className = ok ? 'ok' : 'err'; }
async function api(path, body) {
  const opts = { credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } };
  if (body !== undefined) {
    const { token } = await fetch('/api/csrf', { credentials: 'same-origin' }).then((r) => r.json());
    Object.assign(opts, { method: 'POST', body: JSON.stringify(body) }); opts.headers['X-CSRF-Token'] = token;
  }
  const r = await fetch(base + path, opts);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(REASON[data.error] || data.error || r.status);
  return data;
}
function cell(text) { const td = document.createElement('td'); td.textContent = text; return td; }
function button(label, cls, fn) { const b = document.createElement('button'); b.textContent = label; if (cls) b.className = cls; b.onclick = fn; const td = document.createElement('td'); td.append(b); return td; }
const act = (fn) => async () => { try { await fn(); await load(); } catch (e) { say(e.message); } };

async function load() {
  const d = await api('/grants'); admin = d.admin;
  $('grants').replaceChildren(...d.grants.map((g) => {
    const tr = document.createElement('tr');
    tr.append(cell(g.user_id), cell(g.owner_user_id), cell(g.permission === 'write' ? 'Ghi' : 'Đọc'));
    tr.append(button('Thu hồi', 'ghost', act(async () => { const r = await api('/grants', { user_id: g.user_id, owner_user_id: g.owner_user_id, permission: 'none' }); say('Đã thu hồi quyền', true); return r; })));
    return tr;
  }));
  $('reviews').replaceChildren(...d.reviews.map((v) => {
    const tr = document.createElement('tr');
    tr.append(cell(v.id), cell(v.user_id), cell(v.permission === 'write' ? 'Ghi' : 'Đọc'), cell(STATUS[v.status]));
    if (admin && v.status === 'pending') {
      const td = document.createElement('td');
      for (const [label, decision] of [['Duyệt', 'approve'], ['Từ chối', 'reject']]) {
        const b = button(label, decision === 'reject' ? 'ghost' : '', act(() => api(`/grants/${v.id}/review`, { decision }))).firstChild; td.append(b);
      }
      tr.append(td);
    } else tr.append(cell(''));
    return tr;
  }));
  $('body').hidden = false;
}

$('scope').onsubmit = async (e) => {
  e.preventDefault();
  base = `/api/ai-board/features/${encodeURIComponent($('feature').value.trim())}/resources/${encodeURIComponent($('resource').value.trim())}`;
  try { await load(); say(''); } catch (err) { $('body').hidden = true; say(err.message); }
};
$('invite').onsubmit = async (e) => {
  e.preventDefault();
  try {
    const r = await api('/grants', { user_id: Number($('user').value), permission: $('perm').value });
    say(r.status === 'review_required' ? 'Vượt quyền của bạn: đã gửi admin duyệt' : 'Đã cấp quyền', true);
    await load();
  } catch (err) { say(err.message); }
};
