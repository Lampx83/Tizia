import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const HASH = 'a'.repeat(64);
const verdict = (extra = {}) => ({ outcome: 'blocked', gate_reached: 4, reason: 'x', failure_class: 'ordinary', repairs: [],
  candidate: null, budget_used: 1, config_sha256: HASH,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: true, reason: 'x', issues: [], checks: [] }], ...extra });

test('a verdict without progress keeps the old evidence shape', () => {
  const clean = validatePrePrVerdict(verdict());
  assert.equal(Object.hasOwn(clean, 'progress'), false);
  assert.equal(Object.hasOwn(clean, 'strategy'), false);
});

test('progress and strategy survive as bounded evidence', () => {
  const clean = validatePrePrVerdict(verdict({
    progress: { signals: ['gate 3 -> pass'], window: ['no_progress'], reason: 'stagnant', stop: 'stagnation' },
    strategy: 'replan' }));
  assert.deepEqual(clean.progress, { signals: ['gate 3 -> pass'], window: ['no_progress'], reason: 'stagnant', stop: 'stagnation' });
  assert.equal(clean.strategy, 'replan');
});

test('an empty progress block is kept and junk stays bounded', () => {
  assert.deepEqual(validatePrePrVerdict(verdict({ progress: { signals: [], window: [] } })).progress, { signals: [], window: [] });
  const clean = validatePrePrVerdict(verdict({
    progress: { signals: Array.from({ length: 20 }, () => 'x'.repeat(500)), window: [7] }, strategy: 's'.repeat(200) }));
  assert.equal(clean.progress.signals.length, 8);
  assert.equal(clean.progress.signals[0].length, 120);
  assert.deepEqual(clean.progress.window, ['7']);
  assert.equal(clean.strategy.length, 80);
});

test('an empty strategy field survives as null', () => {
  assert.equal(validatePrePrVerdict(verdict({ strategy: null })).strategy, null);
});
