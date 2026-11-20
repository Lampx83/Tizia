import json

import pytest

from evaluation import expectation_predicates as ep
from evaluation.pipeline import DATA
from evaluation.pipeline import criteria as C

TARGET = "public/p.html"
SEED = """<html><body>
<div class="top"><a class="back" href="/">← Quay lại</a><span class="t">Tiêu đề</span></div>
<div class="loading">Đang tải…</div>
<div class="foot">cuối</div>
<style>
  .ask { font-size: 20px; color: #047857; }
  .ask.ok { color: #111; }
</style>
</body></html>
"""


def exps(**cases):
    return {"new_file_prefixes": ["test/"], "cases": cases}


def case(cid="c1", file=TARGET):
    return {"id": cid, "file": file}


REPLACE = {"kind": "replace_text", "zones": [
    {"find": '<a class="back" href="/">← Quay lại</a>', "span": "← Quay lại", "new": "Về nhà."}]}
INSERT = {"kind": "insert_text", "zones": [
    {"find": '<div class="loading">Đang tải…</div>', "new": "Chờ chút."}]}
REMOVE = {"kind": "remove_element", "zones": [{"find": '<span class="t">Tiêu đề</span>', "span": '<span class="t">Tiêu đề</span>'}]}
CSS = {"kind": "css_color", "rule": {"selector": ".ask", "set": {"color": "#16a34a"}}}


def run(exp, edit, extra_after=None, seed=SEED):
    after = {TARGET: edit(seed) if callable(edit) else edit}
    after.update(extra_after or {})
    before = {TARGET: seed, "public/other.html": "x"}
    after.setdefault("public/other.html", "x")
    return ep.grade(before, after, case(), exps(c1=exp))


def test_replace_pass_and_unchanged_fail():
    ok, why = run(REPLACE, lambda s: s.replace("← Quay lại", "Về nhà."))
    assert ok, why
    ok, why = run(REPLACE, SEED)
    assert not ok and "no change" in why


def test_replace_rejects_literal_variants():
    assert not run(REPLACE, lambda s: s.replace("← Quay lại", "Về nhà"))[0]
    assert not run(REPLACE, lambda s: s.replace("← Quay lại", "← Về nhà."))[0]
    assert not run(REPLACE, lambda s: s.replace("← Quay lại", "Về nhà. ← Quay lại"))[0]


def test_replace_ignores_whitespace_only_difference():
    assert run(REPLACE, lambda s: s.replace("← Quay lại", "Về nhà.").replace("\n", "\r\n"))[0]


def test_outside_zone_change_fails():
    ok, why = run(REPLACE, lambda s: s.replace("← Quay lại", "Về nhà.").replace("cuối", "cuối!"))
    assert not ok and "outside" in why


def test_other_file_and_new_file_rules():
    good = SEED.replace("← Quay lại", "Về nhà.")
    assert not run(REPLACE, good, {"public/other.html": "y"})[0]
    assert not run(REPLACE, good, {"public/new.html": "y"})[0]
    assert run(REPLACE, good, {"test/new.test.js": "y"})[0]


def test_target_missing_fails():
    ok, why = ep.grade({TARGET: SEED}, {"public/q.html": "x"}, case(), exps(c1=REPLACE))
    assert not ok and "target" in why


def test_insert_placement_and_literal():
    anchor = '<div class="loading">Đang tải…</div>'
    assert run(INSERT, lambda s: s.replace(anchor, anchor + "\n<p>Chờ chút.</p>"))[0]
    assert not run(INSERT, lambda s: s.replace(anchor, anchor + "\n<p>Chờ chút</p>"))[0]
    assert not run(INSERT, lambda s: s.replace(anchor, "<p>Chờ chút.</p>\n" + anchor))[0]
    assert not run(INSERT, lambda s: s.replace("Đang tải…", "Đang tải…<p>Chờ chút.</p>"))[0]
    assert not run(INSERT, lambda s: s.replace(anchor, anchor + "<p>Chờ chút. Thêm.</p>"))[0]
    assert not run(INSERT, lambda s: s.replace("cuối</div>", "cuối</div><p>Chờ chút.</p>"))[0]


def test_remove():
    assert run(REMOVE, lambda s: s.replace('<span class="t">Tiêu đề</span>', ""))[0]
    assert not run(REMOVE, lambda s: s.replace('<span class="t">Tiêu đề</span>', "<!-- -->"))[0]
    assert not run(REMOVE, SEED)[0]


def test_css_color():
    assert run(CSS, lambda s: s.replace("#047857", "#16A34A"))[0]
    assert not run(CSS, lambda s: s.replace("#047857", "#16a34b"))[0]
    assert not run(CSS, lambda s: s.replace("#047857", "#16a34a").replace("20px", "21px"))[0]
    assert not run(CSS, lambda s: s.replace("#047857", "#16a34a").replace("color: #111", "color: #222"))[0]
    assert not run(CSS, SEED)[0]


def test_css_hide_adds_declaration():
    hide = {"kind": "size_hide", "rule": {"selector": ".ask", "set": {"display": "none"}}}
    assert run(hide, lambda s: s.replace("{ font-size: 20px;", "{ display: none; font-size: 20px;"))[0]
    assert not run(hide, lambda s: s.replace("{ font-size: 20px;", "{ display: none; font-size: 21px;"))[0]


def test_unknown_case_has_no_expectation():
    ok, why = ep.grade({TARGET: SEED}, {TARGET: SEED}, case("zz"), exps())
    assert not ok and why == "no_expectation"


def test_self_check_flags_broken_expectations():
    base = {TARGET: SEED}
    good = {**REPLACE, "fix": [['← Quay lại', 'Về nhà.']]}
    assert ep.self_check(exps(c1=good), {"c1": case()}, lambda f: base[f]) == []
    no_fix = {**REPLACE, "fix": [["không có", "x"]]}
    assert ep.self_check(exps(c1=no_fix), {"c1": case()}, lambda f: base[f])
    wrong = {**REPLACE, "fix": [["← Quay lại", "Về nhà"]]}
    assert ep.self_check(exps(c1=wrong), {"c1": case()}, lambda f: base[f])
    passes_seed = {"kind": "replace_text", "zones": [
        {"find": '<span class="t">Tiêu đề</span>', "span": "Tiêu đề", "new": "Tiêu đề"}], "fix": [["cuối", "cuối!"]]}
    assert ep.self_check(exps(c1=passes_seed), {"c1": case()}, lambda f: base[f])
    assert ep.self_check(exps(c1=good), {}, lambda f: base[f])


# --- real data -------------------------------------------------------------

DEV = DATA / "cases-dev.json"
needs_dev = pytest.mark.skipif(not DEV.exists(), reason="cases-dev not available")
WRONG = ["b3d529", "dda6a7", "d2e233", "ce8c87", "7f6ed5", "928d6f"]


def dev_cases():
    return {c["id"]: c for c in json.loads(DEV.read_text(encoding="utf-8"))}


@needs_dev
def test_tuned_ids_are_exactly_the_22_simple_cases():
    data = ep.load_expectations()
    cases = dev_cases()
    simple = {i for i, c in cases.items() if c["level"] <= 2 and c["types"][0] in
              ("replace_text", "insert_text", "css_color", "size_hide", "remove_element")}
    assert len(simple) == 22
    assert set(data["tuned_ids"]) == simple
    assert set(data["cases"]) >= simple


@needs_dev
def test_every_expectation_fails_seed_and_passes_sample_fix():
    assert ep.self_check() == []


@needs_dev
@pytest.mark.parametrize("suffix", WRONG)
def test_r204_wrong_ships_rejected(suffix):
    cases = dev_cases()
    cid = next(i for i in cases if i.endswith(suffix))
    stem = f"B0-r204-{cid}.candidate"
    diff, html = DATA / "trials" / f"{stem}.diff", DATA / "trials" / f"{stem}.html"
    if not (diff.exists() and html.exists()):
        pytest.skip("trial artifacts not available")
    before = {cases[cid]["file"]: ep.read_seed(cases[cid]["file"])}
    after = ep.after_tree(before, cases[cid]["file"], diff.read_text(encoding="utf-8"), html.read_text(encoding="utf-8"))
    ok, why = ep.grade(before, after, cases[cid])
    assert not ok, why
    assert C.diff_files(diff.read_text(encoding="utf-8"))
