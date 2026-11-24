"""Loop checks read the draft's own test file from memory, not from the pinned tree where it does not exist yet."""
import subprocess

from runtime.tool_loop import Forbidden, Workspace


def _repo(tmp_path):
    for args in (["init", "-q"], ["-c", "user.name=t", "-c", "user.email=t@invalid", "commit", "-q", "--allow-empty", "-m", "b"]):
        subprocess.run(["git", "-C", str(tmp_path), *args], check=True)
    return subprocess.check_output(["git", "-C", str(tmp_path), "rev-parse", "HEAD"], text=True).strip()


def test_own_new_test_file_is_read_from_the_draft(tmp_path):
    ws = Workspace(str(tmp_path), _repo(tmp_path), "public/js/a.js", None)
    ws.test_file, ws.test = "test/a.test.js", "import test from 'node:test';"
    assert ws._read("test/a.test.js") == "import test from 'node:test';"
    try:
        ws._read("test/other.test.js")
    except Forbidden:
        pass
    else:
        raise AssertionError("a file missing from the tree must stay forbidden")
