// ============================================================
// Bộ đánh giá đóng băng + đường cong học
// ============================================================
// Sau mỗi lần merge 1 thay đổi self (PR loại self được báo state='merged' vào ai_pull_requests), worker
// đo lại bộ đóng băng đúng 1 lần: bộ đo tất định hiện tại + gold cổng 3 + task đóng băng (eval-tasks.js
// frozenTasks), ở sha vừa merge. Không bao giờ dùng để chọn biến thể — chỉ vẽ đường cong học cho hội đồng.
// Cờ frozen trên ai_eval_tasks và frozen_at trên ai_self_improve_state sống ở eval-tasks.js / self-improve.js.
// ============================================================
import { WorkerContractError } from './store.js';
import { frozenTasks } from './eval-tasks-async.js';

const parse = (json, fallback) => { try { return JSON.parse(json) ?? fallback; } catch { return fallback; } };
const SHA = /^[0-9a-f]{40}$/;
const isScore = (v) => typeof v === 'number' && Number.isFinite(v);
// {nhóm: điểm} whitelist + trần, như smallMap của store.js — nhóm lạ/điểm không phải số bị bỏ.
const cleanStrata = (m) => Object.fromEntries(Object.entries(m && typeof m === 'object' ? m : {}).slice(0, 60)
  .filter(([, v]) => isScore(v)).map(([k, v]) => [String(k).slice(0, 80), v]));

// Self PR đã merge nhưng chưa đo bộ đóng băng lần nào; sha = head_sha của candidate đã tạo ra PR đó.
const pendingSql = (db) => {
  const num = db.jsonNum('r.evidence_json', 'pull_request.number');
  return `
  SELECT DISTINCT ${num} AS pr_number,
    ${db.jsonText('r.evidence_json', 'verdict.candidate.head_sha')} AS sha
  FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id
  JOIN ai_pull_requests p ON p.number = ${num}
  WHERE q.type = 'self' AND p.state = 'merged'
    AND ${num} NOT IN (SELECT pr_number FROM ai_frozen_benchmark_scores)
  ORDER BY pr_number
`;
};

/** Worker: self PR đã merge còn cần đo (1 lần/PR) + bộ task đóng băng hiện có, cùng 1 lần gọi vì luôn đo cùng nhau. */
export async function pendingFrozenMeasurements(db) {
  const pending = (await db.all(pendingSql(db))).filter((row) => SHA.test(String(row.sha)))
    .map((row) => ({ pr_number: Number(row.pr_number), sha: row.sha }));
  return { pending, tasks: await frozenTasks(db) };
}

/** Worker ghi 1 lần đo bộ đóng băng cho 1 PR self đã merge (điểm theo nhóm + sha + mã cấu hình). Báo lại cùng
 * pr_number → giữ lần đầu, không lỗi, không ghi đè (ON CONFLICT DO NOTHING, UNIQUE(pr_number)). */
export async function recordFrozenMeasurement(db, { pr_number: prNumber, sha, config, strata, gpu_s: gpuS } = {}, now = Date.now()) {
  if (!Number.isInteger(Number(prNumber)) || Number(prNumber) < 1) throw new WorkerContractError('invalid pr_number');
  if (!SHA.test(String(sha))) throw new WorkerContractError('invalid sha');
  await db.run(`INSERT INTO ai_frozen_benchmark_scores(pr_number, sha, config_hash, strata, gpu_s, measured_at)
    VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING`, [Number(prNumber), String(sha), JSON.stringify(config && typeof config === 'object' ? config : {}).slice(0, 500),
      JSON.stringify(cleanStrata(strata)), Number.isFinite(Number(gpuS)) ? Number(gpuS) : 0, now]);
  return view(await db.get('SELECT * FROM ai_frozen_benchmark_scores WHERE pr_number=?', [Number(prNumber)]));
}

const view = (r) => r && { ...r, config_hash: parse(r.config_hash, {}), strata: parse(r.strata, {}) };

/** Admin (tab "Tự cải thiện"): đường cong học — điểm từng nhóm theo thời gian, kèm link PR mỗi lần merge. */
export async function listFrozenScores(db, limit = 500) {
  const prUrl = `SELECT ${db.jsonText('evidence_json', 'pull_request.url')} AS url FROM ai_runs
    WHERE ${db.jsonNum('evidence_json', 'pull_request.number')} = ? LIMIT 1`;
  const rows = (await db.all('SELECT * FROM ai_frozen_benchmark_scores ORDER BY measured_at, pr_number LIMIT ?', [limit])).map(view);
  const out = [];
  for (const r of rows) out.push({ ...r, pr_url: (await db.get(prUrl, [r.pr_number]))?.url ?? null });
  return out;
}
