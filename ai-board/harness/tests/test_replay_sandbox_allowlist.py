"""Replay LF/187 tool stage: corpus safety, trace scan, verdicts. Fixtures only."""
import json

from evaluation import replay_sandbox_allowlist as r


def test_no_attack_allowed_and_legit_forms_accepted_when_armed():
    safe = r.safety()
    assert safe["attacks"] >= 40
    assert safe["attacks_allowed"] == [] and safe["legit_wrongly_refused"] == []
    assert safe["armed_forms_allowed_when_off"] == []


def test_attack_corpus_creates_no_vm_with_arm_off_either():
    assert [a for a in r.ATTACKS if r.attempt(a, r.OLD)] == []


def test_spy_detects_a_vm_for_an_allowed_form():
    assert r.attempt(["npm", "test"], r.NEW) is True
    assert r.attempt(["npm", "test"], r.OLD) is False


def test_extract_reads_tool_call_span_and_note_shapes():
    text = json.dumps({"calls": [{"name": "run_in_sandbox", "arguments": {"argv": ["npm", "test"]}}],
                       "spans": [{"tizia.sandbox.argv": "node scripts/run-tests.mjs"}]})
    assert r.extract(text) == [["npm", "test"], ["node", "scripts/run-tests.mjs"]]
    assert r.extract("run_in_sandbox node --check a.js rc=0 x") == [["node", "--check", "a.js"]]


def test_scan_counts_old_refused_and_newly_accepted(tmp_path):
    (tmp_path / "a.json").write_text(json.dumps([{"name": "run_in_sandbox", "arguments": {"argv": ["npm", "test"]}},
                                                  {"name": "run_in_sandbox", "arguments": {"argv": ["sh", "-c", "x"]}},
                                                  {"name": "run_in_sandbox", "arguments": {"argv": ["node", "--check", "a.js"]}}]))
    (tmp_path / "b.json").write_text("{}")
    s = r.scan([tmp_path])
    assert (s["traces_with_commands"], s["attempts"], s["refused_old"], s["accepted_new"], s["newly_accepted"]) == (1, 3, 2, 2, 1)


def test_verdicts():
    ok = {"attacks_allowed": [], "legit_wrongly_refused": [], "armed_forms_allowed_when_off": []}
    none = {"attempts": 0, "newly_accepted": 0}
    assert r.verdict(ok, none) == r.NOT_MEASURABLE
    assert r.verdict(ok, {"attempts": 3, "newly_accepted": 2}) == r.PASS
    assert r.verdict(ok, {"attempts": 3, "newly_accepted": 0}) == r.FAIL
    assert r.verdict({**ok, "attacks_allowed": [["x"]]}, {"attempts": 3, "newly_accepted": 2}) == r.FAIL
    assert r.verdict({**ok, "legit_wrongly_refused": [["npm", "test"]]}, none) == r.FAIL


def test_gpu_command_lists_dev_ids(tmp_path):
    (tmp_path / "split.json").write_text(json.dumps({"cases": [{"id": "a", "split": "dev"}, {"id": "b", "split": "heldout"}]}))
    cmd = r.gpu_command(tmp_path)
    assert "a" in cmd and ",b" not in cmd and r.ARM in cmd
