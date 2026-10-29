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
