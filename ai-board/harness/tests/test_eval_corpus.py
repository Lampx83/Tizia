"""Seam duy nhất: eval_run.main(['corpus'|'full', ...], deps) chạy trọn vẹn trên trang thật của repo ở commit ghim, model giả trong thư mục
tạm, seed cố định. Không test riêng bộ sinh hay hàm kiểm: soi báo cáo và file run ghi ra."""
import dataclasses
import json
import re
from collections import Counter
from pathlib import Path

import pytest

import eval_run
from main import Deps

FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}


@dataclasses.dataclass
class GoldModels:
    """Model giả đọc [key] trong title của prompt, tra gold trong corpus đã ghi và trả đúng gold (dataclass: run_case dùng replace).
    Cách làm theo mức khó của case: wrong_level = gold + hỏng chỗ khác (cổng 3 qua, check chặn), garbage_level = trả rác (cổng 3 chặn)."""

    root: Path
    seed: int
    wrong_level: int = 5
    garbage_level: int = 3
    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)

    def generate(self, model, prompt, **kw):
        key = re.search(r"- title: \[(\w+)\]", prompt).group(1)
        path = self.root / "corpus" / f"full-s{self.seed}" / "cases.json"
        case = next(c for c in json.loads(path.read_text(encoding="utf-8")) if c["key"] == key)
        self.calls.append(key)
        if case["level"] == self.garbage_level:
            return {"response": "không phải json", "prompt_eval_count": 120, "eval_count": 80}
        broken = case["level"] == self.wrong_level
        if "code" in case["gold"]:
            body = {"code": case["gold"]["code"].replace(case["check"]["body"], "") if broken else case["gold"]["code"]}
        else:
            body = {"edits": case["gold"]["edits"] + ([{"search": "<html", "replace": '<html data-x="1"'}] if broken else [])}
        return {"response": json.dumps({**body, **FILLER}, ensure_ascii=False), "prompt_eval_count": 120, "eval_count": 80}


@pytest.fixture(scope="module")
def root(tmp_path_factory):
    """1 thư mục dữ liệu cho cả file: checkout ở commit ghim dựng 1 lần (chỉ mục UI của retrieval ~25 s/checkout), mỗi test dùng seed riêng."""
    return tmp_path_factory.mktemp("eval")


def corpus(root, seed):
    return eval_run.main(["corpus", "--seed", str(seed), "--root", str(root)])


def freeze(root, seed):
    """Vai người viết chữ request: đọc texts-todo.json, ghi texts.json (title mở đầu bằng [key] để model giả tra gold), rồi sinh corpus."""
    assert corpus(root, seed) == 2
    path = root / "corpus" / "texts.json"
    texts = json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}
    for todo in json.loads((root / "corpus" / "texts-todo.json").read_text(encoding="utf-8")):
        texts[todo["key"]] = {"title": f"[{todo['key']}] {todo['types'][0]}", "verify": f"kiểm {todo['file']}", "detail": f"sửa {todo['file']}"}
    path.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    assert corpus(root, seed) == 0


def cases_of(root, seed):
    return json.loads((root / "corpus" / f"full-s{seed}" / "cases.json").read_text(encoding="utf-8"))


def full(root, *extra, seed=5, models=None):
    deps = Deps(models=models or GoldModels(root, seed), notify=None, sleep=lambda _s: None)
    return eval_run.main(["full", "--seed", str(seed), "--repeats", "1", "--root", str(root), *extra], deps)


def report(root, seed=5, split="dev"):
    return json.loads((root / "runs" / f"full-s{seed}-{split}" / "report.json").read_text(encoding="utf-8"))


def test_corpus_has_sixty_ladder_cases_reproducible_from_a_seed_and_frozen_text_never_changes_silently(root, capsys):
    assert corpus(root, 5) == 2  # chưa có chữ đóng băng: không sinh corpus, chỉ ghi danh sách cần viết
    assert len(json.loads((root / "corpus" / "texts-todo.json").read_text(encoding="utf-8"))) == 60
    freeze(root, 5)
    first = {name: (root / "corpus" / "full-s5" / name).read_bytes() for name in ("cases.json", "manifest.json")}
    assert corpus(root, 5) == 0 and first == {name: (root / "corpus" / "full-s5" / name).read_bytes() for name in first}

    cases = cases_of(root, 5)
    assert len(cases) == 60
    cells = Counter((c["kind"], c["level"]) for c in cases)
    assert len(cells) == 29 and min(cells.values()) >= 2 and {level for _, level in cells} == {1, 2, 3, 4, 5}
    for cell in cells:  # mức 1-4 đủ cả hai kiểu câu; mức 5 luôn lời thường
        styles = {c["style"] for c in cases if (c["kind"], c["level"]) == cell}
        assert styles == ({"plain"} if cell[1] == 5 else {"named", "plain"})
    by_level = lambda n: [c for c in cases if c["level"] == n and c["kind"] != "new_page"]  # noqa: E731
    assert all(c["page_bytes"] < 9000 for c in by_level(1)) and all(c["page_bytes"] > 20000 for c in by_level(3))
    assert all(len(c["gold"]["edits"]) == 2 for c in by_level(4)) and all(len(c["gold"]["edits"]) == 1 for c in by_level(2))
    assert all(len(c["spec"][0]["similar"]) >= 1 for c in by_level(2))  # ô mơ hồ: còn phần tử giống đích
    assert all(c["base_sha"] == eval_run.eval_corpus.PIN and c["file"].startswith("public/") for c in cases)
    assert len({c["key"] for c in cases}) == 60

    manifest = json.loads((root / "corpus" / "full-s5" / "manifest.json").read_text(encoding="utf-8"))
    dev, held = manifest["split"]["dev"], manifest["split"]["heldout"]
    assert (dev["cases"], held["cases"]) == (42, 18)  # 70/30
    assert not set(dev["pages"]) & set(held["pages"]) and not set(dev["types"]) & set(held["types"])  # trang và loại rời nhau
    assert {c["split"] for c in cases} == {"dev", "heldout"} and {r["split"] for r in manifest["cases"]} == {"dev", "heldout"}
    assert all(c["file"] in dev["pages"] for c in cases if c["split"] == "dev") and all(t in dev["types"] for c in cases if c["split"] == "dev" for t in c["types"])

    texts_path = root / "corpus" / "texts.json"
    texts = json.loads(texts_path.read_text(encoding="utf-8"))
    texts[cases[0]["key"]]["detail"] += " (sửa lén)"
    texts_path.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    capsys.readouterr()
    assert corpus(root, 5) == 2 and "đóng băng" in capsys.readouterr().err
    assert (root / "corpus" / "full-s5" / "cases.json").read_bytes() == first["cases.json"]  # bị từ chối: không ghi đè

    freeze(root, 6)  # seed khác: corpus khác, chữ cũ không bị đụng
    assert {c["key"] for c in cases_of(root, 6)} != {c["key"] for c in cases}
    assert corpus(root, 5) == 2  # chữ sửa lén vẫn bị chặn sau khi sinh seed khác
    texts[cases[0]["key"]]["detail"] = texts[cases[0]["key"]]["detail"].removesuffix(" (sửa lén)")
    texts_path.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    assert corpus(root, 5) == 0


def test_every_transformation_type_gets_an_exact_gold_that_its_own_check_accepts_and_rejects_damage(root):
    freeze(root, 7)
    assert full(root, "--split", "all", seed=7) == 0
    rep = report(root, 7, "all")
    corpus7 = cases_of(root, 7)
    assert len(rep["cases"]) == 60 and {c["kind"] for c in rep["cases"]} == {c["kind"] for c in corpus7} and len({c["kind"] for c in corpus7}) == 8
    by_id = {c["id"]: c for c in corpus7}
    for line in rep["cases"]:
        level = by_id[line["id"]]["level"]  # gold qua; hỏng chỗ khác (mức 5) thì check chặn; rác (mức 3) dừng ở cổng 3
        assert (line["passed"], line["reached"]["gold_oracle"]) == ((0, 0) if level == 3 else (0, 1) if level == 5 else (1, 1)), line["id"]
    repo = root / "checkouts" / eval_run.eval_corpus.PIN[:12]  # mỗi case chạy trên checkout ở base_sha: HEAD ghim, không working tree
    assert (repo / "HEAD").read_text().strip() == eval_run.eval_corpus.PIN and not (repo / "public").exists()
    assert (rep["groups"]["split=dev"]["trials"], rep["groups"]["split=heldout"]["trials"]) == (42, 18)
    assert rep["groups"]["level=1"]["rate"] == 100.0 and rep["groups"]["level=5"]["rate"] == 0.0 and rep["groups"]["style=named"]["trials"] > 0
