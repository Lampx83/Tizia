"""Requester's literal text must ship verbatim: extraction keeps every character, gate 4 holds the diff to it."""
from dataclasses import replace

from gates import static_check
from runtime import pipeline as main
from runtime import repair_class
from verification import functional


def ask(text):
    return {'request_detail': f'{text}\n{text}'}  # worker sends title + detail; both often repeat the request


def diff(path, *hunk):
    """One-file diff; hunk lines carry their own ' ', '+', '-' prefix."""
    return f"diff --git a/{path} b/{path}\n--- a/{path}\n+++ b/{path}\n@@ -1,9 +1,9 @@\n" + "".join(f"{line}\n" for line in hunk)


def generated_test(path, text):
    return (f"diff --git a/{path} b/{path}\nnew file mode 100644\n--- /dev/null\n+++ b/{path}\n@@ -0,0 +1 @@\n"
            f"+assert.ok(html.includes('{text}'));\n")


COLON = 'Thêm dòng mới ngay dưới dòng tiêu đề của bảng điểm: Ôn kỹ phần đạo hàm.'
PAIRS = "Đổi hai chữ trên trang Lịch học: '← Quay lại' thành 'Về trang chính.' và '3/7 bài' thành 'Còn bốn bài nữa.'"
AFTER = "Thêm câu 'Mẹo nhỏ cho bạn.' ngay sau dòng 'Đang tải danh sách…'"


def test_colon_literal_keeps_its_trailing_period():
    assert functional.text_expectation(ask(COLON)) == {'present': ['Ôn kỹ phần đạo hàm.'], 'absent': []}
    assert functional.select(ask(COLON)) == functional.TEXT_PROBE


def test_colon_literal_needs_an_add_verb_and_a_line_noun():
    assert functional.text_expectation(ask('Thêm nút gửi: khi bấm thì lưu bài')) == {'present': [], 'absent': []}
    assert functional.text_expectation(ask('Sửa dòng tiêu đề: bị lệch trái')) == {'present': [], 'absent': []}


def test_every_replace_pair_is_kept():
    assert functional.text_expectation(ask(PAIRS)) == {'present': ['Về trang chính.', 'Còn bốn bài nữa.'],
                                                       'absent': ['← Quay lại', '3/7 bài']}


def test_quote_after_a_line_cue_is_the_anchor_not_new_text():
    assert functional.anchor(ask(AFTER)) == 'Đang tải danh sách…'
    assert functional.anchor(ask(COLON)) is None


def misses(request, text):
    return static_check.literal_misses({'request_detail': request}, text)


def test_insert_without_the_trailing_period_is_a_miss_even_if_the_test_has_it():
    text = diff('public/grades.html', ' <h2>Bảng điểm</h2>', '+<p class="note">Ôn kỹ phần đạo hàm</p>')
    found = misses(COLON, text + generated_test('test/grades.test.js', 'Ôn kỹ phần đạo hàm.'))
    assert found and 'Ôn kỹ phần đạo hàm.' in found[0]
    assert misses(COLON, diff('public/grades.html', ' <h2>Bảng điểm</h2>', '+<p class="note">Ôn kỹ phần đạo hàm.</p>')) == []


def test_replace_that_keeps_part_of_the_old_literal_is_a_miss():
    residue = diff('public/schedule.html',
                   '-  <a class="back" href="/">← Quay lại</a>', '+  <a class="back" href="/">← Về trang chính.</a>',
                   '-  <div id="prog">3/7 bài</div>', '+  <div id="prog">Còn bốn bài nữa.</div>')
    found = misses(PAIRS, residue)
    assert len(found) == 1 and '← Về trang chính.' in found[0] and '← Quay lại' in found[0]
    clean = residue.replace('">← Về', '">Về')
    assert misses(PAIRS, clean) == []


def test_replace_inside_a_longer_text_keeps_the_rest():
    request = "Đổi 'Hết hạn dùng thử' thành 'Đã hết hạn'"
    text = diff('public/plan.html', '-<p>Hết hạn dùng thử, mời nâng cấp</p>', '+<p>Đã hết hạn, mời nâng cấp</p>')
    assert misses(request, text) == []


def test_insert_must_directly_follow_the_anchor_element():
    wrong = diff('public/list.html', '   <div class="legend">', '     Chú thích bảng', '   </div>', '+  <p>Mẹo nhỏ cho bạn.</p>')
    found = misses(AFTER, wrong)
    assert found and 'Đang tải danh sách…' in found[0]
    right = diff('public/list.html', ' <div id="wrap">', '   <div class="loading">Đang tải danh sách…</div>', '+  <p>Mẹo nhỏ cho bạn.</p>')
    assert misses(AFTER, right) == []
    closed = diff('public/list.html', '   <div class="loading">', '     Đang tải danh sách…', '   </div>', '+  <p>Mẹo nhỏ cho bạn.</p>')
    assert misses(AFTER, closed) == []


def test_requests_without_literals_are_left_alone():
    assert misses('Đổi màu tiêu đề thành xanh', diff('public/a.html', '+<h1 style="color:green">A</h1>')) == []


def test_gate_4_blocks_a_literal_miss_as_repairable(monkeypatch, fake_deps):
    text = diff('public/grades.html', ' <h2>Bảng điểm</h2>', '+<p class="note">Ôn kỹ phần đạo hàm</p>')
    state = {'full_diff': [{'file': '', 'diff': text}], 'full_checkout': 'unused', 'request_detail': COLON}
    monkeypatch.setattr(main.static_check, 'run', lambda s, **_: {'gate': 4, 'blocked': False, 'reason': None, 'issues': []})
    out = main.run_gate(4, {}, replace(fake_deps, verify=None), None, state)
    assert out['blocked'] is True and out['failure_class'] == 'ordinary'
    assert 'request_literal' in out['reason'] and 'Ôn kỹ phần đạo hàm.' in out['reason']
    fix = repair_class.classify(out, {'public/grades.html': {'test_file': None}}, set())
    assert fix['action'] == repair_class.REPAIR_CODE and fix['files'] == ['public/grades.html']


def test_quoted_text_already_on_the_page_is_a_reference_not_new_text(tmp_path):
    request = "Hiển thị 'Chưa có bài nào' khi mục 'Bài tập tuần' rỗng"
    page = tmp_path / 'public/hw.html'
    page.parent.mkdir()
    for added, ok in (('Chưa có bài nào', True), ('Chưa có bài', False)):
        page.write_text(f'<h2>Bài tập tuần</h2>\n<ul id="list"></ul>\n<p>{added}</p>\n', encoding='utf-8')
        text = diff('public/hw.html', ' <ul id="list"></ul>', f'+<p>{added}</p>')
        found = static_check.literal_misses({'request_detail': request}, text, tmp_path)
        assert (found == []) is ok and not any('Bài tập tuần' in miss for miss in found)


def test_two_quotes_on_a_plain_add_are_ambiguous_and_never_block():
    shown = diff('public/search.html', ' <ul id="hits"></ul>', '+<p>Không có kết quả</p>')
    assert misses("Hiển thị 'Không có kết quả' khi tìm 'xyz123'", shown) == []
    assert misses("Thêm 'Mục A' và 'Mục B'", diff('public/menu.html', '+<li>Mục A</li>')) == []
