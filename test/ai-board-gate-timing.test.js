import test from 'node:test';
import assert from 'node:assert/strict';
import { gateDurationsForRun, typicalGateMs, gateEta } from '../public/js/ai-board-gate-timing.js';

const gateSpan = (gate, ms, over = {}) => ({ name: `invoke_agent gate ${gate}`, status: 'ok', start_ms: 1000, end_ms: 1000 + ms,
  attributes: { 'tizia.gate.id': gate, 'tizia.gate.status': 'passed' }, ...over });
const run = (id, spans) => ({ id, spans });

test('gate durations sum finished gate spans and skip spans without gate id, errors and stubs', () => {
  const r = run(1, [gateSpan(1, 500), gateSpan(3, 4000), gateSpan(3, 1000),
    gateSpan(4, 900, { status: 'error' }), gateSpan(5, 300, { attributes: { 'tizia.gate.id': 5, 'tizia.gate.status': 'stub' } }),
    { name: 'chat qwen', status: 'ok', start_ms: 0, end_ms: 99, attributes: { 'gen_ai.request.model': 'qwen' } },
    gateSpan(2, 200, { end_ms: null })]);
  assert.deepEqual([...gateDurationsForRun(r)], [[1, 500], [3, 5000]]);
});

test('legacy trace without spans or gate ids has no durations and no crash', () => {
  assert.equal(gateDurationsForRun({ id: 1 }).size, 0);
  assert.equal(gateDurationsForRun({ id: 1, spans: [{ status: 'ok', start_ms: 1, end_ms: 2, attributes: null }] }).size, 0);
});

test('typical gate time is median over earlier runs only', () => {
  const runs = [run(1, [gateSpan(3, 1000)]), run(2, [gateSpan(3, 5000)]), run(3, [gateSpan(3, 2000)]), run(4, [gateSpan(3, 99999)])];
  assert.deepEqual(typicalGateMs(runs, 3, 4), { ms: 2000, samples: 3, reason: null });
  assert.deepEqual(typicalGateMs(runs.slice(0, 2), 3, 2), { ms: 1000, samples: 1, reason: null });
  assert.deepEqual(typicalGateMs(runs, 3), { ms: 3500, samples: 4, reason: null });
});

test('even sample count takes mean of the two middle values', () => {
  const runs = [run(1, [gateSpan(1, 100)]), run(2, [gateSpan(1, 300)])];
  assert.equal(typicalGateMs(runs, 1, 3).ms, 200);
});

test('no history returns no estimate with reason', () => {
  assert.deepEqual(typicalGateMs([], 3, 1), { ms: null, samples: 0, reason: 'no_history' });
  const eta = gateEta([run(1, [])], { currentRunId: 1, gates: [1, 3] });
  assert.equal(eta.eta_ms, null);
  assert.equal(eta.reason, 'no_history');
  assert.deepEqual(eta.missing, [1, 3]);
});

test('ETA sums typical time of gates not finished in the current run', () => {
  const runs = [
    run(1, [gateSpan(1, 100), gateSpan(3, 1000), gateSpan(4, 400)]),
    run(2, [gateSpan(1, 300), gateSpan(3, 3000), gateSpan(4, 600)]),
    run(3, [gateSpan(1, 200), gateSpan(3, 2000)]),
  ];
  const eta = gateEta(runs, { currentRunId: 3, gates: [1, 3, 4] });
  assert.equal(eta.reason, null);
  assert.deepEqual(eta.remaining, [4]);
  assert.equal(eta.eta_ms, 500);
  assert.equal(gateEta(runs, { currentRunId: 3, gates: [1, 3] }).eta_ms, 0);
});

test('ETA with mixed legacy and new runs ignores legacy runs for gates they lack', () => {
  const runs = [run(1, [{ status: 'ok', start_ms: 0, end_ms: 9 }]), run(2, [gateSpan(3, 800)]), run(3, [])];
  const eta = gateEta(runs, { currentRunId: 3, gates: [3] });
  assert.equal(eta.eta_ms, 800);
});

test('default gate list follows trace steps', () => {
  const eta = gateEta([], { currentRunId: null });
  assert.deepEqual(eta.remaining, [1, 2, 2.5, 3, 4, 5, 5.5]);
});

test('ETA falls back to all-ticket gate history per gate and names the source', () => {
  const runs = [run(1, [gateSpan(1, 100)]), run(2, [])];
  const gateHistory = { 3: { median_ms: 7000, n: 30 }, 4: { median_ms: 900, n: 12 } };
  const eta = gateEta(runs, { currentRunId: 2, gates: [1, 3, 4], gateHistory });
  assert.equal(eta.eta_ms, 100 + 7000 + 900);
  assert.equal(eta.source, 'all tickets');
  assert.deepEqual(eta.typical[1], { ms: 100, samples: 1, reason: null, source: 'same ticket' });
  assert.equal(eta.typical[3].source, 'all tickets');
  assert.equal(eta.typical[3].samples, 30);
});

test('ETA with same-ticket history only reports same ticket source', () => {
  const runs = [run(1, [gateSpan(3, 1000)]), run(2, [])];
  const eta = gateEta(runs, { currentRunId: 2, gates: [3] });
  assert.equal(eta.source, 'same ticket');
  assert.equal(eta.eta_ms, 1000);
});

test('no same-ticket and no shared history gives no estimate with source label', () => {
  const eta = gateEta([run(1, [])], { currentRunId: 1, gates: [3], gateHistory: { 4: { median_ms: 5, n: 1 } } });
  assert.equal(eta.source, 'no estimate');
  assert.equal(eta.typical[3].source, 'no estimate');
  assert.equal(eta.eta_ms, null);
});

test('missing gate_history (old server, no database) behaves like no history', () => {
  const eta = gateEta([run(1, [])], { currentRunId: 1, gates: [3], gateHistory: undefined });
  assert.equal(eta.reason, 'no_history');
});
