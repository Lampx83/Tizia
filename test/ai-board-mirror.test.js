import test from 'node:test';
import assert from 'node:assert/strict';
import { renderGateReview, renderRiskAndChecks, renderDbApproval, renderDbApprovalState, dbDecisionBody, dbDecisionPath, renderDbStatus, diffBlock, sortFindings, sqlBlock } from '../public/js/ai-board-mirror.js';

const run = (gates) => ({ id: 7, gates });
const g = (gate, evidence) => ({ gate, evidence });

test('gate review lists findings high first, escapes text, flags truncation', () => {
  const html = renderGateReview({ runs: [run([g(4, { adversarial_review: { verdict: 'concerns', truncated: true,
    findings: [{ severity: 'low', issue: 'nit' }, { severity: 'high', issue: '<script>x</script>' }] }, issues: ['a&b'], checks: ['scope'], change_class: 'one_way' })])] });
  assert.ok(html.indexOf('Cao') < html.indexOf('Thấp'));
  assert.match(html, /Có lo ngại/);
  assert.match(html, /Kết quả bị cắt ngắn/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /a&amp;b/);
  assert.match(html, /Một chiều/);
});

test('gate review is empty without evidence, tolerates string evidence', () => {
  assert.equal(renderGateReview({ runs: [run([g(3, {})])] }), '');
  assert.equal(renderGateReview({}), '');
  assert.match(renderGateReview({ runs: [run([{ gate: 4, evidence: '{"checks":["x"]}' }])] }), /<code>x<\/code>/);
  assert.equal(renderGateReview({ runs: [run([{ gate: 4, evidence: '{bad' }])] }), '');
});

test('sortFindings drops unknown severity', () => {
  assert.deepEqual(sortFindings([{ severity: 'x' }, { severity: 'medium', issue: 'm' }]).map((f) => f.issue), ['m']);
});

test('risk block shows level, signals and suspect checks', () => {
  const html = renderRiskAndChecks({ runs: [run([g(5, { functional: { needs_review: true, check_suspect: ['oracle <b>'] } }),
    g(5.5, { risk_level: 'high', risk_signals: [{ name: 'schema', tier: 'hard', detail: 'd' }] })])] });
  assert.match(html, /Cao/);
  assert.match(html, /<code>schema<\/code>/);
  assert.match(html, /Cần người xem/);
  assert.match(html, /oracle &lt;b&gt;/);
  assert.equal(renderRiskAndChecks({ runs: [run([g(5, { functional: {} })])] }), '');
});

test('sql block escapes and caps', () => {
  assert.match(sqlBlock('SELECT "<a>"'), /SELECT &quot;&lt;a&gt;&quot;/);
  assert.match(sqlBlock('x'.repeat(20001)), /Đã cắt/);
});

test('reject needs a reason, approve does not', () => {
  assert.equal(dbDecisionBody('reject', '  '), null);
  assert.deepEqual(dbDecisionBody('reject', ' vì sao '), { reason: 'vì sao' });
  assert.deepEqual(dbDecisionBody('approve', ''), {});
});

test('db card: reject disabled until reason, busy disables both, contract fields shown', () => {
  const item = { id: 56, request_id: 12, title: 'Ghi chú', status: 'pending', sql: 'CREATE TABLE t(a int)', files: ['server/db.js'],
    sandbox: { status: 'passed', output: 'ok', schema_diff: { added_tables: ['t'], added_columns: { t: ['a'] } }, checks: [{ ok: true }], tests: [{ rc: 0 }], error: null },
    candidate: { branch: 'ai-board/x', head_sha: 'a'.repeat(40) } };
  const idle = renderDbApproval(item, { reason: '' });
  assert.match(idle, /data-action="db-reject"[^>]* disabled/);
  assert.doesNotMatch(idle, /data-action="db-approve"[^>]* disabled/);
  assert.match(idle, /Chạy thử đạt/);
  assert.match(idle, /Thêm bảng <code>t<\/code>/);
  assert.match(idle, /server\/db\.js/);
  assert.match(idle, /admin-request\.html\?id=12/);
  assert.match(idle, /<code>aaaaaaa<\/code>/);
  assert.doesNotMatch(renderDbApproval(item, { reason: 'x' }), /data-action="db-reject"[^>]* disabled/);
  assert.match(renderDbApproval(item, { reason: 'x', busy: true }), /data-action="db-approve"[^>]* disabled/);
  assert.match(renderDbApproval({ ...item, sandbox: { status: 'failed', error: 'boom <b>' } }, {}), /Chạy thử lỗi[\s\S]*boom &lt;b&gt;/);
  assert.equal(renderDbApproval(null), '');
});

test('approve pins head_sha; endpoint path is request scoped', () => {
  const item = { id: 56, request_id: 12, candidate: { head_sha: 'b'.repeat(40) } };
  assert.deepEqual(dbDecisionBody('approve', '', item), { head_sha: 'b'.repeat(40) });
  assert.deepEqual(dbDecisionBody('approve', '', { id: 1 }), {});
  assert.equal(dbDecisionPath(item, 'reject'), '/api/admin/ai-board/requests/12/db-approvals/56/reject');
});

test('read-only db status labels states, skips superseded, links only http PRs', () => {
  const html = renderDbStatus([{ status: 'published', pull_request: { number: 9, url: 'https://x/pr/9' } }, { status: 'superseded' },
    { status: 'rejected', decision: { reason: 'sai <i>' } }, { status: 'publish_failed', publish_error: 'push lỗi' }, { status: 'published', pull_request: { number: 1, url: 'javascript:x' } }]);
  assert.match(html, /Đã mở PR/);
  assert.match(html, /href="https:\/\/x\/pr\/9"/);
  assert.doesNotMatch(html, /javascript:/);
  assert.match(html, /Lý do: sai &lt;i&gt;/);
  assert.match(html, /push lỗi[\s\S]*Mở tab Duyệt/);
  assert.doesNotMatch(html, /bị bản mới thay/);
  assert.equal(renderDbStatus([]), '');
  assert.equal(renderDbStatus([{ status: 'superseded' }]), '');
});

test('db state shell: loading, error, empty', () => {
  assert.match(renderDbApprovalState({ loading: true }), /Đang tải/);
  assert.match(renderDbApprovalState({ error: 'x<' }), /x&lt;/);
  assert.equal(renderDbApprovalState({}), '');
});

test('db card by kind: backend hides SQL and sandbox, db hides diff, both shows each', () => {
  const base = { id: 1, request_id: 2, files: ['server/a.js', 'server/m.sql'], sql: '', diff: 'diff --git a/server/a.js\n+<script>x</script>', sandbox: { status: null, output: 'sandbox không có' } };
  const backend = renderDbApproval({ ...base, kind: 'backend' }, {});
  assert.doesNotMatch(backend, /SQL \(chỉ đọc\)|Chạy thử trên sandbox/);
  assert.match(backend, /Diff file máy chủ/);
  assert.match(backend, /&lt;script&gt;x&lt;\/script&gt;/);
  assert.doesNotMatch(backend, /<script>/);
  const db = renderDbApproval({ ...base, kind: 'db', sql: 'CREATE TABLE t(a int)', diff: '', sandbox: { status: 'passed' } }, {});
  assert.match(db, /SQL \(chỉ đọc\)/);
  assert.doesNotMatch(db, /Diff file máy chủ \(ngoài/);
  const both = renderDbApproval({ ...base, kind: 'both', sql: 'CREATE TABLE t(a int)', sandbox: { status: 'passed' } }, {});
  assert.match(both, /SQL \(chỉ đọc\)[\s\S]*Diff file máy chủ/);
  assert.match(both, /Thay đổi CSDL và máy chủ/);
});

test('attention tables are highlighted and escaped; absent means no banner', () => {
  const item = { id: 1, request_id: 2, kind: 'db', sql: 's', attention: ['users', '<x>'], sandbox: { status: 'passed' } };
  assert.match(renderDbApproval(item, {}), /class="attention" role="alert"[\s\S]*<code>users<\/code> <code>&lt;x&gt;<\/code>/);
  assert.doesNotMatch(renderDbApproval({ ...item, attention: [] }, {}), /class="attention"/);
});

test('diff block clips at 20000 chars and handles empty', () => {
  assert.match(diffBlock('x'.repeat(20001)), /Đã cắt/);
  assert.match(diffBlock(''), /Không có diff/);
});

test('clipped item disables approve, shows the notice, keeps reject with a reason', () => {
  const item = { id: 3, request_id: 4, kind: 'backend', diff: 'd', sandbox: { status: null }, clipped: true };
  const html = renderDbApproval(item, { reason: 'quá lớn' });
  assert.match(html, /data-clipped[\s\S]*Thay đổi quá lớn để duyệt an toàn; chỉ có thể từ chối/);
  assert.match(html, /data-action="db-approve"[^>]* disabled/);
  assert.doesNotMatch(html, /data-action="db-reject"[^>]* disabled/);
  assert.doesNotMatch(renderDbApproval({ ...item, clipped: false }, {}), /data-clipped|data-action="db-approve"[^>]* disabled/);
});

test('privileged imports are listed escaped under a highlighted title, omitted when empty', () => {
  const item = { id: 5, request_id: 6, kind: 'backend', diff: 'd', sandbox: {}, privileged_imports: ['server/contexts/t/q.js: ../../db.js -> server/db.js', '<b>x</b>'] };
  const html = renderDbApproval(item, {});
  assert.match(html, /data-imports[\s\S]*Import đặc quyền \(db\.js, context khác\)[\s\S]*<code>server\/contexts\/t\/q\.js: \.\.\/\.\.\/db\.js -&gt; server\/db\.js<\/code>/);
  assert.match(html, /&lt;b&gt;x&lt;\/b&gt;/);
  assert.doesNotMatch(renderDbApproval({ ...item, privileged_imports: [] }, {}), /data-imports/);
  assert.doesNotMatch(renderDbApproval({ ...item, privileged_imports: undefined }, {}), /data-imports/);
});
