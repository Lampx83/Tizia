"""Task packs: tasks derived from merged history. A pack entry names a base commit, the commit a human merged and the files; the gold diff is
computed from git (never written by hand), the request text is written once by an author who never sees model output.

pack entry: {"id","base_sha","commit","files":[...],"title","detail","subtasks":[{"title","file","verify"}]}
oracle: every non-trivial line the merged diff added must be in the candidate file, every line it removed that was unique in the base must be gone,
and the candidate diff may not be much larger than the merged one.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import stat
import subprocess
import threading
from pathlib import Path

import eval_corpus

MAX_FILES, MAX_GOLD_LINES = 4, 60
_CHECKOUT_LOCK = threading.Lock()


def prepare_checkout(root: Path, sha: str, source) -> Path:
    """eval_corpus.checkout_at is not safe for two workers asking for the same commit (one deletes the other's half-built clone): serialize it,
    and rebuild a directory a killed or failed clone left without a usable HEAD."""
    dest = Path(root) / "checkouts" / sha[:12]
    with _CHECKOUT_LOCK:
        head = dest / "HEAD"
        if dest.exists() and (not head.exists() or head.read_text().strip() != sha):
            shutil.rmtree(dest, onexc=lambda fn, path, _e: (os.chmod(path, stat.S_IWRITE), fn(path)))
        return eval_corpus.checkout_at(root, sha, source)
TRIVIAL = re.compile(r"^[\s{}()\[\];,<>/*]*$")


def _git(repo, *args) -> str:
    done = subprocess.run(["git", "--git-dir", str(repo), *args], capture_output=True, stdin=subprocess.DEVNULL)
    if done.returncode:
        raise ValueError(done.stderr.decode("utf-8", "replace").strip()[:200] or "git failed")
    return done.stdout.decode("utf-8", "replace")


def load_pack(path) -> list[dict]:
    entries = json.loads(Path(path).read_text(encoding="utf-8"))
    return [{**e, "file": e["files"][0], "pack": True, "split": "pack", "kind": "pr_history", "style": "plain" if len(e["files"]) > 1 else "named",
             "level": len(e["files"])} for e in entries]


def gold_sections(repo, task: dict) -> dict[str, tuple[list[str], list[str], str, str]]:
    """{file: (added lines, removed lines, base text, merged text)} from git; lines stripped, trivial ones dropped."""
    out = {}
    for file in task["files"]:
        base = _git(repo, "show", f"{task['base_sha']}:{file}") if _exists(repo, task["base_sha"], file) else ""
        merged = _git(repo, "show", f"{task['commit']}:{file}")
        before, after = base.splitlines(), merged.splitlines()
        sb, sa = {l.strip() for l in before}, {l.strip() for l in after}
        added = [l.strip() for l in after if l.strip() not in sb and not TRIVIAL.match(l)]
        removed = [l.strip() for l in before if l.strip() not in sa and not TRIVIAL.match(l)]
        out[file] = (added, removed, base, merged)
    return out


def _exists(repo, sha: str, file: str) -> bool:
    return subprocess.run(["git", "--git-dir", str(repo), "cat-file", "-e", f"{sha}:{file}"], capture_output=True, stdin=subprocess.DEVNULL).returncode == 0


def make_oracle(repo, task: dict):
    sections = gold_sections(repo, task)

    def oracle(files: dict) -> bool:
        for file, (added, removed, base, merged) in sections.items():
            text = files.get(file)
            if not text:
                return False
            lines = {l.strip() for l in text.splitlines()}
            counts = {}
            for l in base.splitlines():
                counts[l.strip()] = counts.get(l.strip(), 0) + 1
            if not all(a in lines for a in added) or any(r in lines for r in removed if counts.get(r) == 1):
                return False
            known = {l.strip() for l in base.splitlines()}
            changed = sum(1 for l in text.splitlines() if l.strip() not in known)
            if changed > 3 * len(added) + 20:
                return False
        return True
    return oracle


def case_record(task: dict, root: Path, source) -> dict:
    repo = prepare_checkout(root, task["base_sha"], source)
    subtasks = [{"title": s["title"], "file": s["file"], "size": "small", "verify": s["verify"]} for s in task["subtasks"]]
    return {"subtasks": subtasks, "detail": task["detail"], "checkout": str(repo), "oracle": make_oracle(repo, task)}


def validate(entries: list[dict], source) -> list[str]:
    """Problems that make a pack unusable. The gold must pass its own oracle, the unchanged base must fail it."""
    import tempfile
    problems, seen = [], set()
    with tempfile.TemporaryDirectory() as tmp:
        for e in entries:
            tag = e.get("id", "?")
            if tag in seen:
                problems.append(f"{tag}: duplicate id")
            seen.add(tag)
            missing = [k for k in ("id", "base_sha", "commit", "files", "title", "detail", "subtasks") if not e.get(k)]
            if missing:
                problems.append(f"{tag}: missing {', '.join(missing)}")
                continue
            if not 1 <= len(e["files"]) <= MAX_FILES:
                problems.append(f"{tag}: needs 1-{MAX_FILES} files")
                continue
            try:
                repo = eval_corpus.checkout_at(Path(tmp), e["base_sha"], source)
                _git(repo, "cat-file", "-e", e["commit"])
                sections = gold_sections(repo, e)
            except ValueError as error:
                problems.append(f"{tag}: {error}")
                continue
            lines = sum(len(a) + len(r) for a, r, _, _ in sections.values())
            if not 1 <= lines <= MAX_GOLD_LINES:
                problems.append(f"{tag}: gold changes {lines} lines (allowed 1-{MAX_GOLD_LINES})")
                continue
            oracle = make_oracle(repo, e)
            if not oracle({f: s[3] for f, s in sections.items()}):
                problems.append(f"{tag}: the merged result fails its own oracle")
            if oracle({f: s[2] for f, s in sections.items()}):
                problems.append(f"{tag}: the unchanged base already passes the oracle")
            if {s["file"] for s in e["subtasks"]} != set(e["files"]):
                problems.append(f"{tag}: subtasks must cover exactly the files")
            leak = [line for added, *_ in sections.values() for line in added if len(line) > 40 and line in e["detail"]]
            if leak:
                problems.append(f"{tag}: detail copies a merged line verbatim ({leak[0][:40]}...)")
    return problems
