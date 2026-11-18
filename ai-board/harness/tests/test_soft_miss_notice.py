"""PR của run qua kèm kiểm mềm trượt: mục cảnh báo (check, giá trị, ngưỡng, trang, khổ) và nhãn riêng."""
from tests.test_http_worker import PASSING, PLAN

MISS = {"gate": 5, "check": "contrast", "value": 3.68, "threshold": 4.5, "page": "/grapher.html", "width": 375,
        "detail": 'button "Bậc nhất" 3.68'}
GATE4 = {"gate": 4, "check": "inline_script", "value": 1, "threshold": 0, "detail": "public/a.html:3: không dùng <script> inline"}


def _verdict(gate4=(), gate5=()):
    gates = [dict(g) for g in PASSING["gates"]]
    for gate in gates:
        if gate["gate"] == 4 and gate4:
            gate["soft_misses"] = list(gate4)
        if gate["gate"] == 5 and gate5:
            gate["soft_misses"] = list(gate5)
    return {**PASSING, "gates": gates}


def test_pr_body_lists_every_soft_miss_with_value_threshold_and_where():
    from worker import pr_text
    _title, body, labels = pr_text({"request": {"id": 3, "title": "Đổi màu"}}, PLAN, "surface", _verdict([GATE4], [MISS]))
    section = body.split("## Cảnh báo chất lượng", 1)[1].split("\n## ", 1)[0]
    assert "contrast 3.68 (ngưỡng 4.5) /grapher.html 375px" in section
    assert "inline_script 1 (ngưỡng 0)" in section and "Cổng 4" in section and "Cổng 5" in section
    assert "ai-board:soft-warnings" in labels


def test_pr_without_soft_misses_has_no_warning_section():
    from worker import pr_text
    _title, body, labels = pr_text({"request": {"id": 3, "title": "Đổi màu"}}, PLAN, "surface", _verdict())
    assert "Cảnh báo chất lượng" not in body and "ai-board:soft-warnings" not in labels
