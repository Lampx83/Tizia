"""Đếm token skill: tokenizer Qwen (file tokenizer.json offline) hoặc UTF-8 bytes làm cận trên."""
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
