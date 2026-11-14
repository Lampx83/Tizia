"""Every model call in the trace carries prompt_name + prompt_hash."""
import ast
import dataclasses
import json
import logging
from pathlib import Path

from runtime import meter
from runtime.budget import Budget
from conftest import FakeModels, deps_with, plan_with

HARNESS = Path(__file__).resolve().parent.parent
WORKER = sorted(HARNESS.parent.glob("worker*.py"))
OFFLINE = {"skill_batch_run.py"}


def _sources():
    skip = {"tests", "evaluation"}
    for path in [*HARNESS.rglob("*.py"), *WORKER]:
        if path.name not in OFFLINE and not skip & set(path.relative_to(HARNESS.parent).parts[1:2]) and "tests" not in path.parts:
            yield path


def _call_model_nodes(tree):
    return [n for n in ast.walk(tree) if isinstance(n, ast.Call) and getattr(n.func, "attr", None) == "call_model"]


def test_every_call_site_passes_prompt_name():
    missing = []
    for path in _sources():
        for node in _call_model_nodes(ast.parse(path.read_text(encoding="utf-8"))):
            named = any(k.arg == "prompt_name" and not (isinstance(k.value, ast.Constant) and k.value.value is None) for k in node.keywords)
            if not named and not any(k.arg is None for k in node.keywords):
                missing.append(f"{path.name}:{node.lineno}")
    assert not missing, missing


def test_every_literal_prompt_name_resolves_to_a_hash():
    import gates.adversarial_review, gates.react_plan, gates.reviewer_fix, security.classifier, services.skill_rewrite  # noqa: F401,E401
    unresolved = set()
    for path in _sources():
        for node in ast.walk(ast.parse(path.read_text(encoding="utf-8"))):
            if isinstance(node, ast.keyword) and node.arg == "prompt_name" and isinstance(node.value, ast.Constant) and node.value.value:
                if not meter.resolve_prompt_hash(node.value.value):
                    unresolved.add(node.value.value)
    assert not unresolved, unresolved


def test_classifier_tasks_have_hashes():
    from security import classifier
    for task in classifier.CLASSIFIER["tasks"]:
        assert meter.resolve_prompt_hash(f"classifier_{task}")


def test_record_fills_hash_from_name_once(tmp_path):
    tracer = meter.Tracer(None)
    sent = []
    tracer.begin(1, sent.extend)
    deps = dataclasses.replace(deps_with(FakeModels(plan_with(["features"]))), trace=tracer)
    deps.call_model("m", "p", gate=1, budget=Budget(), prompt_name="repair_agent.md")
    tracer.flush()
    (rec,) = sent
    assert rec["prompt_name"] == "repair_agent.md" and rec["prompt_hash"] == json.loads((HARNESS / "prompts" / "prompts.lock.json").read_text())["repair_agent.md"]


def test_missing_identity_warns_with_call_id(caplog):
    meter.unidentified_calls = 0
    tracer = meter.Tracer(None)
    tracer.begin(2, lambda _b: None)
    deps = dataclasses.replace(deps_with(FakeModels(plan_with(["features"]))), trace=tracer)
    with caplog.at_level(logging.WARNING):
        deps.call_model("m", "p", gate=1, budget=Budget(), prompt_name=None)
    assert meter.unidentified_calls == 1
    assert "run2:g1:cNone:a0:i0:s1" in caplog.text


def test_unidentified_warning_is_throttled(caplog):
    meter.unidentified_calls = 0
    tracer = meter.Tracer(None)
    tracer.begin(3, lambda _b: None)
    deps = dataclasses.replace(deps_with(FakeModels(plan_with(["features"]))), trace=tracer)
    with caplog.at_level(logging.WARNING):
        for _ in range(meter.WARN_FIRST + 20):
            deps.call_model("m", "p", gate=1, budget=Budget(), prompt_name=None)
    assert meter.unidentified_calls == meter.WARN_FIRST + 20
    assert len(caplog.records) == meter.WARN_FIRST


def test_prompt_lock_missing_file_is_empty(monkeypatch, tmp_path):
    monkeypatch.setattr(meter, "_LOCK_PATH", tmp_path / "none.json")
    monkeypatch.setattr(meter, "_lock_cache", None)
    assert meter.prompt_lock() == {} and meter.resolve_prompt_hash("x.md") is None


def test_skill_call_unregistered_schema_does_not_crash():
    from services import skill_rewrite
    seen = {}
    class D:
        models = type("M", (), {"gate3_model": "m"})()
        def call_model(self, *a, **kw):
            seen.update(kw)
            return {"response": "{}", "metrics": {}}
    try:
        skill_rewrite.call(D(), Budget(), "u", "s", {"type": "object"}, 8)
    except KeyError:
        raise AssertionError("KeyError on unregistered schema")
    except Exception:
        pass
    assert seen["prompt_name"] is None


def test_identity_report_counts_null_and_groups_by_prompt(tmp_path):
    rows = [{"call_id": "a", "gate": 1, "prompt_name": "x.md", "prompt_hash": "h", "result": "ok"},
            {"call_id": "b", "gate": 1, "prompt_name": "x.md", "prompt_hash": "h", "result": "retry"},
            {"call_id": "c", "gate": 1, "prompt_name": None, "prompt_hash": None, "result": "ok"},
            {"call_id": "c", "edits": {}}]
    path = tmp_path / "t.jsonl"
    path.write_text("\n".join(json.dumps(r) for r in rows), encoding="utf-8")
    report = meter.identity_report(path)
    assert (report["calls"], report["null"]) == (3, 1) and report["by_prompt"] == {"x.md": {"calls": 2, "errors": 1}}
