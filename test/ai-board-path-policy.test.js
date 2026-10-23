// Path policy AI Board: deny_paths trong guard-lexicon.json dùng chung Node và Python (fixture test/fixtures/ai-board-path-policy.json).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

import { check } from '../server/ai-board/security/path-policy.js';
import { validatePlan } from '../server/ai-board/security/policy.js';
import { createAsyncAiBoardStore } from '../server/ai-board/store-async.js';
import { openBoard } from './support/ai-board-db.js';

const CASES = JSON.parse(fs.readFileSync(new URL('./fixtures/ai-board-path-policy.json', import.meta.url), 'utf8'));
const SHA = (c) => c.repeat(40);

test('check() agrees with the shared fixture (Python runs the same list)', () => {
  for (const { path, allow } of CASES) {
    assert.equal(check(path, 'read').allow, allow, JSON.stringify(path));
  }
});

test('check() reason names the op and the denied path', () => {
  const verdict = check('AI-Board/harness/gates/guard.py', 'pr');
  assert.equal(verdict.allow, false);
  assert.match(verdict.reason, /^pr: AI-Board\/harness\/gates\/guard\.py/);
});

test('validatePlan refuses an AI Board path in allowed_scope', () => {
  const step = { order: 1, title: 'Sửa', description: 'x', allowed_scope: ['public/js/x.js'], acceptance: ['đổi'], tests: ['npm test'],
    capability: 'public.ui', risk: 'low', non_goals: [] };
  const plan = { domain: 'it', goal: 'Sửa.', allowed_scope: ['ai-board/harness/gates/guard.py'], acceptance: step.acceptance,
    tests: step.tests, capabilities: ['public.ui'], risk: 'low', non_goals: [], steps: [step] };
  assert.throws(() => validatePlan(plan, 'it'), (error) => error.code === 'scope_violation');
});

test('recordPullRequest refuses a changed-file list that touches a denied path before any write', async () => {
  const db = await openBoard({ users: [[1, 'lan', 'Lan', 'student', 'it']] });
  try {
    const store = createAsyncAiBoardStore(db.d);
    const pullRequest = { number: 12, url: 'https://github.com/x/y/pull/12', branch: 'ai-board/2026-10-23-ticket-1-abc123',
      base: 'dev', base_sha: SHA('a'), head_sha: SHA('b') };
    await assert.rejects(store.recordPullRequest(1, { workerId: 'w1', leaseToken: 't', runId: 1, idempotencyKey: 'pr-path-001',
      pullRequest, changedFiles: ['public/index.html', 'server/ai-board/store.js'] }),
    (error) => error.status === 422 && error.code === 'path_denied');
    await assert.rejects(store.recordPullRequest(1, { workerId: 'w1', leaseToken: 't', runId: 1, idempotencyKey: 'pr-path-002',
      pullRequest, changedFiles: 'public/index.html' }),
    (error) => error.status === 400);
  } finally { await db.dispose(); }
});
