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
