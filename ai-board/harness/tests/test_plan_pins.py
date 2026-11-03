"""Pins of a blocked plan attempt (LF/143): a rerun compares them before warning that it will stop the same way."""
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]


def _git(repo, *args):
    return subprocess.run(["git", "-C", str(repo), *args], check=True, capture_output=True, text=True).stdout.strip()


def test_plan_pins_follow_the_commit_and_the_shared_config_and_graph(tmp_path):
    sys.path.insert(0, str(REPO / "ai-board"))
    import worker
    from runtime import exec_graph, limits

    repo = tmp_path / "repo"
    repo.mkdir()
    (repo / "a.txt").write_text("1\n", encoding="utf-8")
    _git(repo, "init", "-q")
    _git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "add", "-A")
    _git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "base")
    first = worker._plan_pins(repo)
    assert first == {"base": _git(repo, "rev-parse", "HEAD"), "config": limits.config_sha256(),
                     "graph": exec_graph.digest()}

    (repo / "a.txt").write_text("2\n", encoding="utf-8")
    _git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "next")
    assert worker._plan_pins(repo)["base"] != first["base"]


def test_plan_pins_without_a_repository_fail_closed_on_base(tmp_path):
    sys.path.insert(0, str(REPO / "ai-board"))
    import worker

    pins = worker._plan_pins(tmp_path)
    assert pins["base"] is None and pins["config"] and pins["graph"]
