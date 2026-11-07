// ============================================================
// Task eval từ production
// ============================================================
// Lần hỏng (verdict blocked, "Thử cách khác", admin hoàn tác, PR đóng không merge) → 1 task ứng viên / lượt;
// PR merged → 1 task win đã có nhãn = file của PR (worker hỏi GitHub rồi báo);
// admin gắn nhãn (file mong đợi, chuỗi phải có / không được có); worker lấy phần học /
// phần kiểm tra chia theo thời gian. Không lưu tên hay mã người gửi.
// Retire lúc đọc: quá retire_days, hoặc mọi file mong đợi không còn trong cây làm việc.
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LIMITS, WorkerContractError } from '../repositories/store-contract.js';
import { createEvalTaskRepository } from '../repositories/eval-tasks.js';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const DAY_MS = 24 * 3600_000;
const SAFE_PATH = /^[\w@-][\w@./-]{0,299}$/;
const STATUSES = new Set(['candidate', 'labelled', 'retired']);
const PR_STATES = new Set(['merged', 'closed']);

const parse = (json, fallback = null) => { try { return JSON.parse(json) ?? fallback; } catch { return fallback; } };
const view = ({ deleted_at: _d, ...t }) => ({ ...t, expected_files: parse(t.expected_files, []),
  must_contain: parse(t.must_contain), must_not_contain: parse(t.must_not_contain) });

/** 1 task / (nguồn, lượt); đã có (kể cả đã xoá) → bỏ qua. */
async function insertTask(repo, run, verdict, { source = 'miss', trigger, gate = null, failureClass = null, files, labelled = false }, now) {
  await repo.insertTask({ source, trigger, requestId: run.request_id, runId: run.id, requestText: [run.title, run.detail].filter(Boolean).join('\n\n'),
    clarifiedSpec: run.clarified_spec ?? null, baseSha: verdict.base_sha ?? verdict.candidate?.base_sha ?? null, gate, failureClass,
    skill: verdict.skill ?? null, expectedFiles: JSON.stringify([...new Set(files)]), status: labelled ? 'labelled' : 'candidate',
    now, labelledAt: labelled ? now : null });
}

/** Ghi lần hỏng của run thành task ứng viên. Lặp lại / đã có (kể cả đã xoá) → bỏ qua. Lỗi môi trường không tính. */
export async function recordMiss(repo, runId, trigger, now = Date.now()) {
  const run = await repo.runRow(runId);
  if (!run || run.type === 'self') return; // lượt board tự sửa: cổng eval của self tự chấm, không phải lần hỏng production
  const verdict = parse(run.evidence_json, {}).verdict ?? {};
  if (verdict.failure_class === 'transient') return; // hạ tầng hỏng, không phải lỗi của board
  if (verdict.failure_class === 'partial') return; // dừng giữa plan để chạy nốt: chưa phải lượt hỏng
  const undo = trigger === 'undo';
  const plan = run.plan_hash && parse((await repo.planJson(run.ticket_id, run.plan_hash))?.plan_json);
  // Gợi ý nhãn: hoàn tác → file của commit bị hoàn tác; bị chặn → phạm vi plan đã nhắm.
  const files = undo ? (verdict.candidate?.commits ?? []).flatMap((c) => c.files) : plan?.allowed_scope ?? [];
  await insertTask(repo, run, verdict, { trigger, gate: undo ? null : verdict.gate_reached ?? null,
    failureClass: undo ? 'undone' : verdict.failure_class ?? null, files }, now);
}

/** "Thử cách khác" → lượt hỏng cuối; hoàn tác → lượt đạt cuối (thay đổi bị hoàn tác) của yêu cầu. */
export async function recordRequestMiss(repo, requestId, trigger, now = Date.now()) {
  const run = await repo.latestRequestRun(requestId, trigger === 'undo');
  if (run) await recordMiss(repo, run.id, trigger, now);
}

// ponytail: quét mọi task còn sống ở mỗi lần đọc; vài trăm task thì rẻ, nhiều hơn thì nhớ sha HEAD đã kiểm.
async function retire(repo, now) {
  await repo.retireOlderThan(now - LIMITS.self_improve.retire_days * DAY_MS, now);
  for (const t of await repo.liveTasksWithFiles()) {
    const files = parse(t.expected_files, []);
    if (files.length && files.every((f) => !fs.existsSync(path.join(REPO_ROOT, f)))) await repo.retireTask(t.id, now);
  }
}

// ── Bộ đánh giá đóng băng: chụp lúc bật vòng lần đầu (frozen_at, self-improve.js) +
// mọi task gắn nhãn trong frozen_window_days ngày sau đó. Task đóng băng không bao giờ vào evalTaskSplit (hard
// exclusion). Gọi lúc đọc (như retire): tất định, không cần cron; đã đóng băng thì không bao giờ bỏ cờ lại. ──
async function freeze(repo) {
  const frozenAt = await repo.frozenAt();
  if (!frozenAt) return;
  await repo.freezeLabelledBefore(frozenAt + LIMITS.self_improve.frozen_window_days * DAY_MS);
}

/** Worker: task đóng băng đang labelled — dùng để đo lại sau mỗi lần merge self,
 * không bao giờ đưa cho người đề xuất hay dùng để chọn biến thể. */
export async function frozenTasks(repo, now = Date.now()) {
  await freeze(repo);
  await retire(repo, now);
  return (await repo.frozenLabelled()).map(view);
}

/** Admin: task theo trạng thái (mặc định ứng viên) + đếm mỗi trạng thái. */
export async function listEvalTasks(repo, status = 'candidate', now = Date.now()) {
  if (!STATUSES.has(status)) throw new WorkerContractError('invalid status');
  await freeze(repo);
  await retire(repo, now);
  const counts = Object.fromEntries((await repo.statusCounts()).map((r) => [r.status, r.n]));
  const tasks = (await repo.tasksByStatus(status)).map(view);
  return { tasks, counts };
}

const cleanStrings = (value) => {
  const list = (Array.isArray(value) ? value : []).map((s) => String(s ?? '').trim()).filter(Boolean);
  if (list.length > 10 || list.some((s) => s.length > 200)) throw new WorkerContractError('at most 10 strings of 200 characters');
  return list.length ? JSON.stringify(list) : null;
};

/** Gắn nhãn: 1–50 file (đường dẫn tương đối trong repo), tuỳ chọn chuỗi phải có / không được có. */
export async function labelEvalTask(repo, id, { expected_files: files, must_contain: must, must_not_contain: mustNot } = {}, now = Date.now()) {
  const list = (Array.isArray(files) ? files : []).map((f) => String(f ?? '').trim().replace(/\\/g, '/'));
  if (!list.length || list.length > 50 || list.some((f) => !SAFE_PATH.test(f) || f.split('/').includes('..'))) {
    throw new WorkerContractError('expected_files must be 1–50 repo-relative paths', 400, 'invalid_label');
  }
  const task = await repo.liveStatus(id);
  if (!task) throw new WorkerContractError('eval task not found', 404, 'eval_task_not_found');
  if (task.status === 'retired') throw new WorkerContractError('eval task is retired', 409, 'eval_task_retired');
  await repo.labelTask({ id, files: JSON.stringify([...new Set(list)]), mustContain: cleanStrings(must), mustNotContain: cleanStrings(mustNot), now });
  return view(await repo.taskRow(id));
}

/** Xoá nội dung task (lời người dùng); giữ khoá để sự kiện sau của cùng lượt không tạo lại. */
export async function deleteEvalTask(repo, id, now = Date.now()) {
  const info = await repo.eraseTask(id, now);
  if (!info.changes) throw new WorkerContractError('eval task not found', 404, 'eval_task_not_found');
  return { ok: true };
}

/** Worker: task đã gắn nhãn chia theo thời gian — cũ nhất (split) để học, mới nhất để kiểm tra. Task đóng băng
 * không bao giờ lọt vào đây — hard exclusion, kể cả khi đã labelled. */
export async function evalTaskSplit(repo, now = Date.now()) {
  await freeze(repo);
  await retire(repo, now);
  const { min_labelled_tasks: min, learning_split: split } = LIMITS.self_improve;
  const labelled = (await repo.labelledTrainable()).map(view);
  const cut = Math.floor(labelled.length * split);
  return { ready: labelled.length >= min, labelled: labelled.length, min_tasks: min, split,
    learning: labelled.slice(0, cut), test: labelled.slice(cut) };
}

// ── Trạng thái PR: worker hỏi GitHub các PR server còn coi là mở, báo lại khi đã đóng ──

/** Worker: PR server đã ghi mà chưa báo đóng — worker hỏi GitHub đúng các PR này. */
export async function openPullRequests(repo) {
  return repo.openPullRequests();
}

/** Worker báo PR đã đóng: ghi trạng thái (lần báo đầu thắng); merged → task win có nhãn = file PR, đóng không
 * merge → task miss ứng viên. Báo lại không sinh trùng. Yêu cầu self: chỉ ghi trạng thái (cổng eval self chấm riêng). */
export async function reportPullRequest(repo, { number, state, closed_at: closedAt, files } = {}, now = Date.now()) {
  const closed = typeof closedAt === 'number' ? closedAt : Date.parse(String(closedAt ?? ''));
  if (!Number.isInteger(number) || number < 1 || !PR_STATES.has(state) || !Number.isFinite(closed)
    || !Array.isArray(files) || files.length > 3000) {
    throw new WorkerContractError('number, state merged|closed, closed_at and files[] required', 400, 'invalid_pr_state');
  }
  const prFiles = [...new Set(files.map((f) => String(f ?? '')).filter((f) => SAFE_PATH.test(f) && !f.split('/').includes('..')))];
  return repo.tx(async () => {
    const runs = await repo.runsForPr(number);
    if (!runs.length) throw new WorkerContractError('pull request not recorded', 404, 'pr_not_found');
    await repo.insertPr({ number, state, closed, files: JSON.stringify(prFiles), now });
    const row = await repo.prRow(number);
    const pr = { ...row, files: parse(row.files, []) };
    for (const { id } of runs) {
      const run = await repo.runRow(id);
      if (run.type === 'self') continue;
      const verdict = parse(run.evidence_json, {}).verdict ?? {};
      // PR folder gom nhiều lượt: mỗi lượt chỉ nhận file PR mà commit của chính nó đã đổi.
      const own = runs.length > 1 && new Set((verdict.candidate?.commits ?? []).flatMap((c) => c.files));
      const files = own ? pr.files.filter((f) => own.has(f)) : pr.files;
      await insertTask(repo, run, verdict, pr.state === 'merged'
        ? { source: 'win', trigger: 'pr_merged', files, labelled: files.length >= 1 && files.length <= 50 }
        : { trigger: 'pr_closed', failureClass: 'closed', files }, now);
    }
    return pr;
  });
}
