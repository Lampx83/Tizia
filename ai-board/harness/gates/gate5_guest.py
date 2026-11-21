"""Guest entry `python -m gates.gate5_guest`; code lives in gate5.guest."""
import runpy
import sys

if __name__ == "__main__":
    runpy.run_module("gate5.guest", run_name="__main__")
else:
    from gate5 import guest

    sys.modules[__name__] = guest
