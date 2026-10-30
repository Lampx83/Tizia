import test from 'node:test';
import assert from 'node:assert/strict';
import { renderItem } from '../public/js/suggestion-fab.js';

test('request queue renders unavailable, busy and recovered worker states without a false ETA', () => {
  const request = { id: 1, title: 'ETA', student: 'Lan', status: 'pending' };
  const offline = renderItem({ ...request, queue: { position: 1, eta_s: null, worker_ready: false } }, 'Lan');
  assert.match(offline, /chưa thể ước tính/);
  assert.doesNotMatch(offline, /phút nữa/);
  const online = renderItem({ ...request, queue: { position: 1, eta_s: 120, worker_ready: true } }, 'Lan');
  assert.match(online, /2 phút nữa/);
  assert.match(renderItem({ ...request, queue: { position: 1, worker_ready: false } }, 'Lan'), /chưa thể ước tính/);
});

test('a partial request offers "Sửa yêu cầu" to its owner and "Tiếp tục" only to an admin', () => {
  const request = { id: 7, title: 'Bộ thẻ', student: 'Lan', status: 'reviewing', phase: 'partial',
    status_label: 'hoàn thành một phần, chờ tiếp tục', can_edit: true, can_continue: false };
  const mine = renderItem(request, 'Lan');
  assert.doesNotMatch(mine, /data-req-continue/);  // người gửi không được resume
  assert.match(mine, /data-req-edit="7"/);
  assert.match(mine, /hoàn thành một phần/);
  assert.doesNotMatch(mine, /data-req-retry/);  // không mời "Thử cách khác" khi chỉ còn phải chạy nốt
  assert.doesNotMatch(renderItem({ ...request, can_edit: false }, 'Minh'), /data-req-edit/);

  const adminView = renderItem({ ...request, can_edit: false, can_continue: true }, 'Lan');
  assert.match(adminView, /data-req-continue="7"/);
});
