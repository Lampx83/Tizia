import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { approvalCounts, renderNetItem, section, approvalsNotice, netTitle } from '../public/js/admin-approvals.js';

const tag = (tone, label) => `<i>${label}</i>`;
const escalationCard = (card, { extra, buttons }) => `<dl>${extra.evidence}${extra.risk}${buttons}</dl>`;

test('counts add elevation, waiting tickets not already elevating, net and db', () => {
  const n = approvalCounts({
    requests: [{ id: 1, elevation: 'requested' }, { id: 2, elevation: 'approved' }],
    tickets: [{ source_request_id: 1, card: {} }, { source_request_id: 3, card: {} }, { source_request_id: 4 }],
    netCounts: { 5: 2, 6: '1' }, dbItems: [{ id: 9 }],
  });
  assert.deepEqual(n, { elevation: 1, waiting: 1, net: 3, db: 1, total: 6 });
  assert.equal(approvalCounts().total, 0);
});

test('section hides when empty and escapes the title', () => {
  assert.equal(section('x', 'T', 0, ''), '');
  assert.match(section('x', '<T>', 2, '<p>b</p>', 'h'), /&lt;T&gt;[\s\S]*<span class="pill">2<\/span>[\s\S]*<p>b<\/p>/);
});

test('notice is empty at zero and links to the tab in the top frame', () => {
  assert.equal(approvalsNotice(0), '');
  assert.match(approvalsNotice(3), /<b>3<\/b>[\s\S]*href="#approvals" target="_top"/);
});

test('net item card escapes, keeps ids and posts through approve/reject buttons', () => {
  const item = { id: 'n1', kind: 'package', name: '<evil>', version_range: '^1', metadata: { license: 'MIT' }, card: {} };
  const html = renderNetItem({ item, request_id: 7, title: 'A & B' }, { reason: 'q"' }, { tag, escalationCard });
  assert.match(html, /&lt;evil&gt;@\^1/);
  assert.match(html, /A &amp; B/);
  assert.match(html, /data-act="net-approve" data-id="n1" data-rid="7"/);
  assert.match(html, /data-act="net-reject"/);
  assert.match(html, /value="q&quot;"/);
  assert.equal(netTitle({ kind: 'url', url: 'https://a' }), 'https://a');
});

test('Duyệt tab is registered, badged, and the Góp ý tab only points at it', () => {
  const dash = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');
  assert.match(dash, /approvals:\s+\{ label:'Duyệt', load: loadRequests, badge: \(\) => approvalBadgeCount \}/);
  assert.match(dash, /approvalsNotice\(approvalCounts\(approvalInput\(\)\)\.total\)/);
  assert.match(dash, /split\('\/'\)\[0\]/, 'deep link hash keeps the tab key');
  assert.match(dash, /dbDecisionPath\(item, approve \? 'approve' : 'reject'\)/);
  assert.match(dash, /too_large_to_approve: 'Thay đổi quá lớn để duyệt an toàn; chỉ có thể từ chối\.'/);
  assert.match(dash, /item\.clipped === true/);
});
