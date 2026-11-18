import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const sha = (c) => c.repeat(40);
const cand = { branch: 'ai-board/2026-11-18-ticket-1-abc', base_sha: sha('b'), head_sha: sha('c'),
  commits: [{ sha: sha('c'), title: 'x', files: ['public/a.html'] }] };
const blocked = (extra) => ({ outcome: 'blocked', gate_reached: 5, reason: 'x', failure_class: 'ordinary', repairs: [], candidate: null,
  budget_used: 1, gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [], checks: [] },
    { gate: 5, blocked: true, reason: 'x', smoke_passed: true, http_observed: true, runner: 'docker' }], ...extra });

test('a blocked verdict keeps a valid blocked_candidate and silently drops an invalid one', () => {
  assert.equal(validatePrePrVerdict(blocked({ blocked_candidate: cand })).blocked_candidate.head_sha, sha('c'));
  assert.equal('blocked_candidate' in validatePrePrVerdict(blocked({ blocked_candidate: { branch: 'main' } })), false);
  assert.equal('blocked_candidate' in validatePrePrVerdict(blocked({})), false);
  assert.equal(validatePrePrVerdict(blocked({ blocked_candidate: cand })).candidate, null);
});
