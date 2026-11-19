"""dev-tizia-history cases for driver.py: layout, tune/held-out split, git-archive seeds, tier report."""
import contextlib
import json
import os
import shutil
import subprocess
from pathlib import Path

from evaluation.pipeline import DATA

ROOT = DATA / "dev-tizia-history"
PREFIX = "history:"
TIERS = ("route_ui", "bug_multi", "refactor", "config", "perf", "scope_trap")
OUTCOME_LABEL = {"resolved": "pass", "wrong_ship": "ship_sai", "correct_stop": "dung_dung", "not_resolved": "fail"}


def load_cases(root: Path = ROOT) -> list[dict]:
    """All cases under root/cases with split; ids without a split entry count as held-out."""
    splits = {c["id"]: c["split"] for c in json.loads((root / "split-proposal.json").read_text(encoding="utf-8"))["cases"]}
    out = []
    for meta_path in sorted((root / "cases").glob("*/meta.json")):
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        cid = meta["id"]
        out.append({
            "id": cid, "title": cid, "detail": meta["request_vi"], "level": None,
            "style": "dev-history", "types": meta["kind"], "file": None,
            "tier": meta["tier"], "files": len(meta["reference_files"]),
            "split": splits.get(cid, "heldout"),
            "multifile": {
                "id": cid, "base": meta["base"], "scope": meta["scope"], "oracle_cmd": meta["oracle_cmd"],
                "tags": ["scope-trap"] if meta["kind"] == "correct_stop" else [],
                "oracle_pairs": [(root / "cases" / cid / "oracle" / o["src"], o["dest"]) for o in meta["oracle_files"]],
            },
        })
    return out


def select(token: str, cases: list[dict], allow_heldout: bool) -> list[dict]:
    """tune | all | <id> | history:<prefix>. Held-out cases need allow_heldout; 'all' skips them without it."""
    want = token[len(PREFIX):] if token.startswith(PREFIX) else token
    if want == "tune":
        hits = [c for c in cases if c["split"] == "tune"]
    elif want == "all":
        hits = list(cases)
    elif want == "heldout":
        hits = [c for c in cases if c["split"] != "tune"]
    else:
        hits = [c for c in cases if c["id"] == want or (token.startswith(PREFIX) and c["id"].startswith(want))]
    if not hits:
        raise SystemExit(f"no history case matches {token!r}")
    if want == "all" and not allow_heldout:
        skipped = [c["id"] for c in hits if c["split"] != "tune"]
        if skipped:
            print(f"[history] held-out skipped ({len(skipped)}); add --allow-heldout to include")
        return [c for c in hits if c["split"] == "tune"]
    held = [c["id"] for c in hits if c["split"] != "tune"]
    if held and not allow_heldout:
        raise SystemExit(f"held-out cases {held} need --allow-heldout")
    return hits


def export_seed(base: str, repo: Path, dest: Path) -> None:
    """git archive <base> into dest; no .git in the result."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    arch = dest.parent / f"{dest.name}.tar"
    try:
        subprocess.run(["git", "-C", str(repo), "archive", "--format=tar", "-o", str(arch), base],
                       check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"git archive {base}: {exc.stderr.strip()[:200]}") from exc
    dest.mkdir(parents=True)
    subprocess.run(["tar", "-xf", str(arch), "-C", str(dest)], check=True, capture_output=True, text=True)
    arch.unlink()


def ensure_seed(meta: dict, repo: Path, root: Path = ROOT) -> Path:
    """Cached seed export for meta['id'] at meta['base']; built once, then read-only."""
    dest = root / "seeds" / meta["id"]
    if not dest.exists():
        part = dest.with_name(dest.name + ".part")
        shutil.rmtree(part, ignore_errors=True)
        export_seed(meta["base"], repo, part)
        part.rename(dest)
    return dest


@contextlib.contextmanager
def node_modules_link(ws: Path, repo: Path):
    """Junction repo/node_modules into ws for the oracle run; removed on exit (rmdir keeps the target)."""
    src, dst = repo / "node_modules", ws / "node_modules"
    linked = src.exists() and not dst.exists()
    if linked:
        subprocess.run(["cmd", "/c", "mklink", "/J", str(dst), str(src)], check=True, capture_output=True)
    try:
        yield
    finally:
        if linked:
            os.rmdir(dst)


GATE1_MARK = "intake_human_review"


def gate1_blocked(trial: dict) -> bool:
    """True when the board stopped at gate 1 intake human review (valid board-blocked result)."""
    return GATE1_MARK in f"{trial.get('stop_reason') or ''} {trial.get('reason') or ''}"


def tier_report(trials: list[dict]) -> str:
    """Markdown per tier x split: outcome counts, files=N, gpu per resolved. Rows without case_tier skipped."""
    rows = [t for t in trials if t.get("case_tier")]
    lines = ["# dev-tizia-history tier report", ""]
    for split in ("tune", "heldout"):
        part = [t for t in rows if t.get("case_split") == split]
        lines += [f"## split={split} (n={len(part)})", "",
                  "| tier | files | n | pass | ship_sai | dung_dung | fail | gpu_s/resolved | blocked_gate1 |",
                  "|---|---|---|---|---|---|---|---|---|"]
        for tier in TIERS:
            group = [t for t in part if t["case_tier"] == tier]
            if not group:
                lines.append(f"| {tier} | - | 0 | - | - | - | - | - | - |")
                continue
            counts = {k: sum(1 for t in group if t.get("mf_outcome") == k) for k in OUTCOME_LABEL}
            gpu = sum(float(t.get("gpu_s") or 0) for t in group)
            per = f"{gpu / counts['resolved']:.0f}" if counts["resolved"] else "-"
            files = ",".join(sorted({f"files={t['case_files']}" for t in group}))
            blocked = sum(1 for t in group if gate1_blocked(t))
            lines.append(f"| {tier} | {files} | {len(group)} | {counts['resolved']} | {counts['wrong_ship']} | "
                         f"{counts['correct_stop']} | {counts['not_resolved']} | {per} | {blocked} |")
        lines += ["", "| case | tier | files | outcome | oracle_rc | gpu_s | evidence | gate1_blocked |", "|---|---|---|---|---|---|---|---|"]
        for t in sorted(part, key=lambda t: (t["case_tier"], t["case"])):
            lines.append(f"| {t['case']} | {t['case_tier']} | files={t['case_files']} | {t.get('mf_outcome')} | "
                         f"{t.get('oracle_rc')} | {t.get('gpu_s')} | {t.get('oracle_evidence', '')} | "
                         f"{'yes' if gate1_blocked(t) else 'no'} |")
        lines.append("")
    return "\n".join(lines)


def _tree_bytes(path: Path) -> int:
    return sum(p.stat().st_size for p in path.rglob("*") if p.is_file())


def seeds_clean(root: Path, referenced: set[str], dry_run: bool = True) -> dict:
    """Remove root/seeds/<id> dirs not in referenced. dry_run lists only. Returns sizes and names."""
    seeds = root / "seeds"
    dirs = sorted(p for p in seeds.iterdir() if p.is_dir()) if seeds.exists() else []
    kept = [p.name for p in dirs if p.name in referenced]
    removable = [p for p in dirs if p.name not in referenced]
    report = {"kept": kept, "removable": [p.name for p in removable],
              "bytes": sum(_tree_bytes(p) for p in removable), "dry_run": dry_run, "removed": []}
    if not dry_run:
        for p in removable:
            shutil.rmtree(p)
            report["removed"].append(p.name)
    return report


def format_seed_report(report: dict) -> str:
    """One-paragraph summary of seeds_clean output."""
    mode = "dry-run, nothing deleted" if report["dry_run"] else f"removed {len(report['removed'])}"
    return (f"seeds: {len(report['kept'])} referenced kept, {len(report['removable'])} unreferenced "
            f"({report['bytes'] / (1024 * 1024):.1f} MB) [{mode}]")
