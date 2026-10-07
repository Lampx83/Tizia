"""Compatibility entry point; implementation: repositories/dbconn.py."""
from _compat import redirect
redirect(__name__, 'repositories.dbconn', cli=False)
