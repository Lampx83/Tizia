import test from 'node:test';
import assert from 'node:assert/strict';
import { hasActiveRewrite, liveVersion, rewriteStatus, rowPill, shouldPoll, QUEUE_STALE_MS, STALE_HINT, estimateTokens, parseMaxTokens, tokenLabel, tokenShareText, errorText, toastMs } from '../public/js/admin-skills-state.js';

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

test('server count for the same text replaces the estimate; other text keeps it', () => {
  const text = 'Xin chào';
  assert.equal(tokenLabel(text, 3).count, 3);
  assert.equal(tokenLabel(text).count, estimateTokens(text));
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

test('tokenShareText: percent of each node budget plus the gap to the UTF-8 estimate', () => {
  const budgets = { intake: { max_tokens_per_prompt: 2000 }, plan: { max_tokens_per_prompt: 1000 }, execute: { max_tokens_per_prompt: 4000 }, verdict: { max_tokens_per_prompt: 800 } };
  assert.equal(tokenShareText(320, budgets), '16% ngân sách nhận yêu cầu · 32% ngân sách lập plan · 8% ngân sách viết code · 40% ngân sách kết luận');
  // Real Qwen count below the byte upper bound; the gap is stated, never folded into the count.
  assert.equal(tokenShareText(320, budgets, 900),
    '16% ngân sách nhận yêu cầu · 32% ngân sách lập plan · 8% ngân sách viết code · 40% ngân sách kết luận · ít hơn 580 token so với ước lượng UTF-8');
  assert.match(tokenShareText(0, budgets, 4), /0% ngân sách nhận yêu cầu .*ít hơn 4 token/);
  assert.ok(tokenShareText(1200, budgets, 900).includes('nhiều hơn 300 token so với ước lượng UTF-8'));
  assert.ok(tokenShareText(900, budgets, 900).includes('khớp ước lượng UTF-8'));
  assert.equal(tokenShareText(null, budgets, 900), '');
  assert.equal(tokenShareText(10, {}), '');
});

test('errorText maps known server codes to Vietnamese and never shows English server text', () => {
  assert.match(errorText({ data: { error: 'version_busy', message: 'Version is active or being rewritten' } }, 'x'), /đang được dùng/);
  assert.equal(errorText({ data: { message: 'Version was rejected' } }, 'Thử lại sau.'), 'Thử lại sau.');
  assert.equal(errorText({ data: { message: 'Nội dung không phù hợp để lưu.' } }, 'x'), 'Nội dung không phù hợp để lưu.');
  assert.equal(errorText(undefined, 'fb'), 'fb');
});

test('toastMs keeps errors and long messages on screen longer, capped at 10 s', () => {
  assert.equal(toastMs('Đã lưu.', 'ok'), 2400);
  assert.ok(toastMs('Đã lưu.', 'err') >= 6000);
  assert.ok(toastMs('x'.repeat(100), 'ok') > 2400);
  assert.equal(toastMs('x'.repeat(500), 'err'), 10000);
});
