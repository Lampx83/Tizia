"""Spotlighting by delimiting (AI_BOARD_SPOTLIGHT): nonce on every <<< / >>> fence, nonce removed from untrusted text. Off: identity."""
from __future__ import annotations

import re
import secrets
from contextlib import contextmanager
from contextvars import ContextVar

from settings import get_settings

_NONCE: ContextVar[str | None] = ContextVar("spotlight_nonce", default=None)
# Exactly three brackets: git conflict markers (7) stay as they are.
_OPEN = re.compile(r"(?<!<)<<<(?!<)([A-Z][A-Z_]*)?")
_CLOSE = re.compile(r"(?<![\w>])([A-Z][A-Z_]*)?>>>(?!>)")


def on() -> bool:
    return bool(get_settings().spotlight)


def nonce() -> str:
    """Nonce of the current scope; first use outside a scope fixes one for this context."""
    value = _NONCE.get()
    if value is None:
        value = secrets.token_hex(4)
        _NONCE.set(value)
    return value


@contextmanager
def scope(value: str | None = None, *, state: dict | None = None):
    """Nonce for the block, fresh unless given; flag on + `state`: kept in state so all gates of a request share it.
    copy_context threads inherit it."""
    if value is None and state is not None and on():
        value = state.setdefault("spotlight_nonce", secrets.token_hex(4))
    token = _NONCE.set(value or secrets.token_hex(4))
    try:
        yield
    finally:
        _NONCE.reset(token)


def fence(text: str) -> str:
    """Trusted template/wrapper text with each fence marker suffixed by the nonce: <<<TAG_n, TAG_n>>>, <<<n, n>>>."""
    if not on():
        return text
    n = nonce()
    text = _OPEN.sub(lambda m: f"<<<{m.group(1) + '_' if m.group(1) else ''}{n}", text)
    return _CLOSE.sub(lambda m: f"{m.group(1) + '_' if m.group(1) else ''}{n}>>>", text)


def scrub(value):
    """Untrusted text without the nonce, so it cannot open or close a fence; non-str unchanged."""
    if not isinstance(value, str) or not on():
        return value
    n = nonce()
    while n in value:
        value = value.replace(n, "")
    return value


def block(content: str, open: str = "<<<\n", close: str = "\n>>>") -> str:
    """Fenced untrusted block: fence(open) + scrub(content) + fence(close)."""
    return fence(open) + scrub(content) + fence(close)
