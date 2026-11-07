import { PHASES } from '../repositories/store-contract.js';
import { createSpanService } from './spans.js';
import { EDITABLE_PHASES } from './requester-edit.js';
import { gateEta } from '../../../public/js/ai-board-gate-timing.js';
import { createRequesterProgressRepository } from '../repositories/requester-progress.js';

/** Requester view of one own request. Null when not owner. Never prompts, spans, sandbox output or model names. */
export async function requesterProgress(store, requestId, ownerUserId, isAdmin = false, repo = createRequesterProgressRepository(store.db)) {
  const row = await repo.requestRow(Number(requestId), Number(ownerUserId));
  if (!row) return null;
  const live = row.ticket_status === 'running' && !!row.lease_owner && Number(row.lease_expires_at) > Date.now();
  // Queue waiting on the shared GPU: the worker retries by itself, so this is a wait state, not an error (LF/100).
  const gpu = row.ticket_status === 'queued' && store.gpuStatus ? await store.gpuStatus() : null;
  const phase = PHASES[row.phase];
  const stopped = !!phase?.terminal && row.phase !== 'done';
  return {
    request_id: row.id,
    status: row.status,
    step: phase?.label ?? null,
    note: row.public_note ?? null,
    live,
    // Dừng giữa plan nhưng đã xong một phần: CHỈ ADMIN bấm "Tiếp tục" (chạy nốt từ checkpoint).
    can_continue: isAdmin && row.ticket_status === 'waiting_admin' && row.phase === 'partial',
    // Người gửi không được resume; muốn thay đổi thì dừng rồi sửa yêu cầu và gửi lại.
    can_edit: !isAdmin && !live && EDITABLE_PHASES.has(row.phase),
    eta_ms: live ? await etaMs(store, repo, row.root_id) : null,
    budget: row.root_id ? { used: Number(row.cumulative_budget) || 0, limit: Number(row.budget_limit) || null } : null,
    stop_reason: stopped ? row.public_note ?? null : null,
    gpu_waiting: gpu ? { retry_at: gpu.retry_at } : null,
  };
}

async function etaMs(store, repo, rootId) {
  if (!rootId) return null;
  const runIds = await repo.runIds(rootId);
  const spans = createSpanService(store);
  const byRun = await spans.forRuns(runIds);
  const runs = runIds.map((id) => ({ id, spans: byRun.get(Number(id)) || [] }));
  const gateHistory = await spans.gateHistory(30);
  return gateEta(runs, { currentRunId: runs.at(-1)?.id ?? null, gateHistory }).eta_ms;
}
