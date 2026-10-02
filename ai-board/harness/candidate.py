"""Vòng đời nhánh candidate: dựng ở seam cổng 3→4, dọn/giữ, bỏ (discard), hoàn tác (rollback).

Chỉ file này tạo/xóa nhánh ai-board/* trong repo nguồn. Tên nhánh theo contract.json (branch_pattern)."""
from __future__ import annotations

import hashlib
import json
import os
import posixpath
import re
import secrets
import shutil
import subprocess
import tempfile
import time
import urllib.parse
import urllib.request
from pathlib import Path

from gates import implement

_CONTRACT = json.loads((Path(__file__).resolve().parents[2] / "server" / "ai-board" / "contract.json")
                       .read_text(encoding="utf-8"))
BRANCH_PREFIX = _CONTRACT["branch_prefix"]
BRANCH_SLUG_MAX = _CONTRACT["branch_slug_max"]
BRANCH_PATTERN = re.compile(_CONTRACT["branch_pattern"])
_AUTHOR = ["-c", "user.name=AI Board", "-c", "user.email=ai-board@tizia.local"]
PR_BASE = "dev"  # AI Board PRs only ever target dev; nothing here merges, approves or pushes dev/main
# Credential helper reads the token from the git child's env: never in argv, a file or this process's env.
_CREDENTIAL = "!f() { echo username=x-access-token; echo \"password=$AI_BOARD_PUSH_TOKEN\"; }; f"


class GitHub:
    """One repo's REST calls + branch push; the only holder of the token. No merge/approve/review method on purpose."""

    API = "https://api.github.com"

    def __init__(self, repo: str, token: str, *, transport=None, remote_url: str | None = None):
        self.repo = repo
        self._token = token
        self.transport = transport or self._request
        self.remote_url = remote_url or f"https://github.com/{repo}.git"

    def _request(self, method: str, path: str, payload: dict | None):
        request = urllib.request.Request(
            self.API + path, method=method,
            data=None if payload is None else json.dumps(payload).encode("utf-8"),
            headers={"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28",
                     "User-Agent": "tizia-ai-board",
                     **({"Authorization": f"Bearer {self._token}"} if self._token else {})})  # public repo reads
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read() or b"null")

    def _git_remote(self, repo, *args: str) -> None:
        env = {**os.environ, "AI_BOARD_PUSH_TOKEN": self._token, "GIT_TERMINAL_PROMPT": "0"}
        result = subprocess.run(["git", "-c", "credential.helper=", "-c", f"credential.helper={_CREDENTIAL}",
                                 "push", "-q", self.remote_url, *args], cwd=repo, env=env, capture_output=True,
                                text=True, encoding="utf-8", errors="replace", stdin=subprocess.DEVNULL)
        if result.returncode:
            raise OSError(f"git push: {(result.stderr or result.stdout).strip()[:300]}")

    @staticmethod
    def _checked(branch: str) -> str:
        if not BRANCH_PATTERN.fullmatch(branch or "") or ".." in branch:
            raise ValueError(f"chỉ đẩy nhánh AI Board, không đẩy {branch!r}")
        return branch

    def push(self, repo, branch: str) -> None:
        """Create the remote AI Board branch from the local one (no force). Raise ValueError for any other branch."""
        branch = self._checked(branch)
        self._git_remote(repo, f"refs/heads/{branch}:refs/heads/{branch}")

    def delete_branch(self, repo, branch: str) -> None:
        """Delete a remote AI Board branch; GitHub closes its open PR."""
        self._git_remote(repo, "--delete", f"refs/heads/{self._checked(branch)}")

    def open_pull(self, branch: str, *, title: str, body: str) -> dict:
        """The open PR of this branch, else a new one into dev. Raise ValueError if it targets another base."""
        owner = self.repo.split("/")[0]
        head = urllib.parse.quote(f"{owner}:{branch}", safe=":/")
        found = self.transport("GET", f"/repos/{self.repo}/pulls?state=open&head={head}", None) or []
        pr = found[0] if found else self.transport("POST", f"/repos/{self.repo}/pulls", {
            "title": title[:250], "head": branch, "base": PR_BASE, "body": body, "maintainer_can_modify": False})
        if pr["base"]["ref"] != PR_BASE:
            raise ValueError(f"PR #{pr['number']} không vào {PR_BASE} mà vào {pr['base']['ref']}")
        return pr

    def add_labels(self, number: int, labels: list[str]) -> None:
        self.transport("POST", f"/repos/{self.repo}/issues/{int(number)}/labels", {"labels": labels})

    def pull(self, number: int) -> dict:
        return self.transport("GET", f"/repos/{self.repo}/pulls/{int(number)}", None)

    def pull_files(self, number: int) -> list[str]:
        """Paths the PR changed (GitHub caps the list at 3000 = 30 pages)."""
        files = []
        for page in range(1, 31):
            batch = self.transport("GET", f"/repos/{self.repo}/pulls/{int(number)}/files?per_page=100&page={page}",
                                   None) or []
            files += [f["filename"] for f in batch]
            if len(batch) < 100:
                break
        return files


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


class FolderConflict(RuntimeError):
    """Nhánh folder không gộp được base: dừng, chờ người. Không tự giải xung đột."""


def folder_branch(folder_slug: str, cycle: int = 1) -> str:
    """Nhánh chu kỳ folder: ai-board/<date>-feature-<slug>[-c<n>], cùng tên cho mọi lượt của chu kỳ."""
    head = f"feature-{slug(folder_slug)}"[:BRANCH_SLUG_MAX - 4].rstrip("-") + (f"-c{int(cycle)}" if int(cycle) > 1 else "")
    branch = f"{BRANCH_PREFIX}{time.strftime('%Y-%m-%d')}-{head}"
    if not BRANCH_PATTERN.fullmatch(branch):
        raise ValueError(f"tên nhánh folder sai contract: {branch}")
    return branch


def _ref_sha(repo, ref: str) -> str | None:
    out = _git(repo, "rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}")
    return out.stdout.strip() if not out.returncode else None


def folder_source(repo, branch: str, base_ref: str) -> tuple[str, str | None]:
    """Worktree tạm tách tại đỉnh nhánh folder đã gộp base_ref, để lượt sau đọc/sửa trên code của lượt trước.
    Return (path, đỉnh cũ | None khi chu kỳ mới). Raise FolderConflict khi gộp xung đột (không để lại gì)."""
    base = _git_out(["rev-parse", "--verify", f"{base_ref}^{{commit}}"], repo).strip()
    tip = _ref_sha(repo, f"refs/heads/{branch}") or _ref_sha(repo, f"refs/remotes/origin/{branch}")
    path = tempfile.mkdtemp(prefix="ai-board-folder-")
    try:
        _git_out(["worktree", "add", "-q", "--detach", path, tip or base], repo)
        if tip and _git(path, "merge-base", "--is-ancestor", base, "HEAD").returncode:
            merged = subprocess.run(["git", *_AUTHOR, "merge", "--no-edit", "-q", base], cwd=path, capture_output=True,
                                    text=True, encoding="utf-8", errors="replace", stdin=subprocess.DEVNULL)
            if merged.returncode:
                _git(path, "merge", "--abort")
                raise FolderConflict(f"{branch} xung đột khi gộp {base_ref}: {(merged.stdout + merged.stderr).strip()[:300]}")
    except BaseException:
        drop_source(repo, path)
        raise
    return path, tip


def drop_source(repo, path) -> None:
    """Gỡ worktree tạm của folder_source."""
    _git(repo, "worktree", "remove", "--force", str(path))
    shutil.rmtree(path, ignore_errors=True)
    _git(repo, "worktree", "prune")


def sync(repo, base: str) -> str:
    """Worker's dedicated clone only (never a dev checkout): fetch, detach at origin/<base>, drop
    leftovers of a crashed job. Kept candidate branches stay. Return the base sha. Raise OSError on git failure."""
    _git_out(["fetch", "-q", "--prune", "origin"], repo)
    _git_out(["checkout", "-q", "-f", "--detach", f"origin/{base}"], repo)
    _git_out(["clean", "-q", "-fd"], repo)
    return _git_out(["rev-parse", "HEAD"], repo).strip()


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
    # Folder: nối tiếp nhánh chu kỳ; base đã chứa đỉnh cũ nên -B không làm mất commit nào.
    branch = state.get("branch_name") or branch_name(label)
    checkout = Path(tempfile.mkdtemp(prefix="ai-board-worktree-"))
    try:
        _git_out(["worktree", "add", "-q", "-B" if state.get("branch_name") else "-b", branch, str(checkout), base],
                 source_repo)
    except OSError:
        shutil.rmtree(checkout, ignore_errors=True)
        raise
    owned = {"full_checkout": str(checkout), "checkout_repo": str(source_repo), "branch": branch,
             "branch_restore": state.get("branch_restore")}
    try:
        created: set[str] = set()
        commits = []
        for index, (subtask, item) in enumerate(zip(subtasks, diffs), start=1):
            allowed = {posixpath.normpath(p.replace("\\", "/"))
                       for p in subtask.get("allowed_scope") or [subtask["file"]]}
            file = posixpath.normpath(item["file"].replace("\\", "/"))
            test_file = posixpath.normpath(item["test_file"].replace("\\", "/")) if item.get("test_file") else None  # None: dropped, an oracle verifies
            if file not in allowed:
                raise ScopeViolation(f"child {index} ghi '{file}' ngoài allowed_scope {sorted(allowed)}")
            if test_file and not test_file.startswith(("test/", "tests/")):
                raise ScopeViolation(f"child {index} ghi test '{test_file}' ngoài test/ hoặc tests/")
            written = [rel for rel in (file, test_file) if rel]
            for rel in written:
                dst = implement._safe_join(checkout, rel)
                if rel == test_file and dst.exists() and rel not in created:
                    raise ScopeViolation(f"test_file đã tồn tại trong checkout: {rel}")
                content = subprocess.run(["git", "show", f"{item['commit']}:{rel}"], cwd=scratch, check=True,
                                         capture_output=True, stdin=subprocess.DEVNULL).stdout
                dst.parent.mkdir(parents=True, exist_ok=True)
                dst.write_bytes(content)
                created.add(rel)
            title = f"ai-board({label}): {index}/{len(diffs)} {subtask['title']}"
            _git_out(["add", "--", *written], checkout)
            _git_out([*_AUTHOR, "commit", "-q", "-m", title], checkout)
            commits.append({"sha": _git_out(["rev-parse", "HEAD"], checkout).strip(), "title": title,
                            "files": written})
        diff = _git_out(["diff", "--no-ext-diff", base, "HEAD"], checkout)
    except BaseException:
        cleanup(owned, keep_branch=False)
        raise
    state.update(owned, _owned_full_checkout=True, base_sha=base, commits=commits,
                 full_diff=[{"file": "", "diff": diff}])


# File khoá hash → (thư mục, glob file được khoá, tên khoá của file). Cùng dạng test_skill_lock / test_prompt_lock.
_LOCKS = {
    "ai-board/harness/skills/skills.lock.json": ("ai-board/harness/skills", "*/SKILL.md", lambda p: p.parent.name),
    "ai-board/harness/prompts/prompts.lock.json": ("ai-board/harness/prompts", "*.md", lambda p: p.name),
}


def relock(state: dict) -> None:
    """Yêu cầu self, sau khi diff qua guard: tính lại sha256 skill/prompt vào file khoá, gộp vào commit cuối
    của candidate (model không bao giờ viết file khoá: guard chặn). Raise OSError khi git lỗi."""
    checkout = Path(state["full_checkout"])
    changed = []
    for lock, (folder, pattern, key) in _LOCKS.items():
        fresh = {key(p): hashlib.sha256(p.read_bytes()).hexdigest() for p in (checkout / folder).glob(pattern)}
        if json.loads((checkout / lock).read_text(encoding="utf-8")) != fresh:
            (checkout / lock).write_text(json.dumps(fresh, indent=2, sort_keys=True) + "\n", encoding="utf-8",
                                         newline="\n")
            changed.append(lock)
    if not changed:
        return
    _git_out(["add", "--", *changed], checkout)
    _git_out([*_AUTHOR, "commit", "-q", "--amend", "--no-edit"], checkout)
    last = state["commits"][-1]
    last.update(sha=_git_out(["rev-parse", "HEAD"], checkout).strip(), files=[*last["files"], *changed])
    # full_diff giữ nguyên diff của model: catalog cổng 5.5 soát đúng thứ model viết, khoá là việc của pipeline.


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
        if state.get("branch_restore"):  # nhánh folder có từ lượt trước: trả về đỉnh cũ, không xoá
            _git(repo, "branch", "-f", state["branch"], state["branch_restore"])
        else:
            _git(repo, "branch", "-D", state["branch"])


def record(state: dict) -> dict | None:
    """Candidate gửi server (branch, base/head sha, commits); None khi chưa có commit."""
    if not state.get("commits"):
        return None
    return {"branch": state["branch"], "base_sha": state["base_sha"],
            "head_sha": state["commits"][-1]["sha"], "commits": state["commits"]}


class Candidates:
    """Nhánh candidate đã giữ trong repo nguồn: mở PR, bỏ hoặc hoàn tác."""

    def __init__(self, repo, github: GitHub | None = None):
        self.repo = repo
        self.github = github

    def publish(self, candidate: dict, *, title: str, body: str, labels=()) -> dict:
        """Push the verified candidate, open (or find) its one PR into dev. Return the server's pull_request record.
        Raise ValueError when GitHub's PR head is not the verified head (stale) or targets another base."""
        self.github.push(self.repo, candidate["branch"])
        pr = self.github.open_pull(candidate["branch"], title=title, body=body)
        if pr["head"]["sha"] != candidate["head_sha"]:
            raise ValueError(f"PR #{pr['number']} head {pr['head']['sha']} không phải head đã kiểm {candidate['head_sha']}")
        if labels:
            try:
                self.github.add_labels(pr["number"], list(labels))
            except Exception as error:  # noqa: BLE001 — labels only help the reviewer sort
                print(f"[candidate] gắn nhãn PR #{pr['number']} lỗi: {str(error)[:200]}")
        return {"number": pr["number"], "url": pr["html_url"], "branch": candidate["branch"], "base": PR_BASE,
                "base_sha": candidate["base_sha"], "head_sha": candidate["head_sha"]}

    def discard(self, candidate: dict | None) -> None:
        """Xóa nhánh candidate. Đã mất cũng là xong; còn nhánh (vd checkout ở 1 worktree) → OSError."""
        branch = (candidate or {}).get("branch")
        if not branch:
            return
        deleted = _git(self.repo, "branch", "-D", branch)
        if not _git(self.repo, "rev-parse", "--verify", "--quiet", f"refs/heads/{branch}").returncode:
            raise OSError(f"git branch -D {branch}: {deleted.stderr.strip()[:300]}")

    def rollback(self, candidate: dict, ticket_id: int, pull_request: dict | None = None) -> dict:
        """Chưa merge: xóa nhánh (cả nhánh đã đẩy, GitHub tự đóng PR). Đã merge vào base: nhánh revert mới từ base,
        để người mở PR; PR đã merge thì revert đúng merge commit của nó (nhận cả squash nhiều commit).
        Return {outcome: discarded|revert_ready, detail, revert?}."""
        repo, head = self.repo, candidate["head_sha"]
        base = os.getenv("PR_BASE_BRANCH", "dev")
        refs = [ref for name in dict.fromkeys((base, "main")) for ref in (f"origin/{name}", name)]
        pr = self.github.pull(pull_request["number"]) if pull_request and self.github else None
        merge_commit = pr.get("merge_commit_sha") if pr and pr.get("merged") else None
        merged_into = f"origin/{base}" if merge_commit else next(
            (ref for ref in refs if self.merged(candidate, ref)), None)
        if not merged_into:
            if pr:
                self.github.delete_branch(repo, candidate["branch"])
            self.discard(candidate)
            return {"outcome": "discarded", "detail": f"deleted unmerged branch {candidate['branch']}"}
        branch = branch_name(f"ticket-{ticket_id}-revert")
        checkout = tempfile.mkdtemp(prefix="ai-board-revert-")
        try:
            _git_out(["worktree", "add", "-q", "-b", branch, checkout, merged_into], repo)
            base_sha = _git_out(["rev-parse", "HEAD"], checkout).strip()
            if merge_commit:
                parents = _git_out(["rev-list", "--parents", "-n", "1", merge_commit], checkout).split()[1:]
                mainline = ["-m", "1"] if len(parents) > 1 else []
                _git_out([*_AUTHOR, "revert", "--no-edit", *mainline, merge_commit], checkout)
            else:
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
        # ponytail: không có PR thì squash nhiều commit thành 1 không nhận ra được; có PR thì rollback hỏi GitHub.
        if _git(self.repo, "rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}").returncode:
            return False
        if not _git(self.repo, "merge-base", "--is-ancestor", candidate["head_sha"], ref).returncode:
            return True
        cherry = _git(self.repo, "cherry", ref, candidate["head_sha"], candidate["base_sha"])
        lines = cherry.stdout.split()
        return not cherry.returncode and bool(lines) and "+" not in lines
