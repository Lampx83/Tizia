"""Re-run one gate (3/4/5) of a saved attempt from its journal checkpoint with current code. Board DB read-only."""
from __future__ import annotations

import contextlib
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
import time
from pathlib import Path

GATES = (3, 4, 5)
CHECKPOINT_NODE = {4: "gate_3", 5: "gate_4"}
RO_ENV = "-c default_transaction_read_only=on"

SQL = """
SELECT json_build_object(
  'root', (SELECT row_to_json(x) FROM (SELECT t.id, t.plan_hash, t.budget_limit, r.title, r.detail, r.clarified_spec
             FROM ai_tickets t JOIN requests r ON r.id=t.source_request_id
             WHERE t.source_request_id={req} AND t.parent_id IS NULL) x),
  'plan', (SELECT row_to_json(p) FROM (SELECT p.plan_json, p.capability_policy_hash FROM ai_plans p
             JOIN ai_tickets t ON t.id=p.root_ticket_id AND t.plan_hash=p.plan_hash
             WHERE t.source_request_id={req} AND t.parent_id IS NULL ORDER BY p.revision DESC LIMIT 1) p),
  'journal', (SELECT coalesce(json_agg(row_to_json(j) ORDER BY j.created_at, j.id), '[]') FROM (
             SELECT j.id, j.run_id, j.node, j.outcome, j.state_delta, j.ledger, j.created_at
             FROM ai_attempt_journal j JOIN ai_tickets t ON t.id=j.ticket_id
             WHERE t.source_request_id={req} AND t.parent_id IS NULL) j)
)
"""


class ReplayError(RuntimeError):
    pass


def ro_query(container: str, sql: str, timeout: int = 120) -> str:
    """psql in the board container with the session forced read-only."""
    cmd = ["docker", "exec", "-e", f"PGOPTIONS={RO_ENV}", container, "psql", "-U", "tizia", "-d", "tizia", "-t", "-A", "-c", sql]
    done = subprocess.run(cmd, capture_output=True, timeout=timeout)
    if done.returncode:
        raise ReplayError(f"psql failed: {done.stderr.decode('utf-8', 'replace')[:400]}")
    return done.stdout.decode("utf-8", "replace").strip()


def _json(text, default):
    try:
        return json.loads(text) if isinstance(text, str) else (text if text is not None else default)
    except ValueError:
        return default


def fetch(request_id: int, query) -> dict:
    """Root ticket, accepted plan and journal rows of a request; query(sql) -> text. Raise ReplayError when missing."""
    raw = query(SQL.format(req=int(request_id)))
    data = json.loads(raw) if raw else {}
    root, plan = data.get("root"), data.get("plan")
    if not root or not plan:
        raise ReplayError(f"request {request_id}: no root ticket or accepted plan")
    rows = [{"run_id": r["run_id"], "node": r["node"], "outcome": r["outcome"], "created_at": r["created_at"],
             "state": _json(r["state_delta"], {}), "ledger": _json(r["ledger"], {})} for r in data.get("journal") or []]
    return {"root": root, "plan": _json(plan["plan_json"], {}), "policy_hash": plan.get("capability_policy_hash"), "journal": rows}


def pick_checkpoint(journal: list[dict], gate: int) -> dict:
    """{run_id, entries (up to the checkpoint node), base_sha}. Gate 3 has no checkpoint: latest run, any base it saved."""
    runs: dict = {}
    for row in journal:
        runs.setdefault(row["run_id"], []).append(row)
    if gate == 3:
        for run_id in reversed(list(runs)):
            base = next((r["state"].get("base_sha") for r in reversed(runs[run_id]) if r["state"].get("base_sha")), None)
            if base:
                return {"run_id": run_id, "entries": [], "base_sha": base}
        raise ReplayError("journal has no base_sha to replay gate 3 from")
    want = CHECKPOINT_NODE[gate]
    for run_id in reversed(list(runs)):
        rows = runs[run_id]
        hit = next((i for i in range(len(rows) - 1, -1, -1) if rows[i]["node"] == want and rows[i]["outcome"] == "passed"), None)
        if hit is None:
            continue
        entries = rows[:hit + 1]
        if not any((r["state"] or {}).get("produced") for r in entries):
            continue
        return {"run_id": run_id, "entries": entries, "base_sha": entries[-1]["state"].get("base_sha")}
    raise ReplayError(f"no passed {want} checkpoint with produced code in this request's journal")


def _rmtree(path) -> None:
    def retry(func, target, _exc):
        os.chmod(target, stat.S_IWRITE)
        func(target)
    shutil.rmtree(path, onerror=retry)


@contextlib.contextmanager
def checkout_at(source: Path, sha: str):
    """Throwaway clone of source at sha: candidate branches made during the run die with it."""
    tmp = Path(tempfile.mkdtemp(prefix="gate-replay-"))
    try:
        for cmd in (["git", "clone", "-q", "--shared", "--no-checkout", str(source), str(tmp)],
                    ["git", "-C", str(tmp), "checkout", "-q", "--detach", sha]):
            done = subprocess.run(cmd, capture_output=True)
            if done.returncode:
                raise ReplayError(f"{' '.join(cmd[:4])}: {done.stderr.decode('utf-8', 'replace')[:300]}")
        yield tmp
    finally:
        _rmtree(tmp)


@contextlib.contextmanager
def applied_env(env: dict[str, str]):
    saved = {k: os.environ.get(k) for k in env}
    os.environ.update(env)
    try:
        yield
    finally:
        for key, old in saved.items():
            if old is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = old


def _worker():
    ai_board = str(Path(__file__).resolve().parents[3])
    if ai_board not in sys.path:
        sys.path.insert(0, ai_board)
    import worker_execution
    return worker_execution


def estimated_model_calls(plan: dict) -> int:
    """Lower bound: one generation per plan step; repair/review rounds add more."""
    return len(plan.get("steps") or [])


def run_once(data: dict, gate: int, checkpoint: dict, source: Path, *, deps=None, budget=None, run_gate=None, cleanup=None) -> dict:
    """One replay of `gate` on a fresh clone; real deps/budget/run_gate/cleanup unless injected (tests)."""
    we = _worker()
    if deps is None:
        Budget, Deps, real_run_gate = we._load_harness()
        deps, run_gate = we._real_deps(Deps, None, None), run_gate or real_run_gate
        budget = budget or Budget.from_env()
    if cleanup is None:
        from services import candidate
        cleanup = lambda state, keep_branch=False: candidate.cleanup(state, keep_branch=False)  # noqa: E731
    root, plan = data["root"], data["plan"]
    if root.get("budget_limit"):
        budget.max_units = int(root["budget_limit"])
    plan_hash, policy_hash = root["plan_hash"], data["policy_hash"]
    from repositories import plan_session
    detail = f"{root.get('title') or ''}\n{root.get('clarified_spec') or root.get('detail') or ''}"
    with checkout_at(source, checkpoint["base_sha"]) as clone:
        ex = we._Execution(
            plan, ticket_id=int(root["id"]), checkout_source=clone, deps=deps, budget=budget, run_gate=run_gate, cleanup=cleanup,
            catalog=None, request_detail=detail, memory_path=None, should_stop=None, candidate_opts=None, request_type=None,
            eval_tasks=None, preview_capture=None, checkpoint=None, plan_hash=plan_hash, journal_hook=None,
            resume=[{"run_id": checkpoint["run_id"], "entries": checkpoint["entries"]}] if gate > 3 else None,
            policy_hash=policy_hash, resume_node=f"gate_{gate}",
            plan_session=plan_session.get(plan_hash), approved=plan_session.get_approved(plan_hash))
        drift: list[str] = []
        if gate > 3:
            done = checkpoint["entries"][-1]
            current = we.resume_pins(plan_hash=plan_hash, base=ex._checkout_head(), policy_hash=policy_hash)
            drift = we.pin_mismatch(done["state"].get("pins"), current)
            done["state"]["pins"] = current  # replay runs current code on purpose; drift is reported, not a veto
            ex.resume_seed = ex._prepare_resume()
            if ex.resume_seed is None:
                raise ReplayError("checkpoint could not be restored (scratch or candidate rebuild failed)")
        started = time.time()
        try:
            ex.attempt_open()
            outcome = ex.gate(gate)
        finally:
            for fn in (lambda: cleanup(ex.state or {}, keep_branch=False), lambda: shutil.rmtree(ex.scratch, ignore_errors=True)):
                with contextlib.suppress(Exception):
                    fn()
        public = we._public_gate_result(ex.last_result)
    return {"outcome": outcome, "blocked": public["blocked"], "reason": public.get("reason"),
            "guest_switches": public.get("guest_switches"), "failure_class": ex.last_result.get("failure_class"),
            "pin_drift": drift, "seconds": round(time.time() - started, 1), "result": public}


def replay(request_id: int, gate: int, *, query, source: Path, arm_env: dict[str, str] | None = None,
           times: int = 1, out_dir: Path, arm: str | None = None, runner=run_once) -> dict:
    """Fetch, pick checkpoint, run `times` replays under the arm env, write the JSON report. Return the report."""
    if gate not in GATES:
        raise ReplayError(f"gate must be one of {GATES}")
    data = fetch(request_id, query)
    checkpoint = pick_checkpoint(data["journal"], gate)
    calls = estimated_model_calls(data["plan"]) if gate == 3 else 0
    print(f"[replay] request {request_id} gate {gate} from run {checkpoint['run_id']} base {str(checkpoint['base_sha'])[:10]} "
          f"arm {arm or '(current env)'}; est model calls >= {calls * times}" + ("" if gate == 3 else " (no model)"))
    runs = []
    with applied_env(arm_env or {}):
        for index in range(times):
            fresh = {**checkpoint, "entries": json.loads(json.dumps(checkpoint["entries"]))}
            runs.append(runner(data, gate, fresh, source))
            print(f"[replay] #{index + 1}: {'BLOCKED' if runs[-1]['blocked'] else 'PASSED'} reason={runs[-1]['reason']!r} "
                  f"guest_switches={runs[-1]['guest_switches']} pin_drift={runs[-1]['pin_drift']}")
    report = {"request": request_id, "gate": gate, "arm": arm, "arm_env": arm_env or {}, "checkpoint_run": checkpoint["run_id"],
              "base_sha": checkpoint["base_sha"], "est_model_calls": calls * times, "runs": runs,
              "at": time.strftime("%Y-%m-%dT%H:%M:%S")}
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / f"replay-{request_id}-g{gate}-{arm or 'env'}-{int(time.time())}.json"
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2, default=str), encoding="utf-8")
    report["path"] = str(path)
    print(f"[replay] report {path}")
    return report
