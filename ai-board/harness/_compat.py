"""Historical imports and CLI entry points share the canonical module object."""
import importlib
import sys


def redirect(name, target, *, cli=False):
    module = importlib.import_module(target)
    if name == '__main__' and cli:
        raise SystemExit(module.main())
    sys.modules[name] = module
