"""Acceptance command broken by quoting/usage errors is not repairable by changing code. Flag AI_BOARD_REPAIR_SKIP_BROKEN_CHECK."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from runtime import repair_class  # noqa: E402
from settings import get_settings  # noqa: E402
from test_gate_feedback_cap import _execution  # noqa: E402

QUOTE_BROKEN = "feature acceptance failed: sh -c 'grep -qF -- 'abc def' file.html | sh: syntax error: unterminated quoted string"
GREP_USAGE = "feature acceptance failed: grep -qF file.html | grep: unrecognized option: --bad Usage: grep [-HhnlLoqvsriwFE] PATTERN"
REAL_FAIL = "feature acceptance failed: curl -s $BASE/a.html | grep -q building | "


@pytest.fixture(autouse=True)
def repair_replan_on(monkeypatch):
    import worker_execution
    monkeypatch.setattr(worker_execution, "REPAIR_REPLAN", {**worker_execution.REPAIR_REPLAN, "enabled": True})


def _result(reason, text=""):
    return {"gate": 5, "blocked": True, "reason": reason, "failure_class": "ordinary", "risk_level": "low",
            "evidence": {"text": text}}


def test_flag_default_on(monkeypatch):
    monkeypatch.delenv("AI_BOARD_REPAIR_SKIP_BROKEN_CHECK", raising=False)
    assert get_settings().repair_skip_broken_check is True


@pytest.mark.parametrize("reason", [QUOTE_BROKEN, GREP_USAGE])
def test_broken_command_classified_stop(reason):
    out = repair_class.classify(_result(reason), {}, set())
    assert (out["class"], out["action"]) == ("broken_check", "stop_admin")


def test_unbalanced_quotes_in_command_alone():
    out = repair_class.classify(_result("feature acceptance failed: sh -c 'grep -q x | exit 1"), {}, set())
    assert out["class"] == "broken_check"


def test_real_assertion_failure_still_repairs():
    out = repair_class.classify(_result(REAL_FAIL, "expected building"), {}, set())
    assert (out["class"], out["action"]) == ("acceptance_command", "repair_code")


def test_pipeline_command_with_quoted_detail_is_not_broken():
    reason = "feature acceptance failed: curl -s $BASE/a | grep -q x | it's not here"
    assert repair_class.classify(_result(reason), {}, set())["class"] == "acceptance_command"


def test_flag_off_repairs_broken_command(monkeypatch):
    monkeypatch.setenv("AI_BOARD_REPAIR_SKIP_BROKEN_CHECK", "0")
    assert repair_class.classify(_result(QUOTE_BROKEN), {}, set())["class"] == "acceptance_command"


def _check(reason, text=""):
    execution = _execution()
    result = _result(reason, text)
    execution.gates.append(result)
    execution.last_result = result
    execution.state = {"diffs": [{"diff": "+x\n"}]}
    return execution, execution.repair_check()


def test_broken_check_spends_no_repair_and_blocks_naming_the_check():
    execution, step = _check(QUOTE_BROKEN)
    assert step == "done" and execution.repairs == []
    execution.verdict()
    assert execution.result["outcome"] == "blocked"
    assert "broken_check" in execution.result["reason"] and "grep -qF" in execution.result["reason"]


def test_normal_failure_still_repairs():
    execution, step = _check(REAL_FAIL, "expected building")
    assert step == "repair" and len(execution.repairs) == 1
