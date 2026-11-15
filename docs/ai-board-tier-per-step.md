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
- A data step (`layer: 'data'`) is never released by `authorizePlan`. It becomes `waiting_data` and only
  `acknowledgeDataStep` (`POST /api/admin/ai-board/tickets/:id/data-steps/:childId/acknowledge`) moves it to
  `done`, after the admin has applied the payload. Dependents stay held until then. A `campus_layout` payload
  is checked against `server/contexts/campus/layout-schema.js`; any other data step is a new `_ai-generated`
  migration.
- Backend context surface (Python harness, `path_policy.surface_context` + `runtime/levels.py`):
  `server/contexts/<name>/` file is surface only when `AI_BOARD_BACKEND_CONTEXTS_SURFACE=1`, `<name>` is in
  `AI_BOARD_BACKEND_CONTEXTS_SURFACE_LIST` (owner-approved), `<name>` is not in `FORBIDDEN_CONTEXTS`
  (billing, payment, economy, security, identity, auth, session, admin) nor `ai-board*`/`_*`, and a subtask
  `test/*.test.js` with `node:test` names that file. Flag and list default off. Gate 5 runs those tests and
  the route probe. `server/index.js`, `server/db.js`, money paths and deny paths stay core/protected.
  Status: implemented (LF/189); qualified by unit tests only, no live Gate 5 run.

## Where this lives

`server/ai-board/security/policy.js` (tier + boundaries), `server/ai-board/repositories/store.js`
(`planGate`, `splitGates`, `authorizePlan`, `resumeAuthorizedPlan`), `server/ai-board/security/step-gate.js`
(ordering). Python side: `ai-board/harness/gates/plan_validate.py` reports `complexity_signals` and the
worker keeps the plan gate. Covered by `test/ai-board-tier-per-step.test.js`, `test/ai-board-plan.test.js`
and `test/ai-board-partial-resume.test.js`.

## Skill selection call sites (LF/76 inventory)

Two catalogs and one folder picker choose skills. Flag `AI_BOARD_SKILL_SELECT` off = the legacy calls below.

| Call site | Chooses | Budget |
|---|---|---|
| `runtime/pipeline._split_call` → `default_skills.select_report` | `default-*` system skills, approved admin skills, frame variants | `stage_budget(role)` |
| `runtime/tool_loop._active_skills`, skill pin (~L886) | same, for active skills and the run pin | `stage_budget(role)` |
| `gates/adversarial_review`, `gates/reviewer_fix` → `default_skills.review_selection` | gate 4 review skills | `stage_budget('gate4_review')` |
| `default_skills.review_axes_block(None)` → `select('gate4_review')` | fallback that bypasses the node | `stage_budget` |
| `services/skill_rewrite.py:60` → `default_skills.select('gate3_light', purpose skill-authoring)` | bypasses the node even with the flag on | `stage_budget` |
| `services/context.pick_skill` + `select_block` in `build_context` (callers: `gates/brainstorm.py` gate 1, `gates/implement.py` gate 3, `evaluation/eval_recall.py`, `evaluation/strata.py`) | one folder skill (`edit-css-style`, `add-html-section`, `fix-js-behavior`, …; fallback `default`), plus `VARIANT_FILES` gate sections | global `max_per_prompt`, no token cap |

Overlaps and conflicts:
- Two catalogs pick independently. Flag off, a gate 3 split prompt can carry a `default-*` system skill and a folder skill for the same task.
- Variant names live in two tables: `context.VARIANT_FILES` (gate sections) and `default_skills.VARIANTS` (frame skills). Both read `AI_BOARD_SKILL_VARIANT`; each ignores the other's names.
- Budgets differ: `context` counts only `max_per_prompt`; `default_skills` also enforces `max_tokens_per_prompt`.
- Flag on: the node (`services/skill_plan.build`) owns defaults, admin, frame variants, the folder pick and context variants. `skill_rewrite` still calls `select()` directly.
- Known gap: the gate 3 run pin (`tool_loop`, `skill_plan.pin(role, {file, task_type})`) does not include the context folder pick, so a folder-pick change alone does not change that pin. Gate 1 context picks have no run pin.
