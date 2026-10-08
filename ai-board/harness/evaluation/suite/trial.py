"""One trial = one task attempt. mode `e2e`: request text only -> gate 1 plan -> gates 2/2.5 -> gate 3 on the model's own plan -> gate 4 -> oracle.
mode `gold`: gate 3 on the corpus' gold subtask (isolates implementation from planning, comparable to baseline v2)."""
from __future__ import annotations

import dataclasses
import hashlib
import json
import posixpath
import subprocess
import threading
import time
import unicodedata
from pathlib import Path

import code_index
import eval_corpus
import eval_fast
from evaluation import gold as gold_eval
from evaluation.suite import taskpack
from gates import brainstorm, gate3_guards, plan_validate, scope_check, static_check
from runtime.budget import Budget
from runtime.pipeline import Deps

MODES = ("e2e", "gold", "e2e:nodia", "e2e:approved")  # e2e:nodia = request typed without diacritics; e2e:approved = a gate 1/2/2.5 block is treated as admin-approved and gate 3 still runs


def strip_diacritics(text: str) -> str:
    return unicodedata.normalize("NFD", text.replace("đ", "d").replace("Đ", "D")).encode("ascii", "ignore").decode("ascii")


@dataclasses.dataclass(frozen=True)
class RecordingDeps(Deps):
    """Deps that keeps every raw model body of the trial (route, finish reason, text hash) for provenance and loop detection."""
    ledger: list = dataclasses.field(default_factory=list)

    def call_model(self, *args, **kwargs):
        body = super().call_model(*args, **kwargs)
        self.ledger.append(body)
        return body


def recording(base: Deps) -> RecordingDeps:
    return RecordingDeps(**{f.name: getattr(base, f.name) for f in dataclasses.fields(Deps)}, ledger=[])


def request_of(task: dict, variant: str | None = None) -> dict:
    """What a requester wrote: title + detail. `verify` and the gold are never shown to the planner."""
    text = strip_diacritics if "nodia" in (variant or "").split("+") else (lambda t: t)
    return {"id": task["id"], "domain": "", "type": "feature", "subject": text(task["title"]), "body": text(task["detail"]), "thread": [], "votes": 0,
            "grounding_required": True}


def golds(task: dict) -> list[str]:
    return list(task.get("files") or [task["file"]])


def _norm(path: str) -> str:
    return posixpath.normpath(path.strip().replace("\\", "/").lstrip("./"))


def plan_attempt(body: dict, gold: list[str], repo, sha: str) -> dict:
    """Facts about one raw gate-1 answer, independent of brainstorm.run's verdict."""
    out = {"parse_ok": False, "files": [], "missing": False, "new_files": [], "hit": False, "exact": False}
    try:
        plan = brainstorm.parse_plan(body.get("response", ""))
    except ValueError:
        return out
    out["parse_ok"] = True
    out["files"] = [_norm(t["file"]) for t in plan["subtasks"]]
    try:
        brainstorm.check_files(plan, repo, sha)
    except ValueError:
        out["missing"] = True
    present = set(code_index.git(repo, "ls-tree", "--name-only", sha, "--", *out["files"]).decode("utf-8", "replace").splitlines())
    out["new_files"] = [f for f in out["files"] if f not in present and brainstorm._NEW_OK.match(f)]
    out["hit"], out["exact"] = set(gold) <= set(out["files"]), set(out["files"]) == set(gold)
    return out


def _tokens(records: list[dict]) -> tuple[int, int]:
    metrics = [c["metrics"] for c in records]
    return sum(m.get("tokens_in") or 0 for m in metrics), sum(m.get("tokens_out") or 0 for m in metrics)


def _quote_diag(response: str, repo, sha: str) -> list[dict]:
    """What the gate 2.5 validator quoted when grounding failed, and how much of it is really in the file."""
    try:
        records = json.loads(response).get("grounding") or []
    except (TypeError, ValueError, AttributeError):
        return []
    out = []
    for rec in records[:3]:
        if not isinstance(rec, dict) or not isinstance(rec.get("quote"), str):
            continue
        file = rec.get("file") or ""
        shown = subprocess.run(["git", "--git-dir", str(repo), "show", f"{sha}:{file}"], capture_output=True, text=True, encoding="utf-8",
                               errors="replace", stdin=subprocess.DEVNULL)
        text = plan_validate._squash(shown.stdout) if not shown.returncode else ""
        quote = plan_validate._LINE_MARKER.sub("", rec["quote"])
        lines = [l for l in quote.splitlines() if len(l.strip()) >= 4]
        found = sum(plan_validate._squash(l) in text for l in lines)
        out.append({"file": file, "quote": quote[:200], "whole_in_file": plan_validate._squash(quote) in text, "lines_found": f"{found}/{len(lines)}",
                    "has_ellipsis": "..." in quote or "…" in quote})
    return out


def _plan_stage(task: dict, repo, deps: RecordingDeps, wall_s: int, variant: str | None = None) -> tuple[dict, dict | None, list[dict]]:
    """Gates 1 -> 2 -> 2.5 the way the worker runs them. Returns (plan facts, plan or None, tracer records)."""
    tracer = gold_eval.Collect()
    deps = dataclasses.replace(deps, trace=tracer)
    sha, gold = task["base_sha"], golds(task)
    facts = {"attempts": 0, "first_parse_ok": False, "first_hit": False, "first_exact": False, "first_nonexistent": False,
             "first_plans_new_page": False, "first_extra": 0, "blocked": False, "validator_blocked": False, "validator_reason": None,
             "final_hit": False, "final_exact": False, "final_files": [], "reason": None, "approved": "approved" in (variant or "").split("+")}
    request, budget = request_of(task, variant), Budget(max_wall_clock_s=wall_s, max_units=600)
    out = brainstorm.run(request, deps, budget, source=repo, sha=sha)
    tracer.flush()
    attempts = [plan_attempt(b, gold, repo, sha) for b in deps.ledger]
    first = attempts[0] if attempts else {"parse_ok": False, "files": [], "missing": False, "new_files": [], "hit": False, "exact": False}
    facts.update(attempts=len(attempts), first_parse_ok=first["parse_ok"], first_hit=first["hit"], first_exact=first["exact"],
                 first_nonexistent=bool(first["missing"] or first["new_files"]), first_plans_new_page=bool(first["new_files"]),
                 first_extra=len(set(first["files"]) - set(gold)), blocked=bool(out.get("blocked")), reason=str(out.get("reason"))[:160] if out.get("blocked") else None)
    plan = out.get("plan")
    if out.get("blocked") or not plan:
        return facts, None, tracer.records
    final = [t["file"] for t in plan["subtasks"]]
    facts.update(final_hit=set(gold) <= set(final), final_exact=set(final) == set(gold), final_files=final)
    state = {"plan": plan, "checkout_source": str(repo), "planning_context": out.get("repo_context"),
             "source_targets": out.get("source_targets") or [], "best_match": out.get("best_match")}
    for step in (scope_check.run(state), plan_validate.run(request, deps, budget, state)):
        if step.get("blocked"):
            facts.update(validator_blocked=True, validator_reason=facts["validator_reason"] or str(step.get("reason"))[:120],
                         validator_signals=facts.get("validator_signals") or [str(s)[:300] for s in (step.get("signals") or [])][:3],
                         validator_quotes=facts.get("validator_quotes") or (_quote_diag(str(deps.ledger[-1].get("response", "")), repo, sha)
                                                                            if step.get("reason") == "plan_ungrounded" and deps.ledger else []))
            if not facts["approved"]:
                tracer.flush()
                return facts, None, tracer.records
    tracer.flush()
    return facts, plan, tracer.records


def review_candidate(state: dict, deps) -> dict:
    """Gate 4 model content review on the candidate. Every corpus/pack request is benign, so a block here is a false positive."""
    try:
        out = static_check.content_review(state, deps, Budget(max_wall_clock_s=300, max_units=50))
    except Exception as exc:  # noqa: BLE001 - outage is not a verdict
        return {"ran": False, "error": f"{type(exc).__name__}: {exc}"[:150]}
    if out is None:
        return {"ran": False, "no_visible_text": True}
    return {"ran": out.get("failure_class") != "transient", "blocked": bool(out["blocked"]), "labels": out.get("labels")}


def ref_errors(diff: str, repo: Path, sha: str, plan: dict | None) -> int:
    """References the candidate's added lines make to files that exist neither at base nor in the plan."""
    listed = subprocess.run(["git", "--git-dir", str(repo), "ls-tree", "-r", "--name-only", sha], capture_output=True, text=True,
                            encoding="utf-8", errors="replace", stdin=subprocess.DEVNULL)
    known = set(listed.stdout.splitlines()) | {t["file"] for t in (plan or {}).get("subtasks", [])}
    total, current = 0, ""
    for line in diff.splitlines():
        if line.startswith("+++ b/"):
            current = line[6:]
        elif line.startswith("+") and not line.startswith("+++"):
            total += len(gate3_guards.missing_refs(current, "", line[1:], known))
    return total


def run_trial(task: dict, mode: str, base_deps: Deps, root: Path, source, fast: eval_fast.FastTier | None = None,
              fast_lock: threading.Lock | None = None, *, wall_s: int = 900, review: bool = False) -> dict:
    """Never raises for model/infra outcomes (they are result rows). eval_fast.FastTierError propagates: the environment is broken, not the model."""
    gate3_guards.fallbacks(reset=True)
    deps = recording(base_deps)
    kind, _, variant = mode.partition(":")
    taskpack.prepare_checkout(root, task["base_sha"], source)
    rec = taskpack.case_record(task, root, source) if task.get("pack") else eval_corpus.case_record(task, root, source)
    repo, gold, started = Path(rec["checkout"]), golds(task), time.monotonic()
    plan_facts, plan, plan_records, error = None, None, [], None
    try:
        if kind == "e2e":
            plan_facts, plan, plan_records = _plan_stage(task, repo, deps, wall_s, variant or None)
    except eval_fast.FastTierError:
        raise
    except Exception as exc:  # noqa: BLE001 - provider outage is a result
        error = f"{type(exc).__name__}: {exc}"[:300]
    collateral: list[str] = []
    if kind == "e2e":
        plan_facts = plan_facts or {"attempts": 0, "blocked": True, "validator_blocked": False, "first_hit": False, "first_exact": False,
                                    "first_parse_ok": False, "first_nonexistent": False, "first_plans_new_page": False, "first_extra": 0,
                                    "final_hit": False, "final_exact": False, "final_files": [], "validator_reason": None}
        single = rec["oracle"] if task.get("pack") else (lambda files: bool(files.get(gold[0])) and rec["oracle"](files[gold[0]]))

        def oracle(files: dict) -> bool:
            for path, text in files.items():
                before = eval_fast._base_bytes(repo, path)
                if path not in gold and (before is None or before.decode("utf-8", "replace") != text):
                    collateral.append(path)
            return single(files)
        case = {"subtasks": (plan or {}).get("subtasks") or [], "detail": task["detail"], "checkout": rec["checkout"], "oracle": oracle}
    else:
        case = rec
    hook = None
    if fast is not None and not task.get("pack") and (case.get("subtask") or case.get("subtasks")):
        hook = fast.hook({"subtask": case["subtask"]} if "subtask" in case else {"subtasks": case["subtasks"]})
    after = None
    if hook or (review and kind == "gold"):
        def after(state, scratch, files):  # noqa: E306 - serialize the shared app
            out = {}
            if hook:
                with fast_lock or threading.Lock():
                    out = hook(state, scratch, files)
            if review and kind == "gold" and out.get("gate4") != "blocked":
                out["review"] = review_candidate({**state, "request_detail": task["detail"]}, deps)
            return out
    if kind == "e2e" and not case["subtasks"]:
        row = {"case": task["id"], "gate_passed": False, "oracle": False, "reason": "no plan to implement", "calls": 0, "retries": 0, "tokens_in": 0,
               "tokens_out": 0, "done_reasons": [], "last_output": None}
    else:
        try:
            row = gold_eval.run_case(task["id"], case, base_deps.models.gate3_model, deps, after)
        except eval_fast.FastTierError:
            raise
        except Exception as exc:  # noqa: BLE001
            error = error or f"{type(exc).__name__}: {exc}"[:300]
            row = {"case": task["id"], "gate_passed": False, "oracle": False, "reason": error, "calls": 0, "retries": 0, "tokens_in": 0,
                   "tokens_out": 0, "done_reasons": [], "last_output": None}
    row = eval_fast.finish({"gate4": None, "prod": "skipped", **row}) if fast is not None and not task.get("pack") else {**row, "gate4": row.get("gate4"), "shipped": False}
    p_in, p_out = _tokens(plan_records)
    texts = [hashlib.sha1(str(b.get("response", "")).encode("utf-8")).hexdigest() for b in deps.ledger]
    resolved = bool(row["oracle"]) and not error
    return {
        "id": task["id"], "mode": mode, "resolved": resolved, "collateral": sorted(set(collateral)), "gate_passed": row["gate_passed"],
        "gate4": row.get("gate4"), "prod": row.get("prod"), "ended": row.get("ended"), "shipped": row.get("shipped", False),
        "review": row.get("review"), "reason": row.get("reason"), "infra_error": bool(error), "error": error, "plan": plan_facts,
        "model_calls": len(deps.ledger), "retries": row.get("retries", 0),
        "stuck": any(a == b for a, b in zip(texts, texts[1:])),
        "truncated": any(b.get("done_reason") == "length" for b in deps.ledger) or "length" in (row.get("done_reasons") or []),
        "tokens_in": row.get("tokens_in", 0) + p_in, "tokens_out": row.get("tokens_out", 0) + p_out,
        "wall_s": round(time.monotonic() - started, 1),
        "providers": sorted({(b.get("_route") or {}).get("provider") or b.get("_provider") for b in deps.ledger} - {None}),
        "served": sorted({b.get("model") for b in deps.ledger if isinstance(b.get("model"), str)}),
        "reasoning_chars": sum(b.get("_reasoning_chars") or 0 for b in deps.ledger),
        "diff": (row.get("diff") or "")[:6000] or None, "recall": (rec.get("seen") or {}).get("recall"),
        "ref_errors": ref_errors(row.get("diff") or "", repo, task["base_sha"], plan), "schema_fallbacks": gate3_guards.fallbacks(reset=True),
    }
