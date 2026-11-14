"""multifile corpus checker: red-on-base/green-on-reference, leave-one-out, scope, split + seal hashes."""
import json
import subprocess
import sys
from pathlib import Path

import pytest

from evaluation import multifile_corpus as mc

PY = f'"{sys.executable}"'
A_FIXED = "a = 1\n"
B_FIXED = "b = 2\n"
PATCH = (
    "diff --git a/a.py b/a.py\n--- a/a.py\n+++ b/a.py\n@@ -1 +1 @@\n-a = 0\n+a = 1\n"
    "diff --git a/b.py b/b.py\n--- a/b.py\n+++ b/b.py\n@@ -1 +1 @@\n-b = 0\n+b = 2\n"
)
ORACLE = "import a, b\nassert a.a == 1 and b.b == 2\n"


def git(repo: Path, *args: str) -> str:
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True, check=True).stdout.strip()


@pytest.fixture
def repo(tmp_path):
    r = tmp_path / "repo"
    r.mkdir()
    git(r, "init", "-q")
    git(r, "config", "user.email", "t@t")
    git(r, "config", "user.name", "t")
    (r / "a.py").write_text("a = 0\n")
    (r / "b.py").write_text("b = 0\n")
    git(r, "add", ".")
    git(r, "commit", "-qm", "base")
    return r


def make_case(root: Path, repo: Path, cid: str, group: str = "backend", patch: str = PATCH, oracle: str = ORACLE) -> None:
    d = root / "cases" / cid
    (d / "oracle").mkdir(parents=True)
    (d / "oracle" / "o.py").write_text(oracle)
    (d / "reference.patch").write_text(patch)
    meta = {
        "id": cid, "group": group, "base": git(repo, "rev-parse", "HEAD"), "request_vi": "sửa a.py và b.py",
        "scope": ["a.py", "b.py", "test/"], "reference_files": ["a.py", "b.py"],
        "oracle_files": [{"src": "o.py", "dest": "test/o.py"}],
        "oracle_cmd": f"{PY} -c \"import sys; sys.path[:0]=['.']; exec(open('test/o.py').read())\"",
    }
    (d / "meta.json").write_text(json.dumps(meta))


def check(root: Path, repo: Path, cid: str) -> dict:
    case = next(c for c in mc.load_cases(root) if c["id"] == cid)
    return mc.check_case(case, repo)


def test_valid_case_is_red_on_base_green_on_reference(tmp_path, repo):
    make_case(tmp_path, repo, "ok")
    res = check(tmp_path, repo, "ok")
    assert res["ok"], res["problems"]
    assert res["rows"]["base"][0] != 0
    assert res["rows"]["reference"][0] == 0
    assert {"without:a.py", "without:b.py"} <= set(res["rows"])


def test_oracle_green_on_base_is_rejected(tmp_path, repo):
    make_case(tmp_path, repo, "weak", oracle="pass\n")
    res = check(tmp_path, repo, "weak")
    assert not res["ok"]
    assert any("passes on base" in p for p in res["problems"])


def test_oracle_that_ignores_one_file_fails_leave_one_out(tmp_path, repo):
    make_case(tmp_path, repo, "partial", oracle="import a\nassert a.a == 1\n")
    res = check(tmp_path, repo, "partial")
    assert any("without b.py" in p for p in res["problems"])


def test_reference_touching_unlisted_or_missing_file_is_rejected(tmp_path, repo):
    make_case(tmp_path, repo, "fake")
    meta_path = tmp_path / "cases" / "fake" / "meta.json"
    meta = json.loads(meta_path.read_text())
    meta["reference_files"] = ["a.py", "nope/forms.py"]
    meta_path.write_text(json.dumps(meta))
    res = check(tmp_path, repo, "fake")
    assert any("not in base: nope/forms.py" in p for p in res["problems"])
    assert any("touched" in p for p in res["problems"])


def test_request_must_name_real_in_scope_paths_and_every_reference_file(tmp_path, repo):
    make_case(tmp_path, repo, "ghost")
    meta_path = tmp_path / "cases" / "ghost" / "meta.json"
    meta = json.loads(meta_path.read_text())
    meta["request_vi"] = "sửa a.py và server/contexts/signup/forms.js"
    meta_path.write_text(json.dumps(meta))
    problems = check(tmp_path, repo, "ghost")["problems"]
    assert any("missing path: server/contexts/signup/forms.js" in p for p in problems)
    assert any("does not name reference file by full path: b.py" in p for p in problems)


def test_split_rules_and_seal_hash(tmp_path, repo):
    groups = ("frontend", "frontend_backend", "backend")
    for g in groups:
        for i in range(4):
            make_case(tmp_path, repo, f"{g}-{i}", group=g)
    held = ["frontend-0", "frontend_backend-0", "backend-0", "backend-1"]
    mc.seal(tmp_path, held)
    assert mc.check_split(tmp_path, check_seal=True) == []
    (tmp_path / "cases" / "backend-1" / "oracle" / "o.py").write_text("tampered\n")
    assert any("hash mismatch: backend-1" in p for p in mc.check_split(tmp_path, check_seal=True))
    mc.seal(tmp_path, ["frontend-0", "frontend_backend-0", "backend-0", "frontend-1"])
    assert mc.check_split(tmp_path) == []
    mc.seal(tmp_path, ["frontend-0", "frontend-1", "backend-0", "backend-1"])
    assert any("frontend_backend has no held-out" in p for p in mc.check_split(tmp_path))
