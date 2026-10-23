// Ticket graph: node states from trace fixtures, edges, detail panel, rerun, budget strip, clock, escaping, reduced-motion CSS.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { graphNodes, renderTicketGraph, budgetCells, runningClock } from '../public/js/ai-board-graph.js';

const EPOCH = Date.UTC(2026, 9, 23);
const gate = (id, g, status, created_at, extra = {}) => ({ id, gate: g, status, created_at, public_reason: null, internal_reason: null, evidence: null, ...extra });
const call = (id, g, prompt_name, created_at, extra = {}) => ({ id, created_at, evidence: { gate: g, prompt_name, call_id: `call-${id}`, result: 'ok', metrics: { wall_ms: 1500 }, budget_units: 4, ...extra } });
const started = (run_id, g, created_at) => ({ event_type: 'gate_started', run_id, created_at, internal_detail: JSON.stringify({ gate: g, attempt: 0 }) });
const planRun = (id, gates, calls = []) => ({ id, trigger: 'plan', created_at: id, updated_at: id + 1, gates, calls });
const execRun = (id, gates, calls = []) => ({ id, trigger: 'execute', created_at: id, updated_at: id + 1, gates, calls });
const root = (extra = {}) => ({ id: 1, status: 'running', live: false, phase: 'x', lease_expires_at: null, ...extra });
const contract = JSON.parse(fs.readFileSync(new URL('../server/ai-board/contract.json', import.meta.url), 'utf8'));
const graph = { nodes: contract.execution_graph.nodes, edges: contract.execution_graph.edges };

// Plan passed, execution in progress at gate 4 (gate 3 done).
const running = () => ({
  root: root({ live: true }),
  graph,
  runs: [
    planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2, 'passed', 11), gate(3, 2.5, 'passed', 12)]),
    execRun(20, [gate(21, 3, 'passed', 200)], [call(30, 3, 'implement.md', 150)]),
  ],
  events: [started(20, 3, 150), started(20, 4, 300)],
});
const failed = () => ({
  root: root({ status: 'blocked', rerun_stage: 'plan' }),
  graph,
  runs: [planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2, 'blocked', 11, { public_reason: 'Plan touches a blocked file.' })],
    [call(31, 2, 'brainstorm.md', 9, { result: 'error', error: 'timeout from model' })])],
  events: [started(10, 1, 5), started(10, 2, 9)],
});

test('running fixture gives running, succeeded, and waiting nodes', () => {
  const n = graphNodes(running());
  assert.equal(n.gate_4.state, 'running');
  assert.equal(n.gate_3.state, 'succeeded');
  assert.equal(n.gate_1.state, 'succeeded');
  assert.equal(n.attempt_open.state, 'succeeded');
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

test('svg nodes carry their state in aria-label and the icon shape, not colour alone', () => {
  const html = renderTicketGraph(failed(), null);
  assert.match(html, /aria-label="Check allowed files: Failed"/);
  assert.match(html, /aria-label="Check request: Done"/);
  assert.match(html, /aria-label="Check code: Waiting"/);
  assert.match(html, /<path d="M5 5l6 6M11 5l-6 6"/);
  assert.match(html, /<path d="M4\.5 8\.5/);
  assert.match(renderTicketGraph(running(), null), /<circle[^>]*stroke-dasharray="18 14"/);
});

test('nodes are keyboard-reachable svg groups with button role', () => {
  const html = renderTicketGraph(failed(), null);
  assert.match(html, /<g class="g-node[^"]*" data-node="gate_2" role="button" tabindex="0"/);
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, 15);
});

test('edges follow the contract: passed path, repair loop, verdict, and blocked stop', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /data-edge="gate_1>gate_2"/);
  assert.match(html, /data-edge="repair_check>repair"/);
  assert.match(html, /d="M740 380Q400 530 60 270" data-edge="repair>attempt_open"/);
  assert.match(html, /class="g-edge stop" d="[^"]*" data-edge="gate_2>plan_stopped"/);
  assert.doesNotMatch(html, /data-edge="gate_5>attempt_close"/);
});

test('an edge into a running node flows; a passed edge between done nodes is marked done', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /class="g-edge flow done" d="[^"]*" data-edge="gate_3>gate_4"/);
  assert.match(html, /class="g-edge done" d="[^"]*" data-edge="gate_1>gate_2"/);
});

test('rerun action stays on a failed gate node, matching the server stage', () => {
  const plan = renderTicketGraph(failed(), 'gate_2');
  assert.match(plan, /data-action="rerun-gate" data-gate="2"/);
  assert.match(plan, /Plan again from step 1/);
  const exec = failed();
  exec.root.rerun_stage = 'execute';
  assert.doesNotMatch(renderTicketGraph(exec, 'gate_2'), /rerun-gate/);
  assert.doesNotMatch(renderTicketGraph({ ...failed(), root: root({ status: 'blocked', rerun_stage: null }) }, 'gate_2'), /rerun-gate/);
});

test('rerun action is not offered on a succeeded node', () => {
  assert.doesNotMatch(renderTicketGraph(failed(), 'gate_1'), /rerun-gate/);
});

test('budget cells: API shows tokens with bar, local shows GPU time; warn at 80%, bad when used up', () => {
  const api = { root_work: { used: { model_calls: 3, tokens: 1060 }, limits: { model_calls: 40, tokens: 200000 } }, totals: { budget_unit: 'k_tokens' }, root: root(), runs: [] };
  const cells = budgetCells(api, EPOCH);
  assert.equal(cells[0].big, '3 / 40');
  assert.equal(cells[1].big, '1,060 / 200,000');
  assert.equal(cells[1].bar, true);
  assert.equal(cells[1].tone, 'ok');
  const local = { ...api, totals: { budget_unit: 'gpu_s', gpu_s: 19.8 } };
  const localCells = budgetCells(local, EPOCH);
  assert.equal(localCells[1].label, 'GPU time');
  assert.equal(localCells[1].big, '19.8 s');
  assert.equal(localCells[1].bar, false);
  const warn = { root_work: { used: { model_calls: 33, tokens: 0 }, limits: { model_calls: 40, tokens: 1 } }, totals: {}, root: root(), runs: [] };
  assert.equal(budgetCells(warn, EPOCH)[0].tone, 'warn');
  const spent = { root_work: { used: { model_calls: 40, tokens: 0 }, limits: { model_calls: 40, tokens: 1 } }, totals: {}, root: root(), runs: [] };
  assert.equal(budgetCells(spent, EPOCH)[0].big, 'Used up');
  assert.equal(budgetCells(spent, EPOCH)[0].tone, 'bad');
});

test('time left is never invented: No estimate without gate spans', () => {
  const trace = running();
  assert.equal(budgetCells(trace, EPOCH).at(-1).big, 'No estimate');
  trace.runs[1].spans = [{ start_ms: 0, end_ms: 40000, attributes: { 'tizia.gate.id': 4 } }];
  assert.equal(graphNodes(trace).gate_4.typical, 40000);
  assert.equal(graphNodes(running()).gate_4.typical, null);
  assert.match(renderTicketGraph(running(), 'gate_4'), /Typical time<\/dt><dd>No estimate\. No step timing yet\./);
});

test('running clock: fixture epochs and missing runs show a label, never a huge number', () => {
  assert.equal(runningClock({ root: root({ live: true }), runs: [] }, EPOCH).text, 'Not started');
  assert.equal(runningClock(running(), EPOCH).text, 'Not started'); // fixture created_at 10 ms is not a real start
  const real = { root: root({ live: true }), runs: [planRun(EPOCH, [])], events: [] };
  assert.equal(runningClock(real, EPOCH + 65000).text, '1:05');
  assert.equal(runningClock(real, EPOCH + 3723000).text, '1:02:03');
  assert.equal(runningClock({ root: root({ live: true }), runs: [planRun(EPOCH, [])] }, EPOCH + 40 * 24 * 3600 * 1000).text, 'No data');
});

test('untrusted reason text is escaped in the panel', () => {
  const trace = failed();
  trace.runs[0].gates[1].public_reason = '<img src=x onerror=alert(1)>';
  const html = renderTicketGraph(trace, 'gate_2');
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img src=x/);
});

test('reduced motion turns off edge flow and running spin', () => {
  const css = fs.readFileSync(new URL('../public/admin-request.html', import.meta.url), 'utf8');
  const from = css.indexOf('@media (prefers-reduced-motion: reduce) {\n    .g-edge.flow');
  assert.ok(from > 0, 'reduced-motion block for graph');
  const block = css.slice(from, css.indexOf('}\n  }', from) + 4);
  assert.match(block, /\.g-edge\.flow, \.g-node\.st-running \.g-glyph \{ animation:none; \}/);
  assert.match(css, /\.g-edge\.flow \{[^}]*animation:g-flow/);
});
