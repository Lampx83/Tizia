// Ticket graph: node states from trace fixtures, edges, detail panel, rerun, budget strip, gate timing, escaping, reduced-motion CSS.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { graphNodes, renderTicketGraph, budgetCells } from '../public/js/ai-board-graph.js';

const EPOCH = Date.UTC(2026, 9, 23);
const GATES = [1, 2, 2.5, 3, 4, 5, 5.5];
const gate = (id, g, status, created_at, extra = {}) => ({ id, gate: g, status, created_at, public_reason: null, internal_reason: null, evidence: null, ...extra });
const call = (id, g, prompt_name, created_at, extra = {}) => ({ id, created_at, evidence: { gate: g, prompt_name, call_id: `call-${id}`, result: 'ok', metrics: { wall_ms: 1500 }, budget_units: 4, ...extra } });
const started = (run_id, g, created_at) => ({ event_type: 'gate_started', run_id, created_at, internal_detail: JSON.stringify({ gate: g, attempt: 0 }) });
const planRun = (id, gates, calls = []) => ({ id, trigger: 'plan', created_at: id, updated_at: id + 1, gates, calls });
const execRun = (id, gates, calls = []) => ({ id, trigger: 'execute', created_at: id, updated_at: id + 1, gates, calls });
const root = (extra = {}) => ({ id: 1, status: 'running', live: false, phase: 'x', lease_expires_at: null, ...extra });
const contract = JSON.parse(fs.readFileSync(new URL('../server/ai-board/contract.json', import.meta.url), 'utf8'));
const graph = { nodes: contract.execution_graph.nodes, edges: contract.execution_graph.edges };

// Span shaped like the harness writes it (pipeline.run_gate): invoke_agent gate N, ok, tizia.gate.status.
const span = (g, ms, status = 'passed', start = 0) => ({
  name: `invoke_agent gate ${g}`, status: 'ok', start_ms: start, end_ms: start + ms, attributes: {
    'gen_ai.operation.name': 'invoke_agent', 'tizia.gate.id': g, 'tizia.gate.status': status,
  },
});

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
  root: root({ status: 'blocked', rerun_stage: 'plan', rerun_allowed: true }),
  graph,
  runs: [planRun(10, [gate(1, 1, 'passed', 10), gate(2, 2, 'blocked', 11, { public_reason: 'Plan touches a blocked file.' })],
    [call(31, 2, 'brainstorm.md', 9, { result: 'error', error: 'timeout from model' })])],
  events: [started(10, 1, 5), started(10, 2, 9)],
});
// Two finished earlier runs (10 s and 30 s per gate) and a current run that finished gate 1 only.
const withHistory = (currentSpans = [span(1, 5000)], trigger = 'plan') => ({
  root: root({ live: true }),
  graph,
  runs: [
    { id: 1, trigger: 'plan', created_at: EPOCH, updated_at: EPOCH + 60000, gates: [], calls: [], spans: GATES.map(g => span(g, 10000)) },
    { id: 2, trigger: 'plan', created_at: EPOCH + 70000, updated_at: EPOCH + 130000, gates: [], calls: [], spans: GATES.map(g => span(g, 30000)) },
    { id: 3, trigger, created_at: EPOCH + 140000, updated_at: EPOCH + 150000, gates: [], calls: [], spans: currentSpans },
  ],
  events: [],
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

// Resumed after a crash: the new run's journal says it continued at gate 4.
const resumed = () => ({
  root: root({ live: true }),
  graph,
  runs: [execRun(20, [gate(40, 4, 'passed', 500)], [])],
  events: [started(20, 4, 400)],
  journal: [
    { run_id: 20, node: 'resume', outcome: 'resumed', created_at: 300, state: { from_node: 'gate_4', previous_run_id: 19 } },
    { run_id: 20, node: 'gate_4', outcome: 'passed', created_at: 500, state: {} },
  ],
});

test('resumed run marks skipped gates done and shows the resume badge', () => {
  const n = graphNodes(resumed());
  assert.equal(n.gate_3.state, 'succeeded');
  assert.equal(n.gate_4.state, 'succeeded');
  const html = renderTicketGraph(resumed());
  assert.match(html, /Resumed at Check code/);
  assert.match(html, /Attempt journal/);
  assert.match(html, /Resumed at gate 4/);
});

test('a run without resume journal keeps the old rendering', () => {
  assert.doesNotMatch(renderTicketGraph(running()), /Resumed at/);
});

test('failed fixture marks the blocking gate and plan_stopped as failed', () => {
  const n = graphNodes(failed());
  assert.equal(n.gate_2.state, 'failed');
  assert.equal(n.gate_1.state, 'succeeded');
  assert.equal(n.plan_stopped.state, 'failed');
  assert.equal(n.gate_2_5.state, 'idle');
  assert.equal(n.plan_ready.state, 'idle');
});

test('a gate that ran without a result is stopped, not waiting', () => {
  const t = { root: root({ status: 'waiting_admin' }), graph,
    runs: [execRun(20, [], [call(30, 3, 'implement.md', 150)])], events: [] };
  const n = graphNodes(t);
  assert.equal(n.gate_3.state, 'stopped');
  assert.equal(n.gate_4.state, 'idle');
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
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, 16);
});

test('the repair agent sits on its own row and its branch runs through the free corridor', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /data-node="repair_agent"/);
  assert.match(html, /d="M910 380V430H570V452" data-edge="repair_check>repair_agent"/);
  assert.match(html, /d="M570 480V430H740V408" data-edge="repair_agent>repair"/);
});

test('edges follow the contract: passed path, repair loop, verdict, and blocked stop', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /data-edge="gate_1>gate_2"/);
  assert.match(html, /data-edge="repair_check>repair"/);
  assert.match(html, /d="M740 380V440H60V298" data-edge="repair>attempt_open"/);
  assert.doesNotMatch(html, /d="[^"]*[QC][^"]*"/);
  assert.match(html, /class="g-edge stop" d="[^"]*" data-edge="gate_2>plan_stopped"/);
  assert.doesNotMatch(html, /data-edge="gate_5>attempt_close"/);
});

test('an edge into a running node flows only from a finished source; passed edge between done nodes is done', () => {
  const html = renderTicketGraph(running(), null);
  assert.match(html, /class="g-edge flow done" d="[^"]*" data-edge="gate_3>gate_4"/);
  assert.match(html, /class="g-edge done" d="[^"]*" data-edge="gate_1>gate_2"/);
  assert.doesNotMatch(html, /class="g-edge flow[^"]*" d="[^"]*" data-edge="reverify_open>gate_4"/);
});

const runButton = (html) => html.match(/<button[^>]*rerun-node[^>]*>/)?.[0] || '';

test('run again: enabled when the server allows the stage, for a failed or finished node', () => {
  const plan = renderTicketGraph(failed(), 'gate_2');
  assert.match(plan, /data-action="rerun-node" data-node="gate_2"/);
  assert.doesNotMatch(runButton(plan), /disabled/);
  assert.match(plan, />Run again</);
  assert.doesNotMatch(runButton(renderTicketGraph(failed(), 'gate_1')), /disabled/);
});

test('run again: disabled with the server reason when another stage or a live lease blocks it', () => {
  const exec = failed();
  exec.root.rerun_stage = 'execute';
  exec.root.rerun_allowed = true;
  assert.match(runButton(renderTicketGraph(exec, 'gate_2')), /disabled/);
  assert.match(renderTicketGraph(exec, 'gate_2'), /This step is in the other stage/);
  const leased = { ...failed(), root: root({ status: 'blocked', rerun_stage: null, rerun_allowed: false,
    rerun_reason: 'A worker is running this request now. Wait until it stops.' }) };
  assert.match(runButton(renderTicketGraph(leased, 'gate_2')), /disabled/);
  assert.match(renderTicketGraph(leased, 'gate_2'), /A worker is running this request now/);
});

test('a GPU wait shows as a note, not an error', () => {
  const waiting = failed();
  waiting.root.gpu_waiting = { retry_at: Date.UTC(2026, 10, 3, 10, 30) };
  const page = renderTicketGraph(waiting, 'gate_2');
  assert.match(page, /class="meta g-warn" role="status">Waiting for the GPU/);
  assert.match(page, /retries by itself after 17:30/); // 10:30 UTC = 17:30 Vietnam time
});

test('run again: only the node with the saved checkpoint keeps the button', () => {
  const exec = {
    root: root({ status: 'blocked', rerun_stage: 'execute', rerun_allowed: true, rerun_node: 'gate_5' }),
    graph,
    runs: [execRun(30, [gate(31, 3, 'passed', 10), gate(32, 4, 'passed', 11),
      gate(33, 5, 'blocked', 12, { public_reason: 'The app fails to start.' })])],
    events: [],
  };
  const g5 = renderTicketGraph(exec, 'gate_5');
  assert.doesNotMatch(runButton(g5), /disabled/);
  assert.match(g5, /checkpoint saved at step 5/);
  const g3 = renderTicketGraph(exec, 'gate_3');
  assert.match(runButton(g3), /disabled/);
  assert.match(g3, /Run again starts at step 5: that is the last saved checkpoint\./);
});

test('run again: the repeat-objection warning shows above the enabled button only', () => {
  const warn = failed();
  warn.root.rerun_warning = 'Two attempts already stopped at step 2.5 for the same reason "plan_ungrounded".';
  const page = renderTicketGraph(warn, 'gate_2');
  assert.match(page, /class="meta g-warn"/);
  assert.match(page, /Two attempts already stopped at step 2\.5/);
  const blocked = failed();
  blocked.root.rerun_allowed = false;
  blocked.root.rerun_stage = null;
  blocked.root.rerun_reason = 'The request is not stopped at a step that can run again.';
  blocked.root.rerun_warning = 'should not render while the button is disabled';
  assert.doesNotMatch(renderTicketGraph(blocked, 'gate_2'), /class="meta g-warn"/);
});

test('run again: a running node is disabled; reason text from the server is escaped', () => {
  const html = renderTicketGraph(running(), 'gate_4');
  assert.match(runButton(html), /disabled/);
  assert.match(html, /This step is running now./);
  const hostile = failed();
  hostile.root.rerun_allowed = false;
  hostile.root.rerun_stage = null;
  hostile.root.rerun_reason = '<img src=x onerror=alert(1)>';
  const page = renderTicketGraph(hostile, 'gate_2');
  assert.doesNotMatch(page, /<img src=x/);
  assert.ok(page.includes('&lt;img src=x onerror=alert(1)&gt;'));
});

test('node detail lists sandbox runs and skills from evidence, digests only', () => {
  const data = failed();
  data.runs[0].gates[1] = gate(2, 2, 'blocked', 11, { public_reason: 'x', evidence: JSON.stringify({
    skills: ['tizia-ui', { name: 'node-test' }], sandbox_receipts: [{ argv: ['node', '--test', 'test/a.test.js'], rc: 0, duration_ms: 812, attempt: 0 }],
  }) });
  const html = renderTicketGraph(data, 'gate_2');
  assert.ok(html.includes('<h4>Sandbox runs</h4>'));
  assert.ok(html.includes('<code>node --test test/a.test.js</code> · exit 0 · 0.8 s'));
  assert.ok(html.includes('<h4>Skills</h4><p>tizia-ui, node-test</p>'));
});

test('budget cells: API shows paid tokens with a bar; no model-call or GPU cell; behaviour cells follow trace.behavior', () => {
  const api = { root_work: { used: { model_calls: 3, tokens: 1060 }, limits: { model_calls: 40, tokens: 200000 } }, totals: { budget_unit: 'k_tokens' }, root: root(), runs: [] };
  const cells = budgetCells(api, EPOCH);
  assert.equal(cells[0].label, 'Tokens');
  assert.equal(cells[0].big, '1,060 / 200,000');
  assert.equal(cells[0].bar, true);
  assert.equal(cells[0].tone, 'ok');
  const local = { ...api, totals: { budget_unit: 'gpu_s', gpu_s: 19.8 } };
  const labels = budgetCells(local, EPOCH).map(c => c.label);
  assert.ok(!labels.includes('Model calls') && !labels.includes('GPU time') && !labels.includes('Tokens'));
  assert.deepEqual(labels.filter(l => ['Token', 'Output', 'Topology', 'Run time'].includes(l)), ['Run time', 'Token', 'Output', 'Topology']);
  const behavior = { context: { tokens_in: 26000, limit: 32768, delta: 1200 }, output: { distinct_line_ratio: 0.1, compression_ratio: 0.05, warn: true },
    topology: { entropy: 0, idle_runs: 2, warn: true } };
  const by = Object.fromEntries(budgetCells({ ...local, behavior }, EPOCH).map(c => [c.label, c]));
  assert.equal(by.Token.big, 'No data', 'per-step context is not a ticket total');
  assert.equal(by.Output.tone, 'warn');
  assert.equal(by.Topology.sub, '2 steps changed nothing');
  assert.equal(by.Topology.tone, 'warn');
});

test('token cell: total tokens across every run, vi-VN, no delta and no context limit', () => {
  const call = (tokens_in, tokens_out) => ({ evidence: { metrics: { tokens_in, tokens_out } } });
  const multi = {
    root: root(),
    totals: { calls: 3, tokens_in: 8432, tokens_out: 3913 },
    runs: [
      { id: 1, trigger: 'plan', created_at: EPOCH, updated_at: EPOCH + 1, gates: [], calls: [call(5000, 2000), call(1000, 500)] },
      { id: 2, trigger: 'execute', created_at: EPOCH + 2, updated_at: EPOCH + 3, gates: [], calls: [call(2432, 1413)] },
    ],
    behavior: { context: { tokens_in: 4432, limit: 32768, delta: 310 } },
  };
  const cells = budgetCells(multi, EPOCH);
  const token = cells.find(c => c.label === 'Token');
  assert.equal(token.big, '12.345 token');
  assert.equal(token.sub, '');
  assert.equal(token.tone, 'ok');
  const text = JSON.stringify(cells);
  assert.doesNotMatch(text, /so với bước trước/, 'no per-step delta');
  assert.doesNotMatch(text, /32\.768/, 'no model context limit');
});

test('token cell: sums call evidence when totals are missing, No data without token metrics', () => {
  const metric = (tokens_in, tokens_out) => ({ evidence: { metrics: { tokens_in, tokens_out } } });
  const runs = [
    { id: 1, trigger: 'plan', created_at: EPOCH, updated_at: EPOCH + 1, gates: [], calls: [metric(4000, 1000)] },
    { id: 2, trigger: 'execute', created_at: EPOCH + 2, updated_at: EPOCH + 3, gates: [], calls: [metric(6000, 1345)] },
  ];
  const token = (trace) => budgetCells(trace, EPOCH).find(c => c.label === 'Token');
  assert.equal(token({ root: root(), runs }).big, '12.345 token', 'sum across both runs');
  assert.equal(token({ root: root(), totals: { tokens_in: 8000, tokens_out: 5000 }, runs: [] }).big, '13.000 token', 'totals win when present');
  assert.equal(token({ root: root(), totals: { calls: 0, tokens_in: 0, tokens_out: 0 }, runs: [] }).big, 'No data');
  assert.equal(token({ root: root(), runs: [{ ...runs[0], calls: [{ evidence: { metrics: {} } }] }] }).big, 'No data');
});

test('typical gate time is the median of earlier runs only, never the current run', () => {
  const trace = withHistory();
  const n = graphNodes(trace);
  assert.deepEqual([n.gate_2.typical.ms, n.gate_2.typical.samples], [20000, 2]);
  // Current run's own gate 1 span must not feed its own typical value.
  assert.equal(graphNodes(withHistory([span(1, 999999)])).gate_1.typical.ms, 20000);
  assert.equal(graphNodes(running()).gate_4.typical.ms, null);
});

test('time left: estimate covers only the current run stage, from earlier runs', () => {
  // Execute run finished gate 3; gates 4, 5, 5.5 remain at a 20 s median each = 60 s.
  const left = budgetCells(withHistory([span(3, 5000)], 'execute'), EPOCH + 160000).find(c => c.label === 'Time left');
  assert.equal(left.big, 'about 1 min');
  assert.equal(left.sub, 'From earlier runs of this ticket');
  // Plan run finished gate 1; gates 2 and 2.5 remain at 20 s each = 40 s.
  const plan = budgetCells(withHistory(), EPOCH + 160000).find(c => c.label === 'Time left');
  assert.equal(plan.big, 'under 1 min');
});

const shared = () => Object.fromEntries(GATES.map(g => [g, { median_ms: 15000, n: 30 }]));

test('new ticket with no same-ticket history uses the all-tickets median, and says so', () => {
  const trace = { ...running(), gate_history: shared() };
  const left = budgetCells(trace, EPOCH).find(c => c.label === 'Time left');
  // Execute run has no spans yet: gates 3, 4, 5, 5.5 at 15 s each = 60 s.
  assert.equal(left.big, 'about 1 min');
  assert.equal(left.sub, 'From other tickets');
  assert.equal(graphNodes(trace).gate_4.typical.source, 'all tickets');
  assert.equal(graphNodes(trace).gate_4.typical.ms, 15000);
  assert.match(renderTicketGraph(trace, 'gate_4'), /about 15\.0 s · From other tickets · All models/);
});

test('same-ticket history wins over the all-tickets median', () => {
  const trace = { ...withHistory(), gate_history: shared() };
  const node = graphNodes(trace).gate_2;
  assert.equal(node.typical.source, 'same ticket');
  assert.equal(node.typical.ms, 20000);
});

test('time left says No estimate with a reason when a remaining gate has no history', () => {
  const current = withHistory();
  const left = budgetCells({ ...current, runs: current.runs.slice(2) }, EPOCH).find(c => c.label === 'Time left');
  assert.equal(left.big, 'No estimate');
  assert.equal(left.sub, 'No earlier run timed the next steps');
  assert.equal(budgetCells(running(), EPOCH).find(c => c.label === 'Time left').big, 'No estimate');
});

test('run time shows runtime over the run limit, with subtask count; warns near and past the limit', () => {
  const latestRun = (extra) => ({ id: 2, trigger: 'plan', created_at: EPOCH, updated_at: EPOCH, gates: [], calls: [], ...extra });
  const trace = (extra) => ({ root: root({ live: true }), totals: { budget_unit: 'gpu_s', gpu_s: 0 }, root_work: { used: {}, limits: {} }, runs: [latestRun(extra)] });
  const run = (t, now) => budgetCells(t, now).find(c => c.label === 'Run time');
  const limited = trace({ wall_clock_limit_s: 600, subtask_count: 3 });
  assert.equal(run(limited, EPOCH + 125000).big, '2:05 / 10:00');
  assert.equal(run(limited, EPOCH + 125000).sub, '3 subtasks');
  assert.equal(run(limited, EPOCH + 125000).tone, 'ok');
  assert.equal(run(limited, EPOCH + 500000).tone, 'warn');
  assert.equal(run(limited, EPOCH + 700000).tone, 'bad');
  assert.equal(run(limited, EPOCH + 700000).sub, 'Over the time limit');
  const unlimited = trace({ subtask_count: 1 });
  assert.equal(run(unlimited, EPOCH + 65000).sub, '1 subtask');
  assert.equal(run(unlimited, EPOCH + 65000).bar, false);
  assert.equal(run(unlimited, EPOCH + 65000).big, '1:05');
});

test('run time never shows an invented number: Not started, No data for fixture epochs', () => {
  assert.equal(budgetCells({ root: root({ live: true }), runs: [] }, EPOCH).find(c => c.label === 'Run time').big, 'Not started');
  assert.equal(budgetCells(running(), EPOCH).find(c => c.label === 'Run time').big, 'No data'); // fixture created_at 10 ms
});

test('untrusted reason text is escaped in the panel', () => {
  const trace = failed();
  trace.runs[0].gates[1].public_reason = '<img src=x onerror=alert(1)>';
  const html = renderTicketGraph(trace, 'gate_2');
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img src=x/);
});

test('reduced motion turns off edge flow and running spin', () => {
  const css = fs.readFileSync(new URL('../public/admin-request.html', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const from = css.indexOf('@media (prefers-reduced-motion: reduce) {\n    .g-edge.flow');
  assert.ok(from > 0, 'reduced-motion block for graph');
  const block = css.slice(from, css.indexOf('}\n  }', from) + 4);
  assert.match(block, /\.g-edge\.flow, \.g-node\.st-running \.g-glyph \{ animation:none; \}/);
  assert.match(css, /\.g-edge\.flow \{[^}]*animation:g-flow/);
});

test('at 390px the graph scrolls inside its own frame, not the page', () => {
  assert.match(renderTicketGraph(failed(), null), /<div class="g-frame"><svg class="g-svg"/);
  const css = fs.readFileSync(new URL('../public/admin-request.html', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const rule = selector => css.slice(css.indexOf(`${selector} {`), css.indexOf('}', css.indexOf(`${selector} {`)));
  assert.match(rule('.g-frame'), /overflow-x:auto/);
  assert.match(rule('.g-svg'), /min-width:900px/);
  assert.match(rule('.g-svg'), /width:100%/);
  // Only the SVG may be wider than a phone; the page shell and the graph section keep fluid widths.
  for (const selector of ['body', '.ticket-graph', '.g-graph']) assert.doesNotMatch(rule(selector), /min-width/);
  assert.match(rule('.ticket-graph'), /grid-template-columns:minmax\(0,1fr\)/);
  assert.match(rule('.ticket-graph .blk'), /min-width:0/);
  assert.match(css, /\.g-result-row \{ grid-template-columns:minmax\(0,1fr\); gap:2px; \}/);
});

