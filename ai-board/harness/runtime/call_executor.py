"""One owner of model-call attempts: candidate failover, shared attempt cap, backoff. Providers supply single-attempt calls."""
import time

from runtime.budget import BudgetExhausted

BACKOFF_S = (2.0, 5.0)
MAX_ATTEMPTS = len(BACKOFF_S) + 1


def run(candidates, attempt, record, *, budget, sleep, check_wait, retryable, empty_msg,
        stop_on_error=False, on_failed=None):
    """Try candidates under one cap of MAX_ATTEMPTS. Untried candidate first, then repeat last failing one.
    attempt(candidate) -> body, raises on error. record(candidate, body, error, started) runs after each attempt.
    Returns (candidate, body); raises last error or RuntimeError(empty_msg)."""
    if not candidates:
        raise RuntimeError(empty_msg)
    tried, last, last_error = set(), None, None
    for wait_s in (0.0, *BACKOFF_S):
        untried = [c for c in candidates if c['id'] not in tried]
        candidate = untried[0] if untried else last
        if not budget.tick() or not budget.can_request():
            raise BudgetExhausted('budget exhausted before model attempt')
        if wait_s:
            check_wait(wait_s)
            sleep(wait_s)
        if not budget.tick() or not budget.can_request():
            raise BudgetExhausted('budget exhausted before model attempt')
        started = time.monotonic()
        body, error = {}, None
        try:
            body = attempt(candidate)
            if not isinstance(body, dict):
                raise ValueError('Model response must be a JSON object')
        except Exception as caught:
            if isinstance(caught, BudgetExhausted) and getattr(caught, 'before_model', False):
                raise
            body, error = {}, caught
        record(candidate, body, error, started)
        if error is None:
            return candidate, body
        if stop_on_error or not retryable(error):
            raise error
        if on_failed:
            on_failed(candidate)
        tried.add(candidate['id'])
        last, last_error = candidate, error
    raise last_error
