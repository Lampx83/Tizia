"""Evaluation policy for the hosted API: DEV may use it, sealed splits may not, runs stay comparable only within one provider."""
import argparse
import io
import json

import pytest

from evaluation.suite import runner
from runtime.pipeline import Deps
from providers.routing import ModelRouter
from test_api_fallback import busy, catalog, deps_for, env
from test_eval_suite import _rows


def run_isolated(monkeypatch, capsys, split):
    import dotenv
    from evaluation.suite import isolated, trial
    seen = {}
    monkeypatch.setattr(dotenv, 'load_dotenv', lambda *_a, **_k: None)
    monkeypatch.setattr(Deps, 'real', staticmethod(lambda: deps_for(env(), busy())))
    monkeypatch.setattr(trial, 'run_trial', lambda task, mode, deps, *a, **k: seen.update(deps=deps) or {'id': task['id']})
    request = {'task': {'id': 't', 'split': split}, 'mode': 'e2e', 'root': '.', 'source': '.', 'wall_s': 10}
    monkeypatch.setattr('sys.stdin', io.StringIO(json.dumps(request)))
    isolated.main()
    capsys.readouterr()
    return seen['deps'].models.routing


def test_dev_trials_may_use_the_hosted_api(monkeypatch, capsys):
    router = run_isolated(monkeypatch, capsys, 'dev')
    assert not router.local_only and [c['id'] for c in router.candidates('gate1')] == ['h']


@pytest.mark.parametrize('split', ['heldout', 'pack', None])
def test_sealed_or_unmarked_trials_refuse_the_hosted_api(monkeypatch, capsys, split):
    router = run_isolated(monkeypatch, capsys, split)
    assert router.local_only
    with pytest.raises(RuntimeError, match='evaluation'):
        router.candidates('gate1')


def test_verdict_pin_wins_over_the_probe():
    pinned = ModelRouter(env(AI_BOARD_API_VERDICT='vllm'), catalog(), probe=busy(5, 5))
    assert [c['id'] for c in pinned.candidates('gate1')] == ['v']
    pinned = ModelRouter(env(AI_BOARD_API_VERDICT='api'), catalog(), probe=busy(0, 0))
    assert [c['id'] for c in pinned.candidates('gate1')] == ['h']


def write_run(path, meta, rows):
    path.mkdir(parents=True)
    (path / 'run.json').write_text(json.dumps(meta), encoding='utf-8')
    (path / 'results.jsonl').write_text(''.join(json.dumps(r) + '\n' for r in rows), encoding='utf-8')
    return str(path / 'results.jsonl')


def test_compare_flags_runs_on_different_providers(tmp_path, capsys):
    rows = _rows([(True, False)] * 4)
    base = {'status': 'complete', 'integrity': [], 'dirty': False, 'budget': {'a': 1}, 'model': 'qwen'}
    local = write_run(tmp_path / 'a', base, rows)
    hosted = write_run(tmp_path / 'b', {**base, 'provider': 'api', 'model': 'gemini-2.5-flash'}, rows)
    same = write_run(tmp_path / 'c', base, rows)
    runner.cmd_compare(argparse.Namespace(baseline=local, candidate=hosted))
    out = capsys.readouterr().out
    assert 'incomparable' in out and 'provider' in out
    runner.cmd_compare(argparse.Namespace(baseline=local, candidate=same))
    assert 'provider' not in capsys.readouterr().out


def test_integrity_accepts_only_the_pinned_provider():
    row = {'mode': 'e2e', 'providers': ['api'], 'served': []}
    assert not any('provider' in p for p in runner.integrity({'provider': 'api', 'model': 'm'}, [row]))
    assert any('provider' in p for p in runner.integrity({'model': 'm'}, [row]))
