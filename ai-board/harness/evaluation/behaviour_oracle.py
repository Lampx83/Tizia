"""Eval-owned behaviour checks (Gate 5 primitives): red on base, green on gold, versioned corpus. Checks never enter worker state."""
from __future__ import annotations

import hashlib
import json
import subprocess
import tempfile
from pathlib import Path

from evaluation import eval_corpus
from gate5 import checks as gate_checks

PREFIX = "oracle-"


def _rgb(hex_color: str) -> str:
    h = hex_color.lstrip("#")
    h = "".join(c * 2 for c in h) if len(h) == 3 else h
    return "rgb({}, {}, {})".format(*(int(h[i:i + 2], 16) for i in (0, 2, 4)))


def derive(case: dict) -> list[dict]:
    """Primitive checks from the case's gold facts; [] when the change type has no behaviour reading."""
    path, out = "/" + case["file"].removeprefix("public/"), []
    for change in case["spec"]:
        f, kind = change.get("facts", {}), change["type"]
        if kind == "replace_text":
            out += [{"primitive": "text_present", "path": path, "text": f["new"]}, {"primitive": "text_absent", "path": path, "text": f["old"]}]
        elif kind == "remove_element":
            out.append({"primitive": "text_absent", "path": path, "text": f["old"]})
        elif kind == "insert_text":
            out.append({"primitive": "text_present", "path": path, "text": f["new"]})
        elif kind == "add_block":
            out += [{"primitive": "text_present", "path": path, "text": f[k]} for k in ("title", "body")]
        elif kind == "change_link":
            out.append({"primitive": "selector_exists", "path": path, "selector": f'a[href="{f["new"]}"]'})
        elif kind == "css_color":
            out.append({"primitive": "computed_style", "path": path, "selector": f["selector"], "prop": "color", "value": _rgb(f["new"])})
        elif kind == "size_hide":
            prop, value = ("font-size", f"{f['new']}px") if f.get("variant") == "size" else ("display", "none")
            out.append({"primitive": "computed_style", "path": path, "selector": f["selector"], "prop": prop, "value": value})
        elif kind == "new_page":
            out += [{"primitive": "http_status", "path": path, "status": 200}, {"primitive": "text_present", "path": path, "text": f["body"]}]
    return out


class Unrunnable(RuntimeError):
    """Check needs a probe the caller did not supply."""


def verdict(items: list[dict], file: str, html: str | None, dom_probe=None) -> bool:
    """All checks green on one served page, run by the Gate 5 interpreter. html None = page absent (404)."""
    from gate5 import verify
    with tempfile.TemporaryDirectory(prefix="oracle-site-") as tmp:
        site = Path(tmp)
        if html is not None:
            target = site / file.removeprefix("public/")
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(html.encode("utf-8"))
        base = site.as_uri()

        def http(url):
            page = site / url[len(base):].lstrip("/")
            return (200, page.read_bytes()) if page.is_file() else (404, b"")

        def dom(url, selector, prop):
            if dom_probe is None:
                raise Unrunnable("dom probe missing")
            return dom_probe(url, selector, prop)

        def no_node(_file):
            raise Unrunnable("node_test not served offline")
        return all(verify._check_passes(c, base, http, dom, no_node) for c in items)


def git_base(source):
    """read_base(case): page at case.base_sha, None when absent there."""
    def read(case):
        r = subprocess.run(["git", "show", f"{case['base_sha']}:{case['file']}"], cwd=source, capture_output=True, stdin=subprocess.DEVNULL)
        return r.stdout.decode("utf-8") if r.returncode == 0 else None
    return read


def gold_html(case: dict, base: str | None) -> str:
    return case["gold"]["code"] if "code" in case["gold"] else eval_corpus.apply_gold(base, case["gold"]["edits"])


def _sealed(case: dict, sealed) -> bool:
    return case.get("split") == "heldout" or case["id"] in sealed


def build(root: Path, seed: int, read_base, dom_probe=None, sealed=()) -> dict:
    """Keep dev cases whose derived checks are red on base and green on gold; write corpus/oracle-<hash>/ once, never overwrite.
    Reads only <root>/corpus/full-s<seed>/cases.json; held-out cases and ids in `sealed` are skipped unopened."""
    source = Path(root) / "corpus" / f"full-s{seed}" / "cases.json"
    cases = [c for c in json.loads(source.read_text(encoding="utf-8")) if not _sealed(c, sealed)]
    kept, dropped = {}, []
    for case in cases:
        try:
            items = derive(case)
            if not items:
                raise ValueError("no behaviour check for this change type")
            if bad := next((p for c in items if (p := gate_checks.problem(c))), None):
                raise ValueError(f"invalid check: {bad}")
            base = read_base(case)
            if verdict(items, case["file"], base, dom_probe):
                raise ValueError("check green on base")
            if not verdict(items, case["file"], gold_html(case, base), dom_probe):
                raise ValueError("check red on gold")
            kept[case["id"]] = items
        except Unrunnable as error:
            dropped.append({"id": case["id"], "reason": f"unrunnable: {error}"})
        except (ValueError, RuntimeError) as error:
            dropped.append({"id": case["id"], "reason": str(error)})
    body = json.dumps(kept, ensure_ascii=False, indent=2, sort_keys=True).encode("utf-8")
    version = hashlib.sha256(body).hexdigest()[:16]
    out = source.parent.parent / f"{PREFIX}{version}"
    manifest = {"version": version, "seed": seed, "parent_cases_sha": hashlib.sha256(source.read_bytes()).hexdigest(),
                "kept": sorted(kept), "dropped": dropped}
    if (out / "behaviour.json").exists():
        if (out / "behaviour.json").read_bytes() != body:
            raise RuntimeError(f"{out.name} already exists with different content")
    else:
        out.mkdir(parents=True)
        (out / "behaviour.json").write_bytes(body)
        (out / "manifest.json").write_bytes(json.dumps(manifest, ensure_ascii=False, indent=2).encode("utf-8"))
    return {**manifest, "dir": str(out)}


def load(root: Path, version: str) -> dict[str, list[dict]]:
    return json.loads((Path(root) / "corpus" / f"{PREFIX}{version}" / "behaviour.json").read_text(encoding="utf-8"))


def disagreements(rows: list[dict]) -> list[dict]:
    """Rows where the behaviour verdict (row.oracle) and the gold match (row.gold_match) differ."""
    return [{"case": r["case"], "behaviour": bool(r["oracle"]), "gold_match": bool(r["gold_match"])}
            for r in rows if "gold_match" in r and bool(r["oracle"]) != bool(r["gold_match"])]
