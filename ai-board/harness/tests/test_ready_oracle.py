"""AI_BOARD_DETERMINISTIC_READY_ORACLE: ready_for_pr needs a literal + named-files check; else needs_review. Flag off = unchanged."""
import pytest

from gates import ready_oracle

FLAG = "AI_BOARD_DETERMINISTIC_READY_ORACLE"
REQUEST = "Thêm dòng 'Hẹn gặp lại bạn' vào trang chủ"


def diff(path, *added, removed=()):
    body = "".join(f"-{line}\n" for line in removed) + "".join(f"+{line}\n" for line in added)
    return f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1,1 +1,2 @@\n{body}"


def state(request=REQUEST, text=None, files=("public/index.html",), planned=("public/index.html",)):
    text = diff("public/index.html", "<p>Hẹn gặp lại bạn</p>") if text is None else text
    return {"request_title": "", "request_detail": request, "skill_id": "s", "full_diff": [{"diff": text}],
            "diffs": [{"file": f, "test_file": "test/gen.test.js", "diff": text} for f in files],
            "plan": {"subtasks": [{"file": f} for f in planned]}}


def test_flag_defaults_off():
    from settings import Settings
    assert Settings().deterministic_ready_oracle is False


def test_literal_present_and_only_planned_files_passes():
    assert ready_oracle.check(state()) == {"passed": True, "reason": ""}


def test_literal_missing_from_added_lines_fails():
    out = ready_oracle.check(state(text=diff("public/index.html", "<p>Tạm biệt</p>")))
    assert not out["passed"] and "Hẹn gặp lại bạn" in out["reason"]


def test_case_or_accent_variant_of_the_literal_fails():
    for variant in ("<p>hẹn gặp lại bạn</p>", "<p>Hen gap lai ban</p>"):
        assert not ready_oracle.check(state(text=diff("public/index.html", variant)))["passed"]


def test_file_outside_the_plan_fails():
    out = ready_oracle.check(state(files=("public/index.html", "public/other.html")))
    assert not out["passed"] and "public/other.html" in out["reason"]


def test_extra_and_out_of_plan_files_fail():
    s = state()
    s["diffs"][0]["extra_files"] = ["server/x.js"]
    assert not ready_oracle.check(s)["passed"]


def test_request_without_literal_cannot_pass():
    out = ready_oracle.check(state(request="Làm trang đẹp hơn"))
    assert not out["passed"] and "no deterministic check" in out["reason"]


def test_removal_needs_the_text_gone_from_added_lines():
    removed = diff("public/index.html", "<p>ok</p>", removed=["<p>Quang cao</p>"])
    assert ready_oracle.check(state(request="Xóa dòng 'Quang cao'", text=removed))["passed"]
    kept = diff("public/index.html", "<p>Quang cao</p>", removed=["<p>Quang cao</p>"])
    assert not ready_oracle.check(state(request="Xóa dòng 'Quang cao'", text=kept))["passed"]
    assert not ready_oracle.check(state(request="Xóa dòng 'Quang cao'", text=diff("public/index.html", "<p>x</p>")))["passed"]


def test_missing_state_cannot_pass():
    assert not ready_oracle.check({})["passed"]
    assert not ready_oracle.check(None)["passed"]


# Verdict wiring.

PASSED = [{"gate": 4, "blocked": False},
          {"gate": 5, "blocked": False, "smoke_passed": True, "http_observed": True, "runner": "docker",
           "functional": {"passed": True, "oracle_passed": True}},
          {"gate": 5.5, "blocked": False, "reason": None, "risk_level": "low"}]


def execution(gates, st=None, kind=None):
    import test_exec_graph  # noqa: F401 puts ai-board/ on sys.path
    import worker
    ex = worker._Execution({"subtasks": [{"file": "public/index.html"}]}, ticket_id=1, checkout_source=".", deps=None, budget=None,
                           run_gate=None, cleanup=None, catalog=None, request_detail=None, memory_path=None, should_stop=None,
                           candidate_opts=None, request_type=None, eval_tasks=None, preview_capture=None, checkpoint=None,
                           plan_hash=None)
    ex.gates, ex.kind, ex.state = gates, kind, st
    return ex


def test_flag_off_verdict_is_unchanged(monkeypatch):
    monkeypatch.delenv(FLAG, raising=False)
    ex = execution(PASSED, st=None)
    ex.verdict()
    assert ex.result["outcome"] == "ready_for_pr"


def test_flag_on_oracle_pass_keeps_ready_for_pr(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    ex = execution(PASSED, st=state())
    ex.verdict()
    assert ex.result["outcome"] == "ready_for_pr"


def test_flag_on_oracle_fail_caps_at_needs_review_with_reason(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    ex = execution(PASSED, st=state(text=diff("public/index.html", "<p>Tạm biệt</p>")))
    ex.verdict()
    assert ex.result["outcome"] == "needs_review" and "Hẹn gặp lại bạn" in ex.result["reason"]


def test_flag_on_no_oracle_caps_at_needs_review(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    ex = execution(PASSED, st=None)
    ex.verdict()
    assert ex.result["outcome"] == "needs_review" and "no deterministic check" in ex.result["reason"]


def test_flag_on_loop_stop_without_oracle_pass_is_needs_review_with_last_failure(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    gates = [{"gate": 4, "blocked": False}, {"gate": 5, "blocked": True, "reason": "check đỏ: thiếu chữ", "risk_level": None}]
    ex = execution(gates, st=state(), kind="ordinary")
    ex.halt.update(reason="stagnation", detail="3 same diffs")
    ex.verdict()
    assert ex.result["outcome"] == "needs_review" and ex.result["candidate"] is None
    assert "check đỏ: thiếu chữ" in ex.result["reason"] and "stagnation" in ex.result["reason"]


def test_flag_on_infra_block_stays_blocked(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    gates = [{"gate": 5, "blocked": True, "reason": "timeout", "risk_level": None}]
    ex = execution(gates, kind="transient")
    ex.verdict()
    assert ex.result["outcome"] == "blocked"


def test_replace_needs_the_old_text_removed_even_with_extra_quotes():
    request = "Trang có hai liên kết, em muốn cái thứ hai ('🌲 Rừng') đổi chữ thành 'Ôn bài.', cái '↩ Về' để nguyên ạ."
    wrong = diff("public/index.html", "<a>Ôn bài.</a>", removed=("<a>Rừng</a>",))
    right = diff("public/index.html", "<a>Ôn bài.</a>", removed=("<a>🌲 Rừng</a>",))
    titled = lambda text: {**state(request=request, text=text), "request_title": "Đổi chữ liên kết '🌲 Rừng' thành 'Ôn bài.'"}
    out = ready_oracle.check(titled(wrong))
    assert not out["passed"] and "🌲 Rừng" in out["reason"]
    assert ready_oracle.check(titled(right))["passed"]
