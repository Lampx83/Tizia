"""Replay fixture traces through tip gates offline (no model). Table per gate: correct/false-block/wrong-pass/ungraded."""
import json
import os
from collections import defaultdict
from pathlib import Path

FIXTURES = Path(__file__).parent / "tests" / "fixtures"
LOCKED_ENV = {"AI_BOARD_GATE25_FIXES": "quotes,ellipsis"}


def _load():
    return json.loads((FIXTURES / "gate_replay.json").read_text(encoding="utf-8"))


def _request(data, key):
    return dict(data["requests"][key])


def _coverage(data, case):
    from runtime import coverage
    plan = json.loads(data["plans"][case["plan"]]["output"])
    text = coverage.user_text(_request(data, data["plans"][case["plan"]]["request"]))
    return "block" if coverage.plan_block(plan, lambda: [], lambda: coverage.requested_missing(plan, text)) else "pass"


def _grounding(data, case):
    from gates import plan_validate as pv
    validation = pv.parse_validation(data["validations"][case["validation"]]["output"])
    plan = json.loads(data["plans"][data["validations"][case["validation"]]["plan"]]["output"])
    files = {path: data["files"][path] for path in (t["file"] for t in plan["subtasks"]) if path in data["files"]}
    validation["grounding"] = pv.filled_grounding(validation, plan, files, bool(validation.get("grounded")))
    try:
        pv.checked_grounding(validation, plan, "ca32178", files)
    except ValueError:
        return "block"
    return "pass"


def _text_expectation(data, case):
    from verification import functional
    request = _request(data, case["request"])
    slug = "so-tay-git"
    shown = functional.text_expectation({"request_title": request["title"], "request_detail": request["detail"]})
    return "block" if any(slug in word for word in shown["present"]) else "pass"


def _pii(data, case):
    from gates import guard
    return "block" if guard._pii(case["line"], set()) else "pass"


def _new_file(data, case):
    from gates import brainstorm
    files = case.get("files") or []
    return "pass" if files and all(brainstorm._NEW_OK.match(path) for path in files) else "block"


def _objection(data, case):
    from gates import plan_validate as pv
    recorded = json.loads((FIXTURES / "lf123_request7_validator.json").read_text(encoding="utf-8"))[case["record"]]
    validation = pv.parse_validation(recorded["response"])
    return "block" if validation.get("objection") else "pass"


_REPLAY = {"plan_coverage": _coverage, "grounding": _grounding, "text_expectation": _text_expectation,
           "pii": _pii, "objection": _objection, "new_file": _new_file}


def run(env=None):
    """Rows {gate, trace, truth, got, verdict}; verdict in correct|false_block|wrong_pass|ungraded."""
    import settings
    data, rows = _load(), []
    for case in data["cases"]:
        saved = {k: os.environ.get(k) for k in {**LOCKED_ENV, **(env or {}), **case.get("env", {})}}
        os.environ.update({**LOCKED_ENV, **(env or {}), **case.get("env", {})})
        settings.reset_settings()
        try:
            got = _REPLAY[case["fn"]](data, case)
        finally:
            for key, value in saved.items():
                os.environ.pop(key, None) if value is None else os.environ.__setitem__(key, value)
            settings.reset_settings()
        truth = case.get("truth")
        verdict = ("ungraded" if truth is None else "correct" if got == truth
                   else "false_block" if got == "block" else "wrong_pass")
        rows.append({"gate": case["gate"], "trace": case["trace"], "truth": truth, "got": got, "verdict": verdict})
    return rows


def table(rows):
    totals = defaultdict(lambda: defaultdict(int))
    for row in rows:
        totals[row["gate"]][row["verdict"]] += 1
    lines = [f"{'gate':<16}{'correct':>8}{'false_block':>13}{'wrong_pass':>12}{'ungraded':>10}"]
    for gate, count in sorted(totals.items()):
        lines.append(f"{gate:<16}{count['correct']:>8}{count['false_block']:>13}{count['wrong_pass']:>12}{count['ungraded']:>10}")
    return "\n".join(lines)


if __name__ == "__main__":
    print(table(run()))
