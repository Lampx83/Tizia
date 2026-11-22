"""Gate 5 probes edited existing routes and reviews unobservable changes (critical_only_checks); brainstorm v2 example."""
import pytest

from gate5 import functional, verify
from gates import brainstorm
from settings import reset_settings
from tests.test_gate_5_verify import FakeRunner, checkout, state, served  # noqa: F401 (served: autouse fake app)

ROUTER = """import express from 'express';
export function attachPortalApps(app) {
  const r = express.Router();
  r.get('/api/portal-apps/mine', requireAuth, async (req, res) => {
    res.json({ own: [] });
  });

  r.get('/api/portal-apps/catalog', async (req, res) => {
    const builtins = await listBuiltinApps();
    const { domain } = req.query;
    const rows = domain ? builtins.filter(a => a.domain === domain) : builtins;
    res.json({
      builtin: rows.map(a => ({ id: a.id, domain: a.domain })),
    });
  });

  r.post('/api/portal-apps/install', requireAuth, (req, res) => res.json({}));
  app.use(r);
}
"""
FILE = "server/contexts/portal-apps/index.js"
EDIT_DIFF = (f"diff --git a/{FILE} b/{FILE}\nindex 1..2 100644\n--- a/{FILE}\n+++ b/{FILE}\n"
             "@@ -8,7 +8,9 @@ export function attachPortalApps(app) {\n"
             "   r.get('/api/portal-apps/catalog', async (req, res) => {\n"
             "     const builtins = await listBuiltinApps();\n"
             "+    const { domain } = req.query;\n"
             "+    const rows = domain ? builtins.filter(a => a.domain === domain) : builtins;\n"
             "     res.json({\n"
             "-      builtin: builtins.map(a => ({ id: a.id, domain: a.domain })),\n"
             "+      builtin: rows.map(a => ({ id: a.id, domain: a.domain })),\n"
             "     });\n"
             "   });\n")
OUTSIDE_DIFF = (f"diff --git a/{FILE} b/{FILE}\n--- a/{FILE}\n+++ b/{FILE}\n"
                "@@ -1,2 +1,3 @@\n import express from 'express';\n+const LIMIT = 5;\n export function attachPortalApps(app) {\n")


@pytest.fixture
def crit(monkeypatch):
    monkeypatch.setenv("AI_BOARD_CRITICAL_ONLY_CHECKS", "1")
    reset_settings()
    yield
    reset_settings()


def edited(tmp_path, diff=EDIT_DIFF, test_file=None):
    s = state(checkout(tmp_path))
    source = ROUTER if diff is EDIT_DIFF else ROUTER.replace("\n", "\nconst LIMIT = 5;\n", 1)
    (tmp_path / FILE).parent.mkdir(parents=True)
    (tmp_path / FILE).write_text(source, encoding="utf-8")
    s["diffs"] = [{"file": FILE, "test_file": test_file, "diff": diff}]
    s["full_diff"] = [{"file": FILE, "diff": diff}]
    return s


def test_edit_inside_an_existing_handler_is_detected_as_that_route(tmp_path):
    assert functional._edited_routes(edited(tmp_path)) == [("GET", "/api/portal-apps/catalog")]


def test_edit_outside_any_handler_is_no_route(tmp_path):
    assert functional._edited_routes(edited(tmp_path, OUTSIDE_DIFF)) == []


def test_edited_route_is_not_probed_with_flag_off(tmp_path):
    reset_settings()
    out = verify.run(edited(tmp_path), runner=FakeRunner())
    assert out["blocked"] is True and "không chạm file public" in out["reason"]


def test_edited_route_answering_is_probed_and_passes(tmp_path, monkeypatch, crit):
    seen = []
    monkeypatch.setattr(functional, "_fetch", lambda method, url: seen.append((method, url)) or (200, b'{"builtin":[]}'))
    s = edited(tmp_path)
    out = verify.run(s, runner=FakeRunner(), functional_probe=lambda base, _: functional.run_route(base, s))
    assert out["blocked"] is False, out["reason"]
    assert seen == [("GET", "http://127.0.0.1:49152/api/portal-apps/catalog")]
    assert out["evidence"]["functional"]["probe_id"] == functional.ROUTE_PROBE


def test_edited_route_failing_probe_still_blocks(tmp_path, monkeypatch, crit):
    monkeypatch.setattr(functional, "_fetch", lambda method, url: (500, b"boom"))
    s = edited(tmp_path)
    out = verify.run(s, runner=FakeRunner(), functional_probe=lambda base, _: functional.run_route(base, s))
    assert out["blocked"] is True and "/api/portal-apps/catalog" in out["reason"]


def test_no_observation_is_needs_review_with_flag(tmp_path, monkeypatch, crit):
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": None, "passed": False, "reason": functional.NO_ORACLE})
    out = verify.run(edited(tmp_path, OUTSIDE_DIFF, "test/generated.test.js"), runner=FakeRunner())
    assert out["blocked"] is False, out["reason"]
    assert out["evidence"]["functional"]["needs_review"] is True and out["evidence"]["http_observed"] is True
    assert "needs_review" in out["evidence"]["text"]


def test_no_observation_with_failing_acceptance_blocks(tmp_path, monkeypatch, crit):
    monkeypatch.setattr(functional, "run", lambda *_, **__: {"probe_id": None, "passed": False, "reason": functional.NO_ORACLE})
    s = {**edited(tmp_path, OUTSIDE_DIFF, "test/generated.test.js"), "acceptance": ["curl -s localhost:8041/api/portal-apps/catalog | grep -q builtin"]}

    class AcceptanceFails(FakeRunner):
        def __call__(self, args, **kwargs):
            done = super().__call__(args, **kwargs)
            return done if "grep -q builtin" not in args[-1] else type(done)(args, 1, "", "no builtin")
    out = verify.run(s, runner=AcceptanceFails())
    assert out["blocked"] is True and "acceptance" in out["reason"]


def test_no_observation_blocks_without_flag(tmp_path):
    reset_settings()
    runner = FakeRunner()
    out = verify.run(edited(tmp_path, OUTSIDE_DIFF), runner=runner)
    assert out["blocked"] is True and out["failure_class"] == "plan" and runner.calls == []


def test_brainstorm_v2_prompt_has_no_literal_capability_example(monkeypatch):
    request = {"id": "r", "subject": "s", "body": "b"}
    reset_settings()
    off = brainstorm.build_prompt(request, frozenset({"public.ui"}))
    assert '["content.write"]' in off
    monkeypatch.setenv("AI_BOARD_TOOL_DEFS_V2", "1")
    reset_settings()
    try:
        on = brainstorm.build_prompt(request, frozenset({"public.ui"}))
    finally:
        monkeypatch.delenv("AI_BOARD_TOOL_DEFS_V2")
        reset_settings()
    assert '["content.write"]' not in on and "core capability content.write" not in on
    assert "CAPABILITY NAMES (enum" in on
    assert brainstorm.build_prompt(request, frozenset({"public.ui"})) == off
