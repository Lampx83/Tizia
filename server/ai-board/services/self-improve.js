// ============================================================
// Vòng tự cải thiện ban đêm
// ============================================================
// Worker tự kiểm đồng hồ; server giữ công tắc admin, điều kiện chạy (bật, đủ task có nhãn, không PR self
// đang mở, chưa tự dừng), cụm bị bỏ qua, và 1 dòng mỗi đêm. Verdict của lượt self cập nhật biến thể.
// ============================================================
import { LIMITS, WorkerContractError } from '../repositories/store.js';
import { evalTaskSplit } from './eval-tasks.js';
import { listFrozenScores } from './frozen-benchmark.js';
import { listPostMergeWatch } from './post-merge-watch.js';

const SI = LIMITS.self_improve;
const DAY_MS = 24 * 3600_000;
const NIGHT = /^\d{4}-\d{2}-\d{2}$/;
const VARIANT_STATUS = new Set(['waiting', 'accepted', 'rejected', 'dropped']);
const parse = (json, fallback) => { try { return JSON.parse(json) ?? fallback; } catch { return fallback; } };
const view = (row) => row && { ...row, variants: parse(row.variants, []), pr_sync: parse(row.pr_sync, null) };
const settled = (v) => v.status !== 'waiting';

function state(db) {
  const row = db.prepare('SELECT enabled, enabled_at FROM ai_self_improve_state WHERE id=1').get();
  return row ? { enabled: !!row.enabled, enabled_at: row.enabled_at ?? 0 } : { enabled: !!SI.enabled, enabled_at: 0 };
}

const finishedNights = (db, since = 0) => db.prepare(`SELECT * FROM ai_self_improve_nights
  WHERE status != 'running' AND started_at >= ? ORDER BY started_at DESC`).all(since).map(view);

/** Đếm đêm xong liên tiếp (mới nhất trước, từ lần bật) không biến thể nào được nhận; biến thể chờ → dừng đếm. */
function emptyNights(db) {
  let n = 0;
  for (const night of finishedNights(db, state(db).enabled_at)) {
    if (night.variants.some((v) => v.status === 'accepted' || !settled(v))) break;
    n += 1;
  }
  return n;
}

/** Key cụm có ≥ after_failed_nights đêm gần nhất của nó đều thất bại, đêm cuối trong `days` ngày. */
function skippedClusters(db, now) {
  const { after_failed_nights: after, days } = SI.cluster_skip;
  const byKey = new Map();
  for (const night of finishedNights(db)) {
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

const OPEN_SELF_PR = `
  SELECT 1 FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id JOIN requests q ON q.id = t.source_request_id
  WHERE q.type = 'self' AND json_extract(r.evidence_json, '$.pull_request.number') IS NOT NULL
    AND json_extract(r.evidence_json, '$.pull_request.number') NOT IN (SELECT number FROM ai_pull_requests) LIMIT 1`;

/** Worker đầu đêm (sau đồng bộ PR): chạy được không; được thì tạo dòng đêm (1 lần) và trả cụm bỏ qua. */
export function startNight(db, night, now = Date.now()) {
  if (!NIGHT.test(String(night))) throw new WorkerContractError('night must be YYYY-MM-DD', 400, 'invalid_night');
  const split = evalTaskSplit(db, now);
  const row = view(db.prepare('SELECT * FROM ai_self_improve_nights WHERE night=?').get(night));
  const reason = !state(db).enabled ? 'disabled'
    : row && row.status !== 'running' ? 'night_done'
      : !split.ready ? 'not_enough_labelled'
        : db.prepare(OPEN_SELF_PR).get() ? 'self_pr_open'
          : emptyNights(db) >= SI.pause_after_empty_nights ? 'paused' : null;
  const base = { labelled: split.labelled, min_tasks: split.min_tasks, limits: SI };
  if (reason) return { run: false, reason, night: row, ...base };
  if (!row) db.prepare('INSERT INTO ai_self_improve_nights(night, started_at) VALUES (?, ?)').run(night, now);
  return { run: true, reason: null, night: view(db.prepare('SELECT * FROM ai_self_improve_nights WHERE night=?').get(night)),
    skip_clusters: skippedClusters(db, now), ...base };
}

/** Worker ghi vào dòng đêm: kết quả đồng bộ PR, 1 biến thể, GPU-s đề xuất (tổng), kết thúc (done | stopped). */
export function reportNight(db, { night, variant, pr_sync: prSync, gpu_s_propose: propose, finished, note } = {}, now = Date.now()) {
  const row = db.prepare('SELECT * FROM ai_self_improve_nights WHERE night=?').get(String(night));
  if (!row) throw new WorkerContractError('night not started', 404, 'night_not_found');
  if (finished !== undefined && !['done', 'stopped'].includes(finished)) throw new WorkerContractError('finished must be done|stopped');
  const variants = parse(row.variants, []);
  if (variant) {
    if (!VARIANT_STATUS.has(variant.status)) throw new WorkerContractError('invalid variant status');
    const clean = JSON.stringify(variant);
    if (clean.length > 8000) throw new WorkerContractError('variant too large');
    if (!variants.some((v) => v.request_id && v.request_id === variant.request_id)) variants.push(JSON.parse(clean));
  }
  db.prepare(`UPDATE ai_self_improve_nights SET variants=?, pr_sync=COALESCE(?, pr_sync), gpu_s_propose=COALESCE(?, gpu_s_propose),
    status=COALESCE(?, status), finished_at=CASE WHEN ? IS NULL THEN finished_at ELSE ? END, note=COALESCE(?, note) WHERE night=?`)
    .run(JSON.stringify(variants), prSync ? JSON.stringify(prSync).slice(0, 4000) : null,
      Number.isFinite(propose) ? propose : null, finished ?? null, finished ?? null, now,
      note ? String(note).slice(0, 500) : null, row.night);
  return view(db.prepare('SELECT * FROM ai_self_improve_nights WHERE night=?').get(row.night));
}

/** Verdict lượt self → biến thể của đêm tạo ra nó: accepted/rejected + eval; cộng GPU-s eval. {night} khi thắng. */
export function recordSelfVerdict(db, ticketId, verdict) {
  const requestId = db.prepare(`SELECT r.id FROM ai_tickets t JOIN requests r ON r.id = t.source_request_id
    WHERE t.id=? AND r.type='self'`).get(Number(ticketId))?.id;
  if (!requestId) return null;
  const row = db.prepare(`SELECT n.* FROM ai_self_improve_nights n, json_each(n.variants) v
    WHERE json_extract(v.value, '$.request_id') = ? LIMIT 1`).get(requestId);
  if (!row) return null;
  const ev = (verdict.gates || []).find((g) => g.gate === 5)?.eval ?? null;
  const accepted = ['ready_for_pr', 'needs_review'].includes(verdict.outcome) && ev?.accepted === true;
  const variants = parse(row.variants, []).map((v) => (v.request_id !== requestId ? v : {
    ...v, status: accepted ? 'accepted' : 'rejected', reason: accepted ? null : verdict.reason ?? null,
    eval: ev && { wins: ev.wins, losses: ev.losses, ties: ev.ties, dropped: ev.dropped ?? [], gpu_s: ev.gpu_s },
  }));
  db.prepare('UPDATE ai_self_improve_nights SET variants=?, gpu_s_eval = gpu_s_eval + ? WHERE night=?')
    .run(JSON.stringify(variants), Number(ev?.gpu_s) || 0, row.night);
  return accepted ? { night: row.night, request_id: requestId } : null;
}

const PR_OF = db => db.prepare(`SELECT json_extract(r.evidence_json, '$.pull_request.url') AS url,
    json_extract(r.evidence_json, '$.pull_request.number') AS number, p.state
  FROM ai_runs r JOIN ai_tickets t ON t.id = r.ticket_id
  LEFT JOIN ai_pull_requests p ON p.number = json_extract(r.evidence_json, '$.pull_request.number')
  WHERE t.source_request_id = ? AND json_extract(r.evidence_json, '$.pull_request.number') IS NOT NULL
  ORDER BY r.id DESC LIMIT 1`);

/** Admin: công tắc, tự dừng, 30 đêm gần nhất (PR của biến thể gắn lúc đọc). */
export function listNights(db, limit = 30) {
  const pr = PR_OF(db);
  const nights = db.prepare('SELECT * FROM ai_self_improve_nights ORDER BY night DESC LIMIT ?').all(limit).map(view)
    .map((n) => ({ ...n, variants: n.variants.map((v) => ({ ...v, pr: v.request_id ? pr.get(v.request_id) ?? null : null })) }));
  const empty = emptyNights(db);
  return { ...state(db), paused: empty >= SI.pause_after_empty_nights, empty_nights: empty, limits: SI, nights,
    // Đường cong học — không phụ thuộc đêm nào, gộp vào cùng response cho tab admin.
    frozen: listFrozenScores(db),
    // Kết quả theo dõi production sau mỗi lần merge self, cùng response cho tab admin.
    post_merge_watch: listPostMergeWatch(db) };
}

// frozen_at: mốc chụp bộ đánh giá đóng băng — chỉ ghi lần bật đầu tiên (COALESCE giữ giá trị cũ),
// khác enabled_at vốn đếm lại mỗi lần bật/tắt.
export function setSelfImproveEnabled(db, enabled, adminUserId, now = Date.now()) {
  if (typeof enabled !== 'boolean') throw new WorkerContractError('enabled must be boolean');
  db.prepare(`INSERT INTO ai_self_improve_state(id, enabled, enabled_at, frozen_at, updated_by, updated_at)
      VALUES (1, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET enabled=excluded.enabled, updated_by=excluded.updated_by, updated_at=excluded.updated_at,
      enabled_at=CASE WHEN excluded.enabled THEN excluded.enabled_at ELSE enabled_at END,
      frozen_at=COALESCE(frozen_at, excluded.frozen_at)`)
    .run(enabled ? 1 : 0, now, enabled ? now : null, adminUserId ?? null, now);
  return listNights(db);
}

/** onSelfWin: chuông cho mọi admin khi 1 biến thể thắng. */
export function selfWinNotifier(db, createNotification) {
  return ({ night, request_id: requestId }) => {
    for (const a of db.prepare("SELECT display_name, username FROM users WHERE role='admin'").all()) {
      createNotification({ user_display_name: a.display_name || a.username, kind: 'reply',
        title: '🏛️ Ban tự cải thiện: có biến thể thắng',
        body: `Đêm ${night}: yêu cầu tự sửa #${requestId} thắng eval — xem PR nháp.`, url: '/admin.html#selfimprove' });
    }
  };
}
