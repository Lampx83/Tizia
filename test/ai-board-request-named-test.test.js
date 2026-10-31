import test from 'node:test';
import assert from 'node:assert/strict';

import { validatePlan } from '../server/ai-board/policy.js';

const NAMED_TEST = 'node --test test/so-tay-git.test.js';
const PAGES = ['public/so-tay-git.html', 'public/js/domains/it/experiences.js', 'public/js/domains/it/modules.js',
  'public/campus-proto/b-iso-canvas.html'];

function root43Plan() {
  return {
    domain: 'it',
    goal: 'Thêm trang Sổ tay Git.',
    allowed_scope: PAGES,
    acceptance: [NAMED_TEST],
    tests: PAGES.map(() => NAMED_TEST),
    capabilities: ['public.ui'],
    risk: 'low',
    non_goals: ['không sửa auth'],
    steps: PAGES.map((file, index) => ({
      order: index + 1, title: `Sửa ${file}`, description: `Sửa ${file}`, allowed_scope: [file],
      acceptance: [NAMED_TEST], tests: [NAMED_TEST], capability: 'public.ui', risk: 'low',
      non_goals: ['không sửa auth'], layer: 'frontend', depends_on: index ? [index] : [],
    })),
  };
}

test('plan whose tests name a request-named test file outside every step scope is accepted', () => {
  const checked = validatePlan(root43Plan(), 'it');
  assert.equal(checked.tier, 'surface');
  assert.deepEqual(checked.plan.allowed_scope, PAGES);
});

test('a step that scopes the test file itself is not grantable to a surface capability', () => {
  const plan = root43Plan();
  plan.steps.push({ ...plan.steps[0], order: 5, allowed_scope: ['test/so-tay-git.test.js'], depends_on: [4] });
  plan.allowed_scope.push('test/so-tay-git.test.js');
  assert.throws(() => validatePlan(plan, 'it'), /not granted/);
});
