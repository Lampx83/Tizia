import pytest

from gates import gate3_guards as g

KNOWN = {"public/admin.html", "public/js/app.js", "public/school.html"}


def test_noop_edit_is_rejected_only_when_enabled(monkeypatch):
    out = {"code": "same"}
    g.check(out, "same", "public/a.html", KNOWN)
    monkeypatch.setenv("AI_BOARD_GATE3_GUARDS", "noop")
    with pytest.raises(ValueError, match="không làm file thay đổi"):
        g.check(out, "same", "public/a.html", KNOWN)
    g.check({"code": "other"}, "same", "public/a.html", KNOWN)


def test_missing_reference_names_the_nearest_real_file(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GATE3_GUARDS", "refs")
    base = '<a href="admin.html">x</a>\n'
    ok = base + '<a href="/school.html">s</a>\n<a href="https://x.dev/y.html">e</a>\n<script src="js/app.js"></script>\n'
    g.check({"code": ok}, base, "public/index.html", KNOWN)
    bad = base + '<a href="admin-dashboard.html">y</a>\n'
    with pytest.raises(ValueError, match="admin-dashboard.html.*admin.html"):
        g.check({"code": bad}, base, "public/index.html", KNOWN)


def test_reference_to_a_planned_new_page_is_allowed(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GATE3_GUARDS", "refs")
    g.check({"code": '<a href="new.html">n</a>'}, "", "public/index.html", KNOWN | {"public/new.html"})


def test_preexisting_dead_reference_is_not_blamed_on_the_model(monkeypatch):
    monkeypatch.setenv("AI_BOARD_GATE3_GUARDS", "refs")
    base = '<a href="dead.html">d</a>\n'
    g.check({"code": base + "<p>x</p>\n"}, base, "public/index.html", KNOWN)


def test_edit_schema_accepts_both_edit_shapes_and_forbids_extras():
    schema = g.edit_schema(True)
    assert schema["additionalProperties"] is False and len(schema["properties"]["edits"]["items"]["anyOf"]) == 2
    assert "edits" not in g.edit_schema(False)["properties"] and "code" in g.edit_schema(False)["required"]


def test_schema_refusal_falls_back_and_is_counted(monkeypatch):
    from gates import implement
    monkeypatch.setenv("AI_BOARD_GATE3_GUARDS", "schema")
    g.fallbacks(reset=True)
    calls = []

    class Deps:
        models = type("M", (), {"routing": None, "gate3_model": "m", "gate3_model_light": "m"})()

        def call_model(self, model, prompt, **kw):
            calls.append(kw.get("format"))
            if kw.get("format"):
                raise RuntimeError("400 schema")
            return {"response": '{"edits":[{"search":"a","replace":"b"}],"test_file":"test/t.mjs","test":"import test from \'node:test\'"}'}

    class Budget:
        max_units = None
        units = 0
        quality_switches = 0
        def tick(self): return True

    import tempfile, subprocess, pathlib
    repo = pathlib.Path(tempfile.mkdtemp())
    for cmd in (["init", "-q"], ["config", "user.email", "t@t"], ["config", "user.name", "t"]):
        subprocess.run(["git", "-C", str(repo), *cmd], check=True)
    (repo / "public").mkdir()
    (repo / "public/x.html").write_text("a\n</body>\n")
    subprocess.run(["git", "-C", str(repo), "add", "."], check=True)
    subprocess.run(["git", "-C", str(repo), "commit", "-qm", "i"], check=True)
    state = {"plan": {"subtasks": [{"title": "t", "file": "public/x.html", "size": "small", "verify": "v"}]}, "checkout_source": str(repo)}
    out = implement.run(state, Deps(), Budget(), repo_dir=tempfile.mkdtemp())
    assert not out["blocked"], out
    assert calls[0] and calls[1] is None and g.fallbacks() == 1
