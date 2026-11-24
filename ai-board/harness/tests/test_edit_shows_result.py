from runtime.tool_loop import _edited_region


def test_insert_after_line_is_shown_with_numbers():
    before = "a\n<script>\nrender()\n</script>\n"
    after = "a\n<script>\nrender()\nsummary()\n</script>\n"
    shown = _edited_region(before, after)
    assert "L4| summary()" in shown and "L5| </script>" in shown


def test_unchanged_file_says_so():
    assert _edited_region("x\n", "x\n") == "(file không đổi)"
