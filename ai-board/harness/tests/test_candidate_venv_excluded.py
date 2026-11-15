"""Candidate never carries .venv/ or node_modules/: publish refuses them, sandbox skips them."""
import pytest

from gates import implement
from services import candidate
from services.candidate import Candidates
from test_full_checkout import child, git, source, state_for  # noqa: F401
from verification import sandbox

BANNED = ["ai-board/harness/.venv/x", ".venv/lib/y.py", "public/node_modules/z.js"]


@pytest.mark.parametrize("rel", BANNED)
def test_candidate_with_venv_or_node_modules_is_refused(tmp_path, source, rel):  # noqa: F811
    scratch = implement._ensure_scratch_repo(tmp_path / "scratch")
    state = state_for(tmp_path, [child(scratch, "Ghi", rel, "x = 1\n", "test/a.test.js")])
    candidate.create(state, source)
    try:
        reasons = Candidates(source).denied_paths(candidate.record(state))
        assert any(rel in reason for reason in reasons)
    finally:
        candidate.cleanup(state, keep_branch=False)


def test_sandbox_skips_venv_and_node_modules():
    assert {".venv", "node_modules"} <= sandbox.SKIP_DIRS
