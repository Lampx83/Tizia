import argparse
import json
from pathlib import Path

import pytest

from evaluation.pipeline import DATA

if not DATA.exists():
    pytest.skip("needs the local AB data root (AB_DATA)", allow_module_level=True)

from evaluation.pipeline import driver


_REAL_ENSURE = driver.ensure_preflight


@pytest.fixture(autouse=True)
def _preflight_pass(monkeypatch):
    monkeypatch.setattr(driver, "ensure_preflight", lambda arm="B0": None)


def test_run_trial_gated_by_preflight(monkeypatch):
    monkeypatch.setattr(driver, "ensure_preflight", _REAL_ENSURE)
    monkeypatch.setattr(driver, "_PREFLIGHT_OK", set())
    monkeypatch.setattr(driver, "run_preflight", lambda write, arm="B0", probe=False: {"pass": False, "checks": []})
    with pytest.raises(driver.PreflightRed):
        driver.run_trial("A", "x", 1, "localtest")


def test_manifest_check_skipped_without_tool_loop():
    res = driver.check_manifest_approved("B0")
    assert res["ok"] and res["detail"].startswith("skipped")


def write_contract(tmp_path: Path, loose: int) -> Path:
    path = tmp_path / "contract.json"
    path.write_text(json.dumps({"limits": {"gpu_s_per_user_day": {"loose": loose, "folder": 8000}}}), encoding="utf-8")
    return path


def test_load_gpu_caps_reads_loose_and_folder_from_contract(tmp_path):
    assert driver.load_gpu_caps(write_contract(tmp_path, 8000)) == (8000, 8000)


def test_pick_owner_fits_trial_under_contract_cap(tmp_path):
    cap, _ = driver.load_gpu_caps(write_contract(tmp_path, 8000))
    ids = {"localtest": 1, "localadmin": 2}
    name, headroom = driver.pick_owner(["localtest", "localadmin"], ids, {1: 2700.0}, need=400, cap=cap)
    assert name == "localtest"
    assert headroom == pytest.approx(5300.0)


def test_pick_owner_exhausted_when_contract_cap_is_spent(tmp_path):
    cap, _ = driver.load_gpu_caps(write_contract(tmp_path, 3000))
    with pytest.raises(driver.CapExhausted):
        driver.pick_owner(["localtest"], {"localtest": 1}, {1: 2700.0}, need=400, cap=cap)


def _history(split_by_id):
    return [{"id": cid, "split": s, "tier": "bug_multi", "files": 2} for cid, s in split_by_id.items()]


@pytest.fixture
def hist(monkeypatch, tmp_path):
    cases = _history({"h-tune-1": "tune", "h-tune-2": "tune", "h-held-1": "heldout"})
    monkeypatch.setattr(driver.hc, "load_cases", lambda root=None: cases)
    monkeypatch.setattr(driver, "DATA", tmp_path)
    monkeypatch.setattr(driver, "ALLOW_HELDOUT", False)
    monkeypatch.setattr(driver, "load_cases", lambda: [{"id": "dev-1"}])
    return tmp_path


def _plan_args(cases="", repeats=1, limit=0):
    return argparse.Namespace(cases=cases, repeats=repeats, limit=limit)


def test_plan_default_uses_dev_cases_unchanged(hist):
    driver.cmd_plan(_plan_args())
    plan = json.loads((hist / "plan.json").read_text(encoding="utf-8"))
    assert {c for b in plan["blocks"] for c in b["cases"]} == {"dev-1"}


def test_plan_history_tune_selects_tune_only(hist):
    driver.cmd_plan(_plan_args(cases="history:tune"))
    plan = json.loads((hist / "plan.json").read_text(encoding="utf-8"))
    assert {c for b in plan["blocks"] for c in b["cases"]} == {"h-tune-1", "h-tune-2"}


def test_plan_history_heldout_refused_without_flag(hist):
    with pytest.raises(SystemExit, match="need --allow-heldout"):
        driver.cmd_plan(_plan_args(cases="history:heldout"))
    assert not (hist / "plan.json").exists()


def test_plan_ids_list_accepted(hist):
    driver.cmd_plan(_plan_args(cases="h-tune-1,dev-1"))
    plan = json.loads((hist / "plan.json").read_text(encoding="utf-8"))
    assert plan["blocks"][0]["cases"] == ["h-tune-1", "dev-1"]


def _run_args(cases="", from_block=""):
    return argparse.Namespace(cases=cases, from_block=from_block, max_wait=1)


def _write_plan(hist, case_ids):
    (hist / "plan.json").write_text(json.dumps({"blocks": [
        {"arm": "A", "repeat": 1, "cases": case_ids}]}), encoding="utf-8")


def test_run_refuses_heldout_in_plan_without_flag(hist, monkeypatch):
    _write_plan(hist, ["h-tune-1", "h-held-1"])
    monkeypatch.setattr(driver, "ensure_arm", lambda arm: pytest.fail("must not touch worker"))
    with pytest.raises(SystemExit, match="need --allow-heldout"):
        driver.cmd_run(_run_args())


def test_run_cases_filter_runs_only_selected(hist, monkeypatch):
    _write_plan(hist, ["h-tune-1", "h-tune-2"])
    ran = []
    monkeypatch.setattr(driver, "ensure_arm", lambda arm: None)
    monkeypatch.setattr(driver, "owner_ids", lambda: {})
    monkeypatch.setattr(driver, "owner_usage", lambda: {})
    monkeypatch.setattr(driver, "pick_owner", lambda *a, **k: ("localtest", 1.0))
    monkeypatch.setattr(driver, "run_trial", lambda arm, cid, rep, owner, max_wait: ran.append(cid))
    monkeypatch.setattr(driver.time, "sleep", lambda s: None)
    driver.cmd_run(_run_args(cases="history:tune"))
    assert ran == ["h-tune-1", "h-tune-2"]
    ran.clear()
    driver.cmd_run(_run_args(cases="h-tune-2"))
    assert ran == ["h-tune-2"]


def test_run_cases_filter_outside_plan_is_refused(hist):
    _write_plan(hist, ["h-tune-1"])
    with pytest.raises(SystemExit, match="not in plan"):
        driver.cmd_run(_run_args(cases="h-tune-2"))


def test_seeds_clean_cmd_keeps_planned_and_extra_refs(hist, monkeypatch):
    monkeypatch.setattr(driver.hc, "ROOT", hist / "hist")
    for cid in ("h-tune-1", "h-tune-2", "stale"):
        (hist / "hist" / "seeds" / cid).mkdir(parents=True)
    _write_plan(hist, ["h-tune-1"])
    driver.cmd_seeds_clean(argparse.Namespace(dry_run=False, keep=["h-tune-2"]))
    assert sorted(p.name for p in (hist / "hist" / "seeds").iterdir()) == ["h-tune-1", "h-tune-2"]


def test_dev_trials_drop_history_and_non_dev_cases():
    trials = [{"case": "dev-1"}, {"case": "rui-03", "case_tier": "route_ui"}, {"case": "dev-multifile:x"},
              {"case": "dev-2", "case_split": "tune"}]
    assert [t["case"] for t in driver.dev_trials(trials, {"dev-1", "dev-2", "rui-03"})] == ["dev-1"]


def test_run_pin_reads_trial_pins_not_head():
    assert driver.run_pin([{"pin": "71d69c88"}, {"pin": "71d69c88"}]) == "71d69c88"
    assert driver.run_pin([{"pin": "f248eebb"}, {"pin": "71d69c88"}]) == "mixed:71d69c88,f248eebb"
    assert driver.run_pin([{}]) == "unknown"


class _FakeClient:
    def __init__(self):
        self.calls = []

    def call(self, method, path, payload=None, headers=None):
        self.calls.append((method, path))
        if method == "POST" and path == "/api/requests":
            return 201, {"request_id": 7, "root_ticket_id": 9}
        return 200, {}


def test_clarifying_root_ends_terminal_early_without_timeout(monkeypatch):
    client = _FakeClient()
    monkeypatch.setattr(driver, "session", lambda name: client)
    monkeypatch.setattr(driver, "root_probe", lambda root_id: {"status": "queued", "phase": "clarifying", "runs": 1,
                                                              "active": 1, "tier": "bug_multi"})
    monkeypatch.setattr(driver, "metrics", lambda req, root: {"root": {"status": "queued", "phase": "clarifying"},
                                                             "runs": [], "tickets": []})
    monkeypatch.setattr(driver, "current_pin", lambda: "test")
    monkeypatch.setattr(driver.time, "sleep", lambda s: None)
    case = {"title": "t", "detail": "d", "level": 1, "style": "s", "types": [], "file": "f"}
    rec = driver._run_attempt("A", "dev-1", 1, 0, "localtest", case, 1200, 0.0, 1000.0)
    assert rec["outcome"] == "needs_clarification"
    assert rec["timed_out"] is False and rec["cancelled"] is None
    assert ("POST", "/api/requests/7/cancel") not in client.calls


def test_b0_turns_loop_flags_off_and_every_new_flag_off():
    env = driver.arm_env("B0")
    assert env["AI_BOARD_PROGRESS_LOOP"] == "0" and env["AI_BOARD_MODEL_REPAIR"] == "0"
    assert all(env[k] in ("0", "") for k in driver.NEW_FLAGS)
    assert env["AI_BOARD_GATE1_ARBITER"] == "1"


def test_b1_turns_loop_flags_and_every_new_flag_on():
    env = driver.arm_env("B1")
    assert env["AI_BOARD_PROGRESS_LOOP"] == "1" and env["AI_BOARD_MODEL_REPAIR"] == "1"
    assert all(env[k] == "1" for k in driver.NEW_FLAGS if k not in driver.B1_OFF)
    assert all(env[k] == driver.flag_value(k, False) for k in driver.B1_OFF)
    assert env["AI_BOARD_TOOL_LOOP"] == "1"
    assert env["AI_BOARD_GATE1_ARBITER"] == "1"


def test_b1_ablation_only_flips_its_flag():
    env = driver.arm_env("B1-minus-AI_BOARD_TOOL_LOOP")
    assert env["AI_BOARD_TOOL_LOOP"] == "" and env["AI_BOARD_PROGRESS_LOOP"] == "1"
    assert env["AI_BOARD_STOP_REPORT_V2"] == "1"


def test_arm_a_unchanged():
    assert driver.arm_env("A") == {"AI_BOARD_PROGRESS_LOOP": "0", "AI_BOARD_MODEL_REPAIR": "0"}


FEEDBACK = ("AI_BOARD_PLAN_REPAIR", "AI_BOARD_REPAIR_SAME_SESSION", "AI_BOARD_GATE_FEEDBACK_CAP",
            "AI_BOARD_STOP_REPORT_V2", "AI_BOARD_GATE1_ARBITER", "AI_BOARD_VERIFY_PRELOADED_BASES",
            "AI_BOARD_NO_ORACLE_REVIEW_ANY")


def test_b0_pins_all_feedback_flags():
    env = driver.arm_env("B0")
    assert {k: env[k] for k in FEEDBACK} == {**{k: "0" for k in FEEDBACK}, "AI_BOARD_GATE1_ARBITER": "1"}


def test_b1_pins_feedback_flags_it_relies_on():
    env = driver.arm_env("B1")
    assert env["AI_BOARD_STOP_REPORT_V2"] == "1" and env["AI_BOARD_GATE1_ARBITER"] == "1"
    for k in FEEDBACK:
        if k not in ("AI_BOARD_STOP_REPORT_V2", "AI_BOARD_GATE1_ARBITER"):
            assert env[k] == "0", k


def test_ablation_inherits_b1_feedback_pins():
    env = driver.arm_env("B1-minus-AI_BOARD_REPAIR_DIAGNOSE")
    assert env["AI_BOARD_PLAN_REPAIR"] == "0" and env["AI_BOARD_STOP_REPORT_V2"] == "1"


class _Proc:
    def __init__(self, out, rc=0):
        self.stdout, self.stderr, self.returncode = out.encode(), b"", rc


def _fake_env(monkeypatch, lines):
    monkeypatch.setattr(driver, "_docker", lambda cmd, timeout=120: _Proc(chr(10).join(lines)))


def test_worker_env_match_green(monkeypatch):
    lines = [f"{k}={v}" for k, v in driver.arm_env("B0").items() if v != ""]
    _fake_env(monkeypatch, lines + ["PATH=/usr/bin"])
    assert driver.check_worker_env("B0")["ok"]


def test_worker_env_mismatch_red(monkeypatch):
    env = dict(driver.arm_env("B0"))
    env["AI_BOARD_PLAN_REPAIR"] = "1"
    _fake_env(monkeypatch, [f"{k}={v}" for k, v in env.items() if v != ""])
    res = driver.check_worker_env("B0")
    assert not res["ok"] and "AI_BOARD_PLAN_REPAIR" in res["detail"]


def test_worker_env_missing_pin_red(monkeypatch):
    lines = [f"{k}={v}" for k, v in driver.arm_env("B0").items() if v != "" and k != "AI_BOARD_NO_ORACLE_REVIEW_ANY"]
    _fake_env(monkeypatch, lines)
    assert not driver.check_worker_env("B0")["ok"]


def _trial_args(**kw):
    base = dict(cases="c1,c2,c3,c4", case="", keep_seeds=True, arm="B0", repeat=201, dry_run=False,
                probe_manifest=False, force=True, owner="", max_wait=10, parallel=1)
    return argparse.Namespace(**{**base, **kw})


def _fake_trial_env(monkeypatch, workers):
    import threading
    import time as _time
    cases = [{"id": c} for c in ("c1", "c2", "c3", "c4")]
    monkeypatch.setattr(driver, "WORKERS", workers)
    monkeypatch.setattr(driver, "resolve_cases", lambda spec: cases)
    monkeypatch.setattr(driver, "ensure_arm", lambda arm: None)
    monkeypatch.setattr(driver, "owner_ids", lambda: {n: i for i, n in enumerate(driver.OWNERS)})
    monkeypatch.setattr(driver, "owner_usage", lambda: {})
    seen, live, lock = [], [0, 0], threading.Lock()

    def fake_run(arm, case_id, repeat, owner, max_wait=0, keep=False):
        with lock:
            live[0] += 1
            live[1] = max(live[1], live[0])
            assert owner not in [o for o, active in seen if active], "owner shared by two live trials"
            seen.append([owner, True])
            me = seen[-1]
        _time.sleep(0.05)
        with lock:
            live[0] -= 1
            me[1] = False
        return {"case": case_id, "owner": owner}

    monkeypatch.setattr(driver, "run_trial", fake_run)
    return seen, live


def test_parallel_trials_run_together_on_distinct_owners(monkeypatch):
    seen, live = _fake_trial_env(monkeypatch, workers=2)
    assert driver.cmd_trial(_trial_args(parallel=2)) == 0
    assert len(seen) == 4 and live[1] == 2


def test_parallel_is_capped_by_worker_count(monkeypatch):
    seen, live = _fake_trial_env(monkeypatch, workers=1)
    assert driver.cmd_trial(_trial_args(parallel=3)) == 0
    assert len(seen) == 4 and live[1] == 1


def test_arm_override_covers_every_worker(monkeypatch, tmp_path):
    monkeypatch.setattr(driver, "DATA", tmp_path)
    monkeypatch.setattr(driver, "WORKER_PAIRS", driver.WORKER_PAIRS[:1] + [("ai-board-worker-2", "aiboard-worker-2")])
    body = json.loads(driver.arm_override("B0").read_text(encoding="utf-8"))
    assert set(body["services"]) == {"ai-board-worker", "ai-board-worker-2"}


def test_case_role_reads_admin_cases_and_defaults_to_student(tmp_path, monkeypatch):
    roles = tmp_path / "roles.json"
    roles.write_text('{"roles": {"x:admin-case": {"role": "admin"}}}', encoding="utf-8")
    monkeypatch.setattr(driver, "ROLES_FILE", roles)
    assert driver.case_role("x:admin-case") == "admin"
    assert driver.case_role("x:other") == "student"
    monkeypatch.setattr(driver, "ROLES_FILE", tmp_path / "missing.json")
    assert driver.case_role("x:admin-case") == "student"


def test_role_neg_expands_admin_cases_into_student_variants(tmp_path, monkeypatch):
    from evaluation.pipeline import driver
    roles = tmp_path / "roles.json"
    roles.write_text('{"_why": "x", "roles": {"c1": {"role": "admin"}, "c2": {"role": "student"}}}', encoding="utf-8")
    monkeypatch.setattr(driver, "ROLES_FILE", roles)
    monkeypatch.setattr(driver, "load_cases", lambda: [{"id": "c1", "title": "t"}, {"id": "c2", "title": "u"}])
    monkeypatch.setattr(driver, "load_vague_cases", lambda: [])
    monkeypatch.setattr(driver.hc, "load_cases", lambda: [])
    out = driver.resolve_cases("role-neg:all")
    assert [c["id"] for c in out] == ["c1@student"] and out[0]["expect_refusal"] and out[0]["title"] == "t"
    assert driver.resolve_cases("c1@student")[0]["expect_refusal"]


def test_model_seed_is_fixed_per_case_across_rounds(monkeypatch):
    monkeypatch.delenv("AB_MODEL_SEED", raising=False)
    assert driver.model_seed("replace_text-l1-x") is None
    monkeypatch.setenv("AB_MODEL_SEED", "7")
    a, b = driver.model_seed("replace_text-l1-x"), driver.model_seed("css_color-l1-y")
    assert isinstance(a, int) and a != b and driver.model_seed("replace_text-l1-x") == a
