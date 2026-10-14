"""Offline capture checks execute selected AST seams without runtime/model imports."""
import ast
import copy
import dataclasses
import hashlib
import json
import subprocess
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace

candidate = (Path(sys.argv.pop(1)) if __name__ == "__main__" and len(sys.argv) > 1
             else Path(__file__).resolve().parents[1] / "evaluation" / "suite" / "trial.py")
tree = ast.parse(candidate.read_text(encoding="utf-8"))


@dataclasses.dataclass(frozen=True)
class StubDeps:
    responses: list

    def call_model(self, *args, **kwargs):
        result = self.responses.pop(0)
        if isinstance(result, Exception):
            raise result
        return result


def parse_plan(text):
    value = json.loads(text)
    if not isinstance(value, dict) or "subtasks" not in value:
        raise ValueError("not a plan")
    return value


scope = dict(dataclasses=dataclasses, copy=copy, Deps=StubDeps, brainstorm=SimpleNamespace(parse_plan=parse_plan),
             hashlib=hashlib, subprocess=subprocess,
             code_index=SimpleNamespace(git=lambda *args: b"TEST source"))
selected = [n for n in tree.body if getattr(n, "name", "") in ("RecordingDeps", "_capture_plan", "_capture_source")]
assert len(selected) == 3, "Capture proposal missing required seams"
exec(compile(ast.Module(body=selected, type_ignores=[]), str(candidate), "exec"), scope)


class CaptureTests(unittest.TestCase):
    def test_full_responses_are_pinned_without_arguments_or_credentials(self):
        text = "x" * 10000
        deps = scope["RecordingDeps"]([{"response": text, "model": "TEST", "authorization": "SECRET", "_route": {"token": "SECRET"}}])
        deps.capture["phase"] = "planning"
        deps.capture["enabled"] = True
        deps.call_model("private argument", headers={"Authorization": "SECRET"}, gold="ORACLE")
        captured = deps.capture["model_calls"][0]
        self.assertEqual(captured["response"], text)
        for forbidden in ("SECRET", "ORACLE", "private argument"):
            self.assertNotIn(forbidden, json.dumps(captured))

    def test_blocked_plan_keeps_initial_final_and_failed_attempt(self):
        first, final = {"subtasks": [{"file": "first"}]}, {"subtasks": [{"file": "final"}]}
        deps = scope["RecordingDeps"]([{"response": json.dumps(first)}, RuntimeError("SECRET"), {"response": json.dumps(final)}])
        deps.capture["phase"] = "planning"
        deps.capture["enabled"] = True
        deps.call_model()
        with self.assertRaises(RuntimeError):
            deps.call_model()
        deps.call_model()
        scope["_capture_plan"](deps.capture, None)
        self.assertEqual(deps.capture["initial_plan"], first)
        self.assertEqual(deps.capture["final_plan"], final)
        calls = deps.capture["model_calls"]
        self.assertEqual([c["attempt"] for c in calls], [1, 2, 3])
        self.assertEqual(calls[1]["state"], "failed")
        self.assertNotIn("SECRET", json.dumps(calls))

    def test_validator_response_does_not_pollute_final_plan(self):
        plan = {"subtasks": [{"file": "page"}]}
        deps = scope["RecordingDeps"]([{"response": json.dumps(plan)}, {"response": "validator question"}, {"response": "execution output"}])
        deps.capture["enabled"] = True
        for phase in ("planning", "validation", "execution"):
            deps.capture["phase"] = phase
            deps.call_model()
        scope["_capture_plan"](deps.capture, None)
        self.assertEqual(deps.capture["final_plan"], plan)
        self.assertEqual(len(deps.capture["model_calls"]), 2)
        self.assertEqual(deps.capture["model_calls"][1]["phase"], "validation")

    def test_source_hash_snapshot_and_blocked_capture_seam(self):
        capture = {"source_targets": ["public/test.html"], "initial_plan": {"subtasks": [{"file": "public/wrong.html"}]},
                   "final_plan": None, "gold": "ORACLE"}
        result = scope["_capture_source"](capture, None, "TESTSHA")
        self.assertEqual(result["public/test.html"]["sha256"], hashlib.sha256(b"TEST source").hexdigest())
        self.assertIn("public/wrong.html", result)
        self.assertNotIn("ORACLE", json.dumps(result))
        planning = ast.unparse(next(n for n in tree.body if getattr(n, "name", "") == "_plan_stage"))
        self.assertLess(planning.index("_capture_plan"), planning.index("if out.get('blocked') or not plan"))
        self.assertIn("validator_results", planning)
        trial = ast.unparse(next(n for n in tree.body if getattr(n, "name", "") == "run_trial"))
        self.assertIn("'capture': capture", trial)
        self.assertIn("'full_diff': row.get('diff') or ''", trial)
        self.assertIn("task.get('split') == 'dev'", trial)

    def test_new_page_source_is_marked_missing_without_losing_trial(self):
        old = scope["code_index"]
        scope["code_index"] = SimpleNamespace(git=lambda *args: (_ for _ in ()).throw(OSError("not in base")))
        try:
            capture = {"source_targets": [], "initial_plan": {"subtasks": [{"file": "public/new.html"}]}}
            self.assertEqual(scope["_capture_source"](capture, None, "TESTSHA"), {"public/new.html": {"missing": True}})
        finally:
            scope["code_index"] = old

    def test_non_dev_never_captures_model_content(self):
        deps = scope["RecordingDeps"]([{"response": "TEST excluded response"}])
        deps.capture["phase"] = "planning"
        deps.call_model()
        scope["_capture_plan"](deps.capture, {"subtasks": [{"file": "TEST excluded"}]})
        self.assertNotIn("TEST excluded", json.dumps(deps.capture))


if __name__ == "__main__":
    unittest.main()
