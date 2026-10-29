from gates import plan_validate as pv
from gates.evidence import verified

FEATURE = {"type": "feature"}
PLAN = {"subtasks": [{"file": "public/faq-co-so-du-lieu.html"}, {"file": "public/js/features/faq-co-so-du-lieu/index.js"}]}
REQUEST_7_REASON = ("REPO DATA đã có chức năng tương tự: public/js/features/them-trang-faq-mon-co-so-du-lieu/index... "
                    "nên không tạo trang mới")


def objection(file, snippet, claim="plan sai"):
    return {"claim": claim, "evidence": [{"file": file, "snippet": snippet}]}


def test_request_7_objection_citing_a_nonexistent_path_is_advisory():
    validation = {"grounded": False, "reason": REQUEST_7_REASON, "objection": None}
    note = pv.objection_advisory(validation, {"public/js/school-explore.js": "x"})
    assert note and "không chặn" in note and "them-trang-faq" in note


def test_objection_with_snippet_copied_from_repo_data_blocks():
    validation = {"grounded": False, "reason": "đã có", "objection": objection("public/js/school-explore.js", "function  open()")}
    assert pv.objection_advisory(validation, {"public/js/school-explore.js": "x\nfunction open()\n"}) is None


def test_objection_with_snippet_not_in_repo_data_is_advisory():
    validation = {"grounded": False, "reason": "đã có", "objection": objection("public/js/school-explore.js", "không có chữ này")}
    assert pv.objection_advisory(validation, {"public/js/school-explore.js": "x"}) is not None


def test_objection_naming_a_file_outside_repo_data_is_advisory():
    validation = {"grounded": False, "reason": "đã có", "objection": objection("public/khong-co.js", "x")}
    assert pv.objection_advisory(validation, {"public/js/school-explore.js": "x"}) is not None


def test_grounded_plan_has_no_advisory():
    assert pv.objection_advisory({"grounded": True, "objection": None}, {}) is None


def test_claim_evidence_shape_is_checked():
    assert verified("not a dict", {"a.js": "x"}) == []
    assert verified({"claim": "c", "evidence": [{"file": "a.js"}]}, {"a.js": "x"}) == []
    assert verified({"claim": "c", "evidence": [{"file": "a.js", "snippet": "  "}]}, {"a.js": "x"}) == []


def test_request_7_replay_objection_is_advisory_and_plan_goes_on():
    from budget import Budget
    from conftest import FakeModels, deps_with, plan_with

    plan = plan_with(["features"])
    plan["subtasks"] = PLAN["subtasks"]
    request = {"subject": "Thêm trang FAQ cơ sở dữ liệu", "body": "trang mới", "type": "feature"}
    validation = {"clear": True, "question": None, "grounded": False, "reason": REQUEST_7_REASON, "grounding": []}
    state = {"plan": plan}

    out = pv.run(request, deps_with(FakeModels(plan, validation=validation)), Budget(), state)

    assert out["blocked"] is False and "không chặn" in state["validator_note"]
