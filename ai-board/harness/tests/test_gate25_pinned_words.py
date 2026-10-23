"""Gate 2.5 `pinned` fix: selector and quoted tokens from the plan reach the excerpt although request prose fills the keyword cap."""
from __future__ import annotations

from gates.plan_validate import pinned_words
from services import file_context

SUBJECT = 'Đổi màu chữ của các ô ghi là có trong bảng so sánh sang xanh lá #16a34a'
BODY = ('Ở trang hub sắp xếp có bảng so sánh, các ô ghi là có đang màu xanh ngọc. Mình muốn đổi thành xanh lá '
        '#16a34a, ô ghi là không thì để nguyên. Trang hub có nhiều khối giao diện khác nhau cho từng nhóm người học.')
TASK = {'title': 'Đổi color của .yes thành #16a34a', 'verify': 'rule .yes trong public/sap-xep-hub.html có color: #16a34a'}
PAGE = '\n'.join([f'  .panel-{i} {{ color: #{i:06x}; padding: {i}px; }}' for i in range(120)]
                 + ['  .compare .yes { color: #10b981; }']
                 + [f'  .row-{i} {{ margin: {i}px; }}' for i in range(120)])


def _excerpt(pinned):
    pins = tuple(pinned_words(TASK)) if pinned else ()
    words = list(dict.fromkeys([*pins, *file_context.keywords(SUBJECT, BODY, TASK['title'], TASK['verify'])]))
    return file_context.excerpt(PAGE, words, budget=3500, filename='public/sap-xep-hub.html', pinned=pins)


def test_pinned_words_take_selectors_and_quoted_phrases():
    task = {'title': 'Đổi chữ "Thuốc bài tập" trong .compare .yes', 'verify': 'có #toast và .compare .yes'}
    assert pinned_words(task) == ['thuốc bài tập', '.compare', '.yes', '#toast']


def test_pinned_words_ignore_decimals_and_empty_task():
    assert pinned_words({'title': 'Giảm 0.5 px', 'verify': None}) == []
    assert pinned_words({'file': 'public/x.html'}) == []


def test_pinned_line_enters_excerpt_past_keyword_cap():
    assert '.compare .yes' not in _excerpt(pinned=False)
    assert '.compare .yes' in _excerpt(pinned=True)
