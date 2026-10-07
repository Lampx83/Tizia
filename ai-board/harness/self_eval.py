"""Compatibility entry point; implementation: evaluation/self_eval.py."""
from _compat import redirect
redirect(__name__, 'evaluation.self_eval', cli=True)
