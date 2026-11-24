"""Gate 4: an added test that reads a JS module as text is sent back; importing it, or reading HTML, is fine."""
from gates.static_check import source_text_tests


def _diff(path, body):
    lines = "".join(f"+{line}\n" for line in body.splitlines())
    return f"diff --git a/{path} b/{path}\nnew file mode 100644\n--- /dev/null\n+++ b/{path}\n@@ -0,0 +1 @@\n{lines}"


def test_reading_the_module_as_text_is_a_finding():
    diff = _diff("test/topic-modes.test.js", "const js = readFileSync('public/js/topic-modes.js', 'utf8');\n"
                                             "assert.ok(js.includes('return null;'));")
    assert source_text_tests(diff) and "public/js/topic-modes.js" in source_text_tests(diff)[0]


def test_import_or_html_read_or_non_test_file_is_fine():
    assert source_text_tests(_diff("test/a.test.js", "const m = await import('../public/js/a.js');")) == []
    assert source_text_tests(_diff("test/a.test.js", "readFileSync('public/hub.html', 'utf8')")) == []
    assert source_text_tests(_diff("public/js/a.js", "readFileSync('public/js/b.js')")) == []
