"""Gate 2.5 quote grounding: validator quotes abbreviated with `...` or a bare tag are accepted only under their fix flags."""
from __future__ import annotations

import pytest

from gates import plan_validate

# Quotes copied from the s20261003 dev run where the validator grounded a correct plan and the literal check rejected it (LF32 diagnosis).
LEAGUE = '  <div class="loading">Đang tải bảng xếp hạng…</div>'
NOT_FOUND = '    <a href="/" class="primary">🏠 Trang chủ</a>'
PK_CURVE = '<html>\n<style>\n  body { display: none; }\n</style>'


def _check(file, quote, text, monkeypatch, fixes):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', ','.join(fixes))
    plan = {'subtasks': [{'file': file, 'title': 't', 'verify': 'v'}]}
    validation = {'grounded': True, 'grounding': [{'target': file, 'file': file, 'quote': quote,
                                                   'before': 'b', 'after': 'a', 'verify': 'v'}]}
    return plan_validate.checked_grounding(validation, plan, 'sha', {file: text})


def _rejects(file, quote, text, monkeypatch, fixes):
    with pytest.raises(ValueError, match='không tìm thấy trích dẫn'):
        _check(file, quote, text, monkeypatch, fixes)


@pytest.mark.parametrize('file, quote, text', [
    ('public/league.html', '<div class=...loading>Đang tải bảng xếp hạng…</div>', LEAGUE),
    ('public/404.html', '    <a href=... class=...>🏠 Trang chủ</a>', NOT_FOUND),
])
def test_ellipsis_gap_grounds_abbreviated_quote_only_under_flag(file, quote, text, monkeypatch):
    _rejects(file, quote, text, monkeypatch, [])
    _rejects(file, quote, text, monkeypatch, ['quotes'])
    assert _check(file, quote, text, monkeypatch, ['ellipsis'])['evidence'][0]['quote'] == quote


def test_ellipsis_gap_keeps_order_and_rejects_fabricated_gap(monkeypatch):
    reversed_pieces = 'Đang tải bảng xếp hạng…</div>...class="loading"'
    _rejects('public/league.html', reversed_pieces, LEAGUE, monkeypatch, ['ellipsis'])
    invented = '<div>Đang tải...</div>'
    _rejects('public/league.html', invented, LEAGUE, monkeypatch, ['ellipsis'])


def test_ellipsis_only_quote_is_not_a_grounding(monkeypatch):
    _rejects('public/league.html', '...........', LEAGUE, monkeypatch, ['ellipsis'])


def test_bare_tag_grounds_only_under_shortquote(monkeypatch):
    _rejects('public/pk-curve.html', '<style>', PK_CURVE, monkeypatch, [])
    assert _check('public/pk-curve.html', '<style>', PK_CURVE, monkeypatch, ['shortquote'])


def test_shortquote_still_rejects_trivial_quote(monkeypatch):
    _rejects('public/pk-curve.html', '<div>', PK_CURVE, monkeypatch, ['shortquote'])


def test_evidence_target_is_the_step_file(monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', '')
    plan = {'subtasks': [{'file': 'public/league.html', 'title': 't', 'verify': 'v'}]}
    validation = {'grounded': True, 'grounding': [{'target': 'Thêm dòng sau phần tử loading', 'file': 'public/league.html',
                                                   'quote': LEAGUE, 'before': 'b', 'after': 'a', 'verify': 'v'}]}
    checked = plan_validate.checked_grounding(validation, plan, 'sha', {'public/league.html': LEAGUE})
    assert checked['evidence'][0]['target'] == 'public/league.html'


def test_advquote_makes_unmatched_quote_for_target_file_unverified_not_blocking(monkeypatch):
    file, quote = 'public/league.html', 'KHÔNG CÓ TRONG FILE'
    _rejects(file, quote, LEAGUE, monkeypatch, ['quotes'])
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', 'advquote')
    record = {'target': file, 'file': file, 'quote': quote, 'before': 'b', 'after': 'a', 'verify': 'v'}
    validation = {'grounded': True, 'grounding': [record]}
    out = plan_validate.checked_grounding(validation, {'subtasks': [{'file': file, 'title': 't', 'verify': 'v'}]}, 'sha', {file: LEAGUE})
    assert out['evidence'][0]['quote'] == '' and record['unverified'] is True


def test_advquote_still_blocks_quote_from_another_file_and_missing_behaviour(monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', 'advquote')
    plan = {'subtasks': [{'file': 'public/a.html', 'title': 't', 'verify': 'v'}]}
    files = {'public/a.html': 'x', 'public/b.html': 'y'}
    other = {'grounded': True, 'grounding': [{'target': 'public/a.html', 'file': 'public/b.html', 'quote': 'zzzzzzzz', 'before': 'b', 'after': 'a', 'verify': 'v'}]}
    with pytest.raises(plan_validate.Mismatch):
        plan_validate.checked_grounding(other, plan, 'sha', files)
    bare = {'grounded': True, 'grounding': [{'target': 'public/a.html', 'file': 'public/a.html', 'quote': 'zzzzzzzz', 'before': 'b', 'after': '', 'verify': 'v'}]}
    with pytest.raises(plan_validate.Mismatch):
        plan_validate.checked_grounding(bare, plan, 'sha', files)


# Source lines and plan titles of eval round r204 (3 of 19 blocked as plan_target_uncertain); files cut to the anchor lines.
HERB = ('<title>Vườn dược liệu 3D | Tizia</title>\n'
        '  <a href="space.html?b=garden&domain=pharmacy">← Vườn dược liệu</a>\n'
        '  <span class="title">🌿 Vườn dược liệu 3D</span>\n')
ADMIN = ('     (campus-iframe / campus-save-btn / campus-reset-btn / campus-dirty-badge). -->\n'
         '    <span id="campus-dirty-badge" style="display:none;color:#000;font-size:11px">● Chưa lưu</span>\n')
LOGIN = '  <p class="tag">Đăng nhập để vào vũ trụ giáo dục ảo</p>\n'
HERB_TITLE = 'Đổi văn bản liên kết #back-link từ "← Vườn dược liệu" thành "Nhớ sao chuỗi mã nút"'
ADMIN_TITLE = 'Thêm nhãn mới sau #campus-dirty-badge trong public/admin.html'
LOGIN_TITLE = 'Thêm đoạn văn bản "Pha liều bài hàm xu" sau thẻ <p class="tag"> trong public/login.html'
DEFAULT = ['quotes', 'ellipsis']


def _ground(file, title, quote, files, monkeypatch, fixes=DEFAULT, record_file=None, after='a', verify=None):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', ','.join(fixes))
    plan = {'subtasks': [{'file': file, 'title': title, 'verify': verify or f"grep -q 'X' {file}"}]}
    validation = {'grounded': True, 'grounding': [{'target': file, 'file': record_file or file, 'quote': quote,
                                                   'before': 'b', 'after': after, 'verify': 'v'}]}
    return plan_validate.checked_grounding(validation, plan, 'sha', files)['evidence'][0]


@pytest.mark.parametrize('file, quote, text', [
    ('public/herb-garden-3d.html', '  <a href=space.html?b=garden&domain=pharmacy>← Vườn dược liệu</a>', HERB),
    ('public/login.html', '<p class=tag>Đăng nhập để vào vũ trụ giáo dục ảo</p>', LOGIN),
])
def test_quote_with_attribute_quotes_dropped_grounds_under_quotes_fix(file, quote, text, monkeypatch):
    _rejects(file, quote, text, monkeypatch, [])
    assert _check(file, quote, text, monkeypatch, ['quotes'])['evidence'][0]['quote'] == quote


@pytest.mark.parametrize('file, title, text, line', [
    ('public/herb-garden-3d.html', HERB_TITLE, HERB, '<a href="space.html?b=garden&domain=pharmacy">← Vườn dược liệu</a>'),
    ('public/admin.html', ADMIN_TITLE, ADMIN, ADMIN.splitlines()[1].strip()),
    ('public/login.html', LOGIN_TITLE, LOGIN, LOGIN.strip()),
])
def test_unmatched_quote_grounds_on_plan_anchor_line_of_target_file(file, title, text, line, monkeypatch):
    garbled = '<span id=...-dirty-badge...>● Chưa l</span>'
    for fixes in (DEFAULT, []):
        record = _ground(file, title, garbled, {file: text}, monkeypatch, fixes)
        assert record == {'quote': line, 'before': 'b', 'after': 'a', 'verify': 'v', 'file': file, 'target': file}


@pytest.mark.parametrize('tag', ["<p class='tag'>", '<p class=tag>'])
def test_tag_anchor_matches_without_its_quote_marks_under_quotes_fix(tag, monkeypatch):
    title = LOGIN_TITLE.replace('<p class="tag">', tag)
    assert _ground('public/login.html', title, 'zzzzzzzz', {'public/login.html': LOGIN}, monkeypatch)['quote'] == LOGIN.strip()


def test_anchor_absent_from_target_file_still_blocks(monkeypatch):
    invented = 'Đổi văn bản liên kết #back-link thành "Nhớ sao chuỗi mã nút"'  # no id="back-link" in the page
    with pytest.raises(plan_validate.Mismatch, match='không tìm thấy trích dẫn'):
        _ground('public/herb-garden-3d.html', invented, 'zzzzzzzz', {'public/herb-garden-3d.html': HERB}, monkeypatch)


def test_anchor_only_in_another_file_still_blocks(monkeypatch):
    files = {'public/login.html': LOGIN, 'public/admin.html': ADMIN}
    with pytest.raises(plan_validate.Mismatch, match='không tìm thấy trích dẫn'):
        _ground('public/login.html', ADMIN_TITLE, 'zzzzzzzz', files, monkeypatch)
    with pytest.raises(plan_validate.Mismatch, match='file hiện có'):
        _ground('public/login.html', ADMIN_TITLE, ADMIN.splitlines()[1], files, monkeypatch, record_file='public/admin.html')


def test_anchor_needs_title_behaviour_and_length(monkeypatch):
    files = {'public/login.html': LOGIN}
    with pytest.raises(plan_validate.Mismatch):  # after-text already in the file is no location: verify is not an anchor source
        _ground('public/login.html', 'Thêm đoạn văn bản', 'zzzzzzzz', files, monkeypatch,
                verify="grep -q 'Đăng nhập để vào vũ trụ' public/login.html")
    with pytest.raises(plan_validate.Mismatch):
        _ground('public/login.html', 'Sửa chữ "Đăng" trong <p>', 'zzzzzzzz', files, monkeypatch)
    with pytest.raises(plan_validate.Mismatch):
        _ground('public/login.html', LOGIN_TITLE, 'zzzzzzzz', files, monkeypatch, after='')


def test_new_file_is_not_grounded_by_an_anchor_elsewhere(monkeypatch):
    with pytest.raises(ValueError, match='trích dẫn mẫu'):
        _ground('public/login-2.html', LOGIN_TITLE, 'zzzzzzzz', {'public/login.html': LOGIN}, monkeypatch,
                record_file='public/login.html')


def _run_case(tmp_path, title, quote):
    import subprocess
    from conftest import FakeModels, deps_with
    from runtime.budgets.budget import Budget
    for path, text in {'public/admin.html': ADMIN, 'public/login.html': LOGIN}.items():
        (tmp_path / path).parent.mkdir(parents=True, exist_ok=True)
        (tmp_path / path).write_text(text, encoding='utf8')
    git = ['git', '-C', str(tmp_path), '-c', 'user.name=t', '-c', 'user.email=t@t']
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    subprocess.run([*git, 'add', '.'], check=True)
    subprocess.run([*git, 'commit', '-qm', 'base'], check=True)
    plan = {'summary_vi': 'Thêm nhãn "Ghi đơn học thẻ tập" ngay sau nhãn báo chưa lưu trong khung quản lý trường.',
            'capabilities': [], 'subtasks': [{'title': title, 'file': 'public/admin.html', 'size': 'small', 'depends_on': [],
                                              'verify': "grep -q 'Ghi đơn học thẻ tập' public/admin.html", 'layer': 'frontend'}]}
    validation = {'clear': True, 'question': None, 'grounded': True, 'reason': 'ok', 'objection': None, 'grounding': [
        {'target': 'public/admin.html', 'file': 'public/admin.html', 'quote': quote,
         'before': 'chỉ có nhãn chưa lưu', 'after': 'có nhãn mới', 'verify': 'grep nhãn mới'}]}
    request = {'subject': 'Thêm nhãn ghi đơn', 'body': 'ngay sau nhãn chưa lưu', 'grounding_required': True,
               'complexity_by_server': True}
    state = {'plan': plan, 'checkout_source': str(tmp_path)}
    return plan_validate.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state), state


def test_gate_passes_case_whose_validator_quote_is_garbled_but_plan_anchor_is_real(tmp_path, monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', ','.join(DEFAULT))
    out, state = _run_case(tmp_path, ADMIN_TITLE, '<span id=...-dirty-badge...>● Chưa l</span>')
    assert not out['blocked'], out
    assert state['grounding']['evidence'][0]['quote'] == ADMIN.splitlines()[1].strip()


def test_gate_still_blocks_garbled_quote_when_plan_anchor_is_invented(tmp_path, monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', ','.join(DEFAULT))
    out, _ = _run_case(tmp_path, 'Thêm nhãn mới sau #campus-saved-badge trong public/admin.html',
                       '<span id=...-dirty-badge...>● Chưa l</span>')
    assert out['blocked'] and out['reason'] in ('plan_target_uncertain', 'plan_ungrounded')
