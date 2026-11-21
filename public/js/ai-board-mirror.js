// Admin views of AI Board backend fields: reviewer findings, gate checks, risk signals, suspect checks, DB approval card.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const code = (v) => `<code>${esc(v)}</code>`;
const tag = (state, text) => `<span class="tag st-${state}">${esc(text)}</span>`;

export const SEVERITY = { high: ['bad', 'Cao'], medium: ['warn', 'Trung bình'], low: ['idle', 'Thấp'] };
export const REVIEW_VERDICT = { pass: ['ok', 'Không có lo ngại'], concerns: ['warn', 'Có lo ngại'] };
export const RISK_LEVEL = { low: ['ok', 'Thấp'], medium: ['warn', 'Trung bình'], high: ['bad', 'Cao'], critical: ['bad', 'Rất cao'] };
export const CHANGE_CLASS = { one_way: 'Một chiều, khó hoàn tác', two_way: 'Hai chiều, hoàn tác được' };
const SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

/** Gate evidence of one run, parsed; {} when absent or unreadable. */
export function gateEvidence(run, gate) {
  const row = (run?.gates || []).filter((g) => Number(g.gate) === gate).at(-1);
  let ev = row?.evidence;
  if (typeof ev === 'string') { try { ev = JSON.parse(ev); } catch { return {}; } }
  return ev && typeof ev === 'object' ? ev : {};
}

/** Findings sorted high to low; unknown severities dropped. */
export function sortFindings(findings = []) {
  return findings.filter((f) => SEVERITY[f?.severity]).slice().sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

/** Gate 4 per run: reviewer verdict and findings, static issues, checks run, change class. '' when nothing to show. */
export function renderGateReview(trace = {}) {
  return (trace.runs || []).map((run) => {
    const ev = gateEvidence(run, 4);
    const review = ev.adversarial_review, issues = ev.issues || [], checks = ev.checks || [];
    if (!review && !issues.length && !checks.length && !ev.change_class) return '';
    const parts = [];
    if (review) {
      const [state, label] = REVIEW_VERDICT[review.verdict] || ['idle', 'Chưa có kết luận'];
      const found = sortFindings(review.findings);
      parts.push(`<p>Reviewer AI: ${tag(state, label)}${review.truncated ? ` ${tag('warn', 'Kết quả bị cắt ngắn')}` : ''}</p>`);
      parts.push(found.length ? list(found.map((f) => `${tag(SEVERITY[f.severity][0], SEVERITY[f.severity][1])} ${esc(f.issue)}`))
        : '<p class="meta">Reviewer không nêu phát hiện nào.</p>');
    }
    if (issues.length) parts.push(`<p class="warn">Vấn đề tĩnh</p>${list(issues.map(esc))}`);
    if (checks.length) parts.push(`<p>Đã kiểm: ${checks.map(code).join(' ')}</p>`);
    if (ev.change_class) parts.push(`<p>Loại thay đổi: <b>${esc(CHANGE_CLASS[ev.change_class] || ev.change_class)}</b></p>`);
    return `<div class="g-mirror meta" data-mirror="review" data-run="${esc(run.id)}"><p><b>Cổng 4 · lượt ${esc(run.id)}</b></p>${parts.join('')}</div>`;
  }).filter(Boolean).join('');
}

/** Gate 5.5 risk level and signals, gate 5 suspect-check notes, per run. */
export function renderRiskAndChecks(trace = {}) {
  return (trace.runs || []).map((run) => {
    const risk = gateEvidence(run, 5.5), fn = gateEvidence(run, 5).functional || {};
    const signals = risk.risk_signals || [], suspect = fn.check_suspect || [];
    if (!risk.risk_level && !signals.length && !suspect.length && fn.needs_review !== true) return '';
    const parts = [];
    if (risk.risk_level) {
      const [state, label] = RISK_LEVEL[risk.risk_level] || ['idle', risk.risk_level];
      parts.push(`<p>Rủi ro: ${tag(state, label)}</p>`);
    }
    if (signals.length) parts.push(list(signals.map((s) => `${code(s.name)}${s.tier ? ` <span class="meta">(${esc(s.tier)})</span>` : ''}${s.detail ? ` ${esc(s.detail)}` : ''}`)));
    if (fn.needs_review === true) parts.push(`<p>${tag('warn', 'Cần người xem kết quả chức năng')}</p>`);
    if (suspect.length) parts.push(`<p class="warn">Phép kiểm bị nghi sai</p>${list(suspect.map(esc))}`);
    return `<div class="g-mirror meta" data-mirror="risk" data-run="${esc(run.id)}"><p><b>Cổng 5 và 5.5 · lượt ${esc(run.id)}</b></p>${parts.join('')}</div>`;
  }).filter(Boolean).join('');
}

const SQL_CAP = 20000;
/** Read-only SQL block, escaped, keyboard-scrollable, capped. */
export function sqlBlock(sql) {
  const text = String(sql ?? '');
  const shown = text.length > SQL_CAP ? text.slice(0, SQL_CAP) : text;
  return `<pre class="sql" tabindex="0" role="region" aria-label="Câu lệnh SQL (chỉ đọc)"><code>${esc(shown)}</code></pre>`
    + (text.length > SQL_CAP ? `<p class="meta">Đã cắt, hiển thị ${SQL_CAP} trên ${text.length} ký tự.</p>` : '');
}

const SANDBOX_STATE = { passed: ['ok', 'Chạy thử đạt'], failed: ['bad', 'Chạy thử lỗi'], blocked: ['bad', 'Chạy thử bị chặn'] };
export const DB_STATUS = { pending: ['warn', 'Chờ duyệt'], approved: ['ok', 'Đã duyệt, chờ đẩy PR'], publishing: ['run', 'Đang đẩy PR'],
  published: ['ok', 'Đã mở PR'], publish_failed: ['bad', 'Duyệt xong nhưng chưa mở được PR'], rejected: ['bad', 'Đã từ chối'], superseded: ['idle', 'Đã bị bản mới thay'] };
const DB_BASE = '/api/admin/ai-board';
/** Endpoint for one DB approval action; request-scoped like the other admin POSTs. */
export const dbDecisionPath = (item, decision) => `${DB_BASE}/requests/${encodeURIComponent(item.request_id)}/db-approvals/${encodeURIComponent(item.id)}/${decision}`;

/** Decision body: reject needs a reason (null otherwise); approve pins the candidate head_sha when known. */
export function dbDecisionBody(decision, reason, item) {
  if (decision === 'reject') {
    const text = String(reason ?? '').trim();
    return text ? { reason: text.slice(0, 500) } : null;
  }
  return item?.candidate?.head_sha ? { head_sha: item.candidate.head_sha } : {};
}

const diffLines = (d = {}) => [
  ...(d.added_tables || []).map((t) => `Thêm bảng ${code(t)}`),
  ...(d.removed_tables || []).map((t) => `Xóa bảng ${code(t)}`),
  ...Object.entries(d.added_columns || {}).map(([t, cols]) => `Thêm cột vào ${code(t)}: ${cols.map(code).join(' ')}`),
  ...Object.entries(d.removed_columns || {}).map(([t, cols]) => `Xóa cột khỏi ${code(t)}: ${cols.map(code).join(' ')}`),
];

/** Pending DB approval card. item per lf315 contract; ui: {reason, msg, busy}. */
export function renderDbApproval(item, ui = {}) {
  if (!item) return '';
  const sb = item.sandbox || {}, [state, label] = SANDBOX_STATE[sb.status] || ['idle', 'Chưa rõ kết quả chạy thử'];
  const files = item.files || [], diff = diffLines(sb.schema_diff), cand = item.candidate || {};
  const checks = sb.checks || [], tests = sb.tests || [];
  const noReason = !String(ui.reason ?? '').trim();
  const id = esc(item.id), hid = `db-approval-${id}`;
  return `<article class="blk db-approval" id="${hid}" aria-labelledby="${hid}-h" data-id="${id}" data-request="${esc(item.request_id)}">
    <h3 id="${hid}-h">${item.title ? esc(item.title) : 'Thay đổi cơ sở dữ liệu'} <span class="meta">yêu cầu #${esc(item.request_id)} · lượt ${id}</span></h3>
    <p class="meta"><a href="/admin-request.html?id=${esc(item.request_id)}" target="_top">Mở trang yêu cầu</a>${cand.branch ? ` · nhánh ${code(cand.branch)}` : ''}${cand.head_sha ? ` · ${code(String(cand.head_sha).slice(0, 7))}` : ''}</p>
    <div class="sub">SQL (chỉ đọc)</div>${sqlBlock(item.sql)}
    <div class="sub">Chạy thử trên sandbox</div>
    <p>${tag(state, label)}</p>
    ${diff.length ? list(diff) : ''}
    ${sb.output ? `<pre tabindex="0" role="region" aria-label="Tóm tắt chạy thử">${esc(sb.output)}</pre>` : ''}
    ${sb.error ? `<p class="err" role="alert">${esc(sb.error)}</p>` : ''}
    ${checks.length || tests.length ? `<p class="meta">Kiểm tra SQL: ${checks.filter((c) => c.ok).length}/${checks.length} đạt · test: ${tests.filter((t) => t.rc === 0).length}/${tests.length} đạt</p>` : ''}
    <div class="sub">File liên quan</div>
    ${files.length ? `<p>${files.map(code).join(' ')}</p>` : '<p class="meta">Chưa có file liên quan.</p>'}
    <label class="meta" for="${hid}-reason" style="display:block">Lý do từ chối (bắt buộc khi từ chối)</label>
    <input id="${hid}-reason" data-db-reason="${id}" maxlength="500" autocomplete="off" aria-describedby="${hid}-hint" value="${esc(ui.reason)}" style="width:100%;max-width:72ch;display:block;margin:4px 0">
    <p class="meta" id="${hid}-hint">${noReason ? 'Nhập lý do để bật nút Từ chối.' : ''}</p>
    <div class="row">
      <button class="btn ok" data-action="db-approve" data-id="${id}"${ui.busy ? ' disabled' : ''}>Duyệt</button>
      <button class="btn danger-outline" data-action="db-reject" data-id="${id}"${ui.busy || noReason ? ' disabled' : ''}>Từ chối</button>
    </div>
    <div class="meta" role="status" aria-live="polite">${esc(ui.msg || '')}</div>
  </article>`;
}

/** Read-only DB approval status for the request page, newest first; '' without items. */
export function renderDbStatus(items = [], tabHref = '/admin.html#approvals') {
  const rows = items.filter((i) => i.status !== 'superseded');
  if (!rows.length) return '';
  return `<div class="g-mirror meta" data-mirror="db"><p><b>Thay đổi cơ sở dữ liệu</b></p><ul>${rows.map((i) => {
    const [state, label] = DB_STATUS[i.status] || ['idle', i.status];
    const pr = i.pull_request?.url && /^https?:\/\//.test(i.pull_request.url) ? ` <a href="${esc(i.pull_request.url)}" target="_blank" rel="noopener">PR #${esc(i.pull_request.number)}</a>` : '';
    const why = i.decision?.reason ? ` Lý do: ${esc(i.decision.reason)}` : '';
    const err = i.publish_error ? ` <span class="err">${esc(i.publish_error)}</span>` : '';
    const go = i.status === 'pending' || i.status === 'publish_failed' ? ` <a href="${esc(tabHref)}" target="_top">Mở tab Duyệt</a>` : '';
    return `<li>${tag(state, label)}${pr}${why}${err}${go}</li>`;
  }).join('')}</ul></div>`;
}

/** Load/error shell for a DB approval list. */
export function renderDbApprovalState({ loading, error }) {
  if (loading) return '<p class="meta" aria-busy="true">Đang tải thay đổi cơ sở dữ liệu chờ duyệt…</p>';
  if (error) return `<div role="alert"><p class="err">Không tải được thay đổi cơ sở dữ liệu chờ duyệt: ${esc(error)}.</p>
    <button class="btn" data-action="db-retry">Thử lại</button></div>`;
  return '';
}
