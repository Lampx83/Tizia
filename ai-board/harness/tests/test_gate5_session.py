"""Gate 5 failure classes, unit-tested without Docker or microVM."""
import pytest

from gates import gate5_session as session


@pytest.mark.parametrize("stage, expected", [
    ("preflight", "transient"),
    ("boot", "transient"),
    ("teardown", "transient"),
    ("screenshot", "transient"),
    ("config", "critical"),
    ("address", "critical"),
    ("env", "critical"),
    ("ordinary", "ordinary"),
    ("plan", "plan"),
])
def test_stage_maps_to_failure_class(stage, expected):
    assert session.failure_class(stage, "reason") == expected


def test_no_reason_means_no_failure_class():
    assert session.failure_class("config", None) is None
    assert session.failure_class("ordinary", "") is None


def test_unknown_stage_fails_loudly():
    with pytest.raises(KeyError):
        session.failure_class("made-up", "reason")


def test_stage_table_covers_every_stage_once():
    assert set(session.STAGE_CLASS) == {
        "preflight", "boot", "config", "address", "env", "ordinary", "plan", "screenshot", "teardown"}
