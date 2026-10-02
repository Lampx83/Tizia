"""Eval runner: corpus sinh theo seed → từng (case, lần lặp) qua eval_gold.run_case → báo cáo.

    python eval_run.py quick --seed 7 [--cases 8] [--root DIR]

quick = fast tier: cổng 3 + oracle gold trên repo scratch, không microVM. Observer-only: không nhận input giữa chừng,
chỉ user/scheduler khởi động. Dữ liệu ở --root (env AI_BOARD_EVAL_DIR; mặc định .scratch/ai-board-eval/, gitignored).
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import random
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from eval_gold import run_case  # noqa: E402
from main import ROOT, Deps  # noqa: E402

DEFAULT_ROOT = ROOT / ".scratch" / "ai-board-eval"
WORDS = ("học tập bài giảng ôn luyện kiểm tra thuốc đơn liều lượng cân pha chế mã nguồn biến hàm trang nút bảng điểm "
         "thẻ ghi nhớ lộ trình thành tựu sao xu chuỗi ngày").split()
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


def _sentence(rng: random.Random, used: set) -> str:
    while (text := " ".join(rng.sample(WORDS, 5)).capitalize() + ".") in used:
        pass
    used.add(text)
    return text


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
    """cases.json + repo git `site/` (checkout chung cho mọi case) dưới <root>/corpus/quick-s<seed>/."""
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


def report(rows: list[dict], total: int, cut_short: bool) -> str:
    head = (f"CẮT NGANG do hết ngân sách thời gian: xong {len(rows)}/{total} lượt; chạy lại đúng lệnh này để tiếp tục"
            if cut_short else f"xong {len(rows)}/{total} lượt")
    return "\n".join([head] + [f"{r['case']} {r['kind']:7} lần {r['repeat']}: {'ĐẠT' if r['oracle'] else 'HỎNG'}"
                               f"{'' if r['gate_passed'] else ' (cổng 3 chặn)'}" for r in rows])


def main(argv: list[str] | None = None, deps: Deps | None = None, *, clock=time.monotonic) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    tier = parser.add_subparsers(dest="tier", required=True).add_parser("quick", help="fast tier, seed → vài case")
    tier.add_argument("--seed", type=int, required=True)
    tier.add_argument("--cases", type=int, default=8)
    tier.add_argument("--repeats", type=int, default=1)
    tier.add_argument("--budget-minutes", type=float, help="dừng sạch khi hết ngân sách; chạy lại để tiếp tục")
    tier.add_argument("--model", help="mặc định: model cổng 3 đang cấu hình")
    tier.add_argument("--root", default=os.environ.get("AI_BOARD_EVAL_DIR") or str(DEFAULT_ROOT))
    args = parser.parse_args(argv)
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8", errors="replace")
    if deps is None:
        from dotenv import load_dotenv
        from main import ENV_FILE
        load_dotenv(ENV_FILE)  # như worker; không in giá trị nào
        deps = Deps.real()
    model = args.model or deps.models.gate3_model
    root = Path(args.root)
    repo, cases = write_corpus(root, args.seed, args.cases)
    run_dir = root / "runs" / f"quick-s{args.seed}"
    run_dir.mkdir(parents=True, exist_ok=True)
    meta = {"tier": "quick", "seed": args.seed, "repeats": args.repeats, "model": model,
            "corpus_sha": hashlib.sha256((root / "corpus" / f"quick-s{args.seed}" / "cases.json").read_bytes()).hexdigest()}
    meta_path = run_dir / "run.json"
    if meta_path.exists() and {k: json.loads(meta_path.read_text(encoding="utf-8")).get(k) for k in meta} != meta:
        print(f"[eval] {run_dir} đã có run khác cấu hình (corpus/repeats/model); đổi seed hoặc --root", file=sys.stderr)
        return 2
    done = load_done(run_dir / "results.jsonl")
    started, total, cut_short = clock(), len(cases) * args.repeats, False
    meta_path.write_text(json.dumps({**meta, "status": "running"}, indent=2), encoding="utf-8")
    with (run_dir / "results.jsonl").open("a", encoding="utf-8") as out:
        for repeat in range(1, args.repeats + 1):
            for case in cases:
                if (case["id"], repeat) in done:
                    continue
                if args.budget_minutes is not None and clock() - started >= args.budget_minutes * 60:
                    cut_short = True
                    break
                row = {**run_case(case["id"], case_record(case, repo), model, deps), "kind": case["kind"], "repeat": repeat}
                done[(case["id"], repeat)] = row
                out.write(json.dumps(row, ensure_ascii=False) + "\n")
                out.flush()
            if cut_short:
                break
    rows = [done[(c["id"], r)] for r in range(1, args.repeats + 1) for c in cases if (c["id"], r) in done]
    meta_path.write_text(json.dumps({**meta, "status": "cut_short" if cut_short else "complete"}, indent=2), encoding="utf-8")
    text = report(rows, total, cut_short)
    (run_dir / "report.txt").write_text(text + "\n", encoding="utf-8")
    print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
