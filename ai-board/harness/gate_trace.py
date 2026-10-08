"""Compatibility canonical module."""
from _compat import redirect
redirect(__name__, 'repositories.gate_trace', cli=False)
