"""Seam duy nhất của eval runner: eval_run.main(argv, deps) chạy trọn vẹn với model giả trong thư mục tạm, seed cố định.
Không test riêng bộ sinh hay thống kê: chỉ soi báo cáo và file run ghi ra."""
import dataclasses
import json
import re

import eval_run
from main import Deps

FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}


@dataclasses.dataclass
class SiteModels:
    """Model giả đọc yêu cầu trong prompt; cách trả lời cố định theo câu mới (không phụ thuộc thứ tự gọi):
    0-1 đúng, 2 sai nội dung (cổng 3 qua, oracle hỏng), 3 trả rác (cổng 3 chặn). Dataclass: run_case dùng dataclasses.replace."""

    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)

    def generate(self, model, prompt, **kw):
        self.calls.append(prompt)
        title = re.search(r"- title: (.*)", prompt).group(1)
        if swap := re.fullmatch(r"Đổi câu '(.*)' thành '(.*)'", title):
            old, new = swap.groups()
        else:
            old, new = re.fullmatch(r"Thêm câu '(.*)' sau câu '(.*)'", title).group(2, 1)
        mode = sum(map(ord, new)) % 4
        if mode == 3:
            return {"response": "không phải json", "prompt_eval_count": 120, "eval_count": 80}
        text = new if mode < 2 else new + " sai"
        if swap:
            edit = {"search": f"<p>{old}</p>", "replace": f"<p>{text}</p>"}
        else:
            line = int(re.search(rf"^L(\d+)\| .*<p>{re.escape(old)}</p>", prompt, re.M).group(1))
            edit = {"after_line": line, "insert": f"    <p>{text}</p>"}
        return {"response": json.dumps({"edits": [edit], **FILLER}, ensure_ascii=False),
                "prompt_eval_count": 120, "eval_count": 80}


def quick(tmp_path, *extra, seed=12, models=None):
    deps = Deps(models=models or SiteModels(), notify=None, sleep=lambda _s: None)
    return eval_run.main(["quick", "--seed", str(seed), "--cases", "4", "--root", str(tmp_path), *extra], deps)


def test_same_seed_gives_identical_corpus_and_a_different_seed_a_different_one(tmp_path):
    first, second, other = (tmp_path / name for name in ("a", "b", "c"))
    for root, seed in ((first, 12), (second, 12), (other, 13)):
        quick(root, seed=seed)
    cases = lambda root, seed: (root / "corpus" / f"quick-s{seed}" / "cases.json").read_bytes()  # noqa: E731
    page = lambda root, seed: (root / "corpus" / f"quick-s{seed}" / "site" / "public" / "qz-eval-0.html").read_bytes()  # noqa: E731
    assert cases(first, 12) == cases(second, 12) and page(first, 12) == page(second, 12)
    assert cases(first, 12) != cases(other, 13) and page(first, 12) != page(other, 13)


def test_fake_model_run_reports_every_case_with_its_result(tmp_path, capsys):
    assert quick(tmp_path) == 0
    corpus = json.loads((tmp_path / "corpus" / "quick-s12" / "cases.json").read_text(encoding="utf-8"))
    printed = capsys.readouterr().out
    saved = (tmp_path / "runs" / "quick-s12" / "report.txt").read_text(encoding="utf-8")
    assert saved.strip() in printed
    for case in corpus:
        (line,) = [row for row in saved.splitlines() if row.startswith(case["id"])]
        assert case["kind"] in line
        mode = sum(map(ord, case["gold"]["new"])) % 4
        assert ("ĐẠT" in line) == (mode < 2) and ("cổng 3 chặn" in line) == (mode == 3)
    assert "ĐẠT" in saved and "HỎNG" in saved and "cổng 3 chặn" in saved  # seed 12 có đủ 3 kiểu
