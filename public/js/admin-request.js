// Chi tiết 1 yêu cầu (mở ở cửa sổ riêng từ trang admin): nội dung, trao đổi, và toàn bộ vết
// AI Board — phiên xử lý (worker) theo từng lượt, cổng, từng lần gọi model, sự kiện.
// Mọi giá trị từ học sinh/model là dữ liệu không tin cậy → luôn qua esc().

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (t) => t ? new Date(t).toLocaleString('vi-VN', { hour12:false }) : '—';
const fmtNum = (n) => (n == null) ? '—' : Number(n).toLocaleString('vi-VN');
const secs = (ms) => ms == null ? '—' : (ms / 1000).toFixed(1);

async function api(path) {
  const r = await fetch(path, { credentials:'same-origin' });
  if (r.status === 401) {
    location.href = '/login.html?return=' + encodeURIComponent(location.pathname + location.search);
    throw new Error('login');
  }
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
}

function renderThread(messages) {
  return messages.map(m => {
    const board = m.role === 'ai' || m.role === 'admin';
    return `<div class="blk ${board ? 'board' : 'student'}">
      <div class="who">${esc(m.author_name || (board ? 'Ban điều hành AI' : 'Học sinh'))} · ${fmt(m.created_at)}</div>
      <div style="white-space:pre-wrap">${esc(m.body)}</div>
    </div>`;
  }).join('') || '<div class="blk meta">Chưa có trao đổi nào.</div>';
}

function renderDecisions(decisions) {
  if (!decisions.length) return '';
  return `<h2>Quyết định AI (${decisions.length})</h2>` + decisions.map(d => `<div class="blk">
    <div class="who">${fmt(d.created_at)} · ${esc(d.decided_by)}${d.model ? ' · ' + esc(d.model) : ''} · độ tin cậy ${(d.confidence || 0).toFixed(2)}</div>
    <div><b>${esc(d.action)}</b> → ${esc(d.status_applied)}${d.priority_score != null ? ` · ưu tiên ${esc(d.priority_score)}` : ''}</div>
    ${d.reason ? `<div class="meta">${esc(d.reason)}</div>` : ''}
    ${d.public_note ? `<div>${esc(d.public_note)}</div>` : ''}
  </div>`).join('');
}

function budgetCell(used, limit) {
  const over = limit != null && used > limit;
  return `<span class="${over ? 'over' : ''}">${fmtNum(used)} / ${fmtNum(limit)}</span>`;
}

// 1 lượt = 1 lease của 1 worker (phiên): lập plan và/hoặc chạy các cổng; ngân sách GPU-s tính theo lượt.
function renderSessions(runs) {
  if (!runs.length) return '<div class="blk meta">Chưa có lượt xử lý nào.</div>';
  return `<div class="table-wrap"><table>
    <thead><tr><th>Lượt</th><th>Worker (phiên)</th><th>Chế độ</th><th>Bắt đầu</th><th>Cập nhật</th>
      <th>Kết quả</th><th>GPU-s lượt / trần</th><th>Lần gọi</th><th>Worker liên lạc cuối</th></tr></thead>
    <tbody>${runs.map(run => `<tr>
      <td>#${esc(run.id)} · ${esc(run.trigger)}</td>
      <td>${esc(run.worker_id || '—')}</td>
      <td>${esc(run.worker_mode || '—')}</td>
      <td>${fmt(run.created_at)}</td>
      <td>${fmt(run.updated_at)}</td>
      <td>${esc(run.status || 'chưa có kết luận')}${run.gate != null ? ` · cổng ${esc(run.gate)}` : ''}</td>
      <td>${budgetCell(run.budget_used, run.budget_limit)}</td>
      <td>${esc(run.totals?.calls)}</td>
      <td>${fmt(run.worker_last_seen)}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function callRows(e) {
  const m = e.metrics || {};
  const cut = (flag) => flag ? ' (đã cắt)' : '';
  return `<tr>
    <td>${esc(e.gate)}</td><td>${esc(e.child ?? '—')}</td><td>${esc(e.attempt ?? '—')}/${esc(e.iteration ?? '—')}</td>
    <td>${esc(e.model)}</td><td>${secs(m.wall_ms)}</td><td>${secs(m.gpu_ms)}</td><td>${secs(m.load_ms)}</td><td>${secs(m.queue_ms)}</td>
    <td>${fmtNum(m.tokens_in)} / ${fmtNum(m.tokens_out)}</td><td>${esc(m.tok_s ?? '—')}</td><td>${esc(m.done_reason ?? '—')}</td>
    <td>${esc(e.budget_units ?? '—')}</td>
    <td><span class="pill">${esc(e.result ?? '—')}</span>${e.error ? `<div class="meta">${esc(e.error)}</div>` : ''}</td>
  </tr>
  <tr><td colspan="13"><details><summary>${esc(e.call_id)} · ${esc(e.prompt_name ?? '')} · prompt và output</summary>
    <div class="meta">Prompt, phần thay đổi (${fmtNum(e.prompt_len)} ký tự)${cut(e.truncated?.prompt)}</div>
    <pre>${esc(e.prompt_var)}</pre>
    <div class="meta">Output (${fmtNum(e.output_len)} ký tự)${cut(e.truncated?.output)}</div>
    <pre>${esc(e.output)}</pre>
  </details></td></tr>`;
}

function renderRun(run) {
  const gates = run.gates.map(g => `<div class="blk">Cổng ${esc(g.gate)} · <b>${esc(g.status)}</b>
    ${g.public_reason ? ` — ${esc(g.public_reason)}` : ''}${g.internal_reason ? ` <span class="meta">(${esc(g.internal_reason)})</span>` : ''}</div>`).join('');
  const calls = run.calls.length ? `<div class="table-wrap"><table>
    <thead><tr><th>Cổng</th><th>Con</th><th>Lượt sửa/vòng</th><th>Model</th><th>Wall s</th><th>GPU s</th><th>Nạp s</th>
      <th>Chờ s</th><th>Token vào/ra</th><th>tok/s</th><th>Dừng vì</th><th>Đơn vị</th><th>Kết quả</th></tr></thead>
    <tbody>${run.calls.map(c => callRows(c.evidence || {})).join('')}</tbody></table></div>` : '';
  return `<h2>Lượt #${esc(run.id)} · ${esc(run.worker_id || '—')} · ${fmt(run.created_at)}</h2>${gates}${calls}`;
}

function renderEvents(events) {
  if (!events.length) return '<div class="blk meta">Chưa có sự kiện.</div>';
  return `<div class="table-wrap"><table>
    <thead><tr><th>Lúc</th><th>Ticket</th><th>Sự kiện</th><th>Bởi</th><th>Chuyển</th><th>Công khai</th><th>Nội bộ</th></tr></thead>
    <tbody>${events.map(e => `<tr>
      <td>${fmt(e.created_at)}</td><td>#${esc(e.ticket_id)}</td><td>${esc(e.event_type)}</td>
      <td>${esc(e.actor_type)}${e.actor_id ? ` · ${esc(e.actor_id)}` : ''}</td><td>${esc(e.transition || '')}</td>
      <td>${esc(e.public_message || '')}</td><td class="meta">${esc(e.internal_detail || '')}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function renderAiBoard(t) {
  const x = t.totals || {};
  const unit = x.budget_unit === 'k_tokens' ? 'nghìn token' : 'GPU-s';
  const root = t.root;
  return `
    <h2>AI Board</h2>
    <div class="blk">Root #${esc(root.id)} · <b>${esc(root.status)}</b> / ${esc(root.phase)}
      ${root.public_note ? `<div>${esc(root.public_note)}</div>` : ''}
      ${root.internal_reason ? `<div class="meta">${esc(root.internal_reason)}</div>` : ''}</div>
    <div class="blk strip">
      <span>Trần mỗi lượt: <b>${fmtNum(x.budget_limit)}</b> ${unit}</span>
      <span>Tổng tích lũy các lượt: <b>${fmtNum(x.budget_used)}</b></span>
      <span>GPU-s đo được: <b>${esc(x.gpu_s)}</b></span>
      <span>Token vào/ra: <b>${fmtNum(x.tokens_in)} / ${fmtNum(x.tokens_out)}</b></span>
      <span>Lần gọi: <b>${esc(x.calls)}</b></span>
      <span>Nạp model: <b>${esc(x.model_loads)}</b></span>
      <span>Hỏi lại: <b>${esc(x.retries)}</b></span>
    </div>
    ${t.children.length ? `<div class="blk">${t.children.map(c =>
      `<div>Bước ${esc(c.order)} · #${esc(c.id)} · ${esc(c.title)} · <span class="pill">${esc(c.status)}</span></div>`).join('')}</div>` : ''}
    <h2>Phiên xử lý</h2>
    ${renderSessions(t.runs || [])}
    ${(t.runs || []).map(renderRun).join('')}
    <h2>Sự kiện</h2>
    ${renderEvents(t.events || [])}
  `;
}

async function main() {
  const id = Number(new URLSearchParams(location.search).get('id'));
  if (!id) { $('#app').innerHTML = '<p class="err">Thiếu id yêu cầu.</p>'; return; }
  const [thread, decisions, trace] = await Promise.all([
    api(`/api/requests/${id}/thread`),
    api(`/api/requests/${id}/decisions`),
    api(`/api/admin/ai-board/requests/${id}/trace`),
  ]);
  if (!thread.ok) { $('#app').innerHTML = `<p class="err">Không tải được yêu cầu #${id} (${esc(thread.data?.error || thread.status)}).</p>`; return; }
  const r = thread.data.request;
  document.title = `Yêu cầu #${r.id} · Tizia`;
  $('#app').innerHTML = `
    <a href="/admin.html#requests">Về trang quản trị</a>
    <h1>Yêu cầu #${esc(r.id)}: ${esc(r.title)}</h1>
    <div class="meta">${esc(r.domain)} · ${esc(r.type)} · ${esc(r.student)} · <span class="pill">${esc(r.status)}</span> · tạo ${fmt(r.created_at)}</div>
    <h2>Trao đổi</h2>
    ${renderThread(thread.data.messages || [])}
    ${renderDecisions(decisions.data?.decisions || [])}
    ${trace.ok ? renderAiBoard(trace.data) : '<h2>AI Board</h2><div class="blk meta">Yêu cầu này chưa có ticket AI Board.</div>'}
  `;
}

main().catch(e => { if (e.message !== 'login') $('#app').innerHTML = `<p class="err">Lỗi: ${esc(e.message)}</p>`; });
