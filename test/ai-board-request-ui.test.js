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
