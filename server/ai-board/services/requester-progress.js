import { PHASES } from '../repositories/store-contract.js';
import { createSpanService } from './spans.js';
import { gateEta } from '../../../public/js/ai-board-gate-timing.js';

/** Requester view of one own request. Null when not owner. Never prompts, spans, sandbox output or model names. */
export async function requesterProgress(store, requestId, ownerUserId) {
  const row = await store.db.get(`
    SELECT r.id, r.status, t.id AS root_id, t.phase, t.public_note, t.cumulative_budget, t.budget_limit,
           t.lease_owner, t.lease_expires_at
    FROM requests r LEFT JOIN ai_tickets t ON t.source_request_id = r.id AND t.parent_id IS NULL
    WHERE r.id = ? AND r.owner_user_id = ?
  `, [Number(requestId), Number(ownerUserId)]);
  if (!row) return null;
  const live = !!row.lease_owner && row.lease_expires_at > Date.now();
  const phase = PHASES[row.phase];
  const stopped = !!phase?.terminal && row.phase !== 'done';
  return {
    request_id: row.id,
    status: row.status,
    step: phase?.label ?? null,
    note: row.public_note ?? null,
    live,
    eta_ms: live ? await etaMs(store, row.root_id) : null,
    budget: row.root_id ? { used: row.cumulative_budget, limit: row.budget_limit } : null,
    stop_reason: stopped ? row.public_note ?? null : null,
  };
}

async function etaMs(store, rootId) {
  if (!rootId) return null;
  const runIds = (await store.db.all('SELECT id FROM ai_runs WHERE ticket_id = ? ORDER BY created_at, id', [rootId])).map((r) => r.id);
  const spans = createSpanService(store);
  const byRun = await spans.forRuns(runIds);
  const runs = runIds.map((id) => ({ id, spans: byRun.get(Number(id)) || [] }));
  const gateHistory = await spans.gateHistory(30);
  return gateEta(runs, { currentRunId: runs.at(-1)?.id ?? null, gateHistory }).eta_ms;
}
