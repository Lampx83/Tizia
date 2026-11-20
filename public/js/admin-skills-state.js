export const POLL_MS = 5000;
export const QUEUE_STALE_MS = 10 * 60 * 1000;
export const REWRITE = { queued:'Đang xếp hàng', running:'Đang viết lại', succeeded:'Đã viết lại', failed:'Viết lại không thành công' };
export const STALE_HINT = 'Worker chưa nhận việc; kiểm tra worker đang rảnh và đã cấu hình model';

const ACTIVE = ['queued', 'running'];

export const isActiveJob = job => ACTIVE.includes(job?.status);
export const hasActiveRewrite = versions => (versions ?? []).some(version => isActiveJob(version.rewrite));

// Banner target: first active rewrite, else the newest version when its rewrite failed.
export const liveVersion = versions => (versions ?? []).find(version => isActiveJob(version.rewrite))
  ?? (versions?.[0]?.rewrite?.status === 'failed' ? versions[0] : null);

export const elapsedText = ms => ms < 60000 ? 'dưới 1 phút' : `${Math.floor(ms / 60000)} phút`;

// Null when no hint applies; caller shows text as-is.
export const rewriteStatus = (job, now) => {
  if (!job || !REWRITE[job.status]) return null;
  const since = Number(job.confirmed_at);
  const elapsed = Number.isFinite(since) ? Math.max(0, now - since) : 0;
  const stale = job.status === 'queued' && elapsed > QUEUE_STALE_MS;
  const error = job.status === 'failed' && job.error ? `: ${job.error}` : '';
  return {
    text: isActiveJob(job) ? `${REWRITE[job.status]} ${elapsedText(elapsed)}` : `${REWRITE[job.status]}${error}`,
    hint: stale ? STALE_HINT : '',
    tone: job.status === 'failed' ? 'err' : job.status === 'succeeded' ? 'ok' : 'wait',
  };
};

// Row pill for the newest version only; succeeded/none shows nothing.
export const rowPill = job => job?.status && ['queued', 'running', 'failed'].includes(job.status)
  ? { label: REWRITE[job.status], tone: job.status === 'failed' ? 'err' : job.status === 'running' ? 'run' : 'wait' }
  : null;

// Poll only while the tab is visible and a rewrite is still in flight.
export const shouldPoll = ({ visible, connected, versions }) => Boolean(visible && connected && hasActiveRewrite(versions));

export const NOTE_MAX = 600;
const encoder = new TextEncoder();
/** UTF-8 byte length: same upper bound the server stores as token_count. */
export const estimateTokens = text => encoder.encode(String(text ?? '')).length;
export const parseMaxTokens = text => {
  const head = /^---\n([\s\S]*?)\n---/.exec(String(text ?? '').replace(/\r\n/g, '\n'));
  const cap = head && /^max_tokens:\s*(\d+)\s*$/m.exec(head[1]);
  return cap ? Number(cap[1]) : null;
};
// `counted` is the server count for this exact text; without it the UTF-8 estimate shows.
export const tokenLabel = (text, counted = null) => {
  const count = counted ?? estimateTokens(text), cap = parseMaxTokens(text);
  return { count, cap, over: cap != null && count > cap, text: `${count.toLocaleString('vi-VN')}${cap != null ? ` / ${cap.toLocaleString('vi-VN')}` : ''} token` };
};

export const NODE_BUDGET_LABEL = { intake: 'nhận yêu cầu', plan: 'lập plan', execute: 'viết code', verdict: 'kết luận' };
// Share of each node budget plus the gap to the old UTF-8 estimate. Empty until there is a count.
export const tokenShareText = (count, budgets = {}, estimate = null) => {
  if (count == null) return '';
  const shares = Object.entries(budgets || {})
    .filter(([, budget]) => Number(budget?.max_tokens_per_prompt) > 0)
    .map(([node, budget]) => `${Math.round((count / Number(budget.max_tokens_per_prompt)) * 100)}% ngân sách ${NODE_BUDGET_LABEL[node] || node}`);
  const gap = estimate == null ? '' : Math.abs(count - estimate) < 1 ? 'khớp ước lượng UTF-8'
    : `${count < estimate ? 'ít' : 'nhiều'} hơn ${Math.abs(estimate - count).toLocaleString('vi-VN')} token so với ước lượng UTF-8`;
  return [...shares, gap].filter(Boolean).join(' · ');
};

const SERVER_TEXT = {
  version_busy: 'Không từ chối được: phiên bản đang được dùng hoặc đang được viết lại.',
  rewrite_in_progress: 'Model đang viết lại phiên bản này. Chờ viết xong rồi thử lại.',
  version_rejected: 'Phiên bản này đã bị từ chối.',
  rewrite_not_allowed: 'Phiên bản đã duyệt hoặc đã từ chối thì không viết lại được. Dùng "Sửa tay thành phiên bản mới".',
  skill_lint_failed: 'Phiên bản chưa qua kiểm tra định dạng (lint). Sửa lỗi lint rồi duyệt lại.',
  version_not_approved: 'Chỉ khôi phục được phiên bản đã từng được duyệt.',
  already_active: 'Phiên bản này đang được dùng.',
  authentication_required: 'Phiên đăng nhập đã hết hạn. Đăng nhập lại rồi thử lại.',
  admin_required: 'Cần quyền quản trị để thực hiện thao tác này.',
  confirmation_required: 'Thao tác chưa được xác nhận.',
};
// Message from the server only when it is already Vietnamese (guardrail and rate-limit texts); otherwise a mapped or caller text.
export const errorText = (done, fallback) => {
  if (done?.data?.error === 'prompt_promotion_refused') {
    const why = done.data.message;
    return (why === 'no_eval_receipt' ? 'Chưa có receipt eval đạt cho phiên bản này so với baseline hiện tại.' : `Eval không đạt: ${why}.`) + ' Nhãn production giữ nguyên.';
  }
  const mapped = SERVER_TEXT[done?.data?.error];
  if (mapped) return mapped;
  const message = done?.data?.message;
  return typeof message === 'string' && /[^\x00-\x7f]/.test(message) ? message : fallback;
};
export const toastMs = (message, kind) => Math.min(10000, Math.max(kind === 'err' ? 6000 : 2400, 1500 + String(message ?? '').length * 55));

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sh = hash => hash ? hash.slice(0, 12) : '(chưa đặt)';
/** Eval receipts and refused promotions as two collapsible lists; '' when both empty. */
export const evalEvidenceHtml = ({ eval_receipts = [], refusals = [] }, fmt) => {
  const evals = eval_receipts.map(r => `<li>${esc(fmt(r.created_at))} · ${esc(r.name)}: ${esc(sh(r.prompt_hash))} so với ${esc(sh(r.baseline_hash))} · ${r.passed ? 'đạt' : 'không đạt'}${r.reasons ? ' · ' + esc(r.reasons) : ''}</li>`);
  const refused = refusals.map(r => `<li>${esc(fmt(r.created_at))} · ${esc(r.name)}/${esc(r.label)}: ${esc(sh(r.from_hash))} → ${esc(sh(r.to_hash))} · bị từ chối: ${esc(r.reason)}</li>`);
  return (evals.length ? `<details><summary>Receipt eval (${evals.length})</summary><ul>${evals.join('')}</ul></details>` : '')
    + (refused.length ? `<details><summary>Từ chối (${refused.length})</summary><ul>${refused.join('')}</ul></details>` : '');
};
