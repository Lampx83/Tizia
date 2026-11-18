import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict, softMissNote } from '../server/ai-board/repositories/store-contract.js';
import { renderSoftMisses } from '../public/js/ai-board-trace.js';

const miss = { gate: 5, check: 'contrast', value: 3.68, threshold: 4.5, page: '/grapher.html', width: 375, detail: 'button "Bậc nhất" 3.68' };
const blocked5 = extra => ({ outcome: 'blocked', gate_reached: 5, reason: 'x', failure_class: 'ordinary', repairs: [], candidate: null, budget_used: 1,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [], checks: [] },
    { gate: 5, blocked: true, reason: 'x', smoke_passed: true, http_observed: true, runner: 'docker', ...extra }] });

test('gate 4 and 5 keep bounded soft misses and drop malformed ones', () => {
  const kept = validatePrePrVerdict(blocked5({ soft_misses: [miss, { check: 'x'.repeat(90), value: 'bad' }, 'junk'] })).gates[2];
  assert.deepEqual(kept.soft_misses[0], miss);
  assert.equal(kept.soft_misses.length, 1);
  assert.equal('soft_misses' in validatePrePrVerdict(blocked5({})).gates[2], false);
});

test('note names each soft miss for the requester; none means no note', () => {
  const note = softMissNote([{ gate: 4, soft_misses: [{ gate: 4, check: 'inline_script', value: 1, threshold: 0, detail: 'a' }] }, { gate: 5, soft_misses: [miss] }]);
  assert.match(note, /2 kiểm chất lượng chưa đạt ngưỡng/);
  assert.match(note, /contrast 3\.68 \(ngưỡng 4\.5\) \/grapher\.html 375px/);
  assert.equal(softMissNote([{ gate: 5 }]), '');
});

test('admin trace lists soft misses per run', () => {
  assert.equal(renderSoftMisses({ runs: [{ id: 1, gates: [{ gate: 5, evidence: {} }] }] }), '');
  const html = renderSoftMisses({ runs: [{ id: 2, gates: [{ gate: 5, evidence: JSON.stringify({ soft_misses: [miss] }) }] }] });
  assert.match(html, /Cảnh báo chất lượng/);
  assert.match(html, /contrast/);
  assert.match(html, /3\.68/);
  assert.match(html, /&quot;Bậc nhất&quot;|Bậc nhất/);
});
