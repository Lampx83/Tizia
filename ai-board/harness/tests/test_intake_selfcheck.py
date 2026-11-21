"""Intake self-check (flag intake_selfcheck): lexicon first, one Yes/No call, unsafe or error -> human_review."""
import hashlib
import json
import os
from pathlib import Path

import pytest

from gates import intake_guard
from runtime.budgets.budget import Budget
from settings import get_settings

BENIGN = ("Thêm chế độ tối", "Trang flashcard thuốc sáng quá, cần nút nền tối.")


class Models:
    gate1_model, classifier_model = "fake-gate1", ""


class Deps:
    """call_model double: answer string, or an Exception to raise."""

    def __init__(self, answer):
        self.answer, self.calls, self.models = answer, [], Models()

    def call_model(self, model, prompt, **kw):
        self.calls.append({"model": model, "prompt": prompt, **kw})
        if isinstance(self.answer, Exception):
            raise self.answer
        return {"response": self.answer}


@pytest.fixture
def flag(monkeypatch):
    def _set(on):
        cfg = get_settings().model_copy(update={"intake_selfcheck": on})
        monkeypatch.setattr("settings.get_settings", lambda *a, **k: cfg)
    intake_guard._CACHE.clear()
    return _set


def run(deps, title=BENIGN[0], detail=BENIGN[1], budget=None):
    return intake_guard._run(title, detail, deps, budget or Budget())


def test_flag_defaults_off():
    assert get_settings().intake_selfcheck is False


def test_no_answer_passes(flag):
    flag(True)
    deps = Deps("No")
    out = run(deps)
    assert out["verdict"] == "allow" and out["selfcheck"]["calibration_id"] == intake_guard.SELFCHECK_CALIBRATION_ID
    call, = deps.calls
    assert call["options"] == {"num_predict": 5, "temperature": 0.001} and call["extra"] == {"thinking": False, "_no_split": True}
    assert call["prompt_name"] == "intake_selfcheck.md" and call["format"] is None and "classifier" not in out
    assert BENIGN[1] in call["prompt"]


def test_yes_answer_raises_to_human_review(flag):
    flag(True)
    out = run(Deps("Yes"))
    assert out["verdict"] == "human_review" and out["labels"] == ["selfcheck_unsafe"]
    assert "tự kiểm" in out["internal_reason"] and out["public_message"]


def test_call_error_and_budget_fail_closed_and_are_not_cached(flag):
    flag(True)
    out = run(Deps(RuntimeError("boom")))
    assert out["verdict"] == "human_review" and "classifier_error" in out["labels"]
    out = run(Deps("No"), budget=Budget(max_model_calls=0))
    assert out["verdict"] == "human_review" and "classifier_error" in out["labels"]
    out = intake_guard.run(*BENIGN, Deps(RuntimeError("boom")), Budget())
    assert not intake_guard._CACHE and out["verdict"] == "human_review"


def test_lexicon_hit_short_circuits_without_a_call(flag):
    flag(True)
    deps = Deps("No")
    out = run(deps, "Sửa", "thằng chó này")
    assert out["verdict"] == "reject" and deps.calls == []
    assert "selfcheck" not in out


def test_needs_info_still_gets_the_check(flag):
    flag(True)
    deps = Deps("Yes")
    out = run(deps, "Sửa", "ok")
    assert len(deps.calls) == 1 and out["verdict"] == "human_review"


def test_flag_off_uses_the_json_guard_path(flag):
    flag(False)
    deps = Deps(json.dumps({"labels": ["ok"], "reason": "x"}))
    out = run(deps)
    assert out == {"verdict": "allow", "labels": ["ok"], "public_message": None, "internal_reason": "LLM: ok (x)"}
    assert deps.calls[0]["prompt_name"] == "intake_guard.md"


def test_prompt_template_matches_lock():
    lock = json.loads((Path(intake_guard.__file__).parent.parent / "prompts" / "prompts.lock.json").read_text(encoding="utf-8"))
    raw = intake_guard.SELFCHECK_PROMPT.encode("utf-8")
    assert hashlib.sha256(raw).hexdigest() == lock["intake_selfcheck.md"]


@pytest.mark.parametrize("answer,blocked", [("No", False), (" no.", False), ("Safe", False), ("Yes", True), ("yes, it", True),
                                            ("Unsafe S1", True), ("", True), ("maybe", True)])
def test_yes_no_parse(answer, blocked):
    assert intake_guard.selfcheck_blocks(answer) is blocked


M313 = os.environ.get("M313_DIR")


@pytest.mark.skipif(not M313, reason="M313_DIR (measurement folder) not set")
def test_equivalent_to_measured_arm_b():
    root = Path(M313)
    texts = {r["id"]: r["text"] for r in map(json.loads, (root / "sample.jsonl").read_text(encoding="utf-8").splitlines())}
    rows = [json.loads(line) for line in (root / "arm_b.jsonl").read_text(encoding="utf-8").splitlines()]
    called = [r for r in rows if r.get("echo")]
    for row in called:
        prompt = intake_guard.selfcheck_prompt(texts[row["id"]])
        assert hashlib.sha256(prompt.encode()).hexdigest()[:16] == row["echo"]["sha"], row["id"]
        blocked = intake_guard.selfcheck_blocks(row["answer"])
        assert blocked is (row["nemo"] == "block"), row["id"]
        assert (row["verdict"] == "human_review") is (blocked or row["verdict"] == row["lex_verdict"] == "human_review"), row["id"]
    print(f"rows={len(rows)} prompts_identical={len(called)} decisions_identical={len(called)}")


def test_role_split_mode_leaves_the_prompt_bytes_alone(flag, monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROMPT_ROLE_SPLIT", "1")
    from runtime.pipeline import _split_call
    prompt = intake_guard.selfcheck_prompt("Đổi màu nút")
    extra = {"thinking": False, "_no_split": True}
    out_prompt, out_extra, out_opts = _split_call(prompt, "gate1", None, extra, dict(intake_guard.SELFCHECK_OPTIONS))
    assert out_prompt == prompt and out_extra == {"thinking": False} and out_opts == intake_guard.SELFCHECK_OPTIONS
    split_prompt, split_extra, _ = _split_call(prompt, "gate1", None, {"thinking": False}, {})
    assert split_prompt != prompt and split_extra.get("system")
