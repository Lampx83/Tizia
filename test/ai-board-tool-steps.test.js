import test from 'node:test';
import assert from 'node:assert/strict';
import { argSummary, redactText, projectToolStep, createToolStepView } from '../server/ai-board/services/tool-step-view.js';
import { createTraceReadModel } from '../server/ai-board/services/trace-read-model.js';
import { toolRows, attemptsOf, modelFailure } from '../public/js/ai-board-trace.js';
import { renderTicketGraph } from '../public/js/ai-board-graph.js';

const LONG = 'x'.repeat(400);

test('args drop secret keys and cap long strings', () => {
  const out = argSummary({ file: 'public/a.html', api_key: 'abc', nested: { token: 'zzz' }, body: LONG, count: 3 });
  assert.equal(out.file, 'public/a.html');
  assert.equal(out.api_key, '[đã che]');
  assert.deepEqual(out.nested, { token: '[đã che]' });
  assert.ok(out.body.length <= 161 && out.body.endsWith('…'));
  assert.equal(out.count, 3);
});

test('free text loses token-shaped values and is capped', () => {
  assert.equal(redactText('key sk-abcdef1234567890 used', 300), 'key [đã che] used');
  assert.equal(redactText('password=hunter2 ok', 300), 'password=[đã che] ok');
  assert.equal(redactText('Bearer abcdefghijk', 300), '[đã che]');
  assert.ok(redactText(LONG, 300).length <= 301);
});

test('projected step keeps only capped args and observation', () => {
  const row = projectToolStep({ proposal_id: 9n, child: 0, step: 2, call_id: 'tc1', tool: 'write_file', status: 'done', kind: 'ok',
    args_json: JSON.stringify({ file: 'public/b.html', content: LONG }), observation: 'ok ' + LONG, updated_at: 5 });
  assert.equal(row.tool, 'write_file');
  assert.equal(row.call_id, 'tc1');
  assert.ok(row.args.content.length <= 161);
  assert.ok(row.observation.length <= 301);
  assert.deepEqual(projectToolStep({ args_json: 'not json', step: 0 }).args, {});
});

test('view reads tool steps of one root through the run scope and projects them', async () => {
  let seen = null;
  const store = { db: { all: async (sql, params) => { seen = { sql, params }; return [{ proposal_id: '9', child: 0, step: 0, call_id: 'tc1',
    tool: 'read_file', args_json: '{"file":"public/a.html"}', status: 'done', kind: 'ok', observation: 'page', updated_at: 1 }]; } } };
  const rows = await createToolStepView(store).forRoot(7);
  assert.deepEqual(seen.params, ['ticket-7:%']);
  assert.match(seen.sql, /tool_run r ON r\.proposal_id = s\.proposal_id/);
  assert.equal(rows[0].args.file, 'public/a.html');
});

test('read model attaches tool_steps to the trace', async () => {
  const store = { db: { get: async (sql) => (sql.includes('source_request_id') ? { id: 7 } : { n: 1, m: 1 }), all: async () => [] },
    getRequestTrace: async () => ({ root: { id: 7 }, runs: [{ id: 1 }], resume: null }) };
  const parts = { allowance: { read: async () => ({}) }, hsm: { read: async () => ({}) },
    spans: { forRuns: async () => new Map(), gateHistory: async () => ({}) }, toolSteps: { forRoot: async (id) => [{ root: id, call_id: 'tc1' }] } };
  const out = await createTraceReadModel(store, parts).read('42', undefined);
  assert.deepEqual(out.trace.tool_steps, [{ root: 7, call_id: 'tc1' }]);
});

// Fixture: one gate-3 step in an execute run with three tool calls (infra, product, ok) and a retried model call.
function fixture() {
  const loop = (id, iteration, extra = {}) => ({ id, gate: 'model_call', created_at: 100 + iteration,
    evidence: { gate: 3, child: 0, iteration, call_id: `model-${id}`, prompt_name: 'tool_loop.md', result: 'ok', metrics: { tokens_in: 10, tokens_out: 4, wall_ms: 50 }, ...extra } });
  const span = (model, name, attributes, start = 1000, end = 1300) => ({ name: `execute_tool ${name}`, start_ms: start, end_ms: end,
    attributes: { 'gen_ai.tool.name': name, 'gen_ai.tool.call.id': attributes.cid, 'tizia.model_call_id': model, 'tizia.step': attributes.step, ...attributes.extra } });
  const calls = [
    loop(1, 0, { output: '' }),
    loop(2, 1, { output: JSON.stringify({ tool: 'sandbox_exec', arguments: {} }), result: 'timeout', error: 'timed out after 30s' }),
    loop(3, 1, { output: JSON.stringify({ tool: 'write_file', arguments: { file: 'public/b.html' } }), result: 'error', error: 'parse' }),
    loop(4, 2, { output: '', result: 'ok' }),
    { id: 99, gate: 'model_call', created_at: 90, evidence: { gate: 3, child: 0, iteration: 5, call_id: 'implement-1',
      prompt_name: 'implement.md', result: 'retry', error: 'search miss', metrics: {} } },
    { id: 100, gate: 'model_call', created_at: 91, evidence: { gate: 3, child: 0, iteration: 5, call_id: 'implement-2',
      prompt_name: 'implement.md', result: 'ok', metrics: {} } },
  ];
  const spans = [
    span('model-1', 'read_file', { cid: 'tc1', step: 0, extra: { 'tizia.tool.status': 'ok' } }),
    span('model-2', 'sandbox_exec', { cid: 'tc2', step: 1, extra: { 'tizia.tool.status': 'infra_error', 'tizia.tool.error_class': 'infra', 'tizia.tool.error_kind': 'timeout' } }, 1000, 31000),
    span('model-3', 'write_file', { cid: 'tc3', step: 2, extra: { 'tizia.tool.status': 'error', 'tizia.tool.error_class': 'product', 'tizia.tool.error_kind': 'args' } }),
  ];
  const toolSteps = [
    { call_id: 'tc1', tool: 'read_file', args: { file: 'public/a.html' }, kind: 'ok', observation: '<main>', step: 0 },
    { call_id: 'tc2', tool: 'sandbox_exec', args: { argv: ['node', '--test'] }, kind: 'infra_error', observation: '[infra/timeout] timed out', step: 1 },
    { call_id: 'tc3', tool: 'write_file', args: { file: 'public/b.html', content: 'x' }, kind: 'error', observation: 'bad args', step: 2 },
  ];
  const run = { id: 10, trigger: 'execute', created_at: 1000, updated_at: 9000, plan_revision: 1, spans, calls,
    gates: [{ id: 50, gate: 3, status: 'passed', created_at: 9000, evidence: {} }] };
  return { root: { id: 1, status: 'running', phase: 'implement', live: false }, runs: [run], events: [], tool_steps: toolSteps, gate_history: {} };
}

const stepOf = (trace, records) => ({ run: trace.runs[0], calls: records.map(r => ({ current: r, previous: [] })) });

test('tool rows use the span and tool_step, never a "?" tool, with class and time', () => {
  const trace = fixture();
  const rows = toolRows(stepOf(trace, [trace.runs[0].calls[0]]), trace);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].tool, 'read_file');
  assert.equal(rows[0].target, 'public/a.html');
  assert.equal(rows[0].label, 'Done');
  assert.equal(rows[0].failure, null);
});

test('failed rows keep their error class and the parse-failed call reads as error', () => {
  const trace = fixture();
  const rows = toolRows(stepOf(trace, [trace.runs[0].calls[1], trace.runs[0].calls[2]]), trace);
  assert.equal(rows[0].tool, 'sandbox_exec');
  assert.equal(rows[0].failure.class, 'infra');
  assert.equal(rows[0].failure.kind, 'timeout');
  assert.equal(rows[0].label, 'Infra error');
  assert.equal(rows[0].ms, 30000);
  assert.equal(rows[1].tool, 'write_file');
  assert.equal(rows[1].failure.class, 'product');
  assert.equal(modelFailure({ result: 'error' }).class, 'product');
  assert.equal(modelFailure({ result: 'timeout' }).kind, 'timeout');
  assert.equal(modelFailure({ result: 'ok' }), null);
});

test('old native call with no span and no link shows "not recorded", not "?"', () => {
  const trace = fixture();
  trace.runs[0].spans = [];
  const row = toolRows(stepOf(trace, [trace.runs[0].calls[0]]), trace)[0];
  assert.equal(row.tool, 'not recorded');
  assert.equal(row.target, '');
  assert.equal(row.label, 'No result recorded');
});

test('a failed model attempt with no span is a visible row with class and retry', () => {
  const trace = fixture();
  trace.runs[0].spans = [];
  const timedOut = { ...trace.runs[0].calls[1], call_id: 'model-t1', result: 'timeout', error: 'timed out', output: '' };
  const retried = { ...trace.runs[0].calls[1], call_id: 'model-t2', result: 'ok', error: '', output: '' };
  const rows = toolRows(stepOf(trace, [{ ...timedOut, id: 201, created_at: 201 }, { ...retried, id: 202, created_at: 202 }]), trace);
  assert.equal(rows[0].tool, 'model_call');
  assert.equal(rows[0].label, 'Model timeout');
  assert.equal(rows[0].failure.class, 'infra');
  assert.equal(rows[0].failure.kind, 'timeout');
  assert.deepEqual(rows[1].retry, { n: 2, of: 2, reason: 'timed out after 30s' });
});

test('model_call span from a stopped loop names the step and infra class', () => {
  const trace = fixture();
  trace.runs[0].spans = [{ name: 'execute_tool model_call', start_ms: 0, end_ms: 60000, attributes: { 'gen_ai.tool.name': 'model_call',
    'gen_ai.tool.call.id': 'tc9', 'tizia.model_call_id': 'model-1', 'tizia.step': 4, 'tizia.tool.status': 'infra_error',
    'tizia.tool.error_class': 'infra', 'tizia.tool.error_kind': 'timeout' } }];
  const row = toolRows(stepOf(trace, [trace.runs[0].calls[0]]), trace)[0];
  assert.equal(row.tool, 'model_call');
  assert.equal(row.step, 4);
  assert.equal(row.label, 'Infra error');
  assert.equal(row.failure.class, 'infra');
});

test('view keeps the newest rows under the cap, oldest first', async () => {
  const rows = [{ step: 9, updated_at: 9 }, { step: 8, updated_at: 8 }];
  const store = { db: { all: async () => rows } };
  const out = await createToolStepView(store).forRoot(7);
  assert.deepEqual(out.map(r => r.step), [8, 9]);
});

test('retries count attempts and carry the reason of the attempt before', () => {
  const info = attemptsOf([{ call_id: 'implement-1', gate: 3, child: 0, iteration: 5, prompt_name: 'implement.md', result: 'retry', error: 'search miss' },
    { call_id: 'implement-2', gate: 3, child: 0, iteration: 5, prompt_name: 'implement.md', result: 'ok' }]);
  assert.deepEqual(info.get('implement-2'), { n: 2, of: 2, reason: 'search miss' });
  assert.equal(info.has('implement-1'), false);
});

test('log filter by failure class and by tool narrows the tool rows', () => {
  const trace = fixture();
  const base = { summary: '', events: '' };
  const infra = renderTicketGraph(trace, 'gate_3', Date.now(), { ...base, filter: { failure: 'infra', tool: '' } });
  assert.match(infra, /#2 sandbox_exec/);
  assert.doesNotMatch(infra, /#1 read_file/);
  assert.doesNotMatch(infra, /#3 write_file/);
  const tool = renderTicketGraph(trace, 'gate_3', Date.now(), { ...base, filter: { failure: '', tool: 'write_file' } });
  assert.match(tool, /#3 write_file/);
  assert.doesNotMatch(tool, /#2 sandbox_exec/);
  const none = renderTicketGraph(trace, 'gate_3', Date.now(), { ...base, filter: { failure: 'product', tool: 'read_file' } });
  assert.match(none, /No tool call matches this filter/);
  const all = renderTicketGraph(trace, 'gate_3', Date.now(), { ...base, filter: { failure: '', tool: '' } });
  assert.match(all, /#1 read_file/);
  assert.match(all, /Attempt 2 of 2 · retried after: search miss/);
});
