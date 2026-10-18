"""Tách system/user ở seam gọi model (tool loop qua pipeline.Deps): role, thứ tự, định dạng nhắc lại, tham số gate 3; off = y như cũ."""
import json

import pytest

import tools
from providers import client as client_mod
from providers.client import OllamaClient
from providers.routing import ModelRouter
from runtime import pipeline, prompt_roles, tool_loop
from runtime.budget import Budget

PAGE = "<main>\n<h1>A</h1>\n</main>\n"
SUBTASK = {"title": "Thêm dòng", "file": "public/a.html", "verify": "thấy B"}
EDIT = {"tool": "edit_file", "arguments": {"file": "public/a.html", "edits": [{"after_line": 2, "insert": "<p>B</p>"}]}}
TEST = {"tool": "write_test", "arguments": {"test_file": "test/a.test.js", "test": "import test from 'node:test';"}}
FINISH = {"tool": "finish", "arguments": {}}


@pytest.fixture(autouse=True)
def base_file(monkeypatch):
    monkeypatch.setattr(tools, "_show", lambda *a: PAGE)


class FakeModels:
    """Client giả: ghi (model, prompt, extra, options) của từng lời gọi, trả lần lượt kịch bản tool."""

    def __init__(self, script, routing=None):
        self.script, self.calls, self.routing = list(script), [], routing

    def generate(self, model, prompt, *, format=None, extra=None, **options):
        self.calls.append({"model": model, "prompt": prompt, "extra": extra or {}, "options": options})
        item = self.script.pop(0) if len(self.script) > 1 else self.script[0]
        return {"response": json.dumps(item), "prompt_eval_count": 1, "eval_count": 1}


def run(models, role="gate3_light"):
    deps = pipeline.Deps(models=models, notify=None)
    return tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                                 check=lambda _o: None, role=role)


@pytest.fixture
def split_on(monkeypatch):
    monkeypatch.setenv("AI_BOARD_PROMPT_ROLE_SPLIT", "1")


def test_split_off_sends_one_user_prompt_and_no_system(monkeypatch):
    monkeypatch.delenv("AI_BOARD_PROMPT_ROLE_SPLIT", raising=False)
    models = FakeModels([EDIT, TEST, FINISH])
    assert run(models)["status"] == "proposed"
    call = models.calls[0]
    assert "system" not in call["extra"] and "thinking" not in call["extra"] and call["options"] == {"num_predict": call["options"]["num_predict"], "temperature": 0}
    assert not call["prompt"].endswith(prompt_roles.RESTATE)


def test_split_on_puts_rules_in_system_and_restates_format_last_in_user(split_on):
    models = FakeModels([EDIT, TEST, FINISH])
    assert run(models)["status"] == "proposed"
    call = models.calls[1]
    assert call["extra"]["system"] == prompt_roles.SYSTEM and "Luật nền tảng" not in call["prompt"]
    assert call["prompt"].index("Thứ tự làm") < call["prompt"].index("KẾT QUẢ TOOL edit_file") < call["prompt"].rindex("Nhắc lại")
    assert call["prompt"].endswith(prompt_roles.RESTATE)


def test_gate3_params_come_from_routing_catalog_and_thinking_is_off(split_on, monkeypatch):
    sent = []

    def fake_post(self, path, payload, **_):
        sent.append(payload)
        return {"choices": [{"message": {"content": json.dumps(EDIT)}, "finish_reason": "stop"}], "usage": {}}

    monkeypatch.setattr(OllamaClient, "_post", fake_post)
    routed = OllamaClient(routing=ModelRouter({"VLLM_URL": "http://h", "GATE3_MODEL_HEAVY": "m"}))
    deps = pipeline.Deps(models=routed, notify=None)
    tool_loop.run_subtask(SUBTASK, PAGE, deps=deps, budget=Budget(), model="m", source=".", sha="abc",
                          check=lambda _o: None, role="gate3_heavy")
    payload = sent[0]
    assert payload["messages"][0] == {"role": "system", "content": prompt_roles.SYSTEM}
    assert payload["messages"][1]["content"].endswith(prompt_roles.RESTATE)
    assert payload["chat_template_kwargs"] == {"enable_thinking": False}
    assert payload["temperature"] == 0.7 and payload["top_p"] == 0.8
    assert payload["top_k"] == 20 and payload["presence_penalty"] == 1.5


def test_non_gate3_role_keeps_its_options_only_system_added(split_on):
    models = FakeModels([{"ok": 1}])
    deps = pipeline.Deps(models=models, notify=None)
    deps.call_model("m", "task", gate=1, budget=Budget(), format="json")
    call = models.calls[0]
    assert call["extra"] == {"system": prompt_roles.SYSTEM} and call["options"]["temperature"] == 0
    assert call["prompt"] == "task" + prompt_roles.RESTATE


def test_split_values_block_at_most_five_lines():
    values = prompt_roles.SYSTEM.split("Giá trị kỹ thuật:", 1)[1].strip().splitlines()
    assert len(values) <= 5


def test_client_sends_system_then_user_in_vllm_payload(monkeypatch):
    seen = {}

    def fake_post(self, path, payload, **_):
        seen.update(payload)
        return {"choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}], "usage": {}}

    monkeypatch.setattr(OllamaClient, "_post", fake_post)
    OllamaClient(base_url="http://h", protocol="vllm").generate(
        "m", "task", extra={"system": "rules", "thinking": False}, temperature=0.7, top_k=20, presence_penalty=1.5)
    assert seen["messages"] == [{"role": "system", "content": "rules"}, {"role": "user", "content": "task"}]
    assert seen["chat_template_kwargs"] == {"enable_thinking": False}
    assert seen["top_k"] == 20 and seen["presence_penalty"] == 1.5 and seen["temperature"] == 0.7


def test_client_without_system_keeps_single_user_message(monkeypatch):
    seen = {}

    def fake_post(self, path, payload, **_):
        seen.update(payload)
        return {"choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}], "usage": {}}

    monkeypatch.setattr(OllamaClient, "_post", fake_post)
    OllamaClient(base_url="http://h", protocol="vllm").generate("m", "task")
    assert seen["messages"] == [{"role": "user", "content": "task"}]


@pytest.mark.parametrize("split", [False, True])
def test_chat_span_carries_role_thinking_and_prompt_mode(split):
    extra = {"thinking": False, **({"system": "s"} if split else {})}
    attrs = pipeline._request_attrs({"temperature": 0.7, "num_predict": 4000}, extra, {"_reasoning_chars": 0}, "gate3_light")
    assert attrs == {"temperature": 0.7, "max_tokens": 4000, "thinking": False, "reasoning_chars": 0,
                     "role": "gate3_light", "prompt_roles": "split" if split else "single"}
