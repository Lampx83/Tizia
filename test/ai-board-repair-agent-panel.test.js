import test from 'node:test';
import assert from 'node:assert/strict';
import { renderRepairAgent } from '../public/js/ai-board-trace.js';
import { graphNodes, renderTicketGraph } from '../public/js/ai-board-graph.js';

const trace = (spans) => ({ runs: [{ id: 4, spans }] });

test('no agent span leaves the panel out', () => {
  assert.equal(renderRepairAgent({ runs: [] }), '');
  assert.equal(renderRepairAgent(trace([{ name: 'gate_4', attributes: {} }])), '');
});

test('an applied proposal shows outcome, action, files and reason', () => {
  const html = renderRepairAgent(trace([{ name: 'repair_agent.proposal', attributes: {
    'tizia.agent.outcome': 'applied', 'tizia.agent.action': 'change_file',
    'tizia.agent.files': ['public/js/campus/building.js'], 'tizia.agent.reason': 'selector lệch' } }]));
  assert.match(html, /Repair agent/);
  assert.match(html, /Đã áp dụng/);
  assert.match(html, /building\.js/);
  assert.match(html, /selector lệch/);
});

test('a denial and a manual stop stay visible, never escaped', () => {
  const html = renderRepairAgent(trace([
    { name: 'repair_agent.proposal', attributes: { 'tizia.agent.outcome': 'denied', 'tizia.agent.reason': '<b>x</b>' } },
    { name: 'repair_agent.proposal', attributes: { 'tizia.agent.outcome': 'stopped', 'tizia.agent.reason': 'hết 3 lượt' } },
  ]));
  assert.match(html, /Bị từ chối/);
  assert.match(html, /Dừng thủ công/);
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
});

test('the progress window and strategy change render as the vector', () => {
  const html = renderRepairAgent(trace([{ name: 'progress.decision', attributes: {
    'tizia.progress.node': 'repair_check', 'tizia.strategy.action': 'replan',
    'tizia.progress.failure_class': 'syntax', 'tizia.progress.window': ['g3 f1 a1', 'g3 f1 a2'] } }]));
  assert.match(html, /repair_check/);
  assert.match(html, /replan/);
  assert.match(html, /g3 f1 a1 · g3 f1 a2/);
});

// Agent path: no repair round started, so the journal holds the check and the stop only.
const agentStop = () => ({
  root: { id: 1, status: 'blocked', live: false },
  runs: [{ id: 4, trigger: 'execute', created_at: 10, updated_at: 20, calls: [],
    gates: [{ gate: 5, status: 'blocked', created_at: 11, public_reason: 'lỗi tương phản', evidence: null }],
    spans: [
      { name: 'repair_agent.proposal', attributes: { 'tizia.agent.outcome': 'denied', 'tizia.agent.reason': 'quá phạm vi' } },
      { name: 'progress.decision', attributes: { 'tizia.progress.node': 'repair_check', 'tizia.progress.failure_class': 'scope', 'tizia.strategy.action': 'stop_admin' } }] }],
  events: [],
  journal: [{ run_id: 4, node: 'repair_check', outcome: 'done', created_at: 12, state: { repair_state: { stop_note: 'scope: ngoài phạm vi' } } }],
});

test('the agent path still fills the repair node: strategy change and stop', () => {
  assert.equal(graphNodes(agentStop()).repair.state, 'succeeded');
  const html = renderTicketGraph(agentStop(), 'repair');
  assert.doesNotMatch(html, /Repair chưa có nhật ký/);
  assert.match(html, /Strategy changes/);
  assert.match(html, /repair check → Chờ quản trị viên/);
  assert.match(html, /<h4>Stop<\/h4><p>scope: ngoài phạm vi<\/p>/);
});
