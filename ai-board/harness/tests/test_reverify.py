"""Re-verification on a moved base, with real git: a clean rebase carries the candidate, a conflict or an already-contained candidate stops and leaves nothing behind."""
import subprocess
from pathlib import Path

import pytest

from services import reverify
from services.candidate import PR_BASE

BRANCH = 'ai-board/2026-10-17-ticket-9-abc123'


def git(cwd, *args):
    return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=cwd,
                          check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()


def commit(repo, name, text, message):
    path = Path(repo) / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    git(repo, 'add', name)
    git(repo, 'commit', '-q', '-m', message)
    return git(repo, 'rev-parse', 'HEAD')


@pytest.fixture
def world(tmp_path):
    repo = tmp_path / 'repo'
    git(tmp_path, 'init', '-q', '-b', PR_BASE, str(repo))
    base = commit(repo, 'public/a.html', 'one\ntwo\nthree\n', 'base')
    git(repo, 'checkout', '-q', '-b', BRANCH)
    c1 = commit(repo, 'public/a.html', 'one\nTWO\nthree\n', 'ai-board(ticket-9): 1/2 change a')
    c2 = commit(repo, 'test/a.test.js', 'import test from "node:test";\n', 'ai-board(ticket-9): 2/2 test')
    git(repo, 'checkout', '-q', PR_BASE)
    cand = {'branch': BRANCH, 'base_sha': base, 'head_sha': c2,
            'commits': [{'sha': c1, 'title': 'change a', 'files': ['public/a.html']}, {'sha': c2, 'title': 'test', 'files': ['test/a.test.js']}]}
    return repo, base, cand


def branches(repo):
    return set(git(repo, 'branch', '--format=%(refname:short)').split())


def test_base_tip_follows_the_pr_base_and_is_none_without_it(world, tmp_path, monkeypatch):
    monkeypatch.delenv('PR_BASE_BRANCH', raising=False)
    repo, base, _ = world
    assert reverify.base_tip(repo) == base
    new = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    assert reverify.base_tip(repo) == new
    empty = tmp_path / 'empty'
    git(tmp_path, 'init', '-q', '-b', 'other', str(empty))
    assert reverify.base_tip(empty) is None
    git(repo, 'branch', 'release', base)
    monkeypatch.setenv('PR_BASE_BRANCH', 'release')
    assert reverify.base_tip(repo) == base


def test_a_clean_rebase_carries_every_commit_onto_the_new_tip(world):
    repo, base, cand = world
    tip = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    out = reverify.integrate(repo, cand, tip, label='ticket-9')
    checkout = Path(out['full_checkout'])
    try:
        assert out['base_sha'] == tip and out['branch'].startswith('ai-board/') and out['branch'] != BRANCH
        assert [c['files'] for c in out['commits']] == [['public/a.html'], ['test/a.test.js']]
        assert git(checkout, 'rev-parse', 'HEAD') == out['commits'][-1]['sha']
        assert (checkout / 'public/b.html').exists() and 'TWO' in (checkout / 'public/a.html').read_text(encoding='utf-8')
        assert 'public/a.html' in out['full_diff'][0]['diff'] and 'public/b.html' not in out['full_diff'][0]['diff']
        assert git(repo, 'rev-parse', BRANCH) == cand['head_sha']
        assert [d['file'] for d in reverify.diffs_of(out['commits'])] == ['public/a.html', 'test/a.test.js']
        assert reverify.diffs_of(out['commits'])[0]['test_file'] is None
    finally:
        git(repo, 'worktree', 'remove', '--force', str(checkout))


def test_a_conflict_stops_and_leaves_no_branch_or_worktree(world):
    repo, base, cand = world
    tip = commit(repo, 'public/a.html', 'one\nOTHER\nthree\n', 'dev edits the same line')
    before = branches(repo)
    with pytest.raises(reverify.Conflict) as error:
        reverify.integrate(repo, cand, tip, label='ticket-9')
    assert error.value.files == ['public/a.html']
    assert branches(repo) == before
    assert git(repo, 'worktree', 'list').count('\n') == 0


def test_a_candidate_already_in_the_base_is_reported_not_rebuilt(world):
    repo, base, cand = world
    git(repo, 'merge', '-q', '--ff-only', BRANCH)
    tip = git(repo, 'rev-parse', PR_BASE)
    before = branches(repo)
    with pytest.raises(reverify.Conflict) as error:
        reverify.integrate(repo, cand, tip, label='ticket-9')
    assert 'already in' in str(error.value) and error.value.files == []
    assert branches(repo) == before


def test_a_missing_commit_object_is_an_error_not_a_silent_pass(world):
    repo, base, cand = world
    tip = commit(repo, 'public/b.html', 'b\n', 'dev moved')
    ghost = {**cand, 'commits': [{'sha': 'f' * 40, 'title': 'x', 'files': ['x']}]}
    before = branches(repo)
    with pytest.raises(reverify.Conflict):
        reverify.integrate(repo, ghost, tip, label='ticket-9')
    assert branches(repo) == before


def test_observe_base_posts_the_tip_of_the_pr_base_and_reports_a_missing_base(world, tmp_path, monkeypatch):
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    import worker
    monkeypatch.delenv('PR_BASE_BRANCH', raising=False)
    repo, base, _ = world
    posted = []

    class Client:
        def post(self, path, body):
            posted.append((path, body))
            return {'ref': body['ref'], 'sha': body['sha'], 'changed': True}

    assert worker.observe_base(Client(), repo) == {'status': 'observed', 'ref': PR_BASE, 'sha': base, 'changed': True}
    assert posted == [('/api/ai-board/worker/base', {'ref': PR_BASE, 'sha': base})]
    empty = tmp_path / 'empty'
    git(tmp_path, 'init', '-q', '-b', 'other', str(empty))
    assert worker.observe_base(Client(), empty) == {'status': 'no_base'} and len(posted) == 1


def test_the_remote_tracking_base_wins_over_a_stale_local_branch(world, tmp_path, monkeypatch):
    monkeypatch.delenv('PR_BASE_BRANCH', raising=False)
    repo, base, _ = world
    clone = tmp_path / 'clone'
    git(tmp_path, 'clone', '-q', str(repo), str(clone))
    git(clone, 'checkout', '-q', PR_BASE)
    ahead = commit(repo, 'public/b.html', 'b\n', 'origin moved')
    git(clone, 'fetch', '-q', 'origin')
    assert git(clone, 'rev-parse', PR_BASE) == base
    assert reverify.base_tip(clone) == ahead


def test_diffs_of_separates_the_test_file_whichever_folder_or_order(world):
    commits = [{'sha': 'a' * 40, 'files': ['tests/x.test.js', 'public/p.html']}, {'sha': 'b' * 40, 'files': ['test/y.test.js']}]
    assert reverify.diffs_of(commits) == [{'file': 'public/p.html', 'test_file': 'tests/x.test.js', 'commit': 'a' * 40},
                                           {'file': 'test/y.test.js', 'test_file': 'test/y.test.js', 'commit': 'b' * 40}]
