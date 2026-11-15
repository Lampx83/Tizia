import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const detail = readFileSync(new URL('../public/js/admin-request.js', import.meta.url), 'utf8');

test('network approval card asks confirmation for both Duyệt and Từ chối', () => {
  const body = detail.slice(detail.indexOf('async function netDecide('), detail.indexOf('// Screenshots of the newest message'));
  assert.match(body, /const approve = decision === 'approved';\s*const yes = await askConfirm\(approve/);
  assert.match(body, /title: 'Từ chối yêu cầu mạng\?'[\s\S]*?danger: true/);
  assert.ok(body.indexOf('askConfirm(') < body.indexOf("post(`/api/admin/ai-board/network-requests/"), 'confirm before the POST');
});
