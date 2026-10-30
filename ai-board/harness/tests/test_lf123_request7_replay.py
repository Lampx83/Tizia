"""Offline replay of root 28 request 7 gate 2.5 validator outputs recorded in ai_gate_traces (LF/123 criterion 3)."""
import json
from pathlib import Path

from gates import plan_validate as pv

FIXTURE = json.loads((Path(__file__).parent / "fixtures" / "lf123_request7_validator.json").read_text(encoding="utf-8"))
PLAN_FILES = ["public/js/school-explore.js"]


def _replay(name):
    validation = pv.parse_validation(FIXTURE[name]["response"])
    return validation, pv.objection_advisory(validation, {path: "" for path in PLAN_FILES})


def test_recorded_run68_objection_is_advisory_without_verified_snippet():
    validation, note = _replay("run68_gate25_validate")
    assert validation["grounded"] is False and validation["objection"] is None
    assert note and "không chặn" in note


def test_recorded_run69_objection_is_advisory_without_verified_snippet():
    validation, note = _replay("run69_gate25_validate")
    assert validation["grounded"] is False and validation["objection"] is None
    assert note and "không chặn" in note
