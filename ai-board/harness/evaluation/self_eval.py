"""Cổng eval của yêu cầu self, chạy thay Docker smoke ở cổng 5.

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

HARNESS = Path(__file__).resolve().parent.parent
REPO = HARNESS.parents[1]
LIMITS = json.loads((REPO / "server" / "ai-board" / "contract.json").read_text(encoding="utf-8"))["limits"]["self_improve"]
EVAL_GPU_S = LIMITS["night_gpu_s"]["eval"]
MAX_DROP = LIMITS["max_stratum_drop_pts"]
GATE3_PROMPTS = {"ai-board/harness/prompts/implement.md"}  # biến thể sửa file này → chạy thêm gold set cổng 3
JUDGE = LIMITS["shadow_judge"]  # giám khảo model shadow: chỉ ghi, không đổi verdict
JUDGE_PROMPT_NAME = "judge.md"
JUDGE_SCHEMA = {"type": "object", "required": ["better", "reason"],
                "properties": {"better": {"type": "string", "enum": ["A", "B", "tie"]}, "reason": {"type": "string"}}}
MAX_PLAN = 3000  # ký tự plan / bên trong prompt giám khảo


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
    """attempt(item, giây GPU còn lại) → (đạt?, giây GPU đã tiêu[, plan text cho giám khảo]). Hết ngân sách →
    không mở item mới. exhausted: đã chạm trần (kết quả không đủ để nhận biến thể)."""
    results, units = [], 0
    for item in items:
        if units >= limit:
            break
        passed, spent, *plan = attempt(item, limit - units)
        units += spent
        results.append({"id": item["id"], "passed": bool(passed), **({"plan": plan[0]} if plan else {})})
    return {"results": results, "units": units, "exhausted": units >= limit}


# ---- process con: chạy trong worktree của 1 sha, in 1 dòng JSON ----

def _plan_attempt():
    """Cổng 1–2.5 thật của sha này (HarnessPlanner) trên 1 task; GPU-s đếm từ trace mọi lời gọi, kể cả khi chặn."""
    sys.path.insert(0, str(HARNESS.parent))
    from evaluation.gold import Collect
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
        return (task_passed(task, plan), sum(r["budget_units"] for r in tracer.records[before:]),
                json.dumps(plan, ensure_ascii=False)[:MAX_PLAN] if plan else "")
    return attempt


def _gold_attempt():
    """Gold set cổng 3 (eval_gold) với model cổng 3 đang cấu hình."""
    from evaluation.gold import CASES, run_case
    from runtime.pipeline import Deps

    deps = Deps.real()

    def attempt(item: dict, _left: float):
        row = run_case(item["id"], CASES[item["id"]], deps.models.gate3_model, deps)
        return row["oracle"], row["units"]
    return attempt, [{"id": name} for name in CASES]


def child(job: str, payload: dict) -> dict:
    if job == "strata":
        from evaluation import strata as eval_strata
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
    from services import candidate

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


def run_frozen(sha: str, tasks: list[dict], budget: float, *, checkout_repo=None, run_at=None) -> dict:
    """Đo bộ đánh giá đóng băng 1 lần ở `sha` (gọi sau khi 1 thay đổi self vừa merge):
    bộ đo tất định hiện tại (eval_strata) + gold cổng 3 (eval_gold) + task đóng băng đã gắn nhãn (server lọc qua
    eval-tasks.js frozenTasks) — cùng process con job strata/gold/tasks self_eval.py đã có cho cổng eval của
    yêu cầu self, không chạy lại logic riêng, trong 1 worktree tách rời của đúng sha đó (run_at tiêm được cho
    test). Không bao giờ chọn biến thể, chỉ ghi lại để vẽ đường cong học trước hội đồng.
    Trả {sha, config, strata (kèm gold_gate3, frozen_tasks nếu có dữ liệu), gpu_s}."""
    with contextlib.nullcontext(run_at) if run_at else _checkouts(checkout_repo, (sha,)) as at:
        got = at(sha, "strata", {})
        strata = dict(got["strata"])
        spent = 0.0
        gold = at(sha, "gold", {"tasks": [], "limit": budget})
        spent += gold["units"]
        if gold["results"]:
            strata["gold_gate3"] = round(100 * sum(r["passed"] for r in gold["results"]) / len(gold["results"]), 1)
        left = budget - spent
        if tasks and left > 0:
            got_tasks = at(sha, "tasks", {"tasks": tasks, "limit": left})
            spent += got_tasks["units"]
            if got_tasks["results"]:
                strata["frozen_tasks"] = round(100 * sum(r["passed"] for r in got_tasks["results"]) / len(got_tasks["results"]), 1)
        return {"sha": sha, "config": got["config"], "strata": strata, "gpu_s": round(spent, 1)}


def _judge(tasks: list[dict], pairs: dict, plans: dict, deps, left: float) -> dict:
    """Giám khảo shadow: model chọn plan gốc (A) hay biến thể (B) từng cặp; so với luật tất định. Chỉ dùng phần
    ngân sách eval còn lại; cặp mà lời gọi có thể vượt (ước = lời gọi đắt nhất đã thấy) → skipped. Model lỗi /
    trả sai khuôn → skipped. Không raise."""
    from runtime.budget import Budget

    prompt = (HARNESS / "prompts" / JUDGE_PROMPT_NAME).read_text(encoding="utf-8")
    requests = {t["id"]: t.get("request_text") or "" for t in tasks}
    out = {"pairs": [], "agree": 0, "disagree": 0, "skipped": 0, "gpu_s": 0}
    need = 1  # ponytail: ước phí = lời gọi đắt nhất đã thấy; lời gọi đầu vẫn có thể vượt phần còn lại
    for pid, sides in plans.items():
        if set(sides) != {"base", "variant"}:
            continue
        p = pairs[pid]
        rule = "variant" if p["variant"] and not p["base"] else "base" if p["base"] and not p["variant"] else "tie"
        if left - out["gpu_s"] < need:
            out["skipped"] += 1
            continue
        budget = Budget(max_units=max(1, int(left - out["gpu_s"])), max_model_calls=1)
        try:
            # ponytail: A luôn là gốc — lệch vị trí của model (nếu có) nằm trong tỉ lệ đồng ý; đổi chỗ khi cần đo lệch
            body = deps.call_model(deps.models.gate3_model,
                                   prompt.format(request=requests.get(pid, ""), a=sides["base"], b=sides["variant"]),
                                   gate=5, budget=budget, prompt_name=JUDGE_PROMPT_NAME, format=JUDGE_SCHEMA,
                                   **({'role': 'eval_judge'} if getattr(deps.models, 'routing', None) else {}))
            pick = {"A": "base", "B": "variant", "tie": "tie"}[json.loads(body.get("response", ""))["better"]]
        except Exception:  # noqa: BLE001 — shadow: lỗi giám khảo không bao giờ chạm verdict
            pick = None
        out["gpu_s"] += budget.units
        need = max(need, budget.units)
        if pick is None:
            out["skipped"] += 1
            continue
        out["pairs"].append({"id": pid, "pick": pick, "rule": rule})
        out["agree" if pick == rule else "disagree"] += 1
    return out


def run(state: dict, deps=None, budget=None, *, run_at=None) -> dict:
    """Cổng 5 của yêu cầu self. state: base_sha, commits (sha biến thể = commit cuối), eval_tasks (phần kiểm tra),
    checkout_repo. GPU-s eval cộng dồn ở state['eval_gpu_s'] (lượt thử lại cơ học không được ngân sách mới).
    run_at(sha, job, payload) tiêm được cho test. Không nhận → blocked 'eval'; hết ngân sách → 'budget'."""
    from evaluation import strata as eval_strata

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
            plans: dict = {}
            for job in ("tasks", "gold") if result["gold"] else ("tasks",):
                for side, sha in sides:
                    got = at(sha, job, {"tasks": tasks, "limit": EVAL_GPU_S - result["gpu_s"]})
                    result["gpu_s"] = state["eval_gpu_s"] = result["gpu_s"] + got["units"]
                    if got["exhausted"]:
                        return out(f"hết ngân sách eval giữa chừng ({job} @ {side}): "
                                   f"{result['gpu_s']}/{EVAL_GPU_S} GPU-s", "budget")
                    for r in got["results"]:
                        pairs.setdefault(r["id"], {})[side] = r["passed"]
                        if "plan" in r:
                            plans.setdefault(r["id"], {})[side] = r["plan"]
    except (OSError, RuntimeError, ValueError, KeyError) as error:  # git/process/Ollama: môi trường, không phải biến thể
        return out(f"eval lỗi: {error}"[:1000], "transient")
    result["pairs"] = [{"id": k, **v} for k, v in pairs.items()]
    wins = sum(p.get("variant", False) and not p.get("base", False) for p in pairs.values())
    losses = sum(p.get("base", False) and not p.get("variant", False) for p in pairs.values())
    result.update(wins=wins, losses=losses, ties=len(pairs) - wins - losses, accepted=wins > losses)
    if JUDGE and deps is not None:
        result["judge"] = _judge(tasks, pairs, plans, deps, EVAL_GPU_S - result["gpu_s"])
        result["gpu_s"] = state["eval_gpu_s"] = result["gpu_s"] + result["judge"]["gpu_s"]
    return out(None) if wins > losses else out(f"thua {losses} task, thắng {wins}, hoà {result['ties']}", "eval")


if __name__ == "__main__":
    raise SystemExit(main())
