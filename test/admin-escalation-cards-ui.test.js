// Escalation cards outside elevation: manifests + check registries in the Tools view, waiting tickets in the requests tab,
// network items on the request page. Source checks only, like the other admin UI tests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dashboard = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');
const detail = readFileSync(new URL('../public/js/admin-request.js', import.meta.url), 'utf8');

test('the Tools view shows manifest and check-registry cards with only the server-offered actions', () => {
  assert.match(dashboard, /api\('\/api\/admin\/ai-board\/check-registries'\)/);
  assert.match(dashboard, /hashSection\(HASH_KINDS\.registry, cr\.data\.registries\)/);
  assert.match(dashboard, /hashSection\(HASH_KINDS\.manifest, tm\.data\.manifests\)/);
  assert.match(dashboard, /option\.act === act && option\.available/, 'buttons follow the card options');
  assert.match(dashboard, /\/api\/admin\/ai-board\/\$\{kind\.path\}\/\$\{btn\.dataset\.hash\}\/\$\{btn\.dataset\.hashAct\}/);
  assert.match(dashboard, /const yes = await askConfirm\(\{[\s\S]{0,400}if \(!yes\) return;[\s\S]{0,80}btn\.disabled = true;/);
});

test('waiting tickets get a read-only card that points at the existing actions', () => {
  assert.match(dashboard, /n\.waiting, waitingPanel\(\)/);
  assert.match(dashboard, /aiTicketCache\.filter\(t => t\.card && !elevating\.has\(t\.source_request_id\)\)/);
  assert.match(dashboard, /data-act="detail" data-rid="\$\{t\.source_request_id\}">Mở trang yêu cầu</);
  assert.doesNotMatch(dashboard.slice(dashboard.indexOf('function waitingPanel'), dashboard.indexOf('function renderRequests')), /method: 'POST'/);
});

test('the Duyệt tab renders the network item as a card with approve and reject', () => {
  const tab = readFileSync(new URL('../public/js/admin-approvals.js', import.meta.url), 'utf8');
  assert.match(tab, /escalationCard\(item\.card, \{ tag, extra: \{ evidence:/);
  assert.match(tab, /data-act="net-approve" data-id="\$\{id\}"[^>]*>Duyệt</);
  assert.match(tab, /data-act="net-reject" data-id="\$\{id\}"[^>]*>Từ chối</);
  assert.match(tab, /esc\(NET_WARNING\)/);
  assert.doesNotMatch(detail, /net-approve|net-reject/, 'the request page only points at the tab');
});
