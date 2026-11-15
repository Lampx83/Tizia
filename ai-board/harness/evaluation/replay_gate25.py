"""Stage-isolated replay of flag plan_validate_clarify_rules at Gate 2.5.

    python -m evaluation.replay_gate25 --offline [--trials DIR --cases FILE --inputs DIR]
    python -m evaluation.replay_gate25 --model --synth-plan     # GPU lane only

Upstream inputs (request, Gate 1 plan, REPO DATA) are held fixed per case; only the flag differs.
Verdicts: PASS | FAIL at stage | NOT MEASURABLE.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from settings import get_settings

HERE = Path(__file__).resolve().parent
CONTROLS = HERE / "datasets" / "gate25_clarify_controls.json"
SCRATCH = get_settings().scratch or Path("H:/01_Main_coding_projects/Tizia/.scratch/ab-driver")
FLAG = "AI_BOARD_PLAN_VALIDATE_CLARIFY_RULES"
TICKET = ("B0-r4-replace_text-l2-71c5fa", "A-r1-replace_text-l1-5a0b0b")
STOPS = ("needs_clarification", "plan_target_uncertain")
WANT_DROP, WANT_ASK, UNLABELLED = "drop", "ask", "unlabelled"
_TYPES = ("replace_text", "css_color", "size_hide", "insert_text", "remove_element")


def _case_id(stem: str) -> str:
    """Trial stem 'B0-r4-replace_text-l2-71c5fa' -> dev case id 'replace_text-l2-71c5fa'."""
    parts = stem.split("-")
    for i, part in enumerate(parts):
        if part.startswith(_TYPES):
            return "-".join(parts[i:])
    return stem


def _trial_hit(trial: dict) -> bool:
    return any(stop in str(trial.get(key) or "") for key in ("outcome", "verdict_reason", "internal_reason", "failure_class", "loop_stop")
               for stop in STOPS)


def _read(path: Path):
    return json.loads(path.read_text(encoding="utf-8")) if path.is_file() else None


def build_cases(trials: Path | None, cases_file: Path | None, inputs: Path | None, controls: Path = CONTROLS) -> list[dict]:
    """Case records {id, group, want, request, plan, question, verbatim, ...}; missing inputs stay None."""
    dev = {c["id"]: c for c in (_read(cases_file) or [])} if cases_file else {}
    data = _read(controls) or {}
    notes = data.get("saved_notes", {})
    stems = list(TICKET)
    if trials and trials.is_dir():
        stems += [f.stem for f in sorted(trials.glob("*.json")) if f.stem not in stems and _trial_hit(_read(f) or {})]
    cases = []
    for stem in stems:
        base = dev.get(_case_id(stem))
        request = {"subject": base["title"], "body": base["detail"]} if base else None
        saved = (_read(inputs / f"{stem}.json") if inputs else None) or {}
        note = notes.get(stem, {})
        cases.append({"id": stem, "group": "ticket" if stem in TICKET else "trial",
                      "want": WANT_DROP if stem in TICKET else UNLABELLED,
                      "request": saved.get("request") or request, "plan": saved.get("plan"),
                      "question": saved.get("question") or note.get("question"),
                      "verbatim": bool(saved.get("question")), "repo_context": saved.get("repo_context"),
                      "file": base.get("file") if base else None, "verify": base.get("verify") if base else None})
    for ctl in data.get("controls", []):
        cases.append({"id": ctl["id"], "group": "control", "want": WANT_ASK,
                      "request": {"subject": ctl["subject"], "body": ctl["body"]}, "plan": ctl["plan"],
                      "question": ctl["question"], "verbatim": False, "repo_context": None, "file": None, "verify": None})
    return cases


def synth_plan(case: dict) -> dict | None:
    """One-subtask plan from the dev case: stand-in when Gate 1's saved plan is missing."""
    request = case.get("request")
    if not request or not case.get("file"):
        return None
    return {"summary_vi": request["subject"], "capabilities": [],
            "subtasks": [{"title": request["subject"], "file": case["file"], "verify": case.get("verify") or ""}]}


def post_filter(question: str | None, request: dict, plan: dict | None, flag_on: bool) -> dict:
    """Question left after the Gate 2.5 post-filters of gates/plan_validate.run. names_edit None = plan missing."""
    from gates import plan_validate as pv
    rule = pv.asks_repo_rule(question)
    named = pv.names_edit(request, plan) if request and plan else None
    dropped = None
    if question and pv.asks_about_code(question):
        dropped = "code_question"
    elif question and flag_on and (rule or named):
        dropped = "repo_rule" if rule else "names_edit"
    return {"question": None if dropped else question, "dropped_by": dropped, "repo_rule": rule, "names_edit": named}


def judge(off: dict, on: dict) -> str:
    """dropped | kept | not_measurable. Kept without a plan is unproven: names_edit could not run."""
    if off["question"] is None:
        return "not_measurable"
    if on["question"] is None:
        return "dropped"
    return "not_measurable" if on["names_edit"] is None else "kept"


def verdict(rows: list[dict]) -> str:
    gated = [r for r in rows if r["want"] in (WANT_DROP, WANT_ASK)]
    if any((r["want"] == WANT_DROP and r["result"] == "kept") or (r["want"] == WANT_ASK and r["result"] == "dropped") for r in gated):
        return "FAIL at stage"
    return "PASS" if gated and all(r["result"] in ("dropped", "kept") for r in gated) else "NOT MEASURABLE"


def _row(case: dict) -> dict:
    return {"id": case["id"], "group": case["group"], "want": case["want"], "has_plan": bool(case["plan"]),
            "has_question": bool(case["question"]), "verbatim": case["verbatim"], "q_off": None, "q_on": None,
            "repo_rule": None, "names_edit": None, "result": "not_measurable", "why": ""}


def _filled(case: dict, off: dict, on: dict, why: str) -> dict:
    return {**_row(case), "q_off": off["question"] is not None, "q_on": on["question"] is not None,
            "repo_rule": on["repo_rule"], "names_edit": on["names_edit"], "result": judge(off, on), "why": why}


def run_offline(cases: list[dict]) -> list[dict]:
    rows = []
    for case in cases:
        request, plan, question = case["request"], case["plan"], case["question"]
        if not request or not question:
            rows.append({**_row(case), "why": "no saved question" if request else "no saved request"})
            continue
        row = _filled(case, post_filter(question, request, plan, False), post_filter(question, request, plan, True),
                      "" if plan else "no saved plan")
        if case["group"] != "control" and not case["verbatim"]:
            row = {**row, "why": f"{row['why']}; paraphrase only, estimate {row['result']}".strip("; "), "result": "not_measurable"}
        rows.append(row)
    return rows


_SCHEMA = {"type": "object", "additionalProperties": False,
           "properties": {"clear": {"type": "boolean"}, "question": {"type": ["string", "null"], "maxLength": 200},
                          "grounded": {"type": "boolean"}, "reason": {"type": "string", "maxLength": 200},
                          "grounding": {"type": "array", "items": {"type": "object"}},
                          "objection": {"type": ["object", "null"]}},
           "required": ["clear", "question", "grounded", "reason", "grounding", "objection"]}


def run_model(cases: list[dict], deps, synth: bool, root: Path) -> list[dict]:
    """Gate 2.5 reviewer once per flag state, then the production post-filters. GPU lane only."""
    import settings
    from gates import plan_validate as pv
    from runtime.budget import Budget
    rows = []
    try:
        for case in cases:
            plan = case["plan"] or (synth_plan(case) if synth else None)
            request = case["request"]
            if not request or not plan:
                rows.append({**_row(case), "why": "no saved plan (use --synth-plan)" if request else "no saved request"})
                continue
            context = case["repo_context"] or pv.source_evidence(request, plan, {"checkout_source": root})[2]
            got = {}
            for flag_on in (False, True):
                os.environ[FLAG] = "1" if flag_on else "0"
                settings.reset_settings()
                body = deps.call_model(deps.models.gate1_model, pv.build_prompt(request, plan, context), gate=2.5,
                                       budget=Budget(max_model_calls=2, max_units=600, max_wall_clock_s=300),
                                       format=_SCHEMA, prompt_name="plan_validate.md")
                result = pv.parse_validation(body.get("response", ""))
                got[flag_on] = post_filter(None if result["clear"] else result["question"], request, plan, flag_on)
            rows.append(_filled(case, got[False], got[True], "" if case["plan"] else "synthetic plan"))
    finally:
        os.environ.pop(FLAG, None)
        settings.reset_settings()
    return rows


def table(rows: list[dict]) -> str:
    def mark(value):
        return "-" if value is None else ("Y" if value else "n")
    lines = [f"{'case':<38}{'grp':<8}{'want':<11}{'plan':<5}{'q_off':<6}{'q_on':<5}{'rule':<5}{'edit':<5}{'result':<15}note"]
    for r in rows:
        note = [r["why"]] if r["why"] else []
        lines.append(f"{r['id']:<38}{r['group']:<8}{r['want']:<11}{mark(r['has_plan']):<5}{mark(r['q_off']):<6}{mark(r['q_on']):<5}"
                     f"{mark(r['repo_rule']):<5}{mark(r['names_edit']):<5}{r['result']:<15}{'; '.join(note)}")
    gated = [r for r in rows if r["want"] != UNLABELLED]
    done = sum(r["result"] in ("dropped", "kept") for r in gated)
    bad = [r["id"] for r in gated if (r["want"] == WANT_DROP and r["result"] == "kept") or (r["want"] == WANT_ASK and r["result"] == "dropped")]
    lines.append(f"VERDICT {FLAG}: {verdict(rows)}  (ticket+control cases {len(gated)}, measurable {done}; unlabelled trials listed, not judged)"
                 + (f"; failing: {', '.join(bad)}" if bad else ""))
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--offline", action="store_true", help="no model: deterministic filters on saved questions")
    mode.add_argument("--model", action="store_true", help="call the Gate 2.5 reviewer (GPU lane)")
    parser.add_argument("--trials", type=Path, default=SCRATCH / "trials")
    parser.add_argument("--cases", type=Path, default=SCRATCH / "cases-dev.json")
    parser.add_argument("--inputs", type=Path, default=SCRATCH / "gate25-inputs",
                        help="optional <trial>.json with request/plan/question/repo_context")
    parser.add_argument("--synth-plan", action="store_true", help="model mode: one-subtask plan from the dev case when no saved plan")
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")
    cases = build_cases(args.trials, args.cases, args.inputs)
    if args.offline:
        rows = run_offline(cases)
    else:
        from dotenv import load_dotenv
        from runtime.pipeline import ENV_FILE, ROOT, Deps
        load_dotenv(ENV_FILE)
        rows = run_model(cases, Deps.real(), args.synth_plan, ROOT)
    print(table(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
