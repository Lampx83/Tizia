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


def test_check_upload_includes_earlier_subtask_drafts():
    from verification import loop_checks
    sent = {}

    class Ws:
        file, content, test_file, test = "public/a.html", "<p>", "test/a.test.js", "t"
        prior = {"public/js/m.js": ("export const f = 1;", "step 1")}

    class Stop(Exception):
        pass

    class Client:
        def exec(self, *a, **k):
            return {"code": 0}

        def upload(self, run_id, body, deadline=None):
            import io, tarfile
            with tarfile.open(fileobj=io.BytesIO(body)) as tar:
                sent.update({m.name: tar.extractfile(m).read() for m in tar})
            raise Stop()

    session = loop_checks.CheckSession.__new__(loop_checks.CheckSession)
    session.client, session.sha, session.tools, session.run_id = Client(), "s", "t", "r"
    session._start = session._remaining = lambda: 5
    session.lease = type("L", (), {"revoked": False})()
    session.deadline, session._files = 0, {}
    try:
        session.run("light", Ws())
    except Stop:
        pass
    assert sent["checkout/public/js/m.js"] == b"export const f = 1;"
