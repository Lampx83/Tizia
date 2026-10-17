"""LocalForge: PR open/reject/merge/revert semantics against a real local bare repo, through the same GitHub/Candidates code the worker runs."""
import subprocess

import pytest

from candidate import Candidates, GitHub
from services.local_forge import LocalForge, local_github

BRANCH = 'ai-board/2026-10-17-ticket-9-abc123'


def git(cwd, *args):
    return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=cwd,
                          check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()


@pytest.fixture
def world(tmp_path):
    remote = tmp_path / 'forge.git'
    git(tmp_path, 'init', '-q', '--bare', '-b', 'dev', str(remote))
    clone = tmp_path / 'clone'
    git(tmp_path, 'clone', '-q', str(remote), str(clone))
    (clone / 'a.txt').write_text('a', encoding='utf-8')
    git(clone, 'add', 'a.txt')
    git(clone, 'commit', '-q', '-m', 'base')
    git(clone, 'push', '-q', 'origin', 'HEAD:refs/heads/dev')
    base = git(clone, 'rev-parse', 'HEAD')
    git(clone, 'checkout', '-q', '-b', BRANCH)
    (clone / 'x.txt').write_text('x', encoding='utf-8')
    git(clone, 'add', 'x.txt')
    git(clone, 'commit', '-q', '-m', 'change')
    head = git(clone, 'rev-parse', 'HEAD')
    git(clone, 'checkout', '-q', '--detach', 'dev')
    forge = LocalForge(remote)
    candidates = Candidates(clone, github=local_github(remote, GitHub))
    forge = candidates.github.transport
    cand = {'branch': BRANCH, 'base_sha': base, 'head_sha': head, 'commits': [{'sha': head, 'title': 'change', 'files': ['x.txt']}]}
    return remote, clone, forge, candidates, cand


def test_publish_opens_one_pr_into_dev_with_the_verified_head(world):
    remote, clone, forge, candidates, cand = world
    first = candidates.publish(cand, title='t', body='b', labels=['ai-board'])
    again = candidates.publish(cand, title='t', body='b')
    assert first == again and first['number'] == 1 and first['base'] == 'dev' and first['head_sha'] == cand['head_sha']
    assert git(remote, 'rev-parse', BRANCH) == cand['head_sha']
    assert forge('GET', '/repos/local/demo/pulls/1', None)['labels'] == ['ai-board']
    assert [f['filename'] for f in forge('GET', '/repos/local/demo/pulls/1/files?per_page=100&page=1', None)] == ['x.txt']
    assert git(remote, 'rev-parse', 'dev') == cand['base_sha']


def test_reject_before_merge_deletes_the_remote_and_local_branch_and_closes_the_pr(world):
    remote, clone, forge, candidates, cand = world
    pr = candidates.publish(cand, title='t', body='b')
    out = candidates.rollback(cand, 9, pull_request=pr)
    assert out['outcome'] == 'discarded'
    assert subprocess.run(['git', '-C', str(remote), 'rev-parse', '--verify', '--quiet', BRANCH]).returncode
    assert subprocess.run(['git', '-C', str(clone), 'rev-parse', '--verify', '--quiet', BRANCH]).returncode
    view = forge('GET', '/repos/local/demo/pulls/1', None)
    assert view['state'] == 'closed' and not view['merged']
    assert git(remote, 'rev-parse', 'dev') == cand['base_sha']


def test_revert_after_merge_makes_a_revert_branch_and_never_touches_dev(world):
    remote, clone, forge, candidates, cand = world
    pr = candidates.publish(cand, title='t', body='b')
    merge_commit = forge.merge(pr['number'])
    git(clone, 'fetch', '-q', 'origin', '+refs/heads/dev:refs/remotes/origin/dev')
    assert forge('GET', '/repos/local/demo/pulls/1', None)['merged']
    out = candidates.rollback(cand, 9, pull_request=pr)
    assert out['outcome'] == 'revert_ready'
    revert = out['revert']
    assert git(remote, 'rev-parse', 'dev') == merge_commit
    assert git(clone, 'show', f"{revert['head_sha']}:a.txt") == 'a'
    assert subprocess.run(['git', '-C', str(clone), 'cat-file', '-e', f"{revert['head_sha']}:x.txt"], capture_output=True).returncode
    assert revert['commits'][-1]['files'] == ['x.txt']


def test_forge_refuses_a_plain_directory_and_an_unpushed_branch(world, tmp_path):
    remote, clone, forge, candidates, cand = world
    (tmp_path / 'plain').mkdir()
    with pytest.raises(ValueError):
        LocalForge(tmp_path / 'plain')
    with pytest.raises(OSError):
        forge('POST', '/repos/local/demo/pulls', {'head': BRANCH, 'base': 'dev', 'title': 't', 'body': ''})


def test_merge_makes_a_real_merge_commit_and_only_merges_an_open_pr(world):
    remote, clone, forge, candidates, cand = world
    pr = candidates.publish(cand, title='t', body='b')
    merge = forge.merge(pr['number'])
    assert len(git(remote, 'rev-list', '--parents', '-n', '1', merge).split()) == 3
    with pytest.raises(ValueError):
        forge.merge(pr['number'])


def test_pr_numbers_are_unique_and_a_closed_pr_cannot_be_merged(world):
    remote, clone, forge, candidates, cand = world
    first = candidates.publish(cand, title='t', body='b')
    candidates.rollback(cand, 9, pull_request=first)
    git(clone, 'branch', '-f', BRANCH, cand['head_sha'])
    second = candidates.publish(cand, title='t', body='b')
    assert (first['number'], second['number']) == (1, 2)
    with pytest.raises(ValueError):
        forge.merge(first['number'])
