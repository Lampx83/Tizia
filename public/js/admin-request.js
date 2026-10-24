// Chi tiết 1 yêu cầu (cửa sổ con trên trang admin): nội dung, trao đổi, kế hoạch, tiến độ trực tiếp và toàn bộ
// vết AI Board — phiên xử lý (worker) theo từng lượt, cổng, từng lần gọi model, sự kiện. Tự cập nhật bằng cách
// vá DOM (không vẽ lại cả trang). Mọi giá trị từ học sinh/model là dữ liệu không tin cậy → luôn qua esc().
import { patchHtml } from './dom-morph.js';
import { mountPrivatePreview } from './private-preview.js';
import { installLightbox, pairBeforeAfter } from './lightbox.js';
import { projectPipeline, describeEvent, TECHNICAL_EVENTS, TRACE_STEPS, renderVerificationClaims, budgetSummary, renderRootAllowance } from './ai-board-trace.js';
import { renderHsm } from './ai-board-hsm.js';
import { renderTicketGraph, graphNodes } from './ai-board-graph.js?v=20261024b';
import { fmt as clockFmt } from './ai-board-clock.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = (t) => t ? clockFmt(t) : 'chưa có';
const fmtNum = (n) => (n == null) ? 'chưa có' : Number(n).toLocaleString('vi-VN');
const secs = (ms) => ms == null ? 'chưa có' : (ms / 1000).toFixed(1);
const elapsed = (t) => { const s = Math.max(0, Math.round((Date.now() - t) / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

const REQUEST_ID = Number(new URLSearchParams(location.search).get('id'));
// Trạng thái giao diện riêng của admin (không phải dữ liệu server): bảng xác nhận đang mở ở bước nào.
// `open`: khóa <details> (data-k) → đã mở/đóng, sống qua mọi lần vẽ lại do refresh().
const ui = { confirm: null, step: 1, msg: '', flash: '', authorizeConfirm: null, open: {}, reconcile: null, node: null };
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

const tag = (state, text) => `<span class="tag st-${state}">${esc(text)}</span>`;
const gatePos = (g) => esc(Number(g));
const gateName = (g) => `${gatePos(g)} · ${esc(TRACE_STEPS.find(s => s.gate === Number(g))?.title || gateNames[Number(g)] || 'Bước xử lý')}`;

const ROOT_STATUS = {
  queued: ['idle', 'Chờ worker nhận'], running: ['run', 'Đang xử lý'], planned: ['ok', 'Đã có kế hoạch'],
  waiting_authorization: ['warn', 'Chờ admin cho phép'], waiting_admin: ['warn', 'Chờ admin'], waiting: ['warn', 'Chờ xem xét'],
  human_owned: ['warn', 'Chuyển cho người làm'], cancelled: ['bad', 'Đã dừng'], done: ['ok', 'Xong'],
};
// <details> có khóa: mở/đóng giữ trong ui.open qua các lần vẽ lại (syncOpen). `open` mặc định = data-dopen, không phải attr `open`.
const det = (key, summary, body, { cls = '', dopen = false } = {}) =>
  `<details class="${cls}" data-k="${esc(key)}"${dopen ? ' data-dopen' : ''}><summary>${summary}</summary>${body}</details>`;
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const ok = (state, text) => `<span class="s-${state}">${esc(text)}</span>`;
function eventState(e) {
  const t = `${e.event_type} ${e.transition || ''}`;
  if (/transient/.test(t)) return 'warn';
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
const shadowTag = (x) => (x?.shadow ? ' <span class="pill">shadow: chỉ ghi log</span>' : '');

function classifiedRows(d) {
  const rows = [];
  if (d.model) rows.push(['Model', esc(d.model)]);
  if (d.clarity) rows.push(['Độ rõ', `${esc(topProbs(d.clarity.probs))}${shadowTag(d.clarity)}`]);
  if (d.danger) {
    const labels = (d.danger.labels || []).map((k) => PROB_LABEL[k] || k);
    rows.push(['Nguy hiểm', `${esc(topProbs(d.danger.probs))}${labels.length ? ` → soát: ${esc(labels.join(', '))}` : ''}${shadowTag(d.danger)}`]);
  }
  if (d.rules) rows.push(['Luật cứng', d.rules.needed ? `${esc(d.rules.mode === 'split' ? 'quá rộng' : 'mơ hồ')}: ${esc((d.rules.reasons || []).join('; '))}` : 'rõ']);
  if (d.clarify) rows.push(['Làm rõ', d.clarify.needed ? `có (${esc(d.clarify.mode)}) · nguồn: ${esc((d.clarify.source || []).join(', ') || 'chưa có')}` : 'không']);
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
      ${det(`event-${e.run_id ?? ''}-${e.created_at}-${e.event_type}-${i}`, 'Thông tin kỹ thuật của sự kiện', `<div class="meta">${esc(e.event_type)} · ${esc(e.transition || 'không đổi trạng thái')} · ticket #${esc(e.ticket_id)} · ${esc(e.actor_id || 'chưa có')}</div>${e.internal_detail ? eventDetail(e) : ''}`)}</li>`;
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
const CHANGE_TEXT = { one_way: 'một chiều (khó hoàn tác, cần admin duyệt)', two_way: 'hai chiều (hoàn tác được)' };
const changeOf = (runs) => [...runs].reverse().map((r) => r.change_class).find(Boolean)
  || [...runs].reverse().flatMap((r) => r.gates || []).find((g) => Number(g.gate) === 5.5 && g.evidence?.change_class)?.evidence.change_class;
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
        <dt>Rủi ro</dt><dd>${esc(RISK_TEXT[plan.risk || p.risk] || plan.risk || p.risk || 'chưa có')}</dd>
        <dt>File được sửa</dt><dd>${(plan.allowed_scope || p.allowed_scope || []).map(code).join(', ') || 'chưa có'}</dd>
        <dt>Quyền</dt><dd>${(plan.capabilities || p.capabilities || []).map(capText).join(', ') || 'chưa có'}</dd>
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

async function submitReconcile(btn) {
  const f = ui.reconcile, root = view?.trace?.root;
  if (!f || !root) return;
  if (!f.reason.trim() || !f.evidence.trim()) { f.msg = 'Cần nhập cả lý do và bằng chứng.'; render(); return; }
  btn.disabled = true;
  try {
    const r = await post(`/api/admin/ai-board/tickets/${root.id}/unknown-writes/${encodeURIComponent(f.identity)}/reconcile`,
      { decision: f.decision, reason: f.reason.trim(), evidence: { note: f.evidence.trim() }, resume: !!f.resume });
    ui.reconcile = null;
    ui.flash = r.resumed ? 'Đã chốt bước ghi; worker sẽ chạy tiếp ở lượt tới.'
      : r.remaining_open ? `Đã chốt; còn ${r.remaining_open} bước chờ đối chiếu.` : 'Đã chốt bước ghi. Yêu cầu vẫn dừng đến khi bạn cho chạy tiếp.';
  } catch (e) {
    f.msg = `Không chốt được: ${e.message}`;
  }
  await refresh();
  schedule();
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
const ADMIN_ACTION = { note: 'ghi chú', reject: 'từ chối', authorize_plan: 'cho phép kế hoạch', rerun_gate: 'chạy lại bước',
  rollback: 'hoàn tác', extend_budget: 'gia hạn ngân sách', retry_transient: 'chạy lại sau lỗi hạ tầng' };
const managedLine = (m) => `<div class="meta" data-managed>${m
  ? `Phụ trách: <b>${esc(m.managed_by_name || '#' + m.managed_by)}</b> từ ${fmt(m.claimed_at)}${m.last_admin_id !== m.managed_by ? ` · gần nhất ${esc(m.last_admin_name || '#' + m.last_admin_id)}` : ''} · ${esc(ADMIN_ACTION[m.last_action] || m.last_action)} ${fmt(m.last_action_at)}`
  : 'Chưa có admin nào phụ trách; admin đầu tiên thao tác sẽ nhận yêu cầu.'}</div>`;
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
    `AI Board kiểm tra nhánh ${code(candidate?.branch)} (${esc(candidate?.commits?.length)} commit, sửa ${files.map(code).join(', ') || 'chưa có'}).`,
    'Nếu nhánh chưa được merge: xóa nhánh. Web đang chạy không đổi vì thay đổi chưa từng lên web.',
    'Nếu đã merge vào dev/main: tạo nhánh revert mới. Cần người mở PR và merge nhánh đó để gỡ thay đổi khỏi web.',
    'Revert chỉ gỡ code. Trường dữ liệu đã được mở rộng và bản ghi người dùng đã ghi vẫn được giữ, không bị hoàn tác theo.',
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

const WRITE_DECISION = { applied: 'Đã áp dụng: kết quả ghi có thật', not_applied: 'Chưa áp dụng: không có tác dụng, được làm lại', compensate: 'Cần bù trừ: hoàn tác tác dụng đã xảy ra' };
const WRITE_STATUS = { unknown: ['warn', 'chưa rõ kết quả'], compensate: ['warn', 'đang chờ bù trừ'], intent: ['warn', 'đã định ghi, chưa có kết quả'],
  applied: ['ok', 'đã áp dụng'], void: ['idle', 'chưa áp dụng'] };
const writeTag = (status) => tag(...(WRITE_STATUS[status] || ['idle', status]));
const evidenceText = (value) => (value && typeof value === 'object' ? Object.entries(value).map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`).join('\n') : String(value ?? ''));

function reconcileForm(write, writes) {
  const f = ui.reconcile;
  const lastOpen = writes.open.length === 1;
  return `<form class="reconcile-form" data-identity="${esc(write.identity)}" aria-label="Đối chiếu bước ${esc(write.step)}">
    <p class="meta">Quyết định dựa trên bằng chứng bạn đã kiểm tra bên ngoài. AI không tự quyết định bước này.</p>
    <fieldset><legend>Kết quả thực tế của bước ghi</legend>
    ${Object.entries(WRITE_DECISION).map(([k, label]) => `<label class="rf-opt"><input type="radio" name="decision" value="${k}" data-rf="decision"${f.decision === k ? ' checked' : ''}> ${esc(label)}</label>`).join('')}</fieldset>
    <label class="rf-field">Lý do (bắt buộc)<textarea data-rf="reason" rows="2" maxlength="2000">${esc(f.reason)}</textarea></label>
    <label class="rf-field">Bằng chứng đã kiểm tra, ví dụ mã biên nhận hoặc kết quả đối chiếu (bắt buộc)<textarea data-rf="evidence" rows="3" maxlength="4000">${esc(f.evidence)}</textarea></label>
    ${lastOpen ? `<label class="rf-opt"><input type="checkbox" data-rf="resume"${f.resume ? ' checked' : ''}> Cho worker chạy tiếp ngay sau khi chốt (chỉ khi đây là bước mở cuối cùng)</label>` : ''}
    ${f.msg ? `<p class="err" role="alert">${esc(f.msg)}</p>` : ''}
    <div class="row"><button type="button" class="btn ok" data-action="reconcile-go">Chốt bước này</button>
      <button type="button" class="btn" data-action="reconcile-close">Thôi</button></div></form>`;
}

function renderWrites(t) {
  const writes = t.writes, root = t.root;
  if (!writes) return '';
  const open = writes.open || [], resolved = writes.resolved || [];
  const violation = root.phase === 'critical_violation' && !open.length;
  if (!open.length && !resolved.length && !violation) return '';
  const head = open.length
    ? `<div class="line1"><b>Ghi chưa rõ kết quả (UnknownWrite)</b>${tag('warn', `${open.length} bước đang chờ đối chiếu`)}</div>
       <p class="meta">Worker đã dừng vì không chắc một bước ghi đã xảy ra hay chưa. Hệ thống không tự lặp lại bước này.</p>`
    : violation ? `<div class="line1"><b>Vi phạm quyền hoặc ranh giới (PermissionViolation)</b>${tag('bad', 'cần xử lý theo lý do')}</div>
       <p class="meta">Không có bước ghi nào cần đối chiếu: yêu cầu bị chặn vì hành động vượt quyền hiện hành. Đối chiếu không áp dụng; xem lý do ở bước bị chặn bên dưới.</p>` : '';
  return `<section class="blk st-${open.length ? 'warn' : violation ? 'bad' : 'idle'}" id="unknown-writes" aria-label="Bước ghi chưa rõ">${head}
    ${open.map((w) => `<div class="write-row"><div class="line1"><b>Bước ${esc(w.step)} · ${esc(w.tool)}</b>${writeTag(w.status)}
        <span class="meta">công việc ${esc(w.child)} · mã ${esc(String(w.identity).slice(0, 8))}</span></div>
      ${det(`write-${w.identity}:args`, 'Tham số của bước ghi', `<pre>${esc(w.args_preview)}</pre>`)}
      ${ui.reconcile?.identity === w.identity ? reconcileForm(w, writes)
        : `<button type="button" class="btn" data-action="reconcile-open" data-identity="${esc(w.identity)}">Đối chiếu bước này</button>`}</div>`).join('')}
    ${resolved.length ? det('writes-resolved', `Đã đối chiếu (${resolved.length})`, resolved.map((w) => `<div class="write-row"><div class="line1">
        <b>Bước ${esc(w.step)} · ${esc(w.tool)}</b>${writeTag(w.status)}<span class="meta">${esc(w.resolved_by || 'chưa có')} · ${fmt(w.resolved_at)}</span></div>
      ${w.reason ? `<div class="meta">${esc(w.reason)}</div>` : ''}${w.evidence ? `<pre>${esc(evidenceText(w.evidence))}</pre>` : ''}</div>`).join('')) : ''}
  </section>`;
}

// internal_reason của một lần chặn là JSON {gate, reason, plan, ...}: hiện lý do đọc được, JSON gốc gập lại.
function reasonBlock(raw) {
  let data;
  try { data = JSON.parse(raw); } catch { data = null; }
  if (!data || typeof data !== 'object' || typeof data.reason !== 'string') return `<div class="meta">${esc(raw)}</div>`;
  const review = data.reason.startsWith('validator_disagreement') ? ' <span class="pill">cần admin xem xét: hai lần soát không đồng ý</span>' : '';
  return `<div class="meta">Cổng ${esc(data.gate)}: ${esc(data.reason)}${review}</div>
    <details class="raw"><summary>raw JSON</summary><pre>${esc(JSON.stringify(data, null, 2))}</pre></details>`;
}

const BUDGET_REASON = { daily_gpu_folder: 'GPU trong ngày của thư mục', daily_gpu_loose: 'GPU trong ngày của người gửi',
  root_model_calls: 'số lần gọi model của yêu cầu', root_tool_calls: 'số lần gọi công cụ của yêu cầu', root_tokens: 'token của yêu cầu',
  root_tokens_reserve: 'token dự trù của một lần gọi model vượt trần', root_semantic_repairs: 'số lần tự sửa theo ngữ nghĩa',
  root_quality_switches: 'số lần đổi sang model chất lượng', attempt_already_reserved: 'lần thử trùng khóa, không gửi lại',
  legacy_allowance_unknown: 'yêu cầu cũ chưa có số liệu ngân sách, cần xem xét', model_token_bound_violation: 'một lần gọi model dùng nhiều token hơn dự trù',
  run_budget_exhausted: 'ngân sách của lượt đã hết', automatic_round_limit: 'đã hết số vòng tự động' };

function allowanceBlock(a) {
  if (!a) return '';
  const daily = a.daily_gpu?.applies ? [a.daily_gpu] : [];
  const hit = [...daily, ...a.groups].filter(g => g.hit).map(g => BUDGET_REASON[g.reason] || g.reason);
  const holds = a.unknown_holds > 0 ? `<div class="meta">${fmtNum(a.unknown_holds)} lần gọi model chưa rõ kết quả vẫn giữ ngân sách; chưa có cách giải phóng tự động.</div>` : '';
  return `<div class="meta" style="margin-top:4px">${a.blocked_reason ? `Bị chặn: ${esc(BUDGET_REASON[a.blocked_reason] || a.blocked_reason)}. ` : ''}${hit.length
    ? `Đã chạm giới hạn: ${esc(hit.join('; '))}.` : 'Chưa chạm giới hạn ngân sách nào.'}</div>${holds}
    <details class="raw"><summary>Chi tiết ngân sách</summary><ul class="meta">
      ${daily.map(d => `<li>${esc(BUDGET_REASON[d.reason])}: ${fmtNum(d.used)} / ${fmtNum(d.cap)}</li>`).join('')}
      ${a.groups.map(g => `<li>${esc(BUDGET_REASON[g.reason])}: ${fmtNum(g.used)} / ${fmtNum(g.limit)}</li>`).join('')}</ul></details>`;
}

const ROLLOUT_MODE = { envelope: ['ok', 'Trong phạm vi tự phát hành'], review: ['warn', 'Cần admin duyệt'], blocked: ['bad', 'Chưa đủ bằng chứng'] };
const ROLLOUT_REASON = { audience_expands: 'mở rộng người xem', verdict_needs_review: 'kết luận yêu cầu xem xét', tier_not_surface: 'không phải thay đổi bề mặt',
  validator_disagreement: 'hai lần soát không đồng ý', hard_permissions_not_proven: 'chưa chứng minh quyền cứng', functional_oracle_not_proven: 'chưa qua kiểm chứng chức năng',
  no_candidate: 'chưa có bản thay đổi', base_changed: 'base đã đổi sau lần kiểm, cần kiểm lại' };
const ROLLOUT_DECISION = { approved: 'đã duyệt', rejected: 'từ chối', served: 'đã phát hành', withdrawn: 'đã thu hồi' };
const AUDIENCE = { owner_only: 'chỉ người tạo', school: 'cả trường' };
const ROLLOUT_ERROR = { review_required: 'cần duyệt bản này trước khi phát hành', stale_candidate: 'bản thay đổi đã đổi, hãy tải lại trang', rejected_candidate: 'bản này đã bị từ chối',
  not_approvable: 'chưa đủ bằng chứng để duyệt', not_servable: 'chưa đủ bằng chứng để phát hành', no_release: 'chưa đăng ký chức năng để phát hành', no_candidate: 'chưa có bản thay đổi',
  ticket_busy: 'AI Board đang xử lý yêu cầu này', reverify_limit: 'đã kiểm lại tối đa 3 lần', not_reverifiable: 'yêu cầu đã hoàn tác hoặc đóng' };
const reasonText = (r) => (r.startsWith('sensitive_scope:') ? `đụng vùng nhạy cảm (${r.slice(16)})` : ROLLOUT_REASON[r] || r);

function renderRollout(t) {
  const r = t.rollout;
  if (!r?.candidate) return '';
  const [state, label] = ROLLOUT_MODE[r.envelope.mode];
  const head = r.candidate.head_sha;
  const act = (name, text, cls = '', audience = ui.audience || 'owner_only') => `<button class="btn ${cls}" data-action="rollout" data-do="${name}" data-root="${esc(r.ticket_id)}" data-head="${esc(head)}" data-audience="${esc(audience)}">${text}</button>`;
  return `<h2>Phát hành bản thay đổi</h2>
    <div class="blk" id="rollout">
      <div class="line1"><b>Bản ${code(head.slice(0, 10))}</b> trên ${code(r.candidate.base_sha.slice(0, 10))} ${tag(state, label)}
        ${r.release ? `<span>Hiện tại: <b>${esc(AUDIENCE[r.release.status] || 'đang tắt')}</b> (${code(r.release.slug)})</span>` : '<span class="meta">Chưa đăng ký chức năng để phát hành.</span>'}</div>
      <div class="meta">Phạm vi: ${r.candidate.files.map((f) => code(f)).join(' ')}</div>
      ${r.base?.changed ? `<div class="meta" role="alert">Base của nhánh chính đã đổi từ ${code(r.candidate.base_sha.slice(0, 10))} sang ${code(r.base.observed.slice(0, 10))}: bằng chứng cũ không dùng để phát hành lên base mới.</div>` : ''}
      ${r.envelope.reasons.length ? `<div class="meta">Cần duyệt vì: ${esc(r.envelope.reasons.map(reasonText).join('; '))}</div>` : ''}
      <div class="row">
        <label class="meta">Người xem <select id="rollout-audience">${Object.entries(AUDIENCE).map(([k, v]) => `<option value="${k}" ${k === (ui.audience || 'owner_only') ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
        ${r.envelope.mode !== 'blocked' ? act('approve', 'Duyệt', 'ok') : ''}
        ${r.envelope.mode !== 'blocked' && r.release ? act('serve', 'Phát hành', 'ok') : ''}
        ${act('reverify', 'Kiểm lại với base mới', r.base?.changed ? 'ok' : '')}
        ${act('reject', 'Từ chối', 'danger-outline')}
        ${r.release && r.release.status !== 'owner_only' ? act('withdraw', 'Thu hồi', 'danger-outline') : ''}
      </div>
      ${ui.rolloutMsg ? `<div class="meta" role="status">${esc(ui.rolloutMsg)}</div>` : ''}
      ${r.approvals.length ? `<ul class="meta">${r.approvals.map((a) => `<li>${fmt(a.created_at)} · ${esc(ROLLOUT_DECISION[a.decision])} · ${esc(AUDIENCE[a.audience])} · ${a.basis === 'envelope' ? 'trong phạm vi tự phát hành' : `admin #${esc(a.actor_user_id)}`}${a.note ? ` · ${esc(a.note)}` : ''}</li>`).join('')}</ul>` : ''}
      ${r.stale_decisions ? `<div class="meta">${esc(r.stale_decisions)} quyết định cũ thuộc bản khác nên không còn hiệu lực.</div>` : ''}
    </div>`;
}

async function rolloutDo(btn) {
  btn.disabled = true;
  ui.audience = $('#rollout-audience')?.value || btn.dataset.audience;
  try {
    await post(`/api/admin/ai-board/tickets/${encodeURIComponent(btn.dataset.root)}/rollout/${btn.dataset.do}`, { head_sha: btn.dataset.head, audience: ui.audience });
    ui.rolloutMsg = `Đã ${{ approve: 'duyệt', serve: 'phát hành', reject: 'từ chối', withdraw: 'thu hồi', reverify: 'xếp hàng kiểm lại với base mới; worker sẽ nhận ở lượt tới' }[btn.dataset.do]}.`;
  } catch (e) {
    ui.rolloutMsg = `Chưa thực hiện được: ${ROLLOUT_ERROR[e.message] || e.message}`;
  }
  await refresh();
}

const SPAN_STATUS = { ok: ['ok', 'Xong'], error: ['bad', 'Lỗi'], unset: ['idle', 'Chưa đóng'] };
const TOOL_STATUS = { ok: ['ok', 'Xong'], finish_ok: ['ok', 'Hoàn tất'], error: ['bad', 'Sai tham số'], forbidden: ['bad', 'Bị chặn'],
  finish_rejected: ['warn', 'Bị loại'], repeated: ['bad', 'Lặp lại'] };
const tokenText = (n) => n == null ? 'không rõ' : fmtNum(n);
const thinkingText = (v) => v === true ? 'Bật' : v === false ? 'Tắt' : 'Mặc định';

// Một hàng mỗi span (run, cổng, lần gọi model, tool) theo OTel GenAI; thanh ngang = vị trí và độ dài trên trục thời gian của lượt.
function spanRows(spans) {
  const depth = new Map();
  const ids = new Set(spans.map((s) => s.span_id));
  const level = (s) => {
    if (depth.has(s.span_id)) return depth.get(s.span_id);
    const parent = ids.has(s.parent_span_id) ? spans.find((p) => p.span_id === s.parent_span_id) : null;
    const d = parent ? level(parent) + 1 : 0;
    depth.set(s.span_id, d);
    return d;
  };
  const t0 = Math.min(...spans.map((s) => s.start_ms));
  const t1 = Math.max(...spans.map((s) => s.end_ms ?? Date.now()));
  const span = Math.max(1, t1 - t0);
  const kids = new Map();
  for (const s of spans) { const p = ids.has(s.parent_span_id) ? s.parent_span_id : null; kids.set(p, [...(kids.get(p) || []), s]); }
  const ordered = [];
  const walk = (parent) => (kids.get(parent) || []).sort((x, y) => x.start_ms - y.start_ms).forEach((s) => { ordered.push(s); walk(s.span_id); });
  walk(null);
  return ordered.map((s) => {
    const a = s.attributes || {};
    const op = a['gen_ai.operation.name'];
    const end = s.end_ms ?? Date.now();
    const left = ((s.start_ms - t0) / span) * 100, width = Math.max(0.6, ((end - s.start_ms) / span) * 100);
    let what = esc(s.name), think = '', tokens = '', finish = '';
    let [state, label] = SPAN_STATUS[s.status] || SPAN_STATUS.unset;
    if (op === 'chat') {
      what = `Gọi ${code(a['gen_ai.request.model'] || '?')}`;
      think = thinkingText(a['tizia.thinking']);
      tokens = `${tokenText(a['gen_ai.usage.input_tokens'])} / ${tokenText(a['gen_ai.usage.output_tokens'])}`;
      finish = esc((a['gen_ai.response.finish_reasons'] || []).join(', ') || '');
    } else if (op === 'execute_tool') {
      what = `Tool ${code(a['gen_ai.tool.name'])}`;
      [state, label] = TOOL_STATUS[a['tizia.tool.status']] || [state, label];
    } else if (a['tizia.gate.id'] != null) {
      what = `<b>${gateName(a['tizia.gate.id'])}</b>`;
      if (a['tizia.gate.status'] === 'blocked') [state, label] = ['bad', 'Dừng'];
    } else {
      what = '<b>Lượt xử lý</b>';
    }
    const skills = (s.events || []).filter((e) => e.name === 'tizia.skill.used').slice(0, 2);
    if (skills.length) what += `<div class="meta">${skills.map((e) => {
      const skill = e.attributes || {};
      return tag(skill['tizia.skill.source'] === 'admin' ? 'warn' : 'idle',
        `${skill['tizia.skill.name'] || '?'} v${skill['tizia.skill.version'] || '?'}`);
    }).join(' ')}</div>`;
    return `<tr class="span-row d${Math.min(level(s), 3)}">
      <td class="span-what">${what}</td><td>${think}</td><td class="num">${tokens}</td>
      <td class="num">${s.end_ms == null ? 'đang chạy' : end - s.start_ms < 1000 ? `${end - s.start_ms} ms` : `${secs(end - s.start_ms)} s`}</td><td>${finish}</td><td>${tag(state, label)}</td>
      <td class="span-bar" aria-hidden="true"><i class="st-${state}" style="left:calc(12px + (100% - 24px) * ${(left / 100).toFixed(4)});width:calc((100% - 24px) * ${(Math.min(width, 100 - left) / 100).toFixed(4)})"></i></td></tr>`;
  }).join('');
}

function renderSpanTimeline(trace) {
  const runs = (trace.runs || []).filter((r) => r.spans?.length);
  if (!runs.length) return `<h2>Dòng thời gian từng bước</h2><p class="meta blk">Chưa có dữ liệu span cho yêu cầu này. Các lượt xử lý mới sẽ hiện ở đây.</p>`;
  const table = (run) => `<div class="table-wrap"><table class="span-table">
    <thead><tr><th>Bước</th><th>Suy luận</th><th class="num">Token vào / ra</th><th class="num">Thời gian</th><th>Kết thúc</th><th>Trạng thái</th><th class="span-bar-head">Trục thời gian</th></tr></thead>
    <tbody>${spanRows(run.spans)}</tbody></table></div>`;
  const [latest, ...older] = [...runs].reverse();
  return `<h2>Dòng thời gian từng bước</h2>
    <div class="blk"><p class="meta">Lượt #${esc(latest.id)} · ${esc(latest.spans.length)} bước đã ghi</p>${table(latest)}</div>
    ${older.map((run) => det(`spans-${run.id}`, `Lượt #${esc(run.id)} · ${esc(run.spans.length)} bước`, table(run))).join('')}`;
}

// Result box: what was asked, which files change, acceptance and subtasks.
function resultBox(t) {
  const plan = t.plan?.plan;
  if (!plan) return '';
  const files = (plan.allowed_scope || []).map((f) => code(f)).join(' ');
  const subtasks = (t.children || []).map((c) => `<li>${esc(c.title)} <span class="meta">${esc(c.status)}</span></li>`).join('');
  const row = (k, v) => (v ? `<div class="g-result-row"><span class="meta">${k}</span><span>${v}</span></div>` : '');
  return `<div class="g-result"><div class="g-caption">Kết quả</div>
    ${row('Mục tiêu', esc(plan.goal))}
    ${row('File thay đổi', files)}
    ${row('Tiêu chí đạt', (plan.acceptance || []).map(esc).join('; '))}
    ${subtasks ? row('Việc con', `<ul>${subtasks}</ul>`) : ''}
  </div>`;
}

function renderAiBoard(t) {
  const root = t.root;
  const [state, label] = ROOT_STATUS[root.status] || ['idle', root.status];
  const shownState = root.live ? 'run' : state;
  const summary = `<div class="g-summary">
      ${resultBox(t)}
      <div class="line1">${tag(shownState, root.live ? 'Đang xử lý' : label)}<span>${esc(root.phase_label)}</span>${root.live ? '<span class="pulse" title="Worker đang giữ yêu cầu này"></span>' : ''}</div>
      ${root.public_note ? `<div>${esc(root.public_note)}</div>` : ''}
      ${root.internal_reason ? reasonBlock(root.internal_reason) : ''}
      ${root.lost_worker ? `<div class="meta warn">Worker mất kết nối khi đang giữ yêu cầu (${code(root.lost_worker.worker_id)}). Cần quản trị viên quyết định.</div>` : ''}
      ${traceLine(t.trace_ref)}
      ${managedLine(root.managed)}
      ${renderWrites(t)}
      ${root.status === 'waiting_authorization' ? renderPlan(t.plan, root, t.children || [], t) : ''}
    </div>`;
  const events = minimalEvents(t.events || []);
  return renderTicketGraph(t, ui.node, Date.now(), { summary, events });
}

// Last few user-facing events only; technical ones stay out of the page.
function minimalEvents(events) {
  const rows = events.filter(e => !TECHNICAL_EVENTS.has(e.event_type)).slice(-6).reverse()
    .map(e => `<li><span>${esc(describeEvent(e))}</span><span class="meta">${fmt(e.created_at)}</span></li>`).join('');
  return rows ? `<ol class="g-events">${rows}</ol>` : '';
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
  if (!view) return;
  const { thread, trace } = view;
  const r = thread.request;
  document.title = `Yêu cầu #${r.id} · Tizia`;
  patchHtml($('#app'), `
    <header class="request-head">
      <a class="back" href="/admin.html#requests">Về trang quản trị</a>
      <h1>Yêu cầu #${esc(r.id)}: ${esc(r.title)}</h1>
      <div class="meta">${r.type === 'self' ? 'AI Board tự đề xuất' : `${esc(r.domain)} · ${esc(r.type)} · ${esc(r.student)}`}
        · <span class="pill">${esc(r.status)}</span> · tạo ${fmt(r.created_at)}</div>
      ${renderActions(r, trace)}
    </header>
    ${trace ? renderAiBoard(trace) : '<section class="blk meta">Yêu cầu này chưa có ticket AI Board.</section>'}
  `);
  syncOpen();
  const go = $('#confirm-go');
  if (go) go.disabled = !confirmed();
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
  if (trace.ok && trace.data?.root?.id != null) {
    const writes = await api(`/api/admin/ai-board/tickets/${trace.data.root.id}/unknown-writes`);
    if (writes.ok) view.trace.writes = writes.data;
    const rollout = await api(`/api/admin/ai-board/tickets/${trace.data.root.id}/rollout`);
    if (rollout.ok) view.trace.rollout = rollout.data;
  }
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
const ENDED = ['done', 'cancelled'];
function schedule() {
  clearTimeout(timer);
  const root = view?.trace?.root;
  if (root && !root.live && ENDED.includes(root.status)) return;
  const active = root && (root.live || ['queued', 'running'].includes(root.status));
  timer = setTimeout(tick, active ? 2000 : 10000);
}
async function tick() {
  if (view?.trace?.root?.live && Number(view.trace.root.lease_expires_at) <= Date.now()) {
    stopLiveTrace();
    render();
  }
  if (!document.hidden && !ui.confirm && !ui.reconcile) await refresh().catch(e => { if (e.message !== 'login') console.warn(e); });
  schedule();
}
document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const node = e.target.closest?.('#app g[data-node]');
  if (!node) return;
  e.preventDefault();
  node.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});
document.addEventListener('click', e => {
  const node = e.target.closest('#app [data-node]');
  if (node && view?.trace && graphNodes(view.trace)[node.dataset.node]) { ui.node = node.dataset.node; render(); return; }
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
  else if (action === 'rollout') return rolloutDo(btn);
  else if (action === 'reconcile-open') ui.reconcile = { identity: btn.dataset.identity, decision: 'applied', reason: '', evidence: '', resume: true, msg: '' };
  else if (action === 'reconcile-close') ui.reconcile = null;
  else if (action === 'reconcile-go') return submitReconcile(btn);
  else if (action === 'rerun-node') {
    if (!window.confirm('Run this step again? The earlier failed attempt stays in the history.')) return;
    btn.disabled = true;
    post(`/api/admin/ai-board/requests/${REQUEST_ID}/nodes/${encodeURIComponent(btn.dataset.node)}/rerun`, {})
      .then((r) => { ui.flash = `Started again. ${r.note}`; })
      .catch(e => { ui.flash = `Could not run again: ${e.message}`; }).finally(async () => { await refresh(); schedule(); });
    return;
  }
  render();
  if (action === 'confirm-next') $('#confirm-input')?.focus();
});
document.addEventListener('input', e => {
  const field = e.target.dataset?.rf;
  if (field && ui.reconcile) ui.reconcile[field] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
