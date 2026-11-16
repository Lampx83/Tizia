"""Test sinh bắt buộc theo loại thay đổi (LF/219): giao diện không cần test khi subtask có checks; logic thì cần."""
import pytest

from gates import change_class
from runtime import tool_loop

PAGE = "<html><body><h1>Chu cu</h1></body></html>\n"
PAGE_NEW = "<html><body><h1>Chu moi</h1></body></html>\n"
SCRIPTED = "<html><body><script>var a=1;</script></body></html>\n"
SCRIPTED_NEW = "<html><body><script>var a=2;</script></body></html>\n"
HANDLER = '<html><body><button onclick="go()">x</button></body></html>\n'
CSS, CSS_NEW = "h1{color:red}\n", "h1{color:blue}\n"


@pytest.mark.parametrize("changes, display", [
    ([("public/index.html", PAGE, PAGE_NEW)], True),
    ([("public/site.css", CSS, CSS_NEW)], True),
    ([("public/index.html", PAGE, PAGE_NEW), ("public/site.css", CSS, CSS_NEW)], True),
    ([("public/index.html", SCRIPTED, SCRIPTED_NEW)], False),          # JS nhúng trong HTML là logic
    ([("public/index.html", PAGE, HANDLER)], False),                    # handler inline là logic
    ([("public/index.html", HANDLER, PAGE)], False),                    # gỡ handler cũng là logic
    ([("public/app.js", "a", "b")], False),                             # JS là logic
    ([("server/routes.js", "a", "b")], False),                          # route server là logic
    ([("docs/page.html", PAGE, PAGE_NEW)], False),                      # ngoài public/ không xếp được là logic
    ([("public/index.html", PAGE, PAGE_NEW), ("public/app.js", "a", "b")], False),  # một file logic kéo cả lượt
    ([("public/index.html", PAGE, PAGE)], False),                       # không đổi gì: không phải display
    ([], False),
])
def test_display_only_table(changes, display):
    assert change_class.display_only(changes) is display


def workspace(file, current, *, plan_checks):
    return tool_loop.Workspace("src", "sha", file, current, plan_checks=plan_checks)


def test_checks_subtask_display_change_finishes_without_a_test():
    ws = workspace("public/index.html", PAGE, plan_checks=True)
    ws.content = PAGE_NEW
    assert ws.test_required() is False and ws.complete() is True
    out = ws.proposal()
    assert out["test_file"] is None


def test_checks_subtask_logic_change_still_needs_a_test():
    ws = workspace("public/app.js", "a\n", plan_checks=True)
    ws.content = "b\n"
    assert ws.test_required() is True and ws.complete() is False
    with pytest.raises(ValueError, match="thiếu test"):
        ws.proposal()


def test_subtask_without_checks_keeps_the_old_rule_for_display_changes():
    ws = workspace("public/index.html", PAGE, plan_checks=False)
    ws.content = PAGE_NEW
    assert ws.test_required() is True and ws.complete() is False
    with pytest.raises(ValueError, match="thiếu test"):
        ws.proposal()
