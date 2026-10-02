// Cache policy of the static frontend: admin scripts are always revalidated, so no hand-bumped ?v= token is needed.
import test from 'node:test';
import assert from 'node:assert/strict';

import { staticCacheControl } from '../server/static-cache.js';

test('admin scripts are always revalidated (ETag/304), on any path separator', () => {
  for (const file of ['/app/public/js/admin-request.js', 'C:\\app\\public\\js\\admin-dashboard.js']) {
    assert.equal(staticCacheControl(file), 'no-cache');
  }
});

test('everything else keeps the existing long-lived policy', () => {
  assert.match(staticCacheControl('/app/public/js/suggestion-fab.js'), /max-age=86400/);
  assert.match(staticCacheControl('/app/public/css/site.css'), /max-age=86400/);
  assert.match(staticCacheControl('/app/public/img/a.png'), /max-age=604800/);
  assert.equal(staticCacheControl('/app/public/manifest.webmanifest'), 'public, max-age=3600');
  assert.equal(staticCacheControl('/app/public/index.html'), null);
});

test('only admin-*.js under /js/ is affected, not look-alikes', () => {
  assert.match(staticCacheControl('/app/public/js/engine/admin-like.js'), /max-age=86400/);
  assert.match(staticCacheControl('/app/public/js/administrator.js'), /max-age=86400/);
  assert.match(staticCacheControl('/app/public/admin-request.html.js'), /max-age=86400/);
});
