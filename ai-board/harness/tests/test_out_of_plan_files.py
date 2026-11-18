"""AI_BOARD_OUT_OF_PLAN_FILES: admin edits files outside the plan inside the role's zone, 8-file cap, needs_review at most,
logic files need test cover, deny zone blocked. Flag off = unchanged."""
import json

import pytest

import path_policy
import tools
from gates import static_check
from runtime import stop_report, tool_loop
from runtime.budget import Budget

FLAG, ZONE = "AI_BOARD_OUT_OF_PLAN_FILES", "AI_BOARD_ADMIN_BACKEND_ZONE"
SUBTASK = {"title": "t", "file": "public/a.js", "verify": "node --test"}
OTHER = "server/contexts/content/lessons.js"


def edit(file):
    return {"tool": "edit_file", "arguments": {"file": file, "edits": [{"after_line": 0, "insert": "x"}]}}


TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "// public/a.js\n"}}
FINISH = {"tool": "finish", "arguments": {}}


class Deps:
    def __init__(self, script):
        self.script = list(script)

    def call_model(self, model, prompt, *, budget, **kw):
        budget.spend("model_calls")
        budget.spend("tokens", 100)
        return {"response": json.dumps(self.script.pop(0))}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: "")


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setenv(ZONE, "1")


def loop(script, role="admin"):
    return tool_loop.run_subtask(SUBTASK, "", deps=Deps(script), budget=Budget(), model="m", source=".", sha="abc",
                                 check=lambda out: None, requester_role=role)


def test_flag_defaults_off():
    from settings import Settings
    assert Settings().out_of_plan_files is False


def test_flag_off_policy_and_loop_unchanged(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    assert path_policy.outside_plan_ok(OTHER, "admin") is False
    out = loop([edit("public/a.js"), edit(OTHER)])
    assert out["status"] == "blocked" and "ngoài phạm vi" in out["reason"]


def test_policy_roles_and_deny_zone(on):
    assert path_policy.outside_plan_ok(OTHER, "admin") is True
    assert path_policy.outside_plan_ok(OTHER, "student") is False
    for path in ("server/index.js", "server/contexts/payment/x.js", "ai-board/harness/x.py", ".github/workflows/ci.yml"):
        assert path_policy.outside_plan_ok(path, "admin") is False, path


def test_one_out_of_plan_file_is_allowed_and_marked(on):
    out = loop([edit("public/a.js"), edit(OTHER), TEST, FINISH])
    assert out["status"] == "proposed"
    assert set(out["out"]["extra_files"]) == {OTHER} and out["out"]["out_of_plan"] == [OTHER]


def test_student_never_edits_outside_the_plan(on):
    out = loop([edit("public/a.js"), edit(OTHER)], role="student")
    assert out["status"] == "blocked" and "ngoài phạm vi" in out["reason"]


def test_deny_zone_file_is_blocked(on):
    out = loop([edit("public/a.js"), edit("server/index.js")])
    assert out["status"] == "blocked" and out["failure_class"] == "critical"
    assert "server/index.js" in out["reason"]


def test_nine_files_stop_with_scope_too_large(on):
    files = [f"server/contexts/content/f{i}.js" for i in range(8)]
    out = loop([edit("public/a.js"), *(edit(f) for f in files)])
    assert out["status"] == "blocked" and "scope too large" in out["reason"]
    assert stop_report.classify("blocked", out["reason"], 3, "critical") == "scope_too_large"


def test_eight_files_including_test_are_within_the_cap(on):
    files = [f"server/contexts/content/f{i}.js" for i in range(6)]
    out = loop([edit("public/a.js"), *(edit(f) for f in files), TEST, FINISH])
    assert out["status"] == "proposed"


def test_test_file_counts_toward_the_cap(on):
    files = [f"server/contexts/content/f{i}.js" for i in range(7)]
    out = loop([edit("public/a.js"), *(edit(f) for f in files), TEST])
    assert out["status"] == "blocked" and "scope too large" in out["reason"]


def _state(tmp_path, extras, test_text=None, role="admin"):
    diffs = [{"file": "public/a.js", "test_file": "test/a.test.js" if test_text is not None else None,
              "diff": "", "extra_files": extras}]
    if test_text is not None:
        (tmp_path / "test").mkdir()
        (tmp_path / "test" / "a.test.js").write_text(test_text, encoding="utf-8")
    plan = {"subtasks": [{"title": "t", "file": "public/a.js", "verify": "v", "size": "small"}]}
    return {"plan": plan, "diffs": diffs, "scratch_repo": str(tmp_path), "requester_role": role}


def test_gate4_marks_in_and_out_of_plan_files(on, tmp_path):
    out = static_check.run(_state(tmp_path, [OTHER], "// lessons.js and public/a.js\n"), check_size=False)
    assert out["blocked"] is False
    assert out["files"] == {"in_plan": ["public/a.js"], "out_of_plan": [OTHER]}


def test_gate4_logic_file_without_cover_goes_back_once_then_stops(on, tmp_path):
    state = _state(tmp_path, [OTHER], "// only public/a.js\n")
    first = static_check.run(state, check_size=False)
    assert first["blocked"] and first["failure_class"] == "ordinary" and "thiếu test phủ" in first["reason"]
    second = static_check.run(state, check_size=False)
    assert second["blocked"] and second["failure_class"] == "critical"


def test_gate4_display_file_needs_no_cover(on, tmp_path):
    out = static_check.run(_state(tmp_path, ["public/b.css"], "// public/a.js\n"), check_size=False)
    assert out["blocked"] is False and out["files"]["out_of_plan"] == ["public/b.css"]


def test_gate4_nine_touched_files_stop(on, tmp_path):
    extras = [f"server/contexts/content/f{i}.js" for i in range(8)]
    out = static_check.run(_state(tmp_path, extras, "x\n"), check_size=False)
    assert out["blocked"] and out["failure_class"] == "critical" and "scope too large" in out["reason"]


def test_gate4_out_of_plan_in_deny_zone_blocks(on, tmp_path):
    out = static_check.run(_state(tmp_path, ["server/index.js"], "// public/a.js\n"), check_size=False)
    assert out["blocked"] and "ngoài plan" in out["reason"]


def test_gate4_flag_off_out_of_plan_still_blocks(monkeypatch, tmp_path):
    monkeypatch.delenv(FLAG, raising=False)
    out = static_check.run(_state(tmp_path, [OTHER], "// public/a.js\n"), check_size=False)
    assert out["blocked"] and "files" not in out


def test_out_of_plan_run_reaches_at_most_needs_review(on):
    import test_exec_graph  # noqa: F401 puts ai-board/ on sys.path
    import worker
    plan = {"subtasks": [{"file": "public/a.js"}]}
    execution = worker._Execution(plan, ticket_id=1, checkout_source=".", deps=None, budget=None, run_gate=None, cleanup=None,
                                  catalog=None, request_detail=None, memory_path=None, should_stop=None, candidate_opts=None,
                                  request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    files = {"in_plan": ["public/a.js"], "out_of_plan": [OTHER]}
    execution.gates = [{"gate": 4, "blocked": False, "files": files},
                       {"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker",
                        "functional": {"passed": True, "oracle_passed": True}},
                       {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]
    execution.kind = None
    execution.verdict()
    assert execution.result["outcome"] == "needs_review" and OTHER in execution.result["reason"]
    assert execution.result["files"] == files
