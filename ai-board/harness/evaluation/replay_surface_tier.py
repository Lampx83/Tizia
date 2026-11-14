"""LF/189 stage-isolated replay: tier decision only, deterministic, no model. CLI: python -m evaluation.replay_surface_tier [--corpus DIR] [--out FILE]."""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import path_policy
from runtime import levels

HARNESS = Path(__file__).resolve().parents[1]
REPO = HARNESS.parents[1]
LF189_COMMIT = "78c6d601"
BASELINE_FILES = ("ai-board/harness/path_policy.py", "ai-board/harness/runtime/__init__.py",
                  "ai-board/harness/runtime/levels.py", "server/ai-board/guard-lexicon.json")
PASS, FAIL, NOT_MEASURABLE = "PASS", "FAIL at stage", "NOT MEASURABLE"
# Độc lập với path_policy.FORBIDDEN_CONTEXTS: spec của ticket, để bắt việc danh sách trong code bị thu hẹp.
MUST_NEVER_OPEN = ("billing", "payment", "economy", "security", "identity", "auth", "session", "admin")
SENSITIVE_HINT = {"parent-report": "dữ liệu phụ huynh/học sinh", "teacher": "dữ liệu học sinh", "ugc": "nội dung người dùng",
                  "safety": "an toàn nội dung", "integration": "webhook/secret đối tác", "feature-gate": "gating gói trả phí",
                  "multiplayer": "realtime/ws", "live-quiz": "realtime/ws", "ai-agent": "gọi model/ngoài"}
_RUNNER = """\
import json, sys
import path_policy
from runtime import levels
out = []
for sc in json.load(sys.stdin):
    files = sc["files"]
    out.append(levels.requirements(sc["plan"], lambda p: files.get(p)))
json.dump(out, sys.stdout, sort_keys=True)
"""


def _git(*args) -> str:
    return subprocess.run(["git", "-C", str(REPO), *args], capture_output=True, text=True, encoding="utf-8", check=True).stdout


def baseline_outputs(scenarios: list[dict]) -> list | None:
    """requirements() của code trước LF/189 cho từng scenario; None nếu không dựng được baseline."""
    try:
        with tempfile.TemporaryDirectory() as tmp:
            for rel in BASELINE_FILES:
                dest = Path(tmp) / rel
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(_git("show", f"{LF189_COMMIT}^:{rel}"), encoding="utf-8")
            (Path(tmp) / "ai-board/harness/_run.py").write_text(_RUNNER, encoding="utf-8")
            done = subprocess.run([sys.executable, "-X", "utf8", "_run.py"], cwd=Path(tmp) / "ai-board/harness", input=json.dumps(scenarios),
                                  capture_output=True, text=True, encoding="utf-8", env={**os.environ, "PYTHONPATH": ""}, check=True)
            return json.loads(done.stdout)
    except (subprocess.CalledProcessError, OSError, json.JSONDecodeError):
        return None


def current_outputs(scenarios: list[dict], surface) -> list:
    """requirements() của code hiện tại; surface=None dùng settings mặc định."""
    return [levels.requirements(s["plan"], (lambda f: lambda p: f.get(p))(s["files"]), surface) for s in scenarios]


def tier(reqs: list[dict]) -> str:
    """Tier cả plan: mức cao nhất còn phải elevation; rỗng = surface."""
    return levels.strictest(r["level"] for r in reqs)


def level_of_file(reqs: list[dict], path: str) -> str:
    return next((r["level"] for r in reqs if r["path"] == path), levels.SURFACE)


def context_dirs() -> list[str]:
    root = REPO / "server" / "contexts"
    return sorted(p.name for p in root.iterdir() if p.is_dir())


def context_files(name: str) -> list[str]:
    """File .js/.sql tracked trong context (cho ma trận); luôn có index.js giả định."""
    out = _git("ls-files", f"server/contexts/{name}")
    found = [f for f in out.splitlines() if f.endswith((".js", ".mjs", ".sql"))]
    return found or [f"server/contexts/{name}/index.js"]


def _test_text(path: str, kind: str) -> str:
    base = path.rsplit("/", 1)[-1]
    return {"ok": f"import test from 'node:test';\n// covers {path}\n",
            "no_node_test": f"describe('x', () => {{}}); // covers {path}\n",
            "other_file": "import test from 'node:test';\n// covers server/contexts/zz-unrelated/zz-unrelated-file.js\n",
            "basename_only": f"import test from 'node:test';\n// {base}\n"}[kind]


TEST_PATH = "test/zz-lf189-replay.test.js"


def _scenario(path: str, test: str | None, content: str = "") -> dict:
    task = {"file": path, "verify": f"node --test {TEST_PATH}" if test is not None else "manual check"}
    files = {path: content}
    if test is not None:
        files[TEST_PATH] = test
    return {"plan": {"subtasks": [task]}, "files": files}


def matrix(contexts: list[str] | None = None) -> list[dict]:
    """Mỗi file context x biến thể test; mỗi scenario gắn nhãn."""
    out = []
    for name in contexts or context_dirs():
        for path in context_files(name):
            variants = [("test_absent", None), ("test_present", _test_text(path, "ok")), ("test_no_node_test", _test_text(path, "no_node_test")),
                        ("test_other_file", _test_text(path, "other_file")), ("test_basename_only", _test_text(path, "basename_only"))]
            for label, text in variants:
                out.append({"id": f"{path}|{label}", "ctx": name, "path": path, "variant": label, **_scenario(path, text)})
            out.append({"id": f"{path}|cross_import", "ctx": name, "path": path, "variant": "cross_import",
                        **_scenario(path, _test_text(path, "ok"), "import x from '../zz-other-context/x.js';\n")})
    return out


def _forbidden(path: str) -> bool:
    m = re.match(r"^server/contexts/([^/]+)/", path)
    return bool(m and (m.group(1).lower() in MUST_NEVER_OPEN or m.group(1).lower().startswith(("ai-board", "_"))))


def check_invariants(scenarios: list[dict], off: list, on_all: list) -> list[dict]:
    """Vi phạm trên allow-list = mọi context (xấu nhất: owner liệt kê nhầm)."""
    bad = []
    for sc, o, n in zip(scenarios, off, on_all):
        path, variant = sc["path"], sc["variant"]
        lv_off, lv_on = level_of_file(o, path), level_of_file(n, path)
        if levels.RANK[lv_on] > levels.RANK[lv_off]:
            bad.append({"id": sc["id"], "rule": "ON raises tier"})
        if lv_on != lv_off and lv_off != levels.PROTECTED:
            bad.append({"id": sc["id"], "rule": f"ON changes non-protected tier {lv_off}->{lv_on}"})
        opened = lv_on == levels.SURFACE and lv_off != levels.SURFACE
        if opened and (_forbidden(path) or path_policy.denied(path, "write")):
            bad.append({"id": sc["id"], "rule": "forbidden/deny path opened"})
        if opened and variant in ("test_absent", "test_no_node_test", "test_other_file", "cross_import"):
            bad.append({"id": sc["id"], "rule": f"opened without valid test ({variant})"})
        if opened and variant == "test_basename_only":
            bad.append({"id": sc["id"], "rule": "opened by test naming only basename"})
    for path in ("server/index.js", "server/db.js", "server/contexts/registry.js"):
        sc = {"plan": {"subtasks": [{"file": path, "verify": f"node --test {TEST_PATH}"}]}, "files": {TEST_PATH: _test_text(path, "ok")}}
        if level_of_file(current_outputs([sc], frozenset(context_dirs() + ["index.js", "db.js", "registry.js"]))[0], path) == levels.SURFACE:
            bad.append({"id": path, "rule": "core file opened"})
    return bad


def per_context(scenarios: list[dict], off: list, on: list) -> dict:
    """{ctx: {variant: [tierOFF, tierON]}} lấy mức xấu nhất theo file (trạng thái 'có file nào vẫn protected')."""
    rows: dict[str, dict] = {}
    for sc, o, n in zip(scenarios, off, on):
        cell = rows.setdefault(sc["ctx"], {}).setdefault(sc["variant"], {"off": levels.SURFACE, "on": levels.SURFACE, "files": 0, "opened": 0})
        lo, ln = level_of_file(o, sc["path"]), level_of_file(n, sc["path"])
        cell["files"] += 1
        cell["opened"] += lo != levels.SURFACE and ln == levels.SURFACE
        cell["off"], cell["on"] = levels.strictest([cell["off"], lo]), levels.strictest([cell["on"], ln])
    return rows


def real_tests() -> list[tuple[str, str]]:
    out = []
    for p in sorted((REPO / "test").glob("**/*.test.*js")):
        text = p.read_text(encoding="utf-8", errors="replace")
        if "node:test" in text:
            out.append((p.relative_to(REPO).as_posix(), text))
    return out


def context_evidence(name: str, tests: list[tuple[str, str]]) -> dict:
    """Test thật nêu file của context: theo hàm hiện tại (basename) và chặt (path hoặc <ctx>/<file>)."""
    files = context_files(name)
    loose = {f for f in files for _, t in tests if path_policy.names_scope(t, [f])}
    strict = {f for f in files for _, t in tests if f in t or f"{name}/{f.rsplit('/', 1)[-1]}" in t}
    return {"files": len(files), "files_named_loose": len(loose), "files_named_strict": len(strict),
            "tests_referencing_context": sorted(p for p, t in tests if f"contexts/{name}" in t or f"{name}/" in t)[:6]}


def corpus_cases(root: Path) -> list[dict]:
    """Ca backend/FB DEV của corpus: plan = reference_files (verify = oracle_cmd), test = oracle dest. Held-out không đọc."""
    split = {c["id"]: c["split"] for c in json.loads((root / "split.json").read_text(encoding="utf-8"))["cases"]}
    out = []
    for case in sorted(p for p in (root / "cases").iterdir() if p.is_dir()):
        if split.get(case.name) != "dev":
            continue
        meta = json.loads((case / "meta.json").read_text(encoding="utf-8"))
        if not any(f.startswith("server/contexts/") for f in meta["reference_files"]):
            continue
        tests = {o["dest"]: (case / "oracle" / o["src"]).read_text(encoding="utf-8") for o in meta["oracle_files"]}
        out.append({"id": case.name, "base": meta["base"], "files": meta["reference_files"], "verify": meta["oracle_cmd"], "tests": tests})
    return out


def _base_reader(base: str):
    cache: dict = {}

    def read(path):
        if path not in cache:
            try:
                cache[path] = _git("show", f"{base}:{path}")
            except subprocess.CalledProcessError:
                cache[path] = None
        return cache[path]
    return read


def _existing_test(path: str, tests: list[tuple[str, str]]) -> tuple[str, str] | None:
    """Test node:test có sẵn trong repo nêu đúng path file (chặt)."""
    if not path.startswith("server/contexts/"):
        return None
    name = path.split("/")[2]
    return next(((p, t) for p, t in tests if path in t or f"{name}/{path.rsplit('/', 1)[-1]}" in t), None)


def corpus_scenarios(cases: list[dict], tests: list[tuple[str, str]] = ()) -> list[dict]:
    """3 chế độ: oracle_test (giả định, oracle chưa có ở base), existing_test (test thật có sẵn), no_test."""
    out = []
    for case in cases:
        read = _base_reader(case["base"])
        found = {f: _existing_test(f, list(tests)) for f in case["files"]}
        for mode in ("oracle_test", "existing_test", "no_test"):
            files = {p: read(p) for p in case["files"]}
            subtasks = []
            for f in case["files"]:
                verify = "manual"
                if mode == "oracle_test":
                    verify = case["verify"]
                elif mode == "existing_test" and found[f]:
                    verify = f"node --test {found[f][0]}"
                    files[found[f][0]] = found[f][1]
                subtasks.append({"file": f, "verify": verify})
            if mode == "oracle_test":
                files.update(case["tests"])
            out.append({"id": f"{case['id']}|{mode}", "case": case["id"], "with_test": mode != "no_test", "mode": mode,
                        "plan": {"subtasks": subtasks}, "files": files})
    return out


def propose(rows: dict, evidence: dict, corpus_rows: list[dict]) -> list[dict]:
    """Allow-list đề xuất: có test chặt nêu file + không cấm + không nhạy cảm."""
    steps: dict[str, int] = {}
    for c in corpus_rows:
        for f in c["files"]:
            ctx = f.split("/")[2] if f.startswith("server/contexts/") else None
            if ctx:
                steps[ctx] = steps.get(ctx, 0) + 1
    out = []
    for name in sorted(rows):
        ev = evidence[name]
        forbidden = _forbidden(f"server/contexts/{name}/x.js")
        sensitive = SENSITIVE_HINT.get(name)
        verdict = ("không (cấm)" if forbidden else "không (chưa có test thật nêu file)" if not ev["files_named_strict"]
                   else f"cần owner cân nhắc ({sensitive})" if sensitive else "đề xuất")
        out.append({"context": name, "proposal": verdict, "test_evidence": ev, "forbidden": forbidden, "sensitive": sensitive,
                    "corpus_dev_steps_affected": steps.get(name, 0)})
    return out


def run(corpus: Path | None = None, contexts: list[str] | None = None) -> dict:
    ctxs = contexts or context_dirs()
    sc = matrix(ctxs)
    base = baseline_outputs(sc)
    off = current_outputs(sc, frozenset())
    default = current_outputs(sc, None)
    on_all = current_outputs(sc, frozenset(c.lower() for c in ctxs))
    tests = real_tests()
    evidence = {c: context_evidence(c, tests) for c in ctxs}
    rows = per_context(sc, off, on_all)
    cases = corpus_cases(corpus) if corpus and corpus.exists() else []
    cs = corpus_scenarios(cases, tests)
    proposed = [p["context"] for p in propose(rows, evidence, cases) if p["proposal"] == "đề xuất"]
    prop_set = frozenset(proposed)
    cbase = baseline_outputs(cs) if cs else []
    coff, con = current_outputs(cs, frozenset()), current_outputs(cs, prop_set)
    corpus_rows = [{"id": s["id"], "tier_off": tier(o), "tier_on": tier(n), "levels_off": {r["path"]: r["level"] for r in o}, "why_off": {r["path"]: r["why"] for r in o},
                    "levels_on": {r["path"]: r["level"] for r in n}} for s, o, n in zip(cs, coff, con)]
    bad = check_invariants(sc, off, on_all)
    ser = lambda x: json.dumps(x, sort_keys=True)
    identical = base is not None and ser(base) == ser(off) == ser(default) and (cbase is not None and ser(cbase) == ser(coff))
    off_diff = [] if identical else [s["id"] for s, b, o in zip(sc, base or [], off) if ser(b) != ser(o)]
    cor_bad = [r["id"] for r, s in zip(corpus_rows, cs) if not s["with_test"] and r["levels_on"] != r["levels_off"]]
    by_rule: dict[str, int] = {}
    for item in bad:
        by_rule[item["rule"]] = by_rule.get(item["rule"], 0) + 1
    opened = [f"{r['id']}:{p}" for r in corpus_rows for p in r["levels_off"] if p not in r["levels_on"]]
    if base is None or cbase is None:
        verdict = NOT_MEASURABLE
    elif bad or not identical or cor_bad:
        verdict = FAIL
    else:
        verdict = PASS
    return {"verdict": verdict, "scenarios": len(sc), "corpus_cases": [c["id"] for c in cases],
            "baseline_commit": f"{LF189_COMMIT}^", "off_identical_to_baseline": identical, "off_diff_ids": off_diff[:10],
            "invariant_violations": bad[:50], "invariant_violation_count": len(bad), "violations_by_rule": by_rule, "corpus_files_opened": opened, "corpus_no_test_changed": cor_bad,
            "trials_note": "saved .scratch/ab-driver/trials/* carry no plan/subtask content (no server/contexts file): not measurable",
            "per_context": rows, "proposal": propose(rows, evidence, cases), "proposed_allow_list": proposed, "corpus": corpus_rows}


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", type=Path, default=None)
    ap.add_argument("--out", type=Path, default=None)
    args = ap.parse_args(argv)
    result = run(args.corpus)
    text = json.dumps(result, ensure_ascii=False, indent=1, sort_keys=True)
    if args.out:
        args.out.write_text(text, encoding="utf-8")
    print(result["verdict"], "scenarios", result["scenarios"], "violations", result["invariant_violation_count"],
          "off_identical", result["off_identical_to_baseline"])
    return 0 if result["verdict"] == PASS else 1


if __name__ == "__main__":
    sys.exit(main())
