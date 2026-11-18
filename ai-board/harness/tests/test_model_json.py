"""Model replies with raw control characters or a code fence still parse; non-JSON still fails."""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from gates import brainstorm, implement, intake_guard, plan_validate, react_plan  # noqa: E402
from runtime import model_json, repair_agent  # noqa: E402

TAB_IN_STRING = '{"clear": true, "why": "ok\tline\nnext"}'


def test_raw_control_characters_inside_strings_parse():
    assert model_json.loads(TAB_IN_STRING)["why"] == "ok\tline\nnext"


def test_fence_and_think_block_are_dropped():
    assert model_json.loads('<think>x</think>\n```json\n{"a": 1}\n```') == {"a": 1}


def test_not_json_still_raises():
    with pytest.raises(ValueError):
        model_json.loads("tôi nghĩ là có")


def test_validator_reads_a_reply_with_a_raw_tab():
    assert plan_validate.parse_validation(TAB_IN_STRING)["clear"] is True


@pytest.mark.parametrize("parse, text", [
    (lambda t: intake_guard.parse_labels(t), '```json\n{"labels": ["ok"]}\n```'),
    (lambda t: react_plan.parse_action(t), '{"tool": "read_file", "arguments": {"path": "a\tb"}}'),
])
def test_other_parsers_share_the_reader(parse, text):
    parse(text)


def test_plan_and_codegen_and_repair_use_the_reader(monkeypatch):
    seen = []
    real = model_json.loads
    monkeypatch.setattr(model_json, "loads", lambda text: seen.append(text) or real(text))
    for parse in (brainstorm.parse_plan, implement.parse_codegen, repair_agent.parse):
        with pytest.raises(Exception):
            parse('{"x": 1}')
    assert len(seen) == 3
