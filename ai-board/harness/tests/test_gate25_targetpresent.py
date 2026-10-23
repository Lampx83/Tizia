"""Gate 2.5 `targetpresent` fix: a plan whose anchors sit in its own file is not blocked by best_match advisory or an unfounded clarification."""
from __future__ import annotations

import pytest

from gates import plan_validate

LEAGUE = '<div class="loading">Đang tải bảng xếp hạng…</div>\n<style>\n  .loading { color: #666; }\n</style>'
MARKET = '<section id="grid"><div class="empty">Đang tải…</div></section>'
LUAT = ('<div class="modes">\n  <button data-mode="critical">⚠️ Chỉ câu liệt</button>\n'
        '  <select><option>Câu điểm liệt</option></select>\n</div>')
SAP = '<style>\n  .compare .yes { color: #10b981; }\n  .compare .no { color: #999; }\n</style>\n<p>Hub</p>'
DASH = '<style>\n  .badge-mv { color: #fff; }\n</style>'
ENG = '<button>Câu hỏi mới</button>\n<p id="q-text">Câu hỏi mới: xin chào</p>'


def _request(subject='', body=''):
    return {'subject': subject, 'body': body, 'grounding_required': True}


def _plan(file, title, verify='v'):
    return {'subtasks': [{'file': file, 'title': title, 'verify': verify}]}


@pytest.fixture
def on(monkeypatch):
    monkeypatch.setenv('AI_BOARD_GATE25_FIXES', 'targetpresent')


def test_flag_off_never_anchors(monkeypatch):
    monkeypatch.delenv('AI_BOARD_GATE25_FIXES', raising=False)
    plan = _plan('public/league.html', 'Ẩn `.loading`')
    assert not plan_validate.target_anchored(plan, {'public/league.html': LEAGUE}, _request())


@pytest.mark.parametrize('file, title, text', [
    ('public/league.html', 'Ẩn `.loading`', LEAGUE),
    ('public/marketplace.html', 'Đổi chữ `.empty` thành "Đang tải danh sách"', MARKET),
    ('public/luat.html', 'Đổi chữ "⚠️ Chỉ câu liệt" trên nút `button`', LUAT),
    ('public/sap-xep-hub.html', 'Đổi color của .yes thành #16a34a', SAP),
])
def test_anchor_in_own_file_anchors(file, title, text, on):
    assert plan_validate.target_anchored(_plan(file, title), {file: text}, _request())


def test_anchor_missing_from_target_file_blocks(on):
    # the plan names `.label-metaverse` but the source only has `.badge-mv`
    plan = _plan('public/dashboard.html', 'Ẩn `.label-metaverse`')
    assert not plan_validate.target_anchored(plan, {'public/dashboard.html': DASH}, _request())


def test_same_name_in_other_file_does_not_anchor(on):
    # `.loading` exists in league.html; the plan edits a different file that lacks it
    plan = _plan('public/other.html', 'Ẩn `.loading`')
    files = {'public/other.html': '<p>nothing</p>', 'public/league.html': LEAGUE}
    assert not plan_validate.target_anchored(plan, files, _request())


def test_ambiguous_literal_repeated_in_file_does_not_anchor(on):
    # the quoted request text occurs in the button and in the question line: which one is meant is unclear
    plan = _plan('public/eng.html', 'Đổi chữ `button` thành "Câu hỏi mới" thành mới')
    request = _request(body='Đổi nút "Câu hỏi mới" thành mới')
    assert not plan_validate.target_anchored(plan, {'public/eng.html': ENG}, request)


def test_anchor_lines_return_matching_source_only(on):
    lines = plan_validate._anchor_lines(SAP, ['.yes'])
    assert lines == '.compare .yes { color: #10b981; }'
    assert plan_validate._anchor_lines(SAP, ['.absent']) == ''


def test_file_suffix_is_not_an_anchor(on):
    # `.html` in the title is the file name, not a selector
    plan = _plan('public/dashboard.html', 'Đổi chữ trong public/dashboard.html')
    assert not plan_validate.target_anchored(plan, {'public/dashboard.html': DASH}, _request())
