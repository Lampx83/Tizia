"""(e2e/06): push the verified candidate, open one PR into dev, never merge or approve.
GitHub is faked at the transport; git runs for real against a local bare remote."""
import subprocess
import sys
from pathlib import Path

import pytest

import candidate
from candidate import Candidates, GitHub

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

BRANCH = 'ai-board/2026-09-26-ticket-7-abc123'


def git(cwd, *args):
    return subprocess.run(['git', '-c', 'user.name=T', '-c', 'user.email=t@example.invalid', *args], cwd=cwd,
                          check=True, capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()


class FakeApi:
    """GitHub REST double: pulls keyed by head branch."""

    def __init__(self, base='dev', head_sha=None):
        self.calls, self.pulls, self.base, self.head_sha = [], {}, base, head_sha

    def __call__(self, method, path, payload):
        self.calls.append((method, path, payload))
        if method == 'GET' and '/pulls?' in path:
            return [pr for pr in self.pulls.values() if pr['head']['ref'] in path]
        if method == 'POST' and path.endswith('/pulls'):
            number = 40 + len(self.pulls)
            pr = {'number': number, 'html_url': f'https://github.com/Lampx83/Tizia/pull/{number}',
                  'base': {'ref': self.base if self.pulls == {} else payload['base']},
                  'head': {'ref': payload['head'], 'sha': self.head_sha}}
            self.pulls[payload['head']] = pr
            return pr
        if method == 'GET' and '/pulls/' in path:
            return next(pr for pr in self.pulls.values() if path.endswith(f"/{pr['number']}"))
        return {}


@pytest.fixture
def repos(tmp_path):
    remote = tmp_path / 'remote.git'
    git(tmp_path, 'init', '-q', '--bare', '-b', 'dev', str(remote))
    clone = tmp_path / 'clone'
    git(tmp_path, 'clone', '-q', str(remote), str(clone))
    git(clone, 'commit', '-q', '--allow-empty', '-m', 'base')
    git(clone, 'push', '-q', 'origin', 'HEAD:refs/heads/dev')
    base = git(clone, 'rev-parse', 'HEAD')
    git(clone, 'checkout', '-q', '-b', BRANCH)
    (clone / 'x.txt').write_text('x', encoding='utf-8')
    git(clone, 'add', 'x.txt')
    git(clone, 'commit', '-q', '-m', 'change')
    head = git(clone, 'rev-parse', 'HEAD')
    git(clone, 'checkout', '-q', '--detach', 'dev')
    return remote, clone, {'branch': BRANCH, 'base_sha': base, 'head_sha': head,
                           'commits': [{'sha': head, 'title': 'change', 'files': ['x.txt']}]}


def github(remote, api, token='tok-secret-123'):
    return GitHub('Lampx83/Tizia', token, transport=api, remote_url=str(remote))


def test_publish_pushes_the_branch_and_opens_exactly_one_pr_into_dev(repos):
    remote, clone, cand = repos
    api = FakeApi(head_sha=cand['head_sha'])
    gh = github(remote, api)
    first = Candidates(clone, github=gh).publish(cand, title='t', body='b', labels=['ai-board'])
    again = Candidates(clone, github=gh).publish(cand, title='t', body='b')
    assert first == again == {'number': 40, 'url': 'https://github.com/Lampx83/Tizia/pull/40', 'branch': BRANCH,
                              'base': 'dev', 'base_sha': cand['base_sha'], 'head_sha': cand['head_sha']}
    assert git(remote, 'rev-parse', BRANCH) == cand['head_sha']
    assert [c[:2] for c in api.calls if c[0] == 'POST' and c[1].endswith('/pulls')] == [
        ('POST', '/repos/Lampx83/Tizia/pulls')]
    assert api.calls[1][2]['base'] == 'dev' and api.calls[1][2]['head'] == BRANCH
    assert not any('/merge' in path or '/reviews' in path for _, path, _ in api.calls)
    assert not any(hasattr(GitHub, name) for name in ('merge', 'approve', 'review'))


def test_existing_pr_with_a_wrong_base_is_rejected(repos):
    remote, clone, cand = repos
    api = FakeApi(base='main', head_sha=cand['head_sha'])
    api.pulls[BRANCH] = {'number': 9, 'html_url': 'https://github.com/Lampx83/Tizia/pull/9',
                         'base': {'ref': 'main'}, 'head': {'ref': BRANCH, 'sha': cand['head_sha']}}
    with pytest.raises(ValueError, match='dev'):
        Candidates(clone, github=github(remote, api)).publish(cand, title='t', body='b')


def test_pr_head_that_is_not_the_verified_head_is_stale(repos):
    remote, clone, cand = repos
    api = FakeApi(head_sha='f' * 40)
    with pytest.raises(ValueError, match='head'):
        Candidates(clone, github=github(remote, api)).publish(cand, title='t', body='b')


def test_only_ai_board_branches_are_ever_pushed(repos):
    remote, clone, _ = repos
    gh = github(remote, FakeApi())
    for branch in ('dev', 'main', 'refs/heads/dev', 'ai-board/../dev'):
        with pytest.raises(ValueError, match='AI Board'):
            gh.push(clone, branch)
    assert git(remote, 'branch', '--list', 'main') == ''


def test_token_reaches_git_only_through_the_child_env(monkeypatch, repos):
    remote, clone, cand = repos
    seen = []
    real = subprocess.run

    def spy(args, **kwargs):
        if args[:1] == ['git'] and 'push' in args:
            seen.append((args, kwargs.get('env') or {}))
        return real(args, **kwargs)

    monkeypatch.setattr(candidate.subprocess, 'run', spy)
    github(remote, FakeApi(), token='tok-secret-123').push(clone, BRANCH)
    (args, env), = seen
    assert 'tok-secret-123' not in ' '.join(args)
    assert env['AI_BOARD_PUSH_TOKEN'] == 'tok-secret-123'
    assert 'AI_BOARD_PUSH_TOKEN' not in __import__('os').environ


def test_rollback_of_a_merged_pr_reverts_its_merge_commit(repos, monkeypatch):
    monkeypatch.setenv('PR_BASE_BRANCH', 'dev')
    remote, clone, cand = repos
    work = remote.parent / 'work'
    git(remote.parent, 'clone', '-q', str(remote), str(work))
    git(work, 'fetch', '-q', str(clone), f'{BRANCH}:{BRANCH}')
    git(work, 'checkout', '-q', 'dev')
    git(work, 'merge', '-q', '--squash', BRANCH)  # a squash merge is not an ancestor of dev
    git(work, 'commit', '-q', '-m', 'Squash PR #40')
    squash = git(work, 'rev-parse', 'HEAD')
    git(work, 'push', '-q', 'origin', 'dev')
    git(clone, 'fetch', '-q', 'origin')
    api = FakeApi(head_sha=cand['head_sha'])
    api.pulls[BRANCH] = {'number': 40, 'html_url': 'https://github.com/Lampx83/Tizia/pull/40', 'merged': True,
                         'merge_commit_sha': squash, 'base': {'ref': 'dev'}, 'head': {'ref': BRANCH}}
    out = Candidates(clone, github=github(remote, api)).rollback(cand, 7, pull_request={'number': 40})
    assert out['outcome'] == 'revert_ready'
    assert git(clone, 'ls-tree', '--name-only', out['revert']['branch']) == ''  # x.txt reverted


def test_rollback_of_an_open_pr_deletes_the_pushed_branch(repos):
    remote, clone, cand = repos
    api = FakeApi(head_sha=cand['head_sha'])
    gh = github(remote, api)
    Candidates(clone, github=gh).publish(cand, title='t', body='b')
    api.pulls[BRANCH]['merged'] = False
    out = Candidates(clone, github=gh).rollback(cand, 7, pull_request={'number': 40})
    assert out['outcome'] == 'discarded'
    assert git(remote, 'branch', '--list', BRANCH) == ''  # GitHub closes a PR whose head branch is gone


def _pr_remote(remote, clone, cand, number=40):
    """Publish the candidate as GitHub does: refs/pull/<n>/head on the remote."""
    git(clone, 'push', '-q', str(remote), f"{cand['head_sha']}:refs/pull/{number}/head")


def test_review_builds_the_exact_candidate_from_latest_dev_and_pr_head(repos):
    import review_pr

    remote, clone, cand = repos
    _pr_remote(remote, clone, cand)
    built = review_pr.build(clone, 40, cand['head_sha'])
    try:
        assert built['base_sha'] == git(remote, 'rev-parse', 'dev') and built['head_sha'] == cand['head_sha']
        assert git(built['checkout'], 'rev-parse', 'HEAD^2') == cand['head_sha']
        assert (Path(built['checkout']) / 'x.txt').exists()
    finally:
        review_pr.cleanup(clone, built['checkout'])
    assert review_pr.is_current({'base_sha': built['base_sha'], 'head_sha': built['head_sha']},
                                built['base_sha'], built['head_sha'])
    assert not review_pr.is_current({'base_sha': built['base_sha'], 'head_sha': 'c' * 40},
                                    built['base_sha'], built['head_sha'])  # new push to the PR
    assert not review_pr.is_current({'base_sha': 'd' * 40, 'head_sha': built['head_sha']},
                                    built['base_sha'], built['head_sha'])  # dev moved


def test_review_stops_on_conflict_or_a_stale_head(repos):
    import review_pr

    remote, clone, cand = repos
    _pr_remote(remote, clone, cand)
    with pytest.raises(review_pr.ReviewStop, match='head'):
        review_pr.build(clone, 40, 'e' * 40)
    work = remote.parent / 'work2'
    git(remote.parent, 'clone', '-q', '-b', 'dev', str(remote), str(work))
    (work / 'x.txt').write_text('other', encoding='utf-8')  # dev now edits the same file
    git(work, 'add', 'x.txt')
    git(work, 'commit', '-q', '-m', 'dev edit')
    git(work, 'push', '-q', 'origin', 'dev')
    with pytest.raises(review_pr.ReviewStop, match='conflict'):
        review_pr.build(clone, 40, cand['head_sha'])
    assert git(clone, 'worktree', 'list').count('\n') == 0  # nothing left behind


def test_review_refuses_a_pr_into_another_base_or_branch():
    import review_pr

    with pytest.raises(review_pr.ReviewStop, match='dev'):
        review_pr.check_pr({'number': 1, 'base': {'ref': 'main'}, 'head': {'ref': BRANCH}})
    with pytest.raises(review_pr.ReviewStop, match='AI Board'):
        review_pr.check_pr({'number': 1, 'base': {'ref': 'dev'}, 'head': {'ref': 'feature/x'}})
    review_pr.check_pr({'number': 1, 'base': {'ref': 'dev'}, 'head': {'ref': BRANCH}})


def test_review_of_a_self_pr_uses_the_self_edit_rules(tmp_path):
    """PR gắn nhãn ai-board:self → guard theo luật self, không Docker smoke (bằng chứng là eval)."""
    import review_pr

    repo = tmp_path / 'r'
    skill = repo / 'ai-board' / 'harness' / 'skills' / 'default' / 'SKILL.md'
    skill.parent.mkdir(parents=True)
    skill.write_text('match: sửa chữ\n', encoding='utf-8')
    git(tmp_path, 'init', '-q', str(repo))
    git(repo, 'add', '-A')
    git(repo, 'commit', '-q', '-m', 'base')
    base = git(repo, 'rev-parse', 'HEAD')
    skill.write_text('match: sửa chữ, đổi tên\n', encoding='utf-8')
    git(repo, 'commit', '-q', '-am', 'self')
    built = {'checkout': str(repo), 'base_sha': base}
    assert review_pr.request_type({'labels': [{'name': 'ai-board'}, {'name': 'ai-board:self'}]}) == 'self'
    assert review_pr.request_type({'labels': [{'name': 'ai-board'}]}) is None
    ok = review_pr.check(built, 1, request_type='self')
    assert ok['guard_problems'] == [] and ok['passed'] is True
    assert any('protected_path' in p for p in review_pr.check(built, 1)['guard_problems'])


def test_pull_files_reads_every_page():
    pages = {1: [{'filename': f'public/{i}.html'} for i in range(100)], 2: [{'filename': 'server/x.js'}]}
    calls = []

    def api(method, path, payload):
        calls.append(path)
        return pages.get(int(path.rsplit('page=', 1)[1]), [])

    files = GitHub('Lampx83/Tizia', 'tok', transport=api).pull_files(7)
    assert len(files) == 101 and files[-1] == 'server/x.js'
    assert calls == ['/repos/Lampx83/Tizia/pulls/7/files?per_page=100&page=1',
                     '/repos/Lampx83/Tizia/pulls/7/files?per_page=100&page=2']
