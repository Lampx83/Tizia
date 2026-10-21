import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const gate4 = extra => ({ outcome: 'blocked', gate_reached: 4, reason: 'adversarial review: x', failure_class: 'ordinary', repairs: [], candidate: null, budget_used: 1,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'x', issues: [], checks: [], ...extra }] });

test('gate 4 keeps a valid change class and bounded adversarial findings, drops anything else', () => {
  const kept = validatePrePrVerdict(gate4({ change_class: 'one_way', adversarial_review: { verdict: 'concerns', truncated: true,
    findings: [{ severity: 'high', issue: 'x'.repeat(500) }, { severity: 'bogus', issue: 'y' }] } })).gates[1];
  assert.equal(kept.change_class, 'one_way');
  assert.deepEqual(kept.adversarial_review.findings.map(f => f.severity), ['high']);
  assert.equal(kept.adversarial_review.findings[0].issue.length, 200);
  assert.equal(kept.adversarial_review.truncated, true);
  for (const bad of ['maybe', 1, null]) assert.equal('change_class' in validatePrePrVerdict(gate4({ change_class: bad })).gates[1], false);
  assert.equal(validatePrePrVerdict(gate4({ adversarial_review: { verdict: 'x', findings: 'no' } })).gates[1].adversarial_review.verdict, null);
});
