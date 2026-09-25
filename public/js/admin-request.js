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

// Màu theo trạng thái: ok (xanh) · warn (cam) · bad (đỏ) · idle (xám).
const RUN_STATE = { ready_for_pr: 'ok', needs_review: 'warn', blocked: 'bad' };
const CALL_STATE = { ok: 'ok', retry: 'warn', error: 'bad', http_error: 'bad', timeout: 'bad' };
const GATE_STATE = { passed: 'ok', blocked: 'bad' };
const RUN_LABEL = { ready_for_pr: 'sẵn sàng PR', needs_review: 'cần người xem', blocked: 'bị chặn' };
const CALL_LABEL = { ok: 'ok', retry: 'hỏi lại', error: 'lỗi', http_error: 'lỗi HTTP', timeout: 'quá giờ' };
const GATE_NAME = { 1: 'Cổng 1 · lập plan', 2: 'Cổng 2 · phạm vi', 2.5: 'Cổng 2.5 · soát plan', 3: 'Cổng 3 · sinh code',
  4: 'Cổng 4 · kiểm tĩnh + guard', 5: 'Cổng 5 · chạy Docker', 5.5: 'Cổng 5.5 · đánh giá rủi ro' };
const tag = (state, text) => `<span class="tag st-${state}">${esc(text)}</span>`;
const gateName = (g) => GATE_NAME[Number(g)] || `Cổng ${esc(g)}`;

// 1 lượt = 1 lease của 1 worker (phiên): lập plan và/hoặc chạy các cổng; ngân sách GPU-s tính theo lượt.
function renderSessions(runs) {
  if (!runs.length) return '<div class="blk meta">Chưa có lượt xử lý nào.</div>';
  return `<div class="timeline">${runs.map(run => {
    const state = RUN_STATE[run.status] || 'idle';
    return `<div class="step st-${state}"><div class="line1">
      <b>Lượt #${esc(run.id)}</b> ${tag(state, RUN_LABEL[run.status] || 'chưa có kết luận')}
      <span>worker ${esc(run.worker_id || '—')} (${esc(run.worker_mode || '—')})</span>
      <span>${esc(run.trigger)}${run.gate != null ? ` · dừng ở cổng ${esc(run.gate)}` : ''}</span></div>
      <div class="metrics"><span>${fmt(run.created_at)} → ${fmt(run.updated_at)}</span>
        <span>GPU-s lượt / trần: ${budgetCell(run.budget_used, run.budget_limit)}</span>
        <span>${esc(run.totals?.calls)} lần gọi</span><span>worker liên lạc cuối ${fmt(run.worker_last_seen)}</span></div>
    </div>`;
  }).join('')}</div>`;
}

function callStep(e) {
  const m = e.metrics || {};
  const cut = (flag) => flag ? ' (đã cắt)' : '';
  const state = CALL_STATE[e.result] || 'idle';
  const where = [e.child != null ? `bước ${esc(e.child)}` : '', e.attempt ? `lượt sửa ${esc(e.attempt)}` : '',
    e.iteration ? `lần hỏi lại ${esc(e.iteration)}` : ''].filter(Boolean).join(' · ');
  return `<div class="step st-${state}"><div class="line1">
      <span>Gọi ${esc(e.model)}</span>${tag(state, CALL_LABEL[e.result] || e.result || '—')}${where ? `<span>${where}</span>` : ''}</div>
    ${e.error ? `<div style="color:var(--c);margin-top:4px">${esc(e.error)}</div>` : ''}
    <div class="metrics"><span>wall ${secs(m.wall_ms)} s</span><span>GPU ${secs(m.gpu_ms)} s</span>
      <span>nạp ${secs(m.load_ms)} s</span><span>chờ ${secs(m.queue_ms)} s</span>
      <span>token ${fmtNum(m.tokens_in)} / ${fmtNum(m.tokens_out)}</span><span>${esc(m.tok_s ?? '—')} tok/s</span>
      <span>dừng vì ${esc(m.done_reason ?? '—')}</span><span>${esc(e.budget_units ?? '—')} đơn vị</span></div>
    <details><summary>${esc(e.call_id)} · ${esc(e.prompt_name ?? '')} · prompt và output</summary>
      <div class="meta">Prompt, phần thay đổi (${fmtNum(e.prompt_len)} ký tự)${cut(e.truncated?.prompt)}</div>
      <pre>${esc(e.prompt_var)}</pre>
      <div class="meta">Output (${fmtNum(e.output_len)} ký tự)${cut(e.truncated?.output)}</div>
      <pre>${esc(e.output)}</pre>
    </details></div>`;
}

function gateStep(g) {
  const state = GATE_STATE[g.status] || 'idle';
  return `<div class="step gate st-${state}"><div class="line1"><b>${gateName(g.gate)}</b>
      ${tag(state, g.status === 'passed' ? 'qua' : g.status === 'blocked' ? 'chặn' : g.status)}</div>
    ${g.public_reason ? `<div style="margin-top:4px">${esc(g.public_reason)}</div>` : ''}
    ${g.internal_reason ? `<div class="meta">${esc(g.internal_reason)}</div>` : ''}</div>`;
}

// Thứ tự: theo cổng; trong 1 cổng các lần gọi model trước, kết luận của cổng sau cùng.
function renderRun(run) {
  const items = [
    ...run.calls.map(c => ({ gate: Number(c.evidence?.gate ?? c.gate), kind: 0, at: c.created_at, id: c.id, html: callStep(c.evidence || {}) })),
    ...run.gates.map(g => ({ gate: Number(g.gate), kind: 1, at: g.created_at, id: g.id, html: gateStep(g) })),
  ].sort((a, b) => a.gate - b.gate || a.kind - b.kind || a.at - b.at || a.id - b.id);
  const state = RUN_STATE[run.status] || 'idle';
  return `<div class="run-head st-${state}"><b>Lượt #${esc(run.id)}</b>${tag(state, RUN_LABEL[run.status] || 'chưa có kết luận')}
      <span>worker ${esc(run.worker_id || '—')}</span><span>${fmt(run.created_at)}</span>
      <span>GPU-s ${budgetCell(run.budget_used, run.budget_limit)}</span></div>
    ${items.length ? `<div class="timeline">${items.map(i => i.html).join('')}</div>` : '<div class="blk meta">Lượt này chưa có dữ liệu cổng.</div>'}`;
}

function eventState(e) {
  const t = `${e.event_type} ${e.transition || ''}`;
  if (/blocked|critical|rejected|cancel|budget_exhausted|waiting_admin/.test(t)) return 'bad';
  if (/waiting|review|clarif/.test(t)) return 'warn';
  return 'ok';
}

function renderEvents(events) {
  if (!events.length) return '<div class="blk meta">Chưa có sự kiện.</div>';
  return `<div class="timeline">${events.map(e => {
    const state = eventState(e);
    return `<div class="step st-${state}"><div class="line1"><b>${esc(e.event_type)}</b>
        ${e.transition ? tag(state, e.transition) : ''}<span class="meta">${fmt(e.created_at)} · ticket #${esc(e.ticket_id)}
        · ${esc(e.actor_type)}${e.actor_id ? ` ${esc(e.actor_id)}` : ''}</span></div>
      ${e.public_message ? `<div style="margin-top:4px">${esc(e.public_message)}</div>` : ''}
      ${e.internal_detail ? `<div class="meta">${esc(e.internal_detail)}</div>` : ''}</div>`;
  }).join('')}</div>`;
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

if (window.top !== window) {
  document.documentElement.classList.add('embedded');
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.parent.document.getElementById('req-dialog')?.close();
  });
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
    <a class="back" href="/admin.html#requests">Về trang quản trị</a>
    <h1>Yêu cầu #${esc(r.id)}: ${esc(r.title)}</h1>
    <div class="meta">${esc(r.domain)} · ${esc(r.type)} · ${esc(r.student)} · <span class="pill">${esc(r.status)}</span> · tạo ${fmt(r.created_at)}</div>
    <h2>Trao đổi</h2>
    ${renderThread(thread.data.messages || [])}
    ${renderDecisions(decisions.data?.decisions || [])}
    ${trace.ok ? renderAiBoard(trace.data) : '<h2>AI Board</h2><div class="blk meta">Yêu cầu này chưa có ticket AI Board.</div>'}
  `;
}

main().catch(e => { if (e.message !== 'login') $('#app').innerHTML = `<p class="err">Lỗi: ${esc(e.message)}</p>`; });
