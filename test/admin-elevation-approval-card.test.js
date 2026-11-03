// Elevation approval UI: the admin sees what/why/risk/evidence before approving; a high risk shows a strong
// warning, approval needs a typed reason plus a second confirm, and the batch only takes reviewed, unflagged items.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dashboard = readFileSync(new URL('../public/js/admin-dashboard.js', import.meta.url), 'utf8');
const detail = readFileSync(new URL('../public/js/admin-request.js', import.meta.url), 'utf8');

test('the requests tab loads the approval context on demand, never as part of the list', () => {
  assert.match(dashboard, /api\(`\/api\/admin\/ai-board\/requests\/\$\{id\}\/elevation-context`\)/);
  assert.match(dashboard, /data-act="elevation-context" data-rid="\$\{r\.id\}">Xem chi tiết để duyệt</);
  assert.match(dashboard, /const elevationContexts = new Map\(\)/);
  assert.match(dashboard, /if \(b\.dataset\.act === 'elevation-context'\) return loadElevationContext\(id\)/);
});

test('the card answers what/why/risk/evidence', () => {
  for (const heading of ['Duyệt cái gì', 'Vì sao', 'Rủi ro', 'Bằng chứng']) {
    assert.match(dashboard, new RegExp(`<b>${heading}</b>`), `dashboard card has ${heading}`);
  }
  assert.match(dashboard, /elevationPathTag\(row\)/);
  assert.match(dashboard, /có trong yêu cầu|chỉ có trong kế hoạch|không có trong yêu cầu\/plan/);
  assert.match(dashboard, /Các bước kế hoạch:/);
  assert.match(dashboard, /ELEVATION_REC_LABEL\[risk\.recommendation\]/);
  assert.match(dashboard, /risk\.questions\?\.length/);
  assert.match(dashboard, /evidence\.plan_hash_request/);
  assert.match(dashboard, /evidence\.requested_at/);
  assert.match(dashboard, /<a href="\/admin-request\.html\?id=\$\{r\.id\}" target="_top">mở trace<\/a>/);
});

test('high risk shows a strong warning and approval needs a typed reason plus a second confirm', () => {
  assert.match(dashboard, /risk\.level === 'high' \|\| ctx\.flags\?\.self_scope \? `<div role="alert"/);
  assert.match(dashboard, /CẢNH BÁO rủi ro cao/);
  assert.match(dashboard, /data-elevation-reason="\$\{r\.id\}" maxlength="1000" placeholder="Lý do duyệt \(bắt buộc\)"/);
  assert.match(dashboard, /if \(approve && typed\.length < 3\) \{[\s\S]{0,120}toast\('Ghi lý do duyệt trước khi duyệt\.', 'err'\)/);
  assert.match(dashboard, /const yes = await askConfirm\(\{[\s\S]{0,900}title: approve/);
  assert.match(dashboard, /if \(!yes\) return;/);
  assert.match(dashboard, /reason: \(approve \? typed : typed \|\| ELEVATION_REASON\[decision\]\)/);
});

test('the single approve is blocked for self-scope and never auto-approves', () => {
  assert.match(dashboard, /const elevationBlockReason = \(ctx\) => \{[\s\S]{0,160}ctx\.flags\?\.self_scope \? 'chạm vùng AI Board tự sửa — luôn chặn' : ''/);
  assert.match(dashboard, /\$\{blocked \? 'disabled ' : ''\}title="\$\{esc\(blocked \|\| 'Duyệt yêu cầu này'\)\}"/);
  assert.match(dashboard, /data-act="elevate" data-rid="\$\{r\.id\}" data-decision="approve">Duyệt</);
  assert.doesNotMatch(dashboard, /if \(r\.data\?\.recommendation === 'approve'\)/);
  assert.doesNotMatch(dashboard, /risk\.recommendation[^\n]*decideElevation/);
});

test('"Duyệt tất cả" only takes loaded, low/medium, inside-request items', () => {
  assert.match(dashboard, /const elevationBatchBlockReason = \(ctx\) => \{[\s\S]{0,520}ctx\.flags\?\.outside_request[\s\S]{0,140}ctx\.risk\?\.level === 'high'[\s\S]{0,140}ctx\.risk\?\.level === 'unknown'/);
  assert.match(dashboard, /const elevationBatchEligible = \(r\) => \{[\s\S]{0,220}return !elevationBatchBlockReason\(ctx\);/);
  assert.match(dashboard, /const eligible = pending\.filter\(elevationBatchEligible\)/);
  assert.match(dashboard, /data-act="elevate-all" data-ids="\$\{eligible\.map\(r => r\.id\)\.join\(','\)\}"\$\{eligible\.length \? '' : ' disabled'\}/);
  assert.match(dashboard, /data-elevation-reason="all" maxlength="1000" placeholder="Lý do duyệt cả lô \(bắt buộc\)"/);
  assert.match(dashboard, /if \(approve && list\.length > 1\) \{[\s\S]{0,400}elevationBatchBlockReason/, 'batch guards never block a single approval');
  assert.match(dashboard, /if \(approve && list\.length === 1 && elevationBlockReason\(contexts\[0\]\)\)/);
});

test('the request page repeats the card and keeps the same server endpoints', () => {
  assert.match(detail, /api\(`\/api\/admin\/ai-board\/requests\/\$\{REQUEST_ID\}\/elevation-context`\)/);
  assert.match(detail, /function elevationContextCard\(ctx\)/);
  for (const heading of ['Duyệt cái gì', 'Vì sao', 'Rủi ro', 'Bằng chứng']) {
    assert.match(detail, new RegExp(`>${heading}</div>`), `detail card has ${heading}`);
  }
  assert.match(detail, /id="elevation-reason" data-elevation-reason maxlength="1000" placeholder="Lý do duyệt \(bắt buộc\)"/);
  assert.match(detail, /data-action="elevate" data-decision="approve">Duyệt quyền</);
  assert.match(detail, /if \(approve && reason\.length < 3\)/);
  assert.match(detail, /CẢNH BÁO rủi ro cao/);
  assert.match(detail, /href="#ticket-trace">vết đầy đủ<\/a>/);
  assert.match(detail, /post\(`\/api\/admin\/ai-board\/requests\/\$\{REQUEST_ID\}\/elevate`/);
  assert.match(detail, /await askConfirm\(\{[\s\S]{0,400}Duyệt quyền cho kế hoạch này\?/);
  assert.match(detail, /if \(!yes\) return;/);
});

test('both pages escape every model/worker string before rendering', () => {
  // Scope, reasons, questions, titles and excerpts are untrusted: each goes through esc()/code().
  assert.match(dashboard, /risk\.reasons\.map\(x => `<li>\$\{esc\(x\)\}<\/li>`\)/);
  assert.match(dashboard, /risk\.questions\.map\(x => `<li>\$\{esc\(x\)\}<\/li>`\)/);
  assert.match(dashboard, /esc\(ctx\.request\.excerpt\)/);
  assert.match(detail, /esc\(ctx\.request\.excerpt\)/);
  assert.match(detail, /risk\.reasons\.map\(x => `<li>\$\{esc\(x\)\}<\/li>`\)/);
});
