"""Eval runner: corpus trang thật → từng (case, lần lặp) qua eval_gold.run_case → báo cáo.

    python eval_run.py quick --seed 7 [--cases 8] [--repeats 3] [--budget-minutes M] [--baseline report.json] [--root DIR]
    python eval_run.py corpus --seed 7 [--root DIR]    # sinh corpus trang thật + manifest (cần chữ request đóng băng, xem eval_corpus)
    python eval_run.py full --seed 7 [--split dev|heldout|all] [--cases N] [--fast-tier] [...như quick]
    baseline = full --seed 20261003 --split all --fast-tier --model qwen2.5-coder:14b (3 lần/case); cấu hình ghim (`pins`) nằm trong run.json + báo cáo

full: held-out = dòng kết quả thô, case, chữ request chỉ nằm dưới <root>/heldout/ (rule deny Read của project); báo cáo chỉ có điểm
tổng hợp split=heldout. Mặc định --split dev: held-out chỉ chạy khi chọn rõ, và chỉ mở chi tiết khi tuyên bố kết quả cuối chu kỳ.
quick = fast tier: --cases N mẫu theo seed từ split DEV của corpus trang thật; cổng 3 → cổng 4 cơ học → oracle sản xuất (nếu request có
kỳ vọng chữ parse được) trên app node chạy trực tiếp, không compose/microVM (eval_fast) → oracle gold. Số liệu gắn nhãn fast tier, KHÔNG
trộn vào ship rate chính thức (official_ship_rate luôn null). Observer-only: không nhận input giữa chừng, chỉ user/scheduler khởi động. Dữ liệu ở --root
(env AI_BOARD_EVAL_DIR; mặc định .scratch/ai-board-eval/, gitignored). Exit: 0 ổn, 1 thay đổi bị từ chối (hồi quy), 2 lỗi cấu hình/mốc không so được/fast tier hỏng.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import random
import re
import subprocess
import sys
import time
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import eval_corpus  # noqa: E402
import eval_fast  # noqa: E402
import eval_git  # noqa: E402
import eval_recall  # noqa: E402
import file_context  # noqa: E402
from eval_corpus import WORDS, sentence as _sentence  # noqa: E402
from eval_gold import run_case  # noqa: E402
from eval_strata import MAX_DROP  # noqa: E402
from main import ROOT, Deps  # noqa: E402

DEFAULT_ROOT = ROOT / ".scratch" / "ai-board-eval"
PAGE = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>{title}</title>
</head>
<body>
  <main>
    <h1>{title}</h1>
{paras}
  </main>
</body>
</html>
"""
GIT_ENV = {"GIT_AUTHOR_NAME": "eval", "GIT_AUTHOR_EMAIL": "eval@tizia.local", "GIT_COMMITTER_NAME": "eval",
           "GIT_COMMITTER_EMAIL": "eval@tizia.local", "GIT_AUTHOR_DATE": "2026-01-01T00:00:00",
           "GIT_COMMITTER_DATE": "2026-01-01T00:00:00"}  # commit hash tất định theo nội dung


def pins(model: str, deps: Deps) -> dict:
    """Cấu hình ghim ghi cạnh số liệu: digest model, hash prompt/skill lock, trọng số truy xuất, contract, guest image của Gate 5 (None nếu thiếu)."""
    sha = lambda path: hashlib.sha256(Path(path).read_bytes().replace(b"\r\n", b"\n")).hexdigest()[:16]  # noqa: E731 — CRLF của Windows không đổi hash
    policy = (ROOT / "ai-board" / "sandbox-runner" / "sandbox-policy.dev.yaml").read_text(encoding="utf-8")
    image = re.search(r"^guest_image: (\S+)", policy, re.M)
    digest = getattr(deps.models, "digest", None)
    return {"model_digest": digest(model) if digest else None,
            "prompt_lock": sha(ROOT / "ai-board" / "harness" / "prompts" / "prompts.lock.json"),
            "skill_lock": sha(ROOT / "ai-board" / "harness" / "skills" / "skills.lock.json"),
            "retrieval_weights": sha(file_context.WEIGHTS_PATH),
            "contract_hash": sha(ROOT / "server" / "ai-board" / "contract.json"),
            "guest_image": image.group(1) if image else None}


def generate(seed: int, n_cases: int, pages: int = 3) -> tuple[dict, list[dict]]:
    """Corpus tất định theo seed: ({file: html}, cases) — thay/chèn 1 câu, gold chính xác."""
    rng, used, site, paras = random.Random(seed), set(), {}, {}
    for i in range(pages):
        file = f"public/qz-eval-{i}.html"
        paras[file] = [_sentence(rng, used) for _ in range(4)]
        title = "Trang " + " ".join(rng.sample(WORDS, 2))
        site[file] = PAGE.format(title=title, paras="\n".join(f"    <p>{p}</p>" for p in paras[file]))
    cases = []
    for i in range(n_cases):
        file = rng.choice(list(site))
        anchor, new = rng.choice(paras[file]), _sentence(rng, used)
        if i % 2 == 0:
            kind, title, verify = "replace", f"Đổi câu '{anchor}' thành '{new}'", f"Trang hiện câu '{new}' thay cho câu '{anchor}'"
            gold = {"op": "replace", "old": anchor, "new": new}
        else:
            kind, title, verify = "insert", f"Thêm câu '{new}' sau câu '{anchor}'", f"Trang hiện thêm câu '{new}' ngay sau câu '{anchor}'"
            gold = {"op": "insert", "anchor": anchor, "new": new}
        cases.append({"id": f"q{seed}-{i:02d}", "kind": kind, "file": file, "title": title, "verify": verify,
                      "detail": f"Trên trang {file}: {title}.", "gold": gold})
    return site, cases


def _git(args: list[str], cwd: Path) -> None:
    subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, stdin=subprocess.DEVNULL,
                   env={**os.environ, **GIT_ENV})


def write_corpus(root: Path, seed: int, n_cases: int) -> tuple[Path, list[dict]]:
    """Corpus synthetic 3 trang (cho recall + test; `quick` đã chuyển sang corpus trang thật): cases.json + repo git `site/` dưới <root>/corpus/quick-s<seed>/."""
    site, cases = generate(seed, n_cases)
    dest = root / "corpus" / f"quick-s{seed}"
    repo = dest / "site"
    repo.mkdir(parents=True, exist_ok=True)
    (dest / "cases.json").write_bytes(json.dumps(cases, ensure_ascii=False, indent=2).encode("utf-8"))
    if not (repo / ".git").exists():
        for file, html in site.items():
            (repo / file).parent.mkdir(parents=True, exist_ok=True)
            (repo / file).write_bytes(html.encode("utf-8"))
        for step in (["init", "-q"], ["add", "-A"], ["commit", "-q", "-m", f"corpus seed {seed}"]):
            _git(step, repo)
    return repo, cases


def _norm(html: str) -> str:
    return " ".join(html.split())


def expected(page: str, gold: dict) -> str:
    """Nội dung đúng của trang sau khi áp gold."""
    if gold["op"] == "replace":
        return page.replace(f"<p>{gold['old']}</p>", f"<p>{gold['new']}</p>", 1)
    lines = page.split("\n")
    at = next(i for i, line in enumerate(lines) if f"<p>{gold['anchor']}</p>" in line)
    lines.insert(at + 1, f"    <p>{gold['new']}</p>")
    return "\n".join(lines)


def case_record(case: dict, repo: Path) -> dict:
    """Case của corpus → bản ghi cho eval_gold.run_case."""
    want = _norm(expected((repo / case["file"]).read_text(encoding="utf-8"), case["gold"]))
    return {"subtask": {"title": case["title"], "file": case["file"], "size": "small", "verify": case["verify"]},
            "detail": case["detail"], "checkout": str(repo), "oracle": lambda html: _norm(html) == want}


def load_done(path: Path) -> dict:
    """{(case, lần lặp): row} đã xong. Dòng cuối dở dang do bị kill thì bỏ, file được ghi lại sạch."""
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines() if path.exists() else []:
        try:
            rows.append(json.loads(line))
        except ValueError:
            break
    if path.exists():
        path.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows), encoding="utf-8")
    return {(r["case"], r["repeat"]): r for r in rows}


CELL = ("kind", "level", "style", "split", "tier")  # trường ô của case, chép vào mỗi dòng kết quả và dùng để gom nhóm báo cáo
SCOPE_TIER = "a"  # Q2: mọi loại phép biến đổi của corpus (chữ, CSS, khối HTML, link, trang mới) thuộc tầng (a); tầng (b) có corpus git riêng
# Phễu: mỗi tầng chỉ tính trên lượt đã qua tầng trước (tỉ lệ có điều kiện).
STAGES = (("gate3", lambda row: row["gate_passed"]), ("gold_oracle", lambda row: row["oracle"]))


def wilson(k: int, n: int, z: float = 1.96) -> tuple[float, float]:
    """Khoảng tin cậy Wilson 95% (%) cho k đạt / n lượt."""
    p, scale = k / n, 1 + z * z / n
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / scale
    centre = (p + z * z / (2 * n)) / scale
    return round(100 * (centre - half), 1) + 0.0, round(100 * (centre + half), 1) + 0.0  # +0.0: bỏ "-0.0" khi k = 0


def failure_class(row: dict) -> str | None:
    """Lớp lỗi của 1 lượt (None = đạt); bảng lớp gọn của decisions Q17, mở rộng khi có thêm cổng."""
    if row["oracle"]:
        return None
    if row["gate_passed"]:
        return "wrong_result"
    reason = row["reason"] or ""
    if re.match(r"\w+(Error|Exception)\b", reason):
        return "infra"
    if "cú pháp" in reason:
        return "syntax"
    if "search" in reason or "after_line" in reason or "Dòng gần giống" in reason:
        return "edit_not_applied"
    return "invalid_output"


def group_stats(rows: list[dict], key: str = "oracle") -> dict:
    """Tỉ lệ + Wilson của 1 nhóm theo cờ `key` (oracle = đúng theo gold; shipped = qua oracle sản xuất ở fast tier)."""
    k, n = sum(r[key] for r in rows), len(rows)
    lo, hi = wilson(k, n)
    return {"trials": n, "passed": k, "rate": round(100 * k / n, 1), "lo": lo, "hi": hi}


def verdict(groups: dict, baseline: dict | None, meta: dict, cut_short: bool) -> dict:
    """Từ chối khi cận trên của 1 nhóm thấp hơn điểm của mốc quá MAX_DROP điểm %."""
    if baseline is None:
        return {"status": "no_baseline"}
    if (baseline.get("tier"), baseline.get("source")) != (meta["tier"], meta["source"]):
        return {"status": "incomparable", "reason": f"mốc là {baseline.get('tier')}/{baseline.get('source')}, run này là {meta['tier']}/{meta['source']}"}
    if cut_short:
        return {"status": "not_computed", "reason": "run bị cắt ngang"}
    detail = {}
    for name, base in baseline["groups"].items():
        if name in groups:
            drop = round(base["rate"] - groups[name]["hi"], 1)
            detail[name] = {"baseline": base["rate"], "upper": groups[name]["hi"], "drop": drop, "regressed": drop > MAX_DROP}
    return {"status": "reject" if any(d["regressed"] for d in detail.values()) else "accept", "max_drop": MAX_DROP, "groups": detail}


def build_report(meta: dict, cases: list[dict], rows: list[dict], total: int, cut_short: bool, baseline: dict | None) -> dict:
    held = [r for r in rows if r.get("split") == "heldout"]
    rows_all, rows = rows, [r for r in rows if r.get("split") != "heldout"]  # held-out chỉ góp điểm tổng hợp, không có chi tiết nào
    fast = any("ended" in r for r in rows_all)  # fast tier: phễu gate3 → gate4 → oracle sản xuất → gold
    stages = eval_fast.STAGES if fast else STAGES
    alive, funnel = rows, []
    for name, passes in stages:
        passed = [r for r in alive if passes(r)]
        funnel.append({"stage": name, "reached": len(alive), "passed": len(passed),
                       "rate": round(100 * len(passed) / len(alive), 1) if alive else None,
                       **({"no_oracle": sum(r["ended"] == "no_oracle" for r in alive)} if name == "production_oracle" else {})})
        alive = passed
    per_case = []
    for case in (c for c in cases if c.get("split") != "heldout"):
        mine = [r for r in rows if r["case"] == case["id"]]
        reached, left = {}, mine
        for name, passes in stages:
            reached[name], left = len(left), [r for r in left if passes(r)]
        per_case.append({"id": case["id"], "kind": case["kind"], "trials": len(mine), "passed": sum(r["oracle"] for r in mine),
                         "reached": reached, **({"ended": dict(Counter(r["ended"] for r in mine))} if fast else {})})
    wins = sum(r["oracle"] for r in rows)
    classes: dict[str, int] = {}
    for row in rows:
        if cls := failure_class(row):
            classes[cls] = classes.get(cls, 0) + 1
    cells = [(v if k == "kind" else f"{k}={v}", [r for r in rows if r.get(k) == v]) for k in CELL for v in sorted({r[k] for r in rows if k in r})]
    subs = {name: sub for name, sub in [("all", rows_all)] + cells + [("split=heldout", held)] if sub}
    groups = {name: group_stats(sub) for name, sub in subs.items()}
    # ship = qua oracle sản xuất (fast tier, KHÔNG phải ship rate chính thức) đặt cạnh đúng theo gold; ô không có kỳ vọng parse được = 0 theo thiết kế
    ship = {"ship": {name: group_stats(sub, "shipped") for name, sub in subs.items()},
            "coverage_gap": {name: eval_fast.gap(sub) for name, sub in subs.items()}} if fast else {}
    return {**meta, "tier_label": "fast tier: không trộn vào ship rate chính thức", "official_ship_rate": None,
            "trials_done": len(rows_all), "trials_total": total, "cut_short": cut_short,
            "cases": per_case, "groups": groups, **ship, "funnel": funnel, "failure_classes": classes,
            "cost": {"gpu_s_per_success": round(sum(r["gpu_s"] for r in rows) / wins, 1) if wins else None,
                     "wall_s_per_success": round(sum(r["wall_s"] for r in rows) / wins, 1) if wins else None},
            "verdict": verdict(groups, baseline, meta, cut_short)}


def render(rep: dict) -> str:
    """Báo cáo dạng chữ từ build_report."""
    lines = [f"[{rep.get('label', 'FAST TIER')} | {rep['source']}] seed {rep['seed']}, model {rep['model']}: {rep['tier_label']}",
             *(["cấu hình ghim: " + ", ".join(f"{k}={v}" for k, v in rep["pins"].items())] if "pins" in rep else []),  # run git-b chưa ghim
             (f"CẮT NGANG do hết ngân sách thời gian: xong {rep['trials_done']}/{rep['trials_total']} lượt; chạy lại đúng lệnh này để tiếp tục"
              if rep["cut_short"] else f"xong {rep['trials_done']}/{rep['trials_total']} lượt")]
    for c in rep["cases"]:
        lines.append(f"{c['id']} {c['kind']:7} đạt {c['passed']}/{c['trials']}  lượt tới từng tầng: "
                     + " → ".join(f"{name} {n}" for name, n in c["reached"].items())
                     + (f"; dừng ở: {', '.join(f'{k} {v}' for k, v in sorted(c['ended'].items()))}" if "ended" in c else ""))
    ship = rep.get("ship", {})
    for name, g in rep["groups"].items():
        lines.append(f"nhóm {name:8} gold {g['passed']}/{g['trials']} = {g['rate']}% (Wilson 95%: {g['lo']}-{g['hi']}%)"
                     + (f" | ship (oracle sản xuất) {s['passed']}/{s['trials']} = {s['rate']}% (Wilson 95%: {s['lo']}-{s['hi']}%)"
                        if (s := ship.get(name)) else ""))
    if rep["funnel"][0]["reached"]:  # run chỉ có held-out thì không có chi tiết để in
        lines += [f"phễu {f['stage']}: {f['passed']}/{f['reached']} ({f['rate']}%)" + (f", không có kỳ vọng parse được: {f['no_oracle']}" if "no_oracle" in f else "")
                  for f in rep["funnel"]]
        cost = rep["cost"]
        lines.append("chi phí mỗi lượt đạt (tổng mọi lượt / số lượt đạt): "
                     + (f"{cost['gpu_s_per_success']} GPU-s, {cost['wall_s_per_success']} s thực" if cost["gpu_s_per_success"] is not None
                        else "chưa có lượt đạt"))
        lines.append("lớp lỗi: " + (", ".join(f"{k}={v}" for k, v in sorted(rep["failure_classes"].items())) or "không có"))
    lines += [f"độ phủ oracle {name}: đúng gold {g['correct']}, ship {g['shipped']}; đúng nhưng không có oracle {g['correct_no_oracle']}, "
              f"đúng nhưng cổng 4 chặn {g['correct_gate4_blocked']}, đúng nhưng oracle chặn {g['correct_oracle_failed']}, oracle cho qua bản sai {g['false_pass']}"
              for name, g in rep.get("coverage_gap", {}).items()]
    v = rep["verdict"]
    lines.append(f"kết luận hồi quy: {v['status'].upper()}" + (f" ({v['reason']})" if v.get("reason") else ""))
    lines += [f"  {name}: mốc {d['baseline']}%, cận trên {d['upper']}%, tụt {d['drop']} điểm" + (f" > {v['max_drop']} → TỪ CHỐI" if d["regressed"] else "")
              for name, d in v.get("groups", {}).items()]
    return "\n".join(lines)


def main(argv: list[str] | None = None, deps: Deps | None = None, *, clock=time.monotonic, launcher=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    seeded = argparse.ArgumentParser(add_help=False)
    seeded.add_argument("--seed", type=int, required=True)
    seeded.add_argument("--root", default=os.environ.get("AI_BOARD_EVAL_DIR") or str(DEFAULT_ROOT))
    common = argparse.ArgumentParser(add_help=False, parents=[seeded])
    common.add_argument("--repeats", type=int, default=3)
    common.add_argument("--budget-minutes", type=float, help="dừng sạch khi hết ngân sách; chạy lại để tiếp tục")
    common.add_argument("--baseline", help="report.json của run mốc (cùng tier + nguồn) để ra kết luận hồi quy")
    common.add_argument("--model", help="mặc định: model cổng 3 đang cấu hình")
    subs = parser.add_subparsers(dest="tier", required=True)
    subs.add_parser("quick", parents=[common], help="fast tier, N case dev lấy mẫu theo seed").add_argument("--cases", type=int, default=8)
    full = subs.add_parser("full", parents=[common], help="corpus trang thật ~60 case")
    full.add_argument("--cases", type=int, help="chỉ chạy N case mỗi split, lấy mẫu theo seed (mặc định: tất cả)")
    full.add_argument("--fast-tier", action="store_true", help="thêm cổng 4 cơ học + oracle sản xuất (app node trên host)")
    full.add_argument("--split", choices=("dev", "heldout", "all"), default="dev", help="held-out chỉ chạy khi chọn rõ")
    subs.add_parser("corpus", parents=[seeded], help="chỉ sinh corpus + manifest, in số case mỗi ô")
    eval_recall.register(subs)
    eval_git.register(subs)
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")
    if getattr(args, "no_model", False):  # lệnh không gọi model: không dựng Deps, không đọc env
        return args.handler(args)
    if args.tier == "corpus":
        try:
            print(eval_corpus.summary(eval_corpus.write_corpus(Path(args.root), args.seed, ROOT)))
        except eval_corpus.CorpusError as error:
            print(f"[eval] {error}", file=sys.stderr)
            return 2
        return 0
    source = "synthetic-candidate" if deps is not None else "pure-ollama"  # deps bơm vào = hạ tầng/candidate tổng hợp
    if deps is None:
        from dotenv import load_dotenv
        from main import ENV_FILE
        load_dotenv(ENV_FILE)  # như worker; không in giá trị nào
        deps = Deps.real()
    if hasattr(args, "handler"):  # lệnh của eval_git (cần model)
        return args.handler(args, deps, source)
    if args.baseline and not Path(args.baseline).is_file():
        print(f"[eval] không thấy mốc {args.baseline}", file=sys.stderr)
        return 2
    baseline = json.loads(Path(args.baseline).read_text(encoding="utf-8")) if args.baseline else None
    model = args.model or deps.models.gate3_model
    root = Path(args.root)
    try:
        cases = eval_corpus.write_corpus(root, args.seed, ROOT)
    except eval_corpus.CorpusError as error:
        print(f"[eval] {error}", file=sys.stderr)
        return 2
    split = "dev" if args.tier == "quick" else args.split  # quick luôn dev
    cases = [c for c in cases if split in ("all", c["split"])]
    if n_cases := getattr(args, "cases", None):
        chosen = {i for side in ("dev", "heldout") for i in random.Random(args.seed).sample(
            [c["id"] for c in cases if c["split"] == side], min(n_cases, sum(c["split"] == side for c in cases)))}
        cases = [c for c in cases if c["id"] in chosen]
    name = f"quick-s{args.seed}" if args.tier == "quick" else f"full-s{args.seed}-{split}"
    use_fast = args.tier == "quick" or getattr(args, "fast_tier", False)
    run_dir = root / "runs" / name
    run_dir.mkdir(parents=True, exist_ok=True)
    meta = {"tier": args.tier, "source": source, "seed": args.seed, "repeats": args.repeats, "model": model, "fast_tier": use_fast, "pins": pins(model, deps),
            "corpus_sha": hashlib.sha256(json.dumps(cases, ensure_ascii=False, sort_keys=True).encode("utf-8")).hexdigest()}
    meta_path = run_dir / "run.json"
    if meta_path.exists() and {k: json.loads(meta_path.read_text(encoding="utf-8")).get(k) for k in meta} != meta:
        print(f"[eval] {run_dir} đã có run khác cấu hình (corpus/repeats/model/cấu hình ghim); đổi seed hoặc --root", file=sys.stderr)
        return 2
    sink = {"dev": run_dir / "results.jsonl", "heldout": root / eval_corpus.VAULT / "runs" / name / "results.jsonl"}  # held-out: chỉ ở vault
    done = {**load_done(sink["dev"]), **load_done(sink["heldout"])}
    started, total, cut_short = clock(), len(cases) * args.repeats, False
    meta_path.write_text(json.dumps({**meta, "status": "running"}, indent=2), encoding="utf-8")
    fast = eval_fast.FastTier(launcher or eval_fast.native_launcher, root) if use_fast else None
    try:
        for repeat in range(1, args.repeats + 1):
            for case in cases:
                if (case["id"], repeat) in done:
                    continue
                if args.budget_minutes is not None and clock() - started >= args.budget_minutes * 60:
                    cut_short = True
                    break
                rec = eval_corpus.case_record(case, root, ROOT)
                row = {**run_case(case["id"], rec, model, deps, fast.hook(rec) if fast else None),
                       **{k: case[k] for k in CELL if k in case}, "tier": SCOPE_TIER, "repeat": repeat}
                if fast:
                    row = eval_fast.finish({"gate4": None, "prod": "skipped", **row})
                done[(case["id"], repeat)] = row
                path = sink[row.get("split", "dev")]
                path.parent.mkdir(parents=True, exist_ok=True)
                with path.open("a", encoding="utf-8") as out:
                    out.write(json.dumps(row, ensure_ascii=False) + "\n")
            if cut_short:
                break
    except eval_fast.FastTierError as error:  # môi trường hỏng, không phải kết quả: giữ các lượt đã xong, sửa rồi chạy lại đúng lệnh
        meta_path.write_text(json.dumps({**meta, "status": "aborted"}, indent=2), encoding="utf-8")
        print(f"[eval] fast tier không chạy được: {error}", file=sys.stderr)
        return 2
    finally:
        if fast:
            fast.close()
    rows = [done[(c["id"], r)] for r in range(1, args.repeats + 1) for c in cases if (c["id"], r) in done]
    meta_path.write_text(json.dumps({**meta, "status": "cut_short" if cut_short else "complete"}, indent=2), encoding="utf-8")
    rep = build_report(meta, cases, rows, total, cut_short, baseline)
    text = render(rep)
    (run_dir / "report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    (run_dir / "report.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return {"reject": 1, "incomparable": 2}.get(rep["verdict"]["status"], 0)


if __name__ == "__main__":
    raise SystemExit(main())
