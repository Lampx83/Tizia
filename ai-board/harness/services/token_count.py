"""Đếm token skill: tokenizer Qwen (file tokenizer.json offline) hoặc UTF-8 bytes làm cận trên."""
from functools import lru_cache
from pathlib import Path
from settings import get_settings

SHIPPED = Path(__file__).resolve().parents[3] / 'server' / 'ai-board' / 'resources' / 'qwen3.5-tokenizer.json'


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
        return len(self._tokenizer.encode(text, add_special_tokens=False).ids)


def counter():
    """Qwen khi env trỏ tới file có thật và import được tokenizers; còn lại UTF-8 bytes."""
    path = get_settings().qwen_tokenizer
    if path and path.is_file():
        try:
            return QwenCounter(path)
        except ImportError:
            pass
    return ByteCounter()


@lru_cache(maxsize=4)
def _load(path):
    try:
        return QwenCounter(path)
    except Exception:  # missing tokenizers package or unreadable file: UTF-8 bytes stay a valid upper bound
        return ByteCounter()


def skill_count(text):
    """Skill token count, same source as server token-count.js: env tokenizer file, else shipped one, else UTF-8 bytes."""
    configured = get_settings().qwen_tokenizer
    path = configured if configured and configured.is_file() else SHIPPED
    return (_load(str(path)) if path.is_file() else ByteCounter()).count(text)


CHARS_PER_TOKEN = 4  # pre-cut for char-budget tools; fit() does the exact cut


@lru_cache(maxsize=1)
def _shared():
    return counter()


def measure(text):
    """Token count for observation caps."""
    shared = _shared()
    used = shared.count(text)
    return used if shared.exact else -(-used // 3)  # ponytail: bytes/3 estimate without tokenizer file


def fit(text, limit):
    """Longest prefix within limit tokens."""
    if measure(text) <= limit:
        return text
    low, high = 0, len(text)
    while low < high:
        mid = (low + high + 1) // 2
        low, high = (mid, high) if measure(text[:mid]) <= limit else (low, mid - 1)
    return text[:low]
