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


def test_skill_count_matches_server_counter():
    import json
    import subprocess
    from pathlib import Path
    root = Path(__file__).resolve().parents[3]
    samples = ['Xin chào', 'skill', 'Trigger: a step writes tests.\n1. Run `python -m pytest` and record the exit status.']
    assert not isinstance(token_count._load(str(token_count.SHIPPED)), token_count.ByteCounter), \
        'tokenizers package missing: pip install -r requirements.txt'
    script = ("import {tokenCounter} from './server/ai-board/services/token-count.js';"
              "const c=tokenCounter();let s='';process.stdin.setEncoding('utf8');"
              "for await (const ch of process.stdin) s+=ch;"
              "process.stdout.write(JSON.stringify(JSON.parse(s).map(t=>c.count(t))))")
    out = subprocess.run(['node', '--input-type=module', '-e', script], input=json.dumps(samples, ensure_ascii=False).encode('utf-8'),
                         capture_output=True, check=True, cwd=root)
    assert json.loads(out.stdout) == [token_count.skill_count(t) for t in samples]
