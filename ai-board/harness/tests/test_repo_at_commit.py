"""repo_at_commit: listing/blob cache theo sha, batch cat-file, đếm tiến trình git."""
import subprocess

import pytest

from repositories import repo_at_commit
from gates import plan_validate


def _git(repo, *args):
    subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)


def _commit(repo, msg):
    _git(repo, "add", "-A")
    _git(repo, "-c", "user.name=T", "-c", "user.email=t@t", "commit", "-qm", msg)
    return repo_at_commit.resolve(repo)


@pytest.fixture
def repo(tmp_path):
    _git(tmp_path, "init", "-q")
    (tmp_path / "a").mkdir()
    (tmp_path / "a" / "b.txt").write_text("hello\n", encoding="utf-8")
    (tmp_path / "đề.txt").write_text("tiếng việt\n", encoding="utf-8")
    (tmp_path / "c.txt").write_text("c\n", encoding="utf-8")
    _commit(tmp_path, "base")
    return tmp_path


@pytest.fixture
def spawns(monkeypatch):
    """Argv (không kèm 'git') của mỗi tiến trình git; subprocess.run đi qua Popen."""
    calls = []
    real = subprocess.Popen

    class Counting(real):
        def __init__(self, args, *a, **kw):
            if args and args[0] == "git":
                calls.append(list(args[1:]))
            super().__init__(args, *a, **kw)

    monkeypatch.setattr(subprocess, "Popen", Counting)
    return calls


def test_resolve_is_not_cached(repo, spawns):
    first = repo_at_commit.resolve(repo)
    assert repo_at_commit.resolve(repo) == first
    (repo / "x.txt").write_text("x", encoding="utf-8")
    assert _commit(repo, "next") != first
    assert len([c for c in spawns if c[0] == "rev-parse"]) == 3


def test_listing_answers_existence_and_children_from_one_spawn(repo, spawns):
    tree = repo_at_commit.at(repo, repo_at_commit.resolve(repo))
    assert tree.files() == frozenset({"a/b.txt", "đề.txt", "c.txt"})
    assert tree.exists("a") and tree.exists("a/b.txt") and not tree.exists("zz")
    assert tree.children("a") == ["a/b.txt"]
    assert tree.children("") == ["a", "c.txt", "đề.txt"]
    assert len([c for c in spawns if c[0] == "ls-tree"]) == 1


def test_read_many_is_one_batch_and_cached(repo, spawns):
    tree = repo_at_commit.at(repo, repo_at_commit.resolve(repo))
    got = tree.read_many(["a/b.txt", "đề.txt", "nope.txt", "a"])
    assert got == {"a/b.txt": b"hello\n", "đề.txt": "tiếng việt\n".encode(), "nope.txt": None, "a": None}
    assert tree.read("a/b.txt") == b"hello\n"
    assert len([c for c in spawns if c[0] == "cat-file"]) == 1


def test_at_caches_per_sha(repo):
    first = repo_at_commit.resolve(repo)
    tree = repo_at_commit.at(repo, first)
    assert repo_at_commit.at(repo, first) is tree
    (repo / "d.txt").write_text("d", encoding="utf-8")
    assert repo_at_commit.at(repo, _commit(repo, "next")) is not tree


def test_commit_cache_is_bounded(repo, monkeypatch):
    monkeypatch.setattr(repo_at_commit, "_MAX_COMMITS", 2)
    shas = [repo_at_commit.resolve(repo)]
    for i in range(3):
        (repo / f"n{i}.txt").write_text("n", encoding="utf-8")
        shas.append(_commit(repo, f"n{i}"))
    for sha in shas:
        repo_at_commit.at(repo, sha)
    assert len(repo_at_commit._cache) <= 2


def test_grep_returns_empty_on_no_match(repo):
    sha = repo_at_commit.resolve(repo)
    assert repo_at_commit.grep(repo, sha, ["-F", "-l", "-e", "hello"]) == f"{sha}:a/b.txt\n"
    assert repo_at_commit.grep(repo, sha, ["-F", "-l", "-e", "khong-co"]) == ""


def test_plan_validate_source_evidence_spawns_do_not_grow_with_files(tmp_path, spawns):
    _git(tmp_path, "init", "-q")
    (tmp_path / "public").mkdir()
    for n in range(30):
        (tmp_path / "public" / f"p{n}.html").write_text(f"<main id='m{n}'>x</main>\n", encoding="utf-8")
    _commit(tmp_path, "base")

    def run(count):
        spawns.clear()
        plan = {"subtasks": [{"file": f"public/p{n}.html", "title": "t", "verify": "x"} for n in range(count)]}
        plan_validate.source_evidence({"subject": "s", "body": "b"}, plan, {"checkout_source": tmp_path})
        return len(spawns)

    assert run(3) == run(30)
