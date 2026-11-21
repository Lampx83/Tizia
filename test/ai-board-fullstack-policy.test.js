// Plan guardrail under AI_BOARD_REQUESTER_FULLSTACK: context.write opens mounted contexts, refused areas stay shut.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

process.env.AI_BOARD_REQUESTER_FULLSTACK = '1';
const { validatePlan, CAPABILITY_POLICY } = await import('../server/ai-board/security/policy.js');

const step = (order, file, layer, capability = 'context.write') => ({
  order, title: `Bước ${order}`, description: 'fixture', allowed_scope: [file], acceptance: ['node --test test/x.test.js'],
  tests: ['node --test test/x.test.js'], capability, risk: 'low', non_goals: ['x'], layer, depends_on: order > 1 ? [order - 1] : [],
});
const plan = (steps) => ({
  domain: 'pharmacy', goal: 'Ghi chú nhanh.', allowed_scope: steps.map((s) => s.allowed_scope[0]),
  acceptance: ['node --test test/x.test.js'], tests: ['node --test test/x.test.js'],
  capabilities: [...new Set(steps.map((s) => s.capability))], risk: 'low', non_goals: ['x'], steps,
});
const FULLSTACK = [
  step(1, 'server/contexts/teacher/migrations/001-ghi-chu-nhanh.sql', 'db'),
  step(2, 'server/contexts/teacher/quick-notes.js', 'backend'),
  step(3, 'server/contexts/teacher/index.js', 'backend'),
  step(4, 'public/ghi-chu-nhanh.html', 'frontend', 'public.ui'),
];

test('flag on: a requester plan over a mounted context, its migration and a page is surface', () => {
  assert.ok(CAPABILITY_POLICY['context.write']);
  const checked = validatePlan(plan(FULLSTACK), 'pharmacy');
  assert.equal(checked.tier, 'surface');
});

test('flag on: refused contexts and files stay shut for context.write', () => {
  for (const file of ['server/contexts/admin/db-admin.js', 'server/contexts/billing/index.js', 'server/contexts/payment/x.js',
    'server/contexts/identity/auth.js', 'server/contexts/security/x.js', 'server/contexts/economy/x.js',
    'server/contexts/ai-board-intake/index.js', 'server/contexts/_ai-generated/x/index.js', 'server/contexts/registry.js',
    'server/index.js', 'server/db.js', 'server/ai-board/policy.js']) {
    assert.throws(() => validatePlan(plan([step(1, file, 'backend')]), 'pharmacy'), /scope|money|not granted/, file);
  }
  assert.throws(() => validatePlan(plan([step(1, 'server/contexts/teacher/notes.sql', 'db')]), 'pharmacy'), /migration/);
  assert.throws(() => validatePlan(plan([step(1, 'server/contexts/teacher/x.js', 'backend', 'content.write')]), 'pharmacy'),
    /scope/, 'backend outside _ai-generated still needs context.write');
});

test('flag off: no context.write, a context backend step is refused as before', () => {
  const env = { ...process.env };
  delete env.AI_BOARD_REQUESTER_FULLSTACK;
  const script = `const m = await import('./server/ai-board/security/policy.js');
    const out = { has: 'context.write' in m.CAPABILITY_POLICY, hash: m.CAPABILITY_POLICY_HASH };
    try { m.validatePlan(${JSON.stringify(plan([step(1, 'server/contexts/teacher/x.js', 'backend', 'content.write')]))}, 'pharmacy'); out.err = null; }
    catch (e) { out.err = e.code; }
    console.log(JSON.stringify(out));`;
  const run = spawnSync(process.execPath, ['--input-type=module', '-e', script], { env, encoding: 'utf8' });
  const out = JSON.parse(run.stdout.trim().split('\n').at(-1));
  assert.equal(out.has, false);
  assert.equal(out.err, 'scope_violation');
  assert.equal(out.hash, '4c2158563c6b6f70b98170378e9927b0a2d2b9a1a0cc9bbb055aa345f9647070', 'flag-off catalog hash unchanged');
});
