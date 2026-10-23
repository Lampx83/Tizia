// Ticket graph: node states from the trace projection. View only; authority stays on the server.
import { projectPipeline, describeModelCall, loopActions, stepTotals } from './ai-board-trace.js';
import { gateEta, typicalGateMs } from './ai-board-gate-timing.js';
import { visitedNodes } from './ai-board-hsm.js';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const NODES = {
  gate_1: { name: 'Check request', purpose: 'Check the request text. Write a plan.', at: [60, 70] },
  gate_2: { name: 'Check allowed files', purpose: 'Check that the plan only changes allowed files.', at: [230, 70] },
  gate_2_5: { name: 'Check plan', purpose: 'Compare the plan with the current code.', at: [400, 70] },
  plan_ready: { name: 'Plan ready', purpose: 'The plan passed. An admin can allow the work.', at: [570, 70] },
  plan_stopped: { name: 'Plan stopped', purpose: 'A plan check failed. Work stops here.', at: [400, 170] },
  attempt_open: { name: 'Start attempt', purpose: 'Open one work attempt on the approved plan.', at: [60, 270] },
  gate_3: { name: 'Write code', purpose: 'Write the code for each approved task.', at: [230, 270] },
  gate_4: { name: 'Check code', purpose: 'Check the change and the safety rules.', at: [400, 270] },
  gate_5: { name: 'Run app', purpose: 'Run the app in a sandbox. Check how it behaves.', at: [570, 270] },
  gate_5_5: { name: 'Check risk', purpose: 'Collect evidence. Rate the risk before a pull request.', at: [740, 270] },
  attempt_close: { name: 'End attempt', purpose: 'End the attempt. Remove the temporary branch.', at: [910, 270] },
  reverify_open: { name: 'Check on new base', purpose: 'Rebuild the change on the latest base. Check it again.', at: [400, 380] },
  repair_check: { name: 'Repair needed?', purpose: 'Decide if one more repair is allowed.', at: [910, 380] },
  repair: { name: 'Repair', purpose: 'Record the reason. Start the attempt again.', at: [740, 380] },
  verdict: { name: 'Verdict', purpose: 'Final result: ready, needs review, or blocked.', at: [910, 480] },
};
const STEP_STATE = { run: 'running', ok: 'succeeded', bad: 'failed' };
const STEP_NOTE = { queued: 'The worker has not started this run yet.', unfinished: 'Stopped before a result.', wait: 'Not reached yet.' };
const STATE_LABEL = { idle: 'Waiting', running: 'Running', succeeded: 'Done', failed: 'Failed' };
const CALL_LABEL = { ok: 'Done', retry: 'Retry needed', error: 'Failed', http_error: 'Connection failed', timeout: 'Timed out' };
const ROLLBACK_LABEL = { discarded: 'branch deleted', revert_ready: 'revert branch ready', failed: 'rollback failed' };
const PURPOSE_EN = {
  intake: 'Check request text', danger: 'Rate content risk', clarity: 'Rate request clarity', plan: 'Write plan',
  validate: 'Check plan against code', implement: 'Write code for a task', loop: 'Tool loop', content: 'Check content after change',
};
const PIN_LABEL = { candidate: 'change', plan: 'plan', base: 'base commit', harness: 'checker code', prompt: 'content check prompt',
  tool: 'toolset', model: 'model', oracle: 'permission list' };
// Drawn: the main path, the repair and verdict branches, and blocked edges into plan_stopped. Other blocked edges would clutter the graph.
const drawnEdge = (edge) => ['passed', 'repair', 'done'].includes(edge.on) || edge.to === 'plan_stopped';
// Edges that loop back in the drawing. They bow below the row so they do not cross nodes.
const BACKWARD = new Set(['repair>attempt_open']);

const gateOf = (id) => (id.startsWith('gate_') ? Number(id.slice(5).replace('_', '.')) : null);
const numberOr = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0);
const gateStage = (gate) => (gate < 3 ? 'plan' : 'execute');
// Epoch values before 2000 are fixture or bad data, never a real start time.
const EPOCH_MIN = Date.UTC(2000, 0, 1);
const MAX_RUN_MS = 30 * 24 * 3600 * 1000;

function callsOf(step) {
  return (step?.calls || []).flatMap(g => [...g.previous, g.current])
    .map(c => ({ ...(c.evidence || {}), at: c.created_at }))
    .sort((a, b) => Number(a.at) - Number(b.at));
}

function modelCall(call) {
  const purpose = describeModelCall(call);
  return {
    title: PURPOSE_EN[purpose.id] || (purpose.id === 'unlabelled' ? 'AI call without label' : `AI call: ${purpose.id}`),
    result: CALL_LABEL[call.result] || 'No result yet',
    error: call.error || '',
    model: call.model || '',
    ms: call.metrics?.wall_ms ?? null,
    budget: call.budget_units ?? null,
  };
}

const currentRunId = (trace) => projectPipeline(trace).latest?.id ?? null;

// This ticket's earlier runs first, then the server's median over other tickets, else none.
const gateEstimate = (trace, gate, runId) => {
  const own = typicalGateMs(trace.runs || [], gate, runId);
  if (own.ms != null) return { ...own, source: 'same ticket' };
  const shared = trace.gate_history?.[gate];
  if (shared?.median_ms != null) return { ms: shared.median_ms, samples: shared.n, reason: null, source: 'all tickets' };
  return { ...own, source: 'no estimate' };
};
const SOURCE_TEXT = { 'same ticket': 'From earlier runs of this ticket', 'all tickets': 'From other tickets' };

function proofNote(gate, events = []) {
  const last = [...events].reverse().map((e) => {
    if (e.event_type !== 'gate_proof_reused' && e.event_type !== 'gate_proof_invalidated') return null;
    try { return { type: e.event_type, ...JSON.parse(e.internal_detail) }; } catch { return null; }
  }).find(d => d && Number(d.gate) === gate);
  if (!last) return '';
  if (last.type === 'gate_proof_reused') return `Reused the passed proof from run #${last.proof_run_id ?? '?'}. No AI call and no re-check. The change is still built again.`;
  const why = last.reason === 'proof_corrupt' ? 'the old proof is damaged'
    : `changed: ${(last.drift || []).map(k => PIN_LABEL[k] || k).join(', ') || 'unknown'}`;
  return `Old proof not reused (${why}). This step was checked again.`;
}

function gateDetail(step, trace) {
  const calls = callsOf(step);
  const totals = stepTotals(step);
  const models = calls.filter(c => describeModelCall(c).id !== 'loop').map(modelCall);
  const tools = calls.filter(c => describeModelCall(c).id === 'loop').flatMap(c => loopActions([c]));
  const failedCall = calls.find(c => c.error);
  const latest = models.at(-1);
  const earlier = (step.previousResults || []).map(r => r.public_reason).filter(Boolean);
  return {
    step, models, tools, earlier,
    error: step.result?.public_reason || step.result?.internal_reason || failedCall?.error || '',
    budget: calls.reduce((sum, c) => sum + numberOr(c.budget_units), 0),
    ms: totals.ms,
    current: step.state === 'run' ? (latest ? `${latest.title}: ${latest.result}` : 'Waiting for the worker to reply.') : '',
    note: STEP_NOTE[step.state] || '',
    typical: gateEstimate(trace, step.gate, currentRunId(trace)),
    proof: proofNote(step.gate, trace.events),
  };
}

// Pure: node id -> {id, gate, name, purpose, state, ...detail}. Gates use step data; the rest use reached-events.
export function graphNodes(trace = {}) {
  const projection = projectPipeline(trace);
  const selected = new Set([...projection.selected].map(Number));
  const events = (trace.events || []).filter(e => selected.has(Number(e.run_id)));
  const seen = visitedNodes(events, trace.root || {});
  const steps = new Map(projection.steps.map(s => [s.gate, s]));
  const execute = projection.steps.filter(s => s.stage === 'execute');
  const planBad = projection.steps.some(s => s.stage === 'plan' && s.state === 'bad');
  const active = projection.steps.find(s => s.state === 'run');
  const out = {};
  for (const [id, def] of Object.entries(NODES)) {
    const gate = gateOf(id);
    let state = 'idle';
    let detail = {};
    if (gate != null) {
      const step = steps.get(gate);
      state = STEP_STATE[step?.state] || 'idle';
      detail = step ? gateDetail(step, trace) : {};
    } else if (id === 'plan_stopped') state = planBad ? 'failed' : 'idle';
    else if (id === 'plan_ready') state = steps.get(2.5)?.state === 'ok' ? 'succeeded' : 'idle';
    else if (id === 'attempt_open') state = execute.some(s => s.result || s.calls.length || s.state === 'run') ? 'succeeded' : 'idle';
    else state = seen.has(id) ? 'succeeded' : 'idle';
    out[id] = { id, gate, ...def, state, ...detail };
  }
  return out;
}

// Elapsed ms of one run; null when the start is missing or implausible (fixtures, bad data).
function runElapsed(run, live, now) {
  const started = Number(run?.created_at);
  if (!(started >= EPOCH_MIN)) return null;
  const end = live ? now : Number(run.updated_at) || started;
  const elapsed = end - started;
  return elapsed >= 0 && elapsed <= MAX_RUN_MS ? elapsed : null;
}

const clockText = (ms) => {
  const t = Math.floor(ms / 1000);
  const h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, s = String(t % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
};

const toneOf = (ratio) => (ratio >= 1 ? 'bad' : ratio >= 0.8 ? 'warn' : 'ok');
const fmt = (n) => Number(n).toLocaleString('en-US');

// Budget cells: big number, optional thin bar. API budgets show tokens, local runtimes show GPU time.
export function budgetCells(trace = {}, now = Date.now()) {
  const used = trace.root_work?.used || {};
  const limits = trace.root_work?.limits || {};
  const cell = (label, usedN, limitN) => {
    const ratio = limitN > 0 ? usedN / limitN : 0;
    const big = ratio >= 1 ? 'Used up' : `${fmt(usedN)} / ${fmt(limitN)}`;
    return { label, big, sub: ratio >= 1 ? '' : `${Math.round(ratio * 100)}% used`, ratio: Math.min(ratio, 1), tone: toneOf(ratio), bar: true };
  };
  const cells = [cell('Model calls', used.model_calls ?? 0, limits.model_calls ?? 0)];
  if (trace.totals?.budget_unit === 'k_tokens') cells.push(cell('Tokens', used.tokens ?? 0, limits.tokens ?? 0));
  else cells.push({ label: 'GPU time', big: `${(trace.totals?.gpu_s ?? 0).toFixed(1)} s`, sub: 'local model', tone: 'idle', bar: false });

  const latest = projectPipeline(trace).latest;
  const elapsed = runElapsed(latest, trace.root?.live, now);
  const subtasks = latest?.subtask_count;
  const subText = Number.isFinite(subtasks) ? `${subtasks} subtask${subtasks === 1 ? '' : 's'}` : '';
  const limitS = latest?.wall_clock_limit_s;
  if (!latest) cells.push({ label: 'Run time', big: 'Not started', sub: '', tone: 'idle', bar: false });
  else if (elapsed == null) cells.push({ label: 'Run time', big: 'No data', sub: '', tone: 'idle', bar: false });
  else if (Number.isFinite(limitS) && limitS > 0) {
    const ratio = elapsed / (limitS * 1000);
    cells.push({ label: 'Run time', big: `${clockText(elapsed)} / ${clockText(limitS * 1000)}`, sub: ratio >= 1 ? 'Over the time limit' : subText,
      ratio: Math.min(ratio, 1), tone: toneOf(ratio), bar: true });
  } else cells.push({ label: 'Run time', big: clockText(elapsed), sub: subText || 'No limit recorded', tone: 'idle', bar: false });

  const stageGates = latest?.trigger === 'execute' ? [3, 4, 5, 5.5] : [1, 2, 2.5];
  const eta = gateEta(trace.runs || [], { currentRunId: currentRunId(trace), gates: stageGates, gateHistory: trace.gate_history || {} });
  if (!eta.remaining.length) cells.push({ label: 'Time left', big: 'None', sub: 'All steps done', tone: 'idle', bar: false });
  else if (eta.eta_ms != null) {
    const big = eta.eta_ms < 60000 ? 'under 1 min' : `about ${Math.round(eta.eta_ms / 60000)} min`;
    cells.push({ label: 'Time left', big, sub: SOURCE_TEXT[eta.source], tone: 'idle', bar: false });
  } else cells.push({ label: 'Time left', big: 'No estimate', sub: 'No earlier run timed the next steps', tone: 'idle', bar: false });
  return cells;
}

const ICON = {
  idle: '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2.2"/>',
  running: '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="18 14"/>',
  succeeded: '<path d="M4.5 8.5l2.3 2.3 4.7-4.9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  failed: '<path d="M5 5l6 6M11 5l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
};
const icon = (state) => `<svg class="g-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">${ICON[state]}</svg>`;
const pick = (nodes, selectedId) => nodes[selectedId] ? selectedId
  : Object.values(nodes).find(n => n.state === 'running' && n.step)?.id
    || Object.values(nodes).find(n => n.state === 'failed' && n.step)?.id || null;
const secs = (ms) => (ms == null ? 'Not recorded' : `${(ms / 1000).toFixed(1)} s`);
const num = (n) => (n == null ? 'Not recorded' : Number(n).toLocaleString('en-US'));

// Stage rerun moved here from the old step list; LF79 replaces it.
function rerunAction(node, root) {
  if (node.state !== 'failed' || !node.step || root?.rerun_stage !== gateStage(node.gate)) return '';
  const plan = gateStage(node.gate) === 'plan';
  const text = plan ? 'Plan again from step 1' : 'Redo from step 3';
  const title = plan ? 'Run planning again from step 1. The new result updates the steps.'
    : 'Run the approved plan again from step 3, then the checks. The new result updates the steps.';
  return `<button type="button" class="btn rerun" data-action="rerun-gate" data-gate="${esc(node.gate)}" title="${esc(title)}">${esc(text)}</button>`;
}

function kv(rows) {
  return `<dl class="kv g-kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;
}

function nodePanel(node, root) {
  if (!node) return '<p class="meta g-empty">Select a node to see what it does.</p>';
  const head = `<div class="g-panel-head"><h3>${esc(node.name)}</h3><span class="g-state st-${node.state}">${icon(node.state)}${esc(STATE_LABEL[node.state])}</span></div>`;
  const purpose = `<p class="g-purpose">${esc(node.purpose)}</p>`;
  if (!node.step) {
    const text = node.state === 'succeeded' ? 'This step was reached in the current run.'
      : node.state === 'failed' ? 'This step failed in the current run.' : 'This step was not reached yet.';
    return `${head}${purpose}<p>${esc(text)}</p>`;
  }
  const status = { running: node.current, failed: 'Stopped at this step.', succeeded: 'Finished.', idle: node.note }[node.state];
  const typical = node.typical.ms == null ? 'No estimate. No earlier run timed this step.'
    : `about ${secs(node.typical.ms)} · ${SOURCE_TEXT[node.typical.source]} · All models`;
  const rows = [
    ['Now', esc(status || STATE_LABEL[node.state])],
    ['Time used', esc(secs(node.ms))],
    ['Budget used', esc(num(node.budget))],
    ['AI calls', esc(num(node.models.length))],
    ['Tool calls', esc(num(node.tools.length))],
    ['Typical time', esc(typical)],
  ];
  const error = node.state === 'failed' && node.error ? `<div class="g-error"><b>Error</b><p>${esc(node.error)}</p></div>` : '';
  const proof = node.proof ? `<p class="meta">${esc(node.proof)}</p>` : '';
  const models = node.models.length ? `<h4>AI calls</h4><ol class="g-list">${node.models.map(m => `<li><b>${esc(m.title)}</b> · ${esc(m.result)} · ${esc(secs(m.ms))} · budget ${esc(num(m.budget))} · ${esc(m.model || 'model not recorded')}${m.error ? `<div class="meta">${esc(m.error)}</div>` : ''}</li>`).join('')}</ol>` : '';
  const tools = node.tools.length ? `<h4>Tool calls</h4><ol class="g-list">${node.tools.map(t => `<li><b>${esc(t.tool)}</b>${t.target ? ` <code>${esc(t.target)}</code>` : ''} · ${esc(CALL_LABEL[t.result] || 'No result yet')} · ${esc(secs(t.ms))}</li>`).join('')}</ol>` : '';
  const earlier = node.earlier.length ? `<h4>Earlier attempts</h4><ol class="g-list">${node.earlier.map(r => `<li>${esc(r)}</li>`).join('')}</ol>` : '';
  const raw = `<details class="raw g-raw" data-k="graph-raw:${esc(node.id)}"><summary>Details</summary><pre>${esc(JSON.stringify({ result: node.step.result || null, calls: callsOf(node.step) }, null, 2))}</pre></details>`;
  const action = rerunAction(node, root);
  return `${head}${purpose}${kv(rows)}${error}${proof}${models}${tools}${earlier}${action ? `<div class="g-slot">${action}</div>` : ''}${raw}`;
}

// Edge: a straight line, or a bowed curve for a loop-back. Endpoints are node centres (nodes paint over them).
function edgePath(from, to, back) {
  const [x1, y1] = NODES[from].at, [x2, y2] = NODES[to].at;
  if (!back) return `M${x1} ${y1}L${x2} ${y2}`;
  return `M${x1} ${y1}Q${(x1 + x2) / 2} ${Math.max(y1, y2) + 150} ${x2} ${y2}`;
}

function edgeSvg(edge, nodes) {
  const from = nodes[edge.from], to = nodes[edge.to];
  if (!from || !to) return '';
  const back = BACKWARD.has(`${edge.from}>${edge.to}`);
  const flowing = to.state === 'running' && from.state === 'succeeded' && edge.on !== 'blocked';
  const done = from.state === 'succeeded' && (to.state === 'succeeded' || to.state === 'running');
  const cls = ['g-edge', flowing ? 'flow' : '', done ? 'done' : '', edge.on === 'blocked' ? 'stop' : ''].filter(Boolean).join(' ');
  return `<path class="${cls}" d="${edgePath(edge.from, edge.to, back)}" data-edge="${esc(edge.from)}>${esc(edge.to)}"/>`;
}

// Panel for the chosen node; `chosen` null → the running node, else the failed one.
export function renderTicketGraph(trace = {}, chosen = null, now = Date.now()) {
  const nodes = graphNodes(trace);
  const selectedId = pick(nodes, chosen);
  const edges = (trace.graph?.edges || []).filter(drawnEdge).map(e => edgeSvg(e, nodes)).join('');
  const present = new Set((trace.graph?.nodes || []).map(n => n.id));
  const drawn = Object.values(nodes).filter(n => present.size === 0 || present.has(n.id)).map(n => {
    const sel = n.id === selectedId;
    const label = `${n.name}: ${STATE_LABEL[n.state]}`;
    return `<g class="g-node st-${n.state}${sel ? ' is-selected' : ''}" data-node="${esc(n.id)}" role="button" tabindex="0" aria-pressed="${sel}" aria-label="${esc(label)}" transform="translate(${n.at[0]} ${n.at[1]})">
      ${sel ? '<circle class="g-halo" r="28"/>' : ''}
      <circle class="g-ring" r="18"/>
      <g transform="translate(-8 -8)"><g class="g-glyph">${ICON[n.state]}</g></g>
      <text class="g-label" y="42" text-anchor="middle">${esc(n.name)}</text>
    </g>`;
  }).join('');
  const rollback = projectPipeline(trace).runs.at(-1)?.rollback;
  const rollbackLine = rollback ? `<p class="meta g-loop">Rollback: ${esc(ROLLBACK_LABEL[rollback.outcome] || rollback.outcome)}.</p>` : '';
  const cells = budgetCells(trace, now).map(c => `<div class="g-cell tone-${c.tone}">
      <div class="g-cell-label">${esc(c.label)}</div>
      <div class="g-big">${esc(c.big)}</div>
      ${c.sub ? `<div class="g-sub">${esc(c.sub)}</div>` : ''}
      ${c.bar ? `<div class="g-bar" aria-hidden="true"><i style="width:${Math.round(c.ratio * 100)}%"></i></div>` : ''}
    </div>`).join('');
  return `<section class="ticket-graph" aria-labelledby="ticket-graph-title">
    <h2 id="ticket-graph-title">Ticket graph</h2>
    <div class="g-strip" role="group" aria-label="Budget">${cells}</div>
    <p class="g-legend meta">${Object.keys(ICON).map(s => `<span class="g-state st-${s}">${icon(s)}${esc(STATE_LABEL[s])}</span>`).join('')}</p>
    <div class="g-frame"><svg class="g-svg" viewBox="0 0 1000 540" role="group" aria-label="Ticket processing graph">
      <g class="g-edges">${edges}</g>
      <g class="g-nodes">${drawn}</g>
    </svg></div>
    ${rollbackLine}
    <div class="g-detail" role="region" aria-live="polite" aria-label="Node details">${nodePanel(nodes[selectedId], trace.root)}</div>
  </section>`;
}
