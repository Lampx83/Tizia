"""Compatibility canonical module."""
from _compat import redirect
redirect(__name__, 'services.file_context', cli=False)
