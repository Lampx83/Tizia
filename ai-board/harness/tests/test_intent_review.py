"""AI_BOARD_INTENT_REVIEW: reviewer AI judges the candidate against the request, merges every problem into one repair brief. Flag off = unchanged."""
import json
import sys
from dataclasses import replace
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from gates import intent_review, static_check  # noqa: E402
from runtime import exec_graph, loop_guard, repair_class  # noqa: E402
from runtime import pipeline as main  # noqa: E402
from runtime.budget import Budget  # noqa: E402

FLAG = "AI_BOARD_INTENT_REVIEW"
REQUEST = ("[Trang: Pet] /pet.html\nĐổi chữ liên kết '🌳 Cây Tri Thức' thành 'Luyện kiểm sao điểm thẻ.' "
           "ở trang pet, cái '← Tizia' để nguyên")
PET = '<div class="top">\n  <a class="back" href="/">← Tizia</a>\n  <a class="back" href="/tree.html">🌳 Cây Tri Thức</a>\n</div>\n'
CODER_HISTORY = "CODER-SCRATCHPAD-7731 I will edit other.html first"


def diff(path, old, new):
    return f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1,3 +1,3 @@\n <div>\n-{old}\n+{new}\n </div>\n"


WRONG = diff("public/other.html", '<a href="/tree.html">🌳 Cây Tri Thức</a>', '<a href="/tree.html">Luyện kiểm sao điểm thẻ</a>')
RIGHT = diff("public/pet.html", '<a class="back" href="/tree.html">🌳 Cây Tri Thức</a>',
             '<a class="back" href="/tree.html">Luyện kiểm sao điểm thẻ.</a>')
FAIL = {"verdict": "fail", "findings": [
    {"kind": "wrong_target", "severity": "high", "file": "public/other.html", "evidence": "+<a href=\"/tree.html\">Luyện kiểm sao điểm thẻ</a>",
     "fix": "sửa liên kết thứ hai ở public/pet.html"}],
    "brief": "Sửa liên kết thứ hai trên thanh trên của public/pet.html, không sửa public/other.html."}
PASS = {"verdict": "pass", "findings": [], "brief": ""}


class Models:
    gate1_model = "fake-review"

    def __init__(self, *replies):
        self.replies, self.calls = list(replies), []

    def generate(self, model, prompt, **kw):
        self.calls.append({"model": model, "prompt": prompt, **kw})
        reply = self.replies.pop(0)
        if isinstance(reply, Exception):
            raise reply
        return {"response": reply if isinstance(reply, str) else json.dumps(reply, ensure_ascii=False),
                "prompt_eval_count": 1, "eval_count": 1, "eval_duration": 1_000_000_000}


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv(FLAG, "1")
    monkeypatch.setattr(main.static_check, "run", lambda s, **_: {"gate": 4, "blocked": False, "reason": None, "issues": []})
    monkeypatch.setattr(main.static_check, "content_review", lambda *a, **k: None)


@pytest.fixture
def checkout(tmp_path):
    (tmp_path / "public").mkdir()
    (tmp_path / "public" / "pet.html").write_text(PET, encoding="utf-8")
    return tmp_path


def gate(fake_deps, models, text, checkout):
    state = {"full_diff": [{"file": "", "diff": text}], "full_checkout": str(checkout), "request_detail": REQUEST,
             "request_title": "", "repairs_left": 3, "plan": {"goal": CODER_HISTORY}, "repair_reason": CODER_HISTORY}
    return main.run_gate(4, {}, replace(fake_deps, models=models, verify=None), Budget(), state), state


def test_flag_defaults_off():
    from settings import Settings
    assert Settings().intent_review is False


def test_wrong_target_goes_back_as_one_merged_brief(on, fake_deps, checkout):
    models = Models(FAIL)
    out, _ = gate(fake_deps, models, WRONG, checkout)
    assert out["blocked"] and out["failure_class"] == "ordinary"
    assert out["reason"].startswith("intent_review: Sửa liên kết thứ hai")
    assert "request_literal" in out["reason"] and "Luyện kiểm sao điểm thẻ." in out["reason"]  # deterministic miss merged in
    assert out["reason"].count("intent_review:") == 1 and len(out["issues"]) == 1
    assert out["intent_review"]["findings"][0]["kind"] == "wrong_target"
    assert len(models.calls) == 1


def test_reviewer_sees_request_page_diff_and_deterministic_evidence_but_no_coder_history(on, fake_deps, checkout):
    models = Models(FAIL)
    gate(fake_deps, models, WRONG, checkout)
    prompt = models.calls[0]["prompt"]
    assert "Luyện kiểm sao điểm thẻ." in prompt and "/pet.html" in prompt
    assert '<a class="back" href="/">← Tizia</a>' in prompt  # target page content
    assert "public/other.html" in prompt and "MISS tất định" in prompt and "request_literal" in prompt
    assert CODER_HISTORY not in prompt and CODER_HISTORY not in models.calls[0]["extra"]["system"]
    assert models.calls[0]["format"] == intent_review.SCHEMA and models.calls[0].get("temperature", 0) == 0


def test_correct_candidate_passes(on, fake_deps, checkout):
    models = Models(PASS)
    out, state = gate(fake_deps, models, RIGHT, checkout)
    assert out["blocked"] is False and out["intent_review"]["verdict"] == "pass"
    assert "intent_review" in out["checks"] and len(models.calls) == 1


def test_brief_that_drops_a_deterministic_miss_gets_it_appended(on, fake_deps, checkout):
    out, _ = gate(fake_deps, Models({**FAIL, "brief": "Sửa lại đúng trang."}), WRONG, checkout)
    assert out["reason"].startswith("intent_review: Sửa lại đúng trang.") and "request_literal" in out["reason"]


def test_reviewer_pass_does_not_override_a_deterministic_miss(on, fake_deps, checkout):
    out, _ = gate(fake_deps, Models({**PASS, "brief": "Thêm dấu chấm cuối chữ mới."}), WRONG, checkout)
    assert out["blocked"] and out["failure_class"] == "ordinary" and "Thêm dấu chấm" in out["reason"]


def test_model_error_fails_closed_as_transient(on, fake_deps, checkout):
    out, _ = gate(fake_deps, Models(RuntimeError("vllm down")), RIGHT, checkout)
    assert out["blocked"] and out["failure_class"] == "transient" and "intent review failed" in out["reason"]


@pytest.mark.parametrize("reply", ["not json", {"verdict": "maybe", "findings": [], "brief": ""}, {"verdict": "pass"},
                                   {"verdict": "fail", "findings": [], "brief": ""}])
def test_bad_schema_fails_closed_as_critical(on, fake_deps, checkout, reply):
    out, _ = gate(fake_deps, Models(reply), RIGHT, checkout)
    assert out["blocked"] and out["failure_class"] == "critical"


def test_oversized_diff_fails_closed(on, fake_deps, checkout):
    big = diff("public/pet.html", "x", "y" * (intent_review.MAX_DIFF_CHARS + 10))
    out, _ = gate(fake_deps, Models(PASS), big, checkout)
    assert out["blocked"] and out["failure_class"] == "critical"


def test_critical_deterministic_finding_stands_without_calling_the_reviewer():
    found = [{"check": "path_policy", "failure_class": "critical", "detail": "x"}]
    models = Models(PASS)
    deps = main.Deps(models=models, notify=None)
    assert intent_review.apply({}, deps, Budget(), found, []) == (found, None) and not models.calls


def test_generated_tests_are_not_shown_ahead_of_product_diff(checkout):
    test = diff("test/pet.test.js", "a", "b")
    text, cut = intent_review.review_diff({"full_diff": [{"diff": test + RIGHT}]})
    assert text.index("public/pet.html") < text.index("test/pet.test.js") and not cut


def test_flag_off_is_unchanged(monkeypatch, fake_deps, checkout):
    monkeypatch.delenv(FLAG, raising=False)
    monkeypatch.setattr(main.static_check, "run", lambda s, **_: {"gate": 4, "blocked": False, "reason": None, "issues": []})
    monkeypatch.setattr(main.static_check, "content_review", lambda *a, **k: None)
    models = Models(PASS)
    out, _ = gate(fake_deps, models, WRONG, checkout)
    assert not models.calls and "intent_review" not in out and "intent_review" not in out["checks"]
    assert out["blocked"] and out["reason"].startswith("request_literal:") and "intent_review" not in out["reason"]


def test_gate4_proof_pin_changes_only_when_flag_is_on(monkeypatch):
    from repositories import server_gate_proof
    pin = lambda: server_gate_proof.gate4_pins({}, plan_hash=None, model="m", tool_hash="t")  # noqa: E731
    monkeypatch.delenv(FLAG, raising=False)
    off = pin()
    monkeypatch.setenv(FLAG, "1")
    assert pin()["prompt"] != off["prompt"] and {k: v for k, v in pin().items() if k != "prompt"} == {k: v for k, v in off.items() if k != "prompt"}


# --- loop: the brief reaches the coder and only existing stop rules end it ---

def _execution():
    import worker
    ex = worker._Execution({}, ticket_id=1, checkout_source=".", deps=None, budget=Budget(), run_gate=None, cleanup=None, catalog=None,
                           request_detail=None, memory_path=None, should_stop=None, candidate_opts=None, request_type=None,
                           eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=None)
    ex.plan = {"steps": []}
    return ex


def _blocked_round(ex, fake_deps, checkout, text):
    out, state = gate(fake_deps, Models(FAIL), text, checkout)
    ex.last_result = {"gate": 4, **out}
    ex.state = {"diffs": [{"diff": text}]}
    ex.kind = out["failure_class"]
    row = {"gate": 4, "blocked": True, "reason": out["reason"]}
    ex.gates.append(row)
    return row


def test_brief_becomes_the_coders_repair_reason(on, fake_deps, checkout):
    ex = _execution()
    row = _blocked_round(ex, fake_deps, checkout, WRONG)
    assert ex.repair_check() == "repair"
    assert ex.repair_reason.startswith("cổng 4") and "Sửa liên kết thứ hai trên thanh trên" in ex.repair_reason
    assert repair_class.classify(ex.last_result, {}, set())["action"] == repair_class.REPAIR_CODE and row["reason"] in ex.repair_reason


def test_same_wrong_diff_again_stops_by_no_progress_rounds(on, fake_deps, checkout):
    ex = _execution()
    allowed = []
    for _ in range(3):
        row = _blocked_round(ex, fake_deps, checkout, WRONG)
        allowed.append(ex._repair_allowed(row))
    assert allowed == [True, True, False] and ex.stop_note.startswith("stuck: 2 consecutive repair rounds without progress")


def test_same_wrong_diff_again_stops_by_state_repeat(on, fake_deps, checkout):
    ex = _execution()
    spec = {"entries": {"go": "work"}, "recursion_limit": 50, "nodes": [{"id": "work"}, {"id": "check"}, {"id": "verdict", "end": True}],
            "edges": [{"from": "work", "on": "passed", "to": "check"}, {"from": "check", "on": "repair", "to": "work"},
                      {"from": "check", "on": "done", "to": "verdict"}]}
    handlers = {"work": lambda: _blocked_round(ex, fake_deps, checkout, WRONG) and "passed", "check": lambda: "repair", "verdict": lambda: "passed"}
    report = {}
    path = exec_graph.run(handlers, "work", graph_spec=spec, observe={"check": ex.observe_state}, report=report)
    assert report["reason"] == loop_guard.REASON_STATE_REPEAT and path.count("work") == 2


def test_page_excerpt_keeps_lines_around_the_requested_text_even_without_its_final_period():
    page = "".join(f"<p>row {i}</p>\n" for i in range(2000)) + "<h1>Chữ mới</h1>\n"
    state = {"request_title": "", "request_detail": "Đổi chữ 'Chữ cũ' thành 'Chữ mới.'"}
    cut = intent_review.excerpt(page, intent_review._needles(state), limit=400)
    assert "<h1>Chữ mới</h1>" in cut and len(cut) < 600
