"""Gate 2.5 `truncated` fix: a quote cut at the schema cap keeps its verbatim prefix, its last token is dropped."""
from __future__ import annotations

import pytest

from gates import plan_validate

TOAST = ('  #toast { position:fixed; left:50%; top:60px; transform:translateX(-50%) translateY(-30px); z-index:80; '
         'background:#16a34a; color:#fff; padding:10px 18px; border-radius:14px; font-weight:700; font-size:13px; '
         'opacity:0; transition: opacity .2s, transform .2s; box-shadow:0 8px 24px rgba(22,163,74,.5); '
         'pointer-events:none; }')
FILE = 'public/pixel-art-studio.html'
PLAN = {'subtasks': [{'file': FILE, 'title': 't', 'verify': 'v'}]}
CUT = TOAST[:TOAST.index('pointer-events')] + 'pointerEvents'  # the validator's garbled tail, as seen in the LF32 run


def _check(quote, monkeypatch, fixes, cap):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', ','.join(fixes))
    monkeypatch.setattr(plan_validate, '_QUOTE_MAX', cap)
    validation = {'grounded': True, 'grounding': [{'target': FILE, 'file': FILE, 'quote': quote,
                                                   'before': 'b', 'after': 'a', 'verify': 'v'}]}
    return plan_validate.checked_grounding(validation, PLAN, 'sha', {FILE: TOAST})


def test_cap_cut_quote_grounds_on_verbatim_prefix(monkeypatch):
    result = _check(CUT, monkeypatch, ['truncated'], cap=len(CUT))
    assert result['evidence'][0]['quote'].endswith('rgba(22,163,74,.5);')


def test_cap_cut_quote_rejected_without_flag(monkeypatch):
    with pytest.raises(ValueError, match='không tìm thấy trích dẫn'):
        _check(CUT, monkeypatch, [], cap=len(CUT))


def test_quote_below_cap_keeps_garbled_tail_rejected(monkeypatch):
    with pytest.raises(ValueError, match='không tìm thấy trích dẫn'):
        _check(CUT, monkeypatch, ['truncated'], cap=len(CUT) + 1)


def test_cap_cut_quote_with_fabricated_prefix_rejected(monkeypatch):
    fabricated = 'box-shadow:0 0 0 red; pointerEvents'
    with pytest.raises(ValueError, match='không tìm thấy trích dẫn'):
        _check(fabricated, monkeypatch, ['truncated'], cap=len(fabricated))


def test_cap_cut_quote_with_too_short_prefix_rejected(monkeypatch):
    short = 'a pointerEvents'
    with pytest.raises(ValueError, match='không tìm thấy trích dẫn'):
        _check(short, monkeypatch, ['truncated'], cap=len(short))


def test_cap_counts_raw_quote_before_line_marker_strip(monkeypatch):
    raw = 'L94|   ' + CUT.lstrip()
    result = _check(raw, monkeypatch, ['truncated'], cap=len(raw))
    assert result['evidence'][0]['quote'].endswith('rgba(22,163,74,.5);')
