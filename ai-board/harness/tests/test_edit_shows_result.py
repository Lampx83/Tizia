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
    with pytest.raises(tool_loop.ToolError, match="does not exist|file not found"):
        ws._run("write_test", {"test_file": "test/a.test.js", "test": "import { f } from './js/nowhere.js';\n"})
    assert ws._run("write_test", {"test_file": "test/a.test.js",
                                  "test": "import { f } from '../public/js/topic-modes.js';\n"}) == "đã nhận test"


def test_import_above_root_names_the_extra_dots():
    from gates import static_check
    hints, _ = static_check.missing_imports("import { f } from '../../public/js/m.js';\n", "test/a.test.js", "",
                                            {"public/js/m.js"}.__contains__, lambda name: ["public/js/m.js"])
    assert "too many '../'" in hints[0] and "'../public/js/m.js'" in hints[0]


def test_write_test_refuses_reading_client_module_as_text():
    import pytest
    from runtime import tool_loop
    ws = tool_loop.Workspace.__new__(tool_loop.Workspace)
    ws.file, ws.extra_content, ws.prior, ws._tree, ws.proofs = "public/js/m.js", {}, {}, {"public/js/m.js"}, {}
    ws._check_scope = lambda path, test=False: path
    with pytest.raises(tool_loop.ToolError, match="readFileSync"):
        ws._run("write_test", {"test_file": "test/m.test.js",
                               "test": "import { readFileSync } from 'node:fs';\nconst s = readFileSync('public/js/m.js', 'utf8');\n"})


def test_light_ignores_import_violations_the_base_already_has():
    from runtime import tool_loop
    ws = tool_loop.Workspace.__new__(tool_loop.Workspace)
    ws.file = "server/contexts/portal-apps/index.js"
    ws.base = "import db from '../../db.js';\nexport const a = 1;\n"
    ws.content = ws.base + "export const b = 2;\n"
    lint = "import cấm: '../../db.js' (chạm server/db.js)"
    out = ws._drop_base_import_lint('light', {'passed': False, 'exit_code': 0, 'output': lint})
    assert out['passed'] is True
    ws.content = ws.base + "import auth from '../identity/auth.js';\n"
    out = ws._drop_base_import_lint('light', {'passed': False, 'exit_code': 0, 'output': lint})
    assert out['passed'] is False


def test_write_test_repairs_wrong_import_depth():
    from runtime import tool_loop
    ws = tool_loop.Workspace.__new__(tool_loop.Workspace)
    ws.file, ws.extra_content, ws.prior, ws.proofs = "public/js/m.js", {}, {}, {}
    ws._tree = {"public/js/m.js", "public/js/other.js"}
    ws._check_scope = lambda path, test=False: path
    out = ws._run("write_test", {"test_file": "test/a/b/m.test.js", "test": "import { f } from '../../public/js/m.js';\nimport g from \"./other.js\";\n"})
    assert out.startswith("đã nhận test; đã sửa đường dẫn import")
    assert "from '../../../public/js/m.js'" in ws.test
    assert "from \"../../../public/js/other.js\"" in ws.test or "from \"./other.js\"" not in ws.test


def test_write_test_leaves_correct_and_ambiguous_imports():
    from runtime import tool_loop
    ws = tool_loop.Workspace.__new__(tool_loop.Workspace)
    ws.file, ws.extra_content, ws.prior, ws.proofs = "public/js/m.js", {}, {}, {}
    ws._tree = {"public/js/m.js", "server/m.js"}
    ws._check_scope = lambda path, test=False: path
    assert ws._run("write_test", {"test_file": "test/a.test.js", "test": "import { f } from '../public/js/m.js';\n"}) == "đã nhận test"
    import pytest
    with pytest.raises(tool_loop.ToolError):
        ws._run("write_test", {"test_file": "test/b.test.js", "test": "import { f } from './m.js';\n"})
