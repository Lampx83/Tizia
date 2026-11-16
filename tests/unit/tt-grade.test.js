import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeMission } from '../../server/tt-grade.js';

const run = (o) => ({ hintsOff: true, errors: 0, asks: 0, tier: 0, ...o });

test('chưa làm lượt nào thì chưa có bậc', () => {
  assert.equal(gradeMission([], 0).level, 0);
});
test('bậc 1: đã hoàn thành nhưng còn gợi ý / còn lỗi / còn hỏi AI', () => {
  assert.equal(gradeMission([run({ hintsOff: false }), run({ errors: 2 }), run({ asks: 1 })]).level, 1);
  assert.equal(gradeMission([], 3).level, 1);   // dữ liệu cũ chỉ có mission_done
});
test('bậc 2: 2 lượt tự chủ', () => {
  const g = gradeMission([run({}), run({}), run({ errors: 1 })]);
  assert.deepEqual([g.level, g.solo, g.done], [2, 2, 3]);
});
test('bậc 3: thêm 2 lượt tự chủ ở mức Khó trở lên', () => {
  assert.equal(gradeMission([run({ tier: 3 }), run({ tier: 4 })]).level, 3);
  assert.equal(gradeMission([run({ tier: 3 }), run({ tier: 1 })]).level, 2);
});
