"""Feature plan whose acceptance only greps source is a plan fault; one check that runs the code clears it."""
from gates.brainstorm import source_only_acceptance

TWO = [{"file": "public/js/topic-modes.js"}, {"file": "public/bao-che-hub.html"}]


def _plan(acceptance, subtasks=TWO):
    return {"acceptance": acceptance, "subtasks": subtasks}


def test_greps_of_edited_source_only_is_a_fault(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    why = source_only_acceptance(_plan(["grep -q 'function getTopicSummary' public/js/topic-modes.js",
                                        "grep -q 'id=\"topic-summary\"' public/bao-che-hub.html"]))
    assert why and "./public/js/topic-modes.js" in why


def test_one_behavioural_check_clears_it():
    for runs in ("node -e \"import('./public/js/topic-modes.js').then(m => process.exit(m.f('x') ? 0 : 1))\"",
                 "curl -s 'localhost:8041/api/portal-apps/catalog?domain=it' | grep -q items",
                 "node --test test/topic.test.js"):
        assert source_only_acceptance(_plan(["grep -q x public/js/topic-modes.js", runs])) is None


def test_single_file_and_no_acceptance_plans_are_untouched():
    assert source_only_acceptance(_plan(["grep -q x public/a.css"], [{"file": "public/a.css"}])) is None
    assert source_only_acceptance(_plan(None)) is None
