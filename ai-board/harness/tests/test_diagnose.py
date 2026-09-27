"""Chẩn đoán → yêu cầu self (self-improve ticket 06): server giả + model giả, không Ollama, không mạng."""
from __future__ import annotations

import json
import random
import urllib.error
from io import BytesIO

import diagnose
from main import Deps

DAY = 86_400_000
NOW = 1_800_000_000_000
TEST_MARKER = "BI_MAT_PHAN_KIEM_TRA"


def task(id, *, gate=1, failure_class="plan", skill="fix-js-behavior", days_ago=1, source="miss", run_id=None):
    return {"id": id, "source": source, "trigger": "verdict_blocked", "request_id": 100 + id,
            "run_id": run_id or 500 + id, "request_text": f"yêu cầu học số {id}", "clarified_spec": None,
            "base_sha": "abc", "gate": gate, "failure_class": failure_class, "skill": skill,
            "expected_files": [f"public/p{id}.html"], "must_contain": None, "must_not_contain": None,
            "status": "labelled", "created_at": NOW - days_ago * DAY}


class FakeServer:
    def __init__(self, learning, *, ready=True, reject=None):
        self.learning, self.ready, self.reject, self.calls = learning, ready, reject, []

    def post(self, path, payload):
        self.calls.append((path, payload))
        if path.endswith("/eval-tasks"):
            test = [{**task(900 + i), "request_text": TEST_MARKER} for i in range(3)]
            return {"ready": self.ready, "labelled": 30, "min_tasks": 20, "split": 0.7,
                    "learning": self.learning, "test": test}
        if path.endswith("/self-requests"):
            if self.reject:
                body = json.dumps({"error": self.reject}).encode()
                raise urllib.error.HTTPError(path, 422, "Unprocessable", {}, BytesIO(body))
            return {"ok": True, "request": {"id": 77}, "root_ticket_id": 88, "created": True}
        raise AssertionError(path)


class FakeModels:
    gate3_model = "fake-14b"

    def __init__(self, *replies):
        self.replies, self.prompts = list(replies), []

    def generate(self, model, prompt, **kw):
        assert model == self.gate3_model
        self.prompts.append(prompt)
        reply = self.replies.pop(0)
        return {"response": reply if isinstance(reply, str) else json.dumps(reply, ensure_ascii=False),
                "prompt_eval_count": 100, "eval_count": 50, "eval_duration": 2_000_000_000}


GOOD = {"hypothesis": "skill sửa JS không đọc module render nên nhắm sai file",
        "target_file": "ai-board/harness/skills/fix-js-behavior/SKILL.md",
        "expected_effect": "cổng 1 nhắm đúng file JS cho yêu cầu logic"}


def run(server, models, tmp_path, **kw):
    return diagnose.diagnose_to_self_request(server, Deps(models=models, notify=None), now_ms=NOW,
                                             trace_path=tmp_path / "traces.jsonl", **kw)


def self_requests(server):
    return [payload for path, payload in server.calls if path.endswith("/self-requests")]


# ── chọn cụm: thuần tất định ──

def test_picks_the_cluster_with_most_misses_in_the_last_30_days():
    tasks = [task(1, skill="edit-css-style"), task(2, skill="edit-css-style"),
             task(3), task(4, days_ago=40), task(5, days_ago=45), task(6, days_ago=50),  # cũ: không tính
             task(7, source="win"), task(8, source="win")]  # win không phải lần hỏng
    picked = diagnose.pick_cluster(tasks, NOW)
    assert picked["key"] == "1|plan|edit-css-style"
    assert [t["id"] for t in picked["tasks"]] == [1, 2]


def test_tie_goes_to_the_cluster_whose_stratum_scores_lowest():
    tasks = [task(1, skill="edit-css-style"), task(2, skill="fix-js-behavior")]
    strata = {"type=ui": 100.0, "type=logic": 50.0, "type=feature": 60.0}
    assert diagnose.pick_cluster(tasks, NOW, strata)["key"] == "1|plan|fix-js-behavior"
    assert diagnose.pick_cluster(tasks, NOW, {**strata, "type=ui": 40.0})["key"] == "1|plan|edit-css-style"


def test_same_data_same_cluster_whatever_the_order():
    tasks = [task(i, gate=g, skill=s) for i, (g, s) in enumerate(
        [(1, "new-feature"), (3, "fix-js-behavior"), (1, "new-feature"), (3, "fix-js-behavior"), (2.5, None)])]
    first = diagnose.pick_cluster(tasks, NOW)
    for seed in range(5):
        random.Random(seed).shuffle(tasks)
        assert diagnose.pick_cluster(tasks, NOW) == first


def test_no_recent_miss_means_no_cluster():
    assert diagnose.pick_cluster([task(1, days_ago=31), task(2, source="win")], NOW) is None


# ── chẩn đoán → yêu cầu self ──

def test_valid_diagnosis_becomes_one_self_request_naming_the_target(tmp_path):
    (tmp_path / "traces.jsonl").write_text("\n".join(json.dumps(r, ensure_ascii=False) for r in [
        {"call_id": "run501:g1:cNone:a0:i0:s1", "gate": 1, "prompt_name": "brainstorm.md", "result": "ok",
         "error": None, "output": "{\"subtasks\": [{\"file\": \"public/sai-file.html\"}]}", "prompt_var": "x"},
        {"call_id": "run900:g1:cNone:a0:i0:s1", "gate": 1, "result": "ok", "output": TEST_MARKER},
    ]) + "\n", encoding="utf-8")
    server = FakeServer([task(1), task(2), task(3, skill="edit-css-style")])
    models = FakeModels(GOOD)
    out = run(server, models, tmp_path)
    assert out["status"] == "created" and out["cluster"]["key"] == "1|plan|fix-js-behavior"
    [body] = self_requests(server)
    assert body["target_file"] == GOOD["target_file"]
    assert GOOD["target_file"] in body["detail"] and GOOD["hypothesis"] in body["detail"]
    assert out["request"]["request"]["id"] == 77
    [prompt] = models.prompts
    assert "public/sai-file.html" in prompt  # trace của cụm
    assert "yêu cầu học số 1" in prompt and "yêu cầu học số 3" not in prompt  # chỉ task của cụm
    assert TEST_MARKER not in prompt  # phần kiểm tra không bao giờ tới model


def test_same_night_rerun_reuses_the_idempotency_key(tmp_path):
    keys = []
    for _ in range(2):
        server = FakeServer([task(1)])
        run(server, FakeModels(GOOD), tmp_path)
        keys += [b["idempotency_key"] for b in self_requests(server)]
    assert len(set(keys)) == 1


def test_bad_schema_is_retried_then_accepted(tmp_path):
    server = FakeServer([task(1)])
    models = FakeModels("không phải JSON", {"hypothesis": "x"}, GOOD)
    out = run(server, models, tmp_path)
    assert out["status"] == "created" and out["attempts"] == 3
    assert "REJECTED" in models.prompts[1] and len(self_requests(server)) == 1


def test_bad_schema_three_times_drops_the_cluster(tmp_path, capsys):
    server = FakeServer([task(1)])
    models = FakeModels("{}", "[]", {**GOOD, "target_file": ""})
    out = run(server, models, tmp_path)
    assert out["status"] == "dropped" and out["attempts"] == 3 and out["reason"]
    assert self_requests(server) == [] and len(models.prompts) == 3
    assert "dropped" in capsys.readouterr().out


def test_target_outside_the_allowed_area_is_dropped(tmp_path):
    server = FakeServer([task(1)])
    outside = ["ai-board/harness/gates/guard.py", "ai-board/harness/prompts/AIBOARD.md",
               "ai-board/harness/prompts/diagnose.md"]  # code cổng, bản hướng dẫn chung, chính prompt chẩn đoán
    out = run(server, FakeModels(*({**GOOD, "target_file": f} for f in outside)), tmp_path)
    assert out["status"] == "dropped" and "ngoài vùng" in out["reason"]
    assert self_requests(server) == []


def test_server_refusing_the_target_drops_without_retry(tmp_path):
    server = FakeServer([task(1)], reject="self_target_outside_area")
    models = FakeModels(GOOD)
    out = run(server, models, tmp_path)
    assert out["status"] == "dropped" and "self_target_outside_area" in out["reason"]
    assert len(models.prompts) == 1


def test_not_ready_or_nothing_to_learn_calls_no_model(tmp_path):
    models = FakeModels()
    assert run(FakeServer([task(1)], ready=False), models, tmp_path)["status"] == "not_ready"
    assert run(FakeServer([task(1, source="win")]), models, tmp_path)["status"] == "no_cluster"
    assert models.prompts == []


def test_skipped_clusters_are_passed_over(tmp_path):
    server = FakeServer([task(1), task(2), task(3, skill="edit-css-style")])
    out = run(server, FakeModels(GOOD), tmp_path, skip={"1|plan|fix-js-behavior"})
    assert out["cluster"]["key"] == "1|plan|edit-css-style"


def test_exhausted_propose_budget_stops_before_calling_the_model(tmp_path):
    from budget import Budget
    models = FakeModels(GOOD)
    out = run(FakeServer([task(1)]), models, tmp_path, budget=Budget(max_units=0))
    assert out["status"] == "budget" and models.prompts == []
