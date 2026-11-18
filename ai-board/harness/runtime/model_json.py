"""Read one JSON value from a model reply."""
import json
import re

_THINK = re.compile(r"<think>.*?</think>", re.S)
_FENCE = re.compile(r"^```(?:json)?\s*|\s*```$")


def loads(text):
    """Parse reply after dropping think block and code fence; raw control chars in strings allowed. Raise ValueError."""
    text = _FENCE.sub("", _THINK.sub("", text or "").strip())
    return json.loads(text, strict=False)
