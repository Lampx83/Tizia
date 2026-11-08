// View projection only: immutable worker attempts remain audit evidence.
export const TRACE_STEPS = [
  { gate: 1, title: 'Kiểm tra yêu cầu và lập kế hoạch', detail: 'Kiểm tra nội dung, phân loại rủi ro rồi đề xuất cách làm.' },
  { gate: 2, title: 'Kiểm tra phạm vi được phép sửa', detail: 'Đối chiếu file và quyền cần dùng với giới hạn của hệ thống.' },
  { gate: 2.5, title: 'Soát kế hoạch theo code hiện tại', detail: 'Kiểm tra dẫn chứng code và tiêu chí nghiệm thu trước khi thực hiện.' },
  { gate: 3, title: 'Thực hiện thay đổi trong sandbox', detail: 'Sinh và áp dụng code cho từng công việc của kế hoạch được duyệt.' },
  { gate: 4, title: 'Kiểm tra code và nội dung', detail: 'Kiểm tra thay đổi, quy tắc an toàn và nội dung được tạo.' },
  { gate: 5, title: 'Chạy ứng dụng và kiểm chứng hành vi', detail: 'Dùng môi trường cô lập để kiểm tra kết quả thực tế.' },
  { gate: 5.5, title: 'Đánh giá rủi ro trước khi tạo PR', detail: 'Tổng hợp bằng chứng và quyết định có thể chuyển sang bước review hay không.' },
];
const PURPOSES = {
  'intake_guard.md': ['intake', 'Kiểm tra nội dung yêu cầu', 'Tìm nội dung cần chặn hoặc cần người xem xét trước khi lập kế hoạch.'],
  'classifier_danger': ['danger', 'Phân loại rủi ro nội dung', 'Ước lượng nhóm nội dung để bổ sung cho kiểm tra an toàn; không sinh kế hoạch hay code.'],
  'classifier_clarity': ['clarity', 'Đánh giá độ rõ của yêu cầu', 'Xác định yêu cầu đã đủ rõ hay cần hỏi lại hoặc tách nhỏ.'],
  'brainstorm.md': ['plan', 'Lập kế hoạch thay đổi', 'Đọc ngữ cảnh code và đề xuất các công việc, file và tiêu chí nghiệm thu.'],
  'plan_validate.md': ['validate', 'Soát kế hoạch theo code', 'Đối chiếu kế hoạch với code hiện tại để tìm sai lệch trước khi thực hiện.'],
  'implement.md': ['implement', 'Viết code cho công việc', 'Đề xuất các sửa đổi trong phạm vi của công việc đã được duyệt.'],
  'tool_loop.md': ['loop', 'Vòng công cụ sửa code', 'Mỗi lượt AI chọn một công cụ (đọc, tìm, sửa, viết test); worker chạy và trả kết quả cho lượt sau.'],
  'content_guard.md': ['content', 'Soát nội dung sau thay đổi', 'Đánh giá phần nội dung được tạo hoặc sửa; không phải bước sinh code.'],
};
export function describeModelCall(call = {}) {
  let name = String(call.prompt_name || '').split(/[\\/]/).pop();
  // Old classifier records lack metadata. Recognize only the trusted prompt prefix,
  // never words in the fenced request or model output, and never infer from model size.
  const prefix = String(call.prompt_var || '').split('<<<NOI_DUNG')[0];
  if (!name && prefix.startsWith('Bạn là bộ phân loại. Chỉ trả lời bằng MỘT chữ cái in hoa, không giải thích.')) {
    if (prefix.includes('Nội dung này thuộc nhóm nào?')) name = 'classifier_danger';
    else if (prefix.includes('Yêu cầu này đủ rõ để một lập trình viên làm ngay được không?')) name = 'classifier_clarity';
  }
  const purpose = PURPOSES[name];
  return purpose ? { id: purpose[0], title: purpose[1], detail: purpose[2] }
    : { id: name || 'unlabelled', title: name ? `Xử lý bằng AI · ${name}` : 'Xử lý bằng AI · chưa có nhãn mục đích', detail: 'Bản ghi cũ chưa xác định được nhiệm vụ cụ thể; xem đầu vào và kết quả để đối chiếu.' };
}
export function loopActions(rows = []) {
  return rows.map((call, i) => {
    let act = {};
    try { act = JSON.parse(String(call.output || '').trim()); } catch { /* output không phải JSON */ }
    const args = act.arguments && typeof act.arguments === 'object' ? act.arguments : {};
    const target = args.file || args.test_file || args.query || args.pattern || '';
    return { n: i + 1, tool: typeof act.tool === 'string' ? act.tool : '?', target: String(target), result: call.result, ms: call.metrics?.wall_ms ?? null, error: call.error || '' };
  });
}
export function stepTotals(step) {
  const rows = step.calls.flatMap(g => [...g.previous, g.current]).map(c => c.evidence || {});
  return { calls: rows.length, ms: rows.reduce((a, r) => a + (r.metrics?.wall_ms || 0), 0), failed: rows.filter(r => r.result && r.result !== 'ok') };
}
const numberGate = row => Number(row.evidence?.gate ?? row.gate);
const ordered = rows => [...(rows || [])].sort((a, b) => Number(a.created_at) - Number(b.created_at) || Number(a.id) - Number(b.id));
export function projectPipeline(trace = {}) {
  const root = trace.root || {};
  const runs = ordered(trace.runs);
  const work = runs.filter(r => r.trigger === 'plan' || r.trigger === 'execute');
  const latest = work.at(-1);
  const planRun = work.filter(r => r.trigger === 'plan').at(-1);
  const planIndex = planRun ? work.indexOf(planRun) : -1;
  const executeRun = work.slice(planIndex < 0 ? 0 : planIndex).filter(r => r.trigger === 'execute'
    || (r.trigger === 'plan' && ([...(r.calls || []), ...(r.gates || [])].some(c => numberGate(c) >= 3)
      || (r === latest && root.live && Number(r.progress?.current) >= 3)))).at(-1);
  const queued = root.status === 'queued' && !root.live;
  const queuedStage = queued ? (root.phase === 'authorized' ? 'execute' : 'plan') : null;
  const stages = { plan: queuedStage === 'plan' ? null : planRun, execute: queuedStage ? null : executeRun };
  const selected = new Set(Object.values(stages).filter(Boolean).map(r => r.id));
  const leaseLive = root.live && (root.lease_expires_at == null || Number(root.lease_expires_at) > Date.now());
  // Journal rows of this ticket: a resumed attempt records where it continued (LF/148/LF/152).
  const executeJournal = (trace.journal || []).filter(j => String(j.run_id) === String(stages.execute?.id));
  const resumedRow = executeJournal.find(j => j.node === 'resume' && j.outcome === 'resumed');
  const resumeFrom = resumedRow ? String(resumedRow.state?.from_node || '') : '';
  const resumeGate = resumeFrom.startsWith('gate_') ? Number(resumeFrom.slice(5).replace('_', '.')) : null;
  const resume = resumedRow ? { from: resumeFrom, gate: resumeGate, previous_run_id: resumedRow.state?.previous_run_id ?? null } : null;
  const start = ordered((trace.events || []).filter(e => e.event_type === 'gate_started' && e.run_id === latest?.id))
    .map(e => {
      try { return { ...e, gate: Number(JSON.parse(e.internal_detail).gate) }; } catch { return null; }
    }).filter(e => e && TRACE_STEPS.some(s => s.gate === e.gate)).at(-1);
  const steps = TRACE_STEPS.map(def => {
    const stage = def.gate < 3 ? 'plan' : 'execute';
    const run = stages[stage];
    const gates = ordered((run?.gates || []).filter(g => Number(g.gate) === def.gate));
    const result = gates.at(-1);
    const calls = ordered((run?.calls || []).filter(c => numberGate(c) === def.gate));
    const groups = new Map();
    for (const call of calls) {
      const purpose = describeModelCall(call.evidence);
      const group = `${purpose.id === 'unlabelled' ? (call.evidence?.call_id || call.id) : purpose.id}:${call.evidence?.child ?? ''}`;
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(call);
    }
    const live = Boolean(run) && leaseLive && run === latest && run === runs.at(-1);
    // Sequential execution: chronological starts win over maximum-gate progress,
    // including a repair that returns to an earlier gate. Completed calls are not starts.
    const active = live && (start ? start.gate === def.gate && start.created_at > (result?.created_at || 0)
      : Number(run.progress?.current) === def.gate);
    // A resumed run continued after gate N: gates before it are Done even without a new gate trace.
    const replayed = stage === 'execute' && run === stages.execute && resumeGate != null && def.gate < resumeGate;
    const state = replayed ? 'ok' : active ? 'run' : result?.status === 'passed' ? 'ok' : result?.status === 'blocked' ? 'bad'
      : queuedStage === stage && def.gate === (stage === 'plan' ? 1 : 3) ? 'queued'
      : calls.length ? 'unfinished' : 'wait';
    return { ...def, stage, run, result: active ? null : result, state, resumed: replayed,
      calls: [...groups.values()].map(rows => ({ current: rows.at(-1), previous: rows.slice(0, -1) })), previousResults: active ? gates : gates.slice(0, -1) };
  });
  return { steps, runs, selected, latest, queuedStage, resume, resume_journal: executeJournal };
}
const EVENT_LABELS = {
  request_created: 'Đã nhận yêu cầu', request_classified: 'Đã phân loại yêu cầu',
  shadow_precheck_passed: 'Kiểm tra sơ bộ đã hoàn tất', plan_blocked: 'Kế hoạch chưa đạt kiểm tra',
  plan_validated: 'Kế hoạch đã đạt kiểm tra', plan_authorized: 'Đã cho phép thực hiện kế hoạch',
  gate_rerun: 'Đã yêu cầu chạy lại', pre_pr_verdict: 'Đã có kết quả kiểm chứng trước PR',
  lease_released: 'Worker đã kết thúc lượt xử lý', heartbeat: 'Worker đang giữ yêu cầu',
  gate_started: 'Bắt đầu bước xử lý', request_cancelled: 'Đã dừng yêu cầu',
  rollback_requested: 'Đã yêu cầu hoàn tác', rollback_completed: 'Đã hoàn tất xử lý hoàn tác',
  budget_extended: 'Đã gia hạn ngân sách', budget_exhausted: 'Đã hết ngân sách xử lý',
  budget_ceiling: 'Đã đạt giới hạn ngân sách', plan_invalidated: 'Kế hoạch cũ đã hết hiệu lực',
  plan_resumed: 'Tiếp tục thực hiện kế hoạch', draft_screenshots: 'Đã chụp ảnh bản nháp',
  gate_proof_reused: 'Dùng lại kết quả kiểm tra đã có', gate_proof_invalidated: 'Kết quả kiểm tra cũ không còn hợp lệ',
  transient_retry: 'Đã xếp hàng thử lại sau lỗi hạ tầng',
  requester_continue: 'Người gửi bấm tiếp tục phần còn lại',
};
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderRootAllowance(state) {
  if (!state) return '';
  const title = '<b>Ngân sách toàn yêu cầu</b>';
  if (state.blocked_reason === 'legacy_allowance_unknown') return `<section class="blk">${title}<p>Yêu cầu cũ chưa có đủ số liệu để xác định ngân sách còn lại. Cần quản trị viên xem xét.</p></section>`;
  const fmt = value => Number.isFinite(value) ? new Intl.NumberFormat('vi-VN').format(value) : 'chưa có';
  const labels = { model_calls: 'Lượt gọi AI đã tính/giữ', tool_calls: 'Lượt công cụ', tokens: 'Token đã tính/giữ',
    semantic_repairs: 'Lượt sửa nội dung', quality_switches: 'Lượt đổi model vì chất lượng' };
  const full = ['model_calls', 'tool_calls', 'tokens'].some(cap => state.used?.[cap] >= state.limits?.[cap]);
  return `<section class="blk">${title}<div class="strip">${Object.entries(labels).map(([cap, label]) =>
    `<span>${label}: <b>${fmt(state.used?.[cap])} / ${fmt(state.limits?.[cap])}</b></span>`).join('')}</div>
    ${state.unknown_model_attempts ? `<p>${esc(state.unknown_model_attempts)} lượt gọi chưa xác định đủ token; phần giữ chỗ chưa được hoàn.</p>` : ''}
    ${state.blocked_reason ? '<p>Ngân sách toàn yêu cầu đang bị khóa để kiểm tra.</p>' : full ? '<p>Đã dùng hoặc giữ chỗ toàn bộ ngân sách; chưa thể bắt đầu việc mới.</p>' : ''}</section>`;
}

export function budgetSummary(totals = {}) {
  const units = { gpu_s: 'giây ngân sách', k_tokens: 'k token', mixed: 'đơn vị theo nguồn xử lý', unknown: 'đơn vị chưa xác định' };
  const unit = totals.budget_unit || 'gpu_s';
  return {
    unit: units[unit] || units.unknown,
    combined: ['gpu_s', 'k_tokens'].includes(unit) ? totals.budget_used : null,
    providers: Object.entries(totals.by_provider || {}).map(([provider, values]) => ({
      provider, used: values.budget_used, unit: units[values.budget_unit] || units.unknown,
      missing: values.missing?.budget_units || 0,
    })),
  };
}

export function describeEvent(event = {}) {
  return EVENT_LABELS[event.event_type] || 'Cập nhật xử lý yêu cầu';
}
const basename = (value) => String(value ?? '').split(/[\\/]/).pop();
const evidenceOf = (gate = {}) => {
  let evidence = gate.evidence;
  if (typeof evidence === 'string') { try { evidence = JSON.parse(evidence); } catch { return {}; } }
  return evidence && typeof evidence === 'object' ? evidence : {};
};
// Sandbox artifacts this run kept: screenshots and explicit artifact lists. Names only, never bytes.
export function sandboxArtifacts(run = {}) {
  const names = [];
  const add = (item) => {
    const name = typeof item === 'string' ? item : item?.name || item?.path;
    if (name) names.push(basename(name));
  };
  for (const gate of run.gates || []) {
    const evidence = evidenceOf(gate);
    for (const item of [].concat(evidence.screenshots || [], evidence.screenshot || [], evidence.artifacts || [], evidence.sandbox?.artifacts || [])) add(item);
    for (const receipt of evidence.sandbox_receipts || []) for (const item of receipt?.artifacts || []) add(item);
  }
  return [...new Set(names.filter(Boolean))];
}
// Admin-only runner block: failure code and kept artifacts per run. Requester payloads never carry these fields.
export function renderRunnerTrace(trace = {}) {
  return (trace.runs || []).map((run) => {
    const failure = run.runner_failure, artifacts = sandboxArtifacts(run);
    if (!failure && !artifacts.length) return '';
    const code = failure?.code ? ` với mã <code>${esc(failure.code)}</code>` : '';
    const where = failure?.gate != null ? `Bước ${esc(failure.gate)}` : 'Sandbox';
    const reason = failure?.internal_reason || failure?.reason;
    const stopped = failure ? `<p class="warn">${where}: sandbox dừng${code}.${reason ? ` ${esc(reason)}` : ''}</p>` : '';
    const kept = artifacts.length ? `<p>Sandbox giữ: ${artifacts.map((name) => `<code>${esc(name)}</code>`).join(' ')}</p>` : '';
    return `<div class="g-runner meta" data-run="${esc(run.id)}">${stopped}${kept}</div>`;
  }).filter(Boolean).join('');
}
const STOP_ROUTE = { needs_review: 'Cần admin duyệt', claude_code_queue: 'Hàng chờ Claude Code', clarify: 'Cần người yêu cầu làm rõ', retry: 'Thử lại sau' };
// Admin-only: per-run stop report (tried gates, blocker, next step). Empty unless flag AI_BOARD_STOP_REPORT_V2 stored one.
export function renderStopReport(trace = {}) {
  return (trace.runs || []).filter((run) => run.stop_report).map((run) => {
    const s = run.stop_report, step = s.next_step || {};
    return `<div class="g-stop meta" data-run="${esc(run.id)}"><p class="warn">Dừng (${esc(s.class)}): cổng đã thử: ${(s.tried || []).map(esc).join(', ')}; vướng ở cổng ${esc(s.blocked_gate)}${s.reason ? ` — ${esc(s.reason)}` : ''}</p>${step.route
      ? `<p>Hướng đi tiếp: <b>${esc(STOP_ROUTE[step.route] || step.route)}</b>${step.message ? `. ${esc(step.message)}` : ''}</p>` : ''}</div>`;
  }).join('');
}
export const TECHNICAL_EVENTS = new Set(['heartbeat', 'lease_released', 'gate_started', 'shadow_precheck_passed']);
const AGENT_OUTCOMES = { applied: 'Đã áp dụng', denied: 'Bị từ chối', rejected: 'Sai định dạng', error: 'Lỗi model',
  stopped: 'Dừng thủ công' };
// Progress window and repair-agent proposals: vector, strategy changes, denials and a manual stop.
export function renderRepairAgent(trace = {}) {
  const rows = (trace.runs || []).flatMap((run) => (run.spans || []).map((span) => ({ run, span })));
  const agent = rows.filter(({ span }) => span.name === 'repair_agent.proposal');
  const decisions = rows.filter(({ span }) => span.name === 'progress.decision');
  if (!agent.length && !decisions.length) return '';
  const head = '<h2>Repair agent</h2><p class="meta">Mỗi đề xuất sửa và mỗi lần đổi cách sửa đều được ghi lại.</p>';
  const attempts = agent.map(({ run, span }) => {
    const a = span.attributes || {};
    const files = (a['tizia.agent.files'] || []).map((file) => `<code>${esc(basename(file))}</code>`).join(' ');
    const outcome = AGENT_OUTCOMES[a['tizia.agent.outcome']] || a['tizia.agent.outcome'] || 'chưa rõ';
    return `<tr><td>Lượt ${esc(run.id)}</td><td>${esc(outcome)}</td><td>${esc(a['tizia.agent.action'] || 'không đổi')}</td>
      <td>${files || '<span class="meta">không có</span>'}</td><td>${esc(a['tizia.agent.reason'] || '')}</td></tr>`;
  }).join('');
  const changes = decisions.map(({ span }) => {
    const a = span.attributes || {};
    const window = (a['tizia.progress.window'] || []).join(' · ');
    const action = a['tizia.strategy.action'] ? ` → ${esc(a['tizia.strategy.action'])}` : '';
    return `<li><span>${esc(a['tizia.progress.node'] || 'bước sửa')}${action}</span>
      <span class="meta">${esc(a['tizia.progress.failure_class'] || '')}${window ? ` · ${esc(window)}` : ''}</span></li>`;
  }).join('');
  return `${head}${attempts ? `<div class="table-wrap"><table><thead><tr><th>Lượt chạy</th><th>Kết quả</th><th>Hành động</th><th>Tệp</th><th>Lý do</th></tr></thead>
    <tbody>${attempts}</tbody></table></div>` : '<p class="blk meta">Chưa có đề xuất sửa nào.</p>'}
    ${changes ? `<ol class="g-events">${changes}</ol>` : ''}`;
}

// Receipts describe the checked candidate at that time; they do not assert a release.
export function renderVerificationClaims(trace = {}) {
  const claims = (trace.runs || []).flatMap(run => (run.spans || [])
    .filter(s => s.name === 'verify_claim').map(s => ({ run: run.id, a: s.attributes || {} })));
  const heading = '<h2>Bằng chứng kiểm tra</h2><p class="meta">Kết quả gắn với bản sửa tại thời điểm kiểm tra. Kết quả này chưa xác nhận phát hành.</p>';
  if (!claims.length) return `${heading}<p class="blk meta">Chưa có bằng chứng từ bước kiểm tra.</p>`;
  return `${heading}<div class="table-wrap"><table><thead><tr><th>Tệp / bước</th><th>Kết quả</th><th>Bằng chứng</th></tr></thead><tbody>${claims.map(({ run, a }) => `<tr>
    <td>${esc(a['tizia.claim.file'])}<br><small>Lượt ${esc(run)} · ${esc(a['tizia.claim.profile'])}</small></td>
    <td>${a['tizia.claim.verified'] === true ? 'Đã kiểm chứng' : 'Chưa đạt'}<br><small>Exit ${esc(a['tizia.claim.exit_code'] ?? 'chưa rõ')}</small></td>
    <td class="claim-evidence"><details><summary>Xem lệnh, băm và log</summary><p>${esc(a['tizia.claim.command'])}</p>
      <p>Test: ${esc(a['tizia.claim.test_file'] || 'chưa có')}<br>Băm tệp: <code>${esc(a['tizia.claim.file_hash'])}</code><br>Băm test: <code>${esc(a['tizia.claim.test_hash'])}</code><br>Pin: <code>${esc(a['tizia.claim.digest'])}</code></p>
      <pre>${esc(a['tizia.claim.log_excerpt'])}</pre></details></td></tr>`).join('')}</tbody></table></div>`;
}
