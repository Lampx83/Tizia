"""Local review of one AI Board PR: build the exact candidate (latest dev merged with the PR head), stop on
conflict, run the gate 4 guard and the gate 5 Docker/HTTP smoke on it, record the base/head/candidate SHA tuple.
Evidence recorded for another tuple is stale: a moved dev or a new push to the PR invalidates it.

    python ai-board/review_pr.py 42 [--repo .]
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

HARNESS = Path(__file__).resolve().parent / "harness"
sys.path.insert(0, str(HARNESS))

import candidate as candidates  # noqa: E402

EVIDENCE_DIR = Path(__file__).resolve().parent / "memory" / "reviews"


class ReviewStop(RuntimeError):
    """Review cannot go on (wrong base, stale head, conflict); nothing is recorded."""


def _git(repo, *args) -> str:
    return candidates._git_out(list(args), repo)


def check_pr(pr: dict) -> None:
    """Raise ReviewStop unless the PR is an open AI Board PR into dev."""
    if pr.get("base", {}).get("ref") != candidates.PR_BASE:
        raise ReviewStop(f"PR #{pr.get('number')} vào {pr.get('base', {}).get('ref')}, không phải {candidates.PR_BASE}")
    if not candidates.BRANCH_PATTERN.fullmatch(pr.get("head", {}).get("ref") or ""):
        raise ReviewStop(f"PR #{pr.get('number')} không phải nhánh AI Board")


def build(repo, number: int, head_sha: str) -> dict:
    """Fetch latest dev + the PR head, merge them in a fresh worktree. Return {base_sha, head_sha, candidate_sha,
    checkout}; the caller removes the worktree with cleanup(). Raise ReviewStop on a stale head or a conflict."""
    _git(repo, "fetch", "-q", "origin", f"+refs/heads/{candidates.PR_BASE}:refs/remotes/origin/{candidates.PR_BASE}",
         f"+refs/pull/{int(number)}/head:refs/remotes/origin/pr/{int(number)}")
    fetched = _git(repo, "rev-parse", f"refs/remotes/origin/pr/{int(number)}").strip()
    if fetched != head_sha:
        raise ReviewStop(f"head PR đã đổi: GitHub {head_sha[:10]}, fetch được {fetched[:10]}")
    base_sha = _git(repo, "rev-parse", f"refs/remotes/origin/{candidates.PR_BASE}").strip()
    checkout = tempfile.mkdtemp(prefix="ai-board-review-")
    _git(repo, "worktree", "add", "-q", "--detach", checkout, base_sha)
    merged = subprocess.run(["git", *candidates._AUTHOR, "merge", "--no-ff", "--no-edit", "-q", head_sha],
                            cwd=checkout, capture_output=True, text=True, stdin=subprocess.DEVNULL)
    if merged.returncode:
        cleanup(repo, checkout)
        raise ReviewStop(f"conflict khi merge head {head_sha[:10]} vào {candidates.PR_BASE} {base_sha[:10]}")
    return {"base_sha": base_sha, "head_sha": head_sha,
            "candidate_sha": _git(checkout, "rev-parse", "HEAD").strip(), "checkout": checkout}


def cleanup(repo, checkout) -> None:
    subprocess.run(["git", "worktree", "remove", "--force", str(checkout)], cwd=repo, capture_output=True,
                   stdin=subprocess.DEVNULL)
    shutil.rmtree(checkout, ignore_errors=True)


def is_current(evidence: dict | None, base_sha: str, head_sha: str) -> bool:
    """Evidence counts only for the exact base/head it was built from."""
    return bool(evidence) and evidence.get("base_sha") == base_sha and evidence.get("head_sha") == head_sha


def request_type(pr: dict) -> str | None:
    """'self' khi PR mang nhãn ai-board:self (worker.pr_text gắn cho yêu cầu board tự sửa)."""
    return "self" if "ai-board:self" in {label.get("name") for label in pr.get("labels") or []} else None


def check(tuple_: dict, number: int, request_type: str | None = None) -> dict:
    """Gate 4 guard + gate 5 smoke on the built candidate. Return JSON-safe results.
    request_type 'self': guard theo vùng tự sửa; không Docker smoke (cổng 5 của self là eval, bằng chứng trong PR)."""
    from gates import guard, static_check, verify

    checkout = tuple_["checkout"]
    diff = _git(checkout, "diff", "--no-ext-diff", tuple_["base_sha"], "HEAD")
    files = _git(checkout, "diff", "--name-only", tuple_["base_sha"], "HEAD").split()
    scan = guard.scan(diff, checkout, request_type=request_type)
    problems = [f"{f['check']}: {f['detail']}" for f in scan["findings"]]
    for rel in (f for f in files if f.endswith(".js")):
        path = Path(checkout) / rel
        problems += [f"{rel}: {issue}" for issue in static_check.lint_imports(path.read_text(encoding="utf-8"), rel)]
        error = static_check.node_check(path)
        if error:
            problems.append(f"{rel} node --check: {error}")
    tests = [f for f in files if f.startswith(("test/", "tests/"))]
    # verify.run runs every distinct test_file of the diffs: one entry per test, pages carry the first.
    diffs = [{"file": f, "test_file": tests[0] if tests else ""} for f in files if f not in tests]
    diffs += [{"file": "", "test_file": t} for t in tests[1:]]
    state = {"skill_id": f"review-pr-{int(number)}", "full_checkout": checkout,
             "full_diff": [{"file": "", "diff": diff}], "diffs": diffs}
    smoke = ({"blocked": False, "reason": "self: không smoke Docker, xem eval trong PR"} if request_type == "self"
             else verify.run(state))
    return {"guard_problems": problems, "flags": scan["flags"], "gate5": {k: smoke.get(k) for k in ("blocked", "reason")},
            "passed": not problems and not smoke.get("blocked")}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Review one AI Board PR against the latest dev")
    parser.add_argument("number", type=int)
    parser.add_argument("--repo", default=str(Path(__file__).resolve().parents[1]))
    args = parser.parse_args(argv)
    github = candidates.GitHub(os.getenv("AI_BOARD_GITHUB_REPO", "Lampx83/Tizia"),
                               os.environ.pop("AI_BOARD_GITHUB_TOKEN", ""))
    try:
        pr = github.pull(args.number)
        check_pr(pr)
        path = EVIDENCE_DIR / f"pr-{args.number}.json"
        prior = json.loads(path.read_text(encoding="utf-8")) if path.exists() else None
        built = build(args.repo, args.number, pr["head"]["sha"])
    except ReviewStop as stop:
        print(f"DỪNG: {stop}")
        return 2
    try:
        if prior and not is_current(prior, built["base_sha"], built["head_sha"]):
            print(f"Bằng chứng cũ (base {prior['base_sha'][:10]}, head {prior['head_sha'][:10]}) hết hiệu lực.")
        result = check(built, args.number, request_type(pr))
    finally:
        cleanup(args.repo, built["checkout"])
    evidence = {"pr": args.number, "base_sha": built["base_sha"], "head_sha": built["head_sha"],
                "candidate_sha": built["candidate_sha"], "checked_at": int(time.time()), **result}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(evidence, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(evidence, ensure_ascii=False, indent=2))
    return 0 if result["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
