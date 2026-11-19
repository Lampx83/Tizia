import json
import subprocess

import pytest

from evaluation.pipeline import driver_capture as cap
from evaluation.pipeline import lf235_grade as grade


def _run(repo, *args):
    p = subprocess.run(["git", "-C", str(repo), "-c", "user.name=t", "-c", "user.email=t@t", *args], capture_output=True)
    assert p.returncode == 0, p.stderr
    return p.stdout.decode("utf-8")


@pytest.fixture
def repo(tmp_path):
    r = tmp_path / "guest"
    r.mkdir()
    _run(r, "init", "-q", "-b", "dev")
    (r / "p.html").write_text("<a>Quay lại</a>\n", encoding="utf-8")
    _run(r, "add", "-A")
    _run(r, "commit", "-qm", "base")
    return r


def _git_for(repo):
    return lambda *a: cap.GitResult(subprocess.run(["git", "-C", str(repo), *a], capture_output=True))


def _candidate(repo, ticket=7, keep=True):
    base = _run(repo, "rev-parse", "HEAD").strip()
    _run(repo, "checkout", "-q", "-b", f"ai-board/x-ticket-{ticket}")
    (repo / "p.html").write_text("<a>Về</a>\n", encoding="utf-8")
    _run(repo, "commit", "-qam", f"ai-board(ticket-{ticket}): 1/1 đổi chữ")
    head = _run(repo, "rev-parse", "HEAD").strip()
    _run(repo, "checkout", "-q", "dev")
    if not keep:
        _run(repo, "branch", "-D", f"ai-board/x-ticket-{ticket}")
    return base, head


CASE = {"id": "c", "file": "p.html"}


def test_candidate_from_runs_reads_evidence():
    runs = [{"evidence_json": json.dumps({"verdict": {"candidate": {"head_sha": "aa", "base_sha": "bb", "commits": []}}})},
            {"evidence_json": None}]
    assert cap.candidate_from_runs(runs)["head_sha"] == "aa"
    assert cap.candidate_from_runs([{"evidence_json": "{}"}]) is None
    assert cap.candidate_from_runs([{"evidence_json": "not json"}]) is None


def test_capture_kept_branch(repo, tmp_path):
    base, head = _candidate(repo)
    rec = {"gate_reached": 5.5, "outcome": "needs_review", "root_ticket_id": 7,
           "runs_evidence": [{"evidence_json": {"candidate": {"head_sha": head, "base_sha": base}}}]}
    out = tmp_path / "trials"
    out.mkdir()
    cap.capture(rec, CASE, "B0-r1-c", out, _git_for(repo))
    assert rec["candidate_head_sha"] == head and rec["candidate_source"] == "kept_branch"
    assert (out / "B0-r1-c.candidate.html").read_text(encoding="utf-8") == "<a>Về</a>\n"
    assert "Về" in (out / "B0-r1-c.candidate.diff").read_text(encoding="utf-8")
    assert rec["candidate_files"] == ["p.html"]


def test_capture_dangling_after_cleanup(repo, tmp_path):
    base, head = _candidate(repo, ticket=9, keep=False)
    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": 9, "runs_evidence": []}
    out = tmp_path
    cap.capture(rec, CASE, "B0-r1-c", out, _git_for(repo))
    assert rec["candidate_head_sha"] == head and rec["candidate_source"] == "dangling"
    assert (out / "B0-r1-c.candidate.html").exists()


def test_capture_skips_before_gate3_and_never_raises(repo, tmp_path):
    rec = {"gate_reached": 1.0, "outcome": "blocked", "root_ticket_id": 7, "runs_evidence": []}
    cap.capture(rec, CASE, "s", tmp_path, _git_for(repo))
    assert "candidate_head_sha" not in rec and not list(tmp_path.glob("s.candidate.*"))
    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": 404, "runs_evidence": []}
    cap.capture(rec, CASE, "s", tmp_path, _git_for(repo))
    assert rec["candidate_missing"].startswith("head not found")
    assert "candidate_head_sha" not in rec and not list(tmp_path.glob("s.candidate.*"))


def test_maybe_capture_default_on_and_env_off(repo, tmp_path, monkeypatch):
    base, head = _candidate(repo)
    monkeypatch.setattr(cap, "docker_git", lambda args: _git_for(repo)(*args))
    probe = lambda root: {"runs": [{"evidence_json": {"candidate": {"head_sha": head, "base_sha": base}}}]}
    monkeypatch.delenv("AB_CAPTURE_CANDIDATE", raising=False)
    rec = {"gate_reached": 5.5, "outcome": "needs_review", "root_ticket_id": 7}
    cap.maybe_capture(rec, CASE, "on", tmp_path, probe)
    assert rec["candidate_head_sha"] == head and (tmp_path / "on.candidate.html").exists()
    assert "runs_evidence" not in rec

    monkeypatch.setenv("AB_CAPTURE_CANDIDATE", "0")
    rec = {"gate_reached": 5.5, "outcome": "needs_review", "root_ticket_id": 7}
    cap.maybe_capture(rec, CASE, "off", tmp_path, probe)
    assert rec == {"gate_reached": 5.5, "outcome": "needs_review", "root_ticket_id": 7,
                   "candidate_missing": "capture disabled by AB_CAPTURE_CANDIDATE=0"}
    assert not list(tmp_path.glob("off.candidate.*"))


def test_maybe_capture_probe_failure_falls_back_to_dangling(repo, tmp_path, monkeypatch):
    base, head = _candidate(repo, ticket=11, keep=False)
    monkeypatch.setattr(cap, "docker_git", lambda args: _git_for(repo)(*args))
    monkeypatch.delenv("AB_CAPTURE_CANDIDATE", raising=False)

    def boom(root):
        raise RuntimeError("psql down")

    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": 11}
    cap.maybe_capture(rec, CASE, "pf", tmp_path, boom)
    assert rec["candidate_source"] == "dangling" and rec["candidate_head_sha"] == head


def test_maybe_capture_missing_root_and_multifile(repo, tmp_path, monkeypatch):
    monkeypatch.setattr(cap, "docker_git", lambda args: _git_for(repo)(*args))
    monkeypatch.delenv("AB_CAPTURE_CANDIDATE", raising=False)
    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": None}
    cap.maybe_capture(rec, CASE, "x", tmp_path, lambda r: {})
    assert rec["candidate_missing"] == "no root ticket id"
    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": 7, "runs_evidence": []}
    cap.capture(rec, {"id": "mf", "files": ["a", "b"]}, "mf", tmp_path, _git_for(repo))
    assert rec["candidate_missing"] == "no single target file in case"
    assert not list(tmp_path.glob("mf.candidate.*"))


def test_capture_file_absent_in_head_records_reason(repo, tmp_path):
    base, head = _candidate(repo)
    rec = {"gate_reached": 5, "outcome": "blocked", "root_ticket_id": 7,
           "runs_evidence": [{"evidence_json": {"candidate": {"head_sha": head, "base_sha": base}}}]}
    cap.capture(rec, {"id": "c", "file": "missing.html"}, "m", tmp_path, _git_for(repo))
    assert rec["candidate_missing"].startswith("file missing.html not in head")
    assert "candidate_head_sha" not in rec


def test_git_guard_rejects_write_commands():
    with pytest.raises(ValueError):
        cap.docker_git(["push", "origin"])
    with pytest.raises(ValueError):
        cap.docker_git(["branch", "-D", "x"])


def test_grade_reads_captured_artifact(repo, tmp_path):
    base, head = _candidate(repo)
    rec = {"gate_reached": 5.5, "outcome": "needs_review", "root_ticket_id": 7,
           "runs_evidence": [{"evidence_json": {"candidate": {"head_sha": head, "base_sha": base}}}]}
    cap.capture(rec, CASE, "T", tmp_path, _git_for(repo))
    assert grade.find_artifact(tmp_path, "T").name == "T.candidate.html"
    assert grade.find_artifact(tmp_path, "nope") is None


def test_candidate_from_runs_reads_a_blocked_runs_kept_branch():
    runs = [{"evidence_json": json.dumps({"verdict": {"outcome": "blocked", "candidate": None,
                                                      "blocked_candidate": {"base_sha": "bb", "head_sha": "cc"}}})}]
    assert cap.candidate_from_runs(runs)["head_sha"] == "cc"
