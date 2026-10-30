from gates import static_check


def _diff(path, lines):
    return f"diff --git a/{path} b/{path}\nnew file mode 100644\n--- /dev/null\n+++ b/{path}\n@@ -0,0 +1,{lines} @@\n" + "".join(f"+line {i}\n" for i in range(lines))


def test_oversize_new_file_is_a_warning_not_a_block():
    state = {"plan": {"subtasks": [{"file": "public/new.js", "size": "small"}]},
             "diffs": [{"file": "public/new.js", "diff": _diff("public/new.js", 400)}]}
    out = static_check.run(state, check_size=True)
    assert out["blocked"] is False
    assert out["needs_careful_review"] is True
    assert any("vượt" in issue for issue in out["issues"])
