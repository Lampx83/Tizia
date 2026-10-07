"""Compatibility entry point; implementation: repositories/memory.py."""
from _compat import redirect
redirect(__name__, 'repositories.memory', cli=False)
