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
    const live = leaseLive && run === latest && run === runs.at(-1);
    // Sequential execution: chronological starts win over maximum-gate progress,
    // including a repair that returns to an earlier gate. Completed calls are not starts.
    const active = live && (start ? start.gate === def.gate && start.created_at > (result?.created_at || 0)
      : Number(run.progress?.current) === def.gate);
    const state = active ? 'run' : result?.status === 'passed' ? 'ok' : result?.status === 'blocked' ? 'bad'
      : queuedStage === stage && def.gate === (stage === 'plan' ? 1 : 3) ? 'queued'
      : calls.length ? 'unfinished' : 'wait';
    return { ...def, stage, run, result: active ? null : result, state, calls: [...groups.values()].map(rows => ({ current: rows.at(-1), previous: rows.slice(0, -1) })), previousResults: active ? gates : gates.slice(0, -1) };
  });
  return { steps, runs, selected, latest, queuedStage };
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
  transient_retry: 'Đã xếp hàng thử lại sau lỗi hạ tầng',
};
export function describeEvent(event = {}) {
  return EVENT_LABELS[event.event_type] || 'Cập nhật xử lý yêu cầu';
}
export const TECHNICAL_EVENTS = new Set(['heartbeat', 'lease_released', 'gate_started', 'shadow_precheck_passed']);
