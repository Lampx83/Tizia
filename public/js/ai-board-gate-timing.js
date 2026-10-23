// Gate durations and ETA from trace spans. Pure: runs in admin page or Node test, no DOM, no fetch.
// Runs must be in creation order; each run carries `spans` as returned by /api/admin/ai-board/requests/:id/trace.
import { TRACE_STEPS } from './ai-board-trace.js';

const DONE_STATUSES = ['passed', 'blocked'];

const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/** Map gate id → total ms of finished gate spans in one run. Spans without tizia.gate.id are skipped (old traces). */
export function gateDurationsForRun(run = {}) {
  const out = new Map();
  for (const span of run.spans || []) {
    const attrs = span.attributes || {};
    const gate = Number(attrs['tizia.gate.id']);
    if (attrs['tizia.gate.id'] == null || !Number.isFinite(gate)) continue;
    if (span.status !== 'ok' || !DONE_STATUSES.includes(attrs['tizia.gate.status']) || span.end_ms == null) continue;
    const ms = Number(span.end_ms) - Number(span.start_ms);
    if (!Number.isFinite(ms) || ms < 0) continue;
    out.set(gate, (out.get(gate) || 0) + ms);
  }
  return out;
}

/** Median ms of `gate` over runs before `beforeRunId` (all runs if omitted). `ms` null + reason when no history. */
export function typicalGateMs(runs = [], gate, beforeRunId = null) {
  const cut = beforeRunId == null ? -1 : runs.findIndex(r => r.id === beforeRunId);
  const history = cut < 0 ? runs : runs.slice(0, cut);
  const samples = history.map(run => gateDurationsForRun(run).get(gate)).filter(ms => ms != null);
  if (!samples.length) return { ms: null, samples: 0, reason: 'no_history' };
  return { ms: median(samples), samples: samples.length, reason: null };
}

/**
 * ETA of gates not yet finished in `currentRunId`. eta_ms null + reason 'no_history' if any remaining gate lacks history.
 * Default gates: TRACE_STEPS ids.
 */
export function gateEta(runs = [], { currentRunId = null, gates = TRACE_STEPS.map(s => s.gate) } = {}) {
  const current = runs.find(r => r.id === currentRunId);
  const finished = current ? gateDurationsForRun(current) : new Map();
  const remaining = gates.filter(gate => !finished.has(gate));
  const typical = Object.fromEntries(remaining.map(gate => [gate, typicalGateMs(runs, gate, currentRunId)]));
  const missing = remaining.filter(gate => typical[gate].ms == null);
  if (missing.length) return { remaining, typical, missing, eta_ms: null, reason: 'no_history' };
  return { remaining, typical, missing, eta_ms: remaining.reduce((sum, gate) => sum + typical[gate].ms, 0), reason: null };
}
