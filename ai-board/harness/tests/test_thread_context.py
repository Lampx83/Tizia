import re

from gates import brainstorm, plan_validate
from runtime import limits
from services import context


def _thread(n, size=100):
    return [{"role": "requester" if i % 2 == 0 else "admin", "body": f"m{i:03d} " + "x" * size} for i in range(n)]


def _plain(thread):
    return " | ".join(f"{m['role']}: {m['body']}" for m in thread)


def test_contract_default_cap():
    assert limits.thread_chars() == 4000


def test_short_thread_byte_identical_to_plain_join():
    thread = _thread(3, 10)
    assert context.thread_text(thread, "spec") == _plain(thread)


def test_empty_thread():
    assert context.thread_text(None) == ""
    assert context.thread_text([]) == ""


def test_cap_respected_and_newest_kept(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    thread = _thread(30)
    text = context.thread_text(thread)
    assert len(text) <= 500
    assert text.endswith(thread[-1]["body"])
    assert "m000 " not in text


def test_cut_note_counts_dropped_messages(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    thread = _thread(30)
    cut = int(re.search(r"\((\d+) earlier messages cut\)", context.thread_text(thread)).group(1))
    text = context.thread_text(thread)
    assert f"m{cut:03d} " in text
    assert f"m{cut - 1:03d} " not in text
    assert text.count("\n") == 1 + (29 - cut)


def test_spec_first_when_cut(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    text = context.thread_text(_thread(30), "Spec body here")
    assert text.startswith("spec: Spec body here\n")
    assert "earlier messages cut" in text.splitlines()[1]


def test_oversized_spec_clipped_note_kept(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    text = context.thread_text(_thread(30), "S" * 2000)
    assert len(text) <= 500
    assert "earlier messages cut" in text


def test_short_thread_ignores_spec(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    thread = _thread(2, 10)
    assert context.thread_text(thread, "spec") == _plain(thread)


def test_prompts_use_bounded_thread(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    thread = [*_thread(30), {"role": "admin", "body": "QUESTION?"}, {"role": "requester", "body": "ANSWER!"}]
    request = {"subject": "s", "body": "b", "thread": thread, "clarified_spec": "SPEC"}
    plan_prompt = plan_validate.build_prompt(request, {"subtasks": []})
    brain_prompt = brainstorm.build_prompt(request, frozenset({"features"}))
    for prompt in (plan_prompt, brain_prompt):
        assert "ANSWER!" in prompt
        assert "earlier messages cut" in prompt
        assert "m000 " not in prompt
        assert "spec: SPEC" in prompt


def test_newest_message_alone_over_cap_is_clipped_not_dropped(monkeypatch):
    monkeypatch.setattr(limits, "thread_chars", lambda: 500)
    thread = [{"role": "user", "body": "first"}, {"role": "user", "body": "answer " * 200}]
    text = context.thread_text(thread, "the spec")
    assert len(text) <= 500
    assert "(1 earlier messages cut)" in text
    assert text.splitlines()[-1].startswith("user: answer answer")
