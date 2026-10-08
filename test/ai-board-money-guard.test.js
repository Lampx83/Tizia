// Money guardrail: requests about the platform's real money need a human (intake), and no plan may touch the
// money files (policy). Economics lessons that merely talk about prices stay automatic.
import test from 'node:test';
import assert from 'node:assert/strict';

import { checkIntake } from '../server/ai-board/intake-guard.js';
import { validatePlan } from '../server/ai-board/policy.js';

test('requests about the platform\'s money are flagged for a human, not rejected', () => {
  for (const [title, detail] of [
    ['Giảm học phí gói Pro', 'cho học sinh nghèo'],
    ['Đổi giá gói Plus', 'rẻ hơn một chút'],
    ['Thêm thanh toán MoMo', 'ở trang nâng cấp'],
    ['Tạo mã giảm giá', 'cho lớp 10A'],
    ['Hoàn tiền cho bạn Lan', 'bạn ấy trả nhầm'],
    ['Change pricing', 'make the premium plan cheaper'],
  ]) {
    const out = checkIntake(title, detail);
    assert.equal(out.block, false, title);
    assert.ok(out.labels.includes('money') || out.labels.includes('privileged_area'), `${title}: ${out.labels}`);
  }
});

test('economics lessons about prices are not money requests', () => {
  for (const [title, detail] of [
    ['Thêm bài tập tính doanh thu', 'cho trường Kinh tế, có giá bán và chi phí'],
    ['Bài học về tiền tệ', 'giải thích lạm phát cho lớp 12'],
    ['Đổi màu nút Gửi', 'trang giới thiệu, nút xanh'],
  ]) assert.ok(!checkIntake(title, detail).labels.includes('money'), title);
});

const plan = (scope) => {
  const step = { order: 1, title: 's', description: 'd', allowed_scope: [scope], acceptance: ['a'], tests: ['node --test'],
    capability: 'public.ui', risk: 'low', non_goals: ['x'] };
  return { domain: 'it', goal: 'g', allowed_scope: [scope], acceptance: ['a'], tests: ['node --test'],
    capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step] };
};

test('no plan may touch the money files, even through a parent folder', () => {
  for (const scope of ['public/pricing.html', 'public/js/plans.js', 'public/js/engine/wallet.js', 'public/js/', 'public/']) {
    assert.throws(() => validatePlan(plan(scope), 'it'), (e) => e.code === 'money_scope', scope);
  }
  assert.doesNotThrow(() => validatePlan(plan('public/gioi-thieu.html'), 'it'));
  assert.doesNotThrow(() => validatePlan(plan('public/js/engine/path-renderer.js'), 'it'));
});
