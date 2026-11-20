"""Real requests / failed runs -> eval case drafts (pending_approval): PII removed, pinned base, red-on-base green-on-fix check.

CLI (no model call):
  build   --requests in.jsonl --source REPO --out drafts.jsonl [--corpus dev-cases.json --report r.json]
  approve --drafts drafts.jsonl --id ID --by OWNER
  publish --drafts drafts.jsonl --root ROOT
The builder never approves or publishes; approve and publish are separate owner commands.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from evaluation import behaviour_oracle as bo
from evaluation import eval_corpus, failed_cases
from gates import guard
from verification import checks as gate_checks

PENDING, APPROVED = "pending_approval", "approved"
PIN = re.compile(r"[0-9a-f]{40}")
GAP = 0.10
_META = ("status", "approved_by", "approved_at", "content_sha")
_UP = "A-ZĐÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĨŨƠƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸ"
_WORD = rf"[{_UP}][^\W\d_]*"
SURNAMES = "Nguyễn Trần Lê Phạm Hoàng Huỳnh Phan Vũ Võ Đặng Bùi Đỗ Hồ Ngô Dương Lý Đinh Trương Đào Mai Lương Tô Cao".split()
# Heuristic: surname-led or cue-led capitalised runs. Misses names without either; the owner review is the backstop.
_NAME = [re.compile(rf"(?<![\w]){s}(?: {_WORD}){{1,3}}") for s in SURNAMES] + [
    re.compile(rf"(?<=\b{cue} )({_WORD})(?: {_WORD}){{1,3}}") for cue in ("là", "tên", "bạn", "anh", "chị", "thầy", "cô", "ông", "bà")]
_ID = [re.compile(p, re.I) for p in (
    r"(?:mssv|msv|m[ãa] s[ốo] sinh vi[êe]n|m[ãa] sinh vi[êe]n|m[ãa] h[ọo]c sinh|m[ãa] sv|student id)\s*[:#]?\s*[A-Za-z0-9]+",
)] + [re.compile(r"\b[A-Z]\d{2}[A-Z]{2,4}\d{3,4}\b")]
MASK = "[ẩn]"


def redact_pii(text: str) -> str:
    """Mask email, phone, citizen id, labelled student id, Vietnamese full names."""
    for p in (*guard._PII, *_ID, *_NAME):
        text = p.sub(MASK, text or "")
    return text


def _has_contact(text: str) -> bool:
    return any(p.search(text) for p in (*guard._PII, *_ID))


def _sha(obj) -> str:
    return hashlib.sha256(json.dumps(obj, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()


def content_sha(case: dict) -> str:
    return _sha({k: v for k, v in case.items() if k not in _META})


def _draft(rec: dict, kind: str, items: list[dict]) -> dict:
    body = {"title": redact_pii(rec.get("title") or ""), "detail": redact_pii(rec.get("detail") or ""), "base_sha": rec["base_sha"],
            "file": rec["file"], "spec": rec["spec"], "gold": rec["gold"]}
    src = rec.get("source") or {}
    case = {"id": "real-" + _sha(body)[:16], "kind": kind, "split": "heldout" if kind in eval_corpus.HELDOUT_TYPES else "dev",
            **body, "source": {"kind": src.get("kind"), "ref": redact_pii(str(src.get("ref") or ""))}, "behaviour": items}
    return {**case, "status": PENDING, "content_sha": content_sha(case)}


def _check(rec: dict, read_base, dom_probe) -> tuple[str, list[dict]]:
    """(kind, behaviour checks) or ValueError(reason)."""
    if not rec.get("gold") or not rec.get("spec"):
        raise ValueError("no fix to check")
    if not isinstance(rec.get("base_sha"), str) or not PIN.fullmatch(rec["base_sha"]):
        raise ValueError("base_sha must be a pinned 40-hex commit")
    if _has_contact(json.dumps([rec["spec"], rec["gold"]], ensure_ascii=False)):
        raise ValueError("pii in fix text")
    case = {"id": rec["id"], "file": rec["file"], "spec": rec["spec"], "gold": rec["gold"], "base_sha": rec["base_sha"]}
    items = bo.derive(case)
    if not items:
        raise ValueError("no behaviour check for this change type")
    if bad := next((p for c in items if (p := gate_checks.problem(c))), None):
        raise ValueError(f"invalid check: {bad}")
    base = read_base(case)
    try:
        if bo.verdict(items, rec["file"], base, dom_probe):
            raise ValueError("check green on base")
        fixed = bo.gold_html(case, base)
    except bo.Unrunnable as error:
        raise ValueError(f"unrunnable: {error}") from error
    except (TypeError, KeyError, RuntimeError) as error:
        raise ValueError(f"fix does not apply: {error}") from error
    try:
        green = bo.verdict(items, rec["file"], fixed, dom_probe)
    except bo.Unrunnable as error:
        raise ValueError(f"unrunnable: {error}") from error
    if not green:
        raise ValueError("check red on fix")
    return rec["spec"][0]["type"], items


def build_drafts(recs: list[dict], read_base, dom_probe=None) -> dict:
    """Request records -> {drafts, dropped, real_kinds, warnings}; each kept draft is red on base, green on its fix."""
    drafts: dict[str, dict] = {}
    dropped, real = [], Counter()
    for rec in recs:
        kind = (rec.get("spec") or [{}])[0].get("type") or rec.get("kind") or "unknown"
        real[kind] += 1
        try:
            kind, items = _check(rec, read_base, dom_probe)
        except ValueError as error:
            dropped.append({"id": rec.get("id"), "reason": str(error)})
            continue
        draft = _draft(rec, kind, items)
        drafts.setdefault(draft["id"], draft)
    rows = list(drafts.values())
    shared = eval_corpus.page_overlap(rows)
    return {"drafts": rows, "dropped": dropped, "real_kinds": dict(real),
            "warnings": [f"page in both proposed splits: {f}" for f in shared]}


def write_drafts(drafts: list[dict], out) -> int:
    """Append drafts whose id is new; refuse sealed/heldout output paths."""
    return failed_cases.append_new(drafts, out)


def _rows(path) -> list[dict]:
    return [json.loads(line) for line in Path(path).read_text(encoding="utf-8").splitlines() if line.strip()]


def approve(path, case_id: str, by: str) -> None:
    """Mark one draft approved by the owner; refuse if its content changed since the builder wrote it."""
    rows = _rows(path)
    case = next((r for r in rows if r["id"] == case_id), None)
    if case is None:
        raise KeyError(case_id)
    if case["content_sha"] != content_sha(case):
        raise ValueError(f"{case_id} was edited after the builder wrote it")
    case.update(status=APPROVED, approved_by=by, approved_at=datetime.now(timezone.utc).isoformat(timespec="seconds"))
    Path(path).write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows), encoding="utf-8")


def publish(path, root) -> dict:
    """Approved dev drafts -> corpus/real-<hash>/ (new version per content, never overwritten). Held-out-type cases are listed, not written."""
    approved = sorted((r for r in _rows(path) if r["status"] == APPROVED), key=lambda r: r["id"])
    if bad := [r["id"] for r in approved if r["content_sha"] != content_sha(r)]:
        raise ValueError(f"edited after the builder wrote them: {bad}")
    dev = [r for r in approved if r["split"] == "dev"]
    body = json.dumps(dev, ensure_ascii=False, indent=2).encode("utf-8")
    version = hashlib.sha256(body).hexdigest()[:16]
    out = Path(root) / "corpus" / f"real-{version}"
    manifest = {"version": version, "cases": [r["id"] for r in dev], "heldout_pending_vault": [r["id"] for r in approved if r["split"] != "dev"]}
    if (out / "cases.json").exists():
        if (out / "cases.json").read_bytes() != body:
            raise RuntimeError(f"{out.name} already exists with different content")
    else:
        out.mkdir(parents=True)
        (out / "cases.json").write_bytes(body)
        (out / "behaviour.json").write_bytes(json.dumps({r["id"]: r["behaviour"] for r in dev}, ensure_ascii=False, indent=2, sort_keys=True).encode("utf-8"))
        (out / "manifest.json").write_bytes(json.dumps(manifest, ensure_ascii=False, indent=2).encode("utf-8"))
    return {**manifest, "dir": str(out)}


def corpus_kinds(path) -> dict[str, int]:
    """Request-type counts of a dev cases.json; refuse sealed/heldout paths and held-out rows."""
    if any(m in str(path).lower() for m in failed_cases.SEALED_MARKERS):
        raise ValueError(f"sealed/heldout path: {path}")
    rows = json.loads(Path(path).read_text(encoding="utf-8"))
    return dict(Counter(r["kind"] for r in rows if r.get("split") != "heldout"))


def compare(corpus: dict, real: dict, threshold: float = GAP) -> list[dict]:
    """Per request type: share in the set vs in real requests; gap when they differ by >= threshold."""
    ct, rt = sum(corpus.values()) or 1, sum(real.values()) or 1
    rows = []
    for kind in sorted(set(corpus) | set(real)):
        c, r = round(corpus.get(kind, 0) / ct, 4), round(real.get(kind, 0) / rt, 4)
        rows.append({"kind": kind, "corpus": c, "real": r, "delta": round(r - c, 4), "gap": abs(r - c) >= threshold})
    return rows


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="cmd", required=True)
    b = sub.add_parser("build")
    b.add_argument("--requests", required=True)
    b.add_argument("--source", required=True, help="git repo holding the pinned base commits")
    b.add_argument("--out", required=True)
    b.add_argument("--corpus", help="dev cases.json to compare against")
    b.add_argument("--report")
    a = sub.add_parser("approve")
    a.add_argument("--drafts", required=True)
    a.add_argument("--id", required=True)
    a.add_argument("--by", required=True)
    p = sub.add_parser("publish")
    p.add_argument("--drafts", required=True)
    p.add_argument("--root", required=True)
    args = parser.parse_args(argv)
    if args.cmd == "approve":
        approve(args.drafts, args.id, args.by)
        print(f"{args.id} approved by {args.by}")
    elif args.cmd == "publish":
        out = publish(args.drafts, args.root)
        print(f"version {out['version']}: {len(out['cases'])} case, dir {out['dir']}")
    else:
        result = build_drafts(_rows(args.requests), bo.git_base(args.source))
        written = write_drafts(result["drafts"], args.out)
        report = {"drafts": len(result["drafts"]), "written": written, "dropped": result["dropped"],
                  "warnings": result["warnings"], "real_kinds": result["real_kinds"]}
        if args.corpus:
            kinds = Counter(corpus_kinds(args.corpus)) + Counter(d["kind"] for d in result["drafts"])
            report["comparison"] = compare(dict(kinds), result["real_kinds"])
        if args.report:
            Path(args.report).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"{written} draft mới (pending_approval), {len(result['dropped'])} bị loại")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
