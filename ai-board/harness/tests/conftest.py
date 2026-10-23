import pytest

PINNED_REF = "5" * 40


@pytest.fixture
def pinned_head(monkeypatch):
    """Pin provenance ref: run dir name embeds it, so a moving HEAD breaks resume."""
    from evaluation.suite import runner

    real = runner.provenance
    monkeypatch.setattr(runner, "provenance", lambda *a, **k: {**real(*a, **k), "ref": PINNED_REF})
    return PINNED_REF
