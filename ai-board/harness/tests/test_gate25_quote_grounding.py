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

