"""Fan-out cổng 3 (LF/107): subtask độc lập chạy song song trên cùng model, phụ thuộc thì chờ,
dừng giữa chừng trả `partial` + resume chỉ làm subtask còn thiếu. Model là fake, không chạm mạng."""
import json
import re
import subprocess
import threading

import pytest

from budget import Budget
from conftest import FakeModels, deps_with
from gates import implement
from test_http_worker import MemCursorCheckpoint, ONE_STEP_PLAN, TickBudget, execute_pre_pr, scripted_gates


def source(tmp_path):
    repo = tmp_path / "source"
    (repo / "public").mkdir(parents=True, exist_ok=True)
    (repo / "public/index.html").write_text("<main>\n</main>\n", encoding="utf-8")
    if not (repo / ".git").exists():
        for args in (["init", "-q"], ["add", "-A"], ["-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "b"]):
            subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, stdin=subprocess.DEVNULL)
    return repo


def plan_of(*steps):
    return {"summary_vi": "Hai trang mới", "capabilities": ["features"], "subtasks": list(steps)}


def step(file, *, deps=None, title=None):
    out = {"title": title or f"Trang {file}", "file": file, "verify": f"mở {file} thấy nội dung", "size": "small"}
    if deps is not None:
        out["depends_on"] = deps
    return out


class FileModels(FakeModels):
    """Codegen theo `file:` trong prompt; ghi thứ tự start/end để soi chạy song song hay tuần tự."""

    def __init__(self, plan, *, on_call=None):
        super().__init__(plan)
        self.plan, self.on_call, self.order, self.lock = plan, on_call, [], threading.Lock()

    def generate(self, model, prompt, **kw):
        if model not in (self.gate3_model, self.gate3_model_light):
            return super().generate(model, prompt, **kw)
        file = re.search(r"^- file: (.+)$", prompt, re.M).group(1).strip()
        with self.lock:
            self.order.append(("start", file))
        if self.on_call:
            self.on_call(file)
        body = {"code": f"<main>\n<p>{file}</p>\n</main>\n", "test_file": f"test/{file.rsplit('/', 1)[-1].replace('.html', '')}.test.js",
                "test": f"import test from 'node:test';\n// {file}\n", "prompt_eval_count": 10, "eval_count": 5}
        with self.lock:
            self.order.append(("end", file))
        self.calls.append({"model": model, "prompt": prompt, **kw})
        return {"response": json.dumps(body), "prompt_eval_count": 10, "eval_count": 5}


def run_gate_3(tmp_path, plan, models, *, budget=None, state=None, scratch=None):
    state = {"plan": plan, "checkout_source": str(source(tmp_path)), **(state or {})}
    return implement.run(state, deps_with(models), budget or Budget(max_wall_clock_s=999),
                         repo_dir=scratch or tmp_path / "scratch")


def test_two_independent_subtasks_are_in_flight_at_the_same_time_and_write_their_own_file(tmp_path):
    barrier = threading.Barrier(2, timeout=10)
    models = FileModels(plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[])),
                        on_call=lambda _file: barrier.wait())
    out = run_gate_3(tmp_path, models.plan, models)

    assert out["blocked"] is False, out.get("reason")
    assert [d["file"] for d in out["diffs"]] == ["public/a.html", "public/b.html"]  # ghi file tuần tự, đúng thứ tự plan
    assert (tmp_path / "scratch/public/a.html").read_text(encoding="utf-8") == "<main>\n<p>public/a.html</p>\n</main>\n"
    assert (tmp_path / "scratch/public/b.html").exists()
    assert len([c for c in models.order if c[0] == "start"]) == 2


def test_a_dependent_subtask_waits_for_the_one_it_depends_on(tmp_path):
    models = FileModels(plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1])))
    out = run_gate_3(tmp_path, models.plan, models)

    assert out["blocked"] is False, out.get("reason")
    assert models.order == [("start", "public/a.html"), ("end", "public/a.html"),
                            ("start", "public/b.html"), ("end", "public/b.html")]


def test_diffs_come_back_in_plan_order_even_when_a_dag_level_finishes_out_of_order(tmp_path):
    """Seam 3→4 (services/candidate.py) ghép zip(subtasks, diffs) theo thứ tự plan; lớp DAG
    chạy [2,4] song song trước [3,5] (run 51) đã làm diffs [1,2,4,3,5] → ScopeViolation oan."""
    models = FileModels(plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1]),
                                step("public/c.html", deps=[2]), step("public/d.html", deps=[1]),
                                step("public/e.html", deps=[4])))
    out = run_gate_3(tmp_path, models.plan, models)

    assert out["blocked"] is False, out.get("reason")
    assert [d["file"] for d in out["diffs"]] == ["public/a.html", "public/b.html", "public/c.html",
                                                 "public/d.html", "public/e.html"]
    # model vẫn chạy đúng lớp: d song song với b (cả hai phụ thuộc a), trước c và e
    assert models.order[0] == ("start", "public/a.html")
    starts = [f for kind, f in models.order if kind == "start"]
    assert starts.index("public/d.html") < starts.index("public/c.html")


def test_a_single_subtask_request_never_starts_a_thread_pool(tmp_path, monkeypatch):
    def forbidden(*_a, **_k):
        raise AssertionError("request một subtask phải chạy tuần tự như cũ")

    monkeypatch.setattr(implement, "ThreadPoolExecutor", forbidden)
    models = FileModels(plan_of(step("public/one.html")))
    out = run_gate_3(tmp_path, models.plan, models)
    assert out["blocked"] is False and len(out["diffs"]) == 1


def test_two_subtasks_that_write_the_same_file_block_the_plan(tmp_path):
    models = FileModels(plan_of(step("public/a.html", deps=[]), step("public/a.html", deps=[])))
    out = run_gate_3(tmp_path, models.plan, models)
    assert out["blocked"] is True and out["failure_class"] == "plan"
    assert "cùng ghi public/a.html" in out["reason"]
    assert models.calls == []


class MemProgress:
    """Checkpoint tiến độ cổng 3 trong bộ nhớ (worker thật lưu ở tool_run/tool_step, khoá theo lần sửa)."""

    def __init__(self, n=0, saved=None):
        self.n = n
        self.saved = {} if saved is None else saved

    def attempt(self, n):
        return MemProgress(n, self.saved)

    def restore(self, _budget):
        pass

    def save(self, _budget):
        pass

    def purge(self):
        raise AssertionError("partial phải giữ checkpoint")

    def load_progress(self, base_sha):
        return dict(self.saved.get((base_sha, self.n), {}))

    def save_progress(self, base_sha, data):
        self.saved[(base_sha, self.n)] = dict(data)


def test_a_root_allowance_block_inside_a_model_call_still_reports_partial(tmp_path):
    """Root allowance hết NGAY TRONG lời gọi model (reserve bị server từ chối): các subtask đã xong phải được
    ghi lại và verdict là `partial`, không phải một gate 3 văng lỗi `budget` mất tiến độ."""
    from runtime.budget import BudgetExhausted

    checkpoint = MemProgress()

    def exhaust(file):
        if file == "public/b.html":
            error = BudgetExhausted("root_allowance_exhausted")
            error.before_model = True
            raise error

    plan = plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1]),
                   step("public/c.html", deps=[2]))
    models = FileModels(plan, on_call=exhaust)
    out = run_gate_3(tmp_path, plan, models, state={"checkpoint": checkpoint})

    assert out["blocked"] is True and out["failure_class"] == "partial"
    assert out["partial"] == {"done": 1, "total": 3, "remaining": ["public/b.html", "public/c.html"]}
    assert [d["file"] for d in out["diffs"]] == ["public/a.html"]
    assert set(checkpoint.saved[next(iter(checkpoint.saved))]) == {"1"}


def test_budget_running_out_mid_plan_blocks_as_partial_and_the_resume_only_does_the_rest(tmp_path):
    checkpoint = MemProgress()
    plan = plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1]), step("public/c.html", deps=[2]))
    models = FileModels(plan)
    out = run_gate_3(tmp_path, plan, models, budget=Budget(max_model_calls=2, max_wall_clock_s=999),
                     state={"checkpoint": checkpoint})

    assert out["blocked"] is True and out["failure_class"] == "partial"
    assert out["partial"] == {"done": 2, "total": 3, "remaining": ["public/c.html"]}
    assert [d["file"] for d in out["diffs"]] == ["public/a.html", "public/b.html"]
    assert set(checkpoint.saved[next(iter(checkpoint.saved))]) == {"1", "2"}

    resumed_models = FileModels(plan)
    resumed = run_gate_3(tmp_path, plan, resumed_models, state={"checkpoint": checkpoint},
                         scratch=tmp_path / "scratch-resumed")
    assert resumed["blocked"] is False, resumed.get("reason")
    assert [d["file"] for d in resumed["diffs"]] == ["public/a.html", "public/b.html", "public/c.html"]
    # a và b dựng lại từ checkpoint: chỉ c cần gọi model
    assert [c for c in resumed_models.order if c[0] == "start"] == [("start", "public/c.html")]


def test_a_repair_attempt_regenerates_every_subtask_instead_of_reusing_the_partial_progress(tmp_path):
    checkpoint = MemProgress()
    plan = plan_of(step("public/a.html", deps=[]), step("public/b.html", deps=[1]))
    first = FileModels(plan)
    run_gate_3(tmp_path, plan, first, budget=Budget(max_model_calls=1, max_wall_clock_s=999),
               state={"checkpoint": checkpoint})
    assert checkpoint.saved

    repair = FileModels(plan)
    out = run_gate_3(tmp_path, plan, repair, state={"checkpoint": checkpoint.attempt(1)},
                     scratch=tmp_path / "scratch-repair")
    assert out["blocked"] is False
    # Lượt sửa phải sinh lại cả 2 subtask (không bỏ qua subtask đã ghi ở lượt trước).
    assert [c for c in repair.order if c[0] == "start"] == [("start", "public/a.html"), ("start", "public/b.html")]


def test_a_partial_gate_3_is_a_verdict_that_keeps_the_checkpoint_and_spends_no_repair():
    purged = []

    class Spy(MemCursorCheckpoint):
        def purge(self):
            purged.append(1)

    partial = {"blocked": True, "reason": "hoàn thành một phần 1/3 subtask; còn 2", "failure_class": "partial"}
    run_gate, calls = scripted_gates({3: [partial]})
    verdict = execute_pre_pr(ONE_STEP_PLAN, ticket_id=7, checkout_source="unused", deps=object(), budget=TickBudget(),
                             run_gate=run_gate, cleanup=lambda *_, **__: None, checkpoint=Spy())

    assert verdict["outcome"] == "blocked" and verdict["failure_class"] == "partial"
    assert [gate for gate, _ in calls] == [3]  # partial không vào lượt sửa
    assert purged == []  # còn resume được


def test_fanout_limit_reads_the_env_and_never_exceeds_one_workload(monkeypatch):
    assert implement.fanout_limit({}) == 2
    assert implement.fanout_limit({implement.FANOUT_ENV: "1"}) == 1
    assert implement.fanout_limit({implement.FANOUT_ENV: "9"}) == 4
    assert implement.fanout_limit({implement.FANOUT_ENV: "nonsense"}) == 2
    monkeypatch.setenv(implement.FANOUT_ENV, "1")
    assert implement.fanout_limit() == 1
