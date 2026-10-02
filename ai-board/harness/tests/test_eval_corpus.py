"""Seam duy nhất: eval_run.main(['full', ...], deps) chạy trọn vẹn trên trang thật của repo ở commit ghim, model giả trong thư mục tạm,
seed cố định. Không test riêng bộ sinh hay hàm kiểm: soi báo cáo và file run ghi ra."""
import dataclasses
import json
import re
from pathlib import Path

import pytest

import eval_run
from main import Deps

FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}


@dataclasses.dataclass
class GoldModels:
    """Model giả đọc [key] trong title của prompt, tra gold trong corpus đã ghi và trả đúng gold (dataclass: run_case dùng replace).
    wrong: loại phép biến đổi bị làm hỏng nơi khác (cổng 3 qua, check hỏng); garbage: loại bị trả rác (cổng 3 chặn)."""

    root: Path
    seed: int
    wrong: tuple = ()
    garbage: tuple = ()
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)

    def corpus(self):
        base = self.root / "corpus" / f"full-s{self.seed}"
        return {c["key"]: c for c in json.loads((base / "cases.json").read_text(encoding="utf-8"))}

    def generate(self, model, prompt, **kw):
        key = re.search(r"- title: \[(\w+)\]", prompt).group(1)
        case = self.corpus()[key]
        self.calls.append(key)
        if case["kind"] in self.garbage:
            return {"response": "không phải json", "prompt_eval_count": 120, "eval_count": 80}
        if "code" in case["gold"]:
            code = case["gold"]["code"]
            body = {"code": code.replace(case["check"]["body"], "") if case["kind"] in self.wrong else code}
        else:
            edits = list(case["gold"]["edits"])
            if case["kind"] in self.wrong:
                edits.append({"search": "<html", "replace": '<html data-x="1"'})
            body = {"edits": edits}
        return {"response": json.dumps({**body, **FILLER}, ensure_ascii=False), "prompt_eval_count": 120, "eval_count": 80}


@pytest.fixture(scope="module")
def root(tmp_path_factory):
    """1 thư mục dữ liệu cho cả file: checkout ở commit ghim dựng 1 lần (chỉ mục UI của retrieval ~25 s/checkout), mỗi test dùng seed riêng."""
    return tmp_path_factory.mktemp("eval")


def full(tmp_path, *extra, models=None, seed=5):
    deps = Deps(models=models or GoldModels(tmp_path, seed), notify=None, sleep=lambda _s: None)
    return eval_run.main(["full", "--seed", str(seed), "--repeats", "1", "--root", str(tmp_path), *extra], deps)


def report(root, seed=5):
    return json.loads((root / "runs" / f"full-s{seed}" / "report.json").read_text(encoding="utf-8"))


def test_every_transformation_type_gets_an_exact_gold_that_its_own_check_accepts_and_rejects_damage(root):
    models = GoldModels(root, 5, wrong=("replace_text", "insert_text", "css_color", "add_block", "new_page"), garbage=("remove_element",))
    assert full(root, models=models) == 0
    rep = report(root)
    kinds = {c["kind"]: c for c in rep["cases"]}
    assert set(kinds) == {"replace_text", "insert_text", "css_color", "size_hide", "remove_element", "add_block", "change_link", "new_page"}
    assert {k for k, c in kinds.items() if c["passed"]} == {"size_hide", "change_link"}  # đúng gold qua; hỏng chỗ khác thì check chặn
    assert {k for k, c in kinds.items() if not c["reached"]["gold_oracle"]} == {"remove_element"}  # rác: dừng ở cổng 3
    corpus = json.loads((root / "corpus" / "full-s5" / "cases.json").read_text(encoding="utf-8"))
    assert all(c["base_sha"] == eval_run.eval_corpus.PIN and c["file"].startswith("public/") for c in corpus)
    assert full(root, seed=6) == 0 and all(c["passed"] == 1 for c in report(root, 6)["cases"])  # gold đúng → đạt cả 8
