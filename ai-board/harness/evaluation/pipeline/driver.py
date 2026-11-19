#!/usr/bin/env python3
"""A/B driver for the progress-loop + repair-agent flags.

Drives real requests through the running local stack (web 8041 -> board -> worker), one
request in flight, records per-trial metrics, resumable. Never touches product code.

Arms:
  A = AI_BOARD_PROGRESS_LOOP=0, AI_BOARD_MODEL_REPAIR=0
  B = AI_BOARD_PROGRESS_LOOP=1, AI_BOARD_MODEL_REPAIR=1

Commands:
  freeze                 write manifest.json (heads, contract hash, case list hash)
  users                  create/enrol the extra student owners and mirror them into the board DB
  arm A|B [--force]      recreate the worker with that arm's flags, wait for idle, verify env
  trial --arm A --case <id> --repeat 1 --owner localtest [--max-wait 2400]
  status                 show progress of the current plan
  report                 aggregate trials into report.md numbers
"""
from __future__ import annotations

import argparse
import contextlib
import csv
import hashlib
import http.cookiejar
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from evaluation.pipeline import DATA, WORKTREE
from evaluation.pipeline import history_cases as hc

TRIALS = DATA / "trials"
RAW = DATA / "raw"
BASE = os.environ.get("AB_BASE", "http://127.0.0.1:8041")
REPO = Path(os.environ.get("AB_REPO", r"H:\01_Main_coding_projects\Tizia"))
# compose runs from WORKTREE (local env and overlays live there); pins and hashes come from the checkout the images were built from
CODE = Path(os.environ.get("AB_CODE", str(WORKTREE)))
COMPOSE = [
    "docker", "compose", "-p", "tizia-local",
    "-f", "docker-compose.dev.local.yml",
    "-f", "docs/local/docker-compose.local-demo.yml",
    "-f", "docker-compose.dev-profile.yml",
    "-f", "docs/local/flags.local.yml",
]
FLAGS_ON = WORKTREE / "docs" / "local" / "flags.local.yml"
WORKERS = int(os.environ.get("AB_WORKERS", "1"))
# (compose service, container) of every worker the arm must cover; extra workers run under profile multi-worker.
WORKER_PAIRS = [("ai-board-worker", "aiboard-worker"), ("ai-board-worker-2", "aiboard-worker-2"),
                ("ai-board-worker-3", "aiboard-worker-3")][:WORKERS]
FLAGS_OFF = WORKTREE / "docs" / "local" / "flags-off.local.yml"
BOARD_PG = "aiboard-postgres"
WEB_PG = "tizia-postgres"

ARMS = {
    "A": {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0"},
    "B": {"AI_BOARD_PROGRESS_LOOP": "1", "AI_BOARD_MODEL_REPAIR": "1"},
    "A-arb": {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0", "AI_BOARD_GATE1_ARBITER": "1", "AI_BOARD_GATE1_ARBITER_MIN": "0.97"},
    "A-arb2": {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0", "AI_BOARD_GATE1_ARBITER": "1", "AI_BOARD_GATE1_ARBITER_MIN": "0.97"},
    "A-arb3": {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0", "AI_BOARD_GATE1_ARBITER": "1", "AI_BOARD_GATE1_ARBITER_MIN": "0.97"},
}

# B0 = all off, B1 = all on, B1-minus-<flag> = B1 with one flag off. Off is "0", as in arm A.
NEW_FLAGS = (
    "AI_BOARD_COMPILE_PROSE_VERIFY",
    "AI_BOARD_ORACLE_CSS_SIZE",
    "AI_BOARD_EXPLORE_LOW_CONFIDENCE",
    "AI_BOARD_PROCEDURE_IN_SPLIT",
    "AI_BOARD_TOOL_LOOP",
    "AI_BOARD_STOP_REPORT_V2",
    "AI_BOARD_REPAIR_DIAGNOSE",
)
# Measured on its own via B0-prose; kept off in B1 so B1 gains stay attributable.
B1_OFF = ("AI_BOARD_COMPILE_PROSE_VERIFY",)
MF_PREFIX = "dev-multifile:"
MF_ROOT = DATA / "dev-multifile" / "tasks"
MF_SCRATCH = DATA / "workspaces"
MFC_PREFIX = "multifile:"
MFC_ROOT = DATA / "dev-tizia-multifile"
ALLOW_HELDOUT = False
MAX_WAIT_S = 2400
ARM_ABLATION_PREFIX = "B1-minus-"


def flag_value(flag: str, on: bool) -> str:
    """Env value for one new flag; TOOL_LOOP is tri-state ('', '1', 'auto'), off is ''."""
    if flag == "AI_BOARD_TOOL_LOOP":
        return "1" if on else ""
    return "1" if on else "0"


# Base flags.local.yml sets these to 1; B0/B1 must pin them explicitly, or B0 inherits the loop on.
LOOP_FLAGS = ("AI_BOARD_PROGRESS_LOOP", "AI_BOARD_MODEL_REPAIR")
ARBITER_ON = {"AI_BOARD_GATE1_ARBITER": "1"}
# Pinned explicitly so arm results do not move with the worker default. STOP_REPORT_V2 and GATE1_ARBITER
# get their values from NEW_FLAGS / ARBITER_ON.
FEEDBACK_FLAGS = ("AI_BOARD_PLAN_REPAIR", "AI_BOARD_REPAIR_SAME_SESSION", "AI_BOARD_GATE_FEEDBACK_CAP",
                  "AI_BOARD_STOP_REPORT_V2", "AI_BOARD_GATE1_ARBITER", "AI_BOARD_VERIFY_PRELOADED_BASES",
                  "AI_BOARD_NO_ORACLE_REVIEW_ANY")
B1_FEEDBACK_OFF = tuple(k for k in FEEDBACK_FLAGS if k not in ("AI_BOARD_STOP_REPORT_V2", "AI_BOARD_GATE1_ARBITER"))


def arm_env(arm: str) -> dict[str, str]:
    """Env dict for one arm; ValueError on unknown name."""
    if arm in ARMS:
        return dict(ARMS[arm])
    on = {**{k: flag_value(k, k not in B1_OFF) for k in NEW_FLAGS}, **{k: "1" for k in LOOP_FLAGS}, **ARBITER_ON,
          **{k: "0" for k in B1_FEEDBACK_OFF}}
    if arm == "B0":
        return {**{k: flag_value(k, False) for k in NEW_FLAGS}, **{k: "0" for k in LOOP_FLAGS},
                **{k: "0" for k in FEEDBACK_FLAGS}, **ARBITER_ON}
    if arm == "B0-prose":
        return {**arm_env("B0"), "AI_BOARD_COMPILE_PROSE_VERIFY": "1"}
    if arm == "B0-mf":  # multi-file demo: B0 plus the multi-file subtask and its budget, product defaults untouched
        return {**arm_env("B0"), "AI_BOARD_MULTI_FILE_SUBTASK": "1", "AI_BOARD_BUDGET_BY_FILE_COUNT": "1"}
    if arm == "B1":
        return on
    if arm.startswith(ARM_ABLATION_PREFIX):
        target = arm[len(ARM_ABLATION_PREFIX):]
        matches = [k for k in NEW_FLAGS if k == target or k.endswith("_" + target)]
        if len(matches) != 1 or matches[0] in B1_OFF:
            raise ValueError(f"unknown ablation flag in arm {arm!r}")
        on[matches[0]] = flag_value(matches[0], False)
        return on
    raise ValueError(f"unknown arm {arm!r}")


def arm_table() -> dict[str, dict[str, str]]:
    """Every named arm and its env; written to the freeze manifest."""
    names = ["A", "B", "B0", "B0-mf", "B1"] + [f"{ARM_ABLATION_PREFIX}{k}" for k in NEW_FLAGS if k not in B1_OFF]
    return {name: arm_env(name) for name in names}

# student owners beyond localtest/localadmin; created once, then reused
EXTRA_OWNERS = [("abrun3", "abrun3"), ("abrun4", "abrun4")]
OWNERS = ["localtest", "localadmin", "abrun3", "abrun4"]
ADMIN = "localadmin"
ROLES_FILE = DATA / "case-roles.json"


def case_role(case_id: str) -> str:
    """'admin' when case-roles.json says the request needs an admin sender, else 'student'."""
    try:
        roles = json.loads(ROLES_FILE.read_text(encoding="utf-8"))["roles"]
    except (OSError, ValueError, KeyError):
        return "student"
    return (roles.get(case_id) or {}).get("role", "student")


STUDENT_SUFFIX = "@student"
ROLE_NEG = "role-neg:all"


def admin_case_ids() -> list[str]:
    """Case ids case-roles.json reserves for an admin sender."""
    try:
        roles = json.loads(ROLES_FILE.read_text(encoding="utf-8"))["roles"]
    except (OSError, ValueError, KeyError):
        return []
    return [cid for cid, v in roles.items() if not cid.startswith("_") and (v or {}).get("role") == "admin"]


def student_variant(case_id: str) -> dict:
    """The admin case sent by a student: refusing it is the expected outcome."""
    base = resolve_cases(case_id)[0]
    return {**base, "id": case_id + STUDENT_SUFFIX, "expect_refusal": True}

# Store cost model (store.js ownerGpuS): reservations kind='model' UNION gate_traces model_call rows for roots
# with no reservation yet; gpu_ms -> wall_ms -> budget_units*1000 -> unknown hold (max(loose, folder) = 8000 s).
# The claim SQL admits a folder-less root while owner_gpu_s < loose; a folder root uses folder.
CONTRACT = CODE / "server" / "ai-board" / "contract.json"
DEFAULT_TRIAL_GPU_S = 60  # measured median GPU per trial
EXPECTED_TRIAL_GPU_S = DEFAULT_TRIAL_GPU_S  # overridden by --expected-trial-gpu-s
OWNER_GPU_SQL = """
SELECT coalesce(json_object_agg(owner, seconds), '{}'::json)
FROM (
  SELECT cost.owner_user_id AS owner, ROUND(SUM(cost.seconds)) AS seconds
  FROM (
  SELECT w.created_at, q.owner_user_id,
    CASE WHEN w.provider='api' THEN 0 ELSE GREATEST(0, COALESCE(
      NULLIF(w.metrics_json::json->>'gpu_ms','null')::numeric,
      NULLIF(w.metrics_json::json->>'wall_ms','null')::numeric,
      {unknown_ms})) / 1000.0 END AS seconds
  FROM ai_work_reservations w
  JOIN ai_tickets t ON t.id = w.root_ticket_id
  JOIN requests q ON q.id = t.source_request_id
  WHERE w.kind = 'model'
  UNION ALL
  SELECT g.created_at, grq.owner_user_id,
    CASE WHEN (g.evidence_json::json->>'provider') = 'api' THEN 0 ELSE GREATEST(0, COALESCE(
      NULLIF(g.evidence_json::json#>>'{metrics,gpu_ms}','null')::numeric,
      NULLIF(g.evidence_json::json#>>'{metrics,wall_ms}','null')::numeric,
      NULLIF(g.evidence_json::json->>'budget_units','null')::numeric * 1000,
      {unknown_ms})) / 1000.0 END
  FROM ai_gate_traces g
  JOIN ai_runs gr ON gr.id = g.run_id
  JOIN ai_tickets gt ON gt.id = gr.ticket_id
  JOIN requests grq ON grq.id = gt.source_request_id
  WHERE g.status = 'model_call'
    AND NOT EXISTS (SELECT 1 FROM ai_work_reservations w WHERE w.root_ticket_id = gt.id)
) cost
WHERE cost.created_at > ((extract(epoch FROM now()) * 1000) - 86400000)
GROUP BY cost.owner_user_id
) per_owner
"""


class CapExhausted(RuntimeError):
    """No owner has GPU headroom left in the rolling 24h window."""


def load_gpu_caps(path: Path = CONTRACT) -> tuple[int, int]:
    """(loose, folder) daily GPU seconds per owner from contract.json."""
    gpu = json.loads(path.read_text(encoding="utf-8"))["limits"]["gpu_s_per_user_day"]
    return int(gpu["loose"]), int(gpu["folder"])


GPU_CAP_FOLDERLESS, GPU_CAP_FOLDER = load_gpu_caps()
UNKNOWN_HOLD_MS = max(GPU_CAP_FOLDERLESS, GPU_CAP_FOLDER) * 1000


def owner_ids() -> dict[str, int]:
    rows = psql(WEB_PG, "SELECT id || '|' || username FROM users WHERE username IN (%s)"
                % ",".join("'%s'" % u for u in OWNERS))
    out = {}
    for line in rows.splitlines():
        left, _, name = line.partition("|")
        if name.strip():
            out[name.strip()] = int(left)
    return out


def owner_usage() -> dict[int, float]:
    """Rolling 24h GPU seconds per owner id, the same number the claim SQL compares to the cap."""
    data = psql_json(BOARD_PG, OWNER_GPU_SQL.replace("{unknown_ms}", str(UNKNOWN_HOLD_MS))) or {}
    return {int(k): float(v or 0) for k, v in data.items()}


def owner_headroom(usage: dict[int, float], ids: dict[str, int], name: str, cap: float | None = None) -> float:
    return (GPU_CAP_FOLDERLESS if cap is None else cap) - usage.get(ids.get(name, -1), 0.0)


def pick_owner(order: list[str], ids: dict[str, int], usage: dict[int, float], need: float | None = None,
               exclude: set[str] | None = None, cap: float | None = None) -> tuple[str, float]:
    """First owner in `order` that still fits one trial under the folder-less cap; CapExhausted when none do."""
    exclude = exclude or set()
    need = EXPECTED_TRIAL_GPU_S if need is None else need
    cap = GPU_CAP_FOLDERLESS if cap is None else cap
    shortlist = []
    for name in order:
        if name in exclude or name not in ids:
            continue
        left = owner_headroom(usage, ids, name, cap)
        shortlist.append((name, left))
        if left >= need:
            return name, left
    detail = ", ".join(f"{n}={usage.get(ids[n], 0):.0f}/{cap:.0f}s" for n, _ in shortlist) or "no owners"
    raise CapExhausted(f"no owner has {need:.0f}s of GPU headroom left ({detail})")


def is_clarifying(status: str, phase: str) -> bool:
    """Root waits on a clarification answer the driver never sends."""
    return "clarifying" in (str(status or "") + ":" + str(phase or ""))


def derive_outcome(analysis: dict, root: dict, timed_out: bool) -> tuple[str, str]:
    """(outcome, source): verdict outcome if any, else bucket from root state."""
    if analysis.get("outcome"):
        return str(analysis["outcome"]), "verdict"
    status = str(root.get("status") or "")
    phase = str(root.get("phase") or "")
    if is_clarifying(status, phase):
        return "needs_clarification", "derived"
    if analysis.get("content_guard"):
        return "blocked", "derived"
    if timed_out:
        return "timeout", "derived"
    if phase in ("precheck_blocked", "plan_unfit", "budget_exhausted", "critical_violation",
                 "root_allowance_exhausted", "invalidated"):
        return "blocked", "derived"
    if status == "cancelled":
        return "cancelled", "derived"
    return "blocked", "derived"


def pick_reason(verdict_reason: str, internal_reason: str) -> str:
    """Verdict reason, else the full ai_tickets.internal_reason (never cut)."""
    return verdict_reason or str(internal_reason or "")


def _to_ms(value) -> int | None:
    """Epoch ms from int or psql ISO timestamp string (row_to_json); None if empty."""
    if value is None or value == "":
        return None
    if isinstance(value, (int, float)):
        return int(value)
    return int(datetime.fromisoformat(str(value)).timestamp() * 1000)


def claim_latency_s(root_created: int | str | None, run_created: list[int | str | None]) -> float | None:
    """Seconds from root creation to first run row; None when either side missing."""
    root_ms = _to_ms(root_created)
    firsts = [t for t in (_to_ms(r) for r in run_created) if t is not None]
    if root_ms is None or not firsts:
        return None
    return round((min(firsts) - root_ms) / 1000.0, 1)


def changed_files(seed: Path, ws: Path) -> set[str]:
    """Relative paths of files added, removed or edited in ws vs seed; caches ignored."""
    ignore = {"__pycache__", ".pytest_cache"}

    def walk(root: Path) -> dict[str, bytes]:
        out = {}
        if not root.exists():
            return out
        for path in root.rglob("*"):
            if path.is_file() and not (ignore & set(path.relative_to(root).parts)):
                out[path.relative_to(root).as_posix()] = path.read_bytes()
        return out

    before, after = walk(seed), walk(ws)
    return {p for p in set(before) | set(after) if before.get(p) != after.get(p)}


def out_of_scope(changed: set[str], scope: list[str]) -> list[str]:
    """Changed files not covered by scope (entries ending in / match as prefix)."""
    def allowed(path: str) -> bool:
        return any(path == s or (s.endswith("/") and path.startswith(s)) for s in scope)
    return sorted(p for p in changed if not allowed(p))


def classify_mf_outcome(shipped: bool, oracle_rc: int, changed: set[str], scope: list[str], scope_trap: bool) -> str:
    """resolved | wrong_ship | correct_stop | not_resolved. Out-of-scope edit fails regardless of oracle."""
    violation = bool(out_of_scope(changed, scope))
    passed = oracle_rc == 0 and not violation
    if scope_trap and passed and changed <= {"STOP_REASON.md"}:
        return "correct_stop"
    if shipped:
        return "resolved" if passed else "wrong_ship"
    if scope_trap and passed:
        return "correct_stop"
    return "not_resolved"


def resolve_multifile(task_id: str) -> dict:
    """Case dict for one dev-multifile task from its meta.json."""
    meta_path = MF_ROOT / task_id / "meta.json"
    if not meta_path.exists():
        raise KeyError(f"no multifile task {task_id}")
    meta = json.loads(meta_path.read_text(encoding="utf-8"))
    return {
        "id": MF_PREFIX + task_id, "title": task_id, "detail": meta["request_vi"],
        "level": None, "style": "dev-multifile", "types": meta.get("kind"), "file": None,
        "multifile": meta,
    }


def _mfc():
    """Tracked corpus module from the pinned worktree; imported lazily, single-file trials never need it."""
    import importlib.util
    path = CODE / "ai-board" / "harness" / "evaluation" / "multifile_corpus.py"
    spec = importlib.util.spec_from_file_location("_pinned_multifile_corpus", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def corpus_sealed_ids() -> set[str]:
    """Held-out ids from split.json; their case dirs are not opened unless ALLOW_HELDOUT."""
    doc = json.loads((MFC_ROOT / "split.json").read_text(encoding="utf-8"))
    return {e["id"] for e in doc["cases"] if e["split"] == "heldout"}


def corpus_case(meta: dict) -> dict:
    """Corpus meta.json -> driver case; oracle files are read from corpus_dir at run time."""
    meta = {k: v for k, v in meta.items() if k != "_dir"}
    meta["corpus_dir"] = str(MFC_ROOT / "cases" / meta["id"])
    return {"id": MFC_PREFIX + meta["id"], "title": meta["id"], "detail": meta["request_vi"],
            "level": None, "style": "multifile-corpus", "types": meta.get("kind"), "file": None, "multifile": meta}


def resolve_corpus(want: str) -> list[dict]:
    """Corpus cases for 'all' or an id prefix; dev split only unless ALLOW_HELDOUT."""
    sealed = corpus_sealed_ids()
    metas = _mfc().load_cases(MFC_ROOT, skip=set() if ALLOW_HELDOUT else sealed)
    hits = [m for m in metas if want == "all" or m["id"] == want or m["id"].startswith(want)]
    if not hits:
        if want in sealed:
            raise SystemExit(f"held-out multifile case {want!r} needs --allow-heldout")
        raise SystemExit(f"no multifile corpus case matches {want!r}")
    return [corpus_case(m) for m in hits]


VAGUE_CASES = DATA.parent / "ai-board-vague-cases" / "cases-vague-pilot.json"
ANSWER_CLARIFICATIONS = False


def load_vague_cases() -> list[dict]:
    """Ambiguous-request pilot cases as case dicts; the request text is the only thing the board sees."""
    if not VAGUE_CASES.exists():
        return []
    out = []
    for c in json.loads(VAGUE_CASES.read_text(encoding="utf-8"))["cases"]:
        out.append({**c, "title": c["request"][:120], "detail": c["request"], "level": None,
                    "style": c["kind"], "types": [c["kind"]]})
    return out


def resolve_cases(spec: str) -> list[dict]:
    """Comma list of case ids; dev-multifile:, multifile: (corpus), history: and vague:all tokens expand to tasks."""
    cases_by_id = {c["id"]: c for c in load_cases()}
    vague = {c["id"]: c for c in load_vague_cases()}
    history = {c["id"]: c for c in hc.load_cases()}
    out: list[dict] = []
    for token in (t.strip() for t in spec.split(",") if t.strip()):
        if token == ROLE_NEG:
            out.extend(student_variant(cid) for cid in admin_case_ids())
        elif token.endswith(STUDENT_SUFFIX):
            out.append(student_variant(token[:-len(STUDENT_SUFFIX)]))
        elif token.startswith(MFC_PREFIX):
            out.extend(resolve_corpus(token[len(MFC_PREFIX):]))
        elif token.startswith(MF_PREFIX):
            want = token[len(MF_PREFIX):]
            names = sorted(p.name for p in MF_ROOT.iterdir() if p.is_dir()) if MF_ROOT.exists() else []
            hits = names if want == "all" else [n for n in names if n == want or n.startswith(want)]
            if not hits:
                raise SystemExit(f"no multifile task matches {token!r}")
            out.extend(resolve_multifile(n) for n in hits)
        elif token.startswith(hc.PREFIX) or token in history:
            out.extend(hc.select(token, list(history.values()), ALLOW_HELDOUT))
        elif token == "vague:all":
            out.extend(vague.values())
        elif token in cases_by_id:
            out.append(cases_by_id[token])
        elif token in vague:
            out.append(vague[token])
        else:
            raise SystemExit(f"unknown case {token!r}")
    return out


def apply_candidate(ws: Path, patch: Path) -> str:
    """Apply the captured candidate diff onto the seed copy: 'applied', 'no_candidate_diff' or 'apply_failed: ...'."""
    if not patch.is_file() or not patch.read_text(encoding="utf-8", errors="replace").strip():
        return "no_candidate_diff"
    p = subprocess.run(["git", "apply", "--whitespace=nowarn", str(patch.resolve())], cwd=str(ws),
                       capture_output=True, timeout=120)
    return "applied" if p.returncode == 0 else "apply_failed: " + p.stderr.decode("utf-8", "replace")[:300]


def score_multifile(case: dict, ws: Path, seed: Path, shipped: bool) -> dict:
    """Copy oracle into ws, run oracle_cmd, classify. Adds scoring fields only."""
    meta = case["multifile"]
    dests = []
    for src, dst in case_oracle_pairs(case):
        target = ws / dst
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(src.read_bytes())
        dests.append(dst)
    changed = changed_files(seed, ws) - set(dests)
    link = hc.node_modules_link(ws, REPO) if "base" in meta else contextlib.nullcontext()
    with link:
        try:
            p = subprocess.run(meta["oracle_cmd"], shell=True, cwd=str(ws), capture_output=True, timeout=300)
        except subprocess.TimeoutExpired:
            p = subprocess.CompletedProcess(meta["oracle_cmd"], 124, b"", b"oracle timeout")
    stop = ws / "STOP_REASON.md"
    stop_text = stop.read_text(encoding="utf-8", errors="replace") if stop.exists() else ""
    scope = meta.get("scope", [])
    scope_trap = "scope-trap" in (meta.get("tags") or [])
    return {
        "oracle_rc": p.returncode,
        "touched_files": sorted(changed),
        "out_of_scope_files": out_of_scope(changed, scope),
        "stop_reason": stop_text[:2000],
        "resolved": classify_mf_outcome(shipped, p.returncode, changed, scope, scope_trap) == "resolved",
        "mf_outcome": classify_mf_outcome(shipped, p.returncode, changed, scope, scope_trap),
        "oracle_output": (p.stdout + p.stderr).decode("utf-8", errors="replace"),
    }


def case_seed(case: dict) -> Path:
    """Seed dir: git-archive export of the parent commit for history cases, else dev-multifile seed/."""
    meta = case["multifile"]
    if "base" in meta:
        return hc.ensure_seed(meta, REPO)
    return MF_ROOT / meta["id"] / "seed"


def case_oracle_pairs(case: dict) -> list[tuple[Path, str]]:
    """(oracle source file, destination path inside the workspace)."""
    meta = case["multifile"]
    if "corpus_dir" in meta:
        root = Path(meta["corpus_dir"]) / "oracle"
        return [(root / o["src"], o["dest"]) for o in meta["oracle_files"]]
    if "oracle_pairs" in meta:
        return meta["oracle_pairs"]
    root = MF_ROOT / meta["id"] / "oracle"
    return [(root / rel, rel) for rel in meta.get("oracle_files", [])]


def write_oracle_evidence(stem: str, record: dict, output: str) -> str:
    """Oracle rc + output into raw/oracle/<stem>.log; returns the path."""
    path = RAW / "oracle" / f"{stem}.log"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(f"rc={record['oracle_rc']} mf_outcome={record['mf_outcome']}\n{output}", encoding="utf-8")
    return str(path)


def prepare_workspace(case: dict, arm: str, repeat: int) -> Path | None:
    """Fresh copy of the seed for one multifile trial; None for single-file cases."""
    if "multifile" not in case:
        return None
    meta = case["multifile"]
    seed = case_seed(case)
    ws = MF_SCRATCH / f"{arm}-r{repeat}-{meta['id']}"
    if ws.exists():
        shutil.rmtree(ws)
    shutil.copytree(seed, ws)
    return ws


TERMINAL_PHASES = {
    "pre_pr_ready", "pre_pr_review", "pre_pr_blocked", "budget_exhausted", "plan_unfit",
    "critical_violation", "root_allowance_exhausted", "precheck_blocked", "partial",
    "requester_cancelled", "clarification_received", "invalidated",
}
ACTIVE_STATUS = {"queued", "claimed", "running", "planning", "repairing"}
GOAL_OUTCOMES = {"ready_for_pr", "needs_review"}
SESSIONS: dict[str, "Session"] = {}


def now_ms() -> int:
    return int(time.time() * 1000)


def iso(ts_ms: int | None = None) -> str:
    return datetime.fromtimestamp((ts_ms if ts_ms is not None else now_ms()) / 1000, timezone.utc).isoformat(timespec="seconds")


def sh(cmd: list[str], cwd: Path | None = None, timeout: int = 300) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=str(cwd) if cwd else None, capture_output=True, timeout=timeout)


def sh_text(cmd: list[str], cwd: Path | None = None, timeout: int = 300) -> str:
    p = sh(cmd, cwd=cwd, timeout=timeout)
    out = (p.stdout or b"") + (p.stderr or b"")
    return out.decode("utf-8", "replace").strip()


def psql(db: str, sql: str, timeout: int = 120) -> str:
    """Single-value/row json from psql; utf-8 safe."""
    p = sh(["docker", "exec", db, "psql", "-U", "tizia", "-d", "tizia", "-t", "-A", "-c", sql], timeout=timeout)
    out = (p.stdout or b"").decode("utf-8", "replace").strip()
    if p.returncode != 0:
        err = (p.stderr or b"").decode("utf-8", "replace").strip()
        raise RuntimeError(f"psql failed: {err[:400]}")
    return out


def psql_json(db: str, sql: str, timeout: int = 120):
    raw = psql(db, sql, timeout=timeout)
    mid = raw.strip()
    return json.loads(mid) if mid else None


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def current_pin() -> str:
    """Worktree HEAD the worker image was built from; every trial records it so pins never mix."""
    try:
        return sh_text(["git", "rev-parse", "--short=8", "HEAD"], cwd=CODE)
    except Exception:
        return "unknown"


# ---------------------------------------------------------------- HTTP


class Session:
    def __init__(self, name: str):
        self.name = name
        self.jar = http.cookiejar.CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))
        self.csrf: str | None = None
        self.user: dict | None = None

    def call(self, method: str, path: str, body=None, timeout: int = 90, headers: dict | None = None) -> tuple[int, dict | list | str]:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8") if body is not None else None
        req = urllib.request.Request(BASE + path, data=data, method=method)
        req.add_header("Content-Type", "application/json; charset=utf-8")
        req.add_header("Accept", "application/json")
        if self.csrf:
            req.add_header("X-CSRF-Token", self.csrf)
        for key, value in (headers or {}).items():
            req.add_header(key, value)
        try:
            with self.opener.open(req, timeout=timeout) as resp:
                text = resp.read().decode("utf-8", "replace")
                return resp.status, _maybe_json(text)
        except urllib.error.HTTPError as exc:
            text = exc.read().decode("utf-8", "replace")
            return exc.code, _maybe_json(text)
        except urllib.error.URLError as exc:
            return 0, {"error": "unreachable", "message": str(exc)}

    def login(self, password: str) -> dict:
        status, body = self.call("POST", "/api/auth/login", {"username": self.name, "password": password})
        if status != 200:
            raise RuntimeError(f"login {self.name} -> {status} {body}")
        self.user = body.get("user")
        status, body = self.call("GET", "/api/csrf")
        self.csrf = (body or {}).get("token") if isinstance(body, dict) else None
        if not self.csrf:
            raise RuntimeError(f"csrf token missing for {self.name}")
        return self.user


def _maybe_json(text: str):
    try:
        return json.loads(text)
    except Exception:
        return text


def owner_password() -> str:
    """Local stack owner password from AB_OWNER_PASSWORD; never stored in git."""
    pw = os.environ.get("AB_OWNER_PASSWORD")
    if not pw:
        raise SystemExit("set AB_OWNER_PASSWORD (source .scratch/ab-driver/run_env.sh)")
    return pw


def session(name: str) -> Session:
    if name not in SESSIONS:
        s = Session(name)
        s.login(owner_password())
        SESSIONS[name] = s
    return SESSIONS[name]


# ---------------------------------------------------------------- cases


def load_cases() -> list[dict]:
    path = DATA / "cases-dev.json"
    if not path.exists():
        raise SystemExit(f"missing {path}; run: python -m evaluation.pipeline.driver cases")
    return json.loads(path.read_text(encoding="utf-8"))


def case_list_hash() -> str:
    data = (DATA / "cases-dev.json").read_bytes()
    return hashlib.sha256(data).hexdigest()


# ---------------------------------------------------------------- docker / worker


def worker_env(name: str = "aiboard-worker") -> dict:
    raw = sh_text(["docker", "inspect", name, "--format", "{{json .Config.Env}}"])
    items = json.loads(raw) if raw else []
    return dict(item.split("=", 1) for item in items if "=" in item)


def worker_state(name: str = "aiboard-worker") -> str:
    return sh_text(["docker", "inspect", name, "--format", "{{.State.Status}}"])


def worker_last_status(name: str = "aiboard-worker") -> dict:
    """Last JSON line the worker printed; {'status': 'idle'} between tickets."""
    raw = sh_text(["docker", "logs", name, "--tail", "80"])
    last = {}
    for line in raw.splitlines():
        line = line.strip()
        if line.startswith("{") and line.endswith("}"):
            try:
                obj = json.loads(line)
            except Exception:
                continue
            if isinstance(obj, dict) and "status" in obj:
                last = obj
    return last


def arm_override(arm: str) -> Path | None:
    """Compose override that sets the arm's env on the worker; None when the base files already do."""
    if arm == "B":
        return None
    path = DATA / "compose" / f"{arm}.json"
    path.parent.mkdir(exist_ok=True)
    body = {"services": {svc: {"environment": arm_env(arm)} for svc, _ in WORKER_PAIRS}}
    path.write_text(json.dumps(body, indent=1), encoding="utf-8")
    return path


BACKEND = os.environ.get("AB_BACKEND", "psql")
BASE_URL = None
CONFIRM_ARM = False


def http_verify_arm(arm: str) -> dict:
    """Remote arm check, never recreates the worker. Reported mismatch always refuses; unreported needs --confirm-arm."""
    from evaluation.pipeline import board_http
    client = board_http.BoardHttp.from_env(BASE_URL)
    client.login()
    worker = client.get_json(board_http.WORKER_PATH) or {}
    flags = worker.get("flags")
    problems, env_lines = board_http.verify_arm(arm, flags)
    if problems and flags is not None:
        print(f"[arm] {arm} NOT active on remote worker:")
        for p in problems:
            print(" -", p)
        print("Set these in the Portainer stack env for ai-board-worker, then Update the stack:")
        for line in env_lines:
            print(" ", line)
        raise SystemExit(2)
    if problems and not CONFIRM_ARM:
        print(f"[arm] {arm}: worker does not report flags over HTTP. Set in Portainer, then rerun with --confirm-arm:")
        for line in env_lines:
            print(" ", line)
        raise SystemExit(2)
    print(f"[arm] {arm} " + ("verified on remote worker" if not problems else "attested by owner (--confirm-arm), not verified"))
    return {"arm": arm, "verified": not problems, "attested": bool(problems), "env": arm_env(arm)}


def ensure_arm(arm: str, force: bool = False, dry_run: bool = False) -> dict:
    flags = arm_env(arm)
    if dry_run:
        print(f"[arm] {arm} (dry-run, worker untouched): {json.dumps(flags)}")
        return {"arm": arm, "dry_run": True, "env": flags}
    if BACKEND == "http":
        return http_verify_arm(arm)
    files = [str(FLAGS_ON)]
    if arm == "A":
        FLAGS_OFF.write_text("services:\n" + "".join(
            f"  {svc}:\n    environment:\n      AI_BOARD_PROGRESS_LOOP: \"0\"\n      AI_BOARD_MODEL_REPAIR: \"0\"\n"
            for svc, _ in WORKER_PAIRS), encoding="utf-8")
        files.append(str(FLAGS_OFF))
    override = arm_override(arm) if arm not in ("A", "B") else None
    current = {name: worker_env(name) for _, name in WORKER_PAIRS}
    same = all(current[name].get(k) == v and worker_state(name) == "running"
               for _, name in WORKER_PAIRS for k, v in flags.items())
    if same and not force:
        print(f"[arm] {arm} already active on {len(WORKER_PAIRS)} worker(s)")
        return {"arm": arm, "recreated": False, "env": {k: current["aiboard-worker"].get(k) for k in flags}}
    cmd = list(COMPOSE) + (["-f", str(FLAGS_OFF)] if arm == "A" else [])
    cmd += (["-f", str(override)] if override else [])
    cmd += ["--profile", "ai-board"] + (["--profile", "multi-worker"] if WORKERS > 1 else [])
    cmd += ["up", "-d", "--no-deps", "--force-recreate"] + [svc for svc, _ in WORKER_PAIRS]
    print("[arm] " + " ".join(cmd))
    p = sh(cmd, cwd=WORKTREE, timeout=600)
    if p.returncode != 0:
        raise SystemExit("compose failed: " + (p.stderr or b"").decode("utf-8", "replace")[:2000])
    deadline = time.time() + 300
    idle = {}
    for _, name in WORKER_PAIRS:
        while time.time() < deadline:
            time.sleep(5)
            if worker_state(name) != "running":
                continue
            idle = worker_last_status(name)
            if idle.get("status") == "idle":
                break
    for _, name in WORKER_PAIRS:
        got = worker_env(name)
        bad = {k: got.get(k) for k, v in flags.items() if got.get(k) != v}
        if bad:
            raise SystemExit(f"arm {arm}: env mismatch on {name} {bad}")
    env = worker_env()
    record = {"arm": arm, "recreated": True, "at": iso(), "env": {k: env.get(k) for k in flags},
              "first_status": idle, "workers": len(WORKER_PAIRS), "worktree_head": sh_text(["git", "rev-parse", "HEAD"], cwd=CODE)}
    append_jsonl(DATA / "arms.jsonl", record)
    print(f"[arm] {arm} ready: {record['env']} last={idle.get('status')}")
    return record


# ---------------------------------------------------------------- DB probes


ROOT_SQL = """
SELECT json_build_object(
  'id', t.id, 'status', t.status, 'phase', t.phase, 'tier', t.tier,
  'plan_hash', t.plan_hash, 'plan_revision', t.plan_revision,
  'lease', t.lease_owner, 'request', t.source_request_id,
  'authorized', (SELECT count(*) FROM ai_authorizations a WHERE a.root_ticket_id=t.id AND a.plan_revision=t.plan_revision),
  'runs', (SELECT count(*) FROM ai_runs r WHERE r.ticket_id=t.id),
  'active', (SELECT count(*) FROM ai_tickets c WHERE c.source_request_id=t.source_request_id AND c.status IN ('queued','claimed','running','planning','repairing')),
  'total_tickets', (SELECT count(*) FROM ai_tickets c WHERE c.source_request_id=t.source_request_id),
  'last_outcome', (SELECT r.outcome FROM ai_runs r WHERE r.ticket_id=t.id ORDER BY r.id DESC LIMIT 1)
)
FROM ai_tickets t WHERE t.id=%d
"""


def root_probe(root_id: int) -> dict:
    return psql_json(BOARD_PG, ROOT_SQL % int(root_id)) or {}


def find_root(request_id: int) -> int | None:
    raw = psql(BOARD_PG, f"SELECT id FROM ai_tickets WHERE source_request_id={int(request_id)} AND parent_id IS NULL")
    return int(raw) if raw.strip() else None


METRICS_SQL = """
SELECT json_build_object(
  'root', (SELECT row_to_json(x) FROM (SELECT id, parent_id, source_request_id, kind, title, status, phase, tier,
             plan_hash, plan_revision, public_note, internal_reason, cumulative_budget, budget_limit, created_at
           FROM ai_tickets WHERE id={root}) x),
  'tickets', (SELECT coalesce(json_agg(row_to_json(y) ORDER BY y.id), '[]') FROM (
      SELECT id, parent_id, kind, status, phase, tier, left(title, 120) AS title
      FROM ai_tickets WHERE source_request_id={req}) y),
  'runs', (SELECT coalesce(json_agg(row_to_json(z) ORDER BY z.id), '[]') FROM (
      SELECT r.id, r.ticket_id, r.attempt, r.trigger, r.outcome, r.gate, r.created_at, r.updated_at,
             r.failure_reason, r.evidence_json
      FROM ai_runs r JOIN ai_tickets t ON t.id=r.ticket_id WHERE t.source_request_id={req}) z),
  'journal', (SELECT coalesce(json_agg(row_to_json(j)), '[]') FROM (
      SELECT j.run_id, j.node, j.outcome FROM ai_attempt_journal j
      JOIN ai_tickets t ON t.id=j.ticket_id WHERE t.source_request_id={req}) j),
  'gpu', (SELECT json_build_object(
      'rows', count(*),
      'gpu_ms', coalesce(sum(({gpu_expr})), 0),
      'wall_ms', coalesce(sum((metrics_json::json->>'wall_ms')::bigint), 0),
      'tokens_in', coalesce(sum((metrics_json::json->>'tokens_in')::bigint), 0),
      'tokens_out', coalesce(sum((metrics_json::json->>'tokens_out')::bigint), 0)
    ) FROM ai_work_reservations WHERE root_ticket_id IN (SELECT id FROM ai_tickets WHERE source_request_id={req} AND parent_id IS NULL)),
  'reservations', (SELECT coalesce(json_agg(row_to_json(q) ORDER BY q.created_at), '[]') FROM (
      SELECT kind, attempt_key, tokens_used, created_at, settled_at,
             coalesce((metrics_json::json->>'gpu_ms')::bigint, (metrics_json::json->>'wall_ms')::bigint) AS gpu_ms,
             (metrics_json::json->>'wall_ms')::bigint AS wall_ms
      FROM ai_work_reservations WHERE root_ticket_id={root}) q),
  'spans', (SELECT coalesce(json_agg(row_to_json(s) ORDER BY s.n), '[]') FROM (
      SELECT name AS n, count(*) AS c FROM ai_spans
      WHERE run_id IN (SELECT r.id FROM ai_runs r JOIN ai_tickets t ON t.id=r.ticket_id WHERE t.source_request_id={req})
      GROUP BY 1) s),
  'gates', (SELECT coalesce(json_agg(row_to_json(g)), '[]') FROM (
      SELECT g.gate, g.status, left(coalesce(g.public_reason,''), 200) AS public_reason, g.created_at
      FROM ai_gate_traces g JOIN ai_runs r ON r.id=g.run_id JOIN ai_tickets t ON t.id=r.ticket_id
      WHERE t.source_request_id={req}) g)
)
"""


def metrics(request_id: int, root_id: int) -> dict:
    data = psql_json(BOARD_PG, METRICS_SQL.format(
        req=int(request_id), root=int(root_id), gpu_expr="coalesce((metrics_json::json->>'gpu_ms')::bigint, (metrics_json::json->>'wall_ms')::bigint)"))
    return data or {}


# ---------------------------------------------------------------- trial


LOOP_STOP_RE = re.compile(r"loop stop ([a-z_]+):")


def analyse(data: dict) -> dict:
    runs = data.get("runs") or []
    verdicts, repairs, stops, windows, strategies, stop_classes = [], 0, [], [], [], []
    for run in runs:
        ev = run.get("evidence_json")
        if not ev:
            continue
        try:
            payload = json.loads(ev)
        except Exception:
            continue
        v = payload.get("verdict") or {}
        if v:
            verdicts.append(v)
            repairs += len(v.get("repairs") or [])
            reason = str(v.get("reason") or "")
            hit = LOOP_STOP_RE.search(reason)
            if hit:
                stops.append(hit.group(1))
            if isinstance(v.get("progress"), dict):
                windows.append(v["progress"])
            if v.get("strategy"):
                strategies.append(v["strategy"])
            if isinstance(v.get("stop_report"), dict):
                stop_classes.append(v["stop_report"].get("class"))
    last = verdicts[-1] if verdicts else {}
    gates = [v.get("gate_reached") for v in verdicts if v.get("gate_reached") is not None]
    journal = data.get("journal") or []
    gpu = data.get("gpu") or {}
    spans = {row["n"]: row["c"] for row in (data.get("spans") or [])}
    reason = str(last.get("reason") or "")
    content_guard = reason.startswith("content_guard") or "content_guard:" in reason
    return {
        "outcome": last.get("outcome"),
        "content_guard": content_guard,
        "gate_reached": max(gates) if gates else None,
        "failure_class": last.get("failure_class"),
        "verdict_reason": reason,
        "loop_stops": stops,
        "loop_stop": stops[-1] if stops else None,
        "stop_report_class": stop_classes[-1] if stop_classes else None,
        "progress_windows": len(windows),
        "progress_reason": (windows[-1].get("reason") if windows and isinstance(windows[-1], dict) else None),
        "strategies": strategies,
        "runs": len(runs),
        "verdict_runs": len(verdicts),
        "repairs": repairs,
        "steps": len(journal),
        "steps_by_node": _count_by(journal, "node"),
        "progress_spans": spans.get("progress.decision", 0),
        "gpu_s": round((gpu.get("gpu_ms") or 0) / 1000.0, 1),
        "model_wall_s": round((gpu.get("wall_ms") or 0) / 1000.0, 1),
        "tokens_in": gpu.get("tokens_in") or 0,
        "tokens_out": gpu.get("tokens_out") or 0,
        "reservations": gpu.get("rows") or 0,
    }


def _count_by(rows: list[dict], key: str) -> dict:
    out: dict[str, int] = {}
    for row in rows:
        out[str(row.get(key))] = out.get(str(row.get(key)), 0) + 1
    return out


UNCLAIMED_S = 120


def lease_summary(timeline: list[dict]) -> dict:
    """Lease/status transitions from probe timeline; worker_unclaimed when queued, no lease, no run for >= UNCLAIMED_S."""
    seen = [r for r in timeline if "status" in r]
    transitions, prev = [], None
    for r in seen:
        key = (r.get("status"), r.get("lease"), r.get("runs"))
        if key != prev:
            transitions.append({"t": r["t"], "status": key[0], "lease": key[1], "runs": key[2]})
            prev = key
    longest, start = 0.0, None
    for r in seen:
        idle = r.get("lease") is None and not r.get("runs") and r.get("status") in ("queued", "claimed")
        if idle and start is None:
            start = r["t"]
        elif not idle:
            start = None
        if start is not None:
            longest = max(longest, r["t"] - start)
    return {"lease_transitions": transitions[:60], "no_lease_s": round(longest, 1),
            "worker_unclaimed": longest >= UNCLAIMED_S}


def unit_breakdown(data: dict) -> dict:
    """G9 per-unit data: reservations by kind, runs and tickets with wall; units = child tickets."""
    by_kind: dict[str, dict] = {}
    for row in data.get("reservations") or []:
        k = by_kind.setdefault(str(row.get("kind")), {"n": 0, "gpu_s": 0.0, "wall_s": 0.0, "tokens": 0})
        k["n"] += 1
        k["gpu_s"] += (row.get("gpu_ms") or 0) / 1000.0
        k["wall_s"] += (row.get("wall_ms") or 0) / 1000.0
        k["tokens"] += row.get("tokens_used") or 0
    for k in by_kind.values():
        k["gpu_s"], k["wall_s"] = round(k["gpu_s"], 1), round(k["wall_s"], 1)
    runs = [{"ticket": r.get("ticket_id"), "attempt": r.get("attempt"), "outcome": r.get("outcome"),
             "gate": r.get("gate"), "wall_s": round(((r.get("updated_at") or 0) - (r.get("created_at") or 0)) / 1000.0, 1)}
            for r in data.get("runs") or []]
    tickets = data.get("tickets") or []
    children = [t for t in tickets if t.get("parent_id")]
    return {"units": len(children), "unit_kinds": _count_by(children, "kind"), "unit_status": _count_by(children, "status"),
            "reservations_by_kind": by_kind, "runs_detail": runs}


def trial_path(arm: str, case_id: str, repeat: int) -> Path:
    return TRIALS / f"{arm}-r{repeat}-{case_id.replace(':', '__')}.json"


def run_trial(arm: str, case_id: str, repeat: int, owner: str, max_wait: int = MAX_WAIT_S, keep: bool = False) -> dict:
    ensure_preflight(arm)
    arm_env(arm)
    case = resolve_cases(case_id)[0]
    path = trial_path(arm, case_id, repeat)
    if path.exists():
        done = json.loads(path.read_text(encoding="utf-8"))
        if done.get("terminal") and done.get("outcome") not in ("create_failed", None):
            print(f"[trial] skip existing {path.name}")
            return done

    ids = owner_ids()
    order = [owner] + [name for name in OWNERS if name != owner]
    attempts: list[dict] = []
    tried_owners: set[str] = set()
    record: dict = {}
    workspace = prepare_workspace(case, arm, repeat)
    for attempt_no in range(2):
        usage = owner_usage()
        try:
            chosen, headroom = pick_owner(order, ids, usage, exclude=tried_owners if attempt_no else set())
        except CapExhausted as exc:
            if attempt_no == 0:
                raise
            print(f"[trial] retry skipped: {exc}")
            break
        if attempt_no and chosen == owner:
            break
        tried_owners.add(chosen)
        owner = chosen
        start_usage = usage.get(ids.get(owner, -1), 0.0)
        record = _run_attempt(arm, case_id, repeat, attempt_no, owner, case, max_wait, start_usage, headroom)
        record["owner_gpu_s_start"] = round(start_usage, 1)
        record["owner_headroom_s"] = round(headroom, 1)
        record["owner_gpu_s_after"] = round(owner_usage().get(ids.get(owner, -1), 0.0), 1)
        record["owner_gpu_s_trial"] = round(record["owner_gpu_s_after"] - start_usage, 1)
        attempts.append({k: record.get(k) for k in ("owner", "request_id", "root_ticket_id", "outcome", "timed_out",
                                                    "owner_gpu_s_start", "owner_gpu_s_trial")})
        if not record.get("timed_out"):
            break
        print(f"[trial] timed out on {owner} (headroom {headroom:.0f}s); retrying once on another owner")
    record["attempts"] = attempts
    record["terminal"] = True
    record["infra_tag"] = infra_tag_for(record)
    try:
        from evaluation.pipeline import driver_capture
        driver_capture.maybe_capture(record, case, path.stem, path.parent,
                                     lambda root: metrics(int(record["request_id"]), root))
    except Exception as exc:
        record["candidate_missing"] = f"capture hook: {type(exc).__name__}: {exc}"[:200]
    if workspace is not None:
        # The board edits its own checkout: the oracle sees the candidate only once its diff is on the seed copy.
        record["candidate_applied"] = apply_candidate(workspace, path.parent / f"{path.stem}.candidate.diff")
        record.update(score_multifile(case, workspace, case_seed(case), record.get("outcome") in GOAL_OUTCOMES))
        output = record.pop("oracle_output")
        record["oracle_evidence"] = write_oracle_evidence(f"{arm}-r{repeat}-{case_id.replace(':', '__')}", record, output)
        record.update(case_tier=case.get("tier"), case_files=case.get("files"), case_split=case.get("split"))
    try:
        from evaluation.pipeline import driver_first_failure
        record.update(driver_first_failure.for_record(record, lambda sql: psql_json(BOARD_PG, sql)))
    except Exception as exc:
        record["first_block_error"] = f"{type(exc).__name__}: {exc}"[:200]
    try:
        from evaluation.pipeline import exploration
        record.update(exploration.for_record(record, lambda sql: psql_json(BOARD_PG, sql),
                                             lambda pin: exploration.git_exists(REPO, pin)))
    except Exception as exc:
        record["exploration_error"] = f"{type(exc).__name__}: {exc}"[:200]
    try:
        from evaluation.pipeline import soft_misses
        record.update(soft_misses.for_record(record, lambda sql: psql_json(BOARD_PG, sql)))
    except Exception as exc:
        record["soft_misses_error"] = f"{type(exc).__name__}: {exc}"[:200]
    path.write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8")
    append_csv(record)
    print(f"[trial]   -> {record.get('outcome')} gate={record.get('gate_reached')} stop={record.get('loop_stop')} "
          f"steps={record.get('steps')} gpu={record.get('gpu_s')}s wall={record.get('trial_wall_s')}s owner={record.get('owner')}")
    return record


def answer_clarification(client, request_id: int, case: dict, rec: dict) -> bool:
    """One clarify pass as the owner; appends Q/A to rec. True when the board resumed and the wait continues."""
    from evaluation.pipeline import clarify_loop
    left = clarify_loop.MAX_ROUNDS - sum(1 for q in rec["questions"] if q["answer"] is not None)
    out = clarify_loop.drive(clarify_loop.HttpBoard(client, request_id), case.get("gaps", []), max(left, 0))
    rec["questions"].extend(out["questions"])
    rec["end"], rec["confirmed"] = out["end"], rec["confirmed"] or out["resumed"]
    print(f"[trial]   clarify: {len(out['questions'])} question(s), end={out['end']}")
    return out["resumed"]


def _run_attempt(arm: str, case_id: str, repeat: int, attempt_no: int, owner: str, case: dict,
                 max_wait: int, start_usage: float, headroom: float) -> dict:
    client = session(owner)
    admin = session(ADMIN)
    idem = f"ab-{arm}-r{repeat}-{case_id}-a{attempt_no}-{now_ms()}"
    payload = {
        "title": case["title"], "detail": case["detail"], "type": "other",
        "execution_mode": "now", "domain": "it",
    }
    t0 = time.time()
    create_headers = {"Idempotency-Key": idem}
    if ANSWER_CLARIFICATIONS:
        create_headers["X-AI-Board-Features"] = "clarify"
    status, body = client.call("POST", "/api/requests", payload, headers=create_headers)
    if status not in (200, 201):
        return {"arm": arm, "case": case_id, "repeat": repeat, "owner": owner, "error": f"create {status}",
                "body": body, "terminal": True, "outcome": "create_failed", "at": iso(), "timed_out": False}
    request_id = int(body.get("request_id") or body.get("id"))
    root_id = body.get("root_ticket_id")
    if not root_id:
        root_id = find_root(request_id)
    root_id = int(root_id)
    print(f"[trial] {arm} r{repeat} {case_id} req={request_id} root={root_id} owner={owner} "
          f"owner_gpu_s={start_usage:.0f} headroom={headroom:.0f}")

    authorised: list[str] = []
    timeline: list[dict] = []
    last_settled = None
    last_state = {}
    timed_out = False
    clarify_rec: dict = {"enabled": ANSWER_CLARIFICATIONS, "questions": [], "end": None, "confirmed": False}
    while True:
        elapsed = time.time() - t0
        if elapsed > max_wait:
            timed_out = True
            break
        time.sleep(8)
        try:
            state = root_probe(root_id)
        except Exception as exc:  # transient psql hiccup: keep waiting
            timeline.append({"t": round(time.time() - t0, 1), "error": str(exc)[:120]})
            continue
        last_state = state
        timeline.append({"t": round(time.time() - t0, 1), "status": state.get("status"), "phase": state.get("phase"),
                         "runs": state.get("runs"), "active": state.get("active"), "lease": state.get("lease")})
        # authorise the plan of a protected root that sits at planned/ticketized
        if (state.get("tier") == "protected" and state.get("plan_hash") and not state.get("authorized")
                and state.get("phase") in ("planned", "ticketized")):
            ok, res = admin.call("POST", f"/api/admin/ai-board/tickets/{root_id}/authorize-plan",
                                 {"plan_hash": state["plan_hash"]})
            authorised.append(f"{state['plan_hash'][:12]}:{ok}")
            print(f"[trial]   authorize-plan {ok} {str(res)[:120]}")
        active = int(state.get("active") or 0)
        status_txt = str(state.get("status") or "")
        phase = str(state.get("phase") or "")
        if is_clarifying(status_txt, phase):
            if not ANSWER_CLARIFICATIONS or not answer_clarification(client, request_id, case, clarify_rec):
                break
            last_settled = None
            continue
        # Root-driven: a root that already returned a verdict, or that sits in a terminal phase, is done even
        # when a plan spawned child tickets that will never be claimed behind it.
        settled = status_txt not in ACTIVE_STATUS and (bool(state.get("last_outcome")) or phase in TERMINAL_PHASES)
        signature = (status_txt, phase, int(state.get("runs") or 0))
        if settled and signature == last_settled:
            break
        last_settled = signature if settled else None
        if active and not settled:
            last_settled = None
    wall = round(time.time() - t0, 1)

    cancelled = None
    if timed_out:
        code, res = client.call("POST", f"/api/requests/{request_id}/cancel", {})
        cancelled = {"status": code, "body": str(res)[:200]}
        time.sleep(3)

    data = metrics(request_id, root_id)
    analysis = analyse(data)
    root = data.get("root") or {}
    phase = str(root.get("phase") or "")
    status = str(root.get("status") or "")
    # A root that ends at gate 1 / 2.5 never submits a verdict: derive the bucket from the phase so the
    # filter pass can classify it instead of recording a blank outcome.
    if not analysis.get("outcome"):
        analysis["outcome"], analysis["outcome_source"] = derive_outcome(analysis, root, timed_out)
    if analysis.get("gate_reached") is None:
        match = re.search(r'"gate":\s*([0-9.]+)', str(root.get("internal_reason") or ""))
        analysis["gate_reached"] = float(match.group(1)) if match else None
    analysis["verdict_reason"] = pick_reason(analysis.get("verdict_reason") or "", root.get("internal_reason"))
    analysis["internal_reason"] = str(root.get("internal_reason") or "")
    analysis.update(lease_summary(timeline))
    analysis["unit_breakdown"] = unit_breakdown(data)
    analysis["claim_latency_s"] = claim_latency_s(root.get("created_at"),
                                                  [r.get("created_at") for r in data.get("runs") or []])
    return {
        "pin": current_pin(),
        "arm": arm, "case": case_id, "repeat": repeat, "owner": owner,
        "request_id": request_id, "root_ticket_id": root_id,
        "level": case.get("level"), "style": case.get("style"), "types": case.get("types"), "file": case.get("file"),
        **({"expect_refusal": True} if case.get("expect_refusal") else {}),
        "terminal": True, "timed_out": timed_out, "cancelled": cancelled,
        "trial_wall_s": wall, "authorised": authorised,
        "status": root.get("status"), "phase": root.get("phase"), "tier": root.get("tier"),
        "tier_at_start": last_state.get("tier"),
        "tickets": data.get("tickets"),
        "kind": case.get("kind"), "clarify": clarify_rec if ANSWER_CLARIFICATIONS else None,
        "started_at": iso(int(t0 * 1000)), "at": iso(),
        **analysis,
        "timeline": timeline[-40:],
    }


CSV_FIELDS = [
    "at", "pin", "arm", "repeat", "case", "level", "style", "owner", "owner_gpu_s_start", "owner_headroom_s",
    "owner_gpu_s_trial", "request_id", "root_ticket_id",
    "status", "phase", "outcome", "content_guard", "gate_reached", "failure_class", "loop_stop", "loop_stops",
    "stop_report_class", "progress_windows", "progress_reason", "progress_spans", "strategies", "runs", "steps", "repairs",
    "gpu_s", "model_wall_s", "tokens_in", "tokens_out", "trial_wall_s", "timed_out", "verdict_reason",
    "internal_reason", "claim_latency_s", "resolved", "mf_outcome", "oracle_rc", "out_of_scope_files",
    "infra_tag", "arm_attested", "arm_unverified", "arm_unverified_reason",
]


WRITE_LOCK = threading.Lock()


def append_csv(record: dict) -> None:
    """Append one row; the CSV is derived data, rebuilt from trials/*.json whenever the schema changes."""
    with WRITE_LOCK:
        _append_csv(record)


def _append_csv(record: dict) -> None:
    from evaluation.pipeline import board_http
    record.update(board_http.arm_attestation(record["arm"], CONFIRM_ARM, record))
    path = DATA / "trials.csv"
    if path.exists():
        with open(path, newline="", encoding="utf-8") as fh:
            header = next(csv.reader(fh), [])
        if header != CSV_FIELDS:
            rebuild_csv()
    new = not path.exists()
    with open(path, "a", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_FIELDS, extrasaction="ignore")
        if new:
            writer.writeheader()
        writer.writerow(csv_row(record))


INFRA_TAGS = (
    ("driver_cancel", ("cancel",)),
    ("endpoint_cooldown", ("cooldown",)),
    ("orphan_reservation", ("orphan",)),
    ("worker_restart", ("restart",)),
    ("clarification_wait", ("needs_clarification",)),
)


def infra_tag_for(record: dict) -> str:
    """Infra tag from outcome/reason text, '' when model-side or unknown."""
    text = " ".join(str(record.get(k) or "") for k in ("outcome", "verdict_reason", "internal_reason", "loop_stop")).lower()
    for tag, needles in INFRA_TAGS:
        if any(n in text for n in needles):
            return tag
    return ""


def csv_row(record: dict) -> dict:
    row = {k: record.get(k) for k in CSV_FIELDS}
    row["infra_tag"] = record.get("infra_tag") or infra_tag_for(record)
    for key in ("loop_stops", "strategies", "out_of_scope_files"):
        row[key] = ";".join(row.get(key) or [])
    row["content_guard"] = record.get("content_guard")
    return row


def rebuild_csv() -> int:
    """Rewrite trials.csv from the per-trial JSON files (the canonical record)."""
    rows = []
    for path in sorted(TRIALS.glob("*.json")):
        try:
            rows.append(json.loads(path.read_text(encoding="utf-8")))
        except Exception:
            continue
    rows.sort(key=lambda r: (str(r.get("at") or ""), str(r.get("arm")), r.get("repeat") or 0, str(r.get("case"))))
    out = DATA / "trials.csv"
    with open(out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_FIELDS, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(csv_row(row))
    return len(rows)


def append_jsonl(path: Path, obj: dict) -> None:
    with WRITE_LOCK, open(path, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(obj, ensure_ascii=False) + "\n")


# ---------------------------------------------------------------- plan / report


def plan_blocks(repeats: int, case_ids: list[str]) -> list[dict]:
    blocks = []
    for repeat in range(1, repeats + 1):
        for arm in ("A", "B"):
            blocks.append({"arm": arm, "repeat": repeat, "cases": case_ids})
    return blocks


def cmd_prepin(_args) -> int:
    """Move every trial measured before the current pin out of trials/ so pins never mix."""
    prepin = DATA / "prepin"
    prepin.mkdir(exist_ok=True)
    moved = []
    for path in sorted(TRIALS.glob("*.json")):
        record = json.loads(path.read_text(encoding="utf-8"))
        record.setdefault("pin", "22f2b5ce")
        record["pin"] = record.get("pin") or "22f2b5ce"
        record["pin_note"] = "measured before the 71d69c88 re-pin; excluded from final numbers"
        (prepin / path.name).write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8")
        path.unlink()
        moved.append(path.name)
    out = DATA / "trials-prepin.csv"
    rows = [json.loads(p.read_text(encoding="utf-8")) for p in sorted(prepin.glob("*.json"))]
    rows.sort(key=lambda r: str(r.get("at") or ""))
    with open(out, "w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_FIELDS, extrasaction="ignore")
        writer.writeheader()
        for row in rows:
            writer.writerow(csv_row(row))
    rebuild_csv()
    print(f"moved {len(moved)} pre-pin trials to prepin/ and wrote {out.name}")
    return 0


def cmd_smoke(args) -> int:
    """One case, both arms, same pin: the minimum proof that the two flags change anything."""
    out = {}
    for arm in ("A", "B"):
        ensure_arm(arm)
        ids, usage = owner_ids(), owner_usage()
        owner, headroom = pick_owner(OWNERS, ids, usage)
        print(f"[smoke] {arm}: owner {owner} (headroom {headroom:.0f}s)")
        out[arm] = run_trial(arm, args.case, args.repeat, owner, max_wait=args.max_wait)
    keys = ("pin", "arm", "case", "outcome", "gate_reached", "failure_class", "loop_stop", "loop_stops",
            "progress_windows", "progress_reason", "progress_spans", "strategies", "runs", "steps", "repairs",
            "gpu_s", "tokens_in", "tokens_out", "trial_wall_s", "status", "phase", "verdict_reason")
    print("\n## smoke")
    print("| field | A | B |")
    print("|---|---|---|")
    for key in keys:
        a, b = out["A"].get(key), out["B"].get(key)
        mark = "" if a == b else " **≠**"
        print(f"| {key} | {a} | {b}{mark} |")
    separated = (out["B"].get("progress_windows") or 0) > 0 or bool(out["B"].get("loop_stop")) or (out["B"].get("progress_spans") or 0) > 0
    print(f"\narms separable: {separated} "
          f"(B progress_windows={out['B'].get('progress_windows')}, progress_spans={out['B'].get('progress_spans')}, "
          f"loop_stop={out['B'].get('loop_stop')}; A progress_windows={out['A'].get('progress_windows')}, "
          f"progress_spans={out['A'].get('progress_spans')})")
    (DATA / "smoke.json").write_text(json.dumps({"at": iso(), "case": args.case, "repeat": args.repeat,
                                                 "separated": separated, "arms": out}, ensure_ascii=False, indent=1),
                                     encoding="utf-8")
    return 0 if separated else 3


def cmd_filter(args) -> int:
    """Arm A once over every dev case: which cases are measurable at all, and what they cost."""
    ensure_arm("A")
    ids, _ = owner_ids(), None
    cases = resolve_cases(args.cases) if args.cases else load_cases()
    for index, case in enumerate(cases):
        path = trial_path("A", case["id"], args.repeat)
        if path.exists() and not args.force:
            print(f"[filter] skip {case['id']}")
            continue
        try:
            usage = owner_usage()
            start = index % len(OWNERS)
            owner, headroom = pick_owner(OWNERS[start:] + OWNERS[:start], ids, usage)
            run_trial("A", case["id"], args.repeat, owner, max_wait=args.max_wait)
        except CapExhausted as exc:
            print(f"[filter] CAP EXHAUSTED after {index} cases: {exc}")
            return 2
        except Exception as exc:
            print(f"[filter] ERROR {case['id']}: {exc}")
            append_jsonl(DATA / "errors.jsonl", {"at": iso(), "case": case["id"], "error": str(exc)[:400]})
    print("[filter] done")
    return 0


BUCKET_RULES = [
    ("content_guard", lambda t: bool(t.get("content_guard"))),
    ("policy_other", lambda t: any(k in str(t.get("verdict_reason") or "") for k in
                                   ("personal_form", "money_scope", "boundary", "policy:"))),
    ("infra", lambda t: t.get("timed_out") or any(k in str(t.get("verdict_reason") or "").lower() for k in
                                                  ("bad gateway", "timeout", "502", "503", "connection"))),
    ("no_oracle", lambda t: "no trusted behavioral oracle" in str(t.get("verdict_reason") or "").lower()),
    ("plan_gate", lambda t: (t.get("gate_reached") or 0) < 3 or str(t.get("phase") or "") in
                            ("precheck_blocked", "plan_unfit", "needs_replan")),
    ("goal", lambda t: t.get("outcome") in GOAL_OUTCOMES),
    ("repairable", lambda t: (t.get("gate_reached") or 0) >= 3 and t.get("outcome") == "blocked"),
]


def classify(trial: dict) -> str:
    for name, rule in BUCKET_RULES:
        try:
            if rule(trial):
                return name
        except Exception:
            continue
    return "other"


def dev_trials(trials: list[dict], dev_ids: set[str]) -> list[dict]:
    """Trials of the DEV case set only; history/smoke records carry case_tier and are excluded."""
    return [t for t in trials if t.get("case") in dev_ids and not t.get("case_tier") and not t.get("case_split")]


def run_pin(trials: list[dict]) -> str:
    """Pin recorded on the trials themselves; 'mixed:' prefix when more than one."""
    pins = sorted({str(t["pin"]) for t in trials if t.get("pin")})
    if not pins:
        return "unknown"
    return pins[0] if len(pins) == 1 else "mixed:" + ",".join(pins)


def cmd_measurable(args) -> int:
    dev_ids = {c["id"] for c in load_cases()}
    trials = [t for t in dev_trials(load_trials(), dev_ids) if t.get("arm") == "A" and t.get("repeat") == args.repeat]
    trials.sort(key=lambda t: (t.get("gate_reached") or 0, str(t.get("case"))), reverse=True)
    lines = []
    add = lines.append
    add(f"# Measurable population — arm A, one pass, pin {run_pin(trials)}")
    add("")
    add(f"generated {iso()} · {len(trials)}/{len(dev_ids)} cases run")
    add("")
    add("| case | level | gate | outcome | bucket | steps | gpu s | wall s | owner | reason |")
    add("|---|---|---|---|---|---|---|---|---|---|")
    for t in trials:
        reason = str(t.get("verdict_reason") or "").replace("|", "/")[:70]
        add(f"| {t['case']} | {t.get('level')} | {t.get('gate_reached')} | {t.get('outcome')} | {classify(t)} | "
            f"{t.get('steps')} | {t.get('gpu_s')} | {t.get('trial_wall_s')} | {t.get('owner')} | {reason} |")
    add("")
    groups: dict[str, list[dict]] = {}
    for t in trials:
        groups.setdefault(classify(t), []).append(t)
    add("## buckets")
    add("")
    add("| bucket | n | cases |")
    add("|---|---|---|")
    for bucket in ("goal", "repairable", "no_oracle", "plan_gate", "content_guard", "policy_other", "infra", "other"):
        group = groups.get(bucket) or []
        if not group:
            continue
        add(f"| {bucket} | {len(group)} | {', '.join(sorted(t['case'] for t in group))} |")
    add("")
    measurable = [t for t in trials if classify(t) in ("goal", "repairable")]
    blocked_outside = [t for t in trials if classify(t) in ("content_guard", "policy_other", "plan_gate", "no_oracle")]
    add(f"- reaches gate 3+ and ends in a repairable failure or a goal: **{len(measurable)}**")
    add(f"- blocked for reasons unrelated to the loop (content_guard / policy / plan gate / no oracle): **{len(blocked_outside)}**")
    stagnant = [t for t in trials if is_stagnant(t)]
    add(f"- already records a stagnant stop with the flags off: **{len(stagnant)}** "
        f"({', '.join(sorted(t['case'] for t in stagnant)) or 'none'})")
    add("")
    add("Detecting a halving of the stagnant-stop rate needs roughly 10+ stagnant stops per arm "
        "(a 10-vs-5 difference is at the edge of significance; 20-vs-10 is comfortable). "
        f"This pass produced {len(stagnant)} in one arm-A pass.")
    text = "\n".join(lines) + "\n"
    (DATA / "measurable.md").write_text(text, encoding="utf-8")
    print(text)
    return 0


def cmd_csv(_args) -> int:
    print(f"trials.csv rebuilt from {rebuild_csv()} trial files")
    return 0


def cmd_status(_args) -> int:
    cases = load_cases()
    rows = []
    for repeat in (1, 2, 3):
        for arm in ("A", "B"):
            done = sum(1 for c in cases if trial_path(arm, c["id"], repeat).exists())
            rows.append(f"{arm}{repeat}: {done}/{len(cases)}")
    print("  ".join(rows))
    return 0


def load_trials() -> list[dict]:
    out = []
    for path in sorted(TRIALS.glob("*.json")):
        try:
            out.append(json.loads(path.read_text(encoding="utf-8")))
        except Exception:
            continue
    return out


def cmd_report(args) -> int:
    all_trials = [t for t in load_trials() if t.get("outcome") and not t.get("error") and t.get("repeat") != 99]
    scored = [t for t in all_trials if not t.get("content_guard") and not t.get("timed_out")]
    lines = []
    add = lines.append
    add(f"# A/B report — generated {iso()}")
    add("")
    if not all_trials:
        add("no trials yet")
        (DATA / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
        print("\n".join(lines))
        return 0
    guard = [t for t in all_trials if t.get("content_guard")]
    timing = [t for t in all_trials if t.get("timed_out")]
    add(f"trials: {len(all_trials)} — scored {len(scored)}, content_guard {len(guard)}, timed out {len(timing)}")
    add("")
    if guard:
        share = len({t["case"] for t in guard})
        add(f"content_guard blocked {len(guard)} trials over {share} distinct cases "
            f"({share}/{len(load_cases())} of the dev corpus). A case blocked the same way in both arms "
            f"contributes nothing to the delta and is excluded from the goal-rate/stagnation comparison.")
        add("")
        add("| arm | content_guard cases |")
        add("|---|---|")
        for arm in ("A", "B"):
            cases = sorted({t["case"] for t in guard if t["arm"] == arm})
            add(f"| {arm} | {', '.join(cases)} |")
        add("")
    add("| arm | n | goal rate | stagnant | mean steps | mean runs | mean wall s | mean gpu s | mean tokens |")
    add("|---|---|---|---|---|---|---|---|---|")
    for arm in ("A", "B"):
        group = [t for t in scored if t["arm"] == arm]
        if not group:
            continue
        n = len(group)
        goal = sum(1 for t in group if t.get("outcome") in GOAL_OUTCOMES) / n
        stagnant = sum(1 for t in group if is_stagnant(t))
        steps = sum(t.get("steps") or 0 for t in group) / n
        runs = sum(t.get("runs") or 0 for t in group) / n
        wall = sum(t.get("trial_wall_s") or 0 for t in group) / n
        gpu = sum(t.get("gpu_s") or 0 for t in group) / n
        toks = sum((t.get("tokens_in") or 0) + (t.get("tokens_out") or 0) for t in group) / n
        add(f"| {arm} | {n} | {goal:.0%} | {stagnant} | {steps:.1f} | {runs:.1f} | {wall:.0f} | {gpu:.0f} | {toks:.0f} |")
    add("")
    add("## by level (difficulty 1-5 in the corpus)")
    add("")
    add("| level | arm | n | goal rate | stagnant | mean steps |")
    add("|---|---|---|---|---|---|")
    for level in sorted({t.get("level") for t in scored if t.get("level")}):
        for arm in ("A", "B"):
            group = [t for t in scored if t["arm"] == arm and t.get("level") == level]
            if not group:
                continue
            n = len(group)
            goal = sum(1 for t in group if t.get("outcome") in GOAL_OUTCOMES) / n
            stagnant = sum(1 for t in group if is_stagnant(t))
            steps = sum(t.get("steps") or 0 for t in group) / n
            add(f"| {level} | {arm} | {n} | {goal:.0%} | {stagnant} | {steps:.1f} |")
    add("")
    add("## outcomes per arm (all trials)")
    add("")
    for arm in ("A", "B"):
        group = [t for t in all_trials if t["arm"] == arm]
        counts = _count_by(group, "outcome")
        stops = _count_by([t for t in group if t.get("loop_stop")], "loop_stop")
        add(f"- {arm}: outcomes {counts}; loop stops {stops}")
    text = "\n".join(lines) + "\n"
    (DATA / "report.md").write_text(text, encoding="utf-8")
    print(text)
    return 0


STAGNANT_STOPS = {"no_progress", "similarity", "state_repeat", "stagnation", "stuck"}


def is_stagnant(trial: dict) -> bool:
    return trial.get("loop_stop") in STAGNANT_STOPS


# ---------------------------------------------------------------- freeze / users / cases


def cmd_cases(_args) -> int:
    corpus = REPO / ".scratch" / "ai-board-eval" / "corpus" / "full-s20261003" / "cases.json"
    if not corpus.exists():
        raise SystemExit(f"corpus missing: {corpus}")
    all_cases = json.loads(corpus.read_text(encoding="utf-8"))
    dev = [c for c in all_cases if c.get("split") == "dev"]
    keep = [{k: c.get(k) for k in ("id", "key", "title", "detail", "verify", "level", "style", "types", "file", "page_bytes")}
            for c in dev]
    (DATA / "cases-dev.json").write_text(json.dumps(keep, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"cases-dev.json: {len(keep)} dev cases from {corpus}")
    return 0


def cmd_first_failure(args) -> int:
    """Recompute first_block/mode on stored trials from board DB; --backfill writes, else dry. Compare with modes-all.csv."""
    import csv
    from evaluation.pipeline import driver_first_failure as ff
    expected = {}
    csv_path = DATA.parent / "ai-board-error-analysis" / "modes-all.csv"
    if csv_path.exists():
        expected = {r["trial"]: r["mode"] for r in csv.DictReader(csv_path.open(encoding="utf-8-sig"))}
    done = same = 0
    diffs = []
    for path in sorted(TRIALS.glob("*.json")):
        record = json.loads(path.read_text(encoding="utf-8"))
        if not record.get("request_id"):
            continue
        events = ff.fetch(record["request_id"], lambda sql: psql_json(BOARD_PG, sql))
        fields = ff.compute(events)
        done += 1
        if path.stem in expected:
            if fields["mode"] == expected[path.stem]:
                same += 1
            else:
                reason = (fields["first_block"] or {}).get("reason", "")[:120]
                diffs.append((path.stem, expected[path.stem], fields["mode"], reason))
        if args.backfill and events:
            record.pop("first_block_error", None)
            record.update(fields)
            path.write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"[first-failure] recomputed {done} trials; {same}/{len(expected)} modes match modes-all.csv; {len(diffs)} differ")
    for row in diffs:
        print("  DIFF", " | ".join(row))
    return 0


def cmd_freeze(_args) -> int:
    prepin_rows = []
    for path in sorted((DATA / "prepin").glob("*.json")) if (DATA / "prepin").exists() else []:
        try:
            record = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        prepin_rows.append({"trial": path.name, "request_id": record.get("request_id"),
                            "root_ticket_id": record.get("root_ticket_id"), "pin": record.get("pin"),
                            "outcome": record.get("outcome")})
    manifest = {
        "created_at": iso(),
        "repo": str(REPO),
        "repo_head": sh_text(["git", "rev-parse", "HEAD"], cwd=REPO),
        "repo_branch": sh_text(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=REPO),
        "worktree": str(CODE),
        "compose_dir": str(WORKTREE),
        "worktree_head": sh_text(["git", "rev-parse", "HEAD"], cwd=CODE),
        "worktree_head_short": sh_text(["git", "rev-parse", "--short=8", "HEAD"], cwd=CODE),
        "worktree_dirty": bool(sh_text(["git", "status", "--porcelain"], cwd=CODE)),
        "driver_sha256": sha256_file(Path(__file__)),
        "multifile_corpus_manifest_sha256": json.loads((MFC_ROOT / "split.json").read_text(encoding="utf-8"))["manifest_sha256"],
        "contract_sha256": sha256_file(CODE / "server" / "ai-board" / "contract.json"),
        "harness_contract_sha256": sha256_file(CODE / "ai-board" / "harness" / "contract.json") if (CODE / "ai-board" / "harness" / "contract.json").exists() else None,
        "worker_sha256": sha256_file(CODE / "ai-board" / "worker.py"),
        "worker_image_id": sh_text(["docker", "inspect", "tizia-ai-board-worker:dev", "--format", "{{.Id}}"]),
        "cases_sha256": case_list_hash(),
        "cases_count": len(load_cases()),
        "cases_source": str(REPO / ".scratch" / "ai-board-eval" / "corpus" / "full-s20261003" / "cases.json"),
        "compose_files": COMPOSE,
        "arms": ARMS,
        "arm_table": arm_table(),
        "new_flags": list(NEW_FLAGS),
        "owners": OWNERS,
        "gpu_caps": {"folder_less_requests": GPU_CAP_FOLDERLESS, "folder_requests": GPU_CAP_FOLDER, "worker_per_hour": 2700},
        "flags_on_file": str(FLAGS_ON),
        "flags_off_file": str(FLAGS_OFF),
        "worker_image": sh_text(["docker", "inspect", "aiboard-worker", "--format", "{{.Config.Image}}"]) if worker_state() else None,
        "stack": {name: sh_text(["docker", "inspect", name, "--format", "{{.State.Status}}"]) for name in
                  ("aiboard-server", "aiboard-postgres", "aiboard-sandbox-runner", "tizia-dev", "tizia-postgres")},
        "superseded_pin": {
            "worktree_head": "22f2b5ceae2ec2684ee434524200ff2f94b22b3d",
            "why": "smoke attempts before the re-pin; requests 35/36/37/39/41/42/43/44/45 plus 40/46/47 were measured there",
            "handling": "moved to .scratch/ab-driver/prepin/ and trials-prepin.csv; excluded from final numbers",
            "trials": prepin_rows,
        },
    }
    (DATA / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps({k: manifest[k] for k in ("created_at", "worktree_head_short", "contract_sha256", "worker_sha256",
                                               "cases_sha256", "cases_count", "worker_image_id", "stack")},
                     ensure_ascii=False, indent=1))
    return 0


def cmd_users(_args) -> int:
    created = []
    password = owner_password()
    for username, display in EXTRA_OWNERS:
        status, body = _anon_call("POST", "/api/auth/register",
                                 {"username": username, "password": password, "displayName": display, "age": 20, "role": "student"})
        if status == 200 and isinstance(body, dict) and body.get("user"):
            uid = body["user"]["id"]
            created.append({"username": username, "id": uid})
            print(f"[users] registered {username} id={uid}")
        elif status == 409:
            raw = psql(WEB_PG, f"SELECT id FROM users WHERE username='{username}'")
            created.append({"username": username, "id": int(raw) if raw else None, "existing": True})
            print(f"[users] exists {username} id={created[-1]['id']}")
        else:
            print(f"[users] register {username} -> {status} {body}")
    for entry in created:
        uid = entry.get("id")
        if not uid:
            continue
        psql(WEB_PG, f"UPDATE users SET enrolled_domain='it' WHERE id={int(uid)} AND (enrolled_domain IS NULL OR enrolled_domain='')")
        psql(BOARD_PG, "INSERT INTO users(id, username, display_name, password_hash, role, enrolled_domain, created_at) "
                       f"VALUES ({int(uid)}, '{entry['username']}', '{entry['username']}', '', 'student', 'it', {now_ms()}) "
                       "ON CONFLICT (id) DO NOTHING")
    (DATA / "users.json").write_text(json.dumps(created, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(created, ensure_ascii=False))
    return 0


def _anon_call(method: str, path: str, body=None) -> tuple[int, dict]:
    s = Session("anon")
    return s.call(method, path, body)


def cmd_arm(args) -> int:
    ensure_arm(args.arm, force=args.force, dry_run=args.dry_run)
    return 0


def cmd_trial(args) -> int:
    cases = resolve_cases(args.cases or args.case)
    clean_refs = None if args.keep_seeds else {c["id"] for c in cases}
    print(f"[trial] est GPU ~{len(cases) * EXPECTED_TRIAL_GPU_S}s for {len(cases)} trials (arm {args.arm}, repeat {args.repeat})")
    if args.dry_run:
        print(f"[trial] arm {args.arm} env: {json.dumps(arm_env(args.arm))}")
        print(f"[trial] cases: {', '.join(c['id'] for c in cases)} (dry-run, nothing run)")
        return 0
    if args.probe_manifest and (len(cases) != 1 or not uses_tool_loop(args.arm)):
        raise SystemExit("--probe-manifest: đúng một case, arm dùng tool loop")
    ensure_arm(args.arm)
    todo = []
    for case in cases:
        if trial_path(args.arm, case["id"], args.repeat).exists() and not args.force:
            print(f"[trial] skip existing {args.arm} {case['id']} r{args.repeat} (use --force to re-run)")
            continue
        todo.append(case)
    parallel = max(1, min(getattr(args, "parallel", 1), WORKERS))
    busy: set[str] = set()
    lock = threading.Lock()

    def one(case: dict) -> None:
        owner = args.owner or (ADMIN if case_role(case["id"]) == "admin" and not case.get("expect_refusal") else None)
        with lock:
            if not owner:
                ids, usage = owner_ids(), owner_usage()
                # parallel trials take distinct owners: one requester's requests may queue behind each other
                students = [name for name in OWNERS if name != ADMIN]
                owner, headroom = pick_owner(students, ids, usage, exclude=busy if parallel > 1 else None)
                print(f"[trial] picked owner {owner} (headroom {headroom:.0f}s)")
            busy.add(owner)
        try:
            record = run_trial(args.arm, case["id"], args.repeat, owner, max_wait=args.max_wait)
        finally:
            with lock:
                busy.discard(owner)
        print(json.dumps({k: record.get(k) for k in ("arm", "case", "repeat", "owner", "outcome", "gate_reached",
                                                     "loop_stop", "steps", "timed_out", "resolved", "mf_outcome")}))

    if parallel == 1:
        for case in todo:
            one(case)
    else:
        from concurrent.futures import ThreadPoolExecutor
        ensure_preflight(args.arm)
        print(f"[trial] {len(todo)} trials, {parallel} at a time on {WORKERS} workers")
        with ThreadPoolExecutor(parallel) as pool:
            list(pool.map(one, todo))
    if clean_refs is not None:
        clean_seeds(plan_case_ids() | clean_refs, dry_run=False)
    return 0


def cmd_tier_report(_args) -> int:
    text = hc.tier_report(load_trials())
    (DATA / "tier-report.md").write_text(text, encoding="utf-8")
    print(text)
    return 0


def cmd_exploration(args) -> int:
    from evaluation.pipeline import exploration
    vague = exploration.vague_case_ids(VAGUE_CASES) if VAGUE_CASES.exists() else set()
    rows = []
    for path in sorted(TRIALS.glob("*.json")):
        trial = json.loads(path.read_text(encoding="utf-8"))
        if args.backfill:
            trial.update(exploration.for_record(trial, lambda sql: psql_json(BOARD_PG, sql),
                                                lambda pin: exploration.git_exists(REPO, pin)))
            path.write_text(json.dumps(trial, ensure_ascii=False, indent=1), encoding="utf-8")
        if trial.get("first_hit") is None and trial.get("named_missing_file") is None and trial.get("planning_reads") is None:
            continue
        rows.append({"arm": trial.get("arm"), "kind": exploration.case_kind(trial.get("case", ""), vague),
                     **{k: trial.get(k) for k in ("first_hit", "named_missing_file", "planning_reads")}})
    text = exploration.report(rows, tool_loop=uses_tool_loop)
    (DATA / "exploration-report.md").write_text(text, encoding="utf-8")
    print(text)
    return 0


def cmd_plan(args) -> int:
    cases = [c["id"] for c in (resolve_cases(args.cases) if args.cases else load_cases())]
    if args.limit:
        cases = cases[:args.limit]
    blocks = plan_blocks(args.repeats, cases)
    (DATA / "plan.json").write_text(json.dumps({"blocks": blocks, "created_at": iso()}, indent=1), encoding="utf-8")
    print(f"{len(blocks)} blocks x {len(cases)} cases = {len(blocks) * len(cases)} trials")
    return 0


def plan_case_ids() -> set[str]:
    path = DATA / "plan.json"
    if not path.exists():
        return set()
    return {c for b in json.loads(path.read_text(encoding="utf-8"))["blocks"] for c in b["cases"]}


def clean_seeds(referenced: set[str], dry_run: bool = True) -> dict:
    report = hc.seeds_clean(hc.ROOT, referenced, dry_run=dry_run)
    print(hc.format_seed_report(report))
    return report


def cmd_seeds_clean(args) -> int:
    refs = plan_case_ids() | set(args.keep)
    clean_seeds(refs, dry_run=args.dry_run)
    return 0


WORKER_MANIFEST_VERSION = int(os.environ.get("AB_WORKER_MANIFEST_VERSION", "5"))
# FROM of rebuild-guest.sh (guest-postgres-plan.md); AB_GUEST_BASE overrides.
GUEST_BASE = os.environ.get("AB_GUEST_BASE", "localhost:5000/gate5@sha256:6e901d11c03ecf50fc6c875531b055d05c0c80c4226662b82e436b12df567ee3")
# hsm/contract.json is the handshake file (server imports hsm/contract.js); root contract.json checked too.
CONTRACT_PAIRS = [
    ("/app/server/ai-board/hsm/contract.json", "/opt/ai-board/server/ai-board/hsm/contract.json"),
    ("/app/server/ai-board/contract.json", "/opt/ai-board/server/ai-board/contract.json"),
]
PINNED_FILES = ["server/ai-board/repositories/tool-manifests.js", "server/ai-board/hsm/contract.js"]


class PreflightRed(RuntimeError):
    """Preflight failed; trial must not start."""
ACCEPTANCE_PROBES = {
    "curl": "curl -sS --version >/dev/null",
    "node --test": "printf \"import test from 'node:test';test('p',()=>{});\" > /tmp/p.mjs && node --test /tmp/p.mjs >/dev/null",
}


def _docker(cmd: list[str], timeout: int = 120) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, timeout=timeout, env={**os.environ, "MSYS_NO_PATHCONV": "1"})


def _guarded(name: str, fn) -> dict:
    try:
        return fn()
    except Exception as exc:
        return {"name": name, "ok": False, "detail": f"error: {str(exc)[:300]}"}


def _container_sha(container: str, path: str) -> str:
    p = _docker(["docker", "exec", container, "sha256sum", path])
    if p.returncode:
        return f"missing({(p.stderr or b'').decode('utf-8', 'replace').strip()[:120]})"
    return p.stdout.decode("utf-8", "replace").split()[0]


def check_contract() -> dict:
    parts, ok = [], True
    for server_path, worker_path in CONTRACT_PAIRS:
        server = _container_sha("aiboard-server", server_path)
        worker = _container_sha("aiboard-worker", worker_path)
        match = server == worker and not server.startswith("missing")
        ok = ok and match
        parts.append(f"{server_path.rsplit('/ai-board/', 1)[1]}: server={server[:12]} worker={worker[:12]}")
    return {"name": "contract_sha", "ok": ok, "detail": "; ".join(parts)}


def check_worker_env(arm: str) -> dict:
    """Every running worker's AI_BOARD_* env must equal the arm profile; unset equals '' for flags pinned to ''."""
    results = [_worker_env_one(arm, name) for _, name in WORKER_PAIRS]
    if len(results) == 1:
        return results[0]
    return {"name": "worker_env", "ok": all(r["ok"] for r in results), "detail": " | ".join(r["detail"] for r in results),
            "profile": results[0].get("profile"), "container": results[0].get("container")}


def _worker_env_one(arm: str, name: str) -> dict:
    expected = arm_env(arm)
    p = _docker(["docker", "exec", name, "env"])
    if p.returncode:
        return {"name": "worker_env", "ok": False, "detail": f"{name}: docker exec env failed"}
    actual = {}
    for line in p.stdout.decode("utf-8", "replace").splitlines():
        key, sep, value = line.partition("=")
        if sep and key.startswith("AI_BOARD_"):
            actual[key] = value
    mismatch = {k: (v, actual.get(k, "<unset>")) for k, v in expected.items()
                if actual.get(k, "" if v == "" else "<unset>") != v}
    detail = f"{name} arm {arm}: {len(expected)} keys checked" + (f"; lệch (expected, actual): {mismatch}" if mismatch else "")
    return {"name": "worker_env", "ok": not mismatch, "detail": detail, "profile": expected,
            "container": {k: actual.get(k, "<unset>") for k in expected}}


def check_manifest_approved(arm: str, probe: bool = False) -> dict:
    """Tool manifest must be approved, only for arms with TOOL_LOOP=1; worker POSTs it only when the loop runs."""
    if not uses_tool_loop(arm):
        return {"name": "manifest_approved", "ok": True, "detail": f"skipped: arm {arm} không dùng tool loop"}
    rows = psql_json(BOARD_PG, "SELECT json_agg(t) FROM (SELECT manifest_hash, version, status FROM ai_tool_manifests "
                               f"WHERE version={WORKER_MANIFEST_VERSION}) t") or []
    if not rows:
        if probe:
            return {"name": "manifest_approved", "ok": True,
                    "detail": f"không có row v{WORKER_MANIFEST_VERSION}; --probe-manifest cho 1 trial thăm dò B1 sinh row pending"}
        return {"name": "manifest_approved", "ok": False,
                "detail": f"không có row v{WORKER_MANIFEST_VERSION}: chạy một trial thăm dò B1 để worker POST manifest (--probe-manifest)"}
    statuses = {r["status"] for r in rows}
    desc = [(r["manifest_hash"][:12], r["status"]) for r in rows]
    if "approved" in statuses:
        return {"name": "manifest_approved", "ok": True, "detail": f"v{WORKER_MANIFEST_VERSION} approved {desc}"}
    if "pending" in statuses:
        hashes = [r["manifest_hash"] for r in rows if r["status"] == "pending"]
        return {"name": "manifest_approved", "ok": False,
                "detail": f"pending hash={hashes}: chờ owner approve"}
    return {"name": "manifest_approved", "ok": False, "detail": f"v{WORKER_MANIFEST_VERSION} rows {desc}, không approved"}


def uses_tool_loop(arm: str) -> bool:
    return arm_env(arm).get("AI_BOARD_TOOL_LOOP") == "1"


def check_pin(manifest: dict) -> dict:
    """Running server files must equal the frozen pin commit's files; frozen pin vs HEAD is reported only."""
    pin = manifest.get("worktree_head")
    if not pin:
        return {"name": "pin", "ok": False, "detail": "manifest.json has no worktree_head; run freeze"}
    diffs, same = [], []
    for rel in PINNED_FILES:
        git = _docker(["git", "-C", str(REPO), "show", f"{pin}:{rel}"])
        want = hashlib.sha256(git.stdout.replace(b"\r", b"")).hexdigest() if git.returncode == 0 else "git-missing"
        have = _docker(["docker", "exec", "aiboard-server", "sh", "-c", f"tr -d '\\r' < /app/{rel} | sha256sum"]).stdout.decode("utf-8", "replace").split()[0]
        (same if want == have else diffs).append(f"{rel.rsplit('/', 1)[1]}")
    images = {_docker(["docker", "inspect", name, "--format", "{{.Image}}"]).stdout.decode("utf-8", "replace").strip()
              for _, name in WORKER_PAIRS}
    image = images.pop() if len(images) == 1 else "workers-differ"
    head = current_pin()
    ok = not diffs and image == manifest.get("worker_image_id")
    return {"name": "pin", "ok": ok,
            "detail": f"pin={pin[:8]} running_match={same} mismatch={diffs} image_match={image == manifest.get('worker_image_id')} "
                      f"(HEAD={head}, info only)"}


def check_driver_pin(manifest: dict) -> dict:
    """driver.py must hash to the value frozen in manifest.json; edits need a re-freeze before a trial."""
    want, have = manifest.get("driver_sha256"), sha256_file(Path(__file__))
    return {"name": "driver_pin", "ok": want == have,
            "detail": f"driver.py={have[:12]} frozen={(want or 'missing')[:12]}"}


def check_guest_probes() -> dict:
    results = {}
    for kind, cmd in ACCEPTANCE_PROBES.items():
        p = _docker(["docker", "run", "--rm", "--pull", "never", "--entrypoint", "sh", GUEST_BASE, "-c", cmd], timeout=180)
        results[kind] = p.returncode == 0
    return {"name": "guest_probes", "ok": all(results.values()), "detail": f"base={GUEST_BASE} {results}"}


ROUTING_IN_WORKER = "/opt/ai-board/server/ai-board/model-routing.json"


def check_routing_mount() -> dict:
    """Every worker reads the bind-mounted model routing file; a stale Docker Desktop file share gives EIO."""
    bad = []
    for _, name in WORKER_PAIRS:
        p = _docker(["docker", "exec", name, "head", "-c", "1", ROUTING_IN_WORKER])
        if p.returncode:
            bad.append(f"{name}: {p.stderr.decode('utf-8', 'replace').strip()[:120]}")
    return {"name": "routing_mount", "ok": not bad, "detail": "; ".join(bad) or "readable"}


def run_preflight(write: bool, arm: str = "B0", probe: bool = False) -> dict:
    """Four pre-trial checks for one arm; write=True stores result in manifest.json under 'preflight'."""
    manifest_path = DATA / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    checks = [
        _guarded("contract_sha", check_contract),
        _guarded("manifest_approved", lambda: check_manifest_approved(arm, probe)),
        _guarded("pin", lambda: check_pin(manifest)),
        _guarded("driver_pin", lambda: check_driver_pin(manifest)),
        _guarded("guest_probes", check_guest_probes),
        _guarded("worker_env", lambda: check_worker_env(arm)),
        _guarded("routing_mount", check_routing_mount),
    ]
    passed = all(c["ok"] for c in checks)
    print(f"[preflight] arm {arm}" + (" (--probe-manifest)" if probe else ""))
    for c in checks:
        print(f"[preflight] {'OK ' if c['ok'] else 'RED'} {c['name']}: {c['detail']}")
    result = {"at": iso(), "dry_run": not write, "arm": arm, "probe_manifest": probe, "pass": passed, "checks": checks}
    if write:
        manifest["preflight"] = result
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"[preflight] {'PASS' if passed else 'FAIL — trial bị chặn, không tự sửa môi trường'}")
    return result


PROBE_MANIFEST = False
_PREFLIGHT_OK: set[str] = set()


def ensure_preflight(arm: str = "B0") -> None:
    """Run preflight once per arm per process; every trial path calls this before any GPU work."""
    global PROBE_MANIFEST
    if arm in _PREFLIGHT_OK:
        return
    probe = PROBE_MANIFEST and uses_tool_loop(arm)
    if not run_preflight(write=True, arm=arm, probe=probe)["pass"]:
        raise PreflightRed(f"preflight red for arm {arm}, trial blocked; see manifest.json 'preflight'")
    if probe:
        PROBE_MANIFEST = False
    _PREFLIGHT_OK.add(arm)


def cmd_preflight(args) -> int:
    return 0 if run_preflight(write=not args.dry_run, arm=args.arm, probe=args.probe_manifest)["pass"] else 3


def cmd_run(args) -> int:
    if PROBE_MANIFEST:
        raise SystemExit("--probe-manifest chỉ dùng với lệnh trial, đúng một case")
    plan = json.loads((DATA / "plan.json").read_text(encoding="utf-8"))
    blocks = plan["blocks"]
    if args.from_block:
        blocks = [b for b in blocks if f"{b['arm']}{b['repeat']}" >= args.from_block]
    if args.cases:
        wanted = [c["id"] for c in resolve_cases(args.cases)]
        planned = {c for b in blocks for c in b["cases"]}
        missing = [c for c in wanted if c not in planned]
        if missing:
            raise SystemExit(f"not in plan.json: {missing}; run plan with the same --cases first")
        blocks = [{**b, "cases": [c for c in b["cases"] if c in wanted]} for b in blocks]
    history_ids = {c["id"] for c in hc.load_cases()}
    held = [c for b in blocks for c in b["cases"] if c in history_ids]
    for cid in sorted(set(held)):
        hc.select(cid, hc.load_cases(), ALLOW_HELDOUT)
    for block in blocks:
        arm, repeat = block["arm"], block["repeat"]
        todo = [c for c in block["cases"] if not trial_path(arm, c, repeat).exists()]
        if not todo:
            print(f"[block] {arm}{repeat} complete")
            continue
        print(f"[block] {arm}{repeat}: {len(todo)} trials to go")
        ensure_arm(arm)
        for index, case_id in enumerate(block["cases"]):
            if trial_path(arm, case_id, repeat).exists():
                continue
            preferred = OWNERS[(index + repeat) % len(OWNERS)]
            try:
                ids, usage = owner_ids(), owner_usage()
                start = OWNERS.index(preferred)
                owner, headroom = pick_owner(OWNERS[start:] + OWNERS[:start], ids, usage)
                run_trial(arm, case_id, repeat, owner, max_wait=args.max_wait)
            except CapExhausted as exc:
                print(f"[run] CAP EXHAUSTED â€” stopping. {exc}")
                append_jsonl(DATA / "errors.jsonl", {"at": iso(), "arm": arm, "repeat": repeat,
                                                     "case": case_id, "error": f"cap_exhausted: {exc}"})
                print("[run] resume later with: python -m evaluation.pipeline.driver run --from-block %s%d" % (arm, repeat))
                return 2
            except KeyboardInterrupt:
                raise
            except Exception as exc:
                print(f"[trial] ERROR {case_id}: {exc}")
                append_jsonl(DATA / "errors.jsonl", {"at": iso(), "arm": arm, "repeat": repeat, "case": case_id, "error": str(exc)[:400]})
            time.sleep(2)
    print("[run] done")
    return 0


def _arm_name(text: str) -> str:
    try:
        arm_env(text)
    except ValueError as exc:
        raise argparse.ArgumentTypeError(str(exc)) from exc
    return text


def main(argv: list[str] | None = None) -> int:
    TRIALS.mkdir(parents=True, exist_ok=True)
    RAW.mkdir(parents=True, exist_ok=True)
    parser = argparse.ArgumentParser()
    parser.add_argument("--backend", choices=["psql", "http"], default=os.environ.get("AB_BACKEND", "psql"),
                        help="psql: local docker/psql (default). http: remote board over HTTP, no docker")
    parser.add_argument("--base-url", default=None, help="http backend only: remote web base URL, required")
    parser.add_argument("--confirm-arm", action="store_true",
                        help="owner attests the Portainer env matches the arm; recorded as arm_attested")
    parser.add_argument("--allow-heldout", action="store_true",
                        help="history: held-out cases may run; without it they are refused (or skipped under history:all)")
    parser.add_argument("--expected-trial-gpu-s", type=float, default=DEFAULT_TRIAL_GPU_S,
                        help="GPU seconds one trial needs; owner must have this much headroom to be picked")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("cases").set_defaults(func=cmd_cases)
    sub.add_parser("freeze").set_defaults(func=cmd_freeze)
    p = sub.add_parser("first-failure", help="recompute first_block/mode of stored trials from the board DB")
    p.add_argument("--backfill", action="store_true", help="write fields into trials/*.json (default: report only)")
    p.set_defaults(func=cmd_first_failure)
    sub.add_parser("users").set_defaults(func=cmd_users)
    sub.add_parser("status").set_defaults(func=cmd_status)
    sub.add_parser("csv").set_defaults(func=cmd_csv)
    sub.add_parser("prepin").set_defaults(func=cmd_prepin)

    p = sub.add_parser("measurable")
    p.add_argument("--repeat", type=int, default=1)
    p.set_defaults(func=cmd_measurable)

    p = sub.add_parser("filter")
    p.add_argument("--repeat", type=int, default=1)
    p.add_argument("--max-wait", type=int, default=600)
    p.add_argument("--cases", default="")
    p.add_argument("--force", action="store_true")
    p.set_defaults(func=cmd_filter)

    p = sub.add_parser("smoke")
    p.add_argument("--case", default="remove_element-l1-b72638")
    p.add_argument("--repeat", type=int, default=99)
    p.add_argument("--max-wait", type=int, default=900)
    p.set_defaults(func=cmd_smoke)
    sub.add_parser("report").set_defaults(func=cmd_report)

    p = sub.add_parser("preflight", help="4 pre-trial checks; writes manifest.json 'preflight' unless --dry-run")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--arm", default="B0", type=_arm_name)
    p.add_argument("--probe-manifest", action="store_true")
    p.set_defaults(func=cmd_preflight)

    p = sub.add_parser("arm")
    p.add_argument("arm", type=_arm_name, help="A, B, B0, B1 or B1-minus-<flag>")
    p.add_argument("--force", action="store_true")
    p.add_argument("--dry-run", action="store_true", help="print the arm env, do not touch the worker")
    p.set_defaults(func=cmd_arm)

    p = sub.add_parser("trial")
    p.add_argument("--probe-manifest", action="store_true",
                   help="one B1 trial allowed without a manifest row, only to make the worker POST it (row pending)")
    p.add_argument("--force", action="store_true", help="re-run cases that already have a trial file")
    p.add_argument("--arm", required=True, type=_arm_name)
    p.add_argument("--case", default="")
    p.add_argument("--cases", default="", help="comma list; dev-multifile:<id|prefix|all> allowed")
    p.add_argument("--repeat", type=int, default=1)
    p.add_argument("--parallel", type=int, default=1, help="trials in flight at once, capped at AB_WORKERS")
    p.add_argument("--keep-seeds", action="store_true",
                   help="keep unreferenced history seeds after the trial (default: remove them)")
    p.add_argument("--owner", default="")
    p.add_argument("--max-wait", type=int, default=MAX_WAIT_S)
    p.add_argument("--answer-clarifications", action="store_true",
                   help="send X-AI-Board-Features: clarify and answer the board's questions as the owner (3 rounds)")
    p.add_argument("--dry-run", action="store_true", help="print arm env and case list, do not touch the worker")
    p.set_defaults(func=cmd_trial)

    sub.add_parser("tier-report", help="per tier x split table from trials/*.json; writes tier-report.md").set_defaults(func=cmd_tier_report)
    p = sub.add_parser("exploration", help="first_hit / named_missing_file / planning_reads by arm and kind; writes exploration-report.md")
    p.add_argument("--backfill", action="store_true", help="compute the fields from the board DB into each trial JSON first")
    p.set_defaults(func=cmd_exploration)

    p = sub.add_parser("plan")
    p.add_argument("--repeats", type=int, default=3)
    p.add_argument("--limit", type=int, default=0)
    p.add_argument("--cases", default="", help="comma list; dev-multifile:<id|prefix|all> allowed")
    p.set_defaults(func=cmd_plan)

    p = sub.add_parser("run")
    p.add_argument("--from-block", default="")
    p.add_argument("--max-wait", type=int, default=MAX_WAIT_S)
    p.add_argument("--cases", default="", help="subset of plan.json cases; same syntax as plan --cases")
    p.set_defaults(func=cmd_run)

    p = sub.add_parser("seeds-clean", help="remove history seeds not referenced by plan.json or --keep")
    p.add_argument("--dry-run", action="store_true", help="report sizes only, delete nothing")
    p.add_argument("--keep", action="append", default=[], help="extra case id to treat as referenced")
    p.set_defaults(func=cmd_seeds_clean)

    args = parser.parse_args(argv)
    global EXPECTED_TRIAL_GPU_S, BACKEND, BASE_URL, CONFIRM_ARM, ALLOW_HELDOUT
    EXPECTED_TRIAL_GPU_S = args.expected_trial_gpu_s
    ALLOW_HELDOUT = args.allow_heldout
    BACKEND = args.backend
    BASE_URL = args.base_url
    CONFIRM_ARM = args.confirm_arm
    if BACKEND == "http" and not BASE_URL:
        raise SystemExit("--backend http needs --base-url (explicit; env is not used for the base)")
    global PROBE_MANIFEST, ANSWER_CLARIFICATIONS
    ANSWER_CLARIFICATIONS = bool(getattr(args, "answer_clarifications", False))
    PROBE_MANIFEST = bool(getattr(args, "probe_manifest", False))
    try:
        return args.func(args)
    except PreflightRed as exc:
        print(f"[driver] STOP: {exc}")
        return 3


if __name__ == "__main__":
    sys.exit(main())
