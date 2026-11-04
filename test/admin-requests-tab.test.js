// The admin "Góp ý" tab shows only the 10 newest requests; its badge is the number of rows shown.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');

test('the suggestions tab fetches only the 10 newest requests', () => {
  assert.match(source, /\/api\/admin\/ai-board\/requests\?limit=10/);
  assert.doesNotMatch(source, /\/api\/admin\/requests\?limit=300/);
  assert.match(source, /aria-label="Danh sách yêu cầu"/, 'the tab still shows the request table');
});

test('the suggestions badge is the number of rows actually displayed', () => {
  assert.match(source, /updateRequestBadge\(filtered\.length\)/);
  assert.doesNotMatch(source, /totalRequestCount/);
  assert.doesNotMatch(source, /refreshRequestBadge/);
  assert.doesNotMatch(source, /requests_pending\)\)/);
});

test('the row number pairs the displayed position with the real request id', () => {
  assert.match(source, /<td title="Vị trí \$\{index \+ 1\} trong danh sách · yêu cầu #\$\{r\.id\}">/);
  assert.match(source, /<div>#\$\{index \+ 1\}<\/div>/);
  assert.match(source, /<div style="font-size:11px;opacity:\.55;white-space:nowrap">ID \$\{r\.id\}<\/div>/);
  assert.doesNotMatch(source, /<td>\$\{r\.id\}<\/td>/);
  assert.match(source, /data-act="detail" data-rid="\$\{r\.id\}"/, 'actions use the DB id');
});
