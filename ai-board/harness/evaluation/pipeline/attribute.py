#!/usr/bin/env python3
"""Paired regressions of round N vs round M, attributed to the first-parent commits and flags between their pins.

python -m evaluation.pipeline.attribute --round N --prev M [--arm B0] [--until REF] [--out DIR] [--plan plan.json] [--tmp DIR]
Writes attribution-r<N>-r<M>.json/.md into --out (default DATA/rounds). Replays deterministic gate checks offline
on stored candidate diffs at each commit; no model calls, no Docker.
"""
from __future__ import annotations

import argparse
import io
import json
import os
import posixpath
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
from collections import Counter, defaultdict
from fnmatch import fnmatchcase
from pathlib import Path

from evaluation.pipeline import DATA, REPO, WORKTREE
from evaluation.pipeline import criterion_grade as CG
from evaluation.pipeline import eval_gate as G
from evaluation.pipeline import lf235_grade as L
from evaluation.pipeline import solved_rate as SR

HARNESS_REL = "ai-board/harness"
# harness code reads lexicons and contracts under server/ai-board; the tokenizer resource is 13 MB and unused here
SNAPSHOT = (HARNESS_REL, f":(exclude){HARNESS_REL}/tests", "server/ai-board", ":(exclude)server/ai-board/resources")
# Modules on each gate's path, read off the gate files' imports; globs relative to HARNESS_REL.
GATE_MODULES = {
    "1": ["gates/brainstorm.py", "gates/best_match.py", "gates/grounding_paths.py", "gates/react_plan.py",
          "gates/intake_guard.py", "gates/risk_triage.py", "services/context.py", "services/file_context.py",
          "services/target_confidence.py", "gate5/functional.py", "security/spotlight.py", "prompts/*"],
    "2.5": ["gates/plan_validate.py", "gates/best_match.py", "gates/evidence.py", "gates/grounding_paths.py",
            "services/context.py", "services/file_context.py", "services/target_confidence.py", "runtime/coverage.py",
            "prompts/*"],
    "3": ["gates/implement.py", "gates/gate3_guards.py", "gates/change_class.py", "gates/subtask_contract.py",
          "services/candidate.py", "services/file_context.py", "services/repomap.py", "runtime/tool_loop.py", "prompts/*"],
    "4": ["gates/static_check.py", "gates/guard.py", "gates/adversarial_review.py", "gates/change_class.py",
          "gates/risk_triage.py", "gates/reviewer_fix.py", "gates/subtask_contract.py", "gates/scope_check.py",
          "security/classifier.py", "gate5/functional.py"],
    "5": ["gate5/*", "gates/vision_advisory.py", "verification/*"],
    "loop": ["runtime/*"],
}
GUARD_CHECKS = {"content", "external_link", "external_script", "image", "injection", "inline_script", "network_call",
                "palette", "personal_form", "pii", "protected_path", "python_syntax", "secret", "sensitive_topic",
                "sovereignty_map", "test_removal"}
SEALED = ("held-out", "heldout", "sealed")
FLAG = re.compile(r"AI_BOARD_[A-Z0-9_]+")
LF_MSG = re.compile(r"merge: LF/(\d+) (\S+) (\S+)")
BRANCH_MSG = re.compile(r"merge: (\S+)")

CHILD = r'''
import importlib, inspect, json, sys
sys.path.insert(0, sys.argv[1])

def run(job):
    try:
        mod = importlib.import_module(job["module"])
    except ModuleNotFoundError as e:
        return {"absent": True} if e.name == job["module"] else {"error": repr(e)}
    except Exception as e:
        return {"error": repr(e)}
    fn = getattr(mod, job["func"], None)
    if fn is None:
        return {"absent": True}
    params = inspect.signature(fn).parameters
    pos = job["args"] if any(p.kind == p.VAR_POSITIONAL for p in params.values()) else job["args"][:len(params)]
    try:
        return {"value": fn(*pos, **{k: v for k, v in job.get("kwargs", {}).items() if k in params})}
    except Exception as e:
        return {"error": repr(e)}

print(json.dumps([run(job) for job in json.load(sys.stdin)], default=str))
'''


def _git(repo, *args, check=True) -> str:
    p = subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if check and p.returncode:
        raise RuntimeError(f"git {' '.join(args)}: {p.stderr.strip()[:300]}")
    return p.stdout


def plan_keys(plan_path) -> dict[str, int]:
    """Stable key -> LF id from the tracker; {} when absent."""
    p = Path(plan_path) if plan_path else None
    if not p or not p.exists():
        return {}
    return {t["key"]: t["id"] for t in json.loads(p.read_text(encoding="utf-8")).get("tickets", []) if t.get("key")}


def _ticket(subject: str, keys: dict) -> tuple:
    if m := LF_MSG.search(subject):
        return int(m[1]), m[2], m[3]
    branch = m[1] if (m := BRANCH_MSG.search(subject)) else None
    if not branch:
        return None, None, None
    slug = branch.split("/", 1)[-1]
    hits = [k for k in keys if k == slug or re.search(rf"(?:^|-){re.escape(k)}(?:-|$)", slug)]
    key = slug if slug in keys else max(hits, key=len, default=None)
    return keys.get(key), key, branch


def merges(repo, a: str, b: str, keys: dict) -> list[dict]:
    """First-parent commits in a..b, oldest first, with ticket and files changed against the first parent."""
    out = []
    for line in _git(repo, "log", "--first-parent", "--reverse", "--format=%H%x1f%s", f"{a}..{b}").splitlines():
        sha, subject = line.split("\x1f", 1)
        lf, key, branch = _ticket(subject, keys)
        files = _git(repo, "diff", "--name-only", f"{sha}^1", sha).split()
        out.append({"sha": sha, "subject": subject, "lf": lf, "key": key, "branch": branch, "files": files})
    return out


def introduced_flags(repo, prev_pin: str, commits: list[dict]) -> dict[str, str]:
    """AI_BOARD_* names absent at prev_pin -> first commit whose added lines name them."""
    known = set(_git(repo, "grep", "-h", "-o", "-E", FLAG.pattern, prev_pin, check=False).split())
    out: dict = {}
    for c in commits:
        diff = _git(repo, "diff", "-U0", f"{c['sha']}^1", c["sha"])
        added = {f for line in diff.splitlines() if line.startswith("+") and not line.startswith("+++")
                 for f in FLAG.findall(line)}
        out.update({f: c["sha"] for f in sorted(added - known - set(out))})
    return out


def round_flags(trials: list[dict], pin: str, data: Path, arm: str) -> dict:
    """Worker AI_BOARD_* env of a round: from trials when recorded, else the arms.jsonl record for its pin."""
    for t in trials:
        if t.get("flags"):
            return t["flags"]
    path = data / "arms.jsonl"
    recs = [r for line in (path.read_text(encoding="utf-8").splitlines() if path.exists() else []) if line.strip()
            for r in [json.loads(line)] if r.get("arm") == arm and str(r.get("worktree_head", "")).startswith(pin)]
    return recs[-1].get("env", {}) if recs else {}


def _gate(g) -> str | None:
    if g in (None, ""):
        return None
    f = float(g)
    return str(int(f)) if f.is_integer() else str(f)


def _round(data: Path, arm: str, n: int, cases_path: Path, attack_path: Path) -> dict:
    """pair key -> {stem, trial, solved, shipped} for one round, graded on the fly."""
    paths = [p for p in sorted((data / "trials").glob(f"{arm}-r{n}-*.json")) if not any(w in p.name.lower() for w in SEALED)]
    by = defaultdict(list)
    for r in CG.load_rows(data / "trials", cases_path, attack_path, paths):
        by[r["trial"]].append(r)
    out = {}
    for p in paths:
        t = json.loads(p.read_text(encoding="utf-8"))
        out[G.pair_key(t)] = {"stem": p.stem, "trial": t, "shipped": t.get("outcome") in L.SHIP,
                              "solved": SR.solved(t, [r for r in by[p.stem] if r["criterion"] != "*"])}
    return out


def _check(reason: str) -> str | None:
    """Check name a block reason starts with; a JSON reason gives its non-gate keys."""
    if reason.startswith("{"):
        try:
            d = json.loads(reason)
            return str(d.get("reason") or ",".join(k for k in d if k != "gate")) or None
        except ValueError:
            pass
    return reason.split(":", 1)[0].strip() or None


def _pin(rnd: dict) -> str | None:
    pins = Counter(v["trial"].get("pin") for v in rnd.values() if v["trial"].get("pin"))
    return pins.most_common(1)[0][0] if pins else None


def _job(gate, check, case: dict, diff: str, checkout) -> dict | None:
    state = {"request_title": case.get("title"), "request_detail": case.get("detail"), "request_type": "other"}
    if gate == "4" and check == "request_literal":
        return {"module": "gates.static_check", "func": "literal_misses", "args": [state, diff, checkout], "kind": "list"}
    if gate == "4" and check in GUARD_CHECKS:
        return {"module": "gates.guard", "func": "scan", "args": [diff, checkout], "kind": "scan", "check": check,
                "kwargs": {"request_text": case.get("detail"), "request_type": "other"}}
    if gate == "1" and check and check.startswith("intake_"):
        return {"module": "gates.intake_guard", "func": "deterministic", "kind": "intake",
                "args": [f"{case.get('title') or ''}\n{case.get('detail') or ''}"]}
    return None


def _outcome(job: dict, res: dict) -> dict:
    if "error" in res:
        return {"blocked": None, "value": None, "error": res["error"][:300]}
    if res.get("absent"):
        return {"blocked": False, "value": None}
    v = res["value"]
    if job["kind"] == "scan":
        v = sorted({f["check"] for f in v.get("findings", [])})
        return {"blocked": job["check"] in v, "value": v}
    if job["kind"] == "intake":
        return {"blocked": any(x != "allow" for x in v.values()), "value": v}
    return {"blocked": bool(v), "value": v}


def _candidate_tree(repo, base: str, diff: str, root: Path) -> str | None:
    """Changed files at base with the diff applied; None when it does not apply."""
    dest = Path(tempfile.mkdtemp(prefix="cand-", dir=root))
    for path in re.findall(r"^diff --git a/(\S+) b/", diff, flags=re.M):
        p = subprocess.run(["git", "show", f"{base}:{path}"], cwd=repo, capture_output=True)
        if p.returncode == 0:
            (dest / path).parent.mkdir(parents=True, exist_ok=True)
            (dest / path).write_bytes(p.stdout)
    ok = subprocess.run(["git", "apply", "--whitespace=nowarn", "-"], cwd=dest, input=diff.encode("utf-8"),
                        capture_output=True).returncode == 0
    return str(dest) if ok else None


def _replay(repo, seq: list[str], jobs: list[dict], env: dict, root: Path) -> list[list[dict]]:
    """Per job, the outcome at each sha of seq; each sha's harness is a git archive snapshot run in its own process."""
    per_sha = []
    for sha in seq:
        dest = root / f"snap-{sha[:12]}"
        spec = [x for x in SNAPSHOT if x.startswith(":") or _git(repo, "ls-tree", "--name-only", sha, x).strip()]
        tar = subprocess.run(["git", "archive", "--format=tar", sha, *spec],
                             cwd=repo, capture_output=True, check=True).stdout
        with tarfile.open(fileobj=io.BytesIO(tar)) as tf:
            tf.extractall(dest, filter="data")
        harness = dest / HARNESS_REL
        p = subprocess.run([sys.executable, "-c", CHILD, str(harness)], cwd=harness, env=env, capture_output=True,
                           input=json.dumps([{k: v for k, v in j.items() if k not in ("kind", "check")} for j in jobs]),
                           text=True, encoding="utf-8", errors="replace")
        lines = p.stdout.strip().splitlines()
        res = json.loads(lines[-1]) if p.returncode == 0 and lines else [{"error": p.stderr.strip()[-300:]}] * len(jobs)
        per_sha.append([_outcome(j, r) for j, r in zip(jobs, res)])
        shutil.rmtree(dest, ignore_errors=True)
    return [[row[i] for row in per_sha] for i in range(len(jobs))]


def _summary(job: dict, seq: list[str], outs: list[dict], pin_at: int) -> dict:
    changes = [{"sha": sha, "blocked": o["blocked"], "value": o["value"]}
               for sha, o, before in zip(seq[1:], outs[1:], outs) if (o["blocked"], o["value"]) != (before["blocked"], before["value"])]
    reproduced = outs[pin_at]["blocked"] is True
    flip = next((sha for sha, o in zip(seq[1:pin_at + 1], outs[1:pin_at + 1])
                 if o["blocked"] is not None and o["blocked"] != outs[0]["blocked"]), None)
    errors = [o["error"] for o in outs if o.get("error")]
    status = ("error" if outs[pin_at].get("error") else "baseline_error" if outs[0].get("error")
              else "replayed" if reproduced else "mismatch")
    return {"status": status, "function": f"{job['module']}.{job['func']}", "reproduced": reproduced,
            "baseline": {"sha": seq[0], "blocked": outs[0]["blocked"], "value": outs[0]["value"]},
            "at_pin": {"blocked": outs[pin_at]["blocked"], "value": outs[pin_at]["value"]},
            "first_flip": flip if status == "replayed" else None, "changes": changes, "errors": errors[:3]}


def _suspects(commits: list[dict], modules: list[str], replay: dict, flag_shas: dict) -> list[dict]:
    pats = [f"{HARNESS_REL}/{m}" for m in modules]
    pkgs = {posixpath.dirname(p) for p in pats}
    model_path = replay.get("first_flip") is None
    out = []
    for c in commits:
        direct = [f for f in c["files"] if any(fnmatchcase(f, p) for p in pats)]
        near = [f for f in c["files"] if posixpath.dirname(f) in pkgs]
        ev = ["replay"] if c["sha"] == replay.get("first_flip") else []
        ev += ["module"] if direct or near else []
        ev += ["flag"] if model_path and c["sha"] in flag_shas else []
        if ev:
            out.append({"sha": c["sha"], "lf": c["lf"], "key": c["key"], "branch": c["branch"], "subject": c["subject"], "evidence": ev,
                        "hit": "direct" if direct else "package" if near else None, "files": direct or near,
                        "flags": flag_shas.get(c["sha"], [])})
    rank = {"direct": 0, "package": 1, None: 2}
    return sorted(out, key=lambda s: ("replay" not in s["evidence"], rank[s["hit"]]))


def attribute(n: int, m: int, *, data=DATA, repo=REPO, plan_path=None, arm="B0", until=None, tmp=None,
              cases_path=None, attack_path=None) -> dict:
    data = Path(data)
    cases_path = Path(cases_path or data / "cases-dev.json")
    attack_path = Path(attack_path or data / "attack-cases.json")
    cases = {c["id"]: c for p in (cases_path, attack_path) if p.exists() for c in json.loads(p.read_text(encoding="utf-8"))}
    now, prev = _round(data, arm, n, cases_path, attack_path), _round(data, arm, m, cases_path, attack_path)
    pin_n, pin_m = _pin(now), _pin(prev)
    full_n, full_m = (_git(repo, "rev-parse", f"{p}^{{commit}}").strip() for p in (pin_n, pin_m))
    keys = plan_keys(plan_path)
    commits = merges(repo, full_m, full_n, keys)
    after = merges(repo, full_n, until, keys) if until else []
    flags_n = round_flags([v["trial"] for v in now.values()], pin_n, data, arm)
    flags_m = round_flags([v["trial"] for v in prev.values()], pin_m, data, arm)
    introduced = introduced_flags(repo, full_m, commits)
    flag_shas: dict = defaultdict(list)
    for f, sha in introduced.items():
        flag_shas[sha].append(f)
    regs = []
    for k in sorted(set(now) & set(prev), key=str):
        a, b = prev[k], now[k]
        if not ((a["solved"] and not b["solved"]) or (a["shipped"] and not b["shipped"])):
            continue
        t = b["trial"]
        fb = t.get("first_block") or {}
        gate = _gate(fb.get("gate") or t.get("gate_reached"))
        reason = str(fb.get("reason") or t.get("verdict_reason") or "")
        check = _check(reason)
        regs.append({"case": k[0], "seed": k[1], "prev_trial": a["stem"], "trial": b["stem"],
                     "infra": bool(t.get("call_errors_before")) or t.get("failure_class") == "transient" or bool(t.get("timed_out")),
                     "prev": {"solved": a["solved"], "shipped": a["shipped"], "outcome": a["trial"].get("outcome")},
                     "now": {"solved": b["solved"], "shipped": b["shipped"], "outcome": t.get("outcome")},
                     "first_block": {"gate": gate, "check": check, "reason": reason[:300]},
                     "loop_stops": t.get("loop_stops") or [], "mode": t.get("mode"), "infra_tag": t.get("infra_tag") or None,
                     # no gate block and no ship: the run stopped in runtime
                     "modules": GATE_MODULES.get(gate, []) + (GATE_MODULES["loop"] if t.get("loop_stops") or not (gate or b["shipped"]) else [])})
    root = Path(tempfile.mkdtemp(prefix="attribute-", dir=tmp))
    try:
        jobs, owners = [], []
        for i, r in enumerate(regs):
            diff_path = data / "trials" / f"{r['trial']}.candidate.diff"
            diff = diff_path.read_text(encoding="utf-8", errors="replace") if diff_path.exists() else ""
            case = cases.get(r["case"])
            job = None
            if case and (diff or r["first_block"]["gate"] == "1"):
                checkout = _candidate_tree(repo, now[(r["case"], r["seed"])]["trial"].get("candidate_base_sha") or full_n,
                                           diff, root) if diff else None
                job = _job(r["first_block"]["gate"], r["first_block"]["check"], case, diff, checkout)
            if job:
                jobs.append(job)
                owners.append(i)
            else:
                r["replay"] = {"status": "not_replayable", "why": "no gate block" if not r["first_block"]["gate"] else
                               f"gate {r['first_block']['gate']} {r['first_block']['check']}: no deterministic replay "
                               "or its inputs (plan, validation) are not stored in the trial"}
        seq = [full_m] + [c["sha"] for c in commits + after]
        env = {**os.environ, **flags_n, "PYTHONIOENCODING": "utf-8", "PYTHONDONTWRITEBYTECODE": "1"}
        for i, job, outs in zip(owners, jobs, _replay(repo, seq, jobs, env, root) if jobs else []):
            regs[i]["replay"] = _summary(job, seq, outs, len(commits))
    finally:
        shutil.rmtree(root, ignore_errors=True)
    for r in regs:
        # a failed model call is the endpoint, not a merge
        r["suspects"] = [] if r["infra"] else _suspects(commits, r["modules"], r["replay"], flag_shas)
    return {"round": n, "prev": m, "arm": arm, "pins": {"prev": pin_m, "round": pin_n}, "until": until,
            "commits": commits, "after_pin": after,
            "flags": {"prev": flags_m, "round": flags_n, "introduced": introduced,
                      "changed": {f: [flags_m.get(f), flags_n.get(f)] for f in sorted(set(flags_m) | set(flags_n))
                                  if flags_m.get(f) != flags_n.get(f)}},
            "paired": len(set(now) & set(prev)),
            "unpaired": {"prev_only": sorted(set(prev) - set(now), key=str), "round_only": sorted(set(now) - set(prev), key=str)},
            "regressions": regs}


def _sus(s: dict) -> str:
    who = f"LF/{s['lf']} {s['key']}" if s["lf"] else s["key"] or s["branch"] or s["subject"][:40]
    return f"{s['sha'][:8]} {who} ({', '.join(s['evidence'])}{', ' + s['hit'] if s['hit'] else ''})"


def md(rep: dict) -> str:
    f = rep["flags"]
    out = [f"# Attribution r{rep['round']} vs r{rep['prev']}", "",
           f"pins {rep['pins']['prev']} -> {rep['pins']['round']}, {len(rep['commits'])} first-parent commits; "
           f"paired {rep['paired']}, unpaired prev_only {len(rep['unpaired']['prev_only'])} round_only {len(rep['unpaired']['round_only'])}",
           f"flags changed: {f['changed'] or '-'}; introduced: " + (", ".join(f"{k} ({v[:8]})" for k, v in f["introduced"].items()) or "-"),
           "", "| commit | LF | key / branch | files |", "|---|---|---|---|"]
    out += [f"| {c['sha'][:8]}{' (after pin)' if c in rep['after_pin'] else ''} | {c['lf'] or '-'} | "
            f"{c['key'] or c['branch'] or c['subject'][:40]} | {len(c['files'])} |" for c in rep["commits"] + rep["after_pin"]]
    out += ["", "| case | seed | first_block | replay | suspects |", "|---|---|---|---|---|"]
    for r in rep["regressions"]:
        rp = r["replay"]
        flip = f", first flip {rp['first_flip'][:8]}" if rp.get("first_flip") else ""
        later = [c["sha"][:8] for c in rp.get("changes", []) if c["sha"] in {a["sha"] for a in rep["after_pin"]}]
        fb = r["first_block"]
        out.append(f"| {r['case']} | {r['seed']} | {fb['gate']} {fb['check']}{' (infra)' if r['infra'] else ''} | {rp['status']}{flip}"
                   f"{', after pin ' + ' '.join(later) if later else ''} | {'; '.join(map(_sus, r['suspects'])) or '-'} |")
    return "\n".join(out) + "\n"


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--round", type=int, required=True)
    ap.add_argument("--prev", type=int, required=True)
    ap.add_argument("--arm", default="B0")
    ap.add_argument("--data", default=str(DATA))
    ap.add_argument("--repo", default=str(REPO))
    ap.add_argument("--plan", default=str(WORKTREE / ".scratch" / "ai-board-local-first" / "plan.json"))
    ap.add_argument("--until", help="also replay commits after the round's pin up to this ref")
    ap.add_argument("--out", help="output dir (default <data>/rounds)")
    ap.add_argument("--tmp", help="dir for replay snapshots (removed afterwards)")
    a = ap.parse_args(argv)
    rep = attribute(a.round, a.prev, data=a.data, repo=a.repo, plan_path=a.plan, arm=a.arm, until=a.until, tmp=a.tmp)
    out = Path(a.out or Path(a.data) / "rounds")
    out.mkdir(parents=True, exist_ok=True)
    stem = out / f"attribution-r{a.round}-r{a.prev}"
    stem.with_suffix(".json").write_text(json.dumps(rep, indent=1, ensure_ascii=False, default=list), encoding="utf-8")
    text = md(rep)
    stem.with_suffix(".md").write_text(text, encoding="utf-8")
    sys.stdout.write(text)
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main())
