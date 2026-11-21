"""AI_BOARD_SUBTASK_FRESH_CONTEXT: each subtask is a child session that gets the plan, files so far and short
summaries of earlier subtasks; the root keeps plan + summaries; sequential. Flag off = unchanged."""
import pytest

from conftest import deps_with
from gates import implement
from runtime.budgets.budget import Budget
from settings import Settings
from test_parallel_subtasks import FileModels, MemProgress, plan_of, run_gate_3, step

FLAG = "AI_BOARD_SUBTASK_FRESH_CONTEXT"
PLAN = lambda: plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1]), step("public/c.html", deps=[2]))


def run_with(tmp_path, plan, models, state, scratch=None, budget=None):
    from test_parallel_subtasks import source
    state.update(plan=plan, checkout_source=str(source(tmp_path)))
    return implement.run(state, deps_with(models), budget or Budget(max_wall_clock_s=999), repo_dir=scratch or tmp_path / "scratch")


def prompt_of(models, file):
    return next(c["prompt"] for c in models.calls if f"- file: {file}" in c["prompt"])


class Trace:
    def __init__(self):
        self.notes = []

    def note(self, kind, name, summary="", data=None):
        self.notes.append((kind, name, summary))

    def record(self, **kw):
        pass

    def attach_last(self, *a, **k):
        pass

    def mark_last(self, *a, **k):
        pass


def test_flag_defaults_off():
    assert Settings().subtask_fresh_context is False


def test_flag_off_prompt_and_state_unchanged(tmp_path):
    models = FileModels(PLAN())
    state = {}
    out = run_gate_3(tmp_path, models.plan, models, state=state)
    assert out["blocked"] is False
    assert "EARLIER STEPS" not in prompt_of(models, "public/b.html")
    assert "PLAN" not in prompt_of(models, "public/b.html").split("FILES CREATED")[-1]
    assert "subtask_summaries" not in state


def test_child_gets_plan_files_and_earlier_summaries(tmp_path, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    models = FileModels(PLAN())
    state = {}
    out = run_with(tmp_path, models.plan, models, state)
    assert out["blocked"] is False, out.get("reason")
    first, second, third = (prompt_of(models, f"public/{x}.html") for x in "abc")
    assert "EARLIER STEPS" not in first and "PLAN (every step" in first
    assert "public/b.html" in first and "public/c.html" in first  # plan lists every step
    assert "EARLIER STEPS" in second and "Trang public/a.html" in second.split("EARLIER STEPS")[1]
    assert "public/c.html" not in second.split("EARLIER STEPS")[1]
    third_earlier = third.split("EARLIER STEPS")[1]
    assert "public/a.html" in third_earlier and "public/b.html" in third_earlier
    assert "<p>" not in second.split("EARLIER STEPS")[1]  # summary, not the code
    assert [s["file"] for s in state["subtask_summaries"]] == ["public/a.html", "public/b.html", "public/c.html"]


def test_independent_subtasks_run_one_at_a_time(tmp_path, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setenv("AI_BOARD_FANOUT_MAX", "4")
    plan = plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[]))
    models = FileModels(plan)
    out = run_gate_3(tmp_path, plan, models)
    assert out["blocked"] is False
    assert models.order == [("start", "public/a.html"), ("end", "public/a.html"),
                            ("start", "public/b.html"), ("end", "public/b.html")]


def test_resume_continues_at_next_subtask_with_earlier_summary(tmp_path, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    checkpoint = MemProgress()
    plan = PLAN()
    run_with(tmp_path, plan, FileModels(plan), {"checkpoint": checkpoint}, budget=Budget(max_model_calls=1, max_wall_clock_s=999))
    resumed = FileModels(plan)
    state = {"checkpoint": checkpoint}
    out = run_with(tmp_path, plan, resumed, state, scratch=tmp_path / "again")
    assert out["blocked"] is False, out.get("reason")
    assert [c for c in resumed.order if c[0] == "start"] == [("start", "public/b.html"), ("start", "public/c.html")]
    assert "Trang public/a.html" in prompt_of(resumed, "public/b.html").split("EARLIER STEPS")[1]
    assert len(state["subtask_summaries"]) == 3


def test_trace_shows_subtasks_in_order_with_summary(tmp_path, monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    models = FileModels(PLAN())
    import dataclasses
    trace = Trace()
    deps = dataclasses.replace(deps_with(models), trace=trace)
    state = {"plan": models.plan, "checkout_source": str(__import__("test_parallel_subtasks").source(tmp_path))}
    implement.run(state, deps, Budget(max_wall_clock_s=999), repo_dir=tmp_path / "s")
    rows = [n for n in trace.notes if n[1] == "subtask done"]
    assert [r[2].split(" | ")[0] for r in rows] == ["1/3", "2/3", "3/3"]
    assert "public/a.html" in rows[0][2]
