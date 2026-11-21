"""Suspect check branch outside Gate 5: plan checks reach the worker, one check revision through replan, near-identical repair stop."""
import json
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import worker_execution  # noqa: E402
import worker_planner  # noqa: E402
from runtime.loops import stop_report  # noqa: E402
from gate5 import checks  # noqa: E402
from test_gate_feedback_cap import _execution  # noqa: E402

CHECK = {"primitive": "text_present", "path": "/x.html", "text": "Liên hệ"}
OTHER = {"primitive": "text_absent", "path": "/x.html", "text": "Cũ"}
FLAGS = ("AI_BOARD_PLAN_CHECKS", "AI_BOARD_RED_CHECK_CLASSIFY")


def old_plan(*subtasks):
    return {"summary_vi": "x", "capabilities": ["public.ui"], "subtasks": list(subtasks)}


def subtask(file="public/x.html", **extra):
    return {"title": "t", "file": file, "verify": "v", "size": "small", **extra}


@pytest.fixture
def flags(monkeypatch):
    for name in FLAGS:
        monkeypatch.setenv(name, "1")


@pytest.fixture
def replan_on(monkeypatch):
    monkeypatch.setattr(worker_execution, "REPAIR_REPLAN", {**worker_execution.REPAIR_REPLAN, "enabled": True})


# Plan checks reach the server plan.

@pytest.mark.parametrize("missing", FLAGS)
def test_canonical_carries_checks_per_file_only_with_both_flags_on(monkeypatch, flags, missing):
    old = old_plan(subtask(checks=[CHECK]), subtask(checks=[CHECK, OTHER]), subtask("public/y.html"))
    monkeypatch.delenv(missing)
    off = worker_planner.HarnessPlanner._canonical({"domain": "it"}, old)
    assert all("checks" not in step for step in off["steps"])
    monkeypatch.setenv(missing, "1")
    on = worker_planner.HarnessPlanner._canonical({"domain": "it"}, old)
    assert [step.get("checks") for step in on["steps"]] == [[CHECK, OTHER], None]
    assert worker_execution._execution_plan(on)["subtasks"][0]["checks"] == [CHECK, OTHER]
    assert {**on, "steps": [{k: v for k, v in s.items() if k != "checks"} for s in on["steps"]]} == off


# Near-identical repairs while Gate 5 checks stay red.

BODY = "".join(f"+  <p class=\"row-{i}\">Liên hệ {i}</p>\n" for i in range(30))


def red(origin="plan", cls=checks.CANDIDATE_WRONG, check=CHECK):
    return {"check": check, "base": False, "candidate": False, "class": cls, "origin": origin}


def red_round(execution, diff, rows=None, file="public/x.html"):
    rows = [red()] if rows is None else rows
    result = {"gate": 5, "blocked": True, "reason": "check đỏ trên cả base lẫn candidate: text_present /x.html",
              "failure_class": "ordinary", "risk_level": "low",
              "evidence": {"text": "x", **({"checks": {"verdict": checks.CODE_FAULT, "rows": rows}} if rows else {})}}
    execution.gates = [{"gate": 5, "blocked": True, "reason": result["reason"], "risk_level": "low"}]
    execution.last_result = result
    execution.state = {"diffs": [{"file": file, "diff": diff}]}
    return execution.repair_check()


def rounds(execution, rows=None):
    """Attempt 0 then two repairs whose diffs differ only in hunk headers and spacing."""
    return [red_round(execution, diff, rows) for diff in
            ("+ first try\n", BODY, "@@ -1,3 +1,4 @@\n" + BODY.replace("<p ", "<p  "))]


def test_two_near_identical_repairs_stop_and_classify_the_red_check(flags, replan_on):
    execution = _execution()
    execution.plan = plan_steps(revised={"reason": "r", "old": [OTHER]})  # revision used: a second suspect stops
    assert rounds(execution) == ["repair", "repair", "done"]
    assert len(execution.repairs) == 2
    row = execution.last_result["evidence"]["checks"]["rows"][0]
    assert row["class"] == checks.CHECK_SUSPECT and "gần trùng" in row["suspect"]
    assert execution.stop_note.startswith(f"{checks.CHECK_SUSPECT}: ") and "similarity" in execution.stop_note
    execution.verdict()
    assert execution.result["outcome"] == "blocked" and checks.CHECK_SUSPECT in execution.result["reason"]


def test_first_attempt_and_first_repair_alike_is_not_two_repairs(flags, replan_on):
    execution = _execution()
    assert [red_round(execution, BODY), red_round(execution, BODY)] == ["repair", "repair"]


def test_harness_check_is_never_replaced_and_stops_for_admin(flags, replan_on):
    execution = _execution()
    execution.plan = plan_steps()
    assert rounds(execution, [red("harness")])[-1] == "done"
    assert checks.SUSPECT_STOP in execution.stop_note and execution.kind == "ordinary"


def test_repairs_that_really_change_the_code_keep_repairing(flags, replan_on):
    execution = _execution()
    for diff in ("+ a\n", BODY, BODY.replace("Liên hệ", "Hotline").replace("row", "line")):
        assert red_round(execution, diff) == "repair"


def test_identical_repairs_without_red_check_rows_keep_today_path(flags, replan_on):
    execution = _execution()
    for diff in ("+ a\n", BODY, BODY):
        assert red_round(execution, diff, rows=[]) == "repair"


def test_flag_off_keeps_repairing(monkeypatch, replan_on):
    monkeypatch.delenv("AI_BOARD_RED_CHECK_CLASSIFY", raising=False)
    execution = _execution()
    assert rounds(execution) == ["repair"] * 3


# One check revision through the plan path.

def plan_steps(*, revised=None):
    step = {"order": 1, "allowed_scope": ["public/x.html"], "tests": ["v"], "checks": [CHECK]}
    return {"steps": [{**step, **({"check_revision": revised} if revised else {})}]}


SUSPECT = {**red(cls=checks.CHECK_SUSPECT), "suspect": "diff đã chứa giá trị yêu cầu: Liên hệ"}


def gate5(rows):
    return {"gate": 5, "blocked": False, "reason": None, "failure_class": "ordinary",
            "evidence": {"smoke_passed": True, "http_observed": True, "runner": "docker", "text": "x",
                         "functional": {"probe_id": "text", "passed": True, "needs_review": True,
                                        "check_suspect": [row["suspect"] for row in rows]},
                         "checks": {"verdict": checks.NONE, "rows": rows}}}


def run_gate5(execution, result):
    execution.run_gate = lambda *_args, **_kwargs: result
    execution.state = {"diffs": [{"file": "public/x.html", "diff": BODY}]}
    execution.kind = None
    return execution.gate(5)


def test_model_check_suspect_goes_back_to_plan_once_with_the_reason(flags, replan_on):
    execution = _execution()
    execution.plan = plan_steps()
    assert run_gate5(execution, gate5([SUSPECT])) == "blocked"
    assert execution.kind == "plan" and execution.gates[-1]["blocked"] is True
    execution.verdict()
    result = execution.result
    assert result["outcome"] == "blocked" and result["failure_class"] == "plan"
    old = worker_planner.revision_request({"ticket": {"internal_reason": result["reason"]}})
    assert old == [{"file": "public/x.html", "check": CHECK, "reason": SUSPECT["suspect"]}]


def test_marker_survives_the_stop_report_wrapper(flags):
    reason = stop_report.render(stop_report.build("blocked", worker_execution.revise_reason(
        [{"file": "public/x.html", "check": CHECK, "reason": "r"}], "gate"), 5, "plan", [3, 4, 5]))
    assert worker_planner.revision_request({"ticket": {"internal_reason": reason}})[0]["check"] == CHECK


@pytest.mark.parametrize("setup", ["replan_off", "revised", "harness"])
def test_no_revision_when_replan_is_off_already_used_or_harness_built(flags, monkeypatch, setup):
    execution = _execution()
    execution.plan = plan_steps(revised={"reason": "r", "old": [OTHER]} if setup == "revised" else None)
    monkeypatch.setattr(worker_execution, "REPAIR_REPLAN", {**worker_execution.REPAIR_REPLAN, "enabled": setup != "replan_off"})
    assert run_gate5(execution, gate5([{**SUSPECT, "origin": "harness" if setup == "harness" else "plan"}])) == "passed"
    assert execution.kind is None


def test_near_identical_model_check_goes_back_to_plan(flags, replan_on):
    execution = _execution()
    execution.plan = plan_steps()
    assert rounds(execution)[-1] == "done"
    assert execution.kind == "plan" and execution.stop_note.startswith(worker_execution.CHECK_REVISE)


class Trace:
    def __init__(self):
        self.spans = []

    def add_span(self, name, attributes, **_):
        self.spans.append((name, attributes))


def passing(execution, rows=()):
    functional = {"probe_id": "text", "passed": True, **({"check_suspect": [r["suspect"] for r in rows]} if rows else {})}
    execution.gates = [{"gate": 5, "blocked": False, "reason": None, "smoke_passed": True, "http_observed": True,
                        "runner": "docker", "functional": functional},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind = None
    execution.verdict()
    return execution.result


def test_revised_plan_reaches_needs_review_only_and_traces_old_new_and_reason(flags):
    execution = _execution()
    execution.deps = type("Deps", (), {"trace": Trace()})()
    execution.plan = plan_steps(revised={"reason": "diff đã chứa giá trị yêu cầu", "old": [OTHER]})
    result = passing(execution)
    assert result["outcome"] == "needs_review" and "diff đã chứa giá trị yêu cầu" in result["reason"]
    assert result["check_revision"] == [{"file": "public/x.html", "reason": "diff đã chứa giá trị yêu cầu",
                                         "old": [OTHER], "new": [CHECK]}]
    name, attributes = execution.deps.trace.spans[-1]
    assert name == "plan_revision.checks" and json.loads(attributes["tizia.check_revision"]) == result["check_revision"]


def test_second_suspect_after_revision_is_needs_review_naming_it(flags, replan_on):
    execution = _execution()
    execution.plan = plan_steps(revised={"reason": "r", "old": [OTHER]})
    result = passing(execution, [SUSPECT])
    assert result["outcome"] == "needs_review" and SUSPECT["suspect"] in result["reason"]


def test_flag_off_ignores_a_revision_record():
    execution = _execution()
    execution.plan = plan_steps(revised={"reason": "r", "old": [OTHER]})
    result = passing(execution)
    assert result["outcome"] == "ready_for_pr" and "check_revision" not in result


# Planner side.

def test_revision_request_needs_both_flags_and_a_well_formed_marker(monkeypatch, flags):
    reason = worker_execution.revise_reason([{"file": "public/x.html", "check": CHECK, "reason": "r"}], "x")
    assert worker_planner.revision_request({"ticket": {"internal_reason": reason}})
    assert worker_planner.revision_request({"ticket": {"internal_reason": "plan_inconsistent: x"}}) is None
    assert worker_planner.revision_request({"ticket": {"internal_reason": worker_execution.CHECK_REVISE + " [{"}}) is None
    monkeypatch.delenv("AI_BOARD_RED_CHECK_CLASSIFY")
    assert worker_planner.revision_request({"ticket": {"internal_reason": reason}}) is None


def test_stamp_puts_the_record_on_the_step_that_owned_the_check():
    old = [{"file": "public/y.html", "check": CHECK, "reason": "r1"}]
    plan = {"steps": [{"allowed_scope": ["public/x.html"]}, {"allowed_scope": ["public/y.html"], "checks": [OTHER]}]}
    worker_planner.stamp_revision(plan, old)
    assert "check_revision" not in plan["steps"][0]
    assert plan["steps"][1]["check_revision"] == {"reason": "r1", "old": [CHECK]}
    moved = {"steps": [{"allowed_scope": ["public/z.html"]}]}
    worker_planner.stamp_revision(moved, old)
    assert moved["steps"][0]["check_revision"]["old"] == [CHECK]
    assert worker_execution.revision_of(moved)[0]["new"] == []


def test_replan_lease_hands_the_reason_to_gate_1_and_stamps_the_new_plan(flags):
    from runtime.budgets.budget import Budget
    old = [{"file": "public/x.html", "check": OTHER, "reason": "diff đã chứa giá trị yêu cầu"}]
    snapshot = {"request": {"id": 3, "title": "Sửa trang", "detail": "thêm Liên hệ", "domain": "primary"},
                "ticket": {"internal_reason": stop_report.render(stop_report.build(
                    "blocked", worker_execution.revise_reason(old, "x"), 5, "plan", [3, 4, 5]))}}
    seen = []

    def run_gate(gate, request, deps, budget, state):
        seen.append(request.get("plan_repair"))
        if gate == 1:
            state["plan"] = old_plan(subtask(checks=[CHECK]))
        return {"gate": gate, "blocked": False}

    planner = worker_planner.HarnessPlanner.__new__(worker_planner.HarnessPlanner)
    planner.Budget, planner.deps, planner.run_gate = Budget, object(), run_gate
    plan, _ = planner(snapshot)
    assert "Cũ" in seen[0] and "đỏ trên base" in seen[0]
    assert plan["steps"][0]["checks"] == [CHECK]
    assert plan["steps"][0]["check_revision"] == {"reason": old[0]["reason"], "old": [OTHER]}
    assert "check_revision" not in planner({**snapshot, "ticket": {}})[0]["steps"][0]


def test_revision_note_names_the_old_check_and_the_red_green_rule():
    note = worker_planner.revision_note([{"file": "public/x.html", "check": CHECK, "reason": "diff đã có"}])
    assert "Liên hệ" in note and "diff đã có" in note and "đỏ trên base" in note
