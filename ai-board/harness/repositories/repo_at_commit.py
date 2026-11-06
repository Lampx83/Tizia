"""Đọc repo ở 1 commit cố định: listing và blob cache theo sha, batch qua `cat-file --batch`.

Ghi (init/commit/worktree/merge) không đi qua đây.
"""
from __future__ import annotations

import subprocess
from collections import OrderedDict
from pathlib import Path

_MAX_COMMITS = 8
_MAX_BLOBS = 4096  # ponytail: trần số blob mỗi commit (không tính bytes); nâng nếu repo có file lớn cần giữ
_cache: OrderedDict[tuple[str, str], "RepoAtCommit"] = OrderedDict()


def _proc(source, args: list[str], input: bytes | None = None) -> subprocess.CompletedProcess:
    # stdin=DEVNULL: pytest capture trên Windows làm handle stdin không nhân bản được (WinError 6).
    return subprocess.run(["git", *args], cwd=source, capture_output=True, input=input,
                          stdin=None if input is not None else subprocess.DEVNULL)


def _run(source, args: list[str], input: bytes | None = None) -> bytes:
    """stdout bytes của git; exit khác 0 → OSError kèm stderr."""
    result = _proc(source, args, input)
    if result.returncode:
        raise OSError(f"git {args[0]}: {result.stderr.decode('utf-8', 'replace').strip()[:300]}")
    return result.stdout


def resolve(source, ref: str = "HEAD") -> str:
    """Sha commit của ref. Không cache: HEAD đổi khi scratch/candidate commit. OSError nếu không phải commit."""
    return _run(source, ["rev-parse", "--verify", f"{ref}^{{commit}}"]).decode().strip()


def at(source, sha: str) -> "RepoAtCommit":
    """Repo ở `sha` (sha đầy đủ, bất biến nên cache được). LRU giới hạn _MAX_COMMITS."""
    key = (str(source), sha)
    tree = _cache.get(key)
    if tree is None:
        tree = _cache[key] = RepoAtCommit(source, sha)
        while len(_cache) > _MAX_COMMITS:
            _cache.popitem(last=False)
    else:
        _cache.move_to_end(key)
    return tree


def grep(source, sha: str, args: list[str], pathspecs: tuple[str, ...] = ()) -> str:
    """`git grep <args> sha -- <pathspecs>`; không khớp → "", lỗi → OSError."""
    result = _proc(source, ["grep", *args, sha, "--", *pathspecs])
    if result.returncode == 1:
        return ""
    if result.returncode:
        raise OSError(f"git grep: {result.stderr.decode('utf-8', 'replace').strip()[:300]}")
    return result.stdout.decode("utf-8", "replace")


class RepoAtCommit:
    def __init__(self, source, sha: str):
        self.source, self.sha = source, sha
        self._files: frozenset[str] | None = None
        self._folders: frozenset[str] = frozenset()
        self._blobs: dict[str, bytes | None] = {}

    def files(self) -> frozenset[str]:
        if self._files is None:
            raw = _run(self.source, ["ls-tree", "-r", "--name-only", "-z", self.sha]).decode("utf-8", "replace")
            self._files = frozenset(p for p in raw.split("\0") if p)
            self._folders = frozenset("/".join(parts[:i]) for parts in (p.split("/") for p in self._files)
                                      for i in range(1, len(parts)))
        return self._files

    def is_file(self, path: str) -> bool:
        return path in self.files()

    def exists(self, path: str) -> bool:
        """File hoặc thư mục tồn tại ở sha."""
        path = path.rstrip("/")
        return path in self.files() or path in self._folders

    def children(self, folder: str = "") -> list[str]:
        """Entry trực tiếp của folder (file và thư mục con), đường đầy đủ; "" = gốc."""
        prefix = folder.strip("/") + "/" if folder.strip("/") else ""
        return sorted({prefix + p[len(prefix):].split("/", 1)[0] for p in self.files() if p.startswith(prefix)})

    def read_many(self, paths) -> dict[str, bytes | None]:
        """Nội dung blob; None nếu không phải file ở sha. Mọi path chưa cache đi trong 1 tiến trình."""
        paths = list(dict.fromkeys(paths))
        todo = [p for p in paths if p not in self._blobs]
        if todo:
            if len(self._blobs) + len(todo) > _MAX_BLOBS:
                self._blobs.clear()
            self._blobs.update(self._batch(todo))
        return {p: self._blobs[p] for p in paths}

    def read(self, path: str) -> bytes | None:
        return self.read_many([path])[path]

    def _batch(self, paths: list[str]) -> dict[str, bytes | None]:
        out = _run(self.source, ["cat-file", "--batch"],
                   input="".join(f"{self.sha}:{p}\n" for p in paths).encode("utf-8"))
        blobs, pos = {}, 0
        for path in paths:
            eol = out.index(b"\n", pos)
            header, pos = out[pos:eol].split(), eol + 1
            if len(header) < 3:  # "<spec> missing": không có nội dung theo sau
                blobs[path] = None
                continue
            size = int(header[2])
            blobs[path] = out[pos:pos + size] if header[1] == b"blob" else None
            pos += size + 1
        return blobs
