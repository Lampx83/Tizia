"""Gold eval qua model giả: row kết quả giữ nguyên byte-for-byte quanh refactor "một hàm chạy case chung"."""
import dataclasses
import json

import eval_gold
from main import Deps


@dataclasses.dataclass
class EditModels:
    """Model giả trả đúng 1 body cố định (dataclass: run_case dùng dataclasses.replace)."""

    reply: str
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"

    def generate(self, model, prompt, **kw):
        return {"response": self.reply, "prompt_eval_count": 120, "eval_count": 80}


TEST = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}
GOOD = json.dumps({"edits": [{"search": "<h1>✨ Tính năng</h1>", "replace": "<h1>✨ Tính năng nổi bật</h1>"}], **TEST},
                  ensure_ascii=False)


def run(name, reply):
    deps = Deps(models=EditModels(reply), notify=None, sleep=lambda _s: None)
    row = eval_gold.run_case(name, eval_gold.CASES[name], "fake", deps)
    row.pop("wall_s")  # đồng hồ thật
    return row


def test_gold_eval_rows_are_unchanged_for_a_passing_and_a_blocked_case():
    assert run("edit-text", GOOD) == {
        "case": "edit-text", "model": "fake", "gate_passed": True, "oracle": True, "last_output": None,
        "reason": None, "calls": 1, "retries": 0, "gpu_s": 0.0, "units": 1, "tokens_in": 120, "tokens_out": 80,
        "model_loads": 0, "done_reasons": [None],
    }
    blocked = run("edit-text", "không phải json")
    assert blocked["gate_passed"] is False and blocked["oracle"] is False
    assert blocked["calls"] == 4 and blocked["retries"] == 3  # 1 lần đầu + MAX_INNER_RETRIES
    assert blocked["last_output"] == "không phải json" and blocked["reason"].startswith("subtask ")
