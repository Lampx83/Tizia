"""Whole seam: deterministic one-way / two-way classification of a real diff, review_signals added to gate 5.5."""
from gates import change_class, risk_triage


def diff(path, added=('x',), *, new=False, deleted=False):
    head = f'diff --git a/{path} b/{path}\n'
    if new:
        head += 'new file mode 100644\n--- /dev/null\n'
    elif deleted:
        head += 'deleted file mode 100644\n--- a/' + path + '\n+++ /dev/null\n'
    else:
        head += f'--- a/{path}\n+++ b/{path}\n'
    return {'file': path, 'diff': head + ''.join(f'+{line}\n' for line in added)}


def kinds(*diffs):
    return sorted({r['kind'] for r in change_class.classify(list(diffs))['reasons']})


def test_label_text_is_two_way_by_default():
    out = change_class.classify([diff('public/index.html', ['<p>Xin chào</p>'])])
    assert out == {'class': 'two_way', 'reasons': []}


def test_one_way_kinds():
    assert kinds(diff('server/ai-board/migrations/040-x.sql', ['ALTER TABLE t ADD COLUMN c TEXT;'], new=True)) == ['migration']
    assert kinds(diff('server/contexts/identity/index.js')) == ['auth']
    assert kinds(diff('server/contexts/payment/index.js')) == ['payment']
    assert kinds(diff('public/old.html', deleted=True)) == ['file_deletion']
    assert kinds(diff('server/contexts/x/index.js', ["router.post('/api/x', handler);"])) == ['api_schema']
    assert kinds(diff('server/ai-board/contract.json', ['"a": 1'])) == ['api_schema']
    assert change_class.classify([diff('server/contexts/identity/index.js')])['class'] == 'one_way'


def test_comment_or_markup_text_alone_is_not_a_route_and_test_files_are_two_way():
    assert kinds(diff('public/js/x.js', ["const note = 'router.post is documented';"])) == []
    assert kinds(diff('test/auth.test.js', ['assert(1)'])) == []


def test_risk_triage_adds_high_signal_and_class_for_one_way():
    state = {'full_diff': [diff('server/contexts/payment/index.js')], 'catalog': None}
    out = risk_triage.run(state)
    assert out['change_class'] == 'one_way'
    assert out['risk_level'] in ('high', 'critical')
    assert any(s['name'] == 'one_way_change' and s['tier'] == 'high' for s in out['risk_signals'])
    two = risk_triage.run({'full_diff': [diff('public/index.html')], 'catalog': None})
    assert two['change_class'] == 'two_way' and not any(s['name'] == 'one_way_change' for s in two['risk_signals'])
