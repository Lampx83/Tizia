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
        case = next(c for c in cases_of(self.root, self.seed) if c["key"] == key)
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
    """Vai người viết chữ request: đọc texts-todo.json (dev ở corpus/, held-out ở heldout/), ghi texts.json cạnh đó (title mở đầu bằng [key]
    để model giả tra gold), rồi sinh corpus."""
    assert corpus(root, seed) == 2
    for home in (root / "corpus", root / "heldout"):
        path = home / "texts.json"
        texts = json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}
        for todo in json.loads((home / "texts-todo.json").read_text(encoding="utf-8")):
            texts[todo["key"]] = {"title": f"[{todo['key']}] {todo['types'][0]}", "verify": f"kiểm {todo['file']}",
                                  "detail": f"sửa {todo['file']} [{todo['key']}]"}
        path.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    assert corpus(root, seed) == 0


def cases_of(root, seed, side=None):
    """Case dev (corpus/) và/hoặc held-out (heldout/corpus/) đã ghi."""
    where = {"dev": root / "corpus", "heldout": root / "heldout" / "corpus"}
    return [c for name, home in where.items() if side in (None, name)
            for c in json.loads((home / f"full-s{seed}" / "cases.json").read_text(encoding="utf-8"))]


def full(root, *extra, seed=5, models=None):
    deps = Deps(models=models or GoldModels(root, seed), notify=None, sleep=lambda _s: None)
    return eval_run.main(["full", "--seed", str(seed), "--repeats", "1", "--root", str(root), *extra], deps)


def report(root, seed=5, split="dev"):
    return json.loads((root / "runs" / f"full-s{seed}-{split}" / "report.json").read_text(encoding="utf-8"))


def test_corpus_has_sixty_ladder_cases_reproducible_from_a_seed_and_frozen_text_never_changes_silently(root, capsys):
    assert corpus(root, 5) == 2  # chưa có chữ đóng băng: không sinh corpus, chỉ ghi danh sách cần viết
    todo = [len(json.loads((home / "texts-todo.json").read_text(encoding="utf-8"))) for home in (root / "corpus", root / "heldout")]
    assert todo == [42, 18]
    freeze(root, 5)
    saved = lambda: {f"{home}/{name}": (root / home / "full-s5" / name).read_bytes()  # noqa: E731
                     for home in ("corpus", "heldout/corpus") for name in ("cases.json", "manifest.json")}
    first = saved()
    assert corpus(root, 5) == 0 and saved() == first

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
    assert {c["split"] for c in cases} == {"dev", "heldout"} and {r["split"] for r in manifest["cases"]} == {"dev"}
    assert all(c["file"] in dev["pages"] for c in cases if c["split"] == "dev") and all(t in dev["types"] for c in cases if c["split"] == "dev" for t in c["types"])

    texts_path = root / "corpus" / "texts.json"
    texts = json.loads(texts_path.read_text(encoding="utf-8"))
    texts[cases[0]["key"]]["detail"] += " (sửa lén)"
    texts_path.write_text(json.dumps(texts, ensure_ascii=False), encoding="utf-8")
    capsys.readouterr()
    assert corpus(root, 5) == 2 and "đóng băng" in capsys.readouterr().err
    assert saved() == first  # bị từ chối: không ghi đè

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
    dev, held = cases_of(root, 7, "dev"), cases_of(root, 7, "heldout")
    assert len({c["kind"] for c in dev + held}) == 8 and len(rep["cases"]) == len(dev) == 42  # chi tiết từng case chỉ có ở dev
    by_id = {c["id"]: c for c in dev}
    for line in rep["cases"]:
        level = by_id[line["id"]]["level"]  # gold qua; hỏng chỗ khác (mức 5) thì check chặn; rác (mức 3) dừng ở cổng 3
        assert (line["passed"], line["reached"]["gold_oracle"]) == ((0, 0) if level == 3 else (0, 1) if level == 5 else (1, 1)), line["id"]
    repo = root / "checkouts" / eval_run.eval_corpus.PIN[:12]  # mỗi case chạy trên checkout ở base_sha: HEAD ghim, không working tree
    assert (repo / "HEAD").read_text().strip() == eval_run.eval_corpus.PIN and not (repo / "public").exists()
    assert rep["groups"]["level=1"]["rate"] == 100.0 and rep["groups"]["level=5"]["rate"] == 0.0 and rep["groups"]["style=named"]["trials"] > 0
    held_score = rep["groups"]["split=heldout"]
    assert rep["groups"]["split=dev"]["trials"] == 42 and (held_score["trials"], held_score["passed"]) == (18, sum(c["level"] not in (3, 5) for c in held))
    assert not {g for g in rep["groups"] if g in {c["kind"] for c in held}}  # không có nhóm theo loại/mức nào của held-out


def test_held_out_per_case_detail_never_leaves_its_protected_folder_and_reports_carry_scores_only(root, capsys):
    freeze(root, 8)
    assert full(root, "--split", "dev", "--cases", "2", seed=8) == 0  # mặc định không chạm held-out
    assert not (root / "heldout" / "runs" / "full-s8-dev").exists() and "split=heldout" not in report(root, 8)["groups"]

    models = GoldModels(root, 8, wrong_level=1, garbage_level=2)  # có lượt đạt, lượt hỏng, lượt bị chặn ở cả hai split
    assert full(root, "--split", "all", "--cases", "6", seed=8, models=models) == 0
    assert eval_run.main(["recall", "--root", str(root), "--label", "leakcheck"]) in (0, 2)  # recall quét corpus dưới root: không được kéo held-out ra
    held = cases_of(root, 8, "heldout")
    secrets = {c[k] for c in held for k in ("id", "key", "title", "detail")}  # chi tiết riêng từng case held-out: định danh, chữ request, gold
    secrets |= {part for c in held for need in c["check"].get("required", []) for part in need if len(part) >= 20}  # câu thân khối, không phải tiêu đề 2 từ
    secrets |= {c["check"]["body"] for c in held if "body" in c["check"]} | {e["replace"] for c in held for e in c["gold"].get("edits", [])}
    assert len(secrets) > 40
    vault = root / "heldout"
    leaked = [str(p) for p in root.rglob("*") if p.is_file() and vault not in p.parents and "checkouts" not in p.parts
              and any(secret.encode("utf-8") in p.read_bytes() for secret in secrets)]
    assert not leaked, [(p, [x for x in secrets if x.encode("utf-8") in Path(p).read_bytes()]) for p in leaked]
    printed = capsys.readouterr().out
    assert not any(secret in printed for secret in secrets)

    rows = [json.loads(line) for line in (vault / "runs" / "full-s8-all" / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    assert len(rows) == 6 and {row["split"] for row in rows} == {"heldout"} and all("last_output" in row for row in rows) and any(not row["oracle"] for row in rows)  # chi tiết thô ở vault
    public = [json.loads(line) for line in (root / "runs" / "full-s8-all" / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    assert len(public) == 6 and {row["split"] for row in public} == {"dev"}
    rep = report(root, 8, "all")
    assert rep["groups"]["split=heldout"]["trials"] == 6 and len(rep["cases"]) == 6 and "failure_classes" in rep
    assert not {row["case"] for row in rows} & {line["id"] for line in rep["cases"]}

    again = GoldModels(root, 8, wrong_level=1, garbage_level=2)  # chạy lại: held-out cũng resume từ vault, không gọi model lần nào
    assert full(root, "--split", "all", "--cases", "6", seed=8, models=again) == 0 and again.calls == []
