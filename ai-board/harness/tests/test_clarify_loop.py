import json

import pytest

from evaluation.pipeline import DATA
from evaluation.pipeline import clarify_loop as cl

PILOT = DATA.parent / "ai-board-vague-cases" / "cases-vague-pilot.json"
if not PILOT.exists():
    pytest.skip("vague pilot cases live outside git", allow_module_level=True)
CASES = json.loads(PILOT.read_text(encoding="utf-8"))["cases"]
GAPS = [
    {"slot": "color", "user_answer": "Xanh lá, mã #16a34a."},
    {"slot": "page", "user_answer": "Trang Ghép chữ cái."},
    {"slot": "scope", "user_answer": "Không, chỉ dòng đó."},
]


class FakeBoard:
    """Scripted board: turns() history, step() replies in order, confirm() recorded."""
    def __init__(self, turns, replies):
        self._turns, self.replies, self.answers, self.confirmed = turns, list(replies), [], None

    def turns(self):
        return self._turns

    def step(self, answer=None):
        self.answers.append(answer)
        return self.replies.pop(0)

    def confirm(self, spec):
        self.confirmed = spec
        return True


def q(text):
    return {"kind": "question", "text": text}


def test_example_questions_map_to_their_slot():
    for case in CASES:
        for gap in case["gaps"]:
            assert cl.slot_for(gap["example_question"]) == gap["slot"], (case["id"], gap)


def test_english_and_unaccented_questions():
    assert cl.slot_for("Which colour do you want?") == "color"
    assert cl.slot_for("Ban muon doi sang mau nao?") == "color"
    assert cl.slot_for("Which page is this on?") == "page"


def test_fake_board_one_question_gets_slot_answer_then_confirms():
    board = FakeBoard([q("Đổi sang màu gì?")], [{"kind": "summary", "text": "Đổi màu xanh lá."}])
    out = cl.drive(board, GAPS, rounds_left=3)
    assert board.answers == ["Xanh lá, mã #16a34a."]
    assert out["questions"][0]["slot"] == "color"
    assert board.confirmed == "Đổi màu xanh lá."
    assert out["resumed"] is True


def test_unknown_question_gets_neutral_reply():
    board = FakeBoard([q("Bạn có thích bóng đá không?")], [{"kind": "summary", "text": "ok ok ok ok ok"}])
    out = cl.drive(board, GAPS, rounds_left=3)
    assert board.answers == [cl.NEUTRAL_REPLY]
    assert out["questions"][0]["slot"] is None


def test_never_volunteers_unasked_facts():
    board = FakeBoard([q("Trang nào?")], [{"kind": "summary", "text": "xong xong xong"}])
    cl.drive(board, GAPS, rounds_left=3)
    assert board.answers == ["Trang Ghép chữ cái."]
    assert "16a34a" not in board.answers[0] and "chỉ dòng" not in board.answers[0]


def test_slot_without_stored_answer_is_neutral():
    board = FakeBoard([q("Đặt ở đâu?")], [{"kind": "summary", "text": "xong xong xong"}])
    cl.drive(board, GAPS, rounds_left=3)
    assert board.answers == [cl.NEUTRAL_REPLY]


def test_rounds_capped_at_three():
    board = FakeBoard([q("Trang nào?")], [{"kind": "question", "text": "Màu nào?"}] * 5)
    out = cl.drive(board, GAPS, rounds_left=3)
    assert len(board.answers) == 3
    assert out["end"] == "rounds_exhausted" and out["resumed"] is False
    assert out["questions"][-1]["answer"] is None


def test_first_question_requested_when_history_empty():
    board = FakeBoard([], [{"kind": "question", "text": "Trang nào?"}, {"kind": "summary", "text": "xong xong xong"}])
    out = cl.drive(board, GAPS, rounds_left=3)
    assert board.answers == [None, "Trang Ghép chữ cái."]
    assert out["resumed"] is True


def test_handoff_ends_without_resume():
    board = FakeBoard([q("Trang nào?")], [{"kind": "handoff", "text": "chuyển người"}])
    out = cl.drive(board, GAPS, rounds_left=3)
    assert out["end"] == "handoff" and out["resumed"] is False


def row(case_id, qs, outcome, resolved=None):
    return {"case": case_id, "outcome": outcome, "resolved": resolved,
            "clarify": {"questions": [{"slot": s, "question": "x", "answer": "y"} for s in qs]}}


def test_scorer_vague_and_control_counts():
    by_id = {c["id"]: c for c in CASES}
    vague = "vague-css_color-l1-37625a"  # min_slots_asked 3
    ctrl = "control-css_color-l1-37625a"
    rows = [
        row(vague, ["page", "element", "color"], "ready_for_pr", True),   # asked, 3 slots, correct
        row(vague, ["page"], "ready_for_pr", False),                      # asked, 1 slot, not correct
        row(vague, [], "ready_for_pr", False),                            # guessed
        row(vague, [], "blocked"),                                        # no ask, not shipped
        row(ctrl, [], "ready_for_pr", True),                              # correct
        row(ctrl, ["page"], "blocked"),                                   # asked: wrong
    ]
    scored = [cl.score_row(r, by_id[r["case"]]) for r in rows]
    assert [s["asked"] for s in scored] == [True, True, False, False, False, True]
    assert [s["slots_asked"] for s in scored] == [3, 1, 0, 0, 0, 0]
    assert [s["ask_correct"] for s in scored] == [True, False, False, False, True, False]
    assert [s["guessed"] for s in scored] == [False, False, True, False, False, False]
    assert [s["resolved_after"] for s in scored] == [True, False, False, None, True, None]
    rep = cl.report(scored)
    assert rep["vague"]["n"] == 4 and rep["vague"]["asked"] == 2 and rep["vague"]["guessed"] == 1
    assert rep["vague"]["ask_correct"] == 1
    assert rep["control"]["n"] == 2 and rep["control"]["ask_correct"] == 1 and rep["control"]["wrong"] == 1


def test_driver_loads_vague_cases_and_keeps_dev_ids():
    from evaluation.pipeline import driver
    dev_ids = [c["id"] for c in driver.load_cases()]
    assert len(dev_ids) == 42
    got = driver.resolve_cases("vague-css_color-l1-37625a,control-css_color-l1-37625a")
    assert got[0]["detail"] == CASES[0]["request"] and got[0]["kind"] == "vague"
    assert got[1]["kind"] == "control"
    assert len(driver.resolve_cases("vague:all")) == 9
    assert driver.resolve_cases(dev_ids[0])[0]["id"] == dev_ids[0]
