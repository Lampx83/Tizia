// Spans named after OpenTelemetry GenAI semantic conventions, written by the worker beside ai_gate_traces/tool_step.
// Prompt and completion text never land here: keys outside gen_ai.*/tizia.* and the GenAI content keys are refused.
import { WorkerContractError } from '../repositories/store-contract.js';

const MAX_SPANS = 200;
const MAX_ATTRS = 40;
const MAX_EVENTS = 20;
const MAX_TEXT = 300;
const DONE_GATE_STATUSES = ['passed', 'blocked'];
const TRACE = /^[0-9a-f]{32}$/;
const SPAN = /^[0-9a-f]{16}$/;
const KEY = /^(gen_ai|tizia)\.[a-z0-9_.]{1,80}$/;
const CONTENT = /^gen_ai\.(input\.messages|output\.messages|system_instructions|tool\.call\.arguments|tool\.call\.result|prompt|completion)$|\.(prompt|completion|output|observation)$/;
const bad = (message, code = 'invalid_span', status = 400) => new WorkerContractError(message, status, code);
const parse = (text, fallback) => { try { return JSON.parse(text); } catch { return fallback; } };

function scalar(value, key) {
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number') { if (!Number.isFinite(value)) throw bad(`${key} must be finite`); return value; }
  if (typeof value === 'string') { if (value.length > MAX_TEXT) throw bad(`${key} too long`); return value; }
  throw bad(`${key} must be a scalar or a list of scalars`);
}

function attributes(raw) {
  if (raw == null) return {};
  if (typeof raw !== 'object' || Array.isArray(raw)) throw bad('attributes must be an object');
  const entries = Object.entries(raw);
  if (entries.length > MAX_ATTRS) throw bad('too many attributes');
  const out = {};
  for (const [key, value] of entries) {
    if (!KEY.test(key)) throw bad(`attribute ${key} must use the gen_ai. or tizia. prefix`);
    if (CONTENT.test(key)) throw bad(`attribute ${key} would carry prompt or completion content`, 'span_content_refused');
    out[key] = Array.isArray(value) ? value.slice(0, 20).map((v) => scalar(v, key)) : scalar(value, key);
  }
  return out;
}

const time = (value, name) => {
  if (!Number.isSafeInteger(value) || value < 0) throw bad(`${name} must be epoch milliseconds`);
  return value;
};

export function cleanSpan(raw) {
  if (!raw || typeof raw !== 'object') throw bad('span must be an object');
  if (!TRACE.test(raw.trace_id)) throw bad('trace_id must be 32 hex');
  if (!SPAN.test(raw.span_id)) throw bad('span_id must be 16 hex');
  if (raw.parent_span_id != null && !SPAN.test(raw.parent_span_id)) throw bad('parent_span_id must be 16 hex');
  if (typeof raw.name !== 'string' || !raw.name || raw.name.length > 120) throw bad('name required');
  const kind = raw.kind ?? 'internal';
  if (!['internal', 'client'].includes(kind)) throw bad('kind must be internal or client');
  const status = raw.status ?? 'unset';
  if (!['unset', 'ok', 'error'].includes(status)) throw bad('status must be unset, ok or error');
  const start = time(raw.start_ms, 'start_ms');
  const end = raw.end_ms == null ? null : time(raw.end_ms, 'end_ms');
  if (end != null && end < start) throw bad('end_ms before start_ms');
  const events = raw.events ?? [];
  if (!Array.isArray(events) || events.length > MAX_EVENTS) throw bad(`events must be an array of at most ${MAX_EVENTS}`);
  return {
    trace_id: raw.trace_id, span_id: raw.span_id, parent_span_id: raw.parent_span_id ?? null, name: raw.name, kind,
    start_ms: start, end_ms: end, status, attributes: attributes(raw.attributes),
    events: events.map((e) => {
      if (!e || typeof e.name !== 'string' || !e.name || e.name.length > 120) throw bad('event name required');
      return { name: e.name, time_ms: time(e.time_ms, 'event time_ms'), attributes: attributes(e.attributes) };
    }),
  };
}

export function createSpanService(store) {
  const db = store.db;

  async function record(ticketId, body) {
    return db.tx(async () => {
      await store.assertLease(ticketId, String(body.worker_id || ''), String(body.lease_token || ''));
      const run = await db.get('SELECT id FROM ai_runs WHERE id=? AND ticket_id=?', [Number(body.run_id), Number(ticketId)]);
      if (!run) throw bad('run does not belong to ticket', 'invalid_run');
      if (!Array.isArray(body.spans) || body.spans.length > MAX_SPANS) throw bad(`spans must be an array of at most ${MAX_SPANS}`);
      const spans = body.spans.map(cleanSpan);
      const prior = await db.get('SELECT trace_id FROM ai_spans WHERE run_id=? LIMIT 1', [run.id]);
      const traceId = prior?.trace_id ?? spans[0]?.trace_id;
      if (spans.some((s) => s.trace_id !== traceId)) throw bad('one run has one trace_id', 'trace_mismatch', 409);
      let stored = 0;
      const now = Date.now();
      for (const s of spans) {
        const hit = await db.run(`INSERT INTO ai_spans(run_id, trace_id, span_id, parent_span_id, name, kind, start_ms, end_ms, status,
            attributes_json, events_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT (trace_id, span_id) DO NOTHING`,
        [run.id, s.trace_id, s.span_id, s.parent_span_id, s.name, s.kind, s.start_ms, s.end_ms, s.status,
          JSON.stringify(s.attributes), JSON.stringify(s.events), now]);
        stored += hit?.changes ?? 0;
      }
      return { stored, duplicates: spans.length - stored };
    });
  }

  /** Spans per run id, ordered by start; JSON columns parsed. */
  async function forRuns(runIds) {
    const ids = runIds.map(Number).filter(Number.isInteger);
    if (!ids.length) return new Map();
    const rows = await db.all(`SELECT run_id, trace_id, span_id, parent_span_id, name, kind, start_ms, end_ms, status, attributes_json, events_json
      FROM ai_spans WHERE run_id IN (${ids.map(() => '?').join(',')}) ORDER BY start_ms, id`, ids);
    const out = new Map(ids.map((id) => [id, []]));
    for (const { attributes_json: a, events_json: e, run_id: runId, ...row } of rows) {
      out.get(Number(runId))?.push({ ...row, start_ms: Number(row.start_ms), end_ms: row.end_ms == null ? null : Number(row.end_ms),
        attributes: parse(a, {}), events: parse(e, []) });
    }
    return out;
  }

  /** Median ms per gate over the last `runs` runs that have gate spans, all tickets and models. */
  async function gateHistory(runs = 30) {
    const rows = await db.all(`SELECT run_id, attributes_json, status, start_ms, end_ms FROM ai_spans
      WHERE name LIKE 'invoke_agent gate%' AND run_id IN (SELECT run_id FROM ai_spans WHERE name LIKE 'invoke_agent gate%'
        GROUP BY run_id ORDER BY run_id DESC LIMIT ?)`, [Math.min(Math.max(Number(runs) || 0, 1), 100)]);
    const perRun = new Map();
    for (const row of rows) {
      const attrs = parse(row.attributes_json, {});
      const gate = Number(attrs['tizia.gate.id']);
      if (attrs['tizia.gate.id'] == null || !Number.isFinite(gate) || row.status !== 'ok' || row.end_ms == null) continue;
      if (!DONE_GATE_STATUSES.includes(attrs['tizia.gate.status'])) continue;
      const ms = Number(row.end_ms) - Number(row.start_ms);
      if (!(ms >= 0)) continue;
      const run = perRun.get(row.run_id) || new Map();
      run.set(gate, (run.get(gate) || 0) + ms);
      perRun.set(row.run_id, run);
    }
    const samples = new Map();
    for (const run of perRun.values()) for (const [gate, ms] of run) samples.set(gate, [...(samples.get(gate) || []), ms]);
    return Object.fromEntries([...samples].map(([gate, list]) => {
      const sorted = [...list].sort((a, b) => a - b);
      const mid = sorted.length >> 1;
      return [gate, { median_ms: sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2, n: sorted.length }];
    }));
  }

  return { record, forRuns, gateHistory };
}
