"""Đếm token skill: tokenizer Qwen (file tokenizer.json offline) hoặc UTF-8 bytes làm cận trên."""
from functools import lru_cache
from pathlib import Path
from settings import get_settings



class ByteCounter:
    name = 'utf8-bytes'
    exact = False

    def count(self, text):
        return len(text.encode('utf-8'))


class QwenCounter:
    name = 'qwen-tokenizers'
    exact = True

    def __init__(self, path):
        from tokenizers import Tokenizer
        self._tokenizer = Tokenizer.from_file(path)

    def count(self, text):
        return len(self._tokenizer.encode(text).ids)


def counter():
    """Qwen khi env trỏ tới file có thật và import được tokenizers; còn lại UTF-8 bytes."""
    path = get_settings().qwen_tokenizer
    if path and path.is_file():
        try:
            return QwenCounter(path)
        except ImportError:
            pass
    return ByteCounter()


@lru_cache(maxsize=1)
def _shared():
    return counter()


def measure(text):
    """Token estimate for observation caps. Qwen tokenizer when present; else UTF-8 bytes / 3 (ponytail: coarse, exact once settings.qwen_tokenizer is set)."""
    shared = _shared()
    used = shared.count(text)
    return used if shared.exact else -(-used // 3)


def fit(text, limit):
    """Longest prefix of text within limit tokens."""
    if measure(text) <= limit:
        return text
    low, high = 0, len(text)
    while low < high:
        mid = (low + high + 1) // 2
        low, high = (mid, high) if measure(text[:mid]) <= limit else (low, mid - 1)
    return text[:low]
