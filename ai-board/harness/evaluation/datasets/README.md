# Request-level evaluation dataset (v1)

One row per realistic request a person could file against the product (school portal, FAQ,
campus layout, lessons, leagues, admin). It measures the board end to end: intake verdict, plan
shape, steps, gate blocks, and how much rework a run needed.

This dataset complements the existing gold/dev corpus. The corpus checks a plan against gold
files; this file describes the *request* and the plan properties it should produce. No model
calls are made here — the CSV is read by tests and by `evaluation/requests_report.py`.

## Layout: code here, real data outside the repo

| Path | What it is |
|---|---|
| `datasets/README.md` | this file: schema, rubric, split and isolation rules |
| `datasets/fixtures/requests-sample.csv` | 6 synthetic cases (4 `dev`, 2 `gold`), one per difficulty plus an extra; used by tests and CI |
| `evaluation/requests_dataset.py` | loader, validator, stats; resolves the real file through `AI_BOARD_EVAL_DATA` |
| `evaluation/requests_report.py` | report: groups results by difficulty and prints the dataset sha256 |

The real dataset (`requests-v1.csv`, 37 cases: 26 `dev` / 11 `gold`) is **not in this repo**. It
lives in the external eval store (`H:\01_Main_coding_projects\Tizia-eval\datasets\`), which is
not versioned by Tizia and must be backed up. Point the loader at it:

```powershell
$env:AI_BOARD_EVAL_DATA = "H:\01_Main_coding_projects\Tizia-eval\datasets"   # directory or CSV
```

- Set: the real file is read and its sha256 is recorded.
- Unset: the in-repo fixture is read, so tests and CI need nothing external.
- Set but missing: `FileNotFoundError`. The loader never silently falls back to the fixture,
  because a scored run would then grade against the wrong rows without saying so.

## Columns

| Column | Type | Meaning |
|---|---|---|
| `id` | `req-v1-NNN` | Stable case key; joins with a results CSV. |
| `split` | `dev` \| `gold` | `dev` is readable while tuning; `gold` is held out. |
| `domain` | `admin`, `campus`, `faq`, `leagues`, `lessons`, `portal` | Product area. |
| `request_title` | text | Short subject, as a requester would write it. |
| `request_detail_vi` | text | Vietnamese detail, under 80 words, no file paths or function names. |
| `difficulty` | 1–5 | Rubric below. |
| `difficulty_reason` | text | Why this score, in one sentence. |
| `expected_steps` | int | Subtasks the plan should contain. `0` when no plan is correct. |
| `expected_layers` | `;` list | Subset of `frontend`, `backend`, `db`, `wiring`. |
| `touches_db` | 0/1 | New table or migration needed. |
| `touches_core_or_protected` | 0/1 | Target level is protected or core. |
| `needs_elevation` | 0/1 | A correct plan must request admin elevation. |
| `needs_ui` | 0/1 | A surface page changes. |
| `ambiguity` | `low` \| `medium` \| `high` | How much the request leaves open. |
| `acceptance_checks` | int | Checks a plan should state (≥ 1). |
| `expected_outcome` | `plan_pass` \| `gate25_block` \| `clarify` \| `intake_review` | Expected terminal state, see below. |
| `labels` | `;` list | Free tags (`bugfix`, `elevation`, `pii`, `ambiguous`, …). |
| `notes` | text | Trap or intent of the case. |

`expected_outcome` is the expected *result*, not always success:

- `plan_pass` — plan is produced and survives gate 2.5.
- `gate25_block` — plan is correctly stopped at gate 2.5, mostly `elevation_required` for
  protected/core targets. A block here is a passing case.
- `clarify` — the board should ask questions instead of planning.
- `intake_review` — intake stops the request (`needs_info` / `human_review`), e.g. PII or
  disallowed external links.

For `clarify` / `intake_review` rows, `expected_layers` and the `touches_*` flags describe what a
plan *would* need if it proceeded; `expected_steps` stays 0 because asking or blocking is the
correct output.

## Difficulty rubric

| Score | Meaning |
|---|---|
| 1 | Trivial: one visible change on one page/file, no logic. |
| 2 | One file plus a test: bug fix or small behavior change, verified. |
| 3 | Two layers or a DB migration: e.g. API + page, or table + endpoint. |
| 4 | Protected/core target, or the plan must request elevation; optionally the request names a shared file and the correct plan scopes down instead. |
| 5 | Multi-layer with ambiguity or risk: several domains, contradictory requirements, or new table + API + protected/core edit together. |

Invariants the validator enforces: `needs_ui` ↔ `frontend` layer, `touches_db` ↔ `db` layer,
`needs_elevation` implies `touches_core_or_protected`, `expected_steps == 0` exactly for
`clarify` / `intake_review`, no request text contains a repo path or file name, and the file
carries all five difficulties and both splits with a 65–75 % `dev` share.

## Split rule

- 70 % `dev`, 30 % `gold`; current real file: 26 dev / 11 gold (37 cases). The fixture is
  4 dev / 2 gold (6 cases) and only has to satisfy the same invariants.
- Gold is held out: do not inspect it while tuning prompts, skills, or gates, and never move a
  case out of gold after looking at a failing run. Edit dev first; only re-split by promoting a
  dev case when gold coverage for a difficulty or outcome is missing.
- Gold keeps at least one case per outcome family (`plan_pass`, `gate25_block`, `clarify`,
  `intake_review`).

## Isolation: the boundary is the AI Board runtime

Threat model: **the AI Board pipeline**. This store must never be readable by

- the AI Board worker (host process or container),
- any candidate checkout/worktree the pipeline builds,
- the Gate 5 guest image,
- any compose service, Docker build context, image layer, or artifact the board can read.

Enforced by construction, not by convention:

- no compose service mounts a host eval path;
- the worker image (`ai-board/worker.Dockerfile.dockerignore`) and the Gate 5 guest image
  (`ai-board/sandbox-runner/guest/Dockerfile.dockerignore`) both exclude
  `ai-board/harness/evaluation/` data;
- the repo-level `.dockerignore` drops `ai-board/`;
- candidates are git checkouts at a pinned sha while the real CSV is untracked and outside the
  repo.

Keep those properties when you add services, and never bind-mount the store into a worker or
candidate.

**Not in scope: developer tooling.** opencode, Claude Code, Codex and the human operator run on
the host, outside the evaluated system, and are expected to read the `dev` split to build, debug
and grade the harness. Treating them as the security boundary is unenforceable (they run with the
owner's file access) and it hides the boundary that actually protects the measurement.

The rule that does apply to them is methodological, not technical: do not tune prompts, skills,
gates or datasets on the `gold` split (see Split rule). That is a review rule, not a sandbox; do
not describe it as isolation from a coding agent.

Packs (real merged commits used as gold) live in `Tizia-eval/packs/` and follow the same
boundary: the worker and candidate never see them; the host reads them through
`suite pack-check` / `suite run --pack`.

## Using it with the existing suite

1. Pick cases from `dev` (or the whole file for a full run) and feed `request_title` +
   `request_detail_vi` to the board the same way the inbox does.
2. For each run, write a results CSV with one row per case:

   | Column | Required | Meaning |
   |---|---|---|
   | `id` | yes | dataset case id |
   | `passed` | one of these two | `1`/`0`, `true`/`false` |
   | `outcome` | one of these two | actual outcome; compared with `expected_outcome` |
   | `plan_steps` | no | number of subtasks the plan produced |
   | `resumes` | no | resume/retry count for the case |

3. Report:

   ```bash
   ai-board/harness/.venv/Scripts/python.exe ai-board/harness/evaluation/requests_report.py \
       --results runs.csv [--dataset H:/01_Main_coding_projects/Tizia-eval/datasets]
   ```

   The table groups by difficulty and shows pass rate, mean plan steps, and resume count. It is
   preceded by the dataset path, its sha256 and its row count; `--json` carries the same values
   under `dataset`. Unknown ids are reported on stderr; missing dataset ids are listed so a
   partial run is visible.
4. Pin the dataset in run evidence. A suite run (`evaluation/suite/runner.py run ...`) records
   `requests_dataset_sha256`, `requests_dataset_path` and `requests_dataset_rows` in `run.json`
   when `--requests-dataset` or `AI_BOARD_EVAL_DATA` names the real file. With neither, the pin is
   absent and comparisons do not require it.
5. Validate the dataset itself:

   ```bash
   ai-board/harness/.venv/Scripts/python.exe -m pytest \
       ai-board/harness/tests/test_requests_dataset.py ai-board/harness/tests/test_requests_report.py -q
   ```

No network, model, or database access is involved in any of the steps above.
