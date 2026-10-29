import os

import pytest

from services import token_count


def test_utf8_fallback_known_answer_vietnamese_and_english():
    counter = token_count.ByteCounter()
    assert counter.exact is False
    assert counter.count('Xin chào') == 9  # 'à' is 2 UTF-8 bytes
    assert counter.count('skill') == 5


def test_missing_tokenizer_file_falls_back_to_bytes(monkeypatch):
    monkeypatch.setenv('AI_BOARD_QWEN_TOKENIZER', 'C:/does/not/exist/tokenizer.json')
    counter = token_count.counter()
    assert counter.name == 'utf8-bytes'
    assert counter.count('Xin chào') == 9


def test_unset_env_uses_bytes(monkeypatch):
    monkeypatch.delenv('AI_BOARD_QWEN_TOKENIZER', raising=False)
    assert token_count.counter().exact is False


@pytest.mark.skipif(not os.environ.get('AI_BOARD_QWEN_TOKENIZER'), reason='Qwen tokenizer.json not available offline')
def test_qwen_known_answer_when_tokenizer_present(monkeypatch):
    monkeypatch.setenv('AI_BOARD_QWEN_TOKENIZER', os.environ['AI_BOARD_QWEN_TOKENIZER'])
    counter = token_count.counter()
    assert counter.exact is True
    assert counter.count('skill') == 1
