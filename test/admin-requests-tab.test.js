// The admin "Góp ý" tab shows only the 10 newest requests; its badge counts all requests.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');

test('the suggestions tab fetches only the 10 newest requests', () => {
  assert.match(source, /\/api\/admin\/requests\?limit=10/);
  assert.doesNotMatch(source, /\/api\/admin\/requests\?limit=300/);
  assert.match(source, /góp ý gần nhất trong/);
});

test('the suggestions badge counts all requests, not only pending ones', () => {
  assert.match(source, /totalRequestCount = Number\(c\.data\?\.requests\)/);
  assert.match(source, /updateRequestBadge\(totalRequestCount\)/);
  assert.doesNotMatch(source, /updateRequestBadge\(r\.data\.requests_pending\)/);
  assert.doesNotMatch(source, /updateRequestBadge\(ov\.data\.requests_pending\)/);
});
