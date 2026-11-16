import json
import subprocess
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


def test_process_error_row_carries_stderr_tail():
    program = "import sys; sys.stderr.write('x' * 5000 + 'BOOM-marker'); sys.exit(1)"
    row = execute_trial([sys.executable, "-c", program], {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=10)
    assert row["error"] == "trial_process_error" and row["detail"].endswith("BOOM-marker") and len(row["detail"]) <= 2000


def test_process_error_on_bad_stdout_names_the_cause():
    row = execute_trial([sys.executable, "-c", "print('not json')"], {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=10)
    assert row["error"] == "trial_process_error" and row["detail"]


def test_isolated_entry_point_imports_and_reads_request():
    from pathlib import Path
    from evaluation.suite import isolated
    done = subprocess.run([sys.executable, str(Path(isolated.__file__).resolve())], input="{}", capture_output=True, text=True, timeout=120)
    assert "KeyError: 'task'" in done.stderr and "ImportError" not in done.stderr and "ModuleNotFoundError" not in done.stderr


def test_fast_tier_refuses_empty_node_modules(tmp_path, monkeypatch):
    import pytest
    from evaluation import eval_fast
    repo = tmp_path / "repo"
    repo.mkdir()
    git = lambda *a: subprocess.run(["git", "-C", str(repo), "-c", "user.name=t", "-c", "user.email=t@t", *a], check=True, capture_output=True)  # noqa: E731
    git("init", "-q")
    (repo / "package.json").write_text("{}", encoding="utf-8")
    git("add", ".")
    git("commit", "-q", "-m", "x")
    empty = tmp_path / "node_modules"
    empty.mkdir()
    monkeypatch.setattr(eval_fast, "get_settings", lambda: type("S", (), {"eval_node_modules": empty})())
    with pytest.raises(eval_fast.FastTierError, match="npm install"):
        eval_fast.build_tree(repo / ".git", tmp_path / "root")


def test_fast_tier_lists_dependency_the_pinned_tree_needs(tmp_path):
    from evaluation import eval_fast
    tree = tmp_path / "tree"
    tree.mkdir()
    (tree / "package.json").write_text('{"dependencies": {"express": "^4", "better-sqlite3": "^11"}}', encoding="utf-8")
    modules = tmp_path / "node_modules"
    (modules / "express").mkdir(parents=True)
    (modules / "express" / "package.json").write_text("{}", encoding="utf-8")
    assert eval_fast.missing_dependencies(tree, modules) == ["better-sqlite3"]


def test_crashed_local_trial_leaves_no_pending_cleanup():
    result = execute_trial([sys.executable, "-c", "import sys; sys.exit(3)"], {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=10)
    assert result["reason"] == "trial_process_error" and result["infra_error"]
    assert result["cleanup_pending"] is False


def test_unconfirmed_sandbox_cleanup_stays_pending(monkeypatch):
    from evaluation.suite import isolated

    def fail(*args, **kwargs):
        raise OSError("owned sandbox cleanup unconfirmed; journal: x")
    monkeypatch.setattr(isolated, "run_owned", fail)
    result = isolated.execute_trial(["x"], {"task": {"id": "t1"}, "mode": "e2e"}, timeout_s=10)
    assert result["cleanup_pending"] is True
