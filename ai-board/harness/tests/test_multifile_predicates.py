import pytest

from evaluation import multifile_predicates as mp

FILES = {
    "public/a.html": '<h1>Cũ</h1>\n<div id="box"></div>\n<script type="module" src="js/a.js"></script>\n',
    "public/js/a.js": "import { helper } from './util.js';\nconst x = 1;\n",
    "public/js/util.js": "export function helper() { return 1; }\n",
    "server/other.js": "export const k = 1;\n",
}


def read(p):
    return FILES.get(p)


def data(**exp):
    base = {"files": ["public/a.html", "public/js/a.js"], "request_vi": "r"}
    base.update(exp)
    return {"set": "tuning", "cases": {"c1": base}}


def run(exp, edits=None, extra=None, create=None):
    after = dict(FILES)
    for path, pairs in (edits or {}).items():
        for old, new in pairs:
            after[path] = after[path].replace(old, new)
    after.update(extra or {})
    after.update(create or {})
    return mp.grade(FILES, after, "c1", data(**exp), read=read)


BOTH = {"public/a.html": [("Cũ", "Mới")], "public/js/a.js": [("const x = 1;", "const x = 2;")]}


def test_unknown_case():
    assert mp.grade(FILES, FILES, "zz", data(), read=read) == (False, "no_expectation")


def test_untouched_fails_and_all_files_change_passes():
    assert not run({}, None)[0]
    assert run({}, BOTH)[0]


def test_each_required_file_must_change():
    ok, why = run({}, {"public/a.html": BOTH["public/a.html"]})
    assert not ok and "public/js/a.js" in why


def test_change_outside_allowed_set_fails():
    ok, why = run({}, BOTH, extra={"server/other.js": "export const k = 2;\n"})
    assert not ok and "server/other.js" in why


def test_new_file_must_be_declared():
    new = {"public/js/new.js": "x"}
    assert not run({}, BOTH, create=new)[0]
    assert run({"create": ["public/js/new.js"]}, BOTH, create=new)[0]


def test_deleted_file_fails():
    after = {k: v for k, v in FILES.items() if k != "server/other.js"}
    after["public/a.html"] = "x"
    after["public/js/a.js"] = "y"
    assert not mp.grade(FILES, after, "c1", data(), read=read)[0]


def test_literals_verbatim_per_file_whitespace_tolerant():
    exp = {"literals": [{"file": "public/a.html", "text": "<h1>Mới tiêu đề</h1>"}]}
    assert not run(exp, BOTH)[0]
    ok = {"public/a.html": [("<h1>Cũ</h1>", "<h1>Mới   tiêu\n đề</h1>")], "public/js/a.js": BOTH["public/js/a.js"]}
    assert run(exp, ok)[0]
    wrong_file = {"public/a.html": BOTH["public/a.html"], "public/js/a.js": [("const x = 1;", "<h1>Mới tiêu đề</h1>")]}
    assert not run(exp, wrong_file)[0]


def test_gone_and_keep():
    assert not run({"gone": [{"file": "public/a.html", "text": "<h1>Cũ</h1>"}]}, {
        "public/a.html": [("<div", "<div class='z'")], "public/js/a.js": BOTH["public/js/a.js"]})[0]
    assert run({"gone": [{"file": "public/a.html", "text": "Cũ"}]}, BOTH)[0]
    keep = {"keep": [{"file": "public/js/a.js", "text": "import { helper }"}]}
    assert run(keep, BOTH)[0]
    cut = {"public/a.html": BOTH["public/a.html"], "public/js/a.js": [("import { helper } from './util.js';\n", "")]}
    assert not run(keep, cut)[0]


def test_defined_regex_and_refs():
    exp = {"refs": [{"use_file": "public/js/a.js", "use": "getElementById('count')", "def_file": "public/a.html", "def": r'id="count"'}]}
    use_only = {"public/a.html": BOTH["public/a.html"], "public/js/a.js": [("const x = 1;", "document.getElementById('count');")]}
    assert not run(exp, use_only)[0]
    both = {"public/a.html": [("<div id=\"box\">", "<div id=\"count\"></div><div id=\"box\">")], "public/js/a.js": use_only["public/js/a.js"]}
    assert run(exp, both)[0]
    assert not run(exp, {"public/a.html": both["public/a.html"], "public/js/a.js": BOTH["public/js/a.js"]})[0]


def test_new_unresolved_import_fails_and_missing_export_fails():
    bad_path = {"public/a.html": BOTH["public/a.html"],
                "public/js/a.js": [("const x = 1;", "import { z } from './nope.js';")]}
    ok, why = run({}, bad_path)
    assert not ok and "nope.js" in why
    bad_name = {"public/a.html": BOTH["public/a.html"],
                "public/js/a.js": [("const x = 1;", "import { missing } from './util.js';")]}
    ok, why = run({}, bad_name)
    assert not ok and "missing" in why
    good = {"public/a.html": BOTH["public/a.html"],
            "public/js/a.js": [("const x = 1;", "import { helper as h } from './util.js';")]}
    assert run({}, good)[0]


def test_new_html_link_must_resolve():
    bad = {"public/a.html": [("Cũ", "Mới"), ("</script>", '</script><script src="js/gone.js"></script>')],
           "public/js/a.js": BOTH["public/js/a.js"]}
    ok, why = run({}, bad)
    assert not ok and "gone.js" in why
    good = {"public/a.html": [("Cũ", "Mới"), ("</script>", '</script><script src="/js/util.js"></script>')],
            "public/js/a.js": BOTH["public/js/a.js"]}
    assert run({}, good)[0]


def test_html_inline_module_import_checked():
    inline = '<script type="module">import { missing } from "./js/util.js";</script>'
    bad = {"public/a.html": [("Cũ", "Mới"), ("</script>", "</script>" + inline)], "public/js/a.js": BOTH["public/js/a.js"]}
    ok, why = run({}, bad)
    assert not ok and "missing" in why
    good = {"public/a.html": [("Cũ", "Mới"), ("</script>", "</script>" + inline.replace("missing", "helper"))],
            "public/js/a.js": BOTH["public/js/a.js"]}
    assert run({}, good)[0]


def test_preexisting_dangling_ref_not_blamed():
    files = dict(FILES, **{"public/a.html": FILES["public/a.html"] + '<img src="old-missing.png">'})
    after = dict(files, **{"public/a.html": files["public/a.html"].replace("Cũ", "Mới"), "public/js/a.js": "// changed\n"})
    assert mp.grade(files, after, "c1", data(), read=files.get)[0]


def good_case(**over):
    c = {"files": ["public/a.html", "public/js/a.js"], "request_vi": "r", "set": "tuning",
         "literals": [{"file": "public/a.html", "text": "Mới"}],
         "fix": {"public/a.html": [["Cũ", "Mới"]], "public/js/a.js": [["const x = 1;", "const x = 2;"]]}}
    c.update(over)
    return c


def check(case, expected=1):
    return mp.self_check({"set": "tuning", "expected_cases": expected, "cases": {"c1": case}}, seed=read)


def test_self_check_clean():
    assert check(good_case()) == []


def test_self_check_flags_problems():
    assert any("does not apply" in p for p in check(good_case(fix={"public/a.html": [["nope", "x"]], "public/js/a.js": []})))
    assert any("missing in seed" in p for p in check(good_case(files=["public/a.html", "public/zz.js"])))
    assert any("already in seed" in p for p in check(good_case(literals=[{"file": "public/a.html", "text": "Cũ"}])))
    assert any("rejected" in p for p in check(good_case(literals=[{"file": "public/a.html", "text": "Khác"}])))
    assert any("cases, expected" in p for p in check(good_case(), expected=20))
    assert any("held" in p for p in check(good_case(files=["public/held-out.html", "public/a.html"])))


def test_self_check_dropping_file_must_fail():
    loose = good_case(files=["public/a.html", "public/js/a.js"], must_change=["public/a.html"])
    assert any("ablation" in p for p in check(loose))


def test_data_file_is_tuning_set_of_twenty():
    d = mp.load_expectations()
    assert d["set"] == "tuning" and len(d["cases"]) == d["expected_cases"] == 20
    assert mp.self_check(d) == []
