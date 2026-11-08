import json

import skill_report


def _span(run, start, skill, result="ok", gate=3, child=0, name="chat m"):
    attrs = {"tizia.gate": gate, "tizia.child": child, "tizia.result": result}
    if skill:
        attrs["tizia.skill.id"] = skill
    return {"run_id": run, "start_ms": start, "name": name, "attributes_json": json.dumps(attrs)}


def test_uses_first_pass_repairs_and_outcomes_per_skill():
    spans = [
        _span(1, 10, "plan-core"),
        _span(2, 10, "plan-core", result="retry"), _span(2, 20, "plan-core", result="retry"), _span(2, 30, "plan-core"),
        _span(2, 5, "other"),
    ]
    runs = {1: "shipped", 2: "failed"}
    got = {r["skill"]: r for r in skill_report.rows(spans, runs)}
    assert got["plan-core"] == {"skill": "plan-core", "uses": 4, "runs": 2, "first_pass": 1, "units": 2,
                                "repair_rounds": 2, "outcomes": {"shipped": 1, "failed": 1}}
    assert got["other"]["first_pass"] == 1 and got["other"]["repair_rounds"] == 0


def test_first_pass_uses_earliest_span_not_input_order():
    spans = [_span(1, 20, "s"), _span(1, 10, "s", result="retry")]
    assert skill_report.rows(spans, {1: "shipped"})[0]["first_pass"] == 0


def test_skips_spans_without_skill_and_bad_json():
    spans = [_span(1, 1, None), {"run_id": 1, "start_ms": 2, "name": "chat m", "attributes_json": "{bad"},
             _span(1, 3, "s", name="execute_tool x")]
    assert skill_report.rows(spans, {1: "shipped"}) == []


def test_missing_run_outcome_is_unknown_and_table_renders():
    items = skill_report.rows([_span(9, 1, "s")], {})
    assert items[0]["outcomes"] == {"?": 1}
    assert skill_report.table(items).splitlines()[-1] == "| s | 1 | 1 | 1/1 | 0 | ?:1 |"
