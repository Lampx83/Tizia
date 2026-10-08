"""Compatibility canonical module."""
from _compat import redirect
redirect(__name__, 'runtime.budget', cli=False)
