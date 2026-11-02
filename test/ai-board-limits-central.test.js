import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CONTRACT, BUDGET_UNITS_CEILING, scaledLimit, validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const golden = JSON.parse(fs.readFileSync(new URL('./fixtures/ai-board-scaled-limit.json', import.meta.url), 'utf8'));
const HASH = 'a'.repeat(64);
const verdict = (budget_used) => ({ outcome: 'blocked', gate_reached: 4, reason: 'x', failure_class: 'ordinary', repairs: [], candidate: null,
  budget_used, config_sha256: HASH,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'x', issues: [], checks: [] }] });

test('scaledLimit matches the shared golden values', () => {
  for (const c of golden.cases) assert.equal(scaledLimit(c.kind, c.n), c.expected, `${c.kind} n=${c.n}`);
});

test('contract carries the loop, budget and sandbox client defaults', () => {
  const { _why: _l, ...loop } = CONTRACT.limits.loop;
  const { _why: _b, ...budget } = CONTRACT.limits.budget;
  assert.deepEqual({ model_calls: loop.model_calls, tool_calls: loop.tool_calls, repeats: loop.repeats, error_chars: loop.error_chars },
    { model_calls: 10, tool_calls: 30, repeats: 3, error_chars: 2000 });
  assert.deepEqual(budget, { model_calls: 400, tool_calls: 2000, tokens: 200000, retries: 3, units: 600,
    wall_clock_s: 900, semantic_repairs: 24, child_wall_clock_s: 300, node_wall_clock_s: 1200 });
  assert.deepEqual(CONTRACT.limits.sandbox_client.backoff_s, [1, 2, 4, 8]);
  assert.equal(CONTRACT.limits.sandbox_client.call_attempts, 3);
});

test('verdict refuses worker budget above the contract ceiling', () => {
  assert.equal(validatePrePrVerdict(verdict(BUDGET_UNITS_CEILING)).budget_used, BUDGET_UNITS_CEILING);
  assert.throws(() => validatePrePrVerdict(verdict(BUDGET_UNITS_CEILING + 1)),
    (error) => error.code === 'budget_above_ceiling' && error.status === 400);
});

test('verdict keeps a sha256 config hash and drops a malformed one', () => {
  assert.equal(validatePrePrVerdict(verdict(1)).config_sha256, HASH);
  assert.equal(validatePrePrVerdict({ ...verdict(1), config_sha256: 'nope' }).config_sha256, null);
});
