"""Eval suite CLI: run (parallel, resumable, tqdm) / report / compare / check.

    python eval_suite.py run --seed 20261003 --split all --repeats 3 --modes e2e,gold --workers 2 --fast-tier --root DIR
    python eval_suite.py report --root DIR --name NAME
    python eval_suite.py compare RESULTS_A.jsonl RESULTS_B.jsonl
Observer only: GPU runs are started by the operator. Held-out per-case rows go to <root>/heldout (VAULT); reports carry aggregates only.
"""
from __future__ import annotations

import argparse
import concurrent.futures as futures
import hashlib
import json
import subprocess
import sys
import threading
import time
from pathlib import Path

import eval_corpus
import eval_fast
from evaluation.suite import ablation, metrics, taskpack, trial
from evaluation.suite.launcher import sqlite_launcher

HERE = Path(__file__).resolve().parent


def _sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes().replace(b"\r\n", b"\n")).hexdigest()[:16]


def provenance(root_repo: Path, model: str, router) -> dict:  # router None = injected fake deps (tests)
    """Everything that must not change between two runs that are compared. The code ref comes from git, never from the working tree."""
    git = lambda *a: subprocess.run(["git", "-C", str(root_repo), *a], capture_output=True, text=True, stdin=subprocess.DEVNULL).stdout.strip()  # noqa: E731
    harness = root_repo / "ai-board" / "harness"
    suite_files = sorted(HERE.glob("*.py")) + [HERE / "queue_fixture_sqlite.mjs"]
    gates = sorted((harness / "gates").glob("*.py")) + sorted((harness / "runtime").glob("*.py"))
    return {
        "ref": git("rev-parse", "HEAD"), "dirty": bool(git("status", "--porcelain", "--untracked-files=no")),
        "model": model, "routing_catalog": _sha(root_repo / "server" / "ai-board" / "model-routing.json"),
        "reasoning": {role: router.reasoning(role) for role in ("gate1", "gate25", "gate3_light", "gate3_heavy")} if router else {},
        "prompt_lock": _sha(harness / "prompts" / "prompts.lock.json"), "skill_lock": _sha(harness / "skills" / "skills.lock.json"),
        "contract_hash": _sha(root_repo / "server" / "ai-board" / "contract.json"),
        "suite_hash": hashlib.sha256("".join(_sha(p) for p in suite_files).encode()).hexdigest()[:16],
        "pipeline_hash": hashlib.sha256("".join(_sha(p) for p in gates).encode()).hexdigest()[:16],
    }


class Store:
    """Append-only jsonl per sink (dev next to the report, held-out in the vault). Resume = skip keys already stored."""

    def __init__(self, dev: Path, vault: Path):
        self.paths, self.lock, self.rows = {"dev": dev, "heldout": vault}, threading.Lock(), {}
        for path in self.paths.values():
            if not path.exists():
                continue
            good = []
            for line in path.read_text(encoding="utf-8").splitlines():
                try:
                    good.append(json.loads(line))
                except ValueError:
                    break  # half-written last line from a kill
            path.write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in good), encoding="utf-8")
            for r in good:
                self.rows[(r["id"], r["mode"], r["repeat"])] = r

    def add(self, row: dict) -> None:
        with self.lock:
            self.rows[(row["id"], row["mode"], row["repeat"])] = row
            path = self.paths["heldout" if row.get("split") == "heldout" else "dev"]
            path.parent.mkdir(parents=True, exist_ok=True)
            with path.open("a", encoding="utf-8") as out:
                out.write(json.dumps(row, ensure_ascii=False) + "\n")


def render(rep: dict) -> str:
    lines = []
    for mode, groups in rep.items():
        lines.append(f"== mode {mode} ==")
        for name, g in groups.items():
            if not g.get("trials"):
                continue
            r, c = g["resolved"], g["cost"]
            plan = g.get("planning")
            review = g.get("review_false_block")
            lines.append(f"{name:<18} n={g['trials']:<4} giải đúng {r['k']}/{r['n']} = {r['rate']}% (Wilson {r['lo']}-{r['hi']}) | sạch {g['resolved_clean']['rate']}% | "
                         f"pass@any {g['pass_any']['rate']}% pass@all {g['pass_all']['rate']}% | bất ổn {g['flaky_tasks']} task | ship {g['shipped']['rate']}% | "
                         + (f"kế hoạch đúng ngay {plan['first_hit']['rate']}% (sau hỏi lại {plan['final_hit']['rate']}%, trang mới {plan['first_plans_new_page']['rate']}%) | " if plan else "")
                         + (f"cổng 4 chặn nhầm {review['k']}/{review['n']} = {review['rate']}% | " if review else "")
                         + f"{c['model_calls_mean']} lượt gọi, kẹt {c['stuck']['rate']}%, cắt cụt {c['truncated']['rate']}%, {c['wall_s_mean']} s/lượt")
        if "all" in groups and groups["all"].get("failure"):
            lines.append("  lớp lỗi: " + ", ".join(f"{k}={v}" for k, v in sorted(groups["all"]["failure"].items())))
    return "\n".join(lines)


FIXED = ("ref", "dirty", "model", "routing_catalog", "prompt_lock", "skill_lock", "contract_hash", "suite_hash", "pipeline_hash")


def integrity(meta: dict, rows: list[dict], current: dict | None = None) -> list[str]:
    """Reasons the numbers must not be trusted. Empty list = every row came from the pinned model on vLLM with the pinned code."""
    problems = []
    if current:
        problems += [f"{k} changed during/after the run" for k in FIXED if current.get(k) != meta.get(k)]
    if any(set(r.get("providers") or []) - {"vllm"} for r in rows):
        problems.append("a model call left vLLM (failover or legacy route)")
    if any(set(r.get("served") or []) - {meta.get("model")} for r in rows):
        problems.append("a different served model id answered")
    infra = sum(bool(r.get("infra_error")) for r in rows)
    if rows and infra / len(rows) > 0.1:
        problems.append(f"{infra}/{len(rows)} trials ended in infrastructure errors")
    gate1_rows = [r for r in rows if r["mode"].startswith("e2e") and r["plan"]["attempts"]]
    if meta.get("reasoning", {}).get("gate1") and gate1_rows and not any(r.get("reasoning_chars") for r in gate1_rows):
        problems.append("reasoning is configured for gate1 but no reasoning text ever came back")
    return problems


def write_report(run_dir: Path, rows: list[dict]) -> dict:
    rep = metrics.report(rows)
    (run_dir / "report.json").write_text(json.dumps(rep, ensure_ascii=False, indent=2), encoding="utf-8")
    (run_dir / "report.txt").write_text(render(rep) + "\n", encoding="utf-8")
    return rep


def _bar(total: int):
    try:
        from tqdm import tqdm
        return tqdm(total=total, unit="lượt", dynamic_ncols=True, file=sys.stderr)
    except ImportError:
        class Plain:
            n = 0

            def update(self, k=1):
                self.n += k
                print(f"[suite] {self.n}/{total}", file=sys.stderr, flush=True)

            def set_postfix_str(self, *_):
                pass

            def close(self):
                pass
        return Plain()


def cmd_run(args, deps=None) -> int:
    from main import ENV_FILE, ROOT
    from runtime.pipeline import Deps
    if deps is None:  # real run: fail closed unless the first candidate of every measured role is vLLM
        from dotenv import load_dotenv
        load_dotenv(ENV_FILE)
        deps = Deps.real()
        router = getattr(deps.models, "routing", None)
        for role in ("gate1", "gate25", "gate3_light"):
            first = router.candidates(role)[:1] if router else []
            if not first or first[0]["provider"] != "vllm":
                print(f"[suite] needs AI_BOARD_MODEL_ROUTING=true and a vLLM candidate first for {role}", file=sys.stderr)
                return 2
        model = router.candidates("gate3_light")[0]["model"]
        for flag, value in (("reasoning_off", False), ("reasoning_on", True)):  # ablation: one setting per run, recorded in provenance
            for role in filter(None, getattr(args, flag).split(",")):
                router.catalog.setdefault("reasoning", {})[role] = value
    else:
        router, model = None, deps.models.gate3_model
    ablation.apply(args.context_arm)
    prov = {**provenance(ROOT, model, router), "context_arm": args.context_arm}
    if prov["dirty"] and not args.allow_dirty:
        print("[suite] working tree has uncommitted changes: commit them (or --allow-dirty for a throwaway run)", file=sys.stderr)
        return 2
    root = Path(args.root)
    try:
        tasks = eval_corpus.write_corpus(root, args.seed, ROOT)
    except eval_corpus.CorpusError as error:
        print(f"[suite] {error}", file=sys.stderr)
        return 2
    tasks = [t for t in tasks if args.split in ("all", t["split"])]
    if args.cases:
        tasks = tasks[: args.cases]
    for pack in args.pack or []:
        problems = taskpack.validate(json.loads(Path(pack).read_text(encoding="utf-8")), ROOT)
        if problems:
            print(f"[suite] pack {pack} invalid: {'; '.join(problems[:5])}", file=sys.stderr)
            return 2
        tasks += taskpack.load_pack(pack)
    modes = args.modes.split(",")
    name = (f"s{args.seed}-{args.split}-{prov['ref'][:12]}" + ("-dirty" if prov["dirty"] else "")
            + (f"-think0-{args.reasoning_off.replace(',', '+')}" if args.reasoning_off else "")
            + (f"-think1-{args.reasoning_on.replace(',', '+')}" if args.reasoning_on else "")
            + (f"-ctx-{args.context_arm}" if args.context_arm != "default" else ""))
    run_dir = root / "suite" / name
    run_dir.mkdir(parents=True, exist_ok=True)
    meta = {"seed": args.seed, "split": args.split, "repeats": args.repeats, "modes": modes, "fast_tier": args.fast_tier, "review": args.review, "packs": [_sha(Path(p)) for p in args.pack or []], **prov,
            "corpus_sha": hashlib.sha256(json.dumps(tasks, ensure_ascii=False, sort_keys=True).encode()).hexdigest()}
    meta_path = run_dir / "run.json"
    if meta_path.exists():
        old = json.loads(meta_path.read_text(encoding="utf-8"))
        if {k: old.get(k) for k in meta} != meta:
            print(f"[suite] {run_dir} đã có run khác cấu hình (ref/catalog/prompt/suite/pipeline/corpus); chạy ở --root khác", file=sys.stderr)
            return 2
    store = Store(run_dir / "results.jsonl", root / eval_corpus.VAULT / "suite" / name / "results.jsonl")
    todo = [(t, m, r) for r in range(1, args.repeats + 1) for t in tasks for m in modes if (t["id"], m, r) not in store.rows]
    meta_path.write_text(json.dumps({**meta, "status": "running", "todo": len(todo)}, indent=2), encoding="utf-8")
    launcher = sqlite_launcher if args.fast_tier else None
    fast = eval_fast.FastTier(launcher, root) if args.fast_tier else None
    fast_lock, stop, deadline = threading.Lock(), threading.Event(), (time.monotonic() + args.max_minutes * 60 if args.max_minutes else None)
    abort: list[str] = []

    def work(item):
        task, mode, repeat = item
        if stop.is_set() or (run_dir / "STOP").exists() or (deadline and time.monotonic() > deadline):
            return None
        try:
            row = trial.run_trial(task, mode, deps, root, ROOT, fast, fast_lock, review=args.review)
        except eval_fast.FastTierError as error:  # environment broken: keep finished work, stop the run
            abort.append(str(error)[:300])
            stop.set()
            return None
        row = {**row, "repeat": repeat, **{k: task[k] for k in metrics.CELLS if k in task}}
        store.add(row)
        return row

    bar, done_now, resolved_now = _bar(len(todo)), 0, 0
    pool = futures.ThreadPoolExecutor(max_workers=max(1, args.workers))
    try:
        pending = [pool.submit(work, item) for item in todo]
        for future in futures.as_completed(pending):
            row = future.result()
            if row is not None:
                done_now += 1
                resolved_now += row["resolved"]
                bar.set_postfix_str(f"giải đúng {resolved_now}/{done_now}")
            bar.update(1)
    except KeyboardInterrupt:
        stop.set()
        print("\n[suite] dừng: chờ các lượt đang chạy xong, rồi ghi báo cáo (chạy lại cùng lệnh để tiếp tục)", file=sys.stderr)
    finally:
        pool.shutdown(wait=True, cancel_futures=True)
        bar.close()
        if fast:
            fast.close()
    rows = list(store.rows.values())
    complete = not todo or len(store.rows) >= len(tasks) * len(modes) * args.repeats
    status = f"aborted: {abort[0]}" if abort else "complete" if complete else "partial"
    problems = integrity(meta, rows, provenance(ROOT, model, router)) if rows else []
    meta_path.write_text(json.dumps({**meta, "status": status, "rows": len(rows), "integrity": problems}, indent=2), encoding="utf-8")
    if rows:
        print(render(write_report(run_dir, rows)))
    print(f"[suite] {status}; {run_dir}" + (f"; KHÔNG TIN SỐ LIỆU: {'; '.join(problems)}" if problems else "; integrity ok"))
    return 2 if abort else 0


def cmd_report(args) -> int:
    run_dir = Path(args.root) / "suite" / args.name
    store = Store(run_dir / "results.jsonl", Path(args.root) / eval_corpus.VAULT / "suite" / args.name / "results.jsonl")
    print(render(write_report(run_dir, list(store.rows.values()))))
    return 0


def cmd_pack_check(args) -> int:
    from main import ROOT
    problems = taskpack.validate(json.loads(Path(args.pack).read_text(encoding="utf-8")), ROOT)
    print(json.dumps({"entries": len(json.loads(Path(args.pack).read_text(encoding="utf-8"))), "problems": problems}, ensure_ascii=False, indent=1))
    return 1 if problems else 0


def cmd_check(args) -> int:
    from main import ROOT
    run_dir = Path(args.root) / "suite" / args.name
    meta = json.loads((run_dir / "run.json").read_text(encoding="utf-8"))
    store = Store(run_dir / "results.jsonl", Path(args.root) / eval_corpus.VAULT / "suite" / args.name / "results.jsonl")
    problems = integrity(meta, list(store.rows.values()), provenance(ROOT, meta["model"], None))
    print(json.dumps({"status": meta.get("status"), "rows": len(store.rows), "problems": problems}, ensure_ascii=False))
    return 1 if problems else 0


def cmd_compare(args) -> int:
    load = lambda p: [json.loads(line) for line in Path(p).read_text(encoding="utf-8").splitlines() if line.strip()]  # noqa: E731
    a, b = load(args.baseline), load(args.candidate)
    for mode in sorted({r["mode"] for r in a} & {r["mode"] for r in b}):
        print(mode, json.dumps(metrics.compare([r for r in a if r["mode"] == mode], [r for r in b if r["mode"] == mode]), ensure_ascii=False))
    return 0


def main(argv=None, deps=None) -> int:
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="cmd", required=True)
    run = sub.add_parser("run")
    run.add_argument("--seed", type=int, required=True)
    run.add_argument("--split", choices=("dev", "heldout", "all", "none"), default="dev", help="none = only the --pack tasks")
    run.add_argument("--repeats", type=int, default=3)
    run.add_argument("--modes", default="e2e,e2e:approved,gold,e2e:nodia",
                    help="e2e = own plan from the request text; gold = gold subtask (gate 3 only); e2e:nodia = e2e typed without diacritics; e2e:approved = e2e where a plan block counts as admin-approved")
    run.add_argument("--workers", type=int, default=2, help="parallel trials against the shared GPU")
    run.add_argument("--root", required=True)
    run.add_argument("--cases", type=int)
    run.add_argument("--fast-tier", action="store_true", help="gate 4 + production text oracle on a locally started corpus app")
    run.add_argument("--max-minutes", type=float)
    run.add_argument("--allow-dirty", action="store_true")
    run.add_argument("--review", action="store_true", help="also run the gate 4 model content review on gold-mode candidates (false-block rate)")
    run.add_argument("--pack", action="append", help="task pack JSON (merged-history tasks); repeatable")
    run.add_argument("--context-arm", choices=ablation.ARMS, default="default", help="gate 3 context ablation: fullfile = whole numbered file instead of excerpt; nosiblings = no folder listing")
    run.add_argument("--reasoning-on", default="", help="comma list of roles to run with thinking on (ablation), e.g. gate1,gate25")
    run.add_argument("--reasoning-off", default="", help="comma list of roles to run with thinking off (ablation), e.g. gate1,gate25")
    run.set_defaults(handler=cmd_run)
    rep = sub.add_parser("report")
    rep.add_argument("--root", required=True)
    rep.add_argument("--name", required=True)
    rep.set_defaults(handler=cmd_report)
    pk = sub.add_parser("pack-check", help="validate a task pack against git history")
    pk.add_argument("pack")
    pk.set_defaults(handler=cmd_pack_check)
    chk = sub.add_parser("check")
    chk.add_argument("--root", required=True)
    chk.add_argument("--name", required=True)
    chk.set_defaults(handler=cmd_check)
    cmp_ = sub.add_parser("compare")
    cmp_.add_argument("baseline")
    cmp_.add_argument("candidate")
    cmp_.set_defaults(handler=cmd_compare)
    args = parser.parse_args(argv)
    if args.cmd == "run" and not set(args.modes.split(",")) <= set(trial.MODES):
        parser.error(f"--modes from {trial.MODES}")
    return args.handler(args, deps) if args.cmd == "run" else args.handler(args)


if __name__ == "__main__":
    raise SystemExit(main())
