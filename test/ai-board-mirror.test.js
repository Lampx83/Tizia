import test from 'node:test';
import assert from 'node:assert/strict';
import { renderGateReview, renderRiskAndChecks, renderDbApproval, renderDbApprovalState, dbDecisionBody, sortFindings, sqlBlock } from '../public/js/ai-board-mirror.js';

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

test('db card: reject disabled until reason, busy disables both, files and sandbox shown', () => {
  const item = { id: 'd1', sql: 'ALTER TABLE t ADD c int', sandbox: { status: 'passed', output: 'ok' }, files: ['server/db.js'] };
  const idle = renderDbApproval(item, { reason: '' });
  assert.match(idle, /data-action="db-reject"[^>]* disabled/);
  assert.doesNotMatch(idle, /data-action="db-approve"[^>]* disabled/);
  assert.match(idle, /Chạy thử đạt/);
  assert.match(idle, /server\/db\.js/);
  assert.doesNotMatch(renderDbApproval(item, { reason: 'x' }), /data-action="db-reject"[^>]* disabled/);
  assert.match(renderDbApproval(item, { reason: 'x', busy: true }), /data-action="db-approve"[^>]* disabled/);
  assert.match(renderDbApproval({ id: 'd2', sql: 's' }, {}), /Chưa chạy thử/);
  assert.equal(renderDbApproval(null), '');
});

test('db state shell: loading, error, empty', () => {
  assert.match(renderDbApprovalState({ loading: true }), /Đang tải/);
  assert.match(renderDbApprovalState({ error: 'x<' }), /x&lt;/);
  assert.equal(renderDbApprovalState({}), '');
});
