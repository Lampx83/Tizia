"""Vòng tự cải thiện ban đêm (self-improve ticket 07): đồng hồ giả + server giả + model giả,
không Ollama, không mạng, không cron thật. run_self_improve_night làm 1 BƯỚC/lần gọi (đồng bộ PR, hoặc 1
lần chẩn đoán) — main() gọi lại mỗi lượt poll khi rảnh việc thật, nên test cũng gọi lặp lại như vậy."""
from __future__ import annotations

import json
import sys
from pathlib import Path

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from worker import _local_night, run_self_improve_night  # noqa: E402
from main import Deps  # noqa: E402

WINDOW = {"start": "03:00", "end": "05:30", "tz": "Asia/Ho_Chi_Minh"}
IN_WINDOW_MS = 1_790_541_000_000   # 2026-09-28T03:30:00+07:00
OUT_WINDOW_MS = 1_790_550_000_000  # 2026-09-28T06:00:00+07:00
NOW = 1_800_000_000_000
GOOD = {"hypothesis": "skill sửa JS không đọc module render nên nhắm sai file",
        "target_file": "ai-board/harness/skills/fix-js-behavior/SKILL.md",
        "expected_effect": "cổng 1 nhắm đúng file JS cho yêu cầu logic"}


def task(id, *, skill="fix-js-behavior", days_ago=1, source="miss"):
    return {"id": id, "source": source, "trigger": "verdict_blocked", "request_id": 100 + id,
            "run_id": 500 + id, "request_text": f"yêu cầu học số {id}", "clarified_spec": None,
            "base_sha": "abc", "gate": 1, "failure_class": "plan", "skill": skill,
            "expected_files": [f"public/p{id}.html"], "must_contain": None, "must_not_contain": None,
            "status": "labelled", "created_at": NOW - days_ago * 86_400_000}


class FakeModels:
    gate3_model = "fake-14b"

    def __init__(self, *replies):
        self.replies, self.prompts = list(replies), []

    def generate(self, model, prompt, **kw):
        self.prompts.append(prompt)
        reply = self.replies.pop(0) if self.replies else GOOD
        return {"response": json.dumps(reply, ensure_ascii=False), "prompt_eval_count": 100,
                "eval_count": 50, "eval_duration": 2_000_000_000}


class FakeNightServer:
    """server + worker/self-improve/night(-report) + eval-tasks + self-requests + frozen-benchmark, không mạng."""

    def __init__(self, *, run=True, reason=None, skip_clusters=None, learning=None, self_replies=None,
                 frozen_pending=None, frozen_tasks=None, watch_pending=None):
        self.run, self.reason, self.skip_clusters = run, reason, list(skip_clusters or [])
        self.night_state = {"variants": [], "pr_sync": None, "gpu_s_propose": 0}
        self.learning = learning if learning is not None else [task(1)]
        self.self_replies = list(self_replies) if self_replies is not None else None  # None → dựng tự động
        self.calls = []
        self._next_request_id = 900
        self.frozen_pending = list(frozen_pending or [])  # [{pr_number, sha}], self-improve ticket 08
        self.frozen_tasks = list(frozen_tasks or [])
        self.frozen_reports = []
        self.watch_pending = list(watch_pending or [])  # [{pr_number, sha, closed_at}], self-improve ticket 09
        self.watch_checked = []

    def post(self, path, payload):
        self.calls.append((path, payload))
        if path.endswith("/self-improve/night") and "report" not in path:
            return {"run": self.run, "reason": self.reason, "night": dict(self.night_state),
                    "skip_clusters": self.skip_clusters}
        if path.endswith("/night/report"):
            if "variant" in payload:
                self.night_state["variants"] = [*self.night_state["variants"], payload["variant"]]
            if "pr_sync" in payload:
                self.night_state["pr_sync"] = payload["pr_sync"]
            if "gpu_s_propose" in payload:
                self.night_state["gpu_s_propose"] = payload["gpu_s_propose"]
            return {"night": dict(self.night_state)}
        if path.endswith("/eval-tasks"):
            return {"ready": True, "labelled": 30, "min_tasks": 20, "split": 0.7,
                    "learning": self.learning, "test": []}
        if path.endswith("/self-requests"):
            if self.self_replies is not None:
                return self.self_replies.pop(0)
            self._next_request_id += 1
            return {"ok": True, "request_id": self._next_request_id, "root_ticket_id": self._next_request_id,
                    "folder_id": None, "created": True}
        if path.endswith("/frozen-benchmark/pending"):
            done = {r["pr_number"] for r in self.frozen_reports}
            return {"pending": [p for p in self.frozen_pending if p["pr_number"] not in done], "tasks": self.frozen_tasks}
        if path.endswith("/frozen-benchmark/report"):
            self.frozen_reports.append(payload)
            return {"score": payload}
        if path.endswith("/post-merge-watch/pending"):
            done = {c["pr_number"] for c in self.watch_checked}
            return {"pending": [p for p in self.watch_pending if p["pr_number"] not in done]}
        if path.endswith("/post-merge-watch/check"):
            self.watch_checked.append(payload)
            return {"watch": {"pr_number": payload["pr_number"], "status": "ok"}}
        raise AssertionError(path)


def deps(*replies):
    return Deps(models=FakeModels(*replies), notify=None)


def calls_to(server, suffix):
    return [p for p in server.calls if p[0].endswith(suffix)]


def variant_reports(server):
    return [p["variant"] for _, p in calls_to(server, "/night/report") if "variant" in p]


def run_full_night(server, night_deps, clock, max_steps=20):
    """Gọi lặp lại như main() gọi mỗi lượt poll, đến khi done/outside_window/not_run. Trả list các bước."""
    steps = []
    for _ in range(max_steps):
        out = run_self_improve_night(server, night_deps, clock=clock)
        steps.append(out)
        if out["status"] in ("done", "outside_window", "not_run"):
            break
    return steps


def test_local_night_reports_the_local_date_and_whether_inside_the_window():
    assert _local_night(IN_WINDOW_MS, WINDOW) == ("2026-09-28", True)
    assert _local_night(OUT_WINDOW_MS, WINDOW) == ("2026-09-28", False)


def test_outside_the_window_the_loop_does_nothing():
    server = FakeNightServer()
    out = run_self_improve_night(server, deps(), clock=lambda: OUT_WINDOW_MS)
    assert out == {"status": "outside_window"}
    assert server.calls == []


def test_the_server_can_refuse_a_night_switch_off_not_enough_tasks_pr_open_paused():
    server = FakeNightServer(run=False, reason="disabled")
    out = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert out == {"status": "not_run", "reason": "disabled"}
    assert calls_to(server, "/eval-tasks") == []  # không hỏi task khi server đã từ chối


def test_one_call_does_at_most_one_step_pr_sync_first_then_one_diagnosis():
    server = FakeNightServer(learning=[task(1), task(2)])
    d = deps(GOOD)
    first = run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)
    assert first == {"status": "progress", "step": "pr_sync"}
    assert calls_to(server, "/self-requests") == []  # bước 1 chỉ đồng bộ PR, chưa chẩn đoán
    second = run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)
    assert second["status"] == "progress" and second["step"] == "created" and second["variants"] == 1
    assert len(calls_to(server, "/self-requests")) == 1  # bước 2 mới chẩn đoán, đúng 1 lần
    variant = variant_reports(server)[0]
    assert variant["status"] == "waiting" and variant["diagnosis"]["target_file"] == GOOD["target_file"]
    third = run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)
    assert third == {"status": "done", "variants": 1}  # cụm duy nhất đã dùng: hết việc


def test_pr_sync_runs_only_once_a_night():
    server = FakeNightServer(learning=[])
    server.night_state["pr_sync"] = {"status": "skipped", "reason": "already synced earlier this tick"}
    run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert calls_to(server, "/pull-requests/open") == []
    assert not any("pr_sync" in p for _, p in calls_to(server, "/night/report"))


def test_no_cluster_left_ends_the_night_as_done_without_calling_the_model():
    server = FakeNightServer(learning=[])  # phần học rỗng → không có cụm
    steps = run_full_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert [s["status"] for s in steps] == ["progress", "done"]
    assert calls_to(server, "/self-requests") == []


def test_stops_at_max_variants_per_night():
    from worker import LIMITS
    max_variants = LIMITS["self_improve"]["max_variants_per_night"]
    tasks = [task(i, skill=f"skill-{i}") for i in range(1, 6)]  # 5 cụm khác nhau, đủ cho > trần
    replies = [GOOD] * max_variants
    server = FakeNightServer(learning=tasks, self_replies=[
        {"ok": True, "request_id": 900 + i, "root_ticket_id": 900 + i, "created": True} for i in range(max_variants)
    ])
    steps = run_full_night(server, deps(*replies), clock=lambda: IN_WINDOW_MS)
    assert steps[-1] == {"status": "done", "variants": max_variants}
    assert len(calls_to(server, "/self-requests")) == max_variants


def test_a_dropped_diagnosis_ends_the_night_without_retrying_forever():
    server = FakeNightServer(learning=[task(1)])
    steps = run_full_night(server, deps("not json", "not json", "not json"), clock=lambda: IN_WINDOW_MS)
    assert steps[-1] == {"status": "done", "variants": 0}
    assert len(calls_to(server, "/self-requests")) == 0  # bỏ cụm: không tạo yêu cầu self
    [dropped] = variant_reports(server)
    assert dropped["status"] == "dropped" and dropped["cluster"]["key"] == "1|plan|fix-js-behavior"


def test_a_dropped_cluster_is_skipped_but_a_second_cluster_still_gets_tried():
    tasks = [task(1, skill="fix-js-behavior"), task(2, skill="edit-css-style")]
    server = FakeNightServer(learning=tasks)
    steps = run_full_night(server, deps("not json", "not json", "not json", GOOD), clock=lambda: IN_WINDOW_MS)
    assert steps[-1] == {"status": "done", "variants": 1}
    assert [v["status"] for v in variant_reports(server)] == ["dropped", "waiting"]


def test_the_window_ending_between_polls_stops_the_night_with_no_extra_calls():
    # 2 lượt poll trong cửa sổ (đủ cho bước pr_sync rồi bước chẩn đoán), rồi hết giờ mãi mãi.
    from itertools import chain, repeat
    clock = iter(chain([IN_WINDOW_MS, IN_WINDOW_MS], repeat(OUT_WINDOW_MS))).__next__
    server = FakeNightServer(learning=[task(1), task(2)])
    d = deps(GOOD)
    steps = [run_self_improve_night(server, d, clock=clock) for _ in range(4)]
    assert [s["status"] for s in steps] == ["progress", "progress", "outside_window", "outside_window"]
    assert len(calls_to(server, "/self-requests")) == 1  # hết giờ trước khi kịp bước chẩn đoán tiếp theo
    calls_before_window_end = len(server.calls)
    run_self_improve_night(server, d, clock=clock)
    assert len(server.calls) == calls_before_window_end  # ngoài cửa sổ: không gọi server thêm gì cả


# ---- bộ đánh giá đóng băng (ticket 08): 1 self PR vừa merge → đo đúng 1 lần trước khi chẩn đoán tiếp tục ----

def test_a_merged_self_pr_is_measured_once_before_diagnosis_resumes(monkeypatch):
    import self_eval

    calls = []

    def fake_run_frozen(sha, tasks, budget, **kw):
        calls.append((sha, tasks, budget, kw.get("checkout_repo")))
        return {"sha": sha, "config": {"prompts.lock.json": "abc1234567"}, "strata": {"type=ui": 80.0}, "gpu_s": 12.0}

    monkeypatch.setattr(self_eval, "run_frozen", fake_run_frozen)
    server = FakeNightServer(learning=[], frozen_pending=[{"pr_number": 50, "sha": "f" * 40}], frozen_tasks=[task(1)])
    from worker import LIMITS, REPO_ROOT

    first = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert first == {"status": "progress", "step": "pr_sync"}
    assert calls_to(server, "/frozen-benchmark/pending") == []  # bước 1 chỉ đồng bộ PR

    second = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert second == {"status": "progress", "step": "frozen_measured", "pr_number": 50}
    assert calls == [("f" * 40, [task(1)], LIMITS["self_improve"]["night_gpu_s"]["eval"], REPO_ROOT)]
    [reported] = server.frozen_reports
    assert reported == {"pr_number": 50, "sha": "f" * 40, "config": {"prompts.lock.json": "abc1234567"},
                        "strata": {"type=ui": 80.0}, "gpu_s": 12.0}

    third = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert third == {"status": "done", "variants": 0}  # đã đo xong, phần học rỗng: hết việc cho đêm nay
    assert calls_to(server, "/frozen-benchmark/pending")[-1][1] == {}  # gọi lại: không còn pending, không đo nữa
    assert len(calls) == 1


def test_no_pending_frozen_measurement_falls_straight_through_to_diagnosis():
    server = FakeNightServer(learning=[task(1)])  # frozen_pending mặc định rỗng
    d = deps(GOOD)
    run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)  # pr_sync
    second = run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)  # bỏ qua bước đo, chẩn đoán luôn
    assert second["status"] == "progress" and second["step"] == "created"
    assert calls_to(server, "/frozen-benchmark/report") == []


# ---- theo dõi production sau merge + tự revert (ticket 09): 1 self PR đã merge có cửa sổ "sau" đã trôi qua,
# chưa kết luận → server tự tính (không cần model/GPU), worker chỉ báo đúng pr_number cần kiểm, trước chẩn đoán ----

def test_a_pending_post_merge_watch_is_checked_once_before_diagnosis_resumes():
    server = FakeNightServer(learning=[], watch_pending=[{"pr_number": 72, "sha": "c" * 40, "closed_at": 1}])

    first = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert first == {"status": "progress", "step": "pr_sync"}
    assert calls_to(server, "/post-merge-watch/pending") == []  # bước 1 chỉ đồng bộ PR

    second = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert second == {"status": "progress", "step": "post_merge_watched", "pr_number": 72}
    assert [p for _, p in calls_to(server, "/post-merge-watch/check")] == [{"pr_number": 72}]

    third = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert third == {"status": "done", "variants": 0}  # đã kiểm xong, phần học rỗng: hết việc cho đêm nay
    assert calls_to(server, "/post-merge-watch/pending")[-1][1] == {}  # gọi lại: không còn pending, không kiểm nữa
    assert len(server.watch_checked) == 1


def test_no_pending_post_merge_watch_falls_straight_through_to_diagnosis():
    server = FakeNightServer(learning=[task(1)])  # watch_pending mặc định rỗng
    d = deps(GOOD)
    run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)  # pr_sync
    second = run_self_improve_night(server, d, clock=lambda: IN_WINDOW_MS)  # bỏ qua bước theo dõi, chẩn đoán luôn
    assert second["status"] == "progress" and second["step"] == "created"
    assert calls_to(server, "/post-merge-watch/check") == []


def test_multiple_pending_post_merge_watches_are_checked_one_per_call():
    server = FakeNightServer(learning=[], watch_pending=[
        {"pr_number": 10, "sha": "a" * 40, "closed_at": 1}, {"pr_number": 11, "sha": "b" * 40, "closed_at": 2}])
    run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)  # pr_sync
    a = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert a == {"status": "progress", "step": "post_merge_watched", "pr_number": 10}
    b = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert b == {"status": "progress", "step": "post_merge_watched", "pr_number": 11}
    c = run_self_improve_night(server, deps(), clock=lambda: IN_WINDOW_MS)
    assert c == {"status": "done", "variants": 0}
    assert [p["pr_number"] for p in server.watch_checked] == [10, 11]


def test_skip_clusters_from_the_server_are_passed_to_diagnosis():
    tasks = [task(1, skill="fix-js-behavior"), task(2, skill="fix-js-behavior"), task(3, skill="edit-css-style")]
    server = FakeNightServer(learning=tasks, skip_clusters=["1|plan|fix-js-behavior"])
    steps = run_full_night(server, deps(GOOD), clock=lambda: IN_WINDOW_MS)
    assert steps[-1] == {"status": "done", "variants": 1}
    [variant] = variant_reports(server)
    assert variant["cluster"]["key"] == "1|plan|edit-css-style"  # cụm fix-js-behavior bị bỏ qua
