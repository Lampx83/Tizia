from runtime.tool_loop import _edited_region


def test_insert_after_line_is_shown_with_numbers():
    before = "a\n<script>\nrender()\n</script>\n"
    after = "a\n<script>\nrender()\nsummary()\n</script>\n"
    shown = _edited_region(before, after)
    assert "L4| summary()" in shown and "L5| </script>" in shown


def test_unchanged_file_says_so():
    assert _edited_region("x\n", "x\n") == "(file không đổi)"


def test_write_test_refuses_import_of_missing_file():
    import pytest
    from runtime import tool_loop
    ws = tool_loop.Workspace.__new__(tool_loop.Workspace)
    ws.file, ws.extra_content, ws.prior, ws._tree, ws.proofs = "public/bao.html", {}, {}, {"public/js/topic-modes.js"}, {}
    ws._check_scope = lambda path, test=False: path
    with pytest.raises(tool_loop.ToolError, match=r"\.\./public/js/topic-modes\.js"):
        ws._run("write_test", {"test_file": "test/a.test.js", "test": "import { f } from './js/topic-modes.js';\n"})
    assert ws._run("write_test", {"test_file": "test/a.test.js",
                                  "test": "import { f } from '../public/js/topic-modes.js';\n"}) == "đã nhận test"


def test_import_above_root_names_the_extra_dots():
    from gates import static_check
    hints, _ = static_check.missing_imports("import { f } from '../../public/js/m.js';\n", "test/a.test.js", "",
                                            {"public/js/m.js"}.__contains__, lambda name: ["public/js/m.js"])
    assert "too many '../'" in hints[0] and "'../public/js/m.js'" in hints[0]
