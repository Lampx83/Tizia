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

from gates import brainstorm, data_kinds
from runtime import limits
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
    monkeypatch.delenv("AI_BOARD_DATA_REGISTRY")
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
    with pytest.raises(ValueError, match=r"kind 'sql' không có trong registry \(campus_layout\)"):
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
