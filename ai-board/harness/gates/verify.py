"""Alias of gate5.verify for the guest-baked runner."""
import sys

from gate5 import verify

sys.modules[__name__] = verify
