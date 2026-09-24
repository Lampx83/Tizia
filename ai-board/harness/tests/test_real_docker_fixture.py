"""Opt-in real run (AI_BOARD_REAL_DOCKER=1): D0 content fixture through a real AI Board
worktree/branch and a real isolated Docker Compose project. Only the model is fake.

The source is a local clone of this repo, so the human checkout never gets the branch.
"""
import json
import os
import re
import subprocess
from dataclasses import replace
import sys
from pathlib import Path

import pytest

import main
from budget import Budget
from conftest import FakeModels, deps_with

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from worker import execute_pre_pr  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
# Guest-visible (unauthenticated GET sees the change) and under Gate 3's 20 KB existing-file cap.
PAGE = "public/tinh-nang.html"
MARKER = '<p data-ai-board-fixture="d0">Trang tính năng đã được AI Board cập nhật (fixture D0).</p>'
TEST = """import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('features page carries the D0 fixture marker', () => {
  const html = fs.readFileSync(new URL('../public/tinh-nang.html', import.meta.url), 'utf8');
  assert.match(html, /data-ai-board-fixture="d0"/);
});
"""


@pytest.mark.skipif(os.environ.get("AI_BOARD_REAL_DOCKER") != "1", reason="real Docker run is opt-in")
def test_d0_fixture_reaches_docker_http_on_an_ai_board_branch(tmp_path):
    source = tmp_path / "tizia"
    subprocess.run(["git", "clone", "-q", "--local", "--no-hardlinks", str(REPO), str(source)],
                   check=True, stdin=subprocess.DEVNULL)
    page = (source / PAGE).read_text(encoding="utf-8")
    assert "</body>" in page
    codegen = {"code": page.replace("</body>", MARKER + "\n</body>", 1),
               "test_file": "test/ai-board-d0-fixture.test.js", "test": TEST}
    deps = replace(deps_with(FakeModels(plan=None, codegen=codegen)), verify=None)  # real Gate 5
    plan = {"capabilities": ["public.ui"], "steps": [{
        "order": 1, "title": "Thêm dòng cập nhật vào trang tính năng", "allowed_scope": [PAGE],
        "tests": ["node --test test/ai-board-d0-fixture.test.js"], "risk": "low",
    }]}
    seen = {}

    def run_gate(gate, request, deps_, budget, state):
        result = main.run_gate(gate, request, deps_, budget, state)
        seen[gate] = result
        return result

    # The same catalog the server serves in the leased snapshot.
    policy = json.loads(subprocess.run(
        ["node", "--input-type=module", "-e",
         "import('./server/ai-board/policy.js').then(m => console.log(JSON.stringify(m.CAPABILITY_CATALOG)))"],
        cwd=REPO, check=True, capture_output=True, text=True, encoding="utf-8").stdout)
    verdict = execute_pre_pr(plan, ticket_id=4, checkout_source=source, deps=deps,
                             budget=Budget(max_wall_clock_s=1800), run_gate=run_gate,
                             cleanup=main.cleanup_full_checkout, policy=policy,
                             accepted_policy_hash=policy["hash"],
                             request_detail="[Trang: Tính năng] /tinh-nang.html\nThêm dòng cập nhật")
    print(json.dumps(verdict, ensure_ascii=False, indent=2))
    print(seen[5]["evidence"]["text"][-3000:] if seen.get(5) and seen[5].get("evidence") else seen.get(5))

    assert verdict["outcome"] == "ready_for_pr", verdict
    gate5 = next(g for g in verdict["gates"] if g["gate"] == 5)
    assert gate5["smoke_passed"] and gate5["http_observed"]
    assert gate5["runner"] == "docker"
    assert Path(seen[5]["evidence"]["screenshot"]).stat().st_size > 0
    print("screenshot:", seen[5]["evidence"]["screenshot"])
    candidate = verdict["candidate"]
    assert re.fullmatch(r"ai-board/\d{4}-\d{2}-\d{2}-ticket-4-[0-9a-f]{6}", candidate["branch"])
    log = subprocess.run(["git", "log", "--format=%H %s", f"{candidate['base_sha']}..{candidate['branch']}"],
                         cwd=source, check=True, capture_output=True, text=True, encoding="utf-8").stdout
    assert log.split()[0] == candidate["head_sha"]
    assert len(log.strip().splitlines()) == 1
    shown = subprocess.run(["git", "show", f"{candidate['branch']}:{PAGE}"], cwd=source, check=True,
                           capture_output=True, text=True, encoding="utf-8").stdout
    assert MARKER in shown
    assert "ai-board" not in subprocess.run(["git", "branch", "--list", "ai-board/*"], cwd=REPO,
                                            capture_output=True, text=True).stdout
