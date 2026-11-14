"""Replay of flag plan_validate_clarify_rules at Gate 2.5: offline filters, verdict vocabulary, missing inputs."""
import json

from evaluation import replay_gate25 as rg

REQUEST = {"subject": "Đổi chữ nút 'Cũ' thành 'Mới'", "body": "Trang bài giảng, nút 'Cũ' đổi thành 'Mới'."}
PLAN = {"subtasks": [{"title": "Đổi 'Cũ' thành 'Mới'", "file": "public/lesson.html", "verify": "x"}]}


def _case(**over):
    base = {"id": "c", "group": "ticket", "want": rg.WANT_DROP, "request": REQUEST, "plan": PLAN,
            "question": "Hỏi thêm?", "verbatim": True, "repo_context": None, "file": "public/lesson.html", "verify": ""}
    return {**base, **over}


def test_flag_off_keeps_flag_on_drops_named_edit():
    off = rg.post_filter("Bạn muốn đổi thế nào?", REQUEST, PLAN, False)
    on = rg.post_filter("Bạn muốn đổi thế nào?", REQUEST, PLAN, True)
    assert off["question"] and on["question"] is None and on["dropped_by"] == "names_edit"


def test_repo_rule_question_dropped_without_plan():
    on = rg.post_filter("Có cấm onclick= không?", REQUEST, None, True)
    assert on["question"] is None and on["repo_rule"] and on["names_edit"] is None


def test_ambiguous_request_still_asked():
    vague = {"subject": "Đổi màu nút cho đẹp", "body": "đẹp hơn nhé"}
    assert rg.post_filter("Màu nào?", vague, PLAN, True)["question"] == "Màu nào?"


def test_missing_plan_without_rule_is_not_measurable():
    row = rg.run_offline([_case(plan=None)])[0]
    assert row["result"] == "not_measurable" and row["names_edit"] is None


def test_missing_question_is_not_measurable():
    assert rg.run_offline([_case(question=None)])[0]["why"] == "no saved question"


def test_paraphrased_ticket_question_never_judged():
    row = rg.run_offline([_case(verbatim=False)])[0]
    assert row["result"] == "not_measurable" and "paraphrase only" in row["why"]


def test_verdicts():
    ticket = _case(question="Bạn muốn đổi thế nào?")
    ctl = _case(id="k", group="control", want=rg.WANT_ASK, request={"subject": "đẹp hơn", "body": "ok"}, question="Màu nào?")
    assert rg.verdict(rg.run_offline([ticket, ctl])) == "PASS"
    assert rg.verdict(rg.run_offline([_case(plan=None, question="Màu nào?"), ctl])) == "NOT MEASURABLE"
    bad = _case(id="k2", group="control", want=rg.WANT_ASK, question="Bạn muốn đổi thế nào?")
    assert rg.verdict(rg.run_offline([ticket, bad])) == "FAIL at stage"
    stuck = _case(request={"subject": "đẹp hơn", "body": "ok"}, question="Màu nào?")
    assert rg.verdict(rg.run_offline([stuck, ctl])) == "FAIL at stage"


def test_build_cases_reads_trials_inputs_and_controls(tmp_path):
    trials, inputs = tmp_path / "trials", tmp_path / "in"
    trials.mkdir(), inputs.mkdir()
    (trials / "B0-r1-css_color-l1-aaaaaa.json").write_text(json.dumps({"outcome": "needs_clarification"}))
    (trials / "B0-r2-css_color-l1-bbbbbb.json").write_text(json.dumps({"outcome": "ready_for_pr"}))
    (inputs / "B0-r1-css_color-l1-aaaaaa.json").write_text(json.dumps({"plan": PLAN, "question": "Q?"}))
    dev = tmp_path / "dev.json"
    dev.write_text(json.dumps([{"id": "css_color-l1-aaaaaa", "title": "t", "detail": "d", "file": "public/a.html", "verify": "v"}]))
    cases = {c["id"]: c for c in rg.build_cases(trials, dev, inputs)}
    assert "B0-r2-css_color-l1-bbbbbb" not in cases
    got = cases["B0-r1-css_color-l1-aaaaaa"]
    assert got["plan"] == PLAN and got["verbatim"] and got["request"] == {"subject": "t", "body": "d"}
    assert set(rg.TICKET) <= set(cases) and sum(c["group"] == "control" for c in cases.values()) == 6


def test_synth_plan_needs_dev_case():
    assert rg.synth_plan(_case(file=None)) is None
    assert rg.synth_plan(_case())["subtasks"][0]["file"] == "public/lesson.html"


def test_table_prints_verdict():
    text = rg.table(rg.run_offline([_case(question="Bạn muốn đổi thế nào?")]))
    assert "VERDICT AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES" in text and "dropped" in text
