import json
import subprocess
import sys
from pathlib import Path

import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import driver
hc = driver.hc


def case(cid, split, tier="bug_multi", files=2):
    return {"id": cid, "tier": tier, "files": files, "split": split}


CASES = [case("a-tune", "tune"), case("b-held", "heldout", tier="config", files=5), case("c-tune", "tune", "refactor", 3)]


def test_tune_selects_only_tune_cases():
    assert [c["id"] for c in hc.select("history:tune", CASES, False)] == ["a-tune", "c-tune"]


def test_explicit_heldout_refused_without_flag():
    with pytest.raises(SystemExit, match="need --allow-heldout"):
        hc.select("b-held", CASES, False)
    with pytest.raises(SystemExit, match="need --allow-heldout"):
        hc.select("history:b-held", CASES, False)


def test_explicit_heldout_runs_with_flag():
    assert [c["id"] for c in hc.select("b-held", CASES, True)] == ["b-held"]


def test_all_skips_heldout_without_flag(capsys):
    assert [c["id"] for c in hc.select("history:all", CASES, False)] == ["a-tune", "c-tune"]
    assert "held-out skipped (1)" in capsys.readouterr().out


def test_all_includes_heldout_with_flag():
    assert len(hc.select("history:all", CASES, True)) == 3


def test_unknown_token_raises():
    with pytest.raises(SystemExit, match="no history case"):
        hc.select("history:nope", CASES, True)


def test_load_cases_reads_layout_and_split(tmp_path):
    (tmp_path / "cases" / "x-01").mkdir(parents=True)
    (tmp_path / "cases" / "x-01" / "meta.json").write_text(json.dumps({
        "id": "x-01", "tier": "route_ui", "base": "abc", "kind": "feature", "request_vi": "yc",
        "reference_files": ["a.js", "b.js"], "scope": ["a.js"], "oracle_cmd": "true",
        "oracle_files": [{"src": "t.test.js", "dest": "test/t.test.js"}]}), encoding="utf-8")
    (tmp_path / "split-proposal.json").write_text(json.dumps({"cases": [{"id": "x-01", "split": "tune"}]}),
                                                  encoding="utf-8")
    (loaded,) = hc.load_cases(tmp_path)
    assert (loaded["tier"], loaded["files"], loaded["split"]) == ("route_ui", 2, "tune")
    assert loaded["multifile"]["oracle_pairs"] == [(tmp_path / "cases/x-01/oracle/t.test.js", "test/t.test.js")]


def test_missing_split_entry_is_heldout(tmp_path):
    (tmp_path / "cases" / "y-01").mkdir(parents=True)
    (tmp_path / "cases" / "y-01" / "meta.json").write_text(json.dumps({
        "id": "y-01", "tier": "perf", "base": "abc", "kind": "perf", "request_vi": "yc",
        "reference_files": ["a.js"], "scope": ["a.js"], "oracle_cmd": "true", "oracle_files": []}), encoding="utf-8")
    (tmp_path / "split-proposal.json").write_text(json.dumps({"cases": []}), encoding="utf-8")
    assert hc.load_cases(tmp_path)[0]["split"] == "heldout"


def git(repo, *args):
    subprocess.run(["git", "-C", str(repo), *args], check=True, capture_output=True)


def test_seed_is_git_archive_of_parent_commit(tmp_path):
    repo = tmp_path / "repo"
    repo.mkdir()
    git(repo, "init", "-q")
    git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-q", "--allow-empty", "-m", "x")
    (repo / "f.txt").write_text("base", encoding="utf-8")
    git(repo, "add", "f.txt")
    git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-q", "-m", "base")
    base = subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
    (repo / "f.txt").write_text("later", encoding="utf-8")
    git(repo, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "later")

    dest = hc.ensure_seed({"id": "s-01", "base": base}, repo, root=tmp_path / "hist")
    assert (dest / "f.txt").read_text(encoding="utf-8") == "base"
    assert not (dest / ".git").exists()
    assert hc.ensure_seed({"id": "s-01", "base": base}, repo, root=tmp_path / "hist") == dest


def scoring_case(tmp_path, scope=("a.py",)):
    seed = tmp_path / "seed"
    seed.mkdir()
    (seed / "a.py").write_text("x", encoding="utf-8")
    oracle = tmp_path / "oracle.py"
    oracle.write_text("import sys\nsys.exit(0 if open('a.py').read() == 'ok' else 1)\n", encoding="utf-8")
    meta = {"id": "t-01", "scope": list(scope), "tags": [], "oracle_cmd": f'"{sys.executable}" check.py',
            "oracle_pairs": [(oracle, "check.py")]}
    return {"id": "t-01", "multifile": meta}, seed


def test_score_resolved_when_oracle_passes_inside_scope(tmp_path):
    c, seed = scoring_case(tmp_path)
    ws = tmp_path / "ws"
    driver.shutil.copytree(seed, ws)
    (ws / "a.py").write_text("ok", encoding="utf-8")
    got = driver.score_multifile(c, ws, seed, shipped=True)
    assert (got["oracle_rc"], got["mf_outcome"], got["touched_files"]) == (0, "resolved", ["a.py"])
    assert got["oracle_output"] == ""
    assert not (ws / "node_modules").exists()


def test_score_out_of_scope_edit_is_wrong_ship(tmp_path):
    c, seed = scoring_case(tmp_path, scope=("b.py",))
    ws = tmp_path / "ws"
    driver.shutil.copytree(seed, ws)
    (ws / "a.py").write_text("ok", encoding="utf-8")
    assert driver.score_multifile(c, ws, seed, shipped=True)["mf_outcome"] == "wrong_ship"


def test_oracle_output_goes_to_evidence_file(tmp_path, monkeypatch):
    monkeypatch.setattr(driver, "RAW", tmp_path / "raw")
    path = Path(driver.write_oracle_evidence("arm-r1-x", {"oracle_rc": 1, "mf_outcome": "not_resolved"}, "AssertionError"))
    assert path == tmp_path / "raw" / "oracle" / "arm-r1-x.log"
    assert path.read_text(encoding="utf-8") == "rc=1 mf_outcome=not_resolved\nAssertionError"


def test_tier_report_counts_per_tier_and_files(tmp_path):
    trials = [
        {"case": "a", "case_tier": "bug_multi", "case_files": 2, "case_split": "tune", "mf_outcome": "resolved", "gpu_s": 60, "oracle_rc": 0},
        {"case": "b", "case_tier": "bug_multi", "case_files": 2, "case_split": "tune", "mf_outcome": "wrong_ship", "gpu_s": 60, "oracle_rc": 1},
        {"case": "c", "case_tier": "scope_trap", "case_files": 1, "case_split": "tune", "mf_outcome": "correct_stop", "gpu_s": 30, "oracle_rc": 0},
        {"case": "d", "case_tier": "config", "case_files": 5, "case_split": "heldout", "mf_outcome": "not_resolved", "gpu_s": 90, "oracle_rc": 1},
        {"case": "smoke", "case_tier": None, "mf_outcome": None},
    ]
    text = hc.tier_report(trials)
    assert "| bug_multi | files=2 | 2 | 1 | 1 | 0 | 0 | 120 | 0 |" in text
    assert "| scope_trap | files=1 | 1 | 0 | 0 | 1 | 0 | - | 0 |" in text
    assert "| config | files=5 | 1 | 0 | 0 | 0 | 1 | - | 0 |" in text
    assert "smoke" not in text


def _seed(root, cid, size):
    d = root / "seeds" / cid
    d.mkdir(parents=True)
    (d / "f.txt").write_bytes(b"x" * size)
    return d


def test_seeds_clean_dry_run_deletes_nothing_and_reports_size(tmp_path):
    _seed(tmp_path, "keep-me", 10)
    _seed(tmp_path, "drop-a", 30)
    _seed(tmp_path, "drop-b", 20)
    report = hc.seeds_clean(tmp_path, referenced={"keep-me"}, dry_run=True)
    assert sorted(report["removable"]) == ["drop-a", "drop-b"]
    assert report["bytes"] == 50 and report["kept"] == ["keep-me"]
    assert report["removed"] == []
    assert (tmp_path / "seeds" / "drop-a").exists()


def test_seeds_clean_removes_unreferenced_only(tmp_path):
    _seed(tmp_path, "keep-me", 10)
    _seed(tmp_path, "drop-a", 30)
    report = hc.seeds_clean(tmp_path, referenced={"keep-me"}, dry_run=False)
    assert report["removed"] == ["drop-a"]
    assert (tmp_path / "seeds" / "keep-me").exists()
    assert not (tmp_path / "seeds" / "drop-a").exists()


def test_seeds_clean_no_seeds_dir_is_noop(tmp_path):
    report = hc.seeds_clean(tmp_path, referenced=set(), dry_run=False)
    assert report["removable"] == [] and report["bytes"] == 0


def test_format_size_report_mentions_counts_and_mb(tmp_path):
    _seed(tmp_path, "drop-a", 2 * 1024 * 1024)
    text = hc.format_seed_report(hc.seeds_clean(tmp_path, referenced=set(), dry_run=True))
    assert "1 unreferenced" in text and "2.0 MB" in text and "dry-run" in text


def test_tier_report_counts_gate1_blocked_per_tier_and_case(tmp_path):
    trials = [
        {"case": "g1", "case_tier": "route_ui", "case_files": 2, "case_split": "tune", "mf_outcome": "not_resolved",
         "gpu_s": 0, "oracle_rc": 1, "stop_reason": "intake_human_review: tất định: privileged_area"},
        {"case": "ok", "case_tier": "route_ui", "case_files": 2, "case_split": "tune", "mf_outcome": "resolved",
         "gpu_s": 60, "oracle_rc": 0, "stop_reason": ""},
    ]
    text = hc.tier_report(trials)
    assert "| route_ui | files=2 | 2 | 1 | 0 | 0 | 1 | 60 | 1 |" in text
    assert "| g1 | route_ui | files=2 | not_resolved | 1 | 0 |" in text and "| yes |" in text
    assert "| ok | route_ui | files=2 | resolved | 0 | 60 |" in text and "| no |" in text
    assert hc.gate1_blocked({"reason": "intake_human_review: x"}) and not hc.gate1_blocked({"stop_reason": "budget"})
