"""Alias of gate5.guest_inputs for the guest-baked runner."""
import sys

from gate5 import guest_inputs

sys.modules[__name__] = guest_inputs
