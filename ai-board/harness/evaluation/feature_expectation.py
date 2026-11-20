#!/usr/bin/env python3
"""Hidden expectation for feature cases: file predicates + browser checks + model-criteria comparison. No model, no Docker.

python -m evaluation.feature_expectation [data.json]   # two-way self-check, exit 1 on any problem
Browser checks run on the after tree served from a temp dir; default DOM probe is a static approximation
(tag/#id/.class/[attr], style rules), pass dom_probe= a real-browser probe (gates.verify.probe_dom shape) to run for real.
"""
from __future__ import annotations

import json
import re
import sys
import tempfile
import unicodedata
from html.parser import HTMLParser
from pathlib import Path

from evaluation import behaviour_oracle as BO
from evaluation import expectation_predicates as EP
from verification import checks as gate_checks

DATA_FILE = Path(__file__).with_name("feature_tuning.json")
SETS = ("tuning", "validation")
BROWSER = ("text_present", "text_absent", "http_status", "selector_exists", "computed_style")
MAX_ANSWERS = 2
Verdict = tuple[bool, str]
_BLOCK = re.compile(r"^--- a/(\S+)\n\+\+\+ b/(\S+)$", re.M)
_HUNK = re.compile(r"^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@")
_TOKEN = re.compile(r"[#.][\w-]+|\[[^\]]+\]")
_VOID = {"meta", "link", "input", "br", "img", "hr", "source", "area", "base", "col", "wbr"}


def load(path: Path = DATA_FILE) -> dict:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def describe(check: dict) -> str:
    return " ".join(str(check[k]) for k in ("primitive", "path", "selector", "prop", "text", "value", "status") if k in check)


def paths_of(case: dict) -> list[str]:
    return [f["path"] for f in case["files"]]


def _served(path: str) -> str:
    return "public/" + path.lstrip("/")


def apply_fix(tree: dict, fix: list) -> dict:
    """Hand-written sample: {path, edits:[[old,new]]} each old exactly once, or {path, create}."""
    out = dict(tree)
    for step in fix:
        path = step["path"]
        if "create" in step:
            if path in out:
                raise ValueError(f"{path}: create over an existing file")
            out[path] = step["create"]
            continue
        text = out.get(path)
        if text is None:
            raise ValueError(f"{path}: not in tree")
        for old, new in step["edits"]:
            if text.count(old) != 1:
                raise ValueError(f"{path}: edit anchor not exactly once: {old[:40]!r}")
            text = text.replace(old, new)
        out[path] = text
    return out


def apply_diff(before: dict, diff: str) -> dict:
    """difflib unified diff (n=2, no trailing-newline markers) applied to the seed tree."""
    out = dict(before)
    starts = [m.start() for m in _BLOCK.finditer(diff)] + [len(diff)]
    for begin, end in zip(starts, starts[1:]):
        block = diff[begin:end]
        path = _BLOCK.match(block).group(2)
        old = before.get(path, "").splitlines()
        new, pos = [], 0
        for line in block.splitlines()[2:]:
            hunk = _HUNK.match(line)
            if hunk:
                start0 = int(hunk.group(1)) - (1 if hunk.group(2) != "0" else 0)
                new += old[pos:start0]
                pos = start0
            elif line[:1] == " ":
                new.append(line[1:])
                pos += 1
            elif line[:1] == "-":
                pos += 1
            elif line[:1] == "+":
                new.append(line[1:])
        new += old[pos:]
        out[path] = "\n".join(new) + ("\n" if new and (path not in before or before[path].endswith("\n")) else "")
    return out


def _regions(specs: list[dict], seed: str, text: str) -> tuple[list[str] | None, str]:
    """(middles, error): text outside the anchored regions must be byte-identical to the seed."""
    spans = []
    for spec in specs:
        a, b = spec.get("after"), spec.get("before")
        for anchor in (a, b):
            if anchor and seed.count(anchor) != 1:
                return None, f"anchor not unique in seed: {anchor[:40]!r}"
        spans.append((seed.index(a) + len(a) if a else 0, seed.index(b) if b else len(seed)))
    if any(i > j for i, j in spans) or any(spans[k][1] > spans[k + 1][0] for k in range(len(spans) - 1)):
        return None, "anchors overlap or are out of order"
    segs = [seed[: spans[0][0]]] + [seed[spans[k][1]: spans[k + 1][0]] for k in range(len(spans) - 1)] + [seed[spans[-1][1]:]]
    if not text.startswith(segs[0]) or not text.endswith(segs[-1]) or len(text) < len(segs[0]) + len(segs[-1]):
        return None, "change outside the allowed region"
    pos, middles = len(segs[0]), []
    for seg in segs[1:-1]:
        at = text.find(seg, pos)
        if at < 0:
            return None, "change outside the allowed region"
        middles.append(text[pos:at])
        pos = at + len(seg)
    middles.append(text[pos: len(text) - len(segs[-1])])
    return middles, ""


def _must_forbid(spec: dict, text: str, label: str) -> str:
    for rx in spec.get("must", []):
        if not re.search(rx, text, re.S):
            return f"{label}: missing {rx!r}"
    for rx in spec.get("forbid", []):
        if re.search(rx, text, re.S):
            return f"{label}: forbidden text {rx!r}"
    return ""


def _grade_file(spec: dict, before: dict, after: dict) -> str:
    path = spec["path"]
    if path not in after:
        return f"{path}: file missing"
    if "new" in spec:
        if path in before:
            return f"{path}: expected a new file"
        return _must_forbid(spec["new"], after[path], path)
    if path not in before:
        return f"{path}: not in seed"
    if after[path] == before[path]:
        return f"{path}: no change"
    if "edit" in spec:
        ok, why = EP._check(spec["edit"], before[path], after[path])
        return "" if ok else f"{path}: {why}"
    regions = spec.get("regions") or [{**(spec.get("region") or {}), "must": spec.get("must", []), "forbid": spec.get("forbid", [])}]
    middles, err = _regions(regions, before[path], after[path])
    if err:
        return f"{path}: {err}"
    for literal in spec.get("gone", []):
        if literal in after[path]:
            return f"{path}: old literal still present {literal!r}"
    return next((why for r, m in zip(regions, middles) if (why := _must_forbid(r, m, path))), "")


def grade_files(before: dict, after: dict, case: dict) -> Verdict:
    declared = set(paths_of(case))
    if all(after.get(p) == before.get(p) for p in declared):
        return False, "no change"
    for p in after:
        if p not in before and p not in declared:
            return False, f"new file outside the expectation: {p}"
    for p, text in before.items():
        if p not in declared and after.get(p) != text:
            return False, f"file changed outside the expectation: {p}"
    for spec in case["files"]:
        if why := _grade_file(spec, before, after):
            return False, why
    return True, ""


class _Dom(HTMLParser):
    def __init__(self):
        super().__init__()
        self.items, self.stack = [], []

    def handle_starttag(self, tag, attrs):
        self.items.append((tag, {k: v or "" for k, v in attrs}, tuple(self.stack)))
        if tag not in _VOID:
            self.stack.append((tag, dict(attrs)))

    def handle_endtag(self, tag):
        for k in range(len(self.stack) - 1, -1, -1):
            if self.stack[k][0] == tag:
                del self.stack[k:]
                return


def _compound(spec: str, tag: str, attrs: dict) -> bool:
    m = re.match(r"^([a-zA-Z][\w-]*)?", spec)
    if m.group(1) and m.group(1).lower() != tag:
        return False
    for tok in _TOKEN.findall(spec[m.end():]):
        if tok[0] == "#":
            ok = attrs.get("id") == tok[1:]
        elif tok[0] == ".":
            ok = tok[1:] in (attrs.get("class") or "").split()
        else:
            name, _, val = tok[1:-1].partition("=")
            ok = name.strip() in attrs and (not val or attrs[name.strip()] == val.strip().strip("\"'"))
        if not ok:
            return False
    return True


def _decl(attrs: dict, html: str, selector: str, prop: str) -> str | None:
    rule = EP.L._rule_body(html, selector)
    for body in (attrs.get("style"), rule.group(1) if rule else None):
        value = EP._decls(body).get(prop) if body else None
        if value:
            return BO._rgb(value) if re.fullmatch(r"#[0-9a-f]{3}|#[0-9a-f]{6}", value) else value
    return None


def _matches(parts: list[str], tag: str, attrs: dict, ancestors: tuple) -> bool:
    if not _compound(parts[-1], tag, attrs):
        return False
    need = len(parts) - 2
    for t, a in reversed(ancestors):
        if need >= 0 and _compound(parts[need], t, a):
            need -= 1
    return need < 0


def static_dom(site: Path, base: str):
    """Offline stand-in for the browser probe: existence by selector, style from the page's own rules."""
    def probe(url, selector, prop):
        html = (site / url[len(base):].lstrip("/")).read_text(encoding="utf-8")
        dom = _Dom()
        dom.feed(html)
        parts = [t for t in selector.split() if t != ">"]
        for tag, attrs, ancestors in dom.items:
            if _matches(parts, tag, attrs, ancestors):
                return True, _decl(attrs, html, selector, prop) if prop else None
        return False, None
    return probe


def browser_verdict(checks: list[dict], after: dict, dom_probe=None) -> Verdict:
    """All checks green on the served after tree; reason names the first red check."""
    from gates import verify
    with tempfile.TemporaryDirectory(prefix="feature-site-") as tmp:
        site = Path(tmp)
        for path, text in after.items():
            if path.startswith("public/"):
                target = site / path.removeprefix("public/")
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(text.encode("utf-8"))
        base = site.as_uri()

        def http(url):
            page = site / url[len(base):].lstrip("/")
            return (200, page.read_bytes()) if page.is_file() else (404, b"")

        probe = dom_probe or static_dom(site, base)

        def dom(url, selector, prop):
            if not http(url)[0] == 200:
                return False, None
            return probe(url, selector, prop)

        def no_node(_file):
            raise BO.Unrunnable("node_test not served offline")
        for check in checks:
            if not verify._check_passes(check, base, http, dom, no_node):
                return False, f"browser check red: {describe(check)}"
    return True, ""


def grade(before: dict, after: dict, case: dict, dom_probe=None) -> Verdict:
    ok, why = grade_files(before, after, case)
    return (ok, why) if not ok else browser_verdict(case["browser"], after, dom_probe)


def _norm(text) -> str:
    return re.sub(r"\s+", "", unicodedata.normalize("NFC", str(text or "")).casefold())


def _key(c: dict) -> tuple:
    return (c.get("primitive"), c.get("path", "").rstrip("/"), _norm(c.get("selector")), c.get("prop", ""), _norm(c.get("text") or c.get("value")), c.get("status"))


def _in_text(c: dict, text: str) -> bool:
    kind = c["primitive"]
    lit = {"text_present": "text", "text_absent": "text", "selector_exists": "selector", "computed_style": "value"}.get(kind)
    if lit:
        return _norm(c[lit]) in text and (kind != "computed_style" or _norm(c["selector"]) in text)
    return _norm(c["path"]) in text


def compare_criteria(case: dict, model: dict, after: dict | None = None, dom_probe=None) -> dict:
    """Hidden criteria vs model-written ones; any missing one makes it not ok, checks red on the sample are listed as wrong."""
    checks = [c for c in model.get("checks") or [] if isinstance(c, dict)]
    strings = [s for s in model.get("acceptance") or [] if isinstance(s, str)]
    blob = "\n".join(strings + [json.dumps(c, ensure_ascii=False) for c in checks])
    norms = [_norm(s) for s in strings]
    keys = {_key(c) for c in checks}
    missing = [describe(h) for h in case["browser"] if _key(h) not in keys and not any(_in_text(h, n) for n in norms)]
    missing += [f"state {m['id']}" for m in case.get("must_state", []) if not re.search(m["pattern"], blob, re.S | re.I)]
    wrong = []
    if after is not None:
        for c in checks:
            if c.get("primitive") != "node_test" and (gate_checks.problem(c) or not browser_verdict([c], after, dom_probe)[0]):
                wrong.append(describe(c))
    return {"ok": not missing, "missing": missing, "wrong": wrong}


def trees(case: dict, seed, diff: str = "") -> tuple[dict, dict]:
    """(seed tree, after tree) over declared files, served pages and files the diff touches."""
    paths = set(paths_of(case)) | {_served(c["path"]) for c in case["browser"]} | {m.group(2) for m in _BLOCK.finditer(diff)}
    before = {}
    for p in sorted(paths):
        try:
            before[p] = seed(p)
        except (OSError, KeyError):
            pass
    return before, apply_diff(before, diff)


def grade_record(case: dict, record: dict, seed=EP.read_seed, dom_probe=None) -> dict:
    """Record (diff + model criteria) -> hidden-expectation verdict; ok needs files, browser and criteria all green."""
    before, after = trees(case, seed, record.get("diff") or "")
    files_ok, files_why = grade_files(before, after, case)
    browser_ok, browser_why = browser_verdict(case["browser"], after, dom_probe) if files_ok else (False, "files red")
    criteria = compare_criteria(case, record.get("criteria") or {}, after if files_ok else None, dom_probe)
    return {"ok": files_ok and browser_ok and criteria["ok"], "files_ok": files_ok, "files_reason": files_why,
            "browser_ok": browser_ok, "browser_reason": browser_why, "criteria": criteria}


def _case_problems(case: dict, seed, dom_probe) -> list[str]:
    cid, out = case.get("id", "?"), []
    if not case.get("request"):
        out.append(f"{cid}: request empty")
    if len(case.get("answers") or []) > MAX_ANSWERS:
        out.append(f"{cid}: answers longer than {MAX_ANSWERS}")
    bad = [p for c in case.get("browser") or [] if (p := gate_checks.problem(c) or ("not a browser primitive" if c.get("primitive") not in BROWSER else None))]
    if not case.get("browser"):
        bad.append("no browser check")
    if bad:
        return out + [f"{cid}: invalid check: {bad[0]}"]
    before, _ = trees(case, seed)
    try:
        fixed = apply_fix(before, case["fix"])
    except ValueError as err:
        return out + [f"{cid}: sample fix does not apply: {err}"]
    if browser_verdict(case["browser"], before, dom_probe)[0]:
        out.append(f"{cid}: browser checks: every check passes on the untouched seed")
    if grade(before, before, case, dom_probe)[0]:
        out.append(f"{cid}: expectation passes on the untouched seed")
    ok, why = grade(before, fixed, case, dom_probe)
    if not ok:
        out.append(f"{cid}: sample fix rejected: {why}")
    perfect = {"acceptance": case.get("criteria_sample", []), "checks": case["browser"]}
    if not compare_criteria(case, perfect, fixed, dom_probe)["ok"]:
        out.append(f"{cid}: criteria not coverable by a model that states the sample checks")
    if compare_criteria(case, {"acceptance": [], "checks": []})["ok"]:
        out.append(f"{cid}: missing criteria not counted wrong")
    return out


def self_check(data: dict | None = None, seed=EP.read_seed, dom_probe=None) -> list[str]:
    """Problems list: every case fails on the seed, passes on its sample, and is marked tuning or validation."""
    data = data or load()
    problems = [] if data.get("set") in SETS else [f"set marker missing, need one of {SETS}"]
    ids = [c.get("id") for c in data["cases"]]
    problems += [f"{i}: duplicate id" for i in sorted({i for i in ids if ids.count(i) > 1})]
    for case in data["cases"]:
        problems += _case_problems(case, seed, dom_probe)
    return problems


def main() -> int:
    data = load(Path(sys.argv[1])) if len(sys.argv) > 1 else load()
    problems = self_check(data)
    print("\n".join(problems) or f"ok: {len(data['cases'])} {data['set']} cases fail on seed and pass on sample fix")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
