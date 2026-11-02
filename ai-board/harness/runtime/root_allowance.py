"""Lease-bound root work admission; execution cursors and proofs remain plan-scoped."""
import json
import secrets
import urllib.error
from contextlib import contextmanager
from contextvars import ContextVar

from runtime.budget import BudgetExhausted

_ROOT = ContextVar('ai_board_root_allowance', default=None)


def current():
    return _ROOT.get()


def reset() -> None:
    """Clear the ambient allowance so a finished run cannot gate the next one in the same process."""
    _ROOT.set(None)


def _used(state, cap):
    """Tokens are capped only for paid api calls (metered_tokens); older receipts fall back to the total."""
    return state['used'].get('metered_tokens', state['used']['tokens']) if cap == 'tokens' else state['used'][cap]


class RootAllowance:
    def __init__(self, client, ticket_id, lease):
        self.client, self.lease = client, dict(lease)
        self.base = f'/api/ai-board/worker/tickets/{ticket_id}/allowance'
        self.state = None

    def skills(self, task_type, role):
        result = self.client.post(self.base.removesuffix('/allowance') + '/skills',
                                  {**self.lease, 'task_type': task_type, 'role': role})
        if not isinstance(result, dict) or not isinstance(result.get('skills'), list) or len(result['skills']) > 1:
            raise ValueError('invalid approved skill catalog')
        return result['skills']

    def _call(self, op, **body):
        try:
            state = self.client.post(f'{self.base}/{op}', {**self.lease, **body})
            if not isinstance(state.get('used'), dict) or not isinstance(state.get('limits'), dict):
                raise ValueError('invalid allowance receipt')
        except Exception as error:
            reason = 'root_allowance_unavailable'
            if isinstance(error, urllib.error.HTTPError):
                try:
                    code = json.loads(error.read(65536)).get('error')
                    if code in ('root_allowance_exhausted', 'legacy_allowance_unknown', 'stale_lease',
                                'stale_reservation', 'attempt_already_reserved', 'model_token_bound_violation'):
                        reason = code
                except Exception:
                    pass
            failure = BudgetExhausted(reason)
            failure.before_model = op == 'reserve'
            raise failure from None
        self.state = state
        return state

    def reserve(self, kind, **body):
        attempt = secrets.token_hex(16)
        self._call('reserve', idempotency_key=attempt, kind=kind, **body)
        return attempt

    def settle(self, attempt, metrics):
        state = self._call('settle', idempotency_key=attempt, metrics=metrics)
        if state.get('blocked_reason'):
            raise BudgetExhausted(state['blocked_reason'])

    def exhausted(self):
        state = self.state or self._call('read')
        if state.get('blocked_reason'):
            return state['blocked_reason']
        return next((f'root_{cap}' for cap in ('model_calls', 'tool_calls', 'tokens')
                     if _used(state, cap) >= state['limits'][cap]), None)

    def can_afford(self, reserve):
        state = self.state or self._call('read')
        return not state.get('blocked_reason') and all(
            state['limits'][cap] - _used(state, cap) >= reserve[cap]
            for cap in ('model_calls', 'tool_calls', 'tokens'))

    def reserve_quality_switch(self):
        state = self.state or self._call('read')
        if state['used']['quality_switches'] >= state['limits']['quality_switches']:
            return False
        self.reserve('quality_switch')
        return True


@contextmanager
def root_scope(client, ticket_id, lease):
    token = _ROOT.set(RootAllowance(client, ticket_id, lease))
    try:
        yield _ROOT.get()
    finally:
        _ROOT.reset(token)
