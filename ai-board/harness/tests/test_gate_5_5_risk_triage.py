"""Gate 5.5 scores the actual patch without model or filesystem I/O."""
import main
from gates import risk_triage


def patch(path, added, *, new=True):
    prefix = f"diff --git a/{path} b/{path}\n"
    prefix += "new file mode 100644\n--- /dev/null\n" if new else f"--- a/{path}\n"
    return prefix + f"+++ b/{path}\n@@ -0,0 +1 @@\n+{added}\n"


def state_for(*items, caps=()):
    return {"plan": {"capabilities": list(caps)},
            "diffs": [{"file": path, "diff": patch(path, line, new=new)}
                      for path, line, new in items]}


TEST = ("test/skill.test.js", "assert(true)", True)


def test_core_is_always_critical_even_for_one_line_with_test():
    state = state_for(("public/x.js", "x", True), TEST)
    out = risk_triage.run(state, manifest={"capabilities": {"core": ["db"]}})
    assert out["risk_level"] == "critical"
    assert any(s["name"] == "core" and s["detail"] == "db" for s in out["risk_signals"])


def test_new_route_and_middleware_are_high():
    for added in ("router.get('/x', handler)", "app.use(authMiddleware)"):
        out = risk_triage.run(state_for(("server/new.js", added, True), TEST))
        assert out["risk_level"] == "high"
        assert any(s["name"] == "new_route_or_middleware" for s in out["risk_signals"])


def test_two_domains_are_high():
    out = risk_triage.run(state_for(
        ("server/contexts/_ai-generated/pharmacy/x.js", "x", True),
        ("public/js/domains/economics/y.js", "y", True), TEST))
    assert out["risk_level"] == "high"
    assert out["domains"] == ["economics", "pharmacy"]


def test_existing_file_is_medium_and_missing_test_bumps_one_tier():
    with_test = state_for(("public/x.js", "x", False), TEST)
    without_test = state_for(("public/x.js", "x", False))
    assert risk_triage.run(with_test)["risk_level"] == "medium"
    out = risk_triage.run(without_test)
    assert out["risk_level"] == "high"
    assert {s["name"] for s in out["risk_signals"]} == {"existing_file", "missing_test"}


def test_only_new_file_is_low_with_test_medium_without_test():
    assert risk_triage.run(state_for(("public/x.js", "x", True), TEST))["risk_level"] == "low"
    assert risk_triage.run(state_for(("public/x.js", "x", True)))["risk_level"] == "medium"


def test_full_diff_overrides_scratch_diff_new_file_metadata():
    state = state_for(("public/x.js", "x", True), TEST)
    state["full_diff"] = [{"file": "public/x.js", "diff": patch("public/x.js", "x", new=False)},
                          {"file": TEST[0], "diff": patch(*TEST[:2])}]
    assert risk_triage.run(state)["risk_level"] == "medium"


def test_main_gate_5_5_exposes_structured_signals_without_model_calls(fake_deps):
    state = state_for(("public/x.js", "x", True), TEST)
    state["manifest"] = {"capabilities": {"core": []}}
    out = main.run_gate(5.5, {}, fake_deps, None, state)
    assert out["risk_signals"] == state["risk_signals"]
    assert fake_deps.models.calls == []
