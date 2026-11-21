// Decision ledger on the admin side: clamp, plan carry, approvals card rows, request-page renderer.
import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanLedger, ledgerRows } from '../server/ai-board/ledger.js';
import { elevationCard } from '../server/ai-board/services/escalation-card.js';
import { buildElevationContext } from '../server/ai-board/elevation-context.js';
import { renderLedger, stepLink, gate3Decisions } from '../public/js/ai-board-ledger.js';

process.env.AI_BOARD_REQUESTER_FULLSTACK_DB = '1';
const { validatePlan } = await import('../server/ai-board/security/policy.js');

const ROW = { decision: 'new_file', target: 'public/ghi-chu.html', gate: 1,
  evidence: [{ step_id: 3, file: 'server/contexts/teacher/index.js', lines: '10-20' }, { step_id: 4, tool_output_excerpt: 'router.use(<b>x</b>)' }],
  rejected: [{ target: 'public/school.html', reason: 'trang gốc, không phải trang ghi chú' }] };

const step = (order, file, layer, capability) => ({
  order, title: `Bước ${order}`, description: 'fixture', allowed_scope: [file], acceptance: ['node --test test/x.test.js'],
  tests: ['node --test test/x.test.js'], capability, risk: 'low', non_goals: ['x'], layer, depends_on: [],
});
const plan = (extra = {}) => ({
  domain: 'pharmacy', goal: 'Ghi chú nhanh.', allowed_scope: ['public/ghi-chu.html'], acceptance: ['node --test test/x.test.js'],
  tests: ['node --test test/x.test.js'], capabilities: ['public.ui'], risk: 'low', non_goals: ['x'],
  steps: [step(1, 'public/ghi-chu.html', 'frontend', 'public.ui')], ...extra,
});

test('cleanLedger bounds rows, drops malformed ones and keeps the evidence shape', () => {
  const rows = cleanLedger([ROW, null, { decision: 'guess', target: 'x' }, { decision: 'placement' }, ...Array(30).fill(ROW)]);
  assert.equal(rows.length, 20);
  assert.deepEqual(Object.keys(rows[0].evidence[0]), ['step_id', 'file', 'lines']);
  assert.equal(cleanLedger({ not: 'array' }).length, 0);
  const wide = cleanLedger([{ ...ROW, evidence: Array(5).fill(ROW.evidence[0]), rejected: Array(5).fill(ROW.rejected[0]), target: 'x'.repeat(900) }])[0];
  assert.deepEqual([wide.evidence.length, wide.rejected.length, wide.target.length], [3, 2, 300]);
});

test('validatePlan carries a clean ledger and omits the key without one', () => {
  assert.equal(validatePlan(plan({ ledger: [ROW, { decision: 'x' }] }), 'pharmacy').plan.ledger.length, 1);
  assert.equal('ledger' in validatePlan(plan(), 'pharmacy').plan, false);
  assert.equal('ledger' in validatePlan(plan({ ledger: [] }), 'pharmacy').plan, false);
});

test('approvals card lists decisions with step, evidence and rejected options', () => {
  const rows = ledgerRows([ROW]);
  assert.match(rows[0].source, /File mới public\/ghi-chu\.html/);
  assert.match(rows[0].quote, /bước 3 cổng 1 server\/contexts\/teacher\/index\.js:10-20/);
  assert.match(rows[0].quote, /bỏ public\/school\.html: trang gốc/);
  const context = buildElevationContext({
    request: { id: 7, title: 't', detail: 'd' }, root: { elevation: 'requested', plan_hash: 'h' },
    asked: { created_at: 1, actor_type: 'worker', detail: { scope: [{ path: 'public/a.html', level: 'surface' }], reason: 'r', plan_hash: 'h', plan_revision: 1 } },
    scope: [{ path: 'public/a.html', level: 'surface' }], plan: { source: 'current', plan_hash: 'h', revision: 1, tier: null, goal: 'g', steps: [] },
  });
  assert.ok(elevationCard(context, { ledger: [ROW] }).evidence.some((e) => e.source.startsWith('File mới')));
  assert.equal(elevationCard(context, { ledger: [] }).evidence.some((e) => e.source.startsWith('File mới')), false);
});

test('request page renderer escapes text, links each step to its gate node, and is empty without rows', () => {
  const html = renderLedger([ROW, { decision: 'ambiguity', target: 'lưu', gate: 1, readings: ['theo máy', 'theo tài khoản'], evidence: [], rejected: [] }]);
  assert.match(html, /Sổ quyết định \(2\)/);
  assert.match(html, /data-node="gate_1" data-step="3"/);
  assert.match(html, /router\.use\(&lt;b&gt;x&lt;\/b&gt;\)/);
  assert.doesNotMatch(html, /<b>x<\/b>/);
  assert.match(html, /theo máy <b>hoặc<\/b> theo tài khoản/);
  assert.match(html, /Đã bỏ <code>public\/school\.html<\/code>/);
  assert.equal(renderLedger(undefined), '');
  assert.equal(renderLedger([]), '');
  assert.match(stepLink(2.5, 9), /data-node="gate_2_5" data-step="9"/);
});

test('gate 3 ledger comes from the latest gate_3 journal row, tagged with gate 3, and renders as its own block', () => {
  const row = { decision: 'wiring', target: 'public/a.html', evidence: [{ step_id: 2, file: 'public/index.html', lines: '1-4' }], rejected: [] };
  const journal = [
    { node: 'gate_3', created_at: 1, state: { ledger_gate3: { 'public/old.html': [row] } } },
    { node: 'gate_4', created_at: 3, state: {} },
    { node: 'gate_3', created_at: 2, state: { ledger_gate3: { 'public/a.html': [row, null], 'public/b.html': [{ ...row, target: 'public/b.html' }] } } },
  ];
  const rows = gate3Decisions(journal);
  assert.deepEqual(rows.map((d) => [d.target, d.gate]), [['public/a.html', 3], ['public/b.html', 3]]);
  const html = renderLedger(rows, { gate3: true });
  assert.match(html, /Sổ quyết định cổng 3 \(2\)/);
  assert.match(html, /data-node="gate_3" data-step="2"/);
  assert.deepEqual(gate3Decisions(undefined), []);
  assert.deepEqual(gate3Decisions([{ node: 'gate_3', state: {} }]), []);
});
