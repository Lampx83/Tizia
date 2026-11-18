"""Read one JSON value from a model reply."""
import json
import re

_THINK = re.compile(r"<think>.*?</think>", re.S)
_FENCE = re.compile(r"^```(?:json)?\s*|\s*```$")


def loads(text):
    """Parse reply after dropping think block and code fence; raw control chars in strings allowed.
    Falls back to the outermost {...} when the object sits inside other text. Raise ValueError."""
    text = _FENCE.sub("", _THINK.sub("", text or "").strip())
    try:
        return json.loads(text, strict=False)
    except ValueError:
        start, end = text.find("{"), text.rfind("}")
        if start <= 0 or end < start:
            raise
        return json.loads(text[start:end + 1], strict=False)
