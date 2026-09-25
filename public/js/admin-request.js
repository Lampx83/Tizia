// Chi tiết 1 yêu cầu (cửa sổ con trên trang admin): nội dung, trao đổi, kế hoạch, tiến độ trực tiếp và toàn bộ
// vết AI Board — phiên xử lý (worker) theo từng lượt, cổng, từng lần gọi model, sự kiện. Tự cập nhật bằng cách
// vá DOM (không vẽ lại cả trang). Mọi giá trị từ học sinh/model là dữ liệu không tin cậy → luôn qua esc().
import { patchHtml } from './dom-morph.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (t) => t ? new Date(t).toLocaleString('vi-VN', { hour12:false }) : '—';
const fmtNum = (n) => (n == null) ? '—' : Number(n).toLocaleString('vi-VN');
const secs = (ms) => ms == null ? '—' : (ms / 1000).toFixed(1);
const elapsed = (t) => { const s = Math.max(0, Math.round((Date.now() - t) / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

const REQUEST_ID = Number(new URLSearchParams(location.search).get('id'));
// Trạng thái giao diện riêng của admin (không phải dữ liệu server): bảng xác nhận đang mở ở bước nào.
const ui = { confirm: null, step: 1, msg: '', flash: '' };
let view = null;
let gateNames = {}; // tên cổng lấy từ trace (contract.gates.names của server)

async function api(path) {
  const r = await fetch(path, { credentials:'same-origin' });
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

// Màu theo trạng thái: ok (xanh) · warn (cam) · bad (đỏ) · run (đang chạy, nhấp nháy) · idle (xám).
const RUN_STATE = { ready_for_pr: 'ok', needs_review: 'warn', blocked: 'bad' };
const CALL_STATE = { ok: 'ok', retry: 'warn', error: 'bad', http_error: 'bad', timeout: 'bad' };
const GATE_STATE = { passed: 'ok', blocked: 'bad' };
const RUN_LABEL = { ready_for_pr: 'sẵn sàng PR', needs_review: 'cần người xem', blocked: 'bị chặn' };
const ROLLBACK_STATE = { discarded: ['ok', 'đã xóa nhánh'], revert_ready: ['warn', 'có nhánh revert'], failed: ['bad', 'hoàn tác lỗi'] };
const CALL_LABEL = { ok: 'ok', retry: 'hỏi lại', error: 'lỗi', http_error: 'lỗi HTTP', timeout: 'quá giờ' };
const TRIGGER_LABEL = { plan: 'lập kế hoạch và thực hiện', execute: 'thực hiện kế hoạch đã duyệt', rollback: 'hoàn tác',
  shadow_precheck: 'kiểm tra ban đầu' };
const tag = (state, text) => `<span class="tag st-${state}">${esc(text)}</span>`;
const gateName = (g) => gateNames[Number(g)] ? `Cổng ${Number(g)} · ${esc(gateNames[Number(g)])}` : `Cổng ${esc(g)}`;

const ROOT_STATUS = {
  queued: ['idle', 'Chờ worker nhận'], running: ['run', 'Đang xử lý'], planned: ['ok', 'Đã có kế hoạch'],
  waiting_authorization: ['warn', 'Chờ admin cho phép'], waiting_admin: ['warn', 'Chờ admin'], waiting: ['warn', 'Chờ thêm thông tin'],
  human_owned: ['warn', 'Chuyển cho người làm'], cancelled: ['bad', 'Đã dừng'], done: ['ok', 'Xong'],
};
// Tiến độ do server tính (run.progress): cổng nào qua / chặn / đang chạy / chưa tới / không chạy.
function renderProgress(p) {
  if (!p?.gates.length) return '';
  const label = { ok: 'qua', bad: 'chặn', run: 'đang chạy', wait: 'chưa tới', skip: 'không chạy' };
  return `<div class="prog" role="list">${p.gates.map(({ gate, name, state }) =>
    `<span class="seg ${state}" role="listitem" title="${gateName(gate)}: ${label[state]}"${state === 'run' ? ' aria-current="step"' : ''}>${esc(gate)} · ${esc(name)}</span>`).join('')}</div>
    ${p.current != null ? `<div class="live-line"><span class="pulse"></span>Đang chạy ${gateName(p.current)}${p.since ? ` · ${elapsed(p.since)}` : ''}</div>` : ''}`;
}

// 1 lượt = 1 lease của 1 worker (phiên): lập plan và/hoặc chạy các cổng; ngân sách GPU-s tính theo lượt.
function runState(run, live) {
  if (run.rollback) return ROLLBACK_STATE[run.rollback.outcome] || ['idle', run.rollback.outcome];
  if (run.status) return [RUN_STATE[run.status] || 'idle', RUN_LABEL[run.status] || run.status];
  return live ? ['run', 'đang chạy'] : ['idle', 'chưa có kết luận'];
}

function renderSessions(runs, root) {
  if (!runs.length) return '<div class="blk meta">Chưa có lượt xử lý nào.</div>';
  return `<div class="timeline">${runs.map((run, i) => {
    const [state, label] = runState(run, i === runs.length - 1 && root.live);
    return `<div class="step st-${state}"><div class="line1">
      <b>Lượt #${esc(run.id)}</b> ${tag(state, label)}
      <span>${esc(TRIGGER_LABEL[run.trigger] || run.trigger)}${run.gate != null ? ` · dừng ở cổng ${esc(run.gate)}` : ''}</span>
      <span class="meta">worker ${esc(run.worker_id || '—')} (${esc(run.worker_mode || '—')})</span></div>
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

function rollbackStep(run, live) {
  const r = run.rollback;
  const [state, label] = r ? ROLLBACK_STATE[r.outcome] || ['idle', r.outcome] : live ? ['run', 'đang hoàn tác'] : ['idle', 'chưa có kết quả'];
  return `<div class="timeline"><div class="step gate st-${state}"><div class="line1"><b>Hoàn tác thay đổi</b>${tag(state, label)}</div>
    ${r?.revert ? `<div style="margin-top:4px">Nhánh revert: <code>${esc(r.revert.branch)}</code> (${esc(r.revert.commits?.length)} commit). Mở PR từ nhánh này để gỡ thay đổi khỏi web.</div>` : ''}
    ${r?.detail ? `<div class="meta">${esc(r.detail)}</div>` : ''}</div></div>`;
}

// Thứ tự: theo cổng; trong 1 cổng các lần gọi model trước, kết luận của cổng sau cùng.
function renderRun(run, root, latest) {
  const p = run.progress;
  const items = [
    ...run.calls.map(c => ({ gate: Number(c.evidence?.gate ?? c.gate), kind: 0, at: c.created_at, id: c.id, html: callStep(c.evidence || {}) })),
    ...run.gates.map(g => ({ gate: Number(g.gate), kind: 1, at: g.created_at, id: g.id, html: gateStep(g) })),
  ];
  if (p?.current != null) {
    items.push({ gate: p.current, kind: 1, at: 0, id: 0, html: `<div class="step gate st-run"><div class="line1">
      <b>${gateName(p.current)}</b>${tag('run', 'đang chạy')}${p.since ? `<span class="meta">${elapsed(p.since)}</span>` : ''}</div></div>` });
  }
  items.sort((a, b) => a.gate - b.gate || a.kind - b.kind || a.at - b.at || a.id - b.id);
  const [state, label] = runState(run, latest && root.live);
  const body = run.trigger === 'rollback' ? rollbackStep(run, latest && root.live)
    : items.length ? `<div class="timeline">${items.map(i => i.html).join('')}</div>` : '<div class="blk meta">Lượt này chưa có dữ liệu cổng.</div>';
  return `<div class="run-head st-${state}"><b>Lượt #${esc(run.id)}</b>${tag(state, label)}
      <span>${esc(TRIGGER_LABEL[run.trigger] || run.trigger)}</span><span class="meta">worker ${esc(run.worker_id || '—')} · ${fmt(run.created_at)}</span>
      <span>GPU-s ${budgetCell(run.budget_used, run.budget_limit)}</span></div>
    ${renderProgress(p)}
    ${body}`;
}

function eventState(e) {
  const t = `${e.event_type} ${e.transition || ''}`;
  if (/blocked|critical|rejected|cancel|budget_exhausted|waiting_admin|rollback_failed/.test(t)) return 'bad';
  if (/waiting|review|clarif|rollback/.test(t)) return 'warn';
  return 'ok';
}

function renderEvents(events) {
  const shown = events.filter(e => e.event_type !== 'gate_started'); // đã thể hiện ở thanh tiến độ
  if (!shown.length) return '<div class="blk meta">Chưa có sự kiện.</div>';
  return `<div class="timeline">${shown.map(e => {
    const state = eventState(e);
    return `<div class="step st-${state}"><div class="line1"><b>${esc(e.event_type)}</b>
        ${e.transition ? tag(state, e.transition) : ''}<span class="meta">${fmt(e.created_at)} · ticket #${esc(e.ticket_id)}
        · ${esc(e.actor_type)}${e.actor_id ? ` ${esc(e.actor_id)}` : ''}</span></div>
      ${e.public_message ? `<div style="margin-top:4px">${esc(e.public_message)}</div>` : ''}
      ${e.internal_detail ? `<div class="meta">${esc(e.internal_detail)}</div>` : ''}</div>`;
  }).join('')}</div>`;
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

function stepState(child, root) {
  if (['pre_pr_ready', 'pre_pr_review', 'rolled_back', 'revert_ready', 'rollback', 'rolling_back'].includes(root.phase)
    && child?.status !== 'failed') return root.phase.startsWith('pre_pr') ? ['ok', 'đã làm, qua kiểm tra'] : ['idle', 'đã hoàn tác'];
  if (root.live && root.phase === 'executing') return ['run', 'đang làm'];
  return CHILD_STATE[child?.status] || ['idle', child?.status || '—'];
}

function renderPlan(p, root, children) {
  if (!p) return '';
  const plan = p.plan || {};
  const [approvalState, approval] = planApproval(p, root);
  const waiting = root.status === 'waiting_authorization' && !p.authorized && p.tier === 'protected';
  const mine = children.filter(c => Number(c.plan_revision) === Number(p.revision));
  const steps = (plan.steps || []).slice().sort((a, b) => a.order - b.order);
  const extra = mine.filter(c => !steps.some(st => Number(st.order) === Number(c.order)));
  return `<h2>Kế hoạch</h2>
    <div class="blk plan">
      <div class="plan-head"><b>${esc(plan.goal || '')}</b>${tag(approvalState, approval)}</div>
      <dl class="kv">
        <dt>Mức duyệt</dt><dd>${esc(TIER_TEXT[p.tier] || p.tier)}</dd>
        <dt>Rủi ro</dt><dd>${esc(RISK_TEXT[plan.risk] || plan.risk || '—')}</dd>
        <dt>File được sửa</dt><dd>${(plan.allowed_scope || []).map(code).join(', ') || '—'}</dd>
        <dt>Quyền</dt><dd>${(plan.capabilities || []).map(capText).join(', ') || '—'}</dd>
        <dt>Bản kế hoạch</dt><dd>${esc(p.revision)}</dd>
      </dl>
      <div class="sub">Các bước</div>
      <ol class="plan-steps">${steps.map(st => {
        const [state, label] = stepState(mine.find(c => Number(c.order) === Number(st.order)), root);
        return `<li class="st-${state}"><div class="line1"><b>${esc(st.title)}</b>${tag(state, label)}</div>
          <div class="meta">Sửa ${(st.allowed_scope || []).map(code).join(', ')} · quyền ${capText(st.capability)} · rủi ro ${esc(RISK_TEXT[st.risk] || st.risk)}</div>
          ${st.acceptance?.length ? `<div class="meta">Đạt khi: ${st.acceptance.map(esc).join('; ')}</div>` : ''}</li>`;
      }).join('')}${extra.map(c => {
        const [state, label] = CHILD_STATE[c.status] || ['idle', c.status];
        return `<li class="st-${state}"><div class="line1"><b>${esc(c.title)}</b>${tag(state, label)}</div>
          <div class="meta">AI tự sửa thêm sau khi kiểm tra chưa đạt</div></li>`;
      }).join('')}</ol>
      ${waiting ? `<button class="btn ok" data-action="authorize" data-root="${esc(root.id)}" data-hash="${esc(p.plan_hash)}">Cho phép thực hiện kế hoạch</button>
        <span class="meta">${esc(ui.authorizeMsg || '')}</span>` : ''}
    </div>`;
}

async function authorizePlan(btn) {
  if (!confirm('Cho phép AI Board thực hiện kế hoạch này? Worker sẽ chạy các cổng 3 → 5.5 trên kế hoạch đã duyệt.')) return;
  btn.disabled = true;
  try {
    await post(`/api/admin/ai-board/tickets/${encodeURIComponent(btn.dataset.root)}/authorize-plan`, { plan_hash: btn.dataset.hash });
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
  const canCancel = !['rejected', 'cancelled', 'done'].includes(request.status);
  if (!canRollback && !canCancel) return ui.flash ? `<div class="flash">${esc(ui.flash)}</div>` : '';
  const busy = root?.live;
  return `<div class="actions">
      ${canRollback ? `<button class="btn danger-outline" data-action="rollback" ${busy ? 'disabled' : ''}
        title="${busy ? 'AI Board đang xử lý; chờ lượt này xong hoặc hủy yêu cầu.' : 'Gỡ thay đổi AI Board đã làm cho yêu cầu này'}">Hoàn tác thay đổi</button>` : ''}
      ${canCancel ? '<button class="btn danger-outline" data-action="cancel">Hủy yêu cầu</button>' : ''}
      ${ui.flash ? `<span class="flash">${esc(ui.flash)}</span>` : ''}
    </div>
    ${ui.confirm ? renderConfirm(request, candidate) : ''}`;
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
    'Nhánh thay đổi đã tạo (nếu có) không bị xóa; dùng "Hoàn tác thay đổi" nếu muốn bỏ nó.',
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
  const unit = x.budget_unit === 'k_tokens' ? 'nghìn token' : 'GPU-s';
  const root = t.root;
  const runs = t.runs || [];
  const [state, label] = ROOT_STATUS[root.status] || ['idle', root.status];
  const shownState = root.live ? 'run' : state;
  return `
    <h2>AI Board</h2>
    <div class="blk status st-${shownState}"><div class="line1"><b>Root #${esc(root.id)}</b>${tag(shownState, root.live ? 'Đang xử lý' : label)}
        <span>${esc(root.phase_label)}</span>${root.live ? '<span class="pulse" title="Worker đang giữ yêu cầu này"></span>' : ''}</div>
      ${root.public_note ? `<div style="margin-top:4px">${esc(root.public_note)}</div>` : ''}
      ${root.internal_reason ? `<div class="meta">${esc(root.internal_reason)}</div>` : ''}
      ${t.candidate ? `<div class="meta" style="margin-top:4px">Nhánh thay đổi: ${code(t.candidate.branch)} · ${esc(t.candidate.commits?.length)} commit</div>` : ''}
      ${t.pull_request && /^https:\/\/github\.com\//.test(t.pull_request.url) ? `<div class="meta" style="margin-top:4px">PR vào ${code(t.pull_request.base)}:
        <a href="${esc(t.pull_request.url)}" target="_blank" rel="noopener noreferrer">#${esc(t.pull_request.number)}</a>
        · head ${code(String(t.pull_request.head_sha).slice(0, 10))}${riskOf(runs) ? ` · rủi ro ${code(riskOf(runs))}` : ''}</div>` : ''}</div>
    <div class="blk strip">
      <span>Trần mỗi lượt: <b>${fmtNum(x.budget_limit)}</b> ${unit}</span>
      <span>Tổng tích lũy các lượt: <b>${fmtNum(x.budget_used)}</b></span>
      <span>GPU-s đo được: <b>${esc(x.gpu_s)}</b></span>
      <span>Token vào/ra: <b>${fmtNum(x.tokens_in)} / ${fmtNum(x.tokens_out)}</b></span>
      <span>Lần gọi: <b>${esc(x.calls)}</b></span>
      <span>Nạp model: <b>${esc(x.model_loads)}</b></span>
      <span>Hỏi lại: <b>${esc(x.retries)}</b></span>
    </div>
    ${renderPlan(t.plan, root, t.children || [])}
    <h2>Phiên xử lý</h2>
    ${renderSessions(runs, root)}
    ${runs.map((run, i) => renderRun(run, root, i === runs.length - 1)).join('')}
    <h2>Sự kiện</h2>
    ${renderEvents(t.events || [])}
  `;
}

function render() {
  if (!view) return;
  const { thread, decisions, trace } = view;
  const r = thread.request;
  const live = trace?.root?.live;
  document.title = `Yêu cầu #${r.id} · Tizia`;
  patchHtml($('#app'), `
    <a class="back" href="/admin.html#requests">Về trang quản trị</a>
    <h1>Yêu cầu #${esc(r.id)}: ${esc(r.title)}</h1>
    <div class="meta">${esc(r.domain)} · ${esc(r.type)} · ${esc(r.student)} · <span class="pill">${esc(r.status)}</span> · tạo ${fmt(r.created_at)}
      · <span class="${live ? 'auto live' : 'auto'}">${live ? 'tự cập nhật mỗi 2 giây' : 'tự cập nhật mỗi 10 giây'}</span></div>
    ${renderActions(r, trace)}
    <h2>Trao đổi</h2>
    ${renderThread(thread.messages || [])}
    ${renderDecisions(decisions)}
    ${trace ? renderAiBoard(trace) : '<h2>AI Board</h2><div class="blk meta">Yêu cầu này chưa có ticket AI Board.</div>'}
  `);
  const go = $('#confirm-go');
  if (go) go.disabled = !confirmed(); // chữ đã gõ còn nguyên sau khi vá DOM
}

async function refresh() {
  const [thread, decisions, trace] = await Promise.all([
    api(`/api/requests/${REQUEST_ID}/thread`),
    api(`/api/requests/${REQUEST_ID}/decisions`),
    api(`/api/admin/ai-board/requests/${REQUEST_ID}/trace`),
  ]);
  if (!thread.ok) {
    $('#app').innerHTML = `<p class="err">Không tải được yêu cầu #${REQUEST_ID} (${esc(thread.data?.error || thread.status)}).</p>`;
    return false;
  }
  view = { thread: thread.data, decisions: decisions.data?.decisions || [], trace: trace.ok ? trace.data : null };
  gateNames = view.trace?.gate_names || {};
  render();
  return true;
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
  else if (action === 'authorize') return authorizePlan(btn);
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

(async () => {
  if (!REQUEST_ID) { $('#app').innerHTML = '<p class="err">Thiếu id yêu cầu.</p>'; return; }
  try { if (await refresh()) schedule(); }
  catch (e) { if (e.message !== 'login') $('#app').innerHTML = `<p class="err">Lỗi: ${esc(e.message)}</p>`; }
})();
