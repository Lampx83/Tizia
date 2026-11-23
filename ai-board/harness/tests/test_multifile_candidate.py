"""Multi-file trials: capture keeps the candidate diff, and the oracle runs on the seed with that diff applied."""
import subprocess
import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import driver
from evaluation.pipeline import driver_capture

DIFF = """diff --git a/public/a.js b/public/a.js
--- a/public/a.js
+++ b/public/a.js
@@ -1 +1 @@
-export const a = 1;
+export const a = 2;
diff --git a/public/b.html b/public/b.html
--- a/public/b.html
+++ b/public/b.html
@@ -1 +1 @@
-<p>old</p>
+<p>new</p>
"""


class Git:
    def __init__(self):
        self.calls = []

    def __call__(self, *args):
        self.calls.append(args)
        text = {"diff": DIFF}.get(args[0], "")
        if args[:2] == ("diff", "--name-only"):
            text = "public/a.js\npublic/b.html\n"
        return type("R", (), {"ok": True, "text": text})()


def test_capture_keeps_the_diff_of_a_multifile_case(tmp_path):
    rec = {"gate_reached": 5, "root_ticket_id": 1,
           "runs_evidence": [{"evidence_json": {"verdict": {"blocked_candidate": {"head_sha": "h" * 40, "base_sha": "b" * 40}}}}]}
    driver_capture.capture(rec, {"file": None, "multifile": {"id": "fe-01"}}, "t", tmp_path, git=Git())
    assert rec["candidate_head_sha"] == "h" * 40 and rec["candidate_files"] == ["public/a.js", "public/b.html"]
    assert (tmp_path / "t.candidate.diff").read_text(encoding="utf-8") == DIFF


def test_single_file_case_without_a_file_still_reports_missing(tmp_path):
    rec = {"gate_reached": 5, "root_ticket_id": 1, "runs_evidence": []}
    driver_capture.capture(rec, {"file": None}, "t", tmp_path, git=Git())
    assert rec["candidate_missing"] == "no single target file in case"


def seed(tmp_path):
    ws = tmp_path / "ws"
    (ws / "public").mkdir(parents=True)
    (ws / "public" / "a.js").write_text("export const a = 1;\n", encoding="utf-8", newline="\n")
    (ws / "public" / "b.html").write_text("<p>old</p>\n", encoding="utf-8", newline="\n")
    return ws


def test_apply_candidate_patches_the_workspace(tmp_path):
    ws, patch = seed(tmp_path), tmp_path / "c.diff"
    patch.write_text(DIFF, encoding="utf-8", newline="\n")
    assert driver.apply_candidate(ws, patch) == "applied"
    assert (ws / "public" / "a.js").read_text(encoding="utf-8") == "export const a = 2;\n"
    assert (ws / "public" / "b.html").read_text(encoding="utf-8") == "<p>new</p>\n"


def test_apply_candidate_reports_why_it_did_not_apply(tmp_path):
    ws = seed(tmp_path)
    assert driver.apply_candidate(ws, tmp_path / "none.diff") == "no_candidate_diff"
    bad = tmp_path / "bad.diff"
    bad.write_text(DIFF.replace("-export const a = 1;", "-export const a = 9;"), encoding="utf-8", newline="\n")
    assert driver.apply_candidate(ws, bad).startswith("apply_failed")
    assert (ws / "public" / "b.html").read_text(encoding="utf-8") == "<p>old</p>\n"


def test_apply_candidate_inside_another_checkout_still_patches(tmp_path):
    outer = tmp_path / "outer"
    outer.mkdir()
    subprocess.run(["git", "init", "-q", str(outer)], check=True)
    ws, patch = seed(outer / "scratch"), tmp_path / "c.diff"
    patch.write_text(DIFF, encoding="utf-8", newline="\n")
    assert driver.apply_candidate(ws, patch) == "applied"
    assert (ws / "public" / "a.js").read_text(encoding="utf-8") == "export const a = 2;\n"
