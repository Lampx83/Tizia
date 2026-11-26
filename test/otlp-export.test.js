import test from 'node:test';
import assert from 'node:assert/strict';
import { traceToOtlp, prettyJson } from '../public/js/otlp.js';

const span = { trace_id: 'a'.repeat(32), span_id: 'b'.repeat(16), parent_span_id: null, name: 'invoke_agent gate3', kind: 'client',
  start_ms: 1700000000123, end_ms: 1700000001123, status: 'ok',
  attributes: { 'gen_ai.operation.name': 'invoke_agent', 'tizia.gate.id': 3, 'tizia.ratio': 0.5, 'tizia.flag': true, 'tizia.files': ['a', 'b'] },
  events: [{ name: 'retry', time_ms: 1700000000500, attributes: { 'tizia.n': 2 } }] };

test('spans become OTLP/JSON with nanosecond strings, numeric kind and status', () => {
  const doc = traceToOtlp({ root: { id: 7 }, runs: [{ id: 1, spans: [span, { ...span, span_id: 'c'.repeat(16), parent_span_id: span.span_id, end_ms: null, status: 'unset', kind: 'internal' }] }] });
  const [s, child] = doc.resourceSpans[0].scopeSpans[0].spans;
  assert.equal(s.startTimeUnixNano, '1700000000123000000');
  assert.equal(s.endTimeUnixNano, '1700000001123000000');
  assert.equal(s.kind, 3);
  assert.deepEqual(s.status, { code: 1 });
  assert.equal(s.parentSpanId, undefined);
  assert.equal(child.parentSpanId, span.span_id);
  assert.equal(child.endTimeUnixNano, '0');
  assert.deepEqual(child.status, { code: 0 });
  const byKey = Object.fromEntries(s.attributes.map((a) => [a.key, a.value]));
  assert.deepEqual(byKey['tizia.gate.id'], { intValue: '3' });
  assert.deepEqual(byKey['tizia.ratio'], { doubleValue: 0.5 });
  assert.deepEqual(byKey['tizia.flag'], { boolValue: true });
  assert.deepEqual(byKey['tizia.files'], { arrayValue: { values: [{ stringValue: 'a' }, { stringValue: 'b' }] } });
  assert.equal(s.events[0].timeUnixNano, '1700000000500000000');
  assert.deepEqual(doc.resourceSpans[0].resource.attributes[0], { key: 'service.name', value: { stringValue: 'tizia-ai-board' } });
});

test('no spans → null; prettyJson indents objects and leaves other text alone', () => {
  assert.equal(traceToOtlp({ runs: [{ id: 1, spans: [] }] }), null);
  assert.equal(prettyJson('{"a":{"b":1}}'), '{\n  "a": {\n    "b": 1\n  }\n}');
  assert.equal(prettyJson('{"cut":'), '{"cut":');
  assert.equal(prettyJson('plain'), 'plain');
});
