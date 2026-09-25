"""Vòng đời nhánh candidate: dựng ở seam cổng 3→4, dọn/giữ, bỏ (discard), hoàn tác (rollback).

Chỉ file này tạo/xóa nhánh ai-board/* trong repo nguồn. Tên nhánh theo contract.json (branch_pattern)."""
from __future__ import annotations

import json
import os
import posixpath
import re
import secrets
import shutil
import subprocess
import tempfile
import time
from pathlib import Path

from gates import implement

_CONTRACT = json.loads((Path(__file__).resolve().parents[2] / "server" / "ai-board" / "contract.json")
                       .read_text(encoding="utf-8"))
BRANCH_PREFIX = _CONTRACT["branch_prefix"]
BRANCH_SLUG_MAX = _CONTRACT["branch_slug_max"]
BRANCH_PATTERN = re.compile(_CONTRACT["branch_pattern"])
_AUTHOR = ["-c", "user.name=AI Board", "-c", "user.email=ai-board@tizia.local"]


class ScopeViolation(ValueError):
    """Candidate tried to write outside its child's allowed scope — critical, never repaired."""


def _git_out(args: list[str], cwd) -> str:
    """git with stderr kept in the error message (CalledProcessError hides it)."""
    result = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8",
                            errors="replace", stdin=subprocess.DEVNULL)
    if result.returncode:
        raise OSError(f"git {args[0]}: {(result.stderr or result.stdout).strip()[:300]}")
    return result.stdout


def _git(repo, *args) -> subprocess.CompletedProcess:
    return subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, stdin=subprocess.DEVNULL)


def slug(name: str) -> str:
    """skill_id → [a-z0-9-]. Raise ValueError nếu rỗng."""
    out = re.sub(r"[^a-z0-9-]+", "-", str(name or "").lower()).strip("-")
    if not out:
        raise ValueError("thiếu skill_id để đặt tên nhánh AI Board")
    return out


def branch_name(name: str) -> str:
    """ai-board/<date>-<slug>-<hex6>; slug cắt cho vừa branch_slug_max. Hex ngẫu nhiên: candidate cũ không chặn lượt mới."""
    suffix = f"-{secrets.token_hex(3)}"
    head = slug(name)[:BRANCH_SLUG_MAX - len(suffix)].rstrip("-") or "x"
    branch = f"{BRANCH_PREFIX}{time.strftime('%Y-%m-%d')}-{head}{suffix}"
    if not BRANCH_PATTERN.fullmatch(branch):
        raise ValueError(f"tên nhánh sai contract: {branch}")
    return branch


def create(state: dict, source_repo: str | os.PathLike, *, base_ref: str = "HEAD") -> None:
    """At the 3→4 seam: new git worktree on a fresh candidate branch from base_ref,
    one commit per child in plan order. Raise ScopeViolation (nothing left behind) on out-of-scope writes."""
    scratch = Path(state["scratch_repo"])
    label = slug(state.get("skill_id"))
    subtasks = (state.get("plan") or {}).get("subtasks") or []
    diffs = state["diffs"]
    if len(subtasks) != len(diffs):
        raise ValueError(f"cổng 3 chưa xong: {len(diffs)}/{len(subtasks)} child có diff")
    base = _git_out(["rev-parse", "--verify", f"{base_ref}^{{commit}}"], source_repo).strip()
    branch = branch_name(label)
    checkout = Path(tempfile.mkdtemp(prefix="ai-board-worktree-"))
    try:
        _git_out(["worktree", "add", "-q", "-b", branch, str(checkout), base], source_repo)
    except OSError:
        shutil.rmtree(checkout, ignore_errors=True)
        raise
    owned = {"full_checkout": str(checkout), "checkout_repo": str(source_repo), "branch": branch}
    try:
        created: set[str] = set()
        commits = []
        for index, (subtask, item) in enumerate(zip(subtasks, diffs), start=1):
            allowed = {posixpath.normpath(p.replace("\\", "/"))
                       for p in subtask.get("allowed_scope") or [subtask["file"]]}
            file = posixpath.normpath(item["file"].replace("\\", "/"))
            test_file = posixpath.normpath(item["test_file"].replace("\\", "/"))
            if file not in allowed:
                raise ScopeViolation(f"child {index} ghi '{file}' ngoài allowed_scope {sorted(allowed)}")
            if not test_file.startswith(("test/", "tests/")):
                raise ScopeViolation(f"child {index} ghi test '{test_file}' ngoài test/ hoặc tests/")
            for rel in (file, test_file):
                dst = implement._safe_join(checkout, rel)
                if rel == test_file and dst.exists() and rel not in created:
                    raise ScopeViolation(f"test_file đã tồn tại trong checkout: {rel}")
                content = subprocess.run(["git", "show", f"{item['commit']}:{rel}"], cwd=scratch, check=True,
                                         capture_output=True, stdin=subprocess.DEVNULL).stdout
                dst.parent.mkdir(parents=True, exist_ok=True)
                dst.write_bytes(content)
                created.add(rel)
            title = f"ai-board({label}): {index}/{len(diffs)} {subtask['title']}"
            _git_out(["add", "--", file, test_file], checkout)
            _git_out([*_AUTHOR, "commit", "-q", "-m", title], checkout)
            commits.append({"sha": _git_out(["rev-parse", "HEAD"], checkout).strip(), "title": title,
                            "files": [file, test_file]})
        diff = _git_out(["diff", "--no-ext-diff", base, "HEAD"], checkout)
    except BaseException:
        cleanup(owned, keep_branch=False)
        raise
    state.update(owned, _owned_full_checkout=True, base_sha=base, commits=commits,
                 full_diff=[{"file": "", "diff": diff}])


def ensure(state: dict, gate: float) -> dict | None:
    """Dựng worktree nếu chưa có. None khi sẵn sàng/không có nguồn; dict blocked khi lỗi."""
    if state.get("full_checkout") or not state.get("checkout_source"):
        return None
    try:
        # Same base gate 3 showed the model, even if the source HEAD moved since.
        create(state, state["checkout_source"], base_ref=state.get("base_sha") or "HEAD")
    except (OSError, ValueError, subprocess.CalledProcessError) as e:
        # Scope escape is a boundary violation; anything else is the environment, not the code.
        kind = "critical" if isinstance(e, ScopeViolation) else "transient"
        return {"gate": gate, "blocked": True, "reason": f"không tạo được full_checkout: {e}",
                "evidence": None, "failure_class": kind}
    return None


def cleanup(state: dict, *, keep_branch: bool) -> None:
    """Remove the AI Board worktree; delete its branch unless the candidate is kept for PR."""
    repo, checkout = state.get("checkout_repo"), state.get("full_checkout")
    if not repo or not checkout:
        return
    _git(repo, "worktree", "remove", "--force", checkout)
    shutil.rmtree(checkout, ignore_errors=True)
    _git(repo, "worktree", "prune")
    if not keep_branch and state.get("branch"):
        _git(repo, "branch", "-D", state["branch"])


def record(state: dict) -> dict | None:
    """Candidate gửi server (branch, base/head sha, commits); None khi chưa có commit."""
    if not state.get("commits"):
        return None
    return {"branch": state["branch"], "base_sha": state["base_sha"],
            "head_sha": state["commits"][-1]["sha"], "commits": state["commits"]}


class Candidates:
    """Nhánh candidate đã giữ trong repo nguồn: bỏ hoặc hoàn tác."""

    def __init__(self, repo):
        self.repo = repo

    def discard(self, candidate: dict | None) -> None:
        """Xóa nhánh candidate. Đã mất cũng là xong; còn nhánh (vd checkout ở 1 worktree) → OSError."""
        branch = (candidate or {}).get("branch")
        if not branch:
            return
        deleted = _git(self.repo, "branch", "-D", branch)
        if not _git(self.repo, "rev-parse", "--verify", "--quiet", f"refs/heads/{branch}").returncode:
            raise OSError(f"git branch -D {branch}: {deleted.stderr.strip()[:300]}")

    def rollback(self, candidate: dict, ticket_id: int) -> dict:
        """Chưa merge: xóa nhánh. Đã merge vào base: nhánh revert mới từ base, để người mở PR.
        Return {outcome: discarded|revert_ready, detail, revert?}."""
        repo, head = self.repo, candidate["head_sha"]
        base = os.getenv("PR_BASE_BRANCH", "dev")
        refs = [ref for name in dict.fromkeys((base, "main")) for ref in (f"origin/{name}", name)]
        merged_into = next((ref for ref in refs if self.merged(candidate, ref)), None)
        if not merged_into:
            self.discard(candidate)
            return {"outcome": "discarded", "detail": f"deleted unmerged branch {candidate['branch']}"}
        branch = branch_name(f"ticket-{ticket_id}-revert")
        checkout = tempfile.mkdtemp(prefix="ai-board-revert-")
        try:
            _git_out(["worktree", "add", "-q", "-b", branch, checkout, merged_into], repo)
            base_sha = _git_out(["rev-parse", "HEAD"], checkout).strip()
            _git_out([*_AUTHOR, "revert", "--no-edit", f"{candidate['base_sha']}..{head}"], checkout)
            shas = _git_out(["rev-list", "--reverse", f"{base_sha}..HEAD"], checkout).split()
            commits = [{"sha": sha, "title": _git_out(["log", "-1", "--format=%s", sha], checkout).strip(),
                        "files": _git_out(["show", "--name-only", "--format=", sha], checkout).split()}
                       for sha in shas]
        except Exception:
            _git(repo, "worktree", "remove", "--force", checkout)
            _git(repo, "branch", "-D", branch)
            raise
        finally:
            _git(repo, "worktree", "remove", "--force", checkout)
            shutil.rmtree(checkout, ignore_errors=True)
        return {"outcome": "revert_ready", "detail": f"{candidate['branch']} was merged into {merged_into}",
                "revert": {"branch": branch, "base_sha": base_sha, "head_sha": shas[-1], "commits": commits}}

    def merged(self, candidate: dict, ref: str) -> bool:
        """Candidate đã vào ref: head là tổ tiên, hoặc mọi commit có bản vá tương đương (cherry-pick/squash 1 commit)."""
        # ponytail: squash nhiều commit thành 1 không nhận ra được; nhận thêm merge commit khi có PR thật (ticket 06).
        if _git(self.repo, "rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}").returncode:
            return False
        if not _git(self.repo, "merge-base", "--is-ancestor", candidate["head_sha"], ref).returncode:
            return True
        cherry = _git(self.repo, "cherry", ref, candidate["head_sha"], candidate["base_sha"])
        lines = cherry.stdout.split()
        return not cherry.returncode and bool(lines) and "+" not in lines
