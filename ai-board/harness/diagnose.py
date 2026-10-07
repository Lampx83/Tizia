"""Compatibility canonical module."""
from _compat import redirect
redirect(__name__, 'services.diagnose', cli=False)
