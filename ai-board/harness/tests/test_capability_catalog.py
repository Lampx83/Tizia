"""Gate 2 and policy.js read one capability catalog; both agree on meanings and path rules."""
import json
import subprocess
from pathlib import Path

import pytest

import path_policy
from gates import scope_check

REPO = Path(__file__).resolve().parents[3]
CASES = json.loads((REPO / "test" / "fixtures" / "ai-board-path-capability.json").read_text(encoding="utf-8"))


@pytest.mark.parametrize("case", CASES, ids=lambda c: f"{c['file']}|{c['editable']}")
def test_path_capability_follows_shared_fixture(monkeypatch, case):
    monkeypatch.setattr(path_policy, "may_edit", lambda file, role="student": case["editable"])
    assert scope_check.path_capability(case["file"]) == case["capability"]


def test_meanings_match_what_policy_js_builds():
    script = ("const m = await import('./server/ai-board/security/policy.js');"
              "console.log(JSON.stringify(Object.fromEntries(Object.entries(m.CAPABILITY_POLICY)"
              ".map(([k, v]) => [k, `[${v.tier}] ${v.rationale}`]))))")
    run = subprocess.run(["node", "--input-type=module", "-e", script], cwd=REPO, capture_output=True, text=True)
    assert run.returncode == 0, run.stderr[-600:]
    built = json.loads(run.stdout.strip().splitlines()[-1])
    assert scope_check.catalog_meanings() and all(built[k] == v for k, v in scope_check.catalog_meanings().items())
