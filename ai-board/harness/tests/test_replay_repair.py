"""replay_repair: chains from journal rows, pair judging, offline baseline, verdict vocabulary, arm validity."""
from evaluation import replay_repair as rr

SYNTAX = "SyntaxError: missing ) after argument list"
ASSERT = "AssertionError: expected 1"


def row(i, node, repairs, **extra):
    rs = {"round_metrics": extra.pop("metrics", []), "diff_texts": extra.pop("texts", []),
          "repair_reason": extra.pop("feedback", None)}
    return {"id": i, "ticket": extra.pop("ticket", "1"), "run": "1", "node": node,
            "state": {"repairs": repairs, "gates": extra.pop("gates", []), "pins": {"plan_hash": "h"},
                      "base_sha": "abc", "repair_state": rs, **extra}}


def snapshot(reasons, diffs, produced=None):
    repairs = [{"gate": 4, "reason": r} for r in reasons[:-1]]
    metrics = [{"gate": 4, "diff": d} for d in diffs]
    rows = [row(1, "attempt_open", repairs[:2], feedback="cổng 4: x"),
            row(2, "gate_3", repairs[:2], produced=produced or {}),
            row(3, "repair_check", repairs, metrics=metrics, texts=["old diff"] * len(diffs),
                gates=[{"gate": 4, "blocked": True, "reason": reasons[-1]}])]
    return {"journal": rows, "plans": {"h": {"subtasks": []}}}


def test_pair_same_class_and_identical_diff():
    chains = rr.build_chains(snapshot([ASSERT, SYNTAX, SYNTAX], ["a", "b", "b"]))
    assert len(rr.pairs(chains)) == 1
    out = rr.offline(chains)
    assert (out["pairs"], out["identical"], out["same_class"], out["repeat"]) == (1, 1, 1, 1)


def test_different_diff_and_class_is_no_repeat():
    out = rr.offline(rr.build_chains(snapshot([ASSERT, SYNTAX, ASSERT], ["a", "b", "c"])))
    assert (out["identical"], out["same_class"], out["repeat"]) == (0, 0, 0)


def test_chain_without_second_failure_is_not_a_pair():
    assert rr.pairs(rr.build_chains(snapshot([ASSERT, SYNTAX], ["a", "b"]))) == []


def test_replayable_needs_plan_and_candidate():
    pair = rr.pairs(rr.build_chains(snapshot([ASSERT, SYNTAX, SYNTAX], ["a", "b", "c"])))[0]
    assert pair["replayable"]
    chain = rr.build_chains(snapshot([ASSERT, SYNTAX, SYNTAX], ["a", "b", "c"]))[0]
    chain["plan"] = None
    assert not rr.pairs([chain])[0]["replayable"]


def test_verdict_vocabulary():
    off = {"n": 30, "repeat": 15, "worse": 1}
    assert rr.verdict(off, {"n": 30, "repeat": 5, "worse": 1}, 30)["verdict"] == "PASS"
    assert rr.verdict(off, {"n": 30, "repeat": 15, "worse": 1}, 30)["verdict"] == "FAIL at stage"
    assert rr.verdict(off, {"n": 30, "repeat": 5, "worse": 4}, 30)["verdict"] == "FAIL at stage"
    few = rr.verdict(off, {"n": 3, "repeat": 0, "worse": 0}, 3)
    assert few["verdict"] == "NOT MEASURABLE" and str(rr.MIN_PAIRS) in few["why"]
    assert rr.verdict({"n": 30, "repeat": 0, "worse": 0}, off, 30)["verdict"] == "NOT MEASURABLE"


def test_model_arms_drop_samples_whose_temperature_contradicts_arm():
    def runner(pair, on, source):
        return {"temps": [0.3, 0.6], "repeat": False, "worse": False}  # OFF arm saw a warm call
    arms = rr.model_arms([{}], 2, "src", runner=runner)
    assert arms["off"] == {"n": 0, "repeat": 0, "worse": 0, "invalid": 2}
    assert arms["on"]["n"] == 2
