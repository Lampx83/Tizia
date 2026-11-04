import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const HASH = 'a'.repeat(64);
const verdict = (extra = {}) => ({ outcome: 'blocked', gate_reached: 4, reason: 'x', failure_class: 'ordinary', repairs: [],
  candidate: null, budget_used: 1, config_sha256: HASH,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'x', issues: [], checks: [] }], ...extra });

test('a verdict without repair attempts keeps the old evidence shape', () => {
  assert.equal(Object.hasOwn(validatePrePrVerdict(verdict()), 'repair_agent'), false);
  assert.equal(Object.hasOwn(validatePrePrVerdict(verdict({ repair_agent: [] })), 'repair_agent'), false);
});

test('each repair attempt keeps outcome, action, files and reason within caps', () => {
  const clean = validatePrePrVerdict(verdict({ repair_agent: [
    { attempt: 1, outcome: 'applied', action: 'change_file', files: ['public/js/campus/building.js'],
      reason: 'selector lệch' },
    { attempt: 2, outcome: 'denied', files: Array.from({ length: 12 }, () => 'p'.repeat(400)), reason: 'y'.repeat(900) },
  ] }));
  assert.equal(clean.repair_agent.length, 2);
  assert.deepEqual(clean.repair_agent[0], { attempt: 1, outcome: 'applied', action: 'change_file',
    reason: 'selector lệch', files: ['public/js/campus/building.js'] });
  assert.equal(clean.repair_agent[1].files.length, 8);
  assert.equal(clean.repair_agent[1].files[0].length, 200);
  assert.equal(clean.repair_agent[1].reason.length, 300);
});

test('unknown outcomes and overlong batches are dropped, not trusted', () => {
  const clean = validatePrePrVerdict(verdict({ repair_agent: [
    { attempt: 1, outcome: 'hacked', reason: 'x' },
    ...Array.from({ length: 9 }, (_, i) => ({ attempt: i + 2, outcome: 'stopped', reason: 'hết lượt' })),
  ] }));
  assert.equal(clean.repair_agent.length, 6);
  assert.equal(clean.repair_agent.every((item) => item.outcome === 'stopped'), true);
});
