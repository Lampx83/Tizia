"""Recall mode (không model, không mạng): context cổng 1/3 có chứa file + dòng gold không, và mỗi phần context tốn bao nhiêu ký tự.

    python eval_run.py recall [--root DIR] [--corpus NAME ...] [--label L] [--weights-alt weights.json]

Chạy trên mọi corpus có sẵn dưới --root (corpus/*/ sinh theo seed, corpus-git/). Dùng đúng builder của harness
(context.build_context, implement.gate3_context → file_context/repomap/code_index). Cổng 1 "đúng file" = mọi file gold nằm trong
targets + trang mẫu (như eval_strata). Cổng 3 "đủ dòng" = mọi dòng gold nằm trong các dòng `Lnn| ` model thấy (dòng bị sửa/xóa;
chèn thuần → dòng neo ngay trên). Chi phí đo bằng ký tự (không đoán token). --weights-alt: retrieval_weights khác chạy ở tiến trình
con (env AI_BOARD_RETRIEVAL_WEIGHTS), so cặp theo case, khoảng bootstrap 95% (seed cố định) cho hiệu recall.
"""
from __future__ import annotations

import argparse
import difflib
import hashlib
import json
import os
import random
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import context  # noqa: E402
import file_context  # noqa: E402
from eval_strata import _exemplars  # noqa: E402
from gates import implement  # noqa: E402

GROUPS = ("kind", "style", "difficulty", "transformation", "split")  # trục nhóm, lấy từ trường có trong case
TOOL_SECTION = {"grep": "excerpt", "outline": "outline", "repomap": "repomap", "exemplar": "exemplar", "lessons": "lessons", "tree": "tree"}
BOOTSTRAP = 2000


def gold_lines(old: str, new: str) -> list[int]:
    """Dòng (1-based, theo file cũ) model phải thấy để làm đúng gold: dòng bị sửa/xóa; chèn thuần → dòng neo ngay trên."""
    lines = set()
    for tag, i1, i2, _j1, _j2 in difflib.SequenceMatcher(None, old.splitlines(), new.splitlines(), autojunk=False).get_opcodes():
        if tag == "insert":
            lines.add(max(i1, 1))
        elif tag != "equal":
            lines.update(range(i1 + 1, i2 + 1))
    return sorted(lines)


def synthetic(root: Path) -> list[dict]:
    """Case của mọi corpus sinh theo seed (corpus/*/cases.json + site/)."""
    import eval_run
    out = []
    for folder in sorted((root / "corpus").glob("*")):
        if not (folder / "cases.json").is_file() or not (folder / "site").is_dir():
            continue
        repo = folder / "site"
        for case in json.loads((folder / "cases.json").read_text(encoding="utf-8")):
            page = (repo / case["file"]).read_text(encoding="utf-8")
            out.append({"corpus": folder.name, "id": case["id"], "groups": {k: case[k] for k in GROUPS if k in case},
                        "request": {"subject": case["title"], "body": case["detail"]}, "detail": case["detail"],
                        "subtasks": [{"title": case["title"], "file": case["file"], "size": "small", "verify": case["verify"]}],
                        "gold": {case["file"]: gold_lines(page, eval_run.expected(page, case["gold"]))}, "source": str(repo)})
    return out


def load_cases(root: Path, names: list[str] | None) -> list[dict]:
    import eval_git
    cases = synthetic(root) + eval_git.recall_cases(root)
    return [c for c in cases if not names or c["corpus"] in names]


def _sections(ctx: dict, gate: int) -> dict:
    """Ký tự mỗi phần context: skill, excerpt (grep Lnn|), outline, repomap, exemplar, lessons, tree; other = locate + khung + brief."""
    by = {}
    for entry in ctx["tool_log"]:
        name = TOOL_SECTION.get(entry["tool"])
        if name:
            by[name] = by.get(name, 0) + entry["chars"]
    skill = len(context.SKILLS[ctx["skill"]].sections.get(gate, ""))
    return {"skill": skill, **{n: by.get(n, 0) for n in TOOL_SECTION.values()}, "other": ctx["chars"] - skill - sum(by.values()),
            "total": ctx["chars"]}


def _add(a: dict, b: dict) -> dict:
    return {k: a.get(k, 0) + b.get(k, 0) for k in {*a, *b}}


def measure(case: dict) -> dict:
    """1 case → row recall (cổng 1 + cổng 3). Không model."""
    source = case["source"]
    sha, existing = implement._existing_files(source, case["subtasks"])
    ctx1 = context.build_context(1, {"subject": case["request"]["subject"], "body": case["request"]["body"], "type": "other"},
                                 None, source, sha)
    picked = [*ctx1["targets"], *_exemplars(ctx1)]
    found = [f for f in case["gold"] if f in picked]
    state = {"checkout_source": source, "base_sha": sha, "request_detail": case["detail"]}
    covered, via, chars = 0, [], {}
    for subtask in case["subtasks"]:
        current = existing[subtask["file"]].decode("utf-8") if subtask["file"] in existing else None
        words = file_context.keywords(subtask["title"], subtask["verify"], case["detail"])
        siblings = [] if current is None else implement._siblings(source, sha, subtask["file"])
        text, _lessons, ctx3 = implement.gate3_context(subtask, state, current, siblings, words)
        shown = {int(n) for n in re.findall(r"^L(\d+)\| ", text or "", re.M)}
        covered += len(shown & set(case["gold"].get(subtask["file"], [])))
        if ctx3 and implement._EXCERPT_LINE.search(ctx3["text"]):
            via.append(ctx3["skill"])
            chars = _add(chars, _sections(ctx3, 3))
        else:  # skill không đưa dòng Lnn|: model chỉ thấy trích file cũ (file mới thì không có gì)
            via.append("fallback-excerpt")
            chars = _add(chars, {"excerpt": len(text or ""), "total": len(text or "")})
    total = sum(len(v) for v in case["gold"].values())
    return {"corpus": case["corpus"], "case": case["id"], "groups": case["groups"],
            "gate1": {"skill": ctx1["skill"], "picked": picked[:6], "found": len(found), "gold_files": len(case["gold"]),
                      "hit": len(found) == len(case["gold"]), "chars": _sections(ctx1, 1)},
            "gate3": {"via": via, "covered": covered, "gold_lines": total, "hit": covered == total, "chars": chars}}


def _stats(rows: list[dict]) -> dict:
    import eval_run
    n = len(rows)
    out = {"cases": n}
    for name, key in (("gate1", "gate1"), ("gate3", "gate3")):
        k = sum(r[key]["hit"] for r in rows)
        lo, hi = eval_run.wilson(k, n)
        out[name] = {"hit": k, "rate": round(100 * k / n, 1), "lo": lo, "hi": hi,
                     "mean_chars": {s: round(sum(r[key]["chars"].get(s, 0) for r in rows) / n) for s in sorted({s for r in rows for s in r[key]["chars"]})}}
    gold = sum(r["gate3"]["gold_lines"] for r in rows)
    out["gate3"]["line_coverage"] = round(100 * sum(r["gate3"]["covered"] for r in rows) / gold, 1) if gold else None
    return out


def _groups(rows: list[dict]) -> dict:
    names = {"all": rows}
    for axis in GROUPS:
        for value in sorted({str(r["groups"][axis]) for r in rows if axis in r["groups"]}):
            names[f"{axis}={value}"] = [r for r in rows if str(r["groups"].get(axis)) == value]
    return {name: _stats(sub) for name, sub in names.items()}


METRICS = {"gate1_hit": lambda r: float(r["gate1"]["hit"]), "gate3_hit": lambda r: float(r["gate3"]["hit"]),
           "gate3_line_coverage": lambda r: r["gate3"]["covered"] / r["gate3"]["gold_lines"] if r["gate3"]["gold_lines"] else 1.0}


def _bootstrap(diffs: list[float]) -> dict:
    """Hiệu trung bình (điểm %) + khoảng bootstrap 95% theo case (seed cố định → báo cáo lặp được)."""
    rng, n = random.Random(0), len(diffs)
    means = sorted(sum(rng.choices(diffs, k=n)) / n for _ in range(BOOTSTRAP))
    return {"delta": round(100 * sum(diffs) / n, 1), "lo": round(100 * means[int(0.025 * BOOTSTRAP)], 1),
            "hi": round(100 * means[int(0.975 * BOOTSTRAP) - 1], 1), "cases": n}


def deltas(base: list[dict], alt: list[dict]) -> dict:
    """{nhóm: {metric: {delta, lo, hi}}} của alt − base, ghép cặp theo (corpus, case)."""
    mine = {(r["corpus"], r["case"]): r for r in alt}
    pairs = [(r, mine[(r["corpus"], r["case"])]) for r in base if (r["corpus"], r["case"]) in mine]
    out = {}
    for name, sub in _pairs_by_group(pairs).items():
        out[name] = {m: _bootstrap([f(b) - f(a) for a, b in sub]) for m, f in METRICS.items()}
    return out


def _pairs_by_group(pairs: list[tuple]) -> dict:
    out = {"all": pairs}
    for axis in GROUPS:
        for value in sorted({str(a["groups"][axis]) for a, _ in pairs if axis in a["groups"]}):
            out[f"{axis}={value}"] = [(a, b) for a, b in pairs if str(a["groups"].get(axis)) == value]
    return out


def weights_id(path: str | None = None) -> dict:
    """Trọng số hiệu lực (đã điền mặc định cho khoá thiếu) + mã băm để so run."""
    values = file_context.load_weights(path) if path else file_context.WEIGHTS
    return {"path": str(path or file_context.WEIGHTS_PATH), "sha": hashlib.sha256(json.dumps(values, sort_keys=True).encode()).hexdigest()[:10]}


def _alt_rows(args) -> list[dict]:
    """Rows với retrieval_weights khác: tiến trình con (trọng số nạp lúc import), cùng corpus."""
    import eval_run
    out = Path(args.root) / "recall" / f"{args.label}-alt-rows.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = [sys.executable, str(Path(eval_run.__file__).resolve()), "recall", "--root", args.root, "--dump-rows", str(out)]
    for name in args.corpus or []:
        cmd += ["--corpus", name]
    subprocess.run(cmd, env={**os.environ, "AI_BOARD_RETRIEVAL_WEIGHTS": str(args.weights_alt)}, check=True,
                   capture_output=True, stdin=subprocess.DEVNULL)
    return json.loads(out.read_text(encoding="utf-8"))


def render(rep: dict) -> str:
    lines = [f"[RECALL | không model] {rep['cases']} case; trọng số {rep['weights']['sha']}"]
    for r in rep["rows"]:
        g1, g3 = r["gate1"], r["gate3"]
        lines.append(f"{r['corpus']}/{r['case']}: cổng 1 {'ĐỦ' if g1['hit'] else 'THIẾU'} {g1['found']}/{g1['gold_files']} file ({g1['skill']}); "
                     f"cổng 3 {'ĐỦ' if g3['hit'] else 'THIẾU'} {g3['covered']}/{g3['gold_lines']} dòng gold; ký tự cổng 3 "
                     + " ".join(f"{k}={v}" for k, v in sorted(g3["chars"].items())))
    for name, g in rep["groups"].items():
        lines.append(f"nhóm {name}: {g['cases']} case; cổng 1 đúng file {g['gate1']['hit']}/{g['cases']} = {g['gate1']['rate']}% "
                     f"(Wilson 95%: {g['gate1']['lo']}-{g['gate1']['hi']}%); cổng 3 đủ dòng {g['gate3']['hit']}/{g['cases']} = {g['gate3']['rate']}% "
                     f"(Wilson 95%: {g['gate3']['lo']}-{g['gate3']['hi']}%), phủ dòng gold {g['gate3']['line_coverage']}%")
        for gate in ("gate1", "gate3"):
            lines.append(f"  ký tự trung bình {gate}: " + " ".join(f"{k}={v}" for k, v in sorted(g[gate]["mean_chars"].items())))
    if "delta" in rep:
        lines.append(f"so với trọng số {rep['weights_alt']['sha']} ({rep['weights_alt']['path']}): hiệu = alt − hiện tại, điểm %, bootstrap 95% theo case")
        for name, metrics in rep["delta"].items():
            lines += [f"  {name} {m}: {d['delta']:+} [{d['lo']:+}, {d['hi']:+}] ({d['cases']} case)" for m, d in metrics.items()]
    return "\n".join(lines)


def register(subs) -> None:
    import eval_run
    parser = subs.add_parser("recall", help="recall context cổng 1/3 + chi phí từng phần, không model")
    parser.add_argument("--root", default=os.environ.get("AI_BOARD_EVAL_DIR") or str(eval_run.DEFAULT_ROOT))
    parser.add_argument("--corpus", action="append", help="chỉ corpus này (tên thư mục; corpus-git); mặc định mọi corpus có sẵn")
    parser.add_argument("--label", default="latest", help="thư mục kết quả <root>/recall/<label>.*")
    parser.add_argument("--weights-alt", help="retrieval_weights.json khác: in hiệu recall so với trọng số hiện tại")
    parser.add_argument("--dump-rows", help=argparse.SUPPRESS)
    parser.set_defaults(handler=run, no_model=True)


def run(args, deps=None, source=None) -> int:
    cases = load_cases(Path(args.root), args.corpus)
    if not cases:
        print(f"[recall] không thấy corpus nào dưới {args.root}", file=sys.stderr)
        return 2
    rows = [measure(c) for c in cases]
    if args.dump_rows:  # tiến trình con của --weights-alt: chỉ nhả rows
        Path(args.dump_rows).write_text(json.dumps(rows, ensure_ascii=False), encoding="utf-8")
        return 0
    rep = {"cases": len(rows), "weights": weights_id(), "rows": rows, "groups": _groups(rows)}
    if args.weights_alt:
        rep |= {"weights_alt": weights_id(args.weights_alt), "delta": deltas(rows, _alt_rows(args))}
    text = render(rep)
    out = Path(args.root) / "recall"
    out.mkdir(parents=True, exist_ok=True)
    (out / f"{args.label}.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    (out / f"{args.label}.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return 0
