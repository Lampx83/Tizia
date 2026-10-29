import test from 'node:test';
import assert from 'node:assert/strict';
import { hasActiveRewrite, liveVersion, rewriteStatus, rowPill, shouldPoll, QUEUE_STALE_MS, STALE_HINT } from '../public/js/admin-skills-state.js';

const NOW = 10_000_000;
const job = (status, extra = {}) => ({ status, confirmed_at: NOW - 2 * 60000, ...extra });

test('queued 2 min shows elapsed, no hint', () => {
  assert.deepEqual(rewriteStatus(job('queued'), NOW), { text: 'Đang xếp hàng 2 phút', hint: '', tone: 'wait' });
});

test('running under a minute', () => {
  assert.equal(rewriteStatus(job('running', { confirmed_at: NOW - 5000 }), NOW).text, 'Đang viết lại dưới 1 phút');
});

test('queued past 10 min gets honest hint, not error', () => {
  const s = rewriteStatus(job('queued', { confirmed_at: NOW - QUEUE_STALE_MS - 1 }), NOW);
  assert.equal(s.hint, STALE_HINT);
  assert.equal(s.tone, 'wait');
});

test('running past 10 min has no stale hint', () => {
  assert.equal(rewriteStatus(job('running', { confirmed_at: NOW - QUEUE_STALE_MS * 2 }), NOW).hint, '');
});

test('failed carries reason in detail text', () => {
  assert.deepEqual(rewriteStatus(job('failed', { error: 'model timeout' }), NOW),
    { text: 'Viết lại không thành công: model timeout', hint: '', tone: 'err' });
});

test('no job or unknown status gives null', () => {
  assert.equal(rewriteStatus(null, NOW), null);
  assert.equal(rewriteStatus({ status: 'weird' }, NOW), null);
});

test('row pill only for queued, running, failed', () => {
  assert.equal(rowPill(job('succeeded')), null);
  assert.equal(rowPill(null), null);
  assert.deepEqual(rowPill(job('running')), { label: 'Đang viết lại', tone: 'run' });
  assert.equal(rowPill(job('failed')).tone, 'err');
});

test('live version: active first, else newest failed', () => {
  const versions = [{ id: 2, rewrite: null }, { id: 1, rewrite: job('running') }];
  assert.equal(liveVersion(versions).id, 1);
  assert.equal(liveVersion([{ id: 3, rewrite: job('failed') }]).id, 3);
  assert.equal(liveVersion([{ id: 4, rewrite: job('succeeded') }]), null);
});

test('poll only when visible, connected and a job is active', () => {
  const versions = [{ rewrite: job('queued') }];
  assert.equal(hasActiveRewrite(versions), true);
  assert.equal(shouldPoll({ visible: true, connected: true, versions }), true);
  assert.equal(shouldPoll({ visible: false, connected: true, versions }), false);
  assert.equal(shouldPoll({ visible: true, connected: false, versions }), false);
  assert.equal(shouldPoll({ visible: true, connected: true, versions: [{ rewrite: job('failed') }] }), false);
});
