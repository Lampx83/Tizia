import io
import subprocess
import sys
import tarfile
from types import SimpleNamespace
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from preview import commit_archive


def test_preview_archives_the_commit_not_mutable_working_tree(tmp_path):
    def git(*args):
        return subprocess.run(["git", *args], cwd=tmp_path, check=True, capture_output=True, text=True).stdout.strip()
    git("init")
    (tmp_path / "public").mkdir()
    target = tmp_path / "public" / "page.html"
    target.write_text("committed candidate", encoding="utf8")
    git("add", "public/page.html")
    git("-c", "user.name=Fixture", "-c", "user.email=fixture@invalid", "commit", "-m", "synthetic candidate")
    sha = git("rev-parse", "HEAD")
    target.write_text("uncommitted edit must not leak", encoding="utf8")
    with tarfile.open(fileobj=io.BytesIO(commit_archive(tmp_path, sha)), mode="r:gz") as archive:
        assert archive.extractfile("checkout/public/page.html").read() == b"committed candidate"
        assert archive.extractfile("state.json").read() == b"{}"


def test_preview_limit_applies_to_compressed_transport_not_uncompressed_git_tar(tmp_path):
    def git(*args):
        return subprocess.run(["git", *args], cwd=tmp_path, check=True, capture_output=True, text=True).stdout.strip()
    git("init")
    (tmp_path / "public").mkdir()
    with (tmp_path / "public" / "large.txt").open("wb") as output:
        for _ in range(65):
            output.write(b"x" * 1024 * 1024)
    git("add", "public/large.txt")
    git("-c", "user.name=Fixture", "-c", "user.email=fixture@invalid", "commit", "-m", "compressible candidate")
    packed = commit_archive(tmp_path, git("rev-parse", "HEAD"))
    assert len(packed) < 64 * 1024 * 1024
    with tarfile.open(fileobj=io.BytesIO(packed), mode="r:gz") as archive:
        assert archive.getmember("checkout/public/large.txt").size == 65 * 1024 * 1024


def test_oracle_unavailable_capture_keeps_verdict_blocked_and_deletes_the_real_git_branch(tmp_path):
    import candidate
    from worker import execute_pre_pr, _preview_eligible
    repo = tmp_path / 'repo'; repo.mkdir()
    def git(at, *args):
        return subprocess.run(['git', *args], cwd=at, check=True, capture_output=True, text=True).stdout.strip()
    git(repo,'init')
    (repo/'public').mkdir(); (repo/'public'/'page.html').write_text('base',encoding='utf8')
    git(repo,'add','.'); git(repo,'-c','user.name=Fixture','-c','user.email=fixture@invalid','commit','-m','base')
    base = git(repo,'rev-parse','HEAD'); checkout = tmp_path/'checkout'; captured = []
    unavailable = {'probe_id':None,'passed':False,'reason':'No trusted behavioral oracle for this request'}
    def gate(number,_request,_deps,_budget,state):
        if number == 3:
            git(repo,'worktree','add','-b','private-preview-fixture',str(checkout))
            (checkout/'public'/'page.html').write_text('private unverified function',encoding='utf8')
            git(checkout,'add','.'); git(checkout,'-c','user.name=Fixture','-c','user.email=fixture@invalid','commit','-m','candidate')
            sha = git(checkout,'rev-parse','HEAD')
            state.update(full_checkout=str(checkout),checkout_repo=str(repo),branch='private-preview-fixture',base_sha=base,
                         commits=[{'sha':sha,'title':'candidate','files':['public/page.html']}])
        if number == 5:
            return {'gate':5,'blocked':True,'reason':unavailable['reason'],'failure_class':'plan',
                    'evidence':{'runner':'docker','smoke_passed':True,'http_observed':True,'functional':unavailable}}
        return {'gate':number,'blocked':False,'reason':None}
    def capture(state,record):
        captured.append(commit_archive(state['full_checkout'],record['head_sha']))
    result = execute_pre_pr({'capabilities':['public.ui'],'steps':[{'order':1,'title':'fixture','allowed_scope':['public/page.html'],'tests':['smoke']}]},
        ticket_id=1,checkout_source=repo,deps=object(),budget=SimpleNamespace(tick=lambda:True,units=0,retries=0,max_retries=0),
        run_gate=gate,cleanup=candidate.cleanup,preview_capture=capture)
    assert result['outcome']=='blocked' and result['candidate'] is None
    assert not checkout.exists() and not git(repo,'branch','--list','private-preview-fixture')
    assert len(captured)==1
    with tarfile.open(fileobj=io.BytesIO(captured[0]),mode='r:gz') as archive:
        assert archive.extractfile('checkout/public/page.html').read()==b'private unverified function'
    assert _preview_eligible(result['gates'],'plan')
    assert not _preview_eligible(result['gates'],'critical')
    assert not _preview_eligible([{**g,'functional':{'probe_id':'known-probe','passed':False}} if g['gate']==5 else g for g in result['gates']],'plan')
    assert not _preview_eligible([{**g,'blocked':True} if g['gate']==4 else g for g in result['gates']],'plan')
