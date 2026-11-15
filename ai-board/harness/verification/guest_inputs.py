"""Worker-to-guest state contract: one registry declares every state key the Gate 5 guest may read."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

from runtime import levels
from settings import get_settings
from verification import checks

REQUIRED_KEY = "_required"
DEFAULT_ROLE = "student"


class GuestInputMissing(Exception):
    """Required guest input absent, or name not in the registry. Infra-classed: the gate must stop, never default to empty."""


@dataclass(frozen=True)
class Input:
    """derive None = copy state[name] when present. required: bool, or callable decided host-side at package time."""
    derive: Callable[[dict, str], object] | None = None
    required: bool | Callable[[], bool] = False


GUEST_INPUTS: dict[str, Input] = {
    "skill_id": Input(), "diffs": Input(), "full_diff": Input(), "request_title": Input(), "request_detail": Input(),
    "base_sha": Input(), "acceptance": Input(),
    "checks": Input(derive=lambda state, role: checks.collect(state.get("plan")) if get_settings().plan_checks else []),
    # WHY: the plan is private to the worker; the guest gets only the derived list. surface_tests is role-independent today
    # (path_policy.may_edit ignores role), the role parameter is the seam for when that changes.
    "surface_tests": Input(derive=lambda state, role: levels.surface_tests(state.get("plan")),
                           required=lambda: bool(levels.surface_contexts())),
}


def _is_required(spec: Input) -> bool:
    return bool(spec.required() if callable(spec.required) else spec.required)


def role_of(state: dict) -> str:
    return state.get("requester_role") or DEFAULT_ROLE


def build(state: dict) -> dict:
    """Host side: guest state from the registry only, plus the required-name manifest."""
    role = role_of(state)
    out = {}
    for name, spec in GUEST_INPUTS.items():
        if spec.derive is not None:
            out[name] = spec.derive(state, role)
        elif name in state:
            out[name] = state[name]
    out[REQUIRED_KEY] = sorted(name for name, spec in GUEST_INPUTS.items() if _is_required(spec))
    return out


def ensure(state: dict) -> None:
    """Worker-side (no sandbox) state: fill derived inputs and the manifest in place. No-op for a packaged guest state."""
    if REQUIRED_KEY not in state:
        state.update({k: v for k, v in build(state).items() if k not in state or GUEST_INPUTS.get(k, Input()).derive})


def missing(state: dict) -> list[str]:
    """Required inputs absent from state."""
    required = state[REQUIRED_KEY] if REQUIRED_KEY in state else [n for n, s in GUEST_INPUTS.items() if _is_required(s)]
    return [name for name in required if name not in state]


def guest_input(state: dict, name: str):
    """Read a guest input. Unknown name or absent required input raises GuestInputMissing; absent optional is None."""
    if name not in GUEST_INPUTS:
        raise GuestInputMissing(f"guest input '{name}' is not in the registry")
    if name in missing(state):
        raise GuestInputMissing(f"required guest input '{name}' missing from state")
    return state.get(name)
