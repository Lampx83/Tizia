"""Compatibility entry point; implementation: runtime/pipeline.py."""
from _compat import redirect
redirect(__name__, 'runtime.pipeline', cli=True)
