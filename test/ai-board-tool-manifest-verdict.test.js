import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const HASH = 'a'.repeat(64);
const verdict = (manifest) => ({
  outcome: 'blocked', gate_reached: 3, reason: 'x', failure_class: 'ordinary', repairs: [], candidate: null, budget_used: 1,
  gates: [{ gate: 3, blocked: true, reason: 'x', ...(manifest === undefined ? {} : { tool_manifest: manifest }) }],
});

test('gate 3 verdict keeps a well-formed tool manifest hash and drops anything else', () => {
  assert.equal(validatePrePrVerdict(verdict(HASH)).gates[0].tool_manifest, HASH);
  for (const bad of ['short', 'A'.repeat(64), `${HASH}0`, 123, null, { a: 1 }]) {
    assert.equal('tool_manifest' in validatePrePrVerdict(verdict(bad)).gates[0], false, String(bad));
  }
  assert.equal('tool_manifest' in validatePrePrVerdict(verdict(undefined)).gates[0], false);
});
