# AI Board: tier per step

Authority for a plan is decided per step, not once for the whole request. `validatePlan`
(`server/ai-board/security/policy.js`) returns `stepTiers` next to the aggregate `tier`; the aggregate is
still what a request shows, but it no longer decides whether a safe step may run.

## Rules

- A step's tier comes only from its capability and scope. `public/` and `_ai-generated/` steps are
  surface; `content.write` and `integration.write` are protected; `core.server` is core. A data step is
  at least protected.
- Hard boundaries are unchanged and deterministic: money paths, scope outside the step's capability,
  and capability names outside the plan are rejected before any tier is computed. `risk` from the model,
  and words such as "đăng nhập" or "admin" in a description, are advisory only.
- `submitPlan` stores the aggregate as `ai_plans.tier` and, when a plan mixes queued and blocked steps,
  keeps the request at the surface gate (`status='planned'`) so the surface steps can run. Blocked steps
  get their own child ticket: protected → `waiting_authorization`, core → `human_owned`.
- `runnableOrders` (`server/ai-board/security/step-gate.js`) holds a queued step until every dependency
  is done or itself runnable; a dependent of a blocked step never runs.
- An admin approves a protected step with `authorizePlan`. That only wakes the protected child; a run
  that already stopped keeps its checkpoint, and the request continues through the LF/107 path
  (`continuePartialRequest` → `queued/authorized` → `resumeAuthorizedPlan`). The same plan revision and
  `plan_hash` are reused, so the tool-step checkpoint skips finished subtasks.
- A core step is never auto-implemented, even after approval.

## Where this lives

`server/ai-board/security/policy.js` (tier + boundaries), `server/ai-board/repositories/store.js`
(`planGate`, `splitGates`, `authorizePlan`, `resumeAuthorizedPlan`), `server/ai-board/security/step-gate.js`
(ordering). Python side: `ai-board/harness/gates/plan_validate.py` reports `complexity_signals` and the
worker keeps the plan gate. Covered by `test/ai-board-tier-per-step.test.js`, `test/ai-board-plan.test.js`
and `test/ai-board-partial-resume.test.js`.
