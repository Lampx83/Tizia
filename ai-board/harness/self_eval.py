"""Compatibility canonical module."""
from _compat import redirect
redirect(__name__, 'evaluation.self_eval', cli=True)
