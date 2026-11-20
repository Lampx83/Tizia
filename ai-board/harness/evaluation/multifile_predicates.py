#!/usr/bin/env python3
"""Pure multi-file predicate grader: (tree before, tree after, case id) -> (ok, reason). No model, no Docker.

python -m evaluation.multifile_predicates   # two-way self-check of the tuning set, exit 1 on any problem
"""
from __future__ import annotations

import json
import posixpath
import re
import sys
from pathlib import Path
from typing import Callable

from evaluation.pipeline import REPO

DATA_FILE = Path(__file__).with_name("multifile_expectations.json")
Verdict = tuple[bool, str]
Reader = Callable[[str], "str | None"]
BARRED = ("held-out", "heldout", "sealed")
IMPORT = re.compile(r"""import\s+([^'";]*?)\s*from\s*['"](\.{1,2}/[^'"]+)['"]|import\s*['"](\.{1,2}/[^'"]+)['"]""")
LINK = re.compile(r"""(?:src|href)\s*=\s*["']([^"'#?]+)["']""")
ASSET_EXT = (".js", ".mjs", ".css", ".json", ".html", ".png", ".jpg", ".svg", ".webp", ".ico")


def load_expectations(path: Path = DATA_FILE) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def repo_read(rel: str) -> str | None:
    p = REPO / rel
    return p.read_text(encoding="utf-8") if p.is_file() else None


def _n(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _has(text: str, lit: str) -> bool:
    return _n(lit) in _n(text)


def _imports(text: str) -> set[tuple[str, str]]:
    """(relative spec, imported name or '') pairs."""
    out: set[tuple[str, str]] = set()
    for m in IMPORT.finditer(text):
        spec = m.group(2) or m.group(3)
        braces = re.search(r"\{([^}]*)\}", m.group(1) or "")
        names = [n.strip().split(" as ")[0].strip() for n in braces.group(1).split(",")] if braces else []
        names = [n for n in names if n]
        out.update((spec, n) for n in names) if names else out.add((spec, ""))
    return out


def _links(text: str) -> set[str]:
    return {s for s in LINK.findall(text) if s.lower().endswith(ASSET_EXT) and "://" not in s and not s.startswith("//")}


def _exports(text: str, name: str) -> bool:
    n = re.escape(name)
    return bool(re.search(rf"export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+{n}\b", text)
                or re.search(rf"export\s*\{{[^}}]*\b{n}\b", text))


def _resolve_problems(path: str, before: str, after: str, read: Reader, tree: dict) -> str:
    """New relative imports and local html links of one changed file must resolve to real files and exports."""
    def text_of(p: str) -> str | None:
        return tree[p] if p in tree else read(p)

    if path.endswith((".js", ".mjs", ".html")):
        for spec, name in sorted(_imports(after) - _imports(before)):
            target = posixpath.normpath(posixpath.join(posixpath.dirname(path), spec))
            body = text_of(target)
            if body is None:
                return f"{path}: import does not resolve: {spec}"
            if name and not _exports(body, name):
                return f"{path}: {target} does not export {name}"
    if path.endswith(".html"):
        for spec in sorted(_links(after) - _links(before)):
            target = posixpath.normpath("public" + spec if spec.startswith("/") else posixpath.join(posixpath.dirname(path), spec))
            if text_of(target) is None:
                return f"{path}: link does not resolve: {spec}"
    return ""


def grade(before: dict, after: dict, case_id: str, expectations: dict | None = None, read: Reader = repo_read) -> Verdict:
    """Trees are {path: text}. Allowed file set, per-file literals, cross-references, new links; ok plus reason."""
    exp = (expectations or load_expectations())["cases"].get(case_id)
    if exp is None:
        return False, "no_expectation"
    allowed = set(exp["files"]) | set(exp.get("create", ()))
    for p in before:
        if p not in after:
            return False, f"file deleted: {p}"
    for p, text in after.items():
        if before.get(p) != text and p not in allowed:
            return False, f"file changed outside allowed set: {p}"
    for p in exp.get("must_change", exp["files"]):
        if after.get(p) == before.get(p):
            return False, f"file not changed: {p}"
    for lit in exp.get("literals", ()):
        if not _has(after.get(lit["file"], ""), lit["text"]):
            return False, f"literal not verbatim in {lit['file']}: {lit['text']!r}"
    for lit in exp.get("gone", ()):
        if _has(after.get(lit["file"], ""), lit["text"]):
            return False, f"old literal still in {lit['file']}: {lit['text']!r}"
    for lit in exp.get("keep", ()):
        if not _has(after.get(lit["file"], ""), lit["text"]):
            return False, f"kept literal removed from {lit['file']}: {lit['text']!r}"
    for d in exp.get("defined", ()):
        if not re.search(d["def"], after.get(d["file"], "")):
            return False, f"not defined in {d['file']}: {d['def']}"
    for r in exp.get("refs", ()):
        if not _has(after.get(r["use_file"], ""), r["use"]):
            return False, f"reference missing in {r['use_file']}: {r['use']!r}"
        if not re.search(r["def"], after.get(r["def_file"], "")):
            return False, f"reference target not defined in {r['def_file']}: {r['def']}"
    for p in sorted(allowed):
        if p in after and after[p] != before.get(p):
            bad = _resolve_problems(p, before.get(p, ""), after[p], read, after)
            if bad:
                return False, bad
    return True, ""


def _apply(text: str, pairs: list) -> str | None:
    for old, new in pairs:
        if text.count(old) != 1:
            return None
        text = text.replace(old, new)
    return text


def self_check(expectations: dict | None = None, seed: Reader = repo_read) -> list[str]:
    """Problems list: every case must fail on seed, pass on its fix, and need each file the fix edits."""
    data = expectations or load_expectations()
    cases = data["cases"]
    problems = []
    if data.get("set") != "tuning":
        problems.append("data file is not marked set=tuning")
    if len(cases) != data.get("expected_cases"):
        problems.append(f"{len(cases)} cases, expected {data.get('expected_cases')}")
    for cid, exp in cases.items():
        names = [*exp["files"], *exp.get("create", ()), *(lit["file"] for lit in exp.get("literals", ()))]
        if any(b in n.lower() for n in names for b in BARRED):
            problems.append(f"{cid}: path under a held-out or sealed split")
            continue
        missing = [p for p in exp["files"] if seed(p) is None]
        if missing:
            problems.append(f"{cid}: file missing in seed: {missing}")
            continue
        before = {p: seed(p) for p in exp["files"]}
        for lit in exp.get("literals", ()):
            if _has(before.get(lit["file"], ""), lit["text"]):
                problems.append(f"{cid}: literal already in seed: {lit['text']!r}")
        if grade(before, before, cid, data, read=seed)[0]:
            problems.append(f"{cid}: expectation passes on the untouched seed")
        edits = {p: _apply(before[p], pairs) for p, pairs in exp["fix"].items()}
        if any(v is None for v in edits.values()):
            problems.append(f"{cid}: sample fix does not apply exactly once")
            continue
        fixed = {**before, **edits, **exp.get("create_text", {})}
        ok, why = grade(before, fixed, cid, data, read=seed)
        if not ok:
            problems.append(f"{cid}: sample fix rejected: {why}")
            continue
        for p in exp["fix"]:
            if grade(before, {**fixed, p: before[p]}, cid, data, read=seed)[0]:
                problems.append(f"{cid}: ablation: fix still passes without edits to {p}")
        pkg = seed("package.json") or ""
        if grade({**before, "package.json": pkg}, {**fixed, "package.json": pkg + "\n"}, cid, data, read=seed)[0]:
            problems.append(f"{cid}: stray change outside the allowed set accepted")
    return problems


def main() -> int:
    data = load_expectations()
    problems = self_check(data)
    print("\n".join(problems) or f"ok: {len(data['cases'])} tuning cases fail on seed and pass on sample fix")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
