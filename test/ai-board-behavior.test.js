import test from 'node:test';
import assert from 'node:assert/strict';

import { behaviorMetrics, compressionRatio, distinctLineRatio, idleRuns, topologyEntropy } from '../server/ai-board/services/behavior.js';

const call = (gate, tokens, output, child = null) => ({ gate, child, metrics: { tokens_in: tokens }, output, output_len: output.length });

test('distinct line ratio drops for a repeated-line output', () => {
  assert.equal(distinctLineRatio('a\nb\nc\nd'), 1);
  assert.equal(distinctLineRatio(Array(10).fill('same line').join('\n')), 0.1);
  assert.equal(distinctLineRatio('  \n'), null);
});

test('compression ratio is very low for repeated output and higher for varied text', () => {
  const repeated = compressionRatio('retry the same step\n'.repeat(40));
  const varied = compressionRatio(Array.from({ length: 40 }, (_, i) => `line ${i * 7919 % 977} value ${i ** 3}`).join('\n'));
  assert.ok(repeated < 0.15 && varied > 0.3, `${repeated} ${varied}`);
});

test('topology entropy is 1 for distinct nodes and near 0 for one node repeated', () => {
  assert.equal(topologyEntropy(['a', 'b', 'c', 'd', 'e', 'f']), 1);
  assert.equal(topologyEntropy(['a', 'a', 'a', 'a', 'a', 'a']), 0);
  assert.ok(topologyEntropy(['a', 'b', 'a', 'b', 'a', 'b']) < 0.4);
  assert.equal(topologyEntropy(['a', 'b']), null);
});

test('a node that reruns with identical output counts as an idle run', () => {
  assert.equal(idleRuns([call(3, 10, 'x'), call(3, 11, 'x'), call(3, 12, 'y')]), 1);
});

test('context reports the tokens used and the delta against the previous call', () => {
  const m = behaviorMetrics([call(3, 1000, 'a\nb'), call(4, 26000, 'c\nd')]);
  assert.equal(m.context.tokens_in, 26000);
  assert.equal(m.context.delta, 25000);
  assert.equal(m.context.limit, 32768);
  assert.equal('ratio' in m.context, false);
});

test('a looping run raises the output and topology warnings', () => {
  const loop = 'same line\n'.repeat(60);
  const m = behaviorMetrics(Array.from({ length: 6 }, () => call(3, 4000, loop, 1)));
  assert.equal(m.output.warn, true);
  assert.equal(m.topology.entropy, 0);
  assert.equal(m.topology.idle_runs, 5);
  assert.equal(m.topology.warn, true);
});

test('no calls yields empty metrics without warnings', () => {
  const m = behaviorMetrics([]);
  assert.deepEqual([m.context.tokens_in, m.context.delta, m.output.warn, m.topology.warn], [null, null, false, false]);
});
