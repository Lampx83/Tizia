import json

from evaluation.pipeline import lf235_grade as g

CSS_BASE = """<style>
  .prompt { font-size: 20px; color: #111; }
  .prompt .label { font-size: 24px; font-weight: 800; color: #7c3aed; }
  .prompt .glyph { color: #222; }
</style>
<body><div class="prompt"><span class="label">A</span></div></body>
"""


def case(title, types, **kw):
    return {"id": "x", "title": title, "types": [types], "file": "p.html", **kw}


def test_parse_css_color():
    e = g.parse_expect(case("Đổi màu chữ của '.prompt .label' sang xanh lá #16a34a", "css_color"))
    assert e == {"kind": "css_color", "selector": ".prompt .label", "color": "#16a34a"}


def test_parse_replace_pairs_two():
    e = g.parse_expect(case("Đổi hai chữ trên trang: 'A b' thành 'C d' và '0/5 x' thành 'E f'", "replace_text"))
    assert e["pairs"] == [("A b", "C d"), ("0/5 x", "E f")]


def test_parse_replace_unquoted_target_is_none():
    assert g.parse_expect(case("Đổi chữ nút sinh câu hỏi thành: Chế thuốc.", "replace_text")) is None


def test_parse_insert_with_anchor_and_trailing():
    e = g.parse_expect(case("Thêm tiêu đề 'Kiểm pha.' ngay sau tiêu đề '📝 Mở quiz'", "insert_text"))
    assert e == {"kind": "insert_text", "text": "Kiểm pha.", "anchor": "📝 Mở quiz"}
    e = g.parse_expect(case("Thêm nhãn mới ngay sau nhãn nhỏ: Ghi đơn học thẻ tập.", "insert_text"))
    assert e == {"kind": "insert_text", "text": "Ghi đơn học thẻ tập.", "anchor": None}


def test_css_color_pass():
    e = {"kind": "css_color", "selector": ".prompt .label", "color": "#16a34a"}
    cand = CSS_BASE.replace("color: #7c3aed", "color: #16a34a")
    assert g.check_candidate(e, CSS_BASE, cand)[0] == "pass"


def test_css_color_wrong_value_fails():
    e = {"kind": "css_color", "selector": ".prompt .label", "color": "#16a34a"}
    cand = CSS_BASE.replace("color: #7c3aed", "color: #dc2626")
    v, why = g.check_candidate(e, CSS_BASE, cand)
    assert v == "fail" and "color" in why


def test_css_color_collateral_edit_fails():
    e = {"kind": "css_color", "selector": ".prompt .label", "color": "#16a34a"}
    cand = CSS_BASE.replace("color: #7c3aed", "color: #16a34a").replace("color: #222", "color: #16a34a")
    v, why = g.check_candidate(e, CSS_BASE, cand)
    assert v == "fail" and "collateral" in why


def test_css_color_wrong_rule_fails():
    e = {"kind": "css_color", "selector": ".prompt .label", "color": "#16a34a"}
    cand = CSS_BASE.replace("color: #111", "color: #16a34a")
    assert g.check_candidate(e, CSS_BASE, cand)[0] == "fail"


def test_replace_pass_and_extra_edit_fail():
    e = {"kind": "replace_text", "pairs": [("Quay lại", "Về")]}
    base = "<a>Quay lại</a>\n<b>keep</b>\n"
    assert g.check_candidate(e, base, "<a>Về</a>\n<b>keep</b>\n")[0] == "pass"
    v, why = g.check_candidate(e, base, "<a>Về</a>\n<b>changed</b>\n")
    assert v == "fail" and "collateral" in why


def test_replace_missing_fails():
    e = {"kind": "replace_text", "pairs": [("Quay lại", "Về")]}
    assert g.check_candidate(e, "<a>Quay lại</a>\n", "<a>Quay lại</a>\n")[0] == "fail"


def test_insert_pass_needs_text_after_anchor_and_no_deletion():
    e = {"kind": "insert_text", "text": "Mới", "anchor": "Tải"}
    base = "<p>Tải</p>\n<p>x</p>\n"
    assert g.check_candidate(e, base, "<p>Tải</p>\n<p>Mới</p>\n<p>x</p>\n")[0] == "pass"
    assert g.check_candidate(e, base, "<p>Mới</p>\n<p>Tải</p>\n<p>x</p>\n")[0] == "fail"
    assert g.check_candidate(e, base, "<p>Tải</p>\n<p>Mới</p>\n")[0] == "fail"


def trial(outcome, **kw):
    return {"case": "c", "arm": "B0", "outcome": outcome, **kw}


def test_grade_ship_without_artifact_not_gradable():
    r = g.grade_trial(trial("needs_review"), None, None, None)
    assert r["independent_verdict"].startswith("not_gradable") and not r["wrong_pass"] and not r["false_block"]


def test_grade_wrong_pass_and_false_block():
    e = {"kind": "replace_text", "pairs": [("a", "b")]}
    r = g.grade_trial(trial("needs_review"), e, "<i>a</i>\n", "<i>a</i>\n")
    assert r["independent_verdict"] == "fail" and r["wrong_pass"] is True
    r = g.grade_trial(trial("blocked", gate_reached=5), e, "<i>a</i>\n", "<i>b</i>\n")
    assert r["independent_verdict"] == "pass" and r["false_block"] is True


def test_grade_blocked_without_candidate_not_scored_as_fail():
    r = g.grade_trial(trial("blocked", gate_reached=1.0), {"kind": "x"}, "b", None)
    assert r["independent_verdict"] == "not_gradable:no_candidate"
    assert r["wrong_pass"] is False and r["false_block"] is False and r["correct_block"] is False


def test_summary_rates():
    rows = [
        {"arm": "B0", "ship": True, "independent_verdict": "fail", "wrong_pass": True, "false_block": False, "correct_pass": False, "correct_block": False},
        {"arm": "B0", "ship": True, "independent_verdict": "pass", "wrong_pass": False, "false_block": False, "correct_pass": True, "correct_block": False},
        {"arm": "B0", "ship": False, "independent_verdict": "not_gradable:no_candidate", "wrong_pass": False, "false_block": False, "correct_pass": False, "correct_block": False},
    ]
    s = g.summarize(rows)["B0"]
    assert s["n"] == 3 and s["gradable"] == 2 and s["wrong_pass"] == 1 and s["correct_pass"] == 1
    assert s["wrong_pass_rate"] == 0.5


def test_run_carries_candidate_missing_reason(tmp_path, monkeypatch):
    case = {"id": "c1", "file": "p.html"}
    (tmp_path / "cases-dev.json").write_text(json.dumps([case]), encoding="utf-8")
    trials = tmp_path / "trials"
    trials.mkdir()
    (trials / "B0-r1-c1.json").write_text(json.dumps({"case": "c1", "arm": "B0", "repeat": 1, "outcome": "blocked",
                                                      "gate_reached": 5, "candidate_missing": "head not found: x"}),
                                           encoding="utf-8")
    monkeypatch.setattr(g, "DATA", tmp_path)
    monkeypatch.setattr(g, "_git_show", lambda ref, path: "<a>x</a>\n")
    monkeypatch.setattr(g, "parse_expect", lambda c: None)
    rows = g.run(trials)
    assert rows[0]["independent_verdict"] == "not_gradable:no_artifact"
    assert rows[0]["candidate_missing"] == "head not found: x"
