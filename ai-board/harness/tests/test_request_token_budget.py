import pytest

from runtime.budget import Budget
from runtime.pipeline import Deps
from evaluation.suite.trial import recording


def test_request_bound_survives_resume_and_stops_ai_provider_before_remote_work():
    class Forbidden:
        def generate(self, *args, **kwargs):
            raise AssertionError('provider must not be called')
    budget = Budget.restore(Budget(tokens=180000, max_request_tokens=32768).snapshot())
    deps = recording(Deps(models=Forbidden(), notify=None, stop_on_model_error=True))
    with pytest.raises(RuntimeError, match='budget'):
        deps.call_model('model', 'prompt', gate=3, budget=budget)
    assert budget.model_calls == 0 and budget.tokens == 180000
    assert not deps.capture.get('model_failure') and not deps.capture.get('usage_missing')
    assert budget.max_request_tokens == 32768
    assert Budget(tokens=167232, max_request_tokens=32768).can_request()
