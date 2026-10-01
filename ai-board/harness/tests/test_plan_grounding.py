import json
import subprocess

from budget import Budget
from conftest import FakeModels, deps_with
from gates import plan_validate


def test_live_plan_needs_verified_source_quote_and_behavior(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    file = tmp_path / 'public' / 'js' / 'suggestion-fab.js'
    file.parent.mkdir(parents=True)
    file.write_text('export function queueLine(q) { return "2 phút nữa"; }', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = {'capabilities': ['public.ui'], 'subtasks': [
        {'file': 'public/js/suggestion-fab.js', 'title': 'Hide false ETA', 'verify': 'Offline has no ETA', 'size': 'small'}]}
    request = {'subject': 'Không hiện ETA khi worker tắt', 'body': 'Chờ worker thay vì số phút',
               'grounding_required': True, 'complexity_by_server': True}
    state = {'plan': plan, 'checkout_source': str(tmp_path)}
    for validation in [ {'clear': True, 'question': None},
        {'clear': True, 'question': None, 'grounded': True, 'grounding': [
            {'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': 'workerReady: false',
             'before': 'false ETA', 'after': 'waiting', 'verify': 'offline has no minutes'}]} ]:
        out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)
        assert out['blocked'] and out['reason'] == 'plan_ungrounded'
    valid = {'clear': True, 'question': None, 'grounded': True, 'grounding': [
        {'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': 'return "2 phút nữa";',
         'before': 'False ETA while offline', 'after': 'Waiting for worker', 'verify': 'Offline has no minutes'}]}
    deps = deps_with(FakeModels(plan, validation=valid))
    assert not plan_validate.run(request, deps, Budget(), state)['blocked']
    assert '2 phút nữa' in deps.models.calls[-1]['prompt']
    assert state['grounding']['sha']
    # The model can assert grounded=true and quote a real flag, but that does not fix the renderer.
    flag = tmp_path / 'public' / 'domain.js'
    flag.write_text('export const workerReady = false;', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-qm', 'flag'], check=True)
    state['plan'] = {'subtasks': [{'file': 'public/domain.js', 'title': 'ETA', 'verify': 'Flag exists'}]}
    forged = {'clear': True, 'grounded': True, 'grounding': [{'target': 'public/domain.js', 'file': 'public/domain.js',
        'quote': 'workerReady = false;', 'before': 'ETA', 'after': 'No ETA', 'verify': 'Flag exists'}]}
    assert plan_validate.run(request, deps_with(FakeModels(plan, validation=forged)), Budget(), state)['reason'] == 'plan_ungrounded'


def test_quote_copied_with_the_context_line_prefix_still_counts_as_grounding(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    file = tmp_path / 'public' / 'js' / 'suggestion-fab.js'
    file.parent.mkdir(parents=True)
    file.write_text('const a = 1;\n<label>Mô tả chi tiết <span id="sgf-detail-count">0 / 10000</span></label>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = {'capabilities': [], 'subtasks': [{'file': 'public/js/suggestion-fab.js', 'title': 'Title counter',
                                              'verify': 'counter shown', 'size': 'small'}]}
    request = {'subject': 'Bộ đếm ký tự', 'body': 'Thêm bộ đếm', 'grounding_required': True, 'complexity_by_server': True}
    for prefix in ('public/js/suggestion-fab.js:2| ', 'L2| ', 'public/js/suggestion-fab.js:2|'):  # as REPO DATA shows lines
        quote = prefix + '<label>Mô tả chi tiết <span id="sgf-detail-count">0 / 10000</span></label>'
        validation = {'clear': True, 'question': None, 'grounded': True, 'grounding': [
            {'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': quote,
             'before': 'no counter', 'after': 'counter', 'verify': 'counter shown'}]}
        state = {'plan': plan, 'checkout_source': str(tmp_path)}
        out = plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)
        assert not out['blocked'], prefix
        assert state['grounding']['evidence'][0]['quote'].startswith('<label>')  # stored without the prefix
    invented = {'clear': True, 'grounded': True, 'grounding': [{
        'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': 'L2| <label>không có thật</label>',
        'before': 'x', 'after': 'y', 'verify': 'z'}]}
    assert plan_validate.run(request, deps_with(FakeModels(plan, validation=invented)), Budget(),
                             {'plan': plan, 'checkout_source': str(tmp_path)})['reason'] == 'plan_ungrounded'


def test_located_existing_behavior_cannot_be_replaced_with_a_standalone_page(tmp_path):
    (tmp_path / 'public' / 'js').mkdir(parents=True)
    for name in ('school-explore.js', 'request-thread.js'):
        (tmp_path / 'public' / 'js' / name).write_text('function renderExistingBehavior() {}', encoding='utf8')
    subprocess.run(['git','init','-q',str(tmp_path)],check=True)
    subprocess.run(['git','-C',str(tmp_path),'add','.'],check=True)
    subprocess.run(['git','-C',str(tmp_path),'-c','user.name=Test','-c','user.email=test@example.com','commit','-qm','existing UI'],check=True)
    for renderer, title in [('school-explore.js', 'Tìm kiếm hoạt động'), ('request-thread.js', 'Sao chép phản hồi')]:
        state = {'plan': {'subtasks': [{'file': 'public/new-page.html'}]}, 'checkout_source': str(tmp_path),
                 'source_targets': ['public/js/' + renderer]}
        out = plan_validate.run({'subject': title, 'grounding_required': True},
            deps_with(FakeModels(state['plan'], validation={'clear': True, 'grounded': True})), Budget(), state)
        assert out['reason'] == 'plan_ungrounded'
        assert renderer in out['signals'][0]
        path = 'public/js/' + renderer
        state['plan'] = {'subtasks':[{'file':path,'title':title,'verify':'Observe requested behavior','size':'small'}]}
        validation = {'clear':True,'grounded':True,'grounding':[{'target':path,'file':path,
            'quote':'function renderExistingBehavior() {}','before':'Existing UI','after':title,'verify':'Observe requested behavior'}]}
        assert not plan_validate.run({'subject':title,'grounding_required':True,'complexity_by_server':True},
            deps_with(FakeModels(state['plan'],validation=validation)),Budget(),state)['blocked']


def test_validator_rejects_wrong_surface_without_asking_requester_about_code(tmp_path):
    plan = {'subtasks': [{'file': 'public/standalone.html', 'verify': 'New page renders'}]}
    request = {'subject': 'Copy response in existing chat', 'grounding_required': True}
    deps = deps_with(FakeModels(plan, validation={'clear': True, 'grounded': False,
        'reason': 'Standalone page does not change existing response', 'question': None}))
    out = plan_validate.run(request, deps, Budget(), {'plan': plan, 'checkout_source': str(tmp_path)})
    assert out['blocked'] and out['reason'] == 'plan_ungrounded'
    assert out.get('public_message') and out.get('outcome') != 'needs_clarification'
