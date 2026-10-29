import test from 'node:test';
import assert from 'node:assert/strict';
import { hasActiveRewrite, liveVersion, rewriteStatus, rowPill, shouldPoll, QUEUE_STALE_MS, STALE_HINT, estimateTokens, parseMaxTokens, tokenLabel } from '../public/js/admin-skills-state.js';

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

test('token counter is the UTF-8 upper bound and reads max_tokens from the front matter only', () => {
  assert.equal(estimateTokens(''), 0);
  assert.equal(estimateTokens('abc'), 3);
  assert.equal(estimateTokens('ư'), 2);
  assert.equal(estimateTokens('Tiếng Việt'), Buffer.byteLength('Tiếng Việt'));
  assert.equal(parseMaxTokens('---\nname: x\nmax_tokens: 1200\n---\nmax_tokens: 5'), 1200);
  assert.equal(parseMaxTokens('---\r\nmax_tokens: 900\r\n---\r\nbody'), 900);
  assert.equal(parseMaxTokens('no front matter\nmax_tokens: 7'), null);
  assert.equal(parseMaxTokens('---\nname: x\n---\nbody'), null);
});

test('tokenLabel flags only a count above the cap and formats the label', () => {
  const doc = (n, cap) => `---\nmax_tokens: ${cap}\n---\n${'a'.repeat(n)}`;
  const within = tokenLabel(doc(10, 1200)), over = tokenLabel(doc(2000, 100));
  assert.equal(within.over, false);
  assert.equal(over.over, true);
  assert.match(within.text, /\/ 1\.200 token$/);
  assert.equal(tokenLabel('plain').cap, null);
  assert.doesNotMatch(tokenLabel('plain').text, /\//);
});
