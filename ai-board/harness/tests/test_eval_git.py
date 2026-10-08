"""Seam: eval_run.main(["git-build" | "git" | "recall", ...]) trên repo git nhỏ dựng trong thư mục tạm, model giả (dataclass), không mạng.
Chỉ soi file ghi ra (cleaning.tsv, cases.json, results, report); không test riêng bộ lọc hay lớp nhãn."""
import dataclasses
import json
import re
import subprocess

import pytest

import eval_run
from main import Deps

FILLER = {"test_file": "test/x.test.js", "test": "import test from 'node:test';\n"}
AJS = "export const GREETING = 'xin chao';\nexport const FAREWELL = 'tam biet';\nexport function greet(name) {\n  return GREETING + ', ' + name;\n}\n"
PAGE = ("<!DOCTYPE html>\n<html lang=\"vi\">\n<head><meta charset=\"utf-8\"><title>Trang thu</title></head>\n<body>\n<main>\n"
        "  <p>Mot</p>\n  <p>Ba</p>\n</main>\n<script>\nconst counter = 1;\nconsole.log(counter);\n</script>\n</body>\n</html>\n")


class Repo:
    """Repo tạm: mỗi commit = {đường dẫn: nội dung mới}; trả sha. Ngày/tác giả cố định."""

    def __init__(self, path):
        self.path = path
        path.mkdir()
        self.git("init", "-q", "-b", "main")

    def git(self, *args):
        env = {**eval_run.os.environ, **eval_run.GIT_ENV}
        return subprocess.run(["git", *args], cwd=self.path, check=True, capture_output=True, text=True, encoding="utf-8", env=env,
                              stdin=subprocess.DEVNULL).stdout.strip()

    def commit(self, files, message):
        for name, text in files.items():
            (self.path / name).parent.mkdir(parents=True, exist_ok=True)
            (self.path / name).write_bytes(text.encode("utf-8"))
        self.git("add", "-A")
        self.git("commit", "-q", "-m", message)
        return self.git("rev-parse", "HEAD")


@pytest.fixture
def history(tmp_path):
    """Lịch sử có đủ loại commit; kèm sha các commit giữ."""
    repo = Repo(tmp_path / "repo")
    base = {"public/a.js": AJS, "public/page.html": PAGE, "public/CHANGELOG-eduverse.md": "# log\n", "public/sw.js": "const SW_VERSION = 'v1';\n",
            "public/js/scenarios/lop3/q.js": "export const Q = [1];\n", "server/x.js": "export const X = 1;\n"}
    shas = {"root": repo.commit(base, "initial")}
    shas["greeting"] = repo.commit({"public/a.js": AJS.replace("'xin chao'", "'chao ban'")}, "fix: lời chào")
    shas["changelog"] = repo.commit({"public/CHANGELOG-eduverse.md": "# log\n- đổi lời chào\n"}, "docs: changelog")
    shas["data"] = repo.commit({"public/js/scenarios/lop3/q.js": "export const Q = [1, 2];\n"}, "feat(quiz): thêm câu")
    titled = PAGE.replace("Trang thu", "Trang thu 2")
    shas["outside"] = repo.commit({"public/page.html": titled, "server/x.js": "export const X = 2;\n"}, "feat: html và server")
    page2 = titled.replace("<p>Mot</p>", "<p>Hai</p>")
    shas["page"] = repo.commit({"public/page.html": page2, "public/CHANGELOG-eduverse.md": "# log\n- đổi lời chào\n- trang\n"}, "fix: chữ trang")
    shas["sw"] = repo.commit({"public/sw.js": "const SW_VERSION = 'v2';\n"}, "chore(sw): bump")
    shas["big"] = repo.commit({"public/a.js": AJS + "".join(f"export const N{i} = {i};\n" for i in range(70))}, "feat: nhiều dòng")
    shas["farewell"] = repo.commit({"public/a.js": (AJS + "".join(f"export const N{i} = {i};\n" for i in range(70))).replace("'tam biet'", "'tam biet nhe'")}, "fix: lời tạm biệt")
    shas["tail"] = repo.commit({"public/page.html": page2.replace("<p>Ba</p>", "<p>Bon</p>")}, "fix: chữ cuối")
    return repo, shas


REQUESTS = {  # sha9 → chữ request đóng băng (test viết tay; giọng người học)
    "greeting": {"style": "named", "title": "Đổi 'xin chao' thành 'chao ban'", "detail": "Lời chào đầu trang ghi 'xin chao', em muốn là 'chao ban'.",
                 "verify": "Hằng GREETING là 'chao ban'."},
    "page": {"style": "plain", "title": "Đổi Mot thành Hai", "detail": "Dòng đầu trang ghi Mot, đổi thành Hai.", "verify": "Dòng đầu ghi Hai."},
    "farewell": {"style": "named", "title": "Đổi 'tam biet' thành 'tam biet nhe'", "detail": "Lời tạm biệt nên nhẹ nhàng hơn: 'tam biet nhe'.",
                 "verify": "Hằng FAREWELL là 'tam biet nhe'."},
    "tail": {"style": "plain", "title": "Đổi Ba thành Bon", "detail": "Dòng cuối ghi Ba, đổi thành Bon.", "verify": "Dòng cuối ghi Bon."},
}


@dataclasses.dataclass
class EditModels:
    """Model giả: đọc 'Đổi X thành Y' trong prompt. farewell trả chữ khác gold (cú pháp ổn); tail đúng chữ nhưng làm hỏng script nội tuyến."""

    gate3_model: str = "fake"
    gate3_model_light: str = "fake"
    calls: list = dataclasses.field(default_factory=list)

    def generate(self, model, prompt, **kw):
        self.calls.append(model)
        if model == "judge-fake":  # giám khảo giả: equivalent khi mọi dòng thêm của gold có trong candidate
            gold, cand = re.search(r"GOLD DIFF:\n(.*)\n\nCANDIDATE DIFF:\n(.*)", prompt, re.S).groups()
            added = lambda diff: {x for x in diff.splitlines() if x.startswith("+") and not x.startswith("+++")}  # noqa: E731
            verdict = "equivalent" if added(gold) <= added(cand) else "different"
            return {"response": json.dumps({"verdict": verdict, "reason": "giả: so dòng thêm"})}
        old, new = re.search(r"- title: Đổi (.+) thành (.+)", prompt).groups()
        if old == "'tam biet'":
            new = "'hen gap lai'"
        edits = [{"search": old, "replace": new}]
        if new == "Bon":
            edits.append({"search": "const counter = 1;", "replace": "const counter = ;"})
        return {"response": json.dumps({"edits": edits, **FILLER}, ensure_ascii=False), "prompt_eval_count": 100, "eval_count": 50}


def build(tmp_path, repo, *extra):
    return eval_run.main(["git-build", "--repo", str(repo.path), "--branch", "main", "--root", str(tmp_path / "data"), *extra])


def freeze_requests(tmp_path, shas):
    folder = tmp_path / "data" / "corpus-git"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "requests.json").write_text(json.dumps({shas[k][:9]: v for k, v in REQUESTS.items()}, ensure_ascii=False), encoding="utf-8")


def table(tmp_path):
    rows = [line.split("\t") for line in (tmp_path / "data" / "corpus-git" / "cleaning.tsv").read_text(encoding="utf-8").splitlines()]
    return {row[0]: row for row in rows}


def test_build_writes_a_reason_for_every_commit_and_pins_each_kept_case_to_its_parent(tmp_path, history, capsys):
    repo, shas = history
    assert build(tmp_path, repo) == 2  # chưa có chữ request: danh sách giữ đã in, chưa ghi case
    assert "thiếu chữ request" in capsys.readouterr().err and not (tmp_path / "data" / "corpus-git" / "cases.json").exists()
    codes = {k: table(tmp_path)[sha[:9]][2] for k, sha in shas.items()}
    assert codes == {"root": "root", "greeting": "kept", "changelog": "changelog-only", "data": "data-file",
                     "outside": "outside-public", "page": "kept", "sw": "ancillary-only", "big": "too-large", "farewell": "kept", "tail": "kept"}
    assert all(len(row) == 5 and row[3] for row in table(tmp_path).values())  # mọi commit có lý do
    assert "bỏ file phụ: changelog" in table(tmp_path)[shas["page"][:9]][3]

    freeze_requests(tmp_path, shas)
    assert build(tmp_path, repo) == 0
    cases = json.loads((tmp_path / "data" / "corpus-git" / "cases.json").read_text(encoding="utf-8"))
    assert [c["id"] for c in cases] == [f"g-{shas[k][:9]}" for k in ("tail", "farewell", "page", "greeting")]  # mới trước
    page = cases[2]
    assert (page["files"], page["kind"], page["style"]) == (["public/page.html"], "html", "plain")  # changelog không phải gold
    assert page["base_sha"] == shas["outside"] and page["gold_sha"] == shas["page"] and page["gold_lines"] == {"public/page.html": [6]}
    assert "-  <p>Mot</p>" in page["gold_diff"] and "CHANGELOG" not in page["gold_diff"]
    pinned = tmp_path / "data" / "corpus-git" / "checkouts" / shas["outside"][:12]
    assert subprocess.run(["git", "rev-parse", "HEAD"], cwd=pinned, capture_output=True, text=True).stdout.strip() == shas["outside"]
    first = (tmp_path / "data" / "corpus-git" / "cases.json").read_bytes()
    assert build(tmp_path, repo) == 0 and (tmp_path / "data" / "corpus-git" / "cases.json").read_bytes() == first  # tất định


def run_git(tmp_path, *extra, models=None):
    deps = Deps(models=models or EditModels(), notify=None, sleep=lambda _s: None)
    return eval_run.main(["git", "--repeats", "1", "--root", str(tmp_path / "data"), *extra], deps)


def built(tmp_path, history):
    repo, shas = history
    freeze_requests(tmp_path, shas)
    assert build(tmp_path, repo) == 0
    return shas


def report(tmp_path):
    return json.loads((tmp_path / "data" / "runs" / "git" / "report.json").read_text(encoding="utf-8"))


def test_git_run_labels_layer_one_apart_and_never_reports_an_official_ship_rate(tmp_path, history, capsys):
    shas = built(tmp_path, history)
    assert run_git(tmp_path) == 0
    rep = report(tmp_path)
    by_case = {c["id"]: c for c in rep["cases"]}
    passed = {k: by_case[f"g-{shas[k][:9]}"]["passed"] for k in ("greeting", "page", "farewell", "tail")}
    # greeting, page đạt; farewell: chữ khác gold nhưng lớp 1 (tất định) vẫn đạt; tail: cổng 3 qua nhưng script nội tuyến hỏng → lớp 1 rớt
    assert passed == {"greeting": 1, "page": 1, "farewell": 1, "tail": 0}
    assert [(f["stage"], f["reached"], f["passed"]) for f in rep["funnel"]] == [("gate3", 4, 4), ("layer1", 4, 3)]
    assert (rep["tier"], rep["source"], rep["official_ship_rate"], rep["label"]) == ("git-b", "synthetic-candidate", None, "GIT TIER (b)")
    assert "layer2" in rep["layers"] and "HOÃN" in rep["layers"]["layer2"] and "KHÔNG vào ship rate" in rep["layers"]["layer3"]
    assert {"all", "js", "html", "style=named", "style=plain"} <= set(rep["groups"])
    rows = [json.loads(line) for line in (tmp_path / "data" / "runs" / "git" / "results.jsonl").read_text(encoding="utf-8").splitlines()]
    cases = {c["id"]: c for c in json.loads((tmp_path / "data" / "corpus-git" / "cases.json").read_text(encoding="utf-8"))}
    assert all(r["base_sha"] == cases[r["case"]]["base_sha"] for r in rows) and len(rows) == 4  # ghim commit cha mỗi lượt
    diff = {r["case"]: r["diff"] for r in rows}[f"g-{shas['page'][:9]}"]  # candidate so với base ghim ở commit cha
    assert "-  <p>Mot</p>" in diff and "+  <p>Hai</p>" in diff and "--- a/public/page.html" in diff
    out = capsys.readouterr().out
    assert "[GIT TIER (b) | synthetic-candidate]" in out and "layer1: tất định" in out


def test_recall_runs_on_the_git_tier_without_a_model_and_reports_per_group(tmp_path, history):
    built(tmp_path, history)
    assert eval_run.main(["recall", "--root", str(tmp_path / "data"), "--corpus", "corpus-git"]) == 0
    rep = json.loads((tmp_path / "data" / "recall" / "latest.json").read_text(encoding="utf-8"))
    assert [r["corpus"] for r in rep["rows"]] == ["corpus-git"] * 4
    assert {"all", "kind=html", "kind=js", "style=named", "style=plain"} <= set(rep["groups"])
    assert all(r["gate3"]["hit"] and r["gate3"]["gold_lines"] > 0 for r in rep["rows"])  # file đích cho sẵn: trích có dòng gold
    assert all({"skill", "excerpt", "total"} <= set(r["gate1"]["chars"]) for r in rep["rows"])


def test_soft_judge_is_reported_apart_pinned_and_lists_where_it_disagrees_with_layer_one(tmp_path, history, capsys):
    shas = built(tmp_path, history)
    models = EditModels()
    assert run_git(tmp_path, "--judge", "--judge-model", "judge-fake", models=models) == 0
    rep = report(tmp_path)
    soft = rep["soft_judge"]
    assert models.calls.count("judge-fake") == 4 and "soft" in soft["label"] and soft["judge_model"] == "judge-fake"
    assert (soft["judged"], soft["equivalent"], soft["rate"]) == (4, 3, 75.0) and re.fullmatch(r"[0-9a-f]{12}", soft["rubric_sha"])
    assert [(f["stage"], f["passed"]) for f in rep["funnel"]] == [("gate3", 4), ("layer1", 3)] and rep["official_ship_rate"] is None  # lớp 1 giữ nguyên
    stored = [json.loads(x) for x in (tmp_path / "data" / "runs" / "git" / "judge.jsonl").read_text(encoding="utf-8").splitlines()]
    assert {(r["judge_model"], r["rubric_sha"]) for r in stored} == {("judge-fake", soft["rubric_sha"])}  # ghim kèm từng kết quả
    # farewell: lớp 1 đạt nhưng giám khảo bảo khác gold; tail: lớp 1 rớt (script nội tuyến hỏng) nhưng chữ đúng gold
    assert {(d["commit"], d["layer1"], d["judge"]) for d in soft["disagreements"]} == {(shas["farewell"][:9], True, "different"), (shas["tail"][:9], False, "equivalent")}
    listed = (tmp_path / "data" / "runs" / "git" / "disagreements.txt").read_text(encoding="utf-8").splitlines()
    assert len(listed) == 2 and any(f"commit {shas['tail'][:9]}" in line and "lớp 1 RỚT" in line for line in listed)
    assert "giám khảo mềm (soft" in capsys.readouterr().out

    again = EditModels()  # chạy lại: không gọi lại giám khảo (resume theo judge.jsonl)
    assert run_git(tmp_path, "--judge", "--judge-model", "judge-fake", models=again) == 0 and again.calls == []
    assert run_git(tmp_path, "--judge", "--judge-model", "other-judge", models=EditModels()) == 2  # khác giám khảo: không trộn kết quả


def test_judge_of_the_same_family_as_the_generator_is_refused(tmp_path, history, capsys):
    built(tmp_path, history)
    models = EditModels()
    assert run_git(tmp_path, "--judge", "--judge-model", "fake-bigger", models=models) == 2
    assert "cùng họ" in capsys.readouterr().err and models.calls == []  # từ chối trước khi tốn lượt nào
