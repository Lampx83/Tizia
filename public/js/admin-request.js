import { mountPrivatePreview } from './private-preview.js';
// Chi tiết 1 yêu cầu (cửa sổ con trên trang admin): nội dung, trao đổi, kế hoạch, tiến độ trực tiếp và toàn bộ
// vết AI Board — phiên xử lý (worker) theo từng lượt, cổng, từng lần gọi model, sự kiện. Tự cập nhật bằng cách
// vá DOM (không vẽ lại cả trang). Mọi giá trị từ học sinh/model là dữ liệu không tin cậy → luôn qua esc().
import { patchHtml } from './dom-morph.js';
import { mountPrivatePreview } from './private-preview.js';
import { installLightbox, pairBeforeAfter } from './lightbox.js';
import { projectPipeline, describeModelCall, describeEvent, TECHNICAL_EVENTS, TRACE_STEPS } from './ai-board-trace.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (t) => t ? new Date(t).toLocaleString('vi-VN', { hour12:false }) : '—';
const fmtNum = (n) => (n == null) ? '—' : Number(n).toLocaleString('vi-VN');
const secs = (ms) => ms == null ? '—' : (ms / 1000).toFixed(1);
const elapsed = (t) => { const s = Math.max(0, Math.round((Date.now() - t) / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

const REQUEST_ID = Number(new URLSearchParams(location.search).get('id'));
// Trạng thái giao diện riêng của admin (không phải dữ liệu server): bảng xác nhận đang mở ở bước nào.
// `open`: khóa <details> (data-k) → đã mở/đóng, sống qua mọi lần vẽ lại do refresh().
const ui = { confirm: null, step: 1, msg: '', flash: '', authorizeConfirm: null, open: {} };
let view = null;
let gateNames = {}; // tên cổng lấy từ trace (contract.gates.names của server)

async function api(path, options = {}) {
  const r = await fetch(path, { credentials:'same-origin', ...options, signal: options.signal ?? AbortSignal.timeout(10000) });
  if (r.status === 401) {
    location.href = '/login.html?return=' + encodeURIComponent(location.pathname + location.search);
    throw new Error('login');
  }
  return { ok: r.ok, status: r.status, data: await r.json().catch(() => ({})) };
}

async function post(path, body) {
  const { token } = await fetch('/api/csrf', { credentials: 'same-origin' }).then(r => r.json());
  const r = await fetch(path, {
    method: 'POST', credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || data.error || r.status);
  return data;
}

function renderAtts(list) {
  const items = pairBeforeAfter((Array.isArray(list) ? list : []).filter(a => a && a.url));
  if (!items.length) return '';
  return `<div class="atts">${items.map(a => /^image\//.test(a.mime || '')
    ? `<a href="${esc(a.url)}" data-gallery data-name="${esc(a.name)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(a.url)}" alt="${esc(a.name)}"><span>${esc(a.name)}</span></a>`
    : `<a href="${esc(a.url)}" target="_blank" rel="noopener"><span>${esc(a.name)}</span></a>`).join('')}</div>`;
}

function renderThread(messages) {
  return messages.map(m => {
    const board = m.role === 'ai' || m.role === 'admin';
    return `<div class="blk ${board ? 'board' : 'student'}">
      <div class="who">${esc(m.author_name || (board ? 'Ban điều hành AI' : 'Học sinh'))} · ${fmt(m.created_at)}</div>
      <div style="white-space:pre-wrap">${esc(m.body)}</div>
      ${renderAtts(m.attachments)}
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

// Màu theo trạng thái: ok (xanh) · warn (cam) · bad (đỏ) · run (đang chạy, nhấp nháy) · idle (xám).
const RUN_STATE = { ready_for_pr: 'ok', needs_review: 'warn', blocked: 'bad' };
const CALL_STATE = { ok: 'ok', retry: 'warn', error: 'bad', http_error: 'bad', timeout: 'bad' };
const GATE_STATE = { passed: 'ok', blocked: 'bad' };
const RUN_LABEL = { ready_for_pr: 'Có thể tạo PR', needs_review: 'Cần người xem xét', blocked: 'Bị chặn' };
const ROLLBACK_STATE = { discarded: ['ok', 'branch deleted'], revert_ready: ['warn', 'revert branch ready'], failed: ['bad', 'rollback failed'] };
// Kết quả một call và kết luận kiểm chứng của bước là hai trạng thái khác nhau.
const STATE_LABEL = { ok: 'Đạt kiểm tra', bad: 'Chưa đạt', run: 'Đang xử lý', wait: 'Chưa thực hiện', skip: 'Không thực hiện' };
const CALL_LABEL = { ok: 'Đã nhận kết quả AI', retry: 'Cần thử lại', error: 'Gọi AI thất bại', http_error: 'Lỗi kết nối AI', timeout: 'AI hết thời gian trả lời' };
const TRIGGER_LABEL = { plan: 'Lập kế hoạch và xử lý yêu cầu', execute: 'Thực hiện kế hoạch đã duyệt', rollback: 'Hoàn tác', shadow_precheck: 'Kiểm tra sơ bộ' };
const tag = (state, text) => `<span class="tag st-${state}">${esc(text)}</span>`;
const cap = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;
const runTitle = (run) => cap(TRIGGER_LABEL[run.trigger] || run.trigger);
// Cổng nguyên (1..5) là bước chính; 2.5 và 5.5 là bước phụ (kiểm tra xen giữa) nên có giao diện riêng, giữ nguyên số.
const isSub = (g) => !Number.isInteger(Number(g));
const gatePos = (g) => esc(Number(g));
const subClass = (g) => (isSub(g) ? ' sub-step' : '');
const gateName = (g) => `${gatePos(g)} · ${esc(TRACE_STEPS.find(s => s.gate === Number(g))?.title || gateNames[Number(g)] || 'Bước xử lý')}`;

const ROOT_STATUS = {
  queued: ['idle', 'Chờ worker nhận'], running: ['run', 'Đang xử lý'], planned: ['ok', 'Đã có kế hoạch'],
  waiting_authorization: ['warn', 'Chờ admin cho phép'], waiting_admin: ['warn', 'Chờ admin'], waiting: ['warn', 'Chờ xem xét'],
  human_owned: ['warn', 'Chuyển cho người làm'], cancelled: ['bad', 'Đã dừng'], done: ['ok', 'Xong'],
};
// Tiến độ do server tính (run.progress): cổng nào qua / chặn / đang chạy / chưa tới / không chạy.
// 1 lượt = 1 lease của 1 worker (phiên): lập plan và/hoặc chạy các cổng; ngân sách GPU-s tính theo lượt.
function runState(run, live) {
  if (run.rollback) return ROLLBACK_STATE[run.rollback.outcome] || ['idle', run.rollback.outcome];
  if (run.status) return [RUN_STATE[run.status] || 'idle', RUN_LABEL[run.status] || run.status];
  if (live) return ['run', 'Đang xử lý'];
  if (run.gates?.some(g => g.status === 'blocked')) return ['bad', 'Dừng vì bước kiểm tra chưa đạt'];
  if (run.gates?.some(g => Number(g.gate) === 2.5 && g.status === 'passed')) return ['ok', 'Đã lập kế hoạch; chưa có kết luận cuối'];
  return ['idle', 'Lượt đã kết thúc; chưa có kết luận cuối'];
}

// <details> có khóa: mở/đóng giữ trong ui.open qua các lần vẽ lại (syncOpen). `open` mặc định = data-dopen, không phải attr `open`.
const det = (key, summary, body, { cls = '', dopen = false } = {}) =>
  `<details class="${cls}" data-k="${esc(key)}"${dopen ? ' data-dopen' : ''}><summary>${summary}</summary>${body}</details>`;
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// Mỗi lần gọi model, 4 phần gập: Context (AI biết gì) · Tools (harness chạy hộ) · Edit (AI sửa gì) · Evaluation (đánh giá).
const noteItem = (call, n, i) => `<li><b>${esc(n.name)}</b>${n.summary ? `: ${esc(n.summary)}` : ''}${n.data
  ? det(`${call}:n${i}`, 'details', `<pre>${esc(n.data)}</pre>`, { cls: 'raw' }) : ''}</li>`;
const diffHtml = (diff) => esc(diff).split(/\r?\n/).map((l) => (l.startsWith('+') && !l.startsWith('+++') ? `<span class="add">${l}</span>`
  : l.startsWith('-') && !l.startsWith('---') ? `<span class="del">${l}</span>` : l)).join('\n');
const diffCount = (diff) => { const l = diff.split(/\r?\n/);
  return `+${l.filter((x) => x.startsWith('+') && !x.startsWith('+++')).length} -${l.filter((x) => x.startsWith('-') && !x.startsWith('---')).length}`; };
const sum = (title, ...parts) => `<b>${title}</b>${parts.filter(Boolean).map((p) => ` · ${p}`).join('')}`;
const ok = (state, text) => `<span class="s-${state}">${esc(text)}</span>`;
function explain(e) {
  const notes = e.notes || [], edits = e.edits, checks = e.evaluation || [], id = e.call_id;
  const knows = notes.map((n, i) => [n, i]).filter(([n]) => n.kind === 'knows');
  const used = notes.map((n, i) => [n, i]).filter(([n]) => n.kind === 'tool');
  if (!knows.length && !used.length && !edits && !checks.length) return '';
  const list = (rows) => `<ul>${rows.map(([n, i]) => noteItem(id, n, i)).join('')}</ul>`;
  const passed = checks.filter((x) => x.ok).length, failed = !!(edits && !edits.applied) || passed < checks.length;
  return `<div class="secs">
    ${knows.length ? det(`${id}:ctx`, sum('Thông tin cung cấp cho AI', `${knows.length} mục`), list(knows), { cls: 'sec' }) : ''}
    ${used.length ? det(`${id}:tools`, sum('Công cụ đã chạy', `${used.length} lần`), list(used), { cls: 'sec' }) : ''}
    ${edits ? det(`${id}:edit`, sum('Thay đổi code', ok(edits.applied ? 'ok' : 'bad', edits.applied ? 'đã áp dụng' : 'chưa áp dụng'),
        edits.diff ? diffCount(edits.diff) : ''),
      `${edits.diff ? `<pre class="diff">${diffHtml(edits.diff)}</pre>` : ''}
       ${edits.parsed ? det(`${id}:edit-raw`, 'edits (raw)', `<pre>${esc(edits.parsed)}</pre>`, { cls: 'raw' }) : ''}`,
      { cls: 'sec', dopen: !!edits.diff && failed }) : ''}
    ${checks.length ? det(`${id}:eval`, sum('Kiểm tra kết quả AI', ok(passed === checks.length ? 'ok' : 'bad', `${passed}/${checks.length} đạt`)),
      `<ul>${checks.map((x) => `<li>${tag(x.ok ? 'ok' : 'bad', x.ok ? 'pass' : 'fail')} <b>${esc(x.check)}</b>${x.detail ? `: ${esc(x.detail)}` : ''}</li>`).join('')}</ul>`,
      { cls: 'sec' }) : ''}
  </div>`;
}

function callStep(e, rerunGate = null) {
  const m = e.metrics || {};
  const purpose = describeModelCall(e);
  const cut = (flag) => flag ? ' (truncated)' : '';
  const state = CALL_STATE[e.result] || 'idle';
  const where = [e.child != null ? `công việc ${esc(e.child)}` : '', e.attempt ? `vòng sửa ${esc(e.attempt)}` : '',
    e.iteration ? `lần thử lại ${esc(e.iteration)}` : ''].filter(Boolean).join(' · ');
  return `<article class="call-row st-${state}" data-call-purpose="${esc(purpose.id)}"><div class="line1">
      <b>${esc(purpose.title)}</b>${tag(state, CALL_LABEL[e.result] || 'Chưa có kết quả')}${where ? `<span>${where}</span>` : ''}${rerunGate != null ? rerunBtn(rerunGate) : ''}</div>
    <p class="meta call-purpose">${esc(purpose.detail)}</p>
    ${e.error ? `<div style="color:var(--c);margin-top:4px">${esc(e.error)}</div>` : ''}
    <div class="metrics"><span>Model: ${esc(e.model || 'chưa ghi nhận')}</span><span>Thời gian: ${secs(m.wall_ms)} giây</span><span>Token vào / ra: ${fmtNum(m.tokens_in)} / ${fmtNum(m.tokens_out)}</span></div>
    ${det(`${e.call_id}:metrics`, 'Chi phí và thông số kỹ thuật', `<div class="metrics"><span>GPU ${secs(m.gpu_ms)} s</span>
      <span>load ${secs(m.load_ms)} s</span><span>queue ${secs(m.queue_ms)} s</span>
      <span>tokens ${fmtNum(m.tokens_in)} / ${fmtNum(m.tokens_out)}</span><span>${esc(m.tok_s ?? '—')} tok/s</span>
      <span>stop ${esc(m.done_reason ?? '—')}</span><span>${esc(e.budget_units ?? '—')} units</span></div>`, { cls: 'raw' })}
    ${explain(e)}
    ${det(`${e.call_id}:io`, 'Xem đầu vào và kết quả của nhiệm vụ này',
      `<div class="meta">Mã bản ghi: ${esc(e.call_id)} · ${esc(e.prompt_name || 'bản ghi cũ chưa có nhãn')}</div>
      <div class="meta">Đầu vào (${fmtNum(e.prompt_len)} ký tự)${cut(e.truncated?.prompt)}</div>
      <pre>${esc(e.prompt_var)}</pre>
      <div class="meta">Kết quả AI (${fmtNum(e.output_len)} ký tự)${cut(e.truncated?.output)}</div>
      <pre>${esc(e.output)}</pre>`)}</article>`;
}

// Bước hỏng có thể chạy lại ngay cạnh nó. Lập kế hoạch (1–2.5) và kiểm tra trước PR (3–5.5) mỗi nhóm chạy liền một lượt.
const gateStage = (g) => ([1, 2, 2.5].includes(Number(g)) ? 'plan' : 'execute');
const rerunTitle = (g) => (gateStage(g) === 'plan' ? 'Chạy lại cả phần lập kế hoạch từ bước 1; kết quả mới cập nhật các bước hiện tại.'
  : 'Chạy lại cả phần thực hiện và kiểm chứng từ bước 3 trên kế hoạch được duyệt; kết quả mới cập nhật các bước hiện tại.');
const rerunBtn = (gate, text = gateStage(gate) === 'plan' ? 'Lập kế hoạch lại từ bước 1' : 'Thực hiện lại từ bước 3') =>
  `<button type="button" class="btn rerun" data-action="rerun-gate" data-gate="${esc(gate)}" title="${esc(rerunTitle(gate))}">${esc(text)}</button>`;
function gateStep(g, rerun = false) {
  const state = GATE_STATE[g.status] || 'idle';
  const evidence = g.evidence?.text;
  const functional = g.evidence?.functional;
  return `<div class="step gate${subClass(g.gate)} st-${state}" data-pos="${gatePos(g.gate)}"><div class="line1"><b>${gateName(g.gate)}</b>
      ${tag(state, g.status === 'passed' ? 'OK' : g.status === 'blocked' ? 'Blocked' : g.status)}
      ${rerun ? rerunBtn(g.gate) : ''}</div>
    ${g.public_reason ? `<div style="margin-top:4px">${esc(g.public_reason)}</div>` : ''}
    ${g.internal_reason ? `<div class="meta">${esc(g.internal_reason)}</div>` : ''}
    ${functional ? det(`g${g.id}:fn`, `Functional check: ${esc(functional.probe_id || 'no probe')} · ${functional.passed ? 'passed' : 'failed'}`, `<pre>${esc(JSON.stringify(functional, null, 2))}</pre>`) : ''}
    ${evidence ? det(`g${g.id}:diag`, 'Diagnostics', `<pre>${esc(evidence)}</pre>`) : ''}</div>`;
}

function rollbackStep(run, live) {
  const r = run.rollback;
  const [state, label] = r ? ROLLBACK_STATE[r.outcome] || ['idle', r.outcome] : live ? ['run', 'đang hoàn tác'] : ['idle', 'chưa có kết quả'];
  return `<div class="timeline"><div class="step gate st-${state}" data-pos="1"><div class="line1"><b>Hoàn tác thay đổi</b>${tag(state, label)}</div>
    ${r?.revert ? `<div style="margin-top:4px">Nhánh revert: <code>${esc(r.revert.branch)}</code> (${esc(r.revert.commits?.length)} commit). Mở PR từ nhánh này để gỡ thay đổi khỏi web.</div>` : ''}
    ${r?.detail ? `<div class="meta">${esc(r.detail)}</div>` : ''}</div></div>`;
}

function renderPipeline(trace) {
  const projection = projectPipeline(trace);
  const root = trace.root;
  const last = projection.runs.at(-1);
  if (last?.trigger === 'rollback') return `<h2>Tiến trình hiện tại · hoàn tác</h2>
    <p class="meta">Kết quả xử lý trước khi hoàn tác được giữ trong lịch sử bên dưới.</p>${rollbackStep(last, root.live)}`;
  const labels = { ok: 'Đạt kiểm tra', bad: 'Chưa đạt · cần xử lý', run: 'Đang xử lý', queued: 'Đang chờ worker chạy lại', unfinished: 'Chưa có kết luận của bước', wait: 'Chưa thực hiện' };
  const current = projection.steps.find(s => s.state === 'run' || s.state === 'queued')
    || projection.steps.find(s => s.state === 'bad');
  const status = current ? `${current.title}: ${labels[current.state]}.` : root.status === 'waiting_authorization'
    ? 'Kế hoạch chờ được cho phép trước khi thực hiện.' : 'Xem kết luận ở từng bước và trạng thái yêu cầu bên trên.';
  const shortNames = { 1: 'Yêu cầu', 2: 'Phạm vi', 2.5: 'Soát kế hoạch', 3: 'Sửa code', 4: 'Kiểm tra code', 5: 'Kiểm chứng', 5.5: 'Rủi ro' };
  return `<h2>Tiến trình hiện tại</h2><p class="flow-summary" role="status">${esc(status)}</p>
    <p class="meta">${projection.runs.length} lượt xử lý đã ghi nhận. Chạy lại sẽ cập nhật kết quả tại các bước dưới; các lần thử cũ được giữ trong lịch sử.</p>
    <nav class="prog pipeline-nav" aria-label="Các bước xử lý">${projection.steps.map(s => `<a class="seg ${s.state === 'queued' ? 'wait' : s.state}" href="#pipeline-title-${s.gate}" title="${esc(s.title)}: ${esc(labels[s.state])}"${s.state === 'run' ? ' aria-current="step"' : ''}>${gatePos(s.gate)} · ${shortNames[s.gate]}</a>`).join('')}</nav>
    <div class="pipeline">${projection.steps.map(s => {
      const latest = s.calls.map(group => callStep(group.current.evidence || {})).join('');
      const previous = s.calls.flatMap(group => group.previous);
      const prior = [...s.previousResults.map(g => gateStep(g)), ...previous.map(c => callStep(c.evidence || {}))].join('');
      const g = s.result;
      const rerun = s.state === 'bad' && root.rerun_stage === s.stage ? rerunBtn(s.gate) : '';
      const state = s.state === 'queued' ? 'warn' : ['unfinished', 'wait'].includes(s.state) ? 'idle' : s.state;
      const activity = s.state === 'run' ? `<div class="activity-task st-run" data-live-task="${s.gate}" role="status">
        <div class="line1"><b>Nhiệm vụ đang thực hiện</b>${tag('run', 'Đang xử lý')}</div>
        <p class="meta">Đang chờ worker gửi kết quả của bước này.</p></div>` : '';
      return `<section class="pipeline-step st-${state}" data-step="${s.gate}" aria-labelledby="pipeline-title-${s.gate}"${s.state === 'run' ? ' aria-current="step"' : ''}>
        <div class="line1"><h3 id="pipeline-title-${s.gate}">${gateName(s.gate)}</h3>${tag(state, labels[s.state])}${rerun}</div>
        <p class="meta step-purpose">${esc(s.detail)}</p>
        ${s.run ? `<div class="meta">Kết quả từ lượt #${esc(s.run.id)} · ${fmt(s.run.created_at)}</div>` : ''}
        ${g?.public_reason ? `<p class="step-reason">${esc(g.public_reason)}</p>` : ''}
        ${s.state === 'queued' ? `<p class="step-reason">Kết quả lần trước nằm trong lịch sử. Worker chưa nhận lượt chạy mới.</p>` : ''}
        ${latest || activity ? `<div class="step-tasks">${latest}${activity}</div>` : s.state === 'ok' ? '<p class="meta">Bước này đã có kết luận; không có lượt gọi AI nào được ghi nhận.</p>' : ''}
        ${g?.evidence?.functional ? det(`step-${s.gate}:functional`, 'Bằng chứng kiểm chứng hành vi', `<pre>${esc(JSON.stringify(g.evidence.functional, null, 2))}</pre>`) : ''}
        ${g?.internal_reason || g?.evidence?.text ? det(`step-${s.gate}:diagnostic`, 'Chi tiết chẩn đoán của bước', `<pre>${esc(g.internal_reason || '')}\n${esc(g.evidence?.text || '')}</pre>`) : ''}
        ${prior ? det(`step-${s.gate}:previous`, `Các lần thử trước trong bước này (${s.previousResults.length + previous.length} bản ghi)`, prior, { cls: 'attempt-history' }) : ''}
      </section>`;
    }).join('')}</div>`;
}

function renderAttemptHistory(trace) {
  const runs = projectPipeline(trace).runs;
  if (!runs.length) return '';
  const body = runs.map((run, i) => {
    const [state, label] = runState(run, i === runs.length - 1 && trace.root.live);
    const gates = run.gates || [], calls = run.calls || [];
    const content = `<p class="meta">${fmt(run.created_at)} → ${fmt(run.updated_at)} · worker ${esc(run.worker_id || '—')} · ngân sách lượt này: ${budgetCell(run.budget_used, run.budget_limit)}</p>
      ${gates.map(g => gateStep(g)).join('')}${calls.map(c => callStep(c.evidence || {})).join('')}
      ${run.trigger === 'rollback' ? rollbackStep(run, trace.root.live && i === runs.length - 1) : ''}`;
    return det(`run-${run.id}:history`, `<b>Lượt #${esc(run.id)} · ${esc(runTitle(run))}</b> ${tag(state, label)} · ${calls.length} lượt gọi AI`, content);
  }).join('');
  return det('all-attempts', `<b>Lịch sử các lần xử lý (${runs.length})</b>`, `<p class="meta">Đây là bằng chứng của các lần thử, không phải nhiều tiến trình đang chạy song song. Chi phí tích lũy vẫn gồm cả các lần thử cũ.</p>${body}`, { cls: 'trace-history' });
}

function eventState(e) {
  const t = `${e.event_type} ${e.transition || ''}`;
  if (/blocked|critical|rejected|cancel|budget_exhausted|waiting_admin|rollback_failed/.test(t)) return 'bad';
  if (/waiting|review|clarif|rollback/.test(t)) return 'warn';
  return 'ok';
}

const PROB_LABEL = {
  clear: 'rõ', vague: 'mơ hồ', too_broad: 'quá rộng', safe: 'an toàn', system_attack: 'tấn công hệ thống',
  abuse_hate: 'xúc phạm', sexual: 'tình dục', violence_self_harm: 'bạo lực/tự hại', politics_religion: 'chính trị/tôn giáo',
  drugs_advice: 'chất cấm/thuốc', cheating_spam: 'gian lận/spam',
};
const pct = (p) => `${Math.round(Number(p) * 100)}%`;
// Top 3 xác suất, bỏ nhãn < 1%.
const topProbs = (probs = {}) => Object.entries(probs).sort((a, b) => b[1] - a[1]).filter(([, p]) => p >= 0.01)
  .slice(0, 3).map(([k, p]) => `${PROB_LABEL[k] || k} ${pct(p)}`).join(' · ');
const shadowTag = (x) => (x?.shadow ? ' <span class="pill">shadow — chỉ ghi log</span>' : '');

function classifiedRows(d) {
  const rows = [];
  if (d.model) rows.push(['Model', esc(d.model)]);
  if (d.clarity) rows.push(['Độ rõ', `${esc(topProbs(d.clarity.probs))}${shadowTag(d.clarity)}`]);
  if (d.danger) {
    const labels = (d.danger.labels || []).map((k) => PROB_LABEL[k] || k);
    rows.push(['Nguy hiểm', `${esc(topProbs(d.danger.probs))}${labels.length ? ` → soát: ${esc(labels.join(', '))}` : ''}${shadowTag(d.danger)}`]);
  }
  if (d.rules) rows.push(['Luật cứng', d.rules.needed ? `${esc(d.rules.mode === 'split' ? 'quá rộng' : 'mơ hồ')}: ${esc((d.rules.reasons || []).join('; '))}` : 'rõ']);
  if (d.clarify) rows.push(['Làm rõ', d.clarify.needed ? `có (${esc(d.clarify.mode)}) · nguồn: ${esc((d.clarify.source || []).join(', ') || '—')}` : 'không']);
  return rows;
}

// Chi tiết nội bộ: JSON → vài dòng đọc được + JSON gốc gập lại; text thường giữ nguyên (xuống dòng được).
function eventDetail(e) {
  let data;
  try { data = JSON.parse(e.internal_detail); } catch { data = null; }
  if (!data || typeof data !== 'object') return `<div class="meta detail">${esc(e.internal_detail)}</div>`;
  const flat = Object.entries(data).filter(([, v]) => v !== null && typeof v !== 'object');
  const rows = e.event_type === 'request_classified' ? classifiedRows(data) : flat.slice(0, 6).map(([k, v]) => [esc(k), esc(v)]);
  const covered = e.event_type !== 'request_classified' && flat.length === Object.keys(data).length && flat.length <= 6;
  return `${rows.length ? `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>` : ''}
    ${covered ? '' : `<details class="raw"><summary>raw JSON</summary><pre>${esc(JSON.stringify(data, null, 2))}</pre></details>`}`;
}

function renderEvents(events) {
  const shown = events.filter(e => !TECHNICAL_EVENTS.has(e.event_type));
  if (!events.length) return '<p class="meta">Chưa có diễn biến xử lý.</p>';
  const row = (e, i) => {
    const state = eventState(e);
    const actor = { admin: 'Quản trị viên', worker: 'Worker', system: 'Hệ thống', requester: 'Người gửi' }[e.actor_type] || 'Hệ thống';
    return `<li class="event-row st-${state}"><div class="line1"><b>${esc(describeEvent(e))}</b>
        <span class="meta">${fmt(e.created_at)} · ${esc(actor)}</span></div>
      ${e.public_message ? `<div style="margin-top:4px">${esc(e.public_message)}</div>` : ''}
      ${det(`event-${e.run_id ?? ''}-${e.created_at}-${e.event_type}-${i}`, 'Thông tin kỹ thuật của sự kiện', `<div class="meta">${esc(e.event_type)} · ${esc(e.transition || 'không đổi trạng thái')} · ticket #${esc(e.ticket_id)} · ${esc(e.actor_id || '—')}</div>${e.internal_detail ? eventDetail(e) : ''}`)}</li>`;
  };
  const recent = shown.slice(-6), earlier = shown.slice(0, -6), technical = events.filter(e => TECHNICAL_EVENTS.has(e.event_type));
  return `<ol class="event-list">${recent.map(row).join('')}</ol>
    ${earlier.length ? det('earlier-events', `Diễn biến trước đó (${earlier.length})`, `<ol class="event-list">${earlier.map(row).join('')}</ol>`) : ''}
    ${technical.length ? det('technical-events', `Nhật ký worker và bước xử lý (${technical.length})`, `<ol class="event-list">${technical.map(row).join('')}</ol>`, { cls: 'raw' }) : ''}`;
}

// ─── Kế hoạch ───
const TIER_TEXT = {
  surface: 'Bề mặt: AI tự làm và tự kiểm tra, không cần duyệt',
  protected: 'Được bảo vệ: cần admin cho phép trước khi làm',
  core: 'Lõi: chỉ con người được sửa',
};
const RISK_TEXT = { low: 'thấp', medium: 'trung bình', high: 'cao' };
const CAP_TEXT = {
  'public.ui': 'giao diện công khai', 'generated.context': 'code sinh tự động', features: 'trình bày tính năng',
  content: 'nội dung', experiments: 'thí nghiệm', quiz: 'câu hỏi', 'content.write': 'dịch vụ nội dung dùng chung',
  'integration.write': 'tích hợp dịch vụ ngoài', 'core.server': 'lõi server',
};
const CHILD_STATE = {
  queued: ['idle', 'chờ làm'], waiting_authorization: ['warn', 'chờ cho phép'], human_owned: ['warn', 'người làm'],
  done: ['ok', 'xong'], failed: ['bad', 'lỗi'], cancelled: ['bad', 'đã dừng'], invalidated: ['idle', 'bỏ (kế hoạch cũ)'],
};
const code = (s) => `<code>${esc(s)}</code>`;
// Mức rủi ro cổng 5.5 của lượt gần nhất có đánh giá.
const riskOf = (runs) => [...runs].reverse().flatMap((r) => r.gates || [])
  .find((g) => Number(g.gate) === 5.5)?.evidence?.risk_level;
const capText = (c) => `${esc(CAP_TEXT[c] || c)} ${code(c)}`;

function planApproval(p, root) {
  if (p.tier === 'surface') return ['ok', 'tự chạy, không cần duyệt'];
  if (p.tier === 'core') return ['idle', 'chỉ con người làm'];
  if (p.authorized) return ['ok', 'admin đã cho phép'];
  return root.status === 'waiting_authorization' ? ['warn', 'chờ admin cho phép'] : ['idle', 'chưa được cho phép'];
}

function stepState(child, root, execution, order) {
  if (['pre_pr_ready', 'pre_pr_review', 'rolled_back', 'revert_ready', 'rollback', 'rolling_back'].includes(root.phase)
    && child?.status !== 'failed') return root.phase.startsWith('pre_pr') ? ['ok', 'đã làm, qua kiểm tra'] : ['idle', 'đã hoàn tác'];
  const task = execution?.calls.find(g => Number(g.current.evidence?.child) === Number(order))?.current;
  // A completed model call cannot identify which child the worker is executing now.
  if (root.live && task && (task.evidence?.edits?.applied || execution?.state === 'ok')) return ['warn', 'đã sửa code; chờ kết luận kiểm chứng'];
  return CHILD_STATE[child?.status] || ['idle', child?.status || 'chưa thực hiện'];
}

function renderPlan(p, root, children, trace) {
  if (!p) return `<section id="current-plan"><h2>Kế hoạch hiện hành</h2><p class="meta">${root.status === 'queued' && root.phase === 'needs_replan' ? 'Đang chờ lập kế hoạch mới; kế hoạch trước đã hết hiệu lực.' : 'Chưa có kế hoạch hiện hành.'}</p></section>`;
  const plan = p.plan || {};
  const [approvalState, approval] = planApproval(p, root);
  const waiting = root.status === 'waiting_authorization' && !p.authorized && p.tier === 'protected';
  const mine = children.filter(c => Number(c.plan_revision) === Number(p.revision));
  const steps = (plan.steps || []).slice().sort((a, b) => a.order - b.order);
  const extra = mine.filter(c => !steps.some(st => Number(st.order) === Number(c.order)));
  const execution = projectPipeline(trace).steps.find(s => s.gate === 3);
  return `<section id="current-plan"><h2>Kế hoạch hiện hành</h2>
    <div class="blk plan">
      <div class="plan-head"><b>${esc(plan.goal || '')}</b>${tag(approvalState, approval)}</div>
      <dl class="kv">
        ${plan.read_only_admin_verification ? '<dt>Kiểm tra trang admin</dt><dd>Chỉ quan sát giao diện; không cấp quyền sửa vùng đặc quyền.</dd>' : ''}
        <dt>Mức duyệt</dt><dd>${esc(TIER_TEXT[p.tier] || p.tier)}</dd>
        <dt>Rủi ro</dt><dd>${esc(RISK_TEXT[plan.risk || p.risk] || plan.risk || p.risk || '—')}</dd>
        <dt>File được sửa</dt><dd>${(plan.allowed_scope || p.allowed_scope || []).map(code).join(', ') || '—'}</dd>
        <dt>Quyền</dt><dd>${(plan.capabilities || p.capabilities || []).map(capText).join(', ') || '—'}</dd>
        <dt>Bản kế hoạch</dt><dd>${esc(p.revision)}</dd>
      </dl>
      ${plan.grounding ? `<details><summary>Dẫn chứng code tại ${esc(plan.grounding.sha)}</summary>${plan.grounding.evidence.map(e => `<div class="blk"><b>${esc(e.target)}</b><pre>${esc(e.quote)}</pre><div>Trước: ${esc(e.before)}</div><div>Sau: ${esc(e.after)}</div><div>Kiểm chứng: ${esc(e.verify)}</div></div>`).join('')}</details>` : ''}
      <div class="sub">Các bước</div>
      <ol class="plan-steps">${steps.map(st => {
        const [state, label] = stepState(mine.find(c => Number(c.order) === Number(st.order)), root, execution, st.order);
        return `<li class="st-${state}"><div class="line1"><b>${esc(st.title)}</b>${tag(state, label)}</div>
          <div class="meta">Sửa ${(st.allowed_scope || []).map(code).join(', ')} · quyền ${capText(st.capability)} · rủi ro ${esc(RISK_TEXT[st.risk] || st.risk)}</div>
          ${st.acceptance?.length ? `<div class="meta">Đạt khi: ${st.acceptance.map(esc).join('; ')}</div>` : ''}</li>`;
      }).join('')}${extra.map(c => {
        const [state, label] = CHILD_STATE[c.status] || ['idle', c.status];
        return `<li class="st-${state}"><div class="line1"><b>${esc(c.title)}</b>${tag(state, label)}</div>
          <div class="meta">AI tự sửa thêm sau khi kiểm tra chưa đạt</div></li>`;
      }).join('')}</ol>
      ${waiting ? (ui.authorizeConfirm === p.plan_hash
        ? `<div class="confirm" role="alertdialog" aria-label="Cho phép thực hiện kế hoạch">
             <div class="confirm-title">Cho phép AI Board thực hiện kế hoạch này?</div>
             <div class="meta">Worker sẽ chạy các cổng 3 → 5.5 trên kế hoạch đã duyệt.</div>
             <div class="row" style="margin-top:8px">
               <button class="btn ok" data-action="authorize-go" data-root="${esc(root.id)}" data-hash="${esc(p.plan_hash)}">Đồng ý, thực hiện</button>
               <button class="btn" data-action="authorize-close">Thôi</button>
             </div>
           </div>`
        : `<button class="btn ok" data-action="authorize-ask" data-hash="${esc(p.plan_hash)}">Cho phép thực hiện kế hoạch</button>`) : ''}
        <span class="meta">${esc(ui.authorizeMsg || '')}</span>
    </div></section>`;
}

async function authorizePlan(btn) {
  btn.disabled = true;
  try {
    await post(`/api/admin/ai-board/tickets/${encodeURIComponent(btn.dataset.root)}/authorize-plan`, { plan_hash: btn.dataset.hash });
    ui.authorizeConfirm = null;
    ui.authorizeMsg = '';
    ui.flash = 'Đã cho phép; worker sẽ nhận ở lượt tới.';
  } catch (e) {
    ui.authorizeMsg = `Không cho phép được: ${e.message}`;
  }
  await refresh();
}

// ─── Hoàn tác / hủy: 2 bước xác nhận (đọc hậu quả → gõ số yêu cầu) ───
function renderActions(request, trace) {
  const root = trace?.root;
  const candidate = trace?.candidate;
  const canRollback = root?.can_rollback;
  // Đã có thay đổi (candidate) → chỉ hoàn tác; chưa làm hoặc đang làm → chỉ hủy.
  const canCancel = !candidate && !['rejected', 'cancelled', 'done'].includes(request.status);
  const canRetryTransient = root?.phase === 'transient_blocked';
  if (!canRollback && !canCancel && !canRetryTransient) return ui.flash ? `<div class="flash">${esc(ui.flash)}</div>` : '';
  const busy = root?.live;
  return `<div class="actions">
      ${canRetryTransient ? `<button class="btn ok" data-action="retry-transient" data-root="${esc(root.id)}"
        title="Lỗi hạ tầng thoáng qua (GPU dùng chung); chạy lại khi bạn thấy GPU rảnh">Chạy lại ngay</button>` : ''}
      ${canRollback ? `<button class="btn danger-outline" data-action="rollback" ${busy ? 'disabled' : ''}
        title="${busy ? 'AI Board đang xử lý; chờ lượt này xong.' : 'Gỡ thay đổi AI Board đã làm cho yêu cầu này'}">Hoàn tác thay đổi</button>` : ''}
      ${canCancel ? '<button class="btn danger-outline" data-action="cancel">Hủy yêu cầu</button>' : ''}
      ${ui.flash ? `<span class="flash">${esc(ui.flash)}</span>` : ''}
    </div>
    ${ui.confirm ? renderConfirm(request, candidate) : ''}`;
}

async function retryTransient(btn) {
  btn.disabled = true;
  try {
    await post(`/api/admin/ai-board/tickets/${encodeURIComponent(btn.dataset.root)}/retry-transient`, {});
    ui.flash = 'Đã đưa yêu cầu về hàng đợi; worker sẽ nhận ở lượt tới.';
  } catch (e) {
    ui.flash = `Không chạy lại được: ${e.message}`;
    btn.disabled = false;
  }
  await refresh();
}

function renderConfirm(request, candidate) {
  const rollback = ui.confirm === 'rollback';
  const files = [...new Set((candidate?.commits || []).flatMap(c => c.files || []))];
  const consequences = rollback ? [
    `AI Board kiểm tra nhánh ${code(candidate?.branch)} (${esc(candidate?.commits?.length)} commit, sửa ${files.map(code).join(', ') || '—'}).`,
    'Nếu nhánh chưa được merge: xóa nhánh. Web đang chạy không đổi vì thay đổi chưa từng lên web.',
    'Nếu đã merge vào dev/main: tạo nhánh revert mới. Cần người mở PR và merge nhánh đó để gỡ thay đổi khỏi web.',
  ] : [
    'Yêu cầu chuyển sang "Từ chối", AI Board dừng mọi lượt đang chạy của yêu cầu này.',
    'AI Board chưa tạo thay đổi nào cho yêu cầu này nên không có gì phải gỡ.',
    'Không mở lại được; muốn làm tiếp thì học sinh phải gửi yêu cầu mới.',
  ];
  const verb = rollback ? 'Hoàn tác' : 'Hủy yêu cầu';
  return `<div class="confirm" role="alertdialog" aria-label="${verb} yêu cầu #${esc(request.id)}">
    <div class="confirm-title">${rollback ? 'Hoàn tác thay đổi' : 'Hủy'} của yêu cầu #${esc(request.id)} · bước ${ui.step}/2</div>
    ${ui.step === 1 ? `<ul>${consequences.map(c => `<li>${c}</li>`).join('')}</ul>
      <div class="row"><button class="btn danger" data-action="confirm-next">Tôi hiểu, tiếp tục</button>
        <button class="btn" data-action="confirm-close">Thôi</button></div>`
    : `<label for="confirm-input">Gõ <b>#${esc(request.id)}</b> để xác nhận ${verb.toLowerCase()}</label>
      <div class="row"><input id="confirm-input" autocomplete="off" spellcheck="false" placeholder="#${esc(request.id)}">
        <button class="btn danger" id="confirm-go" data-action="confirm-go" disabled>${verb}</button>
        <button class="btn" data-action="confirm-close">Thôi</button></div>
      ${ui.msg ? `<div class="err">${esc(ui.msg)}</div>` : ''}`}
  </div>`;
}

const confirmed = () => ($('#confirm-input')?.value || '').trim().replace(/^#/, '') === String(REQUEST_ID);

async function submitConfirm(btn) {
  if (!confirmed()) return;
  btn.disabled = true;
  const typed = $('#confirm-input').value.trim();
  try {
    if (ui.confirm === 'rollback') {
      const r = await post(`/api/admin/ai-board/requests/${REQUEST_ID}/rollback`, { confirm: typed });
      ui.flash = r.duplicate ? 'Yêu cầu hoàn tác đã được gửi trước đó.' : 'Đã gửi yêu cầu hoàn tác; worker sẽ nhận ở lượt tới.';
    } else {
      await post(`/api/requests/${REQUEST_ID}/status`, { status: 'rejected', note: 'Quản trị viên đã hủy yêu cầu.', confirm: typed });
      ui.flash = 'Đã hủy yêu cầu.';
    }
    ui.confirm = null;
    ui.msg = '';
  } catch (e) {
    ui.msg = `Chưa thực hiện được: ${e.message}`;
    btn.disabled = false;
  }
  await refresh();
}

function renderAiBoard(t) {
  const x = t.totals || {};
  const unit = x.budget_unit === 'k_tokens' ? 'k tokens' : 'GPU-s';
  const root = t.root;
  const runs = t.runs || [];
  const [state, label] = ROOT_STATUS[root.status] || ['idle', root.status];
  const shownState = root.live ? 'run' : state;
  return `
    <h2>AI Board</h2>
    <div class="blk status st-${shownState}"><div class="line1"><b>Xử lý yêu cầu</b>${tag(shownState, root.live ? 'Đang xử lý' : label)}
        <span>${esc(root.phase_label)}</span>${root.live ? '<span class="pulse" title="Worker đang giữ yêu cầu này"></span>' : ''}</div>
      ${root.public_note ? `<div style="margin-top:4px">${esc(root.public_note)}</div>` : ''}
      ${root.internal_reason ? `<div class="meta">${esc(root.internal_reason)}</div>` : ''}
      ${t.candidate ? `<div class="meta" style="margin-top:4px">Nhánh thay đổi: ${code(t.candidate.branch)} · ${esc(t.candidate.commits?.length)} commit</div>` : ''}
      ${t.pull_request && /^https:\/\/github\.com\//.test(t.pull_request.url) ? `<div class="meta" style="margin-top:4px">PR vào ${code(t.pull_request.base)}:
        <a href="${esc(t.pull_request.url)}" target="_blank" rel="noopener noreferrer">#${esc(t.pull_request.number)}</a>
        · head ${code(String(t.pull_request.head_sha).slice(0, 10))}${riskOf(runs) ? ` · rủi ro ${code(riskOf(runs))}` : ''}</div>` : ''}</div>
    <div class="blk strip">
      <span>Giới hạn mỗi lượt xử lý: <b>${fmtNum(x.budget_limit)}</b> ${unit}</span>
      <span>Đã dùng qua mọi lượt: <b>${fmtNum(x.budget_used)}</b> ${unit}</span>
      <span>GPU đã đo: <b>${esc(x.gpu_s)}</b> giây</span>
      <span>Token vào / ra: <b>${fmtNum(x.tokens_in)} / ${fmtNum(x.tokens_out)}</b></span>
      <span>Gọi AI qua mọi lượt: <b>${esc(x.calls)}</b></span>
      <span>Lần nạp model: <b>${esc(x.model_loads)}</b></span>
      <span>Lần gọi lại model: <b>${esc(x.retries)}</b></span>
    </div>
    ${renderPlan(t.plan, root, t.children || [], t)}
    ${renderPipeline(t)}
    ${renderAttemptHistory(t)}
    <h2>Diễn biến xử lý</h2>
    ${renderEvents(t.events || [])}
  `;
}

// Trace cho admin: nhánh · commit ngắn · PR. Bấm nhánh/commit để copy. Server chỉ trả ở API admin.
function traceLine(ref) {
  if (!ref?.branch && !ref?.head_sha) return '';
  const part = (value, label) => (value ? `<button type="button" class="trace-copy" data-copy="${esc(value)}" title="Bấm để copy">${esc(label)}</button>` : '');
  return `<div class="trace-ref">${[part(ref.branch, ref.branch), part(ref.head_sha, String(ref.head_sha).slice(0, 7)),
    ref.pr_url ? `<a href="${esc(ref.pr_url)}" target="_blank" rel="noopener">PR #${esc(ref.pr_number)}</a>` : ''].filter(Boolean).join(' · ')}</div>`;
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.trace-copy');
  if (!btn) return;
  try { await navigator.clipboard.writeText(btn.dataset.copy); btn.classList.add('copied'); setTimeout(() => btn.classList.remove('copied'), 1200); } catch { /* clipboard bị chặn: vẫn đọc được */ }
});

function render() {
  const previewNodes = [...(document.querySelector('#private-preview')?.childNodes || [])];
  if (!view) return;
  const previewNodes=[...(document.querySelector('#private-preview')?.childNodes||[])];
  const { thread, decisions, trace } = view;
  const r = thread.request;
  const live = trace?.root?.live;
  document.title = `Yêu cầu #${r.id} · Tizia`;
  patchHtml($('#app'), `
    <header class="request-head">
    <a class="back" href="/admin.html#requests">Về trang quản trị</a>
    <h1>Yêu cầu #${esc(r.id)}: ${esc(r.title)}</h1>
    ${traceLine(trace?.trace_ref)}
    <div class="meta">${r.type === 'self' ? 'AI Board tự đề xuất' : `${esc(r.domain)} · ${esc(r.type)} · ${esc(r.student)}`}
      · <span class="pill">${esc(r.status)}</span> · tạo ${fmt(r.created_at)}
      ${live ? '· <span class="auto live">tự cập nhật mỗi 2 giây</span>' : ''}</div>
    ${renderActions(r, trace)}
    </header>
    <section id="private-preview" class="blk private-preview" aria-label="Bản xem riêng của yêu cầu"></section>
    <h2>Trao đổi</h2>
    ${renderThread(thread.messages || [])}
    ${renderDecisions(decisions)}
    ${trace ? renderAiBoard(trace) : '<h2>AI Board</h2><div class="blk meta">Yêu cầu này chưa có ticket AI Board.</div>'}
  `);
  syncOpen();
  const previewHost=document.querySelector('#private-preview');
  previewHost?.append(...previewNodes);
  mountPrivatePreview(previewHost,REQUEST_ID);
  const go = $('#confirm-go');
  if (go) go.disabled = !confirmed(); // chữ đã gõ còn nguyên sau khi vá DOM
}

// Áp ui.open lên mọi <details data-k>; chưa ai bấm thì theo mặc định (data-dopen). Vá DOM theo vị trí nên không tin `open` cũ.
function syncOpen() {
  for (const d of document.querySelectorAll('#app details[data-k]')) {
    const want = d.dataset.k in ui.open ? ui.open[d.dataset.k] : d.hasAttribute('data-dopen');
    if (d.open !== want) d.open = want;
  }
}
// Người dùng bấm summary → ghi trạng thái sẽ có sau khi bấm (click chạy trước khi trình duyệt lật `open`).
document.addEventListener('click', (e) => {
  const d = e.target.closest('#app summary')?.parentElement;
  if (d?.dataset.k) ui.open[d.dataset.k] = !d.open;
});

async function refresh() {
  try {
  const [thread, decisions, trace] = await Promise.all([
    api(`/api/requests/${REQUEST_ID}/thread`),
    api(`/api/requests/${REQUEST_ID}/decisions`),
    api(`/api/admin/ai-board/requests/${REQUEST_ID}/trace`),
  ]);
  if (!thread.ok) {
    stopLiveTrace();
    $('#app').innerHTML = `<p class="err">Không tải được yêu cầu #${REQUEST_ID} (${esc(thread.data?.error || thread.status)}).</p>`;
    return false;
  }
  // Never retain privileged trace data after a role/auth denial.
  const retainedTrace = trace.status >= 500 ? view?.trace : null;
  view = { thread: thread.data, decisions: decisions.data?.decisions || [], trace: trace.ok ? trace.data : retainedTrace };
  if (!trace.ok && retainedTrace) stopLiveTrace();
  if (ui.flash === ui.traceError) ui.flash = '';
  ui.traceError = trace.ok ? '' : `Không tải được tiến trình (${trace.status}). Đã dừng hiệu ứng; đang chờ kết nối lại.`;
  if (ui.traceError) ui.flash = ui.traceError;
  if (view.trace?.root?.live && Number(view.trace.root.lease_expires_at) <= Date.now()) view.trace.root.live = false;
  gateNames = view.trace?.gate_names || {};
  render();
  return true;
  } catch (e) {
    stopLiveTrace();
    if (e.message !== 'login') {
      ui.traceError = 'Mất kết nối cập nhật. Đã dừng hiệu ứng; kết quả cuối cùng được giữ để đối chiếu.';
      ui.flash = ui.traceError;
      if (view) render();
    }
    throw e;
  }
}

function stopLiveTrace() {
  if (view?.trace?.root) view.trace.root.live = false;
}

// Đang có worker xử lý thì hỏi 2 giây/lần, còn lại 10 giây; tạm dừng khi tab ẩn hoặc admin đang xác nhận.
let timer = null;
function schedule() {
  clearTimeout(timer);
  const root = view?.trace?.root;
  const active = root && (root.live || ['queued', 'running'].includes(root.status));
  timer = setTimeout(tick, active ? 2000 : 10000);
}
async function tick() {
  if (view?.trace?.root?.live && Number(view.trace.root.lease_expires_at) <= Date.now()) {
    stopLiveTrace();
    render();
  }
  if (!document.hidden && !ui.confirm) await refresh().catch(e => { if (e.message !== 'login') console.warn(e); });
  schedule();
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn || btn.disabled) return;
  const action = btn.dataset.action;
  if (action === 'rollback' || action === 'cancel') Object.assign(ui, { confirm: action, step: 1, msg: '', flash: '' });
  else if (action === 'confirm-next') ui.step = 2;
  else if (action === 'confirm-close') ui.confirm = null;
  else if (action === 'confirm-go') return submitConfirm(btn);
  else if (action === 'authorize-ask') { ui.authorizeConfirm = btn.dataset.hash; ui.authorizeMsg = ''; }
  else if (action === 'authorize-close') { ui.authorizeConfirm = null; }
  else if (action === 'authorize-go') return authorizePlan(btn);
  else if (action === 'retry-transient') return retryTransient(btn);
  else if (action === 'rerun-gate') {
    btn.disabled = true;
    post(`/api/admin/ai-board/requests/${REQUEST_ID}/rerun-gate`, { gate: Number(btn.dataset.gate) })
      .then((r) => { ui.flash = `Đã xếp hàng chạy lại ${r.from_gate === 1 ? 'phần lập kế hoạch từ bước 1' : 'phần thực hiện và kiểm chứng từ bước 3'}. Kết quả mới sẽ cập nhật tại các bước hiện tại.`; })
      .catch(e => { ui.flash = `Không chạy lại được: ${e.message}`; }).finally(async () => { await refresh(); schedule(); });
    return;
  }
  render();
  if (action === 'confirm-next') $('#confirm-input')?.focus();
});
document.addEventListener('input', e => {
  if (e.target.id === 'confirm-input') $('#confirm-go').disabled = !confirmed();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'confirm-input' && confirmed()) submitConfirm($('#confirm-go'));
});

if (window.top !== window) {
  document.documentElement.classList.add('embedded');
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (ui.confirm) { ui.confirm = null; render(); return; } // Esc đóng bảng xác nhận trước, rồi mới tới cửa sổ
    window.parent.document.getElementById('req-dialog')?.close();
  });
}

installLightbox();

(async () => {
  if (!REQUEST_ID) { $('#app').innerHTML = '<p class="err">Thiếu id yêu cầu.</p>'; return; }
  try { if (await refresh()) schedule(); }
  catch (e) { if (e.message !== 'login') $('#app').innerHTML = `<p class="err">Lỗi: ${esc(e.message)}</p>`; }
})();
