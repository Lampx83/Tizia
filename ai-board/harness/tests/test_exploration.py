import json

from evaluation.pipeline import exploration as ex


def plan(scope=None, steps=None, evidence=None):
    p = {}
    if scope is not None:
        p["allowed_scope"] = scope
    if steps is not None:
        p["steps"] = steps
    if evidence is not None:
        p["grounding"] = {"evidence": [{"file": f} for f in evidence]}
    return p


def test_first_hit_compares_first_top_level_target():
    assert ex.first_hit(plan(["public/a.html", "x.js"]), "public/a.html") is True
    assert ex.first_hit(plan(["x.js", "public/a.html"]), "public/a.html") is False


def test_first_hit_normalises_separators_and_dot_prefix():
    assert ex.first_hit(plan([".\\public\\a.html"]), "public/a.html") is True


def test_first_hit_falls_back_to_steps_in_order():
    p = plan(steps=[{"allowed_scope": ["b.html"]}, {"allowed_scope": ["a.html"]}])
    assert ex.first_hit(p, "b.html") is True
    assert ex.first_hit(p, "a.html") is False


def test_first_hit_unknown_without_plan_or_label():
    assert ex.first_hit(None, "a.html") is None
    assert ex.first_hit(plan([]), "a.html") is None
    assert ex.first_hit(plan(["a.html"]), None) is None


def test_named_missing_file_true_when_any_named_path_absent():
    exists = lambda p: p in {"a.html"}
    assert ex.named_missing_file(plan(["a.html", "gone.js"]), exists) is True
    assert ex.named_missing_file(plan(["a.html"]), exists) is False


def test_named_missing_file_counts_grounding_evidence_files():
    exists = lambda p: p in {"a.html"}
    assert ex.named_missing_file(plan(["a.html"], evidence=["ghost.html"]), exists) is True
    assert ex.missing_files(plan(["a.html"], evidence=["ghost.html"]), exists) == ["ghost.html"]


def test_named_missing_file_unknown_without_plan():
    assert ex.named_missing_file(None, lambda p: True) is None


def span(gate, prompt, status="ok"):
    return {"gate": gate, "prompt": prompt, "status": status}


def test_planning_reads_counts_react_replies_at_gate_1_minus_finish():
    spans = [span("1", "react_plan.md")] * 4 + [span("1", "classifier_danger"), span("2.5", "plan_validate.md")]
    assert ex.planning_reads(spans, has_plan=True) == 3


def test_planning_reads_without_plan_counts_every_reply():
    assert ex.planning_reads([span("1", "react_plan.md")] * 2, has_plan=False) == 2


def test_planning_reads_zero_and_unknown():
    assert ex.planning_reads([span("1", "brainstorm.md")], has_plan=True) == 0
    assert ex.planning_reads([], has_plan=True) == 0
    assert ex.planning_reads(None, has_plan=True) is None


def test_fetch_plan_and_spans_parse_query_rows():
    seen = []

    def query(sql):
        seen.append(sql)
        if "ai_plans" in sql:
            return {"plan": {"allowed_scope": ["a.html"]}}
        return [span("1", "react_plan.md")]

    assert ex.fetch_plan(7, query) == {"allowed_scope": ["a.html"]}
    assert ex.fetch_spans(9, query) == [span("1", "react_plan.md")]
    assert "root_ticket_id=7" in seen[0] and "source_request_id = 9" in seen[1]


def test_fetch_plan_none_when_no_row():
    assert ex.fetch_plan(7, lambda sql: None) is None


def test_for_record_returns_three_fields_from_fakes():
    rows = {"ai_plans": {"plan": plan(["public/a.html"])},
            "ai_spans": [span("1", "react_plan.md")] * 2}

    def query(sql):
        return rows["ai_plans" if "ai_plans" in sql else "ai_spans"]

    rec = {"root_ticket_id": 7, "request_id": 9, "pin": "abc", "file": "public/a.html"}
    out = ex.for_record(rec, query, lambda pin: lambda p: pin == "abc")
    assert out == {"first_hit": True, "named_missing_file": False, "planning_reads": 1}


def test_for_record_never_raises_and_reports_error():
    def boom(sql):
        raise RuntimeError("db down")

    out = ex.for_record({"root_ticket_id": 7, "request_id": 9, "pin": "abc"}, boom, lambda pin: lambda p: True)
    assert out["exploration_error"].startswith("RuntimeError: db down")


def test_for_record_flags_missing_ids():
    out = ex.for_record({"pin": "abc"}, lambda sql: None, lambda pin: lambda p: True)
    assert "exploration_error" in out


def test_case_kind_from_vague_ids(tmp_path):
    f = tmp_path / "v.json"
    f.write_text(json.dumps({"cases": [{"id": "vague-x-1"}]}), encoding="utf-8")
    ids = ex.vague_case_ids(f)
    assert ex.case_kind("vague-x-1", ids) == "vague"
    assert ex.case_kind("css_color-l1-1", ids) == "dev"


def test_report_groups_by_arm_and_kind_with_known_denominators():
    rows = [
        {"arm": "B0", "kind": "dev", "first_hit": True, "named_missing_file": False, "planning_reads": 0},
        {"arm": "B0", "kind": "dev", "first_hit": False, "named_missing_file": None, "planning_reads": None},
        {"arm": "B1", "kind": "vague", "first_hit": True, "named_missing_file": True, "planning_reads": 2},
    ]
    text = ex.report(rows, tool_loop=lambda arm: arm != "B0")
    b0 = [line for line in text.splitlines() if line.startswith("| B0 | no | dev")][0]
    assert "| 2 | 1/2 | 0/1 | 0.00 (1) |" in b0
    b1 = [line for line in text.splitlines() if line.startswith("| B1 | yes | vague")][0]
    assert "| 1 | 1/1 | 1/1 | 2.00 (1) |" in b1


def test_backfill_record_adds_fields_only_to_known_keys():
    rec = {"arm": "B0", "case": "c", "root_ticket_id": 7, "request_id": 9, "pin": "abc", "file": "a.html"}
    out = ex.for_record(rec, lambda sql: {"plan": plan(["a.html"])} if "ai_plans" in sql else [], lambda pin: lambda p: True)
    assert set(out) == {"first_hit", "named_missing_file", "planning_reads"}
