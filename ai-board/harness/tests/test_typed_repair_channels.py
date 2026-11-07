from budget import Budget
from conftest import FakeModels, deps_with, plan_with
from gates import plan_validate

HINT = "LƯU Ý SỬA PLAN: không dùng lại file của plan bị từ chối"


def test_gate_25_validator_never_sees_the_plan_repair_hint():
    plan = plan_with(["features"])
    request = {"subject": "Thêm trang", "body": "trang mới", "type": "feature", "plan_repair": HINT,
               "thread": [{"role": "requester", "body": "trang mới"}]}
    models = FakeModels(plan)

    plan_validate.run(request, deps_with(models), Budget(), {"plan": plan})

    validator_calls = [c for c in models.calls if "PLAN TO CHECK" in c["prompt"]]
    assert validator_calls and all(HINT not in c["prompt"] for c in validator_calls)


def test_validator_prompt_builder_ignores_the_repair_channel():
    plan = plan_with(["features"])
    request = {"subject": "s", "body": "b", "plan_repair": HINT}
    assert HINT not in plan_validate.build_prompt(request, plan)


def test_validator_declared_inputs_exclude_the_planner_channel():
    assert "plan_repair" not in plan_validate.VALIDATOR_INPUTS


def test_validator_prompt_is_unchanged_by_the_planner_only_key():
    plan = plan_with(["features"])
    base = {"subject": "s", "body": "b", "thread": [{"role": "requester", "body": "x"}]}
    assert plan_validate.build_prompt({**base, "plan_repair": HINT}, plan) == plan_validate.build_prompt(base, plan)


def test_only_the_planner_declares_the_plan_repair_input():
    from gates import brainstorm
    assert "plan_repair" in brainstorm.PLANNER_INPUTS
    assert "plan_repair" not in plan_validate.VALIDATOR_INPUTS


def test_only_the_planner_reads_the_plan_repair_channel():
    import re
    from pathlib import Path

    gates = Path(__file__).resolve().parents[1] / "gates"
    readers = {path.name for path in gates.glob("*.py") if re.search(r"""\.get\(["']plan_repair["']\)|\[["']plan_repair["']\]""", path.read_text(encoding="utf8"))}
    assert readers == {"brainstorm.py"}
