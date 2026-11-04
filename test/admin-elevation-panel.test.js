// Elevation UI: the admin sees the pending scope (path + level + why) and decides per request or for the whole batch.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dashboard = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');
const detail = readFileSync(new URL('../public/js/admin-request.js', import.meta.url), 'utf8');

test('the requests tab lists only pending elevations with path, level and the reason', () => {
  assert.match(dashboard, /const pending = rows\.filter\(r => r\.elevation === 'requested'\)/);
  assert.match(dashboard, /\$\{elevationPanel\(filtered\)\}/, 'panel follows the visible rows');
  assert.match(dashboard, /elevation_scope \|\| \[\]/, 'one scope entry per file');
  assert.match(dashboard, /mức \$\{esc\(ELEVATION_LEVEL_LABEL\[item\.level\] \|\| item\.level\)\}/);
  assert.match(dashboard, /\$\{r\.elevation_reason \?/, 'the reason the worker gave stays visible');
  assert.match(dashboard, /data-act="elevate" data-rid="\$\{r\.id\}" data-decision="approve">Duyệt</);
  assert.match(dashboard, /data-act="elevate" data-rid="\$\{r\.id\}" data-decision="reject">Từ chối</);
  assert.doesNotMatch(dashboard, /elevation === 'approved'.*data-act="elevate"/, 'only requested ones get buttons');
});

test('"Duyệt tất cả" batches only reviewed, unflagged pending ids on screen', () => {
  assert.match(dashboard, /const eligible = pending\.filter\(elevationBatchEligible\)/);
  assert.match(dashboard, /data-act="elevate-all" data-ids="\$\{eligible\.map\(r => r\.id\)\.join\(','\)\}"/);
  assert.match(dashboard, /String\(b\.dataset\.ids \|\| ''\)\.split\(','\)/, 'ids come from the rendered button');
  assert.match(dashboard, /\/api\/admin\/ai-board\/requests\/0\/elevate-batch/);
  assert.match(dashboard, /list\.length === 1[\s\S]{0,120}\/elevate`/);
});

test('every decision goes through askConfirm, posts a reason and reloads the list', () => {
  assert.match(dashboard, /await askConfirm\(\{[\s\S]{0,900}title: approve/);
  assert.match(dashboard, /reason: \(approve \? typed : typed \|\| ELEVATION_REASON\[decision\]\)/, 'the server requires a reason');
  assert.match(dashboard, /await loadRequests\(\);/, 'refresh after the action');
  assert.match(dashboard, /if \(!r\.ok\) return toast\(/, 'failures surface through the existing toast');
});

test('the request page shows the pending scope and decides it in place', () => {
  assert.match(detail, /const e = t\.root\?\.elevation_detail;/);
  assert.match(detail, /if \(!e \|\| !e\.state \|\| e\.state === 'none'\) return '';/, 'only a real elevation state renders a block');
  assert.match(detail, /\(e\.scope \|\| \[\]\)\.map/);
  assert.match(detail, /data-action="elevate" data-decision="approve">Duyệt quyền</);
  assert.match(detail, /\$\{elevationBlock\(t\)\}/, 'rendered inside the AI board summary');
  assert.match(detail, /action === 'elevate'\) return decideElevation\(btn\)/);
  assert.match(detail, /post\(`\/api\/admin\/ai-board\/requests\/\$\{REQUEST_ID\}\/elevate`/);
  assert.match(detail, /await askConfirm\(\{[\s\S]{0,300}Duyệt quyền cho kế hoạch này\?/);
});
