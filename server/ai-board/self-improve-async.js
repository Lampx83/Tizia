// ============================================================
// Vòng tự cải thiện ban đêm
// ============================================================
// Worker tự kiểm đồng hồ; server giữ công tắc admin, điều kiện chạy (bật, đủ task có nhãn, không PR self
// đang mở, chưa tự dừng), cụm bị bỏ qua, và 1 dòng mỗi đêm. Verdict của lượt self cập nhật biến thể.
// ============================================================
import { LIMITS, WorkerContractError } from './store.js';
import { evalTaskSplit } from './eval-tasks-async.js';
import { listFrozenScores } from './frozen-benchmark-async.js';
import { listPostMergeWatch } from './post-merge-watch-async.js';

const SI = LIMITS.self_improve;
const DAY_MS = 24 * 3600_000;
const NIGHT = /^\d{4}-\d{2}-\d{2}$/;
const VARIANT_STATUS = new Set(['waiting', 'accepted', 'rejected', 'dropped']);
const parse = (json, fallback) => { try { return JSON.parse(json) ?? fallback; } catch { return fallback; } };
const view = (row) => row && { ...row, variants: parse(row.variants, []), pr_sync: parse(row.pr_sync, null) };
const settled = (v) => v.status !== 'waiting';

async function state(db) {
  const row = await db.get('SELECT enabled, enabled_at FROM ai_self_improve_state WHERE id=1');
  return row ? { enabled: !!row.enabled, enabled_at: row.enabled_at ?? 0 } : { enabled: !!SI.enabled, enabled_at: 0 };
}

const finishedNights = async (db, since = 0) => (await db.all(`SELECT * FROM ai_self_improve_nights
  WHERE status != 'running' AND started_at >= ? ORDER BY started_at DESC`, [since])).map(view);

/** Đếm đêm xong liên tiếp (mới nhất trước, từ lần bật) không biến thể nào được nhận; biến thể chờ → dừng đếm. */
async function emptyNights(db) {
  let n = 0;
  for (const night of await finishedNights(db, (await state(db)).enabled_at)) {
    if (night.variants.some((v) => v.status === 'accepted' || !settled(v))) break;
    n += 1;
  }
  return n;
}

/** Key cụm có ≥ after_failed_nights đêm gần nhất của nó đều thất bại, đêm cuối trong `days` ngày. */
async function skippedClusters(db, now) {
  const { after_failed_nights: after, days } = SI.cluster_skip;
  const byKey = new Map();
  for (const night of await finishedNights(db)) {
    for (const key of new Set(night.variants.map((v) => v.cluster?.key).filter(Boolean))) {
      const mine = night.variants.filter((v) => v.cluster?.key === key);
      const list = byKey.get(key) || [];
      list.push({ at: night.started_at, failed: mine.every(settled) && !mine.some((v) => v.status === 'accepted') });
      byKey.set(key, list);
    }
  }
  return [...byKey].filter(([, list]) => list.length >= after && list.slice(0, after).every((x) => x.failed)
    && list[0].at >= now - days * DAY_MS).map(([key]) => key).sort();
}

const openSelfPr = (db) => {
  const num = db.jsonNum('r.evidence_json', 'pull_request.number');
  return `
  SELECT 1 FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id
  WHERE q.type = 'self' AND ${num} IS NOT NULL
    AND ${num} NOT IN (SELECT number FROM ai_pull_requests) LIMIT 1`;
};

/** Worker đầu đêm (sau đồng bộ PR): chạy được không; được thì tạo dòng đêm (1 lần) và trả cụm bỏ qua. */
export async function startNight(db, night, now = Date.now()) {
  if (!NIGHT.test(String(night))) throw new WorkerContractError('night must be YYYY-MM-DD', 400, 'invalid_night');
  const split = await evalTaskSplit(db, now);
  const row = view(await db.get('SELECT * FROM ai_self_improve_nights WHERE night=?', [night]));
  const reason = !(await state(db)).enabled ? 'disabled'
    : row && row.status !== 'running' ? 'night_done'
      : !split.ready ? 'not_enough_labelled'
        : await db.get(openSelfPr(db)) ? 'self_pr_open'
          : await emptyNights(db) >= SI.pause_after_empty_nights ? 'paused' : null;
  const base = { labelled: split.labelled, min_tasks: split.min_tasks, limits: SI };
  if (reason) return { run: false, reason, night: row, ...base };
  if (!row) await db.run('INSERT INTO ai_self_improve_nights(night, started_at) VALUES (?, ?)', [night, now]);
  return { run: true, reason: null, night: view(await db.get('SELECT * FROM ai_self_improve_nights WHERE night=?', [night])),
    skip_clusters: await skippedClusters(db, now), ...base };
}

/** Worker ghi vào dòng đêm: kết quả đồng bộ PR, 1 biến thể, GPU-s đề xuất (tổng), kết thúc (done | stopped). */
export async function reportNight(db, { night, variant, pr_sync: prSync, gpu_s_propose: propose, finished, note } = {}, now = Date.now()) {
  const row = await db.get('SELECT * FROM ai_self_improve_nights WHERE night=?', [String(night)]);
  if (!row) throw new WorkerContractError('night not started', 404, 'night_not_found');
  if (finished !== undefined && !['done', 'stopped'].includes(finished)) throw new WorkerContractError('finished must be done|stopped');
  const variants = parse(row.variants, []);
  if (variant) {
    if (!VARIANT_STATUS.has(variant.status)) throw new WorkerContractError('invalid variant status');
    const clean = JSON.stringify(variant);
    if (clean.length > 8000) throw new WorkerContractError('variant too large');
    if (!variants.some((v) => v.request_id && v.request_id === variant.request_id)) variants.push(JSON.parse(clean));
  }
  await db.run(`UPDATE ai_self_improve_nights SET variants=?, pr_sync=COALESCE(?, pr_sync), gpu_s_propose=COALESCE(?, gpu_s_propose),
    status=COALESCE(?, status), finished_at=CASE WHEN CAST(? AS TEXT) IS NULL THEN finished_at ELSE ? END, note=COALESCE(?, note) WHERE night=?`, [JSON.stringify(variants), prSync ? JSON.stringify(prSync).slice(0, 4000) : null,
      Number.isFinite(propose) ? propose : null, finished ?? null, finished ?? null, now,
      note ? String(note).slice(0, 500) : null, row.night]);
  return view(await db.get('SELECT * FROM ai_self_improve_nights WHERE night=?', [row.night]));
}

/** Verdict lượt self → biến thể của đêm tạo ra nó: accepted/rejected + eval; cộng GPU-s eval. {night} khi thắng. */
export async function recordSelfVerdict(db, ticketId, verdict) {
  const requestId = (await db.get(`SELECT r.id FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
    WHERE t.id=? AND r.type='self'`, [Number(ticketId)]))?.id;
  if (!requestId) return null;
  // variants is a JSON text column: match in JS (a handful of nights) instead of json_each, which PostgreSQL spells differently.
  const row = (await db.all('SELECT * FROM ai_self_improve_nights ORDER BY started_at, night'))
    .find((n) => parse(n.variants, []).some((v) => v.request_id === requestId));
  if (!row) return null;
  const ev = (verdict.gates || []).find((g) => g.gate === 5)?.eval ?? null;
  const accepted = ['ready_for_pr', 'needs_review'].includes(verdict.outcome) && ev?.accepted === true;
  const variants = parse(row.variants, []).map((v) => (v.request_id !== requestId ? v : {
    ...v, status: accepted ? 'accepted' : 'rejected', reason: accepted ? null : verdict.reason ?? null,
    eval: ev && { wins: ev.wins, losses: ev.losses, ties: ev.ties, dropped: ev.dropped ?? [], gpu_s: ev.gpu_s },
  }));
  await db.run('UPDATE ai_self_improve_nights SET variants=?, gpu_s_eval = gpu_s_eval + ? WHERE night=?', [JSON.stringify(variants), Number(ev?.gpu_s) || 0, row.night]);
  return accepted ? { night: row.night, request_id: requestId } : null;
}

const prOf = async (db, requestId) => {
  const num = db.jsonNum('r.evidence_json', 'pull_request.number');
  return await db.get(`SELECT ${db.jsonText('r.evidence_json', 'pull_request.url')} AS url,
      ${num} AS number, p.state
    FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id
    LEFT JOIN ai_pull_requests p ON p.number = ${num}
    WHERE t.source_request_id = ? AND ${num} IS NOT NULL
    ORDER BY r.id DESC LIMIT 1`, [requestId]);
};

/** Admin: công tắc, tự dừng, 30 đêm gần nhất (PR của biến thể gắn lúc đọc). */
export async function listNights(db, limit = 30) {
  const nights = (await db.all('SELECT * FROM ai_self_improve_nights ORDER BY night DESC LIMIT ?', [limit])).map(view);
  for (const n of nights) {
    for (const v of n.variants) v.pr = v.request_id ? (await prOf(db, v.request_id)) ?? null : null;
  }
  const empty = await emptyNights(db);
  return { ...(await state(db)), paused: empty >= SI.pause_after_empty_nights, empty_nights: empty, limits: SI, nights,
    // Đường cong học — không phụ thuộc đêm nào, gộp vào cùng response cho tab admin.
    frozen: await listFrozenScores(db),
    // Kết quả theo dõi production sau mỗi lần merge self, cùng response cho tab admin.
    post_merge_watch: await listPostMergeWatch(db) };
}

// frozen_at: mốc chụp bộ đánh giá đóng băng — chỉ ghi lần bật đầu tiên (COALESCE giữ giá trị cũ),
// khác enabled_at vốn đếm lại mỗi lần bật/tắt.
export async function setSelfImproveEnabled(db, enabled, adminUserId, now = Date.now()) {
  if (typeof enabled !== 'boolean') throw new WorkerContractError('enabled must be boolean');
  await db.run(`INSERT INTO ai_self_improve_state(id, enabled, enabled_at, frozen_at, updated_by, updated_at)
      VALUES (1, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET enabled=excluded.enabled, updated_by=excluded.updated_by, updated_at=excluded.updated_at,
      enabled_at=CASE WHEN excluded.enabled <> 0 THEN excluded.enabled_at ELSE ai_self_improve_state.enabled_at END,
      frozen_at=COALESCE(ai_self_improve_state.frozen_at, excluded.frozen_at)`, [enabled ? 1 : 0, now, enabled ? now : null, adminUserId ?? null, now]);
  return await listNights(db);
}

/** onSelfWin: chuông cho mọi admin khi 1 biến thể thắng. */
export function selfWinNotifier(db, createNotification) {
  return async ({ night, request_id: requestId }) => {
    for (const a of await db.all("SELECT display_name, username FROM users WHERE role='admin'")) {
      createNotification({ user_display_name: a.display_name || a.username, kind: 'reply',
        title: '🏛️ Ban tự cải thiện: có biến thể thắng',
        body: `Đêm ${night}: yêu cầu tự sửa #${requestId} thắng eval — xem PR nháp.`, url: '/admin.html#selfimprove' });
    }
  };
}
