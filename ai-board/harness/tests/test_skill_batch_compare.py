import json

import pytest

from evaluation import skill_batch_compare as cmp


def summary(passed, *, tokens=1000, calls=4, cases=4):
    return {'passed': passed, 'failed': [], 'cases': cases, 'pass_rate': round(len(passed) / cases, 4),
            'calls': calls, 'tokens': tokens}


def write(path, payload):
    path.write_text(json.dumps(payload, ensure_ascii=False), encoding='utf-8')
    return path


def test_multi_skill_wins_on_equal_quality_with_fewer_tokens():
    verdict = cmp.decide(summary(['c1', 'c2'], tokens=900, calls=2), summary(['c1', 'c2'], tokens=1200, calls=6))
    assert (verdict['winner'], verdict['selected']) == ('multi-skill', 'multi-skill')
    assert '300 token' in verdict['reason']


def test_per_skill_wins_when_multi_skill_drops_a_case():
    verdict = cmp.decide(summary(['c1'], tokens=500), summary(['c1', 'c2'], tokens=1500))
    assert verdict['winner'] == 'per-skill'
    assert '2/4 case pass' in verdict['reason']


def test_split_cases_and_identical_metrics_stay_on_current_behaviour():
    split = cmp.decide(summary(['c1', 'c2']), summary(['c2', 'c3']))
    same = cmp.decide(summary(['c1']), summary(['c1']))
    assert (split['winner'], split['selected']) == (None, 'per-skill')
    assert (same['winner'], same['selected']) == (None, 'per-skill')
    assert same['reason'].startswith('hoà')


def test_fewer_calls_breaks_a_token_tie():
    verdict = cmp.decide(summary(['c1'], tokens=1000, calls=1), summary(['c1'], tokens=1000, calls=3))
    assert verdict['winner'] == 'multi-skill' and '2 lần gọi' in verdict['reason']


def test_aggregate_counts_pass_calls_tokens_and_keyword_check():
    cases = [{'id': 'c1', 'expect': ['Red', 'green']}, {'id': 'c2', 'expect': ['two axes']}]
    runs = {'c1': {'calls': 1, 'tokens': 100, 'output': 'red then GREEN'},
            'c2': {'calls': 2, 'tokens': 50, 'output': 'single axis'}}
    row = cmp.aggregate(cases, runs)
    assert row['passed'] == ['c1'] and row['failed'] == ['c2']
    assert (row['calls'], row['tokens'], row['pass_rate']) == (3, 150, 0.5)


@pytest.mark.parametrize('runs', [
    {'c1': {'calls': 1, 'tokens': 1, 'output': ''}},
    {'c1': {'calls': 1, 'tokens': 1, 'output': ''}, 'c2': {'calls': 1, 'tokens': 1, 'output': ''},
     'c9': {'calls': 1, 'tokens': 1, 'output': ''}},
])
def test_aggregate_rejects_cohort_mismatch(runs):
    cases = [{'id': 'c1', 'expect': ['x']}, {'id': 'c2', 'expect': ['y']}]
    with pytest.raises(ValueError):
        cmp.aggregate(cases, runs)


def test_load_results_rejects_wrong_mode_negative_cost_and_duplicates(tmp_path):
    good = {'case': 'c1', 'calls': 1, 'tokens': 10, 'output': 'x'}
    for payload in ({'mode': 'per-skill', 'runs': [good]},
                    {'mode': 'multi-skill', 'runs': [dict(good, tokens=-1)]},
                    {'mode': 'multi-skill', 'runs': [good, good]}):
        path = write(tmp_path / 'r.json', payload)
        with pytest.raises(ValueError):
            cmp.load_results(path, 'multi-skill')


def test_load_gold_tolerates_utf8_bom(tmp_path):
    path = tmp_path / 'gold.json'
    path.write_bytes(b'\xef\xbb\xbf' + json.dumps({'cases': [{'id': 'c1', 'expect': ['x']}]}).encode())
    assert cmp.load_gold(path)[0]['id'] == 'c1'


def test_compare_end_to_end_picks_multi_skill_from_files(tmp_path):
    gold = write(tmp_path / 'gold.json', {'cases': [{'id': 'c1', 'expect': ['red']},
                                                    {'id': 'c2', 'expect': ['spec']}]})
    multi = write(tmp_path / 'multi.json', {'mode': 'multi-skill', 'runs': [
        {'case': 'c1', 'calls': 1, 'tokens': 400, 'output': 'red'},
        {'case': 'c2', 'calls': 1, 'tokens': 400, 'output': 'spec'}]})
    per = write(tmp_path / 'per.json', {'mode': 'per-skill', 'runs': [
        {'case': 'c1', 'calls': 3, 'tokens': 900, 'output': 'red'},
        {'case': 'c2', 'calls': 3, 'tokens': 900, 'output': 'spec'}]})
    report = cmp.compare(gold, multi, per)
    assert (report['winner'], report['cases']) == ('multi-skill', 2)
    assert report['modes']['multi-skill']['tokens'] == 800 and report['modes']['per-skill']['calls'] == 6
