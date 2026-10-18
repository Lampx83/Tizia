import json
import sys

import pytest

from evaluation.suite import comparison, interleaved


def test_two_arm_schedule_has_one_attempt_per_task_and_rejects_pin_drift(tmp_path):
    blocks = [{'id': f't{i}', 'mode': 'e2e', 'repeat': 1, 'split': 'dev'} for i in range(42)]
    pins = {name: 'pinned' for name in interleaved.PINS}
    manifest = interleaved.prepare(tmp_path, blocks, pins, seed=12, warm_cold='cold-first', load_notes='idle', arms=comparison.ARMS)
    assert len(manifest['schedule']) == 84
    leaders = [row['arm'] for row in manifest['schedule'][::2]]
    assert all(left != right for left, right in zip(leaders, leaders[1:]))
    assert all({row['arm'] for row in manifest['schedule'] if row['id'] == block['id']} == set(comparison.ARMS) for block in blocks)
    assert interleaved.prepare(tmp_path, blocks, pins, seed=12, warm_cold='cold-first', load_notes='idle', arms=comparison.ARMS) == manifest
    with pytest.raises(ValueError, match='pins changed'):
        interleaved.prepare(tmp_path, blocks, {**pins, 'source': 'changed'}, seed=12, warm_cold='cold-first', load_notes='idle', arms=comparison.ARMS)


@pytest.mark.parametrize('arm', comparison.ARMS)
def test_both_arms_receive_the_common_request_bound(tmp_path, monkeypatch, arm):
    corpus = tmp_path/'cases.json'
    corpus.write_bytes(b'[]')
    monkeypatch.setattr(comparison, 'configured_deps', lambda model: object())
    monkeypatch.setattr(comparison, 'code_pins', lambda deps: {})
    monkeypatch.setattr(comparison, 'cases', lambda path: [{'id': 't1'}])
    def run(*args, budget=None, **kwargs):
        assert budget.max_request_tokens == 32768 and budget.max_tokens == 200000
        return {'id': 't1', 'resolved': False}
    monkeypatch.setattr(comparison.trial, 'run_trial', run)
    monkeypatch.setattr(comparison.mini_swe, 'run_trial', run)
    protocol = {'config': {'model': 'model', 'context_length': 32768, 'corpus': str(corpus),
                 'root': str(tmp_path), 'source': str(tmp_path), 'mini_runtime': str(tmp_path)},
                'details': {'code': {}}, 'pins': {'corpus': comparison.hashlib.sha256(b'[]').hexdigest()}}
    assert comparison.one_trial(protocol, {'id': 't1', 'arm': arm})['arm'] == arm


def test_mismatched_trial_result_stops_comparison_before_next_attempt(tmp_path):
    interleaved.prepare(tmp_path, [{'id': 't1', 'mode': 'e2e', 'repeat': 1}],
                        {name: 'pinned' for name in interleaved.PINS}, seed=1,
                        warm_cold='cold', load_notes='idle', arms=comparison.ARMS)
    events = interleaved.execute(tmp_path, [sys.executable, '-c', 'print(\'{"id":"wrong","mode":"e2e","resolved":true}\')'], timeout_s=10)
    assert len([event for event in events if event['event'] == 'intent']) == 1
    assert events[-1]['cleanup_pending']


def test_report_keeps_timeout_and_unresolved_intent_with_unknown_cost(tmp_path):
    (tmp_path / 'comparison.json').write_text('{}', encoding='utf-8')
    events = [
        {'event': 'intent', 'attempt_id': 'a', 'trial': {'id': 't1', 'arm': 'ai-board'}},
        {'event': 'result', 'attempt_id': 'a', 'status': 'success', 'wall_s': 4,
         'result': {'id': 't1', 'resolved': True, 'collateral': [], 'model_calls': 2, 'tokens_in': 50, 'tokens_out': 10}},
        {'event': 'intent', 'attempt_id': 'b', 'trial': {'id': 't1', 'arm': 'mini-swe'}},
        {'event': 'result', 'attempt_id': 'b', 'status': 'timeout', 'result': None, 'wall_s': 300},
        {'event': 'intent', 'attempt_id': 'c', 'trial': {'id': 't2', 'arm': 'ai-board'}},
    ]
    (tmp_path / 'attempts.jsonl').write_text('\n'.join(json.dumps(event) for event in events), encoding='utf-8')
    result = comparison.report(tmp_path)
    assert not result['complete'] and result['cleanup_pending']
    assert result['arms']['ai-board']['attempted'] == 2 and result['arms']['ai-board']['pending'] == 40
    assert result['arms']['ai-board']['resolved_clean'] == 1 and result['arms']['ai-board']['denominator'] == 42
    assert result['arms']['mini-swe']['timeouts'] == 1
    assert result['arms']['mini-swe']['costs']['tokens_in']['total'] is None
    assert result['arms']['mini-swe']['costs']['wall_s']['total'] == 300
    assert result['winner'] is None and not result['promote_defaults']
    assert result['paired']['attempted_pairs'] == 1


def test_model_pin_mismatch_stops_without_claiming_pending_remote_cleanup(tmp_path):
    interleaved.prepare(tmp_path, [{'id': 't1', 'mode': 'e2e', 'repeat': 1}],
                        {name: 'pinned' for name in interleaved.PINS}, seed=1,
                        warm_cold='cold', load_notes='idle', arms=comparison.ARMS)
    payload = json.dumps({'id': 't1', 'mode': 'e2e', 'resolved': False, 'incomparable': True,
                          'infra_error': True, 'error': 'model_pin_mismatch', 'collateral': []})
    events = interleaved.execute(tmp_path, [sys.executable, '-c', f'print({payload!r})'], timeout_s=10)
    assert len([event for event in events if event['event'] == 'intent']) == 1
    assert not events[-1].get('cleanup_pending')
    with pytest.raises(ValueError, match='incomparable attempt'):
        interleaved.execute(tmp_path, [sys.executable, '-c', 'raise AssertionError("must not run")'], timeout_s=10)
    (tmp_path / 'comparison.json').write_text('{}', encoding='utf-8')
    result = comparison.report(tmp_path)
    assert not result['complete'] and not result['comparable'] and not result['cleanup_pending']
