"""Offline replay of stored stagnation trials: each lands in exactly one branch, no GPU, no held-out data."""
import json

from evaluation import replay_suspect_checks as replay
from verification import checks

STYLE = {"primitive": "computed_style", "path": "/x.html", "selector": "h1", "prop": "color", "value": "#ff0000"}
TEXT = {"primitive": "text_present", "path": "/x.html", "text": "Mua ngay"}
DIFF = "diff --git a/public/x.css b/public/x.css\n-h1 { color: blue; }\n+h1 { color: #ff0000; }\n"
REPEAT = "".join(f"+  <li class=\"item-{i}\">Mua {i}</li>\n" for i in range(30))


def red(check, **extra):
    return {"check": check, "base": False, "candidate": False, **extra}


def trial(row_list, *, request="Đổi màu chữ h1 thành #FF0000", diff=DIFF, rounds=(), reason="check đỏ", text=None):
    log = text if text is not None else "Smoke ...\nCheck Gate 5: " + json.dumps({"verdict": "broken", "rows": row_list}) + "\nx"
    return {"request": {"subject": "", "body": request}, "full_diff": diff, "repair_diffs": list(rounds),
            "gates": [{"gate": 4, "blocked": False}, {"gate": 5, "blocked": True, "reason": reason, "evidence": {"text": log}}]}


FIXTURES = {
    "infra": trial([red(TEXT)], reason="generated tests failed", text="sh: node: not found\nCheck Gate 5: {}"),
    "suspect_from_diff": trial([red(STYLE)]),
    "suspect_stored": trial([red(TEXT, **{"class": checks.CHECK_SUSPECT, "suspect": "đã thêm", "origin": "harness"})],
                            request="x", diff=""),
    "near": trial([red(TEXT)], request="Thêm nút", rounds=["+ a\n", REPEAT, "@@ -1 +1 @@\n" + REPEAT]),
    "wrong": trial([red(TEXT)], request="Thêm 'Mua ngay'", diff="+ <b>Mua sau</b>\n", rounds=["+ a\n", REPEAT]),
}


def test_each_fixture_lands_in_its_branch():
    got = {name: replay.branch(record)["branch"] for name, record in FIXTURES.items()}
    assert got == {"infra": checks.INFRA, "suspect_from_diff": checks.CHECK_SUSPECT, "suspect_stored": checks.CHECK_SUSPECT,
                   "near": replay.NEAR, "wrong": checks.CANDIDATE_WRONG}


def test_precedence_infra_then_suspect_then_near_identical():
    mixed = trial([{**red(TEXT), "class": checks.INFRA}, red(STYLE)], rounds=[REPEAT, REPEAT])
    assert replay.branch(mixed)["branch"] == checks.INFRA
    assert replay.branch(trial([red(STYLE)], rounds=[REPEAT, REPEAT]))["branch"] == checks.CHECK_SUSPECT


def test_raw_evidence_rows_and_journal_diff_texts_are_read_too():
    record = {"evidence": {"checks": {"rows": [red(TEXT)]}, "text": ""}, "repair_state": {"diff_texts": [REPEAT, REPEAT]}}
    assert replay.branch(record) == {"branch": replay.NEAR, "why": "similarity 1.000"}


def test_container_log_not_found_is_not_infra():
    text = "Check Gate 5: " + json.dumps({"rows": [red(TEXT)]}) + "\nContainer logs before teardown:\nsh: convert: not found"
    assert replay.branch(trial([], text=text, request="x"))["branch"] == checks.CANDIDATE_WRONG


def test_report_counts_every_case_once(tmp_path):
    for name, record in FIXTURES.items():
        (tmp_path / f"B0-r1-{name}.json").write_text(json.dumps(record), encoding="utf-8")
    out = replay.report(replay.load(tmp_path))
    assert "B0-r1-near\tnear_identical" in out
    assert out.endswith("summary: infra=1 check_suspect=2 near_identical=1 candidate_wrong=1")
