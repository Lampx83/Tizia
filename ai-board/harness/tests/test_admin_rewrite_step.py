import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

import worker  # noqa: E402


class FakeRewrite:
    def __init__(self, status):
        self.status = status
        self.calls = []

    def run_step(self, client, deps, *, worker_id):
        self.calls.append(worker_id)
        return {'status': self.status, 'job_id': 1} if self.status != 'none' else {'status': 'none'}


def test_idle_worker_runs_one_admin_rewrite_and_reports():
    rewrite = FakeRewrite('reported')
    step = worker.admin_rewrite_step('idle', None, None, 'w1', rewrite=rewrite)
    assert rewrite.calls == ['w1']
    assert step == {'skill_rewrite': {'status': 'reported', 'job_id': 1}}


def test_busy_worker_does_not_claim_a_rewrite():
    rewrite = FakeRewrite('reported')
    assert worker.admin_rewrite_step('claimed', None, None, 'w1', rewrite=rewrite) is None
    assert rewrite.calls == []


def test_no_queued_job_returns_nothing():
    rewrite = FakeRewrite('none')
    assert worker.admin_rewrite_step('idle', None, None, 'w1', rewrite=rewrite) is None


def test_worker_has_no_retro_or_self_improve_or_proposal_path():
    source = (ROOT / 'worker.py').read_text(encoding='utf-8')
    for banned in ('skill_retro', 'run_self_improve_night', 'skill-proposals', 'self-improve'):
        assert banned not in source, banned
