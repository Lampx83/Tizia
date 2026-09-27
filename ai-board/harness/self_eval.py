"""Cổng eval của yêu cầu self (self-improve ticket 05), chạy thay Docker smoke ở cổng 5.

Đo sha gốc và sha biến thể, mỗi sha trong 1 worktree + process riêng (trọng số truy xuất, skill, prompt nạp lúc
import: đo đúng code production sẽ chạy). Thứ tự: bộ đo tất định (eval_strata, không GPU) → tụt quá ngưỡng thì
chặn ngay; cổng 1–2.5 với model thật trên phần kiểm tra → thắng/thua/hoà từng task; biến thể sửa prompt cổng 3
chạy thêm gold set (eval_gold). Nhận khi thắng > thua và không nhóm nào tụt. Ngân sách: limits.self_improve.

    python ai-board/harness/self_eval.py strata|tasks|gold < {"tasks": [...], "limit": giây GPU}
"""
from __future__ import annotations

import contextlib
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

HARNESS = Path(__file__).resolve().parent
REPO = HARNESS.parents[1]
LIMITS = json.loads((REPO / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))["limits"]["self_improve"]
EVAL_GPU_S = LIMITS["night_gpu_s"]["eval"]
MAX_DROP = LIMITS["max_stratum_drop_pts"]
GATE3_PROMPTS = {"ai-board/harness/prompts/implement.md"}  # biến thể sửa file này → chạy thêm gold set cổng 3


def _text(plan: dict) -> str:
    return json.dumps(plan, ensure_ascii=False).casefold()


def task_passed(task: dict, plan: dict | None) -> bool:
    """Plan (None = bị chặn) nhắm đúng tập file mong đợi + thoả chuỗi phải có / không được có nếu có nhãn."""
    if not plan:
        return False
    files = {(step.get("allowed_scope") or [""])[0] for step in plan.get("steps") or []}
    text = _text(plan)
    return (files == set(task.get("expected_files") or [])
            and all(s.casefold() in text for s in task.get("must_contain") or [])
            and not any(s.casefold() in text for s in task.get("must_not_contain") or []))


def score(items: list[dict], attempt, limit: float) -> dict:
    """attempt(item, giây GPU còn lại) → (đạt?, giây GPU đã tiêu). Hết ngân sách → không mở item mới.
    exhausted: đã chạm trần (kết quả không đủ để nhận biến thể)."""
    results, units = [], 0
    for item in items:
        if units >= limit:
            break
        passed, spent = attempt(item, limit - units)
        units += spent
        results.append({"id": item["id"], "passed": bool(passed)})
    return {"results": results, "units": units, "exhausted": units >= limit}


# ---- process con: chạy trong worktree của 1 sha, in 1 dòng JSON ----

def _plan_attempt():
    """Cổng 1–2.5 thật của sha này (HarnessPlanner) trên 1 task; GPU-s đếm từ trace mọi lời gọi, kể cả khi chặn."""
    sys.path.insert(0, str(HARNESS.parent))
    from eval_gold import Collect
    from worker import DEFAULT_BUDGET_LIMIT, HarnessPlanner, PlanBlockedError

    tracer = Collect()
    planner = HarnessPlanner(tracer=tracer, source=REPO)

    def attempt(task: dict, left: float):
        before = len(tracer.records)
        text = task.get("request_text") or ""
        snapshot = {"request": {"id": task["id"], "title": text.split("\n", 1)[0][:200], "detail": text,
                                "clarified_spec": task.get("clarified_spec"), "type": "other"},
                    "ticket": {"budget_limit": max(1, int(min(DEFAULT_BUDGET_LIMIT, left)))}}
        try:
            plan, _ = planner(snapshot)
        except PlanBlockedError:
            plan = None
        tracer.flush()
        return task_passed(task, plan), sum(r["budget_units"] for r in tracer.records[before:])
    return attempt


def _gold_attempt():
    """Gold set cổng 3 (eval_gold) với model cổng 3 đang cấu hình."""
    from eval_gold import CASES, run_case
    from main import Deps

    deps = Deps.real()

    def attempt(item: dict, _left: float):
        row = run_case(item["id"], CASES[item["id"]], deps.models.gate3_model, deps)
        return row["oracle"], row["units"]
    return attempt, [{"id": name} for name in CASES]


def child(job: str, payload: dict) -> dict:
    if job == "strata":
        import eval_strata
        return {"strata": eval_strata.measure()[1], "config": eval_strata.config_sha()}
    if job == "tasks":
        return score(payload["tasks"], _plan_attempt(), payload["limit"])
    attempt, cases = _gold_attempt()
    out = score(cases, attempt, payload["limit"])
    return {**out, "results": [{**r, "id": f"gold:{r['id']}"} for r in out["results"]]}


def main(argv=None) -> int:
    job = (argv or sys.argv[1:])[0]
    print(json.dumps(child(job, json.loads(sys.stdin.read() or "{}"))))
    return 0


# ---- process cha: cổng 5 của yêu cầu self ----

@contextlib.contextmanager
def _checkouts(repo, shas):
    """1 worktree tách rời / sha; run_at(sha, job, payload) chạy process con trong đó. Dọn hết khi xong."""
    import candidate

    paths = {}
    try:
        for sha in dict.fromkeys(shas):
            paths[sha] = tempfile.mkdtemp(prefix="ai-board-eval-")
            candidate._git_out(["worktree", "add", "-q", "--detach", paths[sha], sha], repo)

        def run_at(sha: str, job: str, payload: dict) -> dict:
            done = subprocess.run([sys.executable, str(Path(paths[sha], "ai-board", "harness", "self_eval.py")), job],
                                  cwd=paths[sha], input=json.dumps(payload), capture_output=True, text=True,
                                  encoding="utf-8", errors="replace", env={**os.environ, "PYTHONIOENCODING": "utf-8"})
            if done.returncode:
                raise RuntimeError(f"eval {job} @ {sha[:10]} exit {done.returncode}: {done.stderr.strip()[-300:]}")
            return json.loads(done.stdout.strip().splitlines()[-1])
        yield run_at
    finally:
        for path in paths.values():
            candidate.drop_source(repo, path)


def run(state: dict, deps=None, budget=None, *, run_at=None) -> dict:
    """Cổng 5 của yêu cầu self. state: base_sha, commits (sha biến thể = commit cuối), eval_tasks (phần kiểm tra),
    checkout_repo. GPU-s eval cộng dồn ở state['eval_gpu_s'] (lượt thử lại cơ học không được ngân sách mới).
    run_at(sha, job, payload) tiêm được cho test. Không nhận → blocked 'eval'; hết ngân sách → 'budget'."""
    import eval_strata

    base, variant = state.get("base_sha"), ((state.get("commits") or [{}])[-1]).get("sha")
    tasks = state.get("eval_tasks") or []
    changed = {f for c in state.get("commits") or [] for f in c.get("files") or []}
    result = {"accepted": False, "base_sha": base, "variant_sha": variant, "tasks": len(tasks),
              "gold": bool(changed & GATE3_PROMPTS), "gpu_s": state.get("eval_gpu_s", 0), "gpu_s_limit": EVAL_GPU_S}
    evidence = {"runner": "eval", "smoke_passed": False, "http_observed": False, "eval": result}
    state["evidence"] = evidence

    def out(reason: str | None, kind: str | None = None) -> dict:
        return {"gate": 5, "blocked": bool(reason), "reason": reason, "evidence": evidence, "failure_class": kind}

    if not base or not variant:
        return out("thiếu sha gốc hoặc sha biến thể cho eval", "transient")
    try:
        with contextlib.nullcontext(run_at) if run_at else _checkouts(state["checkout_repo"], (base, variant)) as at:
            sides = (("base", base), ("variant", variant))
            measured = {side: at(sha, "strata", {}) for side, sha in sides}
            result["strata"] = {side: m["strata"] for side, m in measured.items()}
            result["config"] = {side: m["config"] for side, m in measured.items()}
            result["dropped"] = eval_strata.regressions(result["strata"]["variant"], result["strata"]["base"], MAX_DROP)
            if result["dropped"]:
                return out(f"nhóm tụt quá {MAX_DROP} điểm: {'; '.join(result['dropped'])}"[:1000], "eval")
            if not tasks:
                return out("chưa có task kiểm tra (phần test của task eval rỗng)", "eval")
            pairs: dict = {}
            for job in ("tasks", "gold") if result["gold"] else ("tasks",):
                for side, sha in sides:
                    got = at(sha, job, {"tasks": tasks, "limit": EVAL_GPU_S - result["gpu_s"]})
                    result["gpu_s"] = state["eval_gpu_s"] = result["gpu_s"] + got["units"]
                    if got["exhausted"]:
                        return out(f"hết ngân sách eval giữa chừng ({job} @ {side}): "
                                   f"{result['gpu_s']}/{EVAL_GPU_S} GPU-s", "budget")
                    for r in got["results"]:
                        pairs.setdefault(r["id"], {})[side] = r["passed"]
    except (OSError, RuntimeError, ValueError, KeyError) as error:  # git/process/Ollama: môi trường, không phải biến thể
        return out(f"eval lỗi: {error}"[:1000], "transient")
    result["pairs"] = [{"id": k, **v} for k, v in pairs.items()]
    wins = sum(p.get("variant", False) and not p.get("base", False) for p in pairs.values())
    losses = sum(p.get("base", False) and not p.get("variant", False) for p in pairs.values())
    result.update(wins=wins, losses=losses, ties=len(pairs) - wins - losses, accepted=wins > losses)
    return out(None) if wins > losses else out(f"thua {losses} task, thắng {wins}, hoà {result['ties']}", "eval")


if __name__ == "__main__":
    raise SystemExit(main())
