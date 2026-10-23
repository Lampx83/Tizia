// Ticket graph: node states from the trace projection. View only; authority stays on the server.
import { projectPipeline, describeModelCall, loopActions, stepTotals, TRACE_STEPS } from './ai-board-trace.js';
import { visitedNodes } from './ai-board-hsm.js';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const NODES = {
  gate_1: { lane: 'plan', name: 'Check request', purpose: 'Check the request text. Write a plan.' },
  gate_2: { lane: 'plan', name: 'Check allowed files', purpose: 'Check that the plan only changes allowed files.' },
  gate_2_5: { lane: 'plan', name: 'Check plan', purpose: 'Compare the plan with the current code.' },
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
const LANES = [['plan', 'Plan'], ['execute', 'Work and checks'], ['side', 'Re-check']];
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
const GATE_ORDER = TRACE_STEPS.map(s => s.gate);

const gateOf = (id) => (id.startsWith('gate_') ? Number(id.slice(5).replace('_', '.')) : null);
const numberOr = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0);
const gateStage = (gate) => (gate < 3 ? 'plan' : 'execute');

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
    tokens: [call.metrics?.tokens_in, call.metrics?.tokens_out],
    budget: call.budget_units ?? null,
  };
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
// Typical duration of a gate from recorded gate spans. Empty when the trace has none.
function typicalMs(trace, gate) {
  const samples = (trace.runs || []).flatMap(r => r.spans || [])
    .filter(s => Number(s.attributes?.['tizia.gate.id']) === gate && s.end_ms != null && s.end_ms >= s.start_ms)
    .map(s => s.end_ms - s.start_ms);
  return samples.length ? median(samples) : null;
}

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
    typical: typicalMs(trace, step.gate),
    proof: proofNote(step.gate, trace.events),
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
      detail = step ? gateDetail(step, trace) : {};
    } else if (id === 'plan_stopped') state = planBad ? 'failed' : 'idle';
    else if (id === 'plan_ready') state = steps.get(2.5)?.state === 'ok' ? 'succeeded' : 'idle';
    else if (id === 'attempt_open') state = execute.some(s => s.result || s.calls.length || s.state === 'run') ? 'succeeded' : 'idle';
    else state = seen.has(id) ? 'succeeded' : 'idle';
    out[id] = { id, gate, ...def, state, ...detail };
  }
  return out;
}

// Budget as parts for one line. API models show tokens; local runtimes show GPU time and elapsed time.
export function budgetParts(trace = {}, now = Date.now()) {
  const used = trace.root_work?.used || {};
  const limits = trace.root_work?.limits || {};
  const runs = projectPipeline(trace).runs;
  const started = runs[0]?.created_at;
  const last = Math.max(0, ...runs.map(r => Number(r.updated_at) || 0));
  const elapsed = started ? ((trace.root?.live ? now : last) - Number(started)) : null;
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const clock = (ms) => { const t = Math.floor(ms / 1000); const h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, sec = String(t % 60).padStart(2, '0'); return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`; };
  const parts = [`Model calls ${fmt(used.model_calls ?? 0)} of ${fmt(limits.model_calls ?? 0)}`];
  if (trace.totals?.budget_unit === 'k_tokens') parts.push(`Tokens ${fmt(used.tokens ?? 0)} of ${fmt(limits.tokens ?? 0)}`);
  else parts.push(`GPU time ${((trace.totals?.gpu_s ?? 0)).toFixed(1)} s`);
  if (elapsed != null) parts.push(`Running ${clock(elapsed)}`);
  const steps = projectPipeline(trace).steps.filter(s => s.state !== 'ok');
  const times = steps.map(s => typicalMs(trace, s.gate));
  if (!steps.length) parts.push('Time left: none');
  else if (times.every(t => t != null)) parts.push(`Time left: about ${Math.round(times.reduce((a, b) => a + b, 0) / 60000)} min`);
  else parts.push('Time left: No estimate. No step timing yet.');
  return parts;
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
  const typical = node.typical == null ? 'No estimate. No step timing yet.' : `about ${secs(node.typical)}`;
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

// Panel for the chosen node; `chosen` null → the running node, else the failed one.
export function renderTicketGraph(trace = {}, chosen = null, now = Date.now()) {
  const nodes = graphNodes(trace);
  const present = new Set((trace.graph?.nodes || []).map(n => n.id));
  const selectedId = pick(nodes, chosen);
  const lanes = LANES.map(([lane, title]) => {
    const items = Object.values(nodes).filter(n => n.lane === lane && (present.size === 0 || present.has(n.id)));
    if (!items.length) return '';
    return `<div class="g-lane"><h3 class="g-lane-title">${esc(title)}</h3><ol class="g-nodes">${items.map(n => `<li><button type="button" class="gnode st-${n.state}" data-node="${esc(n.id)}" aria-pressed="${n.id === selectedId}" aria-label="${esc(n.name)}: ${esc(STATE_LABEL[n.state])}" title="${esc(n.name)}: ${esc(STATE_LABEL[n.state])}">${icon(n.state)}<span class="g-name">${esc(n.name)}</span></button></li>`).join('')}</ol></div>`;
  }).join('');
  const rollback = projectPipeline(trace).runs.at(-1)?.rollback;
  const rollbackLine = rollback ? `<p class="meta g-loop">Rollback: ${esc(ROLLBACK_LABEL[rollback.outcome] || rollback.outcome)}.</p>` : '';
  return `<section class="ticket-graph" aria-labelledby="ticket-graph-title">
    <h2 id="ticket-graph-title">Ticket graph</h2>
    <p class="meta g-budget">${budgetParts(trace, now).map(esc).join(' · ')}</p>
    <p class="g-legend meta">${Object.keys(ICON).map(s => `<span class="g-state st-${s}">${icon(s)}${esc(STATE_LABEL[s])}</span>`).join('')}</p>
    ${lanes}${rollbackLine}
    <div class="g-detail" role="region" aria-live="polite" aria-label="Node details">${nodePanel(nodes[selectedId], trace.root)}</div>
  </section>`;
}
