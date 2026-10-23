// Ticket graph: node states from trace fixtures, detail panel, escaping, reduced-motion CSS.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { graphNodes, renderTicketGraph } from '../public/js/ai-board-graph.js';

const gate = (id, g, status, created_at) => ({ id, gate: g, status, created_at, public_reason: null, internal_reason: null, evidence: null });
const call = (id, g, prompt_name, created_at, extra = {}) => ({ id, created_at, evidence: { gate: g, prompt_name, call_id: `call-${id}`, result: 'ok', metrics: { wall_ms: 1500 }, budget_units: 4, ...extra } });
const started = (run_id, g, created_at) => ({ event_type: 'gate_started', run_id, created_at, internal_detail: JSON.stringify({ gate: g, attempt: 0 }) });
const planRun = (id, gates, calls = []) => ({ id, trigger: 'plan', created_at: id, gates, calls });
const execRun = (id, gates, calls = []) => ({ id, trigger: 'execute', created_at: id, gates, calls });
const root = (extra = {}) => ({ id: 1, status: 'running', live: false, phase: 'x', lease_expires_at: null, ...extra });

// Plan passed, execution in progress at gate 4 (gate 3 done).
const running = () => ({
  root: root({ live: true }),
  runs: [
    planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2, 'passed', 11), gate(3, 2.5, 'passed', 12)]),
    execRun(20, [gate(21, 3, 'passed', 200)], [call(30, 3, 'implement.md', 150)]),
  ],
  events: [started(20, 3, 150), started(20, 4, 300)],
});
const failed = () => ({
  root: root({ status: 'blocked' }),
  runs: [planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2, 'blocked', 11)], [call(31, 2, 'brainstorm.md', 9, { result: 'error', error: 'timeout from model' })])],
  events: [started(10, 1, 5), started(10, 2, 9)],
});

test('running fixture gives running, succeeded, and waiting nodes', () => {
  const n = graphNodes(running());
  assert.equal(n.gate_4.state, 'running');
  assert.equal(n.gate_3.state, 'succeeded');
  assert.equal(n.gate_1.state, 'succeeded');
  assert.equal(n.attempt_open.state, 'running');
  assert.equal(n.plan_ready.state, 'succeeded');
  assert.equal(n.gate_5.state, 'idle');
  assert.equal(n.plan_stopped.state, 'idle');
});

test('failed fixture marks the blocking gate and plan_stopped as failed', () => {
  const n = graphNodes(failed());
  assert.equal(n.gate_2.state, 'failed');
  assert.equal(n.gate_1.state, 'succeeded');
  assert.equal(n.plan_stopped.state, 'failed');
  assert.equal(n.gate_2_5.state, 'idle');
  assert.equal(n.plan_ready.state, 'idle');
});

test('idle nodes are waiting, with no run at all', () => {
  const n = graphNodes({ root: root(), runs: [], events: [] });
  for (const node of Object.values(n)) assert.equal(node.state, 'idle', node.id);
});

test('blocked plan run then passing plan run: only the latest plan decides', () => {
  const n = graphNodes({
    root: root(),
    runs: [
      planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2.5, 'blocked', 11)]),
      planRun(12, [gate(3, 2.5, 'passed', 13)]),
    ],
    events: [started(10, 2.5, 10), started(12, 2.5, 12)],
  });
  assert.equal(n.plan_ready.state, 'succeeded');
  assert.equal(n.plan_stopped.state, 'idle');
  assert.equal(n.gate_2_5.state, 'succeeded');
});

test('panel shows calls, budget, time, and error text for a failed node', () => {
  const html = renderTicketGraph(failed(), 'gate_2');
  assert.match(html, /aria-pressed="true" data-node="gate_2"|data-node="gate_2" aria-pressed="true"/);
  assert.match(html, /Check allowed files/);
  assert.match(html, /Time used<\/dt><dd>1\.5 s/);
  assert.match(html, /Budget used<\/dt><dd>4/);
  assert.match(html, /Failed/);
  assert.match(html, /timeout from model/);
  assert.match(html, /data-slot="node-action"/);
  assert.match(html, /data-k="graph-raw:gate_2"/);
});

test('running node shows its current call and the default selection', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /data-selected="gate_4"/);
  assert.match(html, /Waiting for the worker to reply\./);
});

test('untrusted reason text is escaped in the panel', () => {
  const trace = failed();
  trace.runs[0].gates[1].public_reason = '<img src=x onerror=alert(1)>';
  const html = renderTicketGraph(trace, 'gate_2');
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img src=x/);
});

test('every node button carries a label and a state word, not colour alone', () => {
  const html = renderTicketGraph(failed(), null);
  for (const label of ['Waiting', 'Done', 'Failed']) assert.match(html, new RegExp(`class="g-state[^"]*"><svg[^>]*>.*?</svg>${label}`));
});

test('animations are disabled under prefers-reduced-motion', () => {
  const css = fs.readFileSync(new URL('../public/admin-request.html', import.meta.url), 'utf8');
  const from = css.indexOf('.gnode.st-running::after, .gnode.st-running .g-icon');
  const block = css.slice(css.lastIndexOf('prefers-reduced-motion', from), css.indexOf('border-width:3px', from));
  assert.match(block, /\.gnode\.st-running::after, \.gnode\.st-running \.g-icon \{ animation:none/);
  const motion = [...css.matchAll(/\.(gnode|g-item|g-icon)[^{}]*\{[^}]*animation:/g)].map(m => m[0]);
  assert.ok(motion.length >= 3);
});
