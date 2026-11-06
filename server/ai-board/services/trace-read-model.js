// Admin trace payload. Unchanged polls answer 304 from a cheap revision fingerprint, skipping the full build.
import { createHash } from 'node:crypto';
import { createRootAllowanceService } from './root-allowance.js';
import { createHsmStore } from '../hsm/store.js';
import { createSpanService } from './spans.js';

const GATE_TTL_MS = 30_000;
// Bounds staleness of time-based fields (lease liveness, gpu wait) that a fingerprint cannot see.
const REVALIDATE_MS = 10_000;
const MAX_CACHED_ROOTS = 50;
const quote = (etag) => `"${etag}"`;

// Each query counts or maxes a column that moves when the trace changes.
const FINGERPRINT = [
  ['SELECT COUNT(*) AS n, MAX(updated_at) AS m FROM ai_tickets WHERE id=? OR parent_id=?', 2],
  ['SELECT COUNT(*) AS n, MAX(e.id) AS m FROM ai_events e JOIN ai_tickets t ON t.id=e.ticket_id WHERE t.id=? OR t.parent_id=?', 2],
  ['SELECT COUNT(*) AS n, MAX(g.id) AS m FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id WHERE r.ticket_id=?', 1],
  ['SELECT COUNT(*) AS n, MAX(s.id) AS m FROM ai_spans s JOIN ai_runs r ON r.id=s.run_id WHERE r.ticket_id=?', 1],
  ['SELECT COUNT(*) AS n, MAX(updated_at) AS m FROM ai_runs WHERE ticket_id=?', 1],
  ['SELECT COUNT(*) AS n, MAX(created_at) AS m FROM ai_attempt_journal WHERE ticket_id=?', 1],
  ['SELECT COUNT(*) AS n, MAX(created_at) AS m FROM ai_work_reservations WHERE root_ticket_id=?', 1],
];

/** Trace read model: `read(requestId, ifNoneMatch)` → null (no request), or {notModified, etag, trace}. */
export function createTraceReadModel(store, deps = {}) {
  const { db } = store;
  const allowance = deps.allowance ?? (db && createRootAllowanceService(store));
  const hsm = deps.hsm ?? (db && createHsmStore(store));
  const spans = deps.spans ?? (db && createSpanService(store));
  const now = deps.now ?? Date.now;
  const gateTtlMs = deps.gateTtlMs ?? GATE_TTL_MS;
  const revalidateMs = deps.revalidateMs ?? REVALIDATE_MS;
  let gate = null;
  const built = new Map(); // root id → {etag, at}

  async function gateHistory() {
    if (gate && now() - gate.at < gateTtlMs) return gate.value;
    const value = await spans.gateHistory(30);
    gate = { at: now(), value };
    return value;
  }

  async function fingerprint(rootId) {
    const rows = await Promise.all(FINGERPRINT.map(([sql, n]) => db.get(sql, Array(n).fill(rootId))));
    return createHash('sha1').update(JSON.stringify(rows)).digest('base64url');
  }

  async function build(requestId) {
    const trace = await store.getRequestTrace(requestId);
    if (!trace) return null;
    if (db) {
      trace.root_work = await allowance.read(trace.root.id);
      trace.hsm = await hsm.read(trace.root.id);
      const byRun = await spans.forRuns(trace.runs.map((r) => r.id));
      for (const run of trace.runs) run.spans = byRun.get(Number(run.id)) || [];
      trace.gate_history = await gateHistory();
    }
    if (trace.resume) {
      trace.resume.saved_ms = (trace.resume.replayed_nodes || []).reduce((sum, node) => {
        const gate = Number(String(node).slice(5).replace('_', '.'));
        return sum + Number(trace.gate_history?.[gate]?.median_ms || 0);
      }, 0);
    }
    return trace;
  }

  async function read(requestId, ifNoneMatch) {
    if (!db) {
      const trace = await build(requestId);
      return trace && { notModified: false, etag: null, trace };
    }
    const root = await db.get('SELECT id FROM ai_tickets WHERE source_request_id=? AND parent_id IS NULL', [Number(requestId)]);
    if (!root) return null;
    const etag = await fingerprint(root.id);
    const hit = built.get(root.id);
    const sent = (ifNoneMatch || '').split(',').map((s) => s.trim());
    if (hit && hit.etag === etag && sent.includes(quote(etag)) && now() - hit.at < revalidateMs) {
      return { notModified: true, etag: quote(etag), trace: null };
    }
    const trace = await build(requestId);
    if (!trace) return null;
    built.set(root.id, { etag, at: now() });
    if (built.size > MAX_CACHED_ROOTS) built.delete(built.keys().next().value);
    return { notModified: false, etag: quote(etag), trace };
  }

  return { read };
}
