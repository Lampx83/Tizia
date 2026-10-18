import json
import sys
import time

from evaluation.suite.isolated import execute_trial
from evaluation.suite import runner


def test_trial_timeout_retains_failure_and_unknown_cost(tmp_path):
    marker = tmp_path / "late-write"
    program = ("import pathlib,time; time.sleep(2); "
               f"pathlib.Path({str(marker)!r}).touch()")
    result = execute_trial([sys.executable, "-c", program], {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=.2)
    assert not result["resolved"] and result["infra_error"]
    assert result["model_calls"] is None and result["tokens_in"] is None
    assert result["cleanup_pending"] is True
    time.sleep(2.2)
    assert not marker.exists()


def test_owned_trial_returns_candidate_result_without_changing_usage():
    row = {"id": "t1", "mode": "e2e", "resolved": True, "model_calls": 2, "tokens_in": 30, "tokens_out": 5}
    command = [sys.executable, "-c", f"import json; print(json.dumps({row!r}))"]
    result = execute_trial(command, {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=10)
    assert result["resolved"] and result["model_calls"] == 2
    assert result["tokens_in"] == 30 and result["tokens_out"] == 5
    assert result["wall_s"] > 0


def test_report_keeps_a_timed_out_e2e_trial_and_unknown_planning(tmp_path):
    row = execute_trial([sys.executable, "-c", "import time; time.sleep(2)"],
                        {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=.1)
    report = runner.write_report(tmp_path, [row])["e2e"]["all"]
    assert report["trials"] == report["resolved_clean"]["n"] == 1
    assert report["resolved_clean"]["k"] == 0
    assert report["planning"]["unknown"] == 1
    assert report["cost_per_resolved_clean"]["tokens"]["total"] is None
