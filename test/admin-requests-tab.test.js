// The admin "Góp ý" tab shows only the 10 newest requests; its badge is the number of rows shown.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');

test('the suggestions tab fetches only the 10 newest requests', () => {
  assert.match(source, /\/api\/admin\/requests\?limit=10/);
  assert.doesNotMatch(source, /\/api\/admin\/requests\?limit=300/);
  assert.match(source, /góp ý gần nhất/);
});

test('the suggestions badge is the number of rows actually displayed', () => {
  assert.match(source, /updateRequestBadge\(filtered\.length\)/);
  assert.doesNotMatch(source, /totalRequestCount/);
  assert.doesNotMatch(source, /refreshRequestBadge/);
  assert.doesNotMatch(source, /requests_pending\)\)/);
});
