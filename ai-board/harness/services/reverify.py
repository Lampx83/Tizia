"""Re-verify a kept candidate on a moved base: cherry-pick its commits onto the base tip in a fresh worktree and branch.
A conflict (or a candidate already contained in the base) leaves nothing behind."""
from __future__ import annotations

import os
import shutil
import tempfile

from services import candidate as candidates


class Conflict(RuntimeError):
    """The candidate cannot be carried onto the new base; `files` are the conflicting paths."""

    def __init__(self, detail: str, files: list[str] | None = None):
        super().__init__(detail)
        self.files = files or []


def base_tip(repo, base: str | None = None) -> str | None:
    """Current tip of the PR base branch (PR_BASE_BRANCH, else dev; remote-tracking ref first), or None when neither exists."""
    name = base or os.getenv("PR_BASE_BRANCH") or candidates.PR_BASE
    for ref in (f"origin/{name}", name):
        sha = candidates._ref_sha(repo, ref)
        if sha:
            return sha
    return None


def _unmerged(checkout) -> list[str]:
    return candidates._git_out(["diff", "--name-only", "--diff-filter=U"], checkout).split()


def integrate(repo, candidate: dict, tip: str, *, label: str) -> dict:
    """New branch from `tip` carrying the candidate's commits in order.
    Return the fields the gates read from the candidate state; raise Conflict (worktree and branch removed) otherwise."""
    branch = candidates.branch_name(f"{label}-rebase")
    checkout = tempfile.mkdtemp(prefix="ai-board-reverify-")
    candidates._git_out(["worktree", "add", "-q", "-b", branch, checkout, tip], repo)

    def discard() -> None:
        candidates._git(repo, "worktree", "remove", "--force", checkout)
        shutil.rmtree(checkout, ignore_errors=True)
        candidates._git(repo, "worktree", "prune")
        candidates._git(repo, "branch", "-D", branch)

    try:
        for commit in candidate["commits"]:
            picked = candidates._git(checkout, *candidates._AUTHOR, "cherry-pick", commit["sha"])
            if not picked.returncode:
                continue
            files = _unmerged(checkout)
            if files:
                candidates._git(checkout, "cherry-pick", "--abort")
                raise Conflict(f"cherry-pick of {commit['sha'][:10]} onto {tip[:10]} conflicts", files)
            if candidates._git(checkout, *candidates._AUTHOR, "cherry-pick", "--skip").returncode:
                raise Conflict(f"cherry-pick of {commit['sha'][:10]} failed: {picked.stderr.strip()[:300]}")
        shas = candidates._git_out(["rev-list", "--reverse", f"{tip}..HEAD"], checkout).split()
        if not shas:
            raise Conflict(f"the candidate's changes are already in {tip[:10]}")
        commits = [{"sha": sha, "title": candidates._git_out(["log", "-1", "--format=%s", sha], checkout).strip(),
                    "files": candidates._git_out(["show", "--name-only", "--format=", sha], checkout).split()} for sha in shas]
        diff = candidates._git_out(["diff", "--no-ext-diff", tip, "HEAD"], checkout)
    except BaseException:
        discard()
        raise
    return {"full_checkout": checkout, "checkout_repo": str(repo), "branch": branch, "branch_restore": None, "_owned_full_checkout": True,
            "base_sha": tip, "commits": commits, "full_diff": [{"file": "", "diff": diff}]}


def diffs_of(commits: list[dict]) -> list[dict]:
    """One gate-3 style item per commit: the non-test file it changed and its test file (None when it changed none)."""
    out = []
    for commit in commits:
        tests = [f for f in commit["files"] if f.startswith(("test/", "tests/"))]
        rest = [f for f in commit["files"] if f not in tests]
        out.append({"file": rest[0] if rest else commit["files"][0], "test_file": tests[0] if tests else None, "commit": commit["sha"]})
    return out
