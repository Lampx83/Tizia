import test from 'node:test';
import assert from 'node:assert/strict';
import { renderRepairAgent } from '../public/js/ai-board-trace.js';

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
