from runtime import limits
from services import default_skills, skill_selection
from services.skill_selection import Candidate


def test_each_skill_node_gets_its_stage_budget():
    contract = limits.contract()['limits']['skills']
    assert set(contract['stages']) == {'intake', 'plan', 'execute', 'verdict'}
    assert default_skills.stage_budget('gate1') == {
        'max_per_prompt': contract['stages']['plan']['max_per_prompt'],
        'max_tokens_per_prompt': contract['stages']['plan']['max_tokens_per_prompt']}
    assert default_skills.stage_budget('gate4_review')['max_per_prompt'] == contract['stages']['verdict']['max_per_prompt']


def test_undeclared_stage_falls_back_to_global(monkeypatch):
    skills = limits.contract()['limits']['skills']
    monkeypatch.setitem(skills, 'stages', {'plan': {'max_per_prompt': 1}})
    assert default_skills.stage_budget('gate1') == {'max_per_prompt': 1, 'max_tokens_per_prompt': skills['max_tokens_per_prompt']}
    assert default_skills.stage_budget('gate3_light') == {'max_per_prompt': skills['max_per_prompt'],
                                                           'max_tokens_per_prompt': skills['max_tokens_per_prompt']}


def test_node_cap_drops_extra_skill_with_reason():
    cands = [Candidate('a', 0, 'task', 10, required=True), Candidate('b', 2, 'baseline', 10)]
    chosen, report = skill_selection.choose(cands, 1, 3000)
    assert [c.name for c in chosen] == ['a']
    assert report['dropped'] == [{'name': 'b', 'reason': 'max_per_prompt'}]
