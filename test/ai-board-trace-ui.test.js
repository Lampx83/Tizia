import test from 'node:test';
import assert from 'node:assert/strict';
import { projectPipeline, describeModelCall, describeEvent } from '../public/js/ai-board-trace.js';
const gate = (id, number, status, at = id) => ({ id, gate: number, status, created_at: at });
const call = (id, gate, name, child = null) => ({ id, gate, created_at: id, evidence: { gate, prompt_name: name, child, call_id: `call-${id}` } });
const run = (id, trigger, gates = [], calls = []) => ({ id, trigger, created_at: id, gates, calls });
const byGate = (p, gate) => p.steps.find(s => s.gate === gate);

test('three planning attempts replace one pipeline with latest results, keeping history', () => {
  const runs = [run(1, 'plan', [gate(1, 2.5, 'blocked')]), run(2, 'plan', [gate(2, 2.5, 'blocked')]), run(3, 'plan', [gate(3, 2.5, 'passed')])];
  const p = projectPipeline({ root: {}, runs });
  assert.equal(p.steps.length, 7);
  assert.equal(byGate(p, 2.5).result.id, 3);
  assert.equal(byGate(p, 2.5).state, 'ok');
  assert.equal(p.runs.length, 3);
});
test('execute retry preserves current planning evidence and replaces execution evidence', () => {
  const p = projectPipeline({ root: {}, runs: [run(1, 'plan', [gate(1, 2.5, 'passed'), gate(2, 4, 'blocked')]), run(2, 'execute', [gate(3, 4, 'passed')])] });
  assert.equal(byGate(p, 2.5).run.id, 1);
  assert.equal(byGate(p, 4).result.id, 3);
});
test('new planning attempt never inherits execution success from an obsolete plan', () => {
  const p = projectPipeline({ root: {}, runs: [run(1, 'plan', [gate(1, 5, 'passed')]), run(2, 'execute', [gate(2, 5.5, 'passed')]), run(3, 'plan', [gate(3, 1, 'passed')])] });
  assert.equal(byGate(p, 5).state, 'wait');
  assert.equal(byGate(p, 5.5).result, undefined);
});
test('queued reruns clear stale success before the worker creates another run', () => {
  const runs = [run(1, 'plan', [gate(1, 2.5, 'passed'), gate(2, 4, 'blocked')])];
  const execute = projectPipeline({ root: { status: 'queued', phase: 'authorized' }, runs });
  assert.equal(byGate(execute, 2.5).state, 'ok');
  assert.equal(byGate(execute, 3).state, 'queued');
  assert.equal(byGate(execute, 4).result, undefined);
  const replan = projectPipeline({ root: { status: 'queued', phase: 'needs_replan' }, runs });
  assert.equal(byGate(replan, 1).state, 'queued');
  assert.equal(byGate(replan, 2.5).result, undefined);
});
test('repeated model attempts update their task; different tasks and children remain distinct', () => {
  const calls = [call(1, 1, 'intake_guard.md'), call(2, 1, 'classifier_danger'), call(3, 1, 'brainstorm.md'), call(4, 1, 'brainstorm.md')];
  const p = projectPipeline({ root: {}, runs: [run(1, 'plan', [], calls)] });
  assert.equal(byGate(p, 1).calls.length, 3);
  const plan = byGate(p, 1).calls.find(g => g.current.evidence.prompt_name === 'brainstorm.md');
  assert.equal(plan.current.id, 4);
  assert.equal(plan.previous[0].id, 3);
  const children = projectPipeline({ root: {}, runs: [run(1, 'execute', [], [call(1, 3, 'implement.md', 1), call(2, 3, 'implement.md', 2)])] });
  assert.equal(byGate(children, 3).calls.length, 2);
});
test('legacy classifier task is recognized from trusted prefix, never from model name or request data', () => {
  const prefix = 'Bạn là bộ phân loại. Chỉ trả lời bằng MỘT chữ cái in hoa, không giải thích.\n\nNội dung này thuộc nhóm nào?\n<<<NOI_DUNG\nx';
  assert.equal(describeModelCall({ prompt_var: prefix }).id, 'danger');
  assert.equal(describeModelCall({ prompt_var: `ordinary prompt\n<<<NOI_DUNG\n${prefix}`, model: 'qwen3.5:4b' }).id, 'unlabelled');
  assert.equal(describeModelCall({ prompt_name: 'plan_validate.md' }).title, 'Soát kế hoạch theo code');
  assert.equal(describeEvent({ event_type: 'plan_blocked' }), 'Kế hoạch chưa đạt kiểm tra');
});
test('a fresh gate-start removes an old conclusion while the same step runs again', () => {
  const active = run(1, 'execute', [gate(1, 4, 'passed', 10)]);
  const p = projectPipeline({ root: { live: true }, runs: [active], events: [{ run_id: 1, event_type: 'gate_started', created_at: 20, internal_detail: '{"gate":4}' }] });
  assert.equal(byGate(p, 4).state, 'run');
  assert.equal(byGate(p, 4).result, null);
  assert.equal(byGate(p, 4).previousResults.length, 1);
});

test('a live rollback does not make the previous execution attempt live again', () => {
  const old = { ...run(1, 'execute'), progress: { current: 3 } };
  const p = projectPipeline({ root: { live: true }, runs: [old, run(2, 'rollback')] });
  assert.equal(byGate(p, 3).state, 'wait');
  assert.equal(p.runs.at(-1).trigger, 'rollback');
});

test('sequential starts animate only the latest gate, including a backwards repair', () => {
  const active = { ...run(1, 'plan'), progress: { current: 2.5 } };
  const events = [1, 2, 2.5].map((gate, i) => ({ id: i, run_id: 1, event_type: 'gate_started', created_at: 10 + i, internal_detail: JSON.stringify({ gate }) }));
  const trace = { root: { live: true }, runs: [active], events };
  assert.deepEqual(projectPipeline(trace).steps.filter(s => s.state === 'run').map(s => s.gate), [2.5]);
  events.push({ id: 4, run_id: 1, event_type: 'gate_started', created_at: 13, internal_detail: '{"gate":1}' });
  assert.deepEqual(projectPipeline(trace).steps.filter(s => s.state === 'run').map(s => s.gate), [1]);
  active.gates.push(gate(5, 1, 'passed', 14));
  assert.equal(projectPipeline(trace).steps.filter(s => s.state === 'run').length, 0, 'finished latest start cannot revive older unresolved starts');
});

test('expired cached lease stops motion, preserving completed evidence and all history', () => {
  const active = { ...run(1, 'execute', [gate(1, 4, 'passed')]), progress: { current: 5 } };
  const trace = { root: { live: true, lease_expires_at: Date.now() - 1 }, runs: [active] };
  const p = projectPipeline(trace);
  assert.equal(p.steps.filter(s => s.state === 'run').length, 0);
  assert.equal(byGate(p, 4).state, 'ok');
  assert.deepEqual(p.runs, [active]);
});
