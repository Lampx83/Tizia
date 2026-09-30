"""Cổng eval của yêu cầu self (self-improve ticket 05): bộ đo tất định ở 2 sha, cổng 1–2.5 trên phần kiểm tra,
thắng/thua từng task, ngân sách eval. Model giả; sha giả qua run_at (không Ollama)."""
import json
import subprocess

import pytest

import self_eval


def _plan(*files, goal="Sửa trang"):
    return {"goal": goal, "steps": [{"allowed_scope": [f], "title": f"sửa {f}"} for f in files]}


TASK = {"id": 1, "request_text": "nút bị che", "expected_files": ["public/a.html"]}


def test_a_task_passes_only_on_the_exact_expected_files_and_its_labelled_strings():
    assert self_eval.task_passed(TASK, _plan("public/a.html"))
    assert not self_eval.task_passed(TASK, None)  # cổng 1–2.5 chặn
    assert not self_eval.task_passed(TASK, _plan("public/a.html", "public/b.html"))
    assert not self_eval.task_passed(TASK, _plan("public/b.html"))
    labelled = {**TASK, "must_contain": ["nút"], "must_not_contain": ["xoá trang"]}
    assert self_eval.task_passed(labelled, _plan("public/a.html", goal="Sửa nút"))
    assert not self_eval.task_passed(labelled, _plan("public/a.html", goal="Sửa chữ"))
    assert not self_eval.task_passed(labelled, _plan("public/a.html", goal="Sửa nút, xoá trang"))


def test_scoring_stops_starting_tasks_once_the_gpu_budget_is_spent():
    tasks = [{**TASK, "id": i} for i in range(4)]
    caps = []

    def attempt(_task, max_units):
        caps.append(max_units)
        return True, 40

    out = self_eval.score(tasks, attempt, limit=100)
    assert caps == [100, 60, 20]  # mỗi task chỉ được phần còn lại; task 4 không chạy
    assert out["units"] == 120 and out["exhausted"] is True
    assert [r["id"] for r in out["results"]] == [0, 1, 2]
    done = self_eval.score(tasks[:2], attempt, limit=100)
    assert done["exhausted"] is False and all(r["passed"] for r in done["results"])


BASE, VARIANT = "b" * 40, "v" * 40
STRATA = {"type=logic": 50.0, "type=ui": 80.0, "clarity_fp": 10.0}
TASKS = [{"id": i, "request_text": f"yêu cầu {i}", "expected_files": [f"public/{i}.html"]} for i in range(6)]


class Shas:
    """2 sha giả: bảng nhóm, cấu hình, và 'model' cổng 1–2.5 = task id → trúng file mong đợi hay không."""

    def __init__(self, base_hits, variant_hits, variant_strata=None, gpu=10, gold=None):
        self.data = {BASE: (STRATA, base_hits), VARIANT: (variant_strata or STRATA, variant_hits)}
        self.gpu, self.gold, self.calls, self.model_calls = gpu, gold or {}, [], 0

    def __call__(self, sha, job, payload):
        self.calls.append((sha, job))
        strata, hits = self.data[sha]
        if job == "strata":
            return {"strata": strata, "config": {"prompts.lock.json": sha[:10]}}

        def attempt(task, _max_units):
            self.model_calls += 1
            file = task["expected_files"][0] if task["id"] in hits else "public/khac.html"
            return self_eval.task_passed(task, {"steps": [{"allowed_scope": [file]}]}), self.gpu

        if job == "tasks":
            return self_eval.score(payload["tasks"], attempt, payload["limit"])
        passed = self.gold.get(sha, set())
        return {"results": [{"id": f"gold:{c}", "passed": c in passed} for c in ("css-color", "edit-text")],
                "units": self.gpu, "exhausted": self.gpu >= payload["limit"]}


def _state(files=("ai-board/harness/skills/default/SKILL.md",), tasks=TASKS, **extra):
    return {"base_sha": BASE, "commits": [{"sha": VARIANT, "files": list(files)}], "eval_tasks": tasks, **extra}


def _eval(shas, state=None):
    out = self_eval.run(state or _state(), run_at=shas)
    return out, out["evidence"]["eval"]


def test_a_stratum_drop_blocks_before_any_model_call():
    shas = Shas(set(range(6)), set(range(6)), variant_strata={**STRATA, "type=logic": 30.0})
    out, result = _eval(shas)
    assert out["blocked"] is True and out["failure_class"] == "eval"
    assert "type=logic" in out["reason"] and "50.0 → 30.0" in out["reason"]
    assert shas.model_calls == 0 and {job for _, job in shas.calls} == {"strata"}
    assert result["accepted"] is False and result["dropped"] == ["type=logic: 50.0 → 30.0"]
    assert result["strata"] == {"base": STRATA, "variant": {**STRATA, "type=logic": 30.0}}
    assert (result["base_sha"], result["variant_sha"]) == (BASE, VARIANT)


def test_the_variant_is_accepted_when_it_wins_more_test_tasks_than_it_loses():
    shas = Shas(base_hits={0, 1, 2}, variant_hits={0, 1, 2, 3, 4})
    out, result = _eval(shas)
    assert out["blocked"] is False and out["failure_class"] is None
    assert (result["wins"], result["losses"], result["ties"], result["accepted"]) == (2, 0, 4, True)
    assert result["gpu_s"] == 120 and result["gpu_s_limit"] == 2400  # 6 task × 2 sha × 10 GPU-s
    assert result["config"] == {"base": {"prompts.lock.json": BASE[:10]}, "variant": {"prompts.lock.json": VARIANT[:10]}}
    assert {"id": 3, "base": False, "variant": True} in result["pairs"]
    assert result["gold"] is False and {job for _, job in shas.calls} == {"strata", "tasks"}


def test_a_variant_that_loses_more_than_it_wins_is_blocked_with_the_counts():
    out, result = _eval(Shas(base_hits={0, 1, 2, 3, 4}, variant_hits={0, 5}))
    assert out["blocked"] is True and out["failure_class"] == "eval"
    assert out["reason"] == "thua 4 task, thắng 1, hoà 1"
    assert result["accepted"] is False
    tie, _ = _eval(Shas(base_hits={0}, variant_hits={1}))  # thắng = thua: không nhận
    assert tie["blocked"] is True and tie["reason"] == "thua 1 task, thắng 1, hoà 4"


def test_running_out_of_eval_budget_mid_way_is_a_budget_block_never_a_half_accept():
    shas = Shas(base_hits=set(), variant_hits=set(range(6)), gpu=300)  # 6 × 300 = 1800 ở sha gốc
    out, result = _eval(shas)
    assert out["blocked"] is True and out["failure_class"] == "budget"
    assert result["accepted"] is False and result["gpu_s"] == 2400
    assert "2400/2400" in out["reason"]
    # Lượt thử lại cơ học trên cùng state không có ngân sách mới.
    state = _state(eval_gpu_s=2350)
    again = self_eval.run(state, run_at=Shas(set(), set(range(6))))
    assert again["failure_class"] == "budget" and state["eval_gpu_s"] == 2400


def test_a_gate_3_prompt_edit_also_runs_the_gold_set_in_the_same_budget():
    shas = Shas(base_hits={0, 1}, variant_hits={0, 1}, gold={VARIANT: {"css-color"}})
    out, result = _eval(shas, _state(files=["ai-board/harness/prompts/implement.md"]))
    assert (VARIANT, "gold") in shas.calls and result["gold"] is True
    assert (result["wins"], result["losses"]) == (1, 0) and out["blocked"] is False
    assert result["gpu_s"] == 6 * 2 * 10 + 2 * 10


def git(repo, *args):
    return subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, text=True).stdout.strip()


def test_each_sha_is_measured_by_its_own_code_in_a_detached_worktree_removed_afterwards(tmp_path):
    repo = tmp_path / "repo"
    script = repo / "ai-board" / "harness" / "self_eval.py"
    script.parent.mkdir(parents=True)
    shas = []
    for version in ("gốc", "biến thể"):
        script.write_text("import json, sys\nprint('log của harness')\n"
                          f"print(json.dumps({{'job': sys.argv[1], 'sha': {version!r}, **json.load(sys.stdin)}}))\n",
                          encoding="utf-8")
        if not shas:
            git(repo.parent, "init", "-q", str(repo))
        git(repo, "add", "-A")
        git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", version)
        shas.append(git(repo, "rev-parse", "HEAD"))
    with self_eval._checkouts(repo, shas) as run_at:
        assert run_at(shas[0], "strata", {"limit": 5}) == {"job": "strata", "sha": "gốc", "limit": 5}
        assert run_at(shas[1], "tasks", {})["sha"] == "biến thể"
    assert len(git(repo, "worktree", "list").splitlines()) == 1


def test_the_tasks_job_plans_each_test_task_through_gates_1_to_2_5_with_the_model(monkeypatch, tmp_path):
    import main
    from conftest import FakeModels, deps_with

    (tmp_path / 'public').mkdir()
    (tmp_path / 'public' / 'flashcards.html').write_text('<button>Flip card</button>', encoding='utf8')
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    subprocess.run(['git', '-C', str(tmp_path), 'add', '.'], check=True)
    subprocess.run(['git', '-C', str(tmp_path), '-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-qm', 'fixture'], check=True)
    monkeypatch.setattr(self_eval, 'REPO', tmp_path)
    models = FakeModels({"summary_vi": "Sửa nút trang thẻ", "capabilities": ["features"], "subtasks": [
        {"title": "Sửa nút", "file": "public/flashcards.html", "verify": "mở trang thấy nút", "size": "small"}]},
        validation={'clear': True, 'grounded': True, 'grounding': [{'target':'public/flashcards.html',
            'file':'public/flashcards.html','quote':'<button>Flip card</button>',
            'before':'Button obscured','after':'Visible button','verify':'Mobile can flip card'}]})
    monkeypatch.setattr(main.Deps, "real", classmethod(lambda cls: deps_with(models)))
    tasks = [{"id": 1, "request_text": "Nút lật thẻ bị che\nTrên điện thoại", "expected_files": ["public/flashcards.html"],
              "must_contain": ["nút"]},
             {"id": 2, "request_text": "Sửa trang khác", "expected_files": ["public/khac.html"]}]
    out = self_eval.child("tasks", {"tasks": tasks, "limit": 2400})
    assert [(r["id"], r["passed"]) for r in out["results"]] == [(1, True), (2, False)]
    assert "public/flashcards.html" in out["results"][0]["plan"]  # plan text cho giám khảo
    assert out["units"] >= 2 and out["exhausted"] is False and models.calls  # GPU-s từ trace của mọi lời gọi


def test_gate_5_runs_the_eval_only_for_a_self_request(monkeypatch, fake_deps):
    import main

    monkeypatch.setattr(self_eval, "run", lambda state, deps, budget: {"gate": 5, "eval": state["request_type"]})
    ready = {"full_checkout": "checkout"}  # worktree đã dựng: không tạo lại
    assert main.run_gate(5, {}, fake_deps, None, {**ready, "request_type": "self"}) == {"gate": 5, "eval": "self"}
    for other in (None, "feature", "other"):
        smoke = main.run_gate(5, {}, fake_deps, None, {**ready, "request_type": other})
        assert "eval" not in smoke and smoke["evidence"]["smoke_passed"] is True  # Docker smoke (giả) như cũ


def test_no_test_tasks_means_no_accept():
    out, _ = _eval(Shas(set(), set()), _state(tasks=[]))
    assert out["blocked"] is True and out["failure_class"] == "eval" and "task kiểm tra" in out["reason"]


# ---- giám khảo shadow (ticket 10): chỉ ghi, không bao giờ đổi verdict ----

class Judge:
    """deps giả: giám khảo luôn chọn `pick`, mỗi lời gọi tốn `gpu` GPU-s vào budget truyền vào."""

    class models:
        gate3_model = "fake-gate3"

    def __init__(self, pick, gpu=5):
        self.pick, self.gpu, self.prompts = pick, gpu, []

    def call_model(self, model, prompt, *, gate, budget, prompt_name, format):
        self.prompts.append(prompt)
        budget.spend("model_calls")
        budget.spend("units", self.gpu)
        return {"response": json.dumps({"better": {"base": "A", "variant": "B"}.get(self.pick, self.pick),
                                             "reason": "giả"})}


def _plans(shas):
    """Shas giả kèm plan text mỗi kết quả tasks (như process con thật)."""
    def at(sha, job, payload):
        got = shas(sha, job, payload)
        if job == "tasks":
            got["results"] = [{**r, "plan": f"plan {sha[0]} {r['id']}"} for r in got["results"]]
        return got
    return at


def test_a_judge_contradicting_the_rule_never_changes_the_verdict_but_its_agreement_is_recorded():
    judge = Judge(pick="base")  # luật: biến thể thắng 2, hoà 4 → giám khảo chọn gốc mọi cặp
    out = self_eval.run(_state(), judge, run_at=_plans(Shas(base_hits={0, 1, 2}, variant_hits={0, 1, 2, 3, 4})))
    result = out["evidence"]["eval"]
    assert out["blocked"] is False and result["accepted"] is True and (result["wins"], result["losses"]) == (2, 0)
    j = result["judge"]
    assert (j["agree"], j["disagree"], j["skipped"], j["gpu_s"]) == (0, 6, 0, 30)
    assert {"id": 3, "pick": "base", "rule": "variant"} in j["pairs"]
    assert {"id": 0, "pick": "base", "rule": "tie"} in j["pairs"]
    assert result["gpu_s"] == 120 + 30  # giám khảo tính vào ngân sách eval
    assert "plan b 3" in judge.prompts[3] and "plan v 3" in judge.prompts[3]
    agreeing = self_eval.run(_state(), Judge(pick="tie"), run_at=_plans(Shas({0}, {0})))["evidence"]["eval"]
    assert (agreeing["judge"]["agree"], agreeing["judge"]["disagree"]) == (6, 0)


def test_the_judge_flag_off_means_no_judge_calls(monkeypatch):
    monkeypatch.setattr(self_eval, "JUDGE", False)
    judge = Judge(pick="base")
    result = self_eval.run(_state(), judge, run_at=_plans(Shas({0}, {0, 1})))["evidence"]["eval"]
    assert judge.prompts == [] and "judge" not in result and result["accepted"] is True


def test_a_short_budget_skips_the_judge_first_and_keeps_the_rule_verdict():
    judge = Judge(pick="base", gpu=50)
    out = self_eval.run(_state(eval_gpu_s=2400 - 120 - 60), judge, run_at=_plans(Shas({0}, {0, 1})))
    result = out["evidence"]["eval"]
    assert out["blocked"] is False and result["accepted"] is True  # không thành chặn ngân sách
    assert (result["judge"]["agree"] + result["judge"]["disagree"], result["judge"]["skipped"]) == (1, 5)
    assert result["gpu_s"] == 2400 - 10


def test_the_tasks_child_returns_the_plan_text_for_the_judge():
    out = self_eval.score([TASK], lambda _t, _l: (True, 1, "plan text"), limit=10)
    assert out["results"] == [{"id": 1, "passed": True, "plan": "plan text"}]


# ---- bộ đánh giá đóng băng (ticket 08): đo 1 sha, không so 2 bên, không bao giờ chọn biến thể ----

class FrozenSha:
    """1 sha giả: strata tất định + gold + task đóng băng, giống Shas nhưng chỉ 1 bên."""

    def __init__(self, strata, gold_ids, task_hits, gpu=10):
        self.strata, self.gold_ids, self.task_hits, self.gpu = strata, gold_ids, task_hits, gpu
        self.calls = []

    def __call__(self, sha, job, payload):
        self.calls.append((sha, job))
        if job == "strata":
            return {"strata": self.strata, "config": {"prompts.lock.json": sha[:10]}}
        if job == "gold":
            return {"results": [{"id": f"gold:{c}", "passed": True} for c in self.gold_ids],
                    "units": self.gpu, "exhausted": False}
        def attempt(task, _left):
            file = task["expected_files"][0] if task["id"] in self.task_hits else "public/khac.html"
            return self_eval.task_passed(task, {"steps": [{"allowed_scope": [file]}]}), self.gpu
        return self_eval.score(payload["tasks"], attempt, payload["limit"])


FROZEN_SHA = "f" * 40
FROZEN_TASKS = [{"id": i, "request_text": f"task {i}", "expected_files": [f"public/{i}.html"]} for i in range(3)]


def test_run_frozen_combines_strata_gold_and_frozen_tasks_into_one_score():
    fake = FrozenSha({"type=ui": 80.0, "type=logic": 60.0}, gold_ids=["css-color", "edit-text"], task_hits={0, 1})
    out = self_eval.run_frozen(FROZEN_SHA, FROZEN_TASKS, budget=1000, run_at=fake)
    assert out["sha"] == FROZEN_SHA
    assert out["config"] == {"prompts.lock.json": FROZEN_SHA[:10]}
    assert out["strata"]["type=ui"] == 80.0 and out["strata"]["type=logic"] == 60.0
    assert out["strata"]["gold_gate3"] == 100.0  # 2/2 gold đạt
    assert out["strata"]["frozen_tasks"] == pytest.approx(66.7, abs=0.1)  # 2/3 task đóng băng đạt
    assert out["gpu_s"] == 10 + 3 * 10  # gold (1 lời gọi, đã hết ngân sách theo units trả về) + 3 task
    assert {job for _, job in fake.calls} == {"strata", "gold", "tasks"}


def test_run_frozen_never_compares_two_shas_or_returns_an_accept_verdict():
    fake = FrozenSha({"type=ui": 80.0}, gold_ids=[], task_hits=set())
    out = self_eval.run_frozen(FROZEN_SHA, FROZEN_TASKS, budget=1000, run_at=fake)
    assert "accepted" not in out and "wins" not in out and "losses" not in out
    assert {sha for sha, _ in fake.calls} == {FROZEN_SHA}  # 1 sha duy nhất, không sha thứ hai để so


def test_run_frozen_skips_frozen_tasks_when_the_budget_runs_out_on_gold():
    fake = FrozenSha({"type=ui": 80.0}, gold_ids=["css-color"], task_hits={0})
    out = self_eval.run_frozen(FROZEN_SHA, FROZEN_TASKS, budget=10, run_at=fake)  # gold đã tiêu hết 10
    assert "frozen_tasks" not in out["strata"]
    assert {job for _, job in fake.calls} == {"strata", "gold"}


def test_run_frozen_with_no_frozen_tasks_yet_still_measures_strata_and_gold():
    fake = FrozenSha({"type=ui": 90.0}, gold_ids=["css-color", "edit-text"], task_hits=set())
    out = self_eval.run_frozen(FROZEN_SHA, [], budget=1000, run_at=fake)
    assert out["strata"]["gold_gate3"] == 100.0
    assert "frozen_tasks" not in out["strata"]
    assert {job for _, job in fake.calls} == {"strata", "gold"}


def test_run_frozen_opens_and_removes_its_own_detached_worktree(tmp_path):
    repo = tmp_path / "frozen-repo"
    script = repo / "ai-board" / "harness" / "self_eval.py"
    script.parent.mkdir(parents=True)
    script.write_text(
        "import json, sys\njson.load(sys.stdin)\n"
        "out = {'strata': {}, 'config': {}} if sys.argv[1] == 'strata' else {'results': [], 'units': 0, 'exhausted': False}\n"
        "print(json.dumps(out))\n", encoding="utf-8")
    git(repo.parent, "init", "-q", str(repo))
    git(repo, "add", "-A")
    git(repo, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "v1")
    sha = git(repo, "rev-parse", "HEAD")
    out = self_eval.run_frozen(sha, [], budget=5, checkout_repo=repo)
    assert out["sha"] == sha
    assert len(git(repo, "worktree", "list").splitlines()) == 1
