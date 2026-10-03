// ============================================================
// Theo dõi production sau merge + tự revert
// ============================================================
// Sau khi 1 thay đổi self merge (ai_pull_requests.state='merged', request gốc type='self'), so tỉ lệ
// ready_for_pr và tỉ lệ merge trên production (request type <> 'self') limits.self_improve.post_merge_watch.days
// ngày sau closed_at với cùng số ngày trước đó. Chỉ kết luận khi cả 2 bên có ít nhất min_runs lượt; thiếu thì
// ghi 'waiting' (không kết luận), kiểm lại đêm sau — before/after đều mở, dữ liệu cũ có thể được ghi bổ sung.
// Tụt quá max_drop_pts điểm ở ready_for_pr hoặc merge → tạo đúng 1 yêu cầu self revert (tier protected, đi
// pipeline thường, không tự merge); idempotency_key theo pr_number nên báo lại không tạo trùng
// (createRequestWithRoot đã dedupe theo (ownerUserId, idempotency_key) — có sẵn, không cần tự canh ở đây).
// Đã kết luận (status != 'waiting') thì không kiểm lại — giống ai_frozen_benchmark_scores.
// ============================================================
import { LIMITS, WorkerContractError } from './store.js';

const DAY_MS = 24 * 3600_000;
const SELF_TARGET_TAG = 'self_target:';
const round2 = (v) => Math.round(v * 100) / 100;

// self PR đã merge, cùng cách nối evidence_json '$.pull_request.number' như frozen-benchmark.js PENDING.
const selfMergedPr = (db) => {
  const num = (alias) => db.jsonNum(`${alias}.evidence_json`, 'pull_request.number');
  return `
  SELECT p.number AS pr_number, p.closed_at,
    (SELECT ${db.jsonText('r2.evidence_json', 'verdict.candidate.head_sha')} FROM ai_runs r2
      WHERE ${num('r2')} = p.number
        AND ${db.jsonText('r2.evidence_json', 'verdict.candidate.head_sha')} IS NOT NULL
      ORDER BY r2.id DESC LIMIT 1) AS sha
  FROM ai_pull_requests p
  WHERE p.state = 'merged' AND p.number IN (
    SELECT ${num('r')} FROM ai_runs r
    JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id WHERE q.type = 'self'
  )
`;
};

/** Worker: self PR đã merge, cửa sổ "sau" (days) đã trôi qua, chưa kết luận (status != 'waiting' bị loại). */
export async function pendingPostMergeWatch(db, now = Date.now()) {
  const { days } = LIMITS.self_improve.post_merge_watch;
  const done = new Set((await db.all("SELECT pr_number FROM ai_post_merge_watch WHERE status != 'waiting'"))
    .map((r) => r.pr_number));
  return (await db.all(selfMergedPr(db)))
    .filter((row) => !done.has(row.pr_number) && now >= Number(row.closed_at) + days * DAY_MS)
    .map((row) => ({ pr_number: Number(row.pr_number), sha: row.sha ?? null, closed_at: Number(row.closed_at) }))
    .sort((a, b) => a.closed_at - b.closed_at);
}

/** Số lượt production (request type <> 'self', lượt đã có verdict) trong [from, to) + tỉ lệ ready_for_pr / merge. */
async function windowRates(db, from, to) {
  const row = await db.get(`
    SELECT COUNT(*) AS total,
      SUM(CASE WHEN r.outcome = 'ready_for_pr' THEN 1 ELSE 0 END) AS ready,
      SUM(CASE WHEN ${db.jsonNum('r.evidence_json', 'pull_request.number')} IN
        (SELECT number FROM ai_pull_requests WHERE state = 'merged') THEN 1 ELSE 0 END) AS merged
    FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id
    WHERE q.type <> 'self' AND r.outcome IS NOT NULL AND r.created_at >= ? AND r.created_at < ?
  `, [from, to]);
  const total = Number(row.total) || 0;
  const pct = (n) => (total ? round2((100 * (Number(n) || 0)) / total) : null);
  return { runs: total, ready_pct: pct(row.ready), merge_pct: pct(row.merged) };
}

/** File mục tiêu của self PR gốc (tag self_target: trên ticket gắn với PR đó) — revert nhắm đúng file này. */
async function targetFileOf(db, prNumber) {
  const tag = await db.get(`
    SELECT tag.tag AS tag FROM ai_ticket_tags tag JOIN ai_runs r ON r.ticket_id = tag.ticket_id
    WHERE ${db.jsonNum('r.evidence_json', 'pull_request.number')} = ? AND tag.tag LIKE ? LIMIT 1
  `, [prNumber, `${SELF_TARGET_TAG}%`]);
  return tag ? tag.tag.slice(SELF_TARGET_TAG.length) : null;
}

const view = (r) => r;

/** Worker: kiểm 1 self PR đã merge (đọc closed_at/sha từ DB, không tin dữ liệu client gửi lên). Ghi kết quả;
 * tụt quá ngưỡng → tạo đúng 1 yêu cầu self revert qua createSelfRequest (store.js, cùng idempotency có sẵn). */
export async function checkPostMergeWatch(db, prNumber, createSelfRequest, now = Date.now()) {
  return db.tx(async () => await checkPostMergeWatchTx(db, prNumber, createSelfRequest, now));
}

async function checkPostMergeWatchTx(db, prNumber, createSelfRequest, now) {
  const number = Number(prNumber);
  const pr = await db.get(`${selfMergedPr(db)} AND p.number = ?`, [number]);
  if (!pr) throw new WorkerContractError('merged self pull request not found', 404, 'pr_not_found');
  const { days, min_runs: minRuns, max_drop_pts: maxDrop } = LIMITS.self_improve.post_merge_watch;
  const closedAt = Number(pr.closed_at);
  const before = await windowRates(db, closedAt - days * DAY_MS, closedAt);
  const after = await windowRates(db, closedAt, closedAt + days * DAY_MS);
  const enough = before.runs >= minRuns && after.runs >= minRuns;
  let status = 'waiting';
  let dropReadyPts = null;
  let dropMergePts = null;
  let revertRequestId = null;
  if (enough) {
    dropReadyPts = before.ready_pct != null && after.ready_pct != null ? round2(before.ready_pct - after.ready_pct) : null;
    dropMergePts = before.merge_pct != null && after.merge_pct != null ? round2(before.merge_pct - after.merge_pct) : null;
    const dropped = (dropReadyPts !== null && dropReadyPts > maxDrop) || (dropMergePts !== null && dropMergePts > maxDrop);
    status = dropped ? 'dropped' : 'ok';
    if (dropped) {
      const target = await targetFileOf(db, number);
      // ponytail: file gốc không tìm được / không còn trong vùng tự sửa (rất hiếm) → vẫn ghi 'dropped' để không
      // kiểm lại mỗi đêm, nhưng không có revert_request_id; admin sẽ thấy tụt mà chưa có PR revert, xử lý tay.
      if (target && createSelfRequest) {
        const why = [dropReadyPts !== null && dropReadyPts > maxDrop ? `ready_for_pr giảm ${dropReadyPts} điểm` : null,
          dropMergePts !== null && dropMergePts > maxDrop ? `tỉ lệ merge giảm ${dropMergePts} điểm` : null]
          .filter(Boolean).join('; ');
        try {
          const created = await createSelfRequest({
            title: `Tự revert PR #${number}: production tụt sau merge`,
            detail: `PR #${number}${pr.sha ? ` (sha ${pr.sha})` : ''} làm production tệ đi trong ${days} ngày sau merge: `
              + `${why}. Revert file ${target} về trạng thái trước khi merge PR này.`,
            targetFile: target,
            idempotencyKey: `self-revert:pr-${number}`,
          });
          revertRequestId = created.request_id;
        } catch (error) {
          if (!(error instanceof WorkerContractError)) throw error;
        }
      }
    }
  }
  await db.run(`
    INSERT INTO ai_post_merge_watch(pr_number, sha, status, before_runs, after_runs, before_ready_pct, after_ready_pct,
      before_merge_pct, after_merge_pct, drop_ready_pts, drop_merge_pts, revert_request_id, checked_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(pr_number) DO UPDATE SET sha = excluded.sha, status = excluded.status,
      before_runs = excluded.before_runs, after_runs = excluded.after_runs,
      before_ready_pct = excluded.before_ready_pct, after_ready_pct = excluded.after_ready_pct,
      before_merge_pct = excluded.before_merge_pct, after_merge_pct = excluded.after_merge_pct,
      drop_ready_pts = excluded.drop_ready_pts, drop_merge_pts = excluded.drop_merge_pts,
      revert_request_id = COALESCE(ai_post_merge_watch.revert_request_id, excluded.revert_request_id),
      checked_at = excluded.checked_at
  `, [number, pr.sha ?? null, status, before.runs, after.runs, before.ready_pct, after.ready_pct,
    before.merge_pct, after.merge_pct, dropReadyPts, dropMergePts, revertRequestId, now]);
  return view(await db.get('SELECT * FROM ai_post_merge_watch WHERE pr_number=?', [number]));
}

/** Admin (tab "Tự cải thiện"): kết quả theo dõi của mọi self PR đã merge, mới nhất trước. */
export async function listPostMergeWatch(db, limit = 200) {
  return (await db.all('SELECT * FROM ai_post_merge_watch ORDER BY checked_at DESC, pr_number DESC LIMIT ?', [limit])).map(view);
}
