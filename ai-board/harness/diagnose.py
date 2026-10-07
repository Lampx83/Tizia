"""Compatibility entry point; implementation: services/diagnose.py."""
from _compat import redirect
redirect(__name__, 'services.diagnose', cli=False)
