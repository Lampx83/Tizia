import difflib
import json
import shutil

import pytest

from evaluation import feature_expectation as fx

SEED = {
    "public/a.html": "<html>\n<style>\n a.x { color: #111; }\n</style>\n<nav>\n<a class=\"x\" href=\"/b.html\">B</a>\n</nav>\n<p>cuối</p>\n</html>\n",
    "public/other.html": "<p>giữ</p>\n",
}
LINK = '<a class="y" href="/new.html">Mới</a>'
NEW_PAGE = "<html><body><h1>Trang mới</h1></body></html>\n"
CASE = {
    "id": "t-1", "request": "Thêm trang mới.", "answers": ["Tên là Mới."],
    "files": [
        {"path": "public/a.html", "region": {"after": "<nav>\n", "before": "</nav>"}, "must": ["href=\"/new.html\""], "forbid": ["javascript:"]},
        {"path": "public/new.html", "new": {"must": ["<h1>Trang mới</h1>"], "forbid": ["<script"]}},
    ],
    "browser": [
        {"primitive": "text_present", "path": "/new.html", "text": "Trang mới"},
        {"primitive": "selector_exists", "path": "/a.html", "selector": "a.y[href=\"/new.html\"]"},
    ],
    "must_state": [{"id": "link", "pattern": "/new\\.html"}],
    "fix": [
        {"path": "public/a.html", "edits": [["<a class=\"x\" href=\"/b.html\">B</a>\n</nav>", "<a class=\"x\" href=\"/b.html\">B</a>\n" + LINK + "\n</nav>"]]},
        {"path": "public/new.html", "create": NEW_PAGE},
    ],
}


def fixed():
    return fx.apply_fix(SEED, CASE["fix"])


def diff_between(before, after):
    out = ""
    for path in after:
        if after[path] != before.get(path):
            out += "\n".join(difflib.unified_diff(before.get(path, "").splitlines(), after[path].splitlines(),
                                                  f"a/{path}", f"b/{path}", lineterm="", n=2)) + "\n"
    return out


def test_apply_fix_edits_and_creates_exactly_once():
    after = fixed()
    assert LINK in after["public/a.html"] and after["public/new.html"] == NEW_PAGE
    with pytest.raises(ValueError):
        fx.apply_fix(SEED, [{"path": "public/a.html", "edits": [["không có", "x"]]}])


def test_apply_diff_rebuilds_modified_and_new_files():
    new = fixed()
    assert fx.apply_diff(SEED, diff_between(SEED, new)) == {**SEED, **{p: t for p, t in new.items() if p in ("public/a.html", "public/new.html")}}


def test_grade_accepts_sample_rejects_seed_and_stray_edits():
    assert fx.grade(SEED, fixed(), CASE)[0]
    assert fx.grade(SEED, dict(SEED), CASE) == (False, "no change")
    stray = {**fixed(), "public/other.html": "<p>đổi</p>\n"}
    assert "outside" in fx.grade(SEED, stray, CASE)[1]
    extra = {**fixed(), "public/extra.html": "x"}
    assert "outside" in fx.grade(SEED, extra, CASE)[1]


def test_region_blocks_change_outside_and_forbidden_text():
    a = fixed()["public/a.html"]
    moved = {**fixed(), "public/a.html": a.replace("<p>cuối</p>", "<p>khác</p>")}
    assert fx.grade(SEED, moved, CASE) == (False, "public/a.html: change outside the allowed region")
    bad = {**fixed(), "public/a.html": a.replace(LINK, LINK + '<a href="javascript:x">z</a>')}
    assert "forbidden" in fx.grade(SEED, bad, CASE)[1]


def test_new_file_must_and_forbid():
    thin = {**fixed(), "public/new.html": "<html><body>rỗng</body></html>\n"}
    assert "missing" in fx.grade(SEED, thin, CASE)[1]
    script = {**fixed(), "public/new.html": NEW_PAGE + "<script>1</script>"}
    assert "forbidden" in fx.grade(SEED, script, CASE)[1]


def test_gone_literal_must_disappear_from_replaced_region():
    case = {**CASE, "files": [{"path": "public/other.html", "region": {}, "gone": ["giữ"], "must": ["mới"]}], "browser": []}
    assert fx.grade(SEED, {**SEED, "public/other.html": "<p>mới</p>\n"}, case)[0]
    assert "still present" in fx.grade(SEED, {**SEED, "public/other.html": "<p>mới giữ</p>\n"}, case)[1]


def test_several_regions_each_checked_and_gaps_frozen():
    seed = {"public/m.js": "A\n// one\nB\n// two\nC\n"}
    case = {"files": [{"path": "public/m.js", "regions": [
        {"after": "A\n", "before": "// one", "must": ["x1"]}, {"after": "B\n", "before": "// two", "must": ["x2"]}]}], "browser": []}
    good = {"public/m.js": "A\nx1\n// one\nB\nx2\n// two\nC\n"}
    assert fx.grade_files(seed, good, case)[0]
    assert "outside" in fx.grade_files(seed, {"public/m.js": good["public/m.js"].replace("B\n", "BB\n", 1)}, case)[1]
    assert "missing" in fx.grade_files(seed, {"public/m.js": "A\nx1\n// one\nB\ny\n// two\nC\n"}, case)[1]


def test_browser_checks_run_on_served_after_tree():
    ok, _ = fx.browser_verdict(CASE["browser"], fixed())
    assert ok
    ok, why = fx.browser_verdict(CASE["browser"], SEED)
    assert not ok and "/new.html" in why


def test_static_dom_computed_style_and_attr_selectors():
    checks = [{"primitive": "computed_style", "path": "/a.html", "selector": "a.x", "prop": "color", "value": "rgb(17, 17, 17)"},
              {"primitive": "selector_exists", "path": "/a.html", "selector": "nav a[href=\"/b.html\"]"}]
    assert fx.browser_verdict(checks, SEED)[0]
    red = [{**checks[0], "value": "rgb(1, 2, 3)"}]
    assert not fx.browser_verdict(red, SEED)[0]


def test_dom_probe_injectable_for_real_browser():
    seen = []

    def probe(url, selector, prop):
        seen.append((url.rsplit("/", 1)[-1], selector))
        return True, None
    assert fx.browser_verdict([CASE["browser"][1]], SEED, dom_probe=probe)[0] and seen == [("a.html", 'a.y[href="/new.html"]')]


def test_criteria_missing_counts_wrong():
    full = {"acceptance": ["Trang /new.html có chữ Trang mới"], "checks": [CASE["browser"][1]]}
    rep = fx.compare_criteria(CASE, full)
    assert rep["ok"] and rep["missing"] == []
    none = fx.compare_criteria(CASE, {"acceptance": [], "checks": []})
    assert not none["ok"] and len(none["missing"]) == 3
    only_check = fx.compare_criteria(CASE, {"acceptance": ["xong"], "checks": [CASE["browser"][0]]})
    assert not only_check["ok"] and any("selector_exists /a.html" in m for m in only_check["missing"])


def test_criteria_check_matches_by_literal_not_wording():
    loose = {"primitive": "text_present", "path": "/new.html", "text": "trang mới"}
    assert fx.compare_criteria(CASE, {"acceptance": ["link /new.html"], "checks": [loose, CASE["browser"][1]]})["ok"]


def test_criteria_wrong_check_fails_on_sample():
    bad = {"primitive": "text_present", "path": "/new.html", "text": "Không có chữ này"}
    rep = fx.compare_criteria(CASE, {"acceptance": ["/new.html"], "checks": [*CASE["browser"], bad]}, after=fixed())
    assert rep["wrong"] == [fx.describe(bad)] and rep["ok"]


def test_grade_record_uses_diff_and_model_criteria():
    seed = lambda p: SEED[p]
    rec = {"diff": diff_between(SEED, fixed()), "criteria": {"acceptance": ["/new.html"], "checks": CASE["browser"]}}
    out = fx.grade_record(CASE, rec, seed=seed)
    assert out["ok"] and out["files_ok"] and out["browser_ok"] and out["criteria"]["ok"]
    out = fx.grade_record(CASE, {**rec, "criteria": {"acceptance": [], "checks": []}}, seed=seed)
    assert not out["ok"] and out["files_ok"] and not out["criteria"]["ok"]
    assert not fx.grade_record(CASE, {"diff": "", "criteria": {}}, seed=seed)["ok"]


def test_self_check_flags_each_defect():
    seed = lambda p: SEED[p]
    assert fx.self_check({"set": "tuning", "cases": [CASE]}, seed=seed) == []
    no_fix = {**CASE, "fix": [{"path": "public/a.html", "edits": [["nope", "x"]]}]}
    assert fx.self_check({"set": "tuning", "cases": [no_fix]}, seed=seed)
    weak = {**CASE, "browser": [{"primitive": "text_present", "path": "/a.html", "text": "cuối"}]}
    assert any("passes on the untouched seed" in p for p in fx.self_check({"set": "tuning", "cases": [weak]}, seed=seed))
    badprim = {**CASE, "browser": [{"primitive": "alert", "path": "/a.html"}]}
    assert any("invalid check" in p for p in fx.self_check({"set": "tuning", "cases": [badprim]}, seed=seed))
    three = {**CASE, "answers": ["a", "b", "c"]}
    assert any("answers" in p for p in fx.self_check({"set": "tuning", "cases": [three]}, seed=seed))
    assert any("set" in p for p in fx.self_check({"cases": [CASE]}, seed=seed))


def test_tuning_data_is_marked_and_passes_two_way_check():
    data = fx.load()
    assert data["set"] == "tuning" and len(data["cases"]) == 15
    assert len({c["id"] for c in data["cases"]}) == 15
    assert fx.self_check(data) == []
    assert all(c["browser"] and c["request"] and c["must_state"] is not None for c in data["cases"])
    json.dumps(data)



needs_node = pytest.mark.skipif(not shutil.which("node"), reason="node missing")


def oracle_case(tmp_path):
    (tmp_path / "oracle").mkdir()
    (tmp_path / "oracle" / "check.js").write_text("const t = require('fs').readFileSync('server/x.js', 'utf8'); process.exit(t.includes('GOOD') ? 0 : 1);\n", encoding="utf-8")
    return {**CASE, "_dir": tmp_path, "oracle_files": [{"src": "check.js", "dest": "test/check.js"}], "oracle_cmd": "node test/check.js"}


@pytest.fixture
def tiny(tmp_path, monkeypatch):
    repo, modules = tmp_path / "repo", tmp_path / "mods"
    (repo / "server").mkdir(parents=True)
    (repo / "server" / "x.js").write_text("// BAD\n", encoding="utf-8")
    (modules / "dep").mkdir(parents=True)
    (modules / "dep" / "index.js").write_text("", encoding="utf-8")
    monkeypatch.setenv("AI_BOARD_EVAL_NODE_MODULES", str(modules))
    return repo, oracle_case(tmp_path)


@needs_node
def test_oracle_cmd_gates_ok_and_default_cases_unchanged(tiny):
    repo, case = tiny
    seed = lambda p: SEED[p]
    rec = {"diff": diff_between(SEED, fixed()), "criteria": {"acceptance": ["/new.html"], "checks": CASE["browser"]}}
    assert "oracle_ok" not in fx.grade_record(CASE, rec, seed=seed)
    bad = fx.grade_record(case, rec, seed=seed, repo=repo)
    assert not bad["ok"] and bad["files_ok"] and bad["browser_ok"] and not bad["oracle_ok"] and "rc 1" in bad["oracle_reason"]
    assert fx.oracle_verdict(case, {"server/x.js": "// GOOD\n"}, repo) == (True, "")


@needs_node
def test_oracle_pass_does_not_rescue_red_static(tiny):
    repo, case = tiny
    out = fx.grade_record(case, {"diff": "", "criteria": {}}, seed=lambda p: SEED[p], repo=repo)
    assert not out["ok"] and not out["files_ok"]


@needs_node
def test_oracle_infra_errors_raise_not_fail(tiny, monkeypatch, tmp_path):
    repo, case = tiny
    (tmp_path / "empty").mkdir()
    monkeypatch.setenv("AI_BOARD_EVAL_NODE_MODULES", str(tmp_path / "empty"))
    with pytest.raises(fx.OracleInfra, match="node_modules"):
        fx.oracle_verdict(case, {}, repo)
    monkeypatch.setenv("AI_BOARD_EVAL_NODE_MODULES", str(tmp_path / "mods"))
    monkeypatch.setattr(fx.shutil, "which", lambda _n: None)
    with pytest.raises(fx.OracleInfra, match="node not found"):
        fx.oracle_verdict(case, {}, repo)
    monkeypatch.undo()
    monkeypatch.setenv("AI_BOARD_EVAL_NODE_MODULES", str(tmp_path / "mods"))
    with pytest.raises(fx.OracleInfra, match="oracle dir"):
        fx.oracle_verdict({k: v for k, v in case.items() if k != "_dir"}, {}, repo)
    with pytest.raises(fx.OracleInfra, match="oracle file missing"):
        fx.oracle_verdict({**case, "oracle_files": [{"src": "nope.js", "dest": "t.js"}]}, {}, repo)
