import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePrePrVerdict } from '../server/ai-board/repositories/store-contract.js';

const CANDIDATE = { branch: 'ai-board/2026-11-19-ticket-1', base_sha: 'b'.repeat(40), head_sha: 'a'.repeat(40),
  commits: [{ sha: 'a'.repeat(40), title: 'x', files: ['public/x.html'] }] };

const verdict = (outcome, functional = {}) => ({
  outcome, gate_reached: 5.5, reason: 'x', failure_class: null, repairs: [], candidate: CANDIDATE, budget_used: 1,
  gates: [{ gate: 3, blocked: false, reason: null }, { gate: 4, blocked: false, reason: null, issues: [], checks: [] },
    { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker',
      functional: { probe_id: 'text-visible-v1', passed: true, coverage: { rendered_text: true }, ...functional } },
    { gate: 5.5, blocked: false, reason: null, risk_level: 'low' }],
});

test('a suspect check keeps the run for a human: needs_review accepted, ready_for_pr refused', () => {
  const suspect = { check_suspect: ['diff đã chứa giá trị yêu cầu', 'y'.repeat(400)] };
  assert.deepEqual(validatePrePrVerdict(verdict('needs_review', suspect)).gates[2].functional.check_suspect,
    ['diff đã chứa giá trị yêu cầu', 'y'.repeat(300)]);
  assert.throws(() => validatePrePrVerdict(verdict('ready_for_pr', suspect)), /suspect or replaced check/);
  assert.throws(() => validatePrePrVerdict(verdict('needs_review')), /high or critical risk/);
  assert.equal('check_suspect' in validatePrePrVerdict(verdict('ready_for_pr')).gates[2].functional, false);
});

test('a plan that replaced a check reaches needs_review only', () => {
  assert.equal(validatePrePrVerdict(verdict('needs_review'), false, true).outcome, 'needs_review');
  assert.throws(() => validatePrePrVerdict(verdict('ready_for_pr'), false, true), /suspect or replaced check/);
});
