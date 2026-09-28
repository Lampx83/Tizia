// ============================================================
// Task eval từ production (self-improve ticket 02)
// ============================================================
// Lần hỏng (verdict blocked, "Thử cách khác", admin hoàn tác, PR đóng không merge) → 1 task ứng viên / lượt;
// PR merged → 1 task win đã có nhãn = file của PR (ticket 03, worker hỏi GitHub rồi báo);
// admin gắn nhãn (file mong đợi, chuỗi phải có / không được có); worker lấy phần học /
// phần kiểm tra chia theo thời gian. Không lưu tên hay mã người gửi.
// Retire lúc đọc: quá retire_days, hoặc mọi file mong đợi không còn trong cây làm việc.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LIMITS, WorkerContractError } from './store.js';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DAY_MS = 24 * 3600_000;
const PASSING = "('ready_for_pr', 'needs_review')";
const SAFE_PATH = /^[\w@-][\w@./-]{0,299}$/;
const STATUSES = new Set(['candidate', 'labelled', 'retired']);

const parse = (json, fallback = null) => { try { return JSON.parse(json) ?? fallback; } catch { return fallback; } };
const view = ({ deleted_at: _d, ...t }) => ({ ...t, expected_files: parse(t.expected_files, []),
  must_contain: parse(t.must_contain), must_not_contain: parse(t.must_not_contain) });

const RUN = `
  SELECT r.id, r.ticket_id, r.plan_hash, r.evidence_json, q.id AS request_id, q.type, q.title, q.detail, q.clarified_spec
  FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id WHERE r.id=?`;

/** 1 task / (nguồn, lượt); đã có (kể cả đã xoá) → bỏ qua. */
function insertTask(db, run, verdict, { source = 'miss', trigger, gate = null, failureClass = null, files, labelled = false }, now) {
  db.prepare(`
    INSERT OR IGNORE INTO ai_eval_tasks(source, trigger, request_id, run_id, request_text, clarified_spec, base_sha,
      gate, failure_class, skill, expected_files, status, created_at, labelled_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(source, trigger, run.request_id, run.id, [run.title, run.detail].filter(Boolean).join('\n\n'),
    run.clarified_spec ?? null, verdict.base_sha ?? verdict.candidate?.base_sha ?? null, gate, failureClass,
    verdict.skill ?? null, JSON.stringify([...new Set(files)]), labelled ? 'labelled' : 'candidate', now, labelled ? now : null);
}

/** Ghi lần hỏng của run thành task ứng viên. Lặp lại / đã có (kể cả đã xoá) → bỏ qua. Lỗi môi trường không tính. */
export function recordMiss(db, runId, trigger, now = Date.now()) {
  const run = db.prepare(RUN).get(Number(runId));
  if (!run || run.type === 'self') return; // lượt board tự sửa: cổng eval của self tự chấm (ticket 05), không phải lần hỏng production
  const verdict = parse(run.evidence_json, {}).verdict ?? {};
  if (verdict.failure_class === 'transient') return; // hạ tầng hỏng, không phải lỗi của board
  const undo = trigger === 'undo';
  const plan = run.plan_hash && parse(db.prepare('SELECT plan_json FROM ai_plans WHERE root_ticket_id=? AND plan_hash=?')
    .get(run.ticket_id, run.plan_hash)?.plan_json);
  // Gợi ý nhãn: hoàn tác → file của commit bị hoàn tác; bị chặn → phạm vi plan đã nhắm.
  const files = undo ? (verdict.candidate?.commits ?? []).flatMap((c) => c.files) : plan?.allowed_scope ?? [];
  insertTask(db, run, verdict, { trigger, gate: undo ? null : verdict.gate_reached ?? null,
    failureClass: undo ? 'undone' : verdict.failure_class ?? null, files }, now);
}

/** "Thử cách khác" → lượt hỏng cuối; hoàn tác → lượt đạt cuối (thay đổi bị hoàn tác) của yêu cầu. */
export function recordRequestMiss(db, requestId, trigger, now = Date.now()) {
  const run = db.prepare(`
    SELECT r.id FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id AND t.parent_id IS NULL
    WHERE t.source_request_id=? AND r.outcome ${trigger === 'undo' ? `IN ${PASSING}` : "= 'blocked'"}
    ORDER BY r.id DESC LIMIT 1
  `).get(Number(requestId));
  if (run) recordMiss(db, run.id, trigger, now);
}

// ponytail: quét mọi task còn sống ở mỗi lần đọc; vài trăm task thì rẻ, nhiều hơn thì nhớ sha HEAD đã kiểm.
function retire(db, now) {
  db.prepare(`UPDATE ai_eval_tasks SET status='retired', retired_at=? WHERE status != 'retired' AND created_at < ?`)
    .run(now, now - LIMITS.self_improve.retire_days * DAY_MS);
  const gone = db.prepare(`UPDATE ai_eval_tasks SET status='retired', retired_at=? WHERE id=?`);
  for (const t of db.prepare(`SELECT id, expected_files FROM ai_eval_tasks WHERE status != 'retired'`).all()) {
    const files = parse(t.expected_files, []);
    if (files.length && files.every((f) => !fs.existsSync(path.join(REPO_ROOT, f)))) gone.run(now, t.id);
  }
}

// ── Bộ đánh giá đóng băng (self-improve ticket 08): chụp lúc bật vòng lần đầu (frozen_at, self-improve.js) +
// mọi task gắn nhãn trong frozen_window_days ngày sau đó. Task đóng băng không bao giờ vào evalTaskSplit (hard
// exclusion). Gọi lúc đọc (như retire): tất định, không cần cron; đã đóng băng thì không bao giờ bỏ cờ lại. ──
function freeze(db, now) {
  const frozenAt = db.prepare('SELECT frozen_at FROM ai_self_improve_state WHERE id=1').get()?.frozen_at;
  if (!frozenAt) return;
  const deadline = frozenAt + LIMITS.self_improve.frozen_window_days * DAY_MS;
  db.prepare(`UPDATE ai_eval_tasks SET frozen=1 WHERE frozen=0 AND labelled_at IS NOT NULL AND labelled_at <= ?`)
    .run(deadline);
}

/** Worker (self-improve ticket 08): task đóng băng đang labelled — dùng để đo lại sau mỗi lần merge self,
 * không bao giờ đưa cho người đề xuất hay dùng để chọn biến thể. */
export function frozenTasks(db, now = Date.now()) {
  freeze(db, now);
  retire(db, now);
  return db.prepare(`SELECT * FROM ai_eval_tasks WHERE status='labelled' AND frozen=1 ORDER BY created_at, id`)
    .all().map(view);
}

/** Admin: task theo trạng thái (mặc định ứng viên) + đếm mỗi trạng thái. */
export function listEvalTasks(db, status = 'candidate', now = Date.now()) {
  if (!STATUSES.has(status)) throw new WorkerContractError('invalid status');
  freeze(db, now);
  retire(db, now);
  const counts = Object.fromEntries(db.prepare(`
    SELECT status, COUNT(*) AS n FROM ai_eval_tasks WHERE deleted_at IS NULL GROUP BY status
  `).all().map((r) => [r.status, r.n]));
  const tasks = db.prepare(`SELECT * FROM ai_eval_tasks WHERE status=? AND deleted_at IS NULL ORDER BY created_at, id`)
    .all(status).map(view);
  return { tasks, counts };
}

const cleanStrings = (value) => {
  const list = (Array.isArray(value) ? value : []).map((s) => String(s ?? '').trim()).filter(Boolean);
  if (list.length > 10 || list.some((s) => s.length > 200)) throw new WorkerContractError('at most 10 strings of 200 characters');
  return list.length ? JSON.stringify(list) : null;
};

/** Gắn nhãn: 1–50 file (đường dẫn tương đối trong repo), tuỳ chọn chuỗi phải có / không được có. */
export function labelEvalTask(db, id, { expected_files: files, must_contain: must, must_not_contain: mustNot } = {}, now = Date.now()) {
  const list = (Array.isArray(files) ? files : []).map((f) => String(f ?? '').trim().replace(/\\/g, '/'));
  if (!list.length || list.length > 50 || list.some((f) => !SAFE_PATH.test(f) || f.split('/').includes('..'))) {
    throw new WorkerContractError('expected_files must be 1–50 repo-relative paths', 400, 'invalid_label');
  }
  const task = db.prepare('SELECT status FROM ai_eval_tasks WHERE id=? AND deleted_at IS NULL').get(Number(id));
  if (!task) throw new WorkerContractError('eval task not found', 404, 'eval_task_not_found');
  if (task.status === 'retired') throw new WorkerContractError('eval task is retired', 409, 'eval_task_retired');
  db.prepare(`UPDATE ai_eval_tasks SET expected_files=?, must_contain=?, must_not_contain=?, status='labelled', labelled_at=?
    WHERE id=?`).run(JSON.stringify([...new Set(list)]), cleanStrings(must), cleanStrings(mustNot), now, Number(id));
  return view(db.prepare('SELECT * FROM ai_eval_tasks WHERE id=?').get(Number(id)));
}

/** Xoá nội dung task (lời người dùng); giữ khoá để sự kiện sau của cùng lượt không tạo lại. */
export function deleteEvalTask(db, id, now = Date.now()) {
  const info = db.prepare(`
    UPDATE ai_eval_tasks SET request_text='', clarified_spec=NULL, expected_files='[]', must_contain=NULL,
      must_not_contain=NULL, status='retired', retired_at=COALESCE(retired_at, ?), deleted_at=?
    WHERE id=? AND deleted_at IS NULL
  `).run(now, now, Number(id));
  if (!info.changes) throw new WorkerContractError('eval task not found', 404, 'eval_task_not_found');
  return { ok: true };
}

/** Worker: task đã gắn nhãn chia theo thời gian — cũ nhất (split) để học, mới nhất để kiểm tra. Task đóng băng
 * (ticket 08) không bao giờ lọt vào đây — hard exclusion, kể cả khi đã labelled. */
export function evalTaskSplit(db, now = Date.now()) {
  freeze(db, now);
  retire(db, now);
  const { min_labelled_tasks: min, learning_split: split } = LIMITS.self_improve;
  const labelled = db.prepare(`SELECT * FROM ai_eval_tasks WHERE status='labelled' AND frozen=0 ORDER BY created_at, id`)
    .all().map(view);
  const cut = Math.floor(labelled.length * split);
  return { ready: labelled.length >= min, labelled: labelled.length, min_tasks: min, split,
    learning: labelled.slice(0, cut), test: labelled.slice(cut) };
}

// ── Trạng thái PR (ticket 03): worker hỏi GitHub các PR server còn coi là mở, báo lại khi đã đóng ──
const PR_NUMBER = "json_extract(r.evidence_json, '$.pull_request.number')";
const PR_STATES = new Set(['merged', 'closed']);

/** Worker: PR server đã ghi mà chưa báo đóng — worker hỏi GitHub đúng các PR này. */
export function openPullRequests(db) {
  return db.prepare(`
    SELECT DISTINCT ${PR_NUMBER} AS number, json_extract(r.evidence_json, '$.pull_request.url') AS url,
      json_extract(r.evidence_json, '$.pull_request.branch') AS branch
    FROM ai_runs r WHERE ${PR_NUMBER} IS NOT NULL AND ${PR_NUMBER} NOT IN (SELECT number FROM ai_pull_requests)
    ORDER BY number
  `).all();
}

/** Worker báo PR đã đóng: ghi trạng thái (lần báo đầu thắng); merged → task win có nhãn = file PR, đóng không
 * merge → task miss ứng viên. Báo lại không sinh trùng. Yêu cầu self: chỉ ghi trạng thái (cổng eval self chấm riêng). */
export function reportPullRequest(db, { number, state, closed_at: closedAt, files } = {}, now = Date.now()) {
  const closed = typeof closedAt === 'number' ? closedAt : Date.parse(String(closedAt ?? ''));
  if (!Number.isInteger(number) || number < 1 || !PR_STATES.has(state) || !Number.isFinite(closed)
    || !Array.isArray(files) || files.length > 3000) {
    throw new WorkerContractError('number, state merged|closed, closed_at and files[] required', 400, 'invalid_pr_state');
  }
  const prFiles = [...new Set(files.map((f) => String(f ?? '')).filter((f) => SAFE_PATH.test(f) && !f.split('/').includes('..')))];
  return db.transaction(() => {
    const runs = db.prepare(`SELECT r.id FROM ai_runs r WHERE ${PR_NUMBER} = ? ORDER BY r.id`).all(number);
    if (!runs.length) throw new WorkerContractError('pull request not recorded', 404, 'pr_not_found');
    db.prepare(`INSERT OR IGNORE INTO ai_pull_requests(number, state, closed_at, files, reported_at) VALUES (?, ?, ?, ?, ?)`)
      .run(number, state, closed, JSON.stringify(prFiles), now);
    const row = db.prepare('SELECT * FROM ai_pull_requests WHERE number=?').get(number);
    const pr = { ...row, files: parse(row.files, []) };
    for (const { id } of runs) {
      const run = db.prepare(RUN).get(id);
      if (run.type === 'self') continue;
      const verdict = parse(run.evidence_json, {}).verdict ?? {};
      // PR folder gom nhiều lượt: mỗi lượt chỉ nhận file PR mà commit của chính nó đã đổi.
      const own = runs.length > 1 && new Set((verdict.candidate?.commits ?? []).flatMap((c) => c.files));
      const files = own ? pr.files.filter((f) => own.has(f)) : pr.files;
      insertTask(db, run, verdict, pr.state === 'merged'
        ? { source: 'win', trigger: 'pr_merged', files, labelled: files.length >= 1 && files.length <= 50 }
        : { trigger: 'pr_closed', failureClass: 'closed', files }, now);
    }
    return pr;
  })();
}
