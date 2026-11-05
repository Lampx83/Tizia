"""tizia.skill.id on chat span (LF/163): one primary skill per span, absent when no skills."""
from runtime import meter

REC = {"provider": "vllm", "model": "qwen", "gate": 3, "child": 0, "iteration": 1, "call_id": "c1",
       "result": "ok", "prompt_name": "gate1", "at": 1000}


def _chat_attrs(monkeypatch, request):
    captured = {}
    tracer = meter.Tracer()

    def add_span(name, attributes, **_):
        captured.update(attributes)
        return {"events": []}

    monkeypatch.setattr(tracer, "add_span", add_span)
    tracer._chat_span(REC, {"wall_ms": 0}, request)
    return captured


def test_skill_id_is_primary_selected_skill(monkeypatch):
    skills = [{"name": "plan-core"}, {"name": "admin-x"}]
    attrs = _chat_attrs(monkeypatch, {"skills": skills, "skill_selection": {"dropped": []}})
    assert attrs["tizia.skill.id"] == "plan-core"
    assert attrs["tizia.skills.selected"] == ["plan-core", "admin-x"]


def test_no_skill_id_without_skills(monkeypatch):
    assert "tizia.skill.id" not in _chat_attrs(monkeypatch, {})
