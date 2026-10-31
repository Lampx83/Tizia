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
    # LF/127: oracle is advisory. The plan edits a different file than the oracle's surface, so the conflict is recorded, not blocked.
    assert not plan_validate.run(request, deps_with(FakeModels(plan, validation=forged)), Budget(), state)['blocked']
    assert 'public/js/suggestion-fab.js' in state['oracle_conflict']


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


def test_quote_that_joins_source_lines_still_counts_but_changed_words_do_not(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public' / 'js').mkdir(parents=True)
    (tmp_path / 'public' / 'js' / 'suggestion-fab.js').write_text(
        '<label class="sgf-lab">Tiêu đề\n  <input id="sgf-title-in" maxlength="200"\n\t\t placeholder="VD: một ví dụ" />\n</label>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = {'capabilities': [], 'subtasks': [{'file': 'public/js/suggestion-fab.js', 'title': 'Counter',
                                              'verify': 'counter shown', 'size': 'small'}]}
    request = {'subject': 'Bộ đếm', 'body': 'Thêm bộ đếm', 'grounding_required': True, 'complexity_by_server': True}

    def run(quote):
        validation = {'clear': True, 'question': None, 'grounded': True, 'grounding': [
            {'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': quote,
             'before': 'none', 'after': 'counter', 'verify': 'counter shown'}]}
        return plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(),
                                 {'plan': plan, 'checkout_source': str(tmp_path)})

    joined = '<label class="sgf-lab">Tiêu đề <input id="sgf-title-in" maxlength="200" placeholder="VD: một ví dụ" />'
    assert not run(joined)['blocked']
    assert not run('<label class="sgf-lab">Tiêu đề<input id="sgf-title-in" maxlength="200"placeholder="VD: một ví dụ" />')['blocked']  # lines glued with no space
    assert run(joined.replace('maxlength="200"', 'maxlength="300"'))['reason'] == 'plan_ungrounded'


def test_evidence_matches_its_subtask_by_file_even_when_target_holds_the_title(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public' / 'js').mkdir(parents=True)
    (tmp_path / 'public' / 'js' / 'suggestion-fab.js').write_text('const label = "Mô tả chi tiết";\n', encoding='utf8')
    (tmp_path / 'public' / 'js' / 'other.js').write_text('const label = "Mô tả chi tiết";\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = {'capabilities': [], 'subtasks': [{'file': 'public/js/suggestion-fab.js', 'title': 'Title counter',
                                              'verify': 'counter shown', 'size': 'small'}]}
    request = {'subject': 'Bộ đếm', 'body': 'Thêm bộ đếm', 'grounding_required': True, 'complexity_by_server': True}

    def run(target, file):
        validation = {'clear': True, 'question': None, 'grounded': True, 'grounding': [
            {'target': target, 'file': file, 'quote': 'const label = "Mô tả chi tiết";',
             'before': 'none', 'after': 'counter', 'verify': 'counter shown'}]}
        return plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(),
                                 {'plan': plan, 'checkout_source': str(tmp_path)})

    assert not run('Title counter', 'public/js/suggestion-fab.js')['blocked']          # target = subtask title
    assert not run('public/js/suggestion-fab.js', 'public/js/suggestion-fab.js')['blocked']
    wrong = run('Title counter', 'public/js/other.js')                                  # evidence from another file
    assert wrong['blocked'] and wrong['reason'] == 'plan_ungrounded'


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
        # LF/127: the renderer named by the oracle is advisory; the block still comes from grounding (no before/after evidence for a new page).
        assert 'thiếu hành vi' in out['signals'][0]
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


def test_a_new_file_feature_is_grounded_without_a_source_quote(tmp_path):
    """A feature adds files that do not exist at base: no source line to quote, so the record may leave the
    quote empty (before/after/verify still required) and the best-match check is only recorded."""
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    (tmp_path / 'public').mkdir(parents=True)
    (tmp_path / 'public' / 'index.html').write_text('<h1>Tizia</h1>\n', encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)
    plan = {'capabilities': ['public.ui'], 'subtasks': [
        {'file': 'public/moi-a.html', 'title': 'Trang A', 'verify': 'node --test test/moi-a.test.js', 'size': 'small',
         'layer': 'frontend', 'depends_on': []},
        {'file': 'public/moi-b.html', 'title': 'Trang B', 'verify': 'node --test test/moi-b.test.js', 'size': 'small',
         'layer': 'frontend', 'depends_on': []}]}
    request = {'subject': 'Thêm hai trang ôn tập', 'body': 'Hai trang mới độc lập cho sinh viên.',
               'grounding_required': True, 'complexity_by_server': True, 'type': 'feature'}
    state = {'plan': plan, 'checkout_source': str(tmp_path), 'best_match': 'public/index.html'}

    def record(task, quote=''):
        # a new file has no file to quote: the validator leaves "file" empty and the harness fills it in
        return {'target': task['file'], 'file': '', 'quote': quote,
                'before': 'chưa có trang', 'after': task['title'], 'verify': task['verify']}

    grounded = {'clear': True, 'question': None, 'grounded': True,
                'grounding': [record(task) for task in plan['subtasks']]}
    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=grounded)), Budget(), state)
    assert not out['blocked'], out
    assert [e['quote'] for e in state['grounding']['evidence']] == ['', '']
    # the record always names the file: the board's plan policy rejects an empty grounding.file
    assert [e['file'] for e in state['grounding']['evidence']] == ['public/moi-a.html', 'public/moi-b.html']

    invented = {'clear': True, 'question': None, 'grounded': True,
                'grounding': [record(task, quote='<h1>không có thật</h1>') for task in plan['subtasks']]}
    out = plan_validate.run(request, deps_with(FakeModels(plan, validation=invented)), Budget(),
                            {'plan': plan, 'checkout_source': str(tmp_path)})
    assert not out['blocked'], out


def test_gate_2_5_trace_shows_the_evidence_it_read_and_why_the_plan_was_or_was_not_grounded(tmp_path):
    import dataclasses
    import meter
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

    def judged(quote):
        validation = {'clear': True, 'question': None, 'grounded': True, 'grounding': [
            {'target': 'public/js/suggestion-fab.js', 'file': 'public/js/suggestion-fab.js', 'quote': quote,
             'before': 'False ETA', 'after': 'Waiting', 'verify': 'Offline has no minutes'}]}
        tracer, batches = meter.Tracer(None), []
        tracer.begin(1, batches.append)
        deps = dataclasses.replace(deps_with(FakeModels(plan, validation=validation)), trace=tracer)
        plan_validate.run(request, deps, Budget(), {'plan': plan, 'checkout_source': str(tmp_path)})
        tracer.flush()
        return batches[0][0]

    wrong, right = judged('workerReady: false'), judged('return "2 phút nữa";')
    knows = {n['name'] for n in wrong['notes'] if n['kind'] == 'knows'}
    assert {'plan under review', 'source evidence'} <= knows
    assert any(n['kind'] == 'tool' and n['name'] == 'git show' and 'suggestion-fab.js' in n['summary'] for n in wrong['notes'])
    assert [(e['check'], e['ok']) for e in wrong['evaluation']] == [('validator', True), ('source grounding', False)]
    assert 'không tìm thấy trích dẫn' in wrong['evaluation'][1]['detail']
    assert [(e['check'], e['ok']) for e in right['evaluation']] == [('validator', True), ('source grounding', True)]


def _repo_with(tmp_path, files):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    for rel, text in files.items():
        path = tmp_path / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding='utf8')
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com',
                    'commit', '-qm', 'base'], check=True)


def _so_tay_plan():
    task = lambda file, title: {'file': file, 'title': title, 'verify': f'node --test test/so-tay-git.test.js', 'size': 'small'}
    return {'capabilities': ['public.ui'], 'subtasks': [
        task('public/so-tay-git.html', 'Tạo trang'), task('public/js/domains/it/modules.js', 'Đăng ký'),
        task('test/so-tay-git.test.js', 'Test')]}


def test_run89_shape_missing_validator_record_for_existing_file_is_advisory(tmp_path):
    _repo_with(tmp_path, {'public/js/domains/it/modules.js': 'export const MODULES = [];'})
    request = {'subject': 'Thêm trang Sổ tay Git', 'body': 'x', 'grounding_required': True, 'complexity_by_server': True,
               'type': 'feature'}
    state = {'plan': _so_tay_plan(), 'checkout_source': str(tmp_path)}
    validation = {'clear': True, 'question': None, 'grounded': True, 'reason': 'ok', 'grounding': []}
    out = plan_validate.run(request, deps_with(FakeModels(state['plan'], validation=validation)), Budget(), state)
    assert not out['blocked']
    assert 'modules.js' in state['validator_note'] and 'không chặn' in state['validator_note']
    assert state['grounding']['evidence'][1]['quote'] == ''


def test_wrong_quote_still_blocks_and_carries_evidence(tmp_path):
    _repo_with(tmp_path, {'public/js/domains/it/modules.js': 'export const MODULES = [];'})
    request = {'subject': 'Thêm trang Sổ tay Git', 'body': 'x', 'grounding_required': True, 'complexity_by_server': True,
               'type': 'feature'}
    state = {'plan': _so_tay_plan(), 'checkout_source': str(tmp_path)}
    bad = {'target': 'public/js/domains/it/modules.js', 'file': 'public/js/domains/it/modules.js', 'quote': 'KHÔNG CÓ CHỮ NÀY TRONG FILE',
           'before': 'a', 'after': 'b', 'verify': 'c'}
    new = lambda f: {'target': f, 'file': f, 'quote': '', 'before': 'chưa có file', 'after': 'x', 'verify': 'y'}
    validation = {'clear': True, 'question': None, 'grounded': True, 'reason': 'ok',
                  'grounding': [new('public/so-tay-git.html'), bad, new('test/so-tay-git.test.js')]}
    out = plan_validate.run(request, deps_with(FakeModels(state['plan'], validation=validation)), Budget(), state)
    assert out['blocked'] and out['reason'] == 'plan_ungrounded'
    assert out['evidence']['item'] == 'public/js/domains/it/modules.js' and out['evidence']['quote'].startswith('KHÔNG CÓ')
