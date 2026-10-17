"""Local stand-in for GitHub's REST API over a bare git repo; PR state lives in forge.json next to the repo.
Plug it in as GitHub(transport=LocalForge(path), remote_url=path). merge() is the operator's, never the worker's."""
from __future__ import annotations

import json
import re
import subprocess
import tempfile
import shutil
from pathlib import Path

_ENV = ["-c", "user.name=Local Forge", "-c", "user.email=forge@tizia.local"]


class LocalForge:
    def __init__(self, bare: str | Path, base: str = "dev"):
        self.bare, self.base = Path(bare), base
        if subprocess.run(["git", "-C", str(self.bare), "rev-parse", "--is-bare-repository"], capture_output=True, text=True).stdout.strip() != "true":
            raise ValueError(f"{bare} is not a bare git repository")
        self.state = self.bare / "forge.json"

    def _git(self, *args: str, cwd=None) -> str:
        done = subprocess.run(["git", *_ENV, *args], cwd=cwd or self.bare, capture_output=True, text=True, encoding="utf-8",
                              errors="replace", stdin=subprocess.DEVNULL)
        if done.returncode:
            raise OSError(f"git {args[0]}: {(done.stderr or done.stdout).strip()[:300]}")
        return done.stdout.strip()

    def _sha(self, ref: str) -> str | None:
        done = subprocess.run(["git", "-C", str(self.bare), "rev-parse", "--verify", "--quiet", f"{ref}^{{commit}}"], capture_output=True, text=True)
        return done.stdout.strip() or None

    def _load(self) -> list[dict]:
        return json.loads(self.state.read_text(encoding="utf-8")) if self.state.exists() else []

    def _save(self, prs: list[dict]) -> None:
        self.state.write_text(json.dumps(prs, indent=1), encoding="utf-8")

    def _view(self, pr: dict) -> dict:
        head = self._sha(f"refs/heads/{pr['branch']}")
        state = "merged" if pr["merge_commit_sha"] else "open" if head and pr["state"] == "open" else "closed"
        return {"number": pr["number"], "html_url": f"local-forge://pulls/{pr['number']}", "state": "open" if state == "open" else "closed",
                "merged": state == "merged", "merge_commit_sha": pr["merge_commit_sha"], "labels": pr["labels"],
                "base": {"ref": pr["base"]}, "head": {"ref": pr["branch"], "sha": head or pr["head_sha"]}}

    def __call__(self, method: str, path: str, payload: dict | None):
        prs = self._load()
        if method == "GET" and "/pulls?" in path:
            branch = re.search(r"head=[^&]*?:([^&]+)", path)
            return [self._view(p) for p in prs if branch and p["branch"] == branch.group(1).replace("%2F", "/")
                    and self._view(p)["state"] == "open"]
        if method == "POST" and path.endswith("/pulls"):
            branch = payload["head"]
            head = self._sha(f"refs/heads/{branch}")
            if not head:
                raise OSError(f"branch {branch} was not pushed")
            pr = {"number": max((p["number"] for p in prs), default=0) + 1, "branch": branch, "base": payload["base"], "head_sha": head,
                  "state": "open", "merge_commit_sha": None, "labels": []}
            self._save(prs + [pr])
            return self._view(pr)
        number = re.search(r"/(?:pulls|issues)/(\d+)(?:/(files|labels))?", path)
        pr = next((p for p in prs if number and p["number"] == int(number.group(1))), None)
        if pr is None:
            raise KeyError(f"no PR for {path}")
        if method == "GET" and number.group(2) == "files":
            diff = self._git("diff", "--name-only", f"{pr['base']}...{pr['head_sha']}") if self._sha(pr["base"]) else ""
            return [{"filename": f} for f in diff.splitlines()]
        if method == "POST" and number.group(2) == "labels":
            pr["labels"] = sorted(set(pr["labels"]) | set(payload["labels"]))
            self._save(prs)
            return pr["labels"]
        if method == "GET":
            return self._view(pr)
        raise ValueError(f"unsupported {method} {path}")

    def merge(self, number: int) -> str:
        """Operator action: merge the PR's head into its base with a merge commit; return that commit."""
        prs = self._load()
        pr = next(p for p in prs if p["number"] == number)
        if self._view(pr)["state"] != "open":
            raise ValueError(f"PR #{number} is not open")
        checkout = tempfile.mkdtemp(prefix="local-forge-merge-")
        try:
            self._git("worktree", "add", "-q", "--detach", checkout, pr["base"])
            self._git("merge", "--no-ff", "-m", f"Merge PR #{number}", pr["head_sha"], cwd=checkout)
            merge_commit = self._git("rev-parse", "HEAD", cwd=checkout)
            self._git("update-ref", f"refs/heads/{pr['base']}", merge_commit)
        finally:
            self._git("worktree", "remove", "--force", checkout)
            shutil.rmtree(checkout, ignore_errors=True)
        pr["merge_commit_sha"] = merge_commit
        self._save(prs)
        return merge_commit
