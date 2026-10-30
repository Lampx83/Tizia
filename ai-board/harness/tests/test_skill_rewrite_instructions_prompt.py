from types import SimpleNamespace

from services import skill_rewrite


def captured(job):
    seen = {}

    def fake_call(deps, budget, user, system, schema, num_predict):
        seen['user'] = user
        return '{"skill": "x"}', 1

    original = skill_rewrite.call
    skill_rewrite.call = fake_call
    try:
        class Client:
            def post(self, path, payload):
                if path == skill_rewrite.CLAIM:
                    return {'job': job}
                return {'ok': True}
        skill_rewrite.run_step(Client(), SimpleNamespace(models=SimpleNamespace(gate3_model='m')), worker_id='w1')
    finally:
        skill_rewrite.call = original
    return seen['user']


BASE = {'id': 1, 'name': 'copy-default-test', 'version': 1, 'original_text': '---\nname: copy-default-test\n---\n1. Chạy.', 'claim_token': 't', 'bound': None}


def test_instructions_are_a_labeled_data_block_after_the_skill():
    user = captured({**BASE, 'instructions': 'Giữ nhãn nút rõ ràng.'})
    assert 'ghi chú của admin' in user
    assert user.index('Giữ nhãn nút rõ ràng.') > user.index('copy-default-test')
    assert 'data' in user.lower()


def test_no_instructions_leaves_the_prompt_unchanged():
    assert 'ghi chú của admin' not in captured({**BASE, 'instructions': None})
