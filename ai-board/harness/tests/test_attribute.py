import json
import subprocess

import pytest

from evaluation.pipeline import attribute as A

TOY = "ai-board/harness/gates/static_check.py"
PASS = "def literal_misses(state, diff_text, checkout=None):\n    return []\n"
FLIP = ("def literal_misses(state, diff_text, checkout=None):\n"
        "    return ['want ' + state['request_title']] if 'X' in diff_text else []\n")
DIFF = "diff --git a/public/a.html b/public/a.html\n--- a/public/a.html\n+++ b/public/a.html\n@@ -1 +1 @@\n-a\n+X\n"


def git(repo, *args):
    return subprocess.run(["git", "-c", "user.name=t", "-c", "user.email=t@t", *args], cwd=repo, check=True,
                          capture_output=True, text=True).stdout.strip()


def merge(repo, branch, message, files):
    git(repo, "checkout", "-q", "-b", branch, "dev")
    for path, text in files.items():
        (repo / path).parent.mkdir(parents=True, exist_ok=True)
        (repo / path).write_text(text, encoding="utf-8")
    git(repo, "add", "-A")
    git(repo, "commit", "-qm", f"work on {branch}")
    git(repo, "checkout", "-q", "dev")
    git(repo, "merge", "-q", "--no-ff", branch, "-m", message)
    return git(repo, "rev-parse", "HEAD")


@pytest.fixture
def world(tmp_path):
    repo = tmp_path / "repo"
    repo.mkdir()
    git(repo, "init", "-q", "-b", "dev")
    (repo / TOY).parent.mkdir(parents=True)
    (repo / "ai-board/harness/gates/__init__.py").write_text("", encoding="utf-8")
    (repo / TOY).write_text(PASS, encoding="utf-8")
    (repo / "server").mkdir()
    (repo / "server/x.js").write_text("x\n", encoding="utf-8")
    git(repo, "add", "-A")
    git(repo, "commit", "-qm", "base")
    shas = {"base": git(repo, "rev-parse", "HEAD")}
    shas["server"] = merge(repo, "fix/touch-server", "merge: LF/3 touch-server fix/touch-server",
                           {"server/x.js": "process.env.AI_BOARD_TOY\n"})
    shas["literal"] = merge(repo, "fix/toy-literal-check", "merge: fix/toy-literal-check", {TOY: FLIP})
    shas["docs"] = merge(repo, "fix/docs-only", "merge: fix/docs-only", {"docs/readme.txt": "d\n"})
    shas["fix"] = merge(repo, "fix/toy-literal-undo", "merge: LF/12 toy-undo fix/toy-literal-undo", {TOY: PASS})
    data = tmp_path / "data"
    (data / "trials").mkdir(parents=True)
    (data / "rounds").mkdir()
    case = {"id": "c1", "title": "Doi chu", "detail": "d", "file": "public/a.html", "types": ["replace_text"], "level": 1}
    (data / "cases-dev.json").write_text(json.dumps([case]), encoding="utf-8")
    (data / "attack-cases.json").write_text("[]", encoding="utf-8")
    trial = {"arm": "B0", "case": "c1", "model_seed": 5}
    (data / "trials/B0-r1-c1.json").write_text(json.dumps({**trial, "repeat": 1, "pin": shas["base"][:8],
                                                           "outcome": "ready_for_pr"}), encoding="utf-8")
    (data / "trials/B0-r2-c1.json").write_text(json.dumps({**trial, "repeat": 2, "pin": shas["docs"][:8], "outcome": "blocked",
                                                           "first_block": {"gate": "4", "reason": "request_literal: want Doi chu"}}),
                                               encoding="utf-8")
    (data / "trials/B0-r2-c1.candidate.diff").write_text(DIFF, encoding="utf-8")
    (data / "arms.jsonl").write_text("\n".join(json.dumps({"arm": "B0", "worktree_head": shas[k], "env": env}) for k, env in
                                               (("base", {"AI_BOARD_A": "0"}), ("docs", {"AI_BOARD_A": "1"}))), encoding="utf-8")
    plan = tmp_path / "plan.json"
    plan.write_text(json.dumps({"tickets": [{"id": 7, "key": "toy-literal-check"}, {"id": 8, "key": "toy"}]}), encoding="utf-8")
    return {"repo": repo, "data": data, "plan": plan, "shas": shas, "tmp": tmp_path}


def run(w, **kw):
    return A.attribute(2, 1, data=w["data"], repo=w["repo"], plan_path=w["plan"], tmp=w["tmp"], **kw)


def test_merges_between_pins_carry_ticket_and_files(world):
    got = A.merges(world["repo"], world["shas"]["base"], world["shas"]["docs"], A.plan_keys(world["plan"]))
    assert [m["sha"] for m in got] == [world["shas"][k] for k in ("server", "literal", "docs")]
    assert (got[0]["lf"], got[0]["key"], got[0]["files"]) == (3, "touch-server", ["server/x.js"])
    assert (got[1]["lf"], got[1]["key"], got[1]["branch"], got[1]["files"]) == (7, "toy-literal-check", "fix/toy-literal-check", [TOY])
    assert got[2]["lf"] is None and got[2]["branch"] == "fix/docs-only"


def test_regression_goes_to_the_merge_that_flipped_the_check(world):
    rep = run(world)
    assert rep["paired"] == 1 and rep["unpaired"] == {"prev_only": [], "round_only": []}
    (reg,) = rep["regressions"]
    assert (reg["case"], reg["seed"], reg["first_block"]["gate"]) == ("c1", 5, "4")
    assert reg["replay"]["first_flip"] == world["shas"]["literal"] and reg["replay"]["reproduced"]
    sus = {s["sha"]: s for s in reg["suspects"]}
    assert sus[world["shas"]["literal"]]["evidence"] == ["replay", "module"] and reg["suspects"][0]["sha"] == world["shas"]["literal"]
    assert world["shas"]["server"] not in sus and world["shas"]["docs"] not in sus
    assert rep["flags"]["changed"] == {"AI_BOARD_A": ["0", "1"]}
    assert rep["flags"]["introduced"] == {"AI_BOARD_TOY": world["shas"]["server"]}
    md = A.md(rep)
    assert "| c1 | 5 | 4 request_literal" in md and world["shas"]["literal"][:8] in md


def test_replay_past_the_pin_finds_the_merge_that_undoes_the_flip(world):
    reg = run(world, until=world["shas"]["fix"])["regressions"][0]
    assert reg["replay"]["first_flip"] == world["shas"]["literal"]
    assert [c["sha"] for c in reg["replay"]["changes"]] == [world["shas"]["literal"], world["shas"]["fix"]]
    assert reg["replay"]["changes"][1]["blocked"] is False


def test_model_path_gate_has_module_and_flag_suspects_only(world):
    t = world["data"] / "trials/B0-r2-c1.json"
    trial = json.loads(t.read_text(encoding="utf-8"))
    t.write_text(json.dumps({**trial, "first_block": {"gate": "2.5", "reason": "plan_ungrounded"}}), encoding="utf-8")
    reg = run(world)["regressions"][0]
    assert reg["replay"]["status"] == "not_replayable"
    assert {s["sha"]: (s["evidence"], s["hit"]) for s in reg["suspects"]} == {
        world["shas"]["literal"]: (["module"], "package"), world["shas"]["server"]: (["flag"], None)}
    assert reg["suspects"][0]["sha"] == world["shas"]["literal"]


def test_import_error_is_an_error_and_an_errored_baseline_names_no_flip(world):
    repo = world["repo"]
    git(repo, "checkout", "-q", "-b", "broken", world["shas"]["base"])
    (repo / TOY).write_text("raise AttributeError('broken import')\n", encoding="utf-8")
    git(repo, "commit", "-qam", "broken")
    job = {"module": "gates.static_check", "func": "literal_misses", "args": [{"request_title": "t"}, "X", None], "kind": "list"}
    seq = [git(repo, "rev-parse", "HEAD"), world["shas"]["literal"]]
    outs = A._replay(repo, seq, [job], None, world["tmp"])[0]
    assert outs[0]["blocked"] is None and "AttributeError" in outs[0]["error"] and outs[1]["blocked"] is True
    s = A._summary(job, seq, outs, 1)
    assert s["status"] == "baseline_error" and s["first_flip"] is None


def test_round_flags_come_from_trials_before_arms_jsonl(world):
    assert A.round_flags([{"flags": {"AI_BOARD_A": "2"}}], world["shas"]["base"][:8], world["data"], "B0") == {"AI_BOARD_A": "2"}
    assert A.round_flags([{"flags": None}], world["shas"]["base"][:8], world["data"], "B0") == {"AI_BOARD_A": "0"}
