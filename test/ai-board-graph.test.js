// Ticket graph: node states from trace fixtures, detail panel, rerun action, budget line, escaping, reduced-motion CSS.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { graphNodes, renderTicketGraph, budgetParts } from '../public/js/ai-board-graph.js';

const gate = (id, g, status, created_at, extra = {}) => ({ id, gate: g, status, created_at, public_reason: null, internal_reason: null, evidence: null, ...extra });
const call = (id, g, prompt_name, created_at, extra = {}) => ({ id, created_at, evidence: { gate: g, prompt_name, call_id: `call-${id}`, result: 'ok', metrics: { wall_ms: 1500 }, budget_units: 4, ...extra } });
const started = (run_id, g, created_at) => ({ event_type: 'gate_started', run_id, created_at, internal_detail: JSON.stringify({ gate: g, attempt: 0 }) });
const planRun = (id, gates, calls = []) => ({ id, trigger: 'plan', created_at: id, updated_at: id + 1, gates, calls });
const execRun = (id, gates, calls = []) => ({ id, trigger: 'execute', created_at: id, updated_at: id + 1, gates, calls });
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
  root: root({ status: 'blocked', rerun_stage: 'plan' }),
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

test('every node button carries its state word for screen readers, icon shape carries it visually', () => {
  const html = renderTicketGraph(failed(), null);
  assert.match(html, /aria-label="Check allowed files: Failed"/);
  assert.match(html, /aria-label="Check request: Done"/);
  assert.match(html, /aria-label="Check code: Waiting"/);
  assert.match(html, /<svg class="g-icon"[^>]*><path d="M5 5l6 6M11 5l-6 6"/);
  assert.match(html, /<svg class="g-icon"[^>]*><path d="M4\.5 8\.5/);
  assert.match(renderTicketGraph(running(), null), /<svg class="g-icon"[^>]*><circle[^>]*stroke-dasharray="18 14"/);
});

test('panel shows calls, budget, time, and error text for a failed node', () => {
  const html = renderTicketGraph(failed(), 'gate_2');
  assert.match(html, /data-node="gate_2" aria-pressed="true"|aria-pressed="true" data-node="gate_2"/);
  assert.match(html, /Check that the plan only changes allowed files\./);
  assert.match(html, /Time used<\/dt><dd>1\.5 s/);
  assert.match(html, /Budget used<\/dt><dd>4/);
  assert.match(html, /timeout from model/);
  assert.match(html, /Plan touches a blocked file\./);
  assert.match(html, /data-k="graph-raw:gate_2"/);
});

test('running node shows its current call and is the default selection', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /aria-pressed="true" data-node="gate_4"|data-node="gate_4" aria-pressed="true"/);
  assert.match(html, /Waiting for the worker to reply\./);
});

test('rerun action stays on a failed gate node, matching the server stage', () => {
  const plan = renderTicketGraph(failed(), 'gate_2');
  assert.match(plan, /data-action="rerun-gate" data-gate="2"/);
  assert.match(plan, /Plan again from step 1/);
  const exec = failed();
  exec.root.rerun_stage = 'execute';
  assert.doesNotMatch(renderTicketGraph(exec, 'gate_2'), /rerun-gate/);
  const stageOff = renderTicketGraph({ ...failed(), root: root({ status: 'blocked', rerun_stage: null }) }, 'gate_2');
  assert.doesNotMatch(stageOff, /rerun-gate/);
});

test('rerun action is not offered on a succeeded node', () => {
  const html = renderTicketGraph(failed(), 'gate_1');
  assert.doesNotMatch(html, /rerun-gate/);
});

test('budget line: model calls and tokens for API budget, GPU time and elapsed for local', () => {
  const trace = {
    root_work: { used: { model_calls: 3, tokens: 1060 }, limits: { model_calls: 40, tokens: 200000 } },
    totals: { budget_unit: 'k_tokens', gpu_s: 0 },
    root: root({ live: true }), runs: [planRun(1000, [gate(1, 1, 'passed', 1000)])], events: [],
  };
  const api = budgetParts(trace, 1000 + 125000).join(' · ');
  assert.match(api, /Model calls 3 of 40/);
  assert.match(api, /Tokens 1,060 of 200,000/);
  assert.match(api, /Running 2:05/);
  assert.match(budgetParts({ ...trace, root: root({ live: true }), runs: [planRun(1000, [])] }, 1000 + 3723000).join(' · '), /Running 1:02:03/);
  assert.match(api, /Time left: No estimate\. No step timing yet\./);
  const local = { ...trace, totals: { budget_unit: 'gpu_s', gpu_s: 19.8 } };
  const parts = budgetParts(local, 1000 + 1000).join(' · ');
  assert.match(parts, /GPU time 19\.8 s/);
  assert.doesNotMatch(parts, /Tokens/);
});

test('time left is estimated only from recorded gate spans, never invented', () => {
  const trace = running();
  trace.runs[1].spans = [{ start_ms: 0, end_ms: 40000, attributes: { 'tizia.gate.id': 4 } }];
  const withSpans = budgetParts(trace).join(' · ');
  assert.doesNotMatch(withSpans, /Time left: about/); // gate 5 onward has no spans yet
  assert.equal(graphNodes(trace).gate_4.typical, 40000);
  assert.equal(graphNodes(running()).gate_4.typical, null);
  assert.match(renderTicketGraph(running(), 'gate_4'), /Typical time<\/dt><dd>No estimate\. No step timing yet\./);
});

test('untrusted reason text is escaped in the panel', () => {
  const trace = failed();
  trace.runs[0].gates[1].public_reason = '<img src=x onerror=alert(1)>';
  const html = renderTicketGraph(trace, 'gate_2');
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img src=x/);
});

test('animations are disabled under prefers-reduced-motion', () => {
  const css = fs.readFileSync(new URL('../public/admin-request.html', import.meta.url), 'utf8');
  const from = css.indexOf('@media (prefers-reduced-motion: reduce) {\n    .gnode');
  const block = css.slice(from, css.indexOf('}\n  }', from) + 4);
  assert.match(block, /\.gnode\.st-running \.g-icon \{ animation:none; \}/);
  assert.ok(css.includes('.gnode.st-running .g-icon { color:var(--accent2); animation:spin'));
});
