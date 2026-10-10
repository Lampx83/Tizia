"""Checkpoint cấp worker: identity ổn định ticket+plan, ledger nạp lại, purge theo kết luận. PG thật cần TEST_PG_URL."""
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

import tools
from conftest import connect
from repositories.tool_steps import Checkpoint
from runtime import tool_loop
from runtime.budget import Budget
from test_tool_loop import EDIT, FINISH, PAGE, SUBTASK, TEST, Deps
from worker import execute_pre_pr

PLAN = {"steps": [{"order": 1, "allowed_scope": ["public/a.html"], "tests": ["t"]}], "capabilities": []}


class Crash(BaseException):
    """BaseException: _attempt chỉ nuốt Exception, nên giả lập process chết."""


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


@pytest.fixture
def pg(db_file, monkeypatch):
    monkeypatch.setenv("DATABASE_URL", db_file)
    monkeypatch.setenv("AI_BOARD_TOOL_LOOP", "1")
    return db_file


def count(dsn, table):
    with connect(dsn) as con:
        return con.execute(f"SELECT count(*) FROM {table}").fetchone()[0]


def execute(script, gate4, budget, plan=PLAN, seen=None, plan_hash=None):
    """execute_pre_pr với cổng 3 chạy tool_loop thật qua state['checkpoint']; cổng 4 do `gate4`."""
    deps = Deps(script)

    def run_gate(gate, _request, _deps, bud, state):
        if gate == 3:
            if seen is not None:
                seen["calls_on_entry"] = bud.model_calls
            state["base_sha"] = "abc"
            out = tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=bud, model="m", source=".", sha="abc",
                                        check=lambda o: None, store=state["checkpoint"].store("abc", 1))
            return {"gate": 3, "blocked": out["status"] != "proposed", "reason": out["reason"],
                    "failure_class": out["failure_class"]}
        return gate4(gate)

    result = execute_pre_pr(plan, ticket_id=7, checkout_source=".", deps=object(), budget=budget, run_gate=run_gate,
                            cleanup=lambda *_a, **_k: None, **({"plan_hash": plan_hash} if plan_hash else {}))
    return result, deps


def block(kind):
    return lambda gate: {"gate": gate, "blocked": True, "reason": "x", "failure_class": kind}


def die(_gate):
    raise Crash()


def test_flag_off_never_touches_postgres(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgres://nowhere.invalid/x")
    monkeypatch.delenv("AI_BOARD_TOOL_LOOP", raising=False)
    seen = {}

    def run_gate(gate, _request, _deps, _budget, state):
        seen.update(state)
        return {"gate": gate, "blocked": True, "reason": "x", "failure_class": "plan"}

    execute_pre_pr(PLAN, ticket_id=7, checkout_source=".", deps=object(), budget=Budget(), run_gate=run_gate,
                   cleanup=lambda *_a, **_k: None)
    assert "checkpoint" not in seen


def test_crash_after_gate3_resumes_with_ledger_and_without_new_model_calls(pg):
    with pytest.raises(Crash):
        execute([EDIT, TEST, FINISH], die, Budget())
    assert count(pg, "tool_step") == 3 and count(pg, "tool_run") == 2

    seen = {}
    result, deps = execute([EDIT], block("plan"), Budget(), seen=seen)
    assert seen["calls_on_entry"] == 3  # ledger worker nạp trước cổng 3
    assert deps.prompts == [] and result["failure_class"] == "plan"
    assert count(pg, "tool_step") == 0 and count(pg, "tool_run") == 0  # kết luận cuối → purge


def test_crash_in_the_middle_of_gate3_continues_from_the_recorded_step(pg):
    class Dies(Deps):
        def call_model(self, *a, **kw):
            if len(self.prompts) == 2:
                raise Crash()
            return super().call_model(*a, **kw)

    deps = Dies([EDIT, TEST])
    store_budget = Budget()

    def run_gate(gate, _r, _d, bud, state):
        state["base_sha"] = "abc"
        tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=bud, model="m", source=".", sha="abc",
                              check=lambda o: None, store=state["checkpoint"].store("abc", 1))

    with pytest.raises(Crash):
        execute_pre_pr(PLAN, ticket_id=7, checkout_source=".", deps=object(), budget=store_budget, run_gate=run_gate,
                       cleanup=lambda *_a, **_k: None)

    result, deps = execute([FINISH], block("plan"), Budget())
    assert len(deps.prompts) == 1 and result["gate_reached"] == 4  # chỉ gọi model cho bước finish


@pytest.mark.parametrize("kind,rows_left", [("transient", True), ("critical", True), ("ordinary", False), ("budget", False)])
def test_only_final_outcomes_purge(pg, kind, rows_left):
    execute([EDIT, TEST, FINISH], block(kind), Budget(), plan={**PLAN, "k": kind})
    assert (count(pg, "tool_step") > 0) is rows_left


def test_a_different_plan_does_not_resume_the_old_checkpoint(pg):
    with pytest.raises(Crash):
        execute([EDIT, TEST, FINISH], die, Budget())
    result, deps = execute([EDIT, TEST, FINISH], block("plan"), Budget(), plan={**PLAN, "capabilities": ["x"]})
    assert len(deps.prompts) == 3


def scopes(dsn):
    with connect(dsn) as con:
        return {r[0] for r in con.execute("SELECT run_scope FROM tool_run")}


def test_server_plan_hash_names_the_checkpoint_scope_and_resumes_across_a_plan_edit(pg):
    with pytest.raises(Crash):
        execute([EDIT, TEST, FINISH], die, Budget(), plan_hash="a1" * 32)
    assert scopes(pg) == {"ticket-7:" + "a1" * 8}
    result, deps = execute([EDIT], block("plan"), Budget(), plan={**PLAN, "cosmetic": "x"}, plan_hash="a1" * 32)
    assert deps.prompts == [] and result["failure_class"] == "plan"  # cùng plan_hash server → cùng checkpoint dù JSON plan lệch


def test_missing_server_plan_hash_falls_back_to_local_digest(pg):
    with pytest.raises(Crash):
        execute([EDIT, TEST, FINISH], die, Budget())
    (scope,) = scopes(pg)
    assert scope.startswith("ticket-7:") and len(scope) == len("ticket-7:") + 16


def test_attempts_and_base_shas_get_distinct_keys():
    root = Checkpoint("dsn", "ticket-1:p")
    keys = {root.attempt(0).store("a", 1).proposal_id, root.attempt(1).store("a", 1).proposal_id,
            root.attempt(0).store("b", 1).proposal_id}
    assert len(keys) == 3 and all(0 < k < 2 ** 63 for k in keys)
