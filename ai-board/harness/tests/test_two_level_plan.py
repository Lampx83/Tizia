"""AI_BOARD_TWO_LEVEL_PLAN: gate 1 writes subtasks with fixed criteria; each subtask plans, edits, is checked, reviewed
and fixed in its own context under the existing stop rules. Fake models only."""
import json
import subprocess
import sys
from pathlib import Path

import pytest

from conftest import FakeModels, deps_with
from gates import brainstorm, implement, two_level
from runtime.budgets.budget import Budget
from settings import Settings

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

PAGE = '<main>\n  <button id="go">Bắt dầu</button>\n</main>\n'
OLD, NEW = '<button id="go">Bắt dầu</button>', '<button id="go">Bắt đầu</button>'
WRONG = '<button id="go">Bắt đầu nhé</button>'
REQUEST = {"id": "r1", "type": "edit", "subject": "Sửa chữ nút",
           "body": 'Đổi chữ "Bắt dầu" thành "Bắt đầu" ở public/a.html và public/b.html', "requester_role": "student"}
PASS = {"verdict": "pass", "findings": [], "brief": ""}


def decomposition(**over):
    first = {"goal": "Nút #go trang a hiển thị Bắt đầu", "files": ["public/a.html"], "depends_on": [],
             "criteria": [{"page": "/a.html", "text": "Bắt đầu", "action": "see"},
                          {"page": "/a.html", "text": "Bắt dầu", "action": "not_see"}]}
    second = {"goal": "Nút #go trang b hiển thị Bắt đầu", "files": ["public/b.html"], "depends_on": [1],
              "criteria": [{"page": "/b.html", "text": "Bắt đầu", "action": "see"}]}
    return {"summary_vi": "Sửa chữ nút trên hai trang.", "capabilities": [], "subtasks": [{**first, **over}, second]}


@pytest.fixture
def repo(tmp_path):
    root = tmp_path / "src"
    (root / "public").mkdir(parents=True)
    for name in "ab":
        (root / f"public/{name}.html").write_text(PAGE, encoding="utf-8")
    for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "b"]):
        subprocess.run(["git", *args], cwd=root, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    return root


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_TWO_LEVEL_PLAN", "1")
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    monkeypatch.setenv("AI_BOARD_REACT_PLAN", "0")


class Models(FakeModels):
    """gate1 → plan reply; reviewer → scripted verdicts; gate3 → code(file, prompt)."""

    def __init__(self, plan, code=None, reviews=(PASS,)):
        super().__init__({})
        self.plan, self.code, self.reviews, self.reviewed = plan, code, list(reviews), 0

    def generate(self, model, prompt, **kw):
        if "Duyệt diff ứng viên" in prompt:
            self.calls.append({"model": model, "prompt": prompt, "role": "review"})
            reply = self.reviews[min(self.reviewed, len(self.reviews) - 1)]
            self.reviewed += 1
            return {"response": json.dumps(reply, ensure_ascii=False), "prompt_eval_count": 1, "eval_count": 1}
        if model in (self.gate3_model, self.gate3_model_light):
            self.calls.append({"model": model, "prompt": prompt, "role": "edit"})
            file = next((line[8:].strip() for line in prompt.splitlines() if line.startswith("- file: ")), None)
            return {"response": json.dumps(self.code(file, prompt), ensure_ascii=False), "prompt_eval_count": 1, "eval_count": 1}
        return super().generate(model, prompt, **kw)

    def edits(self):
        return [c["prompt"] for c in self.calls if c.get("role") == "edit"]


def fixed(file, prompt):
    """Edits the button (base or last wrong output) to the new text; a test file that names the page."""
    search = WRONG if WRONG in prompt else OLD
    return {"edits": [{"search": search, "replace": NEW}], "test_file": f"test/{file[7]}.test.js",
            "test": f"import test from 'node:test';\n// {file}\n"}


def wrong(file, prompt):
    return {"edits": [{"search": WRONG if WRONG in prompt else OLD, "replace": WRONG}], "test_file": f"test/{file[7]}.test.js",
            "test": f"import test from 'node:test';\n// {file}\n"}


def gate1(repo, models):
    return brainstorm.run(REQUEST, deps_with(models), Budget(max_wall_clock_s=999, max_model_calls=40), source=repo)


def gate3(repo, tmp_path, plan, models, **state):
    state = {"plan": plan, "checkout_source": str(repo), "request_detail": REQUEST["body"], **state}
    out = implement.run(state, deps_with(models), Budget(max_wall_clock_s=999, max_model_calls=60), repo_dir=tmp_path / "scratch")
    return out, state


def normalized():
    return two_level.normalize(json.loads(json.dumps(decomposition())))


# ── flag ──

def test_flag_defaults_off_and_needs_plan_checks(monkeypatch):
    assert Settings().two_level_plan is False
    monkeypatch.setenv("AI_BOARD_TWO_LEVEL_PLAN", "1")
    assert two_level.enabled() is False
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")
    assert two_level.enabled() is True


def test_flag_off_prompt_and_plan_unchanged(repo, monkeypatch):
    monkeypatch.setenv("AI_BOARD_REACT_PLAN", "0")
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "Đổi chữ", "file": "public/a.html", "verify": "grep -q 'Bắt đầu' public/a.html", "size": "small"}]}
    models = Models(plan)
    out = gate1(repo, models)
    assert out["blocked"] is False, out["reason"]
    assert "TWO-LEVEL PLAN" not in models.calls[-1]["prompt"]
    assert out["plan"]["subtasks"][0]["title"] == "Đổi chữ" and "checks" not in out["plan"]["subtasks"][0]


# ── decomposition plan (gate 1) ──

def test_gate1_writes_decomposition_mapped_to_gate_schema(repo, on):
    models = Models(decomposition())
    out = gate1(repo, models)
    assert out["blocked"] is False, out["reason"]
    prompt = models.calls[-1]["prompt"]
    assert two_level.DECOMPOSE_PROMPT in prompt and "ACCEPTANCE CRITERIA (feature request)" not in prompt
    first, second = out["plan"]["subtasks"]
    assert first["title"] == "Nút #go trang a hiển thị Bắt đầu" and first["file"] == "public/a.html"
    assert first["checks"] == [{"primitive": "text_present", "path": "/a.html", "text": "Bắt đầu"},
                               {"primitive": "text_absent", "path": "/a.html", "text": "Bắt dầu"}]
    assert second["checks"] == [{"primitive": "text_present", "path": "/b.html", "text": "Bắt đầu"}]
    assert second["depends_on"] == [1] and brainstorm.is_runnable(first["verify"])
    assert len(out["plan"]["criteria"]) == 3  # what the requester approves at gate 2.5


@pytest.mark.parametrize("over, why", [
    ({"title": "Đổi dòng 2"}, "chỉ gồm goal"),
    ({"edits": [{"search": "a", "replace": "b"}]}, "chỉ gồm goal"),
    ({"goal": "Bước 1.\nBước 2."}, "một câu"),
    ({"files": ["public/b.html"]}, "2 subtask cùng sửa public/b.html"),
    ({"files": ["public/a.html", "public/x.html"]}, "chỉ được một file"),
    ({"criteria": []}, "criteria phải có 1-3"),
    ({"criteria": [{"page": "/a.html", "text": "x", "action": "see"}] * 4}, "criteria phải có 1-3"),
    ({"criteria": [{"page": "/a.html", "action": "see"}]}, "text hoặc element"),
])
def test_decomposition_rules_reject_edit_detail_shared_files_and_bad_criteria(over, why, on):
    with pytest.raises(ValueError, match=why):
        two_level.normalize(decomposition(**over))


def test_gate1_path_policy_still_runs_on_the_decomposition(repo, on):
    out = gate1(repo, Models(decomposition(files=["ai-board/harness/settings.py"])))
    assert out["blocked"] is True and "ai-board" in out["reason"]


def test_bad_decomposition_goes_back_to_the_planner_once(repo, on):
    models = Models(decomposition(files=["public/b.html"]))
    out = gate1(repo, models)
    assert out["blocked"] is True and "2 subtask cùng sửa" in out["reason"]
    assert "YOUR PREVIOUS ANSWER WAS REJECTED" in models.calls[-1]["prompt"]


def test_criteria_reach_the_executor_through_the_server_plan(on):
    import worker_execution
    import worker_planner
    plan = normalized()
    canonical = worker_planner.HarnessPlanner._canonical({**REQUEST, "domain": None}, plan)
    executed = worker_execution._execution_plan(canonical)
    assert [st["checks"] for st in executed["subtasks"]] == [st["checks"] for st in plan["subtasks"]]
    assert [st["title"] for st in executed["subtasks"]] == [st["title"] for st in plan["subtasks"]]


def test_acceptance_apply_keeps_each_subtask_its_own_criteria(on):
    from gates import acceptance_structure
    plan = normalized()
    before = [st["checks"] for st in plan["subtasks"]]
    assert acceptance_structure.apply(plan)["subtasks"][0]["checks"] == before[0]
    assert acceptance_structure.problems(plan, REQUEST) == []


# ── subtask plan (own context, reads the repo) ──

def test_subtask_plans_its_own_detail_after_reading_and_scope_is_enforced(repo, on):
    from test_react_plan import Scripted
    sha = subprocess.run(["git", "rev-parse", "HEAD"], cwd=repo, capture_output=True, text=True, check=True).stdout.strip()
    subtask = normalized()["subtasks"][0]
    read = {"tool": "read_file", "arguments": {"file": "public/a.html"}}

    def plan_for(file):
        return {"tool": "finish", "arguments": {"plan": {"summary_vi": "s", "capabilities": [], "subtasks": [
            {"title": "Đổi chữ nút #go từ Bắt dầu thành Bắt đầu", "file": file, "verify": "grep -q 'Bắt đầu' public/a.html",
             "size": "small", "quotes": [OLD]}]}}}

    deps = Scripted(read, plan_for("public/b.html"), plan_for("public/a.html"))
    state = {"checkout_source": str(repo), "base_sha": sha, "request_detail": REQUEST["body"]}
    session = two_level.detail_session(state, subtask, deps, Budget(max_wall_clock_s=999))
    assert "file ngoài phạm vi subtask" in deps.prompts[2]  # the rule answer came back inside the same session
    assert session and OLD in session and two_level.DETAIL_HEAD in session and "public/a.html" in session.split(two_level.DETAIL_HEAD)[1]
    assert "goal: Nút #go trang a hiển thị Bắt đầu" in deps.prompts[0] and 'Trang /a.html không còn chữ "Bắt dầu".' in deps.prompts[0]


def test_subtask_plan_may_not_rewrite_criteria(repo, on):
    text = json.dumps({"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "grep -q x public/a.html", "size": "small",
         "checks": [{"primitive": "text_present", "path": "/a.html", "text": "x"}]}]})
    assert "không viết checks" in two_level.detail_problems(text, ["public/a.html"], repo, "HEAD", "student")[0]


def test_edit_step_gets_the_subtask_plan_and_earlier_summaries(repo, tmp_path, on, monkeypatch):
    monkeypatch.setattr(two_level, "detail_session", lambda state, subtask, *a, **k: f"READ {subtask['file']}{two_level.DETAIL_HEAD}PLAN-{subtask['file']}")
    models = Models({}, fixed)
    out, state = gate3(repo, tmp_path, normalized(), models)
    assert out["blocked"] is False, out["reason"]
    first, second = models.edits()
    assert "PLANNING SESSION" in first and "PLAN-public/a.html" in first and "PLAN-public/b.html" not in first
    assert "PLAN-public/b.html" in second and "EARLIER STEPS" in second and "public/a.html" in second.split("EARLIER STEPS")[1]
    assert "plan_session" not in state  # the root keeps the plan and summaries, not a subtask's history
    assert [s["file"] for s in state["subtask_summaries"]] == ["public/a.html", "public/b.html"]


# ── review → fix loop ──

@pytest.fixture
def no_detail(monkeypatch):
    monkeypatch.setattr(two_level, "detail_session", lambda *a, **k: None)


def test_reviewer_finding_goes_back_to_the_same_subtask_as_one_brief(repo, tmp_path, on, no_detail):
    fail = {"verdict": "fail", "findings": [{"kind": "not_verbatim", "severity": "high", "file": "public/a.html",
                                             "evidence": "Bắt đầu nhé", "fix": "bỏ chữ nhé"}], "brief": "Chữ nút phải đúng 'Bắt đầu'."}
    seen = []

    def code(file, prompt):
        seen.append(file)
        return wrong(file, prompt) if seen.count(file) == 1 and file == "public/a.html" else fixed(file, prompt)

    models = Models({}, code, reviews=(fail, PASS))
    out, state = gate3(repo, tmp_path, normalized(), models, repairs_left=3)
    assert out["blocked"] is False, out["reason"]
    assert seen == ["public/a.html", "public/a.html", "public/b.html"]
    retry = models.edits()[1]
    assert "PREVIOUS ATTEMPT BLOCKED" in retry and "Chữ nút phải đúng 'Bắt đầu'." in retry
    assert f"L2|   {WRONG}" in retry  # the fix edits the subtask's own last output
    assert state["repairs_left"] == 2 and len(state["reviewer_repairs"]) == 1
    assert NEW in (tmp_path / "scratch/public/a.html").read_text(encoding="utf-8")
    review = next(c["prompt"] for c in models.calls if c.get("role") == "review")
    assert "Nút #go trang a hiển thị Bắt đầu" in review and "public/b.html" not in review.split("YÊU CẦU")[1].split(">>>")[0]


def test_deterministic_criteria_miss_is_merged_into_the_brief(repo, tmp_path, on, no_detail):
    seen = []

    def code(file, prompt):
        seen.append(file)
        return wrong(file, prompt) if len(seen) == 1 else fixed(file, prompt)

    models = Models({}, code, reviews=(PASS,))
    plan = normalized()
    plan["subtasks"][0]["checks"] = [{"primitive": "text_absent", "path": "/a.html", "text": "nhé"}]
    out, _ = gate3(repo, tmp_path, plan, models, repairs_left=2)
    assert out["blocked"] is False, out["reason"]
    assert 'public/a.html: vẫn còn chữ "nhé" (tiêu chí đã chốt)' in models.edits()[1]


# ── stop rules and partial result ──

def test_same_output_and_finding_twice_stops_with_state_repeat(repo, tmp_path, on, no_detail, monkeypatch):
    fail = {"verdict": "fail", "findings": [], "brief": "Sai chữ."}
    models = Models({}, wrong, reviews=(fail,))
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [normalized()["subtasks"][0]]}
    real, rounds = implement._generate_one, []

    def same(child, subtask, *, state, current, **kw):
        rounds.append(current)
        return real(child, subtask, state=state, current=PAGE, **kw)  # same input every round: same output

    monkeypatch.setattr(implement, "_generate_one", same)
    out, state = gate3(repo, tmp_path, plan, models, repairs_left=9)
    assert out["blocked"] is True and out["loop_guard"] == "state_repeat" and "state_repeat" in out["reason"]
    assert len(rounds) == 2 and state["repairs_left"] == 8


def test_repair_cap_ends_the_loop_with_a_stop_report(repo, tmp_path, on, no_detail):
    fail = {"verdict": "fail", "findings": [], "brief": "Sai chữ."}
    models = Models({}, wrong, reviews=(fail,))
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [normalized()["subtasks"][0]]}
    out, state = gate3(repo, tmp_path, plan, models)
    assert out["blocked"] is True and out["failure_class"] == "ordinary"
    assert "repair cap reached" in out["reason"] and "Sai chữ." in out["reason"]
    assert len(models.edits()) == 1 and not (tmp_path / "scratch/public/a.html").exists()
    from runtime.loops import stop_report
    report = stop_report.build("blocked_gate_3", out["reason"], 3, out["failure_class"], [3])
    assert report["class"] == "model_limit" and "repair cap reached" in stop_report.render(report)


def test_failed_subtask_keeps_passed_ones_as_partial(repo, tmp_path, on, no_detail):
    fail = {"verdict": "fail", "findings": [], "brief": "Sai chữ trang b."}
    models = Models({}, lambda f, p: fixed(f, p) if f == "public/a.html" else wrong(f, p), reviews=(PASS, fail))
    out, state = gate3(repo, tmp_path, normalized(), models, repairs_left=0)
    assert out["failure_class"] == "partial" and out["partial"] == {"done": 1, "total": 2, "remaining": ["public/b.html"]}
    assert [d["file"] for d in out["diffs"]] == ["public/a.html"]
    assert NEW in (tmp_path / "scratch/public/a.html").read_text(encoding="utf-8")


def test_reviewer_outage_stops_the_subtask_without_a_fix_round(repo, tmp_path, on, no_detail):
    models = Models({}, fixed, reviews=("oops",))
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [normalized()["subtasks"][0]]}
    out, state = gate3(repo, tmp_path, plan, models, repairs_left=5)
    assert out["blocked"] is True and out["failure_class"] in ("critical", "transient") and state["repairs_left"] == 5
    assert "review stopped" in out["reason"] and len(models.edits()) == 1


# ── wiring: server plan, derived checks, gate 2.5, worker verdict ──

def test_multi_file_scope_reaches_the_executor(on, monkeypatch):
    import worker_execution
    import worker_planner
    from runtime import subtask_files
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    raw = decomposition(files=["public/a.html", "public/js/a.js"])
    plan = brainstorm.parse_plan(json.dumps(raw), request=REQUEST)
    canonical = worker_planner.HarnessPlanner._canonical({**REQUEST, "domain": None}, plan)
    assert canonical["steps"][0]["allowed_scope"] == ["public/a.html", "public/js/a.js"]
    assert canonical["allowed_scope"] == ["public/a.html", "public/js/a.js", "public/b.html"]
    executed = worker_execution._execution_plan(canonical)
    assert subtask_files.files_of(executed["subtasks"][0]) == ["public/a.html", "public/js/a.js"]
    assert subtask_files.files_of(executed["subtasks"][1]) == ["public/b.html"]


def test_flag_off_server_plan_keeps_one_file_per_step(monkeypatch):
    import worker_planner
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [
        {"title": "t", "file": "public/a.html", "verify": "grep -q x public/a.html", "size": "small", "files": ["public/js/a.js"]}]}
    canonical = worker_planner.HarnessPlanner._canonical({**REQUEST, "domain": None}, plan)
    assert canonical["steps"][0]["allowed_scope"] == ["public/a.html"] and canonical["allowed_scope"] == ["public/a.html"]


def test_derived_checks_never_replace_the_fixed_criteria(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_DERIVED_CHECKS", "1")
    plan = brainstorm.parse_plan(json.dumps(decomposition()), request=REQUEST)
    assert [st["checks_source"] for st in plan["subtasks"]] == ["two_level", "two_level"]
    assert [c for st in plan["subtasks"] for c in st["checks"]] == [two_level.acceptance_structure.check_of(i) for i in plan["criteria"]]


def test_gate_2_5_rules_still_run_on_the_decomposition(repo, on):
    from gates import plan_validate
    from runtime import coverage
    plan = normalized()
    assert coverage.plan_block(plan, lambda: [], lambda: []) is None
    state = {"plan": plan, "checkout_source": str(repo)}
    out = plan_validate.run(REQUEST, deps_with(Models({})), Budget(max_wall_clock_s=999, max_model_calls=20), state)
    assert out["blocked"] is False, out["reason"]
    broken = normalized()
    broken["subtasks"][1]["checks"] = [{"primitive": "text_present", "path": "b.html", "text": "x"}]
    out = plan_validate.run(REQUEST, deps_with(Models({})), Budget(max_wall_clock_s=999, max_model_calls=20), {"plan": broken})
    assert out["blocked"] is True and out["outcome"] == plan_validate.PLAN_UNFIT


def test_worker_run_folds_fix_rounds_into_repairs_and_ends_partial_with_a_stop_report(repo, on, no_detail, monkeypatch):
    import worker_execution
    import worker_planner
    monkeypatch.setenv("AI_BOARD_STOP_REPORT_V2", "1")
    fail = {"verdict": "fail", "findings": [], "brief": "Sai chữ trang b."}
    models = Models({}, lambda f, p: fixed(f, p) if f == "public/a.html" else wrong(f, p), reviews=(PASS, fail))
    deps = deps_with(models)
    canonical = worker_planner.HarnessPlanner._canonical({**REQUEST, "domain": None}, normalized())
    seen = {}

    def run_gate(gate, _request, deps, budget, state):
        assert gate == 3, gate  # gate 3 stops partial: no later gate runs
        seen["repairs_left"] = state["repairs_left"]
        return implement.run(state, deps, budget)

    verdict = worker_execution.execute_pre_pr(
        canonical, ticket_id=7, checkout_source=repo, deps=deps, budget=Budget(max_wall_clock_s=999, max_model_calls=60),
        run_gate=run_gate, cleanup=lambda *a, **k: None, request_detail=REQUEST["body"])
    cap = worker_execution.repair_cap()
    assert seen["repairs_left"] == cap and cap >= 1
    assert verdict["outcome"] == "blocked" and verdict["failure_class"] == "partial"
    # same wrong output and brief twice: state_repeat ends the loop long before the shared cap
    assert [r["reason"] for r in verdict["repairs"]] == ["two-level fix 'Nút #go trang b hiển thị Bắt đầu': Sai chữ trang b."]
    assert "state_repeat" in verdict["reason"]
    assert verdict["stop_report"]["blocked_gate"] == 3 and "hoàn thành một phần 1/2" in verdict["reason"]
    assert "Sai chữ trang b." in verdict["reason"] and verdict["reason"].startswith("stop[")


# ── review follow-ups: real tool loop fix round, server capability, path shape, startup warning ──

def test_fix_round_in_the_real_tool_loop_starts_from_last_rounds_files(repo, tmp_path, on, no_detail, monkeypatch):
    monkeypatch.setenv("AI_BOARD_TOOL_LOOP", "1")
    first = [{"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"search": OLD, "replace": WRONG}]}},
             {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';\n// public/a.html\n"}},
             {"tool": "finish", "arguments": {}}]
    second = [{"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"search": WRONG, "replace": NEW}]}},
              {"tool": "finish", "arguments": {}}]  # no write_test: the test is carried from round 1
    rounds = {"first": 0, "second": 0}

    def code(file, prompt):
        key = "second" if "Lần làm trước bị loại" in prompt else "first"
        script = first if key == "first" else second
        rounds[key] += 1
        return script[min(rounds[key], len(script)) - 1]

    fail = {"verdict": "fail", "findings": [], "brief": "Chữ nút phải đúng 'Bắt đầu'."}
    models = Models({}, code, reviews=(fail, PASS))
    plan = {"summary_vi": "s", "capabilities": [], "subtasks": [normalized()["subtasks"][0]]}
    out, state = gate3(repo, tmp_path, plan, models, repairs_left=2)
    assert out["blocked"] is False, out["reason"]
    assert rounds == {"first": 3, "second": 2}
    assert (tmp_path / "scratch/public/a.html").read_text(encoding="utf-8") == PAGE.replace(OLD, NEW)
    assert (tmp_path / "scratch/test/a.test.js").exists() and state["repairs_left"] == 1


def _node(script: str, *args: str) -> str:
    root = Path(__file__).resolve().parents[3]
    run = subprocess.run(["node", "--input-type=module", "-e", script, *args], cwd=root, capture_output=True, text=True,
                         encoding="utf-8", check=True)
    return run.stdout.strip()


@pytest.mark.skipif(__import__("shutil").which("node") is None, reason="node not installed")
def test_multi_file_step_gets_a_capability_the_server_policy_accepts(on, monkeypatch, tmp_path):
    import worker_planner
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    policy = "./server/ai-board/security/policy.js"
    catalog = json.loads(_node(f"import {{ CAPABILITY_POLICY as p }} from '{policy}'; console.log(JSON.stringify("
                               "Object.fromEntries(Object.entries(p).map(([k, v]) => [k, {allow: v.allow, deny: v.deny}]))))"))
    raw = decomposition(files=["public/a.html", "server/contexts/_ai-generated/demo/api.js"])
    plan = brainstorm.parse_plan(json.dumps(raw), request=REQUEST)
    canonical = worker_planner.HarnessPlanner._canonical({**REQUEST, "domain": "it"}, plan, None, catalog)
    assert canonical["steps"][0]["capability"] == "features" and canonical["steps"][1]["capability"] == "public.ui"
    path = tmp_path / "plan.json"
    path.write_text(json.dumps(canonical, ensure_ascii=False), encoding="utf-8")
    verdict = _node(f"import {{ validatePlan }} from '{policy}'; import fs from 'node:fs';"
                    "try { const out = validatePlan(JSON.parse(fs.readFileSync(process.argv[1], 'utf8')), 'it');"
                    " console.log('ok ' + out.plan.steps.map((s) => s.allowed_scope.join('+')).join('|')); }"
                    " catch (e) { console.log('reject ' + (e.code || '') + ' ' + e.message); }", str(path))
    assert verdict == "ok public/a.html+server/contexts/_ai-generated/demo/api.js|public/b.html", verdict


@pytest.mark.parametrize("files", [["../server/x.js"], ["/etc/passwd"], ["public/../../x.html"]])
def test_normalize_refuses_paths_outside_the_repo(files, on):
    with pytest.raises(ValueError, match="path không hợp lệ"):
        two_level.normalize(decomposition(files=files))


def test_normalize_only_tidies_a_leading_dot_slash(on, monkeypatch):
    monkeypatch.setenv("AI_BOARD_MULTI_FILE_SUBTASK", "1")
    plan = two_level.normalize(decomposition(files=["./public/a.html", r"public\js\a.js"]))
    assert plan["subtasks"][0]["file"] == "public/a.html" and plan["subtasks"][0]["allowed_scope"] == ["public/a.html", "public/js/a.js"]


def test_flag_without_plan_checks_warns_once_at_startup(monkeypatch, caplog):
    from settings import get_settings
    monkeypatch.setenv("AI_BOARD_TWO_LEVEL_PLAN", "1")
    with caplog.at_level("WARNING", logger="settings"):
        get_settings()
        get_settings()
    assert [r.getMessage() for r in caplog.records].count(
        "AI_BOARD_TWO_LEVEL_PLAN is set without AI_BOARD_PLAN_CHECKS: two-level plan stays off") == 1
    assert two_level.enabled() is False
