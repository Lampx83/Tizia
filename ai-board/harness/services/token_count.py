"""Đếm token skill: tokenizer Qwen (file tokenizer.json offline) hoặc UTF-8 bytes làm cận trên."""
import os
from pathlib import Path

QWEN_ENV = 'AI_BOARD_QWEN_TOKENIZER'


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
    path = os.environ.get(QWEN_ENV)
    if path and Path(path).is_file():
        try:
            return QwenCounter(path)
        except ImportError:
            pass
    return ByteCounter()
