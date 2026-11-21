"""Data-change registry: schema check, unknown kind, flag-off byte identity, new kind by registry entry alone."""
import copy
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

AI_BOARD_DIR = Path(__file__).resolve().parents[2]
if str(AI_BOARD_DIR) not in sys.path:
    sys.path.insert(0, str(AI_BOARD_DIR))

from gate5 import db_check
from gates import brainstorm, data_kinds
from runtime import limits
from services import db_approval
from settings import reset_settings
from test_gate_1_dag import feature_plan

ROOT = AI_BOARD_DIR.parent
CATALOG = {"generated.context": {"allow": ["server/contexts/_ai-generated/"], "deny": []},
           "public.ui": {"allow": ["public/"], "deny": []}}
REQUEST = {"domain": "pharmacy", "type": "feature"}
LAYOUT = {"buildings": [{"id": "lab-3d", "x": 4, "y": 7}], "props": []}
CAMPUS = {"title": "Thêm tòa nhà", "payload": {"kind": "campus_layout", "domain": "it", "layout": LAYOUT}, "depends_on": [3]}
# sha256 of _canonical(feature_plan()) taken before the registry existed
GOLDEN_FLAG_OFF = "4e8ce739aa4c0976c69b9723a2747f8f3a457cf425d479fa1407d29ecc83ab7e"
FAKE_KIND = {
    "summary": "Glossary term.", "route": "/api/admin/glossary", "method": "POST", "context": "glossary", "tier": "protected",
    "approver": "admin", "capability": "content", "verify": "node --test test/glossary.test.js", "max_bytes": 2000,
    "schema": {"type": "object", "required": ["kind", "term", "weight"],
               "properties": {"kind": {"const": "glossary_term"}, "term": {"type": "string", "minLength": 2, "maxLength": 40},
                              "weight": {"type": "integer", "minimum": 1, "maximum": 5}}},
}


@pytest.fixture
def flag_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_DATA_REGISTRY", "1")
    reset_settings()
    yield
    monkeypatch.delenv("AI_BOARD_DATA_REGISTRY", raising=False)
    reset_settings()


def with_data(*changes):
    return {**feature_plan(), "data_changes": list(changes)}


def canonical(plan):
    return __import__("worker").HarnessPlanner._canonical(REQUEST, plan, None, CATALOG)


def test_validate_passes_and_fails():
    schema = data_kinds.kinds()["campus_layout"]["schema"]
    good = {"kind": "campus_layout", "domain": "it", "layout": LAYOUT}
    assert data_kinds.validate(good, schema) == []
    for bad in ({**good, "domain": "nowhere"}, {**good, "layout": {}}, {**good, "layout": {"evil": 1}},
                {**good, "layout": []}, {"kind": "campus_layout", "domain": "it"}, {**good, "kind": "sql"}):
        assert data_kinds.validate(bad, schema), bad


def test_flag_off_campus_layout_output_is_identical(monkeypatch):
    monkeypatch.delenv("AI_BOARD_DATA_REGISTRY", raising=False)
    reset_settings()
    plan = brainstorm.parse_plan(json.dumps(with_data(CAMPUS, {"payload": {"kind": "nope"}})))
    assert plan["data_changes"][1] == {"payload": {"kind": "nope"}}
    out = canonical(plan)
    assert hashlib.sha256(json.dumps(out, sort_keys=True).encode()).hexdigest() == GOLDEN_FLAG_OFF
    assert "data_changes" not in out and all(step["layer"] != "data" for step in out["steps"])
    assert data_kinds.prompt_block() == "" and "DATA CHANGES" not in brainstorm.build_prompt({"id": "r"}, frozenset({"public.ui"}))


def test_flag_on_unknown_kind_and_bad_payload_are_refused_with_reason(flag_on):
    with pytest.raises(ValueError, match=r"kind 'sql' không có trong registry \(campus_layout, sql_insert\)"):
        brainstorm.parse_plan(json.dumps(with_data({"title": "x", "payload": {"kind": "sql"}})))
    bad = {"title": "x", "payload": {"kind": "campus_layout", "domain": "it", "layout": {"evil": 1}}}
    with pytest.raises(ValueError, match=r"layout\.evil không được phép"):
        brainstorm.parse_plan(json.dumps(with_data(bad)))
    with pytest.raises(ValueError, match="depends_on ngoài"):
        brainstorm.parse_plan(json.dumps(with_data({**CAMPUS, "depends_on": [9]})))


def test_flag_on_campus_layout_step_is_accepted_by_the_server_policy(flag_on):
    plan = brainstorm.parse_plan(json.dumps(with_data(CAMPUS)))
    steps = canonical(plan)["steps"]
    assert steps[-1]["layer"] == "data" and steps[-1]["order"] == len(steps) and steps[-1]["payload"] == CAMPUS["payload"]
    assert steps[-1]["depends_on"] == [3] and steps[-1]["allowed_scope"] == []
    node = shutil.which("node")
    if not node:
        pytest.skip("node missing")
    code = ("import {validatePlan} from './server/ai-board/security/policy.js';"
            "const c=validatePlan(JSON.parse(process.argv[1]),'it');console.log(JSON.stringify(c.stepTiers))")
    run = subprocess.run([node, "--input-type=module", "-e", code, json.dumps({**canonical(plan), "domain": "it"})],
                         cwd=ROOT, capture_output=True, text=True, timeout=60)
    assert run.returncode == 0, run.stderr
    assert json.loads(run.stdout)[-1] == "protected"


def test_registry_schema_matches_campus_route_whitelist():
    node = shutil.which("node")
    if not node:
        pytest.skip("node missing")
    code = ("import {ALLOWED_KEYS,ALLOWED_DOMAINS} from './server/contexts/campus/layout-schema.js';"
            "console.log(JSON.stringify([[...ALLOWED_KEYS],[...ALLOWED_DOMAINS]]))")
    run = subprocess.run([node, "--input-type=module", "-e", code], cwd=ROOT, capture_output=True, text=True, timeout=60)
    keys, domains = json.loads(run.stdout)
    schema = data_kinds.kinds()["campus_layout"]["schema"]["properties"]
    assert sorted(schema["layout"]["properties"]) == sorted(keys) and sorted(schema["domain"]["enum"]) == sorted(domains)


def test_new_kind_needs_only_a_registry_entry(flag_on, monkeypatch):
    contract = copy.deepcopy(limits.contract())
    contract["data_kinds"]["kinds"]["glossary_term"] = FAKE_KIND
    monkeypatch.setattr(limits, "contract", lambda: contract)
    assert "glossary_term: Glossary term." in brainstorm.build_prompt({"id": "r"}, frozenset({"public.ui"}))
    term = {"title": "Thêm thuật ngữ", "payload": {"kind": "glossary_term", "term": "API", "weight": 3, "junk": 1}}
    plan = brainstorm.parse_plan(json.dumps(with_data(term)))
    step = canonical(plan)["steps"][-1]
    assert step["payload"] == {"kind": "glossary_term", "term": "API", "weight": 3}
    assert (step["capability"], step["tests"], step["layer"]) == ("content", ["node --test test/glossary.test.js"], "data")
    for payload in ({"kind": "glossary_term", "term": "A", "weight": 3}, {"kind": "glossary_term", "term": "API", "weight": 9},
                    {"kind": "glossary_term", "term": "API", "weight": "3"}):
        with pytest.raises(ValueError):
            brainstorm.parse_plan(json.dumps(with_data({"title": "x", "payload": payload})))


def test_malformed_registry_entry_is_reported(monkeypatch):
    contract = copy.deepcopy(limits.contract())
    del contract["data_kinds"]["kinds"]["campus_layout"]["approver"]
    monkeypatch.setattr(limits, "contract", lambda: contract)
    with pytest.raises(ValueError, match="campus_layout thiếu approver"):
        data_kinds.kinds()


VECTORS = json.loads((ROOT / "test" / "fixtures" / "data-schema-vectors.json").read_text(encoding="utf-8"))["cases"]
SEED = "INSERT INTO shop_items (id, name) VALUES (1, 'Mũ phù thuỷ') ON CONFLICT DO NOTHING"


@pytest.mark.parametrize("case", VECTORS, ids=[case["name"] for case in VECTORS])
def test_shared_schema_vectors(case):
    assert data_kinds.validate(case["value"], case["schema"]) == case["errors"]


def seed(sql=SEED, **extra):
    return {"title": "Thêm FAQ", "payload": {"kind": "sql_insert", "sql": sql}, **extra}


def test_data_step_can_sit_between_file_steps(flag_on):
    plan = brainstorm.parse_plan(json.dumps(with_data({**CAMPUS, "depends_on": [1], "required_by": [3]})))
    steps = canonical(plan)["steps"]
    assert [s["layer"] for s in steps] == ["db", "backend", "frontend", "data"]
    assert steps[2]["depends_on"] == [2, 4] and steps[3]["depends_on"] == [1]


def test_data_step_links_follow_a_same_file_merge(flag_on):
    base = feature_plan()
    base["subtasks"][1]["file"] = base["subtasks"][0]["file"]
    base["subtasks"][1]["layer"] = "db"
    plan = brainstorm.parse_plan(json.dumps({**base, "data_changes": [{**CAMPUS, "depends_on": [2], "required_by": [3]}]}))
    steps = canonical(plan)["steps"]
    assert len(steps) == 3 and 3 in steps[1]["depends_on"] and steps[2]["depends_on"] == [1]


def test_data_dependency_cycle_is_refused(flag_on):
    with pytest.raises(ValueError, match="vòng phụ thuộc"):
        brainstorm.parse_plan(json.dumps(with_data({**CAMPUS, "depends_on": [3], "required_by": [1]})))
    with pytest.raises(ValueError, match="required_by ngoài"):
        brainstorm.parse_plan(json.dumps(with_data({**CAMPUS, "required_by": [9]})))


def test_data_only_plan_needs_the_flag(flag_on, monkeypatch):
    raw = json.dumps({"summary_vi": "Nạp dữ liệu mẫu.", "capabilities": [], "subtasks": [], "data_changes": [{**CAMPUS, "depends_on": []}]})
    plan = brainstorm.parse_plan(raw)
    out = canonical(plan)
    assert [s["layer"] for s in out["steps"]] == ["data"] and out["steps"][0]["order"] == 1
    assert out["allowed_scope"] == [] and out["capabilities"] == ["content"]
    monkeypatch.delenv("AI_BOARD_DATA_REGISTRY")
    reset_settings()
    with pytest.raises(ValueError, match="subtasks rỗng"):
        brainstorm.parse_plan(raw)


def test_sql_insert_is_accepted_when_it_is_a_literal_insert(flag_on):
    plan = brainstorm.parse_plan(json.dumps(with_data(seed())))
    assert plan["data_changes"][0]["payload"] == {"kind": "sql_insert", "sql": SEED}
    assert "sql_insert: Seed rows" in brainstorm.build_prompt({"id": "r"}, frozenset({"public.ui"}))


@pytest.mark.parametrize("sql,why", [
    ("INSERT INTO shop_items (id) SELECT 1 ON CONFLICT DO NOTHING", "VALUES hằng"),
    ("INSERT INTO shop_items (id) VALUES (now()) ON CONFLICT DO NOTHING", "VALUES hằng"),
    ("INSERT INTO shop_items (id) VALUES (1) ON CONFLICT (id) DO UPDATE SET id = 2", "không khớp"),
    ("INSERT INTO shop_items (id) VALUES (1)", "không khớp"),
    ("INSERT INTO shop_items (id) VALUES (1); INSERT INTO shop_items (id) VALUES (2) ON CONFLICT DO NOTHING", "không khớp"),
    ("INSERT INTO nowhere_table (id) VALUES (1) ON CONFLICT DO NOTHING", "không có trong schema base"),
    ("INSERT INTO users (id) VALUES (1) ON CONFLICT DO NOTHING", "nhạy cảm"),
    ("INSERT INTO ai_prompt_log (id) VALUES (1) ON CONFLICT DO NOTHING", "nhạy cảm"),
])
def test_sql_insert_refusals_carry_a_reason(flag_on, sql, why):
    with pytest.raises(ValueError, match=why):
        brainstorm.parse_plan(json.dumps(with_data(seed(sql))))


def test_base_schema_sql_covers_every_manifest_table():
    sql = db_approval.base_schema_sql()
    assert sql.count("CREATE TABLE") == len(db_approval.base_tables()) and 'CREATE TABLE "shop_items"' in sql


def test_sandbox_runner_loads_the_base_schema_before_the_snapshot():
    from test_db_check_sandbox import FakeSession
    session = FakeSession()
    db_check.SandboxPgRunner(session, base_sql="CREATE TABLE t (id text);").run(SEED, [])
    psql = [" ".join(argv) for argv in session.execs if "psql" in argv]
    assert "CREATE TABLE t" in psql[0] and "information_schema" in psql[1] and SEED in psql[-2]


def test_insert_goes_through_the_sandbox_with_the_base_schema(monkeypatch):
    seen = {}

    def fake(sql, should_stop=None, base_sql=""):
        seen.update(sql=sql, base=base_sql)
        return {"status": "passed", "schema_diff": {}, "checks": [], "tests": [], "error": None}
    monkeypatch.setattr(db_approval, "run_sandbox", fake)
    assert db_approval.evaluate_insert(SEED)["status"] == "passed"
    assert seen["sql"] == SEED and 'CREATE TABLE "shop_items"' in seen["base"]


def test_data_steps_are_stamped_or_refused_by_the_sandbox(flag_on, monkeypatch):
    plan = brainstorm.parse_plan(json.dumps(with_data(seed(), CAMPUS)))
    steps = [s for s in canonical(plan)["steps"] if s["layer"] == "data"]
    verdicts = iter([{"status": "passed", "reason": None}])
    monkeypatch.setattr(db_approval, "evaluate_insert", lambda sql, should_stop=None: next(verdicts))
    data_kinds.sandbox(steps)
    assert steps[0]["db_check"] == {"status": "passed", "profile": "db_check"} and "db_check" not in steps[1]
    monkeypatch.setattr(db_approval, "evaluate_insert", lambda sql, should_stop=None: {"status": "transient", "reason": "tắt"})
    with pytest.raises(ValueError, match="tắt"):
        data_kinds.sandbox(steps)


def test_sandbox_is_a_no_op_with_the_flag_off(monkeypatch):
    monkeypatch.delenv("AI_BOARD_DATA_REGISTRY", raising=False)
    reset_settings()
    data_kinds.sandbox([{"layer": "data", "order": 1}])
