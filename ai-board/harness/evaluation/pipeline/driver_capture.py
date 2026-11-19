"""Capture candidate file + diff from guest repo into trials/, read-only git. AB_CAPTURE_CANDIDATE=0 disables."""
from __future__ import annotations

import json
import os
import re
import subprocess
from pathlib import Path

CONTAINER = os.environ.get("AB_GUEST_CONTAINER", "aiboard-worker")
GUEST_REPO = os.environ.get("AB_GUEST_REPO", "/repo")
READ_ONLY = {"show", "diff", "cat-file", "fsck", "log", "rev-parse"}
CANDIDATE_GATE = 3


class GitResult:
    def __init__(self, proc: subprocess.CompletedProcess):
        self.ok = proc.returncode == 0
        self.text = (proc.stdout or b"").decode("utf-8", "replace")


def docker_git(args: list[str]) -> GitResult:
    """Run read-only git in guest repo via docker exec. ValueError on any non-read command."""
    if not args or args[0] not in READ_ONLY:
        raise ValueError(f"git {args[:1]} not allowed")
    cmd = ["docker", "exec", CONTAINER, "git", "-c", f"safe.directory={GUEST_REPO}", "-C", GUEST_REPO, *args]
    return GitResult(subprocess.run(cmd, capture_output=True, timeout=120))


def default_git(*args: str) -> GitResult:
    return docker_git(list(args))


def _as_dict(value):
    if isinstance(value, str):
        try:
            return json.loads(value)
        except ValueError:
            return None
    return value if isinstance(value, dict) else None


def candidate_from_runs(runs: list[dict]) -> dict | None:
    """Last candidate with head_sha found in run evidence_json (candidate / verdict.candidate)."""
    found = None
    for run in runs if isinstance(runs, list) else []:
        ev = _as_dict(run.get("evidence_json")) or {}
        for cand in (ev.get("candidate"), (ev.get("verdict") or {}).get("candidate"),
                     (ev.get("pre_pr_verdict") or {}).get("candidate"), (ev.get("verdict") or {}).get("blocked_candidate")):
            if isinstance(cand, dict) and cand.get("head_sha"):
                found = cand
    return found


def find_dangling(git, ticket_ids: set[int]) -> tuple[str, str] | None:
    """(base, head) of unreachable ai-board commits for these tickets, newest chain; None if absent."""
    fsck = git("fsck", "--unreachable", "--no-reflogs", "--no-progress")
    shas = re.findall(r"unreachable commit ([0-9a-f]{40})", fsck.text) if fsck.ok else []
    if not shas:
        return None
    log = git("log", "--no-walk=unsorted", "--format=%H%x09%ct%x09%s", *shas)
    wanted = tuple(f"ai-board(ticket-{i}):" for i in ticket_ids)
    hits = []
    for line in log.text.splitlines():
        sha, ct, subject = (line.split("\t", 2) + ["", ""])[:3]
        if subject.startswith(wanted):
            hits.append((int(ct or 0), sha))
    if not hits:
        return None
    hits.sort()
    parent = git("rev-parse", f"{hits[0][1]}^")
    return (parent.text.strip(), hits[-1][1]) if parent.ok else None


def _missing(rec: dict, reason: str) -> None:
    rec["candidate_missing"] = reason[:200]


def capture(rec: dict, case: dict, stem: str, out_dir: Path, git=default_git) -> None:
    """Write <stem>.candidate<ext> + .diff, set candidate_* on rec, else candidate_missing reason. Never raises."""
    try:
        if (rec.get("gate_reached") or 0) < CANDIDATE_GATE:
            return
        path = case.get("file")
        if not path and "multifile" not in case:
            _missing(rec, "no single target file in case")
            return
        cand = candidate_from_runs(rec.get("runs_evidence"))
        if cand:
            base, head, source = cand.get("base_sha"), cand["head_sha"], "kept_branch"
        else:
            ids = {int(rec["root_ticket_id"])} | {t["id"] for t in rec.get("tickets") or []}
            pair = find_dangling(git, ids)
            if not pair:
                _missing(rec, "head not found: no candidate in evidence, no dangling ai-board commit")
                return
            (base, head), source = pair, "dangling"
        out_dir.mkdir(parents=True, exist_ok=True)
        if path:
            shown = git("show", f"{head}:{path}")
            if not shown.ok:
                _missing(rec, f"file {path} not in head {head[:8]}")
                return
            (out_dir / f"{stem}.candidate{Path(path).suffix}").write_text(shown.text, encoding="utf-8", newline="")
        diff = git("diff", base, head) if base else None
        if diff and diff.ok:
            (out_dir / f"{stem}.candidate.diff").write_text(diff.text, encoding="utf-8", newline="")
        names = git("diff", "--name-only", base, head) if base else None
        rec.update(candidate_head_sha=head, candidate_base_sha=base, candidate_source=source,
                   candidate_files=names.text.split() if names and names.ok else None)
    except Exception as exc:
        _missing(rec, f"{type(exc).__name__}: {exc}")


def maybe_capture(rec: dict, case: dict, stem: str, out_dir: Path, probe) -> None:
    """Driver hook, on by default (AB_CAPTURE_CANDIDATE=0 disables). probe(root_id) = root_probe. Never raises."""
    if (rec.get("gate_reached") or 0) < CANDIDATE_GATE:
        return
    if os.environ.get("AB_CAPTURE_CANDIDATE", "1") == "0":
        _missing(rec, "capture disabled by AB_CAPTURE_CANDIDATE=0")
        return
    if rec.get("root_ticket_id") is None:
        _missing(rec, "no root ticket id")
        return
    try:
        rec["runs_evidence"] = (probe(int(rec["root_ticket_id"])) or {}).get("runs") or []
    except Exception:
        rec["runs_evidence"] = []
    try:
        capture(rec, case, stem, out_dir)
    finally:
        rec.pop("runs_evidence", None)
        if not rec.get("candidate_head_sha") and not rec.get("candidate_missing"):
            _missing(rec, "capture produced no candidate and no reason")
