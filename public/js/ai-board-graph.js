// Ticket graph: node states from the existing trace projection. View only; authority stays on the server.
import { projectPipeline, describeModelCall, loopActions, stepTotals } from './ai-board-trace.js';
import { visitedNodes } from './ai-board-hsm.js';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const NODES = {
  gate_1: { lane: 'plan', name: 'Check request', purpose: 'Check the request text. Write a plan.' },
  gate_2: { lane: 'plan', name: 'Check allowed files', purpose: 'Check that the plan only changes allowed files.' },
  gate_2_5: { lane: 'plan', name: 'Check plan against code', purpose: 'Compare the plan with the current code.' },
  plan_ready: { lane: 'plan', name: 'Plan ready', purpose: 'The plan passed. An admin can allow the work.' },
  plan_stopped: { lane: 'plan', name: 'Plan stopped', purpose: 'A plan check failed. Work stops here.' },
  attempt_open: { lane: 'execute', name: 'Start attempt', purpose: 'Open one work attempt on the approved plan.' },
  gate_3: { lane: 'execute', name: 'Write code', purpose: 'Write the code for each approved task.' },
  gate_4: { lane: 'execute', name: 'Check code', purpose: 'Check the change and the safety rules.' },
  gate_5: { lane: 'execute', name: 'Run app', purpose: 'Run the app in a sandbox. Check how it behaves.' },
  gate_5_5: { lane: 'execute', name: 'Check risk', purpose: 'Collect evidence. Rate the risk before a pull request.' },
  attempt_close: { lane: 'execute', name: 'End attempt', purpose: 'End the attempt. Remove the temporary branch.' },
  repair_check: { lane: 'execute', name: 'Repair needed?', purpose: 'Decide if one more repair is allowed.' },
  repair: { lane: 'execute', name: 'Repair', purpose: 'Record the reason. Start the attempt again.' },
  verdict: { lane: 'execute', name: 'Verdict', purpose: 'Final result: ready, needs review, or blocked.' },
  reverify_open: { lane: 'side', name: 'Check on new base', purpose: 'Rebuild the change on the latest base. Check it again.' },
};
export const LANES = [
  ['plan', 'Plan'],
  ['execute', 'Work and checks'],
  ['side', 'Re-check'],
];
const STEP_STATE = { run: 'running', ok: 'succeeded', bad: 'failed' };
const STEP_NOTE = { queued: 'The worker has not started this run yet.', unfinished: 'Stopped before a result.', wait: 'Not reached yet.' };
export const STATE_LABEL = { idle: 'Waiting', running: 'Running', succeeded: 'Done', failed: 'Failed' };
const CALL_LABEL = { ok: 'Done', retry: 'Retry needed', error: 'Failed', http_error: 'Connection failed', timeout: 'Timed out' };
const PURPOSE_EN = {
  intake: 'Check request text', danger: 'Rate content risk', clarity: 'Rate request clarity', plan: 'Write plan',
  validate: 'Check plan against code', implement: 'Write code for a task', loop: 'Tool loop', content: 'Check content after change',
};
const gateOf = (id) => (id.startsWith('gate_') ? Number(id.slice(5).replace('_', '.')) : null);
const numberOr = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0);

function callsOf(step) {
  return (step?.calls || []).flatMap(g => [...g.previous, g.current])
    .map(c => ({ ...(c.evidence || {}), at: c.created_at }))
    .sort((a, b) => Number(a.at) - Number(b.at));
}

function modelCall(call) {
  const purpose = describeModelCall(call);
  return {
    id: purpose.id,
    title: PURPOSE_EN[purpose.id] || (purpose.id === 'unlabelled' ? 'AI call without label' : `AI call: ${purpose.id}`),
    result: CALL_LABEL[call.result] || 'No result yet',
    error: call.error || '',
    model: call.model || '',
    ms: call.metrics?.wall_ms ?? null,
    tokens_in: call.metrics?.tokens_in ?? null,
    tokens_out: call.metrics?.tokens_out ?? null,
    budget: call.budget_units ?? null,
  };
}

function gateDetail(step) {
  const calls = callsOf(step);
  const totals = stepTotals(step);
  const models = calls.filter(c => describeModelCall(c).id !== 'loop').map(modelCall);
  const tools = calls.filter(c => describeModelCall(c).id === 'loop').flatMap(c => loopActions([c]));
  const budget = calls.reduce((sum, c) => sum + numberOr(c.budget_units), 0);
  const failedCall = calls.find(c => c.error);
  const error = step.result?.public_reason || step.result?.internal_reason || failedCall?.error || '';
  const latest = models.at(-1);
  return {
    step, models, tools, error, budget,
    ms: totals.ms, calls: totals.calls,
    current: step.state === 'run' ? (latest ? `${latest.title}: ${latest.result}` : 'Waiting for the worker to reply.') : '',
    note: STEP_NOTE[step.state] || '',
  };
}

// Pure: node id -> {id, lane, name, purpose, state, ...detail}. Gates use step data; the rest use reached-events.
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
      detail = step ? gateDetail(step) : {};
    } else if (id === 'plan_stopped') state = planBad ? 'failed' : 'idle';
    else if (id === 'plan_ready') state = steps.get(2.5)?.state === 'ok' ? 'succeeded' : 'idle';
    else if (id === 'attempt_open') state = active?.stage === 'execute' ? 'running' : execute.some(s => s.result || s.calls.length) ? 'succeeded' : 'idle';
    else state = seen.has(id) ? 'succeeded' : 'idle';
    out[id] = { id, ...def, state, ...detail };
  }
  return out;
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

function nodeButton(node, selected) {
  const gateNo = gateOf(node.id);
  const number = gateNo != null ? `<span class="g-num">${esc(gateNo)}</span>` : '';
  return `<li class="g-item">
    <button type="button" class="gnode st-${node.state}" data-node="${esc(node.id)}" aria-pressed="${selected ? 'true' : 'false'}">
      ${number}<span class="g-name">${esc(node.name)}</span>
      <span class="g-state">${icon(node.state)}${esc(STATE_LABEL[node.state])}</span>
    </button></li>`;
}

function kv(rows) {
  return `<dl class="kv g-kv">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v}</dd>`).join('')}</dl>`;
}
const secs = (ms) => (ms == null ? 'Not recorded' : `${(ms / 1000).toFixed(1)} s`);
const num = (n) => (n == null ? 'Not recorded' : Number(n).toLocaleString('en-US'));

function nodePanel(node) {
  if (!node) return '<p class="meta g-empty">Select a node to see what it does.</p>';
  const head = `<div class="g-panel-head"><h3>${esc(node.name)}</h3><span class="g-state st-${node.state}">${icon(node.state)}${esc(STATE_LABEL[node.state])}</span></div>`;
  const purpose = `<p class="g-purpose">${esc(node.purpose)}</p>`;
  const gate = node.step;
  if (!gate) {
    const text = node.state === 'succeeded' ? 'This step was reached in the current run.'
      : node.state === 'failed' ? 'This step failed in the current run.' : 'This step was not reached yet.';
    return `${head}${purpose}<p>${esc(text)}</p>`;
  }
  const status = { running: node.current, failed: 'Stopped at this step.', succeeded: 'Finished.', idle: node.note }[node.state];
  const rows = [
    ['Now', esc(status || STATE_LABEL[node.state])],
    ['Time used', esc(secs(node.ms))],
    ['Budget used', esc(num(node.budget))],
    ['AI calls', esc(num(node.models.length))],
    ['Tool calls', esc(num(node.tools.length))],
  ];
  const error = node.state === 'failed' && node.error ? `<div class="g-error"><b>Error</b><p>${esc(node.error)}</p></div>` : '';
  const models = node.models.length ? `<h4>AI calls</h4><ol class="g-list">${node.models.map(m => `<li><b>${esc(m.title)}</b> · ${esc(m.result)} · ${esc(secs(m.ms))} · budget ${esc(num(m.budget))}${m.error ? `<div class="meta">${esc(m.error)}</div>` : ''}</li>`).join('')}</ol>` : '';
  const tools = node.tools.length ? `<h4>Tool calls</h4><ol class="g-list">${node.tools.map(t => `<li><b>${esc(t.tool)}</b>${t.target ? ` <code>${esc(t.target)}</code>` : ''} · ${esc(CALL_LABEL[t.result] || 'No result yet')} · ${esc(secs(t.ms))}</li>`).join('')}</ol>` : '';
  const raw = `<details class="raw g-raw" data-k="graph-raw:${esc(node.id)}"><summary>Details</summary><pre>${esc(JSON.stringify({ result: gate.result || null, calls: callsOf(gate) }, null, 2))}</pre></details>`;
  return `${head}${purpose}${kv(rows)}${error}${models}${tools}
    <div class="g-slot" data-slot="node-action" aria-label="Node actions"></div>${raw}`;
}

// Panel for the chosen node; `chosen` null → the running node, else the failed one.
export function renderTicketGraph(trace = {}, chosen = null) {
  const nodes = graphNodes(trace);
  const present = new Set((trace.graph?.nodes || []).map(n => n.id));
  const selectedId = pick(nodes, chosen);
  const rows = LANES.map(([lane, title]) => {
    const items = Object.values(nodes).filter(n => n.lane === lane && (present.size === 0 || present.has(n.id)));
    if (!items.length) return '';
    return `<div class="g-lane"><h3 class="g-lane-title">${esc(title)}</h3><ol class="g-nodes">${items.map(n => nodeButton(n, n.id === selectedId)).join('')}</ol></div>`;
  }).join('');
  const repairNote = nodes.repair_check ? '<p class="meta g-loop">Repair loop: Repair goes back to Start attempt.</p>' : '';
  return `<section class="ticket-graph" aria-labelledby="ticket-graph-title">
    <h2 id="ticket-graph-title">Ticket graph</h2>
    <p class="meta">Updates on its own while the worker runs. Select a node for details.</p>
    <p class="g-legend meta"><span class="g-state st-idle">${icon('idle')}Waiting</span> <span class="g-state st-running">${icon('running')}Running</span> <span class="g-state st-succeeded">${icon('succeeded')}Done</span> <span class="g-state st-failed">${icon('failed')}Failed</span></p>
    ${rows}${repairNote}
    <div class="g-detail" role="region" aria-live="polite" aria-label="Node details" data-selected="${esc(selectedId || '')}">${nodePanel(nodes[selectedId])}</div>
  </section>`;
}
