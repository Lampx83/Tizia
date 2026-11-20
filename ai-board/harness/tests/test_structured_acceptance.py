"""Structured feature acceptance: fixed fields -> deterministic check + Vietnamese sentence; requester approval freezes the checks."""
import copy

import pytest

from gates import acceptance_structure as acc, brainstorm, ready_oracle
from verification import checks

SEE = {"page": "/gallery.html", "text": "Thư viện ảnh", "action": "see"}
GONE = {"page": "/gallery.html", "text": "Sắp ra mắt", "action": "not_see"}
BOX = {"page": "/gallery.html", "element": "#save-btn", "action": "see"}
STYLE = {"page": "/gallery.html", "element": ".card", "action": "style", "expect": "color: #16a34a"}
FEATURE = {"type": "feature", "subject": "thêm thư viện", "body": ""}


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PLAN_CHECKS", "1")


def plan(*criteria, files=("public/gallery.html",)):
    return {"summary_vi": "x", "subtasks": [{"file": f, "title": "t", "verify": "v", "size": "small"} for f in files],
            "criteria": list(criteria)}


def test_check_and_sentence_for_each_action():
    assert acc.check_of(SEE) == {"primitive": "text_present", "path": "/gallery.html", "text": "Thư viện ảnh"}
    assert acc.check_of(GONE)["primitive"] == "text_absent"
    assert acc.check_of(BOX) == {"primitive": "selector_exists", "path": "/gallery.html", "selector": "#save-btn"}
    assert acc.check_of(STYLE) == {"primitive": "computed_style", "path": "/gallery.html", "selector": ".card",
                                   "prop": "color", "value": "rgb(22, 163, 74)"}
    assert acc.sentence_of(SEE) == 'Trang /gallery.html hiển thị chữ "Thư viện ảnh".'
    assert acc.sentence_of(GONE) == 'Trang /gallery.html không còn chữ "Sắp ra mắt".'
    assert acc.sentence_of(BOX) == 'Trang /gallery.html có phần tử "#save-btn".'
    assert acc.sentence_of(STYLE) == 'Trên trang /gallery.html, phần tử ".card" có color là rgb(22, 163, 74).'


def test_same_structure_same_check_and_sentence():
    assert acc.check_of(dict(SEE)) == acc.check_of(copy.deepcopy(SEE))
    assert acc.sentence_of(dict(STYLE)) == acc.sentence_of(copy.deepcopy(STYLE))


@pytest.mark.parametrize("bad", [
    {**SEE, "action": "click"},
    {**SEE, "element": "#a"},
    {"page": "/p.html", "action": "see"},
    {**BOX, "action": "not_see"},
    {**STYLE, "expect": "red"},
    {"page": "/p.html", "text": "x", "action": "style", "expect": "color: red"},
    {**SEE, "expect": "x"},
    {**SEE, "page": "gallery.html"},
    {**SEE, "extra": 1},
    {k: v for k, v in SEE.items() if k != "page"},
    "see",
])
def test_unusable_structures_are_refused(on, bad):
    assert plan(bad) and acc.problems(plan(bad))


def test_usable_structures_pass_and_flag_off_is_silent(on, monkeypatch):
    assert acc.problems(plan(SEE, GONE, BOX, STYLE)) == []
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS")
    assert acc.problems(plan({"junk": 1}), FEATURE) == []
    assert acc.prompt_block(FEATURE) == ""


def test_feature_without_criteria_is_a_fault_other_kinds_are_not(on):
    bare = {"summary_vi": "x", "subtasks": []}
    assert acc.problems(bare, FEATURE)
    assert acc.problems(bare, {"type": "bug"}) == []


def test_criteria_count_is_capped(on):
    assert acc.problems(plan(*[SEE] * (checks.MAX_CHECKS + 1)))


def test_apply_puts_checks_on_the_page_subtask_and_replaces_model_checks(on):
    p = plan(SEE, STYLE, files=("public/app.js", "public/gallery.html"))
    p["subtasks"][0]["checks"] = [{"primitive": "text_present", "path": "/x.html", "text": "tự viết"}]
    acc.apply(p)
    assert "checks" not in p["subtasks"][0]
    assert [c["primitive"] for c in p["subtasks"][1]["checks"]] == ["text_present", "computed_style"]
    assert p["subtasks"][1]["checks_source"] == "structured"
    assert checks.plan_problems(p) == []


def test_apply_falls_back_to_last_subtask_and_is_idempotent(on):
    p = plan(SEE, files=("public/app.js", "public/other.html"))
    acc.apply(p)
    first = copy.deepcopy(p)
    acc.apply(p)
    assert p == first and p["subtasks"][1]["checks"]


def test_apply_is_a_noop_with_flag_off_or_bad_criteria(on, monkeypatch):
    bad = plan({**SEE, "action": "click"})
    before = copy.deepcopy(bad)
    assert acc.apply(bad) == before
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS")
    good = plan(SEE)
    assert "checks" not in acc.apply(good)["subtasks"][0]


def test_pin_follows_the_criteria(on):
    a, b = plan(SEE), plan({**SEE, "text": "Khác"})
    assert checks.pin(acc.apply(a)) != checks.pin(acc.apply(b))


def test_prompt_block_only_for_feature_with_flag_on(on):
    assert "criteria" in acc.prompt_block(FEATURE)
    assert acc.prompt_block({"type": "bug"}) == ""
    assert "criteria" in brainstorm.build_prompt(FEATURE, frozenset())
    assert "criteria" not in brainstorm.build_prompt({"type": "bug"}, frozenset())


def test_prompt_is_unchanged_with_flag_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS", raising=False)
    assert "ACCEPTANCE CRITERIA" not in brainstorm.build_prompt(FEATURE, frozenset())


def thread_after(p, reply, *, head_plan=None):
    return [{"role": "requester", "body": "thêm thư viện"},
            {"role": "admin", "body": acc.approval_text(head_plan or p)},
            {"role": "requester", "body": reply}]


def test_unasked_plan_writes_the_sentences_and_waits(on):
    p, sent, state = acc.apply(plan(SEE, GONE)), [], {}
    out = acc.stop(FEATURE, p, state, write=lambda req, text: sent.append(text))
    assert out["outcome"] == "needs_clarification" and out["blocked"]
    assert sent == [out["public_message"]]
    assert acc.sentences(p)[0] in out["public_message"] and "1. " in out["public_message"]
    assert "approved_checks" not in state


@pytest.mark.parametrize("reply", ["Đồng ý", "đồng ý.", "OK", "được"])
def test_affirmative_reply_approves_and_freezes_the_pin(on, reply):
    p, state = acc.apply(plan(SEE, GONE)), {}
    assert acc.stop({**FEATURE, "thread": thread_after(p, reply)}, p, state) is None
    assert state["approved_checks"] == checks.collect(p) and state["approved_pin"] == checks.pin(p)


def test_other_reply_or_changed_sentences_ask_again(on):
    p = acc.apply(plan(SEE, GONE))
    assert acc.stop({**FEATURE, "thread": thread_after(p, "đổi chữ thành Album")}, p, {})["outcome"] == "needs_clarification"
    other = acc.apply(plan(SEE))
    assert acc.stop({**FEATURE, "thread": thread_after(p, "Đồng ý")}, other, {})["outcome"] == "needs_clarification"


def test_round_limit_stops_for_review_without_approval(on):
    p = acc.apply(plan(SEE))
    thread = [{"role": "admin", "body": acc.approval_text(p)}] * 3 + [{"role": "requester", "body": "không"}]
    out = acc.stop({**FEATURE, "thread": thread}, p, {})
    assert out["outcome"] == "needs_review" and out["blocked"]


def test_not_applicable_without_flag_feature_or_criteria(on, monkeypatch):
    p = acc.apply(plan(SEE))
    assert acc.stop({"type": "bug"}, p, {}) is None
    assert acc.stop(FEATURE, {"subtasks": []}, {}) is None
    monkeypatch.delenv("AI_BOARD_PLAN_CHECKS")
    assert acc.stop(FEATURE, p, {}) is None


def oracle_state(approved_plan, *, rows, **extra):
    check = checks.collect(approved_plan)
    return {"request_title": "", "request_detail": "Làm trang đẹp hơn", "skill_id": "s",
            "full_diff": [{"diff": "diff --git a/public/gallery.html b/public/gallery.html\n--- a/public/gallery.html\n+++ b/public/gallery.html\n@@ -1 +1,2 @@\n+<p>x</p>\n"}],
            "diffs": [{"file": "public/gallery.html", "diff": ""}], "plan": approved_plan,
            "approved_checks": check, "approved_pin": checks.pin(approved_plan),
            "evidence": {"checks": {"rows": [{"check": c, "base": False, "candidate": r} for c, r in zip(check, rows)]}}, **extra}


def test_oracle_counts_approved_checks(on):
    p = acc.apply(plan(SEE, GONE))
    assert ready_oracle.check(oracle_state(p, rows=[True, True]))["passed"]
    out = ready_oracle.check(oracle_state(p, rows=[True, False]))
    assert not out["passed"] and "text_absent" in out["reason"]


def test_oracle_refuses_checks_changed_after_approval_or_missing_results(on):
    p = acc.apply(plan(SEE))
    s = oracle_state(p, rows=[True])
    s["plan"]["subtasks"][0]["checks"][0]["text"] = "Dễ hơn"
    assert not ready_oracle.check(s)["passed"]
    assert not ready_oracle.check({**oracle_state(p, rows=[True]), "evidence": {}})["passed"]


def test_oracle_without_approved_checks_is_unchanged():
    out = ready_oracle.check({"request_title": "", "request_detail": "Làm trang đẹp hơn", "skill_id": "s"})
    assert not out["passed"] and "no deterministic check" in out["reason"]
