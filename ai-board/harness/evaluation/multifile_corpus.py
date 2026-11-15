"""Check multifile eval corpus offline, no GPU: oracle red on base, green on reference, split + seal hashes.

Layout: <root>/cases/<id>/{meta.json, reference.patch, oracle/*}; <root>/split.json.
Seed = `git archive <base>` (no .git, no oracle, no reference). Usage:
  python -m evaluation.multifile_corpus verify --root R --repo REPO [--ids a,b] [--heldout]
  python -m evaluation.multifile_corpus seal --root R
  python -m evaluation.multifile_corpus split --root R [--check-seal]
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path

GROUPS = ("frontend", "frontend_backend", "backend")
PER_GROUP = 4
HELDOUT_TOTAL = 4
LOW_BASE_TIMEOUT = 180


def load_cases(root: Path, skip: set[str] = frozenset()) -> list[dict]:
    """meta.json of every case dir (dir name not in skip, skipped dirs never opened), sorted by id; adds `_dir`."""
    out = []
    for meta_path in sorted((root / "cases").glob("*/meta.json")):
        if meta_path.parent.name in skip:
            continue
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        meta["_dir"] = meta_path.parent
        out.append(meta)
    return out


def export_seed(repo: Path, base: str, dest: Path) -> None:
    """git archive base into dest."""
    r = subprocess.run(["git", "-C", str(repo), "archive", "--format=tar", base], capture_output=True)
    if r.returncode:
        raise RuntimeError(f"git archive {base}: {r.stderr.decode(errors='replace')[:200]}")
    dest.mkdir(parents=True, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(r.stdout)) as tf:
        tf.extractall(dest, filter="data")


def split_blocks(patch: str) -> list[tuple[str, str]]:
    """(path, text) per `diff --git` block."""
    out: list[tuple[str, str]] = []
    cur: list[str] = []
    path = ""
    for line in patch.splitlines(keepends=True):
        if line.startswith("diff --git "):
            if cur:
                out.append((path, "".join(cur)))
            cur, path = [line], line.split(" b/", 1)[-1].strip()
        else:
            cur.append(line)
    if cur:
        out.append((path, "".join(cur)))
    return out


def apply_patch(ws: Path, text: str) -> None:
    """git apply text inside ws; raise on failure."""
    with tempfile.NamedTemporaryFile("wb", suffix=".patch", delete=False) as fh:
        fh.write(text.encode("utf-8"))
        name = fh.name
    try:
        r = subprocess.run(["git", "apply", "--whitespace=nowarn", name], cwd=ws, capture_output=True, text=True)
        if r.returncode:
            raise RuntimeError(f"apply failed: {r.stderr.strip()[:300]}")
    finally:
        os.unlink(name)


def run_oracle(case: dict, ws: Path) -> tuple[int, str]:
    """Copy oracle files into ws, run oracle_cmd at ws root; (rc, last output line)."""
    for item in case["oracle_files"]:
        dst = ws / item["dest"]
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes((case["_dir"] / "oracle" / item["src"]).read_bytes())
    try:
        p = subprocess.run(case["oracle_cmd"], shell=True, cwd=ws, capture_output=True, timeout=LOW_BASE_TIMEOUT,
                           env={**os.environ, "PYTHONUTF8": "1"})
        out = (p.stdout + p.stderr).decode("utf-8", errors="replace")
        rc = p.returncode
    except subprocess.TimeoutExpired:
        rc, out = 124, "oracle timeout"
    lines = [ln.strip() for ln in out.splitlines() if ln.strip()]
    return rc, (lines[-1] if lines else "")[:160]


def in_scope(path: str, scope: list[str]) -> bool:
    """True when path equals a scope entry or sits under a `/`-suffixed one."""
    return any(path == s or (s.endswith("/") and path.startswith(s)) for s in scope)


def _variant(case: dict, seed: Path, patch: str | None) -> tuple[int, str, list[str]]:
    with tempfile.TemporaryDirectory(prefix="mfc-") as tmp:
        ws = Path(tmp) / "ws"
        shutil.copytree(seed, ws)
        touched: list[str] = []
        if patch:
            apply_patch(ws, patch)
            touched = sorted(p for p, _ in split_blocks(patch))
        rc, last = run_oracle(case, ws)
        return rc, last, touched


def check_case(case: dict, repo: Path) -> dict:
    """Rows: base red, reference green in scope, leave-one-out red, files real, oracle absent from seed."""
    with tempfile.TemporaryDirectory(prefix="mfc-seed-") as tmp:
        seed = Path(tmp) / "seed"
        export_seed(repo, case["base"], seed)
        problems, rows = _check_variants(case, seed)
    return {"id": case["id"], "group": case["group"], "ok": not problems, "problems": problems,
            "rows": {k: list(v) for k, v in rows.items()}}


PATH_TOKEN = re.compile(r"(?:public|server|test|ai-board)/[\w./-]*\w")


def request_path_problems(case: dict, seed: Path) -> list[str]:
    """Paths named in request_vi must exist at base and sit in scope; every reference file named by full path."""
    req = case["request_vi"]
    problems = []
    for tok in sorted(set(PATH_TOKEN.findall(req))):
        if not (seed / tok).exists():
            problems.append(f"request names missing path: {tok}")
        elif not in_scope(tok, case["scope"]):
            problems.append(f"request names out-of-scope path: {tok}")
    for rel in case["reference_files"]:
        if rel not in req:
            problems.append(f"request does not name reference file by full path: {rel}")
    return problems


def _check_variants(case: dict, seed: Path) -> tuple[list[str], dict[str, tuple[int, str]]]:
    ref_text = (case["_dir"] / "reference.patch").read_text(encoding="utf-8")
    blocks = split_blocks(ref_text)
    problems: list[str] = []
    rows: dict[str, tuple[int, str]] = {}
    for rel in case["reference_files"]:
        if not (seed / rel).is_file():
            problems.append(f"reference file not in base: {rel}")
    problems += request_path_problems(case, seed)
    for item in case["oracle_files"]:
        if (seed / item["dest"]).exists():
            problems.append(f"oracle dest exists in seed: {item['dest']}")

    rc, last, _ = _variant(case, seed, None)
    rows["base"] = (rc, last)
    if rc == 0:
        problems.append("oracle passes on base (must be red)")
    rc, last, touched = _variant(case, seed, ref_text)
    rows["reference"] = (rc, last)
    if rc != 0:
        problems.append("oracle fails on reference (must be green)")
    if touched != sorted(case["reference_files"]):
        problems.append(f"reference touched {touched} != reference_files")
    bad = [p for p in touched if not in_scope(p, case["scope"])]
    if bad:
        problems.append(f"reference outside scope: {bad}")
    if len(blocks) != len(case["reference_files"]):
        problems.append("patch block count != reference_files")
    if len(blocks) < 2:
        problems.append("multifile case needs >= 2 reference files")
    else:
        for path, _ in blocks:
            partial = "".join(b for p, b in blocks if p != path)
            rc, last, _ = _variant(case, seed, partial)
            rows[f"without:{path}"] = (rc, last)
            if rc == 0:
                problems.append(f"oracle green without {path} (file not needed)")
    return problems, rows


def case_hash(case_dir: Path) -> str:
    """sha256 over sorted relpath + bytes of every file in a case dir."""
    h = hashlib.sha256()
    for p in sorted(case_dir.rglob("*")):
        if p.is_file():
            h.update(p.relative_to(case_dir).as_posix().encode())
            h.update(b"\0" + p.read_bytes() + b"\0")
    return h.hexdigest()


def seal(root: Path, heldout_ids: list[str]) -> dict:
    """Write split.json with per-case hashes for held-out; manifest hash covers all entries."""
    cases = {c["id"]: c for c in load_cases(root)}
    entries = []
    for cid in sorted(cases):
        held = cid in heldout_ids
        entries.append({"id": cid, "group": cases[cid]["group"], "split": "heldout" if held else "dev",
                        "sha256": case_hash(cases[cid]["_dir"])})
    manifest = hashlib.sha256(json.dumps(entries, sort_keys=True).encode()).hexdigest()
    doc = {"version": 1, "manifest_sha256": manifest, "cases": entries}
    (root / "split.json").write_text(json.dumps(doc, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    return doc


def check_split(root: Path, check_seal: bool = False) -> list[str]:
    """Problems with split.json: counts, per-group quota, held-out per group, optional hash match."""
    doc = json.loads((root / "split.json").read_text(encoding="utf-8"))
    entries = doc["cases"]
    problems = []
    if len(entries) != PER_GROUP * len(GROUPS):
        problems.append(f"{len(entries)} cases, want {PER_GROUP * len(GROUPS)}")
    held = [e for e in entries if e["split"] == "heldout"]
    if len(held) != HELDOUT_TOTAL:
        problems.append(f"{len(held)} held-out, want {HELDOUT_TOTAL}")
    for g in GROUPS:
        if sum(e["group"] == g for e in entries) != PER_GROUP:
            problems.append(f"group {g} not {PER_GROUP} cases")
        if not any(e["group"] == g for e in held):
            problems.append(f"group {g} has no held-out case")
    if hashlib.sha256(json.dumps(entries, sort_keys=True).encode()).hexdigest() != doc["manifest_sha256"]:
        problems.append("manifest hash mismatch")
    if check_seal:
        for e in entries:
            if case_hash(root / "cases" / e["id"]) != e["sha256"]:
                problems.append(f"hash mismatch: {e['id']}")
    return problems


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=["verify", "seal", "split"])
    ap.add_argument("--root", type=Path, required=True)
    ap.add_argument("--repo", type=Path)
    ap.add_argument("--ids", default="")
    ap.add_argument("--heldout", action="store_true", help="verify: include held-out cases")
    ap.add_argument("--heldout-ids", default="", help="seal: comma list")
    ap.add_argument("--check-seal", action="store_true")
    ap.add_argument("-v", action="store_true", help="verify: print oracle rc + last line per variant")
    a = ap.parse_args(argv)
    if a.cmd == "seal":
        doc = seal(a.root, [x for x in a.heldout_ids.split(",") if x])
        print(json.dumps({"manifest_sha256": doc["manifest_sha256"]}))
        return 0
    if a.cmd == "split":
        probs = check_split(a.root, a.check_seal)
        print("\n".join(probs) or "split OK")
        return 1 if probs else 0
    if not a.repo:
        ap.error("verify needs --repo")
    want = {x for x in a.ids.split(",") if x}
    sealed = set()
    if (a.root / "split.json").exists():
        sealed = {e["id"] for e in json.loads((a.root / "split.json").read_text(encoding="utf-8"))["cases"] if e["split"] == "heldout"}
    if want & sealed and not a.heldout:
        print(f"held-out ids need --heldout: {sorted(want & sealed)}", file=sys.stderr)
        return 2
    results = []
    for case in load_cases(a.root, skip=set() if a.heldout else sealed):
        if want and case["id"] not in want:
            continue
        res = check_case(case, a.repo)
        results.append(res)
        print(f"{'OK  ' if res['ok'] else 'FAIL'} {res['id']} {res['problems'] or ''}")
        if a.v:
            for name, (rc, last) in res["rows"].items():
                print(f"      {name}: rc={rc} {last}")
    return 0 if all(r["ok"] for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
