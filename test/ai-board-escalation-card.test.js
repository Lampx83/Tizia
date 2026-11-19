// Escalation card builder: pure, no DB, no model. Five rows per kind, risk table, and the narrowed-scope check.
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildElevationContext } from '../server/ai-board/elevation-context.js';
import {
  elevationCard, manifestCard, narrowScope, networkCard, registryCard, scopeRisk, waitingCard,
} from '../server/ai-board/services/escalation-card.js';

const CONTENT = 'server/contexts/content/x.js';
const CORE = 'server/index.js';
const keys = (card) => card.options.map((o) => [o.key, o.label, o.available]);
const shape = (card) => {
  assert.equal(typeof card.action, 'string');
  assert.ok(card.action.length > 0);
  assert.equal(typeof card.why, 'string');
  assert.ok(Array.isArray(card.evidence));
  assert.equal(typeof card.risk.reversible, 'boolean');
  assert.ok(['low', 'medium', 'high'].includes(card.risk.level));
  assert.deepEqual(card.options.map((o) => o.label), ['duyệt', 'từ chối', 'sửa rồi duyệt']);
};

const context = (scope, extra = {}) => buildElevationContext({
  request: { id: 7, title: `Sửa ${CONTENT}`, detail: 'Đổi lời chào trong dịch vụ nội dung.' },
  root: { elevation: 'requested', plan_hash: 'hash-a' },
  asked: { created_at: 1, actor_type: 'worker', detail: { scope, reason: 'Cần sửa dịch vụ dùng chung.', plan_hash: 'hash-a', plan_revision: 2 } },
  scope,
  plan: { source: 'request_time', plan_hash: 'hash-a', revision: 2, tier: null, goal: 'Cập nhật lời chào',
    steps: [{ order: 1, title: 'Sửa dịch vụ nội dung', paths: [CONTENT], capability: 'content.write' }] },
  ...extra,
});

test('scope risk: core, migration and money paths are irreversible; protected high; surface reversible', () => {
  assert.deepEqual(scopeRisk([{ path: CORE, level: 'core' }]).reversible, false);
  assert.equal(scopeRisk([{ path: 'server/ai-board/migrations/060-x.sql', level: 'protected' }]).reversible, false);
  assert.match(scopeRisk([{ path: 'server/contexts/payment/index.js', level: 'protected' }]).note, /đường tiền/);
  assert.deepEqual([scopeRisk([{ path: CONTENT, level: 'protected' }]).level, scopeRisk([{ path: CONTENT, level: 'protected' }]).reversible], ['high', true]);
  assert.deepEqual(scopeRisk([{ path: 'public/a.html', level: 'surface' }]), { reversible: true, level: 'low', note: 'Chỉ bề mặt giao diện; hoàn tác được.' });
  assert.match(scopeRisk([{ path: 'server/ai-board/x.js', level: 'protected' }]).note, /không bao giờ được cấp/);
});

test('elevation card names the paths, plan steps, the triggering level and the request quote', () => {
  const card = elevationCard(context([{ path: CONTENT, level: 'protected' }]),
    { grounding: [{ file: CONTENT, line: 12, quote: 'export const greeting' }] });
  shape(card);
  assert.equal(card.kind, 'elevation');
  assert.match(card.action, /server\/contexts\/content\/x\.js \(bảo vệ\)/);
  assert.match(card.action, /Bước 1: Sửa dịch vụ nội dung → ghi server\/contexts\/content\/x\.js/);
  assert.match(card.why, /Path mức bảo vệ \(protected\) cần quản trị viên cấp quyền/);
  assert.match(card.why, /Lý do worker: Cần sửa dịch vụ dùng chung\./);
  assert.ok(card.evidence.some((e) => e.source === 'Yêu cầu #7' && /Đổi lời chào/.test(e.quote)));
  assert.ok(card.evidence.some((e) => e.source === `${CONTENT}:12` && e.quote === 'export const greeting'));
  assert.ok(card.evidence.some((e) => e.source === 'plan' && /hash hash-a · revision 2/.test(e.quote)));
  assert.deepEqual(keys(card), [['approve', 'duyệt', true], ['reject', 'từ chối', true], ['edit', 'sửa rồi duyệt', false]]);
});

test('elevation card offers a narrower approval only when something can be narrowed', () => {
  const two = elevationCard(context([{ path: CONTENT, level: 'protected' }, { path: CORE, level: 'core' }]));
  assert.deepEqual(keys(two)[2], ['edit', 'sửa rồi duyệt', true]);
  assert.equal(two.risk.reversible, false);
  const core = elevationCard(context([{ path: CORE, level: 'core' }]));
  assert.equal(core.options[2].available, true, 'core can be lowered to protected');
});

test('self-scope blocks approve and narrowing; decided elevations offer nothing', () => {
  const self = elevationCard(context([{ path: 'server/ai-board/x.js', level: 'protected' }, { path: CONTENT, level: 'protected' }]));
  assert.deepEqual(keys(self), [['approve', 'duyệt', false], ['reject', 'từ chối', true], ['edit', 'sửa rồi duyệt', false]]);
  assert.match(self.why, /luôn chặn/);
  const done = elevationCard(context([{ path: CONTENT, level: 'protected' }], { root: { elevation: 'approved' } }));
  assert.ok(done.options.every((o) => !o.available));
});

test('outside-request flags raise a low risk to at least medium', () => {
  const ctx = buildElevationContext({ request: { id: 1, title: 'x', detail: 'y' }, root: { elevation: 'requested' },
    asked: null, scope: [{ path: 'public/zzz.html', level: 'surface' }] });
  assert.equal(ctx.flags.outside_request, true);
  assert.equal(elevationCard(ctx).risk.level, 'medium');
});

test('network card: package with install scripts is irreversible, narrowing is never offered', () => {
  const pkg = networkCard({ id: 3, kind: 'package', call_id: 'pkg:left-pad', name: 'left-pad', version_range: '^1.3.0', status: 'pending',
    reason: 'thiếu module left-pad', metadata: { version: '1.3.0', license: 'MIT', install_scripts: ['postinstall'], transitive_count: 0 } });
  shape(pkg);
  assert.match(pkg.action, /left-pad@\^1\.3\.0/);
  assert.match(pkg.why, /network_request/);
  assert.deepEqual([pkg.risk.reversible, pkg.risk.level], [false, 'high']);
  assert.ok(pkg.evidence.some((e) => e.source === 'lý do của model' && e.quote === 'thiếu module left-pad'));
  assert.ok(pkg.evidence.some((e) => e.source === 'script cài đặt' && e.quote === 'postinstall'));
  assert.deepEqual(keys(pkg), [['approve', 'duyệt', true], ['reject', 'từ chối', true], ['edit', 'sửa rồi duyệt', false]]);
  assert.match(pkg.options[2].note, /call_id/);
  const url = networkCard({ id: 4, kind: 'fetch_url', call_id: 'net:ab', url: 'https://api.example.org/v1/x', status: 'approved', reason: 'docs' });
  assert.match(url.action, /api\.example\.org/);
  assert.equal(url.risk.reversible, false);
  assert.ok(url.options.every((o) => !o.available), 'decided items are final');
});

test('manifest and registry cards: approve when pending, reject = revoke when approved, never edit', () => {
  const tools = [{ name: 'read_file', effect: 'read', max_arg_bytes: 1, max_output_chars: 2, max_seconds: 3 },
    { name: 'edit_file', effect: 'draft_write', max_arg_bytes: 1, max_output_chars: 2, max_seconds: 3 }];
  const pending = manifestCard({ manifest_hash: 'a'.repeat(64), version: 5, status: 'pending', reported_by: 'w1', tools });
  shape(pending);
  assert.match(pending.action, /read_file \(read\), edit_file \(draft_write\)/);
  assert.deepEqual([pending.risk.reversible, pending.risk.level], [true, 'medium']);
  assert.deepEqual(keys(pending), [['approve', 'duyệt', true], ['reject', 'từ chối', false], ['edit', 'sửa rồi duyệt', false]]);
  assert.match(pending.options[1].note, /không có thao tác từ chối/);
  assert.match(pending.options[2].note, /Băm cố định nội dung/);
  const approved = registryCard({ registry_hash: 'b'.repeat(64), version: 1, status: 'approved', reported_by: 'w1', primitives: ['dom_text', 'http_status'] });
  shape(approved);
  assert.match(approved.action, /dom_text, http_status/);
  assert.deepEqual(approved.options.map((o) => [o.available, o.act]), [[false, 'approve'], [true, 'revoke'], [false, undefined]]);
  const revoked = registryCard({ registry_hash: 'c'.repeat(64), version: 1, status: 'revoked', primitives: [] });
  assert.ok(revoked.options.every((o) => !o.available));
});

test('waiting card: phase rule, existing release action, intake labels; null when nothing waits', () => {
  const budget = waitingCard({ id: 9, source_request_id: 4, status: 'waiting_admin', phase: 'budget_exhausted',
    internal_reason: 'run_budget_exhausted', public_note: 'Yêu cầu đang chờ quản trị viên xem xét.', open_alerts: 0 });
  shape(budget);
  assert.match(budget.why, /budget_exhausted/);
  assert.match(budget.action, /Gia hạn ngân sách/);
  assert.deepEqual(keys(budget), [['approve', 'duyệt', true], ['reject', 'từ chối', true], ['edit', 'sửa rồi duyệt', false]]);
  const unfit = waitingCard({ id: 10, status: 'waiting_admin', phase: 'plan_unfit' });
  assert.equal(unfit.options[0].available, false, 'no release mechanic is invented');
  const held = waitingCard({ id: 11, source_request_id: 5, status: 'human_owned', phase: 'intake' },
    { tags: ['guard:human_review', 'guard:money'], flagEvent: 'intake_guard: money → human_review' });
  assert.equal(held.kind, 'intake_review');
  assert.match(held.why, /money \(nhãn tiền\/lạc đề\)/);
  assert.equal(held.risk.level, 'high');
  assert.ok(held.evidence.some((e) => e.source === 'intake_guard'));
  assert.equal(waitingCard({ id: 12, status: 'running', phase: 'executing' }, { tags: ['guard:human_review'] }), null);
  assert.equal(waitingCard({ id: 13, status: 'queued' }), null);
});

test('narrowScope keeps a subset, may lower a level, and refuses widening', () => {
  const asked = [{ path: CONTENT, level: 'protected' }, { path: CORE, level: 'core' }];
  assert.deepEqual(narrowScope(asked, [CONTENT]), [{ path: CONTENT, level: 'protected' }]);
  assert.deepEqual(narrowScope(asked, [{ path: CORE, level: 'protected' }]), [{ path: CORE, level: 'protected' }]);
  assert.throws(() => narrowScope(asked, []), { code: 'elevation_scope_empty' });
  assert.throws(() => narrowScope(asked, ['public/new.html']), { code: 'elevation_scope_widened' });
  assert.throws(() => narrowScope(asked, [{ path: CONTENT, level: 'core' }]), { code: 'elevation_level_raised' });
  assert.deepEqual(narrowScope([{ path: 'public/a.html', level: 'surface' }, ...asked], ['public/a.html', CONTENT]),
    [{ path: 'public/a.html', level: 'surface' }, { path: CONTENT, level: 'protected' }]);
  assert.throws(() => narrowScope(asked, [{ path: CONTENT, level: 'bogus' }]), { code: 'elevation_level_raised' });
});
