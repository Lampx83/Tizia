// Stored spans → OTLP/JSON (ExportTraceServiceRequest) so a trace can be pasted into any OTel viewer.
const KIND = { internal: 1, server: 2, client: 3, producer: 4, consumer: 5 };
const STATUS = { unset: 0, ok: 1, error: 2 };
const nanos = (ms) => (ms == null ? '0' : (BigInt(Math.trunc(ms)) * 1000000n).toString());

function anyValue(v) {
  if (Array.isArray(v)) return { arrayValue: { values: v.map(anyValue) } };
  if (typeof v === 'boolean') return { boolValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { intValue: String(v) } : { doubleValue: v };
  return { stringValue: String(v) };
}
const attrs = (obj = {}) => Object.entries(obj).filter(([, v]) => v != null).map(([key, v]) => ({ key, value: anyValue(v) }));

export function spanToOtlp(span) {
  return {
    traceId: span.trace_id, spanId: span.span_id, ...(span.parent_span_id ? { parentSpanId: span.parent_span_id } : {}),
    name: span.name, kind: KIND[span.kind] ?? KIND.internal,
    startTimeUnixNano: nanos(span.start_ms), endTimeUnixNano: nanos(span.end_ms),
    attributes: attrs(span.attributes),
    events: (span.events || []).map((e) => ({ timeUnixNano: nanos(e.time_ms), name: e.name, attributes: attrs(e.attributes) })),
    status: { code: STATUS[span.status] ?? STATUS.unset },
  };
}

/** Trace read-model → OTLP/JSON document, or null when no run carries spans. */
export function traceToOtlp(trace = {}) {
  const spans = (trace.runs || []).flatMap((run) => run.spans || []);
  if (!spans.length) return null;
  const resource = attrs({ 'service.name': 'tizia-ai-board', 'tizia.ticket.id': trace.root?.id });
  return { resourceSpans: [{ resource: { attributes: resource },
    scopeSpans: [{ scope: { name: 'tizia.ai-board' }, spans: spans.map(spanToOtlp) }] }] };
}

/** Pretty JSON when text parses as an object/array, else the text unchanged. */
export function prettyJson(text) {
  try {
    const value = JSON.parse(text);
    return value && typeof value === 'object' ? JSON.stringify(value, null, 2) : String(text);
  } catch { return String(text ?? ''); }
}
