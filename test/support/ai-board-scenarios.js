// Builders shared by the parity scenarios.
const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);

export const step = (over = {}) => ({
  order: 1, title: 'Sửa trang giới thiệu', description: 'Đổi 1 dòng.', allowed_scope: ['public/gioi-thieu.html'],
  acceptance: ['Trang đổi.'], tests: ['node --test'], capability: 'public.ui', risk: 'low', non_goals: ['x'], ...over,
});
export const planOf = (over = {}, stepOver = {}) => ({
  domain: 'pharmacy', goal: 'Sửa trang giới thiệu.', allowed_scope: ['public/gioi-thieu.html'], acceptance: ['Trang đổi.'],
  tests: ['node --test'], capabilities: ['public.ui'], risk: 'low', non_goals: ['x'], steps: [step(stepOver)], ...over,
});
export const protectedPlan = () => planOf({
  allowed_scope: ['server/contexts/content/x.js'], capabilities: ['content.write'], risk: 'medium',
}, { allowed_scope: ['server/contexts/content/x.js'], capability: 'content.write', risk: 'medium' });
export const corePlan = () => planOf({
  allowed_scope: ['server/db.js'], capabilities: ['core.server'], risk: 'high',
}, { allowed_scope: ['server/db.js'], capability: 'core.server', risk: 'high' });

export const gates = {
  3: { gate: 3, blocked: false, reason: null },
  4: { gate: 4, blocked: false, reason: null, issues: [] },
  5: { gate: 5, blocked: false, reason: null, smoke_passed: true, http_observed: true, runner: 'docker', retried: false,
    functional: { probe_id: 'queue-worker-availability-v1', passed: true, coverage: { requester_api: true, mounted_ui: true, recovery: true } } },
  55: { gate: 5.5, blocked: false, reason: null, risk_level: 'medium', risk_signals: [] },
};
export const candidate = (n = 1) => ({
  branch: `ai-board/2026-09-24-ticket-${n}`, base_sha: SHA_A, head_sha: SHA_B,
  commits: [{ sha: SHA_B, title: `ai-board(ticket-${n}): 1/1`, files: ['public/gioi-thieu.html', 'test/p.test.js'] }],
});
export const passing = (extra = {}) => ({
  outcome: 'ready_for_pr', gate_reached: 5.5, reason: null, budget_used: 80, failure_class: null,
  repairs: [], candidate: candidate(), gates: [gates[3], gates[4], gates[5], gates[55]], ...extra,
});
export const blocked = (gate, failureClass, extra = {}) => ({
  outcome: 'blocked', gate_reached: gate, reason: `blocked at ${gate}`, budget_used: 80, failure_class: failureClass,
  repairs: [], candidate: null,
  gates: [...[gates[3], gates[4], gates[5]].filter((g) => g.gate < gate), { gate, blocked: true, reason: `blocked at ${gate}`, issues: [] }],
  ...extra,
});

let seq = 0;
export const resetSeq = () => { seq = 0; };
export const newRequest = (store, over = {}) => store.createRequestWithRoot({
  ownerUserId: 1, ownerDomain: 'pharmacy', ownerDisplayName: 'Lan',
  idempotencyKey: `req-${++seq}-${over.tag || 'x'}-aaa`, title: 'Sửa trang giới thiệu', detail: 'fixture', ...over,
});

/** claim root as `workerId` (active), open a plan run; returns { id, lease, run } */
export async function claimAndRun(store, workerId = 'w1', trigger = 'plan', mode = 'active') {
  const claim = await store.claimNext({ workerId, version: 'test', mode, intent: 'plan' });
  if (!claim) return null;
  const lease = { workerId, leaseToken: claim.lease_token };
  const run = await store.createRun(claim.id, { ...lease, trigger, idempotencyKey: `run-${++seq}-${workerId}` });
  return { claim, id: claim.id, lease, run };
}

export const submit = (store, c, plan, key) => store.submitPlan(c.id, {
  ...c.lease, runId: c.run.id, plan, budgetUsed: 40, idempotencyKey: key || `plan-${++seq}-ok`,
});
export const verdict = (store, c, v, key) => store.submitPrePrVerdict(c.id, {
  ...c.lease, runId: c.run.id, verdict: v, idempotencyKey: key || `verdict-${++seq}-ok`,
});
